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

Generate time: 4/3/2018 7:53:02 PM<br />
By: ``mysqli.vb`` reflector tool ([https://github.com/xieguigang/mysqli.vb](https://github.com/xieguigang/mysqli.vb))

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
CREATE TABLE IF NOT EXISTS `bioCAD`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `account` VARCHAR(64) NOT NULL,
  `email` VARCHAR(128) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `role` INT NOT NULL DEFAULT 0,
  `create_time` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `account_UNIQUE` (`account` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;
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
COMMENT = 'Statistics';
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
CREATE TABLE IF NOT EXISTS `bioCAD`.`exception` (
  `id` INT NOT NULL COMMENT 'user_activity id for code 500',
  `expression` LONGTEXT NOT NULL,
  `stack_trace` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;
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
|name|VarChar (128)|``NN``||
|uri|VarChar (256)|``NN``||
|create_time|DateTime ()|``NN``||
|user_id|Int64 (11)|``NN``||
|description|Text ()|||

```SQL
CREATE TABLE IF NOT EXISTS `bioCAD`.`data_files` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128) NOT NULL,
  `uri` VARCHAR(256) NOT NULL,
  `create_time` DATETIME NOT NULL,
  `user_id` INT NOT NULL,
  `description` MEDIUMTEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;
```


<div style="page-break-after: always;"></div>




