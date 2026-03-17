<?php

include dirname(__DIR__) . "/etc/bootstrap.php";

class App {

    /**
     * Cella LAB
     * 
     * @access *
     * @uses view
    */
    public function index() {       
        View::Display();
    }

}