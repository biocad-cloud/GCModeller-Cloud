<?php

# the background task host commandline script

/**
 * application root dir
*/
define("APP_PATH", dirname(__DIR__));
define("BACKGROUND", __DIR__ . "/background.php");
define("TASK", "php " . BACKGROUND);

# 1. reset the unfinished task status
# 2. and then run the background task script based on the app id
require APP_PATH . "/framework/php.NET/package.php";

imports("Microsoft.VisualBasic.CommandLine.CommandLineParser");
imports("Microsoft.VisualBasic.FileIO.FileSystem");

# php ./taskhost.php --app_id=xxx --interval=1 --signal="signal.txt"
$args = CommandLineParser::ParseCLIArgvs();

$app_id   = $args->getArgumentValue("app_id", NULL);
$signal   = $args->getArgumentValue("signal", "/tmp/biocad_signals.txt");
$interval = $args->getArgumentValue("interval", 1);

console::log("View of the commandline argument inputs:");
console::dump($args);
console::log("send_signal_off: $signal");
console::log("Taskhost loop interval: $interval");

FileSystem::WriteAllText($signal, "on");

while (file_exists($signal) && (file_get_contents($signal) != "off")) {
    console::log("Create task [" . TASK . "] with interval $interval");
    console::log("You could shutdown this task host by send shutdown signal to file: $signal");

    if (Utils::isDbNull($app_id)) {
        system(TASK);
    } else {
        system(TASK . " --app_id $app_id");
    }
    
    sleep($interval);
}