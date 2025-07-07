<?php

class index_page {

    public static function index_info() {
        # $mols = (new Table(["cad_registry"=>"molecule"]))->count();
        $mols = "&gt; 1M ";
        $laws = "&gt; 35K";

        return [
            "mols"=>$mols,
            "laws"=>$laws
        ];
    }
}