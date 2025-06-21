<?php

class kinetics_law {

    public static function data($id) {
        $law_data = (new Table(["cad_registry"=>"kinetic_law"]))->where(["id"=>$id])->find();
        $law_data["params"] = json_decode($law_data["params"], true);
        $law_data["json_str"] = json_decode($law_data["json_str"], true);
        $law_data["reaction"] = (new Table(["cad_registry"=>"regulation_graph"]))
            ->left_join("reaction")
            ->on(["reaction"=>"id","regulation_graph"=>"reaction_id"])
            ->where(["term"=>$law_data["ec_number"]])
            ->select("`reaction`.*")
            ;

        return $law_data;
    }
}