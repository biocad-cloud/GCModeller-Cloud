require(GCModeller);

# talk with biocad.cloud via jsonrpc
imports "jsonrpc.R";

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

model = file |> readText() |> json_decode();

print("view of the model file content:");
str(model);