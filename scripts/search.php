<?php 

class search_tool {

    private static function text_sql($q) {
        return "SELECT 
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
        limit 100";
    }

    private static function xref_sql($q) {
        return "SELECT 
            molecule.id,
            name,
            ROUND(mass, 4) AS mass,
            formula,
            molecule.note,
            term AS type,
            1000 AS score
        FROM
            cad_registry.molecule
                LEFT JOIN
            vocabulary ON vocabulary.id = type
        WHERE
            molecule.id IN (SELECT 
                    obj_id
                FROM
                    db_xrefs
                WHERE
                    xref = '$q')";
    }

    private static function name_sql($q) {
        return "SELECT 
            molecule.id,
            name,
            ROUND(mass, 4) AS mass,
            formula,
            molecule.note,
            term AS type,
            MATCH (synonym) AGAINST ('$q' IN BOOLEAN MODE) AS score
        FROM
            cad_registry.synonym
                LEFT JOIN
            molecule ON molecule.id = obj_id
                LEFT JOIN
            vocabulary ON vocabulary.id = type
        WHERE
            MATCH (synonym) AGAINST ('$q' IN BOOLEAN MODE)
        ORDER BY score DESC
        LIMIT 100";
    }

    public static function get_result($q) {
        $q = str_replace("'", "", $q);
        $q1 = self::text_sql($q);
        $q2 = self::xref_sql($q);
        $q3 = self::name_sql($q);
        $sql = "SELECT id,
                    MIN(name) AS name,
                    MIN(mass) AS mass,
                    MIN(formula) AS formula,
                    MIN(note) AS note,
                    MIN(type) AS type,
                    SUM(score) AS score 
                FROM (($q1) UNION ($q2) UNION ($q3)) t1 
                GROUP BY id
                ORDER BY score DESC
                LIMIT 100"
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