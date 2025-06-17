<?php

class odor_data {

    public static function odor_page($term,$page=1,$page_size=100) {
        $page_data = (new Table(["cad_registry"=>"odor"]))
            ->left_join("molecule")
            ->on(["molecule"=>"id","odor"=>"molecule_id"])
            ->where(["odor" => urldecode( $term)])
            ->limit(($page-1)* $page_size, $page_size) 
            ->select(["text", "molecule_id", "name", "formula"])
            ;
        
        return ["page" => $page_data];
    }
}