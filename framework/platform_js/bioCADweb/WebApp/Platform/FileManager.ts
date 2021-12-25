namespace bioCAD.WebApp.Platform {

    export class FileManager extends Bootstrap {

        private explorer: Application.Explorer.Explorer;
        private mimes: BioCAD.MIME.mimeType[];
        private version: string;

        public get appName(): string {
            return "FileExplorer";
        }

        protected init(): void {
            const vm = this;

            $ts.get<{
                version: number,
                content_types: BioCAD.MIME.mimeType[]
            }>("@data:bio_mimetype", function (resp) {

                if (resp.code != 0) {
                    console.error(resp);
                } else {
                    vm.version = (<any>resp.info).version;
                    vm.mimes = (<any>resp.info).content_types;
                    vm.loadFiles(vm.mimes);
                }
            });
        }

        private loadFiles(mimes: BioCAD.MIME.mimeType[]) {
            $ts.get(`@data:fetch?page=${1}`, function (resp) {
                if (resp.code != 0) {
                    console.error(resp);
                } else {
                    console.log(resp.info);
                }
            });
        }

        private __loadFiles() {
          
        }
    }
}