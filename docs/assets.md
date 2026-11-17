# Локальні ресурси

Фотографії та графіка походять із SVG-експорту настільної Figma. 18 оригінальних вбудованих зображень збережено без зміни байтів під іменами `figma-<SHA256 prefix>.<ext>` у `public/images`. Розміри й crop прочитані з оригінальних image/pattern/rect. Не використовуються сторонні URL зображень або скриншот сторінки як UI.

| Ресурс (префікс після figma-) | Місце використання |
| --- | --- |
| `0baca7f60787` | AI hero, desktop/mobile, crop та flip з оригіналу |
| `4004a774221d` | Велика featured-картка Home |
| `fb80902beb88` | Горизонтальна featured-картка Home |
| `ebf4c500421c` | Cover основної статті |
| `edc92e07a436` | VR driving image у тексті статті |
| `41d4d8f25f4c`, `08ec2232327f`, `caef8440b997` | Train, research website, dancer — перший desktop-ряд Popular/Blog |
| `781de015a274`, `7786d0846271`, `58841afaabe0` | Singer, business, chocolates — другий desktop-ряд |
| `6d36e982af93`, `98307fdeabf7`, `3b873f22ee45` | Island, portfolio, football — recent-картки, третій desktop-ряд Blog і mobile |
| `d1a94df89820` | Команда на About |
| `29cd27ec56dd` | Статична карта Contact |
| `a62244794351` | Оригінальна mobile menu icon |
| `72e51fe9f2cb` | Збережений оригінал непрозоро перекритого фону newsletter; у UI не потрібний |

Векторні групи з оригінальних експортів збережені як окремі SVG: `logo-mark`, `search`, `hero-wave-top/bottom`, `newsletter-wave-left/right`, `not-found-art`, `office-icon`, `email-icon`, `phone-icon`. Контури не перемальовані; viewBox визначено за непорожніми межами груп. Геометрія UI перевіряється окремо від intrinsic dimensions.

Шрифти Raleway і Roboto надходять із встановлених пакетів `@fontsource-variable/raleway` та `@fontsource-variable/roboto`, self-hosted через `next/font/local`. Обидва пакети містять SIL Open Font License 1.1. Їхні LICENSE залишаються разом із залежностями; клієнт не звертається до Google Fonts.

Фрейм License містить посилання на Unsplash-фото, але не є окремою гарантією прав на всі ресурси. Перед публічним запуском потрібно перевірити права на шаблон, усі медіа й текст. Публікація зараз не виконується.

Необроблені фрейми, inspection.json, локальні референси й скриншоти лежать у `docs/design-exports` та виключені з Git як великі похідні файли. У репозиторії залишаються потрібні застосунку assets і компактна документація. Допоміжні скрипти в `task` використовуються лише для локального аудиту експортів.
