namespace DisplayAdapters {

    export abstract class IDisplay {

        /**
         * Show on a specific div element
         * 
         * @param div The id of the div element
         * @param file 需要进行显示的文件的网络资源URL
        */
        public abstract show(div: string, file: string): void;
    }
}