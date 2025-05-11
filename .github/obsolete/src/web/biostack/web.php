<?php

/**
 * Biostack webapp的html文件的文件夹相对路径
*/
define("WEB_APP", "../html/Application");
/**
 * 公共框架页面文件
*/
define("BOOTSTRAP", WEB_APP . "/analysis/bootstrap.html");

include __DIR__ . "/../../framework/bootstrap.php";

/**
 * 数据分析模块的用户界面
*/
class app {

    public function index() {

    }

    public function log2FC() {
        $vars           = System::getUserInfo();
		$vars["title"]  = "Expression FoldChange Analysis";       

		View::Display($vars);
    }

    public function volcano() {
        
    }

    public function bootstrap() {
        $vars           = System::getUserInfo();
        $loading        = Utils::ReadValue($_GET, "loading");
        
        if (empty($loading)) {
            Redirect("{index/biostack}");
            die;
        }

		$vars["title"]  = "Biostack Web Bootstrapping";        
        $vars["iframe"] = "{<biostack>web/$loading}"; 

		View::Show(BOOTSTRAP, $vars);
    }

    public function iTraq() {
        $vars           = System::getUserInfo();
		$vars["title"]  = "iTraq data";		
		
		View::Show(WEB_APP . "/proteomics/iTraq.html", $vars);
    }

    public function enrichment() {
        $type           = Utils::ReadValue($_GET, "type", "input");
        $task_ID        = Utils::ReadValue($_GET, "id", "");
        $vars           = System::getUserInfo();
		$vars["title"]  = "GeneSet Enrichment Analysis";        
        $vars["iframe"] = Router::AssignController("{<biostack>web/enrichment_$type}&id=$task_ID"); 

        if ($type == "result" && Strings::Len($task_ID) === 0) {
            dotnet::PageNotFound("No <strong>&lt;task ID></strong> is provided!");
        }

		View::Show(BOOTSTRAP, $vars);
    }

    public function enrichment_input() {
        View::Display();
    }

    public function enrichment_result() {
        $task_id = Utils::ReadValue($_GET, "id");
        $task    = null;

        if (!$task_id) {
            RFC7231Error::err404("No task ID provided!", false);
        } else {
            
            $task = (new Table("task"))
                ->where(["sha1" => $task_id])
                ->find();

            if (!$task) {
                $trace = StackTrace::GetCallStack();
		        $exc   = dotnetException::FormatOutput(
                    "No task could be found based on the <strong>taskID</strong> that you provided!", 
                    $trace
                );
                RFC7231Error::err500($exc, false);
            }
        }

        $organism = json_decode($task["parameters"]);
        $organism = $organism->organismName;
        $status   = taskMgr::$status[strval($task["status"])];
        $vars = [
            "title"       => $task["title"],
            "organism"    => $organism,
            "status_text" => $status,
            "taskID"      => $task_id
        ];

        if ($task["status"] == 200 || $task["status"] == 500) {
            View::Push("task_success", "true");
        } else {
            View::Push("task_success", "false");
        }

        View::Display($vars);
    }

    public function custom_enrichment_plot() {
        $type   = $_GET["type"];
        $taskID = $_GET["id"];
        
        View::Show(BOOTSTRAP, [
            "title"  => "Customize enrichment plot",
            "iframe" => "{<biostack>web/custom_enrichment_plot_page}&type=$type&id=$taskID"
        ]);
    }

    public function custom_enrichment_plot_page() {
        $type   = $_GET["type"];
        $taskID = $_GET["id"];

        View::Display([
            "taskID" => $taskID, 
            "type"   => $type
        ]);
    }

    
}