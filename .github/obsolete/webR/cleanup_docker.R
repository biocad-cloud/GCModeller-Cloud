# run prune command at first
#
# docker container prune 

id = as.vector(unlist(sapply(system('docker images | grep "<none>"', intern = TRUE), function(s) {
	strsplit(s,"\\s+", fixed = FALSE)[[1]][3];
})));

print(id);

for(ref in id) {
    system(sprintf("docker rmi %s", ref));
}