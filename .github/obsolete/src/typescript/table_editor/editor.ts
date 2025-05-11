/**
 * 对表格之中的单行数据的编辑操作的对象
*/
class editor {

    /**
     * 操作按钮的表格的列对象
    */
    private td: HTMLElement;
    /**
     * 进行数据编辑操作的行对象
    */
    private tr: HTMLElement;
    private tbody: HTMLElement;
    private table: tableEditor;

    constructor(tr: HTMLElement, tbody: HTMLElement, table: tableEditor) {
        var td = document.createElement("td");

        td.innerHTML = template.editor_template;
        tr.appendChild(td);

        this.tr = tr;
        this.tbody = tbody;
        this.td = td;
        this.table = table;

        // 进行按钮的事件绑定
        this.getElementById("confirm").onclick = () => { this.confirmNew() };
        this.getElementById("cancel").onclick = () => { this.cancelAddNew() };
        this.getElementById("remove").onclick = () => { this.removeCurrent() };
        this.getElementById("edit").onclick = () => { this.editThis() };
        this.getElementById("ok").onclick = () => { this.confirmEdit() };
    }

    public getElementById(id: string): HTMLElement {
        var divs = this.td.getElementsByTagName("div");
        var id_lower = id.toLowerCase();

        for (var i = 0; i < divs.length; i++) {
            var div: HTMLElement = divs[i];

            if (div.id.toLowerCase() == id_lower) {
                return div;
            }

            var abuttons = div.getElementsByTagName("a");

            for (var j = 0; j < abuttons.length; j++) {
                var a: HTMLElement = abuttons[j];

                if (a.id.toLowerCase() == id_lower) {
                    return a;
                }
            }
        }

        return null;
    }

    /**
     * 将符合id条件的html元素显示出来
    */
    public show(id: string) {
        this.getElementById(id).style.display = "block";
    }

    /**
     * 隐藏掉目标html元素对象
    */
    public hide(id: string) {
        this.getElementById(id).style.display = "none";
    }

    /**
     * 将表格内容的输入框隐藏掉
    */
    public hideInputs() {
        var tdList = this.tr.getElementsByTagName("td");

        // 最后一个td是editor的td，没有输入框
        // 所以在这里-1跳过最后一个td
        for (var i = 0; i < tdList.length - 1; i++) {
            var td = tdList[i];
            var textDisplay: HTMLElement = td.getElementsByTagName("div")[0];
            var inputBox: HTMLInputElement = td.getElementsByTagName("input")[0];

            if (textDisplay && inputBox) {
                textDisplay.innerText = inputBox.value;
                textDisplay.style.display = "block";

                inputBox.style.display = "none";
            }
        }
    }

    /**
     * 点击编辑按钮之后显示表格的单元格内容编辑的输入框
    */
    public showInputs() {
        var tdList = this.tr.getElementsByTagName("td");

        // 最后一个td是editor的td，没有输入框
        // 所以在这里-1跳过最后一个td
        for (var i = 0; i < tdList.length - 1; i++) {
            var td = tdList[i];
            var textDisplay: HTMLElement = td.getElementsByTagName("div")[0];
            var inputBox: HTMLInputElement = td.getElementsByTagName("input")[0];

            if (textDisplay && inputBox) {
                inputBox.value = textDisplay.innerText;
                inputBox.style.display = "block";

                textDisplay.style.display = "none";
            }
        }
    }

    /**
     * 确认添加新的表格行数据
    */
    public confirmNew() {
        this.hide("row-new-pending");
        this.show("remove-button");
        this.hideInputs();
        this.table.edit_lock = false;
    }

    /**
     * 取消新增的行数据
    */
    public cancelAddNew() {
        this.tr.remove();
        this.table.edit_lock = false;
    }

    /**
     * 对当前的行数据进行删除
    */
    public removeCurrent() {
        this.tr.remove();
    }

    /**
     * 当前的行进入编辑模式
    */
    public editThis() {
        this.showInputs();
        this.hide("remove-button");
        this.show("edit-button");
        this.table.edit_lock = true;
    }

    /**
     * 确认对当前的行数据的编辑操作，并退出编辑模式
    */
    public confirmEdit() {
        this.hideInputs();
        this.show("remove-button");
        this.hide("edit-button");
        this.table.edit_lock = false;
    }
}

