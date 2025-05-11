<?php

return [

    'DB_TYPE' => 'mysql',
    'DB_HOST' => '192.168.3.27',
    'DB_NAME' => 'cad_registry',
    'DB_USER' => 'biocad',
    'DB_PWD'  => '12345',
    'DB_PORT' => '3306',

    "ERR_HANDLER_DISABLE" => "FALSE",
	"RFC7231"       => __DIR__ . "/../views/http_errors/",
    "CACHE" => FALSE,
    "CACHE.MINIFY" => FALSE,
    "APP_NAME" => "git_viewer",
    "APP_TITLE" => "GCModeller git repository",
    "APP_VERSION" => "2.3.111.13-alpha",
	"MVC_VIEW_ROOT" => [
        "index" => __DIR__ . "/../views/"
    ]
];