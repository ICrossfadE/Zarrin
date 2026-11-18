# 004 — Статті з наданого API Strapi

Мета: замінити локальний `posts` асинхронним `getPosts()` за явним запитом власника та оновити типізацію за наданою JSON-відповіддю.

Обсяг: типи API й незалежний від CMS тип Post, fetch helper, repository, поточні споживачі даних, документація. Не входить: налаштування Strapi, зміна контенту CMS, публікація, нові сервіси, форми або редизайн.

План:
1. Перевірити авторські файли, Git та наданий JSON; зберегти наявні зміни власника.
2. Типізувати відповідь, нормалізувати null, URL медіа, дату та slug; прибрати локальні fixtures і виклик під час імпорту.
3. Перевести repository і споживачів на await, підтримати порожній список, невідомий slug та малу кількість статей.
4. Виконати lint/typecheck/build, перевірку перетворення на наданій відповіді та доступний локальний перегляд; записати фактичні результати.

Критерії: без any, без підміни API моками, усі статті доступні зі списку, null Slug має стабільний fallback documentId, null Post_text не створює вигаданого тексту. UI не залежить від назв полів Strapi. Збірка не потребує запущеної CMS.

Початкові зміни власника: src/app/page.tsx, src/app/blog/page.tsx, src/features/blog/mock-posts.ts, src/features/blog/repository.ts, невідстежувана src/lib/. Секрети .env не читалися.

## Результат

Виконано: getPosts замінив posts, прибрані any, дебаг-логи й побічний запит під час імпорту. Додано StrapiPost/StrapiPostsResponse та оновлено Post (id/documentId, nullable cover). toPost нормалізує null Slug у documentId, дату, категорію, абсолютний URL та порожній/plain-text body. getPosts проходить пагінацію, сортує за Post_date, перевіряє envelope. fetchAPI зберігає options, перевіряє HTTP-статус, використовує timeout і no-store. Підтримано поточну NEXT_PUBLIC_STRAPI_URL та серверну STRAPI_URL без читання секретів.

Repository, Header/search, Home/Blog, metadata/article переведені на await. Список не прив'язаний до 10 fixtures; малий і порожній набори не ламають вибірки. Slug routes динамічні; build не викликає CMS. Медіа CMS показані через next/image unoptimized для локального Strapi. Статичний промо-hero Home з Figma залишається; його CTA веде до поточної featured-статті. README, architecture, plan і services оновлено.

Перевірки:
- npm run lint — успішно.
- npm run typecheck — успішно.
- NEXT_TELEMETRY_DISABLED=1 npm run build — успішно поза sandbox; усі 6 типів маршрутів dynamic. Sandbox-спроба після компіляції впала з EPERM на mkdir .next/server/app/_global-error.segments/_global-error; дозволений повтор успішний.
- Node.js inline-перевірка через TypeScript transpileModule/vm на наданому JSON — успішно: 3 записи, documentId fallback, URL медіа, null text/media/category, plain-text paragraphs, дві сторінки API, порожній список, некоректний envelope, помилка 403. Запити API у цій окремій перевірці були замінені контрольованими відповідями, не у застосунку.
- Production npm start -- --hostname 127.0.0.1 --port 3102 поза sandbox + браузер із реальним наявним Strapi — /blog показує всі 3 записи й 3 видимі фото; перехід до dancer через documentId показує заголовок, cover та повідомлення про відсутній текст. /blog/missing-article показує UI 404; HTTP-статус окремо не виміряний. Home показує CMS-картки. Пошук Train повертає статтю CMS; Escape закриває діалог і повертає focus із outline 3px.
- Blog при viewport 1280 і 390 px — без горизонтального overflow; усі видимі фото завантажені. Viewport override скинуто. Hover/transition та reduced-motion перевірені статично в незмінених CSS/Reveal; окремий runtime reduced-motion/hover тест не виконаний.
- git diff --check — успішно, лише попередження Git про LF/CRLF.

Обмеження й наступний крок: наданий Post_text = null, тому формат непорожнього rich text невідомий. Підтримано string/null; Blocks потребує окремого прикладу. У CMS фото/категорії перших двох статей не відповідають заголовкам — дані власника не виправлялися. Через спільний пошук Header усі сторінки потребують доступної CMS. Featured/popular — тимчасова вибірка за датою, не CMS-прапорець/аналітика. Остаточні slug, текст і відповідність медіа треба заповнити у CMS. Форми, права доступу, акаунти й публікацію не змінено.
