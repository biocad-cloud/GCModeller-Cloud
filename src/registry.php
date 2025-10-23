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
            $left = (new Table(["cad_registry"=>"reaction_graph"]))->where(["reaction"=>$first_id,"role"=>$left_term["id"]])->select(["molecule_id", "factor"]);
            $right = (new Table(["cad_registry"=>"reaction_graph"]))->where(["reaction"=>$first_id,"role"=>$right_term["id"]])->select(["molecule_id", "factor"]);

            if (count($left) >0 && count($right) >0) {
                $mol_list = array_merge( array_column($left,"molecule_id"), array_column($right,"molecule_id"));
                $args = (new Table(["cad_registry"=>"kinetic_law"]))
                    ->left_join("kinetic_substrate")
                    ->on(["kinetic_law"=>"id","kinetic_substrate"=>"kinetic_id"])
                    ->where([
                        "ec_number" => $ec_number,
                        "metabolite_id"=> in($mol_list ),
                        "temperature" => in (25,40)
                    ])->select(["params", "lambda", "metabolite_id"]);

                for($i =0; $i< count($args); $i++) {
                    $args[$i]["params"] = json_decode($args[$i]["params"]);
                }

                $list[$hash["hashcode"]] = [
                    "name" => $rxn["name"],
                    "reaction" => $rxn["equation"],
                    "left" => $left,
                    "right" => $right,
                    "law" => $args
                ];
            }
        }

        controller::success($list);
    }

    /**
     * @access *
    */
    public function molecule($id) {
        $mol = (new Table(["cad_registry"=>"molecule"]))->where(["id"=>$id])->find(["name","formula"]);

        if (Utils::isDbNull($mol)) {
            controller::error("no molecule data is associated with the given registry id");
        } else {
            controller::success($mol);
        }
    }
}