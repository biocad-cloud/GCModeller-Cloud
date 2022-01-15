imports ["network", "repository"] from "kegg_kit";

require(JSON);

# map00020
const run as function(id) {
	const kegg = GCModeller::kegg_maps(rawMaps = FALSE);
	const map  = kegg[[id]]; 	
	const g    = map 
	|> compoundsId() 
	|> fromCompounds(GCModeller::kegg_reactions(), enzymeBridged = FALSE)
	;
	
	editor_graph(V(g), E(g))	
	|> json_encode()
	|> writeLines(con = buffer("text"))
	;
}

const editor_graph as function(v, e) {
	const nodes = sapply(v, x -> list(key = x$label, category = "stock", label = x$text, loc = "0,0", group = NULL));
	const links = sapply(e, l -> list(category = "flow", text = l$ID, from = as.object(l$U)$label, to = as.object(l$V)$label, labelKeys = []));

	list(
		class = "GraphLinksModel",
		linkLabelKeysProperty = "labelKeys",
		nodeDataArray = nodes,
		linkDataArray = links
	);
}