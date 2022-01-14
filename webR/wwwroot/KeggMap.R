require(GCModeller);
print("~~~~~~~~~~~");
imports "report.utils" from "kegg_kit";
print("==================");
const run as function(id) {
	const kegg = GCModeller::kegg_maps(rawMaps = FALSE);
	const map  = kegg[[id]]; 
	const html = keggMap.reportHtml(map, list());

	writeLines(html, con = buffer("text"));
}