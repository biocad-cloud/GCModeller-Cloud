var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path="../../build/linq.d.ts" />
/// <reference path="../../layer.d.ts" />
var biodeep;
(function (biodeep) {
    var app;
    (function (app) {
        function start() {
            Router.AddAppHandler(new apps.Metabolic_pathway());
            Router.RunApp();
        }
        app.start = start;
    })(app = biodeep.app || (biodeep.app = {}));
})(biodeep || (biodeep = {}));
$ts.mode = Modes.debug;
$ts(biodeep.app.start);
var apps;
(function (apps) {
    var Cola_graph = /** @class */ (function () {
        function Cola_graph(node, link, group, label, vm) {
            this.node = node;
            this.link = link;
            this.group = group;
            this.label = label;
            this.vm = vm;
            console.log(this);
        }
        Cola_graph.prototype.tick = function () {
            var vm = this.vm;
            var simulator = this;
            return function () {
                simulator.node.each(function (d) { return d.innerBounds = d.bounds.inflate(-vm.margin); });
                simulator.link.each(function (d) { return d.route = cola.makeEdgeBetween(d.source.innerBounds, d.target.innerBounds, 5); });
                simulator.link
                    .attr("x1", function (d) { return d.route.sourceIntersection.x; })
                    .attr("y1", function (d) { return d.route.sourceIntersection.y; })
                    .attr("x2", function (d) { return d.route.arrowStart.x; })
                    .attr("y2", function (d) { return d.route.arrowStart.y; });
                simulator.label.each(function (d) {
                    var b = this.getBBox();
                    d.width = b.width + 2 * vm.margin + 8;
                    d.height = b.height + 2 * vm.margin + 8;
                });
                simulator.node
                    .attr("x", function (d) { return d.innerBounds.x; })
                    .attr("y", function (d) { return d.innerBounds.y; })
                    .attr("width", function (d) { return d.innerBounds.width(); })
                    .attr("height", function (d) { return d.innerBounds.height(); });
                simulator.group
                    .attr("x", function (d) { return d.bounds.x; })
                    .attr("y", function (d) { return d.bounds.y; })
                    .attr("width", function (d) { return d.bounds.width(); })
                    .attr("height", function (d) { return d.bounds.height(); });
                simulator.label.attr("transform", function (d) { return simulator.transform(d); });
            };
        };
        Cola_graph.prototype.transform = function (d) {
            return "translate(" + d.x + this.vm.margin + ", " + (d.y + this.vm.margin - d.height / 2) + ")";
        };
        return Cola_graph;
    }());
    apps.Cola_graph = Cola_graph;
})(apps || (apps = {}));
var apps;
(function (apps) {
    var Metabolic_pathway = /** @class */ (function (_super) {
        __extends(Metabolic_pathway, _super);
        function Metabolic_pathway() {
            var _this = _super.call(this) || this;
            _this.width = 800;
            _this.height = 520;
            _this.margin = 6;
            _this.pad = 12;
            _this.width = parseFloat($ts("@width"));
            _this.height = parseFloat($ts("@height"));
            return _this;
        }
        Object.defineProperty(Metabolic_pathway.prototype, "appName", {
            get: function () {
                return "Metabolic_pathway";
            },
            enumerable: true,
            configurable: true
        });
        Metabolic_pathway.prototype.redraw = function () {
            this.vis.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
        };
        Metabolic_pathway.prototype.savePng = function () {
            saveSvgAsPng($ts("#canvas").childNodes.item(0), "pathway.png");
        };
        Metabolic_pathway.prototype.init = function () {
            var _this = this;
            var graph_url = $ts("@graph");
            this.d3cola = cola.d3adaptor(d3)
                .linkDistance(60)
                .avoidOverlaps(true)
                .size([this.width, this.height]);
            this.outer = d3.select($ts("#canvas")).append("svg")
                .attr("width", this.width)
                .attr("height", this.height)
                .attr("pointer-events", "all");
            this.outer.append('rect')
                .attr('class', 'background')
                .attr('width', "100%")
                .attr('height', "100%")
                .call(d3.behavior.zoom().on("zoom", function () { return _this.redraw(); }));
            this.vis = this.outer
                .append('g')
                .attr('transform', 'translate(80,80) scale(0.7)');
            if (graph_url.charAt(0) == "#") {
                // load from a svg container node            
                this.d3cola.on("tick", this.loadGraph(new dataAdapter.parseDunnart(graph_url).getGraph()).tick());
            }
            else {
                $ts.getText(graph_url, function (json) { return _this.d3cola.on("tick", _this.loadGraph(JSON.parse(json)).tick()); });
            }
            console.log("intialization job done!");
        };
        /**
         * load network graph model and then
         * initialize data visualization
         * components.
        */
        Metabolic_pathway.prototype.loadGraph = function (graph) {
            var _this = this;
            var groupsLayer = this.vis.append("g");
            var nodesLayer = this.vis.append("g");
            var linksLayer = this.vis.append("g");
            console.log(JSON.stringify(graph));
            this.d3cola
                .nodes(graph.nodes)
                .links(graph.links)
                .groups(graph.groups)
                .constraints(graph.constraints)
                .start();
            // define arrow markers for graph links
            this.outer.append('svg:defs').append('svg:marker')
                .attr('id', 'end-arrow')
                .attr('viewBox', '0 -5 10 10')
                .attr('refX', 5)
                .attr('markerWidth', 3)
                .attr('markerHeight', 3)
                .attr('orient', 'auto')
                .append('svg:path')
                .attr('d', 'M0,-5L10,0L0,5L2,0')
                .attr('stroke-width', '0px')
                .attr('fill', '#000');
            var group = groupsLayer.selectAll(".group")
                .data(graph.groups)
                .enter().append("rect")
                .attr("rx", 8).attr("ry", 8)
                .attr("class", "group")
                .attr("style", function (d) { return d.style; });
            var link = linksLayer.selectAll(".link")
                .data(graph.links)
                .enter()
                .append("line")
                .attr("class", "link");
            var node = nodesLayer.selectAll(".node")
                .data(graph.nodes)
                .enter().append("rect")
                .attr("class", "node")
                .attr("width", function (d) { return d.width + 2 * _this.pad + 2 * _this.margin; })
                .attr("height", function (d) { return d.height + 2 * _this.pad + 2 * _this.margin; })
                .attr("rx", function (d) { return d.rx; })
                .attr("ry", function (d) { return d.rx; })
                .call(this.d3cola.drag);
            var label = nodesLayer.selectAll(".label")
                .data(graph.nodes)
                .enter().append("text")
                .attr("class", "label")
                .call(this.d3cola.drag);
            label.each(Metabolic_pathway.insertLinebreaks);
            node.append("title").text(function (d) { return d.label; });
            return new apps.Cola_graph(node, link, group, label, this);
        };
        Metabolic_pathway.insertLinebreaks = function (d) {
            var el = d3.select(this);
            var words = d.label.split(' ');
            var tspan;
            el.text('');
            for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
                var word = words_1[_i];
                tspan = el.append('tspan').text(word);
                tspan
                    .attr('x', 0)
                    .attr('dy', '15')
                    .attr("font-size", "12");
            }
        };
        return Metabolic_pathway;
    }(Bootstrap));
    apps.Metabolic_pathway = Metabolic_pathway;
})(apps || (apps = {}));
var dataAdapter;
(function (dataAdapter) {
    var parseDunnart = /** @class */ (function () {
        function parseDunnart(svgObjId) {
            if (svgObjId === void 0) { svgObjId = "#embeddedsvg"; }
            this.nodeLookup = {};
            var sbsvg = d3.select($ts(svgObjId)).select('svg');
            this.sbsvg = sbsvg;
            this.graph = {
                nodes: [],
                links: [],
                constraints: [],
                groups: []
            };
        }
        parseDunnart.prototype.getGraph = function () {
            var _this = this;
            this.loadNodes(this.sbsvg);
            var connectors = this.sbsvg.selectAll('.connector')[0];
            for (var _i = 0, connectors_1 = connectors; _i < connectors_1.length; _i++) {
                var l = connectors_1[_i];
                var u = l.getAttribute('dunnart:srcid');
                var v = l.getAttribute('dunnart:dstid');
                if (!(u in this.nodeLookup)) {
                    console.warn("missing node of " + u);
                }
                else if (!(v in this.nodeLookup)) {
                    console.warn("missing node of " + v);
                }
                else {
                    this.graph.links.push({
                        source: this.nodeLookup[u].index,
                        target: this.nodeLookup[v].index
                    });
                }
            }
            var clusters = this.sbsvg.selectAll('.cluster')[0];
            for (var _a = 0, clusters_1 = clusters; _a < clusters_1.length; _a++) {
                var g = clusters_1[_a];
                this.graph.groups.push({
                    leaves: g.getAttribute('dunnart:contains').split(' ').map(function (i) { return _this.nodeLookup[i].index; }),
                    style: g.getAttribute('style'),
                    padding: 10
                });
            }
            var constraintMap = {};
            var alignments = this.sbsvg.selectAll('[relType=alignment]')[0];
            for (var _b = 0, alignments_1 = alignments; _b < alignments_1.length; _b++) {
                var alignment = alignments_1[_b];
                var cid = alignment.getAttribute('constraintid');
                var nodeid = this.nodeLookup[alignment.getAttribute('objoneid')].index;
                var alignmentPos = parseInt(alignment.getAttribute('alignmentpos'));
                var o = { node: nodeid, offset: 0 };
                if (cid in constraintMap) {
                    constraintMap[cid].offsets.push(o);
                }
                else {
                    this.graph.constraints.push(constraintMap[cid] = {
                        type: 'alignment',
                        offsets: [o],
                        axis: (alignmentPos == 1 ? "y" : "x")
                    });
                }
            }
            return this.graph;
        };
        parseDunnart.prototype.loadNodes = function (sbsvg) {
            var vm = this;
            var shapes = sbsvg.selectAll('rect.shape')[0];
            var i = 0;
            for (var _i = 0, shapes_1 = shapes; _i < shapes_1.length; _i++) {
                var d = shapes_1[_i];
                vm.graph.nodes.push(vm.nodeLookup[d.id] = {
                    label: d.getAttribute('dunnart:label'),
                    dunnartid: d.id,
                    index: i++,
                    width: 60,
                    height: 40,
                    x: parseFloat(d.getAttribute('x')),
                    y: parseFloat(d.getAttribute('y')),
                    rx: ('rx' in d.attributes) ? parseFloat(d.getAttribute('rx')) : 5,
                    ry: ('ry' in d.attributes) ? parseFloat(d.getAttribute('ry')) : 5
                });
            }
        };
        return parseDunnart;
    }());
    dataAdapter.parseDunnart = parseDunnart;
})(dataAdapter || (dataAdapter = {}));
//# sourceMappingURL=Metabolic_pathway.js.map