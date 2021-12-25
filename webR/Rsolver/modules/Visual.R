require(ggplot);

#' Do visual plot of the metabolic flux omics data
#' 
FluxVisual = function(fluxomics, sample_info, simulates, background, outputdir = "./") {
    print("view of the pathway collection group:");
    str(background);

    print(colnames(simulates));
    
    simulates[, "#Time"] = as.numeric(rownames(simulates));

    print("plot flux lines for each pathway group:");

    for(pathway in names(background)) {
        nodes = background[[pathway]];

        print(pathway);
        print(nodes, max.print = 10);

        data = simulates[, nodes[, "label"]];
        MetabolicFluxLines(data, pathway, outputdir = outputdir);
    }
}

MetabolicFluxLines = function(data, pathway, outputdir = "./") {
    require(ggplot);

    x = seq(-5,5, by = 0.2);
    y = sin(x);

    bitmap(file = `${outputdir}/visual/flux/${pathway}.png`, width = 2400, height = 1600) {
        p = ggplot(data, padding = "padding: 200px 500px 200px 200px;");

        for(name in colnames(data)) {
            if (name != "#Time") {
                p = p + geom_line(aes(x = "#Time", y = name), width = 8);
            }
        }

        p;
    }
}