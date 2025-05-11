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

    background = custom_pathway(model);
    nodes = cast_table(model$nodeDataArray);
    nodes = nodes[!as.logical(nodes[, "isGroup"]), ];
    links = cast_table(model$linkDataArray);
    symbolNames = lapply(model$nodeDataArray, function(x) {
        ifelse(is.null(x$label), x$key, x$label);
    }, names = x -> x$key); 

    print(nodes);
    print("get symbol name mapping as:");
    str(symbolNames);

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

    factors = !(names(symbolNames) in symbols);
    factors = names(symbolNames)[factors];
    factors = lapply(factors, any -> 1, names = factors);

    list(
        names = symbolNames,
        factors = factors, 
        S = lapply(symbols, symbol -> cast_sexpr(symbol, flow, influence), names = symbols),
        background = background
    );
}

const buildGenerator as function(symbol, flow, influence) {
    i = flow[, "to"] == symbol;
    upstream = (flow[, "from"])[i];
    flux_id = (flow[, "labelKeys"])[i];

    if (sum(i) == 0) {
        return([]);
    } else {
        addFactors(upstream, influence, flux_id);
    }   
}

const addFactors as function(symbols, influence, flux_id) {
    adjust = (influence[, "to"] in flux_id);
    adjust = (influence[, "from"])[adjust];

    flux = sapply(symbols, x -> `${x} ^ 0.5`);

    if (length(adjust) > 0) {
        flux = adjust 
        |> sapply(x -> `${x} ^ (-1)`)
        |> append(flux)
        ;
    }

    flux;
}

const buildConsumer as function(symbol, flow, influence) {
    i = flow[, "from"] == symbol;
    downstream = (flow[, "to"])[i];
    flux_id = (flow[, "labelKeys"])[i];

    if (sum(i) == 0) {
        return([]);
    } else {
        addFactors(downstream, influence, flux_id);
    }
}

const cast_sexpr as function(symbol, flow, influence) {
    # generate current symbol: X -> symbol
    in  = buildGenerator(symbol, flow, influence);
    # consume current symbol:  symbol -> X
    out = buildConsumer(symbol, flow, influence);

    if (length(in) > 0) {
        in = paste(in, "*");
    } else {
        in = "";
    }

    if (length(out) > 0) {
        out = paste(out, "*");
    } else {
        out = "";
    }

    if ((nchar(in) == 0) && (nchar(out) == 0)) {
        return("0");
    } else {
        if (nchar(in) == 0) {
            return(`-${out}`);
        } else {
            if (nchar(out) == 0) {
                return(in);
            } else {
                return(`${in} - ${out}`);
            }    
        } 
    }  
}
