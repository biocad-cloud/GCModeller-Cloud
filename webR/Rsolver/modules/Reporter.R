require(Markdown2Pdf);
require(JSON);
require(igraph);
require(ggplot);

#' Create html and pdf report
#' 
Report = function(model, workdir) {
    report = reportTemplate(`${@dir}/../reports/PLAS_Dynamics`);
    report["plas_graph"] = render_graph(JSON::json_decode(model), workdir);
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

render_graph = function(json, workdir) {
    nodes = as.data.frame(json$nodeDataArray);
    nodes = nodes[(nodes[, "category"] != "valve"), ];

    links = as.data.frame(json$linkDataArray);
    groupNames = nodes[as.logical(nodes[, "isGroup"]), ];
    groupNames = as.list(groupNames, byrow = TRUE);
    groupNames = lapply(groupNames, r -> r$text, names = r -> r$key);

    str(groupNames);
    print(nodes, max.print = 13);

    g = graph(from = links[, "from"], to = links[, "to"]);
    v = V(g);

    print(xref(v));

    xref = xref(v);

    i = sapply(nodes[, "key"], id -> which(id == xref));
    print(i);
    v$label = (nodes[, "label"])[i];
    v$group = sapply((nodes[, "group"])[i], key ->  ifelse((!is.null(key)) && (key in groupNames), groupNames[[key]], "undefined"));

    print(v$label);
    print(v$group);

    bitmap(file = `${workdir}/graph.png`, size = [3200, 2700]) {
        ggplot(g) + geom_edge_link() + geom_node_point() + geom_node_text() + layout_forcedirected();
    }

    graph = dataUri(`${workdir}/graph.png`);
    graph = `<img src="${graph}" style="width: 100%;"/>`;
    graph; 
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