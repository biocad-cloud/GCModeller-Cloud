imports ["network", "repository"] from "kegg_kit";

const run as function(id) {
	const kegg = GCModeller::kegg_maps(rawMaps = FALSE);
	const map  = kegg[[id]]; 
	const cid  = compoundsId(map);
	const g    = fromCompounds(cid, GCModeller::kegg_reactions());
	
	editor_graph(V(g), E(g))	
	|> json_encode()
	|> writeLines(con = buffer("text"))
	;
}

const editor_graph as function(v, e) {
	const nodes = sapply(v, x -> list(key = x$label,category = "stock",label = x$text,loc = "0,0",group = NULL));
	const links = sapply(e, l -> list(category = "flow",text = l$text,from = l$u$label,to = l$v$label,labelKeys = []));

	list(
		class = "GraphLinksModel",
		linkLabelKeysProperty = "labelKeys",
		nodeDataArray = nodes,
		linkDataArray = links
	);
}