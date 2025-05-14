<?php

class taxonomy_info {

    public const none = "<span style='color: gray;'>None</span>";

    public static function get_info($id) {
        $tax = (new Table(["cad_registry"=>"ncbi_taxonomy"]))
            ->left_join("vocabulary")
            ->on(["ncbi_taxonomy"=>"rank","vocabulary"=>"id"])
            ->where(["`ncbi_taxonomy`.id"=>$id])
            ->find([
                "`vocabulary`.term as `rank`",
                "`ncbi_taxonomy`.id",
                "taxname",
                "`ncbi_taxonomy`.description",
                "parent_id"
            ])
            ;

        if (!Utils::isDbNull($tax)) {
            $parent = (new Table(["cad_registry"=>"ncbi_taxonomy"]))->where(["id"=> intval($tax["parent_id"])])->find();

            if (Utils::isDbNull($parent)) {
                $tax["parent"] = taxonomy_info::none;
            } else {
                $tax["parent"] = "<a href='/organism/{$parent["id"]}'>{$parent["taxname"]}</a>";
            }
        }

        $genome = (new Table(["cad_registry"=>"genomics"]))->where(["ncbi_taxid"=>$id])->find();

        if (!Utils::isDbNull($genome)) {
            $tax["db_xref"] = $genome["db_xref"];
            $tax["size"] = $genome["length"];
            $tax["def"] = $genome["def"];
        } else {
            $tax["db_xref"] = taxonomy_info::none;
            $tax["size"] = "NA";
            $tax["def"] = taxonomy_info::none;
        }

        return $tax;
    }
}