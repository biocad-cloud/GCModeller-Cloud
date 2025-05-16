<?php

class enzyme_info {

    public static function get_data($ec) {
        $rxns = (new Table(["cad_registry"=>"regulation_graph"]))
            ->left_join("reaction")
            ->on(["reaction"=>"id","regulation_graph"=>"reaction_id"])
            ->where(["term" => $ec])
            ->select("`reaction`.*")
            ;

        return [
            "reaction" => $rxns,
            "ec_id" => $ec,
            "note" => ""
        ];
    }
}