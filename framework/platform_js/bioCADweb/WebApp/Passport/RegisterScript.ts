namespace bioCAD.WebApp {

    export class RegisterScript extends Bootstrap {

        public get appName(): string {
            return "register";
        }

        protected init(): void { }

        public doRegister_onclick() {
            var username: string = $ts("#username").CType<HTMLInputElement>().value;
            var email: string = $ts("#email").CType<HTMLInputElement>().value;
            var password: string = $ts("#password").CType<HTMLInputElement>().value;
            var checkTermsOfuse: boolean = $ts("#check_terms_of_use").CType<HTMLInputElement>().checked;
            var api: string = <any>$ts("@api:register");

            if (!checkTermsOfuse) {
                (<any>parent).msgbox("You should agree our bioCAD Terms of use at first!", 1);
            } else if (!username || !email || !password) {
                (<any>parent).msgbox("One of the required field is empty!", 1);
            } else {
                $ts.post(api, {
                    username: username,
                    password: md5(password),
                    email: email
                }, result => {

                    if (result.code == 0) {
                        (<any>parent).gotoLogin();
                    } else {
                        (<any>parent).msgbox(result.info, 1);
                    }
                });
            }
        }
    }

}