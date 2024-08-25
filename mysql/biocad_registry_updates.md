# Schema update report

Update report for schema of ``biocad_registry_current.sql`` updates to new model ``biocad_registry.sql``
### Updates for ``complex``

Update table description comment:

```sql
ALTER TABLE `cad_registry`.`complex` COMMENT = 'the complex component composition graph data' ;
```

### Updates for ``db_xrefs``

### Updates for ``kinetic_law``

Current database schema didn't has this table, a new table will be created:

```sql
CREATE TABLE IF NOT EXISTS `kinetic_law` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `db_xref` VARCHAR(64) NOT NULL COMMENT 'the external reference id of current kinetics lambda model',
  `lambda` VARCHAR(1024) NOT NULL COMMENT 'the lambda expression of the kinetics',
  `params` VARCHAR(1024) NOT NULL COMMENT 'parameter set of the current kinetics lambda epxression',
  `temperature` DOUBLE NOT NULL DEFAULT 37 COMMENT 'temperature of the enzyme catalytic kinetics',
  `pH` DOUBLE UNSIGNED NOT NULL DEFAULT 7.5 COMMENT 'pH of the enzyme catalytic kinetics',
  `uniprot` VARCHAR(45) NOT NULL COMMENT 'the uniprot id of the current enzyme model',
  `function_id` INT UNSIGNED NOT NULL COMMENT 'the internal reference id of the molecule function record',
  `add_time` DATETIME NOT NULL DEFAULT now(),
  `note` LONGTEXT NULL COMMENT 'description note text about current enzyme kinetics lambda model',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `regulation_id_idx` (`function_id` ASC) INVISIBLE,
  INDEX `xrefs_index` (`db_xref` ASC) INVISIBLE,
  INDEX `ph_filter` (`pH` ASC) INVISIBLE,
  INDEX `temperature_filter` (`temperature` ASC) VISIBLE,
  INDEX `uniprot_index` (`uniprot` ASC) VISIBLE)
ENGINE = InnoDB
COMMENT = 'the enzymatic catalytic kinetics lambda model';

```

### Updates for ``molecule``

Update table description comment:

```sql
ALTER TABLE `cad_registry`.`molecule` COMMENT = 'The molecular entity object inside a cell' ;
```

### Updates for ``molecule_function``

Description comment of data field has been updated:

```sql
ALTER TABLE `cad_registry`.`molecule_function` CHANGE COLUMN `molecule_id` `molecule_id` int (11) UNSIGNED NOT NULL COMMENT 'the molecule id, usually be the protein molecule id' ;
```
Description comment of data field has been updated:

```sql
ALTER TABLE `cad_registry`.`molecule_function` CHANGE COLUMN `regulation_term` `regulation_term` int (11) UNSIGNED NOT NULL COMMENT 'the id of the term in regulation graph table' ;
```
### Updates for ``pathway``

### Updates for ``pathway_graph``

### Updates for ``reaction``

Update table description comment:

```sql
ALTER TABLE `cad_registry`.`reaction` COMMENT = 'the definition of the biological reaction process' ;
```

### Updates for ``reaction_graph``

Update table description comment:

```sql
ALTER TABLE `cad_registry`.`reaction_graph` COMMENT = 'the relationship between the reaction model and molecule objects' ;
```

Field data attribute of current table ``factor`` has been updated:

```sql
ALTER TABLE `cad_registry`.`reaction_graph` CHANGE COLUMN `factor` `factor` double NOT NULL DEFAULT 1 COMMENT '' ;
```

### Updates for ``regulation_graph``

### Updates for ``sequence_graph``

Update table description comment:

```sql
ALTER TABLE `cad_registry`.`sequence_graph` COMMENT = 'the sequence composition data' ;
```

### Updates for ``subcellular_compartments``

Update table description comment:

```sql
ALTER TABLE `cad_registry`.`subcellular_compartments` COMMENT = 'defines the subcellular compartments' ;
```

### Updates for ``subcellular_location``

Update table description comment:

```sql
ALTER TABLE `cad_registry`.`subcellular_location` COMMENT = 'associates the subcellular_compartments and the molecule objects' ;
```

### Updates for ``vocabulary``

