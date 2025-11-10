-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: nextview
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `idCategoria` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `icon` varchar(45) DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  PRIMARY KEY (`idCategoria`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Anime','?',2),(2,'Serie','?',1),(3,'Película','?',3),(4,'Dorama','?',2);
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contenido`
--

DROP TABLE IF EXISTS `contenido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contenido` (
  `idContenido` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `year` int DEFAULT NULL,
  `descripcion` text,
  `duracion` varchar(20) DEFAULT NULL,
  `temporadas` int DEFAULT NULL,
  `episodios` int DEFAULT NULL,
  `isNew` tinyint(1) DEFAULT '0',
  `isPopular` tinyint(1) DEFAULT '0',
  `isTrending` tinyint(1) DEFAULT '0',
  `isExclusive` tinyint(1) DEFAULT '0',
  `isFavorito` tinyint(1) DEFAULT '0',
  `idCategoria` int NOT NULL,
  PRIMARY KEY (`idContenido`),
  KEY `idCategoria` (`idCategoria`),
  CONSTRAINT `contenido_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenido`
--

LOCK TABLES `contenido` WRITE;
/*!40000 ALTER TABLE `contenido` DISABLE KEYS */;
INSERT INTO `contenido` VALUES (1,'Attack on Titan','https://cdn.myanimelist.net/images/anime/10/47347.jpg',4.9,2023,'La humanidad vive en ciudades rodeadas por enormes muros que los protegen de los titanes.',NULL,4,24,1,0,0,1,0,1),(2,'Demon Slayer: Kimetsu no Yaiba','https://cdn.myanimelist.net/images/anime/1286/99889.jpg',4.8,2023,'Tanjiro Kamado se convierte en cazador de demonios para salvar a su hermana.',NULL,3,26,0,0,1,0,0,1),(3,'Jujutsu Kaisen','https://cdn.myanimelist.net/images/anime/1171/109222.jpg',4.7,2023,'Estudiantes de hechicería luchan contra maldiciones en el mundo moderno.',NULL,2,24,0,1,0,0,1,1),(4,'One Piece','https://cdn.myanimelist.net/images/anime/6/73245.jpg',4.6,1999,'Monkey D. Luffy y su tripulación buscan el tesoro legendario \'One Piece\'.',NULL,20,1000,0,1,0,0,0,1),(5,'Breaking Bad','https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',4.9,2008,'Un profesor de química se convierte en fabricante de metanfetamina.',NULL,5,62,0,1,0,0,1,2),(6,'Game of Thrones','https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg',4.8,2011,'Nobles familias luchan por el control de los Siete Reinos.',NULL,8,73,0,1,0,0,1,2),(7,'Spider-Man: Across the Spider-Verse','https://image.tmdb.org/t/p/w500/iiXliCeykkzmJ0Eg9RYJ7F2CWSz.jpg',4.7,2023,'Miles Morales viaja a través del multiverso para unirse a Gwen Stacy.','2:20:15',1,1,1,0,0,0,1,3),(8,'Avengers: Endgame','https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',4.9,2019,'Los Vengadores se reúnen para revertir el chasquido de Thanos.','3:01:00',1,1,0,1,0,0,1,3),(9,'Goblin: The Lonely and Great God','https://i.mydramalist.com/4vz1W_4f.jpg',4.8,2016,'Un inmortal goblin busca a su novia humana para poner fin a su inmortalidad.',NULL,2,16,0,0,0,0,1,4);
/*!40000 ALTER TABLE `contenido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contenido_genero`
--

DROP TABLE IF EXISTS `contenido_genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contenido_genero` (
  `idContenido` int NOT NULL,
  `idGenero` int NOT NULL,
  PRIMARY KEY (`idContenido`,`idGenero`),
  KEY `idGenero` (`idGenero`),
  CONSTRAINT `contenido_genero_ibfk_1` FOREIGN KEY (`idContenido`) REFERENCES `contenido` (`idContenido`),
  CONSTRAINT `contenido_genero_ibfk_2` FOREIGN KEY (`idGenero`) REFERENCES `genero` (`idGenero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenido_genero`
--

LOCK TABLES `contenido_genero` WRITE;
/*!40000 ALTER TABLE `contenido_genero` DISABLE KEYS */;
INSERT INTO `contenido_genero` VALUES (1,1),(2,1),(3,1),(4,1),(8,1),(2,2),(3,2),(4,2),(6,2),(7,2),(1,3),(5,3),(6,3),(9,3),(4,4),(1,5),(7,5),(8,5),(9,6),(2,7),(6,7),(9,7),(3,8),(5,9),(7,10),(8,10),(5,11);
/*!40000 ALTER TABLE `contenido_genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contenido_plan`
--

DROP TABLE IF EXISTS `contenido_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contenido_plan` (
  `idContenido` int DEFAULT NULL,
  `idCategoria` int DEFAULT NULL,
  `idPlan` int NOT NULL,
  UNIQUE KEY `idContenido` (`idContenido`,`idCategoria`,`idPlan`),
  KEY `idCategoria` (`idCategoria`),
  KEY `idPlan` (`idPlan`),
  CONSTRAINT `contenido_plan_ibfk_1` FOREIGN KEY (`idContenido`) REFERENCES `contenido` (`idContenido`),
  CONSTRAINT `contenido_plan_ibfk_2` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`),
  CONSTRAINT `contenido_plan_ibfk_3` FOREIGN KEY (`idPlan`) REFERENCES `plan` (`idPlan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenido_plan`
--

LOCK TABLES `contenido_plan` WRITE;
/*!40000 ALTER TABLE `contenido_plan` DISABLE KEYS */;
INSERT INTO `contenido_plan` VALUES (1,NULL,1),(2,NULL,1),(3,NULL,1),(4,NULL,1),(5,NULL,2),(6,NULL,2);
/*!40000 ALTER TABLE `contenido_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuenta`
--

DROP TABLE IF EXISTS `cuenta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuenta` (
  `idCuenta` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `idPlan` int NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date DEFAULT NULL,
  `estado` enum('activa','inactiva') DEFAULT 'activa',
  PRIMARY KEY (`idCuenta`),
  KEY `idUsuario` (`idUsuario`),
  KEY `idPlan` (`idPlan`),
  CONSTRAINT `cuenta_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`),
  CONSTRAINT `cuenta_ibfk_2` FOREIGN KEY (`idPlan`) REFERENCES `plan` (`idPlan`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuenta`
--

LOCK TABLES `cuenta` WRITE;
/*!40000 ALTER TABLE `cuenta` DISABLE KEYS */;
INSERT INTO `cuenta` VALUES (3,3,1,'2025-11-01','2025-12-01','activa'),(5,4,2,'2025-11-01','2025-12-01','activa');
/*!40000 ALTER TABLE `cuenta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuenta_perfil`
--

DROP TABLE IF EXISTS `cuenta_perfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuenta_perfil` (
  `idCuentaPerfil` int NOT NULL AUTO_INCREMENT,
  `idCuenta` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `avatar` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idCuentaPerfil`),
  KEY `idCuenta` (`idCuenta`),
  CONSTRAINT `cuenta_perfil_ibfk_1` FOREIGN KEY (`idCuenta`) REFERENCES `cuenta` (`idCuenta`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuenta_perfil`
--

LOCK TABLES `cuenta_perfil` WRITE;
/*!40000 ALTER TABLE `cuenta_perfil` DISABLE KEYS */;
INSERT INTO `cuenta_perfil` VALUES (3,3,'Perfil Principal','?'),(4,3,'Perfil Secundario','?'),(7,5,'Perfil Secundario','?');
/*!40000 ALTER TABLE `cuenta_perfil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `episodio`
--

DROP TABLE IF EXISTS `episodio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `episodio` (
  `idEpisodio` int NOT NULL AUTO_INCREMENT,
  `idTemporada` int NOT NULL,
  `capitulo` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `videoUrl` varchar(500) DEFAULT NULL,
  `duration` varchar(20) DEFAULT NULL,
  `views` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idEpisodio`),
  KEY `idTemporada` (`idTemporada`),
  CONSTRAINT `episodio_ibfk_1` FOREIGN KEY (`idTemporada`) REFERENCES `temporada` (`idTemporada`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `episodio`
--

LOCK TABLES `episodio` WRITE;
/*!40000 ALTER TABLE `episodio` DISABLE KEYS */;
INSERT INTO `episodio` VALUES (1,1,1,'Attack on Titan','https://cdn.myanimelist.net/images/anime/10/47347.jpg','https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4','24:30','2.0M'),(2,1,2,'Attack on Titan','https://cdn.myanimelist.net/images/anime/10/47347.jpg','https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4','25:00','2.2M'),(3,3,1,'Película','https://image.tmdb.org/t/p/w500/iiXliCeykkzmJ0Eg9RYJ7F2CWSz.jpg','https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4','2:20:15','1.1M');
/*!40000 ALTER TABLE `episodio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genero`
--

DROP TABLE IF EXISTS `genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genero` (
  `idGenero` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`idGenero`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genero`
--

LOCK TABLES `genero` WRITE;
/*!40000 ALTER TABLE `genero` DISABLE KEYS */;
INSERT INTO `genero` VALUES (1,'Acción'),(10,'Animación'),(4,'Aventura'),(3,'Ciencia Ficción'),(7,'Comedia'),(8,'Crimen'),(2,'Drama'),(5,'Fantasía'),(12,'Romance'),(6,'Sobrenatural'),(11,'Superhéroes'),(9,'Suspense');
/*!40000 ALTER TABLE `genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mi_lista`
--

DROP TABLE IF EXISTS `mi_lista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mi_lista` (
  `idMiLista` int NOT NULL AUTO_INCREMENT,
  `idCuentaPerfil` int NOT NULL,
  `idContenido` int NOT NULL,
  `fechaAgregado` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idMiLista`),
  UNIQUE KEY `idCuentaPerfil` (`idCuentaPerfil`,`idContenido`),
  KEY `idContenido` (`idContenido`),
  CONSTRAINT `mi_lista_ibfk_1` FOREIGN KEY (`idCuentaPerfil`) REFERENCES `cuenta_perfil` (`idCuentaPerfil`),
  CONSTRAINT `mi_lista_ibfk_2` FOREIGN KEY (`idContenido`) REFERENCES `contenido` (`idContenido`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mi_lista`
--

LOCK TABLES `mi_lista` WRITE;
/*!40000 ALTER TABLE `mi_lista` DISABLE KEYS */;
INSERT INTO `mi_lista` VALUES (2,3,1,'2025-11-09 19:50:34');
/*!40000 ALTER TABLE `mi_lista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pago`
--

DROP TABLE IF EXISTS `pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pago` (
  `idPago` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `idPlan` int NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `fechaPago` date NOT NULL,
  `fechaFin` date NOT NULL,
  `tipoPago` enum('mensual','anual') DEFAULT 'mensual',
  `estado` enum('activo','vencido') DEFAULT 'activo',
  PRIMARY KEY (`idPago`),
  KEY `idUsuario` (`idUsuario`),
  KEY `idPlan` (`idPlan`),
  CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`),
  CONSTRAINT `pago_ibfk_2` FOREIGN KEY (`idPlan`) REFERENCES `plan` (`idPlan`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pago`
--

LOCK TABLES `pago` WRITE;
/*!40000 ALTER TABLE `pago` DISABLE KEYS */;
INSERT INTO `pago` VALUES (2,2,1,15.99,'2025-11-01','2025-12-01','mensual','activo');
/*!40000 ALTER TABLE `pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagos` (
  `idPago` int NOT NULL AUTO_INCREMENT,
  `idCuenta` int NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `fechaPago` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `periodoInicio` date NOT NULL,
  `periodoFin` date NOT NULL,
  `estado` enum('Pendiente','Completado','Fallido') DEFAULT 'Pendiente',
  `metodoPago` varchar(50) DEFAULT NULL,
  `referencia` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idPago`),
  KEY `idCuenta` (`idCuenta`),
  CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`idCuenta`) REFERENCES `cuenta` (`idCuenta`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
INSERT INTO `pagos` VALUES (1,3,9.99,'2025-11-09 20:47:01','2025-11-01','2025-11-30','Completado','PayPal','TXN-1234567890');
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan`
--

DROP TABLE IF EXISTS `plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan` (
  `idPlan` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `maxPerfil` int NOT NULL,
  `calidad` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idPlan`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan`
--

LOCK TABLES `plan` WRITE;
/*!40000 ALTER TABLE `plan` DISABLE KEYS */;
INSERT INTO `plan` VALUES (1,'Medio',20.00,2,'100'),(2,'Bacio',10.00,1,'100');
/*!40000 ALTER TABLE `plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `idRol` int NOT NULL AUTO_INCREMENT,
  `rol` varchar(50) NOT NULL,
  PRIMARY KEY (`idRol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Administrador'),(2,'Participante');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temporada`
--

DROP TABLE IF EXISTS `temporada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temporada` (
  `idTemporada` int NOT NULL AUTO_INCREMENT,
  `idContenido` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`idTemporada`),
  KEY `idContenido` (`idContenido`),
  CONSTRAINT `temporada_ibfk_1` FOREIGN KEY (`idContenido`) REFERENCES `contenido` (`idContenido`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temporada`
--

LOCK TABLES `temporada` WRITE;
/*!40000 ALTER TABLE `temporada` DISABLE KEYS */;
INSERT INTO `temporada` VALUES (1,1,'Temporada 1'),(2,1,'Temporada 2'),(3,7,'Película Completa');
/*!40000 ALTER TABLE `temporada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `googleId` varchar(300) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `avatar` varchar(300) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  `idRol` int NOT NULL DEFAULT '2',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `correo` (`email`),
  UNIQUE KEY `googleId_UNIQUE` (`googleId`),
  KEY `usuario_ibfk_1` (`idRol`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (2,'117825334618019172559','Edgar Fuentes','edgarfuentes139@gmail.com','https://lh3.googleusercontent.com/a/ACg8ocLiISmRrBkDcdT0Qvf53cUyucIk3xrQF8ASypfalfc1VHFeNA=s96-c','activo',1,'2025-11-06 04:40:26'),(3,'106610665265016285110','Streaming','streamingdeploy@gmail.com','https://lh3.googleusercontent.com/a/ACg8ocJcro-Jnvkcp03wQ2lCAkcvfA9CMZ0Vl5XEmkJt3IjUdKXoMA=s96-c','activo',2,'2025-11-06 05:25:29'),(4,'109050481439993036277','Root','root52909@gmail.com','https://lh3.googleusercontent.com/a/ACg8ocKELIRP7ljlvN8BHjwD3oGnFkCM7dWj1w7KX4W0cXRiQenvcg=s96-c','activo',2,'2025-11-07 14:20:33');
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

-- Dump completed on 2025-11-10 11:15:33
