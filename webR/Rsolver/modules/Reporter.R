require(Markdown2Pdf);
require(JSON);

#' Create html and pdf report
#' 
Report = function(model, workdir) {
    report = reportTemplate(`${@dir}/../reports/PLAS_Dynamics`);
    report["plas_graph"] = model;
    report["pathway_dynamics"] = pathway_dynamics(workdir);
    report["flux_dynamics"]    = flux_dynamics(workdir);

    pdf::makePDF(report, pdfout = `${workdir}/report.pdf`);
}

pathway_dynamics = function(workdir) {
    `${workdir}/visual/pathway/`
    |> list.files(pattern = "*.png")
    |> sapply(function(file) {
        img = dataUri(file);
        img = `<img src="${img}" style="width: 90%;"/>`;
        img; 
    })
    |> paste("")
    ;
}

flux_dynamics = function(workdir) {
    `${workdir}/visual/flux/`
    |> list.files(pattern = "*.png")
    |> sapply(function(file) {
        img = dataUri(file);
        img = `<img src="${img}" style="width: 90%;"/>`;
        img; 
    })
    |> paste("")
    ;
}