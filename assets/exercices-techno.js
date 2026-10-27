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
  const fx = (a) => (a === 1 ? "" : a === -1 ? "-" : nb(a)); // coefficient devant une parenthèse
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
      s += `<line x1="${x0}" y1="${yc}" x2="${x1}" y2="${yA(k)}" style="stroke:var(--encre);stroke-width:1.4"/>` + lab((x0 + x1) / 2 - 6, (yc + yA(k)) / 2 + (yA(k) < yc ? -4 : 12), p, true) + `<text class="g-label" x="${x1 + 8}" y="${yA(k) + 4}" style="font-weight:700">${nomEv(nom)}</text>`;
      (o.n2[k] || []).forEach(([nom2, p2], j) => {
        const y = yB(k, j);
        s += `<line x1="${x1 + 30}" y1="${yA(k)}" x2="${x2}" y2="${y}" style="stroke:var(--encre);stroke-width:1.4"/>` + lab((x1 + 30 + x2) / 2, (yA(k) + y) / 2 + (j === 0 ? -4 : 12), p2, true) + `<text class="g-label" x="${x2 + 8}" y="${y + 4}" style="font-weight:700">${nomEv(nom2)}</text>`;
      });
    });
    return s + `</svg>`;
  }
  const nomEv = (t) => (String(t).endsWith("̄") ? `<tspan style="text-decoration:overline">${String(t).slice(0, -1)}</tspan>` : t); // « M̄ » écrit avec une vraie barre
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
    const W = 320, H = 200;
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="Ensembles de nombres emboîtés : N dans Z dans D dans Q dans R, avec des exemples">`;
    const E = [["ℝ", "√2", "π"], ["ℚ", "1/3", "−2/7"], ["D", "0,5", "−3,25"], ["ℤ", "−3", "−12"], ["ℕ", "0", "7"]];
    E.forEach(([n, e1, e2], k) => {
      const x = 6 + 56 * k, y = 6 + 12 * k, w = W - 12 - 64 * k, h = H - 12 - 24 * k;
      s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" style="fill:var(--lagon);fill-opacity:0.07;stroke:var(--lagon);stroke-width:1.5"/>`;
      s += `<text class="g-label" x="${x + 8}" y="${y + 22}" style="font-weight:700;font-size:14px">${n}</text><text class="g-label" x="${x + 8}" y="${y + 40}" style="font-size:10px">${e1}</text><text class="g-label" x="${x + 8}" y="${y + 54}" style="font-size:10px">${e2}</text>`;
    });
    return s + `</svg>`;
  };
  FIGURES["ye-cours-venn"] = () => venn({ a: "A seul", ab: "A ∩ B", b: "B seul", hors: "ni A ni B", aria: "Deux disques A et B dans un rectangle E : zones A seul, A inter B, B seul, et en dehors des deux" });
  FIGURES["ye-cours-intervalles"] = () => graphePlus({ xmin: -1.6, xmax: 6.6, ymin: -0.6, ymax: 2.6, ystep: 10, yetiq: 100, h: 200, padB: 18, aria: "Sur une droite graduée : I = [1 ; 4] en haut, J = ]2 ; 6[ en dessous, I inter J = ]2 ; 4] en bas" }, (X, Y) => {
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
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H + 24}" role="img" aria-label="Les carrés sont inclus dans les rectangles : être un carré implique être un rectangle, la réciproque est fausse">`;
    s += `<ellipse cx="160" cy="80" rx="140" ry="58" style="fill:var(--ylang);fill-opacity:0.12;stroke:var(--ylang);stroke-width:1.6"/><ellipse cx="120" cy="86" rx="68" ry="36" style="fill:var(--lagon);fill-opacity:0.15;stroke:var(--lagon);stroke-width:1.6"/>`;
    s += `<text class="g-label" x="120" y="82" text-anchor="middle" style="font-weight:700;fill:var(--lagon)">carrés</text><text class="g-label" x="120" y="98" text-anchor="middle" style="font-size:10px">(P)</text><text class="g-label" x="240" y="52" text-anchor="middle" style="font-weight:700;fill:var(--ylang)">rectangles</text><text class="g-label" x="240" y="68" text-anchor="middle" style="font-size:10px">(Q)</text>`;
    s += `<text class="g-label" x="160" y="162" text-anchor="middle">P ⟹ Q : carré ⟹ rectangle (vrai) ; Q ⟹ P faux</text>`;
    return s + `</svg>`;
  };

  /* ---------- Chapitre 2 : Python, fonctions et listes (préfixe yl) ---------- */
  const tt = (s) => `$\\texttt{${s}}$`;
  const lst = (L) => `[${L.join(", ")}]`;

  def("yl-affectation", () => {
    const t = pick(["suite", "suite", "echange", "accumule"]);
    if (t === "echange") {
      const a = rand(1, 9), b = rand(10, 20);
      const code = `a = ${a}\nb = ${b}\nc = a\na = b\nb = c`;
      const quoi = pick(["a", "b"]), att = quoi === "a" ? b : a;
      return { enonce: `On exécute ce programme :\n\n${py(code)}\n\nQuelle est la valeur de ${tt(quoi)} à la fin ?`, mode: "nombre", prefixe: `${tt(quoi)} $=$`, attendu: att,
        erreurs: [{ valeur: quoi === "a" ? a : b, message: "Les deux variables ont été échangées grâce à la variable intermédiaire $\\texttt{c}$." }],
        aides: ["Exécute les instructions une par une, de haut en bas, en notant la valeur de chaque variable.", `Après $\\texttt{c = a}$, $\\texttt{c}$ vaut $${a}$.`, "Puis $\\texttt{a}$ prend la valeur de $\\texttt{b}$, et $\\texttt{b}$ prend l'ancienne valeur de $\\texttt{a}$ gardée dans $\\texttt{c}$."],
        solution: `Ligne par ligne : $\\texttt{a} = ${a}$, $\\texttt{b} = ${b}$, $\\texttt{c} = ${a}$, puis $\\texttt{a} = ${b}$, puis $\\texttt{b} = ${a}$.\n\nÀ la fin, $\\texttt{a} = ${b}$ et $\\texttt{b} = ${a}$ : les valeurs ont été échangées.` };
    }
    if (t === "accumule") {
      const s0 = rand(0, 5), k = rand(2, 5), n = rand(3, 5);
      const code = `s = ${s0}\nfor i in range(${n}):\n    s = s + ${k}`;
      return { enonce: `On exécute ce programme :\n\n${py(code)}\n\nQuelle est la valeur de ${tt("s")} à la fin ?`, mode: "nombre", prefixe: `${tt("s")} $=$`, attendu: s0 + k * n,
        erreurs: [{ valeur: s0 + k * (n - 1), message: `$\\texttt{range(${n})}$ fait $${n}$ tours (de $0$ à $${n - 1}$).` }, { valeur: s0 + k * (n + 1), message: `$\\texttt{range(${n})}$ fait exactement $${n}$ tours.` }, { valeur: s0 + k, message: "L'instruction est répétée à chaque tour de boucle." }],
        aides: [`$\\texttt{range(${n})}$ donne les valeurs $0$, $1$, …, $${n - 1}$ : la boucle fait $${n}$ tours.`, `À chaque tour, $\\texttt{s}$ augmente de $${k}$ (c'est un accumulateur).`, `Départ $${s0}$, puis $${n}$ fois $+${k}$.`],
        solution: `La boucle fait $${n}$ tours et ajoute $${k}$ à chaque fois : $\\texttt{s} = ${s0} + ${n} \\times ${k} = ${s0 + k * n}$.` };
    }
    const a = rand(2, 9), b = rand(1, 6), c = rand(2, 4);
    const code = `a = ${a}\nb = a + ${b}\na = a * ${c}\nb = b - a`;
    const quoi = pick(["a", "b"]), va = a * c, vb = a + b - a * c, att = quoi === "a" ? va : vb;
    return { enonce: `On exécute ce programme :\n\n${py(code)}\n\nQuelle est la valeur de ${tt(quoi)} à la fin ?`, mode: "nombre", prefixe: `${tt(quoi)} $=$`, attendu: att,
      erreurs: [{ valeur: quoi === "a" ? a : a + b, message: "La variable a été modifiée par une instruction plus bas : relis jusqu'à la fin." }, { valeur: quoi === "b" ? a + b - a : va, message: "Dans $\\texttt{b = b - a}$, on utilise la **nouvelle** valeur de $\\texttt{a}$." }],
      aides: ["Le signe $=$ est une affectation : la variable de gauche reçoit la valeur calculée à droite.", `Après la ligne 2, $\\texttt{b} = ${a + b}$ ; après la ligne 3, $\\texttt{a} = ${va}$.`, `La dernière ligne utilise la nouvelle valeur de $\\texttt{a}$ : $\\texttt{b} = ${a + b} - ${va}$.`],
      solution: `Ligne 1 : $\\texttt{a} = ${a}$. Ligne 2 : $\\texttt{b} = ${a} + ${b} = ${a + b}$. Ligne 3 : $\\texttt{a} = ${a} \\times ${c} = ${va}$. Ligne 4 : $\\texttt{b} = ${a + b} - ${va} = ${vb}$.\n\nDonc $\\texttt{${quoi}} = ${nb(att)}$.` };
  });

  def("yl-compteur", () => {
    const t = pick(["somme", "produit", "compteur", "compteur"]);
    const n = rand(4, 8);
    if (t === "somme") {
      const d = rand(1, 3), code = `s = 0\nfor k in range(${d}, ${n + 1}):\n    s = s + k\nprint(s)`;
      let att = 0; for (let k = d; k <= n; k++) att += k;
      return { enonce: `Qu'affiche ce programme ?\n\n${py(code)}`, mode: "nombre", prefixe: "Affichage :", attendu: att,
        erreurs: [{ valeur: att + n + 1, message: `$\\texttt{range(${d}, ${n + 1})}$ s'arrête à $${n}$ : la borne $${n + 1}$ est exclue.` }, { valeur: att - n, message: `$\\texttt{range(${d}, ${n + 1})}$ va jusqu'à $${n}$ compris.` }],
        aides: [`$\\texttt{range(${d}, ${n + 1})}$ donne $${d}$, $${d + 1}$, …, $${n}$ (la dernière valeur est exclue).`, "$\\texttt{s}$ est un accumulateur : à chaque tour on lui ajoute $\\texttt{k}$.", `Calcule $${Array.from({ length: n - d + 1 }, (_, i) => d + i).join(" + ")}$.`],
        solution: `La boucle ajoute à $\\texttt{s}$ les entiers de $${d}$ à $${n}$ : $${Array.from({ length: n - d + 1 }, (_, i) => d + i).join(" + ")} = ${att}$.` };
    }
    if (t === "produit") {
      const m = rand(3, 5), q = rand(2, 3), code = `p = 1\nfor k in range(${m}):\n    p = p * ${q}\nprint(p)`;
      return { enonce: `Qu'affiche ce programme ?\n\n${py(code)}`, mode: "nombre", prefixe: "Affichage :", attendu: q ** m,
        erreurs: [{ valeur: q * m, message: "On multiplie par $" + q + "$ à chaque tour : ce n'est pas une addition." }, { valeur: q ** (m - 1), message: `$\\texttt{range(${m})}$ fait $${m}$ tours.` }, { valeur: q ** (m + 1), message: `$\\texttt{range(${m})}$ fait exactement $${m}$ tours, de $0$ à $${m - 1}$.` }],
        aides: [`La boucle fait $${m}$ tours.`, `$\\texttt{p}$ part de $1$ et est multiplié par $${q}$ à chaque tour.`, `$1 \\times ${Array(m).fill(q).join(" \\times ")}$.`],
        solution: `$\\texttt{p}$ est multiplié $${m}$ fois par $${q}$ : $\\texttt{p} = ${q}^{${m}} = ${q ** m}$.` };
    }
    const L = Array.from({ length: rand(6, 9) }, () => rand(1, 20)), seuil = rand(5, 15), sens = pick([">", "<", ">=", "<="]);
    const code = `L = ${lst(L)}\nc = 0\nfor x in L:\n    if x ${sens} ${seuil}:\n        c = c + 1\nprint(c)`;
    const ok = (x) => (sens === ">" ? x > seuil : sens === "<" ? x < seuil : sens === ">=" ? x >= seuil : x <= seuil);
    const att = L.filter(ok).length;
    return { enonce: `Qu'affiche ce programme ?\n\n${py(code)}`, mode: "nombre", prefixe: "Affichage :", attendu: att,
      erreurs: [{ valeur: L.length - att, message: `On compte les valeurs qui vérifient $x ${sens.replace(">=", "\\geqslant").replace("<=", "\\leqslant")} ${seuil}$, pas les autres.` }, { valeur: L.filter(ok).reduce((s, v) => s + v, 0), message: "$\\texttt{c}$ est un compteur : il augmente de $1$, pas de $\\texttt{x}$." }, { valeur: L.length, message: "Seules les valeurs qui vérifient la condition sont comptées." }],
      aides: ["$\\texttt{c}$ est un compteur : il augmente de $1$ chaque fois que la condition est vraie.", `La condition : $x ${sens.replace(">=", "\\geqslant").replace("<=", "\\leqslant")} ${seuil}$.`, `Les valeurs qui conviennent : $${L.filter(ok).join("$, $") || "\\text{aucune}"}$.`],
      solution: `La boucle parcourt la liste et compte les valeurs qui vérifient $x ${sens.replace(">=", "\\geqslant").replace("<=", "\\leqslant")} ${seuil}$ : ${att ? `$${L.filter(ok).join("$, $")}$` : "aucune"}. Le programme affiche $${att}$.` };
  });

  def("yl-fonction", () => {
    const t = pick(["appel", "appel", "deux", "choisir"]);
    if (t === "choisir") {
      const a = rand(2, 6), b = rand(1, 9);
      const bonne = `def f(x):\n    return ${a} * x + ${b}`;
      const ch = choix4(py(bonne), [py(`def f(x):\n    return ${a} * x - ${b}`), py(`def f(x):\n    return ${a} * (x + ${b})`), py(`def f(x):\n    print(${a} * x + ${b})`), py(`def f(x):\n    return x ** ${a} + ${b}`)]);
      return { enonce: `Quelle fonction Python renvoie l'image de $x$ par $f(x) = ${aff(a, b)}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["$\\texttt{def f(x):}$ définit une fonction dont l'entrée est $\\texttt{x}$.", "$\\texttt{return}$ renvoie la sortie ; $\\texttt{print}$ ne fait qu'afficher.", `L'expression doit être $${a} \\times x + ${b}$, écrite $\\texttt{${a} * x + ${b}}$.`],
        solution: `La fonction reçoit $\\texttt{x}$ en entrée et doit **renvoyer** $${aff(a, b)}$ avec $\\texttt{return}$ : c'est $\\texttt{return ${a} * x + ${b}}$. Les autres propositions changent la formule ou affichent sans renvoyer.` };
    }
    if (t === "deux") {
      const p = rand(2, 9), q = rand(1, 9), code = `def g(a, b):\n    return a * b - ${q}`;
      const x = rand(2, 7), y = rand(2, 7), att = x * y - q;
      return { enonce: `On définit :\n\n${py(code)}\n\nQue vaut ${tt(`g(${x}, ${y})`)} ?`, mode: "nombre", prefixe: `${tt(`g(${x}, ${y})`)} $=$`, attendu: att,
        erreurs: [{ valeur: x + y - q, message: "$\\texttt{a * b}$ est un produit." }, { valeur: x * y + q, message: `On retire $${q}$.` }],
        aides: ["Les entrées sont $\\texttt{a}$ et $\\texttt{b}$, dans cet ordre.", `Ici $\\texttt{a} = ${x}$ et $\\texttt{b} = ${y}$.`, `Calcule $${x} \\times ${y} - ${q}$.`],
        solution: `$\\texttt{g(${x}, ${y})}$ remplace $\\texttt{a}$ par $${x}$ et $\\texttt{b}$ par $${y}$ : $${x} \\times ${y} - ${q} = ${att}$.` };
    }
    const a = rand(2, 6), b = rand(-9, 9) || 4, x = rand(-4, 6), k = pick([1, 1, 2]);
    const code = k === 1 ? `def f(x):\n    return ${a} * x ${b < 0 ? "-" : "+"} ${Math.abs(b)}` : `def f(x):\n    return x ** 2 ${b < 0 ? "-" : "+"} ${Math.abs(b)} * x`;
    const att = k === 1 ? a * x + b : x * x + b * x;
    return { enonce: `On définit :\n\n${py(code)}\n\nQue vaut ${tt(`f(${x})`)} ?`, mode: "nombre", prefixe: `${tt(`f(${x})`)} $=$`, attendu: att,
      erreurs: [{ valeur: k === 1 ? a * x - b : x * x - b * x, message: "Attention au signe." }, { valeur: k === 1 ? a + x + b : 2 * x + b * x, message: k === 1 ? "$\\texttt{*}$ est une multiplication." : "$\\texttt{x ** 2}$ est le carré de $x$." }],
      aides: ["$\\texttt{f(" + x + ")}$ : on remplace $\\texttt{x}$ par $" + nb(x) + "$ dans le $\\texttt{return}$.", k === 1 ? "$\\texttt{*}$ est la multiplication." : "$\\texttt{**}$ est la puissance : $\\texttt{x ** 2}$ est $x^2$.", `Calcule ${k === 1 ? `$${a} \\times ${pr(x)} ${plus(b)}$` : `$${pr(x)}^2 ${plus(b)} \\times ${pr(x)}$`}.`],
      solution: `$\\texttt{f(${x})} = ${k === 1 ? `${a} \\times ${pr(x)} ${plus(b)}` : `${pr(x)}^2 ${plus(b)} \\times ${pr(x)}`} = ${nb(att)}$.` };
  });

  def("yl-indice", () => {
    const L = Array.from({ length: rand(5, 8) }, () => rand(1, 30));
    const t = pick(["ind", "ind", "neg", "len", "sum", "modif"]);
    const fig = listePy(L);
    if (t === "len") return { enonce: `On pose $\\texttt{L = ${lst(L)}}$. Que vaut ${tt("len(L)")} ?`, figure: fig, mode: "nombre", prefixe: `${tt("len(L)")} $=$`, attendu: L.length,
      erreurs: [{ valeur: L.length - 1, message: "$\\texttt{len}$ compte les éléments, pas le dernier indice." }, { valeur: L[L.length - 1], message: "$\\texttt{len(L)}$ est le **nombre** d'éléments de la liste." }],
      aides: ["$\\texttt{len(L)}$ est la longueur de la liste : son nombre d'éléments.", "Compte les éléments entre les crochets.", `Il y en a $${L.length}$.`], solution: `La liste a $${L.length}$ éléments : $\\texttt{len(L)} = ${L.length}$. Le dernier indice est $${L.length - 1}$.` };
    if (t === "sum") { const s = L.reduce((a, v) => a + v, 0); return { enonce: `On pose $\\texttt{L = ${lst(L)}}$. Que vaut ${tt("sum(L)")} ?`, figure: fig, mode: "nombre", prefixe: `${tt("sum(L)")} $=$`, attendu: s,
      erreurs: [{ valeur: L.length, message: "$\\texttt{sum}$ additionne les éléments ; $\\texttt{len}$ les compte." }], aides: ["$\\texttt{sum(L)}$ est la somme de tous les éléments.", `Additionne $${L.join(" + ")}$.`, "Vérifie ton calcul en regroupant les nombres."], solution: `$\\texttt{sum(L)} = ${L.join(" + ")} = ${s}$.` }; }
    if (t === "modif") {
      const k = rand(0, L.length - 1), v = rand(1, 30), M = L.slice(); M[k] = v;
      const ch = choix4(tt(lst(M)), [tt(lst(L.map((x, i) => (i === k + 1 && k + 1 < L.length ? v : x)))), tt(lst(L.map((x, i) => (i === k - 1 && k > 0 ? v : x)))), tt(lst(L.concat([v]))), tt(lst(L.map((x, i) => (i === k ? x + v : x))))]);
      return { enonce: `On pose $\\texttt{L = ${lst(L)}}$ puis on exécute $\\texttt{L[${k}] = ${v}}$. Que vaut $\\texttt{L}$ ensuite ?`, figure: fig, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["$\\texttt{L[k] = v}$ remplace l'élément d'indice $\\texttt{k}$ par $\\texttt{v}$.", "Les indices commencent à $0$ : $\\texttt{L[0]}$ est le premier élément.", `L'élément d'indice $${k}$ est $${L[k]}$ : il devient $${v}$.`],
        solution: `L'élément d'indice $${k}$ (le ${k + 1}${k === 0 ? "er" : "e"}, car on compte à partir de $0$) est remplacé par $${v}$ : $\\texttt{L = ${lst(M)}}$.` };
    }
    const k = t === "neg" ? -rand(1, 3) : rand(0, L.length - 1), att = L[(k + L.length) % L.length];
    return { enonce: `On pose $\\texttt{L = ${lst(L)}}$. Que vaut ${tt(`L[${k}]`)} ?`, figure: fig, mode: "nombre", prefixe: `${tt(`L[${k}]`)} $=$`, attendu: att,
      erreurs: [{ valeur: k >= 0 ? L[Math.min(k + 1, L.length - 1)] : L[L.length + k - 1] !== undefined ? L[L.length + k - 1] : -1, message: k >= 0 ? "Les indices commencent à $0$ : $\\texttt{L[0]}$ est le premier élément." : "$\\texttt{L[-1]}$ est le dernier élément, $\\texttt{L[-2]}$ l'avant-dernier…" }, { valeur: k >= 0 && k > 0 ? L[k - 1] : L[0], message: k >= 0 ? "Compte à partir de $0$, pas de $1$." : "Un indice négatif compte à partir de la fin." }],
      aides: ["Les indices commencent à $0$ : $\\texttt{L[0]}$ est le premier élément, $\\texttt{L[1]}$ le deuxième…", "Un indice négatif part de la fin : $\\texttt{L[-1]}$ est le dernier.", k >= 0 ? `$\\texttt{L[${k}]}$ est le ${k + 1}${k === 0 ? "er" : "e"} élément.` : `$\\texttt{L[${k}]}$ est le ${-k === 1 ? "dernier" : -k === 2 ? "avant-dernier" : "3e en partant de la fin"}.`],
      solution: k >= 0 ? `En comptant à partir de $0$, l'élément d'indice $${k}$ est $${att}$.` : `$\\texttt{L[${k}]}$ compte depuis la fin : c'est $${att}$ (indice $${L.length + k}$ en comptant depuis le début).` };
  });

  def("yl-comprehension", () => {
    const t = pick(["res", "res", "res", "code", "cond"]);
    const a = rand(1, 4), b = rand(0, 5), n = rand(4, 6);
    if (t === "code") {
      const L = Array.from({ length: n }, (_, k) => a * k + b);
      const bonne = tt(`[${a === 1 ? "" : a + " * "}n${b ? " + " + b : ""} for n in range(${n})]`);
      const ch = choix4(bonne, [tt(`[${a === 1 ? "" : a + " * "}n${b ? " + " + b : ""} for n in range(${n + 1})]`), tt(`[${a === 1 ? "" : a + " * "}n${b ? " + " + b : ""} for n in range(1, ${n})]`), tt(`[${a}${b ? " + " + b : ""} * n for n in range(${n})]`), tt(`[n${b ? " + " + b : ""} for n in range(${n})]`)]);
      return { enonce: `Quelle liste en compréhension donne $\\texttt{${lst(L)}}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["$\\texttt{[expression for n in range(N)]}$ calcule l'expression pour $n = 0, 1, \\dots, N - 1$.", `Ici il y a $${n}$ éléments, donc $\\texttt{range(${n})}$.`, `Pour $n = 0$ on obtient $${b}$, pour $n = 1$ on obtient $${a + b}$ : l'expression est $${a === 1 ? "n" : a + "n"}${b ? " + " + b : ""}$.`],
        solution: `Les éléments sont $${a === 1 ? "n" : a + "n"}${b ? " + " + b : ""}$ pour $n$ de $0$ à $${n - 1}$ : ${bonne}.` };
    }
    if (t === "cond") {
      const m = rand(8, 14), c = pick([2, 3]), L = Array.from({ length: m }, (_, k) => k).filter((k) => k % c === 0 && k > 0);
      const ch = choix4(tt(lst(L)), [tt(lst(Array.from({ length: m }, (_, k) => k).filter((k) => k % c === 0))), tt(lst(Array.from({ length: m + 1 }, (_, k) => k).filter((k) => k % c === 0 && k > 0))), tt(lst(Array.from({ length: m }, (_, k) => k).filter((k) => k % c !== 0 && k > 0))), tt(lst(Array.from({ length: m }, (_, k) => k * c).filter((k) => k > 0)))]);
      return { enonce: `Que vaut $\\texttt{[n for n in range(${m}) if n \\% ${c} == 0 and n > 0]}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["$\\texttt{n \\% " + c + " == 0}$ : le reste de la division par $" + c + "$ est nul, $n$ est un multiple de $" + c + "$.", `$\\texttt{range(${m})}$ va de $0$ à $${m - 1}$.`, "La condition $\\texttt{and n > 0}$ écarte $0$."],
        solution: `On garde les entiers de $0$ à $${m - 1}$ qui sont multiples de $${c}$ et strictement positifs : $\\texttt{${lst(L)}}$.` };
    }
    const f = pick([{ e: `n ** 2`, g: (k) => k * k, tex: "n^2" }, { e: `${a} * n + ${b}`, g: (k) => a * k + b, tex: `${a === 1 ? "n" : a + "n"} + ${b}` }, { e: `2 * n + 1`, g: (k) => 2 * k + 1, tex: "2n + 1" }, { e: `${a + 1} ** n`, g: (k) => (a + 1) ** k, tex: `${a + 1}^n` }]);
    const d = pick([0, 0, 1]), L = Array.from({ length: n - d }, (_, k) => f.g(k + d));
    const ch = choix4(tt(lst(L)), [tt(lst(Array.from({ length: n - d }, (_, k) => f.g(k + d + 1)))), tt(lst(Array.from({ length: n - d + 1 }, (_, k) => f.g(k + d)))), tt(lst(Array.from({ length: n - d }, (_, k) => k + d))), tt(lst(Array.from({ length: n - d - 1 }, (_, k) => f.g(k + d))))]);
    return { enonce: `Que vaut $\\texttt{[${f.e} for n in range(${d ? d + ", " : ""}${n})]}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [`$\\texttt{range(${d ? d + ", " : ""}${n})}$ donne $n = ${d}, \\dots, ${n - 1}$.`, `Pour chaque $n$, on calcule $${f.tex}$.`, `Pour $n = ${d}$ : $${f.g(d)}$ ; pour $n = ${d + 1}$ : $${f.g(d + 1)}$.`],
      solution: `Pour $n = ${Array.from({ length: n - d }, (_, k) => k + d).join(", ")}$, l'expression $${f.tex}$ vaut $${L.join(", ")}$ : la liste est $\\texttt{${lst(L)}}$.` };
  });

  def("yl-parcourir", () => {
    const t = pick(["append", "max", "somme-cond"]);
    const L = Array.from({ length: rand(5, 7) }, () => rand(1, 25));
    if (t === "append") {
      const k = rand(2, 4), code = `L = []\nfor i in range(${k}):\n    L.append(${pick(["2 * i", "i * i", "i + 10"])})\nprint(L)`;
      const e = code.match(/append\((.*)\)/)[1], g = e === "2 * i" ? (i) => 2 * i : e === "i * i" ? (i) => i * i : (i) => i + 10;
      const M = Array.from({ length: k }, (_, i) => g(i));
      const ch = choix4(tt(lst(M)), [tt(lst(Array.from({ length: k + 1 }, (_, i) => g(i)))), tt(lst(Array.from({ length: k }, (_, i) => g(i + 1)))), tt(lst([g(k - 1)])), tt(lst(Array.from({ length: k }, (_, i) => i)))]);
      return { enonce: `Qu'affiche ce programme ?\n\n${py(code)}`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["$\\texttt{L = []}$ crée une liste vide ; $\\texttt{L.append(v)}$ ajoute $\\texttt{v}$ à la fin.", `La boucle fait $${k}$ tours, avec $i = 0, \\dots, ${k - 1}$.`, `À chaque tour, on ajoute $\\texttt{${e}}$ pour la valeur de $i$ du tour.`],
        solution: `On part d'une liste vide et on ajoute successivement $${M.join("$, $")}$ : $\\texttt{${lst(M)}}$.` };
    }
    if (t === "max") {
      const code = `L = ${lst(L)}\nm = L[0]\nfor x in L:\n    if x > m:\n        m = x\nprint(m)`;
      return { enonce: `Qu'affiche ce programme ?\n\n${py(code)}`, mode: "nombre", prefixe: "Affichage :", attendu: Math.max(...L),
        erreurs: [{ valeur: Math.min(...L), message: "On remplace $\\texttt{m}$ quand on trouve **plus grand**." }, { valeur: L[0], message: "$\\texttt{m}$ est remplacé chaque fois qu'un élément plus grand apparaît." }, { valeur: L[L.length - 1], message: "$\\texttt{m}$ ne prend pas forcément la dernière valeur : seulement si elle est plus grande." }],
        aides: ["$\\texttt{m}$ garde en mémoire le plus grand élément rencontré.", "Parcours la liste : chaque fois qu'un élément dépasse $\\texttt{m}$, il le remplace.", `Le plus grand élément de la liste est $${Math.max(...L)}$.`],
        solution: `Ce programme cherche le maximum de la liste : il affiche $${Math.max(...L)}$.` };
    }
    const s = rand(5, 15), code = `L = ${lst(L)}\ns = 0\nfor x in L:\n    if x > ${s}:\n        s = s + x\nprint(s)`;
    const att = L.filter((x) => x > s).reduce((a, v) => a + v, 0);
    return { enonce: `Qu'affiche ce programme ?\n\n${py(code)}`, mode: "nombre", prefixe: "Affichage :", attendu: att,
      erreurs: [{ valeur: L.filter((x) => x > s).length, message: "$\\texttt{s = s + x}$ additionne les valeurs, ce n'est pas un compteur." }, { valeur: L.reduce((a, v) => a + v, 0), message: `Seules les valeurs strictement supérieures à $${s}$ sont ajoutées.` }, { valeur: L.filter((x) => x >= s).reduce((a, v) => a + v, 0), message: `La condition est $x > ${s}$, strictement.` }],
      aides: [`On n'ajoute que les éléments qui vérifient $x > ${s}$.`, `Ces éléments : $${L.filter((x) => x > s).join("$, $") || "\\text{aucun}"}$.`, "Additionne-les."],
      solution: `Les éléments strictement supérieurs à $${s}$ sont ${att ? `$${L.filter((x) => x > s).join("$, $")}$` : "inexistants"} ; leur somme est $${att}$.` };
  });

  def("yl-condition", () => {
    const t = pick(["tarif", "tarif", "note", "et-ou"]);
    if (t === "tarif") {
      const seuil = pick([50, 100, 200]), p1 = rand(3, 8), p2 = rand(0, 3) || 0;
      const code = `def prix(x):\n    if x < ${seuil}:\n        return x + ${p1}\n    else:\n        return x`;
      const x = pick([seuil - rand(1, 20), seuil, seuil + rand(1, 30)]), att = x < seuil ? x + p1 : x;
      return { enonce: `Un site de vente en ligne offre les frais de port (${euros(p1)}) à partir de ${euros(seuil)} d'achat :\n\n${py(code)}\n\nQue vaut ${tt(`prix(${x})`)} ?`, mode: "nombre", prefixe: `${tt(`prix(${x})`)} $=$`, attendu: att, suffixe: "€",
        erreurs: [{ valeur: x < seuil ? x : x + p1, message: x < seuil ? `$${x} < ${seuil}$ : la condition est vraie, on ajoute les frais.` : `$${x} < ${seuil}$ est faux : on passe dans le $\\texttt{else}$.` }],
        aides: [`Teste la condition $\\texttt{x < ${seuil}}$ avec $x = ${x}$.`, x < seuil ? "Elle est vraie : on exécute le premier $\\texttt{return}$." : "Elle est fausse : on exécute le $\\texttt{else}$.", x === seuil ? `$${seuil} < ${seuil}$ est faux (ce n'est pas $\\leqslant$).` : "Calcule la valeur renvoyée."],
        solution: x < seuil ? `$${x} < ${seuil}$ est vrai : la fonction renvoie $${x} + ${p1} = ${att}$ (frais de port ajoutés).` : `$${x} < ${seuil}$ est faux${x === seuil ? " (égalité, pas strictement inférieur)" : ""} : la fonction renvoie $${x}$ (port offert).` };
    }
    if (t === "note") {
      const n = rand(0, 20), code = `def mention(n):\n    if n >= 16:\n        return "TB"\n    elif n >= 12:\n        return "B"\n    elif n >= 10:\n        return "AB"\n    else:\n        return "sans"`;
      const att = n >= 16 ? "TB" : n >= 12 ? "B" : n >= 10 ? "AB" : "sans";
      const ch = choix4(tt(`"${att}"`), ["TB", "B", "AB", "sans"].filter((x) => x !== att).map((x) => tt(`"${x}"`)));
      return { enonce: `On définit :\n\n${py(code)}\n\nQue renvoie ${tt(`mention(${n})`)} ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Les conditions sont testées dans l'ordre ; dès qu'une est vraie, la fonction renvoie et s'arrête.", `Teste $${n} \\geqslant 16$, puis $${n} \\geqslant 12$, puis $${n} \\geqslant 10$.`, "$\\texttt{elif}$ signifie « sinon, si »."],
        solution: `Avec $n = ${n}$ : ${n >= 16 ? "$n \\geqslant 16$ est vrai" : n >= 12 ? "$n \\geqslant 16$ est faux, $n \\geqslant 12$ est vrai" : n >= 10 ? "$n \\geqslant 16$ et $n \\geqslant 12$ sont faux, $n \\geqslant 10$ est vrai" : "aucune condition n'est vraie"}, la fonction renvoie $\\texttt{"${att}"}$.` };
    }
    const x = rand(-5, 15), a = rand(0, 6), b = rand(7, 12), op = pick(["and", "or"]);
    const code = `x = ${x}\nif x > ${a} ${op} x < ${b}:\n    print("oui")\nelse:\n    print("non")`;
    const v = op === "and" ? x > a && x < b : x > a || x < b;
    const ch = choix4(tt(`"${v ? "oui" : "non"}"`), [tt(`"${v ? "non" : "oui"}"`), tt(`"oui" puis "non"`), "rien, le programme a une erreur"]);
    return { enonce: `Qu'affiche ce programme ?\n\n${py(code)}`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [op === "and" ? "$\\texttt{and}$ : les deux conditions doivent être vraies." : "$\\texttt{or}$ : il suffit qu'une condition soit vraie.", `$x > ${a}$ est ${x > a ? "vrai" : "faux"} ; $x < ${b}$ est ${x < b ? "vrai" : "faux"}.`, "Conclus avec le sens de l'opérateur."],
      solution: `$x > ${a}$ est ${x > a ? "vrai" : "faux"} et $x < ${b}$ est ${x < b ? "vrai" : "faux"} ; avec $\\texttt{${op}}$, la condition est ${v ? "vraie" : "fausse"} : le programme affiche $\\texttt{"${v ? "oui" : "non"}"}$.` };
  });

  def("yl-bernoulli", () => {
    const t = pick(["code", "moyenne", "moyenne", "liste"]);
    const p = pick([0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.6, 0.65, 0.7, 0.75, 0.8, 0.9]);
    if (t === "code") {
      const bonne = py(`from random import random\ndef bernoulli():\n    if random() < ${p}:\n        return 1\n    else:\n        return 0`);
      const ch = choix4(bonne, [py(`from random import random\ndef bernoulli():\n    if random() < ${p}:\n        return 0\n    else:\n        return 1`), py(`from random import random\ndef bernoulli():\n    if random() < ${1 - p === 0.5 ? 0.9 : +(1 - p).toFixed(2)}:\n        return 1\n    else:\n        return 0`), py(`from random import random\ndef bernoulli():\n    return random() * ${p}`)]);
      return { enonce: `$\\texttt{random()}$ renvoie un nombre au hasard entre $0$ et $1$. Quelle fonction simule une loi de Bernoulli de paramètre $p = ${nb(p)}$ (elle renvoie $1$ avec la probabilité $${nb(p)}$, sinon $0$) ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["La probabilité que $\\texttt{random()}$ soit inférieur à $p$ vaut exactement $p$.", `On veut renvoyer $1$ quand $\\texttt{random() < ${p}}$.`, "Sinon, on renvoie $0$."],
        solution: `$\\texttt{random() < ${p}}$ est vrai avec la probabilité $${nb(p)}$ : on renvoie $1$ dans ce cas et $0$ sinon. La deuxième proposition inverse les deux sorties, la troisième n'a pas la bonne probabilité, la dernière ne renvoie ni $0$ ni $1$.` };
    }
    if (t === "liste") {
      const n = pick([10, 20, 50, 100]);
      const bonne = tt(`[bernoulli() for k in range(${n})]`);
      const ch = choix4(bonne, [tt(`bernoulli(${n})`), tt(`[bernoulli() for k in range(${n + 1})]`), tt(`${n} * bernoulli()`), tt(`[bernoulli()] * ${n}`)]);
      return { enonce: `La fonction $\\texttt{bernoulli()}$ renvoie $1$ ou $0$ au hasard. Quelle instruction fabrique une liste de $${n}$ tirages indépendants (un échantillon de taille $${n}$) ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Il faut appeler la fonction $" + n + "$ fois : une liste en compréhension le fait.", `$\\texttt{range(${n})}$ donne exactement $${n}$ tours.`, "$\\texttt{[bernoulli()] * " + n + "}$ répéterait $" + n + "$ fois le **même** tirage."],
        solution: `${bonne} appelle la fonction $${n}$ fois et range les résultats dans une liste. $\\texttt{[bernoulli()] * ${n}}$ ne fait qu'un seul tirage recopié $${n}$ fois.` };
    }
    const n = pick([20, 40, 50, 100, 200, 250, 300, 400, 500, 800, 1000, 2000]), att = arr(p * n);
    return { enonce: `On simule $${n}$ tirages d'une loi de Bernoulli de paramètre $p = ${nb(p)}$ avec $\\texttt{L = [bernoulli() for k in range(${n})]}$. Autour de quelle valeur attend-on $\\texttt{sum(L)}$ (le nombre de $1$) ?`, mode: "nombre", prefixe: "Environ", attendu: att,
      erreurs: [{ valeur: n * (1 - p), message: "C'est le nombre de $0$ attendu : la probabilité d'obtenir $1$ est $p$." }, { valeur: p, message: "On demande un nombre de $1$ parmi $" + n + "$ tirages, pas une probabilité." }],
      aides: ["Chaque tirage donne $1$ avec la probabilité $p$.", `Sur $${n}$ tirages, on attend environ $p \\times ${n}$ fois le résultat $1$.`, `$${nb(p)} \\times ${n}$.`],
      solution: `En moyenne, une proportion $p = ${nb(p)}$ des tirages donne $1$ : environ $${nb(p)} \\times ${n} = ${nb(att)}$. La valeur réelle fluctue autour de ce nombre d'une simulation à l'autre.` };
  });

  def("yl-vrai-faux", () => vraiFaux4([
    ["$\\texttt{range(5)}$ donne les entiers $0$, $1$, $2$, $3$, $4$.", true, "la borne $5$ est exclue."],
    ["Dans une liste, le premier élément a l'indice $0$.", true, "les indices commencent à $0$."],
    ["$\\texttt{L[-1]}$ est le dernier élément de la liste $\\texttt{L}$.", true, "un indice négatif compte depuis la fin."],
    ["$\\texttt{L.append(7)}$ ajoute $7$ à la fin de la liste.", true, "c'est la méthode pour ajouter un élément."],
    ["$\\texttt{len(L)}$ est le nombre d'éléments de $\\texttt{L}$.", true, "c'est la longueur de la liste."],
    ["$\\texttt{[2 * n for n in range(4)]}$ vaut $\\texttt{[0, 2, 4, 6]}$.", true, "$2n$ pour $n = 0, 1, 2, 3$."],
    ["Une fonction Python renvoie une valeur avec $\\texttt{return}$.", true, "$\\texttt{print}$ ne fait qu'afficher."],
    ["$\\texttt{random() < 0.3}$ est vrai avec la probabilité $0{,}3$.", true, "$\\texttt{random()}$ est uniforme entre $0$ et $1$."],
    ["$\\texttt{s = s + x}$ est un compteur.", false, "c'est un accumulateur : un compteur fait $\\texttt{c = c + 1}$."],
    ["$\\texttt{range(1, 5)}$ donne $1$, $2$, $3$, $4$, $5$.", false, "la borne $5$ est exclue : $1$, $2$, $3$, $4$."],
    ["Si $\\texttt{L = [3, 8, 5]}$, alors $\\texttt{L[1]}$ vaut $3$.", false, "$\\texttt{L[1]}$ est le deuxième élément : $8$."],
    ["$\\texttt{x ** 2}$ calcule $2x$.", false, "$\\texttt{**}$ est la puissance : $x^2$."],
    ["Après $\\texttt{a = 2}$ puis $\\texttt{a = a + 3}$, la variable $\\texttt{a}$ vaut $2$.", false, "l'affectation remplace la valeur : $\\texttt{a}$ vaut $5$."],
    ["$\\texttt{[n for n in range(10) if n > 7]}$ vaut $\\texttt{[7, 8, 9]}$.", false, "$n > 7$ strictement : $\\texttt{[8, 9]}$."],
    ["Une fonction Python ne peut avoir qu'une seule entrée.", false, "on peut écrire $\\texttt{def g(a, b):}$ avec plusieurs paramètres."]
  ], ["Relis le rôle de $\\texttt{range}$, des indices et de $\\texttt{return}$.", "Un compteur augmente de $1$, un accumulateur ajoute une valeur.", "Teste mentalement chaque affirmation sur un petit exemple."]));

  /* Figures du cours (chapitre 2) */
  FIGURES["yl-cours-liste"] = () => listePy([4, 9, 2, 7, 5], "L");
  FIGURES["yl-cours-fonction"] = () => {
    let s = `<svg class="graph" viewBox="0 0 320 120" role="img" aria-label="Schéma d'une fonction Python : entrées x, traitement, sortie renvoyée par return">`;
    s += `<rect x="110" y="30" width="100" height="60" rx="8" style="fill:var(--lagon);fill-opacity:0.12;stroke:var(--lagon);stroke-width:1.8"/><text class="g-label" x="160" y="55" text-anchor="middle" style="font-weight:700">def f(x):</text><text class="g-label" x="160" y="75" text-anchor="middle">calculs</text>`;
    s += `<path d="M20 60 L104 60" style="stroke:var(--encre);stroke-width:1.6"/><path d="M104 60 L96 55 L96 65 Z" style="fill:var(--encre)"/><text class="g-label" x="20" y="48">entrée x</text>`;
    s += `<path d="M212 60 L296 60" style="stroke:var(--encre);stroke-width:1.6"/><path d="M296 60 L288 55 L288 65 Z" style="fill:var(--encre)"/><text class="g-label" x="300" y="48" text-anchor="end">sortie</text><text class="g-label" x="300" y="78" text-anchor="end" style="fill:var(--lagon)">return …</text>`;
    return s + `</svg>`;
  };
  FIGURES["yl-cours-boucle"] = () => {
    let s = `<svg class="graph" viewBox="0 0 320 130" role="img" aria-label="Boucle for k in range(4) : quatre tours, k vaut 0, 1, 2, 3, et l'accumulateur s passe de 0 à 2, 4, 6, 8">`;
    s += `<text class="g-label" x="10" y="22" style="font-weight:700">for k in range(4):   s = s + 2</text>`;
    ["tour", "k", "s"].forEach((n, i) => { s += `<text class="g-label" x="10" y="${54 + i * 24}" style="font-weight:700">${n}</text>`; });
    [["1", "0", "2"], ["2", "1", "4"], ["3", "2", "6"], ["4", "3", "8"]].forEach((c, j) => { c.forEach((v, i) => { s += `<rect x="${70 + j * 60}" y="${38 + i * 24}" width="56" height="22" style="fill:${i === 2 ? "var(--lagon)" : "var(--surface)"};fill-opacity:${i === 2 ? 0.15 : 1};stroke:var(--doux);stroke-width:1"/><text class="g-label" x="${98 + j * 60}" y="${54 + i * 24}" text-anchor="middle">${v}</text>`; }); });
    s += `<text class="g-label" x="10" y="122" style="font-size:10px">départ : s = 0 ; après la boucle : s = 8</text>`;
    return s + `</svg>`;
  };

  /* ---------- Chapitre 3 : automatismes, évolutions et pourcentages (préfixe yv) ---------- */
  const OBJETS = [["un scooter", "€"], ["un téléphone", "€"], ["un billet d'avion pour La Réunion", "€"], ["un sac de riz", "€"], ["le loyer d'un studio", "€"], ["une paire de baskets", "€"], ["un abonnement internet", "€"], ["une télévision", "€"]];
  const GRANDEURS = [["la population de", "habitants"], ["le nombre d'abonnés de", "abonnés"], ["le nombre de visiteurs de", "visiteurs"], ["le nombre de licenciés du club de", "licenciés"]];
  const TAUX = [2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 75];
  const taux = () => pick([1, -1]) * pick(TAUX); // en %
  const cm = (t) => arr(1 + t / 100); // coefficient multiplicateur
  const signe = (t) => (t > 0 ? "augmente" : "baisse");
  const tauxTex = (t) => (t < 0 ? `-${nb(-t)}\\,\\%` : `+${nb(t)}\\,\\%`);
  const pctTex = (t) => `${nb(Math.abs(t))}\\,\\%`;

  def("yv-proportion", () => {
    const t = pick(["vers-pct", "vers-pct", "vers-eff", "de-de"]);
    if (t === "de-de") {
      const p1 = pick([20, 25, 30, 40, 50, 60, 75, 80]), p2 = pick([10, 20, 25, 30, 40, 50]), att = arr(p1 * p2 / 100);
      const ctx = pick([["des élèves du lycée sont en Première", "des élèves de Première font de l'espagnol", "les élèves du lycée", "élèves de Première hispanisants"], ["des habitants ont moins de 25 ans", "des moins de 25 ans sont scolarisés", "les habitants", "moins de 25 ans scolarisés"], ["des clients paient par carte", "des paiements par carte sont sans contact", "les clients", "clients payant sans contact"]]);
      return { enonce: `$${p1}\\,\\%$ ${ctx[0]}, et $${p2}\\,\\%$ ${ctx[1]}. Quel pourcentage de tous ${ctx[2]} représentent les ${ctx[3]} ?`,
        mode: "nombre", prefixe: "Pourcentage :", attendu: att, suffixe: "%",
        erreurs: [{ valeur: p1 + p2, message: "Une proportion de proportion se **multiplie** : $\\dfrac{p_1}{100} \\times \\dfrac{p_2}{100}$." }, { valeur: p1 * p2, message: "N'oublie pas de diviser par $100$ : $\\dfrac{" + p1 + "}{100} \\times \\dfrac{" + p2 + "}{100}$, puis en pourcentage." }],
        aides: ["Une proportion de proportion : on multiplie les deux proportions.", `$\\dfrac{${p1}}{100} \\times \\dfrac{${p2}}{100} = ${nb(p1 / 100)} \\times ${nb(p2 / 100)}$.`, `Exprime le résultat en pourcentage (multiplie par $100$).`],
        solution: `$\\dfrac{${p1}}{100} \\times \\dfrac{${p2}}{100} = ${nb(arr(p1 * p2 / 10000))}$, soit $${nb(att)}\\,\\%$ de l'ensemble.` };
    }
    const N = pick([40, 50, 80, 120, 150, 200, 250, 300, 400, 500, 600, 800, 1200, 1500, 2000]), p = pick([5, 10, 12, 15, 20, 25, 30, 35, 40, 45, 50, 60, 65, 70, 75, 80, 85, 90]);
    const eff = arr(N * p / 100);
    if (!Number.isInteger(eff)) return GEN["yv-proportion"]();
    const ctx = pick([["élèves", "ont choisi l'option santé"], ["habitants", "ont moins de 20 ans"], ["véhicules", "sont des scooters"], ["touristes", "viennent de La Réunion"], ["bouteilles", "sont recyclées"]]);
    if (t === "vers-eff") return { enonce: `Sur $${nb(N)}$ ${ctx[0]}, $${p}\\,\\%$ ${ctx[1]}. Combien cela fait-il de ${ctx[0]} ?`, mode: "nombre", prefixe: "Effectif :", attendu: eff,
      erreurs: [{ valeur: N - eff, message: "Ça, c'est le reste : on veut les " + ctx[0] + " qui " + ctx[1] + "." }, { valeur: N * p, message: "$p\\,\\%$ de $N$, c'est $N \\times \\dfrac{p}{100}$." }],
      aides: ["Prendre $p\\,\\%$ d'un nombre, c'est le multiplier par $\\dfrac{p}{100}$.", `$${nb(N)} \\times \\dfrac{${p}}{100}$.`, `$${nb(N)} \\times ${nb(p / 100)}$.`],
      solution: `$${nb(N)} \\times \\dfrac{${p}}{100} = ${nb(N)} \\times ${nb(p / 100)} = ${nb(eff)}$ ${ctx[0]}.` };
    return { enonce: `Sur $${nb(N)}$ ${ctx[0]}, $${nb(eff)}$ ${ctx[1]}. Quel pourcentage cela représente-t-il ?`, mode: "nombre", prefixe: "Pourcentage :", attendu: p, suffixe: "%",
      erreurs: [{ valeur: 100 - p, message: "C'est le pourcentage des autres." }, { valeur: arr(eff / N), message: "Multiplie la proportion par $100$ pour avoir un pourcentage." }, { valeur: arr(N / eff), message: "La proportion est $\\dfrac{\\text{partie}}{\\text{total}}$, pas l'inverse." }],
      aides: ["Proportion $= \\dfrac{\\text{effectif de la partie}}{\\text{effectif total}}$.", `$\\dfrac{${nb(eff)}}{${nb(N)}} = ${nb(arr(eff / N))}$.`, "Multiplie par $100$ pour l'écrire en pourcentage."],
      solution: `$\\dfrac{${nb(eff)}}{${nb(N)}} = ${nb(arr(eff / N))} = \\dfrac{${p}}{100}$, soit $${p}\\,\\%$.` };
  });

  def("yv-appliquer", () => {
    const t = taux(), c = cm(t);
    const [objet, u] = pick(OBJETS), v0 = pick([40, 60, 80, 120, 150, 180, 200, 240, 250, 300, 320, 360, 400, 450, 500, 600, 640, 750, 800, 900, 1200, 1500, 2000]);
    const v1 = arr(v0 * c);
    const ctx = pick(["prix", "quantite"]);
    if (ctx === "quantite") {
      const [g, unite] = pick(GRANDEURS), lieu0 = lieu(), n0 = v0 * 10;
      const n1 = arr(n0 * c);
      return { enonce: `En un an, ${g} ${lieu0} ${signe(t)} de $${pctTex(t)}$. Il y avait $${nb(n0)}$ ${unite}. Combien y en a-t-il maintenant ?`, mode: "nombre", prefixe: "Nombre :", attendu: n1,
        erreurs: [{ valeur: arr(n0 * (1 - t / 100)), message: `Une ${t > 0 ? "hausse" : "baisse"} de $${pctTex(t)}$ : le coefficient est $1 ${t > 0 ? "+" : "-"} ${nb(Math.abs(t) / 100)}$.` }, { valeur: arr(n0 * Math.abs(t) / 100), message: `Ça, c'est la variation. Il faut ${t > 0 ? "l'ajouter à" : "la retirer de"} la valeur de départ.` }, { valeur: n0 + t, message: "Un pourcentage se calcule par rapport à la valeur de départ, ce n'est pas un nombre qu'on ajoute." }],
        aides: [`Une évolution de $${tauxTex(t)}$ revient à multiplier par $1 ${t > 0 ? "+" : "-"} \\dfrac{${Math.abs(t)}}{100}$.`, `Le coefficient multiplicateur est $${nb(c)}$.`, `$${nb(n0)} \\times ${nb(c)}$.`],
        solution: `Coefficient multiplicateur : $1 ${t > 0 ? "+" : "-"} \\dfrac{${Math.abs(t)}}{100} = ${nb(c)}$.\n\n$${nb(n0)} \\times ${nb(c)} = ${nb(n1)}$ ${unite}.` };
    }
    return { enonce: `Le prix d'${objet.replace(/^un /, "un ").replace(/^le /, "")} est de ${euros(v0)}. Il ${signe(t)} de $${pctTex(t)}$. Quel est le nouveau prix ?`.replace("d'un ", "d'un ").replace("d'le ", "du "), mode: "nombre", prefixe: "Nouveau prix :", attendu: v1, suffixe: "€",
      erreurs: [{ valeur: arr(v0 * (1 - t / 100)), message: `C'est une ${t > 0 ? "hausse" : "baisse"} : le coefficient est $1 ${t > 0 ? "+" : "-"} ${nb(Math.abs(t) / 100)}$.` }, { valeur: arr(v0 * Math.abs(t) / 100), message: `Ça, c'est le montant de la ${t > 0 ? "hausse" : "baisse"}. Il faut ${t > 0 ? "l'ajouter au" : "le retirer du"} prix de départ.` }, { valeur: v0 + t, message: "Un pourcentage se calcule par rapport au prix de départ." }],
      aides: [`${t > 0 ? "Augmenter" : "Diminuer"} de $${pctTex(t)}$, c'est multiplier par $1 ${t > 0 ? "+" : "-"} \\dfrac{${Math.abs(t)}}{100}$.`, `Le coefficient multiplicateur est $${nb(c)}$.`, `$${nb(v0)} \\times ${nb(c)}$.`],
      solution: `Coefficient multiplicateur : $1 ${t > 0 ? "+" : "-"} \\dfrac{${Math.abs(t)}}{100} = ${nb(c)}$.\n\nNouveau prix : $${nb(v0)} \\times ${nb(c)} = ${nb(v1)}$ €.` };
  });

  def("yv-initiale", () => {
    const t = taux(), c = cm(t);
    const v0 = pick([40, 60, 80, 120, 150, 200, 240, 250, 300, 400, 450, 500, 600, 800, 900, 1200, 1500, 2000, 2500]), v1 = arr(v0 * c);
    if (!Number.isInteger(v1 * 100)) return GEN["yv-initiale"]();
    const [objet] = pick(OBJETS);
    return { enonce: `Après une ${t > 0 ? "hausse" : "baisse"} de $${pctTex(t)}$, le prix d'${objet.replace(/^un /, "")} est de ${euros(v1)}. Quel était le prix **avant** l'évolution ?`.replace("d'le ", "du "), mode: "nombre", prefixe: "Prix initial :", attendu: v0, suffixe: "€",
      erreurs: [{ valeur: arr(v1 * (1 - t / 100)), message: `Pour revenir en arrière, on ne ${t > 0 ? "retire" : "rajoute"} pas $${pctTex(t)}$ du nouveau prix : on **divise** par le coefficient $${nb(c)}$.` }, { valeur: arr(v1 * c), message: "On cherche la valeur **avant** l'évolution : il faut diviser par le coefficient, pas multiplier." }, { valeur: arr(v1 - t), message: "Un pourcentage n'est pas un montant qu'on retire." }],
      aides: [`Valeur finale $=$ valeur initiale $\\times$ coefficient, avec le coefficient $${nb(c)}$.`, "Donc valeur initiale $=$ valeur finale $\\div$ coefficient.", `$${nb(v1)} \\div ${nb(c)}$.`],
      solution: `Coefficient multiplicateur : $${nb(c)}$. Valeur initiale : $\\dfrac{${nb(v1)}}{${nb(c)}} = ${nb(v0)}$ €.\n\nVérification : $${nb(v0)} \\times ${nb(c)} = ${nb(v1)}$.` };
  });

  def("yv-taux", () => {
    const t = pick([1, -1]) * pick([2, 4, 5, 6, 8, 10, 12, 12.5, 15, 20, 24, 25, 30, 35, 40, 50, 60, 75, 80, 100, 120, 150, 200]);
    const base = pick([40, 50, 80, 100, 120, 150, 200, 240, 250, 300, 400, 500, 600, 800, 1000, 1200, 1500, 2000, 2400, 3000]);
    const v0 = base, v1 = arr(v0 * (1 + t / 100));
    if (!Number.isInteger(v1) || v1 <= 0) return GEN["yv-taux"]();
    const [g, unite] = pick(GRANDEURS), l = lieu();
    const ctxPrix = Math.random() < 0.5;
    const [objet] = pick(OBJETS);
    const enonce = ctxPrix ? `Le prix d'${objet.replace(/^un /, "")} passe de ${euros(v0)} à ${euros(v1)}. Quel est le taux d'évolution, en pourcentage ?`.replace("d'le ", "du ") : `${g.charAt(0).toUpperCase() + g.slice(1)} ${l} passe de $${nb(v0)}$ à $${nb(v1)}$ ${unite}. Quel est le taux d'évolution, en pourcentage ?`;
    return { enonce, mode: "nombre", prefixe: "Taux :", attendu: t, suffixe: "%",
      erreurs: [{ valeur: -t, message: `La valeur ${t > 0 ? "augmente" : "diminue"} : le taux est ${t > 0 ? "positif" : "négatif"}.` }, { valeur: arr((v1 - v0) / v1 * 100), message: "On divise par la valeur de **départ**, pas par la valeur d'arrivée." }, { valeur: v1 - v0, message: "Ça, c'est la variation absolue. Le taux est $\\dfrac{\\text{variation}}{\\text{valeur de départ}}$, en pourcentage." }, { valeur: arr((v1 - v0) / v0), message: "Multiplie par $100$ pour l'exprimer en pourcentage." }],
      aides: ["Taux d'évolution $= \\dfrac{\\text{valeur finale} - \\text{valeur initiale}}{\\text{valeur initiale}}$.", `$\\dfrac{${nb(v1)} - ${nb(v0)}}{${nb(v0)}} = \\dfrac{${nb(v1 - v0)}}{${nb(v0)}}$.`, `$\\dfrac{${nb(v1 - v0)}}{${nb(v0)}} = ${nb(arr(t / 100))}$ : multiplie par $100$.`],
      solution: `$\\dfrac{${nb(v1)} - ${nb(v0)}}{${nb(v0)}} = \\dfrac{${nb(v1 - v0)}}{${nb(v0)}} = ${nb(arr(t / 100))}$, soit un taux de $${tauxTex(t)}$ (${t > 0 ? "hausse" : "baisse"}).\n\nAutrement dit, le coefficient multiplicateur est $\\dfrac{${nb(v1)}}{${nb(v0)}} = ${nb(arr(1 + t / 100))}$.` };
  });

  def("yv-coefficient", () => {
    const t = pick([1, -1]) * pick([0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 7, 7.5, 8, 10, 12, 12.5, 15, 18, 20, 25, 30, 35, 40, 45, 50, 60, 70, 75, 80, 90, 100, 120, 150, 200]);
    const c = cm(t);
    if (c <= 0) return GEN["yv-coefficient"]();
    if (Math.random() < 0.5) return { enonce: `Quel est le coefficient multiplicateur associé à une ${t > 0 ? "hausse" : "baisse"} de $${pctTex(t)}$ ?`, mode: "nombre", prefixe: "$CM =$", attendu: c,
      erreurs: [{ valeur: arr(1 - t / 100), message: `Une ${t > 0 ? "hausse" : "baisse"} : $1 ${t > 0 ? "+" : "-"} \\dfrac{${nb(Math.abs(t))}}{100}$.` }, { valeur: arr(Math.abs(t) / 100), message: "N'oublie pas le $1$ : le coefficient est $1 + \\dfrac{t}{100}$." }, { valeur: arr(1 + t / 10), message: `$${nb(Math.abs(t))}\\,\\% = \\dfrac{${nb(Math.abs(t))}}{100} = ${nb(Math.abs(t) / 100)}$.` }],
      aides: ["Coefficient multiplicateur $CM = 1 + \\dfrac{t}{100}$, avec $t$ négatif pour une baisse.", `$t = ${nb(t)}$.`, `$1 ${t > 0 ? "+" : "-"} ${nb(Math.abs(t) / 100)}$.`],
      solution: `$CM = 1 ${t > 0 ? "+" : "-"} \\dfrac{${nb(Math.abs(t))}}{100} = ${nb(c)}$.` };
    return { enonce: `Une grandeur est multipliée par $${nb(c)}$. Quel est le taux d'évolution correspondant, en pourcentage (négatif pour une baisse) ?`, mode: "nombre", prefixe: "Taux :", attendu: t, suffixe: "%",
      erreurs: [{ valeur: -t, message: `Le coefficient est ${c > 1 ? "supérieur" : "inférieur"} à $1$ : c'est une ${c > 1 ? "hausse" : "baisse"}.` }, { valeur: arr(c * 100), message: "Le taux est $(CM - 1) \\times 100$ : on retire d'abord le $1$." }, { valeur: arr(t / 100), message: "Multiplie par $100$ pour avoir un pourcentage." }],
      aides: ["$CM = 1 + \\dfrac{t}{100}$, donc $t = (CM - 1) \\times 100$.", `$${nb(c)} - 1 = ${nb(arr(c - 1))}$.`, c > 1 ? "Le coefficient dépasse $1$ : hausse." : "Le coefficient est inférieur à $1$ : baisse, taux négatif."],
      solution: `$CM - 1 = ${nb(arr(c - 1))}$, soit $t = ${nb(arr(c - 1))} \\times 100 = ${nb(t)}$ : une ${t > 0 ? "hausse" : "baisse"} de $${pctTex(t)}$.` };
  });

  def("yv-successives", () => {
    const t1 = taux(), t2 = taux();
    const c = arr(cm(t1) * cm(t2)), tg = arr((c - 1) * 100);
    if (Math.abs(t1) === Math.abs(t2) && t1 === t2 && Math.random() < 0.5) return GEN["yv-successives"]();
    const ctx = pick([["Le prix d'un billet d'avion", "prix"], ["Le loyer d'un appartement", "loyer"], ["La population d'un village", "population"], ["Le prix du carburant", "prix"], ["Le nombre d'abonnés d'une chaîne", "nombre d'abonnés"]]);
    return { enonce: `${ctx[0]} ${signe(t1)} de $${pctTex(t1)}$, puis ${signe(t2)} de $${pctTex(t2)}$. Quel est le taux d'évolution global, en pourcentage (négatif pour une baisse) ?`, mode: "nombre", prefixe: "Taux global :", attendu: tg, suffixe: "%",
      erreurs: [{ valeur: t1 + t2, message: "Les taux ne s'additionnent pas : on **multiplie** les coefficients multiplicateurs." }, { valeur: arr(c * 100), message: "Tu as le coefficient global en pourcentage : le taux est $(CM - 1) \\times 100$." }, { valeur: c, message: "Ça, c'est le coefficient global. Le taux est $(CM - 1) \\times 100$." }],
      aides: [`Coefficients : $${nb(cm(t1))}$ puis $${nb(cm(t2))}$.`, `Coefficient global : $${nb(cm(t1))} \\times ${nb(cm(t2))} = ${nb(c)}$.`, "Taux global $= (CM_{\\text{global}} - 1) \\times 100$."],
      solution: `$CM_{\\text{global}} = ${nb(cm(t1))} \\times ${nb(cm(t2))} = ${nb(c)}$.\n\nTaux global : $(${nb(c)} - 1) \\times 100 = ${nb(tg)}$, soit $${tauxTex(tg)}$. ${t1 + t2 !== tg ? `Ce n'est pas $${tauxTex(t1 + t2)}$ : les pourcentages ne s'additionnent pas.` : ""}` };
  });

  def("yv-reciproque", () => {
    const exact = [[25, -20], [100, -50], [-20, 25], [-50, 100], [50, -33.33], [-25, 33.33], [20, -16.67], [-10, 11.11], [10, -9.09], [-40, 66.67], [60, -37.5], [-37.5, 60], [300, -75], [-75, 300], [150, -60], [-60, 150], [400, -80], [-80, 400], [12.5, -11.11], [-4, 4.17], [5, -4.76], [-5, 5.26], [8, -7.41], [15, -13.04], [30, -23.08], [-30, 42.86], [75, -42.86], [-15, 17.65], [40, -28.57], [-35, 53.85]];
    const [t, r] = pick(exact), c = cm(t), rExact = arr((1 / c - 1) * 100);
    const arrondi = Math.abs(rExact - Math.round(rExact * 10) / 10) > 1e-9;
    const att = arrondi ? Math.round(rExact * 10) / 10 : rExact;
    const [objet] = pick(OBJETS);
    return { enonce: `Le prix d'${objet.replace(/^un /, "")} a ${t > 0 ? "augmenté" : "baissé"} de $${pctTex(t)}$. De quel pourcentage doit-il ${t > 0 ? "baisser" : "augmenter"} pour revenir à sa valeur de départ (taux réciproque, négatif pour une baisse${arrondi ? ", arrondi au dixième" : ""}) ?`.replace("d'le ", "du "), mode: "nombre", prefixe: "Taux réciproque :", attendu: att, suffixe: "%", tolerance: arrondi ? 0.05 : 1e-9,
      erreurs: [{ valeur: -t, message: `Revenir en arrière n'est pas « $${tauxTex(-t)}$ » : il faut diviser par le coefficient $${nb(c)}$.` }, { valeur: Math.abs(att), message: "Le taux réciproque est " + (t > 0 ? "une baisse : signe négatif." : "une hausse : signe positif.") }],
      aides: [`Le coefficient de l'évolution est $${nb(c)}$.`, `Le coefficient réciproque est $\\dfrac{1}{${nb(c)}}$ : on doit annuler la multiplication par $${nb(c)}$.`, `$\\dfrac{1}{${nb(c)}} \\approx ${nb(arr(1 / c, 4))}$, puis $t = (CM - 1) \\times 100$.`],
      solution: `Coefficient réciproque : $\\dfrac{1}{${nb(c)}} ${arrondi ? "\\approx" : "="} ${nb(arr(1 / c, 4))}$.\n\nTaux réciproque : $(${nb(arr(1 / c, 4))} - 1) \\times 100 ${arrondi ? "\\approx" : "="} ${nb(att)}$, soit ${t > 0 ? "une baisse" : "une hausse"} d'environ $${pctTex(att)}$. ${Math.abs(att) !== Math.abs(t) ? `Ce n'est pas $${pctTex(t)}$ !` : ""}` };
  });

  def("yv-points", () => {
    const a = pick([10, 12, 15, 20, 24, 25, 30, 32, 40, 45, 48, 50, 60]), d = pick([-10, -8, -6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 8, 10, 12, 15]), b = a + d;
    if (b <= 0 || b >= 100) return GEN["yv-points"]();
    const ctx = pick(["Le taux de chômage", "La part des énergies renouvelables", "Le taux de réussite au bac", "La proportion de clients satisfaits", "Le taux de participation"]);
    const q = pick(["points", "pct"]);
    const tp = arr(d / a * 100), arrondi = Math.abs(tp - Math.round(tp * 10) / 10) > 1e-9, att = q === "points" ? d : (arrondi ? Math.round(tp * 10) / 10 : tp);
    return { enonce: `${ctx} passe de $${a}\\,\\%$ à $${b}\\,\\%$. ${q === "points" ? "De combien de **points de pourcentage** a-t-il évolué ?" : `Quel est son **taux d'évolution** en pourcentage${arrondi ? " (arrondi au dixième)" : ""} ?`}`, mode: "nombre", prefixe: q === "points" ? "Variation :" : "Taux :", attendu: att, suffixe: q === "points" ? "points" : "%", tolerance: q === "pct" && arrondi ? 0.05 : 1e-9,
      erreurs: q === "points" ? [{ valeur: arrondi ? Math.round(tp * 10) / 10 : tp, message: "Ça, c'est le taux d'évolution en pourcentage. En points, on fait simplement la différence." }, { valeur: -d, message: "Le signe : " + (d > 0 ? "hausse, variation positive." : "baisse, variation négative.") }] : [{ valeur: d, message: "Ça, c'est la variation en points. Le taux d'évolution est $\\dfrac{\\text{variation}}{\\text{valeur de départ}} \\times 100$." }, { valeur: arr(d / b * 100), message: "On divise par la valeur de départ." }],
      aides: ["Une variation en **points** est une simple différence entre deux pourcentages.", "Un **taux d'évolution** compare la variation à la valeur de départ.", q === "points" ? `$${b} - ${a}$.` : `$\\dfrac{${b} - ${a}}{${a}} \\times 100$.`],
      solution: q === "points" ? `$${b} - ${a} = ${nb(d)}$ : ${d > 0 ? "une hausse" : "une baisse"} de $${Math.abs(d)}$ points de pourcentage. (Le taux d'évolution, lui, vaut $\\dfrac{${nb(d)}}{${a}} \\approx ${nb(Math.round(tp * 10) / 10)}\\,\\%$.)` : `$\\dfrac{${b} - ${a}}{${a}} \\times 100 = \\dfrac{${nb(d)}}{${a}} \\times 100 ${arrondi ? "\\approx" : "="} ${nb(att)}$ : un taux d'évolution de $${tauxTex(att)}$, alors que la variation n'est que de $${nb(d)}$ points.` };
  });

  def("yv-vrai-faux", () => vraiFaux4([
    ["Augmenter de $20\\,\\%$, c'est multiplier par $1{,}2$.", true, "$1 + \\dfrac{20}{100} = 1{,}2$."],
    ["Baisser de $30\\,\\%$, c'est multiplier par $0{,}7$.", true, "$1 - \\dfrac{30}{100} = 0{,}7$."],
    ["Un coefficient multiplicateur de $1{,}05$ correspond à une hausse de $5\\,\\%$.", true, "$(1{,}05 - 1) \\times 100 = 5$."],
    ["Deux hausses successives de $10\\,\\%$ font une hausse de $21\\,\\%$.", true, "$1{,}1 \\times 1{,}1 = 1{,}21$."],
    ["Après une hausse de $25\\,\\%$, il faut baisser de $20\\,\\%$ pour revenir au départ.", true, "$\\dfrac{1}{1{,}25} = 0{,}8$."],
    ["Passer de $200$ à $250$, c'est une hausse de $25\\,\\%$.", true, "$\\dfrac{50}{200} = 0{,}25$."],
    ["Un prix qui double augmente de $100\\,\\%$.", true, "le coefficient est $2 = 1 + \\dfrac{100}{100}$."],
    ["$30\\,\\%$ de $50\\,\\%$ font $15\\,\\%$.", true, "$0{,}3 \\times 0{,}5 = 0{,}15$."],
    ["Une hausse de $50\\,\\%$ puis une baisse de $50\\,\\%$ ramènent au prix de départ.", false, "$1{,}5 \\times 0{,}5 = 0{,}75$ : baisse de $25\\,\\%$."],
    ["Baisser de $20\\,\\%$, c'est multiplier par $0{,}2$.", false, "c'est multiplier par $1 - 0{,}2 = 0{,}8$."],
    ["Deux baisses de $10\\,\\%$ font une baisse de $20\\,\\%$.", false, "$0{,}9 \\times 0{,}9 = 0{,}81$ : baisse de $19\\,\\%$."],
    ["Passer de $50$ à $40$, c'est une baisse de $25\\,\\%$.", false, "$\\dfrac{40 - 50}{50} = -0{,}2$ : baisse de $20\\,\\%$."],
    ["Un taux qui passe de $10\\,\\%$ à $15\\,\\%$ augmente de $5\\,\\%$.", false, "il augmente de $5$ **points**, soit $50\\,\\%$."],
    ["Pour retrouver la valeur avant une hausse de $10\\,\\%$, on retire $10\\,\\%$ de la nouvelle valeur.", false, "on divise par $1{,}1$ (baisse d'environ $9{,}1\\,\\%$)."],
    ["Un coefficient multiplicateur de $0{,}6$ correspond à une baisse de $60\\,\\%$.", false, "$0{,}6 - 1 = -0{,}4$ : baisse de $40\\,\\%$."]
  ], ["Passe toujours par le coefficient multiplicateur $1 + \\dfrac{t}{100}$.", "Des évolutions successives se composent en multipliant les coefficients.", "Compare variation en points et taux d'évolution."]));

  /* Figures du cours (chapitre 3) */
  FIGURES["yv-cours-cm"] = () => {
    let s = `<svg class="graph" viewBox="0 0 320 120" role="img" aria-label="Valeur initiale multipliée par le coefficient 1 + t/100 donne la valeur finale ; pour revenir, on divise">`;
    const box = (x, t1, t2) => `<rect x="${x}" y="38" width="100" height="44" rx="8" style="fill:var(--lagon);fill-opacity:0.12;stroke:var(--lagon);stroke-width:1.6"/><text class="g-label" x="${x + 50}" y="56" text-anchor="middle" style="font-weight:700">${t1}</text><text class="g-label" x="${x + 50}" y="72" text-anchor="middle" style="font-size:10px">${t2}</text>`;
    s += box(10, "valeur", "initiale") + box(210, "valeur", "finale");
    s += `<path d="M115 50 L200 50" style="stroke:var(--encre);stroke-width:1.6"/><path d="M205 50 L196 45 L196 55 Z" style="fill:var(--encre)"/><text class="g-label" x="160" y="30" text-anchor="middle" style="fill:var(--lagon);font-weight:700">× CM</text><text class="g-label" x="160" y="44" text-anchor="middle" style="font-size:10px">CM = 1 + t/100</text>`;
    s += `<path d="M205 72 L120 72" style="stroke:var(--encre);stroke-width:1.6"/><path d="M115 72 L124 67 L124 77 Z" style="fill:var(--encre)"/><text class="g-label" x="160" y="100" text-anchor="middle" style="fill:var(--faux);font-weight:700">÷ CM</text><text class="g-label" x="160" y="114" text-anchor="middle" style="font-size:10px">retour en arrière</text>`;
    return s + `</svg>`;
  };
  FIGURES["yv-cours-successives"] = () => {
    let s = `<svg class="graph" viewBox="0 0 320 110" role="img" aria-label="Évolutions successives : 200, +20 % donne 240, puis −25 % donne 180 ; coefficient global 1,2 × 0,75 = 0,9">`;
    const box = (x, t) => `<rect x="${x}" y="40" width="60" height="36" rx="8" style="fill:var(--surface);stroke:var(--lagon);stroke-width:1.6"/><text class="g-label" x="${x + 30}" y="63" text-anchor="middle" style="font-weight:700">${t}</text>`;
    const fl = (x1, x2, t) => `<path d="M${x1} 58 L${x2 - 6} 58" style="stroke:var(--encre);stroke-width:1.6"/><path d="M${x2} 58 L${x2 - 9} 53 L${x2 - 9} 63 Z" style="fill:var(--encre)"/><text class="g-label" x="${(x1 + x2) / 2}" y="34" text-anchor="middle" style="fill:var(--lagon);font-weight:700">${t}</text>`;
    s += box(10, "200") + fl(72, 130, "× 1,2") + box(130, "240") + fl(192, 250, "× 0,75") + box(250, "180");
    s += `<text class="g-label" x="160" y="100" text-anchor="middle">global : × 1,2 × 0,75 = × 0,9, soit −10 % (et non −5 %)</text>`;
    return s + `</svg>`;
  };

  /* ---------- Chapitre 4 : automatismes, calcul, fonctions et graphiques (préfixe yc) ---------- */
  const nz2 = (a, b) => rand(a, b) || pick([a, b]);
  // Portion de la droite y = mx + p visible dans la fenêtre [x0 ; x1] × [y0 ; y1]
  function segDroite(m, p, x0, x1, y0, y1) {
    if (m === 0) return { a: x0, b: x1 };
    const xs = [x0, x1, (y0 - p) / m, (y1 - p) / m].filter((x) => x >= x0 - 1e-9 && x <= x1 + 1e-9 && m * x + p >= y0 - 1e-9 && m * x + p <= y1 + 1e-9);
    return { a: Math.min(...xs), b: Math.max(...xs) };
  }
  const ineg = { "<": "<", ">": ">", "<=": "\\leqslant", ">=": "\\geqslant" };
  const fac = (a, b) => `(${aff(a, b)})`; // (ax + b)
  const pt = (k, v) => (!k ? "" : `${k < 0 ? "-" : "+"} ${Math.abs(k) === 1 && v ? "" : nb(Math.abs(k))}${v}`); // terme suivant : « + 3x », « - x », rien si 0

  def("yc-produit-nul", () => {
    const a = pick([1, 1, 2, 3, -1, 5]), b = nz2(-9, 9), c = pick([1, 1, 2, 4, -2, 3]), d = nz2(-9, 9);
    const s1 = -b / a, s2 = -d / c;
    const dec = (x) => Number.isInteger(x * 100);
    if (!dec(s1) || !dec(s2) || Math.abs(s1 - s2) < 1e-9) return GEN["yc-produit-nul"]();
    const t = pick(["direct", "direct", "facto"]);
    const sol = [s1, s2].sort((x, y) => x - y);
    if (t === "facto") {
      // x(ax + b) = 0 ou (ax+b)² − (cx+d)² non : on reste simple, équation x² = kx ou ax² + bx = 0
      const k = nz2(-9, 9), a2 = pick([1, 1, 2, 3]);
      const sol2 = [0, -k / a2].sort((x, y) => x - y);
      if (!dec(sol2[1])) return GEN["yc-produit-nul"]();
      return { enonce: `Résous l'équation $${poly([a2, k, 0])} = 0$ (factorise d'abord). Écris les solutions séparées par « ; ».`, mode: "ensemble", attendu: sol2,
        aides: ["Les deux termes ont $x$ en facteur commun.", `$${poly([a2, k, 0])} = x(${aff(a2, k)})$.`, "Un produit est nul si et seulement si l'un des facteurs est nul."],
        solution: `$${poly([a2, k, 0])} = x(${aff(a2, k)})$.\n\nProduit nul : $x = 0$ ou $${aff(a2, k)} = 0$, c'est-à-dire $x = ${frac(-k, a2)}$.\n\n$S = \\{${sol2.map((v) => nb(v)).join("\\,;")}\\}$.` };
    }
    return { enonce: `Résous l'équation $${fac(a, b)}${fac(c, d)} = 0$. Écris les solutions séparées par « ; ».`, mode: "ensemble", attendu: sol,
      aides: ["Un produit est nul si et seulement si l'un au moins de ses facteurs est nul.", `Résous $${aff(a, b)} = 0$ puis $${aff(c, d)} = 0$.`, `$${aff(a, b)} = 0$ donne $x = ${frac(-b, a)}$.`],
      solution: `$${aff(a, b)} = 0$ ou $${aff(c, d)} = 0$.\n\n$x = ${frac(-b, a)}$ ou $x = ${frac(-d, c)}$.\n\n$S = \\{${sol.map((v) => nb(v)).join("\\,;")}\\}$.` };
  });

  def("yc-signe", () => {
    const t = pick(["affine", "affine", "produit", "produit", "produit"]);
    if (t === "affine") {
      const a = nz2(-6, 6), b = nz2(-9, 9), r = -b / a;
      if (!Number.isInteger(r * 100)) return GEN["yc-signe"]();
      const q = pick(["pos", "neg"]);
      const bonne = (q === "pos") === (a > 0) ? `$[${nb(r)}\\,;+\\infty[$` : `$]-\\infty\\,;${nb(r)}]$`;
      const ch = choix4(bonne, [(q === "pos") === (a > 0) ? `$]-\\infty\\,;${nb(r)}]$` : `$[${nb(r)}\\,;+\\infty[$`, `$[${nb(-r)}\\,;+\\infty[$`, `$]-\\infty\\,;${nb(-r)}]$`, `$[${nb(b)}\\,;+\\infty[$`]);
      return { enonce: `Sur quel intervalle l'expression $${aff(a, b)}$ est-elle ${q === "pos" ? "positive ou nulle" : "négative ou nulle"} ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        figureSolution: tabSigne(["−∞", nbS(r), "+∞"], [a > 0 ? "-" : "+", "0", a > 0 ? "+" : "-"], aff(a, b).replace(/\\,/g, " ")),
        aides: [`$${aff(a, b)} = 0$ pour $x = ${nb(r)}$.`, `Le coefficient de $x$ est ${a > 0 ? "positif" : "négatif"} : l'expression est ${a > 0 ? "croissante, négative avant la racine et positive après" : "décroissante, positive avant la racine et négative après"}.`, "Lis la ligne du tableau de signes."],
        solution: `$${aff(a, b)} = 0 \\Leftrightarrow x = ${nb(r)}$. Comme $a = ${nb(a)}$ est ${a > 0 ? "positif" : "négatif"}, l'expression est ${a > 0 ? "négative avant $" + nb(r) + "$ et positive après" : "positive avant $" + nb(r) + "$ et négative après"}.\n\nElle est ${q === "pos" ? "positive ou nulle" : "négative ou nulle"} sur ${bonne}.` };
    }
    const r1 = rand(-6, 6), r2 = r1 + rand(1, 7), a = pick([1, 1, 1, -1, 2, -2]);
    const q = pick(["pos", "neg", "val"]);
    const ext = a > 0; // positif à l'extérieur des racines si a > 0
    const dehors = `$]-\\infty\\,;${nb(r1)}] \\cup [${nb(r2)}\\,;+\\infty[$`, dedans = `$[${nb(r1)}\\,;${nb(r2)}]$`;
    const expr = `${a === 1 ? "" : a === -1 ? "-" : nb(a)}(x ${plus(-r1)})(x ${plus(-r2)})`;
    const fig = tabSigne(["−∞", nbS(r1), nbS(r2), "+∞"], [ext ? "+" : "-", "0", ext ? "-" : "+", "0", ext ? "+" : "-"], "f(x)");
    if (q === "val") {
      const x = pick([r1 - rand(1, 3), rand(r1 + 1, r2 - 1), r2 + rand(1, 3)].filter((v) => v !== undefined && v > r1 - 4 && v < r2 + 4 && Number.isInteger(v)));
      const v = a * (x - r1) * (x - r2);
      const bonne = v > 0 ? "strictement positif" : v < 0 ? "strictement négatif" : "nul";
      const ch = choix4(bonne, ["strictement positif", "strictement négatif", "nul", "impossible à déterminer"].filter((s) => s !== bonne));
      return { enonce: `On pose $f(x) = ${expr}$. Sans calculer $f(${nb(x)})$, quel est son signe ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu, figureSolution: fig,
        aides: [`Les racines sont $${nb(r1)}$ et $${nb(r2)}$.`, `Signe de chaque facteur pour $x = ${nb(x)}$ : $x ${plus(-r1)}$ est ${x - r1 > 0 ? "positif" : x - r1 < 0 ? "négatif" : "nul"}, $x ${plus(-r2)}$ est ${x - r2 > 0 ? "positif" : x - r2 < 0 ? "négatif" : "nul"}.`, `Le coefficient $${nb(a)}$ est ${a > 0 ? "positif" : "négatif"} : règle des signes.`],
        solution: `Pour $x = ${nb(x)}$ : $x ${plus(-r1)} = ${nb(x - r1)}$ (${x - r1 > 0 ? "positif" : x - r1 < 0 ? "négatif" : "nul"}) et $x ${plus(-r2)} = ${nb(x - r2)}$ (${x - r2 > 0 ? "positif" : x - r2 < 0 ? "négatif" : "nul"})${a !== 1 ? `, avec le coefficient $${nb(a)}$` : ""}. Le produit est ${bonne}.\n\nLe tableau de signes le confirme : ${ext ? "positif à l'extérieur des racines, négatif entre" : "négatif à l'extérieur des racines, positif entre"}.` };
    }
    const bonne = (q === "pos") === ext ? dehors : dedans;
    const ch = choix4(bonne, [(q === "pos") === ext ? dedans : dehors, `$]-\\infty\\,;${nb(r1)}]$`, `$[${nb(r2)}\\,;+\\infty[$`, `$[${nb(-r2)}\\,;${nb(-r1)}]$`]);
    return { enonce: `On pose $f(x) = ${expr}$. Sur quel ensemble a-t-on $f(x) ${q === "pos" ? "\\geqslant" : "\\leqslant"} 0$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu, figureSolution: fig,
      aides: [`Les racines sont $${nb(r1)}$ et $${nb(r2)}$ : elles coupent la droite en trois zones.`, `Dresse le tableau de signes des facteurs $x ${plus(-r1)}$ et $x ${plus(-r2)}$${a !== 1 ? ` (et du coefficient $${nb(a)}$)` : ""}.`, `Le produit est ${ext ? "positif à l'extérieur des racines et négatif entre les deux" : "négatif à l'extérieur des racines et positif entre les deux"}.`],
      solution: `Tableau de signes : $x ${plus(-r1)}$ change de signe en $${nb(r1)}$, $x ${plus(-r2)}$ en $${nb(r2)}$${a < 0 ? `, et le coefficient $${nb(a)}$ est négatif` : ""}.\n\n$f(x)$ est ${ext ? "positif à l'extérieur des racines, négatif entre" : "négatif à l'extérieur des racines, positif entre"}. Donc $f(x) ${q === "pos" ? "\\geqslant" : "\\leqslant"} 0$ sur ${bonne}.` };
  });

  def("yc-developper", () => {
    const t = pick(["dev", "dev", "fact", "reduire"]);
    if (t === "fact") {
      const a = pick([2, 3, 4, 5, 6, 7]), b = nz2(-9, 9), c = nz2(-8, 8);
      // a·x·(…) : ax² + ab x ; ou k(x + b) + (x + b)(x + c) → (x+b)(k + x + c)
      if (Math.random() < 0.5) {
        const bonne = `$${coef(a, "x")}(x ${plus(b)})$`;
        const ch = choix4(bonne, [`$x(${aff(a, a * b)})$`, `$${coef(a, "x")}(x ${plus(a * b)})$`, `$${coef(a, "x")}(${coef(a, "x")} ${plus(b)})$`, `$${coef(a, "x")}(x ${plus(-b)})$`]);
        return { enonce: `Factorise $${poly([a, a * b, 0])}$ le plus possible.`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
          aides: ["Cherche le facteur commun aux deux termes (nombre et lettre).", `$${poly([a, a * b, 0])} = ${a} \\times x \\times x + ${a} \\times ${pr(b)} \\times x$.`, "Vérifie en développant."],
          solution: `Le facteur commun est $${coef(a, "x")}$ : $${poly([a, a * b, 0])} = ${coef(a, "x")}(x ${plus(b)})$. Vérification : $${coef(a, "x")} \\times x = ${coef(a, "x^2")}$ et $${coef(a, "x")} \\times ${pr(b)} = ${coef(a * b, "x")}$.` };
      }
      const bonne = `$(x ${plus(b)})(x ${plus(c + a)})$`;
      const ch = choix4(bonne, [`$(x ${plus(b)})(x ${plus(c)})$`, `$(x ${plus(b)})(${nb(a)}x ${plus(c)})$`, `$(x ${plus(b)})^2(x ${plus(c)})$`, `$(x ${plus(b + a)})(x ${plus(c)})$`]);
      return { enonce: `Factorise $${nb(a)}(x ${plus(b)}) + (x ${plus(b)})(x ${plus(c)})$.`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: [`Le facteur commun est $(x ${plus(b)})$.`, `$(x ${plus(b)})\\,[${nb(a)} + (x ${plus(c)})]$.`, "Réduis le crochet."],
        solution: `$(x ${plus(b)})$ est en facteur : $(x ${plus(b)})\\,[${nb(a)} + x ${plus(c)}] = (x ${plus(b)})(x ${plus(c + a)})$.` };
    }
    if (t === "reduire") {
      const a = nz2(-5, 5), b = nz2(-6, 6), c = nz2(-5, 5), d = nz2(-6, 6), k = pick([2, 3, -2, -1]);
      // k(ax + b) + (cx + d) → (ka + c)x + (kb + d)
      const A = k * a + c, B = k * b + d, quoi = pick(["x", "c"]);
      return { enonce: `Développe et réduis $${nb(k)}(${aff(a, b)}) + (${aff(c, d)})$. Quel est le coefficient de $x$${quoi === "c" ? " ? Non : quel est le terme constant" : ""} ?`.replace(" ? Non : quel est le terme constant ?", " ? (On demande le terme constant.)").replace("Quel est le coefficient de $x$ ? (On demande le terme constant.)", "Quel est le terme constant ?"), mode: "nombre", prefixe: quoi === "x" ? "Coefficient de $x$ :" : "Terme constant :", attendu: quoi === "x" ? A : B,
        erreurs: [{ valeur: quoi === "x" ? B : A, message: quoi === "x" ? "Ça, c'est le terme constant." : "Ça, c'est le coefficient de $x$." }, { valeur: quoi === "x" ? a + c : b + d, message: `N'oublie pas de multiplier par $${nb(k)}$ les deux termes de la première parenthèse.` }, { valeur: quoi === "x" ? k * a - c : k * b - d, message: "Le signe devant la seconde parenthèse est $+$." }],
        aides: [`Distribue $${nb(k)}$ sur les deux termes : $${nb(k)} \\times ${a < 0 ? `(${coef(a, "x")})` : coef(a, "x")} ${plus(k * b)}$.`, "Supprime la seconde parenthèse (signe $+$ devant : rien ne change).", "Regroupe les termes en $x$ entre eux, et les constantes entre elles."],
        solution: `$${nb(k)}(${aff(a, b)}) + (${aff(c, d)}) = ${aff(k * a, k * b)} ${aff(c, d).startsWith("-") ? "" : "+ "}${aff(c, d)} = ${aff(A, B)}$.\n\n${quoi === "x" ? `Coefficient de $x$ : $${nb(A)}$.` : `Terme constant : $${nb(B)}$.`}` };
    }
    const a = pick([1, 1, 2, 3, -1]), b = nz2(-7, 7), c = pick([1, 1, 2, -1, 4]), d = nz2(-7, 7);
    const P = [a * c, a * d + b * c, b * d], quoi = pick(["x", "x", "c", "x2"]);
    const att = quoi === "x" ? P[1] : quoi === "c" ? P[2] : P[0];
    return { enonce: `Développe et réduis $${fac(a, b)}${fac(c, d)}$. ${quoi === "x" ? "Quel est le coefficient de $x$ ?" : quoi === "c" ? "Quel est le terme constant ?" : "Quel est le coefficient de $x^2$ ?"}`, mode: "nombre", prefixe: quoi === "x" ? "Coefficient de $x$ :" : quoi === "c" ? "Terme constant :" : "Coefficient de $x^2$ :", attendu: att,
      erreurs: [{ valeur: quoi === "x" ? a * d : quoi === "c" ? b + d : a + c, message: quoi === "x" ? "Il y a deux termes en $x$ : $" + coef(a, "x") + " \\times " + pr(d) + "$ et $" + pr(b) + " \\times " + coef(c, "x") + "$." : quoi === "c" ? "Le terme constant est le **produit** $" + pr(b) + " \\times " + pr(d) + "$." : "Le coefficient de $x^2$ est le produit $" + pr(a) + " \\times " + pr(c) + "$." }, { valeur: quoi === "x" ? b * c : quoi === "c" ? -b * d : -a * c, message: quoi === "x" ? "Additionne les deux termes en $x$." : "Attention au signe du produit." }, { valeur: -att, message: "Vérifie les signes." }],
      aides: ["Double distributivité : $(ax + b)(cx + d) = ax \\times cx + ax \\times d + b \\times cx + b \\times d$.", `$${coef(a, "x")} \\times ${coef(c, "x")} = ${coef(a * c, "x^2")}$ ; $${coef(a, "x")} \\times ${pr(d)} = ${coef(a * d, "x")}$ ; $${pr(b)} \\times ${coef(c, "x")} = ${coef(b * c, "x")}$ ; $${pr(b)} \\times ${pr(d)} = ${nb(b * d)}$.`, "Regroupe les termes en $x$."],
      solution: `$${fac(a, b)}${fac(c, d)} = ${coef(a * c, "x^2")} ${pt(a * d, "x")} ${pt(b * c, "x")} ${plus(b * d)} = ${poly(P)}$.\n\n${quoi === "x" ? `Coefficient de $x$ : $${nb(att)}$.` : quoi === "c" ? `Terme constant : $${nb(att)}$.` : `Coefficient de $x^2$ : $${nb(att)}$.`}` };
  });

  // Parabole f(x) = s(x − h)² + v (s = ±1), fenêtre [-6 ; 6]
  function paraboleQ() {
    const s = pick([1, 1, -1]), h = rand(-2, 2), v = s > 0 ? rand(-5, 1) : rand(-1, 5);
    const f = (x) => s * (x - h) ** 2 + v;
    return { s, h, v, f };
  }
  const figParabole = (P, hl, pts) => graph({ xmin: -5.6, xmax: 5.6, ymin: -6.6, ymax: 6.6, h: 300, curves: [{ f: P.f, a: Math.max(-5.3, P.h - Math.sqrt(Math.max(0, (P.s > 0 ? 6.3 - P.v : P.v + 6.3)))), b: Math.min(5.3, P.h + Math.sqrt(Math.max(0, (P.s > 0 ? 6.3 - P.v : P.v + 6.3)))), label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", closed: false }], hlines: hl || [], points: pts || [], aria: `Parabole de sommet (${nbS(P.h)} ; ${nbS(P.v)}), tournée vers le ${P.s > 0 ? "haut" : "bas"}` });

  def("yc-graphique", () => {
    const P = paraboleQ(), t = pick(["egal", "egal", "ineg", "image", "signe"]);
    if (t === "image") {
      const x = rand(Math.max(-4, P.h - 3), Math.min(4, P.h + 3)), y = P.f(x);
      if (Math.abs(y) > 6) return GEN["yc-graphique"]();
      const q = pick(["image", "antecedents"]);
      if (q === "image") return { enonce: `La courbe $C_f$ est donnée ci-dessous. Lis graphiquement $f(${nb(x)})$.`, figure: figParabole(P), mode: "nombre", prefixe: `$f(${nb(x)}) =$`, attendu: y,
        erreurs: [{ valeur: x, message: "L'image se lit sur l'axe **vertical** (ordonnées)." }, { valeur: -y, message: "Vérifie le signe : la courbe est-elle au-dessus ou en dessous de l'axe des abscisses ?" }],
        aides: [`Place $x = ${nb(x)}$ sur l'axe horizontal.`, "Monte (ou descends) jusqu'à la courbe, puis lis l'ordonnée du point.", `Le point de la courbe d'abscisse $${nb(x)}$ a pour ordonnée $${nb(y)}$.`],
        solution: `Le point de $C_f$ d'abscisse $${nb(x)}$ a pour ordonnée $${nb(y)}$ : $f(${nb(x)}) = ${nb(y)}$.` };
      const m = rand(1, 3), k = P.f(P.h + m), sol = [P.h - m, P.h + m];
      if (Math.abs(k) > 6) return GEN["yc-graphique"]();
      return { enonce: `La courbe $C_f$ est donnée ci-dessous. Lis graphiquement les antécédents de $${nb(k)}$ par $f$ (séparés par « ; »).`, figure: figParabole(P, [{ y: k, label: `y = ${nbS(k)}` }]), mode: "ensemble", attendu: sol,
        aides: [`Trace la droite horizontale $y = ${nb(k)}$.`, "Les antécédents sont les abscisses des points d'intersection avec la courbe.", `Il y en a deux, symétriques par rapport à l'axe de la parabole $x = ${nb(P.h)}$.`],
        solution: `La droite $y = ${nb(k)}$ coupe $C_f$ en deux points, d'abscisses $${nb(sol[0])}$ et $${nb(sol[1])}$ : les antécédents de $${nb(k)}$ sont $${nb(sol[0])}$ et $${nb(sol[1])}$.` };
    }
    if (t === "signe") {
      const m = rand(1, 3), r1 = P.h - m, r2 = P.h + m;
      const P2 = { s: P.s, h: P.h, v: -P.s * m * m, f: (x) => P.s * ((x - P.h) ** 2 - m * m) };
      const ext = P2.s > 0;
      const bonne = ext ? `$f(x) \\geqslant 0$ sur $]-\\infty\\,;${nb(r1)}] \\cup [${nb(r2)}\\,;+\\infty[$ et $f(x) \\leqslant 0$ sur $[${nb(r1)}\\,;${nb(r2)}]$` : `$f(x) \\leqslant 0$ sur $]-\\infty\\,;${nb(r1)}] \\cup [${nb(r2)}\\,;+\\infty[$ et $f(x) \\geqslant 0$ sur $[${nb(r1)}\\,;${nb(r2)}]$`;
      const autre = ext ? `$f(x) \\leqslant 0$ sur $]-\\infty\\,;${nb(r1)}] \\cup [${nb(r2)}\\,;+\\infty[$ et $f(x) \\geqslant 0$ sur $[${nb(r1)}\\,;${nb(r2)}]$` : `$f(x) \\geqslant 0$ sur $]-\\infty\\,;${nb(r1)}] \\cup [${nb(r2)}\\,;+\\infty[$ et $f(x) \\leqslant 0$ sur $[${nb(r1)}\\,;${nb(r2)}]$`;
      const ch = choix4(bonne, [autre, `$f(x) \\geqslant 0$ sur $]-\\infty\\,;${nb(P.h)}]$ et $f(x) \\leqslant 0$ sur $[${nb(P.h)}\\,;+\\infty[$`, `$f(x) \\geqslant 0$ sur $[${nb(r1)}\\,;+\\infty[$ et $f(x) \\leqslant 0$ sur $]-\\infty\\,;${nb(r1)}]$`]);
      return { enonce: `La courbe $C_f$ est donnée ci-dessous. Quel est le signe de $f(x)$ selon les valeurs de $x$ ?`, figure: figParabole(P2), mode: "choix", choix: ch.choix, attendu: ch.attendu, figureSolution: tabSigne(["−∞", nbS(r1), nbS(r2), "+∞"], [ext ? "+" : "-", "0", ext ? "-" : "+", "0", ext ? "+" : "-"], "f(x)"),
        aides: ["$f(x) > 0$ quand la courbe est **au-dessus** de l'axe des abscisses, $f(x) < 0$ quand elle est en dessous.", `La courbe coupe l'axe des abscisses en $${nb(r1)}$ et $${nb(r2)}$.`, `Entre les deux, la courbe est ${ext ? "en dessous" : "au-dessus"} de l'axe.`],
        solution: `La courbe coupe l'axe des abscisses en $${nb(r1)}$ et en $${nb(r2)}$. Elle est ${ext ? "en dessous de l'axe entre ces deux valeurs et au-dessus ailleurs" : "au-dessus de l'axe entre ces deux valeurs et en dessous ailleurs"} : ${bonne.replace(/\$f\(x\)/g, "$f(x)")}.` };
    }
    const m = rand(1, 3), k = P.f(P.h + m);
    if (Math.abs(k) > 6) return GEN["yc-graphique"]();
    const a = P.h - m, b = P.h + m;
    if (t === "egal") return { enonce: `La courbe $C_f$ est donnée ci-dessous. Résous graphiquement l'équation $f(x) = ${nb(k)}$ (solutions séparées par « ; »).`, figure: figParabole(P, [{ y: k, label: `y = ${nbS(k)}` }]), mode: "ensemble", attendu: [a, b],
      aides: [`Trace la droite horizontale $y = ${nb(k)}$.`, "Les solutions sont les abscisses des points où la droite coupe la courbe.", `Lis les deux abscisses : $${nb(a)}$ et $${nb(b)}$.`],
      solution: `La droite $y = ${nb(k)}$ coupe la courbe en deux points d'abscisses $${nb(a)}$ et $${nb(b)}$ : $S = \\{${nb(a)}\\,;${nb(b)}\\}$.` };
    const sens = pick(["<", ">", "<=", ">="]);
    const strict = sens === "<" || sens === ">";
    const dedans = (sens === "<" || sens === "<=") === (P.s > 0); // f(x) < k entre a et b si parabole vers le haut
    const I = dedans ? `${strict ? "]" : "["}${nb(a)}\\,;${nb(b)}${strict ? "[" : "]"}` : `]-\\infty\\,;${nb(a)}${strict ? "[" : "]"} \\cup ${strict ? "]" : "["}${nb(b)}\\,;+\\infty[`;
    const Iautre = dedans ? `]-\\infty\\,;${nb(a)}${strict ? "[" : "]"} \\cup ${strict ? "]" : "["}${nb(b)}\\,;+\\infty[` : `${strict ? "]" : "["}${nb(a)}\\,;${nb(b)}${strict ? "[" : "]"}`;
    const ch = choix4(`$S = ${I}$`, [`$S = ${Iautre}$`, `$S = ${dedans ? `${strict ? "[" : "]"}${nb(a)}\\,;${nb(b)}${strict ? "]" : "["}` : `]-\\infty\\,;${nb(a)}${strict ? "]" : "["} \\cup ${strict ? "[" : "]"}${nb(b)}\\,;+\\infty[`}$`, `$S = \\{${nb(a)}\\,;${nb(b)}\\}$`]);
    return { enonce: `La courbe $C_f$ est donnée ci-dessous. Résous graphiquement l'inéquation $f(x) ${ineg[sens]} ${nb(k)}$.`, figure: figParabole(P, [{ y: k, label: `y = ${nbS(k)}` }]), mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [`Trace la droite $y = ${nb(k)}$ ; elle coupe la courbe en $${nb(a)}$ et $${nb(b)}$.`, `On cherche les $x$ pour lesquels la courbe est ${sens.startsWith("<") ? "**en dessous**" : "**au-dessus**"} de la droite.`, strict ? "Inégalité stricte : les bornes sont exclues (crochets vers l'extérieur)." : "Inégalité large : les bornes sont comprises."],
      solution: `La courbe est ${sens.startsWith("<") ? "en dessous" : "au-dessus"} de la droite $y = ${nb(k)}$ ${dedans ? `entre $${nb(a)}$ et $${nb(b)}$` : `avant $${nb(a)}$ et après $${nb(b)}$`}${strict ? ", bornes exclues" : ", bornes comprises"} : $S = ${I}$.` };
  });

  def("yc-variations", () => {
    const P = paraboleQ(), t = pick(["var", "var", "extremum"]);
    const h = P.h, v = P.v, up = P.s > 0;
    if (t === "extremum") {
      const q = pick(["val", "en"]);
      return { enonce: `La courbe $C_f$ est donnée ci-dessous. ${q === "val" ? `Quel est le ${up ? "minimum" : "maximum"} de $f$ ?` : `En quelle valeur de $x$ le ${up ? "minimum" : "maximum"} de $f$ est-il atteint ?`}`, figure: figParabole(P, [], [{ x: h, y: v }]), mode: "nombre", prefixe: q === "val" ? `${up ? "Minimum" : "Maximum"} :` : "Atteint pour $x =$", attendu: q === "val" ? v : h,
        erreurs: [{ valeur: q === "val" ? h : v, message: q === "val" ? "L'extremum est une **valeur de $f$** : on lit l'ordonnée du sommet." : "On demande l'**abscisse** du sommet." }],
        aides: ["Le sommet de la parabole est le point le plus bas (minimum) ou le plus haut (maximum).", `Ses coordonnées sont $(${nb(h)}\\,;${nb(v)})$.`, q === "val" ? "L'extremum est l'ordonnée du sommet." : "La valeur où il est atteint est l'abscisse du sommet."],
        solution: `Le sommet est $(${nb(h)}\\,;${nb(v)})$ : le ${up ? "minimum" : "maximum"} de $f$ vaut $${nb(v)}$, atteint pour $x = ${nb(h)}$.` };
    }
    const bonne = up ? `$f$ est décroissante sur $]-\\infty\\,;${nb(h)}]$ et croissante sur $[${nb(h)}\\,;+\\infty[$` : `$f$ est croissante sur $]-\\infty\\,;${nb(h)}]$ et décroissante sur $[${nb(h)}\\,;+\\infty[$`;
    const ch = choix4(bonne, [up ? `$f$ est croissante sur $]-\\infty\\,;${nb(h)}]$ et décroissante sur $[${nb(h)}\\,;+\\infty[$` : `$f$ est décroissante sur $]-\\infty\\,;${nb(h)}]$ et croissante sur $[${nb(h)}\\,;+\\infty[$`, up ? `$f$ est décroissante sur $]-\\infty\\,;${nb(v)}]$ et croissante sur $[${nb(v)}\\,;+\\infty[$` : `$f$ est croissante sur $]-\\infty\\,;${nb(v)}]$ et décroissante sur $[${nb(v)}\\,;+\\infty[$`, `$f$ est ${up ? "croissante" : "décroissante"} sur $\\mathbb{R}$`]);
    return { enonce: `La courbe $C_f$ est donnée ci-dessous. Quel est le sens de variation de $f$ ?`, figure: figParabole(P), mode: "choix", choix: ch.choix, attendu: ch.attendu, figureSolution: tabSV(["−∞", nbS(h), "+∞"], [up ? "-" : "+", "", up ? "+" : "-"], ["", nbS(v), ""], "f", true),
      aides: ["Une fonction est croissante quand la courbe monte (en lisant de gauche à droite), décroissante quand elle descend.", `Le changement se fait au sommet, d'abscisse $${nb(h)}$.`, "Les intervalles de variation s'écrivent avec des **abscisses**, pas des ordonnées."],
      solution: `La courbe ${up ? "descend" : "monte"} jusqu'au sommet d'abscisse $${nb(h)}$ puis ${up ? "monte" : "descend"} : ${bonne.replace("$f$", "$f$")}.` };
  });

  def("yc-droite", () => {
    const t = pick(["lire", "lire", "tracer", "point-pente"]);
    const m = pick([-3, -2, -1, -0.5, 0.5, 1, 2, 3]), p = rand(-4, 4);
    const W = { x0: -5.5, x1: 5.5, y0: -5.5, y1: 5.5 };
    const seg = segDroite(m, p, -5.2, 5.2, -5.2, 5.2);
    const eq = (mm, pp) => `y = ${mm === 0 ? nb(pp) : aff(mm, pp)}`;
    if (t === "tracer") {
      const autres = [[m, -p || 1], [-m, p], [m + pick([1, -1]) || 1, p], [1 / m === Math.round(1 / m) ? 1 / m : -m, p + 1]].filter((l, i, A) => !(l[0] === m && l[1] === p) && A.findIndex((w) => w[0] === l[0] && w[1] === l[1]) === i).slice(0, 3);
      const lignes = shuffle([[m, p], ...autres]);
      const noms = ["d₁", "d₂", "d₃", "d₄"], bonneK = lignes.findIndex((l) => l[0] === m && l[1] === p);
      const fig = graph({ xmin: W.x0, xmax: W.x1, ymin: W.y0, ymax: W.y1, h: 300, curves: lignes.map((l, k) => { const s = segDroite(l[0], l[1], -5.2, 5.2, -5.2, 5.2); return { f: (x) => l[0] * x + l[1], a: s.a, b: s.b, label: noms[k], closed: false, couleur: k }; }), aria: "Quatre droites d1 à d4 dans un repère" });
      const ch = choix4(`$${noms[bonneK]}$`, noms.filter((_, k) => k !== bonneK).map((n) => `$${n}$`));
      return { enonce: `Laquelle de ces droites a pour équation réduite $${eq(m, p)}$ ?`, figure: fig, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: [`L'ordonnée à l'origine est $${nb(p)}$ : la droite coupe l'axe des ordonnées en $(0\\,;${nb(p)})$.`, `Le coefficient directeur est $${nb(m)}$ : quand $x$ augmente de $1$, $y$ ${m > 0 ? "augmente" : "diminue"} de $${nb(Math.abs(m))}$.`, "Repère la droite qui passe par $(0\\,;" + nb(p) + ")$ et $(1\\,;" + nb(m + p) + ")$."],
        solution: `La droite $${eq(m, p)}$ passe par $(0\\,;${nb(p)})$ et par $(1\\,;${nb(m + p)})$ : c'est $${noms[bonneK]}$.` };
    }
    if (t === "point-pente") {
      const x1 = rand(-4, 3), y1 = rand(-4, 4), x2 = x1 + pick([1, 2, 3, 4]), y2 = y1 + pick([-6, -4, -3, -2, -1, 1, 2, 3, 4, 6]);
      if (Math.abs(y2) > 5) return GEN["yc-droite"]();
      const mm = (y2 - y1) / (x2 - x1), fr2 = !Number.isInteger(mm * 100);
      return { enonce: `Une droite passe par $A(${nb(x1)}\\,;${nb(y1)})$ et $B(${nb(x2)}\\,;${nb(y2)})$. Quel est son coefficient directeur${fr2 ? " (fraction)" : ""} ?`, mode: "nombre", prefixe: "$m =$", attendu: mm,
        erreurs: [{ valeur: (x2 - x1) / (y2 - y1), message: "Le coefficient directeur est $\\dfrac{y_B - y_A}{x_B - x_A}$ : les ordonnées au numérateur." }, { valeur: -mm, message: "Attention à l'ordre : $\\dfrac{y_B - y_A}{x_B - x_A}$, les deux différences dans le même sens." }, ...(fr2 ? approx(mm) : [])],
        aides: ["$m = \\dfrac{y_B - y_A}{x_B - x_A}$ (différence des ordonnées sur différence des abscisses).", `$y_B - y_A = ${nb(y2 - y1)}$ et $x_B - x_A = ${nb(x2 - x1)}$.`, `$m = \\dfrac{${nb(y2 - y1)}}{${nb(x2 - x1)}}$.`],
        solution: `$m = \\dfrac{y_B - y_A}{x_B - x_A} = \\dfrac{${nb(y2)} - ${pr(y1)}}{${nb(x2)} - ${pr(x1)}} = \\dfrac{${nb(y2 - y1)}}{${nb(x2 - x1)}} = ${frac(y2 - y1, x2 - x1)}$.` };
    }
    const fig = graph({ xmin: W.x0, xmax: W.x1, ymin: W.y0, ymax: W.y1, h: 300, curves: [{ f: (x) => m * x + p, a: seg.a, b: seg.b, label: "d", closed: false }], points: [{ x: 0, y: p }, { x: Number.isInteger(m) ? 1 : 2, y: Number.isInteger(m) ? m + p : 2 * m + p }], aria: `Droite d passant par (0 ; ${nbS(p)}) et (1 ; ${nbS(m + p)})` });
    const q = pick(["eq", "eq", "m", "p"]);
    if (q === "eq") {
      const ch = choix4(`$${eq(m, p)}$`, [`$${eq(p, m)}$`, `$${eq(-m, p)}$`, `$${eq(m, -p)}$`, `$${eq(m === 0 ? 1 : 1 / m, p)}$`], () => `$${eq(m + rand(-2, 2) || 1, p + rand(-2, 2))}$`);
      return { enonce: `Lis graphiquement l'équation réduite de la droite $d$.`, figure: fig, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["L'équation réduite est $y = mx + p$ : $p$ est l'ordonnée du point où la droite coupe l'axe des ordonnées.", `Ici $p = ${nb(p)}$.`, `Pour $m$ : en avançant de $1$ vers la droite, on ${m > 0 ? "monte" : "descend"} de $${nb(Math.abs(m))}$.`],
        solution: `La droite coupe l'axe des ordonnées en $(0\\,;${nb(p)})$ : $p = ${nb(p)}$. Entre les deux points marqués, quand $x$ augmente de $${Number.isInteger(m) ? 1 : 2}$, $y$ varie de $${nb(Number.isInteger(m) ? m : 2 * m)}$ : $m = ${nb(m)}$. Donc $${eq(m, p)}$.` };
    }
    return { enonce: `Lis graphiquement ${q === "m" ? "le coefficient directeur" : "l'ordonnée à l'origine"} de la droite $d$.`, figure: fig, mode: "nombre", prefixe: q === "m" ? "$m =$" : "$p =$", attendu: q === "m" ? m : p,
      erreurs: [{ valeur: q === "m" ? p : m, message: q === "m" ? "Ça, c'est l'ordonnée à l'origine. Le coefficient directeur mesure la pente." : "Ça, c'est le coefficient directeur. L'ordonnée à l'origine se lit sur l'axe des ordonnées." }, { valeur: q === "m" ? -m : -p, message: "Vérifie le signe." }],
      aides: [q === "m" ? "Le coefficient directeur : de combien $y$ varie quand $x$ augmente de $1$." : "L'ordonnée à l'origine : l'ordonnée du point de la droite d'abscisse $0$.", q === "m" ? `Utilise les deux points marqués : $(0\\,;${nb(p)})$ et $(${Number.isInteger(m) ? 1 : 2}\\,;${nb(Number.isInteger(m) ? m + p : 2 * m + p)})$.` : "Regarde où la droite coupe l'axe vertical.", q === "m" ? (m > 0 ? "La droite monte : $m > 0$." : "La droite descend : $m < 0$.") : `Le point marqué sur l'axe des ordonnées est $(0\\,;${nb(p)})$.`],
      solution: q === "m" ? `Entre $(0\\,;${nb(p)})$ et $(${Number.isInteger(m) ? 1 : 2}\\,;${nb(Number.isInteger(m) ? m + p : 2 * m + p)})$ : $m = \\dfrac{${nb(Number.isInteger(m) ? m : 2 * m)}}{${Number.isInteger(m) ? 1 : 2}} = ${nb(m)}$.` : `La droite coupe l'axe des ordonnées au point $(0\\,;${nb(p)})$ : $p = ${nb(p)}$.` };
  });

  def("yc-stats", () => {
    const t = pick(["moyenne", "mediane", "barres", "barres"]);
    if (t === "barres") {
      const cats = pick([["lundi", "mardi", "mercredi", "jeudi", "vendredi"], ["6e", "5e", "4e", "3e"], ["bus", "voiture", "à pied", "vélo"], ["0", "1", "2", "3", "4"]]);
      const vals = cats.map(() => rand(2, 12) * pick([1, 5, 10]));
      const u = pick([1, 5, 10]); const V = cats.map(() => rand(2, 12) * u);
      const maxV = Math.max(...V), step = u === 1 ? 2 : u === 5 ? 10 : 20;
      const fig = graph({ xmin: -0.2, xmax: cats.length + 0.4, ymin: -maxV * 0.14, ymax: maxV * 1.15, xstep: 1, ystep: step, h: 260, xetiq: 100, bars: V.map((v, k) => ({ x: k + 0.6, y: v })), marques: cats.map((c, k) => ({ x: k + 0.6, y: -maxV * 0.09, texte: c })), aria: `Diagramme en barres : ${cats.map((c, k) => `${c} ${V[k]}`).join(", ")}` });
      const q = pick(["max", "val", "total", "diff"]);
      const kmax = V.indexOf(maxV), k = rand(0, cats.length - 1), tot = V.reduce((s, v) => s + v, 0);
      const ctx = pick(["le nombre d'élèves absents", "le nombre de ventes", "le nombre de visiteurs"]);
      if (q === "max") { const ch = choix4(cats[kmax], cats.filter((_, i) => i !== kmax)); return { enonce: `Le diagramme en barres donne ${ctx} selon la catégorie. Pour quelle catégorie la valeur est-elle la plus grande ?`, figure: fig, mode: "choix", choix: ch.choix, attendu: ch.attendu, aides: ["La valeur se lit sur la hauteur de la barre.", "Compare les hauteurs.", `La barre la plus haute atteint $${maxV}$.`], solution: `La barre la plus haute est celle de « ${cats[kmax]} » ($${maxV}$).` }; }
      if (q === "total") return { enonce: `Le diagramme en barres donne ${ctx} selon la catégorie. Quel est le total ?`, figure: fig, mode: "nombre", prefixe: "Total :", attendu: tot, erreurs: [{ valeur: maxV, message: "On demande la somme de toutes les barres." }], aides: ["Lis la hauteur de chaque barre sur l'axe vertical.", `Les valeurs : $${V.join("$, $")}$.`, "Additionne-les."], solution: `$${V.join(" + ")} = ${tot}$.` };
      if (q === "diff") { const i = rand(0, cats.length - 1); let j = rand(0, cats.length - 1); if (j === i) j = (i + 1) % cats.length; return { enonce: `Le diagramme en barres donne ${ctx} selon la catégorie. Combien y en a-t-il de plus pour « ${cats[V[i] >= V[j] ? i : j]} » que pour « ${cats[V[i] >= V[j] ? j : i]} » ?`, figure: fig, mode: "nombre", prefixe: "Différence :", attendu: Math.abs(V[i] - V[j]), erreurs: [{ valeur: V[i] + V[j], message: "On demande la différence, pas la somme." }], aides: ["Lis les deux hauteurs.", `$${Math.max(V[i], V[j])}$ et $${Math.min(V[i], V[j])}$.`, "Soustrais."], solution: `$${Math.max(V[i], V[j])} - ${Math.min(V[i], V[j])} = ${Math.abs(V[i] - V[j])}$.` }; }
      return { enonce: `Le diagramme en barres donne ${ctx} selon la catégorie. Lis la valeur pour « ${cats[k]} ».`, figure: fig, mode: "nombre", prefixe: "Valeur :", attendu: V[k], erreurs: [{ valeur: k + 1, message: "Lis la hauteur de la barre sur l'axe vertical, pas sa position." }], aides: ["Repère la barre de la bonne catégorie.", "Suis son sommet jusqu'à l'axe vertical.", `La graduation est de $${step}$ en $${step}$.`], solution: `La barre « ${cats[k]} » monte jusqu'à $${V[k]}$.` };
    }
    const n = rand(5, 9), L = Array.from({ length: n }, () => rand(4, 20));
    const ctx = pick(["notes sur 20", "températures relevées (en °C)", "nombres de buts marqués", "temps de trajet (en min)"]);
    if (t === "moyenne") {
      const s = L.reduce((a, v) => a + v, 0), moy = s / n;
      if (!Number.isInteger(moy * 100)) return GEN["yc-stats"]();
      return { enonce: `Voici une série de ${ctx} : $${L.join("$ ; $")}$. Calcule la moyenne.`, mode: "nombre", prefixe: "Moyenne :", attendu: moy,
        erreurs: [{ valeur: s, message: "Divise la somme par le nombre de valeurs." }, { valeur: s / (n - 1), message: `Il y a $${n}$ valeurs.` }],
        aides: ["Moyenne $= \\dfrac{\\text{somme des valeurs}}{\\text{nombre de valeurs}}$.", `Somme : $${s}$.`, `$\\dfrac{${s}}{${n}}$.`],
        solution: `$\\dfrac{${L.join(" + ")}}{${n}} = \\dfrac{${s}}{${n}} = ${nb(moy)}$.` };
    }
    const T = L.slice().sort((a, b) => a - b), med = n % 2 ? T[(n - 1) / 2] : (T[n / 2 - 1] + T[n / 2]) / 2;
    return { enonce: `Voici une série de ${ctx} : $${L.join("$ ; $")}$. Détermine la médiane.`, mode: "nombre", prefixe: "Médiane :", attendu: med,
      erreurs: [{ valeur: L[Math.floor(n / 2)], message: "Il faut d'abord **ranger** les valeurs dans l'ordre croissant." }, { valeur: +(L.reduce((a, v) => a + v, 0) / n).toFixed(2), message: "Ça, c'est (environ) la moyenne. La médiane partage la série rangée en deux moitiés." }],
      aides: ["Range les valeurs dans l'ordre croissant.", `Série rangée : $${T.join("$ ; $")}$.`, n % 2 ? `Il y a $${n}$ valeurs (impair) : la médiane est la valeur du milieu, la ${(n + 1) / 2}e.` : `Il y a $${n}$ valeurs (pair) : la médiane est la moyenne des deux valeurs du milieu (${n / 2}e et ${n / 2 + 1}e).`],
      solution: `Série rangée : $${T.join("$ ; $")}$. ${n % 2 ? `La valeur du milieu est $${med}$.` : `Les deux valeurs centrales sont $${T[n / 2 - 1]}$ et $${T[n / 2]}$ : médiane $\\dfrac{${T[n / 2 - 1]} + ${T[n / 2]}}{2} = ${nb(med)}$.`}` };
  });

  def("yc-vrai-faux", () => vraiFaux4([
    ["$(x - 3)(x + 5) = 0$ a pour solutions $3$ et $-5$.", true, "produit nul : $x - 3 = 0$ ou $x + 5 = 0$."],
    ["$2x - 8$ est positif pour $x > 4$.", true, "$2x - 8 > 0 \\Leftrightarrow x > 4$."],
    ["$(x - 1)(x - 4)$ est négatif entre $1$ et $4$.", true, "le produit est négatif entre les racines (coefficient $1 > 0$)."],
    ["$(2x + 1)(x - 3) = 2x^2 - 5x - 3$.", true, "double distributivité : $2x^2 - 6x + x - 3$."],
    ["La droite $y = -2x + 5$ a pour ordonnée à l'origine $5$.", true, "$p = 5$ dans $y = mx + p$."],
    ["La droite passant par $(1\\,;2)$ et $(3\\,;8)$ a pour coefficient directeur $3$.", true, "$\\dfrac{8 - 2}{3 - 1} = 3$."],
    ["Résoudre graphiquement $f(x) = 2$, c'est lire les abscisses des points de la courbe d'ordonnée $2$.", true, "on trace $y = 2$ et on lit les abscisses des intersections."],
    ["La médiane de $3$ ; $8$ ; $5$ ; $12$ ; $7$ est $7$.", true, "rangée : $3$ ; $5$ ; $7$ ; $8$ ; $12$, le milieu est $7$."],
    ["$x(x - 2) = 0$ a pour unique solution $2$.", false, "il y a aussi $x = 0$."],
    ["$-3x + 6$ est positif pour $x > 2$.", false, "le coefficient est négatif : positif pour $x < 2$."],
    ["$(x + 2)(x + 5)$ est toujours positif.", false, "il est négatif pour $x$ entre $-5$ et $-2$."],
    ["$(x + 3)^2 = x^2 + 9$.", false, "$(x + 3)^2 = x^2 + 6x + 9$."],
    ["Une droite de coefficient directeur négatif monte quand on lit de gauche à droite.", false, "elle descend."],
    ["$f(x) < 3$ se résout en lisant où la courbe est au-dessus de $y = 3$.", false, "en dessous."],
    ["La moyenne de $4$ ; $6$ ; $11$ est $6$.", false, "$\\dfrac{21}{3} = 7$ ; $6$ est la médiane."]
  ], ["Pense « produit nul », tableau de signes, double distributivité.", "Pour une droite, $m$ est la pente et $p$ l'ordonnée à l'origine.", "Graphiquement : au-dessus pour $>$, en dessous pour $<$."]));

  /* Figures du cours (chapitre 4) */
  FIGURES["yc-cours-signe"] = () => tabSigne(["−∞", "−1", "3", "+∞"], ["+", "0", "−", "0", "+"], "", [["x + 1", ["−", "0", "+", "", "+"]], ["x − 3", ["−", "", "−", "0", "+"]], ["produit", ["+", "0", "−", "0", "+"]]]);
  FIGURES["yc-cours-graphique"] = () => graph({ xmin: -3.6, xmax: 4.6, ymin: -3.6, ymax: 5.6, h: 300, curves: [{ f: (x) => (x - 1) ** 2 - 2, a: -1.7, b: 3.7, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", closed: false }], hlines: [{ y: 2, label: "y = 2" }], points: [{ x: -1, y: 2, label: "−1", gauche: true }, { x: 3, y: 2, label: "3" }], aria: "Parabole de sommet (1 ; −2) et droite y = 2 : elles se coupent en x = −1 et x = 3 ; la courbe est en dessous de la droite entre −1 et 3" });
  FIGURES["yc-cours-droite"] = () => graph({ xmin: -3.6, xmax: 4.6, ymin: -2.6, ymax: 5.6, h: 280, curves: [{ f: (x) => 2 * x - 1, a: -0.8, b: 3.3, label: "y = 2x − 1", closed: false }], points: [{ x: 0, y: -1, label: "(0 ; −1)", gauche: true }, { x: 1, y: 1, label: "(1 ; 1)" }, { x: 2, y: 3, label: "+1 → +2", gauche: true }], aria: "Droite y = 2x − 1 : elle coupe l'axe des ordonnées en −1 et monte de 2 quand x augmente de 1" });
  FIGURES["yc-cours-barres"] = () => graph({ xmin: -0.2, xmax: 5.4, ymin: -1.8, ymax: 14, xstep: 1, ystep: 2, h: 240, xetiq: 100, bars: [{ x: 0.6, y: 6 }, { x: 1.6, y: 12 }, { x: 2.6, y: 9 }, { x: 3.6, y: 3 }, { x: 4.6, y: 10 }], marques: ["bus", "voiture", "à pied", "vélo", "scooter"].map((c, k) => ({ x: k + 0.6, y: -1.1, texte: c })), ylabel: "élèves", aria: "Diagramme en barres : bus 6, voiture 12, à pied 9, vélo 3, scooter 10" });

  /* ---------- Chapitre 5 : suites numériques (préfixe ys) ---------- */
  // Suites explicites simples : { tex (en n), f }
  function suiteExplicite() {
    const t = pick(["affine", "affine", "carre", "quotient", "puissance"]);
    if (t === "affine") { const a = nz2(-6, 9), b = rand(-9, 9); return { tex: aff(a, b, "n"), f: (n) => a * n + b, type: t }; }
    if (t === "carre") { const b = rand(-6, 6), c = rand(-5, 5); return { tex: poly([1, b, c], "n"), f: (n) => n * n + b * n + c, type: t }; }
    if (t === "quotient") { const a = rand(1, 9), b = rand(1, 4); return { tex: `\\dfrac{${a}}{n + ${b}}`, f: (n) => a / (n + b), type: t, a, b }; }
    const q = pick([2, 3, 0.5]), k = pick([1, 2, 5]); return { tex: `${k === 1 ? "" : nb(k) + " \\times "}${nb(q)}^n`, f: (n) => k * q ** n, type: t };
  }
  const un = (n) => `u(${n})`;

  def("ys-termes-explicite", () => {
    const S = suiteExplicite(), n = S.type === "puissance" ? rand(0, 5) : rand(0, 8);
    const vx = S.f(n), v = arr(vx);
    if (!Number.isInteger(v * 100) && S.type !== "quotient") return GEN["ys-termes-explicite"]();
    const fr2 = !Number.isInteger(arr(vx * 10000, 6));
    const nom = pick(["u", "u", "v"]);
    return { enonce: `La suite $(${nom}(n))$ est définie pour tout entier $n \\geqslant 0$ par $${nom}(n) = ${S.tex}$. Calcule $${nom}(${n})$${fr2 ? " (fraction)" : ""}.`, mode: "nombre", prefixe: `$${nom}(${n}) =$`, attendu: fr2 ? vx : v,
      erreurs: [{ valeur: arr(S.f(n + 1)), message: `Tu as calculé $${nom}(${n + 1})$ : remplace $n$ par $${n}$, pas par $${n + 1}$.` }, { valeur: arr(S.f(n - 1)), message: `Tu as calculé $${nom}(${n - 1})$.` }, ...(fr2 ? approx(v) : [])],
      aides: [`Une formule explicite : on remplace $n$ par $${n}$ directement.`, `$${nom}(${n}) = ${S.tex.replace(/n/g, `(${n})`).replace(/\(\((\d+)\)\)/g, "($1)")}$.`, "Calcule en respectant les priorités (puissances, puis produits, puis sommes)."],
      solution: `$${nom}(${n}) = ${S.tex.replace(/n/g, `${n}`)} = ${S.type === "quotient" ? frac(S.a, n + S.b) : nb(v)}$.` };
  });

  def("ys-termes-recurrence", () => {
    const t = pick(["add", "mul", "affine", "affine", "carre"]);
    const u0 = rand(-5, 9), n = rand(2, 4);
    let rel, f;
    if (t === "add") { const b = nz2(-7, 9); rel = `u(n) ${plus(b)}`; f = (u) => u + b; }
    else if (t === "mul") { const q = pick([2, 3, -2, 0.5]); rel = `${nb(q)} \\times u(n)`; f = (u) => q * u; }
    else if (t === "carre") { rel = `u(n)^2 - ${rand(1, 5)}`; const c = +rel.match(/- (\d+)/)[1]; f = (u) => u * u - c; }
    else { const a = pick([2, 3, -1, 0.5]), b = nz2(-6, 6); rel = `${nb(a)} \\times u(n) ${plus(b)}`; f = (u) => a * u + b; }
    const termes = [u0]; for (let k = 0; k < n; k++) termes.push(arr(f(termes[k])));
    const u00 = t === "carre" ? rand(-2, 2) : u0;
    if (t === "carre") { termes.length = 0; termes.push(u00); for (let k = 0; k < n; k++) termes.push(arr(f(termes[k]))); }
    if (Math.abs(termes[n]) > 5000 || !Number.isInteger(termes[n] * 100)) return GEN["ys-termes-recurrence"]();
    const depart = pick([0, 0, 1]);
    const noms = termes.map((_, k) => k + depart);
    return { enonce: `La suite $(u(n))$ est définie par $u(${depart}) = ${nb(termes[0])}$ et, pour tout entier $n \\geqslant ${depart}$, $u(n + 1) = ${rel}$. Calcule $u(${n + depart})$.`, mode: "nombre", prefixe: `$u(${n + depart}) =$`, attendu: termes[n],
      erreurs: [{ valeur: termes[n - 1], message: `Tu t'es arrêté à $u(${n - 1 + depart})$ : il faut encore une étape.` }, { valeur: arr(f(termes[n])), message: `Tu es allé une étape trop loin : c'est $u(${n + 1 + depart})$.` }, { valeur: arr(f(n + depart)), message: "Une suite récurrente : on applique la relation au **terme précédent**, pas à $n$." }],
      aides: ["Par récurrence : chaque terme se calcule à partir du précédent.", `$u(${1 + depart}) = ${rel.replace(/u\(n\)/g, `${pr(termes[0])}`)} = ${nb(termes[1])}$.`, `Continue : $u(${2 + depart}) = ${nb(termes[2])}$${n > 2 ? `, $u(${3 + depart}) = ${nb(termes[3])}$` : ""}${n > 3 ? ", …" : ""}`],
      solution: termes.slice(1).map((v, k) => `$u(${noms[k + 1]}) = ${rel.replace(/u\(n\)/g, `${pr(termes[k])}`)} = ${nb(v)}$`).join("\n\n") + `\n\nDonc $u(${n + depart}) = ${nb(termes[n])}$.` };
  });

  def("ys-modeliser", () => {
    const S = pick([
      { ctx: (a, b) => `Un abonnement à une salle de sport coûte $${a}$ € d'inscription puis $${b}$ € par mois. On note $u(n)$ le total payé après $n$ mois.`, a: () => rand(10, 50), b: () => rand(15, 40), bonne: (a, b) => `u(n) = ${a} + ${b}n`, faux: (a, b) => [`u(n) = ${a}n + ${b}`, `u(n) = ${a + b}n`, `u(n) = ${a} \\times ${b}^n`], val: (a, b, n) => a + b * n, exp: () => "le coût augmente de la même somme chaque mois : modèle linéaire" },
      { ctx: (a, b) => `Une colonie de bactéries compte $${a}$ individus et son effectif est multiplié par $${nb(b)}$ chaque heure. On note $u(n)$ l'effectif après $n$ heures.`, a: () => pick([100, 200, 500, 1000]), b: () => pick([2, 3, 1.5]), bonne: (a, b) => `u(n) = ${a} \\times ${nb(b)}^n`, faux: (a, b) => [`u(n) = ${a} + ${nb(b)}n`, `u(n) = ${a} \\times ${nb(b)}n`, `u(n) = ${nb(b)} \\times ${a}^n`], val: (a, b, n) => a * b ** n, exp: () => "l'effectif est multiplié par le même nombre chaque heure : modèle exponentiel" },
      { ctx: (a, b) => `Un réservoir contient $${a}$ L d'eau et perd $${b}$ L par jour. On note $u(n)$ le volume restant après $n$ jours.`, a: () => pick([500, 800, 1000, 1200]), b: () => rand(10, 60), bonne: (a, b) => `u(n) = ${a} - ${b}n`, faux: (a, b) => [`u(n) = ${a} + ${b}n`, `u(n) = ${b} - ${a}n`, `u(n) = ${a} \\times 0{,}${b}^n`], val: (a, b, n) => a - b * n, exp: () => "on retire la même quantité chaque jour : modèle linéaire décroissant" },
      { ctx: (a, b) => `Un capital de $${a}$ € est placé à $${b}\\,\\%$ par an (intérêts composés). On note $u(n)$ le capital après $n$ années.`, a: () => pick([1000, 2000, 5000]), b: () => pick([2, 3, 4, 5]), bonne: (a, b) => `u(n) = ${a} \\times ${nb(1 + b / 100)}^n`, faux: (a, b) => [`u(n) = ${a} + ${b}n`, `u(n) = ${a} \\times ${nb(b / 100)}^n`, `u(n) = ${a} \\times ${nb(1 + b / 100)} \\times n`], val: (a, b, n) => a * (1 + b / 100) ** n, exp: (a, b) => `chaque année le capital est multiplié par $1 + \\dfrac{${b}}{100} = ${nb(1 + b / 100)}$ : modèle exponentiel` },
      { ctx: (a, b) => `Un motif de $${a}$ allumettes est prolongé : chaque nouveau motif ajoute $${b}$ allumettes. On note $u(n)$ le nombre d'allumettes au motif $n$, avec $u(0) = ${a}$.`, a: () => rand(3, 8), b: () => rand(2, 5), bonne: (a, b) => `u(n) = ${a} + ${b}n`, faux: (a, b) => [`u(n) = ${a}n + ${b}`, `u(n) = ${a} \\times ${b}^n`, `u(n) = ${a + b}n`], val: (a, b, n) => a + b * n, exp: () => "on ajoute toujours le même nombre : modèle linéaire" }
    ]);
    const a = S.a(), b = S.b();
    if (Math.random() < 0.5) {
      const ch = choix4(`$${S.bonne(a, b)}$`, S.faux(a, b).map((s) => `$${s}$`));
      return { enonce: `${S.ctx(a, b)} Quelle formule donne $u(n)$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Calcule $u(0)$, $u(1)$, $u(2)$ à la main.", "Ajoute-t-on toujours le même nombre (croissance linéaire) ou multiplie-t-on par le même nombre (croissance exponentielle) ?", `Teste la formule avec $n = 1$ : on doit trouver $u(1) = ${nb(arr(S.val(a, b, 1)))}$.`],
        solution: `$u(0) = ${nb(a)}$, $u(1) = ${nb(arr(S.val(a, b, 1)))}$, $u(2) = ${nb(arr(S.val(a, b, 2)))}$ : ${S.exp(a, b)}. La formule est $${S.bonne(a, b)}$.` };
    }
    const n = rand(2, 6), v = arr(S.val(a, b, n));
    if (!Number.isInteger(v * 100)) return GEN["ys-modeliser"]();
    return { enonce: `${S.ctx(a, b)} Calcule $u(${n})$.`, mode: "nombre", prefixe: `$u(${n}) =$`, attendu: v,
      erreurs: [{ valeur: arr(S.val(a, b, n - 1)), message: `C'est $u(${n - 1})$ : compte bien $${n}$ étapes depuis $u(0)$.` }, { valeur: arr(S.val(a, b, n + 1)), message: `C'est $u(${n + 1})$ : une étape de trop.` }],
      aides: [`Commence par $u(0) = ${nb(a)}$ et $u(1) = ${nb(arr(S.val(a, b, 1)))}$.`, S.exp(a, b) + ".", `Formule : $${S.bonne(a, b)}$, avec $n = ${n}$.`],
      solution: `${S.exp(a, b).charAt(0).toUpperCase() + S.exp(a, b).slice(1)}, donc $${S.bonne(a, b)}$ et $u(${n}) = ${S.bonne(a, b).replace("u(n) = ", "").replace(/n/g, String(n))} = ${nb(v)}$.` };
  });

  def("ys-variations", () => {
    const t = pick(["diff", "diff", "nature", "nature", "calcul"]);
    if (t === "calcul") {
      const S = suiteExplicite(), n = rand(0, 5), d = arr(S.f(n + 1) - S.f(n));
      if (!Number.isInteger(d * 100)) return GEN["ys-variations"]();
      return { enonce: `La suite $(u(n))$ est définie par $u(n) = ${S.tex}$. Calcule $u(${n + 1}) - u(${n})$.`, mode: "nombre", prefixe: `$u(${n + 1}) - u(${n}) =$`, attendu: d,
        erreurs: [{ valeur: -d, message: "Attention à l'ordre : $u(n + 1) - u(n)$." }, { valeur: arr(S.f(n + 1)), message: "Il faut soustraire $u(" + n + ")$." }],
        aides: [`$u(${n}) = ${nb(arr(S.f(n)))}$.`, `$u(${n + 1}) = ${nb(arr(S.f(n + 1)))}$.`, "Soustrais : terme suivant moins terme actuel."],
        solution: `$u(${n + 1}) - u(${n}) = ${nb(arr(S.f(n + 1)))} - ${pr(arr(S.f(n)))} = ${nb(d)}$${d > 0 ? " : la suite augmente entre ces deux rangs" : d < 0 ? " : la suite diminue entre ces deux rangs" : ""}.` };
    }
    if (t === "nature") {
      const S = pick([
        { tex: `${rand(2, 9)}n + ${rand(1, 9)}`, sens: "croissante", why: "c'est une suite affine de coefficient positif : $u(n + 1) - u(n)$ est une constante positive" },
        { tex: `${rand(10, 50)} - ${rand(2, 9)}n`, sens: "décroissante", why: "à chaque rang on retire la même quantité positive" },
        { tex: `${pick([2, 3, 5])}^n`, sens: "croissante", why: "chaque terme est le précédent multiplié par un nombre supérieur à $1$ (termes positifs)" },
        { tex: `${pick([100, 200, 500])} \\times 0{,}${pick([5, 8, 9])}^n`, sens: "décroissante", why: "chaque terme est le précédent multiplié par un nombre entre $0$ et $1$ (termes positifs)" },
        { tex: `(-2)^n`, sens: "ni croissante ni décroissante", why: "les termes alternent de signe : $1$, $-2$, $4$, $-8$…" },
        { tex: `n^2 - ${pick([4, 6, 8])}n`, sens: "ni croissante ni décroissante", why: "elle diminue d'abord puis augmente (par exemple $u(0) = 0$, $u(1) < 0$, puis les termes remontent)" },
        { tex: `\\dfrac{${rand(1, 9)}}{n + 1}`, sens: "décroissante", why: "le dénominateur augmente, le quotient diminue" },
        { tex: `n^2 + ${rand(1, 9)}`, sens: "croissante", why: "pour $n \\geqslant 0$, $n^2$ augmente avec $n$" },
        { tex: `(-1)^n \\times ${rand(2, 9)}`, sens: "ni croissante ni décroissante", why: "les termes alternent entre une valeur et son opposée" }
      ]);
      const ch = choix4(S.sens, ["croissante", "décroissante", "ni croissante ni décroissante", "constante"].filter((s) => s !== S.sens));
      return { enonce: `La suite $(u(n))$ est définie pour $n \\geqslant 0$ par $u(n) = ${S.tex}$. Quel est son sens de variation ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Calcule les premiers termes : $u(0)$, $u(1)$, $u(2)$, $u(3)$.", "Croissante : chaque terme est plus grand que le précédent ; décroissante : plus petit.", "Si ça monte puis descend (ou alterne), la suite n'est ni croissante ni décroissante."],
        solution: `La suite est **${S.sens}** : ${S.why}.` };
    }
    const a = nz2(-6, 6), b = rand(-9, 9), S = { tex: aff(a, b, "n"), f: (n) => a * n + b };
    const bonne = a > 0 ? `$u(n + 1) - u(n) = ${nb(a)} > 0$ : la suite est croissante` : `$u(n + 1) - u(n) = ${nb(a)} < 0$ : la suite est décroissante`;
    const ch = choix4(bonne, [a > 0 ? `$u(n + 1) - u(n) = ${nb(a)} > 0$ : la suite est décroissante` : `$u(n + 1) - u(n) = ${nb(a)} < 0$ : la suite est croissante`, `$u(n + 1) - u(n) = ${nb(b)}$ : la suite est ${b > 0 ? "croissante" : "décroissante"}`, `$u(n + 1) - u(n) = ${nb(-a)}$ : la suite est ${a > 0 ? "décroissante" : "croissante"}`]);
    return { enonce: `La suite $(u(n))$ est définie par $u(n) = ${S.tex}$. Calcule $u(n + 1) - u(n)$ et conclus.`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [`$u(n + 1) = ${nb(a)}(n + 1) ${plus(b)} = ${aff(a, a + b, "n")}$.`, `$u(n + 1) - u(n) = (${aff(a, a + b, "n")}) - (${aff(a, b, "n")})$.`, "Le signe de cette différence donne le sens de variation."],
      solution: `$u(n + 1) = ${nb(a)}(n + 1) ${plus(b)} = ${aff(a, a + b, "n")}$, donc $u(n + 1) - u(n) = ${nb(a)}$. Cette différence est ${a > 0 ? "positive : la suite est croissante" : "négative : la suite est décroissante"}.` };
  });

  def("ys-graphique", () => {
    const S = pick([
      { tex: (a, b) => aff(a, b, "n"), f: (a, b) => (n) => a * n + b, a: () => pick([1, 2, 3, -1, -2]), b: () => rand(0, 6), nature: "linéaire (points alignés)" },
      { tex: (a, b) => `${a} \\times ${nb(b)}^n`, f: (a, b) => (n) => a * b ** n, a: () => pick([1, 2]), b: () => pick([1.5, 2]), nature: "exponentielle (croissance de plus en plus rapide)" },
      { tex: (a, b) => `n^2 - ${a}n + ${b}`, f: (a, b) => (n) => n * n - a * n + b, a: () => pick([4, 5, 6]), b: () => rand(3, 8), nature: "ni linéaire ni exponentielle (descend puis remonte)" }
    ]);
    const a = S.a(), b = S.b(), f = S.f(a, b), N = 7;
    const ys = Array.from({ length: N }, (_, n) => arr(f(n)));
    if (Math.max(...ys.map(Math.abs)) > 60) return GEN["ys-graphique"]();
    const fig = nuage(ys.map((_, n) => n), ys, { xlabel: "n", ylabel: "u(n)", xstep: 1 });
    const t = pick(["lire", "lire", "formule", "sens"]);
    if (t === "lire") {
      const n = rand(0, N - 1);
      return { enonce: `Le nuage de points représente les premiers termes d'une suite $(u(n))$. Lis $u(${n})$.`, figure: fig, mode: "nombre", prefixe: `$u(${n}) =$`, attendu: ys[n],
        erreurs: [{ valeur: n, message: "$u(n)$ se lit sur l'axe vertical ; $n$ est sur l'axe horizontal." }, { valeur: ys[Math.min(n + 1, N - 1)], message: `Le point d'abscisse $${n}$, pas $${n + 1}$.` }],
        aides: [`Repère le point d'abscisse $n = ${n}$.`, "Lis son ordonnée sur l'axe vertical.", `Le point est $(${n}\\,;${nb(ys[n])})$.`],
        solution: `Le point d'abscisse $${n}$ a pour ordonnée $${nb(ys[n])}$ : $u(${n}) = ${nb(ys[n])}$.` };
    }
    if (t === "sens") {
      const diffs = ys.slice(1).map((v, k) => v - ys[k]);
      const sens = diffs.every((d) => d > 0) ? "croissante" : diffs.every((d) => d < 0) ? "décroissante" : "ni croissante ni décroissante";
      const ch = choix4(sens, ["croissante", "décroissante", "ni croissante ni décroissante", "constante"].filter((s) => s !== sens));
      return { enonce: `Le nuage de points représente les premiers termes d'une suite $(u(n))$. D'après le graphique, la suite semble :`, figure: fig, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Lis les points de gauche à droite.", "Montent-ils toujours ? descendent-ils toujours ?", `Termes : $${ys.map(nb).join("$, $")}$.`],
        solution: `Les termes sont $${ys.map(nb).join("$, $")}$ : la suite semble **${sens}**.` };
    }
    const ch = choix4(`$u(n) = ${S.tex(a, b)}$`, [`$u(n) = ${aff(a, ys[0], "n")}$`, `$u(n) = ${ys[0]} \\times 2^n$`, `$u(n) = ${ys[0]} ${pt(ys[1] - ys[0], "n")}$`, `$u(n) = n^2 + ${ys[0]}$`], (k) => `$u(n) = ${aff(k + 1, ys[0] - k, "n")}$`);
    return { enonce: `Le nuage de points représente les premiers termes d'une suite $(u(n))$. Quelle formule correspond au graphique ?`, figure: fig, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [`Lis $u(0) = ${nb(ys[0])}$, $u(1) = ${nb(ys[1])}$, $u(2) = ${nb(ys[2])}$.`, `L'allure est ${S.nature}.`, "Teste chaque formule avec $n = 0$, $1$ et $2$."],
      solution: `$u(0) = ${nb(ys[0])}$, $u(1) = ${nb(ys[1])}$, $u(2) = ${nb(ys[2])}$ : seule la formule $u(n) = ${S.tex(a, b)}$ redonne ces valeurs (allure ${S.nature}).` };
  });

  def("ys-python", () => {
    const t = pick(["termes", "termes", "somme", "liste", "seuil"]);
    const u0 = rand(1, 9), b = rand(2, 9), q = pick([2, 3]);
    if (t === "termes") {
      const n = rand(3, 5), add = Math.random() < 0.5;
      const code = `u = ${u0}\nfor k in range(${n}):\n    u = ${add ? `u + ${b}` : `${q} * u`}\nprint(u)`;
      const att = add ? u0 + n * b : u0 * q ** n;
      return { enonce: `Qu'affiche ce programme ?\n\n${py(code)}`, mode: "nombre", prefixe: "Affichage :", attendu: att,
        erreurs: [{ valeur: add ? u0 + (n - 1) * b : u0 * q ** (n - 1), message: `$\\texttt{range(${n})}$ fait $${n}$ tours.` }, { valeur: add ? u0 + (n + 1) * b : u0 * q ** (n + 1), message: `$\\texttt{range(${n})}$ fait exactement $${n}$ tours.` }],
        aides: [`$\\texttt{u}$ part de $${u0}$ et la boucle fait $${n}$ tours.`, `À chaque tour, $\\texttt{u}$ ${add ? `augmente de $${b}$` : `est multiplié par $${q}$`} : c'est la suite $u(n + 1) = ${add ? `u(n) + ${b}` : `${q}u(n)`}$.`, `Le programme affiche $u(${n})$.`],
        solution: `Le programme calcule les termes de la suite $u(0) = ${u0}$, $u(n + 1) = ${add ? `u(n) + ${b}` : `${q}u(n)`}$ et affiche $u(${n}) = ${att}$.` };
    }
    if (t === "somme") {
      const n = rand(3, 6), a = rand(1, 4);
      const code = `s = 0\nfor n in range(${n + 1}):\n    s = s + (${a} * n + ${b})\nprint(s)`;
      let att = 0; for (let k = 0; k <= n; k++) att += a * k + b;
      return { enonce: `La suite est définie par $u(n) = ${aff(a, b, "n")}$. Qu'affiche ce programme ?\n\n${py(code)}`, mode: "nombre", prefixe: "Affichage :", attendu: att,
        erreurs: [{ valeur: att - (a * n + b), message: `$\\texttt{range(${n + 1})}$ va de $0$ à $${n}$ : il y a $${n + 1}$ termes.` }, { valeur: a * n + b, message: "Le programme additionne tous les termes de $u(0)$ à $u(" + n + ")$, pas seulement le dernier." }],
        aides: [`$\\texttt{s}$ accumule les termes $u(0) + u(1) + \\dots + u(${n})$.`, `Les termes : $${Array.from({ length: n + 1 }, (_, k) => a * k + b).join("$, $")}$.`, "Additionne-les."],
        solution: `Le programme calcule $u(0) + u(1) + \\dots + u(${n}) = ${Array.from({ length: n + 1 }, (_, k) => a * k + b).join(" + ")} = ${att}$.` };
    }
    if (t === "liste") {
      const n = rand(4, 6), add = Math.random() < 0.5;
      const L = [u0]; for (let k = 1; k < n; k++) L.push(add ? L[k - 1] + b : L[k - 1] * q);
      const bonne = py(`L = [${u0}]\nfor k in range(${n - 1}):\n    L.append(${add ? `L[-1] + ${b}` : `${q} * L[-1]`})`);
      const ch = choix4(bonne, [py(`L = [${u0}]\nfor k in range(${n - 1}):\n    L.append(${add ? `L[0] + ${b}` : `${q} * L[0]`})`), py(`L = [${add ? `${u0} + ${b} * k` : `${u0} * ${q} * k`} for k in range(${n})]`), py(`L = [${u0}]\nfor k in range(${n - 1}):\n    L = L + ${add ? b : q}`)]);
      return { enonce: `La suite est définie par $u(0) = ${u0}$ et $u(n + 1) = ${add ? `u(n) + ${b}` : `${q}u(n)`}$. Quel programme construit la liste $\\texttt{${lst(L)}}$ de ses $${n}$ premiers termes ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Chaque nouveau terme se calcule à partir du **dernier** terme de la liste, $\\texttt{L[-1]}$.", `Il faut ajouter $${n - 1}$ termes après $u(0)$.`, "$\\texttt{L[0]}$ est toujours le premier terme : l'utiliser à chaque tour donnerait toujours le même résultat."],
        solution: `On part de $\\texttt{[${u0}]}$ et on ajoute $${n - 1}$ fois le terme suivant, calculé à partir du dernier élément $\\texttt{L[-1]}$ : ${bonne}` };
    }
    const seuil = pick([50, 100, 200, 500, 1000]), add = Math.random() < 0.5, pas = add ? b : q;
    let n = 0, u = u0; while (u <= seuil) { u = add ? u + pas : u * pas; n++; }
    const code = `u = ${u0}\nn = 0\nwhile u <= ${seuil}:\n    u = ${add ? `u + ${pas}` : `${pas} * u`}\n    n = n + 1\nprint(n)`;
    return { enonce: `Qu'affiche ce programme, et que représente ce nombre ?\n\n${py(code)}`, mode: "nombre", prefixe: "Affichage :", attendu: n,
      erreurs: [{ valeur: n - 1, message: `La boucle continue tant que $u \\leqslant ${seuil}$ : elle s'arrête au premier rang où $u > ${seuil}$.` }, { valeur: u, message: "Le programme affiche $\\texttt{n}$ (le rang), pas $\\texttt{u}$." }],
      aides: [`La boucle $\\texttt{while}$ tourne tant que $u \\leqslant ${seuil}$ ; $\\texttt{n}$ compte les tours.`, `Termes : $${(() => { const T = [u0]; let v = u0; while (v <= seuil) { v = add ? v + pas : v * pas; T.push(v); } return T.map(nb).join("$, $"); })()}$.`, "Le programme affiche le premier rang $n$ tel que $u(n) > " + seuil + "$."],
      solution: `La suite est $u(0) = ${u0}$, $u(n + 1) = ${add ? `u(n) + ${pas}` : `${pas}u(n)`}$. La boucle s'arrête dès que $u > ${seuil}$, ce qui arrive pour $n = ${n}$ (avec $u(${n}) = ${u}$) : le programme affiche $${n}$, le plus petit rang à partir duquel les termes dépassent $${seuil}$.` };
  });

  def("ys-seuil", () => {
    const u0 = pick([1, 2, 3, 5, 10, 20, 50, 100]), add = Math.random() < 0.5, pas = add ? rand(3, 25) : pick([1.2, 1.5, 2, 3]);
    const seuil = add ? u0 + pas * rand(4, 15) + rand(1, pas - 1 || 1) : pick([100, 200, 500, 1000, 2000, 5000]);
    if (!add && u0 >= seuil) return GEN["ys-seuil"]();
    let n = 0, u = u0; const T = [u0]; while (u <= seuil && n < 60) { u = arr(add ? u + pas : u * pas); n++; T.push(u); }
    if (n < 2 || n > 25) return GEN["ys-seuil"]();
    const ctx = add ? pick([`Une cagnotte contient $${u0}$ € et reçoit $${pas}$ € chaque semaine.`, `Un manguier mesure $${u0}$ cm et grandit de $${pas}$ cm par mois.`, `Une tirelire contient $${u0}$ € et on y ajoute $${pas}$ € par jour.`]) : pick([`Une rumeur est connue de $${u0}$ personnes et le nombre de personnes informées est multiplié par $${nb(pas)}$ chaque jour.`, `Une population de moustiques compte $${u0}$ individus et est multipliée par $${nb(pas)}$ chaque semaine.`]);
    const unite = add ? (ctx.includes("cm") ? "cm" : "€") : "";
    return { enonce: `${ctx} On note $u(n)$ la valeur après $n$ ${add ? (ctx.includes("semaine") ? "semaines" : ctx.includes("mois") ? "mois" : "jours") : (ctx.includes("jour") ? "jours" : "semaines")}. À partir de quel rang $n$ a-t-on $u(n) > ${nb(seuil)}$${unite ? " " + unite : ""} ?`, mode: "nombre", prefixe: "$n =$", attendu: n,
      erreurs: [{ valeur: n - 1, message: `Pour $n = ${n - 1}$, $u(n) = ${nb(T[n - 1])}$ ne dépasse pas encore $${nb(seuil)}$.` }, { valeur: n + 1, message: `On cherche le **premier** rang : dès $n = ${n}$, le seuil est dépassé.` }, { valeur: T[n], message: "On demande le rang $n$, pas la valeur $u(n)$." }],
      aides: [`$u(n + 1) = ${add ? `u(n) + ${pas}` : `${nb(pas)} \\times u(n)`}$ ${add ? `et $u(n) = ${u0} + ${pas}n$` : `et $u(n) = ${u0} \\times ${nb(pas)}^n$`}.`, `Calcule les termes jusqu'à dépasser $${nb(seuil)}$ : $${T.slice(0, Math.min(T.length, 6)).map(nb).join("$, $")}$${T.length > 6 ? ", …" : ""}`, `$u(${n - 1}) = ${nb(T[n - 1])} \\leqslant ${nb(seuil)}$ et $u(${n}) = ${nb(T[n])} > ${nb(seuil)}$.`],
      solution: `${add ? `$u(n) = ${u0} + ${pas}n$` : `$u(n) = ${u0} \\times ${nb(pas)}^n$`}. On a $u(${n - 1}) = ${nb(T[n - 1])} \\leqslant ${nb(seuil)}$ et $u(${n}) = ${nb(T[n])} > ${nb(seuil)}$ : le seuil est dépassé à partir du rang $n = ${n}$.${add ? ` (On peut aussi résoudre $${u0} + ${pas}n > ${nb(seuil)}$.)` : " (En Python : boucle $\\texttt{while}$ avec un compteur.)"}` };
  });

  def("ys-vrai-faux", () => vraiFaux4([
    ["Si $u(n) = 3n + 2$, alors $u(4) = 14$.", true, "$3 \\times 4 + 2 = 14$."],
    ["Si $u(0) = 5$ et $u(n + 1) = 2u(n)$, alors $u(2) = 20$.", true, "$u(1) = 10$, $u(2) = 20$."],
    ["La suite $u(n) = 7 - 2n$ est décroissante.", true, "$u(n + 1) - u(n) = -2 < 0$."],
    ["Une suite définie par récurrence se calcule terme après terme.", true, "chaque terme dépend du précédent."],
    ["Le nuage de points d'une suite $u(n) = 2n + 1$ est formé de points alignés.", true, "croissance linéaire : même augmentation à chaque rang."],
    ["La suite $u(n) = n^2$ est croissante pour $n \\geqslant 0$.", true, "$0, 1, 4, 9, \\dots$ augmente."],
    ["$u(n + 1) - u(n) > 0$ pour tout $n$ signifie que la suite est croissante.", true, "chaque terme dépasse le précédent."],
    ["Si $u(n) = 5 \\times 2^n$, alors $u(0) = 5$.", true, "$2^0 = 1$."],
    ["Si $u(n) = 3n + 2$, alors $u(n + 1) = 3n + 3$.", false, "$u(n + 1) = 3(n + 1) + 2 = 3n + 5$."],
    ["La suite $u(n) = (-1)^n$ est croissante.", false, "elle alterne $1$, $-1$, $1$…"],
    ["Si $u(0) = 2$ et $u(n + 1) = u(n) + 3$, alors $u(5) = 15$.", false, "$u(5) = 2 + 5 \\times 3 = 17$."],
    ["Pour une suite par récurrence, on peut calculer $u(10)$ sans connaître $u(9)$.", false, "il faut tous les termes précédents (sauf si on trouve une formule explicite)."],
    ["Un nuage de points d'une suite se trace en reliant les points.", false, "une suite n'est définie que pour les entiers : on ne relie pas les points."],
    ["Si $u(2) < u(3)$, la suite est croissante.", false, "il faut $u(n + 1) > u(n)$ pour **tout** $n$."],
    ["La suite $u(n) = 100 \\times 0{,}9^n$ est croissante.", false, "on multiplie par $0{,}9 < 1$ : elle décroît."]
  ], ["Distingue formule explicite ($u(n)$ en fonction de $n$) et récurrence ($u(n + 1)$ en fonction de $u(n)$).", "Teste avec les premiers termes.", "Pour le sens de variation, regarde le signe de $u(n + 1) - u(n)$ pour tout $n$."]));

  /* Figures du cours (chapitre 5) */
  FIGURES["ys-cours-nuage"] = () => nuage([0, 1, 2, 3, 4, 5, 6], [5, 2, 1, 2, 5, 10, 17], { xlabel: "n", ylabel: "u(n)", xstep: 1, aria: "Nuage de points de la suite u(n) = n² − 4n + 5 : 5, 2, 1, 2, 5, 10, 17 ; elle décroît puis croît" });
  FIGURES["ys-cours-modes"] = () => {
    let s = `<svg class="graph" viewBox="0 0 320 150" role="img" aria-label="Deux modes de génération : formule explicite u(n) = 3n + 2 donne directement u(4) = 14 ; récurrence u(n+1) = u(n) + 3 avec u(0) = 2 enchaîne 2, 5, 8, 11, 14">`;
    s += `<text class="g-label" x="10" y="22" style="font-weight:700;fill:var(--lagon)">Explicite : u(n) = 3n + 2</text><text class="g-label" x="10" y="44">n = 4 → u(4) = 3 × 4 + 2 = 14 directement</text>`;
    s += `<text class="g-label" x="10" y="84" style="font-weight:700;fill:var(--ylang)">Récurrence : u(0) = 2, u(n + 1) = u(n) + 3</text>`;
    [2, 5, 8, 11, 14].forEach((v, k) => { s += `<rect x="${12 + k * 62}" y="100" width="40" height="28" rx="6" style="fill:var(--surface);stroke:var(--ylang);stroke-width:1.5"/><text class="g-label" x="${32 + k * 62}" y="119" text-anchor="middle" style="font-weight:700">${v}</text>`; if (k < 4) s += `<text class="g-label" x="${63 + k * 62}" y="119" text-anchor="middle" style="fill:var(--ylang);font-size:10px">+3</text>`; s += `<text class="g-label" x="${32 + k * 62}" y="143" text-anchor="middle" style="font-size:10px">u(${k})</text>`; });
    return s + `</svg>`;
  };
  FIGURES["ys-cours-lineaire-expo"] = () => nuage([0, 1, 2, 3, 4, 5, 6], [2, 4, 8, 16, 32, 64, 128].map((v) => v / 4), { xlabel: "n", ylabel: "u(n)", xstep: 1, ystep: 4, points: [0, 1, 2, 3, 4, 5, 6].map((n) => ({ x: n, y: 3 + 4 * n, label: n === 6 ? "3 + 4n" : "" })).concat([0, 1, 2, 3, 4, 5, 6].map((n) => ({ x: n, y: 0.5 * 2 ** n, label: n === 6 ? "0,5 × 2ⁿ" : "" }))), aria: "Deux nuages : points alignés de la suite 3 + 4n (linéaire) et points de la suite 0,5 × 2^n qui montent de plus en plus vite (exponentielle)" });

  /* ---------- Chapitre 6 : suites arithmétiques et géométriques (préfixe yg) ---------- */
  const RAISONS_Q = [2, 3, 4, 5, 1.5, 1.2, 1.1, 0.5, 0.8, 0.9, 0.75, 1.25, 1.05];
  const puiss = (q, n) => arr(q ** n, 6);
  const termesArith = (u0, r, n) => Array.from({ length: n }, (_, k) => u0 + k * r);
  const termesGeo = (u0, q, n) => Array.from({ length: n }, (_, k) => arr(u0 * q ** k, 4));

  def("yg-reconnaitre", () => {
    const t = pick(["arith", "geo", "aucune", "arith", "geo"]);
    let T, nat, raison, why;
    if (t === "arith") { const u0 = rand(-9, 20), r = nz2(-7, 9); T = termesArith(u0, r, 5); nat = "arithmétique"; raison = r; why = `on passe d'un terme au suivant en ajoutant toujours $${nb(r)}$ : $${T[1]} - ${pr(T[0])} = ${T[2]} - ${pr(T[1])} = ${nb(r)}$`; }
    else if (t === "geo") { const u0 = pick([1, 2, 3, 4, 5, 8, 10, 16, 20, 25, 50, 100, 200, 400, 1000]), q = pick([2, 3, 4, 1.5, 0.5, 0.1, 0.2, 10]); T = termesGeo(u0, q, 5); if (T.some((v) => !Number.isInteger(v * 100))) return GEN["yg-reconnaitre"](); nat = "géométrique"; raison = q; why = `on passe d'un terme au suivant en multipliant toujours par $${nb(q)}$ : $\\dfrac{${nb(T[1])}}{${nb(T[0])}} = \\dfrac{${nb(T[2])}}{${nb(T[1])}} = ${nb(q)}$`; }
    else { const k = pick(["carres", "fibo", "mixte", "triang"]); T = k === "carres" ? [1, 4, 9, 16, 25] : k === "fibo" ? [1, 1, 2, 3, 5] : k === "triang" ? [1, 3, 6, 10, 15] : [rand(1, 5), rand(6, 9), rand(10, 15), rand(16, 25), rand(26, 40)]; nat = "ni arithmétique ni géométrique"; why = `la différence entre deux termes consécutifs change ($${T[1] - T[0]}$ puis $${T[2] - T[1]}$) et le quotient aussi`; }
    const q = pick(["nature", "nature", "raison"]);
    if (q === "raison" && t !== "aucune") return { enonce: `Les premiers termes d'une suite sont $${T.map(nb).join("$ ; $")}$. Elle est ${nat}. Quelle est sa raison ?`, mode: "nombre", prefixe: "Raison :", attendu: raison,
      erreurs: t === "arith" ? [{ valeur: -raison, message: "La raison est $u(1) - u(0)$ : attention au signe." }, { valeur: T[1] / T[0], message: "Une suite arithmétique : on cherche ce qu'on **ajoute**, pas ce par quoi on multiplie." }] : [{ valeur: T[1] - T[0], message: "Une suite géométrique : on cherche ce par quoi on **multiplie**." }, { valeur: 1 / raison, message: "La raison est $\\dfrac{u(1)}{u(0)}$ : terme suivant divisé par le précédent." }],
      aides: [t === "arith" ? "Suite arithmétique : $u(n + 1) = u(n) + r$." : "Suite géométrique : $u(n + 1) = q \\times u(n)$.", t === "arith" ? `$r = u(1) - u(0) = ${nb(T[1])} - ${pr(T[0])}$.` : `$q = \\dfrac{u(1)}{u(0)} = \\dfrac{${nb(T[1])}}{${nb(T[0])}}$.`, "Vérifie avec les termes suivants."],
      solution: `${why.charAt(0).toUpperCase() + why.slice(1)}. La raison est $${nb(raison)}$.` };
    const bonne = t === "aucune" ? nat : `${nat} de raison $${nb(raison)}$`;
    const f = t === "arith" ? [`géométrique de raison $${nb(raison)}$`, `arithmétique de raison $${nb(-raison)}$`, "ni arithmétique ni géométrique", `arithmétique de raison $${nb(T[0])}$`] : t === "geo" ? [`arithmétique de raison $${nb(raison)}$`, `géométrique de raison $${nb(T[1] - T[0])}$`, "ni arithmétique ni géométrique", `géométrique de raison $${nb(arr(1 / raison, 4))}$`] : [`arithmétique de raison $${nb(T[1] - T[0])}$`, `géométrique de raison $${nb(arr(T[1] / T[0], 2))}$`, `arithmétique de raison $${nb(T[2] - T[1])}$`];
    const ch = choix4(bonne, f);
    return { enonce: `Les premiers termes d'une suite sont $${T.map(nb).join("$ ; $")}$. Cette suite semble :`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Calcule les différences $u(1) - u(0)$, $u(2) - u(1)$… : si elles sont toutes égales, la suite est arithmétique.", "Calcule les quotients $\\dfrac{u(1)}{u(0)}$, $\\dfrac{u(2)}{u(1)}$… : s'ils sont tous égaux, la suite est géométrique.", "Si ni les différences ni les quotients ne sont constants : ni l'un ni l'autre."],
      solution: `La suite semble **${bonne}** : ${why}.` };
  });

  def("yg-arith-terme", () => {
    const t = pick(["u0", "u0", "up", "formule"]);
    const u0 = rand(-15, 30), r = nz2(-9, 12), n = rand(5, 40);
    if (t === "formule") {
      const bonne = `$u(n) = ${aff(r, u0, "n")}$`;
      const ch = choix4(bonne, [`$u(n) = ${aff(u0, r, "n")}$`, `$u(n) = ${nb(u0)} \\times ${nb(r)}^n$`, `$u(n) = ${aff(r, u0 + r, "n")}$`, `$u(n) = ${aff(r, u0 - r, "n")}$`]);
      return { enonce: `$(u(n))$ est arithmétique de premier terme $u(0) = ${nb(u0)}$ et de raison $${nb(r)}$. Quelle est l'expression de $u(n)$ en fonction de $n$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Pour une suite arithmétique, $u(n) = u(0) + n \\times r$.", `Ici $u(0) = ${nb(u0)}$ et $r = ${nb(r)}$.`, "Vérifie avec $n = 0$ (on doit retrouver $u(0)$) et $n = 1$."],
        solution: `$u(n) = u(0) + nr = ${nb(u0)} ${plus(r)} \\times n = ${aff(r, u0, "n")}$. Vérification : $u(0) = ${nb(u0)}$, $u(1) = ${nb(u0 + r)}$.` };
    }
    if (t === "up") {
      const p = rand(1, 6), up = rand(-10, 30), m = p + rand(3, 20), att = up + (m - p) * r;
      return { enonce: `$(u(n))$ est arithmétique de raison $${nb(r)}$ et $u(${p}) = ${nb(up)}$. Calcule $u(${m})$.`, mode: "nombre", prefixe: `$u(${m}) =$`, attendu: att,
        erreurs: [{ valeur: up + m * r, message: `On part de $u(${p})$, pas de $u(0)$ : il y a $${m} - ${p} = ${m - p}$ étapes.` }, { valeur: up + (m - p - 1) * r, message: `De $u(${p})$ à $u(${m})$, il y a $${m - p}$ ajouts de la raison.` }],
        aides: [`De $u(${p})$ à $u(${m})$, on ajoute la raison $${m} - ${p} = ${m - p}$ fois.`, `$u(${m}) = u(${p}) + ${m - p} \\times r$.`, `$${nb(up)} + ${m - p} \\times ${pr(r)}$.`],
        solution: `$u(${m}) = u(${p}) + (${m} - ${p}) \\times r = ${nb(up)} + ${m - p} \\times ${pr(r)} = ${nb(att)}$.` };
    }
    const att = u0 + n * r;
    return { enonce: `$(u(n))$ est arithmétique de premier terme $u(0) = ${nb(u0)}$ et de raison $${nb(r)}$. Calcule $u(${n})$.`, mode: "nombre", prefixe: `$u(${n}) =$`, attendu: att,
      erreurs: [{ valeur: u0 + (n - 1) * r, message: `De $u(0)$ à $u(${n})$, on ajoute $${n}$ fois la raison.` }, { valeur: u0 * r ** Math.min(n, 3), message: "Suite arithmétique : on **ajoute** la raison, on ne multiplie pas." }, { valeur: u0 + (n + 1) * r, message: `$u(n) = u(0) + n \\times r$ avec $n = ${n}$.` }],
      aides: ["Formule : $u(n) = u(0) + n \\times r$.", `$u(${n}) = ${nb(u0)} + ${n} \\times ${pr(r)}$.`, `$${n} \\times ${pr(r)} = ${nb(n * r)}$.`],
      solution: `$u(${n}) = u(0) + ${n}r = ${nb(u0)} + ${n} \\times ${pr(r)} = ${nb(u0)} ${plus(n * r)} = ${nb(att)}$.` };
  });

  def("yg-arith-raison", () => {
    const u0 = rand(-10, 25), r = nz2(-8, 9), p = rand(0, 5), m = p + rand(2, 12);
    const up = u0 + p * r, um = u0 + m * r;
    const q = pick(["raison", "raison", "u0"]);
    if (q === "u0" && p > 0) return { enonce: `$(u(n))$ est arithmétique, $u(${p}) = ${nb(up)}$ et $u(${m}) = ${nb(um)}$. Calcule $u(0)$.`, mode: "nombre", prefixe: "$u(0) =$", attendu: u0,
      erreurs: [{ valeur: up - r, message: `De $u(0)$ à $u(${p})$, il y a $${p}$ ajouts de la raison.` }, { valeur: r, message: "Ça, c'est la raison. On demande le premier terme." }],
      aides: [`Trouve d'abord la raison : $r = \\dfrac{u(${m}) - u(${p})}{${m} - ${p}}$.`, `$r = ${nb(r)}$.`, `Puis $u(0) = u(${p}) - ${p} \\times r$.`],
      solution: `$r = \\dfrac{${nb(um)} - ${pr(up)}}{${m} - ${p}} = \\dfrac{${nb(um - up)}}{${m - p}} = ${nb(r)}$, puis $u(0) = u(${p}) - ${p}r = ${nb(up)} - ${p} \\times ${pr(r)} = ${nb(u0)}$.` };
    return { enonce: `$(u(n))$ est arithmétique, $u(${p}) = ${nb(up)}$ et $u(${m}) = ${nb(um)}$. Quelle est sa raison ?`, mode: "nombre", prefixe: "$r =$", attendu: r,
      erreurs: [{ valeur: um - up, message: `Entre $u(${p})$ et $u(${m})$, la raison a été ajoutée $${m - p}$ fois : divise par $${m - p}$.` }, { valeur: -r, message: "Attention au signe : $u(" + m + ") - u(" + p + ")$, dans cet ordre." }, { valeur: arr((um - up) / m), message: `Il y a $${m} - ${p} = ${m - p}$ étapes, pas $${m}$.` }],
      aides: [`$u(${m}) = u(${p}) + (${m} - ${p}) \\times r$.`, `Donc $r = \\dfrac{u(${m}) - u(${p})}{${m - p}}$.`, `$\\dfrac{${nb(um)} - ${pr(up)}}{${m - p}}$.`],
      solution: `$u(${m}) - u(${p}) = ${m - p}\\,r$, donc $r = \\dfrac{${nb(um)} - ${pr(up)}}{${m - p}} = \\dfrac{${nb(um - up)}}{${m - p}} = ${nb(r)}$.` };
  });

  def("yg-geo-terme", () => {
    const t = pick(["u0", "u0", "formule", "up"]);
    const u0 = pick([1, 2, 3, 4, 5, 8, 10, 20, 50, 100, 200, 500, 1000, 2000]), q = pick([2, 3, 4, 5, 10, 1.5, 0.5, 0.1, 1.2, 1.1, 0.9, 0.8]);
    const n = q >= 2 ? rand(2, 6) : rand(2, 4);
    const att = arr(u0 * q ** n, 6);
    if (!Number.isInteger(att * 1000) || att > 1e6) return GEN["yg-geo-terme"]();
    if (t === "formule") {
      const bonne = `$u(n) = ${nb(u0)} \\times ${nb(q)}^n$`;
      const ch = choix4(bonne, [`$u(n) = ${aff(q, u0, "n")}$`, `$u(n) = ${nb(q)} \\times ${nb(u0)}^n$`, `$u(n) = ${nb(u0)} \\times ${nb(q)} \\times n$`, `$u(n) = ${nb(u0 * q)}^n$`]);
      return { enonce: `$(u(n))$ est géométrique de premier terme $u(0) = ${nb(u0)}$ et de raison $${nb(q)}$. Quelle est l'expression de $u(n)$ en fonction de $n$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Pour une suite géométrique, $u(n) = u(0) \\times q^n$.", `Ici $u(0) = ${nb(u0)}$ et $q = ${nb(q)}$.`, "Vérifie avec $n = 0$ ($q^0 = 1$) et $n = 1$."],
        solution: `$u(n) = u(0) \\times q^n = ${nb(u0)} \\times ${nb(q)}^n$. Vérification : $u(0) = ${nb(u0)}$, $u(1) = ${nb(arr(u0 * q))}$.` };
    }
    if (t === "up") {
      const p = rand(1, 4), m = p + rand(2, 4), up = u0, attm = arr(up * q ** (m - p), 6);
      if (!Number.isInteger(attm * 1000)) return GEN["yg-geo-terme"]();
      return { enonce: `$(u(n))$ est géométrique de raison $${nb(q)}$ et $u(${p}) = ${nb(up)}$. Calcule $u(${m})$.`, mode: "nombre", prefixe: `$u(${m}) =$`, attendu: attm,
        erreurs: [{ valeur: arr(up * q ** m, 6), message: `On part de $u(${p})$ : il y a $${m} - ${p} = ${m - p}$ multiplications par la raison.` }, { valeur: arr(up + (m - p) * q, 6), message: "Suite géométrique : on **multiplie** par la raison." }],
        aides: [`De $u(${p})$ à $u(${m})$, on multiplie $${m - p}$ fois par $q$.`, `$u(${m}) = u(${p}) \\times q^{${m - p}}$.`, `$${nb(up)} \\times ${nb(q)}^{${m - p}} = ${nb(up)} \\times ${nb(puiss(q, m - p))}$.`],
        solution: `$u(${m}) = u(${p}) \\times q^{${m} - ${p}} = ${nb(up)} \\times ${nb(q)}^{${m - p}} = ${nb(up)} \\times ${nb(puiss(q, m - p))} = ${nb(attm)}$.` };
    }
    return { enonce: `$(u(n))$ est géométrique de premier terme $u(0) = ${nb(u0)}$ et de raison $${nb(q)}$. Calcule $u(${n})$.`, mode: "nombre", prefixe: `$u(${n}) =$`, attendu: att,
      erreurs: [{ valeur: arr(u0 * q ** (n - 1), 6), message: `De $u(0)$ à $u(${n})$, on multiplie $${n}$ fois par la raison.` }, { valeur: arr(u0 + n * q, 6), message: "Suite géométrique : on **multiplie** par la raison, on ne l'ajoute pas." }, { valeur: arr((u0 * q) ** n, 6), message: "Seule la raison est élevée à la puissance $n$ : $u(0) \\times q^n$." }],
      aides: ["Formule : $u(n) = u(0) \\times q^n$.", `$u(${n}) = ${nb(u0)} \\times ${nb(q)}^{${n}}$.`, `$${nb(q)}^{${n}} = ${nb(puiss(q, n))}$.`],
      solution: `$u(${n}) = u(0) \\times q^{${n}} = ${nb(u0)} \\times ${nb(q)}^{${n}} = ${nb(u0)} \\times ${nb(puiss(q, n))} = ${nb(att)}$.` };
  });

  def("yg-geo-raison", () => {
    const u0 = pick([2, 3, 4, 5, 8, 10, 20, 40, 50, 100, 200, 500]), q = pick([2, 3, 4, 5, 1.5, 0.5, 0.2, 0.1, 1.2, 0.8, 2.5]);
    const p = rand(0, 4), up = arr(u0 * q ** p, 4), up1 = arr(up * q, 4);
    if (!Number.isInteger(up * 100) || !Number.isInteger(up1 * 100)) return GEN["yg-geo-raison"]();
    const t = pick(["consecutifs", "consecutifs", "deux"]);
    if (t === "deux") {
      const m = p + 2, um = arr(up * q * q, 4);
      if (!Number.isInteger(um * 100)) return GEN["yg-geo-raison"]();
      return { enonce: `$(u(n))$ est géométrique à termes positifs, $u(${p}) = ${nb(up)}$ et $u(${m}) = ${nb(um)}$. Quelle est sa raison ?`, mode: "nombre", prefixe: "$q =$", attendu: q,
        erreurs: [{ valeur: arr(um / up, 4), message: `Entre $u(${p})$ et $u(${m})$, on a multiplié **deux** fois par $q$ : $\\dfrac{u(${m})}{u(${p})} = q^2$.` }, { valeur: arr((um - up) / 2, 4), message: "Suite géométrique : on cherche un quotient, pas une différence." }],
        aides: [`$u(${m}) = u(${p}) \\times q^2$.`, `$q^2 = \\dfrac{${nb(um)}}{${nb(up)}} = ${nb(arr(um / up, 4))}$.`, "$q$ est positif (termes positifs) : prends la racine carrée."],
        solution: `$q^2 = \\dfrac{u(${m})}{u(${p})} = \\dfrac{${nb(um)}}{${nb(up)}} = ${nb(arr(um / up, 4))}$, donc $q = \\sqrt{${nb(arr(um / up, 4))}} = ${nb(q)}$ (termes positifs).` };
    }
    return { enonce: `$(u(n))$ est géométrique, $u(${p}) = ${nb(up)}$ et $u(${p + 1}) = ${nb(up1)}$. Quelle est sa raison ?`, mode: "nombre", prefixe: "$q =$", attendu: q,
      erreurs: [{ valeur: arr(up1 - up, 4), message: "Suite géométrique : la raison est le **quotient** $\\dfrac{u(n + 1)}{u(n)}$, pas la différence." }, { valeur: arr(up / up1, 4), message: "Terme suivant **divisé par** le précédent : $\\dfrac{u(" + (p + 1) + ")}{u(" + p + ")}$." }],
      aides: ["Suite géométrique : $u(n + 1) = q \\times u(n)$.", `Donc $q = \\dfrac{u(${p + 1})}{u(${p})}$.`, `$\\dfrac{${nb(up1)}}{${nb(up)}}$.`],
      solution: `$q = \\dfrac{u(${p + 1})}{u(${p})} = \\dfrac{${nb(up1)}}{${nb(up)}} = ${nb(q)}$.` };
  });

  def("yg-nature-formule", () => {
    const u0 = rand(1, 9), r = nz2(-6, 8), q = pick([2, 3, 5, 0.5, 1.5, 10]);
    const S = pick([
      { tex: aff(r, u0, "n"), nat: "arithmétique", rais: r, why: `$u(n + 1) - u(n) = ${nb(r)}(n + 1) ${plus(u0)} - (${aff(r, u0, "n")}) = ${nb(r)}$, constante : arithmétique de raison $${nb(r)}$` },
      { tex: `${u0} \\times ${nb(q)}^n`, nat: "géométrique", rais: q, why: `$\\dfrac{u(n + 1)}{u(n)} = \\dfrac{${u0} \\times ${nb(q)}^{n + 1}}{${u0} \\times ${nb(q)}^n} = ${nb(q)}$, constant : géométrique de raison $${nb(q)}$` },
      { tex: `${nb(q)}^n`, nat: "géométrique", rais: q, why: `$u(n + 1) = ${nb(q)}^{n + 1} = ${nb(q)} \\times ${nb(q)}^n = ${nb(q)} \\times u(n)$ : géométrique de raison $${nb(q)}$` },
      { tex: `n^2 + ${u0}`, nat: "ni arithmétique ni géométrique", rais: null, why: `$u(0) = ${u0}$, $u(1) = ${u0 + 1}$, $u(2) = ${u0 + 4}$ : les différences ($1$ puis $3$) ne sont pas égales, ni les quotients` },
      { tex: `${u0} - ${Math.abs(r) === 1 ? "" : Math.abs(r)}n`, nat: "arithmétique", rais: -Math.abs(r), why: `à chaque rang on retire $${Math.abs(r)}$ : $u(n + 1) - u(n) = -${Math.abs(r)}$, arithmétique de raison $${nb(-Math.abs(r))}$` },
      { tex: `\\dfrac{${u0}}{n + 1}`, nat: "ni arithmétique ni géométrique", rais: null, why: `$u(0) = ${u0}$, $u(1) = ${nb(u0 / 2)}$, $u(2) = ${frac(u0, 3)}$ : ni les différences ni les quotients ne sont constants` },
      { tex: `${u0 + 1} \\times n`, nat: "arithmétique", rais: u0 + 1, why: `$u(n + 1) - u(n) = ${u0 + 1}(n + 1) - ${u0 + 1}n = ${u0 + 1}$ : arithmétique de raison $${u0 + 1}$ (et de premier terme $0$)` }
    ]);
    const bonne = S.rais === null ? S.nat : `${S.nat} de raison $${nb(S.rais)}$`;
    const f = S.nat === "arithmétique" ? [`géométrique de raison $${nb(S.rais)}$`, `arithmétique de raison $${nb(u0)}$`, "ni arithmétique ni géométrique", `arithmétique de raison $${nb(-S.rais)}$`] : S.nat === "géométrique" ? [`arithmétique de raison $${nb(S.rais)}$`, `géométrique de raison $${nb(u0)}$`, "ni arithmétique ni géométrique", `arithmétique de raison $${nb(u0)}$`] : [`arithmétique de raison $${nb(u0)}$`, `géométrique de raison $${nb(u0)}$`, "arithmétique de raison $1$", "géométrique de raison $2$"];
    const ch = choix4(bonne, f.filter((x) => x !== bonne));
    return { enonce: `La suite $(u(n))$ est définie pour tout $n \\geqslant 0$ par $u(n) = ${S.tex}$. Elle est :`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Calcule $u(n + 1) - u(n)$ : si c'est une constante, la suite est arithmétique de cette raison.", "Calcule $\\dfrac{u(n + 1)}{u(n)}$ : si c'est une constante, la suite est géométrique de cette raison.", "Sinon, teste avec les premiers termes pour voir que ni l'un ni l'autre ne marche."],
      solution: `${S.why.charAt(0).toUpperCase() + S.why.slice(1)}.` };
  });

  def("yg-variation", () => {
    const t = pick(["arith", "geo", "geo"]);
    if (t === "arith") {
      const u0 = rand(-9, 20), r = nz2(-8, 9);
      const bonne = r > 0 ? `croissante, car $r = ${nb(r)} > 0$` : `décroissante, car $r = ${nb(r)} < 0$`;
      const ch = choix4(bonne, [r > 0 ? `décroissante, car $r = ${nb(r)} > 0$` : `croissante, car $r = ${nb(r)} < 0$`, `${u0 > 0 ? "croissante" : "décroissante"}, car $u(0) = ${nb(u0)}$`, "constante, car la raison ne change pas"]);
      return { enonce: `$(u(n))$ est arithmétique de premier terme $u(0) = ${nb(u0)}$ et de raison $${nb(r)}$. Quel est son sens de variation ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["$u(n + 1) - u(n) = r$ pour tout $n$.", "Le signe de $r$ donne le sens de variation.", `Ici $r = ${nb(r)}$.`],
        solution: `$u(n + 1) - u(n) = r = ${nb(r)}$, qui est ${r > 0 ? "positif : la suite est croissante" : "négatif : la suite est décroissante"} (le premier terme n'y change rien).` };
    }
    const u0 = pick([1, 2, 5, 10, 20, 50, 100, 500]), q = pick([2, 3, 1.5, 1.2, 1.05, 0.5, 0.9, 0.8, 0.75, 0.95]);
    const bonne = q > 1 ? `croissante, car $u(0) > 0$ et $q = ${nb(q)} > 1$` : `décroissante, car $u(0) > 0$ et $0 < q = ${nb(q)} < 1$`;
    const ch = choix4(bonne, [q > 1 ? `décroissante, car $q = ${nb(q)} > 1$` : `croissante, car $q = ${nb(q)} < 1$`, `croissante, car $q = ${nb(q)} > 0$`, `décroissante, car $q = ${nb(q)}$ est inférieur à $u(0)$`]);
    return { enonce: `$(u(n))$ est géométrique de premier terme $u(0) = ${nb(u0)}$ et de raison $${nb(q)}$. Quel est son sens de variation ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Les termes sont positifs ($u(0) > 0$ et $q > 0$).", "Multiplier un nombre positif par $q > 1$ l'augmente ; par $0 < q < 1$, le diminue.", `Ici $q = ${nb(q)}$.`],
      solution: `Les termes sont positifs et $q = ${nb(q)}$ ${q > 1 ? "est supérieur à $1$ : chaque terme est plus grand que le précédent, la suite est croissante" : "est entre $0$ et $1$ : chaque terme est plus petit que le précédent, la suite est décroissante"}. Par exemple $u(1) = ${nb(arr(u0 * q))}$ ${q > 1 ? ">" : "<"} $u(0) = ${nb(u0)}$.` };
  });

  def("yg-modele", () => {
    const t = pick(["geo", "geo", "arith", "formule"]);
    const [objet] = pick(OBJETS);
    if (t === "arith") {
      const u0 = pick([20, 50, 100, 150, 200]), r = pick([5, 8, 10, 12, 15, 20, 25]), n = rand(4, 12);
      const ctx = pick([`Un arbre mesure $${u0}$ cm à la plantation et grandit de $${r}$ cm chaque mois.`, `Une tirelire contient $${u0}$ € et reçoit $${r}$ € chaque semaine.`, `Un abonnement coûte $${u0}$ € puis $${r}$ € par mois supplémentaire.`]);
      return { enonce: `${ctx} On note $u(n)$ la valeur après $n$ ${ctx.includes("semaine") ? "semaines" : "mois"}. De quelle nature est la suite, et que vaut $u(${n})$ ?`, mode: "choix", choix: ["", "", "", ""], attendu: 0, ...(() => { const bonne = `arithmétique de raison $${r}$ ; $u(${n}) = ${nb(u0 + n * r)}$`; const ch = choix4(bonne, [`géométrique de raison $${r}$ ; $u(${n}) = ${nb(u0 * r)}$`, `arithmétique de raison $${r}$ ; $u(${n}) = ${nb(u0 + (n - 1) * r)}$`, `arithmétique de raison $${u0}$ ; $u(${n}) = ${nb(r + n * u0)}$`]); return { choix: ch.choix, attendu: ch.attendu }; })(),
        aides: ["On ajoute toujours la même quantité : évolution absolue constante.", `$u(n + 1) = u(n) + ${r}$ et $u(0) = ${u0}$.`, `$u(n) = ${u0} + ${r}n$.`],
        solution: `On ajoute $${r}$ à chaque étape : suite arithmétique de raison $${r}$, $u(n) = ${u0} + ${r}n$ et $u(${n}) = ${u0} + ${r} \\times ${n} = ${nb(u0 + n * r)}$.` };
    }
    const u0 = pick([200, 400, 500, 800, 1000, 1500, 2000, 5000, 10000]), tx = pick([2, 3, 4, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50]) * pick([1, 1, -1]), q = cm(tx);
    const n = rand(2, 6), att = arr(u0 * q ** n, 2);
    const ctx = tx > 0 ? pick([`Une ville de $${nb(u0)}$ habitants voit sa population augmenter de $${Math.abs(tx)}\\,\\%$ par an.`, `Un capital de $${nb(u0)}$ € est placé à $${Math.abs(tx)}\\,\\%$ par an (intérêts composés).`, `Le nombre d'abonnés d'une chaîne, $${nb(u0)}$ aujourd'hui, augmente de $${Math.abs(tx)}\\,\\%$ par mois.`]) : pick([`Un scooter acheté $${nb(u0)}$ € perd $${Math.abs(tx)}\\,\\%$ de sa valeur chaque année.`, `Une quantité de médicament de $${nb(u0)}$ mg dans le sang diminue de $${Math.abs(tx)}\\,\\%$ chaque heure.`, `Un stock de $${nb(u0)}$ articles baisse de $${Math.abs(tx)}\\,\\%$ chaque semaine.`]);
    const unite = ctx.includes("habitants") ? "habitants" : ctx.includes("€") ? "€" : ctx.includes("mg") ? "mg" : ctx.includes("articles") ? "articles" : "abonnés";
    const periode = ctx.includes("an") && !ctx.includes("semaine") && !ctx.includes("heure") && !ctx.includes("mois") ? "années" : ctx.includes("mois") ? "mois" : ctx.includes("heure") ? "heures" : "semaines";
    if (t === "formule") {
      const bonne = `$u(n) = ${nb(u0)} \\times ${nb(q)}^n$`;
      const ch = choix4(bonne, [`$u(n) = ${nb(u0)} \\times ${nb(Math.abs(tx) / 100)}^n$`, `$u(n) = ${nb(u0)} ${tx > 0 ? "+" : "-"} ${nb(u0 * Math.abs(tx) / 100)}n$`, `$u(n) = ${nb(u0)} \\times ${nb(1 - tx / 100)}^n$`, `$u(n) = ${nb(u0)} + ${nb(q)}n$`]);
      return { enonce: `${ctx} On note $u(n)$ la valeur après $n$ ${periode}. Quelle formule donne $u(n)$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: [`Une évolution de $${tauxTex(tx)}$ par période : on multiplie par $1 ${tx > 0 ? "+" : "-"} \\dfrac{${Math.abs(tx)}}{100} = ${nb(q)}$ à chaque fois.`, `La suite est géométrique de raison $${nb(q)}$ et de premier terme $${nb(u0)}$.`, "$u(n) = u(0) \\times q^n$."],
        solution: `Chaque période multiplie la valeur par $${nb(q)}$ : suite géométrique de raison $${nb(q)}$, $u(n) = ${nb(u0)} \\times ${nb(q)}^n$.` };
    }
    const arrondi = !Number.isInteger(u0 * q ** n * 100);
    return { enonce: `${ctx} On note $u(n)$ la valeur après $n$ ${periode}. Calcule $u(${n})$${arrondi ? " (arrondi au centième)" : ""}.`, mode: "nombre", prefixe: `$u(${n}) =$`, attendu: arrondi ? Math.round(u0 * q ** n * 100) / 100 : att, suffixe: unite, tolerance: arrondi ? 0.005 : 1e-9,
      erreurs: [{ valeur: arr(u0 * (1 + n * tx / 100), 2), message: "Les pourcentages successifs ne s'additionnent pas : on multiplie $" + n + "$ fois par $" + nb(q) + "$." }, { valeur: arr(u0 * q ** (n - 1), 2), message: `Après $${n}$ ${periode}, on a multiplié $${n}$ fois par $${nb(q)}$.` }],
      aides: [`Évolution de $${tauxTex(tx)}$ : coefficient $${nb(q)}$ à chaque période.`, `Suite géométrique : $u(n) = ${nb(u0)} \\times ${nb(q)}^n$.`, `$u(${n}) = ${nb(u0)} \\times ${nb(q)}^{${n}}$.`],
      solution: `Suite géométrique de raison $${nb(q)}$ : $u(${n}) = ${nb(u0)} \\times ${nb(q)}^{${n}} ${arrondi ? "\\approx" : "="} ${nb(arrondi ? Math.round(u0 * q ** n * 100) / 100 : att)}$ ${unite}.` };
  });

  def("yg-graphique", () => {
    const t = pick(["arith", "geo"]);
    const N = 7;
    let ys, raison, u0;
    if (t === "arith") { u0 = rand(1, 12); raison = pick([1, 2, 3, 4, 5, -1, -2]); ys = termesArith(u0, raison, N); if (Math.min(...ys) < -2) return GEN["yg-graphique"](); }
    else { u0 = pick([1, 2, 3, 4]); raison = pick([1.5, 2]); ys = termesGeo(u0, raison, N); if (Math.max(...ys) > 100) return GEN["yg-graphique"](); }
    const fig = nuage(ys.map((_, n) => n), ys, { xlabel: "n", ylabel: "u(n)", xstep: 1 });
    const q = pick(["nature", "nature", "raison", "terme"]);
    if (q === "nature") {
      const bonne = t === "arith" ? "arithmétique : les points sont alignés" : "géométrique : les points montent de plus en plus vite";
      const ch = choix4(bonne, [t === "arith" ? "géométrique : les points montent de plus en plus vite" : "arithmétique : les points sont alignés", "ni arithmétique ni géométrique : aucune régularité", t === "arith" ? "géométrique : les points sont alignés" : "arithmétique : les points montent de plus en plus vite"]);
      return { enonce: `Le nuage représente les premiers termes d'une suite $(u(n))$. D'après le graphique, cette suite semble :`, figure: fig, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Suite arithmétique : on ajoute toujours la même quantité, les points sont sur une droite.", "Suite géométrique (raison $> 1$) : les écarts entre points successifs augmentent.", `Lis les termes : $${ys.map(nb).join("$, $")}$.`],
        solution: `Les termes sont $${ys.map(nb).join("$, $")}$ : ${t === "arith" ? `on ajoute toujours $${nb(raison)}$, les points sont alignés, la suite semble arithmétique de raison $${nb(raison)}$` : `on multiplie toujours par $${nb(raison)}$, les écarts grandissent, la suite semble géométrique de raison $${nb(raison)}$`}.` };
    }
    if (q === "terme") { const n = rand(0, N - 1); return { enonce: `Le nuage représente les premiers termes d'une suite ${t === "arith" ? "arithmétique" : "géométrique"} $(u(n))$. Lis $u(${n})$.`, figure: fig, mode: "nombre", prefixe: `$u(${n}) =$`, attendu: ys[n], erreurs: [{ valeur: n, message: "$u(n)$ est l'ordonnée du point." }], aides: [`Repère le point d'abscisse $${n}$.`, "Lis son ordonnée.", `Le point est $(${n}\\,;${nb(ys[n])})$.`], solution: `$u(${n}) = ${nb(ys[n])}$.` }; }
    return { enonce: `Le nuage représente les premiers termes d'une suite ${t === "arith" ? "arithmétique" : "géométrique"} $(u(n))$. Lis graphiquement sa raison.`, figure: fig, mode: "nombre", prefixe: "Raison :", attendu: raison,
      erreurs: [{ valeur: ys[0], message: "Ça, c'est $u(0)$. La raison relie deux termes consécutifs." }, { valeur: t === "arith" ? -raison : ys[1] - ys[0], message: t === "arith" ? "Attention au signe : $u(1) - u(0)$." : "Suite géométrique : la raison est le quotient $\\dfrac{u(1)}{u(0)}$." }],
      aides: [`Lis $u(0) = ${nb(ys[0])}$ et $u(1) = ${nb(ys[1])}$.`, t === "arith" ? "Raison $= u(1) - u(0)$." : "Raison $= \\dfrac{u(1)}{u(0)}$.", "Vérifie avec $u(2)$."],
      solution: t === "arith" ? `$u(1) - u(0) = ${nb(ys[1])} - ${nb(ys[0])} = ${nb(raison)}$ ; on retrouve le même écart entre tous les points : $r = ${nb(raison)}$.` : `$\\dfrac{u(1)}{u(0)} = \\dfrac{${nb(ys[1])}}{${nb(ys[0])}} = ${nb(raison)}$, et $\\dfrac{u(2)}{u(1)} = ${nb(raison)}$ aussi : $q = ${nb(raison)}$.` };
  });

  def("yg-demontrer", () => {
    const t = pick(["arith", "geo"]);
    if (t === "arith") {
      const a = nz2(-7, 9), b = rand(-9, 9);
      return { enonce: `On veut démontrer que la suite $u(n) = ${aff(a, b, "n")}$ est arithmétique. Calcule $u(n + 1) - u(n)$.`, mode: "nombre", prefixe: "$u(n + 1) - u(n) =$", attendu: a,
        erreurs: [{ valeur: b, message: "C'est le premier terme $u(0)$, pas la différence." }, { valeur: a + b, message: "$u(n + 1) - u(n)$ : la constante $" + nb(b) + "$ disparaît dans la soustraction." }, { valeur: -a, message: "Attention à l'ordre de la soustraction." }],
        aides: [`$u(n + 1) = ${nb(a)}(n + 1) ${plus(b)} = ${aff(a, a + b, "n")}$.`, `$u(n + 1) - u(n) = (${aff(a, a + b, "n")}) - (${aff(a, b, "n")})$.`, "Les termes en $n$ s'annulent."],
        solution: `$u(n + 1) - u(n) = ${aff(a, a + b, "n")} - (${aff(a, b, "n")}) = ${nb(a)}$, une constante : la suite est arithmétique de raison $${nb(a)}$ (et de premier terme $u(0) = ${nb(b)}$).` };
    }
    const k = rand(2, 9), q = pick([2, 3, 4, 5, 0.5, 1.5, 10]);
    return { enonce: `On veut démontrer que la suite $u(n) = ${k} \\times ${nb(q)}^n$ est géométrique. Calcule $\\dfrac{u(n + 1)}{u(n)}$.`, mode: "nombre", prefixe: "$\\dfrac{u(n + 1)}{u(n)} =$", attendu: q,
      erreurs: [{ valeur: k, message: "$" + k + "$ est le premier terme : il se simplifie dans le quotient." }, { valeur: k * q, message: "Au numérateur comme au dénominateur il y a le facteur $" + k + "$ : il se simplifie." }, { valeur: 1 / q, message: "C'est $u(n + 1)$ **sur** $u(n)$." }],
      aides: [`$u(n + 1) = ${k} \\times ${nb(q)}^{n + 1}$.`, `$\\dfrac{${k} \\times ${nb(q)}^{n + 1}}{${k} \\times ${nb(q)}^n}$ : simplifie par $${k}$.`, `$\\dfrac{${nb(q)}^{n + 1}}{${nb(q)}^n} = ${nb(q)}$.`],
      solution: `$\\dfrac{u(n + 1)}{u(n)} = \\dfrac{${k} \\times ${nb(q)}^{n + 1}}{${k} \\times ${nb(q)}^n} = ${nb(q)}$, une constante : la suite est géométrique de raison $${nb(q)}$ et de premier terme $u(0) = ${k}$.` };
  });

  def("yg-vrai-faux", () => vraiFaux4([
    ["La suite $3$ ; $7$ ; $11$ ; $15$ est arithmétique de raison $4$.", true, "on ajoute $4$ à chaque fois."],
    ["La suite $5$ ; $10$ ; $20$ ; $40$ est géométrique de raison $2$.", true, "on multiplie par $2$ à chaque fois."],
    ["Si $u(n) = 7 - 3n$, la suite est arithmétique de raison $-3$.", true, "$u(n + 1) - u(n) = -3$."],
    ["Si $u(n) = 4 \\times 1{,}5^n$, la suite est géométrique de raison $1{,}5$.", true, "$u(n) = u(0) \\times q^n$ avec $u(0) = 4$."],
    ["Une suite arithmétique de raison négative est décroissante.", true, "on retire la même quantité à chaque rang."],
    ["Une suite géométrique à termes positifs de raison $0{,}8$ est décroissante.", true, "multiplier par $0{,}8 < 1$ diminue."],
    ["Une hausse de $5\\,\\%$ par an se modélise par une suite géométrique de raison $1{,}05$.", true, "évolution relative constante : on multiplie par $1 + 0{,}05$."],
    ["Pour une suite arithmétique, $u(10) = u(0) + 10r$.", true, "formule du terme général."],
    ["La suite $1$ ; $4$ ; $9$ ; $16$ est arithmétique.", false, "les différences $3$, $5$, $7$ ne sont pas égales."],
    ["Si $u(n) = 2n + 1$, la suite est géométrique de raison $2$.", false, "elle est arithmétique de raison $2$."],
    ["Pour une suite géométrique, $u(5) = u(0) + 5q$.", false, "$u(5) = u(0) \\times q^5$."],
    ["Une suite géométrique de raison $3$ et de premier terme $-2$ est croissante.", false, "ses termes $-2$, $-6$, $-18$ diminuent (le programme se limite d'ailleurs aux termes positifs)."],
    ["Une baisse de $10\\,\\%$ par an se modélise par une suite arithmétique.", false, "le pourcentage s'applique à la valeur précédente : suite géométrique de raison $0{,}9$."],
    ["Si $u(2) = 8$ et $u(5) = 20$ pour une suite arithmétique, alors $r = 12$.", false, "$3r = 12$ donc $r = 4$."],
    ["Les points d'une suite géométrique de raison $2$ sont alignés.", false, "les écarts doublent : ce sont ceux d'une suite arithmétique qui sont alignés."]
  ], ["Arithmétique : on ajoute $r$ ; géométrique : on multiplie par $q$.", "Terme général : $u(0) + nr$ ou $u(0) \\times q^n$.", "Pensez au signe de $r$ et à la position de $q$ par rapport à $1$."]));

  /* Figures du cours (chapitre 6) */
  FIGURES["yg-cours-arith"] = () => nuage([0, 1, 2, 3, 4, 5, 6], [2, 5, 8, 11, 14, 17, 20], { xlabel: "n", ylabel: "u(n)", xstep: 1, ystep: 2, curves: [{ f: (x) => 3 * x + 2, a: -0.3, b: 6.3, closed: false }], aria: "Suite arithmétique u(0) = 2, raison 3 : points alignés sur la droite y = 3x + 2" });
  FIGURES["yg-cours-geo"] = () => nuage([0, 1, 2, 3, 4, 5, 6], [2, 3, 4.5, 6.75, 10.125, 15.1875, 22.78], { xlabel: "n", ylabel: "u(n)", xstep: 1, ystep: 2, aria: "Suite géométrique u(0) = 2, raison 1,5 : les points montent de plus en plus vite" });
  FIGURES["yg-cours-compare"] = () => nuage([0, 1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 4, 8, 16, 32, 64, 128, 256].map((v) => v / 8), { xlabel: "n", ylabel: "u(n)", xstep: 1, ystep: 4, points: [0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ x: n, y: 4 + 3 * n, label: n === 8 ? "4 + 3n" : "" })).concat([0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ x: n, y: 2 ** n / 8, label: n === 8 ? "2ⁿ ÷ 8" : "" }))), aria: "Comparaison : suite arithmétique 4 + 3n (points alignés) et suite géométrique 0,125 × 2^n, d'abord en dessous puis qui dépasse largement" });

  /* ---------- Chapitre 7 : fonctions, courbes et taux de variation (préfixe yf) ---------- */
  // Fonctions simples : { tex, f, nom }
  function fonctionSimple() {
    const t = pick(["affine", "carre", "carre", "cube", "inverse"]);
    if (t === "affine") { const a = nz2(-5, 6), b = rand(-8, 8); return { tex: aff(a, b), f: (x) => a * x + b, type: t }; }
    if (t === "carre") { const a = pick([1, 1, 2, -1, 3]), b = rand(-6, 6), c = rand(-7, 7); return { tex: poly([a, b, c]), f: (x) => a * x * x + b * x + c, type: t }; }
    if (t === "cube") { const b = rand(-5, 5), c = rand(-4, 4); return { tex: poly([1, 0, b, c]), f: (x) => x ** 3 + b * x + c, type: t }; }
    const k = rand(1, 9); return { tex: `\\dfrac{${k}}{x}`, f: (x) => k / x, type: t, k };
  }

  def("yf-image", () => {
    const F = fonctionSimple(), x = F.type === "inverse" ? pick([-4, -2, -1, 1, 2, 4, 5, 0.5]) : rand(-5, 6);
    const vx = F.f(x), v = arr(vx);
    const fr2 = !Number.isInteger(arr(vx * 10000, 6));
    const t = pick(["image", "image", "notation"]);
    if (t === "notation") {
      const bonne = `l'image de $${nb(x)}$ par $f$ est $${fr2 ? frac(F.k, x) : nb(v)}$`;
      const ch = choix4(bonne, [`l'antécédent de $${nb(x)}$ par $f$ est $${fr2 ? frac(F.k, x) : nb(v)}$`, `l'image de $${fr2 ? frac(F.k, x) : nb(v)}$ par $f$ est $${nb(x)}$`, `le point $(${fr2 ? frac(F.k, x) : nb(v)}\\,;${nb(x)})$ est sur la courbe de $f$`]);
      return { enonce: `On pose $f(x) = ${F.tex}$. On a $f(${nb(x)}) = ${fr2 ? frac(F.k, x) : nb(v)}$. Que signifie cette égalité ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["$f(a) = b$ se lit : « l'image de $a$ par $f$ est $b$ », ou « $a$ est un antécédent de $b$ ».", "Le point de coordonnées $(a\\,;b)$ est alors sur la courbe (abscisse d'abord).", "Ne pas confondre $a$ (on part de lui) et $b$ (on arrive à lui)."],
        solution: `$f(${nb(x)}) = ${fr2 ? frac(F.k, x) : nb(v)}$ signifie que ${bonne}. Autrement dit, $${nb(x)}$ est un antécédent de $${fr2 ? frac(F.k, x) : nb(v)}$, et le point $(${nb(x)}\\,;${fr2 ? frac(F.k, x) : nb(v)})$ est sur la courbe.` };
    }
    return { enonce: `On pose $f(x) = ${F.tex}$. Calcule $f(${nb(x)})$${fr2 ? " (fraction)" : ""}.`, mode: "nombre", prefixe: `$f(${nb(x)}) =$`, attendu: fr2 ? vx : v,
      erreurs: [{ valeur: F.type === "carre" ? arr(F.f(-x)) : arr(F.f(x + 1)), message: F.type === "carre" ? "Attention au signe : $(-a)^2 = a^2$ mais le terme en $x$ change de signe." : "Vérifie la valeur remplacée." }, { valeur: F.type === "carre" || F.type === "cube" ? arr(-vx) : arr(1 / vx), message: "Vérifie les signes." }, ...(fr2 ? approx(vx) : [])],
      aides: [`Remplace $x$ par $${nb(x)}$ dans l'expression${x < 0 ? ", avec des parenthèses autour du négatif" : ""}.`, `$f(${nb(x)}) = ${F.tex.replace(/x/g, `(${nb(x)})`)}$.`, "Respecte les priorités : puissances d'abord, puis produits, puis sommes."],
      solution: `$f(${nb(x)}) = ${F.tex.replace(/x/g, `(${nb(x)})`)} = ${fr2 ? frac(F.k, x) : nb(v)}$.` };
  });

  def("yf-antecedent", () => {
    const t = pick(["affine", "affine", "carre", "lecture"]);
    if (t === "carre") {
      const k = pick([0, 1, 4, 9, 16, 25, 36, 49]), c = rand(-5, 5);
      const sol = k === 0 ? [0] : [-Math.sqrt(k), Math.sqrt(k)];
      return { enonce: `On pose $f(x) = x^2 ${plus(c)}$. Détermine le ou les antécédents de $${nb(k + c)}$ par $f$ (séparés par « ; »).`, mode: "ensemble", attendu: sol,
        aides: [`On résout $f(x) = ${nb(k + c)}$, c'est-à-dire $x^2 ${plus(c)} = ${nb(k + c)}$.`, `$x^2 = ${k}$.`, k === 0 ? "Un seul nombre a pour carré $0$." : `Deux nombres ont pour carré $${k}$ : $${Math.sqrt(k)}$ et $-${Math.sqrt(k)}$.`],
        solution: `$x^2 ${plus(c)} = ${nb(k + c)} \\Leftrightarrow x^2 = ${k}$ : ${k === 0 ? "$x = 0$, un seul antécédent" : `$x = ${Math.sqrt(k)}$ ou $x = -${Math.sqrt(k)}$, deux antécédents`}.` };
    }
    if (t === "lecture") {
      const P = paraboleQ(), m = rand(1, 3), k = P.f(P.h + m);
      if (Math.abs(k) > 6) return GEN["yf-antecedent"]();
      const q = pick(["nb", "nb", "aucun"]);
      if (q === "aucun") {
        const kk = P.s > 0 ? P.v - rand(1, 3) : P.v + rand(1, 3);
        if (Math.abs(kk) > 6) return GEN["yf-antecedent"]();
        const sol = kk === P.v ? [P.h] : [];
        return { enonce: `La courbe $C_f$ est donnée. Combien le nombre $${nb(kk)}$ a-t-il d'antécédents par $f$ ?`, figure: figParabole(P, [{ y: kk, label: `y = ${nbS(kk)}` }]), mode: "nombre", prefixe: "Nombre d'antécédents :", attendu: 0,
          erreurs: [{ valeur: 2, message: `La droite $y = ${nb(kk)}$ ne coupe pas la courbe.` }, { valeur: 1, message: "La droite ne touche pas la courbe : aucun point d'intersection." }],
          aides: [`Trace la droite horizontale $y = ${nb(kk)}$.`, "Compte les points d'intersection avec la courbe.", `La courbe reste ${P.s > 0 ? "au-dessus" : "en dessous"} de cette droite.`],
          solution: `La droite $y = ${nb(kk)}$ ne coupe pas $C_f$ (le ${P.s > 0 ? "minimum" : "maximum"} de $f$ est $${nb(P.v)}$) : $${nb(kk)}$ a $0$ antécédent.` };
      }
      return { enonce: `La courbe $C_f$ est donnée. Combien le nombre $${nb(k)}$ a-t-il d'antécédents par $f$ ?`, figure: figParabole(P, [{ y: k, label: `y = ${nbS(k)}` }]), mode: "nombre", prefixe: "Nombre d'antécédents :", attendu: 2,
        erreurs: [{ valeur: 1, message: "La droite coupe la courbe en **deux** points." }, { valeur: 0, message: `La droite $y = ${nb(k)}$ coupe bien la courbe.` }],
        aides: [`Trace la droite horizontale $y = ${nb(k)}$.`, "Compte les points d'intersection avec la courbe.", "Chaque point d'intersection donne un antécédent (son abscisse)."],
        solution: `La droite $y = ${nb(k)}$ coupe $C_f$ en deux points, d'abscisses $${nb(P.h - m)}$ et $${nb(P.h + m)}$ : $${nb(k)}$ a $2$ antécédents.` };
    }
    const a = nz2(-6, 8), b = rand(-9, 9), x = rand(-6, 8), k = a * x + b;
    return { enonce: `On pose $f(x) = ${aff(a, b)}$. Détermine l'antécédent de $${nb(k)}$ par $f$.`, mode: "nombre", prefixe: "Antécédent :", attendu: x,
      erreurs: [{ valeur: a * k + b, message: `Tu as calculé $f(${nb(k)})$, l'image de $${nb(k)}$. On cherche $x$ tel que $f(x) = ${nb(k)}$.` }, { valeur: arr((k + b) / a), message: `Résous $${aff(a, b)} = ${nb(k)}$ : commence par ${b >= 0 ? "retirer" : "ajouter"} $${Math.abs(b)}$.` }],
      aides: [`Chercher l'antécédent de $${nb(k)}$, c'est résoudre $f(x) = ${nb(k)}$.`, `$${aff(a, b)} = ${nb(k)}$, donc $${coef(a, "x")} = ${nb(k - b)}$.`, `$x = \\dfrac{${nb(k - b)}}{${nb(a)}}$.`],
      solution: `$${aff(a, b)} = ${nb(k)} \\Leftrightarrow ${coef(a, "x")} = ${nb(k - b)} \\Leftrightarrow x = ${nb(x)}$. L'antécédent de $${nb(k)}$ est $${nb(x)}$ (vérification : $f(${nb(x)}) = ${nb(k)}$).` };
  });

  def("yf-taux", () => {
    const t = pick(["calcul", "calcul", "contexte", "contexte"]);
    if (t === "contexte") {
      const C = pick([
        { g: "la température (en °C)", v: "l'heure", u: "°C par heure", x: () => [rand(6, 10), rand(12, 16)], y: () => [rand(22, 26), rand(28, 34)] },
        { g: "la distance parcourue (en km)", v: "le temps (en h)", u: "km/h", x: () => [rand(0, 2), rand(3, 5)], y: () => [rand(0, 40), rand(120, 300)] },
        { g: "le nombre d'abonnés", v: "le mois", u: "abonnés par mois", x: () => [rand(1, 3), rand(5, 9)], y: () => [rand(100, 300), rand(400, 900)] },
        { g: "la hauteur d'eau du lagon (en cm)", v: "l'heure", u: "cm par heure", x: () => [rand(8, 10), rand(12, 14)], y: () => [rand(250, 320), rand(60, 150)] }
      ]);
      const [x1, x2] = C.x(), [y1, y2] = C.y();
      const tx = (y2 - y1) / (x2 - x1), fr2 = !Number.isInteger(tx * 100);
      const arrondi = fr2;
      const att = arrondi ? Math.round(tx * 10) / 10 : tx;
      return { enonce: `Une fonction $f$ donne ${C.g} en fonction de ${C.v} $x$. On sait que $f(${x1}) = ${nb(y1)}$ et $f(${x2}) = ${nb(y2)}$. Calcule le taux de variation de $f$ entre $${x1}$ et $${x2}$, en ${C.u}${arrondi ? " (arrondi au dixième)" : ""}.`, mode: "nombre", prefixe: "Taux :", attendu: att, tolerance: arrondi ? 0.05 : 1e-9,
        erreurs: [{ valeur: y2 - y1, message: "Il faut diviser la variation de $f$ par la variation de $x$." }, { valeur: arrondi ? Math.round((x2 - x1) / (y2 - y1) * 10) / 10 : (x2 - x1) / (y2 - y1), message: "Le taux est $\\dfrac{f(b) - f(a)}{b - a}$ : la variation de $f$ au numérateur." }, { valeur: -att, message: "Attention à l'ordre des soustractions (le même en haut et en bas)." }],
        aides: ["Taux de variation entre $a$ et $b$ : $\\dfrac{f(b) - f(a)}{b - a}$.", `$f(${x2}) - f(${x1}) = ${nb(y2 - y1)}$ et $${x2} - ${x1} = ${x2 - x1}$.`, `$\\dfrac{${nb(y2 - y1)}}{${x2 - x1}}$.`],
        solution: `$\\dfrac{f(${x2}) - f(${x1})}{${x2} - ${x1}} = \\dfrac{${nb(y2)} - ${nb(y1)}}{${x2 - x1}} = \\dfrac{${nb(y2 - y1)}}{${x2 - x1}} ${arrondi ? "\\approx" : "="} ${nb(att)}$ ${C.u} : ${tx > 0 ? "en moyenne, la grandeur augmente" : "en moyenne, la grandeur diminue"} de $${nb(Math.abs(att))}$ par unité de $x$ sur cet intervalle.` };
    }
    const F = fonctionSimple();
    if (F.type === "inverse") return GEN["yf-taux"]();
    const a = rand(-4, 3), b = a + rand(1, 4), ya = F.f(a), yb = F.f(b), tx = (yb - ya) / (b - a), fr2 = !Number.isInteger(tx * 100);
    return { enonce: `On pose $f(x) = ${F.tex}$. Calcule le taux de variation de $f$ entre $${nb(a)}$ et $${nb(b)}$${fr2 ? " (fraction)" : ""}.`, mode: "nombre", prefixe: "Taux :", attendu: tx,
      erreurs: [{ valeur: yb - ya, message: `Divise par $b - a = ${b - a}$.` }, { valeur: -tx, message: "Même ordre au numérateur et au dénominateur : $\\dfrac{f(b) - f(a)}{b - a}$." }, ...(fr2 ? approx(tx) : [])],
      aides: ["Taux de variation : $\\dfrac{f(b) - f(a)}{b - a}$.", `$f(${nb(a)}) = ${nb(ya)}$ et $f(${nb(b)}) = ${nb(yb)}$.`, `$\\dfrac{${nb(yb)} - ${pr(ya)}}{${nb(b)} - ${pr(a)}} = \\dfrac{${nb(yb - ya)}}{${b - a}}$.`],
      solution: `$f(${nb(a)}) = ${nb(ya)}$ et $f(${nb(b)}) = ${nb(yb)}$. Taux : $\\dfrac{${nb(yb)} - ${pr(ya)}}{${nb(b)} - ${pr(a)}} = \\dfrac{${nb(yb - ya)}}{${b - a}} = ${frac(yb - ya, b - a)}$.\n\nC'est la pente de la sécante passant par les points de la courbe d'abscisses $${nb(a)}$ et $${nb(b)}$.` };
  });

  def("yf-secante", () => {
    const P = paraboleQ(), a = rand(P.h - 3, P.h - 1), b = a + rand(1, 4);
    const ya = P.f(a), yb = P.f(b);
    if (Math.abs(ya) > 6 || Math.abs(yb) > 6 || a < -5 || b > 5) return GEN["yf-secante"]();
    const m = (yb - ya) / (b - a);
    const fig = (() => { const o = { xmin: -5.6, xmax: 5.6, ymin: -6.6, ymax: 6.6, h: 300, curves: [{ f: P.f, a: Math.max(-5.3, P.h - Math.sqrt(Math.max(0, (P.s > 0 ? 6.3 - P.v : P.v + 6.3)))), b: Math.min(5.3, P.h + Math.sqrt(Math.max(0, (P.s > 0 ? 6.3 - P.v : P.v + 6.3)))), label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", closed: false }, { f: (x) => ya + m * (x - a), a: Math.max(-5.3, a - 1.2), b: Math.min(5.3, b + 1.2), closed: false }], points: [{ x: a, y: ya, label: `A(${nbS(a)} ; ${nbS(ya)})`, gauche: true }, { x: b, y: yb, label: `B(${nbS(b)} ; ${nbS(yb)})` }], aria: `Parabole et sécante passant par A(${nbS(a)} ; ${nbS(ya)}) et B(${nbS(b)} ; ${nbS(yb)})` }; return tiret(graph(o), 1); })();
    const t = pick(["pente", "pente", "signe"]);
    if (t === "signe") {
      const bonne = m > 0 ? "positif : la sécante monte, $f(b) > f(a)$" : m < 0 ? "négatif : la sécante descend, $f(b) < f(a)$" : "nul : la sécante est horizontale, $f(a) = f(b)$";
      const ch = choix4(bonne, ["positif : la sécante monte, $f(b) > f(a)$", "négatif : la sécante descend, $f(b) < f(a)$", "nul : la sécante est horizontale, $f(a) = f(b)$", "impossible à connaître sans l'expression de $f$"].filter((s) => s !== bonne));
      return { enonce: `La droite $(AB)$ est la sécante à $C_f$ passant par les points d'abscisses $${nb(a)}$ et $${nb(b)}$. Quel est le signe du taux de variation de $f$ entre $${nb(a)}$ et $${nb(b)}$ ?`, figure: fig, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Le taux de variation est le coefficient directeur de la sécante $(AB)$.", "Une droite qui monte (de gauche à droite) a un coefficient directeur positif.", `Compare $f(${nb(a)}) = ${nb(ya)}$ et $f(${nb(b)}) = ${nb(yb)}$.`],
        solution: `Le taux de variation est la pente de $(AB)$ : $\\dfrac{${nb(yb)} - ${pr(ya)}}{${nb(b)} - ${pr(a)}} = ${frac(yb - ya, b - a)}$, ${bonne}.` };
    }
    const fr2 = !Number.isInteger(m * 100);
    return { enonce: `La droite $(AB)$ est la sécante à $C_f$ passant par $A$ et $B$. Calcule son coefficient directeur, c'est-à-dire le taux de variation de $f$ entre $${nb(a)}$ et $${nb(b)}$${fr2 ? " (fraction)" : ""}.`, figure: fig, mode: "nombre", prefixe: "Taux :", attendu: m,
      erreurs: [{ valeur: yb - ya, message: `Divise par $${nb(b)} - ${pr(a)} = ${b - a}$.` }, { valeur: -m, message: "Même ordre au numérateur et au dénominateur." }, ...(fr2 ? approx(m) : [])],
      aides: ["Coefficient directeur de $(AB)$ : $\\dfrac{y_B - y_A}{x_B - x_A}$.", `$A(${nb(a)}\\,;${nb(ya)})$ et $B(${nb(b)}\\,;${nb(yb)})$.`, `$\\dfrac{${nb(yb)} - ${pr(ya)}}{${nb(b)} - ${pr(a)}}$.`],
      solution: `Taux de variation $= \\dfrac{f(${nb(b)}) - f(${nb(a)})}{${nb(b)} - ${pr(a)}} = \\dfrac{${nb(yb)} - ${pr(ya)}}{${b - a}} = ${frac(yb - ya, b - a)}$ : c'est la pente de la sécante $(AB)$.` };
  });

  def("yf-monotonie", () => {
    const t = pick(["taux", "taux", "comparer", "comparer", "tableau"]);
    if (t === "comparer") {
      const a = rand(-6, 4), b = a + rand(1, 5), sens = pick(["croissante", "décroissante"]);
      const bonne = sens === "croissante" ? `$f(${nb(a)}) \\leqslant f(${nb(b)})$` : `$f(${nb(a)}) \\geqslant f(${nb(b)})$`;
      const ch = choix4(bonne, [sens === "croissante" ? `$f(${nb(a)}) \\geqslant f(${nb(b)})$` : `$f(${nb(a)}) \\leqslant f(${nb(b)})$`, `$f(${nb(a)}) = f(${nb(b)})$`, "On ne peut pas comparer sans l'expression de $f$"]);
      const I = `[${nb(a - rand(0, 2))}\\,;${nb(b + rand(0, 2))}]`;
      return { enonce: `La fonction $f$ est ${sens} sur $${I}$. Que peut-on dire de $f(${nb(a)})$ et $f(${nb(b)})$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: [sens === "croissante" ? "Croissante : les images sont rangées dans le même ordre que les nombres." : "Décroissante : les images sont rangées dans l'ordre inverse des nombres.", `$${nb(a)} < ${nb(b)}$.`, "Conclus sur l'ordre des images."],
        solution: `$${nb(a)} < ${nb(b)}$ et $f$ est ${sens} sur $${I}$ : ${sens === "croissante" ? "les images sont dans le même ordre" : "les images sont dans l'ordre inverse"}, donc ${bonne}.` };
    }
    if (t === "tableau") {
      const x0 = rand(-4, 0), x1 = x0 + rand(1, 3), x2 = x1 + rand(1, 3), y0 = rand(-5, 5), y1 = y0 + pick([-4, -3, 3, 4]), y2 = y1 + pick([-4, -3, 3, 4]);
      const fig = tabSV([nbS(x0), nbS(x1), nbS(x2)], [y1 > y0 ? "+" : "-", "", y2 > y1 ? "+" : "-"], [nbS(y0), nbS(y1), nbS(y2)], "f", true);
      const q = pick(["max", "signe", "lire"]);
      if (q === "lire") { const k = pick([0, 1, 2]), xs = [x0, x1, x2], ys = [y0, y1, y2]; return { enonce: `Voici le tableau de variations de $f$ sur $[${nb(x0)}\\,;${nb(x2)}]$. Que vaut $f(${nb(xs[k])})$ ?`, figure: fig, mode: "nombre", prefixe: `$f(${nb(xs[k])}) =$`, attendu: ys[k], erreurs: [{ valeur: xs[k], message: "Les images sont sur la ligne du bas, les valeurs de $x$ sur la ligne du haut." }], aides: ["La première ligne donne les valeurs de $x$, la seconde les images aux bornes.", `Repère la colonne de $x = ${nb(xs[k])}$.`, "L'image est le nombre écrit sous cette valeur."], solution: `Dans la colonne $x = ${nb(xs[k])}$, on lit $f(${nb(xs[k])}) = ${nb(ys[k])}$.` }; }
      const M = Math.max(y0, y1, y2), xM = [x0, x1, x2][[y0, y1, y2].indexOf(M)];
      if (q === "max") return { enonce: `Voici le tableau de variations de $f$ sur $[${nb(x0)}\\,;${nb(x2)}]$. Quel est le maximum de $f$ sur cet intervalle ?`, figure: fig, mode: "nombre", prefixe: "Maximum :", attendu: M, erreurs: [{ valeur: xM, message: "Le maximum est une **image** (ligne du bas), atteinte en $x = " + nb(xM) + "$." }, { valeur: Math.min(y0, y1, y2), message: "Ça, c'est le minimum." }], aides: ["Le maximum est la plus grande image.", "Compare les valeurs de la ligne du bas.", `La plus grande est $${nb(M)}$.`], solution: `La plus grande valeur de la ligne des images est $${nb(M)}$, atteinte pour $x = ${nb(xM)}$ : le maximum de $f$ est $${nb(M)}$.` };
      const k = pick([0, 1]), xs = [x0, x1, x2], mont = [y1 > y0, y2 > y1][k];
      const bonne = mont ? `positif, car $f$ est croissante sur $[${nb(xs[k])}\\,;${nb(xs[k + 1])}]$` : `négatif, car $f$ est décroissante sur $[${nb(xs[k])}\\,;${nb(xs[k + 1])}]$`;
      const ch = choix4(bonne, [mont ? `négatif, car $f$ est croissante sur $[${nb(xs[k])}\\,;${nb(xs[k + 1])}]$` : `positif, car $f$ est décroissante sur $[${nb(xs[k])}\\,;${nb(xs[k + 1])}]$`, "nul, car le tableau ne donne pas l'expression de $f$", mont ? "négatif, car les images diminuent" : "positif, car les images augmentent"]);
      return { enonce: `Voici le tableau de variations de $f$. Quel est le signe du taux de variation de $f$ entre $${nb(xs[k])}$ et $${nb(xs[k + 1])}$ ?`, figure: fig, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Sur un intervalle où $f$ est croissante, le taux de variation entre deux valeurs est positif.", "Sur un intervalle où $f$ est décroissante, il est négatif.", `La flèche entre $${nb(xs[k])}$ et $${nb(xs[k + 1])}$ ${mont ? "monte" : "descend"}.`],
        solution: `Entre $${nb(xs[k])}$ et $${nb(xs[k + 1])}$, la flèche ${mont ? "monte" : "descend"} : $f$ est ${mont ? "croissante" : "décroissante"}, et le taux $\\dfrac{f(${nb(xs[k + 1])}) - f(${nb(xs[k])})}{${nb(xs[k + 1])} - ${pr(xs[k])}} = \\dfrac{${nb([y0, y1, y2][k + 1] - [y0, y1, y2][k])}}{${xs[k + 1] - xs[k]}}$ est ${mont ? "positif" : "négatif"}.` };
    }
    const a = nz2(-6, 6), b = rand(-5, 5), x1 = rand(-5, 3), x2 = x1 + rand(1, 5);
    const bonne = a > 0 ? `Le taux vaut $${nb(a)} > 0$ : $f$ est croissante sur $\\mathbb{R}$` : `Le taux vaut $${nb(a)} < 0$ : $f$ est décroissante sur $\\mathbb{R}$`;
    const ch = choix4(bonne, [a > 0 ? `Le taux vaut $${nb(a)} > 0$ : $f$ est décroissante sur $\\mathbb{R}$` : `Le taux vaut $${nb(a)} < 0$ : $f$ est croissante sur $\\mathbb{R}$`, `Le taux vaut $${nb(b)}$ : $f$ est ${b >= 0 ? "croissante" : "décroissante"}`, `Le taux dépend des valeurs choisies : on ne peut pas conclure`]);
    return { enonce: `On pose $f(x) = ${aff(a, b)}$. Calcule le taux de variation de $f$ entre deux valeurs quelconques $x_1 < x_2$ et conclus.`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [`$f(x_2) - f(x_1) = (${aff(a, b).replace(/x/g, "x_2")}) - (${aff(a, b).replace(/x/g, "x_1")}) = ${coef(a, "(x_2 - x_1)")}$.`, "Divise par $x_2 - x_1$.", "Un taux toujours positif signifie que $f$ est croissante ; toujours négatif, décroissante."],
      solution: `$\\dfrac{f(x_2) - f(x_1)}{x_2 - x_1} = \\dfrac{${coef(a, "(x_2 - x_1)")}}{x_2 - x_1} = ${nb(a)}$ pour toutes valeurs $x_1 \\neq x_2$. ${bonne}. (Pour une fonction affine, le taux est toujours le coefficient directeur.)` };
  });

  def("yf-modeliser", () => {
    const S = pick([
      { ctx: (a, b) => `Un taxi facture $${a}$ € de prise en charge puis $${nb(b)}$ € par kilomètre. On note $f(x)$ le prix (en €) d'une course de $x$ km.`, a: () => rand(2, 6), b: () => pick([1.5, 2, 2.5, 3]), bonne: (a, b) => `f(x) = ${nb(b)}x + ${a}`, faux: (a, b) => [`f(x) = ${a}x + ${nb(b)}`, `f(x) = ${nb(a + b)}x`, `f(x) = ${a} \\times ${nb(b)}^x`], val: (a, b, x) => b * x + a, xq: () => rand(4, 20), u: "€" },
      { ctx: (a, b) => `Un rectangle a pour largeur $x$ et pour longueur $x + ${a}$. On note $f(x)$ son aire.`, a: () => rand(2, 9), b: () => 0, bonne: (a) => `f(x) = x^2 + ${a}x`, faux: (a) => [`f(x) = 2x + ${a}`, `f(x) = 4x + ${2 * a}`, `f(x) = x^2 + ${a}`], val: (a, b, x) => x * x + a * x, xq: () => rand(2, 9), u: "" },
      { ctx: (a, b) => `Un rectangle a pour largeur $x$ et pour longueur $x + ${a}$. On note $f(x)$ son périmètre.`, a: () => rand(2, 9), b: () => 0, bonne: (a) => `f(x) = 4x + ${2 * a}`, faux: (a) => [`f(x) = 2x + ${a}`, `f(x) = x^2 + ${a}x`, `f(x) = 4x + ${a}`], val: (a, b, x) => 4 * x + 2 * a, xq: () => rand(2, 9), u: "" },
      { ctx: (a, b) => `Un vendeur de brochettes a des frais fixes de $${a}$ € par soirée et chaque brochette lui coûte $${nb(b)}$ € à préparer ; il la vend $${nb(b + 1)}$ €. On note $f(x)$ le bénéfice (en €) pour $x$ brochettes vendues.`, a: () => pick([20, 30, 40, 50]), b: () => pick([0.5, 1, 1.5]), bonne: (a, b) => `f(x) = x - ${a}`, faux: (a, b) => [`f(x) = ${nb(b + 1)}x - ${a}`, `f(x) = ${coef(b, "x")} + ${a}`, `f(x) = ${a} - x`], val: (a, b, x) => x - a, xq: () => pick([60, 80, 100, 120]), u: "€" },
      { ctx: (a, b) => `Avec $${a}$ m de grillage, on construit un enclos rectangulaire contre un mur (le mur forme un côté). On note $x$ la largeur et $f(x)$ l'aire de l'enclos.`, a: () => pick([20, 24, 30, 40, 50, 60]), b: () => 0, bonne: (a) => `f(x) = x(${a} - 2x)`, faux: (a) => [`f(x) = x(${a} - x)`, `f(x) = 2x + (${a} - 2x)`, `f(x) = x^2 + ${a}`], val: (a, b, x) => x * (a - 2 * x), xq: (a) => rand(2, Math.floor(a / 2) - 2), u: "m²" }
    ]);
    const a = S.a(), b = S.b();
    if (Math.random() < 0.55) {
      const ch = choix4(`$${S.bonne(a, b)}$`, S.faux(a, b).map((s) => `$${s}$`));
      return { enonce: `${S.ctx(a, b)} Quelle est l'expression de $f(x)$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Traduis la situation étape par étape avec $x$.", "Vérifie avec une valeur simple de $x$ (par exemple $x = 1$ ou $x = 2$).", "Aire $=$ longueur $\\times$ largeur ; périmètre $=$ somme des côtés ; bénéfice $=$ recette $-$ coûts."],
        solution: `En traduisant : $${S.bonne(a, b)}$. ${S.u === "€" && S.ctx(a, b).includes("taxi") ? `Le prix est $${nb(b)}$ € multiplié par le nombre de kilomètres, plus la prise en charge.` : S.ctx(a, b).includes("bénéfice") ? `Recette $${nb(b + 1)}x$, coûts $${coef(b, "x")} + ${a}$ : bénéfice $${nb(b + 1)}x - ${coef(b, "x")} - ${a} = x - ${a}$.` : S.ctx(a, b).includes("enclos") ? `Les trois côtés de grillage : $x + x + L = ${a}$, donc $L = ${a} - 2x$ et l'aire vaut $x(${a} - 2x)$.` : "On développe si besoin pour vérifier."}` };
    }
    const x = S.xq(a), v = arr(S.val(a, b, x));
    return { enonce: `${S.ctx(a, b)} Calcule $f(${x})$.`, mode: "nombre", prefixe: `$f(${x}) =$`, attendu: v, suffixe: S.u,
      erreurs: [{ valeur: arr(S.val(a, b, x + 1)), message: `Calcule pour $x = ${x}$ exactement.` }, { valeur: arr(S.val(a, b, x) + a), message: "Relis l'expression de $f(x)$." }],
      aides: ["Trouve d'abord l'expression de $f(x)$.", `$${S.bonne(a, b)}$.`, `Remplace $x$ par $${x}$.`],
      solution: `$${S.bonne(a, b)}$, donc $f(${x}) = ${S.bonne(a, b).replace("f(x) = ", "").replace(/x/g, `${x}`).replace(/(\d)\(/g, "$1 \\times (")} = ${nb(v)}$${S.u ? " " + S.u : ""}.` };
  });

  def("yf-courbe", () => {
    // température au cours d'une journée : f(t) = a - b (t - h)^2 sur [6 ; 20], ou autre bosse
    const h = rand(12, 15), Tmax = rand(28, 34), b = pick([0.25, 0.2, 0.3]), f = (t) => Tmax - b * (t - h) ** 2;
    const fig = graph({ xmin: 5, xmax: 20.8, ymin: 16, ymax: Tmax + 2.4, xstep: 1, ystep: 1, xetiq: 2, yetiq: 2, h: 280, xlabel: "heure", ylabel: "°C", curves: [{ f, a: 6, b: 20, closed: false }], aria: `Courbe de la température de 6 h à 20 h, maximum ${Tmax} °C à ${h} h` });
    const t = pick(["max", "lire", "sup", "sup"]);
    if (t === "max") { const q = pick(["val", "heure"]); return { enonce: `La courbe donne la température $f(t)$ (en °C) à ${lieu()} en fonction de l'heure $t$. ${q === "val" ? "Quelle est la température maximale ?" : "À quelle heure la température est-elle maximale ?"}`, figure: fig, mode: "nombre", prefixe: q === "val" ? "Maximum :" : "Heure :", attendu: q === "val" ? Tmax : h, suffixe: q === "val" ? "°C" : "h", erreurs: [{ valeur: q === "val" ? h : Tmax, message: q === "val" ? "La température se lit sur l'axe vertical." : "L'heure se lit sur l'axe horizontal." }], aides: ["Repère le point le plus haut de la courbe.", q === "val" ? "Lis son ordonnée." : "Lis son abscisse.", `Le sommet est à $(${h}\\,;${Tmax})$.`], solution: `Le point le plus haut de la courbe est $(${h}\\,;${Tmax})$ : la température maximale est $${Tmax}$ °C, atteinte à $${h}$ h.` }; }
    if (t === "lire") { const x = pick([6, 8, 10, 12, 14, 16, 18, 20].filter((v) => Number.isInteger(f(v) * 10))); if (x === undefined) return GEN["yf-courbe"](); const v = arr(f(x)); return { enonce: `La courbe donne la température $f(t)$ (en °C) en fonction de l'heure $t$. Lis $f(${x})$ (à $0{,}5$ °C près).`, figure: fig, mode: "nombre", prefixe: `$f(${x}) =$`, attendu: v, suffixe: "°C", tolerance: 0.5, erreurs: [], aides: [`Repère $t = ${x}$ sur l'axe horizontal.`, "Monte jusqu'à la courbe et lis l'ordonnée.", `On lit environ $${nb(v)}$.`], solution: `À $t = ${x}$ h, la courbe est à la hauteur $${nb(v)}$ : $f(${x}) \\approx ${nb(v)}$ °C.` }; }
    const k = Tmax - pick([1, 4]), d = Math.sqrt((Tmax - k) / b);
    if (!Number.isInteger(d * 2) || h - d < 6 || h + d > 20) return GEN["yf-courbe"]();
    const fig2 = graph({ xmin: 5, xmax: 20.8, ymin: 16, ymax: Tmax + 2.4, xstep: 1, ystep: 1, xetiq: 2, yetiq: 2, h: 280, xlabel: "heure", ylabel: "°C", curves: [{ f, a: 6, b: 20, closed: false }], hlines: [{ y: k, label: `${k} °C` }], aria: `Courbe de la température et droite horizontale à ${k} °C` });
    const sens = pick([">", "<"]);
    const I = sens === ">" ? `]${nb(h - d)}\\,;${nb(h + d)}[` : `[6\\,;${nb(h - d)}[ \\cup ]${nb(h + d)}\\,;20]`;
    const ch = choix4(`$${I}$`, [`$${sens === ">" ? `[6\\,;${nb(h - d)}[ \\cup ]${nb(h + d)}\\,;20]` : `]${nb(h - d)}\\,;${nb(h + d)}[`}$`, `$\\{${nb(h - d)}\\,;${nb(h + d)}\\}$`, `$]${nb(k)}\\,;${nb(Tmax)}]$`]);
    return { enonce: `La courbe donne la température $f(t)$ (en °C) entre $6$ h et $20$ h. Pendant quelles heures a-t-on $f(t) ${sens} ${k}$ ?`, figure: fig2, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [`La droite horizontale à $${k}$ °C coupe la courbe en $t = ${nb(h - d)}$ et $t = ${nb(h + d)}$.`, sens === ">" ? "On cherche où la courbe est **au-dessus** de la droite." : "On cherche où la courbe est **en dessous** de la droite.", "Inégalité stricte : bornes exclues."],
      solution: `La courbe coupe la droite $y = ${k}$ en $t = ${nb(h - d)}$ et $t = ${nb(h + d)}$ ; elle est ${sens === ">" ? "au-dessus entre ces deux heures" : "en dessous avant la première et après la seconde"} : $f(t) ${sens} ${k}$ pour $t \\in ${I}$.` };
  });

  def("yf-balayage", () => {
    const t = pick(["tableau", "tableau", "python"]);
    const F = pick([{ tex: "x^2 - 2", f: (x) => x * x - 2, k: 0, rac: Math.SQRT2 }, { tex: "x^2 - 5", f: (x) => x * x - 5, k: 0, rac: Math.sqrt(5) }, { tex: "x^3 - 3", f: (x) => x ** 3 - 3, k: 0, rac: Math.cbrt(3) }, { tex: "x^2 + x", f: (x) => x * x + x, k: 3, rac: (-1 + Math.sqrt(13)) / 2 }, { tex: "x^3", f: (x) => x ** 3, k: 10, rac: Math.cbrt(10) }, { tex: "x^2 - 7", f: (x) => x * x - 7, k: 0, rac: Math.sqrt(7) }, { tex: "x^2 - 3", f: (x) => x * x - 3, k: 0, rac: Math.sqrt(3) }, { tex: "x^2 - 10", f: (x) => x * x - 10, k: 0, rac: Math.sqrt(10) }, { tex: "x^3 + x", f: (x) => x ** 3 + x, k: 5, rac: 1.5159802 }, { tex: "x^2 + 2x", f: (x) => x * x + 2 * x, k: 5, rac: -1 + Math.sqrt(6) }, { tex: "x^3", f: (x) => x ** 3, k: 20, rac: Math.cbrt(20) }, { tex: "x^2 - 11", f: (x) => x * x - 11, k: 0, rac: Math.sqrt(11) }]);
    const pas = pick([0.1, 0.01]), lo = Math.floor(F.rac / pas) * pas, hi = arr(lo + pas);
    if (t === "python") {
      const code = `def f(x):\n    return ${F.tex.replace(/\^(\d)/g, " ** $1").replace(/x \*\* 2/g, "x ** 2")}\n\nx = ${Math.floor(F.rac)}\nwhile f(x) < ${F.k}:\n    x = x + ${pas}\nprint(x)`;
      const att = Math.round(hi * 100) / 100;
      return { enonce: `On encadre la solution positive de $${F.tex} = ${F.k}$ par balayage. Qu'affiche ce programme (arrondi au ${pas === 0.1 ? "dixième" : "centième"}) ?\n\n${py(code)}`, mode: "nombre", prefixe: "Affichage :", attendu: att, tolerance: pas / 2 + 1e-9,
        erreurs: [{ valeur: Math.round(lo * 100) / 100, message: `La boucle continue **tant que** $f(x) < ${F.k}$ : elle s'arrête au premier $x$ où $f(x) \\geqslant ${F.k}$.` }],
        aides: [`On avance de $${nb(pas)}$ en $${nb(pas)}$ à partir de $${Math.floor(F.rac)}$ tant que $f(x) < ${F.k}$.`, `La solution est entre $${nb(arr(lo))}$ et $${nb(hi)}$ : $f(${nb(arr(lo))}) ${arr(F.f(lo)) < F.k ? "<" : "\\geqslant"} ${F.k}$ et $f(${nb(hi)}) \\geqslant ${F.k}$.`, "Le programme affiche la première valeur qui fait sortir de la boucle."],
        solution: `Le balayage s'arrête à la première valeur $x$ telle que $f(x) \\geqslant ${F.k}$ : $x \\approx ${nb(hi)}$ (la solution exacte est entre $${nb(arr(lo))}$ et $${nb(hi)}$, environ $${nb(arr(F.rac, 3))}$). L'affichage peut montrer des décimales parasites comme $${nb(hi)}000001$ à cause des calculs approchés de l'ordinateur.` };
    }
    const pas2 = pick([1, 0.5, 0.1]);
    const base = Math.floor(F.rac / pas2) * pas2, xs = Array.from({ length: 6 }, (_, k) => arr(base - 2 * pas2 + k * pas2));
    const tab = { var: "x", x: xs.map(nb), nom: `f(x)`, y: xs.map((x) => nb(arr(F.f(x), 3))) };
    const bonne = `$]${nb(arr(base))}\\,;${nb(arr(base + pas2))}[$`;
    const ch = choix4(bonne, [`$]${nb(arr(base - pas2))}\\,;${nb(arr(base))}[$`, `$]${nb(arr(base + pas2))}\\,;${nb(arr(base + 2 * pas2))}[$`, `$]${nb(arr(base - 2 * pas2))}\\,;${nb(arr(base - pas2))}[$`]);
    return { enonce: `On cherche la solution de $f(x) = ${F.k}$ avec $f(x) = ${F.tex}$. Le tableau de valeurs (pas de $${nb(pas2)}$) est donné. Entre quelles valeurs se trouve la solution ?`, tableau: tab, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [`Cherche deux valeurs consécutives de $x$ entre lesquelles $f(x)$ passe en dessous puis au-dessus de $${F.k}$.`, `$f(${nb(arr(base))}) = ${nb(arr(F.f(base), 3))} < ${F.k}$ et $f(${nb(arr(base + pas2))}) = ${nb(arr(F.f(base + pas2), 3))} > ${F.k}$.`, "La solution est entre ces deux valeurs de $x$ : c'est le principe du balayage."],
      solution: `$f(${nb(arr(base))}) = ${nb(arr(F.f(base), 3))} < ${F.k}$ et $f(${nb(arr(base + pas2))}) = ${nb(arr(F.f(base + pas2), 3))} > ${F.k}$ : la solution est dans ${bonne}. En resserrant le pas, on l'encadre de mieux en mieux (solution $\\approx ${nb(arr(F.rac, 3))}$).` };
  });

  def("yf-vrai-faux", () => vraiFaux4([
    ["Si $f(x) = x^2 - 3x$, alors $f(-2) = 10$.", true, "$4 + 6 = 10$."],
    ["Si $f(3) = 7$, le point $(3\\,;7)$ est sur la courbe de $f$.", true, "abscisse $3$, ordonnée $f(3)$."],
    ["Le taux de variation de $f$ entre $1$ et $4$ est $\\dfrac{f(4) - f(1)}{3}$.", true, "$\\dfrac{f(b) - f(a)}{b - a}$ avec $b - a = 3$."],
    ["Le taux de variation entre $a$ et $b$ est la pente de la sécante passant par les points d'abscisses $a$ et $b$.", true, "c'est l'interprétation graphique."],
    ["Si $f$ est croissante sur $[0\\,;5]$, alors $f(2) \\leqslant f(4)$.", true, "les images sont rangées dans le même ordre."],
    ["Pour une fonction affine, le taux de variation est toujours égal au coefficient directeur.", true, "$\\dfrac{(mb + p) - (ma + p)}{b - a} = m$."],
    ["Un nombre peut avoir deux antécédents par une fonction.", true, "$4$ a pour antécédents $2$ et $-2$ par la fonction carré."],
    ["Le balayage consiste à calculer $f(x)$ pour des valeurs régulièrement espacées de $x$ pour encadrer une solution.", true, "on repère où $f(x) - k$ change de signe."],
    ["Si $f(2) = 5$, alors $5$ est un antécédent de $2$.", false, "$2$ est un antécédent de $5$ ; $5$ est l'image de $2$."],
    ["Un nombre peut avoir deux images par une fonction.", false, "une fonction associe **une seule** image à chaque nombre."],
    ["Si le taux de variation de $f$ entre $1$ et $3$ est négatif, alors $f(1) < f(3)$.", false, "taux négatif : $f(3) - f(1) < 0$, donc $f(3) < f(1)$."],
    ["Si $f$ est décroissante sur $[0\\,;5]$, alors $f(1) \\leqslant f(4)$.", false, "ordre inverse : $f(1) \\geqslant f(4)$."],
    ["Le taux de variation de $f(x) = x^2$ est le même entre toutes les valeurs.", false, "entre $0$ et $1$ il vaut $1$, entre $1$ et $2$ il vaut $3$."],
    ["Résoudre $f(x) = 2$ graphiquement, c'est lire $f(2)$.", false, "c'est chercher les abscisses des points d'ordonnée $2$."]
  ], ["Image : on part de $x$ ; antécédent : on cherche $x$.", "Taux de variation : variation des images sur variation de $x$.", "Croissante : même ordre ; décroissante : ordre inverse."]));

  /* Figures du cours (chapitre 7) */
  FIGURES["yf-cours-secante"] = () => tiret(graph({ xmin: -1.6, xmax: 4.6, ymin: -2.6, ymax: 6.6, h: 300, curves: [{ f: (x) => 0.5 * x * x - x + 1, a: -1.3, b: 4.2, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", closed: false }, { f: (x) => 0.5 + (x - 1), a: -0.4, b: 4.4, closed: false }], points: [{ x: 1, y: 0.5, label: "A(1 ; 0,5)", gauche: true }, { x: 3, y: 2.5, label: "B(3 ; 2,5)" }], aria: "Courbe de f et sécante (AB) : taux de variation entre 1 et 3 égal à (2,5 − 0,5)/(3 − 1) = 1" }), 1);
  FIGURES["yf-cours-temperature"] = () => graph({ xmin: 5, xmax: 20.8, ymin: 16, ymax: 34.4, xstep: 1, ystep: 1, xetiq: 2, yetiq: 2, h: 280, xlabel: "heure", ylabel: "°C", curves: [{ f: (t) => 32 - 0.25 * (t - 14) ** 2, a: 6, b: 20, closed: false }], hlines: [{ y: 28, label: "28 °C" }], points: [{ x: 14, y: 32, label: "max 32 °C" }], aria: "Température de 6 h à 20 h : maximum 32 °C à 14 h ; au-dessus de 28 °C entre 10 h et 18 h" });
  FIGURES["yf-cours-croissante"] = () => graph({ xmin: -0.6, xmax: 5.6, ymin: -0.6, ymax: 5.6, h: 260, curves: [{ f: (x) => 0.2 * x * x + 0.2, a: 0, b: 5, label: "f croissante", closed: false }], points: [{ x: 1, y: 0.4, label: "f(1)", gauche: true }, { x: 4, y: 3.4, label: "f(4)" }], aria: "Fonction croissante : 1 < 4 et f(1) < f(4), la sécante monte" });

  /* ---------- Chapitre 8 : fonctions polynômes de degré 2 (préfixe yp) ---------- */
  // Parabole sous forme factorisée a(x − x1)(x − x2), racines entières, fenêtre adaptée
  function paraboleF() {
    const a = pick([1, 1, 1, -1, -1, 2, -2, 0.5, -0.5]), x1 = rand(-4, 2), x2 = x1 + pick([1, 2, 2, 3, 4, 4, 6]);
    const h = (x1 + x2) / 2, v = a * (h - x1) * (h - x2);
    if (Math.abs(v) > 9 || x2 > 6) return paraboleF();
    return { a, x1, x2, h, v, f: (x) => a * (x - x1) * (x - x2), dev: [a, -a * (x1 + x2), a * x1 * x2] };
  }
  const texFact = (P) => `${P.a === 1 ? "" : P.a === -1 ? "-" : nb(P.a)}(x ${plus(-P.x1)})(x ${plus(-P.x2)})`;
  function figParaboleF(P, extra) {
    const ymin = Math.min(-1, P.v) - 2, ymax = Math.max(1, P.v) + 2.5;
    const xm = Math.min(P.x1, -1) - 2, xM = Math.max(P.x2, 1) + 2;
    const lim = (y) => P.h + Math.sqrt(Math.max(0, (y - P.v) / P.a));
    const a0 = Math.max(xm + 0.2, 2 * P.h - lim(P.a > 0 ? ymax - 0.3 : ymin + 0.3)), b0 = Math.min(xM - 0.2, lim(P.a > 0 ? ymax - 0.3 : ymin + 0.3));
    return graph(Object.assign({ xmin: xm, xmax: xM, ymin, ymax, h: 290, curves: [{ f: P.f, a: a0, b: b0, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", closed: false }], aria: `Parabole tournée vers le ${P.a > 0 ? "haut" : "bas"}, coupant l'axe des abscisses en ${nbS(P.x1)} et ${nbS(P.x2)}, sommet (${nbS(P.h)} ; ${nbS(P.v)})` }, extra || {}));
  }

  def("yp-allure", () => {
    const t = pick(["ax2", "ax2c", "fact", "fact", "sens"]);
    if (t === "sens") {
      const P = paraboleF();
      const bonne = P.a > 0 ? `$a > 0$ : la parabole est tournée vers le haut, $f$ admet un minimum` : `$a < 0$ : la parabole est tournée vers le bas, $f$ admet un maximum`;
      const ch = choix4(bonne, [P.a > 0 ? `$a < 0$ : la parabole est tournée vers le bas, $f$ admet un maximum` : `$a > 0$ : la parabole est tournée vers le haut, $f$ admet un minimum`, `$a = ${nb(P.v)}$ : c'est l'ordonnée du sommet`, "Le signe de $a$ ne se voit pas sur la courbe"]);
      return { enonce: `Voici la courbe de $f(x) = ax^2 + bx + c$. Que peut-on dire du coefficient $a$ ?`, figure: figParaboleF(P), mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Le signe de $a$ donne l'orientation de la parabole.", "$a > 0$ : « sourire », tournée vers le haut ; $a < 0$ : tournée vers le bas.", "Regarde si la courbe a un point le plus bas ou le plus haut."],
        solution: `La parabole est tournée vers le ${P.a > 0 ? "haut" : "bas"} : ${bonne}.` };
    }
    if (t === "ax2") {
      const a = pick([1, 2, 3, 0.5, -1, -2, -0.5, 4]);
      const fig = graph({ xmin: -3.6, xmax: 3.6, ymin: a > 0 ? -1.6 : -9.6, ymax: a > 0 ? 9.6 : 1.6, h: 280, curves: [{ f: (x) => a * x * x, a: -Math.sqrt(9 / Math.abs(a)), b: Math.sqrt(9 / Math.abs(a)), closed: false }], points: [{ x: 1, y: a, label: `(1 ; ${nbS(a)})` }], aria: `Parabole y = ${nbS(a)}x², sommet à l'origine, passant par (1 ; ${nbS(a)})` });
      const ch = choix4(`$f(x) = ${coef(a, "x^2")}$`, [`$f(x) = ${coef(-a, "x^2")}$`, `$f(x) = ${coef(a === 1 ? 2 : 1, "x^2")}$`, `$f(x) = ${coef(a, "x")}$`, `$f(x) = x^2 ${plus(a)}$`]);
      return { enonce: `Cette parabole a son sommet à l'origine. Quelle est l'expression de $f$ ?`, figure: fig, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Une parabole de sommet $(0\\,;0)$ a une équation de la forme $y = ax^2$.", "Le signe de $a$ : vers le haut si $a > 0$, vers le bas si $a < 0$.", `Le point $(1\\,;${nb(a)})$ est sur la courbe : $a \\times 1^2 = ${nb(a)}$.`],
        solution: `Sommet à l'origine : $f(x) = ax^2$. Avec le point $(1\\,;${nb(a)})$, $a = ${nb(a)}$ : $f(x) = ${coef(a, "x^2")}$.` };
    }
    if (t === "ax2c") {
      const a = pick([1, 2, -1, -2, 0.5, -0.5]), c = nz2(-5, 5);
      const fig = graph({ xmin: -3.6, xmax: 3.6, ymin: Math.min(c, a > 0 ? c : c - 8) - 1.6, ymax: Math.max(c, a > 0 ? c + 8 : c) + 1.6, h: 280, curves: [{ f: (x) => a * x * x + c, a: -Math.sqrt(8 / Math.abs(a)), b: Math.sqrt(8 / Math.abs(a)), closed: false }], points: [{ x: 0, y: c, label: `(0 ; ${nbS(c)})` }, { x: 1, y: a + c, label: `(1 ; ${nbS(a + c)})` }], aria: `Parabole y = ${nbS(a)}x² + ${nbS(c)}, sommet (0 ; ${nbS(c)})` });
      const ch = choix4(`$f(x) = ${coef(a, "x^2")} ${plus(c)}$`, [`$f(x) = ${coef(a, "x^2")} ${plus(-c)}$`, `$f(x) = ${coef(-a, "x^2")} ${plus(c)}$`, `$f(x) = ${coef(c, "x^2")} ${plus(a)}$`, `$f(x) = (x ${plus(c)})^2$`]);
      return { enonce: `Cette parabole a son sommet sur l'axe des ordonnées. Quelle est l'expression de $f$ ?`, figure: fig, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Sommet sur l'axe des ordonnées : $f(x) = ax^2 + c$, avec $c = f(0)$ l'ordonnée du sommet.", `Ici $c = ${nb(c)}$.`, `Le point $(1\\,;${nb(a + c)})$ donne $a + ${pr(c)} = ${nb(a + c)}$, donc $a = ${nb(a)}$.`],
        solution: `$f(x) = ax^2 + c$ avec $c = f(0) = ${nb(c)}$ et $f(1) = a ${plus(c)} = ${nb(a + c)}$, donc $a = ${nb(a)}$ : $f(x) = ${coef(a, "x^2")} ${plus(c)}$.` };
    }
    const P = paraboleF();
    const bonne = `$f(x) = ${texFact(P)}$`;
    const Q = { a: P.a, x1: -P.x1, x2: -P.x2 }, R = { a: -P.a, x1: P.x1, x2: P.x2 };
    const ch = choix4(bonne, [`$f(x) = ${texFact(Q)}$`, `$f(x) = ${texFact(R)}$`, `$f(x) = ${P.a === 1 ? "" : P.a === -1 ? "-" : nb(P.a)}(x ${plus(-P.x1)})(x ${plus(P.x2)})$`, `$f(x) = ${coef(P.a, "x^2")} ${plus(P.x1 * P.x2)}$`]);
    return { enonce: `Cette parabole coupe l'axe des abscisses en $${nb(P.x1)}$ et $${nb(P.x2)}$. Quelle est l'expression de $f$ ?`, figure: figParaboleF(P, { points: [{ x: P.x1, y: 0 }, { x: P.x2, y: 0 }, { x: P.h, y: P.v, label: `(${nbS(P.h)} ; ${nbS(P.v)})` }] }), mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Racines $x_1$ et $x_2$ : $f(x) = a(x - x_1)(x - x_2)$.", `Ici $x_1 = ${nb(P.x1)}$ et $x_2 = ${nb(P.x2)}$ : attention aux signes dans les parenthèses.`, `Le sommet $(${nb(P.h)}\\,;${nb(P.v)})$ permet de trouver $a$ : $a(${nb(P.h)} ${plus(-P.x1)})(${nb(P.h)} ${plus(-P.x2)}) = ${nb(P.v)}$.`],
      solution: `Les racines sont $${nb(P.x1)}$ et $${nb(P.x2)}$ : $f(x) = a(x ${plus(-P.x1)})(x ${plus(-P.x2)})$. Le sommet $(${nb(P.h)}\\,;${nb(P.v)})$ donne $a \\times ${pr(P.h - P.x1)} \\times ${pr(P.h - P.x2)} = ${nb(P.v)}$, soit $a = ${nb(P.a)}$ : ${bonne.slice(1, -1)}.` };
  });

  def("yp-sommet", () => {
    const P = paraboleF(), t = pick(["axe", "axe", "ordonnee", "symetrie", "variations"]);
    if (t === "symetrie") {
      const a = pick([1, 1, 2, -1, -2, 3]), b = nz2(-9, 9), c = rand(-6, 6);
      const h = -b / (2 * a), fr2 = !Number.isInteger(h * 100);
      if (!Number.isInteger(h * 4)) return GEN["yp-sommet"]();
      return { enonce: `On pose $f(x) = ${poly([a, b, c])}$. En résolvant $f(x) = ${nb(c)}$, détermine l'abscisse du sommet de la parabole${fr2 ? " (fraction)" : ""}.`, mode: "nombre", prefixe: "Abscisse du sommet :", attendu: h,
        erreurs: [{ valeur: -b / a, message: `$f(x) = ${nb(c)}$ a pour solutions $0$ et $${frac(-b, a)}$ : le sommet est au **milieu**.` }, { valeur: b / (2 * a), message: "Attention au signe." }, { valeur: c, message: "On demande l'abscisse, pas l'ordonnée $f(0)$." }, ...(fr2 ? approx(h) : [])],
        aides: [`$f(x) = ${nb(c)} \\Leftrightarrow ${poly([a, b, 0])} = 0 \\Leftrightarrow x(${aff(a, b)}) = 0$.`, `Solutions : $x = 0$ et $x = ${frac(-b, a)}$ : deux points de la parabole à la même hauteur $${nb(c)}$.`, "Par symétrie, le sommet est au milieu de ces deux abscisses."],
        solution: `$f(x) = ${nb(c)} \\Leftrightarrow x(${aff(a, b)}) = 0 \\Leftrightarrow x = 0$ ou $x = ${frac(-b, a)}$. Les points d'abscisses $0$ et $${frac(-b, a)}$ ont la même ordonnée $${nb(c)}$ : l'axe de symétrie passe au milieu, $x = \\dfrac{0 + ${-b / a < 0 ? `(${frac(-b, a)})` : frac(-b, a)}}{2} = ${frac(-b, 2 * a)}$.` };
    }
    if (t === "variations") {
      const bonne = P.a > 0 ? `décroissante sur $]-\\infty\\,;${nb(P.h)}]$ puis croissante sur $[${nb(P.h)}\\,;+\\infty[$, minimum $${nb(P.v)}$` : `croissante sur $]-\\infty\\,;${nb(P.h)}]$ puis décroissante sur $[${nb(P.h)}\\,;+\\infty[$, maximum $${nb(P.v)}$`;
      const ch = choix4(bonne, [P.a > 0 ? `croissante sur $]-\\infty\\,;${nb(P.h)}]$ puis décroissante sur $[${nb(P.h)}\\,;+\\infty[$, maximum $${nb(P.v)}$` : `décroissante sur $]-\\infty\\,;${nb(P.h)}]$ puis croissante sur $[${nb(P.h)}\\,;+\\infty[$, minimum $${nb(P.v)}$`, `${P.a > 0 ? "décroissante" : "croissante"} sur $]-\\infty\\,;${nb(P.v)}]$ puis ${P.a > 0 ? "croissante" : "décroissante"} sur $[${nb(P.v)}\\,;+\\infty[$, extremum $${nb(P.h)}$`, `${P.a > 0 ? "décroissante" : "croissante"} sur $]-\\infty\\,;${nb(P.x1)}]$ puis ${P.a > 0 ? "croissante" : "décroissante"} sur $[${nb(P.x2)}\\,;+\\infty[$`]);
      return { enonce: `On pose $f(x) = ${texFact(P)}$. Quel est le tableau de variations de $f$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu, figureSolution: tabSV(["−∞", nbS(P.h), "+∞"], [P.a > 0 ? "-" : "+", "", P.a > 0 ? "+" : "-"], ["", nbS(P.v), ""], "f", true),
        aides: [`Racines $${nb(P.x1)}$ et $${nb(P.x2)}$ : l'axe de symétrie est $x = \\dfrac{${nb(P.x1)} + ${pr(P.x2)}}{2} = ${nb(P.h)}$.`, `$a = ${nb(P.a)}$ ${P.a > 0 ? "> 0" : "< 0"} : parabole tournée vers le ${P.a > 0 ? "haut" : "bas"}.`, `L'extremum vaut $f(${nb(P.h)}) = ${nb(P.v)}$.`],
        solution: `Sommet d'abscisse $${nb(P.h)}$ (milieu des racines) et d'ordonnée $f(${nb(P.h)}) = ${nb(P.v)}$ ; $a ${P.a > 0 ? "> 0" : "< 0"}$ : $f$ est ${bonne}.` };
    }
    if (t === "ordonnee") return { enonce: `On pose $f(x) = ${texFact(P)}$. L'axe de symétrie de la parabole est $x = ${nb(P.h)}$. Calcule l'ordonnée du sommet.`, mode: "nombre", prefixe: "Ordonnée du sommet :", attendu: P.v,
      erreurs: [{ valeur: P.h, message: "Ça, c'est l'abscisse. L'ordonnée du sommet est $f(" + nb(P.h) + ")$." }, { valeur: -P.v, message: "Vérifie les signes dans le calcul de $f(" + nb(P.h) + ")$." }, { valeur: P.a * (P.h - P.x1) * (P.h - P.x2) / P.a, message: `N'oublie pas le coefficient $${nb(P.a)}$.` }],
      aides: ["L'ordonnée du sommet est l'image de l'abscisse du sommet.", `Calcule $f(${nb(P.h)}) = ${P.a === 1 ? "" : P.a === -1 ? "-" : nb(P.a) + " \\times "}(${nb(P.h)} ${plus(-P.x1)})(${nb(P.h)} ${plus(-P.x2)})$.`, `$(${nb(P.h - P.x1)}) \\times (${nb(P.h - P.x2)}) = ${nb((P.h - P.x1) * (P.h - P.x2))}$.`],
      solution: `$f(${nb(P.h)}) = ${P.a === 1 ? "" : P.a === -1 ? "-" : nb(P.a) + " \\times "}${pr(P.h - P.x1)} \\times ${pr(P.h - P.x2)} = ${nb(P.v)}$ : le sommet est $(${nb(P.h)}\\,;${nb(P.v)})$, ${P.a > 0 ? "minimum" : "maximum"} de $f$.` };
    const fr2 = !Number.isInteger(P.h);
    return { enonce: `On pose $f(x) = ${texFact(P)}$. Quelle est l'équation de l'axe de symétrie de sa parabole ? Donne l'abscisse $x = \\dots$${fr2 ? " (nombre décimal ou fraction)" : ""}.`, mode: "nombre", prefixe: "$x =$", attendu: P.h,
      erreurs: [{ valeur: P.x1 + P.x2, message: "L'axe passe au **milieu** des racines : divise la somme par $2$." }, { valeur: P.v, message: "On demande l'abscisse de l'axe, pas l'ordonnée du sommet." }, { valeur: -P.h, message: "Attention aux signes des racines." }],
      aides: [`Les racines sont $${nb(P.x1)}$ et $${nb(P.x2)}$ (valeurs qui annulent les facteurs).`, "L'axe de symétrie passe par le milieu des racines.", `$\\dfrac{${nb(P.x1)} + ${pr(P.x2)}}{2}$.`],
      solution: `Racines $${nb(P.x1)}$ et $${nb(P.x2)}$ : par symétrie, l'axe est $x = \\dfrac{${nb(P.x1)} + ${pr(P.x2)}}{2} = ${nb(P.h)}$. Le sommet a pour abscisse $${nb(P.h)}$.` };
  });

  def("yp-racines", () => {
    const P = paraboleF(), t = pick(["fact", "fact", "graph", "verifier"]);
    if (t === "verifier") {
      const cands = [P.x1, P.x2, P.x1 - 1, P.x2 + 1, 0, P.x1 + P.x2].filter((x, i, A) => A.indexOf(x) === i);
      const bon = pick([P.x1, P.x2]), faux = cands.filter((x) => x !== P.x1 && x !== P.x2);
      const ch = choix4(`$${nb(bon)}$`, faux.map((x) => `$${nb(x)}$`));
      const dev = poly(P.dev.map((c) => (Number.isInteger(c) ? c : c)));
      if (!Number.isInteger(P.a)) return GEN["yp-racines"]();
      return { enonce: `On pose $f(x) = ${dev}$. Lequel de ces nombres est une racine de $f$ (c'est-à-dire vérifie $f(x) = 0$) ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Une racine est une valeur $x$ telle que $f(x) = 0$.", "Calcule $f$ pour chaque proposition.", `$f(${nb(bon)}) = ${dev.replace(/x/g, `(${nb(bon)})`)}$.`],
        solution: `$f(${nb(bon)}) = ${dev.replace(/x/g, `(${nb(bon)})`)} = 0$ : $${nb(bon)}$ est une racine. (L'autre racine est $${nb(bon === P.x1 ? P.x2 : P.x1)}$ ; les autres propositions ne donnent pas $0$.)` };
    }
    if (t === "graph") return { enonce: `Voici la courbe de $f$. Lis graphiquement les racines de $f$ (séparées par « ; »).`, figure: figParaboleF(P), mode: "ensemble", attendu: [P.x1, P.x2],
      aides: ["Les racines sont les abscisses des points où la courbe coupe l'axe des abscisses.", "Il y en a deux ici.", `La courbe coupe l'axe en $${nb(P.x1)}$ et $${nb(P.x2)}$.`],
      solution: `La parabole coupe l'axe des abscisses en $x = ${nb(P.x1)}$ et $x = ${nb(P.x2)}$ : ce sont les racines de $f$, et $f(x) = ${texFact(P)}$.` };
    return { enonce: `On pose $f(x) = ${texFact(P)}$. Détermine les racines de $f$ (séparées par « ; »).`, mode: "ensemble", attendu: [P.x1, P.x2],
      aides: ["Les racines sont les solutions de $f(x) = 0$.", "Un produit est nul si et seulement si l'un des facteurs est nul.", `$x ${plus(-P.x1)} = 0$ ou $x ${plus(-P.x2)} = 0$.`],
      solution: `$f(x) = 0 \\Leftrightarrow x ${plus(-P.x1)} = 0$ ou $x ${plus(-P.x2)} = 0 \\Leftrightarrow x = ${nb(P.x1)}$ ou $x = ${nb(P.x2)}$. La parabole coupe l'axe des abscisses en ces deux points.` };
  });

  def("yp-factoriser", () => {
    const t = pick(["autre-racine", "autre-racine", "forme", "developper"]);
    const P = paraboleF();
    if (!Number.isInteger(P.a)) return GEN["yp-factoriser"]();
    const dev = poly(P.dev);
    if (t === "developper") {
      const quoi = pick(["b", "c"]), att = quoi === "b" ? P.dev[1] : P.dev[2];
      return { enonce: `Développe $f(x) = ${texFact(P)}$ sous la forme $ax^2 + bx + c$. Que vaut $${quoi}$ ?`, mode: "nombre", prefixe: `$${quoi} =$`, attendu: att,
        erreurs: [{ valeur: quoi === "b" ? P.dev[2] : P.dev[1], message: quoi === "b" ? "Ça, c'est $c$." : "Ça, c'est $b$." }, { valeur: -att, message: "Vérifie les signes." }, { valeur: quoi === "b" ? -(P.x1 + P.x2) : P.x1 * P.x2, message: `N'oublie pas de multiplier par $a = ${nb(P.a)}$.` }],
        aides: [`Développe d'abord $(x ${plus(-P.x1)})(x ${plus(-P.x2)}) = x^2 ${pt(-(P.x1 + P.x2), "x")} ${plus(P.x1 * P.x2)}$.`, `Puis multiplie tout par $${nb(P.a)}$.`, `$f(x) = ${dev}$.`],
        solution: `$(x ${plus(-P.x1)})(x ${plus(-P.x2)}) = ${poly([1, -(P.x1 + P.x2), P.x1 * P.x2])}$, puis $f(x) = ${nb(P.a)} \\times (\\dots) = ${dev}$. Donc $${quoi} = ${nb(att)}$.` };
    }
    if (t === "forme") {
      const bonne = `$f(x) = ${texFact(P)}$`;
      const ch = choix4(bonne, [`$f(x) = ${texFact({ a: P.a, x1: -P.x1, x2: -P.x2 })}$`, `$f(x) = ${texFact({ a: P.a, x1: P.x1, x2: -P.x2 })}$`, `$f(x) = (x ${plus(-P.x1)})(x ${plus(-P.x2)})$`, `$f(x) = ${texFact({ a: -P.a, x1: P.x1, x2: P.x2 })}$`].filter((s) => s !== bonne));
      return { enonce: `On sait que $f(x) = ${dev}$ a pour racines $${nb(P.x1)}$ et $${nb(P.x2)}$. Quelle est sa forme factorisée ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Avec les racines $x_1$ et $x_2$ : $f(x) = a(x - x_1)(x - x_2)$, où $a$ est le coefficient de $x^2$.", `Ici $a = ${nb(P.a)}$.`, "Vérifie en développant, ou avec une valeur simple de $x$."],
        solution: `$a = ${nb(P.a)}$ (coefficient de $x^2$) et les racines sont $${nb(P.x1)}$, $${nb(P.x2)}$ : $f(x) = ${texFact(P)}$. En développant, on retrouve $${dev}$.` };
    }
    const connue = pick([P.x1, P.x2]), autre = connue === P.x1 ? P.x2 : P.x1;
    return { enonce: `On pose $f(x) = ${dev}$. On sait que $${nb(connue)}$ est une racine de $f$. Trouve l'autre racine.`, mode: "nombre", prefixe: "Autre racine :", attendu: autre,
      erreurs: [{ valeur: -autre, message: "Attention au signe : écris $f(x) = a(x - x_1)(x - x_2)$ et identifie." }, { valeur: -connue, message: "Ce n'est pas l'opposé de la racine connue." }, { valeur: P.dev[2], message: "Le terme constant vaut $a x_1 x_2$, pas directement une racine." }],
      aides: [`Écris $f(x) = ${nb(P.a)}(x ${plus(-connue)})(x - x_2)$ et développe le terme constant : $${nb(P.a)} \\times ${pr(-connue)} \\times (-x_2) = ${nb(P.dev[2])}$.`, `Donc $x_2 = \\dfrac{${nb(P.dev[2])}}{${nb(P.a * connue)}}$ (si $x_1 \\neq 0$) ; sinon utilise le coefficient de $x$ : $-a(x_1 + x_2) = ${nb(P.dev[1])}$.`, `L'autre racine est $${nb(autre)}$.`],
      solution: `$f(x) = ${nb(P.a)}(x ${plus(-connue)})(x - x_2)$. ${connue !== 0 ? `Le terme constant donne $${nb(P.a)} \\times ${pr(-connue)} \\times (-x_2) = ${nb(P.dev[2])}$, soit $x_2 = ${nb(autre)}$.` : `Le coefficient de $x$ donne $${coef(-P.a, "x_2")} = ${nb(P.dev[1])}$, soit $x_2 = ${nb(autre)}$.`} Donc $f(x) = ${texFact(P)}$.` };
  });

  def("yp-signe", () => {
    const P = paraboleF(), t = pick(["intervalle", "intervalle", "valeur", "graph"]);
    const ext = P.a > 0;
    const fig = tabSigne(["−∞", nbS(P.x1), nbS(P.x2), "+∞"], [ext ? "+" : "-", "0", ext ? "-" : "+", "0", ext ? "+" : "-"], "f(x)");
    const dehors = `$]-\\infty\\,;${nb(P.x1)}] \\cup [${nb(P.x2)}\\,;+\\infty[$`, dedans = `$[${nb(P.x1)}\\,;${nb(P.x2)}]$`;
    if (t === "valeur") {
      const x = pick([P.x1 - rand(1, 3), rand(P.x1 + 1, P.x2 - 1), P.x2 + rand(1, 3)].filter((v) => Number.isInteger(v) && v > P.x1 - 4 && v < P.x2 + 4 && v !== P.x1 && v !== P.x2));
      if (x === undefined) return GEN["yp-signe"]();
      const v = P.f(x), bonne = v > 0 ? "strictement positif" : "strictement négatif";
      const ch = choix4(bonne, ["strictement positif", "strictement négatif", "nul", "impossible à déterminer sans calculer"].filter((s) => s !== bonne));
      return { enonce: `On pose $f(x) = ${texFact(P)}$. Sans calculer $f(${nb(x)})$, donne son signe.`, mode: "choix", choix: ch.choix, attendu: ch.attendu, figureSolution: fig,
        aides: [`Racines : $${nb(P.x1)}$ et $${nb(P.x2)}$.`, `$a = ${nb(P.a)}$ : $f(x)$ est du signe de $a$ à l'extérieur des racines, du signe contraire entre les racines.`, `$${nb(x)}$ est ${x > P.x1 && x < P.x2 ? "entre" : "à l'extérieur"} des racines.`],
        solution: `$${nb(x)}$ est ${x > P.x1 && x < P.x2 ? "entre les racines" : "à l'extérieur des racines"} : $f(${nb(x)})$ est du signe ${x > P.x1 && x < P.x2 ? "contraire à" : "de"} $a = ${nb(P.a)}$, donc ${bonne}. (Vérification : $f(${nb(x)}) = ${nb(v)}$.)` };
    }
    if (t === "graph") {
      const q = pick([">", "<"]);
      const bonne = (q === ">") === ext ? dehors.replace(/\]/g, "]").replace(`[${nb(P.x2)}`, `]${nb(P.x2)}`).replace(`${nb(P.x1)}]`, `${nb(P.x1)}[`) : dedans.replace("[", "]").replace("]$", "[$");
      const autre = (q === ">") === ext ? dedans.replace("[", "]").replace("]$", "[$") : dehors.replace(`[${nb(P.x2)}`, `]${nb(P.x2)}`).replace(`${nb(P.x1)}]`, `${nb(P.x1)}[`);
      const ch = choix4(bonne, [autre, dedans, dehors].filter((s) => s !== bonne));
      return { enonce: `Voici la courbe de $f$. Résous graphiquement $f(x) ${q} 0$.`, figure: figParaboleF(P), mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: [`La courbe coupe l'axe des abscisses en $${nb(P.x1)}$ et $${nb(P.x2)}$.`, q === ">" ? "$f(x) > 0$ là où la courbe est **au-dessus** de l'axe des abscisses." : "$f(x) < 0$ là où la courbe est **en dessous** de l'axe des abscisses.", "Inégalité stricte : les racines sont exclues."],
        solution: `La courbe est ${ext ? "au-dessus de l'axe à l'extérieur des racines et en dessous entre elles" : "en dessous de l'axe à l'extérieur des racines et au-dessus entre elles"}. Donc $f(x) ${q} 0$ pour $x \\in ${bonne.slice(1, -1)}$.` };
    }
    const q = pick(["pos", "neg"]), bonne = (q === "pos") === ext ? dehors : dedans;
    const ch = choix4(bonne, [(q === "pos") === ext ? dedans : dehors, `$]-\\infty\\,;${nb(P.x1)}]$`, `$[${nb(P.x2)}\\,;+\\infty[$`]);
    return { enonce: `On pose $f(x) = ${texFact(P)}$. Résous $f(x) ${q === "pos" ? "\\geqslant" : "\\leqslant"} 0$.`, mode: "choix", choix: ch.choix, attendu: ch.attendu, figureSolution: fig,
      aides: [`Racines : $${nb(P.x1)}$ et $${nb(P.x2)}$.`, `Signe de $a = ${nb(P.a)}$ à l'extérieur des racines, signe contraire entre les deux.`, "Dresse le tableau de signes et lis l'ensemble demandé (bornes comprises)."],
      solution: `Tableau de signes : $f(x)$ est ${ext ? "positif à l'extérieur des racines et négatif entre" : "négatif à l'extérieur des racines et positif entre"} $${nb(P.x1)}$ et $${nb(P.x2)}$. Donc $f(x) ${q === "pos" ? "\\geqslant" : "\\leqslant"} 0$ sur ${bonne}.` };
  });

  def("yp-modeliser", () => {
    const S = pick([
      { ctx: (k) => `Une balle est lancée ; sa hauteur (en m) après $t$ secondes est $h(t) = -5t^2 + ${10 * k}t$.`, k: () => rand(1, 4), r1: () => 0, r2: (k) => 2 * k, hmax: (k) => 5 * k * k, th: (k) => k, qs: ["retombe", "hmax", "th"], f: (k) => (t) => -5 * t * t + 10 * k * t, u: "m", v: "s" },
      { ctx: (k) => `Avec $${4 * k}$ m de grillage, on entoure un jardin rectangulaire de largeur $x$. Son aire est $A(x) = x(${2 * k} - x)$.`, k: () => rand(3, 12), r1: () => 0, r2: (k) => 2 * k, hmax: (k) => k * k, th: (k) => k, qs: ["hmax", "th", "racines"], f: (k) => (x) => x * (2 * k - x), u: "m²", v: "m" },
      { ctx: (k) => `Le bénéfice (en centaines d'euros) d'un snack qui vend $x$ dizaines de repas est $B(x) = -(x - 2)(x - ${2 + 2 * k})$.`, k: () => rand(2, 6), r1: () => 2, r2: (k) => 2 + 2 * k, hmax: (k) => k * k, th: (k) => 2 + k, qs: ["hmax", "th", "racines"], f: (k) => (x) => -(x - 2) * (x - 2 - 2 * k), u: "centaines d'€", v: "dizaines de repas" }
    ]);
    const k = S.k(), q = pick(S.qs), r1 = S.r1(k), r2 = S.r2(k), hmax = S.hmax(k), th = S.th(k), f = S.f(k);
    const fig = graph(repere([f], r1 - 0.5, r2 + 0.5, { curves: [{ f, a: r1, b: r2, closed: false }], xlabel: S.v, ylabel: S.u, aria: `Parabole tournée vers le bas, nulle en ${nbS(r1)} et ${nbS(r2)}, maximum ${nbS(hmax)} en ${nbS(th)}` }));
    if (q === "retombe") return { enonce: `${S.ctx(k)} Au bout de combien de temps la balle retombe-t-elle au sol ($h(t) = 0$, $t > 0$) ?`, figure: fig, mode: "nombre", prefixe: "$t =$", attendu: r2, suffixe: "s",
      erreurs: [{ valeur: th, message: "C'est l'instant de la hauteur maximale ; la balle retombe au sol deux fois plus tard." }, { valeur: hmax, message: "On demande un temps, pas une hauteur." }],
      aides: [`$h(t) = -5t^2 + ${10 * k}t = -5t(t - ${2 * k})$ (factorise).`, "Produit nul : $t = 0$ (départ) ou $t - " + 2 * k + " = 0$.", "On garde la solution strictement positive."],
      solution: `$h(t) = -5t(t - ${2 * k}) = 0 \\Leftrightarrow t = 0$ ou $t = ${2 * k}$. La balle retombe au bout de $${2 * k}$ s. (Le sommet, à $t = ${k}$ s, est au milieu des deux racines.)` };
    if (q === "racines") return { enonce: `${S.ctx(k)} Pour quelles valeurs de $x$ la grandeur est-elle nulle (séparées par « ; ») ?`, figure: fig, mode: "ensemble", attendu: [r1, r2],
      aides: ["La grandeur est nulle quand le produit est nul.", "Un produit est nul si et seulement si l'un des facteurs est nul.", `Les deux valeurs sont $${nb(r1)}$ et $${nb(r2)}$.`],
      solution: `Produit nul : $x = ${nb(r1)}$ ou $x = ${nb(r2)}$. ${S.u === "m²" ? "Dans les deux cas le rectangle est aplati : l'aire est nulle." : "Entre ces deux valeurs, le bénéfice est positif ; en dehors, le snack perd de l'argent."}` };
    if (q === "th") return { enonce: `${S.ctx(k)} Pour quelle valeur de ${S.v === "s" ? "$t$" : "$x$"} la grandeur est-elle maximale ?`, figure: fig, mode: "nombre", prefixe: S.v === "s" ? "$t =$" : "$x =$", attendu: th, suffixe: S.v,
      erreurs: [{ valeur: hmax, message: "On demande la valeur de la variable, pas le maximum lui-même." }, { valeur: r2, message: "À cette valeur la grandeur est nulle. Le maximum est au milieu des racines." }],
      aides: [`Les racines sont $${nb(r1)}$ et $${nb(r2)}$.`, "La parabole est tournée vers le bas : le maximum est au sommet, au milieu des racines.", `$\\dfrac{${nb(r1)} + ${nb(r2)}}{2}$.`],
      solution: `Racines $${nb(r1)}$ et $${nb(r2)}$ ; par symétrie, le sommet a pour abscisse $\\dfrac{${nb(r1)} + ${nb(r2)}}{2} = ${nb(th)}$ : la grandeur est maximale pour ${S.v === "s" ? "$t$" : "$x$"} $= ${nb(th)}$ ${S.v}.` };
    return { enonce: `${S.ctx(k)} Quelle est la valeur maximale de cette grandeur ?`, figure: fig, mode: "nombre", prefixe: "Maximum :", attendu: hmax, suffixe: S.u,
      erreurs: [{ valeur: th, message: "Ça, c'est la valeur de la variable au sommet. Le maximum est l'image de cette valeur." }, { valeur: arr(f(th + 1)), message: `Le sommet est en ${S.v === "s" ? "$t$" : "$x$"} $= ${nb(th)}$, milieu des racines.` }],
      aides: [`Racines $${nb(r1)}$ et $${nb(r2)}$ : le sommet est en ${S.v === "s" ? "$t$" : "$x$"} $= ${nb(th)}$.`, `Calcule l'image de $${nb(th)}$.`, `$${nb(hmax)}$.`],
      solution: `Le sommet est atteint au milieu des racines, en $${nb(th)}$, et vaut $f(${nb(th)}) = ${nb(hmax)}$ : le maximum est $${nb(hmax)}$ ${S.u}.` };
  });

  def("yp-vrai-faux", () => vraiFaux4([
    ["La courbe de $f(x) = 3x^2$ est tournée vers le haut.", true, "$a = 3 > 0$."],
    ["La parabole de $f(x) = -2x^2 + 5$ a pour sommet $(0\\,;5)$.", true, "forme $ax^2 + c$ : sommet sur l'axe des ordonnées, en $(0\\,;c)$."],
    ["$f(x) = (x - 1)(x - 5)$ a pour racines $1$ et $5$.", true, "produit nul."],
    ["L'axe de symétrie de la parabole $y = (x - 1)(x - 5)$ est $x = 3$.", true, "milieu des racines $\\dfrac{1 + 5}{2}$."],
    ["$f(x) = (x - 1)(x - 5)$ est négatif entre $1$ et $5$.", true, "$a = 1 > 0$ : signe contraire entre les racines."],
    ["$2$ est une racine de $f(x) = x^2 - 3x + 2$.", true, "$4 - 6 + 2 = 0$."],
    ["Si $f(x) = a(x - x_1)(x - x_2)$ avec $a < 0$, $f$ admet un maximum.", true, "parabole tournée vers le bas."],
    ["Deux points d'une parabole de même ordonnée sont symétriques par rapport à l'axe de symétrie.", true, "c'est ce qui permet de trouver l'axe en résolvant $f(x) = c$."],
    ["La courbe de $f(x) = -x^2 + 4$ est tournée vers le haut.", false, "$a = -1 < 0$ : vers le bas."],
    ["$f(x) = (x + 3)(x - 2)$ a pour racines $3$ et $2$.", false, "$x + 3 = 0$ donne $-3$ : racines $-3$ et $2$."],
    ["Le sommet de la parabole $y = (x - 2)(x - 6)$ a pour ordonnée $4$.", false, "abscisse $4$, ordonnée $f(4) = (2)(-2) = -4$."],
    ["Pour trouver les racines d'un polynôme de degré $2$, il faut toujours calculer le discriminant.", false, "avec la forme factorisée ou une racine évidente, pas besoin (le discriminant n'est pas au programme)."],
    ["$f(x) = (x - 1)(x - 5)$ est positif pour $x = 3$.", false, "$3$ est entre les racines : $f(3) = (2)(-2) = -4 < 0$."],
    ["Si $3$ est racine de $x^2 - 7x + 12$, l'autre racine est $-4$.", false, "$x^2 - 7x + 12 = (x - 3)(x - 4)$ : l'autre racine est $4$."]
  ], ["Signe de $a$ : orientation ; racines : où la courbe coupe l'axe des abscisses.", "Axe de symétrie au milieu des racines.", "Signe de $a$ à l'extérieur des racines, contraire entre."]));

  /* Figures du cours (chapitre 8) */
  FIGURES["yp-cours-orientation"] = () => graph({ xmin: -3.6, xmax: 3.6, ymin: -5.6, ymax: 5.6, h: 280, curves: [{ f: (x) => 0.5 * x * x, a: -3.2, b: 3.2, label: "a > 0", closed: false }, { f: (x) => -0.5 * x * x, a: -3.2, b: 3.2, label: "a < 0", closed: false }], points: [{ x: 0, y: 0, label: "sommet (0 ; 0)" }], aria: "Deux paraboles de sommet l'origine : y = 0,5x² tournée vers le haut, y = −0,5x² tournée vers le bas" });
  FIGURES["yp-cours-factorisee"] = () => graph({ xmin: -2.6, xmax: 6.6, ymin: -5.6, ymax: 6.6, h: 300, curves: [{ f: (x) => (x - 1) * (x - 5), a: -0.4, b: 6.4, label: "y = (x − 1)(x − 5)", closed: false }], points: [{ x: 1, y: 0, label: "1", gauche: true }, { x: 5, y: 0, label: "5" }, { x: 3, y: -4, label: "sommet (3 ; −4)" }], hlines: [], aria: "Parabole y = (x − 1)(x − 5) : racines 1 et 5, axe de symétrie x = 3, sommet (3 ; −4)" });
  FIGURES["yp-cours-signe"] = () => tabSigne(["−∞", "1", "5", "+∞"], ["+", "0", "−", "0", "+"], "", [["x − 1", ["−", "0", "+", "", "+"]], ["x − 5", ["−", "", "−", "0", "+"]], ["f(x)", ["+", "0", "−", "0", "+"]]]);
  FIGURES["yp-cours-trajectoire"] = () => graph({ xmin: -0.5, xmax: 4.7, ymin: -1.5, ymax: 22, xstep: 0.5, ystep: 2, xetiq: 1, yetiq: 4, h: 280, xlabel: "t (s)", ylabel: "h (m)", curves: [{ f: (t) => -5 * t * t + 20 * t, a: 0, b: 4, closed: false }], points: [{ x: 2, y: 20, label: "max 20 m à t = 2 s" }, { x: 4, y: 0, label: "sol à t = 4 s", gauche: true }], aria: "Hauteur d'une balle h(t) = −5t² + 20t : maximum 20 m à 2 s, retour au sol à 4 s" });

  /* ---------- Chapitre 9 : nombre dérivé et tangente (préfixe yd) ---------- */
  // Fonctions dont on connaît le nombre dérivé : f(x) = p x² + q x + r (f'(a) = 2pa + q) ou x³ (3a²)
  function fonctionDer() {
    if (Math.random() < 0.2) { const r = rand(-3, 3); return { tex: poly([1, 0, 0, r]), f: (x) => x ** 3 + r, d: (x) => 3 * x * x, type: "cube", p: 0, q: 0, r }; }
    const p = pick([1, 1, 1, -1, 2, 0.5, -0.5]), q = rand(-4, 4), r = rand(-4, 4);
    return { tex: poly([p, q, r]), f: (x) => p * x * x + q * x + r, d: (x) => 2 * p * x + q, type: "carre", p, q, r };
  }
  function figTangente(F, a, extra) {
    const fa = F.f(a), m = F.d(a);
    const o = repere([F.f], Math.min(a, 0) - 2, Math.max(a, 0) + 2, { h: 300, curves: [{ f: F.f, a: Math.min(a, 0) - 2, b: Math.max(a, 0) + 2, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", closed: false }, { f: (x) => fa + m * (x - a), a: a - 1.6, b: a + 1.6, closed: false }], points: [{ x: a, y: fa, label: `A(${nbS(a)} ; ${nbS(fa)})` }], aria: `Courbe de f et sa tangente au point A(${nbS(a)} ; ${nbS(fa)}), de coefficient directeur ${nbS(m)}` });
    return tiret(graph(Object.assign(o, extra || {})), 1);
  }

  def("yd-taux-h", () => {
    const F = fonctionDer(), a = rand(-3, 3), h = pick([1, 0.5, 0.1, 0.01, 2]);
    if (F.type === "cube" && Math.abs(a) > 2) return GEN["yd-taux-h"]();
    const t = pick(["taux", "taux", "limite"]);
    const tx = arr((F.f(a + h) - F.f(a)) / h, 6);
    if (t === "limite") {
      const expr = F.type === "cube" ? `${3 * a * a} ${plus(3 * a)}h + h^2`.replace("+ 0h ", "").replace(/^0 \+ /, "") : `${nb(F.d(a))} ${plus(F.p)}h`.replace(/^0 \+ /, "").replace(/ \+ 1h$/, " + h").replace(/ - 1h$/, " - h");
      return { enonce: `Pour $f(x) = ${F.tex}$, le taux de variation entre $${nb(a)}$ et $${nb(a)} + h$ vaut $${F.type === "cube" ? poly([1, 3 * a, 3 * a * a], "h") : aff(F.p, F.d(a), "h")}$. Vers quelle valeur tend-il quand $h$ se rapproche de $0$ ? (C'est $f'(${nb(a)})$.)`, mode: "nombre", prefixe: `$f'(${nb(a)}) =$`, attendu: F.d(a),
        erreurs: [{ valeur: F.type === "cube" ? 3 * a : F.p, message: "Quand $h$ tend vers $0$, les termes en $h$ disparaissent : il reste la constante." }, { valeur: F.f(a), message: "Ça, c'est $f(" + nb(a) + ")$, pas le nombre dérivé." }],
        aides: ["Remplace $h$ par des valeurs de plus en plus petites : $0{,}1$, $0{,}01$, $0{,}001$…", "Les termes qui contiennent $h$ deviennent négligeables.", `Il reste $${nb(F.d(a))}$.`],
        solution: `Quand $h \\to 0$, $${F.type === "cube" ? poly([1, 3 * a, 3 * a * a], "h") : aff(F.p, F.d(a), "h")} \\to ${nb(F.d(a))}$ : le nombre dérivé est $f'(${nb(a)}) = ${nb(F.d(a))}$, coefficient directeur de la tangente en $A(${nb(a)}\\,;${nb(F.f(a))})$.` };
    }
    return { enonce: `On pose $f(x) = ${F.tex}$. Calcule le taux de variation de $f$ entre $${nb(a)}$ et $${nb(a)} + h$ pour $h = ${nb(h)}$, c'est-à-dire entre $${nb(a)}$ et $${nb(a + h)}$.`, mode: "nombre", prefixe: "Taux :", attendu: tx,
      erreurs: [{ valeur: arr(F.f(a + h) - F.f(a), 6), message: `Divise par $h = ${nb(h)}$.` }, { valeur: F.d(a), message: "Ça, c'est la limite du taux (le nombre dérivé) : ici on demande le taux pour $h = " + nb(h) + "$, pas encore la limite." }, { valeur: arr((F.f(a) - F.f(a + h)) / h, 6), message: "Même ordre au numérateur et au dénominateur." }],
      aides: [`$f(${nb(a)}) = ${nb(F.f(a))}$ et $f(${nb(a + h)}) = ${nb(arr(F.f(a + h), 6))}$.`, `Taux $= \\dfrac{f(${nb(a + h)}) - f(${nb(a)})}{${nb(h)}}$.`, `$\\dfrac{${nb(arr(F.f(a + h) - F.f(a), 6))}}{${nb(h)}}$.`],
      solution: `$\\dfrac{f(${nb(a + h)}) - f(${nb(a)})}{${nb(h)}} = \\dfrac{${nb(arr(F.f(a + h), 6))} - ${pr(F.f(a))}}{${nb(h)}} = ${nb(tx)}$. Pour $h$ plus petit, ce taux se rapproche de $f'(${nb(a)}) = ${nb(F.d(a))}$.` };
  });

  def("yd-lecture", () => {
    const F = fonctionDer(), a = rand(-2, 2);
    const m = F.d(a), fa = F.f(a);
    if (Math.abs(m) > 6 || Math.abs(fa) > 12) return GEN["yd-lecture"]();
    const t = pick(["pente", "pente", "signe", "fa"]);
    const fig = figTangente(F, a);
    if (t === "signe") {
      const bonne = m > 0 ? "positif : la tangente monte" : m < 0 ? "négatif : la tangente descend" : "nul : la tangente est horizontale";
      const ch = choix4(bonne, ["positif : la tangente monte", "négatif : la tangente descend", "nul : la tangente est horizontale", "impossible à lire sur le graphique"].filter((s) => s !== bonne));
      return { enonce: `La droite en pointillés est la tangente à $C_f$ au point $A$ d'abscisse $${nb(a)}$. Quel est le signe de $f'(${nb(a)})$ ?`, figure: fig, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["$f'(a)$ est le coefficient directeur de la tangente en $A$.", "Une droite qui monte a un coefficient directeur positif ; qui descend, négatif ; horizontale, nul.", "Regarde la tangente en pointillés de gauche à droite."],
        solution: `La tangente ${m > 0 ? "monte" : m < 0 ? "descend" : "est horizontale"} : $f'(${nb(a)})$ est ${bonne.split(" :")[0]} (il vaut $${nb(m)}$).` };
    }
    if (t === "fa") return { enonce: `La droite en pointillés est la tangente à $C_f$ au point $A$. Lis $f(${nb(a)})$.`, figure: fig, mode: "nombre", prefixe: `$f(${nb(a)}) =$`, attendu: fa, erreurs: [{ valeur: m, message: "$f(a)$ est l'ordonnée du point $A$, pas la pente de la tangente." }], aides: ["$f(a)$ est l'ordonnée du point $A$ de la courbe.", "Lis les coordonnées de $A$ sur la figure.", `$A(${nb(a)}\\,;${nb(fa)})$.`], solution: `Le point $A$ a pour coordonnées $(${nb(a)}\\,;${nb(fa)})$ : $f(${nb(a)}) = ${nb(fa)}$.` };
    return { enonce: `La droite en pointillés est la tangente à $C_f$ au point $A(${nb(a)}\\,;${nb(fa)})$. Elle passe aussi par le point $(${nb(a + 1)}\\,;${nb(fa + m)})$. Lis $f'(${nb(a)})$.`, figure: figTangente(F, a, { points: [{ x: a, y: fa, label: `A(${nbS(a)} ; ${nbS(fa)})` }, { x: a + 1, y: fa + m, label: `(${nbS(a + 1)} ; ${nbS(fa + m)})` }] }), mode: "nombre", prefixe: `$f'(${nb(a)}) =$`, attendu: m,
      erreurs: [{ valeur: fa, message: "$f'(a)$ est la **pente** de la tangente, pas l'ordonnée de $A$." }, { valeur: -m, message: "Vérifie le sens : la tangente " + (m > 0 ? "monte" : "descend") + "." }, { valeur: fa + m, message: "C'est l'ordonnée du second point ; la pente est la variation de $y$ pour $+1$ en $x$." }],
      aides: ["$f'(a)$ est le coefficient directeur de la tangente.", `Entre $A(${nb(a)}\\,;${nb(fa)})$ et $(${nb(a + 1)}\\,;${nb(fa + m)})$, $x$ augmente de $1$.`, `$y$ varie de $${nb(fa + m)} - ${pr(fa)} = ${nb(m)}$.`],
      solution: `Coefficient directeur de la tangente : $\\dfrac{${nb(fa + m)} - ${pr(fa)}}{${nb(a + 1)} - ${pr(a)}} = ${nb(m)}$, donc $f'(${nb(a)}) = ${nb(m)}$.` };
  });

  def("yd-equation", () => {
    const t = pick(["choix", "choix", "ordonnee", "point"]);
    const a = rand(-3, 3), fa = rand(-6, 6), m = nz2(-4, 4);
    const p = fa - m * a, eq = `y = ${aff(m, p)}`;
    if (t === "choix") {
      const ch = choix4(`$${eq}$`, [`$y = ${aff(m, fa)}$`, `$y = ${aff(fa, m)}$`, `$y = ${aff(m, -p)}$`, `$y = ${aff(a, fa)}$`], () => `$y = ${aff(m + pick([-2, -1, 1, 2]), p + rand(-3, 3))}$`);
      return { enonce: `On sait que $f(${nb(a)}) = ${nb(fa)}$ et $f'(${nb(a)}) = ${nb(m)}$. Quelle est l'équation réduite de la tangente à $C_f$ au point d'abscisse $${nb(a)}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Équation de la tangente en $a$ : $y = f'(a)(x - a) + f(a)$.", `$y = ${fx(m)}(x ${plus(-a)}) ${plus(fa)}$.`, "Développe et réduis pour obtenir $y = mx + p$."],
        solution: `$y = f'(${nb(a)})(x - ${pr(a)}) + f(${nb(a)}) = ${fx(m)}(x ${plus(-a)}) ${plus(fa)} = ${aff(m, -m * a)} ${plus(fa)}$, soit $${eq}$. Vérification : pour $x = ${nb(a)}$, $y = ${nb(fa)}$.` };
    }
    if (t === "point") {
      const x = a + pick([-2, -1, 1, 2, 3]), y = m * x + p;
      return { enonce: `La tangente à $C_f$ au point d'abscisse $${nb(a)}$ a pour équation $${eq}$. Calcule l'ordonnée du point de cette tangente d'abscisse $${nb(x)}$.`, mode: "nombre", prefixe: "$y =$", attendu: y,
        erreurs: [{ valeur: m * x - p, message: "Attention au signe de l'ordonnée à l'origine." }, { valeur: x, message: "Remplace $x$ dans l'équation de la tangente." }],
        aides: [`Remplace $x$ par $${nb(x)}$ dans $${eq}$.`, `$${nb(m)} \\times ${pr(x)} ${plus(p)}$.`, "Ce point est sur la tangente, pas forcément sur la courbe."],
        solution: `$y = ${nb(m)} \\times ${pr(x)} ${plus(p)} = ${nb(y)}$. (Près de $A$, ce nombre est proche de $f(${nb(x)})$ : la tangente approche la courbe.)` };
    }
    return { enonce: `On sait que $f(${nb(a)}) = ${nb(fa)}$ et $f'(${nb(a)}) = ${nb(m)}$. La tangente en $${nb(a)}$ a pour équation $y = ${coef(m, "x")} + p$. Calcule $p$.`, mode: "nombre", prefixe: "$p =$", attendu: p,
      erreurs: [{ valeur: fa, message: "$p$ n'est pas $f(a)$ (sauf si $a = 0$) : utilise $y = f'(a)(x - a) + f(a)$." }, { valeur: fa + m * a, message: "$p = f(a) - f'(a) \\times a$ : attention au signe." }, { valeur: -p, message: "Vérifie le signe." }],
      aides: [`$y = f'(a)(x - a) + f(a) = ${fx(m)}(x ${plus(-a)}) ${plus(fa)}$.`, "Développe : le terme constant est $p$.", `$p = ${nb(-m * a)} ${plus(fa)}$.`],
      solution: `$y = ${fx(m)}(x ${plus(-a)}) ${plus(fa)} = ${coef(m, "x")} ${plus(-m * a)} ${plus(fa)} = ${aff(m, p)}$, donc $p = ${nb(p)}$. (Autre méthode : le point $A(${nb(a)}\\,;${nb(fa)})$ est sur la tangente, donc $${nb(fa)} = ${nb(m)} \\times ${pr(a)} + p$.)` };
  });

  def("yd-tracer", () => {
    const F = fonctionDer(), a = rand(-2, 2), m = F.d(a), fa = F.f(a);
    if (Math.abs(m) > 5 || Math.abs(fa) > 10 || m === 0) return GEN["yd-tracer"]();
    const pentes = shuffle([m, -m, m + pick([1, -1]) * rand(1, 2), 0].filter((v, i, A) => A.indexOf(v) === i)).slice(0, 4);
    if (pentes.length < 4) return GEN["yd-tracer"]();
    const noms = ["d₁", "d₂", "d₃", "d₄"], k = pentes.indexOf(m);
    const o = repere([F.f], Math.min(a, 0) - 2, Math.max(a, 0) + 2, { h: 300, curves: [{ f: F.f, a: Math.min(a, 0) - 2, b: Math.max(a, 0) + 2, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", closed: false }].concat(pentes.map((pe, j) => ({ f: (x) => fa + pe * (x - a), a: a - 1.4, b: a + 1.4, closed: false, label: noms[j], couleur: j + 1 }))), points: [{ x: a, y: fa, label: "A" }], aria: `Courbe de f, point A et quatre droites passant par A ; une seule est la tangente` });
    const ch = choix4(`$${noms[k]}$`, noms.filter((_, j) => j !== k).map((n) => `$${n}$`));
    return { enonce: `Quatre droites passent par le point $A$ de $C_f$. On sait que $f'(${nb(a)}) = ${nb(m)}$. Laquelle est la tangente à $C_f$ en $A$ ?`, figure: graph(o), mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["La tangente passe par $A$ et a pour coefficient directeur $f'(a)$.", `Ici le coefficient directeur doit être $${nb(m)}$ : la droite ${m > 0 ? "monte" : "descend"} de $${nb(Math.abs(m))}$ quand $x$ augmente de $1$.`, "La tangente est aussi la droite qui « colle » le mieux à la courbe autour de $A$."],
      solution: `La tangente en $A$ a pour coefficient directeur $f'(${nb(a)}) = ${nb(m)}$ : c'est la droite $${noms[k]}$, qui épouse la courbe au voisinage de $A$. Les autres droites coupent la courbe ou s'en écartent.` };
  });

  def("yd-contexte", () => {
    const S = pick([
      { ctx: (a, v) => `La position d'un scooter (en m) après $t$ secondes est donnée par $d(t)$. On sait que $d'(${a}) = ${nb(v)}$.`, q: "vitesse", bonne: (a, v) => `À l'instant $t = ${a}$ s, la vitesse instantanée du scooter est $${nb(v)}$ m/s`, faux: (a, v) => [`Après $${a}$ secondes, le scooter a parcouru $${nb(v)}$ m`, `La vitesse moyenne du scooter sur les $${a}$ premières secondes est $${nb(v)}$ m/s`, `Le scooter met $${nb(v)}$ s pour parcourir $${a}$ m`], a: () => rand(2, 20), v: () => pick([4, 6, 8, 10, 12, 15]) },
      { ctx: (a, v) => `Le coût total de fabrication (en €) de $q$ objets est $C(q)$. On sait que $C'(${a}) = ${nb(v)}$.`, q: "cout", bonne: (a, v) => `Fabriquer un objet de plus, après $${a}$ objets, coûte environ $${nb(v)}$ € (coût marginal)`, faux: (a, v) => [`Fabriquer $${a}$ objets coûte $${nb(v)}$ €`, `Chaque objet coûte en moyenne $${nb(v)}$ €`, `Le coût total augmente de $${nb(v)}\\,\\%$`], a: () => pick([50, 100, 200, 500]), v: () => pick([2.5, 3, 4, 5.5, 8, 12]) },
      { ctx: (a, v) => `La température (en °C) d'un four après $t$ minutes est $T(t)$. On sait que $T'(${a}) = ${nb(v)}$.`, q: "temp", bonne: (a, v) => `À $t = ${a}$ min, la température augmente à la vitesse de $${nb(v)}$ °C par minute`, faux: (a, v) => [`Après $${a}$ minutes, la température est de $${nb(v)}$ °C`, `La température a augmenté de $${nb(v)}$ °C en $${a}$ minutes`, `Le four met $${nb(v)}$ minutes à chauffer`], a: () => rand(2, 15), v: () => pick([3, 5, 8, 10, 15, 20]) },
      { ctx: (a, v) => `La hauteur d'eau (en cm) dans le port de Mamoudzou à l'instant $t$ (en h) est $h(t)$. On sait que $h'(${a}) = ${nb(v)}$.`, q: "maree", bonne: (a, v) => `À $${a}$ h, la mer ${v > 0 ? "monte" : "descend"} à la vitesse de $${nb(Math.abs(v))}$ cm par heure`, faux: (a, v) => [`À $${a}$ h, la hauteur d'eau est $${nb(v)}$ cm`, `À $${a}$ h, la mer ${v > 0 ? "descend" : "monte"} à la vitesse de $${nb(Math.abs(v))}$ cm par heure`, `En $${a}$ heures, la mer est ${v > 0 ? "montée" : "descendue"} de $${nb(Math.abs(v))}$ cm`], a: () => rand(6, 18), v: () => pick([-40, -25, -15, 15, 25, 40]) }
    ]);
    const a = S.a(), v = S.v();
    if (Math.random() < 0.6) {
      const ch = choix4(S.bonne(a, v), S.faux(a, v));
      return { enonce: `${S.ctx(a, v)} Que signifie ce nombre dérivé ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Le nombre dérivé $f'(a)$ est la limite du taux de variation : une **vitesse instantanée** de variation de la grandeur.", "Il se mesure en « unité de $f$ par unité de la variable ».", "Il ne donne ni la valeur de $f(a)$, ni une moyenne sur tout l'intervalle $[0\\,;a]$."],
        solution: `$f'(a)$ est la vitesse à laquelle la grandeur varie **à l'instant** $a$ : ${S.bonne(a, v).charAt(0).toLowerCase() + S.bonne(a, v).slice(1)}. Ce n'est ni $f(a)$ (la valeur), ni une vitesse moyenne.` };
    }
    // estimation avec la tangente : f(a + 1) ≈ f(a) + f'(a)
    const fa = S.q === "vitesse" ? rand(20, 80) : S.q === "cout" ? pick([400, 800, 1200, 2000]) : S.q === "temp" ? rand(60, 180) : rand(150, 300);
    const u = S.q === "vitesse" ? "m" : S.q === "cout" ? "€" : S.q === "temp" ? "°C" : "cm";
    const nomF = S.q === "vitesse" ? "d" : S.q === "cout" ? "C" : S.q === "temp" ? "T" : "h";
    return { enonce: `${S.ctx(a, v)} De plus, $${nomF}(${a}) = ${nb(fa)}$. En utilisant la tangente, estime $${nomF}(${a + 1})$.`, mode: "nombre", prefixe: `$${nomF}(${a + 1}) \\approx$`, attendu: arr(fa + v), suffixe: u,
      erreurs: [{ valeur: arr(fa - v), message: "On ajoute $f'(a) \\times 1$ : la grandeur " + (v > 0 ? "augmente" : "diminue") + "." }, { valeur: v, message: "Il faut partir de $" + nomF + "(" + a + ") = " + nb(fa) + "$." }, { valeur: arr(fa * v), message: "On ajoute, on ne multiplie pas : $f(a + 1) \\approx f(a) + f'(a)$." }],
      aides: ["Près de $a$, la courbe est proche de sa tangente : $f(a + h) \\approx f(a) + f'(a) \\times h$.", `Ici $h = 1$ : $${nomF}(${a + 1}) \\approx ${nomF}(${a}) + ${nomF}'(${a})$.`, `$${nb(fa)} ${plus(v)}$.`],
      solution: `Avec la tangente (approximation pour une petite variation) : $${nomF}(${a + 1}) \\approx ${nomF}(${a}) + ${nomF}'(${a}) \\times 1 = ${nb(fa)} ${plus(v)} = ${nb(arr(fa + v))}$ ${u}.` };
  });

  def("yd-vrai-faux", () => vraiFaux4([
    ["$f'(a)$ est le coefficient directeur de la tangente à $C_f$ au point d'abscisse $a$.", true, "c'est l'interprétation géométrique du nombre dérivé."],
    ["La tangente en $a$ a pour équation $y = f'(a)(x - a) + f(a)$.", true, "droite de pente $f'(a)$ passant par $(a\\,;f(a))$."],
    ["Si $f'(a) = 0$, la tangente en $a$ est horizontale.", true, "coefficient directeur nul."],
    ["Le nombre dérivé est la limite du taux de variation $\\dfrac{f(a + h) - f(a)}{h}$ quand $h$ tend vers $0$.", true, "c'est la définition."],
    ["Pour un mobile, $d'(t)$ est la vitesse instantanée à l'instant $t$.", true, "limite de la vitesse moyenne sur un intervalle de plus en plus court."],
    ["Si $f'(a) < 0$, la tangente en $a$ descend.", true, "coefficient directeur négatif."],
    ["La tangente est la position limite des sécantes passant par $A$ quand le second point se rapproche de $A$.", true, "c'est ainsi qu'on l'a définie."],
    ["Si $f(2) = 5$ et $f'(2) = 3$, la tangente en $2$ passe par $(2\\,;5)$.", true, "le point de tangence est sur la tangente."],
    ["$f'(a)$ est l'ordonnée du point de la courbe d'abscisse $a$.", false, "ça, c'est $f(a)$ ; $f'(a)$ est une pente."],
    ["Si $f(2) = 5$ et $f'(2) = 3$, la tangente en $2$ a pour équation $y = 3x + 5$.", false, "$y = 3(x - 2) + 5 = 3x - 1$."],
    ["Le taux de variation entre $a$ et $a + h$ est égal à $f'(a)$ pour tout $h$.", false, "il s'en rapproche seulement quand $h$ tend vers $0$ (sauf pour une fonction affine)."],
    ["Une tangente coupe toujours la courbe en un seul point.", false, "elle peut la recouper ailleurs ; ce qui compte, c'est le contact en $A$."],
    ["Le coût marginal $C'(q)$ est le coût moyen d'un objet.", false, "c'est le coût (approché) d'un objet supplémentaire après $q$ objets."],
    ["Si $f'(3) = 2$, alors $f(3) = 2$.", false, "$f(3)$ et $f'(3)$ sont deux informations différentes."]
  ], ["$f(a)$ : ordonnée du point ; $f'(a)$ : pente de la tangente.", "Équation de la tangente : $y = f'(a)(x - a) + f(a)$.", "Nombre dérivé = vitesse instantanée de variation."]));

  /* Figures du cours (chapitre 9) */
  FIGURES["yd-cours-secantes"] = () => {
    const f = (x) => 0.5 * x * x, a = 1, fa = 0.5;
    const secs = [3, 2, 1.5].map((b) => ({ f: (x) => fa + ((f(b) - fa) / (b - a)) * (x - a), a: -0.2, b: 3.6, closed: false }));
    let s = graph({ xmin: -1.6, xmax: 4.4, ymin: -1.6, ymax: 6.6, h: 300, curves: [{ f, a: -1.4, b: 3.5, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", closed: false }].concat(secs).concat([{ f: (x) => fa + 1 * (x - a), a: -0.6, b: 3.2, closed: false, couleur: 1 }]), points: [{ x: 1, y: 0.5, label: "A", gauche: true }, { x: 3, y: 4.5, label: "M₁" }, { x: 2, y: 2, label: "M₂" }, { x: 1.5, y: 1.125, label: "M₃" }], aria: "Parabole y = 0,5x², point A(1 ; 0,5) et sécantes (AM₁), (AM₂), (AM₃) qui se rapprochent de la tangente en A, de pente 1" });
    [1, 2, 3].forEach((i) => { s = tiret(s, i); });
    return s;
  };
  FIGURES["yd-cours-tangente"] = () => tiret(graph({ xmin: -1.6, xmax: 4.4, ymin: -1.6, ymax: 6.6, h: 300, curves: [{ f: (x) => 0.5 * x * x, a: -1.4, b: 3.5, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", closed: false }, { f: (x) => 2 * x - 2, a: 0.4, b: 4, closed: false }], points: [{ x: 2, y: 2, label: "A(2 ; 2)", gauche: true }, { x: 3, y: 4, label: "+1 → +2" }], aria: "Parabole y = 0,5x² et sa tangente en A(2 ; 2), d'équation y = 2x − 2 : f'(2) = 2" }), 1);
  FIGURES["yd-cours-vitesse"] = () => tiret(graph({ xmin: -0.5, xmax: 5.5, ymin: -5, ymax: 55, xstep: 1, ystep: 5, yetiq: 10, h: 280, xlabel: "t (s)", ylabel: "d (m)", curves: [{ f: (t) => 2 * t * t, a: 0, b: 5, closed: false }, { f: (t) => 18 + 12 * (t - 3), a: 1.5, b: 5, closed: false }], points: [{ x: 3, y: 18, label: "t = 3 s", gauche: true }], aria: "Distance parcourue d(t) = 2t² et tangente en t = 3 : vitesse instantanée 12 m/s" }), 1);

  /* ---------- Chapitre 10 : fonction dérivée et variations (préfixe yr) ---------- */
  // Polynôme de degré ≤ 3 : coefficients [a3, a2, a1, a0] ; dérivée
  const deriv = (P) => { const d = P.length - 1; return P.slice(0, -1).map((c, k) => c * (d - k)); };
  function polyAlea() {
    const t = pick(["deg2", "deg2", "deg3", "deg3"]);
    if (t === "deg2") { const a = pick([1, 1, 2, 3, -1, -2, 0.5]), b = nz2(-9, 9), c = rand(-9, 9); return [a, b, c]; }
    const a = pick([1, 1, 2, -1, -2]), b = rand(-6, 6), c = rand(-9, 9), d = rand(-5, 5); return [a, b, c, d];
  }

  def("yr-formules", () => {
    const P = polyAlea(), D = deriv(P), t = pick(["choix", "choix", "coef", "usuelle"]);
    if (t === "usuelle") {
      const U = pick([["x^2", "2x", "2x", ["x", "2", "x^2"]], ["x^3", "3x^2", "3x^2", ["3x", "x^2", "3x^3"]], ["5x^2", "10x", "10x", ["5x", "10x^2", "10"]], ["4x^3", "12x^2", "12x^2", ["4x^2", "12x", "12x^3"]], ["7x", "7", "7", ["7x", "0", "x"]], ["-3x^2", "-6x", "-6x", ["-3x", "6x", "-6x^2"]], ["x^2 + x^3", "2x + 3x^2", "2x + 3x^2", ["2x + 3x", "x + x^2", "2x^2 + 3x^3"]], ["9", "0", "0", ["9", "9x", "1"]], ["2x^3 - x", "6x^2 - 1", "6x^2 - 1", ["6x^2 - x", "2x^2 - 1", "6x - 1"]], ["x^2 - 5", "2x", "2x", ["2x - 5", "2x - 1", "x"]]]);
      const ch = choix4(`$f'(x) = ${U[1]}$`, U[3].map((s) => `$f'(x) = ${s}$`));
      return { enonce: `Quelle est la dérivée de $f(x) = ${U[0]}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Dérivées usuelles : $(x^2)' = 2x$, $(x^3)' = 3x^2$, $(x)' = 1$, une constante a pour dérivée $0$.", "$(kf)' = kf'$ : le coefficient multiplicateur reste.", "$(u + v)' = u' + v'$ : on dérive terme à terme."],
        solution: `En appliquant les formules usuelles terme à terme : $f'(x) = ${U[2]}$.` };
    }
    if (t === "coef") {
      const deg = D.length - 1, k = rand(0, deg), att = D[k];
      const nomT = deg - k === 0 ? "le terme constant" : deg - k === 1 ? "le coefficient de $x$" : `le coefficient de $x^${deg - k}$`;
      return { enonce: `On pose $f(x) = ${poly(P)}$. Dans $f'(x)$, que vaut ${nomT} ?`, mode: "nombre", prefixe: "Valeur :", attendu: att,
        erreurs: [{ valeur: P[k], message: "C'est le coefficient dans $f$, pas dans $f'$ : il faut multiplier par l'exposant." }, { valeur: P[k + 1], message: "Dériver fait baisser le degré : regarde le terme de degré juste au-dessus dans $f$." }, { valeur: -att, message: "Vérifie le signe." }],
        aides: [`Dérive terme à terme : $(ax^n)' = n a x^{n - 1}$.`, `$f'(x) = ${poly(D)}$.`, "Lis le coefficient demandé."],
        solution: `$f'(x) = ${poly(D)}$ : ${nomT.replace(/^le /, "le ")} vaut $${nb(att)}$.` };
    }
    const faux = [poly(D.map((c, k) => (k === 0 ? c : c + 1))), poly(P.length === 3 ? [P[0], P[1]] : [P[0], P[1], P[2]]), poly(D.map((c, k) => c / (D.length - k)).concat([0])), poly([D[0] * 2].concat(D.slice(1)))].map((s) => `$f'(x) = ${s}$`);
    const ch = choix4(`$f'(x) = ${poly(D)}$`, faux);
    return { enonce: `On pose $f(x) = ${poly(P)}$. Quelle est l'expression de $f'(x)$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Dérive chaque terme : $(ax^3)' = 3ax^2$, $(ax^2)' = 2ax$, $(ax)' = a$, constante $\\to 0$.", `Premier terme : $(${poly([P[0]].concat(Array(P.length - 1).fill(0)))})' = ${poly([D[0]].concat(Array(D.length - 1).fill(0)))}$.`, "Additionne les dérivées des termes."],
      solution: `Terme à terme : $f'(x) = ${poly(D)}$. (Le terme constant $${nb(P[P.length - 1])}$ disparaît.)` };
  });

  def("yr-valeur", () => {
    const P = polyAlea(), D = deriv(P), x0 = rand(-3, 3), att = evalP(D, x0);
    const t = pick(["valeur", "valeur", "tangente"]);
    if (t === "tangente") {
      const fa = evalP(P, x0), p = fa - att * x0;
      const bonne = `$y = ${aff(att, p)}$`;
      const ch = choix4(bonne, [`$y = ${aff(att, fa)}$`, `$y = ${aff(fa, att)}$`, `$y = ${aff(att, -p)}$`, `$y = ${aff(evalP(P, x0), p)}$`], () => `$y = ${aff(att + pick([-2, -1, 1, 2]), p + rand(-3, 3))}$`);
      return { enonce: `On pose $f(x) = ${poly(P)}$. Quelle est l'équation de la tangente à $C_f$ au point d'abscisse $${nb(x0)}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: [`$f'(x) = ${poly(D)}$, donc $f'(${nb(x0)}) = ${nb(att)}$.`, `$f(${nb(x0)}) = ${nb(fa)}$.`, `$y = f'(${nb(x0)})(x - ${pr(x0)}) + f(${nb(x0)})$.`],
        solution: `$f'(x) = ${poly(D)}$, $f'(${nb(x0)}) = ${nb(att)}$ et $f(${nb(x0)}) = ${nb(fa)}$. Tangente : $y = ${fx(att)}(x ${plus(-x0)}) ${plus(fa)} = ${aff(att, p)}$.` };
    }
    return { enonce: `On pose $f(x) = ${poly(P)}$. Calcule $f'(${nb(x0)})$.`, mode: "nombre", prefixe: `$f'(${nb(x0)}) =$`, attendu: att,
      erreurs: [{ valeur: evalP(P, x0), message: `Ça, c'est $f(${nb(x0)})$. Il faut d'abord dériver, puis remplacer.` }, { valeur: evalP(D, -x0), message: "Attention au signe de $x$ et aux parenthèses." }, { valeur: evalP(deriv(D), x0), message: "Tu as dérivé deux fois." }],
      aides: ["Calcule d'abord la fonction dérivée $f'(x)$.", `$f'(x) = ${poly(D)}$.`, `Remplace $x$ par $${nb(x0)}$.`],
      solution: `$f'(x) = ${poly(D)}$, donc $f'(${nb(x0)}) = ${poly(D).replace(/x/g, `(${nb(x0)})`)} = ${nb(att)}$. C'est la pente de la tangente au point d'abscisse $${nb(x0)}$.` };
  });

  def("yr-signe-variations", () => {
    const a = pick([1, 1, 2, 3, -1, -2, 0.5]), b = nz2(-8, 8), c = rand(-9, 9);
    const r = -b / (2 * a);
    if (!Number.isInteger(r * 4)) return GEN["yr-signe-variations"]();
    const D = [2 * a, b], t = pick(["signe", "variations", "variations", "extremum"]);
    const fr2 = !Number.isInteger(r), v = arr(a * r * r + b * r + c);
    const figSV = tabSV(["−∞", nbS(r), "+∞"], [a > 0 ? "-" : "+", "0", a > 0 ? "+" : "-"], ["", nbS(v), ""], "f");
    if (t === "signe") {
      const bonne = a > 0 ? `$f'(x) \\leqslant 0$ sur $]-\\infty\\,;${nb(r)}]$ et $f'(x) \\geqslant 0$ sur $[${nb(r)}\\,;+\\infty[$` : `$f'(x) \\geqslant 0$ sur $]-\\infty\\,;${nb(r)}]$ et $f'(x) \\leqslant 0$ sur $[${nb(r)}\\,;+\\infty[$`;
      const ch = choix4(bonne, [a > 0 ? `$f'(x) \\geqslant 0$ sur $]-\\infty\\,;${nb(r)}]$ et $f'(x) \\leqslant 0$ sur $[${nb(r)}\\,;+\\infty[$` : `$f'(x) \\leqslant 0$ sur $]-\\infty\\,;${nb(r)}]$ et $f'(x) \\geqslant 0$ sur $[${nb(r)}\\,;+\\infty[$`, `$f'(x) ${a > 0 ? "\\geqslant" : "\\leqslant"} 0$ pour tout $x$`, `$f'(x) \\leqslant 0$ sur $]-\\infty\\,;${nb(-r)}]$ et $f'(x) \\geqslant 0$ sur $[${nb(-r)}\\,;+\\infty[$`]);
      return { enonce: `On pose $f(x) = ${poly([a, b, c])}$. Quel est le signe de $f'(x)$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu, figureSolution: figSV,
        aides: [`$f'(x) = ${poly(D)}$, une expression du premier degré.`, `Elle s'annule en $x = ${nb(r)}$.`, `Le coefficient de $x$ dans $f'$ est $${nb(2 * a)}$ : ${2 * a > 0 ? "négatif avant la racine, positif après" : "positif avant la racine, négatif après"}.`],
        solution: `$f'(x) = ${poly(D)}$ s'annule en $${nb(r)}$ ; son coefficient directeur $${nb(2 * a)}$ est ${2 * a > 0 ? "positif" : "négatif"} : ${bonne}.` };
    }
    if (t === "extremum") {
      const q = pick(["ou", "val"]);
      return { enonce: `On pose $f(x) = ${poly([a, b, c])}$. ${q === "ou" ? `En quelle valeur de $x$ la fonction $f$ atteint-elle son ${a > 0 ? "minimum" : "maximum"}${fr2 ? " (nombre décimal ou fraction)" : ""} ?` : `Quel est le ${a > 0 ? "minimum" : "maximum"} de $f$ ?`}`, mode: "nombre", prefixe: q === "ou" ? "$x =$" : `${a > 0 ? "Minimum" : "Maximum"} :`, attendu: q === "ou" ? r : v,
        erreurs: [{ valeur: q === "ou" ? v : r, message: q === "ou" ? "On demande l'abscisse (là où $f'$ s'annule), pas la valeur de $f$." : "On demande la valeur $f(x_0)$, pas l'abscisse." }, { valeur: q === "ou" ? -r : c, message: q === "ou" ? "Résous $f'(x) = 0$ avec soin." : "Le terme constant $c$ est $f(0)$, pas l'extremum." }, ...(q === "ou" && fr2 ? approx(r) : [])],
        aides: [`$f'(x) = ${poly(D)}$ s'annule en $x = ${nb(r)}$ en changeant de signe.`, `$a = ${nb(a)}$ : $f$ est ${a > 0 ? "décroissante puis croissante : minimum" : "croissante puis décroissante : maximum"} en $${nb(r)}$.`, q === "ou" ? "C'est l'abscisse demandée." : `Calcule $f(${nb(r)})$.`],
        solution: `$f'(x) = ${poly(D)} = 0 \\Leftrightarrow x = ${nb(r)}$. $f'$ est ${2 * a > 0 ? "négative puis positive" : "positive puis négative"} : $f$ admet un ${a > 0 ? "minimum" : "maximum"} en $x = ${nb(r)}$, qui vaut $f(${nb(r)}) = ${nb(v)}$.` };
    }
    const bonne = a > 0 ? `décroissante sur $]-\\infty\\,;${nb(r)}]$, croissante sur $[${nb(r)}\\,;+\\infty[$` : `croissante sur $]-\\infty\\,;${nb(r)}]$, décroissante sur $[${nb(r)}\\,;+\\infty[$`;
    const ch = choix4(bonne, [a > 0 ? `croissante sur $]-\\infty\\,;${nb(r)}]$, décroissante sur $[${nb(r)}\\,;+\\infty[$` : `décroissante sur $]-\\infty\\,;${nb(r)}]$, croissante sur $[${nb(r)}\\,;+\\infty[$`, `${a > 0 ? "croissante" : "décroissante"} sur $\\mathbb{R}$`, `${a > 0 ? "décroissante" : "croissante"} sur $]-\\infty\\,;${nb(v)}]$, ${a > 0 ? "croissante" : "décroissante"} sur $[${nb(v)}\\,;+\\infty[$`]);
    return { enonce: `On pose $f(x) = ${poly([a, b, c])}$. En étudiant le signe de $f'(x)$, donne le sens de variation de $f$.`, mode: "choix", choix: ch.choix, attendu: ch.attendu, figureSolution: figSV,
      aides: [`$f'(x) = ${poly(D)}$.`, `$f'(x) = 0$ pour $x = ${nb(r)}$ ; $f'$ est ${2 * a > 0 ? "négative avant, positive après" : "positive avant, négative après"}.`, "$f$ est croissante là où $f' > 0$, décroissante là où $f' < 0$."],
      solution: `$f'(x) = ${poly(D)}$ est ${2 * a > 0 ? "négative sur $]-\\infty\\,;" + nb(r) + "]$ et positive après" : "positive sur $]-\\infty\\,;" + nb(r) + "]$ et négative après"} : $f$ est ${bonne}, avec un ${a > 0 ? "minimum" : "maximum"} $f(${nb(r)}) = ${nb(v)}$.` };
  });

  def("yr-cubique", () => {
    // f'(x) = 3a(x − r1)(x − r2) : f(x) = a x³ − (3a/2)(r1 + r2) x² + 3a r1 r2 x + d, avec r1 + r2 pair
    const a = pick([1, 1, -1]), r1 = rand(-3, 1), r2 = r1 + pick([2, 4]), d = rand(-5, 5);
    const P = [a, -1.5 * a * (r1 + r2), 3 * a * r1 * r2, d], D = deriv(P);
    const f = (x) => evalP(P, x), v1 = f(r1), v2 = f(r2);
    const ext = 3 * a > 0; // f' positif à l'extérieur des racines
    const t = pick(["tableau", "tableau", "extremum", "racines"]);
    const figSV = tabSV(["−∞", nbS(r1), nbS(r2), "+∞"], [ext ? "+" : "-", "0", ext ? "-" : "+", "0", ext ? "+" : "-"], ["", nbS(v1), nbS(v2), ""], "f");
    if (t === "racines") return { enonce: `On pose $f(x) = ${poly(P)}$. On admet que $f'(x) = ${nb(3 * a)}(x ${plus(-r1)})(x ${plus(-r2)})$. Pour quelles valeurs de $x$ a-t-on $f'(x) = 0$ (séparées par « ; ») ?`, mode: "ensemble", attendu: [r1, r2],
      aides: ["$f'(x)$ est donnée sous forme factorisée.", "Un produit est nul si et seulement si l'un des facteurs est nul.", `$x ${plus(-r1)} = 0$ ou $x ${plus(-r2)} = 0$.`],
      solution: `$f'(x) = 0 \\Leftrightarrow x = ${nb(r1)}$ ou $x = ${nb(r2)}$. En ces points, la tangente à la courbe est horizontale.` };
    if (t === "extremum") {
      const q = pick(["max", "min"]);
      const xM = ext ? r1 : r2, xm = ext ? r2 : r1; // maximum local en xM, minimum local en xm
      const att = q === "max" ? f(xM) : f(xm), ou = q === "max" ? xM : xm;
      return { enonce: `On pose $f(x) = ${poly(P)}$, avec $f'(x) = ${nb(3 * a)}(x ${plus(-r1)})(x ${plus(-r2)})$. Quel est le ${q === "max" ? "maximum" : "minimum"} local de $f$ (la valeur de $f$ en haut de la bosse${q === "max" ? "" : ", ou plutôt au fond du creux"}) ?`, mode: "nombre", prefixe: `${q === "max" ? "Maximum" : "Minimum"} local :`, attendu: att,
        erreurs: [{ valeur: ou, message: "On demande la valeur de $f$, pas l'abscisse où elle est atteinte." }, { valeur: q === "max" ? f(xm) : f(xM), message: q === "max" ? "Ça, c'est le minimum local." : "Ça, c'est le maximum local." }],
        aides: [`$f'$ s'annule en $${nb(r1)}$ et $${nb(r2)}$ ; elle est ${ext ? "positive à l'extérieur, négative entre" : "négative à l'extérieur, positive entre"}.`, `$f$ est donc ${ext ? "croissante, décroissante, croissante" : "décroissante, croissante, décroissante"} : ${q === "max" ? "maximum" : "minimum"} local en $x = ${nb(ou)}$.`, `Calcule $f(${nb(ou)})$.`],
        solution: `Tableau de signes de $f'$ : ${ext ? "$+$, $0$, $-$, $0$, $+$" : "$-$, $0$, $+$, $0$, $-$"}. Le ${q === "max" ? "maximum" : "minimum"} local est atteint en $x = ${nb(ou)}$ et vaut $f(${nb(ou)}) = ${nb(att)}$.` };
    }
    const bonne = ext ? `croissante sur $]-\\infty\\,;${nb(r1)}]$, décroissante sur $[${nb(r1)}\\,;${nb(r2)}]$, croissante sur $[${nb(r2)}\\,;+\\infty[$` : `décroissante sur $]-\\infty\\,;${nb(r1)}]$, croissante sur $[${nb(r1)}\\,;${nb(r2)}]$, décroissante sur $[${nb(r2)}\\,;+\\infty[$`;
    const ch = choix4(bonne, [ext ? `décroissante sur $]-\\infty\\,;${nb(r1)}]$, croissante sur $[${nb(r1)}\\,;${nb(r2)}]$, décroissante sur $[${nb(r2)}\\,;+\\infty[$` : `croissante sur $]-\\infty\\,;${nb(r1)}]$, décroissante sur $[${nb(r1)}\\,;${nb(r2)}]$, croissante sur $[${nb(r2)}\\,;+\\infty[$`, `${ext ? "croissante" : "décroissante"} sur $\\mathbb{R}$`, `${ext ? "croissante" : "décroissante"} sur $]-\\infty\\,;${nb(v1)}]$, ${ext ? "décroissante" : "croissante"} sur $[${nb(v1)}\\,;${nb(v2)}]$`]);
    return { enonce: `On pose $f(x) = ${poly(P)}$. On admet que $f'(x) = ${nb(3 * a)}(x ${plus(-r1)})(x ${plus(-r2)})$. Quel est le sens de variation de $f$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu, figureSolution: figSV,
      aides: [`Racines de $f'$ : $${nb(r1)}$ et $${nb(r2)}$.`, `Signe de $f'$ : celui de $${nb(3 * a)}$ à l'extérieur des racines, contraire entre.`, "Croissante là où $f' > 0$, décroissante là où $f' < 0$."],
      solution: `$f'(x)$ est ${ext ? "positive" : "négative"} à l'extérieur de $[${nb(r1)}\\,;${nb(r2)}]$ et ${ext ? "négative" : "positive"} entre. Donc $f$ est ${bonne}. Valeurs aux extremums : $f(${nb(r1)}) = ${nb(v1)}$, $f(${nb(r2)}) = ${nb(v2)}$.` };
  });

  def("yr-lecture", () => {
    const t = pick(["tableau", "tableau", "courbe"]);
    const r1 = rand(-4, 0), r2 = r1 + rand(2, 5), ext = pick([true, false]);
    if (t === "tableau") {
      const fig = tabSigne(["−∞", nbS(r1), nbS(r2), "+∞"], [ext ? "+" : "-", "0", ext ? "-" : "+", "0", ext ? "+" : "-"], "f′(x)");
      const q = pick(["var", "ext"]);
      if (q === "ext") {
        const bonne = ext ? `un maximum local en $x = ${nb(r1)}$ et un minimum local en $x = ${nb(r2)}$` : `un minimum local en $x = ${nb(r1)}$ et un maximum local en $x = ${nb(r2)}$`;
        const ch = choix4(bonne, [ext ? `un minimum local en $x = ${nb(r1)}$ et un maximum local en $x = ${nb(r2)}$` : `un maximum local en $x = ${nb(r1)}$ et un minimum local en $x = ${nb(r2)}$`, "aucun extremum", `un extremum en $x = ${nb((r1 + r2) / 2)}$ seulement`]);
        return { enonce: `Voici le tableau de signes de $f'$. Que peut-on dire des extremums de $f$ ?`, figure: fig, mode: "choix", choix: ch.choix, attendu: ch.attendu,
          aides: ["Là où $f'$ passe de $+$ à $-$, $f$ passe de croissante à décroissante : maximum local.", "Là où $f'$ passe de $-$ à $+$ : minimum local.", `Regarde le changement de signe en $${nb(r1)}$ puis en $${nb(r2)}$.`],
          solution: `En $${nb(r1)}$, $f'$ passe de ${ext ? "$+$ à $-$ : maximum" : "$-$ à $+$ : minimum"} local ; en $${nb(r2)}$, de ${ext ? "$-$ à $+$ : minimum" : "$+$ à $-$ : maximum"} local. $f$ admet donc ${bonne}.` };
      }
      const bonne = ext ? `croissante sur $]-\\infty\\,;${nb(r1)}]$ et sur $[${nb(r2)}\\,;+\\infty[$, décroissante sur $[${nb(r1)}\\,;${nb(r2)}]$` : `décroissante sur $]-\\infty\\,;${nb(r1)}]$ et sur $[${nb(r2)}\\,;+\\infty[$, croissante sur $[${nb(r1)}\\,;${nb(r2)}]$`;
      const ch = choix4(bonne, [ext ? `décroissante sur $]-\\infty\\,;${nb(r1)}]$ et sur $[${nb(r2)}\\,;+\\infty[$, croissante sur $[${nb(r1)}\\,;${nb(r2)}]$` : `croissante sur $]-\\infty\\,;${nb(r1)}]$ et sur $[${nb(r2)}\\,;+\\infty[$, décroissante sur $[${nb(r1)}\\,;${nb(r2)}]$`, `${ext ? "positive" : "négative"} sur $]-\\infty\\,;${nb(r1)}]$ et $[${nb(r2)}\\,;+\\infty[$`, `croissante sur $\\mathbb{R}$`]);
      return { enonce: `Voici le tableau de signes de $f'$. Quel est le sens de variation de $f$ ?`, figure: fig, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["$f' > 0$ : $f$ croissante ; $f' < 0$ : $f$ décroissante.", "Le tableau de signes de $f'$ donne le tableau de variations de $f$.", "Attention : le tableau parle du **signe** de $f'$, pas de celui de $f$."],
        solution: `Sur les intervalles où $f'$ est ${ext ? "positive" : "négative"}, $f$ est ${ext ? "croissante" : "décroissante"} ; entre les racines, c'est l'inverse : $f$ est ${bonne}.` };
    }
    const P = paraboleQ(), q = pick(["signe", "zero"]);
    const fig = figParabole(P);
    if (q === "zero") return { enonce: `Voici la courbe de $f$. Pour quelle valeur de $x$ a-t-on $f'(x) = 0$ ?`, figure: fig, mode: "nombre", prefixe: "$x =$", attendu: P.h,
      erreurs: [{ valeur: P.v, message: "On demande l'abscisse du point où la tangente est horizontale, pas l'ordonnée." }], aides: ["$f'(x) = 0$ là où la tangente est horizontale.", "Sur une parabole, c'est au sommet.", `Le sommet a pour abscisse $${nb(P.h)}$.`], solution: `La tangente est horizontale au sommet, d'abscisse $${nb(P.h)}$ : $f'(${nb(P.h)}) = 0$.` };
    const x = pick([P.h - rand(1, 3), P.h + rand(1, 3)]);
    if (Math.abs(x) > 5 || Math.abs(P.f(x)) > 6) return GEN["yr-lecture"]();
    const s = P.s * (x - P.h) > 0 ? "positif" : "négatif";
    const ch = choix4(`$f'(${nb(x)})$ est ${s}`, [`$f'(${nb(x)})$ est ${s === "positif" ? "négatif" : "positif"}`, `$f'(${nb(x)}) = 0$`, `$f'(${nb(x)}) = ${nb(P.f(x))}$`]);
    return { enonce: `Voici la courbe de $f$. Sans calcul, que peut-on dire de $f'(${nb(x)})$ ?`, figure: fig, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Le signe de $f'(x)$ est celui de la pente de la tangente en $x$.", `En $x = ${nb(x)}$, la courbe ${s === "positif" ? "monte" : "descend"} (de gauche à droite).`, "Courbe qui monte : $f' > 0$ ; qui descend : $f' < 0$."],
      solution: `Autour de $x = ${nb(x)}$, la courbe ${s === "positif" ? "monte" : "descend"} : la tangente a une pente ${s === "positif" ? "positive" : "négative"}, donc $f'(${nb(x)})$ est ${s}. (La valeur $f(${nb(x)}) = ${nb(P.f(x))}$ n'a rien à voir avec $f'(${nb(x)})$.)` };
  });

  def("yr-optimisation", () => {
    const S = pick([
      { ctx: (k) => `Un terrain rectangulaire est entouré de $${4 * k}$ m de clôture. On note $x$ sa largeur et $A(x) = x(${2 * k} - x) = -x^2 + ${2 * k}x$ son aire (en m²).`, k: () => rand(5, 15), P: (k) => [-1, 2 * k, 0], xq: (k) => k, vq: (k) => k * k, u: "m²", uv: "m" },
      { ctx: (k) => `Le bénéfice d'une entreprise (en milliers d'euros) pour $x$ tonnes produites est $B(x) = -2x^2 + ${4 * k}x - ${k * k}$.`, k: () => rand(3, 10), P: (k) => [-2, 4 * k, -k * k], xq: (k) => k, vq: (k) => k * k, u: "milliers d'€", uv: "t" },
      { ctx: (k) => `Le coût moyen de production (en €) de $x$ centaines d'objets est $C(x) = x^2 - ${2 * k}x + ${k * k + 5}$.`, k: () => rand(3, 12), P: (k) => [1, -2 * k, k * k + 5], xq: (k) => k, vq: () => 5, u: "€", uv: "centaines d'objets" },
      { ctx: (k) => `Une boîte sans couvercle est fabriquée dans un carré de carton de $${6 * k}$ cm de côté en découpant des carrés de côté $x$ aux coins ; son volume est $V(x) = 4x^3 - ${24 * k}x^2 + ${36 * k * k}x$ (en cm³), pour $0 < x < ${3 * k}$.`, k: () => rand(1, 4), P: (k) => [4, -24 * k, 36 * k * k, 0], xq: (k) => k, vq: (k) => 16 * k ** 3, u: "cm³", uv: "cm" }
    ]);
    const k = S.k(), P = S.P(k), D = deriv(P), q = pick(["ou", "ou", "val"]);
    const xq = S.xq(k), vq = S.vq(k), nomF = S.ctx(k).match(/\$([A-Z])\(x\)/)[1];
    const cube = P.length === 4;
    return { enonce: `${S.ctx(k)} ${q === "ou" ? `Pour quelle valeur de $x$ la grandeur est-elle ${P[0] > 0 && !cube ? "minimale" : "maximale"} ?` : `Quelle est la valeur ${P[0] > 0 && !cube ? "minimale" : "maximale"} de cette grandeur${cube ? " (sur $]0\\,;" + 3 * k + "[$)" : ""} ?`}`, mode: "nombre", prefixe: q === "ou" ? "$x =$" : (P[0] > 0 && !cube ? "Minimum :" : "Maximum :"), attendu: q === "ou" ? xq : vq, suffixe: q === "ou" ? S.uv : S.u,
      erreurs: [{ valeur: q === "ou" ? vq : xq, message: q === "ou" ? "On demande la valeur de $x$, pas celle de la grandeur." : "On demande la valeur de la grandeur, pas celle de $x$." }, ...(cube ? [{ valeur: q === "ou" ? 3 * k : evalP(P, 3 * k), message: `$x = ${3 * k}$ annule aussi la dérivée, mais hors de l'intervalle d'étude (volume nul).` }] : [])],
      aides: [`Dérive : $${nomF}'(x) = ${poly(D)}$.`, cube ? `$${nomF}'(x) = ${nb(D[0])}(x - ${k})(x - ${3 * k})$ : elle s'annule en $x = ${k}$ (et en $${3 * k}$, hors intervalle).` : `$${nomF}'(x) = 0 \\Leftrightarrow x = ${nb(xq)}$.`, q === "ou" ? "La dérivée change de signe en cette valeur : c'est l'extremum." : `Calcule $${nomF}(${nb(xq)})$.`],
      solution: `$${nomF}'(x) = ${poly(D)}$${cube ? ` $= ${nb(D[0])}(x - ${k})(x - ${3 * k})$` : ""}. ${cube ? `Sur $]0\\,;${3 * k}[$, $${nomF}'$ est positive avant $${k}$ et négative après` : `$${nomF}'$ s'annule en $x = ${nb(xq)}$ en passant ${P[0] > 0 ? "du négatif au positif" : "du positif au négatif"}`} : la grandeur est ${P[0] > 0 && !cube ? "minimale" : "maximale"} pour $x = ${nb(xq)}$ ${S.uv}, et vaut alors $${nomF}(${nb(xq)}) = ${nb(vq)}$ ${S.u}.` };
  });

  def("yr-vrai-faux", () => vraiFaux4([
    ["La dérivée de $x^2$ est $2x$.", true, "formule usuelle."],
    ["La dérivée de $x^3$ est $3x^2$.", true, "formule usuelle."],
    ["La dérivée de $5x^2 - 3x + 7$ est $10x - 3$.", true, "terme à terme, la constante disparaît."],
    ["Si $f'(x) > 0$ sur un intervalle, $f$ est croissante sur cet intervalle.", true, "c'est le lien signe de la dérivée / variations."],
    ["Si $f$ admet un maximum en $a$ (à l'intérieur de l'intervalle), alors $f'(a) = 0$.", true, "la tangente y est horizontale."],
    ["Pour $f(x) = x^2 - 6x$, $f'(x) = 0$ pour $x = 3$.", true, "$2x - 6 = 0$."],
    ["La dérivée d'une constante est $0$.", true, "une fonction constante ne varie pas."],
    ["La dérivée de $4x$ est $4$.", true, "$(kx)' = k$."],
    ["La dérivée de $x^3$ est $x^2$.", false, "c'est $3x^2$."],
    ["La dérivée de $x^2 + 5$ est $2x + 5$.", false, "la constante $5$ a pour dérivée $0$ : $2x$."],
    ["Si $f'(a) = 0$, alors $f$ admet forcément un extremum en $a$.", false, "$x^3$ en $0$ : dérivée nulle mais pas d'extremum ; il faut que $f'$ change de signe."],
    ["Si $f'(x) < 0$, alors $f(x) < 0$.", false, "le signe de $f'$ renseigne sur les variations de $f$, pas sur son signe."],
    ["La dérivée de $2x^3$ est $6x^3$.", false, "c'est $6x^2$ : le degré baisse."],
    ["Une fonction décroissante a une dérivée positive.", false, "sa dérivée est négative."]
  ], ["$(x^n)' = nx^{n - 1}$, constante $\\to 0$, $(kf)' = kf'$.", "Signe de $f'$ $\\to$ variations de $f$.", "Extremum : $f'$ s'annule **en changeant de signe**."]));

  /* Figures du cours (chapitre 10) */
  FIGURES["yr-cours-cubique"] = () => {
    const f = (x) => x ** 3 - 3 * x;
    let s = graph({ xmin: -2.6, xmax: 2.6, ymin: -3.6, ymax: 3.6, h: 290, curves: [{ f, a: -2.15, b: 2.15, label: "y = x³ − 3x", closed: false }, { f: () => 2, a: -1.7, b: -0.3, closed: false }, { f: () => -2, a: 0.3, b: 1.7, closed: false }], marques: [{ x: -1.8, y: -2.7, texte: "f′ > 0" }, { x: 0, y: 1.2, texte: "f′ < 0" }, { x: 1.8, y: 2.7, texte: "f′ > 0" }], points: [{ x: -1, y: 2, label: "max 2", gauche: true }, { x: 1, y: -2, label: "min −2" }], aria: "Courbe de x³ − 3x : monte, descend entre −1 et 1, remonte ; tangentes horizontales au maximum (−1 ; 2) et au minimum (1 ; −2)" });
    [1, 2].forEach((i) => { s = tiret(s, i); });
    return s;
  };
  FIGURES["yr-cours-tabsv"] = () => tabSV(["−∞", "−1", "1", "+∞"], ["+", "0", "−", "0", "+"], ["", "2", "−2", ""]);
  FIGURES["yr-cours-parabole"] = () => {
    const f = (x) => x * x - 4 * x + 1;
    return tiret(graph({ xmin: -1.6, xmax: 5.6, ymin: -4.6, ymax: 6.6, h: 290, curves: [{ f, a: -1.1, b: 5.1, label: "y = x² − 4x + 1", closed: false }, { f: () => -3, a: 0.8, b: 3.2, closed: false }], marques: [{ x: 0, y: 4.5, texte: "f′ < 0" }, { x: 4.2, y: 4.5, texte: "f′ > 0" }], points: [{ x: 2, y: -3, label: "min −3 en x = 2" }], aria: "Parabole y = x² − 4x + 1 : f′(x) = 2x − 4, négative avant 2, positive après ; minimum −3 en x = 2" }), 1);
  };
  FIGURES["yr-cours-formules"] = () => {
    const L = [["f(x)", "f′(x)"], ["k (constante)", "0"], ["x", "1"], ["x²", "2x"], ["x³", "3x²"], ["k·u(x)", "k·u′(x)"], ["u(x) + v(x)", "u′(x) + v′(x)"]];
    let s = `<svg class="graph" viewBox="0 0 320 ${26 * L.length + 10}" role="img" aria-label="Tableau des dérivées usuelles : constante 0, x donne 1, x² donne 2x, x³ donne 3x², k u donne k u′, u + v donne u′ + v′">`;
    L.forEach((l, i) => { s += `<rect x="10" y="${5 + 26 * i}" width="150" height="26" style="fill:${i === 0 ? "var(--lagon)" : "var(--surface)"};fill-opacity:${i === 0 ? 0.15 : 1};stroke:var(--doux);stroke-width:1"/><rect x="160" y="${5 + 26 * i}" width="150" height="26" style="fill:${i === 0 ? "var(--lagon)" : "var(--surface)"};fill-opacity:${i === 0 ? 0.15 : 1};stroke:var(--doux);stroke-width:1"/><text class="g-label" x="85" y="${22 + 26 * i}" text-anchor="middle" style="font-weight:${i === 0 ? 700 : 400}">${l[0]}</text><text class="g-label" x="235" y="${22 + 26 * i}" text-anchor="middle" style="font-weight:${i === 0 ? 700 : 400};fill:var(--lagon)">${l[1]}</text>`; });
    return s + `</svg>`;
  };

  /* ---------- Chapitre 11 : statistiques à deux variables (préfixe yn) ---------- */
  // Série (x ; y) presque affine : xs réguliers, y = a x + b + bruit ; moyennes « rondes » quand c'est possible
  const CONTEXTES2V = [
    { x: "année (rang)", y: "nombre de touristes (milliers)", xs: (n) => Array.from({ length: n }, (_, k) => k + 1), a: () => pick([2, 3, 4, 5]), b: () => rand(20, 40), nom: "rang de l'année $x$ et nombre de touristes $y$ (en milliers) venus à Mayotte" },
    { x: "tension (V)", y: "intensité (mA)", xs: (n) => Array.from({ length: n }, (_, k) => 2 * (k + 1)), a: () => pick([3, 4, 5]), b: () => 0, nom: "tension $x$ (en V) aux bornes d'un conducteur et intensité $y$ (en mA)" },
    { x: "dépenses de publicité (k€)", y: "ventes (k€)", xs: (n) => Array.from({ length: n }, (_, k) => 5 * (k + 1)), a: () => pick([2, 3, 4]), b: () => rand(10, 30), nom: "dépenses de publicité $x$ et chiffre d'affaires $y$ (en k€) d'une entreprise de Mamoudzou" },
    { x: "âge (mois)", y: "taille (cm)", xs: (n) => Array.from({ length: n }, (_, k) => 3 * (k + 1)), a: () => pick([2, 3]), b: () => rand(45, 55), nom: "âge $x$ (en mois) et taille $y$ (en cm) d'un enfant suivi à la PMI" },
    { x: "concentration (mg/L)", y: "absorbance (×100)", xs: (n) => Array.from({ length: n }, (_, k) => k + 1), a: () => pick([6, 8, 10, 12]), b: () => rand(0, 5), nom: "concentration $x$ (en mg/L) d'une solution et absorbance $y$ (×100) mesurée au laboratoire" }
  ];
  function serie2v(n) {
    const C = pick(CONTEXTES2V), N = n || rand(5, 7), xs = C.xs(N), a = C.a(), b = C.b();
    const bruit = Array.from({ length: N }, () => rand(-2, 2));
    // somme du bruit nulle → point moyen exactement sur la droite y = ax + b
    const s = bruit.reduce((t, v) => t + v, 0); bruit[N - 1] -= s;
    const ys = xs.map((x, k) => a * x + b + bruit[k]);
    return { C, xs, ys, a, b, mx: moyenne(xs), my: moyenne(ys) };
  }
  const tab2v = (S) => ({ lignes: [["x",...S.xs.map(nb)], ["y", ...S.ys.map(nb)]] });
  const figNuage = (S, extra) => nuage(S.xs, S.ys, Object.assign({ xlabel: "x", ylabel: "y", aria: `Nuage de points : ${S.xs.map((x, k) => `(${nbS(x)} ; ${nbS(S.ys[k])})`).join(", ")}` }, extra || {}));

  def("yn-point-moyen", () => {
    const S = serie2v(), q = pick(["x", "y", "y"]);
    if (!Number.isInteger(S.mx * 100) || !Number.isInteger(S.my * 100)) return GEN["yn-point-moyen"]();
    const att = q === "x" ? S.mx : S.my, L = q === "x" ? S.xs : S.ys;
    return { enonce: `Le tableau donne le ${S.C.nom}. Calcule ${q === "x" ? "l'abscisse $\\bar{x}$" : "l'ordonnée $\\bar{y}$"} du point moyen $G$ du nuage.`, tableau: tab2v(S), mode: "nombre", prefixe: q === "x" ? "$\\bar{x} =$" : "$\\bar{y} =$", attendu: att,
      erreurs: [{ valeur: L.reduce((t, v) => t + v, 0), message: `Divise la somme par le nombre de points, $${L.length}$.` }, { valeur: q === "x" ? S.my : S.mx, message: q === "x" ? "Ça, c'est $\\bar{y}$." : "Ça, c'est $\\bar{x}$." }],
      aides: [`Le point moyen $G(\\bar{x}\\,;\\bar{y})$ a pour coordonnées les moyennes des $x$ et des $y$.`, `On additionne les $${L.length}$ valeurs : $${L.map(nb).join("$ + $")}$.`, `La somme vaut $${nb(L.reduce((t, v) => t + v, 0))}$.`],
      solution: `Somme des $${L.length}$ valeurs : $${L.map(nb).join("$ + $")}$ $= ${nb(L.reduce((t, v) => t + v, 0))}$. Donc ${q === "x" ? "$\\bar{x}$" : "$\\bar{y}$"} $= \\dfrac{${nb(L.reduce((t, v) => t + v, 0))}}{${L.length}} = ${nb(att)}$. Le point moyen est $G(${nb(S.mx)}\\,;${nb(S.my)})$.` };
  });

  def("yn-nuage", () => {
    const S = serie2v(), t = pick(["forme", "lire", "lire", "plus"]);
    if (t === "lire") { const k = rand(0, S.xs.length - 1); return { enonce: `Le nuage représente le ${S.C.nom}. Lis l'ordonnée du point d'abscisse $${nb(S.xs[k])}$.`, figure: figNuage(S), mode: "nombre", prefixe: "$y =$", attendu: S.ys[k], erreurs: [{ valeur: S.xs[k], message: "L'ordonnée se lit sur l'axe vertical." }], aides: [`Repère $x = ${nb(S.xs[k])}$ sur l'axe horizontal.`, "Monte jusqu'au point du nuage.", "Lis sa hauteur sur l'axe vertical."], solution: `Le point d'abscisse $${nb(S.xs[k])}$ a pour ordonnée $${nb(S.ys[k])}$.` }; }
    if (t === "plus") { const k = S.ys.indexOf(Math.max(...S.ys)); return { enonce: `Le nuage représente le ${S.C.nom}. Quelle est l'abscisse du point le plus haut ?`, figure: figNuage(S), mode: "nombre", prefixe: "$x =$", attendu: S.xs[k], erreurs: [{ valeur: S.ys[k], message: "On demande l'abscisse, pas l'ordonnée." }], aides: ["Repère le point le plus haut du nuage.", "Lis son abscisse sur l'axe horizontal.", `Il a pour ordonnée $${nb(S.ys[k])}$.`], solution: `Le point le plus haut est $(${nb(S.xs[k])}\\,;${nb(S.ys[k])})$ : son abscisse est $${nb(S.xs[k])}$.` }; }
    const forme = pick(["affine", "affine", "aucune", "courbe"]);
    let xs = S.xs, ys = S.ys;
    if (forme === "aucune") ys = xs.map(() => rand(10, 60));
    if (forme === "courbe") ys = xs.map((x, k) => Math.round(3 * 2 ** (k * 0.7)));
    const bonne = forme === "affine" ? "les points sont presque alignés : un ajustement affine est pertinent" : forme === "aucune" ? "les points sont dispersés sans direction : un ajustement affine n'est pas pertinent" : "les points suivent une courbe qui monte de plus en plus vite : un ajustement affine n'est pas pertinent";
    const ch = choix4(bonne, ["les points sont presque alignés : un ajustement affine est pertinent", "les points sont dispersés sans direction : un ajustement affine n'est pas pertinent", "les points suivent une courbe qui monte de plus en plus vite : un ajustement affine n'est pas pertinent", "un ajustement affine est toujours pertinent"].filter((s) => s !== bonne));
    return { enonce: `Voici un nuage de points. Que peut-on dire ?`, figure: nuage(xs, ys, { xlabel: "x", ylabel: "y", aria: `Nuage de points ${forme === "affine" ? "presque alignés" : forme === "aucune" ? "dispersés" : "en courbe croissante de plus en plus vite"}` }), mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Un ajustement affine consiste à remplacer le nuage par une droite.", "Il n'est pertinent que si les points sont à peu près alignés.", "Imagine une règle posée sur le nuage : passe-t-elle près de tous les points ?"],
      solution: `Ici, ${bonne}.` };
  });

  def("yn-ajustement", () => {
    const S = serie2v(), t = pick(["interpoler", "extrapoler", "extrapoler", "inverse"]);
    const a = S.a, b = S.b, eq = `y = ${aff(a, b)}`;
    if (t === "inverse") {
      const yv = a * (S.xs[S.xs.length - 1] + rand(2, 6)) + b, x = (yv - b) / a;
      return { enonce: `Pour le ${S.C.nom}, on retient l'ajustement affine $${eq}$. Selon ce modèle, pour quelle valeur de $x$ obtient-on $y = ${nb(yv)}$ ?`, figure: figNuage(S, { curves: [{ f: (z) => a * z + b, a: S.xs[0] - 0.5, b: S.xs[S.xs.length - 1] + 0.5, closed: false }] }), mode: "nombre", prefixe: "$x =$", attendu: x,
        erreurs: [{ valeur: a * yv + b, message: `Tu as calculé l'image de $${nb(yv)}$ ; il faut résoudre $${aff(a, b)} = ${nb(yv)}$.` }, { valeur: (yv + b) / a, message: "Attention au signe en isolant $x$." }],
        aides: [`On résout $${aff(a, b)} = ${nb(yv)}$.`, `$${coef(a, "x")} = ${nb(yv - b)}$.`, `$x = \\dfrac{${nb(yv - b)}}{${a}}$.`],
        solution: `$${aff(a, b)} = ${nb(yv)} \\Leftrightarrow ${coef(a, "x")} = ${nb(yv - b)} \\Leftrightarrow x = ${nb(x)}$.` };
    }
    const x = t === "interpoler" ? S.xs[0] + (S.xs[1] - S.xs[0]) * (rand(1, S.xs.length - 2) + 0.5) : S.xs[S.xs.length - 1] + (S.xs[1] - S.xs[0]) * rand(2, 5);
    const y = arr(a * x + b);
    return { enonce: `Pour le ${S.C.nom}, on retient l'ajustement affine $${eq}$. ${t === "interpoler" ? `Estime $y$ pour $x = ${nb(x)}$ (interpolation, à l'intérieur des données).` : `Estime $y$ pour $x = ${nb(x)}$ (extrapolation, au-delà des données).`}`, figure: figNuage(S, { curves: [{ f: (z) => a * z + b, a: S.xs[0] - 0.5, b: S.xs[S.xs.length - 1] + 0.5, closed: false }] }), mode: "nombre", prefixe: "$y \\approx$", attendu: y,
      erreurs: [{ valeur: arr((x - b) / a), message: "On calcule l'image de $x$ par la droite : remplace $x$ dans l'équation." }, { valeur: arr(a * x - b), message: "Attention au signe de l'ordonnée à l'origine." }],
      aides: [`On remplace $x$ par $${nb(x)}$ dans $${eq}$.`, `$${a} \\times ${nb(x)} ${plus(b)}$.`, t === "extrapoler" ? "Une extrapolation suppose que la tendance continue : c'est une estimation à prendre avec prudence." : "On reste dans la zone des données : l'estimation est raisonnable."],
      solution: `$y = ${a} \\times ${nb(x)} ${plus(b)} = ${nb(y)}$. ${t === "extrapoler" ? "C'est une extrapolation : elle n'a de sens que si la tendance observée se poursuit." : "C'est une interpolation, à l'intérieur de la plage des données."}` };
  });

  def("yn-droite-g", () => {
    const S = serie2v();
    if (!Number.isInteger(S.mx * 100) || !Number.isInteger(S.my * 100)) return GEN["yn-droite-g"]();
    const t = pick(["p", "p", "choisir"]);
    if (t === "choisir") {
      const bonne = `$y = ${aff(S.a, S.b)}$`;
      const ch = choix4(bonne, [`$y = ${aff(S.a, S.b + 5)}$`, `$y = ${aff(S.a + 1, S.b)}$`, `$y = ${aff(-S.a, S.my + S.a * S.mx)}$`, `$y = ${aff(S.a, S.my)}$`].filter((s) => s !== bonne));
      return { enonce: `Le tableau donne le ${S.C.nom}, de point moyen $G(${nb(S.mx)}\\,;${nb(S.my)})$. Parmi ces droites, laquelle passe par $G$ et suit la tendance du nuage ?`, tableau: tab2v(S), mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Une bonne droite d'ajustement passe par le point moyen $G$.", `Vérifie pour chaque droite si $x = ${nb(S.mx)}$ donne $y = ${nb(S.my)}$.`, "Le nuage monte : le coefficient directeur doit être positif et proche de la pente des points."],
        solution: `$${S.a} \\times ${nb(S.mx)} ${plus(S.b)} = ${nb(S.my)}$ : la droite ${bonne} passe par $G$, et sa pente $${S.a}$ suit celle du nuage.` };
    }
    return { enonce: `Le tableau donne le ${S.C.nom}. On ajuste le nuage par une droite de coefficient directeur $${S.a}$ passant par le point moyen $G$. Calcule son ordonnée à l'origine $p$ (équation $y = ${S.a}x + p$).`, tableau: tab2v(S), mode: "nombre", prefixe: "$p =$", attendu: S.b,
      erreurs: [{ valeur: S.my, message: "$p$ n'est pas $\\bar{y}$ : il faut que $G$ vérifie l'équation, $\\bar{y} = " + S.a + "\\bar{x} + p$." }, { valeur: S.my + S.a * S.mx, message: "Attention au signe : $p = \\bar{y} - " + S.a + "\\bar{x}$." }],
      aides: ["Calcule d'abord le point moyen $G(\\bar{x}\\,;\\bar{y})$.", `$G(${nb(S.mx)}\\,;${nb(S.my)})$.`, `$G$ est sur la droite : $${nb(S.my)} = ${S.a} \\times ${nb(S.mx)} + p$.`],
      solution: `$\\bar{x} = ${nb(S.mx)}$ et $\\bar{y} = ${nb(S.my)}$. La droite passe par $G$ : $${nb(S.my)} = ${S.a} \\times ${nb(S.mx)} + p$, donc $p = ${nb(S.my)} - ${nb(S.a * S.mx)} = ${nb(S.b)}$. Droite d'ajustement : $y = ${aff(S.a, S.b)}$.` };
  });

  def("yn-mayer", () => {
    const S = serie2v(6), x1 = moyenne(S.xs.slice(0, 3)), y1 = moyenne(S.ys.slice(0, 3)), x2 = moyenne(S.xs.slice(3)), y2 = moyenne(S.ys.slice(3));
    if (![x1, y1, x2, y2].every((v) => Number.isInteger(v * 100))) return GEN["yn-mayer"]();
    const m = (y2 - y1) / (x2 - x1);
    if (!Number.isInteger(m * 100)) return GEN["yn-mayer"]();
    const q = pick(["g1", "pente", "pente"]);
    if (q === "g1") { const quoi = pick(["x", "y"]); return { enonce: `Méthode de Mayer : on partage le nuage en deux groupes de $3$ points (les $3$ premiers, les $3$ derniers). Calcule ${quoi === "x" ? "l'abscisse" : "l'ordonnée"} du point moyen $G_1$ du premier groupe.`, tableau: tab2v(S), mode: "nombre", prefixe: quoi === "x" ? "$x_{G_1} =$" : "$y_{G_1} =$", attendu: quoi === "x" ? x1 : y1, erreurs: [{ valeur: quoi === "x" ? S.mx : S.my, message: "Ça, c'est la moyenne de tout le nuage : on ne prend que les $3$ premiers points." }], aides: ["$G_1$ est le point moyen des $3$ premiers points.", `Moyenne de $${(quoi === "x" ? S.xs : S.ys).slice(0, 3).map(nb).join("$, $")}$.`, "Somme divisée par $3$."], solution: `$${quoi === "x" ? "x" : "y"}_{G_1} = \\dfrac{${(quoi === "x" ? S.xs : S.ys).slice(0, 3).map(nb).join(" + ")}}{3} = ${nb(quoi === "x" ? x1 : y1)}$.` }; }
    return { enonce: `Méthode de Mayer : les points moyens des deux moitiés du nuage sont $G_1(${nb(x1)}\\,;${nb(y1)})$ et $G_2(${nb(x2)}\\,;${nb(y2)})$. Quel est le coefficient directeur de la droite de Mayer $(G_1G_2)$ ?`, mode: "nombre", prefixe: "$m =$", attendu: m,
      erreurs: [{ valeur: y2 - y1, message: "Divise par la différence des abscisses." }, { valeur: (x2 - x1) / (y2 - y1), message: "Les ordonnées au numérateur : $\\dfrac{y_2 - y_1}{x_2 - x_1}$." }],
      aides: ["$m = \\dfrac{y_{G_2} - y_{G_1}}{x_{G_2} - x_{G_1}}$.", `$\\dfrac{${nb(y2)} - ${nb(y1)}}{${nb(x2)} - ${nb(x1)}}$.`, `$\\dfrac{${nb(y2 - y1)}}{${nb(x2 - x1)}}$.`],
      solution: `$m = \\dfrac{${nb(y2)} - ${nb(y1)}}{${nb(x2)} - ${nb(x1)}} = \\dfrac{${nb(y2 - y1)}}{${nb(x2 - x1)}} = ${nb(m)}$. La droite de Mayer passe aussi par le point moyen $G$ de tout le nuage.` };
  });

  def("yn-moindres-carres", () => {
    const xs = [1, 2, 3, 4], a = pick([2, 3, 4]), b = rand(1, 6), e = shuffle([1, -1, 0, 0]);
    const ys = xs.map((x, k) => a * x + b + e[k]);
    const t = pick(["somme", "somme", "comparer"]);
    if (t === "comparer") {
      const d1 = [a, b], d2 = [a, b + pick([2, -2])], S = ([m, p]) => xs.reduce((s, x, k) => s + (ys[k] - (m * x + p)) ** 2, 0);
      const s1 = S(d1), s2 = S(d2), bonne = s1 < s2 ? `$y = ${aff(d1[0], d1[1])}$` : `$y = ${aff(d2[0], d2[1])}$`;
      const ch = choix4(bonne, [s1 < s2 ? `$y = ${aff(d2[0], d2[1])}$` : `$y = ${aff(d1[0], d1[1])}$`, "Les deux se valent", "On ne peut pas comparer deux droites"]);
      return { enonce: `Nuage : $${xs.map((x, k) => `(${x}\\,;${ys[k]})`).join("$, $")}$. Selon le critère des moindres carrés (somme des carrés des écarts verticaux la plus petite), quelle droite ajuste le mieux : $y = ${aff(d1[0], d1[1])}$ ou $y = ${aff(d2[0], d2[1])}$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Pour chaque point, écart vertical $= y_i - (mx_i + p)$.", "On additionne les carrés de ces écarts pour chaque droite.", `Sommes : $${s1}$ pour la première, $${s2}$ pour la seconde.`],
        solution: `Somme des carrés des écarts : $${s1}$ pour $y = ${aff(d1[0], d1[1])}$ et $${s2}$ pour $y = ${aff(d2[0], d2[1])}$. La meilleure au sens des moindres carrés est ${bonne}.` };
    }
    const sum = xs.reduce((s, x, k) => s + (ys[k] - (a * x + b)) ** 2, 0);
    return { enonce: `Nuage : $${xs.map((x, k) => `(${x}\\,;${ys[k]})`).join("$, $")}$. Pour la droite $y = ${aff(a, b)}$, calcule la somme des carrés des écarts $\\sum (y_i - (${a}x_i ${plus(b)}))^2$.`, mode: "nombre", prefixe: "Somme :", attendu: sum,
      erreurs: [{ valeur: xs.reduce((s, x, k) => s + (ys[k] - (a * x + b)), 0), message: "Il faut élever chaque écart au carré avant d'additionner (sinon les écarts se compensent)." }, { valeur: xs.reduce((s, x, k) => s + Math.abs(ys[k] - (a * x + b)), 0), message: "Le critère utilise les carrés des écarts, pas leurs valeurs absolues." }],
      aides: [`Pour chaque $x_i$, calcule $${a}x_i ${plus(b)}$ puis l'écart avec $y_i$.`, `Écarts : $${xs.map((x, k) => nb(ys[k] - (a * x + b))).join("$, $")}$.`, "Élève au carré et additionne."],
      solution: `Écarts : $${xs.map((x, k) => nb(ys[k] - (a * x + b))).join("$, $")}$. Carrés : $${xs.map((x, k) => (ys[k] - (a * x + b)) ** 2).join(" + ")} = ${sum}$. La droite des moindres carrés est celle qui rend cette somme la plus petite possible.` };
  });

  def("yn-critique", () => vraiFaux4([
    ["Une droite d'ajustement passe par le point moyen du nuage.", true, "c'est le cas de la droite des moindres carrés et de la droite de Mayer."],
    ["Estimer une valeur entre les données s'appelle une interpolation.", true, "on reste dans la plage observée."],
    ["Une extrapolation lointaine peut être fausse si la tendance change.", true, "le modèle n'est validé que sur la plage des données."],
    ["Un ajustement affine n'est pertinent que si le nuage est à peu près rectiligne.", true, "sinon une droite représente mal les données."],
    ["La méthode des moindres carrés minimise la somme des carrés des écarts verticaux.", true, "c'est sa définition."],
    ["Le point moyen a pour coordonnées $(\\bar{x}\\,;\\bar{y})$.", true, "les moyennes des deux séries."],
    ["En physique, la droite d'étalonnage permet de retrouver une concentration à partir d'une mesure.", true, "on lit l'antécédent sur la droite."],
    ["Avec un ajustement affine de la taille d'un enfant, on peut prédire sa taille à $40$ ans.", false, "la croissance s'arrête : l'extrapolation n'a plus de sens."],
    ["Deux grandeurs dont le nuage est rectiligne sont forcément liées par une cause.", false, "un lien statistique n'est pas une preuve de causalité."],
    ["La droite d'ajustement passe par tous les points du nuage.", false, "elle passe au plus près, pas forcément par les points."],
    ["Pour la méthode des moindres carrés, on additionne les écarts sans les élever au carré.", false, "les écarts positifs et négatifs se compenseraient."],
    ["Un nuage de points se trace en reliant les points dans l'ordre.", false, "on place les points sans les relier."],
    ["Il n'existe qu'une seule façon d'ajuster un nuage par une droite.", false, "au jugé, Mayer, moindres carrés… donnent des droites voisines."]
  ], ["Pense à ce qu'est une droite d'ajustement : une approximation du nuage.", "Interpolation : dans les données ; extrapolation : au-delà.", "Corrélation n'est pas causalité."]));

  /* Figures du cours (chapitre 11) */
  FIGURES["yn-cours-nuage"] = () => nuage([1, 2, 3, 4, 5, 6], [32, 36, 37, 42, 44, 49], { xlabel: "rang", ylabel: "milliers", ystep: 5, curves: [{ f: (x) => 3.3 * x + 28.67, a: 0.5, b: 6.5, closed: false }], points: [1, 2, 3, 4, 5, 6].map((x, k) => ({ x, y: [32, 36, 37, 42, 44, 49][k] })).concat([{ x: 3.5, y: 40, label: "G(3,5 ; 40)" }]), aria: "Nuage de 6 points presque alignés, point moyen G(3,5 ; 40) et droite d'ajustement" });
  FIGURES["yn-cours-ecarts"] = () => {
    const xs = [1, 2, 3, 4], ys = [5, 6, 10, 11], f = (x) => 2.2 * x + 2.5;
    return graphePlus({ xmin: -0.3, xmax: 5, ymin: -0.6, ymax: 13, xstep: 1, ystep: 1, yetiq: 2, h: 260, curves: [{ f, a: 0.3, b: 4.7, closed: false }], points: xs.map((x, k) => ({ x, y: ys[k] })), aria: "Quatre points et une droite ; les écarts verticaux entre chaque point et la droite sont tracés en pointillés" }, (X, Y) => xs.map((x, k) => `<line x1="${X(x)}" y1="${Y(ys[k])}" x2="${X(x)}" y2="${Y(f(x))}" style="stroke:var(--faux);stroke-width:1.6;stroke-dasharray:3 3"/>`).join(""));
  };
  FIGURES["yn-cours-mayer"] = () => nuage([1, 2, 3, 4, 5, 6], [4, 7, 7, 11, 12, 15], { xlabel: "x", ylabel: "y", points: [1, 2, 3, 4, 5, 6].map((x, k) => ({ x, y: [4, 7, 7, 11, 12, 15][k] })).concat([{ x: 2, y: 6, label: "G₁" }, { x: 5, y: 38 / 3, label: "G₂" }]), curves: [{ f: (x) => 6 + (20 / 9) * (x - 2), a: 0.5, b: 6.5, closed: false }], aria: "Méthode de Mayer : G1 point moyen des 3 premiers points, G2 des 3 derniers, droite (G1G2)" });

  /* ---------- Chapitre 12 : probabilités conditionnelles et indépendance (préfixe yi) ---------- */
  const pTex = (x) => nb(arr(x, 6)); // probabilité décimale
  // Tableau croisé d'effectifs : deux critères A/Ā et B/B̄
  const CROISES = [
    { pop: "élèves d'un lycée", A: ["internes", "externes"], B: ["en Seconde", "en Première"], nA: "I", nB: "S" },
    { pop: "clients d'un supermarché", A: ["qui ont la carte de fidélité", "sans carte"], B: ["qui paient par carte bancaire", "qui paient en espèces"], nA: "F", nB: "C" },
    { pop: "personnes testées au dispensaire", A: ["malades", "non malades"], B: ["avec un test positif", "avec un test négatif"], nA: "M", nB: "T" },
    { pop: "habitants interrogés", A: ["qui vivent à Petite-Terre", "qui vivent à Grande-Terre"], B: ["qui prennent la barge chaque jour", "qui ne la prennent pas chaque jour"], nA: "P", nB: "B" },
    { pop: "licenciés d'un club", A: ["filles", "garçons"], B: ["qui font du handball", "qui font du football"], nA: "F", nB: "H" }
  ];
  function croise() {
    const C = pick(CROISES), a = rand(4, 30), b = rand(4, 30), c = rand(4, 30), d = rand(4, 30);
    const N = a + b + c + d;
    return { C, a, b, c, d, N, lignes: [["", `${C.nB}`, `\\overline{${C.nB}}`, "Total"], [`${C.nA}`, a, b, a + b], [`\\overline{${C.nA}}`, c, d, c + d], ["Total", a + c, b + d, N]] };
  }

  def("yi-tableau", () => {
    const T = croise(), C = T.C, nA = C.nA, nB = C.nB;
    const Q = pick([
      ["P(" + nA + " \\cap " + nB + ")", T.a, T.N, `les ${C.pop} ${C.A[0]} **et** ${C.B[0]}`],
      ["P_{" + nA + "}(" + nB + ")", T.a, T.a + T.b, `parmi les ${C.A[0]}, ceux ${C.B[0]}`],
      ["P_{" + nB + "}(" + nA + ")", T.a, T.a + T.c, `parmi ceux ${C.B[0]}, les ${C.A[0]}`],
      ["P(" + nB + ")", T.a + T.c, T.N, `ceux ${C.B[0]}`],
      ["P_{\\overline{" + nA + "}}(" + nB + ")", T.c, T.c + T.d, `parmi les ${C.A[1]}, ceux ${C.B[0]}`],
      ["P(" + nA + " \\cup " + nB + ")", T.a + T.b + T.c, T.N, `ceux qui sont ${C.A[0]} **ou** ${C.B[0]}`]
    ]);
    const att = Q[1] / Q[2];
    return { enonce: `Le tableau croisé donne la répartition de $${T.N}$ ${C.pop} : $${nA}$ désigne ceux ${C.A[0]}, $${nB}$ ceux ${C.B[0]}. On choisit une personne au hasard. Calcule $${Q[0]}$ (fraction).`, tableau: { lignes: T.lignes }, mode: "nombre", prefixe: `$${Q[0]} =$`, attendu: att,
      erreurs: [{ valeur: Q[1] / T.N, message: "Une probabilité conditionnelle se calcule dans la sous-population : le dénominateur n'est pas l'effectif total." }, { valeur: Q[1] / (T.a + T.c === Q[2] ? T.a + T.b : T.a + T.c), message: "Attention à l'ordre : $P_A(B)$ se calcule **parmi** les $A$." }, ...approx(att)],
      aides: ["$P_A(B)$ : probabilité de $B$ **sachant** $A$ : on se restreint aux individus de $A$.", `Ici on compte ${Q[3]}.`, `Effectif favorable : $${Q[1]}$ ; effectif de référence : $${Q[2]}$.`],
      solution: `$${Q[0]} = \\dfrac{${Q[1]}}{${Q[2]}}${pgcd(Q[1], Q[2]) > 1 ? " = " + frac(Q[1], Q[2]) : ""}$ : on compte ${Q[3]}.` };
  });

  // [A au subjonctif, B au subjonctif, A à l'indicatif, B à l'indicatif, lettre A, lettre B]
  const DISTINGUER = [
    ["l'élève soit interne", "il soit en Seconde", "l'élève est interne", "il est en Seconde", "I", "S"],
    ["la personne soit malade", "son test soit positif", "la personne est malade", "son test est positif", "M", "T"],
    ["le client ait la carte de fidélité", "il paie par carte bancaire", "le client a la carte de fidélité", "il paie par carte bancaire", "F", "C"],
    ["l'œuf vienne de l'élevage A", "il soit fêlé", "l'œuf vient de l'élevage A", "il est fêlé", "A", "F"],
    ["l'habitant vive à Petite-Terre", "il prenne la barge chaque jour", "l'habitant vit à Petite-Terre", "il prend la barge chaque jour", "P", "B"],
    ["le licencié soit une fille", "elle fasse du handball", "le licencié est une fille", "il fait du handball", "F", "H"],
    ["la pièce vienne de la machine A", "elle soit défectueuse", "la pièce vient de la machine A", "elle est défectueuse", "A", "D"],
    ["le jour soit pluvieux", "le bus soit en retard", "le jour est pluvieux", "le bus est en retard", "R", "L"],
    ["le salarié soit à temps partiel", "il soit une femme", "le salarié est à temps partiel", "c'est une femme", "T", "F"],
    ["l'élève soit en STMG", "il mange à la cantine", "l'élève est en STMG", "il mange à la cantine", "S", "C"],
    ["le colis soit envoyé en express", "il arrive en retard", "le colis est envoyé en express", "il arrive en retard", "E", "R"],
    ["le touriste vienne de La Réunion", "il loge à Mamoudzou", "le touriste vient de La Réunion", "il loge à Mamoudzou", "R", "M"]
  ];
  def("yi-distinguer", () => {
    const c = pick(DISTINGUER), [sA, sB, iA, iB, A, B] = c;
    const t = pick(["inter", "condAB", "condBA", "condAB", "condBA"]);
    const Q = {
      inter: [`la probabilité que ${sA} **et** que ${sB}`, `$P(${A} \\cap ${B})$`, `les deux événements sur toute la population : $P(${A} \\cap ${B})$`],
      condAB: [`la probabilité que ${sB.replace(/^il |^elle |^son /, (m) => m)}, **sachant que** ${iA}`, `$P_{${A}}(${B})$`, `on sait que $${A}$ est réalisé : il va en indice, $P_{${A}}(${B})$`],
      condBA: [`la probabilité que ${sA}, **sachant que** ${iB}`, `$P_{${B}}(${A})$`, `on sait que $${B}$ est réalisé : il va en indice, $P_{${B}}(${A})$`]
    }[t];
    const opts = [`$P(${A} \\cap ${B})$`, `$P_{${A}}(${B})$`, `$P_{${B}}(${A})$`, `$P(${B})$`, `$P(${A})$`];
    const ch = choix4(Q[1], shuffle(opts.filter((o) => o !== Q[1])));
    return { enonce: `On choisit un individu au hasard ; $${A}$ : « ${iA.replace(/^(l'|le |la )/, (m) => m)} », $${B}$ : « ${iB} ». Comment note-t-on ${Q[0]} ?`.replace(/que (il|elle) /g, "qu'$1 "), mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["« $A$ et $B$ » sur toute la population : $P(A \\cap B)$.", "« $B$ sachant $A$ » : on se restreint à $A$, qu'on écrit en indice : $P_A(B)$.", "Repère les mots « et » ou « sachant que » : ce qui suit « sachant que » va en indice."],
      solution: `Ici ${Q[2]}. À ne pas confondre avec les autres écritures : $P_{${A}}(${B})$ et $P_{${B}}(${A})$ sont en général différentes.` };
  });

  // Arbre pondéré à deux niveaux : p(A), p_A(B), p_Ā(B)
  function arbreDonnees() {
    const pA = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8]), pBA = pick([0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95]), pBnA = pick([0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8]);
    return { pA, pBA, pBnA, pB: arr(pA * pBA + (1 - pA) * pBnA, 6) };
  }
  const CTX_ARBRE = [
    { A: "M", B: "T", txt: (D) => `Dans une population, $${pTex(D.pA * 100)}\\,\\%$ des personnes sont atteintes d'une maladie (événement $M$). Un test est positif (événement $T$) pour $${pTex(D.pBA * 100)}\\,\\%$ des malades et pour $${pTex(D.pBnA * 100)}\\,\\%$ des personnes saines.` },
    { A: "A", B: "D", txt: (D) => `Une usine a deux machines : la machine A fabrique $${pTex(D.pA * 100)}\\,\\%$ des pièces, la machine B le reste. $${pTex(D.pBA * 100)}\\,\\%$ des pièces de A et $${pTex(D.pBnA * 100)}\\,\\%$ des pièces de B sont défectueuses (événement $D$). On note $A$ l'événement « la pièce vient de A ».` },
    { A: "R", B: "V", txt: (D) => `Un matin de saison des pluies pris au hasard, il pleut à Mamoudzou avec la probabilité $${pTex(D.pA)}$ (événement $R$). S'il pleut, ${prenom()} prend la voiture avec la probabilité $${pTex(D.pBA)}$ ; sinon avec la probabilité $${pTex(D.pBnA)}$ (événement $V$).` },
    { A: "S", B: "C", txt: (D) => `Au lycée, $${pTex(D.pA * 100)}\\,\\%$ des élèves sont en série STMG (événement $S$). $${pTex(D.pBA * 100)}\\,\\%$ des élèves de STMG et $${pTex(D.pBnA * 100)}\\,\\%$ des autres mangent à la cantine (événement $C$).` }
  ];
  const figArbre = (D, ctx, masque) => arbre({ n1: [[ctx.A, masque === "pA" ? "?" : nbS(D.pA)], [`${ctx.A}̄`, masque === "pnA" ? "?" : nbS(arr(1 - D.pA))]], n2: [[[ctx.B, masque === "pBA" ? "?" : nbS(D.pBA)], [`${ctx.B}̄`, masque === "pnBA" ? "?" : nbS(arr(1 - D.pBA))]], [[ctx.B, nbS(D.pBnA)], [`${ctx.B}̄`, masque === "pnBnA" ? "?" : nbS(arr(1 - D.pBnA))]]], aria: `Arbre pondéré : ${ctx.A} puis ${ctx.B}` });

  def("yi-arbre", () => {
    const D = arbreDonnees(), ctx = pick(CTX_ARBRE), t = pick(["completer", "inter", "inter", "lire"]);
    if (ctx.txt(D).includes("un jour sur cent")) return GEN["yi-arbre"]();
    if (t === "completer") {
      const q = pick(["pnA", "pnBA", "pnBnA"]), att = q === "pnA" ? arr(1 - D.pA) : q === "pnBA" ? arr(1 - D.pBA) : arr(1 - D.pBnA);
      return { enonce: `${ctx.txt(D)} Complète l'arbre : quelle probabilité remplace le « ? » ?`, figure: figArbre(D, ctx, q), mode: "nombre", prefixe: "? =", attendu: att,
        erreurs: [{ valeur: q === "pnA" ? D.pA : q === "pnBA" ? D.pBA : D.pBnA, message: "Les probabilités des branches issues d'un même nœud ont pour somme $1$." }],
        aides: ["La somme des probabilités des branches issues d'un même nœud vaut $1$.", "Repère la branche « sœur » du « ? ».", "Calcule $1 -$ cette probabilité."],
        solution: `Les branches issues d'un même nœud ont une somme égale à $1$ : $? = 1 - ${pTex(1 - att)} = ${pTex(att)}$.` };
    }
    if (t === "lire") {
      const bonne = `$P_{${ctx.A}}(${ctx.B}) = ${pTex(D.pBA)}$`;
      const ch = choix4(bonne, [`$P(${ctx.A} \\cap ${ctx.B}) = ${pTex(D.pBA)}$`, `$P(${ctx.B}) = ${pTex(D.pBA)}$`, `$P_{${ctx.B}}(${ctx.A}) = ${pTex(D.pBA)}$`]);
      return { enonce: `${ctx.txt(D)} Que représente le nombre $${pTex(D.pBA)}$ écrit sur la branche de $${ctx.A}$ vers $${ctx.B}$ ?`, figure: figArbre(D, ctx), mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Sur une branche du deuxième niveau, on écrit une probabilité conditionnelle.", `La branche part de $${ctx.A}$ : on sait que $${ctx.A}$ est réalisé.`, "Elle mène à $" + ctx.B + "$."],
        solution: `Les probabilités du deuxième niveau sont conditionnelles : sur la branche $${ctx.A} \\to ${ctx.B}$, on lit ${bonne}.` };
    }
    const att = arr(D.pA * D.pBA, 6);
    return { enonce: `${ctx.txt(D)} Calcule $P(${ctx.A} \\cap ${ctx.B})$.`, figure: figArbre(D, ctx), mode: "nombre", prefixe: `$P(${ctx.A} \\cap ${ctx.B}) =$`, attendu: att,
      erreurs: [{ valeur: arr(D.pA + D.pBA, 6), message: "Le long d'un chemin, on **multiplie** les probabilités." }, { valeur: D.pBA, message: "Ça, c'est $P_{" + ctx.A + "}(" + ctx.B + ")$ : il faut multiplier par $P(" + ctx.A + ")$." }, { valeur: D.pB, message: "Ça, c'est $P(" + ctx.B + ")$ (les deux chemins). On veut seulement le chemin $" + ctx.A + " \\to " + ctx.B + "$." }],
      aides: [`$P(${ctx.A} \\cap ${ctx.B})$ correspond au chemin $${ctx.A} \\to ${ctx.B}$.`, "On multiplie les probabilités le long du chemin : $P(A \\cap B) = P(A) \\times P_A(B)$.", `$${pTex(D.pA)} \\times ${pTex(D.pBA)}$.`],
      solution: `$P(${ctx.A} \\cap ${ctx.B}) = P(${ctx.A}) \\times P_{${ctx.A}}(${ctx.B}) = ${pTex(D.pA)} \\times ${pTex(D.pBA)} = ${pTex(att)}$.` };
  });

  def("yi-totales", () => {
    const D = arbreDonnees(), ctx = pick(CTX_ARBRE);
    if (ctx.txt(D).includes("un jour sur cent")) return GEN["yi-totales"]();
    const t = pick(["totale", "totale", "inverse"]);
    if (t === "inverse") {
      const pAB = arr(D.pA * D.pBA, 6), att = pAB / D.pB, arrondi = !Number.isInteger(arr(att * 1000, 6));
      const v = arrondi ? Math.round(att * 1000) / 1000 : arr(att, 6);
      return { enonce: `${ctx.txt(D)} On a $P(${ctx.B}) = ${pTex(D.pB)}$. Calcule $P_{${ctx.B}}(${ctx.A})$${arrondi ? " (arrondi au millième)" : ""}.`, figure: figArbre(D, ctx), mode: "nombre", prefixe: `$P_{${ctx.B}}(${ctx.A}) ${arrondi ? "\\approx" : "="}$`, attendu: v, tolerance: arrondi ? 0.0005 : 1e-9,
        erreurs: [{ valeur: D.pBA, message: "Ça, c'est $P_{" + ctx.A + "}(" + ctx.B + ")$, lu sur l'arbre. On veut l'inverse." }, { valeur: arr(pAB, 3), message: "Il faut diviser $P(" + ctx.A + " \\cap " + ctx.B + ")$ par $P(" + ctx.B + ")$." }],
        aides: ["$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.", `$P(${ctx.A} \\cap ${ctx.B}) = ${pTex(D.pA)} \\times ${pTex(D.pBA)} = ${pTex(pAB)}$.`, `$\\dfrac{${pTex(pAB)}}{${pTex(D.pB)}}$.`],
        solution: `$P_{${ctx.B}}(${ctx.A}) = \\dfrac{P(${ctx.A} \\cap ${ctx.B})}{P(${ctx.B})} = \\dfrac{${pTex(pAB)}}{${pTex(D.pB)}} ${arrondi ? "\\approx" : "="} ${nb(v)}$.` };
    }
    return { enonce: `${ctx.txt(D)} Calcule $P(${ctx.B})$ avec la formule des probabilités totales.`, figure: figArbre(D, ctx), mode: "nombre", prefixe: `$P(${ctx.B}) =$`, attendu: D.pB,
      erreurs: [{ valeur: arr(D.pA * D.pBA, 6), message: "Il y a **deux** chemins qui mènent à $" + ctx.B + "$ : additionne-les." }, { valeur: arr(D.pBA + D.pBnA, 6), message: "Chaque chemin se calcule en multipliant ; on ne peut pas additionner directement les probabilités conditionnelles." }, { valeur: arr((1 - D.pA) * D.pBnA, 6), message: "Il manque le chemin passant par $" + ctx.A + "$." }],
      aides: [`Deux chemins mènent à $${ctx.B}$ : $${ctx.A} \\to ${ctx.B}$ et $\\overline{${ctx.A}} \\to ${ctx.B}$.`, `$P(${ctx.A} \\cap ${ctx.B}) = ${pTex(D.pA)} \\times ${pTex(D.pBA)}$ et $P(\\overline{${ctx.A}} \\cap ${ctx.B}) = ${pTex(1 - D.pA)} \\times ${pTex(D.pBnA)}$.`, "Additionne les deux."],
      solution: `$P(${ctx.B}) = P(${ctx.A} \\cap ${ctx.B}) + P(\\overline{${ctx.A}} \\cap ${ctx.B}) = ${pTex(D.pA)} \\times ${pTex(D.pBA)} + ${pTex(1 - D.pA)} \\times ${pTex(D.pBnA)} = ${pTex(D.pA * D.pBA)} + ${pTex((1 - D.pA) * D.pBnA)} = ${pTex(D.pB)}$.` };
  });

  def("yi-independance", () => {
    const t = pick(["tester", "tester", "utiliser", "tableau"]);
    if (t === "utiliser") {
      const pA = pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.25]), pB = pick([0.1, 0.2, 0.5, 0.4, 0.8, 0.75]);
      const q = pick(["inter", "cond"]);
      const att = q === "inter" ? arr(pA * pB, 6) : pB;
      return { enonce: `$A$ et $B$ sont deux événements **indépendants**, avec $P(A) = ${pTex(pA)}$ et $P(B) = ${pTex(pB)}$. Calcule ${q === "inter" ? "$P(A \\cap B)$" : "$P_A(B)$"}.`, mode: "nombre", prefixe: q === "inter" ? "$P(A \\cap B) =$" : "$P_A(B) =$", attendu: att,
        erreurs: q === "inter" ? [{ valeur: arr(pA + pB, 6), message: "Pour des événements indépendants, $P(A \\cap B) = P(A) \\times P(B)$ : on multiplie." }] : [{ valeur: arr(pA * pB, 6), message: "Indépendants : savoir que $A$ est réalisé ne change rien, $P_A(B) = P(B)$." }, { valeur: pA, message: "$P_A(B) = P(B)$, pas $P(A)$." }],
        aides: ["Indépendance : $P_A(B) = P(B)$ (savoir $A$ ne change pas la probabilité de $B$).", "Conséquence : $P(A \\cap B) = P(A) \\times P_A(B) = P(A) \\times P(B)$.", q === "inter" ? `$${pTex(pA)} \\times ${pTex(pB)}$.` : `$P_A(B) = P(B)$.`],
        solution: q === "inter" ? `Indépendants : $P(A \\cap B) = P(A) \\times P(B) = ${pTex(pA)} \\times ${pTex(pB)} = ${pTex(att)}$.` : `Indépendants : $P_A(B) = P(B) = ${pTex(pB)}$.` };
    }
    if (t === "tableau") {
      const indep = pick([true, false]), k = rand(2, 5), m = rand(2, 4);
      let a, b, c, d;
      if (indep) { const u = rand(2, 6), v = rand(2, 6); a = u * k; b = u * m; c = v * k; d = v * m; } else { a = rand(5, 25); b = rand(5, 25); c = rand(5, 25); d = rand(5, 25); if (a * d === b * c) return GEN["yi-independance"](); }
      const N = a + b + c + d, pBA = a / (a + b), pB = (a + c) / N;
      const bonne = indep ? `oui, car $P_A(B) = P(B) = ${frac(a + c, N)}$` : `non, car $P_A(B) = ${frac(a, a + b)}$ et $P(B) = ${frac(a + c, N)}$ sont différentes`;
      const ch = choix4(bonne, [indep ? `non, car $P(A) \\neq P(B)$` : `oui, car $P_A(B) = P(B)$`, "oui, car $A$ et $B$ n'ont aucun élément commun", "on ne peut pas savoir avec un tableau"]);
      return { enonce: `On choisit un individu au hasard dans la population décrite par ce tableau. Les événements $A$ et $B$ sont-ils indépendants ?`, tableau: { lignes: [["", "B", "\\overline{B}", "Total"], ["A", a, b, a + b], ["\\overline{A}", c, d, c + d], ["Total", a + c, b + d, N]] }, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Calcule $P_A(B)$ (parmi les $A$) et $P(B)$ (sur tout le monde).", `$P_A(B) = \\dfrac{${a}}{${a + b}}$ et $P(B) = \\dfrac{${a + c}}{${N}}$.`, "Indépendants si et seulement si ces deux probabilités sont égales."],
        solution: `$P_A(B) = \\dfrac{${a}}{${a + b}} = ${frac(a, a + b)}$ et $P(B) = \\dfrac{${a + c}}{${N}} = ${frac(a + c, N)}$. ${indep ? "Elles sont égales : $A$ et $B$ sont indépendants." : "Elles sont différentes : $A$ et $B$ ne sont pas indépendants."}` };
    }
    const pA = pick([0.2, 0.3, 0.4, 0.5, 0.6]), pB = pick([0.2, 0.25, 0.4, 0.5, 0.75]);
    const indep = pick([true, false]), pAB = indep ? arr(pA * pB, 6) : arr(pA * pB + pick([-0.04, -0.02, 0.02, 0.05]), 6);
    if (pAB <= 0) return GEN["yi-independance"]();
    const bonne = indep ? `oui : $P(A) \\times P(B) = ${pTex(pA * pB)} = P(A \\cap B)$` : `non : $P(A) \\times P(B) = ${pTex(pA * pB)} \\neq P(A \\cap B)$`;
    const ch = choix4(bonne, [indep ? `non : $P(A) + P(B) \\neq P(A \\cap B)$` : `oui : $P(A \\cap B) \\neq 0$`, `oui : $P(A) \\neq P(B)$`, `non : $P(A \\cap B) \\neq 0$`]);
    return { enonce: `On a $P(A) = ${pTex(pA)}$, $P(B) = ${pTex(pB)}$ et $P(A \\cap B) = ${pTex(pAB)}$. Les événements $A$ et $B$ sont-ils indépendants ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["$A$ et $B$ sont indépendants si et seulement si $P(A \\cap B) = P(A) \\times P(B)$.", `$P(A) \\times P(B) = ${pTex(pA)} \\times ${pTex(pB)} = ${pTex(pA * pB)}$.`, `Compare avec $P(A \\cap B) = ${pTex(pAB)}$.`],
      solution: `$P(A) \\times P(B) = ${pTex(pA * pB)}$ ${indep ? "est égal à" : "est différent de"} $P(A \\cap B) = ${pTex(pAB)}$ : ${indep ? "les événements sont indépendants" : "les événements ne sont pas indépendants"}. (Ou : $P_A(B) = \\dfrac{${pTex(pAB)}}{${pTex(pA)}} = ${pTex(pAB / pA)}$, à comparer avec $P(B) = ${pTex(pB)}$.)` };
  });

  def("yi-vrai-faux", () => vraiFaux4([
    ["$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ quand $P(A) \\neq 0$.", true, "c'est la définition."],
    ["Sur un arbre, les probabilités des branches issues d'un même nœud ont pour somme $1$.", true, "on a envisagé tous les cas."],
    ["$P(A \\cap B) = P(A) \\times P_A(B)$.", true, "on multiplie le long d'un chemin."],
    ["$P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$.", true, "formule des probabilités totales."],
    ["Si $A$ et $B$ sont indépendants, $P(A \\cap B) = P(A) \\times P(B)$.", true, "c'est la caractérisation de l'indépendance."],
    ["Si $P_A(B) = P(B)$ (avec $P(A)$ et $P(B)$ non nulles), alors $P_B(A) = P(A)$.", true, "l'indépendance est symétrique."],
    ["Sur un arbre, les probabilités du second niveau sont des probabilités conditionnelles.", true, "elles dépendent de la branche du premier niveau."],
    ["$P_A(B) = P_B(A)$ pour tous événements $A$ et $B$.", false, "en général non : la proportion de malades parmi les positifs n'est pas celle des positifs parmi les malades."],
    ["$P(A \\cap B) = P(A) + P(B)$.", false, "on multiplie, et seulement pour des événements indépendants : $P(A) \\times P(B)$."],
    ["Deux événements incompatibles (sans issue commune) sont indépendants.", false, "si $A$ est réalisé, $B$ ne peut pas l'être : $P_A(B) = 0 \\neq P(B)$."],
    ["Pour calculer $P(B)$ avec un arbre, on prend un seul chemin qui mène à $B$.", false, "il faut additionner tous les chemins qui mènent à $B$."],
    ["$P_A(B)$ se calcule en divisant par l'effectif total.", false, "on divise par l'effectif de $A$."],
    ["Si $P(A) = 0{,}5$ et $P(B) = 0{,}4$, alors $P(A \\cap B) = 0{,}2$.", false, "seulement si $A$ et $B$ sont indépendants."]
  ], ["Distingue $P(A \\cap B)$, $P_A(B)$ et $P_B(A)$.", "Arbre : on multiplie le long d'un chemin, on additionne les chemins.", "Indépendance : $P_A(B) = P(B)$."]));

  /* Figures du cours (chapitre 12) */
  FIGURES["yi-cours-arbre"] = () => arbre({ n1: [["M", "0,1"], ["M̄", "0,9"]], n2: [[["T", "0,95"], ["T̄", "0,05"]], [["T", "0,02"], ["T̄", "0,98"]]], aria: "Arbre : M avec 0,1 puis T avec 0,95 ; M barre avec 0,9 puis T avec 0,02" });
  FIGURES["yi-cours-totales"] = () => arbre({ n1: [["A", "0,3"], ["Ā", "0,7"]], n2: [[["D", "0,1"], ["D̄", "0,9"]], [["D", "0,05"], ["D̄", "0,95"]]], aria: "Arbre : machine A 0,3 puis défaut 0,1 ; machine B 0,7 puis défaut 0,05 ; P(D) = 0,03 + 0,035 = 0,065" });

  /* ---------- Chapitre 13 : répétition d'épreuves de Bernoulli (préfixe yb) ---------- */
  const EPREUVES = [
    { e: "on lance une pièce truquée", s: "obtenir Pile", p: () => pick([0.6, 0.7, 0.4, 0.3]), lettre: "P" },
    { e: "un joueur tire au but", s: "marquer", p: () => pick([0.7, 0.8, 0.6, 0.75]), lettre: "M" },
    { e: "on interroge une personne au hasard à Mamoudzou", s: "elle parle shimaoré", p: () => pick([0.8, 0.9, 0.7]), lettre: "S" },
    { e: "on teste une ampoule", s: "elle est défectueuse", p: () => pick([0.1, 0.05, 0.2]), lettre: "D" },
    { e: "un vol pour La Réunion part", s: "il est à l'heure", p: () => pick([0.8, 0.9, 0.85]), lettre: "H" }
  ];
  const binom = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i; return r; };
  // Arbre de n épreuves (n ≤ 3 dessiné) : feuilles en colonne
  function arbreN(n, p, L) {
    const W = 320, feuilles = 2 ** n, H = Math.max(160, feuilles * 22 + 20), dx = (W - 60) / n;
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="Arbre de ${n} épreuves identiques et indépendantes, succès ${L} de probabilité ${nbS(p)}">`;
    const yF = (i) => 14 + (i + 0.5) * ((H - 28) / feuilles);
    const noeud = (niv, j) => { const span = feuilles / 2 ** niv; return yF(j * span + span / 2 - 0.5); };
    for (let niv = 1; niv <= n; niv++) for (let j = 0; j < 2 ** niv; j++) {
      const x1 = 10 + (niv - 1) * dx, x2 = 10 + niv * dx - 14, y1 = niv === 1 ? H / 2 : noeud(niv - 1, j >> 1), y2 = noeud(niv, j), succ = j % 2 === 0;
      s += `<line x1="${x1 + (niv === 1 ? 0 : 14)}" y1="${y1.toFixed(1)}" x2="${x2}" y2="${y2.toFixed(1)}" style="stroke:var(--encre);stroke-width:1.2"/><text class="g-label" x="${x2 + 3}" y="${(y2 + 4).toFixed(1)}" style="font-weight:700${succ ? ";fill:var(--lagon)" : ""}">${succ ? L : `<tspan style="text-decoration:overline">${L}</tspan>`}</text>`;
      if (n <= 2 || niv === 1) s += `<text class="g-label" x="${((x1 + x2) / 2).toFixed(1)}" y="${((y1 + y2) / 2 + (succ ? -3 : 11)).toFixed(1)}" text-anchor="middle" style="font-size:10px;paint-order:stroke;stroke:var(--surface);stroke-width:3px">${succ ? nbS(p) : nbS(arr(1 - p))}</text>`;
    }
    return s + `</svg>`;
  }

  def("yb-reconnaitre", () => {
    const S = pick([
      ["On lance une pièce et on regarde si on obtient Pile.", true, "deux issues (Pile : succès, Face : échec)"],
      ["On lance un dé et on regarde si on obtient un nombre pair.", true, "deux issues : pair (succès) ou impair (échec), $p = 0{,}5$"],
      ["On interroge une personne et on note si elle a voté.", true, "deux issues : a voté ou non"],
      ["On tire une carte et on regarde si c'est un cœur.", true, "succès « cœur », $p = \\dfrac{1}{4}$"],
      ["On lance un dé et on note le nombre obtenu.", false, "six issues possibles, pas deux"],
      ["On mesure la taille d'un élève.", false, "le résultat est un nombre quelconque, pas un succès ou un échec"],
      ["On tire une boule dans une urne de $3$ couleurs et on note la couleur.", false, "trois issues"],
      ["On note la température à midi.", false, "une infinité de résultats possibles"]
    ]);
    const t = pick(["epreuve", "independance", "parametre", "parametre"]);
    if (t === "parametre") {
      const P = pick([
        () => { const r = rand(1, 9), b = rand(2, 12); return [`Une urne contient $${r}$ boule(s) rouge(s) et $${b}$ boule(s) blanche(s). On tire une boule ; succès : « elle est rouge ».`, r, r + b, `$${r}$ boule(s) rouge(s) sur $${r + b}$`]; },
        () => { const k = rand(2, 6); return [`On lance un dé équilibré ; succès : « obtenir au moins $${k}$ ».`, 7 - k, 6, `les faces $${k}$ à $6$, soit $${7 - k}$ faces sur $6$`]; },
        () => { const n = pick([8, 10, 12, 20]), k = rand(1, n - 1); return [`Une roue a $${n}$ secteurs égaux dont $${k}$ sont gagnants. Succès : « tomber sur un secteur gagnant ».`, k, n, `$${k}$ secteurs sur $${n}$`]; },
        () => { const N = pick([20, 25, 30, 32, 35]), f = rand(3, N - 5); return [`Dans une classe de $${N}$ élèves, $${f}$ sont des filles. On choisit un élève au hasard ; succès : « c'est une fille ».`, f, N, `$${f}$ filles sur $${N}$ élèves`]; }
      ])();
      const p = P[1] / P[2];
      return { enonce: `${P[0]} Quel est le paramètre $p$ de cette épreuve de Bernoulli (fraction) ?`, mode: "nombre", prefixe: "$p =$", attendu: p,
        erreurs: [{ valeur: 1 - p, message: "Ça, c'est la probabilité de l'échec." }, { valeur: P[1] / (P[2] - P[1]), message: "On divise par le nombre **total** d'issues." }, ...approx(p)],
        aides: ["Le paramètre $p$ est la probabilité du succès.", "Situation d'équiprobabilité : $p = \\dfrac{\\text{issues favorables}}{\\text{issues possibles}}$.", `Issues favorables : ${P[3]}.`],
        solution: `$p = \\dfrac{${P[1]}}{${P[2]}}${pgcd(P[1], P[2]) > 1 ? " = " + frac(P[1], P[2]) : ""}$ (${P[3]}). L'échec a pour probabilité $1 - p = ${frac(P[2] - P[1], P[2])}$.` };
    }
    if (t === "independance") {
      const I = pick([["On lance $3$ fois une pièce.", true, "le résultat d'un lancer n'influence pas les autres"], ["On tire $2$ boules **avec remise** dans une urne.", true, "on remet la boule : la composition de l'urne ne change pas"], ["On tire $2$ boules **sans remise** dans une urne de $5$ boules.", false, "après le premier tirage l'urne a changé : la deuxième épreuve dépend de la première"], ["On tire $3$ cartes d'un paquet sans les remettre.", false, "le paquet change à chaque tirage"], ["On interroge successivement $4$ personnes au hasard dans une grande ville.", true, "la population est si grande que les choix sont considérés comme indépendants"]]);
      const ch = choix4(I[1] ? "oui, les épreuves sont identiques et indépendantes" : "non, les épreuves ne sont pas indépendantes", ["oui, les épreuves sont identiques et indépendantes", "non, les épreuves ne sont pas indépendantes", "non, il n'y a jamais d'indépendance avec un hasard", "oui, dès qu'il y a plusieurs épreuves"].filter((x) => x !== (I[1] ? "oui, les épreuves sont identiques et indépendantes" : "non, les épreuves ne sont pas indépendantes")));
      return { enonce: `${I[0]} Peut-on modéliser par une répétition d'épreuves identiques et indépendantes ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Épreuves identiques : mêmes issues, mêmes probabilités à chaque fois.", "Indépendantes : le résultat d'une épreuve ne modifie pas les probabilités des suivantes.", "Un tirage sans remise modifie l'urne."],
        solution: `${I[1] ? "Oui" : "Non"} : ${I[2]}.` };
    }
    const bonne = S[1] ? "oui, c'est une épreuve de Bernoulli" : "non, ce n'est pas une épreuve de Bernoulli";
    const ch = choix4(bonne, ["oui, c'est une épreuve de Bernoulli", "non, ce n'est pas une épreuve de Bernoulli", "oui, toute expérience aléatoire en est une", "non, car il faut au moins deux épreuves"].filter((x) => x !== bonne));
    return { enonce: `${S[0]} Est-ce une épreuve de Bernoulli ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Une épreuve de Bernoulli a exactement **deux issues** : succès ou échec.", "On peut toujours regrouper les issues en « succès » et « échec » si la question porte sur un seul événement.", "Regarde ce qu'on **note** à la fin de l'expérience."],
      solution: `${S[1] ? "Oui" : "Non"} : ${S[2]}.` };
  });

  def("yb-chemin", () => {
    const E = pick(EPREUVES), p = E.p(), n = rand(2, 4), L = E.lettre;
    if (E.frac) return GEN["yb-chemin"]();
    const t = pick(["tous", "aucun", "un-chemin", "un-chemin"]);
    if (t === "tous" || t === "aucun") {
      const q = t === "tous" ? p : arr(1 - p), att = arr(q ** n, 6);
      return { enonce: `${E.e.charAt(0).toUpperCase() + E.e.slice(1)} ; la probabilité de « ${E.s} » est $${pTex(p)}$. On répète $${n}$ fois cette épreuve de façon indépendante. Quelle est la probabilité ${t === "tous" ? `que les $${n}$ épreuves soient des succès` : `qu'il n'y ait **aucun** succès`} ?`, figure: n <= 3 ? arbreN(n, p, L) : undefined, mode: "nombre", prefixe: "Probabilité :", attendu: att,
        erreurs: [{ valeur: arr(n * q, 6), message: "Le long d'un chemin, on multiplie : $" + pTex(q) + "^{" + n + "}$, pas $" + n + " \\times " + pTex(q) + "$." }, { valeur: arr((1 - q) ** n, 6), message: t === "tous" ? "Ça, c'est la probabilité de n'avoir que des échecs." : "Ça, c'est la probabilité de n'avoir que des succès." }],
        aides: [`Le chemin correspondant est ${t === "tous" ? `$${Array(n).fill(L).join("")}$` : `$${Array(n).fill("\\overline{" + L + "}").join("")}$`}.`, `Chaque branche a pour probabilité $${pTex(q)}$.`, `On multiplie : $${pTex(q)}^{${n}}$.`],
        solution: `Un seul chemin, de probabilité $${pTex(q)}^{${n}} = ${pTex(att)}$.` };
    }
    const seq = Array.from({ length: n }, () => pick([true, false])), k = seq.filter(Boolean).length;
    const att = arr(p ** k * (1 - p) ** (n - k), 6);
    const mot = seq.map((b) => (b ? L : `\\overline{${L}}`)).join("");
    return { enonce: `${E.e.charAt(0).toUpperCase() + E.e.slice(1)} ; la probabilité de « ${E.s} » (noté $${L}$) est $${pTex(p)}$. On répète $${n}$ fois cette épreuve de façon indépendante. Quelle est la probabilité du résultat $${mot}$ (dans cet ordre) ?`, mode: "nombre", prefixe: `$P(${mot}) =$`, attendu: att,
      erreurs: [{ valeur: arr(binom(n, k) * att, 6), message: "On demande ce chemin précis (dans cet ordre), pas tous les chemins avec le même nombre de succès." }, { valeur: arr(k * p + (n - k) * (1 - p), 6), message: "On multiplie les probabilités le long du chemin." }],
      aides: [`Chaque $${L}$ a pour probabilité $${pTex(p)}$, chaque $\\overline{${L}}$ a pour probabilité $${pTex(1 - p)}$.`, "Les épreuves sont indépendantes : on multiplie.", `$${seq.map((b) => pTex(b ? p : 1 - p)).join(" \\times ")}$.`],
      solution: `$P(${mot}) = ${seq.map((b) => pTex(b ? p : 1 - p)).join(" \\times ")} = ${pTex(att)}$.` };
  });

  def("yb-k-succes", () => {
    const E = pick(EPREUVES), p = E.frac ? pick([0.5, 0.3]) : E.p(), n = rand(2, 4), L = E.lettre;
    const t = pick(["exactement", "exactement", "au-moins-un", "chemins"]);
    if (t === "chemins") {
      const k = rand(1, n - 1), c = binom(n, k);
      return { enonce: `On répète $${n}$ fois une épreuve de Bernoulli (succès $${L}$). Combien de chemins de l'arbre comportent exactement $${k}$ succès ?`, figure: n <= 3 ? arbreN(n, p, L) : undefined, mode: "nombre", prefixe: "Nombre de chemins :", attendu: c,
        erreurs: [{ valeur: 2 ** n, message: "Ça, c'est le nombre total de chemins." }, { valeur: k, message: "Compte les chemins, pas les succès." }, { valeur: n, message: k === 1 || k === n - 1 ? "Presque : compte bien toutes les places possibles." : "Énumère les chemins." }],
        aides: [`L'arbre a $2^{${n}} = ${2 ** n}$ chemins.`, `Un chemin avec $${k}$ succès : choisir à quelles épreuves (parmi $${n}$) ont lieu les succès.`, n <= 3 ? "Compte-les sur l'arbre." : `Énumère : ${k === 1 ? `le succès peut être à la 1re, 2e, 3e ou 4e épreuve` : "liste les positions possibles"}.`],
        solution: `Il y a $${c}$ façons de placer $${k}$ succès parmi $${n}$ épreuves, donc $${c}$ chemins.` };
    }
    if (t === "au-moins-un") {
      const att = arr(1 - (1 - p) ** n, 6);
      return { enonce: `${E.e.charAt(0).toUpperCase() + E.e.slice(1)} ; la probabilité de « ${E.s} » est $${pTex(p)}$. On répète $${n}$ fois de façon indépendante. Quelle est la probabilité d'obtenir **au moins un** succès ?`, mode: "nombre", prefixe: "Probabilité :", attendu: att,
        erreurs: [{ valeur: arr((1 - p) ** n, 6), message: "Ça, c'est la probabilité de n'avoir **aucun** succès. « Au moins un » est l'événement contraire." }, { valeur: arr(n * p, 6), message: "On ne peut pas additionner : utilise l'événement contraire." }, { valeur: arr(p ** n, 6), message: "Ça, c'est « que des succès »." }],
        aides: ["« Au moins un succès » est le contraire de « aucun succès ».", `$P(\\text{aucun}) = ${pTex(1 - p)}^{${n}}$.`, `$P(\\text{au moins un}) = 1 - ${pTex(1 - p)}^{${n}}$.`],
        solution: `$P(\\text{au moins un succès}) = 1 - P(\\text{aucun}) = 1 - ${pTex(1 - p)}^{${n}} = 1 - ${pTex((1 - p) ** n)} = ${pTex(att)}$.` };
    }
    const k = rand(1, n - 1), c = binom(n, k), att = arr(c * p ** k * (1 - p) ** (n - k), 6);
    return { enonce: `${E.e.charAt(0).toUpperCase() + E.e.slice(1)} ; on prend comme probabilité de succès « ${E.s} » $p = ${pTex(p)}$. On répète $${n}$ fois de façon indépendante. Quelle est la probabilité d'obtenir **exactement** $${k}$ succès ?`, figure: n <= 3 ? arbreN(n, p, L) : undefined, mode: "nombre", prefixe: "Probabilité :", attendu: att,
      erreurs: [{ valeur: arr(p ** k * (1 - p) ** (n - k), 6), message: `C'est la probabilité d'**un** chemin. Il y a $${c}$ chemins avec $${k}$ succès : additionne-les.` }, { valeur: arr(p ** k, 6), message: "N'oublie pas les échecs sur le chemin." }],
      aides: [`Chaque chemin avec $${k}$ succès et $${n - k}$ échec(s) a pour probabilité $${pTex(p)}^{${k}} \\times ${pTex(1 - p)}^{${n - k}}$.`, `Il y a $${c}$ tels chemins.`, `$${c} \\times ${pTex(p ** k * (1 - p) ** (n - k))}$.`],
      solution: `Chaque chemin avec $${k}$ succès vaut $${pTex(p)}^{${k}} \\times ${pTex(1 - p)}^{${n - k}} = ${pTex(p ** k * (1 - p) ** (n - k))}$, et il y en a $${c}$ : $P = ${c} \\times ${pTex(p ** k * (1 - p) ** (n - k))} = ${pTex(att)}$.` };
  });

  def("yb-contexte", () => {
    const n = pick([2, 3, 3, 4]), p = pick([0.7, 0.8, 0.9, 0.6]), ctx = pick([
      [`${prenom()} prend la barge ${n} jours de suite ; chaque jour, elle part à l'heure avec la probabilité`, "la barge part à l'heure", "jours"],
      [`Un QCM a ${n} questions ; ${prenom()} connaît la réponse à chaque question avec la probabilité`, "la réponse est juste", "questions"],
      [`On plante ${n} boutures de vanille ; chacune prend racine avec la probabilité`, "la bouture prend", "boutures"]
    ]);
    const t = pick(["tous", "aucun", "au-moins"]);
    const att = t === "tous" ? arr(p ** n, 6) : t === "aucun" ? arr((1 - p) ** n, 6) : arr(1 - (1 - p) ** n, 6);
    const arrondi = !Number.isInteger(att * 10000), v = arrondi ? Math.round(att * 1000) / 1000 : att;
    return { enonce: `${ctx[0]} $${pTex(p)}$, de façon indépendante. Quelle est la probabilité que ${t === "tous" ? `ce soit le cas pour tous (les $${n}$ ${ctx[2]})` : t === "aucun" ? `ce ne soit le cas pour aucun` : `ce soit le cas pour au moins un`}${arrondi ? " (arrondi au millième)" : ""} ?`, mode: "nombre", prefixe: "Probabilité :", attendu: v, tolerance: arrondi ? 0.0005 : 1e-9,
      erreurs: [{ valeur: arr(n * p, 6), message: "Pour des épreuves indépendantes, on multiplie les probabilités, on ne les additionne pas." }, { valeur: arr(1 - att, 3), message: "C'est la probabilité de l'événement contraire." }],
      aides: [`Succès : « ${ctx[1]} », $p = ${pTex(p)}$ ; échec : $${pTex(1 - p)}$.`, t === "au-moins" ? "Passe par le contraire : « aucun »." : "Un seul chemin dans l'arbre : on multiplie.", t === "tous" ? `$${pTex(p)}^{${n}}$.` : t === "aucun" ? `$${pTex(1 - p)}^{${n}}$.` : `$1 - ${pTex(1 - p)}^{${n}}$.`],
      solution: t === "tous" ? `$${pTex(p)}^{${n}} ${arrondi ? "\\approx" : "="} ${nb(v)}$.` : t === "aucun" ? `$${pTex(1 - p)}^{${n}} ${arrondi ? "\\approx" : "="} ${nb(v)}$.` : `$1 - ${pTex(1 - p)}^{${n}} = 1 - ${pTex((1 - p) ** n)} ${arrondi ? "\\approx" : "="} ${nb(v)}$.` };
  });

  def("yb-vrai-faux", () => vraiFaux4([
    ["Une épreuve de Bernoulli a exactement deux issues.", true, "succès et échec."],
    ["Si la probabilité du succès est $p$, celle de l'échec est $1 - p$.", true, "les deux issues sont contraires."],
    ["Pour $3$ épreuves indépendantes, l'arbre a $8$ chemins.", true, "$2^3 = 8$."],
    ["La probabilité de « que des succès » en $n$ épreuves est $p^n$.", true, "un seul chemin, $n$ branches de probabilité $p$."],
    ["« Au moins un succès » est l'événement contraire de « aucun succès ».", true, "donc $P = 1 - (1 - p)^n$."],
    ["Avec $3$ épreuves, il y a $3$ chemins avec exactement $1$ succès.", true, "le succès peut être à la 1re, 2e ou 3e épreuve."],
    ["Tirer deux boules avec remise donne deux épreuves indépendantes.", true, "l'urne retrouve sa composition."],
    ["Lancer un dé et noter le nombre obtenu est une épreuve de Bernoulli.", false, "il y a six issues."],
    ["Avec $p = 0{,}5$ et $2$ épreuves, la probabilité d'exactement $1$ succès est $0{,}25$.", false, "deux chemins : $2 \\times 0{,}25 = 0{,}5$."],
    ["Tirer deux boules sans remise donne deux épreuves indépendantes.", false, "l'urne change après le premier tirage."],
    ["La probabilité d'au moins un succès en $3$ épreuves est $3p$.", false, "c'est $1 - (1 - p)^3$ ; $3p$ peut même dépasser $1$."],
    ["Sur un arbre, on additionne les probabilités le long d'un chemin.", false, "on les multiplie."]
  ], ["Deux issues, épreuves identiques et indépendantes.", "Chemin : produit ; plusieurs chemins : somme.", "« Au moins un » : passe par le contraire."]));


  // Probabilités à plus de 4 décimales : réponse arrondie au millième (annoncée dans la consigne)
  const millieme = (q) => {
    if (q.mode === "nombre" && !Number.isInteger(arr(q.attendu * 10000, 6))) {
      const v = Math.round(q.attendu * 1000) / 1000;
      q.enonce = q.enonce.replace(/ ?$/, " (arrondie au millième) ?");
      q.solution += ` Arrondie au millième : $${nb(v)}$.`;
      q.attendu = v; q.tolerance = 0.0005;
      q.erreurs = (q.erreurs || []).filter((e) => Math.abs(e.valeur - v) >= 0.0005);
    }
    return q;
  };
  ["yb-chemin", "yb-k-succes"].forEach((n) => { const g = GEN[n]; GEN[n] = (i) => millieme(g(i)); });

  /* Figures du cours (chapitre 13) */
  FIGURES["yb-cours-arbre2"] = () => arbreN(2, 0.8, "M");
  FIGURES["yb-cours-arbre3"] = () => arbreN(3, 0.6, "S");

  /* ---------- Chapitre 14 : variables aléatoires et loi de Bernoulli (préfixe yx) ---------- */
  // Loi de probabilité : valeurs et probabilités (décimales à 2 chiffres, somme 1)
  function loiAlea() {
    const n = rand(3, 4), vals = shuffle([-5, -3, -2, -1, 0, 1, 2, 3, 4, 5, 8, 10, 15, 20]).slice(0, n).sort((a, b) => a - b);
    let reste = 100; const ps = [];
    for (let k = 0; k < n - 1; k++) { const v = pick([5, 10, 15, 20, 25, 30, 35, 40].filter((x) => x < reste - 5 * (n - 1 - k))); if (v === undefined) return loiAlea(); ps.push(v); reste -= v; }
    ps.push(reste);
    return { vals, ps: ps.map((v) => v / 100), E: arr(vals.reduce((s, v, k) => s + v * ps[k] / 100, 0), 6) };
  }
  const tabLoi = (L, nom = "X") => ({ lignes: [["x_i", ...L.vals.map(nb)], [`P(${nom} = x_i)`, ...L.ps.map(pTex)]] });

  def("yx-loi", () => {
    const L = loiAlea(), t = pick(["manquante", "manquante", "egal", "inf", "sup"]);
    if (t === "manquante") {
      const k = rand(0, L.vals.length - 1), T = tabLoi(L); T.lignes[1][k + 1] = "?";
      return { enonce: `Voici la loi de probabilité d'une variable aléatoire $X$. Quelle valeur remplace le « ? » ?`, tableau: T, mode: "nombre", prefixe: "? =", attendu: L.ps[k],
        erreurs: [{ valeur: arr(L.ps.reduce((s, v, j) => (j === k ? s : s + v), 0), 6), message: "La somme de toutes les probabilités vaut $1$ : le « ? » vaut $1$ moins la somme des autres." }],
        aides: ["La somme des probabilités d'une loi vaut $1$.", `Somme des probabilités connues : $${pTex(L.ps.reduce((s, v, j) => (j === k ? s : s + v), 0))}$.`, "Retire cette somme à $1$."],
        solution: `$? = 1 - ${pTex(L.ps.reduce((s, v, j) => (j === k ? s : s + v), 0))} = ${pTex(L.ps[k])}$.` };
    }
    if (t === "egal") { const k = rand(0, L.vals.length - 1); return { enonce: `Voici la loi de probabilité de $X$. Que vaut $P(X = ${nb(L.vals[k])})$ ?`, tableau: tabLoi(L), mode: "nombre", prefixe: `$P(X = ${nb(L.vals[k])}) =$`, attendu: L.ps[k], erreurs: [{ valeur: L.vals[k], message: "On demande une probabilité, lue sur la seconde ligne." }], aides: ["$P(X = a)$ se lit directement dans le tableau.", `Colonne $x_i = ${nb(L.vals[k])}$.`, "Lis la seconde ligne."], solution: `On lit $P(X = ${nb(L.vals[k])}) = ${pTex(L.ps[k])}$.` }; }
    const k = rand(1, L.vals.length - 2), a = L.vals[k];
    const att = t === "inf" ? arr(L.ps.slice(0, k + 1).reduce((s, v) => s + v, 0), 6) : arr(L.ps.slice(k + 1).reduce((s, v) => s + v, 0), 6);
    return { enonce: `Voici la loi de probabilité de $X$. Calcule $P(X ${t === "inf" ? "\\leqslant" : ">"} ${nb(a)})$.`, tableau: tabLoi(L), mode: "nombre", prefixe: `$P(X ${t === "inf" ? "\\leqslant" : ">"} ${nb(a)}) =$`, attendu: att,
      erreurs: [{ valeur: t === "inf" ? arr(att - L.ps[k], 6) : arr(att + L.ps[k], 6), message: t === "inf" ? `$\\leqslant$ : la valeur $${nb(a)}$ est comprise.` : `$>$ strict : la valeur $${nb(a)}$ n'est pas comprise.` }, { valeur: L.ps[k], message: "On additionne toutes les valeurs concernées, pas seulement $" + nb(a) + "$." }, { valeur: arr(1 - att, 6), message: "Ça, c'est l'événement contraire." }],
      aides: [`$\\{X ${t === "inf" ? "\\leqslant" : ">"} ${nb(a)}\\}$ : les valeurs ${t === "inf" ? `inférieures ou égales à $${nb(a)}$` : `strictement supérieures à $${nb(a)}$`}.`, `Ce sont $${(t === "inf" ? L.vals.slice(0, k + 1) : L.vals.slice(k + 1)).map(nb).join("$, $")}$.`, "Additionne leurs probabilités."],
      solution: `$P(X ${t === "inf" ? "\\leqslant" : ">"} ${nb(a)}) = ${(t === "inf" ? L.ps.slice(0, k + 1) : L.ps.slice(k + 1)).map(pTex).join(" + ")} = ${pTex(att)}$.` };
  });

  def("yx-esperance", () => {
    const L = loiAlea();
    return { enonce: `Voici la loi de probabilité d'une variable aléatoire $X$. Calcule son espérance $E(X)$.`, tableau: tabLoi(L), mode: "nombre", prefixe: "$E(X) =$", attendu: L.E,
      erreurs: [{ valeur: arr(L.vals.reduce((s, v) => s + v, 0) / L.vals.length, 6), message: "Ce n'est pas la moyenne simple des valeurs : chaque valeur est pondérée par sa probabilité." }, { valeur: arr(L.vals.reduce((s, v) => s + v, 0), 6), message: "Multiplie chaque valeur par sa probabilité." }],
      aides: ["$E(X) = x_1 \\times P(X = x_1) + x_2 \\times P(X = x_2) + \\dots$", `$${L.vals.map((v, k) => `${pr(v)} \\times ${pTex(L.ps[k])}`).join(" + ")}$.`, `Les produits : $${L.vals.map((v, k) => pTex(v * L.ps[k])).join("$ ; $")}$.`],
      solution: `$E(X) = ${L.vals.map((v, k) => `${pr(v)} \\times ${pTex(L.ps[k])}`).join(" + ")} = ${nb(L.E)}$.` };
  });

  def("yx-jeu", () => {
    const mise = pick([1, 2, 3, 5]), t = pick(["urne", "de", "roue"]);
    let issues;
    if (t === "urne") { const r = rand(1, 3), v = rand(2, 4), n = rand(4, 8), N = r + v + n, gR = pick([10, 15, 20]), gV = pick([2, 3, 5]); issues = { txt: `Une urne contient $${r}$ boule(s) rouge(s), $${v}$ verte(s) et $${n}$ noire(s). On paie $${mise}$ € pour tirer une boule : une rouge rapporte $${gR}$ €, une verte $${gV}$ €, une noire rien.`, g: [gR - mise, gV - mise, -mise], p: [r / N, v / N, n / N], N, eff: [r, v, n] }; }
    else if (t === "de") { const g6 = pick([6, 8, 10, 12]), g5 = pick([2, 3, 4]); issues = { txt: `On paie $${mise}$ € pour lancer un dé équilibré : un $6$ rapporte $${g6}$ €, un $5$ rapporte $${g5}$ €, les autres faces rien.`, g: [g6 - mise, g5 - mise, -mise], p: [1 / 6, 1 / 6, 4 / 6], N: 6, eff: [1, 1, 4] }; }
    else { const a = pick([1, 2]), b = pick([2, 3]), c = 8 - a - b, gA = pick([12, 16, 20]), gB = pick([4, 5, 6]); issues = { txt: `À la kermesse, une roue a $8$ secteurs égaux : $${a}$ rapporte(nt) $${gA}$ €, $${b}$ rapportent $${gB}$ €, les autres rien. Un tour coûte $${mise}$ €.`, g: [gA - mise, gB - mise, -mise], p: [a / 8, b / 8, c / 8], N: 8, eff: [a, b, c] }; }
    const E = issues.g.reduce((s, g, k) => s + g * issues.p[k], 0), Ex = issues.g.reduce((s, g, k) => s + g * issues.eff[k], 0) / issues.N;
    const q = pick(["esp", "esp", "equitable"]);
    if (q === "equitable") {
      const bonne = Math.abs(E) < 1e-9 ? "équitable : l'espérance du gain est nulle" : E > 0 ? "favorable au joueur : l'espérance du gain est positive" : "défavorable au joueur : l'espérance du gain est négative";
      const ch = choix4(bonne, ["équitable : l'espérance du gain est nulle", "favorable au joueur : l'espérance du gain est positive", "défavorable au joueur : l'espérance du gain est négative", "impossible à juger sans jouer"].filter((x) => x !== bonne));
      return { enonce: `${issues.txt} On note $G$ le gain algébrique du joueur (gain moins mise). Le jeu est-il équitable ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: [`Valeurs de $G$ : $${issues.g.map(nb).join("$, $")}$ (on retire la mise).`, `Probabilités : $${issues.eff.map((e) => frac(e, issues.N)).join("$, $")}$.`, "Calcule $E(G)$ : nulle → équitable ; positive → favorable au joueur."],
        solution: `$E(G) = ${issues.g.map((g, k) => `${pr(g)} \\times ${frac(issues.eff[k], issues.N)}`).join(" + ")} = ${frac(Math.round(Ex * issues.N), issues.N)}$. Le jeu est ${bonne}.` };
    }
    const fr2 = !Number.isInteger(arr(E * 100, 6));
    return { enonce: `${issues.txt} On note $G$ le gain algébrique du joueur (gain moins mise). Calcule $E(G)$${fr2 ? " (fraction)" : ""}.`, mode: "nombre", prefixe: "$E(G) =$", attendu: E, suffixe: "€",
      erreurs: [{ valeur: arr(E + mise, 6), message: "Le gain algébrique tient compte de la mise : retire-la de chaque gain." }, { valeur: arr(issues.g.reduce((s, g) => s + g, 0) / 3, 6), message: "Pondère chaque gain par sa probabilité." }, ...(fr2 ? approx(E) : [])],
      aides: [`Valeurs de $G$ : $${issues.g.map(nb).join("$, $")}$.`, `Probabilités : $${issues.eff.map((e) => frac(e, issues.N)).join("$, $")}$.`, "$E(G) = \\sum g_i \\times P(G = g_i)$."],
      solution: `$E(G) = ${issues.g.map((g, k) => `${pr(g)} \\times ${frac(issues.eff[k], issues.N)}`).join(" + ")} = ${frac(Math.round(Ex * issues.N), issues.N)}$ €. En moyenne, sur un grand nombre de parties, le joueur ${E > 0 ? "gagne" : E < 0 ? "perd" : "ne gagne ni ne perd"} ${E === 0 ? "" : `environ $${nb(arr(Math.abs(E), 2))}$ € par partie`}.` };
  });

  def("yx-bernoulli", () => {
    const t = pick(["reconnaitre", "esperance", "loi", "loi"]);
    const p = pick([0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9]);
    if (t === "reconnaitre") {
      const S = pick([["$X$ vaut $1$ si un client choisi au hasard est satisfait, $0$ sinon", true], ["$X$ est le résultat d'un dé à six faces", false], ["$X$ vaut $1$ si la pièce tombe sur Pile, $0$ sinon", true], ["$X$ est le nombre de Pile en $3$ lancers", false], ["$X$ vaut $1$ si un œuf est fêlé, $0$ sinon", true], ["$X$ est la somme de deux dés", false]]);
      const bonne = S[1] ? "oui : $X$ ne prend que les valeurs $0$ et $1$" : "non : $X$ prend plus de deux valeurs";
      const ch = choix4(bonne, ["oui : $X$ ne prend que les valeurs $0$ et $1$", "non : $X$ prend plus de deux valeurs", "oui : toute variable aléatoire suit une loi de Bernoulli", "non : une loi de Bernoulli n'a qu'une valeur"].filter((x) => x !== bonne));
      return { enonce: `${S[0]}. $X$ suit-elle une loi de Bernoulli ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Une loi de Bernoulli de paramètre $p$ : $X$ vaut $1$ (succès) avec la probabilité $p$, $0$ (échec) sinon.", "Compte les valeurs possibles de $X$.", "Deux valeurs, $0$ et $1$ : Bernoulli."],
        solution: `${S[1] ? "Oui" : "Non"} : ${bonne.split(" : ")[1]}.` };
    }
    if (t === "esperance") return { enonce: `$X$ suit une loi de Bernoulli de paramètre $p = ${pTex(p)}$. Que vaut $E(X)$ ?`, mode: "nombre", prefixe: "$E(X) =$", attendu: p,
      erreurs: [{ valeur: arr(1 - p, 6), message: "$E(X) = 1 \\times p + 0 \\times (1 - p)$ : c'est $p$." }, { valeur: 0.5, message: "L'espérance dépend de $p$." }],
      aides: ["Loi : $P(X = 1) = p$ et $P(X = 0) = 1 - p$.", "$E(X) = 1 \\times P(X = 1) + 0 \\times P(X = 0)$.", "$= p$."],
      solution: `$E(X) = 1 \\times ${pTex(p)} + 0 \\times ${pTex(1 - p)} = ${pTex(p)}$ : l'espérance d'une loi de Bernoulli est son paramètre $p$.` };
    const v = pick([0, 1]);
    return { enonce: `$X$ suit une loi de Bernoulli de paramètre $p = ${pTex(p)}$. Que vaut $P(X = ${v})$ ?`, mode: "nombre", prefixe: `$P(X = ${v}) =$`, attendu: v ? p : arr(1 - p, 6),
      erreurs: [{ valeur: v ? arr(1 - p, 6) : p, message: "$P(X = 1) = p$ (succès) et $P(X = 0) = 1 - p$ (échec)." }],
      aides: ["$X = 1$ : succès, probabilité $p$.", "$X = 0$ : échec, probabilité $1 - p$.", `$p = ${pTex(p)}$.`],
      solution: `$P(X = ${v}) = ${v ? `p = ${pTex(p)}` : `1 - p = ${pTex(1 - p)}`}$.` };
  });

  def("yx-echantillon", () => {
    const t = pick(["frequence", "frequence", "ecart", "taille", "interpreter"]);
    const p = pick([0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8]), n = pick([25, 50, 100, 200, 400]);
    if (t === "frequence") {
      const k = Math.round(n * p) + rand(-Math.ceil(Math.sqrt(n) / 2), Math.ceil(Math.sqrt(n) / 2)), f = arr(k / n, 6);
      return { enonce: `On simule un échantillon de taille $${n}$ d'une loi de Bernoulli de paramètre $${pTex(p)}$ : on obtient $${k}$ fois la valeur $1$. Quelle est la fréquence observée des $1$ ?`, mode: "nombre", prefixe: "$f =$", attendu: f,
        erreurs: [{ valeur: p, message: "Ça, c'est le paramètre du modèle. La fréquence observée est $\\dfrac{" + k + "}{" + n + "}$." }, { valeur: k, message: "Divise par la taille de l'échantillon." }],
        aides: ["Fréquence $=$ nombre de $1$ $\\div$ taille de l'échantillon.", `$\\dfrac{${k}}{${n}}$.`, "Elle fluctue autour de $p$ d'un échantillon à l'autre."],
        solution: `$f = \\dfrac{${k}}{${n}} = ${nb(f)}$ ; elle est proche de $p = ${pTex(p)}$ mais pas égale : c'est la fluctuation d'échantillonnage.` };
    }
    if (t === "taille") {
      const k = pick([2, 3, 4, 5]);
      return { enonce: `L'écart-type des fréquences observées dans des échantillons de taille $n$ est de l'ordre de $\\dfrac{1}{\\sqrt{n}}$. Par combien faut-il multiplier la taille des échantillons pour diviser cette dispersion par $${k}$ ?`, mode: "nombre", prefixe: "Multiplier par", attendu: k * k,
        erreurs: [{ valeur: k, message: "La dispersion varie comme $\\dfrac{1}{\\sqrt{n}}$ : diviser par $" + k + "$ demande de multiplier $n$ par $" + k + "^2$." }, { valeur: 2 * k, message: "C'est le carré de $" + k + "$." }],
        aides: ["$\\dfrac{1}{\\sqrt{N}} = \\dfrac{1}{" + k + "} \\times \\dfrac{1}{\\sqrt{n}}$ revient à $\\sqrt{N} = " + k + "\\sqrt{n}$.", "On élève au carré.", `$N = ${k}^2 \\times n$.`],
        solution: `Pour diviser $\\dfrac{1}{\\sqrt{n}}$ par $${k}$, il faut $\\sqrt{N} = ${k}\\sqrt{n}$, soit $N = ${k * k}n$ : multiplier la taille par $${k * k}$.` };
    }
    if (t === "ecart") {
      const s = pick([0.02, 0.03, 0.04, 0.05]), k = pick([1, 2, 3]), q = pick(["bas", "haut"]);
      const att = q === "bas" ? arr(p - k * s, 6) : arr(p + k * s, 6);
      return { enonce: `On simule $1\\,000$ échantillons d'une loi de Bernoulli de paramètre $p = ${pTex(p)}$ ; l'écart-type des fréquences observées est $s = ${pTex(s)}$. Quelle est la borne ${q === "bas" ? "inférieure" : "supérieure"} de l'intervalle $[p - ${k}s\\,;p + ${k}s]$ ?`, mode: "nombre", prefixe: "Borne :", attendu: att,
        erreurs: [{ valeur: q === "bas" ? arr(p + k * s, 6) : arr(p - k * s, 6), message: q === "bas" ? "La borne inférieure est $p - " + k + "s$." : "La borne supérieure est $p + " + k + "s$." }, { valeur: q === "bas" ? arr(p - s, 6) : arr(p + s, 6), message: `N'oublie pas le facteur $${k}$.` }],
        aides: [`$${k}s = ${k} \\times ${pTex(s)} = ${pTex(k * s)}$.`, q === "bas" ? "Borne inférieure : $p - " + k + "s$." : "Borne supérieure : $p + " + k + "s$.", `$${pTex(p)} ${q === "bas" ? "-" : "+"} ${pTex(k * s)}$.`],
        solution: `$[p - ${k}s\\,;p + ${k}s] = [${pTex(p - k * s)}\\,;${pTex(p + k * s)}]$. ${k === 1 ? "Environ deux tiers des échantillons" : k === 2 ? "Environ $95\\,\\%$ des échantillons" : "Presque tous les échantillons ($99{,}7\\,\\%$)"} ont une fréquence dans cet intervalle.` };
    }
    const s = arr(Math.sqrt(p * (1 - p) / n), 3), f = pick([arr(p + 0.5 * s, 3), arr(p + 3.5 * s, 3), arr(p - 3.5 * s, 3), arr(p - 0.8 * s, 3)]);
    const dist = Math.abs(f - p) / s, rare = dist > 3;
    const bonne = rare ? "une situation rare dans le cadre du modèle : on peut douter du modèle" : "une situation fréquente dans le cadre du modèle : rien d'anormal";
    const ch = choix4(bonne, ["une situation rare dans le cadre du modèle : on peut douter du modèle", "une situation fréquente dans le cadre du modèle : rien d'anormal", "la preuve certaine que le modèle est faux", "impossible : la fréquence devrait être exactement $p$"].filter((x) => x !== bonne));
    return { enonce: `On modélise par une loi de Bernoulli de paramètre $p = ${pTex(p)}$. Sur des simulations d'échantillons de taille $${n}$, l'écart-type des fréquences est $s \\approx ${nb(s)}$. Une enquête réelle sur $${n}$ personnes donne la fréquence $${nb(f)}$. C'est :`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Calcule la distance $|f - p|$ et compare-la à $s$, $2s$, $3s$.", `$|${nb(f)} - ${pTex(p)}| = ${nb(arr(Math.abs(f - p), 3))}$, soit environ $${nb(arr(dist, 1))}s$.`, "Au-delà de $3s$, c'est très rare sous le modèle ; dans $2s$, c'est fréquent."],
      solution: `$|f - p| \\approx ${nb(arr(dist, 1))}\\,s$ : ${rare ? "plus de $3s$, ce qui arrive très rarement si le modèle est bon. On peut douter du modèle, sans certitude." : "moins de $2s$ : c'est une fluctuation ordinaire, compatible avec le modèle."}` };
  });

  def("yx-python", () => {
    const t = pick(["moyenne", "compter", "compter", "sortie", "sortie", "taille"]);
    const p = pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.7]), n = pick([50, 100, 200]);
    if (t === "sortie") {
      const L = Array.from({ length: rand(8, 12) }, () => (Math.random() < p ? 1 : 0)), code = `L = ${lst(L)}\nprint(sum(L) / len(L))`;
      const f = arr(L.reduce((s, v) => s + v, 0) / L.length, 6), fr2 = !Number.isInteger(arr(f * 100, 6));
      return { enonce: `Un échantillon simulé d'une loi de Bernoulli est rangé dans une liste. Qu'affiche ce programme${fr2 ? " (arrondi au centième)" : ""} ?\n\n${py(code)}`, mode: "nombre", prefixe: "Affichage :", attendu: fr2 ? Math.round(f * 100) / 100 : f, tolerance: fr2 ? 0.005 : 1e-9,
        erreurs: [{ valeur: L.reduce((s, v) => s + v, 0), message: "$\\texttt{sum(L)}$ compte les $1$ ; il est ensuite divisé par la longueur." }, { valeur: L.length, message: "$\\texttt{len(L)}$ est la taille, pas le résultat." }],
        aides: ["$\\texttt{sum(L)}$ : nombre de $1$ dans la liste.", `$\\texttt{len(L)} = ${L.length}$.`, "Le programme affiche la fréquence des $1$."],
        solution: `$\\texttt{sum(L)} = ${L.reduce((s, v) => s + v, 0)}$ et $\\texttt{len(L)} = ${L.length}$ : le programme affiche la fréquence $\\dfrac{${L.reduce((s, v) => s + v, 0)}}{${L.length}} ${fr2 ? "\\approx" : "="} ${nb(fr2 ? Math.round(f * 100) / 100 : f)}$.` };
    }
    if (t === "taille") {
      const n1 = pick([25, 50, 100, 200]), k = pick([2, 3, 4]), s1 = arr(Math.sqrt(p * (1 - p) / n1), 3);
      return { enonce: `Avec $\\texttt{F = [frequence(${n1}, ${p}) for j in range(1000)]}$, on trouve un écart-type des fréquences $s \\approx ${nb(s1)}$. Quelle taille d'échantillon faut-il prendre dans $\\texttt{frequence(n, ${p})}$ pour obtenir un écart-type environ $${k}$ fois plus petit ?`, mode: "nombre", prefixe: "$n =$", attendu: n1 * k * k,
        erreurs: [{ valeur: n1 * k, message: "La dispersion est en $\\dfrac{1}{\\sqrt{n}}$ : il faut multiplier $n$ par $" + k + "^2$." }, { valeur: n1 / k, message: "Une taille plus **grande** réduit la dispersion." }],
        aides: ["L'écart-type est de l'ordre de $\\dfrac{1}{\\sqrt{n}}$.", `Diviser par $${k}$ : multiplier $\\sqrt{n}$ par $${k}$.`, `Donc multiplier $n$ par $${k * k}$.`],
        solution: `Il faut multiplier la taille par $${k}^2 = ${k * k}$ : $n = ${n1} \\times ${k * k} = ${n1 * k * k}$.` };
    }
    if (t === "moyenne") {
      const bonne = py(`def frequence(n, p):\n    L = [bernoulli(p) for k in range(n)]\n    return sum(L) / n`);
      const ch = choix4(bonne, [py(`def frequence(n, p):\n    L = [bernoulli(p) for k in range(n)]\n    return sum(L)`), py(`def frequence(n, p):\n    L = [bernoulli(p)] * n\n    return sum(L) / n`), py(`def frequence(n, p):\n    return p / n`)]);
      return { enonce: `La fonction $\\texttt{bernoulli(p)}$ renvoie $1$ avec la probabilité $p$, sinon $0$. Quelle fonction renvoie la fréquence des $1$ dans un échantillon de taille $n$ (on l'appellera avec $\\texttt{frequence(${n}, ${p})}$) ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Il faut $n$ tirages **différents** : une liste en compréhension.", "$\\texttt{sum(L)}$ compte les $1$.", "La fréquence est ce nombre divisé par $n$."],
        solution: "On fabrique l'échantillon avec une liste en compréhension (un tirage à chaque tour), on compte les $1$ avec $\\texttt{sum}$, et on divise par $n$." };
    }
    const k = pick([1, 2]);
    const code = `N = 1000\nF = [frequence(${n}, ${p}) for j in range(N)]\ns = ecart_type(F)\nc = 0\nfor f in F:\n    if abs(f - ${p}) <= ${k} * s:\n        c = c + 1\nprint(c / N)`;
    const att = k === 1 ? 68 : 95;
    const ch = choix4(`environ $${nb(att / 100)}$`, [`environ $${nb(k === 1 ? 0.95 : 0.68)}$`, "environ $0{,}5$", "exactement $1$"]);
    return { enonce: `Que peut-on s'attendre à voir affiché par ce programme (proportion d'échantillons dont la fréquence est à moins de $${k}s$ de $p$) ?\n\n${py(code)}`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["$\\texttt{F}$ contient $1\\,000$ fréquences d'échantillons ; $\\texttt{s}$ leur écart-type.", "On compte les fréquences à distance au plus $" + k + "s$ de $p$, puis on divise par $N$.", "Rappel des simulations : environ $68\\,\\%$ dans $[p - s\\,;p + s]$, $95\\,\\%$ dans $[p - 2s\\,;p + 2s]$, $99{,}7\\,\\%$ dans $3s$."],
      solution: `Le programme calcule la proportion d'échantillons dont la fréquence est dans $[p - ${k}s\\,;p + ${k}s]$ : on observe environ $${att}\\,\\%$, soit environ $${nb(att / 100)}$ (la valeur exacte varie d'une exécution à l'autre).` };
  });

  def("yx-vrai-faux", () => vraiFaux4([
    ["La somme des probabilités d'une loi de probabilité vaut $1$.", true, "toutes les valeurs possibles sont envisagées."],
    ["$E(X) = \\sum x_i \\times P(X = x_i)$.", true, "c'est la définition de l'espérance."],
    ["Si $X$ suit une loi de Bernoulli de paramètre $0{,}3$, alors $E(X) = 0{,}3$.", true, "$1 \\times 0{,}3 + 0 \\times 0{,}7$."],
    ["Un jeu est équitable quand l'espérance du gain algébrique est nulle.", true, "en moyenne on ne gagne ni ne perd."],
    ["La fréquence observée des $1$ dans un échantillon fluctue d'un échantillon à l'autre.", true, "c'est la fluctuation d'échantillonnage."],
    ["Plus l'échantillon est grand, moins les fréquences observées sont dispersées.", true, "l'écart-type est de l'ordre de $\\dfrac{1}{\\sqrt{n}}$."],
    ["Environ $95\\,\\%$ des fréquences d'échantillons sont à moins de $2s$ de $p$.", true, "c'est ce qu'on observe sur les simulations."],
    ["$P(X \\leqslant 3)$ ne comprend pas la valeur $3$.", false, "$\\leqslant$ : $3$ est comprise."],
    ["L'espérance est la moyenne simple des valeurs de $X$.", false, "c'est une moyenne pondérée par les probabilités."],
    ["Une loi de Bernoulli prend trois valeurs.", false, "deux : $0$ et $1$."],
    ["Dans un échantillon de taille $100$ d'une loi de Bernoulli de paramètre $0{,}4$, on obtient forcément $40$ fois $1$.", false, "on obtient environ $40$, avec des fluctuations."],
    ["Pour diviser par $2$ la dispersion des fréquences, il suffit de doubler la taille de l'échantillon.", false, "il faut la multiplier par $4$."],
    ["Une fréquence à plus de $3s$ de $p$ prouve que le modèle est faux.", false, "c'est rare mais possible : on peut douter, pas conclure avec certitude."]
  ], ["Loi : somme des probabilités égale à $1$ ; espérance : moyenne pondérée.", "Bernoulli : valeurs $0$ et $1$, espérance $p$.", "Fluctuation : environ $95\\,\\%$ dans $2s$, dispersion en $\\dfrac{1}{\\sqrt{n}}$."]));

  /* Figures du cours (chapitre 14) */
  FIGURES["yx-cours-loi"] = () => graph({ xmin: -4, xmax: 12, ymin: 0, ymax: 0.6, xstep: 1, ystep: 0.1, xetiq: 2, yetiq: 0.1, h: 240, bars: [{ x: -2, y: 0.5 }, { x: 3, y: 0.3 }, { x: 10, y: 0.2 }], points: [{ x: -2, y: 0.5, label: "0,5" }, { x: 3, y: 0.3, label: "0,3" }, { x: 10, y: 0.2, label: "0,2" }], xlabel: "gain", aria: "Diagramme en bâtons de la loi du gain : −2 avec 0,5 ; 3 avec 0,3 ; 10 avec 0,2" });
  FIGURES["yx-cours-fluctuation"] = () => {
    // histogramme approximatif des fréquences de 1000 échantillons de taille 100, p = 0,4
    const cl = [0.25, 0.28, 0.31, 0.34, 0.37, 0.4, 0.43, 0.46, 0.49, 0.52], eff = [3, 12, 45, 120, 230, 260, 190, 95, 35, 10];
    return graphePlus({ xmin: 0.22, xmax: 0.57, ymin: 0, ymax: 290, xstep: 0.03, ystep: 50, xetiq: 0.06, yetiq: 50, h: 250, padL: 34, rects: cl.map((c, k) => ({ a: c, b: c + 0.03, h: eff[k] })), xlabel: "f", aria: "Histogramme des fréquences observées de 1 000 échantillons de taille 100 avec p = 0,4 : centré sur 0,4, la plupart entre 0,3 et 0,5" }, (X, Y) => `<line x1="${X(0.4)}" y1="${Y(0)}" x2="${X(0.4)}" y2="${Y(285)}" style="stroke:var(--faux);stroke-width:2;stroke-dasharray:5 3"/><text class="g-label" x="${X(0.4) + 4}" y="${Y(275)}" style="fill:var(--faux)">p = 0,4</text><line x1="${X(0.302)}" y1="${Y(25)}" x2="${X(0.498)}" y2="${Y(25)}" style="stroke:var(--lagon);stroke-width:2"/><text class="g-label" x="${X(0.4)}" y="${Y(25) - 4}" text-anchor="middle" style="fill:var(--lagon)">p ± 2s</text>`);
  };

})();
