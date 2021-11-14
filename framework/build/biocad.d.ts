/// <reference path="linq.d.ts" />
declare namespace bioCAD.WebApp {
    class LogInScript extends Bootstrap {
        readonly appName: string;
        protected init(): void;
        static login(): void;
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
