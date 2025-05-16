<?php

include dirname(__DIR__) . "/etc/bootstrap.php";

class App {

    /**
     * BioCAD Cloud Platform
     * 
     * @access *
    */
    public function index() {
        include_once APP_PATH . "/scripts/index.php";

        View::Display(index_page::index_info());
    }

    /**
     * @access *
    */
    public function search($q) {
        include_once APP_PATH . "/scripts/search.php";

        $q = urldecode($q);
        $page = search_tool::get_result($q);
        $page["title"] = "Search Result Of '{$q}'";

        View::Display($page);
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

    /**
     * Browse Molecule List
     * 
     * @access *
    */
    public function molecules($page = 1, $page_size=100) {
        include_once APP_PATH . "/scripts/molecule_list.php";

        $page = molecule_list::browse_list($page,$page_size);
        $page = [
            "page" => $page
        ];

        View::Display($page);
    }

    /**
     * @access *
    */
    public function reaction($id) {
        include_once APP_PATH . "/scripts/reaction_info.php";

        $page = reaction_info::get_data($id);
        $page["title"] = $page["name"];

        View::Display($page);
    }

    /**
     * @access *
    */
    public function enzyme($id) {
        include_once APP_PATH . "/scripts/enzyme_info.php";

        $page = enzyme_info::get_data($id);
        $page["title"] = $id;

        View::Display($page);
    }
}