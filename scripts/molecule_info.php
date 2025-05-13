<?php

class molecule_info {

    public const none = "<span style='color: gray;'>None</span>";

    public static function get_info($id) {
        $mol = (new Table(["cad_registry"=>"molecule"]))
            ->left_join("vocabulary")
            ->on([
                "vocabulary"=>"id",
                "molecule"=>"type"
            ])
            ->where(["`molecule`.id"=>$id])
            ->find(["`molecule`.id",
                "term as type",
                "color",
                "name",
                "round(mass,4) as mass",
                "formula",
                "parent",
                "tax_id",
                "`molecule`.note"])
            ;

        if (Utils::isDbNull($mol)) {
            return null;
        } else {
            if ($mol["tax_id"] > 0) {
                $tax = (new Table(["cad_registry" => "ncbi_taxonomy"]))->where(["id"=>$mol["tax_id"]])->find();
                $mol["organism"] = "<a href='/organism/{$tax["id"]}'>{$tax["taxname"]}</a>";
            } else {
                $mol["organism"] = molecule_info::none;
            }

            if ($mol["parent"] > 0) {
                $parent = (new Table(["cad_registry" => "molecule"]))->where(["id"=>$mol["parent"]])->find();

                if (Utils::isDbNull($parent)) {
                    $mol["parent"] = molecule_info::none;
                } else {
                    $mol["parent"] = "<a href='/molecule/{$parent["id"]}'>{$parent["name"]}</a>";
                }
            } else {
                $mol["parent"] = molecule_info::none;
            }
        }

        return $mol;
    }
}