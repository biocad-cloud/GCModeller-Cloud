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
        } else {
            $mol["reaction"] = [];
        }

        return $mol;
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

        return array_map(function($rxn) use ($index_graph) {
            $rid = "R{$rxn["id"]}";
            $eq = $index_graph[$rid];

            if (!Utils::isDbNull($eq)) {
                $rxn["equation"] = $eq;
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