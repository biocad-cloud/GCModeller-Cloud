<?php

include dirname(__DIR__) . "/etc/bootstrap.php";

class App {

    /**
     * BioCAD Cloud Platform
     * 
     * @access *
    */
    public function index() {
        View::Display();
    }

    /**
     * @access *
    */
    public function phpinfo() {
        echo phpinfo();
    }

    /**
     * View molecule content
     * 
     * @param integer $id the reference id of the molecule object inside the registry system.
     * @access *
    */
    public function molecule($id) {
        include_once APP_PATH . "/scripts/molecule_info.php";

        $page = molecule_info::get_info($id);
        $page["title"] = $page["name"];

        View::Display($page);
    }

    /**
     * @access *
    */
    public function organism($id) {
        include_once APP_PATH . "/scripts/taxonomy_info.php";

        $page = taxonomy_info::get_info($id);
        $page["title"] = $page["taxname"];

        View::Display($page);
    }
}