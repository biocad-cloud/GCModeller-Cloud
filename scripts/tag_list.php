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
            ->select([
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

        return $tagdata;
    }
}