namespace Application.Explorer {

    /**
     * 文件数据模型
    */
    export class bioCADFile {

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
        public mime: BioCAD.MIME.mimeType;

        constructor(data: object, types: Dictionary<BioCAD.MIME.mimeType>) {
            this.id = data["id"];
            this.fileName = data["name"];
            this.size = data["size"];
            this.mime = types.Item(<string>data["content_type"]);
        }

        public toString(): string {
            return this.fileName;
        }
    }
}