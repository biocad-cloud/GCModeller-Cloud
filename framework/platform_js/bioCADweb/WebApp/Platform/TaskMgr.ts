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
            const table = $ts("#tasklist").clear();

            for (let task of tasks) {
                table.appendElement(this.taskRow(task));
            }
        }

        private taskRow(task: task) {
            const appTask = $ts("<th>").appendElement(
                $ts("<div>", { class: ["media", "align-items-center"] })
                    .appendElement(`
                        <a href="#" class="avatar rounded-circle mr-3">
                            <img alt="Image placeholder"
                                src="/resources/images/icons/${task.name}.png">
                        </a>`)
                    .appendElement(`
                        <div class="media-body">
                            <span class="mb-0 text-sm">${task.title}</span>
                        </div>`)
            );
            const createTime = $ts("<td>").appendElement(task.create_time);
            const status = $ts("<td>").appendElement(taskStatus[statusCodeMap(task.status)]);
            const end_time = $ts("<td>").appendElement(task.finish_time || "n/a");
            const progress = $ts("<td>").appendElement(taskProgress[statusCodeMap(task.status)]);
            const menu = $ts("<td>", { class: "text-right" }).appendElement(menuTemplate);

            return $ts("<tr>")
                .appendElement(appTask)
                .appendElement(createTime)
                .appendElement(status)
                .appendElement(end_time)
                .appendElement(progress)
                .appendElement(menu);
        }
    }

    const menuTemplate: string = `
        <div class="dropdown">
            <a class="btn btn-sm btn-icon-only text-light" href="#" role="button"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                <a class="dropdown-item bg-danger" href="#">Delete</a>
                <a class="dropdown-item" href="/biostack/pathway_design/flowEditor">View Model</a>
                <a class="dropdown-item" href="#">Help</a>
            </div>
        </div>
    `;

    const taskProgress = {
        "pending": `<div class="d-flex align-items-center">
                                            <span class="mr-2">60%</span>
                                            <div>
                                                <div class="progress">
                                                    <div class="progress-bar bg-warning" role="progressbar"
                                                        aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                                        style="width: 60%;"></div>
                                                </div>
                                            </div>
                                        </div>`,

        "completed": `<div class="d-flex align-items-center">
                                            <span class="mr-2">100%</span>
                                            <div>
                                                <div class="progress">
                                                    <div class="progress-bar bg-success" role="progressbar"
                                                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"
                                                        style="width: 100%;"></div>
                                                </div>
                                            </div>
                                        </div>`,

        "delayed": `<div class="d-flex align-items-center">
                                            <span class="mr-2">72%</span>
                                            <div>
                                                <div class="progress">
                                                    <div class="progress-bar bg-danger" role="progressbar"
                                                        aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"
                                                        style="width: 72%;"></div>
                                                </div>
                                            </div>
                                        </div>`,

        "on_schedule": `<div class="d-flex align-items-center">
                                            <span class="mr-2">90%</span>
                                            <div>
                                                <div class="progress">
                                                    <div class="progress-bar bg-info" role="progressbar"
                                                        aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"
                                                        style="width: 90%;"></div>
                                                </div>
                                            </div>
                                        </div>`
    }

    function statusCodeMap(code: number) {
        switch (code.toString()) {
            case "0": return "pending";
            case "200": return "completed";
            case "500": return "delayed";
            case "1": return "on_schedule";
        }
    }

    const taskStatus = {
        pending: `<span class="badge badge-dot mr-4">
                      <i class="bg-warning"></i> pending
                  </span>`,
        completed: `<span class="badge badge-dot">
                        <i class="bg-success"></i> completed
                    </span>`,
        delayed: `<span class="badge badge-dot mr-4">
                      <i class="bg-danger"></i> error
                  </span>`,
        on_schedule: `<span class="badge badge-dot">
                          <i class="bg-info"></i> running
                      </span>`
    };

    export interface task {
        /**
         * the app name
        */
        name: string;
        /**
         * the task title
        */
        title: string;
        create_time: string;
        status: number;
        finish_time: string;
    }
}