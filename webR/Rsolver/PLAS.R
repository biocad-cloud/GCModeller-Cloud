require(GCModeller);

# talk with biocad.cloud via jsonrpc
imports "jsonrpc.R";

argv = [?"--args" || stop("missing of the task configuration data!")] |> bdecode;
guid = [?"--guid" || stop("a task guid is required!")];

print(`target task: ${guid}`);
print("view of the task arguments:");
str(argv);


