<?php

# rename this file to config.php to run this website
define("mysql_host", "192.168.3.15");
define("mysql_port", 3306);
define("mysql_user", "xieguigang");
define("mysql_passwd", "123456");

// 网站的配置数据
return [
    'DB_TYPE' => 'mysql',
    'DB_HOST' => mysql_host,
    'DB_NAME' => 'cella_lab',
    'DB_USER' =>  mysql_user,
    'DB_PWD'  => mysql_passwd,
    'DB_PORT' => mysql_port,
    
    'cad_registry' => [
        'DB_TYPE' => 'mysql',
        'DB_HOST' => mysql_host,
        'DB_NAME' => 'cad_registry',
        'DB_USER' =>  mysql_user,
        'DB_PWD'  => mysql_passwd,
        'DB_PORT' => mysql_port
    ],

    'cella_lab' => [
        'DB_TYPE' => 'mysql',
        'DB_HOST' => mysql_host,
        'DB_NAME' => 'cella_lab',
        'DB_USER' =>  mysql_user,
        'DB_PWD'  => mysql_passwd,
        'DB_PORT' => mysql_port
    ],

    //密钥
    "AUTHCODE" => 'A2f0qS78ttR9HpqeOT',
    //cookies
    "COOKIE_PREFIX"       => '8FSUix_',
    "ERR_HANDLER_DISABLE" => "FALSE",
    "MAXMIND_GEOIP" => "/usr/local/share/GeoIP/GeoLite2-City.mmdb",

    // 自定义http错误页面的位置，例如404 500 403等
    "RFC7231"       => APP_PATH . "/views/http_errors/",
    "CACHE"         => false,
    "APP_NAME"      => "bioCAD",
	"APP_VERSION"   => "0.222.58-alpha",
    "MVC_VIEW_ROOT" => [        
        "index"          => APP_PATH . "/views/"        
    ]
];