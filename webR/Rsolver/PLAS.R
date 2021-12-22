require(GCModeller);

# talk with biocad.cloud via jsonrpc
imports "jsonrpc.R";
imports "modules/PLAS_Solver.R";
imports "modules/SBuilder.R";
imports "modules/Fluxomics.R";
imports "modules/CustomPathway.R";

argv = [?"--args" || stop("missing of the task configuration data!")] |> bdecode;
guid = [?"--guid" || stop("a task guid is required!")];

print(`target task: ${guid}`);
print("view of the task arguments:");
str(argv);

print(setTaskStatus(guid, 1));

print("get systems dynamics model data...");
model = call_rpc("getModelFile", list(id = argv$model));
model = model$result;

# results file will be saved at here
trial_run = `${dirname(model$uri)}/trial_run/${guid}/`;
# get the json file path of the target model
file      = `${model$uri}/${model$current_version}.${model$suffix}`;

print("get model file path:");
print(file);

# convert model file to S-system and then
# run dynamics simulator
model = file 
|> readText() 
|> json_decode() 
|> to_Ssystem()
;

print("create S-system model:");
str(model);

result = solve_Ssystem(S = model$S, factors = model$factors);
keys   = colnames(result);
names  = model$names;
names  = sapply(keys, key -> names[[key]]);

colnames(result) = unique.names(names);

print("get simulator outputs:");
print(result, max.print = 15);

cat("~~done!\n");
print("result files will be saved at location: ");
print(trial_run);

# save result matrix
write.csv(result, file = `${trial_run}/PLAS.csv`);

print(setTaskStatus(guid, 200));