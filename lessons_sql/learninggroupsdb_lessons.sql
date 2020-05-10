-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: learninggroupsdb
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `lessons`
--

DROP TABLE IF EXISTS `lessons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lessons` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `datedmy` varchar(10) NOT NULL,
  `theme` tinytext NOT NULL,
  `homework` text NOT NULL,
  `profcomment` text,
  `times` varchar(13) DEFAULT NULL,
  `filehash` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lessons`
--

LOCK TABLES `lessons` WRITE;
/*!40000 ALTER TABLE `lessons` DISABLE KEYS */;
INSERT INTO `lessons` VALUES (1,2,'22.03.2020','Суровые условия жизни мха на фоне мировой дестабилизации','Suspendisse rutrum, leo vitae ornare volutpat, risus lectus congue lacus, sed ultricies urna enim fringilla est. Maecenas semper enim velit, non vulputate ipsum porttitor nec. Nulla venenatis, quam nec lacinia facilisis, nulla metus tincidunt ex, non vehicula urna tellus at lacus.','Sed fringilla felis velit, laoreet bibendum ex ullamcorper eget.','10:30 - 11:30',NULL),(2,1,'23.03.2020','Java для маленьких и тупых. Лекция #404','Suspendisse rutrum, leo vitae ornare volutpat, risus lectus congue lacus, sed ultricies urna enim fringilla est. Maecenas semper enim velit, non vulputate ipsum porttitor nec. Nulla venenatis, quam nec lacinia facilisis, nulla metus tincidunt ex, non vehicula urna tellus at lacus.','Sed fringilla felis velit, laoreet bibendum ex ullamcorper eget.','10:30 - 11:30',NULL),(3,1,'24.03.2020','','Some homework','Sed fringilla felis velit, laoreet bibendum ex ullamcorper eget.','10:30 - 11:30',NULL),(4,1,'25.03.2020','Осознание принципов мобильной разработки','Репетиция первого захода в рабочий офис. Подготовить несколько возможных диалогов.','Sed fringilla felis velit, laoreet bibendum ex ullamcorper eget.','10:30 - 11:30',NULL),(5,1,'26.03.2020','Цветокоррекция в Final Cut Pro на примере летсплея по MineCraft (CaveGame)','Aliquam nunc arcu, ullamcorper eget metus ac, facilisis congue orci. Curabitur a magna sit amet tellus sagittis mattis eget at velit. Pellentesque pharetra finibus neque vitae sagittis. Ut laoreet massa eget sagittis tincidunt. Nam quis fermentum ligula. Curabitur tincidunt non eros ut varius. Duis nec maximus justo. Proin cursus, mauris et consectetur luctus, eros turpis facilisis ante, at ullamcorper urna nibh scelerisque odio.','Morbi pellentesque orci nec magna vehicula, sit amet bibendum nibh volutpat. Morbi pellentesque gravida augue. Nulla hendrerit orci ac ante dictum vulputate.','10:30 - 11:30',NULL),(9,2,'16.04.2020','Theme','tttttttttttttttttttttttttttt','Comment',NULL,NULL);
/*!40000 ALTER TABLE `lessons` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-10 13:39:47
