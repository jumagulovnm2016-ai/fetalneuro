/* FetalNeuro — схемы срезов в эхографическом стиле (версия 2).
   Рисунок имитирует УЗ-изображение: сектор конвексного датчика, серая шкала, «спекл»-текстура,
   анэхогенная жидкость, гиперэхогенные кости и сплетения. Это рисунок, а не эхограмма:
   пропорции и яркость условные. Номера стоят на структурах, расшифровка — в легенде
   (поле structures в data/views.js). ЧЕРНОВИК до проверки автором.
   Цвета эхо-шкалы не зависят от темы оформления (эхограмма всегда тёмная). */
var FN = globalThis.FN = globalThis.FN || {};
(function () {
  /* Эхо-шкала: от анэхогенного к гиперэхогенному */
  const E = {
    fluid: "#030303",   // анэхогенно: околоплодные воды, ликвор
    hypo: "#262626",    // гипоэхогенно: паренхима мозга в I триместре, ствол
    dien: "#1a1a1a",    // промежуточный мозг — ещё темнее
    soft: "#5a5a5a",    // мягкие ткани
    wall: "#6e6e6e",    // стенка матки / плацента
    plexus: "#d2d2d2",  // сосудистые сплетения
    bone: "#f4f4f4",    // кость
    bone2: "#bdbdbd"    // кость дальней стенки (ослаблена)
  };
  /* Сектор конвексного датчика: вершина (160,-42), угол ±32°, радиусы 50 и 305 */
  const FAN = "M133.5,0.4 A50,50 0 0 1 186.5,0.4 L321.6,216.7 A305,305 0 0 1 -1.6,216.7 Z";

  const STYLE = `<style>
.nm circle{fill:rgba(0,0,0,.55);stroke:#ffe14d;stroke-width:1.4}
.nm text{fill:#ffe14d;font-size:10.5px;font-weight:800;text-anchor:middle;dominant-baseline:central}
.nm.hl circle{fill:var(--sv-accent);stroke:#fff} .nm.hl text{fill:#fff}
.ov{fill:#a8a8a8;font-size:9.5px;font-family:ui-monospace,Menlo,Consolas,monospace}
.cal{stroke:#ffe14d;stroke-width:1.1;fill:none}
.calt{fill:#ffe14d;font-size:9.5px;font-weight:700;font-family:ui-monospace,Menlo,Consolas,monospace}
.dr{fill:var(--sv-draft);font-size:8.5px;font-weight:700;letter-spacing:.05em}
.tm{fill:var(--sv-text);font-size:9.5px;opacity:.8}
</style>`;
  /* Спекл: размытие + умножение на шум. Чёрное остаётся чёрным, светлое получает зернистость. */
  const defs = id => `<defs>
<clipPath id="${id}-fan"><path d="${FAN}"/></clipPath>
<filter id="${id}-sp" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
  <feGaussianBlur in="SourceGraphic" stdDeviation="1.15" result="b"/>
  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n"/>
  <feColorMatrix in="n" type="matrix" values="1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  0 0 0 0 1" result="g"/>
  <feComposite in="b" in2="g" operator="arithmetic" k1="1.25" k2="0.3" k3="0" k4="0"/>
</filter>
<radialGradient id="${id}-tgc" cx="50%" cy="0%" r="100%"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient>
</defs>`;
  const num = (n, [x, y]) => `<g class="nm" data-n="${n}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="8"/><text x="${x.toFixed(1)}" y="${(y + .5).toFixed(1)}">${n}</text></g>`;
  /* Каркас: чёрный сектор, ткани со спеклом внутри сектора, затухание к глубине, номера и надписи сверху */
  const frame = (id, label, tissue, overlay) => `<svg viewBox="0 0 320 266" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}" font-family="system-ui,sans-serif">
${STYLE}${defs(id)}
<path d="${FAN}" fill="${E.fluid}"/>
<g clip-path="url(#${id}-fan)"><g filter="url(#${id}-sp)">${tissue}</g><path d="${FAN}" fill="url(#${id}-tgc)"/></g>
<path d="${FAN}" fill="none" stroke="#3a3a3a" stroke-width="1"/>
${overlay}
<text class="dr" x="316" y="12" text-anchor="end">ЧЕРНОВИК</text><text class="dr" x="316" y="23" text-anchor="end">НА ПРОВЕРКЕ</text>
</svg>`;
  /* Стенка матки по верхнему краю сектора */
  const uterus = `<path d="M100,-10 L220,-10 L230,22 C190,30 130,30 90,22 Z" fill="${E.wall}"/>`;
  /* Преобразование точек: поворот на deg вокруг (cx,cy), масштаб s, перенос в (tx,ty) */
  const mapper = (cx, cy, s, tx, ty, deg = 0) => {
    const r = deg * Math.PI / 180, c = Math.cos(r), si = Math.sin(r);
    return (x, y) => { const dx = (x - cx) * s, dy = (y - cy) * s; return [tx + dx * c - dy * si, ty + dx * si + dy * c]; };
  };

  /* ---------- Аксиальный срез головы, 11–14 нед: «бабочка». Лоб — слева, затылок — справа. ---------- */
  function axial() {
    const [cx, cy, s, tx, ty] = [160, 125, .66, 160, 142], M = mapper(cx, cy, s, tx, ty);
    const wing = up => {
      const k = up ? -1 : 1, y = v => 125 + k * v;
      return `<path fill="${E.plexus}" d="M80,${y(4)} C88,${y(24)} 130,${y(48)} 196,${y(58)} C236,${y(62)} 258,${y(46)} 259,${y(22)} C259,${y(12)} 255,${y(6)} 250,${y(4)} Z"/>`;
    };
    const tissue = `${uterus}
<g transform="translate(${tx} ${ty}) scale(${s}) translate(${-cx} ${-cy})">
  <ellipse cx="160" cy="125" rx="141" ry="110" fill="${E.soft}"/>
  <ellipse cx="160" cy="125" rx="126" ry="96" fill="${E.hypo}"/>
  <path fill="${E.fluid}" d="M52,121 A108,80 0 0 1 268,121 Z"/>
  <path fill="${E.fluid}" d="M52,129 A108,80 0 0 0 268,129 Z"/>
  ${wing(true)}${wing(false)}
  <line x1="38" y1="125" x2="282" y2="125" stroke="#9a9a9a" stroke-width="2.6"/>
  <path d="M30,125 A130,100 0 0 1 290,125" fill="none" stroke="${E.bone}" stroke-width="8.5"/>
  <path d="M30,125 A130,100 0 0 0 290,125" fill="none" stroke="${E.bone2}" stroke-width="7.5"/>
  <path d="M60,40 C100,20 220,20 260,40" fill="none" stroke="#7a7a7a" stroke-width="3" opacity=".5"/>
</g>`;
    const overlay = `${num(1, M(252, 47))}${num(2, M(44, 125))}${num(3, M(214, 88))}${num(3, M(214, 162))}${num(4, M(82, 104))}${num(5, M(160, 36))}
<text class="ov" x="40" y="212">← лоб</text><text class="ov" x="280" y="212" text-anchor="end">затылок →</text>
<text class="tm" x="4" y="12">Аксиальный</text>`;
    return frame("ax", "Аксиальный срез головы плода в 11–14 недель, схема в эхографическом стиле", tissue, overlay);
  }

  /* ---------- Срединный сагиттальный срез (как для ТВП): плод на спине, лицо вверх, голова справа. ---------- */
  function midsag() {
    const [cx, cy, s, tx, ty, deg] = [160, 140, .78, 168, 128, 90], M = mapper(cx, cy, s, tx, ty, deg);
    const T = `translate(${tx} ${ty}) rotate(${deg}) scale(${s}) translate(${-cx} ${-cy})`;
    /* Ядра окостенения шейных и грудных позвонков вдоль спины */
    let vert = "";
    for (let i = 0; i < 9; i++) { const y = 196 + i * 11, x = 222 + i * 2.2; vert += `<ellipse cx="${x}" cy="${y}" rx="3.4" ry="3" fill="${E.bone}"/>`; }
    const tissue = `${uterus}
<path d="M-20,236 C60,250 200,252 340,230 L340,280 L-20,280 Z" fill="${E.wall}"/>
<path d="M-10,214 C80,232 220,232 330,206" fill="none" stroke="#9c9c9c" stroke-width="1.6"/>
<path d="M76,80 C46,78 14,86 -20,96 L-20,198 C14,200 46,202 76,204 Z" fill="${E.soft}"/>
${Array.from({length:8},(_,i)=>`<ellipse cx="${66-i*11}" cy="${193-i*.6}" rx="3.4" ry="3" fill="${E.bone}"/>`).join("")}
<g transform="${T}">
  <path fill="${E.soft}" d="M100,262 C96,232 104,212 116,200 C104,193 92,182 88,170 C84,161 90,155 86,150 C80,146 76,140 78,134 L66,128 C70,120 76,112 80,104 C82,60 120,24 168,22 C222,20 260,58 260,110 C260,150 248,176 238,196 C240,222 248,242 254,262 Z"/>
  <path fill="${E.fluid}" d="M249,150 C245,172 237,190 231,212 L240,213 C245,192 254,174 258,152 Z"/>
  <path d="M260,112 C260,150 248,176 238,196 C240,222 248,242 254,262" fill="none" stroke="#b0b0b0" stroke-width="2.6"/>
  <path fill="#303030" d="M92,104 C96,62 128,36 168,35 C214,35 244,66 246,112 C247,140 238,160 226,176 C214,166 196,160 172,156 C146,152 120,150 96,148 C90,134 89,118 92,104 Z"/>
  <ellipse cx="148" cy="108" rx="27" ry="19" fill="#1c1c1c"/>
  <path d="M172,102 C186,118 194,138 196,160 C198,190 206,215 214,262" fill="none" stroke="#6c6c6c" stroke-width="15" stroke-linecap="round"/>
  <path d="M172,102 C186,118 194,138 196,160 C198,190 206,215 214,262" fill="none" stroke="#4a4a4a" stroke-width="2"/>
  <ellipse cx="208" cy="141" rx="6.5" ry="14" transform="rotate(-24 208 141)" fill="${E.fluid}"/>
  <path d="M215,123 C219,136 222,148 223,161" fill="none" stroke="${E.plexus}" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="233" cy="143" rx="8.5" ry="17" transform="rotate(-18 232 143)" fill="${E.fluid}"/>
  <path d="M92,100 C96,58 128,30 168,29 C216,29 250,62 252,112" fill="none" stroke="${E.bone2}" stroke-width="6"/>
  <path d="M252,112 C252,140 244,160 234,174" fill="none" stroke="${E.bone}" stroke-width="8" stroke-linecap="round"/>
  <path d="M81,107 L73,123" stroke="${E.bone}" stroke-width="5" stroke-linecap="round"/>
  <path d="M68,128 L66,128" stroke="#c8c8c8" stroke-width="4" stroke-linecap="round"/>
  <path d="M90,149 L150,151" stroke="${E.bone}" stroke-width="5.5" stroke-linecap="round"/>
  ${vert}
</g>`;
    /* Калиперы BS и BSOB: по линии, перпендикулярной стволу, на уровне IV желудочка */
    const a = M(189, 146), b = M(203, 146), c = M(203, 150), d = M(246, 150);
    const tick = ([x, y]) => `<path class="cal" d="M${(x - 3).toFixed(1)},${y.toFixed(1)} h6 M${x.toFixed(1)},${(y - 3).toFixed(1)} v6"/>`;
    const overlay = `<line class="cal" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke-dasharray="2 2"/>${tick(a)}${tick(b)}
<line class="cal" x1="${c[0]}" y1="${c[1]}" x2="${d[0]}" y2="${d[1]}" stroke-dasharray="2 2"/>${tick(d)}
<text class="calt" x="${(a[0] - 6).toFixed(1)}" y="${((a[1] + b[1]) / 2 + 3).toFixed(1)}" text-anchor="end">BS</text>
<text class="calt" x="${(c[0] - 6).toFixed(1)}" y="${((c[1] + d[1]) / 2 + 3).toFixed(1)}" text-anchor="end">BSOB</text>
${num(1, M(60, 106))}${num(2, M(120, 164))}${num(3, M(140, 108))}${num(4, M(178, 120))}${num(5, M(204, 116))}${num(6, M(226, 112))}${num(7, M(250, 128))}${num(8, M(264, 166))}${num(9, M(258, 204))}
<text class="ov" x="30" y="226">тело ←</text><text class="ov" x="290" y="226" text-anchor="end">→ голова</text>
<text class="tm" x="4" y="12">Сагиттальный</text>`;
    return frame("ms", "Срединный сагиттальный срез головы плода в 11–14 недель, схема в эхографическом стиле", tissue, overlay);
  }

  /* ---------- Позвоночник: продольный срез, спина к датчику, голова слева. Врезка — поперечный срез. ---------- */
  function spine() {
    const P = [[34, 150], [110, 112], [212, 112], [288, 160]];
    const at = t => { const u = 1 - t; return [0, 1].map(k => u * u * u * P[0][k] + 3 * u * u * t * P[1][k] + 3 * u * t * t * P[2][k] + t * t * t * P[3][k]); };
    const nrm = t => { const a = at(Math.max(0, t - .01)), b = at(Math.min(1, t + .01)); const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy); return [-dy / l, dx / l]; };
    const off = (t, d) => { const [x, y] = at(t), [nx, ny] = nrm(t); return [x + nx * d, y + ny * d]; };
    let dots = "";
    for (let i = 0; i <= 24; i++) {
      const t = .03 + i * .04, sac = t > .84, conv = sac ? (t - .84) * 40 : 0;
      const r = sac ? 2.4 : 3.9 - t * 1.4, op = sac ? .45 : 1;
      const [x1, y1] = off(t, 10 + conv * .25), [x2, y2] = off(t, 27 - conv * .35);
      dots += `<ellipse cx="${x1.toFixed(1)}" cy="${y1.toFixed(1)}" rx="${(r * 1.15).toFixed(1)}" ry="${r.toFixed(1)}" fill="${E.bone}" opacity="${op}"/>`;
      dots += `<ellipse cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" rx="${(r * 1.3).toFixed(1)}" ry="${(r * 1.05).toFixed(1)}" fill="${E.bone}" opacity="${op}"/>`;
    }
    const sk = t => off(t, 0);
    const skin = Array.from({ length: 41 }, (_, i) => sk(i / 40));
    const body = Array.from({ length: 41 }, (_, i) => off(i / 40, 6));
    const canal = Array.from({ length: 41 }, (_, i) => off(i / 40, 18.5));
    const pl = pts => pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join("");
    const tissue = `${uterus}
<path d="${pl(body)} L340,300 L-20,300 Z" fill="${E.soft}"/>
<path d="${pl(canal)}" fill="none" stroke="${E.hypo}" stroke-width="9" stroke-linecap="round"/>
<path d="${pl(skin)}" fill="none" stroke="#cfcfcf" stroke-width="2.6"/>
<path d="M60,226 C120,206 210,206 280,232" fill="none" stroke="#3a3a3a" stroke-width="16" opacity=".6"/>
${dots}`;
    /* Врезка: поперечный срез позвонка в своём мини-секторе (в верхнем левом углу, вне основного сектора) */
    const inset = `<g transform="translate(6 30)">
  <rect width="74" height="74" rx="6" fill="${E.fluid}" stroke="#3a3a3a"/>
  <g filter="url(#sp-sp)">
    <path d="M0,74 L0,48 C14,30 60,30 74,48 L74,74 Z" fill="${E.soft}"/>
    <path d="M6,44 C20,30 54,30 68,44" fill="none" stroke="#cfcfcf" stroke-width="2"/>
    <ellipse cx="37" cy="64" rx="10" ry="6.5" fill="${E.bone}"/>
    <ellipse cx="27" cy="47" rx="3.5" ry="6" transform="rotate(35 27 47)" fill="${E.bone}"/>
    <ellipse cx="47" cy="47" rx="3.5" ry="6" transform="rotate(-35 47 47)" fill="${E.bone}"/>
    <circle cx="37" cy="53" r="4" fill="${E.hypo}"/>
  </g>
  <text class="ov" x="4" y="12" font-size="8">попер.</text>
</g>`;
    const overlay = `${inset}${num(1, off(.5, 44))}${num(2, off(.5, -12))}${num(3, off(.93, 40))}${num(4, [92, 96])}
<text class="ov" x="30" y="226">← голова</text><text class="ov" x="290" y="226" text-anchor="end">крестец →</text>
<text class="tm" x="4" y="12">Продольный</text>`;
    return frame("sp", "Позвоночник плода в 11–14 недель, схема в эхографическом стиле", tissue, overlay);
  }

  FN.SCHEMES = { "t1-axial": axial, "t1-midsag": midsag, "t1-spine": spine };
})();
