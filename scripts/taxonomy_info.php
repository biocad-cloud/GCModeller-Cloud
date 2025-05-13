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

        return $tax;
    }
}