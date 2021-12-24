const containerClassName: string = "file-preview-thumbnails";

namespace Application.Explorer {

    type BioClass = BioCAD.MIME.bioClassType;

    /**
     * 文件浏览器的模型，这个对象是一个文件的集合
    */
    export class Explorer {

        /**
         * 文件列表
        */
        public files: FileHandle[];
        /**
         * 用于显示文件列表的div容器的编号
        */
        public divId: string;
        /**
         * div容器对象
        */
        public container: HTMLDivElement;

        public constructor(div: HTMLDivElement, files: FileHandle[]) {
            this.divId = div.id;
            this.files = files;
            this.container = div;
        }

        /**
         * 将文件显示在html用户界面之上
         * 
         * @param divId 文件浏览器将会显示在这个div之中
         * @param icons 将文件的mime type转换为大分类的映射数组
        */
        public static show(divId: string, files: bioCADFile[], icons: Map<string, BioClass>[] = []): Explorer {
            var div: HTMLDivElement = <HTMLDivElement>document.getElementById(divId);
            var iconTypes: Dictionary<BioClass> = $from(icons).ToDictionary(map => map.key, map => map.value);
            var fileHandles: IEnumerator<FileHandle> = $from(files)
                .Select((file: bioCADFile) => {
                    var cls: BioClass = iconTypes.Item(file.mime.contentType);
                    var svg: string[] = bioMimeTypes.classToFontAwsome(cls);
                    var handle: FileHandle = new FileHandle(file, svg);

                    return handle;
                });

            // 初始化容器div对象
            if (!div.classList.contains(containerClassName)) {
                div.classList.add(containerClassName);
            }
            div.innerHTML = fileHandles
                .Select(file => file.toString())
                .JoinBy("\n\n");

            // 按照class查找对应的按钮注册处理事件

            return new Explorer(div, fileHandles.ToArray());
        }

        /**
         * 加载script标签之中的json数据然后解析为所需要的映射关系
        */
        public static getFaMaps(idClassTypes: string): Map<string, BioClass>[] {
            var types: Map<string, BioClass>[] = $from(LoadJson(idClassTypes))
                .Select(c => {
                    var contentType: string = <string>c["content_type"];
                    var classId: number = <number>c["classId"];
                    var classType: BioClass = <BioClass>classId;

                    return new Map<string, BioClass>(contentType, classType);
                }).ToArray();

            console.log(types);

            return types;
        }

        /**
         * 加载script标签之中的json数据然后解析为文件数据模型
        */
        public static getFiles(idFiles: string, idClassTypes: string): bioCADFile[] {
            var types: Dictionary<BioCAD.MIME.mimeType> = $from(LoadJson(idClassTypes))
                .ToDictionary(
                    c => <string>c["id"],
                    c => new BioCAD.MIME.mimeType(c)
                );
            var files: bioCADFile[] = $from(LoadJson(idFiles))
                .Select(a => new bioCADFile(a, types))
                .ToArray();

            console.log(files);

            return files;
        }
    }
}