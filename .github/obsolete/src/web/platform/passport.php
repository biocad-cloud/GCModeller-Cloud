<?php

include __DIR__ . "/../../framework/bootstrap.php";

/**
 * 用户登录界面
*/
class app {

    public function index() {
        Redirect("{<platform>passport/portal}&type=login");
    }

    /**
     * bioCAD Passport Portal
     * 
     * @access *
     * @uses view
     * 
    */
    public function portal($type = "login") {       
        View::Show(APP_PATH . "/views/login.html", [
            "iframe" => "{<platform>passport/$type}"
        ]);
    }

    /**
     * Login
     * 
     * @access *
     * @uses view
     * @debug off
    */
	public function login() {
		View::Display();
	}

    /**
     * Register
     * 
     * @access *
     * @uses view
     * @debug off
    */
    public function register() {
        View::Display();
    }

    /**
     * Recover
     * 
     * @access *
     * @uses view
     * @debug off
    */
    public function recover() {
        View::Display();
    }
}