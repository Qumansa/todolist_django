## Тематика проекта:
Приложение для создания списка задач.

## Технологии проекта:
### Backend
+ Python (Django);
+ Django Rest Framework.

### Frontend
+ React:
  + React Hooks;
  + React Router 6.6.
+ Redux:
  + Redux Toolkit;
  + Redux Toolkit Query;
+ TypeScript;
+ Vite;
+ CSS Modules.

Также в приложении авторизация сделана через JWT-токены, где refresh-токен - это HTTP-only cookie.

### Примечание:
Backend разрабатывался Ипатовой Дарьей (https://github.com/feewo).

## Структура проекта:
- Главная;
- Создать аккаунт;
- Логин;
- Список задач;
- Настройки;
- Страница 404.


## Сборка и запуск проекта:
1. cd/frontend 
2. npm i
3. npm run build
4. cd ..
5. python manage.py runserver