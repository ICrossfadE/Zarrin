# Zarrin

Локальний каркас майбутнього блогу за Figma. Наразі створено лише базовий Next.js застосунок з TypeScript, App Router, Tailwind CSS та ESLint. Головна сторінка — технічна заглушка. Дизайн, шаблони блогів, GSAP і CMS ще не реалізовані.

## Запуск

Node.js 22+ (рекомендовано 24 LTS), npm.

```sh
npm ci
npm run dev
```

Відкрийте http://localhost:3000. `npm ci` використовується після встановлення залежностей і створення package-lock.json.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

`npm start` запускає вже зібрану production-версію. `npm run check` послідовно виконує lint, typecheck і build. Після чистого checkout Next.js генерує `next-env.d.ts` під час dev/build.

## Документація

- [Архітектура](docs/architecture.md)
- [План](docs/plan.md)
- [Figma та перевірка дизайну](docs/figma.md)
- [Сервіси: рекомендації для запуску](docs/services.md)
- [Інструкції агента](AGENTS.md)
- [Задача початкової підготовки](task/001-project-bootstrap.md)

Зовнішні сервіси не підключені. Для локального запуску ключі та `.env` не потрібні. Зовнішні шрифти, зображення та скрипти не завантажуються застосунком. Публікація не виконувалася.
