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
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `datedmy` varchar(10) DEFAULT NULL,
  `title` tinytext NOT NULL,
  `body` mediumtext NOT NULL,
  `epilogue` tinytext NOT NULL,
  `filehash` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'23.03.2020','Объявляется конкурс на получение стипендии Президента Российской Федерации','Участвовать в конкурсе могут студенты, обучающиеся только по приоритетным специальностям или направлениям подготовки:\n· Бакалавры 1, 2 и 3 курсов\n· Специалисты 1, 2, 3 и 4 курсов (5 курс только при сроке обучения 5,5 лет)\n· Магистры 1 курса\n⠀\nДля участия в конкурсе необходимо:\n\n1. В срок с 1 по 12 апреля заполнить электронную заявку в личном кабинете студента (ЛКС).\n2. В срок до 31 мая (если период самоизоляции и ограничения свободного перемещения по городу не будет продлён) отправить комплект документов на бумажном носителе по почте в адрес РТУ МИРЭА: 119454, ЦФО, г. Москва, проспект Вернадского, 78.\n⠀\nЧто необходимо сделать?\n\n1. Скачать бланк заявления об участии в конкурсе и приложения к нему.\n2. Заполнить бланк заявления и приложение к нему, поставить дату и подпись.\n3. Подготовить копии документов, подтверждающих ваши достижения за соответствующий период (в приложении к заявлению двум годам соответствует период с 1 сентября 2018 г. по настоящий момент, одному году — с 1 сентября 2019 г. по настоящий момент).\nВсе документы необходимо отсканировать и сохранить файлами по каждому из достижений отдельно (например, три статьи необходимо сохранить тремя отдельными многостраничными файлами, в каждом из которых будет информация по каждой статье в отдельности). Все файлы по достижениям следует сохранить в архив .zip.\n4. Зайти в ЛКС и заполнить заявление об участии в конкурсе в электронном виде.\n5. Прикрепить архив с копиями документов, подтверждающих ваши достижения.\n6. Отправить заявление и копии документов, подтверждающих ваши достижения, на бумажном носителе заказным письмом с описью по почте России в адрес РТУ МИРЭА (см. выше п. 2). Сделать фотографию конверта перед самой отправкой письма.','Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.','e79bc1b1340e015e5aab80ee296c573f.bin'),(2,'24.03.2020','Об использовании технологий дистанционного обучения в учебном процессе по всем образовательным программам, начиная с 17 марта 2020 г.','Уважаемые обучающиеся, сотрудники и абитуриенты МИРЭА - Российского технологического университета!\n\nВ соответствии с приказом Министерства науки и высшего образования Российской Федерации от 14.03.2020 № 397 «Об организации образовательной деятельности в организациях, реализующих образовательные программы высшего образования и соответствующие дополнительные профессиональные программы, в условиях предупреждения распространения новой коронавирусной инфекции на территории Российской Федерации», а также в целях противодействия распространению новой коронавирусной инфекции COVID-2019, минимизации рисков для здоровья обучающихся и сотрудников Университета ректорат РТУ МИРЭА официально сообщает о том, что начиная с 17 марта учебный процесс по всем образовательным программам будет реализовываться с применением технологий дистанционного обучения.\n\nВсе мероприятия для студентов, абитуриентов и сотрудников отменены, перенесены на более поздние сроки или будут также переведены в дистанционный формат - следите за информацией на сайте.\n\nПо всем вопросам работает горячая линия Университета:\n\n- для студентов и абитуриентов +7 499 215 65 65 или spravka@mirea.ru\n- для сотрудников +7 499 215 32 14 или hotline@mirea.ru\n\nАдминистрация Университета желает всем здоровья и хорошего настроения!','Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.','fc51aeff16cef657f37867ad84cb8e6e.jpg'),(3,'25.03.2020','Выдача стипендий в кассе университета','Студентам, которым назначена стипендия и которые не имеют стипендиальных банковских карт, денежные средства будет выдаваться по следующему расписанию:\n\n• 27 марта с 10:00 до 16:00\n• 6 и 7 апреля с 10:00 до 16:00\n\nОбед с 13:00 до 14:00.\n\nПроход в знание университета будет разрешён студентам по спискам только в дни выдачи стипендии при предъявлении паспорта сотруднику на посту охраны. Перед обращением в окно кассы в обязательном порядке необходимо зайти в бухгалтерию в кабинет Д-220. При себе обязательно иметь паспорт. Касса находится в кампусе на проспекте Вернадского, 78 в корпусе «Д», около бухгалтерии.','Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.','c190e84704bad3ed452582424bb09dab.jpg'),(4,'26.03.2020','Детский технопарк РТУ МИРЭА «Альтаир» начал дистанционную подготовку школьников к участию в финале городских проектных конференций','Одна из ключевых задач Детского технопарка РТУ МИРЭА «Альтаир» — помощь школьникам в подготовке их индивидуальных проектов, которые затем они могут представить на профильных соревнованиях. В их числе — Московский городской конкурс исследовательских и проектных работ, городские конференции «Инженеры будущего», «Наука для жизни», «Старт в медицину» и другие. Уже в апреле состоятся финалы этих научных состязаний, к которым школьники, чьи проекты были выполнены на площадке Детского технопарка РТУ МИРЭА «Альтаир» в 2019/20 учебном году, сейчас активно готовятся под руководством преподавателей. Но делают это ребята в необычном для себя формате — дистанционном.\n⠀\nВпрочем, и сам порядок проведения второго этапа конференций в этом году изменился. Школьникам необходимо предоставить экспертам ссылку на видеофайл защиты работы, отвечающий определённым требованиям. Чтобы ребята готовились к финалу под руководством своих наставников, реализовано дистанционное обучение на базе социальной сети ВКонтакте.','Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.','2e642001099bdcf930bc346f512c3ef0.jpg'),(5,'27.03.2020','Вниманию студентов, проживающих в общежитиях РТУ МИРЭА','Уважаемые студенты!\n⠀\nНапоминаем вам, что о возобновлении занятий в очном формате Администрация РТУ МИРЭА сообщит вам не менее чем за пять дней до начала обучения.\n⠀\nСтуденты, покинувшие общежития в связи с распространением COVID-19 и желающие туда вернуться, обязаны предъявить медицинский документ — справку об отсутствии противопоказаний для проживания в общежитии, без которой заселение невозможно.\n⠀\nПо всем вопросам работает горячая линия: +7 499 215-65-65, spravka@mirea.ru.\n','Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.','a8dc232202914e75b1542e6a1250fa71.jpg'),(6,'13.04.2020','Cats Anantomy Lab','Huge text','Epil','2fe994a5b882bf1261fe017ec651ca5b.png'),(7,'14.04.2020','Titile','text','text','2fe994a5b882bf1261fe017ec651ca5b.png');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-10 13:39:50
