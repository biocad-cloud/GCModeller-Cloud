// 在这里构建出用于显示文件的UI部分的代码

/**
 * 将文件呈现给用户的UI代码部分
*/
class FileHandle {

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
                        <button type="button" class="kv-file-zoom btn btn-sm btn-kv btn-default btn-outline-secondary" title="View Details">
                            <i class="glyphicon glyphicon-zoom-in"></i>
                        </button>
                    </div>
                </div>`;
    }

    /**
     * @returns UI html string
    */
    public toString(): string {
        var svg: string = this.mimeIcon[0];
        var color: string = this.mimeIcon[1];

        return `<div class="file-preview-frame krajee-default file-preview-initial file-sortable kv-preview-thumb" 
                     id="${this.fileId}" 
                     data-fileindex="${this.fileId}" 
                     data-template="image"
                     title="${this.file.fileName}">

                    <div class="kv-file-content">
                        <div class="kv-preview-data file-preview-other-frame" style="width:auto;height:auto;max-width:100%;max-height:100%;">
                            <div class="file-preview-other">
                                <span class="file-other-icon">
                                    <center>
                                        <div style="max-width: 128px; height: 50px; color: ${color};">
                                            ${svg}
                                        </div>
                                    </center>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="file-thumbnail-footer">
                        ${this.footer()}
                        ${this.actionButtons()}

                        <div class="clearfix"></div>
                    </div>
                </div>`;
    }
}