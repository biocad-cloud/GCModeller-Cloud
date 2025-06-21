<?php

include dirname(__DIR__) . "/etc/bootstrap.php";

class App {

    /**
     * @access *
     * @uses api
    */
    public function kinetics_data($id) {
        include_once APP_PATH . "/scripts/kinetics_law.php";

        $id = urldecode($id);
        $id = explode("+",$id);
        $data = kinetics_law::kinetics_data($id);

        controller::success($data);
    }
}