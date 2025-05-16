<?php 

class search_tool {

    public static function get_result($q) {
        $q = str_replace("'", "", $q);
        $sql = "SELECT 
                molecule.id,
                name,
                ROUND(mass, 4) AS mass,
                formula,
                molecule.note,
                term AS type,
                MATCH (name , molecule.note) AGAINST ('$q' IN BOOLEAN MODE) as score
            FROM
                cad_registry.molecule
                    LEFT JOIN
                vocabulary ON vocabulary.id = type
            WHERE
                MATCH (name , molecule.note) AGAINST ('$q' IN BOOLEAN MODE)
            order by score desc
            limit 100"
        ;
        $mols = (new Table(["cad_registry"=>"molecule"]))->exec($sql, true);
        $sql = "SELECT 
                *
            FROM
                cad_registry.reaction
            WHERE
                MATCH (name , note) AGAINST ('$q' IN BOOLEAN MODE)
            ORDER BY MATCH (name , note) AGAINST ('$q' IN BOOLEAN MODE) DESC
            LIMIT 100";
        $rxns = (new Table(["cad_registry"=>"reaction"]))->exec($sql, true);

        return [
            "mol" => $mols,
            "rxn" => $rxns 
        ];
    }
}