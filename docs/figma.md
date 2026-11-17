# Джерела дизайну

[Основний файл Zarrin](https://www.figma.com/design/TvAKe7WblMMsW6Zxc3ikpp/Free-Blog-Website-Template--Community-?node-id=401-1400).

| Сторінка | Desktop | Mobile |
| --- | --- | --- |
| Home | [401:1400](https://www.figma.com/design/TvAKe7WblMMsW6Zxc3ikpp/Free-Blog-Website-Template--Community-?node-id=401-1400) | [401:1689](https://www.figma.com/design/TvAKe7WblMMsW6Zxc3ikpp/Free-Blog-Website-Template--Community-?node-id=401-1689) |
| Blog | [401:290](https://www.figma.com/design/TvAKe7WblMMsW6Zxc3ikpp/Free-Blog-Website-Template--Community-?node-id=401-290) | [401:1818](https://www.figma.com/design/TvAKe7WblMMsW6Zxc3ikpp/Free-Blog-Website-Template--Community-?node-id=401-1818) |
| Blog template | [401:544](https://www.figma.com/design/TvAKe7WblMMsW6Zxc3ikpp/Free-Blog-Website-Template--Community-?node-id=401-544) | [401:1926](https://www.figma.com/design/TvAKe7WblMMsW6Zxc3ikpp/Free-Blog-Website-Template--Community-?node-id=401-1926) |
| About | [401:1124](https://www.figma.com/design/TvAKe7WblMMsW6Zxc3ikpp/Free-Blog-Website-Template--Community-?node-id=401-1124) | [401:2014](https://www.figma.com/design/TvAKe7WblMMsW6Zxc3ikpp/Free-Blog-Website-Template--Community-?node-id=401-2014) |
| Contact | [401:655](https://www.figma.com/design/TvAKe7WblMMsW6Zxc3ikpp/Free-Blog-Website-Template--Community-?node-id=401-655) | [401:2095](https://www.figma.com/design/TvAKe7WblMMsW6Zxc3ikpp/Free-Blog-Website-Template--Community-?node-id=401-2095) — знайдено в програмі |
| 404 | [401:875](https://www.figma.com/design/TvAKe7WblMMsW6Zxc3ikpp/Free-Blog-Website-Template--Community-?node-id=401-875) | [401:2188](https://www.figma.com/design/TvAKe7WblMMsW6Zxc3ikpp/Free-Blog-Website-Template--Community-?node-id=401-2188) — знайдено в програмі |

## Статус перевірки

Актуально 2026-11-17: за явним запитом власника макети прочитано у настільній Figma, файл **Free Blog Website Template (Community)**, сторінка **Free Blog website Template design**. Через інтерфейс експортовано 28 фреймів: desktop, tablet, mobile, Style Guide, License та компоненти. Тексти, палітру, геометрію й оригінальні ресурси отримано з цих експортів. Створено локальні сторінки. MCP досі недоступний; це погоджений альтернативний workflow. [Аудит і обмеження](design-audit.md), [task/003](../task/003-figma-pages.md). Наведені нижче невдалі MCP-спроби — історія підготовки, не поточний стан UI.

На етапі ініціалізації вебінструмент не зміг відкрити Figma. Макети та style guide візуально не перевірені. Окремий node style guide не надано. Доступ до Figma через окрему інтеграцію не налаштовувався. Значення кольорів, назви шрифтів, розміри та assets не визначені; технічна заглушка не відтворює дизайн.

Повторна перевірка 2026-11-17: каталог плагінів показує Figma як установлену й увімкнену, проте інструменти Figma MCP у поточній сесії агента відсутні. Отримати design context, screenshots або assets неможливо; читання nodes не виконувалося. Причина недоступності інструментів не встановлена, права на файл та авторизацію не перевірено. Реалізація сторінок не розпочата, довільний дизайн не додавався. Деталі та наступний крок: [task/003](../task/003-figma-pages.md).

## Що зафіксувати перед версткою

- Кольори, typography desktop/mobile, ваги шрифтів і право їх використання.
- Контейнери, grid, spacing, радіуси, межі й тіні.
- Header/Footer, картки, кнопки, поля, активні стани та hover/focus.
- Склад секцій, порядок на mobile, image crops та пропорції.
- Оригінальні assets, alt-тексти, ліцензії фотографій і графіки.
- Адаптацію Contact/404 та motion-параметри: Figma може не задавати GSAP-поведінку, її слід зафіксувати як окреме рішення.
