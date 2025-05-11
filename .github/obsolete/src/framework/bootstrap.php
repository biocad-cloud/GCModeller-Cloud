<?php

define("APP_PATH", dirname(__DIR__));
define("WEB_ROOT", dirname(APP_PATH));
define("APP_DEBUG", true);

define("YEAR", date("Y"));

session_start();

include "/opt/runtime/package.php";
include "/opt/vendor/MaxMind/autoload.php";

include APP_PATH . "/framework/accessController.php";
include APP_PATH . "/framework/system.php";
include APP_PATH . "/framework/bioCAD.php";
include APP_PATH . "/framework/platform/repository.php";
include APP_PATH . "/framework/platform/taskMgr.php";

imports("System.Linq.Enumerable");
imports("System.Text.StringBuilder");
imports("Microsoft.VisualBasic.Conversion");
imports("Microsoft.VisualBasic.Strings");

imports("MVC.view");
imports("MVC.router");

View::Push("dismiss_banner", System::BannerDismissStatus());
View::Push("*", System::getUserInfo());

dotnet::AutoLoad(APP_PATH . "/.etc/config.php");
dotnet::HandleRequest(new app(), new accessController());
