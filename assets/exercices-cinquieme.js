/*
  Exercices du collège, classe de 5e (programme du cycle 4, BO n° 10 du 5 mars 2026).
  Ce fichier se charge après assets/exercices-college.js et reprend ses outils (window.PM_EXO.college).
  Mêmes règles : chaque générateur fabrique une question avec des nombres tirés au hasard, la réponse
  attendue, trois indices progressifs et la solution rédigée.
  Préfixes : rc5- (règles de calcul), tr5-, fr5-, pp5-, an5-, dv5-, sc5-, nr5-, cr5-, gf5-, cl5-, pg5-, st5-, eq5-, ai5-, pb5-, sv5-, pr5-.
*/
(function () {
  "use strict";
  const { GEN, FIGURES, shuffle } = window.PM_EXO;
  const { rand, pick, melange, nb, nbTexte, Dc, tD, mulD, addD } = window.PM_EXO.college;
  // Prénoms de Mayotte : [prénom, 1 si fille]
  const PRENOMS5 = [["Anli", 0], ["Nassim", 0], ["Zaïnaba", 1], ["Fatima", 1], ["Moussa", 0], ["Awa", 1], ["Ibrahim", 0], ["Mariama", 1], ["Saïd", 0], ["Djamila", 1], ["Hamada", 0], ["Faïza", 1], ["Kamal", 0], ["Zalifa", 1], ["Ambdi", 0], ["Nasra", 1], ["Toiyb", 0], ["Roukia", 1], ["Nasma", 1], ["Zaïd", 0]];
  // { nom, il: « il » ou « elle », e: accord (« » ou « e ») }
  const prenom = () => { const [nom, f] = pick(PRENOMS5); return { nom, il: f ? "elle" : "il", Il: f ? "Elle" : "Il", e: f ? "e" : "" }; };
  // Élision devant un prénom ou un nom (« qu'Awa », « d'Ambdi ») et pluriel selon l'effectif (« 1 boule », « 3 boules »)
  const voy5 = (m) => /^[aeiouyhâàéèêîïôû]/i.test(String(m));
  const queN = (m) => (voy5(m) ? "qu'" : "que ") + m, deN = (m) => (voy5(m) ? "d'" : "de ") + m;
  const plur = (k, mot, pl = mot + "s") => `$${k}$ ${k > 1 ? pl : mot}`;
  const LIEUX5 = ["Mamoudzou", "Dzaoudzi", "Pamandzi", "Combani", "Sada", "Chirongui", "Bandrélé", "Kani-Kéli", "M'tsamboro", "Koungou", "Dembéni", "Labattoir", "Tsingoni", "Ouangani"];

  /* =====================================================================
     Chapitre 1 : règles de calcul (rc5-)
     ===================================================================== */
  const X = "\\times", DIV = "\\div";
  /* Arbre de calcul : nœud = nombre | [opération, gauche, droite]. Les nombres sont en haut, la dernière opération
     en bas ; o = { x0, w (zone occupée), y0, val (écrire le résultat de chaque opération), res (texte de la case finale) } */
  const SYMB_A = { "+": "+", "-": "−", "×": "×", "÷": "÷" };
  const valA = (n) => (Array.isArray(n) ? { "+": (u, v) => u + v, "-": (u, v) => u - v, "×": (u, v) => u * v, "÷": (u, v) => u / v }[n[0]](valA(n[1]), valA(n[2])) : n);
  const hautA = (n) => (Array.isArray(n) ? 1 + Math.max(hautA(n[1]), hautA(n[2])) : 0);
  const feuillesA = (n) => (Array.isArray(n) ? feuillesA(n[1]) + feuillesA(n[2]) : 1);
  function arbreContenu(t, o) {
    const x0 = o.x0 || 0, w = o.w || 320, y0 = o.y0 || 20, gap = o.gap || 40, dx = w / feuillesA(t);
    let k = 0, s = "";
    const place = (n) => { if (!Array.isArray(n)) return { p: [+(x0 + dx * (k++ + 0.5)).toFixed(1), y0], n }; const L = place(n[1]), R = place(n[2]); return { p: [+((L.p[0] + R.p[0]) / 2).toFixed(1), y0 + hautA(n) * gap], n, L, R }; };
    const boite = (x, y, txt, cl) => { const lw = Math.max(30, String(txt).length * 7.4 + 12); return `<rect class="${cl || "g-rect"}" x="${+(x - lw / 2).toFixed(1)}" y="${y - 12}" width="${+lw.toFixed(1)}" height="24" rx="6"/><text class="g-label" x="${x}" y="${y + 4}" text-anchor="middle">${txt}</text>`; };
    const dessine = (a) => {
      if (!a.L) { s += boite(a.p[0], a.p[1], nbTexte(a.n)); return; }
      [a.L, a.R].forEach((c) => { s += `<line class="g-segment" x1="${c.p[0]}" y1="${c.p[1] + 12}" x2="${a.p[0]}" y2="${a.p[1] - 13}"/>`; dessine(c); });
      s += `<circle class="g-rect" cx="${a.p[0]}" cy="${a.p[1]}" r="13"/><text class="g-num-angle" x="${a.p[0]}" y="${a.p[1] + 5}" text-anchor="middle">${SYMB_A[a.n[0]]}</text>`;
      if (o.val && a !== racine) s += `<text class="g-mesure" x="${a.p[0] + 17}" y="${a.p[1] + 4}">${nbTexte(valA(a.n))}</text>`;
    };
    const racine = place(t); dessine(racine);
    if (o.res != null && Array.isArray(t)) { const yb = racine.p[1] + 40; s += `<line class="g-segment" x1="${racine.p[0]}" y1="${racine.p[1] + 13}" x2="${racine.p[0]}" y2="${yb - 12}"/>` + boite(racine.p[0], yb, o.res, "g-rect g-res"); }
    return { s, bas: racine.p[1] + (o.res != null ? 52 : 14) };
  }
  function arbre(t, o) {
    o = Object.assign({ res: "?" }, o);
    const { s, bas } = arbreContenu(t, o);
    return `<svg class="graph" viewBox="0 0 320 ${bas + 6}" role="img" aria-label="${o.aria || "Arbre de calcul : les nombres en haut, les opérations en dessous, la dernière opération tout en bas"}">${s}</svg>`;
  }
  /* Rectangle partagé pour la distributivité : hauteur k, largeurs a et b (pas forcément à l'échelle) ;
     o = { ka, kb : textes dans les deux parties, unite } */
  function rectDistrib(k, a, b, o) {
    o = o || {};
    // k, a, b : nombres, ou textes (lettres) ; o.fa : part de la longueur occupée par a quand a ou b est une lettre
    const x0 = 46, y0 = 34, Lt = 250, h = 86, fa = typeof a === "number" && typeof b === "number" ? a / (a + b) : o.fa || 0.62, wa = Math.max(70, Math.min(Lt - 70, Lt * fa)), xb = x0 + wa;
    const T = (v) => (typeof v === "string" ? v : nbTexte(v)) + (o.unite ? " " + o.unite : "");
    const S = (v) => (typeof v === "string" ? v : nbTexte(v));
    let s = `<svg class="graph" viewBox="0 0 320 ${y0 + h + 16}" role="img" aria-label="${o.aria || `Rectangle de largeur ${S(k)} et de longueur ${S(a)} + ${S(b)}, partagé en deux rectangles`}">`;
    s += `<rect class="g-rect" x="${x0}" y="${y0}" width="${+wa.toFixed(1)}" height="${h}"/><rect class="g-poly g-poly-image" x="${+xb.toFixed(1)}" y="${y0}" width="${+(Lt - wa).toFixed(1)}" height="${h}"/>`;
    s += `<text class="g-mesure" x="${x0 - 8}" y="${y0 + h / 2 + 4}" text-anchor="end">${T(k)}</text>`;
    s += `<text class="g-mesure" x="${+(x0 + wa / 2).toFixed(1)}" y="${y0 - 9}" text-anchor="middle">${T(a)}</text><text class="g-mesure" x="${+(xb + (Lt - wa) / 2).toFixed(1)}" y="${y0 - 9}" text-anchor="middle">${T(b)}</text>`;
    if (o.ka) s += `<text class="g-label" x="${+(x0 + wa / 2).toFixed(1)}" y="${y0 + h / 2 + 4}" text-anchor="middle">${o.ka}</text>`;
    if (o.kb) s += `<text class="g-label" x="${+(xb + (Lt - wa) / 2).toFixed(1)}" y="${y0 + h / 2 + 4}" text-anchor="middle">${o.kb}</text>`;
    return s + `</svg>`;
  }
  FIGURES["rc5-cours-arbre"] = () => arbre(["+", 4, ["×", 5, 3]], { val: true, res: "19", aria: "Arbre de calcul de 4 + 5 × 3 : on calcule d'abord 5 × 3 = 15, puis 4 + 15 = 19" });
  FIGURES["rc5-cours-parentheses"] = () => arbre(["×", 5, ["-", 8, 3]], { val: true, res: "25", aria: "Arbre de calcul de 5 × (8 − 3) : on calcule d'abord 8 − 3 = 5, puis 5 × 5 = 25" });
  FIGURES["rc5-cours-fraction"] = () => arbre(["÷", ["+", 18, 6], ["-", 11, 3]], { val: true, res: "3", aria: "Arbre de calcul du quotient de 18 + 6 par 11 − 3 : 24 divisé par 8 égale 3" });
  FIGURES["rc5-cours-nature"] = () => {
    const g = arbreContenu(["+", 3, ["×", 4, 5]], { x0: 0, w: 160, res: "somme" }), d = arbreContenu(["×", ["+", 3, 4], 5], { x0: 160, w: 160, res: "produit" });
    return `<svg class="graph" viewBox="0 0 320 ${Math.max(g.bas, d.bas) + 6}" role="img" aria-label="Deux arbres de calcul : 3 + 4 × 5 se termine par une addition, c'est une somme ; (3 + 4) × 5 se termine par une multiplication, c'est un produit"><g class="g-grid"><line x1="160" y1="6" x2="160" y2="${Math.max(g.bas, d.bas)}" stroke-dasharray="3 4"/></g>${g.s}${d.s}</svg>`;
  };
  FIGURES["rc5-cours-distributivite"] = () => rectDistrib(7, 100, 2, { ka: "7 × 100 = 700", kb: "7 × 2 = 14", aria: "Rectangle de largeur 7 et de longueur 100 + 2 : son aire 7 × 102 est la somme des aires 7 × 100 = 700 et 7 × 2 = 14" });
  FIGURES["rc5-methode-calcul"] = () => arbre(["+", 3, ["×", 2, ["-", 9, 4]]], { val: true, res: "13", aria: "Arbre de calcul de 3 + 2 × (9 − 4) : 9 − 4 = 5, puis 2 × 5 = 10, puis 3 + 10 = 13" });
  FIGURES["rc5-methode-nature"] = () => arbre(["-", ["×", 5, 4], 3], { val: true, res: "différence", aria: "Arbre de calcul de 5 × 4 − 3 : la dernière opération est une soustraction, c'est une différence" });
  FIGURES["rc5-methode-distributivite"] = () => rectDistrib(12, 100, 5, { ka: "12 × 100 = 1 200", kb: "12 × 5 = 60", aria: "Rectangle de largeur 12 et de longueur 100 + 5 : 12 × 105 = 1 200 + 60" });
  FIGURES["rc5-qcm-arbre"] = () => arbre(["×", ["+", 6, 2], 5]);
  FIGURES["rc5-qcm-rect"] = () => rectDistrib(8, 10, 3, { ka: "?", kb: "?", aria: "Rectangle de largeur 8 et de longueur 10 + 3, partagé en deux rectangles" });
  // Expressions sans parenthèses : { tex, val, etapes, erreurs: [[valeur, message]], arbre }
  const MSG_GD = "Tu as calculé de gauche à droite sans respecter les priorités : les multiplications et les divisions passent **avant** les additions et les soustractions.";
  const MSG_PAR = "Les calculs entre parenthèses se font **en premier** : tu les as oubliés.";
  function sansParentheses() {
    for (let e = 0; e < 200; e++) {
      const a = rand(2, 20), b = rand(2, 12), c = rand(2, 12), d = rand(2, 9), t = rand(0, 8);
      let r = null;
      if (t === 0) r = [`${a} + ${b} ${X} ${c}`, a + b * c, [`${a} + ${b * c}`], [[(a + b) * c, MSG_GD], [b * c, `Ça, c'est seulement le produit $${b} ${X} ${c}$ : il reste à lui ajouter $${a}$.`]], ["+", a, ["×", b, c]]];
      if (t === 1) r = [`${b} ${X} ${c} + ${a}`, b * c + a, [`${b * c} + ${a}`], [[b * (c + a), `La multiplication passe **avant** l'addition : on ne commence pas par $${c} + ${a}$.`], [b * c, `Ça, c'est seulement le produit $${b} ${X} ${c}$ : il reste à lui ajouter $${a}$.`]], ["+", ["×", b, c], a]];
      if (t === 2 && a + 30 > b * c) { const A = b * c + rand(1, 30); r = [`${A} - ${b} ${X} ${c}`, A - b * c, [`${A} - ${b * c}`], [[(A - b) * c, MSG_GD], [A - b - c, `On soustrait le **produit** $${b} ${X} ${c} = ${b * c}$, pas les deux nombres l'un après l'autre.`]], ["-", A, ["×", b, c]]]; }
      if (t === 3) { const p = a * b, q = c * d; if (p > q) r = [`${a} ${X} ${b} - ${c} ${X} ${d}`, p - q, [`${p} - ${q}`], [[(p - c) * d, MSG_GD], [p, `Ça, c'est seulement le premier produit : il reste à lui soustraire $${c} ${X} ${d} = ${q}$.`]], ["-", ["×", a, b], ["×", c, d]]]; }
      if (t === 4) { const B = b * c; r = [`${a} + ${B} ${DIV} ${c}`, a + b, [`${a} + ${b}`], [[(a + B) / c, MSG_GD], [b, `Ça, c'est seulement le quotient $${B} ${DIV} ${c}$ : il reste à lui ajouter $${a}$.`]], ["+", a, ["÷", B, c]]]; }
      if (t === 5 && a > b) r = [`${a} - ${b} + ${c}`, a - b + c, [`${a - b} + ${c}`], [[a - (b + c), "Avec seulement des additions et des soustractions, on calcule **de gauche à droite** : on commence par la soustraction."], [a + b + c, `Le signe $-$ porte sur $${b}$ : on soustrait $${b}$, puis on ajoute $${c}$.`]], ["+", ["-", a, b], c]];
      if (t === 6) { const A = b * c * d; r = [`${nb(A)} ${DIV} ${b} ${X} ${d}`, c * d * d, [`${c * d} ${X} ${d}`], [[A / (b * d), "Avec seulement des multiplications et des divisions, on calcule **de gauche à droite** : on commence par la division."], [c * d, `Ça, c'est seulement $${nb(A)} ${DIV} ${b}$ : il reste à multiplier par $${d}$.`]], ["×", ["÷", A, b], d]]; }
      if (t === 7) r = [`${a} + ${b} ${X} ${c} - ${d}`, a + b * c - d, [`${a} + ${b * c} - ${d}`, `${a + b * c} - ${d}`], [[(a + b) * c - d, MSG_GD], [a + b * (c - d), `On ne commence pas par $${c} - ${d}$ : la multiplication $${b} ${X} ${c}$ passe d'abord, puis on calcule de gauche à droite.`]], ["-", ["+", a, ["×", b, c]], d]];
      if (t === 8) r = [`${a} ${X} ${b} + ${c} ${X} ${d}`, a * b + c * d, [`${a * b} + ${c * d}`], [[(a * b + c) * d, MSG_GD], [a * (b + c) * d, `Les deux multiplications passent avant l'addition : on ne calcule pas $${b} + ${c}$ en premier.`]], ["+", ["×", a, b], ["×", c, d]]];
      if (r) return { tex: r[0], val: r[1], etapes: r[2], erreurs: r[3], arbre: r[4], t };
    }
  }
  function avecParentheses() {
    for (let e = 0; e < 200; e++) {
      const a = rand(2, 12), b = rand(2, 15), c = rand(2, 12), d = rand(1, 9), t = rand(0, 7);
      let r = null;
      if (t === 0) r = [`${a} ${X} (${b} + ${c})`, a * (b + c), [`${a} ${X} ${b + c}`], [[a * b + c, MSG_PAR], [a * b, `$${a}$ multiplie **toute** la parenthèse : on calcule d'abord $${b} + ${c} = ${b + c}$.`]], ["×", a, ["+", b, c]]];
      if (t === 1 && c > d) r = [`(${a} + ${b}) ${X} (${c} - ${d})`, (a + b) * (c - d), [`${a + b} ${X} ${c - d}`], [[a + b * c - d, MSG_PAR], [(a + b) * c - d, `Les **deux** parenthèses se calculent en premier : $${c} - ${d} = ${c - d}$ aussi.`]], ["×", ["+", a, b], ["-", c, d]]];
      if (t === 2 && b > c) { const A = b - c + rand(1, 20); r = [`${A} - (${b} - ${c})`, A - (b - c), [`${A} - ${b - c}`], [[A - b - c, `Les calculs entre parenthèses se font **en premier** : on calcule $${b} - ${c} = ${b - c}$, puis on le soustrait.`], [A + b - c, "On **soustrait** la parenthèse, on ne l'ajoute pas."]], ["-", A, ["-", b, c]]]; }
      if (t === 3 && c > d) r = [`${a} + ${b} ${X} (${c} - ${d})`, a + b * (c - d), [`${a} + ${b} ${X} ${c - d}`, `${a} + ${b * (c - d)}`], [[(a + b) * (c - d), "Après la parenthèse, la multiplication passe **avant** l'addition."], [a + b * c - d, MSG_PAR]], ["+", a, ["×", b, ["-", c, d]]]];
      if (t === 4) { const q = rand(2, 6), s = q * rand(2, 9), u = rand(1, s - 1), w = rand(1, 9); r = [`\\dfrac{${u} + ${s - u}}{${q + w} - ${w}}`, s / q, [`\\dfrac{${s}}{${q}}`], [[s, `Ça, c'est le numérateur : il reste à le diviser par le dénominateur, $${q + w} - ${w} = ${q}$.`], [u + (s - u) / (q + w) - w, "Le trait de fraction joue le rôle de parenthèses : on calcule le numérateur et le dénominateur avant de diviser."]], ["÷", ["+", u, s - u], ["-", q + w, w]]]; }
      if (t === 5) { const k = rand(2, 6), m = rand(2, 9), A = k * m - b; if (A > 0) r = [`(${A} + ${b}) ${DIV} ${k} ${X} ${c}`, m * c, [`${A + b} ${DIV} ${k} ${X} ${c}`, `${m} ${X} ${c}`], [[A + (b / k) * c, MSG_PAR], [m, `Ça, c'est seulement $(${A} + ${b}) ${DIV} ${k}$ : il reste à multiplier par $${c}$.`]], ["×", ["÷", ["+", A, b], k], c]]; }
      if (t === 6 && b > c + d) r = [`${a} ${X} [${b} - (${c} + ${d})]`, a * (b - c - d), [`${a} ${X} [${b} - ${c + d}]`, `${a} ${X} ${b - c - d}`], [[a * (b - c + d), `Le signe $-$ porte sur **toute** la parenthèse : on calcule d'abord $${c} + ${d} = ${c + d}$.`], [a * b - c - d, `$${a}$ multiplie **tout** le crochet : on calcule d'abord ce qu'il contient.`]], ["×", a, ["-", b, ["+", c, d]]]];
      if (t === 7) { const q = rand(2, 9), p = q * rand(2, 9); r = [`\\dfrac{${a} ${X} ${p}}{${q}}`, (p * a) / q, [`\\dfrac{${a * p}}{${q}}`], [[a * p, `Ça, c'est le numérateur : il reste à le diviser par $${q}$.`], [a + p / q, "Le numérateur est un **produit** : on multiplie, on n'additionne pas."]], ["÷", ["×", a, p], q]]; }
      if (r) return { tex: r[0], val: r[1], etapes: r[2], erreurs: r[3], arbre: r[4], t };
    }
  }
  const chaine = (q) => `$${[q.tex, ...q.etapes, nb(q.val)].join(" = ")}$`;
  // erreurs entières, positives, distinctes de la réponse et entre elles
  const errCalc = (q) => { const vus = new Set([q.val]); return q.erreurs.filter(([v]) => Number.isInteger(v) && v >= 0 && !vus.has(v) && vus.add(v)).map(([valeur, message]) => ({ valeur, message })); };
  // Où placer des parenthèses pour obtenir un résultat donné ?
  function placerParentheses() {
    for (let e = 0; e < 100; e++) {
      const a = rand(2, 9), b = rand(2, 9), c = rand(2, 9), d = rand(1, 8), t = rand(0, 1);
      const F = t ? [[`${a} ${X} (${b} + ${c}) ${X} ${d}`, a * (b + c) * d], [`(${a} ${X} ${b} + ${c}) ${X} ${d}`, (a * b + c) * d], [`${a} ${X} (${b} + ${c} ${X} ${d})`, a * (b + c * d)], [`${a} ${X} ${b} + ${c} ${X} ${d}`, a * b + c * d]]
        : [[`(${a} + ${b}) ${X} ${c} - ${d}`, (a + b) * c - d], [`${a} + ${b} ${X} (${c} - ${d})`, a + b * (c - d)], [`(${a} + ${b}) ${X} (${c} - ${d})`, (a + b) * (c - d)], [`${a} + ${b} ${X} ${c} - ${d}`, a + b * c - d]];
      const vals = F.map((f) => f[1]); if (c <= d || new Set(vals).size < 4 || vals.some((v) => v < 0)) continue;
      const k = rand(0, 3), brut = t ? `${a} ${X} ${b} + ${c} ${X} ${d}` : `${a} + ${b} ${X} ${c} - ${d}`;
      const { choix, attendu } = melange(`$${F[k][0]}$`, F.filter((_, i) => i !== k).map((f) => `$${f[0]}$`));
      return { enonce: `On veut que le calcul $${brut}$ donne $${F[k][1]}$. Quelle écriture convient ?`, mode: "choix", choix, attendu,
        aides: ["Calcule chaque proposition en commençant par les parenthèses.", "Sans parenthèses, la multiplication passe avant l'addition et la soustraction.", "Une seule écriture donne le bon résultat."],
        solution: F.map(([f, v]) => `$${f} = ${v}$`).join(" ; ") + `. C'est donc $${F[k][0]}$${k === 3 ? " : ici, aucune parenthèse n'est nécessaire" : ""}.` };
    }
  }

  GEN["rc5-priorites"] = function () {
    const q = sansParentheses(), fig = Math.random() < 0.3;
    return { enonce: fig ? `Calcule : $${q.tex}$ (l'arbre de calcul montre l'ordre des opérations).` : `Calcule : $${q.tex}$`, figure: fig ? arbre(q.arbre) : undefined, mode: "nombre", prefixe: "Résultat :", attendu: q.val, erreurs: errCalc(q),
      aides: ["Sans parenthèses, on effectue d'abord les multiplications et les divisions, puis les additions et les soustractions.", "S'il n'y a que des additions et des soustractions (ou que des multiplications et des divisions), on calcule de gauche à droite.", `Première étape : $${q.tex} = ${q.etapes[0]}$.`],
      solution: chaine(q) };
  };

  GEN["rc5-parentheses"] = function () {
    if (Math.random() < 0.2) return placerParentheses();
    const q = avecParentheses(), fig = Math.random() < 0.3;
    return { enonce: fig ? `Calcule : $${q.tex}$ (l'arbre de calcul montre l'ordre des opérations).` : `Calcule : $${q.tex}$`, figure: fig ? arbre(q.arbre) : undefined, mode: "nombre", prefixe: "Résultat :", attendu: q.val, erreurs: errCalc(q),
      aides: ["On commence par les calculs entre parenthèses. S'il y a des crochets, on commence par les parenthèses à l'intérieur.", "Un trait de fraction joue le rôle de parenthèses : on calcule le numérateur et le dénominateur avant de diviser.", `Première étape : $${q.tex} = ${q.etapes[0]}$.`],
      solution: chaine(q) };
  };

  const NATURES = ["une somme", "une différence", "un produit", "un quotient"];
  GEN["rc5-vocabulaire"] = function () {
    if (Math.random() < 0.2) {
      const q = Math.random() < 0.5 ? sansParentheses() : avecParentheses(), k = { "+": 0, "-": 1, "×": 2, "÷": 3 }[q.arbre[0]];
      return { enonce: `Voici l'arbre de calcul de l'expression $${q.tex}$. Cette expression est :`, figure: arbre(q.arbre), mode: "choix", choix: NATURES.slice(), attendu: k,
        aides: ["Dans un arbre de calcul, on calcule du haut vers le bas.", "L'opération tout en bas est la **dernière** effectuée.", "La dernière opération donne la nature de l'expression."],
        solution: `La dernière opération, tout en bas de l'arbre, est « ${SYMB_A[q.arbre[0]]} » : $${q.tex}$ est ${NATURES[k]}.` };
    }
    const a = rand(2, 15), b = rand(2, 12), c = rand(2, 12), t = rand(0, 2);
    if (t < 2) {
      const L = [
        [`${a} + ${b} ${X} ${c}`, 0, `la dernière opération est l'addition : c'est la somme de $${a}$ et de $${b} ${X} ${c}$`],
        [`(${a} + ${b}) ${X} ${c}`, 2, `on calcule d'abord la parenthèse, puis on multiplie : c'est le produit de $(${a} + ${b})$ par $${c}$`],
        [`${a} ${X} ${b} - ${c}`, 1, `la dernière opération est la soustraction : c'est la différence entre $${a} ${X} ${b}$ et $${c}$`],
        [`${a + b * c} - ${b} ${X} ${c}`, 1, `la multiplication est prioritaire, la dernière opération est la soustraction`],
        [`\\dfrac{${a} + ${b}}{${c}}`, 3, `on calcule le numérateur, puis on divise : c'est le quotient de $${a} + ${b}$ par $${c}$`],
        [`${a} ${X} (${b} + ${c})`, 2, `on calcule d'abord la parenthèse, puis on multiplie : c'est un produit de deux facteurs, $${a}$ et $(${b} + ${c})$`],
        [`(${a} + ${b}) - ${c}`, 1, `la parenthèse est calculée d'abord, puis on soustrait`],
        [`${a} + (${b + c} - ${c})`, 0, `la parenthèse est calculée d'abord, puis on additionne`],
        [`(${a * c + b} - ${b}) ${DIV} ${c}`, 3, `la parenthèse est calculée d'abord, puis on divise`],
        [`${a} ${X} ${b} + ${c} ${X} ${a}`, 0, `les deux produits sont prioritaires, la dernière opération est l'addition`]
      ];
      const [tex, k, expl] = pick(L);
      return { enonce: `L'expression $${tex}$ est :`, mode: "choix", choix: NATURES.slice(), attendu: k,
        aides: ["La nature d'une expression est donnée par la **dernière** opération effectuée.", "Repère l'ordre des calculs : parenthèses, puis multiplications et divisions, puis additions et soustractions.", "Somme : $+$ ; différence : $-$ ; produit : $\\times$ ; quotient : $\\div$ ou trait de fraction."],
        solution: `$${tex}$ est ${NATURES[k]} : ${expl}.` };
    }
    const s = rand(0, 1);
    if (s === 0) {
      const bonne = `$${a}$ et $(${b} + ${c})$`;
      const { choix, attendu } = melange(bonne, [`$${a}$ et $${b}$`, `$${b}$ et $${c}$`, `$${a}$, $${b}$ et $${c}$`]);
      return { enonce: `Quels sont les **facteurs** du produit $${a} ${X} (${b} + ${c})$ ?`, mode: "choix", choix, attendu,
        aides: ["Les facteurs sont les nombres (ou les expressions) que l'on multiplie.", "Ici, la multiplication porte sur toute la parenthèse.", `On multiplie $${a}$ par le résultat de $${b} + ${c}$.`],
        solution: `On multiplie $${a}$ par $(${b} + ${c})$ : les facteurs sont $${a}$ et $(${b} + ${c})$.` };
    }
    const bonne = `$${a}$ et $${b} ${X} ${c}$`;
    const { choix, attendu } = melange(bonne, [`$${a} + ${b}$ et $${c}$`, `$${a}$ et $${b}$`, `$${b}$ et $${c}$`]);
    return { enonce: `Quels sont les **termes** de la somme $${a} + ${b} ${X} ${c}$ ?`, mode: "choix", choix, attendu,
      aides: ["Les termes sont les nombres (ou les expressions) que l'on additionne.", "La multiplication est prioritaire : $" + `${b} ${X} ${c}` + "$ forme un seul bloc.", `On additionne $${a}$ et le produit $${b} ${X} ${c}$.`],
      solution: `On additionne $${a}$ et $${b} ${X} ${c}$ : ce sont les deux termes de la somme.` };
  };

  // Arbres de calcul à traduire : [arbre, écriture, fausses écritures]
  const ARBRES_T = [
    (a, b, c) => [["+", a, ["×", b, c]], `${a} + ${b} ${X} ${c}`, [`(${a} + ${b}) ${X} ${c}`, `${a} ${X} ${b} + ${c}`, `${a} ${X} (${b} + ${c})`]],
    (a, b, c) => [["×", ["+", a, b], c], `(${a} + ${b}) ${X} ${c}`, [`${a} + ${b} ${X} ${c}`, `${a} ${X} (${b} + ${c})`, `${a} ${X} ${b} + ${c}`]],
    (a, b, c0) => { const c = Math.min(c0, a * b - 1); return [["-", ["×", a, b], c], `${a} ${X} ${b} - ${c}`, [`${a} ${X} (${b} - ${c})`, `${c} - ${a} ${X} ${b}`, `${a} - ${b} ${X} ${c}`]]; },
    (a, b, c) => [["×", a, ["-", b + c, c]], `${a} ${X} (${b + c} - ${c})`, [`${a} ${X} ${b + c} - ${c}`, `(${a} - ${b + c}) ${X} ${c}`, `${a} - ${b + c} ${X} ${c}`]],
    (a0, b, c) => { const a = c * (Math.floor(b / c) + rand(1, 4)) - b; return [["÷", ["+", a, b], c], `(${a} + ${b}) ${DIV} ${c}`, [`${a} + ${b} ${DIV} ${c}`, `${a} ${DIV} (${b} + ${c})`, `${c} ${DIV} (${a} + ${b})`]]; },
    (a, b, c, d) => [["+", ["×", a, b], ["×", c, d]], `${a} ${X} ${b} + ${c} ${X} ${d}`, [`${a} ${X} (${b} + ${c}) ${X} ${d}`, `(${a} ${X} ${b} + ${c}) ${X} ${d}`, `${a} + ${b} ${X} ${c} + ${d}`]],
    (a, b, c, d) => [["×", ["+", a, b], ["-", c + d, d]], `(${a} + ${b}) ${X} (${c + d} - ${d})`, [`${a} + ${b} ${X} ${c + d} - ${d}`, `(${a} + ${b}) ${X} ${c + d} - ${d}`, `${a} + ${b} ${X} (${c + d} - ${d})`]],
    (a, b, c) => [["-", a + b + c, ["+", b, c]], `${a + b + c} - (${b} + ${c})`, [`${a + b + c} - ${b} + ${c}`, `${a + b + c} + ${b} - ${c}`, `${b} + ${c} - ${a + b + c}`]]
  ];
  // Achats au marché : [article au pluriel, « l'un » ou « l'une »]
  const ARTICLES5 = [["mangues", "l'une"], ["ananas", "l'un"], ["brochettes", "l'une"], ["jus de coco", "l'un"], ["cahiers", "l'un"], ["stylos", "l'un"], ["barquettes de mabawas", "l'une"], ["kilos de bananes", "le kilo"], ["bouteilles d'eau", "l'une"], ["paquets de vanille", "le paquet"], ["places de cinéma", "l'une"], ["tickets de bus", "l'un"]];
  GEN["rc5-traduire"] = function () {
    if (Math.random() < 0.25) {
      const [t, bonne, faux] = pick(ARBRES_T)(rand(2, 15), rand(2, 12), rand(2, 9), rand(2, 9));
      const { choix, attendu } = melange(`$${bonne}$`, faux.map((f) => `$${f}$`));
      return { enonce: "Quelle expression correspond à cet arbre de calcul ?", figure: arbre(t), mode: "choix", choix, attendu,
        aides: ["Dans un arbre de calcul, on effectue les opérations du haut vers le bas.", "L'opération tout en bas est la **dernière** effectuée : elle donne la nature de l'expression.", "Si une addition ou une soustraction est faite avant une multiplication ou une division, il faut des parenthèses."],
        solution: `La dernière opération est « ${SYMB_A[t[0]]} » : l'arbre correspond à $${bonne}$ (sa valeur est $${nb(valA(t))}$).` };
    }
    const a = rand(2, 15), b = rand(2, 12), c = rand(2, 12), d = rand(2, 9), t = rand(0, 9);
    const P = [
      [`la somme de $${a}$ et du produit de $${b}$ par $${c}$`, `${a} + ${b} ${X} ${c}`, [`(${a} + ${b}) ${X} ${c}`, `${a} ${X} ${b} + ${c}`, `${a} ${X} (${b} + ${c})`]],
      [`le produit de $${a}$ par la somme de $${b}$ et de $${c}$`, `${a} ${X} (${b} + ${c})`, [`${a} ${X} ${b} + ${c}`, `(${a} + ${b}) ${X} ${c}`, `${a} + ${b} ${X} ${c}`]],
      [`la différence entre $${a + b * c}$ et le produit de $${b}$ par $${c}$`, `${a + b * c} - ${b} ${X} ${c}`, [`(${a + b * c} - ${b}) ${X} ${c}`, `${b} ${X} ${c} - ${a + b * c}`, `${a + b * c} ${X} ${b} - ${c}`]],
      [`le quotient de la somme de $${a}$ et de $${b}$ par $${c}$`, `\\dfrac{${a} + ${b}}{${c}}`, [`${a} + \\dfrac{${b}}{${c}}`, `\\dfrac{${a}}{${b} + ${c}}`, `\\dfrac{${c}}{${a} + ${b}}`]],
      [`le produit de la somme de $${a}$ et de $${b}$ par leur différence`, "", null],
      [`la somme du produit de $${a}$ par $${b}$ et du produit de $${c}$ par $${d}$`, `${a} ${X} ${b} + ${c} ${X} ${d}`, [`${a} ${X} (${b} + ${c}) ${X} ${d}`, `(${a} ${X} ${b} + ${c}) ${X} ${d}`, `${a} + ${b} ${X} ${c} + ${d}`]],
      [`le double de la somme de $${a}$ et de $${b}$`, `2 ${X} (${a} + ${b})`, [`2 ${X} ${a} + ${b}`, `${a} + 2 ${X} ${b}`, `2 + ${a} + ${b}`]],
      [`la différence entre le triple de $${a}$ et $${b}$`, `3 ${X} ${a} - ${b}`, [`3 ${X} (${a} - ${b})`, `${b} - 3 ${X} ${a}`, `3 + ${a} - ${b}`]]
    ];
    if (t <= 7) {
      let [phrase, bonne, faux] = P[t];
      if (t === 4) { const A = a + b; phrase = `le produit de la somme de $${A}$ et de $${b}$ par leur différence`; bonne = `(${A} + ${b}) ${X} (${A} - ${b})`; faux = [`${A} + ${b} ${X} ${A} - ${b}`, `(${A} + ${b}) ${X} ${A} - ${b}`, `(${A} - ${b}) ${X} (${A} - ${b})`]; }
      const { choix, attendu } = melange(`$${bonne}$`, faux.map((f) => `$${f}$`));
      return { enonce: `Quelle expression correspond à la phrase : « ${phrase} » ?`, mode: "choix", choix, attendu,
        aides: ["Le premier mot (somme, différence, produit, quotient) indique la **dernière** opération de l'expression.", "Les parenthèses sont nécessaires quand une addition ou une soustraction doit être calculée avant une multiplication.", "Relis chaque proposition avec les priorités : quelle opération est faite en dernier ?"],
        solution: `« ${phrase[0].toUpperCase() + phrase.slice(1)} » s'écrit $${bonne}$.` };
    }
    const P0 = prenom(), lieu = pick(["au marché de Mamoudzou", `au marché de ${pick(LIEUX5)}`, "à la boutique du village", "à la fête du collège"]);
    if (t === 8) {
      const n = rand(2, 9), p = rand(2, 6), m = rand(2, 6), s = rand(1, 4), [[o1, u1], [o2, u2]] = shuffle(ARTICLES5.slice()).slice(0, 2);
      const bonne = `${n} ${X} ${p} + ${m} ${X} ${s}`;
      const { choix, attendu } = melange(`$${bonne}$`, [`$(${n} + ${m}) ${X} (${p} + ${s})$`, `$${n} + ${p} ${X} ${m} + ${s}$`, `$${n} ${X} (${p} + ${m}) ${X} ${s}$`]);
      return { enonce: `${P0.nom} achète ${lieu} $${n}$ ${o1} à $${p}$ € ${u1} et $${m}$ ${o2} à $${s}$ € ${u2}. Quelle expression donne le prix total, en euros ?`, mode: "choix", choix, attendu,
        aides: [`Calcule d'abord le prix des ${o1}, puis celui des ${o2}.`, `Prix des ${o1} : $${n} ${X} ${p}$.`, "On ajoute les deux prix ; les multiplications étant prioritaires, pas besoin de parenthèses."],
        solution: `${o1[0].toUpperCase() + o1.slice(1)} : $${n} ${X} ${p}$ ; ${o2} : $${m} ${X} ${s}$. Prix total : $${bonne} = ${n * p + m * s}$ €.` };
    }
    const n = rand(2, 8), p = rand(2, 9), A = n * p + rand(1, 30), [o1, u1] = pick(ARTICLES5);
    const bonne = `${A} - ${n} ${X} ${p}`;
    const { choix, attendu } = melange(`$${bonne}$`, [`$(${A} - ${n}) ${X} ${p}$`, `$${A} - ${n} - ${p}$`, `$${n} ${X} ${p} - ${A}$`]);
    return { enonce: `${P0.nom} a $${A}$ €. ${P0.Il} achète ${lieu} $${n}$ ${o1} à $${p}$ € ${u1}. Quelle expression donne la somme qui lui reste, en euros ?`, mode: "choix", choix, attendu,
      aides: [`Calcule d'abord le prix des ${o1}.`, `Prix des ${o1} : $${n} ${X} ${p}$.`, `On retire ce prix aux $${A}$ € ; la multiplication est prioritaire.`],
      solution: `Prix des ${o1} : $${n} ${X} ${p}$. Il reste $${bonne} = ${A - n * p}$ €.` };
  };

  GEN["rc5-distributivite"] = function () {
    const t = rand(0, 5);
    if (t === 0) {
      const k = rand(3, 49), [m, op] = pick([[101, "+"], [102, "+"], [103, "+"], [99, "-"], [98, "-"], [97, "-"], [1001, "+"], [999, "-"], [1002, "+"], [998, "-"]]), e = Math.abs(m - (m > 500 ? 1000 : 100)), base = m > 500 ? 1000 : 100;
      const r = k * m, fig = op === "+" && Math.random() < 0.6;
      return { enonce: `Calcule astucieusement : $${k} ${X} ${nb(m)}$${fig ? ` (la figure découpe le rectangle de dimensions $${k}$ et $${nb(m)}$)` : ""}.`, figure: fig ? rectDistrib(k, base, e, { ka: `${k} × ${nbTexte(base)}`, kb: `${k} × ${e}` }) : undefined, mode: "nombre", prefixe: "Résultat :", attendu: r,
        erreurs: [{ valeur: k * base + (op === "+" ? e : -e), message: `Attention : on ajoute (ou on retire) $${k}$ fois $${e}$, pas $${e}$ seulement.` }, { valeur: k * base, message: `Il manque $${k} ${X} ${e} = ${k * e}$ : il faut ${op === "+" ? "l'ajouter" : "le retirer"}.` }],
        aides: [`Écris $${nb(m)}$ sous la forme $${nb(base)} ${op} ${e}$.`, `$${k} ${X} (${nb(base)} ${op} ${e}) = ${k} ${X} ${nb(base)} ${op} ${k} ${X} ${e}$ : c'est la distributivité.`, `$${k} ${X} ${nb(base)} = ${nb(k * base)}$.`],
        solution: `$${k} ${X} ${nb(m)} = ${k} ${X} (${nb(base)} ${op} ${e}) = ${k} ${X} ${nb(base)} ${op} ${k} ${X} ${e} = ${nb(k * base)} ${op} ${k * e} = ${nb(r)}$.` };
    }
    if (t === 1) {
      const k = rand(3, 30), base = pick([10, 100, 100, 1000]), a = rand(1, base - 1), b = base - a, fig = base <= 100 && Math.random() < 0.5;
      return { enonce: `Calcule astucieusement : $${k} ${X} ${a} + ${k} ${X} ${b}$`, figure: fig ? rectDistrib(k, a, b, { ka: `${k} × ${a}`, kb: `${k} × ${b}`, aria: `Deux rectangles de même largeur ${k}, de longueurs ${a} et ${b}, mis bout à bout` }) : undefined, mode: "nombre", prefixe: "Résultat :", attendu: k * base,
        erreurs: [{ valeur: k + base, message: `Le facteur commun $${k}$ **multiplie** la somme $${a} + ${b}$ : $${k} ${X} (${a} + ${b})$.` }, { valeur: 2 * k * base, message: `Le facteur commun ne s'écrit qu'**une seule fois** : $${k} ${X} (${a} + ${b})$.` }],
        aides: ["Les deux produits ont un facteur commun.", `$${k} ${X} ${a} + ${k} ${X} ${b} = ${k} ${X} (${a} + ${b})$ : c'est la distributivité, dans l'autre sens.`, `$${a} + ${b} = ${nb(base)}$.`],
        solution: `$${k} ${X} ${a} + ${k} ${X} ${b} = ${k} ${X} (${a} + ${b}) = ${k} ${X} ${nb(base)} = ${nb(k * base)}$.` };
    }
    if (t === 2) {
      const k = rand(2, 12), a = pick([10, 20, 30, 40, 50, 100]), b = rand(1, 9), op = pick(["+", "-"]), gauche = Math.random() < 0.5;
      const v = op === "+" ? k * (a + b) : k * (a - b);
      return { enonce: gauche ? `Complète pour que l'égalité soit vraie : $${k} ${X} (${a} ${op} \\ldots) = ${k} ${X} ${a} ${op} ${k} ${X} ${b}$` : `Complète pour que l'égalité soit vraie : $${k} ${X} (${a} ${op} ${b}) = ${k} ${X} ${a} ${op} ${k} ${X} \\ldots$`, mode: "nombre", prefixe: "Nombre manquant :", attendu: b,
        erreurs: [{ valeur: k * b, message: `On demande le nombre qui multiplie $${k}$, pas le produit.` }, { valeur: a, message: `$${a}$ est déjà écrit : le nombre manquant est l'autre terme de la parenthèse.` }],
        aides: ["Le facteur $" + k + "$ multiplie **chaque** terme de la parenthèse.", `$${k} ${X} (${a} ${op} ${b}) = ${k} ${X} ${a} ${op} ${k} ${X} ${b}$.`, `Vérifie : les deux membres valent $${v}$.`],
        solution: `$${k} ${X} (${a} ${op} ${b}) = ${k} ${X} ${a} ${op} ${k} ${X} ${b}$ : le nombre manquant est $${b}$. Les deux membres valent $${v}$.` };
    }
    if (t === 3) {
      const k = rand(3, 25), c = rand(2, 9), m = `1${String(c).padStart(2, "0")}`;
      return { enonce: `Calcule astucieusement : $${k} ${X} ${m}$ en écrivant $${m} = 100 + ${c}$.`, figure: Math.random() < 0.5 ? rectDistrib(k, 100, c, { ka: `${k} × 100`, kb: `${k} × ${c}` }) : undefined, mode: "nombre", prefixe: "Résultat :", attendu: k * (100 + c),
        erreurs: [{ valeur: k * 100 + c, message: `Il faut multiplier les deux termes par $${k}$ : $${k} ${X} 100 + ${k} ${X} ${c}$.` }, { valeur: k * 100, message: `Il manque $${k} ${X} ${c} = ${k * c}$.` }],
        aides: ["Distributivité : $k \\times (a + b) = k \\times a + k \\times b$.", `$${k} ${X} (100 + ${c}) = ${k} ${X} 100 + ${k} ${X} ${c}$.`, `$${k} ${X} 100 = ${nb(k * 100)}$ et $${k} ${X} ${c} = ${k * c}$.`],
        solution: `$${k} ${X} ${m} = ${k} ${X} 100 + ${k} ${X} ${c} = ${nb(k * 100)} + ${k * c} = ${nb(k * (100 + c))}$.` };
    }
    if (t === 4) {
      // le rectangle partagé : aire totale
      const k = rand(3, 12), a = rand(4, 15), b = rand(2, 9), u = pick(["m", "cm", "dm"]), P0 = prenom();
      return { enonce: `${P0.nom} veut l'aire de ce terrain rectangulaire, formé de deux parties (dimensions en ${u}). Écris-la sous la forme $${k} ${X} (${a} + ${b})$ ou $${k} ${X} ${a} + ${k} ${X} ${b}$, puis calcule-la, en ${u}².`, figure: rectDistrib(k, a, b, { unite: u, ka: "?", kb: "?" }), mode: "nombre", prefixe: "Aire :", suffixe: `${u}²`, attendu: k * (a + b),
        erreurs: [{ valeur: k * a + b, message: `Les deux parties ont la même largeur $${k}$ : la seconde a pour aire $${k} ${X} ${b}$, pas $${b}$.` }, { valeur: 2 * (k + a + b), message: "Ça, c'est le périmètre du grand rectangle, pas son aire." }],
        aides: ["L'aire d'un rectangle est longueur $\\times$ largeur.", `Grand rectangle : $${k} ${X} (${a} + ${b})$. Ou les deux parties : $${k} ${X} ${a} + ${k} ${X} ${b}$.`, `Les deux calculs donnent le même résultat : c'est la distributivité.`],
        solution: `$${k} ${X} (${a} + ${b}) = ${k} ${X} ${a + b} = ${k * (a + b)}$ et aussi $${k} ${X} ${a} + ${k} ${X} ${b} = ${k * a} + ${k * b} = ${k * (a + b)}$ : l'aire vaut $${k * (a + b)}$ ${u}².` };
    }
    // facteur commun décimal
    const f = Dc(rand(11, 99), 1), base = pick([10, 10, 100]), a = rand(2, base - 2), b = base - a, r = mulD(f, Dc(base)), v = +(r.m / 10 ** r.d).toFixed(6);
    return { enonce: `Calcule astucieusement : $${a} ${X} ${tD(f)} + ${b} ${X} ${tD(f)}$`, mode: "nombre", prefixe: "Résultat :", attendu: v,
      erreurs: [{ valeur: +(v * 10).toFixed(6), message: `Attention à la virgule : multiplier par $${base}$ décale la virgule de $${base === 10 ? 1 : 2}$ rang${base === 10 ? "" : "s"}, pas plus.` }, { valeur: +(v / 10).toFixed(6), message: `Attention à la virgule : multiplier par $${base}$ décale la virgule de $${base === 10 ? 1 : 2}$ rang${base === 10 ? "" : "s"} vers la droite.` }],
      aides: [`Le facteur $${tD(f)}$ est commun aux deux produits.`, `$${a} ${X} ${tD(f)} + ${b} ${X} ${tD(f)} = (${a} + ${b}) ${X} ${tD(f)}$.`, `$${a} + ${b} = ${base}$.`],
      solution: `$${a} ${X} ${tD(f)} + ${b} ${X} ${tD(f)} = (${a} + ${b}) ${X} ${tD(f)} = ${base} ${X} ${tD(f)} = ${tD(r)}$.` };
  };

  /* =====================================================================
     Chapitre 2 : triangles (tr5-) — constructions, médiatrices, hauteurs, médianes
     ===================================================================== */
  const { geo } = window.PM_EXO.college;
  const NOMS3 = [["A", "B", "C"], ["D", "E", "F"], ["M", "N", "P"], ["R", "S", "T"], ["I", "J", "K"], ["E", "F", "G"], ["U", "V", "W"]];
  const nomsTri = () => { const n = pick(NOMS3), d = rand(0, 2); return [n[d], n[(d + 1) % 3], n[(d + 2) % 3]]; };
  const vec = (p, q) => [q[0] - p[0], q[1] - p[1]];
  const angleEn = (P, i) => { const a = P[i], u = vec(a, P[(i + 1) % 3]), v = vec(a, P[(i + 2) % 3]); return (Math.acos((u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v))) * 180) / Math.PI; };
  function triangleHasard() {
    for (let e = 0; e < 800; e++) {
      const P0 = [[rand(40, 80), rand(150, 170)], [rand(230, 280), rand(150, 172)], [rand(90, 230), rand(28, 55)]];
      const th = (rand(-30, 30) * Math.PI) / 180, cx = 160, cy = 105;
      const P = P0.map(([x, y]) => [+(cx + (x - cx) * Math.cos(th) - (y - cy) * Math.sin(th)).toFixed(1), +(cy + (x - cx) * Math.sin(th) + (y - cy) * Math.cos(th)).toFixed(1)]);
      const ang = [0, 1, 2].map((i) => angleEn(P, i)), L = [0, 1, 2].map((i) => Math.hypot(...vec(P[i], P[(i + 1) % 3])));
      if (ang.some((a) => a < 38 || a > 82)) continue;
      if (Math.abs(L[0] - L[1]) < 18 || Math.abs(L[1] - L[2]) < 18 || Math.abs(L[0] - L[2]) < 18) continue;
      if (P.some(([x, y]) => x < 22 || x > 298 || y < 20 || y > 180)) continue;
      return P;
    }
  }
  /* geo() + polygones coloriés (sous la figure) et textes (au-dessus) : polys [[points ou noms], classe], textes [[x, y, texte, classe, ancre]] */
  function geo5(o) {
    let s = geo(o);
    const pt = (n) => (typeof n === "string" ? o.pts[n] : n);
    if (o.polys) { const p = o.polys.map(([L, cl]) => `<polygon class="${cl || "g-rect"}" points="${L.map((n) => pt(n).join(",")).join(" ")}"/>`).join(""); s = s.replace(/<svg[^>]*>/, (m) => m + p); }
    if (o.textes) { const t = o.textes.map(([x, y, txt, cl, anc]) => `<text class="${cl || "g-mesure"}" x="${+(+x).toFixed(1)}" y="${+(+y).toFixed(1)}" text-anchor="${anc || "middle"}">${txt}</text>`).join(""); s = s.replace("</svg>", () => t + "</svg>"); }
    return s;
  }
  // Texte au milieu de [PQ], décalé de d pixels du côté opposé au point G
  const etiq = (P, Q, G, txt, d, cl) => { const m = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2], u = [Q[0] - P[0], Q[1] - P[1]], L = Math.hypot(...u), nn = [-u[1] / L, u[0] / L], sg = (G[0] - m[0]) * nn[0] + (G[1] - m[1]) * nn[1] > 0 ? -1 : 1; return [m[0] + sg * nn[0] * (d || 13), m[1] + sg * nn[1] * (d || 13) + 4, txt, cl]; };
  /* Étiquette de longueur d'un segment [PQ], placée à l'endroit le plus dégagé : on essaie six positions (milieu, un tiers,
     deux tiers, de chaque côté) et on garde la plus éloignée des obstacles (points [x, y] ou segments [[x, y], [x, y]]). */
  const distBoite = (c, w, h, p) => Math.hypot(Math.max(Math.abs(p[0] - c[0]) - w / 2, 0), Math.max(Math.abs(p[1] - c[1]) - h / 2, 0));
  const echant = (A, B, n) => Array.from({ length: n + 1 }, (_, i) => [A[0] + ((B[0] - A[0]) * i) / n, A[1] + ((B[1] - A[1]) * i) / n]);
  function etiqLibre(P, Q, txt, obst, cl) {
    const u = [Q[0] - P[0], Q[1] - P[1]], L = Math.hypot(...u) || 1, n = [-u[1] / L, u[0] / L], w = String(txt).length * 6.4 + 4, h = 12;
    // les points situés sur [PQ] lui-même ne comptent pas (l'écart à [PQ] est déjà réglé)
    const surPQ = (p) => { const t = ((p[0] - P[0]) * u[0] + (p[1] - P[1]) * u[1]) / (L * L); return t > -0.02 && t < 1.02 && Math.abs((p[0] - P[0]) * n[0] + (p[1] - P[1]) * n[1]) < 2; };
    const pts = obst.flatMap((o) => (typeof o[0] === "number" ? [o] : echant(o[0], o[1], Math.max(4, Math.round(Math.hypot(o[1][0] - o[0][0], o[1][1] - o[0][1]) / 6))))).filter((p) => !surPQ(p));
    if (!pts.length) pts.push([-999, -999]);
    let best = null;
    [0.5, 0.36, 0.64, 0.25, 0.75].forEach((f, k) => [1, -1].forEach((sg) => {
      const d = 5 + (Math.abs(n[0]) * w) / 2 + (Math.abs(n[1]) * h) / 2, c = [P[0] + u[0] * f + sg * n[0] * d, P[1] + u[1] * f + sg * n[1] * d];
      let sc = Math.min(...pts.map((p) => distBoite(c, w, h, p))) - (k ? 0.8 * k : 0);
      if (c[0] - w / 2 < 1 || c[0] + w / 2 > 319 || c[1] - h / 2 < 1) sc -= 60;
      if (!best || sc > best.sc) best = { c, sc };
    }));
    return [+best.c[0].toFixed(1), +(best.c[1] + 4).toFixed(1), txt, cl || "g-mesure"];
  }
  // Décalage (pour geo) de l'étiquette d'un point O d'où partent des segments vers les points L : dans le plus grand angle libre
  function libreO(O, L) {
    const a = L.map((p) => Math.atan2(p[1] - O[1], p[0] - O[0])).sort((u, v) => u - v);
    let best = [0, a[0] + Math.PI];
    a.forEach((v, i) => { const w = i + 1 < a.length ? a[i + 1] : a[0] + 2 * Math.PI, g = w - v; if (g > best[0]) best = [g, (v + w) / 2]; });
    const cx = Math.cos(best[1]), cy = Math.sin(best[1]);
    return [Math.round(cx > 0.3 ? 15 * cx - 1 : cx < -0.3 ? 15 * cx + 1 : 0), Math.round(15 * cy + 4)];
  }
  // geo5 + étiquettes de segments placées automatiquement : labels [[P, Q, texte, classe]] (noms de points ou coordonnées)
  function geoAuto(o, labels) {
    const P = (n) => (typeof n === "string" ? o.pts[n] : n), obst = [];
    (o.segs || []).forEach(([a, b]) => obst.push([P(a), P(b)]));
    (o.droites || []).forEach(([a, b]) => { const A = P(a), B = P(b), dx = B[0] - A[0], dy = B[1] - A[1]; obst.push([[A[0] - 0.6 * dx, A[1] - 0.6 * dy], [B[0] + 0.6 * dx, B[1] + 0.6 * dy]]); });
    (o.cercles || []).forEach(([c, r]) => { for (let k = 0; k < 48; k++) obst.push([P(c)[0] + r * Math.cos((k * Math.PI) / 24), P(c)[1] + r * Math.sin((k * Math.PI) / 24)]); });
    (o.extra || []).forEach((x) => obst.push(x));
    Object.keys(o.pts).forEach((k) => { if ((o.caches || []).includes(k)) return; const p = o.pts[k], d = (o.decal && o.decal[k]) || [7, -7]; obst.push(p, [p[0] + d[0] + (d[0] < 0 ? -4 : d[0] > 0 ? 4 : 0), p[1] + d[1] - 4]); });
    (o.textes || []).forEach(([x, y, t]) => { const w = String(t).length * 3.2; obst.push([x - w, y - 4], [x, y - 4], [x + w, y - 4]); });
    o.textes = (o.textes || []).concat(labels.map(([a, b, txt, cl]) => { const t = etiqLibre(P(a), P(b), txt, obst, cl), w = String(txt).length * 3.2; obst.push([t[0] - w, t[1] - 4], [t[0], t[1] - 4], [t[0] + w, t[1] - 4]); return t; }));
    return geo5(o);
  }
  const milieu = (P, Q) => [+((P[0] + Q[0]) / 2).toFixed(1), +((P[1] + Q[1]) / 2).toFixed(1)];
  const centreG = (P) => [(P[0][0] + P[1][0] + P[2][0]) / 3, (P[0][1] + P[1][1] + P[2][1]) / 3];
  // Décalages des étiquettes des points, vers l'extérieur (à partir du point G)
  const decaler = (pts, G, d) => { const o = {}; Object.keys(pts).forEach((k) => { const [x, y] = pts[k], dx = x - G[0], dy = y - G[1], L = Math.hypot(dx, dy) || 1; o[k] = [Math.round((dx / L) * (d || 13)) - 3, Math.round((dy / L) * (d || 13)) + 4]; }); return o; };
  // Triangle inscrit dans le cercle de centre (160 ; 108) et de rayon R : angles en degrés
  const surC = (deg, R) => [+(160 + R * Math.cos(deg * DEG)).toFixed(1), +(108 - R * Math.sin(deg * DEG)).toFixed(1)];
  function triInscrit(rect) {
    const R = 82, a0 = rand(0, 359);
    if (rect) { const a = rand(55, 125); return { P: [surC(a0 + a, R), surC(a0, R), surC(a0 + 180, R)], R }; } // angle droit au premier sommet
    for (;;) { const g1 = rand(80, 150), g2 = rand(80, 150), g3 = 360 - g1 - g2; if (g3 < 80 || g3 > 150) continue; return { P: [surC(a0, R), surC(a0 + g1, R), surC(a0 + g1 + g2, R)], R }; }
  }
  // Triangle de base [BC] horizontale en bas, sommet A en haut : [A, B, C]
  const triBase = () => [[rand(90, 230), rand(28, 48)], [rand(34, 64), rand(166, 174)], [rand(256, 288), rand(166, 174)]];
  // Triangle rectangle en A (premier sommet) : [A, B, C]
  function triRect() {
    for (;;) {
      const A = [rand(60, 110), rand(150, 172)], phi = rand(-18, 12) * DEG, l1 = rand(85, 125), l2 = rand(140, 200);
      const B = [A[0] + l1 * Math.sin(phi), A[1] - l1 * Math.cos(phi)].map((v) => +v.toFixed(1)), C = [A[0] + l2 * Math.cos(phi), A[1] + l2 * Math.sin(phi)].map((v) => +v.toFixed(1));
      if ([A, B, C].every(([x, y]) => x > 20 && x < 300 && y > 22 && y < 182)) return [A, B, C];
    }
  }
  const NOM_DROITE = { mediatrice: (A, B, C) => `la médiatrice de $[${B}${C}]$`, hauteur: (A) => `la hauteur issue de $${A}$`, mediane: (A) => `la médiane issue de $${A}$` };
  // Triangle P (sommets noms) avec une droite remarquable relative au sommet d'indice v (côté opposé : les deux autres)
  function figureDroite(P, noms, type, v) {
    const A = noms[v], B = noms[(v + 1) % 3], C = noms[(v + 2) % 3], pA = P[v], pB = P[(v + 1) % 3], pC = P[(v + 2) % 3];
    const K = noms.includes("K") ? "L" : "K", pts = { [noms[0]]: P[0], [noms[1]]: P[1], [noms[2]]: P[2] }, r1 = (p) => p.map((x) => +x.toFixed(1));
    const M = [(pB[0] + pC[0]) / 2, (pB[1] + pC[1]) / 2], d = vec(pB, pC), Ld = Math.hypot(...d), u = [d[0] / Ld, d[1] / Ld], n0 = [-u[1], u[0]], n = (pA[0] - M[0]) * n0[0] + (pA[1] - M[1]) * n0[1] < 0 ? [-n0[0], -n0[1]] : n0;
    const o = { segs: [[A, B], [B, C], [C, A]], codes: [], droitAngle: [], droites: [], caches: [] };
    if (type === "mediatrice") { pts[K] = r1(M); pts.Q = r1([M[0] + n[0] * 70, M[1] + n[1] * 70]); o.droites.push([K, "Q"]); o.codes.push([B, K, 2], [K, C, 2]); o.droitAngle.push([C, K, "Q"]); o.caches.push("Q"); }
    if (type === "hauteur") { const t = (pA[0] - pB[0]) * u[0] + (pA[1] - pB[1]) * u[1]; pts[K] = r1([pB[0] + u[0] * t, pB[1] + u[1] * t]); o.droites.push([A, K]); o.droitAngle.push([C, K, A]); }
    if (type === "mediane") { pts[K] = r1(M); o.droites.push([A, K]); o.codes.push([B, K, 2], [K, C, 2]); }
    const g = [(P[0][0] + P[1][0] + P[2][0]) / 3, (P[0][1] + P[1][1] + P[2][1]) / 3], decal = {};
    Object.keys(pts).forEach((k) => { const [x, y] = pts[k], dx = x - g[0], dy = y - g[1], L = Math.hypot(dx, dy) || 1; decal[k] = [Math.round((dx / L) * 13) - 3, Math.round((dy / L) * 13) + 4]; });
    return geo(Object.assign({ W: 320, H: 200, pts, decal, aria: `Triangle ${noms.join("")} et une droite tracée en passant par le point ${K}` }, o));
  }
  FIGURES["tr5-hauteur"] = () => figureDroite([[50, 165], [270, 160], [120, 35]], ["B", "C", "A"], "hauteur", 2);
  FIGURES["tr5-mediane"] = () => figureDroite([[50, 165], [270, 160], [120, 35]], ["B", "C", "A"], "mediane", 2);
  FIGURES["tr5-mediatrice"] = () => figureDroite([[50, 165], [270, 160], [120, 35]], ["B", "C", "A"], "mediatrice", 2);
  FIGURES["tr5-circonscrit"] = () => {
    const pts = { A: surC(105, 82), B: surC(215, 82), C: surC(330, 82), O: [160, 108] };
    return geo5({ W: 320, H: 214, pts, segs: [["A", "B"], ["B", "C"], ["C", "A"], ["O", "A"], ["O", "B"], ["O", "C"]], cercles: [["O", 82]], codes: [["O", "A", 1], ["O", "B", 1], ["O", "C", 1]], decal: Object.assign(decaler(pts, [160, 108]), { O: [8, -5] }), aria: "Triangle ABC et son cercle circonscrit de centre O : OA = OB = OC" });
  };
  // Construction au compas : [AB] = 6 cm (1 cm = 34 px), arcs de rayons 4 cm (centre A) et 5 cm (centre B)
  FIGURES["tr5-cours-construction"] = () => {
    const u = 34, A = [58, 165], B = [58 + 6 * u, 165], xc = (36 - 25 + 16) / 12, yc = Math.sqrt(16 - xc * xc), C = [+(A[0] + xc * u).toFixed(1), +(A[1] - yc * u).toFixed(1)];
    const arc = (O, r, a1, a2) => { const p = (a) => [+(O[0] + r * Math.cos(a * DEG)).toFixed(1), +(O[1] - r * Math.sin(a * DEG)).toFixed(1)]; return `<path class="g-arc" d="M${p(a1).join(" ")} A${r} ${r} 0 0 ${a1 < a2 ? 0 : 1} ${p(a2).join(" ")}"/>`; };
    const aC = Math.atan2(A[1] - C[1], C[0] - A[0]) / DEG, bC = Math.atan2(B[1] - C[1], C[0] - B[0]) / DEG;
    return geo5({ W: 320, H: 190, pts: { A, B, C }, segs: [["A", "B"], ["A", "C"], ["B", "C"]], decal: { A: [-14, 6], B: [6, 6], C: [-4, -9] }, textes: [[(A[0] + B[0]) / 2, 182, "6 cm"], [(A[0] + C[0]) / 2 - 22, (A[1] + C[1]) / 2, "4 cm"], [(B[0] + C[0]) / 2 + 22, (B[1] + C[1]) / 2, "5 cm"]], aria: "Construction du triangle ABC avec AB = 6 cm, AC = 4 cm et BC = 5 cm : un arc de cercle de centre A et de rayon 4 cm, un arc de centre B et de rayon 5 cm, ils se coupent en C" })
      .replace("</svg>", () => arc(A, 4 * u, aC - 18, aC + 14) + arc(B, 5 * u, bC + 16, bC - 14) + "</svg>");
  };
  FIGURES["tr5-cours-isocele"] = () => {
    const A = [160, 30], B = [70, 168], C = [250, 168], I = [160, 168];
    return geo5({ W: 320, H: 190, pts: { A, B, C, I }, segs: [["A", "B"], ["A", "C"], ["B", "C"]], droites: [["A", "I"]], codes: [["A", "B", 2], ["A", "C", 2], ["B", "I", 1], ["I", "C", 1]], droitAngle: [["C", "I", "A"]], decal: { A: [8, -2], B: [-14, 6], C: [6, 6], I: [5, 17] }, aria: "Triangle ABC isocèle en A : la droite (AI) passe par A, par le milieu I de [BC] et elle est perpendiculaire à (BC) ; c'est à la fois la médiatrice de [BC], la hauteur et la médiane issues de A" });
  };
  // Une médiane partage le triangle en deux triangles de même aire
  FIGURES["tr5-cours-aires"] = () => {
    const A = [120, 34], B = [40, 166], C = [280, 166], K = [160, 166], H = [120, 166];
    return geo5({ W: 320, H: 192, pts: { A, B, C, K, H }, segs: [["A", "B"], ["A", "C"], ["B", "C"], ["A", "K"]], codes: [["B", "K", 2], ["K", "C", 2]], droitAngle: [["K", "H", "A"]], decal: { A: [-4, -9], B: [-14, 6], C: [6, 6], K: [-3, 18], H: [-3, 18] }, polys: [[["A", "B", "K"], "g-rect"], [["A", "K", "C"], "g-poly g-poly-image"]],
      textes: [[92, 152, "aire 1"], [205, 142, "aire 2"], [126, 118, "h", "g-mesure", "start"]], aria: "Triangle ABC, K milieu de [BC] et la médiane [AK] : les triangles ABK et AKC ont des bases de même longueur et la même hauteur issue de A, donc la même aire" })
      .replace("</svg>", () => `<line class="g-cache" x1="${A[0]}" y1="${A[1]}" x2="${H[0]}" y2="${H[1]}"/></svg>`);
  };
  // Les trois droites remarquables côte à côte (fiche méthode)
  FIGURES["tr5-methode-droites"] = () => {
    const mini = (dx, type, titre) => { const P = [[dx + 32, 30], [dx + 6, 128], [dx + 100, 128]], A = P[0], B = P[1], C = P[2], M = milieu(B, C); let s = `<polygon class="g-poly" points="${P.map((p) => p.join(",")).join(" ")}"/>`;
      if (type === 0) s += `<line class="g-droite" x1="${M[0]}" y1="${M[1] + 14}" x2="${M[0]}" y2="18"/><path class="g-code" d="M${M[0] - 8} ${M[1]}v-8h8"/>${[[B, M], [M, C]].map(([p, q]) => `<line class="g-code" x1="${(p[0] + q[0]) / 2}" y1="${M[1] - 5}" x2="${(p[0] + q[0]) / 2}" y2="${M[1] + 5}"/>`).join("")}`;
      if (type === 1) s += `<line class="g-droite" x1="${A[0]}" y1="${A[1] - 10}" x2="${A[0]}" y2="${M[1] + 12}"/><path class="g-code" d="M${A[0] + 8} ${M[1]}v-8h-8"/>`;
      if (type === 2) s += `<line class="g-droite" x1="${A[0]}" y1="${A[1]}" x2="${M[0]}" y2="${M[1]}"/>${[[B, M], [M, C]].map(([p, q]) => `<line class="g-code" x1="${(p[0] + q[0]) / 2}" y1="${M[1] - 5}" x2="${(p[0] + q[0]) / 2}" y2="${M[1] + 5}"/>`).join("")}`;
      return s + `<text class="g-label" x="${dx + 54}" y="152" text-anchor="middle">${titre}</text>`; };
    return `<svg class="graph" viewBox="0 0 320 160" role="img" aria-label="Trois triangles : la médiatrice d'un côté (milieu et angle droit), la hauteur issue d'un sommet (sommet et angle droit), la médiane issue d'un sommet (sommet et milieu du côté opposé)">${mini(0, 0, "médiatrice")}${mini(108, 1, "hauteur")}${mini(214, 2, "médiane")}</svg>`;
  };
  // Hauteur à l'extérieur d'un triangle obtus (QCM)
  FIGURES["tr5-qcm-obtus"] = () => {
    const A = [70, 40], B = [130, 160], C = [290, 160], K = [70, 160];
    return geo5({ W: 320, H: 186, pts: { A, B, C, K }, segs: [["A", "B"], ["A", "C"], ["B", "C"]], droites: [["A", "K"]], droitAngle: [["B", "K", "A"]], decal: { A: [-14, 0], B: [-2, 18], C: [6, 6], K: [-14, 16] }, aria: "Triangle ABC dont l'angle en B est obtus ; une droite passe par A et coupe le prolongement de [BC] en K avec un angle droit" })
      .replace("</svg>", () => `<line class="g-cache" x1="${K[0]}" y1="${K[1]}" x2="${B[0]}" y2="${B[1]}"/></svg>`);
  };
  FIGURES["tr5-qcm-centre"] = () => {
    const P = [surC(100, 82), surC(215, 82), surC(330, 82)], O = [160, 108], pts = { A: P[0], B: P[1], C: P[2], O }, cotes = [["B", "C", 1], ["A", "C", 2], ["A", "B", 3]];
    let med = "";
    const droitAngle = [], codes = [], caches = [], bouts = [];
    cotes.forEach(([p, q, n], i) => { const m = milieu(pts[p], pts[q]), u = [m[0] - O[0], m[1] - O[1]], L = Math.hypot(...u), e = [+(m[0] + (u[0] / L) * 26).toFixed(1), +(m[1] + (u[1] / L) * 26).toFixed(1)], o = [+(O[0] - (u[0] / L) * 34).toFixed(1), +(O[1] - (u[1] / L) * 34).toFixed(1)];
      pts["_m" + i] = m; pts["_e" + i] = e; caches.push("_m" + i, "_e" + i); droitAngle.push([q, "_m" + i, "_e" + i]); codes.push([p, "_m" + i, n], ["_m" + i, q, n]); bouts.push(e, o);
      med += `<line class="g-droite" x1="${o[0]}" y1="${o[1]}" x2="${e[0]}" y2="${e[1]}"/>`; });
    return geo5({ W: 320, H: 214, pts, segs: [["A", "B"], ["B", "C"], ["C", "A"]], codes, droitAngle, caches, decal: Object.assign(decaler({ A: P[0], B: P[1], C: P[2] }, O), { O: libreO(O, bouts) }), aria: "Triangle ABC et ses trois médiatrices (perpendiculaires aux côtés en leur milieu), qui se coupent au point O" }).replace(/<svg[^>]*>/, (m) => m + med);
  };

  GEN["tr5-droites"] = function () {
    for (let e = 0; e < 20; e++) {
      const P = triangleHasard(); if (!P) continue;
      const noms = nomsTri(), v = rand(0, 2), type = pick(["mediatrice", "hauteur", "mediane"]);
      const A = noms[v], B = noms[(v + 1) % 3], C = noms[(v + 2) % 3];
      const bonne = NOM_DROITE[type](A, B, C);
      const autres = ["mediatrice", "hauteur", "mediane"].filter((t) => t !== type).map((t) => NOM_DROITE[t](A, B, C));
      const voisin = pick([NOM_DROITE[type](B, C, A), NOM_DROITE[type](C, A, B)]);
      const { choix, attendu } = melange(bonne, [...autres, voisin]);
      const K = noms.includes("K") ? "L" : "K";
      const indices = { mediatrice: `${K} est le milieu de $[${B}${C}]$ (codage) et la droite est perpendiculaire à $[${B}${C}]$ (angle droit) : c'est la médiatrice de $[${B}${C}]$. Elle ne passe pas forcément par $${A}$.`, hauteur: `la droite passe par le sommet $${A}$ et elle est perpendiculaire au côté opposé $(${B}${C})$ (angle droit en ${K}) : c'est la hauteur issue de $${A}$. ${K} n'est pas le milieu de $[${B}${C}]$.`, mediane: `la droite passe par le sommet $${A}$ et par ${K}, milieu du côté opposé $[${B}${C}]$ (codage) : c'est la médiane issue de $${A}$. Il n'y a pas d'angle droit.` };
      return { enonce: `Quelle droite est tracée sur la figure ?`, figure: figureDroite(P, noms, type, v), mode: "choix", choix, attendu,
        aides: ["Regarde les codages : des petits traits identiques indiquent un milieu, le petit carré indique un angle droit.", "Une **médiatrice** passe par le milieu d'un côté et lui est perpendiculaire. Une **hauteur** passe par un sommet et est perpendiculaire au côté opposé. Une **médiane** passe par un sommet et le milieu du côté opposé.", "La droite passe-t-elle par un sommet ? Par un milieu ? Fait-elle un angle droit ?"],
        solution: indices[type][0].toUpperCase() + indices[type].slice(1) };
    }
  };

  const OPTS_C = ["Oui, on peut le construire", "Non : une longueur est plus grande que la somme des deux autres", "Non : les trois points seraient alignés", "Non : la somme des deux angles atteint ou dépasse $180^\\circ$"];
  const cm = (x) => `${nb(x)}`;
  GEN["tr5-constructible"] = function () {
    const [A, B, C] = nomsTri(), t = rand(0, 5), dec = Math.random() < 0.35;
    const L = () => (dec ? rand(15, 99) / 10 : rand(2, 12));
    if (t <= 2) {
      let a, b, c;
      for (;;) { a = L(); b = L(); if (t === 0) { const s = a + b, m = Math.abs(a - b); c = dec ? rand(Math.round(m * 10) + 3, Math.round(s * 10) - 3) / 10 : rand(Math.ceil(m) + 1, Math.ceil(s) - 1); if (c > m && c < s && c > 0) break; }
        else if (t === 1) { c = +(a + b + (dec ? rand(1, 30) / 10 : rand(1, 5))).toFixed(1); break; } else { c = +(a + b).toFixed(1); break; } }
      const cotes = shuffle([[`${A}${B}`, a], [`${B}${C}`, b], [`${A}${C}`, c]]).map(([n, x]) => `$${n} = ${cm(x)}$ cm`);
      const [grand, p1, p2] = [a, b, c].sort((u, w) => w - u);
      const s = +(p1 + p2).toFixed(1);
      const sol = t === 0 ? `La plus grande longueur, $${cm(grand)}$ cm, est plus petite que la somme des deux autres : $${cm(p1)} + ${cm(p2)} = ${cm(s)}$. On peut construire le triangle.`
        : t === 1 ? `La plus grande longueur, $${cm(grand)}$ cm, est plus grande que la somme des deux autres, $${cm(p1)} + ${cm(p2)} = ${cm(s)}$ : les deux arcs de cercle ne se coupent pas. Impossible.`
        : `La plus grande longueur est égale à la somme des deux autres : $${cm(p1)} + ${cm(p2)} = ${cm(s)}$. Les trois points sont alignés : on obtient un triangle « aplati », pas un vrai triangle.`;
      return { enonce: `Peut-on construire un triangle $${A}${B}${C}$ tel que ${cotes.join(", ")} ?`, mode: "choix", choix: OPTS_C.slice(), attendu: t === 0 ? 0 : t === 1 ? 1 : 2,
        aides: ["Avec trois longueurs, compare la **plus grande** à la somme des deux autres.", "Plus petite : constructible. Plus grande : impossible. Égale : les points sont alignés.", `La plus grande longueur est $${cm(grand)}$ cm.`], solution: sol };
    }
    if (t === 3) {
      const a = L(), b = L(), ang = rand(2, 34) * 5;
      return { enonce: `Peut-on construire un triangle $${A}${B}${C}$ tel que $${A}${B} = ${cm(a)}$ cm, $${A}${C} = ${cm(b)}$ cm et $\\widehat{${B}${A}${C}} = ${ang}^\\circ$ ?`, mode: "choix", choix: OPTS_C.slice(), attendu: 0,
        aides: ["On connaît deux côtés et l'angle compris entre eux.", `On trace $[${A}${B}]$, puis l'angle de $${ang}^\\circ$ en $${A}$, puis on place $${C}$ sur la demi-droite.`, "Toute mesure d'angle strictement comprise entre $0^\\circ$ et $180^\\circ$ convient."],
        solution: `Oui : on trace $[${A}${B}]$ de $${cm(a)}$ cm, l'angle de $${ang}^\\circ$ de sommet $${A}$, puis on reporte $${A}${C} = ${cm(b)}$ cm sur le côté de l'angle. Le triangle existe (et il est unique).` };
    }
    const a1 = rand(4, 30) * 5, ok = t === 4;
    const a2 = ok ? rand(1, Math.floor((175 - a1) / 5)) * 5 : rand(Math.ceil((180 - a1) / 5), 34) * 5;
    if (!ok && a1 + a2 < 180) return GEN["tr5-constructible"]();
    const c = L();
    return { enonce: `Peut-on construire un triangle $${A}${B}${C}$ tel que $${A}${B} = ${cm(c)}$ cm, $\\widehat{${C}${A}${B}} = ${a1}^\\circ$ et $\\widehat{${A}${B}${C}} = ${a2}^\\circ$ ?`, mode: "choix", choix: OPTS_C.slice(), attendu: ok ? 0 : 3,
      aides: ["On connaît un côté et les deux angles qui l'encadrent.", "On trace $[" + A + B + "]$ puis un angle à chaque extrémité : les deux côtés doivent se couper.", `Calcule la somme des deux angles : $${a1} + ${a2}$.`],
      solution: ok ? `$${a1}^\\circ + ${a2}^\\circ = ${a1 + a2}^\\circ$, moins de $180^\\circ$ : les deux côtés tracés se coupent en $${C}$. On peut construire le triangle.` : `$${a1}^\\circ + ${a2}^\\circ = ${a1 + a2}^\\circ$ : comme la somme des angles d'un triangle vaut $180^\\circ$, c'est impossible. Les deux côtés tracés ne se coupent pas${a1 + a2 === 180 ? " (ils sont parallèles)" : ""}.` };
  };

  // Trois villages (points nommés, sans lettres) pour les problèmes de médiatrices
  function figVillages(noms) {
    const P = triangleHasard(), G = centreG(P);
    let s = `<svg class="graph" viewBox="0 0 320 200" role="img" aria-label="Trois villages : ${noms.join(", ")}"><polygon class="g-poly" points="${P.map((p) => p.join(",")).join(" ")}" style="fill-opacity:0.08"/>`;
    P.forEach((p, i) => { const haut = p[1] < G[1]; s += `<circle class="g-point" cx="${p[0]}" cy="${p[1]}" r="4"/><text class="g-plabel" x="${Math.min(282, Math.max(38, p[0]))}" y="${haut ? p[1] - 9 : p[1] + 18}" text-anchor="middle">${noms[i]}</text>`; });
    return s + `</svg>`;
  }
  GEN["tr5-proprietes"] = function () {
    const [A, B, C] = nomsTri(), t = rand(0, 8), V = shuffle(["Combani", "Ouangani", "Tsingoni", "Sada", "Chiconi", "Kahani", "Barakani", "Coconi", "Mroalé", "Miréréni"]).slice(0, 3), Mi = ["I", "H", "L"].find((l) => ![A, B, C].includes(l));
    let figure;
    if (t === 1) { const { P, R } = triInscrit(), pts = { [A]: P[0], [B]: P[1], [C]: P[2], _z: [160, 108] }; figure = geo5({ W: 320, H: 216, pts, segs: [[A, B], [B, C], [C, A]], cercles: [["_z", R]], caches: ["_z"], decal: decaler(pts, [160, 108]), aria: `Triangle ${A}${B}${C} et son cercle circonscrit, dont le centre n'est pas marqué` }); }
    if (t === 4 || t === 5) { const P = triRect(), pts = { [A]: P[0], [B]: P[1], [C]: P[2] }; figure = geo5({ W: 320, H: 196, pts, segs: [[A, B], [B, C], [C, A]], droitAngle: [[B, A, C]], decal: decaler(pts, centreG(P)), aria: `Triangle ${A}${B}${C} rectangle en ${A}` }); }
    if (t === 6) { const w = rand(70, 105), pts = { [A]: [160, rand(28, 44)], [B]: [160 - w, 168], [C]: [160 + w, 168], [Mi]: [160, 168] }; figure = geo5({ W: 320, H: 192, pts, segs: [[A, B], [A, C], [B, C]], droites: [[A, Mi]], codes: [[A, B, 2], [A, C, 2], [B, Mi, 1], [Mi, C, 1]], decal: { [A]: [8, -2], [B]: [-14, 6], [C]: [6, 6], [Mi]: [5, 17] }, aria: `Triangle ${A}${B}${C} isocèle en ${A}, ${Mi} milieu de [${B}${C}] et la droite (${A}${Mi})` }); }
    if (t === 7) figure = figVillages(V);
    const Q = [
      [`On cherche les points situés à égale distance de $${A}$ et de $${B}$. Ils sont tous sur :`, `la médiatrice de $[${A}${B}]$`, [`la médiane issue de $${C}$`, `la hauteur issue de $${C}$`, `la médiatrice de $[${B}${C}]$`], `Tout point de la médiatrice de $[${A}${B}]$ est à égale distance de $${A}$ et de $${B}$ (et seulement ceux-là).`],
      [`Le centre du cercle circonscrit au triangle $${A}${B}${C}$ est le point de concours :`, "des trois médiatrices", ["des trois hauteurs", "des trois médianes", "des trois côtés prolongés"], "Le centre est à égale distance des trois sommets : il est sur les trois médiatrices, qui sont concourantes."],
      [`Pour partager le triangle $${A}${B}${C}$ en deux triangles de même aire, avec une droite passant par $${A}$, on trace :`, `la médiane issue de $${A}$`, [`la hauteur issue de $${A}$`, `la médiatrice de $[${B}${C}]$`, `la parallèle à $(${B}${C})$ passant par $${A}$`], `Une médiane partage un triangle en deux triangles d'aires égales : même hauteur issue de $${A}$, et deux bases égales.`],
      [`La distance du point $${A}$ à la droite $(${B}${C})$ se mesure le long de :`, `la hauteur issue de $${A}$`, [`la médiane issue de $${A}$`, `la médiatrice de $[${B}${C}]$`, `le côté $[${A}${B}]$`], `La distance d'un point à une droite se mesure perpendiculairement : c'est la hauteur issue de $${A}$.`],
      [`$${A}${B}${C}$ est rectangle en $${A}$. Le centre de son cercle circonscrit est :`, `le milieu de $[${B}${C}]$`, [`le point $${A}$`, `le milieu de $[${A}${B}]$`, `à l'extérieur du triangle`], `Dans un triangle rectangle, le centre du cercle circonscrit est le milieu de l'hypoténuse $[${B}${C}]$.`],
      [`$${A}${B}${C}$ est rectangle en $${A}$. Ses trois hauteurs se coupent :`, `en $${A}$`, [`au milieu de $[${B}${C}]$`, `en $${B}$`, `à l'extérieur du triangle`], `Les côtés $[${A}${B}]$ et $[${A}${C}]$ sont perpendiculaires : chacun est la hauteur relative à l'autre. Les hauteurs se coupent donc en $${A}$.`],
      [`$${A}${B}${C}$ est isocèle en $${A}$ et $${Mi}$ est le milieu de $[${B}${C}]$. La droite $(${A}${Mi})$ est :`, `à la fois médiane, hauteur et médiatrice de $[${B}${C}]$`, [`seulement la médiane issue de $${A}$`, `seulement la hauteur issue de $${A}$`, `la médiatrice de $[${A}${B}]$`], `$${A}$ est à égale distance de $${B}$ et $${C}$, donc il est sur la médiatrice de $[${B}${C}]$, qui passe aussi par $${Mi}$ : $(${A}${Mi})$ est cette médiatrice, donc aussi la hauteur et la médiane issues de $${A}$.`],
      [`Les villages ${deN(V[0])}, ${V[1]} et ${V[2]} veulent construire un château d'eau à la même distance des trois. Où faut-il le placer ?`, "au point de concours des médiatrices du triangle formé par les trois villages", ["au point de concours des hauteurs du triangle", "au point de concours des médianes du triangle", `au milieu du chemin entre ${V[0]} et ${V[1]}`], "Être à la même distance des trois villages, c'est être sur les trois médiatrices : c'est le centre du cercle circonscrit au triangle."],
      [`Dans un triangle $${A}${B}${C}$, combien de hauteurs peut-on tracer ?`, "$3$, et elles sont concourantes", ["$1$ seule", "$3$, et elles sont toujours parallèles", "$6$"], "Une hauteur par sommet : $3$ hauteurs, qui se coupent en un même point."]
    ];
    const [q, bonne, faux, expl] = Q[t];
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: q, figure, mode: "choix", choix, attendu,
      aides: ["**Médiatrice** : perpendiculaire à un côté en son milieu. **Hauteur** : issue d'un sommet, perpendiculaire au côté opposé. **Médiane** : issue d'un sommet, passe par le milieu du côté opposé.", "Les médiatrices se coupent au centre du cercle circonscrit ; les hauteurs sont concourantes ; une médiane partage le triangle en deux triangles de même aire.", "Fais un schéma à main levée pour vérifier."],
      solution: `Réponse : ${bonne.replace(/[.]$/, "")}. ${expl}` };
  };

  GEN["tr5-mediatrice"] = function () {
    const [A, B, C] = nomsTri(), t = rand(0, 5), x = Dc(rand(15, 95), 1), X = tD(x), xv = x.m / 10, O = [160, 108];
    // y < 1,6 x : le point M (ou le triangle OBC) existe vraiment
    const y = Dc(rand(Math.max(10, Math.ceil(8 * xv)), Math.floor(16 * xv) - 1), 1), yv = y.m / 10;
    const M = [A, B, C].includes("M") ? "P" : "M", Oc = [A, B, C].includes("O") ? "Ω" : "O", cm = (v) => `${nbTexte(v)} cm`;
    if (t <= 1) {
      // segment horizontal, médiatrice verticale, M au-dessus
      const AB = t === 1 ? yv : xv * (rand(8, 14) / 10), h = Math.sqrt(Math.max(xv * xv - (AB * AB) / 4, 0.25)), k = Math.min(220 / AB, 130 / h);
      if (k * h < 45) return GEN["tr5-mediatrice"](); // triangle trop plat : le nom de M toucherait la longueur écrite sur [AB]
      const pA = [+(160 - (k * AB) / 2).toFixed(1), 170], pB = [+(160 + (k * AB) / 2).toFixed(1), 170], pM = [160, +(170 - k * h).toFixed(1)];
      const fig = geoAuto({ W: 320, H: 196, pts: { [A]: pA, [B]: pB, [M]: pM, _k: [160, 170] }, segs: [[A, B], [M, A], [M, B]], droites: [["_k", M]], codes: [[A, "_k", 1], ["_k", B, 1]], droitAngle: [[B, "_k", M]], caches: ["_k"], decal: { [A]: [-14, 6], [B]: [6, 6], [M]: [8, -4] }, aria: `Segment [${A}${B}], sa médiatrice et un point ${M} de la médiatrice relié à ${A} et à ${B}` },
        [[M, A, cm(xv)], t === 1 ? [A, B, cm(yv)] : [M, B, "?"]]);
      if (t === 0) return { enonce: `Le point $${M}$ est sur la médiatrice du segment $[${A}${B}]$ et $${M}${A} = ${X}$ cm. Combien mesure $${M}${B}$ ?`, figure: fig, mode: "nombre", prefixe: `$${M}${B} =$`, suffixe: "cm", attendu: xv,
        erreurs: [{ valeur: xv / 2, message: `$${M}${B}$ n'est pas la moitié de $${M}${A}$ : les deux longueurs sont **égales**.` }, { valeur: 2 * xv, message: `$${M}$ est à la même distance de $${A}$ et de $${B}$ : $${M}${B} = ${M}${A}$.` }],
        aides: ["Quelle propriété ont les points de la médiatrice d'un segment ?", `Tout point de la médiatrice de $[${A}${B}]$ est à égale distance de $${A}$ et de $${B}$.`, `Donc $${M}${A} = ${M}${B}$.`], solution: `$${M}$ est sur la médiatrice de $[${A}${B}]$, donc $${M}${B} = ${M}${A} = ${X}$ cm.` };
      const p = addD(addD(x, x), y);
      return { enonce: `Le point $${M}$ est sur la médiatrice de $[${A}${B}]$, avec $${M}${A} = ${X}$ cm et $${A}${B} = ${tD(y)}$ cm. Quel est le périmètre du triangle $${M}${A}${B}$ ?`, figure: fig, mode: "nombre", prefixe: "Périmètre :", suffixe: "cm", attendu: p.m / 10 ** p.d,
        erreurs: [{ valeur: +(xv + yv).toFixed(2), message: `Il manque le côté $[${M}${B}]$ : il mesure aussi $${X}$ cm.` }, { valeur: +(2 * xv + 2 * yv).toFixed(2), message: `Le triangle $${M}${A}${B}$ a trois côtés : $${M}${A}$, $${M}${B}$ et $${A}${B}$ (une seule fois).` }],
        aides: [`$${M}$ est à égale distance de $${A}$ et de $${B}$.`, `Donc $${M}${B} = ${X}$ cm : le triangle est isocèle en $${M}$.`, "Additionne les trois côtés."], solution: `$${M}${B} = ${M}${A} = ${X}$ cm, donc le périmètre vaut $${X} + ${X} + ${tD(y)} = ${tD(p)}$ cm.` };
    }
    if (t === 2 || t === 5) {
      // triangle inscrit dans le cercle de centre O (rayon OA = x) ; t = 5 : corde [BC] de longueur y à l'échelle
      const R = 82, al = Math.asin(Math.min(0.98, yv / (2 * xv))) / DEG, a0 = t === 5 ? rand(-25, 25) : rand(0, 359);
      const P = t === 5 ? [surC(90 + a0 + rand(-35, 35), R), surC(270 + a0 - al, R), surC(270 + a0 + al, R)] : triInscrit().P;
      const pts = { [A]: P[0], [B]: P[1], [C]: P[2], [Oc]: O };
      const fig = geoAuto({ W: 320, H: 216, pts, segs: [[A, B], [B, C], [C, A], [Oc, A], ...(t === 5 ? [[Oc, B], [Oc, C]] : [])], cercles: [[Oc, R]], decal: Object.assign(decaler(pts, O), { [Oc]: libreO(O, t === 5 ? P : [P[0]]) }), aria: `Triangle ${A}${B}${C} inscrit dans le cercle de centre ${Oc}` },
        [[Oc, A, cm(xv)], ...(t === 5 ? [[B, C, cm(yv)]] : [])]);
      if (t === 2) { const d = mulD(x, Dc(2));
        return { enonce: `Le cercle circonscrit au triangle $${A}${B}${C}$ a pour centre $${Oc}$, et $${Oc}${A} = ${X}$ cm. Combien mesure son diamètre ?`, figure: fig, mode: "nombre", prefixe: "Diamètre :", suffixe: "cm", attendu: d.m / 10 ** d.d,
          erreurs: [{ valeur: xv, message: "Ça, c'est le rayon. Le diamètre est deux fois plus long." }, { valeur: xv / 2, message: "Le diamètre est le **double** du rayon, pas la moitié." }],
          aides: [`Le cercle passe par $${A}$, $${B}$ et $${C}$ : $${Oc}${A}$ est un rayon.`, "Le diamètre vaut deux rayons.", `$2 \\times ${X}$.`], solution: `$${Oc}${A}$ est un rayon : le diamètre mesure $2 \\times ${X} = ${tD(d)}$ cm.` }; }
      const p = addD(addD(x, x), y);
      return { enonce: `$${Oc}$ est le centre du cercle circonscrit au triangle $${A}${B}${C}$, avec $${Oc}${A} = ${X}$ cm et $${B}${C} = ${tD(y)}$ cm. Quel est le périmètre du triangle $${Oc}${B}${C}$ ?`, figure: fig, mode: "nombre", prefixe: "Périmètre :", suffixe: "cm", attendu: p.m / 10 ** p.d,
        erreurs: [{ valeur: +(xv + yv).toFixed(2), message: `Il manque un côté : $${Oc}${B}$ et $${Oc}${C}$ mesurent tous les deux un rayon.` }, { valeur: +(3 * xv).toFixed(2), message: `$${B}${C}$ n'est pas un rayon : il mesure $${tD(y)}$ cm.` }],
        aides: [`$${Oc}$ est à égale distance des trois sommets : $${Oc}${A} = ${Oc}${B} = ${Oc}${C}$.`, `Donc $${Oc}${B} = ${Oc}${C} = ${X}$ cm.`, "Additionne les trois côtés du triangle."],
        solution: `$${Oc}${B} = ${Oc}${C} = ${Oc}${A} = ${X}$ cm (rayons du cercle). Périmètre : $${X} + ${X} + ${tD(y)} = ${tD(p)}$ cm.` };
    }
    // triangle rectangle en A inscrit : [BC] est un diamètre
    const { P, R } = triInscrit(true), pts = { [A]: P[0], [B]: P[1], [C]: P[2], [Oc]: O };
    if (t === 3) { const h = Dc(rand(20, 160), 1), r = h.m % 2 === 0 ? Dc(h.m / 2, 1) : Dc(h.m * 5, 2);
      const fig = geoAuto({ W: 320, H: 216, pts, segs: [[A, B], [B, C], [C, A]], cercles: [[Oc, R]], caches: [Oc], droitAngle: [[B, A, C]], decal: decaler(pts, O), aria: `Triangle ${A}${B}${C} rectangle en ${A} et son cercle circonscrit` }, [[B, C, cm(h.m / 10)]]);
      return { enonce: `Le triangle $${A}${B}${C}$ est rectangle en $${A}$ et $${B}${C} = ${tD(h)}$ cm. Quel est le rayon de son cercle circonscrit ?`, figure: fig, mode: "nombre", prefixe: "Rayon :", suffixe: "cm", attendu: h.m / 20,
        erreurs: [{ valeur: h.m / 10, message: "L'hypoténuse est un **diamètre** du cercle circonscrit : le rayon en est la moitié." }, { valeur: h.m / 5, message: "Le rayon est la **moitié** du diamètre, pas le double." }],
        aides: ["Dans un triangle rectangle, où est le centre du cercle circonscrit ?", `C'est le milieu de l'hypoténuse $[${B}${C}]$.`, `$[${B}${C}]$ est donc un diamètre : le rayon vaut $${tD(h)} \\div 2$.`], solution: `Le centre est le milieu de l'hypoténuse $[${B}${C}]$, qui est un diamètre. Rayon : $${tD(h)} \\div 2 = ${tD(r)}$ cm.` }; }
    const d = mulD(x, Dc(2));
    const fig = geoAuto({ W: 320, H: 216, pts, segs: [[A, B], [B, C], [C, A], [Oc, A]], cercles: [[Oc, R]], droitAngle: [[B, A, C]], decal: Object.assign(decaler(pts, O), { [Oc]: libreO(O, P) }), aria: `Triangle ${A}${B}${C} rectangle en ${A}, son cercle circonscrit de centre ${Oc} et le rayon [${Oc}${A}]` }, [[Oc, A, cm(xv)], [B, C, "?"]]);
    return { enonce: `Le triangle $${A}${B}${C}$ est rectangle en $${A}$. Son cercle circonscrit, de centre $${Oc}$, a un rayon de $${X}$ cm. Combien mesure l'hypoténuse $[${B}${C}]$ ?`, figure: fig, mode: "nombre", prefixe: `$${B}${C} =$`, suffixe: "cm", attendu: d.m / 10 ** d.d,
      erreurs: [{ valeur: xv, message: "L'hypoténuse est un diamètre, pas un rayon." }, { valeur: xv / 2, message: "L'hypoténuse est un diamètre : elle mesure **deux** rayons." }],
      aides: ["Le centre du cercle circonscrit d'un triangle rectangle est le milieu de l'hypoténuse.", "L'hypoténuse est donc un diamètre.", "Diamètre $= 2 \\times$ rayon."], solution: `L'hypoténuse est un diamètre : $${B}${C} = 2 \\times ${X} = ${tD(d)}$ cm.` };
  };

  // Triangle de base [BC] avec la médiane [AM] : aires écrites dans les deux parties (ou rien)
  function figMediane(N, M, t1, t2, opt) {
    const [A, B, C] = N, P = triBase(), pM = milieu(P[1], P[2]), pts = { [A]: P[0], [B]: P[1], [C]: P[2], [M]: pM };
    const gA = [(P[0][0] + P[1][0] + pM[0]) / 3, (P[0][1] + P[1][1] + pM[1]) / 3 + 10], gC = [(P[0][0] + P[2][0] + pM[0]) / 3, (P[0][1] + P[2][1] + pM[1]) / 3 + 10];
    const o = { W: 320, H: (opt && opt.H) || 196, pts, segs: [[A, B], [B, C], [C, A], [A, M]], codes: [[B, M, 2], [M, C, 2]], decal: { [A]: [-4, -9], [B]: [-14, 6], [C]: [6, 6], [M]: [-3, 18] }, polys: [[[A, B, M], "g-rect"], [[A, M, C], "g-poly g-poly-image"]], textes: [], aria: `Triangle ${A}${B}${C}, ${M} milieu de [${B}${C}] et la médiane [${A}${M}]` };
    if (t1) o.textes.push([gA[0], gA[1], t1, "g-label"]);
    if (t2) o.textes.push([gC[0], gC[1], t2, "g-label"]);
    if (opt && opt.J) { const pJ = milieu(P[1], pM); pts[opt.J] = pJ; o.segs.push([A, opt.J]); o.codes = [[B, opt.J, 1], [opt.J, M, 1], [M, C, 2]]; o.decal[opt.J] = [-3, 18]; o.polys = [[[A, B, opt.J], "g-rect"]]; o.textes = [[(P[0][0] + P[1][0] + pJ[0]) / 3, (P[0][1] + P[1][1] + pJ[1]) / 3 + 12, "?", "g-label"]]; o.aria += ` et ${opt.J} milieu de [${B}${M}]`; }
    if (opt && opt.base) { o.textes.push([(P[1][0] + pM[0]) / 2, (P[1][1] + pM[1]) / 2 + 15, "?", "g-mesure"], [(P[1][0] + P[2][0]) / 2, Math.max(P[1][1], P[2][1]) + 32, opt.base]); o.polys = []; }
    return geo5(o);
  }
  GEN["tr5-mediane"] = function () {
    const N = nomsTri(), [A, B, C] = N, t = rand(0, 4), S = Dc(rand(10, 200) * 2, 1), s = Dc(S.m / 2, 1), v = (D) => D.m / 10 ** D.d;
    const M = N.includes("M") ? "K" : "M", I = N.includes("I") ? "H" : "I", J = N.includes("J") ? "L" : "J", aire = (D) => `${nbTexte(v(D))} cm²`;
    if (t === 0) return { enonce: `Le triangle $${A}${B}${C}$ a une aire de $${tD(S)}$ cm². $${M}$ est le milieu de $[${B}${C}]$. Quelle est l'aire du triangle $${A}${B}${M}$ ?`, figure: figMediane(N, M, "?", ""), mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: v(s),
      erreurs: [{ valeur: v(S), message: "Le triangle $" + A + B + M + "$ n'est qu'une partie du triangle $" + A + B + C + "$." }, { valeur: v(S) * 2, message: "Le triangle est partagé en deux : on **divise** l'aire par $2$." }],
      aides: [`$[${A}${M}]$ est la médiane issue de $${A}$.`, "Une médiane partage un triangle en deux triangles de même aire.", `Aire de $${A}${B}${M}$ $=$ aire de $${A}${B}${C}$ $\\div 2$.`], solution: `$[${A}${M}]$ est une médiane : elle partage le triangle en deux triangles de même aire. Aire de $${A}${B}${M}$ : $${tD(S)} \\div 2 = ${tD(s)}$ cm².` };
    if (t === 1) return { enonce: `$${M}$ est le milieu de $[${B}${C}]$ et le triangle $${A}${B}${M}$ a une aire de $${tD(s)}$ cm². Quelle est l'aire du triangle $${A}${B}${C}$ ?`, figure: figMediane(N, M, aire(s), ""), mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: v(S),
      erreurs: [{ valeur: v(s), message: `Le triangle $${A}${B}${C}$ est formé de $${A}${B}${M}$ et de $${A}${M}${C}$.` }, { valeur: v(s) / 2, message: "L'aire du grand triangle est le **double** de celle du petit, pas la moitié." }],
      aides: [`$[${A}${M}]$ est une médiane du triangle $${A}${B}${C}$.`, `Les triangles $${A}${B}${M}$ et $${A}${M}${C}$ ont la même aire.`, "L'aire totale est le double."], solution: `Les triangles $${A}${B}${M}$ et $${A}${M}${C}$ ont la même aire, donc l'aire de $${A}${B}${C}$ vaut $2 \\times ${tD(s)} = ${tD(S)}$ cm².` };
    if (t === 2) return { enonce: `$${M}$ est le milieu de $[${B}${C}]$ et le triangle $${A}${M}${C}$ a une aire de $${tD(s)}$ cm². Quelle est l'aire du triangle $${A}${B}${M}$ ?`, figure: figMediane(N, M, "?", aire(s)), mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: v(s),
      erreurs: [{ valeur: v(S), message: "Ça, c'est l'aire du grand triangle." }, { valeur: v(s) / 2, message: "Les deux petits triangles ont la **même** aire : on ne divise pas." }],
      aides: [`$[${A}${M}]$ est la médiane issue de $${A}$.`, "Elle partage le triangle en deux triangles de même aire.", "Les deux petits triangles ont donc la même aire."], solution: `$[${A}${M}]$ est une médiane, donc $${A}${B}${M}$ et $${A}${M}${C}$ ont la même aire : $${tD(s)}$ cm².` };
    if (t === 3) { const Q = Dc(rand(10, 200) * 4, 1), q = Dc(Q.m / 4, 1);
      return { enonce: `Le triangle $${A}${B}${C}$ a une aire de $${tD(Q)}$ cm². $${I}$ est le milieu de $[${B}${C}]$ et $${J}$ le milieu de $[${B}${I}]$. Quelle est l'aire du triangle $${A}${B}${J}$ ?`, figure: figMediane(N, I, "", "", { J }), mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: v(q),
        erreurs: [{ valeur: v(Q) / 2, message: `Ça, c'est l'aire de $${A}${B}${I}$. Il faut encore partager avec la médiane $[${A}${J}]$.` }, { valeur: v(Q), message: `Ça, c'est l'aire du grand triangle : $${A}${B}${J}$ est la moitié de $${A}${B}${I}$, qui est elle-même la moitié de $${A}${B}${C}$.` }],
        aides: [`$[${A}${I}]$ est une médiane de $${A}${B}${C}$ : aire de $${A}${B}${I}$ $= ${tD(Q)} \\div 2$.`, `$[${A}${J}]$ est une médiane du triangle $${A}${B}${I}$.`, "Elle partage encore cette aire en deux."], solution: `Aire de $${A}${B}${I}$ : $${tD(Q)} \\div 2 = ${tD(Dc(Q.m / 2, 1))}$ cm². Puis $[${A}${J}]$ est une médiane de $${A}${B}${I}$ : aire de $${A}${B}${J}$ $= ${tD(Dc(Q.m / 2, 1))} \\div 2 = ${tD(q)}$ cm².` }; }
    const Lg = Dc(rand(20, 180) * 2, 1), h = Dc(Lg.m / 2, 1);
    return { enonce: `Dans le triangle $${A}${B}${C}$, $[${A}${M}]$ est la médiane issue de $${A}$ et $${B}${C} = ${tD(Lg)}$ cm. Combien mesure $${B}${M}$ ?`, figure: figMediane(N, M, "", "", { base: `${B}${C} = ${nbTexte(v(Lg))} cm`, H: 214 }), mode: "nombre", prefixe: `$${B}${M} =$`, suffixe: "cm", attendu: v(h),
      erreurs: [{ valeur: v(Lg), message: `$${M}$ est le milieu de $[${B}${C}]$ : $${B}${M}$ est la **moitié** de $${B}${C}$.` }, { valeur: v(Lg) * 2, message: `$${B}${M}$ est une partie de $[${B}${C}]$ : elle est plus courte que $${B}${C}$.` }],
      aides: ["Une médiane passe par un sommet et par le milieu du côté opposé.", `$${M}$ est donc le milieu de $[${B}${C}]$.`, `$${B}${M} = ${B}${C} \\div 2$.`], solution: `$${M}$ est le milieu de $[${B}${C}]$ : $${B}${M} = ${tD(Lg)} \\div 2 = ${tD(h)}$ cm.` };
  };

  /* =====================================================================
     Chapitre 3 : fractions (fr5-) — fractions égales, comparer, additionner et soustraire
     ===================================================================== */
  const { fr, frNet, pgcd, CONSIGNE_FR, FRAC_APPROX } = window.PM_EXO.college;
  const ppcm = (a, b) => (a * b) / pgcd(a, b);
  const frT = (a, b) => (b === 1 ? `${a}` : fr(a, b));
  const { droiteFractions } = window.PM_EXO.college;
  // Fraction écrite dans une figure : numérateur, trait, dénominateur ; le trait est à la hauteur y
  const fracSvg = (x, y, n, d, cl) => { const L = 6 + 3.6 * Math.max(String(n).length, String(d).length); return `<text class="${cl || "g-label"}" x="${x}" y="${y - 3}" text-anchor="middle">${n}</text><line class="g-segment" x1="${x - L}" y1="${y}" x2="${x + L}" y2="${y}" style="stroke-width:1.3"/><text class="${cl || "g-label"}" x="${x}" y="${y + 12}" text-anchor="middle">${d}</text>`; };
  /* Barre unité partagée en o.parts parts égales ; o.seg = [[début, fin, classe]] (en parts) pour colorier ; o.sub : chaque part
     redécoupée en o.sub (pointillés) ; o.lab : [n, d] (fraction écrite à gauche) ou texte ; o.x0, o.w, o.h, o.y */
  function barreFr(o) {
    const x0 = o.x0 == null ? 58 : o.x0, w = o.w || 250, h = o.h || 24, y = o.y, b = o.parts, X = (i) => +(x0 + (w * i) / b).toFixed(1);
    let s = "";
    (o.seg || []).forEach(([i, j, cl]) => { s += `<rect class="${cl || "g-aire"}" x="${X(i)}" y="${y}" width="${+(X(j) - X(i)).toFixed(1)}" height="${h}"/>`; });
    if (o.sub > 1) for (let i = 1; i < b * o.sub; i++) if (i % o.sub) { const x = +(x0 + (w * i) / (b * o.sub)).toFixed(1); s += `<line class="g-guide" x1="${x}" y1="${y}" x2="${x}" y2="${y + h}"/>`; }
    s += `<g class="g-grid">${Array.from({ length: b - 1 }, (_, i) => `<line x1="${X(i + 1)}" y1="${y}" x2="${X(i + 1)}" y2="${y + h}"/>`).join("")}</g><rect class="g-unite" x="${x0}" y="${y}" width="${w}" height="${h}"/>`;
    if (o.lab) s += Array.isArray(o.lab) ? fracSvg(x0 - 26, y + h / 2 - 1, o.lab[0], o.lab[1]) : `<text class="g-label" x="${x0 - 8}" y="${y + h / 2 + 4}" text-anchor="end">${o.lab}</text>`;
    return s;
  }
  const svgBandes = (H, contenu, aria) => `<svg class="graph bandes" viewBox="0 0 320 ${H}" role="img" aria-label="${aria}">${contenu}</svg>`;
  // Schéma en barre d'un problème : un tout partagé en L parts ; parts = [[nombre de parts, texte, classe]] ; le reste porte « ? »
  function schemaFr(L, parts, total, aria) {
    const x0 = 14, w = 292, y = 30, h = 30, X = (i) => +(x0 + (w * i) / L).toFixed(1);
    let s = "", k = 0;
    parts.forEach(([n, txt, cl]) => { s += `<rect class="${cl}" x="${X(k)}" y="${y}" width="${+(X(k + n) - X(k)).toFixed(1)}" height="${h}"/>`; if (txt) s += `<text class="g-label" x="${+((X(k) + X(k + n)) / 2).toFixed(1)}" y="${y - 8}" text-anchor="middle">${txt}</text>`; k += n; });
    if (k < L) s += `<text class="g-mesure" x="${+((X(k) + X(L)) / 2).toFixed(1)}" y="${y + h / 2 + 5}" text-anchor="middle">?</text>`;
    s += `<g class="g-grid">${Array.from({ length: L - 1 }, (_, i) => `<line x1="${X(i + 1)}" y1="${y}" x2="${X(i + 1)}" y2="${y + h}"/>`).join("")}</g><rect class="g-unite" x="${x0}" y="${y}" width="${w}" height="${h}"/>`;
    s += `<path class="g-accolade" d="M${x0 + 2} ${y + h + 8} V${y + h + 14} H${x0 + w - 2} V${y + h + 8}"/><text class="g-label" x="160" y="${y + h + 30}" text-anchor="middle">${total}</text>`;
    return svgBandes(y + h + 38, s, aria);
  }
  FIGURES["fr5-cours-egales"] = () => svgBandes(84, barreFr({ y: 8, parts: 3, seg: [[0, 2]], lab: [2, 3] }) + barreFr({ y: 50, parts: 15, seg: [[0, 10]], lab: [10, 15] }), "Deux bandes de même longueur : 2 parts sur 3 et 10 parts sur 15 ; la partie coloriée a la même longueur, donc 2/3 = 10/15");
  FIGURES["fr5-cours-plus1"] = () => {
    let s = ""; for (let u = 0; u < 4; u++) s += barreFr({ x0: 14 + u * 74, w: 68, y: 14, parts: 5, seg: [[0, u < 3 ? 5 : 2]] }) + (u < 3 ? `<text class="g-label" x="${48 + u * 74}" y="58" text-anchor="middle">1</text>` : fracSvg(14 + 3 * 74 + 34, 56, 2, 5));
    // en dessous : la même fraction sur une demi-droite graduée
    const d = droiteFractions(5, 4, [{ k: 17, label: "M" }]).replace(/<svg[^>]*>/, "").replace("</svg>", "");
    return svgBandes(136, s + `<g transform="translate(0 80)">${d}</g>`, "Quatre bandes unités partagées en 5 : trois sont entièrement coloriées et la quatrième a 2 parts coloriées, donc 17/5 = 3 + 2/5 ; en dessous, une demi-droite graduée en cinquièmes où le point M, à 17 graduations de 0, a pour abscisse 17/5");
  };
  FIGURES["fr5-cours-comparer"] = () => svgBandes(84, barreFr({ y: 8, parts: 4, seg: [[0, 3]], sub: 3, lab: [3, 4] }) + barreFr({ y: 50, parts: 6, seg: [[0, 5]], sub: 2, lab: [5, 6] }), "Deux bandes de même longueur, redécoupées en douzièmes (pointillés) : 3/4 = 9/12 et 5/6 = 10/12, donc 3/4 < 5/6");
  FIGURES["fr5-cours-addition"] = () => svgBandes(126, barreFr({ y: 8, parts: 3, seg: [[0, 1]], sub: 4, lab: [1, 3] }) + barreFr({ y: 50, parts: 4, seg: [[0, 1, "g-barre-plus"]], sub: 3, lab: [1, 4] }) + barreFr({ y: 92, parts: 12, seg: [[0, 4], [4, 7, "g-barre-plus"]], lab: [7, 12] }), "Trois bandes redécoupées en douzièmes : 1/3 = 4/12, 1/4 = 3/12 et leur somme 7/12");
  FIGURES["fr5-cours-droite"] = () => droiteFractions(5, 4, [{ k: 17, label: "M" }]).replace(/aria-label="[^"]*"/, 'aria-label="Demi-droite graduée de 0 à 4, chaque unité partagée en 5 : le point M est à 17 graduations de 0, son abscisse est 17/5"');
  FIGURES["fr5-methode-reste"] = () => schemaFr(10, [[5, "1/2", "g-aire"], [2, "1/5", "g-barre-plus"]], "le tout : 1", "Schéma en barre : le tout partagé en 10 ; une moitié (5 dixièmes) et un cinquième (2 dixièmes) sont pris, il reste 3 dixièmes");
  FIGURES["fr5-qcm-bandes"] = () => svgBandes(84, barreFr({ y: 8, parts: 4, seg: [[0, 3]] }) + barreFr({ y: 50, parts: 8, seg: [[0, 6]] }), "Deux bandes de même longueur : 3 parts coloriées sur 4, et 6 parts coloriées sur 8");
  FIGURES["fr5-qcm-droite"] = () => droiteFractions(3, 3, [{ k: 7, label: "M" }]);
  FIGURES["fr5-qcm-schema"] = () => schemaFr(10, [[3, "football", "g-aire"], [5, "basket", "g-barre-plus"]], "30 élèves", "Schéma en barre : 30 élèves partagés en 10 parts ; 3 parts football, 5 parts basket, le reste est marqué ?");
  FIGURES["fr5-cours-probleme"] = () => schemaFr(12, [[4, "football", "g-aire"], [3, "handball", "g-barre-plus"]], "24 élèves", "Schéma en barre : la classe de 24 élèves partagée en 12 ; 4 douzièmes font du football, 3 douzièmes du handball, le reste (?) de la danse");
  const approx = (v) => (Number.isInteger(v * 1000) ? [] : FRAC_APPROX(v));
  // Deux fractions a/b et c/d au même dénominateur L : texte de l'étape
  const memeDen = (a, b, c, d) => { const L = ppcm(b, d); return { L, na: a * (L / b), nc: c * (L / d), txt: `${b === L ? fr(a, b) : `${fr(a, b)} = ${fr(a * (L / b), L)}`} \\text{ et } ${d === L ? fr(c, d) : `${fr(c, d)} = ${fr(c * (L / d), L)}`}` }; };
  function deuxFractions(propre) {
    for (;;) {
      const b = rand(2, 12), d = rand(2, 12); if (b === d) continue;
      const a = rand(1, propre ? b - 1 : 2 * b), c = rand(1, propre ? d - 1 : 2 * d);
      if (pgcd(a, b) > 1 && Math.random() < 0.6) continue;
      if (pgcd(c, d) > 1 && Math.random() < 0.6) continue;
      if (ppcm(b, d) > 72) continue;
      return [a, b, c, d];
    }
  }

  GEN["fr5-egales"] = function () {
    const t = rand(0, 3), fig = Math.random() < 0.35;
    if (t === 0) {
      const b = rand(2, 12), a = rand(1, 2 * b), k = rand(2, 9), haut = Math.random() < 0.5;
      if (pgcd(a, b) > 1) return GEN["fr5-egales"]();
      const voir = fig && a < b && b * k <= 24;
      return { enonce: (haut ? `Complète : $${fr(a, b)} = \\dfrac{\\ldots}{${b * k}}$` : `Complète : $${fr(a, b)} = \\dfrac{${a * k}}{\\ldots}$`) + (voir ? " Les deux bandes ont la même longueur." : ""), figure: voir ? svgBandes(84, barreFr({ y: 8, parts: b, seg: [[0, a]], lab: [a, b] }) + barreFr({ y: 50, parts: b * k, seg: [[0, a * k]], lab: haut ? ["?", b * k] : [a * k, "?"] }), `Deux bandes de même longueur : l'une partagée en ${b} parts dont ${a} coloriées, l'autre partagée plus finement, avec la même longueur coloriée`) : undefined, mode: "nombre", prefixe: "Nombre manquant :", attendu: haut ? a * k : b * k,
        erreurs: [{ valeur: haut ? a + (b * k - b) : b + (a * k - a), message: "On ne peut pas ajouter le même nombre en haut et en bas : il faut **multiplier** par le même nombre." }, { valeur: k, message: `$${k}$, c'est le nombre par lequel on multiplie : il reste à multiplier $${haut ? a : b}$ par $${k}$.` }],
        aides: ["Une fraction ne change pas si on multiplie son numérateur et son dénominateur par un même nombre.", haut ? `Par combien a-t-on multiplié le dénominateur $${b}$ pour obtenir $${b * k}$ ?` : `Par combien a-t-on multiplié le numérateur $${a}$ pour obtenir $${a * k}$ ?`, `On a multiplié par $${k}$.`],
        solution: `$${fr(a, b)} = \\dfrac{${a} \\times ${k}}{${b} \\times ${k}} = ${fr(a * k, b * k)}$ : le nombre manquant est $${haut ? a * k : b * k}$.` };
    }
    if (t === 1) {
      const b = rand(2, 9), a = rand(1, 2 * b), k = rand(2, 8);
      if (pgcd(a, b) > 1 || a === b) return GEN["fr5-egales"]();
      const haut = Math.random() < 0.5;
      return { enonce: haut ? `Complète : $${fr(a * k, b * k)} = \\dfrac{\\ldots}{${b}}$` : `Complète : $${fr(a * k, b * k)} = \\dfrac{${a}}{\\ldots}$`, mode: "nombre", prefixe: "Nombre manquant :", attendu: haut ? a : b,
        erreurs: [...((haut ? a * k - (b * k - b) : b * k - (a * k - a)) > 0 ? [{ valeur: haut ? a * k - (b * k - b) : b * k - (a * k - a), message: "On ne peut pas retirer le même nombre en haut et en bas : il faut **diviser** par le même nombre." }] : []), { valeur: k, message: `$${k}$, c'est le nombre par lequel on divise : il reste à diviser $${haut ? a * k : b * k}$ par $${k}$.` }],
        aides: ["On peut aussi **diviser** le numérateur et le dénominateur par un même nombre.", haut ? `$${b * k}$ divisé par combien donne $${b}$ ?` : `$${a * k}$ divisé par combien donne $${a}$ ?`, `On divise par $${k}$.`],
        solution: `$${fr(a * k, b * k)} = \\dfrac{${a * k} \\div ${k}}{${b * k} \\div ${k}} = ${fr(a, b)}$ : le nombre manquant est $${haut ? a : b}$.` };
    }
    if (t === 2) {
      const b = rand(2, 9), e = rand(1, 6), r = rand(1, b - 1), a = e * b + r, voir = fig && e <= 3 && b <= 8;
      let s = ""; if (voir) for (let u = 0; u <= e; u++) s += barreFr({ x0: 10 + u * (300 / (e + 1)), w: 300 / (e + 1) - 8, y: 10, h: 26, parts: b, seg: [[0, u < e ? b : r]] });
      return { enonce: `Complète : $${fr(a, b)} = ${e} + \\dfrac{\\ldots}{${b}}$`, figure: voir ? svgBandes(46, s, `${e + 1} bandes unités partagées en ${b} parts : ${a} parts sont coloriées en tout`) : undefined, mode: "nombre", prefixe: "Nombre manquant :", attendu: r,
        erreurs: [{ valeur: a - e, message: `On enlève $${e}$ unités, c'est-à-dire $${fr(e * b, b)}$, pas $${e}$ au numérateur.` }, ...(e !== r ? [{ valeur: e, message: `$${e}$, c'est le nombre d'unités entières. Le nombre manquant est ce qui reste après avoir enlevé $${e} = ${fr(e * b, b)}$.` }] : [])],
        aides: [`$${e} = ${fr(e * b, b)}$.`, `$${fr(a, b)} = ${fr(e * b, b)} + \\dfrac{\\ldots}{${b}}$.`, `$${a} - ${e * b} = ?$`],
        solution: `$${fr(a, b)} = ${fr(e * b, b)} + ${fr(r, b)} = ${e} + ${fr(r, b)}$ : le nombre manquant est $${r}$ (c'est le reste de la division de $${a}$ par $${b}$).` };
    }
    const b = rand(2, 9), a = rand(2, 20);
    if (a % b === 0) return GEN["fr5-egales"]();
    return { enonce: `Quel nombre faut-il multiplier par $${b}$ pour obtenir $${a}$ ? $${b} \\times \\ldots = ${a}$.${CONSIGNE_FR}`, mode: "nombre", prefixe: "Nombre :", attendu: a / b,
      erreurs: [{ valeur: b / a, message: "C'est l'inverse : le nombre cherché est le quotient de $" + a + "$ par $" + b + "$." }, { valeur: a > b ? a - b : a * b, message: a > b ? `On cherche un facteur, pas une différence : le nombre cherché est le quotient $${a} \\div ${b}$.` : `Multiplier par $${b}$ doit donner $${a}$ : le nombre cherché est le quotient de $${a}$ par $${b}$, pas leur produit.` }, ...approx(a / b)],
      aides: ["Le nombre qui, multiplié par $b$, donne $a$ est le quotient $\\dfrac{a}{b}$.", `Ici, c'est le quotient de $${a}$ par $${b}$.`, `On l'écrit $\\dfrac{${a}}{${b}}$.`],
      solution: `$${b} \\times ${fr(a, b)} = ${a}$ : le nombre cherché est $${fr(a, b)}$${pgcd(a, b) > 1 ? ` $= ${frNet(a, b)}$` : ""}.` };
  };

  const SIGNES = ["$<$", "$>$", "$=$"];
  GEN["fr5-comparer"] = function () {
    const t = rand(0, 5);
    if (t === 5) {
      // repérer une fraction sur une droite graduée
      const b = pick([2, 3, 4, 5, 6, 8, 10]), n = Math.max(1, Math.min(3, Math.floor(24 / b))), N = b * n, K = shuffle(Array.from({ length: N - 1 }, (_, i) => i + 1).filter((v) => v % b)).slice(0, 4), k = K[0];
      if (K.length < 4) return GEN["fr5-comparer"]();
      if (Math.random() < 0.5) {
        const pts = shuffle(K.slice()), noms = ["A", "B", "C", "D"], bon = noms[pts.indexOf(k)];
        return { enonce: `Sur cette droite graduée, quel point a pour abscisse $${fr(k, b)}$ ?`, figure: droiteFractions(b, n, pts.map((v, i) => ({ k: v, label: noms[i] }))), mode: "choix", choix: noms.map((m) => `$${m}$`), attendu: noms.indexOf(bon),
          aides: [`Chaque unité est partagée en $${b}$ parts égales : une graduation vaut $${fr(1, b)}$.`, `$${fr(k, b)}$, c'est $${k}$ graduations à partir de $0$.`, k > b ? `$${fr(k, b)} = ${Math.floor(k / b)} + ${fr(k % b, b)}$ : le point est entre $${Math.floor(k / b)}$ et $${Math.floor(k / b) + 1}$.` : "Le point est entre $0$ et $1$."],
          solution: `Une graduation vaut $${fr(1, b)}$ ; on compte $${k}$ graduations à partir de $0$ : c'est le point $${bon}$.` };
      }
      const fausses = [fr(k, N === b ? b + 1 : N), fr(k + 1, b), fr(k === 1 ? 3 : k - 1, b), fr(b, k)].filter((f) => f !== fr(k, b));
      const { choix, attendu } = melange(`$${fr(k, b)}$`, fausses.map((f) => `$${f}$`));
      return { enonce: "Quelle est l'abscisse du point $M$ ?", figure: droiteFractions(b, n, [{ k, label: "M" }]), mode: "choix", choix, attendu,
        aides: ["Compte en combien de parts égales est partagée **une** unité (entre $0$ et $1$).", `Une graduation vaut $${fr(1, b)}$.`, "Compte les graduations de $0$ jusqu'au point $M$."],
        solution: `Chaque unité est partagée en $${b}$ : une graduation vaut $${fr(1, b)}$. $M$ est à $${k}$ graduations de $0$ : son abscisse est $${fr(k, b)}$${pgcd(k, b) > 1 ? ` $= ${frNet(k, b)}$` : ""}.` };
    }
    if (t <= 2) {
      let a, b, c, d;
      if (t === 0) { [a, b, c, d] = deuxFractions(Math.random() < 0.6); }
      else if (t === 1) { const n = rand(1, 9); b = rand(2, 12); d = rand(2, 12); if (b === d) return GEN["fr5-comparer"](); a = n; c = n; }
      else { const L = rand(2, 6), k = rand(2, 4); b = rand(2, 9); a = rand(1, 2 * b); c = a * k; d = b * k; if (Math.random() < 0.5) { c += pick([-1, 1]); if (c <= 0) c = 2; } }
      if (Math.random() < 0.5) [a, b, c, d] = [c, d, a, b];
      const v = a / b - c / d, rep = Math.abs(v) < 1e-12 ? 2 : v < 0 ? 0 : 1;
      const M = memeDen(a, b, c, d);
      const sol = t === 1 ? `Les deux fractions ont le même numérateur $${a}$ : la plus grande est celle qui a le plus petit dénominateur (on partage en moins de parts, elles sont plus grandes). Donc $${fr(a, b)} ${["<", ">", "="][rep]} ${fr(c, d)}$.`
        : `On les écrit avec le même dénominateur $${M.L}$ : $${M.txt}$. On compare les numérateurs $${M.na}$ et $${M.nc}$ : $${fr(a, b)} ${["<", ">", "="][rep]} ${fr(c, d)}$.`;
      return { enonce: `Compare : $${fr(a, b)} \\; \\ldots \\; ${fr(c, d)}$`, mode: "choix", choix: SIGNES.slice(), attendu: rep,
        aides: ["Pour comparer deux fractions, on les écrit avec le **même dénominateur**.", `Cherche un multiple commun à $${b}$ et à $${d}$ : $${M.L}$ convient.`, `$${M.txt}$.`], solution: sol };
    }
    if (t === 3) {
      const b = rand(2, 12), a = rand(1, 3 * b); if (a === b) return GEN["fr5-comparer"]();
      const rep = a < b ? 0 : 1;
      return { enonce: `Compare : $${fr(a, b)} \\; \\ldots \\; 1$`, mode: "choix", choix: SIGNES.slice(), attendu: rep,
        aides: [`$1 = ${fr(b, b)}$.`, "Une fraction est plus petite que $1$ quand son numérateur est plus petit que son dénominateur.", `Compare $${a}$ et $${b}$.`],
        solution: `$1 = ${fr(b, b)}$ et $${a} ${a < b ? "<" : ">"} ${b}$, donc $${fr(a, b)} ${a < b ? "<" : ">"} 1$.` };
    }
    // ranger trois fractions
    for (;;) {
      const L = pick([6, 8, 10, 12, 15, 18, 20, 24]), ds = [2, 3, 4, 5, 6, 8, 10, 12].filter((x) => L % x === 0);
      if (ds.length < 3) continue;
      const F = shuffle(ds.slice()).slice(0, 3).map((d) => [rand(1, 2 * d), d]);
      const vals = F.map(([n, d]) => n / d); if (new Set(vals.map((x) => x.toFixed(6))).size < 3) continue;
      const tri = F.slice().sort((p, q) => p[0] / p[1] - q[0] / q[1]), txt = (G) => "$" + G.map(([n, d]) => fr(n, d)).join(" < ") + "$";
      const bonne = txt(tri), autres = [txt([tri[1], tri[0], tri[2]]), txt([tri[0], tri[2], tri[1]]), txt([tri[2], tri[1], tri[0]]), txt(F.slice().sort((p, q) => p[1] - q[1]))].filter((x) => x !== bonne);
      const { choix, attendu } = melange(bonne, autres);
      return { enonce: `Range dans l'ordre croissant : $${F.map(([n, d]) => fr(n, d)).join("$ ; $")}$`, mode: "choix", choix, attendu,
        aides: ["Écris les trois fractions avec le même dénominateur.", `$${L}$ est un multiple commun des trois dénominateurs.`, "Range ensuite les numérateurs."],
        solution: `Avec le dénominateur $${L}$ : $${F.map(([n, d]) => `${fr(n, d)} = ${fr(n * (L / d), L)}`).join("$ ; $")}$. Donc ${bonne}.` };
    }
  };

  GEN["fr5-addsous"] = function () {
    const plus = Math.random() < 0.55;
    let [a, b, c, d] = deuxFractions(Math.random() < 0.5);
    if (!plus && a / b < c / d) [a, b, c, d] = [c, d, a, b];
    if (!plus && a / b === c / d) return GEN["fr5-addsous"]();
    const M = memeDen(a, b, c, d), N = plus ? M.na + M.nc : M.na - M.nc, v = N / M.L, s = plus ? "+" : "-";
    const naif = plus ? (a + c) / (b + d) : (a - c) / (b - d || 1), voir = a < b && c < d && M.L <= 24 && Math.random() < 0.35;
    return { enonce: `Calcule $${fr(a, b)} ${s} ${fr(c, d)}$.${voir ? " Les bandes, de même longueur, sont redécoupées en pointillés." : ""}${CONSIGNE_FR}`, figure: voir ? svgBandes(84, barreFr({ y: 8, parts: b, seg: [[0, a]], sub: M.L / b, lab: [a, b] }) + barreFr({ y: 50, parts: d, seg: [[0, c, "g-barre-plus"]], sub: M.L / d, lab: [c, d] }), `Deux bandes de même longueur : ${a} parts sur ${b} et ${c} parts sur ${d}, redécoupées en ${M.L} parts égales`) : undefined, mode: "nombre", prefixe: "Résultat :", attendu: v,
      erreurs: [...(isFinite(naif) && Math.abs(naif - v) > 1e-9 ? [{ valeur: naif, message: "On n'additionne (ou ne soustrait) jamais les dénominateurs : on met d'abord les fractions au même dénominateur." }] : []),
        ...(Math.abs((plus ? a + c : a - c) / (b * d) - v) > 1e-9 ? [{ valeur: (plus ? a + c : a - c) / (b * d), message: "Quand on change le dénominateur, il faut aussi multiplier le numérateur par le même nombre." }] : []), ...approx(v)],
      aides: ["On ne peut additionner ou soustraire que des fractions de **même dénominateur**.", `Cherche un multiple commun à $${b}$ et à $${d}$ : $${M.L}$ convient.`, `$${M.txt}$.`],
      solution: `$${fr(a, b)} ${s} ${fr(c, d)} = ${fr(M.na, M.L)} ${s} ${fr(M.nc, M.L)} = ${fr(N, M.L)}$${pgcd(N, M.L) > 1 ? ` $= ${frNet(N, M.L)}$` : ""}.` };
  };

  // Schéma : un total partagé en d parts égales, n parts coloriées marquées « ? »
  function schemaPart(n, d, total) {
    const x0 = 14, w = 292, y = 34, h = 28, X = (i) => +(x0 + (w * i) / d).toFixed(1);
    let s = barreFr({ x0, w, y, h, parts: d, seg: [[0, n]] });
    s += `<path class="g-accolade" d="M${x0 + 2} ${y - 5} V${y - 11} H${x0 + w - 2} V${y - 5}"/><text class="g-label" x="160" y="${y - 16}" text-anchor="middle">${total}</text>`;
    s += `<path class="g-accolade" d="M${x0 + 2} ${y + h + 5} V${y + h + 11} H${X(n) - 2} V${y + h + 5}"/><text class="g-mesure" x="${+((x0 + X(n)) / 2).toFixed(1)}" y="${y + h + 26}" text-anchor="middle">?</text>`;
    return svgBandes(y + h + 32, s, `Bande représentant ${total}, partagée en ${d} parts égales ; ${n} parts coloriées, dont on cherche la valeur`);
  }
  GEN["fr5-calculs"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      const d = rand(2, 9), n = rand(1, d - 1), q = rand(2, 15), N = d * q;
      if (pgcd(n, d) > 1) return GEN["fr5-calculs"]();
      return { enonce: `Calcule $${fr(n, d)}$ de $${N}$.`, figure: Math.random() < 0.5 ? schemaPart(n, d, nbTexte(N)) : undefined, mode: "nombre", prefixe: "Résultat :", attendu: n * q,
        erreurs: [{ valeur: q, message: `Ça, c'est $${fr(1, d)}$ de $${N}$. Il en faut $${n}$ fois plus.` }, { valeur: N - n * q, message: `Ça, c'est ce qui reste quand on enlève $${fr(n, d)}$ de $${N}$.` }],
        aides: [`Prendre $${fr(n, d)}$ d'un nombre, c'est le partager en $${d}$ parts égales et en prendre $${n}$.`, `$${N} \\div ${d} = ${q}$.`, `$${n} \\times ${q}$.`],
        solution: `$${N} \\div ${d} = ${q}$ puis $${n} \\times ${q} = ${n * q}$ : $${fr(n, d)}$ de $${N}$ vaut $${n * q}$.` };
    }
    if (t === 1) {
      const e = rand(1, 5), [a, b] = [rand(1, 9), rand(2, 9)], [c, d] = [rand(1, 9), rand(2, 9)];
      if (b === d || ppcm(b, d) > 60 || pgcd(a, b) > 1 || pgcd(c, d) > 1) return GEN["fr5-calculs"]();
      const L = ppcm(b, d), N = e * L + a * (L / b) - c * (L / d); if (N <= 0) return GEN["fr5-calculs"]();
      const v = N / L, sansE = (a * (L / b) - c * (L / d)) / L;
      return { enonce: `Calcule $${e} + ${fr(a, b)} - ${fr(c, d)}$.${CONSIGNE_FR}`, mode: "nombre", prefixe: "Résultat :", attendu: v,
        erreurs: [{ valeur: (e * L + a * (L / b) + c * (L / d)) / L, message: `Attention au signe : on **retire** $${fr(c, d)}$.` }, ...(sansE > 0 ? [{ valeur: sansE, message: `Tu as oublié l'entier $${e}$ : écris-le $${fr(e * L, L)}$.` }] : []), ...approx(v)],
        aides: [`Écris $${e}$ sous forme de fraction : $${e} = ${fr(e * L, L)}$.`, `Mets tout au dénominateur $${L}$.`, "Calcule de gauche à droite avec les numérateurs."],
        solution: `$${e} + ${fr(a, b)} - ${fr(c, d)} = ${fr(e * L, L)} + ${fr(a * (L / b), L)} - ${fr(c * (L / d), L)} = ${fr(N, L)}$${pgcd(N, L) > 1 ? ` $= ${frNet(N, L)}$` : ""}.` };
    }
    const ds = shuffle([2, 3, 4, 5, 6].slice()).slice(0, 2), L = ppcm(ds[0], ds[1]), a = rand(1, ds[0] - 1), c = rand(1, ds[1] - 1);
    if (a / ds[0] + c / ds[1] >= 1) return GEN["fr5-calculs"]();
    const N = L - a * (L / ds[0]) - c * (L / ds[1]), v = N / L;
    return { enonce: `Calcule $1 - ${fr(a, ds[0])} - ${fr(c, ds[1])}$.${CONSIGNE_FR}`, mode: "nombre", prefixe: "Résultat :", attendu: v,
      erreurs: [{ valeur: (L - N) / L, message: "Ça, c'est la somme des deux fractions retirées : il faut encore la retirer de $1$." }, { valeur: (L - a * (L / ds[0]) + c * (L / ds[1])) / L, message: `Attention au signe : on **retire** aussi $${fr(c, ds[1])}$.` }, ...approx(v)],
      aides: [`$1 = ${fr(L, L)}$.`, `Mets les fractions au dénominateur $${L}$.`, "Soustrais les numérateurs, de gauche à droite."],
      solution: `$1 - ${fr(a, ds[0])} - ${fr(c, ds[1])} = ${fr(L, L)} - ${fr(a * (L / ds[0]), L)} - ${fr(c * (L / ds[1]), L)} = ${fr(N, L)}$${pgcd(N, L) > 1 ? ` $= ${frNet(N, L)}$` : ""}.` };
  };

  GEN["fr5-problemes"] = function () {
    const ds = shuffle([2, 3, 4, 5, 6, 8, 10].slice()).slice(0, 2), L = ppcm(ds[0], ds[1]);
    const a = rand(1, ds[0] - 1), c = rand(1, ds[1] - 1);
    if (a / ds[0] + c / ds[1] >= 1 || pgcd(a, ds[0]) > 1 || pgcd(c, ds[1]) > 1) return GEN["fr5-problemes"]();
    const N = L - a * (L / ds[0]) - c * (L / ds[1]), v = N / L, f1 = fr(a, ds[0]), f2 = fr(c, ds[1]), P0 = prenom(), lieu = pick(LIEUX5);
    // [contexte, question (fraction), [unité de base, total min, total max], unité, phrase du total, question (quantité), nom de la part 1, nom de la part 2]
    const CTX = [
      [`Dans un collège de ${lieu}, $${f1}$ des élèves viennent en bus et $${f2}$ viennent à pied. Les autres viennent en taxi ou en scooter.`, "Quelle fraction des élèves vient en taxi ou en scooter ?", [10, 300, 1200], "élèves", (T) => `Le collège compte $${nb(T)}$ élèves.`, "Combien d'élèves viennent en taxi ou en scooter ?", "bus", "à pied"],
      [`Un agriculteur de ${pick(["Combani", "Ouangani", "Bandrélé", "Dembéni", "Tsingoni"])} plante des bananiers sur $${f1}$ de son terrain et du manioc sur $${f2}$. Le reste est en jachère.`, "Quelle fraction du terrain est en jachère ?", [100, 100, 6000], "m²", (T) => `Le terrain mesure $${nb(T)}$ m².`, "Quelle surface est en jachère, en m² ?", "bananiers", "manioc"],
      [`${P0.nom} dépense $${f1}$ de son argent de poche pour un livre et $${f2}$ pour une place de cinéma.`, `Quelle fraction de son argent de poche lui reste-t-il ?`, [1, 10, 120], "€", (T) => `${P0.Il} a $${T}$ € d'argent de poche.`, "Combien d'euros lui reste-t-il ?", "livre", "cinéma"],
      [`Lors d'une sortie à la plage de N'Gouja, $${f1}$ du temps est consacré au snorkeling et $${f2}$ au pique-nique. Le reste du temps est libre.`, "Quelle fraction du temps est libre ?", [5, 120, 480], "minutes", (T) => `La sortie dure $${T}$ minutes.`, "Combien de minutes sont libres ?", "snorkeling", "repas"],
      [`Un pêcheur de ${pick(["M'tsamboro", "Sada", "Chiconi", "Kani-Kéli", "Mtsahara"])} vend $${f1}$ de sa pêche au marché et en donne $${f2}$ à sa famille. Il congèle le reste.`, "Quelle fraction de sa pêche congèle-t-il ?", [1, 10, 120], "kg", (T) => `Il a pêché $${T}$ kg de poissons.`, "Combien de kilogrammes congèle-t-il ?", "marché", "famille"],
      [`Pour aller de Mamoudzou à ${pick(["Kani-Kéli", "Chirongui", "Bandrélé", "Sada", "M'tsamboro"])}, ${P0.nom} fait $${f1}$ du trajet en taxi-brousse et $${f2}$ à pied. ${P0.Il} finit en bus.`, `Quelle fraction du trajet fait-${P0.il} en bus ?`, [1, 10, 60], "km", (T) => `Le trajet mesure $${T}$ km.`, `Combien de kilomètres fait-${P0.il} en bus ?`, "taxi", "à pied"],
      [`Une coopérative de ${lieu} vend $${f1}$ de sa récolte de vanille en métropole et $${f2}$ à La Réunion. Le reste est vendu à Mayotte.`, "Quelle fraction de la récolte est vendue à Mayotte ?", [1, 20, 400], "kg", (T) => `La récolte est de $${T}$ kg.`, "Combien de kilogrammes sont vendus à Mayotte ?", "métropole", "Réunion"]
    ];
    const [ctx, q, [u, Tmin, Tmax], unite, phrase, qQ, mot1, mot2] = pick(CTX), n1 = a * (L / ds[0]), n2 = c * (L / ds[1]);
    const lab = (n, mot, f) => (mot.length * 6.6 + 6 <= (292 * n) / L ? mot : f);
    if (Math.random() < 0.55) {
      const naif = 1 - (a + c) / (ds[0] + ds[1]);
      return { enonce: `${ctx} ${q}${CONSIGNE_FR}`, figure: Math.random() < 0.5 ? schemaFr(L, [[n1, lab(n1, mot1, `${a}/${ds[0]}`), "g-aire"], [n2, lab(n2, mot2, `${c}/${ds[1]}`), "g-barre-plus"]], "le tout : 1", `Schéma en barre : le tout partagé en ${L} parts égales, ${n1} pour la première part, ${n2} pour la deuxième, le reste est marqué ?`) : undefined, mode: "nombre", prefixe: "Fraction :", attendu: v,
        erreurs: [{ valeur: a / ds[0] + c / ds[1], message: "Ça, c'est la fraction des deux parts réunies. On demande ce qui **reste**." }, ...(naif > 0 && Math.abs(naif - v) > 1e-9 ? [{ valeur: naif, message: "On n'additionne jamais les dénominateurs : mets d'abord les deux fractions au même dénominateur." }] : []), ...approx(v)],
        aides: ["Le tout correspond à $1$.", `Additionne d'abord les deux parts : $${f1} + ${f2}$.`, `Retire le résultat de $1 = ${fr(L, L)}$.`],
        solution: `$${f1} + ${f2} = ${fr(n1, L)} + ${fr(n2, L)} = ${fr(L - N, L)}$. Il reste $1 - ${fr(L - N, L)} = ${fr(N, L)}$${pgcd(N, L) > 1 ? ` $= ${frNet(N, L)}$` : ""}.` };
    }
    const mMin = Math.max(1, Math.ceil(Tmin / (L * u))), mMax = Math.max(mMin, Math.floor(Tmax / (L * u))), T = L * u * rand(mMin, mMax), R = (T * N) / L, U1 = (T * n1) / L;
    return { enonce: `${ctx} ${phrase(T)} ${qQ}`, figure: Math.random() < 0.5 ? schemaFr(L, [[n1, lab(n1, mot1, `${a}/${ds[0]}`), "g-aire"], [n2, lab(n2, mot2, `${c}/${ds[1]}`), "g-barre-plus"]], `${nbTexte(T)} ${unite}`, `Schéma en barre : ${nbTexte(T)} ${unite} partagés en ${L} parts égales, ${n1} pour la première part, ${n2} pour la deuxième, le reste est marqué ?`) : undefined, mode: "nombre", prefixe: "Réponse :", suffixe: unite, attendu: R,
      erreurs: [{ valeur: T - R, message: "Ça, c'est la quantité des deux parts réunies. On demande ce qui **reste**." }, { valeur: T - U1, message: `Tu n'as retiré qu'une seule des deux parts : il faut aussi retirer $${f2}$ du total.` }],
      aides: [`Calcule d'abord la fraction qui reste : $1 - ${f1} - ${f2}$.`, `Il reste $${frNet(N, L)}$ du total.`, `Calcule $${frNet(N, L)}$ de $${nb(T)}$.`],
      solution: `Il reste $1 - ${f1} - ${f2} = ${fr(N, L)}$ du total. $${fr(N, L)}$ de $${nb(T)}$ : $${nb(T)} \\div ${L} \\times ${N} = ${nb(R)}$ ${unite}.` };
  };

  /* =====================================================================
     Chapitre 4 : proportionnalité et pourcentages (pp5-)
     ===================================================================== */
  const { tabP } = window.PM_EXO.college;
  const r2 = (x) => Math.round(x * 1e6) / 1e6;
  // n1, n2 : titres du tableau ; c1, c2 : noms courts pour une double droite graduée
  const SIT_P = [
    { n1: "Masse (kg)", n2: "Prix (€)", c1: "kg", c2: "€", k: () => pick([1.5, 2, 2.5, 3, 3.2, 4, 4.5, 6]), x: () => [1, 2, 3, 4, 5, 6, 8, 10] },
    { n1: "Durée (h)", n2: "Distance (km)", c1: "h", c2: "km", k: () => pick([12, 15, 30, 40, 45, 50, 60]), x: () => [1, 2, 3, 4, 5, 6] },
    { n1: "Nombre de cahiers", n2: "Prix (€)", c1: "cahiers", c2: "€", k: () => pick([1.2, 1.5, 2, 2.4, 3.5]), x: () => [2, 3, 4, 5, 6, 10, 12] },
    { n1: "Essence (L)", n2: "Prix (€)", c1: "L", c2: "€", k: () => pick([1.8, 1.9, 2]), x: () => [5, 10, 15, 20, 30, 40] },
    { n1: "Farine (g)", n2: "Nombre de mkatra", c1: "g", c2: "mkatra", k: () => pick([0.01, 0.02]), x: () => [100, 200, 300, 400, 500, 600] },
    { n1: "Bananes (kg)", n2: "Prix (€)", c1: "kg", c2: "€", k: () => pick([1.5, 2, 2.5, 3]), x: () => [1, 2, 3, 4, 5, 6, 10] },
    { n1: "Nombre de brochettes", n2: "Prix (€)", c1: "nombre", c2: "€", k: () => pick([0.5, 1, 1.5, 2]), x: () => [2, 4, 5, 6, 8, 10, 12, 20] },
    { n1: "Tickets de bus", n2: "Prix (€)", c1: "tickets", c2: "€", k: () => pick([1.5, 2, 2.5]), x: () => [2, 3, 4, 5, 10, 20] }
  ];
  /* Double droite graduée (deux grandeurs proportionnelles) : o = { max, haut: [nom, valeurs, étiquettes], bas: [...], plein: valeur } ;
     une étiquette null n'est pas écrite ; « ? » marque la valeur cherchée */
  function doubleDroite(o) {
    const x0 = 58, L = 246, y1 = 34, y2 = 92, X = (v) => +(x0 + (L * v) / o.max).toFixed(1);
    let s = `<svg class="graph" viewBox="0 0 320 122" role="img" aria-label="${o.aria || "Double droite graduée : deux grandeurs proportionnelles"}">`;
    if (o.plein) s += `<rect class="g-aire" x="${x0}" y="${y1}" width="${+(X(o.plein) - x0).toFixed(1)}" height="${y2 - y1}"/>`;
    [[o.haut, y1, -10], [o.bas, y2, 22]].forEach(([[nom, vals, labs], y, dy]) => {
      s += `<g class="g-axis"><line x1="${x0}" y1="${y}" x2="${x0 + L + 8}" y2="${y}"/></g><text class="g-label" x="${x0 - 10}" y="${y + 4}" text-anchor="end">${nom}</text>`;
      vals.forEach((v, i) => { s += `<line class="g-graduation" x1="${X(v)}" y1="${y - 6}" x2="${X(v)}" y2="${y + 6}"/>`; if (labs[i] != null) s += `<text class="${labs[i] === "?" ? "g-mesure" : "g-label"}" x="${X(v)}" y="${y + dy}" text-anchor="middle">${labs[i]}</text>`; });
    });
    o.haut[1].forEach((v, i) => { if (v) s += `<line class="g-guide" x1="${X(v)}" y1="${y1 + 7}" x2="${X(o.bas[1][i])}" y2="${y2 - 7}"/>`; });
    return s + `</svg>`;
  }
  // Tableau de proportionnalité dessiné, avec la flèche « × coefficient » sur le côté et, au-dessus, une flèche entre deux colonnes
  function tabFleches(n1, n2, xs, ys, coef, haut) {
    const cw = 50, x0 = 106, h = 30, y0 = haut ? 38 : 8, W = x0 + xs.length * cw;
    let s = `<svg class="graph" viewBox="0 0 ${Math.max(320, W + 70)} ${y0 + 2 * h + 10}" role="img" aria-label="Tableau de proportionnalité : ${n1} ${xs.join(", ")} ; ${n2} ${ys.join(", ")}${coef ? " ; on passe de la première ligne à la deuxième en multipliant par " + coef : ""}">`;
    [[n1, xs, y0], [n2, ys, y0 + h]].forEach(([nom, vals, y]) => { s += `<rect class="g-rect" x="4" y="${y}" width="${x0 - 4}" height="${h}" style="fill-opacity:0.5"/><text class="g-label" x="${x0 / 2 + 2}" y="${y + h / 2 + 4}" text-anchor="middle">${nom}</text>`; vals.forEach((v, i) => { s += `<rect class="g-unite" x="${x0 + i * cw}" y="${y}" width="${cw}" height="${h}" style="stroke-width:1.2"/><text class="${v === "?" ? "g-mesure" : "g-label"}" x="${x0 + i * cw + cw / 2}" y="${y + h / 2 + 4}" text-anchor="middle">${v}</text>`; }); });
    if (coef) s += `<path class="g-curve" d="M${W + 6} ${y0 + h / 2} C${W + 30} ${y0 + h / 2} ${W + 30} ${y0 + 1.5 * h} ${W + 8} ${y0 + 1.5 * h}" style="stroke-width:1.8"/><path class="g-end" d="M${W + 6} ${y0 + 1.5 * h} l7 -5 v10z"/><text class="g-mesure" x="${W + 30}" y="${y0 + h + 4}">${coef}</text>`;
    if (haut) { const [i, j, txt] = haut, xa = x0 + i * cw + cw / 2, xb = x0 + j * cw + cw / 2; s += `<path class="g-curve" d="M${xa} ${y0 - 3} C${xa + 8} ${y0 - 24} ${xb - 8} ${y0 - 24} ${xb} ${y0 - 5}" style="stroke-width:1.8"/><path class="g-end" d="M${xb} ${y0 - 2} l-5 -8 h9z"/><text class="g-mesure" x="${(xa + xb) / 2}" y="${y0 - 21}" text-anchor="middle">${txt}</text>`; }
    return s + `</svg>`;
  }
  // Carte (ou plan) avec deux lieux et la longueur mesurée sur la carte
  function carte5(n1, n2, txt, echelle, pos) {
    const [A, B] = pos || [[rand(50, 110), rand(70, 120)], [rand(200, 270), rand(50, 120)]];
    let s = `<svg class="graph" viewBox="0 0 320 170" role="img" aria-label="Carte : ${n1} et ${n2}, séparés de ${txt} sur la carte${echelle ? ", échelle 1/" + echelle : ""}"><rect class="g-rect" x="6" y="6" width="308" height="158" rx="10" style="fill-opacity:0.35"/>`;
    s += `<line class="g-hline" x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}"/>`;
    [[A, n1], [B, n2]].forEach(([p, n]) => { const w = n.length * 3.3 + 4; s += `<circle class="g-point" cx="${p[0]}" cy="${p[1]}" r="5"/><text class="g-plabel" x="${+Math.min(312 - w, Math.max(10 + w, p[0])).toFixed(1)}" y="${p[1] + 20}" text-anchor="middle">${n}</text>`; });
    s += `<text class="g-mesure" x="${(A[0] + B[0]) / 2}" y="${(A[1] + B[1]) / 2 - 10}" text-anchor="middle">${txt}</text>`;
    if (echelle) s += `<text class="g-label" x="16" y="26">échelle : 1/${echelle}</text>`;
    return s + `</svg>`;
  }
  FIGURES["pp5-cours-tableau"] = () => tabFleches("Masse (kg)", "Prix (€)", ["2", "5", "8"], ["7", "17,5", "28"], "× 3,5");
  FIGURES["pp5-cours-methodes"] = () => tabFleches("Cahiers", "Prix (€)", ["4", "12", "7"], ["6", "18", "?"], "× 1,5", [0, 1, "× 3"]);
  FIGURES["pp5-cours-vitesse"] = () => doubleDroite({ max: 2, haut: ["h", [0, 0.5, 1, 1.5, 2], ["0", "0,5", "1", "1,5", "2"]], bas: ["km", [0, 0.5, 1, 1.5, 2], ["0", "15", "30", "45", "60"]], aria: "Double droite graduée : en 1 h le taxi-brousse parcourt 30 km, en 1,5 h il parcourt 45 km" });
  FIGURES["pp5-cours-pourcentage"] = () => doubleDroite({ max: 100, plein: 20, haut: ["%", [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], ["0", null, "20", null, null, "50", null, null, null, null, "100"]], bas: ["prix (€)", [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], ["0", null, "8", null, null, "20", null, null, null, null, "40"]], aria: "Double droite graduée : 100 % correspond à 40 €, 50 % à 20 € et 20 % à 8 €" });
  FIGURES["pp5-cours-echelle"] = () => carte5("Combani", "Mamoudzou", "7,5 cm", "100 000", [[70, 70], [255, 110]]);
  FIGURES["pp5-methode-pct"] = () => doubleDroite({ max: 108, plein: 15, haut: ["%", [0, 15, 50, 100], ["0", "15", "50", "100"]], bas: ["", [0, 15, 50, 100], ["0", "9", "30", "60"]], aria: "Double droite graduée : 100 % correspond à 60, 50 % à 30 et 15 % à 9" });
  FIGURES["pp5-methode-echelle"] = () => carte5("Cuisine", "Salon", "3 cm", "200", [[80, 90], [240, 80]]).replace(/aria-label="[^"]*"/, 'aria-label="Plan à l\'échelle 1/200 : la cuisine et le salon sont à 3 cm sur le plan"');
  FIGURES["pp5-qcm-double"] = () => doubleDroite({ max: 6, haut: ["kg", [0, 3, 5], ["0", "3", "5"]], bas: ["€", [0, 3, 5], ["0", "7,5", "?"]], aria: "Double droite graduée : 3 kg coûtent 7,5 € ; on cherche le prix de 5 kg" });
  FIGURES["pp5-qcm-tableau"] = () => tabFleches("Cahiers", "Prix (€)", ["4", "6", "10"], ["10", "15", "?"]);
  FIGURES["pp5-qcm-pct"] = () => doubleDroite({ max: 108, plein: 25, haut: ["%", [0, 25, 100], ["0", "25", "100"]], bas: ["€", [0, 25, 100], ["0", "?", "60"]], aria: "Double droite graduée : 100 % correspond à 60 €, on cherche ce qui correspond à 25 %" });
  const dec = (x) => nb(r2(x));

  GEN["pp5-reconnaitre"] = function () {
    const S = pick(SIT_P), k = S.k(), xs = shuffle(S.x().slice()).slice(0, 3).sort((a, b) => a - b), propor = Math.random() < 0.5;
    let ys = xs.map((x) => r2(x * k));
    if (!propor) { const i = rand(1, 2); ys[i] = r2(ys[i] + pick([-1, 1]) * (k >= 1 ? pick([1, 2, 0.5]) : 1)); if (ys[i] <= 0) return GEN["pp5-reconnaitre"](); }
    const q = ys.map((y, i) => r2(y / xs[i])), K = `Oui, le coefficient est $${dec(k)}$`;
    const exact = (v) => Math.abs(v * 100 - Math.round(v * 100)) < 1e-6, qtx = (v) => (exact(v) ? `= ${dec(v)}` : `\\approx ${dec(Math.round(v * 100) / 100)}`);
    const bonne = propor ? K : "Non, ce n'est pas un tableau de proportionnalité";
    const coefs = propor ? [r2(k * 2), r2(k + 1), r2(k / 2)] : [...new Set(q.filter(exact)), r2(k * 2), r2(k + 1)];
    const fausses = [...(propor ? ["Non, ce n'est pas un tableau de proportionnalité"] : []), ...coefs.map((c) => `Oui, le coefficient est $${dec(c)}$`)];
    const { choix, attendu } = melange(bonne, fausses.filter((f) => f !== bonne));
    return { enonce: "Ce tableau est-il un tableau de proportionnalité ?", tableau: tabP(S.n1, S.n2, xs.map(dec), ys.map(dec)), mode: "choix", choix, attendu,
      aides: ["Dans un tableau de proportionnalité, on passe de la première ligne à la deuxième en multipliant toujours par le même nombre.", "Calcule chaque quotient : nombre du bas $\\div$ nombre du haut.", `Premier quotient : $${dec(ys[0])} \\div ${dec(xs[0])} ${qtx(q[0])}$.`],
      solution: `Quotients : ${q.map((v, i) => `$${dec(ys[i])} \\div ${dec(xs[i])} ${qtx(v)}$`).join(" ; ")}. ${propor ? `Ils sont tous égaux : c'est un tableau de proportionnalité de coefficient $${dec(k)}$.` : "Ils ne sont pas tous égaux : ce n'est pas un tableau de proportionnalité."}` };
  };

  GEN["pp5-completer"] = function () {
    const S = pick(SIT_P), k = S.k(), t = rand(0, 2);
    let xs = shuffle(S.x().slice()).slice(0, 3);
    if (t === 1) { const a = pick(S.x().filter((x) => x <= 5)), b = pick([2, 3, 4, 5].filter((m) => S.x().includes(a * m))); if (!b) return GEN["pp5-completer"](); xs = [a, a * b, rand(0, 1) ? a + a * b : xs[2]]; }
    if (new Set(xs).size < 3) return GEN["pp5-completer"]();
    const ys = xs.map((x) => r2(x * k)), cache = t === 1 ? 1 : rand(1, 2), haut = Math.random() < 0.25;
    const Lx = xs.map((x, i) => (haut && i === cache ? "\\ldots" : dec(x))), Ly = ys.map((y, i) => (!haut && i === cache ? "\\ldots" : dec(y)));
    const rep = haut ? xs[cache] : ys[cache];
    const m = r2(xs[cache] / xs[0]);
    const meth = haut ? `On divise par le coefficient $${dec(k)}$ : $${dec(ys[cache])} \\div ${dec(k)} = ${dec(xs[cache])}$.`
      : Number.isInteger(m) && m > 1 ? `$${dec(xs[cache])} = ${m} \\times ${dec(xs[0])}$, donc on multiplie $${dec(ys[0])}$ par $${m}$ : $${dec(rep)}$. (On peut aussi multiplier par le coefficient $${dec(k)}$.)`
      : xs.length === 3 && xs[2] === xs[0] + xs[1] && cache === 2 ? `$${dec(xs[2])} = ${dec(xs[0])} + ${dec(xs[1])}$, donc $${dec(ys[0])} + ${dec(ys[1])} = ${dec(rep)}$.`
      : `Le coefficient est $${dec(ys[0])} \\div ${dec(xs[0])} = ${dec(k)}$, donc $${dec(xs[cache])} \\times ${dec(k)} = ${dec(rep)}$.`;
    const erreurs = haut ? [{ valeur: r2(xs[0] + (ys[cache] - ys[0])), message: "La proportionnalité se fait par **multiplication** : on n'ajoute pas l'écart entre les nombres." }, { valeur: r2(ys[cache] * k), message: `Pour remonter de la deuxième ligne à la première, on **divise** par le coefficient $${dec(k)}$.` }]
      : [{ valeur: r2(ys[0] + (xs[cache] - xs[0])), message: "La proportionnalité se fait par **multiplication** : on n'ajoute pas l'écart entre les nombres." }, { valeur: r2(xs[cache] / k), message: `Pour descendre de la première ligne à la deuxième, on **multiplie** par le coefficient $${dec(k)}$.` }];
    const o = [0, ...xs.slice().sort((a, b) => a - b)], lab = (v, bas) => (v === 0 ? "0" : (haut ? !bas : bas) && v === xs[cache] ? "?" : nbTexte(bas ? r2(v * k) : v));
    // les étiquettes de deux graduations voisines ne doivent pas se toucher
    const place = (bas) => o.every((v, i) => !i || (246 * (v - o[i - 1])) / (Math.max(...xs) * 1.08) >= ((lab(v, bas).length + lab(o[i - 1], bas).length) * 6.4) / 2 + 4);
    if (Math.random() < 0.3 && place(false) && place(true)) {
      return { enonce: `Les deux grandeurs sont proportionnelles : chaque graduation du haut correspond à la graduation du bas placée en face. Quel nombre faut-il écrire à la place de « ? » ?`, figure: doubleDroite({ max: Math.max(...xs) * 1.08, haut: [S.c1, o, o.map((v) => lab(v, false))], bas: [S.c2, o, o.map((v) => lab(v, true))], aria: `Double droite graduée : ${S.n1} en haut, ${S.n2} en bas ; une valeur est remplacée par un point d'interrogation` }), mode: "nombre", prefixe: "Nombre manquant :", attendu: rep, erreurs,
        aides: ["En face de $0$, il y a $0$ : on passe d'une droite à l'autre en multipliant toujours par le même nombre.", `Coefficient : $${dec(ys[0])} \\div ${dec(xs[0])} = ${dec(k)}$.`, haut ? "Pour remonter de la droite du bas à celle du haut, on divise par le coefficient." : "Pour descendre de la droite du haut à celle du bas, on multiplie par le coefficient."],
        solution: meth };
    }
    return { enonce: `Ce tableau est un tableau de proportionnalité. Complète la case manquante.`, tableau: tabP(S.n1, S.n2, Lx, Ly), mode: "nombre", prefixe: "Nombre manquant :", attendu: rep, erreurs,
      aides: ["Plusieurs méthodes : le coefficient de proportionnalité, la multiplication d'une colonne, l'addition de deux colonnes, ou le retour à l'unité.", `Coefficient : $${dec(ys[0])} \\div ${dec(xs[0])} = ${dec(k)}$.`, haut ? "Pour remonter de la deuxième ligne à la première, on divise par le coefficient." : "Pour descendre de la première ligne à la deuxième, on multiplie par le coefficient."],
      solution: meth };
  };

  // Une double droite pour une situation « q donne y ; n donne ? » (q, n en haut ; y en bas)
  const ddSituation = (c1, c2, q, y, n, aria) => doubleDroite({ max: Math.max(q, n) * 1.1, haut: [c1, [0, q, n], ["0", nbTexte(q), nbTexte(n)]], bas: [c2, [0, q, n], ["0", String(y), "?"]], aria });
  const PRODUITS5 = [["tomates", 15, 60], ["bananes", 10, 30], ["mangues", 20, 50], ["letchis", 40, 90], ["maniocs", 15, 35], ["ananas", 20, 40], ["fruits à pain", 15, 30]];
  GEN["pp5-coefficient"] = function () {
    const t = rand(0, 3), P0 = prenom(), nom = P0.nom;
    if (t === 0) {
      const [prod, pmin, pmax] = pick(PRODUITS5), p = Dc(rand(pmin, pmax) * 10, 2), q = rand(2, 6), tot = mulD(p, Dc(q)), n = rand(2, 9), lieu = pick(["au marché de Mamoudzou", `au marché de ${pick(LIEUX5)}`, "au bord de la route", "chez un producteur"]);
      if (n === q) return GEN["pp5-coefficient"]();
      const rep = +((p.m / 100) * n).toFixed(2);
      return { enonce: `${nom} paie $${tD(tot)}$ € pour $${q}$ kg ${deN(prod)} ${lieu}. Combien paierait-on pour $${n}$ kg ?`, figure: Math.random() < 0.4 ? ddSituation("kg", "€", q, nbTexte(tot.m / 100), n, `Double droite graduée : ${q} kg coûtent ${nbTexte(tot.m / 100)} €, on cherche le prix de ${n} kg`) : undefined, mode: "nombre", prefixe: "Prix :", suffixe: "€", attendu: rep,
        erreurs: [{ valeur: +((tot.m / 100) + (n - q)).toFixed(2), message: "Le prix est proportionnel à la masse : on multiplie, on n'ajoute pas la différence des masses." }, { valeur: +(p.m / 100).toFixed(2), message: "Ça, c'est le prix d'**un** kilogramme : il reste à multiplier par la masse demandée." }],
        aides: ["Le prix est proportionnel à la masse.", `Retour à l'unité : prix d'un kilogramme $= ${tD(tot)} \\div ${q}$.`, `Un kilogramme coûte $${tD(p)}$ €.`],
        solution: `Prix d'un kilogramme : $${tD(tot)} \\div ${q} = ${tD(p)}$ €. Pour $${n}$ kg : $${n} \\times ${tD(p)} = ${tD(mulD(p, Dc(n)))}$ €.` };
    }
    if (t === 1) {
      const v = pick([30, 40, 45, 50, 60, 70, 80, 90]), h = pick([[2, "2 h"], [3, "3 h"], [0.5, "30 min"], [1.5, "1 h 30 min"], [2.5, "2 h 30 min"], [0.25, "15 min"], [0.75, "45 min"]]), d = v * h[0];
      const veh = pick(["Un taxi-brousse", "Le bus scolaire", "Une voiture", "Un scooter", "La navette de l'aéroport"]), trajet = pick(["", " sur la route du sud", ` entre Mamoudzou et ${pick(["Combani", "Sada", "Chirongui", "Bandrélé", "Dembéni"])}`]);
      if (d > 60 && trajet) return GEN["pp5-coefficient"]();
      const hTxt = h[1].replace(/(\d+)/g, "$$$1$$"), mn = Math.round((h[0] % 1) * 60), e1 = mn ? d / (Math.floor(h[0]) + mn / 100) : 0;
      return { enonce: `${veh} roule à vitesse constante${trajet} et parcourt $${dec(d)}$ km en ${hTxt}. Quelle est sa vitesse moyenne, en km/h ?`, figure: Math.random() < 0.4 ? doubleDroite({ max: Math.max(1, h[0]) * 1.15, haut: ["h", [0, h[0], 1], ["0", nbTexte(h[0]), "1"]], bas: ["km", [0, h[0], 1], ["0", nbTexte(d), "?"]], aria: `Double droite graduée : ${nbTexte(d)} km en ${nbTexte(h[0])} h ; on cherche la distance parcourue en 1 h` }) : undefined, mode: "nombre", prefixe: "Vitesse :", suffixe: "km/h", attendu: v,
        erreurs: [...(mn && Math.abs(e1 * 100 - Math.round(e1 * 100)) < 1e-9 ? [{ valeur: e1, message: `Attention : $${mn}$ min, ce n'est pas $0{,}${mn}$ h mais $${nb(h[0] % 1)}$ h.` }] : []), { valeur: +(d * h[0]).toFixed(2), message: "On **divise** la distance par la durée, on ne multiplie pas." }, ...(h[0] !== 1 ? [{ valeur: d, message: "Ça, c'est la distance parcourue pendant toute la durée, pas en $1$ heure." }] : [])],
        aides: ["La vitesse moyenne en km/h est la distance parcourue en $1$ heure.", mn ? "$15$ min $= 0{,}25$ h ; $30$ min $= 0{,}5$ h ; $45$ min $= 0{,}75$ h." : "La distance est proportionnelle à la durée.", `Vitesse $=$ distance $\\div$ durée $= ${dec(d)} \\div ${dec(h[0])}$.`],
        solution: `${mn ? `${hTxt} $= ${dec(h[0])}$ h. ` : ""}En $1$ h, le véhicule parcourt $${dec(d)} \\div ${dec(h[0])} = ${v}$ km : sa vitesse moyenne est $${v}$ km/h.` };
    }
    if (t === 2) {
      const [debut, ing] = pick([["Une recette de bouchées à la noix de coco", "de coco râpée"], ["Une recette de gâteau à la banane", "de farine"], ["Une recette de mataba", "de feuilles de manioc pilées"], ["Une recette d'achards de mangue", "de mangues vertes"], ["Une recette de riz au coco", "de riz"], ["Une recette de beignets (makara)", "de farine"]]);
      const p = pick([4, 6, 8]), f = rand(2, 6) * 50, q = pick([2, 3, 6, 10, 12].filter((x) => x !== p)), rep = (f / p) * q;
      if (!Number.isInteger(rep)) return GEN["pp5-coefficient"]();
      return { enonce: `${debut} pour $${p}$ personnes demande $${f}$ g ${ing}. Quelle masse faut-il pour $${q}$ personnes ?`, figure: Math.random() < 0.4 ? ddSituation("pers.", "g", p, nbTexte(f), q, `Double droite graduée : ${p} personnes, ${f} g ; on cherche la masse pour ${q} personnes`) : undefined, mode: "nombre", prefixe: "Masse :", suffixe: "g", attendu: rep,
        erreurs: [{ valeur: f + (q - p), message: "Les quantités sont proportionnelles au nombre de personnes : on ne fait pas une addition." }, { valeur: r2(f / p), message: "Ça, c'est la masse pour **une** personne : il reste à multiplier." }],
        aides: ["La masse est proportionnelle au nombre de personnes.", `Pour une personne : $${f} \\div ${p} = ${dec(f / p)}$ g.`, `Pour $${q}$ personnes : $${q} \\times ${dec(f / p)}$.`],
        solution: `Pour une personne : $${f} \\div ${p} = ${dec(f / p)}$ g. Pour $${q}$ personnes : $${q} \\times ${dec(f / p)} = ${dec(rep)}$ g.` };
    }
    const v = pick([4, 5, 6, 12, 15, 20]), d = v * pick([1, 3, 4, 5, 6, 7, 8, 9]) / 2; // jamais d = v (graduations confondues sur la double droite)
    if (!Number.isInteger(d * 2)) return GEN["pp5-coefficient"]();
    const tps = d / v, act = v <= 6 ? pick(["marche", "randonne vers le mont Choungui", "marche sur le sentier côtier"]) : pick(["roule à vélo", "court"]);
    return { enonce: `${nom} ${act} à la vitesse constante de $${v}$ km/h. Combien de temps lui faut-il pour parcourir $${dec(d)}$ km ? (Réponse en heures, par exemple $1{,}5$ pour $1$ h $30$ min.)`, figure: Math.random() < 0.4 ? doubleDroite({ max: Math.max(v, d) * 1.1, haut: ["km", [0, v, d], ["0", nbTexte(v), nbTexte(d)]], bas: ["h", [0, v, d], ["0", "1", "?"]], aria: `Double droite graduée : ${v} km en 1 h ; on cherche la durée pour ${nbTexte(d)} km` }) : undefined, mode: "nombre", prefixe: "Durée :", suffixe: "h", attendu: tps,
      erreurs: [{ valeur: r2(v / d), message: "C'est l'inverse : la durée est la distance **divisée** par la vitesse." }, { valeur: r2(d * v), message: "On **divise** la distance par la vitesse, on ne multiplie pas." }],
      aides: [`En $1$ h, ${nom} parcourt $${v}$ km.`, "La distance est proportionnelle à la durée.", `Durée $= ${dec(d)} \\div ${v}$.`],
      solution: `Durée $= ${dec(d)} \\div ${v} = ${dec(tps)}$ h${tps % 1 ? `, soit $${Math.floor(tps)}$ h $${Math.round((tps % 1) * 60)}$ min` : ""}.` };
  };

  GEN["pp5-pourcentages"] = function () {
    const t = rand(0, 3);
    if (t === 0) {
      const p = pick([5, 10, 15, 20, 25, 30, 40, 50, 60, 75]), N = pick([20, 40, 60, 80, 120, 150, 200, 240, 300, 500, 1200]), v = (p * N) / 100;
      if (!Number.isInteger(v * 10)) return GEN["pp5-pourcentages"]();
      const ndp = r2(N / p), fig = Math.random() < 0.4;
      return { enonce: `Calcule $${p}\\,\\%$ de $${nb(N)}$.`, figure: fig ? doubleDroite({ max: 108, plein: p, haut: ["%", [0, p, 100], ["0", String(p), "100"]], bas: ["", [0, p, 100], ["0", "?", nbTexte(N)]], aria: `Double droite graduée : 100 % correspond à ${nbTexte(N)}, on cherche ce qui correspond à ${p} %` }) : undefined, mode: "nombre", prefixe: "Résultat :", attendu: v,
        erreurs: [{ valeur: N - v, message: `Ça, c'est ce qui reste quand on retire $${p}\\,\\%$.` }, ...(Number.isInteger(ndp * 100) ? [{ valeur: ndp, message: `On ne divise pas par le pourcentage : $${p}\\,\\%$ de $${nb(N)}$, c'est $${nb(N)} \\times ${p} \\div 100$.` }] : [])],
        aides: [`$${p}\\,\\%$ de $${N}$, c'est $\\dfrac{${p}}{100} \\times ${N}$.`, `$1\\,\\%$ de $${N}$ vaut $${dec(N / 100)}$.`, `Multiplie par $${p}$.`],
        solution: `$${p}\\,\\%$ de $${N}$ : $${N} \\times ${p} \\div 100 = ${dec(v)}$.` };
    }
    if (t === 1) {
      const T = pick([20, 25, 40, 50, 200, 400, 500]), part = rand(1, T - 1), p = (part / T) * 100;
      if (!Number.isInteger(p)) return GEN["pp5-pourcentages"]();
      const ctx = pick([[`Dans un collège de ${pick(LIEUX5)} de $${T}$ élèves, $${part}$ sont demi-pensionnaires.`, "Quel pourcentage des élèves est demi-pensionnaire ?"], [`Sur $${T}$ tortues observées à Moya, $${part}$ sont des tortues vertes.`, "Quel pourcentage des tortues sont des tortues vertes ?"], [`Un club de football de ${pick(LIEUX5)} compte $${T}$ adhérents, dont $${part}$ filles.`, "Quel est le pourcentage de filles ?"], [`Sur les $${T}$ passagers d'une barge, $${part}$ sont des touristes.`, "Quel pourcentage des passagers sont des touristes ?"], [`Sur $${T}$ pieds d'ylang-ylang plantés, $${part}$ ont fleuri cette année.`, "Quel pourcentage des pieds ont fleuri ?"]]);
      return { enonce: `${ctx[0]} ${ctx[1]}`, figure: Math.random() < 0.35 && part / T > 0.08 && part / T < 0.92 ? doubleDroite({ max: T * 1.08, plein: part, haut: ["", [0, part, T], ["0", String(part), String(T)]], bas: ["%", [0, part, T], ["0", "?", "100"]], aria: `Double droite graduée : ${T} correspond à 100 %, on cherche le pourcentage qui correspond à ${part}` }) : undefined, mode: "nombre", prefixe: "Pourcentage :", suffixe: "%", attendu: p,
        erreurs: [{ valeur: part, message: "Un pourcentage se calcule sur $100$ : il faut ramener l'effectif total à $100$." }, { valeur: r2(part / T), message: `Ça, c'est la proportion en écriture décimale : multiplie-la par $100$ pour obtenir le pourcentage.` }],
        aides: ["Le pourcentage est la proportion ramenée à $100$.", `Proportion : $\\dfrac{${part}}{${T}}$.`, `$\\dfrac{${part}}{${T}} = \\dfrac{\\ldots}{100}$.`],
        solution: `$\\dfrac{${part}}{${T}} = ${dec(part / T)} = \\dfrac{${dec(p)}}{100}$ : cela représente $${dec(p)}\\,\\%$.` };
    }
    if (t === 2) {
      const noms = shuffle(["Alexis", "Chloé", "Salma", "Djibril", "Anli", "Mariama"].slice()).slice(0, 4), T = pick([20, 25, 40, 50]);
      let v; for (;;) { v = [rand(1, T / 2), rand(1, T / 2), rand(1, T / 2)]; const r = T - v[0] - v[1] - v[2]; if (r >= 1) { v.push(r); break; } }
      const i = rand(0, 3), p = (v[i] / T) * 100;
      return { enonce: `À l'élection des délégués, chaque élève a voté pour un seul candidat. Quel pourcentage des voix a obtenu ${noms[i]} ?`, tableau: { lignes: [["\\text{Candidat}", "\\text{Voix}"], ...noms.map((n, j) => [`\\text{${n}}`, v[j]]), ["\\text{Total}", T]] }, mode: "nombre", prefixe: "Pourcentage :", suffixe: "%", attendu: p,
        erreurs: [{ valeur: v[i], message: "Ça, c'est le nombre de voix, pas le pourcentage." }, { valeur: r2(v[i] / T), message: "Ça, c'est la proportion en écriture décimale : multiplie-la par $100$." }],
        aides: [`${noms[i]} a $${v[i]}$ voix sur $${T}$.`, `Pourcentage $= \\dfrac{${v[i]}}{${T}} \\times 100$.`, `$100 \\div ${T} = ${dec(100 / T)}$.`],
        solution: `$\\dfrac{${v[i]}}{${T}} \\times 100 = ${v[i]} \\times ${dec(100 / T)} = ${dec(p)}$ : ${noms[i]} a obtenu $${dec(p)}\\,\\%$ des voix.` };
    }
    const p = pick([5, 10, 15, 20, 25, 30, 40, 50]), P = rand(2, 40) * 10, r = (P * p) / 100;
    const hausse = Math.random() < 0.4, fin = hausse ? P + r : P - r, art = pick(["Un salouva", "Un ballon de football", "Un sac de riz de 25 kg", "Un vélo", "Un ventilateur", "Une paire de baskets", "Un casque de scooter"]);
    return { enonce: `${art} coûte $${P}$ €. Son prix ${hausse ? "augmente" : "baisse"} de $${p}\\,\\%$. Quel est son nouveau prix ?`, mode: "nombre", prefixe: "Nouveau prix :", suffixe: "€", attendu: fin,
      erreurs: [{ valeur: r, message: `Ça, c'est le montant de ${hausse ? "l'augmentation" : "la réduction"}. Il faut encore ${hausse ? "l'ajouter au" : "le retirer du"} prix de départ.` }, { valeur: hausse ? P + p : P - p, message: `$${p}\\,\\%$, ce n'est pas $${p}$ € : c'est $${p}$ € pour $100$ €.` }],
      aides: [`Calcule d'abord $${p}\\,\\%$ de $${P}$ €.`, `$${p}\\,\\%$ de $${P}$ $= ${dec(r)}$ €.`, `${hausse ? "Ajoute-le au" : "Retire-le du"} prix de départ.`],
      solution: `$${p}\\,\\%$ de $${P}$ € : $${P} \\times ${p} \\div 100 = ${dec(r)}$ €. Nouveau prix : $${P} ${hausse ? "+" : "-"} ${dec(r)} = ${dec(fin)}$ €.` };
  };

  // Lieux pour les échelles : petites échelles (plans) ou grandes (cartes de Mayotte)
  const PLANS5 = [["un plan de la maison", "la cuisine", "le salon"], ["un plan du collège", "le CDI", "la cantine"], ["un plan du marché couvert", "l'étal de bananes", "l'étal de poissons"], ["un plan du stade", "le but", "le poteau de corner"]];
  const CARTES5 = [["Mamoudzou", "Koungou"], ["Combani", "Tsingoni"], ["Sada", "Chirongui"], ["Dzaoudzi", "Pamandzi"], ["Bandrélé", "Dembéni"], ["Kani-Kéli", "la plage de N'Gouja"], ["M'tsamboro", "Acoua"], ["Chiconi", "Sada"]];
  GEN["pp5-echelles"] = function () {
    const t = rand(0, 2), E = pick([100, 200, 250, 500, 1000, 2000, 5000, 10000, 25000, 50000, 100000]);
    const unite = (cm) => (cm >= 100000 ? [cm / 100000, "km"] : cm >= 100 ? [cm / 100, "m"] : [cm, "cm"]);
    const carte = E >= 10000, plan = pick(PLANS5), lieux = carte ? pick(CARTES5) : plan.slice(1), sup = carte ? "une carte de Mayotte" : plan[0];
    const conv = (u) => ({ km: "$1$ km $= 100\\,000$ cm", m: "$1$ m $= 100$ cm", cm: "" })[u];
    if (t === 0) {
      const c = rand(2, carte ? 20 : 30) / 2, reel = c * E, [v, u] = unite(reel);
      if (carte && reel > 2500000) return GEN["pp5-echelles"]();
      return { enonce: `Sur ${sup} à l'échelle $\\dfrac{1}{${nb(E)}}$, ${lieux[0]} et ${lieux[1]} sont distants de $${dec(c)}$ cm. Quelle est la distance réelle, en ${u} ?`, figure: Math.random() < 0.45 ? carte5(lieux[0][0].toUpperCase() + lieux[0].slice(1), lieux[1][0].toUpperCase() + lieux[1].slice(1), `${nbTexte(c)} cm`, nbTexte(E)) : undefined, mode: "nombre", prefixe: "Distance réelle :", suffixe: u, attendu: r2(v),
        erreurs: [...(u !== "cm" ? [{ valeur: reel, message: `Ça, c'est la distance en centimètres. Convertis en ${u} : ${conv(u)}.` }] : []), { valeur: r2(v * 10), message: `Vérifie la conversion : ${conv(u) || "le résultat est déjà en centimètres"}.` }, { valeur: r2(v / 10), message: `Vérifie la conversion : ${conv(u) || "le résultat est déjà en centimètres"}.` }],
        aides: [`L'échelle $\\dfrac{1}{${nb(E)}}$ signifie que $1$ cm sur le plan représente $${nb(E)}$ cm en réalité.`, `Distance réelle $= ${dec(c)} \\times ${nb(E)}$ cm.`, u === "cm" ? "Le résultat est en centimètres." : `Convertis en ${u} : ${conv(u)}.`],
        solution: `$${dec(c)} \\times ${nb(E)} = ${dec(reel)}$ cm, soit $${dec(v)}$ ${u}.` };
    }
    if (t === 1) {
      const c = rand(2, 24) / 2, reel = c * E, [v, u] = unite(reel);
      if (carte && reel > 2500000) return GEN["pp5-echelles"]();
      return { enonce: `Sur ${sup} à l'échelle $\\dfrac{1}{${nb(E)}}$, quelle longueur représente la distance réelle de $${dec(v)}$ ${u} entre ${lieux[0]} et ${lieux[1]} ? (Réponse en cm.)`, figure: Math.random() < 0.45 ? carte5(lieux[0][0].toUpperCase() + lieux[0].slice(1), lieux[1][0].toUpperCase() + lieux[1].slice(1), "? cm", nbTexte(E)) : undefined, mode: "nombre", prefixe: "Sur le plan :", suffixe: "cm", attendu: c,
        erreurs: [{ valeur: r2(c * 10), message: `Vérifie la conversion en centimètres : ${conv(u) || "la distance est déjà en cm"}.` }, { valeur: r2(c / 10), message: `Vérifie la conversion en centimètres : ${conv(u) || "la distance est déjà en cm"}.` }],
        aides: [`Convertis d'abord la distance réelle en cm : $${dec(reel)}$ cm.`, `Sur le plan, les longueurs sont divisées par $${nb(E)}$.`, `$${dec(reel)} \\div ${nb(E)}$.`],
        solution: `$${dec(v)}$ ${u} $= ${dec(reel)}$ cm et $${dec(reel)} \\div ${nb(E)} = ${dec(c)}$ cm.` };
    }
    const c = rand(2, 12), reel = c * E, [v, u] = unite(reel);
    if (carte && reel > 2500000) return GEN["pp5-echelles"]();
    return { enonce: `Sur ${sup}, ${lieux[0]} et ${lieux[1]} sont à $${c}$ cm l'un de l'autre ; en réalité, ils sont à $${dec(v)}$ ${u}. Quelle est l'échelle ? Donne le nombre $n$ tel que l'échelle soit $\\dfrac{1}{n}$.`, figure: Math.random() < 0.4 ? carte5(lieux[0][0].toUpperCase() + lieux[0].slice(1), lieux[1][0].toUpperCase() + lieux[1].slice(1), `${c} cm`) : undefined, mode: "nombre", prefixe: "$n =$", attendu: E,
      erreurs: [...(u !== "cm" ? [{ valeur: r2(v / c), message: "Il faut exprimer les deux distances dans la même unité (en cm) avant de diviser." }] : []), { valeur: E * 10, message: `Vérifie la conversion en centimètres : ${conv(u) || "les deux longueurs sont déjà en cm"}.` }, { valeur: E / 10, message: `Vérifie la conversion en centimètres : ${conv(u) || "les deux longueurs sont déjà en cm"}.` }],
      aides: ["Exprime les deux longueurs dans la même unité.", `$${dec(v)}$ ${u} $= ${dec(reel)}$ cm.`, `$1$ cm sur la carte représente $${dec(reel)} \\div ${c}$ cm.`],
      solution: `$${dec(v)}$ ${u} $= ${dec(reel)}$ cm. $${dec(reel)} \\div ${c} = ${nb(E)}$ : $1$ cm représente $${nb(E)}$ cm, l'échelle est $\\dfrac{1}{${nb(E)}}$.` };
  };

  /* =====================================================================
     Chapitre 5 : angles et parallélisme (an5-)
     Figure : deux droites (d) et (d') coupées par une sécante ; angles numérotés 1 à 4 au point du haut,
     5 à 8 au point du bas (1 et 5 : en haut à droite, puis dans le sens inverse des aiguilles d'une montre).
     ===================================================================== */
  const DEG = Math.PI / 180;
  const { figureAngle, figureTriangle } = window.PM_EXO.college;
  function figParalleles(o) {
    const th = o.theta, ph = o.phi || 0, W = 320, H = o.une ? 170 : 236;
    const L = [Math.cos(ph * DEG), -Math.sin(ph * DEG)], T = [Math.cos((ph + th) * DEG), -Math.sin((ph + th) * DEG)];
    const k = 110 / -T[1], P = o.une ? [[160, 85]] : [[160 + (T[0] * k) / 2, 63]];
    if (!o.une) P.push([P[0][0] - T[0] * k, P[0][1] - T[1] * k]);
    const ligne = (p, u, k1, k2) => `<line class="g-droite" x1="${(p[0] - u[0] * k1).toFixed(1)}" y1="${(p[1] - u[1] * k1).toFixed(1)}" x2="${(p[0] + u[0] * k2).toFixed(1)}" y2="${(p[1] + u[1] * k2).toFixed(1)}"/>`;
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.aria}">`;
    P.forEach((p) => { s += ligne(p, L, 280, 280); });
    s += o.une ? ligne(P[0], T, 80, 80) : ligne(P[0], T, k + 55, 55);
    // demi-droites de chaque angle : 1 (T+, L+), 2 (L-, T+), 3 (T-, L-), 4 (L+, T-)
    const rayons = [[L, T], [T, [-L[0], -L[1]]], [[-L[0], -L[1]], [-T[0], -T[1]]], [[-T[0], -T[1]], L]];
    (o.marques || []).forEach(([k, txt, plein]) => {
      const p = P[k > 4 ? 1 : 0], [u, v] = rayons[(k - 1) % 4], r = 15;
      const a1 = Math.atan2(-u[1], u[0]), a2 = Math.atan2(-v[1], v[0]);
      const x1 = p[0] + r * Math.cos(a1), y1 = p[1] - r * Math.sin(a1), x2 = p[0] + r * Math.cos(a2), y2 = p[1] - r * Math.sin(a2);
      s += `<path class="${plein ? "g-arc g-arc-fort" : "g-arc"}" d="M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 0 0 ${x2.toFixed(1)} ${y2.toFixed(1)}"/>`;
      let b = [u[0] + v[0], u[1] + v[1]]; const nb2 = Math.hypot(...b); b = [b[0] / nb2, b[1] / nb2];
      const dist = txt.length > 2 ? 34 : 27;
      s += `<text class="g-num-angle" x="${(p[0] + b[0] * dist).toFixed(1)}" y="${(p[1] + b[1] * dist + 4).toFixed(1)}" text-anchor="middle">${txt}</text>`;
    });
    const yEn = (p, x) => p[1] + ((x - p[0]) * L[1]) / L[0];
    if (o.noms !== false) P.forEach((p, n) => { s += `<text class="g-plabel" x="${W - 6}" y="${(yEn(p, W - 20) - 7).toFixed(1)}" text-anchor="end">${n ? "(d')" : "(d)"}</text>`; });
    return s + `</svg>`;
  }
  // Mesure de l'angle numéro k quand (d) // (d') : th pour 1, 3, 5, 7 ; 180 - th pour 2, 4, 6, 8
  const mesure = (k, th) => (k % 2 ? th : 180 - th);
  const PAIRES = { correspondants: [[1, 5], [2, 6], [3, 7], [4, 8]], "alternes-internes": [[3, 5], [4, 6]], "opposés par le sommet": [[1, 3], [2, 4], [5, 7], [6, 8]], "adjacents supplémentaires": [[1, 2], [2, 3], [3, 4], [1, 4], [5, 6], [6, 7], [7, 8], [5, 8]] };
  const natureDe = (a, b) => { const [x, y] = [Math.min(a, b), Math.max(a, b)]; return Object.keys(PAIRES).find((n) => PAIRES[n].some(([p, q]) => p === x && q === y)); };
  const thetaHasard = () => pick([rand(40, 75), rand(105, 140)]);
  FIGURES["an5-paralleles"] = () => figParalleles({ theta: 60, phi: 0, marques: [[1, "1"], [2, "2"], [3, "3"], [4, "4"], [5, "5"], [6, "6"], [7, "7"], [8, "8"]], aria: "Deux droites (d) et (d') coupées par une sécante ; huit angles numérotés de 1 à 8" });
  FIGURES["an5-secantes"] = () => figParalleles({ une: true, theta: 55, marques: [[1, "55°"], [2, "?"], [3, "?"]], noms: false, aria: "Deux droites sécantes : un angle de 55 degrés et deux angles inconnus" });
  FIGURES["an5-cours-egaux"] = () => figParalleles({ theta: 60, phi: 0, marques: [[1, "60°", true], [5, "60°", true], [6, "120°"]], aria: "Deux droites parallèles (d) et (d') coupées par une sécante : les angles correspondants 1 et 5 mesurent 60 degrés, l'angle 6 mesure 120 degrés" });
  FIGURES["an5-methode-paralleles"] = () => figParalleles({ theta: 47, phi: 0, marques: [[3, "47°", true], [5, "47°", true]], aria: "Deux droites coupées par une sécante : deux angles alternes-internes de 47 degrés" });
  /* Triangle dont les angles en A, B, C mesurent a, b, c (degrés) : base [BC] horizontale, dessiné à l'échelle dans la zone
     [x0 ; x1] × [y0 ; y1]. Renvoie [A, B, C] en pixels. */
  function triAngles(a, b, c, zone) {
    const [x0, y0, x1, y1] = zone || [34, 30, 286, 168], t = Math.sin(c * DEG) / Math.sin(a * DEG), A = [t * Math.cos(b * DEG), t * Math.sin(b * DEG)];
    const xs = [0, 1, A[0]], ys = [0, 0, A[1]], mnx = Math.min(...xs), mxx = Math.max(...xs), my = Math.max(...ys);
    const k = Math.min((x1 - x0) / (mxx - mnx), (y1 - y0) / my), ox = x0 + ((x1 - x0) - k * (mxx - mnx)) / 2 - k * mnx;
    const P = (x, y) => [+(ox + k * x).toFixed(1), +(y1 - k * y).toFixed(1)];
    return [P(A[0], A[1]), P(0, 0), P(1, 0)];
  }
  /* Figure d'un triangle aux angles donnés ; mes = textes écrits dans les angles (null : rien), avec un arc ;
     o = { codes, droit, ext : côté [BC] prolongé au-delà de C, angle extérieur marqué « ? » } */
  const arcAngle = (S, P1, P2, r) => { const a1 = Math.atan2(-(P1[1] - S[1]), P1[0] - S[0]), a2 = Math.atan2(-(P2[1] - S[1]), P2[0] - S[0]); let d = a2 - a1; while (d <= -Math.PI) d += 2 * Math.PI; while (d > Math.PI) d -= 2 * Math.PI; const p = (a) => `${+(S[0] + r * Math.cos(a)).toFixed(1)} ${+(S[1] - r * Math.sin(a)).toFixed(1)}`; return `<path class="g-arc" d="M${p(a1)} A${r} ${r} 0 0 ${d > 0 ? 0 : 1} ${p(a1 + d)}"/>`; };
  // Texte dans l'angle en S formé avec P1 et P2 : sur la bissectrice, assez loin pour tenir entre les côtés
  const texteAngle = (S, P1, P2, txt) => { const u = [P1[0] - S[0], P1[1] - S[1]], v = [P2[0] - S[0], P2[1] - S[1]], lu = Math.hypot(...u), lv = Math.hypot(...v), b = [u[0] / lu + v[0] / lv, u[1] / lu + v[1] / lv], lb = Math.hypot(...b), th = Math.acos(Math.max(-1, Math.min(1, (u[0] * v[0] + u[1] * v[1]) / (lu * lv)))), d = Math.max(24, Math.min(64, (String(txt).length * 3.6 + 4) / Math.tan(th / 2) + 6)); return `<text class="g-mesure" x="${+(S[0] + (b[0] / lb) * d).toFixed(1)}" y="${+(S[1] + (b[1] / lb) * d + 4).toFixed(1)}" text-anchor="middle">${txt}</text>`; };
  function figTriAngles(N, a, b, c, mes, o) {
    o = o || {};
    const P = triAngles(a, b, c, o.ext ? [34, 30, 236, 168] : null);
    let s = figureTriangle(P, N, { codes: o.codes, droit: o.droit, aria: o.aria || `Triangle ${N.join("")}` }), add = "";
    mes.forEach((t, k) => { if (!t) return; const S = P[k], P1 = P[(k + 1) % 3], P2 = P[(k + 2) % 3]; if (!(o.droit && o.droit.some(([, i]) => i === N[k]))) add += arcAngle(S, P1, P2, 15); add += texteAngle(S, P1, P2, t); });
    if (o.ext) { const [, B, C] = P, E = [+(C[0] + 70).toFixed(1), C[1]]; add += `<line class="g-droite" x1="${C[0]}" y1="${C[1]}" x2="${E[0]}" y2="${E[1]}" stroke-dasharray="5 4"/>` + arcAngle(C, E, P[0], 15) + texteAngle(C, E, P[0], "?"); }
    return s.replace("</svg>", () => add + "</svg>");
  }
  FIGURES["an5-methode-triangle"] = () => figTriAngles(["A", "B", "C"], 60, 45, 75, ["?", "45°", "75°"], { aria: "Triangle ABC : l'angle B mesure 45 degrés, l'angle C 75 degrés, l'angle A est inconnu" });
  FIGURES["an5-qcm-triangle"] = () => figTriAngles(["R", "S", "T"], 48, 67, 65, ["48°", "67°", "?"], { aria: "Triangle RST : angles de 48 et 67 degrés, le troisième est inconnu" });
  FIGURES["an5-qcm-iso"] = () => figTriAngles(["A", "B", "C"], 36, 72, 72, ["36°", "?", null], { codes: [["A", "B", 2], ["A", "C", 2]], aria: "Triangle ABC isocèle en A, angle au sommet de 36 degrés, angle B inconnu" });
  FIGURES["an5-qcm-alternes"] = () => figParalleles({ theta: 65, phi: 0, marques: [[4, "115°"], [6, "?"]], aria: "Deux droites parallèles coupées par une sécante : un angle de 115 degrés et l'angle alterne-interne inconnu" });
  FIGURES["an5-qcm-corresp"] = () => figParalleles({ theta: 62, phi: 0, marques: [[1, "62°"], [5, "64°"]], aria: "Deux droites coupées par une sécante : deux angles correspondants de 62 et 64 degrés" });
  // Démonstration de la somme des angles : parallèle à (BC) passant par A
  FIGURES["an5-cours-somme"] = () => {
    const [A, B, C] = triAngles(70, 50, 60, [40, 54, 280, 172]), arc = (S, d1, d2, r, st) => { const p = (d) => [+(S[0] + r * Math.cos(d * DEG)).toFixed(1), +(S[1] - r * Math.sin(d * DEG)).toFixed(1)]; return `<path class="g-arc"${st ? ` style="stroke:var(--${st})"` : ""} d="M${p(d1).join(" ")} A${r} ${r} 0 0 0 ${p(d2).join(" ")}"/>`; };
    const dAB = Math.atan2(-(B[1] - A[1]), B[0] - A[0]) / DEG + 360, dAC = Math.atan2(-(C[1] - A[1]), C[0] - A[0]) / DEG + 360;
    let s = geo5({ W: 320, H: 196, pts: { A, B, C }, segs: [["A", "B"], ["B", "C"], ["C", "A"]], decal: { A: [-4, -10], B: [-14, 6], C: [6, 6] }, aria: "Triangle ABC et la parallèle à (BC) passant par A : l'angle B (50°) et l'angle de gauche en A sont alternes-internes, l'angle C (60°) et l'angle de droite en A aussi ; en A, 50° + 70° + 60° = 180°, un angle plat" });
    s = s.replace(/<svg[^>]*>/, (m) => m + `<line class="g-droite" x1="8" y1="${A[1]}" x2="312" y2="${A[1]}"/>`);
    const T = (x, y, t, cl) => `<text class="${cl || "g-mesure"}" x="${x}" y="${y}" text-anchor="middle">${t}</text>`;
    s = s.replace("</svg>", () => arc(B, 0, 50, 22) + arc(C, 120, 180, 22, "lagon") + arc(A, 180, dAB, 20) + arc(A, dAC, 360, 26, "lagon") + arc(A, dAB, dAC, 15, "courbe2")
      + T(B[0] + 38, B[1] - 8, "50°") + T(C[0] - 40, C[1] - 8, "60°") + T(A[0] - 44, A[1] + 15, "50°") + T(A[0] + 50, A[1] + 15, "60°") + T(A[0] + 3, A[1] + 34, "70°") + T(280, A[1] - 7, "(d) // (BC)", "g-label") + "</svg>");
    return s;
  };

  GEN["an5-vocabulaire"] = function () {
    const t = rand(0, 3), th = thetaHasard(), ph = rand(-12, 12);
    if (t <= 1) {
      let a, b, nat;
      for (;;) { a = rand(1, 8); b = rand(1, 8); if (a === b) continue; nat = natureDe(a, b); if (nat) break; }
      const fig = figParalleles({ theta: th, phi: ph, marques: [[a, String(a)], [b, String(b)]], aria: `Deux droites (d) et (d') coupées par une sécante ; les angles ${a} et ${b} sont marqués` });
      const noms = ["correspondants", "alternes-internes", "opposés par le sommet", "adjacents supplémentaires"];
      const { choix, attendu } = melange(nat, noms.filter((n) => n !== nat));
      const expl = { correspondants: "ils sont du même côté de la sécante et occupent la même position aux deux points d'intersection (l'un au-dessus de $(d)$, l'autre au-dessus de $(d')$, ou les deux en dessous)", "alternes-internes": "ils sont de part et d'autre de la sécante, et tous les deux entre les droites $(d)$ et $(d')$", "opposés par le sommet": "ils ont le même sommet et leurs côtés sont dans le prolongement l'un de l'autre", "adjacents supplémentaires": "ils ont le même sommet et un côté commun, et ensemble ils forment un angle plat" }[nat];
      return { enonce: `Sur la figure, les angles ${a} et ${b} sont :`, figure: fig, mode: "choix", choix, attendu,
        aides: ["Regarde d'abord si les deux angles ont le même sommet.", "Même sommet : opposés par le sommet (côtés prolongés) ou adjacents (un côté commun). Sommets différents : correspondants ou alternes-internes.", "**Alternes-internes** : de part et d'autre de la sécante, entre les deux droites. **Correspondants** : du même côté de la sécante, à la même place."],
        solution: `Les angles ${a} et ${b} sont ${nat} : ${expl}.` };
    }
    if (t === 2) {
      const a = rand(25, 155), q = rand(0, 1);
      const fig = figParalleles({ une: true, theta: a, phi: ph, noms: false, marques: [[1, `${a}°`], [q ? 3 : 2, "?"]], aria: `Deux droites sécantes ; un angle de ${a} degrés et un angle inconnu` });
      const rep = q ? a : 180 - a;
      return { enonce: `Deux droites sont sécantes. Quelle est la mesure de l'angle marqué « ? » ?`, figure: fig, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: rep,
        erreurs: [{ valeur: q ? 180 - a : a, message: q ? "Ces angles sont opposés par le sommet : ils ont la même mesure." : "Ces angles sont adjacents et forment un angle plat : ils sont supplémentaires." }],
        aides: ["Deux angles opposés par le sommet ont la même mesure.", "Deux angles adjacents qui forment un angle plat sont supplémentaires : leur somme vaut $180^\\circ$.", q ? "Les deux angles ont le même sommet et leurs côtés sont prolongés." : "Les deux angles ont un côté commun."],
        solution: q ? `Les deux angles sont opposés par le sommet : ils mesurent tous les deux $${a}^\\circ$.` : `Les deux angles sont supplémentaires : $180^\\circ - ${a}^\\circ = ${180 - a}^\\circ$.` };
    }
    const a = rand(10, 85) * 2, s2 = rand(0, 2);
    if (s2 === 0) return { enonce: `La bissectrice d'un angle de $${a}^\\circ$ le partage en deux angles. Combien mesure chacun d'eux ?`, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: a / 2,
      aides: ["La bissectrice d'un angle le partage en deux angles de même mesure.", "Il faut donc diviser par $2$.", `$${a} \\div 2$.`], solution: `$${a}^\\circ \\div 2 = ${a / 2}^\\circ$.` };
    const b = rand(5, 85);
    if (s2 === 1) return { enonce: `Deux angles adjacents forment un angle droit. L'un mesure $${b}^\\circ$. Combien mesure l'autre ?`, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: 90 - b,
      erreurs: [{ valeur: 180 - b, message: "Un angle droit mesure $90^\\circ$, pas $180^\\circ$." }],
      aides: ["Un angle droit mesure $90^\\circ$.", "Les deux angles se partagent cet angle droit.", `$90 - ${b}$.`], solution: `$90^\\circ - ${b}^\\circ = ${90 - b}^\\circ$ (les deux angles sont complémentaires).` };
    const c = rand(91, 179), nat = pick([[c, "obtus"], [b, "aigu"], [c, "obtus"], [b, "aigu"], [90, "droit"], [180, "plat"], [0, "nul"], [360, "plein"]]);
    const L = shuffle(["A", "B", "C", "D", "E", "F", "M", "N", "O", "P", "R", "S", "T", "x", "y", "z"].slice()).slice(0, 3), nomA = `\\widehat{${L.join("")}}`, fig = nat[0] > 0 && nat[0] < 180 && Math.random() < 0.5, d0 = rand(-15, 35);
    const autres = shuffle(["un angle aigu", "un angle obtus", "un angle droit", "un angle plat", "un angle nul", "un angle plein"].filter((x) => x !== `un angle ${nat[1]}`)).slice(0, 3);
    const { choix, attendu } = melange(`un angle ${nat[1]}`, autres);
    return { enonce: fig ? `L'angle $${nomA}$ dessiné mesure $${nat[0]}^\\circ$. C'est :` : pick([`Un angle de $${nat[0]}^\\circ$ est :`, `L'angle $${nomA}$ mesure $${nat[0]}^\\circ$. C'est :`]), figure: fig ? figureAngle(d0, d0 + nat[0], L, nat[0] === 90) : undefined, mode: "choix", choix, attendu,
      aides: ["Aigu : moins de $90^\\circ$. Droit : $90^\\circ$. Obtus : entre $90^\\circ$ et $180^\\circ$.", "Plat : $180^\\circ$ (les deux côtés sont dans le prolongement l'un de l'autre).", "Nul : $0^\\circ$ ; plein : $360^\\circ$ (un tour complet)."], solution: `$${nat[0]}^\\circ$ : c'est un angle ${nat[1]}.` };
  };

  GEN["an5-calculer"] = function () {
    const th = thetaHasard(), ph = rand(-12, 12);
    for (;;) {
      const a = rand(1, 8), b = rand(1, 8); if (a === b) continue;
      const nat = natureDe(a, b); if (!nat || nat === "adjacents supplémentaires" && Math.random() < 0.5) continue;
      const ma = mesure(a, th), mb = mesure(b, th);
      const fig = figParalleles({ theta: th, phi: ph, marques: [[a, `${ma}°`], [b, "?"]], aria: `Deux droites parallèles (d) et (d') coupées par une sécante ; un angle de ${ma} degrés et un angle inconnu` });
      const egal = ma === mb;
      const just = nat === "correspondants" || nat === "alternes-internes" ? `Les deux angles sont ${nat} et les droites $(d)$ et $(d')$ sont parallèles : ils ont la même mesure.`
        : nat === "opposés par le sommet" ? "Les deux angles sont opposés par le sommet : ils ont la même mesure."
        : "Les deux angles sont adjacents et forment un angle plat : ils sont supplémentaires.";
      const sol = egal ? `${just} L'angle mesure $${mb}^\\circ$.` : nat === "adjacents supplémentaires" ? `${just} $180^\\circ - ${ma}^\\circ = ${mb}^\\circ$.` : `Les deux angles ne sont ni correspondants, ni alternes-internes : on passe par un angle intermédiaire. L'angle adjacent à l'angle connu mesure $180^\\circ - ${ma}^\\circ = ${mb}^\\circ$, et on retrouve cette mesure en ${b} par angles correspondants ou opposés par le sommet. L'angle mesure $${mb}^\\circ$.`;
      return { enonce: `Les droites $(d)$ et $(d')$ sont parallèles. Quelle est la mesure de l'angle marqué « ? » ?`, figure: fig, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: mb,
        erreurs: egal ? [{ valeur: 180 - ma, message: "Ces deux angles ont la même mesure : vérifie leur position." }] : [{ valeur: ma, message: "Ces deux angles ne sont pas égaux : l'un est aigu, l'autre obtus. Ils sont supplémentaires." }],
        aides: ["Avec deux droites parallèles, les angles correspondants et les angles alternes-internes ont la même mesure.", "Les angles opposés par le sommet sont égaux ; deux angles adjacents qui forment un angle plat sont supplémentaires.", `Sur cette figure, il n'y a que deux mesures : $${th}^\\circ$ et $${180 - th}^\\circ$. L'angle cherché est-il ${mb < 90 ? "aigu" : "obtus"} ?`],
        solution: sol };
    }
  };

  GEN["an5-paralleles"] = function () {
    const th = thetaHasard(), ph = rand(-12, 12), nat = pick(["correspondants", "alternes-internes"]), [a, b] = pick(PAIRES[nat]);
    const ma = mesure(a, th), par = Math.random() < 0.5, mb = par ? ma : ma + pick([-1, 1]) * rand(2, 6);
    const fig = figParalleles({ theta: th, phi: ph, marques: [[a, `${ma}°`], [b, `${mb}°`]], aria: `Deux droites (d) et (d') coupées par une sécante ; deux angles ${nat} de ${ma} et ${mb} degrés` });
    const bonne = par ? `Oui, car les angles ${nat} sont égaux` : `Non, car les angles ${nat} ne sont pas égaux`;
    const fausses = par ? [`Non, car les angles ${nat} sont égaux`, "On ne peut pas savoir sans mesurer les droites", `Oui, car les angles ${nat} sont supplémentaires`] : [`Oui, car les angles ${nat} sont presque égaux`, "On ne peut pas savoir sans mesurer les droites", `Oui, car les droites semblent parallèles sur le dessin`];
    const { choix, attendu } = melange(bonne, fausses);
    return { enonce: `Le dessin n'est pas forcément exact : on ne se fie qu'aux mesures indiquées. Les droites $(d)$ et $(d')$ sont-elles parallèles ?`, figure: fig, mode: "choix", choix, attendu,
      aides: [`Les deux angles marqués sont ${nat}.`, `Propriété : si deux droites coupées par une sécante forment des angles ${nat} **égaux**, alors elles sont parallèles.`, "Et si ces angles ne sont pas égaux, les droites ne sont pas parallèles."],
      solution: par ? `Les angles ${nat} mesurent tous les deux $${ma}^\\circ$ : ils sont égaux, donc $(d)$ et $(d')$ sont parallèles.` : `Les angles ${nat} mesurent $${ma}^\\circ$ et $${mb}^\\circ$ : ils ne sont pas égaux, donc $(d)$ et $(d')$ ne sont pas parallèles (même si le dessin donne l'impression contraire).` };
  };

  GEN["an5-triangles"] = function () {
    const t = rand(0, 4), N = nomsTri(), [A, B, C] = N, fig = Math.random() < 0.6, deg = (v) => `${v}°`;
    if (t === 0) {
      const a = rand(20, 110), b = rand(15, 160 - a);
      return { enonce: `Dans le triangle $${A}${B}${C}$, $\\widehat{${A}} = ${a}^\\circ$ et $\\widehat{${B}} = ${b}^\\circ$. Combien mesure $\\widehat{${C}}$ ?`, figure: fig ? figTriAngles(N, a, b, 180 - a - b, [deg(a), deg(b), "?"]) : undefined, mode: "nombre", prefixe: `$\\widehat{${C}} =$`, suffixe: "°", attendu: 180 - a - b,
        erreurs: [{ valeur: a + b, message: "Ça, c'est la somme des deux angles connus. Il faut la retirer de $180^\\circ$." }, { valeur: 360 - a - b, message: "La somme des angles d'un triangle vaut $180^\\circ$, pas $360^\\circ$." }],
        aides: ["La somme des angles d'un triangle vaut $180^\\circ$.", `$${a} + ${b} = ${a + b}$.`, `$180 - ${a + b}$.`], solution: `$\\widehat{${C}} = 180^\\circ - (${a}^\\circ + ${b}^\\circ) = 180^\\circ - ${a + b}^\\circ = ${180 - a - b}^\\circ$.` };
    }
    if (t === 1) {
      const s = rand(10, 140) * (Math.random() < 0.5 ? 1 : 1); if (s % 2) return GEN["an5-triangles"]();
      return { enonce: `Le triangle $${A}${B}${C}$ est isocèle en $${A}$ et $\\widehat{${A}} = ${s}^\\circ$. Combien mesure $\\widehat{${B}}$ ?`, figure: fig ? figTriAngles(N, s, (180 - s) / 2, (180 - s) / 2, [deg(s), "?", null], { codes: [[A, B, 2], [A, C, 2]] }) : undefined, mode: "nombre", prefixe: `$\\widehat{${B}} =$`, suffixe: "°", attendu: (180 - s) / 2,
        erreurs: [{ valeur: 180 - s, message: `Les angles $\\widehat{${B}}$ et $\\widehat{${C}}$ se partagent ces $${180 - s}^\\circ$ : divise par $2$.` }, { valeur: s, message: `Dans un triangle isocèle en $${A}$, ce sont les angles à la base, $\\widehat{${B}}$ et $\\widehat{${C}}$, qui sont égaux.` }],
        aides: [`Dans un triangle isocèle en $${A}$, les angles à la base $\\widehat{${B}}$ et $\\widehat{${C}}$ sont égaux.`, `Ensemble, ils mesurent $180^\\circ - ${s}^\\circ = ${180 - s}^\\circ$.`, `$${180 - s} \\div 2$.`],
        solution: `$\\widehat{${B}} + \\widehat{${C}} = 180^\\circ - ${s}^\\circ = ${180 - s}^\\circ$ et ces deux angles sont égaux : $\\widehat{${B}} = ${180 - s}^\\circ \\div 2 = ${(180 - s) / 2}^\\circ$.` };
    }
    if (t === 2) {
      const b = rand(15, 80);
      return { enonce: `Le triangle $${A}${B}${C}$ est isocèle en $${A}$ et $\\widehat{${B}} = ${b}^\\circ$. Combien mesure $\\widehat{${A}}$ ?`, figure: fig ? figTriAngles(N, 180 - 2 * b, b, b, ["?", deg(b), null], { codes: [[A, B, 2], [A, C, 2]] }) : undefined, mode: "nombre", prefixe: `$\\widehat{${A}} =$`, suffixe: "°", attendu: 180 - 2 * b,
        erreurs: [{ valeur: 180 - b, message: `$\\widehat{${C}}$ mesure aussi $${b}^\\circ$ : il faut retirer les deux angles à la base.` }],
        aides: [`$\\widehat{${C}} = \\widehat{${B}} = ${b}^\\circ$ (angles à la base).`, `$${b} + ${b} = ${2 * b}$.`, `$180 - ${2 * b}$.`], solution: `$\\widehat{${C}} = \\widehat{${B}} = ${b}^\\circ$, donc $\\widehat{${A}} = 180^\\circ - 2 \\times ${b}^\\circ = ${180 - 2 * b}^\\circ$.` };
    }
    if (t === 3) {
      const b = rand(12, 78);
      return { enonce: `Le triangle $${A}${B}${C}$ est rectangle en $${A}$ et $\\widehat{${B}} = ${b}^\\circ$. Combien mesure $\\widehat{${C}}$ ?`, figure: fig ? figTriAngles(N, 90, b, 90 - b, [null, deg(b), "?"], { droit: [[B, A, C]] }) : undefined, mode: "nombre", prefixe: `$\\widehat{${C}} =$`, suffixe: "°", attendu: 90 - b,
        erreurs: [{ valeur: 180 - b, message: `N'oublie pas l'angle droit en $${A}$ : il mesure $90^\\circ$.` }],
        aides: [`L'angle droit $\\widehat{${A}}$ mesure $90^\\circ$.`, "Dans un triangle rectangle, les deux angles aigus ont une somme de $90^\\circ$.", `$90 - ${b}$.`], solution: `$\\widehat{${C}} = 180^\\circ - 90^\\circ - ${b}^\\circ = ${90 - b}^\\circ$.` };
    }
    const q = rand(0, 1);
    if (q && Math.random() < 0.5) {
      // triangle isocèle dont on connaît un angle à la base : les deux autres angles
      const b = rand(20, 85), k = rand(0, 1);
      return { enonce: `Le triangle $${A}${B}${C}$ est isocèle en $${A}$. L'angle $\\widehat{${k ? C : B}}$ mesure $${b}^\\circ$. Combien mesure l'angle $\\widehat{${k ? B : C}}$ ?`, figure: fig ? figTriAngles(N, 180 - 2 * b, b, b, [null, k ? "?" : deg(b), k ? deg(b) : "?"], { codes: [[A, B, 2], [A, C, 2]] }) : undefined, mode: "nombre", prefixe: `$\\widehat{${k ? B : C}} =$`, suffixe: "°", attendu: b,
        erreurs: [{ valeur: 180 - 2 * b, message: `Ça, c'est l'angle au sommet $\\widehat{${A}}$. Les angles à la base, $\\widehat{${B}}$ et $\\widehat{${C}}$, sont égaux.` }, { valeur: 180 - b, message: `Dans un triangle isocèle en $${A}$, les deux angles à la base sont **égaux**.` }],
        aides: [`Le triangle est isocèle en $${A}$ : quels sont ses angles à la base ?`, `Ce sont $\\widehat{${B}}$ et $\\widehat{${C}}$ : ils sont égaux.`, "Aucun calcul n'est nécessaire."], solution: `Les angles à la base $\\widehat{${B}}$ et $\\widehat{${C}}$ d'un triangle isocèle en $${A}$ sont égaux : $\\widehat{${k ? B : C}} = ${b}^\\circ$ (et $\\widehat{${A}} = 180^\\circ - 2 \\times ${b}^\\circ = ${180 - 2 * b}^\\circ$).` };
    }
    return q ? { enonce: `Le triangle $${A}${B}${C}$ est équilatéral. Combien mesure $\\widehat{${A}}$ ?`, figure: fig ? figTriAngles(N, 60, 60, 60, ["?", null, null], { codes: [[A, B, 1], [B, C, 1], [C, A, 1]] }) : undefined, mode: "nombre", prefixe: `$\\widehat{${A}} =$`, suffixe: "°", attendu: 60,
      erreurs: [{ valeur: 180, message: "$180^\\circ$, c'est la somme des **trois** angles." }, { valeur: 90, message: "Un triangle équilatéral n'a pas d'angle droit : ses trois angles sont égaux." }],
      aides: ["Dans un triangle équilatéral, les trois angles sont égaux.", "Leur somme vaut $180^\\circ$.", "$180 \\div 3$."], solution: "Les trois angles sont égaux et leur somme vaut $180^\\circ$ : chacun mesure $180^\\circ \\div 3 = 60^\\circ$." }
      : (() => { const a = rand(30, 120), b = rand(20, 150 - a), c = 180 - a - b, ext = 180 - c; return { enonce: `Dans le triangle $${A}${B}${C}$, $\\widehat{${A}} = ${a}^\\circ$ et $\\widehat{${B}} = ${b}^\\circ$. On prolonge le côté $[${B}${C}]$ au-delà de $${C}$. Combien mesure l'angle formé à l'extérieur du triangle, en $${C}$, entre ce prolongement et $[${C}${A}]$ ?`, figure: figTriAngles(N, a, b, c, [deg(a), deg(b), null], { ext: true }), mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: ext,
        erreurs: [{ valeur: c, message: "Ça, c'est l'angle intérieur en $" + C + "$. L'angle extérieur est son supplémentaire." }],
        aides: [`Calcule d'abord $\\widehat{${C}} = 180^\\circ - ${a}^\\circ - ${b}^\\circ$.`, "L'angle extérieur et l'angle intérieur en $" + C + "$ forment un angle plat.", `Angle extérieur $= 180^\\circ - \\widehat{${C}}$.`],
        solution: `$\\widehat{${C}} = 180^\\circ - ${a}^\\circ - ${b}^\\circ = ${c}^\\circ$, puis l'angle extérieur vaut $180^\\circ - ${c}^\\circ = ${ext}^\\circ$ (c'est aussi $${a}^\\circ + ${b}^\\circ$).` }; })();
  };

  /* =====================================================================
     Chapitre 6 : divisibilité (dv5-)
     ===================================================================== */
  const { diviseurs } = window.PM_EXO.college;
  const sommeChiffres = (n) => String(n).split("").reduce((s, c) => s + +c, 0);
  /* Schéma d'une division euclidienne : a partagé en q paquets de b et un reste r ; cache = "q", "r" ou "" (texte « ? ») */
  function schemaDivision(a, b, q, r, cache, unite) {
    // si le nombre de paquets est cherché, on ne dessine pas tous les paquets (des points de suspension au milieu)
    const x0 = 12, W = 296, y = 34, h = 30, entier = q <= 7 && cache !== "q", n = entier ? q : 6, wr = r ? Math.max(30, Math.min(70, (W * r) / (b * q + r) * 1.5)) : 0, wb = (W - wr) / n;
    let s = "";
    for (let i = 0; i < n; i++) { const x = +(x0 + i * wb).toFixed(1), coupe = !entier && i === 3; s += `<rect class="${coupe ? "g-vide" : "g-aire"}" x="${x}" y="${y}" width="${+wb.toFixed(1)}" height="${h}"/><text class="g-label" x="${+(x + wb / 2).toFixed(1)}" y="${y + h / 2 + 4}" text-anchor="middle">${coupe ? "…" : nbTexte(b)}</text>`; }
    if (r) s += `<rect class="g-barre-plus" x="${+(x0 + W - wr).toFixed(1)}" y="${y}" width="${+wr.toFixed(1)}" height="${h}"/><text class="${cache === "r" ? "g-mesure" : "g-label"}" x="${+(x0 + W - wr / 2).toFixed(1)}" y="${y + h / 2 + 4}" text-anchor="middle">${cache === "r" ? "?" : r}</text>`;
    s += `<g class="g-grid">${Array.from({ length: n }, (_, i) => `<line x1="${+(x0 + (i + 1) * wb).toFixed(1)}" y1="${y}" x2="${+(x0 + (i + 1) * wb).toFixed(1)}" y2="${y + h}"/>`).join("")}</g><rect class="g-unite" x="${x0}" y="${y}" width="${W}" height="${h}"/>`;
    s += `<path class="g-accolade" d="M${x0 + 2} ${y - 5} V${y - 11} H${+(x0 + W - wr - 2).toFixed(1)} V${y - 5}"/><text class="${cache === "q" ? "g-mesure" : "g-label"}" x="${+(x0 + (W - wr) / 2).toFixed(1)}" y="${y - 16}" text-anchor="middle">${cache === "q" ? "? paquets" : `${q} paquets`} de ${nbTexte(b)}</text>`;
    s += `<path class="g-accolade" d="M${x0 + 2} ${y + h + 5} V${y + h + 11} H${x0 + W - 2} V${y + h + 5}"/><text class="g-label" x="160" y="${y + h + 26}" text-anchor="middle">${nbTexte(a)}${unite ? " " + unite : ""} en tout</text>`;
    return svgBandes(y + h + 32, s, `Schéma : ${nbTexte(a)} partagés en paquets de ${nbTexte(b)}, avec un reste`);
  }
  // Objets rangés par paquets (petits nombres) : a points, paquets de b entourés, le reste à part
  function paquets(a, b) {
    const q = Math.floor(a / b), r = a % b, cw = 14, gw = b * cw + 8, parLigne = Math.max(1, Math.floor(300 / (gw + 6))), lignes = Math.ceil((q + (r ? 1 : 0)) / parLigne);
    let s = "";
    for (let g = 0; g <= q; g++) { const nbp = g < q ? b : r; if (!nbp) continue; const L = Math.floor(g / parLigne), C = g % parLigne, x = 10 + C * (gw + 6), yy = 10 + L * 34;
      s += `<rect class="${g < q ? "g-rect" : "g-barre-plus"}" x="${x}" y="${yy}" width="${nbp * cw + 8}" height="26" rx="8"/>`;
      for (let i = 0; i < nbp; i++) s += `<circle class="g-point" cx="${x + 11 + i * cw}" cy="${yy + 13}" r="4.5"/>`; }
    return `<svg class="graph" viewBox="0 0 320 ${lignes * 34 + 16}" role="img" aria-label="${a} objets rangés par paquets de ${b} : ${q} paquets et un reste de ${r}">${s}</svg>`;
  }
  FIGURES["dv5-cours-euclide"] = () => paquets(17, 3).replace("</svg>", '<text class="g-label" x="310" y="96" text-anchor="end">17 = 3 × 5 + 2</text></svg>').replace(/viewBox="0 0 320 ([0-9.]+)"/, (m, h) => `viewBox="0 0 320 ${Math.max(+h, 104)}"`);
  // Diviser par un décimal : on multiplie le dividende et le diviseur par le même nombre
  FIGURES["dv5-cours-decimal"] = () => {
    const T = (x, y, t, cl) => `<text class="${cl || "g-label"}" x="${x}" y="${y}" text-anchor="middle" style="font-size:16px">${t}</text>`;
    return `<svg class="graph" viewBox="0 0 320 110" role="img" aria-label="7,2 divisé par 0,3 : on multiplie les deux nombres par 10, on obtient 72 divisé par 3, qui vaut 24">${T(70, 28, "7,2")}${T(110, 28, "÷")}${T(150, 28, "0,3")}${T(70, 98, "72")}${T(110, 98, "÷")}${T(150, 98, "3")}${T(214, 98, "= 24", "g-mesure")}`
      + [[70, -1], [150, 1]].map(([x, sg]) => `<path class="g-curve" d="M${x} 38 V76" style="stroke-width:1.8"/><path class="g-end" d="M${x} 82 l-5 -8 h10z"/><text class="g-mesure" x="${x + sg * 8}" y="62" text-anchor="${sg < 0 ? "end" : "start"}">× 10</text>`).join("") + `<text class="g-label" x="256" y="56" text-anchor="middle">même quotient</text></svg>`;
  };
  // Les rectangles de n carreaux : rects = [[lignes, colonnes, x, y]] ; c = côté d'un carreau
  function rectsCarreaux(n, rects, c, H, ligne) {
    let s = "";
    rects.forEach(([l, w, x, y]) => { for (let i = 0; i < l; i++) for (let j = 0; j < w; j++) s += `<rect class="g-rect" x="${x + j * c}" y="${y + i * c}" width="${c}" height="${c}"/>`; s += `<text class="g-label" x="${x + w * c + 8}" y="${y + (l * c) / 2 + 4}">${l} × ${w}</text>`; });
    return `<svg class="graph" viewBox="0 0 320 ${H}" role="img" aria-label="${n} carreaux rangés en rectangles : ${rects.map(([l, w]) => `${l} rangée${l > 1 ? "s" : ""} de ${w}`).join(", ")}">${s}${ligne ? `<text class="g-label" x="10" y="${H - 6}">${ligne}</text>` : ""}</svg>`;
  }
  FIGURES["dv5-cours-diviseurs"] = () => rectsCarreaux(12, [[1, 12, 10, 10], [2, 6, 10, 46], [3, 4, 196, 46]], 13, 112, "Diviseurs de 12 : 1 ; 2 ; 3 ; 4 ; 6 ; 12");
  FIGURES["dv5-methode-diviseurs"] = () => rectsCarreaux(20, [[1, 20, 10, 10], [2, 10, 10, 40], [4, 5, 180, 40]], 12, 116, "Diviseurs de 20 : 1 ; 2 ; 4 ; 5 ; 10 ; 20");
  FIGURES["dv5-qcm-rect"] = () => rectsCarreaux(18, [[3, 6, 90, 10]], 18, 72);
  // Multiples de a (au-dessus) et de b (en dessous) sur une droite graduée de 0 à fin, le premier multiple commun entouré (ou « ? »)
  function frise(a, b, fin, cache, noms) {
    const x0 = 18, L = 286, y = 64, X = (v) => +(x0 + (L * v) / fin).toFixed(1), m = (a * b) / (function g(u, v) { return v ? g(v, u % v) : u; })(a, b);
    let s = `<svg class="graph" viewBox="0 0 320 ${noms ? 128 : 112}" role="img" aria-label="Droite graduée de 0 à ${fin} : les multiples de ${a} au-dessus, ceux de ${b} en dessous"><g class="g-axis"><line x1="${x0}" y1="${y}" x2="${x0 + L + 8}" y2="${y}"/></g>`;
    // étiquettes espacées d'au moins 26 px (une sur deux, sur trois… si les multiples sont serrés), le multiple commun toujours écrit
    const saut = (u) => Math.max(1, Math.ceil(26 / ((L * u) / fin))), ecrit = (v, u) => (v / u) % saut(u) === 0 || (!cache && v === m);
    for (let v = a; v <= fin; v += a) { if (cache && v >= m) break; s += `<circle class="g-point" cx="${X(v)}" cy="${y - 14}" r="4"/>${ecrit(v, a) ? `<g class="g-tick"><text x="${X(v)}" y="${y - 22}" text-anchor="middle">${v}</text></g>` : ""}`; }
    for (let v = b; v <= fin; v += b) { if (cache && v >= m) break; s += `<rect class="g-barre-plus" x="${X(v) - 4}" y="${y + 10}" width="8" height="8"/>${ecrit(v, b) ? `<g class="g-tick"><text x="${X(v)}" y="${y + 32}" text-anchor="middle">${v}</text></g>` : ""}`; }
    s += `<line class="g-graduation" x1="${x0}" y1="${y - 6}" x2="${x0}" y2="${y + 6}"/><text class="g-label" x="${x0}" y="${y + 20}" text-anchor="middle">0</text>`;
    if (!cache && m <= fin) s += `<circle class="g-cercle" cx="${X(m)}" cy="${y}" r="11"/>`;
    if (cache) s += `<text class="g-mesure" x="${X(m)}" y="${y + 4}" text-anchor="middle">?</text>`;
    if (noms) s += `<circle class="g-point" cx="${x0 + 4}" cy="11" r="4"/><text class="g-label" x="${x0 + 14}" y="15">${noms[0]} : multiples de ${a}</text><rect class="g-barre-plus" x="${x0}" y="114" width="8" height="8"/><text class="g-label" x="${x0 + 14}" y="122">${noms[1]} : multiples de ${b}</text>`;
    return s + `</svg>`;
  }
  FIGURES["dv5-cours-multiples"] = () => frise(6, 8, 50);
  FIGURES["dv5-methode-multiples"] = () => frise(4, 6, 26);
  FIGURES["dv5-methode-euclide"] = () => schemaDivision(85, 9, 9, 4, "");
  FIGURES["dv5-qcm-paquets"] = () => paquets(23, 5);
  FIGURES["dv5-qcm-frise"] = () => frise(4, 10, 44, true);

  GEN["dv5-euclide"] = function () {
    const t = rand(0, 3);
    if (t <= 1) {
      const b = rand(3, 25), q = rand(4, 60), r = rand(1, b - 1), a = b * q + r, ask = t === 0 ? "quotient" : "reste";
      return { enonce: `Dans la division euclidienne de $${nb(a)}$ par $${b}$, quel est le ${ask} ?`, mode: "nombre", prefixe: `${ask[0].toUpperCase() + ask.slice(1)} :`, attendu: t === 0 ? q : r,
        erreurs: t === 0 ? [{ valeur: r, message: "Ça, c'est le reste." }, { valeur: q + 1, message: `$${b} \\times ${q + 1} = ${nb(b * (q + 1))}$ dépasse $${nb(a)}$ : le quotient est plus petit.` }] : [{ valeur: q, message: "Ça, c'est le quotient." }, { valeur: b - r, message: `Ça, c'est ce qu'il manque pour aller jusqu'au multiple suivant, $${nb(b * (q + 1))}$. Le reste est ce qu'il y a **en plus** de $${nb(b * q)}$.` }],
        aides: [`Cherche le plus grand multiple de $${b}$ qui ne dépasse pas $${nb(a)}$.`, `$${b} \\times ${q} = ${nb(b * q)}$ et $${b} \\times ${q + 1} = ${nb(b * (q + 1))}$.`, `Le reste est ce qu'il manque pour aller jusqu'à $${nb(a)}$ ; il est plus petit que $${b}$.`],
        solution: `$${nb(a)} = ${b} \\times ${q} + ${r}$ avec $${r} < ${b}$ : le quotient est $${q}$ et le reste $${r}$.` };
    }
    const b = pick([6, 8, 10, 12, 15, 20, 24, 30, 45, 50]), q = rand(5, 40), r = rand(1, b - 1), a = b * q + r, lieu = pick(LIEUX5);
    const ctx = pick([
      [`On range $${nb(a)}$ œufs dans des boîtes de $${b}$.`, "Combien de boîtes pleines obtient-on ?", q, "boîtes", `On obtient $${q}$ boîtes pleines (et il reste $${r}$ œufs).`, "q", [r, "Ça, c'est le nombre d'œufs qui restent."]],
      [`$${nb(a)}$ élèves du collège de ${lieu} partent en sortie dans des bus de $${b}$ places.`, "Combien de bus faut-il au minimum ?", q + 1, "bus", `$${q}$ bus pleins ne suffisent pas : il reste $${r}$ élèves, il faut un bus de plus, soit $${q + 1}$ bus.`, "q", [r, "Ça, c'est le nombre d'élèves sans place dans les bus pleins."]],
      [`Un pêcheur de ${pick(["Mtsapéré", "M'tsamboro", "Sada", "Kani-Kéli", "Bandrélé"])} partage $${nb(a)}$ poissons en lots de $${b}$.`, "Combien de poissons restent hors des lots ?", r, "poissons", `Il fait $${q}$ lots et il reste $${r}$ poissons.`, "r", [b - r, `Il resterait $${b - r}$ poissons à trouver pour faire un lot de plus : ce n'est pas le reste.`]],
      [`Une coopérative de ${lieu} met $${nb(a)}$ gousses de vanille en bottes de $${b}$.`, "Combien de bottes complètes obtient-elle ?", q, "bottes", `Elle obtient $${q}$ bottes complètes (et il reste $${r}$ gousses).`, "q", [r, "Ça, c'est le nombre de gousses qui restent."]],
      [`$${nb(a)}$ passagers attendent la barge, qui peut en prendre $${b}$ à chaque traversée.`, "Combien de traversées faut-il au minimum ?", q + 1, "traversées", `$${q}$ traversées pleines ne suffisent pas : il reste $${r}$ passagers, il faut une traversée de plus, soit $${q + 1}$.`, "q", [r, "Ça, c'est le nombre de passagers qui restent après les traversées pleines."]]
    ]);
    return { enonce: `${ctx[0]} ${ctx[1]}`, figure: Math.random() < 0.45 ? schemaDivision(a, b, q, r, ctx[5]) : undefined, mode: "nombre", prefixe: "Réponse :", suffixe: ctx[3], attendu: ctx[2],
      erreurs: [ctx[2] === q + 1 ? { valeur: q, message: "Avec ce nombre, il reste des personnes sans place." } : ctx[2] === q ? { valeur: q + 1, message: "Le dernier paquet n'est pas complet." } : { valeur: q, message: "Ça, c'est le nombre de lots. On demande ce qui reste." }, { valeur: ctx[6][0], message: ctx[6][1] }],
      aides: [`Effectue la division euclidienne de $${nb(a)}$ par $${b}$.`, `$${nb(a)} = ${b} \\times ${q} + ${r}$.`, "Réfléchis : la réponse est-elle le quotient, le reste, ou le quotient plus un ?"],
      solution: `$${nb(a)} = ${b} \\times ${q} + ${r}$. ${ctx[4]}` };
  };

  GEN["dv5-decimal"] = function () {
    const d = pick([Dc(rand(2, 9), 1), Dc(rand(11, 99), 1), Dc(rand(2, 9), 2), Dc(rand(12, 48), 2)]), q = Dc(rand(2, 60), Math.random() < 0.3 ? 1 : 0);
    const a = mulD(d, q), p = 10 ** d.d, aE = Dc(a.m * (a.d >= d.d ? 1 : 10 ** (d.d - a.d)), Math.max(0, a.d - d.d)), v = q.m / 10 ** q.d;
    return { enonce: `Calcule $${tD(a)} \\div ${tD(d)}$.`, mode: "nombre", prefixe: "Résultat :", attendu: v,
      erreurs: [{ valeur: +(v / p).toFixed(6), message: `Tu n'as multiplié que le diviseur par $${p}$ : il faut aussi multiplier $${tD(a)}$ par $${p}$.` }, { valeur: +(v * 10).toFixed(6), message: "Attention à la position de la virgule : vérifie en calculant le produit du résultat par le diviseur." }],
      aides: [`On ne divise pas par un nombre décimal : on multiplie les deux nombres par $${p}$ pour que le diviseur devienne entier.`, `$${tD(a)} \\div ${tD(d)} = ${tD(aE)} \\div ${d.m}$.`, `Pose la division de $${tD(aE)}$ par $${d.m}$.`],
      solution: `$${tD(a)} \\div ${tD(d)} = (${tD(a)} \\times ${p}) \\div (${tD(d)} \\times ${p}) = ${tD(aE)} \\div ${d.m} = ${tD(q)}$.` };
  };

  GEN["dv5-criteres"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      const k = pick([2, 3, 5, 9, 10]);
      const crit = { 2: "son chiffre des unités est $0$, $2$, $4$, $6$ ou $8$", 3: "la somme de ses chiffres est divisible par $3$", 5: "son chiffre des unités est $0$ ou $5$", 9: "la somme de ses chiffres est divisible par $9$", 10: "son chiffre des unités est $0$" }[k];
      const ok = (n) => n % k === 0;
      let bon; do bon = rand(100, 9999); while (!ok(bon) || (k === 3 && bon % 9 === 0 && Math.random() < 0.5));
      const faux = []; while (faux.length < 3) { const n = rand(100, 9999); if (!ok(n) && !faux.includes(n)) { if ((k === 9 && n % 3 === 0) || (k === 10 && n % 5 === 0) || (k === 5 && n % 10 !== 5 && n % 2 === 0) || Math.random() < 0.6) faux.push(n); } }
      const { choix, attendu } = melange(`$${nb(bon)}$`, faux.map((n) => `$${nb(n)}$`));
      return { enonce: `Lequel de ces nombres est divisible par $${k}$ ?`, mode: "choix", choix, attendu,
        aides: [`Un nombre est divisible par $${k}$ si ${crit}.`, k === 3 || k === 9 ? "Calcule la somme des chiffres de chaque nombre." : "Regarde le chiffre des unités de chaque nombre.", k === 9 ? "Attention : divisible par $3$ ne suffit pas pour être divisible par $9$." : "Un seul nombre convient."],
        solution: `$${nb(bon)}$ est divisible par $${k}$ car ${k === 3 || k === 9 ? `$${String(bon).split("").join(" + ")} = ${sommeChiffres(bon)}$, qui est divisible par $${k}$` : crit.replace("son chiffre", "son chiffre")}. Les autres ne le sont pas.` };
    }
    if (t === 1) {
      for (;;) {
        const n = rand(100, 9999) * 9, s = String(n), i = rand(0, s.length - 1); if (s[0] === "0" || (i === 0 && s[0] === "9")) continue;
        const trou = s.slice(0, i) + "\\ldots" + s.slice(i + 1), c = +s[i];
        const autres = sommeChiffres(n) - c; if (c === 0 && (9 - autres % 9) % 9 === 0 && i === 0) continue;
        if (c === 0 || c === 9) continue;
        return { enonce: `On remplace les pointillés par un chiffre pour que le nombre $${trou}$ soit divisible par $9$. Quel chiffre ?`, mode: "nombre", prefixe: "Chiffre :", attendu: c,
          aides: ["Un nombre est divisible par $9$ si la somme de ses chiffres est divisible par $9$.", `La somme des chiffres connus vaut $${autres}$.`, `Quel chiffre ajouter à $${autres}$ pour obtenir un multiple de $9$ ?`],
          solution: `$${autres} + ${c} = ${autres + c}$, qui est un multiple de $9$ : le chiffre est $${c}$ (c'est le seul de $1$ à $8$ qui convient).` };
      }
    }
    const n = rand(100, 99999), k = pick([3, 9]), s = sommeChiffres(n), oui = n % k === 0;
    const OPTS = [`Oui, car la somme de ses chiffres est divisible par $${k}$`, `Non, car la somme de ses chiffres n'est pas divisible par $${k}$`, `Oui, car il se termine par un chiffre impair`, `Non, car il ne se termine pas par $${k}$`];
    const { choix, attendu } = melange(oui ? OPTS[0] : OPTS[1], [oui ? OPTS[1] : OPTS[0], OPTS[2], OPTS[3]]);
    return { enonce: `Le nombre $${nb(n)}$ est-il divisible par $${k}$ ?`, mode: "choix", choix, attendu,
      aides: [`Critère : un nombre est divisible par $${k}$ si la somme de ses chiffres est divisible par $${k}$.`, "Le chiffre des unités ne sert à rien pour $3$ et $9$.", `Somme des chiffres : $${String(n).split("").join(" + ")}$.`],
      solution: `$${String(n).split("").join(" + ")} = ${s}$, ${oui ? "divisible" : "pas divisible"} par $${k}$ : $${nb(n)}$ ${oui ? "est" : "n'est pas"} divisible par $${k}$.` };
  };

  const avecDiviseurs = (lo, hi, mini) => { const L = []; for (let n = lo; n <= hi; n++) if (diviseurs(n).length >= mini) L.push(n); return L; };
  const COMP_A = avecDiviseurs(12, 100, 6), COMP_B = avecDiviseurs(24, 150, 6), COMP_C = avecDiviseurs(12, 72, 4);
  GEN["dv5-diviseurs"] = function () {
    const t = rand(0, 5);
    if (t === 0) {
      const n = pick(COMP_A), D = diviseurs(n);
      return { enonce: pick([`Combien le nombre $${n}$ a-t-il de diviseurs (en comptant $1$ et $${n}$) ?`, `Combien de diviseurs le nombre $${n}$ possède-t-il, $1$ et $${n}$ compris ?`]), mode: "nombre", prefixe: "Nombre de diviseurs :", attendu: D.length,
        erreurs: [{ valeur: D.length - 2, message: `On compte aussi $1$ et $${n}$, qui sont des diviseurs de $${n}$.` }, { valeur: Math.ceil(D.length / 2), message: `Tu as compté les paires de diviseurs : chaque paire donne **deux** diviseurs (sauf $${Math.round(Math.sqrt(n))} \\times ${Math.round(Math.sqrt(n))}$ si $${n}$ est un carré).` }],
        aides: [`Cherche les produits égaux à $${n}$ : $1 \\times ${n}$, $2 \\times \\ldots$`, "Les diviseurs vont par paires : quand on en trouve un, on en trouve un autre.", "Arrête-toi quand les deux facteurs se croisent."],
        solution: `Les diviseurs de $${n}$ sont : $${D.join("$ ; $")}$. Il y en a $${D.length}$.` };
    }
    if (t === 1) {
      const p = rand(3, 13), q = rand(p + 1, 31), n = p * q;
      return { enonce: `Le nombre $${n}$ s'écrit comme le produit de deux nombres entiers différents de $1$. Complète : $${n} = ${p} \\times \\ldots$`, mode: "nombre", prefixe: "Nombre manquant :", attendu: q,
        erreurs: [{ valeur: n - p, message: "On cherche un facteur : c'est une division, pas une soustraction." }, { valeur: n * p, message: `Le nombre manquant multiplié par $${p}$ doit redonner $${n}$ : on **divise** $${n}$ par $${p}$.` }],
        aides: [`Cherche le quotient de $${n}$ par $${p}$.`, "Tu peux poser la division, ou utiliser les tables.", `$${p} \\times 10 = ${p * 10}$.`], solution: `$${n} \\div ${p} = ${q}$, donc $${n} = ${p} \\times ${q}$.` };
    }
    if (t === 2) {
      const n = pick(COMP_B), D = diviseurs(n), nonD = []; for (let k = 4; k < n && nonD.length < 8; k++) if (n % k) nonD.push(k);
      const bon = pick(nonD), vrais = shuffle(D.filter((d) => d > 1 && d < n).slice()).slice(0, 3);
      const { choix, attendu } = melange(`$${bon}$`, vrais.map((d) => `$${d}$`));
      return { enonce: `Lequel de ces nombres n'est **pas** un diviseur de $${n}$ ?`, mode: "choix", choix, attendu,
        aides: ["$a$ est un diviseur de $n$ si la division de $n$ par $a$ tombe juste (reste $0$).", "Teste chaque nombre avec une division ou un critère.", `Les diviseurs de $${n}$ vont par paires : $1 \\times ${n}$, $2 \\times ${n / 2}$…`.replace(`$2 \\times ${n / 2}$`, n % 2 ? `$${D[1]} \\times ${n / D[1]}$` : `$2 \\times ${n / 2}$`)],
        solution: `$${n} \\div ${bon}$ ne tombe pas juste (reste $${n % bon}$) : $${bon}$ n'est pas un diviseur de $${n}$. Les autres le sont : ${vrais.map((d) => `$${n} = ${d} \\times ${n / d}$`).join(", ")}.` };
    }
    if (t === 3) {
      const k = rand(3, 15), bon = k * rand(4, 25), faux = shuffle([bon + 1, bon - 1, bon + 2, bon - 2, bon + k + 1, bon + Math.ceil(k / 2)].filter((v) => v % k && v > 0)).slice(0, 3);
      const { choix, attendu } = melange(`$${bon}$`, faux.map((v) => `$${v}$`));
      return { enonce: `Lequel de ces nombres est un multiple de $${k}$ ?`, mode: "choix", choix, attendu,
        aides: [`Un multiple de $${k}$ s'écrit $${k} \\times \\ldots$ avec un nombre entier.`, `Divise chaque nombre par $${k}$ : la division doit tomber juste.`, `Repère les multiples de $${k}$ proches : $${k} \\times ${bon / k - 1} = ${bon - k}$, $${k} \\times ${bon / k + 1} = ${bon + k}$…`],
        solution: `$${bon} = ${k} \\times ${bon / k}$ : c'est un multiple de $${k}$. ${faux.map((v) => `$${v} = ${k} \\times ${Math.floor(v / k)} + ${v % k}$`).join(" ; ")} : ce ne sont pas des multiples de $${k}$.` };
    }
    if (t === 4) {
      const n = pick(COMP_A), D = diviseurs(n), i = rand(1, D.length - 2), h = D[i];
      return { enonce: `Voici la liste des diviseurs de $${n}$, rangés dans l'ordre croissant, mais il en manque un : $${D.filter((_, j) => j !== i).join("$ ; $")}$. Quel est le diviseur manquant ?`, mode: "nombre", prefixe: "Diviseur manquant :", attendu: h,
        erreurs: [...(n / h !== h ? [{ valeur: n / h, message: `$${n / h}$ est déjà dans la liste : c'est le partenaire du diviseur manquant ($${n} = ${h} \\times ${n / h}$).` }] : []), { valeur: D[i - 1] + 1 === h ? D[i + 1] - 1 : D[i - 1] + 1, message: `Vérifie en divisant $${n}$ par ce nombre : la division ne tombe pas juste.` }],
        aides: ["Les diviseurs vont par paires : chaque diviseur a un « partenaire » dont le produit avec lui vaut le nombre.", `Associe les diviseurs deux par deux : $1 \\times ${n}$, $${D[1]} \\times ${n / D[1]}$…`, "Le diviseur sans partenaire dans la liste est le partenaire du manquant."],
        solution: `$${n} = ${h} \\times ${n / h}$ : le diviseur manquant est $${h}$.` };
    }
    const k = rand(3, 25), m = rand(20, 300), sup = k * (Math.floor(m / k) + 1);
    if (m % k === 0) return GEN["dv5-diviseurs"]();
    return { enonce: `Quel est le plus petit multiple de $${k}$ strictement supérieur à $${m}$ ?`, mode: "nombre", prefixe: "Multiple :", attendu: sup,
      erreurs: [{ valeur: sup - k, message: `$${sup - k}$ est un multiple de $${k}$, mais il est plus petit que $${m}$.` }, { valeur: m + k, message: `$${m} + ${k}$ n'est pas forcément un multiple de $${k}$ : $${m}$ n'en est pas un.` }],
      aides: [`Divise $${m}$ par $${k}$ : quel est le quotient ?`, `$${k} \\times ${Math.floor(m / k)} = ${k * Math.floor(m / k)}$, c'est encore trop petit.`, `Le multiple suivant est $${k} \\times ${Math.floor(m / k) + 1}$.`],
      solution: `$${m} = ${k} \\times ${Math.floor(m / k)} + ${m % k}$. Le multiple suivant est $${k} \\times ${Math.floor(m / k) + 1} = ${sup}$.` };
  };

  GEN["dv5-problemes"] = function () {
    const t = rand(0, 3), P0 = prenom();
    if (t === 0) {
      let a, b; do { a = rand(4, 30); b = rand(4, 30); } while (a === b || (a * b) / pgcd(a, b) > 150 || a % b === 0 || b % a === 0);
      const m = (a * b) / pgcd(a, b), h = rand(6, 9);
      const C = pick([
        [`À la gare maritime de Mamoudzou, une barge part toutes les $${a}$ minutes et un amphidrome toutes les $${b}$ minutes. Ils partent ensemble à $${h}$ h.`, "Au bout de combien de minutes repartiront-ils ensemble pour la première fois ?", "min", ["barge", "amphidrome"]],
        [`À la gare routière, un bus pour ${pick(["Sada", "Combani", "Dembéni", "Koungou"])} part toutes les $${a}$ minutes et un bus pour ${pick(["Chirongui", "Bandrélé", "Tsingoni", "M'tsamboro"])} toutes les $${b}$ minutes. Ils partent ensemble à $${h}$ h.`, "Au bout de combien de minutes partiront-ils de nouveau ensemble pour la première fois ?", "min", ["bus 1", "bus 2"]],
        [`Deux phares près de Dzaoudzi s'allument ensemble. L'un clignote toutes les $${a}$ secondes, l'autre toutes les $${b}$ secondes.`, "Au bout de combien de secondes clignoteront-ils de nouveau ensemble ?", "s", ["phare 1", "phare 2"]],
        [`Pour la fête du village, deux guirlandes s'allument ensemble. L'une clignote toutes les $${a}$ secondes, l'autre toutes les $${b}$ secondes.`, "Au bout de combien de secondes clignoteront-elles de nouveau ensemble ?", "s", ["guirlande 1", "guirlande 2"]]
      ]);
      return { enonce: `${C[0]} ${C[1]}`, figure: Math.random() < 0.5 ? frise(a, b, Math.ceil((m * 1.12) / 10) * 10, true, C[3]) : undefined, mode: "nombre", prefixe: "Durée :", suffixe: C[2], attendu: m,
        erreurs: [...(m !== a * b ? [{ valeur: a * b, message: "C'est bien un multiple commun, mais pas le plus petit." }] : []), { valeur: a + b, message: "On n'additionne pas les deux durées : on cherche un multiple commun." }],
        aides: [`Écris les multiples de $${a}$ : $${a}$ ; $${2 * a}$ ; $${3 * a}$ ; …`, `Écris les multiples de $${b}$ : $${b}$ ; $${2 * b}$ ; …`, "Cherche le plus petit nombre présent dans les deux listes."],
        solution: `Multiples de $${a}$ : $${Array.from({ length: m / a }, (_, i) => a * (i + 1)).join("$ ; $")}$. Multiples de $${b}$ : $${Array.from({ length: m / b }, (_, i) => b * (i + 1)).join("$ ; $")}$. Le premier multiple commun est $${m}$ : la réponse est $${m}$ ${C[2] === "s" ? "secondes" : "minutes"}.` };
    }
    if (t === 1) {
      const n = pick(COMP_C), D = diviseurs(n).filter((d) => d > 1 && d < n);
      const C = pick([[`Le professeur d'EPS veut placer les $${n}$ élèves en rangées`, "élèves"], [`Un agriculteur de ${pick(LIEUX5)} veut planter $${n}$ bananiers en rangées`, "bananiers"], [`Pour un manzaraka, on veut installer $${n}$ chaises en rangées`, "chaises"], [`Pour la fête du collège, on range $${n}$ tables en rangées`, "tables"]]);
      return { enonce: `${C[0]} qui ont toutes le même nombre de ${C[1]}, avec au moins $2$ rangées et au moins $2$ ${C[1]} par rangée. Combien de dispositions différentes sont possibles ?`, mode: "nombre", prefixe: "Dispositions :", attendu: D.length,
        erreurs: [{ valeur: D.length + 2, message: `Une seule rangée, ou un seul objet par rangée : c'est interdit par l'énoncé.` }, ...(D.length > 1 ? [{ valeur: Math.ceil(D.length / 2), message: `$${D[0]}$ rangées de $${n / D[0]}$ et $${n / D[0]}$ rangées de $${D[0]}$ sont deux dispositions différentes.` }] : [])],
        aides: [`Le nombre de ${C[1]} par rangée doit être un diviseur de $${n}$.`, `Liste les diviseurs de $${n}$.`, `Retire $1$ et $${n}$.`],
        solution: `Il faut un diviseur de $${n}$ autre que $1$ et $${n}$ : $${D.join("$ ; $")}$. Il y a $${D.length}$ disposition${D.length > 1 ? "s" : ""} (par exemple $${D[0]}$ rangées de $${n / D[0]}$).` };
    }
    if (t === 2) {
      const k = rand(3, 15), lim = rand(50, 200), nbm = Math.floor(lim / k);
      if (lim % k === 0) return GEN["dv5-problemes"]();
      const C = pick([[`Combien y a-t-il de multiples de $${k}$ compris entre $1$ et $${lim}$ ?`, ""], [`Dans un car de $${lim}$ places, les places sont numérotées de $1$ à $${lim}$. Les places dont le numéro est un multiple de $${k}$ sont près d'une fenêtre. Combien y en a-t-il ?`, "places"], [`Un livre a $${lim}$ pages. Une illustration est placée sur chaque page dont le numéro est un multiple de $${k}$. Combien de pages sont illustrées ?`, "pages"]]);
      return { enonce: C[0], mode: "nombre", prefixe: "Nombre :", suffixe: C[1], attendu: nbm,
        erreurs: [{ valeur: nbm + 1, message: `$${k} \\times ${nbm + 1} = ${k * (nbm + 1)}$ dépasse $${lim}$.` }, { valeur: lim - nbm * k, message: "Ça, c'est le reste de la division : on demande le quotient." }],
        aides: [`Les multiples de $${k}$ sont $${k} \\times 1$, $${k} \\times 2$, $${k} \\times 3$, …`, `Cherche le plus grand multiple de $${k}$ qui ne dépasse pas $${lim}$.`, `$${k} \\times ${nbm} = ${k * nbm}$.`],
        solution: `$${k} \\times ${nbm} = ${k * nbm} \\leq ${lim}$ et $${k} \\times ${nbm + 1} = ${k * (nbm + 1)} > ${lim}$ : il y a $${nbm}$ multiples de $${k}$ (c'est le quotient de la division de $${lim}$ par $${k}$).` };
    }
    // partage équitable : k divise-t-il les deux quantités ?
    const k = rand(3, 9), [f1, f2] = shuffle([["mangues", "f"], ["letchis", "m"], ["bananes", "f"], ["ananas", "m"], ["citrons", "m"], ["papayes", "f"]].slice()).slice(0, 2), cas = rand(0, 3);
    const a = k * rand(3, 12) + (cas === 1 || cas === 3 ? rand(1, k - 1) : 0), b = k * rand(3, 12) + (cas === 2 || cas === 3 ? rand(1, k - 1) : 0);
    if (a === b) return GEN["dv5-problemes"]();
    const OPTS = [`Oui : $${k}$ divise $${a}$ et $${b}$`, `Non : $${k}$ ne divise pas $${a}$`, `Non : $${k}$ ne divise pas $${b}$`, `Non : $${k}$ ne divise ni $${a}$ ni $${b}$`];
    return { enonce: `${P0.nom} veut préparer des paniers identiques avec $${a}$ ${f1[0]} et $${b}$ ${f2[0]}, en utilisant tous les fruits. Peut-${P0.il} faire $${k}$ paniers ?`, mode: "choix", choix: OPTS, attendu: cas,
      aides: ["Des paniers identiques : chaque sorte de fruit doit être partagée en parts égales, sans reste.", `Il faut que $${k}$ soit un diviseur de $${a}$ **et** de $${b}$.`, `Effectue les divisions de $${a}$ et de $${b}$ par $${k}$.`],
      solution: `$${a} = ${k} \\times ${Math.floor(a / k)}${a % k ? ` + ${a % k}` : ""}$ et $${b} = ${k} \\times ${Math.floor(b / k)}${b % k ? ` + ${b % k}` : ""}$. ${cas === 0 ? `Les deux divisions tombent juste : ${P0.il} peut faire $${k}$ paniers de $${a / k}$ ${f1[0]} et $${b / k}$ ${f2[0]}.` : `Une division au moins ne tombe pas juste : ${P0.il} ne peut pas faire $${k}$ paniers identiques.`}` };
  };

  /* =====================================================================
     Chapitre 7 : symétries (sc5-) — symétrie centrale, centre de symétrie
     ===================================================================== */
  // Quadrillage 12 × 8 ; points [nom, [x, y], classe], polygones { pts, classe, num }
  function grilleC(o) {
    const u = 24, W = 12 * u + 16, H = 8 * u + 16, X = (x) => 8 + x * u, Y = (y) => 8 + (8 - y) * u;
    let s = `<svg class="graph grille-sym" viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.aria}"><g class="g-grid">`;
    for (let i = 0; i <= 12; i++) s += `<line x1="${X(i)}" y1="${Y(0)}" x2="${X(i)}" y2="${Y(8)}"/>`;
    for (let j = 0; j <= 8; j++) s += `<line x1="${X(0)}" y1="${Y(j)}" x2="${X(12)}" y2="${Y(j)}"/>`;
    s += `</g>`;
    (o.polys || []).forEach((p) => {
      s += `<polygon class="${p.classe || "g-poly"}" points="${p.pts.map(([x, y]) => `${X(x)},${Y(y)}`).join(" ")}"/>`;
      if (p.num) { const g = p.pts.reduce((a, [x, y]) => [a[0] + x / p.pts.length, a[1] + y / p.pts.length], [0, 0]); s += `<text class="g-num-angle" x="${X(g[0])}" y="${Y(g[1]) + 5}" text-anchor="middle">${p.num}</text>`; }
    });
    if (o.axe) { const [[x1, y1], [x2, y2]] = o.axe; s += `<line class="g-axe" x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}"/>`; }
    (o.points || []).forEach(([n, [x, y], cl]) => { s += `<circle class="${cl || "g-point"}" cx="${X(x)}" cy="${Y(y)}" r="3.5"/><text class="g-plabel" x="${X(x) + 6}" y="${Y(y) - 6}">${n}</text>`; });
    if (o.centre) { const [x, y] = o.centre; s += `<path class="g-code" d="M${X(x) - 5} ${Y(y) - 5}L${X(x) + 5} ${Y(y) + 5}M${X(x) - 5} ${Y(y) + 5}L${X(x) + 5} ${Y(y) - 5}"/><text class="g-plabel" x="${X(x) + 6}" y="${Y(y) + 15}">O</text>`; }
    return s + `</svg>`;
  }
  const dansG8 = ([x, y]) => x >= 0 && x <= 12 && y >= 0 && y <= 8;
  const sym = (O) => ([x, y]) => [2 * O[0] - x, 2 * O[1] - y];
  FIGURES["sc5-point"] = () => grilleC({ centre: [6, 4], points: [["A", [3, 6]], ["A'", [9, 2]]], aria: "Quadrillage : A et son symétrique A' par rapport au point O, milieu de [AA']" });
  FIGURES["sc5-figure"] = () => grilleC({ centre: [6, 4], polys: [{ pts: [[2, 5], [5, 5], [5, 7]] }, { pts: [[10, 3], [7, 3], [7, 1]], classe: "g-poly g-poly-image" }], aria: "Quadrillage : un triangle et son image par la symétrie de centre O, retournée d'un demi-tour" });
  // Pliage et demi-tour sur le même quadrillage
  FIGURES["sc5-cours-deux"] = () => grilleC({ axe: [[4, -0.3], [4, 8.3]], centre: [6, 4], polys: [{ pts: [[1, 5], [3, 5], [3, 7.5]] }, { pts: [[7, 5], [5, 5], [5, 7.5]], classe: "g-poly g-poly-image", num: "1" }, { pts: [[11, 3], [9, 3], [9, 0.5]], classe: "g-poly g-poly-image", num: "2" }], aria: "Quadrillage : un triangle, son image 1 par la symétrie d'axe en pointillés (pliage) et son image 2 par la symétrie de centre O (demi-tour)" })
    .replace("</svg>", '<text class="g-label" x="184" y="42">1 : pliage</text><text class="g-label" x="216" y="152" text-anchor="end">2 : demi-tour</text></svg>');
  /* Symétrie centrale sur feuille blanche : points [nom, [x, y]] et leurs images autour de O ; segs : noms reliés (avec les images) ;
     labels : étiquettes de longueur [[P, Q, texte]] (noms, images comprises) */
  function figSymC(O, points, segs, labels, aria, opts) {
    const pts = { O }, im = (p) => [+(2 * O[0] - p[0]).toFixed(1), +(2 * O[1] - p[1]).toFixed(1)];
    points.forEach(([n, p]) => { pts[n] = p; pts[n + "'"] = im(p); });
    const s = [], codes = [];
    segs.forEach(([a, b]) => { s.push([a, b], [a + "'", b + "'"]); });
    const pointilles = points.map(([n]) => [n, n + "'"]);
    points.forEach(([n], i) => { codes.push([n, "O", i + 1], ["O", n + "'", i + 1]); });
    // étiquettes : vers l'extérieur de la figure de départ, et de son image
    const G1 = points.length > 1 ? points.reduce((g, [, p]) => [g[0] + p[0] / points.length, g[1] + p[1] / points.length], [0, 0]) : O, G2 = [2 * O[0] - G1[0], 2 * O[1] - G1[1]];
    const decal = Object.assign(decaler(Object.fromEntries(points.map(([n]) => [n, pts[n]])), G1, 12), decaler(Object.fromEntries(points.map(([n]) => [n + "'", pts[n + "'"]])), points.length > 1 ? G2 : O, 12));
    const o = Object.assign({ W: 320, H: 200, pts, segs: s, codes: (opts && opts.codes === false) ? [] : codes, decal, aria, polys: opts && opts.polys }, opts || {});
    o.decal.O = libreO(O, points.flatMap(([n]) => [pts[n], pts[n + "'"]]));
    return geoAuto(o, labels || []).replace(/<svg[^>]*>/, (m) => m + pointilles.map(([a, b]) => `<line class="g-cache" x1="${pts[a][0]}" y1="${pts[a][1]}" x2="${pts[b][0]}" y2="${pts[b][1]}"/>`).join(""));
  }
  FIGURES["sc5-cours-proprietes"] = () => figSymC([160, 100], [["A", [70, 60]], ["B", [118, 30]], ["C", [124, 84]]], [["A", "B"], ["B", "C"], ["C", "A"]], [["A", "B", "4 cm"], ["A'", "B'", "4 cm"]], "Triangle ABC et son image A'B'C' par la symétrie de centre O : AB = A'B' = 4 cm, et (A'B') est parallèle à (AB)", { codes: false, polys: [[["A", "B", "C"], "g-rect"], [["A'", "B'", "C'"], "g-poly g-poly-image"]] });
  // Lettres « bâton » dans une boîte 4 × 6 (y vers le haut) : liste de lignes brisées
  const LETTRES5 = { S: [[[4, 5], [3, 6], [1, 6], [0, 5], [0, 4], [1, 3], [3, 3], [4, 2], [4, 1], [3, 0], [1, 0], [0, 1]]], N: [[[0, 0], [0, 6], [4, 0], [4, 6]]], Z: [[[0, 6], [4, 6], [0, 0], [4, 0]]], H: [[[0, 0], [0, 6]], [[4, 0], [4, 6]], [[0, 3], [4, 3]]], X: [[[0, 0], [4, 6]], [[0, 6], [4, 0]]], I: [[[2, 0], [2, 6]], [[1, 6], [3, 6]], [[1, 0], [3, 0]]], O: "O", A: [[[0, 0], [2, 6], [4, 0]], [[1, 3], [3, 3]]], T: [[[0, 6], [4, 6]], [[2, 6], [2, 0]]], E: [[[4, 6], [0, 6], [0, 0], [4, 0]], [[0, 3], [3, 3]]], V: [[[0, 6], [2, 0], [4, 6]]], M: [[[0, 0], [0, 6], [2, 3], [4, 6], [4, 0]]], W: [[[0, 6], [1, 0], [2, 4], [3, 0], [4, 6]]], Y: [[[0, 6], [2, 3], [4, 6]], [[2, 3], [2, 0]]], U: [[[0, 6], [0, 1], [1, 0], [3, 0], [4, 1], [4, 6]]], L: [[[0, 6], [0, 0], [4, 0]]], K: [[[0, 0], [0, 6]], [[4, 6], [0, 3], [4, 0]]], C: [[[4, 5], [3, 6], [1, 6], [0, 5], [0, 1], [1, 0], [3, 0], [4, 1]]], F: [[[4, 6], [0, 6], [0, 0]], [[0, 3], [3, 3]]] };
  function lettres(L, centres) {
    const k = 13, w = 320 / L.length;
    let s = `<svg class="graph" viewBox="0 0 320 112" role="img" aria-label="Lettres en majuscules bâton : ${L.join(", ")}">`;
    L.forEach((l, i) => { const ox = w * i + w / 2 - 2 * k, oy = 92, P = ([x, y]) => `${+(ox + x * k).toFixed(1)},${+(oy - y * k).toFixed(1)}`;
      s += LETTRES5[l] === "O" ? `<ellipse class="g-arc-plein" cx="${ox + 2 * k}" cy="${oy - 3 * k}" rx="${2 * k}" ry="${3 * k}" style="stroke-width:5"/>` : LETTRES5[l].map((pl) => `<polyline class="g-curve" points="${pl.map(P).join(" ")}" style="stroke-width:5;stroke:var(--encre)"/>`).join("");
      if (centres) s += `<circle class="g-point" cx="${ox + 2 * k}" cy="${oy - 3 * k}" r="4"/>`; });
    return s + `</svg>`;
  }
  FIGURES["sc5-qcm-lettres"] = () => lettres(["A", "Z", "T", "E"]);
  FIGURES["sc5-cours-centre"] = () => {
    const pts = { A: [30, 150], B: [140, 150], C: [170, 70], D: [60, 70], O: [100, 110] };
    const g = geo5({ W: 320, H: 180, pts, segs: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["A", "C"], ["B", "D"]], codes: [["A", "O", 1], ["O", "C", 1], ["B", "O", 2], ["O", "D", 2]], decal: { A: [-12, 6], B: [6, 8], C: [6, -2], D: [-12, -2], O: [-3, 20] }, aria: "Un parallélogramme ABCD dont le centre de symétrie est O, point d'intersection des diagonales, et la lettre N dont le centre de symétrie est marqué" });
    const N = LETTRES5.N[0].map(([x, y]) => `${230 + x * 14},${150 - y * 14}`).join(" ");
    return g.replace("</svg>", () => `<polyline class="g-curve" points="${N}" style="stroke-width:5;stroke:var(--encre)"/><circle class="g-point" cx="258" cy="108" r="4.5"/><text class="g-label" x="258" y="172" text-anchor="middle">centre</text></svg>`);
  };

  GEN["sc5-point"] = function () {
    for (let e = 0; e < 2000; e++) {
      const O = [rand(4, 8), rand(3, 5)], A = [rand(1, 11), rand(1, 7)];
      if (A[0] === O[0] || A[1] === O[1] || Math.abs(A[0] - O[0]) + Math.abs(A[1] - O[1]) < 4) continue;
      const img = sym(O)(A), cand = [img, [2 * O[0] - A[0], A[1]], [A[0], 2 * O[1] - A[1]], [img[0] + pick([-2, 2]), img[1] + pick([-1, 1])], [O[0] + (O[0] - A[0]) * 2, O[1] + (O[1] - A[1]) * 2]].filter(([x, y]) => x >= 0 && x <= 11 && y >= 0 && y <= 7);
      const uniq = []; cand.forEach((p) => { if (!uniq.some((q) => q[0] === p[0] && q[1] === p[1]) && !(p[0] === A[0] && p[1] === A[1])) uniq.push(p); });
      if (uniq.length < 4 || uniq[0] !== cand[0]) continue;
      const loin = uniq.slice(0, 4); if (loin.some((p, i) => Math.abs(p[0] - O[0]) + Math.abs(p[1] - O[1]) < 2 || loin.some((q, j) => j !== i && Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]) < 2))) continue;
      const pts = shuffle(uniq.slice(0, 4).map((p, i) => ({ p, ok: i === 0 }))), noms = ["B", "C", "D", "E"];
      const bonne = noms[pts.findIndex((x) => x.ok)];
      return { enonce: "Quel point est le symétrique de $A$ par rapport au point $O$ ?", figure: grilleC({ centre: O, points: [["A", A], ...pts.map((x, i) => [noms[i], x.p])], aria: `Quadrillage avec le point O, le point A et quatre points B, C, D, E` }), mode: "choix", choix: noms.map((n) => `$${n}$`), attendu: noms.indexOf(bonne),
        aides: ["Le symétrique de $A$ par rapport à $O$ est le point $A'$ tel que $O$ soit le **milieu** de $[AA']$.", "Compte les carreaux pour aller de $A$ à $O$ (horizontalement et verticalement).", "Recommence le même déplacement à partir de $O$."],
        solution: `De $A$ à $O$ : $${O[0] - A[0] > 0 ? "+" : ""}${O[0] - A[0]}$ carreaux horizontalement et $${O[1] - A[1] > 0 ? "+" : ""}${O[1] - A[1]}$ verticalement. On refait le même déplacement depuis $O$ : on arrive en $${bonne}$, et $O$ est bien le milieu de $[A${bonne}]$.` };
    }
  };

  const FORMES5 = [
    [[0, 0], [3, 0], [3, 2]], [[0, 0], [2, 0], [2, 1], [1, 3]], [[0, 0], [3, 0], [1, 2]], [[0, 0], [1, 0], [1, 2], [3, 2], [3, 3], [0, 3]], [[0, 0], [2, 0], [3, 2], [0, 1]]
  ];
  GEN["sc5-figure"] = function () {
    for (let e = 0; e < 3000; e++) {
      const F = pick(FORMES5), O = [rand(5, 7), 4], d = [rand(0, 3), rand(0, 5)], A = F.map(([x, y]) => [x + d[0], y + d[1]]);
      const v = [rand(5, 8), rand(-3, 3)], c = sym(O);
      const imgs = [A.map(c), A.map(([x, y]) => [2 * O[0] - x, y]), A.map(([x, y]) => [x, 2 * O[1] - y]), A.map(([x, y]) => [x + v[0], y + v[1]])];
      if (![A, ...imgs].every((P) => P.every(dansG8))) continue;
      const bb = (P) => [Math.min(...P.map((p) => p[0])), Math.max(...P.map((p) => p[0])), Math.min(...P.map((p) => p[1])), Math.max(...P.map((p) => p[1]))], B = [A, ...imgs].map(bb);
      if (B.some((b, i) => B.some((c, j) => j > i && b[0] <= c[1] && c[0] <= b[1] && b[2] <= c[3] && c[2] <= b[3]))) continue;
      if (B.some((b) => b[0] <= O[0] && O[0] <= b[1] && b[2] <= O[1] && O[1] <= b[3])) continue;
      const ordre = shuffle([0, 1, 2, 3]), polys = ordre.map((k, i) => ({ pts: imgs[k], classe: "g-poly g-poly-image", num: String(i + 1) }));
      const bonne = ordre.indexOf(0) + 1;
      return { enonce: "La figure de départ est celle sans numéro. Quelle figure numérotée est son image par la symétrie de centre $O$ ?", figure: grilleC({ centre: O, polys: [{ pts: A }, ...polys], aria: "Quadrillage : une figure, le centre O et quatre figures numérotées de 1 à 4" }), mode: "choix", choix: ["$1$", "$2$", "$3$", "$4$"], attendu: bonne - 1,
        aides: ["La symétrie centrale fait faire un **demi-tour** à la figure autour de $O$.", "Prends un sommet de la figure et construis son symétrique : $O$ doit être le milieu du segment.", "Vérifie avec un deuxième sommet. Attention : une figure seulement retournée « en miroir » est une symétrie axiale."],
        solution: `La figure $${bonne}$ est obtenue par un demi-tour autour de $O$ : chaque sommet a son image de l'autre côté de $O$, à la même distance. Les autres figures sont obtenues par des symétries axiales ou par un glissement.` };
    }
  };

  GEN["sc5-proprietes"] = function () {
    const t = rand(0, 5), x = Dc(rand(15, 95), 1), X1 = tD(x), xv = x.m / 10, Ls = shuffle(["A", "B", "C", "D", "E", "F", "M", "N", "P", "R", "S", "T"].slice()), [A, B, C] = Ls, Oc = pick(["O", "O", "I", "K"]), O = [160, 100], cm = (v) => `${nbTexte(v)} cm`;
    const pt = () => [rand(54, 130), rand(26, 90)], fig = Math.random() < 0.65;
    if (t === 0) { const pA = pt();
      return { enonce: `$${A}'$ est le symétrique de $${A}$ par rapport au point $${Oc}$, et $${Oc}${A} = ${X1}$ cm. Combien mesure $${A}${A}'$ ?`, figure: fig ? figSymC(O, [[A, pA]], [], [[A, "O", cm(xv)]], `Le point ${A}, le centre ${Oc} et le symétrique ${A}' de ${A}`).replace(/>O<\/text>/, `>${Oc}</text>`) : undefined, mode: "nombre", prefixe: `$${A}${A}' =$`, suffixe: "cm", attendu: (x.m * 2) / 10,
        erreurs: [{ valeur: xv, message: `$${Oc}$ est le milieu de $[${A}${A}']$ : $${A}${A}'$ est deux fois plus long que $${Oc}${A}$.` }, { valeur: xv / 2, message: `$${Oc}$ est le milieu de $[${A}${A}']$ : $${A}${A}'$ est le **double** de $${Oc}${A}$.` }],
        aides: [`Par la symétrie de centre $${Oc}$, $${Oc}$ est le milieu de $[${A}${A}']$.`, `Donc $${Oc}${A}' = ${Oc}${A}$.`, `$${A}${A}' = ${Oc}${A} + ${Oc}${A}'$.`], solution: `$${Oc}$ est le milieu de $[${A}${A}']$ : $${A}${A}' = 2 \\times ${X1} = ${tD(mulD(x, Dc(2)))}$ cm.` }; }
    if (t === 1) { const pA = pt(), pB = [Math.min(140, Math.max(44, pA[0] + rand(-40, 40))), pA[1] + rand(30, 60)]; // B et B' loin des bords
      return { enonce: `Par la symétrie de centre $${Oc}$, le segment $[${A}${B}]$ a pour image $[${A}'${B}']$. On sait que $${A}${B} = ${X1}$ cm. Combien mesure $${A}'${B}'$ ?`, figure: fig ? figSymC(O, [[A, pA], [B, pB]], [[A, B]], [[A, B, cm(xv)], [`${A}'`, `${B}'`, "?"]], `Le segment [${A}${B}] et son image [${A}'${B}'] par la symétrie de centre ${Oc}`).replace(/>O<\/text>/, `>${Oc}</text>`) : undefined, mode: "nombre", prefixe: `$${A}'${B}' =$`, suffixe: "cm", attendu: xv,
        erreurs: [{ valeur: 2 * xv, message: "La symétrie centrale **conserve** les longueurs : elle ne les double pas." }, { valeur: xv / 2, message: "La symétrie centrale **conserve** les longueurs : l'image a la même longueur." }],
        aides: ["La symétrie centrale conserve les longueurs.", "Le segment image a la même longueur que le segment de départ.", "Aucun calcul n'est nécessaire."], solution: `La symétrie centrale conserve les longueurs : $${A}'${B}' = ${A}${B} = ${X1}$ cm.` }; }
    if (t === 2) { const a = rand(25, 150), pB = [rand(70, 110), rand(40, 70)], d1 = rand(-30, 20) * DEG, d2 = d1 + a * DEG, pA = [+(pB[0] + 70 * Math.cos(d1)).toFixed(1), +(pB[1] - 70 * Math.sin(d1)).toFixed(1)], pC = [+(pB[0] + 60 * Math.cos(d2)).toFixed(1), +(pB[1] - 60 * Math.sin(d2)).toFixed(1)];
      const im = (p) => [2 * O[0] - p[0], 2 * O[1] - p[1]];
      let f = figSymC(O, [[A, pA], [B, pB], [C, pC]], [[B, A], [B, C]], [], `L'angle ${A}${B}${C} et son image ${A}'${B}'${C}' par la symétrie de centre ${Oc}`, { codes: false }).replace(/>O<\/text>/, `>${Oc}</text>`);
      f = f.replace("</svg>", () => arcAngle(pB, pA, pC, 15) + texteAngle(pB, pA, pC, `${a}°`) + arcAngle(im(pB), im(pA), im(pC), 15) + texteAngle(im(pB), im(pA), im(pC), "?") + "</svg>");
      return { enonce: `Par la symétrie de centre $${Oc}$, l'angle $\\widehat{${A}${B}${C}}$ a pour image l'angle $\\widehat{${A}'${B}'${C}'}$, et $\\widehat{${A}${B}${C}} = ${a}^\\circ$. Combien mesure $\\widehat{${A}'${B}'${C}'}$ ?`, figure: fig && pA.concat(pC).every((v) => v > 6 && v < 314) ? f : undefined, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: a,
        erreurs: [{ valeur: 180 - a, message: "Le demi-tour ne change pas les angles : la mesure est conservée." }, { valeur: 2 * a > 360 ? a + 180 : 2 * a, message: "La symétrie centrale **conserve** les angles : ils ne sont pas doublés." }],
        aides: ["La symétrie centrale conserve les angles.", "L'image d'un angle est un angle de même mesure.", "Aucun calcul n'est nécessaire."], solution: `La symétrie centrale conserve les angles : $\\widehat{${A}'${B}'${C}'} = \\widehat{${A}${B}${C}} = ${a}^\\circ$.` }; }
    if (t === 3) { const a = rand(6, 60), b = rand(4, 30), aire = a * b;
      return { enonce: `Un rectangle de $${a}$ cm sur $${b}$ cm a pour image, par une symétrie centrale, un autre rectangle. Quelle est l'aire de ce rectangle image ?`, mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: aire,
        erreurs: [{ valeur: 2 * (a + b), message: "Ça, c'est le périmètre. On demande l'aire." }, { valeur: 2 * aire, message: "La symétrie centrale conserve les aires : l'image n'est pas deux fois plus grande." }],
        aides: ["La symétrie centrale conserve les longueurs, donc aussi les aires.", "Le rectangle image a les mêmes dimensions.", `Aire $= ${a} \\times ${b}$.`], solution: `Les dimensions sont conservées : l'aire de l'image est $${a} \\times ${b} = ${aire}$ cm², comme celle du rectangle de départ.` }; }
    if (t === 4) { const [p, q, r] = [rand(25, 90), rand(25, 90), rand(25, 90)].map((v) => v / 10); if (p >= q + r || q >= p + r || r >= p + q) return GEN["sc5-proprietes"]();
      const per = +(p + q + r).toFixed(1);
      return { enonce: `Par la symétrie de centre $${Oc}$, le triangle $${A}${B}${C}$ a pour image le triangle $${A}'${B}'${C}'$. On sait que $${A}${B} = ${nb(p)}$ cm, $${B}${C} = ${nb(q)}$ cm et $${C}${A} = ${nb(r)}$ cm. Quel est le périmètre du triangle $${A}'${B}'${C}'$ ?`, mode: "nombre", prefixe: "Périmètre :", suffixe: "cm", attendu: per,
        erreurs: [{ valeur: +(2 * per).toFixed(1), message: "La symétrie centrale conserve les longueurs : le périmètre de l'image est le même." }, { valeur: +(p + q).toFixed(1), message: "Il y a trois côtés à additionner." }],
        aides: ["La symétrie centrale conserve les longueurs.", `$${A}'${B}' = ${A}${B}$, $${B}'${C}' = ${B}${C}$ et $${C}'${A}' = ${C}${A}$.`, "Additionne les trois côtés."], solution: `Les longueurs sont conservées : le périmètre de $${A}'${B}'${C}'$ est celui de $${A}${B}${C}$, $${nb(p)} + ${nb(q)} + ${nb(r)} = ${nb(per)}$ cm.` }; }
    const Q = pick([
      [`Par la symétrie de centre $${Oc}$, la droite $(${A}${B})$ a pour image la droite $(${A}'${B}')$. Ces deux droites sont :`, "parallèles", ["perpendiculaires", `sécantes en $${Oc}$`, "toujours confondues"], `L'image d'une droite par une symétrie centrale est une droite parallèle (confondue avec elle si elle passe par $${Oc}$).`],
      [`Les points $${A}$, $${B}$ et $${C}$ sont alignés. Leurs symétriques par rapport à $${Oc}$ sont :`, "alignés", ["les sommets d'un triangle", "confondus", `sur un cercle de centre $${Oc}$`], "La symétrie centrale conserve l'alignement."],
      [`Le symétrique du point $${Oc}$ par la symétrie de centre $${Oc}$ est :`, `le point $${Oc}$ lui-même`, [`un point à $1$ cm de $${Oc}$`, "il n'existe pas", "le milieu d'un segment"], "Le centre est le seul point qui ne bouge pas : il est son propre symétrique."],
      [`$${A}'$ est le symétrique de $${A}$ par rapport à $${Oc}$. Alors :`, `$${Oc}$ est le milieu de $[${A}${A}']$`, [`$${Oc}${A}' = 2 \\times ${Oc}${A}$`, `$(${A}${A}')$ est perpendiculaire à une droite passant par $${Oc}$`, `$${A}$ est le milieu de $[${Oc}${A}']$`], "C'est la définition : le centre est le milieu du segment qui joint un point et son image."],
      [`La symétrie de centre $${Oc}$ transforme une figure par :`, `un demi-tour autour de $${Oc}$`, ["un pliage le long d'une droite", `un quart de tour autour de $${Oc}$`, "un glissement"], `La symétrie centrale fait tourner la figure de $180^\\circ$ autour de $${Oc}$.`],
      [`$${A}'$ est le symétrique de $${A}$ par rapport à $${Oc}$ et $${Oc}${A} = ${X1}$ cm. Alors $${Oc}${A}'$ mesure :`, `$${X1}$ cm`, [`$${tD(mulD(x, Dc(2)))}$ cm`, `$${nb(xv / 2)}$ cm`, "on ne peut pas savoir"], `$${Oc}$ est le milieu de $[${A}${A}']$ : $${Oc}${A}' = ${Oc}${A}$.`],
      [`Par la symétrie de centre $${Oc}$, le cercle de centre $${A}$ et de rayon $${X1}$ cm a pour image :`, `le cercle de centre $${A}'$ et de rayon $${X1}$ cm`, [`le cercle de centre $${A}$ et de rayon $${tD(mulD(x, Dc(2)))}$ cm`, `le cercle de centre $${Oc}$ et de rayon $${X1}$ cm`, `un demi-cercle de centre $${A}'$`], "Le centre du cercle a pour image le centre du cercle image, et le rayon (une longueur) est conservé."],
      [`Par la symétrie de centre $${Oc}$, le segment $[${A}${B}]$ a pour image un segment :`, `de même longueur, parallèle à $[${A}${B}]$`, [`deux fois plus long que $[${A}${B}]$`, `de même longueur, perpendiculaire à $[${A}${B}]$`, `deux fois plus court que $[${A}${B}]$`], "Les longueurs sont conservées et l'image d'une droite est une droite parallèle."]
    ]);
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu, aides: ["La symétrie centrale est un demi-tour autour du centre.", "Elle conserve les longueurs, les angles, les aires et l'alignement.", "L'image d'une droite est une droite parallèle."], solution: `Réponse : ${Q[1]}. ${Q[3]}` };
  };

  GEN["sc5-centre"] = function () {
    const t = rand(0, 2);
    const AVEC = ["un carré", "un rectangle", "un losange", "un parallélogramme", "un cercle", "un segment", "un hexagone régulier"], SANS = ["un triangle équilatéral", "un triangle isocèle", "un trapèze isocèle", "un demi-cercle", "un triangle rectangle", "un pentagone régulier", "un cerf-volant"];
    const LAVEC = ["N", "S", "Z", "H", "O", "X", "I"], LSANS = ["A", "M", "T", "E", "V", "W", "Y", "U", "C", "K", "L", "F"];
    if (t === 0) {
      const ok = pick(AVEC), { choix, attendu } = melange(ok, shuffle(SANS.slice()).slice(0, 3));
      return { enonce: "Laquelle de ces figures possède un centre de symétrie ?", mode: "choix", choix, attendu,
        aides: ["Un point $O$ est un centre de symétrie d'une figure si, après un demi-tour autour de $O$, la figure se superpose à elle-même.", "Imagine la figure tournée « la tête en bas ».", "Les triangles n'ont jamais de centre de symétrie."], solution: `${ok[0].toUpperCase() + ok.slice(1)} possède un centre de symétrie : un demi-tour autour de ce point la laisse inchangée. Les autres figures, retournées, ne se superposent pas à elles-mêmes.` };
    }
    if (t === 1) {
      const ok = pick(LAVEC), { choix, attendu } = melange(`la lettre ${ok}`, shuffle(LSANS.slice()).slice(0, 3).map((l) => `la lettre ${l}`));
      return { enonce: "Écrites en majuscules « bâton » comme sur la figure, laquelle de ces lettres possède un centre de symétrie ?", figure: lettres(choix.map((c) => c.slice(-1))), mode: "choix", choix, attendu,
        aides: ["Fais tourner la lettre d'un demi-tour (la tête en bas) : est-elle inchangée ?", "Attention : avoir un axe de symétrie ne suffit pas.", "Le A, le M, le T ont un axe mais pas de centre."], solution: `La lettre ${ok} retournée d'un demi-tour reste la même : elle a un centre de symétrie.` };
    }
    const q = pick([["un parallélogramme quelconque", "un centre de symétrie mais aucun axe"], ["un rectangle (non carré)", "un centre de symétrie et deux axes"], ["un losange (non carré)", "un centre de symétrie et deux axes"], ["un carré", "un centre de symétrie et quatre axes"], ["un triangle isocèle (non équilatéral)", "un axe de symétrie et aucun centre"], ["un triangle équilatéral", "trois axes de symétrie et aucun centre"], ["la lettre N", "un centre de symétrie mais aucun axe"], ["la lettre H", "un centre de symétrie et deux axes"]]);
    const autres = ["un centre de symétrie mais aucun axe", "un centre de symétrie et deux axes", "un axe de symétrie et aucun centre", "un centre de symétrie et quatre axes", "trois axes de symétrie et aucun centre"].filter((x) => x !== q[1]);
    const { choix, attendu } = melange(q[1], shuffle(autres).slice(0, 3));
    return { enonce: `Que possède ${q[0]} ?`, mode: "choix", choix, attendu,
      aides: ["Axe de symétrie : on plie la figure, les deux moitiés se superposent.", "Centre de symétrie : on fait un demi-tour, la figure se superpose à elle-même.", "Une figure peut avoir l'un, l'autre, les deux ou aucun."], solution: `${q[0][0].toUpperCase() + q[0].slice(1)} possède ${q[1]}.` };
  };

  /* =====================================================================
     Chapitre 8 : nombres relatifs et repérage (nr5-)
     ===================================================================== */
  const rel = (x) => (x < 0 ? `-${nb(-x)}` : nb(x)); // écriture KaTeX d'un relatif
  const relP = (x) => (x < 0 ? `(${rel(x)})` : rel(x));
  // Droite graduée : de a à a + n*pas, points [nom, valeur]
  const txtRel = (v) => String(+v.toFixed(6)).replace(".", ",").replace("-", "−");
  // pas minimal (en graduations) entre deux nombres écrits, et graduation de départ (celle de 0 si elle existe)
  const etiqRel = (a, pas, n) => ({ m: Math.max(1, Math.ceil((Math.max(...Array.from({ length: n + 1 }, (_, i) => txtRel(a + i * pas).length)) * 6.2 + 6) / (284 / n))), i0: Math.abs(a / pas - Math.round(a / pas)) < 1e-9 && a <= 0 && a + n * pas >= 0 ? Math.round(-a / pas) : 0 });
  function droiteRel(a, pas, n, points, aria, mForce) {
    const W = 320, x0 = 18, L = W - 36, X = (v) => +(x0 + ((v - a) / (pas * n)) * L).toFixed(1), y = 52, txt = txtRel;
    // une graduation sur m porte un nombre, pour que les nombres ne se touchent pas ; on compte à partir de 0 (ou du début)
    const E = etiqRel(a, pas, n), m = mForce || E.m, i0 = E.i0;
    let s = `<svg class="graph" viewBox="0 0 ${W} 86" role="img" aria-label="${aria}"><line class="g-segment" x1="${x0 - 8}" y1="${y}" x2="${W - 8}" y2="${y}"/><path class="g-end" d="M${W - 4} ${y}l-9 -4.5v9z"/><g class="g-tick">`;
    for (let i = 0; i <= n; i++) { const v = +(a + i * pas).toFixed(6), lab = (i - i0) % m === 0;
      s += `<line class="g-graduation" x1="${X(v)}" y1="${y - (lab ? 7 : 4)}" x2="${X(v)}" y2="${y + (lab ? 7 : 4)}"/>`;
      if (lab) s += `<text x="${X(v)}" y="${y + 22}" text-anchor="middle">${txt(v)}</text>`; }
    s += `</g>`;
    points.forEach(([nm, v]) => { s += `<circle class="g-point" cx="${X(v)}" cy="${y}" r="4"/><text class="g-plabel" x="${X(v)}" y="${y - 14}" text-anchor="middle">${nm}</text>`; });
    return s + `</svg>`;
  }
  // Repère orthogonal de -5 à 5 en abscisse, de -3 à 3 en ordonnée
  function repere(points, aria) {
    const u = 28, W = 320, H = 6 * u + 40, ox = 160, oy = H / 2, X = (x) => ox + x * u, Y = (y) => oy - y * u;
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="${aria}"><g class="g-grid">`;
    for (let i = -5; i <= 5; i++) s += `<line x1="${X(i)}" y1="${Y(-3.4)}" x2="${X(i)}" y2="${Y(3.4)}"/>`;
    for (let j = -3; j <= 3; j++) s += `<line x1="${X(-5.4)}" y1="${Y(j)}" x2="${X(5.4)}" y2="${Y(j)}"/>`;
    s += `</g><g class="g-axis"><line x1="${X(-5.5)}" y1="${oy}" x2="${X(5.5)}" y2="${oy}"/><line x1="${ox}" y1="${Y(-3.5)}" x2="${ox}" y2="${Y(3.5)}"/></g>`;
    s += `<g class="g-tick"><text x="${ox - 9}" y="${oy + 13}">0</text><text x="${X(1) - 3}" y="${oy + 13}">1</text><text x="${ox - 10}" y="${Y(1) + 4}">1</text></g>`;
    points.forEach(([n, [x, y]]) => { s += `<circle class="g-point" cx="${X(x)}" cy="${Y(y)}" r="4"/><text class="g-plabel" x="${X(x) + 6}" y="${Y(y) - 6}">${n}</text>`; });
    return s + `</svg>`;
  }
  const coord = ([x, y]) => `$(${rel(x)} \\, ; \\, ${rel(y)})$`;
  FIGURES["nr5-droite"] = () => droiteRel(-5, 1, 10, [["A", -3], ["B", 2], ["C", -1]], "Droite graduée de −5 à 5 : A d'abscisse −3, B d'abscisse 2, C d'abscisse −1");
  FIGURES["nr5-repere"] = () => repere([["A", [3, 2]], ["B", [-4, 1]], ["C", [-2, -3]], ["D", [2, -1]]], "Repère : A(3 ; 2), B(−4 ; 1), C(−2 ; −3), D(2 ; −1)");

  /* Échelle verticale (thermomètre, altitudes) de vmin à vmax, graduée tous les « pas », nombres tous les « lab » ;
     marques [[valeur, texte]] (les textes trop proches sont écartés) */
  function echelleV(vmin, vmax, pas, lab, marques, unite, aria) {
    const x = 112, y0 = 192, y1 = 24, Y = (v) => +(y0 - ((v - vmin) / (vmax - vmin)) * (y0 - y1)).toFixed(1);
    let s = `<svg class="graph" viewBox="0 0 320 206" role="img" aria-label="${aria}"><g class="g-axis"><line x1="${x}" y1="${y0 + 4}" x2="${x}" y2="${y1 - 4}"/><path d="M${x} ${y1 - 12} l-5 9 h10z"/></g><g class="g-tick">`;
    for (let i = 0; vmin + i * pas <= vmax + 1e-9; i++) { const v = +(vmin + i * pas).toFixed(6), big = Math.abs(v / lab - Math.round(v / lab)) < 1e-9; s += `<line class="g-graduation" x1="${x - (big ? 7 : 4)}" y1="${Y(v)}" x2="${x + (big ? 7 : 4)}" y2="${Y(v)}"/>`; if (big) s += `<text x="${x - 11}" y="${Y(v) + 3.5}" text-anchor="end">${txtRel(v)}</text>`; }
    s += `</g>`;
    if (vmin < 0 && vmax > 0) s += `<line class="g-guide" x1="${x}" y1="${Y(0)}" x2="306" y2="${Y(0)}"/>`;
    const M = marques.map(([v, t]) => ({ v, t, y: Y(v) })).sort((p, q) => q.y - p.y);
    M.forEach((p, i) => { p.ty = i && p.y > M[i - 1].ty - 15 ? M[i - 1].ty - 15 : p.y; });
    M.forEach((p) => { s += `<circle class="g-point" cx="${x}" cy="${p.y}" r="4.5"/><polyline class="g-guide" points="${x + 6},${p.y} ${x + 16},${p.ty} ${x + 22},${p.ty}"/><text class="g-label" x="${x + 26}" y="${p.ty + 4}">${p.t}</text>`; });
    s += `<text class="g-label" x="${x - 8}" y="12" text-anchor="end">${unite}</text>`;
    return s + `</svg>`;
  }
  FIGURES["nr5-cours-thermo"] = () => echelleV(-30, 40, 5, 10, [[28, "Mamoudzou : 28 °C"], [-18, "congélateur : −18 °C"], [0, "0 °C : l'eau gèle"]], "°C", "Thermomètre gradué de −30 à 40 °C : 28 °C à Mamoudzou, 0 °C, et −18 °C dans un congélateur");
  FIGURES["nr5-cours-oppose"] = () => droiteRel(-6, 1, 12, [["A", -5], ["B", 5]], "Droite graduée de −6 à 6 : A d'abscisse −5 et B d'abscisse 5 sont à la même distance de 0, de part et d'autre").replace("</svg>", '<text class="g-mesure" x="160" y="16" text-anchor="middle">même distance à 0</text><path class="g-guide" d="M42 26 H278" style="stroke-dasharray:2 3"/></svg>');
  FIGURES["nr5-cours-comparer"] = () => droiteRel(-8, 1, 11, [["", -7], [" ", -2], ["  ", 1]], "Droite graduée de −8 à 3 avec les points −7, −2 et 1 : du plus petit (à gauche) au plus grand (à droite)").replace("</svg>", '<text class="g-label" x="20" y="16">plus petit</text><text class="g-label" x="300" y="16" text-anchor="end">plus grand</text><path class="g-curve" d="M86 12 H232" style="stroke-width:1.6"/><path class="g-end" d="M238 12 l-8 -4 v8z"/></svg>');
  FIGURES["nr5-qcm-thermo"] = () => echelleV(-20, 20, 2, 10, [[-6, "?"]], "°C", "Thermomètre gradué de 2 en 2, de −20 à 20 °C ; la température est marquée d'un point d'interrogation");
  FIGURES["nr5-qcm-droite"] = () => droiteRel(-4, 0.5, 12, [["M", -2.5]], "Droite graduée de −4 à 2 avec un pas de 0,5 ; le point M", 4);
  FIGURES["nr5-qcm-repere"] = () => repere([["E", [-3, -2]], ["F", [2, 3]], ["G", [-1, 2]]], "Repère avec trois points E, F et G");
  FIGURES["nr5-methode-droite"] = () => droiteRel(-3, 0.5, 12, [["M", -2]], "Droite graduée de −3 à 3, chaque graduation vaut 0,5 ; le point M est 4 graduations à gauche de 0", 2);
  GEN["nr5-vocab"] = function () {
    const t = rand(0, 3), x = pick([rand(1, 99), rand(11, 99) / 10]) * (Math.random() < 0.5 ? -1 : 1), fig = Number.isInteger(x) && Math.abs(x) <= 10 && Math.random() < 0.6;
    if (t === 0) return { enonce: fig ? `Sur la droite graduée, le point $A$ a pour abscisse $${rel(x)}$. Quel est l'opposé de $${rel(x)}$ ?` : `Quel est l'opposé de $${rel(x)}$ ?`, figure: fig ? droiteRel(-10, 1, 20, [["A", x]], `Droite graduée de −10 à 10 ; le point A d'abscisse ${txtRel(x)}`) : undefined, mode: "nombre", prefixe: "Opposé :", attendu: -x,
      erreurs: [{ valeur: x, message: "L'opposé a le même nombre sans signe, mais le signe contraire." }, ...(x !== 0 ? [{ valeur: 0, message: "L'opposé n'est pas $0$ : c'est le nombre symétrique par rapport à $0$ sur la droite graduée." }] : [])],
      aides: ["Deux nombres opposés sont à la même distance de zéro, de part et d'autre.", "On change seulement le signe.", x < 0 ? "L'opposé d'un nombre négatif est positif." : "L'opposé d'un nombre positif est négatif."], solution: `L'opposé de $${rel(x)}$ est $${rel(-x)}$ : ils sont à la même distance de $0$, de part et d'autre.` };
    if (t === 1) return { enonce: fig ? `Sur la droite graduée, le point $A$ a pour abscisse $${rel(x)}$. Quelle est la distance à zéro de $${rel(x)}$ ?` : `Quelle est la distance à zéro (la valeur absolue) de $${rel(x)}$ ?`, figure: fig ? droiteRel(-10, 1, 20, [["A", x]], `Droite graduée de −10 à 10 ; le point A d'abscisse ${txtRel(x)}`) : undefined, mode: "nombre", prefixe: "Distance à zéro :", attendu: Math.abs(x),
      erreurs: x < 0 ? [{ valeur: x, message: "Une distance est toujours positive." }] : [{ valeur: -x, message: "Une distance est toujours positive : la distance à zéro d'un nombre positif est ce nombre lui-même." }],
      aides: ["La distance à zéro d'un nombre, c'est le nombre sans son signe.", "Sur une droite graduée, c'est l'écart entre le point et l'origine.", "Une distance n'est jamais négative."], solution: `La distance à zéro de $${rel(x)}$ est $${nb(Math.abs(x))}$.` };
    if (t === 2) {
      const sorte = pick([["strictement négatif", (v) => v < 0], ["strictement positif", (v) => v > 0], ["positif", (v) => v >= 0], ["négatif", (v) => v <= 0]]);
      let bons, faux; for (;;) { const L = shuffle([0, rand(1, 9), -rand(1, 9), rand(11, 99) / 10, -rand(11, 99) / 10, rand(10, 50), -rand(10, 50)]); bons = L.filter(sorte[1]); faux = L.filter((v) => !sorte[1](v)); if (bons.length >= 1 && faux.length >= 3) break; }
      const bon = bons.includes(0) && (sorte[0] === "positif" || sorte[0] === "négatif") && Math.random() < 0.6 ? 0 : bons[0];
      const { choix, attendu } = melange(`$${rel(bon)}$`, faux.slice(0, 3).map((v) => `$${rel(v)}$`));
      return { enonce: `Lequel de ces nombres est ${sorte[0]} ?`, mode: "choix", choix, attendu,
        aides: ["Un nombre négatif s'écrit avec le signe $-$ ; un nombre positif, sans signe (ou avec $+$).", "$0$ est à la fois positif et négatif ; il n'est ni strictement positif ni strictement négatif.", "« Strictement » exclut $0$."], solution: `$${rel(bon)}$ est ${sorte[0]}.${bon === 0 ? " En effet, $0$ est à la fois positif et négatif." : ""}` };
    }
    const P0 = prenom(), p = rand(5, 40), T1 = rand(24, 33), T2 = rand(12, 26), S = rand(10, 80), D = S + rand(5, 60), E = rand(0, 4), F = E + rand(1, 3), an = rand(2, 50) * 10;
    const c = pick([
      [`Le mont Bénara culmine à $660$ m d'altitude et une plongeuse descend à $${p}$ m sous le niveau de la mer, dans le lagon. Quel nombre relatif donne l'altitude de la plongeuse, en mètres ?`, -p, "Sous le niveau de la mer, l'altitude est négative.", p <= 40 ? echelleV(-40, 20, 5, 10, [[0, "niveau de la mer"], [-p, "plongeuse"]], "m", `Échelle des altitudes de −40 m à 20 m : le niveau de la mer est à 0, la plongeuse en dessous`) : undefined],
      [`À ${pick(LIEUX5)}, il fait $${T1}$ °C. Dans un congélateur, il fait $${T2}$ °C en dessous de zéro. Quel nombre relatif donne la température du congélateur, en °C ?`, -T2, "En dessous de zéro, la température est négative.", echelleV(-30, 40, 5, 10, [[T1, "dehors"], [-T2, "congélateur"]], "°C", "Thermomètre gradué de −30 à 40 °C : la température dehors et celle du congélateur")],
      [`Le compte ${deN(P0.nom)} a un solde de $${S}$ €. ${P0.Il} paie $${D}$ € par carte. Quel nombre relatif donne le nouveau solde, en euros ?`, S - D, "Quand on dépense plus que ce qu'on a, le solde devient négatif."],
      [`Un ascenseur part de l'étage $${E}$ et descend de $${F}$ étages, jusqu'au parking. À quel étage relatif arrive-t-il ? (Le rez-de-chaussée est l'étage $0$.)`, E - F, "En dessous du rez-de-chaussée, les étages sont négatifs."],
      [`Une tortue verte plonge à $${p}$ m sous la surface du lagon, près de la plage de N'Gouja. Quel nombre relatif donne son altitude, en mètres ?`, -p, "Sous le niveau de la mer, l'altitude est négative.", echelleV(-40, 20, 5, 10, [[0, "surface du lagon"], [-p, "tortue"]], "m", "Échelle des altitudes de −40 m à 20 m : la surface du lagon est à 0, la tortue en dessous")],
      [`Un objet ancien date de l'an $${an}$ avant notre ère. Quel nombre relatif représente cette année, si l'an $0$ marque le début de notre ère ?`, -an, "Avant le début de notre ère, les années sont négatives."]
    ]);
    const err = [{ valeur: -c[1], message: c[2] }];
    if (c[1] === S - D) err.push({ valeur: S + D, message: "Un paiement fait **baisser** le solde : on soustrait." });
    if (c[1] === E - F) err.push({ valeur: E + F, message: "L'ascenseur **descend** : on soustrait le nombre d'étages." });
    return { enonce: c[0], figure: Math.random() < 0.6 ? c[3] : undefined, mode: "nombre", prefixe: "Nombre :", attendu: c[1], erreurs: err,
      aides: ["Choisis une origine (le zéro) : niveau de la mer, $0$ °C, début de notre ère, rez-de-chaussée, solde nul.", "Au-dessus de l'origine : positif. En dessous : négatif.", c[2]], solution: `${c[2]} La réponse est $${rel(c[1])}$.` };
  };

  GEN["nr5-abscisse"] = function () {
    const conf = pick([[1, 1, 10], [1, 1, 12], [0.5, 2, 10], [0.1, 10, 10], [2, 1, 10], [5, 1, 10], [0.2, 5, 10], [0.25, 4, 8]]), [pas, , n] = conf;
    const a = +(-pas * rand(2, n - 2)).toFixed(6);
    const k = rand(0, n), v = +(a + k * pas).toFixed(6);
    if (Math.abs(v) < 1e-9 || k === 0 || k === n) return GEN["nr5-abscisse"]();
    const lire = Math.random() < 0.6;
    // le point M ne doit pas tomber sur une graduation numérotée (sinon il suffirait de lire le nombre)
    const E = etiqRel(a, pas, n); let mL = E.m; while (mL < n && (k - E.i0) % mL === 0) mL++;
    if (lire && ((k - E.i0) % mL === 0 || Array.from({ length: n + 1 }, (_, i) => (i - E.i0) % mL === 0).filter(Boolean).length < 2)) return GEN["nr5-abscisse"]();
    if (lire) return { enonce: "Quelle est l'abscisse du point $M$ ?", figure: droiteRel(a, pas, n, [["M", v]], `Droite graduée de ${txtRel(a)} à ${txtRel(a + n * pas)} ; le point M est sur une graduation`, mL), mode: "nombre", prefixe: "Abscisse :", attendu: v,
      erreurs: [{ valeur: -v, message: "Attention au signe : à gauche de zéro, les abscisses sont négatives." }, { valeur: +(v + (v < 0 ? pas : -pas)).toFixed(6), message: "Compte bien les graduations entre $0$ et le point $M$ : il y en a une de trop ou une de moins." }],
      aides: ["Repère l'origine (le $0$) et le sens : les nombres augmentent vers la droite.", `Chaque graduation vaut $${nb(pas)}$.`, `Compte les graduations entre $0$ et $M$.`], solution: `$M$ est à $${Math.round(Math.abs(v) / pas)}$ graduations ${v < 0 ? "à gauche" : "à droite"} de $0$, chacune valant $${nb(pas)}$ : son abscisse est $${rel(v)}$.` };
    const noms = ["A", "B", "C", "D"], vals = new Set([v]); while (vals.size < 4) { const kk = rand(1, n - 1), w = +(a + kk * pas).toFixed(6); vals.add(w); }
    const V = shuffle([...vals]), bon = noms[V.indexOf(v)];
    return { enonce: `Quel point a pour abscisse $${rel(v)}$ ?`, figure: droiteRel(a, pas, n, V.map((w, i) => [noms[i], w]), "Droite graduée avec quatre points A, B, C, D"), mode: "choix", choix: noms.map((m) => `$${m}$`), attendu: noms.indexOf(bon),
      aides: ["Repère le $0$ sur la droite.", `Chaque graduation vaut $${nb(pas)}$.`, v < 0 ? "Un nombre négatif est à gauche de $0$." : "Un nombre positif est à droite de $0$."], solution: `$${rel(v)}$ est à $${Math.round(Math.abs(v) / pas)}$ graduations ${v < 0 ? "à gauche" : "à droite"} de $0$ : c'est le point $${bon}$.` };
  };

  GEN["nr5-comparer"] = function () {
    const t = rand(0, 4);
    if (t === 4) {
      // comparer en situation : profondeurs ou températures
      const C = pick([
        [["une plongeuse", "une tortue"], "m", "Laquelle est la plus profonde ?", true, () => -rand(3, 40)],
        [["un poulpe", "un plongeur"], "m", "Lequel est le plus profond ?", true, () => -rand(2, 30)],
        [["à Paris", "à Moscou"], "°C", "Où fait-il le plus froid ?", true, () => rand(-15, 12)],
        [["dans le congélateur A", "dans le congélateur B"], "°C", "Où fait-il le plus froid ?", true, () => -rand(10, 26)]
      ]);
      let u = C[4](), v = C[4](); if (u === v) return GEN["nr5-comparer"]();
      const [n1, n2] = C[0], plusBas = u < v ? n1 : n2, cap = (s) => s[0].toUpperCase() + s.slice(1);
      const phrase = C[1] === "m" ? `${cap(n1)} est à l'altitude $${rel(u)}$ m et ${n2} à l'altitude $${rel(v)}$ m.` : `Il fait $${rel(u)}$ °C ${n1} et $${rel(v)}$ °C ${n2}.`;
      const { choix, attendu } = melange(cap(plusBas), [cap(plusBas === n1 ? n2 : n1), "C'est pareil pour les deux", "On ne peut pas savoir"]);
      return { enonce: `${phrase} ${C[2]}`, mode: "choix", choix, attendu,
        aides: ["Le plus profond (ou le plus froid) correspond au plus **petit** nombre.", "Deux nombres négatifs : le plus petit est celui qui a la plus grande distance à zéro.", "Imagine les deux nombres sur une droite graduée verticale."],
        solution: `$${rel(Math.min(u, v))} < ${rel(Math.max(u, v))}$ : la réponse est « ${cap(plusBas)} ».` };
    }
    if (t <= 2) {
      const g = () => (Math.random() < 0.5 ? rand(1, 30) : rand(1, 99) / 10) * (Math.random() < 0.65 ? -1 : 1);
      let a = g(), b = g(); if (t === 1) b = -a; if (t === 2) b = +(a + pick([-1, 1]) * pick([0.1, 1, 0.5])).toFixed(1);
      if (a === b) return GEN["nr5-comparer"]();
      const rep = a < b ? 0 : 1;
      return { enonce: `Compare : $${rel(a)} \\; \\ldots \\; ${rel(b)}$`, mode: "choix", choix: ["$<$", "$>$", "$=$"], attendu: rep,
        aides: ["Un nombre négatif est toujours plus petit qu'un nombre positif.", "Deux nombres négatifs : le plus petit est celui qui a la plus grande distance à zéro.", "Imagine les deux nombres sur une droite graduée : le plus petit est à gauche."],
        solution: a < 0 && b < 0 ? `Les deux nombres sont négatifs ; $${rel(a < b ? a : b)}$ est plus loin de zéro, donc plus petit : $${rel(a)} ${rep ? ">" : "<"} ${rel(b)}$.` : `$${rel(a)} ${rep ? ">" : "<"} ${rel(b)}$ : ${(a < 0) !== (b < 0) ? "un nombre négatif est plus petit qu'un nombre positif" : "sur une droite graduée, le plus petit est à gauche"}.` };
    }
    const L = []; while (L.length < 4) { const v = (Math.random() < 0.5 ? rand(1, 20) : rand(1, 99) / 10) * (Math.random() < 0.6 ? -1 : 1); if (!L.includes(v)) L.push(v); }
    const tri = L.slice().sort((p, q) => p - q), txt = (A) => "$" + A.map(rel).join(" < ") + "$";
    const fausses = [txt(L.slice().sort((p, q) => Math.abs(p) - Math.abs(q))), txt(tri.slice().reverse()), txt([tri[1], tri[0], tri[2], tri[3]]), txt([tri[0], tri[1], tri[3], tri[2]])].filter((x) => x !== txt(tri));
    const { choix, attendu } = melange(txt(tri), fausses);
    return { enonce: `Range dans l'ordre croissant : $${L.map(rel).join("$ ; $")}$`, mode: "choix", choix, attendu,
      aides: ["Ordre croissant : du plus petit au plus grand.", "Commence par les négatifs : le plus éloigné de zéro est le plus petit.", "Puis les positifs, du plus petit au plus grand."], solution: `Dans l'ordre croissant : ${txt(tri)}.` };
  };

  GEN["nr5-repere"] = function () {
    const t = rand(0, 1), P = []; while (P.length < 4) { const p = [rand(-5, 5), rand(-3, 3)]; if (p[0] !== 0 && p[1] !== 0 && !P.some((q) => q[0] === p[0] && q[1] === p[1]) && !P.some((q) => q[0] === p[1] && q[1] === p[0])) P.push(p); }
    const noms = ["A", "B", "C", "D"], i = rand(0, 3), p = P[i];
    if (t === 0) {
      const { choix, attendu } = melange(coord(p), [coord([p[1], p[0]]), coord([-p[0], p[1]]), coord([p[0], -p[1]]), coord([-p[0], -p[1]])].filter((c) => c !== coord(p)));
      return { enonce: `Quelles sont les coordonnées du point $${noms[i]}$ ?`, figure: repere(P.map((q, k) => [noms[k], q]), "Repère avec quatre points A, B, C, D"), mode: "choix", choix, attendu,
        aides: ["Les coordonnées s'écrivent (abscisse ; ordonnée).", "L'abscisse se lit sur l'axe horizontal, l'ordonnée sur l'axe vertical.", "À gauche de l'axe vertical, l'abscisse est négative ; en dessous de l'axe horizontal, l'ordonnée est négative."],
        solution: `$${noms[i]}$ est à $${Math.abs(p[0])}$ ${p[0] < 0 ? "à gauche" : "à droite"} de l'origine et $${Math.abs(p[1])}$ ${p[1] < 0 ? "en dessous" : "au-dessus"} : ses coordonnées sont ${coord(p)}.` };
    }
    return { enonce: `Quel point a pour coordonnées ${coord(p)} ?`, figure: repere(P.map((q, k) => [noms[k], q]), "Repère avec quatre points A, B, C, D"), mode: "choix", choix: noms.map((m) => `$${m}$`), attendu: i,
      aides: ["Le premier nombre est l'abscisse (horizontal), le second l'ordonnée (vertical).", `Pars de l'origine et déplace-toi de $${Math.abs(p[0])}$ ${p[0] < 0 ? "vers la gauche" : "vers la droite"}.`, `Puis de $${Math.abs(p[1])}$ ${p[1] < 0 ? "vers le bas" : "vers le haut"}.`],
      solution: `Abscisse $${rel(p[0])}$, ordonnée $${rel(p[1])}$ : c'est le point $${noms[i]}$.` };
  };

  /* =====================================================================
     Chapitre 9 : additionner et soustraire des relatifs (cr5-)
     ===================================================================== */
  const r1 = (x) => Math.round(x * 100) / 100;
  const sgn = (x) => (x < 0 ? `(${rel(x)})` : Math.random() < 0.5 ? `(+${nb(x)})` : nb(x));
  const tireRel = (dec) => (dec ? rand(1, 99) / 10 : rand(1, 20)) * (Math.random() < 0.55 ? -1 : 1);

  /* Droite graduée de lo à hi (pas 1) avec des sauts : on part de « depart » (point plein), chaque saut [valeur] est une flèche
     courbe au-dessus de la droite ; fin = texte écrit à l'arrivée (« ? » ou la valeur) */
  function sautsDroite(lo, hi, depart, sauts, aria) {
    const X = (v) => +(18 + ((v - lo) / (hi - lo)) * 284).toFixed(1), yb = 48;
    let v = depart, add = `<circle class="g-point" cx="${X(depart)}" cy="52" r="4.5"/>`;
    sauts.forEach((d, i) => { const x1 = X(v), x2 = X(v + d), h = Math.min(30, 8 + Math.abs(x2 - x1) / 5), mid = +((x1 + x2) / 2).toFixed(1), cl = i % 2 ? " g-curve-1" : "";
      add += `<path class="g-curve${cl}" d="M${x1} ${yb} Q${mid} ${yb - 2 * h} ${x2} ${yb}" style="stroke-width:2"/><path class="g-end${cl}" d="M${x2} ${yb + 1} l-4.5 -8 h9z"/><text class="g-mesure" x="${mid}" y="${+(yb - h - 5).toFixed(1)}" text-anchor="middle">${d > 0 ? "+" : "−"}${Math.abs(d)}</text>`; v += d; });
    add += `<circle cx="${X(v)}" cy="52" r="4.5" style="fill:var(--surface);stroke:var(--ylang);stroke-width:2"/>`;
    return droiteRel(lo, 1, hi - lo, [], aria).replace("</svg>", () => add + "</svg>");
  }
  FIGURES["cr5-cours-addition"] = () => sautsDroite(-10, 2, 0, [-9, 5], "Droite graduée de −10 à 2 : on part de 0, on recule de 9 jusqu'à −9, puis on avance de 5 : on arrive à −4. Donc (−9) + (+5) = −4");
  FIGURES["cr5-cours-ecart"] = () => echelleV(-10, 10, 1, 2, [[4, "après-midi : 4 °C"], [-6, "matin : −6 °C"]], "°C", "Thermomètre de −10 à 10 °C : de −6 °C à 4 °C, la température monte de 10 °C").replace("</svg>", () => { const Y = (v) => +(192 - ((v + 10) / 20) * 168).toFixed(1); return `<path class="g-accolade" d="M78 ${Y(4)} H72 V${Y(-6)} H78"/><text class="g-mesure" x="66" y="${(Y(4) + Y(-6)) / 2 + 4}" text-anchor="end">10 °C</text></svg>`; });
  FIGURES["cr5-methode-soustraction"] = () => sautsDroite(-4, 6, -3, [8], "Droite graduée de −4 à 6 : (−3) − (−8) = (−3) + 8, on part de −3 et on avance de 8 : on arrive à 5");
  FIGURES["cr5-methode-ecart"] = () => echelleV(-10, 0, 1, 1, [[-3, "−3 °C"], [-8, "−8 °C"]], "°C", "Thermomètre de −10 à 0 °C : de −8 °C à −3 °C, il y a 5 °C").replace("</svg>", () => { const Y = (v) => +(192 - ((v + 10) / 10) * 168).toFixed(1); return `<path class="g-accolade" d="M78 ${Y(-3)} H72 V${Y(-8)} H78"/><text class="g-mesure" x="66" y="${(Y(-3) + Y(-8)) / 2 + 4}" text-anchor="end">5 °C</text></svg>`; });
  FIGURES["cr5-qcm-sauts"] = () => sautsDroite(-4, 5, -3, [7], "Droite graduée de −4 à 5 : on part de −3 et on fait un saut de +7");
  FIGURES["cr5-qcm-thermo"] = () => echelleV(-10, 15, 1, 5, [[9, "après-midi"], [-5, "matin"]], "°C", "Thermomètre de −10 à 15 °C : −5 °C le matin, 9 °C l'après-midi");
  FIGURES["cr5-cours-signes"] = () => {
    const C = [["+(+a)", "+a", "g-rect"], ["−(−a)", "+a", "g-rect"], ["+(−a)", "−a", "g-poly g-poly-image"], ["−(+a)", "−a", "g-poly g-poly-image"]];
    let s = `<svg class="graph" viewBox="0 0 320 122" role="img" aria-label="Règle des signes : plus plus a et moins moins a donnent plus a (signes identiques) ; plus moins a et moins plus a donnent moins a (signes contraires)">`;
    C.forEach(([g, d, cl], i) => { const x = 10 + (i % 2) * 152, y = 8 + Math.floor(i / 2) * 58; s += `<rect class="${cl}" x="${x}" y="${y}" width="146" height="50" rx="8"/><text class="g-label" x="${x + 73}" y="${y + 31}" text-anchor="middle" style="font-size:16px">${g}  =  ${d}</text>`; });
    return s + `</svg>`;
  };
  GEN["cr5-addition"] = function () {
    const dec = Math.random() < 0.3, a = tireRel(dec), b = tireRel(dec), s = r1(a + b);
    const memeSigne = (a < 0) === (b < 0), fig = !dec && Math.random() < 0.35 && Math.max(Math.abs(a), Math.abs(s), Math.abs(a + b)) <= 12 && Math.abs(b) >= 2;
    const lo = Math.min(0, a, s) - 1, hi = Math.max(0, a, s) + 1;
    return { enonce: fig ? `Calcule : $${sgn(a)} + ${sgn(b)}$ (sur la droite graduée, on part de $${rel(a)}$ et on fait le saut de $${rel(b)}$).` : `Calcule : $${sgn(a)} + ${sgn(b)}$`, figure: fig ? sautsDroite(lo, hi, a, [b], `Droite graduée : on part de ${txtRel(a)} et on fait un saut de ${txtRel(b)} ; le point d'arrivée est cherché`) : undefined, mode: "nombre", prefixe: "Résultat :", attendu: s,
      erreurs: [{ valeur: r1(-s), message: "Le résultat a le signe du nombre qui a la plus grande distance à zéro." }, ...(memeSigne ? [] : [{ valeur: r1(Math.abs(a) + Math.abs(b)) * (Math.abs(a) > Math.abs(b) ? Math.sign(a) : Math.sign(b)), message: "Les deux nombres sont de signes contraires : on soustrait les distances à zéro." }])],
      aides: ["Même signe : on additionne les distances à zéro et on garde le signe.", "Signes contraires : on soustrait les distances à zéro et on prend le signe de celui qui a la plus grande distance à zéro.", memeSigne ? `$${nb(Math.abs(a))} + ${nb(Math.abs(b))} = ${nb(r1(Math.abs(a) + Math.abs(b)))}$.` : `$${nb(Math.max(Math.abs(a), Math.abs(b)))} - ${nb(Math.min(Math.abs(a), Math.abs(b)))} = ${nb(r1(Math.abs(Math.abs(a) - Math.abs(b))))}$.`],
      solution: memeSigne ? `Même signe : $${nb(Math.abs(a))} + ${nb(Math.abs(b))} = ${nb(Math.abs(s))}$, avec le signe ${a < 0 ? "$-$" : "$+$"}. Résultat : $${rel(s)}$.` : `Signes contraires : $${nb(Math.max(Math.abs(a), Math.abs(b)))} - ${nb(Math.min(Math.abs(a), Math.abs(b)))} = ${nb(Math.abs(s))}$, avec le signe du nombre le plus éloigné de zéro. Résultat : $${rel(s)}$.` };
  };

  GEN["cr5-soustraction"] = function () {
    const dec = Math.random() < 0.3, a = tireRel(dec), b = tireRel(dec), d = r1(a - b);
    return { enonce: `Calcule : $${sgn(a)} - ${sgn(b)}$`, mode: "nombre", prefixe: "Résultat :", attendu: d,
      erreurs: [{ valeur: r1(a + b), message: "Soustraire un nombre, c'est **ajouter son opposé** : il faut changer le signe du deuxième nombre." }, { valeur: r1(-d), message: "Attention au signe du résultat." }],
      aides: ["Soustraire un nombre revient à ajouter son opposé.", `$${sgn(a)} - ${sgn(b)} = ${sgn(a)} + ${relP(-b)}$.`, "Puis applique la règle de l'addition."],
      solution: `$${sgn(a)} - ${sgn(b)} = ${sgn(a)} + ${relP(-b)} = ${rel(d)}$.` };
  };

  GEN["cr5-simplifier"] = function () {
    const n = rand(3, 4), T = Array.from({ length: n }, () => tireRel(false)), ops = Array.from({ length: n - 1 }, () => pick(["+", "-"]));
    const expr = rel(T[0]) + ops.map((o, i) => ` ${o} ${T[i + 1] < 0 ? `(${rel(T[i + 1])})` : `(+${T[i + 1]})`}`).join("");
    const termes = [T[0], ...ops.map((o, i) => (o === "+" ? T[i + 1] : -T[i + 1]))];
    const simple = (L) => L.map((v, i) => (i === 0 ? rel(v) : v < 0 ? `- ${nb(-v)}` : `+ ${nb(v)}`)).join(" ");
    const bonne = `$${simple(termes)}$`;
    const f1 = `$${simple([T[0], ...ops.map((o, i) => (o === "+" ? -T[i + 1] : T[i + 1]))])}$`;
    const f2 = `$${simple([T[0], ...T.slice(1).map((v, i) => (ops[i] === "-" ? -Math.abs(v) : Math.abs(v)))])}$`;
    const f3 = `$${simple([T[0], ...T.slice(1)])}$`;
    if (Math.random() < 0.5) {
      const { choix, attendu } = melange(bonne, [f1, f2, f3].filter((x) => x !== bonne));
      if (choix.length < 3) return GEN["cr5-simplifier"]();
      return { enonce: `Quelle est l'écriture simplifiée (sans parenthèses) de $${expr}$ ?`, mode: "choix", choix, attendu,
        aides: ["Deux signes qui se suivent : $+(+a) = +a$, $+(-a) = -a$, $-(+a) = -a$, $-(-a) = +a$.", "Des signes identiques donnent $+$ ; des signes contraires donnent $-$.", "Traite chaque parenthèse une par une."],
        solution: `On applique la règle des signes à chaque parenthèse : $${expr} = ${simple(termes)}$.` };
    }
    const v = termes.reduce((s, x) => s + x, 0);
    return { enonce: `Calcule : $${expr}$`, mode: "nombre", prefixe: "Résultat :", attendu: v,
      aides: ["Commence par supprimer les parenthèses avec la règle des signes.", `On obtient $${simple(termes)}$.`, "Regroupe les nombres positifs d'un côté, les négatifs de l'autre."],
      solution: `$${expr} = ${simple(termes)}$. Positifs : $${nb(termes.filter((x) => x > 0).reduce((s, x) => s + x, 0))}$ ; négatifs : $${rel(termes.filter((x) => x < 0).reduce((s, x) => s + x, 0))}$. Résultat : $${rel(v)}$.` };
  };

  GEN["cr5-enchainer"] = function () {
    const n = rand(4, 6), termes = Array.from({ length: n }, (_, i) => (rand(1, 25)) * (i === 0 ? (Math.random() < 0.5 ? -1 : 1) : Math.random() < 0.5 ? -1 : 1));
    const txt = termes.map((v, i) => (i === 0 ? rel(v) : v < 0 ? `- ${nb(-v)}` : `+ ${nb(v)}`)).join(" "), v = termes.reduce((s, x) => s + x, 0);
    const P = termes.filter((x) => x > 0).reduce((s, x) => s + x, 0), N = termes.filter((x) => x < 0).reduce((s, x) => s + x, 0);
    return { enonce: `Calcule : $${txt}$`, mode: "nombre", prefixe: "Résultat :", attendu: v,
      erreurs: [{ valeur: P - N, message: "Les nombres précédés de $-$ se retirent : regroupe les positifs et les négatifs séparément." }],
      aides: ["Chaque nombre est précédé de son signe : c'est une somme de relatifs.", "Additionne tous les nombres précédés de $+$ (ou sans signe), puis tous ceux précédés de $-$.", `Positifs : $${P}$ ; négatifs : $${rel(N)}$.`],
      solution: `Positifs : $${termes.filter((x) => x > 0).map(nb).join(" + ") || 0} = ${P}$. Négatifs : $${termes.filter((x) => x < 0).map(rel).join(" ")} = ${rel(N)}$. Résultat : $${P} + ${relP(N)} = ${rel(v)}$.` };
  };

  GEN["cr5-problemes"] = function () {
    const t = rand(0, 4), P0 = prenom(), fig = Math.random() < 0.5;
    if (t === 0) {
      const a = rand(-15, 5), b = rand(-5, 25), lieu = pick(["à Paris", "dans une station de ski", "à Montréal", "au sommet du Kilimandjaro", "dans une chambre froide"]); if (a === b) return GEN["cr5-problemes"]();
      return { enonce: `Le matin, ${lieu}, un thermomètre indique $${rel(a)}$ °C ; l'après-midi, il indique $${rel(b)}$ °C. De combien de degrés la température a-t-elle ${b > a ? "augmenté" : "baissé"} ?`, figure: fig ? echelleV(-20, 30, 1, 5, [[a, "matin"], [b, "après-midi"]], "°C", "Thermomètre de −20 à 30 °C : la température du matin et celle de l'après-midi") : undefined, mode: "nombre", prefixe: "Écart :", suffixe: "°C", attendu: Math.abs(b - a),
        erreurs: [{ valeur: Math.abs(Math.abs(b) - Math.abs(a)), message: "Attention : quand on passe sous zéro, il faut compter les degrés de chaque côté de zéro." }, { valeur: Math.abs(a + b), message: `L'écart est une différence : $${rel(Math.max(a, b))} - ${relP(Math.min(a, b))}$, pas une somme.` }],
        aides: ["L'écart entre deux températures, c'est la différence : la plus haute moins la plus basse.", `$${rel(Math.max(a, b))} - ${relP(Math.min(a, b))}$.`, "Soustraire un nombre négatif revient à ajouter son opposé."],
        solution: `$${rel(Math.max(a, b))} - ${relP(Math.min(a, b))} = ${Math.abs(b - a)}$ : la température a ${b > a ? "augmenté" : "baissé"} de $${Math.abs(b - a)}$ °C.` };
    }
    if (t === 1) {
      const [sommet, h] = pick([["du mont Bénara", 660], ["du mont Choungui", 594], ["du mont Mtsapéré", 572], ["d'une colline", rand(50, 400)], ["du mont Combani", 477]]), p = rand(5, 40), qui = pick(["une plongeuse explore le récif", "un plongeur observe une tortue", "une plongeuse photographie un poisson-clown"]);
      return { enonce: `${P0.nom} est au sommet ${sommet}, à $${h}$ m d'altitude, pendant qu'${qui} à $${p}$ m sous le niveau de la mer ($${rel(-p)}$ m). Quelle est la différence d'altitude entre eux ?`, figure: fig ? echelleV(-100, 700, 50, 100, [[h, P0.nom], [-p, qui.split(" ")[1]], [0, "niveau de la mer"]], "m", `Échelle des altitudes de −100 m à 700 m : ${P0.nom} à ${h} m, la plongée sous le niveau de la mer`) : undefined, mode: "nombre", prefixe: "Différence :", suffixe: "m", attendu: h + p,
        erreurs: [{ valeur: h - p, message: `Il faut calculer $${h} - (${rel(-p)})$, et soustraire un négatif revient à ajouter.` }, { valeur: -(h + p), message: "Une différence d'altitude « la plus haute moins la plus basse » est positive." }],
        aides: ["Différence d'altitude : la plus haute moins la plus basse.", `$${h} - (${rel(-p)})$.`, "Soustraire un nombre, c'est ajouter son opposé."], solution: `$${h} - (${rel(-p)}) = ${h} + ${p} = ${h + p}$ m.` };
    }
    if (t === 2) {
      const e = rand(1, 5), m = rand(1, 4), d = rand(1, 6);
      return { enonce: `Un ascenseur part de l'étage $${e}$. Il descend de $${e + m}$ étages, puis remonte de $${d}$ étages. À quel étage arrive-t-il ? (Les étages du parking sont négatifs.)`, figure: fig ? echelleV(-5, 8, 1, 1, [[e, "départ"]], "étage", `Échelle des étages de −5 à 8 ; l'ascenseur part de l'étage ${e}`) : undefined, mode: "nombre", prefixe: "Étage :", attendu: e - (e + m) + d,
        erreurs: [{ valeur: e + (e + m) + d, message: "Une descente fait **baisser** le numéro de l'étage." }, { valeur: e - (e + m) - d, message: "L'ascenseur **remonte** à la fin : on ajoute." }],
        aides: ["Une descente se traduit par un nombre négatif, une montée par un nombre positif.", `Calcule $${e} - ${e + m} + ${d}$.`, `$${e} - ${e + m} = ${rel(-m)}$.`], solution: `$${e} - ${e + m} + ${d} = ${rel(-m)} + ${d} = ${rel(d - m)}$ : l'ascenseur arrive à l'étage $${rel(d - m)}$.` };
    }
    if (t === 3) {
      const s0 = rand(10, 80), dep = rand(20, 120), rec = rand(5, 60), fin = s0 - dep + rec;
      return { enonce: `Le solde du compte ${deN(P0.nom)} est de $${s0}$ €. ${P0.Il} paie $${dep}$ € par carte ${pick(["au marché de Mamoudzou", "pour un billet de barge et des courses", "dans une boutique de Combani", "pour un plein d'essence"])}, puis reçoit $${rec}$ €. Quel est son nouveau solde, en euros ?`, mode: "nombre", prefixe: "Solde :", suffixe: "€", attendu: fin,
        erreurs: [{ valeur: s0 + dep + rec, message: "Un paiement fait baisser le solde." }, { valeur: s0 - dep - rec, message: "L'argent reçu fait **monter** le solde : on l'ajoute." }],
        aides: ["Un paiement se traduit par un nombre négatif, un versement par un positif.", `Calcule $${s0} - ${dep} + ${rec}$.`, `$${s0} - ${dep} = ${rel(s0 - dep)}$.`], solution: `$${s0} - ${dep} + ${rec} = ${rel(s0 - dep)} + ${rec} = ${rel(fin)}$ €.${fin < 0 ? " Le compte est à découvert." : ""}` };
    }
    // température qui baisse en altitude ou au fil des heures
    const T = rand(-4, 12), b = rand(5, 20), n = rand(2, 4);
    return { enonce: `Une nuit en montagne, à minuit, il fait $${rel(T)}$ °C. La température baisse ensuite de $${b}$ °C en $${n}$ heures. Quelle température fait-il alors ?`, figure: fig ? echelleV(-30, 20, 1, 5, [[T, "minuit"]], "°C", `Thermomètre de −30 à 20 °C : ${txtRel(T)} °C à minuit`) : undefined, mode: "nombre", prefixe: "Température :", suffixe: "°C", attendu: T - b,
      erreurs: [{ valeur: T + b, message: "La température **baisse** : on soustrait." }, { valeur: Math.abs(T - b), message: "Attention au signe : en dessous de zéro, la température est négative." }],
      aides: ["Une baisse se traduit par une soustraction.", `Calcule $${rel(T)} - ${b}$.`, `Sur un thermomètre, on descend de $${b}$ graduations de $1$ °C.`], solution: `$${rel(T)} - ${b} = ${rel(T - b)}$ : il fait $${rel(T - b)}$ °C.` };
  };

  /* =====================================================================
     Chapitre 10 : graphiques et grandeurs en fonction d'une autre (gf5-)
     ===================================================================== */
  // Graphique dans un repère d'origine 0 : points [x, y], reliés ou non
  function grapheXY(o) {
    const W = 320, H = 210, x0 = 40, y0 = 176, haut = 18, droite = W - 14;
    const X = (x) => +(x0 + ((droite - x0) * x) / o.xmax).toFixed(1), Y = (y) => +(y0 - ((y0 - haut) * y) / o.ymax).toFixed(1);
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H + 16}" role="img" aria-label="${o.aria}"><g class="g-grid">`;
    for (let x = 0; x <= o.xmax + 1e-9; x += o.pasX) s += `<line x1="${X(x)}" y1="${haut}" x2="${X(x)}" y2="${y0}"/>`;
    for (let y = 0; y <= o.ymax + 1e-9; y += o.pasY) s += `<line x1="${x0}" y1="${Y(y)}" x2="${droite}" y2="${Y(y)}"/>`;
    s += `</g><g class="g-tick">`;
    for (let x = 0; x <= o.xmax + 1e-9; x += o.pasX * (o.etiqX || 1)) s += `<text x="${X(x)}" y="${y0 + 14}" text-anchor="middle">${nbTexteC(x)}</text>`;
    for (let y = o.pasY * (o.etiqY || 1); y <= o.ymax + 1e-9; y += o.pasY * (o.etiqY || 1)) s += `<text x="${x0 - 5}" y="${Y(y) + 3.5}" text-anchor="end">${nbTexteC(y)}</text>`;
    s += `</g><g class="g-axis"><line x1="${x0}" y1="${y0}" x2="${droite + 4}" y2="${y0}"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${haut - 8}"/></g>`;
    if (o.relier) s += `<polyline class="g-curve" points="${o.pts.map(([x, y]) => `${X(x)},${Y(y)}`).join(" ")}"/>`;
    o.pts.forEach(([x, y]) => { s += `<circle class="g-point" cx="${X(x)}" cy="${Y(y)}" r="3.5"/>`; });
    s += `<text class="g-plabel" x="${x0 + 4}" y="${haut - 6}">${o.ylab}</text><text class="g-plabel" x="${droite}" y="${y0 + 32}" text-anchor="end">${o.xlab}</text>`;
    return s + `</svg>`;
  }
  const nbTexteC = (x) => String(+x.toFixed(6)).replace(".", ",");
  FIGURES["gf5-rando"] = () => grapheXY({ pts: [[0, 0], [1, 4], [2, 8], [3, 8], [4, 11], [5, 14]], xmax: 5, ymax: 16, pasX: 1, pasY: 2, relier: true, xlab: "durée (h)", ylab: "distance (km)", aria: "Distance parcourue en fonction de la durée : 4 km par heure, une pause entre 2 h et 3 h, 14 km en 5 h" });
  FIGURES["gf5-cours-taxi"] = () => grapheXY({ pts: [[0, 4], [1, 6], [2, 8], [3, 10], [4, 12], [5, 14]], xmax: 6, ymax: 16, pasX: 1, pasY: 2, relier: true, xlab: "distance (km)", ylab: "prix (€)", aria: "Prix d'une course de taxi en fonction de la distance : 4 € de prise en charge puis 2 € par kilomètre ; la droite ne passe pas par l'origine" });
  FIGURES["gf5-cours-tableau"] = () => tabFleches("n", "M = 2n + 5", ["0", "3", "10"], ["5", "11", "25"]).replace(/aria-label="[^"]*"/, 'aria-label="Tableau de valeurs de M = 2 × n + 5 : pour n = 0, M = 5 ; pour n = 3, M = 11 ; pour n = 10, M = 25"');
  FIGURES["gf5-qcm-nuage"] = () => grapheXY({ pts: [[1, 3], [2, 5], [3, 9], [4, 10], [5, 14]], xmax: 6, ymax: 16, pasX: 1, pasY: 2, relier: false, xlab: "quantité", ylab: "prix (€)", aria: "Nuage de cinq points qui ne sont pas alignés" });
  FIGURES["gf5-prop"] = () => grapheXY({ pts: [[1, 3], [2, 6], [3, 9], [4, 12], [5, 15]], xmax: 6, ymax: 18, pasX: 1, pasY: 3, relier: false, xlab: "masse (kg)", ylab: "prix (€)", aria: "Prix en fonction de la masse : points alignés avec l'origine, 3 € par kilogramme" });

  GEN["gf5-lire"] = function () {
    // randonnée : vitesse v, pause éventuelle, lecture directe ou inverse
    for (let e = 0; e < 50; e++) {
      const P0 = prenom(), dest = pick(["vers le mont Choungui", "sur le sentier du littoral", "vers la cascade de Soulou", "autour de la presqu'île de Saziley", "sur les crêtes du Nord", "vers le lac Dziani"]), qui = `${P0.nom} randonne ${dest}`;
      const v = pick([2, 3, 4, 5]), n = rand(5, 7), pause = rand(1, n - 2), pts = [[0, 0]]; let d = 0;
      for (let h = 1; h <= n; h++) { if (h !== pause + 1) d += v * (h > pause + 1 && Math.random() < 0.4 ? 0.5 : 1); pts.push([h, d]); }
      if (pts.some(([, y]) => !Number.isInteger(y))) continue;
      const ymax = Math.ceil(d / 4) * 4 + 4, fig = grapheXY({ pts, xmax: n, ymax, pasX: 1, pasY: 2, etiqY: 2, relier: true, xlab: "durée (h)", ylab: "distance (km)", aria: `Distance parcourue par ${P0.nom} en fonction de la durée de marche` });
      const t = rand(0, 3), h = rand(1, n), intro = `${qui}. Le graphique donne la distance parcourue en fonction de la durée de marche.`;
      if (t === 0) return { enonce: `${intro} Quelle distance a-t-${P0.il} parcourue au bout de $${h}$ h ?`, figure: fig, mode: "nombre", prefixe: "Distance :", suffixe: "km", attendu: pts[h][1],
        erreurs: [...(h > 1 ? [{ valeur: pts[h - 1][1], message: `Ça, c'est la distance au bout de $${h - 1}$ h : pars bien de $${h}$ sur l'axe horizontal.` }] : []), ...(h < n ? [{ valeur: pts[h + 1][1], message: `Ça, c'est la distance au bout de $${h + 1}$ h : pars bien de $${h}$ sur l'axe horizontal.` }] : [])],
        aides: ["La durée se lit sur l'axe horizontal, la distance sur l'axe vertical.", `Pars de $${h}$ sur l'axe horizontal et monte jusqu'à la courbe.`, "Puis lis la valeur correspondante sur l'axe vertical."], solution: `Au bout de $${h}$ h, le point de la courbe est à la hauteur $${pts[h][1]}$ : ${P0.il} a parcouru $${pts[h][1]}$ km.` };
      if (t === 1) return { enonce: `${intro} Pendant combien d'heures a-t-${P0.il} fait une pause ?`, figure: fig, mode: "nombre", prefixe: "Pause :", suffixe: "h", attendu: 1,
        erreurs: [{ valeur: pause, message: `$${pause}$ h, c'est le moment où la pause commence, pas sa durée.` }, { valeur: pts[pause][1], message: "Ça, c'est la distance parcourue avant la pause : on demande combien de temps elle dure." }],
        aides: ["Pendant une pause, la distance ne change pas.", "Cherche le morceau de courbe horizontal.", "Lis sur l'axe horizontal le début et la fin de ce morceau."], solution: `La courbe est horizontale entre $${pause}$ h et $${pause + 1}$ h : la distance reste $${pts[pause][1]}$ km. La pause a duré $1$ h.` };
      if (t === 2) return { enonce: `${intro} Quelle distance a-t-${P0.il} parcourue en tout ?`, figure: fig, mode: "nombre", prefixe: "Distance totale :", suffixe: "km", attendu: d,
        erreurs: [{ valeur: n, message: "Ça, c'est la durée totale (axe horizontal). La distance se lit sur l'axe vertical." }, { valeur: ymax, message: "Ne lis pas le haut de l'axe : lis la hauteur du **dernier point** de la courbe." }],
        aides: ["La distance totale est la distance à la fin de la randonnée.", "Regarde le dernier point de la courbe.", "Lis sa hauteur sur l'axe vertical."], solution: `Le dernier point est à la hauteur $${d}$ : ${P0.il} a parcouru $${d}$ km.` };
      const cible = pts.find(([x, y], i) => i > 0 && y > 0 && pts.filter((q) => q[1] === y).length === 1); if (!cible) continue;
      return { enonce: `${intro} Au bout de combien d'heures avait-${P0.il} parcouru $${cible[1]}$ km ?`, figure: fig, mode: "nombre", prefixe: "Durée :", suffixe: "h", attendu: cible[0],
        erreurs: [{ valeur: cible[1], message: "Ça, c'est la distance : la durée se lit sur l'axe horizontal." }, { valeur: cible[0] + 1, message: "Descends bien à la verticale du point de la courbe." }],
        aides: ["Cette fois, on part de l'axe vertical (la distance).", `Pars de $${cible[1]}$ sur l'axe vertical et va horizontalement jusqu'à la courbe.`, "Descends ensuite sur l'axe horizontal."], solution: `La courbe atteint $${cible[1]}$ km au point d'abscisse $${cible[0]}$ : au bout de $${cible[0]}$ h.` };
    }
  };

  // Rectangle (ou carré) dessiné avec ses dimensions écrites : textes [haut, gauche]
  const rectFig = (L, l, tH, tG, aria) => { const k = Math.min(220 / L, 120 / l), w = +(k * L).toFixed(1), h = +(k * l).toFixed(1), x = +(160 - w / 2 + 14).toFixed(1), y = +(86 - h / 2 + 8).toFixed(1); return `<svg class="graph" viewBox="0 0 320 172" role="img" aria-label="${aria}"><rect class="g-rect" x="${x}" y="${y}" width="${w}" height="${h}"/><text class="g-mesure" x="${+(x + w / 2).toFixed(1)}" y="${y - 8}" text-anchor="middle">${tH}</text><text class="g-mesure" x="${x - 8}" y="${+(y + h / 2 + 4).toFixed(1)}" text-anchor="end">${tG}</text></svg>`; };
  GEN["gf5-formule"] = function () {
    const t = rand(0, 3), P0 = prenom();
    const C = [
      () => { const a = pick([5, 6, 7, 8, 9, 10, 12]), b = pick([2, 3, 4, 5, 6]), n = rand(2, 12), [lieu, obj, ext] = pick([["Au cinéma de Mamoudzou", "places", "un pot de pop-corn"], ["À la piscine", "entrées", "la location d'un casier"], ["Au festival", "billets", "les frais de réservation"], ["Au parc de loisirs", "entrées", "le parking"]]); return { e: `${lieu}, le prix $P$ (en €) à payer pour $n$ ${obj} et ${ext} est $P = ${a} \\times n + ${b}$. Calcule le prix pour $${n}$ ${obj}.`, r: a * n + b, s: `$P = ${a} \\times ${n} + ${b} = ${a * n} + ${b} = ${a * n + b}$ €.`, err: [a * (n + b), a * n], u: "€" }; },
      () => { const c = Dc(rand(12, 25), 1), p = rand(2, 6), d = rand(2, 30), r = addD(Dc(p), mulD(c, Dc(d))), veh = pick(["Un taxi", "Un taxi-brousse", "Un service de navette"]); return { e: `${veh} facture une prise en charge de $${p}$ € puis $${tD(c)}$ € par kilomètre. Le prix est $P = ${p} + ${tD(c)} \\times d$ où $d$ est la distance en km. Calcule $P$ pour $d = ${d}$.`, r: r.m / 10 ** r.d, s: `$P = ${p} + ${tD(c)} \\times ${d} = ${p} + ${tD(mulD(c, Dc(d)))} = ${tD(r)}$ €.`, err: [+((p + c.m / 10) * d).toFixed(2), +((c.m / 10) * d).toFixed(2)], u: "€" }; },
      () => { const c = rand(2, 40), u = pick(["cm", "m", "dm"]); return { e: `Le périmètre $P$ d'un carré de côté $c$ est donné par la formule $P = 4 \\times c$. Calcule $P$ pour $c = ${c}$ ${u}.`, r: 4 * c, s: `$P = 4 \\times ${c} = ${4 * c}$ ${u}.`, err: [c * c, 4 + c], u, fig: rectFig(1, 1, `${c} ${u}`, `${c} ${u}`, `Carré de côté ${c} ${u}`) }; },
      () => { const L = rand(3, 40), l = rand(2, L - 1), u = pick(["cm", "m"]); return { e: `Le périmètre $P$ d'un rectangle de longueur $L$ et de largeur $\\ell$ est $P = 2 \\times (L + \\ell)$. Calcule $P$ pour $L = ${L}$ ${u} et $\\ell = ${l}$ ${u}.`, r: 2 * (L + l), s: `$P = 2 \\times (${L} + ${l}) = 2 \\times ${L + l} = ${2 * (L + l)}$ ${u}.`, err: [2 * L + l, L * l], u, fig: rectFig(L, l, `${L} ${u}`, `${l} ${u}`, `Rectangle de longueur ${L} ${u} et de largeur ${l} ${u}`) }; },
      () => { const v = pick([4, 5, 12, 15, 20, 30, 40, 50]), h = rand(2, 6), qui = v <= 5 ? `${P0.nom} marche` : v <= 20 ? `${P0.nom} roule à vélo` : "Le bus roule"; return { e: `${qui} à vitesse constante. La distance parcourue $d$ (en km) en fonction de la durée $t$ (en h) est $d = ${v} \\times t$. Calcule $d$ pour $t = ${h}$.`, r: v * h, s: `$d = ${v} \\times ${h} = ${v * h}$ km.`, err: [v + h, v], u: "km" }; },
      () => { const S = rand(5, 40), a = rand(2, 10), s = rand(2, 12); return { e: `${P0.nom} a $${S}$ € dans sa tirelire et y ajoute $${a}$ € chaque semaine. La somme $T$ (en €) au bout de $s$ semaines est $T = ${S} + ${a} \\times s$. Calcule $T$ pour $s = ${s}$.`, r: S + a * s, s: `$T = ${S} + ${a} \\times ${s} = ${S} + ${a * s} = ${S + a * s}$ €.`, err: [(S + a) * s, a * s], u: "€" }; }
    ];
    if (t <= 1 || Math.random() < 0.5) { const q = pick(C)(); return { enonce: q.e, figure: q.fig && Math.random() < 0.5 ? q.fig : undefined, mode: "nombre", prefixe: "Résultat :", suffixe: q.u, attendu: q.r, erreurs: q.err.map((v, k) => ({ valeur: v, message: k ? "Relis la formule : tu as oublié une partie du calcul." : "Respecte les priorités : multiplications d'abord, sauf s'il y a des parenthèses." })),
      aides: ["On remplace la lettre par sa valeur : c'est une substitution.", "On écrit le signe $\\times$ entre le nombre et la valeur remplacée.", "On applique les priorités opératoires."], solution: q.s }; }
    const a = rand(2, 9), b = rand(1, 15), d = rand(1, 3), xs = [0, 1, 2, d + 2, rand(5, 6), rand(8, 12)].slice(0, 5).sort((u, v) => u - v).filter((v, k, T) => T.indexOf(v) === k), i = rand(1, xs.length - 1);
    const [quoi, M, u, vide] = pick([["La masse $M$ (en kg) d'un carton contenant $n$ bouteilles", "M", "kg", "la masse du carton vide"], ["Le prix $P$ (en €) d'une corbeille de $n$ mangues", "P", "€", "le prix de la corbeille vide"], ["La hauteur $H$ (en cm) d'une pile de $n$ cahiers posée sur une table", "H", "cm", "la hauteur de départ"]]);
    return { enonce: `${quoi} est $${M} = ${a} \\times n + ${b}$. Complète le tableau : que vaut $${M}$ pour $n = ${xs[i]}$ ?`, tableau: { lignes: [["n", ...xs.map(String)], [M, ...xs.map((x, k) => (k === i ? "\\ldots" : String(a * x + b)))]] }, mode: "nombre", prefixe: `$${M} =$`, suffixe: u, attendu: a * xs[i] + b,
      erreurs: [{ valeur: a * xs[i], message: `N'oublie pas d'ajouter $${b}$ (${vide}).` }, { valeur: a * (xs[i] + b), message: "Respecte les priorités : on multiplie d'abord, puis on ajoute." }],
      aides: [`Remplace $n$ par $${xs[i]}$ dans la formule.`, `$${M} = ${a} \\times ${xs[i]} + ${b}$.`, "Multiplication d'abord, puis addition."], solution: `$${M} = ${a} \\times ${xs[i]} + ${b} = ${a * xs[i] + b}$ ${u}.` };
  };

  GEN["gf5-produire"] = function () {
    const P0 = prenom(), L1 = pick(["n", "x", "q", "k"]);
    const Q = [
      () => { const a = rand(2, 15), [obj, objs, lieu] = pick([["Un cahier", "cahiers", "à la librairie"], ["Un kilo de mangues", "kilos de mangues", "au marché de Mamoudzou"], ["Un ticket de barge", "tickets de barge", "à la gare maritime"], ["Une brochette", "brochettes", "au voulé"], ["Un paquet de vanille", "paquets de vanille", "à la coopérative"], ["Un livre", "livres", "au salon du livre"]]); return [`${obj} coûte $${a}$ € ${lieu}. Quelle formule donne le prix $P$ (en €) de $${L1}$ ${objs} en fonction de $${L1}$ ?`, `$P = ${a} \\times ${L1}$`, [`$P = ${a} + ${L1}$`, `$P = ${L1} \\div ${a}$`, `$P = ${a} \\times ${L1} + ${a}$`], `Pour $${L1}$ ${objs} à $${a}$ € l'unité, on paie $${L1}$ fois $${a}$ € : $P = ${a} \\times ${L1}$ (on écrit aussi $P = ${a}${L1}$).`]; },
      () => { const p = rand(2, 8), c = pick([1.5, 2, 2.5, 1.2, 1.8, 3, 0.8]); const C = nb(c); return [`${pick(["Un taxi", "Un taxi-brousse", "Une navette"])} facture $${p}$ € de prise en charge, puis $${C}$ € par kilomètre. Quelle formule donne le prix $P$ (en €) en fonction de la distance $d$ (en km) ?`, `$P = ${p} + ${C} \\times d$`, [`$P = (${p} + ${C}) \\times d$`, `$P = ${p} \\times d + ${C}$`, `$P = ${C} \\times d$`], `On paie $${p}$ € une seule fois, puis $${C}$ € pour chaque kilomètre : $P = ${p} + ${C} \\times d$.`]; },
      () => { const c = pick(["c", "a", "s", "x"]), fig = pick(["carré", "losange"]); return pick([[`Quelle formule donne l'aire $\\mathcal{A}$ d'un carré en fonction de la longueur $${c}$ de son côté ?`, `$\\mathcal{A} = ${c} \\times ${c}$`, [`$\\mathcal{A} = 4 \\times ${c}$`, `$\\mathcal{A} = 2 \\times ${c}$`, `$\\mathcal{A} = ${c} + ${c}$`], `L'aire d'un carré est côté fois côté : $\\mathcal{A} = ${c} \\times ${c} = ${c}^2$.`], [`Quelle formule donne le périmètre $P$ d'un ${fig} en fonction de la longueur $${c}$ de son côté ?`, `$P = 4 \\times ${c}$`, [`$P = ${c} \\times ${c}$`, `$P = ${c} + 4$`, `$P = 2 \\times ${c}$`], `Un ${fig} a quatre côtés de longueur $${c}$ : $P = 4 \\times ${c}$.`]]); },
      () => { const a = rand(2, 12), m = rand(5, 30), [abo, unite, lettre] = pick([["Un abonnement de streaming", "film loué", "f"], ["Une salle de sport", "cours collectif", "c"], ["La piscine", "séance", "s"], ["Un club de plongée de Petite-Terre", "plongée", "p"]]); return [`${abo} coûte $${m}$ € par mois, plus $${a}$ € par ${unite}. Quelle formule donne le prix $P$ (en €) payé dans un mois en fonction du nombre $${lettre}$ de ${unite.split(" ")[0]}s ?`, `$P = ${m} + ${a} \\times ${lettre}$`, [`$P = (${m} + ${a}) \\times ${lettre}$`, `$P = ${m} \\times ${lettre} + ${a}$`, `$P = ${a} \\times ${lettre}$`], `On paie $${m}$ € une fois, plus $${a}$ € pour chaque ${unite} : $P = ${m} + ${a} \\times ${lettre}$.`]; },
      () => { const l = rand(2, 15), f = rectFig(2.2, 1, "L", `${l} cm`, `Rectangle de largeur ${l} cm et de longueur L`); return pick([[`Un rectangle a une largeur de $${l}$ cm. Quelle formule donne son périmètre $P$ (en cm) en fonction de sa longueur $L$ ?`, `$P = 2 \\times (L + ${l})$`, [`$P = 2 \\times L + ${l}$`, `$P = L \\times ${l}$`, `$P = L + ${l}$`], `Le périmètre est le double de la somme de la longueur et de la largeur : $P = 2 \\times (L + ${l})$.`, f], [`Un rectangle a une largeur de $${l}$ cm. Quelle formule donne son aire $\\mathcal{A}$ (en cm²) en fonction de sa longueur $L$ ?`, `$\\mathcal{A} = ${l} \\times L$`, [`$\\mathcal{A} = 2 \\times (L + ${l})$`, `$\\mathcal{A} = L + ${l}$`, `$\\mathcal{A} = ${l} \\times L \\times L$`], `L'aire d'un rectangle est longueur fois largeur : $\\mathcal{A} = ${l} \\times L$.`, f]]); },
      () => { const a = rand(2, 9), b = rand(1, 12); return pick([[`On choisit un nombre $x$, on le multiplie par $${a}$, puis on retire $${b}$. Quelle formule donne le résultat $R$ en fonction de $x$ ?`, `$R = ${a} \\times x - ${b}$`, [`$R = ${a} \\times (x - ${b})$`, `$R = x - ${a} \\times ${b}$`, `$R = ${a} + x - ${b}$`], `On multiplie d'abord $x$ par $${a}$, puis on retire $${b}$ : $R = ${a} \\times x - ${b}$, sans parenthèses.`], [`On choisit un nombre $x$, on lui ajoute $${b}$, puis on multiplie le résultat par $${a}$. Quelle formule donne le résultat $R$ en fonction de $x$ ?`, `$R = (x + ${b}) \\times ${a}$`, [`$R = x + ${b} \\times ${a}$`, `$R = ${a} \\times x + ${b}$`, `$R = x + ${a} + ${b}$`], `On ajoute d'abord $${b}$, puis on multiplie le tout par $${a}$ : il faut des parenthèses, $R = (x + ${b}) \\times ${a}$.`]]); },
      () => { const d = rand(2, 9); return [`${P0.nom} a $${d}$ ans de plus que son cousin. Quelle formule donne l'âge $A$ ${deN(P0.nom)} en fonction de l'âge $c$ de son cousin ?`, `$A = c + ${d}$`, [`$A = ${d} \\times c$`, `$A = c - ${d}$`, `$A = ${d} - c$`], `${P0.nom} a $${d}$ ans de plus : on ajoute $${d}$ à l'âge du cousin, $A = c + ${d}$.`]; },
      () => { const S = rand(5, 50), a = rand(2, 15); return [`${P0.nom} a $${S}$ € et économise $${a}$ € par semaine. Quelle formule donne la somme $T$ (en €) qu'${P0.il} aura au bout de $s$ semaines ?`, `$T = ${S} + ${a} \\times s$`, [`$T = (${S} + ${a}) \\times s$`, `$T = ${S} \\times s + ${a}$`, `$T = ${a} \\times s$`], `${P0.Il} a déjà $${S}$ € et ajoute $${a}$ € chaque semaine : $T = ${S} + ${a} \\times s$.`]; },
      () => { const v = pick([4, 5, 12, 15, 20, 30, 40, 50, 60]); return [`Un ${v <= 5 ? "marcheur" : v <= 20 ? "cycliste" : "bus"} avance à la vitesse constante de $${v}$ km/h. Quelle formule donne la distance $d$ (en km) parcourue en fonction de la durée $t$ (en h) ?`, `$d = ${v} \\times t$`, [`$d = ${v} + t$`, `$d = t \\div ${v}$`, `$d = ${v} \\div t$`], `En $1$ h, il parcourt $${v}$ km ; en $t$ heures, $${v} \\times t$ km : $d = ${v} \\times t$.`]; },
      () => { const m = rand(2, 9) * 100, c = rand(1, 9) * 100; return [`Un carton vide pèse $${c}$ g. On y range des pots de confiture de $${m}$ g chacun. Quelle formule donne la masse $M$ (en g) du carton contenant $p$ pots ?`, `$M = ${c} + ${m} \\times p$`, [`$M = (${c} + ${m}) \\times p$`, `$M = ${m} + ${c} \\times p$`, `$M = ${m} \\times p$`], `Le carton compte une seule fois, chaque pot ajoute $${m}$ g : $M = ${c} + ${m} \\times p$.`]; }
    ];
    const [q, bonne, faux, expl, fig] = pick(Q)();
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: q, figure: fig && Math.random() < 0.6 ? fig : undefined, mode: "choix", choix, attendu, aides: ["Teste chaque formule avec une valeur simple (par exemple $1$ ou $2$).", "Vérifie que le résultat obtenu correspond bien à la situation.", "Attention aux parenthèses : elles changent l'ordre des calculs."], solution: `Réponse : ${bonne.replace(/[.]$/, "")}. ${expl}` };
  };

  GEN["gf5-proportionnalite"] = function () {
    const t = rand(0, 3), [xl, yl, unitX, unitY, quoi] = pick([["masse (kg)", "prix (€)", "kg", "€", "le prix d'un kilogramme"], ["durée (h)", "distance (km)", "h", "km", "la distance parcourue en une heure"], ["nombre de places", "prix (€)", "place", "€", "le prix d'une place"], ["volume (L)", "prix (€)", "L", "€", "le prix d'un litre"], ["nombre de tickets", "prix (€)", "ticket", "€", "le prix d'un ticket"]]);
    const pas = pick([1, 1, 2]), x0 = pick([1, pas]), nbp = rand(4, 6), xs = Array.from({ length: nbp }, (_, i) => x0 + i * pas), k = pick(pas === 2 ? [1, 1.5, 2, 2.5, 3, 4] : [1.5, 2, 2.5, 3, 4, 5, 6]);
    let pts, nature;
    if (t === 0 || t === 3) { pts = xs.map((x) => [x, x * k]); nature = 0; }
    else if (t === 1) { const b = pick([1, 2, 3, 4, 5, 6]); pts = xs.map((x) => [x, x * k + b]); nature = 1; }
    else { const i0 = rand(1, nbp - 2); pts = xs.map((x, i) => [x, Math.max(1, x * k + (i === i0 || i === nbp - 1 - (i0 % 2) ? pick([-2, -1, 1, 2]) * Math.max(1, Math.round(k / 2)) : 0))]); nature = 2;
      const alignes = pts.every((p, i) => i < 2 || Math.abs((pts[1][0] - pts[0][0]) * (p[1] - pts[0][1]) - (pts[1][1] - pts[0][1]) * (p[0] - pts[0][0])) < 1e-9); if (alignes) return GEN["gf5-proportionnalite"](); }
    // pour lire le coefficient (t = 3), le quadrillage horizontal suit les multiples de k : les points tombent sur une ligne
    const ymaxBrut = Math.max(...pts.map((p) => p[1])), pasY = t === 3 ? k : ymaxBrut > 40 ? 10 : ymaxBrut > 20 ? 4 : 2, ymax = Math.ceil(ymaxBrut / pasY) * pasY + pasY, xmax = xs[nbp - 1] + pas;
    const fig = grapheXY({ pts, xmax, ymax, pasX: 1, etiqX: xmax > 8 ? 2 : 1, pasY, etiqY: ymax / pasY > 10 ? 2 : 1, relier: false, xlab: xl, ylab: yl, aria: `Nuage de points : ${yl} en fonction de ${xl}` });
    if (t === 3 && Number.isInteger(k * 2)) {
      const y1 = pts[0][1];
      return { enonce: `Ce graphique représente une situation de proportionnalité. Quel est ${quoi} ?`, figure: fig, mode: "nombre", prefixe: "Réponse :", suffixe: unitY, attendu: k,
        erreurs: [...(x0 !== 1 ? [{ valeur: y1, message: `Ça, c'est la valeur pour $${x0}$ ${unitX}${x0 > 1 ? "s" : ""} : il faut la diviser par $${x0}$.` }] : [{ valeur: pts[1][1], message: `Ça, c'est la valeur pour $${xs[1]}$ ${unitX}s, pas pour $1$.` }]), { valeur: +(1 / k).toFixed(3), message: "On divise la grandeur du haut (axe vertical) par celle de l'axe horizontal, pas l'inverse." }],
        aides: ["Choisis un point du graphique et lis ses deux coordonnées.", `Par exemple le point d'abscisse $${xs[1]}$ : son ordonnée est $${nb(pts[1][1])}$.`, `Le coefficient est $${nb(pts[1][1])} \\div ${xs[1]}$.`],
        solution: `Pour $${xs[1]}$ ${unitX}${xs[1] > 1 ? "s" : ""}, on lit $${nb(pts[1][1])}$ ${unitY} : $${nb(pts[1][1])} \\div ${xs[1]} = ${nb(k)}$. ${quoi[0].toUpperCase() + quoi.slice(1)} est $${nb(k)}$ ${unitY}.` };
    }
    const choix = ["Oui : les points sont alignés avec l'origine du repère", "Non : les points sont alignés, mais pas avec l'origine", "Non : les points ne sont pas alignés"];
    return { enonce: `Ce graphique représente-t-il une situation de proportionnalité ?`, figure: fig, mode: "choix", choix, attendu: Math.min(nature, 2),
      aides: ["Une situation de proportionnalité est représentée par des points **alignés avec l'origine** du repère.", "Vérifie d'abord si les points sont alignés (sur une même droite) : pose ta règle.", "Puis prolonge mentalement la droite : passe-t-elle par l'origine $(0 \\, ; \\, 0)$ ?"],
      solution: [`Les points sont alignés sur une droite qui passe par l'origine : c'est une situation de proportionnalité (coefficient $${nb(k)}$).`, "Les points sont alignés, mais la droite ne passe pas par l'origine : ce n'est pas une situation de proportionnalité.", "Les points ne sont pas alignés : ce n'est pas une situation de proportionnalité."][nature] };
  };

  /* =====================================================================
     Chapitre 11 : calcul littéral, carrés et cubes (cl5-)
     ===================================================================== */
  const LET = ["x", "a", "n", "y", "t"];
  const { assemblage } = window.PM_EXO.college;
  FIGURES["cl5-cours-carre-cube"] = () => {
    let s = ""; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) s += `<rect class="g-rect" x="${30 + j * 26}" y="${20 + i * 26}" width="26" height="26"/>`;
    const cube = assemblage([[2, 2], [2, 2]]).replace(/<svg[^>]*>/, "").replace("</svg>", "");
    return `<svg class="graph" viewBox="0 0 320 140" role="img" aria-label="Un carré de 3 sur 3 formé de 9 petits carrés : 3 au carré égale 9 ; un cube de 2 sur 2 sur 2 formé de 8 petits cubes : 2 au cube égale 8">${s}<text class="g-label" x="69" y="122" text-anchor="middle">3 × 3 = 3² = 9</text><g transform="translate(66 2)">${cube}</g><text class="g-label" x="226" y="132" text-anchor="middle">2 × 2 × 2 = 2³ = 8</text></svg>`;
  };
  FIGURES["cl5-cours-perimetre"] = () => rectFig(1, 1, "c", "c", "Carré de côté c : son périmètre est c + c + c + c = 4c").replace("</svg>", '<text class="g-label" x="174" y="174" text-anchor="middle">P = c + c + c + c = 4c</text></svg>').replace('viewBox="0 0 320 172"', 'viewBox="0 0 320 182"');
  FIGURES["cl5-cours-distributivite"] = () => rectDistrib(4, "x", 3, { ka: "4 × x = 4x", kb: "12", fa: 0.66, aria: "Rectangle de largeur 4 et de longueur x + 3 : son aire 4(x + 3) est la somme des aires 4x et 12" });
  // Tuiles : n1 barres « x », n2 barres « x » (autre couleur) et u carrés « 1 » ; legende sous la figure (ou rien)
  function tuiles(n1, n2, u, legende, aria) {
    let s = ""; const n = n1 + n2;
    for (let i = 0; i < n; i++) s += `<rect class="${i < n1 ? "g-rect" : "g-poly g-poly-image"}" x="${10 + i * 30}" y="26" width="24" height="64" rx="3"/><text class="g-label" x="${22 + i * 30}" y="62" text-anchor="middle">x</text>`;
    for (let i = 0; i < u; i++) s += `<rect class="g-barre-plus" x="${20 + n * 30 + i * 28}" y="66" width="22" height="22" rx="3"/><text class="g-label" x="${31 + n * 30 + i * 28}" y="81" text-anchor="middle">1</text>`;
    const W = Math.max(320, 30 + n * 30 + u * 28);
    return `<svg class="graph" viewBox="0 0 ${W} ${legende ? 128 : 100}" role="img" aria-label="${aria}">${s}<text class="g-mesure" x="${10 + n1 * 15}" y="18" text-anchor="middle">${n1}x</text>${n2 ? `<text class="g-mesure" x="${10 + n1 * 30 + n2 * 15}" y="18" text-anchor="middle">${n2}x</text>` : ""}${u ? `<text class="g-mesure" x="${20 + n * 30 + u * 14 - 3}" y="58" text-anchor="middle">${u}</text>` : ""}${legende ? `<text class="g-label" x="${W / 2}" y="118" text-anchor="middle">${legende}</text>` : ""}</svg>`;
  }
  FIGURES["cl5-cours-tuiles"] = () => tuiles(3, 4, 3, "3x + 4x + 3 = 7x + 3", "Tuiles : 3 barres x, puis 4 barres x, puis 3 carrés unités : 3x + 4x + 3 = 7x + 3");
  FIGURES["cl5-qcm-tuiles"] = () => tuiles(2, 3, 4, "", "Tuiles : 2 barres x, 3 barres x et 4 carrés unités");
  FIGURES["cl5-qcm-rect"] = () => rectDistrib(5, "a", 2, { ka: "?", kb: "?", aria: "Rectangle de largeur 5 et de longueur a + 2, partagé en deux rectangles" });
  FIGURES["cl5-qcm-carre"] = () => carreQuad(6, "Carré de côté 6 cm quadrillé en carreaux de 1 cm");
  // Deux entiers consécutifs : n points et n + 1 points, il reste toujours un point seul
  FIGURES["cl5-cours-preuve"] = () => {
    let s = ""; const n = 6;
    for (let i = 0; i < n; i++) s += `<circle class="g-point" cx="${40 + i * 34}" cy="40" r="8"/><circle class="g-point" cx="${40 + i * 34}" cy="80" r="8"/><line class="g-guide" x1="${40 + i * 34}" y1="49" x2="${40 + i * 34}" y2="71"/>`;
    s += `<circle cx="${40 + n * 34}" cy="80" r="8" style="fill:var(--courbe2)"/>`;
    return `<svg class="graph" viewBox="0 0 320 132" role="img" aria-label="Deux entiers consécutifs : une rangée de n points et une rangée de n + 1 points ; en les associant par paires, il reste toujours un point seul, donc la somme 2n + 1 est impaire">${s}<text class="g-label" x="8" y="44">n</text><text class="g-label" x="0" y="84">n+1</text><text class="g-mesure" x="${40 + n * 34}" y="104" text-anchor="middle">seul</text><text class="g-label" x="160" y="126" text-anchor="middle">n + (n + 1) = 2n + 1 : toujours impair</text></svg>`;
  };
  // ax + b écrit proprement (a, b entiers, a non nul)
  const affine = (a, b, x) => `${a === 1 ? "" : a === -1 ? "-" : a}${x}${b === 0 ? "" : b > 0 ? ` + ${b}` : ` - ${-b}`}`;

  // Carré quadrillé de côté s (s ≤ 10) : aire = nombre de carreaux
  const carreQuad = (s, aria) => { const c = Math.min(16, Math.floor(150 / s)); let r = ""; for (let i = 0; i < s; i++) for (let j = 0; j < s; j++) r += `<rect class="g-rect" x="${160 - (s * c) / 2 + j * c}" y="${14 + i * c}" width="${c}" height="${c}"/>`; return `<svg class="graph" viewBox="0 0 320 ${s * c + 40}" role="img" aria-label="${aria}">${r}<text class="g-mesure" x="160" y="${s * c + 32}" text-anchor="middle">côté : ${s} cm</text></svg>`; };
  GEN["cl5-puissances"] = function () {
    const t = rand(0, 7);
    if (t === 5) { // somme ou différence de carrés et de cubes
      const a = rand(2, 9), b = rand(2, 6), c = rand(2, 4), op = pick(["+", "-"]), v = op === "+" ? a * a + c ** 3 : a * a - c ** 3;
      if (v < 0) return GEN["cl5-puissances"]();
      return { enonce: `Calcule $${a}^2 ${op} ${c}^3$.`, mode: "nombre", prefixe: "Résultat :", attendu: v,
        erreurs: [{ valeur: op === "+" ? 2 * a + 3 * c : 2 * a - 3 * c, message: `$${a}^2$ n'est pas $2 \\times ${a}$ et $${c}^3$ n'est pas $3 \\times ${c}$.` }, { valeur: op === "+" ? (a + c) ** 2 : Math.abs(a * a - c * c), message: "Calcule chaque puissance séparément : le carré porte sur un nombre, le cube sur l'autre." }],
        aides: [`$${a}^2 = ${a} \\times ${a}$.`, `$${c}^3 = ${c} \\times ${c} \\times ${c}$.`, `$${a * a} ${op} ${c ** 3}$.`], solution: `$${a}^2 ${op} ${c}^3 = ${a * a} ${op} ${c ** 3} = ${v}$.` };
    }
    if (t === 6) { // écrire sous forme de carré ou de cube
      const cube = Math.random() < 0.4, a = cube ? pick([2, 3, 4, 5, 10]) : rand(2, 12), v = cube ? a ** 3 : a * a;
      return { enonce: `Complète : $${nb(v)} = \\ldots^${cube ? 3 : 2}$`, mode: "nombre", prefixe: "Nombre manquant :", attendu: a,
        erreurs: [{ valeur: v / (cube ? 3 : 2), message: `${cube ? "Le cube n'est pas le triple" : "Le carré n'est pas le double"} : cherche un nombre qui, multiplié ${cube ? "deux fois " : ""}par lui-même, donne $${nb(v)}$.` }, ...(cube ? [] : [{ valeur: a + 1, message: `$${a + 1}^2 = ${(a + 1) ** 2}$, pas $${v}$.` }])],
        aides: [cube ? "Cherche un nombre qui, multiplié trois fois par lui-même, donne ce résultat." : "Cherche un nombre qui, multiplié par lui-même, donne ce résultat.", cube ? "Essaie $2 \\times 2 \\times 2$, $3 \\times 3 \\times 3$, …" : "Connais tes carrés de $1$ à $12$.", `Vérifie : $${a}^${cube ? 3 : 2} = ${Array(cube ? 3 : 2).fill(a).join(" \\times ")}$.`], solution: `$${Array(cube ? 3 : 2).fill(a).join(" \\times ")} = ${nb(v)}$, donc $${nb(v)} = ${a}^${cube ? 3 : 2}$.` };
    }
    if (t === 7) { // produit avec un carré
      const a = rand(2, 9), b = rand(2, 6), v = a * b * b;
      return { enonce: `Calcule $${a} \\times ${b}^2$.`, mode: "nombre", prefixe: "Résultat :", attendu: v,
        erreurs: [{ valeur: (a * b) ** 2, message: `Le carré ne porte que sur $${b}$ : on calcule d'abord $${b}^2$, puis on multiplie par $${a}$.` }, { valeur: a * 2 * b, message: `$${b}^2$ n'est pas $2 \\times ${b}$.` }],
        aides: ["La puissance passe avant la multiplication.", `$${b}^2 = ${b * b}$.`, `$${a} \\times ${b * b}$.`], solution: `$${a} \\times ${b}^2 = ${a} \\times ${b * b} = ${v}$.` };
    }
    if (t === 0) { const a = rand(2, 15), q = Math.random() < 0.75 ? 2 : 3, b = q === 3 ? pick([2, 3, 4, 5, 6, 10]) : a, v = b ** q;
      return { enonce: `Calcule $${b}^${q}$.`, mode: "nombre", prefixe: "Résultat :", attendu: v, erreurs: [{ valeur: b * q, message: `$${b}^${q}$ n'est pas $${b} \\times ${q}$ : c'est $${Array(q).fill(b).join(" \\times ")}$.` }],
        aides: [`$${b}^${q}$ se lit « ${b} ${q === 2 ? "au carré" : "au cube"} ».`, `$${b}^${q} = ${Array(q).fill(b).join(" \\times ")}$.`, "Calcule ce produit."], solution: `$${b}^${q} = ${Array(q).fill(b).join(" \\times ")} = ${v}$.` }; }
    if (t === 1) { const a = rand(2, 12), v = a * a;
      return { enonce: `De quel nombre entier positif $${v}$ est-il le carré ?`, mode: "nombre", prefixe: "Nombre :", attendu: a, erreurs: [{ valeur: v / 2, message: "Le carré n'est pas le double : cherche le nombre qui, multiplié par lui-même, donne $" + v + "$." }],
        aides: ["Connais tes carrés de $1$ à $12$.", "Cherche $\\ldots \\times \\ldots = " + v + "$ avec deux fois le même nombre.", `$${a - 1}^2 = ${(a - 1) ** 2}$.`], solution: `$${a} \\times ${a} = ${v}$, donc $${v} = ${a}^2$.` }; }
    if (t === 2) { const a = rand(1, 9), b = rand(2, 6), c = rand(2, 5), v = a + b ** 2 * c;
      return { enonce: `Calcule $${a} + ${b}^2 \\times ${c}$.`, mode: "nombre", prefixe: "Résultat :", attendu: v, erreurs: [{ valeur: (a + b) ** 2 * c, message: "Le carré ne porte que sur le nombre juste avant." }, { valeur: a + (b * c) ** 2, message: "On calcule d'abord la puissance, puis la multiplication." }],
        aides: ["Priorités : d'abord les puissances, puis les multiplications, puis les additions.", `$${b}^2 = ${b * b}$.`, `$${a} + ${b * b} \\times ${c}$.`], solution: `$${a} + ${b}^2 \\times ${c} = ${a} + ${b * b} \\times ${c} = ${a} + ${b * b * c} = ${v}$.` }; }
    if (t === 3) { const a = rand(2, 9), b = rand(1, 5), v = (a - b) ** 2; if (a <= b) return GEN["cl5-puissances"]();
      return { enonce: `Calcule $(${a} - ${b})^2$.`, mode: "nombre", prefixe: "Résultat :", attendu: v, erreurs: [{ valeur: a * a - b * b, message: "On calcule d'abord la parenthèse, puis le carré." }, { valeur: 2 * (a - b), message: "Le carré n'est pas le double." }],
        aides: ["Les parenthèses sont prioritaires.", `$${a} - ${b} = ${a - b}$.`, `$${a - b}^2 = ${a - b} \\times ${a - b}$.`], solution: `$(${a} - ${b})^2 = ${a - b}^2 = ${v}$.` }; }
    const s = rand(2, 12), q = rand(0, 1), fig = Math.random() < 0.5, obj = pick(["Un carré", "Une dalle carrée", "Un carreau de faïence carré", "Une parcelle carrée"]), u = obj === "Une parcelle carrée" ? "m" : "cm";
    return q ? { enonce: `${obj} a un côté de $${s}$ ${u}. Quelle est son aire, en ${u}² ?`, figure: fig && s <= 10 && u === "cm" ? carreQuad(s, `Carré de côté ${s} cm quadrillé en carreaux de 1 cm`) : undefined, mode: "nombre", prefixe: "Aire :", suffixe: `${u}²`, attendu: s * s, erreurs: [{ valeur: 4 * s, message: "Ça, c'est le périmètre." }, { valeur: 2 * s, message: `$${s}^2$ n'est pas $2 \\times ${s}$ : c'est $${s} \\times ${s}$.` }],
      aides: ["Aire d'un carré : côté $\\times$ côté.", `C'est $${s}^2$.`, `$${s} \\times ${s}$.`], solution: `$\\mathcal{A} = ${s}^2 = ${s * s}$ ${u}².` }
      : { enonce: `${pick(["Un cube", "Une boîte cubique", "Un dé", "Un bloc de glace cubique"])} a une arête de $${s}$ cm. Quel est son volume, en cm³ ?`, figure: fig && s <= 4 ? assemblage(Array.from({ length: s }, () => Array(s).fill(s))).replace(/aria-label="[^"]*"/, `aria-label="Cube d'arête ${s} cm formé de petits cubes de 1 cm"`) : undefined, mode: "nombre", prefixe: "Volume :", suffixe: "cm³", attendu: s ** 3, erreurs: [{ valeur: s * s, message: "Un volume se calcule avec trois longueurs : $a \\times a \\times a$." }, { valeur: 3 * s, message: `$${s}^3$ n'est pas $3 \\times ${s}$.` }],
        aides: ["Volume d'un cube : arête $\\times$ arête $\\times$ arête.", `C'est $${s}^3$.`, `$${s} \\times ${s} \\times ${s}$.`], solution: `$V = ${s}^3 = ${nb(s * s * s)}$ cm³.` };
  };

  GEN["cl5-ecriture"] = function () {
    const LETS = ["x", "a", "n", "y", "t", "b", "c", "k", "m", "p", "z"], x = pick(LETS), y = pick(LETS.filter((l) => l !== x)), a = rand(2, 9), b = rand(2, 9), t = rand(0, 9);
    const Q = [
      [`${a} \\times ${x}`, `${a}${x}`, [`${a} + ${x}`, `${x}^{${a}}`, `${a}${x}^2`]],
      [`${x} \\times ${x}`, `${x}^2`, [`2${x}`, `${x}${x}`, `${x} + ${x}`]],
      [`${x} \\times ${x} \\times ${x}`, `${x}^3`, [`3${x}`, `${x}^2`, `3${x}^3`]],
      [`${a} \\times ${x} \\times ${b}`, `${a * b}${x}`, [`${a}${x}${b}`, `${a + b}${x}`, `${a}${b}${x}`]],
      [`${x} \\times ${a} \\times ${y}`, `${a}${x}${y}`, [`${x}${a}${y}`, `${a} + ${x}${y}`, `${a}${x} + ${y}`]],
      [`${a} \\times ${x} \\times ${x}`, `${a}${x}^2`, [`${a * 2}${x}`, `(${a}${x})^2`, `${a}${x}${x}^2`]],
      [`${a} \\times ${x} \\times ${b} \\times ${x}`, `${a * b}${x}^2`, [`${a * b}${x}`, `${a + b}${x}^2`, `${a}${b}${x}^2`]],
      [`${x} + ${x} + ${x}`, `3${x}`, [`${x}^3`, `${x}3`, `3 + ${x}`]],
      [`${a} \\times (${x} + ${b})`, `${a}(${x} + ${b})`, [`${a}${x} + ${b}`, `${a + b}${x}`, `${a} + ${x}${b}`]],
      [`${x} \\times ${y} \\times ${x}`, `${x}^2${y}`, [`2${x}${y}`, `${x}${y}^2`, `${x}^2 + ${y}`]]
    ];
    const [e, bonne, faux] = Q[t];
    const { choix, attendu } = melange(`$${bonne}$`, faux.filter((f) => f !== bonne).map((f) => `$${f}$`));
    return { enonce: `Écris plus simplement : $${e}$`, mode: "choix", choix, attendu,
      aides: ["On peut supprimer le signe $\\times$ devant une lettre ou une parenthèse : $3 \\times x = 3x$.", `$${x} \\times ${x} = ${x}^2$ et $${x} \\times ${x} \\times ${x} = ${x}^3$.`, "Le nombre s'écrit en premier ; on multiplie les nombres entre eux."],
      solution: `$${e} = ${bonne}$.` };
  };

  GEN["cl5-substitution"] = function () {
    const x = pick(LET), v = rand(1, 9) * (Math.random() < 0.2 ? 1 : 1), t = rand(0, 4), a = rand(2, 9), b = rand(1, 12);
    const E = [
      [`${a}${x} + ${b}`, a * v + b, `${a} \\times ${v} + ${b} = ${a * v} + ${b}`, a * 10 + v + b],
      [`${a}(${x} + ${b})`, a * (v + b), `${a} \\times (${v} + ${b}) = ${a} \\times ${v + b}`, a * v + b],
      [`${x}^2 + ${b}`, v * v + b, `${v}^2 + ${b} = ${v * v} + ${b}`, 2 * v + b],
      [`${a}${x}^2`, a * v * v, `${a} \\times ${v}^2 = ${a} \\times ${v * v}`, (a * v) ** 2],
      [`${x}^2 - ${x}`, v * v - v, `${v}^2 - ${v} = ${v * v} - ${v}`, 0]
    ];
    const [e, r, etape, faux] = E[t];
    return { enonce: `Calcule $${e}$ pour $${x} = ${v}$.`, mode: "nombre", prefixe: "Résultat :", attendu: r,
      erreurs: faux !== r ? [{ valeur: faux, message: t === 0 ? `$${a}${x}$ signifie $${a} \\times ${x}$ : on n'écrit pas $${a}$ à côté de $${v}$.` : t === 1 ? "La parenthèse se calcule en premier." : t === 3 ? "Le carré ne porte que sur la lettre." : "Le carré n'est pas le double." }] : [],
      aides: [`Remplace $${x}$ par $${v}$ en rétablissant le signe $\\times$.`, "Respecte les priorités : parenthèses, puissances, multiplications, additions.", `$${etape}$.`], solution: `$${etape} = ${r}$.` };
  };

  GEN["cl5-developper"] = function () {
    const x = pick(LET), t = rand(0, 3), k = rand(2, 9), a = rand(1, 9), b = rand(1, 12), m = pick(["+", "-"]);
    if (t === 0) {
      const bonne = `${k}${x} ${m} ${k * b}`;
      const { choix, attendu } = melange(`$${bonne}$`, [`$${k}${x} ${m} ${b}$`, `$${k + b}${x}$`, `$${x} ${m} ${k * b}$`, `$${k}${x} ${m === "+" ? "-" : "+"} ${k * b}$`]);
      const fig = m === "+" && Math.random() < 0.4;
      return { enonce: fig ? `Développe $${k}(${x} ${m} ${b})$. La figure montre un rectangle de largeur $${k}$ et de longueur $${x} + ${b}$.` : `Développe $${k}(${x} ${m} ${b})$.`, figure: fig ? rectDistrib(k, x, b, { ka: "?", kb: "?", aria: `Rectangle de largeur ${k} et de longueur ${x} + ${b}, partagé en deux rectangles` }) : undefined, mode: "choix", choix, attendu,
        aides: ["Distributivité : $k(a + b) = ka + kb$ et $k(a - b) = ka - kb$.", `Le facteur $${k}$ multiplie **chaque** terme de la parenthèse.`, `$${k} \\times ${x} = ${k}${x}$ et $${k} \\times ${b} = ${k * b}$.`], solution: `$${k}(${x} ${m} ${b}) = ${k} \\times ${x} ${m} ${k} \\times ${b} = ${bonne}$.` };
    }
    if (t === 1) {
      const bonne = `${k}(${x} ${m} ${b})`;
      const { choix, attendu } = melange(`$${bonne}$`, [`$${k}(${x} ${m} ${k * b})$`, `$${b}(${k}${x} ${m} 1)$`.replace(`${b}(`, `${k * b}(`), `$${x}(${k} ${m} ${k * b})$`, `$${k}${x}(${m === "+" ? "" : "-"}${b})$`]);
      return { enonce: `Factorise $${k}${x} ${m} ${k * b}$.`, mode: "choix", choix, attendu,
        aides: ["Factoriser, c'est transformer une somme en produit : $ka + kb = k(a + b)$.", `Cherche un facteur commun aux deux termes : $${k}${x} = ${k} \\times ${x}$ et $${k * b} = ${k} \\times ${b}$.`, `Le facteur commun est $${k}$.`], solution: `$${k}${x} ${m} ${k * b} = ${k} \\times ${x} ${m} ${k} \\times ${b} = ${bonne}$.` };
    }
    const c = rand(2, 9), d = rand(2, 9), e = rand(1, 15), f2 = rand(1, 9);
    if (t === 2) {
      const A = c + d, bonne = affine(A, e, x);
      const { choix, attendu } = melange(`$${bonne}$`, [`$${A + e}${x}$`, `$${c * d}${x} + ${e}$`, `$${affine(A, 0, x)}$`, `$${A}${x}^2 + ${e}$`]);
      return { enonce: `Réduis $${c}${x} + ${d}${x} + ${e}$.`, mode: "choix", choix, attendu,
        aides: [`On ne peut additionner que les termes « en $${x}$ » entre eux, et les nombres entre eux.`, `$${c}${x} + ${d}${x} = (${c} + ${d})${x} = ${A}${x}$.`, `Le nombre $${e}$ reste seul.`], solution: `$${c}${x} + ${d}${x} + ${e} = ${A}${x} + ${e}$. On ne peut pas aller plus loin : $${A}${x}$ et $${e}$ ne sont pas « du même type ».` };
    }
    const A = c + d, B = e - f2, bonne = affine(A, B, x);
    const { choix, attendu } = melange(`$${bonne}$`, [`$${affine(A, e + f2, x)}$`, `$${affine(c - d || 1, B, x)}$`, `$${A + B}${x}$`, `$${affine(A, -B, x)}$`].filter((z) => z !== `$${bonne}$`));
    return { enonce: `Réduis $${c}${x} + ${e} + ${d}${x} - ${f2}$.`, mode: "choix", choix, attendu,
      aides: [`Regroupe les termes en $${x}$ : $${c}${x} + ${d}${x}$.`, `Regroupe les nombres : $${e} - ${f2}$.`, `$${c}${x} + ${d}${x} = ${A}${x}$ et $${e} - ${f2} = ${B}$.`], solution: `$${c}${x} + ${e} + ${d}${x} - ${f2} = ${c}${x} + ${d}${x} + ${e} - ${f2} = ${bonne}$.` };
  };

  GEN["cl5-raisonner"] = function () {
    const t = rand(0, 4), x = pick(["n", "x", "a", "y", "t", "k"]), a = rand(2, 9), b = rand(1, 12), c = rand(2, 9);
    if (t === 0) {
      const E = pick([[`${a}${x} + ${b}`, "une somme"], [`${a}(${x} + ${b})`, "un produit"], [`${x}^2 + ${b}`, "une somme"], [`${a}${x} - ${b}`, "une différence"], [`(${x} + ${b})(${x} - ${c})`, "un produit"], [`${b} + ${a}${x}`, "une somme"], [`${a}(${c}${x} - ${b})`, "un produit"], [`${x}^2 - ${b}`, "une différence"], [`\\dfrac{${x} + ${b}}{${a}}`, "un quotient"], [`${a} \\times ${x}^2`, "un produit"], [`(${x} - ${b}) \\times ${a}`, "un produit"], [`${b} - ${a}${x}`, "une différence"]]);
      const { choix, attendu } = melange(E[1], ["une somme", "un produit", "une différence", "un quotient"].filter((z) => z !== E[1]));
      return { enonce: `L'expression $${E[0]}$ est :`, mode: "choix", choix, attendu,
        aides: ["Comme pour les nombres, la nature est donnée par la **dernière** opération effectuée.", "Imagine que tu remplaces la lettre par un nombre : quelle opération ferais-tu en dernier ?", "$3(x + 5)$ : on calcule la parenthèse puis on multiplie."], solution: `$${E[0]}$ est ${E[1]} : c'est la dernière opération effectuée.` };
    }
    if (t === 1) {
      const k = rand(2, 9), m = rand(2, 5), M = ["", "", "double", "triple", "quadruple", "quintuple"][m];
      const P = pick([[`le ${M} de $n$`, `${m}n`, ["n^" + m, `n + ${m}`, `n \\div ${m}`]], ["le carré de $n$", "n^2", ["2n", "n + 2", "2 \\times n^2"]], ["le successeur de $n$ (le nombre entier qui suit)", "n + 1", ["n - 1", "2n", "1n"]], ["le prédécesseur de $n$", "n - 1", ["n + 1", "1 - n", "n \\div 1"]], [`le ${M} de $n$ augmenté de $${k}$`, `${m}n + ${k}`, [`${m}(n + ${k})`, `${m} + ${k}n`, `${k}n + ${m}`]], [`le ${M} de $n$ diminué de $${k}$`, `${m}n - ${k}`, [`${m}(n - ${k})`, `${k} - ${m}n`, `${m} - ${k}n`]], [`le ${M} de la somme de $n$ et de $${k}$`, `${m}(n + ${k})`, [`${m}n + ${k}`, `n + ${m} \\times ${k}`, `${m} + n + ${k}`]], ["un nombre pair (on note $n$ un nombre entier)", "2n", ["n + 2", "2n + 1", "n^2"]], ["un nombre impair (on note $n$ un nombre entier)", "2n + 1", ["2n", "n + 1", "n + 2"]], ["la moitié de $n$", "\\dfrac{n}{2}", ["2n", "n - 2", "n^2"]], ["le cube de $n$", "n^3", ["3n", "n \\times 3", "n^2"]], [`le carré de $n$ augmenté de $${k}$`, `n^2 + ${k}`, [`(n + ${k})^2`, `2n + ${k}`, `n^2 + ${k}n`]], [`la somme de $n$ et de son successeur`, "2n + 1", ["n + 1", "2n", "n^2 + 1"]], [`un multiple de $${k}$ (on note $n$ un nombre entier)`, `${k}n`, [`n + ${k}`, `n^${k}`, `\\dfrac{n}{${k}}`]]]);
      const { choix, attendu } = melange(`$${P[1]}$`, P[2].map((z) => `$${z}$`));
      return { enonce: `Quelle expression représente ${P[0]} ?`, mode: "choix", choix, attendu,
        aides: ["Teste avec un nombre, par exemple $n = 5$.", "Double : $\\times 2$ ; triple : $\\times 3$ ; carré : $n \\times n$.", "Successeur : $+1$ ; prédécesseur : $-1$ ; « de la somme » : des parenthèses."], solution: `${P[0][0].toUpperCase() + P[0].slice(1)} s'écrit $${P[1]}$.` };
    }
    if (t === 2) {
      const k = 2 * rand(1, 4) + 1, kp = 2 * rand(1, 5), P0 = prenom(), r = (v) => +v.toFixed(4);
      // [affirmation, contre-exemples possibles, nombres qui vérifient l'affirmation, explication pour le contre-exemple v]
      const C = pick([
        ["« Pour tout nombre $x$, $x^2$ est plus grand que $x$. »", [0, 1, 0.5, 0.2, 0.1], [2, 3, 4, 5, 10, 1.5], (v) => `$${nb(v)}^2 = ${nb(r(v * v))}$ n'est pas plus grand que $${nb(v)}$`],
        ["« Pour tout nombre $x$, $2x$ est plus grand que $x + 1$. »", [0, 0.5, 1], [2, 3, 5, 10, 4], (v) => `$2 \\times ${nb(v)} = ${nb(2 * v)}$ et $${nb(v)} + 1 = ${nb(v + 1)}$ : ce n'est pas « plus grand »`],
        ["« Pour tout nombre $x$, $x^2 + 1$ est plus grand que $2x$. »", [1], [0, 2, 3, 4, 5], () => "$1^2 + 1 = 2$ et $2 \\times 1 = 2$ : ce n'est pas « plus grand »"],
        ["« Pour tout nombre entier $n$, $n^2 + 1$ est un nombre pair. »", [2, 4, 6, 8], [1, 3, 5, 7], (v) => `$${v}^2 + 1 = ${v * v + 1}$ est impair`],
        ["« Pour tout nombre $x$, $x^2 = 2x$. »", [1, 3, 4, 5], [0, 2], (v) => `$${v}^2 = ${v * v}$ et $2 \\times ${v} = ${2 * v}$`],
        [`« Pour tout nombre $x$, $${k}x$ est plus grand que $x$. »`, [0], [1, 2, 5, 10, 0.5], () => `$${k} \\times 0 = 0$ : ce n'est pas plus grand que $0$`],
        [`« Pour tout nombre entier $n$, $n + ${kp}$ est un nombre pair. »`, [1, 3, 5, 7, 9], [2, 4, 6, 8, 10], (v) => `$${v} + ${kp} = ${v + kp}$ est impair`],
        [`« Pour tout nombre entier $n$, $${k}n$ est un nombre pair. »`, [1, 3, 5, 7], [2, 4, 6, 8], (v) => `$${k} \\times ${v} = ${k * v}$ est impair`],
        [`« Pour tout nombre entier $n$, $n^2$ est plus grand que $${k}n$. »`, Array.from({ length: k }, (_, i) => i + 1).slice(0, 5), [k + 1, k + 2, k + 4, 2 * k], (v) => `$${v}^2 = ${v * v}$ et $${k} \\times ${v} = ${k * v}$ : ce n'est pas « plus grand »`]
      ]);
      const bonne = pick(C[1]), autres = shuffle(C[2].slice()).slice(0, 3);
      const { choix, attendu } = melange(`$${nb(bonne)}$`, autres.map((v) => `$${nb(v)}$`));
      return { enonce: `${P0.nom} affirme : ${C[0]} Quel nombre est un contre-exemple qui prouve qu'${P0.il} a tort ?`, mode: "choix", choix, attendu,
        aides: ["Un contre-exemple est **un seul** cas où l'affirmation est fausse.", "Teste l'affirmation avec chacun des nombres proposés.", "Un seul nombre suffit à prouver que l'affirmation est fausse."], solution: `Avec $${nb(bonne)}$ : ${C[3](bonne)}. Ce contre-exemple suffit : l'affirmation est fausse.` };
    }
    if (t === 3) {
      const a = rand(2, 9), b = rand(1, 9), v = rand(1, 9), ok = Math.random() < 0.5, c = ok ? a * v + b : a * v + b + pick([-2, -1, 1, 2]);
      const choix = [`Oui, car $${a} \\times ${v} + ${b} = ${c}$`, `Non, car $${a} \\times ${v} + ${b} = ${a * v + b}$`, `Oui, car $${a}${v} + ${b} = ${a * 10 + v + b}$`];
      if (!ok) choix[0] = `Oui, car $${c}$ est proche de $${a * v + b}$`; else choix[1] = "Non, car on ne peut pas calculer avec une lettre";
      return { enonce: `L'égalité $${a}${x} + ${b} = ${c}$ est-elle vraie pour $${x} = ${v}$ ?`, mode: "choix", choix, attendu: ok ? 0 : 1,
        aides: [`Remplace $${x}$ par $${v}$ dans le membre de gauche.`, `$${a} \\times ${v} + ${b}$.`, `Compare le résultat avec $${c}$.`], solution: `Pour $${x} = ${v}$ : $${a} \\times ${v} + ${b} = ${a * v + b}$. ${ok ? "L'égalité est vraie." : `$${a * v + b} \\neq ${c}$ : l'égalité est fausse.`}` };
    }
    const k = rand(2, 9), m = rand(2, 5), L = pick(["n", "k", "p", "m"].filter((l) => l !== "k" || true)), M = ["", "", "double", "triple", "quadruple", "quintuple"][m];
    const P = pick([[`la somme de deux nombres entiers consécutifs $${L}$ et $${L} + 1$`, `2${L} + 1`, "un nombre impair", [`2${L}`, `${L} + 1`, `2(${L} + 1)`]], [`la somme de trois nombres entiers consécutifs $${L}$, $${L} + 1$ et $${L} + 2$`, `3${L} + 3`, `un multiple de $3$, car $3${L} + 3 = 3(${L} + 1)$`, [`3${L}`, `${L} + 3`, `3${L} + 2`]], [`la somme d'un nombre $${L}$ et de son ${M}`, `${m + 1}${L}`, `un multiple de $${m + 1}$`, [`${m}${L}`, `${L}^2 + ${L}`, `${L} + ${m}`]], [`le double de $${L}$ plus $${k * 2}$`, `2${L} + ${2 * k}`, `un nombre pair, car $2${L} + ${2 * k} = 2(${L} + ${k})$`, [`2(${L} + ${2 * k})`, `${L} + ${2 * k}`, `2${L} + ${k}`]], [`la somme de quatre nombres entiers consécutifs $${L}$, $${L} + 1$, $${L} + 2$ et $${L} + 3$`, `4${L} + 6`, `un nombre pair, car $4${L} + 6 = 2(2${L} + 3)$`, [`4${L}`, `4${L} + 4`, `${L} + 6`]], [`la somme de trois nombres pairs consécutifs $2${L}$, $2${L} + 2$ et $2${L} + 4$`, `6${L} + 6`, `un multiple de $6$, car $6${L} + 6 = 6(${L} + 1)$`, [`6${L}`, `2${L} + 6`, `6${L} + 4`]], [`le triple de $${L}$ plus $${3 * k}$`, `3${L} + ${3 * k}`, `un multiple de $3$, car $3${L} + ${3 * k} = 3(${L} + ${k})$`, [`3(${L} + ${3 * k})`, `${L} + ${3 * k}`, `3${L} + ${k}`]]]);
    const { choix, attendu } = melange(`$${P[1]}$`, P[3].map((z) => `$${z}$`));
    return { enonce: `Quelle expression réduite est égale à ${P[0]} ?`, mode: "choix", choix, attendu,
      aides: ["Écris la somme avec les lettres, puis réduis-la.", `Regroupe les termes en $${L}$ et les nombres.`, `Vérifie avec $${L} = 1$.`], solution: `On obtient $${P[1]}$ : c'est toujours ${P[2]}. Le calcul littéral permet de le **démontrer** pour tous les nombres entiers $${L}$.` };
  };

  /* =====================================================================
     Chapitre 12 : parallélogrammes (pg5-)
     ===================================================================== */
  const NOMS4 = [["A", "B", "C", "D"], ["E", "F", "G", "H"], ["M", "N", "P", "Q"], ["R", "S", "T", "U"], ["I", "J", "K", "L"]];
  // Quadrilatère codé : type parmi parallelogramme, rectangle, losange, carre ; codes selon ce qu'on montre
  function figureQuad(type, noms, montrer) {
    const [A, B, C, D] = noms, o = rand(-15, 15) * DEG;
    let P;
    if (type === "parallelogramme") P = [[50, 150], [210, 150], [270, 60], [110, 60]];
    if (type === "rectangle") P = [[60, 150], [260, 150], [260, 60], [60, 60]];
    if (type === "losange") P = [[160, 175], [235, 105], [160, 35], [85, 105]];
    if (type === "carre") P = [[95, 165], [225, 165], [225, 35], [95, 35]];
    const g = [160, 105], rot = ([x, y]) => [+(g[0] + (x - g[0]) * Math.cos(o) - (y - g[1]) * Math.sin(o)).toFixed(1), +(g[1] + (x - g[0]) * Math.sin(o) + (y - g[1]) * Math.cos(o)).toFixed(1)];
    P = P.map(rot);
    const pts = { [A]: P[0], [B]: P[1], [C]: P[2], [D]: P[3] }, Oc = [(P[0][0] + P[2][0]) / 2, (P[0][1] + P[2][1]) / 2].map((v) => +v.toFixed(1));
    const opt = { W: 320, H: 205, pts, segs: [[A, B], [B, C], [C, D], [D, A]], codes: [], droitAngle: [], caches: [], decal: {} };
    noms.forEach((n, i) => { const dx = P[i][0] - g[0], dy = P[i][1] - g[1], L = Math.hypot(dx, dy); opt.decal[n] = [Math.round((dx / L) * 13) - 3, Math.round((dy / L) * 13) + 4]; });
    if (montrer === "diagonales") { pts.O = Oc; opt.decal.O = [7, 14]; opt.segs.push([A, C], [B, D]); opt.codes.push([A, "O", 1], ["O", C, 1], [B, "O", 2], ["O", D, 2]);
      if (type === "rectangle" || type === "carre") { opt.codes = [[A, "O", 1], ["O", C, 1], [B, "O", 1], ["O", D, 1]]; }
      if (type === "losange" || type === "carre") opt.droitAngle.push([A, "O", B]); }
    else { // côtés
      if (type === "losange" || type === "carre") opt.codes.push([A, B, 1], [B, C, 1], [C, D, 1], [D, A, 1]); else opt.codes.push([A, B, 1], [C, D, 1], [B, C, 2], [D, A, 2]);
      if (type === "rectangle" || type === "carre") opt.droitAngle.push([B, A, D]); }
    return geo(Object.assign(opt, { aria: `Quadrilatère ${noms.join("")} codé` }));
  }
  const NOMS_Q = { parallelogramme: "un parallélogramme", rectangle: "un rectangle", losange: "un losange", carre: "un carré" };
  /* Parallélogramme ABCD de côtés AB = a et AD = b (unités quelconques), angle en A = al (degrés), dessiné à l'échelle ;
     o = { labels: [[P, Q, texte]], angles: [[indice du sommet, texte]], diag: nom du centre (diagonales tracées), codesDiag, aria } */
  function figPara(N, a, b, al, o) {
    o = o || {};
    const [A, B, C, D] = N, u = [Math.cos(al * DEG), -Math.sin(al * DEG)], raw = [[0, 0], [a, 0], [a + b * u[0], b * u[1]], [b * u[0], b * u[1]]];
    const xs = raw.map((p) => p[0]), ys = raw.map((p) => p[1]), k = Math.min(250 / (Math.max(...xs) - Math.min(...xs)), 140 / (Math.max(...ys) - Math.min(...ys))), ox = 160 - (k * (Math.max(...xs) + Math.min(...xs))) / 2, oy = 100 - (k * (Math.max(...ys) + Math.min(...ys))) / 2;
    const P = raw.map(([x, y]) => [+(ox + k * x).toFixed(1), +(oy + k * y).toFixed(1)]), pts = { [A]: P[0], [B]: P[1], [C]: P[2], [D]: P[3] }, G = [(P[0][0] + P[2][0]) / 2, (P[0][1] + P[2][1]) / 2];
    const g = { W: 320, H: 200, pts, segs: [[A, B], [B, C], [C, D], [D, A]], codes: o.codes || [], droitAngle: o.droit || [], decal: decaler(pts, G, 13), aria: o.aria || `Parallélogramme ${N.join("")}` };
    if (o.diag) { pts[o.diag] = [+G[0].toFixed(1), +G[1].toFixed(1)]; g.segs.push([A, C], [B, D]); g.decal[o.diag] = libreO(G, P); if (o.codesDiag !== false) g.codes.push([A, o.diag, 1], [o.diag, C, 1], [B, o.diag, 2], [o.diag, D, 2]); }
    let s = geoAuto(g, o.labels || []);
    const add = (o.angles || []).map(([i, t]) => arcAngle(P[i], P[(i + 1) % 4], P[(i + 3) % 4], 15) + texteAngle(P[i], P[(i + 1) % 4], P[(i + 3) % 4], t)).join("");
    return add ? s.replace("</svg>", () => add + "</svg>") : s;
  }
  FIGURES["pg5-cours-demontrer"] = () => { const pts = { E: [52, 150], F: [196, 160], G: [268, 50], H: [124, 40], I: [160, 100] }; return geo5({ W: 320, H: 196, pts, segs: [["E", "F"], ["F", "G"], ["G", "H"], ["H", "E"], ["E", "G"], ["F", "H"]], codes: [["E", "I", 1], ["I", "G", 1], ["F", "I", 2], ["I", "H", 2]], decal: Object.assign(decaler(pts, [160, 100]), { I: [10, 4] }), aria: "Quadrilatère EFGH dont les diagonales [EG] et [FH] ont le même milieu I : c'est un parallélogramme" }); };
  FIGURES["pg5-methode-particuliers"] = () => {
    const mini = (dx, type, titre) => { const c = [dx + 50, 74], h = type === "losange" ? [38, 58] : type === "carre" ? [42, 42] : [50, 34], P = type === "rectangle" ? [[c[0] - 44, c[1] - 30], [c[0] + 44, c[1] - 30], [c[0] + 44, c[1] + 30], [c[0] - 44, c[1] + 30]] : [[c[0], c[1] - h[1]], [c[0] + h[0], c[1]], [c[0], c[1] + h[1]], [c[0] - h[0], c[1]]];
      let s = `<polygon class="g-poly" points="${P.map((p) => p.join(",")).join(" ")}"/><line class="g-segment" x1="${P[0][0]}" y1="${P[0][1]}" x2="${P[2][0]}" y2="${P[2][1]}" style="stroke-width:1.2"/><line class="g-segment" x1="${P[1][0]}" y1="${P[1][1]}" x2="${P[3][0]}" y2="${P[3][1]}" style="stroke-width:1.2"/>`;
      // codage des demi-diagonales (même longueur : un trait ; losange : un trait et deux traits) et angle droit au centre
      P.forEach((p, i) => { const m = [(p[0] + c[0]) / 2, (p[1] + c[1]) / 2], d = [p[0] - c[0], p[1] - c[1]], L = Math.hypot(...d), n = [-d[1] / L, d[0] / L], nb2 = type === "losange" && i % 2 ? 2 : 1;
        for (let j = 0; j < nb2; j++) { const off = (j - (nb2 - 1) / 2) * 4, q = [m[0] + (d[0] / L) * off, m[1] + (d[1] / L) * off]; s += `<line class="g-code" x1="${+(q[0] - n[0] * 5).toFixed(1)}" y1="${+(q[1] - n[1] * 5).toFixed(1)}" x2="${+(q[0] + n[0] * 5).toFixed(1)}" y2="${+(q[1] + n[1] * 5).toFixed(1)}"/>`; } });
      if (type !== "rectangle") s += `<path class="g-code" d="M${c[0] + 8} ${c[1]} V${c[1] - 8} H${c[0]}"/>`;
      return s + `<text class="g-label" x="${dx + 50}" y="160" text-anchor="middle">${titre}</text>`; };
    return `<svg class="graph" viewBox="0 0 320 168" role="img" aria-label="Rectangle : diagonales de même longueur ; losange : diagonales perpendiculaires ; carré : diagonales de même longueur et perpendiculaires">${mini(4, "rectangle", "rectangle")}${mini(110, "losange", "losange")}${mini(216, "carre", "carré")}</svg>`;
  };
  FIGURES["pg5-diagonales"] = () => figureQuad("parallelogramme", ["A", "B", "C", "D"], "diagonales").replace(/<svg[^>]*>/, (m) => m);
  FIGURES["pg5-losange"] = () => figureQuad("losange", ["A", "B", "C", "D"], "diagonales");

  GEN["pg5-proprietes"] = function () {
    const N = pick(NOMS4), [A, B, C, D] = N, t = rand(0, 4), x = Dc(rand(15, 95), 1), X1 = tD(x), xv = x.m / 10, fig = Math.random() < 0.6, al = pick([rand(50, 80), rand(100, 130)]), cm = (v) => `${nbTexte(v)} cm`;
    if (t === 0) { const b = +(xv * rand(5, 9) / 10).toFixed(1);
      return { enonce: `$${A}${B}${C}${D}$ est un parallélogramme et $${A}${B} = ${X1}$ cm. Combien mesure $${C}${D}$ ?`, figure: fig ? figPara(N, xv, b, al, { labels: [[A, B, cm(xv)], [C, D, "?"]] }) : undefined, mode: "nombre", prefixe: `$${C}${D} =$`, suffixe: "cm", attendu: xv,
        erreurs: [{ valeur: 2 * xv, message: "Les côtés opposés ont la **même** longueur : on ne double pas." }, { valeur: xv / 2, message: "Les côtés opposés ont la **même** longueur." }],
        aides: ["Dans un parallélogramme, les côtés opposés ont la même longueur.", `$[${A}${B}]$ et $[${C}${D}]$ sont des côtés opposés.`, "Aucun calcul n'est nécessaire."], solution: `Les côtés opposés d'un parallélogramme ont la même longueur : $${C}${D} = ${A}${B} = ${X1}$ cm.` }; }
    if (t === 1) { const d = Dc(x.m * 2, 1);
      return { enonce: `$${A}${B}${C}${D}$ est un parallélogramme de centre $O$ et $${A}${C} = ${tD(d)}$ cm. Combien mesure $${A}O$ ?`, figure: fig ? figPara(N, rand(6, 10), rand(4, 7), al, { diag: "O", labels: [[A, "O", "?"]] }) : undefined, mode: "nombre", prefixe: `$${A}O =$`, suffixe: "cm", attendu: xv, erreurs: [{ valeur: d.m / 10, message: "$O$ est le milieu de la diagonale : $AO$ en est la moitié." }, { valeur: 2 * d.m / 10, message: `$O$ est le milieu de $[${A}${C}]$ : $${A}O$ est la **moitié** de $${A}${C}$.` }],
        aides: ["Les diagonales d'un parallélogramme se coupent en leur milieu.", `$O$ est donc le milieu de $[${A}${C}]$.`, `$${A}O = ${A}${C} \\div 2$.`], solution: `$O$ est le milieu de $[${A}${C}]$ : $${A}O = ${tD(d)} \\div 2 = ${X1}$ cm.` }; }
    if (t === 2) { const a = rand(30, 150); if (a === 90) return GEN["pg5-proprietes"]();
      const q = rand(0, 1);
      return { enonce: `$${A}${B}${C}${D}$ est un parallélogramme et $\\widehat{${D}${A}${B}} = ${a}^\\circ$. Combien mesure $\\widehat{${q ? `${B}${C}${D}` : `${A}${B}${C}`}}$ ?`, figure: fig ? figPara(N, rand(7, 10), rand(4, 6), a, { angles: [[0, `${a}°`], [q ? 2 : 1, "?"]] }) : undefined, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: q ? a : 180 - a,
        erreurs: [{ valeur: q ? 180 - a : a, message: q ? "Les angles opposés d'un parallélogramme sont égaux." : "Deux angles consécutifs d'un parallélogramme sont supplémentaires." }, { valeur: 360 - a, message: "Deux angles consécutifs ont une somme de $180^\\circ$, pas de $360^\\circ$." }],
        aides: ["Dans un parallélogramme, deux angles opposés ont la même mesure.", "Deux angles consécutifs sont supplémentaires (leur somme vaut $180^\\circ$), car les côtés opposés sont parallèles.", q ? `$\\widehat{${A}}$ et $\\widehat{${C}}$ sont opposés.` : `$\\widehat{${A}}$ et $\\widehat{${B}}$ sont consécutifs.`],
        solution: q ? `$\\widehat{${A}}$ et $\\widehat{${C}}$ sont opposés : $\\widehat{${B}${C}${D}} = ${a}^\\circ$.` : `$\\widehat{${A}}$ et $\\widehat{${B}}$ sont consécutifs : $\\widehat{${A}${B}${C}} = 180^\\circ - ${a}^\\circ = ${180 - a}^\\circ$.` }; }
    if (t === 3) { const a = rand(3, 15), b = rand(2, a);
      return { enonce: `$${A}${B}${C}${D}$ est un parallélogramme avec $${A}${B} = ${a}$ cm et $${B}${C} = ${b}$ cm. Quel est son périmètre ?`, figure: fig ? figPara(N, a, b, al, { labels: [[A, B, cm(a)], [B, C, cm(b)]] }) : undefined, mode: "nombre", prefixe: "Périmètre :", suffixe: "cm", attendu: 2 * (a + b), erreurs: [{ valeur: a + b, message: "Il y a quatre côtés : chaque longueur apparaît deux fois." }, { valeur: a * b, message: "On additionne les côtés, on ne les multiplie pas : le périmètre est la longueur du tour." }],
        aides: ["Les côtés opposés ont la même longueur.", `$${C}${D} = ${a}$ cm et $${D}${A} = ${b}$ cm.`, "Additionne les quatre côtés."], solution: `$2 \\times (${a} + ${b}) = ${2 * (a + b)}$ cm.` }; }
    const c = rand(2, 15), type = pick(["losange", "carre"]);
    return { enonce: `$${A}${B}${C}${D}$ est ${NOMS_Q[type]} de côté $${c}$ cm. Quel est son périmètre ?`, figure: fig ? figPara(N, 1, 1, type === "carre" ? 90 : al, { codes: [[A, B, 1], [B, C, 1], [C, D, 1], [D, A, 1]], droit: type === "carre" ? [[B, A, D]] : [], labels: [[A, B, cm(c)]], aria: `${type === "carre" ? "Carré" : "Losange"} ${N.join("")} de côté ${c} cm` }) : undefined, mode: "nombre", prefixe: "Périmètre :", suffixe: "cm", attendu: 4 * c, erreurs: [{ valeur: c * c, message: "Ça, ce serait l'aire d'un carré. Le périmètre est la longueur du tour." }, { valeur: 2 * c, message: `Il y a **quatre** côtés de $${c}$ cm.` }],
      aides: [`Un ${type === "carre" ? "carré" : "losange"} a quatre côtés de même longueur.`, "Le périmètre est la somme des quatre côtés.", `$4 \\times ${c}$.`], solution: `$4 \\times ${c} = ${4 * c}$ cm.` };
  };

  GEN["pg5-nature"] = function () {
    const [A, B, C, D] = pick(NOMS4), t = rand(0, 1);
    if (t === 0) {
      const type = pick(["parallelogramme", "rectangle", "losange", "carre"]), montrer = pick(["diagonales", "cotes"]);
      const choix = ["un parallélogramme quelconque", "un rectangle", "un losange", "un carré"], k = ["parallelogramme", "rectangle", "losange", "carre"].indexOf(type);
      const expl = montrer === "diagonales" ? ["Les diagonales ont le même milieu : c'est un parallélogramme. Rien de plus n'est codé.", "Les diagonales ont le même milieu et la même longueur : c'est un rectangle.", "Les diagonales ont le même milieu et sont perpendiculaires : c'est un losange.", "Les diagonales ont le même milieu, la même longueur et sont perpendiculaires : c'est un carré."][k]
        : ["Les côtés opposés ont la même longueur (deux à deux) : c'est un parallélogramme.", "Les côtés opposés ont la même longueur et il y a un angle droit : c'est un rectangle.", "Les quatre côtés ont la même longueur : c'est un losange.", "Les quatre côtés ont la même longueur et il y a un angle droit : c'est un carré."][k];
      return { enonce: `D'après les codages, quelle est la nature du quadrilatère $${A}${B}${C}${D}$ ?`, figure: figureQuad(type, [A, B, C, D], montrer), mode: "choix", choix, attendu: k,
        aides: ["Ne te fie qu'aux codages, pas à l'allure du dessin.", "Diagonales de même milieu : parallélogramme. De même longueur en plus : rectangle. Perpendiculaires en plus : losange. Les deux : carré.", "Côtés opposés égaux : parallélogramme. Quatre côtés égaux : losange. Un angle droit en plus : rectangle ou carré."], solution: expl };
    }
    const F = pick([
      ["Ses diagonales ont le même milieu.", 0], ["Ses côtés opposés sont parallèles deux à deux.", 0], ["Ses côtés opposés ont la même longueur deux à deux.", 0],
      ["Ses diagonales ont le même milieu et la même longueur.", 1], ["C'est un parallélogramme qui a un angle droit.", 1],
      ["Ses diagonales ont le même milieu et sont perpendiculaires.", 2], ["Ses quatre côtés ont la même longueur.", 2], ["C'est un parallélogramme qui a deux côtés consécutifs de même longueur.", 2],
      ["Ses diagonales ont le même milieu, la même longueur et sont perpendiculaires.", 3], ["C'est un losange qui a un angle droit.", 3], ["C'est un rectangle dont les diagonales sont perpendiculaires.", 3]
    ]);
    const choix = ["un parallélogramme (on ne peut pas en dire plus)", "un rectangle", "un losange", "un carré"];
    return { enonce: `On sait seulement ceci sur le quadrilatère $${A}${B}${C}${D}$ : « ${F[0]} » Que peut-on affirmer ?`, mode: "choix", choix, attendu: F[1],
      aides: ["Parallélogramme : diagonales de même milieu, ou côtés opposés parallèles, ou côtés opposés de même longueur.", "Rectangle : parallélogramme avec un angle droit, ou diagonales de même longueur. Losange : parallélogramme avec deux côtés consécutifs égaux, ou diagonales perpendiculaires.", "Carré : à la fois rectangle et losange."], solution: `« ${F[0]} » : on peut affirmer que c'est ${choix[F[1]].replace(" (on ne peut pas en dire plus)", "")}${F[1] === 0 ? ", sans pouvoir en dire plus" : ""}.` };
  };

  GEN["pg5-construire"] = function () {
    for (let e = 0; e < 500; e++) {
      const A = [rand(1, 6), rand(1, 4)], B = [A[0] + rand(3, 5), A[1] + rand(-1, 1)], C = [B[0] + rand(-2, 2), B[1] + rand(2, 3)];
      const D = [A[0] + C[0] - B[0], A[1] + C[1] - B[1]];
      const F = [[B[0] + C[0] - A[0], B[1] + C[1] - A[1]], [A[0] + B[0] - C[0], A[1] + B[1] - C[1]], [D[0] + pick([-2, 2]), D[1] + pick([-1, 1])], [D[0] + pick([-1, 1]), D[1] + pick([-2, 2])]];
      const dedans = ([x, y]) => x >= 1 && x <= 10 && y >= 1 && y <= 6; // pas de point sur le bord : son nom serait coupé
      if (![B, C].every(dedans)) continue;
      const cand = [D, ...F].filter(dedans);
      if (cand[0] !== D) continue;
      const uniq = []; cand.forEach((p) => { if (!uniq.some((q) => Math.abs(q[0] - p[0]) + Math.abs(q[1] - p[1]) < 2) && ![A, B, C].some((q) => q[0] === p[0] && q[1] === p[1])) uniq.push(p); });
      if (uniq.length < 4 || uniq[0] !== D) continue;
      const L = shuffle(uniq.slice(0, 4).map((p, i) => ({ p, ok: i === 0 }))), noms = ["E", "F", "G", "H"], bon = L.findIndex((z) => z.ok);
      return { enonce: "Quel point faut-il prendre comme point $D$ pour que $ABCD$ soit un parallélogramme ?", figure: grilleC({ polys: [], points: [["A", A], ["B", B], ["C", C], ...L.map((z, i) => [noms[i], z.p, "g-point"])], aria: "Quadrillage avec les points A, B, C et quatre points E, F, G, H" }).replace("</svg>", `<polyline class="g-segment" points="${[A, B, C].map(([x, y]) => `${8 + x * 24},${8 + (8 - y) * 24}`).join(" ")}" fill="none"/></svg>`), mode: "choix", choix: noms.map((n) => `$${n}$`), attendu: bon,
        aides: ["Dans le parallélogramme $ABCD$, les côtés $[AB]$ et $[DC]$ sont parallèles et de même longueur : on va de $D$ à $C$ comme de $A$ à $B$.", "Compte les carreaux pour aller de $B$ à $A$.", "Fais le même déplacement à partir de $C$ : tu arrives en $D$."],
        solution: `On va de $B$ à $A$ par $${A[0] - B[0]}$ carreau(x) horizontalement et $${A[1] - B[1]}$ verticalement ; le même déplacement à partir de $C$ mène au point $${noms[bon]}$. Attention à l'ordre des lettres : $ABCD$ se lit en tournant.` };
    }
  };

  GEN["pg5-demontrer"] = function () {
    const N = pick(NOMS4), [A, B, C, D] = N, t = rand(0, 17), L = rand(3, 12), L2 = L + rand(1, 5), ang = rand(2, 17) * 5;
    if (t >= 8) {
      // réciproque d'une propriété : [nature, conclusion, hypothèse de la réciproque, autre hypothèse (fausse)]
      const T = pick([["un rectangle", "ses diagonales ont la même longueur", "a des diagonales de même longueur", "ses diagonales sont perpendiculaires"], ["un losange", "ses diagonales sont perpendiculaires", "a des diagonales perpendiculaires", "ses diagonales ont la même longueur"], ["un carré", "ses diagonales ont la même longueur et sont perpendiculaires", "a des diagonales de même longueur et perpendiculaires", "ses diagonales ont le même milieu"], ["un losange", "ses quatre côtés ont la même longueur", "a deux côtés consécutifs de même longueur", "ses angles sont tous droits"]]);
      const REC = [`Quelle est la réciproque de la propriété : « Si un parallélogramme est ${T[0]}, alors ${T[1]} » ?`, `Si un parallélogramme ${T[2]}, alors c'est ${T[0]}.`, [`Si un parallélogramme n'est pas ${T[0]}, alors il n'a pas cette propriété.`, `Si ${T[0]} a des diagonales, alors ${T[1]}.`, `Si ${T[3]}, alors c'est ${T[0]}.`], "On échange ce qu'on sait (« si ») et ce qu'on conclut (« alors »)."];
      const Q2 = [
        [`$${A}${B}${C}${D}$ est un parallélogramme et $${A}${B} = ${B}${C} = ${L}$ cm. C'est donc :`, "un losange", ["un rectangle", "un carré", "un parallélogramme quelconque"], "Un parallélogramme qui a deux côtés consécutifs de même longueur est un losange."],
        [`$${A}${B}${C}${D}$ est un rectangle dont les diagonales sont perpendiculaires. C'est donc :`, "un carré", ["un losange seulement", "un rectangle seulement", "un trapèze"], "Un rectangle qui a des diagonales perpendiculaires est aussi un losange : c'est un carré."],
        [`Les quatre côtés du quadrilatère $${A}${B}${C}${D}$ mesurent $${L}$ cm. C'est :`, "un losange", ["un carré, forcément", "un rectangle", "un trapèze"], "Un quadrilatère qui a quatre côtés de même longueur est un losange (pas forcément un carré : il faudrait un angle droit)."],
        [`Le quadrilatère $${A}${B}${C}${D}$ a trois angles droits. C'est :`, "un rectangle", ["un losange", "un parallélogramme quelconque", "un carré, forcément"], "Avec trois angles droits, le quatrième l'est aussi (la somme vaut $360^\\circ$) : c'est un rectangle."],
        [`D'après le codage, que peut-on affirmer sur $${A}${B}${C}${D}$ ?`, "c'est un rectangle", ["c'est un losange", "c'est un carré", "on ne peut rien affirmer"], "Les diagonales ont le même milieu (parallélogramme) et la même longueur : c'est un rectangle.", figureQuad("rectangle", N, "diagonales")],
        [`D'après le codage, que peut-on affirmer sur $${A}${B}${C}${D}$ ?`, "c'est un losange", ["c'est un rectangle", "c'est un carré", "on ne peut rien affirmer"], "Les diagonales ont le même milieu (parallélogramme) et sont perpendiculaires : c'est un losange.", figureQuad("losange", N, "diagonales")],
        [`D'après le codage, que peut-on affirmer sur $${A}${B}${C}${D}$ ?`, "c'est un parallélogramme", ["c'est un rectangle", "c'est un losange", "on ne peut rien affirmer"], "Les côtés opposés ont la même longueur deux à deux : c'est un parallélogramme. Rien de plus n'est codé.", figureQuad("parallelogramme", N, "cotes")],
        REC,
        [`Les diagonales $[${A}${C}]$ et $[${B}${D}]$ du quadrilatère $${A}${B}${C}${D}$ n'ont pas le même milieu. Que peut-on dire ?`, `$${A}${B}${C}${D}$ n'est pas un parallélogramme`, [`$${A}${B}${C}${D}$ est un parallélogramme`, `$${A}${B}${C}${D}$ est un rectangle`, "on ne peut rien dire"], "Les diagonales d'un parallélogramme ont toujours le même milieu : ici ce n'est pas le cas, donc ce n'est pas un parallélogramme."],
        [`$${A}${B}${C}${D}$ est un parallélogramme avec $${A}${C} = ${B}${D} = ${L2}$ cm. C'est donc :`, "un rectangle", ["un losange", "un carré", "un parallélogramme quelconque"], "Un parallélogramme dont les diagonales ont la même longueur est un rectangle."]
      ];
      const [q, bonne, faux, expl, figure] = Q2[t - 8];
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: q, figure, mode: "choix", choix, attendu,
        aides: ["Repère d'abord ce que tu sais : codage, longueurs, angles, parallélisme.", "Parallélogramme : diagonales de même milieu, ou côtés opposés égaux, ou côtés opposés parallèles. Rectangle : un angle droit ou des diagonales de même longueur. Losange : deux côtés consécutifs égaux ou des diagonales perpendiculaires.", "Carré : à la fois rectangle et losange."], solution: `Réponse : ${bonne.replace(/[.]$/, "")}. ${expl}` };
    }
    const Q = [
      [`On sait que $${A}${B} = ${C}${D}$ et $${A}${D} = ${B}${C}$ (le quadrilatère n'est pas croisé). Que peut-on en déduire ?`, `$${A}${B}${C}${D}$ est un parallélogramme`, [`$${A}${B}${C}${D}$ est un rectangle`, `$${A}${B}${C}${D}$ est un losange`, "on ne peut rien en déduire"]],
      [`On sait que $(${A}${B}) \\parallel (${C}${D})$ et $(${A}${D}) \\parallel (${B}${C})$. Que peut-on en déduire ?`, `$${A}${B}${C}${D}$ est un parallélogramme`, [`$${A}${B}${C}${D}$ est un carré`, `$${A}${B}${C}${D}$ est un rectangle`, "on ne peut rien en déduire"]],
      [`$${A}${B}${C}${D}$ est un losange dont les diagonales ont la même longueur. C'est donc :`, "un carré", ["un rectangle seulement", "un parallélogramme seulement", "un trapèze"]],
      [`$${A}${B}${C}${D}$ est un parallélogramme et $\\widehat{${A}${B}${C}} = 90^\\circ$. C'est donc :`, "un rectangle", ["un losange", "un carré", "un parallélogramme seulement"]],
      [`On veut démontrer que $${A}${B}${C}${D}$ est un parallélogramme. On sait que $[${A}${C}]$ et $[${B}${D}]$ ont le même milieu. Quelle propriété utilise-t-on ?`, "Si les diagonales d'un quadrilatère ont le même milieu, alors c'est un parallélogramme.", ["Si un quadrilatère a quatre côtés, alors c'est un parallélogramme.", "Si les diagonales d'un quadrilatère sont perpendiculaires, alors c'est un parallélogramme.", "Si un quadrilatère est un parallélogramme, alors ses diagonales ont le même milieu."]],
      [`$${A}${B}${C}${D}$ est un parallélogramme. On veut démontrer que c'est un rectangle. Quelle information suffit ?`, `$${A}${C} = ${B}${D}$`, [`$${A}${B} = ${C}${D}$`, `$(${A}${B}) \\parallel (${C}${D})$`, `$[${A}${C}]$ et $[${B}${D}]$ ont le même milieu`]],
      [`$${A}${B}${C}${D}$ est un parallélogramme. On veut démontrer que c'est un losange. Quelle information suffit ?`, `$(${A}${C}) \\perp (${B}${D})$`, [`$${A}${C} = ${B}${D}$`, `$${A}${B} = ${C}${D}$`, `$\\widehat{${A}${B}${C}} = 90^\\circ$`]],
      [`$${A}${B}${C}${D}$ est un rectangle. On veut démontrer que c'est un carré. Quelle information suffit ?`, `$${A}${B} = ${B}${C}$`, [`$${A}${C} = ${B}${D}$`, `$\\widehat{${A}${B}${C}} = 90^\\circ$`, `$(${A}${B}) \\parallel (${C}${D})$`]]
    ].slice(t, t + 1)[0] || null;
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu,
      aides: ["Une propriété de démonstration commence par « Si » (ce qu'on sait) et se termine par « alors » (ce qu'on veut prouver).", "Rectangle : un parallélogramme dont les diagonales ont la même longueur (ou qui a un angle droit). Losange : un parallélogramme dont les diagonales sont perpendiculaires (ou qui a deux côtés consécutifs égaux).", "Carré : un rectangle qui est aussi un losange."], solution: `Réponse : ${Q[1]}` };
  };

  /* =====================================================================
     Chapitre 13 : statistiques (st5-)
     ===================================================================== */
  const { diagrammeBarres, diagrammeCirculaire } = window.PM_EXO.college;
  const SERIES_ST = [
    ["Notes sur 10 à un contrôle", () => rand(2, 10), "élèves"],
    ["Nombre de frères et sœurs des élèves d'une classe", () => rand(0, 5), "élèves"],
    ["Pointures des élèves d'une classe", () => rand(36, 42), "élèves"],
    ["Nombre de buts marqués à chaque match par le club de football", () => rand(0, 4), "matchs"]
  ];
  const listeTex = (L) => L.map(nb).join("$ ; $"); // utilisé entre $…$ : une formule par valeur, pour que la liste passe à la ligne
  // Moyenne vue comme un partage équitable : une barre par valeur et la ligne de la moyenne
  function barresMoyenne(vals, noms, moyenne, unite, aria, ecrire) {
    const x0 = 34, y0 = 160, haut = ecrire ? 32 : 18, vmax = Math.max(...vals), pas = vmax > 40 ? 10 : vmax > 20 ? 5 : 2, top = Math.ceil(vmax / pas) * pas, Y = (v) => +(y0 - ((y0 - haut) * v) / top).toFixed(1), bw = (306 - x0) / vals.length;
    let s = `<svg class="graph" viewBox="0 0 320 ${y0 + 22}" role="img" aria-label="${aria}"><g class="g-grid">`;
    for (let v = 0; v <= top; v += pas) s += `<line x1="${x0}" y1="${Y(v)}" x2="306" y2="${Y(v)}"/>`;
    s += `</g><g class="g-tick">`; for (let v = 0; v <= top; v += pas) s += `<text x="${x0 - 5}" y="${Y(v) + 3.5}" text-anchor="end">${v}</text>`; s += `</g>`;
    vals.forEach((v, i) => { const x = x0 + i * bw + bw * 0.2, w = bw * 0.6; s += `<rect class="g-aire g-colorie g-barre" x="${+x.toFixed(1)}" y="${Y(v)}" width="${+w.toFixed(1)}" height="${+(y0 - Y(v)).toFixed(1)}"/><text class="g-plabel" x="${+(x + w / 2).toFixed(1)}" y="${y0 + 15}" text-anchor="middle">${noms[i]}</text>${ecrire ? `<text class="g-mesure" x="${+(x + w / 2).toFixed(1)}" y="${Y(v) - 4}" text-anchor="middle">${v}</text>` : ""}`; });
    if (moyenne != null) s += `<line class="g-hline" x1="${x0}" y1="${Y(moyenne)}" x2="306" y2="${Y(moyenne)}"/><text class="g-hlabel" x="304" y="${Y(moyenne) - 5}" text-anchor="end">moyenne : ${nbTexte(moyenne)}</text>`;
    s += `<g class="g-axis"><line x1="${x0}" y1="${y0}" x2="306" y2="${y0}"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${haut - 6}"/></g>${unite ? `<text class="g-plabel" x="${x0 + 4}" y="${ecrire ? 11 : haut - 4}">${unite}</text>` : ""}`;
    return s + `</svg>`;
  }
  FIGURES["st5-cours-barres"] = () => diagrammeBarres([["Bus", 9], ["À pied", 6], ["Taxi", 5], ["Scooter", 4]], 2, "élèves").replace(/aria-label="[^"]*"/, 'aria-label="Diagramme en barres du moyen de transport de 24 élèves : bus 9, à pied 6, taxi 5, scooter 4"');
  FIGURES["st5-cours-moyenne"] = () => barresMoyenne([12, 8, 15, 13], ["1er", "2e", "3e", "4e"], 12, "notes", "Quatre notes 12, 8, 15 et 13 en barres ; la ligne de la moyenne 12 : ce qui dépasse comble ce qui manque");
  FIGURES["st5-qcm-pirogues"] = () => diagrammeBarres([["lun.", 8], ["mar.", 12], ["mer.", 4], ["jeu.", 10], ["ven.", 6]], 2, "pirogues").replace(/aria-label="[^"]*"/, 'aria-label="Diagramme en barres : pirogues sorties lundi 8, mardi 12, mercredi 4, jeudi 10, vendredi 6"');
  FIGURES["st5-qcm-transport"] = () => diagrammeCirculaire([["Bus", 18], ["À pied", 9], ["Taxi", 6], ["Voiture", 3]]).replace(/aria-label="[^"]*"/, 'aria-label="Diagramme circulaire du moyen de transport : bus la moitié du disque, à pied le quart, taxi et voiture le reste"');
  FIGURES["st5-qcm-notes"] = () => barresMoyenne([6, 9, 14, 7], ["1er", "2e", "3e", "4e"], null, "notes", "Quatre notes en barres : 6, 9, 14 et 7", true);
  FIGURES["st5-qcm-courbe"] = () => { const { courbeDonnees } = window.PM_EXO.college; return courbeDonnees([[1, 26], [3, 27], [5, 29], [7, 30], [9, 29], [11, 27]], "mois", "°C", 1).replace(/aria-label="[^"]*"/, 'aria-label="Courbe de la température de l\'eau du lagon selon le mois : 26, 27, 29, 30, 29, 27 degrés"'); };
  FIGURES["st5-cours-circulaire"] = () => diagrammeCirculaire([["Football : 12", 12], ["Basket : 6", 6], ["Natation : 3", 3], ["Danse : 3", 3]]).replace(/aria-label="[^"]*"/, 'aria-label="Diagramme circulaire du sport préféré de 24 élèves : football 12 (la moitié, 180 degrés), basket 6 (le quart, 90 degrés), natation 3 et danse 3 (45 degrés chacun)"');

  GEN["st5-effectifs"] = function () {
    const [titre, g, unite] = pick(SERIES_ST), n = rand(12, 20), L = Array.from({ length: n }, g), t = rand(0, 3);
    if (t === 3) {
      // effectif total lu sur un diagramme en barres
      const [quoi, cats, u] = pick([["le sport préféré des élèves d'une classe", ["Foot", "Hand", "Basket", "Danse", "Va'a"], "élèves"], ["le nombre de tortues observées chaque jour à N'Gouja", ["lun.", "mar.", "mer.", "jeu.", "ven."], "tortues"], ["le fruit préféré des élèves", ["Mangue", "Letchi", "Banane", "Ananas"], "élèves"], ["le moyen de transport des élèves", ["Bus", "À pied", "Taxi", "Scooter"], "élèves"]]);
      const D = cats.map((c) => [c, rand(1, 12)]), tot = D.reduce((s, [, v]) => s + v, 0);
      return { enonce: `Le diagramme donne ${quoi}. Quel est l'effectif total ?`, figure: diagrammeBarres(D, 2, u), mode: "nombre", prefixe: "Effectif total :", suffixe: u, attendu: tot,
        erreurs: [{ valeur: D.length, message: "Ça, c'est le nombre de catégories (de barres). L'effectif total est la somme des hauteurs des barres." }, { valeur: Math.max(...D.map(([, v]) => v)), message: "Ça, c'est l'effectif de la plus haute barre : il faut additionner toutes les barres." }],
        aides: ["Lis la hauteur de chaque barre sur l'axe vertical.", "Une graduation vaut $2$ : une barre peut s'arrêter entre deux graduations.", "Additionne toutes les hauteurs."], solution: `${D.map(([c, v]) => `${c} : $${v}$`).join(" ; ")}. Effectif total : $${D.map(([, v]) => v).join(" + ")} = ${tot}$ ${u}.` };
    }
    if (t === 0) {
      const v = pick(L), eff = L.filter((x) => x === v).length;
      return { enonce: `${titre} : $${listeTex(L)}$. Quel est l'effectif de la valeur $${v}$ ?`, mode: "nombre", prefixe: "Effectif :", attendu: eff,
        erreurs: [...(v !== eff ? [{ valeur: v, message: `$${v}$ est la valeur. Son effectif est le **nombre de fois** où elle apparaît.` }] : []), { valeur: n, message: "Ça, c'est l'effectif total : on ne compte que les valeurs égales à $" + v + "$." }],
        aides: ["L'effectif d'une valeur est le nombre de fois où elle apparaît.", "Barre chaque valeur au fur et à mesure pour ne pas l'oublier.", `Compte les $${v}$.`], solution: `La valeur $${v}$ apparaît $${eff}$ fois : son effectif est $${eff}$.` };
    }
    if (t === 1) return { enonce: `${titre} : $${listeTex(L)}$. Quel est l'effectif total ?`, mode: "nombre", prefixe: "Effectif total :", attendu: n,
      erreurs: [{ valeur: L.reduce((s, x) => s + x, 0), message: "On ne fait pas la somme des valeurs : on **compte** les valeurs." }, { valeur: new Set(L).size, message: "On compte toutes les valeurs, même celles qui se répètent." }],
      aides: ["L'effectif total est le nombre de données de la série.", "Compte toutes les valeurs, même celles qui se répètent.", "Tu peux les compter par paquets de $5$."], solution: `La série contient $${n}$ valeurs : l'effectif total est $${n}$ ${unite}.` };
    const s = rand(0, 1), seuil = pick([...new Set(L)].sort((a, b) => a - b).slice(1, -1).concat([L[0]])), eff = L.filter((x) => (s ? x >= seuil : x < seuil)).length;
    return { enonce: `${titre} : $${listeTex(L)}$. Combien de valeurs sont ${s ? "supérieures ou égales à" : "strictement inférieures à"} $${seuil}$ ?`, mode: "nombre", prefixe: "Nombre :", attendu: eff,
      aides: [s ? `Compte les valeurs égales à $${seuil}$ ou plus grandes.` : `Compte les valeurs plus petites que $${seuil}$, sans compter $${seuil}$.`, "Barre-les au fur et à mesure.", "Vérifie ton comptage une deuxième fois."], solution: `Il y a $${eff}$ valeurs ${s ? `supérieures ou égales à $${seuil}$` : `strictement inférieures à $${seuil}$`}.` };
  };

  GEN["st5-frequences"] = function () {
    if (Math.random() < 0.25) {
      // fréquence d'une catégorie lue sur un diagramme en barres (effectif total 20, 25 ou 40)
      const T = pick([20, 25, 40, 50]), cats = shuffle(["Foot", "Hand", "Basket", "Danse", "Judo", "Va'a"].slice()).slice(0, 4);
      let v; for (;;) { v = [rand(1, Math.min(14, T / 2)), rand(1, Math.min(14, T / 2)), rand(1, Math.min(14, T / 3))]; const r = T - v.reduce((a, b) => a + b, 0); if (r >= 1 && r <= 16) { v.push(r); break; } }
      const i = rand(0, 3), f = v[i] / T, pct = Math.random() < 0.5;
      return { enonce: `Le diagramme donne le sport préféré des $${T}$ élèves d'un club de ${pick(LIEUX5)}. Quelle est la fréquence de la catégorie « ${cats[i]} »${pct ? ", en pourcentage" : ", en écriture décimale"} ?`, figure: diagrammeBarres(cats.map((c, k) => [c, v[k]]), 2, "élèves"), mode: "nombre", prefixe: "Fréquence :", suffixe: pct ? "%" : "", attendu: pct ? +(f * 100).toFixed(4) : f,
        erreurs: [{ valeur: v[i], message: "Ça, c'est l'effectif lu sur le diagramme. La fréquence est l'effectif divisé par l'effectif total." }, { valeur: pct ? f : +(f * 100).toFixed(4), message: pct ? "Multiplie par $100$ pour l'écrire en pourcentage." : "Ça, c'est la fréquence en pourcentage ; on la demande en écriture décimale." }],
        aides: [`Lis l'effectif de « ${cats[i]} » sur le diagramme.`, `L'effectif total est $${T}$.`, `Fréquence $= ${v[i]} \\div ${T}$${pct ? ", puis multiplie par $100$" : ""}.`], solution: `« ${cats[i]} » : $${v[i]}$ élèves sur $${T}$. Fréquence : $${v[i]} \\div ${T} = ${nb(f)}$${pct ? `, soit $${nb(f * 100)}\\,\\%$` : ""}.` };
    }
    const T = pick([20, 25, 40, 50, 200]), cats = shuffle(["Bus", "À pied", "Voiture", "Scooter", "Taxi", "Vélo"].slice()).slice(0, 4);
    let v; for (;;) { v = [rand(1, T / 2), rand(1, T / 2), rand(1, T / 3)]; const r = T - v.reduce((a, b) => a + b, 0); if (r >= 1) { v.push(r); break; } }
    const i = rand(0, 3), f = v[i] / T, t = rand(0, 1), tab = { lignes: [["\\text{Transport}", "\\text{Effectif}"], ...cats.map((c, k) => [`\\text{${c}}`, v[k]]), ["\\text{Total}", T]] };
    if (t === 0) return { enonce: `Ce tableau donne le moyen de transport des élèves interrogés. Quelle est la fréquence de la catégorie « ${cats[i]} », en pourcentage ?`, tableau: tab, mode: "nombre", prefixe: "Fréquence :", suffixe: "%", attendu: f * 100,
      erreurs: [{ valeur: v[i], message: "Ça, c'est l'effectif. La fréquence est l'effectif divisé par l'effectif total." }],
      aides: ["Fréquence $=$ effectif de la catégorie $\\div$ effectif total.", `$\\dfrac{${v[i]}}{${T}}$.`, "Multiplie par $100$ pour l'écrire en pourcentage."], solution: `$\\dfrac{${v[i]}}{${T}} = ${nb(f)}$, soit $${nb(f * 100)}\\,\\%$.` };
    return { enonce: `Ce tableau donne le moyen de transport des élèves interrogés. Quelle est la fréquence de la catégorie « ${cats[i]} », en écriture décimale ?`, tableau: tab, mode: "nombre", prefixe: "Fréquence :", attendu: f,
      erreurs: [{ valeur: f * 100, message: "Ça, c'est la fréquence en pourcentage. On la demande en écriture décimale (entre $0$ et $1$)." }, { valeur: v[i], message: "Ça, c'est l'effectif." }],
      aides: ["Fréquence $=$ effectif de la catégorie $\\div$ effectif total.", `$${v[i]} \\div ${T}$.`, "Une fréquence est toujours comprise entre $0$ et $1$."], solution: `$${v[i]} \\div ${T} = ${nb(f)}$.` };
  };

  GEN["st5-moyenne"] = function () {
    const t = rand(0, 3), P0 = prenom();
    if (t <= 1 || t === 3) {
      for (;;) {
        const C = t === 0 ? [`Voici les notes sur $20$ ${deN(P0.nom)} ce trimestre`, "Quelle est sa moyenne ?", "", 5, 20, 4, 8]
          : t === 1 ? pick([[`Voici les températures maximales (en °C) relevées à ${pick(LIEUX5)} pendant plusieurs jours`, "Quelle est la température moyenne ?", "°C", 24, 34, 4, 8], [`Voici le nombre de tortues observées chaque jour à la plage de N'Gouja`, "Combien de tortues en moyenne par jour ?", "tortues", 2, 15, 4, 7], [`Voici les hauteurs de pluie (en mm) tombées à Mamoudzou plusieurs semaines de suite`, "Quelle est la hauteur de pluie moyenne ?", "mm", 10, 60, 4, 6]])
          : [`Le diagramme donne le nombre de points marqués par l'équipe de basket de ${pick(LIEUX5)} à chaque match`, "Combien de points en moyenne par match ?", "points", 30, 70, 4, 6];
        const n = rand(C[5], C[6]), L = Array.from({ length: n }, () => rand(C[3], C[4])), s = L.reduce((a, b) => a + b, 0), m = s / n;
        if (!Number.isInteger(m * 10)) continue;
        const fig = t === 3 ? barresMoyenne(L, L.map((_, i) => `M${i + 1}`), null, "points", `Diagramme en barres des points marqués à ${n} matchs, la valeur est écrite au-dessus de chaque barre`, true) : t === 1 && Math.random() < 0.4 ? barresMoyenne(L, L.map((_, i) => `${i + 1}`), null, C[2], `Diagramme en barres des ${n} valeurs de la liste`) : undefined;
        const erreurs = [{ valeur: s, message: "Il faut encore diviser la somme par le nombre de valeurs." }, ...(Number.isInteger((s / (n - 1)) * 10) ? [{ valeur: +(s / (n - 1)).toFixed(4), message: `Compte bien les valeurs : il y en a $${n}$.` }] : []), ...(Number.isInteger((s / (n + 1)) * 10) ? [{ valeur: +(s / (n + 1)).toFixed(4), message: `Compte bien les valeurs : il y en a $${n}$.` }] : [])];
        return { enonce: t === 3 ? `${C[0]}. ${C[1]}` : `${C[0]} : $${listeTex(L)}$. ${C[1]}`, figure: fig, mode: "nombre", prefixe: "Moyenne :", suffixe: C[2], attendu: m, erreurs,
          aides: ["Moyenne $=$ somme des valeurs $\\div$ nombre de valeurs.", t === 3 ? "Lis la hauteur de chaque barre, puis additionne." : `Somme : $${L.join(" + ")}$.`, `Il y a $${n}$ valeurs.`], solution: `${t === 3 ? `Valeurs : $${listeTex(L)}$. ` : ""}Somme : $${s}$. Moyenne : $${s} \\div ${n} = ${nb(m)}$${C[2] ? ` ${C[2]}` : ""}.` };
      }
    }
    const n = rand(3, 5), L = Array.from({ length: n }, () => rand(8, 16)), m = rand(11, 14), x = m * (n + 1) - L.reduce((a, b) => a + b, 0), S = L.reduce((a, b) => a + b, 0);
    if (x < 0 || x > 20) return GEN["st5-moyenne"]();
    return { enonce: `${P0.nom} a eu les notes $${listeTex(L)}$. Quelle note doit-${P0.il} obtenir au prochain contrôle pour avoir exactement $${m}$ de moyenne sur l'ensemble des $${n + 1}$ notes ?`, mode: "nombre", prefixe: "Note :", attendu: x,
      erreurs: [...(x !== m ? [{ valeur: m, message: "Avoir la moyenne voulue ne suffit pas : il faut compenser les notes déjà obtenues." }] : []), ...(m * n - S >= 0 && m * n - S <= 20 && m * n - S !== x ? [{ valeur: m * n - S, message: `Il y aura $${n + 1}$ notes en tout : la somme doit être $${n + 1} \\times ${m}$.` }] : [])],
      aides: [`Avec $${n + 1}$ notes et une moyenne de $${m}$, la somme des notes doit être $${n + 1} \\times ${m} = ${(n + 1) * m}$.`, `Somme des notes déjà obtenues : $${S}$.`, "La note manquante est la différence."], solution: `Somme nécessaire : $${(n + 1) * m}$. Somme actuelle : $${S}$. Note à obtenir : $${(n + 1) * m} - ${S} = ${x}$.` };
  };

  GEN["st5-diagrammes"] = function () {
    const t = rand(0, 3);
    if (t === 0) {
      const [quoi, noms, u] = pick([["le sport préféré des élèves d'une classe", ["Foot", "Basket", "Hand", "Natation", "Danse", "Judo", "Va'a"], "élèves"], ["le fruit préféré des élèves d'une classe", ["Mangue", "Letchi", "Banane", "Ananas", "Papaye", "Coco"], "élèves"], ["le nombre de pirogues sorties chaque jour au port de pêche", ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam."], "pirogues"]]);
      const cats = shuffle(noms.slice()).slice(0, 4).map((c) => [c, rand(1, 12)]), i = rand(0, 3), j = (i + 1) % 4;
      if (u === "pirogues") cats.sort((p, q) => noms.indexOf(p[0]) - noms.indexOf(q[0]));
      return { enonce: `Le diagramme donne ${quoi}. Quel est l'effectif de « ${cats[i][0]} » ?`, figure: diagrammeBarres(cats, 2, u), mode: "nombre", prefixe: "Effectif :", suffixe: u, attendu: cats[i][1],
        erreurs: [...(cats[j][1] !== cats[i][1] ? [{ valeur: cats[j][1], message: `Ça, c'est la hauteur de la barre « ${cats[j][0]} » : repère bien la bonne barre.` }] : []), { valeur: cats[i][1] % 2 ? cats[i][1] + 1 : cats[i][1] + 2, message: "Une graduation vaut $2$ : lis précisément le haut de la barre." }],
        aides: ["Repère la barre de la catégorie.", "Lis sa hauteur sur l'axe vertical.", "Chaque graduation vaut $2$ : attention aux valeurs impaires, entre deux graduations."], solution: `La barre « ${cats[i][0]} » monte jusqu'à $${cats[i][1]}$ : l'effectif est $${cats[i][1]}$.` };
    }
    if (t === 1) {
      const p = 5 * rand(1, 19), dec = Math.random() < 0.4;
      return { enonce: dec ? `Dans un diagramme circulaire, quel angle doit avoir le secteur d'une catégorie dont la fréquence est $${nb(p / 100)}$ ?` : `Dans un diagramme circulaire, quel angle doit avoir le secteur d'une catégorie dont la fréquence est $${p}\\,\\%$ ?`, mode: "nombre", prefixe: "Angle :", suffixe: "°", attendu: 3.6 * p,
        erreurs: [{ valeur: p, message: "Le disque entier fait $360^\\circ$, pas $100^\\circ$." }, { valeur: 1.8 * p, message: "Le disque entier fait $360^\\circ$ (un tour), pas $180^\\circ$." }],
        aides: ["Le disque entier ($100\\,\\%$) correspond à $360^\\circ$.", "Les angles sont proportionnels aux fréquences.", dec ? `Angle $= 360^\\circ \\times ${nb(p / 100)}$.` : `$1\\,\\%$ correspond à $3{,}6^\\circ$.`], solution: dec ? `$360^\\circ \\times ${nb(p / 100)} = ${nb(3.6 * p)}^\\circ$.` : `$360^\\circ \\times ${p} \\div 100 = ${nb(3.6 * p)}^\\circ$.` };
    }
    if (t === 2) {
      const T = pick([20, 24, 30, 36, 40, 60]), e = rand(1, T - 1), a = (e / T) * 360;
      if (!Number.isInteger(a)) return GEN["st5-diagrammes"]();
      return { enonce: `Sur $${T}$ élèves, $${e}$ viennent au collège en bus. Quel angle doit avoir le secteur « bus » dans un diagramme circulaire ?`, mode: "nombre", prefixe: "Angle :", suffixe: "°", attendu: a,
        aides: [`$${T}$ élèves correspondent à $360^\\circ$.`, `Un élève correspond à $360 \\div ${T} = ${360 / T}^\\circ$.`, `Multiplie par $${e}$.`], solution: `$360 \\div ${T} \\times ${e} = ${a}^\\circ$.` };
    }
    const C = pick([
      ["la répartition des élèves du collège selon leur moyen de transport, pour voir la part de chacun dans le total", 1],
      ["l'évolution de la température à Mamoudzou heure par heure au cours d'une journée", 2],
      ["le nombre d'élèves de chaque classe du collège, pour les comparer", 0],
      ["la part de chaque dépense dans le budget d'une famille", 1],
      ["l'évolution du nombre d'habitants de Mayotte année après année", 2],
      ["le nombre de buts marqués par chaque joueur d'une équipe", 0],
      ["la répartition des votes entre les candidats, pour voir qui a la plus grosse part", 1],
      ["l'évolution de la hauteur d'une plante semaine après semaine", 2],
      ["le nombre de tortues observées sur chaque plage de l'île", 0],
      ["la part des différentes espèces de poissons dans une pêche", 1],
      ["l'évolution du niveau de la mer pendant une marée", 2],
      ["le nombre de livres empruntés au CDI chaque jour de la semaine, pour comparer les jours", 0],
      ["la part de chaque commune dans la population de Mayotte", 1],
      ["l'évolution du nombre de passagers de la barge heure par heure dans la journée", 2],
      ["le nombre de passagers de la barge chaque jour de la semaine, pour comparer les jours", 0],
      ["la répartition des déchets triés au collège (papier, plastique, verre, compost)", 1],
      ["l'évolution de la taille d'un bébé tortue mois après mois", 2],
      ["le nombre de bananiers plantés par chaque agriculteur d'un village, pour les comparer", 0],
      ["la part de chaque fruit dans une corbeille vendue au marché de Mamoudzou", 1],
      ["l'évolution de la température de l'eau du lagon au cours de l'année", 2]
    ]);
    const choix = ["un diagramme en barres", "un diagramme circulaire", "un graphique cartésien (une courbe)"];
    return { enonce: `Quelle représentation est la plus adaptée pour montrer ${C[0]} ?`, mode: "choix", choix, attendu: C[1],
      aides: ["Diagramme en barres : comparer des effectifs de catégories.", "Diagramme circulaire : montrer la part de chaque catégorie dans un tout.", "Graphique cartésien : montrer une évolution (en fonction du temps)."], solution: `Il s'agit de ${["comparer des effectifs de catégories", "montrer les parts d'un tout", "montrer une évolution dans le temps"][C[1]]} : on choisit ${choix[C[1]]}.` };
  };

  /* =====================================================================
     Chapitre 14 : équations (eq5-) — tester une égalité, x + b = c, ax = c
     ===================================================================== */
  // Balance de Roberval en équilibre : G et D = listes d'objets (la lettre = une boîte inconnue, un nombre = une masse marquée)
  function balance5(G, D, aria, x = "x") {
    let top = 104;
    const plateau = (L, cx) => {
      const rows = []; let r = [], w = 0, s = "";
      L.forEach((it) => { const t = typeof it === "number" ? nbTexte(it) : it, lw = t === x ? 22 : 12 + 6.5 * t.length; if (w + lw > 124 && r.length) { rows.push([r, w - 3]); r = []; w = 0; } r.push([t, lw]); w += lw + 3; });
      rows.push([r, w - 3]); top = Math.min(top, 104 - 24 * rows.length - 8);
      rows.forEach(([R, rw], j) => { let px = cx - rw / 2; const y = 104 - 24 * (j + 1); R.forEach(([t, lw]) => { s += `<rect class="${t === x ? "g-poly" : "g-barre-plus"}" x="${+px.toFixed(1)}" y="${y}" width="${+lw.toFixed(1)}" height="22" rx="${t === x ? 0 : 5}"/><text class="g-label" x="${+(px + lw / 2).toFixed(1)}" y="${y + 15}" text-anchor="middle">${t}</text>`; px += lw + 3; }); });
      return s + `<g class="g-axis"><line x1="${cx - 66}" y1="104" x2="${cx + 66}" y2="104"/><line x1="${cx}" y1="104" x2="${cx}" y2="126"/></g>`;
    };
    const c = `<g class="g-axis"><line x1="80" y1="126" x2="240" y2="126"/><line x1="160" y1="126" x2="160" y2="152"/><line x1="122" y1="154" x2="198" y2="154"/></g><circle class="g-point" cx="160" cy="126" r="4"/>${plateau(G, 80)}${plateau(D, 240)}`;
    return `<svg class="graph" viewBox="0 ${top} 320 ${160 - top}" role="img" aria-label="${aria}">${c}</svg>`;
  }
  const boites = (n, x = "x") => Array(n).fill(x);
  // Schéma en barres : rangs = [[nom, [[texte, poids, inconnu]]]] ; total = texte de l'accolade (au-dessus, ou à droite s'il y a plusieurs rangs)
  function barreEq(rangs, total, aria) {
    const nom = rangs.some((r) => r[0]), multi = rangs.length > 1, x0 = nom ? 66 : 14, W = (multi ? 262 : 306) - x0, h = 28, y0 = multi ? 8 : 34;
    const P = Math.max(...rangs.map((r) => r[1].reduce((a, g) => a + g[1], 0))), n = Math.max(...rangs.map((r) => r[1].length)), mn = Math.min(26, W / n), u = (W - mn * n) / P;
    let s = "", y = y0, fin = 0;
    rangs.forEach(([nm, segs]) => {
      let x = x0; if (nm) s += `<text class="g-label" x="${x0 - 6}" y="${y + h / 2 + 4}" text-anchor="end">${nm}</text>`;
      segs.forEach(([t, p, inc]) => { const w = mn + u * p; s += `<rect class="${inc ? "g-poly" : "g-barre-plus"}" x="${+x.toFixed(1)}" y="${y}" width="${+w.toFixed(1)}" height="${h}"/><text class="g-label" x="${+(x + w / 2).toFixed(1)}" y="${y + h / 2 + 4}" text-anchor="middle">${t}</text>`; x += w; });
      fin = Math.max(fin, x); y += h + 10;
    });
    if (multi) s += `<path class="g-accolade" d="M${+(fin + 5).toFixed(1)} ${y0 + 2} H${+(fin + 11).toFixed(1)} V${y - 12} H${+(fin + 5).toFixed(1)}"/><text class="g-label" x="${+(fin + 15).toFixed(1)}" y="${(y0 + y - 10) / 2 + 4}">${total}</text>`;
    else s += `<path class="g-accolade" d="M${x0 + 2} ${y0 - 5} V${y0 - 11} H${+(fin - 2).toFixed(1)} V${y0 - 5}"/><text class="g-label" x="${+((x0 + fin) / 2).toFixed(1)}" y="${y0 - 16}" text-anchor="middle">${total}</text>`;
    return svgBandes(y - 2, s, aria);
  }
  FIGURES["eq5-cours-balance"] = () => balance5([...boites(3), 4], [...boites(2), 13], "Balance en équilibre : à gauche 3 boîtes x et une masse de 4, à droite 2 boîtes x et une masse de 13");
  FIGURES["eq5-cours-plus"] = () => barreEq([["", [["x", 12, true], ["7", 7]]]], "19", "Schéma en barre : une barre de 19 partagée en x et 7");
  FIGURES["eq5-cours-fois"] = () => balance5(boites(5), [35], "Balance en équilibre : 5 boîtes x à gauche, une masse de 35 à droite");
  FIGURES["eq5-cours-probleme"] = () => barreEq([["", Array(6).fill(["x", 1, true])]], "9 €", "Schéma en barre : 6 mangues de prix x coûtent 9 euros en tout");
  FIGURES["eq5-qcm-b1"] = () => balance5([...boites(1), 9], [20], "Balance en équilibre : une boîte x et une masse de 9 à gauche, une masse de 20 à droite");
  FIGURES["eq5-qcm-b2"] = () => balance5(boites(4), [28], "Balance en équilibre : 4 boîtes x à gauche, une masse de 28 à droite");
  FIGURES["eq5-qcm-b3"] = () => balance5([...boites(2), 5], [...boites(1), 12], "Balance en équilibre : 2 boîtes x et une masse de 5 à gauche, une boîte x et une masse de 12 à droite");
  FIGURES["eq5-qcm-barre"] = () => barreEq([["Awa", [["?", 1, true]]], ["Zaïd", [["?", 1, true], ["?", 1, true], ["?", 1, true]]]], "48", "Schéma en barres : Awa a une part, Zaïd trois parts égales ; ensemble 48 billes");

  GEN["eq5-tester"] = function () {
    for (let e = 0; e < 200; e++) {
      const x = pick(LET), bal = Math.random() < 0.4, a = rand(2, bal ? 5 : 6), b = rand(1, 12), c = rand(1, a - 1), s = rand(bal ? 1 : 0, bal ? 8 : 9), g = bal ? 1 : -1;
      // a x ± b = c x + d avec solution s
      const d = a * s + g * b - c * s; if (d <= 0 || d > (bal ? 40 : 30)) continue;
      const cand = shuffle([s, s + 1, s + 2, Math.max(0, s - 1), s + 3, b].filter((v, i, T) => T.indexOf(v) === i)).slice(0, 4);
      if (!cand.includes(s)) cand[0] = s;
      const C = shuffle(cand.slice()), cx = c === 1 ? x : `${c}${x}`, sg = bal ? "+" : "-", G = (v) => a * v + g * b, D = (v) => c * v + d;
      return { enonce: `${bal ? `La balance est en équilibre : chaque boîte a la même masse $${x}$. ` : ""}Lequel de ces nombres est solution de l'équation $${a}${x} ${sg} ${b} = ${cx} + ${d}$ ?`, mode: "choix", choix: C.map((v) => `$${v}$`), attendu: C.indexOf(s),
        figure: bal ? balance5([...boites(a, x), b], [...boites(c, x), d], `Balance en équilibre : ${a} boîtes ${x} et une masse de ${b} à gauche, ${c} boîte${c > 1 ? "s" : ""} ${x} et une masse de ${d} à droite`, x) : undefined,
        aides: [`Un nombre est solution si, en remplaçant $${x}$ par ce nombre, les deux membres sont égaux.`, "Teste chaque nombre : calcule le membre de gauche, puis celui de droite.", `Pour $${x} = ${C[0]}$ : à gauche $${a} \\times ${C[0]} ${sg} ${b} = ${G(C[0])}$, à droite $${c} \\times ${C[0]} + ${d} = ${D(C[0])}$.`],
        solution: `Pour $${x} = ${s}$ : $${a} \\times ${s} ${sg} ${b} = ${G(s)}$ et $${c} \\times ${s} + ${d} = ${D(s)}$. Les deux membres sont égaux : $${s}$ est solution. ${C.filter((v) => v !== s).map((v) => `Pour $${v}$ : $${G(v)} \\neq ${D(v)}$`).join(" ; ")}.` };
    }
  };

  GEN["eq5-plus"] = function () {
    const x = pick(LET), dec = Math.random() < 0.3, b = dec ? rand(11, 99) / 10 : rand(2, 40), s = dec ? rand(11, 99) / 10 : rand(1, 60), moins = Math.random() < 0.35;
    const c = +(moins ? s - b : s + b).toFixed(2); if (c <= 0) return GEN["eq5-plus"]();
    const op = moins ? "-" : "+", fig = Math.random() < 0.6 ? barreEq([["", moins ? [[nbTexte(c), c], [nbTexte(b), b]] : [[x, s, true], [nbTexte(b), b]]]], moins ? x : nbTexte(c), moins ? `Schéma en barre : la barre ${x} est partagée en ${nbTexte(c)} et ${nbTexte(b)}` : `Schéma en barre : une barre de ${nbTexte(c)} partagée en ${x} et ${nbTexte(b)}`) : undefined;
    return { enonce: `Résous l'équation $${x} ${op} ${nb(b)} = ${nb(c)}$.${fig ? " Le schéma peut t'aider." : ""}`, figure: fig, mode: "nombre", prefixe: `$${x} =$`, attendu: s,
      erreurs: [{ valeur: +(moins ? c - b : c + b).toFixed(2), message: `Il faut faire l'opération **contraire** : pour enlever « $${op} ${nb(b)}$ », on ${moins ? "ajoute" : "soustrait"} $${nb(b)}$.` }, { valeur: c, message: `Ça, c'est le second membre : il faut encore ${moins ? "ajouter" : "enlever"} $${nb(b)}$ pour trouver $${x}$.` }],
      aides: [`On cherche le nombre $${x}$ qui, ${moins ? "diminué" : "augmenté"} de $${nb(b)}$, donne $${nb(c)}$.`, `L'opération contraire de « $${op} ${nb(b)}$ » est « $${moins ? "+" : "-"} ${nb(b)}$ ».`, `$${x} = ${nb(c)} ${moins ? "+" : "-"} ${nb(b)}$.`],
      solution: `$${x} = ${nb(c)} ${moins ? "+" : "-"} ${nb(b)} = ${nb(s)}$. Vérification : $${nb(s)} ${op} ${nb(b)} = ${nb(c)}$.` };
  };

  GEN["eq5-fois"] = function () {
    const x = pick(LET), a = rand(2, 12), dec = Math.random() < 0.3, s = dec ? rand(11, 99) / 10 : rand(2, 30), c = +(a * s).toFixed(2), t = rand(0, 3);
    if (t === 0) {
      const q = rand(2, 9), r = rand(2, 15);
      return { enonce: `Résous l'équation $\\dfrac{${x}}{${q}} = ${r}$.`, mode: "nombre", prefixe: `$${x} =$`, attendu: q * r,
        figure: Math.random() < 0.6 ? barreEq([["", Array(q).fill([String(r), 1])]], x, `Schéma en barre : la barre ${x} est partagée en ${q} parts égales de ${r}`) : undefined,
        erreurs: [{ valeur: r / q, message: "L'opération contraire de « diviser par » est « multiplier par »." }, { valeur: r + q, message: `On ne fait pas d'addition : $${x}$ est partagé en $${q}$ parts de $${r}$, donc on multiplie.` }],
        aides: [`On cherche le nombre qui, divisé par $${q}$, donne $${r}$.`, "L'opération contraire de la division est la multiplication.", `$${x} = ${r} \\times ${q}$.`], solution: `$${x} = ${r} \\times ${q} = ${q * r}$. Vérification : $${q * r} \\div ${q} = ${r}$.` };
    }
    const fig = t === 1 && a <= 6 && !dec ? balance5(boites(a, x), [c], `Balance en équilibre : ${a} boîtes ${x} à gauche, une masse de ${c} à droite`, x) : t === 2 ? barreEq([["", Array(a).fill([x, 1, true])]], nbTexte(c), `Schéma en barre : ${a} parts égales ${x} font ${nbTexte(c)} en tout`) : undefined;
    return { enonce: `Résous l'équation $${a}${x} = ${nb(c)}$.${fig ? (t === 1 ? " La balance est en équilibre." : " Le schéma peut t'aider.") : ""}`, figure: fig, mode: "nombre", prefixe: `$${x} =$`, attendu: s,
      erreurs: [{ valeur: +(c - a).toFixed(2), message: `$${a}${x}$ signifie $${a} \\times ${x}$ : on divise par $${a}$, on ne soustrait pas.` }, { valeur: c * a, message: `On divise par $${a}$, on ne multiplie pas.` }],
      aides: [`$${a}${x}$ signifie $${a} \\times ${x}$.`, `On cherche le nombre qui, multiplié par $${a}$, donne $${nb(c)}$.`, `$${x} = ${nb(c)} \\div ${a}$.`],
      solution: `$${x} = ${nb(c)} \\div ${a} = ${nb(s)}$. Vérification : $${a} \\times ${nb(s)} = ${nb(c)}$.` };
  };

  GEN["eq5-modeliser"] = function () {
    const t = rand(0, 9), a = rand(2, 9), b = rand(3, 40), n = prenom().nom, l = pick(LIEUX5);
    const P = [
      [`Le quart d'un nombre $x$ est égal à $${b}$.`, `\\dfrac{x}{4} = ${b}`, [`4x = ${b}`, `x - 4 = ${b}`, `\\dfrac{4}{x} = ${b}`]],
      [`${n} a $${a}$ € de plus que son cousin. ${n} a $${a + b}$ €. On note $x$ la somme du cousin.`, `x + ${a} = ${a + b}`, [`x - ${a} = ${a + b}`, `${a}x = ${a + b}`, `x = ${a + b} + ${a}`]],
      [`Au marché de ${l}, $${a}$ régimes de bananes identiques pèsent $${a * b}$ kg. On note $x$ la masse d'un régime.`, `${a}x = ${a * b}`, [`x + ${a} = ${a * b}`, `\\dfrac{x}{${a}} = ${a * b}`, `x - ${a} = ${a * b}`]],
      [`Une pirogue rentre au port avec des poissons. Le pêcheur en vend $${a}$ et il lui en reste $${b}$. On note $x$ le nombre de poissons au retour.`, `x - ${a} = ${b}`, [`x + ${a} = ${b}`, `${a} - x = ${b}`, `\\dfrac{x}{${a}} = ${b}`]],
      [`Le triple d'un nombre $x$ est égal à $${3 * b}$.`, `3x = ${3 * b}`, [`x + 3 = ${3 * b}`, `x = 3 \\times ${3 * b}`, `\\dfrac{3}{x} = ${3 * b}`]],
      [`Dans $${a}$ ans, ${n} aura $${b + a}$ ans. On note $x$ son âge actuel.`, `x + ${a} = ${b + a}`, [`${a}x = ${b + a}`, `x - ${a} = ${b + a}`, `x = ${b + a} + ${a}`]],
      [`${n} achète $${a}$ cahiers identiques et paie $${a * b}$ €. On note $x$ le prix d'un cahier.`, `${a}x = ${a * b}`, [`x + ${a} = ${a * b}`, `x = ${a} \\times ${a * b}`, `\\dfrac{x}{${a}} = ${a * b}`]],
      [`Un bus transporte des élèves. Après le départ de $${a}$ élèves, il en reste $${b}$. On note $x$ le nombre d'élèves au départ.`, `x - ${a} = ${b}`, [`x + ${a} = ${b}`, `${a}x = ${b}`, `${a} - x = ${b}`]],
      [`On partage équitablement une somme $x$ entre $${a}$ personnes : chacune reçoit $${b}$ €.`, `\\dfrac{x}{${a}} = ${b}`, [`${a}x = ${b}`, `x - ${a} = ${b}`, `\\dfrac{${a}}{x} = ${b}`]],
      [`Le périmètre d'un carré de côté $x$ (en cm) est égal à $${4 * b}$ cm.`, `4x = ${4 * b}`, [`x^2 = ${4 * b}`, `x + 4 = ${4 * b}`, `2x = ${4 * b}`]]
    ][t];
    const { choix, attendu } = melange(`$${P[1]}$`, P[2].map((z) => `$${z}$`));
    const fig = t === 9 ? `<svg class="graph" viewBox="0 0 320 132" role="img" aria-label="Carré de côté x cm"><rect class="g-poly" x="105" y="18" width="108" height="108"/><path class="g-code" d="M105 30h12v-12"/><text class="g-label" x="159" y="13" text-anchor="middle">x</text><text class="g-label" x="220" y="76">x</text><text class="g-label" x="159" y="76" text-anchor="middle">${4 * b} cm de tour</text></svg>` : undefined;
    return { enonce: `${P[0]} Quelle équation traduit la situation ?`, figure: fig, mode: "choix", choix, attendu,
      aides: ["La lettre $x$ représente le nombre inconnu.", "Traduis la phrase mot à mot : « triple » $\\to 3x$, « dans $5$ ans » $\\to x + 5$, « partager » $\\to$ diviser.", "Vérifie avec la réponse attendue : l'égalité doit être vraie."], solution: `La situation se traduit par $${P[1]}$.` };
  };

  GEN["eq5-problemes"] = function () {
    const t = rand(0, 5), P0 = prenom(), n = P0.nom, a = rand(3, 9), b = rand(4, 30), l = pick(LIEUX5);
    if (t === 0) return { enonce: `${n} pense à un nombre. En le multipliant par $${a}$, ${P0.il} obtient $${a * b}$. Quel est ce nombre ?`, mode: "nombre", prefixe: "Nombre :", attendu: b,
      figure: barreEq([["", Array(a).fill(["?", 1, true])]], String(a * b), `Schéma en barre : ${a} fois le nombre cherché font ${a * b}`),
      erreurs: [{ valeur: a * b - a, message: `Multiplier par $${a}$ se défait en **divisant** par $${a}$, pas en soustrayant.` }, { valeur: a * b * a, message: `On divise par $${a}$, on ne multiplie pas.` }],
      aides: ["Appelle $x$ le nombre cherché.", `L'équation est $${a}x = ${a * b}$.`, `$x = ${a * b} \\div ${a}$.`], solution: `$${a}x = ${a * b}$ donc $x = ${a * b} \\div ${a} = ${b}$.` };
    if (t === 1) { const p = rand(2, 9) * 50, pt = rand(2, 6);
      return { enonce: `Un colis pèse $${nb(p * pt)}$ g. Il contient $${pt}$ boîtes de même masse (voir la balance). Quelle est la masse d'une boîte ? (On néglige l'emballage.)`, mode: "nombre", prefixe: "Masse :", suffixe: "g", attendu: p,
        figure: balance5(boites(pt, "?"), [p * pt], `Balance en équilibre : ${pt} boîtes de masse inconnue à gauche, une masse de ${nbTexte(p * pt)} g à droite`, "?"),
        erreurs: [{ valeur: p * pt - pt, message: `$${pt}$ boîtes : on divise la masse par $${pt}$, on ne soustrait pas.` }, { valeur: p * pt * pt, message: `On divise par $${pt}$, on ne multiplie pas.` }],
        aides: ["Appelle $x$ la masse d'une boîte.", `L'équation est $${pt}x = ${nb(p * pt)}$.`, `$x = ${nb(p * pt)} \\div ${pt}$.`], solution: `$${pt}x = ${nb(p * pt)}$ donc $x = ${nb(p * pt)} \\div ${pt} = ${p}$ g.` }; }
    if (t === 2) return { enonce: `Après avoir reçu $${a}$ €, ${n} a $${b + a}$ € dans sa tirelire. Combien avait-${P0.il} avant ?`, mode: "nombre", prefixe: "Somme :", suffixe: "€", attendu: b,
      figure: barreEq([["", [["?", b, true], [`${a} €`, a]]]], `${b + a} €`, `Schéma en barre : la somme de départ et les ${a} euros reçus font ${b + a} euros`),
      erreurs: [{ valeur: b + 2 * a, message: "Il faut retirer ce qu'on a reçu, pas l'ajouter." }, { valeur: b + a, message: "Ça, c'est la somme après avoir reçu l'argent : on cherche la somme d'avant." }],
      aides: ["Appelle $x$ la somme de départ.", `L'équation est $x + ${a} = ${b + a}$.`, `$x = ${b + a} - ${a}$.`], solution: `$x + ${a} = ${b + a}$ donc $x = ${b + a} - ${a} = ${b}$ €.` };
    if (t === 3) return { enonce: `Au marché de ${l}, ${n} vend $${a}$ ananas le matin. Il lui en reste $${b}$ le midi. Combien d'ananas avait-${P0.il} en arrivant ?`, mode: "nombre", prefixe: "Ananas :", attendu: a + b,
      figure: barreEq([["", [[String(b), b], [String(a), a]]]], "?", `Schéma en barre : les ananas du départ sont partagés en ${b} restants et ${a} vendus`),
      erreurs: [...(b > a ? [{ valeur: b - a, message: "Il faut rajouter les ananas vendus, pas les enlever." }] : []), { valeur: a * b, message: "On n'a pas de raison de multiplier : au départ, il y avait ceux qui restent **et** ceux qui sont vendus." }],
      aides: ["Appelle $x$ le nombre d'ananas au départ.", `L'équation est $x - ${a} = ${b}$.`, `$x = ${b} + ${a}$.`], solution: `$x - ${a} = ${b}$ donc $x = ${b} + ${a} = ${a + b}$ ananas.` };
    if (t === 4) { const pl = pick([15, 20, 25, 30, 35, 22.5, 27.5, 32.5]), k = rand(3, 8);
      return { enonce: `Pour une sortie en bateau à la rencontre des dauphins dans le lagon, chaque passager paie le même prix. ${n} paie $${nb(k * pl)}$ € pour $${k}$ passagers. Quel est le prix d'un ticket ?`, mode: "nombre", prefixe: "Prix :", suffixe: "€", attendu: pl,
        figure: barreEq([["", Array(k).fill(["?", 1, true])]], `${nbTexte(k * pl)} €`, `Schéma en barre : ${k} tickets de même prix coûtent ${nbTexte(k * pl)} euros`),
        erreurs: [{ valeur: k * pl - k, message: `On divise par $${k}$, on ne soustrait pas.` }, { valeur: k * pl * k, message: `On divise par $${k}$, on ne multiplie pas.` }],
        aides: ["Appelle $x$ le prix d'un ticket.", `L'équation est $${k}x = ${nb(k * pl)}$.`, `$x = ${nb(k * pl)} \\div ${k}$.`], solution: `$${k}x = ${nb(k * pl)}$ donc $x = ${nb(k * pl)} \\div ${k} = ${nb(pl)}$ €.` }; }
    const k = rand(2, 5), tot = (k + 1) * b;
    return { enonce: `${n} et son frère ont ensemble $${tot}$ billes. Le frère en a $${k}$ fois plus ${queN(n)}. Combien de billes a ${n} ?`, mode: "nombre", prefixe: "Billes :", attendu: b,
      figure: barreEq([[n, [["?", 1, true]]], ["frère", Array(k).fill(["?", 1, true])]], String(tot), `Schéma en barres : ${n} a une part, son frère ${k} parts égales ; ensemble ${tot} billes`),
      erreurs: [...(tot % k === 0 ? [{ valeur: tot / k, message: `${n} a $x$ billes et son frère $${k}x$ : ensemble, ils en ont $${k + 1}x$.` }] : []), { valeur: tot - k, message: `Le frère en a $${k}$ **fois** plus : on partage $${tot}$ en $${k + 1}$ parts égales.` }, { valeur: k * b, message: `Ça, c'est le nombre de billes du frère. ${n} en a $${k}$ fois moins.` }],
      aides: [`Appelle $x$ le nombre de billes de ${n}. Son frère en a $${k}x$.`, `Ensemble : $x + ${k}x = ${k + 1}x$.`, `L'équation est $${k + 1}x = ${tot}$.`], solution: `$x + ${k}x = ${tot}$, soit $${k + 1}x = ${tot}$, donc $x = ${tot} \\div ${k + 1} = ${b}$ billes.` };
  };

  /* =====================================================================
     Chapitre 15 : aires (ai5-)
     ===================================================================== */
  const arr = (x, k) => Math.round(x * 10 ** k) / 10 ** k;
  const UNA = [["mm²", -2], ["cm²", -1], ["dm²", 0], ["m²", 1], ["dam²", 2], ["hm²", 3], ["km²", 4]];
  // Triangle avec une hauteur tracée (base horizontale), longueurs écrites
  function figureAireTri(b, h, obtus, hLab) {
    const W = 320, H = 190, x0 = obtus ? 24 : 50, y0 = 160, L = obtus ? 196 : 210, hp = 120, hx = obtus ? x0 + L + 40 : x0 + rand(50, 160);
    const A = [x0, y0], B = [x0 + L, y0], C = [hx, y0 - hp], K = [hx, y0];
    let s = `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="Triangle ABC, base [AB] de ${b} cm, hauteur CK de ${h} cm">`;
    if (obtus) s += `<line class="g-droite" x1="${B[0]}" y1="${y0}" x2="${K[0] + 12}" y2="${y0}" stroke-dasharray="4 4"/>`;
    s += `<polygon class="g-poly" points="${[A, B, C].map((p) => p.join(",")).join(" ")}"/><line class="g-cache" x1="${C[0]}" y1="${C[1]}" x2="${K[0]}" y2="${K[1]}"/>`;
    s += `<path class="g-code" d="M${K[0] - 9} ${y0}v-9h9"/>`;
    const xb = obtus ? (A[0] + B[0]) / 2 : hx - x0 > x0 + L - hx ? (x0 + hx) / 2 - 4 : (hx + x0 + L) / 2 + 4;
    s += `<text class="g-mesure" x="${xb}" y="${y0 + 18}" text-anchor="middle">${String(b).replace(".", ",")} cm</text><text class="g-mesure" x="${K[0] + 6}" y="${y0 - hp / 2}">${hLab || String(h).replace(".", ",") + " cm"}</text>`;
    [["A", A, [-14, 4]], ["B", B, [6, 4]], ["C", C, [-4, -8]], ["K", K, [4, 16]]].forEach(([n, p, d]) => { s += `<text class="g-plabel" x="${p[0] + d[0]}" y="${p[1] + d[1]}">${n}</text>`; });
    return s + `</svg>`;
  }
  FIGURES["ai5-triangle"] = () => figureAireTri(8, 5, false);
  const mes = (v, u = "cm") => `${nbTexte(v)} ${u}`, P2 = (p) => p.map((q) => q.map((v) => +v.toFixed(1)).join(",")).join(" ");
  // Triangle rectangle (côtés de l'angle droit a et c)
  function figTriRectAire(a, c, u = "cm") {
    const k = Math.min(230 / a, 120 / c), A = [60, 150], B = [60 + a * k, 150], C = [60, 150 - c * k];
    return `<svg class="graph" viewBox="0 0 320 ${Math.ceil(176)}" role="img" aria-label="Triangle rectangle : côtés de l'angle droit ${mes(a, u)} et ${mes(c, u)}"><polygon class="g-poly" points="${P2([A, B, C])}"/><path class="g-code" d="M60 141h9v9"/><text class="g-mesure" x="${+((A[0] + B[0]) / 2).toFixed(1)}" y="168" text-anchor="middle">${mes(a, u)}</text><text class="g-mesure" x="54" y="${+((A[1] + C[1]) / 2 + 4).toFixed(1)}" text-anchor="end">${mes(c, u)}</text></svg>`;
  }
  // Parallélogramme de base b, hauteur h, autre côté c (c > h) ; hauteur en pointillés
  function figParaAire(b, h, c, u = "cm", lab = {}) {
    const dx = Math.sqrt(c * c - h * h), k = Math.min(230 / (b + dx), 110 / h), x0 = 50, y0 = 140;
    const A = [x0, y0], B = [x0 + b * k, y0], C = [x0 + (b + dx) * k, y0 - h * k], D = [x0 + dx * k, y0 - h * k], H = [D[0], y0];
    let s = `<svg class="graph" viewBox="0 0 320 168" role="img" aria-label="Parallélogramme : base ${lab.b || mes(b, u)}, hauteur ${lab.h || mes(h, u)}, côté penché ${mes(c, u)}"><polygon class="g-poly" points="${P2([A, B, C, D])}"/><line class="g-cache" x1="${+D[0].toFixed(1)}" y1="${+D[1].toFixed(1)}" x2="${+H[0].toFixed(1)}" y2="${y0}"/><path class="g-code" d="M${+(H[0] + 8).toFixed(1)} ${y0}v-8h-8"/>`;
    s += `<text class="g-mesure" x="${+((A[0] + B[0]) / 2).toFixed(1)}" y="${y0 + 18}" text-anchor="middle">${lab.b || mes(b, u)}</text><text class="g-mesure" x="${+(D[0] + 5).toFixed(1)}" y="${+((D[1] + y0) / 2 + 4).toFixed(1)}">${lab.h || mes(h, u)}</text>`;
    return s + `<text class="g-mesure" x="${+((A[0] + D[0]) / 2 - 6).toFixed(1)}" y="${+((A[1] + D[1]) / 2).toFixed(1)}" text-anchor="end">${mes(c, u)}</text></svg>`;
  }
  // Losange de diagonales d1 (horizontale) et d2 (verticale)
  function figLosange(d1, d2, u = "cm") {
    const k = Math.min(250 / d1, 130 / d2), cx = 160, cy = 76, a = (d1 * k) / 2, b = (d2 * k) / 2;
    return `<svg class="graph" viewBox="0 0 320 156" role="img" aria-label="Losange de diagonales ${mes(d1, u)} et ${mes(d2, u)}"><polygon class="g-poly" points="${P2([[cx - a, cy], [cx, cy - b], [cx + a, cy], [cx, cy + b]])}"/><g class="g-cache"><line x1="${+(cx - a).toFixed(1)}" y1="${cy}" x2="${+(cx + a).toFixed(1)}" y2="${cy}"/><line x1="${cx}" y1="${+(cy - b).toFixed(1)}" x2="${cx}" y2="${+(cy + b).toFixed(1)}"/></g><path class="g-code" d="M${cx + 8} ${cy}v-8h-8"/><text class="g-mesure" x="${+(cx - a / 2).toFixed(1)}" y="${cy + 15}" text-anchor="middle">${mes(d1, u)}</text><text class="g-mesure" x="${cx + 6}" y="${+(cy - b / 2).toFixed(1)}">${mes(d2, u)}</text></svg>`;
  }
  // Disque : rayon ou diamètre tracé
  function figDisque(r, dia, u = "cm", txt) {
    const R = 62, cx = 160, cy = 72;
    return `<svg class="graph" viewBox="0 0 320 146" role="img" aria-label="Disque de ${dia ? "diamètre" : "rayon"} ${txt || mes(dia ? 2 * r : r, u)}"><circle class="g-poly" cx="${cx}" cy="${cy}" r="${R}"/><circle class="g-point" cx="${cx}" cy="${cy}" r="2.5"/><line class="g-segment" x1="${dia ? cx - R : cx}" y1="${cy}" x2="${cx + R}" y2="${cy}"/><text class="g-mesure" x="${dia ? cx : cx + R / 2}" y="${cy - 6}" text-anchor="middle">${txt || mes(dia ? 2 * r : r, u)}</text></svg>`;
  }
  // Carré avec le plus grand disque possible (chutes coloriées)
  function figChutes(a, u = "cm") {
    return `<svg class="graph" viewBox="0 0 320 150" role="img" aria-label="Carré de côté ${mes(a, u)} contenant le plus grand disque possible ; les chutes sont coloriées"><rect class="g-poly" x="100" y="10" width="120" height="120"/><circle class="g-unite" style="fill:var(--surface)" cx="160" cy="70" r="60"/><text class="g-mesure" x="160" y="145" text-anchor="middle">${mes(a, u)}</text></svg>`;
  }
  // Figures composées : 0 = rectangle moins un coin, 1 = rectangle surmonté d'un triangle, 2 = rectangle + demi-disque
  function figComposee(t, L, l, a, b, u) {
    const k = Math.min(200 / (L + (t === 2 ? l / 2 : 0)), t === 1 ? 135 / (l + a) : 120 / l), x0 = 40, W = L * k, Hh = l * k, y0 = t === 1 ? 150 : 140;
    let s = "", h2 = 0;
    if (t === 0) { const aw = a * k, bh = b * k; s = `<polygon class="g-poly" points="${P2([[x0, y0 - Hh], [x0 + W - aw, y0 - Hh], [x0 + W - aw, y0 - Hh + bh], [x0 + W, y0 - Hh + bh], [x0 + W, y0], [x0, y0]])}"/><rect class="g-unite" style="stroke-dasharray:4 4;stroke-width:1" x="${+(x0 + W - aw).toFixed(1)}" y="${+(y0 - Hh).toFixed(1)}" width="${+aw.toFixed(1)}" height="${+bh.toFixed(1)}"/><text class="g-mesure" x="${+(x0 + W - aw / 2).toFixed(1)}" y="${+(y0 - Hh - 5).toFixed(1)}" text-anchor="middle">${mes(a, u)}</text><text class="g-mesure" x="${+(x0 + W + 5).toFixed(1)}" y="${+(y0 - Hh + bh / 2 + 4).toFixed(1)}">${mes(b, u)}</text>`; }
    if (t === 1) { h2 = a * k; s = `<polygon class="g-poly" points="${P2([[x0, y0], [x0 + W, y0], [x0 + W, y0 - Hh], [x0 + W / 2, y0 - Hh - h2], [x0, y0 - Hh]])}"/><line class="g-cache" x1="${+(x0 + W / 2).toFixed(1)}" y1="${+(y0 - Hh - h2).toFixed(1)}" x2="${+(x0 + W / 2).toFixed(1)}" y2="${+(y0 - Hh).toFixed(1)}"/><line class="g-cache" x1="${x0}" y1="${+(y0 - Hh).toFixed(1)}" x2="${+(x0 + W).toFixed(1)}" y2="${+(y0 - Hh).toFixed(1)}"/><text class="g-mesure" x="${+(x0 + W / 2 + 5).toFixed(1)}" y="${+(y0 - Hh - h2 / 2 + 4).toFixed(1)}">${mes(a, u)}</text>`; }
    if (t === 2) { const r = Hh / 2; s = `<path class="g-poly" d="M${x0} ${y0} H${+(x0 + W).toFixed(1)} A${+r.toFixed(1)} ${+r.toFixed(1)} 0 0 0 ${+(x0 + W).toFixed(1)} ${+(y0 - Hh).toFixed(1)} H${x0} Z"/><line class="g-cache" x1="${+(x0 + W).toFixed(1)}" y1="${y0}" x2="${+(x0 + W).toFixed(1)}" y2="${+(y0 - Hh).toFixed(1)}"/>`; }
    s += `<text class="g-mesure" x="${+(x0 + W / 2).toFixed(1)}" y="${y0 + 16}" text-anchor="middle">${mes(L, u)}</text><text class="g-mesure" x="${x0 - 5}" y="${+(y0 - Hh / 2 + 4).toFixed(1)}" text-anchor="end">${mes(l, u)}</text>`;
    const top = Math.max(0, Math.floor(y0 - Hh - h2 - 20));
    return `<svg class="graph" viewBox="0 ${top} 320 ${y0 + 24 - top}" role="img" aria-label="${["Rectangle de " + mes(L, u) + " sur " + mes(l, u) + " auquel on retire un coin rectangulaire de " + mes(a, u) + " sur " + mes(b, u), "Rectangle de " + mes(L, u) + " sur " + mes(l, u) + " surmonté d'un triangle de hauteur " + mes(a, u), "Rectangle de " + mes(L, u) + " sur " + mes(l, u) + " prolongé par un demi-disque de diamètre " + mes(l, u)][t]}">${s}</svg>`;
  }
  // Unités d'aire en escalier : départ et arrivée en couleur, « × 100 » ou « ÷ 100 » à chaque marche
  function figUnitesAire(i, j) {
    const w = 42, x0 = 13, sens = j > i ? -1 : 1;
    let s = `<svg class="graph" viewBox="0 0 320 70" role="img" aria-label="Unités d'aire de la plus petite à la plus grande ; chaque marche multiplie ou divise par 100">`;
    const ordre = UNA.map((u, k) => k).reverse();
    ordre.forEach((k, p) => { const x = x0 + p * w; s += `<rect class="${k === i || k === j ? "g-poly" : "g-unite"}" style="stroke-width:1.2" x="${x}" y="34" width="${w - 4}" height="24" rx="4"/><text class="g-label" x="${x + (w - 4) / 2}" y="50" text-anchor="middle">${UNA[k][0]}</text>`; });
    const pi = ordre.indexOf(i), pj = ordre.indexOf(j);
    for (let p = Math.min(pi, pj); p < Math.max(pi, pj); p++) { const x = x0 + p * w + w - 2; s += `<path class="g-segment" style="fill:none;stroke-width:1.4" d="M${x - 14} 32 Q${x} 18 ${x + 14} 32"/><text class="g-mesure" x="${x}" y="12" text-anchor="middle">${pj > pi ? "×100" : "÷100"}</text>`; }
    return s + `</svg>`;
  }
  FIGURES["ai5-cours-m2"] = () => { let s = `<svg class="graph bandes" viewBox="0 0 320 150" role="img" aria-label="Un carré de 1 m de côté partagé en 10 fois 10 carrés de 1 dm de côté : 1 m² = 100 dm²"><rect class="g-poly" x="96" y="8" width="128" height="128"/><g class="g-grid">`; for (let q = 1; q < 10; q++) s += `<line x1="${96 + 12.8 * q}" y1="8" x2="${96 + 12.8 * q}" y2="136"/><line x1="96" y1="${8 + 12.8 * q}" x2="224" y2="${8 + 12.8 * q}"/>`; return s + `</g><rect class="g-barre-plus" x="96" y="8" width="12.8" height="12.8"/><text class="g-mesure" x="160" y="148" text-anchor="middle">1 m = 10 dm</text><text class="g-label" x="230" y="20">1 dm²</text></svg>`; };
  FIGURES["ai5-cours-unites"] = () => figUnitesAire(3, 1);
  FIGURES["ai5-cours-para"] = () => figParaAire(7, 4, 5);
  FIGURES["ai5-cours-disque"] = () => figDisque(5, true);
  FIGURES["ai5-cours-composee"] = () => figComposee(1, 20, 12, 5, 0, "m");
  FIGURES["ai5-qcm-para"] = () => figParaAire(9, 5, 6);
  FIGURES["ai5-qcm-losange"] = () => figLosange(10, 6);
  FIGURES["ai5-qcm-disque"] = () => figDisque(3, false);
  FIGURES["ai5-qcm-chutes"] = () => figChutes(10);
  FIGURES["ai5-qcm-coin"] = () => figComposee(0, 10, 6, 4, 2, "m");
  FIGURES["ai5-qcm-trirect"] = () => figTriRectAire(8, 3);
  FIGURES["ai5-methode-table"] = () => figComposee(2, 6, 4, 0, 0, "dm");

  GEN["ai5-conversions"] = function () {
    const ctx = Math.random() < 0.3 ? pick([["Le terrain de foot du stade de", 3, pick([4, 5]), () => rand(60, 75) * 100], ["Une parcelle de bananiers à", 3, 4, () => rand(120, 990) * 10], ["Une ardoise d'élève d'un collège de", 1, 2, () => rand(40, 70) * 10], ["Le plateau d'une table du CDI à", 2, 3, () => rand(120, 250)], ["Un timbre posté à", 0, 1, () => rand(300, 900)], ["Une salle de classe d'un collège de", 3, 2, () => rand(450, 700) / 10]]) : null;
    const i = ctx ? ctx[1] : rand(0, 5), d = pick([1, -1]) * rand(1, 2), j = ctx ? ctx[2] : i + d; if (j < 0 || j > 6) return GEN["ai5-conversions"]();
    const v = ctx ? ctx[3]() : pick([rand(1, 99), rand(11, 999) / 10, rand(1, 9) / 100 * 100, rand(101, 9999) / 100]), r = arr(v * 100 ** (UNA[i][1] - UNA[j][1]), 8);
    if (r < 0.0001 || r > 1e7) return GEN["ai5-conversions"]();
    return { enonce: ctx ? `${ctx[0]} ${pick(LIEUX5)} a une aire de $${nb(v)}$ ${UNA[i][0]}. Exprime cette aire en ${UNA[j][0]}.` : `Convertis : $${nb(v)}$ ${UNA[i][0]} $= \\ldots$ ${UNA[j][0]}`, figure: Math.random() < 0.5 ? figUnitesAire(i, j) : undefined, mode: "nombre", prefixe: "Résultat :", suffixe: UNA[j][0], attendu: r,
      erreurs: [{ valeur: arr(v * 10 ** (UNA[i][1] - UNA[j][1]), 8), message: "Pour les aires, on passe d'une unité à la suivante en multipliant ou en divisant par $100$, pas par $10$." }, { valeur: arr(v * 100 ** (UNA[j][1] - UNA[i][1]), 8), message: `Mauvais sens : ${UNA[j][0]} est une unité plus ${UNA[i][1] > UNA[j][1] ? "petite" : "grande"} que ${UNA[i][0]}, il en faut donc ${UNA[i][1] > UNA[j][1] ? "plus" : "moins"} : on ${UNA[i][1] > UNA[j][1] ? "multiplie" : "divise"}.` }],
      aides: ["$1$ m² $= 100$ dm² : entre deux unités d'aire voisines, il y a un facteur $100$.", `De ${UNA[i][0]} à ${UNA[j][0]}, on ${UNA[i][1] > UNA[j][1] ? "multiplie" : "divise"} par $${nb(100 ** Math.abs(j - i))}$.`, "Dans un tableau de conversion, chaque unité d'aire occupe deux colonnes."],
      solution: `$${nb(v)}$ ${UNA[i][0]} $= ${nb(r)}$ ${UNA[j][0]} (on ${UNA[i][1] > UNA[j][1] ? "multiplie" : "divise"} par $${nb(100 ** Math.abs(j - i))}$).` };
  };

  GEN["ai5-triangle"] = function () {
    const t = rand(0, 2), b = rand(3, 15), h = rand(2, 12);
    if (t === 0) { const obtus = Math.random() < 0.3;
      return { enonce: `Calcule l'aire du triangle $ABC$ (la hauteur $[CK]$ est perpendiculaire à $(AB)$).`, figure: figureAireTri(b, h, obtus), mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: (b * h) / 2,
        erreurs: [{ valeur: b * h, message: "N'oublie pas de diviser par $2$ : un triangle est la moitié d'un rectangle." }, { valeur: b + h, message: "On **multiplie** la base par la hauteur (puis on divise par $2$), on n'additionne pas." }],
        aides: ["Aire d'un triangle $= \\dfrac{\\text{base} \\times \\text{hauteur}}{2}$.", `Ici la base est $[AB]$ ($${b}$ cm) et la hauteur relative est $CK$ ($${h}$ cm).`, `$\\dfrac{${b} \\times ${h}}{2}$.`], solution: `$\\mathcal{A} = \\dfrac{${b} \\times ${h}}{2} = \\dfrac{${b * h}}{2} = ${nb((b * h) / 2)}$ cm².` }; }
    if (t === 1) { const a = rand(3, 12), c = rand(3, 12), [quoi, u] = pick([["Un triangle est rectangle ; les deux côtés de l'angle droit mesurent", "cm"], ["Une voile de pirogue a la forme d'un triangle rectangle ; les côtés de l'angle droit mesurent", "dm"], ["Un fanion du collège a la forme d'un triangle rectangle ; les côtés de l'angle droit mesurent", "dm"], ["Dans un jardin de " + pick(LIEUX5) + ", un massif de fleurs a la forme d'un triangle rectangle ; les côtés de l'angle droit mesurent", "m"]]);
      return { enonce: `${quoi} $${a}$ ${u} et $${c}$ ${u}. Quelle est son aire ?`, figure: Math.random() < 0.6 ? figTriRectAire(a, c, u) : undefined, mode: "nombre", prefixe: "Aire :", suffixe: `${u}²`, attendu: (a * c) / 2,
        erreurs: [{ valeur: a * c, message: "Divise par $2$ : le triangle est la moitié d'un rectangle." }, { valeur: a + c, message: "On multiplie les deux côtés de l'angle droit (puis on divise par $2$), on ne les additionne pas." }],
        aides: ["Dans un triangle rectangle, un côté de l'angle droit est la hauteur relative à l'autre.", "Aire $= \\dfrac{\\text{base} \\times \\text{hauteur}}{2}$.", `$\\dfrac{${a} \\times ${c}}{2}$.`], solution: `$\\mathcal{A} = \\dfrac{${a} \\times ${c}}{2} = ${nb((a * c) / 2)}$ ${u}².` }; }
    const A = (b * h) / 2;
    return { enonce: `Le triangle $ABC$ a une aire de $${nb(A)}$ cm² et sa base $[AB]$ mesure $${b}$ cm. Quelle est la hauteur $CK$ relative à cette base ?`, figure: figureAireTri(b, h, Math.random() < 0.3, "?"), mode: "nombre", prefixe: "Hauteur :", suffixe: "cm", attendu: h,
      erreurs: [{ valeur: A / b, message: "Attention : $\\dfrac{b \\times h}{2} = \\mathcal{A}$, donc $b \\times h = 2 \\times \\mathcal{A}$." }, { valeur: 2 * A, message: `$${nb(2 * A)}$, c'est $b \\times h$ : il reste à diviser par la base $${b}$.` }],
      aides: ["$\\dfrac{\\text{base} \\times \\text{hauteur}}{2} = \\text{aire}$.", `Donc $${b} \\times h = 2 \\times ${nb(A)} = ${nb(2 * A)}$.`, `$h = ${nb(2 * A)} \\div ${b}$.`], solution: `$${b} \\times h = ${nb(2 * A)}$ donc $h = ${nb(2 * A)} \\div ${b} = ${h}$ cm.` };
  };

  GEN["ai5-parallelogramme"] = function () {
    const b = rand(3, 15), h = rand(2, 12), c = h + rand(1, 5), t = rand(0, 2);
    if (t === 2) { const u = pick(["cm", "m", "dm"]);
      return { enonce: `${u === "m" ? `Un champ de ${pick(LIEUX5)} a la forme d'un parallélogramme` : "Un parallélogramme"} d'aire $${b * h}$ ${u}². Sa base mesure $${b}$ ${u}. Quelle est la hauteur relative à cette base ?`, figure: figParaAire(b, h, c, u, { h: "?" }), mode: "nombre", prefixe: "Hauteur :", suffixe: u, attendu: h,
        erreurs: [{ valeur: b * h - b, message: `Aire $=$ base $\\times$ hauteur : on **divise** l'aire par la base.` }, ...((2 * h) % 1 === 0 && 2 * h !== h ? [{ valeur: 2 * h, message: "Pas de division par $2$ ici : c'est un parallélogramme, pas un triangle." }] : [])],
        aides: ["Aire $=$ base $\\times$ hauteur.", `Donc $${b} \\times h = ${b * h}$.`, `$h = ${b * h} \\div ${b}$.`], solution: `$${b} \\times h = ${b * h}$ donc $h = ${b * h} \\div ${b} = ${h}$ ${u}.` }; }
    if (t === 0) return { enonce: `Un parallélogramme a un côté de $${b}$ cm. La hauteur relative à ce côté mesure $${h}$ cm, et l'autre côté mesure $${c}$ cm. Quelle est son aire ?`, figure: Math.random() < 0.7 ? figParaAire(b, h, c) : undefined, mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: b * h,
      erreurs: [{ valeur: b * c, message: "On utilise la hauteur (perpendiculaire à la base), pas le côté penché." }, { valeur: (b * h) / 2, message: "C'est l'aire d'un triangle : pour un parallélogramme, on ne divise pas par $2$." }],
      aides: ["Aire d'un parallélogramme $=$ base $\\times$ hauteur.", "La hauteur est perpendiculaire à la base ; le côté penché ne sert pas.", `$${b} \\times ${h}$.`], solution: `$\\mathcal{A} = ${b} \\times ${h} = ${b * h}$ cm² (le côté de $${c}$ cm ne sert pas).` };
    const d1 = rand(2, 12) * 2, d2 = rand(2, 12);
    return { enonce: `Un losange a des diagonales de $${d1}$ cm et $${d2}$ cm. Il est formé de deux triangles de base $${d1}$ cm et de hauteur $${nb(d2 / 2)}$ cm. Quelle est son aire ?`, figure: figLosange(d1, d2), mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: (d1 * d2) / 2,
      erreurs: [{ valeur: d1 * d2, message: "Chaque triangle a pour aire $\\dfrac{\\text{base} \\times \\text{hauteur}}{2}$." }, { valeur: (d1 * d2) / 4, message: "Ça, c'est l'aire d'un seul triangle : le losange en contient deux." }],
      aides: ["La diagonale de $" + d1 + "$ cm partage le losange en deux triangles identiques.", `Aire d'un triangle : $\\dfrac{${d1} \\times ${nb(d2 / 2)}}{2}$.`, "Multiplie par $2$."], solution: `Un triangle : $\\dfrac{${d1} \\times ${nb(d2 / 2)}}{2} = ${nb((d1 * d2) / 4)}$ cm². Le losange : $2 \\times ${nb((d1 * d2) / 4)} = ${nb((d1 * d2) / 2)}$ cm².` };
  };

  GEN["ai5-disque"] = function () {
    const t = rand(0, 2), dia = Math.random() < 0.4, C = t === 1 ? pick([["Un rond-point de " + pick(LIEUX5) + " est un disque", "m", () => rand(6, 25)], ["Un trampoline est un disque", "dm", () => rand(12, 22)], ["Une pizza est un disque", "cm", () => rand(14, 22)], ["Un bassin du jardin botanique de Coconi est un disque", "m", () => rand(15, 60) / 10], ["Un tapis de prière rond est un disque", "cm", () => rand(40, 90)], ["Le fond d'une marmite de mataba est un disque", "cm", () => rand(10, 25)]]) : null;
    const u = C ? C[1] : "cm", r = C ? C[2]() : Math.random() < 0.4 ? rand(11, 99) / 10 : rand(2, 20);
    if (t <= 1) { const v = arr(Math.PI * r * r, 1), v314 = arr(3.14 * r * r, 1);
      return { enonce: `${C ? `${C[0]} de ${dia ? `diamètre $${nb(2 * r)}$` : `rayon $${nb(r)}$`} ${u}. Calcule son aire` : `Calcule l'aire d'un disque de ${dia ? `diamètre $${nb(2 * r)}$ cm` : `rayon $${nb(r)}$ cm`}`}. Donne la valeur arrondie au dixième de ${u}², avec la touche $\\pi$ de la calculatrice.`, figure: Math.random() < 0.6 ? figDisque(r, dia, u) : undefined, mode: "nombre", prefixe: "Aire :", suffixe: `${u}²`, attendu: v,
        erreurs: [{ valeur: arr(2 * Math.PI * r, 1), message: "Ça, c'est le périmètre du cercle. L'aire du disque est $\\pi \\times r \\times r$." }, ...(dia ? [{ valeur: arr(Math.PI * 4 * r * r, 1), message: "Le diamètre n'est pas le rayon : le rayon est la moitié du diamètre." }] : []), ...(v314 !== v ? [{ valeur: v314, message: "Utilise la touche $\\pi$ de la calculatrice, pas $3{,}14$." }] : [])],
        aides: ["Aire d'un disque $= \\pi \\times r \\times r$, où $r$ est le rayon.", dia ? `Le rayon est la moitié du diamètre : $r = ${nb(r)}$ ${u}.` : `Ici, $r = ${nb(r)}$ ${u}.`, `$\\pi \\times ${nb(r)} \\times ${nb(r)} \\approx ${nb(arr(Math.PI * r * r, 3))}$.`],
        solution: `$\\mathcal{A} = \\pi \\times ${nb(r)} \\times ${nb(r)} = ${nb(arr(r * r, 4))}\\pi \\approx ${nb(v)}$ ${u}².` }; }
    const a = rand(4, 30), v = arr(a * a - Math.PI * (a / 2) ** 2, 1), q = pick(["On découpe le plus grand disque possible dans un carré de carton", "Pour un napperon, on découpe le plus grand disque possible dans un carré de tissu de salouva", "Un menuisier de " + pick(LIEUX5) + " découpe le plus grand disque possible dans une plaque carrée de bois"]);
    return { enonce: `${q} de côté $${a}$ cm. Quelle est l'aire des chutes (partie coloriée) ? Donne la valeur arrondie au dixième de cm².`, figure: figChutes(a), mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: v,
      erreurs: [{ valeur: arr(Math.PI * (a / 2) ** 2, 1), message: "Ça, c'est l'aire du disque. Les chutes, c'est ce qui reste du carré : carré $-$ disque." }, { valeur: arr(a * a - 2 * Math.PI * (a / 2), 1), message: "Tu as utilisé le périmètre du cercle ($2\\pi r$) au lieu de l'aire du disque ($\\pi r^2$)." }],
      aides: [`Le disque a pour diamètre $${a}$ cm, donc pour rayon $${nb(a / 2)}$ cm.`, `Aire du carré : $${a * a}$ cm². Aire du disque : $\\pi \\times ${nb(a / 2)} \\times ${nb(a / 2)}$.`, "Chutes $=$ carré $-$ disque."],
      solution: `$${a * a} - \\pi \\times ${nb(a / 2)}^2 \\approx ${a * a} - ${nb(arr(Math.PI * (a / 2) ** 2, 2))} \\approx ${nb(v)}$ cm².` };
  };

  GEN["ai5-composees"] = function () {
    const t = rand(0, 2), L = rand(6, 15), l = rand(4, 10);
    if (L === l) return GEN["ai5-composees"]();
    if (t === 0) { const a = rand(2, L - 2), b = rand(2, l - 2);
      return { enonce: `${pick(["Une pièce", "La cour d'une école de " + pick(LIEUX5), "Un jardin potager", "Le sol d'un préau"])} a la forme d'un rectangle de $${L}$ m sur $${l}$ m auquel on a retiré, dans un coin, un rectangle de $${a}$ m sur $${b}$ m. Quelle est son aire ?`, figure: figComposee(0, L, l, a, b, "m"), mode: "nombre", prefixe: "Aire :", suffixe: "m²", attendu: L * l - a * b,
        erreurs: [{ valeur: L * l + a * b, message: "Le petit rectangle est retiré : on soustrait son aire." }, { valeur: L * l, message: "Ça, c'est l'aire du grand rectangle entier : il faut encore enlever le coin." }],
        aides: ["Calcule l'aire du grand rectangle.", "Calcule l'aire du rectangle retiré.", "Soustrais."], solution: `$${L} \\times ${l} - ${a} \\times ${b} = ${L * l} - ${a * b} = ${L * l - a * b}$ m².` }; }
    if (t === 1) { const h = rand(2, 8);
      return { enonce: `${pick(["Un panneau", "Le mur de façade d'une petite case (un banga)", "Un nichoir", "Le pignon d'un abri de jardin"])} est formé d'un rectangle de $${L}$ dm sur $${l}$ dm, surmonté d'un triangle de base $${L}$ dm et de hauteur $${h}$ dm. Quelle est son aire ?`, figure: figComposee(1, L, l, h, 0, "dm"), mode: "nombre", prefixe: "Aire :", suffixe: "dm²", attendu: L * l + (L * h) / 2,
        erreurs: [{ valeur: L * l + L * h, message: "L'aire du triangle est divisée par $2$." }, { valeur: L * l, message: "Tu as oublié le triangle du haut : il faut ajouter son aire." }],
        aides: [`Aire du rectangle : $${L} \\times ${l}$.`, `Aire du triangle : $\\dfrac{${L} \\times ${h}}{2}$.`, "Additionne les deux aires."], solution: `$${L} \\times ${l} + \\dfrac{${L} \\times ${h}}{2} = ${L * l} + ${nb((L * h) / 2)} = ${nb(L * l + (L * h) / 2)}$ dm².` }; }
    const d = rand(2, 6) * 2, v = arr(L * d + (Math.PI * (d / 2) ** 2) / 2, 1);
    return { enonce: `Une table a la forme d'un rectangle de $${L}$ dm sur $${d}$ dm, avec un demi-disque de diamètre $${d}$ dm accolé à une extrémité. Quelle est son aire ? Donne la valeur arrondie au dixième de dm².`, figure: figComposee(2, L, d, 0, 0, "dm"), mode: "nombre", prefixe: "Aire :", suffixe: "dm²", attendu: v,
      erreurs: [{ valeur: arr(L * d + Math.PI * (d / 2) ** 2, 1), message: "C'est un **demi**-disque : son aire est la moitié de $\\pi r^2$." }, { valeur: arr(L * d + (Math.PI * d * d) / 2, 1), message: "Le rayon est la moitié du diamètre : $r = " + nb(d / 2) + "$ dm." }],
      aides: [`Aire du rectangle : $${L} \\times ${d}$.`, `Le demi-disque a pour rayon $${d / 2}$ dm : son aire est $\\dfrac{\\pi \\times ${d / 2} \\times ${d / 2}}{2}$.`, "Additionne les deux aires, puis arrondis."], solution: `$${L * d} + \\dfrac{\\pi \\times ${d / 2}^2}{2} \\approx ${L * d} + ${nb(arr((Math.PI * (d / 2) ** 2) / 2, 2))} \\approx ${nb(v)}$ dm².` };
  };

  /* =====================================================================
     Chapitre 16 : probabilités (pb5-)
     ===================================================================== */
  // Figures du hasard (copies locales : urne et roue de la 6e ne sont pas exportées) ; l'initiale est écrite dans chaque boule ou secteur
  const C5 = { rouge: ["--faux", "R"], bleue: ["--lagon", "B"], verte: ["--bon", "V"], jaune: ["--ylang", "J"], gagnant: ["--ylang", "G"], perdant: ["--doux", "P"] };
  const nomC = (c, k) => (c === "bleue" ? "bleu" : c === "verte" ? "vert" : c) + (k > 1 ? "s" : "");
  function urne5(L) {
    const boules = L.flatMap(([c, n]) => Array(n).fill(c)), N = boules.length, pl = Math.min(8, Math.max(4, Math.ceil(Math.sqrt(N * 2)))), lg = Math.ceil(N / pl), r = 13, H = 50 + lg * 30, lb = pl * 30 + 24, x0 = (320 - lb) / 2;
    let s = `<svg class="graph" viewBox="0 0 320 ${H}" role="img" aria-label="Sac contenant ${L.filter((x) => x[1]).map(([c, n]) => `${n} boule${n > 1 ? "s" : ""} ${c}${n > 1 ? "s" : ""}`).join(", ")}"><path d="M${x0 + 10} 30 Q${x0} ${H - 4} ${x0 + lb / 2} ${H - 4} Q${x0 + lb} ${H - 4} ${x0 + lb - 10} 30 Z" style="fill:var(--lagon-pale);stroke:var(--doux);stroke-width:1.5"/><path d="M${x0 + lb / 2 - 26} 30 Q${x0 + lb / 2} 14 ${x0 + lb / 2 + 26} 30" style="fill:none;stroke:var(--doux);stroke-width:1.5"/>`;
    boules.forEach((c, k) => { const i = k % pl, j = Math.floor(k / pl), nl = j === lg - 1 ? N - j * pl : pl, cx = 160 + (i - (nl - 1) / 2) * 30, cy = 46 + j * 30; s += `<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:var(${C5[c][0]});fill-opacity:0.3;stroke:var(${C5[c][0]});stroke-width:2.5"/><text class="g-plabel" x="${cx}" y="${cy + 4}" text-anchor="middle">${C5[c][1]}</text>`; });
    return s + `</svg>`;
  }
  function roue5(cols) {
    const n = cols.length, cx = 160, cy = 92, R = 78, p = (a, rr) => `${+(cx + rr * Math.cos(a)).toFixed(1)} ${+(cy + rr * Math.sin(a)).toFixed(1)}`;
    let s = `<svg class="graph" viewBox="0 0 320 184" role="img" aria-label="Roue partagée en ${n} secteurs égaux : ${Object.keys(C5).map((c) => [c, cols.filter((x) => x === c).length]).filter((x) => x[1]).map(([c, k]) => `${k} ${nomC(c, k)}`).join(", ")}">`;
    cols.forEach((c, k) => { const a0 = (2 * Math.PI * k) / n - Math.PI / 2, a1 = a0 + (2 * Math.PI) / n, am = (a0 + a1) / 2; s += `<path d="M${cx} ${cy} L${p(a0, R)} A${R} ${R} 0 0 1 ${p(a1, R)} Z" style="fill:var(${C5[c][0]});fill-opacity:0.35;stroke:var(--encre);stroke-width:1.2"/><text class="g-plabel" x="${+(cx + R * 0.66 * Math.cos(am)).toFixed(1)}" y="${+(cy + R * 0.66 * Math.sin(am) + 4).toFixed(1)}" text-anchor="middle">${C5[c][1]}</text>`; });
    return s + `<path d="M${cx} ${cy - R - 10} l-7 -10 h14z" style="fill:var(--encre)"/><circle cx="${cx}" cy="${cy}" r="4" style="fill:var(--encre)"/></svg>`;
  }
  function cartes5(L, aria) {
    const n = L.length, w = Math.min(30, 300 / n - 4), x0 = (320 - n * (w + 4) + 4) / 2;
    return `<svg class="graph" viewBox="0 0 320 56" role="img" aria-label="${aria}">${L.map((l, k) => `<rect x="${+(x0 + k * (w + 4)).toFixed(1)}" y="8" width="${+w.toFixed(1)}" height="40" rx="4" style="fill:var(--surface);stroke:var(--doux);stroke-width:1.4"/><text class="g-clabel" x="${+(x0 + k * (w + 4) + w / 2).toFixed(1)}" y="33" text-anchor="middle">${l}</text>`).join("")}</svg>`;
  }
  // Les six faces d'un dé (les faces favorables entourées si fav est donné)
  function faces5(fav) {
    const P = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] };
    let s = `<svg class="graph" viewBox="0 0 320 64" role="img" aria-label="Les six faces d'un dé${fav ? ", faces " + fav.join(", ") + " mises en valeur" : ""}">`;
    for (let f = 1; f <= 6; f++) { const x = 14 + (f - 1) * 50, y = 10, on = fav && fav.includes(f); s += `<rect class="${on ? "g-barre-plus" : "g-unite"}" style="stroke-width:1.5" x="${x}" y="${y}" width="42" height="42" rx="7"/>${P[f].map(([a, b]) => `<circle class="g-point" cx="${x + 21 + a * 11}" cy="${y + 21 + b * 11}" r="3.6"/>`).join("")}`; }
    return s + `</svg>`;
  }
  // Échelle des probabilités de 0 à 1, avec des points nommés [nom, p]
  function echelleP(points, aria) {
    const X = (p) => +(30 + 260 * p).toFixed(1);
    const T = [[0, "0"], [0.5, "1/2"], [1, "1"]];
    let s = `<svg class="graph" viewBox="0 0 320 78" role="img" aria-label="${aria}"><g class="g-axis"><line x1="30" y1="40" x2="290" y2="40"/>${T.map(([p]) => `<line x1="${X(p)}" y1="35" x2="${X(p)}" y2="45"/>`).join("")}</g><g class="g-tick">${T.map(([p, t]) => `<text x="${X(p)}" y="58" text-anchor="middle">${t}</text>`).join("")}`;
    s += `</g><text class="g-label" x="30" y="74" text-anchor="middle">impossible</text><text class="g-label" x="290" y="74" text-anchor="middle">certain</text>`;
    points.forEach(([n, p]) => { s += `<circle class="g-point" cx="${X(p)}" cy="40" r="4"/><text class="g-plabel" x="${X(p)}" y="28" text-anchor="middle">${n}</text>`; });
    return s + `</svg>`;
  }
  FIGURES["pb5-cours-urne"] = () => urne5([["rouge", 3], ["bleue", 2]]);
  FIGURES["pb5-cours-de"] = () => faces5([3, 6]);
  FIGURES["pb5-cours-freq"] = () => diagrammeBarres([["Pile", 94], ["Face", 106]], 20, "lancers").replace(/aria-label="[^"]*"/, 'aria-label="Diagramme en barres de 200 lancers d\'une pièce : pile 94, face 106"');
  FIGURES["pb5-cours-echelle"] = () => echelleP([["pile", 0.5], ["6 au dé", 1 / 6], ["pas 6", 5 / 6]], "Échelle des probabilités : obtenir 6 au dé (1/6), obtenir pile (1/2), ne pas obtenir 6 (5/6)");
  FIGURES["pb5-qcm-urne"] = () => urne5([["rouge", 2], ["bleue", 5], ["verte", 3]]);
  FIGURES["pb5-qcm-roue"] = () => roue5(["jaune", "bleue", "jaune", "rouge", "bleue", "jaune", "bleue", "rouge"]);
  FIGURES["pb5-qcm-lagon"] = () => cartes5("LAGON".split(""), "Cinq cartons portant les lettres L, A, G, O, N");
  FIGURES["pb5-qcm-echelle"] = () => echelleP([["A", 0.1], ["B", 0.25], ["C", 0.5], ["D", 0.8]], "Échelle des probabilités avec les points A (0,1), B (0,25), C (0,5) et D (0,8)").replace(/ \(0,1\), B \(0,25\), C \(0,5\) et D \(0,8\)/, ", B, C et D");
  const EXPERIENCES = [
    () => { const ev = pick([["obtenir un nombre pair", [2, 4, 6]], ["obtenir un multiple de 3", [3, 6]], ["obtenir un nombre supérieur ou égal à 5", [5, 6]], ["obtenir un nombre premier", [2, 3, 5]], ["obtenir un nombre inférieur à 3", [1, 2]], ["obtenir 6", [6]], ["obtenir un nombre impair", [1, 3, 5]], ["obtenir un diviseur de 6", [1, 2, 3, 6]], ["obtenir un nombre strictement supérieur à 2", [3, 4, 5, 6]], ["obtenir un multiple de 4", [4]], ["obtenir un nombre différent de 1", [2, 3, 4, 5, 6]]]);
      return { ctx: "On lance un dé équilibré à six faces numérotées de 1 à 6.", n: 6, ev: ev[0], fav: ev[1].length, detail: `issues favorables : $${ev[1].join("$ ; $")}$`, fig: faces5() }; },
    () => { const nF = pick([4, 8, 10, 12, 20]), ev = pick([["obtenir un nombre pair", (x) => x % 2 === 0], ["obtenir un multiple de 3", (x) => x % 3 === 0], ["obtenir un nombre supérieur ou égal à " + (nF - 2), (x) => x >= nF - 2], ["obtenir un nombre premier", (x) => [2, 3, 5, 7, 11, 13, 17, 19].includes(x)], ["obtenir un multiple de 4", (x) => x % 4 === 0], ["obtenir un nombre inférieur ou égal à 3", (x) => x <= 3]]), F = Array.from({ length: nF }, (_, i) => i + 1).filter(ev[1]);
      return { ctx: `On lance un dé équilibré à $${nF}$ faces numérotées de $1$ à $${nF}$.`, n: nF, ev: ev[0], fav: F.length, detail: `issues favorables : $${F.join("$ ; $")}$` }; },
    () => { const r = rand(1, 8), v = rand(1, 8), j = rand(0, 6), c = pick([["rouge", r], ["verte", v], ["jaune", j]]); if (c[1] === 0 || r + v + j > 16) return null;
      return { ctx: `Une urne contient ${plur(r, "boule rouge", "boules rouges")}, ${plur(v, "boule verte", "boules vertes")}${j ? ` et ${plur(j, "boule jaune", "boules jaunes")}` : ""}, indiscernables au toucher. On tire une boule au hasard.`, n: r + v + j, ev: `tirer une boule ${c[0]}`, fav: c[1], detail: `${plur(c[1], `boule ${c[0]}`, `boules ${c[0]}s`)} sur $${r + v + j}$`, fig: urne5([["rouge", r], ["verte", v], ["jaune", j]]) }; },
    () => { const mot = pick(["MAYOTTE", "MAMOUDZOU", "LAGON", "COMORES", "BANANIER", "MANGROVE", "DZAOUDZI", "PAMANDZI", "MANIOC", "VANILLE", "PIROGUE", "MARAICHER", "TORTUE", "BAOBAB"]), l = pick([...new Set(mot.split(""))]), f = mot.split("").filter((c) => c === l).length;
      return { ctx: `On écrit chaque lettre du mot ${mot} sur un carton, puis on tire un carton au hasard.`, n: mot.length, ev: `tirer la lettre ${l}`, fav: f, detail: `$${f}$ carton${f > 1 ? "s" : ""} « ${l} » sur $${mot.length}$`, fig: cartes5(mot.split(""), `Cartons portant les lettres du mot ${mot}`) }; },
    () => { const n = pick([4, 5, 6, 8, 10, 12]), k = rand(1, n - 1), cols = shuffle([...Array(k).fill("gagnant"), ...Array(n - k).fill("perdant")]);
      return { ctx: `Une roue de loterie de la fête du village est partagée en $${n}$ secteurs identiques ; ${k > 1 ? `$${k}$ d'entre eux sont gagnants (G)` : "un seul est gagnant (G)"}, les autres perdants (P).`, n, ev: "tomber sur un secteur gagnant", fav: k, detail: `${plur(k, "secteur gagnant", "secteurs gagnants")} sur $${n}$`, fig: roue5(cols) }; },
    () => { const n = pick([6, 8, 8, 10, 12, 12]), cols = Array.from({ length: n }, () => pick(["rouge", "bleue", "verte", "jaune"])), c = pick([...new Set(cols)]), k = cols.filter((x) => x === c).length;
      return { ctx: `On fait tourner la roue ci-dessous, partagée en $${n}$ secteurs identiques (R : rouge, B : bleu, V : vert, J : jaune).`, n, ev: `la roue s'arrête sur un secteur ${nomC(c, 1)}`, fav: k, detail: `$${k}$ secteur${k > 1 ? "s" : ""} ${nomC(c, k)} sur $${n}$`, fig: roue5(cols) }; },
    () => { const n = rand(6, 12), ev = pick([["tirer un nombre pair", (x) => x % 2 === 0], ["tirer un multiple de 3", (x) => x % 3 === 0], ["tirer un nombre supérieur ou égal à 8", (x) => x >= 8], ["tirer un nombre impair", (x) => x % 2 === 1], ["tirer un multiple de 5", (x) => x % 5 === 0]]), L = Array.from({ length: n }, (_, i) => i + 1), F = L.filter(ev[1]); if (!F.length) return null;
      return { ctx: `Un sac contient $${n}$ jetons numérotés de $1$ à $${n}$. On tire un jeton au hasard.`, n, ev: ev[0], fav: F.length, detail: `issues favorables : $${F.join("$ ; $")}$`, fig: cartes5(L, `Jetons numérotés de 1 à ${n}`) }; }
  ];
  const experience = () => { for (;;) { const e = pick(EXPERIENCES)(); if (e) return e; } };

  GEN["pb5-calcul"] = function () {
    const e = experience(), p = e.fav / e.n;
    return { enonce: `${e.ctx} Quelle est la probabilité de l'évènement « ${e.ev} » ?${CONSIGNE_FR}`, figure: e.fig, mode: "nombre", prefixe: "Probabilité :", attendu: p,
      erreurs: [{ valeur: e.fav, message: "Ça, c'est le nombre d'issues favorables : il faut le diviser par le nombre total d'issues." }, ...(e.n - e.fav ? [{ valeur: e.fav / (e.n - e.fav), message: "On divise par le nombre **total** d'issues, pas par le nombre d'issues défavorables." }] : []), ...approx(p)],
      aides: ["Dans une situation d'équiprobabilité, probabilité $= \\dfrac{\\text{nombre d'issues favorables}}{\\text{nombre total d'issues}}$.", `Nombre total d'issues : $${e.n}$.`, `Compte les issues qui réalisent l'évènement (${e.detail.replace(/\$/g, "")}).`],
      solution: `Il y a $${e.n}$ issues équiprobables et ${e.detail} : la probabilité est $${fr(e.fav, e.n)}$${pgcd(e.fav, e.n) > 1 ? ` $= ${frNet(e.fav, e.n)}$` : ""}.` };
  };

  GEN["pb5-vocab"] = function () {
    const t = rand(0, 4), choixE = ["impossible", "peu probable", "une chance sur deux", "très probable", "certain"];
    if (t === 3) {
      // évènement sur un sac : la composition fixe la catégorie sans ambiguïté (0 ; au plus 1/5 ; 1/2 ; au moins 4/5 ; 1)
      const cat = rand(0, 4), N = pick([6, 8, 10, 12]), c = pick(["rouge", "bleue", "verte", "jaune"]), autre = pick(["rouge", "bleue", "verte", "jaune"].filter((x) => x !== c));
      const k = [0, rand(1, Math.floor(N / 5)), N / 2, N - rand(1, Math.floor(N / 5)), N][cat];
      return { enonce: `On tire une boule au hasard dans ce sac. Où placer l'évènement « tirer une boule ${c} » sur l'échelle des probabilités ?`, figure: urne5([[c, k], [autre, N - k]]), mode: "choix", choix: choixE, attendu: cat,
        aides: ["Compte les boules de la couleur demandée et toutes les boules.", "Probabilité $= \\dfrac{\\text{boules favorables}}{\\text{nombre total de boules}}$.", "$0$ : impossible ; $\\dfrac{1}{2}$ : une chance sur deux ; $1$ : certain."],
        solution: `Il y a $${k}$ boule${k > 1 ? "s" : ""} ${c}${k > 1 ? "s" : ""} sur $${N}$ : probabilité $${fr(k, N)}$${k && k !== N && pgcd(k, N) > 1 ? ` $= ${frNet(k, N)}$` : ""}. L'évènement est ${choixE[cat]}.` };
    }
    if (t === 4) {
      // lire une échelle : quel point correspond à une probabilité donnée ?
      const P = shuffle([[1, 10], [1, 4], [1, 2], [3, 4], [9, 10], [1, 5], [4, 5], [2, 5], [3, 5], [1, 3], [2, 3]].slice()).slice(0, 4).sort((a, b) => a[0] / a[1] - b[0] / b[1]);
      if (P.some((p, i) => i && p[0] / p[1] - P[i - 1][0] / P[i - 1][1] < 0.12)) return GEN["pb5-vocab"]();
      const noms = ["A", "B", "C", "D"], i = rand(0, 3), ecr = rand(0, 2), v = P[i][0] / P[i][1], txt = ecr === 0 || !decCourt(v) ? fr(...P[i]) : ecr === 1 ? nb(v) : `${nb(100 * v)}\\,\\%`;
      return { enonce: `Sur l'échelle des probabilités, quel point correspond à une probabilité de $${txt}$ ?`, figure: echelleP(noms.map((n, k) => [n, P[k][0] / P[k][1]]), "Échelle des probabilités de 0 à 1 avec quatre points A, B, C, D"), mode: "choix", choix: noms.map((n) => `point ${n}`), attendu: i,
        aides: ["L'échelle va de $0$ (impossible) à $1$ (certain), avec $\\dfrac{1}{2}$ au milieu.", "Compare la probabilité à $\\dfrac{1}{2}$ : plus petite, plus grande ?", `$${txt} = ${nb(arr(v, 3))}$ environ : situe ce nombre entre $0$ et $1$.`],
        solution: `$${txt}${decCourt(v) ? "" : ` \\approx ${nb(arr(v, 2))}`}$ : c'est le point ${noms[i]}.` };
    }
    if (t === 0) {
      const E = pick([["obtenir 7 en lançant un dé à six faces", 0], ["obtenir un nombre entre 1 et 6 en lançant un dé à six faces", 4], ["obtenir pile en lançant une pièce équilibrée", 2], ["obtenir 6 en lançant un dé équilibré", 1], ["ne pas obtenir 6 en lançant un dé équilibré", 3], ["obtenir 10 fois de suite le chiffre 1 en lançant un dé", 1], ["tirer une boule rouge dans une urne qui ne contient que des boules rouges", 4], ["tirer une boule bleue dans une urne qui ne contient que des boules rouges", 0], ["ne pas gagner le gros lot au loto", 3], ["obtenir un nombre pair avec un dé équilibré", 2], ["tirer une carte rouge dans un jeu de 32 cartes (16 rouges, 16 noires)", 2], ["tirer une boule verte dans une urne de 9 boules vertes et 1 rouge", 3], ["obtenir un nombre inférieur à 10 en lançant un dé à six faces", 4], ["obtenir 0 en lançant un dé à six faces", 0], ["obtenir face en lançant une pièce équilibrée", 2], ["tirer un as dans un jeu de 32 cartes (4 as)", 1], ["ne pas tirer un as dans un jeu de 32 cartes (4 as)", 3], ["tirer la lettre Z dans les lettres du mot MAYOTTE", 0], ["qu'il fasse jour à midi demain à Mamoudzou", 4], ["tirer un jeton pair parmi des jetons numérotés de 1 à 10", 2], ["tirer le jeton 7 parmi des jetons numérotés de 1 à 20", 1], ["ne pas tirer le jeton 7 parmi des jetons numérotés de 1 à 20", 3], ["obtenir un nombre impair avec un dé équilibré", 2]]);
      const choix = choixE;
      return { enonce: `Où placer l'évènement « ${E[0]} » sur l'échelle des probabilités ?`, mode: "choix", choix, attendu: E[1],
        aides: ["Une probabilité est comprise entre $0$ (impossible) et $1$ (certain).", "« Une chance sur deux » correspond à $\\dfrac{1}{2}$.", "Compte les issues favorables et toutes les issues possibles."], solution: `L'évènement « ${E[0]} » est ${choix[E[1]]}.` };
    }
    if (t === 1) {
      let e; do e = experience(); while (e.n === 6 && e.ctx.includes("dé"));
      return { enonce: `${e.ctx} Combien y a-t-il d'issues possibles (en distinguant chaque objet) ?`, figure: e.fig, mode: "nombre", prefixe: "Issues :", attendu: e.n,
        erreurs: [...(e.fav !== e.n ? [{ valeur: e.fav, message: "Ça, ce sont seulement les issues qui réalisent l'évènement : on compte **toutes** les issues." }] : [])],
        aides: ["Une issue est un résultat possible de l'expérience.", "Chaque face, chaque boule, chaque carton ou chaque secteur est une issue.", "Compte-les tous."], solution: `Il y a $${e.n}$ issues possibles.` };
    }
    const p = pick([[1, 2], [1, 4], [3, 4], [1, 5], [1, 10], [2, 5], [3, 5], [4, 5], [3, 10], [7, 10], [9, 10], [1, 20], [3, 20], [7, 20], [1, 25], [4, 25], [1, 50], [1, 3], [2, 3], [1, 6], [5, 6], [2, 7], [3, 8]]), pct = (100 * p[0]) / p[1];
    if (!Number.isInteger(pct)) return { enonce: `« ${p[0] === 1 ? "Une" : p[0]} chance${p[0] > 1 ? "s" : ""} sur ${p[1]} » : quelle est cette probabilité ?${CONSIGNE_FR}`, mode: "nombre", prefixe: "Probabilité :", attendu: p[0] / p[1], erreurs: approx(p[0] / p[1]),
      aides: ["« $a$ chances sur $b$ » correspond à la fraction $\\dfrac{a}{b}$.", "Le numérateur est le nombre de chances.", "Le dénominateur est le nombre total de cas."], solution: `« ${p[0] === 1 ? "Une chance" : p[0] + " chances"} sur ${p[1]} » correspond à $${fr(p[0], p[1])}$.` };
    return { enonce: `Une probabilité vaut $${fr(...p)}$. Écris-la en pourcentage.`, mode: "nombre", prefixe: "Probabilité :", suffixe: "%", attendu: pct,
      erreurs: [{ valeur: p[0] / p[1], message: "Ça, c'est l'écriture décimale. Multiplie par $100$ pour obtenir le pourcentage." }],
      aides: [`$${fr(...p)} = ${nb(p[0] / p[1])}$.`, "Un pourcentage est une fraction de dénominateur $100$.", `$${nb(p[0] / p[1])} = \\dfrac{\\ldots}{100}$.`], solution: `$${fr(...p)} = ${nb(p[0] / p[1])} = \\dfrac{${pct}}{100} = ${pct}\\,\\%$.` };
  };

  GEN["pb5-frequences"] = function () {
    const t = rand(0, 2), N = pick([20, 25, 40, 50, 100, 200]);
    if (t <= 1) {
      const faces = [1, 2, 3, 4, 5, 6]; let eff; for (;;) { eff = faces.map(() => rand(Math.floor(N / 10), Math.ceil(N / 4))); const s = eff.reduce((a, b) => a + b, 0); const d = N - s; if (eff[5] + d > 0) { eff[5] += d; break; } }
      const k = rand(0, 5), f = eff[k] / N, diag = t === 1;
      return { enonce: diag ? `On a lancé un dé $${N}$ fois ; le diagramme donne le nombre de sorties de chaque face. Quelle est la fréquence d'apparition du $${k + 1}$ (en écriture décimale) ?` : `On a lancé un dé $${N}$ fois et noté les résultats. Quelle est la fréquence d'apparition du $${k + 1}$ (en écriture décimale) ?`,
        ...(diag ? { figure: barresMoyenne(eff, faces.map(String), null, "sorties", `Diagramme en barres des sorties de chaque face sur ${N} lancers : ${eff.join(", ")}`, true) } : { tableau: { lignes: [["\\text{Face}", "\\text{Effectif}"], ...faces.map((x, i) => [String(x), eff[i]]), ["\\text{Total}", N]] } }), mode: "nombre", prefixe: "Fréquence :", attendu: f,
        erreurs: [{ valeur: eff[k], message: "Ça, c'est l'effectif. La fréquence est l'effectif divisé par le nombre de lancers." }, { valeur: arr(1 / 6, 2), message: "Ça, c'est (environ) la probabilité théorique. On demande la fréquence observée." }],
        aides: ["Fréquence $=$ effectif $\\div$ effectif total.", `Le $${k + 1}$ est sorti $${eff[k]}$ fois sur $${N}$.`, `$${eff[k]} \\div ${N}$.`], solution: `$${eff[k]} \\div ${N} = ${nb(f)}$.` };
    }
    const Np = pick([10, 12, 20]), kp = rand(Math.ceil(Np * 0.65), Np - 1), Nd = pick([600, 1200, 1800, 2400, 3000, 6000, 12000]), fd = rand(1, 6), Nr = pick([100, 200, 400, 500, 1000]), kr = pick([2, 4, 5]), nr = pick([8, 10]);
    const Q = pick([
      [`On lance une pièce équilibrée $${Np}$ fois et on obtient $${kp}$ fois pile. Que peut-on dire ?`, `C'est possible : sur peu de lancers, la fréquence peut s'éloigner de la probabilité $0{,}5$.`, ["La pièce est forcément truquée.", `La probabilité d'obtenir pile est $${nb(kp / Np)}$.`, "Au prochain lancer, on obtiendra forcément face."]],
      [`On lance un dé équilibré $${nb(Nd)}$ fois. Combien de fois environ obtiendra-t-on le $${fd}$ ?`, `environ $${nb(Nd / 6)}$ fois`, [`exactement $${nb(Nd / 6)}$ fois`, `environ $${nb(Nd / 2)}$ fois`, `environ $${nb(Nd / 10)}$ fois`]],
      [`Une roue a $${nr}$ secteurs identiques dont $${kr}$ gagnants. On la fait tourner $${nb(Nr)}$ fois. Combien de fois environ gagnera-t-on ?`, `environ $${nb((Nr * kr) / nr)}$ fois`, [`exactement $${nb((Nr * kr) / nr)}$ fois`, `environ $${nb(Nr / kr)}$ fois`, `environ $${nb(Nr - kr)}$ fois`]],
      [`On répète un très grand nombre de fois l'expérience « ${pick(["lancer une pièce", "lancer un dé", "tirer une boule dans un sac et la remettre", "faire tourner une roue de loterie", "tirer un carton et le remettre"])} ». La fréquence d'un évènement :`, "se rapproche de sa probabilité", ["devient égale à $1$", "reste toujours très différente de sa probabilité", pick(["devient égale à $0$", "est toujours exactement égale à sa probabilité"])]],
      (() => { const f = rand(1, 6), k = pick(["trois", "quatre", "cinq"]); return [`Un dé équilibré vient de donner $${f}$ ${k} fois de suite. La probabilité d'obtenir $${f}$ au lancer suivant est :`, "$\\dfrac{1}{6}$", ["$0$", "plus petite que $\\dfrac{1}{6}$", "plus grande que $\\dfrac{1}{6}$"]]; })(),
      (() => { const n = pick(["Awa", "Anli", "Fatima", "Saïd", "Nasra"]), N = pick([20, 25, 50]), k = rand(Math.ceil(N * 0.3), Math.floor(N * 0.45)); return [`${n} lance une pièce équilibrée $${N}$ fois et obtient $${k}$ fois face. Quelle est la fréquence de face ?`, `$${nb(k / N)}$`, [`$${k}$`, "$0{,}5$", `$${nb((N - k) / N)}$`]]; })()
    ]);
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu, aides: ["La probabilité est une valeur théorique ; la fréquence est observée lors d'expériences.", "Sur un petit nombre d'essais, la fréquence peut être loin de la probabilité.", "Sur un très grand nombre d'essais, elle s'en rapproche. Le dé n'a pas de mémoire."], solution: `Réponse : ${Q[1]}` };
  };

  /* =====================================================================
     Chapitre 17 : solides et volumes (sv5-)
     ===================================================================== */
  const UNV = [["mm³", -2], ["cm³", -1], ["dm³", 0], ["m³", 1]];
  const UNC = [["mL", -3], ["cL", -2], ["dL", -1], ["L", 0], ["hL", 2]];
  const { dessinSolide } = window.PM_EXO.college;
  const Ln = (x1, y1, x2, y2, c) => `<line class="${c ? "g-cache" : "g-segment"}" x1="${+x1.toFixed(1)}" y1="${+y1.toFixed(1)}" x2="${+x2.toFixed(1)}" y2="${+y2.toFixed(1)}"/>`;
  const Tx = (x, y, t, a = "middle") => `<text class="g-mesure" x="${+x.toFixed(1)}" y="${+y.toFixed(1)}" text-anchor="${a}">${t}</text>`;
  // Pavé droit en perspective cavalière, cotes écrites (lab = { L, l, h } pour remplacer une cote, par exemple par « ? »)
  function paveCote(L, l, h, u = "cm", lab = {}) {
    const k = Math.min(230 / (L + 0.41 * l), 125 / (h + 0.29 * l)), W = L * k, H = h * k, dx = 0.41 * l * k, dy = 0.29 * l * k, x0 = (320 - W - dx) / 2 + 6, y0 = 16 + dy + H;
    let s = `<svg class="graph" viewBox="0 0 320 ${Math.ceil(y0 + 24)}" role="img" aria-label="Pavé droit en perspective cavalière : longueur ${lab.L || mes(L, u)}, largeur ${lab.l || mes(l, u)}, hauteur ${lab.h || mes(h, u)}"><rect class="g-poly" x="${+x0.toFixed(1)}" y="${+(y0 - H).toFixed(1)}" width="${+W.toFixed(1)}" height="${+H.toFixed(1)}"/>`;
    s += Ln(x0, y0 - H, x0 + dx, y0 - H - dy) + Ln(x0 + dx, y0 - H - dy, x0 + W + dx, y0 - H - dy) + Ln(x0 + W, y0 - H, x0 + W + dx, y0 - H - dy) + Ln(x0 + W + dx, y0 - H - dy, x0 + W + dx, y0 - dy) + Ln(x0 + W, y0, x0 + W + dx, y0 - dy);
    s += Ln(x0 + dx, y0 - dy, x0, y0, 1) + Ln(x0 + dx, y0 - dy, x0 + dx, y0 - H - dy, 1) + Ln(x0 + dx, y0 - dy, x0 + W + dx, y0 - dy, 1);
    return s + Tx(x0 + W / 2, y0 + 16, lab.L || mes(L, u)) + Tx(x0 - 5, y0 - H / 2 + 4, lab.h || mes(h, u), "end") + Tx(x0 + W + dx / 2 + 7, y0 - dy / 2 + 10, lab.l || mes(l, u), "start") + `</svg>`;
  }
  // Cylindre (axe vertical) : rayon tracé sur la base du haut, hauteur à droite
  function cylindreCote(r, h, u = "cm", lab = {}) {
    const k = Math.min(95 / r, 120 / (h + 0.6 * r)), rx = r * k, ry = rx * 0.3, H = h * k, cx = 150, y1 = 22 + ry, y2 = y1 + H;
    return `<svg class="graph" viewBox="0 0 320 ${Math.ceil(y2 + ry + 10)}" role="img" aria-label="Cylindre de rayon ${lab.r || mes(r, u)} et de hauteur ${lab.h || mes(h, u)}"><path class="g-poly" style="stroke:none" d="M${+(cx - rx).toFixed(1)} ${+y1.toFixed(1)} V${+y2.toFixed(1)} A${+rx.toFixed(1)} ${+ry.toFixed(1)} 0 0 0 ${+(cx + rx).toFixed(1)} ${+y2.toFixed(1)} V${+y1.toFixed(1)} Z"/><ellipse class="g-arc-plein" cx="${cx}" cy="${+y1.toFixed(1)}" rx="${+rx.toFixed(1)}" ry="${+ry.toFixed(1)}"/><path class="g-arc-plein" d="M${+(cx - rx).toFixed(1)} ${+y2.toFixed(1)} A${+rx.toFixed(1)} ${+ry.toFixed(1)} 0 0 0 ${+(cx + rx).toFixed(1)} ${+y2.toFixed(1)}"/><path class="g-cache-arc" d="M${+(cx - rx).toFixed(1)} ${+y2.toFixed(1)} A${+rx.toFixed(1)} ${+ry.toFixed(1)} 0 0 1 ${+(cx + rx).toFixed(1)} ${+y2.toFixed(1)}"/>${Ln(cx - rx, y1, cx - rx, y2)}${Ln(cx + rx, y1, cx + rx, y2)}${Ln(cx, y1, cx + rx, y1)}<circle class="g-point" cx="${cx}" cy="${+y1.toFixed(1)}" r="2.5"/>${Tx(cx + rx / 2, y1 - ry - 5, lab.r || mes(r, u))}${Tx(cx + rx + 6, (y1 + y2) / 2 + 4, lab.h || mes(h, u), "start")}</svg>`;
  }
  // Prisme droit couché : base = triangle rectangle de côtés a (horizontal) et b (vertical) à l'avant, longueur h vers l'arrière
  function prismeTriCote(a, b, h, u = "cm") {
    const k = Math.min(200 / (a + 0.45 * h), 120 / (b + 0.32 * h)), A = a * k, B = b * k, dx = 0.45 * h * k, dy = 0.32 * h * k, x0 = (320 - A - dx) / 2 + 8, y0 = 14 + dy + B;
    let s = `<svg class="graph" viewBox="0 0 320 ${Math.ceil(y0 + 24)}" role="img" aria-label="Prisme droit dont la base est un triangle rectangle de côtés ${mes(a, u)} et ${mes(b, u)}, de hauteur ${mes(h, u)}"><polygon class="g-poly" points="${P2([[x0, y0], [x0 + A, y0], [x0, y0 - B]])}"/><path class="g-code" d="M${+x0.toFixed(1)} ${+(y0 - 9).toFixed(1)}h9v9"/>`;
    s += Ln(x0, y0 - B, x0 + dx, y0 - B - dy) + Ln(x0 + A, y0, x0 + A + dx, y0 - dy) + Ln(x0 + dx, y0 - B - dy, x0 + A + dx, y0 - dy) + Ln(x0 + dx, y0 - dy, x0, y0, 1) + Ln(x0 + dx, y0 - dy, x0 + dx, y0 - B - dy, 1) + Ln(x0 + dx, y0 - dy, x0 + A + dx, y0 - dy, 1);
    return s + Tx(x0 + A / 2, y0 + 16, mes(a, u)) + Tx(x0 - 5, y0 - B / 2 + 4, mes(b, u), "end") + Tx(x0 + A + dx / 2 + 7, y0 - dy / 2 + 10, mes(h, u), "start") + `</svg>`;
  }
  // Patron d'un cylindre : rectangle (hauteur h) et deux disques ; la longueur du rectangle est marquée « ? »
  function patronCyl(r, h, u = "cm") {
    const k = Math.min(150 / (2 * Math.PI * r), 70 / h, 34 / r), W = 2 * Math.PI * r * k, H = h * k, R = r * k, x0 = (320 - W) / 2, yR = 12 + 2 * R;
    return `<svg class="graph" viewBox="0 0 320 ${Math.ceil(yR + H + 2 * R + 28)}" role="img" aria-label="Patron d'un cylindre de rayon ${mes(r, u)} et de hauteur ${mes(h, u)} : un rectangle et deux disques ; la longueur du rectangle est inconnue"><rect class="g-poly" x="${+x0.toFixed(1)}" y="${+yR.toFixed(1)}" width="${+W.toFixed(1)}" height="${+H.toFixed(1)}"/><circle class="g-poly" cx="${+(x0 + W / 3).toFixed(1)}" cy="${+(yR - R).toFixed(1)}" r="${+R.toFixed(1)}"/><circle class="g-poly" cx="${+(x0 + (2 * W) / 3).toFixed(1)}" cy="${+(yR + H + R).toFixed(1)}" r="${+R.toFixed(1)}"/>${Ln(x0 + W / 3, yR - R, x0 + W / 3 + R, yR - R)}${Tx(x0 + W / 3 + R + 4, yR - R + 4, mes(r, u), "start")}${Tx(x0 - 5, yR + H / 2 + 4, mes(h, u), "end")}${Tx(x0 + W / 2, yR + H + 2 * R + 20, "longueur : ?")}</svg>`;
  }
  FIGURES["sv5-cours-pave"] = () => paveCote(5, 3, 2, "cm");
  FIGURES["sv5-cours-cylindre"] = () => cylindreCote(4, 10, "cm");
  FIGURES["sv5-cours-prisme"] = () => prismeTriCote(4, 3, 6, "cm");
  FIGURES["sv5-cours-patron"] = () => patronCyl(3, 5, "cm");
  FIGURES["sv5-cours-dm3"] = () => { let s = `<svg class="graph bandes" viewBox="0 0 320 150" role="img" aria-label="Un cube de 1 dm d'arête : 10 rangées de 10 petits cubes de 1 cm sur chaque couche, et 10 couches : 1 000 cm³">`; const x0 = 100, y0 = 136, a = 100, d = 0.41 * a, e = 0.29 * a; s += `<rect class="g-poly" x="${x0}" y="${y0 - a}" width="${a}" height="${a}"/><polygon class="g-poly" points="${P2([[x0, y0 - a], [x0 + d, y0 - a - e], [x0 + a + d, y0 - a - e], [x0 + a, y0 - a]])}"/><polygon class="g-poly" points="${P2([[x0 + a, y0 - a], [x0 + a + d, y0 - a - e], [x0 + a + d, y0 - e], [x0 + a, y0]])}"/><g class="g-grid">`; const Lg = (...p) => Ln(...p).replace(' class="g-segment"', ""); for (let q = 1; q < 10; q++) s += Lg(x0 + q * 10, y0 - a, x0 + q * 10, y0) + Lg(x0, y0 - q * 10, x0 + a, y0 - q * 10) + Lg(x0 + q * 10, y0 - a, x0 + q * 10 + d, y0 - a - e) + Lg(x0 + a, y0 - q * 10, x0 + a + d, y0 - q * 10 - e) + Lg(x0 + (q * d) / 10, y0 - a - (q * e) / 10, x0 + a + (q * d) / 10, y0 - a - (q * e) / 10) + Lg(x0 + a + (q * d) / 10, y0 - a - (q * e) / 10, x0 + a + (q * d) / 10, y0 - (q * e) / 10); return s + `</g>${Tx(x0 + a / 2, y0 + 12, "1 dm = 10 cm")}</svg>`; };
  FIGURES["sv5-qcm-pave"] = () => paveCote(4, 3, 2, "cm");
  FIGURES["sv5-qcm-cylindre"] = () => cylindreCote(2, 5, "cm");
  FIGURES["sv5-qcm-prisme"] = () => prismeTriCote(6, 4, 10, "cm");
  FIGURES["sv5-qcm-aquarium"] = () => paveCote(50, 30, 40, "cm");

  GEN["sv5-volumes"] = function () {
    const t = rand(0, 4);
    if (t === 0) { const a = rand(2, 25); return { enonce: `Calcule le volume d'un cube d'arête $${a}$ cm.`, figure: Math.random() < 0.5 ? paveCote(a, a, a) : undefined, mode: "nombre", prefixe: "Volume :", suffixe: "cm³", attendu: a ** 3,
      erreurs: [{ valeur: a * a, message: "Ça, c'est l'aire d'une face. Le volume est $a \\times a \\times a$." }, { valeur: 3 * a, message: "$a^3$ n'est pas $3 \\times a$." }],
      aides: ["Volume d'un cube $= a \\times a \\times a = a^3$.", `$${a} \\times ${a} = ${a * a}$.`, `$${a * a} \\times ${a}$.`], solution: `$V = ${a}^3 = ${a ** 3}$ cm³.` }; }
    if (t === 1) { const L = rand(3, 15), l = rand(2, 10), h = Math.random() < 0.3 ? rand(11, 99) / 10 : rand(2, 12), v = arr(L * l * h, 4);
      const ctx = pick(["un pavé droit", "une boîte à chaussures en forme de pavé droit", "une brique de lait en forme de pavé droit", "un carton de déménagement en forme de pavé droit", "une caisse de mangues en forme de pavé droit"]);
      return { enonce: `Calcule le volume d'${ctx} de longueur $${L}$ cm, de largeur $${l}$ cm et de hauteur $${nb(h)}$ cm.`, figure: paveCote(L, l, h), mode: "nombre", prefixe: "Volume :", suffixe: "cm³", attendu: v,
        erreurs: [{ valeur: arr(L + l + h, 4), message: "On multiplie les trois dimensions." }, { valeur: L * l, message: "Ça, c'est l'aire de la base : il faut encore multiplier par la hauteur." }],
        aides: ["Volume d'un pavé droit $=$ longueur $\\times$ largeur $\\times$ hauteur.", `Aire de la base : $${L} \\times ${l} = ${L * l}$ cm².`, `Multiplie par la hauteur $${nb(h)}$.`], solution: `$V = ${L} \\times ${l} \\times ${nb(h)} = ${nb(v)}$ cm³.` }; }
    if (t === 2) { const a = rand(2, 10), b = rand(2, 10), h = rand(3, 20), v = (a * b * h) / 2;
      return { enonce: `Un prisme droit a pour base un triangle rectangle dont les côtés de l'angle droit mesurent $${a}$ cm et $${b}$ cm. Sa hauteur mesure $${h}$ cm. Quel est son volume ?`, figure: prismeTriCote(a, b, h), mode: "nombre", prefixe: "Volume :", suffixe: "cm³", attendu: v,
        erreurs: [{ valeur: a * b * h, message: "L'aire de la base triangulaire est $\\dfrac{" + a + " \\times " + b + "}{2}$." }, { valeur: (a * b) / 2, message: "Ça, c'est l'aire de la base : multiplie-la par la hauteur du prisme." }],
        aides: ["Volume d'un prisme droit $=$ aire de la base $\\times$ hauteur.", `Aire de la base : $\\dfrac{${a} \\times ${b}}{2} = ${nb((a * b) / 2)}$ cm².`, `Multiplie par $${h}$.`], solution: `$V = \\dfrac{${a} \\times ${b}}{2} \\times ${h} = ${nb((a * b) / 2)} \\times ${h} = ${nb(v)}$ cm³.` }; }
    if (t === 3) { const B = rand(5, 60), h = rand(2, 15);
      return { enonce: `Un prisme droit a une base d'aire $${B}$ cm² et une hauteur de $${h}$ cm. Quel est son volume ?`, mode: "nombre", prefixe: "Volume :", suffixe: "cm³", attendu: B * h,
        erreurs: [{ valeur: B + h, message: "On multiplie l'aire de la base par la hauteur, on n'additionne pas." }, ...(B * h % 2 === 0 ? [{ valeur: (B * h) / 2, message: "Pas de division par $2$ : le volume d'un prisme est aire de la base $\\times$ hauteur." }] : [])],
        aides: ["Volume d'un prisme droit $=$ aire de la base $\\times$ hauteur.", "Ici l'aire de la base est donnée.", `$${B} \\times ${h}$.`], solution: `$V = ${B} \\times ${h} = ${B * h}$ cm³.` }; }
    const r = rand(2, 10), h = rand(3, 20), v = arr(Math.PI * r * r * h, 1);
    return { enonce: `Calcule le volume d'${pick(["un cylindre", "une boîte de conserve cylindrique", "un verre cylindrique", "un pot de fleurs cylindrique", "une bougie cylindrique"])} de rayon $${r}$ cm et de hauteur $${h}$ cm. Donne la valeur arrondie au dixième de cm³.`, figure: cylindreCote(r, h), mode: "nombre", prefixe: "Volume :", suffixe: "cm³", attendu: v,
      erreurs: [{ valeur: arr(2 * Math.PI * r * h, 1), message: "Ça, c'est l'aire latérale. Le volume est l'aire du disque de base multipliée par la hauteur." }, ...(arr(3.14 * r * r * h, 1) !== v ? [{ valeur: arr(3.14 * r * r * h, 1), message: "Utilise la touche $\\pi$ de la calculatrice." }] : [])],
      aides: ["Volume d'un cylindre $=$ aire du disque de base $\\times$ hauteur $= \\pi r^2 \\times h$.", `Aire de la base : $\\pi \\times ${r}^2 = ${r * r}\\pi$ cm².`, `$${r * r}\\pi \\times ${h} = ${r * r * h}\\pi$.`], solution: `$V = \\pi \\times ${r}^2 \\times ${h} = ${r * r * h}\\pi \\approx ${nb(v)}$ cm³.` };
  };

  GEN["sv5-conversions"] = function () {
    if (Math.random() < 0.5) {
      const i = rand(0, 3), j = rand(0, 3); if (i === j) return GEN["sv5-conversions"]();
      const v = pick([rand(1, 99), rand(11, 999) / 10, rand(1, 999) / 100]), r = arr(v * 1000 ** (UNV[i][1] - UNV[j][1]), 9);
      if (r < 0.0001 || r > 1e8) return GEN["sv5-conversions"]();
      return { enonce: `Convertis : $${nb(v)}$ ${UNV[i][0]} $= \\ldots$ ${UNV[j][0]}`, mode: "nombre", prefixe: "Résultat :", suffixe: UNV[j][0], attendu: r,
        figure: Math.random() < 0.3 ? FIGURES["sv5-cours-dm3"]() : undefined,
        erreurs: [{ valeur: arr(v * 100 ** (UNV[i][1] - UNV[j][1]), 9), message: "Pour les volumes, le facteur entre deux unités voisines est $1\\,000$, pas $100$." }, { valeur: arr(v * 1000 ** (UNV[j][1] - UNV[i][1]), 9), message: `Mauvais sens : ${UNV[j][0]} est une unité plus ${UNV[i][1] > UNV[j][1] ? "petite" : "grande"}, il en faut donc ${UNV[i][1] > UNV[j][1] ? "plus" : "moins"}.` }],
        aides: ["$1$ dm³ $= 1\\,000$ cm³ : un cube de $1$ dm d'arête contient $10 \\times 10 \\times 10$ cubes de $1$ cm.", `De ${UNV[i][0]} à ${UNV[j][0]}, on ${UNV[i][1] > UNV[j][1] ? "multiplie" : "divise"} par $${nb(1000 ** Math.abs(UNV[i][1] - UNV[j][1]))}$.`, "Chaque unité de volume occupe trois colonnes dans le tableau de conversion."],
        solution: `$${nb(v)}$ ${UNV[i][0]} $= ${nb(r)}$ ${UNV[j][0]}.` };
    }
    const t = rand(0, 2);
    if (t === 0) { const v = pick([rand(1, 50), rand(11, 99) / 10]), q = Math.random() < 0.5;
      return q ? { enonce: `Convertis : $${nb(v)}$ dm³ $= \\ldots$ L`, mode: "nombre", prefixe: "Résultat :", suffixe: "L", attendu: v, aides: ["$1$ dm³ $= 1$ L.", "Un litre est le volume d'un cube de $1$ dm d'arête.", "Le nombre ne change pas."], solution: `$1$ dm³ $= 1$ L, donc $${nb(v)}$ dm³ $= ${nb(v)}$ L.` }
        : { enonce: `Convertis : $${nb(v)}$ m³ $= \\ldots$ L`, mode: "nombre", prefixe: "Résultat :", suffixe: "L", attendu: arr(v * 1000, 6), erreurs: [{ valeur: arr(v * 100, 6), message: "$1$ m³ $= 1\\,000$ dm³ $= 1\\,000$ L." }, { valeur: v, message: "$1$ L $= 1$ dm³, pas $1$ m³ : $1$ m³ $= 1\\,000$ L." }], aides: ["$1$ m³ $= 1\\,000$ dm³.", "$1$ dm³ $= 1$ L.", `$${nb(v)} \\times 1\\,000$.`], solution: `$${nb(v)}$ m³ $= ${nb(arr(v * 1000, 6))}$ dm³ $= ${nb(arr(v * 1000, 6))}$ L.` }; }
    if (t === 1) { const v = rand(50, 2000), q = Math.random() < 0.5;
      return q ? { enonce: `Convertis : $${nb(v)}$ cm³ $= \\ldots$ mL`, mode: "nombre", prefixe: "Résultat :", suffixe: "mL", attendu: v, aides: ["$1$ cm³ $= 1$ mL.", "$1$ L $= 1$ dm³ $= 1\\,000$ cm³ $= 1\\,000$ mL.", "Le nombre ne change pas."], solution: `$1$ cm³ $= 1$ mL : $${nb(v)}$ cm³ $= ${nb(v)}$ mL.` }
        : { enonce: `Convertis : $${nb(v)}$ cm³ $= \\ldots$ L`, mode: "nombre", prefixe: "Résultat :", suffixe: "L", attendu: v / 1000, erreurs: [{ valeur: v / 100, message: "$1$ L $= 1\\,000$ cm³." }, { valeur: v * 1000, message: "Le litre est plus grand que le cm³ : on divise par $1\\,000$." }], aides: ["$1$ L $= 1$ dm³ $= 1\\,000$ cm³.", "On divise par $1\\,000$.", `$${nb(v)} \\div 1\\,000$.`], solution: `$${nb(v)}$ cm³ $= ${nb(v / 1000)}$ L.` }; }
    const i = rand(0, 4), j = rand(0, 4); if (i === j) return GEN["sv5-conversions"]();
    const v = pick([rand(1, 99), rand(11, 999) / 10]), r = arr(v * 10 ** (UNC[i][1] - UNC[j][1]), 8);
    return { enonce: `Convertis : $${nb(v)}$ ${UNC[i][0]} $= \\ldots$ ${UNC[j][0]}`, mode: "nombre", prefixe: "Résultat :", suffixe: UNC[j][0], attendu: r,
      erreurs: [{ valeur: arr(v * 10 ** (UNC[j][1] - UNC[i][1]), 8), message: `Mauvais sens : ${UNC[j][0]} est une unité plus ${UNC[i][1] > UNC[j][1] ? "petite" : "grande"} que ${UNC[i][0]}.` }],
      aides: ["Pour les capacités, on passe d'une unité à la suivante en multipliant ou en divisant par $10$.", "Ordre : hL, (daL), L, dL, cL, mL.", `De ${UNC[i][0]} à ${UNC[j][0]}, on ${UNC[i][1] > UNC[j][1] ? "multiplie" : "divise"} par $${nb(10 ** Math.abs(UNC[i][1] - UNC[j][1]))}$.`], solution: `$${nb(v)}$ ${UNC[i][0]} $= ${nb(r)}$ ${UNC[j][0]}.` };
  };

  GEN["sv5-patrons"] = function () {
    const t = rand(0, 3);
    if (t === 0) { const n = rand(3, 10), P = { 3: "triangle", 4: "quadrilatère", 5: "pentagone", 6: "hexagone", 7: "heptagone", 8: "octogone", 9: "ennéagone", 10: "décagone" }, q = rand(0, 3);
      if (q >= 2) return { enonce: `Combien ${q === 2 ? "d'arêtes" : "de sommets"} a un prisme droit dont les bases sont des ${P[n]}s ?`, mode: "nombre", prefixe: "Nombre :", attendu: q === 2 ? 3 * n : 2 * n,
        erreurs: [{ valeur: n, message: q === 2 ? `Il y a $${n}$ arêtes sur chaque base, et aussi les arêtes latérales.` : `Chaque base a $${n}$ sommets, et il y a deux bases.` }, ...(q === 2 ? [{ valeur: 2 * n, message: `N'oublie pas les $${n}$ arêtes latérales qui relient les deux bases.` }] : [{ valeur: n + 2, message: "Ça, c'est le nombre de faces : on demande les sommets." }])],
        aides: ["Un prisme droit a deux bases superposables reliées par des arêtes latérales.", `Chaque base a $${n}$ côtés et $${n}$ sommets.`, q === 2 ? `Arêtes des bases : $2 \\times ${n}$ ; arêtes latérales : $${n}$.` : `Sommets : $2 \\times ${n}$.`], solution: q === 2 ? `$${n}$ arêtes par base, soit $${2 * n}$, plus $${n}$ arêtes latérales : $${3 * n}$ arêtes.` : `$${n}$ sommets par base et deux bases : $${2 * n}$ sommets.` };
      return { enonce: `Le patron d'un prisme droit dont les bases sont des ${P[n]}s comporte combien de ${q ? "faces en tout" : "rectangles (faces latérales)"} ?`, mode: "nombre", prefixe: "Nombre :", attendu: q ? n + 2 : n,
        aides: ["Un prisme droit a deux bases superposables et des faces latérales rectangulaires.", `Il y a une face latérale par côté de la base : $${n}$.`, q ? "N'oublie pas les deux bases." : "Ne compte pas les bases."], solution: q ? `$${n}$ faces latérales et $2$ bases : $${n + 2}$ faces.` : `Un rectangle par côté de la base : $${n}$ rectangles.` }; }
    if (t === 1) { const r = rand(2, 10), h = rand(3, 15), v = arr(2 * Math.PI * r, 1);
      return { enonce: `Le patron d'un cylindre de rayon $${r}$ cm et de hauteur $${h}$ cm est formé de deux disques et d'un rectangle. Quelle est la longueur du côté du rectangle qui s'enroule autour des disques ? (Arrondie au dixième de cm.)`, figure: patronCyl(r, h), mode: "nombre", prefixe: "Longueur :", suffixe: "cm", attendu: v,
        erreurs: [{ valeur: arr(Math.PI * r * r, 1), message: "Ça, c'est l'aire d'un disque. On cherche le périmètre du cercle." }, { valeur: h, message: "Ça, c'est l'autre côté du rectangle (la hauteur)." }],
        aides: ["Le rectangle s'enroule exactement autour du disque de base.", "Sa longueur est donc le périmètre du cercle : $2 \\times \\pi \\times r$.", `$2 \\times \\pi \\times ${r}$.`], solution: `$2 \\times \\pi \\times ${r} = ${2 * r}\\pi \\approx ${nb(v)}$ cm.` }; }
    if (t === 2) { const L = rand(4, 12), l = rand(2, L - 1), h = rand(2, 9), q = rand(0, 1), A = 2 * (L * l + L * h + l * h);
      return q ? { enonce: `Combien de faces rectangulaires comporte le patron d'un pavé droit de dimensions $${L}$ cm, $${l}$ cm et $${h}$ cm ?`, mode: "nombre", prefixe: "Faces :", attendu: 6, aides: ["Un pavé droit a $6$ faces.", "Elles sont toutes rectangulaires.", "Elles sont identiques deux à deux."], solution: "Le patron d'un pavé droit comporte $6$ rectangles, identiques deux à deux." }
        : { enonce: `Quelle est l'aire totale du patron d'un pavé droit de dimensions $${L}$ cm, $${l}$ cm et $${h}$ cm ?`, figure: paveCote(L, l, h), mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: A, erreurs: [{ valeur: L * l * h, message: "Ça, c'est le volume. On demande l'aire des $6$ faces." }, { valeur: A / 2, message: "Les faces sont identiques deux à deux : il y en a $6$, pas $3$." }],
          aides: ["Le patron est formé de $6$ rectangles identiques deux à deux.", `Aires : $${L} \\times ${l}$, $${L} \\times ${h}$ et $${l} \\times ${h}$, chacune deux fois.`, "Additionne les six aires."], solution: `$2 \\times (${L * l} + ${L * h} + ${l * h}) = ${A}$ cm².` }; }
    if (Math.random() < 0.55) {
      const [nom, bon, faux] = pick([["un cylindre", "deux disques et un rectangle", ["un disque et un triangle", "deux rectangles et un disque", "trois disques"]], ["un prisme droit à base triangulaire", "deux triangles et trois rectangles", ["trois triangles et deux rectangles", "un triangle et trois rectangles", "deux triangles et quatre rectangles"]], ["un cube", "six carrés", ["quatre carrés", "six triangles", "huit carrés"]], ["un pavé droit", "six rectangles", ["quatre rectangles", "six triangles", "huit rectangles"]]]);
      const q = rand(0, 2), { choix, attendu } = q === 0 ? melange(bon, faux) : q === 1 ? melange(`${nom}`, shuffle(["un cube", "un pavé droit", "un cylindre", "un cône", "une pyramide à base carrée", "un prisme droit à base triangulaire"].filter((x) => x !== nom)).slice(0, 3)) : melange(nom === "un cylindre" ? "non : il a une face courbe" : "oui : toutes ses faces sont planes", [nom === "un cylindre" ? "oui : toutes ses faces sont planes" : "non : il a une face courbe", "on ne peut pas savoir", "seulement s'il est posé sur sa base"]);
      return { enonce: q === 0 ? "Le patron du solide dessiné est formé de :" : q === 1 ? "Quel est le nom du solide dessiné en perspective cavalière ?" : "Le solide dessiné est-il un polyèdre (un solide dont toutes les faces sont des polygones) ?", figure: dessinSolide(nom), mode: "choix", choix, attendu,
        aides: ["Observe la forme des faces : planes ou courbes ? polygones ou disques ?", "Les arêtes en pointillés sont cachées.", "Imagine le solide déplié à plat."], solution: `Le solide dessiné est ${nom}. Réponse : ${q === 0 ? bon : choix[attendu]}.` };
    }
    const Q = pick([
      ["Le patron d'un cylindre est formé de :", "deux disques et un rectangle", ["un disque et un triangle", "deux rectangles et un disque", "trois disques"]],
      ["Le patron d'un prisme droit à base triangulaire est formé de :", "deux triangles et trois rectangles", ["trois triangles et deux rectangles", "un triangle et trois rectangles", "deux triangles et quatre rectangles"]],
      ["Le patron d'un cube est formé de :", "six carrés", ["quatre carrés", "six rectangles quelconques", "huit carrés"]],
      ["En perspective cavalière, les arêtes cachées sont dessinées :", "en pointillés", ["en gras", "en couleur", "elles ne sont pas dessinées"]],
      ["En perspective cavalière, les faces avant et arrière d'un pavé sont dessinées :", "en vraie grandeur", ["plus petites que dans la réalité", "en pointillés", "en losanges"]],
      ["En perspective cavalière, des arêtes parallèles dans la réalité sont dessinées :", "parallèles", ["perpendiculaires", "de même longueur toujours", "en pointillés"]],
      ["En perspective cavalière, les arêtes qui partent vers l'arrière sont dessinées :", "en biais et plus courtes", ["verticales", "plus longues", "en vraie grandeur"]],
      ["Le patron d'un prisme droit à base pentagonale comporte :", "deux pentagones et cinq rectangles", ["un pentagone et cinq rectangles", "deux pentagones et deux rectangles", "cinq pentagones et deux rectangles"]],
      ["Dans le patron d'un cylindre, la longueur du rectangle est égale :", "au périmètre du disque de base", ["à l'aire du disque de base", "au rayon du disque", "à la hauteur du cylindre"]]
    ]);
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu, aides: ["Imagine le solide déplié, ou dessiné sur une feuille.", "Compte les bases et les faces latérales.", "En perspective cavalière, la face de devant est en vraie grandeur et le parallélisme est conservé."], solution: `Réponse : ${Q[1]}.` };
  };

  GEN["sv5-problemes"] = function () {
    const t = rand(0, 4);
    if (t === 3) { const r = pick([0.5, 0.6, 0.75, 0.8, 1, 1.2]), h = pick([1, 1.2, 1.5, 1.8, 2]), V = Math.PI * r * r * h, v = arr(V * 1000, 0);
      return { enonce: `Pendant les coupures d'eau, une famille de ${pick(LIEUX5)} stocke l'eau de pluie dans une citerne cylindrique de rayon $${nb(r)}$ m et de hauteur $${nb(h)}$ m. Combien de litres d'eau la citerne peut-elle contenir ? Donne la valeur arrondie au litre.`, figure: cylindreCote(r, h, "m"), mode: "nombre", prefixe: "Contenance :", suffixe: "L", attendu: v,
        erreurs: [{ valeur: arr(V, 3), message: "Ça, c'est le volume en m³. Convertis en litres : $1$ m³ $= 1\\,000$ L." }, { valeur: arr(2 * Math.PI * r * h * 1000, 0), message: "Tu as utilisé $2\\pi r$ (le périmètre) au lieu de $\\pi r^2$ (l'aire du disque de base)." }],
        aides: ["Volume d'un cylindre $= \\pi \\times r \\times r \\times h$.", `$\\pi \\times ${nb(r)}^2 \\times ${nb(h)} \\approx ${nb(arr(V, 4))}$ m³.`, "$1$ m³ $= 1\\,000$ L."], solution: `$V = \\pi \\times ${nb(r)}^2 \\times ${nb(h)} \\approx ${nb(arr(V, 4))}$ m³, soit environ $${nb(v)}$ L.` }; }
    if (t === 4) { const L = rand(3, 8) * 10, l = rand(2, 5) * 10, h = rand(2, 5) * 10, c = pick([1, 1.5, 2, 2.5]), V = (L * l * h) / 1000, n = Math.floor(V / c);
      return { enonce: `Un bac à compost du jardin du collège a la forme d'un pavé droit de $${L}$ cm sur $${l}$ cm, et de $${h}$ cm de haut. Combien de seaux de $${nb(c)}$ L faut-il vider pour le remplir entièrement ?`, figure: paveCote(L, l, h), mode: "nombre", prefixe: "Seaux :", attendu: Math.ceil(V / c),
        erreurs: [...(n !== Math.ceil(V / c) ? [{ valeur: n, message: "Avec ce nombre de seaux, le bac n'est pas tout à fait plein : il en faut un de plus." }] : []), { valeur: L * l * h, message: "Ça, c'est le volume en cm³ : convertis-le en litres puis divise par la contenance d'un seau." }],
        aides: [`Volume : $${L} \\times ${l} \\times ${h} = ${nb(L * l * h)}$ cm³.`, `$= ${nb(V)}$ L.`, `$${nb(V)} \\div ${nb(c)} \\approx ${nb(arr(V / c, 2))}$ : arrondis au nombre entier de seaux suffisant.`], solution: `$V = ${nb(L * l * h)}$ cm³ $= ${nb(V)}$ L et $${nb(V)} \\div ${nb(c)} ${Number.isInteger(V / c) ? "=" : "\\approx"} ${nb(arr(V / c, 2))}$ : il faut $${Math.ceil(V / c)}$ seaux.` }; }
    if (t === 0) { const L = rand(4, 10) * 10, l = rand(2, 5) * 10, h = rand(3, 6) * 10, v = (L * l * h) / 1000;
      return { enonce: `Un aquarium en forme de pavé droit mesure $${L}$ cm de long, $${l}$ cm de large et $${h}$ cm de haut. Combien de litres d'eau contient-il quand il est plein ?`, figure: paveCote(L, l, h), mode: "nombre", prefixe: "Contenance :", suffixe: "L", attendu: v,
        erreurs: [{ valeur: L * l * h, message: "Ça, c'est le volume en cm³. Convertis en litres ($1$ L $= 1\\,000$ cm³)." }, { valeur: (L * l * h) / 100, message: "$1$ L $= 1\\,000$ cm³ : on divise par $1\\,000$, pas par $100$." }],
        aides: [`Volume : $${L} \\times ${l} \\times ${h}$ cm³.`, `$= ${nb(L * l * h)}$ cm³.`, "$1$ L $= 1\\,000$ cm³ : divise par $1\\,000$."], solution: `$V = ${L} \\times ${l} \\times ${h} = ${nb(L * l * h)}$ cm³ $= ${nb(v)}$ L.` }; }
    if (t === 1) { const L = rand(5, 12), l = rand(3, 6), p = rand(10, 20) / 10, v = arr(L * l * p, 3);
      return { enonce: `Une piscine en forme de pavé droit mesure $${L}$ m sur $${l}$ m et a une profondeur de $${nb(p)}$ m. Combien de m³ d'eau faut-il pour la remplir ?`, figure: paveCote(L, l, p, "m"), mode: "nombre", prefixe: "Volume :", suffixe: "m³", attendu: v,
        erreurs: [{ valeur: arr(L + l + p, 3), message: "On multiplie les trois dimensions." }, { valeur: L * l, message: "Ça, c'est l'aire du fond : multiplie par la profondeur." }],
        aides: ["Volume d'un pavé : longueur $\\times$ largeur $\\times$ hauteur.", "Toutes les longueurs sont en mètres : le volume est en m³.", `$${L} \\times ${l} \\times ${nb(p)}$.`], solution: `$V = ${L} \\times ${l} \\times ${nb(p)} = ${nb(v)}$ m³ (soit $${nb(v * 1000)}$ L).` }; }
    const r = rand(3, 5), h = rand(8, 15), V = Math.PI * r * r * h, n = Math.floor(V / 200);
    return { enonce: `Une bouteille cylindrique a un rayon intérieur de $${r}$ cm et une hauteur de $${h}$ cm. Combien de verres de $20$ cL peut-on remplir entièrement avec son contenu ?`, figure: cylindreCote(r, h), mode: "nombre", prefixe: "Verres :", attendu: n,
      erreurs: [...(Math.round(V / 200) !== n ? [{ valeur: n + 1, message: "Le dernier verre ne serait pas plein : on ne compte que les verres remplis entièrement." }] : []), { valeur: Math.floor(V / 20), message: "$20$ cL $= 200$ mL $= 200$ cm³, pas $20$ cm³." }],
      aides: [`Volume : $\\pi \\times ${r}^2 \\times ${h} \\approx ${nb(arr(V, 1))}$ cm³.`, "$20$ cL $= 200$ mL $= 200$ cm³.", `$${nb(arr(V, 1))} \\div 200 \\approx ${nb(arr(V / 200, 2))}$ : seuls les verres pleins comptent.`], solution: `$V \\approx ${nb(arr(V, 1))}$ cm³ et $${nb(arr(V, 1))} \\div 200 \\approx ${nb(arr(V / 200, 2))}$ : on remplit $${n}$ verres entièrement.` };
  };

  /* =====================================================================
     Chapitre 18 : programmation par blocs (pr5-)
     ===================================================================== */
  const { blocs } = window.PM_EXO.college;
  const DRAPEAU = { c: "evt", t: "quand le drapeau est cliqué" };
  const POLYG = { 3: "un triangle équilatéral", 4: "un carré", 5: "un pentagone régulier", 6: "un hexagone régulier", 8: "un octogone régulier", 9: "un ennéagone régulier", 10: "un décagone régulier", 12: "un dodécagone régulier" };
  // Expressions « Scratch » : [écriture dans le bloc, calcul en KaTeX avec n, fonction]
  // 5e élément : le résultat quand on oublie la deuxième opération
  const EXPR = [
    (a, b) => [`réponse * ${a} + ${b}`, `${"n"} \\times ${a} + ${b}`, (n) => n * a + b, (n) => n * (a + b), (n) => n * a],
    (a, b) => [`(réponse + ${b}) * ${a}`, `(n + ${b}) \\times ${a}`, (n) => (n + b) * a, (n) => n + b * a, (n) => n + b],
    (a, b) => [`réponse * réponse + ${b}`, `n \\times n + ${b}`, (n) => n * n + b, (n) => 2 * n + b, (n) => n * n],
    (a, b) => [`${a} * réponse - ${b}`, `${a} \\times n - ${b}`, (n) => a * n - b, (n) => a * (n - b), (n) => a * n],
    (a, b) => [`(réponse - ${b}) * (réponse + ${b})`, `(n - ${b}) \\times (n + ${b})`, (n) => (n - b) * (n + b), (n) => n - b * n + b, (n) => n - b]
  ];
  // Tracé d'un polygone régulier par le lutin (point de départ et flèche du premier déplacement)
  function traceLutin(n, aria) {
    const R = 62, cx = 160, cy = 76, a0 = Math.PI / 2 + Math.PI / n, P = Array.from({ length: n }, (_, k) => [cx + R * Math.cos(a0 + (2 * Math.PI * k) / n), cy + R * Math.sin(a0 + (2 * Math.PI * k) / n)]);
    const [p, q] = [P[0], P[n - 1]], m = [(p[0] + 0.55 * (q[0] - p[0])), (p[1] + 0.55 * (q[1] - p[1]))];
    return `<svg class="graph" viewBox="0 0 320 168" role="img" aria-label="${aria}"><polygon class="g-poly" points="${P2(P)}"/><circle class="g-point" cx="${+p[0].toFixed(1)}" cy="${+p[1].toFixed(1)}" r="4"/><path class="g-segment" style="stroke-width:2.5" d="M${+p[0].toFixed(1)} ${+p[1].toFixed(1)} L${+m[0].toFixed(1)} ${+m[1].toFixed(1)}"/><text class="g-label" x="${+(p[0] - 8).toFixed(1)}" y="${+(p[1] + 16).toFixed(1)}" text-anchor="middle">départ</text></svg>`;
  }
  const progPoly = (n, L) => blocs([DRAPEAU, { c: "stylo", t: "stylo en position d'écriture" }, { rep: n, corps: [{ c: "mvt", t: `avancer de [${L}] pas` }, { c: "mvt", t: `tourner ↻ de [${nbTexte(360 / n)}] degrés` }] }]);
  FIGURES["pr5-cours-entree"] = () => blocs([DRAPEAU, { c: "ent", t: "demander [Choisis un nombre] et attendre" }, { c: "dire", t: "dire [(réponse + 2) * 5]" }]);
  FIGURES["pr5-cours-formule"] = () => blocs([DRAPEAU, { c: "ent", t: "demander [Base ?] et attendre" }, { c: "var", t: "mettre [b] à [réponse]" }, { c: "ent", t: "demander [Hauteur ?] et attendre" }, { c: "var", t: "mettre [h] à [réponse]" }, { c: "dire", t: "dire [b * h / 2]" }]);
  FIGURES["pr5-cours-boucle"] = () => progPoly(5, 60);
  FIGURES["pr5-cours-trace"] = () => traceLutin(5, "Pentagone régulier tracé par le lutin à partir du point de départ");
  FIGURES["pr5-qcm-carre"] = () => progPoly(4, 50);
  FIGURES["pr5-qcm-hexa"] = () => progPoly(6, 40);
  FIGURES["pr5-qcm-calcul"] = () => blocs([DRAPEAU, { c: "ent", t: "demander [Nombre ?] et attendre" }, { c: "dire", t: "dire [réponse * 3 + 4]" }]);
  FIGURES["pr5-qcm-boucle"] = () => blocs([DRAPEAU, { c: "var", t: "mettre [N] à [1]" }, { rep: 4, corps: [{ c: "var", t: "ajouter [3] à [N]" }] }, { c: "dire", t: "dire [N]" }]);

  GEN["pr5-executer"] = function () {
    const a = rand(2, 9), b = rand(1, 12), k = rand(0, 4), [blk, tex, f, faux, oubli] = EXPR[k](a, b), n = rand(k === 4 ? b + 1 : 1, 15);
    const prog = blocs([DRAPEAU, { c: "ent", t: "demander [Choisis un nombre] et attendre" }, { c: "dire", t: `dire [${blk}]` }]);
    const r = f(n), fx = faux(n);
    return { enonce: `On lance ce programme et on répond $${n}$. Quel nombre le lutin dit-il ? (Dans Scratch, $*$ est le signe de la multiplication.)`, figure: prog, mode: "nombre", prefixe: "Le lutin dit :", attendu: r,
      erreurs: [...(fx !== r ? [{ valeur: fx, message: "Respecte les priorités opératoires et les parenthèses, comme en mathématiques." }] : []), { valeur: oubli(n), message: "Tu t'es arrêté après la première opération : calcule toute l'expression." }],
      aides: ["La variable « réponse » contient le nombre saisi (l'entrée).", `Remplace « réponse » par $${n}$ : on calcule $${tex.split("n").join(String(n))}$.`, "Multiplications d'abord, sauf s'il y a des parenthèses."],
      solution: `Avec $n = ${n}$ : $${tex.split("n").join(String(n))} = ${r}$. Le lutin dit $${r}$.` };
  };

  GEN["pr5-expression"] = function () {
    const t = rand(0, 9), a = rand(2, 9), b = rand(2, 12), R = "réponse";
    if (t >= 5) {
      // programme de calcul en phrases : le bloc « dire » manque
      const P = [
        [`multiplier le nombre par $${a}$, puis ajouter $${b}$`, `${R} * ${a} + ${b}`, [`(${R} + ${b}) * ${a}`, `${R} + ${a} * ${b}`, `${R} * ${a + b}`]],
        [`ajouter $${b}$ au nombre, puis multiplier par $${a}$`, `(${R} + ${b}) * ${a}`, [`${R} + ${b} * ${a}`, `${R} * ${a} + ${b}`, `${R} + ${b + a}`]],
        [`soustraire $${b}$ au nombre, puis diviser par $${a}$`, `(${R} - ${b}) / ${a}`, [`${R} - ${b} / ${a}`, `${R} / ${a} - ${b}`, `${a} / (${R} - ${b})`]],
        [`multiplier le nombre par lui-même, puis ajouter $${b}$`, `${R} * ${R} + ${b}`, [`${R} * 2 + ${b}`, `(${R} + ${b}) * ${R}`, `${R} + ${R} + ${b}`]],
        [`diviser le nombre par $${a}$, puis ajouter $${b}$`, `${R} / ${a} + ${b}`, [`${R} / (${a} + ${b})`, `(${R} + ${b}) / ${a}`, `${a} / ${R} + ${b}`]]
      ][t - 5];
      const { choix, attendu } = melange(`« ${P[1]} »`, P[2].map((z) => `« ${z} »`));
      return { enonce: `On veut que le programme dessiné calcule : ${P[0]}. Que faut-il écrire dans le bloc « dire » à la place du « ? » ? ($*$ : multiplier ; $/$ : diviser.)`, figure: blocs([DRAPEAU, { c: "ent", t: "demander [Choisis un nombre] et attendre" }, { vide: true }]), mode: "choix", choix, attendu,
        aides: ["La variable « réponse » contient le nombre choisi.", "L'ordinateur fait les multiplications et les divisions avant les additions et les soustractions.", "Si la première étape est une addition ou une soustraction, il faut des parenthèses."], solution: `On écrit « dire [${P[1]}] ». ${P[1].includes("(") ? "Les parenthèses font faire la première étape en premier." : "Les priorités suffisent : pas besoin de parenthèses."}` };
    }
    const c = rand(2, 9), Q = t <= 1 ? pick([
      [`le périmètre $P = 2 \\times (L + \\ell)$ d'un rectangle de longueur $L$ et de largeur $\\ell$`, "(L + l) * 2", ["L + l * 2", "L * l * 2", "L + l + 2"]],
      [`l'aire $\\mathcal{A} = L \\times \\ell$ d'un rectangle de longueur $L$ et de largeur $\\ell$`, "L * l", ["L + l", "(L + l) * 2", "L * l / 2"]],
      [`l'aire $\\mathcal{A} = c \\times c$ d'un carré de côté $c$`, "c * c", ["c + c", "c * 2", "4 * c"]],
      [`le périmètre $P = 4 \\times c$ d'un carré de côté $c$`, "c * 4", ["c + 4", "c * c", "c * c * c * c"]],
      [`l'aire $\\mathcal{A} = \\dfrac{b \\times h}{2}$ d'un triangle de base $b$ et de hauteur $h$`, "b * h / 2", ["b * h * 2", "b + h / 2", "(b + h) / 2"]],
      [`l'aire $\\mathcal{A} = b \\times h$ d'un parallélogramme de base $b$ et de hauteur $h$`, "b * h", ["b * h / 2", "b + h", "(b + h) * 2"]],
      [`la moyenne $M$ de deux notes $a$ et $b$`, "(a + b) / 2", ["a + b / 2", "a / 2 + b", "(a * b) / 2"]],
      [`la moyenne $M$ de trois notes $a$, $b$ et $c$`, "(a + b + c) / 3", ["a + b + c / 3", "(a + b + c) * 3", "(a * b * c) / 3"]],
      [`la durée en minutes de $h$ heures et $m$ minutes`, "h * 60 + m", ["(h + m) * 60", "h + m * 60", "h * 100 + m"]],
      [`le volume $V = L \\times \\ell \\times h$ d'un pavé droit`, "L * l * h", ["L + l + h", "L * l + h", "(L + l) * h"]],
      [`le périmètre d'un triangle de côtés $a$, $b$ et $c$`, "a + b + c", ["a * b * c", "(a + b) * c", "a + b * c"]],
      [`la durée en secondes de $m$ minutes et $s$ secondes`, "m * 60 + s", ["(m + s) * 60", "m + s * 60", "m * 100 + s"]]
    ]) : [
      [`le prix $P = ${a} \\times n + ${b}$ ($${b}$ € de frais et $${a}$ € par article)`, `n * ${a} + ${b}`, [`(n + ${b}) * ${a}`, `n + ${a} * ${b}`, `${a} + ${b} * n`]],
      [`le résultat $R = (x + ${b}) \\times ${a}$ du programme « ajouter $${b}$ puis multiplier par $${a}$ »`, `(x + ${b}) * ${a}`, [`x + ${b} * ${a}`, `x * ${a} + ${b}`, `(x * ${a}) + ${b}`]],
      [`le prix de $n$ cahiers à $${c}$ € avec une réduction de $${b}$ € sur le total`, `n * ${c} - ${b}`, [`(n - ${b}) * ${c}`, `n - ${b} * ${c}`, `n * (${c} - ${b})`]]
    ][t - 2];
    const { choix, attendu } = melange(`« ${Q[1]} »`, Q[2].map((z) => `« ${z} »`));
    return { enonce: `Dans un programme Scratch, quelle expression permet de calculer ${Q[0]} ? ($*$ : multiplier ; $/$ : diviser.)`, mode: "choix", choix, attendu,
      aides: ["L'ordinateur respecte les priorités opératoires, comme en mathématiques.", "Quand une addition doit être faite avant une multiplication ou une division, il faut des parenthèses.", "Teste chaque expression avec des valeurs simples."], solution: `C'est « ${Q[1]} ». Les parenthèses imposent de faire l'addition en premier quand c'est nécessaire.` };
  };

  GEN["pr5-boucle"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      const x = rand(1, 20), n = rand(2, 6), op = pick([["ajouter", (v, k) => v + k, rand(2, 9)], ["multiplier par", (v, k) => v * k, 2]]);
      let v = x; const vals = []; for (let i = 0; i < n; i++) { v = op[1](v, op[2]); vals.push(v); }
      const prog = blocs([DRAPEAU, { c: "ent", t: "demander [Nombre ?] et attendre" }, { c: "var", t: "mettre [N] à [réponse]" }, { rep: n, corps: [{ c: "var", t: op[0] === "ajouter" ? `ajouter [${op[2]}] à [N]` : "mettre [N] à [N * 2]" }] }, { c: "dire", t: "dire [N]" }]);
      return { enonce: `On lance ce programme et on répond $${x}$. Que dit le lutin à la fin ?`, figure: prog, mode: "nombre", prefixe: "Le lutin dit :", attendu: v,
        erreurs: [{ valeur: op[1](x, op[2]), message: `La boucle est répétée $${n}$ fois, pas une seule.` }, { valeur: vals[n - 2] ?? x, message: `Compte bien les passages : il y en a $${n}$.` }],
        aides: ["La variable $N$ prend d'abord la valeur saisie.", `Chaque passage dans la boucle ${op[0] === "ajouter" ? `ajoute $${op[2]}$ à $N$` : "double $N$"}.`, `Note la valeur de $N$ après chaque passage : $${vals[0]}$, …`], solution: `$N$ vaut successivement $${[x, ...vals].join("$ ; $")}$. Le lutin dit $${v}$.` };
    }
    if (t === 1) {
      const n = pick([3, 4, 5, 6, 8, 9, 10, 12]), L = rand(3, 10) * 10;
      return { enonce: `On veut que le lutin trace ${POLYG[n]} de côté $${L}$ pas avec : stylo en position d'écriture ; répéter $${n}$ fois (avancer de $${L}$ pas ; tourner de $\\ldots$ degrés). Quel angle faut-il mettre ?`, mode: "nombre", prefixe: "Angle :", suffixe: "°", attendu: 360 / n,
        figure: traceLutin(n, `Le lutin trace ${POLYG[n]} à partir du point de départ`),
        erreurs: [{ valeur: 180 - 360 / n, message: "Le lutin tourne de l'angle **extérieur** : après les $" + n + "$ virages, il a fait un tour complet ($360^\\circ$)." }, { valeur: 180 / n, message: "Après tous les virages, le lutin a fait un tour complet : $360^\\circ$, pas $180^\\circ$." }],
        aides: ["Après avoir tracé tous les côtés, le lutin a fait un tour complet sur lui-même.", `Il tourne $${n}$ fois du même angle.`, `$360 \\div ${n}$.`], solution: `$360^\\circ \\div ${n} = ${nb(360 / n)}^\\circ$.` };
    }
    const n = pick([3, 4, 5, 6, 8]), L = rand(3, 10) * 10, A = 360 / n;
    const prog = blocs([DRAPEAU, { c: "stylo", t: "stylo en position d'écriture" }, { rep: n, corps: [{ c: "mvt", t: `avancer de [${L}] pas` }, { c: "mvt", t: `tourner ↻ de [${nb(A).replace("{,}", ",")}] degrés` }] }]);
    const q = rand(0, 1);
    return q ? { enonce: "Quel est le périmètre de la figure tracée par ce programme, en pas ?", figure: prog, mode: "nombre", prefixe: "Périmètre :", suffixe: "pas", attendu: n * L, erreurs: [{ valeur: L, message: "C'est un seul côté." }, { valeur: (n - 1) * L, message: `La boucle trace $${n}$ côtés, pas $${n - 1}$.` }],
      aides: ["Chaque passage dans la boucle trace un côté.", `Il y a $${n}$ passages.`, `$${n} \\times ${L}$.`], solution: `$${n} \\times ${L} = ${n * L}$ pas.` }
      : { enonce: "Combien de côtés a la figure tracée par ce programme ?", figure: prog, mode: "nombre", prefixe: "Côtés :", attendu: n, erreurs: [{ valeur: A, message: "Ça, c'est l'angle dont tourne le lutin." }, { valeur: L, message: "Ça, c'est la longueur d'un côté, en pas." }],
        aides: ["Chaque passage dans la boucle trace un côté.", "Compte le nombre de répétitions.", "Vérifie : nombre de côtés $\\times$ angle $= 360^\\circ$."], solution: `La boucle est répétée $${n}$ fois : $${n}$ côtés (c'est ${POLYG[n]}).` };
  };

  GEN["pr5-parametres"] = function () {
    const t = rand(0, 5), L = rand(3, 10) * 10, n = pick([3, 4, 5, 6, 8, 10]), L2 = L + rand(1, 5) * 10, m = pick([3, 4, 5, 6, 8, 10].filter((x) => x !== n));
    const Am = nb(360 / m), An = nb(360 / n), dem = pick(["Quel est ton âge ?", "Combien de frères as-tu ?", "Donne un nombre", "Quelle est ta taille ?", "Combien coûte un cahier ?", "Quelle est ta note ?", "Combien de mangues ?", "Quel est le rayon ?", "Combien de pas ?", "Quelle est ta commune ?", "Combien d'élèves ?", "Quelle heure est-il ?"]), dire = pick(["réponse * 2", "réponse + 10", "réponse * réponse", "(réponse + 1) * 3", "réponse / 2", "réponse - 5", "réponse * 4 + 1", "100 - réponse", "réponse * 3", "(réponse + 7) / 2", "réponse * 60", "réponse + réponse"]);
    const Q = [
      [`Ce programme trace ${POLYG[n]} de côté $${L}$ pas. Pour obtenir ${POLYG[n]} de côté $${L2}$ pas, que faut-il modifier ?`, `remplacer $${L}$ par $${L2}$ dans « avancer »`, [`remplacer $${n}$ par $${L2}$ dans « répéter »`, `remplacer $${An}$ par $${L2}$ dans « tourner »`, "ajouter un bloc « avancer » après la boucle"], progPoly(n, L)],
      [`Ce programme trace ${POLYG[n]}. Pour tracer ${POLYG[m]}, que faut-il écrire ?`, `répéter $${m}$ fois (avancer ; tourner de $${Am}$ degrés)`, [`répéter $${m}$ fois (avancer ; tourner de $${An}$ degrés)`, `répéter $${n}$ fois (avancer ; tourner de $${Am}$ degrés)`, `répéter $${m}$ fois (avancer ; tourner de $${nb(m === 4 ? 45 : 180 - 360 / m)}$ degrés)`], progPoly(n, L)],
      [`Dans un programme, l'instruction « demander [${dem}] et attendre » correspond :`, "à une entrée", ["à une sortie", "à une boucle", "à un déplacement"]],
      [`Dans un programme, l'instruction « dire [${dire}] » correspond :`, "à une sortie", ["à une entrée", "à une boucle", "à une variable qu'on modifie"]],
      [`Ce programme fait avancer le lutin de $${L}$ pas pour chaque côté. Quelle figure trace-t-il ?`, POLYG[n], shuffle(Object.keys(POLYG).filter((k) => +k !== n)).slice(0, 3).map((k) => POLYG[k]), progPoly(n, L)],
      [`Ce programme trace ${POLYG[n]}. On veut une figure de même forme mais dont le périmètre est deux fois plus grand. Que faut-il modifier ?`, `remplacer $${L}$ par $${2 * L}$ dans « avancer »`, [`remplacer $${n}$ par $${2 * n}$ dans « répéter »`, `remplacer $${An}$ par $${nb(720 / n)}$ dans « tourner »`, `remplacer $${L}$ par $${L + 2}$ dans « avancer »`], progPoly(n, L)]
    ][t];
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], figure: Q[3], mode: "choix", choix, attendu, aides: ["Repère le rôle de chaque nombre : le nombre de répétitions, la longueur, l'angle.", "Une entrée donne une information au programme ; une sortie affiche un résultat.", "Pour un polygone régulier à $n$ côtés : répéter $n$ fois, tourner de $360 \\div n$ degrés."], solution: `Réponse : ${Q[1]}.` };
  };

  /* Une « erreur connue » ne doit jamais coïncider avec la bonne réponse ; si la réponse est un nombre décimal, les erreurs
     non décimales (comme 2/7) sont retirées : un élève ne les tape jamais et, au QCM, elles s'afficheraient en fractions.
     Les erreurs en double sont retirées aussi. */
  const decCourt = (x) => Math.abs(x * 1000 - Math.round(x * 1000)) < 1e-6 * Math.max(1, Math.abs(x));
  // Élision quand un prénom ou un lieu commençant par une voyelle suit « de » ou « que » (« qu'Awa », « d'Ouangani »)
  const elide = (s) => (typeof s === "string" ? s.replace(/(?<![A-Za-zÀ-ÿ])(de|que) (?=[AEIOUYÉÈÎ][a-zàâçéèêëîïôûù]|[aeiouéèêî][a-zàâçéèêëîïôûù])/g, (m, w) => (w === "de" ? "d'" : "qu'")) : s);
  Object.keys(GEN).filter((k) => /^(rc5|tr5|fr5|pp5|an5|dv5|sc5|nr5|cr5|gf5|cl5|pg5|st5|eq5|ai5|pb5|sv5|pr5)-/.test(k)).forEach((k) => {
    const g = GEN[k];
    GEN[k] = (i) => {
      const q = g(i);
      q.enonce = elide(q.enonce); q.solution = elide(q.solution);
      if (q.aides) q.aides = q.aides.map(elide);
      if (q.choix) q.choix = q.choix.map(elide);
      if (q.erreurs) q.erreurs.forEach((e) => { e.message = elide(e.message); });
      if (q.erreurs) { const vus = []; q.erreurs = q.erreurs.filter((e) => { const v = +e.valeur; if (!isFinite(v) || Math.abs(v - q.attendu) < (q.tolerance || 1e-9) || (decCourt(q.attendu) && !decCourt(v)) || vus.some((w) => Math.abs(w - v) < 1e-9)) return false; vus.push(v); return true; }); }
      return q;
    };
  });
})();
