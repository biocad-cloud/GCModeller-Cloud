namespace bioCAD.WebApp {

    /**
     * script module for user login
    */
    export class LoginScript extends Bootstrap {

        public get appName(): string {
            return "login";
        }

        protected init(): void {

        }

        public login_click() {
            LoginScript.do_login();
        }

        static do_login() {
            const account: string = $ts.value("#username");
            const password: string = $ts.value("#password");
            const api: string = <any>$ts("@api:login");

            $ts.post(api, {
                account: account, password: md5(password)
            }, result => {
                if (result.code == 0) {
                    const query = $ts.location("goto", false, "/");
                    const back = decodeURIComponent(query);

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