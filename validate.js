/* FetalNeuro — схема и валидатор контента. Работает в браузере (FN.validate) и в Node (тесты). */
var FN = globalThis.FN = globalThis.FN || {};
(function () {
  const STATUS = ["draft", "approved", "outdated"];
  const SECTIONS = ["card", "how", "check", "measure", "errors", "abnormal", "structures"];
  const SLUG = /^[a-z0-9][a-z0-9-]*$/, DATE = /^\d{4}-\d{2}-\d{2}$/, DOI = /^10\.\d{4,9}\/\S+$/;
  const str = v => typeof v === "string" && v.trim() !== "";
  const strs = v => Array.isArray(v) && v.length > 0 && v.every(str);

  function validate(D) {
    const errors = [], warnings = [];
    const err = (where, msg) => errors.push(`${where}: ${msg}`);
    const periods = new Set((D.PERIODS || []).map(p => p.id));
    const views = new Set();

    Object.entries(D.REFS || {}).forEach(([id, s]) => {
      const w = `REFS.${id}`;
      if (!SLUG.test(id)) err(w, "id не slug");
      if (!str(s.title)) err(w, "нет title");
      if (!str(s.organization) && !str(s.authors)) err(w, "нет organization/authors");
      if (!Number.isInteger(s.year)) err(w, "нет year");
      if (s.doi && !DOI.test(s.doi)) err(w, "неверный DOI");
      if (!str(s.url)) err(w, "нет url");
      if (s.pmid && !/^\d+$/.test(s.pmid)) err(w, "неверный PMID");
    });

    const review = (w, x) => {
      if (!STATUS.includes(x.status)) err(w, `status «${x.status}»`);
      if (x.status === "approved" && (!str(x.reviewedBy) || !DATE.test(x.reviewedAt || ""))) err(w, "approved без reviewedBy/reviewedAt");
    };

    (D.VIEWS || []).forEach((v, i) => {
      const w = `VIEWS[${i}] ${v.id}`;
      if (!SLUG.test(v.id || "")) err(w, "id не slug");
      if (views.has(v.id)) err(w, "повтор id");
      views.add(v.id);
      if (!periods.has(v.period)) err(w, `неизвестный period «${v.period}»`);
      ["abbr", "name"].forEach(f => str(v[f]) || err(w, `нет ${f}`));
      ["aliases", "how", "check", "errors", "abnormal"].forEach(f => strs(v[f]) || err(w, `${f}: нужен непустой массив строк`));
      if (v.measure !== undefined && !strs(v.measure)) err(w, "measure: массив строк");
      if (!Array.isArray(v.structures) || !v.structures.length) err(w, "нет structures");
      else v.structures.forEach((s, k) => {
        if (s.n !== k + 1) err(w, `structures[${k}]: номер должен быть ${k + 1}`);
        if (!str(s.name)) err(w, `structures[${k}]: нет name`);
      });
      review(w, v);
      if (!Array.isArray(v.references) || !v.references.length) err(w, "нет references");
      else v.references.forEach((r, k) => {
        if (!D.REFS || !D.REFS[r.source]) err(w, `references[${k}]: нет источника ${r.source}`);
        if (!SECTIONS.includes(r.section)) err(w, `references[${k}]: раздел ${r.section}`);
        if (typeof r.verified !== "boolean") err(w, `references[${k}]: verified`);
        if (r.section !== "card" && r.section !== "structures" && !v[r.section]) err(w, `references[${k}]: в карточке нет раздела ${r.section}`);
      });
    });

    (D.PLAN || []).forEach((p, i) => {
      if (!periods.has(p.period)) err(`PLAN[${i}]`, "неизвестный period");
      if (!["view", "anomaly"].includes(p.type)) err(`PLAN[${i}]`, "type");
      if (!str(p.name)) err(`PLAN[${i}]`, "нет name");
    });

    (D.QUIZ || []).forEach((q, i) => {
      const w = `QUIZ[${i}]`;
      if (!str(q.q) || !str(q.exp)) err(w, "нет q/exp");
      if (!strs(q.opts) || q.opts.length < 2) err(w, "opts");
      else if (!Number.isInteger(q.a) || q.a < 0 || q.a >= q.opts.length) err(w, "a вне диапазона");
      if (q.link !== null && !views.has(q.link)) err(w, `link → ${q.link}`);
      review(w, q);
    });
    return { errors, warnings };
  }
  FN.validate = validate;
  if (typeof module !== "undefined" && module.exports) module.exports = validate;
})();
