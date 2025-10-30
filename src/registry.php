<?php

include dirname(__DIR__) . "/etc/bootstrap.php";

class App {

    /**
     * query reaction network by a given ec number
     * 
     * @access *
    */
    public function reaction_network($ec_number, $simple = false) {
        $term = (new Table(["cad_registry"=>"vocabulary"]))->where(["category"=>"Regulation Type","term"=>"Enzymatic Catalysis"])->find();
        $reaction_term = (new Table(["cad_registry"=>"vocabulary"]))->where(["category"=>"Entity Type","term"=>"Reaction"])->find();
        $cats = (new Table(["cad_registry"=>"regulation_graph"]))->where(["term" => $ec_number, "role" => $term["id"]])->project("reaction_id");
        $metab_term = (new Table(["cad_registry"=>"vocabulary"]))->where(["category"=>"Molecule Type","term"=>"Metabolite"])->find();

        if (count($cats) == 0) {
            controller::error("no reaction is associated with this ec number", 404);
        } else {
            $simple = Conversion::CBool($simple);
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
                if ($simple) {
                    $args = [];
                } else {
                    $mol_list = array_merge( array_column($left,"molecule_id"), array_column($right,"molecule_id"));
                    $mol_list = array_map('strval', $mol_list);
                    $args = (new Table(["cad_registry"=>"kinetic_law"]))
                        ->left_join("kinetic_substrate")
                        ->on(["kinetic_law"=>"id","kinetic_substrate"=>"kinetic_id"])
                        ->where([
                            "ec_number" => $ec_number,
                            "metabolite_id"=> in($mol_list ),
                            "temperature" => in (25,40)
                        ])->select(["params", "lambda", "metabolite_id","json_str"]);
    
                    for($i =0; $i< count($args); $i++) {
                        $pars = json_decode($args[$i]["params"]);
                        $json = json_decode($args[$i]["json_str"]);
                        $json = $json["xref"];
                        $parsData = [];
                        $missing = false;

                        foreach($pars as $name => $val) {
                            if (array_key_exists($val, $json)) {
                                $idset = $json[$val];

                                if (count($idset) == 0) {
                                    $missing = true;
                                } else {
                                    $idset = (new Table(["cad_registry"=>"db_xrefs"]))
                                        ->where(["type"=>$metab_term, "xref"=> in($idset)])
                                        ->distinct()
                                        ->project("obj_id")
                                        ;
                                    $idset = array_map('strval', $idset);
                                    $idset = array_intersect($idset, $mol_list);

                                    if (count($idset) == 0) {
                                        $missing = true;
                                    } else {
                                        $val = "BioCAD" . str_pad($missing[0], 11, "0", STR_PAD_LEFT);
                                    }
                                }
                            }

                            $parsData[$name] = $val;
                        }

                        if (!$missing) {
                            $args[$i]["params"] = $parsData;
                        } else {
                            $args[$i] = null;
                        }                        
                    }
                }

                $list[$hash["hashcode"]] = [
                    "guid" => $hash["hashcode"],
                    "name" => $rxn["name"],
                    "reaction" => $rxn["equation"],
                    "left" => $left,
                    "right" => $right,
                    "law" => array_filter($args)
                ];
            }
        }

        controller::success($list);
    }

    /**
     * @access *
    */
    public function molecule($id) {
        $mol = (new Table(["cad_registry"=>"molecule"]))
            ->where(["id"=>$id])
            ->find(["id","name","formula"])
            ;

        if (Utils::isDbNull($mol)) {
            controller::error("no molecule data is associated with the given registry id");
        } else {
            $mol["db_xrefs"] = (new Table(["cad_registry"=>"db_xrefs"]))
                ->left_join("vocabulary")
                ->on(["vocabulary"=>"id","db_xrefs"=>"db_key"])
                ->where(["obj_id" => $id])
                ->distinct()
                ->order_by("dbname")
                ->select(["term AS dbname", "xref AS xref_id"])
                ;

            controller::success($mol);
        }
    }

    /**
     * get all known operons
     * 
     * @access *
    */
    public function known_operons() {
        $list = (new Table(["cad_registry"=>"conserved_cluster"]))
            ->left_join("cluster_link")
            ->on(["cluster_link"=>"cluster_id","conserved_cluster"=>"id"])
            ->where("NOT cluster_id IS NULL")
            ->group_by("cluster_id")
            ->select(["cluster_id","MIN(name) AS name","GROUP_CONCAT(DISTINCT gene_id) AS members"])
            ;

        for($i=0;$i< count($list); $i++) {
            $operon = $list[$i];
            $operon["members"] = Strings::Split($operon["members"], ",");
            $list[$i]=$operon;
        }

        controller::success($list);
    }
}