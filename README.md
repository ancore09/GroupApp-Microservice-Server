GroupAppMicroservicesServer

Для запуска сервера нужно:

1. Поднять контейнер rabbitmq командой "docker run -d -p 5672:5672 rabbitmq"
2. Изменить ip в файле envinronments.js на ip компьютера в локальной сети
3. Изменить пароль для root пользователя MySQL.
3. Создать базу данных MySQL: Выполнить код в командной строке MySQL командой "source путь_к_файлу_скрипта;" для следующих файлов:
  a) lessons_sql/lessons.sql
  b) news_sql/news.sql
  c) news_sql/news.sql
  d) users-groups_sql/users-groups.sql
4. Запустить командой "node имя_файла" следующие файлы:
  a) gateway.js
  b) news-service.js
  c) lessons-service.js
  d) file-caht-service.js
  e) group-service.js
