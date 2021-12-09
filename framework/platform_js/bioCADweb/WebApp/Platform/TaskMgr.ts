namespace bioCAD.WebApp.Platform {

    export class TaskMgr extends Bootstrap {

        private totalTasks: number;

        public get appName(): string {
            return "app_task";
        }

        protected init(): void {
            const vm = this;

            $ts.get("@data:task_list", function (resp) {
                if (resp.code != 0) {
                    (<any>parent).msgbox(resp.info, 1);
                } else {
                    vm.loadTable(<any>resp.info);
                }
            })

            vm.totalTasks = parseInt(<any>$ts("@data:count_task"));

            TypeScript.logging.log(`You have ${vm.totalTasks} tasks in total!`, TypeScript.ConsoleColors.Magenta);
        }

        private loadTable(tasks: task[]) {
            console.table(tasks);
        }

        private taskRow(task: task) {
            const tr: HTMLElement = $ts("<tr>");
            const appTask = $ts("<th>").appendElement(
                $ts("<div>", { class: ["media", "align-items-center"] }).appendElement(`<a href="#" class="avatar rounded-circle mr-3">
                                                <img alt="Image placeholder"
                                                    src="https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/react.jpg">
                                            </a>`).appendElement(`<div class="media-body">
                                                <span class="mb-0 text-sm">React Material
                                                    Dashboard</span>
                                            </div>`)
            )
        }
    }

    const menuTemplate: string = `
        <div class="dropdown">
            <a class="btn btn-sm btn-icon-only text-light" href="#" role="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another
                    action</a>
                <a class="dropdown-item" href="#">Something else
                    here</a>
            </div>
        </div>
    `;

    const taskStatus = {
        pending: `<span class="badge badge-dot mr-4">
                                            <i class="bg-warning"></i> pending
                                        </span>`,
        completed: `<span class="badge badge-dot">
                                            <i class="bg-success"></i> completed
                                        </span>`,
        delayed: `<span class="badge badge-dot mr-4">
                                            <i class="bg-danger"></i> delayed
                                        </span>`,
        on_schedule: `<span class="badge badge-dot">
                                            <i class="bg-info"></i> on schedule
                                        </span>`
    };

    export interface task {

    }
}