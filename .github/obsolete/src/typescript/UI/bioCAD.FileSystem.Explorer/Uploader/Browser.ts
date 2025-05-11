
module Browser {

    /**
     * Feature detection for drag&drop upload
    */
    export function isAdvancedUpload(): boolean {
        var div: HTMLDivElement = document.createElement('div');
        var draggable = (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div));
        var test: boolean = draggable && 'FormData' in window && 'FileReader' in window;

        return test;
    }
}