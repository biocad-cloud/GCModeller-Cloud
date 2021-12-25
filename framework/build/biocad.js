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
/// <reference path="../../build/biocad_webcore.d.ts" />
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
            Router.AddAppHandler(new WebApp.Platform.FileManager());
            Router.RunApp();
        }
        WebApp.start = start;
    })(WebApp = bioCAD.WebApp || (bioCAD.WebApp = {}));
})(bioCAD || (bioCAD = {}));
$ts.mode = Modes.debug;
$ts(bioCAD.WebApp.start);
var containerClassName = "file-preview-thumbnails";
var Application;
(function (Application) {
    var Explorer;
    (function (Explorer) {
        /**
         * 将文件显示在html用户界面之上
         *
         * @param divId 文件浏览器将会显示在这个div之中
         * @param icons 将文件的mime type转换为大分类的映射数组
        */
        function show(divId, files, icons) {
            var div = $ts(divId);
            var mimetypes = $from(icons).ToDictionary(function (map) { return map.classID.toString(); }, function (map) { return map; });
            var fileHandles = $from(files)
                .Select(function (a) { return new Explorer.bioCADFile(a, mimetypes); })
                .Select(function (file) {
                var cls = file.mime.class;
                var svg = Explorer.bioMimeTypes.classToFontAwsome(cls);
                var handle = new Explorer.FileHandle(file, svg);
                return handle;
            });
            // 初始化容器div对象
            if (!div.classList.contains(containerClassName)) {
                div.classList.add(containerClassName);
            }
            for (var _i = 0, _a = fileHandles.ToArray(); _i < _a.length; _i++) {
                var file = _a[_i];
                div.appendChild(file.getNode());
                file.handleEvents();
            }
            // 按照class查找对应的按钮注册处理事件
            return {
                container: div,
                files: fileHandles.ToArray(),
                divId: divId
            };
        }
        Explorer.show = show;
    })(Explorer = Application.Explorer || (Application.Explorer = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Explorer;
    (function (Explorer) {
        /**
         * 文件数据模型
        */
        var bioCADFile = /** @class */ (function () {
            function bioCADFile(data, types) {
                this.id = data["id"];
                this.fileName = data["name"];
                this.size = data["size"];
                this.mime = types.Item(data["content_type"]);
            }
            bioCADFile.prototype.toString = function () {
                return this.fileName;
            };
            return bioCADFile;
        }());
        Explorer.bioCADFile = bioCADFile;
    })(Explorer = Application.Explorer || (Application.Explorer = {}));
})(Application || (Application = {}));
// 在这里构建出用于显示文件的UI部分的代码
var Application;
(function (Application) {
    var Explorer;
    (function (Explorer) {
        /**
         * 将文件呈现给用户的UI代码部分
        */
        var FileHandle = /** @class */ (function () {
            function FileHandle(file, icon) {
                this.file = file;
                this.mimeIcon = icon;
            }
            Object.defineProperty(FileHandle.prototype, "fileId", {
                get: function () {
                    return this.file.id.toString();
                },
                enumerable: true,
                configurable: true
            });
            FileHandle.prototype.footer = function () {
                return "<div class=\"file-footer-caption\" title=\"" + this.file.fileName + "\">\n                    <div class=\"file-caption-info\">" + this.file.fileName + "</div>\n                    <div class=\"file-size-info\">\n                        <samp>(" + this.file.size + ")</samp>\n                    </div>\n                </div>";
            };
            FileHandle.prototype.actionButtons = function () {
                return "<div class=\"file-actions\">\n                    <div class=\"file-footer-buttons\">\n                        <button type=\"button\" \n                                class=\"kv-file-remove btn btn-sm btn-kv btn-default btn-outline-secondary\" \n                                title=\"Delete file\" \n                                data-url=\"/site/file-delete\" \n                                data-key=\"" + this.fileId + "\">\n\n                            <i class=\"glyphicon glyphicon-trash\">\n                            </i>\n                        </button>\n                        <button id=\"view-" + this.fileId + "\" type=\"button\" class=\"kv-file-zoom btn btn-sm btn-kv btn-default btn-outline-secondary\" title=\"View Details\">\n                            <i class=\"glyphicon glyphicon-zoom-in\"></i>\n                        </button>\n                    </div>\n                </div>";
            };
            FileHandle.prototype.handleEvents = function () {
                var vm = this;
                $ts("#view-" + this.fileId).onclick = function () {
                    vm.viewer_click();
                };
            };
            FileHandle.prototype.viewer_click = function () {
                $ts("#diag-title").clear().innerText = "View Model";
                $ts("#diag-body").clear().display($ts("<iframe>", {
                    src: "@view:model?guid=" + this.fileId + "&iframe=true&debugger=false",
                    width: "1500px",
                    height: "650px",
                    frameborder: "no",
                    border: "0",
                    marginwidth: "0",
                    marginheight: "0",
                    scrolling: "no",
                    allowtransparency: "yes"
                }));
                $ts("#viewer-modal").style.zIndex = "1050000";
                $("#viewer-modal").modal("show");
            };
            FileHandle.prototype.getNode = function () {
                var svg = this.mimeIcon[0];
                var color = this.mimeIcon[1];
                var content = $ts("<div>", {
                    class: "kv-file-content"
                }).display($ts("<div>", {
                    class: ["kv-preview-data", "file-preview-other-frame"],
                    style: "width:auto;height:auto;max-width:100%;max-height:100%;"
                }).display("\n                <div class=\"file-preview-other\">\n                    <span class=\"file-other-icon\">\n                        <a href=\"/biostack/pathway_design/view?guid=" + this.fileId + "\">\n                            <center>\n                                <div style=\"max-width: 128px; height: 50px; color: " + color + ";\">\n                                    " + svg + "\n                                </div>\n                            </center>\n                        </a>\n                    </span>\n                </div>\n            "));
                var footer = $ts("<div>", {
                    class: "file-thumbnail-footer"
                })
                    .appendElement(this.footer())
                    .appendElement(this.actionButtons())
                    .appendElement($ts("<div>", { class: "clearfix" }));
                return $ts("<div>", {
                    class: ["file-preview-frame", "krajee-default", "file-preview-initial", "file-sortable", "kv-preview-thumb"],
                    id: "r-" + this.fileId,
                    "data-fileindex": this.fileId,
                    "data-template": "image",
                    title: this.file.fileName
                })
                    .appendElement(content)
                    .appendElement(footer);
            };
            FileHandle.classNames = [
                "file-preview-frame",
                "krajee-default",
                "file-preview-initial",
                "file-sortable",
                "kv-preview-thumb"
            ];
            return FileHandle;
        }());
        Explorer.FileHandle = FileHandle;
    })(Explorer = Application.Explorer || (Application.Explorer = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Explorer;
    (function (Explorer) {
        var bioMimeTypes;
        (function (bioMimeTypes) {
            var iconDNA = [
                "0 0 384 512",
                "M0 495.1C-.5 503 5.2 512 15.4 512h15.4c8.1 0 14.7-6.2 15.3-14.4.3-4.5 1-10.5 2.2-17.6h287c1.2 \n             7.1 2.1 13.4 2.5 17.7.7 8.1 7.3 14.3 15.3 14.3h15.5c11.5 0 15.8-10.7 15.3-16.8-2.1-29.5-16.3-126.8-108.5-208.8-12.6 \n             9.3-26.2 18.2-40.9 26.7 9.1 7.5 17 15.2 24.6 23H123.6c20.6-20.9 46.4-41.3 79.3-59.3C359.8 \n             190.5 381.2 56 384 16.9 384.5 9 378.8 0 368.6 0h-15.4c-8.1 0-14.7 6.2-15.3 14.4-.3 4.5-1 10.5-2.2 \n             17.6H48.6c-1.3-7.1-2-13.2-2.4-17.7C45.5 6.2 38.9 0 30.9 0H15.4C5.2 0-.5 9.1 0 16.9c2.6 35.7 21.2 \n             153 147.9 238.9C21.3 341.4 2.6 458.9 0 495.1zM322.4 80c-5.7 15-13.6 31.3-24.2 48H86.3C75.7 111.3 \n             67.8 95 62 80h260.4zM192 228.8c-27.4-16.3-49.4-34.3-67.5-52.8h135.4c-18.2 18.4-40.3 36.4-67.9 52.8zM61.4 \n             432c5.7-14.9 13.5-31.2 24.1-48h211.7c10.6 16.8 18.6 33 24.4 48H61.4z"
            ];
            var iconText = [
                "0 0 384 512",
                "M288 248v28c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-28c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 \n             12 12zm-12 72H108c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-28c0-6.6-5.4-12-12-12zm108-188.1V464c0 \n             26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V48C0 21.5 21.5 0 48 0h204.1C264.8 0 277 5.1 286 \n             14.1L369.9 98c9 8.9 14.1 21.2 14.1 33.9zm-128-80V128h76.1L256 51.9zM336 464V176H232c-13.3 \n             0-24-10.7-24-24V48H48v416h288z"
            ];
            var iconImage = [
                "0 0 384 512",
                "M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 \n             48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 \n             10.7 24 24 24h104v288H48zm32-48h224V288l-23.5-23.5c-4.7-4.7-12.3-4.7-17 0L176 352l-39.5-39.5c-4.7-4.7-12.3-4.7-17 \n             0L80 352v64zm48-240c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z"
            ];
            var iconExcel = [
                "0 0 384 512",
                "M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 \n             48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 \n             10.7 24 24 24h104v288H48zm212-240h-28.8c-4.4 0-8.4 2.4-10.5 6.3-18 33.1-22.2 42.4-28.6 57.7-13.9-29.1-6.9-17.3-28.6-57.7-2.1-3.9-6.2-6.3-10.6-6.3H124c-9.3 \n             0-15 10-10.4 18l46.3 78-46.3 78c-4.7 8 1.1 18 10.4 18h28.9c4.4 0 8.4-2.4 10.5-6.3 21.7-40 23-45 \n             28.6-57.7 14.9 30.2 5.9 15.9 28.6 57.7 2.1 3.9 6.2 6.3 10.6 6.3H260c9.3 0 15-10 10.4-18L224 320c.7-1.1 \n             30.3-50.5 46.3-78 4.7-8-1.1-18-10.3-18z"
            ];
            var iconUnknown = [
                "0 0 448 512",
                "M448 80v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 \n             0 48 21.49 48 48zm-48 346V86a6 6 0 0 0-6-6H54a6 6 0 0 0-6 6v340a6 6 0 0 0 6 6h340a6 6 0 0 0 6-6zm-68.756-225.2c0 \n             67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 \n             27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 \n             0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C152.846 \n             131.491 182.94 112 229.794 112c49.071 0 101.45 38.304 101.45 88.8zM266 368c0 23.159-18.841 42-42 \n             42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"
            ];
            var iconBioModel = [
                "0 0 384 512",
                "M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm68.53 \n             179.48l11.31 11.31c6.25 6.25 6.25 16.38 0 22.63l-29.9 29.9L304 409.38c6.25 6.25 6.25 16.38 0 22.63l-11.31 11.31c-6.25\n             6.25-16.38 6.25-22.63 0L240 413.25l-30.06 30.06c-6.25 6.25-16.38 6.25-22.63 0L176 432c-6.25-6.25-6.25-16.38\n             0-22.63l30.06-30.06L146.74 320H128v48c0 8.84-7.16 16-16 16H96c-8.84 0-16-7.16-16-16V208c0-8.84 7.16-16 16-16h80c35.35 0\n             64 28.65 64 64 0 24.22-13.62 45.05-33.46 55.92L240 345.38l29.9-29.9c6.25-6.25 16.38-6.25 22.63 0zM176 272h-48v-32h48c8.82\n             0 16 7.18 16 16s-7.18 16-16 16zm208-150.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"
            ];
            /**
             * bio class type to font-awsome icon name
             *
             * ## 2018-08-15 typescript 的枚举类型目前还不可以使用select进行选择
             * 所以在这里使用if进行数据的获取
            */
            function classToFontAwsome(cls) {
                var BioClass = BioCAD.MIME.bioClassType;
                if (cls == BioClass.text) {
                    return [fillSVG(iconText), "green"];
                }
                else if (cls == BioClass.image) {
                    return [fillSVG(iconImage), "red"];
                }
                else if (cls == BioClass.matrix) {
                    return [fillSVG(iconExcel), "darkgreen"];
                }
                else if (cls == BioClass.bioSequence) {
                    return [fillSVG(iconDNA), "lightblue"];
                }
                else if (cls == BioClass.model) {
                    return [fillSVG(iconBioModel), "brown"];
                }
                else {
                    return [fillSVG(iconUnknown), "gray"];
                }
            }
            bioMimeTypes.classToFontAwsome = classToFontAwsome;
            /**
             * 填充svg图标的view box和path数据
            */
            function fillSVG(icon) {
                return "<svg role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"" + icon[0] + "\" height=\"128\" class=\"svg-inline--fa fa-w-12 fa-9x\">\n                    <path fill=\"currentColor\" d=\"" + icon[1] + "\">\n                    </path>\n                </svg>";
            }
        })(bioMimeTypes = Explorer.bioMimeTypes || (Explorer.bioMimeTypes = {}));
    })(Explorer = Application.Explorer || (Application.Explorer = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Suggestion;
    (function (Suggestion) {
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
                var suggestions = new Suggestion.suggestion(terms);
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
        })(render = Suggestion.render || (Suggestion.render = {}));
    })(Suggestion = Application.Suggestion || (Application.Suggestion = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Suggestion;
    (function (Suggestion) {
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
                    .Where(function (s) { return s.score != Suggestion.NA; })
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
                    return Suggestion.term.indexOf(lowerTerm, lowerInput);
                }
                else {
                    return q.dist(input);
                }
            };
            return suggestion;
        }());
        Suggestion.suggestion = suggestion;
    })(Suggestion = Application.Suggestion || (Application.Suggestion = {}));
})(Application || (Application = {}));
var Application;
(function (Application) {
    var Suggestion;
    (function (Suggestion) {
        Suggestion.NA = 100000000000;
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
                    return Suggestion.NA;
                }
                else {
                    return Math.abs(input.length - term.length);
                }
            };
            return term;
        }());
        Suggestion.term = term;
    })(Suggestion = Application.Suggestion || (Application.Suggestion = {}));
})(Application || (Application = {}));
var bioCAD;
(function (bioCAD) {
    var WebApp;
    (function (WebApp) {
        var Platform;
        (function (Platform) {
            var FileManager = /** @class */ (function (_super) {
                __extends(FileManager, _super);
                function FileManager() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(FileManager.prototype, "appName", {
                    get: function () {
                        return "FileExplorer";
                    },
                    enumerable: true,
                    configurable: true
                });
                FileManager.prototype.init = function () {
                    var vm = this;
                    $ts.get("@data:bio_mimetype", function (resp) {
                        if (resp.code != 0) {
                            console.error(resp);
                        }
                        else {
                            vm.version = resp.info.version;
                            vm.mimes = $from(resp.info.content_types)
                                .Select(function (a) { return new BioCAD.MIME.mimeType(a); })
                                .ToArray();
                            vm.loadFiles(vm.mimes);
                        }
                    });
                };
                FileManager.prototype.loadFiles = function (mimes) {
                    var vm = this;
                    $ts.get("@data:fetch?page=" + 1, function (resp) {
                        if (resp.code != 0) {
                            console.error(resp);
                        }
                        else {
                            vm.explorer = Application.Explorer.show("#file-explorer-display", resp.info, mimes);
                        }
                    });
                };
                return FileManager;
            }(Bootstrap));
            Platform.FileManager = FileManager;
        })(Platform = WebApp.Platform || (WebApp.Platform = {}));
    })(WebApp = bioCAD.WebApp || (bioCAD.WebApp = {}));
})(bioCAD || (bioCAD = {}));
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
                            var term = new Application.Suggestion.term(node.key, node.text);
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
                                var term = new Application.Suggestion.term(node.label, node.label);
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
                    var suggest = Application.Suggestion.render.makeSuggestions(terms, Platform.listDiv, function (term) { return _this.clickOnTerm(term); }, 5, true, "");
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
//# sourceMappingURL=biocad.js.map