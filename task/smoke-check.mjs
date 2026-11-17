import assert from "node:assert/strict";

// Перевірка локальної production-версії без виконання JavaScript сторінки.
const routes = [
  ["/", 200], ["/blog", 200], ["/about", 200], ["/contact", 200],
  ["/blog/vr-and-ai-technology", 200],
  ["/blog/train-or-bus-journey-which-one-suits", 200],
  ["/missing-page", 404], ["/blog/missing-article", 404],
];

for (const [path, status] of routes) {
  const response = await fetch(`http://127.0.0.1:3100${path}`);
  assert.equal(response.status, status, path);
  const html = await response.text();
  assert.match(html, /<h1[\s>]/, path);
  assert.match(html, /<main[\s>]/, path);
  assert.doesNotMatch(html, /<form[\s>]/, path);
  assert.doesNotMatch(html, /style="[^"]*opacity:\s*0/, path);
  console.log(`${status} ${path}; SSR content present; no forms or hidden content`);
}
