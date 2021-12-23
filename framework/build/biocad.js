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
var bioCAD;
(function (bioCAD) {
    var WebApp;
    (function (WebApp) {
        /**
         * script module for user login
        */
        var LoginScript = /** @class */ (function (_super) {
            __extends(LoginScript, _super);
            function LoginScript() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(LoginScript.prototype, "appName", {
                get: function () {
                    return "login";
                },
                enumerable: true,
                configurable: true
            });
            LoginScript.prototype.init = function () {
            };
            LoginScript.prototype.login_click = function () {
                LoginScript.do_login();
            };
            LoginScript.do_login = function () {
                var account = $ts.value("#username");
                var password = $ts.value("#password");
                var api = $ts("@api:login");
                $ts.post(api, {
                    account: account, password: md5(password)
                }, function (result) {
                    if (result.code == 0) {
                        var query = $ts.location("goto", false, "/");
                        var back = decodeURIComponent(query);
                        if (Strings.Empty(back, true)) {
                            parent.gotoURL("/");
                        }
                        else {
                            parent.gotoURL(back);
                        }
                    }
                    else {
                        parent.msgbox(result.info, 1);
                    }
                });
            };
            return LoginScript;
        }(Bootstrap));
        WebApp.LoginScript = LoginScript;
    })(WebApp = bioCAD.WebApp || (bioCAD.WebApp = {}));
})(bioCAD || (bioCAD = {}));
var bioCAD;
(function (bioCAD) {
    var WebApp;
    (function (WebApp) {
        var RecoverScript = /** @class */ (function (_super) {
            __extends(RecoverScript, _super);
            function RecoverScript() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(RecoverScript.prototype, "appName", {
                get: function () {
                    return "recover";
                },
                enumerable: true,
                configurable: true
            });
            RecoverScript.prototype.init = function () { };
            RecoverScript.doRecover_onclick = function () {
                throw "not implemented!";
            };
            return RecoverScript;
        }(Bootstrap));
        WebApp.RecoverScript = RecoverScript;
    })(WebApp = bioCAD.WebApp || (bioCAD.WebApp = {}));
})(bioCAD || (bioCAD = {}));
var bioCAD;
(function (bioCAD) {
    var WebApp;
    (function (WebApp) {
        var RegisterScript = /** @class */ (function (_super) {
            __extends(RegisterScript, _super);
            function RegisterScript() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(RegisterScript.prototype, "appName", {
                get: function () {
                    return "register";
                },
                enumerable: true,
                configurable: true
            });
            RegisterScript.prototype.init = function () { };
            RegisterScript.prototype.doRegister_onclick = function () {
                var username = $ts("#username").CType().value;
                var email = $ts("#email").CType().value;
                var password = $ts("#password").CType().value;
                var checkTermsOfuse = $ts("#check_terms_of_use").CType().checked;
                var api = $ts("@api:register");
                if (!checkTermsOfuse) {
                    parent.msgbox("You should agree our bioCAD Terms of use at first!", 1);
                }
                else if (!username || !email || !password) {
                    parent.msgbox("One of the required field is empty!", 1);
                }
                else {
                    $ts.post(api, {
                        username: username,
                        password: md5(password),
                        email: email
                    }, function (result) {
                        if (result.code == 0) {
                            parent.gotoLogin();
                        }
                        else {
                            parent.msgbox(result.info, 1);
                        }
                    });
                }
            };
            return RegisterScript;
        }(Bootstrap));
        WebApp.RegisterScript = RegisterScript;
    })(WebApp = bioCAD.WebApp || (bioCAD.WebApp = {}));
})(bioCAD || (bioCAD = {}));
/// <reference path="../../build/linq.d.ts" />
/// <reference path="WebApp/Passport/LogInScript.ts" />
/// <reference path="WebApp/Passport/RecoverScript.ts" />
/// <reference path="WebApp/Passport/RegisterScript.ts" />
var dev = console;
var logo = ["%c\n\n  .Ci     .bi           oDDDi    iDi   .CDDDDl             .Ci                     .C.\n  .Ci     .bi         .bo  .c.   oCo   .Cl  .Cb.           .Ci                     .C.\n  .Ci                .Co        .CiA.  .Cl    oo           .Ci                     .C.\n  .CiCDDl .bi .CDDb. .A.        lo.Cl  .Cl    .A.     oDDl .Ci .CDDb. .bi  ib. .CDDcC.\n  .Cb. .bi.bi.Co  ib.iC.       .Ci iC. .Cl    .C.   .CC. i..Ci.Co  ib..bi  ib..Co  ob.\n  .Cl   oo.biib.   oliC.       .C. .bi .Cl    .C.   .C.    .Ciib.   ol.bi  ib..C.  .C.\n  .Ci   lo.biiC.   oo.C.       lDDDDDo .Cl    .C.   iC.    .CiiC.   oo.bi  ib.iC.  .C.\n  .Ci   ol.biib.   ol.Cl      .bi   ib..Cl    oo    ib.    .Ciib.   ol.bi  ib.ib.  .A.\n  .Cb. ib..bi.Co  ib. iDl  .c.ib.   .bl.Cl  .CC. .bi.Co  i..Ci.Co  ib..Co .Cb..bl .Cb.\n  .CibDDi .bi .CDDb.   .bDDb. oo     oC.CDDDDl   .bi .CDDl .Ci .CDDb.  .bDblb. .bDDiC.\n\n                                                                   http://bioCAD.cloud \n                                               xieguigang <xie.guigang@gcmodeller.org>\n\n"].concat(["color:#084B8A"]);
console.log.apply(dev, logo);
var bioCAD;
(function (bioCAD) {
    var WebApp;
    (function (WebApp) {
        function start() {
            Router.AddAppHandler(new WebApp.LoginScript());
            Router.AddAppHandler(new WebApp.RegisterScript());
            Router.AddAppHandler(new WebApp.RecoverScript());
            Router.AddAppHandler(new WebApp.Platform.TaskMgr());
            Router.AddAppHandler(new WebApp.Platform.Report());
            Router.RunApp();
        }
        WebApp.start = start;
    })(WebApp = bioCAD.WebApp || (bioCAD.WebApp = {}));
})(bioCAD || (bioCAD = {}));
$ts.mode = Modes.debug;
$ts(bioCAD.WebApp.start);
///<reference path="../../../../build/Metabolic_pathway.d.ts" />
var bioCAD;
(function (bioCAD) {
    var WebApp;
    (function (WebApp) {
        var Platform;
        (function (Platform) {
            Platform.listDiv = "#sample_suggests";
            Platform.inputDiv = "#sample_search";
            var Report = /** @class */ (function (_super) {
                __extends(Report, _super);
                function Report() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.pathways = new Dictionary();
                    _this.data = {
                        y: new IEnumerator([])
                    };
                    return _this;
                }
                Object.defineProperty(Report.prototype, "appName", {
                    get: function () {
                        return "reportViewer";
                    },
                    enumerable: true,
                    configurable: true
                });
                Report.prototype.updateChart = function (pathway) {
                    var vm = this;
                    var getLines = function () {
                        if (pathway == "*") {
                            // show all pathway data
                            return vm.data.y;
                        }
                        else if (!vm.pathways.ContainsKey(pathway)) {
                            return vm.data.y
                                .Where(function (line) { return pathway == line.name; });
                        }
                        else {
                            var index = vm.pathways.Item(pathway);
                            var search_1 = $from(index.keys);
                            return vm.data.y
                                .Where(function (line) { return search_1.Any(function (name) { return name == line.name; }); });
                        }
                    };
                    this.makeChartInternal(getLines());
                };
                Report.parseData = function (data) {
                    var symbols = data.headers;
                    var y = symbols
                        .Where(function (name) { return name != ""; })
                        .Select(function (name) {
                        var vec = data
                            .Column(name)
                            .Skip(1)
                            .Select(function (yi, i) { return [i, parseFloat(yi)]; });
                        return {
                            name: name,
                            type: 'line',
                            smooth: true,
                            showSymbol: false,
                            clip: true,
                            data: vec.ToArray(),
                            emphasis: {
                                focus: 'series'
                            },
                            ymax: vec.Select(function (a) { return a[1]; }).Max()
                        };
                    });
                    return y;
                };
                Report.prototype.makeChart = function (text, myChart) {
                    var data = $ts.csv(text, false);
                    var y = Report.parseData(data);
                    var vm = this;
                    vm.csvText = text;
                    vm.myChart = myChart;
                    vm.data.y = y;
                    vm.makeChartInternal(y);
                    myChart.on('legendselectchanged', function (params) {
                        console.log(params);
                    });
                };
                Report.prototype.makeChartInternal = function (y) {
                    var ymax = TypeScript.Data.quantile(y.Select(function (a) { return a.ymax; }).ToArray(), 0.65);
                    var myChart = this.myChart;
                    var option = {
                        animation: false,
                        tooltip: {
                            trigger: 'none',
                            axisPointer: {
                                type: 'cross'
                            }
                        },
                        legend: {},
                        grid: {
                            top: 40,
                            left: 50,
                            right: 40,
                            bottom: 50
                        },
                        xAxis: {
                            name: 'Time(ticks)',
                            minorTick: {
                                show: true
                            },
                            minorSplitLine: {
                                show: true
                            },
                            nameLocation: 'middle'
                        },
                        yAxis: {
                            name: 'Activity',
                            min: 0,
                            max: Math.round(ymax * 1.25),
                            minorTick: {
                                show: true
                            },
                            minorSplitLine: {
                                show: true
                            }
                        },
                        series: y.ToArray()
                    };
                    console.log("lines:");
                    console.log(y);
                    option && myChart.setOption(option, true, false);
                };
                Report.prototype.init = function () {
                    var _this = this;
                    var chartDom = document.getElementById('main');
                    var myChart = echarts.init(chartDom);
                    $ts.getText("@data:PLAS", function (text) { return _this.makeChart(text, myChart); });
                    $ts.getText("@url:graph", function (text) { return _this.initPathwaySelector(JSON.parse(text)); });
                };
                Report.prototype.getPLAS_onclick = function () {
                    var payload = {
                        mime_type: "text/html",
                        data: Base64.encode(this.csvText)
                    };
                    DOM.download("PLAS_output.csv", payload, false);
                };
                Report.prototype.initPathwaySelector = function (graph) {
                    var _this = this;
                    var selector = $ts("#pathway_list");
                    var pathwayGroup = $ts("<optgroup>", { label: "Pathways" });
                    var metabolites = $ts("<optgroup>", { label: "Metabolites" });
                    var pathways = this.pathways;
                    var vm = this;
                    var terms = [];
                    pathwayGroup.appendChild($ts("<option>", { value: "*" }).display("*"));
                    for (var _i = 0, _a = graph.nodeDataArray; _i < _a.length; _i++) {
                        var node = _a[_i];
                        if (node.isGroup) {
                            var map = { pathway: node.label, keys: [] };
                            var opt = $ts("<option>", { value: node.key });
                            var term = new uikit.suggestion_list.term(node.key, node.text);
                            opt.innerText = (node.text);
                            terms.push(term);
                            pathways.Add(node.key.toString(), map);
                            pathwayGroup.appendChild(opt);
                        }
                    }
                    for (var _b = 0, _c = graph.nodeDataArray; _b < _c.length; _b++) {
                        var node = _c[_b];
                        if (isNullOrUndefined(node.isGroup) || !node.isGroup) {
                            if (!Strings.Empty(node.group, true)) {
                                var refKey = node.group.toString();
                                var index = pathways.Item(refKey);
                                var opt = $ts("<option>", { value: node.label });
                                var term = new uikit.suggestion_list.term(node.label, node.label);
                                opt.innerText = node.label;
                                index.keys.push(node.label);
                                if ((node.category != "valve") && !Strings.Empty(node.label, true)) {
                                    terms.push(term);
                                    metabolites.appendChild(opt);
                                }
                            }
                        }
                    }
                    selector.add(pathwayGroup);
                    selector.add(metabolites);
                    selector.onchange = function () {
                        var opt = $ts.select.getOption("#pathway_list");
                        if ((!isNullOrUndefined(opt)) && !Strings.Empty(opt)) {
                            vm.updateChart(opt.toString());
                        }
                    };
                    var suggest = uikit.suggestion_list.render.makeSuggestions(terms, Platform.listDiv, function (term) { return _this.clickOnTerm(term); }, 5, true, "");
                    $ts(Platform.inputDiv).onkeyup = function () {
                        var search = $ts.value(Platform.inputDiv);
                        if (Strings.Empty(search, true)) {
                            $ts(Platform.listDiv).hide();
                        }
                        else {
                            $ts(Platform.listDiv).show();
                            suggest(search);
                        }
                    };
                };
                Report.prototype.clickOnTerm = function (term) {
                    var valueSel = "#pathway_list";
                    $ts.value(valueSel, term.id.toString());
                    $ts(Platform.listDiv).hide();
                    this.updateChart(term.id);
                };
                return Report;
            }(Bootstrap));
            Platform.Report = Report;
        })(Platform = WebApp.Platform || (WebApp.Platform = {}));
    })(WebApp = bioCAD.WebApp || (bioCAD.WebApp = {}));
})(bioCAD || (bioCAD = {}));
var bioCAD;
(function (bioCAD) {
    var WebApp;
    (function (WebApp) {
        var Platform;
        (function (Platform) {
            var TaskMgr = /** @class */ (function (_super) {
                __extends(TaskMgr, _super);
                function TaskMgr() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(TaskMgr.prototype, "appName", {
                    get: function () {
                        return "app_task";
                    },
                    enumerable: true,
                    configurable: true
                });
                TaskMgr.prototype.init = function () {
                    var vm = this;
                    $ts.get("@data:task_list", function (resp) {
                        if (resp.code != 0) {
                            parent.msgbox(resp.info, 1);
                        }
                        else {
                            vm.loadTable(resp.info);
                        }
                    });
                    vm.totalTasks = parseInt($ts("@data:count_task"));
                    TypeScript.logging.log("You have " + vm.totalTasks + " tasks in total!", TypeScript.ConsoleColors.Magenta);
                };
                TaskMgr.prototype.loadTable = function (tasks) {
                    var table = $ts("#tasklist").clear();
                    for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
                        var task = tasks_1[_i];
                        table.appendElement(this.taskRow(task));
                    }
                };
                TaskMgr.prototype.getModelId = function (task) {
                    var argvs = Bencode.decode(task["parameters"]);
                    console.log("get task model id for:");
                    console.log(task);
                    console.log(argvs);
                    for (var _i = 0, _a = ["model", "file"]; _i < _a.length; _i++) {
                        var name_1 = _a[_i];
                        if (name_1 in argvs) {
                            return argvs[name_1];
                        }
                    }
                    return "";
                };
                TaskMgr.prototype.taskRow = function (task) {
                    var model_url = task.app_view + "?guid=" + this.getModelId(task);
                    var appTask = $ts("<th>").appendElement($ts("<div>", { class: ["media", "align-items-center"] })
                        .appendElement("\n                        <a href=\"#\" class=\"avatar rounded-circle mr-3\">\n                            <img alt=\"Image placeholder\"\n                                src=\"/resources/images/icons/" + task.name + ".png\">\n                        </a>")
                        .appendElement("\n                        <div class=\"media-body\">\n                            <a href=\"/task/report/?q=" + task.sha1 + "\" target=\"__blank\">\n                                <h4 class=\"mb-0\">" + task.title + "</h4>\n                            </a>                            \n                        </div>"));
                    var createTime = $ts("<td>").appendElement(task.create_time);
                    var status = $ts("<td>").appendElement(taskStatus[statusCodeMap(task.status)]);
                    var end_time = $ts("<td>").appendElement(task.finish_time || "n/a");
                    var progress = $ts("<td>").appendElement(taskProgress[statusCodeMap(task.status)]);
                    var menu = $ts("<td>", { class: "text-right" }).appendElement(menuTemplate.replace("{$model_url}", model_url));
                    return $ts("<tr>")
                        .appendElement(appTask)
                        .appendElement(createTime)
                        .appendElement(status)
                        .appendElement(end_time)
                        .appendElement(progress)
                        .appendElement(menu);
                };
                return TaskMgr;
            }(Bootstrap));
            Platform.TaskMgr = TaskMgr;
            var menuTemplate = "\n        <div class=\"dropdown\">\n            <a class=\"btn btn-sm btn-icon-only text-light\" href=\"#\" role=\"button\"\n                data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"\n                style=\"box-shadow: none;\">\n\n                <i class=\"fas fa-ellipsis-v\"></i>\n            </a>\n            <div class=\"dropdown-menu dropdown-menu-right dropdown-menu-arrow\">\n                <a class=\"dropdown-item bg-danger\" href=\"#\">Delete</a>\n                <a class=\"dropdown-item\" href=\"{$model_url}\">View Model</a>\n                <a class=\"dropdown-item\" href=\"#\">Help</a>\n            </div>\n        </div>\n    ";
            var taskProgress = {
                "pending": "<div class=\"d-flex align-items-center\">\n                                            <span class=\"mr-2\">0%</span>\n                                            <div>\n                                                <div class=\"progress\">\n                                                    <div class=\"progress-bar bg-warning\" role=\"progressbar\"\n                                                        aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\"\n                                                        style=\"width: 1%;\"></div>\n                                                </div>\n                                            </div>\n                                        </div>",
                "completed": "<div class=\"d-flex align-items-center\">\n                                            <span class=\"mr-2\">100%</span>\n                                            <div>\n                                                <div class=\"progress\">\n                                                    <div class=\"progress-bar bg-success\" role=\"progressbar\"\n                                                        aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\"\n                                                        style=\"width: 100%;\"></div>\n                                                </div>\n                                            </div>\n                                        </div>",
                "delayed": "<div class=\"d-flex align-items-center\">\n                                            <span class=\"mr-2\">{$pct}%</span>\n                                            <div>\n                                                <div class=\"progress\">\n                                                    <div class=\"progress-bar bg-danger\" role=\"progressbar\"\n                                                        aria-valuenow=\"{$pct}\" aria-valuemin=\"0\" aria-valuemax=\"100\"\n                                                        style=\"width: {$pct}%;\"></div>\n                                                </div>\n                                            </div>\n                                        </div>",
                "on_schedule": "<div class=\"d-flex align-items-center\">\n                                            <span class=\"mr-2\">{$pct}%</span>\n                                            <div>\n                                                <div class=\"progress\">\n                                                    <div class=\"progress-bar bg-info\" role=\"progressbar\"\n                                                        aria-valuenow=\"{$pct}\" aria-valuemin=\"0\" aria-valuemax=\"100\"\n                                                        style=\"width: {$pct}%;\"></div>\n                                                </div>\n                                            </div>\n                                        </div>"
            };
            function statusCodeMap(code) {
                switch (code.toString()) {
                    case "0": return "pending";
                    case "200": return "completed";
                    case "500": return "delayed";
                    case "1": return "on_schedule";
                }
            }
            var taskStatus = {
                pending: "<span class=\"badge badge-dot mr-4\" style=\"color: #fb6340 !important;\">\n                      <i class=\"bg-warning\"></i> pending\n                  </span>",
                completed: "<span class=\"badge badge-dot\" style=\"color: #2dce89 !important;\">\n                        <i class=\"bg-success\"></i> completed\n                    </span>",
                delayed: "<span class=\"badge badge-dot mr-4\" style=\"color:  #ec0c38 !important;\">\n                      <i class=\"bg-danger\"></i> error\n                  </span>",
                on_schedule: "<span class=\"badge badge-dot\" style=\"color: #11cdef !important;\">\n                          <i class=\"bg-info\"></i> running\n                      </span>"
            };
        })(Platform = WebApp.Platform || (WebApp.Platform = {}));
    })(WebApp = bioCAD.WebApp || (bioCAD.WebApp = {}));
})(bioCAD || (bioCAD = {}));
var uikit;
(function (uikit) {
    var suggestion_list;
    (function (suggestion_list) {
        var render;
        (function (render) {
            /**
             * 将结果显示到网页上面
             *
             * @param div 带有#符号前缀的id查询表达式
            */
            function makeSuggestions(terms, div, click, top, caseInsensitive, divClass, addNew) {
                if (top === void 0) { top = 10; }
                if (caseInsensitive === void 0) { caseInsensitive = false; }
                if (divClass === void 0) { divClass = null; }
                if (addNew === void 0) { addNew = null; }
                var suggestions = new suggestion_list.suggestion(terms);
                return function (input) {
                    showSuggestions(suggestions, input, div, click, top, caseInsensitive, addNew, divClass);
                };
            }
            render.makeSuggestions = makeSuggestions;
            function showSuggestions(suggestion, input, div, click, top, caseInsensitive, addNew, divClass) {
                if (top === void 0) { top = 10; }
                if (caseInsensitive === void 0) { caseInsensitive = false; }
                if (addNew === void 0) { addNew = null; }
                if (divClass === void 0) { divClass = null; }
                var node = $ts(div);
                if (!node) {
                    return;
                }
                else {
                    node.clear();
                }
                suggestion.populateSuggestion(input, top, caseInsensitive)
                    .forEach(function (term) {
                    node.appendChild(listItem(term, divClass, click));
                });
                if ((!isNullOrUndefined(addNew)) && (!suggestion.hasEquals(input, caseInsensitive))) {
                    var addNewButton = $ts("<a>", {
                        href: executeJavaScript,
                        text: input,
                        title: input,
                        onclick: function () {
                            addNew(input);
                        }
                    }).display("add '" + input + "'");
                    node.append($ts("<div>", {
                        class: divClass
                    }).display(addNewButton));
                }
            }
            function listItem(term, divClass, click) {
                var a = $ts("<a>", {
                    href: executeJavaScript,
                    text: term.term,
                    title: term.term,
                    onclick: function () {
                        click(term);
                    }
                }).display(term.term);
                return $ts("<div>", { class: divClass }).display(a);
            }
        })(render = suggestion_list.render || (suggestion_list.render = {}));
    })(suggestion_list = uikit.suggestion_list || (uikit.suggestion_list = {}));
})(uikit || (uikit = {}));
var uikit;
(function (uikit) {
    var suggestion_list;
    (function (suggestion_list) {
        var suggestion = /** @class */ (function () {
            function suggestion(terms) {
                this.terms = terms;
            }
            suggestion.prototype.hasEquals = function (input, caseInsensitive) {
                if (caseInsensitive === void 0) { caseInsensitive = false; }
                if (!caseInsensitive) {
                    input = input.toLowerCase();
                }
                for (var _i = 0, _a = this.terms; _i < _a.length; _i++) {
                    var term_1 = _a[_i];
                    if (caseInsensitive) {
                        if (term_1.term.toLowerCase() == input) {
                            return true;
                        }
                    }
                    else {
                        if (term_1.term == input) {
                            return true;
                        }
                    }
                }
                return false;
            };
            /**
             * 返回最相似的前5个结果
            */
            suggestion.prototype.populateSuggestion = function (input, top, caseInsensitive) {
                if (top === void 0) { top = 5; }
                if (caseInsensitive === void 0) { caseInsensitive = false; }
                var lowerInput = input.toLowerCase();
                var scores = $from(this.terms)
                    .Select(function (q) {
                    var score = suggestion.getScore(q, input, lowerInput, caseInsensitive);
                    return {
                        term: q, score: score
                    };
                })
                    .OrderBy(function (rank) { return rank.score; });
                var result = scores
                    .Where(function (s) { return s.score != suggestion_list.NA; })
                    .Take(top)
                    .Select(function (s) { return s.term; })
                    .ToArray();
                if (result.length == top) {
                    return result;
                }
                else {
                    return suggestion.makeAdditionalSuggestion(scores, result, caseInsensitive, input, top);
                }
            };
            // 非NA得分的少于top的数量
            // 需要换一种方式计算结果，然后进行补充
            suggestion.makeAdditionalSuggestion = function (scores, result, caseInsensitive, input, top) {
                var lowerInput = input.toLowerCase();
                var addi = scores
                    .Skip(result.length)
                    .Select(function (s) {
                    var q = s.term;
                    var score;
                    if (caseInsensitive) {
                        score = Levenshtein.ComputeDistance(q.term.toLowerCase(), lowerInput);
                    }
                    else {
                        score = Levenshtein.ComputeDistance(q.term, input);
                    }
                    return {
                        term: q, score: score
                    };
                }).OrderBy(function (s) { return s.score; })
                    .Take(top - result.length)
                    .Select(function (s) { return s.term; })
                    .ToArray();
                return result.concat(addi);
            };
            suggestion.getScore = function (q, input, lowerInput, caseInsensitive) {
                if (caseInsensitive) {
                    // 大小写不敏感的模式下，都转换为小写
                    var lowerTerm = q.term.toLowerCase();
                    return suggestion_list.term.indexOf(lowerTerm, lowerInput);
                }
                else {
                    return q.dist(input);
                }
            };
            return suggestion;
        }());
        suggestion_list.suggestion = suggestion;
    })(suggestion_list = uikit.suggestion_list || (uikit.suggestion_list = {}));
})(uikit || (uikit = {}));
var uikit;
(function (uikit) {
    var suggestion_list;
    (function (suggestion_list) {
        suggestion_list.NA = 100000000000;
        /**
         * Term for suggestion
        */
        var term = /** @class */ (function () {
            /**
             * @param id 这个term在数据库之中的id编号
            */
            function term(id, term) {
                this.id = id;
                this.term = term;
            }
            /**
             * 使用动态规划算法计算出当前的这个term和用户输入之间的相似度
            */
            term.prototype.dist = function (input) {
                return term.indexOf(this.term, input);
            };
            term.indexOf = function (term, input) {
                var i = term.indexOf(input);
                if (i == -1) {
                    return suggestion_list.NA;
                }
                else {
                    return Math.abs(input.length - term.length);
                }
            };
            return term;
        }());
        suggestion_list.term = term;
    })(suggestion_list = uikit.suggestion_list || (uikit.suggestion_list = {}));
})(uikit || (uikit = {}));
//# sourceMappingURL=biocad.js.map