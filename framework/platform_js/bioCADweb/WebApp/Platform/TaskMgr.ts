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
    }

    export interface task {

    }
}