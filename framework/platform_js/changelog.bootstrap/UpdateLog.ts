
/**
 * 更新的类型枚举值
*/
enum updateTypes {

    /**
     * 功能新增
    */
    New,
    /**
     * 功能加强
    */
    Improvement,
    /**
     * Bug修复
    */
    Bugfix,
    /**
     * 移除了一个旧功能
    */
    Removes
}


class updateLog {

    /**
     * 更新的类型的标签枚举值
    */
    public tag: updateTypes;
    /**
     * 更新的内容日志
    */
    public note: string;

    constructor(tag: updateTypes = updateTypes.Improvement, note: string = "") {
        this.tag = tag;
        this.note = note;
    }

    public get bootstrapItem(): string {
        var tag: string = null;
        var title: string = null;

        switch (this.tag) {
            case updateTypes.Bugfix:
                tag = "label-warning";
                title = "Bugfix";
            case updateTypes.Improvement:
                tag = "label-info";
                title = "Improvement";
            case updateTypes.New:
                tag = "label-success";
                title = "New";
            case updateTypes.Removes:
                tag = "label-warning";
                title = "Remove";
            default:
                tag = "label-info";
                title = "Undefined";
        }

        return `<span class="label ${tag}">${title}</span> ${this.note}`;
    }

    public toString(): string {
        return this.bootstrapItem;
    }
}