# Архітектура Zarrin

## Стан і межі

Реалізовано локальний frontend: шість типів сторінок, спільні компоненти в `src/components`, локальні статті у `src/features/blog`, GSAP reveal та інертні форми. CMS та зовнішніх сервісів немає. Нижче збережена цільова структура; фактична структура компактніша й не містить порожніх абстракцій.

## Стек

- Next.js App Router: маршрутизація, серверний рендеринг і metadata.
- React + TypeScript strict: типізація даних і компонентів.
- Tailwind CSS через PostCSS: стилі та майбутні дизайн-токени у `@theme`.
- GSAP + ScrollTrigger: reveal секцій через `components/reveal.tsx`, `gsap.matchMedia` та cleanup.
- Raleway і Roboto: локальні OFL-шрифти з пакетів Fontsource, завантажуються через `next/font/local`.
- npm та package-lock.json: відтворюване встановлення. ESLint і TypeScript: статичні перевірки.

Конкретні встановлені версії — у package.json і lockfile. Сторонні UI-бібліотеки для цього макета наразі не потрібні.

## Цільова структура (створюється поетапно)

```text
src/
  app/
    layout.tsx                 # metadata, глобальні стилі
    page.tsx                   # Home: /
    blog/page.tsx              # Blog: /blog
    blog/[slug]/page.tsx       # один шаблон для всіх статей
    about/page.tsx             # /about
    contact/page.tsx           # /contact
    not-found.tsx              # системна 404
  components/
    layout/                    # Header, Footer, mobile navigation
    ui/                        # Button, Container, Section, поля
    blog/                      # BlogCard, BlogGrid, ArticleContent
    sections/                  # секції конкретних сторінок
    motion/                    # клієнтська межа Reveal
  features/blog/
    types.ts                   # незалежна від CMS модель
    repository.ts              # список і пошук за slug
    mock-posts.ts              # локальні демонстраційні статті
  lib/                       # лише реальні спільні утиліти
public/
  images/                    # локальні оптимізовані assets
  fonts/                     # після перевірки шрифтів і ліцензій
docs/
task/
AGENTS.md
```

Не створювати порожні абстракції наперед. Розділяти компоненти, коли є повторення або окрема відповідальність.

## Дані блогу та майбутня CMS

Реалізовано 10 локальних статей у `mock-posts.ts` з перевіркою `satisfies Post[]` та типи `Post`, `Picture`, `ContentBlock`. Одна містить текст шаблону Figma, дев'ять — короткий демонстраційний контент із карток. UI звертається до `listPosts()` та `getPostBySlug(slug)` через repository. Усі slug пререндеряться `generateStaticParams`, невідомі повертають 404. Автор, SEO-поля та розширена модель CMS нижче є планом, не виконаними можливостями.

Цільова модель Post: id, slug, title, excerpt, cover (src, alt, width, height), category, author, publishedAt (ISO), body (типізовані блоки тексту, заголовків, зображень і цитат), SEO title/description. Категорії та автори можуть бути окремими моделями при підключенні CMS.

Після погодження CMS замінюється реалізація repository; UI лишається незалежним від SDK провайдера. Валідація зовнішнього контенту відбувається на сервері, секрети не мають префікса NEXT_PUBLIC. Для оновлення публікацій окремо визначити стратегію кешу, preview/draft та захищеної revalidation. Зараз жодних SDK, API routes, БД або webhook немає.

## Рендеринг і анімації

Сторінки, статті та завантаження даних — Server Components. Клієнтські компоненти потрібні для mobile menu, локальних UI-станів і GSAP. Reveal використовує refs, ізольований GSAP context, cleanup при unmount та навігації. ScrollTrigger реєструється лише на клієнті. Для reduced motion анімації вимкнені; базовий CSS залишає контент видимим без JS.

## Дизайн і адаптивність

Style Guide та макети прочитано через настільну програму; підтверджені значення й інженерні рішення розмежовані у [design-audit.md](design-audit.md). Сітки fluid, адаптивні правила охоплюють desktop, tablet і mobile. Контент залишається видимим без JS; лише пошук, автоматичне закриття мобільного меню та reveal потребують клієнтського коду.

Кожен інтерактивний елемент має pointer, hover, transition і видимий keyboard focus. Семантичні посилання для навігації, кнопки для дій. Контактна форма та підписка тільки візуальні: без надсилання й збереження даних, без submit і повідомлень про вигаданий успіх. Пошук, фільтри й пагінацію реалізовувати лише коли їх наявність та поведінку підтверджено.

## Якість і підготовка до релізу

ESLint, TypeScript і production build для змін коду. Для реалізованих сторінок: візуальне порівняння з Figma, 360/390/768/1024/1440 px і проміжні ширини, відсутність горизонтального скролу, keyboard/mobile navigation, reduced motion, 404, переходи, відсутність мережевих запитів форм. Автоматичні тести додавати для значущої поведінки, а не для технічної заглушки.

До публікації: page metadata, canonical, Open Graph, sitemap, robots та Article structured data на справжньому контенті; фінальний домен потрібен для абсолютних URL. Оптимізація локальних зображень через next/image, перевірка LCP/CLS, доступності та ліцензій. Інфраструктурні рішення окремо описані у services.md і потребують згоди.
