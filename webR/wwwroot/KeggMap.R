require(GCModeller);

imports "report.utils" from "kegg_kit";

const run as function(id) {
	const kegg = GCModeller::kegg_maps(rawMaps = FALSE);
	const map  = kegg[id]; 
	const html = keggMap.reportHtml(map, list());

	writeLine(html, con = buffer("text"));
}