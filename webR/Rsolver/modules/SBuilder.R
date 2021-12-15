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

    lapply(symbols, symbol -> cast_sexpr(symbol, flow, influence), names = symbols);
}

const cast_sexpr as function(symbol, flow, influence) {
    # generate current symbol: X -> symbol
    in  = (flow[, "from"])[flow[, "to"] == symbol];
    # consume current symbol:  symbol -> X
    out = (flow[, "to"])[flow[, "from"] == symbol];

    if (length(in) > 0) {
        in = sapply(in, x -> `${x} ^ 0.5`) |> paste("*");
    } else {
        in = "";
    }

    if (length(out) > 0) {
        out = sapply(out, x -> `${x} ^ 0.5`) |> paste("*");
    } else {
        out = "";
    }

    if ((in == "") && (out == "")) {
        return("0");
    } else {
        if (in == "") {
            return(`-${out}`);
        } else if (out == "") {
            return(in);
        } else {
            return(`${in} - ${out}`);
        }        
    }  
}
