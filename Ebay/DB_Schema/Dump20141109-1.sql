CREATE DATABASE  IF NOT EXISTS `yelp` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `yelp`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: yelp
-- ------------------------------------------------------
-- Server version	5.6.20

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) NOT NULL,
  `category_description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_id_UNIQUE` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (9,'Restaurant','Update reviews'),(24,'Bar','new bar'),(26,'Coffee & Tea','coffee');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`firstname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('','','kkulkarni12@gmail.com','kkka'),('abc','admin','admin123@gmail.com','abcd'),('abc@gmailcom','123','',''),('Abhishek','Rakshe','kkulkarni12@gmail.com','kkka'),('admin@gmail.com','456','',''),('fhhd','jdj','',''),('gag','asdad','gaasa@gmail.com','gafaag'),('ggg','admin','sfasfaf@gmail.com','asdads'),('hhss','wer43','',''),('kaustubh','kulkarni','kkulkarni12@gmail.com','kkka'),('Madhura','Soman','asd12@gmail.com','12ddsa'),('pqr@gmail.com','123','',''),('Raptor','Ritz','RR12@gmail.com','12345'),('xyz123@gmail.com','789','','');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `r_name` varchar(45) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  `rating` int(11) NOT NULL,
  `review` varchar(45) NOT NULL,
  `Element` varchar(45) NOT NULL,
  PRIMARY KEY (`review_id`),
  UNIQUE KEY `review_id_UNIQUE` (`review_id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (44,'Devendra','Outstanding',8,'Nice','Radison'),(55,'Abhishek','review about pizza hut',7,'nice pizza','Pizza hut'),(62,'Abhishek','good coffee',5,'please go there','NYK Coffee House'),(63,'Abhishek','Not good restaurant',3,'dont go','Sub Way'),(64,'Kate','nice food and service',8,'please go there','Bell Restaurant');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `login_time` datetime NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'kk','kku','erw@gmail.com','adf','1970-01-01 00:00:01'),(4,'abc123','pqr','xyz@gmail.com','Activa225*(','2014-09-28 17:10:56'),(7,'Abhishek','Rakshe','pqr@gmail.com','123456','2014-11-09 17:44:10'),(23,'tanvi','deo','tst@gmail.com','tanvi123','2014-09-29 11:43:10'),(26,'nikhil','bar','bar@gmail.com','nik','2014-09-29 20:51:20'),(27,'pranav','dhapke','absfj@gmail.com','abc','1970-01-01 00:00:01'),(28,'Manasi','kulkarni','mk@gmail.com','123','2014-10-11 01:03:06'),(29,'Admin','admin','admin@gmail.com','123456','2014-11-09 17:41:23'),(30,'kaustubh05','kulkarni','kkulkarni@gmail.com','123','2014-10-11 19:41:51'),(31,'Devendra','dev123','dev@gmail.com','123','2014-10-11 20:09:22'),(32,'Test123','ppp','test123@gmail.com','123','2014-10-11 20:38:43'),(33,'','','','','2014-10-11 23:04:06'),(34,'','','','','2014-10-11 23:04:46'),(36,'Kaustubh12','Kulkarni','kkulkarni12@gmail.com','1234567','2014-10-12 17:18:39'),(37,'Pranav','Dhapke','pdhapke@gmail.com','123','2014-11-08 21:57:32'),(38,'John','larkin','john.larkin@gmail.com','123','2014-11-08 22:00:35'),(39,'kate','winslet','kw@gmail.com','123','2014-11-08 22:04:52'),(40,'Cathy','Siera','cathy@gmail.com','123456','2014-11-08 22:24:03');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-11-09 20:20:00
