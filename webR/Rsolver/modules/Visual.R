
#' Do visual plot of the metabolic flux omics data
#' 
FluxVisual = function(fluxomics, sample_info, background, outputdir = "./") {
    print("view of the pathway collection group:");
    str(background);

    print("plot flux lines for each pathway group:");

    for(pathway in names(background)) {
        nodes = background[[pathway]];

        print(pathway);
        print(nodes, max.print = 10);
    }
}