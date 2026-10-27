/*
  FICHIER FABRIQUÉ AUTOMATIQUEMENT par   node outils/manifeste.js   — ne pas modifier à la main.
  Générateurs d'exercices du niveau « automatismes », extraits d'assets/exercices.js (le fichier à modifier).
  Il a besoin d'assets/exercices-base.js, chargé avant lui. 21 sections sur 93.
*/
(function () {
  "use strict";
  // Outils communs : assets/exercices-base.js (chargé avant ce fichier)
  const { rand, pick, randNZ, shuffle, par, sg, poly, interv, nbAxe, commenceVoyelle, deN, queN, leN, laN, largeurTexte, boiteTexte, seCoupent, graph, parabole, C } = window.PM_EXO.outils;
  const FIGURES = window.PM_EXO.FIGURES;

  /* ---------- Générateurs ---------- */
  const GEN = window.PM_EXO.GEN;

  /* ---------- Seconde, chapitre 2 : généralités sur les fonctions — outils (préfixe fg) ---------- */
  const fgPar = (n) => (n < 0 ? `(${fr(n)})` : fr(n)); // nombre LaTeX, entre parenthèses s'il est négatif
  const fgFois = (a) => (a === 1 ? "" : a === -1 ? "-" : `${fr(a)} \\times `); // « a × » (rien pour 1, « - » pour −1)
  const fgAff = (a, b, v) => `${a === 1 ? "" : a === -1 ? "-" : fr(a)}${v || "x"}${b ? ` ${b < 0 ? "-" : "+"} ${fr(Math.abs(b))}` : ""}`; // ax + b
  const fgPt = (x, y) => `(${nbSvg(x)} ; ${nbSvg(y)})`; // coordonnées écrites dans une figure
  const fgSub = (s) => `${s.slice(0, 1)}<tspan class="sub" dy="3">${s.slice(1)}</tspan>`; // « Cf » avec f en indice
  // Erreurs prévues : sans doublon et jamais égales à la réponse (le filtre de fin de fichier ne couvre pas ces générateurs sans préfixe)
  const fgErreurs = (att, L) => { const vus = []; return L.filter((e) => { if (!e || typeof e.valeur !== "number" || !isFinite(e.valeur)) return false; const v = e.valeur; if (Math.abs(v - att) < 1e-9 || vus.some((w) => Math.abs(w - v) < 1e-9)) return false; vus.push(v); return true; }); };
  const fgDecimal = (n, d) => { d = Math.abs(d) / pgcd(n, d); while (d % 2 === 0) d /= 2; while (d % 5 === 0) d /= 5; return d === 1; };
  const fgApprox = (v) => [+v.toFixed(2), +v.toFixed(1), Math.trunc(v * 100) / 100, Math.trunc(v * 10) / 10].map((a) => ({ valeur: a, message: "C'est une valeur approchée. Donne la valeur exacte, sous forme de fraction." }));
  const fgPas = (e) => [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000].find((p) => e / p <= 12) || 2000; // graduation : au plus 12 traits
  // Options de graph() pour tracer les fonctions fs sur [a ; b] (axes compris, graduations adaptées)
  function fgRepere(fs, a, b, extra) {
    let lo = 0, hi = 0;
    fs.forEach((f) => { for (let k = 0; k <= 80; k++) { const y = f(a + ((b - a) * k) / 80); if (isFinite(y)) { lo = Math.min(lo, y); hi = Math.max(hi, y); } } });
    const g = Math.min(a, 0), d = Math.max(b, 0), px = fgPas(d - g), py = fgPas(hi - lo);
    const o = { xmin: g - 0.6 * px, xmax: d + 0.6 * px, ymin: lo - 0.6 * py, ymax: hi + 0.6 * py, xstep: px, ystep: py, xetiq: (d - g) / px > 8 ? 2 * px : px, yetiq: (hi - lo) / py > 8 ? 2 * py : py };
    // marge de gauche assez large pour les nombres de l'axe vertical (« 4 000 ») quand cet axe est près du bord
    let w = 0; for (let y = Math.ceil(o.ymin / o.yetiq) * o.yetiq; y <= o.ymax; y += o.yetiq) w = Math.max(w, largeurTexte(nbAxe(y), 10));
    const r = (0 - o.xmin) / (o.xmax - o.xmin), besoin = Math.ceil((w + 6 - 306 * r) / (1 - r));
    if (besoin > 14) o.padL = besoin;
    return Object.assign(o, extra || {});
  }
  // graph(o) avec des éléments ajoutés par-dessus : plus(X, Y) renvoie du SVG (X, Y : mêmes conversions que graph)
  function fgGraphe(o, plus) {
    const W = 320, pad = 14, padL = o.padL || pad, padB = o.padB || (o.ymin >= 0 ? 18 : pad);
    const ux = (W - padL - pad) / (o.xmax - o.xmin);
    const H = Math.max(200, Math.min(400, o.h || Math.round(ux * (o.ymax - o.ymin) * ((o.xstep || 1) / (o.ystep || 1)) + pad + padB)));
    const uy = (H - pad - padB) / (o.ymax - o.ymin);
    const X = (x) => +(padL + (x - o.xmin) * ux).toFixed(1), Y = (y) => +(pad + (o.ymax - y) * uy).toFixed(1);
    const ajout = plus(X, Y, H);
    // les noms ajoutés par-dessus sont inconnus de graph() : on retire les nombres d'axes qu'ils recouvriraient
    const boites = [...ajout.matchAll(/<text([^>]*)>([\s\S]*?)<\/text>/g)].map(([, att, t]) => {
      const v = (n) => (att.match(new RegExp(n + '="([^"]*)"')) || [])[1];
      const b = boiteTexte(+v("x"), +v("y"), t.replace(/<[^>]+>/g, ""), 11, v("text-anchor") || "start");
      return { x1: b.x1 - 2, x2: b.x2 + 2, y1: b.y1 - 2, y2: b.y2 + 2 };
    }).filter((b) => isFinite(b.x1) && isFinite(b.y1));
    const svg = graph(o).replace(/<g class="g-tick">([\s\S]*?)<\/g>/, (m, nombres) => '<g class="g-tick">' + nombres.replace(/<text x="([^"]*)" y="([^"]*)" text-anchor="([^"]*)">([^<]*)<\/text>/g, (n, x, y, an, t) => (boites.some((b) => seCoupent(boiteTexte(+x, +y, t, 10, an), b)) ? "" : n)) + "</g>");
    return svg.replace(/<\/svg>$/, ajout + "</svg>");
  }
  // Étiquette d'un point placée autour de lui, là où elle est le plus loin des courbes [f, a, b] (à utiliser dans fgGraphe)
  function fgEtiquette(X, Y, H, x0, y0, courbes, txt) {
    const px = X(x0), py = Y(y0), w = String(txt).length * 6.6, pts = [];
    courbes.forEach(([f, a, b]) => { for (let k = 0; k <= 80; k++) { const x = a + ((b - a) * k) / 80, y = f(x); if (isFinite(y)) pts.push([X(x), Y(y)]); } });
    // les nombres des axes sont aussi des obstacles : bande sous l'axe horizontal, bande à gauche de l'axe vertical
    const ax = Y(0), ay = X(0);
    if (ax > 0 && ax < H) for (let u = 0; u <= 320; u += 6) pts.push([u, ax + 9]);
    if (ay > 0 && ay < 320) for (let v = 0; v <= H; v += 6) pts.push([ay - 9, v]);
    let best = null;
    for (let k = 0; k < 16; k++) {
      const t = (k * Math.PI) / 8, cx = px + (9 + w / 2) * Math.cos(t), cy = py - 13 * Math.sin(t) + 4;
      if (cx - w / 2 < 2 || cx + w / 2 > 318 || cy - 10 < 2 || cy + 3 > H - 2) continue;
      const d = Math.min(...[[cx - w / 2, cy - 4], [cx, cy - 4], [cx + w / 2, cy - 4], [cx - w / 2, cy - 9], [cx + w / 2, cy - 9], [cx, cy]].map(([u, v]) => Math.min(...pts.map(([p, q]) => Math.hypot(p - u, q - v)))));
      if (!best || d > best.d) best = { d, cx, cy };
    }
    return best ? `<text class="g-plabel" x="${best.cx.toFixed(1)}" y="${best.cy.toFixed(1)}" text-anchor="middle">${txt}</text>` : "";
  }
  const fgNoms = ["Anli", "Nassim", "Zaïnaba", "Fatima", "Moussa", "Awa", "Ibrahim", "Mariama", "Saïd", "Djamila", "Hamada", "Faïza", "Kamal", "Zalifa", "Ambdi", "Nasra", "Toiyb", "Roukia"];

  /* Calculer une image */
  GEN["image-calcul"] = function (i) {
    if (i >= 2 && Math.random() < 0.3) return fgImageContexte();
    const t = i < 2 ? pick([0, 0, 1]) : i < 4 ? pick([1, 2, 3]) : pick([2, 3, 4]);
    let x0, f, expr, sub, etape, aide3, val, erreurs = [];
    if (t <= 1) {
      let a, b;
      if (t === 0) { a = pick([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6]); b = randNZ(-9, 9); x0 = randNZ(-5, 5); }
      else { a = pick([-4, -3, -2, 2, 3, 4, 0.5, -0.5, 1.5, -1.5]); b = randNZ(-9, 9); x0 = pick([-2.5, -1.5, -0.5, 0.5, 1.5, 2.5, -4, -3, 3, 4]); }
      const ax = +(a * x0).toFixed(6);
      val = +(ax + b).toFixed(6); f = (x) => a * x + b; expr = fgAff(a, b);
      sub = `${fgFois(a)}${fgPar(x0)} ${b < 0 ? "-" : "+"} ${fr(Math.abs(b))}`;
      etape = `${fr(ax)} ${b < 0 ? "-" : "+"} ${fr(Math.abs(b))}`;
      aide3 = `Le produit d'abord : $${fgFois(a)}${fgPar(x0)} = ${fr(ax)}$, puis on ${b < 0 ? "retire" : "ajoute"} $${fr(Math.abs(b))}$.`;
      erreurs = [{ valeur: +(a * (x0 + b)).toFixed(6), message: `Respecte les priorités : on calcule d'abord le produit $${fgFois(a)}${fgPar(x0)}$, puis on ${b < 0 ? "retire" : "ajoute"} $${fr(Math.abs(b))}$.` }];
      if (a < 0 || x0 < 0) erreurs.push({ valeur: +(b - ax).toFixed(6), message: `Attention à la règle des signes : $${fgFois(a)}${fgPar(x0)} = ${fr(ax)}$.` });
      erreurs.push({ valeur: +(a + x0 + b).toFixed(6), message: `« $${fr(a)}x$ » signifie $${fr(a)} \\times x$ : on multiplie par $${fgPar(x0)}$, on n'ajoute pas.` });
    } else if (t <= 3) {
      const a = randNZ(-3, 3), b = t === 3 ? randNZ(-5, 5) : 0, c = randNZ(-9, 9);
      x0 = randNZ(-4, 4); f = (x) => a * x * x + b * x + c; val = f(x0); expr = poly([a, b, c]);
      sub = `${fgFois(a)}${fgPar(x0)}^2` + (b ? ` ${b < 0 ? "-" : "+"} ${fgFois(Math.abs(b))}${fgPar(x0)}` : "") + ` ${sg(c)}`;
      etape = `${a === 1 ? "" : a === -1 ? "-" : `${a} \\times `}${x0 * x0}` + (b ? ` ${sg(b * x0)}` : "") + ` ${sg(c)}`;
      aide3 = `La puissance d'abord : $${fgPar(x0)}^2 = ${x0 * x0}$` + (x0 < 0 ? " (un carré n'est jamais négatif)." : ".");
      if (x0 < 0) erreurs.push({ valeur: -a * x0 * x0 + b * x0 + c, message: `Un carré n'est jamais négatif : $${fgPar(x0)}^2 = ${x0 * x0}$, pas $${-x0 * x0}$.` });
      erreurs.push({ valeur: 2 * a * x0 + b * x0 + c, message: `$x^2 = x \\times x$ : $${fgPar(x0)}^2 = ${x0 * x0}$, pas $2 \\times ${fgPar(x0)}$.` });
      if (Math.abs(a) !== 1) erreurs.push({ valeur: a * a * x0 * x0 + b * x0 + c, message: `Seul $x$ est au carré : $${a}x^2 = ${a} \\times x^2$, on ne met pas $${a}$ au carré.` });
    } else {
      let a, b, c, d, r;
      do { x0 = randNZ(-4, 4); c = randNZ(-5, 5); d = x0 + c; r = randNZ(-6, 6); a = randNZ(-4, 4); b = r * d - a * x0; } while (d === 0 || b === 0 || Math.abs(b) > 12 || b === a * c);
      const num = a * x0 + b;
      f = null; val = r; expr = `\\dfrac{${poly([a, b])}}{${poly([1, c])}}`;
      sub = `\\dfrac{${fgFois(a)}${fgPar(x0)} ${sg(b)}}{${fgPar(x0)} ${sg(c)}}`;
      etape = `\\dfrac{${num}}{${d}}`;
      aide3 = `Calcule séparément le numérateur ($${num}$) et le dénominateur ($${d}$), puis divise.`;
      erreurs.push({ valeur: d / num, message: "Tu as inversé le numérateur et le dénominateur." });
      if (x0 !== c) erreurs.push({ valeur: num / (x0 - c), message: `Attention au dénominateur : $${fgPar(x0)} ${sg(c)} = ${d}$.` });
    }
    let figureSolution;
    if (f) {
      const L = Math.min(Math.floor(x0) - 2, -1), R = Math.max(Math.ceil(x0) + 2, 1);
      figureSolution = graph(fgRepere([f], L, R, { curves: [{ f, a: L, b: R, closed: false, label: fgSub("Cf"), lx: R, dx: -4, dy: -8 }], points: [{ x: x0, y: val, label: fgPt(x0, val) }], chemins: [[[x0, 0], [x0, val], [0, val]]], aria: `Courbe de f : le point d'abscisse ${nbSvg(x0)} a pour ordonnée ${nbSvg(val)}, l'image de ${nbSvg(x0)}` }));
    }
    return {
      enonce: `Soit $f(x) = ${expr}$. Calcule l'image de $${fr(x0)}$ par $f$.`,
      mode: "nombre", prefixe: `f(${fr(x0)}) =`, attendu: val, erreurs: fgErreurs(val, erreurs),
      aides: [
        t === 4 ? `Le dénominateur ne s'annule pas pour $x = ${fr(x0)}$ : ce nombre a bien une image. Remplace chaque $x$ par $${fgPar(x0)}$.` : `L'image de $${fr(x0)}$, c'est $f(${fr(x0)})$ : remplace chaque $x$ par $${fgPar(x0)}$.`,
        `Cela donne $f(${fr(x0)}) = ${sub}$.`,
        aide3
      ],
      solution: `$f(${fr(x0)}) = ${sub} = ${etape} = ${fr(val)}$` + (f ? "\n\nSur la courbe de $f$, le point d'abscisse $" + fr(x0) + "$ a pour ordonnée $" + fr(val) + "$." : ""),
      figureSolution
    };
  };

  // Calculer une image dans une situation de Mayotte ; le graphique sert à vérifier le calcul
  function fgImageContexte() {
    const nm = pick(fgNoms);
    const S = pick([
      () => { const a = pick([0.5, 1.5, 2, 2.5]), b = pick([2, 3, 4, 5]), x0 = rand(3, 18), val = a * x0 + b;
        return { f: (x) => a * x + b, D: [0, 20], x0, val, nom: "f", unite: "€", xl: "x (km)", yl: "prix (€)",
          texte: `Un taxi de Mamoudzou fait payer $f(x) = ${fgAff(a, b)}$ euros pour une course de $x$ km. Combien coûte une course de $${x0}$ km ?`,
          calcul: `${fr(a)} \\times ${x0} + ${b} = ${fr(a * x0)} + ${b} = ${fr(val)}`, fin: `Une course de $${x0}$ km coûte $${fr(val)}$ €.`,
          erreurs: [{ valeur: a * x0, message: `Tu as oublié la prise en charge de $${b}$ € : on l'ajoute au prix des kilomètres.` }, { valeur: a * (x0 + b), message: "Respecte les priorités : d'abord le produit, ensuite l'addition." }] }; },
      () => { const a = rand(4, 9), b = rand(5, 15), x0 = rand(2, 8), val = a * x0 + b;
        return { f: (t) => a * t + b, D: [0, 10], x0, val, nom: "f", unite: "€", xl: "t (h)", yl: "prix (€)",
          texte: `À N'Gouja, ${nm} veut louer une pirogue. La location coûte $f(t) = ${a}t + ${b}$ euros pour $t$ heures. Combien coûte une location de $${x0}$ heures ?`,
          calcul: `${a} \\times ${x0} + ${b} = ${a * x0} + ${b} = ${val}`, fin: `Une location de $${x0}$ heures coûte $${val}$ €.`,
          erreurs: [{ valeur: a * x0, message: `Tu as oublié la partie fixe de $${b}$ € : on l'ajoute au prix des heures.` }, { valeur: a * (x0 + b), message: "Respecte les priorités : d'abord le produit, ensuite l'addition." }] }; },
      () => { const d = pick([20, 25, 40, 50]), T = rand(10, 24), V0 = d * T, x0 = rand(2, T - 2), val = V0 - d * x0;
        return { f: (t) => V0 - d * t, D: [0, T], x0, val, nom: "V", unite: "L", xl: "t (jours)", yl: "V (L)",
          texte: `La citerne d'une maison de Koungou contient $${nb(V0)}$ L d'eau. On en utilise $${d}$ L par jour : après $t$ jours, il reste $V(t) = ${nb(V0)} - ${d}t$ litres. Combien reste-t-il d'eau après $${x0}$ jours ?`,
          calcul: `${nb(V0)} - ${d} \\times ${x0} = ${nb(V0)} - ${nb(d * x0)} = ${nb(val)}`, fin: `Après $${x0}$ jours, il reste $${nb(val)}$ L dans la citerne.`,
          erreurs: [{ valeur: d * x0, message: "Ça, c'est la quantité d'eau utilisée. On demande ce qu'il reste dans la citerne." }, { valeur: (V0 - d) * x0, message: "Respecte les priorités : d'abord le produit, ensuite la soustraction." }] }; },
      () => { const v = pick([10, 15, 20]), h0 = pick([1, 1.5, 2]), f = (t) => -5 * t * t + v * t + h0, T = (v + Math.sqrt(v * v + 20 * h0)) / 10;
        const x0 = pick([0.5, 1, 1.5, 2, 2.5, 3].filter((t) => t < T - 0.2)), val = f(x0);
        return { f, D: [0, +T.toFixed(2)], x0, val, nom: "h", unite: "m", xl: "t (s)", yl: "h (m)",
          texte: `Sur la plage de Moya, ${nm} lance un ballon vers le haut. Sa hauteur (en m) après $t$ secondes est $h(t) = -5t^2 + ${v}t + ${fr(h0)}$. À quelle hauteur se trouve le ballon après $${fr(x0)}$ seconde${x0 >= 2 ? "s" : ""} ?`,
          calcul: `-5 \\times ${fr(x0)}^2 + ${v} \\times ${fr(x0)} + ${fr(h0)} = -5 \\times ${fr(x0 * x0)} + ${fr(v * x0)} + ${fr(h0)} = ${fr(val)}`, fin: `Après $${fr(x0)}$ seconde${x0 >= 2 ? "s" : ""}, le ballon est à $${fr(val)}$ m de hauteur.`,
          erreurs: [{ valeur: 25 * x0 * x0 + v * x0 + h0, message: "Seul $t$ est au carré : $-5t^2 = -5 \\times t^2$, on ne calcule pas $(-5t)^2$." }, { valeur: -10 * x0 + v * x0 + h0, message: "$t^2 = t \\times t$, pas $2 \\times t$." }] }; },
      () => { const M = rand(30, 33), x0 = pick([6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18]), e = x0 - 12, val = M - 0.25 * e * e;
        return { f: (h) => M - 0.25 * (h - 12) * (h - 12), D: [6, 18], x0, val, nom: "T", unite: "°C", xl: "h (heures)", yl: "T (°C)",
          texte: `À Mamoudzou, un jour de saison des pluies, la température (en °C) à $h$ heures est modélisée par $T(h) = ${M} - 0{,}25(h - 12)^2$, pour $h$ entre $6$ et $18$. Quelle température fait-il à $${x0}$ h ?`,
          calcul: `${M} - 0{,}25 \\times (${x0} - 12)^2 = ${M} - 0{,}25 \\times ${fgPar(e)}^2 = ${M} - 0{,}25 \\times ${e * e} = ${fr(val)}`, fin: `À $${x0}$ h, il fait $${fr(val)}$ °C.`,
          erreurs: [{ valeur: (M - 0.25) * e * e, message: "Respecte les priorités : le carré et le produit avant la soustraction." }, { valeur: M - 0.25 * (x0 * x0 - 144), message: "$(h - 12)^2 \\neq h^2 - 12^2$ : calcule d'abord la parenthèse, puis élève-la au carré." }, { valeur: M - 0.25 * e, message: "N'oublie pas le carré : $(h - 12)^2 = (h - 12) \\times (h - 12)$." }] }; },
      () => { const b = pick([20, 24, 30, 36, 40]), c = pick([50, 75, 100, 120]), x0 = rand(2, b - 2), val = -x0 * x0 + b * x0 - c;
        return { f: (x) => -x * x + b * x - c, D: [0, b], x0, val, nom: "B", unite: "€", xl: "x (kg)", yl: "B (€)",
          texte: `Une coopérative de Bandrélé vend de la vanille. Pour $x$ kg vendus dans la semaine, son bénéfice (en euros) est $B(x) = -x^2 + ${b}x - ${c}$. Quel est le bénéfice pour $${x0}$ kg vendus ?`,
          calcul: `-${x0}^2 + ${b} \\times ${x0} - ${c} = -${x0 * x0} + ${b * x0} - ${c} = ${val}`, fin: val < 0 ? `Le bénéfice est négatif : pour $${x0}$ kg, la coopérative perd $${-val}$ €.` : `Pour $${x0}$ kg vendus, le bénéfice est de $${val}$ €.`,
          erreurs: [{ valeur: x0 * x0 + b * x0 - c, message: `$-x^2$ signifie $-(x^2)$ : $-${x0}^2 = -${x0 * x0}$, pas $${x0 * x0}$.` }, { valeur: -2 * x0 + b * x0 - c, message: "$x^2 = x \\times x$, pas $2 \\times x$." }] }; }
    ])();
    const p = `${S.nom}(${fr(S.x0)})`;
    return {
      enonce: `${S.texte}\n\nFais le calcul, puis vérifie ta réponse sur le graphique.`,
      figure: graph(fgRepere([S.f], S.D[0], S.D[1], { curves: [{ f: S.f, a: S.D[0], b: S.D[1] }], points: [{ x: S.x0, y: S.val, label: "?" }], xlabel: S.xl, ylabel: S.yl, aria: `Courbe de la fonction ${S.nom} ; le point d'abscisse ${nbSvg(S.x0)} est marqué d'un point d'interrogation` })),
      mode: "nombre", prefixe: `${p} =`, suffixe: S.unite, attendu: S.val, erreurs: fgErreurs(S.val, S.erreurs),
      aides: [`On cherche l'image de $${fr(S.x0)}$ : calcule $${p}$.`, `$${p} = ${S.calcul.split(" = ")[0]}$.`, "Respecte les priorités : puissances, puis produits, puis sommes et différences."],
      solution: `$${p} = ${S.calcul}$.\n\n${S.fin} Sur le graphique, le point de la courbe d'abscisse $${fr(S.x0)}$ a bien pour ordonnée $${fr(S.val)}$.`
    };
  }

  /* Trouver un antécédent par le calcul (fonction affine) */
  GEN["antecedent-affine"] = function (i) {
    if (i >= 2 && Math.random() < 0.35) return fgAntecedentContexte();
    const t = i < 2 ? pick([0, 1]) : pick([0, 1, 2, 2]);
    let a, b, k, x0, expr;
    if (t === 2) {
      do { a = pick([-6, -5, -4, -3, 2, 3, 4, 5, 6]); b = randNZ(-9, 9); k = rand(-12, 12); } while ((k - b) % a === 0);
      x0 = (k - b) / a; expr = poly([a, b]);
    } else {
      a = randNZ(-5, 5); if (Math.abs(a) === 1) a *= pick([2, 3]); b = randNZ(-9, 9); x0 = rand(-6, 6); k = a * x0 + b;
      expr = t === 1 ? `${b} ${a < 0 ? "-" : "+"} ${Math.abs(a)}x` : poly([a, b]);
    }
    const exact = t === 2 ? frac(k - b, a) : `${x0}`, dec = t === 2 && !fgDecimal(k - b, a);
    const erreurs = [
      { valeur: a * k + b, message: `Tu as calculé $f(${k})$, l'image de $${k}$. On cherche au contraire le nombre $x$ tel que $f(x) = ${k}$.` },
      { valeur: (k + b) / a, message: `Attention au signe : pour isoler $${a}x$, on ${b > 0 ? "retire" : "ajoute"} $${Math.abs(b)}$ aux deux membres.` },
      { valeur: k - b, message: `Il reste à diviser par $${a}$.` }
    ].concat(dec ? fgApprox(x0) : []);
    return {
      enonce: `Soit $f(x) = ${expr}$. Trouve l'antécédent de $${k}$ par $f$.` + (t === 2 ? " Donne la valeur exacte (une fraction si besoin)." : ""),
      mode: "nombre", prefixe: "x =", attendu: x0, erreurs: fgErreurs(x0, erreurs),
      aides: [
        `Chercher l'antécédent de $${k}$, c'est résoudre l'équation $f(x) = ${k}$, soit $${expr} = ${k}$.`,
        `${b > 0 ? "Retire" : "Ajoute"} $${Math.abs(b)}$ aux deux membres : $${a}x = ${k - b}$.`,
        t === 2 ? `Divise par $${a}$ et simplifie la fraction $\\dfrac{${k - b}}{${a}}$ si c'est possible.` : `Divise par $${a}$ : $x = \\dfrac{${k - b}}{${a}}$.`
      ],
      solution: `$${expr} = ${k} \\iff ${a}x = ${k - b} \\iff x = ${exact}` + (dec ? `$ (environ $${fr(+x0.toFixed(2))}$).` : t === 2 ? ` = ${fr(x0)}$.` : "$.") +
        (t === 2 ? "" : `\n\nVérification : $f(${x0}) = ${t === 1 ? `${b} ${a < 0 ? "-" : "+"} ${Math.abs(a)} \\times ${par(x0)}` : `${a} \\times ${par(x0)} ${sg(b)}`} = ${k}$.`),
      figureSolution: graph(fgRepere([(x) => a * x + b], Math.min(Math.floor(x0) - 2, -1), Math.max(Math.ceil(x0) + 2, 1), { curves: [{ f: (x) => a * x + b, a: Math.min(Math.floor(x0) - 2, -1), b: Math.max(Math.ceil(x0) + 2, 1), closed: false, label: fgSub("Cf"), lx: Math.min(Math.floor(x0) - 2, -1) + 0.5, dx: 30, dy: a > 0 ? 14 : -8 }], hlines: [{ y: k, label: `y = ${nbSvg(k)}` }], points: [{ x: x0, y: k, label: dec ? `x ≈ ${nbSvg(+x0.toFixed(2))}` : fgPt(x0, k) }], aria: `Droite de f et droite horizontale y = ${nbSvg(k)} : elles se coupent au point d'abscisse ${dec ? "environ " + nbSvg(+x0.toFixed(2)) : nbSvg(x0)}` }))
    };
  };

  // Antécédent dans une situation de Mayotte, avec le graphique de la situation
  function fgAntecedentContexte() {
    const nm = pick(fgNoms);
    const S = pick([
      () => { const a = rand(4, 9), b = rand(5, 15), x0 = rand(2, 8), k = a * x0 + b;
        return { a, b, k, x0, f: (t) => a * t + b, D: [0, 10], v: "t", unite: "h", xl: "t (h)", yl: "prix (€)",
          texte: `À N'Gouja, la location d'une pirogue coûte $f(t) = ${a}t + ${b}$ euros pour $t$ heures. ${nm} a payé $${k}$ €. Combien de temps a duré la location ?`,
          eq: [`${a}t + ${b} = ${k}`, `${a}t = ${k - b}`], fin: `La location a duré $${x0}$ heures.` }; },
      () => { const a = pick([1.5, 2, 2.5]), b = pick([2, 3, 4, 5]), x0 = rand(3, 18), k = a * x0 + b;
        return { a, b, k, x0, f: (x) => a * x + b, D: [0, 20], v: "x", unite: "km", xl: "x (km)", yl: "prix (€)",
          texte: `Un taxi de Mamoudzou fait payer $f(x) = ${fgAff(a, b)}$ euros pour une course de $x$ km. La course ${deN(nm)} a coûté $${fr(k)}$ €. Combien de kilomètres a-t-elle fait ?`,
          eq: [`${fgAff(a, b)} = ${fr(k)}`, `${fr(a)}x = ${fr(k - b)}`], fin: `La course a fait $${x0}$ km.` }; },
      () => { const d = pick([20, 25, 40, 50]), T = rand(10, 24), V0 = d * T, x0 = rand(2, T - 2), k = V0 - d * x0;
        return { a: -d, b: V0, k, x0, f: (t) => V0 - d * t, D: [0, T], v: "t", unite: "jours", xl: "t (jours)", yl: "V (L)",
          texte: `La citerne d'une maison de Koungou contient $${nb(V0)}$ L d'eau. On en utilise $${d}$ L par jour : après $t$ jours, il reste $V(t) = ${nb(V0)} - ${d}t$ litres. Au bout de combien de jours reste-t-il $${nb(k)}$ L ?`,
          eq: [`${nb(V0)} - ${d}t = ${nb(k)}`, `-${d}t = ${nb(k - V0)}`], fin: `Il reste $${nb(k)}$ L au bout de $${x0}$ jours.` }; },
      () => { const p = pick([200, 250, 300, 350, 400]), x0 = rand(3, 20), k = p * x0;
        return { a: p, b: 0, k, x0, f: (x) => p * x, D: [0, 24], v: "x", unite: "kg", xl: "x (kg)", yl: "R (€)",
          texte: `Une coopérative de vanille de Bandrélé vend la vanille $${p}$ € le kilogramme : pour $x$ kg vendus, la recette est $R(x) = ${p}x$ euros. Cette semaine, elle a encaissé $${nb(k)}$ €. Combien de kilogrammes a-t-elle vendus ?`,
          eq: [`${p}x = ${nb(k)}`], fin: `La coopérative a vendu $${x0}$ kg de vanille.` }; }
    ])();
    const erreurs = S.b ? [{ valeur: S.f(S.k), message: `Tu as calculé l'image de $${nb(S.k)}$. On cherche au contraire $${S.v}$ tel que l'image de $${S.v}$ soit $${nb(S.k)}$.` }, { valeur: S.k / S.a, message: "N'oublie pas la partie fixe : on la retire d'abord, puis on divise." }, { valeur: S.k - S.b, message: `Il reste à diviser par $${fr(Math.abs(S.a))}$.` }]
      : [{ valeur: S.k - S.a, message: `$${S.a}x$ signifie $${S.a} \\times x$ : on divise par $${S.a}$, on ne soustrait pas.` }, { valeur: S.a / S.k, message: "On divise la recette par le prix d'un kilogramme, pas l'inverse." }];
    return {
      enonce: `${S.texte}\n\nRésous une équation, puis vérifie ta réponse sur le graphique.`,
      figure: graph(fgRepere([S.f], S.D[0], S.D[1], { curves: [{ f: S.f, a: S.D[0], b: S.D[1] }], hlines: [{ y: S.k, label: `y = ${nbSvg(S.k)}` }], points: [{ x: S.x0, y: S.k, label: "?" }], xlabel: S.xl, ylabel: S.yl, aria: `Droite de la situation et droite horizontale y = ${nbSvg(S.k)} ; leur point commun est marqué d'un point d'interrogation` })),
      mode: "nombre", prefixe: `${S.v} =`, suffixe: S.unite, attendu: S.x0, erreurs: fgErreurs(S.x0, erreurs),
      aides: [`On connaît l'image, $${nb(S.k)}$ : on cherche son antécédent. Écris l'équation $${S.eq[0]}$.`, S.eq.length > 1 ? `${S.b > 0 ? "Retire" : "Ajoute"} d'abord la partie constante aux deux membres : $${S.eq[1]}$.` : `Divise les deux membres par $${S.a}$.`, `Divise par $${fr(S.a)}$. Sur le graphique, l'antécédent est l'abscisse du point marqué « ? ».`],
      solution: `$${S.eq.join(" \\iff ")} \\iff ${S.v} = ${S.x0}$.\n\n${S.fin} Sur le graphique, la droite horizontale $y = ${nb(S.k)}$ coupe bien la droite au point d'abscisse $${S.x0}$.`
    };
  }

  /* Repérer la valeur interdite, l'ensemble de définition, le domaine d'étude */
  GEN["ensemble-definition"] = function (i) {
    const t = i < 2 ? pick([0, 0, 1]) : i < 4 ? pick([1, 2, 3]) : pick([3, 4, 4]);
    if (t === 4) return fgDomaine();
    if (t === 3) {
      const p = randNZ(-6, 6); let q; do { q = randNZ(-6, 6); } while (q === p || q === -p);
      const r0 = randNZ(-5, 5), num = pick([`${randNZ(-9, 9)}`, poly([1, -r0]), poly([randNZ(-4, 4), 0])]);
      const ens = (u, v) => `$\\mathbb{R} \\setminus \\{${Math.min(u, v)}\\,;${Math.max(u, v)}\\}$`;
      const ms = melangeChoix(ens(p, q), shuffle([ens(-p, -q), `$\\mathbb{R} \\setminus \\{${pick([p, q])}\\}$`, "$\\mathbb{R}$", ens(p, -q)]));
      const den = `(${poly([1, -p])})(${poly([1, -q])})`;
      return {
        enonce: `Soit $f(x) = \\dfrac{${num}}{${den}}$. Quel est l'ensemble de définition de $f$ ?`,
        mode: "choix", choix: ms.choix, attendu: ms.attendu,
        aides: ["Les valeurs interdites sont celles qui annulent le dénominateur.", `Un produit est nul si et seulement si l'un de ses facteurs est nul : $${poly([1, -p])} = 0$ ou $${poly([1, -q])} = 0$.`, `On trouve deux valeurs interdites, $${p}$ et $${q}$ : on les retire de $\\mathbb{R}$.`],
        solution: `$${den} = 0 \\iff x = ${p}$ ou $x = ${q}$. Ces deux valeurs sont interdites : $D = \\mathbb{R} \\setminus \\{${Math.min(p, q)}\\,;${Math.max(p, q)}\\}$.`
      };
    }
    let num, den, r, mid = "", erreurs = [];
    if (t === 0) {
      let a, b, c; do { a = randNZ(-4, 4); b = randNZ(-6, 6); c = randNZ(-7, 7); } while (b === a * c);
      num = poly([a, b]); den = poly([1, c]); r = -c;
      erreurs.push({ valeur: c, message: `Attention au signe : $${den} = 0$ donne $x = ${-c}$.` });
      if (b % a === 0) erreurs.push({ valeur: -b / a, message: "Cette valeur annule le **numérateur** : le quotient vaut alors $0$, il existe bien. C'est le **dénominateur** qui ne doit pas s'annuler." });
    } else if (t === 1) {
      const a = pick([2, 3, 4, 5, -2, -3, -4]); r = Math.abs(a) % 2 === 0 && Math.random() < 0.5 ? pick([-2.5, -1.5, -0.5, 0.5, 1.5, 2.5, 3.5]) : randNZ(-5, 5);
      num = poly([randNZ(-3, 3), randNZ(-9, 9)]); den = poly([a, -a * r]); mid = `${a}x = ${a * r} \\iff `;
      erreurs.push({ valeur: -r, message: `Attention au signe : $${den} = 0 \\iff ${a}x = ${a * r}$.` }, { valeur: a * r, message: `Il reste à diviser par $${a}$.` });
    } else {
      const c = randNZ(-9, 9); r = c;
      num = poly([randNZ(-3, 3), randNZ(-9, 9)]); den = `${c} - x`;
      erreurs.push({ valeur: -c, message: `Attention au signe : $${c} - x = 0 \\iff x = ${c}$.` });
    }
    return {
      enonce: `Soit $f(x) = \\dfrac{${num}}{${den}}$. Quelle valeur de $x$ est interdite ?`,
      mode: "nombre", prefixe: "x ≠", attendu: r, erreurs: fgErreurs(r, erreurs),
      aides: ["Un quotient n'existe pas quand son dénominateur vaut $0$.", `Résous l'équation $${den} = 0$.`, t === 1 ? "Isole le terme en $x$, puis divise par son coefficient." : t === 2 ? "Ajoute $x$ aux deux membres." : `$${den} = 0 \\iff x = ${fr(r)}$.`],
      solution: `$${den} = 0 \\iff ${mid}x = ${fr(r)}$. La valeur $${fr(r)}$ n'a pas d'image.\n\n$D = \\mathbb{R} \\setminus \\{${fr(r)}\\}$`
    };
  };

  // Domaine d'étude d'une fonction dans un problème (choix d'un intervalle)
  const fgFigEnclos = (h, nom) => `<svg class="graph" viewBox="0 0 320 150" role="img" aria-label="Rectangle de largeur x et de longueur ${h} − x"><rect class="g-poly" x="70" y="22" width="180" height="92"/><text class="g-mesure" x="60" y="72" text-anchor="end">x</text><text class="g-mesure" x="160" y="134" text-anchor="middle">${h} − x</text><text class="g-label" x="160" y="72" text-anchor="middle">${nom || "enclos des cabris"}</text></svg>`;
  function fgFigBoite(c) {
    const s = 124, x0 = 112, y0 = 22, k = 24;
    let svg = `<svg class="graph" viewBox="0 0 320 160" role="img" aria-label="Plaque carrée de ${c} cm de côté : on découpe un carré de côté x à chaque coin"><rect class="g-poly" x="${x0}" y="${y0}" width="${s}" height="${s}"/>`;
    [[0, 0], [s - k, 0], [0, s - k], [s - k, s - k]].forEach(([dx, dy]) => { svg += `<rect class="g-poly g-poly-image" x="${x0 + dx}" y="${y0 + dy}" width="${k}" height="${k}"/>`; });
    svg += `<path class="g-cache" style="fill:none" d="M${x0 + k} ${y0 + k}H${x0 + s - k}V${y0 + s - k}H${x0 + k}Z"/>`;
    svg += `<text class="g-mesure" x="${x0 + k / 2}" y="${y0 - 6}" text-anchor="middle">x</text><text class="g-mesure" x="${x0 - 8}" y="${y0 + k / 2 + 4}" text-anchor="end">x</text>`;
    svg += `<text class="g-mesure" x="${x0 - 8}" y="${y0 + s / 2 + 4}" text-anchor="end">${c} cm</text><text class="g-label" x="${x0 + s / 2}" y="${y0 + s / 2 + 4}" text-anchor="middle">fond</text>`;
    return svg + `</svg>`;
  }
  function fgDomaine() {
    const nm = pick(fgNoms), t = rand(0, 3);
    let enonce, bonne, fausses, aides, solution, figure;
    if (t === 0) {
      const h = rand(6, 25), P = 2 * h, lieu = pick(["Combani", "Tsingoni", "Chirongui", "Kani-Kéli", "Dembéni", "Sada", "Bandrélé"]);
      enonce = `À ${lieu}, ${nm} clôture un enclos rectangulaire pour ses cabris avec $${P}$ m de grillage. On note $x$ sa largeur (en m) : sa longueur vaut alors $${h} - x$ et son aire est $A(x) = x(${h} - x)$.\n\nSur quel intervalle la variable $x$ peut-elle varier dans ce problème ?`;
      bonne = `$]0\\,;${h}[$`; fausses = [`$]0\\,;${P}[$`, "$]0\\,;+\\infty[$", "$\\mathbb{R}$"]; figure = fgFigEnclos(h);
      aides = ["Les deux côtés du rectangle sont des longueurs : elles doivent être strictement positives.", `La largeur doit vérifier $x > 0$ et la longueur $${h} - x > 0$.`, `$${h} - x > 0 \\iff x < ${h}$.`];
      solution = `Il faut $x > 0$ et $${h} - x > 0$, c'est-à-dire $0 < x < ${h}$. La fonction $A$ est étudiée sur $]0\\,;${h}[$ : c'est son **domaine d'étude**, plus petit que $\\mathbb{R}$ où la formule a un sens.`;
    } else if (t === 1) {
      const c = 2 * rand(5, 15);
      enonce = `${nm} fabrique une boîte sans couvercle pour ranger des gousses de vanille : dans une plaque de carton carrée de $${c}$ cm de côté, on découpe un carré de côté $x$ cm à chaque coin, puis on relève les bords. Le volume de la boîte est $V(x) = x(${c} - 2x)^2$.\n\nSur quel intervalle la variable $x$ peut-elle varier ?`;
      bonne = `$]0\\,;${c / 2}[$`; fausses = [`$]0\\,;${c}[$`, "$]0\\,;+\\infty[$", "$\\mathbb{R}$"]; figure = fgFigBoite(c);
      aides = ["$x$ est une longueur : $x > 0$.", `Le fond de la boîte est un carré de côté $${c} - 2x$ : il faut $${c} - 2x > 0$.`, `$${c} - 2x > 0 \\iff 2x < ${c} \\iff x < ${c / 2}$.`];
      solution = `Il faut $x > 0$ et $${c} - 2x > 0$, soit $0 < x < ${c / 2}$ : la variable $x$ varie dans $]0\\,;${c / 2}[$.`;
    } else if (t === 2) {
      const d = pick([20, 25, 40, 50]), T = rand(8, 30), V0 = d * T;
      enonce = `La citerne d'une maison de Koungou contient $${nb(V0)}$ L d'eau. On en utilise $${d}$ L par jour, sans la remplir : après $t$ jours, il reste $V(t) = ${nb(V0)} - ${d}t$ litres.\n\nSur quel intervalle la fonction $V$ a-t-elle un sens dans ce problème ?`;
      bonne = `$[0\\,;${T}]$`; fausses = [`$[0\\,;${nb(V0)}]$`, "$[0\\,;+\\infty[$", "$\\mathbb{R}$"];
      aides = ["$t$ est une durée : $t \\geqslant 0$.", "Le volume d'eau restant ne peut pas être négatif : il faut $V(t) \\geqslant 0$.", `$${nb(V0)} - ${d}t \\geqslant 0 \\iff t \\leqslant ${T}$.`];
      solution = `Il faut $t \\geqslant 0$ et $V(t) \\geqslant 0$, c'est-à-dire $t \\leqslant \\dfrac{${nb(V0)}}{${d}} = ${T}$. La fonction $V$ a un sens sur $[0\\,;${T}]$ : au bout de $${T}$ jours, la citerne est vide.`;
    } else {
      const D = pick([6, 8, 10, 12, 15]);
      enonce = `Une pirogue doit parcourir $${D}$ km dans le lagon. À la vitesse moyenne $v$ (en km/h), le trajet dure $t(v) = \\dfrac{${D}}{v}$ heures.\n\nSur quel ensemble la fonction $t$ a-t-elle un sens dans ce problème ?`;
      bonne = "$]0\\,;+\\infty[$"; fausses = ["$\\mathbb{R} \\setminus \\{0\\}$", "$\\mathbb{R}$", `$\\mathbb{R} \\setminus \\{${D}\\}$`];
      aides = ["On ne peut pas diviser par $0$ : $v \\neq 0$.", "Mais dans ce problème, $v$ est une vitesse : la pirogue avance, donc $v > 0$.", "On garde seulement les valeurs de $v$ qui ont un sens."];
      solution = "La formule demande $v \\neq 0$ : elle a un sens sur $\\mathbb{R} \\setminus \\{0\\}$. Mais une vitesse est strictement positive : dans ce problème, $t$ est étudiée sur $]0\\,;+\\infty[$.";
    }
    const ms = melangeChoix(bonne, fausses);
    return { enonce, figure, mode: "choix", choix: ms.choix, attendu: ms.attendu, aides, solution };
  }

  /* Le point est-il sur la courbe ? Calculer une coordonnée */
  function fgFonctionPoint() {
    const t = rand(0, 3);
    if (t === 0) { const a = randNZ(-5, 5), b = randNZ(-8, 8); return { f: (x) => a * x + b, expr: poly([a, b]), a, b, affine: true, xs: [-4, -3, -2, -1, 1, 2, 3, 4], sub: (p) => `${fgFois(a)}${fgPar(p)} ${sg(b)}`,
      err: (p) => [a < 0 || p < 0 ? { valeur: b - a * p, message: `Attention à la règle des signes : $${fgFois(a)}${fgPar(p)} = ${a * p}$.` } : null, { valeur: a * (p + b), message: "Respecte les priorités : le produit d'abord, puis l'addition." }, Math.abs(a) !== 1 ? { valeur: a + p + b, message: `« $${a}x$ » signifie $${a} \\times x$ : on multiplie, on n'ajoute pas.` } : null] }; }
    if (t === 1) { const a = randNZ(-2, 2), c = randNZ(-6, 6); return { f: (x) => a * x * x + c, expr: poly([a, 0, c]), xs: [-3, -2, -1, 1, 2, 3], sub: (p) => `${fgFois(a)}${fgPar(p)}^2 ${sg(c)}`,
      err: (p) => [p < 0 ? { valeur: -a * p * p + c, message: `Un carré n'est jamais négatif : $${fgPar(p)}^2 = ${p * p}$.` } : null, { valeur: 2 * a * p + c, message: `$x^2 = x \\times x$ : $${fgPar(p)}^2 = ${p * p}$, pas $${2 * p}$.` }, { valeur: a * a * p * p + c, message: `Seul $x$ est au carré : on ne met pas $${a}$ au carré.` }] }; }
    if (t === 2) { const a = pick([-1, 1]), b = randNZ(-4, 4), c = randNZ(-6, 6); return { f: (x) => a * x * x + b * x + c, expr: poly([a, b, c]), xs: [-3, -2, -1, 1, 2, 3], sub: (p) => `${fgFois(a)}${fgPar(p)}^2 ${b < 0 ? "-" : "+"} ${fgFois(Math.abs(b))}${fgPar(p)} ${sg(c)}`,
      err: (p) => [p < 0 ? { valeur: -a * p * p + b * p + c, message: `Un carré n'est jamais négatif : $${fgPar(p)}^2 = ${p * p}$.` } : null, { valeur: 2 * a * p + b * p + c, message: `$x^2 = x \\times x$ : $${fgPar(p)}^2 = ${p * p}$, pas $${2 * p}$.` }, (b < 0 || p < 0) && Math.abs(b) !== 1 ? { valeur: a * p * p - b * p + c, message: `Attention à la règle des signes : $${fgFois(b)}${fgPar(p)} = ${b * p}$.` } : null] }; }
    const k = pick([-12, -8, -6, -4, 4, 6, 8, 12]), dv = [1, 2, 3, 4, 6].filter((d) => k % d === 0 && Math.abs(k / d) <= 8);
    return { f: (x) => k / x, expr: `\\dfrac{${k}}{x}`, inv: k, xs: dv.concat(dv.map((d) => -d)), sub: (p) => `\\dfrac{${k}}{${fr(p)}}`,
      err: (p) => [{ valeur: p / k, message: `On divise $${k}$ par $${fgPar(p)}$, pas l'inverse.` }, { valeur: -k / p, message: "Attention à la règle des signes dans le quotient." }, { valeur: k * p, message: "$f(x)$ est un quotient : on divise, on ne multiplie pas." }] };
  }
  // Courbe d'une fonction de fgFonctionPoint (deux branches pour l'hyperbole)
  function fgCourbePoint(F, extra) {
    const aria = { aria: "Courbe de la fonction f dans un repère quadrillé" };
    if (F.inv) { const m = Math.abs(F.inv) / 12.5; return graph(Object.assign({ xmin: -7, xmax: 7, ymin: -13.5, ymax: 13.5, ystep: 2, xetiq: 2, yetiq: 4, h: 330, curves: [{ f: F.f, a: -6.6, b: -m, closed: false }, { f: F.f, a: m, b: 6.6, closed: false, couleur: 0, label: fgSub("Cf"), lx: 6.6, dx: -2, dy: -8 }] }, aria, extra || {})); }
    return graph(fgRepere([F.f], -4, 4, Object.assign({ curves: [{ f: F.f, a: -4, b: 4, closed: false, label: fgSub("Cf"), lx: 3.5, dx: 30, dy: -6 }] }, aria, extra || {})));
  }
  GEN["appartenance"] = function (i) {
    const t = i < 2 ? 0 : pick([0, 1, 2, 2]);
    const F = fgFonctionPoint(), p = pick(F.xs), fp = F.f(p), pt = (x, y) => `$(${x}\\,;${y})$`;
    if (t === 0) {
      const ecart = pick([0, 0, 0, -3, -2, -1, 1, 2, 3]), q = fp + ecart, att = ecart === 0 ? 0 : ecart > 0 ? 1 : 2;
      return {
        enonce: `Soit $f(x) = ${F.expr}$. Le point $M(${p}\\,;${q})$ appartient-il à la courbe $\\mathcal{C}_f$ de $f$ ?`,
        mode: "choix", choix: ["Oui, $M$ est sur la courbe", "Non, $M$ est au-dessus de la courbe", "Non, $M$ est en dessous de la courbe", "On ne peut pas le savoir sans tracer la courbe"], attendu: att,
        aides: [`Calcule l'image de l'**abscisse** du point : $f(${p})$.`, `$f(${p}) = ${F.sub(p)} = ${fp}$.`, `Compare $${fp}$ avec l'**ordonnée** de $M$, qui vaut $${q}$. Plus grande : $M$ est au-dessus du point de la courbe de même abscisse.`],
        solution: `$f(${p}) = ${F.sub(p)} = ${fp}$.\n\n` + (att === 0 ? "C'est bien l'ordonnée de $M$ : $M \\in \\mathcal{C}_f$." : `$${q} ${att === 1 ? ">" : "<"} ${fp}$ : $M$ est ${att === 1 ? "au-dessus" : "en dessous"} du point $(${p}\\,;${fp})$ de la courbe, donc $M \\notin \\mathcal{C}_f$.`),
        figureSolution: fgCourbePoint(F, { points: [{ x: p, y: q, label: "M" }].concat(att ? [{ x: p, y: fp, label: fgPt(p, fp), gauche: true }] : []) })
      };
    }
    if (t === 1) {
      const sur = (x, y) => x !== 0 && Math.abs(F.f(x) - y) < 1e-9;
      const cands = [[fp, p], [p, fp + pick([-2, -1, 1, 2])], [-p, fp], [p, -fp], [p + 1, fp], [p, fp + pick([-4, 3])]].filter(([x, y]) => !sur(x, y));
      const vus = new Set(), fausses = shuffle(cands).filter(([x, y]) => !vus.has(x + ";" + y) && vus.add(x + ";" + y)).slice(0, 3);
      const ms = melangeChoix(pt(p, fp), fausses.map(([x, y]) => pt(x, y)));
      return {
        enonce: `Voici la courbe $\\mathcal{C}_f$ de la fonction $f$ définie par $f(x) = ${F.expr}$. Parmi ces points, lequel appartient à $\\mathcal{C}_f$ ?`,
        figure: fgCourbePoint(F), mode: "choix", choix: ms.choix, attendu: ms.attendu,
        aides: ["Un point $(a\\,;b)$ appartient à $\\mathcal{C}_f$ quand $f(a) = b$ : l'ordonnée est l'image de l'abscisse.", "Pour chaque point, calcule l'image de son abscisse et compare-la à son ordonnée. Le graphique permet de vérifier.", `Par exemple, $f(${p}) = ${F.sub(p)} = ${fp}$.`],
        solution: `$f(${p}) = ${F.sub(p)} = ${fp}$ : le point ${pt(p, fp)} est sur la courbe. Pour chacun des autres points, l'image de l'abscisse n'est pas égale à l'ordonnée${F.inv && fausses.some(([x]) => x === 0) ? " (et $0$ n'a pas d'image)" : ""}.`
      };
    }
    if (F.affine && Math.random() < 0.5) {
      const k = fp;
      return {
        enonce: `Soit $f(x) = ${F.expr}$. Le point $B$ de la courbe $\\mathcal{C}_f$ a pour ordonnée $${k}$. Quelle est son abscisse ?`,
        mode: "nombre", prefixe: "x =", attendu: p,
        erreurs: fgErreurs(p, [{ valeur: F.f(k), message: `Tu as calculé $f(${k})$. On cherche au contraire l'abscisse $x$ telle que $f(x) = ${k}$.` }, { valeur: (k + F.b) / F.a, message: `Attention au signe : pour isoler $${poly([F.a, 0])}$, on ${F.b > 0 ? "retire" : "ajoute"} $${Math.abs(F.b)}$ aux deux membres.` }, { valeur: k - F.b, message: `Il reste à diviser par $${F.a}$.` }]),
        aides: [`$B$ est sur la courbe : son abscisse $x$ vérifie $f(x) = ${k}$.`, `Résous l'équation $${F.expr} = ${k}$.`, `$${poly([F.a, 0])} = ${k - F.b}$, puis divise par $${F.a}$.`],
        solution: `$${F.expr} = ${k} \\iff ${poly([F.a, 0])} = ${k - F.b} \\iff x = ${p}$. Donc $B(${p}\\,;${k})$.`,
        figureSolution: fgCourbePoint(F, { points: [{ x: p, y: k, label: `B${fgPt(p, k)}` }] })
      };
    }
    return {
      enonce: `Soit $f(x) = ${F.expr}$. Le point $A$ de la courbe $\\mathcal{C}_f$ a pour abscisse $${p}$. Quelle est son ordonnée ?`,
      mode: "nombre", prefixe: "y =", attendu: fp, erreurs: fgErreurs(fp, F.err(p)),
      aides: ["$A$ est sur la courbe : son ordonnée est l'image de son abscisse.", `Calcule $f(${p})$.`, `$f(${p}) = ${F.sub(p)}$.`],
      solution: `$f(${p}) = ${F.sub(p)} = ${fp}$. Donc $A(${p}\\,;${fp})$.`,
      figureSolution: fgCourbePoint(F, { points: [{ x: p, y: fp, label: `A${fgPt(p, fp)}` }] })
    };
  };

  GEN["lecture-image"] = function () {
    const P = parabole();
    const x0 = rand(P.h - 3, P.h + 3);
    const y0 = P.f(x0);
    return {
      enonce: `Voici la courbe d'une fonction $f$ définie sur $[${P.h - 3}\\,;${P.h + 3}]$. Lis l'image de $${x0}$.`,
      figure: graph(P.opts()),
      mode: "nombre", prefixe: `f(${x0}) =`, attendu: y0,
      aides: [
        `Repère $${x0}$ sur l'axe horizontal (l'axe des abscisses).`,
        "Monte ou descends verticalement jusqu'à toucher la courbe.",
        "Depuis ce point, va horizontalement jusqu'à l'axe vertical et lis la valeur."
      ],
      solution: `La courbe passe par le point $(${x0}\\,;${y0})$, donc $f(${x0}) = ${y0}$.`,
      figureSolution: graph(P.opts({ points: [{ x: x0, y: y0, label: `(${x0} ; ${y0})`.replace(/-/g, "−") }] }))
    };
  };

  GEN["lecture-antecedents"] = function (i) {
    const P = parabole();
    const aucun = i === 4 && Math.random() < 0.6;
    const d = aucun ? 0 : pick([0, 1, 2, 2, 3]);
    const k = aucun ? P.k - P.a : P.k + P.a * d * d;
    const sol = aucun ? [] : d === 0 ? [P.h] : [P.h - d, P.h + d];
    const txt = sol.length === 0 ? "aucun antécédent" : sol.length === 1 ? `un seul antécédent : $${sol[0]}$` : `deux antécédents : $${sol[0]}$ et $${sol[1]}$`;
    return {
      enonce: `Voici la courbe d'une fonction $f$ définie sur $[${P.h - 3}\\,;${P.h + 3}]$. Lis le ou les antécédents de $${k}$.`,
      figure: graph(P.opts()),
      mode: "ensemble", prefixe: "Antécédent(s) :", attendu: sol,
      aides: [
        `Imagine la droite horizontale $y = ${k}$.`,
        sol.length === 0 ? "Regarde bien : cette droite touche-t-elle la courbe ?" : `Elle coupe la courbe en ${sol.length === 1 ? "un seul point" : "deux points"}.`,
        sol.length === 0 ? "Si la droite ne touche pas la courbe, écris « aucun »." : "Lis l'abscisse de chaque point d'intersection (sur l'axe horizontal). Sépare les valeurs par un point-virgule."
      ],
      solution: `La droite $y = ${k}$ ${sol.length ? "coupe" : "ne coupe pas"} la courbe : $${k}$ a ${txt}.`,
      figureSolution: graph(P.opts({ hlines: [{ y: k, label: `y = ${k}`.replace("-", "−") }], points: sol.map((x) => ({ x, y: k })) }))
    };
  };

  GEN["resolution-graphique"] = function () {
    const P = parabole();
    const d = pick([1, 2]);
    const k = P.k + P.a * d * d;
    const L = P.h - 3, R = P.h + 3, u = P.h - d, v = P.h + d;
    const ops = [">", "\\geqslant", "<", "\\leqslant"];
    const op = pick(ops);
    // ensembles possibles
    const dedansS = interv(u, v, false, false), dedansL = interv(u, v, true, true);
    const dehorsS = `${interv(L, u, true, false)} \\cup ${interv(v, R, false, true)}`;
    const dehorsL = `${interv(L, u, true, true)} \\cup ${interv(v, R, true, true)}`;
    // a < 0 : la courbe est au-dessus de y=k entre u et v
    const strict = op === ">" || op === "<";
    const audessus = op === ">" || op === "\\geqslant";
    const dedans = (P.a < 0) === audessus;
    const bonne = dedans ? (strict ? dedansS : dedansL) : (strict ? dehorsS : dehorsL);
    const choix = shuffle([dedansS, dedansL, dehorsS, dehorsL]);
    return {
      enonce: `Voici la courbe d'une fonction $f$ définie sur $[${L}\\,;${R}]$. Résous graphiquement $f(x) ${op} ${k}$.`,
      figure: graph(P.opts()),
      mode: "choix", choix: choix.map((c) => `$S = ${c}$`), attendu: choix.indexOf(bonne),
      aides: [
        `Trace mentalement la droite $y = ${k}$. Elle coupe la courbe aux abscisses $${u}$ et $${v}$.`,
        `Repère la partie de la courbe située ${audessus ? "au-dessus" : "en dessous"} de cette droite.`,
        strict ? "Inégalité stricte : les bornes $" + u + "$ et $" + v + "$ sont exclues (crochets tournés vers l'extérieur)." : "Inégalité large : les bornes $" + u + "$ et $" + v + "$ sont incluses."
      ],
      solution: `La courbe est ${audessus ? "au-dessus" : "en dessous"} de la droite $y = ${k}$ pour $x$ ${dedans ? `entre $${u}$ et $${v}$` : `aux deux extrémités, de $${L}$ à $${u}$ et de $${v}$ à $${R}$`}.\n\n$S = ${bonne}$`,
      figureSolution: graph(P.opts({ hlines: [{ y: k, label: `y = ${k}`.replace("-", "−") }], points: [{ x: u, y: k }, { x: v, y: k }] }))
    };
  };


  /* Deux courbes (deux droites, ou une parabole et une droite) qui se coupent en des points à coordonnées entières.
     interieur : les points d'intersection sont strictement à l'intérieur de [L ; R] (utile pour les inéquations). */
  function deuxCourbes(i, interieur) {
    let f, g, L, R, sol, essais = 0;
    const deuxDroites = Math.random() < (i < 2 ? 0.6 : 0.2);
    for (;;) {
      essais++;
      if (deuxDroites) {
        // Deux droites sécantes en un point à coordonnées entières
        const x0 = rand(-2, 2), y0 = rand(-2, 2), m1 = randNZ(-2, 2);
        let m2; do { m2 = rand(-2, 2); } while (m2 === m1);
        f = (x) => m1 * (x - x0) + y0; g = (x) => m2 * (x - x0) + y0;
        L = x0 - rand(2, 3); R = x0 + rand(2, 3); sol = [x0];
      } else {
        // Une parabole et une droite qui la coupe en deux points (parfois un seul sur l'intervalle)
        const P = parabole(); f = P.f; L = P.h - 3; R = P.h + 3;
        const unSeul = i === 4 && Math.random() < 0.5;
        const m0 = interieur ? 1 : 0;
        let u = rand(L + m0, R - m0), v;
        do { v = unSeul ? pick([L - 1, L - 2, R + 1, R + 2]) : rand(L + m0, R - m0); } while (v === u);
        const m = P.a * (u + v - 2 * P.h), fu = f(u);
        g = (x) => fu + m * (x - u);
        sol = unSeul ? [u] : [Math.min(u, v), Math.max(u, v)];
      }
      // La droite doit rester lisible dans le repère
      const ys = [L, R].map(g).concat([L, R, (L + R) / 2].map(f));
      if (Math.max(...ys) - Math.min(...ys) <= 13 || essais > 60) break;
    }
    const xs = Array.from({ length: (R - L) * 4 + 1 }, (_, k) => L + k / 4);
    const vals = xs.map(f).concat(xs.map(g), [0]);
    const opts = (extra) => Object.assign({
      xmin: Math.min(L - 0.6, -0.6), xmax: Math.max(R + 0.6, 0.6),
      ymin: Math.min(...vals) - 0.6, ymax: Math.max(...vals) + 0.6,
      curves: [
        { f, a: L, b: R, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", lx: R, dx: -2, dy: g(R) > f(R) ? 18 : -8 },
        { f: g, a: L, b: R, label: "C<tspan class=\"sub\" dy=\"3\">g</tspan>", lx: R, dx: -2, dy: g(R) > f(R) ? -8 : 18 }
      ],
      aria: "Courbes de deux fonctions f et g dans un repère quadrillé"
    }, extra || {});
    return { f, g, L, R, sol, opts };
  }

  /* Résoudre graphiquement f(x) = g(x) : abscisses des points d'intersection de deux courbes */
  GEN["graph-f-egal-g"] = function (i) {
    const { f, L, R, sol, opts } = deuxCourbes(i, false);
    const pts = sol.map((x) => `$(${x}\\,;${f(x)})$`);
    return {
      enonce: `Voici les courbes de deux fonctions $f$ et $g$ définies sur $[${L}\\,;${R}]$. Résous graphiquement l'équation $f(x) = g(x)$.`,
      figure: graph(opts()),
      mode: "ensemble", prefixe: "Solution(s) :", attendu: sol,
      aides: [
        "Les solutions de $f(x) = g(x)$ sont les **abscisses** des points où les deux courbes se coupent.",
        `Sur $[${L}\\,;${R}]$, les courbes se coupent en ${sol.length === 1 ? "un seul point" : "deux points"}.`,
        "Lis l'abscisse de chaque point d'intersection sur l'axe horizontal (pas son ordonnée !). Sépare les valeurs par « ; »."
      ],
      solution: `Les courbes $\\mathcal{C}_f$ et $\\mathcal{C}_g$ se coupent ${sol.length === 1 ? `en un seul point : ${pts[0]}` : `en deux points : ${pts[0]} et ${pts[1]}`}.\n\nOn garde les abscisses : $S = \\{${sol.join("\\,;")}\\}$.`,
      figureSolution: graph(opts({ points: sol.map((x) => ({ x, y: f(x) })) }))
    };
  };

  /* Inéquations f(x) > g(x), f(x) ⩾ g(x), f(x) < g(x), f(x) ⩽ g(x) */
  const OPS = [">", "\\geqslant", "<", "\\leqslant"];
  const OPS_TXT = { ">": "strictement au-dessus de", "\\geqslant": "au-dessus de (ou sur)", "<": "strictement en dessous de", "\\leqslant": "en dessous de (ou sur)" };
  const OPS_INV = { ">": "<", "<": ">", "\\geqslant": "\\leqslant", "\\leqslant": "\\geqslant" };
  // Ensemble des x de [L ; R] tels que f(x) op g(x), quand les courbes se croisent aux abscisses sol (intérieures à [L ; R])
  function ensembleInegalite(f, g, L, R, sol, op) {
    const p = [L, ...sol, R], large = op === "\\geqslant" || op === "\\leqslant", dessus = op === ">" || op === "\\geqslant";
    const morceaux = [];
    for (let k = 0; k + 1 < p.length; k++) {
      const m = (p[k] + p[k + 1]) / 2;
      if ((f(m) > g(m)) === dessus) morceaux.push(interv(p[k], p[k + 1], k === 0 || large, k + 2 === p.length || large));
    }
    return morceaux.join(" \\cup ");
  }

  GEN["graph-f-inf-g"] = function (i) {
    const { f, g, L, R, sol, opts } = deuxCourbes(i, true);
    const op = pick(OPS), large = op === "\\geqslant" || op === "\\leqslant";
    const ens = OPS.map((o) => ensembleInegalite(f, g, L, R, sol, o));
    const bonne = ens[OPS.indexOf(op)], mel = shuffle(ens);
    const xs = sol.map((x) => `$${x}$`).join(" et ");
    return {
      enonce: `Voici les courbes de deux fonctions $f$ et $g$ définies sur $[${L}\\,;${R}]$. Résous graphiquement l'inéquation $f(x) ${op} g(x)$.`,
      figure: graph(opts()),
      mode: "choix", choix: mel.map((e) => `$S = ${e}$`), attendu: mel.indexOf(bonne),
      aides: [
        `$f(x) ${op} g(x)$ : on cherche les abscisses des points où $\\mathcal{C}_f$ est ${OPS_TXT[op]} $\\mathcal{C}_g$.`,
        `Les courbes se coupent ${sol.length === 1 ? "en $x = " + sol[0] + "$" : "en $x = " + sol[0] + "$ et $x = " + sol[1] + "$"}. De part et d'autre, regarde quelle courbe est au-dessus.`,
        large ? "Inégalité large : les abscisses des points d'intersection sont **incluses**." : "Inégalité stricte : les abscisses des points d'intersection sont **exclues**. Les bornes de l'intervalle de définition restent incluses si elles conviennent."
      ],
      solution: `Les courbes se coupent pour $x = ${sol.join("$ et $x = ")}$. On lit les abscisses des points où $\\mathcal{C}_f$ est ${OPS_TXT[op]} $\\mathcal{C}_g$, ${large ? "en incluant" : "en excluant"} ${sol.length === 1 ? "l'abscisse " + xs : "les abscisses " + xs} des points d'intersection.\n\n$S = ${bonne}$`,
      figureSolution: graph(opts({ points: sol.map((x) => ({ x, y: f(x) })) }))
    };
  };

  // Deux courbes et leurs points communs, pour les solutions des résolutions par le calcul
  const fgDeuxCourbes = (f, g, L, R, pts, extra) => fgGraphe(fgRepere([f, g], L, R, Object.assign({
    curves: [{ f, a: L, b: R, closed: false, label: fgSub("Cf"), lx: R, dx: -2, dy: g(R) > f(R) ? 18 : -8 }, { f: g, a: L, b: R, closed: false, label: fgSub("Cg"), lx: R, dx: -2, dy: g(R) > f(R) ? -8 : 18 }],
    points: pts.map((x) => ({ x, y: f(x) })), aria: `Courbes de f et g : elles se coupent ${pts.length > 1 ? "aux points d'abscisses " + pts.map(nbSvg).join(" et ") : "au point d'abscisse " + nbSvg(pts[0])}`
  }, extra || {})), (X, Y, H) => pts.map((x) => fgEtiquette(X, Y, H, x, f(x), [[f, L, R], [g, L, R]], fgPt(x, f(x)))).join(""));

  /* Résoudre f(x) = g(x) par le calcul (niveau Seconde : premier degré ou produit nul) */
  GEN["calcul-f-egal-g"] = function (i) {
    const type = i < 2 ? pick([0, 0, 3]) : i < 4 ? pick([0, 1, 3]) : pick([1, 2, 3]);
    if (type === 0) {
      // ax + b = cx + d
      const a = randNZ(-5, 5); let c; do { c = randNZ(-5, 5); } while (c === a);
      const x0 = rand(-5, 5), b = randNZ(-9, 9), d = (a - c) * x0 + b, A = a - c, B = d - b;
      return {
        enonce: `Soit $f(x) = ${poly([a, b])}$ et $g(x) = ${poly([c, d])}$. Résous l'équation $f(x) = g(x)$.`,
        mode: "ensemble", prefixe: "Solution(s) :", attendu: [x0],
        aides: [
          `Écris l'équation : $${poly([a, b])} = ${poly([c, d])}$.`,
          `Regroupe les $x$ à gauche et les nombres à droite : $${poly([a, 0])} ${c > 0 ? "-" : "+"} ${poly([Math.abs(c), 0])} = ${d} ${b > 0 ? "-" : "+"} ${Math.abs(b)}$, soit $${poly([A, 0])} = ${B}$.`,
          A === 1 ? "C'est fini : la valeur de $x$ est trouvée." : A === -1 ? "Multiplie les deux membres par $-1$." : `Divise les deux membres par $${A}$.`
        ],
        solution: `$${poly([a, b])} = ${poly([c, d])} \\iff ${A === 1 ? "" : `${poly([A, 0])} = ${B} \\iff `}x = ${x0}$.\n\n$S = \\{${x0}\\}$. Vérification : $f(${x0}) = g(${x0}) = ${a * x0 + b}$. Les deux droites se coupent au point $(${x0}\\,;${a * x0 + b})$.`,
        figureSolution: fgDeuxCourbes((x) => a * x + b, (x) => c * x + d, x0 - 3, x0 + 3, [x0])
      };
    }
    if (type === 1) {
      // (x + p)² = x² + q : les x² s'éliminent
      const p = randNZ(-4, 4), x0 = rand(-4, 4), q = p * p + 2 * p * x0;
      const fx = `(x ${sg(p)})^2`, gx = poly([1, 0, q]);
      return {
        enonce: `Soit $f(x) = ${fx}$ et $g(x) = ${gx}$. Résous l'équation $f(x) = g(x)$.`,
        mode: "ensemble", prefixe: "Solution(s) :", attendu: [x0],
        aides: [
          `Développe $f(x)$ avec une identité remarquable : $${fx} = ${poly([1, 2 * p, p * p])}$.`,
          `L'équation devient $${poly([1, 2 * p, p * p])} = ${gx}$ : les $x^2$ s'éliminent.`,
          `Il reste $${poly([2 * p, 0])} = ${q - p * p}$.`
        ],
        solution: `$${fx} = ${gx} \\iff ${poly([1, 2 * p, p * p])} = ${gx} \\iff ${poly([2 * p, 0])} = ${q - p * p} \\iff x = ${x0}$.\n\n$S = \\{${x0}\\}$`,
        figureSolution: fgDeuxCourbes((x) => (x + p) * (x + p), (x) => x * x + q, x0 - 3, x0 + 3, [x0])
      };
    }
    if (type === 2) {
      // x² + bx + c = mx + c : on se ramène à x(x - r) = 0
      const b = rand(-5, 5), c = randNZ(-6, 6), r = randNZ(-6, 6), m = b + r;
      const sol = [0, r].sort((u, v) => u - v);
      return {
        enonce: `Soit $f(x) = ${poly([1, b, c])}$ et $g(x) = ${poly([m, c])}$. Résous l'équation $f(x) = g(x)$.`,
        mode: "ensemble", prefixe: "Solution(s) :", attendu: sol,
        aides: [
          "Passe tout du même côté pour obtenir une équation de la forme $\\ldots = 0$.",
          `$f(x) - g(x) = ${poly([1, -r, 0])}$. Factorise par $x$.`,
          `$x(x ${sg(-r)}) = 0$ : un produit est nul si et seulement si l'un de ses facteurs est nul.`
        ],
        solution: `$f(x) = g(x) \\iff ${poly([1, -r, 0])} = 0 \\iff x(x ${sg(-r)}) = 0 \\iff x = 0$ ou $x = ${r}$.\n\n$S = \\{${sol.join("\\,;")}\\}$. La parabole et la droite se coupent aux points d'abscisses $${sol.join("$ et $")}$.`,
        figureSolution: fgDeuxCourbes((x) => x * x + b * x + c, (x) => m * x + c, sol[0] - 2, sol[1] + 2, sol)
      };
    }
    // Abscisse exacte d'un point d'intersection qu'on ne peut pas lire sur le quadrillage
    let a, c, b, d, A, N;
    do { a = randNZ(-3, 3); c = randNZ(-3, 3); A = a - c; b = rand(-6, 6); d = rand(-6, 6); N = d - b; } while (Math.abs(A) < 2 || N % A === 0 || Math.abs(N / A) > 3.4 || Math.abs(a * N / A + b) > 6);
    const x0 = N / A, y0 = a * x0 + b, fx = poly([a, b]), gx = poly([c, d]), f = (x) => a * x + b, g = (x) => c * x + d, L = Math.floor(x0) - 2, R = Math.floor(x0) + 3;
    const dec = !fgDecimal(N, A), ex = frac(N, A);
    const erreurs = [{ valeur: -x0, message: "Attention au signe en divisant les deux membres." }];
    if (b) erreurs.push({ valeur: (d + b) / A, message: `Attention aux signes : en regroupant les nombres, on calcule $${d} - ${par(b)} = ${N}$.` });
    if (a + c) erreurs.push({ valeur: N / (a + c), message: `Pour regrouper les $x$, on calcule $${a} - ${par(c)} = ${A}$.` });
    return {
      enonce: `Soit $f(x) = ${fx}$ et $g(x) = ${gx}$. Leurs droites se coupent en un point $I$ qui n'est pas sur un nœud du quadrillage : on ne peut pas lire son abscisse avec précision.\n\nCalcule la valeur exacte de l'abscisse de $I$ (une fraction si besoin).`,
      figure: fgGraphe(fgRepere([f, g], L, R, { curves: [{ f, a: L, b: R, closed: false, label: fgSub("Cf"), lx: R, dx: -2, dy: g(R) > f(R) ? 18 : -8 }, { f: g, a: L, b: R, closed: false, label: fgSub("Cg"), lx: R, dx: -2, dy: g(R) > f(R) ? -8 : 18 }], points: [{ x: x0, y: y0 }], aria: "Droites de f et g, sécantes en un point I qui n'est pas sur un nœud du quadrillage" }), (X, Y, H) => fgEtiquette(X, Y, H, x0, y0, [[f, L, R], [g, L, R]], "I")),
      mode: "nombre", prefixe: "x =", attendu: x0, erreurs: fgErreurs(x0, erreurs.concat(dec ? fgApprox(x0) : [])),
      aides: ["L'abscisse de $I$ est la solution de l'équation $f(x) = g(x)$.", `Regroupe les $x$ d'un côté et les nombres de l'autre : $${poly([A, 0])} = ${N}$.`, `Divise par $${A}$, puis simplifie la fraction si c'est possible.`],
      solution: `$${fx} = ${gx} \\iff ${poly([A, 0])} = ${N} \\iff x = ${ex}$.\n\nL'abscisse de $I$ est ` + (dec ? `$${ex}$, environ $${fr(+x0.toFixed(2))}$` : `$${ex} = ${fr(x0)}$`) + " : c'est cohérent avec le graphique."
    };
  };

  // Deux tarifs dans une situation de Mayotte : pour quelles durées le premier est-il le moins cher ?
  function fgTarifs() {
    const S = pick([
      { qui: "Deux loueurs de kayaks de Sakouli", obj: "un kayak" },
      { qui: "Deux loueurs de vélos électriques de Dembéni", obj: "un vélo électrique" },
      { qui: "Deux loueurs de bateaux du port de Longoni", obj: "un bateau de pêche" },
      { qui: "Deux loueurs de scooters de Pamandzi", obj: "un scooter" }
    ]);
    const ts = pick([2, 3, 4, 5, 6, 1.5, 2.5, 3.5, 4.5]), D = Number.isInteger(ts) ? rand(1, 4) : pick([2, 4]), c = rand(2, 7), a = c + D, d = D * ts, T = ts <= 3 ? 6 : 10;
    const op = pick(OPS), ens = { "<": `[0\\,;${fr(ts)}[`, "\\leqslant": `[0\\,;${fr(ts)}]`, ">": `]${fr(ts)}\\,;${T}]`, "\\geqslant": `[${fr(ts)}\\,;${T}]` };
    const mots = { "<": "strictement moins cher que", "\\leqslant": "moins cher que B, ou au même prix", ">": "strictement plus cher que", "\\geqslant": "plus cher que B, ou au même prix" };
    const ms = melangeChoix(`$S = ${ens[op]}$`, shuffle(Object.keys(ens).filter((o) => o !== op).map((o) => `$S = ${ens[o]}$`)));
    const A = (t) => a * t, B = (t) => c * t + d;
    return {
      enonce: `${S.qui} proposent leurs tarifs pour louer ${S.obj} pendant $t$ heures, avec $t \\in [0\\,;${T}]$ :\n\n- loueur A : $${a}$ € par heure, soit $A(t) = ${a}t$ ;\n- loueur B : $${d}$ € de forfait puis $${c}$ € par heure, soit $B(t) = ${c}t + ${d}$.\n\nPour quelles durées le loueur A est-il ${mots[op].replace(/ que B,/, ",").replace(/ que$/, " que le loueur B")} ? Résous l'inéquation $A(t) ${op} B(t)$.`,
      figure: graph(fgRepere([A, B], 0, T, { curves: [{ f: A, a: 0, b: T, label: "A", lx: T, dx: -4, dy: -8 }, { f: B, a: 0, b: T, label: "B", lx: T, dx: -4, dy: 16 }], xlabel: "t (h)", ylabel: "prix (€)", aria: `Droites des tarifs A et B pour t de 0 à ${T} heures` })),
      mode: "choix", choix: ms.choix, attendu: ms.attendu,
      aides: [`Écris l'inéquation $${a}t ${op} ${c}t + ${d}$ et regroupe les $t$ d'un côté.`, `Tu obtiens $${D === 1 ? "" : D}t ${op} ${d}$ ; divise par $${D}$, un nombre positif : le sens ne change pas.`, `N'oublie pas que $t$ est entre $0$ et $${T}$. Sur le graphique, les droites se croisent pour $t = ${fr(ts)}$.`],
      solution: `$${a}t ${op} ${c}t + ${d} \\iff ${D === 1 ? "" : D}t ${op} ${d} \\iff t ${op} ${fr(ts)}$. Avec $t \\in [0\\,;${T}]$ : $S = ${ens[op]}$.\n\nSur le graphique, la droite de A est ${op === "<" || op === "\\leqslant" ? "en dessous de" : "au-dessus de"} celle de B ${op === "<" || op === "\\leqslant" ? "avant" : "après"} leur point commun, d'abscisse $${fr(ts)}$.`
    };
  }

  /* Résoudre f(x) > g(x), f(x) ≤ g(x)… par le calcul : inéquation du premier degré */
  GEN["calcul-f-inf-g"] = function (i) {
    if (i >= 2 && Math.random() < 0.3) return fgTarifs();
    const op = pick(OPS), A = pick([-4, -3, -2, -1, 2, 3, 4]);
    const a = randNZ(-5, 5), c = a - A, x0 = rand(-6, 6), b = randNZ(-9, 9), d = b + A * x0, B = d - b;
    const op2 = A < 0 ? OPS_INV[op] : op;
    const intervalle = (o) => (o === ">" || o === "\\geqslant" ? interv(x0, "+\\infty", o === "\\geqslant", false) : interv("-\\infty", x0, false, o === "\\leqslant"));
    const ens = OPS.map(intervalle), bonne = intervalle(op2), mel = shuffle(ens);
    const f = (x) => a * x + b, g = (x) => c * x + d, L = x0 - 3, R = x0 + 3, droite = op2 === ">" || op2 === "\\geqslant";
    return {
      enonce: `Soit $f(x) = ${poly([a, b])}$ et $g(x) = ${poly([c, d])}$. Résous l'inéquation $f(x) ${op} g(x)$.`,
      mode: "choix", choix: mel.map((e) => `$S = ${e}$`), attendu: mel.indexOf(bonne),
      aides: [
        `Écris l'inéquation $${poly([a, b])} ${op} ${poly([c, d])}$, puis regroupe les $x$ à gauche et les nombres à droite.`,
        `Tu obtiens $${poly([A, 0])} ${op} ${B}$.`,
        A < 0 ? `On divise par $${A}$, un nombre **négatif** : le sens de l'inégalité **change** !` : `On divise par $${A}$, un nombre positif : le sens de l'inégalité ne change pas.`
      ],
      solution: `$${poly([a, b])} ${op} ${poly([c, d])} \\iff ${poly([A, 0])} ${op} ${B} \\iff x ${op2} ${x0}$` +
        (A < 0 ? `. On a divisé par $${A}$, négatif : le sens de l'inégalité a changé.` : ".") + `\n\n$S = ${bonne}$. Sur la figure, la zone colorée montre où $\\mathcal{C}_f$ est ${op === ">" || op === "\\geqslant" ? "au-dessus" : "en dessous"} de $\\mathcal{C}_g$.`,
      figureSolution: fgDeuxCourbes(f, g, L, R, [x0], { aires: [{ f, g, a: droite ? x0 : L, b: droite ? R : x0 }] })
    };
  };

  /* Figures du chapitre 2 (cours, fiche méthode, QCM) */
  FIGURES["fonc-cours-sagittal"] = () => {
    const G = [[-3, 44], [3, 76], [-1, 108], [1, 140], [0, 172]], D = { 9: 64, 1: 122, 0: 166 };
    let s = `<svg class="graph" viewBox="0 0 320 206" role="img" aria-label="Fonction carré : −3 et 3 ont la même image 9, −1 et 1 ont la même image 1, 0 a pour image 0"><ellipse class="g-cercle" cx="78" cy="108" rx="44" ry="88"/><ellipse class="g-cercle" cx="242" cy="114" rx="40" ry="72"/>`;
    s += `<text class="g-label" x="78" y="13" text-anchor="middle">nombres x</text><text class="g-label" x="242" y="30" text-anchor="middle">images x²</text>`;
    G.forEach(([x, y]) => {
      const y2 = D[x * x], a = Math.atan2(y2 - y, 120);
      s += `<text class="g-label" x="78" y="${y + 4}" text-anchor="middle">${nbSvg(x)}</text><line class="g-droite" x1="96" y1="${y}" x2="${(220 - 8 * Math.cos(a)).toFixed(1)}" y2="${(y2 - 8 * Math.sin(a)).toFixed(1)}"/>`;
      s += `<path style="fill:var(--encre)" d="M220 ${y2}L${(220 - 9 * Math.cos(a - 0.4)).toFixed(1)} ${(y2 - 9 * Math.sin(a - 0.4)).toFixed(1)}L${(220 - 9 * Math.cos(a + 0.4)).toFixed(1)} ${(y2 - 9 * Math.sin(a + 0.4)).toFixed(1)}Z"/>`;
    });
    Object.keys(D).forEach((v) => { s += `<text class="g-label" x="242" y="${D[v] + 4}" text-anchor="middle">${v}</text>`; });
    return s + `</svg>`;
  };
  // Courbe de f(x) = (2x − 1)/(x + 2) : deux branches, valeur interdite −2
  const fgQuotient = (extra, aria) => { const q = (x) => (2 * x - 1) / (x + 2); return fgGraphe(Object.assign({ xmin: -7.6, xmax: 4.6, ymin: -6.6, ymax: 10.6, ystep: 2, h: 330, curves: [{ f: q, a: -7.3, b: -2.625, closed: false }, { f: q, a: -1.375, b: 4.3, closed: false, couleur: 0, label: fgSub("Cf"), lx: 4.3, dx: -2, dy: 18 }], aria }, extra || {}), (X, Y) => `<line class="g-axe" x1="${X(-2)}" y1="${Y(10.6)}" x2="${X(-2)}" y2="${Y(-6.6)}"/><text class="g-label g-axe-nom" x="${X(-2) + 5}" y="${Y(9.2)}">x = −2</text>`); };
  FIGURES["fonc-cours-interdite"] = () => fgQuotient({}, "Courbe de f(x) = (2x − 1)/(x + 2) en deux morceaux : aucun point n'a pour abscisse −2, la valeur interdite (droite verticale en pointillés)");
  FIGURES["fonc-cours-appartient"] = () => fgQuotient({ marques: [{ x: 0.45, y: -4.2, texte: "A(−1 ; −3)" }], points: [{ x: -1, y: -3 }, { x: 1, y: 1, label: "B(1 ; 1)" }] }, "Courbe de f(x) = (2x − 1)/(x + 2) : le point A(−1 ; −3) est sur la courbe, le point B(1 ; 1) est au-dessus");
  FIGURES["fonc-cours-tableau"] = () => graph({ xmin: -0.8, xmax: 10.8, ymin: -2, ymax: 27, ystep: 2, yetiq: 4, h: 300, xlabel: "x (m)", ylabel: "A(x) (m²)", curves: [{ f: (x) => x * (10 - x), a: 0, b: 10, closed: false }], marques: [{ x: 1.7, y: 22.6, texte: "(3 ; 21)" }], points: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => ({ x, y: x * (10 - x) })), aria: "Les points du tableau de valeurs de A(x) = x(10 − x), de (1 ; 9) à (9 ; 9), sont sur la courbe de A ; le point (3 ; 21) est indiqué" });
  FIGURES["fonc-cours-inequation"] = () => { const f = (x) => -2 * x + 1, g = (x) => x + 7; return graph({ xmin: -5.6, xmax: 3.6, ymin: -8.6, ymax: 12.6, ystep: 2, h: 330, aires: [{ f: g, g: f, a: -2, b: 3.3 }], curves: [{ f, a: -5.3, b: 3.3, closed: false, label: "y = −2x + 1", lx: 3.3, dx: -2, dy: 18 }, { f: g, a: -5.3, b: 3.3, closed: false, label: "y = x + 7", lx: 3.3, dx: -4, dy: -8 }], marques: [{ x: -2, y: 6.9, texte: "(−2 ; 5)" }], points: [{ x: -2, y: 5 }], aria: "Droites y = −2x + 1 et y = x + 7, sécantes au point (−2 ; 5) ; pour x supérieur ou égal à −2, la première est sous la seconde (zone colorée)" }); };
  FIGURES["fonc-cours-citerne"] = () => graph(fgRepere([(t) => 600 - 40 * t], 0, 19, { curves: [{ f: (t) => 600 - 40 * t, a: 0, b: 15 }], points: [{ x: 5, y: 400, label: "(5 ; 400)" }, { x: 15, y: 0 }], xlabel: "t (jours)", ylabel: "V (L)", aria: "Droite de V(t) = 600 − 40t sur [0 ; 15] : elle passe par (5 ; 400) et atteint 0 pour t = 15" }));
  const fgU = (x) => -x * x + 2 * x + 3;
  FIGURES["fonc-meth-lire"] = () => graph({ xmin: -2.6, xmax: 4.6, ymin: -5.6, ymax: 5.6, h: 300, curves: [{ f: fgU, a: -2, b: 4, label: fgSub("Cu"), lx: 3.6, dx: 28, dy: 4 }], hlines: [{ y: 3, label: "y = 3" }], chemins: [[[1, 0], [1, 4], [0, 4]]], points: [{ x: 1, y: 4, label: "u(1) = 4" }, { x: 0, y: 3 }, { x: 2, y: 3 }], aria: "Courbe de u : en pointillés, la lecture de l'image de 1, u(1) = 4 ; la droite y = 3 coupe la courbe aux points d'abscisses 0 et 2, les antécédents de 3" });
  FIGURES["fonc-meth-superieur"] = () => fgGraphe({ xmin: -2.6, xmax: 4.6, ymin: -5.6, ymax: 5.6, h: 300, aires: [{ f: fgU, a: -1, b: 3 }], curves: [{ f: fgU, a: -2, b: 4, label: fgSub("Cu"), lx: 3.6, dx: 28, dy: 4 }], points: [{ x: -1, y: 0 }, { x: 3, y: 0 }], aria: "Courbe de u : elle est strictement au-dessus de l'axe des abscisses entre −1 et 3 (zone colorée), donc u(x) > 0 pour x dans ]−1 ; 3[" }, (X, Y) => `<line class="g-int" x1="${X(-1)}" y1="${Y(0)}" x2="${X(3)}" y2="${Y(0)}"/>`);
  FIGURES["fonc-meth-point"] = () => graph({ xmin: -1.6, xmax: 4.2, ymin: -1, ymax: 14.6, ystep: 2, h: 300, curves: [{ f: (x) => x * x + 1, a: -1.4, b: 3.6, closed: false, label: fgSub("Cf"), lx: 3.6, dx: -10, dy: 4 }], points: [{ x: 3, y: 8, label: "B(3 ; 8)" }, { x: 3, y: 10, label: "(3 ; 10)", gauche: true }], aria: "Parabole de f(x) = x² + 1 : le point de la courbe d'abscisse 3 est (3 ; 10) ; le point B(3 ; 8) est en dessous, il n'est pas sur la courbe" });
  FIGURES["fonc-meth-antecedent"] = () => graph(fgRepere([(x) => 2 * x + 7], -5, 1, { curves: [{ f: (x) => 2 * x + 7, a: -5, b: 1, closed: false, label: fgSub("Cf"), lx: 1, dx: -6, dy: -2 }], hlines: [{ y: 1, label: "y = 1" }], points: [{ x: -3, y: 1, label: "(−3 ; 1)" }], aria: "Droite de f(x) = 2x + 7 et droite y = 1 : elles se coupent au point (−3 ; 1), donc −3 est l'antécédent de 1" }));
  FIGURES["fonc-meth-egal"] = () => fgDeuxCourbes((x) => 3 * x - 4, (x) => x + 2, -1, 5, [3]);
  FIGURES["fonc-qcm-courbes"] = () => { const f = (x) => x * x - 2 * x - 1, g = (x) => x - 1; return graph(fgRepere([f, g], -1, 4, { curves: [{ f, a: -1, b: 4, label: fgSub("Cf"), lx: 4, dx: -6, dy: -2 }, { f: g, a: -1, b: 4, label: fgSub("Cg"), lx: 4, dx: -4, dy: 18 }], aria: "Courbes de f (parabole) et g (droite) sur [−1 ; 4] : elles se coupent aux points (0 ; −1) et (3 ; 2) ; entre 0 et 3, la parabole est sous la droite" })); };
  FIGURES["fonc-qcm-cubique"] = () => graph({ xmin: -2.2, xmax: 4.2, ymin: -6.4, ymax: 6.4, h: 320, curves: [{ f: (x) => (x + 1) * (x - 1) * (x - 3), a: -1.5, b: 3.5, label: fgSub("Cf"), lx: 3.5, dx: -8, dy: 4 }], aria: "Courbe d'une fonction f définie sur [−1,5 ; 3,5] : elle coupe l'axe des abscisses en −1, 1 et 3, passe par (0 ; 3) et (2 ; −3), monte jusqu'à environ 3,1 puis descend jusqu'à environ −3,1 avant de remonter" });
  FIGURES["fonc-qcm-hyperbole"] = () => graph({ xmin: -7, xmax: 7, ymin: -7, ymax: 7, xetiq: 2, yetiq: 2, h: 320, curves: [{ f: (x) => 6 / x, a: -6.6, b: -0.88, closed: false }, { f: (x) => 6 / x, a: 0.88, b: 6.6, closed: false, couleur: 0, label: fgSub("Cf"), lx: 6.6, dx: -2, dy: -8 }], aria: "Courbe de f(x) = 6/x : deux branches, l'une pour x négatif, l'autre pour x positif" });
  /* ---------- Chapitre « Information chiffrée » ---------- */
  // 0.35 -> "0{,}35" (virgule française dans les formules)
  const fr = (n) => String(+(+n).toFixed(6)).replace(".", "{,}");
  const pc = (n) => `${fr(n)}\\,\\%`;
  const sgnPc = (n) => (n > 0 ? "+" : "") + pc(n);

  /* Outils du chapitre (préfixe ic ; aussi utilisés par le chapitre 8 de Seconde) */
  const icR = (x, k) => { const f = 10 ** (k === undefined ? 2 : k); return Math.round(x * f) / f; };
  const icDec = (x, k) => { const f = 10 ** (k === undefined ? 2 : k); return isFinite(x) && Math.abs(x * f - Math.round(x * f)) < 1e-6; };
  // erreurs prévues : jamais la bonne réponse, jamais deux fois la même valeur
  const icErr = (att, L) => { const vus = []; return L.filter((e) => e && isFinite(e.valeur) && Math.abs(e.valeur - att) > 1e-9 && !vus.some((v) => Math.abs(v - e.valeur) < 1e-9) && vus.push(e.valeur)); };
  // nombres d'une figure : « 2,5 », « 12 345 » (espace fine insécable) ; prix : 2{,}50 en KaTeX, « 2,50 € » dans une figure
  const icNb = (n) => { const [e, d] = String(+(+n).toFixed(6)).replace("-", "−").split("."); return e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? "," + d : ""); };
  const icEntier = (x) => Math.abs(x - Math.round(x)) < 1e-9;
  const icPrix = (x) => (icEntier(x) ? nb(Math.round(x)) : nb(Math.trunc(x)) + "{,}" + Math.abs(x).toFixed(2).split(".")[1]);
  const icPrixT = (x) => (icEntier(x) ? icNb(Math.round(x)) : icNb(Math.trunc(x)) + "," + Math.abs(x).toFixed(2).split(".")[1]) + " €";
  // prénoms et communes de Mayotte ; icCtx remplace {L} (commune), {P} (prénom) et {deP} (« de Zaïnaba », « d'Anli »), avec un seul tirage
  const icPrenoms = ["Anli", "Nassim", "Zaïnaba", "Fatima", "Moussa", "Awa", "Ibrahim", "Mariama", "Saïd", "Djamila", "Hamada", "Faïza", "Kamal", "Zalifa", "Ambdi", "Nasra", "Toiyb", "Roukia"];
  const icLieux = ["Mamoudzou", "Dzaoudzi", "Pamandzi", "Combani", "Sada", "Chirongui", "Bandrélé", "Kani-Kéli", "M'tsamboro", "Koungou", "Dembéni", "Tsingoni"];
  const icCtx = (o) => { const L = pick(icLieux), P = pick(icPrenoms), r = {}; Object.keys(o).forEach((k) => (r[k] = typeof o[k] === "string" ? o[k].replace(/\{L\}/g, L).replace(/\{deP\}/g, deN(P)).replace(/\{P\}/g, P) : o[k])); return r; };

  /* ---------- Figures du chapitre (classes du site, aucune couleur écrite en dur) ---------- */
  const icT = (x, y, t, cl, a) => `<text class="${cl || "g-label"}" x="${+(+x).toFixed(1)}" y="${+(+y).toFixed(1)}" text-anchor="${a || "middle"}">${t}</text>`;
  const icSvg = (h, aria, s) => `<svg class="graph" viewBox="0 0 320 ${h}" role="img" aria-label="${aria}">${s}</svg>`;
  // abscisse du centre d'une étiquette, ramenée dans le cadre
  const icDans = (c, t) => Math.min(Math.max(c, 6 + largeurTexte(t, 11) / 2), 314 - largeurTexte(t, 11) / 2);
  // flèche courbe de (x1 ; y1) à (x2 ; y2), bombée vers l'ordonnée cy ; cl : "" (première couleur) ou " g-curve-1" (seconde)
  function icArc(x1, y1, x2, y2, cy, cl) {
    const mx = (x1 + x2) / 2, a = Math.atan2(y2 - cy, x2 - mx), f = (v) => +(+v).toFixed(1);
    const p = (r, d) => `${f(x2 - r * Math.cos(a + d))} ${f(y2 - r * Math.sin(a + d))}`;
    return `<path class="g-curve${cl}" style="stroke-width:2" d="M${f(x1)} ${f(y1)}Q${f(mx)} ${f(cy)} ${p(5, 0)}"/><path class="g-end${cl}" d="M${f(x2)} ${f(y2)}L${p(10, 0.45)}L${p(10, -0.45)}Z"/>`;
  }
  // Barre d'une proportion : le tout (accolade du haut), la partie coloriée (accolade du bas) et son pourcentage
  function icBarre(o) {
    const w = Math.max(8, Math.min(292, 300 * o.p)), X = +(10 + w).toFixed(1);
    let s = `<rect class="g-rect" x="10" y="36" width="300" height="30"/><rect class="g-carreau" x="10" y="36" width="${+w.toFixed(1)}" height="30"/>`;
    s += `<path class="g-accolade" d="M10 30v-7H310v7"/>` + icT(160, 17, o.tout);
    s += `<path class="g-accolade" d="M10 72v7H${X}v-7"/>` + icT(icDans(10 + w / 2, o.part), 96, o.part, "g-mesure");
    s += w >= largeurTexte(o.pct, 11) + 12 ? icT(10 + w / 2, 55, o.pct) : icT(X + 6, 55, o.pct, "g-label", "start");
    return icSvg(104, o.aria, s);
  }
  // Ensembles emboîtés : en haut le tout et sa partie A ; en bas, A agrandie et sa partie C
  function icEmboite(o) {
    const w1 = Math.max(10, 300 * o.p1), w2 = Math.max(10, Math.min(290, 300 * o.p2)), X1 = +(10 + w1).toFixed(1), X2 = +(10 + w2).toFixed(1);
    let s = icT(160, 15, o.E) + `<rect class="g-rect" x="10" y="22" width="300" height="24"/><rect class="g-carreau" x="10" y="22" width="${+w1.toFixed(1)}" height="24"/>`;
    s += w1 >= largeurTexte(o.pA, 11) + 10 ? icT(10 + w1 / 2, 38, o.pA) : icT(X1 + 5, 38, o.pA, "g-label", "start");
    s += `<line class="g-guide" x1="10" y1="46" x2="10" y2="84"/><line class="g-guide" x1="${X1}" y1="46" x2="310" y2="84"/>` + icT(16, 69, o.A, "g-label", "start");
    s += `<rect class="g-carreau" x="10" y="84" width="300" height="24"/><rect class="g-barre-plus" x="10" y="84" width="${+w2.toFixed(1)}" height="24"/>`;
    s += w2 >= largeurTexte(o.pC, 11) + 10 ? icT(10 + w2 / 2, 100, o.pC) : icT(X2 + 5, 100, o.pC, "g-label", "start");
    s += `<path class="g-accolade" d="M10 113v6H${X2}v-6"/>` + icT(icDans(10 + w2 / 2, o.C), 135, o.C, "g-mesure");
    return icSvg(144, o.aria, s);
  }
  // Chaîne de valeurs (cases) : flèches « haut » entre deux cases voisines, flèches « bas » d'une case à une autre
  function icChaine(o) {
    const n = o.v.length, bw = n > 3 ? 62 : n > 2 ? 78 : 92, bh = o.leg ? 38 : 28, yb = 46, yB = yb + bh, bas = o.bas || [];
    const cx = (i) => 10 + bw / 2 + (i * (300 - bw)) / (n - 1);
    let s = "";
    o.v.forEach((v, i) => {
      s += `<rect class="g-rect" x="${+(cx(i) - bw / 2).toFixed(1)}" y="${yb}" width="${bw}" height="${bh}" rx="6"/>` + icT(cx(i), yB - 9, v);
      if (o.leg) s += `<g class="g-tick">${icT(cx(i), yb + 13, o.leg[i], " ")}</g>`;
    });
    (o.haut || []).forEach((t, i) => { const a = cx(i) + bw / 4, b = cx(i + 1) - bw / 4; s += icArc(a, yb - 2, b, yb - 2, yb - 36, "") + (t ? icT((a + b) / 2, yb - 25, t, "g-mesure") : ""); });
    bas.forEach((f) => { const a = cx(f.de), b = cx(f.a); s += icArc(a, yB + 2, b, yB + 2, yB + 46, " g-curve-1") + icT((a + b) / 2, yB + 40, f.t, "g-clabel g-curve-1"); });
    return icSvg(yB + (bas.length ? 50 : 10), o.aria, s);
  }
  // Deux barres (avant / après), une flèche de l'une à l'autre et, si besoin, l'écart entre leurs hauteurs
  function icBarres2(o) {
    const base = 146, m = Math.max(...o.v), xs = o.ecart ? [66, 164] : [96, 224], w = 60;
    const top = o.v.map((v) => +(base - Math.max(6, (92 * v) / m)).toFixed(1)), dans = top.map((t) => base - t >= 24);
    let s = `<line class="g-droite" x1="20" y1="${base}" x2="${o.ecart ? 216 : 300}" y2="${base}"/>`;
    o.v.forEach((v, i) => { s += `<rect class="g-rect" x="${xs[i] - w / 2}" y="${top[i]}" width="${w}" height="${+(base - top[i]).toFixed(1)}"/>` + icT(xs[i], dans[i] ? top[i] + 16 : top[i] - 6, o.lab[i]); });
    s += `<g class="g-tick">${o.et.map((t, i) => icT(xs[i], base + 14, t, " ")).join("")}</g>`;
    const y1 = top[0] - (dans[0] ? 4 : 20), y2 = top[1] - (dans[1] ? 4 : 20), cy = Math.min(y1, y2) - 30;
    s += icArc(xs[0], y1, xs[1], y2, cy, " g-curve-1") + icT((xs[0] + xs[1]) / 2, (y1 + 2 * cy + y2) / 4 - 7, o.fleche, "g-clabel g-curve-1");
    if (o.ecart) {
      const xe = xs[1] + w / 2 + 14;
      s += `<line class="g-guide" x1="${xs[0] + w / 2}" y1="${top[0]}" x2="${xe}" y2="${top[0]}"/><path class="g-accolade" d="M${xe - 5} ${top[0]}H${xe}V${top[1]}H${xe - 5}"/>`;
      s += icT(xe + 6, (top[0] + top[1]) / 2 + 4, o.ecart, "g-mesure", "start");
    }
    return icSvg(162, o.aria, s);
  }
  const icEvo = (t) => `${t > 0 ? "+" : "−"}${icNb(Math.abs(t))} %`; // évolution écrite dans une figure

  /* ---------- Contextes ---------- */
  // proportions : population de référence, partie, nom (questions et figure)
  const icCtxProp = [
    { tout: "élèves interrogés au lycée de {L}", partie: "viennent au lycée en bus", nom: "élèves" },
    { tout: "mangues récoltées par {P}", partie: "sont bien mûres", nom: "mangues" },
    { tout: "tortues observées à N'Gouja", partie: "sont des tortues vertes", nom: "tortues" },
    { tout: "adhérents de la coopérative de {L}", partie: "cultivent de la vanille", nom: "adhérents" },
    { tout: "passagers de la barge de 7 h", partie: "sont des lycéens", nom: "passagers" },
    { tout: "habitants de {L} interrogés", partie: "ont déjà vu une baleine", nom: "habitants" },
    { tout: "pieds d'ylang-ylang d'une exploitation de {L}", partie: "sont en fleurs", nom: "pieds d'ylang-ylang" },
    { tout: "élèves de Seconde du lycée de {L}", partie: "sont demi-pensionnaires", nom: "élèves" },
    { tout: "pirogues de la plage de {L}", partie: "sont peintes en bleu", nom: "pirogues" },
    { tout: "clients interrogés au marché de Mamoudzou", partie: "achètent des bananes", nom: "clients" },
    { tout: "makis comptés dans la forêt de {L}", partie: "sont des jeunes", nom: "makis" },
    { tout: "candidats au bac du lycée de {L}", partie: "ont obtenu une mention", nom: "candidats" },
    { tout: "plongeurs venus à Saziley", partie: "ont vu des dauphins", nom: "plongeurs" },
    { tout: "régimes de bananes vendus par {P}", partie: "étaient des bananes plantain", nom: "régimes de bananes" }
  ];
  // effectif total, pourcentage entier, partie entière (au moins 2)
  const icTirerProp = () => {
    let nE, k;
    do { nE = pick([20, 25, 40, 50, 60, 75, 80, 120, 125, 150, 160, 200, 240, 250, 300, 320, 400, 500, 600, 800, 1000, 1200]); k = rand(4, 96); } while ((nE * k) % 100 !== 0 || (nE * k) / 100 < 2);
    return { nE, k, nA: (nE * k) / 100 };
  };
  // proportions emboîtées C ⊂ A ⊂ E : phrases, question, effectifs, étiquettes de la figure
  const icCtxPdp = [
    { s1: "des élèves du lycée de {L} sont en Seconde", s2: "des élèves de Seconde sont des filles", q: "des élèves du lycée sont des filles de Seconde", q2: "des élèves de Seconde sont des filles", tot: "élèves au lycée de {L}", nA: "élèves de Seconde", nC: "filles de Seconde", E: "élèves du lycée", A: "élèves de Seconde", C: "filles de Seconde" },
    { s1: "des tortues observées à N'Gouja sont des tortues vertes", s2: "des tortues vertes sont des femelles", q: "des tortues observées sont des tortues vertes femelles", q2: "des tortues vertes sont des femelles", tot: "tortues observées à N'Gouja", nA: "tortues vertes", nC: "tortues vertes femelles", E: "tortues observées", A: "tortues vertes", C: "vertes femelles" },
    { s1: "des adhérents de la coopérative de {L} sont des femmes", s2: "de ces femmes cultivent de la vanille", q: "des adhérents sont des femmes qui cultivent de la vanille", q2: "des femmes adhérentes cultivent de la vanille", tot: "adhérents à la coopérative de {L}", nA: "femmes adhérentes", nC: "femmes qui cultivent de la vanille", E: "adhérents", A: "femmes", C: "femmes et vanille" },
    { s1: "des passagers de la barge sont des piétons", s2: "de ces piétons sont des lycéens", q: "des passagers sont des lycéens piétons", q2: "des piétons sont des lycéens", tot: "passagers sur la barge de 7 h", nA: "piétons", nC: "lycéens piétons", E: "passagers", A: "piétons", C: "lycéens piétons" },
    { s1: "des poissons pêchés par {P} sont des thons", s2: "de ces thons pèsent plus de $10$ kg", q: "des poissons pêchés sont des thons de plus de $10$ kg", q2: "des thons pêchés pèsent plus de $10$ kg", tot: "poissons pêchés par {P} ce mois-ci", nA: "thons", nC: "thons de plus de $10$ kg", E: "poissons pêchés", A: "thons", C: "gros thons" },
    { s1: "des fruits vendus au marché de Mamoudzou sont des bananes", s2: "de ces bananes sont des bananes plantain", q: "des fruits vendus sont des bananes plantain", q2: "des bananes vendues sont des bananes plantain", tot: "fruits vendus au marché de Mamoudzou ce matin", nA: "bananes", nC: "bananes plantain", E: "fruits vendus", A: "bananes", C: "plantain" },
    { s1: "des candidats du lycée de {L} ont eu le bac", s2: "des reçus ont eu une mention", q: "des candidats ont eu le bac avec une mention", q2: "des reçus ont eu une mention", tot: "candidats au bac au lycée de {L}", nA: "candidats reçus", nC: "candidats reçus avec une mention", E: "candidats", A: "reçus", C: "reçus avec mention" },
    { s1: "des habitants de {L} ont moins de $25$ ans", s2: "de ces jeunes font du sport en club", q: "des habitants sont des jeunes de moins de $25$ ans qui font du sport en club", q2: "des jeunes de moins de $25$ ans font du sport en club", tot: "habitants à {L}", nA: "jeunes de moins de $25$ ans", nC: "jeunes de moins de $25$ ans qui font du sport en club", E: "habitants", A: "moins de 25 ans", C: "jeunes sportifs" },
    { s1: "des touristes venus à Mayotte ont fait une sortie en mer", s2: "d'entre eux ont vu des baleines", q: "des touristes ont vu des baleines pendant une sortie en mer", q2: "des touristes partis en mer ont vu des baleines", tot: "touristes venus à Mayotte ce mois-ci", nA: "touristes partis en mer", nC: "touristes qui ont vu des baleines en mer", E: "touristes", A: "sortis en mer", C: "baleines vues" }
  ];
  // évolutions : sujet, valeurs de départ, en euros (eur) ou avec une unité (u) ou un nom (uv) ; fort : grands taux possibles
  const icCtxEvo = [
    { s: "Le prix du kilo de tomates au marché de Mamoudzou", V: [2, 2.5, 3, 4, 5, 6], eur: true },
    { s: "Le prix d'un régime de bananes", V: [8, 10, 12, 15, 20, 25], eur: true },
    { s: "Le loyer d'un studio à {L}", V: [300, 400, 450, 500, 600, 750, 800], eur: true },
    { s: "Le prix d'un billet d'avion Pamandzi–Paris", V: [600, 700, 800, 900, 1000, 1200], eur: true },
    { s: "Le nombre d'élèves du lycée de {L}", V: [800, 1000, 1200, 1500, 1600, 2000, 2400], uv: "élèves" },
    { s: "Le nombre de tortues venues pondre à Saziley", V: [40, 50, 60, 80, 120, 150, 200, 250], uv: "tortues", fort: true },
    { s: "La production de vanille d'une coopérative de {L}", V: [200, 250, 400, 500, 800, 1000], u: "kg" },
    { s: "Le nombre de passagers de la barge un samedi", V: [1200, 1500, 2000, 2400, 3000, 4000], uv: "passagers" },
    { s: "Le nombre d'abonnés de la page du club de foot de {L}", V: [150, 200, 250, 400, 500, 800], uv: "abonnés", fort: true },
    { s: "La récolte de manioc {deP}", V: [40, 50, 80, 120, 150, 200], u: "kg", fort: true },
    { s: "Le nombre de baleines observées par un club de plongée", V: [40, 50, 60, 80, 120], uv: "baleines", fort: true },
    { s: "La population d'un village de {L}", V: [1200, 1500, 2000, 2500, 3000, 4000], uv: "habitants" }
  ];
  const icSujets = ["Le prix du ticket de barge", "Le loyer d'un studio à {L}", "Le nombre d'élèves du lycée de {L}", "Le prix du kilo de manioc", "La production d'ylang-ylang {deP}", "Le nombre de touristes venus plonger dans le lagon", "Le prix d'un billet d'avion Pamandzi–Paris", "Le nombre de passagers de l'aéroport de Pamandzi", "Le prix d'un régime de bananes", "La récolte de vanille d'une coopérative de {L}", "Le nombre de tortues venues pondre à Saziley", "Le prix du ticket de taxi-brousse"];
  const icSujet = () => icCtx({ s: pick(icSujets) }).s;
  const icObjets = [["un salouva", [20, 25, 30, 40, 50]], ["un kayak", [300, 400, 450, 500, 600]], ["un vélo", [150, 200, 250, 300, 400]], ["un téléphone", [150, 200, 250, 300, 400, 500]], ["un billet d'avion Pamandzi–Paris", [600, 700, 800, 900, 1000, 1200]], ["une pirogue", [800, 1000, 1200, 1500]], ["un scooter", [1200, 1500, 2000, 2400]], ["un masque de plongée", [20, 25, 30, 40, 50]], ["une console", [200, 250, 300, 400, 500]], ["un sac de riz de 20 kg", [20, 24, 25, 30]], ["un panneau solaire", [150, 200, 250, 300, 400]], ["une glacière", [40, 50, 60, 80]]];

  /* ---------- Générateurs (partagés avec les Automatismes : mêmes noms, mêmes notions) ---------- */
  GEN["proportion-pourcentage"] = function () {
    const c = icCtx(pick(icCtxProp)), { nE, k, nA } = icTirerProp(), p = k / 100, sorte = rand(0, 4);
    const debut = `Sur les $${nb(nE)}$ ${c.tout}, $${nb(nA)}$ ${c.partie}.`, frac = `\\dfrac{${nb(nA)}}{${nb(nE)}}`;
    const figure = icBarre({ tout: `${icNb(nE)} ${c.nom}`, part: icNb(nA), pct: "?", p, aria: `Barre des ${icNb(nE)} ${c.nom} : une partie de ${icNb(nA)} est coloriée, sa proportion est inconnue` });
    const aides = ["La proportion, c'est la partie divisée par le tout : $p = \\dfrac{n_A}{n_E}$.", `Ici $n_A = ${nb(nA)}$ et $n_E = ${nb(nE)}$ : $p = ${frac}$.`];
    if (sorte <= 2) return {
      enonce: `${debut} Quel pourcentage des ${c.nom} cela représente-t-il ?`,
      figure, mode: "nombre", prefixe: "p =", suffixe: "%", attendu: k,
      erreurs: icErr(k, [{ valeur: p, message: `Tu as donné l'écriture décimale de la proportion : en pourcentage, on multiplie par $100$.` }, { valeur: nA, message: "Ça, c'est l'effectif de la partie. La proportion, c'est la partie **divisée par le tout**." }, icDec((nE / nA) * 100) && { valeur: icR((nE / nA) * 100), message: "Tu as divisé le tout par la partie : c'est l'inverse, $p = \\dfrac{n_A}{n_E}$." }]),
      aides: aides.concat(`$${frac} = ${fr(p)}$ : multiplie par $100$ pour l'écrire en pourcentage.`),
      solution: `$p = ${frac} = ${fr(p)} = ${pc(k)}$ : $${pc(k)}$ des ${c.tout} ${c.partie}.`
    };
    if (sorte === 3) return {
      enonce: `${debut} Écris la proportion des ${c.nom} qui ${c.partie} sous forme décimale.`,
      figure, mode: "nombre", prefixe: "p =", attendu: p,
      erreurs: icErr(p, [{ valeur: k, message: "Tu as donné le pourcentage. Sous forme décimale, une proportion est un nombre entre $0$ et $1$ : divise par $100$." }, { valeur: icR(k / 10, 6), message: `Attention à la virgule : vérifie que $p \\times ${nb(nE)}$ redonne bien $${nb(nA)}$.` }, icDec(nE / nA) && { valeur: icR(nE / nA), message: "Tu as divisé le tout par la partie : une proportion est toujours comprise entre $0$ et $1$." }]),
      aides: aides.concat(`Calcule $${nb(nA)} \\div ${nb(nE)}$ (ou simplifie la fraction).`),
      solution: `$p = ${frac} = ${fr(p)}$, c'est-à-dire $${pc(k)}$.`
    };
    const c4 = melangeChoix(pick([`$${fr(p)}$`, `$${pc(k)}$`, `$${frac}$`]), shuffle([`$${fr(icR(k / 10, 6))}$`, `$${pc(nA)}$`, `$\\dfrac{${nb(nE)}}{${nb(nA)}}$`, `$${fr(icR(p / 10, 6))}$`, `$${pc(icR(k / 10, 6))}$`, `$${pc(100 - k)}$`]));
    return {
      enonce: `${debut} Parmi ces écritures, laquelle est égale à la proportion des ${c.nom} qui ${c.partie} ?`,
      figure, mode: "choix", choix: c4.choix, attendu: c4.attendu,
      aides: aides.concat("Une proportion s'écrit en fraction, en décimal ou en pourcentage ; elle est toujours comprise entre $0$ et $1$, c'est-à-dire entre $0\\,\\%$ et $100\\,\\%$."),
      solution: `$p = ${frac} = ${fr(p)} = ${pc(k)}$.`
    };
  };

  GEN["partie-tout"] = function () {
    const c = icCtx(pick(icCtxProp)), { nE, k, nA } = icTirerProp(), p = k / 100, sorte = rand(0, 4), P = pc(k), dp = fr(p);
    const tout = sorte === 4 ? Math.random() < 0.5 : sorte >= 2;
    const enP = `Parmi les $${nb(nE)}$ ${c.tout}, $${P}$ ${c.partie}.`, enT = `$${nb(nA)}$ ${c.nom} ${c.partie}, ce qui représente $${P}$ des ${c.tout}.`;
    const figure = tout ? icBarre({ tout: `? ${c.nom}`, part: icNb(nA), pct: `${icNb(k)} %`, p, aria: `Barre : la partie coloriée compte ${icNb(nA)} ${c.nom} et représente ${icNb(k)} % du total, qui est inconnu` })
      : icBarre({ tout: `${icNb(nE)} ${c.nom}`, part: "?", pct: `${icNb(k)} %`, p, aria: `Barre des ${icNb(nE)} ${c.nom} : la partie coloriée représente ${icNb(k)} %, son effectif est inconnu` });
    const solP = `$n_A = p \\times n_E = ${dp} \\times ${nb(nE)} = ${nb(nA)}$`, solT = `$n_E = \\dfrac{n_A}{p} = \\dfrac{${nb(nA)}}{${dp}} = ${nb(nE)}$`;
    if (sorte === 4) {
      const c4 = tout ? melangeChoix(`$${nb(nA)} \\div ${dp}$`, shuffle([`$${nb(nA)} \\times ${dp}$`, `$${dp} \\div ${nb(nA)}$`, `$${nb(nA)} \\div ${k}$`, `$${nb(nA)} \\times ${k}$`]))
        : melangeChoix(`$${dp} \\times ${nb(nE)}$`, shuffle([`$${nb(nE)} \\div ${dp}$`, `$${nb(nE)} \\times ${k}$`, `$${nb(nE)} - ${k}$`, `$${dp} \\div ${nb(nE)}$`]));
      return {
        enonce: tout ? `${enT} Quel calcul donne le nombre total ${deN(c.nom)} ?` : `${enP} Quel calcul donne le nombre ${deN(c.nom)} qui ${c.partie} ?`,
        figure, mode: "choix", choix: c4.choix, attendu: c4.attendu,
        aides: [tout ? "On connaît la partie et la proportion : on cherche le **tout**." : "On connaît le tout et la proportion : on cherche la **partie**.", "Rappel : $n_A = p \\times n_E$, donc $n_E = \\dfrac{n_A}{p}$.", `$${P} = ${dp}$.`],
        solution: tout ? `On cherche le tout : ${solT}.` : `On cherche la partie : ${solP}.`
      };
    }
    if (!tout) return {
      enonce: `${enP} Combien ${deN(c.nom)} cela représente-t-il ?`,
      figure, mode: "nombre", prefixe: "Nombre :", attendu: nA,
      erreurs: icErr(nA, [{ valeur: nE * k, message: `Tu as multiplié par $${k}$ : il faut multiplier par $${P} = ${dp}$.` }, { valeur: nE - nA, message: "Ça, c'est ce qui reste quand on enlève la partie. On cherche directement la partie : $n_A = p \\times n_E$." }]),
      aides: ["On cherche la partie : $n_A = p \\times n_E$.", `$${P} = ${dp}$.`, `$n_A = ${dp} \\times ${nb(nE)}$.`],
      solution: `${solP} : $${nb(nA)}$ ${c.nom} ${c.partie}.`
    };
    return {
      enonce: `${enT} Combien y a-t-il ${deN(c.nom)} en tout ?`,
      figure, mode: "nombre", prefixe: "Total :", attendu: nE,
      erreurs: icErr(nE, [{ valeur: icR(nA * p), message: `Tu as calculé $${P}$ de $${nb(nA)}$. Ici on cherche le **tout** : il doit être plus grand que $${nb(nA)}$.` }, icDec(nA / k) ? { valeur: icR(nA / k), message: `On divise par $${dp}$, pas par $${k}$ : $${P} = ${dp}$.` } : { valeur: nA * k, message: "On cherche le tout : on **divise** la partie par la proportion." }]),
      aides: ["On connaît la partie et la proportion, on cherche le tout : $n_E = \\dfrac{n_A}{p}$.", `$${P} = ${dp}$.`, `$n_E = \\dfrac{${nb(nA)}}{${dp}}$. Vérifie que le tout est plus grand que la partie.`],
      solution: `${solT}. Vérification : $${dp} \\times ${nb(nE)} = ${nb(nA)}$.`
    };
  };

  GEN["proportion-de-proportion"] = function () {
    // pourcentages vraisemblables pour chaque contexte (dans l'ordre de icCtxPdp)
    const k = rand(0, icCtxPdp.length - 1), c = icCtx(icCtxPdp[k]);
    const P1 = [[25, 30, 32, 35, 36, 40], [50, 60, 64, 70, 75, 80, 85, 90], [40, 45, 50, 55, 60, 64, 70, 75], [20, 25, 30, 40, 45, 50, 60], [10, 20, 25, 30, 40, 45, 50, 60], [20, 25, 30, 40, 45, 50, 60], [70, 75, 80, 85, 90, 95], [40, 45, 50, 55, 60, 64], [20, 25, 30, 40, 45, 50, 60, 64, 70, 75, 80]][k];
    const P2 = [[45, 48, 50, 52, 55, 60], [30, 35, 40, 45, 50, 55, 60, 65, 70], [10, 12, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60], [10, 12, 15, 20, 25, 30, 35, 40, 45, 50], [10, 12, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60], [10, 12, 15, 20, 25, 30, 35, 40, 45, 50], [20, 25, 30, 35, 40, 45, 50, 55, 60], [10, 12, 15, 20, 25, 30, 35, 40], [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 75, 80]][k];
    const p1 = pick(P1), p2 = pick(P2);
    const r = icR((p1 * p2) / 100, 4), d1 = fr(p1 / 100), d2 = fr(p2 / 100), dr = fr(r / 100), sorte = rand(0, 4);
    const fig = (E, pC, C) => icEmboite({ E, pA: `${icNb(p1)} %`, A: c.A, pC, C, p1: p1 / 100, p2: p2 / 100, aria: `Deux barres emboîtées : en haut, les ${c.A} forment ${icNb(p1)} % des ${c.E} ; en bas, une partie des ${c.A} est coloriée (${pC === "?" ? "pourcentage inconnu" : pC}) ; ${C}` });
    if (sorte <= 2) return {
      enonce: `$${pc(p1)}$ ${c.s1} et $${pc(p2)}$ ${c.s2}. Quel pourcentage ${c.q} ?`,
      figure: fig(`tous les ${c.E}`, `${icNb(p2)} %`, `${c.C} : ? % du total`), mode: "nombre", prefixe: "p =", suffixe: "%", attendu: r,
      erreurs: icErr(r, [{ valeur: p1 + p2, message: "On n'additionne pas deux proportions emboîtées : on les **multiplie**." }, { valeur: icR(r / 100, 6), message: "Tu as donné l'écriture décimale : en pourcentage, on multiplie par $100$." }]),
      aides: ["Proportion de proportion : on **multiplie** les deux proportions, $p = p_1 \\times p_2$.", `$p = ${d1} \\times ${d2}$.`, `$${d1} \\times ${d2} = ${dr}$ : écris le résultat en pourcentage.`],
      solution: `$p = ${d1} \\times ${d2} = ${dr} = ${pc(r)}$ : $${pc(r)}$ ${c.q}.`
    };
    if (sorte === 3) {
      let N; do { N = pick([200, 400, 500, 600, 800, 1000, 1200, 1500, 2000, 2400, 3000, 4000, 5000]); } while (!icDec((N * p1 * p2) / 10000, 0));
      const nC = icR((N * p1 * p2) / 10000, 0), nA = icR((N * p1) / 100, 2);
      return {
        enonce: `On compte $${nb(N)}$ ${c.tot}. $${pc(p1)}$ ${c.s1} et $${pc(p2)}$ ${c.s2}. Combien cela fait-il ${deN(c.nC)} ?`,
        figure: fig(`${icNb(N)} ${c.E}`, `${icNb(p2)} %`, `${c.C} : ?`), mode: "nombre", prefixe: "Nombre :", attendu: nC,
        erreurs: icErr(nC, [{ valeur: icR((N * (p1 + p2)) / 100, 2), message: `On n'additionne pas les pourcentages : on prend $${pc(p1)}$ du total, puis $${pc(p2)}$ de ce résultat.` }, { valeur: nA, message: `Ça, c'est le nombre ${deN(c.nA)}. Il faut encore en prendre $${pc(p2)}$.` }]),
        aides: [`Nombre ${deN(c.nA)} : $${d1} \\times ${nb(N)}$.`, `Puis on prend $${pc(p2)}$ de ce nombre.`, `Ou directement : $${d1} \\times ${d2} \\times ${nb(N)}$.`],
        solution: `$${d1} \\times ${nb(N)} = ${nb(nA)}$ ${c.nA}, puis $${d2} \\times ${nb(nA)} = ${nb(nC)}$.\n\nAutre méthode : la proportion est $${d1} \\times ${d2} = ${dr}$, et $${dr} \\times ${nb(N)} = ${nb(nC)}$ ${c.nC}.`
      };
    }
    return {
      enonce: `$${pc(p1)}$ ${c.s1}, et $${pc(r)}$ ${c.q}. Quel pourcentage ${c.q2} ?`,
      figure: fig(`tous les ${c.E}`, "?", `${c.C} : ${icNb(r)} % du total`), mode: "nombre", prefixe: "p₂ =", suffixe: "%", attendu: p2,
      erreurs: icErr(p2, [{ valeur: icR((r * p1) / 100, 4), message: "Tu as multiplié. Ici, on connaît le produit $p_1 \\times p_2$ : pour retrouver $p_2$, on **divise** par $p_1$." }, { valeur: icR(p1 - r, 4), message: "On ne soustrait pas les pourcentages : on **divise**." }, { valeur: icR(p2 / 100, 6), message: "Tu as donné l'écriture décimale : en pourcentage, on multiplie par $100$." }]),
      aides: ["Proportion de proportion : $p = p_1 \\times p_2$. Ici, on connaît $p$ et $p_1$.", `$${dr} = ${d1} \\times p_2$.`, `$p_2 = \\dfrac{${dr}}{${d1}}$, puis écris le résultat en pourcentage.`],
      solution: `$p_2 = \\dfrac{${dr}}{${d1}} = ${d2} = ${pc(p2)}$ : $${pc(p2)}$ ${c.q2}.\n\nVérification : $${d1} \\times ${d2} = ${dr}$.`
    };
  };

  GEN["taux-evolution"] = function () {
    const c = icCtx(pick(icCtxEvo)), y = rand(2018, 2025);
    let V1, t, V2;
    do { V1 = pick(c.V); t = pick([-60, -50, -40, -35, -30, -25, -20, -15, -12, -10, -8, -5, -4, -2, 2, 4, 5, 8, 10, 12, 15, 20, 25, 30, 35, 40, 50, 60, 75, 100, 150]); V2 = icR(V1 * (1 + t / 100), 6); } while ((!c.fort && Math.abs(t) > 60) || !icDec(V2, c.eur ? 2 : 0));
    const d = icR(V2 - V1, 6), N = (v) => (c.eur ? icPrix(v) : nb(v)), unite = c.eur ? "€" : c.u || c.uv;
    const val = (v) => `$${N(v)}$${c.eur ? " €" : c.u ? " " + c.u : ""}`, valT = (v) => (c.eur ? icPrixT(v) : icNb(v) + (c.u ? " " + c.u : ""));
    const figure = icBarres2({ v: [V1, V2], lab: [valT(V1), valT(V2)], et: [String(y), String(y + 1)], fleche: "t = ?", aria: `Deux barres : ${valT(V1)} en ${y} et ${valT(V2)} en ${y + 1} ; le taux d'évolution est inconnu` });
    const debut = `${c.s} passe de ${val(V1)} en ${y} à ${val(V2)} en ${y + 1}.`;
    const calc = `$t = \\dfrac{${N(V2)} - ${N(V1)}}{${N(V1)}} = \\dfrac{${d < 0 ? "-" : ""}${N(Math.abs(d))}}{${N(V1)}} = ${fr(t / 100)} = ${sgnPc(t)}$`;
    if (rand(0, 3) < 3) return {
      enonce: `${debut} Calcule le taux d'évolution entre ${y} et ${y + 1} (écris $-$ pour une baisse).`,
      figure, mode: "nombre", prefixe: "t =", suffixe: "%", attendu: t,
      erreurs: icErr(t, [{ valeur: -t, message: `Attention au signe : c'est une ${t > 0 ? "hausse" : "baisse"}.` }, { valeur: d, message: "Ça, c'est la variation absolue. Le taux, c'est cette variation **divisée par la valeur initiale**." }, icDec((d / V2) * 100) && { valeur: icR((d / V2) * 100), message: "Tu as divisé par la valeur finale : le taux se calcule par rapport à la valeur **initiale** $V_1$." }]),
      aides: ["Taux d'évolution : $t = \\dfrac{V_2 - V_1}{V_1}$, où $V_1$ est la valeur de départ.", `Ici $V_1 = ${N(V1)}$ et $V_2 = ${N(V2)}$.`, `$t = \\dfrac{${N(V2)} - ${N(V1)}}{${N(V1)}}$, puis multiplie par $100$.`],
      solution: `${calc} : ${minus(c.s)} a ${t > 0 ? "augmenté" : "baissé"} de $${pc(Math.abs(t))}$.`
    };
    const va = (x) => `$${x < 0 ? "-" : "+"}${N(Math.abs(x))}$ ${unite}`, ch = (x, z) => `variation absolue : ${va(x)} ; taux : $${sgnPc(z)}$`;
    const c4 = melangeChoix(ch(d, t), shuffle([Math.abs(t) !== Math.abs(d) && ch(t, d), t !== d && ch(d, d), ch(-d, -t), icDec((d / V2) * 100) && ch(d, icR((d / V2) * 100))].filter(Boolean)).concat(ch(d, -t)));
    return {
      enonce: `${debut} Quelle est la bonne description de cette évolution ?`,
      figure, mode: "choix", choix: c4.choix, attendu: c4.attendu,
      aides: ["La variation absolue (variation additive) est $V_2 - V_1$, dans l'unité de la quantité.", "Le taux d'évolution est $t = \\dfrac{V_2 - V_1}{V_1}$, sans unité (en %).", `Ici $V_2 - V_1 = ${N(V2)} - ${N(V1)}$.`],
      solution: `Variation absolue : $${N(V2)} - ${N(V1)} = ${d < 0 ? "-" : "+"}${N(Math.abs(d))}$ ${unite}.\n\nTaux d'évolution : ${calc}.`
    };
  };

  GEN["coefficient"] = function () {
    const h = Math.random() < 0.55;
    const a = h ? pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 18, 20, 22, 24, 25, 30, 35, 40, 45, 50, 60, 70, 75, 80, 90, 100, 120, 150, 200, 250, 300, 0.5, 1.5, 2.5, 3.5, 12.5, 17.5])
      : pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20, 25, 30, 35, 40, 45, 50, 60, 65, 70, 75, 80, 85, 90, 0.5, 1.5, 2.5, 7.5, 12.5]);
    const t = h ? a : -a, CM = icR(1 + t / 100, 6), sorte = rand(0, 5), S = icSujet(), sg1 = h ? "+" : "−";
    const fig = (versCM) => icBarres2({ v: [100, 100 + t], lab: ["V", versCM ? `V ${sg1}${icNb(a)} %` : `V × ${icNb(CM)}`], et: ["avant", "après"], fleche: versCM ? "× ?" : "? %",
      aria: versCM ? `Deux barres : V avant et V ${h ? "augmentée" : "diminuée"} de ${icNb(a)} % après ; le coefficient multiplicateur est inconnu` : `Deux barres : V avant et V multipliée par ${icNb(CM)} après ; le taux d'évolution est inconnu` });
    if (sorte <= 1) return {
      enonce: sorte === 0 ? `Par quel nombre faut-il multiplier une quantité pour ${h ? "l'augmenter" : "la diminuer"} de $${pc(a)}$ ?` : `${S} ${h ? "augmente" : "baisse"} de $${pc(a)}$. Quel est le coefficient multiplicateur de cette évolution ?`,
      figure: fig(true), mode: "nombre", prefixe: "CM =", attendu: CM,
      erreurs: icErr(CM, h ? [{ valeur: icR(a / 100, 6), message: "Tu as oublié le $1$ : augmenter de $t\\,\\%$, c'est multiplier par $1 + \\dfrac{t}{100}$." }, a < 100 && { valeur: icR(1 - a / 100, 6), message: "C'est une **hausse** : le coefficient doit être plus grand que $1$." }, a < 10 && { valeur: icR(1 + a / 10, 6), message: `Attention à la virgule : $${pc(a)} = \\dfrac{${fr(a)}}{100}$.` }]
        : [{ valeur: icR(1 + a / 100, 6), message: "C'est une **baisse** : le coefficient doit être plus petit que $1$." }, { valeur: icR(a / 100, 6), message: "Ça, c'est la part qui disparaît. Diminuer de $t\\,\\%$, c'est multiplier par $1 - \\dfrac{t}{100}$." }, a < 10 && { valeur: icR(1 - a / 10, 6), message: `Attention à la virgule : $${pc(a)} = \\dfrac{${fr(a)}}{100}$.` }]),
      aides: [h ? "Augmenter de $t\\,\\%$, c'est multiplier par $1 + \\dfrac{t}{100}$." : "Diminuer de $t\\,\\%$, c'est multiplier par $1 - \\dfrac{t}{100}$.", `$\\dfrac{${fr(a)}}{100} = ${fr(a / 100)}$.`, `$CM = 1 ${h ? "+" : "-"} ${fr(a / 100)}$.`],
      solution: `$CM = 1 ${h ? "+" : "-"} ${fr(a / 100)} = ${fr(CM)}$ : ${h ? "augmenter" : "diminuer"} de $${pc(a)}$, c'est multiplier par $${fr(CM)}$.`
    };
    if (sorte <= 3) return {
      enonce: sorte === 2 ? `Multiplier une quantité par $${fr(CM)}$ revient à l'augmenter ou à la diminuer de combien ? (écris $-$ pour une baisse)` : `On multiplie ${minus(S)} par $${fr(CM)}$. Quel est le taux d'évolution correspondant ? (écris $-$ pour une baisse)`,
      figure: fig(false), mode: "nombre", prefixe: "t =", suffixe: "%", attendu: t,
      erreurs: icErr(t, [{ valeur: -t, message: `Attention au signe : $${fr(CM)}$ est ${h ? "plus grand" : "plus petit"} que $1$, c'est une ${h ? "hausse" : "baisse"}.` }, { valeur: (h ? 1 : -1) * icR(CM * 100, 4), message: `Le coefficient $${fr(CM)}$ ne se lit pas directement comme un pourcentage d'évolution : $t = CM - 1$.` }]),
      aides: ["Le taux se retrouve avec $t = CM - 1$.", `$t = ${fr(CM)} - 1$.`, "Multiplie le résultat par $100$ pour l'écrire en pourcentage."],
      solution: `$t = ${fr(CM)} - 1 = ${fr(t / 100)} = ${sgnPc(t)}$ : c'est une ${h ? "hausse" : "baisse"} de $${pc(a)}$.`
    };
    if (sorte === 4) {
      const v = h ? "l'augmenter" : "la diminuer", w = h ? "la diminuer" : "l'augmenter";
      const c4 = melangeChoix(`${v} de $${pc(a)}$`, shuffle([`${w} de $${pc(a)}$`, `${v} de $${pc(icR(CM * 100, 4))}$`, `${v} de $${pc(icR(a / 10, 4))}$`, (h || a * 10 < 100) && `${v} de $${pc(icR(a * 10, 4))}$`, h && `${w} de $${pc(icR(CM * 100, 4))}$`].filter(Boolean)));
      return {
        enonce: `Multiplier une quantité par $${fr(CM)}$ revient à :`,
        figure: fig(false), mode: "choix", choix: c4.choix, attendu: c4.attendu,
        aides: ["Si $CM > 1$, c'est une hausse ; si $CM < 1$, c'est une baisse.", "Le taux d'évolution est $t = CM - 1$.", `$${fr(CM)} - 1 = ${fr(t / 100)}$.`],
        solution: `$t = ${fr(CM)} - 1 = ${fr(t / 100)} = ${sgnPc(t)}$ : multiplier par $${fr(CM)}$, c'est ${v} de $${pc(a)}$.`
      };
    }
    const c5 = melangeChoix(`$${fr(CM)}$`, shuffle([`$${fr(icR(1 - t / 100, 6))}$`, `$${fr(icR(a / 100, 6))}$`, `$${fr(icR(1 + (h ? a : -a) / 10, 6))}$`, `$${fr(icR(a / 10, 6))}$`].filter((x) => !x.includes("-"))));
    return {
      enonce: `${h ? "Augmenter" : "Diminuer"} une quantité de $${pc(a)}$ revient à la multiplier par :`,
      figure: fig(true), mode: "choix", choix: c5.choix, attendu: c5.attendu,
      aides: [h ? "Augmenter de $t\\,\\%$, c'est multiplier par $1 + \\dfrac{t}{100}$." : "Diminuer de $t\\,\\%$, c'est multiplier par $1 - \\dfrac{t}{100}$.", `$${pc(a)} = ${fr(a / 100)}$.`, `Calcule $1 ${h ? "+" : "-"} ${fr(a / 100)}$.`],
      solution: `$CM = 1 ${h ? "+" : "-"} ${fr(a / 100)} = ${fr(CM)}$.`
    };
  };

  GEN["appliquer-evolution"] = function () {
    const [obj, prix] = pick(icObjets);
    let V1, t, V2;
    do { V1 = pick(prix); t = pick([-50, -40, -35, -30, -25, -20, -15, -12, -10, -8, -5, 4, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50]); V2 = icR(V1 * (1 + t / 100), 6); } while (!icDec(V2, 2));
    const a = Math.abs(t), h = t > 0, CM = icR(1 + t / 100, 6), lieu = icCtx({ s: pick(["Dans un magasin de {L}", "Au marché de Mamoudzou", "Dans une boutique de Petite-Terre", "Chez un commerçant de {L}"]) }).s;
    const Obj = `${lieu}, ${obj}`;
    const evo = `${h ? pick(["une hausse", "une augmentation"]) : pick(["une baisse", "une remise", "une réduction"])} de $${pc(a)}$`;
    const fig = (q1, q2) => icChaine({ v: [q1, q2], leg: ["avant", "après"], haut: [icEvo(t)], aria: `Schéma : prix avant ${q1 === "?" ? "inconnu" : q1}, ${h ? "hausse" : "baisse"} de ${icNb(a)} %, prix après ${q2 === "?" ? "inconnu" : q2}` });
    if (Math.random() < 0.5) return {
      enonce: `${Obj} coûte $${icPrix(V1)}$ €. Calcule son prix après ${evo}.`,
      figure: fig(icPrixT(V1), "?"), mode: "nombre", prefixe: "V₂ =", suffixe: "€", attendu: V2,
      erreurs: icErr(V2, [{ valeur: icR(V1 + t, 2), message: `Tu as ${h ? "ajouté" : "retiré"} $${a}$ euros. Il faut ${h ? "ajouter" : "retirer"} $${pc(a)}$ du prix : on multiplie par le coefficient multiplicateur.` }, { valeur: icR((V1 * a) / 100, 2), message: `Ça, c'est le montant de la ${h ? "hausse" : "baisse"}. Le nouveau prix est $V_1 \\times CM$.` }, { valeur: icR(V1 * (1 - t / 100), 2), message: `Attention au sens : c'est ${h ? "une hausse, le prix doit augmenter" : "une baisse, le prix doit diminuer"}.` }]),
      aides: [`Traduis l'évolution par son coefficient multiplicateur : $CM = 1 ${h ? "+" : "-"} ${fr(a / 100)} = ${fr(CM)}$.`, "Valeur finale : $V_2 = V_1 \\times CM$.", `$V_2 = ${icPrix(V1)} \\times ${fr(CM)}$.`],
      solution: `$CM = ${fr(CM)}$ et $V_2 = ${icPrix(V1)} \\times ${fr(CM)} = ${icPrix(V2)}$ €.`
    };
    return {
      enonce: `${lieu}, après ${evo}, ${obj} coûte $${icPrix(V2)}$ €. Quel était son prix avant ?`,
      figure: fig("?", icPrixT(V2)), mode: "nombre", prefixe: "V₁ =", suffixe: "€", attendu: V1,
      erreurs: icErr(V1, [{ valeur: icR(V2 * (1 - t / 100), 4), message: "Le pourcentage porte sur l'**ancien** prix : on ne peut pas appliquer l'évolution contraire. Il faut **diviser** par le coefficient." }, { valeur: icR(V2 * CM, 4), message: "Tu as appliqué l'évolution une deuxième fois. Pour revenir en arrière, on **divise** par le coefficient." }]),
      aides: [`Coefficient de l'évolution : $CM = ${fr(CM)}$.`, "On cherche la valeur initiale : $V_1 = \\dfrac{V_2}{CM}$.", `$V_1 = \\dfrac{${icPrix(V2)}}{${fr(CM)}}$.`],
      solution: `$V_1 = \\dfrac{${icPrix(V2)}}{${fr(CM)}} = ${icPrix(V1)}$ €. Vérification : $${icPrix(V1)} \\times ${fr(CM)} = ${icPrix(V2)}$.`
    };
  };

  GEN["evolutions-successives"] = function () {
    const T = [-50, -40, -30, -25, -20, -15, -10, -5, 5, 8, 10, 15, 20, 25, 30, 40, 50, 60, 100], sorte = rand(0, 5);
    const verbe = (t) => `${t > 0 ? "augmente" : "baisse"} de $${pc(Math.abs(t))}$`;
    if (sorte <= 2) {
      const S = icSujet(), y = rand(2019, 2024), t1 = pick(T), t2 = pick(T), c1 = icR(1 + t1 / 100, 6), c2 = icR(1 + t2 / 100, 6), CM = icR(c1 * c2, 6), g = icR((CM - 1) * 100, 4);
      return {
        enonce: `${S} ${verbe(t1)} en ${y}, puis ${verbe(t2)} en ${y + 1}. Quel est le taux d'évolution global sur ces deux années ? (écris $-$ pour une baisse)`,
        figure: icChaine({ v: ["V₀", "V₁", "V₂"], leg: [`fin ${y - 1}`, `fin ${y}`, `fin ${y + 1}`], haut: [icEvo(t1), icEvo(t2)], bas: [{ de: 0, a: 2, t: "taux global : ?" }], aria: `Schéma : ${icEvo(t1)} en ${y} puis ${icEvo(t2)} en ${y + 1} ; le taux global est inconnu` }),
        mode: "nombre", prefixe: "t =", suffixe: "%", attendu: g,
        erreurs: icErr(g, [{ valeur: t1 + t2, message: "Les taux ne s'additionnent pas : la deuxième évolution s'applique à la valeur **déjà modifiée**. Multiplie les coefficients." }, { valeur: icR(CM * 100, 4), message: `$${fr(CM)}$ est le coefficient global, pas le taux : $t = CM - 1$.` }]),
        aides: [`Coefficients : $CM_1 = ${fr(c1)}$ et $CM_2 = ${fr(c2)}$.`, `Coefficient global : $CM = ${fr(c1)} \\times ${fr(c2)}$.`, "Taux global : $t = CM - 1$, puis en pourcentage."],
        solution: `$CM = ${fr(c1)} \\times ${fr(c2)} = ${fr(CM)}$ et $t = ${fr(CM)} - 1 = ${fr(icR(CM - 1, 6))}$, soit $${sgnPc(g)}$.${t1 + t2 !== g ? ` Ce n'est pas $${sgnPc(t1 + t2)}$ : les taux ne s'additionnent pas.` : ""}`
      };
    }
    if (sorte === 3) {
      const S = icSujet(), t = pick([5, 10, 20, 50, -10, -20, -50]), n = pick([2, 3]), c1 = icR(1 + t / 100, 6), CM = icR(c1 ** n, 8), g = icR((CM - 1) * 100, 6), mots = n === 2 ? "deux" : "trois";
      return {
        enonce: `${S} ${verbe(t)} chaque année pendant ${mots} ans. Quel est le taux d'évolution global sur ces ${mots} ans ? (écris $-$ pour une baisse)`,
        figure: icChaine({ v: n === 2 ? ["V₀", "V₁", "V₂"] : ["V₀", "V₁", "V₂", "V₃"], haut: Array(n).fill(icEvo(t)), bas: [{ de: 0, a: n, t: "taux global : ?" }], aria: `Schéma : ${mots} évolutions successives de ${icEvo(t)} ; le taux global est inconnu` }),
        mode: "nombre", prefixe: "t =", suffixe: "%", attendu: g,
        erreurs: icErr(g, [{ valeur: n * t, message: "Les taux ne s'additionnent pas : chaque évolution s'applique à la valeur **déjà modifiée**." }, { valeur: icR(CM * 100, 6), message: `$${fr(CM)}$ est le coefficient global, pas le taux : $t = CM - 1$.` }]),
        aides: [`Une évolution de $${sgnPc(t)}$ a pour coefficient $${fr(c1)}$.`, `Coefficient global : $${fr(c1)}^{${n}}$.`, "Taux global : $t = CM - 1$, puis en pourcentage."],
        solution: `$CM = ${fr(c1)}^{${n}} = ${fr(CM)}$ et $t = ${fr(CM)} - 1 = ${fr(icR(CM - 1, 8))}$, soit $${sgnPc(g)}$, et non $${sgnPc(n * t)}$.`
      };
    }
    const [obj, prix] = pick([["Le kilo de tomates au marché de Mamoudzou", [2, 3, 4, 5]], ["Un régime de bananes", [8, 10, 12, 15, 20]], ["Le ticket de taxi-brousse", [2, 3, 4, 5]], ["Un masque de plongée", [20, 25, 30, 40]], ["Une glacière", [40, 50, 60, 80]], ["Un salouva", [20, 25, 30, 40, 50]]]);
    let t1, t2, V0, c1, c2, V2;
    do { t1 = pick(T); t2 = pick(T); V0 = pick(prix); c1 = icR(1 + t1 / 100, 6); c2 = icR(1 + t2 / 100, 6); V2 = icR(V0 * c1 * c2, 6); } while (!icDec(V2, 2) || Math.abs(t1) === 100 || Math.abs(t2) === 100);
    const V1 = icR(V0 * c1, 6), CM = icR(c1 * c2, 6);
    return {
      enonce: `${obj} coûte $${icPrix(V0)}$ € en janvier. Son prix ${verbe(t1)} en février, puis ${verbe(t2)} en mars. Quel est son prix en mars ?`,
      figure: icChaine({ v: [icPrixT(V0), "?", "?"], leg: ["janvier", "février", "mars"], haut: [icEvo(t1), icEvo(t2)], aria: `Schéma : ${icPrixT(V0)} en janvier, ${icEvo(t1)} puis ${icEvo(t2)} ; les prix de février et de mars sont inconnus` }),
      mode: "nombre", prefixe: "Prix :", suffixe: "€", attendu: V2,
      erreurs: icErr(V2, [{ valeur: icR(V0 * (1 + (t1 + t2) / 100), 4), message: "Les taux ne s'additionnent pas : la deuxième évolution s'applique au prix de **février**." }, { valeur: V1, message: "Ça, c'est le prix de février. Il faut encore appliquer la deuxième évolution." }]),
      aides: [`Prix de février : $${icPrix(V0)} \\times ${fr(c1)}$.`, `Prix de mars : prix de février $\\times ${fr(c2)}$.`, `Ou directement : $${icPrix(V0)} \\times ${fr(c1)} \\times ${fr(c2)}$.`],
      solution: `Février : $${icPrix(V0)} \\times ${fr(c1)} = ${icPrix(V1)}$ €. Mars : $${icPrix(V1)} \\times ${fr(c2)} = ${icPrix(V2)}$ €.\n\nOu directement : $CM = ${fr(c1)} \\times ${fr(c2)} = ${fr(CM)}$ et $${icPrix(V0)} \\times ${fr(CM)} = ${icPrix(V2)}$ €.`
    };
  };

  GEN["taux-reciproque"] = function () {
    // taux dont le taux réciproque tombe juste (au plus deux décimales en %), sinon taux à arrondir au centième
    const exacts = [25, -20, 100, -50, 150, -60, 300, -75, 60, -37.5, 400, -80, -36, 56.25, 220, -68.75, -68, 212.5];
    const arrondis = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 18, 20, 30, 35, 40, 45, 50, 70, 80, -2, -3, -4, -5, -6, -8, -10, -12, -15, -25, -30, -35, -40, -45];
    const reciproque = (t) => {
      const CM = icR(1 + t / 100, 6), x = 10000 / (100 + t) - 100, exact = icDec(x, 2);
      return { CM, exact, r: exact ? icR(x, 4) : icR(x, 2), tol: exact ? 1e-9 : 0.005, CMp: exact ? icR(1 / CM, 6) : icR(1 / CM, 3) };
    };
    const ARR = " (en pourcentage, arrondi au centième)";
    const dire = (t) => (t > 0 ? `une hausse de $${pc(t)}$` : `une baisse de $${pc(-t)}$`);
    const erreurs = (t, r) => [{ valeur: -t, message: "Ce n'est pas le taux changé de signe : l'évolution réciproque part de la valeur **déjà modifiée**." }, { valeur: -r, message: `Attention au signe : pour revenir à la valeur de départ, il faut ${r < 0 ? "une **baisse**, donc un taux négatif" : "une **hausse**, donc un taux positif"}.` }];
    const AIDES = (E) => [`Coefficient de l'évolution : $CM = ${fr(E.CM)}$.`, `Coefficient réciproque : $CM'$ est l'inverse de $CM$, $CM' = \\dfrac{1}{${fr(E.CM)}}${E.exact ? ` = ${fr(E.CMp)}` : ` \\approx ${fr(icR(1 / E.CM, 4))}`}$.`, "Taux réciproque : $t' = CM' - 1$, puis en pourcentage."];
    const SOL = (E) => `$CM' = \\dfrac{1}{${fr(E.CM)}} ${E.exact ? "=" : "\\approx"} ${fr(E.exact ? E.CMp : icR(1 / E.CM, 4))}$ donc $t' ${E.exact ? "=" : "\\approx"} ${sgnPc(E.r)}$.`;
    const fig = (q1, q2, haut, bas, aria) => icChaine({ v: [q1, q2], leg: ["départ", "après"], haut: [haut], bas: [{ de: 1, a: 0, t: bas }], aria });
    const genre = pick(["taux", "taux", "contexte", "contexte", "contexte", "valeurs", "coef"]);
    if (genre === "contexte") {
      const t = Math.random() < 0.5 ? pick(exacts.filter((v) => Math.abs(v) <= 100)) : pick(arrondis), E = reciproque(t), S = icSujet();
      return {
        enonce: `${S} a ${t > 0 ? "augmenté" : "baissé"} de $${pc(Math.abs(t))}$ en un an. Quel taux d'évolution faudrait-il appliquer ensuite pour revenir à la valeur de départ ?${E.exact ? "" : ARR}`,
        figure: fig("V₁", "V₂", icEvo(t), "? %", `Schéma : de V₁ à V₂ par une évolution de ${icEvo(t)}, puis retour de V₂ à V₁ par un taux inconnu`),
        mode: "nombre", prefixe: "t′ =", suffixe: "%", attendu: E.r, tolerance: E.tol,
        erreurs: icErr(E.r, erreurs(t, E.r)), aides: AIDES(E),
        solution: SOL(E) + `\n\nPour annuler ${dire(t)}, il faut ${E.r < 0 ? "une baisse" : "une hausse"} ${E.exact ? "de" : "d'environ"} $${pc(Math.abs(E.r))}$ : ce n'est pas le même pourcentage, car il s'applique à la valeur **modifiée**.`
      };
    }
    if (genre === "valeurs") {
      // V1 → V2 = V1 × CM, puis retour de V2 à V1
      const [obj, prix] = pick(icObjets);
      let V1, t, V2;
      do { V1 = pick(prix); t = pick(Math.random() < 0.5 ? exacts : arrondis); V2 = icR(V1 * (1 + t / 100), 6); } while (Math.abs(t) > 100 || !icDec(V2, 2));
      const E = reciproque(t), d = icR(V1 - V2, 2);
      return {
        enonce: `Le prix ${deN(obj)} passe de $${icPrix(V1)}$ € à $${icPrix(V2)}$ €. Quel taux d'évolution permettrait de le ramener de $${icPrix(V2)}$ € à $${icPrix(V1)}$ € ?${E.exact ? "" : ARR}`,
        figure: fig(icPrixT(V1), icPrixT(V2), "", "t′ = ?", `Schéma : le prix passe de ${icPrixT(V1)} à ${icPrixT(V2)}, puis revient à ${icPrixT(V1)} par un taux inconnu`),
        mode: "nombre", prefixe: "t′ =", suffixe: "%", attendu: E.r, tolerance: E.tol,
        erreurs: icErr(E.r, erreurs(t, E.r)),
        aides: [`Pour le retour, la valeur de départ est $${icPrix(V2)}$ € et la valeur d'arrivée $${icPrix(V1)}$ €.`, `$t' = \\dfrac{V_{\\text{arrivée}} - V_{\\text{départ}}}{V_{\\text{départ}}} = \\dfrac{${icPrix(V1)} - ${icPrix(V2)}}{${icPrix(V2)}}$.`, "Multiplie le résultat par $100$ pour l'écrire en pourcentage."],
        solution: `$t' = \\dfrac{${icPrix(V1)} - ${icPrix(V2)}}{${icPrix(V2)}} = \\dfrac{${d < 0 ? "-" : ""}${icPrix(Math.abs(d))}}{${icPrix(V2)}} ${E.exact ? "=" : "\\approx"} ${fr(icR(E.r / 100, 4))}$, soit $${E.exact ? "" : "\\approx "}${sgnPc(E.r)}$.\n\nOn peut aussi passer par les coefficients : $CM = ${fr(E.CM)}$, donc $CM' = \\dfrac{1}{${fr(E.CM)}}$.`
      };
    }
    if (genre === "coef") {
      const t = Math.random() < 0.5 ? pick(exacts) : pick(arrondis), E = reciproque(t);
      return {
        enonce: `Une évolution a pour coefficient multiplicateur $CM = ${fr(E.CM)}$. Quel est le coefficient multiplicateur $CM'$ de l'évolution réciproque, celle qui ramène à la valeur de départ ?${E.exact ? "" : " (arrondi au millième)"}`,
        figure: fig("V₁", "V₂", `× ${icNb(E.CM)}`, "× ?", `Schéma : V₁ multiplié par ${icNb(E.CM)} donne V₂ ; le coefficient pour revenir de V₂ à V₁ est inconnu`),
        mode: "nombre", prefixe: "CM′ =", attendu: E.CMp, tolerance: E.exact ? 1e-9 : 0.0005,
        erreurs: icErr(E.CMp, [{ valeur: icR(2 - E.CM, 6), message: `Ce n'est pas $2 - ${fr(E.CM)}$ : on ne change pas simplement le signe du taux. Le coefficient réciproque est l'**inverse** : $CM' = \\dfrac{1}{CM}$.` }, { valeur: icR(Math.abs(E.CM - 1), 6), message: "Ça, c'est le taux de l'évolution (en écriture décimale), pas un coefficient multiplicateur." }]),
        aides: ["Appliquer l'évolution puis sa réciproque ne change rien : $CM \\times CM' = 1$.", "Donc $CM' = \\dfrac{1}{CM}$.", `Calcule $\\dfrac{1}{${fr(E.CM)}}$${E.exact ? "" : " et arrondis au millième"}.`],
        solution: `$CM' = \\dfrac{1}{${fr(E.CM)}} ${E.exact ? "=" : "\\approx"} ${fr(E.CMp)}$.\n\n${t > 0 ? "Une hausse" : "Une baisse"} de $${pc(Math.abs(t))}$ est donc annulée par ${E.r < 0 ? "une baisse" : "une hausse"} ${E.exact ? "de" : "d'environ"} $${pc(Math.abs(E.r))}$.`
      };
    }
    const t = Math.random() < 0.6 ? pick(exacts) : pick(arrondis), E = reciproque(t);
    return {
      enonce: pick([`Quel taux d'évolution permet d'annuler ${dire(t)} et de revenir à la valeur initiale ?`, `Une quantité subit ${dire(t)}. Quelle évolution la ramène à sa valeur de départ ? (écris $-$ pour une baisse)`, `Après ${dire(t)}, quel taux faut-il appliquer pour retrouver la valeur initiale ? (écris $-$ pour une baisse)`]) + (E.exact ? "" : ARR),
      figure: fig("V₁", "V₂", icEvo(t), "? %", `Schéma : de V₁ à V₂ par une évolution de ${icEvo(t)}, puis retour de V₂ à V₁ par un taux inconnu`),
      mode: "nombre", prefixe: "t′ =", suffixe: "%", attendu: E.r, tolerance: E.tol,
      erreurs: icErr(E.r, erreurs(t, E.r)), aides: AIDES(E), solution: SOL(E)
    };
  };

  /* Proportion, évolution ou points de pourcentage ? (série propre au chapitre) */
  const icPhrases = [ // [phrase, nature : 0 proportion, 1 hausse, 2 baisse, 3 écart entre deux proportions en points]
    ["{pc} des élèves du lycée de {L} viennent en bus.", 0], ["{pc} des adhérents de la coopérative de {L} cultivent de la vanille.", 0],
    ["Au marché de Mamoudzou, {pc} des fruits vendus ce matin sont des mangues.", 0], ["Parmi les tortues observées à N'Gouja, {pc} sont des tortues vertes.", 0],
    ["{pc} des passagers de la barge de 7 h sont des lycéens.", 0], ["Le prix du ticket de barge a augmenté de {pc}.", 1],
    ["Le loyer des studios de {L} a pris {pc} en un an.", 1], ["Le nombre d'élèves du lycée de {L} a progressé de {pc}.", 1],
    ["La production d'ylang-ylang {deP} est en hausse de {pc}.", 1], ["Le prix du kilo de tomates a baissé de {pc} après la saison des pluies.", 2],
    ["Le nombre de tortues venues pondre à Saziley a chuté de {pc}.", 2], ["La récolte de manioc {deP} est en baisse de {pc}.", 2],
    ["Les salouvas sont soldés avec une remise de {pc}.", 2], ["La part des élèves internes est passée de {a} à {b} : elle a gagné {n} points.", 3],
    ["Le taux de réussite au bac du lycée de {L} a progressé de {n} points.", 3], ["La proportion de tortues vertes parmi les tortues observées a perdu {n} points.", 3]
  ];
  const icParts = ["La part des élèves qui viennent en bus au lycée de {L}", "Le taux de réussite au bac du lycée de {L}", "La part des femmes parmi les adhérents de la coopérative de {L}", "La proportion de tortues vertes parmi les tortues observées à N'Gouja", "La part des lycéens parmi les passagers de la barge de 7 h", "La part des maisons de {L} équipées de panneaux solaires"];
  GEN["ic-points"] = function () {
    const sorte = rand(0, 4);
    if (sorte <= 1) {
      const [ph, nat] = pick(icPhrases), p = nat === 3 ? rand(2, 15) : nat === 0 ? rand(5, 95) : rand(2, 60), a = rand(20, 70);
      const phrase = icCtx({ s: ph }).s.replace("{pc}", `$${pc(p)}$`).replace("{n}", `$${p}$`).replace("{a}", `$${pc(a)}$`).replace("{b}", `$${pc(a + p)}$`);
      const N = ["une proportion : une partie d'un ensemble de référence", "un taux d'évolution : une hausse", "un taux d'évolution : une baisse", "un écart entre deux proportions, en points de pourcentage"];
      const c4 = melangeChoix(N[nat], N);
      return {
        enonce: `Dans la phrase suivante, que représente ${nat === 3 ? `le nombre $${p}$` : `$${pc(p)}$`} ?\n\n« ${phrase} »`,
        mode: "choix", choix: c4.choix, attendu: c4.attendu,
        aides: ["Une proportion compare une partie à un ensemble de référence (« des », « parmi »…).", "Un taux d'évolution compare une valeur à sa valeur de départ (« augmente de », « baisse de », « remise »…).", "Quand une proportion change, l'écart entre les deux pourcentages se compte en **points**."],
        solution: [`C'est une **proportion** : $${pc(p)}$ d'un ensemble de référence. Une proportion est toujours comprise entre $0\\,\\%$ et $100\\,\\%$.`, `C'est un **taux d'évolution** : la quantité augmente de $${pc(p)}$ par rapport à sa valeur de départ.`, `C'est un **taux d'évolution** : la quantité baisse de $${pc(p)}$ par rapport à sa valeur de départ${/remise/.test(ph) ? " (une remise est une baisse)" : ""}.`, `C'est un **écart en points de pourcentage** : la différence entre deux proportions, $${p}$ points, et non un taux d'évolution.`][nat]
      };
    }
    let a, b;
    do { a = pick([20, 24, 25, 30, 32, 40, 45, 48, 50, 60, 64, 75, 80]); b = a + randNZ(-12, 12); } while (b <= 2 || b >= 98 || !icDec(((b - a) / a) * 100, 2));
    const t = icR(((b - a) / a) * 100, 2), up = b > a, n = Math.abs(b - a), pts = n > 1 ? "points" : "point", S = icCtx({ s: pick(icParts) }).s;
    const figure = icBarres2({ v: [a, b], lab: [`${a} %`, `${b} %`], et: ["avant", "après"], fleche: "?", aria: `Deux barres : ${a} % avant et ${b} % après` });
    const debut = `${S} passe de $${pc(a)}$ à $${pc(b)}$.`, calc = `$t = \\dfrac{${b} - ${a}}{${a}} = ${fr(t / 100)} = ${sgnPc(t)}$`;
    if (sorte === 2) return {
      enonce: `${debut} Quel est le taux d'évolution de cette part, en pourcentage ? (écris $-$ pour une baisse)`,
      figure, mode: "nombre", prefixe: "t =", suffixe: "%", attendu: t,
      erreurs: icErr(t, [{ valeur: b - a, message: "Ça, c'est l'écart en **points** de pourcentage. Le taux d'évolution, c'est cet écart **divisé par la valeur de départ**." }, icDec(((b - a) / b) * 100) && { valeur: icR(((b - a) / b) * 100), message: "Tu as divisé par la valeur finale : le taux se calcule par rapport à la valeur de départ." }, { valeur: -t, message: `Attention au signe : c'est une ${up ? "hausse" : "baisse"}.` }]),
      aides: [`La part ${up ? "gagne" : "perd"} $${n}$ ${pts}, mais ce n'est pas son taux d'évolution.`, "Taux d'évolution : $t = \\dfrac{V_2 - V_1}{V_1}$, avec $V_1$ la valeur de départ.", `$t = \\dfrac{${b} - ${a}}{${a}}$, puis multiplie par $100$.`],
      solution: `La part ${up ? "gagne" : "perd"} $${n}$ ${pts}, mais son taux d'évolution est ${calc}.`
    };
    if (sorte === 3) return {
      enonce: `${debut} Quel est l'écart entre ces deux pourcentages, en points ? (écris $-$ pour une baisse)`,
      figure, mode: "nombre", prefixe: "Écart :", suffixe: "points", attendu: b - a,
      erreurs: icErr(b - a, [{ valeur: t, message: "Ça, c'est le taux d'évolution de la part. L'écart en points est la simple **différence** des deux pourcentages." }, { valeur: a - b, message: "Attention au signe : on calcule (valeur d'arrivée) − (valeur de départ)." }]),
      aides: ["Quand une proportion évolue, l'écart se compte en points de pourcentage.", "Écart $=$ pourcentage d'arrivée $-$ pourcentage de départ.", `Calcule $${b} - ${a}$.`],
      solution: `$${b} - ${a} = ${b - a}$ : la part ${up ? "gagne" : "perd"} $${n}$ ${pts}. (Son taux d'évolution est ${calc}.)`
    };
    const s1 = up ? "de plus" : "de moins", s2 = up ? "hausse" : "baisse", tt = Math.abs(t);
    const c4 = melangeChoix(`Cela fait $${n}$ ${pts} ${s1}, soit une ${s2} de $${pc(tt)}$.`, shuffle([`Cela fait une ${s2} de $${pc(n)}$.`, `Cela fait $${fr(tt)}$ points ${s1}.`, `Cela fait $${n}$ ${pts} ${s1}, soit une ${s2} de $${pc(n)}$.`, `Cela fait $${fr(tt)}$ points ${s1}, soit une ${s2} de $${pc(n)}$.`]));
    return {
      enonce: `${debut} Quelle phrase est correcte ?`,
      figure, mode: "choix", choix: c4.choix, attendu: c4.attendu,
      aides: ["L'écart entre deux pourcentages se compte en **points**.", "Le taux d'évolution se calcule avec $t = \\dfrac{V_2 - V_1}{V_1}$.", `Écart : $${b} - ${a}$ ; taux : $\\dfrac{${b} - ${a}}{${a}}$.`],
      solution: `Écart : $${b} - ${a} = ${b - a}$, donc $${n}$ ${pts} ${s1}. Taux d'évolution : ${calc}.`
    };
  };

  /* Figures nommées : cours, fiche méthode et QCM du chapitre */
  FIGURES["ic-cours-proportion"] = () => icBarre({ tout: "240 mangues", part: "84 vendues", pct: "35 %", p: 0.35, aria: "Barre des 240 mangues de la commerçante : la partie coloriée, les 84 mangues vendues, représente 35 % de la barre" });
  FIGURES["ic-cours-emboites"] = () => icEmboite({ E: "toutes les tortues observées", pA: "65 %", A: "tortues vertes", pC: "40 %", C: "vertes femelles : 26 % du total", p1: 0.65, p2: 0.4, aria: "Deux barres emboîtées : les tortues vertes forment 65 % des tortues observées ; 40 % des tortues vertes sont des femelles, soit 26 % de toutes les tortues" });
  FIGURES["ic-cours-population"] = () => icBarres2({ v: [256518, 323153], lab: [icNb(256518), icNb(323153)], et: ["2017", "2026"], fleche: "+26 %", ecart: "+" + icNb(66635), aria: "Population de Mayotte : 256 518 habitants en 2017 et 323 153 en 2026, soit 66 635 habitants de plus et une hausse d'environ 26 %" });
  FIGURES["ic-cours-coefficient"] = () => icChaine({ v: ["500 €", "540 €"], leg: ["avant", "après"], haut: ["× 1,08"], bas: [{ de: 1, a: 0, t: "÷ 1,08" }], aria: "Schéma : 500 € multiplié par 1,08 donne 540 € ; pour revenir à 500 €, on divise 540 € par 1,08" });
  FIGURES["ic-cours-successives"] = () => icChaine({ v: ["4 €", "5,40 €", "4,32 €"], leg: ["octobre", "décembre", "février"], haut: ["× 1,35", "× 0,8"], bas: [{ de: 0, a: 2, t: "× 1,08" }], aria: "Schéma : 4 € multiplié par 1,35 donne 5,40 €, puis multiplié par 0,8 donne 4,32 € ; globalement, on a multiplié par 1,08" });
  FIGURES["ic-cours-points"] = () => icBarres2({ v: [75, 81], lab: ["75 %", "81 %"], et: ["avant", "après"], fleche: "+8 %", ecart: "+6 points", aria: "Taux de réussite au bac : 75 % puis 81 %, soit 6 points de plus et une hausse de 8 %" });
  FIGURES["ic-meth-tout"] = () => icBarre({ tout: "? adhérents", part: "42 filles", pct: "35 %", p: 0.35, aria: "Barre : 42 filles représentent 35 % des adhérents ; le nombre total d'adhérents est inconnu" });
  FIGURES["ic-meth-emboites"] = () => icEmboite({ E: "tous les élèves", pA: "32 %", A: "élèves de Seconde", pC: "55 %", C: "filles de Seconde : 17,6 % du total", p1: 0.32, p2: 0.55, aria: "Deux barres emboîtées : 32 % des élèves sont en Seconde et 55 % des élèves de Seconde sont des filles, soit 17,6 % de tous les élèves" });
  FIGURES["ic-meth-taux"] = () => icBarres2({ v: [2.5, 2], lab: ["2,50 €", "2 €"], et: ["avant", "après"], fleche: "−20 %", ecart: "−0,50 €", aria: "Prix du kilo de bananes : 2,50 € avant et 2 € après, soit 0,50 € de moins et une baisse de 20 %" });
  FIGURES["ic-meth-points"] = () => icBarres2({ v: [40, 50], lab: ["40 %", "50 %"], et: ["2024", "2025"], fleche: "+25 %", ecart: "+10 points", aria: "Part des élèves qui viennent en bus : 40 % en 2024 et 50 % en 2025, soit 10 points de plus et une hausse de 25 %" });
  FIGURES["ic-meth-solde"] = () => icChaine({ v: ["450 €", "315 €"], leg: ["avant", "après"], haut: ["−30 % : × 0,7"], aria: "Kayak : 450 € multiplié par 0,7, c'est-à-dire une baisse de 30 %, donne 315 €" });
  FIGURES["ic-meth-global"] = () => icChaine({ v: ["100", "120", "108"], haut: ["× 1,2", "× 0,9"], bas: [{ de: 0, a: 2, t: "× 1,08 : +8 %" }], aria: "Schéma : 100 multiplié par 1,2 donne 120, puis multiplié par 0,9 donne 108 ; globalement on a multiplié par 1,08, soit une hausse de 8 %" });
  FIGURES["ic-qcm-barre"] = () => icBarre({ tout: "200 élèves", part: "?", pct: "15 %", p: 0.15, aria: "Barre des 200 élèves : la partie coloriée représente 15 %, son effectif est inconnu" });
  FIGURES["ic-qcm-chaine"] = () => icChaine({ v: ["80 €", "?", "?"], leg: ["janvier", "février", "mars"], haut: ["+25 %", "−20 %"], aria: "Schéma : 80 € en janvier, hausse de 25 % en février puis baisse de 20 % en mars ; les prix de février et de mars sont inconnus" });
  FIGURES["ic-qcm-points"] = () => icBarres2({ v: [40, 50], lab: ["40 %", "50 %"], et: ["2024", "2025"], fleche: "?", aria: "Part des élèves qui viennent en bus : 40 % en 2024 et 50 % en 2025" });
  FIGURES["ic-qcm-emboites"] = () => icEmboite({ E: "tous les élèves", pA: "30 %", A: "élèves de Seconde", pC: "50 %", C: "filles de Seconde : ? % du total", p1: 0.3, p2: 0.5, aria: "Deux barres emboîtées : 30 % des élèves sont en Seconde et 50 % des élèves de Seconde sont des filles ; la part des filles de Seconde parmi tous les élèves est inconnue" });
  FIGURES["ic-qcm-retour"] = () => icChaine({ v: ["100 €", "125 €"], leg: ["avant", "après"], haut: ["× 1,25"], bas: [{ de: 1, a: 0, t: "× ?" }], aria: "Schéma : 100 € multiplié par 1,25 donne 125 € ; le coefficient pour revenir à 100 € est inconnu" });

  /* ---------- Automatismes de Seconde (fiches flash) ---------- */
  const pgcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
  const frac = (n, d) => { if (d < 0) { n = -n; d = -d; } const g = pgcd(n, d); n /= g; d /= g; return d === 1 ? `${n}` : `${n < 0 ? "-" : ""}\\dfrac{${Math.abs(n)}}{${d}}`; };
  const AIDE_FRAC = "Donne le résultat sous forme de fraction irréductible, par exemple $5/12$ (ou un entier).";

  /* Figures des automatismes (préfixe am) : nombres écrits à la française, textes, cotes */
  const amT = (x) => String(+(+x).toFixed(6)).replace("-", "−").replace(".", ",");
  const amF = (v) => +(+v).toFixed(1);
  const amTxt = (x, y, t, cls, ancre) => `<text class="${cls || "g-label"}" x="${amF(x)}" y="${amF(y)}" text-anchor="${ancre || "middle"}">${t}</text>`;
  // texte d'une cote, au milieu de [PQ], écarté du point G (le centre de la figure)
  const amCote = (P, Q, G, t, d) => {
    if (t === undefined || t === "") return "";
    const m = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2], n = Math.hypot(m[0] - G[0], m[1] - G[1]) || 1, vx = (m[0] - G[0]) / n, vy = (m[1] - G[1]) / n, e = d || 11;
    return amTxt(m[0] + vx * e, m[1] + vy * e + 4, t, "g-mesure", vx > 0.45 ? "start" : vx < -0.45 ? "end" : "middle");
  };
  const amDecimal = (v) => Math.abs(v * 1e4 - Math.round(v * 1e4)) < 1e-6; // au plus 4 décimales
  // valeurs approchées d'une réponse non décimale : erreurs « donne la valeur exacte »
  const amApprox = (v, quoi) => [...new Set([+v.toFixed(1), +v.toFixed(2), +v.toFixed(3), Math.trunc(v * 100) / 100])].filter((w) => Math.abs(w - v) > 1e-9)
    .map((valeur) => ({ valeur, message: `C'est une valeur approchée. Donne la valeur exacte, sous forme ${quoi || "de fraction (par exemple $5/12$)"}.` }));
  const amErr = (L) => L.filter((e) => e && isFinite(e[0])).map(([valeur, message]) => ({ valeur: +(+valeur).toFixed(9), message }));
  // diagramme en bâtons : borne droite de l'axe pour que le nom de l'axe (écrit à droite) ne touche pas le dernier bâton
  const amXmax = (last, xmin, lab) => { const k = (String(lab || "").length * 6.6 + 10) / 290; return +Math.max(last + 1.2, (last + 0.4 - k * xmin) / (1 - k)).toFixed(2); };

  // Quadrillage lig × col dont les n premières cases sont coloriées
  function amGrille(lig, col, n, aria) {
    const s = Math.min(26, 280 / col, 190 / lig), x0 = (320 - col * s) / 2, H = Math.ceil(lig * s + 8);
    let r = `<svg class="graph" viewBox="0 0 320 ${H}" role="img" aria-label="${aria}">`;
    for (let k = 0; k < lig * col; k++) r += `<rect class="${k < n ? "g-carreau" : "g-vide"}" x="${amF(x0 + (k % col) * s)}" y="${amF(4 + Math.floor(k / col) * s)}" width="${amF(s)}" height="${amF(s)}" style="stroke:var(--doux);stroke-width:1"/>`;
    return r + `</svg>`;
  }

  // Droite graduée : de min à max, une graduation tous les « pas », nombres écrits aux valeurs de « etiq » ; points [{ x, label }]
  function amDroite(o) {
    const W = 320, pad = 18, n = Math.round((o.max - o.min) / o.pas), X = (x) => amF(pad + ((x - o.min) * (W - 2 * pad)) / (o.max - o.min));
    // noms des points : un étage plus haut quand ils se chevaucheraient
    const pts = (o.points || []).slice().sort((a, b) => a.x - b.x), lv = [], fin = [];
    pts.forEach((p, i) => { const x = X(p.x), w = String(p.label || "").length * 7 + 6; let l = 0; while (fin[l] !== undefined && fin[l] > x - w / 2) l++; lv[i] = l; fin[l] = x + w / 2; });
    const top = Math.max(0, ...lv), y0 = 36 + 17 * top;
    let s = `<svg class="graph droite" viewBox="0 0 ${W} ${60 + 17 * top}" role="img" aria-label="${o.aria}"><g class="g-axis"><line x1="4" y1="${y0}" x2="${W - 4}" y2="${y0}"/><path d="M${W - 1} ${y0} l-8 -4 v8z"/></g><g class="g-tick">`;
    for (let k = 0; k <= n; k++) {
      const v = +(o.min + k * o.pas).toFixed(6), e = (o.etiq || []).some((t) => Math.abs(t - v) < 1e-9);
      s += `<line class="g-graduation" x1="${X(v)}" y1="${y0 - (e ? 7 : 4)}" x2="${X(v)}" y2="${y0 + (e ? 7 : 4)}"/>` + (e ? `<text x="${X(v)}" y="${y0 + 20}" text-anchor="middle">${amT(v)}</text>` : "");
    }
    s += `</g>`;
    pts.forEach((p, i) => {
      const x = X(p.x);
      s += `<circle class="g-point" cx="${x}" cy="${y0}" r="4.5"/>` + (p.label ? amTxt(x, y0 - 10 - 17 * lv[i], p.label, "g-plabel") : "");
    });
    return s + `</svg>`;
  }

  // Figures planes et solides à l'échelle : t = type, d = dimensions, L = textes des cotes (« ? » pour la longueur cherchée)
  function amForme(t, d, L, aria) {
    const W = 320, H = 200, f = amF;
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="${aria}">`;
    const pg = (P, c) => `<polygon class="${c || "g-poly"}" points="${P.map((p) => f(p[0]) + "," + f(p[1])).join(" ")}"/>`;
    const ln = (a, b, c) => `<line class="${c || "g-segment"}" x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}"/>`;
    const tx = (x, y, u, a) => (u === undefined || u === "" ? "" : amTxt(x, y, u, "g-mesure", a));
    const droit = (x, y, sx, sy) => `<path class="g-code" d="M${f(x + 9 * sx)} ${f(y)} V${f(y + 9 * sy)} H${f(x)}"/>`;
    const demi = (cx, cy, rx, ry, dos) => `<path class="${dos ? "g-cache-arc" : "g-arc-plein"}" d="M${f(cx - rx)} ${f(cy)} A${f(rx)} ${f(ry)} 0 0 ${dos ? 1 : 0} ${f(cx + rx)} ${f(cy)}"/>`;
    const pt = (p) => `<circle class="g-point" cx="${f(p[0])}" cy="${f(p[1])}" r="3"/>`;
    if (t === "rect" || t === "carre" || t === "rectdiag") {
      const a = d[0], b = t === "carre" ? d[0] : d[1], k = Math.min(200 / a, 120 / b), w = a * k, h = b * k, x0 = (W - w) / 2 - 14, y0 = (H - h) / 2 - 8;
      s += `<rect class="g-poly" x="${f(x0)}" y="${f(y0)}" width="${f(w)}" height="${f(h)}"/>` + droit(x0, y0 + h, 1, -1) + tx(x0 + w / 2, y0 + h + 17, L[0]) + tx(x0 + w + 7, y0 + h / 2 + 4, L[1], "start");
      if (t === "rectdiag") s += ln([x0, y0 + h], [x0 + w, y0], "g-curve") + tx(x0 + w / 2 - 10, y0 + h / 2 - 6, L[2], "end");
    } else if (t === "tri") {
      const [b, h, o] = d, k = Math.min(220 / b, 135 / h), w = b * k, hh = h * k, x0 = (W - w) / 2, y0 = (H + hh) / 2 - 4, A = [x0 + o * w, y0 - hh];
      s += pg([[x0, y0], [x0 + w, y0], A]) + ln(A, [A[0], y0], "g-cache") + droit(A[0], y0, 1, -1) + tx(x0 + w / 2, y0 + 17, L[0]) + tx(A[0] + 6, y0 - hh * 0.4, L[1], "start");
    } else if (t === "tri3") {
      const [a, b, c, N] = d, xA = (a * a + c * c - b * b) / (2 * a), yA = Math.sqrt(Math.max(c * c - xA * xA, 0.01)), xm = Math.min(0, xA), xM = Math.max(a, xA), k = Math.min(230 / (xM - xm), 135 / yA);
      const T = (x, y) => [W / 2 + (x - (xm + xM) / 2) * k, (H + yA * k) / 2 - y * k], B = T(0, 0), C = T(a, 0), A = T(xA, yA), G = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
      s += pg([A, B, C]) + amCote(B, C, G, L[0]) + amCote(C, A, G, L[1]) + amCote(A, B, G, L[2]);
      if (N) [A, B, C].forEach((P, i) => { const n = Math.hypot(P[0] - G[0], P[1] - G[1]) || 1; s += amTxt(P[0] + ((P[0] - G[0]) / n) * 13, P[1] + ((P[1] - G[1]) / n) * 13 + 4, N[i], "g-plabel"); });
    } else if (t === "cercle") {
      const R = 74, c = [W / 2, H / 2];
      s += `<circle class="g-disque" cx="${c[0]}" cy="${c[1]}" r="${R}"/><circle class="g-cercle" cx="${c[0]}" cy="${c[1]}" r="${R}"/>` + (d[1] ? ln([c[0] - R, c[1]], [c[0] + R, c[1]]) : ln(c, [c[0] + R, c[1]])) + pt(c) + tx(d[1] ? c[0] : c[0] + R / 2, c[1] - 8, L[0]);
    } else if (t === "trapeze") {
      const [B, b, h] = d, k = Math.min(230 / B, 125 / h), w = B * k, wb = b * k, hh = h * k, x0 = (W - w) / 2, y0 = (H + hh) / 2 - 2, xb = x0 + (w - wb) * 0.3;
      s += pg([[x0, y0], [x0 + w, y0], [xb + wb, y0 - hh], [xb, y0 - hh]]) + ln([xb, y0 - hh], [xb, y0], "g-cache") + droit(xb, y0, 1, -1) + tx(x0 + w / 2, y0 + 17, L[0]) + tx(xb + wb / 2, y0 - hh - 7, L[1]) + tx(xb + 6, y0 - hh * 0.4, L[2], "start");
    } else if (t === "pave" || t === "cube") {
      const [a, b, c] = t === "cube" ? [d[0], d[0], d[0]] : d, k = Math.min(190 / (a + 0.36 * b), 140 / (c + 0.36 * b)), w = a * k, h = c * k, p = 0.36 * b * k;
      const x0 = (W - w - p) / 2 - 6, y0 = (H + h + p) / 2 - 6, F = [[x0, y0], [x0 + w, y0], [x0 + w, y0 - h], [x0, y0 - h]], D = (q) => [q[0] + p, q[1] - p];
      s += pg([F[3], F[2], D(F[2]), D(F[3])], "g-cube-haut") + pg([F[1], D(F[1]), D(F[2]), F[2]], "g-cube-g") + pg(F) + ln(D(F[0]), D(F[1]), "g-cache") + ln(D(F[0]), D(F[3]), "g-cache") + ln(D(F[0]), F[0], "g-cache");
      s += tx(x0 + w / 2, y0 + 16, L[0]) + tx(x0 + w + p / 2 + 7, y0 - p / 2 + 9, L[1], "start") + tx(x0 - 6, y0 - h / 2 + 4, L[2], "end");
    } else if (t === "prisme") {
      const [b, hb, lg] = d, k = Math.min(180 / (b + 0.36 * lg), 140 / (hb + 0.36 * lg)), w = b * k, h = hb * k, p = 0.36 * lg * k;
      const x0 = (W - w - p) / 2 - 6, y0 = (H + h + p) / 2 - 6, T1 = [x0, y0], T2 = [x0 + w, y0], T3 = [x0 + w / 2, y0 - h], D = (q) => [q[0] + p, q[1] - p];
      s += pg([T3, T2, D(T2), D(T3)], "g-cube-g") + pg([T1, T2, T3]) + ln(D(T1), D(T2), "g-cache") + ln(D(T1), D(T3), "g-cache") + ln(D(T1), T1, "g-cache") + ln(T3, [T3[0], y0], "g-cache") + droit(T3[0], y0, 1, -1);
      s += tx(x0 + w / 2, y0 + 16, L[0]) + tx(T3[0] - 6, y0 - h * 0.4, L[1], "end") + tx(x0 + w + p / 2 + 7, y0 - p / 2 + 9, L[2], "start");
    } else if (t === "cyl") {
      const [r, h] = d, k = Math.min(78 / r, 128 / h), rx = r * k, ry = Math.max(9, rx * 0.3), hh = h * k, cx = W / 2 - 18, yb = (H + hh) / 2 - 2, yt = yb - hh;
      s += `<path class="g-poly" d="M${f(cx - rx)} ${f(yt)} V${f(yb)} A${f(rx)} ${f(ry)} 0 0 0 ${f(cx + rx)} ${f(yb)} V${f(yt)} Z"/><ellipse class="g-cube-haut" cx="${f(cx)}" cy="${f(yt)}" rx="${f(rx)}" ry="${f(ry)}"/>`;
      s += demi(cx, yb, rx, ry, true) + ln([cx, yt], [cx + rx, yt]) + pt([cx, yt]) + tx(cx + rx + 6, yt - 2, L[0], "start") + tx(cx + rx + 8, (yt + yb) / 2 + 8, L[1], "start");
    } else if (t === "cone") {
      const [r, h] = d, k = Math.min(76 / r, 128 / h), rx = r * k, ry = Math.max(9, rx * 0.3), hh = h * k, cx = W / 2 - 22, yb = (H + hh - ry) / 2, S = [cx, yb - hh];
      s += `<path class="g-poly" d="M${f(cx - rx)} ${f(yb)} L${f(S[0])} ${f(S[1])} L${f(cx + rx)} ${f(yb)} A${f(rx)} ${f(ry)} 0 0 1 ${f(cx - rx)} ${f(yb)} Z"/>` + demi(cx, yb, rx, ry, true);
      s += ln(S, [cx, yb], "g-cache") + droit(cx, yb, 1, -1) + ln([cx, yb], [cx + rx, yb]) + pt([cx, yb]) + pt(S) + tx(cx + rx + 6, yb + 4, L[0], "start") + tx(cx + rx / 2 + 10, yb - hh / 2 + 4, L[1], "start");
    } else if (t === "boule") {
      const R = 76, c = [W / 2, H / 2], e = [c[0] + R * 0.82, c[1] - R * 0.57];
      s += `<circle class="g-disque" cx="${c[0]}" cy="${c[1]}" r="${R}"/><circle class="g-cercle" cx="${c[0]}" cy="${c[1]}" r="${R}"/>` + demi(c[0], c[1], R, 18, true) + demi(c[0], c[1], R, 18, false) + ln(c, e) + pt(c) + tx((c[0] + e[0]) / 2 - 5, (c[1] + e[1]) / 2 - 6, L[0], "end");
    } else if (t === "pyr") {
      const [a, h] = d, k = Math.min(180 / (1.36 * a), 150 / (h + 0.18 * a)), w = a * k, p = 0.36 * a * k, hh = h * k;
      const x0 = (W - w - p) / 2 - 6, y0 = H - 24, B1 = [x0, y0], B2 = [x0 + w, y0], B3 = [x0 + w + p, y0 - p], B4 = [x0 + p, y0 - p], O = [x0 + (w + p) / 2, y0 - p / 2], S = [O[0], O[1] - hh];
      s += pg([S, B1, B2]) + pg([S, B2, B3], "g-cube-g") + ln(S, B4, "g-cache") + ln(B4, B1, "g-cache") + ln(B4, B3, "g-cache") + ln(S, O, "g-cache") + pt(O) + pt(S);
      s += tx(x0 + w / 2, y0 + 16, L[0]) + tx(O[0] - 6, O[1] - hh * 0.45, L[1], "end");
    }
    return s + `</svg>`;
  }

  // Triangle rectangle à l'échelle. N = [sommet de l'angle droit R, P, Q] ; u = RP, v = RQ ; c = textes des côtés [RP, RQ, PQ] ;
  // ang = 1 ou 2 : angle marqué en P ou en Q (angTxt écrit à côté) ; o = orientation (0 à 3)
  function amTriangle(N, u, v, c, ang, o, aria, angTxt) {
    const sx = o & 1 ? -1 : 1, sy = o & 2 ? -1 : 1, k = Math.min(230 / u, 140 / v), f = amF;
    const M = [[0, 0], [sx * u * k, 0], [0, sy * v * k]], xs = M.map((p) => p[0]), ys = M.map((p) => p[1]);
    const dx = 160 - (Math.min(...xs) + Math.max(...xs)) / 2, dy = 104 + (Math.min(...ys) + Math.max(...ys)) / 2;
    const [R, P, Q] = M.map((p) => [p[0] + dx, dy - p[1]]), G = [(R[0] + P[0] + Q[0]) / 3, (R[1] + P[1] + Q[1]) / 3];
    let s = `<svg class="graph" viewBox="0 0 320 208" role="img" aria-label="${aria}"><polygon class="g-poly" points="${[R, P, Q].map((p) => f(p[0]) + "," + f(p[1])).join(" ")}"/>`;
    s += `<path class="g-code" d="M${f(R[0] + 10 * sx)} ${f(R[1])} V${f(R[1] - 10 * sy)} H${f(R[0])}"/>`;
    if (ang) {
      const A = ang === 1 ? P : Q, B = ang === 1 ? Q : P, a1 = Math.atan2(R[1] - A[1], R[0] - A[0]), a2 = Math.atan2(B[1] - A[1], B[0] - A[0]);
      let dA = a2 - a1; while (dA > Math.PI) dA -= 2 * Math.PI; while (dA < -Math.PI) dA += 2 * Math.PI;
      const r = 24, p1 = [A[0] + r * Math.cos(a1), A[1] + r * Math.sin(a1)], p2 = [A[0] + r * Math.cos(a2), A[1] + r * Math.sin(a2)], am = a1 + dA / 2;
      s += `<path class="g-arc" d="M${f(p1[0])} ${f(p1[1])} A${r} ${r} 0 0 ${dA > 0 ? 1 : 0} ${f(p2[0])} ${f(p2[1])}"/>`;
      if (angTxt) s += amTxt(A[0] + 40 * Math.cos(am), A[1] + 40 * Math.sin(am) + 4, angTxt, "g-mesure");
    }
    s += amCote(R, P, G, c[0]) + amCote(R, Q, G, c[1]) + amCote(P, Q, G, c[2]);
    [R, P, Q].forEach((X, i) => { if (N[i]) { const n = Math.hypot(X[0] - G[0], X[1] - G[1]) || 1; s += amTxt(X[0] + ((X[0] - G[0]) / n) * 13, X[1] + ((X[1] - G[1]) / n) * 13 + 4, N[i], "g-plabel"); } });
    return s + `</svg>`;
  }

  // Diagramme circulaire (ou semi-circulaire) : v = valeurs (angles proportionnels), noms, textes écrits sous chaque nom
  function amSecteurs(v, noms, txt, semi, aria) {
    const H = semi ? 168 : 226, R = semi ? 92 : 72, cx = 160, cy = semi ? 140 : 110, tot = v.reduce((a, b) => a + b, 0), plein = semi ? Math.PI : 2 * Math.PI;
    const pt = (t, r) => [amF(cx + r * Math.cos(t)), amF(cy - r * Math.sin(t))];
    let s = `<svg class="graph" viewBox="0 0 320 ${H}" role="img" aria-label="${aria}">`, a = semi ? Math.PI : Math.PI / 2;
    v.forEach((x, k) => {
      const b = a - (x / tot) * plein, p1 = pt(a, R), p2 = pt(b, R), m = (a + b) / 2, [lx, ly] = pt(m, R + 12), c = Math.cos(m), sn = Math.sin(m);
      s += `<path class="g-secteur g-secteur-${k % 4}" d="M${cx} ${cy} L${p1[0]} ${p1[1]} A${R} ${R} 0 ${a - b > Math.PI ? 1 : 0} 1 ${p2[0]} ${p2[1]} Z"/>`;
      const anc = c > 0.25 ? "start" : c < -0.25 ? "end" : "middle", y = ly + (sn > 0.5 ? -12 : sn < -0.5 ? 10 : 0);
      s += amTxt(lx, y, noms[k], "g-label", anc) + (txt ? amTxt(lx, y + 14, txt[k], "g-mesure", anc) : "");
      a = b;
    });
    if (semi) s += `<line class="g-segment" x1="${cx - R - 8}" y1="${cy}" x2="${cx + R + 8}" y2="${cy}"/>`;
    return s + `</svg>`;
  }

  // Urne : une boule par lettre (R : rouge, B : bleue…), rangées par lignes
  function amUrne(boules, aria) {
    const n = boules.length, nl = n > 12 ? 6 : n > 8 ? 5 : 4, lig = Math.ceil(n / nl), H = 44 + lig * 28, w = nl * 28 + 22, x0 = (320 - w) / 2;
    let s = `<svg class="graph" viewBox="0 0 320 ${H}" role="img" aria-label="${aria}"><path class="g-segment" style="fill:none" d="M${x0} 10 V${H - 16} Q${x0} ${H - 6} ${x0 + 12} ${H - 6} H${x0 + w - 12} Q${x0 + w} ${H - 6} ${x0 + w} ${H - 16} V10"/>`;
    boules.forEach((b, k) => { const cx = x0 + 25 + (k % nl) * 28, cy = H - 22 - Math.floor(k / nl) * 28; s += `<circle class="g-cercle" cx="${cx}" cy="${cy}" r="12"/>` + amTxt(cx, cy + 4, b, "g-label"); });
    return s + `</svg>`;
  }

  // Barre « tout » dont la partie est coloriée : p = proportion ; textes : partie (au-dessus), tout (en dessous), proportion (dans la barre)
  function amBarre(p, tp, tt, tq, aria) {
    const x0 = 22, w = 276, y = 50, h = 34, wp = amF(Math.max(24, Math.min(w - 24, w * p))), lg = (t) => String(t).replace(/<[^>]+>/g, "").length * 6.8;
    let s = `<svg class="graph" viewBox="0 0 320 126" role="img" aria-label="${aria}"><rect class="g-rect" x="${x0}" y="${y}" width="${w}" height="${h}"/><rect class="g-carreau" x="${x0}" y="${y}" width="${wp}" height="${h}"/>`;
    s += `<path class="g-accolade" d="M${x0} ${y - 5}v-8h${wp}v8"/>` + (x0 + wp / 2 - lg(tp) / 2 < 4 ? amTxt(x0, y - 18, tp, "g-mesure", "start") : amTxt(x0 + wp / 2, y - 18, tp, "g-mesure"));
    s += `<path class="g-accolade" d="M${x0} ${y + h + 5}v8h${w}v-8"/>` + amTxt(x0 + w / 2, y + h + 27, tt, "g-mesure");
    if (tq) s += wp >= lg(tq) + 10 ? amTxt(x0 + wp / 2, y + h / 2 + 4, tq) : amTxt(x0 + wp + 5, y + h / 2 + 4, tq, "g-label", "start");
    return s + `</svg>`;
  }

  // Évolution : barre « avant » et barre « après » (hauteurs dans le rapport cm), flèche marquée tf
  function amEvol(cm, t1, t2, tf, aria) {
    const base = 174, hm = 96, h1 = cm > 1 ? hm / cm : hm, h2 = h1 * cm, xa = 96, xb = 224, bw = 54, f = amF, ya = base - h1 - (t1 ? 22 : 8), yb = base - h2 - (t2 ? 22 : 8), yc = Math.min(ya, yb) - 22;
    const ang = Math.atan2(yb - yc, xb - 6 - 160), pt = (r, d) => `${f(xb - 6 - r * Math.cos(ang + d))} ${f(yb - r * Math.sin(ang + d))}`;
    let s = `<svg class="graph" viewBox="0 0 320 200" role="img" aria-label="${aria}"><line class="g-segment" x1="34" y1="${base}" x2="286" y2="${base}"/>`;
    s += `<rect class="g-rect" x="${xa - bw / 2}" y="${f(base - h1)}" width="${bw}" height="${f(h1)}"/><rect class="g-carreau" x="${xb - bw / 2}" y="${f(base - h2)}" width="${bw}" height="${f(h2)}"/>`;
    s += (t1 ? amTxt(xa, base - h1 - 7, t1, "g-mesure") : "") + (t2 ? amTxt(xb, base - h2 - 7, t2, "g-mesure") : "") + amTxt(xa, base + 16, "avant") + amTxt(xb, base + 16, "après");
    s += `<path class="g-curve g-curve-1" style="stroke-width:2" d="M${xa + 6} ${f(ya)} Q160 ${f(yc - 10)} ${xb - 6} ${f(yb)}"/><path class="g-end g-curve-1" d="M${xb - 6} ${f(yb)} L${pt(10, 0.45)} L${pt(10, -0.45)}Z"/>`;
    return s + amTxt(160, Math.max(14, yc - 10), tf, "g-clabel g-curve-1") + `</svg>`;
  }

  /* Calcul numérique : fractions et puissances */
  GEN["auto-fractions"] = function (i) {
    if (i % 2 === 1) {
      const a = pick([2, 3, 5, 10]), m = randNZ(-5, 7), n = randNZ(-5, 7), kind = pick(["prod", "quot", "pow"]);
      let expr, res, regle, calc, err;
      if (kind === "prod") { expr = `${a}^{${m}} \\times ${a}^{${n}}`; res = m + n; calc = `${m} + ${par(n)}`; regle = "$a^m \\times a^n = a^{m+n}$ : on **additionne** les exposants."; err = [[m * n, "Pour un produit de puissances d'un même nombre, on **additionne** les exposants, on ne les multiplie pas."], [m - n, "Pour un produit, on **additionne** les exposants (c'est pour un quotient qu'on les soustrait)."]]; }
      else if (kind === "quot") { expr = `\\dfrac{${a}^{${m}}}{${a}^{${n}}}`; res = m - n; calc = `${m} - ${par(n)}`; regle = "$\\dfrac{a^m}{a^n} = a^{m-n}$ : on **soustrait** les exposants."; err = [[m + n, "Pour un quotient, on **soustrait** les exposants : $\\dfrac{a^m}{a^n} = a^{m-n}$."], [n - m, "Attention à l'ordre : l'exposant du numérateur moins celui du dénominateur."]]; }
      else { const k = rand(2, 4); expr = `\\left(${a}^{${m}}\\right)^{${k}}`; res = m * k; calc = `${par(m)} \\times ${k}`; regle = "$(a^m)^n = a^{m \\times n}$ : on **multiplie** les exposants."; err = [[m + k, "Puissance d'une puissance : on **multiplie** les exposants, on ne les additionne pas."]]; }
      return {
        enonce: `Écris $${expr}$ sous la forme $${a}^{n}$. Quel est l'exposant $n$ ?`,
        mode: "nombre", prefixe: "n =", attendu: res, erreurs: amErr(err),
        aides: [regle, `L'exposant vaut $${calc}$.`, m < 0 || n < 0 ? "Attention aux signes : soustraire un nombre négatif revient à ajouter son opposé." : "Calcule l'exposant de tête, puis vérifie son signe."],
        solution: `$${expr} = ${a}^{${calc}} = ${a}^{${res}}$`
      };
    }
    const D = [2, 3, 4, 5, 6, 8, 9, 10, 12], F = (x, y) => `${x < 0 ? "-" : ""}\\dfrac{${Math.abs(x)}}{${y}}`;
    let b, d, a, c;
    do { b = pick(D); d = pick(D); } while (b === d);
    do { a = rand(1, 2 * b - 1); } while (pgcd(a, b) !== 1);
    do { c = rand(1, 2 * d - 1); } while (pgcd(c, d) !== 1);
    const op = pick(["+", "-", "\\times", "\\div"]), A = F(a, b), C = F(c, d);
    let n, den, aides, calc, err = [];
    if (op === "+" || op === "-") {
      const m = (b * d) / pgcd(b, d), s = op === "+" ? 1 : -1, a2 = (a * m) / b, c2 = (c * m) / d;
      n = a2 + s * c2; den = m; calc = `${F(a2, m)} ${op} ${F(c2, m)} = ${F(n, m)}`;
      aides = [`Pour ${s > 0 ? "additionner" : "soustraire"} deux fractions, on les écrit d'abord avec le même dénominateur : ici $${m}$.`, `$${A} ${op} ${C} = ${F(a2, m)} ${op} ${F(c2, m)}$.`, AIDE_FRAC];
      err = [[(a + s * c) / (b + s * d), `On ${s > 0 ? "n'additionne" : "ne soustrait"} pas les dénominateurs : on réduit d'abord au même dénominateur.`], [(a + s * c) / (b * d), "On a multiplié les dénominateurs sans transformer les numérateurs : chaque fraction doit garder sa valeur."]];
    } else if (op === "\\times") {
      n = a * c; den = b * d; calc = `\\dfrac{${a} \\times ${c}}{${b} \\times ${d}} = ${F(n, den)}`;
      aides = ["Pour multiplier deux fractions, on multiplie les numérateurs entre eux et les dénominateurs entre eux.", `$${A} \\times ${C} = \\dfrac{${a} \\times ${c}}{${b} \\times ${d}}$.`, AIDE_FRAC];
      err = [[(a * d) / (b * c), "Ça, c'est le quotient des deux fractions. Pour un produit, on multiplie les numérateurs entre eux et les dénominateurs entre eux."]];
    } else {
      n = a * d; den = b * c; calc = `${A} \\times ${F(d, c)} = ${F(n, den)}`;
      aides = ["Diviser par une fraction, c'est multiplier par son **inverse**.", `$${A} \\div ${C} = ${A} \\times ${F(d, c)}$.`, AIDE_FRAC];
      err = [[(a * c) / (b * d), "Diviser par une fraction, c'est multiplier par son **inverse** : on retourne la seconde fraction."], [(b * c) / (a * d), "C'est la **seconde** fraction qu'on retourne, pas la première."]];
    }
    const v = n / den, e = amErr(err);
    if (!amDecimal(v)) e.push(...amApprox(v));
    return {
      enonce: `Calcule $${A} ${op} ${C}$. Donne le résultat sous forme de fraction irréductible (ou d'un entier).`,
      mode: "nombre", prefixe: "=", attendu: v, erreurs: e, aides,
      solution: `$${A} ${op} ${C} = ${calc}${pgcd(n, den) > 1 ? ` = ${frac(n, den)}` : ""}$`
    };
  };

  /* Conversions d'unités : longueurs, masses, contenances, aires, volumes, durées, vitesses */
  GEN["auto-conversions"] = function () {
    const cat = pick(["long", "long", "masse", "cont", "aire", "aire", "vol", "duree", "duree", "vit"]);
    const nbr = () => pick([rand(1, 9), rand(11, 99), rand(101, 999), rand(1, 9) * 100]) / pick([1, 10, 10, 100]);
    const pl = (x, mot) => `${mot}${Math.abs(x) >= 2 ? "s" : ""}`;
    let enonce, rep, unite, aides, sol, err = [];
    if (cat === "duree") {
      const t = rand(0, 4), ctx = Math.random() < 0.3;
      if (t === 0) {
        const h = pick([0.25, 0.5, 0.75, 0.1, 0.2, 0.3, 0.4, 0.6, 0.8, 0.9, 1.5, 1.25, 2.5, 1.75, 1.2, 2.4, 3.5, 1.1]);
        enonce = ctx && h <= 0.5 ? `La traversée en barge de Mamoudzou à Dzaoudzi dure $${nb(h)}$ h. Convertis cette durée en minutes.` : `Convertis $${nb(h)}$ h en minutes.`;
        rep = h * 60; unite = "min"; err = [[h * 100, "Une heure compte $60$ minutes, pas $100$."], h > 1 ? [Math.floor(h) * 60 + Math.round((h % 1) * 100), `$${nb(h)}$ h, ce n'est pas $${Math.floor(h)}$ h $${Math.round((h % 1) * 100)}$ min : la partie décimale se multiplie par $60$.`] : null];
        aides = ["$1$ h $= 60$ min.", `On multiplie par $60$ : $${nb(h)} \\times 60$.`, "Astuce : $0{,}1$ h $= 6$ min et $0{,}25$ h $= 15$ min."];
        sol = `$${nb(h)}$ h $= ${nb(h)} \\times 60$ min $= ${nb(rep)}$ min.`;
      } else if (t === 1) {
        const m = pick([6, 12, 15, 18, 24, 30, 36, 42, 45, 48, 54, 75, 90, 105, 135, 150]);
        enonce = ctx ? `Le trajet en taxi-brousse de Mamoudzou à Combani dure $${m}$ minutes. Convertis cette durée en heures (écriture décimale).` : `Convertis $${m}$ min en heures (écriture décimale).`;
        rep = m / 60; unite = "h"; err = [[m / 100, "Une heure compte $60$ minutes : on divise par $60$, pas par $100$."], m > 60 ? [Math.floor(m / 60) + (m % 60) / 100, `$${Math.floor(m / 60)}$ h $${m % 60}$ min ne s'écrit pas $${nb(Math.floor(m / 60) + (m % 60) / 100)}$ h : $${m % 60}$ min $= ${nb((m % 60) / 60)}$ h.`] : null];
        aides = ["$1$ h $= 60$ min, donc $1$ min $= \\dfrac{1}{60}$ h.", `On divise par $60$ : $${m} \\div 60$.`, "Repères : $15$ min $= 0{,}25$ h, $30$ min $= 0{,}5$ h, $6$ min $= 0{,}1$ h."];
        sol = `$${m}$ min $= \\dfrac{${m}}{60}$ h $= ${nb(rep)}$ h.`;
      } else if (t === 2) {
        const h = rand(1, 4), m = pick([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
        enonce = `Convertis $${h}$ h $${m}$ min en minutes.`; rep = h * 60 + m; unite = "min"; err = [[h * 100 + m, "$1$ h $= 60$ min, pas $100$ min."], [h + m, "Il faut d'abord convertir les heures en minutes."]];
        aides = ["$1$ h $= 60$ min.", `$${h}$ h $= ${h * 60}$ min.`, `Ajoute les $${m}$ minutes.`];
        sol = `$${h}$ h $${m}$ min $= ${h * 60} + ${m} = ${rep}$ min.`;
      } else if (t === 3) {
        const H = rand(1, 3), dd = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.75, 0.8, 0.9]);
        enonce = `$${nb(H + dd)}$ h, c'est $${H}$ h et combien de minutes ?`; rep = dd * 60; unite = "min"; err = [[dd * 100, `$${nb(dd)}$ h, ce n'est pas $${nb(dd * 100)}$ min : une heure compte $60$ minutes.`]];
        aides = ["On convertit seulement la partie décimale.", `$${nb(dd)}$ h $= ${nb(dd)} \\times 60$ min.`, "$0{,}1$ h $= 6$ min."];
        sol = `$${nb(H + dd)}$ h $= ${H}$ h $+ ${nb(dd)} \\times 60$ min $= ${H}$ h $${nb(rep)}$ min.`;
      } else {
        const m = pick([1.5, 2.5, 3.5, 0.5, 1.2, 0.75, 4, 2, 1.25, 0.25]);
        enonce = `Convertis $${nb(m)}$ min en secondes.`; rep = m * 60; unite = "s"; err = [[m * 100, "Une minute compte $60$ secondes, pas $100$."]];
        aides = ["$1$ min $= 60$ s.", `On multiplie par $60$ : $${nb(m)} \\times 60$.`, "$0{,}5$ min $= 30$ s."];
        sol = `$${nb(m)}$ min $= ${nb(m)} \\times 60$ s $= ${nb(rep)}$ s.`;
      }
    } else if (cat === "vit") {
      if (Math.random() < 0.55) {
        const v = pick([18, 36, 54, 72, 90, 108, 126, 144, 180, 7.2, 10.8, 3.6, 14.4, 21.6]);
        const qui = v === 18 || v === 21.6 ? "La barge avance à" : v <= 14.4 ? "Un piéton marche à" : v <= 54 ? "Un scooter roule à" : v <= 126 ? "Une voiture roule à" : "Un avion roule sur la piste de Pamandzi à";
        enonce = `${qui} $${nb(v)}$ km/h. Convertis cette vitesse en m/s.`; rep = v / 3.6; unite = "m/s"; err = [[v * 3.6, "De km/h vers m/s, on **divise** par $3{,}6$ : le nombre devient plus petit."]];
        aides = ["$1$ m/s $= 3{,}6$ km/h (en $1$ h, soit $3\\,600$ s, on fait $3\\,600$ m, soit $3{,}6$ km).", `On divise par $3{,}6$ : $${nb(v)} \\div 3{,}6$.`, "Vérifie : en m/s, le nombre est plus petit qu'en km/h."];
        sol = `$${nb(v)}$ km/h $= ${nb(v)} \\div 3{,}6$ m/s $= ${nb(rep)}$ m/s.`;
      } else {
        const v = pick([2, 3, 4, 5, 10, 15, 20, 25, 30, 40, 50, 1.5, 2.5]);
        enonce = `${v <= 5 ? "Un coureur avance à" : v <= 15 ? "Un cycliste roule à" : "Une voiture roule à"} $${nb(v)}$ m/s. Convertis cette vitesse en km/h.`; rep = v * 3.6; unite = "km/h"; err = [[v * 3600, "Tu as converti les secondes en heures, mais il faut aussi passer des mètres aux kilomètres : on divise ensuite par $1\\,000$."], [v * 60, "Une heure compte $3\\,600$ secondes, pas $60$."]];
        aides = ["$1$ m/s $= 3{,}6$ km/h.", `On multiplie par $3{,}6$ : $${nb(v)} \\times 3{,}6$.`, "Vérifie : en km/h, le nombre est plus grand qu'en m/s."];
        sol = `$${nb(v)}$ m/s $= ${nb(v)} \\times 3{,}6$ km/h $= ${nb(rep)}$ km/h.`;
      }
    } else {
      const U = {
        long: [["km", 3], ["hm", 2], ["dam", 1], ["m", 0], ["dm", -1], ["cm", -2], ["mm", -3]],
        masse: [["t", 6], ["kg", 3], ["g", 0], ["mg", -3]],
        cont: [["hL", 2], ["L", 0], ["dL", -1], ["cL", -2], ["mL", -3]],
        aire: [["km²", 6], ["ha", 4], ["m²", 0], ["dm²", -2], ["cm²", -4], ["mm²", -6]],
        vol: [["m³", 3], ["dm³", 0], ["L", 0], ["cm³", -3], ["mL", -3]]
      }[cat];
      const maxD = { long: 3, masse: 3, cont: 3, aire: 4, vol: 3 }[cat];
      let i1, i2, D, v, r;
      do {
        i1 = rand(0, U.length - 1); i2 = rand(0, U.length - 1); D = U[i1][1] - U[i2][1]; v = nbr(); r = +(v * 10 ** D).toPrecision(12);
      } while (i1 === i2 || Math.abs(D) > maxD || (D === 0 && (cat !== "vol" || Math.random() < 0.6)) || r > 5e6 || r < 0.01 || v < 0.05 || !amDecimal(r * 100) || ([U[i1][0], U[i2][0]].some((x) => /^(hm|dam|dL|hL)$/.test(x)) && Math.random() < 0.7));
      const [u1, u2] = [U[i1][0], U[i2][0]], k = Math.abs(D), F = nb(10 ** k), mult = D > 0;
      // contextes de Mayotte pour quelques conversions
      const C = {
        "km>m": "La barge parcourt environ {v} km entre Mamoudzou et Dzaoudzi.", "m>cm": "Une pirogue de pêcheur mesure {v} m.", "kg>g": "Un régime de bananes pèse {v} kg.", "kg>t": "Une coopérative de Combani récolte {v} kg de fleurs d'ylang-ylang.",
        "L>cL": "Une bouteille de jus de goyave contient {v} L.", "L>mL": "Une gourde contient {v} L d'eau.", "ha>m²": "Une parcelle de vanille de Bandrélé mesure {v} ha.", "m³>L": "Une citerne d'eau de pluie a un volume de {v} m³.", "cm>m": "Un bébé tortue mesure {v} cm."
      }[u1 + ">" + u2];
      const okCtx = C && Math.random() < 0.5 && (u1 !== "km" || (v >= 1 && v <= 6)) && (u1 !== "m" || u2 !== "cm" || (v >= 3 && v <= 9)) && (u1 !== "kg" || (v >= 8 && v <= 950)) && (u1 !== "L" || v <= 2) && (u1 !== "ha" || v <= 9) && (u1 !== "m³" || v <= 9) && (u1 !== "cm" || v <= 9);
      enonce = okCtx ? `${C.replace("{v}", `$${nb(v)}$`)} Convertis en ${u2}.` : `Convertis $${nb(v)}$ ${u1} en ${u2}.`;
      rep = r; unite = u2;
      const regle = {
        long: "Unités de longueur : km, hm, dam, m, dm, cm, mm. On multiplie par $10$ à chaque rang vers la droite.",
        masse: "$1$ t $= 1\\,000$ kg, $1$ kg $= 1\\,000$ g et $1$ g $= 1\\,000$ mg.",
        cont: "$1$ hL $= 100$ L et $1$ L $= 10$ dL $= 100$ cL $= 1\\,000$ mL.",
        aire: "Pour les aires, on multiplie par $100$ d'une unité à la suivante : $1$ m² $= 100$ dm² $= 10\\,000$ cm². Et $1$ ha $= 10\\,000$ m², $1$ km² $= 100$ ha.",
        vol: "$1$ m³ $= 1\\,000$ dm³ et $1$ dm³ $= 1\\,000$ cm³. Contenances : $1$ dm³ $= 1$ L et $1$ cm³ $= 1$ mL."
      }[cat];
      aides = [regle, D === 0 ? `$1$ ${u1} $= 1$ ${u2} : le nombre ne change pas.` : `De ${u1} à ${u2}, on ${mult ? "multiplie" : "divise"} par $${F}$.`, mult ? "On passe à une unité plus petite : le nombre doit devenir plus grand." : "On passe à une unité plus grande : le nombre doit devenir plus petit."];
      sol = D === 0 ? `$1$ ${u1} $= 1$ ${u2}, donc $${nb(v)}$ ${u1} $= ${nb(r)}$ ${u2}.` : `$${nb(v)}$ ${u1} $= ${nb(v)} ${mult ? "\\times" : "\\div"} ${F}$ ${u2} $= ${nb(r)}$ ${u2}.`;
      if (D !== 0) {
        err.push([v * 10 ** -D, mult ? "On passe à une unité plus petite : on **multiplie**, le nombre devient plus grand." : "On passe à une unité plus grande : on **divise**, le nombre devient plus petit."]);
        if (cat === "aire") err.push([v * 10 ** (D / 2), "Pour les aires, c'est $\\times 100$ à chaque rang, et non $\\times 10$ comme pour les longueurs."]);
        else if (cat === "vol" && U[i1][0] !== "L" && U[i2][0] !== "L" && U[i1][0] !== "mL" && U[i2][0] !== "mL") err.push([v * 10 ** (D / 3), "Pour les volumes, c'est $\\times 1\\,000$ à chaque rang, et non $\\times 10$."]);
        else if ((cat === "long" || cat === "cont") && k >= 2) err.push([v * 10 ** (D - Math.sign(D)), "Compte bien les rangs entre les deux unités : un rang de plus ou de moins change tout."]);
      }
    }
    return {
      enonce, mode: "nombre", prefixe: "Réponse :", suffixe: unite, attendu: +rep.toFixed(6),
      erreurs: amErr(err.filter(Boolean)), aides, solution: sol
    };
  };

  /* Calcul littéral : développer, factoriser, supprimer des parenthèses */
  GEN["auto-litteral"] = function () {
    const a = rand(1, 9), k = rand(2, 5), X = (c) => (c === 1 ? "x" : `${c}x`), s = pick([1, -1]), S = s > 0 ? "+" : "-", t = rand(0, 6);
    let verbe = "Développe", expr, bonne, fausses, regle;
    if (t === 0) {
      const kk = pick([1, 1, k]); expr = `(${X(kk)} ${S} ${a})^2`; bonne = poly([kk * kk, 2 * s * kk * a, a * a]);
      fausses = [poly([kk * kk, 0, a * a]), poly([kk * kk, s * kk * a, a * a]), poly([kk * kk, 2 * s * kk * a, -a * a]), poly([kk, 2 * s * kk * a, a * a]), poly([kk * kk, -2 * s * kk * a, a * a])];
      regle = s > 0 ? "$(a + b)^2 = a^2 + 2ab + b^2$ : n'oublie pas le double produit $2ab$." : "$(a - b)^2 = a^2 - 2ab + b^2$ : le double produit est soustrait, mais $b^2$ est ajouté.";
    } else if (t === 1) {
      const kk = pick([1, k]); expr = `(${X(kk)} + ${a})(${X(kk)} - ${a})`; bonne = poly([kk * kk, 0, -a * a]);
      fausses = [poly([kk, 0, -a * a]), poly([kk * kk, 0, a * a]), poly([kk * kk, -2 * kk * a, -a * a]), poly([kk * kk, -2 * kk * a, a * a])];
      regle = `$(a + b)(a - b) = a^2 - b^2$, avec ici $a = ${X(kk)}$ et $b = ${a}$.`;
    } else if (t === 2) {
      const v = pick([[`-(${X(k)} - ${a})`, [-k, a]], [`-(${X(k)} + ${a})`, [-k, -a]], [`-(${a} - ${X(k)})`, [k, -a]], [`-(-${X(k)} + ${a})`, [k, -a]], [`${a} - (${X(k)} - ${a + k})`, [-k, 2 * a + k]]]);
      verbe = "Supprime les parenthèses et réduis :"; expr = v[0]; bonne = poly(v[1]);
      fausses = [poly([v[1][0], -v[1][1]]), poly([-v[1][0], v[1][1]]), poly([-v[1][0], -v[1][1]])];
      regle = "Un signe $-$ devant une parenthèse change le signe de **chaque** terme : $-(a + b) = -a - b$ et $-(a - b) = b - a$.";
    } else if (t === 3) {
      const kk = pick([1, k]); verbe = "Factorise"; expr = poly([kk * kk, 0, -a * a]); bonne = `(${X(kk)} - ${a})(${X(kk)} + ${a})`;
      fausses = [`(${X(kk)} - ${a})^2`, `(${X(kk)} + ${a})^2`, kk > 1 ? `(${X(kk * kk)} - ${a})(${X(kk * kk)} + ${a})` : `(x - ${2 * a})(x + ${2 * a})`, a > 1 ? `(${X(kk)} - ${a * a})(${X(kk)} + ${a * a})` : `(${X(kk)} - ${a})(${X(kk)} + ${a + 1})`];
      regle = `$a^2 - b^2 = (a - b)(a + b)$, avec $a^2 = ${poly([kk * kk, 0, 0])}$ et $b^2 = ${a * a}$.`;
    } else if (t === 4) {
      let g, p, q; do { g = rand(2, 6); p = rand(1, 4); q = randNZ(-7, 7); } while (pgcd(p, Math.abs(q)) !== 1);
      verbe = "Factorise"; expr = poly([g * p, g * q, 0]); bonne = `${g}x(${poly([p, q])})`;
      fausses = [`${g}x(${poly([p, g * q])})`, `${g}(${poly([p, 0, q])})`, `x(${g * p}x ${q > 0 ? "+" : "-"} ${Math.abs(g * q)}x)`, p > 1 ? `${g * p}x(${poly([1, q])})` : `${g}x(${poly([1, -q])})`];
      regle = `Le facteur commun aux deux termes est $${g}x$ : $${poly([g * p, 0, 0])} = ${g}x \\times ${X(p)}$ et $${poly([g * q, 0])} = ${g}x \\times ${par(q)}$.`;
    } else if (t === 5) {
      let g, p, q; do { g = rand(2, 7); p = rand(1, 5); q = rand(1, 9); } while (pgcd(p, q) !== 1 || p === q);
      verbe = "Factorise"; expr = poly([g * p, s * g * q]); bonne = `${g}(${poly([p, s * q])})`;
      fausses = [`${g}(${poly([p, s * g * q])})`, `${g * p}(${poly([1, s * q])})`, `${g}x(${p} ${S} ${q})`, `${g}(${p}x ${S} ${q}x)`];
      regle = `Cherche le plus grand facteur commun aux deux termes : ici $${g}$, car $${g * p} = ${g} \\times ${p}$ et $${g * q} = ${g} \\times ${q}$.`;
    } else {
      const kk = pick([1, 1, 2, 3]); verbe = "Factorise"; expr = poly([kk * kk, 2 * s * kk * a, a * a]); bonne = `(${X(kk)} ${S} ${a})^2`;
      fausses = [`(${X(kk)} ${s > 0 ? "-" : "+"} ${a})^2`, `(${X(kk)} - ${a})(${X(kk)} + ${a})`, `(${X(kk)} ${S} ${2 * a})^2`, `(${X(kk * kk)} ${S} ${a * a})^2`];
      regle = `On reconnaît $${s > 0 ? "a^2 + 2ab + b^2 = (a + b)^2" : "a^2 - 2ab + b^2 = (a - b)^2"}$, avec $a = ${X(kk)}$ et $b = ${a}$.`;
    }
    const m = melangeChoix(bonne, fausses);
    return {
      enonce: `${verbe} $${expr}$.`, mode: "choix", choix: m.choix.map((c) => `$${c}$`), attendu: m.attendu,
      aides: [regle, verbe === "Factorise" ? "Vérifie en développant de tête la réponse que tu choisis : tu dois retrouver l'expression de départ." : "Développe terme à terme, puis réduis.", "Méfie-toi des réponses qui oublient un terme, un carré ou un signe."],
      solution: `$${expr} = ${bonne}$\n\n${regle}`
    };
  };

  /* Équations : ax + b = cx + d et x² = a */
  GEN["auto-equations"] = function (i) {
    if (i === 4 || Math.random() < 0.25) {
      const u = rand(0, 9), c = pick([1, 1, 1, 2, 3, 5]);
      let k, kt, sol, fr0 = false, eq0 = "";
      if (u === 0) { const m = rand(2, 9); k = 0; kt = "0"; sol = [0]; eq0 = pick(["x^2 = 0", `${pick([2, 3, 5])}x^2 = 0`, `x^2 + ${m} = ${m}`, `${m} - x^2 = ${m}`]); }
      else if (u <= 2) { k = -rand(1, 25); kt = `${k}`; sol = []; }
      else if (u <= 7) { const r = rand(1, 12); k = r * r; kt = `${k}`; sol = [-r, r]; }
      else { const [p, q] = pick([[1, 2], [3, 2], [1, 3], [2, 3], [1, 4], [3, 4], [5, 2], [2, 5], [4, 3], [5, 4], [7, 2], [5, 3]]); k = (p * p) / (q * q); kt = `\\dfrac{${p * p}}{${q * q}}`; sol = [-p / q, p / q]; fr0 = true; }
      const ent = Number.isInteger(k), cc = ent && c > 1 && k !== 0 ? c : 1, eq = eq0 || (cc > 1 ? `${cc}x^2 = ${cc * k}` : `x^2 = ${kt}`), r = sol.length ? Math.abs(sol[1] || 0) : 0, autre0 = eq0 && eq0 !== "x^2 = 0";
      const rt = fr0 ? frac(Math.round(r * 60), 60) : `${r}`;
      return {
        enonce: `Résous l'équation $${eq}$.${fr0 ? " Donne les valeurs exactes (fractions)." : ""}`,
        mode: "ensemble", prefixe: "Solution(s) :", attendu: sol,
        aides: [autre0 ? "Ramène-toi d'abord à une équation de la forme $x^2 = a$." : cc > 1 ? `Divise d'abord par $${cc}$ : $x^2 = ${k}$.` : "Si $a > 0$, l'équation $x^2 = a$ a deux solutions : $\\sqrt{a}$ et $-\\sqrt{a}$. Si $a = 0$, une seule : $0$.",
          k < 0 ? "Un carré peut-il être négatif ?" : k === 0 ? "Quel nombre a pour carré $0$ ?" : `$\\sqrt{${kt}} = ${rt}$.`,
          k < 0 ? "S'il n'y a pas de solution, écris « aucun »." : "N'oublie pas la solution négative. Sépare les valeurs par « ; »."],
        solution: k < 0 ? `Un carré est toujours positif ou nul : l'équation $x^2 = ${k}$ n'a **aucune solution**.` : k === 0 ? `$${autre0 ? `${eq} \\iff ` : ""}x^2 = 0 \\iff x = 0$ : une seule solution. $S = \\{0\\}$` : `$${eq}${cc > 1 ? ` \\iff x^2 = ${k}` : ""} \\iff x = ${rt}$ ou $x = -${rt}$.\n\n$S = \\{-${rt}\\,;${rt}\\}$`
      };
    }
    let a, c; do { a = randNZ(-6, 7); c = randNZ(-6, 7); } while (a === c);
    const x0 = rand(-6, 8), b = rand(-9, 9), d = a * x0 + b - c * x0, dc = a - c, db = d - b;
    const xs = `${poly([a, 0])} ${c > 0 ? "-" : "+"} ${poly([Math.abs(c), 0])}`, ns = b === 0 ? `${d}` : `${d} ${b > 0 ? "-" : "+"} ${Math.abs(b)}`;
    return {
      enonce: `Résous l'équation $${poly([a, b])} = ${poly([c, d])}$.`,
      mode: "nombre", prefixe: "x =", attendu: x0,
      erreurs: amErr([b ? [(d + b) / dc, `Pour faire passer $${b}$ dans l'autre membre, on ${b > 0 ? "le soustrait" : "ajoute son opposé"} des deux côtés : on obtient $${poly([dc, 0])} = ${db}$.`] : null, [(d - b) / (a + c), `Pour regrouper les $x$, on ${c > 0 ? "soustrait" : "ajoute"} $${poly([Math.abs(c), 0])}$ des deux côtés : le coefficient de $x$ devient $${dc}$.`], db ? [dc / db, "On divise le nombre par le coefficient de $x$, pas l'inverse."] : null].filter(Boolean)),
      aides: ["Regroupe les termes en $x$ dans un membre et les nombres dans l'autre.", `$${xs} = ${ns}$, soit $${poly([dc, 0])} = ${db}$.`, dc === 1 ? "Le coefficient de $x$ vaut $1$ : tu as fini." : `Divise les deux membres par $${dc}$.`],
      solution: `$${poly([a, b])} = ${poly([c, d])} \\iff ${poly([dc, 0])} = ${db}${dc === 1 ? "" : ` \\iff x = ${x0}`}$`
    };
  };

  GEN["auto-pourcentages"] = (i) => GEN[pick(["am-coefficient", "appliquer-evolution", "am-partie-tout", "am-proportion", "proportion-de-proportion", "evolutions-successives"])](i);
  GEN["auto-fonctions"] = (i) => GEN[pick(["am-appartenance", "image-calcul", "lecture-image", "lecture-antecedents"])](i);

  /* Aires et volumes, avec la figure */
  GEN["auto-grandeurs"] = function () {
    const u = pick(["cm", "cm", "cm", "m", "dm"]), t = rand(0, 9), P = "$\\pi$";
    let q, rep, suf, regle, calc, fig, err = [], pi = false, quoi = "Aire :";
    const cu = (x) => `${amT(x)} ${u}`;
    if (t === 0) {
      const ctx = Math.random() < 0.3, L = ctx ? pick([20, 25, 30, 40, 50]) : rand(3, 15), l = ctx ? pick([10, 12, 15, 20]) : rand(2, L - 1), uu = ctx ? "m" : u;
      q = ctx ? `l'aire d'un champ de manioc rectangulaire de $${L}$ m sur $${l}$ m, à Tsingoni` : `l'aire d'un rectangle de longueur $${L}$ ${u} et de largeur $${l}$ ${u}`; rep = L * l; suf = `${uu}²`; calc = `${L} \\times ${l}`;
      regle = "Aire d'un rectangle : $\\mathcal{A} = L \\times \\ell$."; fig = amForme("rect", [L, l], [`${L} ${uu}`, `${l} ${uu}`], `Rectangle de ${L} ${uu} sur ${l} ${uu}`);
      err = [[2 * (L + l), "Ça, c'est le périmètre (le tour). L'aire se calcule avec $L \\times \\ell$."], [L + l, "On multiplie la longueur par la largeur, on ne les additionne pas."]];
    } else if (t === 1) {
      let b, h; do { b = rand(2, 14); h = rand(2, 12); } while ((b * h) % 2);
      q = `l'aire d'un triangle de base $${b}$ ${u} et de hauteur $${h}$ ${u}`; rep = (b * h) / 2; suf = `${u}²`; calc = `\\dfrac{${b} \\times ${h}}{2}`;
      regle = "Aire d'un triangle : $\\mathcal{A} = \\dfrac{\\text{base} \\times \\text{hauteur}}{2}$."; fig = amForme("tri", [b, h, pick([0.3, 0.45, 0.6])], [cu(b), cu(h)], `Triangle de base ${b} ${u} et de hauteur ${h} ${u}`);
      err = [[b * h, "N'oublie pas de diviser par $2$ : un triangle est la moitié d'un rectangle."], [b + h, "On multiplie la base par la hauteur, puis on divise par $2$."]];
    } else if (t === 2) {
      const r = rand(2, 9), diam = Math.random() < 0.4; pi = true;
      q = `l'aire d'un disque de ${diam ? "diamètre" : "rayon"} $${diam ? 2 * r : r}$ ${u}`; rep = r * r; suf = `${P} ${u}²`; calc = `\\pi \\times ${r}^2`;
      regle = `Aire d'un disque : $\\mathcal{A} = \\pi r^2$${diam ? `, avec le rayon $r = ${2 * r} \\div 2 = ${r}$` : ""}.`; fig = amForme("cercle", [r, diam], [diam ? `d = ${cu(2 * r)}` : `r = ${cu(r)}`], `Disque de ${diam ? "diamètre" : "rayon"} ${diam ? 2 * r : r} ${u}`);
      err = [[2 * r, "Ça, c'est la longueur du cercle ($2\\pi r$). L'aire du disque est $\\pi r^2$."], diam ? [4 * r * r, "Le rayon est la moitié du diamètre : $r = " + r + "$."] : [2 * r * r, "L'aire du disque est $\\pi r^2$ : on ne multiplie pas par $2$."]];
    } else if (t === 3) {
      const ctx = Math.random() < 0.3, L = rand(2, 9), l = rand(2, 6), h = rand(2, 6), uu = ctx ? "dm" : u; quoi = "Volume :";
      q = ctx ? `le volume d'une caisse de vanille en forme de pavé droit de $${L}$ dm sur $${l}$ dm sur $${h}$ dm` : `le volume d'un pavé droit de longueur $${L}$ ${u}, de largeur $${l}$ ${u} et de hauteur $${h}$ ${u}`;
      rep = L * l * h; suf = `${uu}³`; calc = `${L} \\times ${l} \\times ${h}`; regle = "Volume d'un pavé droit : $V = L \\times \\ell \\times h$.";
      fig = amForme("pave", [L, l, h], [`${L} ${uu}`, `${l} ${uu}`, `${h} ${uu}`], `Pavé droit de ${L} ${uu} sur ${l} ${uu} sur ${h} ${uu}`);
      err = [[L + l + h, "On multiplie les trois dimensions, on ne les additionne pas."], [L * l, "Il manque la hauteur : $V = L \\times \\ell \\times h$."], [2 * (L * l + l * h + L * h), "Ça, c'est l'aire totale des six faces, pas le volume."]];
    } else if (t === 4) {
      const c = rand(2, 7); quoi = "Volume :";
      q = `le volume d'un cube d'arête $${c}$ ${u}`; rep = c ** 3; suf = `${u}³`; calc = `${c} \\times ${c} \\times ${c}`; regle = "Volume d'un cube d'arête $c$ : $V = c^3 = c \\times c \\times c$.";
      fig = amForme("cube", [c], [cu(c)], `Cube d'arête ${c} ${u}`);
      err = [[3 * c, "$c^3 = c \\times c \\times c$, et non $3 \\times c$."], [c * c, "Ça, c'est l'aire d'une face. Le volume est $c \\times c \\times c$."], [6 * c * c, "Ça, c'est l'aire des six faces, pas le volume."]];
    } else if (t === 5) {
      let b, h; do { b = rand(4, 10); h = rand(2, 6); } while ((b * h) % 2 || b < h + 1); const L = rand(3, 10); quoi = "Volume :";
      q = `le volume d'un prisme droit de hauteur $${L}$ ${u} dont la base est un triangle de côté $${b}$ ${u} et de hauteur $${h}$ ${u}`; rep = ((b * h) / 2) * L; suf = `${u}³`;
      calc = `\\dfrac{${b} \\times ${h}}{2} \\times ${L} = ${(b * h) / 2} \\times ${L}`; regle = "Volume d'un prisme droit : $V = \\mathcal{B} \\times h$, où $\\mathcal{B}$ est l'aire de la base (ici un triangle).";
      fig = amForme("prisme", [b, h, L], [cu(b), cu(h), cu(L)], `Prisme droit à base triangulaire (côté ${b} ${u}, hauteur ${h} ${u}), de hauteur ${L} ${u}`);
      err = [[b * h * L, "L'aire de la base triangulaire est $\\dfrac{\\text{base} \\times \\text{hauteur}}{2}$ : n'oublie pas de diviser par $2$."], [(b * h) / 2, "Ça, c'est l'aire de la base. Il faut encore multiplier par la hauteur du prisme."]];
    } else if (t === 6) {
      const ctx = Math.random() < 0.3, r = ctx ? pick([1, 2]) : rand(1, 6), h = ctx ? pick([2, 3]) : rand(2, 10), uu = ctx ? "m" : u; pi = true; quoi = "Volume :";
      q = ctx ? `le volume d'une citerne d'eau de pluie cylindrique, à Sada, de rayon $${r}$ m et de hauteur $${h}$ m` : `le volume d'un cylindre de rayon $${r}$ ${u} et de hauteur $${h}$ ${u}`; rep = r * r * h; suf = `${P} ${uu}³`; calc = `\\pi \\times ${r}^2 \\times ${h}`;
      regle = "Volume d'un cylindre : $V = \\pi r^2 h$ (aire du disque de base fois la hauteur)."; fig = amForme("cyl", [r, h], [`r = ${r} ${uu}`, `${h} ${uu}`], `Cylindre de rayon ${r} ${uu} et de hauteur ${h} ${uu}`);
      err = [[2 * r * h, "On utilise l'aire du disque de base, $\\pi r^2$, et non $2\\pi r$."], [r * h, "N'oublie pas le carré : $V = \\pi r^2 h$."]];
    } else if (t === 7) {
      let c, h; do { c = rand(2, 9); h = rand(2, 12); } while ((c * c * h) % 3); quoi = "Volume :";
      q = `le volume d'une pyramide de hauteur $${h}$ ${u} dont la base est un carré de côté $${c}$ ${u}`; rep = (c * c * h) / 3; suf = `${u}³`; calc = `\\dfrac{1}{3} \\times ${c}^2 \\times ${h} = \\dfrac{${c * c} \\times ${h}}{3}`;
      regle = "Volume d'une pyramide : $V = \\dfrac{1}{3} \\times \\mathcal{B} \\times h$, où $\\mathcal{B}$ est l'aire de la base."; fig = amForme("pyr", [c, h], [cu(c), cu(h)], `Pyramide à base carrée de côté ${c} ${u} et de hauteur ${h} ${u}`);
      err = [[c * c * h, "N'oublie pas le $\\dfrac{1}{3}$ : une pyramide remplit le tiers du prisme de même base et de même hauteur."], [(c * h) / 3, "L'aire de la base est $c^2$, pas $c$."]];
    } else if (t === 8) {
      let r, h; do { r = rand(1, 6); h = rand(2, 12); } while ((r * r * h) % 3); pi = true; quoi = "Volume :";
      q = `le volume d'un cône de révolution de rayon $${r}$ ${u} et de hauteur $${h}$ ${u}`; rep = (r * r * h) / 3; suf = `${P} ${u}³`; calc = `\\dfrac{1}{3} \\times \\pi \\times ${r}^2 \\times ${h}`;
      regle = "Volume d'un cône : $V = \\dfrac{1}{3} \\pi r^2 h$."; fig = amForme("cone", [r, h], [`r = ${cu(r)}`, cu(h)], `Cône de rayon ${r} ${u} et de hauteur ${h} ${u}`);
      err = [[r * r * h, "N'oublie pas le $\\dfrac{1}{3}$ : le cône remplit le tiers du cylindre de même base et de même hauteur."]];
    } else {
      const ctx = Math.random() < 0.35, r = pick([3, 6, 9, 1.5, 0.3, 0.6, 30]); pi = true; quoi = "Volume :";
      q = ctx && r === 6 ? "le volume d'une noix de coco assimilée à une boule de rayon $6$ cm" : `le volume d'une boule de rayon $${nb(r)}$ ${ctx ? "cm" : u}`; rep = (4 * r ** 3) / 3; suf = `${P} ${ctx ? "cm" : u}³`; calc = `\\dfrac{4}{3} \\times \\pi \\times ${nb(r)}^3 = \\dfrac{4 \\times ${nb(r ** 3)}}{3} \\pi`;
      regle = "Volume d'une boule : $V = \\dfrac{4}{3} \\pi r^3$."; fig = amForme("boule", [r], [`r = ${amT(r)} ${ctx ? "cm" : u}`], `Boule de rayon ${amT(r)} ${ctx ? "cm" : u}`);
      err = [[4 * r * r, "Ça, c'est l'aire de la sphère ($4\\pi r^2$). Le volume de la boule est $\\dfrac{4}{3}\\pi r^3$."], [4 * r ** 3, "N'oublie pas de diviser par $3$ : $V = \\dfrac{4}{3}\\pi r^3$."]];
    }
    return {
      enonce: `Calcule ${q}.${pi ? " Donne la valeur exacte : écris le nombre qui multiplie $\\pi$." : ""}`,
      figure: fig, mode: "nombre", prefixe: quoi, suffixe: suf, attendu: +rep.toFixed(6), erreurs: amErr(err),
      aides: [regle, "Toutes les longueurs doivent être dans la même unité.", `Calcule $${calc}$.`],
      solution: `${regle}\n\nIci : $${calc} = ${nb(rep)}${pi ? "\\pi" : ""}$ ${suf.replace(P + " ", "")}.`
    };
  };

  /* Pythagore : calculer une longueur, reconnaître un triangle rectangle */
  GEN["auto-pythagore"] = function () {
    // triplets dont les carrés se calculent de tête (pas de calculatrice à l'épreuve anticipée)
    const entiers = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20], [15, 20, 25], [30, 40, 50], [10, 24, 26]];
    const mode = pick(["hyp", "hyp", "cote", "cote", "reci", "reci", "exact", "contexte"]);
    const c2 = (x) => nb(+(x * x).toFixed(6)); // carré écrit à la française
    const sansDoublon = (errs, att) => errs.filter((e) => Math.abs(e.valeur - att) > 1e-9);
    // Triangle rectangle : nom, sommet de l'angle droit, côtés de l'angle droit L1, L2 et hypoténuse H
    const tri = () => {
      const N = pick(["ABC", "DEF", "MNP", "RST", "IJK", "EFG", "KLM", "UVW"]), i = rand(0, 2), R = N[i];
      const [O1, O2] = N.split("").filter((_, k) => k !== i);
      const seg = (a, b) => (N.indexOf(a) < N.indexOf(b) ? a + b : b + a);
      return { N, R, O1, O2, L1: seg(R, O1), L2: seg(R, O2), H: seg(O1, O2) };
    };
    const figT = (T, u, v, c, aria) => amTriangle([T.R, T.O1, T.O2], u, v, c, 0, rand(0, 3), aria);
    if (mode === "reci") {
      const [p, q, r] = pick(entiers), ok = Math.random() < 0.5;
      let s = ok ? [p, q, r] : pick([[p, q, r + 1], [p, q, r - 1], [p + 1, q, r], [p, q + 1, r]]);
      if (s[2] <= Math.max(s[0], s[1])) s = [p, q, r + 1];
      const N = pick(["ABC", "DEF", "MNP", "RST", "IJK", "KLM"]), L = Math.max(...s), [o1, o2] = s.filter((x, k) => k !== s.indexOf(L)), vrai = L * L === o1 * o1 + o2 * o2;
      const aff = shuffle(s), cotes = [N[1] + N[2], N[0] + N[2], N[0] + N[1]], opp = N[aff.indexOf(L)]; // le côté aff[k] est opposé au sommet N[k]
      const choix = [`Oui, il est rectangle en $${N[0]}$`, `Oui, il est rectangle en $${N[1]}$`, `Oui, il est rectangle en $${N[2]}$`, "Non, il n'est pas rectangle"];
      return {
        enonce: `Le triangle $${N}$ a pour côtés $${cotes[0]} = ${aff[0]}$, $${cotes[1]} = ${aff[1]}$ et $${cotes[2]} = ${aff[2]}$. Est-il rectangle ?`,
        figure: amForme("tri3", [aff[0], aff[1], aff[2], [N[0], N[1], N[2]]], [amT(aff[0]), amT(aff[1]), amT(aff[2])], `Triangle ${N} de côtés ${aff.join(", ")}`),
        mode: "choix", choix, attendu: vrai ? N.indexOf(opp) : 3,
        aides: ["Compare le carré du plus grand côté à la somme des carrés des deux autres.", `$${L}^2 = ${L * L}$ et $${o1}^2 + ${o2}^2 = ${o1 * o1 + o2 * o2}$.`, "S'il y a égalité, le triangle est rectangle, et l'angle droit est en face du plus grand côté."],
        solution: `Le plus grand côté est $[${cotes[aff.indexOf(L)]}]$ : $${L}^2 = ${L * L}$ et $${o1}^2 + ${o2}^2 = ${o1 * o1 + o2 * o2}$. ` + (vrai ? `Égalité : d'après la réciproque du théorème de Pythagore, le triangle est **rectangle en $${opp}$**, le sommet opposé au plus grand côté.` : "Pas d'égalité : le triangle **n'est pas rectangle**.")
      };
    }
    if (mode === "exact") {
      const T = tri(), hyp = Math.random() < 0.6;
      let a, b, n;
      if (hyp) { do { a = rand(1, 9); b = rand(1, 9); n = a * a + b * b; } while (Number.isInteger(Math.sqrt(n))); }
      else { do { b = rand(3, 11); a = rand(1, b - 1); n = b * b - a * a; } while (Number.isInteger(Math.sqrt(n))); }
      const cherche = hyp ? T.H : T.L2, v2 = hyp ? b : Math.sqrt(n);
      return {
        enonce: hyp ? `$${T.N}$ est rectangle en $${T.R}$ avec $${T.L1} = ${a}$ et $${T.L2} = ${b}$. La valeur exacte de $${T.H}$ s'écrit $\\sqrt{n}$. Que vaut $n$ ?` : `$${T.N}$ est rectangle en $${T.R}$ avec $${T.H} = ${b}$ et $${T.L1} = ${a}$. La valeur exacte de $${T.L2}$ s'écrit $\\sqrt{n}$. Que vaut $n$ ?`,
        figure: figT(T, a, v2, [amT(a), hyp ? amT(b) : "?", hyp ? "?" : amT(b)], `Triangle ${T.N} rectangle en ${T.R}`),
        mode: "nombre", prefixe: "n =", attendu: n,
        erreurs: sansDoublon(hyp ? [{ valeur: a + b, message: "On additionne les **carrés** des longueurs, pas les longueurs." }, { valeur: b * b - a * a, message: `$[${T.H}]$ est l'hypoténuse : on **additionne** les carrés des deux autres côtés.` }] : [{ valeur: a * a + b * b, message: `$[${T.H}]$ est l'hypoténuse, le plus grand côté : il faut **soustraire** les carrés.` }, { valeur: b - a, message: "On soustrait les **carrés** des longueurs, pas les longueurs." }], n),
        aides: [`$[${T.H}]$ est l'hypoténuse : $${T.H}^2 = ${T.L1}^2 + ${T.L2}^2$.`, hyp ? `$${T.H}^2 = ${a}^2 + ${b}^2 = ${a * a} + ${b * b}$.` : `$${T.L2}^2 = ${T.H}^2 - ${T.L1}^2 = ${b * b} - ${a * a}$.`, `Si $${cherche}^2 = n$, alors $${cherche} = \\sqrt{n}$ : c'est la valeur exacte, on ne l'arrondit pas.`],
        solution: `$${cherche}^2 = ${hyp ? `${a}^2 + ${b}^2` : `${b}^2 - ${a}^2`} = ${n}$, donc $${cherche} = \\sqrt{${n}}$ (environ $${nb(+Math.sqrt(n).toFixed(2))}$) : $n = ${n}$.`
      };
    }
    if (mode === "contexte") {
      const k = pick(["echelle", "terrain", "kayak"]);
      if (k === "echelle") {
        const [d, h, L] = pick([[1.5, 2, 2.5], [0.5, 1.2, 1.3], [1, 2.4, 2.6], [1.6, 3, 3.4], [0.9, 1.2, 1.5], [1.2, 1.6, 2], [2.1, 2.8, 3.5], [3, 4, 5], [0.7, 2.4, 2.5]]);
        return {
          enonce: `Pour cueillir des fleurs d'ylang-ylang, Ibrahim appuie une échelle de $${nb(L)}$ m contre un mur vertical. Le pied de l'échelle est posé sur le sol horizontal, à $${nb(d)}$ m du mur. À quelle hauteur le haut de l'échelle touche-t-il le mur ?`,
          figure: amTriangle(["", "", ""], d, h, [`${amT(d)} m`, "?", `${amT(L)} m`], 0, 0, "Échelle appuyée contre un mur : triangle rectangle au pied du mur"),
          mode: "nombre", prefixe: "Hauteur :", suffixe: "m", attendu: h,
          erreurs: sansDoublon([{ valeur: +(L - d).toFixed(6), message: "On ne soustrait pas les longueurs : on soustrait leurs **carrés**." }, { valeur: +(h * h).toFixed(6), message: "Ça, c'est le carré de la hauteur : il reste à prendre la racine carrée." }], h),
          aides: ["Le mur et le sol forment un angle droit : l'échelle est l'**hypoténuse** du triangle rectangle.", `$h^2 = ${nb(L)}^2 - ${nb(d)}^2 = ${c2(L)} - ${c2(d)} = ${c2(h)}$.`, `$h = \\sqrt{${c2(h)}}$.`],
          solution: `Le triangle formé par le mur, le sol et l'échelle est rectangle, d'hypoténuse l'échelle. $h^2 = ${nb(L)}^2 - ${nb(d)}^2 = ${c2(h)}$, donc $h = ${nb(h)}$ m.`
        };
      }
      const [a, b, r] = k === "terrain" ? pick([[30, 40, 50], [60, 80, 100], [45, 60, 75], [24, 32, 40], [50, 120, 130], [36, 48, 60], [90, 120, 150]]) : pick([[3, 4, 5], [6, 8, 10], [1.2, 1.6, 2], [0.9, 1.2, 1.5], [5, 12, 13], [1.5, 2, 2.5]]);
      const u = k === "terrain" ? "m" : "km";
      return {
        enonce: k === "terrain" ? `Un terrain de football de Mamoudzou est un rectangle de $${nb(b)}$ m sur $${nb(a)}$ m. Quelle est la longueur de sa diagonale ?` : `Un kayak part de la plage de N'Gouja. Il parcourt $${nb(a)}$ km vers le nord, puis $${nb(b)}$ km vers l'est. À quelle distance de son point de départ se trouve-t-il, à vol d'oiseau ?`,
        figure: k === "terrain" ? amForme("rectdiag", [b, a], [`${amT(b)} m`, `${amT(a)} m`, "?"], `Terrain rectangulaire de ${amT(b)} m sur ${amT(a)} m et sa diagonale`) : amTriangle(["", "", ""], b, a, [`${amT(b)} km`, `${amT(a)} km`, "?"], 0, 2, "Trajet du kayak : vers le nord puis vers l'est, la distance au départ est l'hypoténuse"),
        mode: "nombre", prefixe: k === "terrain" ? "Diagonale :" : "Distance :", suffixe: u, attendu: r,
        erreurs: sansDoublon([{ valeur: +(a + b).toFixed(6), message: "On n'additionne pas les longueurs : on additionne leurs **carrés**." }, { valeur: +(r * r).toFixed(6), message: "Ça, c'est le carré de la distance : il reste à prendre la racine carrée." }], r),
        aides: [k === "terrain" ? "Les côtés d'un rectangle sont perpendiculaires : la diagonale est l'**hypoténuse** d'un triangle rectangle." : "Le nord et l'est sont perpendiculaires : la distance cherchée est l'**hypoténuse** d'un triangle rectangle.", `$d^2 = ${nb(a)}^2 + ${nb(b)}^2 = ${c2(a)} + ${c2(b)} = ${c2(r)}$.`, `$d = \\sqrt{${c2(r)}}$.`],
        solution: `D'après le théorème de Pythagore, $d^2 = ${nb(a)}^2 + ${nb(b)}^2 = ${c2(r)}$, donc $d = \\sqrt{${c2(r)}} = ${nb(r)}$ ${u}.`
      };
    }
    // Calcul d'un côté avec les longueurs entières ou décimales d'un triangle « pythagoricien »
    const [p, q, r] = pick(entiers.concat([[1.5, 2, 2.5], [0.6, 0.8, 1], [0.5, 1.2, 1.3], [0.3, 0.4, 0.5], [1.2, 1.6, 2]]));
    const T = tri(), [a, b] = Math.random() < 0.5 ? [p, q] : [q, p];
    if (mode === "hyp") {
      return {
        enonce: `$${T.N}$ est rectangle en $${T.R}$ avec $${T.L1} = ${nb(a)}$ et $${T.L2} = ${nb(b)}$. Calcule $${T.H}$.`,
        figure: figT(T, a, b, [amT(a), amT(b), "?"], `Triangle ${T.N} rectangle en ${T.R}, ${T.L1} = ${amT(a)} et ${T.L2} = ${amT(b)}`),
        mode: "nombre", prefixe: `${T.H} =`, attendu: r,
        erreurs: sansDoublon([{ valeur: +(a + b).toFixed(6), message: "On n'additionne pas les longueurs : on additionne leurs **carrés**." }, { valeur: +(r * r).toFixed(6), message: `Ça, c'est $${T.H}^2$ : il reste à prendre la racine carrée.` }], r),
        aides: [`$[${T.H}]$ est l'hypoténuse : $${T.H}^2 = ${T.L1}^2 + ${T.L2}^2$.`, `$${T.H}^2 = ${c2(a)} + ${c2(b)} = ${c2(r)}$.`, `$${T.H} = \\sqrt{${c2(r)}}$.`],
        solution: `$${T.H}^2 = ${nb(a)}^2 + ${nb(b)}^2 = ${c2(r)}$, donc $${T.H} = \\sqrt{${c2(r)}} = ${nb(r)}$.`
      };
    }
    return {
      enonce: `$${T.N}$ est rectangle en $${T.R}$ avec $${T.H} = ${nb(r)}$ et $${T.L1} = ${nb(a)}$. Calcule $${T.L2}$.`,
      figure: figT(T, a, b, [amT(a), "?", amT(r)], `Triangle ${T.N} rectangle en ${T.R}, ${T.H} = ${amT(r)} et ${T.L1} = ${amT(a)}`),
      mode: "nombre", prefixe: `${T.L2} =`, attendu: b,
      erreurs: sansDoublon([{ valeur: +(r - a).toFixed(6), message: "On ne soustrait pas les longueurs : on soustrait leurs **carrés**." }, { valeur: +(b * b).toFixed(6), message: `Ça, c'est $${T.L2}^2$ : il reste à prendre la racine carrée.` }, { valeur: +(r * r + a * a).toFixed(6), message: `$[${T.H}]$ est l'hypoténuse : pour trouver un côté de l'angle droit, on **soustrait** les carrés.` }], b),
      aides: [`$[${T.H}]$ est l'hypoténuse : $${T.H}^2 = ${T.L1}^2 + ${T.L2}^2$.`, `$${T.L2}^2 = ${T.H}^2 - ${T.L1}^2 = ${c2(r)} - ${c2(a)} = ${c2(b)}$.`, `$${T.L2} = \\sqrt{${c2(b)}}$.`],
      solution: `$${T.L2}^2 = ${nb(r)}^2 - ${nb(a)}^2 = ${c2(b)}$, donc $${T.L2} = ${nb(b)}$.`
    };
  };

  /* Statistiques : moyenne, médiane, étendue (données brutes ou diagramme en bâtons) */
  GEN["auto-statistiques"] = function () {
    const p = pick(["Zaïnaba", "Anli", "Moussa", "Awa", "Ibrahim", "Mariama", "Saïd", "Djamila", "Hamada", "Faïza", "Kamal", "Nasra"]);
    if (Math.random() < 0.3) {
      // médiane ou moyenne lue sur un diagramme en bâtons
      const [titre, xl, x0] = pick([["Nombre de frères et sœurs des élèves d'une classe", "frères et sœurs", 0], ["Nombre de poissons pêchés par les pirogues de M'tsamboro ce matin", "poissons", 2], ["Nombre de buts marqués par match par le club de foot de Koungou", "buts", 0], ["Nombre de jours de pluie par semaine à Mamoudzou", "jours", 1]]);
      let eff, N; do { eff = Array.from({ length: 5 }, () => rand(1, 8)); N = eff.reduce((a, b) => a + b, 0); } while (N % 2 === 0 || eff.filter((e) => e === Math.max(...eff)).length > 1);
      const xs = eff.map((_, k) => x0 + k), cum = []; eff.reduce((s, e, k) => (cum[k] = s + e), 0);
      const rg = (N + 1) / 2, med = xs[cum.findIndex((c) => c >= rg)], mode = xs[eff.indexOf(Math.max(...eff))];
      const fig = graph({ xmin: x0 - 0.8, xmax: amXmax(x0 + 4, x0 - 0.8, xl), ymin: -0.8, ymax: 9.6, h: 230, xlabel: xl, ylabel: "effectif", bars: eff.map((e, k) => ({ x: xs[k], y: e })), aria: `${titre} : diagramme en bâtons, valeurs de ${x0} à ${x0 + 4}` });
      return {
        enonce: `${titre} : voici le diagramme en bâtons de la série. Détermine la médiane de la série.`, figure: fig,
        mode: "nombre", prefixe: "Médiane :", attendu: med,
        erreurs: amErr([[mode, "Ça, c'est la valeur la plus fréquente (le bâton le plus haut). La médiane partage la série rangée en deux moitiés."], [rg, `Ça, c'est le **rang** de la médiane. Il faut lire la valeur qui se trouve à ce rang.`], [x0 + 2, "La médiane n'est pas forcément la valeur du milieu de l'axe : elle dépend des effectifs."]]),
        aides: [`Effectif total : $${eff.join(" + ")} = ${N}$.`, `$N = ${N}$ est impair : la médiane est la valeur de rang $\\dfrac{${N} + 1}{2} = ${rg}$.`, `Effectifs cumulés : $${cum.join(" ; ")}$. Cherche la première valeur dont l'effectif cumulé atteint $${rg}$.`],
        solution: `Effectifs lus : $${eff.join(" ; ")}$, soit $N = ${N}$. Effectifs cumulés : $${cum.join(" ; ")}$. La valeur de rang $${rg}$ est $${med}$ : la médiane vaut $${med}$.`
      };
    }
    const C = pick([[`les notes sur $20$ ${deN(p)}`, 4, 20], [`le nombre de poissons pêchés par ${p} chaque jour`, 0, 14], ["les températures maximales (en °C) relevées à Pamandzi", 26, 33], ["le nombre de passagers des taxis-brousse au départ de Chirongui", 2, 12], [`les temps de trajet (en min) des amis ${deN(p)}`, 5, 40], ["les masses (en kg) de régimes de bananes", 8, 30]]);
    const n = rand(5, 8);
    let s = Array.from({ length: n }, () => rand(C[1], C[2]));
    const quoi = pick(["moyenne", "moyenne", "mediane", "mediane", "etendue"]);
    if (quoi === "moyenne") { const r = s.reduce((a, b) => a + b, 0) % n; if (r) { const k = s.findIndex((v) => v - r >= C[1]); if (k >= 0) s[k] -= r; else s[0] += n - r; } }
    const tri = s.slice().sort((x, y) => x - y), somme = s.reduce((x, y) => x + y, 0), serie = s.join(" ; ");
    const med = n % 2 ? tri[(n - 1) / 2] : (tri[n / 2 - 1] + tri[n / 2]) / 2, txt = `Voici ${C[0]} : $${serie}$.`;
    if (quoi === "moyenne" && somme % n === 0) return {
      enonce: `${txt} Calcule la moyenne de cette série.`, mode: "nombre", prefixe: "Moyenne :", attendu: somme / n,
      erreurs: amErr([[somme, "Ça, c'est la somme des valeurs : il reste à diviser par le nombre de valeurs."], [somme / (n - 1), `Il y a $${n}$ valeurs : on divise par $${n}$.`], [med, "Ça, c'est la médiane, pas la moyenne."]]),
      aides: ["Moyenne $= \\dfrac{\\text{somme des valeurs}}{\\text{nombre de valeurs}}$.", `Somme : $${s.join(" + ")} = ${somme}$. Nombre de valeurs : $${n}$.`, `$${somme} \\div ${n}$.`],
      solution: `$\\bar{x} = \\dfrac{${somme}}{${n}} = ${nb(somme / n)}$`
    };
    if (quoi === "etendue") return {
      enonce: `${txt} Calcule l'étendue de cette série.`, mode: "nombre", prefixe: "Étendue :", attendu: tri[n - 1] - tri[0],
      erreurs: amErr([[tri[n - 1], "Ça, c'est la plus grande valeur. L'étendue est l'écart entre la plus grande et la plus petite valeur."], [tri[n - 1] + tri[0], "L'étendue est une **différence** : plus grande valeur moins plus petite valeur."]]),
      aides: ["Étendue $=$ plus grande valeur $-$ plus petite valeur.", `Plus grande : $${tri[n - 1]}$ ; plus petite : $${tri[0]}$.`, "Fais la soustraction."],
      solution: `Étendue $= ${tri[n - 1]} - ${tri[0]} = ${tri[n - 1] - tri[0]}$`
    };
    return {
      enonce: `${txt} Détermine la médiane de cette série.`, mode: "nombre", prefixe: "Médiane :", attendu: med,
      erreurs: amErr([[n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2, "Il faut d'abord **ranger** les valeurs dans l'ordre croissant."], n % 2 ? null : [tri[n / 2 - 1], "Avec un nombre pair de valeurs, la médiane est la moyenne des deux valeurs du milieu."]].filter(Boolean)),
      aides: ["Range d'abord les valeurs dans l'ordre croissant.", `Valeurs rangées : $${tri.join(" ; ")}$.`, n % 2 ? `Il y a $${n}$ valeurs (impair) : la médiane est la valeur du milieu, au rang $${(n + 1) / 2}$.` : `Il y a $${n}$ valeurs (pair) : la médiane est la moyenne des valeurs de rangs $${n / 2}$ et $${n / 2 + 1}$.`],
      solution: `Valeurs rangées : $${tri.join(" ; ")}$. Médiane : $${n % 2 ? nb(med) : `\\dfrac{${tri[n / 2 - 1]} + ${tri[n / 2]}}{2} = ${nb(med)}`}$.`
    };
  };

  /* Probabilités : équiprobabilité, événement contraire, somme des issues, probabilité entre 0 et 1 */
  GEN["auto-probabilites"] = function () {
    const t = rand(0, 6), p = pick(["Anli", "Zaïnaba", "Nassim", "Fatima", "Moussa", "Awa", "Toiyb", "Roukia", "Ambdi", "Zalifa"]);
    const FR = (f, n) => frac(f, n), sol1 = (f, n) => `$p = \\dfrac{${f}}{${n}}${pgcd(f, n) > 1 ? " = " + frac(f, n) : ""}$`;
    const fin = (enonce, f, n, aides, sol, err, fig) => {
      const v = f / n, e = amErr(err.filter((x) => x && Math.abs(x[0] - v) > 1e-9));
      if (!amDecimal(v)) e.push(...amApprox(v));
      return { enonce: enonce + " Donne le résultat sous forme de fraction irréductible.", figure: fig, mode: "nombre", prefixe: "p =", attendu: v, erreurs: e, aides, solution: sol };
    };
    if (t === 0) {
      const n = pick([6, 6, 6, 4, 8, 10, 12]), k = rand(2, n - 1);
      const ev = pick([["obtenir un nombre pair", (x) => x % 2 === 0], ["obtenir un nombre impair", (x) => x % 2 === 1], [`obtenir un multiple de ${n >= 8 ? pick([3, 4]) : 3}`, null], [`obtenir un nombre supérieur ou égal à ${k}`, (x) => x >= k], [`obtenir un nombre strictement inférieur à ${k}`, (x) => x < k], [`ne pas obtenir ${k}`, (x) => x !== k]]);
      const m = ev[1] ? 0 : +ev[0].slice(-1), test = ev[1] || ((x) => x % m === 0), fav = Array.from({ length: n }, (_, j) => j + 1).filter(test);
      return fin(`On lance un dé équilibré à $${n}$ faces numérotées de $1$ à $${n}$. Quelle est la probabilité de l'événement « ${ev[0]} » ?`, fav.length, n,
        [`Les $${n}$ issues sont équiprobables : $P = \\dfrac{\\text{issues favorables}}{\\text{issues possibles}}$.`, `Issues favorables : $${fav.join(" ; ")}$, soit $${fav.length}$ issue${fav.length > 1 ? "s" : ""}.`, AIDE_FRAC],
        `Issues favorables : $${fav.join(" ; ")}$. ${sol1(fav.length, n)}`, [[fav.length / (n - fav.length), "On divise par le nombre **total** d'issues, pas par le nombre d'issues défavorables."], [(n - fav.length) / n, "Ça, c'est la probabilité de l'événement contraire."]]);
    }
    if (t === 1) {
      const c = [rand(1, 6), rand(1, 5), rand(1, 4)], tot = c[0] + c[1] + c[2], noms = ["rouge", "bleue", "verte"], L = ["R", "B", "V"];
      const q = pick([[`rouge`, c[0]], [`bleue`, c[1]], [`verte`, c[2]], ["qui n'est pas bleue", c[0] + c[2]], ["rouge ou verte", c[0] + c[2]], ["qui n'est pas rouge", c[1] + c[2]]]);
      const desc = c.map((x, k) => `$${x}$ boule${x > 1 ? "s" : ""} ${noms[k]}${x > 1 ? "s" : ""}`);
      return fin(`Une urne contient ${desc[0]}, ${desc[1]} et ${desc[2]} (R : rouge, B : bleue, V : verte). On tire une boule au hasard. Quelle est la probabilité de tirer une boule ${q[0]} ?`, q[1], tot,
        [`Il y a $${tot}$ boules en tout, chacune a la même chance d'être tirée.`, `Boules favorables : $${q[1]}$.`, AIDE_FRAC],
        `${sol1(q[1], tot)}`, [[q[1] / (tot - q[1]), "On divise par le nombre **total** de boules."], [1 / 3, "Les trois couleurs ne sont pas équiprobables : il faut compter les boules."], [(tot - q[1]) / tot, "Ça, c'est la probabilité de l'événement contraire."]],
        amUrne(shuffle(c.flatMap((x, k) => Array(x).fill(L[k]))), `Urne contenant ${c.map((x, k) => `${x} boule${x > 1 ? "s" : ""} ${L[k]}`).join(", ")}`));
    }
    if (t === 2) {
      const [ev, f] = pick([["un cœur", 8], ["un roi", 4], ["un as rouge", 2], ["une figure (valet, dame ou roi)", 12], ["une carte rouge", 16], ["le roi de cœur", 1], ["un as ou un roi", 8], ["un trèfle ou un pique", 16], ["une dame noire", 2],
        ["un 7", 4], ["un carreau", 8], ["une carte noire", 16], ["un valet ou une dame", 8], ["un pique qui n'est pas une figure", 5], ["une carte qui n'est pas un cœur", 24], ["un as", 4], ["le 10 de trèfle", 1], ["une figure rouge", 6]]);
      return fin(`On tire une carte au hasard dans un jeu de $32$ cartes (4 couleurs : cœur, carreau, pique, trèfle ; 8 cartes par couleur : 7, 8, 9, 10, valet, dame, roi, as). Quelle est la probabilité de tirer ${ev} ?`, f, 32,
        ["Les $32$ cartes sont équiprobables.", `Il y a $${f}$ carte${f > 1 ? "s" : ""} favorable${f > 1 ? "s" : ""}.`, AIDE_FRAC], sol1(f, 32), [[f / (32 - f), "On divise par le nombre **total** de cartes."], [(32 - f) / 32, "Ça, c'est la probabilité de l'événement contraire."]]);
    }
    if (t === 3) {
      const mot = pick(["MAYOTTE", "MAMOUDZOU", "DZAOUDZI", "PAMANDZI", "CHIRONGUI", "BANDRELE", "COMBANI", "KAWENI", "TSINGONI", "VANILLE", "BANANE", "MANGUE", "BAOBAB", "LAGON"]), n = mot.length;
      const voy = mot.split("").filter((l) => "AEIOUY".includes(l)).length, lettres = [...new Set(mot)], l = pick(lettres), nl = mot.split("").filter((x) => x === l).length;
      const [ev, f] = pick([["une voyelle", voy], ["une consonne", n - voy], [`la lettre ${l}`, nl]]);
      return fin(`On écrit chaque lettre du mot ${mot} sur un carton, puis on tire un carton au hasard. Quelle est la probabilité de tirer ${ev} ?`, f, n,
        [`Le mot a $${n}$ lettres : $${n}$ cartons équiprobables.`, ev.startsWith("la lettre") ? `La lettre ${l} apparaît $${nl}$ fois.` : "Les voyelles sont a, e, i, o, u, y.", AIDE_FRAC],
        `Il y a $${f}$ carton${f > 1 ? "s" : ""} favorable${f > 1 ? "s" : ""} sur $${n}$. ${sol1(f, n)}`, [[f / (n - f), "On divise par le nombre **total** de cartons."], [1 / lettres.length, "Les lettres différentes ne sont pas équiprobables : certaines apparaissent plusieurs fois."]]);
    }
    if (t === 4) {
      const ctx = pick([["il pleuve demain à Mamoudzou", "il ne pleuve pas"], ["la barge parte à l'heure", "elle ne parte pas à l'heure"], [`${p} gagne sa partie de dominos`, `${p} ne la gagne pas`], ["un plongeur voie une tortue à N'Gouja", "il n'en voie pas"], ["un client du marché achète des mangues", "il n'en achète pas"], ["le taxi-brousse soit complet au départ de Sada", "il ne soit pas complet"]]);
      const dec = Math.random() < 0.6, v = dec ? rand(1, 99) / 100 : null, [fn, fd] = dec ? [0, 0] : pick([[1, 4], [3, 4], [2, 5], [3, 5], [1, 8], [5, 8], [3, 10], [7, 12], [5, 6], [2, 3]]);
      const P0 = dec ? v : fn / fd, T0 = dec ? nb(v) : `\\dfrac{${fn}}{${fd}}`, rep = 1 - P0;
      return {
        enonce: `La probabilité ${queN(ctx[0])} est $${T0}$. Quelle est la probabilité ${queN(ctx[1])} ?${dec ? "" : " Donne le résultat sous forme de fraction."}`,
        mode: "nombre", prefixe: "p =", attendu: +rep.toFixed(9),
        erreurs: amErr([[P0, "Ça, c'est la probabilité de l'événement lui-même. Celle de l'événement contraire est $1 - P(A)$."], [1 + P0, "On soustrait : $P(\\overline{A}) = 1 - P(A)$."], [-P0, "Une probabilité n'est jamais négative : $P(\\overline{A}) = 1 - P(A)$."]]).concat(dec || amDecimal(rep) ? [] : amApprox(rep)),
        aides: ["Les deux événements sont **contraires** : l'un ou l'autre se produit, jamais les deux.", "$P(\\overline{A}) = 1 - P(A)$.", `Calcule $1 - ${T0}$.`],
        solution: `$P(\\overline{A}) = 1 - ${T0} = ${dec ? nb(+rep.toFixed(6)) : frac(fd - fn, fd)}$`
      };
    }
    if (t === 5) {
      const bon = pick([nb(rand(1, 99) / 100), `\\dfrac{${rand(1, 4)}}{${rand(5, 9)}}`, `${rand(1, 99)}\\,\\%`, "0", "1"]);
      const faux = shuffle([nb(-rand(1, 9) / 10), nb(1 + rand(1, 9) / 10), `\\dfrac{${rand(6, 9)}}{${rand(2, 5)}}`, `${rand(101, 180)}\\,\\%`, `-\\dfrac{1}{${rand(2, 5)}}`, nb(rand(2, 5))]).slice(0, 3);
      const m = melangeChoix(`$${bon}$`, faux.map((x) => `$${x}$`));
      return {
        enonce: `${p} a calculé quatre probabilités, mais une seule valeur est possible. Laquelle peut être une probabilité ?`, mode: "choix", choix: m.choix, attendu: m.attendu,
        aides: ["Une probabilité est toujours comprise entre $0$ et $1$ (soit entre $0\\,\\%$ et $100\\,\\%$).", "Une probabilité n'est jamais négative.", "Une fraction dont le numérateur dépasse le dénominateur est plus grande que $1$."],
        solution: `$${bon}$ est bien entre $0$ et $1$. Les autres valeurs sont négatives ou plus grandes que $1$ : ce ne sont pas des probabilités.`
      };
    }
    let ps; do { ps = [rand(1, 7), rand(1, 7), rand(1, 7)].map((x) => x / 20); } while (ps[0] + ps[1] + ps[2] >= 0.95);
    const k = rand(0, 3), fruits = ["mangue", "banane", "ananas", "coco"], all = ps.concat([+(1 - ps[0] - ps[1] - ps[2]).toFixed(2)]), autres = all.filter((_, j) => j !== k);
    return {
      enonce: `À la fête du village de Kani-Kéli, une roue s'arrête sur un fruit : mangue, banane, ananas ou coco. On connaît les probabilités de trois fruits : ${fruits.filter((_, j) => j !== k).map((x, j) => `$P(\\text{${x}}) = ${nb(autres[j])}$`).join(", ")}. Calcule $P(\\text{${fruits[k]}})$.`,
      mode: "nombre", prefixe: "p =", attendu: all[k],
      erreurs: amErr([[+(autres[0] + autres[1] + autres[2]).toFixed(2), "Ça, c'est la somme des trois autres probabilités : il faut la retirer à $1$."], [0.25, "Les fruits ne sont pas équiprobables : utilise les probabilités données."]]),
      aides: ["La somme des probabilités de toutes les issues vaut $1$.", `$P(\\text{${fruits[k]}}) = 1 - (${autres.map(nb).join(" + ")})$.`, `$${autres.map(nb).join(" + ")} = ${nb(+(autres[0] + autres[1] + autres[2]).toFixed(2))}$.`],
      solution: `$P(\\text{${fruits[k]}}) = 1 - (${autres.map(nb).join(" + ")}) = 1 - ${nb(+(autres[0] + autres[1] + autres[2]).toFixed(2))} = ${nb(all[k])}$`
    };
  };

  const FICHES = ["auto-fractions", "auto-conversions", "auto-litteral", "auto-equations", "auto-pourcentages", "auto-fonctions", "auto-grandeurs", "auto-pythagore", "auto-statistiques", "auto-probabilites"];
  GEN["auto-melange"] = (i) => GEN[FICHES[(i + rand(0, 9)) % FICHES.length]](rand(0, 4));


  /* ---------- Automatismes (programmes 2026 de Seconde et de Première, épreuve anticipée sans calculatrice) ---------- */
  // Nombre écrit à la française avec espaces des milliers : 52 300 ; 0,00052
  const nb = (x) => {
    const s = String(+(+x).toPrecision(10));
    const neg = s[0] === "-";
    const [ent, dec] = (neg ? s.slice(1) : s).split(".");
    const e = ent.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
    return (neg ? "-" : "") + e + (dec ? "{,}" + dec : "");
  };
  const cmpChoix = (A, B) => [`$${A} < ${B}$`, `$${A} > ${B}$`, `$${A} = ${B}$`];
  const cmpRep = (a, b) => (Math.abs(a - b) < 1e-12 ? 2 : a < b ? 0 : 1);
  const melangeChoix = (bonne, fausses) => { const c = shuffle([bonne, ...[...new Set(fausses)].filter((f) => f !== bonne).slice(0, 3)]); return { choix: c, attendu: c.indexOf(bonne) }; };
  // Série « vrai ou faux » sans hasard : parmi 4 affirmations du tableau T ([énoncé, vrai ?, explication]), une seule est vraie (ou une seule est fausse)
  const minus = (x) => x.replace(/^([A-ZÀÉÈ])(?=[a-zàâçéèêëîïôûù' ])/, (c) => c.toLowerCase());
  const vraiFaux4 = (T, aides) => {
    const net = (q) => q.replace(/^«\s*/, "").replace(/\s*»$/, "").replace(/\.$/, "");
    const V = T.filter((t) => t[1]), F = T.filter((t) => !t[1]), modes = [];
    if (V.length >= 1 && F.length >= 3) modes.push("vraie");
    if (F.length >= 1 && V.length >= 3) modes.push("fausse");
    const m = pick(modes), bon = pick(m === "vraie" ? V : F), autres = shuffle((m === "vraie" ? F : V).slice()).slice(0, 3);
    const c = melangeChoix(net(bon[0]), autres.map((a) => net(a[0])));
    return { enonce: `Une seule de ces affirmations est **${m}**. Laquelle ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides,
      solution: `« ${net(bon[0])} » est ${m} : ${minus(bon[2])}\n\n` + autres.map((a) => `- « ${net(a[0])} » est ${m === "vraie" ? "fausse" : "vraie"} : ${minus(a[2])}`).join("\n") };
  };
  const AM_NOMS = ["Anli", "Nassim", "Zaïnaba", "Fatima", "Moussa", "Awa", "Ibrahim", "Mariama", "Saïd", "Djamila", "Hamada", "Faïza", "Kamal", "Zalifa", "Ambdi", "Nasra", "Toiyb", "Roukia"];

  // Barre partagée en d parts égales dont n sont coloriées ; tp au-dessus de la partie coloriée, tt sous la barre entière
  function amParts(d, n, tp, tt, aria) {
    const x0 = 20, w = 280, y = 48, h = 32, c = w / d;
    let s = `<svg class="graph" viewBox="0 0 320 120" role="img" aria-label="${aria}">`;
    for (let k = 0; k < d; k++) s += `<rect class="${k < n ? "g-carreau" : "g-rect"}" x="${amF(x0 + k * c)}" y="${y}" width="${amF(c)}" height="${h}"/>`;
    s += `<path class="g-accolade" d="M${x0} ${y - 5}v-8h${amF(n * c)}v8"/>` + amTxt(Math.max(x0 + (n * c) / 2, 46), y - 18, tp, "g-mesure");
    return s + `<path class="g-accolade" d="M${x0} ${y + h + 5}v8h${w}v-8"/>` + amTxt(x0 + w / 2, y + h + 26, tt, "g-mesure") + `</svg>`;
  }
  // Quatre petits repères : courbes C1 à C4 (pour reconnaître une fonction affine)
  function amPanneaux(fs, aria) {
    let s = `<svg class="graph" viewBox="0 0 320 228" role="img" aria-label="${aria}">`;
    fs.forEach((g, k) => {
      const ox = 8 + (k % 2) * 158, oy = 6 + Math.floor(k / 2) * 112, w = 146, h = 104, X = (x) => ox + w / 2 + x * 12, Y = (y) => oy + h / 2 - y * 9;
      s += `<rect x="${ox}" y="${oy}" width="${w}" height="${h}" rx="6" style="fill:none;stroke:var(--trait)"/><g class="g-axis"><line x1="${ox + 4}" y1="${Y(0)}" x2="${ox + w - 4}" y2="${Y(0)}"/><line x1="${X(0)}" y1="${oy + 4}" x2="${X(0)}" y2="${oy + h - 4}"/></g>`;
      let d = "", up = false;
      for (let i = 0; i <= 140; i++) { const x = -5.6 + (11.2 * i) / 140, y = g(x); if (!isFinite(y) || Math.abs(y) > 5.3) { up = false; continue; } d += (up ? "L" : "M") + amF(X(x)) + " " + amF(Y(y)); up = true; }
      s += `<path class="g-curve" d="${d}"/>` + amTxt(ox + 10, oy + 17, `C<tspan class="sub" dy="3">${k + 1}</tspan>`, "g-clabel", "start");
    });
    return s + `</svg>`;
  }
  // Courbe de f (coupée hors du cadre) avec des points marqués
  function amCourbe(f, pts, aria) {
    const ys = pts.map((p) => p[1]), xs = pts.map((p) => p[0]), lo = Math.min(-1, ...ys) - 1.5, hi = Math.max(1, ...ys) + 1.5, e = hi - lo, ystep = e > 40 ? 10 : e > 20 ? 5 : e > 12 ? 2 : 1;
    const xmin = Math.min(-4.6, ...xs.map((x) => x - 0.8)), xmax = Math.max(4.6, ...xs.map((x) => x + 0.8)), curves = [], n = 240, pas = (xmax - xmin - 0.2) / n;
    let deb = null;
    for (let k = 0; k <= n; k++) { const x = xmin + 0.1 + k * pas, y = f(x), ok = isFinite(y) && y >= lo && y <= hi; if (ok && deb === null) deb = x; if ((!ok || k === n) && deb !== null) { curves.push({ f, a: deb, b: ok ? x : x - pas, closed: false, couleur: 0 }); deb = null; } }
    return graph({ xmin, xmax, ymin: lo, ymax: hi, ystep, h: 260, curves, points: pts.map((p) => ({ x: p[0], y: p[1], label: `(${amT(p[0])} ; ${amT(p[1])})` })), aria });
  }
  // Tableau de variations avec des textes libres (« ? » possible) ; haut[k] : valeur en haut ou en bas
  function amTabvar(xs, ys, haut, nom) {
    const W = 320, H = 112, g = 52, L = (W - g - 26) / (xs.length - 1), X = (k) => g + 12 + k * L;
    let s = `<svg class="graph tabvar" viewBox="0 0 ${W} ${H}" role="img" aria-label="Tableau de variations de ${nom || "f"}"><g class="g-axis"><rect x="1" y="1" width="${W - 2}" height="${H - 2}" fill="none" stroke-width="1.2" style="stroke:var(--doux)"/><line x1="1" y1="30" x2="${W - 1}" y2="30"/><line x1="${g}" y1="1" x2="${g}" y2="${H - 1}"/></g>`;
    s += amTxt(g / 2, 20, "x") + amTxt(g / 2, 76, nom || "f");
    xs.forEach((x, k) => { s += amTxt(X(k), 20, x, x === "?" ? "g-mesure" : "g-label") + amTxt(X(k), haut[k] ? 48 : 102, ys[k], ys[k] === "?" ? "g-mesure" : "g-label"); });
    for (let k = 0; k < xs.length - 1; k++) {
      const y1 = haut[k] ? 54 : 90, y2 = haut[k + 1] ? 54 : 90, x1 = X(k) + 14, x2 = X(k + 1) - 14, a = Math.atan2(y2 - y1, x2 - x1);
      s += `<line x1="${amF(x1)}" y1="${y1}" x2="${amF(x2)}" y2="${y2}" style="stroke:var(--lagon);stroke-width:1.8"/><path d="M${amF(x2)} ${y2} L${amF(x2 - 7 * Math.cos(a - 0.45))} ${amF(y2 - 7 * Math.sin(a - 0.45))} L${amF(x2 - 7 * Math.cos(a + 0.45))} ${amF(y2 - 7 * Math.sin(a + 0.45))}z" style="fill:var(--lagon)"/>`;
    }
    return s + `</svg>`;
  }
  // Aller-retour : valeur de départ → valeur d'arrivée (flèche du haut), puis retour (flèche du bas)
  function amAllerRetour(t1, t2, aria) {
    let s = `<svg class="graph" viewBox="0 0 320 150" role="img" aria-label="${aria}"><rect class="g-rect" x="14" y="55" width="96" height="40" rx="8"/><rect class="g-rect" x="210" y="55" width="96" height="40" rx="8"/>`;
    s += amTxt(62, 80, "départ") + amTxt(258, 80, "arrivée");
    s += `<path class="g-curve" style="stroke-width:2" d="M70 50 Q160 0 250 50"/><path class="g-end" d="M250 50 l-10 -2 l5 -8z"/><path class="g-curve g-curve-1" style="stroke-width:2" d="M250 100 Q160 150 70 100"/><path class="g-end g-curve-1" d="M70 100 l10 2 l-5 8z"/>`;
    return s + amTxt(160, 22, t1, "g-clabel") + amTxt(160, 140, t2, "g-clabel g-curve-1") + `</svg>`;
  }
  const amPluriel = (n, mot) => `${mot}${n > 1 ? "s" : ""}`;

  /* ===== Calcul numérique ===== */
  // Comparer deux nombres : par la différence, par le quotient (nombres positifs), décimaux, fractions, puissances
  GEN["am-comparer"] = function () {
    const ligne = (x, y, lx, ly) => {
      const lo = Math.min(x, y), hi = Math.max(x, y), e = hi - lo, pas = e >= 2 ? 1 : e >= 0.2 ? 0.1 : e >= 0.02 ? 0.01 : 0.001;
      const min = +(Math.floor(lo / pas) * pas - pas).toFixed(6), max = +(Math.ceil(hi / pas) * pas + pas).toFixed(6), n = Math.round((max - min) / pas), etiq = [];
      for (let k = 0; k <= n; k++) { const v = +(min + k * pas).toFixed(6); if (Math.abs(Math.round(v / (5 * pas)) * 5 * pas - v) < 1e-9) etiq.push(v); }
      // les bornes ne sont écrites que si elles ne touchent pas un nombre déjà écrit
      [min, max].forEach((v) => { if (etiq.length < 2 || etiq.every((w) => Math.abs(w - v) > 2.5 * pas)) etiq.push(v); });
      return n > 40 ? undefined : amDroite({ min, max, pas, etiq, points: [{ x, label: lx }, { x: y, label: ly }], aria: `Droite graduée : les deux nombres ${lx} et ${ly} placés` });
    };
    const T = [
      () => {
        let a, b, c, d; do { b = rand(3, 12); d = rand(3, 12); a = rand(1, b - 1); c = rand(1, d - 1); } while (b === d || pgcd(a, b) > 1 || pgcd(c, d) > 1);
        const m = (b * d) / pgcd(b, d), a2 = (a * m) / b, c2 = (c * m) / d;
        return [`\\dfrac{${a}}{${b}}`, `\\dfrac{${c}}{${d}}`, a / b, c / d, ["Compare par la différence : réduis d'abord au même dénominateur.", `Dénominateur commun : $${m}$. $\\dfrac{${a}}{${b}} = \\dfrac{${a2}}{${m}}$ et $\\dfrac{${c}}{${d}} = \\dfrac{${c2}}{${m}}$.`, "Avec le même dénominateur, la plus grande fraction est celle qui a le plus grand numérateur."],
          `$\\dfrac{${a}}{${b}} - \\dfrac{${c}}{${d}} = \\dfrac{${a2}}{${m}} - \\dfrac{${c2}}{${m}} = ${frac(a2 - c2, m)}$ : la différence est ${a2 > c2 ? "positive" : "négative"}.`, ligne(a / b, c / d, `${a}/${b}`, `${c}/${d}`)];
      },
      () => {
        const x = rand(101, 999) / 100, y = Math.floor(x * 10) / 10 + pick([0, 0.1]), s = Math.random() < 0.4 ? -1 : 1, A = s * x, B = +(s * y).toFixed(1);
        const B2 = (B < 0 ? "-" : "") + Math.abs(B).toFixed(2).replace(".", "{,}");
        return [nb(A), nb(B), A, B, ["Écris les deux nombres avec le même nombre de décimales.", `$${nb(B)} = ${B2}$.`, s < 0 ? "Pour deux nombres négatifs, le plus grand est le plus proche de $0$." : "Compare chiffre par chiffre, de la gauche vers la droite."],
          `$${nb(B)} = ${B2}$.` + (s < 0 ? " Pour des nombres négatifs, le plus grand est le plus proche de $0$." : ""), ligne(A, B, amT(A), amT(B))];
      },
      () => {
        const [n, d] = pick([[1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [3, 8], [5, 6], [1, 6], [2, 7], [4, 9], [5, 8], [7, 9], [5, 12], [7, 8]]);
        const v = n / d, D = +(Math.round(v * 100) / 100 + pick([-0.01, 0, 0.01])).toFixed(2), ex = Number.isInteger(v * 1000);
        return [`\\dfrac{${n}}{${d}}`, nb(D), v, D, ["Calcule l'écriture décimale de la fraction : c'est une division.", `$${n} \\div ${d} ${ex ? "=" : "\\approx"} ${nb(+v.toFixed(4))}$.`, "Compare ensuite les deux écritures décimales."],
          `$\\dfrac{${n}}{${d}} ${ex ? "=" : "\\approx"} ${nb(+v.toFixed(4))}$.`, ligne(v, D, `${n}/${d}`, amT(D))];
      },
      () => {
        const t = rand(0, 4);
        if (t === 0) { const a = rand(2, 9); return [`(-${a})^{2}`, `-${a}^{2}`, a * a, -a * a, ["Calcule la valeur de chaque nombre.", "Attention aux priorités : la puissance passe avant le signe $-$.", `$(-${a})^2 = ${a * a}$.`], `$(-${a})^2 = (-${a}) \\times (-${a}) = ${a * a}$ mais $-${a}^2 = -${a * a}$ : le carré ne porte que sur $${a}$.`]; }
        if (t === 1) { const [a, b] = pick([[2, 3], [3, 2], [2, 4], [4, 2], [2, 5], [5, 2], [3, 4], [4, 3], [2, 6], [6, 2], [10, 2]]); return [`${a}^{${b}}`, `${b}^{${a}}`, a ** b, b ** a, ["Calcule la valeur de chaque nombre.", `$${a}^{${b}}$ : on multiplie $${b}$ facteurs égaux à $${a}$.`, `$${a}^{${b}} = ${nb(a ** b)}$.`], `$${a}^{${b}} = ${nb(a ** b)}$ et $${b}^{${a}} = ${nb(b ** a)}$.`]; }
        if (t === 2) { const k = rand(1, 5), j = k + pick([-1, 0, 1]) || 1, dec = `0{,}${"0".repeat(j - 1)}1`; return [`10^{-${k}}`, dec, 10 ** -k, 10 ** -j, ["$10^{-n} = \\dfrac{1}{10^n}$ : c'est $0{,}0…01$ avec le chiffre $1$ au $n$-ième rang après la virgule.", `$10^{-${k}} = ${nb(10 ** -k)}$.`, "Compare les deux écritures décimales."], `$10^{-${k}} = \\dfrac{1}{${nb(10 ** k)}} = ${nb(10 ** -k)}$.`]; }
        if (t === 3) { let n; do { n = rand(2, 99); } while (Number.isInteger(Math.sqrt(n))); const m = Math.round(Math.sqrt(n)) + pick([0, 1, -1]); return [`\\sqrt{${n}}`, `${m}`, Math.sqrt(n), m, ["Deux nombres positifs sont rangés comme leurs carrés.", `$\\left(\\sqrt{${n}}\\right)^2 = ${n}$ et $${m}^2 = ${m * m}$.`, "Compare les carrés."], `$\\left(\\sqrt{${n}}\\right)^2 = ${n}$ et $${m}^2 = ${m * m}$ ; les nombres positifs sont rangés comme leurs carrés.`]; }
        const a = pick([2, 4, 5, 10, 20, 25]), v = rand(1, 9) / 10; return [`${a}^{-1}`, nb(v), 1 / a, v, ["$a^{-1} = \\dfrac{1}{a}$.", `$${a}^{-1} = \\dfrac{1}{${a}} = ${nb(1 / a)}$.`, "Un exposant négatif ne rend pas le nombre négatif."], `$${a}^{-1} = \\dfrac{1}{${a}} = ${nb(1 / a)}$.`];
      },
      () => { // par le quotient : nombres strictement positifs
        if (Math.random() < 0.5) {
          const q = pick([1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8]), f = pick([0.5, 2, 1.5, 3, 0.25, 4, 1.25, 0.8, 1]), t = pick([0, 0, 1, -1]), n = rand(2, 6);
          let p = q * f, e = 0; while (p >= 10) { p /= 10; e++; } while (p < 1) { p *= 10; e--; } p = +p.toFixed(4);
          const m = n + t + e, A = `${nb(p)} \\times 10^{${m}}`, B = `${nb(q)} \\times 10^{${n}}`, r = f * 10 ** t;
          return [A, B, r, 1, ["Les deux nombres sont positifs : compare leur quotient à $1$.", `$\\dfrac{${nb(p)} \\times 10^{${m}}}{${nb(q)} \\times 10^{${n}}} = \\dfrac{${nb(p)}}{${nb(q)}} \\times 10^{${m - n}}$.`, "Si le quotient est plus grand que $1$, le premier nombre est le plus grand."],
            `$\\dfrac{${nb(p)} \\times 10^{${m}}}{${nb(q)} \\times 10^{${n}}} = ${nb(+(p / q).toFixed(4))} \\times 10^{${m - n}} = ${nb(+r.toFixed(6))}$, ${r > 1 ? "plus grand" : r < 1 ? "plus petit" : "égal à"} ${r === 1 ? "$1$" : "que $1$"}.`];
        }
        const b = pick([2, 3, 5]), k = pick([2, 3]), n = rand(2, 5), d = pick([-2, -1, 0, 1, 2]), m = k * n + d, B = b ** k;
        return [`${b}^{${m}}`, `${B}^{${n}}`, b ** d, 1, ["Les deux nombres sont positifs : compare leur quotient à $1$.", `$${B} = ${b}^{${k}}$, donc $${B}^{${n}} = ${b}^{${k * n}}$.`, `$\\dfrac{${b}^{${m}}}{${b}^{${k * n}}} = ${b}^{${d}}$.`],
          `$${B}^{${n}} = (${b}^{${k}})^{${n}} = ${b}^{${k * n}}$, donc $\\dfrac{${b}^{${m}}}{${B}^{${n}}} = ${b}^{${d}} = ${nb(+(b ** d).toFixed(6))}$, ${d > 0 ? "plus grand que $1$" : d < 0 ? "plus petit que $1$" : "égal à $1$"}.`];
      }
    ];
    const [A, B, a, b, aides, sol, fig] = pick(T)();
    const choix = cmpChoix(A, B), r = cmpRep(a, b);
    return { enonce: `Compare les nombres $${A}$ et $${B}$.`, mode: "choix", choix, attendu: r, aides, solution: `${sol}\n\nDonc ${choix[r]}.`, figureSolution: fig };
  };

  // Fractions : opérations, fraction d'une quantité, simplification
  GEN["am-fractions"] = function () {
    const t = rand(0, 3);
    if (t <= 1) return GEN["auto-fractions"](0);
    if (t === 2) {
      const d = pick([2, 3, 4, 5, 6, 8, 10]); let n; do { n = rand(1, d - 1); } while (pgcd(n, d) > 1);
      const o = pick([["élèves d'une classe de Seconde", "viennent au lycée en barge", "d'élèves viennent en barge", "élèves", 20, 40], ["kilogrammes de mangues vendus au marché de Mamoudzou", "étaient des mangues greffées", "de kilogrammes de mangues greffées ont été vendus", "kg", 20, 200], ["pirogues du port de M'tsamboro", "sont sorties pêcher ce matin", "de pirogues sont sorties", "pirogues", 10, 60], ["plants d'ylang-ylang d'une parcelle de Combani", "sont en fleurs", "de plants sont en fleurs", "plants", 20, 200], ["passagers de la barge de 7 h", "sont des lycéens", "de passagers sont des lycéens", "passagers", 20, 120]]);
      const q = d * rand(Math.ceil(o[4] / d), Math.floor(o[5] / d)), r = (q / d) * n, une = { 2: "la moitié", 3: "le tiers", 4: "le quart", 5: "le cinquième", 6: "le sixième", 8: "le huitième", 10: "le dixième" }[d];
      return {
        enonce: `Les $\\dfrac{${n}}{${d}}$ des $${q}$ ${o[0]} ${o[1]}. Combien ${o[2]} ?`,
        figure: amParts(d, n, "?", `${q} ${o[3]}`, `Barre de ${q} ${o[3]} partagée en ${d} parts égales, ${n} part${n > 1 ? "s" : ""} coloriée${n > 1 ? "s" : ""}`),
        mode: "nombre", prefixe: "Réponse :", suffixe: o[3], attendu: r,
        erreurs: amErr([[q * n, `Il faut d'abord diviser par $${d}$ (une part)${n > 1 ? `, puis multiplier par $${n}$` : ""}.`], n > 1 ? [q / d, `Ça, c'est une seule part (${une}). Il en faut $${n}$.`] : null, [(q * d) / n, `On multiplie par $\\dfrac{${n}}{${d}}$, pas par $\\dfrac{${d}}{${n}}$.`]].filter(Boolean)),
        aides: [`Prendre les $\\dfrac{${n}}{${d}}$ d'un nombre, c'est le diviser par $${d}$ puis multiplier par $${n}$.`, `Une part (${une}) : $${q} \\div ${d} = ${q / d}$.`, n > 1 ? `$${n}$ parts : $${n} \\times ${q / d}$.` : `Ici, on prend une seule part.`],
        solution: `$\\dfrac{${n}}{${d}} \\times ${q} = ${q / d} \\times ${n} = ${r}$ ${o[3]}.`
      };
    }
    const d = pick([3, 4, 5, 6, 7, 8, 9, 10]); let n; do { n = rand(1, d + 3); } while (pgcd(n, d) > 1 || n === d);
    const k = rand(2, 9), N = k * n, D = k * d, F = (a, b) => `$\\dfrac{${a}}{${b}}$`;
    const m = melangeChoix(F(n, d), [F(n, D), F(N, d), F(d, n), F(n + 1, d + 1), F(N - 1, D - 1)]);
    return {
      enonce: `Quelle est la forme irréductible de la fraction $\\dfrac{${N}}{${D}}$ ?`, mode: "choix", choix: m.choix, attendu: m.attendu,
      aides: ["On divise le numérateur et le dénominateur par un même nombre : la fraction garde sa valeur.", `$${N}$ et $${D}$ sont tous les deux des multiples de $${k}$.`, `$${N} = ${k} \\times ${n}$ et $${D} = ${k} \\times ${d}$.`],
      solution: `$\\dfrac{${N}}{${D}} = \\dfrac{${k} \\times ${n}}{${k} \\times ${d}} = \\dfrac{${n}}{${d}}$, et $${n}$ et $${d}$ n'ont plus de diviseur commun autre que $1$.`
    };
  };

  // Puissances : règles de calcul, écriture scientifique, valeur d'une puissance
  GEN["am-puissances"] = function () {
    const t = rand(0, 3);
    if (t === 0) return GEN["auto-fractions"](1);
    if (t === 1) {
      const a = rand(11, 99) / 10, n = pick([-5, -4, -3, -2, -1, 2, 3, 4, 5, 6, 7]), x = +(a * 10 ** n).toPrecision(2);
      return {
        enonce: `On écrit $${nb(x)}$ en écriture scientifique : $${nb(a)} \\times 10^{n}$. Quelle est la valeur de $n$ ?`,
        mode: "nombre", prefixe: "n =", attendu: n,
        erreurs: amErr([[-n, "Attention au signe : un nombre plus grand que $10$ a un exposant positif, un nombre plus petit que $1$ un exposant négatif."], [n + Math.sign(n), "Compte bien de combien de rangs la virgule se déplace."], [n - Math.sign(n), "Compte bien de combien de rangs la virgule se déplace."]]),
        aides: ["Écriture scientifique : $a \\times 10^n$ avec $1 \\leqslant a < 10$.", `Compte de combien de rangs la virgule se déplace pour passer de $${nb(a)}$ à $${nb(x)}$.`, n > 0 ? "Le nombre est plus grand que $10$ : l'exposant est positif." : "Le nombre est plus petit que $1$ : l'exposant est négatif."],
        solution: `$${nb(x)} = ${nb(a)} \\times 10^{${n}}$ : la virgule se déplace de $${Math.abs(n)}$ rang${Math.abs(n) > 1 ? "s" : ""}.`
      };
    }
    if (t === 2) {
      const L = [
        () => { const a = rand(2, 5), e = pick([2, 3, 4]); return [`(-${a})^{${e}}`, (-a) ** e, [[-((-a) ** e), e % 2 ? "Un nombre négatif à une puissance impaire reste négatif." : "Un nombre négatif à une puissance paire devient positif : $(-a)^2 = a^2$."]], `$(-${a})^{${e}} = ${Array(e).fill(`(-${a})`).join(" \\times ")} = ${(-a) ** e}$`, `Ici l'exposant porte sur $(-${a})$, parenthèses comprises : compte les signes $-$.`]; },
        () => { const a = rand(2, 5), e = pick([2, 4]); return [`-${a}^{${e}}`, -(a ** e), [[a ** e, "Sans parenthèses, la puissance ne porte que sur le nombre : $-a^2 = -(a^2)$."]], `$-${a}^{${e}} = -(${a}^{${e}}) = ${-(a ** e)}$`, `Sans parenthèses, l'exposant ne porte que sur $${a}$ : calcule $${a}^{${e}}$, puis prends l'opposé.`]; },
        () => { const a = pick([2, 3, 7, 12, 25, 0.5, 100]); return [`${nb(a)}^{0}`, 1, [[0, "Tout nombre non nul à la puissance $0$ vaut $1$."], [a, "Tout nombre non nul à la puissance $0$ vaut $1$, pas le nombre lui-même."]], `$${nb(a)}^{0} = 1$ : c'est la convention $a^0 = 1$ pour $a \\neq 0$.`, "Pour tout nombre $a$ non nul, $a^0 = 1$."]; },
        () => { const a = pick([2, 4, 5, 10, 20, 25, 50]); return [`${a}^{-1}`, 1 / a, [[-a, "Un exposant négatif ne rend pas le nombre négatif : $a^{-1} = \\dfrac{1}{a}$."], [-1 / a, "$a^{-1} = \\dfrac{1}{a}$ est positif quand $a$ est positif."]], `$${a}^{-1} = \\dfrac{1}{${a}} = ${nb(1 / a)}$`, "Un exposant négatif donne l'inverse : $a^{-1} = \\dfrac{1}{a}$, qui reste positif."]; },
        () => { const k = rand(2, 5); return [`10^{-${k}}`, 10 ** -k, [[-(10 ** k), "Un exposant négatif ne rend pas le nombre négatif : $10^{-n} = \\dfrac{1}{10^n}$."], [10 ** -(k + 1), `$10^{-${k}}$ a son chiffre $1$ au $${k}$-ième rang après la virgule.`]], `$10^{-${k}} = \\dfrac{1}{${nb(10 ** k)}} = ${nb(10 ** -k)}$`, `$10^{-${k}} = \\dfrac{1}{10^{${k}}}$ : le chiffre $1$ est au $${k}$-ième rang après la virgule.`]; },
        () => { const [a, k] = pick([[2, 2], [2, 3], [5, 2], [4, 2], [2, 4]]); return [`${a}^{-${k}}`, a ** -k, [[-(a ** k), "Un exposant négatif ne rend pas le nombre négatif : $a^{-n} = \\dfrac{1}{a^n}$."], [-a * k, "$a^{-n}$ n'est pas $-a \\times n$ : c'est $\\dfrac{1}{a^n}$."]], `$${a}^{-${k}} = \\dfrac{1}{${a}^{${k}}} = \\dfrac{1}{${a ** k}} = ${nb(a ** -k)}$`, `$${a}^{-${k}} = \\dfrac{1}{${a}^{${k}}}$ : calcule $${a}^{${k}}$, puis son inverse en écriture décimale.`]; }
      ];
      const [e, v, err, sol, h] = pick(L)();
      return {
        enonce: `Calcule $${e}$. Donne le résultat sous forme d'un nombre entier ou décimal.`, mode: "nombre", prefixe: `$${e} =$`, attendu: +v.toFixed(9), erreurs: amErr(err),
        aides: ["$a^n$ est le produit de $n$ facteurs égaux à $a$ ; $a^0 = 1$ et $a^{-n} = \\dfrac{1}{a^n}$.", "Regarde bien sur quoi porte l'exposant : $(-a)^2$ et $-a^2$ sont différents.", h], solution: sol
      };
    }
    const p = pick([1.2, 1.5, 2, 2.5, 3, 4]), q = pick([2, 3, 4]), m = randNZ(-4, 6), n = randNZ(-4, 5), prod = Math.random() < 0.5;
    if (prod && p * q < 10) return {
      enonce: `On donne $A = (${nb(p)} \\times 10^{${m}}) \\times (${q} \\times 10^{${n}})$. L'écriture scientifique de $A$ est $${nb(p * q)} \\times 10^{k}$. Que vaut $k$ ?`,
      mode: "nombre", prefixe: "k =", attendu: m + n, erreurs: amErr([[m * n, "Pour multiplier des puissances de $10$, on **additionne** les exposants."], [m - n, "Pour un produit, on **additionne** les exposants."]]),
      aides: ["On regroupe : $(a \\times 10^m) \\times (b \\times 10^n) = (a \\times b) \\times 10^{m + n}$.", `$${nb(p)} \\times ${q} = ${nb(p * q)}$.`, `$10^{${m}} \\times 10^{${n}} = 10^{${m} + ${par(n)}}$.`],
      solution: `$A = (${nb(p)} \\times ${q}) \\times 10^{${m} + ${par(n)}} = ${nb(p * q)} \\times 10^{${m + n}}$ : $k = ${m + n}$.`
    };
    const a = +(p * q).toFixed(4);
    return {
      enonce: `On donne $B = \\dfrac{${nb(a)} \\times 10^{${m}}}{${q} \\times 10^{${n}}}$. L'écriture scientifique de $B$ est $${nb(p)} \\times 10^{k}$. Que vaut $k$ ?`,
      mode: "nombre", prefixe: "k =", attendu: m - n, erreurs: amErr([[m + n, "Pour diviser des puissances de $10$, on **soustrait** les exposants."], [n - m, "Attention à l'ordre : exposant du numérateur moins exposant du dénominateur."]]),
      aides: ["On regroupe : $\\dfrac{a \\times 10^m}{b \\times 10^n} = \\dfrac{a}{b} \\times 10^{m - n}$.", `$${nb(a)} \\div ${q} = ${nb(p)}$.`, `$\\dfrac{10^{${m}}}{10^{${n}}} = 10^{${m} - ${par(n)}}$.`],
      solution: `$B = \\dfrac{${nb(a)}}{${q}} \\times 10^{${m} - ${par(n)}} = ${nb(p)} \\times 10^{${m - n}}$ : $k = ${m - n}$.`
    };
  };

  // Changer d'écriture : fraction, décimal, pourcentage (avec un quadrillage)
  GEN["am-ecritures"] = function () {
    const t = rand(0, 5);
    if (t === 0) {
      const d = pick([2, 4, 5, 8, 10, 20, 25, 50]); let n; do { n = rand(1, 2 * d); } while (n % d === 0);
      return { enonce: `Écris $\\dfrac{${n}}{${d}}$ sous forme décimale.`, mode: "nombre", prefixe: "Réponse :", attendu: +(n / d).toFixed(6),
        erreurs: amErr([amDecimal(d / n) ? [d / n, "Tu as divisé à l'envers : une fraction, c'est le numérateur divisé par le dénominateur."] : null, [(100 * n) / d, "Ça, c'est l'écriture en pourcentage. On demande l'écriture décimale."]].filter(Boolean)),
        aides: ["Une fraction est un quotient : $\\dfrac{a}{b} = a \\div b$.", `Calcule $${n} \\div ${d}$.`, `Astuce : cherche une fraction égale de dénominateur $10$, $100$ ou $1\\,000$${100 % d === 0 ? ` : $\\dfrac{${n}}{${d}} = \\dfrac{${(n * 100) / d}}{100}$` : ""}.`],
        solution: `$\\dfrac{${n}}{${d}} = ${n} \\div ${d} = ${nb(n / d)}$` };
    }
    if (t === 1) {
      const p = pick([rand(1, 99), rand(1, 99), rand(1, 19) + 0.5, rand(101, 300), rand(1, 9) / 10]);
      return { enonce: `Écris $${nb(p)}\\,\\%$ sous forme décimale.`, mode: "nombre", prefixe: "Réponse :", attendu: +(p / 100).toFixed(6),
        erreurs: amErr([[p / 10, "« Pour cent » veut dire « divisé par $100$ », pas par $10$."], [p / 1000, "On divise par $100$ : la virgule recule de deux rangs, pas de trois."], [p, "Il faut diviser par $100$ : $1\\,\\% = 0{,}01$."]]),
        aides: ["« Pour cent » veut dire « divisé par $100$ ».", `Calcule $${nb(p)} \\div 100$.`, "Diviser par $100$ : la virgule recule de deux rangs."],
        solution: `$${nb(p)}\\,\\% = \\dfrac{${nb(p)}}{100} = ${nb(p / 100)}$` };
    }
    if (t === 2) {
      const v = pick([rand(1, 99) / 100, rand(1, 99) / 1000, rand(101, 300) / 100, rand(1, 9) / 10]);
      return { enonce: `Écris $${nb(v)}$ sous forme de pourcentage.`, mode: "nombre", prefixe: "Réponse :", suffixe: "%", attendu: +(v * 100).toFixed(6),
        erreurs: amErr([[v * 10, "Pour obtenir un pourcentage, on multiplie par $100$, pas par $10$."], [v * 1000, "On multiplie par $100$ : la virgule avance de deux rangs, pas de trois."], [v, "Il faut multiplier par $100$ : $0{,}01 = 1\\,\\%$."]]),
        aides: ["Un pourcentage, c'est une fraction de dénominateur $100$.", `Calcule $${nb(v)} \\times 100$.`, "Multiplier par $100$ : la virgule avance de deux rangs."],
        solution: `$${nb(v)} = \\dfrac{${nb(+(v * 100).toFixed(6))}}{100} = ${nb(+(v * 100).toFixed(6))}\\,\\%$` };
    }
    if (t === 3) {
      const d = pick([2, 4, 5, 10, 20, 25, 50, 8]); let n; do { n = rand(1, d + Math.floor(d / 2)); } while (n === d);
      return { enonce: `Écris $\\dfrac{${n}}{${d}}$ sous forme de pourcentage.`, mode: "nombre", prefixe: "Réponse :", suffixe: "%", attendu: +((100 * n) / d).toFixed(6),
        erreurs: amErr([[n / d, "Ça, c'est l'écriture décimale. Pour un pourcentage, on multiplie encore par $100$."], [n, "Le numérateur seul n'est pas le pourcentage : il faut d'abord ramener le dénominateur à $100$."], amDecimal((100 * d) / n) ? [(100 * d) / n, "Tu as divisé à l'envers : $\\dfrac{" + n + "}{" + d + "} = " + n + " \\div " + d + "$."] : null].filter(Boolean)),
        aides: ["Commence par l'écriture décimale de la fraction, ou cherche une fraction égale de dénominateur $100$.", `$\\dfrac{${n}}{${d}} = ${nb(n / d)}$.`, "Puis multiplie par $100$."],
        solution: `$\\dfrac{${n}}{${d}} = ${nb(n / d)} = ${nb(+((100 * n) / d).toFixed(6))}\\,\\%$` };
    }
    if (t === 4) {
      const p = pick([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 2, 4, 1, 125, 150]), g = pgcd(p, 100), F = (a, b) => `$\\dfrac{${a}}{${b}}$`;
      const m = melangeChoix(F(p / g, 100 / g), [p / g > 1 ? F(100 / g, p / g) : null, F(p, 10), p > 1 ? F(1, p) : null, F(p / g, 10), F(p / g + 1, 100 / g), F(p / g, 100 / g + 1)].filter((x) => x && x !== F(p / g, 100 / g)));
      return { enonce: `Quelle fraction irréductible est égale à $${p}\\,\\%$ ?`, mode: "choix", choix: m.choix, attendu: m.attendu,
        aides: [`$${p}\\,\\% = \\dfrac{${p}}{100}$.`, `Simplifie : $${p}$ et $100$ sont divisibles par $${g}$.`, "Vérifie en revenant au pourcentage."],
        solution: `$${p}\\,\\% = \\dfrac{${p}}{100} = \\dfrac{${p / g}}{${100 / g}}$` };
    }
    const [lig, col] = pick([[10, 10], [10, 10], [4, 5], [5, 5], [2, 5], [5, 10], [4, 10]]), N = lig * col, n = rand(1, N - 1), dec = Math.random() < 0.35, v = n / N;
    return {
      enonce: `Quelle proportion du quadrillage est coloriée ? Donne-la ${dec ? "sous forme décimale" : "en pourcentage"}.`,
      figure: amGrille(lig, col, n, `Quadrillage de ${lig} lignes et ${col} colonnes, ${n} cases coloriées`),
      mode: "nombre", prefixe: "Réponse :", suffixe: dec ? "" : "%", attendu: +(dec ? v : 100 * v).toFixed(6),
      erreurs: amErr([N !== 100 ? [n, `Ça, c'est le nombre de cases coloriées. Il y a $${N}$ cases en tout : la proportion est $\\dfrac{${n}}{${N}}$.`] : null, [dec ? 1 - v : 100 * (1 - v), "Ça, c'est la proportion de cases **non** coloriées."], dec ? [100 * v, "Ça, c'est le pourcentage. On demande l'écriture décimale."] : [v, "Ça, c'est l'écriture décimale. Pour le pourcentage, multiplie par $100$."]].filter(Boolean)),
      aides: [`Compte les cases : $${lig} \\times ${col} = ${N}$ cases en tout.`, `$${n}$ cases sont coloriées : la proportion est $\\dfrac{${n}}{${N}}$.`, dec ? "Écris cette fraction sous forme décimale." : `Écris-la avec le dénominateur $100$${N === 100 ? "" : ` (multiplie le numérateur et le dénominateur par $${nb(100 / N)}$)`}.`],
      solution: `Proportion coloriée : $\\dfrac{${n}}{${N}} = ${nb(v)} = ${nb(+(100 * v).toFixed(6))}\\,\\%$.`
    };
  };

  // Ordre de grandeur d'un produit ou d'un quotient (avec des situations de Mayotte)
  GEN["am-ordre-grandeur"] = function () {
    let b1, b2, est, op;
    if (Math.random() < 0.6) { b1 = pick([2, 3, 4, 5, 6, 8]) * 10 ** rand(1, 3); b2 = pick([2, 3, 5]) * 10 ** rand(-2, 1); est = b1 * b2; op = "\\times"; }
    else { b2 = pick([2, 3, 4, 5]) * 10 ** rand(-2, 0); est = pick([1, 2, 3, 5]) * 10 ** rand(1, 3); b1 = est * b2; op = "\\div"; }
    b1 = +b1.toPrecision(6); b2 = +b2.toPrecision(6); est = +est.toPrecision(6);
    let A, B; do { A = +(b1 * (1 + rand(-4, 4) / 100)).toPrecision(3); } while (A === b1);
    do { B = +(b2 * (1 + rand(-6, 6) / 100)).toPrecision(2); } while (B === b2 && Math.random() < 0.8);
    const start = -rand(0, 3), vals = [0, 1, 2, 3].map((k) => +(est * 10 ** (start + k)).toPrecision(6));
    let enonce = `Sans calculatrice, donne un ordre de grandeur de $${nb(A)} ${op} ${nb(B)}$.`;
    if (op === "\\times" && Math.random() < 0.4) {
      const ctx = [[B >= 1 && B <= 20 && A <= 900, `Au marché de Mamoudzou, une coopérative vend $${nb(A)}$ kg de bananes à $${nb(B)}$ € le kilo. Donne un ordre de grandeur de la recette, en euros.`], [A >= 20 && A <= 800 && B >= 1 && B <= 60, `Un taxi-brousse parcourt $${nb(A)}$ km par jour pendant $${nb(B)}$ jours. Donne un ordre de grandeur de la distance totale, en km.`], [B < 1, `Une parcelle de $${nb(A)}$ m² est plantée de vanille sur une proportion $${nb(B)}$ de sa surface. Donne un ordre de grandeur de l'aire plantée, en m².`]].find((c) => c[0]);
      if (ctx) enonce = ctx[1];
    }
    return {
      enonce, mode: "choix", choix: vals.map((v) => `$${nb(v)}$`), attendu: -start,
      aides: ["Arrondis chaque nombre à une valeur simple, avec un seul chiffre non nul.", `$${nb(A)} \\approx ${nb(b1)}$ et $${nb(B)} \\approx ${nb(b2)}$.`, `Calcule de tête $${nb(b1)} ${op} ${nb(b2)}$.`],
      solution: `$${nb(A)} ${op} ${nb(B)} \\approx ${nb(b1)} ${op} ${nb(b2)} = ${nb(est)}$`
    };
  };

  // Vraisemblance d'un résultat
  GEN["am-coherence"] = function () {
    const AIDES = ["Pense à une situation de la vie courante que tu connais.", "Vérifie l'ordre de grandeur et l'unité.", "Une proportion, une probabilité : entre $0$ et $1$. Une moyenne : entre la plus petite et la plus grande valeur."];
    const prenom = pick(["Faïza", "Nassim", "Anlia", "Ibrahim", "Zaïnaba", "Kamal", "Chadia", "Soumaïla", "Toiyb", "Roukia"]);
    const t = rand(0, 7);
    let q, bonne, fausses, expl, aides = AIDES;
    if (t === 0) {
      [q, bonne, fausses, expl] = pick([
        ["La hauteur d'une porte de maison est d'environ :", "$2$ m", ["$20$ m", "$2$ cm", "$0{,}2$ km"], "Une porte est un peu plus haute qu'une personne : environ $2$ m."],
        ["Un élève calcule la proportion de filles dans sa classe et trouve $1{,}25$. Que penser ?", "C'est impossible : une proportion est comprise entre $0$ et $1$", ["C'est possible s'il y a beaucoup de filles", "Cela veut dire qu'il y a $125$ filles", "Cela veut dire $1{,}25\\,\\%$ de filles"], "Une proportion $\\left(\\dfrac{\\text{partie}}{\\text{tout}}\\right)$ est toujours entre $0$ et $1$, soit entre $0\\,\\%$ et $100\\,\\%$."],
        ["La masse d'un litre d'eau est d'environ :", "$1$ kg", ["$10$ kg", "$100$ g", "$1$ g"], "Un litre d'eau pèse environ $1$ kg (une grande bouteille de $1{,}5$ L pèse $1{,}5$ kg)."],
        ["La vitesse d'une voiture sur une route nationale est d'environ :", "$80$ km/h", ["$8$ km/h", "$800$ km/h", "$80$ m/s"], "$80$ m/s, c'est $288$ km/h : beaucoup trop. $8$ km/h, c'est la vitesse d'un piéton qui court doucement."],
        ["Un article à $40$ € baisse de $25\\,\\%$. Un élève trouve un nouveau prix de $50$ €. Que penser ?", "C'est faux : après une baisse, le prix doit être inférieur à $40$ €", ["C'est juste", "C'est juste si le magasin le décide", "C'est faux : il fallait trouver $65$ €"], "Après une baisse, le nouveau prix est plus petit. Ici : $40 \\times 0{,}75 = 30$ €."],
        ["La superficie de Mayotte est d'environ :", "$374$ km²", ["$374$ m²", "$37\\,400$ km²", "$3{,}74$ km²"], "Mayotte mesure environ $374$ km² ($374$ m², c'est la taille d'une grande maison)."],
        ["Un élève trouve une probabilité égale à $-0{,}2$. Que penser ?", "C'est faux : une probabilité est comprise entre $0$ et $1$", ["C'est un événement très rare", "C'est un événement impossible", "Il faut l'écrire $-20\\,\\%$"], "Une probabilité n'est jamais négative : il y a une erreur de calcul."],
        ["Le volume d'une bouteille d'eau est d'environ :", "$1{,}5$ L", ["$1{,}5$ m³", "$15$ mL", "$150$ L"], "$1$ m³ $= 1\\,000$ L : c'est le volume d'une grande cuve, pas d'une bouteille."],
        ["Un élève calcule la moyenne de ses notes sur $20$ et trouve $23{,}5$. Que penser ?", "C'est faux : une moyenne est entre la plus petite et la plus grande valeur", ["C'est possible avec des bonus", "C'est juste s'il a beaucoup de notes", "Cela fait $11{,}75$ sur $10$"], "La moyenne est toujours comprise entre la plus petite et la plus grande note, donc ici entre $0$ et $20$."]
      ]);
    } else if (t === 1) {
      // ordre de grandeur d'un produit : résultat juste ou décalé d'un facteur 10 ou 100
      const a = pick([2, 3, 4, 5, 6, 8]), k = rand(2, 3), b = pick([2, 3, 4, 5]), m = rand(1, 2);
      const A = Math.round(a * 10 ** k * (1 + randNZ(-4, 4) / 100)), B = +(b * 10 ** -m * (1 + randNZ(-4, 4) / 100)).toFixed(m + 2);
      const fac = pick([1, 1, 10, 0.1, 100]), R = +(A * B * fac).toPrecision(3), est = +(a * 10 ** k * b * 10 ** -m).toFixed(4);
      const C = ["Plausible : l'ordre de grandeur est bon", "Pas plausible : le résultat est environ $10$ fois trop grand", "Pas plausible : le résultat est environ $10$ fois trop petit", "Pas plausible : le résultat est environ $100$ fois trop grand"];
      const k0 = { 1: 0, 10: 1, 0.1: 2, 100: 3 }[fac];
      q = `${prenom} trouve que $${nb(A)} \\times ${nb(B)} \\approx ${nb(R)}$. Est-ce plausible ?`;
      bonne = C[k0]; fausses = C.filter((_, j) => j !== k0);
      expl = `Ordre de grandeur : $${nb(A)} \\times ${nb(B)} \\approx ${nb(a * 10 ** k)} \\times ${nb(+(b * 10 ** -m).toFixed(2))} = ${nb(est)}$.` + (fac === 1 ? ` Le résultat $${nb(R)}$ est bien de cet ordre (valeur exacte : $${nb(+(A * B).toFixed(6))}$).` : ` Le résultat $${nb(R)}$ en est loin : il y a une erreur de virgule (valeur exacte : $${nb(+(A * B).toFixed(6))}$).`);
      aides = ["Arrondis chaque nombre à une valeur simple, avec un seul chiffre non nul.", `$${nb(A)} \\approx ${nb(a * 10 ** k)}$ et $${nb(B)} \\approx ${nb(+(b * 10 ** -m).toFixed(2))}$.`, "Compare l'ordre de grandeur obtenu avec le résultat proposé."];
    } else if (t === 2) {
      // proportion : juste ou supérieure à 1 (division à l'envers)
      const N = rand(24, 36), k = rand(9, N - 6), juste = Math.random() < 0.4;
      const p = juste ? +(k / N).toFixed(2) : +(N / k).toFixed(2);
      const qui = pick([["de filles", "filles"], ["d'élèves qui viennent en bus", "élèves qui viennent en bus"], ["d'élèves demi-pensionnaires", "demi-pensionnaires"], ["d'élèves qui prennent la barge", "élèves qui prennent la barge"]]);
      q = `Dans une classe de $${N}$ élèves, il y a $${k}$ ${qui[1]}. ${prenom} calcule la proportion ${qui[0]} et trouve $${nb(p)}$. Que penser ?`;
      const C = ["C'est plausible", "C'est impossible : une proportion est comprise entre $0$ et $1$", "C'est impossible : une proportion doit être un nombre entier", "C'est impossible : il fallait trouver plus de $1$"];
      bonne = juste ? C[0] : C[1]; fausses = C.filter((c) => c !== bonne);
      expl = juste ? `La proportion vaut $\\dfrac{${k}}{${N}} \\approx ${nb(p)}$ : c'est bien entre $0$ et $1$, et c'est juste.` : `Une proportion $\\left(\\dfrac{\\text{partie}}{\\text{tout}}\\right)$ est toujours entre $0$ et $1$. ${prenom} a divisé à l'envers : $\\dfrac{${N}}{${k}} \\approx ${nb(p)}$, au lieu de $\\dfrac{${k}}{${N}} \\approx ${nb(+(k / N).toFixed(2))}$.`;
    } else if (t === 3) {
      // évolution en pourcentage : le prix doit baisser (ou augmenter)
      const [obj, prix] = pick([["Un pagne", [20, 30, 40]], ["Un sac de riz", [20, 30, 40]], ["Un ventilateur", [40, 50, 60, 80]], ["Un téléphone", [120, 150, 200]], ["Un vélo", [120, 150, 200]], ["Un salouva", [40, 50, 60]]]);
      const P = pick(prix), tx = pick([10, 20, 25, 30, 40, 50].filter((x) => x < P / 2 + 1)), baisse = Math.random() < 0.6, juste = Math.random() < 0.4;
      const CM = baisse ? 1 - tx / 100 : 1 + tx / 100, ok = +(P * CM).toFixed(2), Q = juste ? ok : +(P * (baisse ? 1 + tx / 100 : 1 - tx / 100)).toFixed(2);
      q = `${obj} à $${nb(P)}$ € ${baisse ? "baisse" : "augmente"} de $${tx}\\,\\%$. ${prenom} trouve un nouveau prix de $${nb(Q)}$ €. Que penser ?`;
      const faux = `C'est faux : après ${baisse ? "une baisse" : "une hausse"}, le prix doit être ${baisse ? "inférieur" : "supérieur"} à $${nb(P)}$ €`;
      bonne = juste ? "C'est juste" : faux;
      fausses = juste ? [faux, `C'est faux : il fallait trouver $${nb(baisse ? P - tx : P + tx)}$ €`, "On ne peut pas savoir sans calculatrice"] : ["C'est juste", `C'est faux : il fallait trouver $${nb(baisse ? P - tx : P + tx)}$ €`, "C'est juste si le magasin le décide"];
      expl = `${baisse ? "Après une baisse, le nouveau prix est plus petit" : "Après une hausse, le nouveau prix est plus grand"}. Ici : $${nb(P)} \\times ${nb(CM)} = ${nb(ok)}$ €.` + (juste ? "" : ` ${prenom} a fait ${baisse ? "une hausse" : "une baisse"} au lieu d'${baisse ? "une baisse" : "une hausse"}.`);
      aides = [`${baisse ? "Une baisse" : "Une hausse"} : le nouveau prix doit-il être plus grand ou plus petit que $${nb(P)}$ € ?`, `Le coefficient multiplicateur est $1 ${baisse ? "-" : "+"} ${nb(tx / 100)} = ${nb(CM)}$.`, `Calcule $${nb(P)} \\times ${nb(CM)}$ et compare avec $${nb(Q)}$ €.`];
    } else if (t === 4) {
      // moyenne de notes : entre la plus petite et la plus grande
      const n = rand(3, 5), notes = Array.from({ length: n }, () => rand(6, 17)), S = notes.reduce((x, y) => x + y, 0);
      const mn = Math.min(...notes), mx = Math.max(...notes), moy = +(S / n).toFixed(2), juste = Math.random() < 0.4;
      const fauxM = S / (n - 1) > mx ? +(S / (n - 1)).toFixed(2) : S, m = juste ? moy : fauxM;
      q = `Les notes ${deN(prenom)} sont $${notes.join("$ ; $")}$. ${prenom} calcule sa moyenne et trouve $${nb(m)}$. Que penser ?`;
      const C = ["C'est plausible", "C'est faux : une moyenne est entre la plus petite et la plus grande valeur", "C'est faux : une moyenne est toujours un nombre entier", "C'est possible avec des bonus"];
      bonne = juste ? C[0] : C[1]; fausses = C.filter((c) => c !== bonne);
      expl = `La moyenne est comprise entre la plus petite note ($${mn}$) et la plus grande ($${mx}$). Ici : $\\dfrac{${notes.join(" + ")}}{${n}} = \\dfrac{${S}}{${n}} ${Number.isInteger((S * 100) / n) ? "=" : "\\approx"} ${nb(moy)}$.` + (juste ? "" : ` ${m === S ? `${prenom} a oublié de diviser par $${n}$.` : `${prenom} a divisé par $${n - 1}$ au lieu de $${n}$.`}`);
      aides = ["Repère la plus petite et la plus grande note.", "Une moyenne est toujours comprise entre la plus petite et la plus grande valeur.", `Vérifie : $${nb(m)}$ est-il entre $${mn}$ et $${mx}$ ?`];
    } else if (t === 5) {
      // conversion km/h → m/s
      const [veh, vs] = pick([["de la barge", [18]], ["d'un cycliste", [18, 36]], ["d'un scooter", [36, 54, 72]], ["d'un taxi-brousse", [54, 72, 90]], ["d'une voiture sur la route nationale", [72, 90]], ["d'un avion au décollage à Pamandzi", [252, 288]]]);
      const v = pick(vs), juste = Math.random() < 0.45, w = juste ? v / 3.6 : +(v * 3.6).toFixed(1);
      q = `${prenom} convertit en m/s la vitesse ${veh}, $${v}$ km/h, et trouve $${nb(w)}$ m/s. Que penser ?`;
      const C = ["C'est plausible", "C'est faux : en m/s, le nombre doit être plus petit qu'en km/h", "C'est faux : en m/s, le nombre doit être plus grand qu'en km/h", "C'est faux : les deux nombres doivent être égaux"];
      bonne = juste ? C[0] : C[1]; fausses = C.filter((c) => c !== bonne);
      expl = `$1$ m/s $= 3{,}6$ km/h (en $1$ h, soit $3\\,600$ s, on parcourt $3\\,600$ m, soit $3{,}6$ km). De km/h vers m/s, on **divise** par $3{,}6$ : $${v} \\div 3{,}6 = ${nb(v / 3.6)}$ m/s.` + (juste ? "" : ` ${prenom} a multiplié au lieu de diviser.`);
      aides = ["$1$ m/s $= 3{,}6$ km/h.", "De km/h vers m/s, on divise par $3{,}6$ : le nombre devient plus petit.", `Calcule $${v} \\div 3{,}6$.`];
    } else if (t === 6) {
      // hypoténuse d'un triangle rectangle
      const [a, b, c] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [12, 16, 20], [7, 24, 25]]);
      const cas = rand(0, 2), h = [c, a + b, Math.round(Math.sqrt(b * b - a * a) * 10) / 10][cas];
      q = `Un triangle rectangle a des côtés de l'angle droit de $${a}$ cm et $${b}$ cm. ${prenom} trouve une hypoténuse de $${nb(h)}$ cm. Que penser ?`;
      // une seule raison « c'est faux » vraie par cas, pour éviter deux réponses défendables
      [bonne, fausses] = [
        ["C'est plausible", ["C'est faux : l'hypoténuse est toujours égale à la somme des deux autres côtés", `C'est faux : elle mesure $${a + b}$ cm`, "C'est faux : l'hypoténuse est le plus petit côté"]],
        ["C'est faux : l'hypoténuse est plus courte que la somme des deux autres côtés", [`C'est juste : $${a} + ${b} = ${a + b}$`, "C'est juste si le triangle est grand", `C'est faux : elle mesure $${a * b}$ cm`]],
        ["C'est faux : l'hypoténuse est le plus long côté du triangle rectangle", ["C'est plausible", `C'est faux : elle mesure $${a + b}$ cm`, "C'est juste si le triangle est petit"]]
      ][cas];
      expl = [`$${a}^2 + ${b}^2 = ${a * a + b * b} = ${c}^2$ : l'hypoténuse mesure bien $${c}$ cm, plus que chaque côté de l'angle droit et moins que leur somme.`, `Dans un triangle, un côté est toujours plus court que la somme des deux autres. Ici $\\sqrt{${a}^2 + ${b}^2} = \\sqrt{${a * a + b * b}} = ${c}$ cm.`, `L'hypoténuse est le plus long côté : elle doit dépasser $${b}$ cm. ${prenom} a soustrait les carrés au lieu de les additionner : $\\sqrt{${a}^2 + ${b}^2} = ${c}$ cm.`][cas];
      aides = ["Dans un triangle rectangle, l'hypoténuse est le plus long côté.", "Dans un triangle, un côté est toujours plus court que la somme des deux autres.", `Pythagore : l'hypoténuse vaut $\\sqrt{${a}^2 + ${b}^2}$.`];
    } else {
      // ordre de grandeur de la vie courante (Mayotte)
      const [quoi, bon, faux, ex] = pick([
        ["La longueur d'une pirogue de pêcheur est d'environ :", "$5$ m", ["$5$ km", "$5$ cm", "$50$ m"], "Une pirogue mesure quelques mètres : à peu près la longueur d'une voiture."],
        ["La masse d'un régime de bananes est d'environ :", "$20$ kg", ["$20$ t", "$20$ g", "$200$ kg"], "Un régime se porte à bout de bras ou sur l'épaule : quelques dizaines de kilogrammes."],
        ["La durée de la traversée en barge entre Mamoudzou et Dzaoudzi est d'environ :", "$20$ min", ["$20$ h", "$20$ s", "$2$ jours"], "La barge traverse le lagon en un quart d'heure à une demi-heure."],
        ["La hauteur d'un cocotier adulte est d'environ :", "$20$ m", ["$20$ km", "$20$ cm", "$2$ m"], "Un cocotier adulte est bien plus haut qu'une maison : une vingtaine de mètres."],
        ["La masse d'une mangue est d'environ :", "$400$ g", ["$400$ kg", "$4$ g", "$40$ kg"], "Une mangue tient dans la main : quelques centaines de grammes."],
        ["L'aire d'une salle de classe est d'environ :", "$60$ m²", ["$60$ km²", "$60$ cm²", "$6\\,000$ m²"], "Une salle de $8$ m sur $7{,}5$ m a une aire de $60$ m²."],
        ["La distance par la route entre Mamoudzou et Sada est d'environ :", "$25$ km", ["$25$ m", "$2\\,500$ km", "$250$ km"], "Mayotte est petite : on la traverse en voiture en moins d'une heure, la distance se compte en dizaines de kilomètres."],
        ["La masse d'une tortue verte adulte est d'environ :", "$100$ kg", ["$100$ g", "$100$ t", "$1$ kg"], "Une tortue verte adulte pèse souvent entre $60$ et $150$ kg."],
        ["La vitesse d'un scooter en ville est d'environ :", "$40$ km/h", ["$400$ km/h", "$4$ km/h", "$40$ m/s"], "$40$ m/s, c'est $144$ km/h : beaucoup trop en ville. $4$ km/h, c'est la vitesse d'un piéton."],
        ["La masse d'un sac de riz vendu à la boutique est d'environ :", "$25$ kg", ["$250$ kg", "$25$ g", "$2{,}5$ t"], "Un sac de riz courant pèse quelques kilogrammes ($5$ kg, $25$ kg)."],
        ["La hauteur du mont Choungui est d'environ :", "$600$ m", ["$60$ km", "$6$ m", "$6\\,000$ m"], "Le Choungui culmine à près de $600$ m : on le gravit à pied en une à deux heures."]
      ]);
      if (Math.random() < 0.5) { q = quoi; bonne = bon; fausses = faux; expl = ex; }
      else {
        const v = pick(faux.slice(0, 2)), sujet = quoi.replace(" est d'environ :", "").replace(/^La /, "la ").replace(/^L'/, "l'");
        q = `${prenom} trouve que ${sujet} est de ${v}. Est-ce vraisemblable ?`;
        bonne = `Non : c'est plutôt de l'ordre de ${bon}`; fausses = ["Oui, c'est vraisemblable", ...faux.filter((f) => f !== v).map((f) => `Non : c'est plutôt de l'ordre de ${f}`)];
        expl = ex;
      }
      aides = ["Pense à une situation de la vie courante que tu connais.", "Vérifie l'ordre de grandeur et l'unité.", "Compare avec un objet que tu connais bien (ta taille, une bouteille d'eau, une voiture…)."];
    }
    const m = melangeChoix(bonne, fausses);
    return { enonce: q, mode: "choix", choix: m.choix, attendu: m.attendu, aides, solution: `**${bonne}**.\n\n${expl}` };
  };

  /* ===== Calcul algébrique ===== */
  // Remplacer des lettres par des nombres
  GEN["am-substituer"] = function () {
    const a = randNZ(-5, 6), b = randNZ(-5, 6), k = rand(2, 5), m = rand(2, 4);
    const E = pick([
      [`${k}a - ${m}b`, k * a - m * b, `${k} \\times ${par(a)} - ${m} \\times ${par(b)}`, b < 0 ? [[k * a + m * b, `Attention : $-${m} \\times ${par(b)} = +${-m * b}$ (moins par moins donne plus).`]] : []],
      [`a^2 + b`, a * a + b, `${par(a)}^2 + ${par(b)}`, a < 0 ? [[-(a * a) + b, `$(${a})^2 = ${a * a}$ : le carré d'un nombre négatif est positif.`]] : [[2 * a + b, "$a^2 = a \\times a$, et non $2 \\times a$."]]],
      [`(a - b)^2`, (a - b) ** 2, `(${a} - ${par(b)})^2`, [[a * a - b * b, "$(a - b)^2 \\neq a^2 - b^2$ : calcule d'abord la parenthèse, puis le carré."]]],
      [`ab + ${k}`, a * b + k, `${par(a)} \\times ${par(b)} + ${k}`, [[a + b + k, "$ab$ veut dire $a \\times b$."]]],
      [`-a^2 + ${k}b`, -a * a + k * b, `-${par(a)}^2 + ${k} \\times ${par(b)}`, [[a * a + k * b, "$-a^2$ : on calcule d'abord $a^2$, puis on prend l'opposé. Le résultat de $-a^2$ est toujours négatif ou nul."]]],
      [`${k}(a + b)`, k * (a + b), `${k} \\times (${a} + ${par(b)})`, [[k * a + b, `On multiplie **toute** la parenthèse par $${k}$.`]]],
      [`\\dfrac{a + b}{2}`, (a + b) / 2, `\\dfrac{${a} + ${par(b)}}{2}`, [[a + b / 2, "La barre de fraction joue le rôle de parenthèses : on calcule d'abord $a + b$."]]]
    ]);
    return {
      enonce: `Calcule $${E[0]}$ pour $a = ${a}$ et $b = ${b}$.`,
      mode: "nombre", prefixe: "Résultat :", attendu: E[1], erreurs: amErr(E[3]),
      aides: ["Remplace chaque lettre par sa valeur, entre parenthèses si elle est négative.", `On calcule $${E[2]}$.`, "Priorités : parenthèses, puissances, puis multiplications, puis additions et soustractions."],
      solution: `$${E[2]} = ${nb(E[1])}$`
    };
  };

  // Calcul littéral élémentaire (programme 2026) : signes, produits, quotients et inverses avec des lettres
  GEN["am-litteral-elem"] = function () {
    const k = rand(2, 9), m = rand(2, 9);
    if (Math.random() < 0.6) {
      const T = [
        [`$-(x + ${k}) = -x - ${k}$`, true, "le signe $-$ devant la parenthèse change le signe de chaque terme."],
        [`$-(x - ${k}) = ${k} - x$`, true, `$-(x - ${k}) = -x + ${k} = ${k} - x$.`],
        [`$-(x - ${k}) = -x - ${k}$`, false, `$-(x - ${k}) = -x + ${k}$ : le $-${k}$ devient $+${k}$.`],
        [`$-(a + b) = -a + b$`, false, "les deux termes changent de signe : $-(a + b) = -a - b$."],
        [`$${k}x + ${m}x = ${k + m}x$`, true, `on factorise : $${k}x + ${m}x = (${k} + ${m})x = ${k + m}x$.`],
        [`$${k}x \\times ${m}x = ${k * m}x$`, false, `$${k}x \\times ${m}x = ${k * m}x^2$ : $x \\times x = x^2$.`],
        ["$x \\times x = 2x$", false, "$x \\times x = x^2$, alors que $x + x = 2x$."],
        ["$x + x = 2x$", true, "$x + x = 1x + 1x = 2x$."],
        [`$\\dfrac{${k}x}{${k}} = x$`, true, `on simplifie par $${k}$.`],
        ["$\\dfrac{x}{-1} = -x$", true, "diviser par $-1$, c'est prendre l'opposé."],
        ["$(-1) \\times (-x) = -x$", false, "$(-1) \\times (-x) = x$ : moins par moins donne plus."],
        ["$0 \\times x = x$", false, "$0 \\times x = 0$ pour tout nombre $x$."],
        ["$\\dfrac{0}{a} = 0$", true, "zéro divisé par un nombre non nul vaut $0$."],
        ["$\\dfrac{1}{\\frac{1}{a}} = a$", true, "l'inverse de l'inverse de $a$ est $a$."],
        ["$a \\times \\dfrac{1}{b} = \\dfrac{a}{b}$", true, "multiplier par l'inverse de $b$, c'est diviser par $b$."],
        ["$\\dfrac{a}{b} + \\dfrac{c}{d} = \\dfrac{a + c}{b + d}$", false, "on n'additionne pas les dénominateurs : $\\dfrac{a}{b} + \\dfrac{c}{d} = \\dfrac{ad + bc}{bd}$."],
        ["$\\dfrac{a}{b} \\times \\dfrac{c}{d} = \\dfrac{ac}{bd}$", true, "on multiplie les numérateurs entre eux et les dénominateurs entre eux."],
        ["$\\dfrac{a}{b} \\div \\dfrac{c}{d} = \\dfrac{ad}{bc}$", true, "diviser par $\\dfrac{c}{d}$, c'est multiplier par son inverse $\\dfrac{d}{c}$."],
        ["$\\dfrac{a}{b} \\div \\dfrac{c}{d} = \\dfrac{ac}{bd}$", false, "ça, c'est le produit ; pour diviser, on multiplie par l'inverse : $\\dfrac{ad}{bc}$."],
        ["$\\dfrac{a + b}{a} = 1 + b$", false, "$\\dfrac{a + b}{a} = 1 + \\dfrac{b}{a}$ : on ne simplifie pas un terme d'une somme."],
        [`$\\dfrac{${k}a}{${k}b} = \\dfrac{a}{b}$`, true, `on simplifie par le facteur commun $${k}$.`],
        ["$-a - b = -(a - b)$", false, "$-(a - b) = -a + b$ ; en fait $-a - b = -(a + b)$."],
        ["$(-a)^2 = a^2$", true, "$(-a) \\times (-a) = a \\times a$."],
        ["$-a^2 = (-a)^2$", false, "$-a^2$ est l'opposé de $a^2$, alors que $(-a)^2 = a^2$."],
        ["$\\dfrac{-a}{-b} = \\dfrac{a}{b}$", true, "on peut changer le signe du numérateur et du dénominateur."],
        [`$(${k}x)^2 = ${k}x^2$`, false, `$(${k}x)^2 = ${k * k}x^2$ : le carré porte aussi sur $${k}$.`],
        [`$(${k}x)^2 = ${k * k}x^2$`, true, `$(${k}x)^2 = ${k}^2 \\times x^2 = ${k * k}x^2$.`],
        [`$${k}(x + ${m}) = ${k}x + ${m}$`, false, `on multiplie chaque terme : $${k}(x + ${m}) = ${k}x + ${k * m}$.`]
      ];
      const q = vraiFaux4(T, ["Les lettres désignent des nombres non nuls.", "Teste chaque égalité avec des valeurs simples, par exemple $a = 2$, $b = 3$, $x = 5$.", "Rappels : $-(a - b) = b - a$, $x \\times x = x^2$, $\\dfrac{a}{b} \\div \\dfrac{c}{d} = \\dfrac{a}{b} \\times \\dfrac{d}{c}$."]);
      q.enonce = "Les lettres désignent des nombres non nuls. " + q.enonce;
      return q;
    }
    let p, q, r, s; do { p = rand(1, 9); q = rand(2, 9); r = rand(1, 9); s = rand(2, 9); } while (pgcd(p * r, q * s) === p * r * q * s || p === q || r === s);
    const F = (n, d, x) => (frac(n, d) === "1" && x ? x : `${frac(n, d)}${x || ""}`), div = Math.random() < 0.5, X = (c) => (c === 1 ? "x" : `${c}x`);
    const [ex, bonne, fausses, calc] = div
      ? [`\\dfrac{${X(p)}}{${q}} \\div \\dfrac{${X(r)}}{${s}}`, F(p * s, q * r), [F(p * r, q * s), F(p * s, q * r, "x"), F(q * r, p * s), F(p * r, q * s, "x^2")], `\\dfrac{${X(p)}}{${q}} \\times \\dfrac{${s}}{${X(r)}} = \\dfrac{${X(p * s)}}{${X(q * r)}}`]
      : [`\\dfrac{${X(p)}}{${q}} \\times \\dfrac{${r}}{${X(s)}}`, F(p * r, q * s), [F(p * r, q * s, "x"), F(p * s, q * r), F(p * r, q * s, "x^2"), F(q * s, p * r)], `\\dfrac{${p} \\times ${r} \\times x}{${q} \\times ${s} \\times x} = \\dfrac{${X(p * r)}}{${X(q * s)}}`];
    const ms = melangeChoix(`$${bonne}$`, fausses.map((f) => `$${f}$`));
    return {
      enonce: `Pour $x \\neq 0$, écris le plus simplement possible : $${ex}$.`, mode: "choix", choix: ms.choix, attendu: ms.attendu,
      aides: [div ? "Diviser par une fraction, c'est multiplier par son inverse." : "On multiplie les numérateurs entre eux et les dénominateurs entre eux.", `$${ex} = ${calc}$.`, "Simplifie par $x$ (il est au numérateur et au dénominateur), puis réduis la fraction."],
      solution: `$${ex} = ${calc} = ${bonne}$`
    };
  };

  // Réduire une expression
  GEN["am-reduire"] = function () {
    let a, b, c, d; do { a = randNZ(-7, 7); b = randNZ(-9, 9); c = randNZ(-7, 7); d = randNZ(-9, 9); } while (a + c === 0 || b + d === 0);
    const termes = shuffle([[a, "x"], [b, ""], [c, "x"], [d, ""]]);
    let expr = "";
    termes.forEach(([v, x], i) => {
      const abs = Math.abs(v), coef = x && abs === 1 ? "" : `${abs}`;
      expr += i === 0 ? `${v < 0 ? "-" : ""}${coef}${x}` : ` ${v < 0 ? "-" : "+"} ${coef}${x}`;
    });
    const bonne = poly([a + c, b + d]);
    const m = melangeChoix(bonne, [poly([a - c, b + d]), poly([a + c, b - d]), poly([a + c + b + d, 0]), poly([-(a + c), b + d]), poly([a + c, -(b + d)])]);
    return {
      enonce: `Réduis l'expression $${expr}$.`,
      mode: "choix", choix: m.choix.map((x) => `$${x}$`), attendu: m.attendu,
      aides: ["Regroupe les termes en $x$ entre eux, et les nombres entre eux.", `Termes en $x$ : $${par(a)} + ${par(c)} = ${a + c}$.`, `Nombres : $${par(b)} + ${par(d)} = ${b + d}$. On ne peut pas additionner un terme en $x$ et un nombre.`],
      solution: `$${expr} = ${bonne}$`
    };
  };

  // Équations et inéquations du premier degré, équation x² = a
  GEN["am-premier-degre"] = function () {
    const t = rand(0, 9);
    if (t <= 2) return GEN["auto-equations"](0);
    if (t === 3) return GEN["auto-equations"](4);
    if (t === 4) {
      let a, b; do { a = randNZ(-9, 9); b = randNZ(-20, 20); } while (Math.abs(a) < 2 || b % a === 0);
      const v = b / a, e = amErr([[a / b, "On divise le nombre par le coefficient de $x$ : $x = \\dfrac{b}{a}$, pas $\\dfrac{a}{b}$."], [b - a, "On ne soustrait pas : $" + a + "$ multiplie $x$, donc on **divise** par $" + a + "$."], [-b / a, "Attention au signe du quotient."]]);
      if (!amDecimal(v)) e.push(...amApprox(v));
      return {
        enonce: `Résous l'équation $${a}x = ${b}$. Donne la valeur exacte de la solution (fraction si besoin).`, mode: "nombre", prefixe: "x =", attendu: v, erreurs: e,
        aides: [`$x$ est multiplié par $${a}$ : on divise les deux membres par $${a}$.`, `$x = \\dfrac{${b}}{${a}}$.`, "Simplifie la fraction si c'est possible, et fais attention au signe."],
        solution: `$${a}x = ${b} \\iff x = \\dfrac{${b}}{${a}} = ${frac(b, a)}$`
      };
    }
    const a = randNZ(-6, 6), b = randNZ(-9, 9), r = randNZ(-6, 6), c = a * r + b;
    const s = pick(["<", "\\leqslant", ">", "\\geqslant"]), flip = { "<": ">", ">": "<", "\\leqslant": "\\geqslant", "\\geqslant": "\\leqslant" };
    const sb = a > 0 ? s : flip[s], bonne = `x ${sb} ${r}`, choix = [`x ${s} ${r}`, `x ${flip[s]} ${r}`, `x ${s} ${-r}`, `x ${flip[s]} ${-r}`], ax = poly([a, 0]);
    const droiteSol = /</.test(sb) || sb === "\\leqslant" ? { a: -Infinity, b: r, ga: false, gb: sb === "\\leqslant" } : { a: r, b: Infinity, ga: sb === "\\geqslant", gb: false };
    return {
      enonce: `Résous l'inéquation $${poly([a, b])} ${s} ${c}$.`,
      mode: "choix", choix: choix.map((x) => `$${x}$`), attendu: choix.indexOf(bonne),
      aides: ["Isole d'abord le terme en $x$, puis divise par le coefficient de $x$.", `$${ax} ${s} ${c} - ${par(b)}$, soit $${ax} ${s} ${c - b}$.`, a === 1 ? "Le coefficient de $x$ vaut $1$ : c'est fini." : a < 0 ? `Tu divises par $${a}$, un nombre **négatif** : le sens de l'inégalité change.` : `Tu divises par $${a}$, un nombre positif : le sens ne change pas.`],
      solution: `$${poly([a, b])} ${s} ${c} \\iff ${ax} ${s} ${c - b}${a === 1 ? "" : ` \\iff ${bonne}`}$` + (a < 0 ? "\n\nLe sens change car on divise par un nombre négatif." : "") + `\n\nLes solutions sont les nombres de l'intervalle $${droiteSol.a === -Infinity ? `]-\\infty\\,;${r}${droiteSol.gb ? "]" : "["}` : `${droiteSol.ga ? "[" : "]"}${r}\\,;+\\infty[`}$.`,
      figureSolution: droite({ min: r - 5, max: r + 5, intervalles: [droiteSol], aria: `Droite graduée : les solutions ${bonne.replace("\\leqslant", "≤").replace("\\geqslant", "≥")}` })
    };
  };

  // Isoler une variable
  GEN["am-isoler"] = function () {
    const t = rand(0, 6);
    let f, v, bonne, fausses, ex;
    const ajout = (b, membre) => (b > 0 ? `On soustrait $${b}$ : $${membre}` : `On ajoute $${-b}$ : $${membre}`);
    if (t === 0) {
      [f, v, bonne, fausses, ex] = pick([
        ["d = v \\times t", "t", "t = \\dfrac{d}{v}", ["t = \\dfrac{v}{d}", "t = d - v", "t = d \\times v"], "On divise les deux membres par $v$."],
        ["P = U \\times I", "I", "I = \\dfrac{P}{U}", ["I = \\dfrac{U}{P}", "I = P - U", "I = P \\times U"], "On divise les deux membres par $U$."],
        ["\\mathcal{A} = \\dfrac{b \\times h}{2}", "h", "h = \\dfrac{2\\mathcal{A}}{b}", ["h = \\dfrac{\\mathcal{A}}{2b}", "h = 2\\mathcal{A} - b", "h = \\dfrac{\\mathcal{A} \\times b}{2}"], "On multiplie par $2$ : $2\\mathcal{A} = b \\times h$, puis on divise par $b$."],
        ["y = 3x + 5", "x", "x = \\dfrac{y - 5}{3}", ["x = \\dfrac{y}{3} - 5", "x = 3y - 5", "x = \\dfrac{y + 5}{3}"], "On soustrait $5$ : $y - 5 = 3x$, puis on divise par $3$."],
        ["F = 1{,}8C + 32", "C", "C = \\dfrac{F - 32}{1{,}8}", ["C = \\dfrac{F}{1{,}8} - 32", "C = 1{,}8F - 32", "C = \\dfrac{F + 32}{1{,}8}"], "On soustrait $32$ : $F - 32 = 1{,}8C$, puis on divise par $1{,}8$."],
        ["E = mc^2", "m", "m = \\dfrac{E}{c^2}", ["m = E - c^2", "m = Ec^2", "m = \\dfrac{c^2}{E}"], "On divise les deux membres par $c^2$."],
        ["V = \\pi r^2 h", "h", "h = \\dfrac{V}{\\pi r^2}", ["h = V - \\pi r^2", "h = \\dfrac{\\pi r^2}{V}", "h = V \\pi r^2"], "On divise les deux membres par $\\pi r^2$."],
        ["P = 2(L + \\ell)", "L", "L = \\dfrac{P}{2} - \\ell", ["L = \\dfrac{P - \\ell}{2}", "L = 2P - \\ell", "L = P - 2\\ell"], "On divise par $2$ : $\\dfrac{P}{2} = L + \\ell$, puis on soustrait $\\ell$."],
        ["v = \\dfrac{d}{t}", "d", "d = v \\times t", ["d = \\dfrac{v}{t}", "d = \\dfrac{t}{v}", "d = v + t"], "On multiplie les deux membres par $t$."],
        ["v = \\dfrac{d}{t}", "t", "t = \\dfrac{d}{v}", ["t = d \\times v", "t = \\dfrac{v}{d}", "t = d - v"], "On multiplie par $t$ : $vt = d$, puis on divise par $v$."],
        ["E_c = \\dfrac{1}{2}mv^2", "m", "m = \\dfrac{2E_c}{v^2}", ["m = \\dfrac{E_c}{2v^2}", "m = 2E_c - v^2", "m = \\dfrac{2v^2}{E_c}"], "On multiplie par $2$ : $2E_c = mv^2$, puis on divise par $v^2$."],
        ["\\rho = \\dfrac{m}{V}", "V", "V = \\dfrac{m}{\\rho}", ["V = m \\times \\rho", "V = \\dfrac{\\rho}{m}", "V = m - \\rho"], "On multiplie par $V$ : $\\rho V = m$, puis on divise par $\\rho$."],
        ["P = 4c", "c", "c = \\dfrac{P}{4}", ["c = 4P", "c = P - 4", "c = \\dfrac{4}{P}"], "On divise les deux membres par $4$."],
        ["C = \\dfrac{n}{V}", "n", "n = C \\times V", ["n = \\dfrac{C}{V}", "n = \\dfrac{V}{C}", "n = C + V"], "On multiplie les deux membres par $V$."]
      ]);
    } else if (t === 1) {
      const a = rand(2, 9), b = randNZ(-12, 12);
      f = `y = ${a}x ${sg(b)}`; v = "x"; bonne = `x = \\dfrac{y ${sg(-b)}}{${a}}`;
      fausses = [`x = \\dfrac{y}{${a}} ${sg(-b)}`, `x = ${a}y ${sg(-b)}`, `x = \\dfrac{y ${sg(b)}}{${a}}`];
      ex = `${ajout(b, `y ${sg(-b)} = ${a}x`)}$, puis on divise par $${a}$.`;
    } else if (t === 2) {
      const a = rand(2, 20), b = rand(2, 9);
      f = `y = ${a} - ${b}x`; v = "x"; bonne = `x = \\dfrac{${a} - y}{${b}}`;
      fausses = [`x = \\dfrac{y - ${a}}{${b}}`, `x = ${a} - \\dfrac{y}{${b}}`, `x = \\dfrac{${a} + y}{${b}}`];
      ex = `On ajoute $${b}x$ et on soustrait $y$ : $${b}x = ${a} - y$, puis on divise par $${b}$.`;
    } else if (t === 3) {
      const a = rand(2, 9), b = rand(2, 9), c = rand(5, 30), isoY = Math.random() < 0.6;
      f = `${a}x + ${b}y = ${c}`;
      if (isoY) { v = "y"; bonne = `y = \\dfrac{${c} - ${a}x}{${b}}`; fausses = [`y = \\dfrac{${c} + ${a}x}{${b}}`, `y = ${c} - ${a}x - ${b}`, `y = \\dfrac{${c}}{${b}} - ${a}x`]; ex = `On soustrait $${a}x$ : $${b}y = ${c} - ${a}x$, puis on divise par $${b}$.`; }
      else { v = "x"; bonne = `x = \\dfrac{${c} - ${b}y}{${a}}`; fausses = [`x = \\dfrac{${c} + ${b}y}{${a}}`, `x = ${c} - ${b}y - ${a}`, `x = \\dfrac{${c}}{${a}} - ${b}y`]; ex = `On soustrait $${b}y$ : $${a}x = ${c} - ${b}y$, puis on divise par $${a}$.`; }
    } else if (t === 4) {
      const a = rand(2, 9), b = randNZ(-9, 9);
      f = `y = \\dfrac{x}{${a}} ${sg(b)}`; v = "x"; bonne = `x = ${a}(y ${sg(-b)})`;
      fausses = [`x = ${a}y ${sg(-b)}`, `x = \\dfrac{y ${sg(-b)}}{${a}}`, `x = ${a}(y ${sg(b)})`];
      ex = `${ajout(b, `y ${sg(-b)} = \\dfrac{x}{${a}}`)}$, puis on multiplie par $${a}$.`;
    } else if (t === 5) {
      const a = rand(2, 9), b = randNZ(-9, 9);
      f = `y = ${a}(x ${sg(b)})`; v = "x"; bonne = `x = \\dfrac{y}{${a}} ${sg(-b)}`;
      fausses = [`x = \\dfrac{y ${sg(-b)}}{${a}}`, `x = ${a}y ${sg(-b)}`, `x = \\dfrac{y}{${a}} ${sg(b)}`];
      ex = `On divise par $${a}$ : $\\dfrac{y}{${a}} = x ${sg(b)}$, puis on ${b > 0 ? `soustrait $${b}$` : `ajoute $${-b}$`}.`;
    } else {
      // formules de physique, de géométrie et de la vie courante
      [f, v, bonne, fausses, ex] = pick([
        ["U = R \\times I", "R", "R = \\dfrac{U}{I}", ["R = \\dfrac{I}{U}", "R = U - I", "R = U \\times I"], "On divise les deux membres par $I$."],
        ["U = R \\times I", "I", "I = \\dfrac{U}{R}", ["I = \\dfrac{R}{U}", "I = U - R", "I = U \\times R"], "On divise les deux membres par $R$."],
        ["P = 2\\pi r", "r", "r = \\dfrac{P}{2\\pi}", ["r = P - 2\\pi", "r = 2\\pi P", "r = \\dfrac{2\\pi}{P}"], "On divise les deux membres par $2\\pi$."],
        ["m = \\rho \\times V", "V", "V = \\dfrac{m}{\\rho}", ["V = \\dfrac{\\rho}{m}", "V = m - \\rho", "V = m \\times \\rho"], "On divise les deux membres par $\\rho$."],
        ["\\mathcal{A} = L \\times \\ell", "\\ell", "\\ell = \\dfrac{\\mathcal{A}}{L}", ["\\ell = \\dfrac{L}{\\mathcal{A}}", "\\ell = \\mathcal{A} - L", "\\ell = \\mathcal{A} \\times L"], "On divise les deux membres par $L$."],
        ["V = \\dfrac{1}{3} \\mathcal{B} h", "h", "h = \\dfrac{3V}{\\mathcal{B}}", ["h = \\dfrac{V}{3\\mathcal{B}}", "h = 3V - \\mathcal{B}", "h = \\dfrac{\\mathcal{B}}{3V}"], "On multiplie par $3$ : $3V = \\mathcal{B} h$, puis on divise par $\\mathcal{B}$."],
        ["E = P \\times t", "t", "t = \\dfrac{E}{P}", ["t = \\dfrac{P}{E}", "t = E - P", "t = E \\times P"], "On divise les deux membres par $P$."],
        ["y = mx + p", "p", "p = y - mx", ["p = y + mx", "p = \\dfrac{y}{mx}", "p = mx - y"], "On soustrait $mx$ aux deux membres."],
        ["y = mx + p", "m", "m = \\dfrac{y - p}{x}", ["m = \\dfrac{y}{x} - p", "m = \\dfrac{y + p}{x}", "m = (y - p)x"], "On soustrait $p$ : $y - p = mx$, puis on divise par $x$ (pour $x \\neq 0$)."],
        ["P = 2 + 0{,}5d", "d", "d = \\dfrac{P - 2}{0{,}5}", ["d = \\dfrac{P}{0{,}5} - 2", "d = 0{,}5P - 2", "d = \\dfrac{P + 2}{0{,}5}"], "On soustrait $2$ : $P - 2 = 0{,}5d$, puis on divise par $0{,}5$ (ce qui revient à multiplier par $2$)."],
        ["C = 15n + 40", "n", "n = \\dfrac{C - 40}{15}", ["n = \\dfrac{C}{15} - 40", "n = 15C - 40", "n = \\dfrac{C + 40}{15}"], "On soustrait $40$ : $C - 40 = 15n$, puis on divise par $15$."]
      ]);
    }
    const m = melangeChoix(bonne, fausses);
    return {
      enonce: `On donne la formule $${f}$. Exprime $${v}$ en fonction des autres lettres.`,
      mode: "choix", choix: m.choix.map((x) => `$${x}$`), attendu: m.attendu,
      aides: ["Fais les mêmes opérations des deux côtés de l'égalité, comme pour résoudre une équation.", "Enlève d'abord ce qui est ajouté ou soustrait, puis ce qui multiplie ou divise la lettre.", "Vérifie ta réponse avec des valeurs simples."],
      solution: `$${bonne}$. ${ex}`
    };
  };

  // Appliquer une formule (sciences, géométrie, vie courante à Mayotte)
  GEN["am-formule"] = function () {
    const T = [
      () => { const m = pick([2, 4, 6, 8, 10, 20, 50]), v = rand(2, 10); return [`L'énergie cinétique d'un objet est $E_c = \\dfrac{1}{2} m v^2$. Calcule $E_c$ pour $m = ${m}$ kg et $v = ${v}$ m/s.`, 0.5 * m * v * v, "J", `\\dfrac{1}{2} \\times ${m} \\times ${v}^2 = ${m / 2} \\times ${v * v}`, "Calcule d'abord la puissance : $v^2$.", [[m * v * v, "N'oublie pas le $\\dfrac{1}{2}$."], [0.5 * m * v, "Le carré porte sur $v$ : $v^2 = v \\times v$."], [0.5 * (m * v) ** 2, "Le carré ne porte que sur $v$, pas sur $m$."]]]; },
      () => { let B, b, h; do { B = rand(6, 14); b = rand(2, B - 2); h = rand(2, 10); } while (((B + b) * h) % 2); return [`L'aire d'un trapèze est $\\mathcal{A} = \\dfrac{(B + b) \\times h}{2}$. Calcule $\\mathcal{A}$ pour $B = ${B}$ cm, $b = ${b}$ cm et $h = ${h}$ cm.`, ((B + b) * h) / 2, "cm²", `\\dfrac{(${B} + ${b}) \\times ${h}}{2} = \\dfrac{${B + b} \\times ${h}}{2}`, "Les parenthèses d'abord : $B + b$.", [[(B + b) * h, "N'oublie pas de diviser par $2$."], [B + (b * h) / 2, "Les parenthèses d'abord : on calcule $B + b$ avant de multiplier par $h$."]], amForme("trapeze", [B, b, h], [`B = ${B} cm`, `b = ${b} cm`, `h = ${h} cm`], `Trapèze de grande base ${B} cm, de petite base ${b} cm et de hauteur ${h} cm`)]; },
      () => { const [qui, v] = pick([["Un taxi-brousse", pick([40, 50, 60, 80])], ["La barge", 12], ["Un scooter", pick([30, 40, 50])], ["Une voiture", pick([60, 80, 90, 100])]]), t = pick([0.25, 0.5, 0.75, 1.5, 2.5, 1.25]); return [`${qui} roule à la vitesse constante $v = ${v}$ km/h pendant $t = ${nb(t)}$ h. Calcule la distance parcourue $d = v \\times t$.`, v * t, "km", `${v} \\times ${nb(t)}`, `$${nb(t)}$ h, c'est ${t === 0.5 ? "une demi-heure" : t === 0.25 ? "un quart d'heure" : t === 0.75 ? "trois quarts d'heure" : t === 1.5 ? "une heure et demie" : t === 2.5 ? "deux heures et demie" : "une heure et quart"}.`, [[v / t, "On multiplie la vitesse par la durée : $d = v \\times t$."], [v + t, "On multiplie, on n'additionne pas."]]]; },
      () => { const R = pick([10, 20, 50, 100, 200]), I = pick([0.1, 0.2, 0.5, 1.5, 0.05, 2]); return [`La loi d'Ohm s'écrit $U = R \\times I$. Calcule $U$ pour $R = ${R}$ Ω et $I = ${nb(I)}$ A.`, R * I, "V", `${R} \\times ${nb(I)}`, "Multiplier par $10$ ou $100$ : la virgule avance.", [[R / I, "On multiplie $R$ par $I$."], [R + I, "On multiplie, on n'additionne pas."]]]; },
      () => { const C = 5 * rand(-2, 8); return [`Pour convertir des degrés Celsius en degrés Fahrenheit, on utilise $F = 1{,}8C + 32$. Calcule $F$ pour $C = ${C}$.`, 1.8 * C + 32, "°F", `1{,}8 \\times ${par(C)} + 32`, "La multiplication d'abord, l'addition ensuite.", [[1.8 * (C + 32), "La multiplication est prioritaire : on calcule $1{,}8 \\times C$ avant d'ajouter $32$."], [1.8 * C, "N'oublie pas d'ajouter $32$."]]]; },
      () => { const HT = 5 * rand(2, 60); return [`Le prix TTC se calcule avec la formule $\\text{TTC} = \\text{HT} \\times 1{,}2$. Calcule le prix TTC d'un article à $${HT}$ € HT.`, HT * 1.2, "€", `${HT} \\times 1{,}2`, `$${HT} \\times 1{,}2 = ${HT} + ${HT} \\times 0{,}2$.`, [[HT * 0.2, "Ça, c'est seulement la taxe : le prix TTC est $\\text{HT} \\times 1{,}2$."], [HT + 1.2, "On multiplie par $1{,}2$, on n'ajoute pas $1{,}2$."]]]; },
      () => { const L = rand(5, 30), l = rand(2, L - 1); return [`Le périmètre d'un rectangle est $P = 2(L + \\ell)$. Calcule $P$ pour $L = ${L}$ m et $\\ell = ${l}$ m.`, 2 * (L + l), "m", `2 \\times (${L} + ${l})`, "Les parenthèses d'abord.", [[2 * L + l, "Le $2$ multiplie toute la parenthèse : $2L + 2\\ell$."], [L * l, "Ça, c'est l'aire du rectangle."]], amForme("rect", [L, l], [`L = ${L} m`, `ℓ = ${l} m`], `Rectangle de ${L} m sur ${l} m`)]; },
      () => { const d = 2 * rand(2, 15); return [`À Mamoudzou, une course en taxi coûte $P = 2 + 0{,}5d$ euros pour un trajet de $d$ km. Calcule le prix d'un trajet de $${d}$ km.`, 2 + 0.5 * d, "€", `2 + 0{,}5 \\times ${d}`, "La multiplication d'abord.", [[2.5 * d, "La multiplication est prioritaire : on calcule $0{,}5 \\times d$, puis on ajoute $2$."], [0.5 * d, "N'oublie pas la prise en charge de $2$ €."]]]; },
      () => { const a = pick([6, 8, 10, 12]), b = pick([5, 10, 15]), t = rand(1, 8), [quoi, ou] = pick([["d'un kayak", "À N'Gouja"], ["d'un paddle", "À Sakouli"], ["d'un masque et d'un tuba", "À Moya"], ["d'un vélo", "À Dzaoudzi"]]); return [`${ou}, la location ${quoi} coûte $P = ${a}t + ${b}$ euros pour $t$ heures. Calcule le prix pour $${t}$ h.`, a * t + b, "€", `${a} \\times ${t} + ${b}`, "La multiplication d'abord.", [[a * (t + b), `La multiplication est prioritaire : $${a} \\times t$, puis $+ ${b}$.`], [(a + b) * t, `On ne peut pas regrouper $${a}t + ${b}$ en $${a + b}t$.`]]]; },
      () => { const [d, t] = pick([[30, 0.5], [45, 0.75], [60, 1.5], [90, 1.5], [120, 2], [150, 2.5], [40, 0.5], [75, 1.5], [12, 0.25]]); return [`Un trajet de $${d}$ km dure $${nb(t)}$ h. Calcule la vitesse moyenne $v = \\dfrac{d}{t}$.`, d / t, "km/h", `\\dfrac{${d}}{${nb(t)}}`, "Diviser par $0{,}5$, c'est multiplier par $2$.", [[d * t, "On divise la distance par la durée."], [t / d, "On divise la distance par la durée, pas l'inverse."]]]; },
      () => { const P = pick([60, 100, 1000, 1500, 2000, 800]), t = pick([0.5, 2, 3, 1.5, 4]); return [`Un appareil de puissance $P = ${nb(P)}$ W fonctionne pendant $t = ${nb(t)}$ h. Calcule l'énergie consommée $E = P \\times t$ en wattheures.`, P * t, "Wh", `${nb(P)} \\times ${nb(t)}`, "Décompose le calcul si besoin.", [[P / t, "On multiplie la puissance par la durée."], [P + t, "On multiplie, on n'additionne pas."]]]; }
    ];
    const [enonce, rep, suffixe, calc, astuce, err, fig] = pick(T)();
    return {
      enonce, figure: fig, mode: "nombre", prefixe: "Résultat :", suffixe, attendu: +rep.toFixed(6), erreurs: amErr(err),
      aides: ["Remplace chaque lettre de la formule par sa valeur.", `On calcule $${calc}$.`, astuce],
      solution: `$${calc} = ${nb(+rep.toFixed(6))}$ ${suffixe}.`
    };
  };

  // Équation produit nul
  const fx = (a, b) => (a === 1 && b === 0 ? "x" : `(${poly([a, b])})`);
  GEN["am-produit-nul"] = function () {
    const t = rand(0, 9), AIDE0 = "Un produit est nul si et seulement si l'un au moins de ses facteurs est nul.";
    if (t >= 8) {
      // x² = kx ou ax² + bx = 0 : on factorise d'abord
      const k = randNZ(-7, 7), a = pick([1, 1, 2, 3]), b = -a * k, ecrit = Math.random() < 0.5 && a === 1;
      const eq = ecrit ? `x^2 = ${k === 1 ? "" : k === -1 ? "-" : k}x` : `${poly([a, b, 0])} = 0`;
      return {
        enonce: `Résous l'équation $${eq}$.`,
        mode: "ensemble", prefixe: "Solutions :", attendu: [0, k],
        aides: [ecrit ? `Passe tout dans le même membre : $${poly([1, -k, 0])} = 0$. Ne divise pas par $x$ : tu perdrais une solution.` : "Mets $x$ en facteur.", `$${poly([a, b, 0])} = ${a === 1 ? "" : a}x(${poly([1, -k])})$.`, AIDE0 + " Donne les deux solutions séparées par « ; »."],
        solution: `$${poly([a, b, 0])} = 0 \\iff ${a === 1 ? "" : a}x(${poly([1, -k])}) = 0 \\iff x = 0$ ou $x = ${k}$.\n\n$S = \\{${[0, k].sort((x, y) => x - y).join("\\,;")}\\}$`
      };
    }
    const r1 = randNZ(-6, 6);
    let a2, b2, r2;
    if (t <= 3) { do { r2 = rand(-6, 6); } while (r2 === r1); a2 = 1; b2 = -r2; }
    else if (t <= 5) { a2 = pick([2, -2, 4, -4, 5]); do { b2 = randNZ(-9, 9); } while (b2 % a2 === 0 || (a2 === 4 && b2 % 2 === 0) || (a2 === -4 && b2 % 2 === 0)); r2 = -b2 / a2; }
    else { a2 = pick([3, -3, 6, 7]); do { b2 = randNZ(-11, 11); } while (pgcd(a2, b2) !== 1); r2 = -b2 / a2; }
    const f1 = fx(1, -r1), f2 = fx(a2, b2), prod = Math.random() < 0.5 ? `${f1}${f2}` : `${f2}${f1}`;
    const rtex = (r) => (r === r1 || Number.isInteger(r) ? `${r}` : frac(-b2, a2)), S = [r1, r2].sort((x, y) => x - y), dec = amDecimal(r2);
    const aides = [AIDE0, `$${poly([1, -r1])} = 0$ ou $${poly([a2, b2])} = 0$.`, `$${poly([a2, b2])} = 0 \\iff ${a2}x = ${-b2} \\iff x = \\dfrac{${-b2}}{${a2}}$.`];
    const sol = `$${prod} = 0 \\iff ${poly([1, -r1])} = 0$ ou $${poly([a2, b2])} = 0 \\iff x = ${r1}$ ou $x = ${rtex(r2)}$.`;
    if (t === 6 || t === 7) {
      // une solution fractionnaire : on la demande seule, en valeur exacte
      return {
        enonce: `L'équation $${prod} = 0$ a deux solutions : $${r1}$ et un nombre qui n'est pas entier. Quel est ce nombre ? Donne sa valeur exacte, sous forme de fraction.`,
        mode: "nombre", prefixe: "x =", attendu: r2,
        erreurs: amErr([[-r2, "Attention au signe : $" + poly([a2, b2]) + " = 0 \\iff " + a2 + "x = " + -b2 + "$."], [-a2 / b2, "Tu as inversé la fraction : on divise par le coefficient de $x$, qui est $" + a2 + "$."], [-b2 - a2, `Le $${a2}$ multiplie $x$ : pour l'enlever, on **divise** par $${a2}$, on ne soustrait pas.`]]).concat(dec ? [] : amApprox(r2)),
        aides, solution: `${sol}\n\nLe nombre cherché est $${rtex(r2)}$.`
      };
    }
    if (t === 4 || t === 5) {
      // QCM : quatre paires de solutions
      const T = (v) => (Number.isInteger(v) ? `${v}` : frac(Math.round(v * a2), a2)), P = ([x, y]) => `$${T(x)}$ et $${T(y)}$`;
      const ch = melangeChoix(P([r1, r2]), [[-r1, -r2], [r1, -b2], [-r1, r2], [r1, -r2]].filter(([x, y]) => x !== y).map(P));
      return {
        enonce: `Quelles sont les solutions de l'équation $${prod} = 0$ ?`,
        mode: "choix", choix: ch.choix, attendu: ch.attendu, aides, solution: sol
      };
    }
    return {
      enonce: `Résous l'équation $${prod} = 0$.`,
      mode: "ensemble", prefixe: "Solutions :", attendu: [r1, r2],
      aides: [AIDE0, `$${poly([1, -r1])} = 0$ ou $${poly([a2, b2])} = 0$.`, "Résous les deux équations, puis donne les deux solutions séparées par « ; »."],
      solution: `${sol}\n\n$S = \\{${S.map(rtex).join("\\,;")}\\}$`
    };
  };

  // Signe d'une expression du premier degré ou d'une expression factorisée du second degré (tableau de signes)
  GEN["am-signe"] = function () {
    const ps = (a, b) => poly([a, b]).replace(/-/g, "−"), sgn = (v) => (v > 0 ? "+" : "-");
    if (Math.random() < 0.45) {
      const a = randNZ(-5, 5), r = randNZ(-6, 6), b = -a * r, q = pick(["sp", "sn", "pn", "nn"]);
      const op = { sp: ">", sn: "<", pn: "\\geqslant", nn: "\\leqslant" }[q], mot = { sp: "strictement positive", sn: "strictement négative", pn: "positive ou nulle", nn: "négative ou nulle" }[q];
      const large = q === "pn" || q === "nn", G = large ? "\\geqslant" : ">", Lo = large ? "\\leqslant" : "<", droiteSup = (q === "sp" || q === "pn") === a > 0;
      const choix = [`x ${G} ${r}`, `x ${Lo} ${r}`, `x ${G} ${-r}`, `x ${Lo} ${-r}`], bonne = droiteSup ? choix[0] : choix[1];
      return {
        enonce: `Pour quelles valeurs de $x$ l'expression $${poly([a, b])}$ est-elle ${mot} ?`,
        mode: "choix", choix: choix.map((x) => `$${x}$`), attendu: choix.indexOf(bonne),
        aides: [`$${poly([a, b])}$ s'annule pour $x = ${r}$.`, `Le coefficient de $x$ vaut $${a}$ : l'expression est du signe de $${a}$ à droite de $${r}$, et du signe contraire à gauche.`, `Tu peux aussi résoudre l'inéquation $${poly([a, b])} ${op} 0$.`],
        solution: `$${poly([a, b])} = 0 \\iff x = ${r}$. Comme $a = ${a}$ est ${a > 0 ? "positif" : "négatif"}, l'expression est ${a > 0 ? "négative puis positive" : "positive puis négative"} : elle est ${mot} pour $${bonne}$.`,
        figureSolution: tabsigne(["−∞", amT(r), "+∞"], [{ nom: ps(a, b), cases: [sgn(-a), "0", sgn(a)] }])
      };
    }
    let r1, r2; do { r1 = rand(-5, 3); r2 = rand(r1 + 1, 6); } while (r1 === -r2);
    const k = pick([1, 1, 1, -1, -1, 2, -2, 3]), q = pick(["pn", "nn", "sp", "sn"]), large = q === "pn" || q === "nn";
    const mot = { sp: "strictement positive", sn: "strictement négative", pn: "positive ou nulle", nn: "négative ou nulle" }[q];
    const fac = (r) => (r === 0 ? "x" : `(${poly([1, -r])})`), autre = k === -1 && Math.random() < 0.5;
    const expr = autre ? `${fac(r1)}(${poly([-1, r2])})` : `${k === 1 ? "" : k === -1 ? "-" : k}${r2 === 0 ? `x${fac(r1)}` : `${fac(r1)}${fac(r2)}`}`;
    const ouv = (g) => (large ? "[" : "]"), fer = () => (large ? "]" : "[");
    const dedans = `${ouv()}${r1}\\,;${r2}${fer()}`, dehors = `]-\\infty\\,;${r1}${fer()} \\cup ${ouv()}${r2}\\,;+\\infty[`;
    const mir = `${ouv()}${-r2}\\,;${-r1}${fer()}`, mirD = `]-\\infty\\,;${-r2}${fer()} \\cup ${ouv()}${-r1}\\,;+\\infty[`;
    const posDehors = k > 0, veutPos = q === "sp" || q === "pn", bonne = veutPos === posDehors ? dehors : dedans;
    const choix = [dedans, dehors, mir, mirD], lignes = [];
    if (Math.abs(k) !== 1) lignes.push({ nom: `${k}`, cases: [sgn(k), "", sgn(k), "", sgn(k)] });
    if (autre) { lignes.push({ nom: ps(1, -r1), cases: ["-", "0", "+", "", "+"] }, { nom: ps(-1, r2), cases: ["+", "", "+", "0", "-"] }); }
    else { if (k === -1) lignes.push({ nom: "−1", cases: ["-", "", "-", "", "-"] }); lignes.push({ nom: ps(1, -r1), cases: ["-", "0", "+", "", "+"] }, { nom: ps(1, -r2), cases: ["-", "", "-", "0", "+"] }); }
    lignes.push({ nom: "produit", cases: posDehors ? ["+", "0", "-", "0", "+"] : ["-", "0", "+", "0", "-"] });
    return {
      enonce: `Sur quel ensemble l'expression $${expr}$ est-elle ${mot} ?`,
      mode: "choix", choix: choix.map((x) => `$${x}$`), attendu: choix.indexOf(bonne),
      aides: ["Cherche les valeurs qui annulent chaque facteur.", `Les racines sont $${r1}$ et $${r2}$. ${autre ? `Développé, le coefficient de $x^2$ vaut $-1$.` : `Développé, le coefficient de $x^2$ vaut $${k}$.`}`, "Une expression factorisée du second degré est du signe de $a$ à l'extérieur des racines, et du signe contraire entre les racines. Un tableau de signes permet de le vérifier."],
      solution: `Racines $${r1}$ et $${r2}$, et le coefficient de $x^2$ vaut $${autre ? -1 : k}$ : l'expression est ${posDehors ? "positive à l'extérieur des racines et négative entre elles" : "négative à l'extérieur des racines et positive entre elles"}.${large ? " Les racines sont incluses (elle y vaut $0$)." : " Les racines sont exclues (elle y vaut $0$)."}\n\nRéponse : $${bonne}$.`,
      figureSolution: tabsigne(["−∞", amT(r1), amT(r2), "+∞"], lignes)
    };
  };

  // Développer, factoriser, réduire (liste de Première)
  GEN["am-developper"] = function () {
    const t = rand(0, 4);
    let enonce, bonne, fausses, regle, sol;
    if (t === 0) {
      let a, b; do { a = randNZ(-9, 9); b = randNZ(-9, 9); } while (a === -b);
      const ex = `${fx(1, a)}${fx(1, b)}`; enonce = `Développe et réduis $${ex}$.`; bonne = poly([1, a + b, a * b]);
      fausses = [poly([1, 0, a * b]), poly([1, a * b, a + b]), poly([1, -(a + b), a * b]), poly([1, a + b, -a * b])];
      regle = "Double distributivité : $(x + a)(x + b) = x^2 + bx + ax + ab$."; sol = `$${ex} = x^2 ${sg(b)}x ${sg(a)}x ${sg(a * b)} = ${bonne}$`.replace(/([+-]) 1x/g, "$1 x");
    } else if (t === 1) {
      let a, b; do { a = randNZ(-6, 6); b = randNZ(-6, 6); } while (a === b || a === -b);
      const k = pick([2, 3, -2, -3, 4]), ex = `${k}${fx(1, a)}${fx(1, b)}`; enonce = `Développe et réduis $${ex}$.`; bonne = poly([k, k * (a + b), k * a * b]);
      fausses = [poly([k, a + b, a * b]), poly([1, a + b, a * b]), poly([k, k * (a + b), a * b]), poly([k, -k * (a + b), k * a * b])];
      regle = `On développe d'abord le produit des parenthèses, puis on multiplie chaque terme par $${k}$.`; sol = `$${ex} = ${k}(${poly([1, a + b, a * b])}) = ${bonne}$`;
    } else if (t === 2) {
      let a, b, c, d; do { a = rand(2, 4); c = rand(2, 4); b = randNZ(-7, 7); d = randNZ(-7, 7); } while (a * d + b * c === 0 || a * b + c * d === a * d + b * c);
      const ex = `(${poly([a, b])})(${poly([c, d])})`;
      enonce = `Développe et réduis $${ex}$.`; bonne = poly([a * c, a * d + b * c, b * d]);
      fausses = [poly([a * c, 0, b * d]), poly([a * c, a * b + c * d, b * d]), poly([a + c, a * d + b * c, b * d]), poly([a * c, a * d + b * c, -b * d])];
      regle = "Double distributivité : chaque terme de la première parenthèse multiplie chaque terme de la seconde."; sol = `$${ex} = ${a * c}x^2 ${sg(a * d)}x ${sg(b * c)}x ${sg(b * d)} = ${bonne}$`;
    } else if (t === 3) {
      let r1, r2; do { r1 = randNZ(-7, 7); r2 = randNZ(-7, 7); } while (r1 === r2 || r1 === -r2);
      const p = poly([1, -(r1 + r2), r1 * r2]); enonce = `Laquelle de ces expressions est une forme factorisée de $${p}$ ?`; bonne = `${fx(1, -r1)}${fx(1, -r2)}`;
      fausses = [`${fx(1, r1)}${fx(1, r2)}`, `${fx(1, -r1)}${fx(1, r2)}`, `${fx(1, r1)}${fx(1, -r2)}`, `${fx(1, -r1 * r2)}${fx(1, -1)}`];
      regle = "Développe chaque proposition de tête : seule la bonne redonne l'expression de départ."; sol = `$${bonne} = x^2 ${sg(-r2)}x ${sg(-r1)}x ${sg(r1 * r2)} = ${p}$`.replace(/([+-]) 1x/g, "$1 x");
    } else {
      const k1 = rand(2, 5), k2 = rand(2, 5), a = rand(1, 7), b = rand(1, 7), ex = `${k1}(x + ${a}) - ${k2}(x - ${b})`;
      enonce = `Développe et réduis $${ex}$.`; bonne = poly([k1 - k2, k1 * a + k2 * b]);
      fausses = [poly([k1 - k2, k1 * a - k2 * b]), poly([k1 + k2, k1 * a + k2 * b]), poly([k1 - k2, a + b]), poly([k1 - k2, k1 * a - b])];
      regle = `Attention au signe $-$ devant la seconde parenthèse : $-${k2}(x - ${b}) = -${k2}x + ${k2 * b}$.`; sol = `$${ex} = ${k1}x + ${k1 * a} - ${k2}x + ${k2 * b} = ${bonne}$`;
    }
    const m = melangeChoix(`$${bonne}$`, fausses.filter((f) => f !== bonne).map((f) => `$${f}$`));
    return { enonce, mode: "choix", choix: m.choix, attendu: m.attendu, aides: [regle, "Développe terme à terme, puis regroupe les termes de même degré.", "Vérifie avec une valeur simple de $x$, par exemple $x = 1$."], solution: sol };
  };

  /* ===== Fonctions et représentations ===== */
  // Reconnaître une fonction linéaire ou affine (expression ou courbe)
  GEN["am-reconnaitre"] = function () {
    if (Math.random() < 0.35) {
      const lignes = shuffle([(x) => 0.25 * x * x - 3, (x) => 3 / x, (x) => Math.abs(x) - 2, (x) => (x < 0 ? NaN : 1.6 * Math.sqrt(x) - 2), (x) => (x < 1 ? x + 1 : 3 - x), (x) => -0.2 * x * x + 3, (x) => 0.04 * x ** 3]);
      const m = pick([-2, -1, -0.5, 0.5, 1, 2]), p = randNZ(-3, 3), q = pick(["affine", "lineaire", "pas"]);
      let fs, j, txt;
      if (q === "affine") { fs = [(x) => m * x + (Math.random() < 0.5 ? p : 0), ...lignes.slice(0, 3)]; txt = "Laquelle de ces courbes représente une fonction affine ?"; }
      else if (q === "lineaire") { fs = [(x) => m * x, (x) => -m * x + p, ...lignes.slice(0, 2)]; txt = "Laquelle de ces courbes représente une fonction linéaire ?"; }
      else { fs = [lignes[0], (x) => m * x + p, (x) => -m * x, (x) => 0.5 * m * x - p]; txt = "Laquelle de ces courbes ne représente **pas** une fonction affine ?"; }
      const ordre = shuffle([0, 1, 2, 3]); j = ordre.indexOf(0);
      return {
        enonce: txt, figure: amPanneaux(ordre.map((k) => fs[k]), "Quatre courbes C1, C2, C3 et C4 dans quatre petits repères"),
        mode: "choix", choix: [1, 2, 3, 4].map((k) => `$\\mathcal{C}_${k}$`), attendu: j,
        aides: ["La courbe d'une fonction affine est une **droite**.", "Une fonction linéaire est une fonction affine particulière : sa droite passe par l'**origine** du repère.", "Une courbe arrondie ou une ligne brisée n'est pas une droite."],
        solution: q === "pas" ? `$\\mathcal{C}_${j + 1}$ n'est pas une droite : ce n'est pas la courbe d'une fonction affine. Les trois autres sont des droites.` : q === "lineaire" ? `$\\mathcal{C}_${j + 1}$ est une droite qui passe par l'origine : c'est la courbe d'une fonction linéaire.` : `$\\mathcal{C}_${j + 1}$ est la seule droite : c'est la courbe d'une fonction affine.`
      };
    }
    const k = randNZ(-6, 6), a = randNZ(-5, 5), b = randNZ(-9, 9), d = rand(2, 5);
    const lin = shuffle([poly([k, 0]), `-\\dfrac{x}{${d}}`, `\\dfrac{x}{${d}}`]);
    const aff = shuffle([poly([a, b]), `${Math.abs(b)} - ${Math.abs(a) === 1 ? "" : Math.abs(a)}x`, `\\dfrac{x + ${Math.abs(b)}}{${d}}`, `${Math.abs(a) === 1 ? 2 : Math.abs(a)}(x ${sg(b)})`]);
    const non = shuffle([`x^2 ${sg(b)}`, `\\dfrac{${Math.abs(k)}}{x}`, `\\sqrt{x} ${sg(b)}`, poly([a, 0, 0]), `x(x ${sg(b)})`, `\\dfrac{1}{x ${sg(b)}}`]);
    const t = pick(["affine", "lineaire", "pas"]);
    let bonne, fausses, q, expl;
    if (t === "affine") { bonne = pick([lin[0], aff[0], aff[1]]); fausses = non.slice(0, 3); q = "Laquelle de ces fonctions est affine ?"; expl = "Une fonction affine s'écrit $f(x) = mx + p$ : $x$ n'apparaît qu'à la puissance $1$, jamais au carré, sous une racine ou au dénominateur."; }
    else if (t === "lineaire") { bonne = lin[0]; fausses = [aff[0], aff[1], non[0]]; q = "Laquelle de ces fonctions est linéaire ?"; expl = "Une fonction linéaire s'écrit $f(x) = mx$ (affine avec $p = 0$). Sa droite passe par l'origine."; }
    else { bonne = non[0]; fausses = [lin[0], aff[0], aff[2]]; q = "Laquelle de ces fonctions **n'est pas** affine ?"; expl = "Les autres peuvent s'écrire $mx + p$. Celle-ci contient $x$ au carré, sous une racine ou au dénominateur."; }
    const m = melangeChoix(bonne, fausses);
    return {
      enonce: q, mode: "choix", choix: m.choix.map((x) => `$f(x) = ${x}$`), attendu: m.attendu,
      aides: ["Affine : $f(x) = mx + p$. Linéaire : $f(x) = mx$.", "Développe ou simplifie l'expression si besoin : $\\dfrac{x + 3}{2} = \\dfrac{1}{2}x + \\dfrac{3}{2}$ est affine.", "$x^2$, $\\sqrt{x}$ ou $\\dfrac{1}{x}$ : ce n'est pas affine."],
      solution: `$f(x) = ${bonne}$.\n\n${expl}`
    };
  };

  // Exploiter une équation de courbe : appartenance d'un point, calcul de coordonnées
  GEN["am-appartenance"] = function () {
    const F = pick([
      () => { const a = pick([1, -1, 2, -2]), b = rand(-3, 3), c = rand(-5, 5); return { tex: poly([a, b, c]), f: (x) => a * x * x + b * x + c, xs: [-3, -2, -1, 1, 2, 3], sub: (x) => `${a === 1 ? "" : a === -1 ? "-" : `${a} \\times `}${par(x)}^2${b ? ` ${b < 0 ? "-" : "+"} ${Math.abs(b) === 1 ? "" : `${Math.abs(b)} \\times `}${par(x)}` : ""}${c ? ` ${sg(c)}` : ""}`, err: (x) => (x < 0 ? [-a * x * x + b * x + c, `Le carré d'un nombre négatif est positif : $(${x})^2 = ${x * x}$.`] : [2 * a * x + b * x + c, "$x^2 = x \\times x$, et non $2 \\times x$."]) }; },
      () => { const k = pick([6, 12, -12, 8, 24, -6]), ds = [1, 2, 3, 4, 6, 8, 12].filter((d) => Math.abs(k) % d === 0 && d <= 4); return { tex: `\\dfrac{${k}}{x}`, f: (x) => k / x, xs: ds.concat(ds.map((d) => -d)), sub: (x) => `\\dfrac{${k}}{${par(x)}}`, err: (x) => [x * k, `On divise $${k}$ par $x$, on ne multiplie pas.`] }; },
      () => { const m = randNZ(-4, 4), p = randNZ(-6, 6); return { tex: poly([m, p]), f: (x) => m * x + p, xs: [-4, -3, -2, -1, 1, 2, 3, 4], sub: (x) => `${m === 1 ? "" : m === -1 ? "-" : `${m} \\times `}${par(x)} ${sg(p)}`, err: (x) => [-m * x + p, "Attention au signe du produit : un produit de deux nombres négatifs est positif, celui d'un positif et d'un négatif est négatif."] }; },
      () => { const c = rand(-3, 3); return { tex: `\\sqrt{x}${c ? ` ${sg(c)}` : ""}`, f: (x) => Math.sqrt(x) + c, xs: [0, 1, 4, 9, 16], sub: (x) => `\\sqrt{${x}}${c ? ` ${sg(c)}` : ""}`, err: (x) => [x / 2 + c, "La racine carrée n'est pas la moitié : $\\sqrt{16} = 4$ car $4^2 = 16$."] }; },
      () => { const c = rand(-4, 4); return { tex: `x^3${c ? ` ${sg(c)}` : ""}`, f: (x) => x ** 3 + c, xs: [-2, -1, 1, 2], sub: (x) => `${par(x)}^3${c ? ` ${sg(c)}` : ""}`, err: (x) => (x < 0 ? [-(x ** 3) + c, `Un nombre négatif au cube reste négatif : $(${x})^3 = ${x ** 3}$.`] : [3 * x + c, "$x^3 = x \\times x \\times x$, et non $3 \\times x$."]) }; }
    ])();
    const x0 = pick(F.xs), y0 = F.f(x0), sur = (p) => Math.abs(F.f(p[0]) - p[1]) < 1e-9, nom = pick(["f", "g", "h"]);
    const fig = (pts) => amCourbe(F.f, pts, `Courbe de ${nom} et le point d'abscisse ${amT(x0)}`);
    const t = rand(0, 2), calcul = `${nom}(${x0}) = ${F.sub(x0)} = ${nb(y0)}`;
    if (t === 0) {
      const T = (p) => `$(${nb(p[0])}\\,;${nb(p[1])})$`, cand = [[x0, y0 + pick([-2, -1, 1, 2])], [y0, x0], [-x0, y0], [x0, -y0], [x0 + 1, y0], [x0, y0 + pick([3, -3])]].filter((p) => !sur(p) && isFinite(p[1]));
      const ms = melangeChoix(T([x0, y0]), cand.map(T));
      return {
        enonce: `Soit $${nom}(x) = ${F.tex}$. Lequel de ces points appartient à la courbe de $${nom}$ ?`, mode: "choix", choix: ms.choix, attendu: ms.attendu,
        aides: [`Un point $(a\\,;b)$ est sur la courbe de $${nom}$ si $${nom}(a) = b$.`, "Pour chaque point, calcule l'image de son **abscisse** et compare-la à son **ordonnée**.", `Par exemple : $${calcul}$.`],
        solution: `$${calcul}$ : le point ${T([x0, y0])} est sur la courbe. Pour les autres points, l'image de l'abscisse n'est pas égale à l'ordonnée.`, figureSolution: fig([[x0, y0]])
      };
    }
    if (t === 1) {
      return {
        enonce: `Soit $${nom}(x) = ${F.tex}$. Le point $A$ de la courbe de $${nom}$ a pour abscisse $${x0}$. Quelle est son ordonnée ?`, mode: "nombre", prefixe: "Ordonnée :", attendu: y0,
        erreurs: amErr([F.err(x0), [F.f(-x0), "Tu as remplacé $x$ par l'opposé de l'abscisse."]]),
        aides: [`L'ordonnée du point de la courbe d'abscisse $${x0}$ est $${nom}(${x0})$.`, `$${nom}(${x0}) = ${F.sub(x0)}$.`, "Respecte les priorités : puissances, puis produits, puis sommes."],
        solution: `$${calcul}$ : le point $A$ a pour coordonnées $(${nb(x0)}\\,;${nb(y0)})$.`, figureSolution: fig([[x0, y0]])
      };
    }
    const dans = Math.random() < 0.5, yM = dans ? y0 : y0 + pick([-3, -2, -1, 1, 2, 3]), M = `M(${nb(x0)}\\,;${nb(yM)})`;
    const vrai = dans ? `Oui, car $${nom}(${x0}) = ${nb(y0)}$` : `Non, car $${nom}(${x0}) = ${nb(y0)}$`;
    const ms = melangeChoix(vrai, dans ? [`Non, car $${nom}(${x0}) = ${nb(y0 + 1)}$`, "On ne peut pas savoir sans tracer la courbe", `Non, car $${nom}(${nb(yM)}) \\neq ${nb(x0)}$`] : [`Oui, car $${nom}(${x0}) = ${nb(yM)}$`, "On ne peut pas savoir sans tracer la courbe", "Oui, car son ordonnée est proche de celle de la courbe"]);
    return {
      enonce: `Soit $${nom}(x) = ${F.tex}$. Le point $${M}$ appartient-il à la courbe de $${nom}$ ?`, mode: "choix", choix: ms.choix, attendu: ms.attendu,
      aides: [`Calcule l'image de l'**abscisse** du point : $${nom}(${x0})$.`, `$${nom}(${x0}) = ${F.sub(x0)}$.`, `Compare le résultat avec l'**ordonnée** du point, $${nb(yM)}$.`],
      solution: `$${calcul}$. ${dans ? `C'est l'ordonnée du point : $M$ appartient à la courbe de $${nom}$.` : `$${nb(y0)} \\neq ${nb(yM)}$ : $M$ n'appartient pas à la courbe de $${nom}$.`}`, figureSolution: fig(dans ? [[x0, y0]] : [[x0, y0], [x0, yM]])
    };
  };

  // Signe et variations lus sur une courbe (tableau de signes, tableau de variations, extremum)
  GEN["am-signe-graph"] = function () {
    const t = rand(0, 4);
    if (t === 0 || t === 1) {
      const P = parabole(), dom = `[${P.h - 3}\\,;${P.h + 3}]`;
      if (t === 0) {
        const cr = Math.random() < 0.5, gauche = `[${P.h - 3}\\,;${P.h}]`, droite2 = `[${P.h}\\,;${P.h + 3}]`;
        const lo = Math.min(P.k, P.k + 9 * P.a), hi = Math.max(P.k, P.k + 9 * P.a), bonne = (P.a < 0) === cr ? gauche : droite2, choix = [gauche, droite2, dom, `[${lo}\\,;${hi}]`];
        return {
          enonce: `Voici la courbe d'une fonction $f$ définie sur $${dom}$. Sur quel intervalle $f$ est-elle ${cr ? "croissante" : "décroissante"} ?`,
          figure: graph(P.opts()), mode: "choix", choix: choix.map((x) => `$${x}$`), attendu: choix.indexOf(bonne),
          aides: ["Parcours la courbe de gauche à droite.", `${cr ? "Croissante" : "Décroissante"} : la courbe ${cr ? "monte" : "descend"}.`, "Les intervalles de variation se lisent sur l'axe des **abscisses** (horizontal)."],
          solution: `La courbe ${cr ? "monte" : "descend"} sur $${bonne}$ : $f$ y est ${cr ? "croissante" : "décroissante"}.`
        };
      }
      const mot = P.a < 0 ? "maximum" : "minimum";
      return {
        enonce: `Voici la courbe d'une fonction $f$ définie sur $${dom}$. Quel est le ${mot} de $f$ ?`,
        figure: graph(P.opts()), mode: "nombre", prefixe: `${mot[0].toUpperCase() + mot.slice(1)} :`, attendu: P.k,
        erreurs: amErr([[P.h, `Ça, c'est la valeur de $x$ où le ${mot} est atteint. Le ${mot} est une valeur de $f(x)$, lue sur l'axe vertical.`]]),
        aides: [`Cherche le point le plus ${P.a < 0 ? "haut" : "bas"} de la courbe.`, "Le " + mot + " est l'**ordonnée** de ce point.", `Ce point a pour abscisse $${P.h}$.`],
        solution: `Le point le plus ${P.a < 0 ? "haut" : "bas"} est $(${P.h}\\,;${P.k})$ : le ${mot} de $f$ est $${P.k}$, atteint en $x = ${P.h}$.`, figureSolution: graph(P.opts({ points: [{ x: P.h, y: P.k }] }))
      };
    }
    if (t === 2) {
      // signe lu sur la courbe (racines entières)
      let r1, r2; do { r1 = rand(-4, 1); r2 = rand(r1 + 2, 4); } while (r2 - r1 > 6);
      const d = r2 - r1, s = pick([1, -1]), v = Math.min(4, Math.floor((6 * d * d) / (4 * (d + 1)))) || 2, k = (4 * v) / (d * d), f = (x) => s * k * (x - r1) * (x - r2);
      const L = r1 - 1, R = r2 + 1, top = Math.max(Math.abs(f(L)), Math.abs(f(R)), v) + 0.8, q = pick(["pn", "nn", "sp", "sn"]), large = q === "pn" || q === "nn";
      const mot = { sp: "f(x) > 0", sn: "f(x) < 0", pn: "f(x) \\geqslant 0", nn: "f(x) \\leqslant 0" }[q];
      const iD = `${large ? "[" : "]"}${r1}\\,;${r2}${large ? "]" : "["}`, iE = `[${L}\\,;${r1}${large ? "]" : "["} \\cup ${large ? "[" : "]"}${r2}\\,;${R}]`;
      const iD2 = `${large ? "]" : "["}${r1}\\,;${r2}${large ? "[" : "]"}`, iE2 = `[${L}\\,;${r1}${large ? "[" : "]"} \\cup ${large ? "]" : "["}${r2}\\,;${R}]`;
      const posDedans = s < 0, bonne = (q === "sp" || q === "pn") === posDedans ? iD : iE, choix = [iD, iE, iD2, iE2];
      const o = { xmin: Math.min(L - 0.6, -0.6), xmax: Math.max(R + 0.6, 0.6), ymin: -top, ymax: top, curves: [{ f, a: L, b: R, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", lx: R - 0.3, dx: -6, dy: s > 0 ? -6 : 16 }], aria: `Courbe de f sur [${L} ; ${R}], qui coupe l'axe des abscisses en ${r1} et ${r2}` };
      return {
        enonce: `Voici la courbe d'une fonction $f$ définie sur $[${L}\\,;${R}]$. Sur quel ensemble a-t-on $${mot}$ ?`,
        figure: graph(o), mode: "choix", choix: choix.map((x) => `$${x}$`), attendu: choix.indexOf(bonne),
        aides: ["$f(x) > 0$ : la courbe est **au-dessus** de l'axe des abscisses ; $f(x) < 0$ : en dessous.", `La courbe coupe l'axe des abscisses en $${r1}$ et $${r2}$ : là, $f(x) = 0$.`, large ? "Inégalité large : les valeurs où $f(x) = 0$ sont incluses (crochets fermés)." : "Inégalité stricte : les valeurs où $f(x) = 0$ sont exclues (crochets ouverts)."],
        solution: `La courbe est ${posDedans ? "au-dessus de l'axe entre" : "en dessous de l'axe entre"} $${r1}$ et $${r2}$, et ${posDedans ? "en dessous" : "au-dessus"} ailleurs. Donc $${mot}$ pour $x \\in ${bonne}$.`,
        figureSolution: graph(Object.assign({}, o, { points: [{ x: r1, y: 0 }, { x: r2, y: 0 }] }))
      };
    }
    // tableau de variations à compléter, lu sur la courbe
    const C = courbeNoeuds(), j = rand(0, C.n - 1), surX = Math.random() < 0.4 && j > 0 && j < C.n - 1;
    const haut = C.ys.map((y, k) => (k === 0 ? y > C.ys[1] : y > C.ys[k - 1]));
    const xs = C.xs.map(amT), ys = C.ys.map(amT);
    if (surX) xs[j] = "?"; else ys[j] = "?";
    return {
      enonce: `Voici la courbe d'une fonction $f$ et son tableau de variations incomplet. Quel nombre faut-il écrire à la place du « ? » ?`,
      figure: graph(C.opts()) + amTabvar(xs, ys, haut, "f"), mode: "nombre", prefixe: "? =", attendu: surX ? C.xs[j] : C.ys[j],
      erreurs: amErr([[surX ? C.ys[j] : C.xs[j], surX ? "La première ligne du tableau contient des valeurs de $x$, lues sur l'axe horizontal." : "La seconde ligne du tableau contient des valeurs de $f(x)$, lues sur l'axe vertical."]]),
      aides: ["Dans un tableau de variations, la première ligne donne les abscisses où la courbe change de sens (et les bornes).", "La seconde ligne donne les valeurs de $f$ en ces points : les ordonnées.", `Repère le point de la courbe correspondant à la colonne du « ? ».`],
      solution: `Le point de la courbe correspondant est $(${amT(C.xs[j]).replace("−", "-")}\\,;${amT(C.ys[j]).replace("−", "-")})$ : il faut écrire $${nb(surX ? C.xs[j] : C.ys[j])}$.`,
      figureSolution: graph(C.opts({ points: [{ x: C.xs[j], y: C.ys[j] }] })) + amTabvar(C.xs.map(amT), C.ys.map(amT), haut, "f")
    };
  };

  // Droites : équation réduite (mtex et eqD servent aussi ailleurs)
  const mtex = (m) => (m === 1 ? "x" : m === -1 ? "-x" : Number.isInteger(m) ? `${m}x` : `${m < 0 ? "-" : ""}\\dfrac{1}{${Math.round(1 / Math.abs(m))}}x`);
  const eqD = (m, p) => `y = ${mtex(m)}${p ? ` ${p < 0 ? "-" : "+"} ${fr(Math.abs(p))}` : ""}`;
  const amMx = (m, x) => (m === 1 ? `${par(x)}` : m === -1 ? `-${par(x)}` : `${m} \\times ${par(x)}`);
  const amSegVisible = (m, p, L) => { let a = -L, b = L; if (m > 0) { a = Math.max(a, (-L - p) / m); b = Math.min(b, (L - p) / m); } else { a = Math.max(a, (L - p) / m); b = Math.min(b, (-L - p) / m); } return [a, b]; };

  // Tracer une droite : la reconnaître parmi quatre (équation réduite, ou point et coefficient directeur)
  GEN["am-trace-droite"] = function () {
    const M = [-3, -2, -1, -0.5, 0.5, 1, 2, 3], viaPoint = Math.random() < 0.45, m = pick(M), mT = (v) => (Number.isInteger(v) ? `${v}` : `${v < 0 ? "-" : ""}\\dfrac{1}{2}`);
    let L, A = null, p = rand(-3, 3);
    if (viaPoint) {
      const xa = randNZ(-2, 2), ya = rand(-2, 3); A = [xa, ya];
      L = [m, ...shuffle([-m, ...M.filter((x) => x !== m && x !== -m)]).slice(0, 3)].map((mm) => [mm, ya - mm * xa]);
    } else {
      const c = [[-m, p], [m, p ? -p : pick([-2, 2])], [m, p + pick([-2, 2])], [Math.abs(m) >= 1 ? (Math.abs(m) === 2 ? m / 4 : m === 1 ? 2 : m === -1 ? -2 : m) : m * 4, p], [-m, -p]];
      L = [[m, p]]; shuffle(c).forEach((d) => { if (L.length < 4 && !L.some((e) => e[0] === d[0] && e[1] === d[1]) && Math.abs(d[1]) <= 4) L.push(d); });
      while (L.length < 4) { const d = [pick(M), rand(-3, 3)]; if (!L.some((e) => e[0] === d[0] && e[1] === d[1])) L.push(d); }
    }
    p = L[0][1];
    const ordre = shuffle([0, 1, 2, 3]), j = ordre.indexOf(0);
    // chaque nom est écrit au bout de sa droite, du côté le plus éloigné des noms déjà placés
    const pris = [];
    const curves = ordre.map((k, i) => {
      const [mm, pp] = L[k], [a, b] = amSegVisible(mm, pp, 5.5), f = (x) => mm * x + pp, cand = [[b, f(b), true], [a, f(a), false]];
      const ecart = (c) => Math.min(99, ...pris.map((q) => Math.hypot(c[0] - q[0], c[1] - q[1]))), c = ecart(cand[0]) >= ecart(cand[1]) ? cand[0] : cand[1];
      pris.push(c);
      return { f, a, b, closed: false, couleur: 0, label: `d<tspan class="sub" dy="3">${i + 1}</tspan>`, lx: c[2] ? b - 0.2 : a + 0.2, dx: c[2] ? -4 : 30, dy: c[2] === mm > 0 ? -6 : 14 };
    });
    const o = { xmin: -5.8, xmax: 5.8, ymin: -5.8, ymax: 5.8, curves, points: A ? [{ x: A[0], y: A[1], label: "A" }] : [], aria: `Quatre droites d1, d2, d3 et d4 dans un repère quadrillé${A ? ", toutes passent par le point A" : ""}` };
    const pas = Number.isInteger(m) ? 1 : 2;
    return {
      enonce: viaPoint ? `Laquelle de ces droites passe par le point $A(${A[0]}\\,;${A[1]})$ et a pour coefficient directeur $${mT(m)}$ ?` : `Laquelle de ces droites a pour équation $${eqD(m, p)}$ ?`,
      figure: graph(o), mode: "choix", choix: [1, 2, 3, 4].map((k) => `$d_${k}$`), attendu: j,
      aides: viaPoint ? ["Les quatre droites passent par $A$ : seul le coefficient directeur les distingue.", `Coefficient directeur $${mT(m)}$ : quand on avance de $${pas}$ vers la droite, on ${m > 0 ? "monte" : "descend"} de $${Math.abs(m * pas)}$.`, `Depuis $A$, le point $(${A[0] + pas}\\,;${A[1] + m * pas})$ doit être sur la droite.`]
        : [`L'ordonnée à l'origine est $${p}$ : la droite coupe l'axe vertical au point $(0\\,;${p})$.`, `Le coefficient directeur est $${mT(m)}$ : quand on avance de $${pas}$, on ${m > 0 ? "monte" : "descend"} de $${Math.abs(m * pas)}$.`, `La droite passe donc par $(0\\,;${p})$ et $(${pas}\\,;${p + m * pas})$.`],
      solution: viaPoint ? `La droite cherchée passe par $A(${A[0]}\\,;${A[1]})$ et par $(${A[0] + pas}\\,;${A[1] + m * pas})$ : c'est $d_${j + 1}$.` : `La droite cherchée passe par $(0\\,;${p})$ et par $(${pas}\\,;${p + m * pas})$ : c'est $d_${j + 1}$.`
    };
  };

  GEN["am-droite-point"] = function () {
    const m = randNZ(-4, 4), p = rand(-6, 6), x0 = randNZ(-4, 4), y0 = m * x0 + p;
    const surD = (pt) => pt[1] === m * pt[0] + p, cand = [[x0, y0 + pick([-2, -1, 1, 2])], [y0, x0], [x0, m * x0 - p], [-x0, y0], [x0 + 1, y0 - m]].filter((pt) => !surD(pt));
    const T = (pt) => `(${pt[0]}\\,;${pt[1]})`, ms = melangeChoix(T([x0, y0]), cand.map(T)), calc = `${amMx(m, x0)}${p ? ` ${sg(p)}` : ""}`;
    const [a, b] = amSegVisible(m, p, 12);
    return {
      enonce: `Lequel de ces points appartient à la droite d'équation $${eqD(m, p)}$ ?`,
      mode: "choix", choix: ms.choix.map((x) => `$${x}$`), attendu: ms.attendu,
      aides: ["Un point $(x\\,;y)$ est sur la droite si ses coordonnées vérifient l'équation.", `Pour chaque point, calcule $${mtex(m)}${p ? ` ${sg(p)}` : ""}$ avec son abscisse et compare à son ordonnée.`, `Pour $x = ${x0}$ : $${calc} = ${y0}$.`],
      solution: `$${calc} = ${y0}$ : le point $${T([x0, y0])}$ est sur la droite. Pour les autres points, $${mtex(m)}${p ? ` ${sg(p)}` : ""}$ n'est pas égal à l'ordonnée.`,
      figureSolution: Math.abs(y0) <= 11 ? graph({ xmin: -5.6, xmax: 5.6, ymin: -12, ymax: 12, ystep: 2, h: 300, curves: [{ f: (x) => m * x + p, a: Math.max(a, -5.4), b: Math.min(b, 5.4), closed: false }], points: [{ x: x0, y: y0, label: `(${x0} ; ${y0})`.replace(/-/g, "−") }], aria: `Droite d'équation y = ${m}x + ${p} et le point (${x0} ; ${y0})` }) : undefined
    };
  };

  GEN["am-lire-droite"] = function () {
    const [n, d] = pick([[1, 1], [2, 1], [3, 1], [-1, 1], [-2, 1], [-3, 1], [1, 2], [-1, 2], [1, 3], [-1, 3], [2, 3], [-2, 3], [3, 2], [-3, 2]]);
    let p; do { p = rand(-4, 4); } while (Math.abs(p + n) > 5);
    const m = n / d, mT = (n, d) => (d === 1 ? (n === 1 ? "" : n === -1 ? "-" : `${n}`) : `${n < 0 ? "-" : ""}\\dfrac{${Math.abs(n)}}{${d}}`);
    const eq = (n, d, p) => `y = ${mT(n, d)}x${p ? ` ${p < 0 ? "-" : "+"} ${Math.abs(p)}` : ""}`, [a, b] = amSegVisible(m, p, 5.5);
    const o = { xmin: -5.8, xmax: 5.8, ymin: -5.8, ymax: 5.8, curves: [{ f: (x) => m * x + p, a, b, closed: false, label: "d", lx: b - 0.3, dx: -6, dy: m > 0 ? -6 : 14 }], aria: "Droite d dans un repère quadrillé" };
    const bonne = eq(n, d, p), fausses = [eq(-n, d, p), Math.abs(n) !== d ? eq(Math.sign(n) * d, Math.abs(n), p) : eq(2 * n, d, p), eq(n, d, p ? -p : 1), eq(n, d, p + pick([-1, 1]))];
    const ms = melangeChoix(bonne, fausses), mt = d === 1 ? `${n}` : `${n < 0 ? "-" : ""}\\dfrac{${Math.abs(n)}}{${d}}`;
    const fs = graph(Object.assign({}, o, { points: [{ x: 0, y: p }, { x: d, y: p + n }], fleches: [{ x1: 0, y1: p, x2: d, y2: p, label: `+${d}` }, { x1: d, y1: p, x2: d, y2: p + n, label: `${n > 0 ? "+" : "−"}${Math.abs(n)}`, c: 1 }] }));
    if (Math.random() < 0.35) return {
      // lire seulement le coefficient directeur
      enonce: `Lis graphiquement le coefficient directeur $m$ de la droite $d$.${d > 1 ? " Tu peux répondre par une fraction." : ""}`,
      figure: graph(o), mode: "nombre", prefixe: "m =", attendu: m,
      erreurs: amErr([[-m, `Attention au signe : la droite ${m > 0 ? "monte" : "descend"} quand on la parcourt de gauche à droite, donc $m$ est ${m > 0 ? "positif" : "négatif"}.`], [d / n, "Tu as inversé : $m$ est la variation de $y$ divisée par la variation de $x$."], [p, "Ça, c'est l'ordonnée à l'origine $p$, lue sur l'axe vertical. Le coefficient directeur se lit en avançant vers la droite."], [n, d > 1 ? `Quand $x$ augmente de $${d}$, $y$ varie de $${n}$ : il faut encore diviser par $${d}$.` : ""]]).filter((e) => e.message && Math.abs(e.valeur - m) > 1e-9).concat(amDecimal(m) ? [] : amApprox(m)),
      aides: ["Repère deux points de la droite placés sur des nœuds du quadrillage.", `En partant du point $(0\\,;${p})$, avance de $${d}$ vers la droite et regarde de combien $y$ varie.`, `$m = \\dfrac{\\text{variation de } y}{\\text{variation de } x}$.`],
      solution: `Depuis $(0\\,;${p})$, quand $x$ augmente de $${d}$, $y$ varie de $${n}$ : $m = ${mt}$.`,
      figureSolution: fs
    };
    return {
      enonce: "Quelle est l'équation réduite de la droite $d$ ?",
      figure: graph(o), mode: "choix", choix: ms.choix.map((x) => `$${x}$`), attendu: ms.attendu,
      aides: ["L'équation réduite s'écrit $y = mx + p$.", "$p$ (l'ordonnée à l'origine) se lit là où la droite coupe l'axe vertical.", d > 1 ? `$m$ : quand $x$ augmente de $${d}$, regarde de combien $y$ varie, puis divise par $${d}$.` : "$m$ : quand $x$ augmente de $1$, regarde de combien $y$ varie (en montant ou en descendant)."],
      solution: `La droite coupe l'axe vertical en $${p}$, donc $p = ${p}$. Quand $x$ augmente de $${d}$, $y$ varie de $${n}$, donc $m = ${mt}${d > 1 ? "" : ""}$.\n\n$d : ${bonne}$`,
      figureSolution: graph(Object.assign({}, o, { points: [{ x: 0, y: p }, { x: d, y: p + n }], fleches: [{ x1: 0, y1: p, x2: d, y2: p, label: `+${d}` }, { x1: d, y1: p, x2: d, y2: p + n, label: `${n > 0 ? "+" : "−"}${Math.abs(n)}`, c: 1 }] }))
    };
  };

  GEN["am-coef-dir"] = function () {
    let xa, xb, ya, yb, m; do { xa = rand(-4, 3); xb = rand(xa + 1, 6); m = pick([-3, -2, -1, 1, 2, 3, 0.5, -0.5, 4]); ya = rand(-5, 5); yb = ya + m * (xb - xa); } while (!Number.isInteger(yb) || Math.abs(yb) > 7);
    const dx = xb - xa, dy = yb - ya, p = ya - m * xa;
    if (Math.random() < 0.6) return {
      enonce: `On donne les points $A(${xa}\\,;${ya})$ et $B(${xb}\\,;${yb})$. Calcule le coefficient directeur $m$ de la droite $(AB)$.`,
      figure: graph({ xmin: -5.6, xmax: 6.6, ymin: -7.8, ymax: 7.8, ystep: 1, yetiq: 2, h: 300, points: [{ x: xa, y: ya, label: "A" }, { x: xb, y: yb, label: "B" }], aria: "Points A et B dans un repère quadrillé" }),
      mode: "nombre", prefixe: "m =", attendu: m,
      erreurs: amErr(dy ? [[dx / dy, "Tu as inversé : on divise la variation des **ordonnées** par la variation des **abscisses**."], [-m, "Attention à l'ordre : il faut soustraire dans le même ordre en haut et en bas."]] : []),
      aides: ["$m = \\dfrac{y_B - y_A}{x_B - x_A}$.", `$m = \\dfrac{${yb} - ${par(ya)}}{${xb} - ${par(xa)}}$.`, `$m = \\dfrac{${dy}}{${dx}}$. Tu peux répondre par une fraction.`],
      solution: `$m = \\dfrac{${yb} - ${par(ya)}}{${xb} - ${par(xa)}} = \\dfrac{${dy}}{${dx}} = ${fr(m)}$`
    };
    return {
      enonce: `La droite $(AB)$ passe par $A(${xa}\\,;${ya})$ et a pour coefficient directeur $m = ${fr(m)}$. Calcule son ordonnée à l'origine $p$.`,
      mode: "nombre", prefixe: "p =", attendu: p,
      erreurs: amErr([[ya + m * xa, "Attention au signe : $p = y_A - m \\times x_A$."], [ya - m, "Il faut multiplier $m$ par l'abscisse de $A$ : $p = y_A - m \\times x_A$."]]),
      aides: ["L'équation s'écrit $y = mx + p$, et les coordonnées de $A$ la vérifient.", `$${ya} = ${fr(m)} \\times ${par(xa)} + p$.`, `$p = ${ya} - ${m < 0 ? `(${fr(m)})` : fr(m)} \\times ${par(xa)}$.`],
      solution: `$${ya} = ${fr(m)} \\times ${par(xa)} + p \\iff p = ${ya} - ${m * xa < 0 ? `(${fr(m * xa)})` : fr(m * xa)} = ${fr(p)}$.\n\n$(AB) : ${eqD(m, p)}$`
    };
  };

  /* ===== Proportions et évolutions ===== */
  const AM_CTX_PROP = [
    ["élèves d'un lycée de Mamoudzou", "viennent en barge", "d'élèves qui viennent en barge", "élèves"],
    ["tortues observées à N'Gouja", "sont des tortues vertes", "de tortues vertes", "tortues"],
    ["adhérents de la coopérative d'ylang-ylang de Combani", "sont des femmes", "de femmes", "adhérents"],
    ["pêcheurs du port de M'tsamboro", "ont une pirogue", "de pêcheurs qui ont une pirogue", "pêcheurs"],
    ["passagers de la barge de 7 h", "sont des lycéens", "de lycéens", "passagers"],
    ["habitants interrogés à Koungou", "ont déjà eu la dengue", "d'habitants qui ont déjà eu la dengue", "habitants"],
    ["makis comptés sur l'îlot de Saziley", "sont des femelles", "de femelles", "makis"],
    ["plants de vanille d'une parcelle de Bandrélé", "sont en fleurs", "de plants en fleurs", "plants"]
  ];
  const AM_P = [5, 10, 12.5, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 62.5, 65, 70, 75, 80, 85, 87.5, 90, 95];
  // Calculer et exprimer une proportion (fraction, décimal, pourcentage)
  GEN["am-proportion"] = function () {
    const c = pick(AM_CTX_PROP), p = pick(AM_P), g = pgcd(p * 10, 1000), a = (p * 10) / g, b = 1000 / g, k = rand(1, Math.max(1, Math.floor(600 / b))), N = b * k, n = a * k, t = rand(0, 3);
    if (t === 0) {
      const forme = pick(["pc", "pc", "dec", "frac"]), rep = forme === "pc" ? p : forme === "dec" ? p / 100 : a / b;
      return {
        enonce: `Sur les $${nb(N)}$ ${c[0]}, $${nb(n)}$ ${c[1]}. Quelle est la proportion ${c[2]} ? Donne-la ${forme === "pc" ? "en pourcentage" : forme === "dec" ? "sous forme décimale" : "sous forme de fraction irréductible"}.`,
        figure: amBarre(p / 100, `${nb(n).replace(/\\,/g, " ")} ${c[3]}`, `${nb(N).replace(/\\,/g, " ")} ${c[3]}`, "?", `Barre représentant les ${N} ${c[3]}, dont ${n} coloriés`),
        mode: "nombre", prefixe: "p =", suffixe: forme === "pc" ? "%" : "", attendu: rep,
        erreurs: amErr([[forme === "pc" ? (100 * N) / n : N / n, "Tu as divisé à l'envers : la proportion, c'est la partie divisée par le tout. Elle est toujours entre $0$ et $1$ (ou $100\\,\\%$)."], [forme === "pc" ? p / 100 : forme === "dec" ? p : (100 - p) / 100, forme === "pc" ? "Ça, c'est l'écriture décimale : multiplie par $100$ pour avoir un pourcentage." : forme === "dec" ? "Ça, c'est le pourcentage : divise par $100$ pour l'écriture décimale." : "Ça, c'est la proportion de ceux qui ne sont pas concernés."], [forme === "pc" ? 100 - p : 1 - p / 100, "Ça, c'est la proportion du reste : $1 - p$."]]),
        aides: ["Proportion $= \\dfrac{\\text{partie}}{\\text{tout}}$.", `$p = \\dfrac{${n}}{${N}}$.`, forme === "pc" ? "Écris-la en décimal, puis multiplie par $100$." : forme === "dec" ? "Divise le numérateur par le dénominateur." : `Simplifie la fraction : $${n}$ et $${N}$ sont divisibles par $${k}$${k > 1 ? "" : " (déjà irréductible si $k = 1$)"}.`],
        solution: `$p = \\dfrac{${n}}{${N}} = \\dfrac{${a}}{${b}} = ${nb(p / 100)} = ${nb(p)}\\,\\%$`
      };
    }
    if (t === 1) {
      const F = (x, y) => `$\\dfrac{${x}}{${y}}$`, P = (x) => `$${nb(x)}\\,\\%$`, D = (x) => `$${nb(x)}$`, juste = pick([F(a, b), P(p), D(p / 100)]);
      const m = melangeChoix(juste, [a > 1 ? F(b, a) : null, D(p), P(+(p / 10).toFixed(2)), D(p / 1000), F(a, b * 10), P(100 - p)].filter((x) => x && x !== juste));
      return {
        enonce: `Sur les $${nb(N)}$ ${c[0]}, $${nb(n)}$ ${c[1]}. Quelle écriture est égale à la proportion ${c[2]} ?`, mode: "choix", choix: m.choix, attendu: m.attendu,
        aides: ["Proportion $= \\dfrac{\\text{partie}}{\\text{tout}}$, toujours entre $0$ et $1$.", `$\\dfrac{${n}}{${N}} = \\dfrac{${a}}{${b}}$.`, "Une même proportion s'écrit en fraction, en décimal ou en pourcentage : $\\dfrac{1}{4} = 0{,}25 = 25\\,\\%$."],
        solution: `$\\dfrac{${n}}{${N}} = \\dfrac{${a}}{${b}} = ${nb(p / 100)} = ${nb(p)}\\,\\%$.`
      };
    }
    if (t === 2) {
      const [lig, col] = pick([[4, 5], [5, 5], [2, 5], [4, 10], [5, 10], [5, 8]]), Nc = lig * col, nc = rand(1, Nc - 1);
      return {
        enonce: "Quelle proportion des cases du quadrillage est coloriée ? Donne-la en pourcentage.",
        figure: amGrille(lig, col, nc, `Quadrillage de ${Nc} cases dont ${nc} coloriées`), mode: "nombre", prefixe: "p =", suffixe: "%", attendu: +((100 * nc) / Nc).toFixed(6),
        erreurs: amErr([[nc, `Ça, c'est le nombre de cases coloriées. Il y a $${Nc}$ cases en tout.`], [(100 * (Nc - nc)) / Nc, "Ça, c'est la proportion de cases **non** coloriées."], [nc / Nc, "Ça, c'est l'écriture décimale : multiplie par $100$."]]),
        aides: [`Il y a $${lig} \\times ${col} = ${Nc}$ cases.`, `Proportion : $\\dfrac{${nc}}{${Nc}}$.`, `Pour un pourcentage, ramène le dénominateur à $100$ : multiplie par $${nb(100 / Nc)}$.`],
        solution: `$\\dfrac{${nc}}{${Nc}} = ${nb(nc / Nc)} = ${nb(+((100 * nc) / Nc).toFixed(6))}\\,\\%$.`
      };
    }
    // comparer deux proportions
    let N1, N2, n1, n2; do { N1 = pick([20, 25, 40, 50, 30, 60]); N2 = pick([20, 25, 40, 50, 30, 60]); n1 = rand(2, N1 - 2); n2 = rand(2, N2 - 2); } while (N1 === N2 || !amDecimal((100 * n1) / N1) || !amDecimal((100 * n2) / N2) || Math.abs(n1 / N1 - n2 / N2) > 0.12 || (n1 === n2));
    const p1 = (100 * n1) / N1, p2 = (100 * n2) / N2, rep = p1 > p2 ? 0 : p1 < p2 ? 1 : 2;
    const choix = ["Dans la classe $A$", "Dans la classe $B$", "Elle est la même dans les deux classes", "On ne peut pas comparer : les effectifs sont différents"];
    return {
      enonce: `Dans la classe $A$, $${n1}$ élèves sur $${N1}$ font partie du club de va'a (pirogue) ; dans la classe $B$, $${n2}$ élèves sur $${N2}$. Dans quelle classe la proportion d'élèves du club est-elle la plus grande ?`,
      mode: "choix", choix, attendu: rep,
      aides: ["On ne compare pas les effectifs, mais les proportions : partie divisée par tout.", `$\\dfrac{${n1}}{${N1}}$ et $\\dfrac{${n2}}{${N2}}$.`, "Écris les deux proportions en pourcentage pour les comparer."],
      solution: `Classe $A$ : $\\dfrac{${n1}}{${N1}} = ${nb(p1)}\\,\\%$. Classe $B$ : $\\dfrac{${n2}}{${N2}} = ${nb(p2)}\\,\\%$. ${rep === 2 ? "Les proportions sont égales." : `La proportion est plus grande dans la classe $${rep ? "B" : "A"}$.`}`
    };
  };

  // Retrouver la partie connaissant le tout, ou le tout connaissant la partie
  GEN["am-partie-tout"] = function () {
    const c = pick(AM_CTX_PROP), pourcent = Math.random() < 0.7;
    let p, a, b; if (pourcent) { p = pick(AM_P); const g = pgcd(p * 10, 1000); a = (p * 10) / g; b = 1000 / g; } else { [a, b] = pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5], [1, 6], [5, 6], [3, 8], [5, 8], [7, 10]]); p = (100 * a) / b; }
    const k = rand(1, Math.max(1, Math.floor(400 / b))), N = b * k, n = a * k, prop = pourcent ? `$${nb(p)}\\,\\%$` : `les $\\dfrac{${a}}{${b}}$`, coef = pourcent ? nb(p / 100) : `\\dfrac{${a}}{${b}}`;
    const lab = (x) => `${nb(x).replace(/\\,/g, " ")} ${c[3]}`;
    if (Math.random() < 0.55) return {
      enonce: `Parmi les $${nb(N)}$ ${c[0]}, ${prop} ${c[1]}. Combien cela représente-t-il ${deN(c[3])} ?`,
      figure: amBarre(a / b, "?", lab(N), pourcent ? `${amT(p)} %` : `${a}/${b}`, `Barre des ${N} ${c[3]} : la partie coloriée représente ${pourcent ? amT(p) + " %" : a + "/" + b}`),
      mode: "nombre", prefixe: "Réponse :", suffixe: c[3], attendu: n,
      erreurs: amErr([[(N * 100) / p, "Pour trouver une partie, on **multiplie** le tout par la proportion : la partie est plus petite que le tout."], pourcent ? [N * p, "Il faut diviser par $100$ : $" + nb(p) + "\\,\\% = " + nb(p / 100) + "$."] : [N / b, `Ça, c'est une seule part : il en faut $${a}$.`], [N - n, "Ça, c'est la partie restante."]]),
      aides: ["On cherche la partie : partie $=$ proportion $\\times$ tout.", `${pourcent ? `$${nb(p)}\\,\\% = ${nb(p / 100)}$.` : `Prendre les $\\dfrac{${a}}{${b}}$, c'est diviser par $${b}$ puis multiplier par $${a}$.`}`, `Calcule $${coef} \\times ${nb(N)}$.`],
      solution: `Partie $= ${coef} \\times ${nb(N)} = ${nb(n)}$ ${c[3]}.`
    };
    return {
      enonce: `$${nb(n)}$ ${c[0]} ${c[1]}, ce qui représente ${prop} de l'ensemble. Combien y a-t-il ${deN(c[3])} en tout ?`,
      figure: amBarre(a / b, lab(n), "?", pourcent ? `${amT(p)} %` : `${a}/${b}`, `Barre du total inconnu : la partie coloriée, ${n} ${c[3]}, représente ${pourcent ? amT(p) + " %" : a + "/" + b}`),
      mode: "nombre", prefixe: "Total :", suffixe: c[3], attendu: N,
      erreurs: amErr([[(n * p) / 100, "Tu as pris un pourcentage de la partie. Ici on cherche le **tout** : il est plus grand que la partie."], [n * p, "On divise la partie par la proportion, on ne la multiplie pas."], [n + p, "On ne peut pas ajouter un effectif et un pourcentage."]]),
      aides: ["On connaît la partie et la proportion : tout $= \\dfrac{\\text{partie}}{\\text{proportion}}$.", `Tout $= \\dfrac{${nb(n)}}{${coef}}$.`, pourcent ? `Astuce : $${nb(p)}\\,\\%$ du tout valent $${nb(n)}$, donc $1\\,\\%$ vaut $${nb(n)} \\div ${nb(p)}$.` : `$\\dfrac{1}{${b}}$ du tout vaut $${nb(n)} \\div ${a} = ${nb(n / a)}$.`],
      solution: `Tout $= \\dfrac{${nb(n)}}{${coef}} = ${nb(N)}$ ${c[3]}. Vérification : $${coef} \\times ${nb(N)} = ${nb(n)}$.`
    };
  };

  // Formulation additive et formulation multiplicative (coefficient multiplicateur)
  GEN["am-coefficient"] = function () {
    const t = pick([1, 2, 2.5, 3, 4, 5, 6, 7, 8, 10, 12, 12.5, 15, 18, 20, 25, 30, 35, 40, 45, 50, 60, 75, 80, 100, 150, 200]), baisse = t < 100 && Math.random() < 0.5, CM = +(1 + (baisse ? -t : t) / 100).toFixed(6), u = rand(0, 2);
    const ctx = pick(["Le prix du kilo de bananes au marché de Mamoudzou", "Le prix du ticket de barge", "Le nombre de touristes venus plonger dans le lagon", "La production de vanille d'une coopérative de Bandrélé", "Le loyer d'un appartement à Sada", "Le nombre d'abonnés du club de foot de Koungou"]);
    if (u === 0 || u === 1) return {
      enonce: u === 0 ? `Par quel nombre faut-il multiplier une quantité pour ${baisse ? "la diminuer" : "l'augmenter"} de $${nb(t)}\\,\\%$ ?` : `${ctx} ${baisse ? "baisse" : "augmente"} de $${nb(t)}\\,\\%$. Quel est le coefficient multiplicateur de cette évolution ?`,
      figure: u === 1 ? amEvol(CM, "", "", `${baisse ? "−" : "+"}${amT(t)} %`, `Barres avant et après une ${baisse ? "baisse" : "hausse"} de ${amT(t)} %`) : undefined,
      mode: "nombre", prefixe: "CM =", attendu: CM,
      erreurs: amErr([[t / 100, `Ça, c'est seulement la variation. Il faut partir de $1$ (la valeur de départ) : $1 ${baisse ? "-" : "+"} ${nb(t / 100)}$.`], [+(1 + (baisse ? t : -t) / 100).toFixed(6), `Attention au sens : ${baisse ? "une baisse donne un coefficient plus petit que $1$" : "une hausse donne un coefficient plus grand que $1$"}.`], baisse && t >= 10 ? null : [+(1 + (baisse ? -t : t) / 10).toFixed(6), `$${nb(t)}\\,\\% = ${nb(t / 100)}$, et non $${nb(t / 10)}$.`]].filter(Boolean)),
      aides: [baisse ? "Diminuer de $t\\,\\%$, c'est multiplier par $1 - \\dfrac{t}{100}$." : "Augmenter de $t\\,\\%$, c'est multiplier par $1 + \\dfrac{t}{100}$.", `$\\dfrac{${nb(t)}}{100} = ${nb(t / 100)}$.`, `$CM = 1 ${baisse ? "-" : "+"} ${nb(t / 100)}$.`],
      solution: `$CM = 1 ${baisse ? "-" : "+"} ${nb(t / 100)} = ${nb(CM)}$${CM > 1 ? " (plus grand que $1$ : c'est une hausse)" : " (entre $0$ et $1$ : c'est une baisse)"}.`
    };
    const bonne = `${baisse ? "diminuer" : "augmenter"} de $${nb(t)}\\,\\%$`, f = [`${baisse ? "augmenter" : "diminuer"} de $${nb(t)}\\,\\%$`, `${baisse ? "diminuer" : "augmenter"} de $${nb(+(CM * 100).toFixed(4))}\\,\\%$`, `${baisse ? "diminuer" : "augmenter"} de $${nb(+(t / 100).toFixed(4))}\\,\\%$`, `${baisse ? "augmenter" : "diminuer"} de $${nb(+(CM * 100).toFixed(4))}\\,\\%$`];
    const m = melangeChoix(`Cela revient à ${bonne}`, f.map((x) => `Cela revient à ${x}`));
    return {
      enonce: `On multiplie une quantité par $${nb(CM)}$. Que se passe-t-il ?`, mode: "choix", choix: m.choix, attendu: m.attendu,
      aides: ["Si $CM > 1$, c'est une hausse ; si $0 < CM < 1$, c'est une baisse.", CM > 1 ? `$${nb(CM)} = 1 + ${nb(t / 100)}$.` : `$${nb(CM)} = 1 - ${nb(t / 100)}$.`, `$${nb(t / 100)} = ${nb(t)}\\,\\%$.`],
      solution: `$${nb(CM)} = 1 ${baisse ? "-" : "+"} ${nb(t / 100)}$ : multiplier par $${nb(CM)}$, c'est ${bonne}.`
    };
  };

  // Taux d'évolution réciproque (valeurs exactes, ou estimations en choix multiple)
  GEN["am-reciproque"] = function () {
    const E = [[25, -20], [-20, 25], [100, -50], [-50, 100], [300, -75], [-75, 300], [60, -37.5], [-37.5, 60], [150, -60], [-60, 150], [400, -80], [-80, 400], [900, -90], [-90, 900], [-36, 56.25], [56.25, -36]];
    const dire = (t) => (t > 0 ? `une hausse de $${nb(t)}\\,\\%$` : `une baisse de $${nb(-t)}\\,\\%$`), u = rand(0, 3);
    if (u === 3) {
      const haus = Math.random() < 0.5, t = pick(haus ? [10, 15, 30, 35, 40, 70, 80] : [10, 15, 30, 35, 40, 45]), cm = 1 + (haus ? t : -t) / 100, r = +(100 * (1 / cm - 1)).toFixed(1);
      const bonne = `${r < 0 ? "une baisse" : "une hausse"} d'environ $${nb(Math.abs(r))}\\,\\%$`;
      const f = [`${r < 0 ? "une baisse" : "une hausse"} de $${t}\\,\\%$`, `${r < 0 ? "une baisse" : "une hausse"} d'environ $${nb(+(100 * Math.abs(1 / (1 + (haus ? -t : t) / 100) - 1)).toFixed(1))}\\,\\%$`, `${r < 0 ? "une hausse" : "une baisse"} de $${t}\\,\\%$`];
      const m = melangeChoix(bonne, f), qui = pick(["Un prix subit", "Le prix du kilo de manioc subit", "Le nombre de touristes venus plonger dans le lagon subit", "La récolte de vanille d'une coopérative de Bandrélé subit", "Le loyer d'un studio à Mamoudzou subit"]);
      return {
        enonce: `${qui} ${dire(haus ? t : -t)}. Quelle évolution permet de revenir à la valeur de départ ?`, mode: "choix", choix: m.choix, attendu: m.attendu,
        aides: [`Coefficient de l'évolution : $CM = ${nb(cm)}$.`, `Coefficient réciproque : $CM' = \\dfrac{1}{${nb(cm)}} \\approx ${nb(+(1 / cm).toFixed(3))}$.`, "Le pourcentage du retour s'applique à la valeur **modifiée** : il n'est pas égal au premier."],
        solution: `$CM' = \\dfrac{1}{${nb(cm)}} \\approx ${nb(+(1 / cm).toFixed(3))}$, soit ${bonne}.`,
        figure: amAllerRetour(`${haus ? "+" : "−"}${t} %`, "?", `Aller-retour : ${haus ? "hausse" : "baisse"} de ${t} %, puis évolution réciproque inconnue`)
      };
    }
    const [t, r] = pick(E), cm = 1 + t / 100, cmr = +(1 / cm).toFixed(6), ctx = pick(["Le prix du kilo de mangues au marché de Mamoudzou", "Le prix d'un régime de bananes", "La production d'ylang-ylang d'une exploitation de Combani", "Le nombre de touristes venus plonger dans le lagon", "Le nombre d'élèves inscrits au club de foot du lycée"]);
    if (u === 2) return {
      enonce: Math.random() < 0.5 ? `Une évolution a pour coefficient multiplicateur $CM = ${nb(cm)}$. Quel est le coefficient multiplicateur $CM'$ de l'évolution réciproque, qui ramène à la valeur de départ ?` : `${ctx} est ${/^La /.test(ctx) ? "multipliée" : "multiplié"} par $${nb(cm)}$. Par quel nombre faut-il ${/^La /.test(ctx) ? "la" : "le"} multiplier ensuite pour revenir à la valeur de départ ?`,
      mode: "nombre", prefixe: "CM′ =", attendu: cmr,
      erreurs: amErr([[+(2 - cm).toFixed(6), `Ce n'est pas $2 - ${nb(cm)}$ : le coefficient réciproque est l'**inverse** $\\dfrac{1}{CM}$.`], [-cm, "Un coefficient multiplicateur est toujours positif."]]),
      aides: ["Appliquer l'évolution puis sa réciproque ne change rien : $CM \\times CM' = 1$.", "Donc $CM' = \\dfrac{1}{CM}$.", `Calcule $\\dfrac{1}{${nb(cm)}}$.`],
      solution: `$CM' = \\dfrac{1}{${nb(cm)}} = ${nb(cmr)}$ : ${dire(t)} est annulée par ${dire(r)}.`
    };
    return {
      enonce: u === 0 ? pick([`Quel taux d'évolution permet d'annuler ${dire(t)} et de revenir à la valeur initiale ? (écris $-$ pour une baisse)`, `Une quantité subit ${dire(t)}. Quel taux d'évolution faut-il appliquer ensuite pour retrouver la valeur de départ ? (écris $-$ pour une baisse)`, `Après ${dire(t)}, quel taux d'évolution ramène à la valeur initiale ? (écris $-$ pour une baisse)`]) : `${ctx} a ${t > 0 ? "augmenté" : "baissé"} de $${nb(Math.abs(t))}\\,\\%$ en un an. Quel taux d'évolution faudrait-il ensuite pour revenir à la valeur de départ ? (écris $-$ pour une baisse)`,
      figure: amAllerRetour(`${t > 0 ? "+" : "−"}${amT(Math.abs(t))} %`, "?", `Aller-retour : ${t > 0 ? "hausse" : "baisse"} de ${amT(Math.abs(t))} %, puis évolution réciproque inconnue`),
      mode: "nombre", prefixe: "t′ =", suffixe: "%", attendu: r,
      erreurs: amErr([[-t, "Ce n'est pas le taux changé de signe : l'évolution réciproque part de la valeur **déjà modifiée**."], [-r, `Attention au signe : pour revenir à la valeur de départ, il faut ${r < 0 ? "une **baisse**, donc un taux négatif" : "une **hausse**, donc un taux positif"}.`]]),
      aides: [`Coefficient de l'évolution : $CM = ${nb(cm)}$.`, `Coefficient réciproque : $CM' = \\dfrac{1}{${nb(cm)}} = ${nb(cmr)}$.`, "Taux réciproque : $t' = CM' - 1$, puis en pourcentage."],
      solution: `$CM' = \\dfrac{1}{${nb(cm)}} = ${nb(cmr)}$, donc $t' = ${nb(cmr)} - 1 = ${nb(r / 100)}$, soit $${r > 0 ? "+" : ""}${nb(r)}\\,\\%$. Ce n'est pas le même pourcentage que l'aller, car il s'applique à la valeur **modifiée**.`
    };
  };

  /* ===== Statistiques ===== */
  GEN["am-quartiles"] = function () {
    const C = pick([["les notes sur $20$ de", "élèves", 2, 20], ["les temps de trajet (en min) de", "élèves de Chirongui", 5, 45], ["le nombre de poissons pêchés par", "pirogues de M'tsamboro", 0, 25], ["les tailles (en cm) de", "joueurs du club de basket de Sada", 160, 195], ["les masses (en kg) de", "régimes de bananes", 8, 30]]);
    const n = rand(8, 12), s = Array.from({ length: n }, () => rand(C[2], C[3])), tri = s.slice().sort((x, y) => x - y), q1 = Math.random() < 0.5;
    const rang = Math.ceil(((q1 ? 1 : 3) * n) / 4), val = tri[rang - 1], med = n % 2 ? tri[(n - 1) / 2] : (tri[n / 2 - 1] + tri[n / 2]) / 2;
    return {
      enonce: `Voici ${C[0]} $${n}$ ${C[1]} : $${s.join(" ; ")}$. Détermine le ${q1 ? "premier quartile $Q_1$" : "troisième quartile $Q_3$"}.`,
      mode: "nombre", prefixe: q1 ? "Q₁ =" : "Q₃ =", attendu: val,
      erreurs: amErr([[s[rang - 1], "Il faut d'abord **ranger** les valeurs dans l'ordre croissant."], [rang, "Ça, c'est le **rang** du quartile. Il faut lire la valeur qui se trouve à ce rang."], [med, "Ça, c'est la médiane. Le quartile s'obtient avec le quart (ou les trois quarts) de l'effectif."]]),
      aides: ["Range les valeurs dans l'ordre croissant.", `${q1 ? "$Q_1$" : "$Q_3$"} est la valeur de rang $${q1 ? `\\dfrac{n}{4}` : `\\dfrac{3n}{4}`}$, arrondi à l'entier supérieur : ici $${q1 ? n : 3 * n} \\div 4 = ${nb((q1 ? n : 3 * n) / 4)}$, donc le rang $${rang}$.`, `Valeurs rangées : $${tri.join(" ; ")}$.`],
      solution: `Valeurs rangées : $${tri.join(" ; ")}$. Rang $${rang}$ : ${q1 ? "$Q_1$" : "$Q_3$"} $= ${val}$.\n\nAu moins ${q1 ? "$25\\,\\%$" : "$75\\,\\%$"} des valeurs sont inférieures ou égales à $${val}$.`
    };
  };

  // Moyenne avec des effectifs, des coefficients ou des classes (nombres choisis pour un calcul de tête)
  GEN["am-moyenne-ponderee"] = function () {
    const t = rand(0, 3), part = (N, k) => { let e; do { e = Array.from({ length: k }, () => 1); for (let r = N - k; r > 0; r--) e[rand(0, k - 1)]++; } while (e.some((x) => x > 0.6 * N)); return e; };
    if (t === 2) {
      const a = pick([0, 0, 10]), w = pick([5, 10]), N = pick([10, 20, 20, 25]), eff = part(N, 4), ctr = eff.map((_, k) => a + w * k + w / 2), S = ctr.reduce((s, c, k) => s + c * eff[k], 0);
      return {
        enonce: `On a relevé le temps de trajet (en minutes) de $${N}$ élèves du lycée de Kahani. En prenant le centre de chaque classe, calcule le temps moyen.`,
        tableau: { lignes: [["\\text{Temps (min)}", "\\text{Effectif}"]].concat(eff.map((e, k) => [`[${a + w * k}\\,;${a + w * (k + 1)}[`, e])) },
        mode: "nombre", prefixe: "Moyenne :", suffixe: "min", attendu: +(S / N).toFixed(6),
        erreurs: amErr([[ctr.reduce((x, y) => x + y, 0) / 4, "Chaque centre doit compter autant de fois que l'effectif de sa classe."], [eff.reduce((s, e, k) => s + (a + w * k) * e, 0) / N, "On prend le **centre** de chaque classe, pas sa borne inférieure."], [S, "Il reste à diviser par l'effectif total."]]),
        aides: [`Centres des classes : $${ctr.map(nb).join(" ; ")}$.`, `Somme des produits : $${ctr.map((c, k) => `${nb(c)} \\times ${eff[k]}`).join(" + ")} = ${nb(S)}$.`, `Effectif total : $${N}$. Divise.`],
        // la somme est écrite à part : dans une seule fraction, elle dépasserait d'un écran de 360 px
        solution: `Somme des produits : $${ctr.map((c, k) => `${nb(c)} \\times ${eff[k]}`).join(" + ")} = ${nb(S)}$.\n\n$\\bar{x} = \\dfrac{${nb(S)}}{${N}} = ${nb(S / N)}$ min.`
      };
    }
    const N = pick([4, 5, 8, 10, 10, 20]), k = Math.min(N, rand(3, 4)), vals = shuffle([6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]).slice(0, k).sort((x, y) => x - y), eff = part(N, k), S = vals.reduce((s, v, j) => s + v * eff[j], 0);
    const err = amErr([[vals.reduce((x, y) => x + y, 0) / k, "Chaque valeur doit compter autant de fois que son effectif (ou son coefficient)."], [S, "Il reste à diviser par l'effectif total (la somme des coefficients)."], [S / k, `On divise par la somme des effectifs, $${N}$, pas par le nombre de valeurs différentes.`]]);
    if (t === 1) {
      const p = pick(AM_NOMS);
      return {
        enonce: `Au premier trimestre, ${p} a obtenu ${vals.map((v, j) => `$${v}$ (coefficient $${eff[j]}$)`).join(", ")}. Calcule sa moyenne.`, mode: "nombre", prefixe: "Moyenne :", attendu: +(S / N).toFixed(6), erreurs: err,
        aides: ["Moyenne pondérée : $\\dfrac{\\text{somme des (note} \\times \\text{coefficient)}}{\\text{somme des coefficients}}$.", `Somme : $${vals.map((v, j) => `${v} \\times ${eff[j]}`).join(" + ")} = ${S}$.`, `Somme des coefficients : $${eff.join(" + ")} = ${N}$.`],
        solution: `$\\bar{x} = \\dfrac{${S}}{${N}} = ${nb(S / N)}$`
      };
    }
    if (t === 3) {
      const x0 = pick([0, 1]), vs = [0, 1, 2, 3, 4].map((v) => v + x0), e5 = part(pick([10, 10, 20, 20, 25]), 5), N5 = e5.reduce((a, b) => a + b, 0), S5 = vs.reduce((s, v, j) => s + v * e5[j], 0);
      return {
        enonce: `Le diagramme donne le nombre d'enfants des familles d'un quartier ${deN(pick(["Labattoir", "Kawéni", "Passamaïnty", "Tsoundzou", "Iloni"]))}. Calcule le nombre moyen d'enfants par famille.`,
        figure: graph({ xmin: x0 - 0.8, xmax: amXmax(x0 + 4, x0 - 0.8, "enfants"), ymin: -0.8, ymax: Math.max(...e5) + 1.6, h: 230, yetiq: Math.max(...e5) > 9 ? 2 : 1, xlabel: "enfants", ylabel: "familles", bars: e5.map((e, j) => ({ x: vs[j], y: e })), aria: `Diagramme en bâtons : nombre de familles selon le nombre d'enfants, de ${x0} à ${x0 + 4}` }),
        mode: "nombre", prefixe: "Moyenne :", attendu: +(S5 / N5).toFixed(6),
        erreurs: amErr([[vs.reduce((a, b) => a + b, 0) / 5, "Chaque valeur doit compter autant de fois que son effectif (la hauteur du bâton)."], [S5, "Il reste à diviser par le nombre total de familles."], [S5 / 5, `On divise par le nombre total de familles, $${N5}$, et non par le nombre de valeurs différentes, $5$.`]]),
        aides: ["Lis l'effectif de chaque valeur sur le diagramme.", `Somme des produits : $${vs.map((v, j) => `${v} \\times ${e5[j]}`).join(" + ")} = ${S5}$.`, `Nombre de familles : $${e5.join(" + ")} = ${N5}$.`],
        solution: `$\\bar{x} = \\dfrac{${S5}}{${N5}} = ${nb(S5 / N5)}$ enfant${S5 / N5 >= 2 ? "s" : ""} par famille.`
      };
    }
    // valeurs décalées de d : la moyenne est décalée de d
    const [txt0, nomV, nomE, quoi0, d] = pick([
      ["Voici les notes obtenues à un devoir par les élèves d'une classe du lycée de Sada.", "Note", "Élèves", "la note moyenne", 0],
      ["Voici le nombre de tortues venues pondre chaque nuit sur la plage de N'Gouja pendant une période.", "Tortues", "Nuits", "le nombre moyen de tortues par nuit", 0],
      ["Voici les pointures des joueurs du club de football de Koungou.", "Pointure", "Joueurs", "la pointure moyenne", 28],
      ["Voici le nombre de poissons pêchés par sortie par les pirogues de M'tsamboro.", "Poissons", "Sorties", "le nombre moyen de poissons par sortie", 0]
    ]);
    const vd = vals.map((v) => v + d), Sd = S + d * N;
    return {
      enonce: `${txt0} Calcule ${quoi0}.`,
      tableau: { var: `\\text{${nomV}}`, nom: `\\text{${nomE}}`, x: vd, y: eff },
      mode: "nombre", prefixe: "Moyenne :", attendu: +(Sd / N).toFixed(6),
      erreurs: amErr([[vd.reduce((x, y) => x + y, 0) / k, "Chaque valeur doit compter autant de fois que son effectif."], [Sd, "Il reste à diviser par l'effectif total."], [Sd / k, `On divise par l'effectif total, $${N}$, pas par le nombre de valeurs différentes.`]]),
      aides: ["Moyenne pondérée : $\\dfrac{\\text{somme des (valeur} \\times \\text{effectif)}}{\\text{effectif total}}$.", `Somme : $${vd.map((v, j) => `${v} \\times ${eff[j]}`).join(" + ")} = ${Sd}$.`, `Effectif total : $${eff.join(" + ")} = ${N}$.`],
      solution: `Somme des produits : $${vd.map((v, j) => `${v} \\times ${eff[j]}`).join(" + ")} = ${Sd}$.\n\n$\\bar{x} = \\dfrac{${Sd}}{${N}} = ${nb(Sd / N)}$`
    };
  };

  // Lire un diagramme : bâtons, circulaire, semi-circulaire, nuage de points
  GEN["am-diagramme"] = function () {
    const t = rand(0, 4);
    if (t === 1 || t === 2) {
      const semi = t === 2, [titre, noms] = semi ? pick([["Élection du délégué de la classe", ["Anli", "Zaïnaba", "Moussa", "Awa"]], ["Vote pour le voyage de fin d'année", ["Saziley", "N'Gouja", "Choungui", "Îlot"]]]) : pick([["Moyen de transport des élèves d'un lycée de Mamoudzou", ["Bus", "À pied", "Barge", "Taxi"]], ["Fruit préféré des élèves de Seconde", ["Mangue", "Banane", "Coco", "Ananas"]], ["Sport pratiqué au club de Sada", ["Foot", "Hand", "Basket", "Va'a"]]]);
      let ps; do { ps = [rand(semi ? 3 : 2, 9), rand(semi ? 3 : 2, 9), rand(semi ? 3 : 2, 9)].map((x) => 5 * x); } while (ps[0] + ps[1] + ps[2] > (semi ? 85 : 90)); // en demi-disque, des secteurs d'au moins 15 % : les noms ne se chevauchent pas
      ps.push(100 - ps[0] - ps[1] - ps[2]);
      const plein = semi ? 180 : 360, ang = ps.map((p) => (p * plein) / 100), k = rand(0, 3), N = pick([20, 40, 60, 80, 100, 120, 200]), effectif = Math.random() < 0.45;
      const fig = amSecteurs(ang, noms, ang.map((a) => `${amT(a)}°`), semi, `${titre} : diagramme ${semi ? "semi-circulaire" : "circulaire"}, angles ${ang.map(amT).join(", ")} degrés`);
      return {
        enonce: `${titre} : voici le diagramme ${semi ? "semi-circulaire" : "circulaire"}${effectif ? ` ($${N}$ ${semi ? "votants" : "personnes interrogées"})` : ""}. ${effectif ? `Combien ${semi ? "de votants ont choisi" : "de personnes ont répondu"} « ${noms[k]} » ?` : `Quel pourcentage ${semi ? "des voix a obtenu" : "des réponses représente"} « ${noms[k]} » ?`}`,
        figure: fig, mode: "nombre", prefixe: "Réponse :", suffixe: effectif ? "" : "%", attendu: effectif ? (ps[k] * N) / 100 : ps[k],
        erreurs: amErr([[ang[k], "Ça, c'est l'angle en degrés. Il faut le comparer à l'angle total."], semi ? [ang[k] / 3.6, "Un demi-disque représente $100\\,\\%$ : c'est $180°$ pour $100\\,\\%$, et non $360°$."] : [ang[k] / 1.8, "Le disque entier fait $360°$, pas $180°$."], effectif ? [ps[k], "Ça, c'est le pourcentage ; on demande un effectif."] : null].filter(Boolean)),
        aides: [semi ? "Le demi-disque entier ($180°$) représente $100\\,\\%$ de l'effectif." : "Le disque entier ($360°$) représente $100\\,\\%$ de l'effectif.", `Le secteur « ${noms[k]} » mesure $${nb(ang[k])}°$ : $\\dfrac{${nb(ang[k])}}{${plein}} = ${nb(ps[k] / 100)}$.`, effectif ? `Effectif : $${nb(ps[k] / 100)} \\times ${N}$.` : "Écris cette proportion en pourcentage."],
        solution: `$\\dfrac{${nb(ang[k])}}{${plein}} = ${nb(ps[k] / 100)} = ${ps[k]}\\,\\%$.${effectif ? ` Effectif : $${nb(ps[k] / 100)} \\times ${N} = ${(ps[k] * N) / 100}$.` : ""}`
      };
    }
    if (t === 3) {
      const T = Array.from({ length: 10 }, () => rand(25, 33)), k = rand(27, 31), j = rand(1, 10), q = rand(0, 2), mx = Math.max(...T), mn = Math.min(...T);
      const Q = [[`Combien de jours la température a-t-elle été strictement supérieure à $${k}\\,°C$ ?`, T.filter((x) => x > k).length, `Compte les points situés au-dessus de la ligne $${k}\\,°C$ (sans ceux qui sont dessus).`, ""], [`Quelle température a-t-on relevée le jour $${j}$ ?`, T[j - 1], `Repère le jour $${j}$ sur l'axe horizontal, puis lis l'ordonnée du point.`, "°C"], ["Quel est l'écart entre la température la plus haute et la plus basse ?", mx - mn, `Point le plus haut : $${mx}\\,°C$ ; point le plus bas : $${mn}\\,°C$.`, "°C"]][q];
      if (q === 0 && T.filter((x) => x > k).length === 0) T[rand(0, 9)] = k + 1;
      return {
        enonce: `Le nuage de points donne la température relevée à midi à Pamandzi pendant $10$ jours. ${Q[0]}`,
        figure: graph({ xmin: -0.6, xmax: 11, ymin: 24, ymax: 34.6, ystep: 1, yetiq: 2, h: 260, padL: 30, padB: 22, xlabel: "jour", ylabel: "°C", points: T.map((y, i) => ({ x: i + 1, y })), aria: "Nuage de points : température à midi en fonction du jour, du jour 1 au jour 10, axe vertical commençant à 24 °C" }),
        mode: "nombre", prefixe: "Réponse :", suffixe: Q[3], attendu: q === 0 ? T.filter((x) => x > k).length : Q[1],
        aides: ["Attention : l'axe vertical commence à $24\\,°C$, pas à $0$.", "Chaque point correspond à un jour : abscisse = jour, ordonnée = température.", Q[2]],
        solution: `Températures lues, du jour $1$ au jour $10$ : $${T.join(" ; ")}$. ${q === 0 ? `Jours au-dessus de $${k}\\,°C$ : $${T.filter((x) => x > k).length}$.` : q === 1 ? `Le jour $${j}$ : $${T[j - 1]}\\,°C$.` : `Écart : $${mx} - ${mn} = ${mx - mn}\\,°C$.`}`
      };
    }
    const [sujet, xl, phrase, unite] = pick([["nombre de frères et sœurs", "frères et sœurs", "ont", "frères et sœurs"], ["nombre de livres lus cet été", "livres", "ont lu", "livres"], ["nombre de repas pris à la cantine par semaine", "repas", "prennent", "repas"], ["nombre de traversées en barge dans la semaine", "traversées", "font", "traversées"]]);
    let eff; do { eff = Array.from({ length: 6 }, () => rand(1, 9)); } while (eff.filter((e) => e === Math.max(...eff)).length > 1);
    const N = eff.reduce((x, y) => x + y), k = rand(2, 4);
    const o = { xmin: -0.8, xmax: amXmax(5, -0.8, xl), ymin: -0.8, ymax: 10, h: 240, xlabel: xl, ylabel: "effectif", bars: eff.map((e, j) => ({ x: j, y: e })), aria: `Diagramme en bâtons des effectifs selon le ${sujet}, de 0 à 5` };
    const Q = pick([
      [`Combien d'élèves ${phrase} au moins $${k}$ ${unite} ?`, eff.slice(k).reduce((x, y) => x + y), `Additionne les effectifs des valeurs $${k}$ à $5$ : « au moins $${k}$ » veut dire $${k}$ ou plus.`, `$${eff.slice(k).join(" + ")} = ${eff.slice(k).reduce((x, y) => x + y)}$`, [[eff.slice(k + 1).reduce((x, y) => x + y), `« Au moins $${k}$ » inclut la valeur $${k}$.`], [eff[k], `Il faut aussi compter les valeurs plus grandes que $${k}$.`]]],
      ["Combien d'élèves ont été interrogés ?", N, "L'effectif total est la somme de tous les effectifs.", `$${eff.join(" + ")} = ${N}$`, [[6, "Ça, c'est le nombre de valeurs différentes (de $0$ à $5$). On demande le nombre d'élèves : additionne les hauteurs des bâtons."], [Math.max(...eff), "Ça, c'est seulement le plus haut bâton."]]],
      [`Quelle valeur du ${sujet} est la plus fréquente ?`, eff.indexOf(Math.max(...eff)), "Cherche le bâton le plus haut, puis lis sa valeur sur l'axe horizontal.", `Le bâton le plus haut est en $${eff.indexOf(Math.max(...eff))}$ (effectif $${Math.max(...eff)}$)`, [[Math.max(...eff), "Ça, c'est l'effectif (la hauteur du bâton). On demande la valeur, lue sur l'axe horizontal."]]],
      [`Combien d'élèves ${phrase} moins de $${k}$ ${unite} ?`, eff.slice(0, k).reduce((x, y) => x + y), `« Moins de $${k}$ » : les valeurs $0$ à $${k - 1}$, sans $${k}$.`, `$${eff.slice(0, k).join(" + ")} = ${eff.slice(0, k).reduce((x, y) => x + y)}$`, [[eff.slice(0, k + 1).reduce((x, y) => x + y), `« Moins de $${k}$ » exclut la valeur $${k}$.`]]]
    ]);
    return {
      enonce: `On a demandé à des élèves leur ${sujet}. ${Q[0]}`,
      figure: graph(o), mode: "nombre", prefixe: "Réponse :", attendu: Q[1], erreurs: amErr(Q[4]),
      aides: ["Lis la hauteur de chaque bâton sur l'axe vertical : c'est l'effectif.", Q[2], "Vérifie ta lecture sur le quadrillage."],
      solution: `Effectifs lus : $${eff.join(" ; ")}$ pour les valeurs $0$ à $5$. ${Q[3]}.`
    };
  };

  // Lire un graphique en repérant l'origine, les unités et les graduations
  GEN["am-lire-graphique"] = function () {
    if (Math.random() < 0.5) {
      // Histogramme : l'axe horizontal ne commence pas à 0, un carreau vertical vaut 1 ou 2
      const w = pick([5, 10]), a0 = w === 5 ? pick([5, 10, 15]) : pick([10, 20]);
      const ystep = pick([1, 2]), yetiq = ystep === 1 ? 5 : 10;
      const eff = Array.from({ length: 5 }, () => ystep * rand(1, 13));
      const ymax = Math.max(...eff) + 1.5 * ystep;
      const N = eff.reduce((x, y) => x + y), k = rand(1, 3);
      const cl = (j) => `[${a0 + j * w}\\,;${a0 + (j + 1) * w}[`;
      const Q = pick([
        [`Combien d'élèves mettent entre $${a0 + k * w}$ et $${a0 + (k + 1) * w}$ minutes (classe $${cl(k)}$) ?`, eff[k], `Le rectangle de la classe $${cl(k)}$ a une hauteur de $${eff[k]}$.`],
        [`Combien d'élèves mettent moins de $${a0 + (k + 1) * w}$ minutes ?`, eff.slice(0, k + 1).reduce((x, y) => x + y), `Classes de $${a0}$ à $${a0 + (k + 1) * w}$ : $${eff.slice(0, k + 1).join(" + ")} = ${eff.slice(0, k + 1).reduce((x, y) => x + y)}$.`],
        ["Combien d'élèves ont été interrogés ?", N, `$${eff.join(" + ")} = ${N}$.`],
        ["Sur l'axe vertical, combien d'élèves représente un carreau ?", ystep, `Entre deux nombres écrits, il y a $${yetiq / ystep}$ carreaux pour $${yetiq}$ élèves : un carreau vaut $${ystep}$.`]
      ]);
      const o = {
        xmin: a0, xmax: a0 + 5.7 * w, ymin: 0, ymax, xstep: w, ystep, yetiq, h: 270, padL: 30, padB: 22,
        xlabel: "min", ylabel: "effectif",
        rects: eff.map((e, j) => ({ a: a0 + j * w, b: a0 + (j + 1) * w, h: e })),
        aria: `Histogramme des temps de trajet par classes de ${w} minutes à partir de ${a0} minutes`
      };
      return {
        enonce: `On a relevé le temps de trajet domicile-lycée d'élèves de Dembéni, en minutes. ${Q[0]}`,
        figure: graph(o), mode: "nombre", prefixe: "Réponse :", attendu: Q[1],
        aides: [
          `Repère les unités : l'axe horizontal commence à $${a0}$ (pas à $0$) et chaque rectangle couvre $${w}$ minutes.`,
          `Sur l'axe vertical, un nombre est écrit tous les $${yetiq}$ : un carreau vaut donc $${ystep}$ élève${ystep > 1 ? "s" : ""}.`,
          Q[2]
        ],
        solution: `Effectifs lus, classe par classe : $${eff.join(" ; ")}$. ${Q[2]}`
      };
    }
    // Courbe de température : l'axe vertical commence à 18 ou 20, un carreau horizontal vaut 2 h
    const tmin = rand(21, 24), d = rand(5, 8), tmax = tmin + d;
    const T = [tmin + 2, tmin + 1, tmin, tmin + 1, tmin + Math.round(0.4 * d), tmin + Math.round(0.7 * d), tmax - 1, tmax, tmax - 1, tmin + Math.round(0.6 * d), tmin + Math.round(0.45 * d), tmin + Math.round(0.35 * d), tmin + 2];
    const f = (x) => { const i = Math.min(11, Math.floor(x / 2)); return T[i] + ((T[i + 1] - T[i]) * (x - 2 * i)) / 2; };
    const ymin = 2 * Math.floor((tmin - 2) / 2);
    const h = pick([2, 6, 10, 18, 22]);
    const Q = pick([
      [`Quelle est la température à $${h}$ h ?`, T[h / 2], `Repère $${h}$ h : c'est la graduation entre $${h - 2}$ et $${h + 2}$. Monte jusqu'à la courbe, puis lis la température : $${T[h / 2]}\\,°C$.`, "°C"],
      ["À quelle heure la température est-elle la plus élevée ?", 14, `Le point le plus haut de la courbe est à $14$ h ($${tmax}\\,°C$).`, "h"],
      ["De combien de degrés la température monte-t-elle entre $4$ h et $14$ h ?", d, `À $4$ h : $${tmin}\\,°C$. À $14$ h : $${tmax}\\,°C$. Hausse : $${tmax} - ${tmin} = ${d}\\,°C$.`, "°C"]
    ]);
    const o = {
      xmin: 0, xmax: 25.6, ymin, ymax: tmax + 2.6, xstep: 2, xetiq: 4, ystep: 1, yetiq: 2, h: 290, padL: 30, padB: 22,
      xlabel: "heure (h)", ylabel: "°C",
      curves: [{ f, a: 0, b: 24, closed: false }],
      points: T.map((t, i) => ({ x: 2 * i, y: t })),
      aria: `Courbe de la température au cours d'une journée, de 0 h à 24 h, axe vertical commençant à ${ymin} °C`
    };
    return {
      enonce: `La courbe donne la température relevée à Mamoudzou au cours d'une journée. ${Q[0]}`,
      figure: graph(o), mode: "nombre", prefixe: "Réponse :", suffixe: Q[3], attendu: Q[1],
      aides: [
        `Attention à l'origine : l'axe vertical commence à $${ymin}\\,°C$, pas à $0$.`,
        "Repère les unités : sur l'axe horizontal un carreau vaut $2$ h, sur l'axe vertical un carreau vaut $1\\,°C$.",
        Q[2]
      ],
      solution: Q[2]
    };
  };

  // Passer du graphique aux données et vice-versa
  GEN["am-graphique-donnees"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      // Des données au diagramme circulaire
      const N = pick([36, 40, 60, 72, 90, 120]), noms = ["Bus", "À pied", "Taxi", "Barge"];
      let eff; do { const c = [rand(1, N - 3), rand(1, N - 3), rand(1, N - 3)].sort((x, y) => x - y); eff = [c[0], c[1] - c[0], c[2] - c[1], N - c[2]]; } while (eff.some((e) => e < N / 12) || eff.some((e) => !Number.isInteger((e * 360) / N)));
      const k = rand(0, 3), ang = (eff[k] * 360) / N;
      return {
        enonce: `On a demandé à $${N}$ élèves de Petite-Terre comment ils viennent au lycée. On veut représenter ces données par un diagramme circulaire. Quel angle faut-il donner au secteur « ${noms[k]} » ?`,
        tableau: { var: "\\text{Transport}", nom: "\\text{Effectif}", x: noms.map((n) => `\\text{${n}}`), y: eff },
        mode: "nombre", prefixe: "Angle :", suffixe: "°", attendu: ang,
        erreurs: amErr([[+((eff[k] * 100) / N).toFixed(2), "Ça, c'est le pourcentage : le disque entier fait $360°$, pas $100$."], [eff[k], "Ça, c'est l'effectif. L'angle est proportionnel à l'effectif : $360°$ pour tout l'effectif."]]),
        aides: ["Le disque entier ($360°$) représente tout l'effectif.", `Les angles sont proportionnels aux effectifs : $${N}$ élèves $\\to 360°$, donc $1$ élève $\\to ${nb(360 / N)}°$.`, `$\\dfrac{${eff[k]}}{${N}} \\times 360$.`],
        solution: `$\\dfrac{${eff[k]}}{${N}} \\times 360 = ${eff[k]} \\times ${nb(360 / N)} = ${ang}°$.`
      };
    }
    if (t === 1) {
      // Du diagramme aux données : retrouver le bâton manquant
      const eff = Array.from({ length: 6 }, () => rand(1, 9));
      const k = rand(1, 4), N = eff.reduce((x, y) => x + y);
      const o = {
        xmin: -0.8, xmax: amXmax(5, -0.8, "livres"), ymin: -0.8, ymax: 10, h: 240, xlabel: "livres", ylabel: "effectif",
        bars: eff.map((e, j) => ({ x: j, y: e })).filter((b) => b.x !== k),
        marques: [{ x: k, y: 0.5, texte: "?" }],
        aria: `Diagramme en bâtons du nombre de livres lus, de 0 à 5, le bâton de ${k} est effacé`
      };
      const autres = eff.filter((_, j) => j !== k), S = autres.reduce((x, y) => x + y);
      return {
        enonce: `On a demandé à $${N}$ élèves combien de livres ils ont lus cet été. Le bâton de la valeur $${k}$ a été effacé. Combien d'élèves ont lu $${k}$ livre${k > 1 ? "s" : ""} ?`,
        figure: graph(o), mode: "nombre", prefixe: "Réponse :", attendu: eff[k],
        erreurs: amErr([[S, "Ça, c'est la somme des bâtons visibles. Il manque ce qu'il faut pour arriver à l'effectif total."], [N, "Ça, c'est l'effectif total : retire les bâtons visibles."]]),
        aides: ["Lis les effectifs de tous les bâtons visibles.", `Additionne-les : $${autres.join(" + ")} = ${S}$.`, `Il manque ce qu'il faut pour arriver à $${N}$ : $${N} - ${S}$.`],
        solution: `Bâtons visibles : $${autres.join(" + ")} = ${S}$. Donc $${N} - ${S} = ${eff[k]}$ élèves ont lu $${k}$ livre${k > 1 ? "s" : ""}.`
      };
    }
    // Du diagramme en fréquences aux effectifs
    const N = pick([200, 300, 400, 500]);
    let fq; do { fq = Array.from({ length: 5 }, () => 5 * rand(1, 7)); } while (fq.reduce((x, y) => x + y) >= 100 || fq.reduce((x, y) => x + y) < 65);
    fq.push(100 - fq.reduce((x, y) => x + y));
    fq = shuffle(fq);
    const k = rand(0, 5), n = (fq[k] * N) / 100;
    const o = {
      xmin: -0.8, xmax: amXmax(5, -0.8, "repas"), ymin: -2.5, ymax: Math.max(...fq) + 4, ystep: 5, yetiq: 10, h: 260,
      xlabel: "repas", ylabel: "fréquence (%)",
      bars: fq.map((f, j) => ({ x: j, y: f })),
      aria: "Diagramme en bâtons des fréquences en pourcentage du nombre de repas pris à la cantine par semaine, de 0 à 5"
    };
    return {
      enonce: `Le diagramme donne la répartition (en $\\%$) des $${N}$ élèves d'un lycée de Mayotte selon le nombre de repas pris à la cantine par semaine. Combien d'élèves prennent $${k}$ repas par semaine ?`,
      figure: graph(o), mode: "nombre", prefixe: "Réponse :", attendu: n,
      erreurs: amErr([[fq[k], "Ça, c'est la fréquence en %. On demande un nombre d'élèves."], [fq[k] * N, "Il faut diviser par $100$ : $" + fq[k] + "\\,\\% = " + nb(fq[k] / 100) + "$."]]),
      aides: ["Sur l'axe vertical, un carreau vaut $5\\,\\%$.", `Le bâton de la valeur $${k}$ monte à $${fq[k]}\\,\\%$.`, `$${fq[k]}\\,\\%$ de $${N}$ : $\\dfrac{${fq[k]}}{100} \\times ${N}$.`],
      solution: `Lecture : $${fq[k]}\\,\\%$. Effectif : $\\dfrac{${fq[k]}}{100} \\times ${N} = ${n}$ élèves.`
    };
  };

  // Comparer deux boîtes à moustaches
  function boites(B) {
    const W = 320, pad = 18, lo = 0, hi = 20, H = 40 + 46 * B.length;
    const X = (v) => +(pad + 20 + ((v - lo) * (W - 2 * pad - 20)) / (hi - lo)).toFixed(1);
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="Boîtes à moustaches de ${B.map((b) => b.nom).join(" et ")}"><g class="g-grid">`;
    for (let v = lo; v <= hi; v += 2) s += `<line x1="${X(v)}" y1="8" x2="${X(v)}" y2="${H - 26}"/>`;
    s += `</g>`;
    B.forEach((b, i) => {
      const y = 30 + 46 * i;
      s += `<g class="g-box g-box-${i}"><line x1="${X(b.v[0])}" y1="${y}" x2="${X(b.v[1])}" y2="${y}"/><line x1="${X(b.v[3])}" y1="${y}" x2="${X(b.v[4])}" y2="${y}"/>`;
      s += `<line x1="${X(b.v[0])}" y1="${y - 7}" x2="${X(b.v[0])}" y2="${y + 7}"/><line x1="${X(b.v[4])}" y1="${y - 7}" x2="${X(b.v[4])}" y2="${y + 7}"/>`;
      s += `<rect x="${X(b.v[1])}" y="${y - 13}" width="${X(b.v[3]) - X(b.v[1])}" height="26"/><line class="med" x1="${X(b.v[2])}" y1="${y - 13}" x2="${X(b.v[2])}" y2="${y + 13}"/></g>`;
      s += `<text class="g-label" x="${pad - 6}" y="${y + 4}">${b.nom}</text>`;
    });
    s += `<g class="g-axis"><line x1="${X(lo)}" y1="${H - 26}" x2="${X(hi)}" y2="${H - 26}"/></g><g class="g-tick">`;
    for (let v = lo; v <= hi; v += 2) s += `<text x="${X(v)}" y="${H - 12}" text-anchor="middle">${v}</text>`;
    return s + `</g></svg>`;
  }
  FIGURES["boites-exemple"] = () => boites([{ nom: "A", v: [5, 9, 11, 13, 17] }, { nom: "B", v: [2, 6, 10, 15, 19] }]);
  GEN["am-boites"] = function () {
    const serie = () => { const v = [rand(0, 5), 0, 0, 0, 0]; v[1] = v[0] + rand(1, 4); v[2] = v[1] + rand(1, 4); v[3] = v[2] + rand(1, 4); v[4] = Math.min(20, v[3] + rand(1, 5)); return v; };
    let A, B; do { A = serie(); B = serie(); } while (A[2] === B[2] || A.join() === B.join() || A[3] - A[1] === B[3] - B[1]);
    const fig = boites([{ nom: "A", v: A }, { nom: "B", v: B }]);
    const ctx = "Les boîtes à moustaches résument les notes sur $20$ de deux classes $A$ et $B$ d'un lycée de Sada.";
    const lire = `Classe $A$ : min $${A[0]}$, $Q_1 = ${A[1]}$, médiane $${A[2]}$, $Q_3 = ${A[3]}$, max $${A[4]}$. Classe $B$ : min $${B[0]}$, $Q_1 = ${B[1]}$, médiane $${B[2]}$, $Q_3 = ${B[3]}$, max $${B[4]}$.`;
    const t = rand(0, 3);
    if (t === 0) {
      const best = A[2] > B[2] ? 0 : 1, M = Math.max(A[2], B[2]);
      return {
        enonce: `${ctx} Dans quelle classe peut-on affirmer qu'au moins la moitié des élèves ont une note supérieure ou égale à $${M}$ ?`,
        figure: fig, mode: "choix", choix: ["Dans la classe $A$", "Dans la classe $B$", "Dans les deux classes", "Dans aucune des deux classes"], attendu: best,
        aides: ["Le trait à l'intérieur de la boîte est la médiane.", "Au moins la moitié des notes sont supérieures ou égales à la médiane.", "Compare les deux médianes avec $" + M + "$."],
        solution: `${lire}\n\nLa médiane de la classe ${best ? "$B$" : "$A$"} vaut $${M}$ : au moins la moitié de ses élèves ont au moins cette note. Dans l'autre classe, la médiane est plus petite : on ne peut pas l'affirmer.`
      };
    }
    if (t === 1) {
      const c = Math.random() < 0.5 ? ["A", A] : ["B", B];
      return {
        enonce: `${ctx} Quel est l'écart interquartile de la classe $${c[0]}$ ?`,
        figure: fig, mode: "nombre", prefixe: "Q₃ − Q₁ =", attendu: c[1][3] - c[1][1],
        erreurs: amErr([[c[1][4] - c[1][0], "Ça, c'est l'étendue (maximum moins minimum). L'écart interquartile, c'est $Q_3 - Q_1$ : la largeur de la boîte."], [c[1][3] - c[1][2], "On calcule $Q_3 - Q_1$, la largeur de toute la boîte, pas l'écart entre la médiane et $Q_3$."]]),
        aides: ["Les bords de la boîte sont $Q_1$ (à gauche) et $Q_3$ (à droite).", "Écart interquartile $= Q_3 - Q_1$.", `Pour la classe $${c[0]}$ : $Q_1 = ${c[1][1]}$ et $Q_3 = ${c[1][3]}$.`],
        solution: `$Q_3 - Q_1 = ${c[1][3]} - ${c[1][1]} = ${c[1][3] - c[1][1]}$. Environ la moitié des notes de la classe $${c[0]}$ sont dans cet intervalle.`
      };
    }
    if (t === 2) {
      const plus = A[3] - A[1] > B[3] - B[1] ? 0 : 1;
      return {
        enonce: `${ctx} Quelle classe a les notes les plus dispersées autour de la médiane, d'après l'écart interquartile ?`,
        figure: fig, mode: "choix", choix: ["La classe $A$", "La classe $B$", "Les deux classes autant", "On ne peut pas le savoir avec ces boîtes"], attendu: plus,
        aides: ["L'écart interquartile $Q_3 - Q_1$ mesure la dispersion : c'est la largeur de la boîte.", `Classe $A$ : $${A[3]} - ${A[1]}$. Classe $B$ : $${B[3]} - ${B[1]}$.`, "La boîte la plus large correspond aux notes les plus dispersées."],
        solution: `${lire}\n\nÉcarts interquartiles : $${A[3] - A[1]}$ pour $A$ et $${B[3] - B[1]}$ pour $B$. Les notes de la classe $${plus ? "B" : "A"}$ sont plus dispersées.`
      };
    }
    const T = [
      [`Au moins $75\\,\\%$ des élèves de la classe $A$ ont une note supérieure ou égale à $${A[1]}$`, true, `$Q_1 = ${A[1]}$ : au moins $75\\,\\%$ des notes sont supérieures ou égales à $Q_1$.`],
      [`Au moins $25\\,\\%$ des élèves de la classe $B$ ont une note supérieure ou égale à $${B[3]}$`, true, `$Q_3 = ${B[3]}$ : au moins $25\\,\\%$ des notes sont supérieures ou égales à $Q_3$.`],
      [`La médiane des notes de la classe $B$ vaut $${B[2]}$`, true, "c'est le trait à l'intérieur de la boîte $B$."],
      [`L'étendue des notes de la classe $A$ vaut $${A[4] - A[0]}$`, true, `l'étendue vaut $${A[4]} - ${A[0]} = ${A[4] - A[0]}$.`],
      [`L'écart interquartile de la classe $A$ vaut $${A[3] - A[1]}$`, true, `$Q_3 - Q_1 = ${A[3]} - ${A[1]} = ${A[3] - A[1]}$.`],
      [`La médiane des notes de la classe $A$ vaut $${A[1]}$`, false, `$${A[1]}$ est le premier quartile $Q_1$ ; la médiane de $A$ vaut $${A[2]}$.`],
      [`L'étendue des notes de la classe $B$ vaut $${B[3] - B[1]}$`, false, `$${B[3] - B[1]}$ est l'écart interquartile ; l'étendue vaut $${B[4]} - ${B[0]} = ${B[4] - B[0]}$.`],
      [`La note la plus basse de la classe $B$ est $${B[1]}$`, false, `$${B[1]}$ est le premier quartile ; le minimum est $${B[0]}$.`],
      [`La note la plus haute de la classe $A$ est $${A[3]}$`, false, `$${A[3]}$ est le troisième quartile ; le maximum est $${A[4]}$.`],
      [`L'écart interquartile de la classe $B$ vaut $${B[4] - B[0]}$`, false, `$${B[4] - B[0]}$ est l'étendue ; l'écart interquartile vaut $${B[3]} - ${B[1]} = ${B[3] - B[1]}$.`]
    ];
    const q = vraiFaux4(T, ["Repère sur chaque boîte : minimum, $Q_1$, médiane, $Q_3$, maximum.", "Au moins $75\\,\\%$ des valeurs sont supérieures ou égales à $Q_1$ ; au moins $25\\,\\%$ sont supérieures ou égales à $Q_3$.", "Étendue : max $-$ min. Écart interquartile : $Q_3 - Q_1$."]);
    q.enonce = `${ctx} ${q.enonce}`; q.figure = fig; q.solution = `${lire}\n\n${q.solution}`;
    return q;
  };

  /* ===== Probabilités ===== */
  // Loi de probabilité : somme des probabilités, événement formé de plusieurs issues (roue de loterie)
  GEN["am-proba-loi"] = function () {
    let ps; do { const a = rand(2, 8), b = rand(2, 8), c = rand(2, 6); ps = [a, b, c, 20 - a - b - c].map((x) => x / 20); } while (ps[3] < 0.1);
    const noms = ["Mangue", "Banane", "Ananas", "Coco"], T = noms.map((n) => `\\text{${n}}`), miss = rand(0, 3), fig = Math.random() < 0.5;
    const roue = (txt) => amSecteurs(ps, noms, txt, false, "Roue de loterie partagée en quatre secteurs : mangue, banane, ananas et coco");
    if (Math.random() < 0.5) {
      const autres = ps.filter((_, i) => i !== miss), S = +(autres[0] + autres[1] + autres[2]).toFixed(4);
      return {
        enonce: "À la fête du village de Chiconi, une roue de loterie s'arrête sur un fruit. Voici les probabilités de chaque fruit. Détermine $p$.",
        tableau: { lignes: [["\\text{Fruit}", "\\text{Probabilité}"]].concat(T.map((x, i) => [x, i === miss ? "p" : nb(ps[i])])) }, figure: fig ? roue(ps.map((p, i) => (i === miss ? "?" : amT(p)))) : undefined,
        mode: "nombre", prefixe: "p =", attendu: ps[miss],
        erreurs: amErr([[S, "Ça, c'est la somme des trois autres probabilités : il faut la retirer à $1$."], [0.25, "Les fruits ne sont pas équiprobables : utilise les probabilités données."], [+(1 + S).toFixed(4), "La somme de toutes les probabilités vaut $1$ : $p = 1 - (\\dots)$."]]),
        aides: ["La somme des probabilités de toutes les issues vaut $1$.", `$p = 1 - (${autres.map(nb).join(" + ")})$.`, "Une probabilité est toujours entre $0$ et $1$."],
        solution: `$p = 1 - (${autres.map(nb).join(" + ")}) = 1 - ${nb(S)} = ${nb(ps[miss])}$`
      };
    }
    const [i, j] = shuffle([0, 1, 2, 3]).slice(0, 2).sort(), s = +(ps[i] + ps[j]).toFixed(4);
    return {
      enonce: `À la fête du village de Chiconi, une roue de loterie s'arrête sur un fruit, avec les probabilités ci-dessous. Quelle est la probabilité d'obtenir « ${noms[i].toLowerCase()} » ou « ${noms[j].toLowerCase()} » ?`,
      tableau: { lignes: [["\\text{Fruit}", "\\text{Probabilité}"]].concat(T.map((x, i) => [x, nb(ps[i])])) }, figure: fig ? roue(ps.map(amT)) : undefined,
      mode: "nombre", prefixe: "p =", attendu: s,
      erreurs: amErr([[+(ps[i] * ps[j]).toFixed(4), "Les deux issues ne peuvent pas se produire en même temps : on **additionne** leurs probabilités."], [+(1 - s).toFixed(4), "Ça, c'est la probabilité de l'événement contraire."], [0.5, "Les issues ne sont pas équiprobables : additionne les probabilités données."]]),
      aides: ["La probabilité d'un événement est la somme des probabilités des issues qui le réalisent.", `$p = ${nb(ps[i])} + ${nb(ps[j])}$.`, "Les deux issues ne peuvent pas se produire en même temps : on additionne."],
      solution: `$p = ${nb(ps[i])} + ${nb(ps[j])} = ${nb(s)}$`
    };
  };

  // Tableau croisé d'effectifs : probabilités et probabilités conditionnelles
  GEN["am-proba-tableau"] = function () {
    const C = pick([
      ["Voici la répartition des élèves de Seconde d'un lycée de Mamoudzou. On choisit un élève au hasard.", ["Fille", "Garçon"], ["Demi-pens.", "Externe"], "F", "l'élève est une fille", "D", "l'élève est demi-pensionnaire", "les filles", "les demi-pensionnaires"],
      ["Pendant une épidémie de dengue, on a interrogé des habitants de Koungou. On choisit un habitant au hasard.", ["Moustiquaire", "Sans"], ["Malade", "Pas malade"], "U", "l'habitant dort sous une moustiquaire", "M", "l'habitant a eu la dengue", "les habitants qui dorment sous une moustiquaire", "les habitants qui ont eu la dengue"],
      ["Une sortie en mer depuis Mamoudzou a réuni des touristes et des habitants. On choisit un participant au hasard.", ["Touriste", "Habitant"], ["Baleine vue", "Pas vue"], "T", "le participant est un touriste", "B", "le participant a vu une baleine", "les touristes", "ceux qui ont vu une baleine"],
      ["Au port de M'tsamboro, on a classé les sorties de pêche du mois. On choisit une sortie au hasard.", ["Pirogue", "Barque"], ["Bonne pêche", "Pêche faible"], "R", "la sortie s'est faite en pirogue", "G", "la pêche a été bonne", "les sorties en pirogue", "les bonnes pêches"],
      ["On a interrogé les passagers de la barge du matin. On choisit un passager au hasard.", ["Lycéen", "Adulte"], ["Vers Mamoudzou", "Vers Dzaoudzi"], "L", "le passager est un lycéen", "V", "le passager va à Mamoudzou", "les lycéens", "ceux qui vont à Mamoudzou"]
    ]);
    const k = pick([1, 2, 3, 4, 5]), a = rand(4, 15) * k, b = rand(4, 15) * k, c = rand(4, 15) * k, d = rand(4, 15) * k;
    const F = a + b, G = c + d, D = a + c, E = b + d, N = F + G, [A, B] = [C[3], C[5]], tx = (s) => `\\text{${s}}`;
    const lignes = [["", tx(C[2][0]), tx(C[2][1]), tx("Total")], [tx(C[1][0]), a, b, F], [tx(C[1][1]), c, d, G], [tx("Total"), D, E, N]];
    const Q = pick([
      [`P(${A})`, F, N, `On divise l'effectif de $${A}$ (total de la ligne) par l'effectif total.`, [[F, D, `Ça, c'est $P_${B}(${A})$. Pour $P(${A})$, on divise par l'effectif **total**.`], [G, N, `Ça, c'est $P(\\overline{${A}})$.`]]],
      [`P(${A} \\cap ${B})`, a, N, `$${A} \\cap ${B}$ : les deux à la fois (case du tableau). On divise par l'effectif total.`, [[a, F, `Ça, c'est $P_${A}(${B})$. Pour $P(${A} \\cap ${B})$, on divise par l'effectif **total**.`], [a, D, `Ça, c'est $P_${B}(${A})$. Pour $P(${A} \\cap ${B})$, on divise par l'effectif **total**.`]]],
      [`P_${A}(${B})`, a, F, `$P_${A}(${B})$ : **parmi ${C[7]}**, la proportion de ceux qui vérifient $${B}$. On divise par l'effectif de $${A}$.`, [[a, N, `Ça, c'est $P(${A} \\cap ${B})$. Pour $P_${A}(${B})$, on se place **parmi ${C[7]}** : on divise par $${F}$.`], [a, D, `Ça, c'est $P_${B}(${A})$. Pour $P_${A}(${B})$, on divise par l'effectif de $${A}$.`]]],
      [`P_${B}(${A})`, a, D, `$P_${B}(${A})$ : **parmi ${C[8]}**, la proportion de ceux qui vérifient $${A}$. On divise par l'effectif de $${B}$.`, [[a, F, `Ça, c'est $P_${A}(${B})$. Pour $P_${B}(${A})$, on divise par l'effectif de $${B}$.`], [a, N, `Ça, c'est $P(${A} \\cap ${B})$. Ici on se place parmi ${C[8]}.`]]],
      [`P(\\overline{${A}})`, G, N, `$\\overline{${A}}$ : l'événement contraire de $${A}$ (l'autre ligne du tableau).`, [[F, N, `Ça, c'est $P(${A})$. On demande l'événement contraire.`], [G, F, "On divise par l'effectif total."]]]
    ]);
    const v = Q[1] / Q[2], err = amErr(Q[4].map(([n, dd, msg]) => [n / dd, msg]));
    if (!amDecimal(v)) err.push(...amApprox(v));
    return {
      enonce: `${C[0]} On note $${A}$ : « ${C[4]} » et $${B}$ : « ${C[6]} ». Calcule $${Q[0]}$. Donne le résultat sous forme de fraction irréductible.`,
      tableau: { lignes }, mode: "nombre", prefixe: "Probabilité :", attendu: v, erreurs: err,
      aides: [Q[3], `Effectifs utiles : $${Q[1]}$ et $${Q[2]}$.`, "Réponds par une fraction, par exemple $12/50$, puis simplifie-la."],
      solution: `$${Q[0]} = \\dfrac{${Q[1]}}{${Q[2]}}${pgcd(Q[1], Q[2]) > 1 ? ` = ${frac(Q[1], Q[2])}` : ""}$`
    };
  };

  // Arbre pondéré : probabilité d'une intersection, probabilités totales, branche à compléter
  GEN["am-proba-arbre"] = function () {
    const C = pick([
      ["Un test de dépistage de la dengue est fait sur une personne.", "M", "la personne est malade", "T", "le test est positif"],
      ["Un jour de saison des pluies à Mamoudzou.", "M", "il pleut le matin", "R", "la barge a du retard"],
      ["Un pêcheur de M'tsamboro sort en mer.", "L", "il pêche au large", "G", "il fait une bonne pêche"],
      ["Un élève du lycée de Sada vient en cours.", "B", "il vient en bus", "H", "il arrive à l'heure"],
      ["On cueille une fleur d'ylang-ylang dans une parcelle de Combani.", "E", "le plant a reçu de l'engrais", "Q", "la fleur est de première qualité"]
    ]);
    const test = C[1] === "M" && C[3] === "T"; // dépistage : peu de malades, test fiable
    const a = pick(test ? [0.1, 0.2, 0.3] : [0.2, 0.3, 0.4, 0.6, 0.7, 0.8]), b = pick(test ? [0.8, 0.9] : [0.1, 0.2, 0.3, 0.4, 0.6, 0.8, 0.9]), c = pick(test ? [0.1, 0.2] : [0.1, 0.2, 0.3, 0.5, 0.6, 0.7]), [A, B] = [C[1], C[3]], v = (x) => amT(+x.toFixed(4)), d = (x) => nb(+x.toFixed(4));
    const ctx = `${C[0]} On note $${A}$ : « ${C[2]} » et $${B}$ : « ${C[4]} ». L'arbre pondéré résume la situation.`;
    const fig = arbre([A, "~" + A, B, "~" + B], [v(a), "?", v(b), "?", v(c), "?"]);
    const nA = `\\overline{${A}}`, nB = `\\overline{${B}}`, t = rand(0, 4);
    const Q = [
      [`P(${A} \\cap ${B})`, a * b, [[a + b, "Le long d'un chemin, on **multiplie** les probabilités."], [b, `Ça, c'est $P_${A}(${B})$ : il faut encore multiplier par $P(${A})$.`]], [`$${A} \\cap ${B}$ correspond au chemin qui passe par $${A}$ puis par $${B}$.`, `Le long d'un chemin, on multiplie : $P(${A} \\cap ${B}) = P(${A}) \\times P_${A}(${B})$.`, `$${d(a)} \\times ${d(b)}$.`], `$P(${A} \\cap ${B}) = P(${A}) \\times P_${A}(${B}) = ${d(a)} \\times ${d(b)} = ${d(a * b)}$`],
      [`P(${nA} \\cap ${B})`, (1 - a) * c, [[a * c, `$P(${nA}) = 1 - P(${A})$, pas $P(${A})$.`], [(1 - a) + c, "Le long d'un chemin, on **multiplie**."]], [`$P(${nA}) = 1 - P(${A}) = ${d(1 - a)}$.`, `Le long du chemin $${nA}$ puis $${B}$, on multiplie.`, `$${d(1 - a)} \\times ${d(c)}$.`], `$P(${nA} \\cap ${B}) = ${d(1 - a)} \\times ${d(c)} = ${d((1 - a) * c)}$`],
      [`P(${B})`, a * b + (1 - a) * c, [[a * b, `C'est seulement $P(${A} \\cap ${B})$ : il faut ajouter le chemin qui passe par $${nA}$.`], [b + c, "On additionne les **chemins** (produits), pas les branches du second niveau."]], [`Deux chemins mènent à $${B}$ : par $${A}$ et par $${nA}$.`, "On additionne les probabilités des deux chemins (formule des probabilités totales).", `$P(${B}) = ${d(a)} \\times ${d(b)} + ${d(1 - a)} \\times ${d(c)}$.`], `$P(${B}) = ${d(a)} \\times ${d(b)} + ${d(1 - a)} \\times ${d(c)} = ${d(a * b)} + ${d((1 - a) * c)} = ${d(a * b + (1 - a) * c)}$`],
      [`P(${A} \\cap ${nB})`, a * (1 - b), [[a * b, `Ça, c'est $P(${A} \\cap ${B})$. Ici on suit la branche $${nB}$.`], [1 - b, `Ça, c'est $P_${A}(${nB})$ : il faut encore multiplier par $P(${A})$.`]], [`La branche $${nB}$ après $${A}$ porte $1 - ${d(b)} = ${d(1 - b)}$.`, `On multiplie le long du chemin $${A}$ puis $${nB}$.`, `$${d(a)} \\times ${d(1 - b)}$.`], `$P(${A} \\cap ${nB}) = ${d(a)} \\times ${d(1 - b)} = ${d(a * (1 - b))}$`],
      [`P_{${nA}}(${nB})`, 1 - c, [[c, `Ça, c'est $P_{${nA}}(${B})$. Les branches issues d'un même nœud ont une somme égale à $1$.`], [1 - a, `Ça, c'est $P(${nA})$, la branche du premier niveau.`]], ["La somme des probabilités des branches issues d'un même nœud vaut $1$.", `Depuis $${nA}$, la branche vers $${B}$ porte $${d(c)}$.`, `$1 - ${d(c)}$.`], `$P_{${nA}}(${nB}) = 1 - P_{${nA}}(${B}) = 1 - ${d(c)} = ${d(1 - c)}$`]
    ][t];
    return {
      enonce: `${ctx} Calcule $${Q[0]}$.`, figure: fig, mode: "nombre", prefixe: `$${Q[0]} =$`, attendu: +Q[1].toFixed(6),
      erreurs: amErr(Q[2]), aides: Q[3], solution: Q[4]
    };
  };

  // Distinguer P(A ∩ B), P_A(B), P_B(A) et P(A ∪ B)
  GEN["am-proba-notation"] = function () {
    // [contexte, A, B, phrases pour P(A ∩ B), P_A(B), P_B(A), P(A ∪ B)]
    const [ctx, A, B, ph] = pick([
      ["On choisit au hasard un élève du lycée.", "l'élève est une fille", "l'élève fait du sport", ["que l'élève soit une fille qui fait du sport", "sachant que l'élève est une fille, qu'elle fasse du sport", "parmi les élèves qui font du sport, de choisir une fille", "que l'élève soit une fille ou fasse du sport"]],
      ["On choisit au hasard une personne qui a fait un test de dépistage.", "la personne est malade", "le test est positif", ["que la personne soit malade et ait un test positif", "sachant que la personne est malade, que son test soit positif", "sachant que le test est positif, que la personne soit malade", "que la personne soit malade ou ait un test positif"]],
      ["On choisit au hasard un client d'un magasin de Kawéni.", "le client a une carte de fidélité", "le client achète un produit en promotion", ["que le client ait une carte et achète un produit en promotion", "parmi les clients qui ont une carte, qu'il achète un produit en promotion", "parmi les clients qui achètent un produit en promotion, qu'il ait une carte", "que le client ait une carte ou achète un produit en promotion"]],
      ["On choisit au hasard un passager de la barge.", "le passager est un lycéen", "le passager voyage le matin", ["que le passager soit un lycéen qui voyage le matin", "sachant que le passager est un lycéen, qu'il voyage le matin", "parmi les passagers du matin, de choisir un lycéen", "que le passager soit un lycéen ou voyage le matin"]],
      ["On choisit au hasard un jour de l'année à Mamoudzou.", "il pleut", "la barge est en retard", ["qu'il pleuve et que la barge soit en retard", "sachant qu'il pleut, que la barge soit en retard", "sachant que la barge est en retard, qu'il pleuve", "qu'il pleuve ou que la barge soit en retard"]],
      ["On choisit au hasard une mangue sur un étal du marché de Mamoudzou.", "la mangue vient de Sada", "la mangue est mûre", ["que la mangue vienne de Sada et soit mûre", "parmi les mangues venant de Sada, d'en choisir une mûre", "sachant que la mangue est mûre, qu'elle vienne de Sada", "que la mangue vienne de Sada ou soit mûre"]],
      ["On choisit au hasard un touriste venu à Mayotte.", "le touriste a fait de la plongée", "le touriste a visité l'îlot de sable blanc", ["que le touriste ait fait de la plongée et visité l'îlot de sable blanc", "sachant que le touriste a fait de la plongée, qu'il ait visité l'îlot de sable blanc", "parmi les touristes qui ont visité l'îlot de sable blanc, d'en choisir un qui a fait de la plongée", "que le touriste ait fait de la plongée ou visité l'îlot de sable blanc"]],
      ["On choisit au hasard un élève de Seconde.", "l'élève a un smartphone", "l'élève utilise un réseau social chaque jour", ["que l'élève ait un smartphone et utilise un réseau social chaque jour", "sachant que l'élève a un smartphone, qu'il utilise un réseau social chaque jour", "sachant que l'élève utilise un réseau social chaque jour, qu'il ait un smartphone", "que l'élève ait un smartphone ou utilise un réseau social chaque jour"]],
      ["On choisit au hasard un habitant de Koungou pendant une épidémie de dengue.", "l'habitant dort sous une moustiquaire", "l'habitant tombe malade", ["que l'habitant dorme sous une moustiquaire et tombe malade", "parmi les habitants qui dorment sous une moustiquaire, d'en choisir un qui tombe malade", "parmi les habitants qui tombent malades, d'en choisir un qui dort sous une moustiquaire", "que l'habitant dorme sous une moustiquaire ou tombe malade"]],
      ["On choisit au hasard un plant d'ylang-ylang d'une parcelle.", "le plant a reçu de l'engrais", "le plant donne beaucoup de fleurs", ["que le plant ait reçu de l'engrais et donne beaucoup de fleurs", "sachant que le plant a reçu de l'engrais, qu'il donne beaucoup de fleurs", "sachant que le plant donne beaucoup de fleurs, qu'il ait reçu de l'engrais", "que le plant ait reçu de l'engrais ou donne beaucoup de fleurs"]],
      ["On choisit au hasard un plongeur du club de Mamoudzou.", "le plongeur a vu une tortue", "le plongeur a vu un dauphin", ["que le plongeur ait vu à la fois une tortue et un dauphin", "parmi les plongeurs qui ont vu une tortue, d'en choisir un qui a vu un dauphin", "parmi les plongeurs qui ont vu un dauphin, d'en choisir un qui a vu une tortue", "que le plongeur ait vu au moins l'un des deux : une tortue ou un dauphin"]],
      ["On choisit au hasard une sortie de pêche à M'tsamboro.", "la sortie se fait en pirogue", "la pêche est bonne", ["que la sortie se fasse en pirogue et que la pêche soit bonne", "sachant que la sortie se fait en pirogue, que la pêche soit bonne", "parmi les bonnes pêches, d'en choisir une faite en pirogue", "que la sortie se fasse en pirogue ou que la pêche soit bonne"]],
      ["On choisit au hasard un élève du lycée de Chirongui.", "l'élève est interne", "l'élève est en Seconde", ["que l'élève soit un interne de Seconde", "parmi les internes, de choisir un élève de Seconde", "parmi les élèves de Seconde, de choisir un interne", "que l'élève soit interne ou en Seconde"]],
      ["On choisit au hasard un jour du mois de janvier à Pamandzi.", "il fait plus de 30 °C", "il y a un orage", ["qu'il fasse plus de 30 °C et qu'il y ait un orage", "sachant qu'il fait plus de 30 °C, qu'il y ait un orage", "sachant qu'il y a un orage, qu'il fasse plus de 30 °C", "qu'il fasse plus de 30 °C ou qu'il y ait un orage"]],
      ["On choisit au hasard un participant à la course de pirogues de Dzaoudzi.", "le participant est une femme", "le participant termine la course", ["que le participant soit une femme qui termine la course", "parmi les femmes, de choisir une participante qui termine la course", "parmi ceux qui terminent la course, de choisir une femme", "que le participant soit une femme ou termine la course"]],
      ["On choisit au hasard un colis livré à Dembéni.", "le colis vient de La Réunion", "le colis arrive en retard", ["que le colis vienne de La Réunion et arrive en retard", "sachant que le colis vient de La Réunion, qu'il arrive en retard", "sachant que le colis arrive en retard, qu'il vienne de La Réunion", "que le colis vienne de La Réunion ou arrive en retard"]]
    ]);
    const nots = ["P(A \\cap B)", "P_A(B)", "P_B(A)", "P(A \\cup B)"], k = rand(0, 3), aides = ["« Et » : intersection $\\cap$. « Ou » : réunion $\\cup$.", "« Sachant que… » ou « parmi… » : probabilité conditionnelle. La condition se met en indice.", "$P_A(B)$ : on se place parmi les issues de $A$ et on cherche la probabilité de $B$."];
    const expl = ["« Et » : les deux événements à la fois.", "On sait que $A$ est réalisé : $A$ est en indice.", "On sait que $B$ est réalisé : $B$ est en indice.", "« Ou » : au moins l'un des deux."][k];
    if (Math.random() < 0.4) {
      const ms = melangeChoix(`La probabilité ${ph[k]}`, ph.filter((_, j) => j !== k).map((x) => `La probabilité ${x}`));
      return {
        enonce: `${ctx} On note $A$ : « ${A} » et $B$ : « ${B} ». Que représente $${nots[k]}$ ?`, mode: "choix", choix: ms.choix, attendu: ms.attendu, aides,
        solution: `$${nots[k]}$ : c'est la probabilité ${ph[k]}. ${expl}`
      };
    }
    return {
      enonce: `${ctx} On note $A$ : « ${A} » et $B$ : « ${B} ». Comment note-t-on la probabilité ${ph[k]} ?`,
      mode: "choix", choix: nots.map((x) => `$${x}$`), attendu: k, aides,
      solution: `C'est $${nots[k]}$. ${expl}`
    };
  };

  /* ===== Figures des cours, des QCM et des fiches méthode des automatismes ===== */
  FIGURES["am-cours-comparer"] = () => amDroite({ min: 0.7, max: 0.9, pas: 0.01, etiq: [0.7, 0.75, 0.8, 0.85, 0.9], points: [{ x: 7 / 9, label: "7/9" }, { x: 0.8, label: "4/5" }], aria: "Droite graduée de 0,7 à 0,9 : 7/9 (environ 0,778) est placé à gauche de 4/5 = 0,8" });
  const amBande = (fin) => {
    let s = `<svg class="graph" viewBox="0 0 320 ${fin ? 112 : 84}" role="img" aria-label="Bande partagée en 12 : 8 douzièmes (2/3) puis 3 douzièmes (1/4) coloriés">`;
    for (let k = 0; k < 12; k++) s += `<rect class="${k < 8 ? "g-carreau" : k < 11 ? "g-barre-plus" : "g-vide"}" x="${22 + k * 23}" y="34" width="23" height="34" style="stroke:var(--doux)"/>`;
    return s + `<path class="g-accolade" d="M22 29v-8h184v8"/><path class="g-accolade" d="M206 29v-8h69v8"/>` + amTxt(114, 15, "2/3 = 8/12", "g-mesure") + amTxt(240, 15, "1/4 = 3/12", "g-mesure") + (fin ? amTxt(160, 92, "2/3 + 1/4 = 11/12", "g-label") : "") + `</svg>`;
  };
  FIGURES["am-cours-fractions"] = () => amBande(true);
  FIGURES["am-qcm-fractions"] = () => amBande(false);
  FIGURES["am-cours-pourcentage"] = () => amGrille(10, 10, 75, "Quadrillage de 100 cases dont 75 coloriées : 3/4 = 0,75 = 75 %");
  FIGURES["am-meth-quart"] = () => amParts(4, 1, "9", "36", "Barre de 36 partagée en 4 parts égales : une part vaut 9, donc 0,25 × 36 = 9");
  FIGURES["am-cours-conversions"] = () => {
    const U = ["km", "hm", "dam", "m", "dm", "cm", "mm"], ch = ["3", "5", "0", "0"], W = 44;
    let s = `<svg class="graph" viewBox="0 0 320 96" role="img" aria-label="Tableau de conversion des longueurs : 3,5 km = 3 500 m"><g class="g-axis">`;
    for (let k = 0; k <= 7; k++) s += `<line x1="${6 + k * W}" y1="10" x2="${6 + k * W}" y2="74"/>`;
    s += `<line x1="6" y1="10" x2="314" y2="10"/><line x1="6" y1="38" x2="314" y2="38"/><line x1="6" y1="74" x2="314" y2="74"/></g>`;
    U.forEach((u, k) => { s += amTxt(28 + k * W, 29, u); });
    ch.forEach((c, k) => { s += amTxt(28 + k * W, 62, c, "g-mesure"); });
    return s + amTxt(48, 62, ",", "g-mesure") + amTxt(160, 90, "3,5 km = 3 500 m : × 10 à chaque rang", "g-tick") + `</svg>`;
  };
  FIGURES["am-cours-identite"] = () => {
    const a = 120, b = 64, x0 = 64, y0 = 8;
    let s = `<svg class="graph" viewBox="0 0 320 220" role="img" aria-label="Carré de côté a + b partagé en un carré a², deux rectangles ab et un carré b²"><rect class="g-poly" x="${x0}" y="${y0}" width="${a}" height="${a}"/><rect class="g-rect" x="${x0 + a}" y="${y0}" width="${b}" height="${a}"/><rect class="g-rect" x="${x0}" y="${y0 + a}" width="${a}" height="${b}"/><rect class="g-carreau" x="${x0 + a}" y="${y0 + a}" width="${b}" height="${b}"/>`;
    s += amTxt(x0 + a / 2, y0 + a / 2 + 5, "a²", "g-clabel") + amTxt(x0 + a + b / 2, y0 + a / 2 + 5, "ab", "g-clabel") + amTxt(x0 + a / 2, y0 + a + b / 2 + 5, "ab", "g-clabel") + amTxt(x0 + a + b / 2, y0 + a + b / 2 + 5, "b²", "g-clabel");
    return s + amTxt(x0 - 8, y0 + a / 2 + 4, "a", "g-mesure", "end") + amTxt(x0 - 8, y0 + a + b / 2 + 4, "b", "g-mesure", "end") + amTxt(160, 212, "(a + b)² = a² + 2ab + b²", "g-label") + `</svg>`;
  };
  FIGURES["am-cours-inequation"] = () => droite({ min: -7, max: 2, intervalles: [{ a: -Infinity, b: -3, ga: false, gb: true }], aria: "Droite graduée : les solutions de −2x ⩾ 6, c'est-à-dire x ⩽ −3, forment l'intervalle ]−∞ ; −3], −3 compris" });
  FIGURES["am-qcm-intervalle"] = () => droite({ min: -6, max: 3, intervalles: [{ a: -2, b: Infinity, ga: false, gb: false }], aria: "Droite graduée : un trait coloré part de −2 vers la droite, avec un crochet en −2 tourné vers l'extérieur du trait" });
  FIGURES["am-cours-produit-nul"] = () => graph({ xmin: -4.6, xmax: 3.6, ymin: -3.6, ymax: 6.6, h: 260, curves: [{ f: (x) => (x - 1) * (x + 2), a: -3.3, b: 2.3, closed: false }], points: [{ x: -2, y: 0, label: "−2" }, { x: 1, y: 0, label: "1" }], aria: "Courbe de x ↦ (x − 1)(x + 2) : elle coupe l'axe des abscisses en −2 et en 1, les solutions de (x − 1)(x + 2) = 0" });
  FIGURES["am-cours-signe"] = () => tabsigne(["−∞", "1", "4", "+∞"], [{ nom: "x − 1", cases: ["-", "0", "+", "", "+"] }, { nom: "x − 4", cases: ["-", "", "-", "0", "+"] }, { nom: "produit", cases: ["+", "0", "-", "0", "+"] }]);
  FIGURES["am-meth-signe"] = () => tabsigne(["−∞", "−3", "1", "+∞"], [{ nom: "x − 1", cases: ["-", "", "-", "0", "+"] }, { nom: "x + 3", cases: ["-", "0", "+", "", "+"] }, { nom: "produit", cases: ["+", "0", "-", "0", "+"] }]);
  FIGURES["am-cours-proportion"] = () => amBarre(0.36, "450 élèves de Seconde", "1 250 élèves", "36 %", "Barre des 1 250 élèves du lycée : la partie coloriée, 450 élèves de Seconde, représente 36 %");
  FIGURES["am-cours-ecritures"] = () => amGrille(4, 5, 3, "Quadrillage de 20 cases dont 3 coloriées : 3/20 = 0,15 = 15 %");
  FIGURES["am-cours-partie"] = () => amBarre(0.4, "? élèves", "350 élèves", "40 %", "Barre des 350 élèves : la partie coloriée représente 40 %, son effectif est cherché");
  FIGURES["am-meth-tout"] = () => amBarre(0.3, "12 élèves", "? élèves", "30 %", "Barre du total inconnu : la partie coloriée, 12 élèves, représente 30 %");
  FIGURES["am-cours-initiale"] = () => amEvol(1.25, "36 €", "45 €", "+25 % (× 1,25)", "Prix avant 36 € et après 45 € : une hausse de 25 %, soit une multiplication par 1,25");
  FIGURES["am-cours-taux"] = () => amEvol(1.15, "1,60 €", "1,84 €", "+15 % (× 1,15)", "Prix du litre d'essence : 1,60 € puis 1,84 €, une hausse de 15 %");
  // Deux évolutions successives : trois valeurs v, deux coefficients cm (flèches du haut), coefficient global (flèche du bas)
  const amChaine3 = (v, cm, glob, aria) => {
    let s = `<svg class="graph" viewBox="0 0 320 150" role="img" aria-label="${aria}">`;
    [8, 124, 240].forEach((x, k) => { s += `<rect class="g-rect" x="${x}" y="40" width="72" height="34" rx="8"/>` + amTxt(x + 36, 62, v[k], "g-clabel"); });
    s += `<path class="g-curve" style="stroke-width:2" d="M84 50 Q102 22 120 50"/><path class="g-end" d="M120 50 l-9 -3 l5 -7z"/><path class="g-curve" style="stroke-width:2" d="M200 50 Q218 22 236 50"/><path class="g-end" d="M236 50 l-9 -3 l5 -7z"/>`;
    s += `<path class="g-curve g-curve-1" style="stroke-width:2" d="M44 78 Q160 140 276 78"/><path class="g-end g-curve-1" d="M276 78 l-3 10 l-6 -6z"/>`;
    return s + amTxt(102, 20, cm[0], "g-clabel") + amTxt(218, 20, cm[1], "g-clabel") + amTxt(160, 130, glob, "g-clabel g-curve-1") + `</svg>`;
  };
  FIGURES["am-cours-successives"] = () => amChaine3(["100", "110", "99"], ["× 1,1", "× 0,9"], "× 0,99 : −1 %", "100 multiplié par 1,1 donne 110, puis multiplié par 0,9 donne 99 : au total, multiplication par 0,99, soit une baisse de 1 %");
  FIGURES["am-meth-evolution"] = () => amChaine3(["100", "105", "96,6"], ["× 1,05", "× 0,92"], "× 0,966 : −3,4 %", "100 multiplié par 1,05 donne 105, puis multiplié par 0,92 donne 96,6 : au total, multiplication par 0,966, soit une baisse de 3,4 %");
  FIGURES["am-cours-reciproque"] = () => amAllerRetour("−20 % (× 0,8)", "+25 % (× 1,25)", "Une baisse de 20 % est annulée par une hausse de 25 % : 0,8 × 1,25 = 1");
  // Formulation additive et multiplicative : 100 → 105 (+5 %) et 100 → 95 (−5 %)
  FIGURES["am-cours-coefficient"] = () => {
    let s = `<svg class="graph" viewBox="0 0 320 104" role="img" aria-label="Partant de 100 : une hausse de 5 % donne 105, c'est multiplier par 1,05 ; une baisse de 5 % donne 95, c'est multiplier par 0,95">`;
    [[8, "95"], [124, "100"], [240, "105"]].forEach(([x, t]) => { s += `<rect class="g-rect" x="${x}" y="58" width="72" height="34" rx="8"/>` + amTxt(x + 36, 80, t, "g-clabel"); });
    s += `<path class="g-curve" style="stroke-width:2" d="M184 56 Q218 22 252 56"/><path class="g-end" d="M252 56 l-10 -4 l6 -6z"/>`;
    s += `<path class="g-curve g-curve-1" style="stroke-width:2" d="M136 56 Q102 22 68 56"/><path class="g-end g-curve-1" d="M68 56 l10 -4 l-6 -6z"/>`;
    return s + amTxt(218, 22, "+5 % : × 1,05", "g-clabel") + amTxt(102, 22, "−5 % : × 0,95", "g-clabel g-curve-1") + `</svg>`;
  };
  FIGURES["am-qcm-baisse"] = () => amEvol(0.7, "60 €", "?", "−30 %", "Prix avant 60 €, baisse de 30 %, prix après inconnu");
  FIGURES["am-qcm-retour"] = () => amAllerRetour("+25 %", "? %", "Une hausse de 25 % fait passer du départ à l'arrivée ; l'évolution qui ramène de l'arrivée au départ est inconnue");
  FIGURES["am-qcm-quadrillage"] = () => amGrille(5, 10, 18, "Quadrillage de 50 cases dont 18 coloriées");
  FIGURES["am-qcm-tout"] = () => amBarre(0.25, "15 élèves", "? élèves", "25 %", "Barre d'un effectif total inconnu : la partie coloriée, 15 élèves, représente 25 %");
  FIGURES["am-qcm-parts"] = () => amParts(5, 2, "? kg", "45 kg", "Barre de 45 kg partagée en 5 parts égales dont 2 coloriées ; la masse coloriée est inconnue");
  FIGURES["am-cours-droite"] = () => graph({ xmin: -3.6, xmax: 4.6, ymin: -3.6, ymax: 7.6, h: 290, curves: [{ f: (x) => 2 * x + 1, a: -2.2, b: 3.2, closed: false, label: "y = 2x + 1", lx: 3.1, dx: -10, dy: 4 }], points: [{ x: 0, y: 1, label: "(0 ; 1)", gauche: true }, { x: 1, y: 3 }], fleches: [{ x1: 0, y1: 1, x2: 1, y2: 1, label: "+1" }, { x1: 1, y1: 1, x2: 1, y2: 3, label: "+2", c: 1 }], aria: "Droite d'équation y = 2x + 1 : elle coupe l'axe vertical en (0 ; 1) ; quand x augmente de 1, y augmente de 2" });
  FIGURES["am-meth-lecture"] = () => graph({ xmin: -2.6, xmax: 4.6, ymin: -5.6, ymax: 5.6, curves: [{ f: (x) => -x * x + 2 * x + 3, a: -2, b: 4 }], hlines: [{ y: 4, label: "maximum 4" }], points: [{ x: 1, y: 4, label: "(1 ; 4)" }], aria: "Courbe de u : le maximum 4 se lit sur l'axe vertical, il est atteint en x = 1 lu sur l'axe horizontal" });
  FIGURES["am-meth-droite"] = () => graph({ xmin: -2.6, xmax: 4.6, ymin: -4.6, ymax: 4.6, curves: [{ f: (x) => -2 * x + 2, a: -1.2, b: 3.2, closed: false }], points: [{ x: 0, y: 2, label: "A(0 ; 2)" }, { x: 2, y: -2, label: "B(2 ; −2)" }], aria: "Droite passant par A(0 ; 2) et B(2 ; −2), de coefficient directeur −2" });
  FIGURES["am-cours-repere"] = () => graph({ xmin: -5.6, xmax: 5.6, ymin: -4.6, ymax: 4.6, points: [{ x: 3, y: -2, label: "A(3 ; −2)" }, { x: -4, y: 1, label: "B(−4 ; 1)", gauche: true }], aria: "Repère quadrillé : A(3 ; −2) est à droite et en dessous de l'origine, B(−4 ; 1) à gauche et au-dessus" });
  FIGURES["am-cours-disque"] = () => amForme("cercle", [5], ["r = 5 cm"], "Disque de rayon 5 cm");
  FIGURES["am-cours-cylindre"] = () => amForme("cyl", [2, 5], ["r = 2 cm", "5 cm"], "Cylindre de rayon 2 cm et de hauteur 5 cm");
  FIGURES["am-cours-pythagore"] = () => amTriangle(["A", "B", "C"], 4, 3, ["AB", "AC", "BC (hypoténuse)"], 0, 0, "Triangle ABC rectangle en A : [BC], en face de l'angle droit, est l'hypoténuse");
  FIGURES["am-cours-thales"] = () => amThalesFig(9, 10.5, 12, 1 / 3, { AM: "AM = 3", AB: "AB = 9", MN: "MN = ?", BC: "BC = 12" }, "Triangle ABC, M sur [AB], N sur [AC], (MN) parallèle à (BC) : AM = 3, AB = 9, BC = 12, MN cherché");
  FIGURES["am-cours-trigo"] = () => amTriangle(["A", "B", "C"], 4, 3, ["adjacent", "opposé", "hypoténuse"], 1, 0, "Triangle ABC rectangle en A, angle en B marqué : [AB] adjacent, [AC] opposé, [BC] hypoténuse", "B");
  FIGURES["am-meth-coordonnees"] = () => graph({ xmin: -3.6, xmax: 4.6, ymin: -4.6, ymax: 3.6, hlines: [{ y: -3 }], points: [{ x: 2, y: -3, label: "(2 ; −3)" }, { x: 2, y: 0 }], aria: "Point de coordonnées (2 ; −3) : 2 carreaux à droite de l'origine, 3 en dessous" });
  FIGURES["am-cours-secteurs"] = () => amSecteurs([54, 108, 126, 72], ["Taxi", "Bus", "À pied", "Barge"], ["54°", "108°", "126°", "72°"], false, "Diagramme circulaire des moyens de transport : taxi 54 degrés (15 %), bus 108, à pied 126, barge 72");
  FIGURES["am-cours-quartiles"] = () => boites([{ nom: "S", v: [2, 7, 10.5, 15, 20] }]);
  FIGURES["am-cours-roue"] = () => amSecteurs([0.3, 0.25, 0.15, 0.3], ["Mangue", "Banane", "Ananas", "Coco"], ["0,3", "0,25", "0,15", "?"], false, "Roue de loterie : mangue 0,3, banane 0,25, ananas 0,15, coco inconnu");
  FIGURES["am-cours-de"] = () => {
    let s = `<svg class="graph" viewBox="0 0 320 84" role="img" aria-label="Les six faces d'un dé : les issues 3 et 6, multiples de 3, sont coloriées">`;
    for (let k = 1; k <= 6; k++) s += `<rect class="${k % 3 ? "g-rect" : "g-carreau"}" x="${10 + (k - 1) * 51}" y="14" width="42" height="42" rx="7"/>` + amTxt(31 + (k - 1) * 51, 41, `${k}`, "g-clabel");
    return s + amTxt(160, 76, "issues favorables : 3 et 6", "g-label") + `</svg>`;
  };
  FIGURES["am-cours-arbre"] = () => arbre(["A", "~A", "B", "~B"], ["0,4", "0,6", "0,7", "0,3", "0,2", "0,8"]);
  FIGURES["am-meth-arbre"] = () => arbre(["A", "~A", "B", "~B"], ["0,3", "?", "0,6", "?", "0,1", "?"]);
  FIGURES["am-cours-urne"] = () => amUrne(["R", "V", "R", "V", "V", "R", "V", "V"], "Urne contenant 3 boules R et 5 boules V");
  FIGURES["am-qcm-droite-a"] = () => amDroite({ min: -2, max: 1, pas: 0.25, etiq: [-1, 0], points: [{ x: -1.75, label: "A" }], aria: "Droite graduée : graduations tous les 0,25, seuls −1 et 0 sont écrits, point A" });
  FIGURES["am-qcm-grille"] = () => amGrille(4, 5, 7, "Quadrillage de 20 cases dont 7 coloriées");
  FIGURES["am-qcm-bananes"] = () => amEvol(1.2, "2,50 €", "3 €", "?", "Prix du kilo de bananes : 2,50 € avant, 3 € après");
  FIGURES["am-qcm-signe"] = () => graph({ xmin: -3.6, xmax: 4.6, ymin: -4.6, ymax: 5.6, curves: [{ f: (x) => -0.5 * (x + 2) * (x - 3), a: -3, b: 4, label: "C<tspan class=\"sub\" dy=\"3\">f</tspan>", lx: 3.6, dx: -4, dy: 16 }], points: [{ x: -2, y: 0 }, { x: 3, y: 0 }], aria: "Courbe de f sur [−3 ; 4], au-dessus de l'axe des abscisses entre −2 et 3, en dessous ailleurs" });
  FIGURES["am-qcm-trace"] = () => graph({ xmin: -4.6, xmax: 4.6, ymin: -4.6, ymax: 4.6, curves: [{ f: (x) => x - 2, a: -2.4, b: 4.4, closed: false, couleur: 0, label: "d<tspan class=\"sub\" dy=\"3\">1</tspan>", lx: 4.2, dx: -4, dy: -8 }, { f: (x) => -x + 2, a: -2.4, b: 4.4, closed: false, couleur: 1, label: "d<tspan class=\"sub\" dy=\"3\">2</tspan>", lx: -2.2, dx: 24, dy: -6 }], aria: "Deux droites d1 et d2 qui se coupent au point (2 ; 0)" });
  FIGURES["am-qcm-tabvar"] = () => amTabvar(["−3", "1", "5"], ["2", "−4", "6"], [true, false, true], "f");
  FIGURES["am-cours-appartenance"] = () => graph({ xmin: -3.6, xmax: 3.6, ymin: -2.6, ymax: 4.6, h: 260, curves: [{ f: (x) => x * x - 2, a: -2.5, b: 2.5, closed: false }], points: [{ x: 2, y: 2, label: "A(2 ; 2)" }, { x: 1, y: 1, label: "B(1 ; 1)", gauche: true }], aria: "Courbe de f(x) = x² − 2 : le point A(2 ; 2) est sur la courbe, le point B(1 ; 1) n'y est pas" });
  FIGURES["am-cours-resolution"] = () => graph({ xmin: -2.6, xmax: 4.6, ymin: -1.8, ymax: 5.6, h: 260, curves: [{ f: (x) => x * x - 2 * x, a: -1.5, b: 3.5, closed: false }], hlines: [{ y: 3, label: "y = 3" }], points: [{ x: -1, y: 3 }, { x: 3, y: 3 }], aria: "Courbe de f(x) = x² − 2x et droite d'équation y = 3 : elles se coupent aux points d'abscisses −1 et 3, et la courbe est sous la droite entre −1 et 3" });
  FIGURES["am-cours-trace"] = () => graph({ xmin: -3.6, xmax: 4.6, ymin: -3.6, ymax: 4.6, h: 260, curves: [{ f: (x) => (2 * x + 1) / 3, a: -3.4, b: 4.4, closed: false }], points: [{ x: -2, y: -1, label: "A(−2 ; −1)", gauche: true }, { x: 1, y: 1, label: "B(1 ; 1)", gauche: true }], fleches: [{ x1: -2, y1: -1, x2: 1, y2: -1, label: "+3" }, { x1: 1, y1: -1, x2: 1, y2: 1, label: "+2", c: 1 }], aria: "Droite passant par A(−2 ; −1) de coefficient directeur 2/3 : depuis A, on avance de 3 et on monte de 2 pour arriver en B(1 ; 1)" });
  // Tableau croisé d'effectifs dessiné : filles / garçons, demi-pensionnaires / externes
  FIGURES["am-cours-tableau-croise"] = () => {
    const L = [["", "D", "E", "Total"], ["F", "45", "75", "120"], ["G", "50", "30", "80"], ["Total", "95", "105", "200"]], c0 = 70, cw = 74, rh = 30, x0 = 12, y0 = 8;
    let s = `<svg class="graph" viewBox="0 0 320 ${2 * y0 + 4 * rh}" role="img" aria-label="Tableau croisé de 200 élèves : 120 filles (F), dont 45 demi-pensionnaires (D) et 75 externes (E) ; 80 garçons (G), dont 50 demi-pensionnaires et 30 externes">`;
    for (let i = 0; i <= 4; i++) s += `<line class="g-segment" x1="${x0}" y1="${y0 + i * rh}" x2="${x0 + c0 + 3 * cw}" y2="${y0 + i * rh}"/>`;
    [0, c0, c0 + cw, c0 + 2 * cw, c0 + 3 * cw].forEach((x) => { s += `<line class="g-segment" x1="${x0 + x}" y1="${y0}" x2="${x0 + x}" y2="${y0 + 4 * rh}"/>`; });
    L.forEach((r, i) => r.forEach((t, j) => { if (t) s += amTxt(x0 + (j === 0 ? c0 / 2 : c0 + (j - 1) * cw + cw / 2), y0 + i * rh + rh / 2 + 5, t, i === 0 || j === 0 ? "g-label" : "g-clabel"); }));
    return s + `</svg>`;
  };
  FIGURES["am-cours-moyenne"] = () => graph({ xmin: -0.8, xmax: amXmax(4, -0.8, "enfants"), ymin: -0.8, ymax: 9.6, h: 220, xlabel: "enfants", ylabel: "familles", bars: [3, 5, 8, 3, 1].map((y, x) => ({ x, y })), aria: "Diagramme en bâtons de 20 familles : 3 sans enfant, 5 avec 1 enfant, 8 avec 2, 3 avec 3 et 1 avec 4" });
  FIGURES["am-qcm-semi"] = () => amSecteurs([90, 54, 36], ["Anli", "Awa", "Saïd"], ["90°", "54°", "36°"], true, "Diagramme semi-circulaire de l'élection du délégué : Anli 90 degrés, Awa 54 degrés, Saïd 36 degrés");
  FIGURES["am-cours-droite-graduee"] = () => amDroite({ min: -3, max: 3, pas: 0.5, etiq: [-3, -2, -1, 0, 1, 2, 3], points: [{ x: -2.5, label: "A" }, { x: 1.5, label: "B" }], aria: "Droite graduée de −3 à 3, une graduation tous les 0,5 : A a pour abscisse −2,5 et B a pour abscisse 1,5" });
  FIGURES["am-qcm-graduee"] = () => amDroite({ min: -1.2, max: 1.2, pas: 0.2, etiq: [-1, 0, 1], points: [{ x: -0.6, label: "P" }], aria: "Droite graduée : une graduation tous les 0,2, seuls −1, 0 et 1 sont écrits, point P entre −1 et 0" });
  FIGURES["am-qcm-repere"] = () => graph({ xmin: -4.6, xmax: 3.6, ymin: -3.6, ymax: 3.6, h: 240, points: [{ x: -3, y: -1, label: "C" }], aria: "Repère quadrillé avec un point C placé à gauche de l'axe vertical et en dessous de l'axe horizontal" });
  FIGURES["am-qcm-thales"] = () => amThalesFig(10, 15, 12, 0.4, { AM: "AM = 4", AB: "AB = 10", AN: "AN = ?", AC: "AC = 15" }, "Triangle ABC, M sur [AB], N sur [AC], (MN) parallèle à (BC) : AM = 4, AB = 10, AC = 15, AN cherché");
  FIGURES["am-qcm-cone"] = () => amForme("cone", [3, 4], ["r = 3 cm", "h = 4 cm"], "Cône de révolution de rayon 3 cm et de hauteur 4 cm");
  FIGURES["am-qcm-pythagore"] = () => amTriangle(["E", "F", "G"], 8, 6, ["8", "6", "?"], 0, 0, "Triangle EFG rectangle en E, EF = 8, EG = 6, FG cherché");
  FIGURES["am-qcm-trigo"] = () => amTriangle(["A", "B", "C"], Math.sqrt(3), 1, ["", "?", "10"], 1, 2, "Triangle ABC rectangle en A, angle en B de 30 degrés, BC = 10, AC cherché", "30°");
  FIGURES["am-qcm-pave"] = () => amForme("pave", [5, 2, 3], ["5 cm", "2 cm", "3 cm"], "Pavé droit de 5 cm sur 2 cm sur 3 cm");
  FIGURES["am-qcm-secteurs"] = () => amSecteurs([90, 144, 126], ["Bus", "Barge", "À pied"], ["90°", "144°", "126°"], false, "Diagramme circulaire : bus 90 degrés, barge 144 degrés, à pied 126 degrés");
  FIGURES["am-qcm-batons"] = () => graph({ xmin: -0.8, xmax: amXmax(5, -0.8, "frères et sœurs"), ymin: -0.8, ymax: 8.6, h: 220, xlabel: "frères et sœurs", ylabel: "effectif", bars: [2, 5, 7, 3, 2, 1].map((y, x) => ({ x, y })), aria: "Diagramme en bâtons : 2 élèves sans frère ni sœur, 5 avec 1, 7 avec 2, 3 avec 3, 2 avec 4, 1 avec 5" });
  FIGURES["am-qcm-arbre"] = () => arbre(["M", "~M", "T", "~T"], ["0,1", "0,9", "0,8", "0,2", "0,1", "0,9"]);


  /* ---------- Seconde, chapitre 1 : ensembles de nombres, intervalles, valeur absolue ---------- */

  /* Droite graduée avec un ou plusieurs intervalles. Un intervalle : { a, b, ga, gb, label } ;
     a = -Infinity ou b = Infinity pour une borne infinie ; ga / gb : borne incluse.
     Options facultatives : pas (écart entre deux graduations, 1 par défaut), sub (petites graduations dans un pas),
     etiquettes (nombres à écrire), etiq ([{ x, t, gras }] : textes écrits sous l'axe à la place des nombres),
     points ([{ x, label }]), fleches ([{ a, b, label, double, n }] : flèche de a vers b au-dessus de l'axe, à l'étage n). */
  function droite(o) {
    const W = 320, pad = 18, ints = o.intervalles || [], plusieurs = ints.length > 1, p = o.pas || 1, fl = o.fleches || [], pts = o.points || [];
    const etages = fl.reduce((m, f, i) => Math.max(m, (f.n !== undefined ? f.n : i) + 1), 0);
    const H = (plusieurs ? 53 + 18 * ints.length : 49) + (etages ? 14 + 14 * etages : 0);
    const ux = (W - 2 * pad) / (o.max - o.min);
    const X = (x) => +(pad + (Math.min(Math.max(x, o.min - 0.7 * p), o.max + 0.7 * p) - o.min) * ux).toFixed(1);
    const y0 = H - 23;
    const pasTexte = (o.max - o.min) / p > 12 ? 2 : 1;
    const num = (x) => String(+(+x).toFixed(6)).replace(".", ",").replace("-", "−");
    let s = `<svg class="graph droite" viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.aria || "Droite graduée"}">`;
    s += `<g class="g-axis"><line x1="4" y1="${y0}" x2="${W - 6}" y2="${y0}"/><path d="M${W - 2} ${y0} l-8 -4 v8z"/></g><g class="g-tick">`;
    for (let k = Math.ceil(o.min / p - 1e-9); k * p <= o.max + 1e-9; k++) {
      const x = +(k * p).toFixed(9);
      s += `<line class="g-graduation" x1="${X(x)}" y1="${y0 - 4}" x2="${X(x)}" y2="${y0 + 4}"/>`;
      for (let j = 1; j < (o.sub || 1); j++) { const v = x + (j * p) / o.sub; if (v < o.max + 1e-9) s += `<line class="g-graduation" x1="${X(v)}" y1="${y0 - 2.5}" x2="${X(v)}" y2="${y0 + 2.5}"/>`; }
      if (!o.etiq && k % pasTexte === 0 && (!o.etiquettes || o.etiquettes.includes(x))) s += `<text x="${X(x)}" y="${y0 + 19}" text-anchor="middle">${num(x)}</text>`;
    }
    (o.etiq || []).filter((e) => !e.gras).forEach((e) => { s += `<text x="${X(e.x)}" y="${y0 + 19}" text-anchor="middle">${e.t !== undefined ? e.t : num(e.x)}</text>`; });
    s += `</g>`;
    (o.etiq || []).filter((e) => e.gras).forEach((e) => { s += `<text class="g-label" x="${X(e.x)}" y="${y0 + 19}" text-anchor="middle">${e.t !== undefined ? e.t : num(e.x)}</text>`; });
    const crochet = (x, y, dir, k) => `<path class="g-crochet g-crochet-${k}" d="M${x + 5 * dir} ${y - 8} H${x} V${y + 8} H${x + 5 * dir}"/>`;
    // Un seul intervalle : sur l'axe. Plusieurs : chacun sur sa ligne au-dessus de l'axe, avec des repères pointillés.
    ints.forEach((I, k) => {
      const y = plusieurs ? y0 - 16 - 18 * k : y0, xa = X(I.a), xb = X(I.b);
      if (plusieurs) [I.a, I.b].filter(isFinite).forEach((x) => { s += `<line class="g-guide" x1="${X(x)}" y1="${y}" x2="${X(x)}" y2="${y0}"/>`; });
      s += `<line class="g-int g-int-${k}" x1="${xa}" y1="${y}" x2="${xb}" y2="${y}"/>`;
      if (isFinite(I.a)) s += crochet(xa, y, I.ga ? 1 : -1, k);
      if (isFinite(I.b)) s += crochet(xb, y, I.gb ? -1 : 1, k);
      if (I.label) s += isFinite(I.a) && xa > 24
        ? `<text class="g-clabel g-curve-${k}" x="${xa - 9}" y="${y + 5}" text-anchor="end">${I.label}</text>`
        : `<text class="g-clabel g-curve-${k}" x="${xb + 9}" y="${y + 5}">${I.label}</text>`;
    });
    pts.forEach((q) => {
      s += `<circle class="g-point" cx="${X(q.x)}" cy="${y0}" r="4"/>`;
      if (q.label) s += `<text class="g-plabel" x="${X(q.x)}" y="${y0 - 10}" text-anchor="middle">${q.label}</text>`;
    });
    // flèches (distances, rayons) au-dessus de l'axe, avec des repères pointillés quand aucun point nommé n'est en dessous
    fl.forEach((f, i) => {
      const y = y0 - 24 - 14 * (f.n !== undefined ? f.n : i), xa = X(f.a), xb = X(f.b), d = xb > xa ? 1 : -1;
      const tete = (x, sens) => `<path style="fill:var(--encre)" d="M${x} ${y} l${-7 * sens} -3.5 v7z"/>`;
      const guide = (x) => (pts.some((q) => q.label && Math.abs(X(q.x) - x) < 1) ? "" : `<line class="g-guide" x1="${x}" y1="${y + 4}" x2="${x}" y2="${y0 - 5}"/>`);
      s += guide(xa) + guide(xb) + `<line class="g-accolade" x1="${xa}" y1="${y}" x2="${xb}" y2="${y}"/>` + tete(xb, d) + (f.double ? tete(xa, -d) : "");
      if (f.label) s += `<text class="g-mesure" x="${+((xa + xb) / 2).toFixed(1)}" y="${y - 5}" text-anchor="middle">${f.label}</text>`;
    });
    return s + `</svg>`;
  }

  /* Deux droites graduées l'une sous l'autre (la seconde décalée de dy), plus des tracés ajoutés */
  const ensEmpile = (h1, h2, dy, H, aria, plus) => {
    const corps = (s, y) => s.replace(/^<svg[^>]*>/, `<g transform="translate(0 ${y})">`).replace(/<\/svg>$/, "</g>");
    return `<svg class="graph" viewBox="0 0 320 ${H}" role="img" aria-label="${aria}">${corps(h1, 0)}${corps(h2, dy)}${plus || ""}</svg>`;
  };

  /* Ensembles emboîtés N ⊂ Z ⊂ D ⊂ Q ⊂ R. o.ex : exemples écrits dans chaque zone (0 = N … 4 = R) ;
     o.places : [{ cat, txt }] nombres écrits dans la zone de leur plus petit ensemble, surlignée */
  const ENS_LETTRES = ["N", "Z", "D", "Q", "R"];
  const ENS_NOMS = ["N (entiers naturels)", "Z (entiers relatifs)", "D (décimaux)", "Q (rationnels)", "R (réels)"];
  function ensEnsembles(o) {
    o = o || {};
    const W = 320, H = 170, places = o.places || [];
    const aria = o.aria || (places.length
      ? "Ensembles emboîtés N, Z, D, Q, R : " + places.map((q) => `${q.txt} est dans la zone de ${ENS_NOMS[q.cat]}`).join(" ; ")
      : "Ensembles emboîtés : N est inclus dans Z, lui-même inclus dans D, puis dans Q, puis dans R");
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="${aria}">`;
    for (let k = 4; k >= 0; k--) {
      const i = 4 - k, x = 4 + 32 * i, y = 4 + 24 * i, ici = places.filter((q) => q.cat === k);
      s += `<rect class="${ici.length ? "g-barre-plus" : "g-rect"}" x="${x}" y="${y}" width="${W - 8 - 36 * i}" height="${H - 8 - 28 * i}" rx="10"/>`;
      s += `<text class="g-label" style="font-size:15px;font-family:serif" x="${x + 8}" y="${y + 19}">${ENS_LETTRES[k]}</text>`;
      const t = ici.length ? ici.map((q) => q.txt).join(" ; ") : o.ex ? o.ex[k] : "";
      if (t) s += `<text class="g-label"${ici.length ? "" : ' style="font-weight:400"'} x="${x + 28}" y="${y + 18}">${t}</text>`;
    }
    return s + `</svg>`;
  }

  /* Figures du cours, du QCM et de la fiche méthode */
  FIGURES["intervalle-exemple"] = () => droite({ min: -4, max: 5, intervalles: [{ a: -2, b: 3, ga: true, gb: false }], aria: "Droite graduée : l'intervalle [−2 ; 3[, crochet fermé en −2 et ouvert en 3" });
  FIGURES["intervalle-infini"] = () => droite({ min: -4, max: 5, intervalles: [{ a: -Infinity, b: 1, ga: false, gb: true }], aria: "Droite graduée : l'intervalle ]−∞ ; 1], colorié jusqu'au bout à gauche, crochet fermé en 1" });
  FIGURES["inter-union"] = () => droite({ min: -4, max: 6, intervalles: [{ a: -3, b: 2, ga: true, gb: true, label: "I" }, { a: 0, b: 5, ga: false, gb: true, label: "J" }], aria: "Droite graduée : I = [−3 ; 2] et J = ]0 ; 5]" });
  FIGURES["valeur-absolue"] = () => droite({ min: -3, max: 5, intervalles: [{ a: -1, b: 3, ga: true, gb: true }], points: [{ x: 1, label: "1" }], fleches: [{ a: 1, b: -1, label: "2", n: 0 }, { a: 1, b: 3, label: "2", n: 0 }], aria: "Droite graduée : les nombres à une distance au plus 2 de 1 forment l'intervalle [−1 ; 3], de centre 1 et de rayon 2" });
  FIGURES["ens-cours-distance"] = () => droite({ min: -3, max: 4, points: [{ x: -2, label: "A" }, { x: 3, label: "B" }], fleches: [{ a: -2, b: 3, label: "|−2 − 3| = 5", double: true }], aria: "Droite graduée : A d'abscisse −2 et B d'abscisse 3 ; la distance AB vaut |−2 − 3| = 5" });
  FIGURES["ens-cours-ensembles"] = () => ensEnsembles({ ex: ["0 ; 7 ; 12/4", "−3 ; −√25", "0,75 ; −2,5", "1/3 ; −5/7", "√2 ; π"], aria: "Ensembles emboîtés : N (0, 7, 12/4) est inclus dans Z (−3, −√25), inclus dans D (0,75, −2,5), inclus dans Q (1/3, −5/7), inclus dans R (√2, π)" });
  FIGURES["ens-cours-irrationnels"] = () => {
    let s = `<svg class="graph" viewBox="0 0 320 172" role="img" aria-label="Un carré de côté 1 : sa diagonale mesure √2. Un cercle de diamètre 1 : son périmètre mesure π. Ces deux longueurs sont des nombres irrationnels.">`;
    s += `<polygon class="g-poly" points="30,142 120,142 120,52 30,52"/><line class="g-segment" x1="30" y1="142" x2="120" y2="52"/><path class="g-code" d="M30 62 h10 v-10"/>`;
    s += `<text class="g-mesure" x="75" y="160" text-anchor="middle">1</text><text class="g-mesure" x="128" y="101">1</text><text class="g-mesure" x="70" y="91" text-anchor="end">√2</text>`;
    s += `<circle class="g-disque" cx="235" cy="97" r="45"/><circle class="g-cercle" cx="235" cy="97" r="45"/><line class="g-segment" x1="190" y1="97" x2="280" y2="97"/>`;
    s += `<text class="g-mesure" x="235" y="91" text-anchor="middle">1</text><text class="g-mesure" x="235" y="162" text-anchor="middle">périmètre : π</text>`;
    return s + `<text class="g-label" x="75" y="32" text-anchor="middle">carré de côté 1</text><text class="g-label" x="235" y="32" text-anchor="middle">cercle de diamètre 1</text></svg>`;
  };
  FIGURES["ens-cours-abscisse"] = () => droite({ min: -1, max: 2, pas: 0.25, etiq: [{ x: -1 }, { x: 0 }, { x: 1 }, { x: 2 }], points: [{ x: -0.5, label: "B" }, { x: 1.25, label: "A" }], aria: "Droite graduée de −1 à 2, chaque unité partagée en 4 : le point A est à 1 graduation à droite de 1, le point B à 2 graduations à gauche de 0" });
  FIGURES["ens-cours-encadrement"] = () => {
    const r = Math.SQRT2;
    const haut = droite({ min: 1, max: 2, pas: 0.1, etiq: [{ x: 1 }, { x: 1.4 }, { x: 1.5 }, { x: 2 }], points: [{ x: r, label: "√2" }] });
    const bas = droite({ min: 1.4, max: 1.5, pas: 0.01, intervalles: [{ a: 1.41, b: 1.42, ga: true, gb: false }], etiq: [{ x: 1.4, t: "1,40" }, { x: 1.41 }, { x: 1.42 }, { x: 1.5, t: "1,50" }], points: [{ x: r, label: "√2" }] });
    const zoom = `<line class="g-guide" x1="131.6" y1="31" x2="18" y2="83"/><line class="g-guide" x1="160" y1="31" x2="302" y2="83"/>`;
    return ensEmpile(haut, bas, 65, 114, "Zoom sur la droite graduée : √2 est entre 1,4 et 1,5, puis, en zoomant, entre 1,41 et 1,42 : 1,41 ⩽ √2 < 1,42", zoom);
  };
  FIGURES["ens-meth-arrondi"] = () => droite({ min: 2.22, max: 2.25, pas: 0.01, sub: 10, etiq: [{ x: 2.22 }, { x: 2.23, gras: true }, { x: 2.235, t: "2,235" }, { x: 2.24, gras: true }, { x: 2.25 }], points: [{ x: Math.sqrt(5), label: "√5" }], aria: "Droite graduée de 2,22 à 2,25 : √5 ≈ 2,2360 est juste à droite du milieu 2,235 de [2,23 ; 2,24], donc plus près de 2,24" });
  FIGURES["ens-meth-inegalite"] = () => droite({ min: -3, max: 6, intervalles: [{ a: -1, b: 4, ga: false, gb: true }], aria: "Droite graduée : l'intervalle ]−1 ; 4], crochet ouvert en −1 et fermé en 4" });
  FIGURES["ens-meth-centre"] = () => droite({ min: -6, max: 1, intervalles: [{ a: -4, b: -2, ga: false, gb: false }], points: [{ x: -3, label: "−3" }], fleches: [{ a: -3, b: -4, label: "1", n: 0 }, { a: -3, b: -2, label: "1", n: 0 }], aria: "Droite graduée : |x + 3| < 1, les nombres à une distance strictement inférieure à 1 de −3 forment ]−4 ; −2[" });
  FIGURES["ens-qcm-abscisse"] = () => droite({ min: 0, max: 2, pas: 1 / 3, etiq: [{ x: 0 }, { x: 1 }, { x: 2 }], points: [{ x: 5 / 3, label: "A" }], aria: "Droite graduée de 0 à 2, chaque unité partagée en 3 parts égales : le point A est à 2 graduations à droite de 1" });
  FIGURES["ens-qcm-distance"] = () => droite({ min: -5, max: 3, points: [{ x: -4, label: "A" }, { x: 2, label: "B" }], fleches: [{ a: -4, b: 2, label: "?", double: true }], aria: "Droite graduée : A d'abscisse −4 et B d'abscisse 2, la distance AB est à trouver" });
  FIGURES["ens-qcm-centre"] = () => droite({ min: 0, max: 10, intervalles: [{ a: 2, b: 8, ga: true, gb: true }], aria: "Droite graduée : l'intervalle [2 ; 8], crochets fermés" });

  const SETS = ["\\mathbb{N}", "\\mathbb{Z}", "\\mathbb{D}", "\\mathbb{Q}", "\\mathbb{R}"];
  const NOMS_SETS = ["les entiers naturels", "les entiers relatifs", "les décimaux", "les rationnels", "les réels"];
  // Erreurs prévues valables : finies, différentes de la réponse et entre elles (ces séries ne passent pas par le filtre de fin de fichier)
  const ensErr = (att, L) => { const vus = []; return L.filter((e) => { if (!e || !isFinite(e.valeur) || Math.abs(e.valeur - att) < 1e-9 || vus.some((v) => Math.abs(v - e.valeur) < 1e-9)) return false; vus.push(e.valeur); return true; }); };
  const ensNum = (x) => String(+(+x).toFixed(6)).replace(".", ",").replace("-", "−"); // nombre en texte simple (figures)
  const ensFact = (d) => { const f = []; for (const q of [2, 3, 5, 7, 11, 13]) while (d % q === 0) { f.push(q); d /= q; } if (d > 1) f.push(d); return f.length > 1 ? `${f.reduce((a, b) => a * b)} = ${f.join(" \\times ")}` : `${f[0]}`; };
  const ensTronc = (x, n) => Math.trunc(x * 10 ** n + (x < 0 ? -1e-9 : 1e-9)) / 10 ** n;
  const ensVa = (s) => `\\lvert ${s} \\rvert`; // barres de valeur absolue bien espacées devant un signe moins

  /* Un nombre au hasard et le plus petit ensemble qui le contient (0 = N … 4 = R) : { tex, txt, cat, expl } */
  function nombreEnsemble(cat) {
    if (cat === undefined) cat = pick([0, 0, 1, 1, 2, 2, 2, 3, 3, 4, 4]);
    const sgn = () => (Math.random() < 0.35 ? -1 : 1);
    const fD = (n, d) => [`${n < 0 ? "-" : ""}\\dfrac{${Math.abs(n)}}{${d}}`, `${n < 0 ? "−" : ""}${Math.abs(n)}/${d}`];
    const sansRacine = (a, b) => { let n; do { n = rand(a, b); } while (Number.isInteger(Math.sqrt(n))); return n; };
    const T = [
      [ // N
        () => { const n = rand(0, 99); return [`${n}`, `${n}`, `$${n}$ est un entier positif.`]; },
        () => { const k = rand(2, 12), d = rand(2, 9); return [`\\dfrac{${k * d}}{${d}}`, `${k * d}/${d}`, `$\\dfrac{${k * d}}{${d}} = ${k}$ : c'est un entier positif, même s'il est écrit sous forme de fraction.`]; },
        () => { const k = rand(2, 15); return [`\\sqrt{${k * k}}`, `√${k * k}`, `$\\sqrt{${k * k}} = ${k}$ car $${k}^2 = ${k * k}$ : c'est un entier positif.`]; },
        () => { const k = rand(2, 9), d = rand(2, 9); return [`\\dfrac{-${k * d}}{-${d}}`, `−${k * d}/(−${d})`, `$\\dfrac{-${k * d}}{-${d}} = ${k}$ : le quotient de deux nombres négatifs est positif.`]; },
        () => { const [a, b] = pick([[2, 8], [2, 18], [3, 12], [2, 32], [5, 20], [3, 27], [2, 50], [6, 24], [7, 28], [5, 45]]); return [`\\sqrt{${a}} \\times \\sqrt{${b}}`, `√${a} × √${b}`, `$\\sqrt{${a}} \\times \\sqrt{${b}} = \\sqrt{${a * b}} = ${Math.round(Math.sqrt(a * b))}$ : le produit de deux irrationnels peut être un entier !`]; },
        () => { const d = pick([3, 6, 7, 9]), m = rand(1, 2), a = rand(1, m * d - 1), b = m * d - a; return [`\\dfrac{${a}}{${d}} + \\dfrac{${b}}{${d}}`, `${a}/${d} + ${b}/${d}`, `$\\dfrac{${a}}{${d}} + \\dfrac{${b}}{${d}} = \\dfrac{${m * d}}{${d}} = ${m}$ : c'est un entier positif.`]; }
      ],
      [ // Z
        () => { const n = rand(1, 99); return [`-${n}`, `−${n}`, `$-${n}$ est un entier négatif : il est dans $\\mathbb{Z}$ mais pas dans $\\mathbb{N}$.`]; },
        () => { const k = rand(2, 12), d = rand(2, 9); return Math.random() < 0.5 ? [`-\\dfrac{${k * d}}{${d}}`, `−${k * d}/${d}`, `$-\\dfrac{${k * d}}{${d}} = -${k}$ : c'est un entier négatif.`] : [`\\dfrac{${k * d}}{-${d}}`, `${k * d}/(−${d})`, `$\\dfrac{${k * d}}{-${d}} = -${k}$ : c'est un entier négatif.`]; },
        () => { const k = rand(2, 12); return [`-\\sqrt{${k * k}}`, `−√${k * k}`, `$-\\sqrt{${k * k}} = -${k}$ : c'est un entier négatif.`]; },
        () => { const b = rand(3, 10), a = rand(1, b - 1); return [`${a} - \\sqrt{${b * b}}`, `${a} − √${b * b}`, `$${a} - \\sqrt{${b * b}} = ${a} - ${b} = ${a - b}$ : c'est un entier négatif.`]; }
      ],
      [ // D
        () => { let x; do { x = rand(-9999, 9999) / pick([10, 100, 1000]); } while (Number.isInteger(x)); return [nb(x), ensNum(x), `$${nb(x)}$ s'écrit avec un nombre fini de chiffres après la virgule, mais ce n'est pas un entier.`]; },
        () => {
          const d = pick([2, 4, 5, 8, 16, 20, 25, 40, 50, 80]); let n; do { n = rand(1, 3 * d); } while (pgcd(n, d) !== 1); n *= sgn();
          const m = pick([1, 1, 1, 3, 7]), [t, x] = fD(n * m, d * m);
          return [t, x, `${m > 1 ? `$${t} = ${fD(n, d)[0]}$ (on simplifie par $${m}$). ` : ""}$${fD(n, d)[0]} = ${nb(n / d)}$ : un nombre fini de chiffres après la virgule. Le dénominateur $${ensFact(d)}$ ne s'écrit qu'avec des facteurs $2$ et $5$.`];
        },
        () => { const r = pick([0.2, 0.3, 0.4, 0.6, 0.7, 0.8, 0.9, 1.1, 1.2, 1.3, 1.5, 2.5, 0.05, 0.12]), c = +(r * r).toFixed(4); return [`\\sqrt{${nb(c)}}`, `√${ensNum(c)}`, `$\\sqrt{${nb(c)}} = ${nb(r)}$ car $${nb(r)}^2 = ${nb(c)}$ : c'est un décimal qui n'est pas entier.`]; },
        () => { const p = pick([2, 5, 7, 12, 35, 45, 65, 75, 120, 150, 250]); return [`${p}\\,\\%`, `${p} %`, `$${p}\\,\\% = \\dfrac{${p}}{100} = ${nb(p / 100)}$ : un nombre fini de chiffres après la virgule, et ce n'est pas un entier.`]; }
      ],
      [ // Q
        () => {
          const d = pick([3, 6, 7, 9, 11, 12, 13, 14, 15, 18, 21, 30]); let n; do { n = rand(1, 3 * d); } while (pgcd(n, d) !== 1); n *= sgn();
          const m = pick([1, 1, 1, 2, 4, 5]), [t, x] = fD(n * m, d * m);
          return [t, x, `${m > 1 ? `$${t} = ${fD(n, d)[0]}$ (on simplifie par $${m}$). ` : ""}$${fD(n, d)[0]} = ${nb(ensTronc(n / d, 5))}\\ldots$ : l'écriture décimale ne s'arrête jamais, car le dénominateur $${ensFact(d)}$ ne s'écrit pas seulement avec des facteurs $2$ et $5$. C'est un quotient d'entiers, donc un rationnel, mais pas un décimal.`];
        },
        () => { const b = pick([3, 7, 9]); let a; do { a = rand(1, 2 * b); } while (pgcd(a, b) !== 1); return [`\\sqrt{\\dfrac{${a * a}}{${b * b}}}`, `√(${a * a}/${b * b})`, `$\\sqrt{\\dfrac{${a * a}}{${b * b}}} = \\dfrac{${a}}{${b}}$ car $\\left(\\dfrac{${a}}{${b}}\\right)^2 = \\dfrac{${a * a}}{${b * b}}$ : c'est un rationnel, mais pas un décimal (son dénominateur est $${b}$).`]; },
        () => { const [a, b, c, d] = pick([[1, 2, 1, 3], [1, 3, 1, 4], [2, 3, 1, 5], [1, 6, 1, 4], [1, 2, 2, 3], [3, 4, 1, 6], [1, 5, 1, 3]]), N = a * d + b * c, D = b * d, g = pgcd(N, D); return [`\\dfrac{${a}}{${b}} + \\dfrac{${c}}{${d}}`, `${a}/${b} + ${c}/${d}`, `$\\dfrac{${a}}{${b}} + \\dfrac{${c}}{${d}} = \\dfrac{${N}}{${D}}${g > 1 ? ` = \\dfrac{${N / g}}{${D / g}}` : ""} = ${nb(ensTronc(N / D, 5))}\\ldots$ : un quotient d'entiers dont l'écriture décimale ne s'arrête pas. C'est un rationnel, mais pas un décimal.`]; }
      ],
      [ // R
        () => { const n = sansRacine(2, 60), s = sgn() < 0; return [`${s ? "-" : ""}\\sqrt{${n}}`, `${s ? "−" : ""}√${n}`, `$\\sqrt{${n}}$ est **irrationnel** : $${n}$ n'est pas le carré d'un entier.${s ? ` Son opposé $-\\sqrt{${n}}$ l'est aussi.` : ""}`]; },
        () => { const n = sansRacine(2, 20), k = rand(2, 5); return [`${k}\\sqrt{${n}}`, `${k}√${n}`, `$\\sqrt{${n}}$ est irrationnel. Si $${k}\\sqrt{${n}}$ était rationnel, $\\sqrt{${n}}$ (son quotient par $${k}$) le serait aussi : $${k}\\sqrt{${n}}$ est donc irrationnel.`]; },
        () => { const n = sansRacine(2, 20), k = randNZ(-5, 5); return [`${k} + \\sqrt{${n}}`, `${ensNum(k)} + √${n}`, `$\\sqrt{${n}}$ est irrationnel. Si $${k} + \\sqrt{${n}}$ était rationnel, $\\sqrt{${n}}$ (obtenu en retranchant $${k}$) le serait aussi : $${k} + \\sqrt{${n}}$ est donc irrationnel.`]; },
        () => pick([
          ["\\pi", "π", "$\\pi = 3{,}14159\\ldots$ est **irrationnel** : ses décimales ne s'arrêtent jamais et ne se répètent pas."],
          ["2\\pi", "2π", "$\\pi$ est irrationnel, donc $2\\pi$ aussi (sinon $\\pi = \\dfrac{2\\pi}{2}$ serait rationnel)."],
          ["3\\pi", "3π", "$\\pi$ est irrationnel, donc $3\\pi$ aussi (sinon $\\pi = \\dfrac{3\\pi}{3}$ serait rationnel)."],
          ["\\dfrac{\\pi}{2}", "π/2", "$\\pi$ est irrationnel, donc $\\dfrac{\\pi}{2}$ aussi (sinon $\\pi = 2 \\times \\dfrac{\\pi}{2}$ serait rationnel)."],
          ["\\dfrac{\\pi}{4}", "π/4", "$\\pi$ est irrationnel, donc $\\dfrac{\\pi}{4}$ aussi (sinon $\\pi = 4 \\times \\dfrac{\\pi}{4}$ serait rationnel)."],
          ["\\pi + 1", "π + 1", "$\\pi$ est irrationnel, donc $\\pi + 1$ aussi (sinon $\\pi = (\\pi + 1) - 1$ serait rationnel)."],
          ["\\pi - 3", "π − 3", "$\\pi$ est irrationnel, donc $\\pi - 3$ aussi (sinon $\\pi = (\\pi - 3) + 3$ serait rationnel)."],
          ["\\dfrac{\\sqrt{2}}{2}", "√2/2", "$\\sqrt{2}$ est irrationnel, donc $\\dfrac{\\sqrt{2}}{2}$ aussi (sinon $\\sqrt{2} = 2 \\times \\dfrac{\\sqrt{2}}{2}$ serait rationnel)."]
        ])
      ]
    ];
    const [tex, txt, expl] = pick(T[cat])();
    return { tex, txt, cat, expl };
  }
  const ensAidesSets = [
    "Commence par simplifier le nombre si c'est possible (fraction, racine carrée, calcul).",
    "Rappel : $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$. Teste les ensembles dans cet ordre.",
    "Décimal : un nombre **fini** de chiffres après la virgule. Rationnel : un quotient de deux entiers."
  ];

  GEN["ens-plus-petit"] = function () {
    const N = nombreEnsemble();
    return {
      enonce: `Quel est le **plus petit** ensemble de nombres auquel appartient $${N.tex}$ ?`,
      figure: ensEnsembles(), figureSolution: ensEnsembles({ places: [{ cat: N.cat, txt: N.txt }] }),
      mode: "choix", choix: SETS.map((e) => `$${e}$`), attendu: N.cat,
      aides: ensAidesSets,
      solution: `${N.expl}\n\nLe plus petit ensemble qui contient $${N.tex}$ est $${SETS[N.cat]}$ (${NOMS_SETS[N.cat]}).`
    };
  };

  /* Appartient ou pas ? Une seule affirmation vraie (ou fausse) parmi 4, ou le nombre qui convient parmi 4 */
  GEN["ens-vrai-faux"] = function () {
    const t = Math.random();
    if (t < 0.25) {
      const EX = ["", "-1", "0{,}5", "\\dfrac{1}{3}", "\\sqrt{2}"], T = [];
      for (let a = 0; a < 5; a++) for (let b = 0; b < 5; b++) if (a !== b) T.push([`$${SETS[a]} \\subset ${SETS[b]}$`, a < b, a < b ? `tout élément de $${SETS[a]}$ est aussi dans $${SETS[b]}$.` : `$${EX[a]}$ est dans $${SETS[a]}$ mais pas dans $${SETS[b]}$.`]);
      return vraiFaux4(T, ["$A \\subset B$ se lit « $A$ est inclus dans $B$ » : tous les nombres de $A$ sont aussi dans $B$.", "Rappel : $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$.", "Pour montrer qu'une inclusion est fausse, il suffit d'un contre-exemple : un nombre du premier ensemble qui n'est pas dans le second."]);
    }
    if (t < 0.55) {
      const DESC = ["un entier naturel", "un entier relatif négatif", "un décimal qui n'est pas entier", "un rationnel qui n'est pas décimal", "un irrationnel"];
      const cible = rand(0, 4), Q = shuffle([0, 1, 2, 3, 4].filter((c) => c !== cible)).slice(0, 3).map((c) => nombreEnsemble(c)), B = nombreEnsemble(cible);
      const c = melangeChoix(`$${B.tex}$`, Q.map((q) => `$${q.tex}$`)), tous = [B].concat(Q);
      return {
        enonce: `Lequel de ces nombres est ${DESC[cible]} ?`,
        figure: ensEnsembles(), figureSolution: ensEnsembles({ places: tous.map((q) => ({ cat: q.cat, txt: q.txt })) }),
        mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ensAidesSets.slice(0, 2).concat([`On cherche ${DESC[cible]} : trouve le plus petit ensemble de chaque nombre.`]),
        solution: tous.map((q) => `- $${q.tex}$ : ${minus(q.expl)}`).join("\n") + `\n\nLe nombre qui est ${DESC[cible]} est $${B.tex}$.`
      };
    }
    const N = nombreEnsemble(), T = [];
    const dans = (k) => (N.cat === k ? `c'est son plus petit ensemble.` : `son plus petit ensemble, $${SETS[N.cat]}$, est inclus dans $${SETS[k]}$.`);
    const pas = (k) => `il n'est pas dans $${SETS[k]}$ : son plus petit ensemble est $${SETS[N.cat]}$.`;
    for (let k = 0; k < 5; k++) {
      T.push([`$${N.tex} \\in ${SETS[k]}$`, N.cat <= k, N.cat <= k ? dans(k) : pas(k)]);
      T.push([`$${N.tex} \\notin ${SETS[k]}$`, N.cat > k, N.cat > k ? pas(k) : `il est dans $${SETS[k]}$ : ${dans(k)}`]);
    }
    const q = vraiFaux4(T, [`Le symbole $\\in$ se lit « appartient à », et $\\notin$ « n'appartient pas à ».`, "Simplifie d'abord le nombre, puis cherche le plus petit ensemble qui le contient.", "Un nombre appartient à son plus petit ensemble et à tous les ensembles plus grands, mais pas aux plus petits."]);
    q.figure = ensEnsembles();
    q.figureSolution = ensEnsembles({ places: [{ cat: N.cat, txt: N.txt }] });
    q.solution = `${N.expl} Son plus petit ensemble est $${SETS[N.cat]}$.\n\n` + q.solution;
    return q;
  };

  /* Lire l'abscisse d'un point, placer un nombre (fraction, irrationnel) sur une droite graduée */
  GEN["ens-abscisse"] = function (i) {
    const t = Math.random();
    if (t < 0.25) {
      let n; do { n = rand(2, 40); } while (Number.isInteger(Math.sqrt(n)));
      const r = Math.sqrt(n), a = Math.floor(r), pos = [r];
      shuffle([n / 2, r + 1, r - 1, r + 2, r - 2, n / 10 + a + 1]).forEach((x) => { if (pos.length < 4 && x > 0.3 && x < 9.7 && Math.floor(x) !== a && pos.every((y) => Math.abs(y - x) > 0.45)) pos.push(x); });
      const M = Math.ceil(Math.max(...pos)) + 1, noms = ["A", "B", "C", "D"], ordre = pos.map((x, k) => [x, k]).sort((u, v) => u[0] - v[0]), j = ordre.findIndex((u) => u[1] === 0);
      return {
        enonce: `Sur la droite graduée, quel point a pour abscisse $\\sqrt{${n}}$ ?`,
        figure: droite({ min: 0, max: M, sub: M <= 6 ? 10 : 2, points: ordre.map((u, k) => ({ x: u[0], label: noms[k] })), aria: `Droite graduée de 0 à ${M} avec quatre points A, B, C et D` }),
        mode: "choix", choix: noms.slice(0, ordre.length).map((l) => `Le point $${l}$`), attendu: j,
        aides: [`Cherche deux carrés d'entiers qui encadrent $${n}$.`, `$${a}^2 = ${a * a}$ et $${a + 1}^2 = ${(a + 1) * (a + 1)}$, donc $${a} < \\sqrt{${n}} < ${a + 1}$.`, `Un seul point est entre $${a}$ et $${a + 1}$.`],
        solution: `$${a * a} < ${n} < ${(a + 1) * (a + 1)}$, donc $${a} < \\sqrt{${n}} < ${a + 1}$ (la calculatrice donne $\\sqrt{${n}} \\approx ${nb(+r.toFixed(2))}$). Le seul point situé entre $${a}$ et $${a + 1}$ est le point $${noms[j]}$.`
      };
    }
    const s = pick([2, 3, 4, 5, 6, 8, 10]), L = s >= 6 ? 2 : 3, m = rand(-3, 1), g = (k) => pgcd(m * s + k, s);
    const valeur = (k) => frac(m * s + k, s), decimal = (k) => { let d = s / g(k); while (d % 2 === 0) d /= 2; while (d % 5 === 0) d /= 5; return d === 1; };
    const etiq = []; for (let x = m; x <= m + L; x++) etiq.push({ x });
    const ariaD = `Droite graduée de ${ensNum(m)} à ${ensNum(m + L)}, chaque unité partagée en ${s} parts égales`;
    if (t < 0.65) {
      let k; do { k = rand(1, L * s - 1); } while (k % s === 0);
      const x = m + k / s, dec = decimal(k), dit = i < 2, m0 = m + Math.floor(k / s), j = k % s;
      return {
        enonce: `${dit ? `Sur cette droite graduée, chaque unité est partagée en $${s}$ parts égales. ` : ""}Quelle est l'abscisse du point $A$ ?${dec ? "" : " Donne la valeur exacte, sous forme de fraction."}`,
        figure: droite({ min: m, max: m + L, pas: 1 / s, etiq, points: [{ x, label: "A" }], aria: ariaD + ", et un point A" }),
        mode: "nombre", prefixe: "$A$ :", attendu: x,
        erreurs: ensErr(x, [
          { valeur: m0 + j, message: `Une graduation ne vaut pas $1$ : entre deux entiers, il y a $${s}$ graduations.` },
          s !== 10 ? { valeur: m0 + j / 10, message: `Une graduation ne vaut pas $0{,}1$ ici : l'unité est partagée en $${s}$ parts, une graduation vaut $\\dfrac{1}{${s}}$.` } : null,
          x < 0 ? { valeur: -x, message: "Attention au signe : $A$ est à gauche de $0$, son abscisse est négative." } : null,
          x < 0 ? { valeur: m0 + 1 - j / s, message: `Attention au sens : on part de $${m0}$ et on avance vers la droite de $${j}$ graduation${j > 1 ? "s" : ""}.` } : null,
          dec ? null : { valeur: +x.toFixed(2), message: "C'est une valeur approchée. Donne la valeur exacte, sous forme de fraction." },
          dec ? null : { valeur: +x.toFixed(1), message: "C'est une valeur approchée. Donne la valeur exacte, sous forme de fraction." },
          dec ? null : { valeur: ensTronc(x, 2), message: "C'est une valeur approchée. Donne la valeur exacte, sous forme de fraction." }
        ]),
        aides: [dit ? `Une graduation vaut $\\dfrac{1}{${s}}$.` : "Compte le nombre de parts égales entre deux entiers voisins.", `Il y a $${s}$ parts : une graduation vaut $\\dfrac{1}{${s}}$, et le point $A$ est à $${j}$ graduation${j > 1 ? "s" : ""} à droite de $${m0}$.`, `Calcule $${m0} + \\dfrac{${j}}{${s}}$.`],
        solution: `Chaque unité est partagée en $${s}$ : une graduation vaut $\\dfrac{1}{${s}}$. Le point $A$ est à $${j}$ graduation${j > 1 ? "s" : ""} à droite de $${m0}$ :\n\n$${m0} + \\dfrac{${j}}{${s}} = ${valeur(k)}${dec && /dfrac/.test(valeur(k)) ? ` = ${nb(x)}` : ""}$`
      };
    }
    const libres = []; for (let k = 1; k < L * s; k++) if (k % s) libres.push(k);
    const ks = shuffle(libres).slice(0, 4).sort((u, v) => u - v);
    const noms = ["A", "B", "C", "D"].slice(0, ks.length), j = rand(0, ks.length - 1), k = ks[j], x = m + k / s, xt = Math.random() < 0.5 || !decimal(k) ? valeur(k) : nb(x);
    const m0 = m + Math.floor(k / s), r = k % s;
    return {
      enonce: `Quel point a pour abscisse $${xt}$ ?`,
      figure: droite({ min: m, max: m + L, pas: 1 / s, etiq, points: ks.map((q, n) => ({ x: m + q / s, label: noms[n] })), aria: ariaD + ", et quatre points A, B, C et D" }),
      mode: "choix", choix: noms.map((l) => `Le point $${l}$`), attendu: j,
      aides: [`Chaque unité est partagée en $${s}$ parts : une graduation vaut $\\dfrac{1}{${s}}$.`, `Encadre $${xt}$ entre deux entiers, puis écris-le sous la forme $${m0} + \\dfrac{\\ldots}{${s}}$.`, `$${xt} = ${m0} + \\dfrac{${r}}{${s}}$ : compte $${r}$ graduation${r > 1 ? "s" : ""} à droite de $${m0}$.`],
      solution: `Une graduation vaut $\\dfrac{1}{${s}}$ et $${xt} = ${m0} + \\dfrac{${r}}{${s}}$. On part de $${m0}$ et on avance de $${r}$ graduation${r > 1 ? "s" : ""} vers la droite : c'est le point $${noms[j]}$.`
    };
  };

  /* Encadrement décimal (avec la droite zoomée), arrondi, chiffres significatifs */
  function ensEncadre(v, n, txt, sol) {
    const P = 10 ** n, p = 1 / P, ka = Math.floor(v * P + 1e-9), a = ka / P, b = (ka + 1) / P, f = (x) => x.toFixed(n).replace(".", ",");
    return droite({ min: a - p, max: b + p, pas: p, sub: 10, intervalles: [{ a, b, ga: true, gb: false }],
      etiq: sol ? [{ x: a - p, t: f(a - p) }, { x: a, t: f(a), gras: true }, { x: b, t: f(b), gras: true }, { x: b + p, t: f(b + p) }] : [{ x: a, t: "a", gras: true }, { x: b, t: "b", gras: true }],
      points: [{ x: v, label: txt }],
      aria: sol ? `Droite graduée : ${txt} est entre ${f(a)} et ${f(b)}, deux graduations écartées de ${f(p)}` : `Droite graduée de pas ${f(p)} : ${txt} est entre deux graduations voisines notées a et b` });
  }
  const ENS_CS = [ // contextes pour les chiffres significatifs : [phrase, unité, min, max]
    ["Au lycée de Sada, on calcule la longueur de la diagonale d'un terrain de handball", "m", 30, 50],
    ["Zaïnaba calcule le volume d'eau d'une citerne cylindrique à Chirongui", "m³", 1, 10],
    ["Nassim calcule la durée d'un trajet en taxi-brousse de Mamoudzou à Sada", "h", 0.5, 1],
    ["Au laboratoire, Awa calcule l'intensité d'un courant avec la loi d'Ohm", "A", 0.01, 0.1],
    ["Moussa calcule la vitesse moyenne de sa pirogue dans le lagon", "km/h", 3, 9.9],
    ["Fatima calcule la masse moyenne d'un grain de sable de la plage de Moya", "g", 0.001, 0.01],
    ["Ibrahim calcule l'aire d'un champ de manioc à Combani", "ha", 1, 9.9],
    ["Mariama calcule la distance parcourue par la barge entre Mamoudzou et Dzaoudzi", "km", 2.5, 4],
    ["Saïd calcule la concentration en sucre d'un jus de goyave", "g/L", 10, 99]
  ];
  GEN["ens-arrondi"] = function () {
    const t = rand(0, 3);
    if (t === 3) {
      const [phrase, u, lo, hi] = pick(ENS_CS);
      let k, D, e, R6; do { k = pick([2, 3, 3, 4]); const v0 = lo + Math.random() * (hi - lo); e = Math.floor(Math.log10(v0)); R6 = Math.round(v0 / 10 ** (e - 5)); D = String(R6); } while (R6 < 1e5 || R6 >= 1e6 || /^50*$/.test(D.slice(k)) || /^9+$/.test(D.slice(0, k)) && +D[k] >= 5 || k <= e);
      const v = +(R6 * 10 ** (e - 5)).toFixed(Math.max(0, 5 - e)), K = +D.slice(0, k), suiv = +D[k], Kr = suiv >= 5 ? K + 1 : K;
      const r = +(Kr * 10 ** (e - k + 1)).toFixed(Math.max(0, k - 1 - e)), tr = +(K * 10 ** (e - k + 1)).toFixed(Math.max(0, k - 1 - e));
      const premiers = D.slice(0, k);
      return {
        enonce: `${phrase} : la calculatrice affiche $${nb(v)}$ ${u}. Arrondis ce résultat avec $${k}$ chiffres significatifs.`,
        mode: "nombre", prefixe: "Arrondi :", suffixe: u, attendu: r,
        erreurs: ensErr(r, [
          { valeur: tr, message: `Tu as coupé sans arrondir : regarde le chiffre suivant, $${suiv}$.` },
          { valeur: +v.toFixed(k), message: `Tu as gardé $${k}$ chiffres après la virgule. Les chiffres significatifs se comptent à partir du **premier chiffre non nul**.` },
          { valeur: +(+v.toPrecision(k + 1)).toFixed(10), message: `Il faut exactement $${k}$ chiffres significatifs, pas $${k + 1}$.` }
        ]),
        aides: ["Les chiffres significatifs se comptent à partir du premier chiffre non nul : les zéros du début ne comptent pas.", `Les $${k}$ premiers chiffres significatifs sont $${premiers.split("").join("$, $")}$ ; le chiffre suivant est $${suiv}$.`, "De $0$ à $4$, on garde ; de $5$ à $9$, on ajoute $1$ au dernier chiffre gardé."],
        solution: `On compte à partir du premier chiffre non nul : les $${k}$ premiers chiffres significatifs de $${nb(v)}$ sont $${premiers.split("").join("$, $")}$, et le suivant est $${suiv}$ : ${suiv >= 5 ? "on arrondit au-dessus" : "on garde"}.\n\nAvec $${k}$ chiffres significatifs : $${nb(r)}$ ${u}.`
      };
    }
    let tex, txt, v;
    if (Math.random() < 0.5) {
      [tex, txt, v] = pick([["\\sqrt{2}", "√2", Math.SQRT2], ["\\sqrt{3}", "√3", Math.sqrt(3)], ["\\sqrt{5}", "√5", Math.sqrt(5)], ["\\sqrt{6}", "√6", Math.sqrt(6)], ["\\sqrt{7}", "√7", Math.sqrt(7)], ["\\sqrt{10}", "√10", Math.sqrt(10)], ["\\sqrt{11}", "√11", Math.sqrt(11)], ["\\sqrt{13}", "√13", Math.sqrt(13)], ["\\sqrt{17}", "√17", Math.sqrt(17)], ["\\sqrt{19}", "√19", Math.sqrt(19)], ["\\pi", "π", Math.PI], ["2\\pi", "2π", 2 * Math.PI], ["\\dfrac{\\pi}{3}", "π/3", Math.PI / 3], ["1 + \\sqrt{2}", "1 + √2", 1 + Math.SQRT2]]);
    } else {
      const q = pick([3, 6, 7, 9, 11, 12, 13, 14, 15]); let p; do { p = rand(1, 5 * q); } while (pgcd(p, q) !== 1);
      tex = `\\dfrac{${p}}{${q}}`; txt = `${p}/${q}`; v = p / q;
    }
    const n = t === 0 ? rand(0, 3) : rand(1, 3), P = 10 ** n, nom = ["à l'unité", "au dixième", "au centième", "au millième"][n];
    const tronc = Math.floor(v * P + 1e-9) / P, sup = (Math.floor(v * P + 1e-9) + 1) / P, arr = Math.round(v * P) / P;
    const suivant = Math.floor(v * P * 10 + 1e-9) % 10;
    const ecran = v.toFixed(9).replace(".", "{,}");
    const pt = (x) => x.toFixed(n).replace(".", "{,}");
    if (t === 0) return {
      enonce: `La calculatrice affiche $${tex} \\approx ${ecran}$. Donne l'arrondi de $${tex}$ ${nom}${n ? ` ($10^{-${n}}$ près)` : ""}.`,
      mode: "nombre", prefixe: "Arrondi :", attendu: arr,
      erreurs: ensErr(arr, arr !== tronc ? [{ valeur: tronc, message: "Tu as coupé sans arrondir : regarde le chiffre qui suit." }] : [{ valeur: sup, message: `Le chiffre qui suit est $${suivant}$ : on ne monte pas.` }]),
      aides: [n ? `Garde $${n}$ chiffre${n > 1 ? "s" : ""} après la virgule : $${pt(tronc)}$…` : `Garde la partie entière : $${pt(tronc)}$…`, `Regarde le chiffre suivant : c'est $${suivant}$.`, "De $0$ à $4$ on garde, de $5$ à $9$ on ajoute $1$ au dernier chiffre gardé."],
      solution: `$${tex} \\approx ${ecran}$ : le chiffre qui suit est $${suivant}$, ${suivant >= 5 ? "on arrondit au-dessus" : "on garde"}. L'arrondi ${nom} est $${pt(arr)}$.`
    };
    const bas = t === 1;
    return {
      enonce: `La calculatrice affiche $${tex} \\approx ${ecran}$. On cherche un encadrement d'amplitude $10^{-${n}}$ : $a \\leqslant ${tex} < b$, avec $a$ et $b$ écrits avec $${n}$ chiffre${n > 1 ? "s" : ""} après la virgule (voir la droite graduée). Que vaut $${bas ? "a" : "b"}$ ?`,
      figure: ensEncadre(v, n, txt, false), figureSolution: ensEncadre(v, n, txt, true),
      mode: "nombre", prefixe: `$${bas ? "a" : "b"} =$`, attendu: bas ? tronc : sup,
      erreurs: ensErr(bas ? tronc : sup, [{ valeur: bas ? sup : tronc, message: `Ça, c'est $${bas ? "b" : "a"}$ : on cherche la borne ${bas ? "inférieure" : "supérieure"}.` }, { valeur: arr, message: "Ça, c'est l'arrondi. Pour un encadrement, $a$ s'obtient en coupant l'écriture, et $b = a + 10^{-n}$." }]),
      aides: [`$10^{-${n}} = ${nb(1 / P)}$ : les bornes ont $${n}$ chiffre${n > 1 ? "s" : ""} après la virgule et sont écartées de $${nb(1 / P)}$.`, `$a$ : on coupe l'écriture après le ${["", "dixième", "centième", "millième"][n]}, soit $${pt(tronc)}$.`, `$b = a + ${nb(1 / P)}$.`],
      solution: `$${pt(tronc)} \\leqslant ${tex} < ${pt(sup)}$ : encadrement d'amplitude $10^{-${n}}$. Donc $${bas ? "a" : "b"} = ${pt(bas ? tronc : sup)}$.`
    };
  };

  /* Outils pour les intervalles */
  const bTex = (x) => (x === -Infinity ? "-\\infty" : x === Infinity ? "+\\infty" : nb(x));
  // \mathopen / \mathclose : un crochet tourné vers l'extérieur reste un délimiteur (sinon « ]−∞ » s'écrit « ] − ∞ »)
  const intTex = (I) => `${I.ga ? "[" : "\\mathopen{]}"}${bTex(I.a)}\\,;${bTex(I.b)}${I.gb ? "]" : "\\mathclose{[}"}`;
  function ineqTex(I, v) {
    v = v || "x";
    if (!isFinite(I.a)) return `${v} ${I.gb ? "\\leqslant" : "<"} ${bTex(I.b)}`;
    if (!isFinite(I.b)) return `${v} ${I.ga ? "\\geqslant" : ">"} ${bTex(I.a)}`;
    return `${bTex(I.a)} ${I.ga ? "\\leqslant" : "<"} ${v} ${I.gb ? "\\leqslant" : "<"} ${bTex(I.b)}`;
  }
  function intervalle(demi) {
    const k = rand(0, 3), h = demi ? 0.5 : 0;
    const a = rand(-8, 5) + h, b = a + rand(2, 7);
    if (k === 0) return { a: -Infinity, b, ga: false, gb: Math.random() < 0.5 };
    if (k === 1) return { a, b: Infinity, ga: Math.random() < 0.5, gb: false };
    return { a, b, ga: Math.random() < 0.5, gb: Math.random() < 0.5 };
  }
  // Intervalles voisins : crochets changés, ou mauvais côté pour une borne infinie
  function voisins(I) {
    const v = [];
    if (isFinite(I.a)) v.push(Object.assign({}, I, { ga: !I.ga }));
    if (isFinite(I.b)) v.push(Object.assign({}, I, { gb: !I.gb }));
    if (isFinite(I.a) && isFinite(I.b)) v.push(Object.assign({}, I, { ga: !I.ga, gb: !I.gb }));
    if (!isFinite(I.a)) v.push({ a: I.b, b: Infinity, ga: I.gb, gb: false }, { a: I.b, b: Infinity, ga: !I.gb, gb: false });
    if (!isFinite(I.b)) v.push({ a: -Infinity, b: I.a, ga: false, gb: I.ga }, { a: -Infinity, b: I.a, ga: false, gb: !I.ga });
    return v;
  }
  const choixIntervalles = (bonne, autres, fmt) => melangeChoix(fmt(bonne), autres.map(fmt));
  const regleCrochets = "Borne **incluse** ($\\leqslant$, $\\geqslant$) : crochet tourné vers l'intérieur. Borne **exclue** ($<$, $>$) : crochet tourné vers l'extérieur.";
  // Droite graduée adaptée à un intervalle : bornes marquées (sol = false) ou intervalle tracé (sol = true)
  function intFigure(I, sol, aria) {
    const lo = isFinite(I.a) ? I.a : I.b - 5, hi = isFinite(I.b) ? I.b : I.a + 5, e = hi - lo;
    const p = e <= 10 ? 1 : e <= 20 ? 2 : e <= 50 ? 5 : e <= 100 ? 10 : 50;
    const min = Math.floor((Math.min(lo - 2 * p, p * 20 > Math.abs(lo) ? -p : lo - 2 * p)) / p) * p, max = Math.ceil((Math.max(hi + 2 * p, p * 20 > Math.abs(hi) ? p : hi + 2 * p)) / p) * p;
    return droite({ min, max, pas: p, sub: Number.isInteger(I.a) && Number.isInteger(I.b) || !isFinite(I.a) || !isFinite(I.b) ? 1 : 2, intervalles: sol ? [I] : [], points: sol ? [] : [I.a, I.b].filter(isFinite).map((x) => ({ x })), aria: aria || (sol ? "Droite graduée avec l'intervalle colorié" : "Droite graduée : les bornes sont marquées d'un point") });
  }
  // Contextes : une grandeur, son genre (f = féminin) et ses bornes possibles
  const INT_CTX = [
    () => { const a = rand(24, 27); return { v: "T", f: 1, quoi: "la température $T$ de l'eau du lagon à N'Gouja, en °C", a, b: a + rand(2, 4) }; },
    () => { const a = rand(15, 20); return { v: "t", f: 1, quoi: "la durée $t$, en minutes, de la traversée en barge entre Mamoudzou et Dzaoudzi", a, b: a + rand(5, 10) }; },
    () => { const a = rand(8, 12); return { v: "m", f: 1, quoi: "la masse $m$, en kg, d'un régime de bananes vendu au marché de Mamoudzou", a, b: a + rand(3, 6) }; },
    () => ({ v: "h", f: 1, quoi: "la hauteur $h$ de la marée à Dzaoudzi, en mètres", a: pick([0.5, 1, 1.5]), b: pick([3, 3.5, 4]) }),
    () => ({ v: "y", f: 1, quoi: "l'altitude $y$, en mètres, d'un randonneur sur le sentier du mont Choungui", a: 100 * rand(1, 3), b: 594 }),
    () => ({ v: "p", f: 0, quoi: "le prix $p$, en euros, d'un kilogramme de vanille vendu par la coopérative de Mayotte", a: 50 * rand(4, 8), b: Infinity }),
    () => ({ v: "L", f: 1, quoi: "la longueur $L$, en cm, d'une tortue verte adulte observée à N'Gouja", a: 10 * rand(8, 10), b: Infinity }),
    () => ({ v: "z", f: 1, quoi: "la position $z$, en mètres, d'un plongeur à Saziley (elle est négative sous la surface)", a: -Infinity, b: -rand(5, 20) }),
    () => ({ v: "s", f: 0, quoi: "le solde $s$, en euros, du compte de l'association de pêche de M'tsamboro", a: -Infinity, b: 50 * rand(1, 6) })
  ];
  function intContexte(C) {
    const ga = Math.random() < 0.5, gb = Math.random() < 0.5, e = (m, f) => m + (C.f ? f : "");
    const I = { a: C.a, b: C.b, ga: isFinite(C.a) && ga, gb: isFinite(C.b) && gb };
    let ph;
    if (isFinite(C.a) && isFinite(C.b)) ph = ga && gb ? pick([`est ${e("compris", "e")} entre $${nb(C.a)}$ et $${nb(C.b)}$, ces deux valeurs comprises`, `vaut au moins $${nb(C.a)}$ et au plus $${nb(C.b)}$`])
      : !ga && !gb ? pick([`est strictement ${e("compris", "e")} entre $${nb(C.a)}$ et $${nb(C.b)}$`, `est strictement ${e("supérieur", "e")} à $${nb(C.a)}$ et strictement ${e("inférieur", "e")} à $${nb(C.b)}$`])
      : ga ? `est ${e("supérieur", "e")} ou ${e("égal", "e")} à $${nb(C.a)}$ et strictement ${e("inférieur", "e")} à $${nb(C.b)}$` : `est strictement ${e("supérieur", "e")} à $${nb(C.a)}$ et ${e("inférieur", "e")} ou ${e("égal", "e")} à $${nb(C.b)}$`;
    else if (isFinite(C.a)) ph = ga ? pick([`est au moins ${e("égal", "e")} à $${nb(C.a)}$`, `est ${e("supérieur", "e")} ou ${e("égal", "e")} à $${nb(C.a)}$`]) : `dépasse strictement $${nb(C.a)}$`;
    else ph = gb ? pick([`est ${e("inférieur", "e")} ou ${e("égal", "e")} à $${nb(C.b)}$`, `ne dépasse pas $${nb(C.b)}$`]) : `est strictement ${e("inférieur", "e")} à $${nb(C.b)}$`;
    return { I, ph };
  }

  GEN["int-inegalite"] = function () {
    if (Math.random() < 0.35) {
      const C = pick(INT_CTX)(), { I, ph } = intContexte(C), c = choixIntervalles(I, voisins(I), (J) => `$${C.v} \\in ${intTex(J)}$`);
      return {
        enonce: `On note ${C.quoi}. On sait que $${C.v}$ ${ph}. Traduis cette information par un intervalle.`,
        figure: intFigure(I, false), figureSolution: intFigure(I, true),
        mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: [`Écris d'abord une inégalité avec $${C.v}$.`, regleCrochets, "Du côté de $+\\infty$ ou de $-\\infty$, le crochet est **toujours ouvert**."],
        solution: `$${C.v}$ ${ph} : $${ineqTex(I, C.v)}$, donc $${C.v} \\in ${intTex(I)}$.`
      };
    }
    const I = intervalle(Math.random() < 0.2), versIntervalle = Math.random() < 0.6;
    const fmt = versIntervalle ? (J) => `$x \\in ${intTex(J)}$` : (J) => `$${ineqTex(J)}$`;
    const c = choixIntervalles(I, voisins(I), fmt);
    return {
      enonce: versIntervalle ? `Traduis par un intervalle : $${ineqTex(I)}$.` : `Traduis par une inégalité : $x \\in ${intTex(I)}$.`,
      figure: intFigure(I, false), figureSolution: intFigure(I, true),
      mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: [
        isFinite(I.a) && isFinite(I.b) ? `Les bornes sont $${bTex(I.a)}$ et $${bTex(I.b)}$ (les points de la droite graduée) : regarde si chacune est incluse ou exclue.` : `Il n'y a qu'une borne, $${bTex(isFinite(I.a) ? I.a : I.b)}$ : $x$ peut être aussi ${isFinite(I.a) ? "grand" : "petit"} que l'on veut.`,
        regleCrochets,
        "Du côté de $+\\infty$ ou de $-\\infty$, le crochet est **toujours ouvert** (tourné vers l'extérieur)."
      ],
      solution: `$${ineqTex(I)} \\iff x \\in ${intTex(I)}$`
    };
  };

  GEN["int-droite"] = function () {
    const demi = Math.random() < 0.25, I = intervalle(demi);
    const lo = isFinite(I.a) ? I.a : I.b - 5, hi = isFinite(I.b) ? I.b : I.a + 5;
    const c = choixIntervalles(I, voisins(I), (J) => `$${intTex(J)}$`);
    return {
      enonce: "Quel intervalle est représenté sur la droite graduée ?",
      figure: droite({ min: Math.floor(Math.min(lo - 2, -1)), max: Math.ceil(Math.max(hi + 2, 1)), sub: demi ? 2 : 1, intervalles: [I], aria: "Droite graduée avec un intervalle colorié" }),
      mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: [
        "Repère où commence et où s'arrête la partie coloriée. Si elle va jusqu'au bout de la droite, la borne est $-\\infty$ ou $+\\infty$.",
        "Regarde le sens de chaque crochet : tourné vers la partie coloriée, la borne est incluse ; tourné vers l'extérieur, elle est exclue.",
        demi ? "Les petites graduations sont des demi-unités : une borne peut valoir $2{,}5$, par exemple." : "Du côté de l'infini, le crochet est toujours ouvert."
      ],
      solution: `La partie coloriée correspond à $${ineqTex(I)}$, soit $x \\in ${intTex(I)}$.`
    };
  };

  /* Appartenance à un intervalle : le nombre qui est (ou n'est pas) dans I parmi 4, ou le nombre d'entiers de I */
  GEN["int-appartient"] = function () {
    const I = intervalle(), bornes = [I.a, I.b].filter(isFinite);
    const lo = isFinite(I.a) ? I.a : I.b - 6, hi = isFinite(I.b) ? I.b : I.a + 6;
    const dans = (x) => (x > I.a || (x === I.a && I.ga)) && (x < I.b || (x === I.b && I.gb));
    const fig = () => droite({ min: Math.min(lo - 2, -1), max: Math.max(hi + 2, 1), intervalles: [I], aria: "Droite graduée avec l'intervalle colorié" });
    if (bornes.length === 2 && Math.random() < 0.3) {
      const n = []; for (let k = Math.ceil(I.a); k <= I.b; k++) if (dans(k)) n.push(k);
      const ferme = I.b - I.a + 1, ouvert = I.b - I.a - 1;
      return {
        enonce: `Combien d'entiers relatifs appartiennent à l'intervalle $${intTex(I)}$ ?`,
        mode: "nombre", prefixe: "Nombre d'entiers :", attendu: n.length,
        erreurs: ensErr(n.length, [
          { valeur: ferme, message: "Attention aux crochets : une borne exclue (crochet tourné vers l'extérieur) ne compte pas." },
          { valeur: ouvert, message: "Attention aux crochets : une borne incluse (crochet tourné vers l'intérieur) compte." },
          { valeur: I.b - I.a, message: `$${I.b} - ${par(I.a)}$ donne la longueur de l'intervalle, pas le nombre d'entiers : écris-les tous.` }
        ]),
        aides: [`$x \\in ${intTex(I)}$ signifie $${ineqTex(I)}$.`, "Regarde chaque borne : est-elle incluse ou exclue ?", "Écris la liste des entiers de l'intervalle, puis compte-les."],
        solution: `Les entiers de $${intTex(I)}$ sont $${n.join("$, $")}$ : il y en a $${n.length}$.` + (I.ga && I.gb ? "" : ` ${[!I.ga ? `$${I.a}$` : "", !I.gb ? `$${I.b}$` : ""].filter(Boolean).join(" et ")} ${!I.ga && !I.gb ? "sont exclus" : "est exclu"}.`)
      };
    }
    const cands = new Set();
    bornes.forEach((b) => [b, b - 1, b + 1, +(b - 0.1).toFixed(1), +(b + 0.1).toFixed(1), +(b - 0.5).toFixed(1), +(b + 0.5).toFixed(1)].forEach((x) => cands.add(x)));
    for (let k = 0; k < 8; k++) cands.add(rand(Math.ceil(lo) - 4, Math.floor(hi) + 4));
    const IN = shuffle([...cands].filter(dans)), OUT = shuffle([...cands].filter((x) => !dans(x)));
    let cherche = Math.random() < 0.6;
    if ((cherche ? OUT : IN).length < 3) cherche = !cherche;
    const bons = cherche ? IN : OUT, autres = cherche ? OUT : IN;
    // on préfère une borne (le piège classique) parmi les quatre nombres
    const prio = (L) => L.slice().sort((x, y) => (bornes.includes(y) ? 1 : 0) - (bornes.includes(x) ? 1 : 0));
    const bon = prio(bons)[Math.random() < 0.5 ? 0 : rand(0, bons.length - 1)], faux = prio(autres).slice(0, 3);
    const c = melangeChoix(`$${nb(bon)}$`, faux.map((x) => `$${nb(x)}$`)), quatre = [bon].concat(faux), avecFig = Math.random() < 0.5;
    const q = {
      enonce: `${avecFig ? "On a représenté l'intervalle $I$ sur la droite graduée. " : `Soit $I = ${intTex(I)}$. `}Lequel de ces nombres ${cherche ? "appartient" : "n'appartient pas"} à $I$ ?`,
      mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: [avecFig ? "Lis d'abord l'intervalle : ses bornes et le sens des crochets." : `$x \\in ${intTex(I)}$ signifie $${ineqTex(I)}$.`, "Teste chaque nombre. Attention aux bornes : regarde le sens du crochet.", regleCrochets],
      solution: (avecFig ? `L'intervalle représenté est $I = ${intTex(I)}$, c'est-à-dire $${ineqTex(I)}$.\n\n` : `$x \\in ${intTex(I)}$ signifie $${ineqTex(I)}$.\n\n`) + quatre.map((x) => `- $${nb(x)} ${dans(x) ? "\\in" : "\\notin"} I$${bornes.includes(x) ? ` : c'est une borne ${(x === I.a ? I.ga : I.gb) ? "incluse" : "exclue"}` : ""}`).join("\n") + `\n\nLa réponse est $${nb(bon)}$.`
    };
    if (avecFig) q.figure = fig();
    return q;
  };

  GEN["int-inter-union"] = function () {
    const inter = Math.random() < 0.5, op = inter ? "\\cap" : "\\cup", cas = Math.random();
    const vide = { tex: "\\varnothing" };
    let I, J, R, autres, expl;
    if (cas < 0.2) {
      // J inclus dans I
      const a = rand(-8, -1), c = a + rand(1, 3), b = c + rand(1, 4), d = b + rand(1, 3);
      I = { a, b: d, ga: Math.random() < 0.5, gb: Math.random() < 0.5, label: "I" }; J = { a: c, b, ga: Math.random() < 0.5, gb: Math.random() < 0.5, label: "J" };
      R = inter ? J : I;
      autres = [inter ? I : J, { a: c, b: d, ga: J.ga, gb: I.gb }, { a, b, ga: I.ga, gb: J.gb }, Object.assign({}, R, { ga: !R.ga })];
      expl = `$J$ est entièrement contenu dans $I$ : ${inter ? "la partie commune est $J$ tout entier" : "la réunion est $I$ tout entier"}.`;
    } else if (cas < 0.35) {
      // I et J se touchent en une borne b
      const a = rand(-8, 0), b = a + rand(2, 5), d = b + rand(2, 5), gb = Math.random() < 0.5, gc = Math.random() < 0.5;
      I = { a, b, ga: Math.random() < 0.5, gb, label: "I" }; J = { a: b, b: d, ga: gc, gb: Math.random() < 0.5, label: "J" };
      if (inter) {
        const bonne = gb && gc ? `\\{${b}\\}` : "\\varnothing", faux = [gb && gc ? "\\varnothing" : `\\{${b}\\}`, intTex({ a, b: d, ga: I.ga, gb: J.gb }), intTex({ a: b, b: d, ga: true, gb: J.gb })];
        const c4 = melangeChoix(`$${bonne}$`, faux.map((f) => `$${f}$`));
        return {
          enonce: `On donne $I = ${intTex(I)}$ et $J = ${intTex(J)}$. Détermine $I \\cap J$.`,
          figure: droite({ min: a - 1, max: d + 1, intervalles: [I, J], aria: "Droite graduée avec les intervalles I et J, qui se touchent en une borne" }),
          mode: "choix", choix: c4.choix, attendu: c4.attendu,
          aides: ["$I \\cap J$ : les nombres qui sont **à la fois** dans $I$ et dans $J$.", `Les deux intervalles n'ont en commun que, peut-être, le nombre $${b}$.`, `$${b}$ est-il dans $I$ ? Est-il dans $J$ ? Regarde les deux crochets en $${b}$.`],
          solution: `Seul le nombre $${b}$ peut être dans les deux intervalles. Il est ${gb ? "inclus" : "exclu"} de $I$ et ${gc ? "inclus" : "exclu"} dans $J$.\n\n` + (gb && gc ? `$I \\cap J = \\{${b}\\}$ : un seul nombre.` : `$I \\cap J = \\varnothing$ : l'intersection est vide.`)
        };
      }
      R = gb || gc ? { a, b: d, ga: I.ga, gb: J.gb } : null;
      if (!R) {
        const bonne = `${intTex(I)} \\cup ${intTex(J)}`, c4 = melangeChoix(`$${bonne}$`, [intTex({ a, b: d, ga: I.ga, gb: J.gb }), intTex({ a, b: d, ga: !I.ga, gb: !J.gb }), "\\varnothing"].map((f) => `$${f}$`));
        return {
          enonce: `On donne $I = ${intTex(I)}$ et $J = ${intTex(J)}$. Détermine $I \\cup J$.`,
          figure: droite({ min: a - 1, max: d + 1, intervalles: [I, J], aria: "Droite graduée avec les intervalles I et J, qui se touchent en une borne exclue des deux" }),
          mode: "choix", choix: c4.choix, attendu: c4.attendu,
          aides: ["$I \\cup J$ : les nombres qui sont dans $I$ **ou** dans $J$.", `Regarde le nombre $${b}$ : est-il dans $I$ ? dans $J$ ?`, "S'il manque un nombre, la réunion a un « trou » : ce n'est pas un seul intervalle."],
          solution: `Le nombre $${b}$ est exclu de $I$ et de $J$ : la réunion a un trou en $${b}$. On ne peut pas l'écrire avec un seul intervalle :\n\n$I \\cup J = ${bonne}$`
        };
      }
      autres = [{ a, b: d, ga: !I.ga, gb: J.gb }, { a, b: d, ga: I.ga, gb: !J.gb }, { a: b, b: d, ga: true, gb: J.gb }];
      expl = `Le nombre $${b}$ est dans ${gb && gc ? "les deux intervalles" : gb ? "$I$" : "$J$"} : la réunion n'a pas de trou.`;
    } else {
      // I = [a ; b] et J = [c ; d] avec a < c < b < d (ils se chevauchent)
      const a = rand(-8, 0), c = a + rand(1, 4), b = c + rand(1, 4), d = b + rand(1, 4);
      const inf = Math.random() < 0.3;
      I = { a: inf ? -Infinity : a, b, ga: inf ? false : Math.random() < 0.5, gb: Math.random() < 0.5, label: "I" };
      J = { a: c, b: d, ga: Math.random() < 0.5, gb: Math.random() < 0.5, label: "J" };
      R = inter ? { a: c, b, ga: J.ga, gb: I.gb } : { a: I.a, b: d, ga: I.ga, gb: J.gb };
      const autre = inter ? { a: I.a, b: d, ga: I.ga, gb: J.gb } : { a: c, b, ga: J.ga, gb: I.gb };
      autres = [autre, Object.assign({}, R, { ga: !R.ga && isFinite(R.a) }), Object.assign({}, R, { gb: !R.gb }), { a: R.a, b: R.b, ga: inter ? I.ga && isFinite(I.a) : J.ga, gb: inter ? J.gb : I.gb }];
      expl = `${inter ? "Partie commune" : "Tout ce qui est colorié"} : de $${bTex(R.a)}$ à $${bTex(R.b)}$. La borne $${bTex(R.b)}$ vient de ${inter ? "$I$" : "$J$"}${isFinite(R.a) ? `, la borne $${bTex(R.a)}$ vient de ${inter ? "$J$" : "$I$"}` : ""} : on garde leurs crochets.`;
    }
    const c4 = choixIntervalles(R, autres.concat([J, I]), (K) => `$${intTex(K)}$`);
    const gauche = isFinite(I.a) ? I.a : J.a - 4;
    return {
      enonce: `On donne $I = ${intTex(I)}$ et $J = ${intTex(J)}$. Détermine $I ${op} J$.`,
      figure: droite({ min: Math.min(gauche, J.a) - 1, max: Math.max(I.b, J.b) + 1, intervalles: [I, J], aria: "Droite graduée avec les intervalles I et J" }),
      mode: "choix", choix: c4.choix, attendu: c4.attendu,
      aides: [
        inter ? "$I \\cap J$ (« I **inter** J ») : les nombres qui sont **à la fois** dans $I$ et dans $J$. C'est la partie commune." : "$I \\cup J$ (« I **union** J ») : les nombres qui sont dans $I$ **ou** dans $J$ (au moins l'un des deux). C'est tout ce qui est colorié.",
        `Sur la droite graduée, le résultat va de $${bTex(R.a)}$ à $${bTex(R.b)}$.`,
        "Pour chaque borne, regarde de quel intervalle elle vient et garde son crochet."
      ],
      solution: `${expl}\n\n$I ${op} J = ${intTex(R)}$`
    };
  };

  /* Valeur absolue et distance */
  const ABS_ROUTE = [["Bandrélé", -21], ["Dembéni", -11], ["Kawéni", 3], ["Koungou", 7], ["Longoni", 14], ["Dzoumogné", 19]];
  GEN["abs-distance"] = function () {
    const t = rand(0, 4);
    if (t === 0) {
      const x = Math.random() < 0.5 ? -rand(1, 12) : -rand(11, 99) / 10;
      return {
        enonce: `Calcule $${ensVa(nb(x))}$, la distance entre $${nb(x)}$ et $0$.`,
        figure: droite({ min: Math.floor(x) - 1, max: 1, points: [{ x, label: "M" }, { x: 0, label: "O" }], fleches: [{ a: x, b: 0, label: "?", double: true }], aria: `Droite graduée : le point M d'abscisse ${ensNum(x)} et l'origine O ; la distance OM est à trouver` }),
        mode: "nombre", prefixe: `$${ensVa(nb(x))} =$`, attendu: -x,
        erreurs: ensErr(-x, [{ valeur: x, message: "Une valeur absolue est une **distance** : elle n'est jamais négative." }, { valeur: Math.round(-x), message: "Garde tous les chiffres : la valeur absolue enlève seulement le signe." }]),
        aides: ["$|x|$ est la distance entre $x$ et $0$ sur la droite graduée.", "Une distance n'est jamais négative.", "Pour un nombre négatif, $|x| = -x$ : on enlève le signe moins."],
        solution: `$${nb(x)}$ est négatif, donc $${ensVa(nb(x))} = -(${nb(x)}) = ${nb(-x)}$ : le point $M$ est à $${nb(-x)}$ unités de $0$.`
      };
    }
    if (t === 3) {
      const [[A, a], [B, b]] = shuffle(ABS_ROUTE).slice(0, 2), d = Math.abs(a - b), e = Math.max(a, b, 0) - Math.min(a, b, 0) + 4, p = e > 24 ? 5 : e > 12 ? 2 : 1;
      return {
        enonce: `Sur la route qui longe la côte est, on repère chaque village par son abscisse, en km : l'origine est Mamoudzou et le sens positif va vers le nord. ${A} a pour abscisse $${a}$ et ${B} a pour abscisse $${b}$. Quelle distance, en km, sépare ${A} de ${B} sur cet axe ?`,
        figure: droite({ min: Math.min(a, b, 0) - 2, max: Math.max(a, b, 0) + 2, pas: p, points: [{ x: a, label: A }, { x: b, label: B }, { x: 0, label: "M" }], fleches: [{ a, b, label: "?", double: true }], aria: `Axe gradué en km le long de la route : ${A} en ${ensNum(a)}, ${B} en ${ensNum(b)}, Mamoudzou (M) à l'origine ; la distance est à trouver` }),
        mode: "nombre", prefixe: "Distance :", suffixe: "km", attendu: d,
        erreurs: ensErr(d, [{ valeur: a - b, message: "Une distance n'est jamais négative : pense à la valeur absolue." }, { valeur: Math.abs(a + b), message: `Attention au signe : on calcule $${ensVa(`${a} - ${par(b)}`)}$, pas $${ensVa(`${a} + ${par(b)}`)}$.` }]),
        aides: [`La distance entre deux nombres $a$ et $b$ est $|a - b|$.`, `Ici : $${ensVa(`${a} - ${par(b)}`)}$.`, `$${a} - ${par(b)} = ${a - b}$.`],
        solution: `$${ensVa(`${a} - ${par(b)}`)} = ${ensVa(a - b)} = ${d}$ : ${A} et ${B} sont à $${d}$ km l'un de l'autre sur cet axe.`
      };
    }
    if (t === 4) {
      const prof = rand(3, 30), [quoi, nom, haut] = pick([["une frégate survole le lagon", "la frégate", rand(10, 60)], ["le sommet du mont Choungui culmine", "ce sommet", 594], ["le sommet du mont Bénara culmine", "ce sommet", 660], ["un maki grimpe en haut d'un cocotier de N'Gouja", "le maki", rand(10, 20)]]), d = haut + prof;
      return {
        enonce: `On repère les altitudes en mètres, avec $0$ au niveau de la mer. Une tortue nage à l'altitude $-${prof}$ dans le lagon, et ${quoi} à l'altitude $${haut}$. Quelle est la distance verticale, en mètres, entre la tortue et ${nom} ?`,
        mode: "nombre", prefixe: "Distance :", suffixe: "m", attendu: d,
        erreurs: ensErr(d, [{ valeur: haut - prof, message: `Attention au signe : on calcule $|${haut} - (-${prof})| = |${haut} + ${prof}|$.` }, { valeur: -prof - haut, message: "Une distance n'est jamais négative : pense à la valeur absolue." }]),
        aides: ["La distance entre deux nombres $a$ et $b$ est $|a - b|$.", `Ici : $|${haut} - (-${prof})|$.`, `Retrancher un nombre négatif, c'est ajouter son opposé : $${haut} + ${prof}$.`],
        solution: `$|${haut} - (-${prof})| = |${haut} + ${prof}| = ${d}$ : il y a $${d}$ m entre la tortue et ${nom}.`
      };
    }
    let a = rand(-9, 9), b; do { b = rand(-9, 9); } while (b === a);
    const d = Math.abs(a - b);
    const erreurs = ensErr(d, [{ valeur: a - b, message: "Une distance n'est jamais négative : pense à la valeur absolue." }, { valeur: Math.abs(a + b), message: `Attention au signe : $${a} - ${par(b)}$, ce n'est pas $${a} + ${par(b)}$.` }]);
    const q = {
      enonce: t === 1 ? `Calcule $${ensVa(`${a} - ${par(b)}`)}$.` : `Sur la droite graduée, le point $A$ a pour abscisse $${a}$ et le point $B$ a pour abscisse $${b}$. Quelle est la distance $AB$ ?`,
      mode: "nombre", prefixe: t === 1 ? "Résultat :" : "$AB =$", attendu: d, erreurs,
      aides: [
        t === 1 ? "Calcule d'abord ce qu'il y a entre les barres." : `La distance entre $a$ et $b$ est $|a - b|$ : ici $${ensVa(`${a} - ${par(b)}`)}$.`,
        `$${a} - ${par(b)} = ${a - b}$.`,
        "Une valeur absolue est une distance : le résultat est toujours positif."
      ],
      solution: `$${ensVa(`${a} - ${par(b)}`)} = ${ensVa(a - b)} = ${d}$.` + (t === 2 ? ` Les points $A$ et $B$ sont à une distance de $${d}$ l'un de l'autre.` : "")
    };
    if (t === 2) q.figure = droite({ min: Math.min(a, b) - 1, max: Math.max(a, b) + 1, points: [{ x: a, label: "A" }, { x: b, label: "B" }], fleches: [{ a, b, label: "?", double: true }], aria: `Droite graduée : A d'abscisse ${ensNum(a)} et B d'abscisse ${ensNum(b)} ; la distance AB est à trouver` });
    return q;
  };

  /* |x − a| ⩽ r et intervalle de centre a et de rayon r */
  const ABS_CTX = [
    () => ({ v: "m", quoi: "La masse $m$, en kg, d'un sac de riz vendu à Koungou", a: 25, r: pick([0.5, 1]) }),
    () => ({ v: "t", quoi: "La durée $t$, en minutes, de la traversée en barge", a: 20, r: pick([3, 4, 5]) }),
    () => ({ v: "T", quoi: "La température $T$ de l'eau à N'Gouja, en °C", a: rand(26, 28), r: pick([1, 2]) }),
    () => ({ v: "L", quoi: "La longueur $L$, en cm, d'une tortue verte adulte mesurée par l'association", a: 10 * rand(9, 11), r: pick([10, 15, 20]) }),
    () => ({ v: "h", quoi: "La hauteur $h$, en mètres, d'un cocotier de Sada", a: rand(12, 18), r: pick([2, 3]) })
  ];
  GEN["abs-intervalle"] = function () {
    const t = Math.random();
    if (t < 0.3) {
      const a = Math.random() < 0.8 ? randNZ(-6, 6) : pick([-2.5, -1.5, 1.5, 2.5, 3.5]), r = rand(1, 5), large = Math.random() < 0.6, op = large ? "\\leqslant" : "<";
      const I = { a: a - r, b: a + r, ga: large, gb: large }, absT = (c) => `|x ${c < 0 ? "+" : "-"} ${nb(Math.abs(c))}|`;
      const fx = (c, rr, o) => `$${absT(c)} ${o} ${nb(rr)}$`;
      const c4 = melangeChoix(fx(a, r, op), [fx(-a, r, op), fx(r, Math.abs(a) || 1, op), fx(a, r, large ? "<" : "\\leqslant"), fx(a, 2 * r, op)]);
      return {
        enonce: `On a représenté un intervalle sur la droite graduée. Il est formé des réels $x$ tels que :`,
        figure: droite({ min: Math.floor(a - r) - 2, max: Math.ceil(a + r) + 2, sub: Number.isInteger(a) ? 1 : 2, intervalles: [I], aria: `Droite graduée : l'intervalle ${large ? "[" : "]"}${ensNum(a - r)} ; ${ensNum(a + r)}${large ? "]" : "["}` }),
        figureSolution: droite({ min: Math.floor(a - r) - 2, max: Math.ceil(a + r) + 2, sub: Number.isInteger(a) ? 1 : 2, intervalles: [I], points: [{ x: a, label: ensNum(a) }], fleches: [{ a, b: a - r, label: ensNum(r), n: 0 }, { a, b: a + r, label: ensNum(r), n: 0 }], aria: `Droite graduée : l'intervalle a pour centre ${ensNum(a)} et pour rayon ${ensNum(r)}` }),
        mode: "choix", choix: c4.choix, attendu: c4.attendu,
        aides: ["Le **centre** est le milieu des deux bornes, le **rayon** est la distance du centre à une borne.", `Centre : $\\dfrac{${nb(a - r)} + ${par(nb(a + r))}}{2} = ${nb(a)}$.`, `Rayon : $${nb(a + r)} - ${par(nb(a))} = ${nb(r)}$. Puis regarde si les bornes sont incluses.`],
        solution: `Le centre est $\\dfrac{${nb(a - r)} + ${par(nb(a + r))}}{2} = ${nb(a)}$ et le rayon vaut $${nb(r)}$. Les bornes sont ${large ? "incluses" : "exclues"} : l'intervalle est formé des réels à une distance ${large ? "au plus" : "strictement inférieure à"} $${nb(r)}$ de $${nb(a)}$.\n\nCe sont les réels tels que $${absT(a)} ${op} ${nb(r)}$.`
      };
    }
    if (t < 0.5) {
      const C = pick(ABS_CTX)(), large = Math.random() < 0.6, op = large ? "\\leqslant" : "<", R = { a: C.a - C.r, b: C.a + C.r, ga: large, gb: large };
      const c4 = choixIntervalles(R, [{ a: R.a, b: R.b, ga: !large, gb: !large }, { a: C.a, b: C.a + C.r, ga: large, gb: large }, { a: C.a - 2 * C.r, b: C.a + 2 * C.r, ga: large, gb: large }], (K) => `$${C.v} \\in ${intTex(K)}$`);
      return {
        enonce: `${C.quoi} vérifie $|${C.v} - ${nb(C.a)}| ${op} ${nb(C.r)}$. Traduis cette information par un intervalle.`,
        mode: "choix", choix: c4.choix, attendu: c4.attendu,
        aides: [`$|${C.v} - ${nb(C.a)}|$ est la distance entre $${C.v}$ et $${nb(C.a)}$.`, `On part de $${nb(C.a)}$ et on va de $${nb(C.r)}$ de chaque côté.`, large ? "L'inégalité est large : les bornes sont incluses." : "L'inégalité est stricte : les bornes sont exclues."],
        solution: `$|${C.v} - ${nb(C.a)}| ${op} ${nb(C.r)} \\iff ${nb(C.a - C.r)} ${op} ${C.v} ${op} ${nb(C.a + C.r)} \\iff ${C.v} \\in ${intTex(R)}$`
      };
    }
    const a = randNZ(-6, 6), r = Math.random() < 0.85 ? rand(1, 5) : pick([0.5, 1.5, 2.5]), large = Math.random() < 0.6, phrase = Math.random() < 0.25;
    const abs = `|x ${sg(-a)}|`, op = large ? "\\leqslant" : "<";
    const R = { a: a - r, b: a + r, ga: large, gb: large };
    const c = choixIntervalles(R, [{ a: a - r, b: a + r, ga: !large, gb: !large }, { a: -a - r, b: -a + r, ga: large, gb: large }, { a, b: a + r, ga: large, gb: large }], (K) => `$${intTex(K)}$`);
    return {
      enonce: phrase ? `Traduis par un intervalle : « $x$ est à une distance ${large ? "inférieure ou égale" : "strictement inférieure"} à $${nb(r)}$ de $${a}$ ».` : `Traduis par un intervalle : $${abs} ${op} ${nb(r)}$.`,
      mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: [
        phrase ? `La distance entre $x$ et $${a}$ s'écrit $|x - ${par(a)}|$ : c'est l'intervalle de centre $${a}$ et de rayon $${nb(r)}$.` : `$|x - a|$ est la distance entre $x$ et $a$. Écris $${abs}$ sous la forme $|x - a|$ : ici $a = ${a}$.`,
        `On cherche les nombres $x$ à une distance ${large ? "inférieure ou égale" : "strictement inférieure"} à $${nb(r)}$ de $${a}$.`,
        `On part de $${a}$ et on va de $${nb(r)}$ à gauche et de $${nb(r)}$ à droite : de $${nb(a - r)}$ à $${nb(a + r)}$.`
      ],
      solution: `${phrase ? "" : a < 0 ? `$${abs} = |x - ${par(a)}|$ : c'est la distance entre $x$ et $${a}$.\n\n` : `$${abs}$ est la distance entre $x$ et $${a}$.\n\n`}$|x - ${par(a)}| ${op} ${nb(r)} \\iff ${nb(a - r)} ${op} x ${op} ${nb(a + r)} \\iff x \\in ${intTex(R)}$`
    };
  };

  /* ---------- Automatismes de géométrie (programme de Seconde 2026) ---------- */
  // Polygone régulier à n côtés, un côté horizontal en bas (marqué lab), codage des côtés égaux
  function amPolyReg(n, lab, aria) {
    const R = 78, cx = 160, cy = 98, a0 = Math.PI / 2 + Math.PI / n, P = Array.from({ length: n }, (_, k) => [cx + R * Math.cos(a0 + (2 * Math.PI * k) / n), cy + R * Math.sin(a0 + (2 * Math.PI * k) / n)]);
    let s = `<svg class="graph" viewBox="0 0 320 200" role="img" aria-label="${aria}"><polygon class="g-poly" points="${P.map((p) => amF(p[0]) + "," + amF(p[1])).join(" ")}"/>`;
    P.forEach((p, k) => { const q = P[(k + 1) % n], m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2], d = Math.hypot(q[0] - p[0], q[1] - p[1]), u = [(q[1] - p[1]) / d, (p[0] - q[0]) / d]; s += `<line class="g-code" x1="${amF(m[0] - 5 * u[0])}" y1="${amF(m[1] - 5 * u[1])}" x2="${amF(m[0] + 5 * u[0])}" y2="${amF(m[1] + 5 * u[1])}"/>`; });
    const b = P.reduce((m, p) => Math.max(m, p[1]), 0);
    return s + amTxt(cx, b + 18, lab, "g-mesure") + `</svg>`;
  }

  /* Repérage sur une droite graduée : lire une abscisse, ou trouver le point d'abscisse donnée */
  GEN["am-repere-droite"] = function () {
    const [pas, q] = pick([[1, 1], [1, 5], [0.5, 2], [0.5, 2], [0.25, 4], [0.1, 5], [0.1, 10], [2, 5], [2, 1], [5, 2], [5, 4], [10, 5], [10, 2]]);
    const n = rand(10, 13), k0 = -rand(1, n - q - 1), min = +(k0 * pas).toFixed(6), max = +((k0 + n) * pas).toFixed(6), E = +(q * pas).toFixed(6);
    const libres = []; for (let k = k0 + 1; k < k0 + n; k++) if (k !== 0 && k !== q) libres.push(k);
    const aria = `Droite graduée : une graduation tous les ${amT(pas)}, seuls ${amT(0)} et ${amT(E)} sont écrits`;
    const aides0 = [`Repère $0$ et $${nb(E)}$ : entre les deux, il y a $${q}$ intervalle${q > 1 ? "s" : ""}.`, `Une graduation vaut donc $${nb(E)} \\div ${q} = ${nb(pas)}$.`];
    if (Math.random() < 0.6) {
      const k = pick(libres), x = +(k * pas).toFixed(6);
      return {
        enonce: pick(["Quelle est l'abscisse du point $A$ sur cette droite graduée ?", "Lis l'abscisse du point $A$ sur cette droite graduée.", "Sur la droite graduée, quel nombre repère le point $A$ ?"]),
        figure: amDroite({ min, max, pas, etiq: [0, E], points: [{ x, label: "A" }], aria: aria + ", et un point A" }),
        mode: "nombre", prefixe: "A :", attendu: x,
        erreurs: amErr([[-x, "Attention au signe : à gauche de $0$, les abscisses sont négatives ; à droite, elles sont positives."], pas !== 1 ? [k, `Tu as compté les graduations, mais une graduation ne vaut pas $1$ : elle vaut $${nb(pas)}$.`] : null, [+(x + pas).toFixed(6), "Compte à nouveau les graduations entre $0$ et $A$ : tu es décalé d'une graduation."], [+(x - pas).toFixed(6), "Compte à nouveau les graduations entre $0$ et $A$ : tu es décalé d'une graduation."]].filter(Boolean)),
        aides: aides0.concat([`$A$ est à $${Math.abs(k)}$ graduation${Math.abs(k) > 1 ? "s" : ""} ${k < 0 ? "à gauche" : "à droite"} de $0$.`]),
        solution: `Une graduation vaut $${nb(pas)}$. $A$ est à $${Math.abs(k)}$ graduation${Math.abs(k) > 1 ? "s" : ""} ${k < 0 ? "à gauche" : "à droite"} de $0$ : son abscisse est $${k < 0 ? "-" : ""}${Math.abs(k)} \\times ${nb(pas)} = ${nb(x)}$.`
      };
    }
    const ks = shuffle(libres).slice(0, 4), noms = ["A", "B", "C", "D"], j = rand(0, 3), x = +(ks[j] * pas).toFixed(6);
    return {
      enonce: `Quel point a pour abscisse $${nb(x)}$ ?`,
      figure: amDroite({ min, max, pas, etiq: [0, E], points: ks.map((k, i) => ({ x: k * pas, label: noms[i] })), aria: aria + ", et quatre points A, B, C et D" }),
      mode: "choix", choix: noms.map((t) => `Le point $${t}$`), attendu: j,
      aides: aides0.concat([`$${nb(x)} = ${ks[j] < 0 ? "-" : ""}${Math.abs(ks[j])} \\times ${nb(pas)}$ : compte $${Math.abs(ks[j])}$ graduation${Math.abs(ks[j]) > 1 ? "s" : ""} ${x < 0 ? "à gauche" : "à droite"} de $0$.`]),
      solution: `Une graduation vaut $${nb(pas)}$. Le point d'abscisse $${nb(x)}$ est à $${Math.abs(ks[j])}$ graduation${Math.abs(ks[j]) > 1 ? "s" : ""} ${x < 0 ? "à gauche" : "à droite"} de $0$ : c'est le point $${noms[j]}$.`
    };
  };

  /* Repère du plan : lire les coordonnées d'un point, ou trouver le point de coordonnées données */
  GEN["am-coordonnees"] = function () {
    const L = pick([4, 5, 6]), c = (a, b) => `$(${a}\\,;${b})$`;
    let x, y; do { x = rand(-L, L); y = rand(-L, L); } while (Math.abs(x) === Math.abs(y));
    const o = { xmin: -L - 1.2, xmax: L + 1.2, ymin: -L - 1.2, ymax: L + 1.2 };
    const aides = ["Les coordonnées s'écrivent $(x\\,;y)$ : d'abord l'abscisse (axe horizontal), puis l'ordonnée (axe vertical).", `Abscisse : $${x}$, ${x > 0 ? "à droite de" : x < 0 ? "à gauche de" : "sur"} l'axe vertical.`, `Ordonnée : $${y}$, ${y > 0 ? "au-dessus de" : y < 0 ? "en dessous de" : "sur"} l'axe horizontal.`];
    if (Math.random() < 0.5) {
      const ms = melangeChoix(c(x, y), [c(y, x), c(-x, y), c(x, -y), c(-y, -x), c(-x, -y)]);
      return {
        enonce: pick(["Quelles sont les coordonnées du point $A$ ?", "Lis les coordonnées du point $A$ dans ce repère."]),
        figure: graph(Object.assign(o, { points: [{ x, y, label: "A", gauche: x < 0 }], aria: "Point A dans un repère quadrillé" })),
        mode: "choix", choix: ms.choix, attendu: ms.attendu, aides,
        solution: `$A$ a pour abscisse $${x}$ et pour ordonnée $${y}$ : $A${c(x, y).slice(1, -1)}$.`
      };
    }
    const cand = [[y, x], [-x, y], [x, -y], [-x, -y], [-y, x]].filter((p, k, t) => !(p[0] === x && p[1] === y) && t.findIndex((u) => u[0] === p[0] && u[1] === p[1]) === k);
    const pts = shuffle([[x, y]].concat(shuffle(cand).slice(0, 3))), noms = ["A", "B", "C", "D"], j = pts.findIndex((p) => p[0] === x && p[1] === y);
    return {
      enonce: `Quel point a pour coordonnées ${c(x, y)} ?`,
      figure: graph(Object.assign(o, { points: pts.map((p, i) => ({ x: p[0], y: p[1], label: noms[i], gauche: p[0] < 0 })), aria: "Quatre points A, B, C et D dans un repère quadrillé" })),
      mode: "choix", choix: noms.map((t) => `Le point $${t}$`), attendu: j, aides,
      solution: `On part de l'origine, on se déplace de $${x}$ horizontalement puis de $${y}$ verticalement : on arrive au point $${noms[j]}$.`
    };
  };

  /* Périmètres : polygones et cercles (longueur exacte en π) */
  GEN["am-perimetre"] = function () {
    const u = pick(["cm", "cm", "m", "dm"]), t = rand(0, 5), P = "$\\pi$";
    let q, rep, suf = u, regle, calc, fig, err = [], pi = false;
    if (t === 0) {
      const ctx = Math.random() < 0.35, L = ctx ? pick([12, 15, 20, 25, 30, 40]) : rand(4, 15), l = ctx ? pick([6, 8, 10, 12]) : rand(2, L - 1), uu = ctx ? "m" : u; suf = uu;
      q = ctx ? `la longueur de grillage nécessaire pour clôturer un enclos rectangulaire de $${L}$ m sur $${l}$ m pour des zébus, à Chirongui` : `le périmètre d'un rectangle de longueur $${L}$ ${u} et de largeur $${l}$ ${u}`;
      rep = 2 * (L + l); calc = `2 \\times (${L} + ${l})`; regle = "Périmètre d'un rectangle : $2 \\times (L + \\ell)$.";
      fig = amForme("rect", [L, l], [`${L} ${uu}`, `${l} ${uu}`], `Rectangle de ${L} ${uu} sur ${l} ${uu}`);
      err = [[L * l, "Ça, c'est l'**aire**. Le périmètre est la longueur du tour de la figure."], [L + l, "Ça, c'est la moitié du tour : il y a deux longueurs et deux largeurs."]];
    } else if (t === 1) {
      const c = rand(3, 15); q = `le périmètre d'un carré de côté $${c}$ ${u}`; rep = 4 * c; calc = `4 \\times ${c}`; regle = "Périmètre d'un carré : $4 \\times c$.";
      fig = amForme("carre", [c], [`${c} ${u}`], `Carré de côté ${c} ${u}`);
      err = [[c * c, "Ça, c'est l'**aire**. Le périmètre est la longueur du tour : $4 \\times c$."], [2 * c, "Un carré a quatre côtés."]];
    } else if (t === 2) {
      let a, b, d; do { a = rand(4, 12); b = rand(3, 11); d = rand(3, 11); } while (a >= b + d || b >= a + d || d >= a + b || Math.max(a, b, d) - Math.min(a, b, d) > 7);
      q = `le périmètre d'un triangle dont les côtés mesurent $${a}$ ${u}, $${b}$ ${u} et $${d}$ ${u}`; rep = a + b + d; calc = `${a} + ${b} + ${d}`; regle = "Périmètre d'un polygone : la somme des longueurs de ses côtés.";
      fig = amForme("tri3", [a, b, d], [`${a} ${u}`, `${b} ${u}`, `${d} ${u}`], `Triangle de côtés ${a} ${u}, ${b} ${u} et ${d} ${u}`);
      err = [[a * b * d, "On additionne les longueurs des côtés, on ne les multiplie pas."]];
    } else if (t === 3) {
      const r = rand(2, 12); pi = true; suf = `${P} ${u}`;
      q = Math.random() < 0.3 ? `la longueur du tour d'un rond-point circulaire de rayon $${r}$ m, à Dembéni` : `la longueur d'un cercle de rayon $${r}$ ${u}`; if (q.includes("rond-point")) suf = `${P} m`;
      rep = 2 * r; calc = `2 \\times \\pi \\times ${r}`; regle = "Longueur d'un cercle de rayon $r$ : $2\\pi r$.";
      fig = amForme("cercle", [r], [`r = ${r} ${suf.slice(-2).trim()}`], `Cercle de rayon ${r}`);
      err = [[r * r, "Ça, c'est le nombre de l'**aire** du disque ($\\pi r^2$). La longueur du cercle est $2\\pi r$."], [r, "N'oublie pas le $2$ : la longueur du cercle est $2\\pi r$."], [4 * r, "Tu as utilisé $2\\pi \\times$ le diamètre : c'est $2\\pi r$ avec le rayon, ou $\\pi d$ avec le diamètre."]];
    } else if (t === 4) {
      const d = 2 * rand(2, 10); pi = true; suf = `${P} ${u}`;
      q = `la longueur d'un cercle de diamètre $${d}$ ${u}`; rep = d; calc = `\\pi \\times ${d}`; regle = "Longueur d'un cercle de diamètre $d$ : $\\pi d$ (c'est aussi $2\\pi r$).";
      fig = amForme("cercle", [d / 2, true], [`d = ${d} ${u}`], `Cercle de diamètre ${d} ${u}`);
      err = [[2 * d, "Le diamètre vaut déjà $2r$ : la longueur est $\\pi d$, et non $2\\pi d$."], [(d * d) / 4, "Ça, c'est le nombre de l'aire du disque. La longueur du cercle est $\\pi d$."]];
    } else {
      const [n, nom] = pick([[3, "triangle équilatéral"], [4, "losange"], [5, "pentagone régulier"], [6, "hexagone régulier"], [8, "octogone régulier"]]), c = rand(2, 12);
      q = `le périmètre d'un ${nom} de côté $${c}$ ${u}`; rep = n * c; calc = `${n} \\times ${c}`; regle = `Un ${nom} a $${n}$ côtés de même longueur : son périmètre vaut $${n} \\times c$.`;
      fig = amPolyReg(n, `${c} ${u}`, `${nom[0].toUpperCase() + nom.slice(1)} de côté ${c} ${u}`);
      err = [[c * c, "Ça ressemble à une aire. Le périmètre est la somme des longueurs des côtés."], [(n - 1) * c, `Compte bien les côtés : il y en a $${n}$.`]];
    }
    return {
      enonce: `Calcule ${q}.${pi ? " Donne la valeur exacte : écris le nombre qui multiplie $\\pi$." : ""}`,
      figure: fig, mode: "nombre", prefixe: "Réponse :", suffixe: suf, attendu: rep, erreurs: amErr(err),
      aides: [regle, "Le périmètre est la longueur du tour : on additionne des longueurs.", `Calcule $${calc}$.`],
      solution: `${regle}\n\nIci : $${calc} = ${nb(rep)}${pi ? "\\pi" : ""}$ ${suf.replace(P + " ", "")}.`
    };
  };

  // Configuration de Thalès à l'échelle : A en haut, B et C en bas, M sur [AB] et N sur [AC] avec AM = r × AB ; T = textes posés sur les côtés
  function amThalesFig(ab, ac, bc, r, T, aria) {
    const xA = (ab * ab - ac * ac + bc * bc) / (2 * bc), yA = Math.sqrt(Math.max(ab * ab - xA * xA, 1e-6)), xm = Math.min(0, xA), xM = Math.max(bc, xA), k = Math.min(180 / (xM - xm), 150 / yA);
    const Pt = (x, y) => [160 + (x - (xm + xM) / 2) * k, 186 - y * k], B = Pt(0, 0), C = Pt(bc, 0), A = Pt(xA, yA);
    const M = [A[0] + (B[0] - A[0]) * r, A[1] + (B[1] - A[1]) * r], N = [A[0] + (C[0] - A[0]) * r, A[1] + (C[1] - A[1]) * r], G = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
    let s = `<svg class="graph" viewBox="0 0 320 214" role="img" aria-label="${aria}"><polygon class="g-poly" points="${[A, B, C].map((p) => amF(p[0]) + "," + amF(p[1])).join(" ")}"/>`;
    s += `<line class="g-curve g-curve-1" x1="${amF(M[0])}" y1="${amF(M[1])}" x2="${amF(N[0])}" y2="${amF(N[1])}"/>`;
    [[A, "A", 0, -8], [B, "B", -8, 14], [C, "C", 8, 14], [M, "M", -11, 3], [N, "N", 11, 3]].forEach(([p, t, dx, dy]) => { s += `<circle class="g-point" cx="${amF(p[0])}" cy="${amF(p[1])}" r="3"/>` + amTxt(p[0] + dx, p[1] + dy, t, "g-plabel"); });
    const cote = (P, Q, t, dx) => (t ? amTxt((P[0] + Q[0]) / 2 + dx, (P[1] + Q[1]) / 2 + 4, t, "g-mesure", dx < 0 ? "end" : "start") : "");
    s += cote(A, M, T.AM, -10) + cote(M, B, T.AB, -10) + cote(A, N, T.AN, 10) + cote(N, C, T.AC, 10) + amCote(B, C, G, T.BC, 12);
    if (T.MN) s += amTxt((M[0] + N[0]) / 2, (M[1] + N[1]) / 2 + 16, T.MN, "g-mesure");
    return s + `</svg>`;
  }

  /* Thalès : longueurs dans un triangle coupé par une parallèle, et l'ombre d'un cocotier */
  GEN["am-thales"] = function () {
    const t = rand(0, 5);
    if (t === 5) {
      // Ombres : le bâton [MN] et le cocotier [BC] sont verticaux, donc parallèles
      const k = pick([4, 5, 6, 8, 10]), h1 = pick([1, 1.2, 1.5, 2]), s1 = pick([0.5, 0.8, 1, 1.2, 1.5, 2]), s2 = +(s1 * k).toFixed(6), h2 = +(h1 * k).toFixed(6);
      const W = 250 / s2, H = Math.min(150 / h2, W), X = (x) => amF(30 + x * W), Y = (y) => amF(186 - y * H);
      let fig = `<svg class="graph" viewBox="0 0 320 214" role="img" aria-label="Ombre d'un bâton et ombre d'un cocotier : le rayon de soleil passe par le haut du bâton et le haut du cocotier"><line class="g-segment" x1="14" y1="186" x2="306" y2="186"/>`;
      fig += `<line class="g-curve g-curve-1" x1="${X(0)}" y1="${Y(0)}" x2="${X(s2)}" y2="${Y(h2)}" style="stroke-dasharray:6 4;stroke-width:2"/><line class="g-curve" x1="${X(s2)}" y1="${Y(0)}" x2="${X(s2)}" y2="${Y(h2)}"/><line class="g-curve" x1="${X(s1)}" y1="${Y(0)}" x2="${X(s1)}" y2="${Y(h1)}"/>`;
      fig += amTxt(X(s1 / 2), 202, `${amT(s1)} m`, "g-mesure") + amTxt(X(s2) - 8, Y(h2 / 2), "?", "g-mesure", "end") + amTxt(X(s1) + 6, Y(h1 / 2) + 4, `${amT(h1)} m`, "g-mesure", "start") + amTxt(X(s2 / 2) + 30, 202, `${amT(s2)} m`, "g-mesure") + amTxt(X(s2), Y(h2) - 6, "cocotier", "g-label") + `</svg>`;
      return {
        enonce: `À Sada, à la même heure, un bâton vertical de $${nb(h1)}$ m a une ombre de $${nb(s1)}$ m, et un cocotier a une ombre de $${nb(s2)}$ m. Les rayons du soleil sont parallèles. Quelle est la hauteur du cocotier ?`,
        figure: fig, mode: "nombre", prefixe: "Hauteur :", suffixe: "m", attendu: h2,
        erreurs: amErr([[+((s2 * s1) / h1).toFixed(6), "Le rapport est inversé : le cocotier est bien plus haut que le bâton."], [+(h1 + s2 - s1).toFixed(6), "Thalès donne des rapports égaux : on multiplie par le coefficient, on n'ajoute pas."]]),
        aides: ["Le bâton et le cocotier sont verticaux, donc parallèles : c'est une configuration de Thalès.", `Les longueurs sont proportionnelles : $\\dfrac{\\text{hauteur du cocotier}}{${nb(h1)}} = \\dfrac{${nb(s2)}}{${nb(s1)}}$.`, `L'ombre du cocotier est $${k}$ fois plus longue que celle du bâton.`],
        solution: `$\\dfrac{${nb(s2)}}{${nb(s1)}} = ${k}$ : tout est $${k}$ fois plus grand. Hauteur du cocotier $= ${k} \\times ${nb(h1)} = ${nb(h2)}$ m.`
      };
    }
    // triangle bien formé (angles entre 35° et 110°) pour une figure lisible et à l'échelle
    const angle = (a, b, c) => (Math.acos((b * b + c * c - a * a) / (2 * b * c)) * 180) / Math.PI;
    let k, am, mn, an, ab, bc, ac, essais = 0;
    do {
      k = pick([2, 3, 1.5, 2.5]);
      do { am = rand(2, 8); } while (!Number.isInteger(am * k) || am * k > 24);
      do { mn = rand(2, 9); } while (!Number.isInteger(mn * k) || mn * k > 27);
      do { an = rand(2, 8); } while (!Number.isInteger(an * k) || an * k > 24 || an === am);
      ab = am * k; bc = mn * k; ac = an * k; essais++;
    } while (essais < 200 && (ab >= ac + bc || ac >= ab + bc || bc >= ab + ac || [angle(bc, ab, ac), angle(ac, ab, bc), angle(ab, ac, bc)].some((x) => !(x >= 35 && x <= 110))));
    const r = 1 / k;
    const rapport = "\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}", hyp = "$(MN) \\parallel (BC)$, avec $M \\in [AB]$ et $N \\in [AC]$";
    const L = (n, v) => `${n} = ${v === "?" ? "?" : amT(v)}`;
    const d = ab - am, cas = [
      ["BC", bc, `$AM = ${nb(am)}$, $AB = ${nb(ab)}$ et $MN = ${nb(mn)}$`, { AM: L("AM", am), AB: L("AB", ab), MN: L("MN", mn), BC: L("BC", "?") }, `\\dfrac{${nb(am)}}{${nb(ab)}} = \\dfrac{${nb(mn)}}{BC}`, `BC = \\dfrac{${nb(mn)} \\times ${nb(ab)}}{${nb(am)}}`, (mn * am) / ab, "Le rapport est inversé : $BC$ est plus grand que $MN$.", mn + d],
      ["MN", mn, `$AM = ${nb(am)}$, $AB = ${nb(ab)}$ et $BC = ${nb(bc)}$`, { AM: L("AM", am), AB: L("AB", ab), MN: L("MN", "?"), BC: L("BC", bc) }, `\\dfrac{${nb(am)}}{${nb(ab)}} = \\dfrac{MN}{${nb(bc)}}`, `MN = \\dfrac{${nb(am)} \\times ${nb(bc)}}{${nb(ab)}}`, (bc * ab) / am, "Le rapport est inversé : $MN$ est plus petit que $BC$.", bc - d],
      ["AN", an, `$AM = ${nb(am)}$, $AB = ${nb(ab)}$ et $AC = ${nb(ac)}$`, { AM: L("AM", am), AB: L("AB", ab), AN: L("AN", "?"), AC: L("AC", ac) }, `\\dfrac{${nb(am)}}{${nb(ab)}} = \\dfrac{AN}{${nb(ac)}}`, `AN = \\dfrac{${nb(am)} \\times ${nb(ac)}}{${nb(ab)}}`, (ac * ab) / am, "Le rapport est inversé : $AN$ est plus petit que $AC$.", ac - d],
      ["AC", ac, `$AM = ${nb(am)}$, $AB = ${nb(ab)}$ et $AN = ${nb(an)}$`, { AM: L("AM", am), AB: L("AB", ab), AN: L("AN", an), AC: L("AC", "?") }, `\\dfrac{${nb(am)}}{${nb(ab)}} = \\dfrac{${nb(an)}}{AC}`, `AC = \\dfrac{${nb(an)} \\times ${nb(ab)}}{${nb(am)}}`, (an * am) / ab, "Le rapport est inversé : $AC$ est plus grand que $AN$.", an + d],
      ["AM", am, `$AB = ${nb(ab)}$, $AN = ${nb(an)}$ et $AC = ${nb(ac)}$`, { AM: L("AM", "?"), AB: L("AB", ab), AN: L("AN", an), AC: L("AC", ac) }, `\\dfrac{AM}{${nb(ab)}} = \\dfrac{${nb(an)}}{${nb(ac)}}`, `AM = \\dfrac{${nb(an)} \\times ${nb(ab)}}{${nb(ac)}}`, (ac * ab) / an, "Le rapport est inversé : $AM$ est plus petit que $AB$.", ab - (ac - an)]
    ][t];
    return {
      enonce: `${hyp}. On donne ${cas[2]}. Calcule $${cas[0]}$.`,
      figure: amThalesFig(ab, ac, bc, r, cas[3], `Triangle ABC, M sur [AB], N sur [AC], (MN) parallèle à (BC) ; ${cas[0]} est cherché`),
      mode: "nombre", prefixe: `${cas[0]} =`, attendu: cas[1],
      erreurs: amErr([[cas[6], cas[7]], [cas[8], "Les longueurs ne s'obtiennent pas en ajoutant ou en retirant une différence : elles sont **proportionnelles**, on multiplie par le même coefficient."]]),
      aides: [`Thalès : $${rapport}$ (petit triangle en haut, grand triangle en bas).`, `Ici : $${cas[4]}$.`, `Produit en croix : $${cas[5]}$.`],
      solution: `Comme $(MN) \\parallel (BC)$ : $${rapport}$. Donc $${cas[4]}$, d'où $${cas[5]} = ${nb(cas[1])}$.`
    };
  };

  /* Trigonométrie dans le triangle rectangle : cosinus, sinus, tangente */
  GEN["am-trigo"] = function () {
    const N = pick(["ABC", "DEF", "MNP", "RST", "IJK", "EFG", "KLM", "UVW"]), i = rand(0, 2), R = N[i], [P, Q] = shuffle(N.split("").filter((_, k) => k !== i));
    const seg = (a, b) => (N.indexOf(a) < N.indexOf(b) ? a + b : b + a), adj = seg(R, P), opp = seg(R, Q), hyp = seg(P, Q), ang = `\\widehat{${R}${P}${Q}}`, o = rand(0, 3);
    const t = rand(0, 4), intro = `$${N}$ est rectangle en $${R}$.`;
    const aidesBase = [`Repère l'hypoténuse : c'est le côté en face de l'angle droit, ici $[${hyp}]$.`, `Depuis l'angle $${ang}$ : le côté adjacent est $[${adj}]$, le côté opposé est $[${opp}]$.`];
    if (t === 0) {
      const f = pick([["\\cos", adj, hyp, "côté adjacent", "hypoténuse"], ["\\sin", opp, hyp, "côté opposé", "hypoténuse"], ["\\tan", opp, adj, "côté opposé", "côté adjacent"]]);
      const all = [adj, opp, hyp], frs = []; all.forEach((n) => all.forEach((d) => { if (n !== d) frs.push(`$\\dfrac{${n}}{${d}}$`); }));
      const ms = melangeChoix(`$\\dfrac{${f[1]}}{${f[2]}}$`, shuffle(frs));
      return {
        enonce: `${intro} Que vaut $${f[0]} ${ang}$ ?`,
        figure: amTriangle([R, P, Q], 4, 3, ["", "", ""], 1, o, `Triangle ${N} rectangle en ${R}, angle en ${P} marqué`),
        mode: "choix", choix: ms.choix, attendu: ms.attendu,
        aides: aidesBase.concat(["CAH SOH TOA : $\\cos = \\dfrac{\\text{adj}}{\\text{hyp}}$, $\\sin = \\dfrac{\\text{opp}}{\\text{hyp}}$, $\\tan = \\dfrac{\\text{opp}}{\\text{adj}}$."]),
        solution: `$${f[0]} ${ang} = \\dfrac{\\text{${f[3]}}}{\\text{${f[4]}}} = \\dfrac{${f[1]}}{${f[2]}}$.`
      };
    }
    if (t === 4) {
      // retrouver un angle remarquable
      const [fn, val, deg, u, v, autre] = pick([["\\cos", 0.5, 60, 1, Math.sqrt(3), 30], ["\\sin", 0.5, 30, Math.sqrt(3), 1, 60], ["\\tan", 1, 45, 1, 1, 0]]);
      const k = rand(2, 9), donne = fn === "\\cos" ? `$${adj} = ${k}$ et $${hyp} = ${2 * k}$` : fn === "\\sin" ? `$${opp} = ${k}$ et $${hyp} = ${2 * k}$` : `$${adj} = ${opp} = ${k}$`;
      return {
        enonce: `${intro} On donne ${donne}. Quelle est la mesure de l'angle $${ang}$ ? On rappelle : $\\cos 60^\\circ = \\sin 30^\\circ = 0{,}5$ et $\\tan 45^\\circ = 1$.`,
        figure: amTriangle([R, P, Q], u, v, fn === "\\cos" ? [`${k}`, "", `${2 * k}`] : fn === "\\sin" ? ["", `${k}`, `${2 * k}`] : [`${k}`, `${k}`, ""], 1, o, `Triangle ${N} rectangle en ${R}, angle en ${P} cherché`, "?"),
        mode: "nombre", prefixe: `$${ang} =$`, suffixe: "°", attendu: deg,
        erreurs: amErr([autre ? [autre, fn === "\\cos" ? "Attention : c'est $\\sin 30^\\circ$ qui vaut $0{,}5$ ; ici on a un cosinus." : "Attention : c'est $\\cos 60^\\circ$ qui vaut $0{,}5$ ; ici on a un sinus."] : null, [val, "Ça, c'est la valeur du rapport trigonométrique, pas la mesure de l'angle."]].filter(Boolean)),
        aides: aidesBase.concat([`$${fn} ${ang} = ${fn === "\\tan" ? `\\dfrac{${opp}}{${adj}}` : fn === "\\cos" ? `\\dfrac{${adj}}{${hyp}}` : `\\dfrac{${opp}}{${hyp}}`} = ${nb(val)}$.`]),
        solution: `$${fn} ${ang} = ${nb(val)}$, donc $${ang} = ${deg}^\\circ$.`
      };
    }
    // calculer une longueur
    let enonce, rep, sol, err = [], lab, regle, u, v;
    if (t === 1) {
      const [fn, deg, val, cote] = pick([["\\cos", 60, 0.5, "adj"], ["\\sin", 30, 0.5, "opp"], ["\\tan", 45, 1, "opp"]]), h = 2 * rand(2, 12), a = rand(2, 15);
      if (fn === "\\tan") { enonce = `$${ang} = 45^\\circ$ et $${adj} = ${a}$. On rappelle $\\tan 45^\\circ = 1$. Calcule $${opp}$.`; rep = a; regle = `$\\tan ${ang} = \\dfrac{${opp}}{${adj}}$`; sol = `$\\tan 45^\\circ = \\dfrac{${opp}}{${adj}} = 1$, donc $${opp} = ${adj} = ${a}$.`; lab = [`${a}`, "?", ""]; u = 1; v = 1; }
      else { const c = cote === "adj" ? adj : opp; enonce = `$${ang} = ${deg}^\\circ$ et $${hyp} = ${h}$. On rappelle $${fn} ${deg}^\\circ = 0{,}5$. Calcule $${c}$.`; rep = h / 2; regle = `$${fn} ${ang} = \\dfrac{${c}}{${hyp}}$`; sol = `$${fn} ${deg}^\\circ = \\dfrac{${c}}{${hyp}}$, donc $${c} = ${h} \\times 0{,}5 = ${h / 2}$.`; err = [[2 * h, `On multiplie l'hypoténuse par $0{,}5$, on ne la divise pas par $0{,}5$.`]]; lab = cote === "adj" ? ["?", "", `${h}`] : ["", "?", `${h}`]; u = cote === "adj" ? 1 : Math.sqrt(3); v = cote === "adj" ? Math.sqrt(3) : 1; }
      return { enonce: `${intro} ${enonce}`, figure: amTriangle([R, P, Q], u, v, lab, 1, o, `Triangle ${N} rectangle en ${R}, angle en ${P} de ${deg} degrés`, `${deg}°`), mode: "nombre", prefixe: `${[adj, opp, hyp][lab.indexOf("?")]} =`, attendu: rep, erreurs: amErr(err), aides: aidesBase.concat([`${regle}. Remplace par les valeurs.`]), solution: sol };
    }
    // triangles « 3-4-5 » : rapports décimaux simples
    const k = pick([1, 2, 3, 4, 5, 10]), [ca, co] = pick([[4, 3], [3, 4]]), A2 = ca * k, O2 = co * k, H2 = 5 * k, cosv = ca / 5, sinv = co / 5;
    const T = pick(t === 2 ? [["cos", "adj"], ["sin", "opp"], ["tan", "opp"]] : [["cos", "hyp"], ["sin", "hyp"]]);
    if (T[0] === "tan" && co === 4) { T[0] = "sin"; }
    if (T[1] === "adj") { enonce = `$${hyp} = ${H2}$ et $\\cos ${ang} = ${nb(cosv)}$. Calcule $${adj}$.`; rep = A2; regle = `$\\cos ${ang} = \\dfrac{${adj}}{${hyp}}$, donc $${adj} = ${hyp} \\times \\cos ${ang}$`; sol = `$${adj} = ${hyp} \\times \\cos ${ang} = ${H2} \\times ${nb(cosv)} = ${A2}$.`; err = [[+(H2 / cosv).toFixed(6), "On multiplie l'hypoténuse par le cosinus : le côté adjacent est plus court que l'hypoténuse."], [O2, `Ça, c'est $${opp}$, le côté opposé : le cosinus fait intervenir le côté adjacent.`]]; lab = ["?", "", `${H2}`]; }
    else if (T[1] === "opp" && T[0] === "sin") { enonce = `$${hyp} = ${H2}$ et $\\sin ${ang} = ${nb(sinv)}$. Calcule $${opp}$.`; rep = O2; regle = `$\\sin ${ang} = \\dfrac{${opp}}{${hyp}}$, donc $${opp} = ${hyp} \\times \\sin ${ang}$`; sol = `$${opp} = ${hyp} \\times \\sin ${ang} = ${H2} \\times ${nb(sinv)} = ${O2}$.`; err = [[+(H2 / sinv).toFixed(6), "On multiplie l'hypoténuse par le sinus : le côté opposé est plus court que l'hypoténuse."], [A2, `Ça, c'est $${adj}$, le côté adjacent : le sinus fait intervenir le côté opposé.`]]; lab = ["", "?", `${H2}`]; }
    else if (T[1] === "opp") { enonce = `$${adj} = ${A2}$ et $\\tan ${ang} = ${nb(co / ca)}$. Calcule $${opp}$.`; rep = O2; regle = `$\\tan ${ang} = \\dfrac{${opp}}{${adj}}$, donc $${opp} = ${adj} \\times \\tan ${ang}$`; sol = `$${opp} = ${adj} \\times \\tan ${ang} = ${A2} \\times ${nb(co / ca)} = ${O2}$.`; err = [[+(A2 / (co / ca)).toFixed(6), "On multiplie le côté adjacent par la tangente."], [H2, `Ça, c'est l'hypoténuse $${hyp}$.`]]; lab = [`${A2}`, "?", ""]; }
    else if (T[0] === "cos") { enonce = `$${adj} = ${A2}$ et $\\cos ${ang} = ${nb(cosv)}$. Calcule l'hypoténuse $${hyp}$.`; rep = H2; regle = `$\\cos ${ang} = \\dfrac{${adj}}{${hyp}}$, donc $${hyp} = \\dfrac{${adj}}{\\cos ${ang}}$`; sol = `$${hyp} = \\dfrac{${adj}}{\\cos ${ang}} = \\dfrac{${A2}}{${nb(cosv)}} = ${H2}$.`; err = [[+(A2 * cosv).toFixed(6), "Ici l'inconnue est au dénominateur : on **divise** par le cosinus. L'hypoténuse est le plus grand côté."]]; lab = [`${A2}`, "", "?"]; }
    else { enonce = `$${opp} = ${O2}$ et $\\sin ${ang} = ${nb(sinv)}$. Calcule l'hypoténuse $${hyp}$.`; rep = H2; regle = `$\\sin ${ang} = \\dfrac{${opp}}{${hyp}}$, donc $${hyp} = \\dfrac{${opp}}{\\sin ${ang}}$`; sol = `$${hyp} = \\dfrac{${opp}}{\\sin ${ang}} = \\dfrac{${O2}}{${nb(sinv)}} = ${H2}$.`; err = [[+(O2 * sinv).toFixed(6), "Ici l'inconnue est au dénominateur : on **divise** par le sinus. L'hypoténuse est le plus grand côté."]]; lab = ["", `${O2}`, "?"]; }
    return {
      enonce: `${intro} ${enonce}`, figure: amTriangle([R, P, Q], ca, co, lab, 1, o, `Triangle ${N} rectangle en ${R}, angle en ${P} marqué`),
      mode: "nombre", prefixe: `${[adj, opp, hyp][lab.indexOf("?")]} =`, attendu: rep, erreurs: amErr(err),
      aides: aidesBase.concat([`${regle}.`]), solution: sol
    };
  };


  /* ---------- Seconde : variations et fonctions de référence (var-) ---------- */
  const nbSvg = (x) => String(+(+x).toFixed(6)).replace("-", "−").replace(".", ","); // nombre écrit dans un SVG
  // Courbe lisse qui monte ou descend entre des nœuds (x entiers) : extremums exactement aux nœuds
  function courbeNoeuds() {
    const n = pick([3, 4]);
    let xs, ys;
    do {
      xs = [rand(-5, -3)]; for (let k = 1; k < n; k++) xs.push(xs[k - 1] + rand(2, 3));
      ys = [rand(-4, 4)]; for (let k = 1; k < n; k++) { let y; do { y = rand(-4, 4); } while (Math.abs(y - ys[k - 1]) < 2 || (k > 1 && Math.sign(y - ys[k - 1]) === Math.sign(ys[k - 1] - ys[k - 2]))); ys.push(y); }
    } while (xs[n - 1] > 5);
    const f = (x) => { let k = 0; while (k < n - 2 && x > xs[k + 1]) k++; const t = (x - xs[k]) / (xs[k + 1] - xs[k]); return ys[k] + (ys[k + 1] - ys[k]) * (1 - Math.cos(Math.PI * t)) / 2; };
    const opts = (extra) => Object.assign({ xmin: -5.6, xmax: 5.6, ymin: -5.6, ymax: 5.6, curves: [{ f, a: xs[0], b: xs[n - 1] }], aria: "Courbe d'une fonction f qui monte et descend" }, extra || {});
    return { xs, ys, n, f, opts };
  }
  // Tableau de variations dessiné en SVG
  function tabvar(xs, ys, nom) {
    const W = 320, H = 112, g = 52, L = (W - g - 26) / (xs.length - 1);
    const X = (k) => g + 12 + k * L;
    let s = `<svg class="graph tabvar" viewBox="0 0 ${W} ${H}" role="img" aria-label="Tableau de variations de ${nom || "f"}">`;
    s += `<g class="g-axis"><rect x="1" y="1" width="${W - 2}" height="${H - 2}" fill="none" stroke-width="1.2" style="stroke:var(--doux)"/><line x1="1" y1="30" x2="${W - 1}" y2="30"/><line x1="${g}" y1="1" x2="${g}" y2="${H - 1}"/></g>`;
    s += `<text class="g-label" x="${g / 2}" y="20" text-anchor="middle">x</text><text class="g-label" x="${g / 2}" y="76" text-anchor="middle">${nom || "f"}</text>`;
    const haut = ys.map((y, k) => (k === 0 ? y > ys[1] : k === ys.length - 1 ? y > ys[k - 1] : y > ys[k - 1]));
    xs.forEach((x, k) => { s += `<text class="g-label" x="${X(k)}" y="20" text-anchor="middle">${nbSvg(x)}</text>`; s += `<text class="g-label" x="${X(k)}" y="${haut[k] ? 48 : 102}" text-anchor="middle">${nbSvg(ys[k])}</text>`; });
    for (let k = 0; k < xs.length - 1; k++) {
      const y1 = haut[k] ? 54 : 90, y2 = haut[k + 1] ? 54 : 90, x1 = X(k) + 12, x2 = X(k + 1) - 12;
      const a = Math.atan2(y2 - y1, x2 - x1), hx = x2 - 7 * Math.cos(a - 0.45), hy = y2 - 7 * Math.sin(a - 0.45), kx = x2 - 7 * Math.cos(a + 0.45), ky = y2 - 7 * Math.sin(a + 0.45);
      s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:var(--lagon);stroke-width:1.8"/><path d="M${x2} ${y2} L${hx.toFixed(1)} ${hy.toFixed(1)} L${kx.toFixed(1)} ${ky.toFixed(1)}z" style="fill:var(--lagon)"/>`;
    }
    return s + `</svg>`;
  }
  FIGURES["tabvar-exemple"] = () => tabvar([-3, 1, 4], [2, -4, 3]);

  GEN["var-intervalle"] = function () {
    const C = courbeNoeuds();
    const seg = []; for (let k = 0; k < C.n - 1; k++) seg.push({ a: C.xs[k], b: C.xs[k + 1], monte: C.ys[k + 1] > C.ys[k], ya: C.ys[k], yb: C.ys[k + 1] });
    const s = pick(seg), mot = s.monte ? "croissante" : "décroissante";
    const I = (a, b) => `$[${fr(a)}\\,;${fr(b)}]$`;
    const autre = seg.find((t) => t.monte !== s.monte);
    const ms = melangeChoix(I(s.a, s.b), [I(autre.a, autre.b), I(Math.min(s.ya, s.yb), Math.max(s.ya, s.yb)), I(C.xs[0], C.xs[C.n - 1])]);
    return {
      enonce: `Voici la courbe de $f$ sur $[${fr(C.xs[0])}\\,;${fr(C.xs[C.n - 1])}]$. Sur quel intervalle $f$ est-elle ${mot} ?`,
      figure: graph(C.opts()), mode: "choix", choix: ms.choix, attendu: ms.attendu,
      aides: [s.monte ? "Croissante : la courbe **monte** quand on la parcourt de gauche à droite." : "Décroissante : la courbe **descend** quand on la parcourt de gauche à droite.", "Repère les points où la courbe change de sens : ce sont les bornes des intervalles.", "Un intervalle de variation se lit sur l'axe des **abscisses** (horizontal), pas sur l'axe des ordonnées."],
      solution: `De gauche à droite, la courbe ${s.monte ? "monte" : "descend"} entre $x = ${fr(s.a)}$ et $x = ${fr(s.b)}$ : $f$ est ${mot} sur ${I(s.a, s.b)}.`
    };
  };

  GEN["var-extremum"] = function () {
    const C = courbeNoeuds();
    const max = Math.random() < 0.5, val = max ? Math.max(...C.ys) : Math.min(...C.ys), xv = C.xs[C.ys.indexOf(val)];
    return {
      enonce: `Voici la courbe de $f$ sur $[${fr(C.xs[0])}\\,;${fr(C.xs[C.n - 1])}]$. Quel est le ${max ? "maximum" : "minimum"} de $f$ sur cet intervalle ?`,
      figure: graph(C.opts()), mode: "nombre", prefixe: max ? "Maximum :" : "Minimum :", attendu: val,
      erreurs: xv !== val ? [{ valeur: xv, message: `C'est l'abscisse où il est atteint. Le ${max ? "maximum" : "minimum"} est une valeur de $f(x)$ : lis-la sur l'axe **vertical**.` }] : [],
      aides: [max ? "Cherche le point **le plus haut** de toute la courbe." : "Cherche le point **le plus bas** de toute la courbe.", "N'oublie pas de regarder aussi les extrémités de la courbe.", "Le maximum ou le minimum est l'**ordonnée** de ce point."],
      solution: `Le point le plus ${max ? "haut" : "bas"} est $(${fr(xv)}\\,;${fr(val)})$ : le ${max ? "maximum" : "minimum"} de $f$ vaut $${fr(val)}$, atteint en $x = ${fr(xv)}$.`,
      figureSolution: graph(C.opts({ points: [{ x: xv, y: val }] }))
    };
  };

  GEN["var-tableau"] = function () {
    const C = courbeNoeuds();
    const fig = tabvar(C.xs, C.ys);
    if (Math.random() < 0.3) {
      const max = Math.random() < 0.5, val = max ? Math.max(...C.ys) : Math.min(...C.ys);
      return {
        enonce: `D'après ce tableau de variations, quel est le ${max ? "maximum" : "minimum"} de $f$ ?`,
        figure: fig, mode: "nombre", prefixe: max ? "Maximum :" : "Minimum :", attendu: val,
        aides: ["Les valeurs de $f(x)$ sont sur la deuxième ligne, au bout des flèches.", max ? "Prends la plus grande valeur de la deuxième ligne." : "Prends la plus petite valeur de la deuxième ligne.", "La première ligne donne seulement les valeurs de $x$."],
        solution: `Sur la ligne de $f$, la ${max ? "plus grande" : "plus petite"} valeur est $${fr(val)}$ : c'est le ${max ? "maximum" : "minimum"}.`
      };
    }
    const k = rand(0, C.n - 2), a = C.xs[k], b = C.xs[k + 1], monte = C.ys[k + 1] > C.ys[k];
    let u, v; do { u = a + rand(1, (b - a) * 2 - 1) / 2; v = a + rand(1, (b - a) * 2 - 1) / 2; } while (u >= v);
    const choix = [`$f(${fr(u)}) < f(${fr(v)})$`, `$f(${fr(u)}) > f(${fr(v)})$`, `$f(${fr(u)}) = f(${fr(v)})$`, "On ne peut pas savoir"];
    return {
      enonce: `D'après ce tableau de variations, compare $f(${fr(u)})$ et $f(${fr(v)})$.`,
      figure: fig, mode: "choix", choix, attendu: monte ? 0 : 1,
      aides: [`Les deux nombres $${fr(u)}$ et $${fr(v)}$ sont dans l'intervalle $[${fr(a)}\\,;${fr(b)}]$.`, `Sur cet intervalle, la flèche ${monte ? "monte : $f$ est croissante" : "descend : $f$ est décroissante"}.`, monte ? "Croissante : les images sont rangées **dans le même ordre** que les nombres." : "Décroissante : les images sont rangées **dans l'ordre contraire** des nombres."],
      solution: `$${fr(u)} < ${fr(v)}$ et $f$ est ${monte ? "croissante" : "décroissante"} sur $[${fr(a)}\\,;${fr(b)}]$, donc $f(${fr(u)}) ${monte ? "<" : ">"} f(${fr(v)})$.`
    };
  };

  GEN["var-affine"] = function () {
    let m, r; do { m = pick([-3, -2, -1, -0.5, 0.5, 1, 2, 3]); r = rand(-4, 4); } while (!Number.isInteger(-m * r));
    const p = -m * r, expr = eqD(m, p).replace("y = ", "");
    if (Math.random() < 0.4) return {
      enonce: `Soit $f(x) = ${expr}$. Quel est le sens de variation de $f$ ?`,
      mode: "choix", choix: ["croissante sur $\\mathbb{R}$", "décroissante sur $\\mathbb{R}$", "constante sur $\\mathbb{R}$"], attendu: m > 0 ? 0 : 1,
      aides: ["$f$ est une fonction affine $f(x) = mx + p$ : elle est soit croissante, soit décroissante sur $\\mathbb{R}$.", `Ici $m = ${fr(m)}$.`, "Si $m > 0$, $f$ est croissante ; si $m < 0$, $f$ est décroissante."],
      solution: `$m = ${fr(m)}$ est ${m > 0 ? "positif" : "négatif"}, donc $f$ est ${m > 0 ? "croissante" : "décroissante"} sur $\\mathbb{R}$.`
    };
    const pos = m > 0 ? `$]${fr(r)}\\,;+\\infty[$` : `$]-\\infty\\,;${fr(r)}[$`, neg = m > 0 ? `$]-\\infty\\,;${fr(r)}[$` : `$]${fr(r)}\\,;+\\infty[$`;
    const ms = melangeChoix(pos, [neg, `$]${fr(-r)}\\,;+\\infty[$`, `$]-\\infty\\,;${fr(-r)}[$`, `$]${fr(p)}\\,;+\\infty[$`]);
    return {
      enonce: `Soit $f(x) = ${expr}$. Pour quels réels $x$ a-t-on $f(x) > 0$ ?`,
      mode: "choix", choix: ms.choix, attendu: ms.attendu,
      aides: [`Cherche d'abord où $f$ s'annule : résous $${expr} = 0$.`, `$f(x) = 0$ pour $x = ${fr(r)}$.`, `$m = ${fr(m)}$ est ${m > 0 ? "positif : $f$ est négative avant $" + fr(r) + "$ puis positive après" : "négatif : $f$ est positive avant $" + fr(r) + "$ puis négative après"}.`],
      solution: `$f(x) = 0 \\iff x = ${fr(r)}$. Comme $m = ${fr(m)}$ est ${m > 0 ? "positif" : "négatif"}, $f(x) > 0$ pour $x \\in$ ${pos}.`
    };
  };

  const REF = {
    carre: { nom: "carré", f: (x) => x * x, tex: (a) => (a < 0 ? `(${fr(a)})^2` : `${fr(a)}^2`), sens: "décroissante sur $]-\\infty\\,;0]$ et croissante sur $[0\\,;+\\infty[$" },
    inverse: { nom: "inverse", f: (x) => 1 / x, tex: (a) => `\\dfrac{1}{${fr(a)}}`, sens: "décroissante sur $]-\\infty\\,;0[$ et décroissante sur $]0\\,;+\\infty[$" },
    absolue: { nom: "valeur absolue", f: (x) => Math.abs(x), tex: (a) => `|${fr(a)}|`, sens: "décroissante sur $]-\\infty\\,;0]$ et croissante sur $[0\\,;+\\infty[$" },
    cube: { nom: "cube", f: (x) => x ** 3, tex: (a) => (a < 0 ? `(${fr(a)})^3` : `${fr(a)}^3`), sens: "croissante sur $\\mathbb{R}$" },
    racine: { nom: "racine carrée", f: (x) => Math.sqrt(x), tex: (a) => `\\sqrt{${fr(a)}}`, sens: "croissante sur $[0\\,;+\\infty[$" }
  };

  const lab = (t) => `<tspan>${t}</tspan>`;
  FIGURES["courbe-carre"] = () => graph({ xmin: -3.4, xmax: 3.4, ymin: -0.8, ymax: 9.6, h: 300, curves: [{ f: (x) => x * x, a: -3, b: 3, closed: false, label: lab("y = x²"), lx: 2.6, dx: -10, dy: 4 }], points: [{ x: 0, y: 0 }, { x: 2, y: 4, label: "(2 ; 4)" }, { x: -2, y: 4, label: "(−2 ; 4)", gauche: true }], aria: "Parabole y = x², sommet à l'origine" });
  FIGURES["courbe-absolue"] = () => graph({ xmin: -4.6, xmax: 4.6, ymin: -0.8, ymax: 4.6, curves: [{ f: (x) => Math.abs(x), a: -4.4, b: 4.4, closed: false, label: lab("y = |x|"), lx: 3.6, dx: -10, dy: 4 }], points: [{ x: 0, y: 0 }], aria: "Courbe en V de y = |x|" });
  FIGURES["courbe-racine-cube"] = () => graph({ xmin: -2.4, xmax: 4.6, ymin: -3.6, ymax: 3.6, curves: [{ f: (x) => Math.sqrt(x), a: 0, b: 4.4, closed: false, label: lab("y = √x"), lx: 4.2, dx: -4, dy: -8 }, { f: (x) => x ** 3, a: -1.5, b: 1.5, closed: false, label: lab("y = x³"), lx: 1.45, dx: -8, dy: 4 }], aria: "Courbes de la racine carrée et de la fonction cube" });
  FIGURES["x-et-x2"] = () => graph({ xmin: -0.3, xmax: 2.2, ymin: -0.3, ymax: 2.6, xstep: 0.5, ystep: 0.5, h: 280, curves: [{ f: (x) => x, a: 0, b: 2.1, closed: false, label: lab("y = x"), lx: 2.1, dx: -4, dy: 16 }, { f: (x) => x * x, a: 0, b: 1.58, closed: false, label: lab("y = x²"), lx: 1.55, dx: -8, dy: 2 }], points: [{ x: 1, y: 1, label: "(1 ; 1)" }], aria: "Sur [0 ; 1] la droite y = x est au-dessus de la parabole, après 1 elle est en dessous" });

  // Restriction facultative des fonctions de référence (chapitres 9 et 13 de Seconde) : voir refRestreint
  let REF_CLES = null, REF_EQ = null;
  const refRestreint = (gen, cles, eq) => (i) => { REF_CLES = cles; REF_EQ = eq; try { return GEN[gen](i); } finally { REF_CLES = REF_EQ = null; } };

  GEN["var-ref-comparer"] = function () {
    const cle = pick(REF_CLES || ["carre", "carre", "inverse", "absolue", "cube", "racine"]), R = REF[cle];
    const dec = () => rand(1, 49) / 10;
    let a, b;
    if (cle === "racine") { a = dec(); b = dec(); }
    else if (cle === "inverse") { const s = pick([1, -1]); a = s * dec(); b = s * dec(); }
    else { const s = pick([1, -1, 0]); a = s ? s * dec() : -dec(); b = s ? s * dec() : dec(); }
    if (a === b) b = +(b + 0.3).toFixed(1);
    const fa = R.f(a), fb = R.f(b);
    const att = Math.abs(fa - fb) < 1e-12 ? 2 : fa < fb ? 0 : 1;
    const memeSigne = a * b > 0;
    return {
      enonce: `Sans calculatrice, compare $${R.tex(a)}$ et $${R.tex(b)}$.`,
      mode: "choix", choix: [`$${R.tex(a)} < ${R.tex(b)}$`, `$${R.tex(a)} > ${R.tex(b)}$`, `$${R.tex(a)} = ${R.tex(b)}$`], attendu: att,
      aides: [`On utilise la fonction ${R.nom} : elle est ${R.sens}.`, memeSigne || cle === "cube" || cle === "racine" ? `$${fr(a)}$ et $${fr(b)}$ sont dans un même intervalle où le sens de variation est connu : range-les, puis applique le sens de variation.` : "Les deux nombres n'ont pas le même signe : compare leurs distances à $0$ (pour le carré et la valeur absolue).", "Croissante : même ordre. Décroissante : ordre contraire."],
      solution: `$${fr(Math.min(a, b))} < ${fr(Math.max(a, b))}$${memeSigne || cle === "cube" || cle === "racine" ? `. La fonction ${R.nom} est ${R.sens}` : `. Ici on compare les distances à $0$ : $${fr(Math.abs(a))}$ et $${fr(Math.abs(b))}$`}. Donc $${att === 0 ? `${R.tex(a)} < ${R.tex(b)}` : att === 1 ? `${R.tex(a)} > ${R.tex(b)}` : `${R.tex(a)} = ${R.tex(b)}`}$.`
    };
  };

  GEN["var-ref-equation"] = function () {
    const T = [
      () => { const k = pick([-9, -4, 0, 1, 4, 9, 16, 25, 36, 49, 0.25]); const s = k < 0 ? [] : k === 0 ? [0] : [-Math.sqrt(k), Math.sqrt(k)]; return [`x^2 = ${fr(k)}`, s, "Un carré est toujours positif ou nul.", k > 0 ? `Deux nombres ont pour carré $${fr(k)}$ : $\\sqrt{${fr(k)}}$ et son opposé.` : k === 0 ? "Seul $0$ a pour carré $0$." : "Aucun nombre réel n'a un carré négatif."]; },
      () => { const k = pick([-3, 0, 2, 5, 7, 1.5]); const s = k < 0 ? [] : k === 0 ? [0] : [-k, k]; return [`|x| = ${fr(k)}`, s, "$|x|$ est la distance entre $x$ et $0$.", k > 0 ? `Deux nombres sont à la distance $${fr(k)}$ de $0$ : $${fr(k)}$ et $${fr(-k)}$.` : k === 0 ? "Seul $0$ est à la distance $0$ de $0$." : "Une distance n'est jamais négative."]; },
      () => { const c = pick([-3, -2, -1, 1, 2, 3, 4]); return [`x^3 = ${c ** 3}`, [c], "La fonction cube est croissante sur $\\mathbb{R}$ : l'équation a une seule solution.", `Cherche le nombre dont le cube vaut $${c ** 3}$ (attention au signe).`]; },
      () => { const k = pick([-2, 0, 1, 2, 3, 5, 0.5]); return [`\\sqrt{x} = ${fr(k)}`, k < 0 ? [] : [k * k], "Une racine carrée est toujours positive ou nulle.", k < 0 ? "Une racine carrée ne peut pas être négative." : `$\\sqrt{x} = ${fr(k)}$ donne $x = ${fr(k)}^2$.`]; },
      () => { const k = pick([2, -2, 4, -4, 0.5, -0.5, 0.25, 5, 0]); return [`\\dfrac{1}{x} = ${fr(k)}`, k === 0 ? [] : [1 / k], "La fonction inverse ne s'annule jamais.", k === 0 ? "$\\dfrac{1}{x}$ n'est jamais égal à $0$." : `$\\dfrac{1}{x} = ${fr(k)}$ donne $x = \\dfrac{1}{${fr(k)}}$.`]; }
    ];
    const [eq, sol, a1, a2] = (REF_EQ ? T[pick(REF_EQ)] : pick(T))();
    return {
      enonce: `Résous dans $\\mathbb{R}$ l'équation $${eq}$.`,
      mode: "ensemble", prefixe: "Solution(s) :", attendu: sol,
      aides: [a1, a2, "Écris les solutions séparées par « ; », ou « aucun » s'il n'y en a pas."],
      solution: sol.length ? `$${eq}$ a pour solution${sol.length > 1 ? "s" : ""} $${sol.map(nb).join("$ et $")}$.` : `$${eq}$ n'a **aucune** solution réelle.`
    };
  };

  GEN["var-ref-courbe"] = function () {
    const cle = pick(REF_CLES || Object.keys(REF)), R = REF[cle];
    const curves = cle === "inverse" ? [{ f: R.f, a: -4.5, b: -0.22, closed: false }, { f: R.f, a: 0.22, b: 4.5, closed: false }]
      : cle === "racine" ? [{ f: R.f, a: 0, b: 4.5, closed: false }]
      : cle === "cube" ? [{ f: R.f, a: -1.65, b: 1.65, closed: false }]
      : cle === "carre" ? [{ f: R.f, a: -2.15, b: 2.15, closed: false }] : [{ f: R.f, a: -4.5, b: 4.5, closed: false }];
    const exprs = { carre: "x^2", inverse: "\\dfrac{1}{x}", absolue: "|x|", cube: "x^3", racine: "\\sqrt{x}" };
    const indices = { carre: "Parabole tournée vers le haut, sommet à l'origine.", inverse: "Deux branches (hyperbole), la courbe ne coupe jamais les axes.", absolue: "Un « V » de sommet l'origine, formé de deux demi-droites.", cube: "La courbe monte toujours et passe par l'origine, avec un replat en $0$.", racine: "La courbe n'existe que pour $x \\geqslant 0$ et monte de plus en plus lentement." };
    const lab = (x, y) => `(${String(x).replace("-", "−").replace(".", ",")} ; ${String(y).replace("-", "−").replace(".", ",")})`;
    const fig = (pts, aria) => graph({ xmin: -4.8, xmax: 4.8, ymin: -4.8, ymax: 4.8, curves, points: pts, aria: aria || "Courbe d'une fonction de référence" }).replace(/g-curve-1/g, "g-curve-0");
    const pt = (x, y) => `$(${nb(x)}\\,;${nb(y)})$`;
    const t = pick(["identifier", "identifier", "identifier", "identifier", "point", "point", "point", "point", "point", "sens", "domaine"]);
    if (t === "point") {
      // Lequel de ces points est sur la courbe ? (il faut reconnaître la fonction, puis calculer une image)
      const A = { carre: [-3, -2, -1.5, -0.5, 0.5, 1.5, 2, 3, 4, -4, 10], inverse: [-4, -2, -0.5, -0.25, 0.25, 0.5, 2, 4, 5, -5, 10, 0.1], absolue: [-5, -4, -3, -2, -1.5, -0.5, 1.5, 2, 3, 4, 5, -2.5], cube: [-3, -2, -0.5, 0.5, 2, 3], racine: [0.25, 4, 9, 16, 25, 0.01, 0.09, 2.25, 6.25, 100] }[cle];
      const a = pick(A), ya = +R.f(a).toFixed(6);
      const joli = (v) => Number.isFinite(v) && Math.abs(v * 1e4 - Math.round(v * 1e4)) < 1e-9;
      const surCourbe = (x, y) => { const v = R.f(x); return Number.isFinite(v) && Math.abs(v - y) < 1e-9; };
      const cands = [];
      Object.keys(REF).filter((k) => k !== cle).forEach((k) => { const v = REF[k].f(a); if (joli(v)) cands.push([a, +v.toFixed(6)]); });
      cands.push([ya, a], [a, -ya], [-a, ya], [a, 2 * a]);
      const fausses = shuffle(cands.filter(([x, y]) => !surCourbe(x, y)).map(([x, y]) => pt(x, y)));
      const ms = melangeChoix(pt(a, ya), fausses);
      return {
        enonce: "Voici la courbe d'une fonction de référence $f$. Parmi ces points, lequel appartient à cette courbe ?",
        figure: fig(), mode: "choix", choix: ms.choix, attendu: ms.attendu,
        aides: ["Reconnais d'abord la fonction : la courbe existe-t-elle pour les $x$ négatifs ? A-t-elle une ou deux branches ?", `C'est la fonction ${R.nom} : $f(x) = ${exprs[cle]}$.`, `Un point $(x\\,;y)$ est sur la courbe quand $y = f(x)$. Calcule $f(${fr(a)})$.`],
        solution: `${indices[cle]} C'est la fonction ${R.nom}, $f(x) = ${exprs[cle]}$.\n\n$f(${fr(a)}) = ${R.tex(a)} = ${fr(ya)}$ : le point ${pt(a, ya)} est sur la courbe. Pour les autres points, l'ordonnée n'est pas l'image de l'abscisse${cle === "racine" ? " (ou l'abscisse, négative, n'a pas d'image)" : ""}.`
      };
    }
    if (t === "sens") {
      const autres = ["croissante sur $\\mathbb{R}$", "décroissante sur $]-\\infty\\,;0]$ et croissante sur $[0\\,;+\\infty[$", "décroissante sur $]-\\infty\\,;0[$ et décroissante sur $]0\\,;+\\infty[$", "croissante sur $[0\\,;+\\infty[$", "croissante sur $]-\\infty\\,;0]$ et décroissante sur $[0\\,;+\\infty[$", "décroissante sur $\\mathbb{R}$"];
      const ms = melangeChoix(R.sens, shuffle(autres));
      return {
        enonce: "Voici la courbe d'une fonction de référence. Quel est son sens de variation ?",
        figure: fig(), mode: "choix", choix: ms.choix, attendu: ms.attendu,
        aides: ["Lis la courbe de gauche à droite : monte-t-elle ? descend-elle ?", "Repère l'endroit où la courbe change de sens, et les valeurs de $x$ où elle n'existe pas.", "Les intervalles se lisent sur l'axe des **abscisses**."],
        solution: `${indices[cle]} C'est la fonction ${R.nom}, $f(x) = ${exprs[cle]}$ : elle est ${R.sens}.`
      };
    }
    if (t === "domaine") {
      const D = { carre: "\\mathbb{R}", absolue: "\\mathbb{R}", cube: "\\mathbb{R}", racine: "[0\\,;+\\infty[", inverse: "]-\\infty\\,;0[ \\cup \\,]0\\,;+\\infty[" };
      const ms = melangeChoix(`$${D[cle]}$`, ["$\\mathbb{R}$", "$[0\\,;+\\infty[$", "$]-\\infty\\,;0[ \\cup \\,]0\\,;+\\infty[$", "$]0\\,;+\\infty[$"]);
      return {
        enonce: "Voici la courbe d'une fonction de référence. Sur quel ensemble est-elle définie ?",
        figure: fig(), mode: "choix", choix: ms.choix, attendu: ms.attendu,
        aides: ["L'ensemble de définition est formé des abscisses $x$ qui ont une image : là où la courbe existe.", "Regarde si la courbe existe pour les $x$ négatifs, et en $x = 0$.", "Reconnais la fonction : on ne divise jamais par $0$, et on ne prend pas la racine carrée d'un nombre négatif."],
        solution: `${indices[cle]} C'est la fonction ${R.nom}, $f(x) = ${exprs[cle]}$, définie sur $${D[cle]}$.` + (cle === "inverse" ? " Le nombre $0$ n'a pas d'image." : cle === "racine" ? " Les nombres négatifs n'ont pas d'image." : "")
      };
    }
    // Reconnaître l'expression (avec, une fois sur deux, un point marqué qui permet de vérifier)
    const ms = melangeChoix(`$f(x) = ${exprs[cle]}$`, shuffle(Object.keys(exprs).filter((k) => k !== cle)).map((k) => `$f(x) = ${exprs[k]}$`));
    const P = pick({ carre: [[2, 4], [-2, 4], [1.5, 2.25], [-1.5, 2.25], [0.5, 0.25]], inverse: [[2, 0.5], [-2, -0.5], [0.5, 2], [-0.5, -2], [4, 0.25], [0.25, 4], [-4, -0.25]], absolue: [[2, 2], [-2, 2], [3, 3], [-3, 3], [4, 4], [-4, 4]], cube: [[1.5, 3.375], [-1.5, -3.375], [0.5, 0.125], [-0.5, -0.125]], racine: [[4, 2], [0.25, 0.5], [2.25, 1.5]] }[cle]);
    const figure = P ? fig([{ x: P[0], y: P[1], label: lab(P[0], P[1]), gauche: P[0] > 3 || (P[0] < 0 && P[0] >= -3) }], `Courbe d'une fonction de référence passant par le point ${lab(P[0], P[1])}`) : fig();
    return {
      enonce: P ? `Quelle fonction de référence a cette courbe ? Elle passe par le point ${pt(P[0], P[1])}.` : "Quelle fonction de référence a cette courbe ?",
      figure, mode: "choix", choix: ms.choix, attendu: ms.attendu,
      aides: ["Regarde si la courbe existe pour les $x$ négatifs.", "Regarde si elle passe par l'origine et si elle a une ou deux branches.", P ? `Teste le point marqué : quelle expression donne $f(${fr(P[0])}) = ${fr(P[1])}$ ?` : "Teste un point : que vaut $f(1)$ ? et $f(2)$ ?"],
      solution: `${indices[cle]} C'est la fonction ${R.nom} : $f(x) = ${exprs[cle]}$.` + (P ? ` Vérification : $${R.tex(P[0])} = ${fr(P[1])}$.` : "")
    };
  };


  /* ---------- Seconde, chapitre 15 : probabilités conditionnelles et arbres pondérés (préfixe pc-) ---------- */
  // Arbre pondéré à deux épreuves. n : noms [A, ~A, B, ~B] (« ~ » : barre au-dessus) ;
  // p : textes des 6 branches [A, non A, B sachant A, non B sachant A, B sachant non A, non B sachant non A] ("?" possible)
  function arbre(n, p) {
    const W = 320, H = 200, x0 = 14, x1 = 120, x2 = 270, yA = 55, yN = 145, d = 30;
    const ys = [yA - d, yA + d, yN - d, yN + d];
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="Arbre pondéré à deux épreuves">`;
    const nom = (t) => (t[0] === "~" ? `<tspan style="text-decoration:overline">${t.slice(1)}</tspan>` : t);
    const br = (xa, ya, xb, yb, t) => {
      s += `<line x1="${xa}" y1="${ya}" x2="${xb - 14}" y2="${yb}" style="stroke:var(--doux);stroke-width:1.6"/>`;
      s += `<text class="g-label" x="${(xa + xb - 14) / 2}" y="${(ya + yb) / 2 - 5}" text-anchor="middle" style="fill:${t === "?" ? "var(--ylang)" : "var(--encre)"}">${t}</text>`;
    };
    br(x0, H / 2, x1, yA, p[0]); br(x0, H / 2, x1, yN, p[1]);
    br(x1 + 10, yA, x2, ys[0], p[2]); br(x1 + 10, yA, x2, ys[1], p[3]);
    br(x1 + 10, yN, x2, ys[2], p[4]); br(x1 + 10, yN, x2, ys[3], p[5]);
    s += `<text class="g-clabel" x="${x1 - 8}" y="${yA + 4}">${nom(n[0])}</text><text class="g-clabel" x="${x1 - 8}" y="${yN + 4}">${nom(n[1])}</text>`;
    ys.forEach((y, i) => { s += `<text class="g-clabel" x="${x2 - 8}" y="${y + 4}">${nom(n[2 + (i % 2)])}</text>`; });
    return s + `</svg>`;
  }
  const NOMS_ARBRE = ["A", "~A", "B", "~B"];
  const dec2 = (x) => nb(+x.toFixed(4));
  FIGURES["arbre-depistage"] = () => arbre(["M", "~M", "T", "~T"], ["0,02", "0,98", "0,95", "0,05", "0,1", "0,9"]);

  // Nombre écrit sur une branche (virgule décimale), arbre avec une description précise pour les lecteurs d'écran
  const pcV = (x) => String(+(+x).toFixed(4)).replace(".", ",");
  const pcAria = (n, p) => { const N = n.map((t) => (t[0] === "~" ? `non ${t.slice(1)}` : t)); return `Arbre pondéré : ${N[0]} ${p[0]}, ${N[1]} ${p[1]} ; après ${N[0]} : ${N[2]} ${p[2]}, ${N[3]} ${p[3]} ; après ${N[1]} : ${N[2]} ${p[4]}, ${N[3]} ${p[5]}`; };
  const pcArbre = (n, p) => arbre(n, p).replace(/aria-label="[^"]*"/, `aria-label="${pcAria(n, p)}"`);
  const pcTex = (t) => (t[0] === "~" ? `\\overline{${t.slice(1)}}` : t); // "~M" : M barre
  const pcDe = (s) => (/^[haeiouyéèêàâîôûœ]/i.test(s) ? `d'${s}` : `de ${s}`); // « d'habitants », « de filles »
  const pcPct = (x) => `$${nb(+(100 * x).toFixed(4))}\\,\\%$`;
  // Valeurs de branches : deux décimales, jamais 0,5 au second niveau (les quatre valeurs restent distinctes)
  const pcBranches = () => {
    let a, b, c;
    do { a = pick([0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9]); b = pick([0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95]); c = pick([0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9]); }
    while (Math.abs(b - c) < 1e-9 || Math.abs(b + c - 1) < 1e-9 || Math.abs(a - b) < 1e-9);
    return [a, +(1 - a).toFixed(2), b, +(1 - b).toFixed(2), c, +(1 - c).toFixed(2)];
  };

  // Contextes d'arbres : lettres X, Y ; phrases à l'indicatif (i) et au subjonctif (s) pour X, non X, Y, non Y ;
  // groupes (g) pour « parmi les… » ; vals : probabilités réalistes [P(X), P_X(Y), P_nonX(Y)] (sinon tirées au hasard)
  const PC_CTX = [
    { X: "M", Y: "T", intro: "Au dispensaire de Mamoudzou, on fait passer un test de dépistage de la dengue à une personne choisie au hasard.",
      leg: "$M$ : « la personne est malade » et $T$ : « son test est positif »",
      xi: ["la personne est malade", "la personne n'est pas malade"], xs: ["la personne soit malade", "la personne ne soit pas malade"],
      yi: ["son test est positif", "son test est négatif"], ys: ["son test soit positif", "son test soit négatif"],
      xg: ["personnes malades", "personnes non malades"], yg: ["personnes au test positif", "personnes au test négatif"],
      vals: () => [pick([0.02, 0.04, 0.05, 0.08, 0.1, 0.15, 0.2]), pick([0.85, 0.9, 0.95, 0.98]), pick([0.02, 0.05, 0.08, 0.1, 0.15])] },
    { X: "A", Y: "R", intro: "On choisit au hasard un jour de l'année à Dzaoudzi.",
      leg: "$A$ : « il y a une averse » et $R$ : « la barge est en retard »",
      xi: ["il y a une averse", "il n'y a pas d'averse"], xs: ["il y ait une averse", "il n'y ait pas d'averse"],
      yi: ["la barge est en retard", "la barge est à l'heure"], ys: ["la barge soit en retard", "la barge soit à l'heure"],
      xg: ["jours d'averse", "jours sans averse"], yg: ["jours de retard de la barge", "jours où la barge est à l'heure"] },
    { X: "F", Y: "S", intro: "On choisit au hasard un élève du lycée de Sada.",
      leg: "$F$ : « l'élève est une fille » et $S$ : « l'élève fait du sport »",
      xi: ["l'élève est une fille", "l'élève est un garçon"], xs: ["l'élève soit une fille", "l'élève soit un garçon"],
      yi: ["l'élève fait du sport", "l'élève ne fait pas de sport"], ys: ["l'élève fasse du sport", "l'élève ne fasse pas de sport"],
      xg: ["filles", "garçons"], yg: ["élèves sportifs", "élèves qui ne font pas de sport"] },
    { X: "V", Y: "G", intro: "On choisit au hasard un habitant de Koungou après la campagne de vaccination contre la grippe.",
      leg: "$V$ : « l'habitant est vacciné » et $G$ : « il attrape la grippe »",
      xi: ["l'habitant est vacciné", "l'habitant n'est pas vacciné"], xs: ["l'habitant soit vacciné", "l'habitant ne soit pas vacciné"],
      yi: ["il attrape la grippe", "il n'attrape pas la grippe"], ys: ["il attrape la grippe", "il n'attrape pas la grippe"],
      xg: ["habitants vaccinés", "habitants non vaccinés"], yg: ["habitants qui attrapent la grippe", "habitants qui n'attrapent pas la grippe"],
      vals: () => [pick([0.3, 0.4, 0.45, 0.55, 0.6, 0.7]), pick([0.05, 0.1, 0.15, 0.2]), pick([0.25, 0.3, 0.35, 0.4, 0.45])] },
    { X: "C", Y: "T", intro: "Un pêcheur de M'tsamboro sort tous les jours en pirogue. On choisit une sortie au hasard.",
      leg: "$C$ : « la mer est calme » et $T$ : « le pêcheur rapporte du thon »",
      xi: ["la mer est calme", "la mer est agitée"], xs: ["la mer soit calme", "la mer soit agitée"],
      yi: ["le pêcheur rapporte du thon", "le pêcheur ne rapporte pas de thon"], ys: ["le pêcheur rapporte du thon", "le pêcheur ne rapporte pas de thon"],
      xg: ["sorties par mer calme", "sorties par mer agitée"], yg: ["sorties avec du thon", "sorties sans thon"] },
    { X: "M", Y: "Q", intro: "Une coopérative de Combani trie des fleurs d'ylang-ylang. On choisit une fleur au hasard.",
      leg: "$M$ : « la fleur a été cueillie le matin » et $Q$ : « elle est de premier choix »",
      xi: ["la fleur a été cueillie le matin", "la fleur a été cueillie l'après-midi"], xs: ["la fleur ait été cueillie le matin", "la fleur ait été cueillie l'après-midi"],
      yi: ["la fleur est de premier choix", "la fleur n'est pas de premier choix"], ys: ["la fleur soit de premier choix", "la fleur ne soit pas de premier choix"],
      xg: ["fleurs cueillies le matin", "fleurs cueillies l'après-midi"], yg: ["fleurs de premier choix", "fleurs qui ne sont pas de premier choix"] }
  ];
  // Valeurs [P(X), P(nonX), P_X(Y), P_X(nonY), P_nonX(Y), P_nonX(nonY)] d'un contexte
  const pcValeurs = (c) => {
    if (!c.vals) return pcBranches();
    let v; do { v = c.vals(); } while (Math.abs(v[1] - v[2]) < 1e-9 || Math.abs(v[1] + v[2] - 1) < 1e-9);
    return [v[0], +(1 - v[0]).toFixed(2), v[1], +(1 - v[1]).toFixed(2), v[2], +(1 - v[2]).toFixed(2)];
  };

  // Contextes de la formule P(A ∩ B) = P(A) × P_A(B)
  const PC_FORMULE = [
    { A: "I", B: "F", leg: "$I$ : « l'élève est interne » et $F$ : « l'élève joue au football »", pop: "des élèves du lycée de Sada", estA: "sont internes", eux: "parmi les internes", estB: "jouent au football", deux: "sont internes et jouent au football", tire: "On choisit un élève au hasard.", tireA: "On choisit au hasard un élève interne.", qEt: "qu'il soit interne et joue au football", qB: "qu'il joue au football" },
    { A: "S", B: "T", leg: "$S$ : « le touriste fait de la plongée sous-marine » et $T$ : « il voit une tortue »", pop: "des touristes venus à Mayotte", estA: "font de la plongée", eux: "parmi les plongeurs", estB: "voient une tortue", deux: "font de la plongée et voient une tortue", tire: "On choisit un touriste au hasard.", tireA: "On choisit au hasard un touriste qui a fait de la plongée.", qEt: "qu'il fasse de la plongée et voie une tortue", qB: "qu'il voie une tortue" },
    { A: "V", B: "G", leg: "$V$ : « l'habitant est vacciné » et $G$ : « il attrape la grippe »", pop: "des habitants de Koungou", estA: "sont vaccinés contre la grippe", eux: "parmi les vaccinés", estB: "attrapent quand même la grippe", deux: "sont vaccinés et attrapent quand même la grippe", tire: "On choisit un habitant au hasard.", tireA: "On choisit au hasard un habitant vacciné.", qEt: "qu'il soit vacciné et attrape la grippe", qB: "qu'il attrape la grippe" },
    { A: "C", B: "T", leg: "$C$ : « la mer est calme » et $T$ : « le pêcheur rapporte du thon »", pop: "des sorties en pirogue d'un pêcheur de M'tsamboro", estA: "ont lieu par mer calme", eux: "parmi elles", estB: "permettent de rapporter du thon", deux: "ont lieu par mer calme et permettent de rapporter du thon", tire: "On choisit une sortie au hasard.", tireA: "On choisit au hasard une sortie par mer calme.", qEt: "que la mer soit calme et que le pêcheur rapporte du thon", qB: "que le pêcheur rapporte du thon" },
    { A: "M", B: "Q", leg: "$M$ : « la fleur est cueillie le matin » et $Q$ : « elle est de premier choix »", pop: "des fleurs d'ylang-ylang d'une coopérative de Combani", estA: "sont cueillies le matin", eux: "parmi elles", estB: "sont de premier choix", deux: "sont cueillies le matin et de premier choix", tire: "On choisit une fleur au hasard.", tireA: "On choisit au hasard une fleur cueillie le matin.", qEt: "qu'elle soit cueillie le matin et de premier choix", qB: "qu'elle soit de premier choix" },
    { A: "L", B: "M", leg: "$L$ : « le passager est un lycéen » et $M$ : « il voyage le matin »", pop: "des passagers de la barge", estA: "sont des lycéens", eux: "parmi eux", estB: "voyagent le matin", deux: "sont des lycéens qui voyagent le matin", tire: "On choisit un passager au hasard.", tireA: "On choisit au hasard un passager lycéen.", qEt: "qu'il soit lycéen et voyage le matin", qB: "qu'il voyage le matin" }
  ];
  // Erreurs typiques sans doublon ni bonne réponse
  const pcErr = (bonne, L) => L.filter((e, k) => isFinite(e.valeur) && Math.abs(e.valeur - bonne) > 1e-9 && L.findIndex((f) => Math.abs(f.valeur - e.valeur) < 1e-9) === k).map((e) => ({ valeur: +(+e.valeur).toFixed(6), message: e.message }));

  GEN["pc-formule"] = function () {
    const pA = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9]), pBA = pick([0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95]), inter = +(pA * pBA).toFixed(4);
    const t = pick(["cond", "cond", "inter", "inter", "PA", "contraire", "ctx-inter", "ctx-inter", "ctx-cond", "ctx-cond"]);
    const div = "On **divise** par la probabilité de l'événement en indice : $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.";
    if (t === "cond") return {
      enonce: `On donne $P(A) = ${dec2(pA)}$ et $P(A \\cap B) = ${dec2(inter)}$. Calcule $P_A(B)$.`,
      mode: "nombre", prefixe: "$P_A(B) =$", attendu: pBA,
      erreurs: pcErr(pBA, [{ valeur: inter * pA, message: div }, { valeur: inter, message: "$P(A \\cap B)$ n'est pas $P_A(B)$ : il faut encore diviser par $P(A)$." }, { valeur: pA / inter, message: "Le quotient est à l'envers : c'est $P(A \\cap B)$ au numérateur. (Une probabilité ne dépasse jamais $1$.)" }]),
      aides: ["$P_A(B)$ est la probabilité de $B$ **sachant** $A$.", "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.", `Calcule $\\dfrac{${dec2(inter)}}{${dec2(pA)}}$.`],
      solution: `$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)} = \\dfrac{${dec2(inter)}}{${dec2(pA)}} = ${dec2(pBA)}$.`
    };
    if (t === "inter") return {
      enonce: `On donne $P(A) = ${dec2(pA)}$ et $P_A(B) = ${dec2(pBA)}$. Calcule $P(A \\cap B)$.`,
      mode: "nombre", prefixe: "$P(A \\cap B) =$", attendu: inter,
      erreurs: pcErr(inter, [{ valeur: pBA / pA, message: "On **multiplie** : $P(A \\cap B) = P(A) \\times P_A(B)$." }, { valeur: pA + pBA, message: "On multiplie les probabilités, on ne les additionne pas : $P(A \\cap B) = P(A) \\times P_A(B)$." }, { valeur: pBA, message: "$P_A(B)$ se calcule seulement parmi les issues de $A$ : il faut encore multiplier par $P(A)$." }]),
      aides: ["Sur un arbre, on multiplie les probabilités le long d'un chemin.", "$P(A \\cap B) = P(A) \\times P_A(B)$.", `Calcule $${dec2(pA)} \\times ${dec2(pBA)}$.`],
      solution: `$P(A \\cap B) = P(A) \\times P_A(B) = ${dec2(pA)} \\times ${dec2(pBA)} = ${dec2(inter)}$.`
    };
    if (t === "PA") return {
      enonce: `On donne $P_A(B) = ${dec2(pBA)}$ et $P(A \\cap B) = ${dec2(inter)}$. Calcule $P(A)$.`,
      mode: "nombre", prefixe: "$P(A) =$", attendu: pA,
      erreurs: pcErr(pA, [{ valeur: inter * pBA, message: "De $P(A \\cap B) = P(A) \\times P_A(B)$, on tire $P(A) = \\dfrac{P(A \\cap B)}{P_A(B)}$ : on divise." }, { valeur: pBA / inter, message: "Le quotient est à l'envers : $P(A) = \\dfrac{P(A \\cap B)}{P_A(B)}$." }, { valeur: 1 - pBA, message: "Ça, c'est $P_A(\\overline{B})$." }]),
      aides: ["Pars de la relation $P(A \\cap B) = P(A) \\times P_A(B)$.", "Ici l'inconnue est $P(A)$ : on divise les deux membres par $P_A(B)$.", `Calcule $\\dfrac{${dec2(inter)}}{${dec2(pBA)}}$.`],
      solution: `$P(A \\cap B) = P(A) \\times P_A(B)$, donc $P(A) = \\dfrac{P(A \\cap B)}{P_A(B)} = \\dfrac{${dec2(inter)}}{${dec2(pBA)}} = ${dec2(pA)}$.`
    };
    if (t === "contraire") {
      const nonB = +(1 - pBA).toFixed(2);
      return {
        enonce: `On donne $P(A) = ${dec2(pA)}$ et $P_A(\\overline{B}) = ${dec2(nonB)}$. Calcule $P(A \\cap B)$.`,
        mode: "nombre", prefixe: "$P(A \\cap B) =$", attendu: inter,
        erreurs: pcErr(inter, [{ valeur: pA * nonB, message: `Ça, c'est $P(A \\cap \\overline{B})$. Il faut d'abord $P_A(B) = 1 - ${dec2(nonB)}$.` }, { valeur: 1 - pA * nonB, message: "On ne prend pas le contraire du produit : calcule d'abord $P_A(B) = 1 - P_A(\\overline{B})$, puis multiplie par $P(A)$." }, { valeur: pA + pBA, message: "On multiplie les probabilités le long du chemin, on ne les additionne pas." }]),
        aides: ["Les branches issues du nœud $A$ ont pour somme $1$.", `$P_A(B) = 1 - P_A(\\overline{B}) = 1 - ${dec2(nonB)} = ${dec2(pBA)}$.`, "Puis $P(A \\cap B) = P(A) \\times P_A(B)$."],
        solution: `$P_A(B) = 1 - ${dec2(nonB)} = ${dec2(pBA)}$, puis $P(A \\cap B) = P(A) \\times P_A(B) = ${dec2(pA)} \\times ${dec2(pBA)} = ${dec2(inter)}$.`
      };
    }
    const c = pick(PC_FORMULE), a = pcPct(pA), b = pcPct(pBA), i = pcPct(inter);
    if (t === "ctx-inter") return {
      enonce: `${a} ${c.pop} ${c.estA} et, ${c.eux}, ${b} ${c.estB}. ${c.tire} Quelle est la probabilité ${c.qEt} ? (On note ${c.leg}.)`,
      mode: "nombre", prefixe: `$P(${c.A} \\cap ${c.B}) =$`, attendu: inter,
      erreurs: pcErr(inter, [{ valeur: pBA, message: `${b} est la probabilité **sachant** $${c.A}$ : $P_{${c.A}}(${c.B}) = ${dec2(pBA)}$. Il faut encore multiplier par $P(${c.A})$.` }, { valeur: pA + pBA, message: "On multiplie les probabilités, on ne les additionne pas." }, { valeur: pBA / pA, message: `On multiplie : $P(${c.A} \\cap ${c.B}) = P(${c.A}) \\times P_{${c.A}}(${c.B})$.` }]),
      aides: [`Traduis : $P(${c.A}) = ${dec2(pA)}$ et « ${c.eux} » donne une probabilité conditionnelle : $P_{${c.A}}(${c.B}) = ${dec2(pBA)}$.`, `$P(${c.A} \\cap ${c.B}) = P(${c.A}) \\times P_{${c.A}}(${c.B})$.`, `Calcule $${dec2(pA)} \\times ${dec2(pBA)}$.`],
      solution: `$P(${c.A}) = ${dec2(pA)}$ et $P_{${c.A}}(${c.B}) = ${dec2(pBA)}$, donc $P(${c.A} \\cap ${c.B}) = ${dec2(pA)} \\times ${dec2(pBA)} = ${dec2(inter)}$, soit ${i}.`
    };
    return {
      enonce: `${a} ${c.pop} ${c.estA} et ${i} ${c.pop} ${c.deux}. ${c.tireA} Quelle est la probabilité ${c.qB} ? (On note ${c.leg}.)`,
      mode: "nombre", prefixe: `$P_{${c.A}}(${c.B}) =$`, attendu: pBA,
      erreurs: pcErr(pBA, [{ valeur: inter, message: `Ça, c'est $P(${c.A} \\cap ${c.B})$, calculée sur toute la population. On sait ici que $${c.A}$ est réalisé : on divise par $P(${c.A})$.` }, { valeur: inter * pA, message: `On **divise** par $P(${c.A})$ : $P_{${c.A}}(${c.B}) = \\dfrac{P(${c.A} \\cap ${c.B})}{P(${c.A})}$.` }, { valeur: pA / inter, message: `Le quotient est à l'envers : c'est $P(${c.A} \\cap ${c.B})$ au numérateur.` }]),
      aides: [`Traduis : $P(${c.A}) = ${dec2(pA)}$ et $P(${c.A} \\cap ${c.B}) = ${dec2(inter)}$.`, `On cherche la probabilité de $${c.B}$ **sachant** $${c.A}$ : $P_{${c.A}}(${c.B}) = \\dfrac{P(${c.A} \\cap ${c.B})}{P(${c.A})}$.`, `Calcule $\\dfrac{${dec2(inter)}}{${dec2(pA)}}$.`],
      solution: `$P_{${c.A}}(${c.B}) = \\dfrac{P(${c.A} \\cap ${c.B})}{P(${c.A})} = \\dfrac{${dec2(inter)}}{${dec2(pA)}} = ${dec2(pBA)}$, soit ${b}.`
    };
  };

  GEN["pc-arbre"] = function () {
    const ctx = Math.random() < 0.5 ? null : pick(PC_CTX), noms = ctx ? [ctx.X, `~${ctx.X}`, ctx.Y, `~${ctx.Y}`] : NOMS_ARBRE;
    const P = ctx ? pcValeurs(ctx) : pcBranches(), lab = P.map(pcV), Xt = pcTex(noms[0]), Yt = pcTex(noms[2]);
    const intro = ctx ? `${ctx.intro} On note ${ctx.leg}. ` : "";
    const nomsB = [`P(${Xt})`, `P(\\overline{${Xt}})`, `P_{${Xt}}(${Yt})`, `P_{${Xt}}(\\overline{${Yt}})`, `P_{\\overline{${Xt}}}(${Yt})`, `P_{\\overline{${Xt}}}(\\overline{${Yt}})`];
    const t = pick(["branche", "branche", "chemin", "chemin", "chemin", "retrouver"]);
    if (t === "branche") {
      const k = rand(1, 5), shown = lab.slice(); shown[k] = "?";
      const paire = k === 1 ? 0 : k % 2 === 0 ? k + 1 : k - 1;
      return {
        enonce: `${intro}Complète la branche marquée d'un **?** dans l'arbre pondéré : que vaut $${nomsB[k]}$ ?`,
        figure: pcArbre(noms, shown),
        mode: "nombre", prefixe: "? =", attendu: P[k],
        erreurs: pcErr(P[k], [{ valeur: P[paire], message: "Les deux branches qui partent d'un même nœud n'ont pas la même probabilité : leur **somme** vaut $1$." }, { valeur: k >= 2 ? 1 - P[0] : 1 - P[2], message: "Ce n'est pas le bon nœud : regarde les deux branches qui partent du même point que la branche **?**." }, { valeur: 1 + P[paire], message: "On **soustrait** à $1$ la probabilité de l'autre branche." }]),
        aides: ["La somme des probabilités des branches qui partent d'un même nœud vaut $1$.", "Repère l'autre branche qui part du même nœud.", `$1 - ${dec2(P[paire])}$.`],
        solution: `Les deux branches qui partent du même nœud ont pour somme $1$ : $${nomsB[k]} = 1 - ${dec2(P[paire])} = ${dec2(P[k])}$.`
      };
    }
    const chemin = rand(0, 3), ch = [[0, 2], [0, 3], [1, 4], [1, 5]][chemin], f = [P[ch[0]], P[ch[1]]];
    const ev = [`${Xt} \\cap ${Yt}`, `${Xt} \\cap \\overline{${Yt}}`, `\\overline{${Xt}} \\cap ${Yt}`, `\\overline{${Xt}} \\cap \\overline{${Yt}}`][chemin];
    const prob = +(f[0] * f[1]).toFixed(4);
    if (t === "chemin") {
      const autre = [[0, 3], [0, 2], [1, 5], [1, 4]][chemin], voisin = [[1, 4], [1, 5], [0, 2], [0, 3]][chemin];
      return {
        enonce: `${intro}D'après l'arbre pondéré, calcule $P(${ev})$.`,
        figure: pcArbre(noms, lab),
        mode: "nombre", prefixe: `$P(${ev}) =$`, attendu: prob,
        erreurs: pcErr(prob, [{ valeur: f[0] + f[1], message: "Le long d'un chemin, on **multiplie** les probabilités (on n'additionne pas)." }, { valeur: P[autre[0]] * P[autre[1]], message: "Ce chemin ne mène pas au bon événement : vérifie la **seconde** branche." }, { valeur: P[voisin[0]] * P[voisin[1]], message: "Ce chemin ne part pas du bon côté : vérifie la **première** branche." }]),
        aides: [`Repère le chemin qui mène à $${ev}$.`, "On multiplie les probabilités rencontrées le long du chemin.", `$${dec2(f[0])} \\times ${dec2(f[1])}$.`],
        solution: `On suit le chemin qui mène à $${ev}$ : $P(${ev}) = ${dec2(f[0])} \\times ${dec2(f[1])} = ${dec2(prob)}$.`
      };
    }
    // retrouver une probabilité conditionnelle connaissant la probabilité du chemin
    const shown = lab.slice(); shown[ch[1]] = "?";
    return {
      enonce: `${intro}Dans l'arbre pondéré, une branche est inconnue. On sait que $P(${ev}) = ${dec2(prob)}$. Quelle probabilité porte la branche marquée d'un **?** ?`,
      figure: pcArbre(noms, shown),
      mode: "nombre", prefixe: "? =", attendu: f[1],
      erreurs: pcErr(f[1], [{ valeur: prob * f[0], message: `On **divise** : la branche vaut $\\dfrac{${dec2(prob)}}{${dec2(f[0])}}$.` }, { valeur: prob, message: "$P(" + ev + ")$ est la probabilité de tout le chemin, pas celle de la seconde branche." }, { valeur: f[0] / prob, message: "Le quotient est à l'envers : probabilité du chemin divisée par celle de la première branche." }]),
      aides: ["La probabilité d'un chemin est le **produit** des probabilités de ses branches.", `$${dec2(f[0])} \\times ? = ${dec2(prob)}$.`, `Donc $? = \\dfrac{${dec2(prob)}}{${dec2(f[0])}}$.`],
      solution: `$P(${ev}) = ${dec2(f[0])} \\times ${nomsB[ch[1]]}$, donc $${nomsB[ch[1]]} = \\dfrac{${dec2(prob)}}{${dec2(f[0])}} = ${dec2(f[1])}$.`
    };
  };

  // Interpréter les pondérations d'un arbre (questions à choix, avec l'arbre)
  GEN["pc-ponderation"] = function () {
    const c = pick(PC_CTX), noms = [c.X, `~${c.X}`, c.Y, `~${c.Y}`], P = pcValeurs(c), lab = P.map(pcV);
    const k = rand(2, 5), x = k < 4 ? 0 : 1, y = k % 2; // branche de (non) X vers (non) Y
    const Xt = x ? `\\overline{${c.X}}` : c.X, Yt = y ? `\\overline{${c.Y}}` : c.Y, w = P[k], p1 = P[x];
    const t = pick(["sens", "sens", "valeur", "phrase", "phrase", "calcul", "chemin"]);
    let q, bonne, faux, sol;
    if (t === "sens") {
      q = `Que représente le nombre $${dec2(w)}$ écrit sur la branche qui va de $${Xt}$ à $${Yt}$ ?`;
      bonne = `$P_{${Xt}}(${Yt})$`; faux = [`$P_{${Yt}}(${Xt})$`, `$P(${Xt} \\cap ${Yt})$`, `$P(${Yt})$`];
      sol = `Au second niveau, chaque branche porte une probabilité **conditionnelle** : on sait déjà que $${Xt}$ est réalisé. Le nombre $${dec2(w)}$ est donc $P_{${Xt}}(${Yt})$ : sachant ${queN(c.xi[x])}, la probabilité ${queN(c.ys[y])}.`;
    } else if (t === "valeur") {
      q = `D'après l'arbre, que vaut $P_{${Xt}}(${Yt})$ ?`;
      bonne = `$${dec2(w)}$`; faux = [2, 3, 4, 5].filter((j) => j !== k).map((j) => `$${dec2(P[j])}$`).concat([`$${dec2(p1)}$`]);
      sol = `$P_{${Xt}}(${Yt})$ se lit sur la branche qui part du nœud $${Xt}$ et va vers $${Yt}$ : elle porte $${dec2(w)}$.`;
    } else if (t === "phrase") {
      const v = `$${dec2(w)}$`;
      q = `Quelle phrase traduit le nombre $${dec2(w)}$ écrit sur la branche qui va de $${Xt}$ à $${Yt}$ ?`;
      bonne = `Sachant ${queN(c.xi[x])}, la probabilité ${queN(c.ys[y])} est ${v}.`;
      faux = [`Sachant ${queN(c.yi[y])}, la probabilité ${queN(c.xs[x])} est ${v}.`, `La probabilité ${queN(c.xs[x])} et ${queN(c.ys[y])} est ${v}.`, `La probabilité ${queN(c.ys[y])} est ${v}.`];
      sol = `Une branche du second niveau donne une probabilité **sachant** l'événement du premier niveau : c'est $P_{${Xt}}(${Yt}) = ${dec2(w)}$. Sachant ${queN(c.xi[x])}, la probabilité ${queN(c.ys[y])} est $${dec2(w)}$. Ce n'est ni $P_{${Yt}}(${Xt})$ (conditionnement inversé), ni $P(${Xt} \\cap ${Yt})$ (probabilité du chemin).`;
    } else if (t === "calcul") {
      q = `Quel calcul donne $P(${Xt} \\cap ${Yt})$ ?`;
      bonne = `$${dec2(p1)} \\times ${dec2(w)}$`; faux = [`$${dec2(p1)} + ${dec2(w)}$`, `$${dec2(w)}$`, `$${dec2(P[1 - x])} \\times ${dec2(w)}$`];
      sol = `On suit le chemin $${Xt}$ puis $${Yt}$ et on **multiplie** les probabilités des branches : $P(${Xt} \\cap ${Yt}) = P(${Xt}) \\times P_{${Xt}}(${Yt}) = ${dec2(p1)} \\times ${dec2(w)} = ${dec2(+(p1 * w).toFixed(4))}$.`;
    } else {
      q = `Le produit $${dec2(p1)} \\times ${dec2(w)}$ calcule la probabilité de quel événement ?`;
      bonne = `$${Xt} \\cap ${Yt}$`; faux = [`$${Yt}$ sachant $${Xt}$`, `$${Yt}$`, `$${Xt} \\cup ${Yt}$`];
      sol = `Le produit des branches $${Xt}$ puis $${Yt}$ est la probabilité du chemin : $P(${Xt} \\cap ${Yt}) = ${dec2(+(p1 * w).toFixed(4))}$. La probabilité de $${Yt}$ sachant $${Xt}$, c'est seulement la seconde branche, $${dec2(w)}$.`;
    }
    const chx = melangeChoix(bonne, faux);
    return {
      enonce: `${c.intro} On note ${c.leg}. ${q}`,
      figure: pcArbre(noms, lab),
      mode: "choix", choix: chx.choix, attendu: chx.attendu,
      aides: ["Premier niveau de l'arbre : $P(" + c.X + ")$ et $P(\\overline{" + c.X + "})$.", "Second niveau : des probabilités **conditionnelles** ; le nœud de départ va en indice.", "La probabilité d'un chemin est le **produit** des probabilités de ses branches."],
      solution: sol
    };
  };

  GEN["pc-traduire"] = function () {
    // Questions fabriquées à partir des contextes : probabilité conditionnelle, intersection, probabilité simple
    const c = pick(PC_CTX), X = c.X, Y = c.Y, bar = (L, k) => (k ? `\\overline{${L}}` : L);
    const t = pick(["cond", "cond", "cond", "parmi", "parmi", "inter", "simple"]), a = rand(0, 1), b = rand(0, 1), sens = Math.random() < 0.5; // sens : condition sur X (sinon sur Y)
    const C = sens ? bar(X, a) : bar(Y, b), E = sens ? bar(Y, b) : bar(X, a), Cn = sens ? bar(X, 1 - a) : bar(Y, 1 - b);
    let txt, bonne, faux;
    if (t === "cond") {
      txt = sens ? `la probabilité ${queN(c.ys[b])}, sachant ${queN(c.xi[a])}` : `la probabilité ${queN(c.xs[a])}, sachant ${queN(c.yi[b])}`;
      bonne = `P_{${C}}(${E})`; faux = [`P_{${E}}(${C})`, `P(${C} \\cap ${E})`, `P_{${Cn}}(${E})`];
    } else if (t === "parmi") {
      txt = sens ? `la proportion ${pcDe(c.yg[b])} parmi les ${c.xg[a]}` : `la proportion ${pcDe(c.xg[a])} parmi les ${c.yg[b]}`;
      bonne = `P_{${C}}(${E})`; faux = [`P_{${E}}(${C})`, `P(${C} \\cap ${E})`, `P(${E})`];
    } else if (t === "inter") {
      txt = `la probabilité ${queN(c.xs[a])} et ${queN(c.ys[b])}`;
      bonne = `P(${bar(X, a)} \\cap ${bar(Y, b)})`; faux = [`P_{${bar(X, a)}}(${bar(Y, b)})`, `P_{${bar(Y, b)}}(${bar(X, a)})`, `P(${bar(X, a)}) + P(${bar(Y, b)})`];
    } else {
      txt = sens ? `la probabilité ${queN(c.ys[b])}, sans autre information` : `la probabilité ${queN(c.xs[a])}, sans autre information`;
      bonne = `P(${E})`; faux = [`P_{${C}}(${E})`, `P(${C} \\cap ${E})`, `P_{${E}}(${C})`];
    }
    // Vocabulaire des tests de dépistage
    if (X === "M" && Y === "T" && Math.random() < 0.35) {
      [txt, bonne, faux] = pick([
        ["la **sensibilité** du test (la probabilité que le test soit positif pour une personne malade)", "P_M(T)", ["P_T(M)", "P(M \\cap T)", "P_{\\overline{M}}(\\overline{T})"]],
        ["la **spécificité** du test (la probabilité que le test soit négatif pour une personne saine)", "P_{\\overline{M}}(\\overline{T})", ["P_{\\overline{T}}(\\overline{M})", "P(\\overline{M} \\cap \\overline{T})", "P_M(T)"]],
        ["la probabilité d'un **faux positif**, c'est-à-dire qu'une personne saine ait un test positif", "P_{\\overline{M}}(T)", ["P_T(\\overline{M})", "P_M(\\overline{T})", "P(\\overline{M} \\cap T)"]],
        ["la probabilité d'un **faux négatif**, c'est-à-dire qu'une personne malade ait un test négatif", "P_M(\\overline{T})", ["P_{\\overline{T}}(M)", "P_{\\overline{M}}(T)", "P(M \\cap \\overline{T})"]],
        ["la probabilité qu'une personne dont le test est positif soit **vraiment** malade", "P_T(M)", ["P_M(T)", "P(M \\cap T)", "P(M)"]]
      ]);
    }
    const ch = melangeChoix(`$${bonne}$`, faux.map((f) => `$${f}$`));
    return {
      enonce: `${c.intro} On note ${c.leg}. Comment note-t-on ${txt} ?`,
      mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["« Sachant que… », « parmi les… » : ce qui est connu va en **indice**.", "« … et … » : c'est une intersection $\\cap$, calculée sur toute la population.", `$\\overline{${X}}$ est le contraire de $${X}$, $\\overline{${Y}}$ celui de $${Y}$.`],
      solution: `C'est $${bonne}$. Attention : $P_{${X}}(${Y})$ et $P_{${Y}}(${X})$ sont des probabilités **différentes** : l'événement en indice est celui qu'on sait réalisé.`
    };
  };

  GEN["pc-depistage"] = function () {
    // Population fictive : tous les effectifs sont entiers
    let prev, se, sp, N, M, S, VP, FN, FP, VN;
    do {
      prev = pick([0.005, 0.01, 0.02, 0.03, 0.04, 0.05, 0.08, 0.1, 0.15, 0.2]); se = pick([0.8, 0.85, 0.9, 0.95, 0.98, 0.99]); sp = pick([0.8, 0.85, 0.9, 0.95, 0.97, 0.98, 0.99]); N = pick([1000, 10000, 10000, 100000]);
      M = Math.round(N * prev); S = N - M; VP = Math.round(M * se); FN = M - VP; FP = Math.round(S * (1 - sp)); VN = S - FP;
    } while (Math.abs(M - N * prev) > 1e-6 || Math.abs(VP - M * se) > 1e-6 || Math.abs(FP - S * (1 - sp)) > 1e-6 || VP === 0 || FP === 0 || FN === 0);
    const TP = VP + FP, ptm = VP / TP, mal = pick(["de la dengue", "de la leptospirose", "du paludisme", "du diabète", "d'une carence en fer"]);
    const fig = pcArbre(["M", "~M", "T", "~T"], [prev, 1 - prev, se, 1 - se, 1 - sp, sp].map(pcV));
    const ctx = `Au dispensaire de Mamoudzou, un test de dépistage ${mal} est utilisé. ${pcPct(prev)} de la population est malade ; si la personne est malade, le test est positif dans ${pcPct(se)} des cas (sensibilité) ; si elle est saine, il est négatif dans ${pcPct(sp)} des cas (spécificité). On imagine une population de $${nb(N)}$ personnes (arbre ci-dessous, $M$ : « malade », $T$ : « test positif »).`;
    // tableau d'effectifs court (il tient sur un téléphone) : lignes M et non M, colonnes T et non T
    const tab = (cache) => ({ lignes: [["", "T", "\\overline{T}", "\\text{Total}"], ["M", cache.vp || nb(VP), cache.fn || nb(FN), nb(M)], ["\\overline{M}", cache.fp || nb(FP), cache.vn || nb(VN), nb(S)], ["\\text{Total}", cache.tp || nb(TP), cache.tn || nb(FN + VN), nb(N)]] });
    let q = pick(["fp", "fp", "vp", "fn", "total", "total", "ptm", "ptm", "choix"]);
    if (q === "ptm" && Math.abs(((ptm * 100) % 1) - 0.5) < 1e-6) q = "choix"; // pas d'arrondi ambigu (…,5)
    const AI = [`Malades : $${nb(N)} \\times ${dec2(prev)} = ${nb(M)}$ ; saines : $${nb(N)} - ${nb(M)} = ${nb(S)}$.`, `Une personne saine a un test positif avec la probabilité $1 - ${dec2(sp)} = ${dec2(1 - sp)}$ ; une personne malade avec la probabilité $${dec2(se)}$.`];
    if (q === "fp") return {
      enonce: `${ctx} Combien de **faux positifs** (personnes saines dont le test est positif) ?`, figure: fig,
      mode: "nombre", prefixe: "Faux positifs :", attendu: FP,
      erreurs: pcErr(FP, [{ valeur: VN, message: "Ça, ce sont les personnes saines au test **négatif** (vrais négatifs)." }, { valeur: Math.round(N * (1 - sp)), message: `On applique $${dec2(1 - sp)}$ aux personnes **saines** seulement ($${nb(S)}$), pas à toute la population.` }, { valeur: FN, message: "Ça, ce sont les faux **négatifs** (malades au test négatif)." }]),
      aides: AI.concat([`Calcule $${nb(S)} \\times ${dec2(1 - sp)}$.`]),
      solution: `Saines : $${nb(N)} - ${nb(M)} = ${nb(S)}$. Faux positifs : $${nb(S)} \\times ${dec2(1 - sp)} = ${nb(FP)}$.`
    };
    if (q === "vp") return {
      enonce: `${ctx} Combien de personnes sont malades **et** ont un test positif ?`, figure: fig,
      mode: "nombre", prefixe: "Vrais positifs :", attendu: VP,
      erreurs: pcErr(VP, [{ valeur: Math.round(N * se), message: `On applique la sensibilité aux **malades** seulement ($${nb(M)}$).` }, { valeur: FN, message: "Ça, ce sont les malades au test **négatif**." }, { valeur: M, message: "Tous les malades n'ont pas un test positif : multiplie par la sensibilité." }]),
      aides: AI.concat([`Calcule $${nb(M)} \\times ${dec2(se)}$.`]),
      solution: `Malades : $${nb(N)} \\times ${dec2(prev)} = ${nb(M)}$. Malades au test positif : $${nb(M)} \\times ${dec2(se)} = ${nb(VP)}$.`
    };
    if (q === "fn") return {
      enonce: `${ctx} Combien de **faux négatifs** (personnes malades dont le test est négatif) ?`, figure: fig,
      mode: "nombre", prefixe: "Faux négatifs :", attendu: FN,
      erreurs: pcErr(FN, [{ valeur: VP, message: "Ça, ce sont les malades au test **positif**." }, { valeur: FP, message: "Ça, ce sont les faux **positifs** (personnes saines au test positif)." }, { valeur: Math.round(N * (1 - se)), message: `On applique $1 - ${dec2(se)}$ aux **malades** seulement ($${nb(M)}$).` }]),
      aides: AI.concat([`Un malade a un test négatif avec la probabilité $1 - ${dec2(se)} = ${dec2(1 - se)}$ : calcule $${nb(M)} \\times ${dec2(1 - se)}$.`]),
      solution: `Malades : $${nb(M)}$. Faux négatifs : $${nb(M)} \\times ${dec2(1 - se)} = ${nb(FN)}$.`
    };
    if (q === "total") return {
      enonce: `${ctx} On a commencé le tableau d'effectifs ci-dessous. Combien de personnes ont un test **positif** au total ?`, figure: fig,
      tableau: tab({ fn: "\\ldots", vn: "\\ldots", tp: "?", tn: "\\ldots" }),
      mode: "nombre", prefixe: "Tests positifs :", attendu: TP,
      erreurs: pcErr(TP, [{ valeur: VP, message: "N'oublie pas les faux positifs : des personnes saines peuvent aussi avoir un test positif." }, { valeur: FP, message: "N'oublie pas les malades au test positif." }, { valeur: M, message: "Ça, c'est le nombre de malades : tous n'ont pas un test positif, et des personnes saines en ont un." }]),
      aides: ["La colonne $T$ (test positif) contient les malades positifs **et** les sains positifs.", `Malades positifs : $${nb(VP)}$ ; sains positifs (faux positifs) : $${nb(FP)}$.`, "Additionne les deux cases de la colonne."],
      solution: `Total de la colonne $T$ (test positif) : $${nb(VP)} + ${nb(FP)} = ${nb(TP)}$ personnes.`
    };
    const r = Math.round(ptm * 100) / 100;
    if (q === "ptm") return {
      enonce: `${ctx} Le tableau d'effectifs est complété ci-dessous. Une personne a un test **positif** : quelle est la probabilité qu'elle soit malade, $P_T(M)$ ? Donne l'arrondi au centième.`, figure: fig,
      tableau: tab({}),
      mode: "nombre", prefixe: "$P_T(M) \\approx$", attendu: r, tolerance: 0.005,
      erreurs: [{ valeur: se, message: "Ça, c'est $P_M(T)$ (la sensibilité). On demande $P_T(M)$ : on se place parmi les tests **positifs**." }, { valeur: VP / N, message: "Ça, c'est $P(M \\cap T)$ : on divise par le nombre de tests positifs, pas par toute la population." }],
      aides: ["On sait que le test est positif : on se place dans la colonne $T$.", `Total de cette colonne : $${nb(VP)} + ${nb(FP)} = ${nb(TP)}$.`, `$P_T(M) = \\dfrac{${nb(VP)}}{${nb(TP)}}$.`],
      solution: `Parmi les $${nb(TP)}$ tests positifs, $${nb(VP)}$ concernent des malades : $P_T(M) = \\dfrac{${nb(VP)}}{${nb(TP)}} \\approx ${nb(r)}$.\n\n${ptm < 0.5 ? "Moins d'une chance sur deux, alors que le test semble fiable : la maladie est assez rare, et les faux positifs sont nombreux. On confirme toujours par un second test." : `C'est bien différent de la sensibilité $P_M(T) = ${dec2(se)}$ : on a inversé le conditionnement.`}`
    };
    const pct = (x) => `${nb(Math.round(x * 100))}\\,\\%`;
    const faux = [pct(se), pct(1 - ptm), pct(prev), pct(1 - sp), pct(VP / N)];
    const ch = melangeChoix(`$${pct(ptm)}$`, faux.filter((f) => f !== pct(ptm) && f !== "0\\,\\%").map((f) => `$${f}$`));
    return {
      enonce: `${ctx} Le tableau d'effectifs est complété ci-dessous. Parmi les personnes dont le test est positif, quelle est environ la proportion de malades ?`, figure: fig,
      tableau: tab({}),
      mode: "choix", choix: ch.choix, attendu: ch.attendu,
      aides: ["On se restreint aux personnes dont le test est positif : la colonne $T$.", `Elle contient $${nb(TP)}$ personnes, dont $${nb(VP)}$ malades.`, `Calcule $\\dfrac{${nb(VP)}}{${nb(TP)}}$.`],
      solution: `$\\dfrac{${nb(VP)}}{${nb(TP)}} \\approx ${nb(Math.round(ptm * 1000) / 1000)}$, soit environ $${pct(ptm)}$ : c'est $P_T(M)$. Ce n'est pas la sensibilité $P_M(T) = ${pct(se)}$ : on a inversé le conditionnement.`
    };
  };

  GEN["pc-python"] = function () {
    const V = [0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9];
    let p1, p2, p3; do { p1 = pick(V); p2 = pick(V); p3 = pick(V); } while (p2 === p3 || p1 === p2);
    const [a, b] = pick([["a", "b"], ["pluie", "retard"], ["malade", "positif"], ["vaccine", "grippe"], ["calme", "thon"], ["fille", "sport"]]);
    const t = rand(0, 5);
    let prog, r, sol, err, chemin;
    if (t <= 3) {
      const na = t === 2 || t === 3, nbb = t === 1 || t === 3;
      prog = `from random import random\n\ndef experience():\n    ${a} = random() < ${p1}\n    ${b} = random() < ${p2}\n    return ${na ? "not " : ""}${a} and ${nbb ? "not " : ""}${b}`;
      const q1 = na ? 1 - p1 : p1, q2 = nbb ? 1 - p2 : p2;
      r = +(q1 * q2).toFixed(4);
      chemin = `$\\texttt{${a}}$ ${na ? "faux" : "vrai"} (probabilité $${dec2(q1)}$) puis $\\texttt{${b}}$ ${nbb ? "faux" : "vrai"} (probabilité $${dec2(q2)}$)`;
      sol = `$P = ${dec2(q1)} \\times ${dec2(q2)} = ${dec2(r)}$.`;
      err = [{ valeur: q1 + q2, message: "Le long d'un chemin de l'arbre, on **multiplie** les probabilités." }, { valeur: p1 * p2, message: "Attention au $\\texttt{not}$ : il faut que la variable soit **fausse**, ce qui arrive avec la probabilité $1 - p$." }, { valeur: 1 - q1 * q2, message: "Ça, c'est la probabilité que la fonction renvoie $\\texttt{False}$." }];
    } else {
      // deux épreuves dépendantes : la seconde dépend du résultat de la première (comme un arbre)
      const non = t === 5;
      prog = `from random import random\n\ndef experience():\n    ${a} = random() < ${p1}\n    if ${a}:\n        ${b} = random() < ${p2}\n    else:\n        ${b} = random() < ${p3}\n    return ${non ? "not " : ""}${a} and ${b}`;
      const q1 = non ? 1 - p1 : p1, q2 = non ? p3 : p2;
      r = +(q1 * q2).toFixed(4);
      chemin = `$\\texttt{${a}}$ ${non ? "faux" : "vrai"} (probabilité $${dec2(q1)}$), puis $\\texttt{${b}}$ vrai **dans ce cas** (probabilité $${dec2(q2)}$, ligne ${non ? "du $\\texttt{else}$" : "du $\\texttt{if}$"})`;
      sol = `C'est un arbre : premier niveau $\\texttt{${a}}$, second niveau $\\texttt{${b}}$ avec des probabilités qui dépendent de $\\texttt{${a}}$. $P = ${dec2(q1)} \\times ${dec2(q2)} = ${dec2(r)}$.`;
      err = [{ valeur: q1 + q2, message: "Le long d'un chemin de l'arbre, on **multiplie** les probabilités." }, { valeur: q1 * (non ? p2 : p3), message: `Ce n'est pas la bonne branche : quand $\\texttt{${a}}$ est ${non ? "faux" : "vrai"}, c'est la ligne ${non ? "du $\\texttt{else}$" : "du $\\texttt{if}$"} qui s'exécute.` }, { valeur: q2, message: `Il faut aussi que $\\texttt{${a}}$ soit ${non ? "faux" : "vrai"} : multiplie par sa probabilité.` }];
    }
    return {
      enonce: `$\\texttt{random()}$ renvoie un nombre au hasard dans $[0\\,;1[$ : $\\texttt{random() < p}$ est vrai avec la probabilité $p$. On considère :\n\n\`\`\`python\n${prog}\n\`\`\`\n\nOn répète l'expérience un grand nombre de fois. Vers quelle valeur la fréquence de $\\texttt{True}$ se rapproche-t-elle ?`,
      mode: "nombre", prefixe: "Valeur :", attendu: r,
      erreurs: pcErr(r, err),
      aides: ["Fais l'arbre de l'expérience : un niveau par variable.", `La fonction renvoie $\\texttt{True}$ pour un seul chemin : ${chemin}.`, "Sur l'arbre, on multiplie le long du chemin."],
      solution: `${sol} D'après la loi des grands nombres, la fréquence observée se rapproche de $${dec2(r)}$.`
    };
  };

  /* Figures du cours, des QCM et de la fiche méthode du chapitre 15 */
  FIGURES["pc-cours-restriction"] = () => {
    let s = `<svg class="graph" viewBox="0 0 320 180" role="img" aria-label="Sachant A : l'univers se réduit à A ; P_A(B) est la part de A ∩ B dans A">`;
    s += `<defs><clipPath id="pc-clip-a"><circle cx="122" cy="82" r="60"/></clipPath></defs>`;
    s += `<rect x="6" y="6" width="308" height="168" rx="10" style="fill:none;stroke:var(--doux);stroke-width:1.2;stroke-dasharray:5 4"/><text class="g-label" x="18" y="26" style="fill:var(--doux)">Ω</text>`;
    s += `<circle cx="122" cy="82" r="60" style="fill:var(--lagon-pale);stroke:var(--lagon);stroke-width:2.6"/>`;
    s += `<circle cx="192" cy="82" r="60" clip-path="url(#pc-clip-a)" style="fill:var(--ylang-pale)"/>`;
    s += `<circle cx="192" cy="82" r="60" style="fill:none;stroke:var(--courbe2);stroke-width:1.4;stroke-dasharray:5 4"/>`;
    s += `<text class="g-clabel g-curve-0" x="80" y="86">A</text><text class="g-clabel g-curve-1" x="230" y="86">B</text><text class="g-label" x="157" y="86" text-anchor="middle">A ∩ B</text>`;
    s += `<text class="g-label" x="122" y="164" text-anchor="middle">nouvel univers : A</text>`;
    return s + `</svg>`;
  };
  // Tableau croisé en figure (texte simple ; espace fine insécable dans les nombres : « 9 800 » ne se coupe pas)
  const pcTable = (L) => `<div class="scroll-x"><table class="valeurs croise">${L.map((l, i) => `<tr>${l.map((v, j) => { const t = String(v).replace(/(\d) (\d)/g, "$1&#8239;$2"); return i === 0 || j === 0 ? `<th>${t}</th>` : `<td>${t}</td>`; }).join("")}</tr>`).join("")}</table></div>`;
  FIGURES["pc-cours-tests"] = () => pcTable([["", "Test positif", "Test négatif"], ["Malade", "vrai positif", "faux négatif"], ["Saine", "faux positif", "vrai négatif"]]);
  FIGURES["pc-cours-10000"] = () => pcTable([["", "Test positif", "Test négatif", "Total"], ["Malades", "190", "10", "200"], ["Saines", "980", "8 820", "9 800"], ["Total", "1 170", "8 830", "10 000"]]);
  FIGURES["pc-qcm-barge"] = () => pcArbre(["A", "~A", "R", "~R"], ["0,3", "0,7", "0,6", "0,4", "0,1", "0,9"]);
  FIGURES["pc-qcm-vaccin"] = () => pcArbre(["V", "~V", "G", "~G"], ["0,8", "?", "0,1", "0,9", "0,4", "0,6"]);
  FIGURES["pc-qcm-tableau"] = () => pcTable([["", "Test positif", "Test négatif", "Total"], ["Malades", "90", "10", "100"], ["Saines", "495", "9 405", "9 900"], ["Total", "585", "9 415", "10 000"]]);
  /* ---------- Schémas des cours de Seconde (chapitres 4 à 17) ---------- */
  // Tableau de signes. xs : valeurs de la 1re ligne (textes, ±∞ compris) ;
  // lignes : [{ nom, cases }] avec cases = [signe, marque, signe, marque, …, signe] (marque : "0", "||" ou "")
  function tabsigne(xs, lignes) {
    const W = 320, g = 78, hR = 30, H = hR * (lignes.length + 1) + 2, n = xs.length;
    const X = (k) => g + 16 + (k * (W - g - 32)) / (n - 1);
    let s = `<svg class="graph tabvar" viewBox="0 0 ${W} ${H}" role="img" aria-label="Tableau de signes">`;
    s += `<g class="g-axis"><rect x="1" y="1" width="${W - 2}" height="${H - 2}" fill="none" stroke-width="1.2" style="stroke:var(--doux)"/><line x1="${g}" y1="1" x2="${g}" y2="${H - 1}"/>`;
    for (let r = 1; r <= lignes.length; r++) s += `<line x1="1" y1="${r * hR}" x2="${W - 1}" y2="${r * hR}"/>`;
    s += `</g><text class="g-label" x="${g / 2}" y="20" text-anchor="middle">x</text>`;
    xs.forEach((x, k) => { s += `<text class="g-label" x="${X(k)}" y="20" text-anchor="middle">${x}</text>`; });
    lignes.forEach((l, r) => {
      const y0 = (r + 1) * hR, yc = y0 + 20, der = r === lignes.length - 1;
      s += `<text class="g-label" x="${g / 2}" y="${yc}" text-anchor="middle" ${der ? 'style="fill:var(--lagon)"' : ""}>${l.nom}</text>`;
      l.cases.forEach((c, i) => {
        if (i % 2 === 0) { const xm = (X(i / 2) + X(i / 2 + 1)) / 2; s += `<text class="g-clabel" x="${xm}" y="${yc + 1}" text-anchor="middle" style="fill:${c === "+" ? "var(--lagon)" : c === "?" ? "var(--ylang)" : "var(--faux)"}">${c === "-" ? "−" : c}</text>`; }
        else {
          const xv = X((i + 1) / 2);
          if (c === "||") s += `<line x1="${xv - 2}" y1="${y0}" x2="${xv - 2}" y2="${y0 + hR}" style="stroke:var(--encre);stroke-width:1.2"/><line x1="${xv + 2}" y1="${y0}" x2="${xv + 2}" y2="${y0 + hR}" style="stroke:var(--encre);stroke-width:1.2"/>`;
          else { s += `<line x1="${xv}" y1="${y0}" x2="${xv}" y2="${y0 + hR}" style="stroke:var(--trait);stroke-width:1;stroke-dasharray:3 3"/>`; if (c) s += `<text class="g-label" x="${xv}" y="${yc}" text-anchor="middle" style="paint-order:stroke;stroke:var(--surface);stroke-width:4px">${c}</text>`; }
        }
      });
    });
    return s + `</svg>`;
  }
  FIGURES["tabsigne-produit"] = () => tabsigne(["−∞", "−2", "3", "+∞"], [{ nom: "x + 2", cases: ["-", "0", "+", "", "+"] }, { nom: "3 − x", cases: ["+", "", "+", "0", "-"] }, { nom: "produit", cases: ["-", "0", "+", "0", "-"] }]);
  FIGURES["tabsigne-quotient"] = () => tabsigne(["−∞", "−4", "3", "+∞"], [{ nom: "x + 4", cases: ["-", "0", "+", "", "+"] }, { nom: "x − 3", cases: ["-", "", "-", "0", "+"] }, { nom: "quotient", cases: ["+", "0", "-", "||", "+"] }]);

  // Chapitre 4 : multiples de 15 et de 20 sur une droite graduée (deux barges)
  FIGURES["multiples-barges"] = () => {
    const W = 320, X = (v) => 16 + (v * (W - 32)) / 65;
    let s = `<svg class="graph" viewBox="0 0 ${W} 120" role="img" aria-label="Multiples de 15 et de 20 jusqu'à 60 : le premier multiple commun est 60">`;
    s += `<g class="g-axis"><line x1="${X(0)}" y1="60" x2="${X(65)}" y2="60"/></g><g class="g-tick">`;
    for (let v = 0; v <= 60; v += 5) s += `<line x1="${X(v)}" y1="56" x2="${X(v)}" y2="64" style="stroke:var(--doux)"/>`;
    for (let v = 0; v <= 60; v += 10) s += `<text x="${X(v)}" y="78" text-anchor="middle">${v}</text>`;
    s += `</g>`;
    [15, 30, 45, 60].forEach((v, i) => { s += `<path class="g-curve g-curve-0" d="M${X(v - 15)} 54 Q${(X(v - 15) + X(v)) / 2} 22 ${X(v)} 54"/>`; });
    [20, 40, 60].forEach((v) => { s += `<path class="g-curve g-curve-1" d="M${X(v - 20)} 66 Q${(X(v - 20) + X(v)) / 2} 104 ${X(v)} 66"/>`; });
    s += `<text class="g-clabel g-curve-0" x="${X(7.5)}" y="22" text-anchor="middle">+15</text><text class="g-clabel g-curve-1" x="${X(10)}" y="112" text-anchor="middle">+20</text>`;
    s += `<circle class="g-point" cx="${X(60)}" cy="60" r="5"/><text class="g-plabel" x="${X(60) + 8}" y="50">60</text>`;
    return s + `</svg>`;
  };

  // Chapitre 5 : (a + b)² découpé en a², ab, ab, b²
  FIGURES["identite-carre"] = () => {
    const o = 40, A = 150, B = 80, T = A + B;
    let s = `<svg class="graph" viewBox="0 0 320 ${T + 50}" role="img" aria-label="Carré de côté a + b découpé en un carré a², un carré b² et deux rectangles ab">`;
    const r = (x, y, w, h, cl, t) => { s += `<rect x="${o + x}" y="${10 + y}" width="${w}" height="${h}" style="fill:var(${cl});stroke:var(--doux);stroke-width:1.4"/><text class="g-clabel" x="${o + x + w / 2}" y="${10 + y + h / 2 + 5}" text-anchor="middle">${t}</text>`; };
    r(0, 0, A, A, "--lagon-pale", "a²"); r(A, 0, B, A, "--ylang-pale", "ab"); r(0, A, A, B, "--ylang-pale", "ab"); r(A, A, B, B, "--lagon-pale", "b²");
    s += `<text class="g-label" x="${o + A / 2}" y="${T + 30}" text-anchor="middle">a</text><text class="g-label" x="${o + A + B / 2}" y="${T + 30}" text-anchor="middle">b</text>`;
    s += `<text class="g-label" x="${o - 10}" y="${10 + A / 2}" text-anchor="end">a</text><text class="g-label" x="${o - 10}" y="${10 + A + B / 2}" text-anchor="end">b</text>`;
    return s + `</svg>`;
  };
  // Chapitre 5 : x² = 4 (deux solutions), x² = 0, x² = −2 (aucune)
  FIGURES["carre-niveaux"] = () => graph({ xmin: -3.4, xmax: 3.4, ymin: -3, ymax: 9.6, h: 300, curves: [{ f: (x) => x * x, a: -3, b: 3, closed: false }], hlines: [{ y: 4, label: "y = 4" }, { y: -2, label: "y = −2" }], points: [{ x: -2, y: 4, label: "−2", gauche: true }, { x: 2, y: 4, label: "2" }, { x: 0, y: 0 }], aria: "Parabole y = x² : la droite y = 4 la coupe en −2 et 2, la droite y = −2 ne la coupe pas" });

  // Chapitre 6 : taux d'accroissement et ordonnée à l'origine de y = 2x − 1
  FIGURES["droite-affine"] = () => graph({ xmin: -2.5, xmax: 4.5, ymin: -3.5, ymax: 6.5, curves: [{ f: (x) => 2 * x - 1, a: -1.2, b: 3.6, closed: false, label: "y = 2x − 1", lx: 3.4, dx: -8, dy: 2 }], fleches: [{ x1: 1, y1: 1, x2: 2, y2: 1, c: 1, label: "+1" }, { x1: 2, y1: 1, x2: 2, y2: 3, c: 1, label: "+2" }], points: [{ x: 0, y: -1, label: "p = −1" }], aria: "Droite y = 2x − 1 : quand x augmente de 1, y augmente de 2 ; elle coupe l'axe des ordonnées en −1" });
  FIGURES["signe-affine"] = () => graph({ xmin: -1.5, xmax: 6.5, ymin: -6.5, ymax: 8.5, h: 280, curves: [{ f: (x) => -2 * x + 6, a: -1, b: 6, closed: false, label: "y = −2x + 6", lx: 0.6, dx: 96, dy: -6 }], points: [{ x: 3, y: 0, label: "3" }], marques: [{ x: 0.9, y: 1.6, texte: "f(x) > 0" }, { x: 5.1, y: -1.8, texte: "f(x) < 0" }], aria: "La droite y = −2x + 6 est au-dessus de l'axe des abscisses avant 3 (f(x) > 0) et en dessous après 3 (f(x) < 0)" });
  FIGURES["taxis"] = () => graph({ xmin: -1, xmax: 21, ymin: -4, ymax: 62, xstep: 2, ystep: 10, xetiq: 4, yetiq: 20, h: 260, padL: 24, curves: [{ f: (x) => 2 * x + 10, a: 0, b: 20, closed: false, label: "A", lx: 20, dx: -2, dy: 14 }, { f: (x) => 2.5 * x + 4, a: 0, b: 20, closed: false, label: "B", lx: 20, dx: -2, dy: -6 }], points: [{ x: 12, y: 34, label: "(12 ; 34)", gauche: true }], xlabel: "km", ylabel: "€", aria: "Deux droites de tarifs qui se croisent pour 12 km : après 12 km, A est sous B" });

  // Chapitre 7 : vecteurs
  FIGURES["parallelogramme"] = () => graph({ xmin: -4.5, xmax: 3.5, ymin: -3.5, ymax: 3.5, fleches: [{ x1: -3, y1: -2, x2: 1, y2: -1, label: "AB" }, { x1: -2, y1: 1, x2: 2, y2: 2, label: "DC" }], points: [{ x: -3, y: -2, label: "A", gauche: true }, { x: 1, y: -1, label: "B" }, { x: 2, y: 2, label: "C" }, { x: -2, y: 1, label: "D", gauche: true }], aria: "Parallélogramme ABCD : les flèches AB et DC sont égales" });
  FIGURES["chasles"] = () => graph({ xmin: -4.5, xmax: 4.5, ymin: -3.5, ymax: 3.5, fleches: [{ x1: -3, y1: -2, x2: 1, y2: 2 }, { x1: 1, y1: 2, x2: 3, y2: -2 }, { x1: -3, y1: -2, x2: 3, y2: -2, c: 1 }], points: [{ x: -3, y: -2, label: "A", gauche: true }, { x: 1, y: 2, label: "B" }, { x: 3, y: -2, label: "C" }], aria: "Relation de Chasles : aller de A à B puis de B à C revient à aller de A à C" });
  FIGURES["coord-vecteur"] = () => graph({ xmin: -3.5, xmax: 4.5, ymin: -2.5, ymax: 3.5, fleches: [{ x1: -2, y1: -1, x2: 3, y2: -1, c: 1, label: "+5" }, { x1: 3, y1: -1, x2: 3, y2: 2, c: 1, label: "+3" }, { x1: -2, y1: -1, x2: 3, y2: 2, label: "u" }], points: [{ x: -2, y: -1, label: "A", gauche: true }, { x: 3, y: 2, label: "B" }], aria: "Le vecteur u de A vers B a pour coordonnées 5 et 3" });
  FIGURES["milieu-distance"] = () => graph({ xmin: -0.5, xmax: 8.5, ymin: -3.5, ymax: 7.5, curves: [{ f: (x) => (4 / 3) * x - 10 / 3, a: 1, b: 7, closed: false }], fleches: [{ x1: 1, y1: -2, x2: 7, y2: -2, c: 1, label: "6" }, { x1: 7, y1: -2, x2: 7, y2: 6, c: 1, label: "8" }], points: [{ x: 1, y: -2, label: "A", gauche: true }, { x: 7, y: 6, label: "B" }, { x: 4, y: 2, label: "I", gauche: true }], aria: "Segment AB avec son milieu I ; les écarts 6 et 8 forment un triangle rectangle d'hypoténuse AB = 10" });

  // Chapitre 10 : intersection et réunion
  FIGURES["venn"] = () => {
    let s = `<svg class="graph" viewBox="0 0 320 170" role="img" aria-label="Deux ensembles A et B qui se chevauchent : la partie commune est A ∩ B">`;
    s += `<defs><clipPath id="venn-a"><circle cx="125" cy="88" r="62"/></clipPath></defs>`;
    s += `<rect x="6" y="6" width="308" height="158" rx="10" style="fill:none;stroke:var(--doux);stroke-width:1.2"/><text class="g-label" x="20" y="26">Ω</text>`;
    s += `<circle cx="195" cy="88" r="62" clip-path="url(#venn-a)" style="fill:var(--ylang-pale)"/>`;
    s += `<circle cx="125" cy="88" r="62" style="fill:none;stroke:var(--lagon);stroke-width:2"/><circle cx="195" cy="88" r="62" style="fill:none;stroke:var(--courbe2);stroke-width:2"/>`;
    s += `<text class="g-clabel g-curve-0" x="88" y="92">A</text><text class="g-clabel g-curve-1" x="226" y="92">B</text><text class="g-label" x="160" y="92" text-anchor="middle">A ∩ B</text>`;
    return s + `</svg>`;
  };

  // Chapitre 11 : colinéarité
  FIGURES["colineaires"] = () => graph({ xmin: -4.5, xmax: 4.5, ymin: -3.5, ymax: 3.5, fleches: [{ x1: -3, y1: 2, x2: -1, y2: 3, label: "u" }, { x1: 3, y1: 1, x2: -1, y2: -1, label: "v" }, { x1: 0, y1: -3, x2: 2, y2: 0, c: 1, label: "w" }], aria: "u et v = −2u ont la même direction, w n'est pas colinéaire à u" });
  FIGURES["alignes"] = () => graph({ xmin: -0.5, xmax: 8.5, ymin: -0.5, ymax: 12.5, ystep: 2, yetiq: 2, h: 280, curves: [{ f: (x) => 1.5 * x + 0.5, a: 0, b: 7.6, closed: false }], points: [{ x: 1, y: 2, label: "A", gauche: true }, { x: 3, y: 5, label: "B", gauche: true }, { x: 7, y: 11, label: "C", gauche: true }], aria: "Les trois bouées A, B, C sont sur une même droite" });

  // Chapitre 12 : droites
  FIGURES["droite-directeur"] = () => graph({ xmin: -1.5, xmax: 5.5, ymin: -3.5, ymax: 3.5, curves: [{ f: (x) => (-1 - x) / 2, a: -1.4, b: 5.4, closed: false, label: "x + 2y + 1 = 0", lx: 5.2, dx: -2, dy: 16 }], fleches: [{ x1: 3, y1: -2, x2: 1, y2: -1, c: 1, label: "u" }], points: [{ x: 3, y: -2, label: "A" }], aria: "Droite passant par A(3 ; −2) dirigée par u(−2 ; 1)" });
  FIGURES["deux-droites"] = () => graph({ xmin: -0.5, xmax: 6.5, ymin: -3.5, ymax: 7.5, curves: [{ f: (x) => 2 * x - 3, a: 0, b: 5.2, closed: false, label: "d₁", lx: 5, dx: -10, dy: 2 }, { f: (x) => -x + 6, a: 0, b: 6.4, closed: false, label: "d₂", lx: 5.6, dx: 22, dy: -10 }], points: [{ x: 3, y: 3, label: "(3 ; 3)" }], aria: "Les droites y = 2x − 3 et y = −x + 6 se coupent au point (3 ; 3)" });

  // Chapitre 17 : patron de la boîte (carton de 30 cm, coins de côté x)
  const patron = (c) => {
    const o = 50, L = 220, x = 44;
    let s = `<svg class="graph" viewBox="0 0 320 ${L + 40}" role="img" aria-label="Plaque carrée dont on découpe un carré de côté x à chaque coin">`;
    s += `<rect x="${o}" y="10" width="${L}" height="${L}" style="fill:var(--lagon-pale);stroke:var(--lagon);stroke-width:1.6"/>`;
    [[0, 0], [L - x, 0], [0, L - x], [L - x, L - x]].forEach(([a, b]) => { s += `<rect x="${o + a}" y="${10 + b}" width="${x}" height="${x}" style="fill:var(--surface);stroke:var(--faux);stroke-width:1.4;stroke-dasharray:4 3"/>`; });
    s += `<rect x="${o + x}" y="${10 + x}" width="${L - 2 * x}" height="${L - 2 * x}" style="fill:none;stroke:var(--doux);stroke-width:1;stroke-dasharray:3 3"/>`;
    s += `<text class="g-label" x="${o + x / 2}" y="${10 + x / 2 + 4}" text-anchor="middle">x</text><text class="g-label" x="${o + L / 2}" y="${10 + L / 2 + 4}" text-anchor="middle">fond : ${c} − 2x</text>`;
    s += `<text class="g-label" x="${o + L / 2}" y="${L + 30}" text-anchor="middle">${c} cm</text>`;
    return s + `</svg>`;
  };
  FIGURES["boite-patron"] = () => patron(30);


  /* Séries « flash » d'un thème : mélange de ses générateurs */
  const THEMES = {
    "am-flash-cn": ["am-comparer", "am-fractions", "am-puissances", "am-ecritures", "am-ordre-grandeur", "am-coherence", "auto-conversions"],
    "am-flash-ca": ["am-substituer", "am-reduire", "auto-litteral", "am-litteral-elem", "am-developper", "am-premier-degre", "am-isoler", "am-formule", "am-produit-nul", "am-signe"],
    "am-flash-pp": ["am-proportion", "am-partie-tout", "am-ecritures"],
    "am-flash-ev": ["am-coefficient", "appliquer-evolution", "taux-evolution", "evolutions-successives", "am-reciproque"],
    "am-flash-fr": ["lecture-image", "lecture-antecedents", "am-appartenance", "image-calcul", "am-reconnaitre", "resolution-graphique", "am-signe-graph", "am-trace-droite", "am-droite-point", "am-lire-droite", "am-coef-dir"],
    "am-flash-st": ["auto-statistiques", "am-quartiles", "am-moyenne-ponderee", "am-diagramme", "am-boites", "am-lire-graphique", "am-graphique-donnees"],
    "am-flash-pr": ["auto-probabilites", "am-proba-loi", "am-proba-tableau", "am-proba-arbre", "am-proba-notation"],
    "am-flash-ge": ["am-repere-droite", "am-coordonnees", "am-perimetre", "auto-grandeurs", "auto-pythagore", "am-thales", "am-trigo"]
  };
  Object.keys(THEMES).forEach((k) => { GEN[k] = (i) => GEN[pick(THEMES[k])](rand(0, 4)); });
  GEN["am-flash-tout"] = (i) => { const t = Object.keys(THEMES); return GEN[t[(i + rand(0, 6)) % t.length]](i); };


  /* Une « erreur connue » ne doit jamais coïncider avec la bonne réponse (à la tolérance près) */
  Object.keys(GEN).filter((k) => /^(auto|ld|am|cd|ar|cl|fa|ve|st|vx|tc|co|dr|fr|sg|pc|ec|sy|su|s2|pi|s5|d1|tr|d2|vr|ps|ex|va|sc|gr|sm|ea|tsu|tag|tlf|tcb|tsd|tdc|tln|tcv|tlg|tpe|tin|tld|trr|tec|rec|dvx|esp|lsu|bin|lfo|cnt|pse|lnx|pri|edo|trg|itg|lgn)-/.test(k)).forEach((k) => {
    const g = GEN[k];
    GEN[k] = (i) => { const q = g(i); if (q.erreurs) q.erreurs = q.erreurs.filter((e) => Math.abs(e.valeur - q.attendu) >= (q.tolerance || 1e-9)); return q; };
  });

  Object.assign(window.PM_EXO, { GEN, FIGURES, graph, shuffle, lycee: true });
})();
