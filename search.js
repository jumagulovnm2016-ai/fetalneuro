/* FetalNeuro — поиск: регистр, ё/е, синонимы и аббревиатуры, все поля карточек. */
var FN = globalThis.FN = globalThis.FN || {};
(function () {
  /* Нормализация сохраняет длину строки — это позволяет подсвечивать совпадения в исходном тексте. */
  function normalize(s) {
    let out = "";
    for (const ch of String(s)) {
      let c = ch.toLowerCase();
      if (c.length !== 1) c = ch;
      if (c === "ё") c = "е";
      else if (/[\s\-‐‑–—_/\\.,;:!?()«»"'“”„\[\]{}+]/.test(c)) c = " ";
      out += c.length === ch.length ? c : ch;
    }
    return out;
  }
  const stem = t => (t.length >= 5 && /[а-я]$/.test(t)) ? t.replace(/(ями|ами|ого|его|ому|ему|ыми|ими|ая|яя|ое|ее|ые|ие|ий|ый|ой|ам|ям|ах|ях|ов|ев|ей|ью|ия|ии|ию|[аяиыеоуюйь])$/, "") : t;
  const tokens = q => normalize(q).split(" ").filter(Boolean).map(stem);

  const LABELS = { how: "Как получить", check: "Норма", measure: "Измерения", errors: "Ошибки", abnormal: "Патология", structures: "Структуры",
    def: "Суть", keys: "Признаки", finding: "Находка", steps: "Что проверить", note: "Примечание", views: "По срезам", ddx: "Дифдиагноз", assoc: "Сочетания", pitfalls: "Ловушки", prognosis: "Прогноз", refer: "Тактика" };

  function doc(type, id, href, title, nameList, fields) {
    const names = nameList.filter(Boolean).map(n => " " + normalize(n) + " ");
    const parts = [];
    Object.entries(fields).forEach(([f, arr]) => (arr || []).forEach(text => parts.push({ field: f, text, norm: normalize(text) })));
    return { type, id, href, title, names, parts, all: names.join(" ") + " " + parts.map(p => p.norm).join(" ") };
  }
  function buildIndex(D) {
    const anoms = (D.ANOMALIES || []).map(a => doc("anom", a.id, `#/anom/${a.id}`, a.name, [a.abbr, a.name, a.en, ...(a.aliases || [])],
      { def: [a.def], keys: a.keys, views: Object.values(a.views || {}), ddx: (a.ddx || []).map(d => `${d.name} — ${d.key}`),
        assoc: [a.assoc], pitfalls: a.pitfalls, prognosis: [a.prognosis], refer: [a.refer] }));
    const algos = (D.ALGOS || []).map(a => doc("algo", a.id, `#/algo/${a.id}`, a.title, [a.title],
      { finding: [a.finding], steps: a.steps, ddx: a.ddx.map(d => `${d.name} — ${d.key}`), note: [a.note] }));
    return anoms.concat(algos, (D.VIEWS || []).map(v => {
      const names = [v.abbr, v.name, ...(v.aliases || [])].map(n => " " + normalize(n) + " ");
      const parts = [];
      const fields = { how: v.how, check: v.check, measure: v.measure, errors: v.errors, abnormal: v.abnormal,
        structures: (v.structures || []).map(s => s.name + (s.note ? " — " + s.note : "")) };
      Object.entries(fields).forEach(([f, arr]) => (arr || []).forEach(text => parts.push({ field: f, text, norm: normalize(text) })));
      return { type: "view", id: v.id, href: `#/view/${v.id}`, title: v.name, names, parts, all: names.join(" ") + " " + parts.map(p => p.norm).join(" ") };
    }));
  }

  function snippet(part, toks, radius = 60) {
    const first = toks.map(t => part.norm.indexOf(t)).filter(i => i >= 0).sort((a, b) => a - b)[0] ?? 0;
    const start = Math.max(0, first - radius), end = Math.min(part.text.length, first + radius * 1.6);
    const text = part.text.slice(start, end), norm = part.norm.slice(start, end);
    const ranges = [];
    toks.forEach(t => { let i = norm.indexOf(t); while (i >= 0) { ranges.push([i, i + t.length]); i = norm.indexOf(t, i + t.length); } });
    ranges.sort((a, b) => a[0] - b[0]);
    const merged = [];
    ranges.forEach(r => { const l = merged[merged.length - 1]; if (l && r[0] <= l[1]) l[1] = Math.max(l[1], r[1]); else merged.push(r.slice()); });
    return { pre: start > 0, post: end < part.text.length, text, ranges: merged, field: part.field, label: LABELS[part.field] || part.field };
  }

  function query(docs, q) {
    const toks = tokens(q);
    if (!toks.length) return [];
    const res = [];
    docs.forEach(d => {
      if (!toks.every(t => d.all.includes(t))) return;
      let score = 0;
      if (d.names.some(n => n === " " + toks.join(" ") + " ")) score += 50;
      toks.forEach(t => {
        if (d.names.some(n => n.includes(" " + t))) score += 10;
        else if (d.names.some(n => n.includes(t))) score += 6;
        d.parts.forEach(p => { if (p.norm.includes(t)) score += 1; });
      });
      const inName = toks.every(t => d.names.some(n => n.includes(t)));
      const part = inName ? null : d.parts.find(p => toks.some(t => p.norm.includes(t)));
      res.push({ type: d.type, id: d.id, href: d.href, title: d.title, score, snippet: part ? snippet(part, toks) : null });
    });
    return res.sort((a, b) => b.score - a.score);
  }

  FN.search = { normalize, tokens, buildIndex, query, LABELS };
  if (typeof module !== "undefined" && module.exports) module.exports = FN.search;
})();
