<?php

class enzyme_info {

    public static function get_data($ec) {
        $rxns = (new Table(["cad_registry"=>"regulation_graph"]))
            ->left_join("reaction")
            ->on(["reaction"=>"id","regulation_graph"=>"reaction_id"])
            ->where(["term" => $ec])
            ->select("`reaction`.*")
            ;
        $prots = (new Table(["cad_registry"=>"db_xrefs"]))
            ->left_join("molecule")
            ->on(["molecule"=>"id","db_xrefs"=>"obj_id"])
            ->left_join("ncbi_taxonomy")
            ->on(["ncbi_taxonomy"=>"id","molecule"=>"tax_id"])
            ->where(["db_key"=>354,"xref"=>$ec])
            ->select(["`molecule`.id","name", "tax_id", "note", "taxname"])
            ;
    
        return [
            "reaction" => $rxns,
            "ec_id" => $ec,
            "note" => "",
            "protein" => $prots
        ];
    }
}