require(GCModeller);

imports "report.utils" from "kegg_kit";

const run as function(id) {
	const kegg = GCModeller::kegg_maps(rawMaps = FALSE);
	const map  = kegg[[id]]; 
	const html = keggMap.reportHtml(map, list());

	print("get target map:");
	print(toString(map));

	writeLines(html, con = buffer("text"));
}