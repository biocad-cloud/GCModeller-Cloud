<?php

include __DIR__ . "/../../framework/bootstrap.php";

class app {

    public function enrichment() {
        $task_id   = $_GET["id"];
        $workspace = taskMgr::GetTaskWorkspace($task_id);
        $fileName  = ($_GET["type"] == "kegg") ? "KEGG" : "GO_terms";
        $png       = APP_PATH . "/$workspace/$fileName.png";

        Utils::PushDownload($png, -1, "image/png");
    }
}
