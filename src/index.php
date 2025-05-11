<?php

include dirname(__DIR__) . "/etc/bootstrap.php";

class App {

    /**
     * @access *
    */
    public function index() {
        View::Display();
    }

    /**
     * View molecule content
     * 
     * @param integer $id the reference id of the molecule object inside the registry system.
     * @access *
    */
    public function molecule($id) {
        View::Display();
    }
}