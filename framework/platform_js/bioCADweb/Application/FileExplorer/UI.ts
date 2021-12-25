// 在这里构建出用于显示文件的UI部分的代码

namespace Application.Explorer {

    /**
     * 将文件呈现给用户的UI代码部分
    */
    export class FileHandle {

        public divId: string;
        /**
         * 目标文件的数据模型对象
        */
        public file: bioCADFile;
        public div: HTMLDivElement;

        /**
         * ``[svg, color]``
        */
        public mimeIcon: string[];

        public get fileId(): string {
            return this.file.id.toString();
        }

        public constructor(file: bioCADFile, icon: string[]) {
            this.file = file;
            this.mimeIcon = icon;
        }

        static classNames: string[] = [
            "file-preview-frame",
            "krajee-default",
            "file-preview-initial",
            "file-sortable",
            "kv-preview-thumb"
        ];

        private footer(): string {
            return `<div class="file-footer-caption" title="${this.file.fileName}">
                    <div class="file-caption-info">${this.file.fileName}</div>
                    <div class="file-size-info">
                        <samp>(${this.file.size})</samp>
                    </div>
                </div>`;
        }

        private actionButtons(): string {
            return `<div class="file-actions">
                    <div class="file-footer-buttons">
                        <button type="button" 
                                class="kv-file-remove btn btn-sm btn-kv btn-default btn-outline-secondary" 
                                title="Delete file" 
                                data-url="/site/file-delete" 
                                data-key="${this.fileId}">

                            <i class="glyphicon glyphicon-trash">
                            </i>
                        </button>
                        <button id="view-${this.fileId}" type="button" class="kv-file-zoom btn btn-sm btn-kv btn-default btn-outline-secondary" title="View Details">
                            <i class="glyphicon glyphicon-zoom-in"></i>
                        </button>
                    </div>
                </div>`;
        }

        public handleEvents() {
            const vm = this;

            $ts(`#view-${this.fileId}`).onclick = function () {
                vm.viewer_click();
            }
        }

        public viewer_click() {
            $ts("#diag-title").clear().innerText = "View Model";
            $ts("#diag-body").clear().display($ts("<iframe>", {
                src: `@view:model?guid=${this.fileId}&iframe=true&debugger=false`,
                width: "1500px",
                height: "650px",
                frameborder: "no",
                border: "0",
                marginwidth: "0",
                marginheight: "0",
                scrolling: "no",
                allowtransparency: "yes"
            }));
            $ts("#viewer-modal").style.zIndex = "1050000";

            $("#viewer-modal").modal("show");
        }

        public getNode(): HTMLElement {
            const svg: string = this.mimeIcon[0];
            const color: string = this.mimeIcon[1];
            const content: HTMLElement = $ts("<div>", {
                class: "kv-file-content"
            }).display($ts("<div>", {
                class: ["kv-preview-data", "file-preview-other-frame"],
                style: "width:auto;height:auto;max-width:100%;max-height:100%;"
            }).display(`
                <div class="file-preview-other">
                    <span class="file-other-icon">
                        <a href="/biostack/pathway_design/view?guid=${this.fileId}">
                            <center>
                                <div style="max-width: 128px; height: 50px; color: ${color};">
                                    ${svg}
                                </div>
                            </center>
                        </a>
                    </span>
                </div>
            `));
            const footer: HTMLElement = $ts("<div>", {
                class: "file-thumbnail-footer"
            })
                .appendElement(this.footer())
                .appendElement(this.actionButtons())
                .appendElement($ts("<div>", { class: "clearfix" }));

            return $ts("<div>", {
                class: ["file-preview-frame", "krajee-default", "file-preview-initial", "file-sortable", "kv-preview-thumb"],
                id: `r-${this.fileId}`,
                "data-fileindex": this.fileId,
                "data-template": "image",
                title: this.file.fileName
            })
                .appendElement(content)
                .appendElement(footer);
        }
    }
}