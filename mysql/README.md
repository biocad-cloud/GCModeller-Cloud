# MySql Development Docs #

MySql database field attributes notes in this development document:

> + **AI**: Auto Increment;
> + **B**:  Binary;
> + **G**:  Generated
> + **NN**: Not Null;
> + **PK**: Primary Key;
> + **UQ**: Unique;
> + **UN**: Unsigned;
> + **ZF**: Zero Fill

Generate time: 4/6/2018 2:21:49 PM<br />
By: ``mysqli.vb`` reflector tool ([https://github.com/xieguigang/mysqli.vb](https://github.com/xieguigang/mysqli.vb))

<div style="page-break-after: always;"></div>

***

## accept_file_type



|field|type|attributes|description|
|-----|----|----------|-----------|
|id|Int64 (11)|``AI``, ``NN``, ``PK``||
|app_id|Int64 (11)|``NN``||
|content_type|Int64 (11)|``NN``||
|note|Text ()|||

```SQL
CREATE TABLE `accept_file_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_id` int(11) NOT NULL,
  `content_type` int(11) NOT NULL,
  `note` mediumtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```


<div style="page-break-after: always;"></div>

***

## analysis



|field|type|attributes|description|
|-----|----|----------|-----------|
|id|Int64 (11)|``AI``, ``NN``, ``PK``||
|app|Int64 (11)|``NN``||
|main_file|Int64 (11)|``NN``|如果分析只需要一个文件，那么就使用这个属性来储存|
|files|Text ()|``NN``|分析文件的id编号的数组的json字符串|
|project|Int64 (11)|``NN``||
|user_id|Int64 (11)|``NN``||
|parameters|Text ()|``NN``|分析用的参数json|
|create_time|DateTime ()|``NN``||
|update_time|DateTime ()|``NN``||

```SQL
CREATE TABLE `analysis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` int(11) NOT NULL,
  `main_file` int(11) NOT NULL COMMENT '如果分析只需要一个文件，那么就使用这个属性来储存',
  `files` tinytext NOT NULL COMMENT '分析文件的id编号的数组的json字符串',
  `project` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `parameters` longtext NOT NULL COMMENT '分析用的参数json',
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```


<div style="page-break-after: always;"></div>

***

## analysis_app



|field|type|attributes|description|
|-----|----|----------|-----------|
|id|Int64 (11)|``AI``, ``NN``, ``PK``||
|description|Text ()|``NN``||
|project_type|Int64 (11)|``NN``||
|update_time|DateTime ()|``NN``||

```SQL
CREATE TABLE `analysis_app` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` mediumtext NOT NULL,
  `project_type` int(11) NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```


<div style="page-break-after: always;"></div>

***

## content_types



|field|type|attributes|description|
|-----|----|----------|-----------|
|id|Int64 (11)|``AI``, ``NN``, ``PK``||
|suffix|VarChar (16)|``NN``||
|content_type|VarChar (128)|``NN``||
|description|Text ()|||

```SQL
CREATE TABLE `content_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `suffix` varchar(16) NOT NULL,
  `content_type` varchar(128) NOT NULL,
  `description` mediumtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```


<div style="page-break-after: always;"></div>

***

## data_files

共享文件池

|field|type|attributes|description|
|-----|----|----------|-----------|
|id|Int64 (11)|``AI``, ``NN``, ``PK``||
|user_id|Int64 (11)|``NN``|这个文件拥有者的用户表编号|
|name|VarChar (128)|``NN``|从浏览器端得到的原始文件名|
|suffix|VarChar (16)|``NN``||
|content_type|Int64 (11)|``NN``||
|uri|VarChar (256)|``NN``|文件在服务器上面的真实路径，为了保护用户数据，用户所上传的数据文件的文件名都是经过随机唯一编码的，所以会需要使用这个字段来记录文件的真实路径|
|size|Int64 (11)|``NN``||
|upload_time|DateTime ()|``NN``||
|md5|VarChar (32)|``NN``||
|description|Text ()|||

```SQL
CREATE TABLE `data_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '这个文件拥有者的用户表编号',
  `name` varchar(128) NOT NULL COMMENT '从浏览器端得到的原始文件名',
  `suffix` varchar(16) NOT NULL,
  `content_type` int(11) NOT NULL,
  `uri` varchar(256) NOT NULL COMMENT '文件在服务器上面的真实路径，为了保护用户数据，用户所上传的数据文件的文件名都是经过随机唯一编码的，所以会需要使用这个字段来记录文件的真实路径',
  `size` int(11) NOT NULL,
  `upload_time` datetime NOT NULL,
  `md5` varchar(32) NOT NULL,
  `description` mediumtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='共享文件池';
```


<div style="page-break-after: always;"></div>

***

## exception

程序的错误信息表

|field|type|attributes|description|
|-----|----|----------|-----------|
|id|Int64 (11)|``NN``, ``PK``|(user_activity id for code 500) 当在用户活动表之中出现500错误的时候，所记录下的对应的用于程序调试的错误信息，这个id是对应的用户活动表的记录id|
|expression|Text ()|``NN``|产生这个错误所需要的表达式，包括：<br /><br />+ SQL查询语句<br />+ 命令行命令|
|stack_trace|Text ()|``NN``|堆栈追踪信息|

```SQL
CREATE TABLE `exception` (
  `id` int(11) NOT NULL COMMENT '(user_activity id for code 500) 当在用户活动表之中出现500错误的时候，所记录下的对应的用于程序调试的错误信息，这个id是对应的用户活动表的记录id',
  `expression` longtext NOT NULL COMMENT '产生这个错误所需要的表达式，包括：\n\n+ SQL查询语句\n+ 命令行命令',
  `stack_trace` longtext NOT NULL COMMENT '堆栈追踪信息',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='程序的错误信息表';
```


<div style="page-break-after: always;"></div>

***

## project



|field|type|attributes|description|
|-----|----|----------|-----------|
|id|Int64 (11)|``AI``, ``NN``, ``PK``||
|user_id|Int64 (11)|``NN``||
|name|VarChar (64)|||
|description|Text ()|||
|type|Int64 (11)|``NN``||
|workspace|VarChar (256)|``NN``||
|create_time|DateTime ()|``NN``||

```SQL
CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `description` tinytext,
  `type` int(11) NOT NULL DEFAULT '-1',
  `workspace` varchar(256) NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```


<div style="page-break-after: always;"></div>

***

## project_files

分析项目和文件池之中的文件的关联关系

|field|type|attributes|description|
|-----|----|----------|-----------|
|id|Int64 (11)|``AI``, ``NN``, ``PK``||
|user_id|Int64 (11)|``NN``||
|project_id|Int64 (11)|``NN``||
|file_id|Int64 (11)|``NN``||
|join_time|DateTime ()|``NN``|将用户的项目和文件这两个实体之间建立起关联的时间|

```SQL
CREATE TABLE `project_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `file_id` int(11) NOT NULL,
  `join_time` datetime NOT NULL COMMENT '将用户的项目和文件这两个实体之间建立起关联的时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='分析项目和文件池之中的文件的关联关系';
```


<div style="page-break-after: always;"></div>

***

## project_types



|field|type|attributes|description|
|-----|----|----------|-----------|
|id|Int64 (11)|``AI``, ``NN``, ``PK``||
|name|VarChar (128)|``NN``||
|note|Text ()|``NN``||

```SQL
CREATE TABLE `project_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `note` mediumtext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```


<div style="page-break-after: always;"></div>

***

## report



|field|type|attributes|description|
|-----|----|----------|-----------|
|id|Int64 (11)|``AI``, ``NN``, ``PK``||
|user_id|Int64 (11)|``NN``||
|project_id|Int64 (11)|``NN``||
|create_time|DateTime ()|``NN``||
|analysis_list|Text ()|``NN``||

```SQL
CREATE TABLE `report` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `create_time` datetime NOT NULL,
  `analysis_list` mediumtext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```


<div style="page-break-after: always;"></div>

***

## task



|field|type|attributes|description|
|-----|----|----------|-----------|
|id|Int64 (11)|``AI``, ``NN``, ``PK``||
|user_id|Int64 (11)|``NN``||
|project_id|Int64 (11)|``NN``||
|title|VarChar (128)|``NN``||
|note|Text ()|||
|create_time|DateTime ()|``NN``||
|status|Int64 (11)|``NN``||
|parameters|Text ()|``NN``||

```SQL
CREATE TABLE `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `title` varchar(128) NOT NULL,
  `note` tinytext,
  `create_time` datetime NOT NULL,
  `status` int(11) NOT NULL,
  `parameters` longtext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```


<div style="page-break-after: always;"></div>

***

## user

用户的基本信息表

|field|type|attributes|description|
|-----|----|----------|-----------|
|id|Int64 (11)|``AI``, ``NN``, ``PK``||
|account|VarChar (64)|``NN``||
|email|VarChar (128)|``NN``||
|password|VarChar (32)|``NN``|lower(md5)|
|role|Int64 (11)|``NN``|用户在这个网站上面的角色类型|
|create_time|DateTime ()|``NN``||

```SQL
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(32) NOT NULL COMMENT 'lower(md5)',
  `role` int(11) NOT NULL DEFAULT '0' COMMENT '用户在这个网站上面的角色类型',
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `account_UNIQUE` (`account`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户的基本信息表';
```


<div style="page-break-after: always;"></div>

***

## user_activity

用于统计分析用户的使用习惯以及程序错误信息的记录表

|field|type|attributes|description|
|-----|----|----------|-----------|
|id|Int64 (11)|``AI``, ``NN``, ``PK``||
|user_id|Int64 (11)|``NN``||
|ip|VarChar (45)|``NN``||
|api|VarChar (128)|``NN``|web api|
|method|VarChar (16)|``NN``|GET/POST/PUT/DELETE, etc|
|status_code|Int64 (11)|``NN``|200: api call success<br />500: api call throw exception<br />403: access denied<br />404: app not found|
|time|DateTime ()|``NN``||

```SQL
CREATE TABLE `user_activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `ip` varchar(45) NOT NULL,
  `api` varchar(128) NOT NULL COMMENT 'web api',
  `method` varchar(16) NOT NULL COMMENT 'GET/POST/PUT/DELETE, etc',
  `status_code` int(11) NOT NULL DEFAULT '200' COMMENT '200: api call success\n500: api call throw exception\n403: access denied\n404: app not found',
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用于统计分析用户的使用习惯以及程序错误信息的记录表';
```


<div style="page-break-after: always;"></div>

***

## user_settings

1: boolean TRUE
0: boolean FALSE

|field|type|attributes|description|
|-----|----|----------|-----------|
|user_id|Int64 (11)|``NN``, ``PK``||
|email_notify.login|Int64 (11)|``NN``||
|email_notify.security|Int64 (11)|``NN``||
|email_notify.task.start|Int64 (11)|``NN``||
|email_notify.task.success|Int64 (11)|``NN``||
|email_notify.task.error|Int64 (11)|``NN``||
|update_time|DateTime ()|``NN``||

```SQL
CREATE TABLE `user_settings` (
  `user_id` int(11) NOT NULL,
  `email_notify.login` int(11) NOT NULL DEFAULT '1',
  `email_notify.security` int(11) NOT NULL DEFAULT '1',
  `email_notify.task.start` int(11) NOT NULL DEFAULT '1',
  `email_notify.task.success` int(11) NOT NULL DEFAULT '1',
  `email_notify.task.error` int(11) NOT NULL DEFAULT '1',
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1: boolean TRUE\n0: boolean FALSE';
```


<div style="page-break-after: always;"></div>




