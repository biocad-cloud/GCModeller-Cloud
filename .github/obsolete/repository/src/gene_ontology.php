<?php

include __DIR__ . "/../framework/bootstrap.php";

class App {

    /**
     * add a new gene ontology term into registry
     * 
     * @method POST
    */
    public function add($id, $name, $namespace, $is_a, $xref, $def, $synonym, $is_obsolete) {
        $go = new Table("gene_ontology");
        $dag = new Table("go_dag");
        $id = strip_postVal($id);
        $find = $go->where(["id" => $id])->find();
        $is_obsolete = Conversion::CBool(strip_postVal($is_obsolete));

        if (Utils::isDbNull($find)) {
            $go->add([
                "id" => $id,
                "name" => strip_postVal($name),
                "namespace" => strip_postVal($namespace),
                "def" => strip_postVal($def),
                "is_obsolete" => $is_obsolete ? 1 : 0
            ]);
        }

        if (is_string($is_a)) {
            $is_a = json_decode($is_a, true);
        }

        if ($is_a["count"] > 0) {
            if ($is_a["count"] == 1) {             
                $dag->add([
                    "term_id" => $id,
                    "go_term" => $is_a["data"],
                    "relationship" => 1
                ]);
            } else {
                foreach($is_a["data"] as $term) {
                    $dag->add([
                        "term_id" => $id,
                        "go_term" => $term,
                        "relationship" => 1
                    ]);
                }
            }
        }

        controller::success(0);
    }
}