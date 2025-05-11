<?php

include __DIR__ . "/../framework/bootstrap.php";

/**
 * Data analysis task manager
*/
class app {

    /**
     * Fetch current task list
     * 
     * @uses api
    */
    public function fetch($page = 1, $page_size = 5) {
        $data  = TaskMgr::getTaskList($page, $page_size);
        $debug = TaskMgr::getLastMySql();

        controller::success($data, $debug);
    }

    /**
     * Load data result table file
     * 
     * @param string $guid the task guid
     * 
     * @uses file
     * @require guid=string
    */
    public function loadPLAS($guid) {
        $dir  = TaskMgr::getTaskWorkDir($guid);
        $file = "$dir/PLAS.csv";
        
        if (file_exists($file)) {
            Utils::PushDownload($file);
        } else {
            dotnet::PageNotFound(RESULT_FILE_ACCESS_ERROR);
        }
    }
    
    /**
     * View report
     * 
     * @param string $q the task guid
     * @uses view
     * @require q=string
    */
    public function report($q) {
        $args = TaskMgr::getTaskArguments($q);
        $guid = $args["model"];
        $ver = $args["version"];
        $url = "/biostack/pathway_design/load?model_id=$guid&version=$ver";

        View::Display([
            "model_id" => $q,
            "graph" => $url,
            "args" => $args
        ]);
    }

    /**
     * @uses file
     * @require q=string
    */
    public function report_pdf($q) {
        $dir  = TaskMgr::getTaskWorkDir($q);
        $file = "$dir/report.pdf";
        
        if (file_exists($file)) {
            Utils::PushDownload($file);
        } else {
            dotnet::PageNotFound(RESULT_FILE_ACCESS_ERROR);
        }
    }

    /**
     * @uses view
     * @require q=string
    */
    public function report_view($q) {
        View::Display([
            "guid" => $q
        ]);
    }

    public function pdf_viewer($q, $load) {
        if ($load == "js") {
            $url = "/task/report/pdf?q=$q";
            $js = APP_PATH . "/web/resources/vendor/pdfjs-2.12.313-dist/web/viewer.js";
            $js = file_get_contents($js);
            $str = str_replace('{$pdf_url}', $url, $js);
        } else {
            $html = APP_PATH . "/web/resources/vendor/pdfjs-2.12.313-dist/web/viewer.html"; 
            $html = file_get_contents($html);
            $str = str_replace('{$model_id}', $q, $html);
        }
        
        echo $str;
    }
}