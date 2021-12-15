#' Convert list to data.frame
#'  
#' @param list a data list, the elements in this list 
#'    object should be also a list type, and the list 
#'    elements should be contains the same element 
#'    keys.
#'
const cast_table as function(list) {
    allFields = unique(unlist(lapply(list, names)));
    data = data.frame(id = 1:length(list));

    for(name in allFields) {
        data[, name] = sapply(list, r -> r[[name]]);
    }

    data;
}

const to_Ssystem as function(model) {
    print("view of the model file content:");
    # str(model);

    nodes = cast_table(model$nodeDataArray);
    links = cast_table(model$linkDataArray);

    print(nodes);
    # print(links);
    
    links = (links[, "category"]) 
    |> unique() 
    |> lapply(function(cat) {
        links[links[, "category"] == cat, ];
    }, names = type -> type);

    flow = links$flow;
    influence = links$influence;

    print("flow flux list:");
    print(flow);
    print("flux influence");
    print(influence);

    # symbols
    symbols = nodes[nodes[, "category"] != "valve", ];
    symbols = symbols[, "key"];

    print("contains symbols:");
    print(symbols);

    lapply(symbols, symbol -> cast_sexpr(symbol, flow, influence));
}

const cast_sexpr as function(symbol, flow, influence) {
    const in  = flow[, "from"][flow[, "to"] == symbol];
    const out = flow[, "to"][flow[, "from"] == symbol];

    
}
