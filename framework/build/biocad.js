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
var bioCAD;
(function (bioCAD) {
    var WebApp;
    (function (WebApp) {
        var Platform;
        (function (Platform) {
            var Report = /** @class */ (function (_super) {
                __extends(Report, _super);
                function Report() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(Report.prototype, "appName", {
                    get: function () {
                        return "reportViewer";
                    },
                    enumerable: true,
                    configurable: true
                });
                Report.prototype.makeChart = function (data, myChart) {
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
                    }).ToArray();
                    var ymax = $from(y).Select(function (a) { return a.ymax; }).Max();
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
                            }
                        },
                        yAxis: {
                            name: 'Activity',
                            min: 0,
                            max: ymax,
                            minorTick: {
                                show: true
                            },
                            minorSplitLine: {
                                show: true
                            }
                        },
                        series: y
                    };
                    console.log("lines:");
                    console.log(y);
                    option && myChart.setOption(option);
                };
                Report.prototype.init = function () {
                    var _this = this;
                    var chartDom = document.getElementById('main');
                    var myChart = echarts.init(chartDom);
                    $ts.getText("@data:PLAS", function (text) { return _this.makeChart($ts.csv(text, false), myChart); });
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
//# sourceMappingURL=biocad.js.map