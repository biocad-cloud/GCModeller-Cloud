require(GCModeller);

# talk with biocad.cloud via jsonrpc
imports "jsonrpc.R";
imports "S.system" from "simulators";

argv = [?"--args" || stop("missing of the task configuration data!")] |> bdecode;
guid = [?"--guid" || stop("a task guid is required!")];

print(`target task: ${guid}`);
print("view of the task arguments:");
str(argv);

print("get systems dynamics model data...");
model = call_rpc("getModelFile", list(id = argv$model));
model = model$result;
file = `${model$uri}/${model$current_version}.${model$suffix}`;

print("get model file path:");
print(file);

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
    
    links = links[, "category"] 
    |> unique() 
    |> lapply(function(cat) {
        type = links[, "category"] == cat;
        links[type, ];
    });

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

}

model = file 
|> readText() 
|> json_decode() 
|> to_Ssystem()
;



