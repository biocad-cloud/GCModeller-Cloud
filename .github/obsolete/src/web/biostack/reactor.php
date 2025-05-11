<?php

include __DIR__ . "/../../framework/bootstrap.php";

class app {

    /**
     * Create a task that run the dynamics model
     * 
     * @method POST
    */
    public function run($id) {    
        $app = TaskMgr::getApp("Systems_Dynamics");
        $app_id = $app["id"];     
        # 尽量不要再数据库中存储太多冗余信息   
        $args = [
            "resolution" => 10000,
            "model" => $id,
            "version" => DataRepository::getModelData($id)["current_version"]
        ];
        $id = TaskMgr::addTask($app_id, "Run Systems Dynamics", $args);

        if (Utils::isDbNull($id)) {
            controller::error("database error!",1, TaskMgr::getTaskMgr()->task->getLastMySql());
        } else {
            controller::success($id);
        }
    }
}