<?php

class ontology_info {

    public static function page_data($id) {
        $data = (new Table(["cad_registry"=>"ontology"]))
            ->left_join("vocabulary")
            ->on(["ontology"=>"db_source","vocabulary"=>"id"])
            ->where(["`ontology`.id"=>$id])
            ->find(["ontology.*", "term as db_name"])
            ;

        if (Utils::isDbNull($data)) {
            $data = (new Table(["cad_registry"=>"ontology"]))
            ->left_join("vocabulary")
            ->on(["ontology"=>"db_source","vocabulary"=>"id"])
            ->where(["`ontology`.db_xref"=>$id])
            ->find(["ontology.*", "term as db_name"])
            ;

            if (!Utils::isDbNull($data)) {
                $id = $data["id"];
            }            
        }

        if (Utils::isDbNull($data)) {
            RFC7231Error::err404("not able to find an ontology term which is associated with id '{$id}'.");
        } else {
            $data["parent"] = (new Table(["cad_registry"=>"ontology_tree"]))
                ->left_join("ontology")
                ->on(["ontology"=>"id","ontology_tree"=>"is_a"])
                ->where(["ontology_id"=>$id])
                ->select(["is_a", "db_xref", "name"])
                ;

            $data["child"] = (new Table(["cad_registry"=>"ontology_tree"]))
                ->left_join("ontology")
                ->on(["ontology"=>"id","ontology_tree"=>"ontology_id"])
                ->where(["is_a"=>$id])
                ->select(["ontology_id as id", "db_xref", "name"])
                ;

            $data["mol"] = (new Table(["cad_registry"=>"molecule_ontology"]))
                ->left_join("molecule")
                ->on(["molecule"=>"id","molecule_ontology"=>"molecule_id"])
                ->where(["ontology_id"=>$id])
                ->select("molecule.*")
                ;
        }

        return $data;
    }
}