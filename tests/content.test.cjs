const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs"), path = require("path");
const { load, ROOT } = require("./load.cjs");
const FN = load();

test("валидатор: контент без ошибок", () => {
  assert.deepEqual([...FN.validate(FN).errors], []);
});

test("у каждого источника есть PMID и DOI", () => {
  for (const [id, s] of Object.entries(FN.REFS)) assert.ok(s.pmid && s.doi, `${id}: нет PMID/DOI`);
});

test("пока нет экспертной проверки — всё черновик", () => {
  for (const v of [...FN.VIEWS, ...FN.ANOMALIES]) assert.notEqual(v.status, "approved", v.id);
});

test("если у среза есть изображение, номера на нём совпадают с легендой", () => {
  for (const v of FN.VIEWS) {
    if (!FN.SCHEMES[v.id]) continue;
    const svg = FN.SCHEMES[v.id]();
    const nums = new Set([...svg.matchAll(/data-n="(\d+)"/g)].map(m => +m[1]));
    assert.equal(JSON.stringify([...nums].sort((a, b) => a - b)), JSON.stringify(v.structures.map(s => s.n)), v.id);
  }
});

test("поиск находит по синонимам и аббревиатурам", () => {
  const idx = FN.search.buildIndex(FN);
  const first = q => FN.search.query(idx, q)[0]?.id;
  assert.equal(FN.search.query(idx, "бабочка").some(r => r.id === "t1-axial"), true);
  assert.equal(first("BSOB"), "t1-midsag");
  assert.equal(first("intracranial translucency"), "t1-midsag");
  assert.equal(first("голопрозэнцефалия"), "hpe");
  assert.equal(first("crash sign"), "osb");
  assert.equal(first("Денди-Уокер"), "pf-cystic");
  assert.equal(FN.search.query(idx, "позвоночник").some(r => r.id === "t1-spine"), true);
  assert.equal(FN.search.query(idx, "четвёртый желудочек").some(r => r.id === "t1-midsag"), true);
});

test("прогресс: экспорт → импорт без потерь, чужие ключи отбрасываются", () => {
  const out = FN.progress.build({ studied: { "v_t1-axial": 1 }, quizBest: { score: 7, total: 10 } });
  const res = FN.progress.parse(JSON.stringify({ ...out, data: { ...out.data, studied: [...out.data.studied, "v_nope", "x"] } }), FN);
  assert.ok(res.ok);
  assert.deepEqual(Object.keys(res.data.studied), ["v_t1-axial"]);
  assert.equal(res.skipped.length, 2);
  assert.equal(FN.progress.parse('{"app":"fetalcardio","format":1}', FN).ok, false);
});

test("service worker: все файлы из FILES существуют", () => {
  const sw = fs.readFileSync(path.join(ROOT, "sw.js"), "utf8");
  const files = JSON.parse(sw.match(/const FILES = (\[[\s\S]*?\]);/)[1]);
  for (const f of files) if (f !== "./") assert.ok(fs.existsSync(path.join(ROOT, f)), f);
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  for (const m of html.matchAll(/<script src="([^"]+)"/g)) assert.ok(files.includes(m[1]), `${m[1]} нет в FILES`);
});

test("эхограммы: файлы есть, привязки к существующим срезам, лицензия CC BY и DOI", () => {
  const views = new Set(FN.VIEWS.map(v => v.id)), anoms = new Set(FN.ANOMALIES.map(a => a.id));
  for (const im of FN.IMAGES) {
    assert.ok(fs.existsSync(path.join(ROOT, im.file)), im.file);
    assert.ok(fs.statSync(path.join(ROOT, im.file)).size < 2e6, `${im.file} больше 2 МБ`);
    for (const c of im.cards) { const [k, id] = c.split(":"); assert.ok((k === "view" && views.has(id)) || (k === "anom" && anoms.has(id)), `${im.id} → ${c}`); }
    assert.match(im.source.license, /^CC BY/);
    assert.ok(im.source.doi && im.caption && im.captionRu, im.id);
    assert.notEqual(im.status, "approved", im.id);
  }
});
