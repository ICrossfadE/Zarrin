# 006 — Зображення статей через imageUrl

## Уточнення API — продовження

Власник надав скриншот відповіді. Повторний GET підтвердив точну назву `image_url` (а не imageUrl/imageURL); поле присутнє в обох записах із Dropbox URL. Попередній висновок про відсутність поля був помилковим: перевірявся неправильний ключ.

План виправлення: змінити контракт Strapi й toPost на `image_url`, зберегти незалежне UI-поле `Post.imageUrl`, оновити регресійний сценарій та docs; повторити lint/typecheck/build і перевірити реальні Dropbox-файли. Критерій: обидва UI URL походять з image_url та містять raw=1.

Результат продовження: мапінг і тип Strapi виправлені на image_url. Регресійна перевірка тепер використовує фактичну назву поля. `npm run lint`, `npm run typecheck`, `node task/check-blog-fallback.mjs` та production build поза sandbox пройшли. Браузер на http://127.0.0.1:3107/blog підтвердив для обох desktop-карток Dropbox src із raw=1 та complete=true/naturalWidth>0; обидва фото візуально присутні. Попереднє обмеження щодо відсутнього imageUrl у JSON вирішено правильним мапінгом. Залишено сервер на 3107. Додаткова mobile/reduced-motion перевірка у цьому продовженні не повторювалася: розмітка й CSS не змінені.

Мета: замінити всі використання post.cover на imageUrl після перевірки сумісності Dropbox-посилань.

Обсяг: нормалізація URL у toPost, тип Post, картки/featured/article, документація та перевірки. Не входить: зміни CMS, контенту, сортування, форм, нові сервіси або публікація.

Початкові зміни власника: blog.tsx (форматування), blog-posts.ts і types.ts (imageUrl/sortOrder). Зберегти їх.

План:
1. Прочитати авторські файли, Git, локальну документацію Next Image і офіційну довідку Dropbox.
2. Нормалізувати файлові Dropbox share links через raw=1 зі збереженням rlkey; HTTP(S), порожні й некоректні значення обробити без падіння списку. Зберегти наявний fallback Post_image, якщо imageUrl порожній.
3. Прибрати cover із моделі Post й усіх UI-використань; src=imageUrl, alt=title, розміри слотів із наявної геометрії CSS. Лишити unoptimized для прямого завантаження браузером.
4. Перевірити нормалізацію, наявну регресію, lint/typecheck/build і доступний браузер desktop/mobile, hover/focus/reduced motion.
5. Оновити docs і записати результати та обмеження.

Критерії: картки Home/Blog/related, featured та обкладинка статті використовують imageUrl; post.cover у src відсутній; Dropbox /s/ і /scl/fi/ отримують raw=1 без dl; порожні URL не рендерять img. Не потрібні Dropbox SDK, авторизація чи серверне завантаження зображень.

Аналіз: https://help.dropbox.com/share/force-download рекомендує raw=1 для прямого рендеру файла й попереджає про redirect. Потрібний загальнодоступний файл без входу/пароля. next/image unoptimized передає URL браузеру; remotePatterns для серверної оптимізації тут не потрібний. imageUrl не містить intrinsic dimensions/alt: використовуємо розміри наявних UI-слотів та заголовок статті як alt; це не метадані файла. Конкретне Dropbox-посилання власника ще не перевірене.

## Результат

Виконано: cover прибраний із Post/toPost та всіх споживачів у src. imageUrl використовується картками, featured й обкладинкою статті. normalizeImageUrl обробляє Dropbox raw/rlkey, прямі HTTP(S) та відносні Strapi URL, порожні/некоректні значення. Збережено fallback на Post_image для порожнього поля, форматування власника й sortOrder без зміни сортування. README та architecture оновлені.

Перевірки:
- `node task/check-blog-fallback.mjs` — успішно: додано Dropbox /s/ і /scl/fi/, збереження rlkey, видалення dl, прямий CDN, relative media, null/undefined/blank/invalid URL, неприпустимі схеми, fallback та відсутність cover. Попередні сценарії помилок CMS/пагінації/відновлення також пройшли.
- `npm run lint`, `npm run typecheck` — успішно.
- `NEXT_TELEMETRY_DISABLED=1 npm run build` — успішно поза sandbox. Початкова спроба скомпілювала код, але отримала EPERM на mkdir .next/server/app/_global-error.segments/_global-error; дозволений повтор завершився з усіма dynamic routes.
- Production на http://127.0.0.1:3106: Blog при desktop 1920 та mobile 390 без горизонтального overflow. Слоти карток 400×360 та ~287.75×258.97. Стаття відкривається, src обкладинки абсолютний, alt містить заголовок, overflow немає. Escape у пошуку повертає focus із outline 3px. Viewport скинуто.
- Hover/transition і reduced motion перевірені статично у незмінених CSS/Reveal; окрема runtime-емуляція reduced motion і hover не виконувалася. Журнал вкладки містив попередні dev hydration-повідомлення про атрибути розширення Grammarly; нових production-помилок у поверненій вибірці не було.
- Поточний публічний Strapi API повертає два записи (id 7, 8) без поля imageUrl. Тому live UI використовує fallback Post_image.url. Ці старі uploads не завантажилися у браузері (complete=true, naturalWidth=0); геометрія слотів збережена. Конкретне Dropbox-фото в браузері не перевірене, нормалізація перевірена контрольованими даними.

Відкрите питання / наступний крок: забезпечити наявність заповненого imageUrl у публічній відповіді Strapi та повторити перевірку реального Dropbox-файла без входу. Схему, публікації й контент CMS не змінювали. Залишено локальний production-сервер на порту 3106 для перегляду.
