<?php

/**
 * A data directory that contains kegg database files.
*/
define("KEGG_REPOSITORY", "/opt/repository/");

include __DIR__ . "/../../framework/bootstrap.php";

/**
 * data repository for system files and user models
*/
class app {

    /**
     * get my model files
     * 
     * @require page=i32
     * 
     * @uses api
     * @method GET
    */
    public function fetchMy($page = 1, $page_size = 25) {
        $files = DataRepository::getMyModelFiles($page, $page_size);
        $query = DataRepository::getLastMySql();

        controller::success($files, $query);
    }

    /**
     * get all mime type in database
     * 
     * @access *
     * @uses api
    */
    public function bio_mimetypes() {
        // read version data from system configuration table
        $version = 1;
        $all = (new Table("content_types"))->all();

        controller::success([
            "content_types" => $all,
            "version" => $version
        ]);
    }
}