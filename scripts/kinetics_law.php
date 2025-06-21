<?php

class kinetics_law {

    public static function data($id) {
        $law_data = (new Table(["cad_registry"=>"kinetic_law"]))->where(["id"=>$id])->find();
        $law_data["Params"] = json_decode($law_data["Params"]);
        $law_data["Json_str"] = json_decode($law_data["Json_str"]);
        $law_data["reaction"] = (new Table(["cad_registry"=>"regulation_graph"]))
            ->left_join("reaction")
            ->on(["reaction"=>"id","regulation_graph"=>"reaction_id"])
            ->where(["term"=>$law_data["Ec_number"]])
            ->select("`reaction`.*")
            ;

        return $law_data;
    }
}