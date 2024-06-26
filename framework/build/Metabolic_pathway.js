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
/// <reference path="../../build/biocad_webcore.d.ts" />
var biodeep;
(function (biodeep) {
    var app;
    (function (app) {
        function start() {
            Router.AddAppHandler(new apps.PathwayExplorer());
            Router.AddAppHandler(new apps.FlowEditor());
            Router.AddAppHandler(new apps.KEGGNetwork());
            Router.AddAppHandler(new apps.Viewer());
            Router.RunApp();
        }
        app.start = start;
    })(app = biodeep.app || (biodeep.app = {}));
})(biodeep || (biodeep = {}));
var __indexOf = Array.prototype.indexOf || function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item)
            return i;
    }
    return -1;
};
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
    var Metabolic_pathway = /** @class */ (function () {
        function Metabolic_pathway() {
            this.width = 800;
            this.height = 520;
            this.margin = 6;
            this.pad = 12;
            console.log("get display size:");
            this.width = this.getDim("@width");
            this.height = this.getDim("@height");
            console.log({
                width: this.width,
                height: this.height
            });
        }
        Metabolic_pathway.prototype.getDim = function (key) {
            return parseFloat($ts(key));
        };
        Metabolic_pathway.prototype.redraw = function () {
            this.vis.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
        };
        Metabolic_pathway.prototype.savePng = function () {
            saveSvgAsPng($ts("#canvas").childNodes.item(0), "pathway.png");
        };
        /**
         * show model file
        */
        Metabolic_pathway.prototype.init = function () {
            var _this = this;
            var graph_url = $ts("@url:graph");
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
                this.d3cola.on("tick", this.loadGraph(Metabolic_pathway.readGraph(graph_url)).tick());
            }
            else {
                $ts.getText(graph_url, function (json) { return _this.d3cola.on("tick", _this.loadGraph(JSON.parse(json)).tick()); });
            }
            TypeScript.logging.log("intialization job done!", TypeScript.ConsoleColors.DarkBlue);
            return this;
        };
        Metabolic_pathway.readGraph = function (id) {
            var html = $ts(id);
            if (html.tagName.toLowerCase() == "script") {
                var json = JSON.parse(html.innerText);
                var graph = apps.translation.translateToColaGraph(json);
                return graph;
            }
            else {
                return new dataAdapter.parseDunnart(id).getGraph();
            }
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
            if ((!Strings.Empty(graph.class)) && (graph.class == "GraphLinksModel")) {
                graph = apps.translation.translateToColaGraph(graph);
            }
            console.log(JSON.stringify(graph));
            console.log("view nodes details:");
            console.table(graph.nodes);
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
    }());
    apps.Metabolic_pathway = Metabolic_pathway;
})(apps || (apps = {}));
var apps;
(function (apps) {
    var translation;
    (function (translation) {
        translation.paper_colors = [
            "#D02823", "#0491d0", "#88bb64", "#15DBFF",
            "#583B73", "#f2ce3f", "#8858BF", "#CCFF33",
            "#fb5b44", "#361f32", "#DF2789", "#396b1c"
        ];
        function translateToColaGraph(graph) {
            var g = {
                groups: [],
                constraints: [],
                links: [],
                nodes: []
            };
            var nodeIndex = {};
            var groups = {};
            // get pathway group information
            for (var _i = 0, _a = graph.nodeDataArray; _i < _a.length; _i++) {
                var node = _a[_i];
                if ((!isNullOrUndefined(node.isGroup)) && node.isGroup) {
                    var color = translation.paper_colors[Object.keys(groups).length];
                    groups[node.key.toString()] = {
                        leaves: [],
                        padding: 10,
                        style: "fill:" + color + ";fill-opacity:0.31764700000000001;stroke:" + color + ";stroke-opacity:1"
                    };
                }
            }
            var pos;
            // add node into network graph
            for (var _b = 0, _c = graph.nodeDataArray; _b < _c.length; _b++) {
                var node = _c[_b];
                if ((!isNullOrUndefined(node.isGroup)) && node.isGroup) {
                    continue;
                }
                else if (node.category == "valve") {
                    continue;
                }
                var loc = node.loc;
                if (Strings.Empty(loc)) {
                    pos = [0, 0];
                }
                else {
                    pos = loc.split(/\s+/ig).map(function (t) { return parseFloat(t); });
                }
                if (pos.length < 2) {
                    pos = [0, 0];
                }
                g.nodes.push({
                    dunnartid: (g.nodes.length + 1).toString(),
                    height: 40,
                    index: g.nodes.length,
                    label: node.label,
                    rx: 9,
                    ry: 9,
                    width: 60,
                    x: pos[0],
                    y: pos[1]
                });
                nodeIndex[node.key] = g.nodes.length - 1;
                if (!isNullOrUndefined(node.group)) {
                    groups[node.group.toString()].leaves.push(g.nodes.length - 1);
                }
            }
            for (var _d = 0, _e = graph.linkDataArray; _d < _e.length; _d++) {
                var link = _e[_d];
                g.links.push({
                    source: nodeIndex[link.from],
                    target: nodeIndex[link.to]
                });
            }
            for (var name_1 in groups) {
                g.groups.push(groups[name_1]);
            }
            return g;
        }
        translation.translateToColaGraph = translateToColaGraph;
    })(translation = apps.translation || (apps.translation = {}));
})(apps || (apps = {}));
var apps;
(function (apps) {
    var Viewer = /** @class */ (function (_super) {
        __extends(Viewer, _super);
        function Viewer() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.Metabolic_pathway = new apps.Metabolic_pathway();
            return _this;
        }
        Object.defineProperty(Viewer.prototype, "appName", {
            get: function () {
                return "ModelViewer";
            },
            enumerable: true,
            configurable: true
        });
        ;
        Viewer.prototype.init = function () {
            this.Metabolic_pathway.init();
        };
        return Viewer;
    }(Bootstrap));
    apps.Viewer = Viewer;
})(apps || (apps = {}));
var apps;
(function (apps) {
    var FlowEditor = /** @class */ (function (_super) {
        __extends(FlowEditor, _super);
        function FlowEditor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * SD is a global variable, to avoid polluting global namespace
             * and to make the global nature of the individual variables
             * obvious.
            */
            _this.SD = {
                /**
                 * Set to default mode.  Alternatives are
                 * "node" and "link", for adding a new node
                 * or a new link respectively.
                */
                mode: "pointer",
                /**
                 * Set when user clicks on a node or link
                 * button.
                */
                itemType: "pointer",
                nodeCounter: { stock: 0, cloud: 0, variable: 0, valve: 0 }
            };
            return _this;
            //#end region
        }
        Object.defineProperty(FlowEditor.prototype, "appName", {
            get: function () {
                return "FlowEditor";
            },
            enumerable: true,
            configurable: true
        });
        FlowEditor.prototype.config = function () {
            var SD = this.SD;
            var vm = this;
            return {
                "undoManager.isEnabled": true,
                "allowLink": false,
                "animationManager.isEnabled": false,
                "linkingTool.portGravity": 0,
                "linkingTool.doActivate": function () {
                    // change the curve of the LinkingTool.temporaryLink
                    this.temporaryLink.curve = (SD.itemType === "flow") ? go.Link.Normal : go.Link.Bezier;
                    this.temporaryLink.path.stroke = (SD.itemType === "flow") ? "blue" : "green";
                    this.temporaryLink.path.strokeWidth = (SD.itemType === "flow") ? 5 : 1;
                    go.LinkingTool.prototype.doActivate.call(this);
                },
                // override the link creation process
                "linkingTool.insertLink": function (fromnode, fromport, tonode, toport) {
                    // to control what kind of Link is created,
                    // change the LinkingTool.archetypeLinkData's category
                    vm.goCanvas.model.setCategoryForLinkData(this.archetypeLinkData, SD.itemType);
                    // Whenever a new Link is drawng by the LinkingTool, it also adds a node data object
                    // that acts as the label node for the link, to allow links to be drawn to/from the link.
                    this.archetypeLabelNodeData = (SD.itemType === "flow") ? { category: "valve" } : null;
                    // also change the text indicating the condition, which the user can edit
                    this.archetypeLinkData.text = SD.itemType;
                    return go.LinkingTool.prototype.insertLink.call(this, fromnode, fromport, tonode, toport);
                },
                "clickCreatingTool.archetypeNodeData": {},
                // allow Ctrl-G to call groupSelection()
                "commandHandler.archetypeGroupData": { text: "Group", isGroup: true, color: "blue" },
                "clickCreatingTool.isDoubleClick": false,
                "clickCreatingTool.canStart": function () {
                    return SD.mode === "node" && go.ClickCreatingTool.prototype.canStart.call(this);
                },
                "clickCreatingTool.insertPart": function (loc) {
                    // customize the data for the new node
                    SD.nodeCounter[SD.itemType] += 1;
                    var newNodeId = SD.itemType + SD.nodeCounter[SD.itemType];
                    this.archetypeNodeData = {
                        key: newNodeId,
                        category: SD.itemType,
                        label: newNodeId
                    };
                    return go.ClickCreatingTool.prototype.insertPart.call(this, loc);
                }
            };
        };
        FlowEditor.prototype.init = function () {
            var $ = go.GraphObject.make;
            var SD = this.SD;
            var vm = this;
            vm.goCanvas = $(go.Diagram, "myDiagram", vm.config());
            var myDiagram = vm.goCanvas;
            // install the NodeLabelDraggingTool as a "mouse move" tool
            myDiagram.toolManager.mouseMoveTools.insertAt(0, new NodeLabelDraggingTool());
            // when the document is modified, add a "*" to the title and enable the "Save" button
            myDiagram.addDiagramListener("Modified", function (e) {
                var button = document.getElementById("SaveButton");
                var idx = document.title.indexOf("*");
                if (button)
                    button.disabled = !myDiagram.isModified;
                if (myDiagram.isModified) {
                    if (idx < 0)
                        document.title += "*";
                }
                else {
                    if (idx >= 0)
                        document.title = document.title.substr(0, idx);
                }
            });
            // generate unique label for valve on newly-created flow link
            myDiagram.addDiagramListener("LinkDrawn", function (e) {
                var link = e.subject;
                if (link.category === "flow") {
                    myDiagram.startTransaction("updateNode");
                    SD.nodeCounter.valve += 1;
                    var newNodeId = "flow" + SD.nodeCounter.valve;
                    var labelNode = link.labelNodes.first();
                    myDiagram.model.setDataProperty(labelNode.data, "label", newNodeId);
                    myDiagram.commitTransaction("updateNode");
                }
            });
            this.buildTemplates();
            this.load();
        };
        FlowEditor.prototype.buildTemplates = function () {
            var $ = go.GraphObject.make;
            var myDiagram = this.goCanvas;
            // Node templates
            myDiagram.nodeTemplateMap.add("stock", $(go.Node, apps.EditorTemplates.nodeStyle(), $(go.Shape, apps.EditorTemplates.shapeStyle(), { desiredSize: new go.Size(90, 30) }), 
            // declare draggable by NodeLabelDraggingTool
            // initial value
            $(go.TextBlock, apps.EditorTemplates.textStyle(10), //{
            // _isNodeLabel: true, alignment: new go.Spot(0.5, 0.5, 0, 30)                     
            // },
            new go.Binding("text", "label"))));
            myDiagram.nodeTemplateMap.add("cloud", $(go.Node, apps.EditorTemplates.nodeStyle(), $(go.Shape, apps.EditorTemplates.shapeStyle(), { figure: "Cloud", desiredSize: new go.Size(35, 35) })));
            myDiagram.nodeTemplateMap.add("valve", $(go.Node, apps.EditorTemplates.nodeStyle(), {
                movable: false,
                layerName: "Foreground",
                alignmentFocus: go.Spot.None
            }, $(go.Shape, apps.EditorTemplates.shapeStyle(), { figure: "Ellipse", desiredSize: new go.Size(5, 5) }), $(go.TextBlock, apps.EditorTemplates.textStyle(0), {
                _isNodeLabel: true,
                alignment: new go.Spot(0.5, 0.5, 0, 20) // initial value
            }, new go.Binding("alignment", "label_offset", go.Spot.parse).makeTwoWay(go.Spot.stringify))));
            myDiagram.nodeTemplateMap.add("variable", $(go.Node, apps.EditorTemplates.nodeStyle(), { type: go.Panel.Auto }, $(go.TextBlock, apps.EditorTemplates.textStyle(), { isMultiline: false }), 
            // the port is in front and transparent, even though it goes around the text;
            // in "link" mode will support drawing a new link
            $(go.Shape, apps.EditorTemplates.shapeStyle(), { isPanelMain: true, stroke: null, fill: "transparent" })));
            // Link templates
            myDiagram.linkTemplateMap.add("flow", $(go.Link, {
                toShortLength: 8,
                routing: go.Link.AvoidsNodes,
                corner: 5,
                relinkableFrom: true,
                relinkableTo: true,
                reshapable: true,
                resegmentable: true
            }, $(go.Shape, { stroke: "blue", strokeWidth: 3 }), $(go.Shape, { fill: "blue", stroke: null, toArrow: "Standard", scale: 1.5 })));
            myDiagram.linkTemplateMap.add("influence", $(go.Link, { curve: go.Link.Bezier, toShortLength: 8 }, $(go.Shape, { stroke: "green", strokeWidth: 1.5 }), $(go.Shape, { fill: "green", stroke: null, toArrow: "Standard", scale: 1.5 })));
            // Groups consist of a title in the color given by the group node data
            // above a translucent gray rectangle surrounding the member parts
            myDiagram.groupTemplate =
                $(go.Group, "Vertical", {
                    selectionObjectName: "PANEL",
                    ungroupable: true // enable Ctrl-Shift-G to ungroup a selected Group
                }, $(go.TextBlock, {
                    //alignment: go.Spot.Right,
                    font: "bold 19px sans-serif",
                    isMultiline: false,
                    editable: true // allow in-place editing by user
                }, new go.Binding("text", "text").makeTwoWay(), new go.Binding("stroke", "color")), $(go.Panel, "Auto", { name: "PANEL" }, $(go.Shape, "Rectangle", // the rectangular shape around the members
                {
                    fill: "rgba(128,128,128,0.2)", stroke: "gray", strokeWidth: 3,
                    portId: "", cursor: "pointer",
                    // allow all kinds of links from and to this port
                    fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                    toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true
                }), $(go.Placeholder, { margin: 10, background: "transparent" }) // represents where the members are
                ), {
                    toolTip: $("ToolTip", $(go.TextBlock, { margin: 4 }, 
                    // bind to tooltip, not to Group.data, to allow access to Group properties
                    new go.Binding("text", "", FlowEditor.groupInfo).ofObject()))
                });
        };
        /**
         * Define the appearance and behavior for Groups
        */
        FlowEditor.groupInfo = function (adornment) {
            // takes the tooltip or context menu, not a group node data object
            var g = adornment.adornedPart;
            // get the Group that the tooltip adorns
            var mems = g.memberParts.count;
            var links = 0;
            g.memberParts.each(function (part) {
                if (part instanceof go.Link)
                    links++;
            });
            return "Group " + g.data.key + ": " + g.data.text + "\n" + mems + " members including " + links + " links";
        };
        FlowEditor.prototype.setMode = function (mode, itemType) {
            var myDiagram = this.goCanvas;
            var SD = this.SD;
            myDiagram.startTransaction();
            document.getElementById(SD.itemType).className = SD.mode + "_normal";
            document.getElementById(itemType).className = mode + "_selected";
            SD.mode = mode;
            SD.itemType = itemType;
            if (mode === "pointer") {
                myDiagram.allowLink = false;
                myDiagram.nodes.each(function (n) { return n.port.cursor = ""; });
            }
            else if (mode === "node") {
                myDiagram.allowLink = false;
                myDiagram.nodes.each(function (n) { return n.port.cursor = ""; });
            }
            else if (mode === "link") {
                myDiagram.allowLink = true;
                myDiagram.nodes.each(function (n) { return n.port.cursor = "pointer"; });
            }
            myDiagram.commitTransaction("mode changed");
        };
        FlowEditor.prototype.autoLayout_click = function () {
            new Editor.layouts.circle(this).generateCircle();
        };
        /**
         * Show the diagram's model in JSON format
         * that the user may edit.
         *
        */
        FlowEditor.prototype.save_click = function () {
            this.dosave();
        };
        FlowEditor.prototype.load = function () {
            var _this = this;
            var model_id = $ts("@data:model_id");
            var uri = "@api:load?model_id=" + model_id;
            if ((!Strings.Empty(model_id, true)) && model_id.charAt(0) == "#") {
                this.loadModelFromJsonText($ts.text(model_id));
            }
            else {
                $ts.getText(uri, function (json) { return _this.loadModelFromJsonText(json); });
            }
        };
        FlowEditor.prototype.loadModelFromJsonText = function (json) {
            var model = apps.ModelPatch(JSON.parse(json));
            var jsonStr = JSON.stringify(model);
            var vm = this;
            vm.goCanvas.model = go.Model.fromJson(jsonStr);
        };
        FlowEditor.prototype.dosave = function (callback) {
            if (callback === void 0) { callback = null; }
            var myDiagram = this.goCanvas;
            var modelJson = myDiagram.model.toJson();
            var payload = {
                guid: $ts("@data:model_id"),
                model: apps.ModelPatch(JSON.parse(modelJson)),
                type: "dynamics"
            };
            myDiagram.isModified = false;
            // save model at first
            $ts.post("@api:save", payload, function (resp) {
                if (resp.code != 0) {
                    console.error(resp.info);
                }
                else if ((!isNullOrUndefined(resp.info)) && (!isNullOrUndefined(callback))) {
                    callback(resp.info);
                }
            });
        };
        //#region "button events"
        FlowEditor.prototype.pointer_click = function () {
            this.setMode('pointer', 'pointer');
        };
        FlowEditor.prototype.stock_click = function () {
            this.setMode('node', 'stock');
        };
        FlowEditor.prototype.cloud_click = function () {
            this.setMode('node', 'cloud');
        };
        FlowEditor.prototype.variable_click = function () {
            this.setMode('node', 'variable');
        };
        FlowEditor.prototype.flow_click = function () {
            this.setMode('link', 'flow');
        };
        FlowEditor.prototype.influence_click = function () {
            this.setMode('link', 'influence');
        };
        /**
         * save the current dynamics system
        */
        FlowEditor.prototype.run_click = function () {
            var _this = this;
            this.dosave(function (f) { return _this.doRunModel(f); });
        };
        FlowEditor.prototype.doRunModel = function (guid) {
            $ts.post("@api:run/" + guid, { guid: guid }, function (resp) {
                if (resp.code != 0) {
                    console.error(resp.info);
                }
                else {
                    $goto(resp.url);
                }
            });
        };
        return FlowEditor;
    }(Bootstrap));
    apps.FlowEditor = FlowEditor;
})(apps || (apps = {}));
var apps;
(function (apps) {
    var intId = /[-]?\d+/ig;
    function makeSafeSymbol(name) {
        if (!name) {
            return null;
        }
        return name
            .toString()
            .replace(".", "_")
            .replace("-", "_")
            .replace("+", "_")
            .replace("*", "_")
            .replace("~", "_");
    }
    /**
     * fix of the invalid model property which it may crashed the editor system.
    */
    function ModelPatch(model) {
        for (var _i = 0, _a = model.nodeDataArray; _i < _a.length; _i++) {
            var node = _a[_i];
            if (node.isGroup) {
                continue;
            }
            if (Strings.IsPattern(node.key.toString(), intId)) {
                node.key = "T" + node.key;
            }
            if (isNullOrUndefined(node.group)) {
                delete node.group;
            }
            node.key = makeSafeSymbol(node.key);
        }
        for (var _b = 0, _c = model.linkDataArray; _b < _c.length; _b++) {
            var link = _c[_b];
            if (Strings.IsPattern(link.from.toString(), intId)) {
                link.from = "T" + link.from;
            }
            if (Strings.IsPattern(link.to.toString(), intId)) {
                link.to = "T" + link.to;
            }
            link.from = makeSafeSymbol(link.from);
            link.to = makeSafeSymbol(link.to);
            if (!isNullOrEmpty(link.labelKeys)) {
                for (var i = 0; i < link.labelKeys.length; i++) {
                    if (Strings.IsPattern(link.labelKeys[i].toString(), intId)) {
                        link.labelKeys[i] = "T" + link.labelKeys[i];
                    }
                    link.labelKeys[i] = makeSafeSymbol(link.labelKeys[i]);
                }
            }
        }
        return model;
    }
    apps.ModelPatch = ModelPatch;
})(apps || (apps = {}));
var apps;
(function (apps) {
    var EditorTemplates;
    (function (EditorTemplates) {
        // helper functions for the templates
        function nodeStyle() {
            return [
                {
                    type: go.Panel.Spot,
                    layerName: "Background",
                    locationObjectName: "SHAPE",
                    selectionObjectName: "SHAPE",
                    locationSpot: go.Spot.Center
                },
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify)
            ];
        }
        EditorTemplates.nodeStyle = nodeStyle;
        function shapeStyle() {
            return {
                name: "SHAPE",
                stroke: "black",
                fill: "#f0f0f0",
                portId: "",
                fromLinkable: true,
                toLinkable: true
            };
        }
        EditorTemplates.shapeStyle = shapeStyle;
        function textStyle(fontsize) {
            if (fontsize === void 0) { fontsize = 11; }
            return [
                {
                    font: "bold " + fontsize + "pt helvetica, bold arial, sans-serif",
                    margin: 2,
                    editable: true
                },
                new go.Binding("text", "label").makeTwoWay()
            ];
        }
        EditorTemplates.textStyle = textStyle;
    })(EditorTemplates = apps.EditorTemplates || (apps.EditorTemplates = {}));
})(apps || (apps = {}));
var Editor;
(function (Editor) {
    var layouts;
    (function (layouts) {
        var circle = /** @class */ (function () {
            function circle(editor) {
                this.editor = editor;
            }
            circle.prototype.generateCircle = function () {
                var myDiagram = this.editor.goCanvas;
                var vm = this;
                myDiagram.startTransaction("generateCircle");
                myDiagram.startTransaction("change Layout");
                // force a diagram layout
                vm.layout();
                myDiagram.commitTransaction("change Layout");
                myDiagram.commitTransaction("generateCircle");
            };
            /**
             * Update the layout from the controls, and then perform the layout again
            */
            circle.prototype.layout = function () {
                var myDiagram = this.editor.goCanvas;
                var lay = myDiagram.layout;
                lay.radius = circle.radiusValue("NaN");
                lay.aspectRatio = 1;
                lay.startAngle = 0;
                lay.sweepAngle = 360;
                lay.spacing = 6;
                lay.arrangement = circle.mapArrangement(this.getArrangementValue());
                lay.nodeDiameterFormula = circle.mapDiamFormula(this.getRadioValue());
                lay.direction = circle.mapDirection(this.getDirectionValue());
                lay.sorting = circle.mapSorting(this.getSortValue());
                console.log(lay);
            };
            circle.radiusValue = function (radius) {
                if (radius !== "NaN") {
                    return parseFloat(radius, 10);
                }
                else {
                    return NaN;
                }
                ;
            };
            circle.mapSorting = function (sorting) {
                switch (sorting) {
                    case "Forwards": return go.CircularLayout.Forwards;
                    case "Reverse": return go.CircularLayout.Reverse;
                    case "Ascending": return go.CircularLayout.Ascending;
                    case "Descending": return go.CircularLayout.Descending;
                    case "Optimized": return go.CircularLayout.Optimized;
                    default:
                        throw "invalid option: " + sorting + "!";
                }
            };
            circle.mapDirection = function (direction) {
                switch (direction) {
                    case "Clockwise": return go.CircularLayout.Clockwise;
                    case "Counterclockwise": return go.CircularLayout.Counterclockwise;
                    case "BidirectionalLeft": return go.CircularLayout.BidirectionalLeft;
                    case "BidirectionalRight": return go.CircularLayout.BidirectionalRight;
                    default:
                        throw "invalid option: " + direction + "!";
                }
            };
            circle.mapDiamFormula = function (diamFormula) {
                if (diamFormula === "Pythagorean") {
                    return go.CircularLayout.Pythagorean;
                }
                else if (diamFormula === "Circular") {
                    return go.CircularLayout.Circular;
                }
                else {
                    throw "invalid option value: " + diamFormula + "!";
                }
            };
            circle.mapArrangement = function (arrangement) {
                switch (arrangement) {
                    case "ConstantDistance": return go.CircularLayout.ConstantDistance;
                    case "ConstantAngle": return go.CircularLayout.ConstantAngle;
                    case "ConstantSpacing": return go.CircularLayout.ConstantSpacing;
                    case "Packed": return go.CircularLayout.Packed;
                    default:
                        throw "invalid option: " + arrangement + "!";
                }
            };
            circle.prototype.getSortValue = function () {
                return "Forwards";
            };
            circle.prototype.getDirectionValue = function () {
                return "Clockwise";
            };
            circle.prototype.getArrangementValue = function () {
                return "ConstantSpacing";
            };
            circle.prototype.getRadioValue = function () {
                return "Circular";
            };
            return circle;
        }());
        layouts.circle = circle;
    })(layouts = Editor.layouts || (Editor.layouts = {}));
})(Editor || (Editor = {}));
var apps;
(function (apps) {
    apps.assemblyKey = "ko00001-assembly";
    var PathwayExplorer = /** @class */ (function (_super) {
        __extends(PathwayExplorer, _super);
        function PathwayExplorer() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.Metabolic_pathway = null;
            return _this;
        }
        Object.defineProperty(PathwayExplorer.prototype, "appName", {
            get: function () {
                return "Pathway_explorer";
            },
            enumerable: true,
            configurable: true
        });
        ;
        PathwayExplorer.prototype.init = function () {
            var _this = this;
            PathwayExplorer.initKEGG(function () { return _this.loadCache(); });
        };
        PathwayExplorer.initKEGG = function (loadCache) {
            var dataUrl = $ts("@data:repository");
            var assembly = localStorage.getItem(apps.assemblyKey);
            if (!Strings.Empty(dataUrl, true)) {
                if (Strings.Empty(assembly)) {
                    // get from server and cached into localstorage
                    $ts.get(dataUrl, function (obj) {
                        PathwayExplorer.saveCache(obj);
                        loadCache();
                    });
                }
                else {
                    loadCache();
                }
            }
        };
        PathwayExplorer.prototype.loadUITree = function (obj) {
            var tree = PathwayNavigator.parseJsTree(obj);
            var target = $ts("@app:explorer");
            var $vm = this;
            $("#" + target).jstree({
                'core': {
                    data: tree.children
                },
                'plugins': ["contextmenu"],
                'contextmenu': {
                    'items': {
                        "add_reactor": {
                            label: "Create Reactor",
                            action: PathwayExplorer.createReactor
                        }
                    }
                }
            });
            $("#" + target).on("click", ".jstree-anchor", function (e) {
                var id = $("#" + target).jstree(true).get_node($(this)).id;
                var mapId = "map" + id.split("_")[0];
                $vm.Metabolic_pathway = mapId;
                $ts("#do-createReactor").onclick = function () { PathwayExplorer.createReactor(mapId); };
                $ts("#canvas")
                    .clear()
                    .display($ts("<iframe>", {
                    src: "@url:readmap/" + mapId,
                    width: "1600px",
                    height: "1200px",
                    "max-width": "1920px",
                    frameborder: "no",
                    border: "0",
                    marginwidth: "0",
                    marginheight: "0",
                    scrolling: "no",
                    allowtransparency: "yes"
                }));
            });
        };
        PathwayExplorer.createReactor = function (data) {
            var id = typeof (data) == "string" ? data : data.reference[0].id;
            var mapId = "map" + id.split("_")[0];
            $ts.post("@url:createmap", { mapid: mapId }, function (data) {
                var url = PathwayExplorer.getUrl(data);
                if (data.code == 0 && !Strings.Empty(url, true)) {
                    $goto(url);
                }
                else {
                    // show error message
                }
            });
        };
        PathwayExplorer.getUrl = function (data) {
            if (isNullOrUndefined(data))
                return null;
            if (typeof (data.info) != "string")
                return null;
            return data.info;
        };
        PathwayExplorer.saveCache = function (obj) {
            var cacheKeys = [];
            for (var _i = 0, _a = obj.children; _i < _a.length; _i++) {
                var data_1 = _a[_i];
                var cacheKey = data_1.name
                    .toLowerCase()
                    .replace(/\s+/ig, "_");
                cacheKeys.push(cacheKey);
                localStorage.setItem(cacheKey, JSON.stringify(data_1));
            }
            localStorage.setItem(apps.assemblyKey, JSON.stringify(cacheKeys));
        };
        PathwayExplorer.prototype.loadCache = function () {
            this.loadUITree(PathwayExplorer.loadKEGGTree());
        };
        PathwayExplorer.loadKEGGTree = function () {
            var assembly = localStorage.getItem(apps.assemblyKey);
            var keys = JSON.parse(assembly);
            var keggTree = {
                name: "ko00001",
                children: []
            };
            var cache = null;
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var keyId = keys_1[_i];
                TypeScript.logging.log("load cache: " + keyId + "...");
                cache = localStorage.getItem(keyId);
                keggTree.children.push(JSON.parse(cache));
            }
            return keggTree;
        };
        return PathwayExplorer;
    }(Bootstrap));
    apps.PathwayExplorer = PathwayExplorer;
})(apps || (apps = {}));
var PathwayNavigator;
(function (PathwayNavigator) {
    var unique = 1;
    var folderIcon = "data:image/png;base64,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";
    var objectIcon = "data:image/png;base64,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";
    function parseJsTree(kegg_tree, showKONode) {
        if (showKONode === void 0) { showKONode = false; }
        var name = KEGG.brite.parseIDEntry(kegg_tree.name);
        var commonName = name.commonName || "KEGG";
        // makes bugs fixed for the duplicated KO id
        if (isNullOrEmpty(kegg_tree.children)) {
            if (showKONode) {
                return {
                    id: name.id + "_" + ++unique,
                    text: kegg_tree.name,
                    children: null,
                    icon: objectIcon
                };
            }
            else {
                return null;
            }
        }
        else {
            var childs = $from(kegg_tree.children)
                .Select(function (c) { return parseJsTree(c, showKONode); })
                .Where(function (d) { return !isNullOrUndefined(d); })
                .ToArray();
            return {
                id: name.id + "_" + ++unique,
                text: commonName,
                children: childs,
                icon: childs.length == 0 ? objectIcon : folderIcon
            };
        }
    }
    PathwayNavigator.parseJsTree = parseJsTree;
})(PathwayNavigator || (PathwayNavigator = {}));
/// <reference path="../../../build/biocad.d.ts" />
var apps;
(function (apps) {
    apps.listDiv = "#sample_suggests";
    apps.inputDiv = "#sample_search";
    var KEGGNetwork = /** @class */ (function (_super) {
        __extends(KEGGNetwork, _super);
        function KEGGNetwork() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(KEGGNetwork.prototype, "appName", {
            get: function () {
                return "kegg_network";
            },
            enumerable: true,
            configurable: true
        });
        KEGGNetwork.prototype.init = function () {
            var _this = this;
            apps.PathwayExplorer.initKEGG(function () { return _this.loadCache(); });
        };
        KEGGNetwork.prototype.loadCache = function () {
            var _this = this;
            var tree = PathwayNavigator.parseJsTree(apps.PathwayExplorer.loadKEGGTree());
            var components = [];
            KEGGNetwork.createSet(tree, components);
            var terms = [];
            var unique = $from(components)
                .GroupBy(function (t) { return t.text.split(/\s+/ig)[0]; })
                .Select(function (t) { return t.First; })
                .ToArray();
            for (var _i = 0, unique_1 = unique; _i < unique_1.length; _i++) {
                var koId = unique_1[_i];
                terms.push(new Application.Suggestion.term(koId.id, koId.text));
            }
            var suggest = Application.Suggestion.render.makeSuggestions(terms, apps.listDiv, function (term) { return _this.clickOnTerm(term); }, 13, true, "");
            $ts(apps.inputDiv).onkeyup = function () {
                var search = $ts.value(apps.inputDiv);
                if (Strings.Empty(search, true)) {
                    $ts(apps.listDiv).hide();
                }
                else {
                    $ts(apps.listDiv).show();
                    suggest(search);
                }
            };
            TypeScript.logging.log(components.length + " kegg components has been loaded!", TypeScript.ConsoleColors.Magenta);
            TypeScript.logging.log(" ~done!", TypeScript.ConsoleColors.Magenta);
        };
        KEGGNetwork.prototype.clickOnTerm = function (term) {
            // const valueSel = "#pathway_list";
            // $ts.value(valueSel, term.id.toString());
            $ts(apps.listDiv).hide();
            console.log(term);
            // this.updateChart(term.id);
        };
        KEGGNetwork.createSet = function (tree, components) {
            for (var _i = 0, _a = tree.children; _i < _a.length; _i++) {
                var node = _a[_i];
                if (isNullOrUndefined(node.children)) {
                    components.push(node);
                }
                else {
                    this.createSet(node, components);
                }
            }
        };
        return KEGGNetwork;
    }(Bootstrap));
    apps.KEGGNetwork = KEGGNetwork;
})(apps || (apps = {}));
var Graph = /** @class */ (function () {
    function Graph(graph) {
        if (graph === void 0) { graph = null; }
        this.last_index = 0;
        if (!isNullOrUndefined(graph)) {
            this.nodes = graph.nodes;
            this.links = graph.links;
        }
    }
    /**
     * resolve node IDs (not optimized at all!)
    */
    Graph.prototype.objectify = function () {
        var vm = this;
        var _ref = vm.links;
        var _results = [];
        var _loop_1 = function (_i, _len) {
            var l = _ref[_i];
            _results.push((function () {
                var _j, _len2, _ref2, _results2;
                _ref2 = vm.nodes;
                _results2 = [];
                for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
                    var n = _ref2[_j];
                    if (l.source === n.id) {
                        l.source = n;
                        continue;
                    }
                    if (l.target === n.id) {
                        l.target = n;
                        continue;
                    }
                    else {
                        _results2.push(void 0);
                    }
                }
                return _results2;
            })());
        };
        for (var _i = 0, _len = _ref.length; _i < _len; _i++) {
            _loop_1(_i, _len);
        }
        return _results;
    };
    /**
     * remove the given node or link from the graph, also deleting dangling links if a node is removed
    */
    Graph.prototype.remove = function (condemned) {
        if (__indexOf.call(this.nodes, condemned) >= 0) {
            this.nodes = this.nodes.filter(function (n) { return n !== condemned; });
            return this.links = this.links.filter(function (l) { return l.source.id !== condemned.id && l.target.id !== condemned.id; });
        }
        else if (__indexOf.call(this.links, condemned) >= 0) {
            return this.links = this.links.filter(function (l) { return l !== condemned; });
        }
    };
    Graph.prototype.add_node = function (type) {
        var n = {
            dunnartid: (this.last_index++).toString(),
            x: 0,
            y: 0,
            type: type
        };
        this.nodes.push(n);
        return n;
    };
    Graph.prototype.add_link = function (source, target) {
        /* avoid links to self
        */
        if (source === target)
            return null;
        /* avoid link duplicates
        */
        var _ref = this.links;
        for (var _i = 0, _len = _ref.length; _i < _len; _i++) {
            var link = _ref[_i];
            if (link.source === source && link.target === target)
                return null;
        }
        var l = {
            source: source,
            target: target
        };
        this.links.push(l);
        return l;
    };
    return Graph;
}());
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