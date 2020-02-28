-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: localhost    Database: chayut
-- ------------------------------------------------------
-- Server version	5.6.22-log

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
INSERT INTO `bus1` VALUES ('2015-03-14',0,4.192,14.4,57.6,0),('2015-03-15',0,0.018,21.6,21.6,0),('2015-03-18',0,16.505,21.6,57.6,173),('2015-03-19',0,8.053,28.8,57.6,113),('2015-03-20',0,8.871,10.8,57.6,85),('2015-04-09',0,0,0,0,0),('2015-04-11',0,18.556,18,46.8,0),('2015-04-12',0,7.534,36,57.6,0),('2015-04-13',0,4.068,21.6,57.6,0),('2015-04-14',0,0.273,28.8,36,0),('2015-04-15',0,0.254,25.2,36,0);
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
INSERT INTO `bus10` VALUES ('2015-03-13',0,7.57,28.8,58,0),('2015-03-14',0,0.137,28.8,28.8,0),('2015-03-19',0,86.725,46.8,57.6,0),('2015-04-15',0,0.12,28.8,32.4,0);
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
INSERT INTO `bus11` VALUES ('2015-03-18',0,45.081,33.6,59.4,0);
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
INSERT INTO `bus14` VALUES ('2015-03-18',0,28.73,21.6,57.6,0),('2015-03-19',0,14.335,25.2,57.6,0),('2015-03-20',0,12.761,32.4,57.6,0),('2015-04-15',0,45.36,64.8,59.4,0);
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
INSERT INTO `bus15` VALUES ('2015-03-13',0,0.165,93.6,54,0),('2015-03-14',0,0.11,21.6,28.8,0),('2015-03-15',0,0.238,21.6,28.8,0),('2015-03-19',0,5.666,21.6,54,0),('2015-04-15',0,0.098,25.2,32.4,0);
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
INSERT INTO `bus2` VALUES ('2015-03-19',0,20.855,28.8,57.6,0),('2015-04-14',0,0.065,28.8,32.4,0),('2015-04-15',0,0.085,18,32.4,0);
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
INSERT INTO `bus3` VALUES ('2015-04-15',0,1.873,39.6,57.6,0);
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
INSERT INTO `bus6` VALUES ('2015-03-15',0,0.565,21.6,36,1),('2015-03-17',0,3.93,5.4,36,25),('2015-03-18',0,21.81,43.2,57.6,0),('2015-03-19',0,11.289,18,57.6,0),('2015-03-20',0,11.175,28.8,57.6,0),('2015-04-15',0,5.856,21.6,57.6,0);
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
INSERT INTO `bus7` VALUES ('2015-03-14',0,15.024,14.4,57.6,0),('2015-03-19',0,46.844,36,57.6,0);
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
INSERT INTO `bus9` VALUES ('2015-03-18',0,40.68,43.2,57.6,0),('2015-03-19',0,22.278,50.4,57.6,0),('2015-03-20',0,18.964,54,57.6,0),('2015-04-15',0,21.217,43.2,57.6,0);
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

--
-- Table structure for table `stop_blue`
--

DROP TABLE IF EXISTS `stop_blue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stop_blue` (
  `BUSID` int(11) NOT NULL,
  `DATE` date NOT NULL,
  `START_TIME` time NOT NULL,
  `STOP1` time DEFAULT NULL,
  `STOP2` time DEFAULT NULL,
  `STOP3` time DEFAULT NULL,
  `STOP4` time DEFAULT NULL,
  `STOP5` time DEFAULT NULL,
  `STOP6` time DEFAULT NULL,
  `STOP7` time DEFAULT NULL,
  `STOP8` time DEFAULT NULL,
  `STOP9` time DEFAULT NULL,
  `STOP10` time DEFAULT NULL,
  `STOP11` time DEFAULT NULL,
  `STOP12` time DEFAULT NULL,
  `STOP13` time DEFAULT NULL,
  `STOP14` time DEFAULT NULL,
  `STOP15` time DEFAULT NULL,
  `STOP16` time DEFAULT NULL,
  `STOP17` time DEFAULT NULL,
  `STOP18` time DEFAULT NULL,
  `STOP19` time DEFAULT NULL,
  `STOP20` time DEFAULT NULL,
  `STOP21` time DEFAULT NULL,
  PRIMARY KEY (`BUSID`,`DATE`,`START_TIME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stop_blue`
--

LOCK TABLES `stop_blue` WRITE;
/*!40000 ALTER TABLE `stop_blue` DISABLE KEYS */;
INSERT INTO `stop_blue` VALUES (9,'2015-04-15','18:48:05','18:48:15','18:48:28','18:48:59','18:49:35','18:49:47','18:50:14','18:51:16','18:51:35','18:51:47','18:51:52','18:52:18','18:52:43','18:53:06','18:53:27','18:54:23','18:54:48','18:54:57','18:55:11','18:56:13','18:56:47','18:57:36'),(9,'2015-04-15','18:57:53','18:58:03','18:58:15','18:58:46','18:59:23','18:59:34','19:00:01','19:01:03','19:01:22','19:01:34','19:01:39','19:02:05','19:02:30','19:02:52','19:03:14','19:04:11','19:04:34','19:04:44','19:04:58','19:06:01','19:06:35','19:07:25'),(9,'2015-04-15','19:07:40','19:07:50','19:08:03','19:08:35','19:09:10','19:09:22','19:09:49','19:10:51','19:11:10','19:11:22','19:11:27','19:11:53','19:12:18','19:12:40','19:13:02','19:13:58','19:14:22','19:14:32','19:14:46','19:15:48',NULL,NULL);
/*!40000 ALTER TABLE `stop_blue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stop_orange`
--

DROP TABLE IF EXISTS `stop_orange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stop_orange` (
  `BUSID` int(11) NOT NULL,
  `DATE` date NOT NULL,
  `START_TIME` time NOT NULL,
  `STOP1` time DEFAULT NULL,
  `STOP2` time DEFAULT NULL,
  `STOP3` time DEFAULT NULL,
  `STOP4` time DEFAULT NULL,
  `STOP5` time DEFAULT NULL,
  `STOP6` time DEFAULT NULL,
  `STOP7` time DEFAULT NULL,
  `STOP8` time DEFAULT NULL,
  `STOP9` time DEFAULT NULL,
  `STOP10` time DEFAULT NULL,
  `STOP11` time DEFAULT NULL,
  `STOP12` time DEFAULT NULL,
  `STOP13` time DEFAULT NULL,
  `STOP14` time DEFAULT NULL,
  `STOP15` time DEFAULT NULL,
  `STOP16` time DEFAULT NULL,
  `STOP17` time DEFAULT NULL,
  `STOP18` time DEFAULT NULL,
  `STOP19` time DEFAULT NULL,
  `STOP20` time DEFAULT NULL,
  `STOP21` time DEFAULT NULL,
  PRIMARY KEY (`BUSID`,`DATE`,`START_TIME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stop_orange`
--

LOCK TABLES `stop_orange` WRITE;
/*!40000 ALTER TABLE `stop_orange` DISABLE KEYS */;
INSERT INTO `stop_orange` VALUES (14,'2015-04-15','18:38:57','18:39:21','18:39:32','18:39:42','18:39:59','18:41:15','18:41:32','18:42:02','18:42:12','18:42:20','18:42:44','18:42:51','18:43:07','18:43:18','18:43:42','18:44:16','18:44:30','18:44:37','18:44:58','18:46:27','18:46:47','18:47:17'),(14,'2015-04-15','18:47:20','18:47:44','18:47:55','18:48:05','18:48:22','18:49:38','18:49:55','18:50:26','18:50:35','18:50:43','18:51:07','18:51:14','18:51:30','18:51:41','18:52:05','18:52:39','18:52:53','18:53:00','18:53:21','18:54:51','18:55:10','18:55:40'),(14,'2015-04-15','18:55:43','18:56:07','18:56:18','18:56:28','18:56:45','18:58:01','18:58:18','18:58:48','18:58:58','18:59:06','18:59:30','18:59:38','18:59:53','19:00:05','19:00:28','19:01:03','19:01:16','19:01:23','19:01:44','19:03:13','19:03:33','19:04:03'),(14,'2015-04-15','19:04:06','19:04:30','19:04:41','19:04:51','19:05:08','19:06:24','19:06:41','19:07:11','19:07:21','19:07:30','19:07:53','19:08:00','19:08:17','19:08:27','19:08:51','19:09:25','19:09:39','19:09:46','19:10:07','19:11:36','19:11:56','19:12:26'),(14,'2015-04-15','19:12:29','19:12:53','19:13:04','19:13:14','19:13:31','19:14:47','19:15:04','19:15:34','19:15:44','19:15:52','19:16:16',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `stop_orange` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stop_red`
--

DROP TABLE IF EXISTS `stop_red`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stop_red` (
  `BUSID` int(11) NOT NULL,
  `DATE` date NOT NULL,
  `START_TIME` time NOT NULL,
  `STOP1` time DEFAULT NULL,
  `STOP2` time DEFAULT NULL,
  `STOP3` time DEFAULT NULL,
  `STOP4` time DEFAULT NULL,
  `STOP5` time DEFAULT NULL,
  `STOP6` time DEFAULT NULL,
  `STOP7` time DEFAULT NULL,
  `STOP8` time DEFAULT NULL,
  `STOP9` time DEFAULT NULL,
  `STOP10` time DEFAULT NULL,
  `STOP11` time DEFAULT NULL,
  `STOP12` time DEFAULT NULL,
  `STOP13` time DEFAULT NULL,
  `STOP14` time DEFAULT NULL,
  `STOP15` time DEFAULT NULL,
  `STOP16` time DEFAULT NULL,
  `STOP17` time DEFAULT NULL,
  `STOP18` time DEFAULT NULL,
  `STOP19` time DEFAULT NULL,
  `STOP20` time DEFAULT NULL,
  `STOP21` time DEFAULT NULL,
  `STOP22` time DEFAULT NULL,
  `STOP23` time DEFAULT NULL,
  `STOP24` time DEFAULT NULL,
  `STOP25` time DEFAULT NULL,
  PRIMARY KEY (`START_TIME`,`BUSID`,`DATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stop_red`
--

LOCK TABLES `stop_red` WRITE;
/*!40000 ALTER TABLE `stop_red` DISABLE KEYS */;
INSERT INTO `stop_red` VALUES (1,'2015-04-15','18:47:59','18:48:14','18:49:19','18:50:15','18:50:33','18:51:17','18:53:09','18:53:41','18:53:53','18:54:08','18:54:47','18:59:22','19:00:31','19:00:51','19:01:09','19:02:00','19:02:32','19:03:17','19:03:45','19:04:06','19:04:33','19:04:46','19:05:24','19:05:36','19:06:23','19:07:02'),(1,'2015-04-15','19:07:23','19:07:38','19:08:43','19:09:38','19:09:57','19:10:41','19:12:32','19:13:04','19:13:17','19:13:32','19:14:11',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(1,'2015-04-15','19:18:20','19:18:35',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `stop_red` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stop_yellow`
--

DROP TABLE IF EXISTS `stop_yellow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stop_yellow` (
  `BUSID` int(11) NOT NULL,
  `DATE` date NOT NULL,
  `START_TIME` time NOT NULL,
  `STOP1` time DEFAULT NULL,
  `STOP2` time DEFAULT NULL,
  `STOP3` time DEFAULT NULL,
  `STOP4` time DEFAULT NULL,
  `STOP5` time DEFAULT NULL,
  `STOP6` time DEFAULT NULL,
  `STOP7` time DEFAULT NULL,
  `STOP8` time DEFAULT NULL,
  `STOP9` time DEFAULT NULL,
  `STOP10` time DEFAULT NULL,
  `STOP11` time DEFAULT NULL,
  `STOP12` time DEFAULT NULL,
  `STOP13` time DEFAULT NULL,
  `STOP14` time DEFAULT NULL,
  `STOP15` time DEFAULT NULL,
  `STOP16` time DEFAULT NULL,
  `STOP17` time DEFAULT NULL,
  `STOP18` time DEFAULT NULL,
  `STOP19` time DEFAULT NULL,
  `STOP20` time DEFAULT NULL,
  `STOP21` time DEFAULT NULL,
  `STOP22` time DEFAULT NULL,
  `STOP23` time DEFAULT NULL,
  `STOP24` time DEFAULT NULL,
  PRIMARY KEY (`BUSID`,`DATE`,`START_TIME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stop_yellow`
--

LOCK TABLES `stop_yellow` WRITE;
/*!40000 ALTER TABLE `stop_yellow` DISABLE KEYS */;
/*!40000 ALTER TABLE `stop_yellow` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-04-15 19:22:21
