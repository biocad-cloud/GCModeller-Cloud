class organismTerm {

    public id: number;
    public code: string;
    public name: string;
    public lineage: string[];

    constructor(name: string, lineage: string[]) {
        var parts = name.split("  ");

        this.code = parts[0];
        this.name = parts[1];
        this.id = organismTerm.calcCode(this.code.toUpperCase());
        this.lineage = lineage;
    }

    private static calcCode(codeText: string): number {
        var x = 0;

        for (var i = 0; i < codeText.length; i++) {
            var ascii = codeText.charCodeAt(i);
            x += ascii * Math.pow(10, i * 2);
        }

        return x;
    }
}

class JsonTreeParser {

    /**
     * 通过递归来获取树
    */
    public static parseTree(tree: any): organismTerm[] {
        var terms: organismTerm[] = [];

        tree.children.forEach(child => {
            JsonTreeParser.parseInternal(child, ["/"])
                .forEach(term => {
                    terms.push(term);
                });
        });

        return terms;
    }

    private static parseInternal(node: any, lineage: string[]): organismTerm[] {
        if (node.children) {

            var terms: organismTerm[] = [];

            lineage = [...lineage];
            lineage.push(node.name);

            node.children.forEach(child => {
                JsonTreeParser.parseInternal(child, lineage)
                    .forEach(term => {
                        terms.push(term);
                    });
            });

            return terms;

        } else {
            var name: string = node.name;
            var term = new organismTerm(name, lineage);
            return [term];
        }
    }
}

function loadKEGGOrganism(jsonURL: string, load: (terms: organismTerm[]) => void) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", jsonURL, true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var json: any = JSON.parse(xhr.responseText);
                var tree = JsonTreeParser.parseTree(json);
                load(tree);
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send();
}