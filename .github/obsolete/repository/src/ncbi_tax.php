<?php

include __DIR__ . "/../framework/bootstrap.php";

class App {

    /**
     * add a new ncbi taxonomy node into tree
     * 
     * @uses api
     * @method POST
    */
    public function add($taxid, $name, $rank, $parent, $nchilds) {
        imports("Microsoft.VisualBasic.Strings");

        $ncbi_tax = new Table("ncbi_taxonomy_tree");
        $terms = new Table("vocabulary");
        $taxid = strip_postVal($taxid);
        $name = urldecode(strip_postVal($name));
        $rank = urldecode(strip_postVal($rank));
        $parent = strip_postVal($parent);
        $nchilds = strip_postVal($nchilds);

        if (Utils::isDbNull($rank) || Strings::Empty($rank) || $rank == "" || strlen($rank) == 0) {
            $rank = "no rank";
        }
        if ($nchilds == '') {
            $nchilds = "0";
        }
        if ($taxid == '') {
            $taxid = "0";
        }
        if ($parent == '') {
            $parent = "0";
        }

        $rank_term = $terms->where(["hashcode" => registry_key($rank)])->find();

        if (Utils::isDbNull($rank_term)) {
            $rank_term = $terms->add([
                "term" => $rank,
                "hashcode" => registry_key($rank),
                "category" => "Category Term",
                "description" => "Imported from ncbi taxonomy dump file"
            ]);
        } else {
            $rank_term = $rank_term["id"];
        }

        $ncbi_tax->add([
            "id" => $taxid,
            "name" => $name,
            "rank" => $rank_term,
            "parent" => $parent,
            "n_childs" => $nchilds
        ]);

        controller::success(1);
    }

    /**
     * get taxonomy lineage
     * 
     * @uses api
    */
    public function lineage($taxid) {
        $ncbi_tax = new Table("ncbi_taxonomy_tree");
        $list = [];

        for($i = 0; $i < 100000; $i++) {
            $tax = $ncbi_tax
            ->left_join("vocabulary")
            ->on(["vocabulary" => "id", "ncbi_taxonomy_tree" => "rank"])
            ->where(["`ncbi_taxonomy_tree`.`id`" => $taxid])
            ->find(["`ncbi_taxonomy_tree`.*", "`term` as `rank_name`"])
            ;

            if (Utils::isDbNull($tax)) {
                break;
            } else {
                array_push($list, $tax);
            }

            if ($tax["parent"] == 0) {
                break;
            } else {
                $taxid = $tax["parent"];
            }
        }

        controller::success($list);
    }
}