<?php

class pathways {

    public static function list($page=1,$page_size = 20) {
        $offset = ($page -1) * $page_size;
        $sql = "SELECT 
        t1.xref_id, t1.name, t1.note, molecule.id, molecule.name as mol_name
    FROM
        (SELECT 
            *
        FROM
            cad_registry.pathway
        LIMIT {$offset} , {$page_size}) t1
            LEFT JOIN
        pathway_graph ON pathway_graph.pathway_id = t1.id
            LEFT JOIN
        molecule ON molecule.id = entity_id"
        ;
        $data = (new Table(["cad_registry"=>"pathway"]))->exec($sql, true);
        $data = Enumerable::GroupBy($data,"xref_id");
        $data = array_map(function($pwy) {
            $template = $pwy[0];
            $list = array_map(function($mol) {
                return "<a href='/molecule/{$mol["id"]}/'>{$mol["mol_name"]}</a>";
            }, $pwy);

            return [
                "xref_id" => $template["xref_id"],
                "name" => $template["name"],
                "note" => $template["note"],
                "molecules" => Strings::Join($list, ", ")
            ];
        }, $data);

        return $data;
    }
}