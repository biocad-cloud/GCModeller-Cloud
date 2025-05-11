<?php

include __DIR__ . "/../framework/bootstrap.php";

class App {

    /**
     * get motif sites by family
     * 
     * @uses api
     * @method GET
    */
    public function motif_sites_family($q) {
        $q = urldecode($q);
        $motifs = (new Table("motif_sites"))->where([
            "family" => $q
        ])->select([
            "gene_id","gene_name","loci","score","`seq` as `site`"
        ]);

        controller::success([
            "count" => count($motifs),
            "sites" => $motifs,
            "family" => $q
        ]);
    }

    /**
     * Export database id cross reference
     * 
     * @param string $src the external database name
    */
    public function gene_dblink($src, $page = 1, $page_size = 1000) {
        $tbl = new Table("dblinks");
        $term = (new Table("vocabulary"))->where(["hashcode" => registry_key($src)])->find();

        if (Utils::isDbNull($term)) {
            controller::error("The given data source could not be found in registry!");
        }

        $start = ($page - 1) * $page_size;
        $q = $tbl->left_join("molecules")
        ->on(["molecules" => "id", "dblinks" => "entity_id"])
        ->where([
            "entity_type" => 1,
            "db_src" => $term["id"] 
        ])
        ->limit($start, $page_size)
        ->select(["xref_id", "`molecule_id` as gene_id", "name", "`molecules`.`id` as biocad_id" ])
        ;

        controller::success([            
            "count" => count($q),
            "start" => $start,
            "has_next" => count($q) == $page_size,
            "query" => $q
        ], $tbl->getLastMySql());
    }
}