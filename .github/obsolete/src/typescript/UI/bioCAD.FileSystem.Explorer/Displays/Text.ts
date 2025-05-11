namespace DisplayAdapters {

    /**
     * 读取文本文件然后显示出来
    */
    export class Text extends IDisplay {

        show(div: string, file: string): void {
            $.get(file, (text) => {
                $(div).html(`<div>
                                ${text}
                             </div>`);
            });
        }
    }
}