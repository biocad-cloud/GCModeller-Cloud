<?php

include dirname(__DIR__) . "/etc/bootstrap.php";

class App {

    /**
     * BioCAD Cloud Platform
     * 
     * @access *
     * @uses view
    */
    public function index() {
        include_once APP_PATH . "/scripts/index.php";

        View::Display(index_page::index_info());
    }

    /**
     * @access *
     * @uses view
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
     * @uses view
    */
    public function download() {
        View::Display();
    }

    /**
     * @access *
    */
    public function phpinfo() {
        echo phpinfo();
    }

    /**
     * @access *
     * @uses view
    */
    public function kinetics($page=1,$page_size=100) {
        include_once APP_PATH . "/scripts/kinetics_list.php";

        $page = kinetics_list::page_data($page,$page_size);
        
        View::Display($page);
    }

    /**
     * @access *
     * @uses view
    */
    public function kinetics_law($id) {
        include_once APP_PATH . "/scripts/kinetics_law.php";

        $page_data = kinetics_law::data($id);

        View::Display($page_data);
    }

    /**
     * View molecule content
     * 
     * @param integer $id the reference id of the molecule object inside the registry system.
     * @access *
     * @uses view
    */
    public function molecule($id) {
        include_once APP_PATH . "/scripts/molecule_info.php";

        $id = Regex::Match($id, "\\d+");

        if (Utils::isDbNull($id) || Strings::Empty($id, true)) {
            RFC7231Error::err400("invalid molecule reference id!");
        } else {
            $id = (int)$id;
        }

        $page = molecule_info::get_info($id);
        $page["title"] = $page["name"];
        $page["struct_data"] = (new Table(["cad_registry" => "sequence_graph"]))->where(["molecule_id" => $id])->findfield("sequence");

        View::Display($page);
    }

    /**
     * @access *
     * @uses view
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
     * @uses view
    */
    public function molecules($page = 1, $page_size=100, $type = null) {
        include_once APP_PATH . "/scripts/molecule_list.php";

        if (!Utils::isDbNull($type)) {
            $page = molecule_list::browse_type($type, $page, $page_size);
        } else {
            $page = molecule_list::browse_list($page,$page_size);
        }
        
        $page = [
            "page" => $page
        ];

        View::Display($page);
    }

    /**
     * @access *
     * @uses view
    */
    public function reaction($id) {
        include_once APP_PATH . "/scripts/reaction_info.php";

        $page = reaction_info::get_data($id);
        $page["title"] = $page["name"];

        View::Display($page);
    }

    /**
     * @access *
     * @uses view
    */
    public function enzyme($id) {
        include_once APP_PATH . "/scripts/enzyme_info.php";

        $page = enzyme_info::get_data($id);
        $page["title"] = $id;

        View::Display($page);
    }

    /**
     * @access *
     * @uses view
    */
    public function ontology($id) {
        include_once APP_PATH . "/scripts/ontology_info.php";

        $page = ontology_info::page_data($id);
        $page["title"] = $page["name"];

        View::Display($page);
    }

    /**
     * @access *
     * @uses view
    */
    public function tag($id,$page=1,$page_size=100) {
        include_once APP_PATH . "/scripts/tag_list.php";

        $page = tagdata::list($id, $page, $page_size);
        $page["title"] = $page["term"];

        View::Display($page);
    }
    
    /**
     * @access *
     * @uses view
    */
    public function subcellular($id,$page=1,$page_size=100) {
        include_once APP_PATH . "/scripts/subcellular_data.php";

        $page = subcellular_data::list($id, $page, $page_size);
        $page["title"] = $page["term"];

        View::Display($page);
    }

    /**
     * @access *
     * @uses view
    */    
    public function odor($id,$page=1,$page_size=100) {
        include_once APP_PATH . "/scripts/odor_data.php";

        $page = odor_data::odor_page($id, $page, $page_size);
        $page["title"] = urldecode($id);

        View::Display($page);
    }

    /**
     * redirect to molecule page by uniprot id
     * 
     * @access *
    */
    public function uniprot($id) {
        $uniprot_id = (new Table(["cad_registry"=>"vocabulary"]))->where(["category"=>"External Database","term"=>"UniProtKB/Swiss-Prot"])->find();
        $xref = (new Table(["cad_registry"=>"db_xrefs"]))->where(["db_key"=>$uniprot_id["id"], "xref"=>$id])->find();

        if (Utils::isDbNull($xref)) {
            RFC7231Error::err404("There is uniprot id is record inside this database");
        } else {
            Redirect("/molecule/{$xref["obj_id"]}");
        }
    }
}