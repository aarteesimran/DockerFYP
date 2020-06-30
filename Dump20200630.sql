-- MySQL dump 10.13  Distrib 5.7.30, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: dockerizedcloudide
-- ------------------------------------------------------
-- Server version	5.7.30-0ubuntu0.18.04.1

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
-- Table structure for table `templates`
--

DROP TABLE IF EXISTS `templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `templates` (
  `tempid` int(10) NOT NULL,
  `prjtype` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`tempid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templates`
--

LOCK TABLES `templates` WRITE;
/*!40000 ALTER TABLE `templates` DISABLE KEYS */;
INSERT INTO `templates` VALUES (1,'python'),(2,'clang'),(3,'java'),(4,'cpp');
/*!40000 ALTER TABLE `templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userid` int(10) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `mobile_no` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Usama','Khalid','03422455721','usamakhalid5721@gmail.com','123'),(3,'cs','1612303','1111111111','cs1612303','cs1612303'),(4,'','','','','');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usrprj`
--

DROP TABLE IF EXISTS `usrprj`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usrprj` (
  `usrprjid` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `tempid` int(10) DEFAULT NULL,
  `prjcode` varchar(45) DEFAULT NULL,
  `userid` int(10) DEFAULT NULL,
  `shared` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`usrprjid`),
  KEY `userid_idx` (`tempid`),
  CONSTRAINT `userid` FOREIGN KEY (`tempid`) REFERENCES `templates` (`tempid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usrprj`
--

LOCK TABLES `usrprj` WRITE;
/*!40000 ALTER TABLE `usrprj` DISABLE KEYS */;
INSERT INTO `usrprj` VALUES (1,'',3,'6966c1',1,0),(2,'',3,'048d66',1,0),(3,'',3,'026c69',1,0),(4,'',3,'9f97f3',1,1),(5,'',3,'524273',1,1),(6,'',3,'ebd315',1,0),(7,'',3,'984c55',1,0),(8,'',3,'a3990b',1,0),(9,'',3,'26e1fd',1,0),(10,'',3,'81f804',NULL,0),(11,'',3,'90ef48',NULL,0),(12,'',3,'50b8a4',NULL,0),(13,'',3,'a56c06',NULL,0),(14,'',3,'082846',NULL,0),(15,'',3,'945a0e',NULL,0),(16,'',3,'558fa4',NULL,0),(17,'',3,'92c42e',NULL,0),(18,'',3,'fd9587',NULL,0),(19,'',3,'38e34c',NULL,0),(20,'',3,'e10cf5',NULL,0),(21,'',3,'5f1edd',NULL,0),(22,'',3,'40bace',NULL,0),(23,'',3,'cb4274',NULL,0),(24,'',3,'1080b7',NULL,0),(25,'',3,'54b6c7',NULL,0),(26,'',3,'6b10cb',NULL,0),(27,'',3,'e02a46',NULL,0),(28,'',1,'202b21',1,0),(29,'',2,'e0da72',1,0),(30,'',4,'89e1fe',1,1),(31,'',3,'62f45e',NULL,0),(32,'',3,'281b13',NULL,0),(33,'',3,'6e7809',NULL,0),(34,'',3,'a223f5',NULL,0),(35,'',1,'3d234d',NULL,0),(36,'',3,'1ad3f7',NULL,0),(37,'',3,'43bd11',NULL,0),(38,'',3,'eea975',NULL,0),(39,'',3,'a4e681',NULL,0),(40,'',3,'dc0026',NULL,0),(41,'',3,'351a0e',NULL,0),(42,'',3,'6e9118',NULL,0),(43,'',3,'c66b01',1,0),(44,'',3,'c34cef',1,0),(45,'',3,'a50a49',1,0),(46,'',3,'a1fbde',1,0),(47,'',3,'790310',1,0),(48,'',1,'40b6fd',1,0),(49,'',3,'5ac98e',1,0),(50,'',3,'b5e520',1,0),(51,'',3,'080d52',1,0),(52,'',3,'9aa3b6',1,0),(53,'',3,'de5683',1,0),(54,'',3,'0177b8',1,0),(55,'',3,'f28bfa',1,0),(56,'',3,'c6d6bf',1,0),(57,'',3,'8a0193',1,0),(58,'',3,'84d959',1,0),(59,'',3,'22d27b',1,0),(60,'',3,'a70fff',1,0),(61,'',3,'5a7a10',1,0),(62,'',3,'751a22',1,0),(63,'',3,'c670a7',1,0),(64,'',3,'a8b539',1,0),(65,'',3,'d2dec3',1,0),(66,'',3,'1323da',1,0),(67,'',3,'aacee2',1,0),(68,'',3,'9c77ce',1,0),(69,'',3,'2fb466',1,0),(70,'',1,'516908',1,0),(71,'',3,'9603ce',1,0),(72,'',1,'4faeea',1,0),(73,'',2,'4d0309',1,0),(74,'',4,'6942e4',1,0),(75,'',4,'661ed6',1,0),(76,'',4,'1c90ad',1,0),(77,'',4,'0eaa8c',1,0),(78,'',2,'454244',1,0),(79,'',1,'3d2752',1,0);
/*!40000 ALTER TABLE `usrprj` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-30  2:18:58
