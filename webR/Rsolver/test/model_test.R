imports "../modules/SBuilder.R";

file = `${@dir}/1639306937.json`;
model = file 
|> readText() 
|> json_decode() 
|> to_Ssystem()
;

print(model);