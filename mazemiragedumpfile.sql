CREATE DATABASE  IF NOT EXISTS `mazemirage_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mazemirage_db`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: mazemirage_db
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games` (
  `gameID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `controlType` enum('keyboard','mouse') NOT NULL,
  PRIMARY KEY (`gameID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,'Game1','Move your mouse to navigate the maze. Avoid the avoiders and reach the end!','keyboard'),(2,'Game2','Use the arrow keys to navigate through the maze from the start and you need to find the  to the end point. Avoid the moving obstacles, and try to reach the end before the time runs out. Press Start Game to begin your adventure!','keyboard');
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leaderboards`
--

DROP TABLE IF EXISTS `leaderboards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaderboards` (
  `leaderboardID` int NOT NULL AUTO_INCREMENT,
  `gameID` int NOT NULL,
  `userID` int NOT NULL,
  `gamertag` varchar(255) DEFAULT NULL,
  `playerIcon` varchar(255) DEFAULT NULL,
  `score` time DEFAULT NULL,
  PRIMARY KEY (`leaderboardID`),
  KEY `gameID` (`gameID`),
  KEY `userID` (`userID`),
  CONSTRAINT `leaderboards_ibfk_1` FOREIGN KEY (`gameID`) REFERENCES `games` (`gameID`),
  CONSTRAINT `leaderboards_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaderboards`
--

LOCK TABLES `leaderboards` WRITE;
/*!40000 ALTER TABLE `leaderboards` DISABLE KEYS */;
INSERT INTO `leaderboards` VALUES (28,1,3,'PlayerOne','discoball.png','00:02:34'),(29,1,4,'Gamer124','discobear.png','00:03:00'),(30,1,5,'RaceWin638','discobird2.png','00:03:15'),(31,1,6,'FastRun999','discodeer.png','00:03:45'),(32,1,7,'QuickFox856','discoflamingo.png','00:04:05'),(33,1,8,'NightSky675','discootter.png','00:04:30'),(34,1,9,'ShadowFly303','discogiraffe.png','00:05:00'),(35,1,10,'SpeedStar404','discoraccoon.png','00:05:25'),(36,1,11,'SilverRace007','discominitiger.png','00:05:50');
/*!40000 ALTER TABLE `leaderboards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `levels`
--

DROP TABLE IF EXISTS `levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `levels` (
  `levelID` int NOT NULL AUTO_INCREMENT,
  `gameID` int NOT NULL,
  `levelNumber` int NOT NULL,
  PRIMARY KEY (`levelID`),
  KEY `fk_game` (`gameID`),
  CONSTRAINT `fk_game` FOREIGN KEY (`gameID`) REFERENCES `games` (`gameID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `levels`
--

LOCK TABLES `levels` WRITE;
/*!40000 ALTER TABLE `levels` DISABLE KEYS */;
INSERT INTO `levels` VALUES (1,2,1),(2,2,2),(3,2,3);
/*!40000 ALTER TABLE `levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_feedback`
--

DROP TABLE IF EXISTS `user_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_feedback` (
  `feedback_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `feature_requests` text,
  `general_comments` text,
  `bug_reports` text,
  `website_usability` text,
  `gameplay_experience` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`feedback_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_feedback`
--

LOCK TABLES `user_feedback` WRITE;
/*!40000 ALTER TABLE `user_feedback` DISABLE KEYS */;
INSERT INTO `user_feedback` VALUES (1,'Alice Smith','alice.smith@example.com','More levels and characters','Love the game!','None','Easy to navigate','Very engaging','2024-05-10 04:34:21'),(2,'Bob Johnson','bob.j@example.com','Add more in-game rewards','Great fun playing this','Minor glitch on level 2','Very user-friendly','Super fun','2024-05-10 04:34:21'),(3,'Carol White','carol.w@example.com','I wish there were more themes','Great concept and gameplay','Sometimes lags on startup','Very straightforward','Love the challenges','2024-05-10 04:34:21'),(4,'David Green','david.green@example.com','Customizable avatars please','Enjoy the updates','No issues encountered','Very clean layout','Really immersive experience','2024-05-10 04:34:21'),(5,'Eve Black','eve.black@example.com','More multiplayer options','Awesome gameplay!','None','Easy and clean interface','Always entertaining','2024-05-10 04:34:21'),(6,'Frank Moore','frank.moore@example.com','Need more tutorial content','Helpful customer support','App crashes occasionally','A bit cluttered','Engaging and rewarding','2024-05-10 04:34:21'),(7,'Grace Hall','grace.hall@example.com','Feature to save game progress','Very pleased with recent updates','Loading takes time','Intuitive design','Satisfying and fun','2024-05-10 04:34:21'),(8,'Henry Long','henry.long@example.com','More power-ups available','Exciting and captivating','None','Navigation is seamless','Gameplay is top-notch','2024-05-10 04:34:21'),(9,'Ivy King','ivy.king@example.com','Requesting new soundtracks','Addictive game','Sometimes freezes','Some menus are confusing','Very realistic','2024-05-10 04:34:21');
/*!40000 ALTER TABLE `user_feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `gamertag` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `playerIconURL` varchar(255) DEFAULT NULL COMMENT 'URL to the player icon image',
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `lastLoginDate` datetime DEFAULT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `gamertag` (`gamertag`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'nikki123','nik25hil','test','2001-08-18 04:00:00','2001-08-18 00:00:00'),(2,'testUser','password123','http://example.com/icon.png','2024-04-30 16:00:00','2024-04-30 12:00:00'),(3,'PlayerOne','482c811da5d5b4bc6d497ffa98491e38','discoball.png','2024-05-10 04:28:19','2024-05-10 00:28:19'),(4,'Gamer124','e28a09fe9d8ded87ea3a909ffc35cc45','discobear.png','2024-05-10 04:28:19','2024-05-10 00:28:19'),(5,'RaceWin638','1176c3ff3140df33834f2000153d5192','discobird2.png','2024-05-10 04:28:19','2024-05-10 00:28:19'),(6,'FastRun999','d0bed39fb5b7ff2f2ff87a3c0c6675f8','discodeer.png','2024-05-10 04:28:19','2024-05-10 00:28:19'),(7,'QuickFox856','3ccec77b9dc8cd7322f811a4ae2e863a','discoflamingo.png','2024-05-10 04:28:19','2024-05-10 00:28:19'),(8,'NightSky675','dcdd2b9ab3e797a5db038cf3863e4e4c','discootter.png','2024-05-10 04:28:19','2024-05-10 00:28:19'),(9,'ShadowFly303','724addb829da5b341ac094ef91d1ba5f','discogiraffe.png','2024-05-10 04:28:19','2024-05-10 00:28:19'),(10,'SpeedStar404','91017957eef8fd56b1d4b9f7c48020a9','discoraccoon.png','2024-05-10 04:28:19','2024-05-10 00:28:19'),(11,'SilverRace007','1cd27e6443fb43973cc2af93573843b7','discominitiger.png','2024-05-10 04:28:19','2024-05-10 00:28:19');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-10  0:45:54
