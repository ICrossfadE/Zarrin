# Zarrin

Локальна frontend-версія блогу за Figma: Home, Blog, спільний шаблон статті, About, Contact і 404. Next.js App Router, TypeScript strict, Tailwind CSS, GSAP. Дизайн прочитано через настільну Figma на запит власника; зображення й шрифти локальні. Статті завантажуються з налаштованого Strapi через `getPosts()`.

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
- `/blog/[slug]` — стаття з CMS; якщо Slug порожній, URL використовує documentId.
- Пошук у завантажених заголовках на desktop; нативне мобільне меню. Reveal враховує reduced motion та очищає GSAP-контекст.
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

Для статей потрібні запущений Strapi та `STRAPI_URL` або `NEXT_PUBLIC_STRAPI_URL` (origin, наприклад `http://localhost:1337`). `getPosts()` замінює локальні fixtures, медіа завантажуються з CMS. Сторінки рендеряться під час запиту; build не потребує запущеної CMS. `Slug: null` використовує `documentId`, `Post_text: null` показує відсутність тексту. Деталі й обмеження: [архітектура](docs/architecture.md). Публікація не виконувалася.

Сайт працює й без доступного Strapi: помилка запиту (включно з timeout/HTTP/некоректною відповіддю) перетворюється на порожній список із попередженням у серверному журналі. «No posts yet» показується замість карток у featured/recent/popular секціях Home та у списку Blog. Hero, секції Home, Header/Footer, навігація, About і Contact збережені; CTA hero без статей веде на /blog. Такий самий блок показується для успішної порожньої відповіді. Наступний запит сторінки знову читає CMS; автоматичного опитування немає. Стаття, якої немає у завантаженому списку, як і раніше показує 404.

Регресійна перевірка обробки збоїв: `node task/check-blog-fallback.mjs`.

Зображення статей використовують `Post.imageUrl`, отримане з поля API `image_url` (fallback на `Post_image.url`, якщо поле порожнє). Файлові Dropbox-посилання автоматично отримують `raw=1` зі збереженням `rlkey`; файл має відкриватися без входу/пароля. Завантаження пряме через браузер (`next/image unoptimized`). Деталі — [архітектура](docs/architecture.md).
