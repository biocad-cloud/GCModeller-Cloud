
#' Create custom pathway background model for GSEA dynamic.
#' 
custom_pathway = function(model) {
    nodes = cast_table(model$nodeDataArray);
    nodes = nodes[(nodes[, "category"] != "valve"), ];
    pathways = nodes[as.logical(nodes[, "isGroup"]), ];

    print("get all element symbols in current dynamics system:");
    print(nodes);

    if (nrow(pathways) == 0) {
        print("there is no custom pathway was found!");
        return(NULL);
    } else {
        id = pathways[, "key"];
        name = pathways[, "text"];

        print(`found ${length(id)} custom pathway:`);
        print(name);
    
        group = nodes[, "group"];
        pathways = lapply(1:length(id), function(i) {           
            nodes[(id[i] == group), ];
        }, names = name);

        print("create custom background model for run GSEA:");
        str(pathways);

        pathways;
    }
}