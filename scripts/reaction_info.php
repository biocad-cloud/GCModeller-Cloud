<?php

class reaction_info {

    public static function get_data($id) {
        $data = (new Table(["cad_registry"=>"reaction"]))->where(["id"=>$id])->find();
        $graph = (new Table(["cad_registry"=>"reaction_graph"]))
            ->left_join("molecule")
            ->on(["molecule"=>"id","reaction_graph"=>"molecule_id"])
            ->left_join("vocabulary")
            ->on(["vocabulary"=>"id","reaction_graph"=>"role"])
            ->where(["reaction"=>$id,"molecule_id" => gt("0")])
            ->select(["`molecule`.*","term"])
            ;
        $data["graph"] = $graph;
        $data["enzyme"] = (new Table(["cad_registry"=>"regulation_graph"]))
            ->where(["reaction_id"=>$id])
            ->distinct()
            ->project("term")
            ;
        $data["enzyme"] = Strings::Join(array_map(function($ec) {
            return "<a href='/enzyme/{$ec}'>{$ec}</a>";
        }, $data["enzyme"]), ", ");

        return $data;
    }
}