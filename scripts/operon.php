<?php

class operon_data {

    public static function getByID($id) {
        $data = (new Table(["cad_registry"=>"conserved_cluster"]))
            ->left_join("ncbi_taxonomy")
            ->on(["ncbi_taxonomy"=>"id","conserved_cluster"=>"tax_id"])
            ->where(["`conserved_cluster`.`id`"=>$id])
            ->find();

        if (!Utils::isDbNull($data)) {
            $data["genes"] = (new Table(["cad_registry"=>"cluster_link"]))
                ->left_join("molecule")
                ->on(["molecule"=>"id","cluster_link"=>"gene_id"])
                ->where(["cluster_id"=>$id])
                ->select();
        }

        return $data;
    }
}