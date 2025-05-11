/**
 * 在这个模块之中处理HTML上传事件
*/
module UploadHandler {

    const NoFileWarning: string = `
        <span style='color:red'>
            * Please select a file to upload at first!
        </span>`;

    var xhr: XMLHttpRequest;

    /**
     * @param inputId input html element id.
    */
    export function upload(url: string, handler: EventHandler, inputId: string = "file"): void {

        // js 获取文件对象	
        var file = <HTMLInputElement>document.getElementById(inputId);
        var fileObj = file.files[0];
        var form: FormData = new FormData();
        var button = $('#controlButton');
        var droppedFiles: FileList = Uploader.DroppedFiles();

        if (xhr) {
            // 已经在上传了，则不需要被重复上传
            return;
        } else {
            form.append("order_id", "test");
        }

        if (!fileObj) {

            // 可能是没有选择任何文件
            if (droppedFiles) {
                // 通过拖拽来选择文件
                fileObj = droppedFiles[0];
                form.append("files", fileObj);
            } else {
                // 没有选择任何文件，则给出警告信息
                document.getElementById("warning").innerHTML = NoFileWarning;
                button.removeClass('in-progress');

                return;
            }

        } else {
            // 将file input之中的文件添加进入POST的form data之中
            form.append("files", fileObj);
        }

        button.click(function (e) {
            e.preventDefault();
        });

        // post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
        xhr = new XMLHttpRequest();
        xhr.open("post", url, true);
        xhr.onload = function (this: XMLHttpRequest, evt: Event) {
            handler.UploadComplete(this, evt);
        };
        xhr.onerror = function (this: XMLHttpRequest, event: ErrorEvent) {
            handler.UploadFailed(this, event);
        };
        xhr.upload.onprogress = function (this: XMLHttpRequest, evt: ProgressEvent) {
            handler.ProgressFunction(this, evt);
        };
        // 上传开始执行方法
        xhr.upload.onloadstart = () => {
            handler.onLoadStart();
        };
        xhr.send(form);
    }
}