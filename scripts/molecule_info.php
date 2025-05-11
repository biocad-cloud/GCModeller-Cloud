<?php

class molecule_info {

    public static function get_info($id) {
        $mol = (new Table(["cad_registry"=>"molecule"]))->where(["id"=>$id])->find();

        return $mol;
    }
}