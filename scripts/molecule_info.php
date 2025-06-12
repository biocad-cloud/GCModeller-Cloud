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

        if ($mol["type"] == "Metabolite") {
            $mol["reaction"] = self::load_reaction_net($id);
            $mol["odor"] = self::odor_list($id);
            $mol["odor_display"] = "block";
            $mol["relates"] = [];
        } else {
            $mol["reaction"] = [];
            $mol["odor"] = [];
            $mol["odor_display"] = "none";
            $mol["relates"] = self::related_mols($mol["name"]);
        }

        $mol["db_xref"] = self::load_db_xrefs($id);
        $mol["synonym"] = self::synonym_list($id);

        return $mol;
    }

    public static function related_mols($name) {
        return (new Table(["cad_registry"=>"molecule"]))
            ->left_join("ncbi_taxonomy")
            ->on(["ncbi_taxonomy"=>"id","molecule"=>"tax_id"])
            ->where(["name"=>$name])
            ->order_by("tax_id")
            ->select(["`molecule`.id", "name", "tax_id", "note", "taxname"])
            ;
    }

    public static function synonym_list($id) {
        return (new Table(["cad_registry"=>"synonym"]))
            ->where(["obj_id"=>$id])
            ->group_by("lang")
            ->select(["lang",
            "GROUP_CONCAT(DISTINCT synonym SEPARATOR ';&nbsp;') AS `names`"])
            ;
    }

    public static function odor_list($id) {
        return (new Table(["cad_registry"=>"odor"]))
            ->left_join("vocabulary")
            ->on(["vocabulary"=>"id","odor"=>"category"])
            ->where(["molecule_id"=>$id])
            ->group_by("term")
            ->select([
                "term",
                "GROUP_CONCAT(DISTINCT CONCAT('<a href=\"/odor/',
        odor,
        '\">',
        odor,
        '</a>') SEPARATOR '; ') as odor"]);
    }

    public static function load_db_xrefs($id) {
        $list = (new Table(["cad_registry"=>"db_xrefs"]))
            ->left_join("vocabulary")
            ->on(["vocabulary"=>"id","db_xrefs"=>"db_key"])
            ->where(["obj_id"=>$id])
            ->group_by("term")
            ->select([
                "`term` as db",
                "CONCAT('[\"',
                GROUP_CONCAT(DISTINCT `xref`
                    SEPARATOR '\",\"'),
                '\"]') AS `xref`"])
            ;

        for($i=0;$i<count($list);$i++) {
            $link = $list[$i];
            $link["xref"] = Strings::Join( json_decode($link["xref"]), ",&nbsp;");
            $list[$i] = $link;
        }

        return $list;
    }

    public static function load_reaction_net($id) {
        $net = (new Table(["cad_registry"=>"reaction_graph"]))
            ->left_join("reaction")
            ->on(["reaction"=>"id","reaction_graph"=>"reaction"])
            ->where(["molecule_id"=>$id])
            ->distinct()
            ->order_by("name")
            ->select(["`reaction`.id", "name", "equation", "`reaction`.note"])
            ;
        $rid = array_column($net, "id");
        $graph = (new Table(["cad_registry"=>"reaction_graph"]))
            ->left_join("molecule")
            ->on(["molecule"=>"id","reaction_graph"=>"molecule_id"])
            ->where(["reaction" => in($rid),"molecule_id" => gt("0")])
            ->group_by("reaction")
            ->select(["reaction","JSON_ARRAYAGG(JSON_OBJECT('mol_id',
            molecule_id,
            'role',
            `role`,
            'factor',
            factor,
            'name',
            name)) AS graph"])
            ;
        $regs = (new Table(["cad_registry"=>"regulation_graph"]))
            ->where(["reaction_id"=> in($rid)])
            ->group_by("reaction_id")
            ->select(["concat('R',reaction_id) as `rid`", "JSON_ARRAYAGG(`term`) as reg"], "rid")
        ;
        $graph = array_map(function($r) {
            $r["graph"] = json_decode($r["graph"], true);
            return $r;
        }, $graph);
        $index_graph = [];
        $left = (new Table(["cad_registry"=>"vocabulary"]))->where(["category"=>"Compound Role","term"=>"substrate"])->findfield("id");
        $right = (new Table(["cad_registry"=>"vocabulary"]))->where(["category"=>"Compound Role","term"=>"product"])->findfield("id");

        foreach($graph as $g) {            
            $left_set = self::buildMolListSet($g["graph"], $left);
            $right_set = self::buildMolListSet($g["graph"], $right);
            $eq = "{$left_set} &lt;=&gt; {$right_set}";
            $index_graph["R{$g["reaction"]}"] = $eq;
        }

        return array_map(function($rxn) use ($index_graph, $regs) {
            $rid = "R{$rxn["id"]}";
            $eq = $index_graph[$rid];

            if (!Utils::isDbNull($eq)) {
                $rxn["equation"] = $eq;
            }
            if (array_key_exists($rid, $regs)) {
                $ec = json_decode($regs[$rid]["reg"]);
                $ec = array_map(function($id) {
                    return "<a href='/enzyme/{$id}'>{$id}</a>";
                }, $ec);
                $rxn["enzyme"] = Strings::Join($ec, ", ");
            } else {
                $rxn["enzyme"] = "-";
            }

            return $rxn;
        }, $net);
    }

    private static function buildMolListSet($set, $role) {
        $set = array_filter($set, function($c) use ($role) {
            return $c["role"] == $role;
        });
        $set = array_map(function($c) {
            return "<a href='/molecule/{$c["mol_id"]}'>{$c["name"]}</a>";
        }, $set);

        return Strings::Join($set, " + ");
    }
}