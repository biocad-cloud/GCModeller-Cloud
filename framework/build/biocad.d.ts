/// <reference path="linq.d.ts" />
declare namespace bioCAD.WebApp {
    /**
     * script module for user login
    */
    class LoginScript extends Bootstrap {
        readonly appName: string;
        protected init(): void;
        login_click(): void;
        static do_login(): void;
    }
}
declare namespace bioCAD.WebApp {
    class RecoverScript extends Bootstrap {
        readonly appName: string;
        protected init(): void;
        static doRecover_onclick(): void;
    }
}
declare namespace bioCAD.WebApp {
    class RegisterScript extends Bootstrap {
        readonly appName: string;
        protected init(): void;
        doRegister_onclick(): void;
    }
}
declare const dev: Console;
declare const logo: string[];
declare namespace bioCAD.WebApp {
    function start(): void;
}
declare namespace bioCAD.WebApp.Platform {
    class TaskMgr extends Bootstrap {
        private totalTasks;
        readonly appName: string;
        protected init(): void;
        private loadTable;
        private taskRow;
    }
    interface task {
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
