<?php

include dirname(__DIR__) . "/etc/bootstrap.php";

class App {

    /**
     * query reaction network by a given ec number
     * 
     * @access *
    */
    public function reaction_network($ec_number) {
        $term = (new Table(["cad_registry"=>"vocabulary"]))->where(["category"=>"Regulation Type","term"=>"Enzymatic Catalysis"])->find();
        $reaction_term = (new Table(["cad_registry"=>"vocabulary"]))->where(["category"=>"Entity Type","term"=>"Reaction"])->find();
        $cats = (new Table(["cad_registry"=>"regulation_graph"]))->where(["term" => $ec_number, "role" => $term["id"]])->project("reaction_id");

        if (count($cats) == 0) {
            controller::error("no reaction is associated with this ec number", 404);
        }

        $unique_hash = (new Table(["cad_registry"=>"hashcode"]))
            ->where(["type_id" => $reaction_term["id"], 
                "obj_id"=> in($cats), 
                "hashcode" => not_eq("")])
            ->group_by("hashcode")
            ->select(["hashcode", "GROUP_CONCAT(DISTINCT obj_id) AS reactions"])
            ;
        $list = [];
        $left_term = (new Table(["cad_registry"=>"vocabulary"]))->where(["category"=>"Compound Role","term"=>"substrate"])->find();
        $right_term = (new Table(["cad_registry"=>"vocabulary"]))->where(["category"=>"Compound Role","term"=>"product"])->find();

        foreach($unique_hash as $hash) {
            $first_id = Strings::Split($hash["reactions"],",")[0];
            $rxn = (new Table(["cad_registry"=>"reaction"]))->where(["id" => $first_id])->find();
            $list[$hash["hashcode"]] = [
                "name" => $rxn["name"],
                "reaction" => $rxn["equation"],
                "left" => (new Table(["cad_registry"=>"reaction_graph"]))->where(["reaction"=>$first_id,"role"=>$left_term["id"]])->select(["molecule_id", "factor"]),
                "right" => (new Table(["cad_registry"=>"reaction_graph"]))->where(["reaction"=>$first_id,"role"=>$right_term["id"]])->select(["molecule_id", "factor"]),
            ];
        }

        controller::success($list);
    }
}