<?php

class kinetics_law {

    public static function data($id) {
        $law_data = (new Table(["cad_registry"=>"kinetic_law"]))->where(["id"=>$id])->find();
        $law_data["params"] = self::args(json_decode($law_data["params"], true));
        $law_data["json_str"] = json_decode($law_data["json_str"], true);
        $law_data["reaction"] = (new Table(["cad_registry"=>"regulation_graph"]))
            ->left_join("reaction")
            ->on(["reaction"=>"id","regulation_graph"=>"reaction_id"])
            ->where(["term"=>$law_data["ec_number"]])
            ->select("`reaction`.*")
            ;
        $law_data["sub"] = (new Table(["cad_registry"=>"kinetic_substrate"]))
            ->left_join("molecule")
            ->on(["molecule"=>"id","kinetic_substrate"=>"metabolite_id"])
            ->where(["kinetic_id"=>$id])
            ->select("`molecule`.*")
            ;

        return $law_data;
    }

    private static function args($params) {
        $a = [];

        foreach($params as $name => $val) {
            if (is_numeric($val)) {
                $a[] = [
                    "name" => $name,
                    "value" => $val
                ];
            }
        }

        return $a;
    }

    public static function kinetics_data($reactions) {
        $mols = (new Table(["cad_registry"=>"reaction_graph"]))
            ->where(["reaction"=>in($reactions), "molecule_id"=>gt("0")])
            ->distinct()
            ->project("molecule_id")
            ;
        $data = (new Table(["cad_lab"=>"dynamics"]))
            ->left_join("virtualcell")->on(["virtualcell"=>"id","dynamics"=>"cell_id"])
            ->left_join("experiment")->on(["experiment"=>"id","virtualcell"=>"run_id"])
            ->left_join("`cad_registry`.`molecule`")->on(["molecule"=>"id","dynamics"=>"mol_id"])
            ->where(["mol_id"=>in($mols)])
            ->select(["`molecule`.id as molecule_id",
            "x0",
            "dynamics",
            "cell_id",
            "run_id",
            "taxid",
            "`virtualcell`.name AS cell",
            "proj_id",
            "`experiment`.name AS proj_name",
            "`molecule`.name",
            "formula"])
            ;
        
        return $data;
    }
}