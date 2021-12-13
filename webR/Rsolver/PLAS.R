require(GCModeller);

const argv as string = [?"--args" || stop("missing of the task configuration data!")] |> bdecode;
const guid as string = [?"--guid" || stop("a task guid is required!")];

print(`target task: ${guid}`);
print("view of the task arguments:");
str(argv);


