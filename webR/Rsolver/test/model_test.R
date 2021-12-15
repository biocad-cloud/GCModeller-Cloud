require(GCModeller);

imports "../modules/SBuilder.R";
imports "../modules/PLAS_Solver.R";

require(JSON);

file = `${@dir}/1639306937.json`;
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
print(keys);
print(names);

colnames(result) = unique.names(names);

print(result, max.print = 15);

write.csv(result, file = `${@dir}/simulates.csv`);

