CREATE DATABASE  IF NOT EXISTS `metacardio` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `metacardio`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: metacardio
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
-- Dumping data for table `analyst`
--

LOCK TABLES `analyst` WRITE;
/*!40000 ALTER TABLE `analyst` DISABLE KEYS */;
INSERT INTO `analyst` VALUES (10000,'admin0',0,'81dc9bdb52d04dc20036dbd8313ed055','gg.xie@bionovogene.com'),(10001,'admin1',1,'81dc9bdb52d04dc20036dbd8313ed055','gg.xie@bionovogene.com');
/*!40000 ALTER TABLE `analyst` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `experimental_batches`
--

LOCK TABLES `experimental_batches` WRITE;
/*!40000 ALTER TABLE `experimental_batches` DISABLE KEYS */;
INSERT INTO `experimental_batches` VALUES (1,10001,'2018-01-31 07:24:07','2018/01/31/07-24-07/','2018-01-31 07:24:07','',2),(2,10001,'2018-01-31 09:10:06','2018/01/31/09-10-06/','2018-01-31 09:10:06','',2),(3,10001,'2018-01-31 10:18:27','2018/01/31/10-18-27/','2018-01-31 10:18:27','',-1);
/*!40000 ALTER TABLE `experimental_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `frs_tracking`
--

LOCK TABLES `frs_tracking` WRITE;
/*!40000 ALTER TABLE `frs_tracking` DISABLE KEYS */;
/*!40000 ALTER TABLE `frs_tracking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `health_tracking`
--

LOCK TABLES `health_tracking` WRITE;
/*!40000 ALTER TABLE `health_tracking` DISABLE KEYS */;
/*!40000 ALTER TABLE `health_tracking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `medical_examination`
--

LOCK TABLES `medical_examination` WRITE;
/*!40000 ALTER TABLE `medical_examination` DISABLE KEYS */;
/*!40000 ALTER TABLE `medical_examination` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `mrm_raw_files`
--

LOCK TABLES `mrm_raw_files` WRITE;
/*!40000 ALTER TABLE `mrm_raw_files` DISABLE KEYS */;
INSERT INTO `mrm_raw_files` VALUES (1,1,'day3.wiff.scan','2018-01-31 07:24:33',1932284,'a3113de1067f22be694c520d3d851837'),(2,1,'day3.wiff','2018-01-31 07:24:34',5521408,'ab8470fae0e436dbe04914b921b3df93'),(3,2,'day3.wiff.scan','2018-01-31 09:10:14',1932284,'a3113de1067f22be694c520d3d851837'),(4,2,'day3.wiff','2018-01-31 09:10:14',5521408,'ab8470fae0e436dbe04914b921b3df93');
/*!40000 ALTER TABLE `mrm_raw_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_sample`
--

LOCK TABLES `user_sample` WRITE;
/*!40000 ALTER TABLE `user_sample` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_sample` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-05 22:32:15
