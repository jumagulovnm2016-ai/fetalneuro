/* FetalNeuro — схематические рисунки срезов (не УЗ-изображения).
   Стиль медицинской иллюстрации: номера стоят на структурах, расшифровка — в легенде карточки
   (поле structures в data/views.js). Пропорции условные. ЧЕРНОВИК до проверки автором. */
var FN = globalThis.FN = globalThis.FN || {};
(function () {
  const STYLE = `<style>
.sk{fill:var(--sv-skin);stroke:var(--sv-skin-edge);stroke-width:2}
.br{fill:var(--sv-brain)} .dk{fill:var(--sv-brain-dark)} .sbr{stroke:var(--sv-brain-dark);fill:none;stroke-linecap:round}
.csf{fill:var(--sv-csf)} .pl{fill:var(--sv-plexus)} .spl{stroke:var(--sv-plexus);fill:none;stroke-linecap:round}
.bo{fill:none;stroke:var(--sv-skull);stroke-linecap:round} .bof{fill:var(--sv-skull)}
.ms{stroke:var(--sv-text);stroke-width:1.2;stroke-dasharray:4 3;fill:none}
.nm circle{fill:var(--sv-halo);stroke:var(--sv-text);stroke-width:1.3}
.nm text{fill:var(--sv-text);font-size:10.5px;font-weight:800;text-anchor:middle;dominant-baseline:central}
.nm.hl circle{fill:var(--sv-accent);stroke:var(--sv-accent)} .nm.hl text{fill:#fff}
.tm{fill:var(--sv-text);font-size:10px;opacity:.8;paint-order:stroke;stroke:var(--sv-halo);stroke-width:3px}
.tx{fill:var(--sv-text);font-size:10.5px;font-weight:700;paint-order:stroke;stroke:var(--sv-halo);stroke-width:3px}
.dr{fill:var(--sv-draft);font-size:9px;font-weight:700;letter-spacing:.06em;opacity:.8}
</style>`;
  const num = (n, x, y) => `<g class="nm" data-n="${n}"><circle cx="${x}" cy="${y}" r="8.5"/><text x="${x}" y="${y + .5}">${n}</text></g>`;
  const svg = (vb, label, body) => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}" font-family="system-ui,sans-serif">${STYLE}${body}</svg>`;
  const DRAFT = (x, y) => `<text class="dr" x="${x}" y="${y}">ЧЕРНОВИК · НА ПРОВЕРКЕ</text>`;

  /* Аксиальный срез головы на уровне боковых желудочков, 11–14 нед. Лоб — слева, затылок — справа. */
  function axial() {
    const wing = up => {
      const s = up ? -1 : 1, y = v => 125 + s * v;
      return `<path class="pl" d="M78,${y(5)} C86,${y(26)} 130,${y(50)} 196,${y(60)} C238,${y(64)} 262,${y(46)} 262,${y(22)} C262,${y(12)} 258,${y(6)} 252,${y(5)} Z"/>`;
    };
    return svg("0 0 320 250", "Аксиальный срез головы плода в 11–14 недель, схема", `
<ellipse class="sk" cx="160" cy="125" rx="142" ry="111"/>
<ellipse class="br" cx="160" cy="125" rx="126" ry="96"/>
<path class="csf" d="M50,121 A110,82 0 0 1 270,121 Z"/>
<path class="csf" d="M50,129 A110,82 0 0 0 270,129 Z"/>
${wing(true)}${wing(false)}
<line x1="36" y1="125" x2="284" y2="125" stroke="var(--sv-skull)" stroke-width="2.6"/>
<ellipse class="bo" cx="160" cy="125" rx="130" ry="100" stroke-width="8"/>
${num(1, 250, 49)}${num(2, 48, 125)}${num(3, 214, 88)}${num(3, 214, 162)}${num(4, 84, 100)}${num(5, 160, 37)}
<text class="tm" x="4" y="246">← лоб</text><text class="tm" x="316" y="246" text-anchor="end">затылок →</text>
${DRAFT(4, 12)}`);
  }

  /* Срединный сагиттальный срез головы и шеи (как для ТВП), лицо слева. */
  function midsag() {
    return svg("0 0 320 262", "Срединный сагиттальный срез головы плода в 11–14 недель, схема", `
<path class="sk" d="M100,262 C96,232 104,212 116,200 C104,193 92,182 88,170 C84,161 90,155 86,150 C80,146 76,140 78,134 L66,128 C70,120 76,112 80,104 C82,60 120,24 168,22 C222,20 260,58 260,110 C260,150 248,176 238,196 C240,222 248,242 254,262 Z"/>
<path class="csf" d="M252,150 C248,172 240,190 234,212 L241,213 C246,192 255,174 259,152 Z"/>
<path class="br" d="M92,104 C96,62 128,36 168,35 C214,35 244,66 246,112 C247,140 238,160 226,176 C214,166 196,160 172,156 C146,152 120,150 96,148 C90,134 89,118 92,104 Z"/>
<ellipse class="dk" cx="148" cy="108" rx="27" ry="19" opacity=".75"/>
<path class="sbr" stroke-width="14" d="M172,102 C186,118 194,138 196,160 C198,190 206,215 214,262"/>
<ellipse class="csf" cx="208" cy="141" rx="6.5" ry="14" transform="rotate(-24 208 141)"/>
<path class="spl" stroke-width="4" d="M215,124 C219,136 222,148 223,160"/>
<ellipse class="csf" cx="232" cy="143" rx="8" ry="16" transform="rotate(-18 232 143)"/>
<path class="bo" stroke-width="6" d="M92,100 C96,58 128,30 168,29 C216,29 250,62 252,112"/>
<path class="bo" stroke-width="7.5" d="M252,112 C252,140 244,160 234,174"/>
<path class="bo" stroke-width="5" d="M81,107 L73,123"/>
<path class="bo" stroke-width="5" d="M90,149 L150,151"/>
<line class="ms" x1="189" y1="146" x2="203" y2="146"/><line class="ms" x1="203" y1="150" x2="246" y2="150"/>
<text class="tx" x="184" y="140" text-anchor="end">BS</text><text class="tx" x="226" y="164" text-anchor="middle">BSOB</text>
${num(1, 62, 110)}${num(2, 120, 162)}${num(3, 140, 108)}${num(4, 186, 118)}${num(5, 207, 122)}${num(6, 230, 122)}${num(7, 242, 132)}${num(8, 262, 162)}${num(9, 256, 200)}
<text class="tm" x="4" y="258">лицо — слева</text>
${DRAFT(4, 12)}`);
  }

  /* Позвоночник: продольный срез спины (голова слева) и поперечный срез позвонка. */
  function spine() {
    const P = [[24, 78], [104, 40], [220, 40], [300, 92]];
    const at = t => { const u = 1 - t; return [0, 1].map(k => u * u * u * P[0][k] + 3 * u * u * t * P[1][k] + 3 * u * t * t * P[2][k] + t * t * t * P[3][k]); };
    const norm = t => { const a = at(Math.max(0, t - .01)), b = at(Math.min(1, t + .01)); const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy); return [-dy / l, dx / l]; };
    let dots = "";
    for (let i = 0; i <= 22; i++) {
      const t = .04 + i * .042, [x, y] = at(t), [nx, ny] = norm(t);
      const sac = t > .82, r = sac ? 2.2 : 3.6 - t * 1.2, op = sac ? .35 : 1;
      dots += `<circle class="bof" cx="${(x + nx * 14).toFixed(1)}" cy="${(y + ny * 14).toFixed(1)}" r="${r.toFixed(1)}" opacity="${op}"/>`;
      dots += `<circle class="bof" cx="${(x + nx * 30).toFixed(1)}" cy="${(y + ny * 30).toFixed(1)}" r="${r.toFixed(1)}" opacity="${op}"/>`;
    }
    const [cx, cy] = at(.5), [nx, ny] = norm(.5);
    return svg("0 0 320 230", "Позвоночник плода в 11–14 недель, схема", `
<path class="br" d="M24,78 C104,40 220,40 300,92 L300,150 C220,120 104,120 24,150 Z" opacity=".55"/>
<path class="dk" d="M28,96 C104,62 220,62 300,112 L300,118 C220,70 104,70 28,104 Z" opacity=".55"/>
<path d="M24,78 C104,40 220,40 300,92" fill="none" stroke="var(--sv-skin-edge)" stroke-width="3"/>
${dots}
${num(1, Math.round(cx + nx * 46), Math.round(cy + ny * 46))}${num(2, 160, 36)}${num(3, 286, 128)}
<g transform="translate(60 182)">
  <circle r="34" class="sk"/><circle r="22" class="br"/>
  <circle class="dk" cx="0" cy="-4" r="5" opacity=".8"/>
  <ellipse class="bof" cx="0" cy="10" rx="9" ry="6"/>
  <ellipse class="bof" cx="-11" cy="-12" rx="4" ry="6" transform="rotate(30 -11 -12)"/>
  <ellipse class="bof" cx="11" cy="-12" rx="4" ry="6" transform="rotate(-30 11 -12)"/>
</g>
${num(4, 108, 160)}
<text class="tm" x="4" y="24">← голова</text><text class="tm" x="316" y="24" text-anchor="end">крестец →</text>
<text class="tm" x="104" y="208">поперечный срез позвонка:</text><text class="tm" x="104" y="222">дужки обращены к коже спины</text>
${DRAFT(120, 12)}`);
  }

  FN.SCHEMES = { "t1-axial": axial, "t1-midsag": midsag, "t1-spine": spine };
})();
