/* FetalNeuro — экспорт и импорт учебного прогресса (JSON). */
var FN = globalThis.FN = globalThis.FN || {};
(function () {
  const APP = "fetalneuro", FORMAT = 1;
  const KEY_RE = /^[vaf]_([a-z0-9-]+)$/;
  const validKeys = D => new Set([...(D.VIEWS || []).map(x => "v_" + x.id), ...(D.ANOMALIES || []).map(x => "a_" + x.id), ...(D.ALGOS || []).map(x => "f_" + x.id)]);

  function build(state, now = new Date()) {
    return { app: APP, format: FORMAT, exportedAt: now.toISOString(),
      data: { studied: Object.keys(state.studied || {}).sort(), quizBest: state.quizBest || null } };
  }

  /* Возвращает { ok, data:{studied, quizBest}, skipped:[...], error } — без побочных эффектов. */
  function parse(text, D) {
    let obj;
    try { obj = typeof text === "string" ? JSON.parse(text) : text; } catch { return { ok: false, error: "Файл не является корректным JSON." }; }
    if (!obj || obj.app !== APP) return { ok: false, error: "Это не файл прогресса FetalNeuro." };
    if (obj.format !== FORMAT) return { ok: false, error: `Неподдерживаемая версия формата: ${obj.format}.` };
    const d = obj.data || {};
    if (!Array.isArray(d.studied)) return { ok: false, error: "В файле нет списка изученных разделов." };
    const allowed = validKeys(D), studied = {}, skipped = [];
    d.studied.forEach(k => { if (typeof k === "string" && KEY_RE.test(k) && allowed.has(k)) studied[k] = 1; else skipped.push(String(k)); });
    let quizBest = null;
    if (d.quizBest != null) {
      const q = d.quizBest;
      if (Number.isInteger(q.score) && Number.isInteger(q.total) && q.total > 0 && q.score >= 0 && q.score <= q.total) quizBest = { score: q.score, total: q.total };
      else skipped.push("quizBest");
    }
    return { ok: true, data: { studied, quizBest }, skipped, exportedAt: obj.exportedAt || null };
  }

  FN.progress = { build, parse, APP, FORMAT };
  if (typeof module !== "undefined" && module.exports) module.exports = FN.progress;
})();
