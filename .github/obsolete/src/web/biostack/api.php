<?php

include __DIR__ . "/../../framework/bootstrap.php";

class app {

    /**
     * 创建一个基因列表富集分析的后台任务
    */
    public function enrichment_task() {
        $orgID   = $_POST["org_id"];
        $orgName = $_POST["org_name"];
        $geneSet = $_POST["geneSet"];
        $user    = System::getUserInfo();
        $userID  = 0;

        # echo var_dump($user);

        //
        $appID = 100;

        if (!$user || !array_key_exists("id", $user)) {
            $userID = -1;
        } else {
            $userID = $user["id"];
        }

        $args = [
            "organism"     => $orgID,
            "organismName" => $orgName
        ];
        $task = [
            "user_id"     => $userID,
            "sha1"        => Utils::Now() . $appID . $userID,
            "project_id"  => -1,
            "app_id"      => $appID,
            "title"       => "GeneSet enrichment analysis for: " . $orgName,
            "create_time" => Utils::Now(),
            "status"      => 0,
            "note"        => "",
            "parameters"  => json_encode($args)
        ];

        $taskID    = (new Table("task"))->add($task);
        $workspace = "/data/upload/$userID/$appID/$taskID/";

        # save geneset list as text file into workspace
        $taskIDHash = md5(strval($taskID));    
        (new Table("task"))->where(["id" => $taskID])->save(["sha1" => $taskIDHash]);  

        $geneSet = implode("\n", $geneSet);
        $txt     = APP_PATH . $workspace . "geneSet.txt";
        $url     = "{<biostack>web/enrichment}&type=result&id=$taskIDHash";

        FileSystem::WriteAllText($txt, $geneSet);

        echo dotnet::successMsg(Router::AssignController($url));
    }

    public function enrichment_terms() {
        $task_id   = $_GET["id"];
        $workspace = taskMgr::GetTaskWorkspace($task_id);
        $csv       = APP_PATH . $workspace . "/enrichment[1].csv";

        echo file_get_contents($csv);
    }

    public function download() {
        $task_id   = $_GET["id"];
        $workspace = taskMgr::GetTaskWorkspace($task_id);
        $zip       = APP_PATH . $workspace . "/result.zip";

        Utils::PushDownload($zip, -1, "application/zip");
    }    

    public function customEnrichmentPlot() {
        $task_id   = $_GET["id"];
        $workspace = taskMgr::GetTaskWorkspace($task_id);
    }
}