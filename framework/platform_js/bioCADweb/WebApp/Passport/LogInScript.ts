namespace bioCAD.WebApp {

    export class LogInScript extends Bootstrap {

        public get appName(): string {
            return "login";
        }

        protected init(): void {
            $ts("#login").onclick = LogInScript.login;
        }

        static login() {
            var account: string = $ts("#username").CType<HTMLInputElement>().value;
            var password: string = $ts("#password").CType<HTMLInputElement>().value;
            var api: string = <any>$ts("@api:login");

            $ts.post(api, {
                account: account, password: md5(password)
            }, result => {
                if (result.code == 0) {
                    var query = $ts.location("goto", false, "/");
                    var back = decodeURIComponent(query);

                    if (Strings.Empty(back, true)) {
                        (<any>parent).gotoURL("/");
                    } else {
                        (<any>parent).gotoURL(back);
                    }
                } else {
                    (<any>parent).msgbox(result.info, 1);
                }
            });
        }
    }
}