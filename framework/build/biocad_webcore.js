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
            var id = list[0];
            var names = $from(list)
                .Skip(1)
                .Select(function (s) { return s.split(/;\s*/g); })
                .Unlist(function (x) { return x; })
                .ToArray();
            return new brite.IDEntry(id, names);
        }
        function isLeaf(node) {
            return $ts.isNullOrEmpty(node.children);
        }
    })(brite = KEGG.brite || (KEGG.brite = {}));
})(KEGG || (KEGG = {}));
var KEGG;
(function (KEGG) {
    var brite;
    (function (brite) {
        var IDEntry = /** @class */ (function () {
            function IDEntry(id, names) {
                this.id = id;
                this.names = names;
            }
            Object.defineProperty(IDEntry.prototype, "commonName", {
                get: function () {
                    return this.names[0];
                },
                enumerable: true,
                configurable: true
            });
            ;
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
        var isnull = function () { return Strings.Empty(header) && Strings.Empty(seqBuffer); };
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
//# sourceMappingURL=biocad_webcore.js.map