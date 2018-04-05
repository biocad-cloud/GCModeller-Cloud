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

Generate time: 4/5/2018 10:31:33 PM<br />
By: ``mysqli.vb`` reflector tool ([https://github.com/xieguigang/mysqli.vb](https://github.com/xieguigang/mysqli.vb))

<div style="page-break-after: always;"></div>

***

## user



|field|type|attributes|description|
|-----|----|----------|-----------|
|id|Int64 (11)|``AI``, ``NN``, ``PK``||
|account|VarChar (64)|``NN``||
|email|VarChar (128)|``NN``||
|password|VarChar (32)|``NN``|lower(md5)|
|role|Int64 (11)|``NN``|用户在这个网站上面的角色类型|
|create_time|DateTime ()|``NN``||

```SQL
CREATE TABLE IF NOT EXISTS `bioCAD`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `account` VARCHAR(64) NOT NULL,
  `email` VARCHAR(128) NOT NULL,
  `password` VARCHAR(32) NOT NULL COMMENT 'lower(md5)',
  `role` INT NOT NULL DEFAULT 0 COMMENT '用户在这个网站上面的角色类型',
  `create_time` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `account_UNIQUE` (`account` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB
COMMENT = '用户的基本信息表';
```


<div style="page-break-after: always;"></div>

***

## user_settings



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
CREATE TABLE IF NOT EXISTS `bioCAD`.`user_settings` (
  `user_id` INT NOT NULL,
  `email_notify.login` INT NOT NULL DEFAULT 1,
  `email_notify.security` INT NOT NULL DEFAULT 1,
  `email_notify.task.start` INT NOT NULL DEFAULT 1,
  `email_notify.task.success` INT NOT NULL DEFAULT 1,
  `email_notify.task.error` INT NOT NULL DEFAULT 1,
  `update_time` DATETIME NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC))
ENGINE = InnoDB
COMMENT = '1: boolean TRUE\n0: boolean FALSE';
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
CREATE TABLE IF NOT EXISTS `bioCAD`.`project` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `name` VARCHAR(64) NULL,
  `description` TINYTEXT NULL,
  `type` INT NOT NULL DEFAULT -1,
  `workspace` VARCHAR(256) NOT NULL,
  `create_time` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;
```


<div style="page-break-after: always;"></div>

***

## user_activity



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
CREATE TABLE IF NOT EXISTS `bioCAD`.`user_activity` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `ip` VARCHAR(45) NOT NULL,
  `api` VARCHAR(128) NOT NULL COMMENT 'web api',
  `method` VARCHAR(16) NOT NULL COMMENT 'GET/POST/PUT/DELETE, etc',
  `status_code` INT NOT NULL DEFAULT 200 COMMENT '200: api call success\n500: api call throw exception\n403: access denied\n404: app not found',
  `time` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
COMMENT = '用于统计分析用户的使用习惯以及程序错误信息的记录表';
```


<div style="page-break-after: always;"></div>

***

## exception



|field|type|attributes|description|
|-----|----|----------|-----------|
|id|Int64 (11)|``NN``, ``PK``|(user_activity id for code 500) 当在用户活动表之中出现500错误的时候，所记录下的对应的用于程序调试的错误信息，这个id是对应的用户活动表的记录id|
|expression|Text ()|``NN``|产生这个错误所需要的表达式，包括：<br /><br />+ SQL查询语句<br />+ 命令行命令|
|stack_trace|Text ()|``NN``|堆栈追踪信息|

```SQL
CREATE TABLE IF NOT EXISTS `bioCAD`.`exception` (
  `id` INT NOT NULL COMMENT '(user_activity id for code 500) 当在用户活动表之中出现500错误的时候，所记录下的对应的用于程序调试的错误信息，这个id是对应的用户活动表的记录id',
  `expression` LONGTEXT NOT NULL COMMENT '产生这个错误所需要的表达式，包括：\n\n+ SQL查询语句\n+ 命令行命令',
  `stack_trace` LONGTEXT NOT NULL COMMENT '堆栈追踪信息',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
COMMENT = '程序的错误信息表';
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
CREATE TABLE IF NOT EXISTS `bioCAD`.`task` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `project_id` INT NOT NULL,
  `title` VARCHAR(128) NOT NULL,
  `note` TINYTEXT NULL,
  `create_time` DATETIME NOT NULL,
  `status` INT NOT NULL,
  `parameters` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;
```


<div style="page-break-after: always;"></div>

***

## data_files



|field|type|attributes|description|
|-----|----|----------|-----------|
|id|Int64 (11)|``AI``, ``NN``, ``PK``||
|user_id|Int64 (11)|``NN``|这个文件拥有者的用户表编号|
|name|VarChar (128)|``NN``|从浏览器端得到的原始文件名|
|suffix|VarChar (16)|``NN``||
|uri|VarChar (256)|``NN``|文件在服务器上面的真实路径，为了保护用户数据，用户所上传的数据文件的文件名都是经过随机唯一编码的，所以会需要使用这个字段来记录文件的真实路径|
|size|Int64 (11)|``NN``||
|upload_time|DateTime ()|``NN``||
|md5|VarChar (32)|``NN``||
|description|Text ()|||

```SQL
CREATE TABLE IF NOT EXISTS `bioCAD`.`data_files` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL COMMENT '这个文件拥有者的用户表编号',
  `name` VARCHAR(128) NOT NULL COMMENT '从浏览器端得到的原始文件名',
  `suffix` VARCHAR(16) NOT NULL,
  `uri` VARCHAR(256) NOT NULL COMMENT '文件在服务器上面的真实路径，为了保护用户数据，用户所上传的数据文件的文件名都是经过随机唯一编码的，所以会需要使用这个字段来记录文件的真实路径',
  `size` INT NOT NULL,
  `upload_time` DATETIME NOT NULL,
  `md5` VARCHAR(32) NOT NULL,
  `description` MEDIUMTEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
COMMENT = '共享文件池';
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
CREATE TABLE IF NOT EXISTS `bioCAD`.`analysis` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `app` INT NOT NULL,
  `main_file` INT NOT NULL COMMENT '如果分析只需要一个文件，那么就使用这个属性来储存',
  `files` TINYTEXT NOT NULL COMMENT '分析文件的id编号的数组的json字符串',
  `project` INT NOT NULL,
  `user_id` INT NOT NULL,
  `parameters` LONGTEXT NOT NULL COMMENT '分析用的参数json',
  `create_time` DATETIME NOT NULL,
  `update_time` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;
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
CREATE TABLE IF NOT EXISTS `bioCAD`.`report` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `project_id` INT NOT NULL,
  `create_time` DATETIME NOT NULL,
  `analysis_list` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;
```


<div style="page-break-after: always;"></div>

***

## project_files



|field|type|attributes|description|
|-----|----|----------|-----------|
|id|Int64 (11)|``AI``, ``NN``, ``PK``||
|user_id|Int64 (11)|``NN``||
|project_id|Int64 (11)|``NN``||
|file_id|Int64 (11)|``NN``||
|join_time|DateTime ()|``NN``|将用户的项目和文件这两个实体之间建立起关联的时间|

```SQL
CREATE TABLE IF NOT EXISTS `bioCAD`.`project_files` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `project_id` INT NOT NULL,
  `file_id` INT NOT NULL,
  `join_time` DATETIME NOT NULL COMMENT '将用户的项目和文件这两个实体之间建立起关联的时间',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
COMMENT = '分析项目和文件池之中的文件的关联关系';
```


<div style="page-break-after: always;"></div>




