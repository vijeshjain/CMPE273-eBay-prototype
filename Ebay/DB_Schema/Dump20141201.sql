CREATE DATABASE  IF NOT EXISTS `ebay` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ebay`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: ebay
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
-- Table structure for table `bidding`
--

DROP TABLE IF EXISTS `bidding`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bidding` (
  `bidId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `bidStart` date DEFAULT NULL,
  `bidEnd` date DEFAULT NULL,
  PRIMARY KEY (`bidId`),
  KEY `user_mapping_idx` (`userId`),
  KEY `product_mapping_idx` (`productId`),
  CONSTRAINT `product_bid_mapping` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_bid_mapping` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bidding`
--

LOCK TABLES `bidding` WRITE;
/*!40000 ALTER TABLE `bidding` DISABLE KEYS */;
INSERT INTO `bidding` VALUES (1,154,184,'2014-10-27','2014-11-22'),(2,135,233,'2014-10-15','2014-11-27'),(3,124,156,'2014-10-01','2014-11-24'),(4,115,211,'2014-10-20','2014-11-26'),(5,178,190,'2014-10-09','2014-11-22'),(6,117,170,'2014-10-02','2014-11-25'),(7,201,233,'2014-10-21','2014-11-24'),(8,109,247,'2014-10-03','2014-11-28'),(9,131,221,'2014-10-27','2014-11-26'),(10,184,209,'2014-10-05','2014-11-26'),(11,202,179,'2014-11-03','2014-11-27'),(12,193,226,'2014-11-16','2014-11-25'),(13,114,249,'2014-10-25','2014-11-23'),(14,123,218,'2014-10-27','2014-11-23'),(15,162,194,'2014-11-19','2014-11-23'),(16,200,170,'2014-10-23','2014-11-22'),(17,194,161,'2014-11-19','2014-11-27'),(18,171,188,'2014-11-10','2014-11-26'),(19,140,181,'2014-10-07','2014-11-22'),(20,126,212,'2014-11-12','2014-11-22'),(21,171,245,'2014-11-15','2014-11-28'),(22,168,218,'2014-10-24','2014-11-30'),(23,186,201,'2014-10-08','2014-11-27'),(24,167,229,'2014-11-05','2014-11-30'),(25,145,177,'2014-11-16','2014-11-24'),(26,136,169,'2014-10-06','2014-11-24'),(27,122,192,'2014-10-31','2014-11-28'),(28,189,152,'2014-10-30','2014-11-25'),(29,170,161,'2014-10-17','2014-11-27'),(30,122,166,'2014-10-22','2014-11-25'),(31,168,225,'2014-10-15','2014-11-25'),(32,140,235,'2014-11-15','2014-11-27'),(33,201,172,'2014-10-31','2014-11-27'),(34,174,194,'2014-10-28','2014-11-30'),(35,126,232,'2014-10-15','2014-11-27'),(36,181,161,'2014-10-20','2014-11-28'),(37,171,246,'2014-10-25','2014-11-30'),(38,106,205,'2014-10-10','2014-11-25'),(39,171,191,'2014-10-06','2014-11-26'),(40,187,211,'2014-10-09','2014-11-30'),(41,126,203,'2014-10-22','2014-11-30'),(42,171,207,'2014-10-06','2014-11-23'),(43,124,217,'2014-10-30','2014-11-30'),(44,135,238,'2014-10-03','2014-11-28'),(45,172,215,'2014-11-10','2014-11-25'),(46,202,190,'2014-10-03','2014-11-27'),(47,188,215,'2014-10-09','2014-11-24'),(48,166,195,'2014-11-07','2014-11-23'),(49,109,219,'2014-11-05','2014-11-29'),(50,157,190,'2014-10-04','2014-11-23'),(51,196,170,'2014-11-16','2014-11-23'),(52,192,228,'2014-11-15','2014-11-29'),(53,174,184,'2014-10-12','2014-11-22'),(54,115,247,'2014-11-16','2014-11-22'),(55,134,233,'2014-11-20','2014-11-25'),(56,154,197,'2014-10-29','2014-11-30'),(57,145,211,'2014-11-07','2014-11-24'),(58,146,173,'2014-11-13','2014-11-22'),(59,162,163,'2014-11-15','2014-11-23'),(60,167,201,'2014-10-28','2014-11-25'),(61,138,241,'2014-11-18','2014-11-24'),(62,128,181,'2014-10-08','2014-11-28'),(63,196,162,'2014-10-09','2014-11-25'),(64,142,238,'2014-10-29','2014-11-23'),(65,200,229,'2014-10-20','2014-11-23'),(66,114,197,'2014-10-18','2014-11-30'),(67,170,233,'2014-10-28','2014-11-22'),(68,143,167,'2014-11-09','2014-11-26'),(69,160,219,'2014-10-04','2014-11-26'),(70,161,190,'2014-10-10','2014-11-28'),(71,156,183,'2014-10-25','2014-11-29'),(72,130,155,'2014-10-25','2014-11-28'),(73,146,201,'2014-11-18','2014-11-22'),(74,106,237,'2014-11-03','2014-11-22'),(75,134,178,'2014-10-11','2014-11-27'),(76,153,230,'2014-10-01','2014-11-24'),(77,157,227,'2014-11-14','2014-11-24'),(78,130,216,'2014-11-02','2014-11-28'),(79,197,173,'2014-10-26','2014-11-30'),(80,199,211,'2014-10-18','2014-11-23'),(81,110,194,'2014-11-15','2014-11-25'),(82,200,219,'2014-10-07','2014-11-30'),(83,203,192,'2014-10-13','2014-11-24'),(84,183,235,'2014-11-19','2014-11-29'),(85,116,241,'2014-10-21','2014-11-27'),(86,148,162,'2014-11-14','2014-11-29'),(87,118,184,'2014-11-12','2014-11-30'),(88,130,185,'2014-11-14','2014-11-27'),(89,124,171,'2014-10-05','2014-11-25'),(90,140,228,'2014-10-29','2014-11-22'),(91,139,238,'2014-10-27','2014-11-27'),(92,168,234,'2014-11-18','2014-11-28'),(93,152,241,'2014-10-21','2014-11-22'),(94,147,245,'2014-10-19','2014-11-30'),(95,151,224,'2014-10-29','2014-11-29'),(96,168,151,'2014-11-18','2014-11-25'),(97,199,239,'2014-10-21','2014-11-22'),(98,127,158,'2014-11-10','2014-11-27'),(99,124,200,'2014-10-19','2014-11-29'),(100,178,222,'2014-10-29','2014-11-28');
/*!40000 ALTER TABLE `bidding` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  `isDeleted` int(11) DEFAULT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Electronics','../uploadedImages/electronics.PNG',0),(2,'Fashion','../uploadedImages/fashion.jpg',0),(3,'Home & Garden','../uploadedImages/home_and_garden.PNG',0),(4,'Sporting Goods','../uploadedImages/sporting-goods.PNG',0),(5,'Toys & Hobbies','../uploadedImages/toys_and_hobbies.PNG',0),(6,'kkk',NULL,0),(7,'pranav',NULL,0),(8,'joel',NULL,0);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `history` (
  `historyId` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `sellerId` int(11) NOT NULL,
  `sellingDate` date DEFAULT NULL,
  PRIMARY KEY (`historyId`),
  KEY `customer_history_map_idx` (`customerId`),
  KEY `seller_history_map_idx` (`sellerId`),
  KEY `product_history_map_idx` (`productId`),
  CONSTRAINT `customer_history_map` FOREIGN KEY (`customerId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `product_history_map` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `seller_history_map` FOREIGN KEY (`sellerId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=201 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (101,192,188,114,'2015-03-21'),(102,205,172,173,'2014-04-30'),(103,245,204,147,'2015-08-25'),(104,166,157,168,'2013-11-25'),(105,159,143,151,'2015-05-17'),(106,164,161,150,'2014-04-06'),(107,250,200,152,'2014-10-12'),(108,246,186,116,'2015-09-21'),(109,248,161,128,'2015-04-16'),(110,238,182,139,'2014-05-18'),(111,164,128,199,'2014-07-19'),(112,240,124,121,'2013-12-18'),(113,203,204,160,'2013-12-21'),(114,222,110,122,'2015-11-06'),(115,164,127,185,'2015-05-16'),(116,164,168,193,'2015-05-27'),(117,209,197,160,'2014-02-16'),(118,170,112,189,'2014-03-29'),(119,174,106,181,'2014-05-22'),(120,222,155,201,'2014-02-12'),(121,193,107,200,'2013-12-01'),(122,227,180,133,'2015-01-13'),(123,189,112,183,'2014-03-10'),(124,154,118,198,'2013-12-04'),(125,162,137,181,'2014-12-02'),(126,154,197,184,'2014-01-13'),(127,199,193,143,'2014-11-12'),(128,197,131,106,'2014-01-12'),(129,196,144,117,'2014-03-08'),(130,233,140,191,'2015-04-16'),(131,176,198,146,'2015-01-13'),(132,224,146,187,'2014-11-18'),(133,167,202,146,'2015-03-25'),(134,208,198,195,'2014-04-13'),(135,237,158,168,'2014-08-15'),(136,200,135,143,'2013-12-14'),(137,221,195,153,'2014-06-14'),(138,228,183,109,'2015-07-05'),(139,229,192,153,'2015-04-19'),(140,249,188,124,'2014-12-22'),(141,244,174,155,'2014-03-21'),(142,156,187,193,'2015-10-27'),(143,238,203,186,'2015-06-12'),(144,180,203,165,'2015-09-20'),(145,201,127,198,'2014-09-30'),(146,241,185,171,'2015-01-06'),(147,180,132,174,'2015-03-02'),(148,198,177,123,'2014-07-16'),(149,191,193,148,'2014-02-17'),(150,243,147,135,'2015-01-30'),(151,196,176,192,'2013-11-22'),(152,213,180,128,'2014-12-14'),(153,202,165,112,'2015-08-16'),(154,194,178,200,'2014-01-13'),(155,227,133,171,'2015-09-28'),(156,189,160,191,'2014-04-12'),(157,159,160,202,'2013-12-05'),(158,198,117,174,'2015-04-08'),(159,226,121,201,'2014-11-11'),(160,248,159,193,'2015-09-13'),(161,189,134,157,'2014-05-17'),(162,175,106,153,'2014-01-29'),(163,239,113,135,'2014-11-25'),(164,201,160,119,'2015-07-03'),(165,227,200,149,'2014-03-03'),(166,218,112,112,'2015-04-02'),(167,215,195,182,'2015-05-21'),(168,169,130,117,'2015-01-28'),(169,250,175,201,'2014-02-20'),(170,238,184,146,'2014-05-03'),(171,219,153,193,'2015-08-20'),(172,224,110,135,'2015-06-09'),(173,154,110,165,'2014-12-02'),(174,247,169,112,'2015-07-02'),(175,233,117,153,'2015-02-13'),(176,236,161,199,'2014-11-15'),(177,172,180,192,'2014-06-07'),(178,162,129,196,'2015-09-18'),(179,210,204,159,'2015-03-30'),(180,193,126,201,'2014-02-22'),(181,210,124,145,'2015-10-06'),(182,156,158,121,'2015-03-21'),(183,204,170,189,'2014-02-07'),(184,157,117,204,'2015-05-07'),(185,171,126,178,'2015-06-30'),(186,162,195,110,'2015-10-02'),(187,192,141,148,'2014-03-14'),(188,191,194,182,'2014-12-30'),(189,182,173,172,'2015-03-18'),(190,230,132,149,'2014-02-27'),(191,207,204,129,'2015-09-30'),(192,223,117,147,'2015-01-22'),(193,222,146,197,'2014-08-31'),(194,181,157,157,'2014-09-12'),(195,222,182,201,'2014-12-30'),(196,217,150,145,'2013-12-26'),(197,216,188,178,'2014-01-28'),(198,170,127,178,'2015-04-24'),(199,250,184,142,'2014-12-01'),(200,157,156,117,'2014-10-05');
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_condition`
--

DROP TABLE IF EXISTS `item_condition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_condition` (
  `conditionId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`conditionId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_condition`
--

LOCK TABLES `item_condition` WRITE;
/*!40000 ALTER TABLE `item_condition` DISABLE KEYS */;
INSERT INTO `item_condition` VALUES (1,'New'),(2,'Refurbished');
/*!40000 ALTER TABLE `item_condition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `productId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `productType` int(11) NOT NULL,
  `subCategoryId` int(11) NOT NULL,
  `itemCondition` int(11) NOT NULL,
  `basePrice` float DEFAULT NULL,
  `sellerId` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `isDeleted` int(11) DEFAULT NULL,
  PRIMARY KEY (`productId`),
  KEY `subCategory_mapping_idx` (`subCategoryId`),
  KEY `sellerId_mapping_idx` (`sellerId`),
  KEY `productType_mapping_idx` (`productType`),
  KEY `itemCondition_mapping_idx` (`itemCondition`),
  CONSTRAINT `itemCondition_mapping` FOREIGN KEY (`itemCondition`) REFERENCES `item_condition` (`conditionId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `productType_mapping` FOREIGN KEY (`productType`) REFERENCES `product_type` (`typeId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `sellerId_mapping` FOREIGN KEY (`sellerId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `subCategory_mapping` FOREIGN KEY (`subCategoryId`) REFERENCES `sub_category` (`subCategoryId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=251 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (151,'Phasellus Elit Corporation','pharetra, felis eget varius ultrices, mauris',1,44,1,446,133,'null',28,1),(152,'Lorem Vehicula Corp.','Cum sociis natoque penatibus',2,7,2,860,201,'null',43,0),(153,'Diam Company','placerat. Cras dictum ultricies ligula.',2,68,1,684,172,'null',15,0),(154,'Suspendisse Eleifend Consulting','egestas. Aliquam nec enim. Nunc ut erat. Sed nunc est,',2,6,1,557,170,'null',13,1),(155,'Arcu Consulting','elit elit fermentum',1,97,1,718,143,'null',36,0),(156,'Praesent Interdum Foundation','neque tellus, imperdiet non,',2,33,1,543,177,'null',3,0),(157,'Pulvinar Ltd','ut erat. Sed nunc est, mollis non, cursus non,',1,78,2,131,111,'null',14,0),(158,'Donec Company','malesuada vel, venenatis vel, faucibus id, libero. Donec',2,19,1,283,135,'null',23,0),(159,'Libero LLC','id ante dictum cursus. Nunc',1,85,2,669,184,'null',4,0),(160,'Adipiscing Corporation','varius ultrices,',1,36,1,719,167,'null',14,0),(161,'Risus Odio Incorporated','natoque penatibus et magnis dis parturient montes, nascetur',2,68,1,884,196,'null',14,0),(162,'Suspendisse Associates','auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare lectus',2,75,2,832,159,'null',21,1),(163,'Rutrum Magna Cras LLP','ut quam vel sapien imperdiet ornare. In faucibus.',1,74,1,576,132,'null',16,0),(164,'Mollis Associates','adipiscing lobortis risus. In',2,32,1,834,201,'null',3,1),(165,'Convallis Inc.','ac mi eleifend egestas. Sed',1,24,1,713,150,'null',49,1),(166,'Sed Limited','massa. Quisque porttitor',1,65,1,537,202,'null',28,0),(167,'Vulputate Velit Eu Foundation','Donec elementum, lorem ut aliquam iaculis, lacus pede sagittis augue,',2,68,1,700,199,'null',21,1),(168,'Diam Dictum Associates','luctus felis purus ac tellus. Suspendisse sed dolor. Fusce',1,73,1,858,156,'null',21,1),(169,'Nec Ligula Incorporated','amet ante. Vivamus non lorem vitae',1,61,2,705,183,'null',3,0),(170,'Cursus Vestibulum Mauris LLP','vitae diam. Proin dolor. Nulla semper tellus',1,15,2,436,177,'null',45,1),(171,'Odio Inc.','Sed molestie. Sed id risus quis diam',1,74,2,829,178,'null',43,0),(172,'Lectus Pede Foundation','iaculis odio. Nam',2,12,2,703,176,'null',25,1),(173,'Et Magna Ltd','Curabitur',1,90,2,353,171,'null',14,1),(174,'Nec Enim Industries','pretium neque. Morbi quis',1,64,2,949,174,'null',50,0),(175,'Aliquet Proin Velit Consulting','non,',1,82,1,597,150,'null',50,1),(176,'Eu Arcu Associates','lobortis tellus justo sit amet nulla. Donec',1,34,2,702,196,'null',21,1),(177,'Erat Vel Associates','In condimentum. Donec at arcu. Vestibulum ante',2,1,1,382,173,'null',36,0),(178,'Nunc Sit Amet Associates','magna. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam',2,43,2,874,111,'null',3,0),(179,'Eu Industries','felis eget varius ultrices, mauris ipsum',1,29,1,767,173,'null',25,0),(180,'Sed Dui Fusce Consulting','Nunc quis',2,45,1,644,180,'null',6,0),(181,'A Industries','vel, convallis in, cursus et,',1,57,2,703,169,'null',27,1),(182,'Vitae Odio Associates','nibh. Aliquam',2,97,2,521,160,'null',20,1),(183,'Eu Metus Consulting','tristique senectus et netus et malesuada fames ac',1,50,2,150,117,'null',21,1),(184,'Orci Lobortis Augue Consulting','Sed nec metus facilisis lorem tristique',2,11,2,708,142,'null',9,1),(185,'Semper Auctor Mauris LLC','egestas. Sed pharetra, felis eget varius',1,8,2,465,168,'null',12,0),(186,'Ac Urna Limited','luctus felis',2,9,2,739,121,'null',3,1),(187,'Aliquam Ornare LLC','vestibulum massa rutrum magna. Cras convallis convallis',1,34,1,961,154,'null',22,1),(188,'Enim Institute','eu',2,1,2,504,142,'null',41,0),(189,'Ut Tincidunt Vehicula LLP','id risus quis diam luctus lobortis. Class',1,85,2,856,168,'null',18,0),(190,'Eu Dui Cum LLP','vitae',2,61,2,590,111,'null',25,1),(191,'Imperdiet Ullamcorper Duis Incorporated','adipiscing, enim mi tempor lorem, eget mollis',1,20,1,374,201,'null',6,0),(192,'Nunc Sed Institute','senectus et netus et malesuada fames ac turpis',1,1,1,392,138,'null',26,0),(193,'Lobortis Consulting','tellus, imperdiet',2,33,1,330,150,'null',5,0),(194,'Tempus Corporation','erat,',1,88,2,607,143,'null',46,1),(195,'Nascetur Ridiculus Corp.','Donec feugiat metus sit amet ante. Vivamus non lorem vitae',1,28,2,105,150,'null',7,1),(196,'Fusce Feugiat Lorem Corporation','non dui',2,49,1,242,166,'null',5,0),(197,'Hendrerit Inc.','neque pellentesque massa',1,89,1,375,165,'null',44,0),(198,'Egestas Corp.','ac risus. Morbi metus.',2,62,1,925,190,'null',43,1),(199,'Ligula Donec Luctus Incorporated','magnis dis parturient montes, nascetur ridiculus mus.',2,65,1,863,178,'null',18,1),(200,'Molestie In Tempus LLP','Maecenas iaculis aliquet',2,20,1,202,149,'null',48,1),(201,'Cum Sociis Natoque Foundation','ut erat. Sed nunc',2,10,2,279,108,'null',7,1),(202,'Dapibus Rutrum Corp.','dictum',2,26,2,222,120,'null',38,0),(203,'Aliquam Enim Nec Foundation','Maecenas mi felis, adipiscing fringilla,',1,25,2,161,151,'null',5,0),(204,'Sed Malesuada Institute','neque sed sem egestas',2,65,2,391,175,'null',47,1),(205,'Ipsum Non LLC','risus varius orci, in consequat enim diam vel arcu. Curabitur',2,88,1,353,116,'null',13,0),(206,'In Sodales PC','Nulla facilisis. Suspendisse commodo tincidunt nibh. Phasellus nulla. Integer',1,29,1,238,196,'null',33,0),(207,'Pede Inc.','eu, placerat',2,31,2,637,130,'null',34,1),(208,'Turpis Associates','sem ut cursus luctus, ipsum leo',2,37,1,113,181,'null',31,1),(209,'Cursus Corporation','non justo.',1,73,2,375,122,'null',2,1),(210,'Vel Lectus Cum Consulting','lorem eu metus. In lorem. Donec elementum, lorem',1,55,1,242,192,'null',14,1),(211,'Eget Consulting','arcu eu odio tristique pharetra.',1,67,1,977,168,'null',26,0),(212,'Mauris LLC','Etiam bibendum',1,81,2,278,146,'null',22,0),(213,'Est Ac Facilisis Limited','nec orci. Donec nibh. Quisque nonummy',2,87,1,180,162,'null',22,1),(214,'Ut Corp.','vitae velit egestas lacinia.',2,85,2,917,143,'null',11,1),(215,'Lorem Consulting','egestas lacinia.',2,12,2,358,205,'null',40,0),(216,'Ipsum Dolor Limited','elit, dictum eu, eleifend nec, malesuada ut,',2,85,2,998,161,'null',39,0),(217,'Faucibus Orci Luctus Consulting','nisi magna sed dui. Fusce',1,91,1,645,190,'null',29,1),(218,'Ac Nulla In Incorporated','non, dapibus rutrum, justo.',1,32,1,464,186,'null',39,1),(219,'Sit Amet Inc.','dictum',2,50,2,223,202,'null',37,1),(220,'Morbi Sit Amet Associates','mollis.',2,81,2,600,127,'null',42,1),(221,'Etiam Gravida Molestie Limited','vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu.',2,95,2,210,178,'null',33,1),(222,'Pede Ac Urna Corporation','Ut nec urna',2,94,2,851,181,'null',1,1),(223,'Lobortis Nisi Corporation','netus et malesuada fames ac turpis',2,30,2,382,115,'null',31,1),(224,'Non Quam Incorporated','metus. In lorem. Donec',1,64,1,705,127,'null',24,1),(225,'Cubilia Curae; Phasellus Industries','pharetra.',1,55,2,438,161,'null',18,0),(226,'Magnis Corporation','in,',1,1,2,445,137,'null',25,0),(227,'Class Institute','sit',1,49,1,801,156,'null',33,0),(228,'Nulla Ltd','Ut',2,16,2,923,171,'null',42,0),(229,'Fringilla Cursus Purus LLC','sit amet, consectetuer adipiscing elit. Curabitur sed',2,93,1,404,183,'null',6,1),(230,'Mauris Eu Corp.','facilisis eget, ipsum. Donec sollicitudin',1,59,1,160,200,'null',24,1),(231,'In Faucibus Incorporated','et nunc.',1,54,2,471,157,'null',35,0),(232,'Metus Aliquam Institute','dui augue eu tellus.',2,3,2,879,143,'null',5,1),(233,'Lacus Etiam PC','varius orci, in consequat enim',1,43,1,723,144,'null',1,1),(234,'Sed Associates','elit, pharetra ut, pharetra sed, hendrerit a, arcu. Sed et',1,66,1,115,161,'null',38,0),(235,'Lectus Convallis Est LLC','pharetra nibh. Aliquam ornare, libero at',1,70,1,162,147,'null',45,0),(236,'Ac Mi Eleifend Associates','sem.',2,50,1,499,196,'null',14,1),(237,'Metus Inc.','molestie. Sed id risus quis diam luctus',1,38,2,432,143,'null',50,1),(238,'Amet Institute','neque sed',2,58,1,881,183,'null',8,1),(239,'Nulla LLC','In',2,3,1,229,189,'null',29,1),(240,'Suspendisse Incorporated','habitant morbi tristique senectus et',1,42,2,638,146,'null',28,1),(241,'Placerat Velit PC','ornare.',2,62,1,685,141,'null',2,1),(242,'Neque Nullam Company','lacinia mattis. Integer eu lacus. Quisque',2,95,1,610,144,'null',30,0),(243,'Tristique Ac Eleifend Consulting','ipsum primis in faucibus orci luctus',2,54,2,470,136,'null',3,0),(244,'Iaculis Nec Eleifend Corporation','Quisque fringilla euismod enim. Etiam',1,35,2,762,199,'null',12,1),(245,'Semper Nam PC','Ut tincidunt vehicula risus. Nulla eget',2,5,2,800,133,'null',25,1),(246,'Facilisi Ltd','et libero. Proin mi.',2,70,2,671,158,'null',27,0),(247,'Duis Gravida Praesent Associates','pharetra sed, hendrerit a, arcu. Sed et libero. Proin',1,44,1,983,203,'null',27,0),(248,'Tincidunt Tempus Risus Inc.','et, lacinia vitae, sodales at, velit. Pellentesque ultricies',1,40,2,283,162,'null',26,1),(249,'Id Foundation','sagittis augue, eu tempor erat neque non quam.',2,6,2,910,202,'null',33,0),(250,'Non Arcu Associates','Phasellus in felis. Nulla tempor augue',2,74,2,212,149,'null',24,0);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_type`
--

DROP TABLE IF EXISTS `product_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_type` (
  `typeId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`typeId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_type`
--

LOCK TABLES `product_type` WRITE;
/*!40000 ALTER TABLE `product_type` DISABLE KEYS */;
INSERT INTO `product_type` VALUES (1,'New'),(2,'Refurbished');
/*!40000 ALTER TABLE `product_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviews` (
  `reviewId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `review` varchar(255) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`reviewId`),
  KEY `product_mapping_idx` (`productId`),
  KEY `user_mapping_idx` (`userId`),
  CONSTRAINT `product_mapping` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_mapping` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=201 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (101,126,189,'imperdiet non, vestibulum nec,',5,'2014-11-11'),(102,112,250,'ullamcorper',1,'2015-09-22'),(103,204,181,'sit amet, faucibus ut, nulla. Cras eu tellus',1,'2014-07-30'),(104,172,154,'cursus et, eros. Proin ultrices. Duis volutpat nunc sit amet',4,'2014-09-25'),(105,184,169,'Vestibulum ut eros non enim commodo hendrerit. Donec porttitor',3,'2015-08-22'),(106,133,248,'amet, dapibus id, blandit at,',1,'2014-10-25'),(107,200,187,'posuere at, velit. Cras lorem lorem,',5,'2013-11-27'),(108,128,224,'mus. Proin vel nisl. Quisque fringilla euismod enim. Etiam gravida',3,'2015-04-17'),(109,106,182,'eget massa. Suspendisse eleifend.',2,'2013-12-23'),(110,168,212,'Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam',5,'2014-12-15'),(111,113,164,'eget, volutpat ornare, facilisis eget, ipsum. Donec sollicitudin adipiscing',5,'2015-06-25'),(112,167,205,'lorem,',4,'2014-08-24'),(113,194,247,'tellus. Aenean egestas hendrerit neque. In ornare sagittis',1,'2014-03-17'),(114,163,165,'Aliquam auctor, velit',3,'2014-05-10'),(115,113,231,'nonummy ultricies ornare, elit elit fermentum risus, at fringilla',3,'2015-01-15'),(116,169,223,'tortor, dictum eu, placerat eget,',3,'2015-04-27'),(117,122,217,'laoreet lectus quis',4,'2015-03-02'),(118,107,225,'faucibus id, libero.',1,'2013-12-01'),(119,158,208,'ipsum dolor sit amet, consectetuer adipiscing elit.',1,'2014-10-30'),(120,124,156,'amet ultricies sem magna',5,'2015-08-01'),(121,185,213,'commodo at, libero.',3,'2015-03-15'),(122,203,194,'volutpat. Nulla',3,'2014-03-12'),(123,198,201,'metus.',2,'2014-03-08'),(124,198,202,'neque. In ornare sagittis felis.',5,'2014-02-18'),(125,137,247,'vitae odio sagittis semper. Nam tempor',3,'2015-08-14'),(126,107,187,'urna justo faucibus lectus,',4,'2015-10-14'),(127,154,176,'condimentum. Donec at arcu. Vestibulum ante',5,'2014-09-29'),(128,111,176,'dictum sapien. Aenean massa. Integer vitae nibh. Donec est mauris,',5,'2014-09-04'),(129,115,155,'ut, sem. Nulla interdum. Curabitur dictum. Phasellus in felis.',2,'2014-05-01'),(130,116,162,'enim non nisi. Aenean eget metus. In',5,'2014-02-09'),(131,158,171,'Ut sagittis lobortis mauris.',2,'2014-06-13'),(132,130,165,'a nunc. In at pede. Cras vulputate',3,'2015-01-13'),(133,155,154,'odio. Aliquam vulputate ullamcorper',2,'2015-06-06'),(134,113,247,'convallis convallis',2,'2015-01-17'),(135,174,175,'Aliquam ornare, libero at auctor ullamcorper, nisl arcu',2,'2014-08-27'),(136,108,174,'scelerisque scelerisque',5,'2013-12-11'),(137,188,189,'sagittis felis. Donec tempor, est ac mattis semper,',5,'2014-07-20'),(138,111,191,'Duis sit amet diam eu dolor egestas rhoncus.',4,'2014-10-13'),(139,145,235,'eleifend.',5,'2014-08-09'),(140,173,235,'Proin vel arcu eu odio',3,'2014-09-23'),(141,144,183,'Proin',2,'2015-04-23'),(142,166,231,'accumsan sed, facilisis vitae, orci.',1,'2015-08-17'),(143,144,211,'lorem lorem, luctus ut, pellentesque eget, dictum',5,'2015-09-07'),(144,115,193,'Aenean eget magna.',5,'2015-04-04'),(145,144,175,'Nunc sollicitudin commodo',2,'2014-01-07'),(146,197,159,'Vestibulum ut eros non enim commodo',4,'2015-02-05'),(147,110,216,'turpis vitae purus gravida sagittis. Duis gravida. Praesent eu nulla',2,'2013-12-18'),(148,173,235,'lacus.',3,'2014-02-07'),(149,201,227,'semper',3,'2014-03-25'),(150,145,249,'dapibus gravida.',2,'2015-04-07'),(151,151,160,'magna. Sed eu eros. Nam consequat dolor vitae dolor.',5,'2014-04-24'),(152,190,235,'Nulla eu neque',4,'2015-09-04'),(153,146,209,'et ultrices posuere cubilia Curae; Donec tincidunt.',3,'2015-07-10'),(154,165,248,'In faucibus. Morbi vehicula. Pellentesque tincidunt tempus risus. Donec',2,'2014-05-21'),(155,153,192,'Donec est mauris,',1,'2015-05-03'),(156,148,199,'est, vitae sodales nisi magna sed dui.',1,'2015-01-24'),(157,138,233,'a neque. Nullam ut nisi a odio semper cursus.',1,'2014-08-06'),(158,181,205,'ultricies',5,'2015-09-18'),(159,194,200,'Duis volutpat nunc sit amet metus. Aliquam erat',2,'2014-08-11'),(160,143,167,'ligula. Nullam',1,'2015-08-23'),(161,131,168,'Integer id magna et',1,'2014-02-12'),(162,202,151,'ac, feugiat non, lobortis',3,'2014-10-24'),(163,155,245,'a purus. Duis elementum, dui quis accumsan',4,'2015-05-10'),(164,156,204,'quis massa. Mauris vestibulum, neque sed dictum eleifend, nunc risus',4,'2015-02-25'),(165,126,176,'ultricies sem magna nec quam. Curabitur vel lectus.',5,'2014-03-16'),(166,180,176,'consectetuer ipsum',5,'2015-10-10'),(167,163,211,'amet, dapibus id, blandit',4,'2015-02-26'),(168,171,176,'Morbi vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac',1,'2014-10-01'),(169,120,210,'Morbi sit amet massa. Quisque porttitor eros nec tellus. Nunc',3,'2014-11-26'),(170,161,230,'Aliquam vulputate ullamcorper magna. Sed eu eros. Nam',3,'2015-08-02'),(171,191,236,'hendrerit consectetuer, cursus et, magna. Praesent interdum ligula eu enim.',4,'2014-01-02'),(172,118,168,'ullamcorper, velit',2,'2015-01-13'),(173,165,155,'sed, hendrerit a, arcu. Sed et libero. Proin mi.',1,'2015-10-16'),(174,166,162,'sem egestas blandit. Nam nulla magna,',5,'2015-10-24'),(175,170,192,'turpis. In condimentum. Donec at arcu. Vestibulum ante ipsum',4,'2014-09-24'),(176,133,191,'Proin dolor. Nulla semper tellus id nunc interdum feugiat.',5,'2015-03-07'),(177,204,182,'sit amet metus. Aliquam',4,'2014-09-14'),(178,192,180,'lobortis augue scelerisque',3,'2014-11-03'),(179,136,249,'mi lorem, vehicula et, rutrum eu, ultrices sit amet,',2,'2014-02-09'),(180,205,151,'est tempor bibendum. Donec felis orci, adipiscing non, luctus',2,'2014-01-24'),(181,198,206,'Pellentesque ut ipsum ac mi eleifend egestas.',4,'2014-10-23'),(182,197,232,'lorem, auctor quis, tristique ac, eleifend vitae, erat.',3,'2014-01-29'),(183,118,195,'Maecenas malesuada fringilla est. Mauris eu',5,'2013-12-15'),(184,159,156,'auctor, nunc nulla vulputate dui, nec tempus mauris erat eget',3,'2014-08-31'),(185,151,152,'Morbi accumsan laoreet ipsum. Curabitur consequat, lectus sit',2,'2015-08-19'),(186,154,191,'orci, adipiscing non, luctus sit amet,',1,'2014-07-31'),(187,153,207,'lectus convallis est, vitae sodales',1,'2015-06-02'),(188,137,226,'bibendum ullamcorper. Duis cursus, diam at pretium aliquet, metus',2,'2013-11-26'),(189,123,195,'sem, vitae aliquam eros turpis non enim. Mauris quis',5,'2014-08-02'),(190,116,181,'mi',1,'2014-04-21'),(191,201,205,'non, sollicitudin a, malesuada id, erat. Etiam vestibulum massa rutrum',5,'2014-07-10'),(192,203,156,'risus odio, auctor vitae, aliquet nec, imperdiet nec, leo. Morbi',4,'2015-03-08'),(193,199,156,'ligula elit, pretium et, rutrum non, hendrerit',2,'2014-09-26'),(194,129,220,'et tristique',4,'2014-04-20'),(195,137,236,'sociis natoque penatibus et',3,'2015-10-26'),(196,106,189,'mollis. Duis sit amet diam eu',4,'2013-11-26'),(197,142,183,'vulputate velit eu sem. Pellentesque ut ipsum',4,'2015-06-10'),(198,190,249,'urna,',2,'2014-02-19'),(199,156,176,'Suspendisse aliquet molestie tellus.',5,'2014-04-05'),(200,117,172,'lorem, auctor quis, tristique',1,'2014-09-04');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_cart`
--

DROP TABLE IF EXISTS `shopping_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shopping_cart` (
  `cartId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  PRIMARY KEY (`cartId`),
  KEY `user_cart_mapping_idx` (`userId`),
  KEY `product_cart_mapping_idx` (`productId`),
  CONSTRAINT `product_cart_mapping` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_cart_mapping` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_cart`
--

LOCK TABLES `shopping_cart` WRITE;
/*!40000 ALTER TABLE `shopping_cart` DISABLE KEYS */;
INSERT INTO `shopping_cart` VALUES (1,151,198),(2,123,194),(3,195,170),(4,127,222),(5,113,164),(6,119,203),(7,165,235),(8,178,180),(9,166,194),(10,174,225),(11,116,230),(12,126,238),(13,148,172),(14,109,218),(15,115,220),(16,192,198),(17,124,241),(18,112,186),(19,182,250),(20,156,225),(21,128,192),(22,189,178),(23,141,199),(24,135,198),(25,197,228),(26,189,243),(27,154,193),(28,184,232),(29,178,159),(30,109,222),(31,202,214),(32,145,203),(33,131,152),(34,133,201),(35,163,174),(36,153,212),(37,184,199),(38,119,222),(39,156,218),(40,177,215),(41,197,202),(42,182,182),(43,173,225),(44,123,175),(45,130,216),(46,183,214),(47,204,221),(48,123,167),(49,192,203),(50,163,225),(51,188,181),(52,185,200),(53,192,199),(54,178,238),(55,186,174),(56,125,229),(57,193,183),(58,191,232),(59,113,245),(60,192,175),(61,132,235),(62,190,151),(63,182,197),(64,106,186),(65,154,188),(66,172,213),(67,183,234),(68,139,171),(69,160,248),(70,135,206),(71,150,208),(72,174,233),(73,157,221),(74,106,154),(75,140,185),(76,154,176),(77,145,247),(78,191,204),(79,133,164),(80,187,192),(81,147,180),(82,125,237),(83,133,209),(84,196,155),(85,120,193),(86,118,223),(87,154,243),(88,146,227),(89,137,213),(90,142,237),(91,155,197),(92,187,156),(93,172,197),(94,199,231),(95,205,166),(96,201,194),(97,184,154),(98,159,183),(99,142,192),(100,131,185);
/*!40000 ALTER TABLE `shopping_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_category`
--

DROP TABLE IF EXISTS `sub_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sub_category` (
  `subCategoryId` int(11) NOT NULL AUTO_INCREMENT,
  `categoryId` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `isDeleted` int(11) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`subCategoryId`),
  KEY `category_mapping_idx` (`categoryId`),
  CONSTRAINT `category_mapping` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_category`
--

LOCK TABLES `sub_category` WRITE;
/*!40000 ALTER TABLE `sub_category` DISABLE KEYS */;
INSERT INTO `sub_category` VALUES (1,5,'Dictum Augue Malesuada Corp.',1,NULL),(2,3,'Praesent Interdum Corp.',1,NULL),(3,3,'Class PC',0,NULL),(4,3,'Neque Corp.',0,NULL),(5,1,'Quis Turpis LLP',0,'../uploadedImages/Smartphones.jpg'),(6,3,'Consectetuer Limited',0,NULL),(7,4,'Sed Consulting',0,NULL),(8,4,'Purus Mauris A LLC',0,NULL),(9,3,'Ullamcorper Industries',1,NULL),(10,1,'Nullam Velit Dui Industries',0,'../uploadedImages/laptops.jpg'),(11,4,'Magna A Neque Inc.',1,NULL),(12,5,'Pharetra Ut Pharetra Institute',1,NULL),(13,5,'Eu Tempor Erat Institute',1,NULL),(14,5,'Eget Inc.',0,NULL),(15,1,'Fusce Aliquam Enim Corporation',0,'../uploadedImages/tablets.jpg'),(16,4,'Nullam Feugiat Placerat PC',0,NULL),(17,2,'Magna Inc.',1,NULL),(18,2,'Mauris A Company',1,NULL),(19,1,'Sodales At Velit Inc.',1,'../uploadedImages/tv.jpg'),(20,2,'Ullamcorper Eu Euismod Ltd',0,NULL),(21,5,'Mauris Id Company',0,NULL),(22,4,'Sodales Associates',0,NULL),(23,3,'Suspendisse Commodo Tincidunt Incorporated',0,NULL),(24,5,'Proin Mi Aliquam Inc.',1,NULL),(25,3,'Viverra Donec Tempus Associates',1,NULL),(26,1,'Aliquet LLC',1,'../uploadedImages/cameras.png'),(27,2,'A Inc.',0,NULL),(28,2,'Gravida Limited',0,NULL),(29,3,'At Consulting',0,NULL),(30,5,'Vel Convallis In Corp.',0,NULL),(31,2,'Enim Mi Tempor Associates',1,NULL),(32,1,'Suspendisse Aliquet Company',0,'../uploadedImages/Smartphones.jpg'),(33,2,'Tellus Suspendisse Institute',1,NULL),(34,2,'Nullam Lobortis Company',1,NULL),(35,1,'Nullam Inc.',1,'../uploadedImages/Smartphones.jpg'),(36,2,'Sit Institute',0,NULL),(37,4,'Eu Dolor PC',0,NULL),(38,1,'Enim LLC',0,'../uploadedImages/Smartphones.jpg'),(39,5,'Mauris Erat Eget Limited',0,NULL),(40,5,'Donec Ltd',1,NULL),(41,1,'Duis Dignissim Tempor Institute',0,'../uploadedImages/Smartphones.jpg'),(42,3,'Maecenas Malesuada Fringilla Associates',0,NULL),(43,2,'Neque Inc.',1,NULL),(44,1,'Nonummy Fusce Fermentum Ltd',0,'../uploadedImages/Smartphones.jpg'),(45,1,'Velit Eget Laoreet Corporation',0,'../uploadedImages/Smartphones.jpg'),(46,4,'Diam Incorporated',1,NULL),(47,2,'Non Sapien Incorporated',0,NULL),(48,3,'Id Ante Nunc Incorporated',0,NULL),(49,1,'Enim Nisl Elementum PC',1,'../uploadedImages/Smartphones.jpg'),(50,2,'Metus Vivamus Incorporated',0,NULL),(51,5,'Sagittis Limited',0,NULL),(52,4,'Ut Associates',0,NULL),(53,1,'Elit Dictum Eu Inc.',1,'../uploadedImages/Smartphones.jpg'),(54,2,'Fermentum Metus Aenean Corp.',0,NULL),(55,2,'In Lorem PC',1,NULL),(56,5,'Gravida Aliquam Tincidunt Corporation',0,NULL),(57,1,'Eget Lacus PC',1,'../uploadedImages/Smartphones.jpg'),(58,3,'Nibh PC',1,NULL),(59,4,'Pede Sagittis Inc.',0,NULL),(60,1,'Auctor Incorporated',1,'../uploadedImages/Smartphones.jpg'),(61,5,'Luctus Vulputate Nisi Associates',1,NULL),(62,3,'Neque Et Nunc PC',1,NULL),(63,4,'Id Mollis Nec Incorporated',0,NULL),(64,3,'Dolor Quisque Industries',0,NULL),(65,2,'Posuere Cubilia Curae; Company',1,NULL),(66,4,'Amet Corporation',1,NULL),(67,4,'Velit Sed Malesuada Corp.',0,NULL),(68,4,'Odio Consulting',0,NULL),(69,2,'Mollis Inc.',0,NULL),(70,5,'Elit A Feugiat Corp.',1,NULL),(71,5,'Lobortis Associates',0,NULL),(72,2,'Mattis Ornare Lectus LLP',1,NULL),(73,1,'Hendrerit Donec Limited',1,'../uploadedImages/Smartphones.jpg'),(74,4,'Pede Et Risus Institute',1,NULL),(75,1,'Pellentesque Incorporated',0,'../uploadedImages/Smartphones.jpg'),(76,4,'Tortor At Associates',1,NULL),(77,3,'Tortor Institute',1,NULL),(78,3,'Iaculis Aliquet Diam Institute',1,NULL),(79,5,'Pede LLC',1,NULL),(80,2,'Posuere Inc.',1,NULL),(81,2,'Velit Egestas Lacinia Ltd',1,NULL),(82,3,'Id Magna Consulting',1,NULL),(83,5,'Adipiscing Company',1,NULL),(84,1,'Magna Cras Inc.',1,'../uploadedImages/Smartphones.jpg'),(85,5,'Arcu Ltd',1,NULL),(86,4,'Placerat Eget Venenatis Inc.',1,NULL),(87,5,'Augue Porttitor Industries',0,NULL),(88,3,'Amet LLC',0,NULL),(89,3,'Hendrerit Incorporated',1,NULL),(90,1,'Eu Augue Porttitor PC',1,'../uploadedImages/Smartphones.jpg'),(91,2,'Praesent Industries',0,NULL),(92,1,'Molestie Sodales Company',1,'../uploadedImages/Smartphones.jpg'),(93,1,'Lorem Donec Corporation',0,'../uploadedImages/Smartphones.jpg'),(94,2,'Nam Ac Company',1,NULL),(95,4,'Mollis Non Cursus Corporation',0,NULL),(96,5,'Scelerisque LLP',0,NULL),(97,2,'Ac Sem Ut PC',1,NULL),(98,4,'Arcu Vel Quam Ltd',1,NULL),(99,3,'Natoque Penatibus PC',0,NULL),(100,1,'Proin Velit Sed PC',0,'../uploadedImages/Smartphones.jpg');
/*!40000 ALTER TABLE `sub_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `userName` varchar(200) NOT NULL,
  `password` varchar(45) NOT NULL,
  `city` varchar(45) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `zipCode` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `membershipId` varchar(45) DEFAULT NULL,
  `isDeleted` int(11) DEFAULT NULL,
  `lastLogin` datetime DEFAULT NULL,
  `isUserSeller` int(11) DEFAULT NULL,
  `isUserBuyer` int(11) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=207 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (5,'Vijesh','Jain','vijeshjain101@gmail.com','vijesh','San Jose','101 E. San Fernando St, Apt #441','95112',NULL,'',0,'2014-11-24 23:56:34',1,0),(106,'Evan','Rios','euismod@nonummyFuscefermentum.com','577','Thorembais-Saint-Trond','Ap #153-7545 Porttitor Avenue','16360-993',NULL,'GL0459845261187674',1,'2015-10-29 16:21:22',1,0),(107,'Tobias','Price','sit@luctusutpellentesque.ca','931','St. Catharines','849 Iaculis Street','21074',NULL,'BE10101981859585',0,'2014-05-27 04:13:55',0,1),(108,'Abel','Vance','augue@Crasconvallisconvallis.com','648','Doues','791-4010 Sed Av.','413336',NULL,'FO3121885939422786',1,'2014-11-03 12:23:50',0,0),(109,'Lucas','Lamb','In.at.pede@Nunc.ca','328','Ellesmere Port','P.O. Box 780, 4923 Tincidunt Avenue','88761',NULL,'HR1181913528027093987',0,'2014-06-12 04:56:00',1,1),(110,'Micah','Villarreal','venenatis@a.co.uk','822','Oviedo','P.O. Box 380, 7699 Cursus Rd.','CI1E 2XH',NULL,'ES1481138570638324602142',1,'2015-02-18 19:39:18',1,0),(111,'Steel','Rich','Donec.feugiat.metus@odio.com','928','Narbonne','3148 Auctor. Rd.','92862',NULL,'MT33XSLK30680042735204786664843',0,'2014-09-03 19:37:18',0,0),(112,'Jason','Hammond','tortor.at@nec.ca','199','Aschaffenburg','P.O. Box 449, 1380 Sed Rd.','45137',NULL,'MU7147894704248527684397691832',0,'2015-11-06 16:26:33',1,0),(113,'Victor','Landry','sem.eget.massa@convallisin.ca','914','João Pessoa','6602 Hendrerit St.','7854',NULL,'DO64457440757891819776449373',1,'2014-09-01 22:10:25',0,1),(114,'Dolan','Ray','Duis.elementum.dui@laciniamattisInteger.com','493','Hamme','9306 Aliquam Rd.','5026',NULL,'DE85897275919723311336',1,'2015-08-05 08:35:45',1,0),(115,'Jason','Quinn','tellus.justo@Nuncmauris.com','167','Oviedo','628-4091 Ante St.','9864',NULL,'HU27484160569501787877627650',0,'2013-12-14 21:34:28',1,0),(116,'Joseph','Battle','at@maurisblanditmattis.com','898','Lichfield','Ap #684-663 Cursus Rd.','3185',NULL,'PK0256410643198256691051',1,'2015-01-30 10:35:22',0,1),(117,'Harrison','Finch','Sed.dictum.Proin@mifringilla.net','493','Guysborough','9526 Lectus Avenue','E0M 8K6',NULL,'BH46075638307509036653',0,'2015-02-02 19:56:42',1,1),(118,'Yasir','Gill','volutpat.Nulla@purus.com','537','Springdale','926-7507 Quis, St.','70844',NULL,'MK59963310357566668',0,'2015-09-03 14:06:00',0,1),(119,'Brendan','Lindsay','pharetra@faucibusutnulla.net','493','Bovigny','193-9265 Sed, St.','4504',NULL,'AD6758208780826211840484',0,'2015-02-23 01:48:46',1,1),(120,'Solomon','Lawson','neque.Nullam.ut@Cumsociis.net','851','Thorold','223-4990 Dis Road','91120-173',NULL,'HR5694889972917072514',0,'2013-12-15 08:23:03',1,0),(121,'Quinlan','Brennan','facilisis@Nunclaoreetlectus.com','528','San Venanzo','2022 Elit. St.','1323',NULL,'MT06PGPV98607301028054531863581',1,'2014-02-07 05:51:02',1,1),(122,'Melvin','Bates','quam.elementum@tempor.org','340','Napier','559-1193 Fermentum Avenue','97815',NULL,'ME65046652002435218190',0,'2013-12-19 11:59:42',0,0),(123,'Howard','Ford','scelerisque@velvenenatisvel.ca','199','McCallum','P.O. Box 480, 3288 Et Rd.','V2W 9J8',NULL,'DE84783966309755156019',0,'2015-08-03 22:39:38',0,1),(124,'Coby','Ewing','a@sedpede.com','392','Sosnowiec','7017 Nec, Street','1879LH',NULL,'IE93KFXD48674089156199',0,'2014-03-26 17:07:45',1,1),(125,'Neil','Crosby','Pellentesque.ut@nascetur.co.uk','769','Kitchener','Ap #712-6443 Id St.','86-052',NULL,'AL81828778802063800799476390',0,'2015-01-27 14:53:46',0,0),(126,'Raphael','Burns','sapien@maurisa.ca','114','Tarrasa','252-159 Donec Rd.','8268',NULL,'ES3205687154252115164149',1,'2015-01-29 21:49:13',0,1),(127,'Guy','Simpson','Sed.nulla.ante@lobortisaugue.ca','562','Aligarh','P.O. Box 978, 2987 Ultrices. Av.','K3B 1N2',NULL,'SE1799846332153480370326',0,'2015-03-16 12:39:46',1,1),(128,'Gavin','Robinson','ultrices@enimdiam.ca','521','Lanark County','P.O. Box 945, 3847 Faucibus Rd.','08373',NULL,'SI26792465975298852',1,'2014-07-17 18:49:01',1,0),(129,'Lucas','Nash','odio@ametlorem.com','666','Reading','6861 Quis Street','05038',NULL,'PL97039215876724527516436309',0,'2014-06-06 10:32:10',1,1),(130,'Emmanuel','Oconnor','sit.amet.diam@ultricesiaculis.net','264','Hekelgem','P.O. Box 649, 2008 Quam Ave','1413',NULL,'HR7376211058340661368',0,'2014-06-15 13:38:56',0,1),(131,'Melvin','Howard','dolor@egestas.co.uk','318','Valpelline','210-8665 A Rd.','Y97 1DS',NULL,'BA964065314069687711',0,'2014-12-03 04:01:27',0,0),(132,'Baker','Doyle','arcu@elementumsemvitae.ca','642','Crescentino','2249 Convallis Street','1214',NULL,'GT05830356260031882041797747',0,'2015-01-21 10:01:13',0,1),(133,'Sebastian','Newman','penatibus.et@egestasAliquamfringilla.net','954','Lithgow','P.O. Box 262, 3451 Dapibus Ave','11116',NULL,'SM5033861979313225880799496',1,'2014-05-15 18:30:17',1,1),(134,'Baxter','Golden','Quisque.purus@Vestibulumanteipsum.edu','544','Ottawa-Carleton','471-1359 Ut Ave','93-738',NULL,'CY11880465940524971924101182',1,'2014-05-11 15:30:30',0,0),(135,'Yardley','Mcpherson','nonummy.ac@loremDonec.com','566','Brampton','9747 Orci Street','9656',NULL,'LU781852067098983826',0,'2015-10-20 22:09:16',1,0),(136,'Jackson','Middleton','nunc.risus.varius@augue.com','127','Malkajgiri','8888 Donec St.','241730',NULL,'CY09246779062661560265462003',1,'2015-07-17 01:49:24',0,1),(137,'Neil','Sanchez','nisl.Maecenas@magnaDuis.com','236','Burin','Ap #246-4872 Primis Road','689451',NULL,'ES0864151992274064229867',1,'2014-03-06 04:37:25',1,1),(138,'Neville','Delgado','Nulla.facilisis@enim.edu','255','Port Pirie','716-1996 Pede Rd.','2961',NULL,'IL707550656306072943657',1,'2014-01-19 10:00:33',1,1),(139,'Armand','Dillard','accumsan.sed.facilisis@est.com','784','Acquedolci','973-1180 Tempor St.','9186',NULL,'AT190560840794094353',0,'2015-03-24 22:18:06',1,1),(140,'Dante','Kidd','leo@maurisa.co.uk','889','Rimouski','475-4082 Dictum Avenue','TD8 8XS',NULL,'GE38580271443926257615',1,'2015-08-01 21:24:53',0,0),(141,'Alden','Hodges','primis.in.faucibus@Nuncpulvinar.edu','244','Kearny','P.O. Box 661, 8187 Est Rd.','380318',NULL,'EE379475218844735433',0,'2014-12-04 07:24:48',1,1),(142,'Emmanuel','Mcdonald','convallis.est.vitae@consectetuereuismod.ca','459','Fusignano','P.O. Box 744, 9430 Purus St.','63459-513',NULL,'TN4096320915518513662993',1,'2015-06-04 23:50:27',1,1),(143,'Chase','Livingston','interdum.Nunc.sollicitudin@libero.co.uk','584','Kingussie','P.O. Box 348, 8330 Odio. Road','40999',NULL,'LT822079182090877293',1,'2014-05-18 00:12:56',1,1),(144,'Theodore','Coleman','eu@Proineget.co.uk','342','Quimper','7829 Nec Street','1543',NULL,'DK1959365793731742',0,'2015-06-28 10:24:17',0,1),(145,'Magee','Robbins','Suspendisse.commodo@metusurna.ca','223','Brentwood','4428 Est Road','39-157',NULL,'PK9313660944204625890446',1,'2014-12-27 19:03:20',1,1),(146,'Quinn','Steele','ornare.sagittis@porttitorerosnec.org','997','Burntisland','P.O. Box 126, 2261 Sit Ave','73459-133',NULL,'SM6607473702923249877975667',0,'2015-05-30 03:40:43',1,0),(147,'Gavin','Franco','quis.urna.Nunc@dolorQuisquetincidunt.org','117','Kailua','396-1790 Quisque Rd.','85418-327',NULL,'BG82KGAK93602206653329',1,'2013-11-21 18:58:00',0,1),(148,'Kelly','Sharp','habitant.morbi@etnetuset.ca','455','Ribnitz-Damgarten','P.O. Box 964, 3943 Placerat, Road','19947',NULL,'AL33142700864178359893137814',1,'2015-05-26 14:22:33',0,0),(149,'Rahim','Knowles','sit.amet.ante@nonummy.ca','251','Borgone Susa','P.O. Box 310, 8523 Vel, Street','40-761',NULL,'NL03QTVE6725334563',1,'2015-07-24 22:52:53',1,1),(150,'Brennan','Burns','dolor.sit@arcuSed.ca','551','Medea','2204 Ac Avenue','75776',NULL,'PL77088390818942572620508108',0,'2014-05-25 14:27:08',1,1),(151,'Holmes','Justice','Cras.lorem.lorem@ametrisus.edu','829','Sasaram','Ap #223-4484 Suspendisse Road','63062',NULL,'CH7355795645466065381',0,'2014-12-19 00:31:41',1,1),(152,'Denton','Morgan','leo.Vivamus.nibh@orciinconsequat.co.uk','812','Rivello','9826 Dui Street','12402',NULL,'KW9390590912558075553408870886',1,'2015-05-09 22:52:47',0,1),(153,'Malik','Vang','nec.metus.facilisis@antedictum.com','506','Torrejón de Ardoz','Ap #977-881 Quisque Street','50997',NULL,'AZ36052571024615117205742424',0,'2013-11-28 21:16:38',0,0),(154,'Jermaine','Austin','neque@ligulaeu.co.uk','202','Putignano','727-7774 Sociis Av.','60614',NULL,'BG71PMXO29806957511256',0,'2015-01-28 06:50:44',1,0),(155,'Keegan','Bernard','adipiscing.Mauris@vitaesemper.net','152','Trowbridge','4544 Ipsum St.','H3S 4W5',NULL,'GT34754731930355741728956232',1,'2014-10-07 05:24:41',1,0),(156,'Stone','Wise','at@eget.edu','392','Millesimo','Ap #643-5732 Erat Rd.','1104',NULL,'TR691217711032046322721796',1,'2014-04-30 15:00:33',1,0),(157,'Joseph','Jordan','Curabitur.vel.lectus@loremlorem.ca','206','Tulsa','Ap #484-1819 Vulputate Street','88737',NULL,'PS504144620261464450370147141',0,'2014-03-29 00:12:59',0,1),(158,'Graiden','Barry','scelerisque.neque@velarcu.net','526','Puntarenas','P.O. Box 613, 2965 Mauris, St.','76-977',NULL,'VG1740488405851865329551',1,'2014-03-18 14:50:01',0,1),(159,'Daniel','Cain','mus.Aenean.eget@est.org','738','Bossi�re','Ap #785-1253 Nunc Rd.','254508',NULL,'AE378120963061072450371',0,'2014-05-10 22:23:48',1,1),(160,'Burton','Warner','velit.egestas@nec.ca','821','Leut','Ap #169-9491 Augue St.','3231',NULL,'IL649614804472756389954',0,'2015-10-08 14:24:53',0,0),(161,'Fulton','Little','dolor.egestas@tellusnonmagna.net','546','Zaria','2056 Est Rd.','DZ7 4EK',NULL,'SE7744905881923265816227',1,'2015-08-04 17:20:52',0,0),(162,'Scott','Sparks','lectus@pretiumneque.ca','368','Lennik','982-9090 Velit. Rd.','49297',NULL,'IL372358016183969836483',0,'2014-12-02 07:33:44',0,0),(163,'Scott','Delaney','scelerisque.sed.sapien@tincidunttempusrisus.com','119','Maglie','P.O. Box 244, 9875 Aliquet Rd.','71710',NULL,'GT12565948859766221242845553',1,'2015-05-01 20:53:35',1,0),(164,'Plato','Calhoun','nulla.at.sem@egetnisi.org','159','Gie�en','Ap #930-6062 Morbi St.','5638MN',NULL,'AE322608638606013031424',1,'2015-10-13 06:10:21',1,1),(165,'Seth','Mclaughlin','tempor@lectusCumsociis.org','827','Lokeren','3756 Feugiat St.','56321',NULL,'GR6971413873941109843404243',1,'2015-02-12 20:21:12',1,1),(166,'Dillon','Manning','justo@amet.ca','736','Eckville','9255 Neque. Rd.','TG3E 3PR',NULL,'SK6478230460981814562076',1,'2015-08-01 20:44:27',1,1),(167,'Kasimir','Hart','est.tempor@egestasa.org','187','Montebello','Ap #861-8291 Vel Avenue','6828PP',NULL,'GR8913585497218349617977985',0,'2014-04-17 07:44:16',1,0),(168,'Dieter','Bennett','Morbi.accumsan@Sedcongueelit.edu','724','Yellowhead County','4040 Et, Avenue','8480',NULL,'SE2399634518281356369745',1,'2014-06-29 18:23:54',0,1),(169,'Palmer','Simmons','malesuada@dis.com','801','Bundaberg','810 Dui Road','55-257',NULL,'GR5456515760381183065764674',1,'2014-11-10 04:03:28',1,1),(170,'Emerson','Morrow','ipsum@natoquepenatibus.co.uk','847','Gonda','633-6068 Integer Rd.','17746',NULL,'MU8791743070382234094074129202',1,'2014-05-11 11:28:44',0,0),(171,'Cruz','Castaneda','urna.nec@Duis.ca','507','Dunstable','9040 Velit Ave','71709',NULL,'IE08DZAH23842042227619',0,'2014-12-21 23:06:19',0,0),(172,'Clarke','Fitzgerald','montes.nascetur.ridiculus@amet.com','465','Ghislarengo','P.O. Box 287, 6086 Donec St.','320210',NULL,'HU89110767717672901780030851',0,'2015-06-20 04:05:08',0,1),(173,'Valentine','Tillman','facilisis@ligulaconsectetuerrhoncus.edu','662','Brussel','P.O. Box 437, 3174 Mi Av.','07987',NULL,'PK6124115163438756059522',1,'2015-09-18 20:36:25',0,1),(174,'Tad','Graham','porttitor.scelerisque.neque@ligula.ca','466','Ludlow','2803 Venenatis St.','454333',NULL,'MK28763771850294392',0,'2013-11-24 19:28:50',0,0),(175,'Merrill','Sanchez','Proin.vel@Fusce.com','766','Hoogstraten','Ap #858-9568 Mauris Av.','J7R 8Y2',NULL,'BG65LMWE24883191268177',1,'2015-10-19 17:25:25',0,1),(176,'Ezra','Alford','dolor.elit@ornarefacilisiseget.org','685','Brunn am Gebirge','4341 Sit Street','02967',NULL,'PT65426880173059811333342',0,'2015-06-05 05:41:51',1,1),(177,'Elton','Pierce','vitae@elementum.edu','733','Overrepen','970-2433 Duis Av.','999882',NULL,'FR2279719869160212168652528',0,'2015-09-04 10:39:58',0,1),(178,'Isaac','Barrett','velit@porttitor.edu','931','Rezé','P.O. Box 814, 2367 Donec Rd.','95022',NULL,'GB66QMMS68822966955442',1,'2015-08-04 07:43:55',1,0),(179,'William','Tate','eu@loremloremluctus.ca','315','Colmar','970-3765 Posuere Rd.','B3Y 7L4',NULL,'FO1743437260947196',0,'2015-11-12 04:50:49',1,1),(180,'Murphy','Barry','tristique.pharetra@lacusAliquam.edu','535','Langford','6099 A St.','6610',NULL,'GT88590946904569342721341009',1,'2013-12-07 18:07:14',1,1),(181,'Slade','Campbell','risus@ornaresagittisfelis.ca','268','Gorzów Wielkopolski','Ap #305-5216 Nunc Rd.','T64 8LA',NULL,'LV59URDL1547084011365',1,'2015-04-11 09:09:01',0,1),(182,'Noah','Waller','In@odiosempercursus.ca','890','Montefalcone nel Sannio','Ap #679-4641 Vel, Street','05-534',NULL,'PS572734605455004057711112391',0,'2014-06-24 09:58:18',1,1),(183,'Samuel','Mcmillan','sodales@adipiscingelit.com','301','Oordegem','539-8969 Molestie St.','60175',NULL,'MR5138731002527865502230545',1,'2014-12-25 23:49:59',0,0),(184,'Clayton','Morse','quis.diam.Pellentesque@blanditviverraDonec.com','343','Neufeld an der Leitha','4751 Imperdiet Avenue','70804-417',NULL,'GI18BMAJ229489551976491',0,'2014-03-01 01:32:46',1,0),(185,'Byron','Blackburn','hendrerit.consectetuer@imperdiet.net','614','La Thuile','3440 Libero. Ave','268537',NULL,'RO40XTKF2822747619336131',0,'2015-02-25 04:18:34',1,1),(186,'Andrew','Tucker','lorem.luctus.ut@necleo.net','250','Winterswijk','9381 Mus. Street','3236',NULL,'BE55106175884538',1,'2014-05-04 10:03:51',1,0),(187,'Todd','Stein','rutrum.lorem@sitamet.co.uk','237','Cairo Montenotte','P.O. Box 998, 8928 Leo. Ave','43732',NULL,'CR4592001470255831566',1,'2015-03-23 09:41:11',0,1),(188,'Rogan','Pacheco','tellus.justo@Loremipsum.net','554','Port Coquitlam','Ap #861-4844 Purus. Street','41819',NULL,'PK4906318292926106193862',0,'2014-08-18 03:37:44',0,1),(189,'Nicholas','Pena','turpis.egestas.Fusce@Nunc.org','384','Rotorua','4958 Tellus, Avenue','18827-373',NULL,'SE8918879359442945065552',0,'2014-06-02 10:47:41',1,1),(190,'Andrew','Stafford','Sed.pharetra@Quisqueornaretortor.net','170','Lonzee','5417 Euismod St.','30911',NULL,'BA099759141550967735',1,'2014-01-30 02:52:22',1,0),(191,'John','Phelps','a.sollicitudin.orci@sit.com','192','Borsbeek','Ap #351-2637 Nunc Av.','1085FS',NULL,'TN6935265340114499025703',0,'2015-11-20 11:20:45',1,0),(192,'Brennan','Cline','odio.a@euerosNam.org','348','Clydebank','P.O. Box 959, 9237 Ipsum St.','T73 3GJ',NULL,'LV76EJOG7980199582654',0,'2014-01-24 03:21:18',1,1),(193,'Jasper','Ellis','posuere@Vivamus.edu','513','Marsciano','948-7700 Massa. Road','71602',NULL,'ME88824395226654646426',0,'2014-10-01 21:08:44',1,0),(194,'Hoyt','Clayton','gravida.Aliquam@acurna.org','390','Mandya','P.O. Box 711, 4488 Turpis Road','71472',NULL,'AZ22467799460286886492141906',0,'2013-12-07 20:12:51',1,1),(195,'Simon','Conway','Sed@Donecnibhenim.org','936','Casperia','9795 Mattis Ave','8248',NULL,'KZ495272743923484741',1,'2013-12-22 09:53:28',1,0),(196,'Macaulay','Mayo','ultricies.ornare@congue.co.uk','336','Froidchapelle','537-856 Nec, St.','CN10 8EG',NULL,'DE90895499967357331666',1,'2014-05-16 11:21:18',0,0),(197,'Jameson','Wade','ut.erat.Sed@metusAenean.net','170','H�l�cine','Ap #161-7674 Auctor, Avenue','9747',NULL,'ES7915282897994015862622',1,'2015-03-26 12:41:47',1,0),(198,'Xanthus','Mendoza','egestas.blandit.Nam@consectetuer.co.uk','870','Gonars','P.O. Box 846, 8690 Vel Avenue','758190',NULL,'AE925127823231525834373',1,'2015-09-27 04:48:52',1,0),(199,'Lance','Hernandez','adipiscing.elit@penatibusetmagnis.com','675','Villers-le-Peuplier','233-8161 Placerat Avenue','0460TU',NULL,'GR5232075295955742880021921',1,'2015-01-01 05:12:56',0,0),(200,'Conan','Buckley','aliquet@mauriserateget.net','159','Havr�','P.O. Box 303, 7312 Aliquet St.','61202',NULL,'SA0811948943522159616743',1,'2014-05-08 09:14:38',1,0),(201,'Chaim','Goff','ultricies@nullavulputate.com','329','Kawartha Lakes','Ap #324-219 Feugiat Rd.','882204',NULL,'LU430651713846690103',0,'2015-06-07 13:16:03',0,1),(202,'Baker','Carney','euismod.mauris@inmagna.com','156','Getafe','Ap #414-5639 Sem Ave','77601',NULL,'LI8693267192798446582',0,'2014-04-30 05:45:14',0,0),(203,'Addison','Hughes','laoreet.ipsum@In.org','743','Piła','331-223 Tristique St.','6492',NULL,'LI5210963777921316579',0,'2015-02-26 06:00:04',0,0),(204,'Curran','Blair','posuere.vulputate.lacus@elitfermentumrisus.ca','171','Chapadinha','775-1017 Eget Av.','E2 8BE',NULL,'RS17392014457151489371',1,'2014-10-16 18:07:44',1,0),(205,'Ferdinand','York','auctor.velit@nunc.com','368','Watermaal-Bosvoorde','P.O. Box 651, 7998 Sed Rd.','3967',NULL,'GI47PUAK728807996413003',1,'2014-06-05 00:50:43',0,1),(206,'neeraj','kumbhar','neeraj@gmail.com','123456','','','','AL','',0,'2014-12-01 14:02:44',1,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_type`
--

DROP TABLE IF EXISTS `user_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_type` (
  `userTypeId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`userTypeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_type`
--

LOCK TABLES `user_type` WRITE;
/*!40000 ALTER TABLE `user_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-12-01 14:56:17
