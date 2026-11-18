import assert from "node:assert/strict";

// Запускати проти локального сервера з недоступною або порожньою CMS.
const base = process.argv[2] ?? "http://127.0.0.1:3000";
for (const path of ["/", "/blog", "/about", "/contact", "/missing-page"]) {
  const response = await fetch(new URL(path, base));
  const html = await response.text();
  assert.equal(response.status, path === "/missing-page" ? 404 : 200, path);
  assert.match(html, /<main[\s>]/, path);
  assert.match(html, /site-header/, path);
  assert.match(html, /site-footer/, path);
  assert.doesNotMatch(html, /style="[^"]*opacity:\s*0/, path);
  assert.doesNotMatch(html, /<form[\s>]/, path);
  const content = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? "";
  if (path === "/") {
    assert.match(content, /home-hero/);
    assert.match(content, /How AI will/);
    assert.match(content, /Change the Future/);
    assert.match(content, /Our Recent Post/);
    assert.match(content, /Popular Post/);
    assert.equal((content.match(/class="posts-empty"/g) ?? []).length, 3);
    assert.match(content, /href="\/blog"/);
  } else if (path === "/blog") {
    assert.match(content, /Find our all blogs from here/);
    assert.equal((content.match(/class="posts-empty"/g) ?? []).length, 1);
  } else {
    assert.doesNotMatch(content, /class="posts-empty"/);
  }
  console.log(`PASS ${response.status} ${path}: page structure preserved`);
}
