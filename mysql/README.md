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

Generate time: 4/5/2018 11:12:58 AM<br />
By: ``mysqli.vb`` reflector tool ([https://github.com/xieguigang/mysqli.vb](https://github.com/xieguigang/mysqli.vb))

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

## data_files



|field|type|attributes|description|
|-----|----|----------|-----------|
|id|Int64 (11)|``AI``, ``NN``, ``PK``||
|name|VarChar (128)|``NN``||
|uri|VarChar (256)|``NN``||
|create_time|DateTime ()|``NN``||
|user_id|Int64 (11)|``NN``||
|description|Text ()|||

```SQL
CREATE TABLE `data_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `uri` varchar(256) NOT NULL,
  `create_time` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `description` mediumtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```


<div style="page-break-after: always;"></div>

***

## exception



|field|type|attributes|description|
|-----|----|----------|-----------|
|id|Int64 (11)|``NN``, ``PK``|user_activity id for code 500|
|expression|Text ()|``NN``||
|stack_trace|Text ()|``NN``||

```SQL
CREATE TABLE `exception` (
  `id` int(11) NOT NULL COMMENT 'user_activity id for code 500',
  `expression` longtext NOT NULL,
  `stack_trace` longtext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
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



|field|type|attributes|description|
|-----|----|----------|-----------|
|id|Int64 (11)|``AI``, ``NN``, ``PK``||
|account|VarChar (64)|``NN``||
|email|VarChar (128)|``NN``||
|password|VarChar (32)|``NN``||
|role|Int64 (11)|``NN``||
|create_time|DateTime ()|``NN``||

```SQL
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(32) NOT NULL,
  `role` int(11) NOT NULL DEFAULT '0',
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `account_UNIQUE` (`account`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```


<div style="page-break-after: always;"></div>

***

## user_activity

Statistics

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Statistics';
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




