module template {

    /**
     * 定义了如何生成表格之中的行数据进行编辑操作的按钮的html用户界面
    */
    export const editor_template: string = '\
        <div id="row-new-pending">\
            <a href="#" id="confirm" onclick="newRowWrite(this.parentNode);" >\
                <span class="label label-success">OK</span>\
            </a>&nbsp;\
            <a href="#" id="cancel" onclick="newRowCancel();">\
                <span class="label label-warning">Cancel</span>\
            </a>\
        </div>\
        <div id="remove-button" style="display:none;">\
            <a href="#" id="remove" onclick="remove(this);">\
                <span class="label label-warning">Remove</span>\
            </a>\
            <a href="#" id="edit" onclick="edit(this);">\
                <span class="label label-info">Edit</span>\
            </a>\
        </div>\
        <div id="edit-button" style="display:none;">\
            <a href="#" id="ok" onclick="edit_write(this.parentNode);">\
                <span class="label label-success">OK</span>\
            </a>\
        </div>';
}