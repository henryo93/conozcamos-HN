-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: conozcamos_honduras
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `dificultad`
--

DROP TABLE IF EXISTS `dificultad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dificultad` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dificultad`
--

LOCK TABLES `dificultad` WRITE;
/*!40000 ALTER TABLE `dificultad` DISABLE KEYS */;
INSERT INTO `dificultad` VALUES (1,'Basico'),(2,'Experto');
/*!40000 ALTER TABLE `dificultad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modalidad`
--

DROP TABLE IF EXISTS `modalidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modalidad` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modalidad`
--

LOCK TABLES `modalidad` WRITE;
/*!40000 ALTER TABLE `modalidad` DISABLE KEYS */;
INSERT INTO `modalidad` VALUES (1,'Verdadero O Falso'),(2,'Opcion Multiple');
/*!40000 ALTER TABLE `modalidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pregunta`
--

DROP TABLE IF EXISTS `pregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pregunta` (
  `idPregunta` int NOT NULL AUTO_INCREMENT,
  `idTrivia` int NOT NULL,
  `idDificultad` int NOT NULL,
  `idModalidad` int NOT NULL,
  `nombre` varchar(300) NOT NULL,
  PRIMARY KEY (`idPregunta`),
  KEY `idTrivia_idx` (`idTrivia`),
  KEY `fk_preguntaDificultad` (`idDificultad`),
  KEY `fk_preguntaModalidad` (`idModalidad`),
  CONSTRAINT `fk_preguntaDificultad` FOREIGN KEY (`idDificultad`) REFERENCES `dificultad` (`id`),
  CONSTRAINT `fk_preguntaModalidad` FOREIGN KEY (`idModalidad`) REFERENCES `modalidad` (`id`),
  CONSTRAINT `fk_preguntaTrivia` FOREIGN KEY (`idTrivia`) REFERENCES `trivia` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pregunta`
--

LOCK TABLES `pregunta` WRITE;
/*!40000 ALTER TABLE `pregunta` DISABLE KEYS */;
INSERT INTO `pregunta` VALUES (1,1,1,1,'Honduras tiene costa en el océano Atlántico'),(2,1,1,1,'La guacamaya roja es el ave nacional de Honduras'),(3,1,1,1,'La capital de Honduras es San Pedro Sula'),(4,1,1,1,'Comayagua fue una antigua capital de Honduras'),(5,1,1,1,'El río Patuca es el más largo del país'),(6,1,1,1,'Roatán pertenece al departamento de Colón'),(7,1,1,1,'La baleada es un plato típico hondureño'),(8,1,1,1,'El Cerro Las Minas es el punto más alto de Honduras'),(9,1,1,1,'Tegucigalpa se fundó en el siglo XVI'),(10,1,1,1,'Olancho tiene costa en el océano'),(11,1,2,2,'¿En qué año Honduras se separó formalmente de la Federación Centroamericana?'),(12,1,2,2,'¿Cuál es el sitio arqueológico maya más importante de Honduras?'),(13,1,2,2,'¿Qué héroe hondureño es conocido como \'El Indio Lempira\'?'),(14,1,2,2,'¿Cuál es la montaña más alta de Honduras?'),(15,1,2,2,'¿Cuál de estos departamentos NO tiene costa?'),(16,1,2,2,'¿Cuál es el plato hondureño tradicional de Semana Santa?'),(17,1,2,2,'¿Qué civilización precolombina habitó el occidente del país?'),(18,1,2,2,'¿En qué año se fundó Tegucigalpa como municipio?'),(19,1,2,2,'¿Cuál es el río más largo de Honduras?'),(20,1,2,2,'¿Cuál de estos animales es símbolo nacional de Honduras?'),(21,2,1,1,'Mario es el personaje principal de la saga Mario Bros'),(22,2,1,1,'Spider-Man es parte del universo DC Comics'),(23,2,1,1,'Netflix es la plataforma donde se popularizó Stranger Things'),(24,2,1,1,'PlayStation es una consola creada por Sony'),(25,2,1,1,'El anime se originó en Corea del Sur'),(26,2,1,1,'Call of Duty es un juego de disparos (FPS)'),(27,2,1,1,'Woody es el protagonista de Toy Story'),(28,2,1,1,'Star Wars pertenece a Disney'),(29,2,1,1,'Sonic es un personaje de SEGA'),(30,2,1,1,'GTA V fue lanzado antes del año 2010'),(31,2,2,2,'¿Cuál fue la primera película animada en ganar un Óscar a Mejor Película Animada?'),(32,2,2,2,'¿Qué videojuego es considerado el más vendido de la historia?'),(33,2,2,2,'¿Quién interpreta a Geralt en la primera temporada de The Witcher?'),(34,2,2,2,'¿Quién fue el primer héroe en aparecer en un cómic de Marvel?'),(35,2,2,2,'¿Qué serie es conocida por la frase \'Winter is coming\'?'),(36,2,2,2,'¿En qué año salió la primera PlayStation?'),(37,2,2,2,'¿Quién dirigió \'Interestelar\'?'),(38,2,2,2,'¿Cuál de estos animes es anterior al 2000?'),(39,2,2,2,'¿Cuál fue el primer videojuego de Mario en 3D?'),(40,2,2,2,'¿Quién es conocida como la \'Reina del Pop\'?'),(41,1,1,2,'¿Cuál es la capital de Honduras?'),(42,1,1,2,'¿Qué ave representa el símbolo nacional?'),(43,1,1,2,'¿Qué moneda se utiliza en Honduras?'),(44,1,1,2,'¿Cuál es un plato típico hondureño?'),(45,1,1,2,'¿Qué departamento está al norte de Honduras?'),(46,1,1,2,'¿Qué océano baña la costa norte de Honduras?'),(47,1,1,2,'¿Cuál es una zona turística famosa en Honduras?'),(48,1,1,2,'¿Cuál de estos es un sitio arqueológico hondureño?'),(49,1,1,2,'¿Qué héroe indígena hondureño luchó contra los españoles?'),(50,1,1,2,'¿Cuál es el árbol nacional de Honduras?'),(51,1,2,1,'El río Ulúa es el más largo de Honduras.'),(52,1,2,1,'La ciudad de Gracias fue capital de Honduras durante la colonia.'),(53,1,2,1,'El departamento más grande del país es Olancho.'),(54,1,2,1,'Las Ruinas de Copán pertenecen a la cultura maya.'),(55,1,2,1,'La bandera de Honduras tiene cinco estrellas en círculo.'),(56,1,2,1,'El Golfo de Fonseca está en la costa norte del país.'),(57,1,2,1,'El Parque Nacional La Tigra fue el primero del país.'),(58,1,2,1,'Santa Rosa de Copán es famosa por su producción de tabaco.'),(59,1,2,1,'El lago de Yojoa es el único lago natural de Honduras.'),(60,1,2,1,'El gobierno de Honduras tiene solo dos poderes del Estado.'),(61,2,1,2,'¿Quién es el personaje principal de Mario Bros?'),(62,2,1,2,'¿Qué plataforma popularizó Stranger Things?'),(63,2,1,2,'¿Qué consola es fabricada por Sony?'),(64,2,1,2,'¿Qué superhéroe pertenece a Marvel?'),(65,2,1,2,'¿Quién interpreta a Thor en el UCM?'),(66,2,1,2,'¿Cuál de estos es un videojuego de disparos?'),(67,2,1,2,'¿Cuál de estas películas es de Pixar?'),(68,2,1,2,'¿Qué personaje es la mascota de SEGA?'),(69,2,1,2,'¿Qué saga pertenece a George Lucas?'),(70,2,1,2,'¿Quién canta \'Blinding Lights\'?'),(71,2,2,1,'Minecraft fue lanzado oficialmente en 2009.'),(72,2,2,1,'Avatar (2009) ha sido la película más taquillera de la historia.'),(73,2,2,1,'One Piece comenzó después de Naruto.'),(74,2,2,1,'Nintendo fue fundada originalmente como una empresa de cartas.'),(75,2,2,1,'Stranger Things está ambientada en los años 90.'),(76,2,2,1,'Christopher Nolan dirigió \'Inception\'.'),(77,2,2,1,'God of War Ragnarök es el primer juego donde aparece Kratos.'),(78,2,2,1,'Darth Vader aparece en la película de 1977 de Star Wars.'),(79,2,2,1,'Breaking Bad es una serie producida por Netflix.'),(80,2,2,1,'GTA San Andreas fue lanzado antes que GTA Vice City.');
/*!40000 ALTER TABLE `pregunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ranking`
--

DROP TABLE IF EXISTS `ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ranking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idTrivia` int NOT NULL,
  `idDificultad` int NOT NULL,
  `idModalidad` int NOT NULL,
  `fecha` datetime NOT NULL,
  `tiempo` time NOT NULL,
  `totalPuntos` int NOT NULL,
  `idUsuario` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_rankingTrivia` (`idTrivia`),
  KEY `fk_rankingDificultad` (`idDificultad`),
  KEY `fk_rankingModalidad` (`idModalidad`),
  KEY `fk_rankingUsuario` (`idUsuario`),
  CONSTRAINT `fk_rankingDificultad` FOREIGN KEY (`idDificultad`) REFERENCES `dificultad` (`id`),
  CONSTRAINT `fk_rankingModalidad` FOREIGN KEY (`idModalidad`) REFERENCES `modalidad` (`id`),
  CONSTRAINT `fk_rankingTrivia` FOREIGN KEY (`idTrivia`) REFERENCES `trivia` (`id`),
  CONSTRAINT `fk_rankingUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ranking`
--

LOCK TABLES `ranking` WRITE;
/*!40000 ALTER TABLE `ranking` DISABLE KEYS */;
/*!40000 ALTER TABLE `ranking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respuesta`
--

DROP TABLE IF EXISTS `respuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `respuesta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idPregunta` int DEFAULT NULL,
  `nombre` varchar(300) NOT NULL,
  `puntos` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_respuestaPregunta` (`idPregunta`),
  CONSTRAINT `fk_respuestaPregunta` FOREIGN KEY (`idPregunta`) REFERENCES `pregunta` (`idPregunta`)
) ENGINE=InnoDB AUTO_INCREMENT=241 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respuesta`
--

LOCK TABLES `respuesta` WRITE;
/*!40000 ALTER TABLE `respuesta` DISABLE KEYS */;
INSERT INTO `respuesta` VALUES (1,1,'Verdadero',1),(2,1,'Falso',0),(3,2,'Verdadero',1),(4,2,'Falso',0),(5,3,'Verdadero',0),(6,3,'Falso',1),(7,4,'Verdadero',1),(8,4,'Falso',0),(9,5,'Verdadero',1),(10,5,'Falso',0),(11,6,'Verdadero',0),(12,6,'Falso',1),(13,7,'Verdadero',1),(14,7,'Falso',0),(15,8,'Verdadero',1),(16,8,'Falso',0),(17,9,'Verdadero',1),(18,9,'Falso',0),(19,10,'Verdadero',0),(20,10,'Falso',1),(21,11,'1831',0),(22,11,'1838',1),(23,11,'1845',0),(24,11,'1829',0),(25,12,'El Puente',0),(26,12,'Yarumela',0),(27,12,'Copán Ruinas',1),(28,12,'Tenampúa',0),(29,13,'Cicumba',0),(30,13,'Lempira',1),(31,13,'Motañés',0),(32,13,'Atlacatl',0),(33,14,'Celaque',1),(34,14,'Pico Bonito',0),(35,14,'Montaña de Santa Bárbara',0),(36,14,'El Merendón',0),(37,15,'Colón',0),(38,15,'Olancho',1),(39,15,'Atlántida',0),(40,15,'Islas de la Bahía',0),(41,16,'Tapado olanchano',0),(42,16,'Torrejas',1),(43,16,'Montucas',0),(44,16,'Tamal pisque',0),(45,17,'Chorotegas',0),(46,17,'Pipiles',0),(47,17,'Mayas',1),(48,17,'Jicaques',0),(49,18,'1536',0),(50,18,'1540',0),(51,18,'1578',1),(52,18,'1680',0),(53,19,'Río Patuca',1),(54,19,'Río Ulúa',0),(55,19,'Río Choluteca',0),(56,19,'Río Chamelecón',0),(57,20,'Guacamaya roja',1),(58,20,'Venado cola blanca',0),(59,20,'Tucán pico iris',0),(60,20,'Jaguar',0),(61,21,'Verdadero',1),(62,21,'Falso',0),(63,22,'Verdadero',0),(64,22,'Falso',1),(65,23,'Verdadero',1),(66,23,'Falso',0),(67,24,'Verdadero',1),(68,24,'Falso',0),(69,25,'Verdadero',0),(70,25,'Falso',1),(71,26,'Verdadero',1),(72,26,'Falso',0),(73,27,'Verdadero',1),(74,27,'Falso',0),(75,28,'Verdadero',1),(76,28,'Falso',0),(77,29,'Verdadero',1),(78,29,'Falso',0),(79,30,'Verdadero',0),(80,30,'Falso',1),(81,31,'Shrek',1),(82,31,'Toy Story',0),(83,31,'El Rey León',0),(84,31,'Monsters Inc.',0),(85,32,'GTA V',0),(86,32,'Tetris',0),(87,32,'Minecraft',1),(88,32,'Wii Sports',0),(89,33,'Henry Cavill',1),(90,33,'Chris Hemsworth',0),(91,33,'Mads Mikkelsen',0),(92,33,'Travis Fimmel',0),(93,34,'Human Torch',0),(94,34,'Captain America',0),(95,34,'Namor',1),(96,34,'Spider-Man',0),(97,35,'The Witcher',0),(98,35,'Game of Thrones',1),(99,35,'Vikings',0),(100,35,'Shadow and Bone',0),(101,36,'1992',0),(102,36,'1994',1),(103,36,'1996',0),(104,36,'1998',0),(105,37,'Denis Villeneuve',0),(106,37,'Steven Spielberg',0),(107,37,'Christopher Nolan',1),(108,37,'Alfonso Cuarón',0),(109,38,'Bleach',0),(110,38,'Naruto',0),(111,38,'One Piece',1),(112,38,'Attack on Titan',0),(113,39,'Mario Galaxy',0),(114,39,'Mario RPG',0),(115,39,'Mario 64',1),(116,39,'Mario Sunshine',0),(117,40,'Shakira',0),(118,40,'Lady Gaga',0),(119,40,'Madonna',1),(120,40,'Britney Spears',0),(121,41,'La Ceiba',0),(122,41,'Tegucigalpa',1),(123,41,'Santa Rosa de Copán',0),(124,41,'Danlí',0),(125,42,'Águila arpía',0),(126,42,'Guacamaya roja',1),(127,42,'Tucán verde',0),(128,42,'Colibrí real',0),(129,43,'Peso',0),(130,43,'Lempira',1),(131,43,'Quetzal',0),(132,43,'Dólar hondureño',0),(133,44,'Pupusas',0),(134,44,'Baleadas',1),(135,44,'Enchiladas mexicanas',0),(136,44,'Tacos dorados',0),(137,45,'Cortés',1),(138,45,'Lempira',0),(139,45,'Olancho',0),(140,45,'Choluteca',0),(141,46,'Pacífico',0),(142,46,'Atlántico',1),(143,46,'Índico',0),(144,46,'Ninguno',0),(145,47,'Roatán',1),(146,47,'Tulum',0),(147,47,'Isla Barú',0),(148,47,'San Andrés',0),(149,48,'Tikal',0),(150,48,'Copán',1),(151,48,'Machu Picchu',0),(152,48,'Caracol',0),(153,49,'Atlacatl',0),(154,49,'Lempira',1),(155,49,'Urracá',0),(156,49,'Lautaro',0),(157,50,'Ceiba',0),(158,50,'Roble',0),(159,50,'Pino',1),(160,50,'Macuelizo',0),(161,51,'Verdadero',0),(162,51,'Falso',1),(163,52,'Verdadero',1),(164,52,'Falso',0),(165,53,'Verdadero',1),(166,53,'Falso',0),(167,54,'Verdadero',1),(168,54,'Falso',0),(169,55,'Verdadero',0),(170,55,'Falso',1),(171,56,'Verdadero',0),(172,56,'Falso',1),(173,57,'Verdadero',1),(174,57,'Falso',0),(175,58,'Verdadero',1),(176,58,'Falso',0),(177,59,'Verdadero',1),(178,59,'Falso',0),(179,60,'Verdadero',0),(180,60,'Falso',1),(181,61,'Luigi',0),(182,61,'Peach',0),(183,61,'Mario',1),(184,61,'Toad',0),(185,62,'HBO Max',0),(186,62,'Netflix',1),(187,62,'Disney+',0),(188,62,'Prime Video',0),(189,63,'Xbox',0),(190,63,'Nintendo Switch',0),(191,63,'PlayStation',1),(192,63,'Sega Genesis',0),(193,64,'Batman',0),(194,64,'Flash',0),(195,64,'Iron Man',1),(196,64,'Aquaman',0),(197,65,'Tom Holland',0),(198,65,'Henry Cavill',0),(199,65,'Chris Hemsworth',1),(200,65,'Jason Momoa',0),(201,66,'Minecraft',0),(202,66,'Call of Duty',1),(203,66,'FIFA',0),(204,66,'Just Dance',0),(205,67,'Shrek',0),(206,67,'Frozen',0),(207,67,'Toy Story',1),(208,67,'Megamente',0),(209,68,'Crash',0),(210,68,'Sonic',1),(211,68,'Megaman',0),(212,68,'Ryu',0),(213,69,'Harry Potter',0),(214,69,'Star Wars',1),(215,69,'El Señor de los Anillos',0),(216,69,'Star Trek',0),(217,70,'The Weeknd',1),(218,70,'Ed Sheeran',0),(219,70,'Bruno Mars',0),(220,70,'Post Malone',0),(221,71,'Verdadero',1),(222,71,'Falso',0),(223,72,'Verdadero',1),(224,72,'Falso',0),(225,73,'Verdadero',0),(226,73,'Falso',1),(227,74,'Verdadero',1),(228,74,'Falso',0),(229,75,'Verdadero',0),(230,75,'Falso',1),(231,76,'Verdadero',1),(232,76,'Falso',0),(233,77,'Verdadero',0),(234,77,'Falso',1),(235,78,'Verdadero',1),(236,78,'Falso',0),(237,79,'Verdadero',0),(238,79,'Falso',1),(239,80,'Verdadero',0),(240,80,'Falso',1);
/*!40000 ALTER TABLE `respuesta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trivia`
--

DROP TABLE IF EXISTS `trivia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trivia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trivia`
--

LOCK TABLES `trivia` WRITE;
/*!40000 ALTER TABLE `trivia` DISABLE KEYS */;
INSERT INTO `trivia` VALUES (1,'CULTURA GENERAL '),(2,'ENTRETENIMIENTO GENERAL');
/*!40000 ALTER TABLE `trivia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `correo` varchar(45) NOT NULL,
  `apodo` varchar(45) NOT NULL,
  `contrasenia` varchar(45) NOT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'henryvilleda@gmail.com','henryVilleda10','123admin'),(2,'henryohara93@gmail.com','henry2','1234'),(3,'norman01@gmail.com','norman01','12345'),(4,'henry1@gmail.com','henry01','12345'),(5,'henry@gmail.com','henry22','12345'),(6,'henry3@gmail.com','henry3','1234');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-08 11:52:10
