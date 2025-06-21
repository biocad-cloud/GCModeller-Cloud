<?php

class kinetics_list {

    public static function page_data($page=1,$page_size=100) {
        $list = (new Table(["cad_registry"=>"kinetic_law"]))->limit(($page-1)*$page_size,$page_size)->select(["id","temperature","pH","buffer","ec_number"]);
        $list = ["page"=>$list];

        return $list;
    }
}