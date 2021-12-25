const containerClassName: string = "file-preview-thumbnails";

namespace Application.Explorer {

    type BioClass = BioCAD.MIME.bioClassType;

    /**
     * 文件浏览器的模型，这个对象是一个文件的集合
    */
    export interface Explorer {
        /**
         * 文件列表
        */
        files: FileHandle[];
        /**
         * 用于显示文件列表的div容器的编号
        */
        divId: string;
        /**
         * div容器对象
        */
        container: HTMLDivElement;
    }

    /**
     * 将文件显示在html用户界面之上
     * 
     * @param divId 文件浏览器将会显示在这个div之中
     * @param icons 将文件的mime type转换为大分类的映射数组
    */
    export function show(divId: string,
        files: bioCADFile[],
        icons: BioCAD.MIME.mimeType[]): Explorer {

        var div: HTMLDivElement = <any>$ts(divId);
        var iconTypes: Dictionary<BioClass> = $from(icons).ToDictionary(map => map.contentType, map => map.class);
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
        return <Explorer>{
            container: div,
            files: fileHandles.ToArray(),
            divId: divId
        };
    }
}