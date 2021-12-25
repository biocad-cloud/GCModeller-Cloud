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

        const div: HTMLDivElement = <any>$ts(divId);
        const mimetypes = $from(icons).ToDictionary(map => map.classID.toString(), map => map);
        const iconTypes: Dictionary<BioClass> = $from(icons).ToDictionary(map => map.classID.toString(), map => map.class);
        const fileHandles: IEnumerator<FileHandle> = $from(files)
            .Select(a => new bioCADFile(a, mimetypes))
            .Select((file: bioCADFile) => {
                const cls: BioClass = iconTypes.Item(file.mime.contentType);
                const svg: string[] = bioMimeTypes.classToFontAwsome(cls);
                const handle: FileHandle = new FileHandle(file, svg);

                return handle;
            });

        // 初始化容器div对象
        if (!div.classList.contains(containerClassName)) {
            div.classList.add(containerClassName);
        }

        for (let file of fileHandles.ToArray()) {
            div.appendChild(file.getNode());
        }

        // 按照class查找对应的按钮注册处理事件
        return <Explorer>{
            container: div,
            files: fileHandles.ToArray(),
            divId: divId
        };
    }
}