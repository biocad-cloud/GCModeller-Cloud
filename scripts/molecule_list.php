<?php

class molecule_list {

    static $type_id = [
        "nucl" => 210,
        "prot" => 212,
        "meta" => 213 
    ];

    public static function browse_type($type, $page,$page_size=100) {
        $offset = ($page -1) * $page_size;
        $truncate_note = 120;
        $type_id = self::$type_id[strtolower($type)];

        if (Utils::isDbNull($type_id)) {
            RFC7231Error::err400("invalid molecule type filter string, value should be one of the: nucl/prot/meta!");
        }

        $data = (new Table(["cad_registry"=>"molecule"]))
            ->left_join("vocabulary")
            ->on(["vocabulary"=>"id","molecule"=>"type"])
            ->left_join("ncbi_taxonomy")
            ->on(["ncbi_taxonomy"=>"id","molecule"=>"tax_id"])
            ->where(["`molecule`.type" => $type_id])
            ->limit($offset,$page_size)
            ->select([
                "`molecule`.id",
                "name",
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

        return $data;
    }

    public static function browse_list($page,$page_size=100) {
        $offset = ($page -1) * $page_size;
        $truncate_note = 120;
        $data = (new Table(["cad_registry"=>"molecule"]))
            ->left_join("vocabulary")
            ->on(["vocabulary"=>"id","molecule"=>"type"])
            ->left_join("ncbi_taxonomy")
            ->on(["ncbi_taxonomy"=>"id","molecule"=>"tax_id"])
            ->limit($offset,$page_size)
            ->select([
                "CONCAT('BioCAD', LPAD(molecule.id, 11, '0')) AS cad_id",
                "`molecule`.id",
                "name",
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