-- MySQL Script generated by MySQL Workbench
-- Thu May 25 21:09:49 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cad_registry
-- -----------------------------------------------------
-- necessary components for build cellular network model
DROP SCHEMA IF EXISTS `cad_registry` ;

-- -----------------------------------------------------
-- Schema cad_registry
--
-- necessary components for build cellular network model
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cad_registry` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
SHOW WARNINGS;
USE `cad_registry` ;

-- -----------------------------------------------------
-- Table `dblinks`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dblinks` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `dblinks` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `db_src` INT UNSIGNED NOT NULL,
  `xref_id` VARCHAR(255) NOT NULL,
  `entity_id` INT UNSIGNED NOT NULL,
  `entity_type` INT UNSIGNED NOT NULL COMMENT '1: molecules',
  `add_time` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `id_UNIQUE` ON `dblinks` (`id` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `family`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `family` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `family` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `parent_id` INT UNSIGNED NOT NULL,
  `n_childs` INT UNSIGNED NOT NULL DEFAULT 0,
  `add_time` DATETIME NOT NULL DEFAULT now(),
  `description` VARCHAR(8192) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `id_UNIQUE` ON `family` (`id` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `genomes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `genomes` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `genomes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `taxonomic_group` INT UNSIGNED NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `ncbi_taxid` INT UNSIGNED NOT NULL,
  `add_time` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `id_UNIQUE` ON `genomes` (`id` ASC) VISIBLE;

SHOW WARNINGS;
CREATE UNIQUE INDEX `name_UNIQUE` ON `genomes` (`name` ASC) VISIBLE;

SHOW WARNINGS;
CREATE UNIQUE INDEX `ncbi_taxid_UNIQUE` ON `genomes` (`ncbi_taxid` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `molecules`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `molecules` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `molecules` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `molecule_id` VARCHAR(64) NOT NULL,
  `type` INT NOT NULL DEFAULT 1 COMMENT '1: gene(dna), rna, polypeptide(protein)\n2: metabolite\n3: protein-complex\n\n',
  `name` VARCHAR(64) NOT NULL,
  `seq_num` INT NOT NULL DEFAULT 0,
  `synonym_num` INT UNSIGNED NOT NULL DEFAULT 0,
  `ncbi_taxid` INT UNSIGNED NOT NULL COMMENT 'the genome source of current molecule',
  `category_id` INT UNSIGNED NOT NULL,
  `description` VARCHAR(8192) NOT NULL,
  `add_time` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `id_UNIQUE` ON `molecules` (`id` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `motif`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `motif` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `motif` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `family` VARCHAR(45) NOT NULL COMMENT 'the motif family name',
  `family_id` INT UNSIGNED NOT NULL,
  `type` VARCHAR(3) NOT NULL DEFAULT 'TF' COMMENT 'RNA/TF',
  `add_time` DATETIME NOT NULL DEFAULT now(),
  `note` VARCHAR(4096) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `id_UNIQUE` ON `motif` (`id` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `motif_sites`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `motif_sites` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `motif_sites` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(3) NOT NULL DEFAULT 'TF' COMMENT 'RNA/TF',
  `gene_id` VARCHAR(45) NULL,
  `gene_name` VARCHAR(45) NULL,
  `loci` INT NOT NULL DEFAULT 0 COMMENT 'the upstream location of the motif site',
  `seq` VARCHAR(500) NOT NULL COMMENT 'the motif site sequence',
  `regulator` INT UNSIGNED NOT NULL,
  `genome_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `id_UNIQUE` ON `motif_sites` (`id` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `regulator`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `regulator` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `regulator` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `gene_id` VARCHAR(64) NOT NULL,
  `mol_id` INT UNSIGNED NOT NULL,
  `family` INT UNSIGNED NOT NULL,
  `genome_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `id_UNIQUE` ON `regulator` (`id` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `seq_archive`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `seq_archive` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `seq_archive` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `seq_id` VARCHAR(64) NOT NULL,
  `mol_id` INT UNSIGNED NOT NULL,
  `mol_type` INT NOT NULL COMMENT '1: dna\n2: rna\n3: protein\n\nhttps://github.com/SMRUCC/GCModeller/blob/918cb50e86f2159856edaa0531cec227fc7f6e97/src/GCModeller/core/Bio.Assembly/SequenceModel/Abstract.vb#L70',
  `len` INT UNSIGNED NOT NULL DEFAULT 0,
  `seq` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `id_UNIQUE` ON `seq_archive` (`id` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `gene_id` ON `seq_archive` (`seq_id` ASC) INVISIBLE;

SHOW WARNINGS;
CREATE INDEX `seq_len` ON `seq_archive` (`len` ASC) INVISIBLE;

SHOW WARNINGS;
CREATE INDEX `types` ON `seq_archive` (`mol_type` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `synonym`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `synonym` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `synonym` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `molecule_id` INT UNSIGNED NOT NULL,
  `synonym` VARCHAR(255) NOT NULL,
  `add_time` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `id_UNIQUE` ON `synonym` (`id` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `taxonomic`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `taxonomic` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `taxonomic` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `add_time` DATETIME NOT NULL DEFAULT now(),
  `note` VARCHAR(4096) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
COMMENT = 'Taxonomic group';

SHOW WARNINGS;
CREATE UNIQUE INDEX `id_UNIQUE` ON `taxonomic` (`id` ASC) VISIBLE;

SHOW WARNINGS;
CREATE UNIQUE INDEX `name_UNIQUE` ON `taxonomic` (`name` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `name_index` ON `taxonomic` (`name` ASC) INVISIBLE;

SHOW WARNINGS;
CREATE INDEX `time_index` ON `taxonomic` (`add_time` ASC) INVISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `vocabulary`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vocabulary` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `vocabulary` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `term` VARCHAR(255) NOT NULL,
  `hashcode` VARCHAR(32) NOT NULL,
  `category` VARCHAR(64) NOT NULL,
  `add_time` DATETIME NOT NULL DEFAULT now(),
  `description` VARCHAR(8192) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `id_UNIQUE` ON `vocabulary` (`id` ASC) VISIBLE;

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;