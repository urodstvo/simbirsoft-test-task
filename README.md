# Приложение для просмотра спортивной статистики «SoccerStat»
Система предназначена для просмотра матчей в рамках лиги и матчей команд.

https://urodstvo.github.io/simbirsoft-test-task/

## Технологии #
* Семантическая верстка
* Адаптивная верстка под устройства:
    + iPhone XR: 896 x 414
    + Desktop: 1366×768
    + Desktop: 1920×1080
    
    Поддержка портретной и ландшафтной ориентаций экрана.
* React 18
* React Router Dom 6
* Mantine UI KIT
* Framer Motion
* Redux Toolkit
* API - https://www.football-data.org/v4/ (10 запросов / минута)

## Проблемы с CORS #
Для использования API со стороны разработанного клиента было решено использовать свой Proxy Server без ограничений:
* Был произведен Fork: https://github.com/Rob--W/cors-anywhere;
* Самостоятельно развернут Proxy Server с установленым `CORSANYWHERE_WHITELIST` на Vercel.

Ссылка на развернутый Proxy Server: https://github.com/urodstvo/cors-anywhere

## Основные функции # 
* Просмотр списка лиг/соревнований;
* Просмотр списка команд;
* Просмотр списка матчей лиги/соревнования (календаря лиги);
* Просмотр списка матчей команды (календарь лиги).

## Выполненные требования # 
* Все страницы сайта корректно отображаются (согласно ТЗ);
* Русский интерфейс пользователя;
* Учет временных зон (перевод времени из UTC в локальное время
пользователя);
* Обработанные события при достижение ограничений API;
* Чистый код ( `Prettier` и `ESLint` ).


## Установка #
* Скопируйте проект на компьютер;

```cmd
git clone https://github.com/urodstvo/simbirsoft-test-task
```


* Установите зависимости;

```cmd
pnpm install
```


* Создайте файл ``.env``; 

```.env
VITE_API_URL=...
VITE_API_TOKEN=...
```


* Запустите сервер разработки.

```cmd
pnpm dev
``` 

