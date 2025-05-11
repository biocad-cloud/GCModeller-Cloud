<?php

include __DIR__ . "/../framework/bootstrap.php";

/**
 * pull data from registry
*/
class app {

    /**
     * get taxonomic group data
     * 
     * @param string $id the specific taxonomic group id, default null 
     *    means pull all taxonomic group entries.
     * 
     * @uses api
    */
    public function taxonomic_group($id = null) {
        $tax = new Table("taxonomic");

        if (Utils::isDbNull($id)) {
            // pull all
            controller::success($tax->all());
        } else {
            $load = $tax->left_join("genomes")
                ->on(["genomes" => "taxonomic_group", "taxonomic" => "id"])
                ->where(["`taxonomic`.`id`" => $id])
                ->select([
                    "`genomes`.*", "`taxonomic`.`name` as `group`"
                ])
                ;

            controller::success($load, $tax->getLastMySql());
        }
    }

    /**
     * get all avaliable motif sites family
     * 
     * @uses api
     * @method GET
    */
    public function motif_site_family($genome = null) {
        $motifs = new Table("motif_sites");

        if (Utils::isDbNull($genome)) {
            controller::success($motifs
            ->where(["family" => not_eq("")])
            ->group_by("family")
            ->select(["family", "count(*) as nsize"]));
        } else {
            controller::success($motifs
            ->where(["family" => not_eq(""), "genome_id" => $genome])
            ->group_by("family")
            ->select(["family", "count(*) as nsize"]));
        }        
    }
}