/*
  Première générale, enseignement de mathématiques intégré à l'enseignement scientifique (tronc commun des élèves
  sans spécialité mathématiques, programme du BO n° 14 du 2 avril 2026) : générateurs d'exercices et figures.
  Préfixes : qv (évolutions), qc (calcul algébrique), qf (fonctions et graphiques), qs (données), qx (tableaux croisés),
  qn (nuages et ajustement), qp (probabilités conditionnelles), qb (épreuves de Bernoulli), qu et qa (suites, suites
  arithmétiques), qd (fonctions affines), qq (degré 2), qg (suites géométriques), qe (fonctions exponentielles).
  Chaque générateur fabrique une question avec des nombres tirés au hasard, la réponse attendue,
  trois indices progressifs et la solution rédigée.
  Ce fichier n'a besoin que d'assets/exercices-base.js (outils et graphiques communs), chargé avant lui :
  le gros fichier des générateurs du lycée (assets/exercices.js) n'est pas téléchargé pour ce niveau.
  Beaucoup de générateurs reprennent ceux de la Première technologique (assets/exercices-techno.js), copiés ici
  pour que chaque niveau ne télécharge que son propre fichier.
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
  // Erreurs prévues : sans doublon, jamais acceptées comme réponse (tolérance comprise)
  const errs = (att, L, tol) => { const vus = [], t = Math.max(1e-9, tol || 0); return (L || []).filter((e) => { if (!e || typeof e.valeur !== "number" || !isFinite(e.valeur)) return false; if (Math.abs(e.valeur - att) < t || vus.some((w) => Math.abs(w - e.valeur) < 1e-9)) return false; vus.push(e.valeur); return true; }); };
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
  const def = (nom, f) => { GEN[nom] = function (i) { const q = f(i); if (q.mode === "nombre") q.erreurs = errs(q.attendu, q.erreurs, q.tolerance); return q; }; };
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

  /* ---------- Chapitre 1 : automatismes, évolutions et pourcentages (préfixe qv) ---------- */
  const OBJETS = [["un scooter", "€"], ["un téléphone", "€"], ["un billet d'avion pour La Réunion", "€"], ["un sac de riz", "€"], ["le loyer d'un studio", "€"], ["une paire de baskets", "€"], ["un abonnement internet", "€"], ["une télévision", "€"]];
  const GRANDEURS = [["la population de", "habitants"], ["le nombre d'abonnés de", "abonnés"], ["le nombre de visiteurs de", "visiteurs"], ["le nombre de licenciés du club de", "licenciés"]];
  const TAUX = [2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 75];
  const taux = () => pick([1, -1]) * pick(TAUX); // en %
  const cm = (t) => arr(1 + t / 100); // coefficient multiplicateur
  const signe = (t) => (t > 0 ? "augmente" : "baisse");
  const tauxTex = (t) => (t < 0 ? `-${nb(-t)}\\,\\%` : `+${nb(t)}\\,\\%`);
  const pctTex = (t) => `${nb(Math.abs(t))}\\,\\%`;

  def("qv-proportion", () => {
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
    if (!Number.isInteger(eff)) return GEN["qv-proportion"]();
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

  def("qv-appliquer", () => {
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

  def("qv-initiale", () => {
    const t = taux(), c = cm(t);
    const v0 = pick([40, 60, 80, 120, 150, 200, 240, 250, 300, 400, 450, 500, 600, 800, 900, 1200, 1500, 2000, 2500]), v1 = arr(v0 * c);
    if (!Number.isInteger(v1 * 100)) return GEN["qv-initiale"]();
    const [objet] = pick(OBJETS);
    return { enonce: `Après une ${t > 0 ? "hausse" : "baisse"} de $${pctTex(t)}$, le prix d'${objet.replace(/^un /, "")} est de ${euros(v1)}. Quel était le prix **avant** l'évolution ?`.replace("d'le ", "du "), mode: "nombre", prefixe: "Prix initial :", attendu: v0, suffixe: "€",
      erreurs: [{ valeur: arr(v1 * (1 - t / 100)), message: `Pour revenir en arrière, on ne ${t > 0 ? "retire" : "rajoute"} pas $${pctTex(t)}$ du nouveau prix : on **divise** par le coefficient $${nb(c)}$.` }, { valeur: arr(v1 * c), message: "On cherche la valeur **avant** l'évolution : il faut diviser par le coefficient, pas multiplier." }, { valeur: arr(v1 - t), message: "Un pourcentage n'est pas un montant qu'on retire." }],
      aides: [`Valeur finale $=$ valeur initiale $\\times$ coefficient, avec le coefficient $${nb(c)}$.`, "Donc valeur initiale $=$ valeur finale $\\div$ coefficient.", `$${nb(v1)} \\div ${nb(c)}$.`],
      solution: `Coefficient multiplicateur : $${nb(c)}$. Valeur initiale : $\\dfrac{${nb(v1)}}{${nb(c)}} = ${nb(v0)}$ €.\n\nVérification : $${nb(v0)} \\times ${nb(c)} = ${nb(v1)}$.` };
  });

  def("qv-taux", () => {
    const t = pick([1, -1]) * pick([2, 4, 5, 6, 8, 10, 12, 12.5, 15, 20, 24, 25, 30, 35, 40, 50, 60, 75, 80, 100, 120, 150, 200]);
    const base = pick([40, 50, 80, 100, 120, 150, 200, 240, 250, 300, 400, 500, 600, 800, 1000, 1200, 1500, 2000, 2400, 3000]);
    const v0 = base, v1 = arr(v0 * (1 + t / 100));
    if (!Number.isInteger(v1) || v1 <= 0) return GEN["qv-taux"]();
    const [g, unite] = pick(GRANDEURS), l = lieu();
    const ctxPrix = Math.random() < 0.5;
    const [objet] = pick(OBJETS);
    const enonce = ctxPrix ? `Le prix d'${objet.replace(/^un /, "")} passe de ${euros(v0)} à ${euros(v1)}. Quel est le taux d'évolution, en pourcentage ?`.replace("d'le ", "du ") : `${g.charAt(0).toUpperCase() + g.slice(1)} ${l} passe de $${nb(v0)}$ à $${nb(v1)}$ ${unite}. Quel est le taux d'évolution, en pourcentage ?`;
    return { enonce, mode: "nombre", prefixe: "Taux :", attendu: t, suffixe: "%",
      erreurs: [{ valeur: -t, message: `La valeur ${t > 0 ? "augmente" : "diminue"} : le taux est ${t > 0 ? "positif" : "négatif"}.` }, { valeur: arr((v1 - v0) / v1 * 100), message: "On divise par la valeur de **départ**, pas par la valeur d'arrivée." }, { valeur: v1 - v0, message: "Ça, c'est la variation absolue. Le taux est $\\dfrac{\\text{variation}}{\\text{valeur de départ}}$, en pourcentage." }, { valeur: arr((v1 - v0) / v0), message: "Multiplie par $100$ pour l'exprimer en pourcentage." }],
      aides: ["Taux d'évolution $= \\dfrac{\\text{valeur finale} - \\text{valeur initiale}}{\\text{valeur initiale}}$.", `$\\dfrac{${nb(v1)} - ${nb(v0)}}{${nb(v0)}} = \\dfrac{${nb(v1 - v0)}}{${nb(v0)}}$.`, `$\\dfrac{${nb(v1 - v0)}}{${nb(v0)}} = ${nb(arr(t / 100))}$ : multiplie par $100$.`],
      solution: `$\\dfrac{${nb(v1)} - ${nb(v0)}}{${nb(v0)}} = \\dfrac{${nb(v1 - v0)}}{${nb(v0)}} = ${nb(arr(t / 100))}$, soit un taux de $${tauxTex(t)}$ (${t > 0 ? "hausse" : "baisse"}).\n\nAutrement dit, le coefficient multiplicateur est $\\dfrac{${nb(v1)}}{${nb(v0)}} = ${nb(arr(1 + t / 100))}$.` };
  });

  def("qv-coefficient", () => {
    const t = pick([1, -1]) * pick([0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 7, 7.5, 8, 10, 12, 12.5, 15, 18, 20, 25, 30, 35, 40, 45, 50, 60, 70, 75, 80, 90, 100, 120, 150, 200]);
    const c = cm(t);
    if (c <= 0) return GEN["qv-coefficient"]();
    if (Math.random() < 0.5) return { enonce: `Quel est le coefficient multiplicateur associé à une ${t > 0 ? "hausse" : "baisse"} de $${pctTex(t)}$ ?`, mode: "nombre", prefixe: "$CM =$", attendu: c,
      erreurs: [{ valeur: arr(1 - t / 100), message: `Une ${t > 0 ? "hausse" : "baisse"} : $1 ${t > 0 ? "+" : "-"} \\dfrac{${nb(Math.abs(t))}}{100}$.` }, { valeur: arr(Math.abs(t) / 100), message: "N'oublie pas le $1$ : le coefficient est $1 + \\dfrac{t}{100}$." }, { valeur: arr(1 + t / 10), message: `$${nb(Math.abs(t))}\\,\\% = \\dfrac{${nb(Math.abs(t))}}{100} = ${nb(Math.abs(t) / 100)}$.` }],
      aides: ["Coefficient multiplicateur $CM = 1 + \\dfrac{t}{100}$, avec $t$ négatif pour une baisse.", `$t = ${nb(t)}$.`, `$1 ${t > 0 ? "+" : "-"} ${nb(Math.abs(t) / 100)}$.`],
      solution: `$CM = 1 ${t > 0 ? "+" : "-"} \\dfrac{${nb(Math.abs(t))}}{100} = ${nb(c)}$.` };
    return { enonce: `Une grandeur est multipliée par $${nb(c)}$. Quel est le taux d'évolution correspondant, en pourcentage (négatif pour une baisse) ?`, mode: "nombre", prefixe: "Taux :", attendu: t, suffixe: "%",
      erreurs: [{ valeur: -t, message: `Le coefficient est ${c > 1 ? "supérieur" : "inférieur"} à $1$ : c'est une ${c > 1 ? "hausse" : "baisse"}.` }, { valeur: arr(c * 100), message: "Le taux est $(CM - 1) \\times 100$ : on retire d'abord le $1$." }, { valeur: arr(t / 100), message: "Multiplie par $100$ pour avoir un pourcentage." }],
      aides: ["$CM = 1 + \\dfrac{t}{100}$, donc $t = (CM - 1) \\times 100$.", `$${nb(c)} - 1 = ${nb(arr(c - 1))}$.`, c > 1 ? "Le coefficient dépasse $1$ : hausse." : "Le coefficient est inférieur à $1$ : baisse, taux négatif."],
      solution: `$CM - 1 = ${nb(arr(c - 1))}$, soit $t = ${nb(arr(c - 1))} \\times 100 = ${nb(t)}$ : une ${t > 0 ? "hausse" : "baisse"} de $${pctTex(t)}$.` };
  });

  def("qv-successives", () => {
    const t1 = taux(), t2 = taux();
    const c = arr(cm(t1) * cm(t2)), tg = arr((c - 1) * 100);
    if (Math.abs(t1) === Math.abs(t2) && t1 === t2 && Math.random() < 0.5) return GEN["qv-successives"]();
    const ctx = pick([["Le prix d'un billet d'avion", "prix"], ["Le loyer d'un appartement", "loyer"], ["La population d'un village", "population"], ["Le prix du carburant", "prix"], ["Le nombre d'abonnés d'une chaîne", "nombre d'abonnés"]]);
    return { enonce: `${ctx[0]} ${signe(t1)} de $${pctTex(t1)}$, puis ${signe(t2)} de $${pctTex(t2)}$. Quel est le taux d'évolution global, en pourcentage (négatif pour une baisse) ?`, mode: "nombre", prefixe: "Taux global :", attendu: tg, suffixe: "%",
      erreurs: [{ valeur: t1 + t2, message: "Les taux ne s'additionnent pas : on **multiplie** les coefficients multiplicateurs." }, { valeur: arr(c * 100), message: "Tu as le coefficient global en pourcentage : le taux est $(CM - 1) \\times 100$." }, { valeur: c, message: "Ça, c'est le coefficient global. Le taux est $(CM - 1) \\times 100$." }],
      aides: [`Coefficients : $${nb(cm(t1))}$ puis $${nb(cm(t2))}$.`, `Coefficient global : $${nb(cm(t1))} \\times ${nb(cm(t2))} = ${nb(c)}$.`, "Taux global $= (CM_{\\text{global}} - 1) \\times 100$."],
      solution: `$CM_{\\text{global}} = ${nb(cm(t1))} \\times ${nb(cm(t2))} = ${nb(c)}$.\n\nTaux global : $(${nb(c)} - 1) \\times 100 = ${nb(tg)}$, soit $${tauxTex(tg)}$. ${t1 + t2 !== tg ? `Ce n'est pas $${tauxTex(t1 + t2)}$ : les pourcentages ne s'additionnent pas.` : ""}` };
  });

  def("qv-reciproque", () => {
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

  def("qv-points", () => {
    const a = pick([10, 12, 15, 20, 24, 25, 30, 32, 40, 45, 48, 50, 60]), d = pick([-10, -8, -6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 8, 10, 12, 15]), b = a + d;
    if (b <= 0 || b >= 100) return GEN["qv-points"]();
    const ctx = pick(["Le taux de chômage", "La part des énergies renouvelables", "Le taux de réussite au bac", "La proportion de clients satisfaits", "Le taux de participation"]);
    const q = pick(["points", "pct"]);
    const tp = arr(d / a * 100), arrondi = Math.abs(tp - Math.round(tp * 10) / 10) > 1e-9, att = q === "points" ? d : (arrondi ? Math.round(tp * 10) / 10 : tp);
    return { enonce: `${ctx} passe de $${a}\\,\\%$ à $${b}\\,\\%$. ${q === "points" ? "De combien de **points de pourcentage** a-t-il évolué ?" : `Quel est son **taux d'évolution** en pourcentage${arrondi ? " (arrondi au dixième)" : ""} ?`}`, mode: "nombre", prefixe: q === "points" ? "Variation :" : "Taux :", attendu: att, suffixe: q === "points" ? "points" : "%", tolerance: q === "pct" && arrondi ? 0.05 : 1e-9,
      erreurs: q === "points" ? [{ valeur: arrondi ? Math.round(tp * 10) / 10 : tp, message: "Ça, c'est le taux d'évolution en pourcentage. En points, on fait simplement la différence." }, { valeur: -d, message: "Le signe : " + (d > 0 ? "hausse, variation positive." : "baisse, variation négative.") }] : [{ valeur: d, message: "Ça, c'est la variation en points. Le taux d'évolution est $\\dfrac{\\text{variation}}{\\text{valeur de départ}} \\times 100$." }, { valeur: arr(d / b * 100), message: "On divise par la valeur de départ." }],
      aides: ["Une variation en **points** est une simple différence entre deux pourcentages.", "Un **taux d'évolution** compare la variation à la valeur de départ.", q === "points" ? `$${b} - ${a}$.` : `$\\dfrac{${b} - ${a}}{${a}} \\times 100$.`],
      solution: q === "points" ? `$${b} - ${a} = ${nb(d)}$ : ${d > 0 ? "une hausse" : "une baisse"} de $${Math.abs(d)}$ points de pourcentage. (Le taux d'évolution, lui, vaut $\\dfrac{${nb(d)}}{${a}} \\approx ${nb(Math.round(tp * 10) / 10)}\\,\\%$.)` : `$\\dfrac{${b} - ${a}}{${a}} \\times 100 = \\dfrac{${nb(d)}}{${a}} \\times 100 ${arrondi ? "\\approx" : "="} ${nb(att)}$ : un taux d'évolution de $${tauxTex(att)}$, alors que la variation n'est que de $${nb(d)}$ points.` };
  });

  def("qv-vrai-faux", () => vraiFaux4([
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

  /* Figures du cours (chapitre 1) */
  FIGURES["qv-cours-cm"] = () => {
    let s = `<svg class="graph" viewBox="0 0 320 120" role="img" aria-label="Valeur initiale multipliée par le coefficient 1 + t/100 donne la valeur finale ; pour revenir, on divise">`;
    const box = (x, t1, t2) => `<rect x="${x}" y="38" width="100" height="44" rx="8" style="fill:var(--lagon);fill-opacity:0.12;stroke:var(--lagon);stroke-width:1.6"/><text class="g-label" x="${x + 50}" y="56" text-anchor="middle" style="font-weight:700">${t1}</text><text class="g-label" x="${x + 50}" y="72" text-anchor="middle" style="font-size:10px">${t2}</text>`;
    s += box(10, "valeur", "initiale") + box(210, "valeur", "finale");
    s += `<path d="M115 50 L200 50" style="stroke:var(--encre);stroke-width:1.6"/><path d="M205 50 L196 45 L196 55 Z" style="fill:var(--encre)"/><text class="g-label" x="160" y="30" text-anchor="middle" style="fill:var(--lagon);font-weight:700">× CM</text><text class="g-label" x="160" y="44" text-anchor="middle" style="font-size:10px">CM = 1 + t/100</text>`;
    s += `<path d="M205 72 L120 72" style="stroke:var(--encre);stroke-width:1.6"/><path d="M115 72 L124 67 L124 77 Z" style="fill:var(--encre)"/><text class="g-label" x="160" y="100" text-anchor="middle" style="fill:var(--faux);font-weight:700">÷ CM</text><text class="g-label" x="160" y="114" text-anchor="middle" style="font-size:10px">retour en arrière</text>`;
    return s + `</svg>`;
  };
  FIGURES["qv-cours-successives"] = () => {
    let s = `<svg class="graph" viewBox="0 0 320 110" role="img" aria-label="Évolutions successives : 200, +20 % donne 240, puis −25 % donne 180 ; coefficient global 1,2 × 0,75 = 0,9">`;
    const box = (x, t) => `<rect x="${x}" y="40" width="60" height="36" rx="8" style="fill:var(--surface);stroke:var(--lagon);stroke-width:1.6"/><text class="g-label" x="${x + 30}" y="63" text-anchor="middle" style="font-weight:700">${t}</text>`;
    const fl = (x1, x2, t) => `<path d="M${x1} 58 L${x2 - 6} 58" style="stroke:var(--encre);stroke-width:1.6"/><path d="M${x2} 58 L${x2 - 9} 53 L${x2 - 9} 63 Z" style="fill:var(--encre)"/><text class="g-label" x="${(x1 + x2) / 2}" y="34" text-anchor="middle" style="fill:var(--lagon);font-weight:700">${t}</text>`;
    s += box(10, "200") + fl(72, 130, "× 1,2") + box(130, "240") + fl(192, 250, "× 0,75") + box(250, "180");
    s += `<text class="g-label" x="160" y="100" text-anchor="middle">global : × 1,2 × 0,75 = × 0,9, soit −10 % (et non −5 %)</text>`;
    return s + `</svg>`;
  };

  /* ---------- Chapitre 2 : automatismes, calcul algébrique et signes (préfixe qc) ---------- */
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

  def("qc-produit-nul", () => {
    const a = pick([1, 1, 2, 3, -1, 5]), b = nz2(-9, 9), c = pick([1, 1, 2, 4, -2, 3]), d = nz2(-9, 9);
    const s1 = -b / a, s2 = -d / c;
    const dec = (x) => Number.isInteger(x * 100);
    if (!dec(s1) || !dec(s2) || Math.abs(s1 - s2) < 1e-9) return GEN["qc-produit-nul"]();
    const t = pick(["direct", "direct", "facto"]);
    const sol = [s1, s2].sort((x, y) => x - y);
    if (t === "facto") {
      // x(ax + b) = 0 ou (ax+b)² − (cx+d)² non : on reste simple, équation x² = kx ou ax² + bx = 0
      const k = nz2(-9, 9), a2 = pick([1, 1, 2, 3]);
      const sol2 = [0, -k / a2].sort((x, y) => x - y);
      if (!dec(sol2[1])) return GEN["qc-produit-nul"]();
      return { enonce: `Résous l'équation $${poly([a2, k, 0])} = 0$ (factorise d'abord). Écris les solutions séparées par « ; ».`, mode: "ensemble", attendu: sol2,
        aides: ["Les deux termes ont $x$ en facteur commun.", `$${poly([a2, k, 0])} = x(${aff(a2, k)})$.`, "Un produit est nul si et seulement si l'un des facteurs est nul."],
        solution: `$${poly([a2, k, 0])} = x(${aff(a2, k)})$.\n\nProduit nul : $x = 0$ ou $${aff(a2, k)} = 0$, c'est-à-dire $x = ${frac(-k, a2)}$.\n\n$S = \\{${sol2.map((v) => nb(v)).join("\\,;")}\\}$.` };
    }
    return { enonce: `Résous l'équation $${fac(a, b)}${fac(c, d)} = 0$. Écris les solutions séparées par « ; ».`, mode: "ensemble", attendu: sol,
      aides: ["Un produit est nul si et seulement si l'un au moins de ses facteurs est nul.", `Résous $${aff(a, b)} = 0$ puis $${aff(c, d)} = 0$.`, `$${aff(a, b)} = 0$ donne $x = ${frac(-b, a)}$.`],
      solution: `$${aff(a, b)} = 0$ ou $${aff(c, d)} = 0$.\n\n$x = ${frac(-b, a)}$ ou $x = ${frac(-d, c)}$.\n\n$S = \\{${sol.map((v) => nb(v)).join("\\,;")}\\}$.` };
  });

  // Signe d'une expression du premier degré (« affine ») ou factorisée du second degré (« produit »)
  const genSigne = (types) => function gen() {
    const t = pick(types);
    if (t === "affine") {
      const a = nz2(-6, 6), b = nz2(-9, 9), r = -b / a;
      if (!Number.isInteger(r * 100)) return gen();
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
  };
  def("qc-signe-affine", genSigne(["affine"]));
  def("qc-signe-produit", genSigne(["produit"]));

  // Développer (« dev »), factoriser (« fact »), réduire (« reduire »)
  const genDev = (types) => () => {
    const t = pick(types);
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
  };
  def("qc-developper", genDev(["dev"]));
  def("qc-factoriser", genDev(["fact"]));
  def("qc-reduire", genDev(["reduire"]));

  // Identités remarquables (rappels de Seconde) : développer (a ± b)², (a − b)(a + b), ou reconnaître la forme factorisée
  def("qc-identites", () => {
    const k = pick([1, 1, 2, 3]), b = rand(2, 9), s = pick(["+", "-", "pm"]), t = pick(["dev", "dev", "fact"]);
    const A = k === 1 ? "x" : `${k}x`;
    const dev = s === "pm" ? poly([k * k, 0, -b * b]) : poly([k * k, (s === "+" ? 2 : -2) * k * b, b * b]);
    const fact = s === "pm" ? `(${A} - ${b})(${A} + ${b})` : `(${A} ${s} ${b})^2`;
    const faux = s === "pm" ? [`(${A} - ${b})^2`, `(${A} + ${b})^2`, `(${A} - ${b * b})(${A} + ${b * b})`] : [`(${A} ${s === "+" ? "-" : "+"} ${b})^2`, `(${A} - ${b})(${A} + ${b})`, `(${A} ${s} ${b * b})^2`];
    const fauxDev = s === "pm" ? [poly([k * k, 0, b * b]), poly([k * k, -2 * k * b, b * b]), poly([k, 0, -b])] : [poly([k * k, 0, b * b]), poly([k * k, (s === "+" ? -2 : 2) * k * b, b * b]), poly([k * k, (s === "+" ? 1 : -1) * k * b, b * b])];
    const id = s === "+" ? "(a + b)^2 = a^2 + 2ab + b^2" : s === "-" ? "(a - b)^2 = a^2 - 2ab + b^2" : "(a - b)(a + b) = a^2 - b^2";
    const ch = t === "dev" ? choix4(`$${dev}$`, fauxDev.map((e) => `$${e}$`)) : choix4(`$${fact}$`, faux.map((e) => `$${e}$`));
    return { enonce: t === "dev" ? `Développe $${fact}$.` : `Factorise $${dev}$.`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Reconnais une identité remarquable : $(a + b)^2$, $(a - b)^2$ ou $(a - b)(a + b)$.", `Ici $a = ${A}$ et $b = ${b}$.`, `$${id}$.`],
      solution: `Avec $a = ${A}$ et $b = ${b}$ : $${id}$, donc $${fact} = ${dev}$.${s !== "pm" ? ` Le double produit vaut $2 \\times ${A} \\times ${b} = ${coef(2 * k * b, "x")}$ : sans lui, le développement est faux.` : ""}` };
  });

  def("qc-vrai-faux", () => vraiFaux4([
    ["$(x - 3)(x + 5) = 0$ a pour solutions $3$ et $-5$.", true, "produit nul : $x - 3 = 0$ ou $x + 5 = 0$."],
    ["$2x - 8$ est positif pour $x > 4$.", true, "$2x - 8 > 0$ équivaut à $x > 4$."],
    ["$(x - 1)(x - 4)$ est négatif entre $1$ et $4$.", true, "le produit est négatif entre les racines (coefficient $1 > 0$)."],
    ["$(2x + 1)(x - 3) = 2x^2 - 5x - 3$.", true, "double distributivité : $2x^2 - 6x + x - 3$."],
    ["$x^2 - 25 = (x - 5)(x + 5)$.", true, "identité $a^2 - b^2 = (a - b)(a + b)$."],
    ["$3x^2 + 6x = 3x(x + 2)$.", true, "$3x$ est le facteur commun."],
    ["$2(x + 4) - (x - 1) = x + 9$.", true, "$2x + 8 - x + 1 = x + 9$."],
    ["$x(x + 7) = 0$ a deux solutions : $0$ et $-7$.", true, "$x = 0$ ou $x + 7 = 0$."],
    ["$x(x - 2) = 0$ a pour unique solution $2$.", false, "il y a aussi $x = 0$."],
    ["$-3x + 6$ est positif pour $x > 2$.", false, "le coefficient est négatif : positif pour $x < 2$."],
    ["$(x + 2)(x + 5)$ est toujours positif.", false, "il est négatif pour $x$ entre $-5$ et $-2$."],
    ["$(x + 3)^2 = x^2 + 9$.", false, "$(x + 3)^2 = x^2 + 6x + 9$."],
    ["$2(x + 4) - (x - 1) = x + 7$.", false, "le signe moins change aussi le $-1$ : $x + 9$."],
    ["$(x - 2)(x + 3) = 6$ se résout avec la règle du produit nul.", false, "le second membre doit être $0$."],
    ["$4x^2 - 9 = (4x - 9)(4x + 9)$.", false, "$4x^2 - 9 = (2x - 3)(2x + 3)$."]
  ], ["Pense « produit nul », tableau de signes, double distributivité.", "Une identité remarquable se vérifie en redéveloppant.", "Un signe moins devant une parenthèse change tous les signes à l'intérieur."]));

  /* Figures du cours (chapitre 2) */
  FIGURES["qc-cours-signe"] = () => tabSigne(["−∞", "−1", "3", "+∞"], ["+", "0", "−", "0", "+"], "", [["x + 1", ["−", "0", "+", "", "+"]], ["x − 3", ["−", "", "−", "0", "+"]], ["produit", ["+", "0", "−", "0", "+"]]]);

  /* ---------- Chapitre 3 : automatismes, fonctions, graphiques et droites (préfixe qf) ---------- */
  // Parabole f(x) = s(x − h)² + v (s = ±1), fenêtre [-6 ; 6]
  function paraboleQ() {
    const s = pick([1, 1, -1]), h = rand(-2, 2), v = s > 0 ? rand(-5, 1) : rand(-1, 5);
    const f = (x) => s * (x - h) ** 2 + v;
    return { s, h, v, f };
  }
  const figParabole = (P, hl, pts) => graph({ xmin: -5.6, xmax: 5.6, ymin: -6.6, ymax: 6.6, h: 300, curves: [{ f: P.f, a: Math.max(-5.3, P.h - Math.sqrt(Math.max(0, (P.s > 0 ? 6.3 - P.v : P.v + 6.3)))), b: Math.min(5.3, P.h + Math.sqrt(Math.max(0, (P.s > 0 ? 6.3 - P.v : P.v + 6.3)))), label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", closed: false }], hlines: hl || [], points: pts || [], aria: `Parabole de sommet (${nbS(P.h)} ; ${nbS(P.v)}), tournée vers le ${P.s > 0 ? "haut" : "bas"}` });

  const genGraphique = (types) => function gen() {
    const P = paraboleQ(), t = pick(types);
    if (t === "image") {
      const x = rand(Math.max(-4, P.h - 3), Math.min(4, P.h + 3)), y = P.f(x);
      if (Math.abs(y) > 6) return gen();
      const q = pick(["image", "antecedents"]);
      if (q === "image") return { enonce: `La courbe $C_f$ est donnée ci-dessous. Lis graphiquement $f(${nb(x)})$.`, figure: figParabole(P), mode: "nombre", prefixe: `$f(${nb(x)}) =$`, attendu: y,
        erreurs: [{ valeur: x, message: "L'image se lit sur l'axe **vertical** (ordonnées)." }, { valeur: -y, message: "Vérifie le signe : la courbe est-elle au-dessus ou en dessous de l'axe des abscisses ?" }],
        aides: [`Place $x = ${nb(x)}$ sur l'axe horizontal.`, "Monte (ou descends) jusqu'à la courbe, puis lis l'ordonnée du point.", `Le point de la courbe d'abscisse $${nb(x)}$ a pour ordonnée $${nb(y)}$.`],
        solution: `Le point de $C_f$ d'abscisse $${nb(x)}$ a pour ordonnée $${nb(y)}$ : $f(${nb(x)}) = ${nb(y)}$.` };
      const m = rand(1, 3), k = P.f(P.h + m), sol = [P.h - m, P.h + m];
      if (Math.abs(k) > 6) return gen();
      return { enonce: `La courbe $C_f$ est donnée ci-dessous. Lis graphiquement les antécédents de $${nb(k)}$ par $f$ (séparés par « ; »).`, figure: figParabole(P, [{ y: k, label: `y = ${nbS(k)}` }]), mode: "ensemble", attendu: sol,
        aides: [`Trace la droite horizontale $y = ${nb(k)}$.`, "Les antécédents sont les abscisses des points d'intersection avec la courbe.", `Il y en a deux, symétriques par rapport à l'axe de la parabole $x = ${nb(P.h)}$.`],
        solution: `La droite $y = ${nb(k)}$ coupe $C_f$ en deux points, d'abscisses $${nb(sol[0])}$ et $${nb(sol[1])}$ : les antécédents de $${nb(k)}$ sont $${nb(sol[0])}$ et $${nb(sol[1])}$.` };
    }
    if (t === "signe") {
      // racines entières h ± m, coefficient k pour garder le sommet dans la fenêtre
      const m = rand(1, 3), h = rand(m - 5, 5 - m), k = m === 3 ? 0.5 : m === 2 ? pick([0.5, 1, 1.5]) : pick([1, 2, 3]), r1 = h - m, r2 = h + m;
      const w = Math.sqrt(m * m + 6.3 / k);
      const P2 = { s: P.s, h, v: -P.s * k * m * m, f: (x) => P.s * k * ((x - h) ** 2 - m * m) };
      const figParabole = () => graph({ xmin: -5.6, xmax: 5.6, ymin: -6.6, ymax: 6.6, h: 300, curves: [{ f: P2.f, a: Math.max(-5.3, h - w), b: Math.min(5.3, h + w), label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", closed: false }], aria: `Parabole tournée vers le ${P2.s > 0 ? "haut" : "bas"}, qui coupe l'axe des abscisses en ${nbS(r1)} et ${nbS(r2)}` });
      const ext = P2.s > 0;
      const bonne = ext ? `$f(x) \\geqslant 0$ sur $]-\\infty\\,;${nb(r1)}] \\cup [${nb(r2)}\\,;+\\infty[$ et $f(x) \\leqslant 0$ sur $[${nb(r1)}\\,;${nb(r2)}]$` : `$f(x) \\leqslant 0$ sur $]-\\infty\\,;${nb(r1)}] \\cup [${nb(r2)}\\,;+\\infty[$ et $f(x) \\geqslant 0$ sur $[${nb(r1)}\\,;${nb(r2)}]$`;
      const autre = ext ? `$f(x) \\leqslant 0$ sur $]-\\infty\\,;${nb(r1)}] \\cup [${nb(r2)}\\,;+\\infty[$ et $f(x) \\geqslant 0$ sur $[${nb(r1)}\\,;${nb(r2)}]$` : `$f(x) \\geqslant 0$ sur $]-\\infty\\,;${nb(r1)}] \\cup [${nb(r2)}\\,;+\\infty[$ et $f(x) \\leqslant 0$ sur $[${nb(r1)}\\,;${nb(r2)}]$`;
      const ch = choix4(bonne, [autre, `$f(x) \\geqslant 0$ sur $]-\\infty\\,;${nb(P.h)}]$ et $f(x) \\leqslant 0$ sur $[${nb(P.h)}\\,;+\\infty[$`, `$f(x) \\geqslant 0$ sur $[${nb(r1)}\\,;+\\infty[$ et $f(x) \\leqslant 0$ sur $]-\\infty\\,;${nb(r1)}]$`]);
      return { enonce: `La courbe $C_f$ est donnée ci-dessous. Quel est le signe de $f(x)$ selon les valeurs de $x$ ?`, figure: figParabole(P2), mode: "choix", choix: ch.choix, attendu: ch.attendu, figureSolution: tabSigne(["−∞", nbS(r1), nbS(r2), "+∞"], [ext ? "+" : "-", "0", ext ? "-" : "+", "0", ext ? "+" : "-"], "f(x)"),
        aides: ["$f(x) > 0$ quand la courbe est **au-dessus** de l'axe des abscisses, $f(x) < 0$ quand elle est en dessous.", `La courbe coupe l'axe des abscisses en $${nb(r1)}$ et $${nb(r2)}$.`, `Entre les deux, la courbe est ${ext ? "en dessous" : "au-dessus"} de l'axe.`],
        solution: `La courbe coupe l'axe des abscisses en $${nb(r1)}$ et en $${nb(r2)}$. Elle est ${ext ? "en dessous de l'axe entre ces deux valeurs et au-dessus ailleurs" : "au-dessus de l'axe entre ces deux valeurs et en dessous ailleurs"} : ${bonne.replace(/\$f\(x\)/g, "$f(x)")}.` };
    }
    const m = rand(1, 3), k = P.f(P.h + m);
    if (Math.abs(k) > 6) return gen();
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
  };
  def("qf-resoudre", genGraphique(["egal", "ineg", "ineg"]));
  def("qf-lire", genGraphique(["image"]));
  def("qf-signe", genGraphique(["signe"]));

  def("qf-variations", () => {
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

  const genDroite = (types) => function gen() {
    const t = pick(types);
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
      if (Math.abs(y2) > 5) return gen();
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
  };
  def("qf-droite-lire", genDroite(["lire"]));
  def("qf-droite-tracer", genDroite(["tracer"]));
  def("qf-coef-dir", genDroite(["point-pente"]));

  /* Figures du cours (chapitre 3) */
  FIGURES["qf-cours-graphique"] = () => graph({ xmin: -3.6, xmax: 4.6, ymin: -3.6, ymax: 5.6, h: 300, curves: [{ f: (x) => (x - 1) ** 2 - 2, a: -1.7, b: 3.7, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", closed: false }], hlines: [{ y: 2, label: "y = 2" }], points: [{ x: -1, y: 2, label: "−1", gauche: true }, { x: 3, y: 2, label: "3" }], aria: "Parabole de sommet (1 ; −2) et droite y = 2 : elles se coupent en x = −1 et x = 3 ; la courbe est en dessous de la droite entre −1 et 3" });
  FIGURES["qf-cours-droite"] = () => graph({ xmin: -3.6, xmax: 4.6, ymin: -2.6, ymax: 5.6, h: 280, curves: [{ f: (x) => 2 * x - 1, a: -0.8, b: 3.3, label: "y = 2x − 1", closed: false }], points: [{ x: 0, y: -1, label: "(0 ; −1)", gauche: true }, { x: 1, y: 1, label: "(1 ; 1)" }, { x: 2, y: 3, label: "+1 → +2", gauche: true }], aria: "Droite y = 2x − 1 : elle coupe l'axe des ordonnées en −1 et monte de 2 quand x augmente de 1" });

  // Droite donnée par un point et son coefficient directeur : tracer (choisir la bonne droite) ou trouver p
  def("qf-droite-point", () => {
    const m = pick([-3, -2, -1, -0.5, 0.5, 1, 2, 3]), xA = rand(-3, 3), p = rand(-4, 4), yA = m * xA + p;
    if (Math.abs(yA) > 5 || !Number.isInteger(yA) || xA === 0) return GEN["qf-droite-point"]();
    const eq = (mm, pp) => `y = ${mm === 0 ? nb(pp) : aff(mm, pp)}`;
    if (Math.random() < 0.5) return { enonce: `La droite $d$ passe par le point $A(${nb(xA)}\\,;${nb(yA)})$ et a pour coefficient directeur $${nb(m)}$. Quelle est son ordonnée à l'origine $p$ ?`, mode: "nombre", prefixe: "$p =$", attendu: p,
      erreurs: [{ valeur: yA + m * xA, message: `On a $y_A = m \\times x_A + p$, donc $p = y_A - m \\times x_A$ : on **soustrait** $m \\times x_A$.` }, { valeur: yA, message: "L'ordonnée de $A$ n'est l'ordonnée à l'origine que si $A$ est sur l'axe des ordonnées." }, { valeur: yA - xA, message: `N'oublie pas de multiplier $x_A$ par le coefficient directeur $${nb(m)}$.` }],
      aides: ["L'équation réduite est $y = mx + p$, et les coordonnées de $A$ la vérifient.", `$${nb(yA)} = ${nb(m)} \\times ${pr(xA)} + p$.`, `$p = ${nb(yA)} - ${pr(m * xA)}$.`],
      solution: `$A$ est sur $d$ : $${nb(yA)} = ${nb(m)} \\times ${pr(xA)} + p$, soit $${nb(yA)} = ${nb(m * xA)} + p$, donc $p = ${nb(yA)} - ${pr(m * xA)} = ${nb(p)}$.\n\nL'équation réduite est $${eq(m, p)}$.` };
    const autres = [[m, p + pick([1, -1, 2])], [-m, yA + m * xA], [m + (m > 0 ? 1 : -1), yA - (m + (m > 0 ? 1 : -1)) * xA]].filter((l) => Math.abs(l[1]) <= 5);
    if (autres.length < 2) return GEN["qf-droite-point"]();
    const lignes = shuffle([[m, p], ...autres].slice(0, 4));
    const noms = ["d₁", "d₂", "d₃", "d₄"], bonneK = lignes.findIndex((l) => l[0] === m && l[1] === p);
    const fig = graph({ xmin: -5.5, xmax: 5.5, ymin: -5.5, ymax: 5.5, h: 300, curves: lignes.map((l, k) => { const s = segDroite(l[0], l[1], -5.2, 5.2, -5.2, 5.2); return { f: (x) => l[0] * x + l[1], a: s.a, b: s.b, label: noms[k], closed: false, couleur: k }; }), points: [{ x: xA, y: yA, label: "A" }], aria: `Droites dans un repère et le point A (${nbS(xA)} ; ${nbS(yA)})` });
    const ch = choix4(`$${noms[bonneK]}$`, noms.slice(0, lignes.length).filter((_, k) => k !== bonneK).map((n) => `$${n}$`));
    return { enonce: `Laquelle de ces droites passe par le point $A$ et a pour coefficient directeur $${nb(m)}$ ?`, figure: fig, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Garde d'abord les droites qui passent par $A$.", `Depuis $A$, quand $x$ augmente de $${Number.isInteger(m) ? 1 : 2}$, $y$ doit ${m > 0 ? "augmenter" : "diminuer"} de $${nb(Math.abs(Number.isInteger(m) ? m : 2 * m))}$.`, `La bonne droite passe donc aussi par $(${nb(xA + (Number.isInteger(m) ? 1 : 2))}\\,;${nb(yA + (Number.isInteger(m) ? m : 2 * m))})$.`],
      solution: `Depuis $A(${nb(xA)}\\,;${nb(yA)})$, on avance de $${Number.isInteger(m) ? 1 : 2}$ et on ${m > 0 ? "monte" : "descend"} de $${nb(Math.abs(Number.isInteger(m) ? m : 2 * m))}$ : on arrive en $(${nb(xA + (Number.isInteger(m) ? 1 : 2))}\\,;${nb(yA + (Number.isInteger(m) ? m : 2 * m))})$. C'est $${noms[bonneK]}$, d'équation $${eq(m, p)}$.` };
  });

  def("qf-vrai-faux", () => vraiFaux4([
    ["Résoudre graphiquement $f(x) = 2$, c'est lire les abscisses des points de la courbe d'ordonnée $2$.", true, "on trace $y = 2$ et on lit les abscisses des intersections."],
    ["$f(x) > 0$ quand la courbe est au-dessus de l'axe des abscisses.", true, "les ordonnées des points sont alors positives."],
    ["La droite $y = -2x + 5$ a pour ordonnée à l'origine $5$.", true, "$p = 5$ dans $y = mx + p$."],
    ["La droite passant par $(1\\,;2)$ et $(3\\,;8)$ a pour coefficient directeur $3$.", true, "$\\dfrac{8 - 2}{3 - 1} = 3$."],
    ["Une droite de coefficient directeur négatif descend quand on la lit de gauche à droite.", true, "$y$ diminue quand $x$ augmente."],
    ["La droite $y = 3x - 1$ passe par le point $(2\\,;5)$.", true, "$3 \\times 2 - 1 = 5$."],
    ["Les intervalles d'un tableau de variations s'écrivent avec des abscisses.", true, "on lit les variations le long de l'axe horizontal."],
    ["$f(x) < 3$ se résout en lisant où la courbe est au-dessus de $y = 3$.", false, "il faut lire où elle est **en dessous**."],
    ["Une droite de coefficient directeur négatif monte quand on la lit de gauche à droite.", false, "elle descend."],
    ["La droite $y = 2x + 4$ coupe l'axe des ordonnées en $2$.", false, "elle le coupe en $4$, l'ordonnée à l'origine."],
    ["Le coefficient directeur de la droite passant par $A(0\\,;1)$ et $B(2\\,;7)$ est $\\dfrac{2}{6}$.", false, "$m = \\dfrac{7 - 1}{2 - 0} = 3$ : les ordonnées vont au numérateur."],
    ["Si la courbe de $f$ est au-dessus de l'axe des abscisses sur $[1\\,;4]$, alors $f$ est croissante sur $[1\\,;4]$.", false, "le signe et les variations sont deux choses différentes."],
    ["La droite $y = 5$ a pour coefficient directeur $5$.", false, "elle est horizontale : $m = 0$ et $p = 5$."]
  ], ["Graphiquement : au-dessus pour $>$, en dessous pour $<$.", "Pour une droite $y = mx + p$, $m$ est la pente et $p$ l'ordonnée à l'origine.", "Signe : position par rapport à l'axe des abscisses ; variations : la courbe monte ou descend."]));

  /* ---------- Chapitre 4 : automatismes, lire et résumer des données (préfixe qs) ---------- */
  const genStats = (types) => function gen() {
    const t = pick(types);
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
      if (!Number.isInteger(moy * 100)) return gen();
      return { enonce: `Voici une série de ${ctx} : $${L.join("$ ; $")}$. Calcule la moyenne.`, mode: "nombre", prefixe: "Moyenne :", attendu: moy,
        erreurs: [{ valeur: s, message: "Divise la somme par le nombre de valeurs." }, { valeur: s / (n - 1), message: `Il y a $${n}$ valeurs.` }],
        aides: ["Moyenne $= \\dfrac{\\text{somme des valeurs}}{\\text{nombre de valeurs}}$.", `Somme : $${s}$.`, `$\\dfrac{${s}}{${n}}$.`],
        solution: `Somme des $${n}$ valeurs : ${n > 5 ? `$${L.slice(0, 5).join(" + ")}$ $+ ${L.slice(5).join(" + ")} = ${s}$` : `$${L.join(" + ")} = ${s}$`}.\n\nMoyenne : $\\dfrac{${s}}{${n}} = ${nb(moy)}$.` };
    }
    const T = L.slice().sort((a, b) => a - b), med = n % 2 ? T[(n - 1) / 2] : (T[n / 2 - 1] + T[n / 2]) / 2;
    return { enonce: `Voici une série de ${ctx} : $${L.join("$ ; $")}$. Détermine la médiane.`, mode: "nombre", prefixe: "Médiane :", attendu: med,
      erreurs: [{ valeur: L[Math.floor(n / 2)], message: "Il faut d'abord **ranger** les valeurs dans l'ordre croissant." }, { valeur: +(L.reduce((a, v) => a + v, 0) / n).toFixed(2), message: "Ça, c'est (environ) la moyenne. La médiane partage la série rangée en deux moitiés." }],
      aides: ["Range les valeurs dans l'ordre croissant.", `Série rangée : $${T.join("$ ; $")}$.`, n % 2 ? `Il y a $${n}$ valeurs (impair) : la médiane est la valeur du milieu, la ${(n + 1) / 2}e.` : `Il y a $${n}$ valeurs (pair) : la médiane est la moyenne des deux valeurs du milieu (${n / 2}e et ${n / 2 + 1}e).`],
      solution: `Série rangée : $${T.join("$ ; $")}$. ${n % 2 ? `La valeur du milieu est $${med}$.` : `Les deux valeurs centrales sont $${T[n / 2 - 1]}$ et $${T[n / 2]}$ : médiane $\\dfrac{${T[n / 2 - 1]} + ${T[n / 2]}}{2} = ${nb(med)}$.`}` };
  };
  def("qs-barres", genStats(["barres"]));
  def("qs-moyenne", genStats(["moyenne"]));
  def("qs-mediane", genStats(["mediane"]));

  /* Figures du cours (chapitre 4) */
  FIGURES["qs-cours-barres"] = () => graph({ xmin: -0.2, xmax: 5.4, ymin: -1.8, ymax: 14, xstep: 1, ystep: 2, h: 240, xetiq: 100, bars: [{ x: 0.6, y: 6 }, { x: 1.6, y: 12 }, { x: 2.6, y: 9 }, { x: 3.6, y: 3 }, { x: 4.6, y: 10 }], marques: ["bus", "voiture", "à pied", "vélo", "scooter"].map((c, k) => ({ x: k + 0.6, y: -1.1, texte: c })), ylabel: "élèves", aria: "Diagramme en barres : bus 6, voiture 12, à pied 9, vélo 3, scooter 10" });

  /* Figures de statistiques : diagramme circulaire, diagramme en boîte, histogramme */
  const COULEURS = ["var(--lagon)", "var(--ylang)", "var(--faux)", "var(--encre)", "var(--courbe2)"];
  // Diagramme circulaire : parts (nombres positifs), noms, textes écrits dans la légende
  function circulaire(parts, noms, textes, aria) {
    const W = 320, H = 190, cx = 92, cy = 95, r = 78, tot = parts.reduce((s, v) => s + v, 0);
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="${aria || "Diagramme circulaire"}">`, a0 = -Math.PI / 2;
    parts.forEach((v, k) => {
      const a1 = a0 + (2 * Math.PI * v) / tot, grand = a1 - a0 > Math.PI ? 1 : 0;
      const p = (a) => `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
      s += `<path d="M${cx} ${cy} L${p(a0)} A${r} ${r} 0 ${grand} 1 ${p(a1)} Z" style="fill:${COULEURS[k % 5]};fill-opacity:${k === 3 ? 0.4 : 0.75};stroke:var(--surface);stroke-width:2"/>`;
      a0 = a1;
    });
    noms.forEach((n, k) => { const y = 30 + k * 30; s += `<rect x="186" y="${y - 11}" width="13" height="13" rx="2" style="fill:${COULEURS[k % 5]};fill-opacity:${k === 3 ? 0.4 : 0.75}"/><text class="g-label" x="205" y="${y}">${n}</text>${textes && textes[k] ? `<text class="g-label" x="205" y="${y + 14}" style="font-size:10px;font-weight:700">${textes[k]}</text>` : ""}`; });
    return s + `</svg>`;
  }
  // Diagrammes en boîte : B = [{ nom, v: [min, Q1, med, Q3, max] }], axe de a à b gradué de pas en pas
  function boites(B, a, b, pasG, unite) {
    const W = 320, g = B.length > 1 ? 52 : 18, d = 16, h = 34, H = 34 + B.length * 56;
    const X = (x) => +(g + ((x - a) * (W - g - d)) / (b - a)).toFixed(1), yA = H - 24;
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="${B.map((o) => `Diagramme en boîte${o.nom ? " " + o.nom : ""} : minimum ${nbS(o.v[0])}, premier quartile ${nbS(o.v[1])}, médiane ${nbS(o.v[2])}, troisième quartile ${nbS(o.v[3])}, maximum ${nbS(o.v[4])}`).join(" ; ")}">`;
    s += `<g class="g-axis"><line x1="${X(a)}" y1="${yA}" x2="${X(b) + 8}" y2="${yA}"/></g><g class="g-tick">`;
    for (let k = 0; a + k * pasG <= b + 1e-9; k++) { const x = a + k * pasG; s += `<line x1="${X(x)}" y1="${yA - (k % 2 ? 2 : 4)}" x2="${X(x)}" y2="${yA + (k % 2 ? 2 : 4)}" style="stroke:var(--encre)"/>${k % 2 ? "" : `<text x="${X(x)}" y="${yA + 15}" text-anchor="middle">${nbAxe(x)}</text>`}`; }
    s += `</g>${unite ? `<text class="g-label" x="${W - 4}" y="${yA - 8}" text-anchor="end" style="font-size:10px">${unite}</text>` : ""}`;
    B.forEach((o, k) => {
      const yc = 30 + k * 56, [m, q1, me, q3, M] = o.v.map(X);
      s += `<line x1="${m}" y1="${yc}" x2="${q1}" y2="${yc}" style="stroke:var(--encre);stroke-width:1.5"/><line x1="${q3}" y1="${yc}" x2="${M}" y2="${yc}" style="stroke:var(--encre);stroke-width:1.5"/>`;
      s += `<line x1="${m}" y1="${yc - 8}" x2="${m}" y2="${yc + 8}" style="stroke:var(--encre);stroke-width:1.5"/><line x1="${M}" y1="${yc - 8}" x2="${M}" y2="${yc + 8}" style="stroke:var(--encre);stroke-width:1.5"/>`;
      s += `<rect x="${q1}" y="${yc - h / 2}" width="${+(q3 - q1).toFixed(1)}" height="${h}" style="fill:${COULEURS[k]};fill-opacity:0.18;stroke:${COULEURS[k]};stroke-width:1.8"/><line x1="${me}" y1="${yc - h / 2}" x2="${me}" y2="${yc + h / 2}" style="stroke:var(--faux);stroke-width:2.4"/>`;
      if (o.nom) s += `<text class="g-label" x="4" y="${yc + 4}" style="font-weight:700">${o.nom}</text>`;
    });
    return s + `</svg>`;
  }
  // Quartiles d'une série rangée (définition du lycée) : Q1 = valeur de rang ⌈n/4⌉, Q3 = valeur de rang ⌈3n/4⌉
  const quartiles = (T) => { const n = T.length; return [T[Math.ceil(n / 4) - 1], n % 2 ? T[(n - 1) / 2] : (T[n / 2 - 1] + T[n / 2]) / 2, T[Math.ceil((3 * n) / 4) - 1]]; };
  const ordinal = (k) => (k === 1 ? "1re" : `${k}e`);

  def("qs-circulaire", () => {
    const C = pick([
      { pop: "élèves de Première", q: "leur moyen de transport", noms: ["bus", "à pied", "scooter", "voiture"] },
      { pop: "personnes interrogées", q: "leur boisson préférée", noms: ["jus", "eau", "soda", "lait"] },
      { pop: "touristes", q: "leur provenance", noms: ["Métropole", "La Réunion", "Madagascar", "autre"] },
      { pop: "déchets collectés", q: "leur type", noms: ["plastique", "verre", "papier", "métal"] }
    ]);
    const n = C.noms.length, P = [];
    for (let k = 0; k < n - 1; k++) P.push(pick([5, 10, 15, 20, 25, 30, 35, 40]));
    const reste = 100 - P.reduce((s, v) => s + v, 0);
    if (reste < 5) return GEN["qs-circulaire"]();
    P.push(reste);
    const t = pick(["effectif", "effectif", "angle", "pourcentage"]), k = rand(0, n - 1);
    if (t === "angle") {
      const ang = (P[k] * 360) / 100;
      return { enonce: `Ce diagramme circulaire donne la répartition de ${C.pop} selon ${C.q}. Quelle est la mesure, en degrés, de l'angle du secteur « ${C.noms[k]} » ?`, figure: circulaire(P, C.noms, P.map((v) => `${v} %`), `Diagramme circulaire : ${C.noms.map((m, i) => `${m} ${P[i]} %`).join(", ")}`), mode: "nombre", prefixe: "Angle :", attendu: ang, suffixe: "°",
        erreurs: [{ valeur: P[k], message: "Ça, c'est le pourcentage. Le disque entier fait $360°$ : on prend ce pourcentage de $360$." }, { valeur: arr(P[k] * 3.6 / 10, 6), message: "Le disque entier fait $360°$, pas $36°$." }],
        aides: ["Le disque entier ($100\\,\\%$) correspond à $360°$.", `Le secteur représente $${P[k]}\\,\\%$ du disque.`, `$\\dfrac{${P[k]}}{100} \\times 360$.`],
        solution: `$\\dfrac{${P[k]}}{100} \\times 360 = ${nb(ang)}$ : l'angle mesure $${nb(ang)}°$.` };
    }
    if (t === "pourcentage") {
      const ang = (P[k] * 360) / 100;
      return { enonce: `Dans le diagramme circulaire de ${C.pop} selon ${C.q}, le secteur « ${C.noms[k]} » a un angle de $${nb(ang)}°$. Quel pourcentage cela représente-t-il ?`, figure: circulaire(P, C.noms, null, `Diagramme circulaire : ${C.noms.join(", ")}`), mode: "nombre", prefixe: "Pourcentage :", attendu: P[k], suffixe: "%",
        erreurs: [{ valeur: ang, message: "Ça, c'est l'angle. Compare-le aux $360°$ du disque entier." }, { valeur: arr(ang / 360, 6), message: "Multiplie la proportion par $100$ pour avoir un pourcentage." }],
        aides: ["Le disque entier correspond à $360°$, soit $100\\,\\%$.", `Proportion : $\\dfrac{${nb(ang)}}{360}$.`, "Multiplie par $100$."],
        solution: `$\\dfrac{${nb(ang)}}{360} = ${nb(P[k] / 100)}$, soit $${P[k]}\\,\\%$.` };
    }
    const N = pick([200, 300, 400, 500, 600, 800, 1000, 1200, 1500, 2000, 2400]), eff = (N * P[k]) / 100;
    if (!Number.isInteger(eff)) return GEN["qs-circulaire"]();
    return { enonce: `On a interrogé $${nb(N)}$ ${C.pop} sur ${C.q}. Combien ont répondu « ${C.noms[k]} » ?`, figure: circulaire(P, C.noms, P.map((v) => `${v} %`), `Diagramme circulaire : ${C.noms.map((m, i) => `${m} ${P[i]} %`).join(", ")}`), mode: "nombre", prefixe: "Effectif :", attendu: eff,
      erreurs: [{ valeur: P[k], message: "Ça, c'est le pourcentage. On demande un effectif : applique-le aux $" + nb(N) + "$ personnes." }, { valeur: N - eff, message: "Ça, ce sont les autres réponses." }],
      aides: [`Le secteur « ${C.noms[k]} » représente $${P[k]}\\,\\%$ du total.`, `Prendre $${P[k]}\\,\\%$ de $${nb(N)}$, c'est multiplier par $${nb(P[k] / 100)}$.`, `$${nb(N)} \\times ${nb(P[k] / 100)}$.`],
      solution: `$${nb(N)} \\times \\dfrac{${P[k]}}{100} = ${nb(eff)}$.` };
  });

  // Série statistique aléatoire, rangée, avec ses quartiles
  function serieQ() {
    const n = rand(8, 15), base = pick([0, 5, 10]), L = Array.from({ length: n }, () => base + rand(1, 20));
    const T = L.slice().sort((a, b) => a - b);
    return { n, L, T, Q: quartiles(T) };
  }
  def("qs-quartiles", () => {
    const S = serieQ(), t = pick(["Q1", "Q3", "Q1", "Q3", "med"]), ctx = pick(["notes sur 20", "temps de trajet (en min)", "tailles de mangues (en cm)", "nombres de SMS envoyés dans la journée", "âges des membres d'un club"]);
    const [q1, me, q3] = S.Q, rq1 = Math.ceil(S.n / 4), rq3 = Math.ceil((3 * S.n) / 4);
    const att = t === "Q1" ? q1 : t === "Q3" ? q3 : me;
    const nom = t === "Q1" ? "le premier quartile $Q_1$" : t === "Q3" ? "le troisième quartile $Q_3$" : "la médiane";
    return { enonce: `Voici une série de $${S.n}$ ${ctx} : $${S.L.join("$ ; $")}$. Détermine ${nom}.`, mode: "nombre", prefixe: t === "Q1" ? "$Q_1 =$" : t === "Q3" ? "$Q_3 =$" : "Médiane :", attendu: att,
      erreurs: [{ valeur: t === "Q1" ? S.L[rq1 - 1] : t === "Q3" ? S.L[rq3 - 1] : S.L[Math.floor(S.n / 2)], message: "Il faut d'abord **ranger** la série dans l'ordre croissant." }, { valeur: t === "Q1" ? q3 : q1, message: t === "Q1" ? "Ça, c'est le troisième quartile." : "Ça, c'est le premier quartile." }, { valeur: t === "med" ? q1 : me, message: t === "med" ? "Ça, c'est le premier quartile." : "Ça, c'est la médiane." }],
      aides: ["Range les valeurs dans l'ordre croissant.", `Série rangée : $${S.T.join("$ ; $")}$.`, t === "Q1" ? `$\\dfrac{${S.n}}{4} = ${nb(S.n / 4)}$ : $Q_1$ est la valeur de rang $${rq1}$ (premier entier supérieur ou égal).` : t === "Q3" ? `$\\dfrac{3 \\times ${S.n}}{4} = ${nb((3 * S.n) / 4)}$ : $Q_3$ est la valeur de rang $${rq3}$ (premier entier supérieur ou égal).` : S.n % 2 ? `$${S.n}$ valeurs : la médiane est la ${ordinal((S.n + 1) / 2)} valeur.` : `$${S.n}$ valeurs : la médiane est la moyenne des ${ordinal(S.n / 2)} et ${ordinal(S.n / 2 + 1)} valeurs.`],
      solution: `Série rangée : $${S.T.join("$ ; $")}$.\n\n` + (t === "Q1" ? `$\\dfrac{${S.n}}{4} = ${nb(S.n / 4)}$, donc $Q_1$ est la ${ordinal(rq1)} valeur : $Q_1 = ${nb(q1)}$. Au moins un quart des valeurs sont inférieures ou égales à $${nb(q1)}$.` : t === "Q3" ? `$\\dfrac{3 \\times ${S.n}}{4} = ${nb((3 * S.n) / 4)}$, donc $Q_3$ est la ${ordinal(rq3)} valeur : $Q_3 = ${nb(q3)}$. Au moins trois quarts des valeurs sont inférieures ou égales à $${nb(q3)}$.` : S.n % 2 ? `La médiane est la ${ordinal((S.n + 1) / 2)} valeur : $${nb(me)}$.` : `La médiane est la moyenne des ${ordinal(S.n / 2)} et ${ordinal(S.n / 2 + 1)} valeurs : $\\dfrac{${S.T[S.n / 2 - 1]} + ${S.T[S.n / 2]}}{2} = ${nb(me)}$.`) };
  });

  def("qs-boite", () => {
    const pasG = pick([1, 2, 5, 10]), a = pick([0, 0, 10, 20]) * pasG;
    const v = [0, 0, 0, 0, 0].map(() => a + rand(1, 19) * pasG).sort((x, y) => x - y);
    if (new Set(v).size < 5) return GEN["qs-boite"]();
    const b = a + 20 * pasG, ctx = pick([["temps de trajet des élèves", "min"], ["notes obtenues au contrôle", ""], ["masses des colis", "kg"], ["prix des repas", "€"], ["tailles des plants de manioc", "cm"]]);
    const fig = boites([{ v }], a, b, pasG, ctx[1]);
    const t = pick(["lire", "lire", "EIQ", "etendue", "interpreter"]);
    const NOMS = ["le minimum", "le premier quartile $Q_1$", "la médiane", "le troisième quartile $Q_3$", "le maximum"];
    if (t === "lire") {
      const k = rand(0, 4);
      return { enonce: `Le diagramme en boîte résume les ${ctx[0]}. Lis ${NOMS[k]}.`, figure: fig, mode: "nombre", prefixe: "Valeur :", attendu: v[k], suffixe: ctx[1] || undefined,
        erreurs: [{ valeur: v[(k + 1) % 5], message: "Repère bien l'ordre : minimum, $Q_1$ (début de la boîte), médiane (trait dans la boîte), $Q_3$ (fin de la boîte), maximum." }, { valeur: v[(k + 4) % 5], message: "Ce n'est pas le bon trait : relis l'ordre des cinq valeurs." }],
        aides: ["Les moustaches vont du minimum au maximum ; la boîte va de $Q_1$ à $Q_3$ ; le trait dans la boîte est la médiane.", `Repère le trait correspondant à ${NOMS[k]}.`, `L'axe est gradué de $${nb(2 * pasG)}$ en $${nb(2 * pasG)}$ : il y a un petit trait au milieu de chaque intervalle.`],
        solution: `On lit : minimum $${nb(v[0])}$, $Q_1 = ${nb(v[1])}$, médiane $${nb(v[2])}$, $Q_3 = ${nb(v[3])}$, maximum $${nb(v[4])}$. Donc ${NOMS[k]} vaut $${nb(v[k])}$.` };
    }
    if (t === "EIQ" || t === "etendue") {
      const eiq = t === "EIQ", att = eiq ? v[3] - v[1] : v[4] - v[0];
      return { enonce: `Le diagramme en boîte résume les ${ctx[0]}. Calcule ${eiq ? "l'écart interquartile $Q_3 - Q_1$" : "l'étendue de la série"}.`, figure: fig, mode: "nombre", prefixe: eiq ? "$Q_3 - Q_1 =$" : "Étendue :", attendu: att,
        erreurs: [{ valeur: eiq ? v[4] - v[0] : v[3] - v[1], message: eiq ? "Ça, c'est l'étendue (maximum moins minimum). L'écart interquartile utilise les bords de la boîte." : "Ça, c'est l'écart interquartile. L'étendue utilise les bouts des moustaches." }, { valeur: eiq ? v[3] : v[4], message: "Il faut faire une **différence**." }],
        aides: [eiq ? "L'écart interquartile est la longueur de la boîte : $Q_3 - Q_1$." : "L'étendue est l'écart entre la plus grande et la plus petite valeur.", eiq ? `$Q_1 = ${nb(v[1])}$ et $Q_3 = ${nb(v[3])}$.` : `Minimum $${nb(v[0])}$, maximum $${nb(v[4])}$.`, "Fais la soustraction."],
        solution: eiq ? `$Q_3 - Q_1 = ${nb(v[3])} - ${nb(v[1])} = ${nb(att)}$ : la moitié centrale des valeurs tient dans un intervalle de longueur $${nb(att)}$.` : `Étendue : $${nb(v[4])} - ${nb(v[0])} = ${nb(att)}$.` };
    }
    const I = pick([
      [`au moins $25\\,\\%$ des valeurs sont inférieures ou égales à $${nb(v[1])}$`, "c'est la définition de $Q_1$"],
      [`au moins $50\\,\\%$ des valeurs sont supérieures ou égales à $${nb(v[2])}$`, "c'est le rôle de la médiane"],
      [`au moins $75\\,\\%$ des valeurs sont inférieures ou égales à $${nb(v[3])}$`, "c'est la définition de $Q_3$"],
      [`environ la moitié des valeurs sont comprises entre $${nb(v[1])}$ et $${nb(v[3])}$`, "la boîte contient la moitié centrale des valeurs"]
    ]);
    const faux = [`au moins $75\\,\\%$ des valeurs sont inférieures ou égales à $${nb(v[1])}$`, `la moyenne vaut $${nb(v[2])}$`, `toutes les valeurs sont comprises entre $${nb(v[1])}$ et $${nb(v[3])}$`, `au moins $50\\,\\%$ des valeurs sont égales à $${nb(v[2])}$`];
    const ch = choix4(I[0].charAt(0).toUpperCase() + I[0].slice(1) + ".", shuffle(faux).map((f) => f.charAt(0).toUpperCase() + f.slice(1) + "."));
    return { enonce: `Le diagramme en boîte résume les ${ctx[0]}. Quelle affirmation est juste ?`, figure: fig, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["$Q_1$ : au moins un quart des valeurs en dessous ou égales ; $Q_3$ : au moins trois quarts.", "La médiane partage la série en deux moitiés ; un diagramme en boîte ne donne pas la moyenne.", "Les moustaches contiennent aussi des valeurs : pas toutes dans la boîte."],
      solution: `${I[0].charAt(0).toUpperCase() + I[0].slice(1)} : ${I[1]}. Le diagramme en boîte ne donne pas la moyenne, et des valeurs se trouvent aussi en dehors de la boîte.` };
  });

  def("qs-comparer-boites", () => {
    const pasG = pick([1, 2, 5]), a = 0;
    const mk = () => [0, 0, 0, 0, 0].map(() => rand(1, 19) * pasG).sort((x, y) => x - y);
    const A = mk(), B = mk();
    if (new Set(A).size < 5 || new Set(B).size < 5 || A[2] === B[2] || A[3] - A[1] === B[3] - B[1] || A[4] - A[0] === B[4] - B[0]) return GEN["qs-comparer-boites"]();
    const C = pick([["deux classes", "Classe A", "Classe B", "notes"], ["deux magasins", "Mag. A", "Mag. B", "prix"], ["deux villages", "Vil. A", "Vil. B", "temps de trajet"]]);
    const fig = boites([{ nom: "A", v: A }, { nom: "B", v: B }], a, 20 * pasG, pasG, "");
    const q = pick(["mediane", "dispersion", "etendue"]);
    const gagne = q === "mediane" ? (A[2] > B[2] ? "A" : "B") : q === "dispersion" ? (A[3] - A[1] > B[3] - B[1] ? "A" : "B") : (A[4] - A[0] > B[4] - B[0] ? "A" : "B");
    const enonce = q === "mediane" ? "Quelle série a la plus grande médiane ?" : q === "dispersion" ? "Quelle série a le plus grand écart interquartile (la moitié centrale la plus dispersée) ?" : "Quelle série a la plus grande étendue ?";
    const ch = choix4(`la série ${gagne}`, [`la série ${gagne === "A" ? "B" : "A"}`, "les deux sont égales", "on ne peut pas savoir avec ces diagrammes"]);
    return { enonce: `Les diagrammes en boîte comparent les ${C[3]} de ${C[0]} (séries A et B). ${enonce}`, figure: fig, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [q === "mediane" ? "La médiane est le trait à l'intérieur de chaque boîte." : q === "dispersion" ? "L'écart interquartile est la longueur de la boîte." : "L'étendue est la longueur totale, d'un bout de moustache à l'autre.", `Série A : $${A.map(nb).join("$ ; $")}$.`, `Série B : $${B.map(nb).join("$ ; $")}$.`],
      solution: q === "mediane" ? `Médianes : $${nb(A[2])}$ pour A et $${nb(B[2])}$ pour B. C'est la série ${gagne}.` : q === "dispersion" ? `Écarts interquartiles : $${nb(A[3])} - ${nb(A[1])} = ${nb(A[3] - A[1])}$ pour A et $${nb(B[3])} - ${nb(B[1])} = ${nb(B[3] - B[1])}$ pour B. C'est la série ${gagne}.` : `Étendues : $${nb(A[4])} - ${nb(A[0])} = ${nb(A[4] - A[0])}$ pour A et $${nb(B[4])} - ${nb(B[0])} = ${nb(B[4] - B[0])}$ pour B. C'est la série ${gagne}.` };
  });

  def("qs-histogramme", () => {
    const w = pick([2, 5, 10]), d0 = pick([0, 10, 20]) * (w === 2 ? 1 : 1), n = rand(4, 6), u = pick([1, 2, 5]);
    const E = Array.from({ length: n }, () => rand(1, 12) * u), tot = E.reduce((s, v) => s + v, 0);
    const ctx = pick([["temps de trajet (en min)", "élèves"], ["âges des spectateurs (en années)", "spectateurs"], ["masses des sacs de riz (en kg)", "sacs"], ["durées d'appel (en min)", "appels"]]);
    const maxE = Math.max(...E), ys = pas(maxE);
    const fig = graph({ xmin: d0 - 0.6 * w, xmax: d0 + (n + 0.6) * w, ymin: -0.08 * maxE, ymax: maxE * 1.15, xstep: w, ystep: ys, xetiq: w, h: 240, rects: E.map((e, k) => ({ a: d0 + k * w, b: d0 + (k + 1) * w, h: e })), ylabel: "effectif", aria: `Histogramme : ${E.map((e, k) => `[${nbS(d0 + k * w)} ; ${nbS(d0 + (k + 1) * w)}[ : ${e}`).join(", ")}` });
    const k = rand(0, n - 1), cl = `[${nb(d0 + k * w)}\\,;${nb(d0 + (k + 1) * w)}[`, t = pick(["eff", "total", "pct", "moins"]);
    if (t === "eff") return { enonce: `L'histogramme donne la répartition des ${ctx[0]} (classes de même amplitude). Combien de ${ctx[1]} sont dans la classe $${cl}$ ?`, figure: fig, mode: "nombre", prefixe: "Effectif :", attendu: E[k],
      erreurs: [{ valeur: k + 1, message: "Lis la hauteur du rectangle sur l'axe vertical." }], aides: ["Repère le rectangle de la classe sur l'axe horizontal.", "Lis sa hauteur sur l'axe vertical.", `La graduation verticale va de $${nb(ys)}$ en $${nb(ys)}$.`], solution: `Le rectangle de la classe $${cl}$ monte jusqu'à $${E[k]}$ : $${E[k]}$ ${ctx[1]}.` };
    if (t === "total") return { enonce: `L'histogramme donne la répartition des ${ctx[0]}. Quel est l'effectif total ?`, figure: fig, mode: "nombre", prefixe: "Total :", attendu: tot,
      erreurs: [{ valeur: maxE, message: "On demande la somme de tous les effectifs." }, { valeur: n, message: "Ça, c'est le nombre de classes." }], aides: ["Lis l'effectif de chaque classe.", `Effectifs : $${E.join("$ ; $")}$.`, "Additionne-les."], solution: `$${E.join(" + ")} = ${tot}$.` };
    if (t === "moins") {
      const j = rand(1, n - 1), s = E.slice(0, j).reduce((x, y) => x + y, 0), lim = d0 + j * w;
      return { enonce: `L'histogramme donne la répartition des ${ctx[0]}. Combien de ${ctx[1]} ont une valeur strictement inférieure à $${nb(lim)}$ ?`, figure: fig, mode: "nombre", prefixe: "Effectif :", attendu: s,
        erreurs: [{ valeur: E[j - 1], message: "Il faut prendre **toutes** les classes situées avant $" + nb(lim) + "$." }, { valeur: tot - s, message: "Ça, ce sont ceux qui ont une valeur supérieure ou égale." }], aides: [`Les classes concernées sont celles qui se terminent avant $${nb(lim)}$ (ou en $${nb(lim)}$, borne exclue).`, `Il y en a $${j}$.`, `Additionne leurs effectifs : $${E.slice(0, j).join("$ ; $")}$.`], solution: `$${E.slice(0, j).join(" + ")} = ${s}$ ${ctx[1]}.` };
    }
    if (!Number.isInteger(arr((E[k] / tot) * 1000, 6))) return GEN["qs-histogramme"]();
    const p = arr((E[k] / tot) * 100, 6);
    return { enonce: `L'histogramme donne la répartition des ${ctx[0]}. Quel pourcentage des ${ctx[1]} est dans la classe $${cl}$ ?`, figure: fig, mode: "nombre", prefixe: "Pourcentage :", attendu: p, suffixe: "%",
      erreurs: [{ valeur: E[k], message: "Ça, c'est l'effectif : divise-le par l'effectif total." }, { valeur: arr(E[k] / tot, 6), message: "Multiplie par $100$ pour avoir un pourcentage." }], aides: ["Fréquence $= \\dfrac{\\text{effectif de la classe}}{\\text{effectif total}}$.", `Effectif de la classe : $${E[k]}$ ; total : $${E.join(" + ")} = ${tot}$.`, `$\\dfrac{${E[k]}}{${tot}} \\times 100$.`], solution: `$\\dfrac{${E[k]}}{${tot}} = ${nb(E[k] / tot)}$, soit $${nb(p)}\\,\\%$.` };
  });

  def("qs-effectifs", () => {
    const vals = shuffle([0, 1, 2, 3, 4, 5, 6]).slice(0, rand(3, 5)).sort((a, b) => a - b);
    const eff = vals.map(() => rand(1, 9)), N = eff.reduce((s, v) => s + v, 0), S = vals.reduce((s, v, k) => s + v * eff[k], 0);
    const ctx = pick([["nombre de frères et sœurs", "élèves"], ["nombre de buts marqués par match", "matchs"], ["nombre de livres lus en un mois", "élèves"], ["nombre de pannes par semaine", "semaines"]]);
    const tab = { lignes: [["\\text{Valeur}", ...vals.map(String)], ["\\text{Effectif}", ...eff.map(String)]] };
    const t = pick(["moyenne", "moyenne", "frequence", "total"]);
    if (t === "moyenne") {
      const m = S / N, exact = estDecimal(m * 100) && Number.isInteger(arr(m * 100, 6)), att = exact ? m : Math.round(m * 100) / 100;
      // produits écrits en deux formules au plus (passage à la ligne possible sur un écran de 360 px)
      const P = vals.map((v, k) => `${eff[k]} \\times ${v}`), sommeProduits = P.length > 3 ? `$${P.slice(0, 3).join(" + ")}$ $+ ${P.slice(3).join(" + ")}$` : `$${P.join(" + ")}$`;
      return { enonce: `Le tableau donne le ${ctx[0]} pour $${N}$ ${ctx[1]}. Calcule la moyenne de la série${exact ? "" : " (arrondie au centième)"}.`, tableau: tab, mode: "nombre", prefixe: "Moyenne :", attendu: att, tolerance: exact ? undefined : 0.005,
        erreurs: [{ valeur: arr(vals.reduce((s, v) => s + v, 0) / vals.length, 6), message: "Chaque valeur compte autant de fois que son effectif : c'est une moyenne **pondérée**." }, { valeur: S, message: `Divise la somme par l'effectif total $${N}$.` }, { valeur: arr(S / vals.length, 6), message: `On divise par l'effectif total $${N}$, pas par le nombre de valeurs différentes.` }],
        aides: ["Moyenne pondérée : $\\dfrac{n_1 x_1 + n_2 x_2 + \\dots}{N}$.", `Somme des produits : ${sommeProduits} $= ${S}$.`, `Effectif total $N = ${N}$.`],
        solution: `Somme des produits : ${sommeProduits} $= ${S}$.\n\nMoyenne : $\\bar{x} = \\dfrac{${S}}{${N}} ${exact ? "=" : "\\approx"} ${nb(att)}$.` };
    }
    if (t === "total") return { enonce: `Le tableau donne le ${ctx[0]} pour des ${ctx[1]}. Quel est l'effectif total ?`, tableau: tab, mode: "nombre", prefixe: "$N =$", attendu: N,
      erreurs: [{ valeur: vals.length, message: "Ça, c'est le nombre de valeurs différentes." }, { valeur: S, message: "On additionne les effectifs, pas les produits de chaque valeur par son effectif." }], aides: ["L'effectif total est la somme des effectifs.", `Effectifs : $${eff.join("$ ; $")}$.`, "Additionne-les."], solution: `$N = ${eff.join(" + ")} = ${N}$.` };
    const k = rand(0, vals.length - 1), f = (eff[k] / N) * 100, ok = Number.isInteger(arr(f * 10, 6));
    const att = ok ? arr(f, 6) : Math.round(f * 10) / 10;
    return { enonce: `Le tableau donne le ${ctx[0]} pour $${N}$ ${ctx[1]}. Quelle est la fréquence, en pourcentage, de la valeur $${vals[k]}$${ok ? "" : " (arrondie au dixième)"} ?`, tableau: tab, mode: "nombre", prefixe: "Fréquence :", attendu: att, suffixe: "%", tolerance: ok ? undefined : 0.05,
      erreurs: [{ valeur: eff[k], message: "Ça, c'est l'effectif : divise-le par l'effectif total." }, { valeur: arr(eff[k] / N, 6), message: "Multiplie par $100$ pour avoir un pourcentage." }], aides: ["Fréquence $= \\dfrac{\\text{effectif}}{\\text{effectif total}}$.", `Effectif de la valeur $${vals[k]}$ : $${eff[k]}$ ; total : $${N}$.`, `$\\dfrac{${eff[k]}}{${N}} \\times 100$.`], solution: `$\\dfrac{${eff[k]}}{${N}} \\times 100 ${ok ? "=" : "\\approx"} ${nb(att)}$ : la fréquence est ${ok ? "de" : "d'environ"} $${nb(att)}\\,\\%$.` };
  });

  // Courbe de données chronologiques (graphique → données)
  def("qs-courbe", () => {
    const n = 6, a0 = pick([2018, 2019, 2020]), u = pick([10, 20, 50, 100]), v0 = rand(5, 15);
    const V = [v0]; for (let k = 1; k < n; k++) V.push(Math.max(1, V[k - 1] + rand(-3, 4)));
    const Y = V.map((v) => v * u), maxY = Math.max(...Y);
    const ctx = pick([["le nombre de naissances à la maternité", "naissances"], ["le nombre d'abonnés d'un club", "abonnés"], ["la production de bananes (en tonnes)", "tonnes"], ["le nombre de passagers de la barge (en milliers)", "milliers"]]);
    const fig = graph({ xmin: -0.6, xmax: n - 0.3, ymin: -0.08 * maxY, ymax: maxY * 1.15, xstep: 1, ystep: pas(maxY), h: 250, curves: [{ f: (x) => { const k = Math.min(n - 2, Math.max(0, Math.floor(x))); return Y[k] + (Y[k + 1] - Y[k]) * (x - k); }, a: 0, b: n - 1, closed: false }], points: Y.map((y, k) => ({ x: k, y })), marques: Y.map((_, k) => ({ x: k, y: -0.06 * maxY, texte: "’" + String(a0 + k).slice(2) })), xetiq: 100, aria: `Courbe : ${Y.map((y, k) => `${a0 + k} : ${y}`).join(", ")}` });
    const t = pick(["lire", "lire", "evolution", "max"]), k = rand(0, n - 1);
    if (t === "max") { const km = Y.indexOf(maxY); const ch = choix4(String(a0 + km), Y.map((_, i) => String(a0 + i)).filter((_, i) => i !== km && Y[i] !== maxY)); return { enonce: `La courbe donne ${ctx[0]} de ${a0} à ${a0 + n - 1} (’${String(a0).slice(2)} pour ${a0}). En quelle année la valeur est-elle la plus grande ?`, figure: fig, mode: "choix", choix: ch.choix, attendu: ch.attendu, aides: ["Cherche le point le plus haut.", "Lis son abscisse : l'année.", `Il est à la hauteur $${maxY}$.`], solution: `Le point le plus haut ($${maxY}$) correspond à ${a0 + km}.` }; }
    if (t === "evolution") {
      const i = rand(0, n - 2), j = rand(i + 1, n - 1), tx = ((Y[j] - Y[i]) / Y[i]) * 100, att = Math.round(tx * 10) / 10, exact = Math.abs(att - tx) < 1e-9;
      return { enonce: `La courbe donne ${ctx[0]} de ${a0} à ${a0 + n - 1}. Lis les valeurs de ${a0 + i} et de ${a0 + j}, puis calcule le taux d'évolution entre ces deux années, en pourcentage${exact ? "" : " (arrondi au dixième)"}.`, figure: fig, mode: "nombre", prefixe: "Taux :", attendu: att, suffixe: "%", tolerance: exact ? undefined : 0.05,
        erreurs: [{ valeur: Y[j] - Y[i], message: "Ça, c'est la variation absolue. Divise-la par la valeur de départ." }, { valeur: Math.round(((Y[j] - Y[i]) / Y[j]) * 1000) / 10, message: "On divise par la valeur de **départ**." }], aides: [`En ${a0 + i} : $${Y[i]}$ ; en ${a0 + j} : $${Y[j]}$.`, "Taux $= \\dfrac{V_1 - V_0}{V_0}$.", `$\\dfrac{${Y[j]} - ${Y[i]}}{${Y[i]}} \\times 100$.`],
        solution: `$\\dfrac{${Y[j]} - ${Y[i]}}{${Y[i]}} \\times 100 ${exact ? "=" : "\\approx"} ${nb(att)}$ : taux d'évolution de $${att > 0 ? "+" : ""}${nb(att)}\\,\\%$.` };
    }
    return { enonce: `La courbe donne ${ctx[0]} de ${a0} à ${a0 + n - 1} (’${String(a0).slice(2)} pour ${a0}). Lis la valeur de ${a0 + k}.`, figure: fig, mode: "nombre", prefixe: "Valeur :", attendu: Y[k],
      erreurs: [{ valeur: Y[Math.min(k + 1, n - 1)], message: "Ce n'est pas la bonne année : repère bien l'abscisse." }, { valeur: k, message: "Lis la hauteur du point sur l'axe vertical." }], aides: [`Repère l'année ${a0 + k} sur l'axe horizontal.`, "Monte jusqu'au point de la courbe, puis lis l'ordonnée.", `La graduation verticale va de $${nb(pas(maxY))}$ en $${nb(pas(maxY))}$.`], solution: `Le point de ${a0 + k} est à la hauteur $${Y[k]}$.` };
  });

  def("qs-vrai-faux", () => vraiFaux4([
    ["La médiane de $3$ ; $8$ ; $5$ ; $12$ ; $7$ est $7$.", true, "rangée : $3$ ; $5$ ; $7$ ; $8$ ; $12$, le milieu est $7$."],
    ["Dans un diagramme circulaire, $25\\,\\%$ correspond à un angle de $90°$.", true, "$0{,}25 \\times 360 = 90$."],
    ["L'écart interquartile est la longueur de la boîte d'un diagramme en boîte.", true, "c'est $Q_3 - Q_1$."],
    ["Au moins $75\\,\\%$ des valeurs sont inférieures ou égales à $Q_3$.", true, "c'est la définition du troisième quartile."],
    ["Pour une série donnée par un tableau d'effectifs, la moyenne est pondérée par les effectifs.", true, "chaque valeur compte autant de fois que son effectif."],
    ["L'étendue est la différence entre la plus grande et la plus petite valeur.", true, "c'est sa définition."],
    ["Dans un histogramme à classes de même amplitude, la hauteur d'un rectangle donne l'effectif de la classe.", true, "on lit l'effectif sur l'axe vertical."],
    ["La moyenne de $4$ ; $6$ ; $11$ est $6$.", false, "$\\dfrac{21}{3} = 7$ ; $6$ est la médiane."],
    ["Un diagramme en boîte permet de lire la moyenne.", false, "il donne le minimum, les quartiles, la médiane et le maximum, pas la moyenne."],
    ["Toutes les valeurs d'une série sont dans la boîte de son diagramme en boîte.", false, "seule la moitié centrale environ est dans la boîte."],
    ["Dans un diagramme circulaire, un angle de $36°$ représente $36\\,\\%$.", false, "$\\dfrac{36}{360} = 10\\,\\%$."],
    ["La médiane d'une série de $10$ valeurs est la $5$e valeur rangée.", false, "c'est la moyenne des $5$e et $6$e valeurs."],
    ["Si on ajoute une valeur très grande à une série, la médiane change beaucoup.", false, "la médiane bouge peu : c'est la moyenne qui est sensible aux valeurs extrêmes."]
  ], ["Médiane et quartiles se lisent sur la série **rangée**.", "Diagramme circulaire : $360°$ pour $100\\,\\%$.", "Un diagramme en boîte montre min, $Q_1$, médiane, $Q_3$, max."]));

  /* Figures du cours (chapitre 4) */
  FIGURES["qs-cours-circulaire"] = () => circulaire([40, 25, 20, 15], ["bus", "à pied", "scooter", "voiture"], ["40 % → 144°", "25 % → 90°", "20 % → 72°", "15 % → 54°"], "Diagramme circulaire : bus 40 % (144°), à pied 25 % (90°), scooter 20 % (72°), voiture 15 % (54°)");
  FIGURES["qs-cours-boite"] = () => boites([{ v: [4, 9, 12, 15, 22] }], 0, 24, 1, "min");
  FIGURES["qs-cours-comparer"] = () => boites([{ nom: "A", v: [6, 10, 12, 14, 18] }, { nom: "B", v: [2, 7, 13, 17, 20] }], 0, 20, 1, "");

  /* ---------- Chapitre 5 : tableaux croisés, deux caractères qualitatifs (préfixe qx) ---------- */
  // Population croisée selon deux caractères : lignes (2 modalités) × colonnes (2 ou 3 modalités)
  const CROISES2 = [
    { pop: "élèves de Première", c1: "le sexe", c2: "le moyen de transport", lig: ["filles", "garçons"], col: ["bus", "à pied", "scooter"], parmi: (l) => `parmi les ${l}`, qui: (c) => `qui viennent ${c === "bus" ? "en bus" : c === "scooter" ? "en scooter" : "à pied"}` },
    { pop: "habitants interrogés", c1: "le lieu de vie", c2: "l'avis sur le nouveau marché", lig: ["Grande-Terre", "Petite-Terre"], col: ["favorables", "sans avis", "opposés"], parmi: (l) => `parmi les habitants de ${l}`, qui: (c) => `${c === "sans avis" ? "qui sont sans avis" : "qui sont " + c}` },
    { pop: "salariés d'une entreprise", c1: "le contrat", c2: "le sexe", lig: ["temps plein", "temps partiel"], col: ["femmes", "hommes"], parmi: (l) => `parmi les salariés à ${l}`, qui: (c) => `qui sont des ${c}` },
    { pop: "patients d'un dispensaire", c1: "la vaccination", c2: "la maladie", lig: ["vaccinés", "non vaccinés"], col: ["malades", "non malades"], parmi: (l) => `parmi les patients ${l}`, qui: (c) => `qui sont ${c}` },
    { pop: "spectateurs d'un festival", c1: "l'âge", c2: "le jour de venue", lig: ["moins de 25 ans", "25 ans et plus"], col: ["vendredi", "samedi", "dimanche"], parmi: (l) => `parmi les spectateurs de ${l}`, qui: (c) => `venus le ${c}` },
    { pop: "clients d'un restaurant", c1: "le moment", c2: "le plat choisi", lig: ["midi", "soir"], col: ["poisson", "poulet", "végétarien"], parmi: (l) => `parmi les clients du ${l}`, qui: (c) => `qui ont choisi ${c === "végétarien" ? "le plat végétarien" : "le " + c}` }
  ];
  const txt = (s) => `\\text{${s}}`;
  function croise2(arrondir) {
    const C = pick(CROISES2), M = C.lig.map(() => C.col.map(() => rand(2, 30) * (arrondir ? 5 : 1)));
    const L = M.map((r) => r.reduce((s, v) => s + v, 0)), K = C.col.map((_, j) => M.reduce((s, r) => s + r[j], 0)), N = L.reduce((s, v) => s + v, 0);
    const lignes = (cache) => [["", ...C.col.map(txt), txt("Total")], ...C.lig.map((l, i) => [txt(l), ...M[i].map((v, j) => (cache && cache(i, j) ? "?" : String(v))), cache && cache(i, "T") ? "?" : String(L[i])]), [txt("Total"), ...K.map((v, j) => (cache && cache("T", j) ? "?" : String(v))), cache && cache("T", "T") ? "?" : String(N)]];
    return { C, M, L, K, N, lignes };
  }
  // Pourcentage : valeur exacte si elle a au plus une décimale, sinon arrondie au dixième (annoncé)
  const pctArr = (num, den) => { const v = (num / den) * 100, ok = Number.isInteger(arr(v * 10, 6)); return { v: ok ? arr(v, 6) : Math.round(v * 10) / 10, ok, tol: ok ? undefined : 0.05 }; };

  def("qx-lire", () => {
    const T = croise2(), C = T.C, i = rand(0, C.lig.length - 1), j = rand(0, C.col.length - 1), t = pick(["case", "case", "ligne", "colonne"]);
    const att = t === "case" ? T.M[i][j] : t === "ligne" ? T.L[i] : T.K[j];
    const quoi = t === "case" ? `à l'intersection de la ligne « ${C.lig[i]} » et de la colonne « ${C.col[j]} »` : t === "ligne" ? `au bout de la ligne « ${C.lig[i]} », dans la colonne « Total »` : `en bas de la colonne « ${C.col[j]} », dans la ligne « Total »`;
    return { enonce: `Le tableau croisé répartit $${T.N}$ ${C.pop} selon ${C.c1} et ${C.c2}. Combien y a-t-il ${t === "case" ? `d'individus « ${C.lig[i]} » et « ${C.col[j]} »` : t === "ligne" ? `d'individus « ${C.lig[i]} » en tout` : `d'individus « ${C.col[j]} » en tout`} ?`, tableau: { lignes: T.lignes() }, mode: "nombre", prefixe: "Effectif :", attendu: att,
      erreurs: [{ valeur: t === "case" ? T.L[i] : T.M[i][j], message: t === "case" ? "Ça, c'est le total de la ligne. On veut la case au croisement de la ligne et de la colonne." : "Ça, c'est une seule case : on veut le total." }, { valeur: t === "case" ? T.K[j] : T.N, message: t === "case" ? "Ça, c'est le total de la colonne." : "Ça, c'est l'effectif total." }],
      aides: [t === "case" ? "Une case du tableau compte les individus qui ont **à la fois** les deux modalités." : "Les totaux sont dans la dernière ligne et la dernière colonne.", t === "case" ? `Ligne « ${C.lig[i]} », colonne « ${C.col[j]} ».` : t === "ligne" ? `Dernière case de la ligne « ${C.lig[i]} ».` : `Dernière case de la colonne « ${C.col[j]} ».`, `On lit $${att}$.`],
      solution: `On lit $${att}$ ${quoi}.` };
  });

  def("qx-completer", () => {
    const T = croise2(), C = T.C, nc = C.col.length, i = rand(0, 1), j = rand(0, nc - 1);
    const t = pick(["case", "case", "total-ligne", "total-col"]);
    let cache, att, aides, solution, erreurs;
    if (t === "case") {
      cache = (a, b) => a === i && b === j;
      att = T.M[i][j];
      erreurs = [{ valeur: T.L[i] - T.M[i].filter((_, k) => k !== j)[0], message: "Il faut retirer **toutes** les autres cases de la ligne." }, { valeur: T.L[i] + T.M[i].filter((_, k) => k !== j).reduce((s, v) => s + v, 0), message: "Pour retrouver une case, on **soustrait** les autres cases du total." }];
      const autres = T.M[i].filter((_, k) => k !== j);
      aides = [`Utilise le total de la ligne « ${C.lig[i]} » : $${T.L[i]}$.`, `Les autres cases de cette ligne valent $${autres.join("$ et $")}$.`, `$${T.L[i]} - ${autres.join(" - ")}$.`];
      solution = `Sur la ligne « ${C.lig[i]} » : $${T.L[i]} - ${autres.join(" - ")} = ${att}$. (On peut aussi passer par la colonne : $${T.K[j]} - ${T.M[1 - i][j]} = ${att}$.)`;
    } else if (t === "total-ligne") {
      cache = (a, b) => a === i && b === "T";
      att = T.L[i];
      erreurs = [{ valeur: T.N, message: "Ça, c'est l'effectif total, pas celui de la ligne." }, { valeur: T.M[i][0] + T.M[i][1] === att ? NaN : T.M[i][0] + T.M[i][1], message: "Il faut additionner **toutes** les cases de la ligne." }];
      aides = ["Le total d'une ligne est la somme de ses cases.", `Cases de la ligne « ${C.lig[i]} » : $${T.M[i].join("$ ; $")}$.`, `$${T.M[i].join(" + ")}$.`];
      solution = `$${T.M[i].join(" + ")} = ${att}$. (Ou : $${T.N} - ${T.L[1 - i]} = ${att}$.)`;
    } else {
      cache = (a, b) => a === "T" && b === j;
      att = T.K[j];
      erreurs = [{ valeur: T.N, message: "Ça, c'est l'effectif total, pas celui de la colonne." }, { valeur: T.L[0], message: "Ça, c'est le total d'une ligne : on veut celui de la colonne." }];
      aides = ["Le total d'une colonne est la somme de ses cases.", `Cases de la colonne « ${C.col[j]} » : $${T.M[0][j]}$ et $${T.M[1][j]}$.`, `$${T.M[0][j]} + ${T.M[1][j]}$.`];
      solution = `$${T.M[0][j]} + ${T.M[1][j]} = ${att}$.`;
    }
    return { enonce: `Le tableau croisé répartit des ${C.pop} selon ${C.c1} et ${C.c2}. Quel nombre faut-il écrire à la place du « ? » ?`, tableau: { lignes: T.lignes(cache) }, mode: "nombre", prefixe: "? =", attendu: att,
      erreurs, aides, solution };
  });

  def("qx-frequence", () => {
    const T = croise2(), C = T.C, i = rand(0, 1), j = rand(0, C.col.length - 1), t = pick(["case", "case", "marge-col", "marge-lig"]);
    const num = t === "case" ? T.M[i][j] : t === "marge-col" ? T.K[j] : T.L[i], P = pctArr(num, T.N);
    const quoi = t === "case" ? `des individus à la fois « ${C.lig[i]} » et « ${C.col[j]} »` : t === "marge-col" ? `des individus « ${C.col[j]} »` : `des individus « ${C.lig[i]} »`;
    return { enonce: `Le tableau croisé répartit $${T.N}$ ${C.pop} selon ${C.c1} et ${C.c2}. Quelle est la fréquence ${quoi}, par rapport à l'effectif total, en pourcentage${P.ok ? "" : " (arrondie au dixième)"} ?`, tableau: { lignes: T.lignes() }, mode: "nombre", prefixe: "Fréquence :", attendu: P.v, suffixe: "%", tolerance: P.tol,
      erreurs: [{ valeur: num, message: "Ça, c'est l'effectif. La fréquence est l'effectif divisé par l'effectif total." }, { valeur: arr(num / T.N, 6), message: "Multiplie par $100$ pour l'écrire en pourcentage." }, ...(t === "case" ? [{ valeur: pctArr(num, T.L[i]).v, message: "Ici on compare à l'effectif **total**, pas au total de la ligne." }] : [])],
      aides: ["Fréquence $= \\dfrac{\\text{effectif}}{\\text{effectif total}}$.", `Effectif : $${num}$ ; effectif total : $${T.N}$.`, `$\\dfrac{${num}}{${T.N}} \\times 100$.`],
      solution: `$\\dfrac{${num}}{${T.N}} \\times 100 ${P.ok ? "=" : "\\approx"} ${nb(P.v)}$ : ${P.ok ? "" : "environ "}$${nb(P.v)}\\,\\%$ des ${C.pop}.` };
  });

  def("qx-frequence-cond", () => {
    const T = croise2(), C = T.C, i = rand(0, 1), j = rand(0, C.col.length - 1), sens = pick(["lig", "lig", "col"]);
    const den = sens === "lig" ? T.L[i] : T.K[j], P = pctArr(T.M[i][j], den);
    const q = sens === "lig" ? `${C.parmi(C.lig[i])}, quel pourcentage correspond à « ${C.col[j]} »` : `Parmi les individus « ${C.col[j]} », quel pourcentage correspond à « ${C.lig[i]} »`;
    return { enonce: `Le tableau croisé répartit $${T.N}$ ${C.pop} selon ${C.c1} et ${C.c2}. ${q.charAt(0).toUpperCase() + q.slice(1)}${P.ok ? "" : " (arrondi au dixième)"} ?`, tableau: { lignes: T.lignes() }, mode: "nombre", prefixe: "Pourcentage :", attendu: P.v, suffixe: "%", tolerance: P.tol,
      erreurs: [{ valeur: pctArr(T.M[i][j], T.N).v, message: "« Parmi… » : on se limite à une sous-population, donc on ne divise pas par l'effectif total." }, { valeur: pctArr(T.M[i][j], sens === "lig" ? T.K[j] : T.L[i]).v, message: sens === "lig" ? `On se place parmi les « ${C.lig[i]} » : on divise par le total de cette **ligne**.` : `On se place parmi les « ${C.col[j]} » : on divise par le total de cette **colonne**.` }, { valeur: T.M[i][j], message: "Ça, c'est l'effectif : divise-le par l'effectif de la sous-population." }],
      aides: ["« Parmi » indique la sous-population de référence : c'est elle qui va au dénominateur.", sens === "lig" ? `Sous-population : les « ${C.lig[i]} », total de la ligne $${T.L[i]}$.` : `Sous-population : les « ${C.col[j]} », total de la colonne $${T.K[j]}$.`, `$\\dfrac{${T.M[i][j]}}{${den}} \\times 100$.`],
      solution: `On se restreint ${sens === "lig" ? `à la ligne « ${C.lig[i]} »` : `à la colonne « ${C.col[j]} »`} : $\\dfrac{${T.M[i][j]}}{${den}} \\times 100 ${P.ok ? "=" : "\\approx"} ${nb(P.v)}$, soit ${P.ok ? "" : "environ "}$${nb(P.v)}\\,\\%$. C'est une **fréquence conditionnelle**.` };
  });

  def("qx-comparer", () => {
    const T = croise2(), C = T.C, j = rand(0, C.col.length - 1);
    const f0 = T.M[0][j] / T.L[0], f1 = T.M[1][j] / T.L[1];
    if (Math.abs(f0 - f1) < 0.03) return GEN["qx-comparer"]();
    // on cherche un piège : le groupe qui a le plus grand effectif n'a pas la plus grande proportion
    if ((T.M[0][j] > T.M[1][j]) === (f0 > f1) && Math.random() < 0.6) return GEN["qx-comparer"]();
    const g = f0 > f1 ? 0 : 1, p0 = Math.round(f0 * 1000) / 10, p1 = Math.round(f1 * 1000) / 10;
    const bonne = `${C.lig[g].charAt(0).toUpperCase() + C.lig[g].slice(1)} : $${nb(g ? p1 : p0)}\\,\\%$ contre $${nb(g ? p0 : p1)}\\,\\%$ environ`;
    const ch = choix4(bonne, [`${C.lig[1 - g].charAt(0).toUpperCase() + C.lig[1 - g].slice(1)} : $${nb(g ? p0 : p1)}\\,\\%$ contre $${nb(g ? p1 : p0)}\\,\\%$ environ`, `${C.lig[T.M[0][j] > T.M[1][j] ? 0 : 1].charAt(0).toUpperCase() + C.lig[T.M[0][j] > T.M[1][j] ? 0 : 1].slice(1)}, car l'effectif est plus grand : $${Math.max(T.M[0][j], T.M[1][j])}$ contre $${Math.min(T.M[0][j], T.M[1][j])}$`, "Les deux groupes sont dans la même proportion"]);
    return { enonce: `Le tableau croisé répartit $${T.N}$ ${C.pop} selon ${C.c1} et ${C.c2}. Dans quel groupe (ligne) la proportion d'individus « ${C.col[j]} » est-elle la plus grande ?`, tableau: { lignes: T.lignes() }, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Les deux groupes n'ont pas le même effectif : on compare des **proportions**, pas des effectifs.", `« ${C.lig[0]} » : $\\dfrac{${T.M[0][j]}}{${T.L[0]}}$ ; « ${C.lig[1]} » : $\\dfrac{${T.M[1][j]}}{${T.L[1]}}$.`, "Calcule ces deux fréquences conditionnelles et compare-les."],
      solution: `« ${C.lig[0]} » : $\\dfrac{${T.M[0][j]}}{${T.L[0]}} \\approx ${nb(p0)}\\,\\%$ ; « ${C.lig[1]} » : $\\dfrac{${T.M[1][j]}}{${T.L[1]}} \\approx ${nb(p1)}\\,\\%$. La proportion est plus grande pour « ${C.lig[g]} ».${(T.M[0][j] > T.M[1][j]) !== (f0 > f1) ? " Attention : ce n'est pas le groupe qui a le plus grand effectif !" : ""}` };
  });

  // Diagramme en barres groupées : effectifs du tableau croisé
  function barresGroupees(T) {
    const C = T.C, nc = C.col.length, maxV = Math.max(...T.M.flat()), ys = pas(maxV);
    const largeur = 0.36, rects = [], marques = [];
    C.col.forEach((c, j) => { [0, 1].forEach((i) => rects.push({ a: j + 0.12 + i * largeur, b: j + 0.12 + (i + 1) * largeur, h: T.M[i][j] })); marques.push({ x: j + 0.12 + largeur, y: -maxV * 0.09, texte: c }); });
    let svg = graph({ xmin: -0.15, xmax: nc + 0.1, ymin: -maxV * 0.15, ymax: maxV * 1.28, xstep: 100, ystep: ys, h: 260, xetiq: 100, rects, marques, aria: `Diagramme en barres groupées : ${C.col.map((c, j) => `${c} : ${C.lig[0]} ${T.M[0][j]}, ${C.lig[1]} ${T.M[1][j]}`).join(" ; ")}` });
    // la seconde série de barres est hachurée en couleur de la légende
    let n = -1; svg = svg.replace(/<rect class="g-rect"/g, (m) => { n++; return n % 2 ? m + ' style="fill:var(--ylang);fill-opacity:0.55"' : m; });
    const leg = `<rect x="60" y="6" width="12" height="12" class="g-rect"/><text class="g-label" x="76" y="16" style="font-size:10px">${C.lig[0]}</text><rect x="190" y="6" width="12" height="12" class="g-rect" style="fill:var(--ylang);fill-opacity:0.55"/><text class="g-label" x="206" y="16" style="font-size:10px">${C.lig[1]}</text>`;
    return svg.replace(/<\/svg>$/, leg + "</svg>");
  }
  def("qx-diagramme", () => {
    const T = croise2(), C = T.C, j = rand(0, C.col.length - 1), i = rand(0, 1), t = pick(["lire", "total", "cond"]);
    const fig = barresGroupees(T);
    if (t === "lire") return { enonce: `Le diagramme représente la répartition des ${C.pop} selon ${C.c1} et ${C.c2}. Combien y a-t-il d'individus « ${C.lig[i]} » et « ${C.col[j]} » ?`, figure: fig, mode: "nombre", prefixe: "Effectif :", attendu: T.M[i][j],
      erreurs: [{ valeur: T.M[1 - i][j], message: "Regarde la légende : ce n'est pas la bonne couleur de barre." }, { valeur: T.K[j], message: "On veut une seule barre, pas les deux." }],
      aides: ["Chaque groupe de barres correspond à une modalité écrite sous l'axe ; la couleur indique l'autre caractère (légende).", `Groupe « ${C.col[j]} », barre « ${C.lig[i]} ».`, "Lis sa hauteur sur l'axe vertical."], solution: `La barre « ${C.lig[i]} » du groupe « ${C.col[j]} » monte à $${T.M[i][j]}$.` };
    if (t === "total") return { enonce: `Le diagramme représente la répartition des ${C.pop} selon ${C.c1} et ${C.c2}. Combien y a-t-il d'individus « ${C.col[j]} » au total ?`, figure: fig, mode: "nombre", prefixe: "Effectif :", attendu: T.K[j],
      erreurs: [{ valeur: T.M[0][j], message: "Il faut additionner les deux barres du groupe." }, { valeur: T.M[1][j], message: "Il faut additionner les deux barres du groupe." }],
      aides: [`Repère le groupe de barres « ${C.col[j]} ».`, `Ses deux barres : $${T.M[0][j]}$ et $${T.M[1][j]}$.`, "Additionne-les."], solution: `$${T.M[0][j]} + ${T.M[1][j]} = ${T.K[j]}$.` };
    const P = pctArr(T.M[i][j], T.K[j]);
    return { enonce: `Le diagramme représente la répartition des ${C.pop} selon ${C.c1} et ${C.c2}. Parmi les individus « ${C.col[j]} », quel pourcentage est « ${C.lig[i]} »${P.ok ? "" : " (arrondi au dixième)"} ?`, figure: fig, mode: "nombre", prefixe: "Pourcentage :", attendu: P.v, suffixe: "%", tolerance: P.tol,
      erreurs: [{ valeur: T.M[i][j], message: "Ça, c'est l'effectif : divise-le par le total du groupe." }, { valeur: pctArr(T.M[i][j], T.N).v, message: "« Parmi » : on divise par l'effectif du groupe, pas par l'effectif total." }],
      aides: [`Effectifs du groupe « ${C.col[j]} » : $${T.M[0][j]}$ et $${T.M[1][j]}$, soit $${T.K[j]}$ en tout.`, `Barre « ${C.lig[i]} » : $${T.M[i][j]}$.`, `$\\dfrac{${T.M[i][j]}}{${T.K[j]}} \\times 100$.`],
      solution: `$\\dfrac{${T.M[i][j]}}{${T.K[j]}} \\times 100 ${P.ok ? "=" : "\\approx"} ${nb(P.v)}$ : ${P.ok ? "" : "environ "}$${nb(P.v)}\\,\\%$.` };
  });

  def("qx-tableur", () => {
    const T = croise2(), C = T.C, nc = C.col.length, L = ["B", "C", "D", "E"], der = L[nc - 1], tot = L[nc], r = rand(2, 3), t = pick(["ligne", "colonne", "freq", "cond"]);
    const tab = { lignes: [["", "A", ...L.slice(0, nc + 1)], ["1", "", ...C.col.map(txt), txt("Total")], ["2", txt(C.lig[0]), ...T.M[0].map(String), "?"], ["3", txt(C.lig[1]), ...T.M[1].map(String), "?"], ["4", txt("Total"), ...C.col.map(() => "?"), "?"]] };
    let bonne, faux, quoi, why;
    if (t === "ligne") { quoi = `le total de la ligne ${r} (cellule ${tot}${r})`; bonne = `=SOMME(B${r}:${der}${r})`; faux = [`=SOMME(B2:B4)`, `=B${r}*${der}${r}`, `=SOMME(B${r}:${tot}${r})`]; why = `on additionne les cellules de B${r} à ${der}${r}, sur la même ligne (pas la cellule ${tot}${r} elle-même)`; }
    else if (t === "colonne") { quoi = "le total de la colonne B (cellule B4)"; bonne = "=SOMME(B2:B3)"; faux = ["=SOMME(B2:" + der + "2)", "=B2*B3", "=SOMME(B2:B4)"]; why = "on additionne B2 et B3, dans la même colonne (B4 ne doit pas s'additionner lui-même)"; }
    else if (t === "freq") { quoi = "la fréquence de la case B2 par rapport à l'effectif total"; bonne = `=B2/${tot}4`; faux = [`=B2/${tot}2`, `=B2/B4`, `=${tot}4/B2`]; why = `l'effectif total est dans la cellule ${tot}4`; }
    else { quoi = `la fréquence de « ${C.col[0]} » parmi les « ${C.lig[0]} »`; bonne = `=B2/${tot}2`; faux = [`=B2/${tot}4`, `=B2/B4`, `=${tot}2/B2`]; why = `parmi les « ${C.lig[0]} », la référence est le total de la ligne 2, dans la cellule ${tot}2`; }
    const ch = choix4(`$\\texttt{${bonne}}$`, faux.map((f) => `$\\texttt{${f}}$`));
    return { enonce: `Dans un tableur, on a recopié le tableau croisé des ${C.pop} (les « ? » sont à calculer). Quelle formule donne ${quoi} ?`, tableau: tab, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Une formule de tableur commence par « = ». $\\texttt{SOMME(B2:B3)}$ additionne les cellules de B2 à B3.", "Une fréquence s'obtient en divisant un effectif par l'effectif de référence.", `Repère la cellule de référence : ${t === "freq" ? `${tot}4` : t === "cond" ? `${tot}2` : t === "ligne" ? `les cellules B${r} à ${der}${r}` : "les cellules B2 et B3"}.`],
      solution: `La bonne formule est $\\texttt{${bonne}}$ : ${why}.` };
  });

  def("qx-vrai-faux", () => vraiFaux4([
    ["Dans un tableau croisé, la case en bas à droite donne l'effectif total.", true, "c'est la somme de toutes les cases."],
    ["La somme des totaux des lignes est égale à l'effectif total.", true, "chaque individu est compté une fois dans une ligne."],
    ["« Parmi les filles, $40\\,\\%$ viennent en bus » est une fréquence conditionnelle.", true, "on se restreint à la sous-population des filles."],
    ["Pour comparer deux groupes d'effectifs différents, on compare des proportions plutôt que des effectifs.", true, "un grand groupe a souvent plus d'individus dans chaque case, sans être plus concerné."],
    ["« Parmi les filles, la part de celles qui viennent en bus » se calcule en divisant par le total de la ligne des filles.", true, "le dénominateur est l'effectif de la sous-population."],
    ["Dans un tableur, $\\texttt{=SOMME(B2:B5)}$ additionne les cellules de B2 à B5.", true, "c'est la syntaxe de la fonction SOMME."],
    ["Une fréquence conditionnelle se calcule toujours en divisant par l'effectif total.", false, "on divise par l'effectif de la sous-population (« parmi… »)."],
    ["« $30\\,\\%$ des élèves sont des filles qui viennent en bus » et « $30\\,\\%$ des filles viennent en bus » disent la même chose.", false, "la première rapporte à tous les élèves, la seconde aux filles seulement."],
    ["Si $45$ garçons et $30$ filles viennent en bus, les garçons viennent plus souvent en bus que les filles.", false, "on ne peut conclure qu'en comparant les proportions, avec les effectifs de chaque groupe."],
    ["Dans un tableau croisé, une case compte les individus qui ont l'une **ou** l'autre des deux modalités.", false, "une case compte ceux qui ont l'une **et** l'autre."],
    ["Dans un tableur, la formule $\\texttt{B2+C2}$ sans le signe « = » calcule la somme.", false, "une formule commence toujours par « = »."]
  ], ["Une case : « et » ; une marge (total) : une seule modalité.", "« Parmi… » : le dénominateur est l'effectif de la sous-population.", "Comparer des groupes : comparer des proportions."]));

  // Tableau croisé dessiné (figure du cours) : L = lignes de textes, la première ligne et la première colonne en gras
  function tableauSVG(L, aria) {
    const W = 320, n = L[0].length, c0 = 76, cw = (W - 2 - c0) / (n - 1), h = 28, H = L.length * h + 2;
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="${aria}"><g class="g-axis">`;
    for (let i = 0; i <= L.length; i++) s += `<line x1="1" y1="${1 + i * h}" x2="${W - 1}" y2="${1 + i * h}"/>`;
    for (let j = 0; j <= n; j++) { const x = j === 0 ? 1 : 1 + c0 + (j - 1) * cw; s += `<line x1="${+x.toFixed(1)}" y1="1" x2="${+x.toFixed(1)}" y2="${H - 1}"/>`; }
    s += `</g>`;
    L.forEach((r, i) => r.forEach((t, j) => { const x = j === 0 ? 1 + c0 / 2 : 1 + c0 + (j - 0.5) * cw; s += `<text class="g-label" x="${+x.toFixed(1)}" y="${1 + i * h + 19}" text-anchor="middle" style="${i === 0 || j === 0 || i === L.length - 1 || j === n - 1 ? "font-weight:700;" : ""}font-size:11px">${t}</text>`; }));
    return s + `</svg>`;
  }

  /* Figures du cours (chapitre 5) */
  FIGURES["qx-cours-tableau"] = () => tableauSVG([["", "bus", "à pied", "scooter", "Total"], ["filles", "48", "30", "12", "90"], ["garçons", "36", "24", "30", "90"], ["Total", "84", "54", "42", "180"]], "Tableau croisé de 180 élèves : filles 48 en bus, 30 à pied, 12 en scooter, 90 en tout ; garçons 36 en bus, 24 à pied, 30 en scooter, 90 en tout ; totaux 84, 54, 42");
  FIGURES["qx-cours-barres"] = () => barresGroupees({ C: CROISES2[0], M: [[48, 30, 12], [36, 24, 30]] });

  /* ---------- Chapitre 6 : deux caractères quantitatifs, nuage et ajustement affine (préfixe qn) ---------- */
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

  def("qn-point-moyen", () => {
    const S = serie2v(), q = pick(["x", "y", "y"]);
    if (!Number.isInteger(S.mx * 100) || !Number.isInteger(S.my * 100)) return GEN["qn-point-moyen"]();
    const att = q === "x" ? S.mx : S.my, L = q === "x" ? S.xs : S.ys;
    return { enonce: `Le tableau donne le ${S.C.nom}. Calcule ${q === "x" ? "l'abscisse $\\bar{x}$" : "l'ordonnée $\\bar{y}$"} du point moyen $G$ du nuage.`, tableau: tab2v(S), mode: "nombre", prefixe: q === "x" ? "$\\bar{x} =$" : "$\\bar{y} =$", attendu: att,
      erreurs: [{ valeur: L.reduce((t, v) => t + v, 0), message: `Divise la somme par le nombre de points, $${L.length}$.` }, { valeur: q === "x" ? S.my : S.mx, message: q === "x" ? "Ça, c'est $\\bar{y}$." : "Ça, c'est $\\bar{x}$." }],
      aides: [`Le point moyen $G(\\bar{x}\\,;\\bar{y})$ a pour coordonnées les moyennes des $x$ et des $y$.`, `On additionne les $${L.length}$ valeurs : $${L.map(nb).join("$ + $")}$.`, `La somme vaut $${nb(L.reduce((t, v) => t + v, 0))}$.`],
      solution: `Somme des $${L.length}$ valeurs : $${L.map(nb).join("$ + $")}$ $= ${nb(L.reduce((t, v) => t + v, 0))}$. Donc ${q === "x" ? "$\\bar{x}$" : "$\\bar{y}$"} $= \\dfrac{${nb(L.reduce((t, v) => t + v, 0))}}{${L.length}} = ${nb(att)}$. Le point moyen est $G(${nb(S.mx)}\\,;${nb(S.my)})$.` };
  });

  def("qn-nuage", () => {
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

  def("qn-ajustement", () => {
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

  def("qn-droite-g", () => {
    const S = serie2v();
    if (!Number.isInteger(S.mx * 100) || !Number.isInteger(S.my * 100)) return GEN["qn-droite-g"]();
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

  def("qn-mayer", () => {
    const S = serie2v(6), x1 = moyenne(S.xs.slice(0, 3)), y1 = moyenne(S.ys.slice(0, 3)), x2 = moyenne(S.xs.slice(3)), y2 = moyenne(S.ys.slice(3));
    if (![x1, y1, x2, y2].every((v) => Number.isInteger(v * 100))) return GEN["qn-mayer"]();
    const m = (y2 - y1) / (x2 - x1);
    if (!Number.isInteger(m * 100)) return GEN["qn-mayer"]();
    const q = pick(["g1", "pente", "pente"]);
    if (q === "g1") { const quoi = pick(["x", "y"]); return { enonce: `Méthode de Mayer : on partage le nuage en deux groupes de $3$ points (les $3$ premiers, les $3$ derniers). Calcule ${quoi === "x" ? "l'abscisse" : "l'ordonnée"} du point moyen $G_1$ du premier groupe.`, tableau: tab2v(S), mode: "nombre", prefixe: quoi === "x" ? "$x_{G_1} =$" : "$y_{G_1} =$", attendu: quoi === "x" ? x1 : y1, erreurs: [{ valeur: quoi === "x" ? S.mx : S.my, message: "Ça, c'est la moyenne de tout le nuage : on ne prend que les $3$ premiers points." }], aides: ["$G_1$ est le point moyen des $3$ premiers points.", `Moyenne de $${(quoi === "x" ? S.xs : S.ys).slice(0, 3).map(nb).join("$, $")}$.`, "Somme divisée par $3$."], solution: `$${quoi === "x" ? "x" : "y"}_{G_1} = \\dfrac{${(quoi === "x" ? S.xs : S.ys).slice(0, 3).map(nb).join(" + ")}}{3} = ${nb(quoi === "x" ? x1 : y1)}$.` }; }
    return { enonce: `Méthode de Mayer : les points moyens des deux moitiés du nuage sont $G_1(${nb(x1)}\\,;${nb(y1)})$ et $G_2(${nb(x2)}\\,;${nb(y2)})$. Quel est le coefficient directeur de la droite de Mayer $(G_1G_2)$ ?`, mode: "nombre", prefixe: "$m =$", attendu: m,
      erreurs: [{ valeur: y2 - y1, message: "Divise par la différence des abscisses." }, { valeur: (x2 - x1) / (y2 - y1), message: "Les ordonnées au numérateur : $\\dfrac{y_2 - y_1}{x_2 - x_1}$." }],
      aides: ["$m = \\dfrac{y_{G_2} - y_{G_1}}{x_{G_2} - x_{G_1}}$.", `$\\dfrac{${nb(y2)} - ${nb(y1)}}{${nb(x2)} - ${nb(x1)}}$.`, `$\\dfrac{${nb(y2 - y1)}}{${nb(x2 - x1)}}$.`],
      solution: `$m = \\dfrac{${nb(y2)} - ${nb(y1)}}{${nb(x2)} - ${nb(x1)}} = \\dfrac{${nb(y2 - y1)}}{${nb(x2 - x1)}} = ${nb(m)}$. La droite de Mayer passe aussi par le point moyen $G$ de tout le nuage.` };
  });

  def("qn-moindres-carres", () => {
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

  def("qn-critique", () => vraiFaux4([
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

  /* Figures du cours (chapitre 6) */
  FIGURES["qn-cours-nuage"] = () => nuage([1, 2, 3, 4, 5, 6], [32, 36, 37, 42, 44, 49], { xlabel: "rang", ylabel: "milliers", ystep: 5, curves: [{ f: (x) => 3.3 * x + 28.67, a: 0.5, b: 6.5, closed: false }], points: [1, 2, 3, 4, 5, 6].map((x, k) => ({ x, y: [32, 36, 37, 42, 44, 49][k] })).concat([{ x: 3.5, y: 40, label: "G(3,5 ; 40)" }]), aria: "Nuage de 6 points presque alignés, point moyen G(3,5 ; 40) et droite d'ajustement" });
  FIGURES["qn-cours-ecarts"] = () => {
    const xs = [1, 2, 3, 4], ys = [5, 6, 10, 11], f = (x) => 2.2 * x + 2.5;
    return graphePlus({ xmin: -0.3, xmax: 5, ymin: -0.6, ymax: 13, xstep: 1, ystep: 1, yetiq: 2, h: 260, curves: [{ f, a: 0.3, b: 4.7, closed: false }], points: xs.map((x, k) => ({ x, y: ys[k] })), aria: "Quatre points et une droite ; les écarts verticaux entre chaque point et la droite sont tracés en pointillés" }, (X, Y) => xs.map((x, k) => `<line x1="${X(x)}" y1="${Y(ys[k])}" x2="${X(x)}" y2="${Y(f(x))}" style="stroke:var(--faux);stroke-width:1.6;stroke-dasharray:3 3"/>`).join(""));
  };
  FIGURES["qn-cours-mayer"] = () => nuage([1, 2, 3, 4, 5, 6], [4, 7, 7, 11, 12, 15], { xlabel: "x", ylabel: "y", points: [1, 2, 3, 4, 5, 6].map((x, k) => ({ x, y: [4, 7, 7, 11, 12, 15][k] })).concat([{ x: 2, y: 6, label: "G₁" }, { x: 5, y: 38 / 3, label: "G₂" }]), curves: [{ f: (x) => 6 + (20 / 9) * (x - 2), a: 0.5, b: 6.5, closed: false }], aria: "Méthode de Mayer : G1 point moyen des 3 premiers points, G2 des 3 derniers, droite (G1G2)" });

  /* ---------- Chapitre 7 : probabilités conditionnelles et indépendance (préfixe qp) ---------- */
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

  def("qp-tableau", () => {
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
    ["l'élève suive la spécialité SES", "il mange à la cantine", "l'élève suit la spécialité SES", "il mange à la cantine", "S", "C"],
    ["le colis soit envoyé en express", "il arrive en retard", "le colis est envoyé en express", "il arrive en retard", "E", "R"],
    ["le touriste vienne de La Réunion", "il loge à Mamoudzou", "le touriste vient de La Réunion", "il loge à Mamoudzou", "R", "M"]
  ];
  def("qp-distinguer", () => {
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

  def("qp-arbre", () => {
    const D = arbreDonnees(), ctx = pick(CTX_ARBRE), t = pick(["completer", "inter", "inter", "lire"]);
    if (ctx.txt(D).includes("un jour sur cent")) return GEN["qp-arbre"]();
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

  def("qp-totales", () => {
    const D = arbreDonnees(), ctx = pick(CTX_ARBRE);
    if (ctx.txt(D).includes("un jour sur cent")) return GEN["qp-totales"]();
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

  def("qp-independance", () => {
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
      if (indep) { const u = rand(2, 6), v = rand(2, 6); a = u * k; b = u * m; c = v * k; d = v * m; } else { a = rand(5, 25); b = rand(5, 25); c = rand(5, 25); d = rand(5, 25); if (a * d === b * c) return GEN["qp-independance"](); }
      const N = a + b + c + d, pBA = a / (a + b), pB = (a + c) / N;
      const bonne = indep ? `oui, car $P_A(B) = P(B) = ${frac(a + c, N)}$` : `non, car $P_A(B) = ${frac(a, a + b)}$ et $P(B) = ${frac(a + c, N)}$ sont différentes`;
      const ch = choix4(bonne, [indep ? `non, car $P(A) \\neq P(B)$` : `oui, car $P_A(B) = P(B)$`, "oui, car $A$ et $B$ n'ont aucun élément commun", "on ne peut pas savoir avec un tableau"]);
      return { enonce: `On choisit un individu au hasard dans la population décrite par ce tableau. Les événements $A$ et $B$ sont-ils indépendants ?`, tableau: { lignes: [["", "B", "\\overline{B}", "Total"], ["A", a, b, a + b], ["\\overline{A}", c, d, c + d], ["Total", a + c, b + d, N]] }, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Calcule $P_A(B)$ (parmi les $A$) et $P(B)$ (sur tout le monde).", `$P_A(B) = \\dfrac{${a}}{${a + b}}$ et $P(B) = \\dfrac{${a + c}}{${N}}$.`, "Indépendants si et seulement si ces deux probabilités sont égales."],
        solution: `$P_A(B) = \\dfrac{${a}}{${a + b}} = ${frac(a, a + b)}$ et $P(B) = \\dfrac{${a + c}}{${N}} = ${frac(a + c, N)}$. ${indep ? "Elles sont égales : $A$ et $B$ sont indépendants." : "Elles sont différentes : $A$ et $B$ ne sont pas indépendants."}` };
    }
    const pA = pick([0.2, 0.3, 0.4, 0.5, 0.6]), pB = pick([0.2, 0.25, 0.4, 0.5, 0.75]);
    const indep = pick([true, false]), pAB = indep ? arr(pA * pB, 6) : arr(pA * pB + pick([-0.04, -0.02, 0.02, 0.05]), 6);
    if (pAB <= 0) return GEN["qp-independance"]();
    const bonne = indep ? `oui : $P(A) \\times P(B) = ${pTex(pA * pB)} = P(A \\cap B)$` : `non : $P(A) \\times P(B) = ${pTex(pA * pB)} \\neq P(A \\cap B)$`;
    const ch = choix4(bonne, [indep ? `non : $P(A) + P(B) \\neq P(A \\cap B)$` : `oui : $P(A \\cap B) \\neq 0$`, `oui : $P(A) \\neq P(B)$`, `non : $P(A \\cap B) \\neq 0$`]);
    return { enonce: `On a $P(A) = ${pTex(pA)}$, $P(B) = ${pTex(pB)}$ et $P(A \\cap B) = ${pTex(pAB)}$. Les événements $A$ et $B$ sont-ils indépendants ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["$A$ et $B$ sont indépendants si et seulement si $P(A \\cap B) = P(A) \\times P(B)$.", `$P(A) \\times P(B) = ${pTex(pA)} \\times ${pTex(pB)} = ${pTex(pA * pB)}$.`, `Compare avec $P(A \\cap B) = ${pTex(pAB)}$.`],
      solution: `$P(A) \\times P(B) = ${pTex(pA * pB)}$ ${indep ? "est égal à" : "est différent de"} $P(A \\cap B) = ${pTex(pAB)}$ : ${indep ? "les événements sont indépendants" : "les événements ne sont pas indépendants"}. (Ou : $P_A(B) = \\dfrac{${pTex(pAB)}}{${pTex(pA)}} = ${pTex(pAB / pA)}$, à comparer avec $P(B) = ${pTex(pB)}$.)` };
  });

  def("qp-vrai-faux", () => vraiFaux4([
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

  /* Figures du cours (chapitre 7) */
  FIGURES["qp-cours-arbre"] = () => arbre({ n1: [["M", "0,1"], ["M̄", "0,9"]], n2: [[["T", "0,95"], ["T̄", "0,05"]], [["T", "0,02"], ["T̄", "0,98"]]], aria: "Arbre : M avec 0,1 puis T avec 0,95 ; M barre avec 0,9 puis T avec 0,02" });
  FIGURES["qp-cours-totales"] = () => arbre({ n1: [["A", "0,3"], ["Ā", "0,7"]], n2: [[["D", "0,1"], ["D̄", "0,9"]], [["D", "0,05"], ["D̄", "0,95"]]], aria: "Arbre : machine A 0,3 puis défaut 0,1 ; machine B 0,7 puis défaut 0,05 ; P(D) = 0,03 + 0,035 = 0,065" });

  /* ---------- Chapitre 8 : répétition d'épreuves de Bernoulli (préfixe qb) ---------- */
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

  def("qb-reconnaitre", () => {
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

  def("qb-chemin", () => {
    const E = pick(EPREUVES), p = E.p(), n = rand(2, 4), L = E.lettre;
    if (E.frac) return GEN["qb-chemin"]();
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

  def("qb-k-succes", () => {
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

  def("qb-contexte", () => {
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

  def("qb-vrai-faux", () => vraiFaux4([
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
  ["qb-chemin", "qb-k-succes"].forEach((n) => { const g = GEN[n]; GEN[n] = (i) => millieme(g(i)); });

  /* Figures du cours (chapitre 8) */
  FIGURES["qb-cours-arbre2"] = () => arbreN(2, 0.8, "M");
  FIGURES["qb-cours-arbre3"] = () => arbreN(3, 0.6, "S");

  /* ---------- Suites : outils communs aux chapitres 9 et 12 (préfixe qu) ---------- */
  // Suites explicites simples : { tex (en n), f }
  function suiteExplicite() {
    const t = pick(["affine", "affine", "carre", "quotient", "puissance"]);
    if (t === "affine") { const a = nz2(-6, 9), b = rand(-9, 9); return { tex: aff(a, b, "n"), f: (n) => a * n + b, type: t }; }
    if (t === "carre") { const b = rand(-6, 6), c = rand(-5, 5); return { tex: poly([1, b, c], "n"), f: (n) => n * n + b * n + c, type: t }; }
    if (t === "quotient") { const a = rand(1, 9), b = rand(1, 4); return { tex: `\\dfrac{${a}}{n + ${b}}`, f: (n) => a / (n + b), type: t, a, b }; }
    const q = pick([2, 3, 0.5]), k = pick([1, 2, 5]); return { tex: `${k === 1 ? "" : nb(k) + " \\times "}${nb(q)}^n`, f: (n) => k * q ** n, type: t };
  }
  const un = (n) => `u(${n})`;

  def("qu-termes-explicite", () => {
    const S = suiteExplicite(), n = S.type === "puissance" ? rand(0, 5) : rand(0, 8);
    const vx = S.f(n), v = arr(vx);
    if (!Number.isInteger(v * 100) && S.type !== "quotient") return GEN["qu-termes-explicite"]();
    const fr2 = !Number.isInteger(arr(vx * 10000, 6));
    const nom = pick(["u", "u", "v"]);
    return { enonce: `La suite $(${nom}(n))$ est définie pour tout entier $n \\geqslant 0$ par $${nom}(n) = ${S.tex}$. Calcule $${nom}(${n})$${fr2 ? " (fraction)" : ""}.`, mode: "nombre", prefixe: `$${nom}(${n}) =$`, attendu: fr2 ? vx : v,
      erreurs: [{ valeur: arr(S.f(n + 1)), message: `Tu as calculé $${nom}(${n + 1})$ : remplace $n$ par $${n}$, pas par $${n + 1}$.` }, { valeur: arr(S.f(n - 1)), message: `Tu as calculé $${nom}(${n - 1})$.` }, ...(fr2 ? approx(v) : [])],
      aides: [`Une formule explicite : on remplace $n$ par $${n}$ directement.`, `$${nom}(${n}) = ${S.tex.replace(/n/g, `(${n})`).replace(/\(\((\d+)\)\)/g, "($1)")}$.`, "Calcule en respectant les priorités (puissances, puis produits, puis sommes)."],
      solution: `$${nom}(${n}) = ${S.tex.replace(/n/g, `${n}`)} = ${S.type === "quotient" ? frac(S.a, n + S.b) : nb(v)}$.` };
  });

  const gen_qu_termes_recurrence = (types) => function gen() {
    const t = pick(types);
    const u0 = t === "mul" ? pick([1, 2, 3, 4, 5, 8, 10, 20, 50, 100]) : rand(-5, 9), n = rand(2, 4);
    let rel, f;
    if (t === "add") { const b = nz2(-7, 9); rel = `u(n) ${plus(b)}`; f = (u) => u + b; }
    else if (t === "mul") { const q = pick([2, 3, 1.5, 0.5, 1.1, 0.8, 1.2]); rel = `${nb(q)} \\times u(n)`; f = (u) => q * u; }
    else if (t === "carre") { rel = `u(n)^2 - ${rand(1, 5)}`; const c = +rel.match(/- (\d+)/)[1]; f = (u) => u * u - c; }
    else { const a = pick([2, 3, -1, 0.5]), b = nz2(-6, 6); rel = `${nb(a)} \\times u(n) ${plus(b)}`; f = (u) => a * u + b; }
    const termes = [u0]; for (let k = 0; k < n; k++) termes.push(arr(f(termes[k])));
    const u00 = t === "carre" ? rand(-2, 2) : u0;
    if (t === "carre") { termes.length = 0; termes.push(u00); for (let k = 0; k < n; k++) termes.push(arr(f(termes[k]))); }
    if (Math.abs(termes[n]) > 5000 || !Number.isInteger(termes[n] * 100)) return gen();
    const depart = pick([0, 0, 1]);
    const noms = termes.map((_, k) => k + depart);
    return { enonce: `La suite $(u(n))$ est définie par $u(${depart}) = ${nb(termes[0])}$ et, pour tout entier $n \\geqslant ${depart}$, $u(n + 1) = ${rel}$. Calcule $u(${n + depart})$.`, mode: "nombre", prefixe: `$u(${n + depart}) =$`, attendu: termes[n],
      erreurs: [{ valeur: termes[n - 1], message: `Tu t'es arrêté à $u(${n - 1 + depart})$ : il faut encore une étape.` }, { valeur: arr(f(termes[n])), message: `Tu es allé une étape trop loin : c'est $u(${n + 1 + depart})$.` }, { valeur: arr(f(n + depart)), message: "Une suite récurrente : on applique la relation au **terme précédent**, pas à $n$." }],
      aides: ["Par récurrence : chaque terme se calcule à partir du précédent.", `$u(${1 + depart}) = ${rel.replace(/u\(n\)/g, `${pr(termes[0])}`)} = ${nb(termes[1])}$.`, `Continue : $u(${2 + depart}) = ${nb(termes[2])}$${n > 2 ? `, $u(${3 + depart}) = ${nb(termes[3])}$` : ""}${n > 3 ? ", …" : ""}`],
      solution: termes.slice(1).map((v, k) => `$u(${noms[k + 1]}) = ${rel.replace(/u\(n\)/g, `${pr(termes[k])}`)} = ${nb(v)}$`).join("\n\n") + `\n\nDonc $u(${n + depart}) = ${nb(termes[n])}$.` };
  };
  def("qu-termes-recurrence", gen_qu_termes_recurrence(["add", "mul", "affine", "affine", "carre"]));
  def("qa-recurrence", gen_qu_termes_recurrence(["add"]));
  def("qg-recurrence", gen_qu_termes_recurrence(["mul"]));

  def("qu-modeliser", () => {
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
    if (!Number.isInteger(v * 100)) return GEN["qu-modeliser"]();
    return { enonce: `${S.ctx(a, b)} Calcule $u(${n})$.`, mode: "nombre", prefixe: `$u(${n}) =$`, attendu: v,
      erreurs: [{ valeur: arr(S.val(a, b, n - 1)), message: `C'est $u(${n - 1})$ : compte bien $${n}$ étapes depuis $u(0)$.` }, { valeur: arr(S.val(a, b, n + 1)), message: `C'est $u(${n + 1})$ : une étape de trop.` }],
      aides: [`Commence par $u(0) = ${nb(a)}$ et $u(1) = ${nb(arr(S.val(a, b, 1)))}$.`, S.exp(a, b) + ".", `Formule : $${S.bonne(a, b)}$, avec $n = ${n}$.`],
      solution: `${S.exp(a, b).charAt(0).toUpperCase() + S.exp(a, b).slice(1)}, donc $${S.bonne(a, b)}$ et $u(${n}) = ${S.bonne(a, b).replace("u(n) = ", "").replace(/n/g, String(n))} = ${nb(v)}$.` };
  });

  def("qu-variations", () => {
    const t = pick(["diff", "diff", "nature", "nature", "calcul"]);
    if (t === "calcul") {
      const S = suiteExplicite(), n = rand(0, 5), d = arr(S.f(n + 1) - S.f(n));
      if (!Number.isInteger(d * 100)) return GEN["qu-variations"]();
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

  def("qu-graphique", () => {
    const S = pick([
      { tex: (a, b) => aff(a, b, "n"), f: (a, b) => (n) => a * n + b, a: () => pick([1, 2, 3, -1, -2]), b: () => rand(0, 6), nature: "linéaire (points alignés)" },
      { tex: (a, b) => `${a} \\times ${nb(b)}^n`, f: (a, b) => (n) => a * b ** n, a: () => pick([1, 2]), b: () => pick([1.5, 2]), nature: "exponentielle (croissance de plus en plus rapide)" },
      { tex: (a, b) => `n^2 - ${a}n + ${b}`, f: (a, b) => (n) => n * n - a * n + b, a: () => pick([4, 5, 6]), b: () => rand(3, 8), nature: "ni linéaire ni exponentielle (descend puis remonte)" }
    ]);
    const a = S.a(), b = S.b(), f = S.f(a, b), N = 7;
    const ys = Array.from({ length: N }, (_, n) => arr(f(n)));
    if (Math.max(...ys.map(Math.abs)) > 60) return GEN["qu-graphique"]();
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

  const genSeuil = (mode) => function gen() {
    const u0 = pick([1, 2, 3, 5, 10, 20, 50, 100]), add = mode ? mode === "add" : Math.random() < 0.5, pas = add ? rand(3, 25) : pick([1.2, 1.5, 2, 3]);
    const seuil = add ? u0 + pas * rand(4, 15) + rand(1, pas - 1 || 1) : pick([100, 200, 500, 1000, 2000, 5000]);
    if (!add && u0 >= seuil) return gen();
    let n = 0, u = u0; const T = [u0]; while (u <= seuil && n < 60) { u = arr(add ? u + pas : u * pas); n++; T.push(u); }
    if (n < 2 || n > 25) return gen();
    const ctx = add ? pick([`Une cagnotte contient $${u0}$ € et reçoit $${pas}$ € chaque semaine.`, `Un manguier mesure $${u0}$ cm et grandit de $${pas}$ cm par mois.`, `Une tirelire contient $${u0}$ € et on y ajoute $${pas}$ € par jour.`]) : pick([`Une rumeur est connue de $${u0}$ personnes et le nombre de personnes informées est multiplié par $${nb(pas)}$ chaque jour.`, `Une population de moustiques compte $${u0}$ individus et est multipliée par $${nb(pas)}$ chaque semaine.`]);
    const unite = add ? (ctx.includes("cm") ? "cm" : "€") : "";
    return { enonce: `${ctx} On note $u(n)$ la valeur après $n$ ${add ? (ctx.includes("semaine") ? "semaines" : ctx.includes("mois") ? "mois" : "jours") : (ctx.includes("jour") ? "jours" : "semaines")}. À partir de quel rang $n$ a-t-on $u(n) > ${nb(seuil)}$${unite ? " " + unite : ""} ?`, mode: "nombre", prefixe: "$n =$", attendu: n,
      erreurs: [{ valeur: n - 1, message: `Pour $n = ${n - 1}$, $u(n) = ${nb(T[n - 1])}$ ne dépasse pas encore $${nb(seuil)}$.` }, { valeur: n + 1, message: `On cherche le **premier** rang : dès $n = ${n}$, le seuil est dépassé.` }, { valeur: T[n], message: "On demande le rang $n$, pas la valeur $u(n)$." }],
      aides: [`$u(n + 1) = ${add ? `u(n) + ${pas}` : `${nb(pas)} \\times u(n)`}$ ${add ? `et $u(n) = ${u0} + ${pas}n$` : `et $u(n) = ${u0} \\times ${nb(pas)}^n$`}.`, `Calcule les termes jusqu'à dépasser $${nb(seuil)}$ : $${T.slice(0, Math.min(T.length, 6)).map(nb).join("$, $")}$${T.length > 6 ? ", …" : ""}`, `$u(${n - 1}) = ${nb(T[n - 1])} \\leqslant ${nb(seuil)}$ et $u(${n}) = ${nb(T[n])} > ${nb(seuil)}$.`],
      solution: `${add ? `$u(n) = ${u0} + ${pas}n$` : `$u(n) = ${u0} \\times ${nb(pas)}^n$`}. On a $u(${n - 1}) = ${nb(T[n - 1])} \\leqslant ${nb(seuil)}$ et $u(${n}) = ${nb(T[n])} > ${nb(seuil)}$ : le seuil est dépassé à partir du rang $n = ${n}$.${add ? ` (On peut aussi résoudre $${u0} + ${pas}n > ${nb(seuil)}$.)` : " (Un tableur ou le mode suite de la calculatrice permet de faire défiler les termes.)"}` };
  };
  def("qu-seuil", genSeuil());
  def("qa-seuil", genSeuil("add"));
  def("qg-seuil", genSeuil("mul"));

  def("qu-vrai-faux", () => vraiFaux4([
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

  /* Figures du cours (chapitres 9 et 12) */
  FIGURES["qu-cours-nuage"] = () => nuage([0, 1, 2, 3, 4, 5, 6], [5, 2, 1, 2, 5, 10, 17], { xlabel: "n", ylabel: "u(n)", xstep: 1, aria: "Nuage de points de la suite u(n) = n² − 4n + 5 : 5, 2, 1, 2, 5, 10, 17 ; elle décroît puis croît" });
  FIGURES["qu-cours-modes"] = () => {
    let s = `<svg class="graph" viewBox="0 0 320 150" role="img" aria-label="Deux modes de génération : formule explicite u(n) = 3n + 2 donne directement u(4) = 14 ; récurrence u(n+1) = u(n) + 3 avec u(0) = 2 enchaîne 2, 5, 8, 11, 14">`;
    s += `<text class="g-label" x="10" y="22" style="font-weight:700;fill:var(--lagon)">Explicite : u(n) = 3n + 2</text><text class="g-label" x="10" y="44">n = 4 → u(4) = 3 × 4 + 2 = 14 directement</text>`;
    s += `<text class="g-label" x="10" y="84" style="font-weight:700;fill:var(--ylang)">Récurrence : u(0) = 2, u(n + 1) = u(n) + 3</text>`;
    [2, 5, 8, 11, 14].forEach((v, k) => { s += `<rect x="${12 + k * 62}" y="100" width="40" height="28" rx="6" style="fill:var(--surface);stroke:var(--ylang);stroke-width:1.5"/><text class="g-label" x="${32 + k * 62}" y="119" text-anchor="middle" style="font-weight:700">${v}</text>`; if (k < 4) s += `<text class="g-label" x="${63 + k * 62}" y="119" text-anchor="middle" style="fill:var(--ylang);font-size:10px">+3</text>`; s += `<text class="g-label" x="${32 + k * 62}" y="143" text-anchor="middle" style="font-size:10px">u(${k})</text>`; });
    return s + `</svg>`;
  };
  FIGURES["qu-cours-lineaire-expo"] = () => nuage([0, 1, 2, 3, 4, 5, 6], [2, 4, 8, 16, 32, 64, 128].map((v) => v / 4), { xlabel: "n", ylabel: "u(n)", xstep: 1, ystep: 4, points: [0, 1, 2, 3, 4, 5, 6].map((n) => ({ x: n, y: 3 + 4 * n, label: n === 6 ? "3 + 4n" : "" })).concat([0, 1, 2, 3, 4, 5, 6].map((n) => ({ x: n, y: 0.5 * 2 ** n, label: n === 6 ? "0,5 × 2ⁿ" : "" }))), aria: "Deux nuages : points alignés de la suite 3 + 4n (linéaire) et points de la suite 0,5 × 2^n qui montent de plus en plus vite (exponentielle)" });

  /* ---------- Suites arithmétiques et géométriques, chapitres 9 et 12 (préfixes qg et qa) ---------- */
  const RAISONS_Q = [2, 3, 4, 5, 1.5, 1.2, 1.1, 0.5, 0.8, 0.9, 0.75, 1.25, 1.05];
  const puiss = (q, n) => arr(q ** n, 6);
  const termesArith = (u0, r, n) => Array.from({ length: n }, (_, k) => u0 + k * r);
  const termesGeo = (u0, q, n) => Array.from({ length: n }, (_, k) => arr(u0 * q ** k, 4));

  const gen_qg_reconnaitre = (types) => function gen() {
    const t = pick(types);
    let T, nat, raison, why;
    if (t === "arith") { const u0 = rand(-9, 20), r = nz2(-7, 9); T = termesArith(u0, r, 5); nat = "arithmétique"; raison = r; why = `on passe d'un terme au suivant en ajoutant toujours $${nb(r)}$ : $${T[1]} - ${pr(T[0])} = ${T[2]} - ${pr(T[1])} = ${nb(r)}$`; }
    else if (t === "geo") { const u0 = pick([1, 2, 3, 4, 5, 8, 10, 16, 20, 25, 50, 100, 200, 400, 1000]), q = pick([2, 3, 4, 1.5, 0.5, 0.1, 0.2, 10]); T = termesGeo(u0, q, 5); if (T.some((v) => !Number.isInteger(v * 100))) return gen(); nat = "géométrique"; raison = q; why = `on passe d'un terme au suivant en multipliant toujours par $${nb(q)}$ : $\\dfrac{${nb(T[1])}}{${nb(T[0])}} = \\dfrac{${nb(T[2])}}{${nb(T[1])}} = ${nb(q)}$`; }
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
  };
  def("qg-reconnaitre", gen_qg_reconnaitre(["arith", "geo", "aucune", "arith", "geo"]));
  def("qa-reconnaitre", gen_qg_reconnaitre(["arith","arith","aucune"]));
  def("qg-reconnaitre-geo", gen_qg_reconnaitre(["geo","geo","aucune"]));

  def("qg-arith-terme", () => {
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

  def("qg-arith-raison", () => {
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

  def("qg-geo-terme", () => {
    const t = pick(["u0", "u0", "formule", "up"]);
    const u0 = pick([1, 2, 3, 4, 5, 8, 10, 20, 50, 100, 200, 500, 1000, 2000]), q = pick([2, 3, 4, 5, 10, 1.5, 0.5, 0.1, 1.2, 1.1, 0.9, 0.8]);
    const n = q >= 2 ? rand(2, 6) : rand(2, 4);
    const att = arr(u0 * q ** n, 6);
    if (!Number.isInteger(att * 1000) || att > 1e6) return GEN["qg-geo-terme"]();
    if (t === "formule") {
      const bonne = `$u(n) = ${nb(u0)} \\times ${nb(q)}^n$`;
      const ch = choix4(bonne, [`$u(n) = ${aff(q, u0, "n")}$`, `$u(n) = ${nb(q)} \\times ${nb(u0)}^n$`, `$u(n) = ${nb(u0)} \\times ${nb(q)} \\times n$`, `$u(n) = ${nb(u0 * q)}^n$`]);
      return { enonce: `$(u(n))$ est géométrique de premier terme $u(0) = ${nb(u0)}$ et de raison $${nb(q)}$. Quelle est l'expression de $u(n)$ en fonction de $n$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Pour une suite géométrique, $u(n) = u(0) \\times q^n$.", `Ici $u(0) = ${nb(u0)}$ et $q = ${nb(q)}$.`, "Vérifie avec $n = 0$ ($q^0 = 1$) et $n = 1$."],
        solution: `$u(n) = u(0) \\times q^n = ${nb(u0)} \\times ${nb(q)}^n$. Vérification : $u(0) = ${nb(u0)}$, $u(1) = ${nb(arr(u0 * q))}$.` };
    }
    if (t === "up") {
      const p = rand(1, 4), m = p + rand(2, 4), up = u0, attm = arr(up * q ** (m - p), 6);
      if (!Number.isInteger(attm * 1000)) return GEN["qg-geo-terme"]();
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

  def("qg-geo-raison", () => {
    const u0 = pick([2, 3, 4, 5, 8, 10, 20, 40, 50, 100, 200, 500]), q = pick([2, 3, 4, 5, 1.5, 0.5, 0.2, 0.1, 1.2, 0.8, 2.5]);
    const p = rand(0, 4), up = arr(u0 * q ** p, 4), up1 = arr(up * q, 4);
    if (!Number.isInteger(up * 100) || !Number.isInteger(up1 * 100)) return GEN["qg-geo-raison"]();
    const t = pick(["consecutifs", "consecutifs", "deux"]);
    if (t === "deux") {
      const m = p + 2, um = arr(up * q * q, 4);
      if (!Number.isInteger(um * 100)) return GEN["qg-geo-raison"]();
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

  def("qg-nature-formule", () => {
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

  const gen_qg_variation = (types) => function gen() {
    const t = pick(types);
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
  };
  def("qg-variation", gen_qg_variation(["arith", "geo", "geo"]));
  def("qa-variation", gen_qg_variation(["arith"]));
  def("qg-variation-geo", gen_qg_variation(["geo"]));

  const gen_qg_modele = (types) => function gen() {
    const t = pick(types);
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
  };
  def("qg-modele", gen_qg_modele(["geo", "geo", "arith", "formule"]));
  def("qa-modele", gen_qg_modele(["arith"]));
  def("qg-modele-geo", gen_qg_modele(["geo","geo","formule"]));

  const gen_qg_graphique = (types) => function gen() {
    const t = pick(types);
    const N = 7;
    let ys, raison, u0;
    if (t === "arith") { u0 = rand(1, 12); raison = pick([1, 2, 3, 4, 5, -1, -2]); ys = termesArith(u0, raison, N); if (Math.min(...ys) < -2) return gen(); }
    else { u0 = pick([1, 2, 3, 4]); raison = pick([1.5, 2]); ys = termesGeo(u0, raison, N); if (Math.max(...ys) > 100) return gen(); }
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
  };
  def("qg-graphique", gen_qg_graphique(["arith", "geo"]));
  def("qa-graphique", gen_qg_graphique(["arith"]));
  def("qg-graphique-geo", gen_qg_graphique(["geo"]));

  const gen_qg_demontrer = (types) => function gen() {
    const t = pick(types);
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
  };
  def("qg-demontrer", gen_qg_demontrer(["arith", "geo"]));
  def("qa-demontrer", gen_qg_demontrer(["arith"]));
  def("qg-demontrer-geo", gen_qg_demontrer(["geo"]));

  def("qg-vrai-faux", () => vraiFaux4([
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
  ], ["Arithmétique : on ajoute $r$ ; géométrique : on multiplie par $q$.", "Terme général : $u(0) + nr$ ou $u(0) \\times q^n$.", "Pense au signe de $r$ et à la position de $q$ par rapport à $1$."]));

  /* Figures du cours (chapitres 9 et 12) */
  FIGURES["qg-cours-arith"] = () => nuage([0, 1, 2, 3, 4, 5, 6], [2, 5, 8, 11, 14, 17, 20], { xlabel: "n", ylabel: "u(n)", xstep: 1, ystep: 2, curves: [{ f: (x) => 3 * x + 2, a: -0.3, b: 6.3, closed: false }], aria: "Suite arithmétique u(0) = 2, raison 3 : points alignés sur la droite y = 3x + 2" });
  FIGURES["qg-cours-geo"] = () => nuage([0, 1, 2, 3, 4, 5, 6], [2, 3, 4.5, 6.75, 10.125, 15.1875, 22.78], { xlabel: "n", ylabel: "u(n)", xstep: 1, ystep: 2, aria: "Suite géométrique u(0) = 2, raison 1,5 : les points montent de plus en plus vite" });
  FIGURES["qg-cours-compare"] = () => nuage([0, 1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 4, 8, 16, 32, 64, 128, 256].map((v) => v / 8), { xlabel: "n", ylabel: "u(n)", xstep: 1, ystep: 4, points: [0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ x: n, y: 4 + 3 * n, label: n === 8 ? "4 + 3n" : "" })).concat([0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ x: n, y: 2 ** n / 8, label: n === 8 ? "2ⁿ ÷ 8" : "" }))), aria: "Comparaison : suite arithmétique 4 + 3n (points alignés) et suite géométrique 0,125 × 2^n, d'abord en dessous puis qui dépasse largement" });

  /* ---------- Chapitre 9 : suites arithmétiques, croissance linéaire (préfixe qa) ---------- */
  // Motifs géométriques évolutifs : cases du motif n (n ≥ 1) ; nombre de carreaux u(n) = a n + b
  const MOTIFS = [
    { nom: "en croix", a: 4, b: 1, cases: (n) => { const c = [[0, 0]]; for (let k = 1; k <= n; k++) c.push([k, 0], [-k, 0], [0, k], [0, -k]); return c; }, why: "on ajoute un carreau au bout de chacun des $4$ bras" },
    { nom: "en T", a: 3, b: 1, cases: (n) => { const c = []; for (let x = -n; x <= n; x++) c.push([x, -n]); for (let y = -n + 1; y <= 0; y++) c.push([0, y]); return c; }, why: "la barre s'allonge de $2$ carreaux et le pied de $1$" },
    { nom: "carré bordé", a: 4, b: 4, cases: (n) => { const c = []; for (let x = 0; x <= n + 1; x++) for (let y = 0; y <= n + 1; y++) if (x === 0 || y === 0 || x === n + 1 || y === n + 1) c.push([x, y]); return c; }, why: "la bordure gagne un carreau sur chacun des $4$ côtés", blanc: true },
    { nom: "en L", a: 2, b: 1, cases: (n) => { const c = [[0, 0]]; for (let k = 1; k <= n; k++) c.push([k, 0], [0, -k]); return c; }, why: "chacun des $2$ bras gagne un carreau" },
    { nom: "en H", a: 5, b: 2, cases: (n) => { const c = []; for (let y = -n; y <= n; y++) c.push([0, y], [n + 1, y]); for (let x = 1; x <= n; x++) c.push([x, 0]); return c; }, why: "chacun des deux montants gagne $2$ carreaux et la barre du milieu $1$" }
  ];
  function figMotifs(M) {
    const W = 320, boites = [1, 2, 3].map((n) => { const c = M.cases(n), xs = c.map((p) => p[0]), ys = c.map((p) => p[1]); return { n, c, x0: Math.min(...xs), y0: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs) + 1, h: Math.max(...ys) - Math.min(...ys) + 1 }; });
    const tot = boites.reduce((s, b) => s + b.w, 0) + 4, t = Math.min(16, Math.floor(W / tot)), hMax = Math.max(...boites.map((b) => b.h)), H = hMax * t + 34;
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="Motifs ${M.nom} numéros 1, 2 et 3 : ${boites.map((b) => b.c.length).join(", ")} carreaux">`, x = (W - (tot - 4) * t - 2 * 2 * t) / 2;
    boites.forEach((b) => {
      const yb = 6 + (hMax - b.h) * t;
      if (M.blanc) s += `<rect x="${x + t}" y="${yb + t}" width="${(b.w - 2) * t}" height="${(b.h - 2) * t}" style="fill:var(--surface);stroke:var(--trait);stroke-dasharray:3 2"/>`;
      b.c.forEach(([cx, cy]) => { s += `<rect x="${x + (cx - b.x0) * t}" y="${yb + (cy - b.y0) * t}" width="${t}" height="${t}" style="fill:var(--lagon);fill-opacity:0.55;stroke:var(--surface);stroke-width:1.5"/>`; });
      s += `<text class="g-label" x="${x + (b.w * t) / 2}" y="${H - 8}" text-anchor="middle">motif ${b.n}</text>`;
      x += b.w * t + 2 * t;
    });
    return s + `</svg>`;
  }
  def("qa-motif", () => {
    const M = pick(MOTIFS), u = (n) => M.a * n + M.b, t = pick(["terme", "terme", "formule", "rang"]);
    const fig = figMotifs(M);
    if (t === "formule") {
      const ch = choix4(`$u(n) = ${aff(M.a, M.b, "n")}$`, [`$u(n) = ${aff(M.b, M.a, "n")}$`, `$u(n) = ${aff(M.a, 0, "n")}$`, `$u(n) = ${aff(u(1), 0, "n")}$`, `$u(n) = ${aff(M.a, M.b + M.a, "n")}$`]);
      return { enonce: `On construit des motifs ${M.nom} (ci-dessous les motifs $1$, $2$ et $3$). On note $u(n)$ le nombre de carreaux du motif $n$. Quelle formule donne $u(n)$ ?`, figure: fig, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: [`Compte : $u(1) = ${u(1)}$, $u(2) = ${u(2)}$, $u(3) = ${u(3)}$.`, `D'un motif au suivant, on ajoute toujours $${M.a}$ carreaux : c'est une suite arithmétique de raison $${M.a}$.`, "Teste chaque formule avec $n = 1$, $2$ et $3$."],
        solution: `$u(1) = ${u(1)}$, $u(2) = ${u(2)}$, $u(3) = ${u(3)}$ : ${M.why}, donc la raison est $${M.a}$. Avec $u(1) = ${u(1)}$ : $u(n) = ${u(1)} + ${M.a}(n - 1) = ${aff(M.a, M.b, "n")}$.` };
    }
    if (t === "rang") {
      const n = rand(8, 40), N = u(n);
      return { enonce: `On construit des motifs ${M.nom} (ci-dessous les motifs $1$, $2$ et $3$). Quel motif utilise exactement $${N}$ carreaux ?`, figure: fig, mode: "nombre", prefixe: "Motif numéro", attendu: n,
        erreurs: [{ valeur: Math.round(N / M.a), message: `N'oublie pas les $${M.b}$ carreaux de départ : résous $${aff(M.a, M.b, "n")} = ${N}$.` }, { valeur: n + 1, message: "Vérifie en calculant le nombre de carreaux de ce motif." }, { valeur: N, message: "On demande le **numéro** du motif, pas le nombre de carreaux." }],
        aides: [`$u(1) = ${u(1)}$, $u(2) = ${u(2)}$, $u(3) = ${u(3)}$ : on ajoute $${M.a}$ à chaque fois.`, `$u(n) = ${aff(M.a, M.b, "n")}$.`, `Résous $${aff(M.a, M.b, "n")} = ${N}$.`],
        solution: `$u(n) = ${aff(M.a, M.b, "n")}$. $${aff(M.a, M.b, "n")} = ${N}$ donne $${M.a}n = ${N - M.b}$, soit $n = ${n}$ : c'est le motif $${n}$.` };
    }
    const n = pick([4, 5, 6, 10, 12, 15, 20, 25, 30, 50, 100]);
    return { enonce: `On construit des motifs ${M.nom} (ci-dessous les motifs $1$, $2$ et $3$). Combien de carreaux faut-il pour le motif $${n}$ ?`, figure: fig, mode: "nombre", prefixe: `$u(${n}) =$`, attendu: u(n),
      erreurs: [{ valeur: u(1) * n, message: "Le nombre de carreaux n'est pas proportionnel au numéro : on ajoute toujours le même nombre, à partir d'un départ qui n'est pas nul." }, { valeur: u(n - 1), message: `C'est le motif $${n - 1}$.` }, { valeur: M.a * n, message: `N'oublie pas les $${M.b}$ carreaux qui ne dépendent pas de $n$.` }],
      aides: [`Compte : $u(1) = ${u(1)}$, $u(2) = ${u(2)}$, $u(3) = ${u(3)}$.`, `On ajoute $${M.a}$ carreaux à chaque nouveau motif : suite arithmétique de raison $${M.a}$.`, `$u(${n}) = u(1) + (${n} - 1) \\times ${M.a}$.`],
      solution: `${M.why.charAt(0).toUpperCase() + M.why.slice(1)} : suite arithmétique de raison $${M.a}$ et $u(1) = ${u(1)}$.\n\n$u(${n}) = ${u(1)} + ${n - 1} \\times ${M.a} = ${u(n)}$.` };
  });

  def("qa-interets", () => {
    const C0 = pick([500, 800, 1000, 1200, 1500, 2000, 2500, 3000, 4000, 5000]), tx = pick([1, 1.5, 2, 2.5, 3, 4, 5, 6]), I = arr(C0 * tx / 100), t = pick(["terme", "terme", "interet", "seuil", "formule"]);
    const ctx = `${prenom()} place $${nb(C0)}$ € à intérêts simples, au taux annuel de $${nb(tx)}\\,\\%$ : chaque année, il reçoit $${nb(tx)}\\,\\%$ du capital **de départ**. On note $u(n)$ le capital après $n$ années.`;
    if (t === "interet") return { enonce: `${ctx} Quel est l'intérêt gagné chaque année (la raison de la suite) ?`, mode: "nombre", prefixe: "Intérêt :", attendu: I, suffixe: "€",
      erreurs: [{ valeur: tx, message: "Ça, c'est le taux. L'intérêt est ce taux appliqué au capital de départ." }, { valeur: arr(C0 * (1 + tx / 100)), message: "Ça, c'est le capital après un an. On veut seulement l'intérêt." }],
      aides: ["Intérêts simples : l'intérêt est le même chaque année.", `Il vaut $${nb(tx)}\\,\\%$ de $${nb(C0)}$ €.`, `$${nb(C0)} \\times \\dfrac{${nb(tx)}}{100}$.`], solution: `$${nb(C0)} \\times \\dfrac{${nb(tx)}}{100} = ${nb(I)}$ € par an : $(u(n))$ est arithmétique de raison $${nb(I)}$.` };
    if (t === "formule") {
      const ch = choix4(`$u(n) = ${nb(C0)} + ${nb(I)}n$`, [`$u(n) = ${nb(C0)} \\times ${nb(1 + tx / 100)}^n$`, `$u(n) = ${nb(C0)} + ${coef(tx, "n")}$`, `$u(n) = ${nb(I)} + ${nb(C0)}n$`]);
      return { enonce: `${ctx} Quelle formule donne $u(n)$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Intérêts simples : on ajoute chaque année le même montant.", `Ce montant est $${nb(tx)}\\,\\%$ de $${nb(C0)}$, soit $${nb(I)}$ €.`, "Suite arithmétique : $u(n) = u(0) + nr$."], solution: `Chaque année on ajoute $${nb(I)}$ € : $u(n) = ${nb(C0)} + ${nb(I)}n$. (La formule avec une puissance correspond aux intérêts **composés**.)` };
    }
    if (t === "seuil") {
      const k = pick([1.5, 2, 1.25, 1.2]), cible = arr(C0 * k), n = Math.ceil(arr((cible - C0) / I, 6));
      return { enonce: `${ctx} Au bout de combien d'années le capital atteindra-t-il au moins $${nb(cible)}$ € ?`, mode: "nombre", prefixe: "$n =$", attendu: n,
        erreurs: [{ valeur: n - 1, message: `Pour $n = ${n - 1}$, on a $u(${n - 1}) = ${nb(arr(C0 + I * (n - 1)))}$ : pas encore assez.` }, { valeur: arr((cible - C0) / I, 2), message: "Le nombre d'années est un entier : prends le premier entier qui convient." }],
        aides: [`$u(n) = ${nb(C0)} + ${nb(I)}n$.`, `Résous $${nb(C0)} + ${nb(I)}n \\geqslant ${nb(cible)}$.`, `$n \\geqslant \\dfrac{${nb(arr(cible - C0))}}{${nb(I)}}$ : prends le premier entier.`],
        solution: `$${nb(C0)} + ${nb(I)}n \\geqslant ${nb(cible)}$ équivaut à $n \\geqslant \\dfrac{${nb(arr(cible - C0))}}{${nb(I)}} ${Number.isInteger(arr((cible - C0) / I, 6)) ? "=" : "\\approx"} ${nb(arr((cible - C0) / I, 2))}$. Le premier entier est $n = ${n}$ : $u(${n}) = ${nb(arr(C0 + I * n))}$ €.` };
    }
    const n = rand(2, 15), v = arr(C0 + I * n);
    return { enonce: `${ctx} Calcule $u(${n})$.`, mode: "nombre", prefixe: `$u(${n}) =$`, attendu: v, suffixe: "€",
      erreurs: [{ valeur: arr(C0 * (1 + tx / 100) ** n, 2), message: "Ça, ce seraient des intérêts **composés**. Ici l'intérêt est toujours calculé sur le capital de départ." }, { valeur: arr(I * n), message: "Ça, ce sont seulement les intérêts : ajoute le capital de départ." }, { valeur: arr(C0 + tx * n), message: "L'intérêt annuel n'est pas le taux : c'est $" + nb(tx) + "\\,\\%$ de $" + nb(C0) + "$." }],
      aides: [`Intérêt annuel : $${nb(C0)} \\times ${nb(tx / 100)} = ${nb(I)}$ €.`, `$u(n) = ${nb(C0)} + ${nb(I)}n$.`, `Remplace $n$ par $${n}$.`],
      solution: `$u(${n}) = ${nb(C0)} + ${nb(I)} \\times ${n} = ${nb(v)}$ €.` };
  });

  // Tableur : colonne A les rangs n, colonne B les termes ; formule à recopier vers le bas
  def("qa-tableur", () => {
    const u0 = rand(2, 40), r = nz2(-6, 12), t = pick(["recurrence", "recurrence", "explicite", "valeur"]), sg = (s) => s.replace(/\+-/g, "-");
    const tab = { lignes: [["", "A", "B"], ["1", "n", "u(n)"], ["2", "0", String(u0)], ["3", "1", "?"], ["4", "2", ""]] };
    if (t === "valeur") {
      const k = rand(5, 12);
      return { enonce: `Dans un tableur, la colonne A contient les rangs $n$ et la colonne B les termes d'une suite. On a saisi $${u0}$ en B2, puis $\\texttt{=B2${r < 0 ? "" : "+"}${r}}$ en B3, formule recopiée vers le bas. Quel nombre s'affiche en B${k + 2} (rang $n = ${k}$) ?`, tableau: tab, mode: "nombre", prefixe: `B${k + 2} :`, attendu: u0 + k * r,
        erreurs: [{ valeur: u0 + (k + 1) * r, message: `La cellule B${k + 2} correspond au rang $${k}$ (B2 est le rang $0$).` }, { valeur: u0 + (k - 1) * r, message: "Compte bien : il y a autant d'ajouts que le rang." }, { valeur: u0 * r * k, message: "La formule ajoute $" + r + "$ à la cellule du dessus : c'est une addition répétée." }],
        aides: [`La formule ajoute $${r}$ à la cellule du dessus : $u(n + 1) = u(n) ${plus(r)}$.`, `C'est une suite arithmétique de premier terme $u(0) = ${u0}$ et de raison $${r}$.`, `$u(${k}) = ${u0} + ${k} \\times ${pr(r)}$.`],
        solution: `$u(${k}) = ${u0} + ${k} \\times ${pr(r)} = ${u0 + k * r}$ s'affiche en B${k + 2}.` };
    }
    if (t === "explicite") {
      const bonne = sg(`=${u0}+${r}*A3`);
      const ch = choix4(`$\\texttt{${bonne}}$`, [sg(`=${u0}+${r}*B2`), `=${u0}*${r}+A3`, sg(`=B2+${r}*A2`)].map((f) => `$\\texttt{${f}}$`));
      return { enonce: `La suite est définie par $u(n) = ${aff(r, u0, "n")}$. Dans le tableur ci-dessous (rangs en colonne A), quelle formule saisir en B3 pour obtenir $u(1)$ à partir du rang écrit en A3, puis la recopier vers le bas ?`, tableau: tab, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Formule explicite : on calcule $u(n)$ directement à partir de $n$.", "Le rang $n$ de la ligne 3 est dans la cellule A3.", `$u(n) = ${u0} + ${pr(r)} \\times n$.`],
        solution: `On remplace $n$ par la cellule A3 : $\\texttt{${bonne}}$. Recopiée vers le bas, elle devient $\\texttt{${bonne.replace("A3", "A4")}}$, etc.` };
    }
    const bonne = `=B2${r < 0 ? "" : "+"}${r}`;
    const ch = choix4(`$\\texttt{${bonne}}$`, [`$\\texttt{=B2*${r}}$`, `$\\texttt{=A2${r < 0 ? "" : "+"}${r}}$`, `$\\texttt{=B3${r < 0 ? "" : "+"}${r}}$`, `$\\texttt{${r < 0 ? "" : "+"}${r}}$`]);
    return { enonce: `La suite arithmétique a pour premier terme $u(0) = ${u0}$ et pour raison $${r}$. Dans le tableur, quelle formule saisir en B3 (puis recopier vers le bas) pour calculer chaque terme à partir du précédent ?`, tableau: tab, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Relation de récurrence : $u(n + 1) = u(n) + r$.", "Le terme précédent de B3 est dans la cellule du dessus, B2.", "Une formule commence par « = »."],
      solution: `$u(1) = u(0) ${plus(r)}$ : en B3 on écrit $\\texttt{${bonne}}$. Recopiée vers le bas, elle devient $\\texttt{=B3${r < 0 ? "" : "+"}${r}}$ en B4, etc.` };
  });

  def("qa-vrai-faux", () => vraiFaux4([
    ["La suite $2$ ; $5$ ; $8$ ; $11$ est arithmétique de raison $3$.", true, "on ajoute $3$ à chaque fois."],
    ["Si $u(0) = 4$ et $u(n + 1) = u(n) - 2$, alors $u(10) = -16$.", true, "$u(10) = 4 + 10 \\times (-2) = -16$."],
    ["Une suite arithmétique de raison négative est décroissante.", true, "on retire la même quantité à chaque rang."],
    ["Les points représentant une suite arithmétique sont alignés.", true, "les termes augmentent de la même quantité : croissance linéaire."],
    ["Si $u(n) = 7 + 3n$, la suite est arithmétique de raison $3$.", true, "$u(n + 1) - u(n) = 3$."],
    ["Avec des intérêts simples, le capital augmente du même montant chaque année.", true, "l'intérêt est calculé sur le capital de départ."],
    ["$u(n)$ se note aussi $u_n$.", true, "ce sont deux écritures du terme de rang $n$."],
    ["La suite $1$ ; $2$ ; $4$ ; $8$ est arithmétique.", false, "les écarts $1$, $2$, $4$ ne sont pas constants."],
    ["Si $u(0) = 5$ et la raison vaut $2$, alors $u(3) = 40$.", false, "$u(3) = 5 + 3 \\times 2 = 11$ : on ajoute, on ne multiplie pas."],
    ["Si $u(n) = 7 + 3n$, alors $u(1) = 7$.", false, "$u(1) = 10$ ; c'est $u(0)$ qui vaut $7$."],
    ["Une suite arithmétique de raison $0{,}5$ est décroissante.", false, "la raison est positive : la suite est croissante."],
    ["Pour une suite arithmétique, $u(n) = u(0) \\times r^n$.", false, "c'est $u(n) = u(0) + nr$."],
    ["Si $u(2) = 10$ et $u(5) = 22$, la raison vaut $12$.", false, "$\\dfrac{22 - 10}{5 - 2} = 4$."]
  ], ["Suite arithmétique : on **ajoute** toujours la même raison $r$.", "$u(n) = u(0) + nr$.", "Le signe de $r$ donne le sens de variation."]));

  /* Figures du cours (chapitre 9) */
  FIGURES["qa-cours-motifs"] = () => figMotifs(MOTIFS[0]);

  /* ---------- Chapitre 10 : fonctions affines, variation linéaire (préfixe qd) ---------- */
  const fAff = (m, p) => `f(x) = ${m === 0 ? nb(p) : aff(m, p)}`;

  def("qd-image", () => {
    const m = pick([-4, -3, -2, -1.5, -0.5, 0.5, 1.5, 2, 3, 4, 5, 2.5]), p = rand(-9, 9), t = pick(["image", "image", "antecedent"]);
    if (t === "image") {
      const x = rand(-6, 8), v = arr(m * x + p);
      return { enonce: `On pose $${fAff(m, p)}$. Calcule $f(${nb(x)})$.`, mode: "nombre", prefixe: `$f(${nb(x)}) =$`, attendu: v,
        erreurs: [{ valeur: arr(m + x + p), message: `$${nb(m)}x$ signifie $${nb(m)} \\times x$.` }, { valeur: arr(m * x - p), message: "Attention au signe de l'ordonnée à l'origine." }, { valeur: arr(-m * x + p), message: "Attention au produit d'un nombre négatif." }],
        aides: [`Remplace $x$ par $${nb(x)}$.`, `$f(${nb(x)}) = ${nb(m)} \\times ${pr(x)} ${plus(p)}$.`, "Calcule d'abord le produit, puis l'addition."],
        solution: `$f(${nb(x)}) = ${nb(m)} \\times ${pr(x)} ${plus(p)} = ${nb(arr(m * x))} ${plus(p)} = ${nb(v)}$.` };
    }
    const x = rand(-6, 8), k = arr(m * x + p);
    return { enonce: `On pose $${fAff(m, p)}$. Détermine l'antécédent de $${nb(k)}$ par $f$.`, mode: "nombre", prefixe: "$x =$", attendu: x,
      erreurs: [{ valeur: arr(m * k + p), message: "Ça, c'est l'image de $" + nb(k) + "$. On cherche $x$ tel que $f(x) = " + nb(k) + "$." }, { valeur: arr((k + p) / m), message: `On retire $${nb(p)}$ : $${nb(m)}x = ${nb(k)} - ${pr(p)}$.` }],
      aides: [`On résout $${aff(m, p)} = ${nb(k)}$.`, `$${coef(m, "x")} = ${nb(k)} - ${pr(p)} = ${nb(arr(k - p))}$.`, `$x = \\dfrac{${nb(arr(k - p))}}{${nb(m)}}$.`],
      solution: `$${aff(m, p)} = ${nb(k)}$ équivaut à $${coef(m, "x")} = ${nb(arr(k - p))}$, soit $x = ${nb(x)}$. Vérification : $f(${nb(x)}) = ${nb(k)}$.` };
  });

  def("qd-taux", () => {
    const m = pick([-5, -4, -3, -2, -1, -0.5, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5]), p = rand(-10, 15), x1 = rand(-4, 5), x2 = x1 + pick([1, 2, 3, 4, 5, 6]);
    const y1 = arr(m * x1 + p), y2 = arr(m * x2 + p), t = pick(["m", "m", "p", "expr"]);
    const debut = `$f$ est une fonction affine telle que $f(${nb(x1)}) = ${nb(y1)}$ et $f(${nb(x2)}) = ${nb(y2)}$.`;
    if (t === "expr") {
      const ch = choix4(`$${fAff(m, p)}$`, [`$${fAff(1 / m === Math.round(1 / m) ? 1 / m : -m, p)}$`, `$${fAff(m, y1)}$`, `$${fAff(-m, arr(y1 + m * x1))}$`, `$${fAff(arr(y2 - y1), p)}$`], (k) => `$${fAff(m, p + k + 1)}$`);
      return { enonce: `${debut} Quelle est l'expression de $f(x)$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Coefficient directeur (taux d'accroissement) : $m = \\dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$.", `$m = \\dfrac{${nb(y2)} - ${pr(y1)}}{${nb(x2)} - ${pr(x1)}} = ${nb(m)}$.`, `Puis $p$ : $f(${nb(x1)}) = ${nb(m)} \\times ${pr(x1)} + p = ${nb(y1)}$.`],
        solution: `$m = \\dfrac{${nb(y2)} - ${pr(y1)}}{${nb(x2)} - ${pr(x1)}} = \\dfrac{${nb(arr(y2 - y1))}}{${nb(x2 - x1)}} = ${nb(m)}$. Puis $${nb(m)} \\times ${pr(x1)} + p = ${nb(y1)}$ donne $p = ${nb(p)}$. Donc $${fAff(m, p)}$.` };
    }
    if (t === "p") return { enonce: `${debut} Son coefficient directeur est $${nb(m)}$. Quelle est son ordonnée à l'origine $p = f(0)$ ?`, mode: "nombre", prefixe: "$p =$", attendu: p,
      erreurs: [{ valeur: arr(y1 + m * x1), message: "On a $f(x_1) = m x_1 + p$, donc $p = f(x_1) - m x_1$ : on **soustrait**." }, { valeur: y1, message: "$f(" + nb(x1) + ")$ n'est pas $f(0)$." }],
      aides: [`$f(x) = ${coef(m, "x")} + p$.`, `$f(${nb(x1)}) = ${nb(m)} \\times ${pr(x1)} + p = ${nb(y1)}$.`, `$p = ${nb(y1)} - ${pr(arr(m * x1))}$.`],
      solution: `$${nb(m)} \\times ${pr(x1)} + p = ${nb(y1)}$, soit $${nb(arr(m * x1))} + p = ${nb(y1)}$, donc $p = ${nb(p)}$.` };
    return { enonce: `${debut} Calcule son coefficient directeur $m$ (taux d'accroissement de $f$).`, mode: "nombre", prefixe: "$m =$", attendu: m,
      erreurs: [{ valeur: arr((x2 - x1) / (y2 - y1)), message: "C'est $\\dfrac{\\text{variation des images}}{\\text{variation des } x}$ : les images au numérateur." }, { valeur: -m, message: "Garde le même ordre en haut et en bas : $f(x_2) - f(x_1)$ et $x_2 - x_1$." }, { valeur: arr(y2 - y1), message: `Divise par l'écart des $x$ : $${nb(x2)} - ${pr(x1)} = ${x2 - x1}$.` }],
      aides: ["Pour une fonction affine, le taux d'accroissement est constant : c'est le coefficient directeur.", "$m = \\dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$.", `$m = \\dfrac{${nb(y2)} - ${pr(y1)}}{${nb(x2)} - ${pr(x1)}}$.`],
      solution: `$m = \\dfrac{${nb(y2)} - ${pr(y1)}}{${nb(x2)} - ${pr(x1)}} = \\dfrac{${nb(arr(y2 - y1))}}{${nb(x2 - x1)}} = ${nb(m)}$ : quand $x$ augmente de $1$, $f(x)$ ${m > 0 ? "augmente" : "diminue"} de $${nb(Math.abs(m))}$.` };
  });

  def("qd-sens", () => {
    const t = pick(["formule", "formule", "contexte", "parallele"]);
    if (t === "parallele") {
      const r = nz2(-6, 8), u0 = rand(-10, 20), bonne = r > 0 ? "croissantes toutes les deux" : "décroissantes toutes les deux";
      const ch = choix4(bonne, [r > 0 ? "décroissantes toutes les deux" : "croissantes toutes les deux", "la suite croissante et la fonction décroissante", "la suite décroissante et la fonction croissante"]);
      return { enonce: `On considère la suite arithmétique $u(n) = ${aff(r, u0, "n")}$ et la fonction affine $f(x) = ${aff(r, u0)}$. Quels sont leurs sens de variation ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["La suite prend les valeurs de $f$ aux entiers : $u(n) = f(n)$.", `La raison de la suite et le coefficient directeur de $f$ valent tous les deux $${r}$.`, "Positif : croissante ; négatif : décroissante."],
        solution: `La raison et le coefficient directeur valent $${r}$, ${r > 0 ? "positif" : "négatif"} : la suite et la fonction sont ${bonne}. Les points $(n\\,;u(n))$ sont sur la droite représentant $f$.` };
    }
    if (t === "contexte") {
      const S = pick([
        ["Le niveau d'eau d'une citerne baisse de $3$ cm par jour.", "décroissante", "on retire la même quantité chaque jour : coefficient directeur $-3$"],
        ["Le prix d'une course de taxi est de $4$ € plus $1{,}5$ € par km.", "croissante", "chaque km ajoute $1{,}5$ € : coefficient directeur $1{,}5$"],
        ["Le niveau moyen des océans monte d'environ $4$ mm par an.", "croissante", "il augmente de la même quantité chaque année : coefficient directeur $4$"],
        ["Une bougie de $20$ cm raccourcit de $2$ cm par heure.", "décroissante", "elle perd la même longueur chaque heure : coefficient directeur $-2$"],
        ["Le salaire d'un vendeur est de $1\\,200$ € plus $50$ € par vente.", "croissante", "chaque vente ajoute $50$ € : coefficient directeur $50$"],
        ["Un abonnement coûte $30$ € par mois, quel que soit le nombre d'appels.", "constante", "le prix ne dépend pas du nombre d'appels : coefficient directeur $0$"],
        ["La réserve de riz d'une cantine, $500$ kg, diminue de $25$ kg par jour.", "décroissante", "on retire $25$ kg chaque jour : coefficient directeur $-25$"]
      ]);
      const ch = choix4(S[1], ["croissante", "décroissante", "constante", "ni croissante ni décroissante"].filter((s) => s !== S[1]));
      return { enonce: `${S[0]} On modélise la situation par une fonction affine. Elle est :`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Cherche le coefficient directeur : de combien la grandeur change-t-elle à chaque unité ?", "Hausse : coefficient positif ; baisse : coefficient négatif ; rien ne change : coefficient nul.", "Une fonction affine est croissante si $m > 0$, décroissante si $m < 0$, constante si $m = 0$."],
        solution: `La fonction est **${S[1]}** : ${S[2]}.` };
    }
    const m = pick([-5, -3, -2, -1, -0.5, -0.2, 0.2, 0.5, 1, 2, 3, 4, 0]), p = rand(-9, 9);
    const sens = m > 0 ? "croissante sur $\\mathbb{R}$" : m < 0 ? "décroissante sur $\\mathbb{R}$" : "constante sur $\\mathbb{R}$";
    const forme = pick(["std", "inv"]);
    const tex = m === 0 ? nb(p) : forme === "inv" && p !== 0 ? `${nb(p)} ${m < 0 ? "-" : "+"} ${Math.abs(m) === 1 ? "" : nb(Math.abs(m))}x` : aff(m, p);
    const ch = choix4(sens, ["croissante sur $\\mathbb{R}$", "décroissante sur $\\mathbb{R}$", "constante sur $\\mathbb{R}$", "croissante puis décroissante"].filter((s) => s !== sens));
    return { enonce: `On pose $f(x) = ${tex}$. Quel est le sens de variation de $f$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Repère le coefficient directeur $m$ : le nombre qui multiplie $x$.", `Ici $m = ${nb(m)}$${forme === "inv" && m !== 0 && p !== 0 ? " (le terme en $x$ est écrit en second)" : ""}.`, "$m > 0$ : croissante ; $m < 0$ : décroissante ; $m = 0$ : constante."],
      solution: `Le coefficient directeur est $m = ${nb(m)}$, ${m > 0 ? "positif" : m < 0 ? "négatif" : "nul"} : $f$ est ${sens}.${m !== 0 && p !== 0 && Math.sign(p) !== Math.sign(m) ? ` Le signe de $${nb(p)}$ (ordonnée à l'origine) ne compte pas.` : ""}` };
  });

  def("qd-graphique", () => {
    const C = pick([
      { g: "le prix $P(x)$ (en €) d'une location de scooter", v: "la distance $x$ (en km)", u: "km", p: () => pick([10, 15, 20, 25]), m: () => pick([0.5, 1, 1.5, 2]), X: 40, fixe: "les frais fixes", unite: "le prix par km" },
      { g: "le montant $M(x)$ (en €) d'une facture d'eau", v: "le volume $x$ consommé (en m³)", u: "m³", p: () => pick([20, 30, 40, 50]), m: () => pick([2, 3, 4, 5]), X: 30, fixe: "l'abonnement", unite: "le prix du m³" },
      { g: "la hauteur $h(t)$ (en cm) d'une plante", v: "le temps $t$ (en semaines)", u: "semaine", p: () => pick([4, 6, 8, 10]), m: () => pick([1, 1.5, 2, 3]), X: 12, fixe: "la hauteur au départ", unite: "la croissance par semaine" }
    ]);
    const p = C.p(), m = C.m(), Y = p + m * C.X, py = pas(Y), px = pas(C.X);
    const k = px * 2 <= C.X ? 2 * px : px, fig = graph({ xmin: -0.08 * C.X, xmax: C.X * 1.1, ymin: -0.08 * Y, ymax: Y * 1.12, xstep: px, ystep: py, h: 260, curves: [{ f: (x) => m * x + p, a: 0, b: C.X, closed: false }], points: [{ x: 0, y: p }, { x: k, y: m * k + p }], aria: `Droite passant par (0 ; ${nbS(p)}) et (${nbS(k)} ; ${nbS(m * k + p)})` });
    const q = pick(["p", "m", "m", "valeur"]);
    if (q === "valeur") {
      const x = pick([5, 10, 15, 20, 25].filter((v) => v <= C.X * 2)), v = arr(m * x + p);
      return { enonce: `La droite représente ${C.g} en fonction de ${C.v}. Détermine l'expression de la fonction, puis calcule sa valeur pour $x = ${x}$.`, figure: fig, mode: "nombre", prefixe: "Valeur :", attendu: v,
        erreurs: [{ valeur: arr(m * x), message: `N'oublie pas ${C.fixe} : l'ordonnée à l'origine $${nb(p)}$.` }, { valeur: arr(p * x + m), message: "Le coefficient directeur multiplie $x$ ; l'ordonnée à l'origine s'ajoute." }],
        aides: [`Ordonnée à l'origine (${C.fixe}) : $${nb(p)}$.`, `Entre les deux points marqués, quand $x$ augmente de $${nb(k)}$, la valeur augmente de $${nb(m * k)}$ : $m = ${nb(m)}$.`, `Expression : $${aff(m, p)}$ ; remplace $x$ par $${x}$.`],
        solution: `$p = ${nb(p)}$ et $m = \\dfrac{${nb(m * k)}}{${nb(k)}} = ${nb(m)}$, donc la fonction est $x \\mapsto ${aff(m, p)}$. Pour $x = ${x}$ : $${nb(m)} \\times ${x} + ${nb(p)} = ${nb(v)}$.` };
    }
    return { enonce: `La droite représente ${C.g} en fonction de ${C.v}. Lis ${q === "p" ? `${C.fixe} (ordonnée à l'origine)` : `${C.unite} (coefficient directeur)`}.`, figure: fig, mode: "nombre", prefixe: q === "p" ? "$p =$" : "$m =$", attendu: q === "p" ? p : m,
      erreurs: [{ valeur: q === "p" ? m : p, message: q === "p" ? "Ça, c'est le coefficient directeur." : "Ça, c'est l'ordonnée à l'origine." }, { valeur: q === "m" ? arr(m * k + p) : arr(m * k + p), message: "Ça, c'est l'ordonnée d'un point, pas " + (q === "p" ? C.fixe : C.unite) + "." }, { valeur: arr((m * k + p) / k), message: `Pour la pente, utilise la **variation** de l'ordonnée : $${nb(m * k + p)} - ${nb(p)}$.` }],
      aides: [q === "p" ? "L'ordonnée à l'origine se lit là où la droite coupe l'axe vertical ($x = 0$)." : "Coefficient directeur $= \\dfrac{\\text{variation verticale}}{\\text{variation horizontale}}$.", `Points marqués : $(0\\,;${nb(p)})$ et $(${nb(k)}\\,;${nb(m * k + p)})$.`, q === "p" ? `C'est la valeur pour $x = 0$.` : `$\\dfrac{${nb(m * k + p)} - ${nb(p)}}{${nb(k)} - 0}$.`],
      solution: q === "p" ? `La droite coupe l'axe vertical en $${nb(p)}$ : ${C.fixe} valent $${nb(p)}$.` : `$m = \\dfrac{${nb(m * k + p)} - ${nb(p)}}{${nb(k)}} = ${nb(m)}$ : ${C.unite} est $${nb(m)}$.` };
  });

  def("qd-celsius", () => {
    const t = pick(["CversF", "CversF", "FversC", "coef"]);
    if (t === "coef") {
      const q = pick(["m", "p"]);
      return { enonce: `L'eau gèle à $0$ °C, soit $32$ °F, et bout à $100$ °C, soit $212$ °F. La température en degrés Fahrenheit est une fonction affine $F(C) = mC + p$ de la température $C$ en degrés Celsius. ${q === "m" ? "Calcule $m$." : "Que vaut $p$ ?"}`, mode: "nombre", prefixe: q === "m" ? "$m =$" : "$p =$", attendu: q === "m" ? 1.8 : 32,
        erreurs: q === "m" ? [{ valeur: 2.12, message: "Le coefficient directeur est le quotient des **variations** : $\\dfrac{212 - 32}{100 - 0}$." }, { valeur: arr(100 / 180, 6), message: "Les variations de $F$ vont au numérateur." }, { valeur: 180, message: "Divise par la variation de $C$, $100 - 0$." }] : [{ valeur: 212, message: "$p = F(0)$ : la température Fahrenheit pour $0$ °C." }, { valeur: 0, message: "$0$ °C ne correspond pas à $0$ °F." }],
        aides: ["On connaît deux points : $(0\\,;32)$ et $(100\\,;212)$.", "$m = \\dfrac{212 - 32}{100 - 0}$.", "$p = F(0)$."],
        solution: `$m = \\dfrac{212 - 32}{100 - 0} = \\dfrac{180}{100} = 1{,}8$ et $p = F(0) = 32$ : $F(C) = 1{,}8C + 32$.` };
    }
    if (t === "CversF") {
      const c = pick([-10, -5, 5, 10, 15, 20, 25, 28, 30, 32, 35, 37, 40, 45, 50]), f = arr(1.8 * c + 32);
      return { enonce: `On a $F = 1{,}8C + 32$, où $C$ est la température en degrés Celsius et $F$ en degrés Fahrenheit. À ${pick(["Mamoudzou", "Pamandzi", "Sada", "Mtsamboro"])}, il fait $${nb(c)}$ °C. Combien cela fait-il en °F ?`, mode: "nombre", prefixe: "$F =$", attendu: f, suffixe: "°F",
        erreurs: [{ valeur: arr(1.8 * (c + 32)), message: "On multiplie d'abord par $1{,}8$, puis on ajoute $32$." }, { valeur: arr((c - 32) / 1.8, 6), message: "Ça, c'est la conversion dans l'autre sens." }],
        aides: ["Remplace $C$ par la température.", `$F = 1{,}8 \\times ${pr(c)} + 32$.`, "Multiplication d'abord."], solution: `$F = 1{,}8 \\times ${pr(c)} + 32 = ${nb(arr(1.8 * c))} + 32 = ${nb(f)}$ °F.` };
    }
    const c = pick([-20, -10, 0, 5, 10, 15, 20, 25, 30, 35, 40, 60, 100]), f = arr(1.8 * c + 32);
    return { enonce: `On a $F = 1{,}8C + 32$ ($C$ en degrés Celsius, $F$ en degrés Fahrenheit). Un thermomètre américain affiche $${nb(f)}$ °F. Quelle est la température en °C ?`, mode: "nombre", prefixe: "$C =$", attendu: c, suffixe: "°C",
      erreurs: [{ valeur: arr(f / 1.8 - 32, 6), message: "On retire d'abord $32$, puis on divise par $1{,}8$." }, { valeur: arr(1.8 * f + 32), message: "On cherche $C$ : il faut résoudre l'équation, pas appliquer la formule." }],
      aides: [`On résout $1{,}8C + 32 = ${nb(f)}$.`, `$1{,}8C = ${nb(f)} - 32 = ${nb(arr(f - 32))}$.`, `$C = \\dfrac{${nb(arr(f - 32))}}{1{,}8}$.`], solution: `$1{,}8C = ${nb(f)} - 32 = ${nb(arr(f - 32))}$, donc $C = \\dfrac{${nb(arr(f - 32))}}{1{,}8} = ${nb(c)}$ °C.` };
  });

  def("qd-equilibre", () => {
    const pe = rand(2, 12), qe = pick([100, 120, 150, 200, 240, 300, 400, 500]), a = pick([5, 10, 15, 20, 25]), c = pick([5, 10, 15, 20, 30]);
    const b = qe - a * pe, d = qe + c * pe;
    if (b < 0) return GEN["qd-equilibre"]();
    const prod = pick(["kg de mangues", "kg de bananes", "bouquets d'ylang-ylang", "paniers de légumes"]), t = pick(["prix", "prix", "quantite"]);
    return { enonce: `Sur un marché, pour un prix $x$ (en €) d'un produit, l'offre (quantité proposée par les vendeurs) est $O(x) = ${aff(a, b)}$ et la demande (quantité voulue par les acheteurs) est $D(x) = ${aff(-c, d)}$, en ${prod}. ${t === "prix" ? "Quel est le prix d'équilibre (où l'offre est égale à la demande) ?" : `Au prix d'équilibre $x = ${pe}$ €, quelle quantité est échangée ?`}`, mode: "nombre", prefixe: t === "prix" ? "Prix :" : "Quantité :", attendu: t === "prix" ? pe : qe, suffixe: t === "prix" ? "€" : undefined,
      erreurs: t === "prix" ? [{ valeur: qe, message: "Ça, c'est la quantité échangée. On demande le prix $x$." }, { valeur: arr((d + b) / (a + c), 6), message: "Rassemble bien les termes : $" + aff(a, b) + " = " + aff(-c, d) + "$ donne $" + (a + c) + "x = " + nb(d - b) + "$." }, { valeur: arr((d - b) / (a - c), 6), message: "En passant $-" + c + "x$ de l'autre côté, il devient $+" + c + "x$." }] : [{ valeur: pe, message: "Ça, c'est le prix. Calcule $O(" + pe + ")$." }, { valeur: arr(a * pe), message: `N'oublie pas le terme constant $${nb(b)}$.` }],
      aides: ["À l'équilibre, $O(x) = D(x)$ : les deux droites se coupent.", `$${aff(a, b)} = ${aff(-c, d)}$, donc $${a + c}x = ${nb(d - b)}$.`, t === "prix" ? `$x = \\dfrac{${nb(d - b)}}{${a + c}}$.` : `Calcule $O(${pe}) = ${a} \\times ${pe} ${plus(b)}$ (ou $D(${pe})$, c'est pareil).`],
      solution: `$${aff(a, b)} = ${aff(-c, d)}$ équivaut à $${a + c}x = ${nb(d - b)}$, soit $x = ${pe}$ €. Quantité échangée : $O(${pe}) = ${a} \\times ${pe} ${plus(b)} = ${qe}$ (et $D(${pe}) = ${qe}$ aussi).` };
  });

  // Barème d'impôt simplifié (fictif) : fonction affine par morceaux
  def("qd-impot", () => {
    const S1 = pick([10000, 11000, 12000]), S2 = pick([25000, 28000, 30000]), t1 = pick([10, 11, 12]), t2 = pick([25, 30]);
    const impot = (R) => (R <= S1 ? 0 : R <= S2 ? (R - S1) * t1 / 100 : (S2 - S1) * t1 / 100 + (R - S2) * t2 / 100);
    const R = pick([S1 - 2000, (S1 + S2) / 2, S2 + 2000, S2 + 5000, S2 + 10000, S1 + 5000, S1 + 3000, S2 + 12000].map((v) => Math.round(v / 1000) * 1000)), I = arr(impot(R)), t = pick(["impot", "impot", "marginal", "moyen"]);
    const bareme = `Un barème d'impôt simplifié (fictif) : $0\\,\\%$ sur la part du revenu jusqu'à $${nb(S1)}$ €, $${t1}\\,\\%$ sur la part entre $${nb(S1)}$ € et $${nb(S2)}$ €, $${t2}\\,\\%$ sur la part au-dessus de $${nb(S2)}$ €.`;
    const tranche = R <= S1 ? 0 : R <= S2 ? t1 : t2;
    if (t === "marginal") {
      const ch = choix4(`$${tranche}\\,\\%$`, [`$0\\,\\%$`, `$${t1}\\,\\%$`, `$${t2}\\,\\%$`, `$${nb(Math.round((I / R) * 1000) / 10)}\\,\\%$`].filter((s) => s !== `$${tranche}\\,\\%$`));
      return { enonce: `${bareme} Quel est le taux marginal (taux de la tranche la plus haute atteinte) pour un revenu de $${nb(R)}$ € ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Le taux marginal est celui qui s'applique au dernier euro gagné.", `Dans quelle tranche se trouve $${nb(R)}$ € ?`, `Les seuils sont $${nb(S1)}$ € et $${nb(S2)}$ €.`],
        solution: `$${nb(R)}$ € est ${R <= S1 ? `sous $${nb(S1)}$ €` : R <= S2 ? `entre $${nb(S1)}$ € et $${nb(S2)}$ €` : `au-dessus de $${nb(S2)}$ €`} : le taux marginal est $${tranche}\\,\\%$. Cela ne veut pas dire que tout le revenu est imposé à ce taux.` };
    }
    if (t === "moyen") {
      if (I === 0) return GEN["qd-impot"]();
      const tm = (I / R) * 100, att = Math.round(tm * 10) / 10, exact = Math.abs(att - tm) < 1e-9;
      return { enonce: `${bareme} Pour un revenu de $${nb(R)}$ €, l'impôt est de $${nb(I)}$ €. Quel est le taux moyen d'imposition (impôt divisé par revenu), en pourcentage${exact ? "" : " (arrondi au dixième)"} ?`, mode: "nombre", prefixe: "Taux moyen :", attendu: att, suffixe: "%", tolerance: exact ? undefined : 0.05,
        erreurs: [{ valeur: tranche, message: "Ça, c'est le taux marginal. Le taux moyen compare l'impôt total au revenu total." }, { valeur: arr(I / R, 4), message: "Multiplie par $100$." }],
        aides: ["Taux moyen $= \\dfrac{\\text{impôt}}{\\text{revenu}}$.", `$\\dfrac{${nb(I)}}{${nb(R)}}$.`, "Exprime-le en pourcentage."],
        solution: `$\\dfrac{${nb(I)}}{${nb(R)}} \\times 100 ${exact ? "=" : "\\approx"} ${nb(att)}$ : taux moyen ${exact ? "de" : "d'environ"} $${nb(att)}\\,\\%$, plus petit que le taux marginal de $${tranche}\\,\\%$.` };
    }
    const det = R <= S1 ? `$${nb(R)}$ € est sous le premier seuil : impôt nul, soit $0$ €.` : R <= S2 ? `Seule la part au-dessus de $${nb(S1)}$ € est imposée : $(${nb(R)} - ${nb(S1)}) \\times ${nb(t1 / 100)} = ${nb(I)}$ €.` : `Tranche à $${t1}\\,\\%$ : $(${nb(S2)} - ${nb(S1)}) \\times ${nb(t1 / 100)} = ${nb(arr((S2 - S1) * t1 / 100))}$ € ; tranche à $${t2}\\,\\%$ : $(${nb(R)} - ${nb(S2)}) \\times ${nb(t2 / 100)} = ${nb(arr((R - S2) * t2 / 100))}$ €. Total : $${nb(I)}$ €.`;
    return { enonce: `${bareme} Calcule l'impôt pour un revenu de $${nb(R)}$ €.`, mode: "nombre", prefixe: "Impôt :", attendu: I, suffixe: "€",
      erreurs: [{ valeur: arr(R * tranche / 100), message: "Chaque taux ne s'applique qu'à la **part** du revenu située dans sa tranche, pas à tout le revenu." }, { valeur: arr((R - S1) * tranche / 100), message: "Calcule tranche par tranche : chaque tranche a son taux." }],
      aides: ["On découpe le revenu en tranches ; chaque part est imposée à son taux.", `Seuils : $${nb(S1)}$ € et $${nb(S2)}$ €.`, R <= S1 ? "Le revenu ne dépasse pas le premier seuil." : "Additionne l'impôt de chaque tranche."],
      solution: det };
  });

  def("qd-modeliser", () => {
    const S = pick([
      { ctx: (p, m) => `Un taxi facture $${nb(p)}$ € de prise en charge puis $${nb(m)}$ € par km. On note $f(x)$ le prix d'une course de $x$ km.`, p: () => pick([2, 3, 4, 5]), m: () => pick([1.2, 1.5, 2, 2.5]), v: "x", unite: "km", grand: "prix", seuilU: "€" },
      { ctx: (p, m) => `En $2000$, le niveau moyen des océans était à $${nb(p)}$ mm au-dessus d'un repère et il monte d'environ $${nb(m)}$ mm par an. On note $f(x)$ ce niveau $x$ années après $2000$.`, p: () => pick([20, 30, 40, 50]), m: () => pick([3, 3.5, 4]), v: "x", unite: "années", grand: "niveau", seuilU: "mm" },
      { ctx: (p, m) => `Une citerne contient $${nb(p)}$ L et on y puise $${nb(-m)}$ L par jour. On note $f(x)$ le volume restant après $x$ jours.`, p: () => pick([800, 1000, 1200, 1500]), m: () => -pick([20, 25, 40, 50]), v: "x", unite: "jours", grand: "volume", seuilU: "L" },
      { ctx: (p, m) => `Un forfait téléphonique coûte $${nb(p)}$ € par mois plus $${nb(m)}$ € par giga supplémentaire. On note $f(x)$ le prix pour $x$ gigas supplémentaires.`, p: () => pick([10, 12, 15, 20]), m: () => pick([2, 3, 5]), v: "x", unite: "gigas", grand: "prix", seuilU: "€" }
    ]);
    const p = S.p(), m = S.m(), t = pick(["expr", "valeur", "seuil"]);
    if (t === "expr") {
      const ch = choix4(`$f(x) = ${aff(m, p)}$`, [`$f(x) = ${aff(p, m)}$`, `$f(x) = ${aff(-m, p)}$`, `$f(x) = ${nb(p)} \\times ${nb(m)}^x$`, `$f(x) = ${aff(m + p, 0)}$`]);
      return { enonce: `${S.ctx(p, m)} Quelle est l'expression de $f(x)$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["La grandeur varie de la même quantité pour chaque unité : modèle affine $f(x) = mx + p$.", `$p$ est la valeur de départ ($x = 0$) : $${nb(p)}$.`, `$m$ est la variation par unité : $${nb(m)}$.`],
        solution: `Valeur de départ $${nb(p)}$, variation $${nb(m)}$ par unité : $f(x) = ${aff(m, p)}$.` };
    }
    if (t === "valeur") {
      const x = pick([3, 5, 8, 10, 12, 15, 20]), v = arr(m * x + p);
      return { enonce: `${S.ctx(p, m)} Calcule $f(${x})$.`, mode: "nombre", prefixe: `$f(${x}) =$`, attendu: v,
        erreurs: [{ valeur: arr(m * x), message: "N'oublie pas la valeur de départ." }, { valeur: arr((m + p) * x), message: "Seule la partie variable est multipliée par $x$." }],
        aides: [`$f(x) = ${aff(m, p)}$.`, `Remplace $x$ par $${x}$.`, `$${nb(m)} \\times ${x} ${plus(p)}$.`], solution: `$f(${x}) = ${nb(m)} \\times ${x} ${plus(p)} = ${nb(v)}$.` };
    }
    const k = m > 0 ? arr(p + m * rand(5, 30) + (m === Math.round(m) ? 0.5 : 0.3)) : arr(p + m * rand(5, 20) - 7);
    const xs = (k - p) / m, n = m > 0 ? Math.floor(xs) + 1 : Math.floor(xs) + 1;
    if (n <= 0 || k <= 0 || Math.abs(xs - Math.round(xs)) < 1e-9) return GEN["qd-modeliser"]();
    const sens = m > 0 ? "dépasse" : "passe sous";
    return { enonce: `${S.ctx(p, m)} À partir de quelle valeur entière de $x$ le ${S.grand} ${sens} $${nb(k)}$ ${S.seuilU} ?`, mode: "nombre", prefixe: "$x =$", attendu: n,
      erreurs: [{ valeur: n - 1, message: `Pour $x = ${n - 1}$, $f(${n - 1}) = ${nb(arr(m * (n - 1) + p))}$ : pas encore.` }, { valeur: Math.round(xs * 100) / 100, message: "On demande un nombre entier : prends le premier entier qui convient." }],
      aides: [`$f(x) = ${aff(m, p)}$.`, `Résous $${aff(m, p)} ${m > 0 ? ">" : "<"} ${nb(k)}$.`, m > 0 ? `$x > \\dfrac{${nb(arr(k - p))}}{${nb(m)}}$.` : `En divisant par $${nb(m)}$, négatif, on change le sens de l'inégalité.`],
      solution: `$${aff(m, p)} ${m > 0 ? ">" : "<"} ${nb(k)}$ équivaut à $x > \\dfrac{${nb(arr(k - p))}}{${nb(m)}} \\approx ${nb(Math.round(xs * 100) / 100)}$. Le premier entier est $x = ${n}$ : $f(${n}) = ${nb(arr(m * n + p))}$.` };
  });

  def("qd-vrai-faux", () => vraiFaux4([
    ["La fonction $f(x) = -2x + 7$ est décroissante.", true, "son coefficient directeur $-2$ est négatif."],
    ["Pour une fonction affine, $\\dfrac{f(b) - f(a)}{b - a}$ est le même pour tous $a \\neq b$.", true, "c'est le coefficient directeur."],
    ["La droite représentant $f(x) = 3x - 1$ coupe l'axe des ordonnées en $-1$.", true, "$f(0) = -1$."],
    ["$F = 1{,}8C + 32$ : $20$ °C font $68$ °F.", true, "$1{,}8 \\times 20 + 32 = 68$."],
    ["La suite $u(n) = 5n + 2$ prend les valeurs de la fonction $f(x) = 5x + 2$ aux entiers.", true, "$u(n) = f(n)$."],
    ["Avec un barème par tranches, le taux moyen est inférieur ou égal au taux marginal.", true, "les premières tranches sont moins taxées."],
    ["Au prix d'équilibre, l'offre est égale à la demande.", true, "c'est sa définition."],
    ["La fonction $f(x) = 4 - 3x$ est croissante car $4 > 0$.", false, "c'est le coefficient de $x$, $-3$, qui compte : elle est décroissante."],
    ["Si $f(1) = 5$ et $f(3) = 9$, le coefficient directeur vaut $4$.", false, "$\\dfrac{9 - 5}{3 - 1} = 2$."],
    ["Avec un taux marginal de $30\\,\\%$, on paie $30\\,\\%$ d'impôt sur tout son revenu.", false, "seule la part dans la tranche la plus haute est taxée à $30\\,\\%$."],
    ["$f(x) = x^2 + 1$ est une fonction affine.", false, "il y a un $x^2$ : ce n'est pas de la forme $mx + p$."],
    ["Pour convertir des °F en °C, on calcule $1{,}8F + 32$.", false, "on résout $1{,}8C + 32 = F$ : $C = \\dfrac{F - 32}{1{,}8}$."]
  ], ["Fonction affine $f(x) = mx + p$ : $m$ donne le sens de variation, $p = f(0)$.", "Taux d'accroissement $= \\dfrac{f(b) - f(a)}{b - a}$.", "Barème par tranches : chaque taux s'applique à sa tranche seulement."]));

  /* Figures du cours (chapitre 10) */
  FIGURES["qd-cours-equilibre"] = () => graph({ xmin: -0.8, xmax: 12.5, ymin: -20, ymax: 330, xstep: 1, ystep: 50, xetiq: 2, h: 260, curves: [{ f: (x) => 20 * x, a: 0, b: 12, label: "offre", closed: false }, { f: (x) => 300 - 10 * x, a: 0, b: 12, label: "demande", closed: false }], points: [{ x: 10, y: 200, label: "équilibre" }], xlabel: "prix", aria: "Offre 20x croissante et demande 300 − 10x décroissante : elles se coupent au prix 10 pour une quantité de 200" });
  FIGURES["qd-cours-impot"] = () => graph({ xmin: -2, xmax: 42, ymin: -400, ymax: 5200, xstep: 5, ystep: 1000, xetiq: 10, h: 260, curves: [{ f: (x) => (x <= 10 ? 0 : x <= 25 ? (x - 10) * 100 : 1500 + (x - 25) * 300), a: 0, b: 40, closed: false }], points: [{ x: 10, y: 0, label: "10" }, { x: 25, y: 1500, label: "25" }], xlabel: "revenu (k€)", ylabel: "impôt (€)", aria: "Impôt en fonction du revenu en milliers d'euros : nul jusqu'à 10, pente 10 % jusqu'à 25, puis pente 30 %" });

  /* ---------- Chapitre 11 : fonctions polynômes de degré 2 (préfixe qq) ---------- */
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

  def("qq-allure", () => {
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

  def("qq-sommet", () => {
    const P = paraboleF(), t = pick(["axe", "axe", "ordonnee", "symetrie", "variations"]);
    if (t === "symetrie") {
      const a = pick([1, 1, 2, -1, -2, 3]), b = nz2(-9, 9), c = rand(-6, 6);
      const h = -b / (2 * a), fr2 = !Number.isInteger(h * 100);
      if (!Number.isInteger(h * 4)) return GEN["qq-sommet"]();
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

  def("qq-racines", () => {
    const P = paraboleF(), t = pick(["fact", "fact", "graph", "verifier"]);
    if (t === "verifier") {
      const cands = [P.x1, P.x2, P.x1 - 1, P.x2 + 1, 0, P.x1 + P.x2].filter((x, i, A) => A.indexOf(x) === i);
      const bon = pick([P.x1, P.x2]), faux = cands.filter((x) => x !== P.x1 && x !== P.x2);
      const ch = choix4(`$${nb(bon)}$`, faux.map((x) => `$${nb(x)}$`));
      const dev = poly(P.dev.map((c) => (Number.isInteger(c) ? c : c)));
      if (!Number.isInteger(P.a)) return GEN["qq-racines"]();
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

  const gen_qq_factoriser = (types) => function gen() {
    const t = pick(types);
    const P = paraboleF();
    if (!Number.isInteger(P.a)) return gen();
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
  };
  def("qq-factoriser", gen_qq_factoriser(["autre-racine", "autre-racine", "forme", "developper"]));
  def("qq-formes", gen_qq_factoriser(["developper","forme","forme"]));

  def("qq-signe", () => {
    const P = paraboleF(), t = pick(["intervalle", "intervalle", "valeur", "graph"]);
    const ext = P.a > 0;
    const fig = tabSigne(["−∞", nbS(P.x1), nbS(P.x2), "+∞"], [ext ? "+" : "-", "0", ext ? "-" : "+", "0", ext ? "+" : "-"], "f(x)");
    const dehors = `$]-\\infty\\,;${nb(P.x1)}] \\cup [${nb(P.x2)}\\,;+\\infty[$`, dedans = `$[${nb(P.x1)}\\,;${nb(P.x2)}]$`;
    if (t === "valeur") {
      const x = pick([P.x1 - rand(1, 3), rand(P.x1 + 1, P.x2 - 1), P.x2 + rand(1, 3)].filter((v) => Number.isInteger(v) && v > P.x1 - 4 && v < P.x2 + 4 && v !== P.x1 && v !== P.x2));
      if (x === undefined) return GEN["qq-signe"]();
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

  def("qq-modeliser", () => {
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

  def("qq-vrai-faux", () => vraiFaux4([
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
    ["Pour trouver les racines d'un polynôme de degré $2$, il faut toujours calculer le discriminant.", false, "avec la forme factorisée, pas besoin (le discriminant n'est pas au programme)."],
    ["$f(x) = (x - 1)(x - 5)$ est positif pour $x = 3$.", false, "$3$ est entre les racines : $f(3) = (2)(-2) = -4 < 0$."],
    ["La parabole de $f(x) = 2(x - 1)(x - 5)$ a pour axe de symétrie $x = 2$.", false, "l'axe passe au milieu des racines : $x = 3$ (le coefficient $2$ ne compte pas)."]
  ], ["Signe de $a$ : orientation ; racines : où la courbe coupe l'axe des abscisses.", "Axe de symétrie au milieu des racines.", "Signe de $a$ à l'extérieur des racines, contraire entre."]));

  /* Figures du cours (chapitre 11) */
  FIGURES["qq-cours-orientation"] = () => graph({ xmin: -3.6, xmax: 3.6, ymin: -5.6, ymax: 5.6, h: 280, curves: [{ f: (x) => 0.5 * x * x, a: -3.2, b: 3.2, label: "a > 0", closed: false }, { f: (x) => -0.5 * x * x, a: -3.2, b: 3.2, label: "a < 0", closed: false }], points: [{ x: 0, y: 0, label: "sommet (0 ; 0)" }], aria: "Deux paraboles de sommet l'origine : y = 0,5x² tournée vers le haut, y = −0,5x² tournée vers le bas" });
  FIGURES["qq-cours-factorisee"] = () => graph({ xmin: -2.6, xmax: 6.6, ymin: -5.6, ymax: 6.6, h: 300, curves: [{ f: (x) => (x - 1) * (x - 5), a: -0.4, b: 6.4, label: "y = (x − 1)(x − 5)", closed: false }], points: [{ x: 1, y: 0, label: "1", gauche: true }, { x: 5, y: 0, label: "5" }, { x: 3, y: -4, label: "sommet (3 ; −4)" }], hlines: [], aria: "Parabole y = (x − 1)(x − 5) : racines 1 et 5, axe de symétrie x = 3, sommet (3 ; −4)" });
  FIGURES["qq-cours-signe"] = () => tabSigne(["−∞", "1", "5", "+∞"], ["+", "0", "−", "0", "+"], "", [["x − 1", ["−", "0", "+", "", "+"]], ["x − 5", ["−", "", "−", "0", "+"]], ["f(x)", ["+", "0", "−", "0", "+"]]]);
  FIGURES["qq-cours-trajectoire"] = () => graph({ xmin: -0.5, xmax: 4.7, ymin: -1.5, ymax: 22, xstep: 0.5, ystep: 2, xetiq: 1, yetiq: 4, h: 280, xlabel: "t (s)", ylabel: "h (m)", curves: [{ f: (t) => -5 * t * t + 20 * t, a: 0, b: 4, closed: false }], points: [{ x: 2, y: 20, label: "max 20 m à t = 2 s" }, { x: 4, y: 0, label: "sol à t = 4 s", gauche: true }], aria: "Hauteur d'une balle h(t) = −5t² + 20t : maximum 20 m à 2 s, retour au sol à 4 s" });

  /* ---------- Chapitre 12 : suites géométriques, compléments (préfixe qg) ---------- */
  def("qg-interets", () => {
    const C0 = pick([500, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 10000]), tx = pick([1, 1.5, 2, 2.5, 3, 4, 5, 6]), q = cm(tx), t = pick(["terme", "terme", "gain", "comparer", "formule"]);
    const ctx = `${prenom()} place $${nb(C0)}$ € à intérêts composés au taux annuel de $${nb(tx)}\\,\\%$ : chaque année, les intérêts s'ajoutent au capital et rapportent à leur tour. On note $u(n)$ le capital après $n$ années.`;
    if (t === "formule") {
      const ch = choix4(`$u(n) = ${nb(C0)} \\times ${nb(q)}^n$`, [`$u(n) = ${nb(C0)} + ${nb(arr(C0 * tx / 100))}n$`, `$u(n) = ${nb(C0)} \\times ${nb(tx / 100)}^n$`, `$u(n) = ${nb(C0)} \\times ${nb(q)} \\times n$`]);
      return { enonce: `${ctx} Quelle formule donne $u(n)$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: [`Chaque année, le capital est multiplié par $1 + \\dfrac{${nb(tx)}}{100} = ${nb(q)}$.`, "C'est une suite géométrique de premier terme $u(0)$ et de raison $q$.", "$u(n) = u(0) \\times q^n$."],
        solution: `On multiplie chaque année par $${nb(q)}$ : suite géométrique, $u(n) = ${nb(C0)} \\times ${nb(q)}^n$. (La formule $${nb(C0)} + ${nb(arr(C0 * tx / 100))}n$ correspond aux intérêts **simples**.)` };
    }
    const n = rand(2, 12), v = C0 * q ** n, att = Math.round(v * 100) / 100;
    if (t === "gain") return { enonce: `${ctx} Quels intérêts ont été gagnés au total en $${n}$ ans (arrondis au centime) ?`, mode: "nombre", prefixe: "Intérêts :", attendu: Math.round((v - C0) * 100) / 100, suffixe: "€", tolerance: 0.005,
      erreurs: [{ valeur: att, message: "Ça, c'est le capital final : retire le capital de départ." }, { valeur: arr(C0 * tx / 100 * n), message: "Ça, ce seraient des intérêts simples. Ici les intérêts produisent eux-mêmes des intérêts." }],
      aides: [`$u(${n}) = ${nb(C0)} \\times ${nb(q)}^{${n}}$.`, `$u(${n}) \\approx ${nb(att)}$ €.`, "Intérêts gagnés $= u(n) - u(0)$."], solution: `$u(${n}) = ${nb(C0)} \\times ${nb(q)}^{${n}} \\approx ${nb(att)}$ €, donc les intérêts valent $${nb(att)} - ${nb(C0)} \\approx ${nb(Math.round((v - C0) * 100) / 100)}$ €.` };
    if (t === "comparer") {
      const simple = arr(C0 * (1 + tx / 100 * n)), d = Math.round((v - simple) * 100) / 100;
      return { enonce: `${ctx} Avec des intérêts **simples** et le même taux, on aurait $${nb(simple)}$ € après $${n}$ ans. De combien les intérêts composés rapportent-ils de plus (arrondi au centime) ?`, mode: "nombre", prefixe: "Écart :", attendu: d, suffixe: "€", tolerance: 0.005,
        erreurs: [{ valeur: att, message: "Ça, c'est le capital avec intérêts composés : compare-le au capital avec intérêts simples." }, { valeur: 0, message: "Les intérêts composés rapportent plus : les intérêts produisent des intérêts." }],
        aides: [`Intérêts composés : $u(${n}) = ${nb(C0)} \\times ${nb(q)}^{${n}}$.`, `$u(${n}) \\approx ${nb(att)}$ €.`, `Écart : $${nb(att)} - ${nb(simple)}$.`], solution: `$${nb(C0)} \\times ${nb(q)}^{${n}} \\approx ${nb(att)}$ €, soit $${nb(att)} - ${nb(simple)} \\approx ${nb(d)}$ € de plus qu'avec des intérêts simples.` };
    }
    return { enonce: `${ctx} Calcule $u(${n})$, arrondi au centime.`, mode: "nombre", prefixe: `$u(${n}) =$`, attendu: att, suffixe: "€", tolerance: 0.005,
      erreurs: [{ valeur: arr(C0 * (1 + tx / 100 * n)), message: "Ça, ce sont des intérêts simples. En intérêts composés on **multiplie** chaque année par $" + nb(q) + "$." }, { valeur: Math.round(C0 * q ** (n - 1) * 100) / 100, message: `C'est $u(${n - 1})$ : il faut $${n}$ multiplications.` }, { valeur: Math.round(C0 * q * n * 100) / 100, message: "$q^n$ n'est pas $q \\times n$." }],
      aides: [`Raison : $q = 1 + \\dfrac{${nb(tx)}}{100} = ${nb(q)}$.`, `$u(${n}) = ${nb(C0)} \\times ${nb(q)}^{${n}}$.`, "Calcule à la calculatrice puis arrondis au centime."],
      solution: `$u(${n}) = ${nb(C0)} \\times ${nb(q)}^{${n}} \\approx ${nb(att)}$ €.` };
  });

  def("qg-tableur", () => {
    const u0 = pick([100, 200, 500, 1000, 1500, 2000, 5000]), tx = pick([-20, -10, -5, -2, 2, 3, 4, 5, 8, 10, 20]), q = cm(tx), t = pick(["recurrence", "recurrence", "explicite", "valeur"]);
    const tab = { lignes: [["", "A", "B"], ["1", "n", "u(n)"], ["2", "0", String(u0)], ["3", "1", "?"], ["4", "2", ""]] };
    const qT = String(q).replace(".", ",");
    const ctx = `Une grandeur vaut $${nb(u0)}$ au départ et ${tx > 0 ? "augmente" : "diminue"} de $${Math.abs(tx)}\\,\\%$ par an. On calcule ses valeurs successives $u(n)$ dans un tableur (rangs en colonne A).`;
    if (t === "valeur") {
      const k = rand(3, 8), v = u0 * q ** k, att = Math.round(v * 100) / 100;
      return { enonce: `${ctx} On a saisi $\\texttt{=B2*${qT}}$ en B3, recopié vers le bas. Quel nombre s'affiche en B${k + 2} (arrondi au centième) ?`, tableau: tab, mode: "nombre", prefixe: `B${k + 2} :`, attendu: att, tolerance: 0.005,
        erreurs: [{ valeur: Math.round(u0 * q ** (k + 1) * 100) / 100, message: `B${k + 2} correspond au rang $${k}$ : B2 est le rang $0$.` }, { valeur: Math.round(u0 * q ** (k - 1) * 100) / 100, message: "Il faut autant de multiplications que le rang." }, { valeur: arr(u0 * (1 + tx / 100 * k)), message: "On multiplie par $" + nb(q) + "$ à chaque ligne : ce n'est pas une suite arithmétique." }],
        aides: [`La formule multiplie la cellule du dessus par $${nb(q)}$ : suite géométrique de raison $${nb(q)}$.`, `B${k + 2} contient $u(${k}) = ${nb(u0)} \\times ${nb(q)}^{${k}}$.`, "Calcule et arrondis au centième."],
        solution: `$u(${k}) = ${nb(u0)} \\times ${nb(q)}^{${k}} \\approx ${nb(att)}$.` };
    }
    if (t === "explicite") {
      const bonne = `=${u0}*PUISSANCE(${qT};A3)`;
      const ch = choix4(`$\\texttt{${bonne}}$`, [`=${u0}*${qT}*A3`, `=B2*PUISSANCE(${qT};A3)`, `=${u0}+PUISSANCE(${qT};A3)`].map((f) => `$\\texttt{${f}}$`));
      return { enonce: `${ctx} Quelle formule saisir en B3 pour calculer $u(1)$ directement à partir du rang écrit en A3 (formule explicite), puis la recopier vers le bas ?`, tableau: tab, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: [`Suite géométrique : $u(n) = ${nb(u0)} \\times ${nb(q)}^n$.`, "Le rang $n$ de la ligne 3 est en A3.", "Dans un tableur, $\\texttt{PUISSANCE(a;n)}$ calcule $a$ puissance $n$."],
        solution: `$u(n) = ${nb(u0)} \\times ${nb(q)}^n$ s'écrit $\\texttt{${bonne}}$ : $\\texttt{PUISSANCE(${qT};A3)}$ calcule $${nb(q)}$ puissance le rang écrit en A3.` };
    }
    const bonne = `=B2*${qT}`;
    const ch = choix4(`$\\texttt{${bonne}}$`, [`=B2+${qT}`, `=B2*${Math.abs(tx)}`, `=B2*${String(Math.abs(tx) / 100).replace(".", ",")}`, `=B2${tx > 0 ? "+" : "-"}${Math.abs(tx)}`].map((f) => `$\\texttt{${f}}$`));
    return { enonce: `${ctx} Quelle formule saisir en B3 (puis recopier vers le bas) pour calculer chaque valeur à partir de la précédente ?`, tableau: tab, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [`${tx > 0 ? "Augmenter" : "Diminuer"} de $${Math.abs(tx)}\\,\\%$, c'est multiplier par $${nb(q)}$.`, "Le terme précédent de B3 est en B2.", "Relation : $u(n + 1) = q \\times u(n)$."],
      solution: `On multiplie la valeur précédente par $${nb(q)}$ : $\\texttt{${bonne}}$ en B3. Recopiée, elle devient $\\texttt{=B3*${qT}}$ en B4, etc.` };
  });

  // Motif évolutif : triangle de Sierpinski (nombre de triangles colorés multiplié par 3 à chaque étape)
  function figSierpinski(n) {
    const W = 320, H = 150, tri = (x, y, c, k) => { if (k === 0) return `<path d="M${x.toFixed(1)} ${(y + c * 0.866).toFixed(1)} L${(x + c).toFixed(1)} ${(y + c * 0.866).toFixed(1)} L${(x + c / 2).toFixed(1)} ${y.toFixed(1)} Z" style="fill:var(--lagon);fill-opacity:0.6;stroke:var(--surface);stroke-width:0.6"/>`; const d = c / 2; return tri(x, y + d * 0.866, d, k - 1) + tri(x + d, y + d * 0.866, d, k - 1) + tri(x + d / 2, y, d, k - 1); };
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="Triangle de Sierpinski aux étapes 0, 1 et 2 : 1, 3 et 9 triangles colorés">`;
    [0, 1, 2].forEach((k) => { s += tri(10 + k * 104, 18, 96, k) + `<text class="g-label" x="${58 + k * 104}" y="${H - 6}" text-anchor="middle">étape ${k}</text>`; });
    return s + `</svg>`;
  }
  def("qg-sierpinski", () => {
    const t = pick(["nombre", "cote", "aire", "seuil"]), fig = figSierpinski();
    const debut = "On construit le triangle de Sierpinski : à chaque étape, chaque triangle coloré est partagé en $4$ triangles égaux et on retire celui du milieu. On note $u(n)$ le nombre de triangles colorés à l'étape $n$, avec $u(0) = 1$.";
    if (t === "nombre") {
      const n = rand(3, 9);
      return { enonce: `${debut} Combien y a-t-il de triangles colorés à l'étape $${n}$ ?`, figure: fig, mode: "nombre", prefixe: `$u(${n}) =$`, attendu: 3 ** n,
        erreurs: [{ valeur: 1 + 2 * n, message: "On ne rajoute pas $2$ triangles : chaque triangle en donne $3$. On **multiplie** par $3$." }, { valeur: 3 * n, message: "$u(n) = 3^n$, pas $3 \\times n$." }, { valeur: 3 ** (n - 1), message: `C'est $u(${n - 1})$.` }],
        aides: ["Étape $0$ : $1$ ; étape $1$ : $3$ ; étape $2$ : $9$.", "Chaque triangle coloré donne $3$ triangles colorés : suite géométrique de raison $3$.", `$u(${n}) = 3^{${n}}$.`], solution: `$u(n) = 1 \\times 3^n$, donc $u(${n}) = 3^{${n}} = ${nb(3 ** n)}$.` };
    }
    if (t === "aire") {
      const A = pick([1, 2, 4, 5, 8, 10, 20, 50, 100]), n = rand(2, 6), a = A * 0.75 ** n, att = Math.round(a * 1000) / 1000, exact = Math.abs(att - a) < 1e-9;
      return { enonce: `${debut} L'aire colorée est multipliée par $\\dfrac{3}{4}$ à chaque étape. Si le grand triangle a une aire de $${A}$ dm², quelle est l'aire colorée à l'étape $${n}$ (en dm²${exact ? "" : ", arrondie au millième"}) ?`, figure: fig, mode: "nombre", prefixe: "Aire :", attendu: att, suffixe: "dm²", tolerance: exact ? undefined : 0.0005,
        erreurs: [{ valeur: arr(A * (1 - 0.25 * n), 6), message: "On ne retire pas $\\dfrac{1}{4}$ du triangle de départ à chaque fois : on multiplie l'aire restante par $\\dfrac{3}{4}$." }, { valeur: Math.round(A * 0.75 ** (n - 1) * 1000) / 1000, message: `C'est l'étape $${n - 1}$.` }],
        aides: ["L'aire colorée forme une suite géométrique de raison $0{,}75$.", `Aire à l'étape $n$ : $${A} \\times 0{,}75^n$.`, `$${A} \\times 0{,}75^{${n}}$.`], solution: `$${A} \\times 0{,}75^{${n}} ${exact ? "=" : "\\approx"} ${nb(att)}$ dm².` };
    }
    if (t === "cote") {
      const L = pick([4, 8, 10, 12, 16, 20, 24, 30, 32, 40, 48, 64]), n = rand(1, 5), att = L / 2 ** n;
      return { enonce: `${debut} Le grand triangle (étape $0$) a des côtés de $${L}$ cm ; à chaque étape, le côté des petits triangles est divisé par $2$. Quelle est la longueur du côté des triangles colorés à l'étape $${n}$ ?`, figure: fig, mode: "nombre", prefixe: "Côté :", attendu: att, suffixe: "cm",
        erreurs: [{ valeur: arr(L - 2 * n, 6), message: "On ne retire pas $2$ cm : on **divise** par $2$ à chaque étape." }, { valeur: L / 2 ** (n - 1), message: `C'est l'étape $${n - 1}$.` }, { valeur: arr(L / (2 * n), 6), message: "Diviser $" + n + "$ fois par $2$, c'est diviser par $2^{" + n + "}$, pas par $2 \\times " + n + "$." }],
        aides: ["Le côté forme une suite géométrique de raison $\\dfrac{1}{2}$.", `Côté à l'étape $n$ : $${L} \\times 0{,}5^n$.`, `$${L} \\times 0{,}5^{${n}} = \\dfrac{${L}}{2^{${n}}}$.`], solution: `$${L} \\times 0{,}5^{${n}} = \\dfrac{${L}}{${2 ** n}} = ${nb(att)}$ cm.` };
    }
    const N = pick([100, 500, 1000, 5000, 10000, 100000]); let n = 0; while (3 ** n <= N) n++;
    return { enonce: `${debut} À partir de quelle étape y a-t-il plus de $${nb(N)}$ triangles colorés ?`, figure: fig, mode: "nombre", prefixe: "Étape", attendu: n,
      erreurs: [{ valeur: n - 1, message: `$3^{${n - 1}} = ${nb(3 ** (n - 1))}$ : pas encore plus de $${nb(N)}$.` }, { valeur: 3 ** n, message: "On demande le numéro de l'étape, pas le nombre de triangles." }],
      aides: ["$u(n) = 3^n$.", "Calcule les puissances de $3$ : $3$, $9$, $27$, $81$, $243$…", `Cherche le premier $n$ tel que $3^n > ${nb(N)}$.`], solution: `$3^{${n - 1}} = ${nb(3 ** (n - 1))} \\leqslant ${nb(N)}$ et $3^{${n}} = ${nb(3 ** n)} > ${nb(N)}$ : à partir de l'étape $${n}$.` };
  });

  /* Figures du cours (chapitre 12) */
  FIGURES["qg-cours-sierpinski"] = () => figSierpinski();

  /* ---------- Chapitre 13 : fonctions exponentielles x ↦ aˣ (préfixe qe) ---------- */
  const r2 = (v) => Math.round(v * 100) / 100, r3 = (v) => Math.round(v * 1000) / 1000;
  const puisTex = (a, x) => `${a < 1 || !Number.isInteger(a) ? `${nb(a)}` : nb(a)}^{${nb(x)}}`;

  def("qe-calculer", () => {
    const a = pick([1.02, 1.05, 1.1, 1.2, 1.5, 2, 3, 0.5, 0.8, 0.9, 0.95, 1.08, 4, 10]), x = pick([0.5, 1.5, 2.5, 0.25, 0.75, 1.2, 2.4, 3.5, 0.3, 4.5]), v = a ** x, att = r2(v);
    if (Math.abs(att - v) < 1e-9 || att === 0) return GEN["qe-calculer"]();
    return { enonce: `À la calculatrice, donne une valeur approchée de $${puisTex(a, x)}$, arrondie au centième.`, mode: "nombre", prefixe: `$${puisTex(a, x)} \\approx$`, attendu: att, tolerance: 0.005,
      erreurs: [{ valeur: r2(a * x), message: `$${puisTex(a, x)}$ n'est pas $${nb(a)} \\times ${nb(x)}$ : c'est une puissance.` }, { valeur: r2(a ** Math.floor(x)), message: "L'exposant n'est pas entier : utilise la touche puissance de la calculatrice avec l'exposant exact." }, { valeur: r2(x ** a), message: "Attention à l'ordre : la base est $" + nb(a) + "$ et l'exposant $" + nb(x) + "$." }],
      aides: ["Touche puissance : « ^ » ou « xʸ » selon la calculatrice.", `Tape ${nbS(a)} ^ ${nbS(x)}.`, `Arrondis au centième.`],
      solution: `$${puisTex(a, x)} \\approx ${nb(r3(v))}$, soit $${nb(att)}$ au centième.${a > 1 ? ` Comme $${nb(a)} > 1$, on trouve un nombre entre $${puisTex(a, Math.floor(x))} = ${nb(r3(a ** Math.floor(x)))}$ et $${puisTex(a, Math.ceil(x))} = ${nb(r3(a ** Math.ceil(x)))}$.` : ""}` };
  });

  def("qe-proprietes", () => {
    const a = pick([2, 3, 5, 1.5, 0.5, 1.2, 10, 0.8, 7]), A = nb(a);
    const x = pick([0.5, 1.5, 2.5, 1.2, 0.3, 3, 2, 0.7, 4]), y = pick([0.5, 1.5, 2, 0.4, 1, 3, 0.2, 2.5]);
    const t = pick(["produit", "produit", "puissance", "quotient", "meme-exposant"]);
    if ((t === "quotient" && x <= y) || (t === "puissance" && y === 1)) return GEN["qe-proprietes"]();
    let enonce, bonne, faux, regle;
    if (t === "produit") { enonce = `${A}^{${nb(x)}} \\times ${A}^{${nb(y)}}`; bonne = `${A}^{${nb(arr(x + y))}}`; faux = [`${A}^{${nb(arr(x * y))}}`, `${nb(arr(a * a))}^{${nb(arr(x + y))}}`, `${A}^{${nb(arr(Math.abs(x - y)))}}`]; regle = "a^x \\times a^y = a^{x + y}"; }
    else if (t === "puissance") { enonce = `\\left(${A}^{${nb(x)}}\\right)^{${nb(y)}}`; bonne = `${A}^{${nb(arr(x * y))}}`; faux = [`${A}^{${nb(arr(x + y))}}`, `${A}^{${nb(arr(Math.abs(x - y) || x * y + 1))}}`, `${nb(arr(a * y))}^{${nb(x)}}`]; regle = "\\left(a^x\\right)^y = a^{xy}"; }
    else if (t === "quotient") { enonce = `\\dfrac{${A}^{${nb(x)}}}{${A}^{${nb(y)}}}`; bonne = `${A}^{${nb(arr(x - y))}}`; faux = [`${A}^{${nb(arr(x * y))}}`, `${A}^{${nb(arr(x + y))}}`, `1^{${nb(arr(x - y))}}`]; regle = "\\dfrac{a^x}{a^y} = a^{x - y}"; }
    else { const b = pick([2, 3, 4, 5, 0.5]); if (b === a) return GEN["qe-proprietes"](); enonce = `${A}^{${nb(x)}} \\times ${nb(b)}^{${nb(x)}}`; bonne = `${nb(arr(a * b))}^{${nb(x)}}`; faux = [`${nb(arr(a * b))}^{${nb(arr(2 * x))}}`, `${nb(arr(a + b))}^{${nb(x)}}`, `${A}^{${nb(arr(x * b))}}`]; regle = "a^x \\times b^x = (ab)^x"; }
    const ch = choix4(`$${bonne}$`, faux.filter((f) => f !== bonne).map((f) => `$${f}$`), (k) => `$${A}^{${nb(arr(x + y + k + 1))}}$`);
    return { enonce: `Écris plus simplement $${enonce}$.`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Les fonctions exponentielles ont les mêmes règles de calcul que les puissances entières.", t === "meme-exposant" ? "Même exposant : on multiplie les bases." : "Même base : on travaille sur les exposants.", `Règle : $${regle}$.`],
      solution: `$${regle}$, donc $${enonce} = ${bonne}$.` };
  });

  def("qe-racine", () => {
    const C = pick([[4, 2, 2], [9, 2, 3], [16, 2, 4], [25, 2, 5], [36, 2, 6], [49, 2, 7], [64, 2, 8], [81, 2, 9], [100, 2, 10], [144, 2, 12], [8, 3, 2], [27, 3, 3], [64, 3, 4], [125, 3, 5], [1000, 3, 10], [216, 3, 6], [16, 4, 2], [81, 4, 3], [625, 4, 5], [10000, 4, 10], [32, 5, 2], [243, 5, 3], [100000, 5, 10], [64, 6, 2], [128, 7, 2], [0.25, 2, 0.5], [0.01, 2, 0.1], [0.125, 3, 0.5], [0.001, 3, 0.1], [0.0625, 4, 0.5]]);
    const [a, n, r] = C, t = pick(["fraction", "fraction", "decimal", "puissance"]);
    if (t === "puissance") {
      const k = pick([2, 3]), att = arr(r ** k);
      return { enonce: `Calcule $${nb(a)}^{\\frac{${k}}{${n}}}$ sans calculatrice.`, mode: "nombre", prefixe: "Résultat :", attendu: att,
        erreurs: [{ valeur: r, message: `$${nb(a)}^{\\frac{1}{${n}}} = ${nb(r)}$, puis il faut l'élever à la puissance $${k}$.` }, { valeur: arr((a * k) / n, 6), message: "Une puissance n'est pas un produit." }],
        aides: [`$${nb(a)}^{\\frac{${k}}{${n}}} = \\left(${nb(a)}^{\\frac{1}{${n}}}\\right)^{${k}}$.`, `$${nb(a)}^{\\frac{1}{${n}}}$ est le nombre positif dont la puissance ${n}-ième vaut $${nb(a)}$ : c'est $${nb(r)}$.`, `$${nb(r)}^{${k}}$.`],
        solution: `$${nb(r)}^{${n}} = ${nb(a)}$, donc $${nb(a)}^{\\frac{1}{${n}}} = ${nb(r)}$ et $${nb(a)}^{\\frac{${k}}{${n}}} = ${nb(r)}^{${k}} = ${nb(att)}$.` };
    }
    const ex = t === "fraction" ? `\\frac{1}{${n}}` : nb(arr(1 / n, 6));
    if (t === "decimal" && !estDecimal(1 / n)) return GEN["qe-racine"]();
    return { enonce: `Calcule $${nb(a)}^{${ex}}$ sans calculatrice.`, mode: "nombre", prefixe: "Résultat :", attendu: r,
      erreurs: [{ valeur: arr(a / n, 6), message: `$${nb(a)}^{${ex}}$ n'est pas $\\dfrac{${nb(a)}}{${n}}$ : c'est le nombre positif dont la puissance ${n}-ième vaut $${nb(a)}$.` }, { valeur: a ** n < 1e7 ? arr(a ** n, 6) : NaN, message: "L'exposant est $\\dfrac{1}{" + n + "}$, pas $" + n + "$." }],
      aides: [`$\\left(${nb(a)}^{\\frac{1}{${n}}}\\right)^{${n}} = ${nb(a)}^{1} = ${nb(a)}$.`, `On cherche donc le nombre positif $r$ tel que $r^{${n}} = ${nb(a)}$.`, n === 2 ? "Pour l'exposant $\\dfrac{1}{2}$, c'est la racine carrée." : `Essaie $2$, $3$, $5$, $10$… ou des nombres comme $0{,}5$.`],
      solution: `$${nb(r)}^{${n}} = ${nb(a)}$, donc $${nb(a)}^{${ex}} = ${nb(r)}$${n === 2 ? ` (c'est $\\sqrt{${nb(a)}}$)` : ""}.` };
  });

  def("qe-variations", () => {
    const t = pick(["sens", "sens", "comparer", "signe-taux"]);
    if (t === "comparer") {
      const a = pick([1.05, 1.2, 1.5, 2, 3, 0.4, 0.5, 0.8, 0.9, 0.95]), x = pick([0.5, 1.2, 1.5, 2, 2.5, 3]), y = arr(x + pick([0.3, 0.5, 0.7, 1, 1.5]));
      const bonne = a > 1 ? `$${puisTex(a, x)} < ${puisTex(a, y)}$` : `$${puisTex(a, x)} > ${puisTex(a, y)}$`;
      const ch = choix4(bonne, [a > 1 ? `$${puisTex(a, x)} > ${puisTex(a, y)}$` : `$${puisTex(a, x)} < ${puisTex(a, y)}$`, `$${puisTex(a, x)} = ${puisTex(a, y)}$`, "on ne peut pas comparer sans calculatrice"]);
      return { enonce: `Sans calculatrice, compare $${puisTex(a, x)}$ et $${puisTex(a, y)}$.`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Utilise le sens de variation de la fonction $x \\mapsto a^x$.", `Ici $a = ${nb(a)}$ est ${a > 1 ? "supérieur" : "inférieur"} à $1$ : la fonction est ${a > 1 ? "croissante" : "décroissante"}.`, `$${nb(x)} < ${nb(y)}$.`],
        solution: `$${nb(a)} ${a > 1 ? ">" : "<"} 1$ : $x \\mapsto ${nb(a)}^x$ est ${a > 1 ? "croissante" : "décroissante"}. Comme $${nb(x)} < ${nb(y)}$, ${bonne}.` };
    }
    if (t === "signe-taux") {
      const tx = pick([-30, -20, -15, -10, -5, -2, 2, 3, 5, 8, 10, 25]), q = cm(tx), sens = tx > 0 ? "croissante" : "décroissante";
      const ch = choix4(sens, ["croissante", "décroissante", "constante", "croissante puis décroissante"].filter((s) => s !== sens));
      return { enonce: `Une grandeur ${tx > 0 ? "augmente" : "diminue"} de $${Math.abs(tx)}\\,\\%$ par an. On la modélise par $f(x) = ${pick([100, 500, 1000, 2000])} \\times ${nb(q)}^x$, avec $x \\geqslant 0$ en années. La fonction $f$ est :`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: [`${tx > 0 ? "Augmenter" : "Diminuer"} de $${Math.abs(tx)}\\,\\%$, c'est multiplier par $${nb(q)}$.`, `La base $${nb(q)}$ est ${q > 1 ? "supérieure" : "inférieure"} à $1$.`, "Le coefficient devant (positif) ne change pas le sens de variation."],
        solution: `$${nb(q)} ${q > 1 ? ">" : "<"} 1$ : $x \\mapsto ${nb(q)}^x$ est ${sens}, et la multiplier par un nombre positif garde ce sens. $f$ est **${sens}**.` };
    }
    const a = pick([0.2, 0.5, 0.6, 0.75, 0.9, 0.99, 1, 1.01, 1.1, 1.5, 2, 3, 5, 10]), sens = a > 1 ? "croissante" : a < 1 ? "décroissante" : "constante";
    const ch = choix4(`${sens} sur $[0\\,;+\\infty[$`, ["croissante", "décroissante", "constante", "décroissante puis croissante"].filter((s) => s !== sens).map((s) => `${s} sur $[0\\,;+\\infty[$`));
    return { enonce: `Quel est le sens de variation de la fonction $x \\mapsto ${nb(a)}^x$ sur $[0\\,;+\\infty[$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Compare la base $a$ à $1$.", "$a > 1$ : croissante ; $0 < a < 1$ : décroissante ; $a = 1$ : constante (égale à $1$).", `Ici $a = ${nb(a)}$.`],
      solution: a === 1 ? "$1^x = 1$ pour tout $x$ : la fonction est **constante**." : `$${nb(a)} ${a > 1 ? ">" : "<"} 1$ : la fonction est **${sens}**, comme la suite géométrique $${nb(a)}^n$ de même raison.` };
  });

  // Courbes de fonctions exponentielles sur [0 ; 3]
  def("qe-courbe", () => {
    const jeux = [[2, 3, 1.5, 0.5], [0.5, 0.8, 2, 1.5], [1.5, 2, 0.6, 3], [0.25, 0.5, 2, 4], [3, 0.5, 1.2, 2], [0.8, 2, 0.4, 1.5]];
    const B = shuffle(pick(jeux).slice()), cible = rand(0, 3), a = B[cible], noms = ["C₁", "C₂", "C₃", "C₄"];
    const ymax = Math.min(9, Math.max(...B.map((b) => b ** 3)));
    const fig = tiret(graph({ xmin: -0.3, xmax: 3.3, ymin: -0.4, ymax: ymax + 0.6, xstep: 0.5, ystep: 1, xetiq: 1, h: 300, curves: B.map((b, k) => { const xb = b > 1 ? Math.min(3, Math.log(ymax) / Math.log(b)) : 3; return { f: (x) => b ** x, a: 0, b: xb, label: noms[k], closed: false, couleur: k % 3, lx: xb }; }), aria: `Quatre courbes de fonctions x ↦ aˣ sur [0 ; 3] : ${B.map((b, k) => `${noms[k]} pour a = ${nbS(b)}`).join(", ")}` }), 3); // la 4e courbe en pointillés
    const ch = choix4(`$${noms[cible]}$`, noms.filter((_, k) => k !== cible).map((n) => `$${n}$`));
    return { enonce: `Les quatre courbes représentent des fonctions $x \\mapsto a^x$ sur $[0\\,;3]$, pour quatre valeurs de $a$. Laquelle représente $x \\mapsto ${nb(a)}^x$ ?`, figure: fig, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Toutes ces courbes passent par $(0\\,;1)$ car $a^0 = 1$.", `En $x = 1$, la courbe de $x \\mapsto a^x$ passe par $(1\\,;a)$ : cherche le point $(1\\,;${nb(a)})$.`, `${a > 1 ? "$a > 1$ : la courbe monte." : "$a < 1$ : la courbe descend."}`],
      solution: `La courbe de $x \\mapsto ${nb(a)}^x$ passe par $(0\\,;1)$ et $(1\\,;${nb(a)})$ ; elle ${a > 1 ? "monte" : "descend"}. C'est $${noms[cible]}$.` };
  });

  def("qe-taux-moyen", () => {
    const t = pick(["global", "global", "valeurs", "verifier"]);
    const tm = pick([1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, -2, -3, -5, -10]), n = pick([2, 3, 4, 5, 10]);
    const CMg = (1 + tm / 100) ** n, tg = (CMg - 1) * 100, tgA = Math.round(tg * 100) / 100;
    if (t === "verifier") {
      const tgR = Math.round(tg * 10) / 10, bonne = `$${tm > 0 ? "+" : ""}${nb(tm)}\\,\\%$ par an`;
      const tx = (v) => `$${v > 0 ? "+" : ""}${nb(v)}\\,\\%$ par an`;
      const ch = choix4(bonne, [Math.abs(tgR / n - tm) >= 0.25 ? tx(arr(tgR / n, 2)) : "", tx(tgR), tx(arr(2 * tm, 2)), tx(arr(tm / 2, 2))], (k) => tx(tm + (k + 1) * (tm > 0 ? 1 : -1)));
      return { enonce: `Sur $${n}$ ans, une grandeur a évolué de $${tgR > 0 ? "+" : ""}${nb(tgR)}\\,\\%$ au total (valeur arrondie). Quel est, environ, son taux d'évolution annuel moyen ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: [`Coefficient global : $1 ${tgR > 0 ? "+" : "-"} ${nb(Math.abs(tgR) / 100)}$.`, `Le coefficient moyen $c$ vérifie $c^{${n}} = ${nb(arr(1 + tgR / 100, 6))}$, donc $c = ${nb(arr(1 + tgR / 100, 6))}^{\\frac{1}{${n}}}$.`, "Les taux ne se divisent pas : $" + nb(tgR) + " \\div " + n + "$ donne une réponse fausse."],
        solution: `$${nb(arr(1 + tgR / 100, 6))}^{\\frac{1}{${n}}} \\approx ${nb(arr(1 + tm / 100, 4))}$ : taux moyen d'environ ${bonne}. Vérification : $${nb(1 + tm / 100)}^{${n}} \\approx ${nb(arr(CMg, 4))}$.` };
    }
    const V0 = pick([1000, 2000, 5000, 10000, 20000, 50000]);
    const V1 = t === "valeurs" ? Math.round(V0 * CMg) : null;
    const CMr = t === "valeurs" ? V1 / V0 : CMg, tmA = r2((CMr ** (1 / n) - 1) * 100);
    const debut = t === "valeurs" ? `Une population passe de $${nb(V0)}$ à $${nb(V1)}$ habitants en $${n}$ ans.` : `Un prix a ${tg > 0 ? "augmenté" : "baissé"} de $${nb(Math.abs(tgA))}\\,\\%$ en $${n}$ ans (coefficient multiplicateur global $${nb(arr(CMg, 6))}$).`;
    return { enonce: `${debut} Quel est le taux d'évolution annuel moyen, en pourcentage, arrondi au centième ?`, mode: "nombre", prefixe: "Taux moyen :", attendu: tmA, suffixe: "%", tolerance: 0.005,
      erreurs: [{ valeur: r2((CMr - 1) * 100 / n), message: "On ne divise pas le taux global par le nombre d'années : les évolutions se **multiplient**." }, { valeur: r2((CMr - 1) * 100), message: "Ça, c'est le taux global sur toute la période." }, { valeur: r2(CMr ** (1 / n)), message: "Ça, c'est le coefficient moyen : le taux est $(c - 1) \\times 100$." }],
      aides: [`Coefficient global : ${t === "valeurs" ? `$\\dfrac{${nb(V1)}}{${nb(V0)}}$` : `$${nb(arr(CMg, 6))}$`}.`, `Coefficient moyen $c$ : $c^{${n}} = $ coefficient global, donc $c = (\\text{coefficient global})^{\\frac{1}{${n}}}$.`, "Taux moyen $= (c - 1) \\times 100$."],
      solution: `${t === "valeurs" ? `Coefficient global : $\\dfrac{${nb(V1)}}{${nb(V0)}} \\approx ${nb(arr(CMr, 5))}$. ` : ""}$c = ${nb(arr(CMr, 6))}^{\\frac{1}{${n}}} \\approx ${nb(arr(CMr ** (1 / n), 5))}$, donc le taux moyen est d'environ $${nb(tmA)}\\,\\%$ par an.` };
  });

  def("qe-fraction", () => {
    const t = pick(["capital", "capital", "radio", "medicament"]);
    if (t === "radio") {
      const N0 = pick([1000, 2000, 5000, 8000, 10000, 40000]), T = pick([5, 8, 10, 12, 20, 30]), x = pick([0.5, 1.5, 2.5, 0.25, 0.75, 3.5]), d = arr(x * T), v = N0 * 0.5 ** x, att = Math.round(v);
      if (Math.abs(att - v) < 1e-9 && Number.isInteger(x)) return GEN["qe-fraction"]();
      return { enonce: `Un échantillon contient $${nb(N0)}$ noyaux radioactifs. Leur nombre est divisé par $2$ tous les $${T}$ ans (demi-vie) : après $t$ ans, il reste $${nb(N0)} \\times 0{,}5^{\\frac{t}{${T}}}$ noyaux. Combien en reste-t-il au bout de $${nb(d)}$ ans (arrondi à l'unité) ?`, mode: "nombre", prefixe: "Noyaux :", attendu: att, tolerance: 0.5,
        erreurs: [{ valeur: Math.round(N0 * (1 - 0.5 * x)), message: "La décroissance n'est pas linéaire : on utilise $0{,}5^{\\frac{t}{" + T + "}}$." }, { valeur: Math.round(N0 * 0.5 ** Math.floor(x)), message: "L'exposant $\\dfrac{" + nb(d) + "}{" + T + "} = " + nb(x) + "$ n'est pas entier : garde sa valeur exacte." }],
        aides: [`$\\dfrac{${nb(d)}}{${T}} = ${nb(x)}$ demi-vie(s).`, `$${nb(N0)} \\times 0{,}5^{${nb(x)}}$.`, "Calcule à la calculatrice, puis arrondis à l'unité."],
        solution: `$${nb(N0)} \\times 0{,}5^{${nb(x)}} \\approx ${nb(r2(v))}$ : il reste environ $${nb(att)}$ noyaux.` };
    }
    if (t === "medicament") {
      const D = pick([100, 200, 400, 500, 1000]), tx = pick([10, 15, 20, 25, 30]), q = cm(-tx), x = pick([0.5, 1.5, 2.5, 3.5, 4.5]), v = D * q ** x, att = r2(v / 1) ;
      return { enonce: `On injecte $${D}$ mg d'un médicament ; le corps en élimine $${tx}\\,\\%$ par heure, de sorte qu'il en reste $f(t) = ${D} \\times ${nb(q)}^t$ mg après $t$ heures. Quelle quantité reste-t-il au bout de $${nb(x)}$ h (en mg, arrondie au centième) ?`, mode: "nombre", prefixe: "Quantité :", attendu: att, suffixe: "mg", tolerance: 0.005,
        erreurs: [{ valeur: r2(D * (1 - tx / 100 * x)), message: "On ne retire pas $" + tx + "\\,\\%$ de la dose de départ à chaque heure : on multiplie par $" + nb(q) + "$." }, { valeur: r2(D * q ** Math.floor(x)), message: "Garde l'exposant exact $" + nb(x) + "$." }],
        aides: [`$f(${nb(x)}) = ${D} \\times ${nb(q)}^{${nb(x)}}$.`, "Utilise la touche puissance de la calculatrice.", "Arrondis au centième."], solution: `$f(${nb(x)}) = ${D} \\times ${nb(q)}^{${nb(x)}} \\approx ${nb(att)}$ mg.` };
    }
    const C0 = pick([1000, 2000, 3000, 5000, 10000]), tx = pick([2, 3, 4, 5, 6]), q = cm(tx), mois = pick([3, 6, 9, 18, 30]), x = mois / 12, v = C0 * q ** x, att = r2(v);
    return { enonce: `Un capital de $${nb(C0)}$ € est placé à intérêts composés au taux annuel de $${tx}\\,\\%$ : après $x$ années (même non entier), il vaut $${nb(C0)} \\times ${nb(q)}^x$. Quelle est sa valeur au bout de $${mois}$ mois (arrondie au centime) ?`, mode: "nombre", prefixe: "Capital :", attendu: att, suffixe: "€", tolerance: 0.005,
      erreurs: [{ valeur: r2(C0 * q ** mois), message: `L'exposant est en **années** : $${mois}$ mois $= ${nb(arr(x, 6))}$ an(s).` }, { valeur: r2(C0 * (1 + tx / 100 * x)), message: "Ça, ce serait avec des intérêts simples." }],
      aides: [`$${mois}$ mois $= \\dfrac{${mois}}{12} = ${nb(arr(x, 6))}$ an(s).`, `$${nb(C0)} \\times ${nb(q)}^{${nb(arr(x, 6))}}$.`, "Calcule à la calculatrice, arrondis au centime."],
      solution: `$${nb(C0)} \\times ${nb(q)}^{${nb(arr(x, 6))}} \\approx ${nb(att)}$ €.` };
  });

  def("qe-seuil", () => {
    const t = pick(["baisse", "baisse", "hausse"]);
    if (t === "baisse") {
      const tx = pick([5, 8, 10, 12, 15, 20, 25, 30]), q = cm(-tx), p = pick([10, 20, 25, 50]);
      let n = 0; while (q ** n >= p / 100) n++;
      const ctx = pick([["d'un médicament dans le sang", "heure", "heures"], ["d'un polluant dans un lac", "mois", "mois"], ["de la luminosité sous l'eau, à chaque mètre de profondeur", "mètre", "mètres"]]);
      return { enonce: `La quantité ${ctx[0]} diminue de $${tx}\\,\\%$ par ${ctx[1]} : elle est multipliée par $${nb(q)}^x$ après $x$ ${ctx[2]}. Au bout de combien de ${ctx[2]} entiers devient-elle inférieure à $${p}\\,\\%$ de la quantité de départ ?`, mode: "nombre", prefixe: "$x =$", attendu: n,
        erreurs: [{ valeur: n - 1, message: `$${nb(q)}^{${n - 1}} \\approx ${nb(r3(q ** (n - 1)))}$ : ce n'est pas encore sous $${nb(p / 100)}$.` }, { valeur: Math.ceil((100 - p) / tx), message: "La baisse n'est pas linéaire : on ne retire pas $" + tx + "\\,\\%$ de la quantité de départ à chaque fois." }],
        aides: [`On cherche le premier entier $x$ tel que $${nb(q)}^x < ${nb(p / 100)}$.`, "Fais défiler les valeurs à la calculatrice (tableau de valeurs) ou au tableur.", `$${nb(q)}^{${n - 1}} \\approx ${nb(r3(q ** (n - 1)))}$.`],
        solution: `$${nb(q)}^{${n - 1}} \\approx ${nb(r3(q ** (n - 1)))} \\geqslant ${nb(p / 100)}$ et $${nb(q)}^{${n}} \\approx ${nb(r3(q ** n))} < ${nb(p / 100)}$ : il faut $${n}$ ${ctx[2]}.` };
    }
    const tx = pick([2, 3, 4, 5, 6, 7, 8, 10, 12, 15]), q = cm(tx), k = pick([2, 3, 1.5]);
    let n = 0; while (q ** n < k) n++;
    return { enonce: `Une population augmente de $${tx}\\,\\%$ par an : elle est multipliée par $${nb(q)}^x$ après $x$ années. Au bout de combien d'années entières aura-t-elle ${k === 2 ? "doublé" : k === 3 ? "triplé" : "été multipliée par $1{,}5$"} ?`, mode: "nombre", prefixe: "$x =$", attendu: n,
      erreurs: [{ valeur: Math.ceil(((k - 1) * 100) / tx), message: "Les hausses se composent : ce n'est pas $" + tx + "\\,\\%$ du départ ajouté chaque année." }, { valeur: n - 1, message: `$${nb(q)}^{${n - 1}} \\approx ${nb(r3(q ** (n - 1)))}$ : pas encore $${nb(k)}$.` }],
      aides: [`On cherche le premier entier $x$ tel que $${nb(q)}^x \\geqslant ${nb(k)}$.`, "Fais défiler les puissances à la calculatrice ou au tableur.", `$${nb(q)}^{${n - 1}} \\approx ${nb(r3(q ** (n - 1)))}$.`],
      solution: `$${nb(q)}^{${n - 1}} \\approx ${nb(r3(q ** (n - 1)))} < ${nb(k)}$ et $${nb(q)}^{${n}} \\approx ${nb(r3(q ** n))} \\geqslant ${nb(k)}$ : au bout de $${n}$ ans.` };
  });

  def("qe-ordre-grandeur", () => {
    const t = pick(["virus", "virus", "papier", "doublement"]);
    if (t === "virus") {
      const R = pick([2, 3, 4, 1.5, 2.5]), g = pick([5, 8, 10, 12, 15]), v = R ** g, e = Math.floor(Math.log10(v));
      const bonne = `environ $10^{${e}}$`;
      const ch = choix4(bonne, [`environ $10^{${e + 2}}$`, `environ $10^{${Math.max(1, e - 2)}}$`, `environ $${nb(R * g)}$`].filter((s) => s !== bonne));
      return { enonce: `Un virus a un taux de reproduction $R_0 = ${nb(R)}$ : chaque personne malade en contamine en moyenne $${nb(R)}$ nouvelles. En partant d'une personne, combien de personnes sont contaminées à la génération $${g}$ (ordre de grandeur) ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["À chaque génération, le nombre de malades est multiplié par $R_0$.", `Génération $${g}$ : $${nb(R)}^{${g}}$.`, `$${nb(R)}^{${g}} \\approx ${nb(Math.round(v))}$.`],
        solution: `$${nb(R)}^{${g}} \\approx ${nb(Math.round(v))}$, soit ${bonne} : une croissance exponentielle devient vite énorme (et non $${nb(R)} \\times ${g} = ${nb(R * g)}$).` };
    }
    if (t === "papier") {
      const n = pick([10, 12, 15, 18, 20, 25, 30]), mm = 0.1 * 2 ** n, m = mm / 1000, km = m > 2000;
      const ecrire = (v) => (km ? `environ $${nb(Math.round(v / 1000))}$ km` : `environ $${nb(v >= 10 ? Math.round(v) : r2(v))}$ m`);
      const bonne = ecrire(m), ch = choix4(bonne, [`environ $${nb(r2(0.1 * 2 * n))}$ mm`, ecrire(m * 10), ecrire(m / 10), ecrire(m * 100)]);
      return { enonce: `Une feuille de papier a une épaisseur de $0{,}1$ mm. Si on pouvait la plier en deux $${n}$ fois de suite, quelle serait l'épaisseur obtenue ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
        aides: ["Chaque pliage double l'épaisseur.", `Épaisseur : $0{,}1 \\times 2^{${n}}$ mm.`, `$2^{${n}} = ${nb(2 ** n)}$ ; convertis ensuite les mm en m ($\\div 1\\,000$)${km ? " puis en km" : ""}.`],
        solution: `$0{,}1 \\times 2^{${n}} = ${nb(arr(mm, 1))}$ mm, soit ${bonne}. Une croissance exponentielle dépasse vite l'intuition (et non $0{,}1 \\times 2 \\times ${n}$ mm).` };
    }
    const tx = pick([1, 2, 3, 5, 7, 10]), q = cm(tx); let n = 0; while (q ** n < 2) n++;
    const ch = choix4(`environ $${n}$ ans`, [`$${Math.round(100 / tx)}$ ans`, `$${2 * tx}$ ans`, `environ $${Math.max(1, Math.round(n / 3))}$ ans`, `environ $${n * 3}$ ans`].filter((s) => s !== `environ $${n}$ ans`));
    return { enonce: `Un capital placé à $${tx}\\,\\%$ par an (intérêts composés) est multiplié par $${nb(q)}^x$ en $x$ ans. Au bout de combien de temps environ aura-t-il doublé ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: [`On cherche $x$ tel que $${nb(q)}^x \\geqslant 2$.`, "Essaie quelques valeurs à la calculatrice.", `$${nb(q)}^{${n}} \\approx ${nb(r3(q ** n))}$.`],
      solution: `$${nb(q)}^{${n - 1}} \\approx ${nb(r3(q ** (n - 1)))}$ et $${nb(q)}^{${n}} \\approx ${nb(r3(q ** n))}$ : le capital double en environ $${n}$ ans (et non $\\dfrac{100}{${tx}}$, ce qui serait le cas avec des intérêts simples).` };
  });

  def("qe-modele", () => {
    const S = pick([
      { ctx: (a, b) => `Une population de $${nb(a)}$ habitants augmente de $${b}\\,\\%$ par an. On note $f(x)$ la population après $x$ années ($x \\geqslant 0$).`, a: () => pick([5000, 10000, 20000, 50000]), b: () => pick([1, 2, 3, 4, 5]), bonne: (a, b) => `f(x) = ${nb(a)} \\times ${nb(cm(b))}^x`, faux: (a, b) => [`f(x) = ${nb(a)} + ${coef(b, "x")}`, `f(x) = ${nb(a)} \\times ${nb(b / 100)}^x`, `f(x) = ${nb(a)} \\times ${nb(cm(b))}x`], type: "exponentielle croissante" },
      { ctx: (a, b) => `Une voiture achetée $${nb(a)}$ € perd $${b}\\,\\%$ de sa valeur chaque année. On note $f(x)$ sa valeur après $x$ années.`, a: () => pick([10000, 15000, 20000, 25000]), b: () => pick([10, 15, 20, 25]), bonne: (a, b) => `f(x) = ${nb(a)} \\times ${nb(cm(-b))}^x`, faux: (a, b) => [`f(x) = ${nb(a)} - ${b}x`, `f(x) = ${nb(a)} \\times ${nb(b / 100)}^x`, `f(x) = ${nb(a)} \\times ${nb(cm(b))}^x`], type: "exponentielle décroissante" },
      { ctx: (a, b) => `Un champ de manioc de $${nb(a)}$ m² s'agrandit de $${b}$ m² par an. On note $f(x)$ sa surface après $x$ années.`, a: () => pick([500, 800, 1000]), b: () => pick([20, 50, 100]), bonne: (a, b) => `f(x) = ${nb(a)} + ${b}x`, faux: (a, b) => [`f(x) = ${nb(a)} \\times ${nb(cm(b))}^x`, `f(x) = ${nb(a)} \\times ${b}^x`, `f(x) = ${b} + ${nb(a)}x`], type: "affine (linéaire)" },
      { ctx: (a, b) => `La masse de carbone 14 d'un fossile, $${nb(a)}$ mg au départ, est divisée par $2$ tous les $5\\,700$ ans environ. On note $f(x)$ la masse restante après $x$ demi-vies.`, a: () => pick([4, 8, 10, 16]), b: () => 0, bonne: (a) => `f(x) = ${nb(a)} \\times 0{,}5^x`, faux: (a) => [`f(x) = ${nb(a)} - 0{,}5x`, `f(x) = ${nb(a)} \\times 2^x`, `f(x) = 0{,}5 \\times ${nb(a)}^x`], type: "exponentielle décroissante" }
    ]);
    const a = S.a(), b = S.b();
    const ch = choix4(`$${S.bonne(a, b)}$`, S.faux(a, b).map((f) => `$${f}$`));
    return { enonce: `${S.ctx(a, b)} Quelle expression modélise $f(x)$ ?`, mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["Ajoute-t-on la même quantité (modèle affine) ou multiplie-t-on par le même nombre (modèle exponentiel) ?", "Un pourcentage d'évolution constant correspond à une multiplication par $1 + \\dfrac{t}{100}$.", "Vérifie avec $x = 0$ (valeur de départ) et $x = 1$."],
      solution: `Modèle ${S.type} : $${S.bonne(a, b)}$.` };
  });

  def("qe-vrai-faux", () => vraiFaux4([
    ["Pour tout $a > 0$, $a^0 = 1$.", true, "toutes les courbes de $x \\mapsto a^x$ passent par $(0\\,;1)$."],
    ["$2^{1{,}5} \\times 2^{0{,}5} = 4$.", true, "$2^{1{,}5 + 0{,}5} = 2^2 = 4$."],
    ["$9^{\\frac{1}{2}} = 3$.", true, "$3^2 = 9$ : c'est la racine carrée de $9$."],
    ["La fonction $x \\mapsto 0{,}7^x$ est décroissante.", true, "sa base est entre $0$ et $1$."],
    ["Une hausse de $21\\,\\%$ en deux ans correspond à un taux moyen de $10\\,\\%$ par an.", true, "$1{,}1^2 = 1{,}21$."],
    ["$8^{\\frac{1}{3}} = 2$.", true, "$2^3 = 8$."],
    ["$\\left(5^{2}\\right)^{0{,}5} = 5$.", true, "$5^{2 \\times 0{,}5} = 5^1 = 5$."],
    ["$3^{0{,}5} = 1{,}5$.", false, "$3^{0{,}5} = \\sqrt{3} \\approx 1{,}73$ : ce n'est pas $3 \\times 0{,}5$."],
    ["La fonction $x \\mapsto 1{,}02^x$ est décroissante car $0{,}02$ est petit.", false, "$1{,}02 > 1$ : elle est croissante."],
    ["Une hausse de $30\\,\\%$ en $3$ ans correspond à $10\\,\\%$ par an en moyenne.", false, "$1{,}1^3 = 1{,}331$ : le taux moyen est $1{,}3^{\\frac{1}{3}} - 1 \\approx 9{,}1\\,\\%$."],
    ["$2^{3} \\times 2^{4} = 2^{12}$.", false, "$2^{3 + 4} = 2^7$ : on additionne les exposants."],
    ["Après une demi-vie et demie, il reste le quart des noyaux radioactifs.", false, "$0{,}5^{1{,}5} \\approx 0{,}35$ : il en reste environ $35\\,\\%$."],
    ["Une grandeur qui augmente de $5\\,\\%$ par an double en $20$ ans.", false, "$1{,}05^{20} \\approx 2{,}65$ : elle double en environ $15$ ans."]
  ], ["Mêmes règles que les puissances : on additionne les exposants pour un produit.", "$a > 1$ : croissante ; $0 < a < 1$ : décroissante.", "Taux moyen : coefficient global puissance $\\dfrac{1}{n}$."]));

  /* Figures du cours (chapitre 13) */
  FIGURES["qe-cours-courbes"] = () => graph({ xmin: -0.3, xmax: 3.4, ymin: -0.4, ymax: 8.6, xstep: 0.5, ystep: 1, xetiq: 1, h: 300, curves: [{ f: (x) => 2 ** x, a: 0, b: 3, label: "2ˣ", closed: false, couleur: 0 }, { f: (x) => 1.5 ** x, a: 0, b: 3, label: "1,5ˣ", closed: false, couleur: 2 }, { f: (x) => 0.5 ** x, a: 0, b: 3, label: "0,5ˣ", closed: false, couleur: 1 }], points: [{ x: 0, y: 1, label: "(0 ; 1)" }, { x: 1, y: 2 }, { x: 1, y: 0.5 }], aria: "Courbes de 2^x et 1,5^x croissantes, de 0,5^x décroissante, toutes passant par (0 ; 1)" });
  FIGURES["qe-cours-points"] = () => nuage([0, 1, 2, 3, 4], [1, 2, 4, 8, 16], { xlabel: "x", ylabel: "y", xstep: 1, ystep: 2, curves: [{ f: (x) => 2 ** x, a: 0, b: 4, closed: false }], points: [0, 1, 2, 3, 4].map((n) => ({ x: n, y: 2 ** n })).concat([{ x: 0.5, y: 2 ** 0.5, label: "√2" }, { x: 1.5, y: 2 ** 1.5 }, { x: 2.5, y: 2 ** 2.5 }]), aria: "Nuage de la suite 2^n complété par la courbe continue de x ↦ 2^x, avec des points intermédiaires comme (0,5 ; √2)" });

})();
