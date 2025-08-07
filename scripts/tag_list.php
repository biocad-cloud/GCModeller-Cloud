<?php

class tagdata {

    public static function list($id,$page,$page_size=100) {
        $truncate_note = 120;
        $offset = ($page -1) * $page_size;
        $tagdata = (new Table(["cad_registry"=>"vocabulary"]))->where(["id"=>$id])->find();
        $tagdata["page"] = (new Table(["cad_registry"=>"molecule_tags"]))
            ->left_join("molecule")
            ->on(["molecule"=>"id","molecule_tags"=>"molecule_id"])
            ->left_join("vocabulary")
            ->on(["vocabulary"=>"id","molecule"=>"type"])
            ->left_join("ncbi_taxonomy")
            ->on(["ncbi_taxonomy"=>"id","molecule"=>"tax_id"])
            ->where(["`molecule_tags`.tag_id" => $id])
            ->limit($offset,$page_size)
            ->distinct()
            ->select([
                "CONCAT('BioCAD', LPAD(molecule.id, 11, '0')) AS cad_id",
                "`molecule`.id",
                "`molecule`.name",
                "`vocabulary`.term as type",
                "CASE 
                    WHEN LENGTH(`molecule`.note) > $truncate_note THEN CONCAT(LEFT(`molecule`.note, $truncate_note), '...')
                    ELSE `molecule`.note
                END AS note",
                "formula",
                "round(mass,4) as mass",
                "CASE 
                    WHEN LENGTH(ncbi_taxonomy.taxname) > 0 THEN CONCAT('<a href=\"/organism/',tax_id,'/\">', ncbi_taxonomy.taxname, '</a>')
                    ELSE 'Unknown'
                END AS organism",
                "tax_id"
            ])
            ;

        return self::add_tags($tagdata);
    }

    public static function add_tags($data) {
        $id = Strings::Join(array_column($data,"id"), ",");
        $tags = "SELECT 
        CONCAT('BioCAD', LPAD(molecule_id, 11, '0')) AS cad_id,
        molecule_id,
        GROUP_CONCAT(tag) as tags
    FROM
        (SELECT DISTINCT
            molecule_id, CONCAT(' <a href=\"/tag/', tag_id, '\">', term, '</a>') AS tag
        FROM
            cad_registry.molecule_tags
        LEFT JOIN vocabulary ON tag_id = vocabulary.id
        WHERE
            molecule_id IN ({$id})
        LIMIT 1000) t1
    GROUP BY molecule_id";
        $tags = (new Table(["cad_registry"=>"molecule_tags"]))->exec($tags, true);
        $tags = Table::asKeyTable($tags, "cad_id");

        for($i = 0; $i < count($data); $i++) {
            $mol = $data[$i];
            $taglist = Utils::ReadValue( $tags, $mol["cad_id"], ["tags"=>""]);
            $mol["tags"] = $taglist["tags"];
            $data[$i] = $mol;
        }

        return $data;
    }
}