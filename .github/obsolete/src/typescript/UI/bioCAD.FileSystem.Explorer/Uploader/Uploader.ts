module Uploader {

    /**
     * 用户界面的HTML文档模板
    */
    const view: string = `
        <link crossorigin="anonymous" media="all" rel="stylesheet" href="/typescript/UI/bioCAD.FileSystem.Explorer/Uploader/uploader.css" />

        <form method="post" id="upload-box" action="#" enctype="multipart/form-data" novalidate class="box">
			<div class="box__input">
				<center>
					<img src="/typescript/UI/bioCAD.FileSystem.Explorer/Uploader/cloud.svg" />
					<input type="file" name="files[]" id="file" class="box__file" data-multiple-caption="{count} files selected" multiple />
					<div style="width: 50%;">
						<p>
							<label for="file">
								<strong>Choose a file</strong>
								<span class="box__dragndrop"> or drag it here</span>.
							</label>
						</p>
						<div id="progressBar"></div>
						<br />
						<div>
							<!-- 在onclick事件之中设置上传接受的url地址 -->
							<a id="controlButton" href="#" class="progress-button" onclick="">
								<img src="/typescript/UI/bioCAD.FileSystem.Explorer/Uploader/upload.svg" />&nbsp;Upload
							</a>
						</div>

						<br />
						<div id="warning"></div>
					</div>
				</center>
			</div>
		</form>`;

    var droppedFiles: FileList;
    var isAdvancedUpload: boolean = Browser.isAdvancedUpload();

    export function hasDroppedFiles(): boolean {
        return !(droppedFiles == null || droppedFiles == undefined || droppedFiles.length == 0);
    }

    export function DroppedFiles(): FileList {
        return droppedFiles;
    }

    /**
     * Applying the effect for every form
     * 
     * @param divId 上传模块将会显示在这个div容器之中
     * @param api 这个url是数据上传的数据api url
     * @param upload 这个对象描述了如何处理上传过程之中的完成以及失败的事件
    */
    export function Register(divId: string, api: string, upload: EventHandler): void {
        var container = document.getElementById(divId);

        container.innerHTML = view;
        document.querySelectorAll('.box').forEach(registerImpl);
        document.getElementById("controlButton").onclick = function () {
            UploadHandler.upload(api, upload, "file");
        }
    }

    function getTitleUpdate(input: Element, files: FileList): string {
        var n: number = files.length;

        if (n > 1) {
            var caption: string = input.getAttribute('data-multiple-caption') || '';
            return caption.replace('{count}', n.toString());
        } else {
            return files[0].name;
        }
    }

    /**
     * Letting the server side to know we are going to make an Ajax request
    */
    function getAjaxFlag(): HTMLInputElement {
        var ajaxFlag: HTMLInputElement = document.createElement('input');
        ajaxFlag.setAttribute('type', 'hidden');
        ajaxFlag.setAttribute('name', 'ajax');
        ajaxFlag.setAttribute('value', '1');

        return ajaxFlag;
    }

    function registerImpl(form: Element) {
        var input: HTMLInputElement = form.querySelector('input[type="file"]'),
            label = form.querySelector('label'),
            errorMsg = form.querySelector('.box__error span'),
            restart = form.querySelectorAll('.box__restart'),
            showFiles = function (files: FileList) {
                label.textContent = getTitleUpdate(input, files);
            },
            triggerFormSubmit = function () {
                var event: Event = document.createEvent('HTMLEvents');
                event.initEvent('submit', true, false);
                form.dispatchEvent(event);
            };

        form.appendChild(getAjaxFlag());

        // automatically submit the form on file select
        input.addEventListener('change', () => {
            showFiles(input.files);
        });

        // drag&drop files if the feature is available
        if (isAdvancedUpload) {
            setupAdvancedUpload(form, showFiles);
        }

        // Firefox focus bug fix for file input
        input.addEventListener('focus', function () {
            input.classList.add('has-focus');
        });
        input.addEventListener('blur', function () {
            input.classList.remove('has-focus');
        });
    }

    /**
     * drag&drop files if the feature is available
    */
    function setupAdvancedUpload(form: Element, showFiles: (files: FileList) => void) {
        // letting the CSS part to know drag&drop is supported by the browser
        form.classList.add('has-advanced-upload');

        ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (event) {
            form.addEventListener(event, function (e) {
                // preventing the unwanted behaviours
                e.preventDefault();
                e.stopPropagation();
            });
        });
        ['dragover', 'dragenter'].forEach(function (event) {
            form.addEventListener(event, function () {
                form.classList.add('is-dragover');
            });
        });
        ['dragleave', 'dragend', 'drop'].forEach(function (event) {
            form.addEventListener(event, function () {
                form.classList.remove('is-dragover');
            });
        });

        // the files that were dropped
        form.addEventListener('drop', function (e: DragEvent) {
            droppedFiles = e.dataTransfer.files;
            showFiles(droppedFiles);
        });
    }
}