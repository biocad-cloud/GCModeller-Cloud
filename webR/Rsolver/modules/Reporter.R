require(Markdown2Pdf);
require(JSON);

#' Create html and pdf report
#' 
Report = function(model, workdir) {
    report = reportTemplate(`${@dir}/../reports/PLAS_Dynamics`);
    report["plas_graph"] = model;

    pdf::makePDF(report, pdfout = `${workdir}/report.pdf`);
}