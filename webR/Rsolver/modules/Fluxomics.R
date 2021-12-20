imports "background" from "gseakit";
imports "GSEA" from "gseakit";

#' Run fluxomics data analysis
#' 
#' @param simulates the PLAS.NET simulator results output.
#' @param nparts the number of section of the time stream in the 
#'     ``simulates`` output can be divided into multiple parts?
#' @param nsamples number of the sample points in each time stream 
#'     section 
#' 
Fluxomics = function(simulates, background, nparts = 5, nsamples = 32, outputdir = "./") {
    if (!is.null(background)) {
        clusters = lapply(names(background), function(id) {
            nodes = background[[id]];
            print(nodes);
            gsea.cluster(
                data = nodes,
                clusterId = id, 
                clusterName = id, 
                desc = "n/a", 
                id = "key", 
                name = "label"
            );
        });

        background = clusters |> as.background();

        print("create custom GSEA background model for run fluxomics enrichment:");
        print(background);
    }

    [fluxomics, sample_info] = OmicsData(simulates, nparts = nparts, nsamples = nsamples);

    # str(fluxomics);
    print(sample_info, max.print = 10);

    write.csv(fluxomics, file = `${outputdir}/Fluxomics/fluxomics.csv`, row.names = TRUE);
    write.csv(sample_info, file = `${outputdir}/Fluxomics/sample_info.csv`, row.names = FALSE);

    time_stream = unique(sample_info[, "sample_info"]);
    symbols = rownames(fluxomics);

    print("get time stream in blocks:");
    str(time_stream);   

    for(i in 2:length(time_stream)) {
        A = time_stream[i-1];
        B = time_stream[i];

        dir = `${outputdir}/Fluxomics/${A} vs ${B}/`;
        A = sample_info[(sample_info[, "sample_info"] == A), ];
        B = sample_info[(sample_info[, "sample_info"] == B), ];
        A = A[, "sample_id"];
        B = B[, "sample_id"];

        change = logFoldchange(fluxomics[, A], fluxomics[, B]);

        print(change);

        write.csv(change, file = `${dir}/DAF.csv`, row.names = TRUE);

        # run enrichment
        up = rownames(change)[(change[, "log2Foldchange"] > 0)];
        down = rownames(change)[(change[, "log2Foldchange"] < 0)];
        all = append(up, down);

        if (!is.null(background)) {
            run = function(list, tag) {
                enrich = background 
                |> enrichment(geneSet = list, outputAll = FALSE)
                |> enrichment.FDR()
                ;

                print(as.data.frame(enrich));
                
                write.enrichment(enrich, file = `${dir}/enrich_${tag}.csv`);
            }

            run(up, "up");      
            run(down, "down");
            run(all, "all");
        }        
    }
}

logFoldchange = function(A, B) {
    names = rownames(A);

    A = as.list(A, byrow = TRUE);
    B = as.list(B, byrow = TRUE);
    t = lapply(1:length(A), function(mi) {
        a = unlist(A[[mi]]);
        b = unlist(B[[mi]]);
        ma = mean(a);
        mb = mean(b);
        t = as.object(t.test(a, b));
        pvalue = t$Pvalue;
        t = t$TestValue;

        list(
            Foldchange = ma / mb,
            t = t,
            SD_A = sd(a),
            SD_B = sd(b),
            mean_A = ma,
            mean_B = mb,
            pvalue = pvalue,
            t = t
        );
    });

    result = data.frame(
        mean_A = sapply(t, r -> r$mean_A),
        mean_B = sapply(t, r -> r$mean_B),
        SD_A = sapply(t, r -> r$SD_A),
        SD_B = sapply(t, r -> r$SD_B),
        log2Foldchange = sapply(t, r -> log(r$Foldchange, 2)),
        ttest = sapply(t, r -> r$t),
        pvalue = sapply(t, r -> r$pvalue),
        row.names = names
    );
}

OmicsData = function(simulates, nparts = 5, nsamples = 32) {
    symbols = colnames(simulates);
    time_stream = as.numeric(rownames(simulates));
    block_size = as.integer(length(time_stream) / nparts);
    omics = data.frame(symbols = symbols);
    sample_names = NULL;
    sample_info = NULL;

    for(i in 1:nparts) {
        range_min = (i - 1) * block_size + 1;
        range_max = i * block_size - 1;
        id = i;
        i = range_min:range_max;
        samples = lapply(1:nsamples, function(mark) {
            idx = sample(i, length(i) / 4);
            v = sapply(symbols, name -> mean((simulates[, name])[idx]));

            list(sample_id = `block_${id}_${mark}`, vec = v);
        });

        for(sample in samples) {
            omics = cbind(omics, sample$vec);
            sample_names = append(sample_names, sample$sample_id);
        }

        range_min = round(time_stream[range_min], 2);
        range_max = round(time_stream[range_max], 2);
        sample_info = append(sample_info, rep(`time_${range_min}~${range_max}s`, times = nsamples));
    }

    colnames(omics) = append("symbols", sample_names);
    rownames(omics) = omics[, "symbols"];
    omics[, "symbols"] = NULL;

    list(
        fluxomics = omics, 
        sample_info = data.frame(
            sample_id = sample_names, 
            sample_info = sample_info
        )
    );
}