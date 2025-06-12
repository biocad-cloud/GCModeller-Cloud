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
        $ec_id = (new Table(["cad_registry"=>"vocabulary"]))->where(["term"=>"EC"])->findfield("id");
        $prots_sql = "SELECT 
        molecule.id,
        molecule.name,
        MIN(molecule.note) AS note,
        GROUP_CONCAT(DISTINCT xref
            SEPARATOR '; ') AS ec
    FROM
        cad_registry.molecule
            LEFT JOIN
        molecule prot ON prot.parent = molecule.id
            LEFT JOIN
        db_xrefs ON db_xrefs.obj_id = prot.id
            AND db_key = $ec_id
    WHERE
        molecule.tax_id = $id
            AND molecule.type = 210
    GROUP BY molecule.id , molecule.name
    ORDER BY ec DESC"
        ;
        $tax["prots"] = (new Table(["cad_registry"=>"molecule"]))
            ->getDriver()
            ->Fetch($prots_sql);

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