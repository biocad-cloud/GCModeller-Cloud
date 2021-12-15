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

solve_Ssystem(S = model);



