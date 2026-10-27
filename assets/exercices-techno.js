/*
  Première technologique (tronc commun) : générateurs d'exercices et figures.
  Préfixes : ye (ensembles et logique), yl (Python), yv (évolutions), yc (calcul et graphiques), ys (suites), yg (suites
  arithmétiques et géométriques), yf (fonctions), yp (degré 2), yd (nombre dérivé), yr (fonction dérivée), yn (deux variables),
  yi (probabilités conditionnelles), yb (épreuves de Bernoulli), yx (variables aléatoires).
  Chaque générateur fabrique une question avec des nombres tirés au hasard, la réponse attendue,
  trois indices progressifs et la solution rédigée.
  Ce fichier n'a besoin que d'assets/exercices-base.js (outils et graphiques communs), chargé avant lui :
  le gros fichier des générateurs du lycée (assets/exercices.js) n'est pas téléchargé pour ce niveau.
*/
(function () {
  "use strict";
  const { rand, pick, shuffle, graph, nbAxe, deN, queN, leN, laN, largeurTexte, boiteTexte, seCoupent } = window.PM_EXO.outils;
  const FIGURES = window.PM_EXO.FIGURES, GEN = window.PM_EXO.GEN;

  /* ---------- Nombres ---------- */
  const pgcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  const arr = (x, k = 6) => +(+x).toFixed(k);
  // Nombre écrit à la française dans une formule : 52\,300 ; 0{,}25 ; -3
  const nb = (x) => {
    const s = String(+(+x).toPrecision(12));
    const neg = s[0] === "-", [e, d] = (neg ? s.slice(1) : s).split(".");
    return (neg ? "-" : "") + e.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") + (d ? "{,}" + d : "");
  };
  const pr = (x) => (x < 0 ? `(${nb(x)})` : nb(x)); // entre parenthèses s'il est négatif
  const nbS = (x) => String(+(+x).toFixed(6)).replace("-", "−").replace(".", ",").replace(/^(−?)(\d{4,})/, (m, s, e) => s + e.replace(/\B(?=(\d{3})+(?!\d))/g, " ")); // nombre écrit dans un SVG ou un texte
  const frac = (n, d) => { if (d < 0) { n = -n; d = -d; } const g = pgcd(n, d) || 1; n /= g; d /= g; return d === 1 ? nb(n) : `${n < 0 ? "-" : ""}\\dfrac{${Math.abs(n)}}{${d}}`; };
  const estDecimal = (x) => Math.abs(x * 1e6 - Math.round(x * 1e6)) < 1e-6 * Math.max(1, Math.abs(x));
  // « + 3 », « - 3 » : terme suivant d'une somme ; coef(a, "x") : « 3x », « -x », « x »
  const plus = (x) => (x < 0 ? `- ${nb(-x)}` : `+ ${nb(x)}`);
  const coef = (a, v) => (a === 1 ? v : a === -1 ? `-${v}` : `${nb(a)}${v}`);
  // Polynôme : coefficients du plus haut degré au plus bas, variable v
  const poly = (cs, v = "x") => {
    const d = cs.length - 1; let s = "";
    cs.forEach((c, k) => {
      if (!c) return; const p = d - k, m = p === 0 ? "" : p === 1 ? v : `${v}^${p}`, a = Math.abs(c);
      const t = p === 0 ? nb(a) : a === 1 ? m : `${nb(a)}${m}`;
      s += s ? ` ${c < 0 ? "-" : "+"} ${t}` : (c < 0 ? "-" : "") + t;
    });
    return s || "0";
  };
  const evalP = (cs, x) => cs.reduce((s, c) => s * x + c, 0);
  // ax + b
  const aff = (a, b, v = "x") => (a === 0 ? nb(b) : `${coef(a, v)}${b ? ` ${plus(b)}` : ""}`);
  // Pourcentages : pct(12.5) → « 12{,}5\,\% » ; taux t (nombre) → coefficient 1 + t écrit
  const pct = (t) => `${nb(t)}\\,\\%`;
  const euros = (x) => `${nb(x)}\\,€`;
  const racine = (n) => { // √n simplifié : [k, m] avec √n = k√m
    let k = 1, m = n; for (let p = 2; p * p <= m; p++) while (m % (p * p) === 0) { m /= p * p; k *= p; } return [k, m];
  };
  const sqrtTex = (n) => { const [k, m] = racine(n); return m === 1 ? nb(k) : `${k === 1 ? "" : nb(k)}\\sqrt{${m}}`; };

  /* ---------- Questions : erreurs prévues, choix, vrai ou faux ---------- */
  // Erreurs prévues : sans doublon, jamais égales à la réponse
  const errs = (att, L) => { const vus = []; return (L || []).filter((e) => { if (!e || typeof e.valeur !== "number" || !isFinite(e.valeur)) return false; if (Math.abs(e.valeur - att) < 1e-9 || vus.some((w) => Math.abs(w - e.valeur) < 1e-9)) return false; vus.push(e.valeur); return true; }); };
  // Quatre choix : la bonne réponse et trois pièges distincts, pris dans l'ordre de la liste ; « autre » fabrique des pièges de réserve
  function choix4(bonne, fausses, autre) {
    const f = [];
    const prendre = (x) => { if (x !== undefined && x !== null && x !== "" && x !== bonne && !f.includes(x)) f.push(x); };
    (fausses || []).forEach(prendre);
    for (let k = 0; f.length < 3 && autre && k < 80; k++) prendre(autre(k));
    const c = shuffle([bonne, ...f.slice(0, 3)]);
    return { choix: c, attendu: c.indexOf(bonne) };
  }
  // Série « vrai ou faux » sans hasard : parmi 4 affirmations du tableau T ([énoncé, vrai ?, explication]), une seule est vraie (ou une seule fausse)
  const minus = (x) => x.replace(/^([A-ZÀÉÈ])(?=[a-zàâçéèêëîïôûù' ])/, (c) => c.toLowerCase());
  function vraiFaux4(T, aides) {
    const V = T.filter((t) => t[1]), F = T.filter((t) => !t[1]), modes = [];
    if (V.length >= 1 && F.length >= 3) modes.push("vraie");
    if (F.length >= 1 && V.length >= 3) modes.push("fausse");
    const m = pick(modes), bon = pick(m === "vraie" ? V : F), autres = shuffle((m === "vraie" ? F : V).slice()).slice(0, 3);
    const c = choix4(bon[0], autres.map((a) => a[0]));
    return { enonce: `Une seule de ces affirmations est **${m}**. Laquelle ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides,
      solution: `« ${bon[0]} » est ${m} : ${minus(bon[2])}\n\n` + autres.map((a) => `- « ${a[0]} » est ${m === "vraie" ? "fausse" : "vraie"} : ${minus(a[2])}`).join("\n") };
  }
  // Enregistre un générateur : nettoie les erreurs prévues d'une question à saisie
  const def = (nom, f) => { GEN[nom] = function (i) { const q = f(i); if (q.mode === "nombre") q.erreurs = errs(q.attendu, q.erreurs); return q; }; };
  // Pièges d'une valeur approchée quand on attend une valeur exacte
  const approx = (v) => [+v.toFixed(2), +v.toFixed(1), Math.trunc(v * 100) / 100].map((a) => ({ valeur: a, message: "C'est une valeur approchée. Donne la valeur exacte, sous forme de fraction." }));

  /* ---------- Contextes (Mayotte) ---------- */
  const PRENOMS = ["Anli", "Nassim", "Zaïnaba", "Fatima", "Moussa", "Awa", "Ibrahim", "Mariama", "Saïd", "Djamila", "Hamada", "Faïza", "Kamal", "Zalifa", "Ambdi", "Nasra", "Toiyb", "Roukia", "Chamsidine", "Hadidja"];
  const LIEUX = ["Mamoudzou", "Dzaoudzi", "Koungou", "Sada", "Chirongui", "Bandraboua", "Kani-Kéli", "Tsingoni", "Ouangani", "Dembéni", "Bouéni", "Acoua", "Mtsamboro", "Pamandzi", "Chiconi", "Bandrélé"];
  const prenom = () => pick(PRENOMS);
  const lieu = () => pick(LIEUX);

  /* ---------- Figures : repère adapté à des fonctions ---------- */
  const pas = (e) => [0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000].find((p) => e / p <= 12) || 10000; // graduation : au plus 12 traits
  // Options de graph() pour tracer les fonctions fs sur [a ; b] (axes compris, graduations adaptées)
  function repere(fs, a, b, extra) {
    let lo = 0, hi = 0;
    fs.forEach((f) => { for (let k = 0; k <= 80; k++) { const y = f(a + ((b - a) * k) / 80); if (isFinite(y)) { lo = Math.min(lo, y); hi = Math.max(hi, y); } } });
    const g = Math.min(a, 0), d = Math.max(b, 0), px = pas(d - g), py = pas(hi - lo || 1);
    const o = { xmin: g - 0.6 * px, xmax: d + 0.6 * px, ymin: lo - 0.6 * py, ymax: hi + 0.6 * py, xstep: px, ystep: py, xetiq: (d - g) / px > 8 ? 2 * px : px, yetiq: (hi - lo) / py > 8 ? 2 * py : py };
    let w = 0; for (let y = Math.ceil(o.ymin / o.yetiq) * o.yetiq; y <= o.ymax; y += o.yetiq) w = Math.max(w, largeurTexte(nbAxe(y), 10));
    const r = (0 - o.xmin) / (o.xmax - o.xmin), besoin = Math.ceil((w + 6 - 306 * r) / (1 - r));
    if (besoin > 14) o.padL = besoin;
    return Object.assign(o, extra || {});
  }
  // graph(o) avec des éléments SVG ajoutés par-dessus : plus(X, Y, H) renvoie du SVG (X, Y : mêmes conversions que graph)
  function graphePlus(o, plus) {
    const W = 320, pad = 14, padL = o.padL || pad, padB = o.padB || (o.ymin >= 0 ? 18 : pad);
    const ux = (W - padL - pad) / (o.xmax - o.xmin);
    const H = Math.max(200, Math.min(400, o.h || Math.round(ux * (o.ymax - o.ymin) * ((o.xstep || 1) / (o.ystep || 1)) + pad + padB)));
    const uy = (H - pad - padB) / (o.ymax - o.ymin);
    const X = (x) => +(padL + (x - o.xmin) * ux).toFixed(1), Y = (y) => +(pad + (o.ymax - y) * uy).toFixed(1);
    const ajout = plus(X, Y, H);
    const boites = [...ajout.matchAll(/<text([^>]*)>([\s\S]*?)<\/text>/g)].map(([, att, t]) => {
      const v = (n) => (att.match(new RegExp(n + '="([^"]*)"')) || [])[1];
      const b = boiteTexte(+v("x"), +v("y"), t.replace(/<[^>]+>/g, ""), 11, v("text-anchor") || "start");
      return { x1: b.x1 - 2, x2: b.x2 + 2, y1: b.y1 - 2, y2: b.y2 + 2 };
    }).filter((b) => isFinite(b.x1) && isFinite(b.y1));
    const svg = graph(o).replace(/<g class="g-tick">([\s\S]*?)<\/g>/, (m, nombres) => '<g class="g-tick">' + nombres.replace(/<text x="([^"]*)" y="([^"]*)" text-anchor="([^"]*)">([^<]*)<\/text>/g, (n, x, y, an, t) => (boites.some((b) => seCoupent(boiteTexte(+x, +y, t, 10, an), b)) ? "" : n)) + "</g>");
    return svg.replace(/<\/svg>$/, ajout + "</svg>");
  }
  // Rend pointillée la i-ième courbe d'un graphique (tangente, sécante…)
  const tiret = (svg, i) => { let n = -1; return svg.replace(/<path class="g-curve g-curve-\d"/g, (m) => { n++; return n === i ? m + ' style="stroke-dasharray:6 4;stroke-width:1.6"' : m; }); };

  /* ---------- Figures : tableaux de signes et de variations ---------- */
  // Tableau de signes d'une expression : xs (textes des bornes), cases (2n − 1 : signe, valeur à la borne, signe…), nom de la ligne
  function tabSigne(xs, cases, nom, lignes) {
    const W = 320, g = 70, hR = 30, L = lignes || [[nom || "f(x)", cases]], H = hR * (L.length + 1) + 2, n = xs.length;
    const X = (k) => g + 18 + (k * (W - g - 36)) / (n - 1);
    let s = `<svg class="graph tabvar" viewBox="0 0 ${W} ${H}" role="img" aria-label="Tableau de signes">`;
    s += `<g class="g-axis"><rect x="1" y="1" width="${W - 2}" height="${H - 2}" fill="none" stroke-width="1.2" style="stroke:var(--doux)"/><line x1="${g}" y1="1" x2="${g}" y2="${H - 1}"/>`;
    L.forEach((_, j) => { s += `<line x1="1" y1="${hR * (j + 1)}" x2="${W - 1}" y2="${hR * (j + 1)}"/>`; });
    s += `</g><text class="g-label" x="${g / 2}" y="20" text-anchor="middle">x</text>`;
    xs.forEach((x, k) => { s += `<text class="g-label" x="${X(k)}" y="20" text-anchor="middle">${x}</text>`; });
    L.forEach(([nomL, cs], j) => {
      const y = hR * (j + 1);
      s += `<text class="g-label" x="${g / 2}" y="${y + 20}" text-anchor="middle">${nomL}</text>`;
      cs.forEach((c, i) => {
        if (i % 2 === 0) { const xm = (X(i / 2) + X(i / 2 + 1)) / 2; s += `<text class="g-clabel" x="${xm}" y="${y + 21}" text-anchor="middle" style="fill:${c === "+" ? "var(--lagon)" : c === "?" ? "var(--ylang)" : "var(--faux)"}">${c === "-" ? "−" : c}</text>`; }
        else { const xv = X((i + 1) / 2); if (c === "||") s += `<line x1="${xv - 2}" y1="${y}" x2="${xv - 2}" y2="${y + hR}" style="stroke:var(--encre);stroke-width:1.2"/><line x1="${xv + 2}" y1="${y}" x2="${xv + 2}" y2="${y + hR}" style="stroke:var(--encre);stroke-width:1.2"/>`; else { s += `<line x1="${xv}" y1="${y}" x2="${xv}" y2="${y + hR}" style="stroke:var(--trait);stroke-width:1;stroke-dasharray:3 3"/>`; if (c) s += `<text class="g-label" x="${xv}" y="${y + 20}" text-anchor="middle" style="paint-order:stroke;stroke:var(--surface);stroke-width:4px">${c}</text>`; } }
      });
    });
    return s + `</svg>`;
  }
  // Tableau de signes de f' et de variations de f : xs (textes), cases de f' (2n − 1), ys (valeurs aux xs, "" si aucune) ; sansDerivee : variations seules
  function tabSV(xs, cases, ys, nomF, sansDerivee) {
    const W = 320, g = 58, hR = 30, H = (sansDerivee ? hR : 2 * hR) + 74, n = xs.length, yT = sansDerivee ? hR : 2 * hR;
    const X = (k) => g + 18 + (k * (W - g - 36)) / (n - 1);
    const monte = (k) => cases[2 * k] === "+";
    let s = `<svg class="graph tabvar" viewBox="0 0 ${W} ${H}" role="img" aria-label="Tableau ${sansDerivee ? "" : "de signes de la dérivée et "}de variations de ${nomF || "f"}">`;
    s += `<g class="g-axis"><rect x="1" y="1" width="${W - 2}" height="${H - 2}" fill="none" stroke-width="1.2" style="stroke:var(--doux)"/><line x1="${g}" y1="1" x2="${g}" y2="${H - 1}"/><line x1="1" y1="${hR}" x2="${W - 1}" y2="${hR}"/>${sansDerivee ? "" : `<line x1="1" y1="${2 * hR}" x2="${W - 1}" y2="${2 * hR}"/>`}</g>`;
    s += `<text class="g-label" x="${g / 2}" y="20" text-anchor="middle">x</text>${sansDerivee ? "" : `<text class="g-label" x="${g / 2}" y="${hR + 20}" text-anchor="middle">${nomF || "f"}′(x)</text>`}<text class="g-label" x="${g / 2}" y="${yT + 42}" text-anchor="middle" style="fill:var(--lagon)">${nomF || "f"}</text>`;
    xs.forEach((x, k) => { s += `<text class="g-label" x="${X(k)}" y="20" text-anchor="middle">${x}</text>`; });
    if (!sansDerivee) cases.forEach((c, i) => {
      if (i % 2 === 0) { const xm = (X(i / 2) + X(i / 2 + 1)) / 2; s += `<text class="g-clabel" x="${xm}" y="${hR + 21}" text-anchor="middle" style="fill:${c === "+" ? "var(--lagon)" : c === "?" ? "var(--ylang)" : "var(--faux)"}">${c === "-" ? "−" : c}</text>`; }
      else { const xv = X((i + 1) / 2); s += `<line x1="${xv}" y1="${hR}" x2="${xv}" y2="${2 * hR}" style="stroke:var(--trait);stroke-width:1;stroke-dasharray:3 3"/>`; if (c) s += `<text class="g-label" x="${xv}" y="${hR + 20}" text-anchor="middle" style="paint-order:stroke;stroke:var(--surface);stroke-width:4px">${c}</text>`; }
    });
    const haut = xs.map((_, k) => (k > 0 && monte(k - 1)) || (k < n - 1 && !monte(k)));
    const yH = yT + 18, yB = H - 10;
    ys.forEach((y, k) => { if (y !== "" && y !== undefined) s += `<text class="g-label" x="${X(k)}" y="${haut[k] ? yH : yB}" text-anchor="middle">${y}</text>`; });
    for (let k = 0; k < n - 1; k++) {
      if (cases[2 * k] !== "+" && cases[2 * k] !== "-") continue;
      const up = monte(k), y1 = up ? yB - 14 : yH + 8, y2 = up ? yH + 8 : yB - 14, x1 = X(k) + (ys[k] === "" ? 0 : 14), x2 = X(k + 1) - (ys[k + 1] === "" ? 0 : 14);
      const a = Math.atan2(y2 - y1, x2 - x1), hx = x2 - 7 * Math.cos(a - 0.45), hy = y2 - 7 * Math.sin(a - 0.45), kx = x2 - 7 * Math.cos(a + 0.45), ky = y2 - 7 * Math.sin(a + 0.45);
      s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:var(--lagon);stroke-width:1.8"/><path d="M${x2} ${y2} L${hx.toFixed(1)} ${hy.toFixed(1)} L${kx.toFixed(1)} ${ky.toFixed(1)}z" style="fill:var(--lagon)"/>`;
    }
    return s + `</svg>`;
  }

  /* ---------- Figures : arbre pondéré à deux niveaux ---------- */
  // o.n1 = [[nom, proba]] (2 branches), o.n2 = [[[nom, proba], [nom, proba]], …] (par branche du 1er niveau) ; probabilités : textes ("0,3" ou "?")
  function arbre(o) {
    const W = 320, H = o.h || 220, x0 = 20, x1 = 130, x2 = 250, n = o.n1.length;
    const yA = (k) => 30 + (k * (H - 60)) / (n - 1), yB = (k, j) => yA(k) + (j - 0.5) * 48;
    const lab = (x, y, t, c) => `<text class="g-label" x="${x}" y="${y}" text-anchor="middle" style="${c ? "fill:var(--lagon);" : ""}font-weight:700;paint-order:stroke;stroke:var(--surface);stroke-width:4px">${t}</text>`;
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.aria || "Arbre pondéré"}">`;
    const yc = H / 2;
    o.n1.forEach(([nom, p], k) => {
      s += `<line x1="${x0}" y1="${yc}" x2="${x1}" y2="${yA(k)}" style="stroke:var(--encre);stroke-width:1.4"/>` + lab((x0 + x1) / 2 - 6, (yc + yA(k)) / 2 + (yA(k) < yc ? -4 : 12), p, true) + `<text class="g-label" x="${x1 + 8}" y="${yA(k) + 4}" style="font-weight:700">${nom}</text>`;
      (o.n2[k] || []).forEach(([nom2, p2], j) => {
        const y = yB(k, j);
        s += `<line x1="${x1 + 30}" y1="${yA(k)}" x2="${x2}" y2="${y}" style="stroke:var(--encre);stroke-width:1.4"/>` + lab((x1 + 30 + x2) / 2, (yA(k) + y) / 2 + (j === 0 ? -4 : 12), p2, true) + `<text class="g-label" x="${x2 + 8}" y="${y + 4}" style="font-weight:700">${nom2}</text>`;
      });
    });
    return s + `</svg>`;
  }
  const barre = (t) => `<tspan style="text-decoration:overline">${t}</tspan>`;

  /* ---------- Figures : nuage de points ---------- */
  function nuage(xs, ys, extra) {
    const px = pas(Math.max(...xs) - Math.min(0, Math.min(...xs)) || 1), py = pas(Math.max(...ys) - Math.min(0, Math.min(...ys)) || 1);
    const xmin = Math.min(0, Math.min(...xs)), ymin = Math.min(0, Math.min(...ys));
    const o = Object.assign({ xmin: xmin - 0.6 * px, xmax: Math.max(...xs) + 0.8 * px, ymin: ymin - 0.6 * py, ymax: Math.max(...ys) + 0.8 * py, xstep: px, ystep: py, h: 260, points: xs.map((x, k) => ({ x, y: ys[k] })) }, extra || {});
    let w = 0; for (let y = Math.ceil(o.ymin / py) * py; y <= o.ymax; y += py) w = Math.max(w, largeurTexte(nbAxe(y), 10));
    if (w + 6 > 14) o.padL = Math.ceil(w + 8);
    return graph(o);
  }
  const moyenne = (L) => L.reduce((s, v) => s + v, 0) / L.length;
  // Droite des moindres carrés : [a, b]
  function moindresCarres(xs, ys) {
    const mx = moyenne(xs), my = moyenne(ys);
    let num = 0, den = 0; xs.forEach((x, k) => { num += (x - mx) * (ys[k] - my); den += (x - mx) ** 2; });
    const a = num / den; return [a, my - a * mx];
  }

  /* ---------- Figures : liste Python ---------- */
  function listePy(L, nom) {
    const W = 320, c = Math.min(44, Math.floor(260 / L.length)), x0 = (W - c * L.length) / 2;
    let s = `<svg class="graph" viewBox="0 0 ${W} 90" role="img" aria-label="La liste ${nom || "L"} : ${L.join(", ")}, indices de 0 à ${L.length - 1}">`;
    L.forEach((v, k) => { s += `<rect x="${x0 + k * c}" y="28" width="${c}" height="30" style="fill:var(--surface);stroke:var(--lagon);stroke-width:1.5"/><text class="g-label" x="${x0 + k * c + c / 2}" y="48" text-anchor="middle" style="font-weight:700">${v}</text><text class="g-label" x="${x0 + k * c + c / 2}" y="76" text-anchor="middle" style="fill:var(--lagon)">${k}</text>`; });
    s += `<text class="g-label" x="${x0}" y="16">${nom || "L"}</text><text class="g-label" x="${W - 8}" y="76" text-anchor="end" style="fill:var(--lagon)">indice</text>`;
    return s + `</svg>`;
  }
  const py = (code) => "```python\n" + code + "\n```";

  /* ---------- Chapitre 1 : ensembles et logique (préfixe ye) ---------- */
  const ENS = ["\\mathbb{N}", "\\mathbb{Z}", "\\mathbb{D}", "\\mathbb{Q}", "\\mathbb{R}"];
  const ENS_NOMS = ["entiers naturels", "entiers relatifs", "nombres décimaux", "nombres rationnels", "nombres réels"];
  // Un nombre et le rang de son plus petit ensemble (0 : N, 1 : Z, 2 : D, 3 : Q, 4 : R)
  function nombreEns() {
    const t = pick(["N", "N", "Z", "D", "D", "Q", "Q", "R"]);
    if (t === "N") { const n = rand(0, 60); return { tex: nb(n), rang: 0, pourquoi: `$${nb(n)}$ est un entier positif.` }; }
    if (t === "Z") { const n = -rand(1, 60); return { tex: nb(n), rang: 1, pourquoi: `$${nb(n)}$ est un entier négatif : il est dans $\\mathbb{Z}$ mais pas dans $\\mathbb{N}$.` }; }
    if (t === "D") { const v = pick([-1, 1]) * pick([0.5, 2.5, 7.25, 3.6, 0.125, 12.8, 0.04, 9.75]); return { tex: nb(v), rang: 2, pourquoi: `$${nb(v)}$ a une écriture décimale finie, mais ce n'est pas un entier.` }; }
    if (t === "Q") { const d = pick([3, 7, 9, 11, 6, 13]), n = pick([1, 2, 4, 5, 8, 10]).toString(); const f = `${pick(["", "-"])}\\dfrac{${n}}{${d}}`; return { tex: f, rang: 3, pourquoi: `$${f}$ est un quotient d'entiers dont l'écriture décimale est illimitée (le dénominateur $${d}$ n'est pas un produit de $2$ et de $5$).` }; }
    const v = pick(["\\sqrt{2}", "\\pi", "\\sqrt{5}", "-\\sqrt{3}", "\\sqrt{7}", "2\\pi"]); return { tex: v, rang: 4, pourquoi: `$${v}$ n'est pas un quotient d'entiers : c'est un irrationnel.` };
  }
  def("ye-appartient", () => {
    if (Math.random() < 0.5) {
      const x = nombreEns();
      const ch = choix4(`$${ENS[x.rang]}$`, ENS.filter((_, k) => k !== x.rang).map((e) => `$${e}$`));
      return { enonce: `Quel est le **plus petit** ensemble de nombres ($\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{D}$, $\\mathbb{Q}$ ou $\\mathbb{R}$) auquel appartient $${x.tex}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$ : chaque ensemble contient le précédent.", "Est-ce un entier ? positif ? Son écriture décimale est-elle finie ?", x.pourquoi],
        solution: `${x.pourquoi}\n\nLe plus petit ensemble qui le contient est $${ENS[x.rang]}$ (${ENS_NOMS[x.rang]}).` };
    }
    // x ∈ quel intervalle ?
    const x = pick([-3.5, -2, -1.5, 0, 0.5, 1, 2.5, 3, 4.5, 6, 7.5, 9]);
    const a = Math.floor(x) - rand(0, 2), b = Math.ceil(x) + rand(0, 2);
    const ga = Number.isInteger(x) && a === x ? true : pick([true, false]), gb = Number.isInteger(x) && b === x ? true : pick([true, false]);
    const I = (u, v, gu, gv) => `${gu ? "[" : "]"}${nb(u)}\\,;${nb(v)}${gv ? "]" : "["}`;
    const bonne = `$${I(a, b, ga, gb)}$`;
    const f = [I(b, b + 3, true, false), I(a - 4, a, false, Number.isInteger(x) && a === x ? false : true), Number.isInteger(x) && a === x ? I(a, b, false, gb) : Number.isInteger(x) && b === x ? I(a, b, ga, false) : I(x + 1, x + 4, true, true), I(b + 1, b + 5, true, true)].map((s) => `$${s}$`);
    const ch = choix4(bonne, f);
    return { enonce: `À quel intervalle appartient le nombre $${nb(x)}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["$x \\in [a\\,;b]$ signifie $a \\leqslant x \\leqslant b$ : le nombre est entre les deux bornes.", "Un crochet tourné vers l'intérieur inclut la borne, tourné vers l'extérieur l'exclut.", `Vérifie que $${nb(x)}$ est bien entre les bornes, bornes comprises ou non.`],
      solution: `$${nb(a)} ${ga ? "\\leqslant" : "<"} ${nb(x)} ${gb ? "\\leqslant" : "<"} ${nb(b)}$, donc $${nb(x)} \\in ${I(a, b, ga, gb)}$. Les autres intervalles ne contiennent pas $${nb(x)}$${Number.isInteger(x) && (a === x || b === x) ? " (attention aux bornes exclues)" : ""}.` };
  });

  def("ye-intervalle", () => {
    const t = pick(["ferme", "ouvert", "mixte", "infini-d", "infini-g", "infini-d", "infini-g"]);
    const a = rand(-9, 5), b = a + rand(1, 8), v = pick(["x", "x", "t", "n"]);
    let ineg, bonne, f;
    const I = (u, w, gu, gw) => `${gu ? "[" : "]"}${nb(u)}\\,;${nb(w)}${gw ? "]" : "["}`;
    if (t === "infini-d") { const g = pick([true, false]); ineg = `${v} ${g ? "\\geqslant" : ">"} ${nb(a)}`; bonne = `${g ? "[" : "]"}${nb(a)}\\,;+\\infty[`; f = [`]-\\infty\\,;${nb(a)}${g ? "]" : "["}`, `${g ? "]" : "["}${nb(a)}\\,;+\\infty[`, `[${nb(a)}\\,;+\\infty]`, `]-\\infty\\,;${nb(a)}[`]; }
    else if (t === "infini-g") { const g = pick([true, false]); ineg = `${v} ${g ? "\\leqslant" : "<"} ${nb(b)}`; bonne = `]-\\infty\\,;${nb(b)}${g ? "]" : "["}`; f = [`${g ? "[" : "]"}${nb(b)}\\,;+\\infty[`, `]-\\infty\\,;${nb(b)}${g ? "[" : "]"}`, `[-\\infty\\,;${nb(b)}${g ? "]" : "["}`, `]${nb(b)}\\,;+\\infty[`]; }
    else { const ga = t === "ferme" || (t === "mixte" && pick([true, false])), gb = t === "ferme" || (t === "mixte" && !ga); ineg = `${nb(a)} ${ga ? "\\leqslant" : "<"} ${v} ${gb ? "\\leqslant" : "<"} ${nb(b)}`; bonne = I(a, b, ga, gb); f = [I(a, b, !ga, !gb), I(a, b, !ga, gb), I(a, b, ga, !gb), I(b, a, ga, gb)]; }
    const ch = choix4(`$${bonne}$`, f.map((s) => `$${s}$`));
    return { enonce: `Quel intervalle traduit l'inégalité $${ineg}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["$\\leqslant$ ou $\\geqslant$ : la borne est comprise, le crochet est tourné vers l'intérieur.", "$<$ ou $>$ : la borne est exclue, le crochet est tourné vers l'extérieur.", "Du côté de $+\\infty$ ou de $-\\infty$, le crochet est toujours tourné vers l'extérieur."],
      solution: `$${ineg}$ se traduit par $${v} \\in ${bonne}$.` };
  });

  // Intervalles I et J à bornes entières : intersection et réunion
  def("ye-inter-union", () => {
    const a = rand(-6, 3), b = a + rand(2, 6), c = a + rand(-3, 4), d = c + rand(2, 6);
    if (c === a) return GENX.rebours("ye-inter-union");
    const ga = pick([true, false]), gb = pick([true, false]), gc = pick([true, false]), gd = pick([true, false]);
    const I = `${ga ? "[" : "]"}${nb(a)}\\,;${nb(b)}${gb ? "]" : "["}`, J = `${gc ? "[" : "]"}${nb(c)}\\,;${nb(d)}${gd ? "]" : "["}`;
    const quoi = pick(["inter", "union"]);
    // bornes de l'intersection
    const lo = Math.max(a, c), glo = a > c ? ga : c > a ? gc : ga && gc, hi = Math.min(b, d), ghi = b < d ? gb : d < b ? gd : gb && gd;
    const vide = lo > hi || (lo === hi && !(glo && ghi));
    const inter = vide ? "\\varnothing" : lo === hi ? `\\{${nb(lo)}\\}` : `${glo ? "[" : "]"}${nb(lo)}\\,;${nb(hi)}${ghi ? "]" : "["}`;
    const ulo = Math.min(a, c), gulo = a < c ? ga : c < a ? gc : ga || gc, uhi = Math.max(b, d), guhi = b > d ? gb : d > b ? gd : gb || gd;
    const disjoints = lo > hi || (lo === hi && !glo && !ghi);
    const union = disjoints ? `${I} \\cup ${J}` : `${gulo ? "[" : "]"}${nb(ulo)}\\,;${nb(uhi)}${guhi ? "]" : "["}`;
    const bonne = quoi === "inter" ? inter : union;
    const f = quoi === "inter" ? [union, `${glo ? "]" : "["}${nb(lo)}\\,;${nb(hi)}${ghi ? "[" : "]"}`, `${gulo ? "[" : "]"}${nb(ulo)}\\,;${nb(hi)}${ghi ? "]" : "["}`, vide ? `[${nb(lo)}\\,;${nb(hi)}]` : "\\varnothing", `${glo ? "[" : "]"}${nb(lo)}\\,;${nb(uhi)}${guhi ? "]" : "["}`]
      : [inter, `${gulo ? "]" : "["}${nb(ulo)}\\,;${nb(uhi)}${guhi ? "[" : "]"}`, `${glo ? "[" : "]"}${nb(lo)}\\,;${nb(uhi)}${guhi ? "]" : "["}`, `${gulo ? "[" : "]"}${nb(ulo)}\\,;${nb(hi)}${ghi ? "]" : "["}`, disjoints ? `[${nb(ulo)}\\,;${nb(uhi)}]` : `${I} \\cup ${J}`];
    const ch = choix4(`$${bonne}$`, f.map((s) => `$${s}$`));
    return { enonce: `On pose $I = ${I}$ et $J = ${J}$. Que vaut $I ${quoi === "inter" ? "\\cap" : "\\cup"} J$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [quoi === "inter" ? "$I \\cap J$ (intersection) : les nombres qui sont **à la fois** dans $I$ et dans $J$." : "$I \\cup J$ (réunion) : les nombres qui sont dans $I$ **ou** dans $J$ (au moins l'un des deux).", "Dessine les deux intervalles sur une même droite graduée.", quoi === "inter" ? `La partie commune commence en $${nb(lo)}$ et finit en $${nb(hi)}$ (si elle existe).` : `On prend tout, de $${nb(ulo)}$ à $${nb(uhi)}$${disjoints ? ", sauf le trou entre les deux intervalles" : ""}.`],
      solution: quoi === "inter"
        ? (vide ? `Les deux intervalles n'ont aucun nombre en commun : $I \\cap J = \\varnothing$.` : `Les nombres communs aux deux intervalles vont de $${nb(lo)}$ à $${nb(hi)}$ : $I \\cap J = ${inter}$ (la borne est comprise seulement si elle l'est dans les deux intervalles).`)
        : (disjoints ? `Les deux intervalles sont disjoints : la réunion ne se simplifie pas, $I \\cup J = ${union}$.` : `Les deux intervalles se chevauchent : en les réunissant on obtient $I \\cup J = ${union}$ (la borne est comprise dès qu'elle l'est dans l'un des deux).`) };
  });
  // Relance un générateur (tirage impossible)
  const GENX = { rebours: (n) => GEN[n]() };

  // Ensembles finis en extension
  const ensExt = (L) => `\\{${L.join("\\,;")}\\}`;
  def("ye-cardinal", () => {
    const E = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).slice(0, rand(7, 9)).sort((x, y) => x - y);
    const A = shuffle(E).slice(0, rand(3, 5)).sort((x, y) => x - y), B = shuffle(E).slice(0, rand(3, 5)).sort((x, y) => x - y);
    const inter = A.filter((x) => B.includes(x)), union = E.filter((x) => A.includes(x) || B.includes(x)), compA = E.filter((x) => !A.includes(x));
    const t = pick(["inter", "union", "comp", "inter", "union"]);
    const att = t === "inter" ? inter.length : t === "union" ? union.length : compA.length;
    const nomQ = t === "inter" ? "\\text{Card}(A \\cap B)" : t === "union" ? "\\text{Card}(A \\cup B)" : "\\text{Card}(\\overline{A})";
    return { enonce: `Dans $E = ${ensExt(E)}$, on considère $A = ${ensExt(A)}$ et $B = ${ensExt(B)}$. Calcule $${nomQ}$${t === "comp" ? " (complémentaire de $A$ dans $E$)" : ""}.`,
      mode: "nombre", prefixe: `$${nomQ} =$`, attendu: att,
      erreurs: t === "inter" ? [{ valeur: union.length, message: "Ça, c'est le nombre d'éléments de la réunion. L'intersection ne garde que les éléments communs." }, { valeur: A.length + B.length, message: "Compte seulement les éléments qui sont dans $A$ **et** dans $B$." }]
        : t === "union" ? [{ valeur: A.length + B.length, message: `$\\text{Card}(A \\cup B) = \\text{Card}(A) + \\text{Card}(B) - \\text{Card}(A \\cap B)$ : les ${inter.length} élément(s) commun(s) ne comptent qu'une fois.` }, { valeur: inter.length, message: "Ça, c'est l'intersection. La réunion contient tous les éléments de $A$ ou de $B$." }]
        : [{ valeur: A.length, message: "Le complémentaire contient les éléments de $E$ qui **ne sont pas** dans $A$." }, { valeur: E.length, message: "Retire les éléments de $A$ à ceux de $E$." }],
      aides: [t === "inter" ? "$A \\cap B$ : les éléments qui sont dans $A$ **et** dans $B$." : t === "union" ? "$A \\cup B$ : les éléments qui sont dans $A$ **ou** dans $B$, chacun compté une fois." : "$\\overline{A}$ : les éléments de $E$ qui ne sont pas dans $A$.", "Card désigne le nombre d'éléments.", t === "inter" ? `$A \\cap B = ${inter.length ? ensExt(inter) : "\\varnothing"}$.` : t === "union" ? `$A \\cup B = ${ensExt(union)}$.` : `$\\overline{A} = ${ensExt(compA)}$.`],
      solution: t === "inter" ? `$A \\cap B = ${inter.length ? ensExt(inter) : "\\varnothing"}$, donc $\\text{Card}(A \\cap B) = ${att}$.` : t === "union" ? `$A \\cup B = ${ensExt(union)}$, donc $\\text{Card}(A \\cup B) = ${att}$.\n\nOn retrouve $${A.length} + ${B.length} - ${inter.length} = ${att}$.` : `$\\overline{A} = ${ensExt(compA)}$ (tout $E$ sauf $A$), donc $\\text{Card}(\\overline{A}) = ${E.length} - ${A.length} = ${att}$.` };
  });

  // Diagramme de Venn avec effectifs
  function venn(o) {
    const W = 320, H = 200;
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.aria}">`;
    s += `<rect x="10" y="10" width="300" height="180" rx="8" style="fill:none;stroke:var(--encre);stroke-width:1.4"/><text class="g-label" x="20" y="30" style="font-weight:700">${o.E || "E"}</text>`;
    s += `<circle cx="125" cy="105" r="62" style="fill:var(--lagon);fill-opacity:0.13;stroke:var(--lagon);stroke-width:1.8"/><circle cx="195" cy="105" r="62" style="fill:var(--ylang);fill-opacity:0.13;stroke:var(--ylang);stroke-width:1.8"/>`;
    s += `<text class="g-label" x="82" y="52" style="font-weight:700;fill:var(--lagon)">${o.A || "A"}</text><text class="g-label" x="228" y="52" style="font-weight:700;fill:var(--ylang)">${o.B || "B"}</text>`;
    const t = (x, y, v) => `<text class="g-label" x="${x}" y="${y}" text-anchor="middle" style="font-weight:700">${v}</text>`;
    return s + t(95, 110, o.a) + t(160, 110, o.ab) + t(225, 110, o.b) + t(270, 178, o.hors) + `</svg>`;
  }
  def("ye-venn", () => {
    const ctx = pick([["élèves", "font du sport", "font de la musique", "S", "M"], ["clients", "ont un téléphone", "ont une tablette", "T", "B"], ["habitants", "parlent shimaoré", "parlent kibouchi", "S", "K"], ["lycéens", "prennent le bus", "mangent à la cantine", "B", "C"]]);
    const a = rand(5, 30), ab = rand(3, 20), b = rand(4, 30), hors = rand(0, 15), N = a + ab + b + hors;
    const t = pick(["A", "B", "inter", "union", "hors", "unseul"]);
    const fig = venn({ a, ab, b, hors, A: ctx[3], B: ctx[4], aria: `Diagramme : ${a} dans ${ctx[3]} seulement, ${ab} dans les deux, ${b} dans ${ctx[4]} seulement, ${hors} en dehors` });
    const Q = { A: [`$\\text{Card}(${ctx[3]})$`, a + ab, `tous les ${ctx[0]} qui ${ctx[1]} : ${a} + ${ab}`], B: [`$\\text{Card}(${ctx[4]})$`, b + ab, `tous les ${ctx[0]} qui ${ctx[2]} : ${b} + ${ab}`], inter: [`$\\text{Card}(${ctx[3]} \\cap ${ctx[4]})$`, ab, `la zone commune aux deux : ${ab}`], union: [`$\\text{Card}(${ctx[3]} \\cup ${ctx[4]})$`, a + ab + b, `tout ce qui est dans au moins un des deux disques : ${a} + ${ab} + ${b}`], hors: [`$\\text{Card}(\\overline{${ctx[3]} \\cup ${ctx[4]}})$ (ni l'un ni l'autre)`, hors, `la zone en dehors des deux disques : ${hors}`], unseul: ["le nombre de ceux qui sont dans un seul des deux ensembles", a + b, `${ctx[3]} seul plus ${ctx[4]} seul : ${a} + ${b}`] }[t];
    return { enonce: `Un groupe de $${N}$ ${ctx[0]} est réparti selon deux ensembles : $${ctx[3]}$ (ceux qui ${ctx[1]}) et $${ctx[4]}$ (ceux qui ${ctx[2]}). Le diagramme donne les effectifs de chaque zone. Donne ${Q[0]}.`,
      figure: fig, mode: "nombre", prefixe: "Effectif :", attendu: Q[1],
      erreurs: [{ valeur: t === "A" ? a : t === "B" ? b : t === "union" ? a + b : t === "inter" ? a + ab + b : N, message: t === "A" || t === "B" ? "N'oublie pas la zone commune : ceux qui sont dans les deux ensembles sont aussi dans celui-ci." : t === "union" ? "La réunion contient aussi la zone commune." : t === "inter" ? "L'intersection, c'est seulement la zone commune." : "Relis la zone demandée sur le diagramme." }, { valeur: N, message: "Ce n'est pas tout le groupe qui est demandé." }],
      aides: ["Chaque nombre du diagramme compte les éléments d'une zone : à gauche seulement, au milieu (les deux), à droite seulement, en dehors.", `La zone demandée : ${Q[2]}.`, "Additionne les effectifs des zones concernées."],
      solution: `Il faut compter ${Q[2]}, soit $${Q[1]}$ ${ctx[0]}.` };
  });

  def("ye-produit-cartesien", () => {
    if (Math.random() < 0.5) {
      const A = shuffle(["a", "b", "c", "d", "e"]).slice(0, rand(2, 4)).sort(), B = shuffle([1, 2, 3, 4, 5, 6]).slice(0, rand(2, 4)).sort();
      const att = A.length * B.length;
      return { enonce: `On pose $A = ${ensExt(A)}$ et $B = ${ensExt(B)}$. Combien le produit cartésien $A \\times B$ (ensemble des couples $(x\\,;y)$ avec $x \\in A$ et $y \\in B$) a-t-il d'éléments ?`,
        mode: "nombre", prefixe: "$\\text{Card}(A \\times B) =$", attendu: att,
        erreurs: [{ valeur: A.length + B.length, message: "On ne compte pas les éléments de $A$ et de $B$, mais les couples : chaque élément de $A$ se combine avec chaque élément de $B$." }, { valeur: att / 2, message: "Les couples $(a\\,;1)$ et $(1\\,;a)$ ne sont pas comparés ici : on prend le premier élément dans $A$, le second dans $B$." }],
        aides: ["Un couple $(x\\,;y)$ : $x$ dans $A$, $y$ dans $B$.", `Pour chaque élément de $A$ (il y en a $${A.length}$), il y a $${B.length}$ choix pour $y$.`, `$${A.length} \\times ${B.length}$.`],
        solution: `Chaque élément de $A$ se combine avec chacun des $${B.length}$ éléments de $B$ : $\\text{Card}(A \\times B) = ${A.length} \\times ${B.length} = ${att}$.\n\nPar exemple $(${A[0]}\\,;${B[0]})$, $(${A[0]}\\,;${B[1]})$, … sont des éléments de $A \\times B$.` };
    }
    const A = shuffle([1, 2, 3, 4, 5, 6, 7]).slice(0, 3).sort((x, y) => x - y), B = shuffle([0, 2, 4, 6, 8, 9]).slice(0, 2).sort((x, y) => x - y);
    const bonne = `$(${pick(A)}\\,;${pick(B)})$`;
    const hA = [8, 10, 11, 12].filter((x) => !A.includes(x)), hB = [1, 3, 5, 7].filter((x) => !B.includes(x));
    const ch = choix4(bonne, [`$(${pick(B)}\\,;${pick(A)})$`, `$(${pick(hA)}\\,;${pick(B)})$`, `$(${pick(A)}\\,;${pick(hB)})$`, `$(${pick(A)}\\,;${pick(A)})$`], () => `$(${pick(hA)}\\,;${pick(hB)})$`);
    return { enonce: `On pose $A = ${ensExt(A)}$ et $B = ${ensExt(B)}$. Lequel de ces couples appartient à $A \\times B$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Un élément de $A \\times B$ est un couple $(x\\,;y)$ avec $x \\in A$ et $y \\in B$.", "L'ordre compte : le premier nombre doit être dans $A$, le second dans $B$.", `Vérifie pour chaque couple : premier nombre dans $${ensExt(A)}$ ? second dans $${ensExt(B)}$ ?`],
      solution: `Dans ${bonne}, le premier nombre est dans $A$ et le second dans $B$ : c'est un élément de $A \\times B$. Dans les autres couples, au moins un des deux nombres n'est pas dans le bon ensemble (ou les ensembles sont inversés).` };
  });

  // « et », « ou », négation : une seule proposition vraie parmi quatre
  def("ye-et-ou", () => {
    const x = rand(-6, 9);
    const conds = []; // [texte, vraie ?]
    const add = (c) => conds.push(c);
    const cmp = (s, v) => (s === "<" ? x < v : s === ">" ? x > v : s === "\\leqslant" ? x <= v : x >= v);
    const parite = x % 2 === 0;
    for (let k = 0; k < 14; k++) {
      const a = rand(-7, 10), b = rand(-7, 10), s1 = pick(["<", ">", "\\leqslant", "\\geqslant"]), s2 = pick(["<", ">", "\\leqslant", "\\geqslant"]);
      const t = pick(["et", "ou", "et", "ou", "non", "pair"]);
      if (t === "et") add([`$x ${s1} ${nb(a)}$ et $x ${s2} ${nb(b)}$`, cmp(s1, a) && cmp(s2, b)]);
      else if (t === "ou") add([`$x ${s1} ${nb(a)}$ ou $x ${s2} ${nb(b)}$`, cmp(s1, a) || cmp(s2, b)]);
      else if (t === "non") add([`non ($x ${s1} ${nb(a)}$)`, !cmp(s1, a)]);
      else { const et = pick([true, false]); add([`$x$ est pair ${et ? "et" : "ou"} $x ${s1} ${nb(a)}$`, et ? parite && cmp(s1, a) : parite || cmp(s1, a)]); }
    }
    const V = conds.filter((c) => c[1]), F = conds.filter((c) => !c[1]);
    if (V.length < 1 || F.length < 3) return GEN["ye-et-ou"]();
    const bon = pick(V), autres = shuffle(F).slice(0, 3);
    const ch = choix4(bon[0], autres.map((c) => c[0]));
    return { enonce: `On prend $x = ${nb(x)}$. Une seule de ces propositions est **vraie**. Laquelle ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["« $P$ et $Q$ » est vraie seulement si $P$ et $Q$ sont vraies toutes les deux.", "« $P$ ou $Q$ » est vraie dès que l'une au moins des deux est vraie (le « ou » des maths n'est pas exclusif).", "« non $P$ » est vraie quand $P$ est fausse. Teste chaque proposition avec $x = " + nb(x) + "$."],
      solution: `Avec $x = ${nb(x)}$ : « ${bon[0]} » est vraie.\n\n` + autres.map((c) => `- « ${c[0]} » est fausse.`).join("\n") };
  });

  // Contre-exemple
  def("ye-contre-exemple", () => {
    const P = pick([
      { p: "Pour tout entier $n$, $n^2 > n$.", ok: (n) => !(n * n > n), cands: [0, 1], faux: [2, 3, -1, 5], pourquoi: (n) => `$${n}^2 = ${n * n}$, qui n'est pas strictement supérieur à $${n}$.` },
      { p: "Pour tout réel $x$, $x^2 \\geqslant x$.", ok: (x) => !(x * x >= x), cands: [0.5, 0.2, 0.9], faux: [1, 2, -1, 0], pourquoi: (x) => `$${nb(x)}^2 = ${nb(x * x)} < ${nb(x)}$.` },
      { p: "Pour tout entier $n$, $2n + 1$ est un nombre premier.", ok: (n) => [4, 7, 10, 12].includes(n), cands: [4, 7, 10, 12], faux: [1, 2, 3, 5], pourquoi: (n) => `$2 \\times ${n} + 1 = ${2 * n + 1}$ n'est pas premier : $${2 * n + 1} = ${{ 4: "3 \\times 3", 7: "3 \\times 5", 10: "3 \\times 7", 12: "5 \\times 5" }[n]}$.` },
      { p: "Pour tout réel $x$, $\\sqrt{x^2} = x$.", ok: (x) => x < 0, cands: [-2, -3, -5, -1], faux: [0, 2, 4, 9], pourquoi: (x) => `$\\sqrt{(${nb(x)})^2} = \\sqrt{${x * x}} = ${nb(-x)} \\neq ${nb(x)}$.` },
      { p: "Pour tous réels $a$ et $b$, $(a + b)^2 = a^2 + b^2$.", ok: (c) => c === "ab", cands: ["ab"], faux: [], pourquoi: () => "", special: true },
      { p: "Pour tout entier $n$, $n^2 + n + 41$ est premier.", ok: (n) => n === 40 || n === 41, cands: [40, 41], faux: [0, 1, 2, 5], pourquoi: (n) => `$${n}^2 + ${n} + 41 = ${n * n + n + 41} = ${n === 40 ? "41 \\times 41" : "41 \\times 43"}$ n'est pas premier.` },
      { p: "Pour tout réel $x$, $\\dfrac{1}{x} < 1$.", ok: (x) => x > 0 && x <= 1, cands: [0.5, 0.25, 1, 0.1], faux: [2, 5, -1, -3], pourquoi: (x) => `$\\dfrac{1}{${nb(x)}} = ${nb(1 / x)}$, qui n'est pas strictement inférieur à $1$.` },
      { p: "Pour tout réel $x$, si $x^2 = 9$ alors $x = 3$.", ok: (x) => x === -3, cands: [-3], faux: [3, 9, 0, 1], pourquoi: () => "$(-3)^2 = 9$ et pourtant $-3 \\neq 3$." },
      { p: "Pour tout réel $x$, $x^3 \\geqslant 0$.", ok: (x) => x < 0, cands: [-1, -2, -0.5], faux: [0, 1, 2, 4], pourquoi: (x) => `$(${nb(x)})^3 = ${nb(x ** 3)} < 0$.` },
      { p: "Pour tout entier $n \\geqslant 1$, $\\dfrac{n}{2}$ est un entier.", ok: (n) => n % 2 === 1, cands: [1, 3, 5, 7], faux: [2, 4, 6, 8], pourquoi: (n) => `$\\dfrac{${n}}{2} = ${nb(n / 2)}$ n'est pas un entier.` }
    ]);
    if (P.special) {
      const ch = choix4("$a = 1$ et $b = 1$", ["$a = 0$ et $b = 3$", "$a = 2$ et $b = 0$", "$a = 0$ et $b = 0$"]);
      return { enonce: `Proposition : « ${P.p} » Quel choix de valeurs est un **contre-exemple** (il montre que la proposition est fausse) ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Un contre-exemple est un cas où la proposition est fausse.", "Calcule $(a + b)^2$ et $a^2 + b^2$ pour chaque choix.", "Avec $a = 1$ et $b = 1$ : $(1 + 1)^2 = 4$ et $1^2 + 1^2 = 2$."],
        solution: "Pour $a = 1$ et $b = 1$ : $(a + b)^2 = 4$ mais $a^2 + b^2 = 2$. Un seul contre-exemple suffit : la proposition est fausse.\n\nQuand $a = 0$ ou $b = 0$, les deux membres sont égaux : ces choix ne sont pas des contre-exemples." };
    }
    const bon = pick(P.cands), autres = shuffle(P.faux).slice(0, 3);
    const ch = choix4(`$${nb(bon)}$`, autres.map((v) => `$${nb(v)}$`));
    return { enonce: `Proposition : « ${P.p} » Laquelle de ces valeurs est un **contre-exemple** (elle montre que la proposition est fausse) ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Un contre-exemple est une valeur pour laquelle la proposition est fausse.", "Teste chaque valeur proposée dans la proposition.", `Essaie avec $${nb(bon)}$.`],
      solution: `Pour $${nb(bon)}$ : ${P.pourquoi(bon)} La proposition « pour tout… » est donc fausse : un seul contre-exemple suffit.\n\nLes autres valeurs vérifient la proposition : ce ne sont pas des contre-exemples.` };
  });

  // Implication, réciproque, contraposée
  const IMPL = [
    ["$x = 2$", "$x^2 = 4$", true, false], ["$x > 3$", "$x > 1$", true, false], ["$n$ est multiple de $6$", "$n$ est multiple de $3$", true, false], ["$ABCD$ est un carré", "$ABCD$ est un rectangle", true, false],
    ["$x = -1$", "$x^2 = 1$", true, false], ["$n$ est multiple de $10$", "$n$ est pair", true, false], ["$x < -2$", "$x^2 > 4$", true, false], ["$f$ est croissante sur $\\mathbb{R}$", "$f(1) \\leqslant f(2)$", true, false],
    ["$x \\geqslant 5$", "$x \\geqslant 2$", true, false], ["un triangle est équilatéral", "il est isocèle", true, false], ["$n$ est multiple de $4$", "$n$ est pair", true, false], ["$x = 0$", "$x^2 = 0$", true, true],
    ["$3x + 1 = 7$", "$x = 2$", true, true], ["$x^2 = 25$", "$x = 5$", false, false], ["$x^2 = 0$", "$x = 0$", true, true], ["$n$ est pair", "$n$ est multiple de $4$", false, false],
    ["$x > 10$", "$x > 0$", true, false], ["$n$ est multiple de $9$", "$n$ est multiple de $3$", true, false], ["$x = 4$", "$\\sqrt{x} = 2$", true, true], ["$x < 0$", "$x < 5$", true, false],
    ["$ABC$ est équilatéral", "$ABC$ a deux côtés égaux", true, false], ["$2x = 10$", "$x = 5$", true, true], ["$n$ est multiple de $15$", "$n$ est multiple de $5$", true, false], ["$x \\geqslant 1$", "$x^2 \\geqslant 1$", true, false],
    ["$x = -4$", "$x^2 = 16$", true, false], ["$t > 7$", "$t \\geqslant 7$", true, false], ["$u = 3$ et $v = 3$", "$u = v$", true, false], ["$n$ est multiple de $12$", "$n$ est multiple de $6$", true, false]
  ];
  def("ye-implication", () => {
    const [P, Q, vraie, equiv] = pick(IMPL), t = pick(["reciproque", "contraposee", "vraie", "reciproque", "contraposee"]);
    const imp = (a, b) => `si ${a}, alors ${b}`;
    const nonP = `non (${P})`, nonQ = `non (${Q})`;
    if (t === "vraie") {
      const L = [[imp(P, Q), vraie], [imp(Q, P), equiv], [imp(nonQ, nonP), vraie], [imp(nonP, nonQ), equiv]];
      const V = L.filter((l) => l[1]), F = L.filter((l) => !l[1]);
      if (V.length === 0 || F.length === 0) return GEN["ye-implication"]();
      const m = V.length === 1 ? "vraie" : F.length === 1 ? "fausse" : pick(["vraie", "fausse"]);
      const liste = m === "vraie" ? V : F;
      if (liste.length !== 1) return GEN["ye-implication"]();
      const ch = choix4(liste[0][0], L.filter((l) => l !== liste[0]).map((l) => l[0]));
      return { enonce: `Une seule de ces implications est **${m}**. Laquelle ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Une implication « si $P$, alors $Q$ » est fausse dès qu'on trouve un cas où $P$ est vraie et $Q$ fausse.", "La contraposée « si non $Q$, alors non $P$ » est toujours vraie en même temps que l'implication.", "La réciproque « si $Q$, alors $P$ » peut être fausse même si l'implication est vraie."],
        solution: `« ${liste[0][0]} » est ${m}.\n\n` + L.filter((l) => l !== liste[0]).map((l) => `- « ${l[0]} » est ${l[1] ? "vraie" : "fausse"}.`).join("\n") };
    }
    const bonne = t === "reciproque" ? imp(Q, P) : imp(nonQ, nonP);
    const ch = choix4(bonne, [t === "reciproque" ? imp(nonQ, nonP) : imp(Q, P), imp(nonP, nonQ), imp(P, Q), imp(P, nonQ)]);
    return { enonce: `On considère l'implication « ${imp(P, Q)} ». Quelle est sa **${t === "reciproque" ? "réciproque" : "contraposée"}** ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Réciproque de « si $P$, alors $Q$ » : « si $Q$, alors $P$ » (on échange).", "Contraposée : « si non $Q$, alors non $P$ » (on échange **et** on nie).", t === "reciproque" ? "Ici on échange les deux parties, sans rien nier." : "Ici on nie les deux parties et on les échange."],
      solution: `${t === "reciproque" ? "La réciproque échange hypothèse et conclusion" : "La contraposée échange hypothèse et conclusion en les niant"} : « ${bonne} ».${t === "contraposee" ? " Elle est vraie exactement quand l'implication de départ est vraie." : " Elle peut être vraie ou fausse indépendamment de l'implication de départ."}` };
  });

  def("ye-condition", () => {
    const [P, Q, vraie, equiv] = pick(IMPL.filter((l) => l[2]));
    const sens = pick([true, false]); // vrai : « P est une condition … pour Q » ; faux : « Q est une condition … pour P »
    const L = ["suffisante, mais pas nécessaire", "nécessaire, mais pas suffisante", "nécessaire et suffisante", "ni nécessaire ni suffisante"];
    const bonne = equiv ? L[2] : sens ? L[0] : L[1];
    const ch = choix4(bonne, L.filter((x) => x !== bonne));
    const [A, B] = sens ? [P, Q] : [Q, P];
    return { enonce: `On sait que « si ${P}, alors ${Q} » est vraie${equiv ? ", ainsi que sa réciproque" : ", mais sa réciproque est fausse"}. La condition « ${A} » est, pour avoir « ${B} », une condition :`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Si « $P \\Rightarrow Q$ » est vraie : $P$ est une condition **suffisante** pour $Q$ (il suffit d'avoir $P$) et $Q$ est une condition **nécessaire** pour $P$ (on ne peut pas avoir $P$ sans $Q$).", "Si l'implication et sa réciproque sont vraies, la condition est nécessaire et suffisante (équivalence).", sens ? `Ici, ${A} entraîne ${B}.` : `Ici, c'est ${B} qui entraîne ${A}, pas l'inverse.`],
      solution: equiv ? `Les deux implications sont vraies : « ${A} » et « ${B} » sont équivalentes, la condition est nécessaire et suffisante.` : sens ? `« ${P} » entraîne « ${Q} » : il **suffit** d'avoir « ${P} ». Mais la réciproque est fausse : ce n'est pas nécessaire (on peut avoir « ${Q} » sans « ${P} »).` : `Comme « ${P} » entraîne « ${Q} », on ne peut pas avoir « ${P} » sans « ${Q} » : « ${Q} » est **nécessaire**. Mais elle ne suffit pas, la réciproque étant fausse.` };
  });

  def("ye-statut", () => {
    const t = pick(["identite", "equation", "lettres", "lettres"]);
    if (t === "lettres") {
      const L = pick([
        ["$f(x) = 3x + m$ où $m$ est un nombre fixé mais non précisé", "$m$", "un paramètre", "On fait varier $x$ ; $m$ est fixé pour toute l'étude : c'est un paramètre."],
        ["$f(x) = 3x + m$ où $m$ est un nombre fixé mais non précisé", "$x$", "une variable", "On calcule $f(x)$ pour toutes les valeurs de $x$ : c'est la variable de la fonction."],
        ["résoudre $5t - 2 = 13$", "$t$", "une inconnue", "On cherche la ou les valeurs de $t$ qui rendent l'égalité vraie : c'est une inconnue."],
        ["$(a + b)^2 = a^2 + 2ab + b^2$ pour tous réels $a$ et $b$", "$a$", "une indéterminée", "L'égalité est vraie quelles que soient les valeurs : les lettres sont des indéterminées (identité)."],
        ["la suite $u(n) = 2n + 1$", "$n$", "une variable", "Le rang $n$ prend toutes les valeurs entières : c'est une variable."],
        ["$P = 2\\pi r$ pour calculer un périmètre", "$r$", "une variable", "On remplace $r$ par le rayon voulu : c'est la variable de la formule."],
        ["résoudre $x^2 = 16$", "$x$", "une inconnue", "On cherche les valeurs de $x$ : $4$ et $-4$."],
        ["$g(x) = ax^2$ avec $a > 0$ fixé", "$a$", "un paramètre", "$a$ est fixé pendant l'étude, seul $x$ varie : $a$ est un paramètre."]
      ]);
      const ch = choix4(L[2], ["une variable", "une inconnue", "un paramètre", "une indéterminée"].filter((x) => x !== L[2]));
      return { enonce: `Dans « ${L[0]} », quel est le statut de la lettre ${L[1]} ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Inconnue : on cherche sa valeur (équation). Variable : elle parcourt un ensemble de valeurs (fonction, suite, formule).", "Paramètre : fixé mais non précisé, il ne varie pas pendant l'étude. Indéterminée : dans une identité vraie pour toutes les valeurs.", L[3]],
        solution: `${L[3]}` };
    }
    const a = rand(2, 9), b = rand(1, 9), c = rand(1, 9);
    const identites = [`(x + ${b})^2 = x^2 + ${2 * b}x + ${b * b}`, `${a}(x + ${b}) = ${a}x + ${a * b}`, `(x - ${b})(x + ${b}) = x^2 - ${b * b}`, `${a}x + ${coef(b, "x")} = ${a + b}x`, `x^2 - ${2 * b}x + ${b * b} = (x - ${b})^2`];
    const equations = [`${a}x + ${b} = ${c}`, `x^2 = ${b * b}`, `(x + ${b})^2 = ${c}`, `${a}x = ${coef(b, "x")} + ${c}`, `x^2 + ${b} = ${a}x`];
    const bonne = t === "identite" ? pick(identites) : pick(equations), autres = shuffle(t === "identite" ? equations : identites).slice(0, 3);
    const ch = choix4(`$${bonne}$`, autres.map((s) => `$${s}$`));
    return { enonce: `Parmi ces égalités, laquelle est une **${t === "identite" ? "identité" : "équation"}** ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Une identité est vraie pour **toutes** les valeurs de la lettre (développement, factorisation…).", "Une équation n'est vraie que pour certaines valeurs : on la résout.", "Teste avec deux valeurs de $x$ : une identité reste vraie, une équation non."],
      solution: t === "identite" ? `$${bonne}$ est vraie pour tout $x$ (c'est un développement ou une factorisation) : c'est une identité. Les trois autres ne sont vraies que pour certaines valeurs de $x$ : ce sont des équations.` : `$${bonne}$ n'est vraie que pour certaines valeurs de $x$ : c'est une équation à résoudre. Les trois autres égalités sont vraies pour tout $x$ : ce sont des identités.` };
  });

  def("ye-vrai-faux", () => vraiFaux4([
    ["$-3 \\in \\mathbb{Z}$.", true, "$-3$ est un entier relatif."],
    ["$\\mathbb{N} \\subset \\mathbb{R}$.", true, "tout entier naturel est un réel."],
    ["$\\dfrac{1}{3} \\notin \\mathbb{D}$.", true, "son écriture décimale $0{,}333\\dots$ est illimitée."],
    ["$[2\\,;5] \\cap [4\\,;8] = [4\\,;5]$.", true, "les nombres communs sont ceux entre $4$ et $5$."],
    ["$[2\\,;5] \\cup [4\\,;8] = [2\\,;8]$.", true, "les deux intervalles se chevauchent et couvrent de $2$ à $8$."],
    ["Si $x \\in ]1\\,;4]$, alors $x \\neq 1$.", true, "la borne $1$ est exclue."],
    ["Un ensemble à $3$ éléments et un ensemble à $4$ éléments donnent un produit cartésien à $12$ couples.", true, "$3 \\times 4 = 12$."],
    ["La contraposée de « si $x = 2$, alors $x^2 = 4$ » est « si $x^2 \\neq 4$, alors $x \\neq 2$ ».", true, "on nie et on échange."],
    ["« $x > 5$ » est une condition suffisante pour « $x > 2$ ».", true, "si $x > 5$, alors forcément $x > 2$."],
    ["$\\sqrt{2} \\in \\mathbb{Q}$.", false, "$\\sqrt{2}$ est irrationnel."],
    ["$0 \\in ]0\\,;3]$.", false, "la borne $0$ est exclue (crochet tourné vers l'extérieur)."],
    ["$\\varnothing$ contient l'élément $0$.", false, "l'ensemble vide n'a aucun élément."],
    ["La réciproque de « si $x = 2$, alors $x^2 = 4$ » est vraie.", false, "$x^2 = 4$ a aussi la solution $-2$."],
    ["Si « $P$ ou $Q$ » est vraie, alors $P$ et $Q$ sont vraies toutes les deux.", false, "il suffit que l'une des deux soit vraie."],
    ["Pour démontrer qu'une propriété « pour tout $n$ » est vraie, il suffit de la vérifier pour $n = 1$, $2$ et $3$.", false, "des exemples ne prouvent pas une propriété universelle ; un contre-exemple suffit en revanche à la réfuter."],
    ["$[1\\,;3] \\cap [5\\,;7] = [3\\,;5]$.", false, "les deux intervalles n'ont aucun élément commun : l'intersection est vide."]
  ], ["Relis les définitions : appartenance, inclusion, intersection, réunion.", "Pour une implication, cherche un contre-exemple à sa réciproque.", "Un crochet tourné vers l'extérieur exclut la borne."]));

  /* Figures du cours (chapitre 1) */
  FIGURES["ye-cours-ensembles"] = () => {
    const W = 320, H = 210;
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="Ensembles de nombres emboîtés : N dans Z dans D dans Q dans R">`;
    const E = [["ℝ", 150, 100, "√2, π"], ["ℚ", 122, 82, "1/3, −2/7"], ["𝔻", 96, 66, "0,5 ; −3,25"], ["ℤ", 70, 50, "−3, −12"], ["ℕ", 44, 34, "0, 1, 2, 7"]];
    E.forEach(([n, rx, ry, ex], k) => { s += `<ellipse cx="${160 + (150 - rx) * 0.9}" cy="105" rx="${rx}" ry="${ry}" style="fill:var(--lagon);fill-opacity:0.07;stroke:var(--lagon);stroke-width:1.5"/>`; });
    E.forEach(([n, rx, ry, ex], k) => { const cx = 160 + (150 - rx) * 0.9; s += `<text class="g-label" x="${cx - rx + 8}" y="${k === 4 ? 110 : 105 - ry + 16}" style="font-weight:700;font-size:13px">${n}</text><text class="g-label" x="${cx - rx + 8}" y="${k === 4 ? 124 : 105 - ry + 30}" style="font-size:10px">${ex}</text>`; });
    return s + `</svg>`;
  };
  FIGURES["ye-cours-venn"] = () => venn({ a: "A seul", ab: "A ∩ B", b: "B seul", hors: "ni A ni B", aria: "Deux disques A et B dans un rectangle E : zones A seul, A inter B, B seul, et en dehors des deux" });
  FIGURES["ye-cours-intervalles"] = () => graphePlus({ xmin: -1.6, xmax: 6.6, ymin: -0.6, ymax: 2.6, h: 200, padB: 18, aria: "Sur une droite graduée : I = [1 ; 4] en haut, J = ]2 ; 6[ en dessous, I inter J = ]2 ; 4] en bas" }, (X, Y) => {
    const seg = (a, b, y, ga, gb, c, nom) => `<line x1="${X(a)}" y1="${Y(y)}" x2="${X(b)}" y2="${Y(y)}" style="stroke:${c};stroke-width:4"/><text class="g-label" x="${X(a) - 6}" y="${Y(y) + 4}" text-anchor="end" style="fill:${c};font-weight:700">${nom}</text><text class="g-label" x="${X(a)}" y="${Y(y) + 5}" text-anchor="middle" style="fill:${c};font-weight:700;font-size:15px">${ga ? "[" : "]"}</text><text class="g-label" x="${X(b)}" y="${Y(y) + 5}" text-anchor="middle" style="fill:${c};font-weight:700;font-size:15px">${gb ? "]" : "["}</text>`;
    return seg(1, 4, 2, true, true, "var(--lagon)", "I") + seg(2, 6, 1.2, false, false, "var(--ylang)", "J") + seg(2, 4, 0.4, false, true, "var(--faux)", "I ∩ J");
  });
  FIGURES["ye-cours-produit"] = () => {
    const A = ["a", "b", "c"], B = [1, 2], W = 320, H = 150;
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="Tableau des 6 couples de A × B avec A = {a ; b ; c} et B = {1 ; 2}">`;
    const x0 = 70, y0 = 30, c = 70, r = 36;
    s += `<text class="g-label" x="${x0 - 8}" y="${y0 - 10}" text-anchor="end" style="font-weight:700">A \\ B</text>`;
    B.forEach((b, j) => { s += `<text class="g-label" x="${x0 + j * c + c / 2}" y="${y0 - 10}" text-anchor="middle" style="font-weight:700;fill:var(--ylang)">${b}</text>`; });
    A.forEach((a, i) => { s += `<text class="g-label" x="${x0 - 8}" y="${y0 + i * r + 22}" text-anchor="end" style="font-weight:700;fill:var(--lagon)">${a}</text>`; B.forEach((b, j) => { s += `<rect x="${x0 + j * c}" y="${y0 + i * r}" width="${c}" height="${r}" style="fill:var(--surface);stroke:var(--doux);stroke-width:1"/><text class="g-label" x="${x0 + j * c + c / 2}" y="${y0 + i * r + 22}" text-anchor="middle">(${a} ; ${b})</text>`; }); });
    s += `<text class="g-label" x="${x0 + 2 * c + 10}" y="${y0 + 60}" style="fill:var(--lagon)">3 × 2 = 6</text><text class="g-label" x="${x0 + 2 * c + 10}" y="${y0 + 76}" style="fill:var(--lagon)">couples</text>`;
    return s + `</svg>`;
  };
  FIGURES["ye-cours-implication"] = () => {
    const W = 320, H = 150;
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="Les carrés sont inclus dans les rectangles : être un carré implique être un rectangle, la réciproque est fausse">`;
    s += `<ellipse cx="160" cy="80" rx="140" ry="58" style="fill:var(--ylang);fill-opacity:0.12;stroke:var(--ylang);stroke-width:1.6"/><ellipse cx="120" cy="86" rx="68" ry="36" style="fill:var(--lagon);fill-opacity:0.15;stroke:var(--lagon);stroke-width:1.6"/>`;
    s += `<text class="g-label" x="120" y="82" text-anchor="middle" style="font-weight:700;fill:var(--lagon)">carrés</text><text class="g-label" x="120" y="98" text-anchor="middle" style="font-size:10px">(P)</text><text class="g-label" x="240" y="52" text-anchor="middle" style="font-weight:700;fill:var(--ylang)">rectangles</text><text class="g-label" x="240" y="68" text-anchor="middle" style="font-size:10px">(Q)</text>`;
    s += `<text class="g-label" x="160" y="140" text-anchor="middle">P ⟹ Q : carré ⟹ rectangle (vrai) ; Q ⟹ P faux</text>`;
    return s + `</svg>`;
  };

})();
