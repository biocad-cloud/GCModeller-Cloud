require(Markdown2Pdf);
require(JSON);

#' Create html and pdf report
#' 
Report = function(model, workdir) {
    report = reportTemplate(`${@dir}/../reports/PLAS_Dynamics`);
    report["plas_graph"] = model;
    report["WEBCONTEXT"] = "http://biocad.cloud:8848/";
    report["pathway_dynamics"] = pathway_dynamics(workdir);
    report["flux_dynamics"]    = flux_dynamics(workdir);
    report["cover_image"] = cover_image();
    report
    |> pdf::makePDF(
        pdfout = `${workdir}/report.pdf`,
        pageOpts = pdfPage_options(
            javascriptdelay = 10000,
            loaderrorhandling = "ignore"
        )
    );
}

cover_image = function() {
    template = `${@dir}/../reports/PLAS_Dynamics/`;
    cover = dataUri(`${template}/cover.png`);
    cover = `<img src="${cover}" style="width: 100%;"/>`;
    cover; 
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