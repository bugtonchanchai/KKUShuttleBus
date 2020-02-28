-- MySQL dump 10.13  Distrib 5.5.41, for debian-linux-gnu (i686)
--
-- Host: localhost    Database: bus
-- ------------------------------------------------------
-- Server version	5.5.41-0+wheezy1

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
-- Table structure for table `bus1`
--

DROP TABLE IF EXISTS `bus1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bus1` (
  `DATE` date NOT NULL,
  `ROUND` smallint(4) NOT NULL DEFAULT '0',
  `DIST` float NOT NULL DEFAULT '0',
  `AVG_V` float NOT NULL DEFAULT '0',
  `MAX_V` float NOT NULL DEFAULT '0',
  `NUM_P` smallint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus1`
--

LOCK TABLES `bus1` WRITE;
/*!40000 ALTER TABLE `bus1` DISABLE KEYS */;
/*!40000 ALTER TABLE `bus1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus10`
--

DROP TABLE IF EXISTS `bus10`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bus10` (
  `DATE` date NOT NULL,
  `ROUND` smallint(4) NOT NULL DEFAULT '0',
  `DIST` float NOT NULL DEFAULT '0',
  `AVG_V` float NOT NULL DEFAULT '0',
  `MAX_V` float NOT NULL DEFAULT '0',
  `NUM_P` smallint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus10`
--

LOCK TABLES `bus10` WRITE;
/*!40000 ALTER TABLE `bus10` DISABLE KEYS */;
/*!40000 ALTER TABLE `bus10` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus11`
--

DROP TABLE IF EXISTS `bus11`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bus11` (
  `DATE` date NOT NULL,
  `ROUND` smallint(4) NOT NULL DEFAULT '0',
  `DIST` float NOT NULL DEFAULT '0',
  `AVG_V` float NOT NULL DEFAULT '0',
  `MAX_V` float NOT NULL DEFAULT '0',
  `NUM_P` smallint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus11`
--

LOCK TABLES `bus11` WRITE;
/*!40000 ALTER TABLE `bus11` DISABLE KEYS */;
/*!40000 ALTER TABLE `bus11` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus12`
--

DROP TABLE IF EXISTS `bus12`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bus12` (
  `DATE` date NOT NULL,
  `ROUND` smallint(4) NOT NULL DEFAULT '0',
  `DIST` float NOT NULL DEFAULT '0',
  `AVG_V` float NOT NULL DEFAULT '0',
  `MAX_V` float NOT NULL DEFAULT '0',
  `NUM_P` smallint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus12`
--

LOCK TABLES `bus12` WRITE;
/*!40000 ALTER TABLE `bus12` DISABLE KEYS */;
/*!40000 ALTER TABLE `bus12` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus13`
--

DROP TABLE IF EXISTS `bus13`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bus13` (
  `DATE` date NOT NULL,
  `ROUND` smallint(4) NOT NULL DEFAULT '0',
  `DIST` float NOT NULL DEFAULT '0',
  `AVG_V` float NOT NULL DEFAULT '0',
  `MAX_V` float NOT NULL DEFAULT '0',
  `NUM_P` smallint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus13`
--

LOCK TABLES `bus13` WRITE;
/*!40000 ALTER TABLE `bus13` DISABLE KEYS */;
/*!40000 ALTER TABLE `bus13` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus14`
--

DROP TABLE IF EXISTS `bus14`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bus14` (
  `DATE` date NOT NULL,
  `ROUND` smallint(4) NOT NULL DEFAULT '0',
  `DIST` float NOT NULL DEFAULT '0',
  `AVG_V` float NOT NULL DEFAULT '0',
  `MAX_V` float NOT NULL DEFAULT '0',
  `NUM_P` smallint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus14`
--

LOCK TABLES `bus14` WRITE;
/*!40000 ALTER TABLE `bus14` DISABLE KEYS */;
/*!40000 ALTER TABLE `bus14` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus15`
--

DROP TABLE IF EXISTS `bus15`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bus15` (
  `DATE` date NOT NULL,
  `ROUND` smallint(4) NOT NULL DEFAULT '0',
  `DIST` float NOT NULL DEFAULT '0',
  `AVG_V` float NOT NULL DEFAULT '0',
  `MAX_V` float NOT NULL DEFAULT '0',
  `NUM_P` smallint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus15`
--

LOCK TABLES `bus15` WRITE;
/*!40000 ALTER TABLE `bus15` DISABLE KEYS */;
/*!40000 ALTER TABLE `bus15` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus2`
--

DROP TABLE IF EXISTS `bus2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bus2` (
  `DATE` date NOT NULL,
  `ROUND` smallint(4) NOT NULL DEFAULT '0',
  `DIST` float NOT NULL DEFAULT '0',
  `AVG_V` float NOT NULL DEFAULT '0',
  `MAX_V` float NOT NULL DEFAULT '0',
  `NUM_P` smallint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus2`
--

LOCK TABLES `bus2` WRITE;
/*!40000 ALTER TABLE `bus2` DISABLE KEYS */;
/*!40000 ALTER TABLE `bus2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus3`
--

DROP TABLE IF EXISTS `bus3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bus3` (
  `DATE` date NOT NULL,
  `ROUND` smallint(4) NOT NULL DEFAULT '0',
  `DIST` float NOT NULL DEFAULT '0',
  `AVG_V` float NOT NULL DEFAULT '0',
  `MAX_V` float NOT NULL DEFAULT '0',
  `NUM_P` smallint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus3`
--

LOCK TABLES `bus3` WRITE;
/*!40000 ALTER TABLE `bus3` DISABLE KEYS */;
/*!40000 ALTER TABLE `bus3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus4`
--

DROP TABLE IF EXISTS `bus4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bus4` (
  `DATE` date NOT NULL,
  `ROUND` smallint(4) NOT NULL DEFAULT '0',
  `DIST` float NOT NULL DEFAULT '0',
  `AVG_V` float NOT NULL DEFAULT '0',
  `MAX_V` float NOT NULL DEFAULT '0',
  `NUM_P` smallint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus4`
--

LOCK TABLES `bus4` WRITE;
/*!40000 ALTER TABLE `bus4` DISABLE KEYS */;
/*!40000 ALTER TABLE `bus4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus5`
--

DROP TABLE IF EXISTS `bus5`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bus5` (
  `DATE` date NOT NULL,
  `ROUND` smallint(4) NOT NULL DEFAULT '0',
  `DIST` float NOT NULL DEFAULT '0',
  `AVG_V` float NOT NULL DEFAULT '0',
  `MAX_V` float NOT NULL DEFAULT '0',
  `NUM_P` smallint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus5`
--

LOCK TABLES `bus5` WRITE;
/*!40000 ALTER TABLE `bus5` DISABLE KEYS */;
/*!40000 ALTER TABLE `bus5` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus6`
--

DROP TABLE IF EXISTS `bus6`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bus6` (
  `DATE` date NOT NULL,
  `ROUND` smallint(4) NOT NULL DEFAULT '0',
  `DIST` float NOT NULL DEFAULT '0',
  `AVG_V` float NOT NULL DEFAULT '0',
  `MAX_V` float NOT NULL DEFAULT '0',
  `NUM_P` smallint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus6`
--

LOCK TABLES `bus6` WRITE;
/*!40000 ALTER TABLE `bus6` DISABLE KEYS */;
INSERT INTO `bus6` VALUES ('2015-02-25',0,17.98,15.334,44.128,308),('2015-03-03',0,0.152,0.001,51.056,1);
/*!40000 ALTER TABLE `bus6` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus7`
--

DROP TABLE IF EXISTS `bus7`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bus7` (
  `DATE` date NOT NULL,
  `ROUND` smallint(4) NOT NULL DEFAULT '0',
  `DIST` float NOT NULL DEFAULT '0',
  `AVG_V` float NOT NULL DEFAULT '0',
  `MAX_V` float NOT NULL DEFAULT '0',
  `NUM_P` smallint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus7`
--

LOCK TABLES `bus7` WRITE;
/*!40000 ALTER TABLE `bus7` DISABLE KEYS */;
/*!40000 ALTER TABLE `bus7` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus8`
--

DROP TABLE IF EXISTS `bus8`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bus8` (
  `DATE` date NOT NULL,
  `ROUND` smallint(4) NOT NULL DEFAULT '0',
  `DIST` float NOT NULL DEFAULT '0',
  `AVG_V` float NOT NULL DEFAULT '0',
  `MAX_V` float NOT NULL DEFAULT '0',
  `NUM_P` smallint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus8`
--

LOCK TABLES `bus8` WRITE;
/*!40000 ALTER TABLE `bus8` DISABLE KEYS */;
/*!40000 ALTER TABLE `bus8` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus9`
--

DROP TABLE IF EXISTS `bus9`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bus9` (
  `DATE` date NOT NULL,
  `ROUND` smallint(4) NOT NULL DEFAULT '0',
  `DIST` float NOT NULL DEFAULT '0',
  `AVG_V` float NOT NULL DEFAULT '0',
  `MAX_V` float NOT NULL DEFAULT '0',
  `NUM_P` smallint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`DATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus9`
--

LOCK TABLES `bus9` WRITE;
/*!40000 ALTER TABLE `bus9` DISABLE KEYS */;
/*!40000 ALTER TABLE `bus9` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `color`
--

DROP TABLE IF EXISTS `color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `color` (
  `BUSID` int(10) NOT NULL,
  `COLOR` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`BUSID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color`
--

LOCK TABLES `color` WRITE;
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
INSERT INTO `color` VALUES (1,'red'),(2,'red'),(3,'red'),(4,'red'),(5,'red'),(6,'yellow'),(7,'yellow'),(8,'yellow'),(9,'blue'),(10,'blue'),(11,'blue'),(12,'blue'),(13,'blue'),(14,'orange'),(15,'orange');
/*!40000 ALTER TABLE `color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `distance`
--

DROP TABLE IF EXISTS `distance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `distance` (
  `COLOR` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `PATH` float NOT NULL,
  PRIMARY KEY (`COLOR`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `distance`
--

LOCK TABLES `distance` WRITE;
/*!40000 ALTER TABLE `distance` DISABLE KEYS */;
INSERT INTO `distance` VALUES ('blue',6.95),('orange',10),('red',9.17),('yellow',8.41);
/*!40000 ALTER TABLE `distance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `position` (
  `id` int(11) NOT NULL,
  `lat` varchar(20) DEFAULT NULL,
  `lng` varchar(20) DEFAULT NULL,
  `time` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES (1,'11.11','111.11','1111'),(2,'22','222','2222'),(3,'33','333','3333'),(4,'44','444','4444'),(5,'55','555','5555'),(6,'66','666','6666'),(7,'77','777','7777'),(8,'88','888','8888'),(9,'99','999','9999'),(10,'00','000','0000'),(11,'11','111','1111'),(12,'22','222','2222'),(13,'33','333','3333'),(14,'44','444','4444'),(15,'55','555','5555');
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-03-13  9:00:09
