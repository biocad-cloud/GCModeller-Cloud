class tableEditor {

    private headers: string[];
    private rowNumbers: number;
    private tbody: HTMLElement;
    private showRowNumber: boolean;

    public edit_lock: boolean;
    public warningEditLock: () => void;

    /**
     * 这个构造函数将会创建一个新的table对象
     * 
     * @param id id value of a <div> tag. 
    */
    constructor(headers: string[], id: string,
        style: string = null,
        className: string = null,
        tdWidth: string[] = null,
        warning: () => void = null,
        showRowNumber: boolean = true) {

        if (showRowNumber) {
            headers = ["NO."].concat(headers);
        }

        this.headers = headers;
        this.rowNumbers = 1;
        this.warningEditLock = warning;
        this.showRowNumber = showRowNumber;

        var table = document.createElement("table");
        var thead = document.createElement("thead");
        var tbody = document.createElement("tbody");

        document.getElementById(id).appendChild(table);
        table.appendChild(thead);
        table.appendChild(tbody);

        if (style) {
            table.setAttribute("style", style);
        }
        if (className) {
            table.className = className;
        }

        var tr = document.createElement("tr");
        thead.appendChild(tr);

        headers.forEach((header, i) => {
            var th = document.createElement("th");
            th.innerText = header;
            thead.appendChild(th);

            if (tdWidth) {
                th.setAttribute("style", tdWidth[i]);
            }
        });

        this.tbody = tbody;
    }

    public addNew(): editor {
        if (this.edit_lock) {
            if (!this.warningEditLock) {
                this.warningEditLock();
            }

            return null;
        } else {
            return this.addNewInternal();
        }
    }

    private addNewInternal(): editor {
        // 根据header的数量来生成对应的列
        var tr = document.createElement("tr");
        var i = this.rowNumbers++;
        var displayRowNumber: boolean = this.showRowNumber;

        tr.id = `row-${i}`;

        this.headers.forEach((name) => {
            var td = document.createElement("td");

            if (displayRowNumber) {
                displayRowNumber = false;
                td.innerText = i.toString();
            } else {
                var text = document.createElement("div");

                text.id = "text";
                td.appendChild(text);

                // <input id="input-symbol" type="text" style="width: 65%" class="form-control"></input>
                var input = document.createElement("input");
                input.id = `input-${name}`;
                input.type = "text";
                input.style.width = "85%";
                input.className = "form-control";

                td.appendChild(input);
            }

            tr.appendChild(td);
        });

        this.tbody.appendChild(tr);
        this.edit_lock = true;

        return new editor(tr, this.tbody, this);
    }

    public TableData(): Object[] {
        var table: Object[] = [];
        var trList = this.tbody.getElementsByTagName("tr");

        for (var i = 0; i < trList.length; i++) {
            var tr = trList[i];
            var tdList = tr.getElementsByTagName("td");
            var row: Object = {};

            for (var j = 0; j < tdList.length - 1; j++) {
                var td = tdList[j];
                var text: HTMLElement = td.getElementsByTagName("div")[0];

                if (text) {
                    row[this.headers[j]] = text.innerText;
                } else {
                    row[this.headers[j]] = td.innerText;
                }
            }

            table.push(row);
        }

        return table;
    }
}