imports "../modules/SBuilder.R";

require(JSON);

file = `${@dir}/1639306937.json`;
model = file 
|> readText() 
|> json_decode() 
|> to_Ssystem()
;

str(model);