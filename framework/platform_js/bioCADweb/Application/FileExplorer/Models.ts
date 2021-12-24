/**
 * 文件数据模型
*/
class bioCADFile {

    /**
     * 在数据库之中的唯一编号
    */
    public id: number;
    /**
     * 显示的文件名
    */
    public fileName: string;
    /**
     * 文件大小，单位为``B``
    */
    public size: number;
    /**
     * 文件的格式信息描述
    */
    public mime: bioCADmimeType;

    constructor(data: object, types: Dictionary<bioCADmimeType>) {
        this.id = data["id"];
        this.fileName = data["name"];
        this.size = data["size"];
        this.mime = types.Item(<string>data["content_type"]);
    }

    public toString(): string {
        return this.fileName;
    }
}

/**
 * 对文件格式信息的简要描述
*/
class bioCADmimeType {

    /**
     * 这种文件格式在数据库之中的唯一编号
    */
    public classID: number;
    /**
     * 对文件内容的摘要描述信息
    */
    public contentType: string;
    /**
     * 详细的描述信息
    */
    public description: string;

    constructor(data: object) {
        this.classID = data["id"];
        this.contentType = data["content_type"];
        this.description = data["description"];
    }

    public toString(): string {
        return this.contentType;
    }
}