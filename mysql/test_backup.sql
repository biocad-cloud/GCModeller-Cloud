CREATE DATABASE  IF NOT EXISTS `biocad` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `biocad`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: biocad
-- ------------------------------------------------------
-- Server version	5.5.53

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `accept_file_type`
--

LOCK TABLES `accept_file_type` WRITE;
/*!40000 ALTER TABLE `accept_file_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `accept_file_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `analysis`
--

LOCK TABLES `analysis` WRITE;
/*!40000 ALTER TABLE `analysis` DISABLE KEYS */;
/*!40000 ALTER TABLE `analysis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `analysis_app`
--

LOCK TABLES `analysis_app` WRITE;
/*!40000 ALTER TABLE `analysis_app` DISABLE KEYS */;
/*!40000 ALTER TABLE `analysis_app` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `content_types`
--

LOCK TABLES `content_types` WRITE;
/*!40000 ALTER TABLE `content_types` DISABLE KEYS */;
INSERT INTO `content_types` VALUES (1,'csv','foldchange/iTraq-matrix','iTraq foldchange data matrix',3),(2,'fna','sequence/nucleotide','DNA/RNA sequence in fasta format',4),(3,'faa','sequence/peptide','Protein peptide sequence in fasta format',4),(4,'fasta','sequence/general','General biological sequence in fasta format',4),(5,'gff','context/genome','The genome context data',1),(6,'ptt','context/ORF','The ORF context data in genome',1),(7,'gb','database/genbank','The NCBI genbank database file',1),(8,'sbml','model/metabolism','Metabolism system model file',1),(9,'biom','model/metagenomics','Metagenome matrix',1),(10,'obo','model/ontology','Ontology data model',1),(11,'txt','text/general','General text file',1);
/*!40000 ALTER TABLE `content_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `data_files`
--

LOCK TABLES `data_files` WRITE;
/*!40000 ALTER TABLE `data_files` DISABLE KEYS */;
INSERT INTO `data_files` VALUES (1,1,'test.fasta','fasta',4,'/1/data_files/2018/08/12/B666G2gwHF0Fqqxd.dat',669,'2018-08-12 03:01:30','40c46e3fe4e3584a28e526679e4103d1',NULL),(2,1,'blastxtop.blastx.hits_id.list-proteins-uniprot-annotations-blastx.ORF.csv','csv',1,'/1/data_files/2018/08/12/Ii6eCnW3iGX7pMMG.dat',2028003,'2018-08-12 03:02:02','804bdaa293fa3904a7fb25227a9726e2',NULL),(3,1,'blastxtop.blastx.hits_id.list.txt','txt',11,'/1/data_files/2018/08/12/k6CTiB4ezplDtNB4.dat',170956,'2018-08-12 03:02:14','5456223d651afcb05a666afec201268e',NULL);
/*!40000 ALTER TABLE `data_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `exception`
--

LOCK TABLES `exception` WRITE;
/*!40000 ALTER TABLE `exception` DISABLE KEYS */;
/*!40000 ALTER TABLE `exception` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `file_class`
--

LOCK TABLES `file_class` WRITE;
/*!40000 ALTER TABLE `file_class` DISABLE KEYS */;
INSERT INTO `file_class` VALUES (0,'unknown'),(1,'text'),(2,'image'),(3,'matrix'),(4,'bioSequence');
/*!40000 ALTER TABLE `file_class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `project_files`
--

LOCK TABLES `project_files` WRITE;
/*!40000 ALTER TABLE `project_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `project_types`
--

LOCK TABLES `project_types` WRITE;
/*!40000 ALTER TABLE `project_types` DISABLE KEYS */;
INSERT INTO `project_types` VALUES (1,'Proteomics','The study of proteins expressed by genes within an organism, with applications in the understanding of disease and in drug development');
/*!40000 ALTER TABLE `project_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_activity`
--

LOCK TABLES `user_activity` WRITE;
/*!40000 ALTER TABLE `user_activity` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_settings`
--

LOCK TABLES `user_settings` WRITE;
/*!40000 ALTER TABLE `user_settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_settings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-12 11:06:23
