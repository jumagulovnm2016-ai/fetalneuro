(() => {
  const { META, PERIODS, PLAN, VIEWS, QUIZ, REFS } = FN;
  const ANOMALIES = FN.ANOMALIES || [], ALGOS = FN.ALGOS || [];
  const check = FN.validate ? FN.validate(FN) : { errors: [] };
  if (check.errors.length) console.error("FetalNeuro: ошибки контента", check.errors);
  const $app = document.getElementById("app");
  const store = {
    get(k, d) { try { const v = localStorage.getItem("fn_" + k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem("fn_" + k, JSON.stringify(v)); } catch {} },
    del(k) { try { localStorage.removeItem("fn_" + k); } catch {} }
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const byId = (arr, id) => arr.find(x => x.id === id);
  const studied = () => store.get("studied", {});
  const isDone = key => !!studied()[key];
  const toggleDone = key => { const s = studied(); s[key] ? delete s[key] : (s[key] = 1); store.set("studied", s); };

  /* ---------- иконки ---------- */
  const I = {
    chev: '<svg class="chev" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>',
    sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>',
    moon: '<svg viewBox="0 0 24 24"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>',
    auto: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17" /><path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" stroke="none"/></svg>',
    brain: '<svg viewBox="0 0 24 24"><path d="M12 5.5c-1-1.6-3.6-2-5-.6-1.3.2-2.4 1.5-2.2 3-1.4.8-1.8 2.8-.8 4-.9 1.4-.3 3.4 1.3 3.9.3 1.8 2.2 2.9 3.9 2.2.9 1 2 1 2.8.5zM12 5.5c1-1.6 3.6-2 5-.6 1.3.2 2.4 1.5 2.2 3 1.4.8 1.8 2.8.8 4 .9 1.4.3 3.4-1.3 3.9-.3 1.8-2.2 2.9-3.9 2.2-.9 1-2 1-2.8.5zM12 5.5v13"/></svg>',
    algo: '<svg viewBox="0 0 24 24"><circle cx="5" cy="6" r="2.2"/><circle cx="5" cy="18" r="2.2"/><circle cx="19" cy="12" r="2.2"/><path d="M7.2 6H11v12H7.2M11 12h5.8"/></svg>',
    plan: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 9h8M8 13h8M8 17h5"/></svg>',
    quiz: '<svg viewBox="0 0 24 24"><rect x="4" y="3.5" width="16" height="17" rx="3"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>'
  };

  /* ---------- тема ---------- */
  const THEMES = ["auto", "light", "dark"];
  const THEME_LABEL = { auto: "Тема: как в системе", light: "Тема: дневная", dark: "Тема: ночная" };
  const $themeBtn = document.getElementById("themeBtn");
  function applyTheme(t) {
    const root = document.documentElement;
    t === "auto" ? root.removeAttribute("data-theme") : root.setAttribute("data-theme", t);
    const dark = t === "dark" || (t === "auto" && matchMedia("(prefers-color-scheme: dark)").matches);
    document.getElementById("themeColor").setAttribute("content", dark ? "#0a0f1a" : "#f5f7fb");
    $themeBtn.innerHTML = I[t === "auto" ? "auto" : t === "light" ? "sun" : "moon"];
    $themeBtn.title = THEME_LABEL[t]; $themeBtn.setAttribute("aria-label", THEME_LABEL[t]);
  }
  let theme = store.get("theme", "auto");
  applyTheme(theme);
  $themeBtn.addEventListener("click", () => {
    theme = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
    store.set("theme", theme); applyTheme(theme); toast(THEME_LABEL[theme]);
  });
  matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", () => theme === "auto" && applyTheme("auto"));

  let toastTimer;
  function toast(msg) {
    let el = document.getElementById("toast");
    if (!el) {
      el = document.createElement("div"); el.id = "toast";
      el.style.cssText = "position:fixed;left:50%;top:70px;transform:translateX(-50%);z-index:50;padding:9px 16px;border-radius:12px;font-size:14px;font-weight:600;background:var(--text);color:var(--bg);box-shadow:var(--shadow-lg);transition:opacity .25s;pointer-events:none";
      document.body.appendChild(el);
    }
    el.textContent = msg; el.style.opacity = "1";
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.style.opacity = "0", 1300);
  }

  /* ---------- общие блоки ---------- */
  const statusBadge = st => st === "approved"
    ? `<span class="badge ok">✓ проверено автором</span>`
    : `<span class="badge draft">● черновик · на проверке</span>`;

  const SEC_RU = { how: "Как получить", check: "Что оценить в норме", measure: "Измерения", errors: "Типичные ошибки",
    abnormal: "Патологические находки", structures: "Структуры на схеме", card: "вся карточка" };
  const refsBlock = refs => {
    if (!refs || !refs.length) return "";
    const groups = {};
    refs.forEach(r => (groups[r.source] = groups[r.source] || []).push(r));
    const items = Object.entries(groups).map(([id, rs]) => {
      const s = REFS[id]; if (!s) return "";
      const badges = rs.map(r => `<span class="badge wrap ${r.verified ? "ok" : "draft"}">${r.verified ? `сверено с резюме: «${SEC_RU[r.section] || r.section}»` : "источник по теме, утверждения не сверены"}</span>`).join(" ");
      return `<li><b>${esc((s.organization || s.authors).replace(/\.$/, ""))}</b>. ${esc(s.title)}. <i>${esc(s.journal || "")}</i> ${s.year}${s.volume ? `;${esc(s.volume)}` : ""}${s.pages ? `:${esc(s.pages)}` : ""}.
        <a href="${esc(s.url)}" target="_blank" rel="noopener">doi:${esc(s.doi)}</a>${s.pmid ? ` · PMID ${esc(s.pmid)}` : ""}<br>${badges}</li>`;
    }).join("");
    return `<h2 id="s-refs">Источники</h2><ol class="refs">${items}</ol>`;
  };

  const doneMark = key => isDone(key) ? '<span class="done-mark">✓</span>' : I.chev;
  const item = (href, tile, title, sub, key, tileCls = "") => `<a class="card list-item" href="${href}">
    <span class="tile ${tileCls}">${tile}</span>
    <span class="li-body"><b>${esc(title)}</b><br><span class="small muted">${sub}</span></span>${doneMark(key)}</a>`;
  const planItem = (p) => `<div class="card list-item plan-item"><span class="tile">${p.type === "view" ? I.brain : I.plan}</span>
    <span class="li-body"><b>${esc(p.name)}</b><br><span class="badge soon">в разработке</span></span></div>`;

  const foot = () => `<footer class="foot">${esc(META.title)} ${esc(META.version)} · ${esc(META.author)} · ${esc(META.updated)}<br>
    Учебный материал для врачей. Не заменяет экспертную нейросонографию и клиническое решение. Эхограммы — из статей открытого доступа (CC BY 4.0), авторы и лицензии указаны под каждым снимком.</footer>`;
  const doneBtn = key => `<button class="btn ${isDone(key) ? "done" : ""}" data-done="${key}">${isDone(key) ? "✓ Изучено" : "Отметить как изученное"}</button>`;

  /* ---------- страницы ---------- */
  function home() {
    const total = VIEWS.length + ANOMALIES.length + ALGOS.length, done = Object.keys(studied()).length;
    const best = store.get("quizBest", null);
    const feat = (href, icon, cls, title, sub) => `<a class="card feature" href="${href}"><span class="tile ${cls}">${icon}</span>
      <span><h3>${title}</h3><span class="small muted">${sub}</span></span></a>`;
    const t1 = VIEWS.filter(v => v.period === "t1");
    return `<section class="hero">
      <div class="kicker">Нейросонография плода</div>
      <h1>Мозг плода с 11 недель</h1>
      <p>Ранняя оценка ЦНС при скрининге I триместра, базовое исследование во II–III триместре и прицельная нейросонография. Срез → норма → находка.</p>
      <div class="stats">
        <div class="stat"><b>${done}/${total}</b><span>изучено</span></div>
        <div class="stat"><b>${best ? `${best.score}/${best.total}` : "—"}</b><span>лучший тест</span></div>
        <div class="stat"><b>${Object.keys(REFS).length}</b><span>источников</span></div>
      </div>
      <div class="progress" style="margin:14px 0 0"><i style="width:${total ? Math.round(done / total * 100) : 0}%"></i></div>
    </section>
    <div class="grid two">
      ${feat("#/views", I.brain, "", "Срезы 11–14 недель", `${t1.length} среза: схема с легендой, техника, норма, измерения, ошибки, находки.`)}
      ${feat("#/algos", I.algo, "", "От находки к диагнозу", `${ALGOS.length} алгоритма: что проверить по порядку и какой дифференциальный ряд.`)}
      ${feat("#/anoms", I.brain, "red", "Пороки 11–14 недель", `${ANOMALIES.length} карточки: признаки, срезы, дифдиагноз, ловушки, тактика.`)}
      ${feat("#/plan", I.plan, "", "План разделов", `II–III триместр и прицельная нейросонография: ${PLAN.length} тем в разработке.`)}
      ${feat("#/quiz", I.quiz, "red", "Проверка знаний", `${QUIZ.length} вопросов с разбором ответов.`)}
    </div>
    <div class="card">
      <div class="row between"><h3 style="margin:0">Мой прогресс</h3><span class="small muted">${done} из ${total}</span></div>
      <p class="small muted" style="margin:.4em 0 .8em">Прогресс хранится только в этом браузере. Сохраните его в файл, чтобы перенести на другое устройство.</p>
      <div class="row"><button class="btn ghost" data-export="1">⤓ Экспорт в JSON</button>
      <button class="btn ghost" data-import="1">⤒ Импорт из файла</button></div>
      <input type="file" id="importFile" accept="application/json,.json" hidden>
    </div>
    ${FN.install && !FN.install.standalone ? `<div class="card install-card" data-install-card>
      <div class="row between" style="gap:12px;flex-wrap:wrap"><span><h3 style="margin:0 0 .2em">Установить на телефон или ПК</h3>
      <span class="small muted">Отдельный значок на экране «Домой» или рабочем столе, работает без интернета.</span></span>
      <button type="button" class="btn" data-install>${FN.install.icon} Установить</button></div></div>` : ""}
    <div class="note"><b>Главное правило.</b> Нормальная картина в 11–14 нед не исключает пороков ЦНС, которые проявляются позже (агенезия мозолистого тела, пороки коры, часть пороков задней черепной ямки). Ранняя находка — повод для прицельного исследования, а не окончательный диагноз.</div>
    ${foot()}`;
  }

  function viewsList() {
    return `<h1>Срезы</h1>
      <p class="subtitle">Порядок оценки головы и позвоночника по срокам. Готовые карточки — черновики на проверке автора.</p>
      ${PERIODS.map(p => {
        const vs = VIEWS.filter(v => v.period === p.id), plan = PLAN.filter(x => x.period === p.id && x.type === "view");
        if (!vs.length && !plan.length) return "";
        return `<h2>${esc(p.name)}</h2><p class="small muted" style="margin-top:-.4em">${esc(p.sub)}</p>
          ${vs.map(v => item(`#/view/${v.id}`, esc(v.abbr), v.name, `${v.check.length} пунктов нормы`, "v_" + v.id)).join("")}
          ${plan.map(planItem).join("")}`;
      }).join("")}${foot()}`;
  }

  function viewPage(id) {
    const v = byId(VIEWS, id); if (!v) return notFound();
    const list = VIEWS.filter(x => x.period === v.period);
    const idx = list.indexOf(v), prev = list[idx - 1], next = list[idx + 1];
    const period = byId(PERIODS, v.period);
    return `<div class="crumb"><a href="#/views">Срезы</a> / ${esc(period.name)}</div>
      <h1>${esc(v.name)}</h1>
      <div>${statusBadge(v.status)}</div>
      ${echoBlock(v)}
      <h2>Как получить</h2><ol class="steps">${v.how.map(x => `<li>${esc(x)}</li>`).join("")}</ol>
      <h2>Что оценить в норме</h2><ul class="check">${v.check.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      ${v.measure ? `<h2>Измерения</h2><ul>${v.measure.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
      <h2>Типичные ошибки</h2><ul class="err">${v.errors.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      <h2>Патологические находки</h2><ul>${v.abnormal.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      ${(() => { const al = ALGOS.filter(a => a.view === id); return al.length ? `<h2>Алгоритмы для этого среза</h2>${al.map(a => item(`#/algo/${a.id}`, I.algo, a.title, esc(a.finding), "f_" + a.id)).join("")}` : ""; })()}
      ${(() => { const an = ANOMALIES.filter(a => a.views[id]); return an.length ? `<h2>Пороки, видимые на этом срезе</h2>${an.map(a => item(`#/anom/${a.id}`, esc(a.abbr), a.name, esc(a.views[id]), "a_" + a.id, "red")).join("")}` : ""; })()}
      ${refsBlock(v.references)}
      <div class="row" style="margin-top:18px">${doneBtn("v_" + id)}</div>
      <div class="pager">
        ${prev ? `<a class="card" href="#/view/${prev.id}"><small>← Назад</small><b>${esc(prev.abbr)}</b></a>` : ""}
        ${next ? `<a class="card next" href="#/view/${next.id}"><small>Далее →</small><b>${esc(next.abbr)}</b></a>` : ""}</div>${foot()}`;
  }

  /* ---------- эхограммы из открытых источников ---------- */
  const IMAGES = FN.IMAGES || [];
  const credit = s => `${esc(s.authors)}. ${esc(s.title)}. <i>${esc(s.journal)}</i> ${s.year}, ${esc(s.figure)}.
    <a href="${esc(s.url)}" target="_blank" rel="noopener">doi:${esc(s.doi)}</a>.
    Лицензия <a href="${esc(s.licenseUrl)}" target="_blank" rel="noopener">${esc(s.license)}</a>; изменения: ${esc(s.changes)}.`;
  function echoBlock(v) {
    const what = `<h2>Что найти на эхограмме</h2><ol class="steps">${v.structures.map(s => `<li><b>${esc(s.name)}</b>${s.note ? ` — ${esc(s.note)}` : ""}</li>`).join("")}</ol>`;
    const list = IMAGES.filter(im => im.cards.includes("view:" + v.id));
    if (!list.length) return `<div class="note info" style="margin-top:12px">Эхограмма этого среза из открытого источника пока подбирается.</div>${what}`;
    return gallery(list) + what;
  }
  function gallery(list) {
    return `<div class="echo-list">${list.map(im => `<figure class="echo">
        <a href="${esc(im.file)}" target="_blank" rel="noopener"><img src="${esc(im.file)}" alt="${esc(im.label)}" loading="lazy" decoding="async"></a>
        <figcaption><b>${esc(im.label)}.</b> ${esc(im.captionRu)}
          <span class="orig">Подпись авторов: «${esc(im.caption)}»</span>
          <span class="cred">${credit(im.source)}</span></figcaption></figure>`).join("")}</div>
      ${list.some(im => im.status !== "approved") ? `<p class="small muted">${statusBadge("draft")} Подбор снимков к срезу и перевод подписей — черновик, ждут проверки автором. Снимки не подтверждают текст карточки: источники утверждений — в разделе «Источники».</p>` : ""}`;
  }

  /* ---------- алгоритмы ---------- */
  function algosList() {
    return `<h1>От находки к диагнозу</h1>
      <p class="subtitle">Врач у аппарата видит не «голопрозэнцефалию», а «нет бабочки». Здесь путь начинается с находки: что проверить по порядку и к какому дифференциальному ряду она ведёт.</p>
      ${VIEWS.map(v => { const list = ALGOS.filter(a => a.view === v.id); return list.length ? `<h2>${esc(v.name)}</h2>${list.map(a => item(`#/algo/${a.id}`, I.algo, a.title, esc(a.finding), "f_" + a.id)).join("")}` : ""; }).join("")}
      ${foot()}`;
  }
  function algoPage(id) {
    const a = byId(ALGOS, id); if (!a) return notFound();
    const v = byId(VIEWS, a.view);
    return `<div class="crumb"><a href="#/algos">Находки</a> / <a href="#/view/${v.id}">${esc(v.abbr)}</a></div>
      <h1>${esc(a.title)}</h1><div>${statusBadge(a.status)}</div>
      <div class="note info" style="margin-top:12px"><b>Находка.</b> ${esc(a.finding)}</div>
      <h2>Что проверить по порядку</h2><ol class="steps">${a.steps.map(x => `<li>${esc(x)}</li>`).join("")}</ol>
      <h2>Дифференциальный ряд</h2><div class="ddx">${a.ddx.map(d => { const inner = `<b>${esc(d.name)}</b><span class="small muted">${esc(d.key)}</span>`;
        return d.id && byId(ANOMALIES, d.id) ? `<a class="card" href="#/anom/${d.id}">${inner}</a>` : `<div class="card">${inner}</div>`; }).join("")}</div>
      ${a.note ? `<div class="note">${esc(a.note)}</div>` : ""}
      ${refsBlock(a.references)}
      <div class="row" style="margin-top:18px">${doneBtn("f_" + id)}</div>${foot()}`;
  }

  /* ---------- пороки ---------- */
  function anomList() {
    return `<h1>Пороки ЦНС</h1>
      <p class="subtitle">Что можно заподозрить уже в 11–14 нед: признаки, срезы, дифдиагноз, ловушки, тактика. Карточки — черновики на проверке автора.</p>
      ${PERIODS.map(p => {
        const list = ANOMALIES.filter(a => a.period === p.id), plan = PLAN.filter(x => x.period === p.id && x.type === "anomaly");
        if (!list.length && !plan.length) return "";
        return `<h2>${esc(p.name)}</h2>${list.map(a => item(`#/anom/${a.id}`, esc(a.abbr), a.name, esc(a.en), "a_" + a.id, "red")).join("")}${plan.map(planItem).join("")}`;
      }).join("")}${foot()}`;
  }
  function anomPage(id) {
    const a = byId(ANOMALIES, id); if (!a) return notFound();
    const imgs = IMAGES.filter(im => im.cards.includes("anom:" + id));
    const list = ANOMALIES.filter(x => x.period === a.period), i = list.indexOf(a), prev = list[i - 1], next = list[i + 1];
    const sec = [["keys", "Признаки"], ["views", "По срезам"], ["img", "Эхограммы"], ["ddx", "Дифдиагноз"], ["pitfalls", "Ловушки"], ["refer", "Тактика"], ["refs", "Источники"]]
      .filter(([k]) => k !== "img" || imgs.length);
    return `<div class="crumb"><a href="#/anoms">Пороки</a> / ${esc(byId(PERIODS, a.period).name)}</div>
      <h1>${esc(a.name)}</h1><p class="subtitle" style="margin-top:-.3em">${esc(a.en)}</p>
      <div>${statusBadge(a.status)}</div>
      <nav class="toc">${sec.map(([k, t]) => `<a href="javascript:void(0)" data-jump="${k}">${t}</a>`).join("")}</nav>
      <h2>Суть</h2><p>${esc(a.def)}</p>
      <h2 id="s-keys">Признаки</h2><ul class="check">${a.keys.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      <h2 id="s-views">По срезам</h2>${Object.entries(a.views).map(([vid, t]) => { const v = byId(VIEWS, vid);
        return `<a class="card list-item" href="#/view/${vid}"><span class="tile">${esc(v.abbr)}</span><span class="li-body"><b>${esc(v.name)}</b><br><span class="small">${esc(t)}</span></span>${I.chev}</a>`; }).join("")}
      ${imgs.length ? `<h2 id="s-img">Эхограммы из открытых источников</h2>${gallery(imgs)}` : ""}
      <h2 id="s-ddx">Дифдиагноз</h2><div class="ddx">${a.ddx.map(d => { const inner = `<b>${esc(d.name)}</b><span class="small muted">${esc(d.key)}</span>`;
        return d.id && byId(ANOMALIES, d.id) ? `<a class="card" href="#/anom/${d.id}">${inner}</a>` : `<div class="card">${inner}</div>`; }).join("")}</div>
      <h2>Сочетания</h2><p>${esc(a.assoc)}</p>
      <h2 id="s-pitfalls">Ловушки</h2><ul class="err">${a.pitfalls.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      <h2>Прогноз</h2><p>${esc(a.prognosis)}</p>
      <h2 id="s-refer">Тактика</h2><p>${esc(a.refer)}</p>
      ${(() => { const al = ALGOS.filter(x => x.ddx.some(d => d.id === id)); return al.length ? `<h2>Алгоритмы, ведущие к этому пороку</h2>${al.map(x => item(`#/algo/${x.id}`, I.algo, x.title, esc(x.finding), "f_" + x.id)).join("")}` : ""; })()}
      ${refsBlock(a.references)}
      <div class="row" style="margin-top:18px">${doneBtn("a_" + id)}</div>
      <div class="pager">
        ${prev ? `<a class="card" href="#/anom/${prev.id}"><small>← Назад</small><b>${esc(prev.abbr)}</b></a>` : ""}
        ${next ? `<a class="card next" href="#/anom/${next.id}"><small>Далее →</small><b>${esc(next.abbr)}</b></a>` : ""}</div>${foot()}`;
  }

  function planPage() {
    return `<h1>План разделов</h1>
      <p class="subtitle">Архитектура приложения рассчитана на все сроки. Разделы появляются по мере написания и проверки.</p>
      ${PERIODS.map(p => {
        const ready = VIEWS.filter(v => v.period === p.id), plan = PLAN.filter(x => x.period === p.id);
        return `<h2>${esc(p.name)}</h2><p class="small muted" style="margin-top:-.4em">${esc(p.sub)}</p>
          ${ready.map(v => item(`#/view/${v.id}`, esc(v.abbr), v.name, "срез · черновик готов", "v_" + v.id)).join("")}
          ${plan.filter(x => x.type === "view").map(planItem).join("")}
          ${plan.some(x => x.type === "anomaly") ? `<h3 style="margin:14px 0 8px">Пороки</h3>${plan.filter(x => x.type === "anomaly").map(planItem).join("")}` : ""}`;
      }).join("")}${foot()}`;
  }

  /* ---------- тест ---------- */
  let quiz = null;
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function startQuiz(n) {
    quiz = { items: shuffle(QUIZ).slice(0, n).map(q => ({ ...q, order: shuffle(q.opts.map((_, i) => i)) })), i: 0, score: 0, answered: false, choice: null, wrong: [] };
  }
  const qLink = q => !q.link ? "" : byId(ANOMALIES, q.link) ? `<br><a class="small" href="#/anom/${q.link}">Открыть карточку порока →</a>` : `<br><a class="small" href="#/view/${q.link}">Открыть срез →</a>`;
  function quizPage() {
    if (!quiz) {
      const best = store.get("quizBest", null);
      return `<h1>Проверка знаний</h1>
        <p class="subtitle">Вопросы выбираются случайно, варианты перемешиваются. После каждого ответа — разбор.</p>
        ${QUIZ.some(q => q.status !== "approved") ? `<div class="note">${statusBadge("draft")} Вопросы — черновик, ждут проверки автором.</div>` : ""}
        ${best ? `<div class="card row between"><span class="muted">Лучший результат</span><b>${best.score} из ${best.total}</b></div>` : ""}
        <div class="row" style="margin-top:14px"><button class="btn" data-quiz="${QUIZ.length}">Начать: ${QUIZ.length} вопросов</button></div>${foot()}`;
    }
    const total = quiz.items.length;
    if (quiz.i >= total) {
      const best = store.get("quizBest", null), pct = quiz.score / total;
      if (!best || pct > best.score / best.total) store.set("quizBest", { score: quiz.score, total });
      const wrong = quiz.wrong.map(q => `<div class="card"><b>${esc(q.q)}</b><br><span class="small">Верно: <b>${esc(q.opts[q.a])}</b></span><br>
        <span class="small muted">${esc(q.exp)}</span>${qLink(q)}</div>`).join("");
      return `<div class="card" style="text-align:center;padding:26px 18px">
          <div class="kicker muted">Результат</div><div class="score">${quiz.score} / ${total}</div>
          <div class="progress" style="max-width:280px;margin:14px auto"><i style="width:${Math.round(pct * 100)}%"></i></div>
          <p class="muted" style="margin:0">${pct >= .85 ? "Отличный уровень." : pct >= .6 ? "Хорошая база — повторите разобранные вопросы." : "Стоит вернуться к срезам."}</p></div>
        ${wrong ? `<h2>Разбор ошибок</h2>${wrong}` : ""}
        <div class="row" style="margin-top:14px"><button class="btn" data-quiz="${QUIZ.length}">Ещё раз</button><button class="btn ghost" data-quizreset="1">К началу</button></div>${foot()}`;
    }
    const q = quiz.items[quiz.i], letters = "АБВГДЕ";
    const opts = q.order.map((oi, k) => {
      let cls = "opt";
      if (quiz.answered) { if (oi === q.a) cls += " right"; else if (oi === quiz.choice) cls += " wrong"; }
      return `<button class="${cls}" data-ans="${oi}" ${quiz.answered ? "disabled" : ""}><span class="ol">${letters[k]}</span><span>${esc(q.opts[oi])}</span></button>`;
    }).join("");
    return `<div class="row between"><span class="small muted">Вопрос ${quiz.i + 1} из ${total}</span><span class="badge ok">Верно: ${quiz.score}</span></div>
      <div class="progress"><i style="width:${Math.round(quiz.i / total * 100)}%"></i></div>
      <h2 style="margin-top:4px">${esc(q.q)}</h2>${opts}
      ${quiz.answered ? `<div class="note ${quiz.choice === q.a ? "info" : ""}">${quiz.choice === q.a ? "<b>Верно.</b> " : "<b>Неверно.</b> "}${esc(q.exp)}${qLink(q)}</div>
        <button class="btn" data-next="1">${quiz.i + 1 < total ? "Дальше →" : "Результат"}</button>` : ""}`;
  }

  /* ---------- поиск ---------- */
  let searchIndex = null;
  const hl = sn => {
    let out = "", pos = 0;
    sn.ranges.forEach(([a, b]) => { out += esc(sn.text.slice(pos, a)) + "<mark>" + esc(sn.text.slice(a, b)) + "</mark>"; pos = b; });
    return (sn.pre ? "…" : "") + out + esc(sn.text.slice(pos)) + (sn.post ? "…" : "");
  };
  function searchPage(q) {
    if (!q.trim()) return `<h1>Поиск</h1><p class="muted">Введите запрос: срез, структуру, признак (IT, BSOB, «бабочка», spina bifida).</p>`;
    searchIndex = searchIndex || FN.search.buildIndex(FN);
    const res = FN.search.query(searchIndex, q);
    const rows = res.map(r => {
      const sub = r.snippet ? `<span class="badge view">${esc(r.snippet.label)}</span> ${hl(r.snippet)}` : ({ anom: "порок", algo: "находка", view: "срез" })[r.type];
      if (r.type === "algo") return item(r.href, I.algo, r.title, sub, "f_" + r.id);
      const an = r.type === "anom", x = byId(an ? ANOMALIES : VIEWS, r.id);
      return item(r.href, esc(x.abbr), r.title, sub, (an ? "a_" : "v_") + r.id, an ? "red" : ""); });
    return `<h1>Поиск</h1><p class="subtitle">«${esc(q)}» — найдено: ${res.length}</p>${rows.length ? rows.join("") : '<p class="muted">Ничего не найдено. Попробуйте сокращение (IT, BS, BSOB), английский термин или признак («бабочка»).</p>'}`;
  }

  const notFound = () => `<h1>Страница не найдена</h1><p><a href="#/">На главную</a></p>`;

  /* ---------- роутер ---------- */
  function render() {
    const h = location.hash.replace(/^#\/?/, "");
    const [path, qs] = h.split("?");
    const [p, id] = path.split("/");
    let html, nav = p || "home";
    switch (p) {
      case "": case undefined: html = home(); break;
      case "views": html = viewsList(); break;
      case "view": html = viewPage(id); nav = "views"; break;
      case "plan": html = planPage(); break;
      case "anoms": html = anomList(); break;
      case "algos": html = algosList(); break;
      case "algo": html = algoPage(id); nav = "algos"; break;
      case "anom": html = anomPage(id); nav = "anoms"; break;
      case "quiz": html = quizPage(); break;
      case "search": html = searchPage(decodeURIComponent((qs || "").replace(/^q=/, ""))); nav = ""; break;
      default: html = notFound();
    }
    $app.innerHTML = html;
    $app.style.animation = "none"; void $app.offsetWidth; $app.style.animation = "";
    document.querySelectorAll("#nav a").forEach(a => a.classList.toggle("active", a.dataset.nav === nav));
  }

  function highlightN(n) {
    const btn = $app.querySelector(`.legend-n [data-n="${n}"]`), on = btn.getAttribute("aria-pressed") !== "true";
    $app.querySelectorAll(".legend-n [data-n]").forEach(b => b.setAttribute("aria-pressed", "false"));
    $app.querySelectorAll("#schemeFig .nm").forEach(g => g.classList.toggle("hl", on && g.dataset.n === String(n)));
    if (on) {
      btn.setAttribute("aria-pressed", "true");
      const r = document.getElementById("schemeFig").getBoundingClientRect();
      if (r.bottom < 80 || r.top > innerHeight * .6) window.scrollTo({ top: r.top + scrollY - 80, behavior: "smooth" });
    }
  }

  $app.addEventListener("click", e => {
    const t = e.target.closest("button, a[data-jump]");
    if (!t) return;
    if (t.dataset.jump) {
      const el = document.getElementById("s-" + t.dataset.jump);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 120, behavior: "smooth" });
      return;
    }
    if (t.dataset.done) { toggleDone(t.dataset.done); render(); }
    else if (t.dataset.n) highlightN(t.dataset.n);
    else if (t.dataset.quiz) { startQuiz(+t.dataset.quiz); render(); window.scrollTo(0, 0); }
    else if (t.dataset.quizreset) { quiz = null; render(); }
    else if (t.dataset.ans !== undefined) {
      const q = quiz.items[quiz.i]; quiz.answered = true; quiz.choice = +t.dataset.ans;
      if (quiz.choice === q.a) quiz.score++; else quiz.wrong.push(q);
      render();
    }
    else if (t.dataset.next) { quiz.i++; quiz.answered = false; quiz.choice = null; render(); window.scrollTo(0, 0); }
    else if (t.dataset.export) exportProgress();
    else if (t.dataset.import) document.getElementById("importFile").click();
  });

  function exportProgress() {
    const data = FN.progress.build({ studied: studied(), quizBest: store.get("quizBest", null) });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `fetalneuro-progress-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast("Прогресс сохранён в файл");
  }

  $app.addEventListener("change", async e => {
    if (e.target.id !== "importFile" || !e.target.files[0]) return;
    const file = e.target.files[0]; e.target.value = "";
    if (file.size > 1e6) return alert("Файл слишком большой для файла прогресса.");
    const res = FN.progress.parse(await file.text(), FN);
    if (!res.ok) return alert("Импорт невозможен. " + res.error);
    const best = store.get("quizBest", null), nb = res.data.quizBest;
    const msg = ["Текущий прогресс будет заменён данными из файла.",
      `Изучено: ${Object.keys(studied()).length} → ${Object.keys(res.data.studied).length}`,
      `Лучший тест: ${best ? best.score + "/" + best.total : "—"} → ${nb ? nb.score + "/" + nb.total : "—"}`,
      res.skipped.length ? `Пропущено неизвестных записей: ${res.skipped.length}` : "", "", "Продолжить?"].join("\n");
    if (!confirm(msg)) return;
    store.set("studied", res.data.studied);
    nb ? store.set("quizBest", nb) : store.del("quizBest");
    render(); toast("Прогресс импортирован");
  });

  document.getElementById("searchForm").addEventListener("submit", e => {
    e.preventDefault();
    location.hash = "#/search?q=" + encodeURIComponent(document.getElementById("searchInput").value);
    document.getElementById("searchInput").blur();
  });

  window.addEventListener("hashchange", () => { render(); window.scrollTo(0, 0); });
  render();
})();
