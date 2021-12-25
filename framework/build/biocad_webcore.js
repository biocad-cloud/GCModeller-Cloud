var Utils;
(function (Utils) {
    /**
     * Create a callback function handler for refresh the image
     *
     * @param api URL for image source.
     * @param imgID id attribute of the img tag
    */
    function RefreshImage(api, imgID) {
        var img = document.getElementById(imgID);
        var url = "";
        if (api.indexOf("?") > -1) {
            url = api + "&refresh_rnd=";
        }
        else {
            url = api + "?refresh_rnd=";
        }
        return function () {
            img.setAttribute("src", api + rnd());
        };
    }
    Utils.RefreshImage = RefreshImage;
    /**
     * Alias of the function: ``Math.random``
    */
    function rnd() {
        return Math.random();
    }
    Utils.rnd = rnd;
})(Utils || (Utils = {}));
/// <reference path="../../build/linq.d.ts" />
/**
 * The kegg brite index file parser
 *
 * https://www.kegg.jp/kegg/brite.html
*/
var KEGG;
(function (KEGG) {
    var brite;
    (function (brite) {
        /**
         * 将目标brite json文件或者对象解析为对象entry枚举
        */
        function parse(briteText) {
            var tree = typeof briteText == "string" ? JSON.parse(briteText) : briteText;
            var list = new List();
            for (var _i = 0, _a = tree.children; _i < _a.length; _i++) {
                var node = _a[_i];
                list.AddRange(treeTravel(node));
            }
            return list;
        }
        brite.parse = parse;
        /**
         * 进行递归构建
        */
        function treeTravel(Class, class_path, list) {
            if (class_path === void 0) { class_path = []; }
            if (list === void 0) { list = []; }
            if (isLeaf(Class)) {
                list.push({
                    entry: parseIDEntry(Class.name),
                    class_path: class_path.slice()
                });
            }
            else {
                class_path = class_path.slice();
                // there is a child count number in class name
                // removes this count number tags
                //
                // example as: Prokaryotes (5639)
                class_path.push(Class.name.replace(/\s+[(]\d+[)]/ig, ""));
                Class.children.forEach(function (node) { return treeTravel(node, class_path, list); });
            }
            return list;
        }
        function parseIDEntry(text) {
            var list = text.split(/\s{2,}/g);
            if (text.indexOf(" ") == -1) {
                return new brite.IDEntry(text, text);
            }
            if (list.length > 1) {
                var id = list[0];
                var names = $from(list)
                    .Skip(1)
                    .Select(function (s) { return s.split(/;\s*/g); })
                    .Unlist(function (x) { return x; })
                    .ToArray();
                return new brite.IDEntry(id, names);
            }
            else {
                var id = text.match(/\d{4,}\s/ig)[0];
                var name_1 = text.substr(id.length);
                return new brite.IDEntry(Strings.Trim(id, " "), Strings.Trim(name_1, " "));
            }
        }
        brite.parseIDEntry = parseIDEntry;
        function isLeaf(node) {
            return $ts.isNullOrEmpty(node.children);
        }
    })(brite = KEGG.brite || (KEGG.brite = {}));
})(KEGG || (KEGG = {}));
var KEGG;
(function (KEGG) {
    var brite;
    (function (brite) {
        /**
         * key-value mapping of [ID => names]
        */
        var IDEntry = /** @class */ (function () {
            function IDEntry(id, names) {
                this.id = id;
                if (typeof names == "string") {
                    this.names = [names];
                }
                else {
                    this.names = names;
                }
            }
            Object.defineProperty(IDEntry.prototype, "commonName", {
                get: function () {
                    return this.names[0];
                },
                enumerable: true,
                configurable: true
            });
            ;
            IDEntry.prototype.toString = function () {
                return this.commonName;
            };
            return IDEntry;
        }());
        brite.IDEntry = IDEntry;
    })(brite = KEGG.brite || (KEGG.brite = {}));
})(KEGG || (KEGG = {}));
var MIME;
(function (MIME) {
    function ParseFasta(stream) {
        var seq = [];
        // 使用正则表达式进行切割并去除空白行
        var lines = $from(stream.split(/\n/))
            .Where(function (l) { return !Strings.Empty(l, true); })
            .ToArray();
        var header;
        var seqBuffer = "";
        var isnull = function () {
            return Strings.Empty(header) && Strings.Empty(seqBuffer);
        };
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (line.charAt(0) == ">") {
                // 是新的序列起始
                if (!isnull()) {
                    seq.push({
                        headers: header.split("|"),
                        sequence: seqBuffer
                    });
                }
                header = line.substr(1);
                seqBuffer = "";
            }
            else {
                seqBuffer = seqBuffer + line;
            }
        }
        if (!isnull()) {
            seq.push({
                headers: header.split("|"),
                sequence: seqBuffer
            });
        }
        return seq;
    }
    MIME.ParseFasta = ParseFasta;
})(MIME || (MIME = {}));
var BioCAD;
(function (BioCAD) {
    var MIME;
    (function (MIME) {
        var bioClassType;
        (function (bioClassType) {
            /**
             * The unknown class type
            */
            bioClassType[bioClassType["unknown"] = 0] = "unknown";
            /**
             * General text file
            */
            bioClassType[bioClassType["text"] = 1] = "text";
            /**
             * Image file
            */
            bioClassType[bioClassType["image"] = 2] = "image";
            /**
             * The data table is a kind of numeric matrix for gene expression data, or something.
            */
            bioClassType[bioClassType["matrix"] = 3] = "matrix";
            /**
             * The biological sequence data type, like fasta sequence file.
            */
            bioClassType[bioClassType["bioSequence"] = 4] = "bioSequence";
            /**
             * biological model file for run simulator
            */
            bioClassType[bioClassType["model"] = 5] = "model";
        })(bioClassType = MIME.bioClassType || (MIME.bioClassType = {}));
    })(MIME = BioCAD.MIME || (BioCAD.MIME = {}));
})(BioCAD || (BioCAD = {}));
var BioCAD;
(function (BioCAD) {
    var MIME;
    (function (MIME) {
        /**
         * 对文件格式信息的简要描述
        */
        var mimeType = /** @class */ (function () {
            function mimeType(data) {
                this.classID = data["id"];
                this.contentType = data["content_type"];
                this.description = data["description"];
            }
            mimeType.prototype.toString = function () {
                return this.contentType;
            };
            return mimeType;
        }());
        MIME.mimeType = mimeType;
    })(MIME = BioCAD.MIME || (BioCAD.MIME = {}));
})(BioCAD || (BioCAD = {}));
//# sourceMappingURL=biocad_webcore.js.map