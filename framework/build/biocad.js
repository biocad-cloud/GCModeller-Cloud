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
                    console.table(tasks);
                };
                return TaskMgr;
            }(Bootstrap));
            Platform.TaskMgr = TaskMgr;
        })(Platform = WebApp.Platform || (WebApp.Platform = {}));
    })(WebApp = bioCAD.WebApp || (bioCAD.WebApp = {}));
})(bioCAD || (bioCAD = {}));
//# sourceMappingURL=biocad.js.map