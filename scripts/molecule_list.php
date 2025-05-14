<?php

class molecule_list {

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
}