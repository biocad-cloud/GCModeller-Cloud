namespace DisplayAdapters {

    /**
     * 在div之中显示图像
    */
    export class Image extends IDisplay {

        show(div: string, file: string): void {
            $(div).html(`<img src="${file}" style="width: 100%;" />`);
        }
    }
}