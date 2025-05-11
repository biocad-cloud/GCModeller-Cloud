<?php

include __DIR__ . "/../framework/bootstrap.php";

class App {

    /**
     * GCModeller Git Repository
    */
    public function index() {
        View::Display();
    }

    /**
     * @uses view
     * @method POST
    */
    public function err500_test() {
        RFC7231Error::err500();
    }

    /**
     * initialize the database
    */
    public function install() {
        $index = new Table("vocabulary");
        $no_indexed = $index->where(["hashcode" => "NA"])->select();

        foreach($no_indexed as $word) {
            $hash = registry_key($word["term"]);
            $index->where([
                "id" => $word["id"]
            ])->save([
                "hashcode" => $hash
            ]);
        } 

        controller::success($index->all());
    }
}