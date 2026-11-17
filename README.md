# Zarrin

Локальна frontend-версія блогу за Figma: Home, Blog, спільний шаблон статті, About, Contact і 404. Next.js App Router, TypeScript strict, Tailwind CSS, GSAP. Дизайн прочитано через настільну Figma на запит власника; зображення й шрифти локальні. CMS не підключена.

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

Dev і build використовують штатний Webpack: у цьому Windows-середовищі Turbopack завершується помилкою зв'язку з дочірнім процесом PostCSS. `agentRules: false` зберігає авторський AGENTS.md без автоматичних дописувань Next.js.

## Локальні сторінки

- `/`, `/blog`, `/about`, `/contact` та системна 404.
- `/blog/vr-and-ai-technology` — повний текст шаблону з Figma; ще дев'ять slug — короткі демонстраційні статті через той самий шаблон.
- Пошук у локальних заголовках на desktop; нативне мобільне меню. Reveal враховує reduced motion та очищає GSAP-контекст.
- Contact і підписка — лише UI: без submit, збереження, Server Actions, API та імітації успіху. Позначки соцмереж статичні, бо справжніх URL немає.

## Документація

- [Архітектура](docs/architecture.md)
- [План](docs/plan.md)
- [Figma та перевірка дизайну](docs/figma.md)
- [Аудит макетів та припущення](docs/design-audit.md)
- [Походження локальних ресурсів](docs/assets.md)
- [Сервіси: рекомендації для запуску](docs/services.md)
- [Інструкції агента](AGENTS.md)
- [Задача початкової підготовки](task/001-project-bootstrap.md)

Зовнішні сервіси не підключені. Для локального запуску ключі та `.env` не потрібні. Зовнішні шрифти, зображення та скрипти не завантажуються застосунком. Публікація не виконувалася.
