<?php

/**
 * application root dir
*/
define("APP_PATH", dirname(__DIR__));
define("APP_DEBUG", TRUE);
define("WEB_ROOT", APP_PATH . "/src");

# run the background task script based on the app_id
require APP_PATH . "/framework/php.NET/package.php";

imports("Microsoft.VisualBasic.CommandLine.CommandLineParser");
imports("Microsoft.VisualBasic.FileIO.FileSystem");
imports("php.docker.Docker");
imports("MVC.model");

dotnet::AutoLoad(WEB_ROOT . "/.etc/config.php");

# php ./taskhost.php --app_id=xxx --interval=1 --signal="signal.txt"
$args    = CommandLineParser::ParseCLIArgvs();
$app_id  = $args->getArgumentValue("app_id", NULL);
$taskMgr = new Table("task");
$filter  = ["status" => 0];

# check for status = 0 // pending status
if (!Utils::isDbNull($app_id)) {
    $filter["app_id"] = $app_id;
}

$pending = $taskMgr
    ->left_join("analysis_app")
    ->on([
        "analysis_app" => "id",
        "task" => "app_id"
    ])
    ->where($filter)
    ->find();

console::log("query for pending task:");
console::log($taskMgr->getLastMySql());

if (Utils::isDbNull($pending)) {
    console::log("~job done!");
    exit(0);
}

$R = $pending["app_path"];
$args = $pending["parameters"];
$commandline = "Rscript $R --args $args --guid {$pending["sha1"]}";
$volumn = [
    "Rscript" => ["host" => dirname($R), "virtual" => dirname($R)],
    "mnt"     => ["host" => "/mnt", "virtual" => "/mnt"],
    "tmp"     => ["host" => "/tmp", "virtual" => "/tmp"]
];

# task status will be updated in rscript.
docker::run("dotnet::gcmodeller_v5.23.2", $commandline, "/mnt", $volumn);

console::log("~job done!");