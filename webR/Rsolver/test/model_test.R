require(GCModeller);

imports "../modules/SBuilder.R";
imports "../modules/PLAS_Solver.R";
imports "../modules/Fluxomics.R";
imports "../modules/CustomPathway.R";
imports "../modules/Visual.R";

require(JSON);

setwd(@dir);

file = "D:\GCModeller-Cloud\webR\TCA\TCACycle.json";
model = file 
|> readText() 
|> json_decode() 
|> to_Ssystem()
;

str(model);

result = solve_Ssystem(S = model$S, factors = model$factors);
keys = colnames(result);
names = model$names;
names =  sapply(keys, key -> names[[key]]);
# print(keys);
# print(names);

colnames(result) = unique.names(names);

# cat("\n\n");

print("get simulator result:");
print(result, max.print = 15);

write.csv(result, file = "./simulates.csv");

[fluxomics, sample_info] = Fluxomics(result, model$background);

FluxVisual(fluxomics, sample_info, result, model$background, outputdir = "./");