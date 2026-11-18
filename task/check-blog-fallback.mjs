import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

// Ізольовано виконуємо справжні API/getPosts/repository з контрольованим fetch.
// Жодні моки не потрапляють у застосунок; React cache тут не перевіряється.
let respond;
const warnings = [];
function load(path, imports) {
  const testModule = { exports: {} };
  const { outputText } = ts.transpileModule(readFileSync(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  vm.runInNewContext(outputText, {
    module: testModule, exports: testModule.exports,
    require(name) {
      assert.ok(name in imports, `Unexpected import: ${name}`);
      return imports[name];
    },
    process: { env: { STRAPI_URL: "http://cms.test" } },
    URL, URLSearchParams, AbortSignal,
    fetch: (...args) => respond(...args),
    console: { warn: (...args) => warnings.push(args) },
  }, { filename: path });
  return testModule.exports;
}
const api = load("src/lib/api.tsx", {});
const blog = load("src/features/blog/blog-posts.ts", {
  react: { cache: (callback) => callback }, "@/lib/api": api,
});
const repository = load("src/features/blog/repository.ts", { "./blog-posts": blog });
const envelope = (data, pageCount = 1) => ({ data, meta: { pagination: { pageCount } } });
const json = (value) => new Response(JSON.stringify(value));
const post = {
  id: 1, documentId: "test-post", Title: "Test post", Slug: null,
  Post_date: null, Post_text: null, Short_description: null,
  publishedAt: "2026-11-18T00:00:00.000Z", Post_image: null, blog_category: null,
};

for (const [name, handler] of [
  ["connection refused", () => { throw new TypeError("fetch failed"); }],
  ["timeout", () => { throw new DOMException("Timed out", "TimeoutError"); }],
  ["HTTP 403", () => new Response(null, { status: 403 })],
  ["HTTP 500", () => new Response(null, { status: 500 })],
  ["invalid JSON", () => new Response("not JSON")],
  ["invalid envelope", () => json({ data: null })],
  ["null response", () => json(null)],
  ["unsupported content", () => json(envelope([{ ...post, Post_text: [] }]))],
]) {
  respond = handler;
  const warningCount = warnings.length;
  assert.equal((await repository.listPosts()).length, 0, name);
  assert.equal(warnings.length, warningCount + 1, `${name}: server diagnostic`);
  assert.equal(await repository.getPostBySlug("test-post"), undefined, name);
  const groups = await repository.getPostGroups();
  assert.equal(groups.featuredPost, undefined, name);
  assert.equal(groups.recentPosts.length, 0, name);
  console.log(`PASS ${name}: empty list, lookup and groups`);
}

respond = () => json(envelope([], 0));
const warningCount = warnings.length;
assert.equal((await blog.getPosts()).length, 0);
assert.equal(warnings.length, warningCount, "Empty success is not an error");
console.log("PASS empty success");

respond = (url) => new URL(url).searchParams.get("pagination[page]") === "1"
  ? json(envelope([post], 2)) : new Response(null, { status: 503 });
assert.equal((await blog.getPosts()).length, 0, "Discard partial pagination after failure");
console.log("PASS failure on second page discards partial list");

respond = () => json(envelope([post]));
const recovered = await blog.getPosts();
assert.equal(recovered.length, 1);
assert.equal(recovered[0].slug, "test-post");
assert.equal((await repository.getPostBySlug("test-post")).title, "Test post");
assert.equal(await repository.getPostBySlug("missing"), undefined);
assert.equal((await repository.getPostGroups()).popularPosts.length, 1);
console.log("PASS next request recovers, mapping/lookup/groups preserved");
