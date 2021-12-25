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
        data[, "#Time"] = simulates[, "#Time"];

        MetabolicFluxLines(data, pathway, outputdir = outputdir);
    }
}

MetabolicFluxLines = function(data, pathway, outputdir = "./") {
    bitmap(file = `${outputdir}/visual/flux/${pathway}.png`, width = 3300, height = 1700) {
        p = ggplot(data, padding = "padding: 200px 900px 200px 250px;");

        for(name in colnames(data)) {
            if (name != "#Time") {
                p = p + geom_line(aes(x = "#Time", y = name, title = name), width = 8);
            }
        }

        p = p 
        + labs(x = "Time(ticks)", y = "metabolic activity")
        + ggtitle(`Systems Dynamics of ${pathway}`)
        + scale_x_continuous(labels = "F0")
        + scale_y_continuous(labels = "F2")
        ;

        p;
    }
}