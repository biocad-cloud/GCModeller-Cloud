<?php

# rename this file to config.php to run this website

// 网站的配置数据
return [
    'DB_TYPE' => 'mysql',
    'DB_HOST' => '192.168.3.15',
    'DB_NAME' => 'cad_registry',
    'DB_USER' => 'xieguigang',
    'DB_PWD'  => '123456',
    'DB_PORT' => '3306',
    
    'cad_registry' => [
        'DB_TYPE' => 'mysql',
        'DB_HOST' => '192.168.3.15',
        'DB_NAME' => 'cad_registry',
        'DB_USER' => 'xieguigang',
        'DB_PWD'  => '123456',
        'DB_PORT' => '3306'
    ],

    'cad_lab' => [
        'DB_TYPE' => 'mysql',
        'DB_HOST' => '192.168.3.15',
        'DB_NAME' => 'cad_lab',
        'DB_USER' => 'xieguigang',
        'DB_PWD'  => '123456',
        'DB_PORT' => '3306'
    ],

    //密钥
    "AUTHCODE" => 'A2f0qS78ttR9HpqeOT',
    //cookies
    "COOKIE_PREFIX"       => '8FSUix_',
    "ERR_HANDLER_DISABLE" => "FALSE",
    "MAXMIND_GEOIP" => "/usr/local/share/GeoIP/GeoLite2-City.mmdb",

    // 自定义http错误页面的位置，例如404 500 403等
    "RFC7231"       => APP_PATH . "/views/http_errors/",
    "CACHE"         => True,
    "APP_NAME"      => "bioCAD",
	"APP_VERSION"   => "0.222.58-alpha",
    "MVC_VIEW_ROOT" => [        
        "index"          => APP_PATH . "/views/"        
    ]
];