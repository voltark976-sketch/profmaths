/*
  Exercices du collège, classe de 4e (programme du cycle 4 de 2020, en vigueur en 4e en 2026-2027).
  Ce fichier se charge après assets/exercices-college.js et reprend ses outils (window.PM_EXO.college).
  Mêmes règles : chaque générateur fabrique une question avec des nombres tirés au hasard, la réponse
  attendue, trois indices progressifs et la solution rédigée.
  Préfixes : dp4-, rx4-, py4-, fq4-, pq4-, es4-, pw4-, th4-, lc4-, pb4-, cs4-, tl4-, eq4-, sx4-, in4-.
*/
(function () {
  "use strict";
  const { GEN, FIGURES, shuffle } = window.PM_EXO;
  const { rand, pick, melange, nb: nbC, nbTexte: nbTC, Dc, tD, mulD, addD, fr, frNet, pgcd, CONSIGNE_FR, FRAC_APPROX, diviseurs, geo, blocs, figureTriangle, diagrammeBarres, bandes } = window.PM_EXO.college;
  // nb et nbTexte du tronc commun écrivent mal un négatif compris entre -1 et 0 (« -{,}5 ») : le signe est traité ici
  const nb = (x) => (x < 0 ? "-" + nbC(-x) : nbC(x));
  const nbTexte = (x) => (x < 0 ? "−" + nbTC(-x) : nbTC(x));
  const approx = (v) => (Number.isInteger(v * 1000) ? [] : FRAC_APPROX(v));
  const arr = (x, k) => Math.round(x * 10 ** k) / 10 ** k;
  const rel = (x) => (x < 0 ? `-${nb(-x)}` : nb(x));
  const relP = (x) => (x < 0 ? `(${rel(x)})` : rel(x));

  /* ---------- Outils communs à la 4e : contextes de Mayotte, petits morceaux de SVG ---------- */
  const PRENOMS4 = ["Anli", "Nassim", "Zaïnaba", "Fatima", "Moussa", "Awa", "Ibrahim", "Mariama", "Saïd", "Djamila", "Hamada", "Faïza", "Kamal", "Zalifa", "Ambdi", "Nasra", "Toiyb", "Roukia"];
  const FEM4 = new Set(["Zaïnaba", "Fatima", "Awa", "Mariama", "Djamila", "Faïza", "Zalifa", "Nasra", "Roukia"]);
  const il4 = (n) => (FEM4.has(n) ? "elle" : "il");
  const de4 = (n) => (/^[AEIOUYÉÈÀÂÎ]/.test(n) ? `d'${n}` : `de ${n}`); // « le vélo d'Anli », « le vélo de Moussa »
  const deM4 = (m) => (/^[aeiouéèêâ]/.test(m) ? `d'${m}` : `de ${m}`); // « combien d'arêtes », « combien de faces »
  const queM4 = (m) => (/^[aeiouéèêâ]/.test(m) ? `qu'${m}` : `que ${m}`); // « qu'aucun », « que le produit »
  const LIEUX4 = ["Mamoudzou", "Petite-Terre", "Dzaoudzi", "Pamandzi", "Combani", "Sada", "Chirongui", "Bandrélé", "Kani-Kéli", "M'tsamboro", "Koungou", "Dembéni"];
  const ppcm4 = (a, b) => (a * b) / pgcd(a, b);
  const f1 = (x) => +(+x).toFixed(1);
  // svg4 : W, H, description, contenu, largeur maximale affichée (facultative, pour les petites figures)
  const svg4 = (W, H, aria, corps, mw) => `<svg class="graph" viewBox="0 0 ${Math.round(W)} ${Math.round(H)}"${mw ? ` style="max-width:${Math.round(mw)}px"` : ""} role="img" aria-label="${aria}">${corps}</svg>`;
  const T4 = (x, y, t, cl, ancre) => { const s = `<text${cl === "g-tick" ? "" : ` class="${cl || "g-plabel"}"`} x="${f1(x)}" y="${f1(y)}" text-anchor="${ancre || "middle"}">${t}</text>`; return cl === "g-tick" ? `<g class="g-tick">${s}</g>` : s; };
  const L4 = (x1, y1, x2, y2, cl) => `<line class="${cl || "g-segment"}" x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}"/>`;
  const R4 = (x, y, w, h, cl) => `<rect class="${cl || "g-rect"}" x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}"/>`;
  const C4 = (x, y, r, cl) => `<circle class="${cl || "g-point"}" cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}"/>`;
  const P4 = (pts, cl) => `<polygon class="${cl || "g-poly"}" points="${pts.map(([x, y]) => `${f1(x)},${f1(y)}`).join(" ")}"/>`;
  // flèche (segment + pointe)
  const F4 = (x1, y1, x2, y2, cl) => { const a = Math.atan2(y2 - y1, x2 - x1); return L4(x1, y1, x2, y2, cl || "g-segment") + P4([[x2, y2], [x2 - 9 * Math.cos(a - 0.4), y2 - 9 * Math.sin(a - 0.4)], [x2 - 9 * Math.cos(a + 0.4), y2 - 9 * Math.sin(a + 0.4)]], "g-end"); };

  /* =====================================================================
     Chapitre 1 : divisibilité et nombres premiers (dp4-)
     ===================================================================== */
  const PREMIERS = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
  const estPremier = (n) => { if (n < 2) return false; for (let k = 2; k * k <= n; k++) if (n % k === 0) return false; return true; };
  const plusPetitDiv = (n) => { for (let k = 2; k * k <= n; k++) if (n % k === 0) return k; return n; };
  const decompo = (n) => { const f = []; let m = n, p = 2; while (m > 1) { while (m % p === 0) { f.push(p); m /= p; } p++; } return f; };
  const decompoTex = (n) => { const f = decompo(n), c = {}; f.forEach((p) => { c[p] = (c[p] || 0) + 1; }); return Object.keys(c).map((p) => (c[p] > 1 ? `${p}^{${c[p]}}` : p)).join(" \\times "); };
  const composeTrompeur = () => pick([51, 57, 87, 91, 119, 133, 143, 161, 169, 187, 203, 209, 217, 221, 247, 253, 289, 299, 323, 341, 361, 377, 391, 403, 437, 451, 481, 493, 511, 529, 551, 559, 589, 611, 629, 667, 689, 697, 703, 713, 731, 767, 779, 793, 799, 817, 841, 851, 871, 893, 899, 901, 923, 943, 949, 961, 989]);

  const etapesDecompo = (n) => { const f = decompo(n), out = []; let m = n; for (let i = 0; i < f.length - 1; i++) { out.push(`$${m} = ${f[i]} \\times ${m / f[i]}$`); m /= f[i]; } return out.join(" ; "); };

  /* Figures du chapitre 1 */
  // Arbre de décomposition en escalier ; vus = nombre de divisions dessinées (la suite est remplacée par « … »)
  function arbre4(n, vus) {
    const f = decompo(n), k = f.length - 1, v = Math.min(vus == null ? k : vus, k), dx = Math.min(42, 230 / Math.max(v, 1)), dy = Math.min(40, Math.max(28, 200 / Math.max(v, 1))), x0 = 62, y0 = 20;
    const noeud = (x, y, t, prem) => (prem ? C4(x, y - 4, 11.5, "g-cercle") : "") + T4(x, y, t);
    let s = noeud(x0, y0, n, k === 0), m = n;
    for (let i = 0; i < v; i++) {
      const x = x0 + i * dx, y = y0 + i * dy, q = m / f[i];
      s += L4(x - 3, y + 4, x - 0.75 * dx + 3, y + dy - 16, "g-droite") + L4(x + 3, y + 4, x + dx - 3, y + dy - 16, "g-droite") + noeud(x - 0.75 * dx, y + dy, f[i], true) + noeud(x + dx, y + dy, q, i === k - 1);
      m = q;
    }
    if (v < k) { const x = x0 + v * dx, y = y0 + v * dy; s += L4(x + 2, y + 5, x + 14, y + 20, "g-guide") + T4(x + 20, y + 34, "…"); }
    return svg4(320, y0 + v * dy + (v < k ? 40 : 14), `Arbre de décomposition de ${n} en facteurs premiers${v < k ? ` commencé par ${n} = ${f[0]} × ${n / f[0]}, la suite est à trouver` : " ; les facteurs premiers sont entourés"}`, s);
  }
  // a rangées de b jetons
  function jetons4(a, b) {
    const e = Math.min(22, 290 / b, 170 / a), W = b * e + 12, H = a * e + 12;
    let s = ""; for (let i = 0; i < a; i++) for (let j = 0; j < b; j++) s += C4(6 + e * (j + 0.5), 6 + e * (i + 0.5), e * 0.36);
    return svg4(W, H, `${a * b} jetons rangés en ${a} rangées de ${b} jetons`, s, W * 1.3);
  }
  // Nombres de 1 à max (10 par ligne), ceux de « colores » sur fond coloré
  function crible4(colores, max) {
    max = max || 60; const c = 31, h = 23, n = Math.ceil(max / 10);
    let s = "";
    for (let k = 1; k <= max; k++) { const x = 4 + ((k - 1) % 10) * c, y = 4 + Math.floor((k - 1) / 10) * h; s += (colores.includes(k) ? R4(x, y, c, h, "g-aire") : "") + T4(x + c / 2, y + 16, k, colores.includes(k) ? "g-plabel" : "g-mesure"); }
    s += `<g class="g-grid">${Array.from({ length: 11 }, (_, i) => L4(4 + i * c, 4, 4 + i * c, 4 + n * h, "")).join("")}${Array.from({ length: n + 1 }, (_, j) => L4(4, 4 + j * h, 314, 4 + j * h, "")).join("")}</g>`;
    return svg4(318, 8 + n * h, `Nombres de 1 à ${max} ; les nombres premiers sont sur fond coloré`, s);
  }
  // Deux roues dentées de a et b dents, une dent marquée sur chaque roue au point de contact
  function engrenages4(a, b) {
    const R = (n) => 16 + 1.9 * n, k = Math.min(1, 140 / (R(a) + R(b))), r1 = R(a) * k, r2 = R(b) * k, d = r1 + r2 - 3, cx1 = 160 - (r1 + d + r2) / 2 + r1, cx2 = cx1 + d, cy = Math.max(r1, r2) + 8;
    const roue = (cx, r, n, rot) => P4(Array.from({ length: 4 * n }, (_, j) => { const t = rot + (j * Math.PI) / (2 * n), rr = j % 4 < 2 ? r : r - 6; return [cx + rr * Math.cos(t), cy + rr * Math.sin(t)]; }), "g-poly");
    const s2 = Math.PI / (2 * b), m1 = Math.PI / (4 * a), m2 = Math.PI + 2 * s2;
    const s = roue(cx1, r1, a, 0) + roue(cx2, r2, b, Math.PI - 2.5 * s2) + C4(cx1, cy, 3, "g-point") + C4(cx2, cy, 3, "g-point") + C4(cx1 + (r1 - 3) * Math.cos(m1), cy + (r1 - 3) * Math.sin(m1), 3.5, "g-point") + C4(cx2 + (r2 - 3) * Math.cos(m2 + s2), cy + (r2 - 3) * Math.sin(m2 + s2), 3.5, "g-point")
      + T4(cx1, cy + r1 + 18, `${a} dents`) + T4(cx2, cy + r2 + 18, `${b} dents`);
    return svg4(320, 2 * Math.max(r1, r2) + 36, `Deux roues dentées : l'une a ${a} dents, l'autre ${b} dents ; une dent de chaque roue est marquée`, s);
  }
  // Frise des départs : multiples de a (ligne 1) et de b (ligne 2) jusqu'à L ; rdv = instant commun marqué (ou "?")
  function frise4(a, b, L, noms, unite, rdv) {
    const x0 = 70, x1 = 278, X = (t) => x0 + ((x1 - x0) * t) / L, y1 = 30, y2 = 78, q = rdv != null && typeof rdv !== "number";
    let s = T4(x0 - 10, y1 + 4, noms[0], "g-label", "end") + T4(x0 - 10, y2 + 4, noms[1], "g-label", "end") + L4(x0, y1, x1 + 6, y1, "g-droite") + L4(x0, y2, x1 + 6, y2, "g-droite") + T4(x1 + 12, y1 + 4, unite, "g-tick", "start") + T4(x1 + 12, y2 + 4, unite, "g-tick", "start");
    [[a, y1, -9], [b, y2, 19]].forEach(([p, y, dyl]) => { for (let t = 0; t <= L + 1e-9; t += p) s += C4(X(t), y, 4) + T4(X(t), y + dyl, t, "g-mesure"); });
    if (rdv != null) s += L4(X(q ? L : rdv), 14, X(q ? L : rdv), 92, "g-hline") + (q ? T4(X(L), 110, "?", "g-hlabel") : "");
    return svg4(320, q ? 118 : 104, `Frise des départs : ${noms[0]} toutes les ${a} ${unite}, ${noms[1]} toutes les ${b} ${unite}${q ? " ; le prochain départ commun est à trouver" : typeof rdv === "number" ? `, ensemble à ${rdv} ${unite}` : ""}`, s);
  }
  // Rectangle L × l à paver par des carrés de côté c (plein = pavage dessiné)
  function carrelage4(L, l, c, plein) {
    const k = Math.min(240 / L, 120 / l), w = L * k, h = l * k, x0 = 64, y0 = 10;
    let s = R4(x0, y0, w, h, "g-rect");
    if (plein) { for (let x = c; x < L - 1e-9; x += c) s += L4(x0 + x * k, y0, x0 + x * k, y0 + h, "g-droite"); for (let y = c; y < l - 1e-9; y += c) s += L4(x0, y0 + y * k, x0 + w, y0 + y * k, "g-droite"); }
    else s += R4(x0, y0, c * k, c * k, "g-aire") + T4(x0 + (c * k) / 2, y0 + (c * k) / 2 + 4, "?", "g-label");
    s += T4(x0 + w / 2, y0 + h + 16, `${L} cm`, "g-mesure") + T4(x0 - 6, y0 + h / 2 + 4, `${l} cm`, "g-mesure", "end");
    return svg4(320, y0 + h + 24, `Rectangle de ${L} cm sur ${l} cm${plein ? ` pavé par des carrés de ${c} cm de côté` : " ; un carreau carré est dessiné dans un coin, son côté est à trouver"}`, s);
  }
  FIGURES["dp4-cours-jetons"] = () => jetons4(3, 4);
  FIGURES["dp4-cours-crible"] = () => crible4(PREMIERS.filter((p) => p <= 60));
  FIGURES["dp4-cours-arbre"] = () => arbre4(360);
  FIGURES["dp4-cours-engrenages"] = () => engrenages4(12, 18);
  FIGURES["dp4-qcm-arbre"] = () => arbre4(180, 2);
  FIGURES["dp4-qcm-jetons"] = () => jetons4(7, 13);
  FIGURES["dp4-qcm-frise"] = () => frise4(6, 8, 24, ["Phare 1", "Phare 2"], "s", 24);
  FIGURES["dp4-meth-arbre"] = () => arbre4(180);
  FIGURES["dp4-meth-frise"] = () => frise4(4, 6, 12, ["Feu 1", "Feu 2"], "min", 12);
  FIGURES["dp4-qcm-carrelage"] = () => carrelage4(60, 36, 12, true);

  GEN["dp4-premier"] = function () {
    const t = rand(0, 4);
    if (t === 2) { // critères de divisibilité par 2, 3, 5, 9, 10
      const d = pick([2, 3, 5, 9, 10]), ok = (x) => x % d === 0;
      const piege = { 2: () => 2 * rand(50, 4999) + 1, 3: () => rand(10, 999) * 10 + pick([3, 6, 9]), 5: () => 5 * 10 ** rand(2, 3) + 2 * rand(1, 99), 9: () => 3 * rand(34, 3333), 10: () => rand(10, 999) * 10 + 5 }[d];
      let bon; do bon = rand(100, 9999); while (!ok(bon));
      const faux = []; for (let e = 0; faux.length < 3 && e < 200; e++) { const x = Math.random() < 0.75 ? piege() : rand(100, 9999); if (!ok(x) && x !== bon && !faux.includes(x)) faux.push(x); }
      const { choix, attendu } = melange(`$${nb(bon)}$`, faux.map((x) => `$${nb(x)}$`));
      const crit = { 2: "son chiffre des unités est pair ($0$, $2$, $4$, $6$ ou $8$)", 3: "la somme de ses chiffres est un multiple de $3$", 5: "son chiffre des unités est $0$ ou $5$", 9: "la somme de ses chiffres est un multiple de $9$", 10: "son chiffre des unités est $0$" }[d];
      const som = (x) => String(x).split("").reduce((s, c) => s + +c, 0);
      return { enonce: `Lequel de ces nombres est divisible par $${d}$ ?`, mode: "choix", choix, attendu,
        aides: [`Un nombre est divisible par $${d}$ si ${crit}.`, d === 3 || d === 9 ? "Calcule la somme des chiffres de chaque nombre." : "Regarde le chiffre des unités de chaque nombre.", d === 9 ? "Attention : un multiple de $3$ n'est pas toujours un multiple de $9$." : d === 3 ? "Le dernier chiffre ne suffit pas : $13$ ne se divise pas par $3$." : d === 10 ? "Se terminer par $5$ ne suffit pas pour $10$." : "Les autres chiffres ne comptent pas."],
        solution: d === 3 || d === 9 ? `$${String(bon).split("").join(" + ")} = ${som(bon)}$, qui est un multiple de $${d}$ : $${nb(bon)}$ est divisible par $${d}$. Pour les autres, la somme des chiffres vaut ${faux.map((x) => `$${som(x)}$`).join(", ")} : ce ne sont pas des multiples de $${d}$.` : `$${nb(bon)}$ est divisible par $${d}$ car ${crit}. Les autres nombres ne vérifient pas ce critère.` };
    }
    if (t === 3) { // jetons rangés en rectangle
      const a = pick([3, 5, 7, 9, 11]), b = pick([5, 7, 9, 11, 13].filter((x) => x > a)), N = a * b, nom = pick(PRENOMS4);
      const ctx = pick([`${nom} plante $${N}$ pieds de manioc en rangées identiques, comme sur le plan.`, `${nom} range ses $${N}$ billes en rectangle, comme sur le dessin.`, `Au marché de Mamoudzou, ${nom} dispose $${N}$ mangues en rangées identiques, comme sur le dessin.`, `Pour la fête de l'école à ${pick(LIEUX4)}, $${N}$ chaises sont disposées en rangées identiques, comme sur le plan.`]);
      const { choix, attendu } = melange(`$${N} = ${a} \\times ${b}$, donc $${N}$ n'est pas premier`, [`$${N}$ est un nombre premier`, `$${N}$ n'a que deux diviseurs : $1$ et $${N}$`, `$${N}$ est divisible par $${a + b}$`, `$${N}$ est pair`].filter((x, i) => i < 3 || N % (a + b) !== 0));
      return { enonce: `${ctx} Que montre ce rangement ?`, figure: jetons4(a, b), mode: "choix", choix, attendu,
        aides: ["Compte les rangées et le nombre d'objets par rangée.", `Le nombre total est égal au produit : rangées $\\times$ objets par rangée.`, "Un nombre premier ne peut se ranger qu'en une seule ligne (rectangle de largeur $1$)."],
        solution: `Il y a $${a}$ rangées de $${b}$ : $${N} = ${a} \\times ${b}$. Donc $${a}$ et $${b}$ sont des diviseurs de $${N}$, autres que $1$ et $${N}$ : $${N}$ n'est pas premier (même s'il est impair).` };
    }
    if (t === 4) { // chiffre manquant pour être divisible par 9 (ou par 3)
      const neuf = Math.random() < 0.6, d = neuf ? 9 : 3, ch = Array.from({ length: rand(3, 4) }, (_, i) => (i ? rand(0, 9) : rand(1, 9))), pos = rand(1, ch.length - 1), s = ch.reduce((x, c, i) => x + (i === pos ? 0 : c), 0);
      if (s % d === 0) return GEN["dp4-premier"]();
      const c = (d - (s % d)) % d, txt = ch.map((x, i) => (i === pos ? "\\square" : x)).join("");
      return { enonce: `Quel chiffre faut-il écrire à la place du carré pour que le nombre $${txt}$ soit divisible par $${d}$ ?${neuf ? "" : " Donne le plus petit chiffre possible."}`, mode: "nombre", prefixe: "Chiffre :", attendu: c,
        erreurs: neuf ? [c + 3, c - 3, c + 6, c - 6].filter((x) => x >= 0 && x <= 9).slice(0, 2).map((x) => ({ valeur: x, message: `Avec ce chiffre, la somme des chiffres est un multiple de $3$, mais pas de $9$.` })) : [c + 3, c + 6].map((x) => ({ valeur: x, message: "Ce chiffre convient aussi, mais on demande le plus petit possible." })),
        aides: [`Un nombre est divisible par $${d}$ si la somme de ses chiffres est un multiple de $${d}$.`, `Somme des chiffres connus : $${ch.filter((_, i) => i !== pos).join(" + ")} = ${s}$.`, `Quel chiffre ajouter à $${s}$ pour obtenir un multiple de $${d}$ ?`],
        solution: `$${s} + ${c} = ${s + c}$, qui est un multiple de $${d}$ : on écrit $${c}$, et $${ch.map((x, i) => (i === pos ? c : x)).join("")}$ est divisible par $${d}$.${neuf ? "" : ` (Les chiffres $${c + 3}$${c + 6 <= 9 ? ` et $${c + 6}$` : ""} conviennent aussi, mais $${c}$ est le plus petit.)`}` };
    }
    if (t === 0) {
      let p; do p = rand(20, 400); while (!estPremier(p));
      const faux = []; while (faux.length < 3) { const c = Math.random() < 0.6 ? composeTrompeur() : rand(20, 400); if (!estPremier(c) && !faux.includes(c) && c % 2 && c % 5) faux.push(c); }
      const { choix, attendu } = melange(`$${p}$`, faux.map((c) => `$${c}$`));
      return { enonce: "Lequel de ces nombres est premier ?", mode: "choix", choix, attendu,
        aides: ["Un nombre premier a exactement deux diviseurs : $1$ et lui-même.", "Teste la divisibilité par les nombres premiers $2$, $3$, $5$, $7$, $11$, $13$, … jusqu'à ce que leur carré dépasse le nombre.", "Les critères de divisibilité aident pour $2$, $3$ et $5$."],
        solution: `$${p}$ n'est divisible par aucun nombre premier dont le carré est inférieur à $${p}$ : il est premier. Les autres ne le sont pas : ${faux.map((c) => `$${c} = ${plusPetitDiv(c)} \\times ${c / plusPetitDiv(c)}$`).join(", ")}.` };
    }
    const n = Math.random() < 0.5 ? composeTrompeur() : rand(30, 300), pr = estPremier(n);
    if (n % 2 === 0 || n % 5 === 0) return GEN["dp4-premier"]();
    const d = plusPetitDiv(n);
    const choix = pr ? ["Oui, il est premier", `Non, il est divisible par $${pick([3, 7, 11].filter((k) => n % k))}$`, "Non, car il est impair", "On ne peut pas savoir"] : ["Oui, il est premier", `Non, il est divisible par $${d}$`, "Non, car il est impair", "On ne peut pas savoir"];
    return { enonce: `Le nombre $${n}$ est-il premier ?`, mode: "choix", choix, attendu: pr ? 0 : 1,
      aides: ["Cherche un diviseur de ce nombre autre que $1$ et lui-même.", "Essaie les nombres premiers dans l'ordre : $3$, $7$, $11$, $13$, $17$, $19$…", `Il suffit d'essayer jusqu'à $${Math.floor(Math.sqrt(n))}$ (car $${Math.floor(Math.sqrt(n)) + 1}^2 > ${n}$).`],
      solution: pr ? `Aucun nombre premier jusqu'à $${Math.floor(Math.sqrt(n))}$ ne divise $${n}$ : il est premier.` : `$${n} = ${d} \\times ${n / d}$ : il a d'autres diviseurs que $1$ et lui-même, il n'est pas premier.` };
  };

  GEN["dp4-decomposer"] = function () {
    let n; do { const f = Array.from({ length: rand(2, 5) }, () => pick([2, 2, 3, 3, 5, 7, 11, 13])); n = f.reduce((a, b) => a * b, 1); } while (n < 12 || n > 3000);
    const t = rand(0, 2), f = decompo(n);
    if (t === 0) {
      const bonne = `$${n} = ${decompoTex(n)}$`, faux = [];
      const g = f.slice(); const i = g.findIndex((p) => p === 2 || p === 3); if (i >= 0 && g.length > 1) { const p = g[i]; g.splice(i, 1); const j = g.findIndex((q) => q === p); if (j >= 0) { g.splice(j, 1); g.push(p * p); } }
      faux.push(`$${n} = ${g.sort((a, b) => a - b).join(" \\times ")}$`);
      faux.push(`$${n} = ${decompoTex(n * 2)}$`);
      faux.push(`$${n} = ${decompoTex(n / f[0] * (f[0] === 2 ? 3 : 2))}$`);
      faux.push(`$${n} = ${f[0]} \\times ${n / f[0]}$`);
      const { choix, attendu } = melange(bonne, [...new Set(faux)].filter((x) => x !== bonne));
      return { enonce: `Quelle est la décomposition de $${n}$ en produit de facteurs premiers ? L'arbre est commencé.`, figure: arbre4(n, 1), figureSolution: arbre4(n), mode: "choix", choix, attendu,
        aides: ["Tous les facteurs doivent être des nombres **premiers**.", `Divise $${n}$ par $2$ tant que c'est possible, puis par $3$, $5$, $7$…`, "Vérifie que le produit redonne bien le nombre."], solution: `${etapesDecompo(n)}. Donc $${n} = ${decompoTex(n)}$.` };
    }
    const fig = Math.random() < 0.6;
    if (t === 1) return { enonce: `Quel est le plus grand facteur premier de $${n}$ ?${fig ? " Tu peux compléter l'arbre." : ""}`, figure: fig ? arbre4(n, 1) : undefined, figureSolution: fig ? arbre4(n) : undefined, mode: "nombre", prefixe: "Facteur :", attendu: f[f.length - 1],
      erreurs: [{ valeur: f[0], message: "C'est le plus **petit** facteur premier. Continue la décomposition jusqu'au bout." }, { valeur: n / f[0], message: `$${n / f[0]}$ n'est pas premier : il faut encore le décomposer.` }],
      aides: ["Décompose le nombre en produit de facteurs premiers.", `Commence par diviser par le plus petit nombre premier possible : $${f[0]}$.`, `$${n} = ${decompoTex(n)}$.`], solution: `${etapesDecompo(n)}. Donc $${n} = ${decompoTex(n)}$ : le plus grand facteur premier est $${f[f.length - 1]}$.` };
    const p = pick([...new Set(f)]), k = f.filter((q) => q === p).length;
    return { enonce: `Dans la décomposition de $${n}$ en produit de facteurs premiers, combien de fois apparaît le facteur $${p}$ ?`, figure: fig ? arbre4(n, 1) : undefined, figureSolution: fig ? arbre4(n) : undefined, mode: "nombre", prefixe: "Nombre de fois :", attendu: k,
      erreurs: [{ valeur: k + 1, message: `Vérifie : divise $${n}$ par $${p}$ et compte seulement les divisions qui tombent juste.` }, { valeur: f.length, message: "Ça, c'est le nombre total de facteurs premiers. On ne compte que le facteur demandé." }],
      aides: [`Divise $${n}$ par $${p}$ autant de fois que possible.`, "Compte les divisions qui tombent juste.", `$${n} = ${decompoTex(n)}$.`], solution: `${etapesDecompo(n)}. Donc $${n} = ${decompoTex(n)}$ : le facteur $${p}$ apparaît $${k}$ fois.` };
  };

  GEN["dp4-irreductible"] = function () {
    for (;;) {
      const a = rand(1, 15), b = rand(2, 16), k = pick([2, 3, 4, 5, 6, 7, 8, 9, 12, 14, 15]);
      if (pgcd(a, b) > 1 || a === b) continue;
      const N = a * k, D = b * k, t = rand(0, 3);
      const dk = diviseurs(k).filter((x) => x > 1 && x < k), part = dk.length ? pick(dk) : 0; // simplification incomplète possible
      const decTex = (x) => (x === 1 ? "1" : decompoTex(x));
      const fig = D <= 30 && N <= 2 * D, figs = fig ? { figure: bandes(N, D), figureSolution: bandes(a, b) } : {}, intro = fig ? `La partie coloriée représente $${fr(N, D)}$ ${N > D ? "d'une bande (chaque bande est une unité)" : "de la bande"}. ` : "";
      if (t === 0 || t === 3) { const den = t === 3, v = den ? b : a;
        return { enonce: `${intro}Écris $${fr(N, D)}$ sous forme irréductible. Donne le ${den ? "dénominateur" : "numérateur"} de la fraction irréductible.`, ...figs, mode: "nombre", prefixe: den ? "Dénominateur :" : "Numérateur :", attendu: v,
          erreurs: [...(part ? [{ valeur: (den ? D : N) / part, message: `Tu as simplifié par $${part}$ seulement : la fraction obtenue n'est pas encore irréductible.` }] : []), { valeur: den ? a : b, message: `Tu as donné le ${den ? "numérateur" : "dénominateur"} : relis la question.` }],
          aides: ["Une fraction est irréductible quand son numérateur et son dénominateur n'ont plus de diviseur commun autre que $1$.", `Décompose : $${N} = ${decTex(N)}$ et $${D} = ${decTex(D)}$.`, "Simplifie par tous les facteurs communs."], solution: `$${fr(N, D)} = \\dfrac{${a} \\times ${k}}{${b} \\times ${k}} = ${fr(a, b)}$ : le ${den ? "dénominateur" : "numérateur"} est $${v}$.` }; }
      if (t === 2) { // reconnaître une fraction irréductible
        const autres = []; for (let e = 0; autres.length < 3 && e < 100; e++) { const x = rand(1, 15), y = rand(2, 16), m = pick([2, 3, 5, 7]); if (pgcd(x, y) === 1 && x !== y && !autres.some(([p, q]) => p === x * m && q === y * m)) autres.push([x * m, y * m]); }
        const bonne = `$${fr(N / k, D / k)}$`;
        if (N / k === 1 || b < 4) continue;
        const { choix, attendu } = melange(bonne, autres.map(([p, q]) => `$${fr(p, q)}$`));
        return { enonce: "Laquelle de ces fractions est irréductible ?", mode: "choix", choix, attendu,
          aides: ["Une fraction est irréductible si son numérateur et son dénominateur n'ont aucun diviseur commun autre que $1$.", "Cherche un diviseur commun ($2$, $3$, $5$, $7$…) au numérateur et au dénominateur de chaque fraction.", "Les critères de divisibilité vont vite : pairs ? somme des chiffres ? terminé par $0$ ou $5$ ?"],
          solution: `$${fr(a, b)}$ est irréductible : $${a}$ et $${b}$ n'ont pas de diviseur commun autre que $1$. Les autres se simplifient : ${autres.map(([p, q]) => `$${fr(p, q)} = ${frNet(p, q)}$`).join(", ")}.` };
      }
      const bonne = `$${fr(a, b)}$`, autres = [...(part ? [`$${fr(N / part, D / part)}$`] : []), `$${fr(b, a)}$`, `$${fr(N / k, D / (k > 2 ? pick(dk.length ? dk : [1]) : 1))}$`, `$${fr(Math.abs(N - k), Math.abs(D - k) || 1)}$`, `$${fr(a + b, b)}$`].filter((x) => x !== bonne && !x.includes("{0}"));
      const { choix, attendu } = melange(bonne, autres);
      return { enonce: `${intro}Quelle est la forme irréductible de $${fr(N, D)}$ ?`, ...figs, mode: "choix", choix, attendu,
        aides: ["Cherche les facteurs premiers communs au numérateur et au dénominateur.", `$${N} = ${decTex(N)}$ et $${D} = ${decTex(D)}$.`, "Une fraction simplifiée « à moitié » n'est pas encore irréductible."], solution: `$${fr(N, D)} = \\dfrac{${a} \\times ${k}}{${b} \\times ${k}} = ${fr(a, b)}$ ; $${a}$ et $${b}$ n'ont plus de diviseur commun autre que $1$.` };
    }
  };

  // deux nombres a = d × u et b = d × v (u, v premiers entre eux) : pgcd d, ppcm d × u × v
  const paire4 = (dmin, dmax, umax, bmax) => { for (;;) { const d = rand(dmin, dmax), u = rand(2, umax), v = rand(2, umax); if (u < v && pgcd(u, v) === 1 && d * v <= bmax) return [d * u, d * v, d]; } };
  GEN["dp4-problemes"] = function () {
    const t = rand(0, 5), nom = pick(PRENOMS4);
    if (t === 0 || t === 3) { // plus petit multiple commun : roues dentées ou rendez-vous
      const [a, b] = t === 0 ? paire4(2, 8, 5, 42) : paire4(2, 12, 5, 48), m = ppcm4(a, b);
      if (t === 0 && a < 6) return GEN["dp4-problemes"]();
      const er = [{ valeur: a * b, message: "C'est bien un multiple commun, mais pas le plus petit." }, { valeur: pgcd(a, b), message: "Ça, c'est un diviseur commun. Ici, il faut un **multiple** commun (le plus petit)." }];
      if (t === 0) return { enonce: `Deux roues dentées s'engrènent : l'une a $${a}$ dents, l'autre $${b}$. Une dent de chaque roue est marquée et les deux marques sont face à face. Au bout de combien de dents passées les deux marques se retrouvent-elles face à face pour la première fois ?`, figure: engrenages4(a, b), mode: "nombre", prefixe: "Dents :", attendu: m, erreurs: er,
        aides: [`Il faut un nombre de dents qui soit à la fois un multiple de $${a}$ et de $${b}$.`, `Multiples de $${b}$ : $${b}$ ; $${2 * b}$ ; $${3 * b}$ ; …`, `Cherche le premier qui est aussi un multiple de $${a}$.`], solution: `Le plus petit multiple commun de $${a}$ et $${b}$ est $${m}$ : après $${m}$ dents, la première roue a fait $${m / a}$ tours et la seconde $${m / b}$ tours.` };
      const C = pick([
        [`À Dzaoudzi, deux barges partent ensemble à $6$ h. La première revient au quai toutes les $${a}$ minutes, la seconde toutes les $${b}$ minutes.`, "Au bout de combien de minutes seront-elles de nouveau ensemble au quai ?", ["Barge 1", "Barge 2"], "min"],
        [`Deux balises lumineuses du lagon viennent de clignoter ensemble. L'une clignote toutes les $${a}$ secondes, l'autre toutes les $${b}$ secondes.`, "Dans combien de secondes clignoteront-elles de nouveau ensemble ?", ["Balise 1", "Balise 2"], "s"],
        [`À la gare routière de ${pick(["Mamoudzou", "Koungou", "Chirongui"])}, un taxi-brousse part toutes les $${a}$ minutes vers ${pick(["Combani", "Sada", "Dembéni"])} et un autre toutes les $${b}$ minutes vers ${pick(["Bandrélé", "M'tsamboro", "Kani-Kéli"])}. Ils viennent de partir ensemble.`, "Dans combien de minutes partiront-ils de nouveau ensemble ?", ["Taxi 1", "Taxi 2"], "min"],
        [`${nom} arrose ses pieds de vanille tous les $${a}$ jours et ses bananiers tous les $${b}$ jours. Aujourd'hui, ${il4(nom)} arrose les deux.`, `Dans combien de jours arrosera-t-${il4(nom)} de nouveau les deux le même jour ?`, ["Vanille", "Bananiers"], "jours"]
      ]);
      return { enonce: `${C[0]} ${C[1]}`, figure: frise4(a, b, m - 1, C[2], C[3], "?"), figureSolution: frise4(a, b, m, C[2], C[3], m), mode: "nombre", prefixe: "Réponse :", suffixe: C[3], attendu: m, erreurs: er,
        aides: [`Le premier se répète tous les $${a}$, le second tous les $${b}$ : cherche un multiple commun.`, `Multiples de $${b}$ : $${b}$ ; $${2 * b}$ ; $${3 * b}$ ; …`, `Le premier de ces multiples qui est aussi un multiple de $${a}$ est la réponse.`], solution: `Multiples de $${a}$ : ${Array.from({ length: m / a }, (_, i) => `$${(i + 1) * a}$`).join(" ; ")}. Multiples de $${b}$ : ${Array.from({ length: m / b }, (_, i) => `$${(i + 1) * b}$`).join(" ; ")}. Le plus petit multiple commun est $${m}$.` };
    }
    if (t === 1 || t === 4) { // plus grand diviseur commun : partages ou carrelage
      const [g, f, d] = t === 1 ? paire4(2, 12, 9, 120) : paire4(10, 60, 7, 480);
      const er = [{ valeur: (g * f) / d, message: "Tu as cherché un multiple commun. Ici, on partage : il faut un **diviseur** commun." }, { valeur: diviseurs(d).filter((x) => x < d).pop(), message: "C'est un diviseur commun, mais pas le plus grand." }];
      if (t === 4) return { enonce: `On veut couvrir le sol rectangulaire d'une terrasse à ${pick(LIEUX4)} ($${f}$ cm sur $${g}$ cm) avec des carreaux carrés identiques, les plus grands possible, sans découpe. Quelle est la longueur du côté d'un carreau ?`, figure: carrelage4(f, g, d, false), figureSolution: carrelage4(f, g, d, true), mode: "nombre", prefixe: "Côté :", suffixe: "cm", attendu: d, erreurs: er,
        aides: [`Le côté du carreau doit diviser $${f}$ et $${g}$ (pas de découpe).`, `Décompose : $${f} = ${decompoTex(f)}$ et $${g} = ${decompoTex(g)}$.`, "Prends le produit des facteurs premiers communs."], solution: `Le plus grand diviseur commun de $${f}$ et $${g}$ est $${d}$ : des carreaux de $${d}$ cm de côté, soit $${f / d}$ carreaux sur la longueur et $${g / d}$ sur la largeur.` };
      const C = pick([
        [`Pour un tournoi à ${pick(LIEUX4)}, on veut répartir $${g}$ filles et $${f}$ garçons en équipes, chaque équipe ayant le même nombre de filles et le même nombre de garçons, sans personne de côté.`, "Quel est le plus grand nombre d'équipes possible ?", "Équipes :", ["filles", "garçons"], "équipes"],
        [`Au marché de Mamoudzou, une vendeuse a $${g}$ mangues et $${f}$ ananas. Elle veut faire des paniers identiques (même nombre de mangues et même nombre d'ananas dans chaque panier) en utilisant tous les fruits.`, "Combien de paniers peut-elle faire au maximum ?", "Paniers :", ["mangues", "ananas"], "paniers"],
        [`Pour une fête à ${pick(LIEUX4)}, ${nom} veut faire des bouquets identiques avec $${g}$ fleurs d'ylang-ylang et $${f}$ fleurs de jasmin, sans en laisser.`, `Combien de bouquets peut-${il4(nom)} faire au maximum ?`, "Bouquets :", ["fleurs d'ylang-ylang", "fleurs de jasmin"], "bouquets"],
        [`Pour une sortie au lagon, $${g}$ élèves de 4e et $${f}$ élèves de 3e sont répartis en groupes identiques (même nombre d'élèves de 4e et même nombre d'élèves de 3e dans chaque groupe), sans personne de côté.`, "Combien de groupes peut-on faire au maximum ?", "Groupes :", ["élèves de 4e", "élèves de 3e"], "groupes"]
      ]);
      return { enonce: `${C[0]} ${C[1]}`, mode: "nombre", prefixe: C[2], attendu: d, erreurs: er,
        aides: [`Le nombre ${deM4(C[4])} doit diviser $${g}$ et $${f}$.`, `Décompose : $${g} = ${decompoTex(g)}$ et $${f} = ${decompoTex(f)}$.`, "Prends le produit des facteurs premiers communs."], solution: `Le plus grand diviseur commun de $${g}$ et $${f}$ est $${d}$ : $${d}$ ${C[4]} de $${g / d}$ ${C[3][0]} et $${f / d}$ ${C[3][1]}.` };
    }
    if (t === 2) { // nombre de diviseurs
      let n; do n = rand(24, 240); while (diviseurs(n).length < 6);
      const D = diviseurs(n), np = Math.ceil(D.length / 2);
      return { enonce: `Combien le nombre $${n}$ a-t-il de diviseurs ?`, mode: "nombre", prefixe: "Diviseurs :", attendu: D.length,
        erreurs: [{ valeur: D.length - 2, message: "N'oublie pas $1$ et le nombre lui-même : ce sont aussi des diviseurs." }, { valeur: np, message: `Tu as compté les paires : chaque paire comme $1 \\times ${n}$ donne **deux** diviseurs${D.length % 2 ? " (sauf le carré, compté une seule fois)" : ""}.` }],
        aides: [`Cherche les diviseurs par paires : $1 \\times ${n}$, $${D[1]} \\times ${n / D[1]}$…`, `La décomposition $${n} = ${decompoTex(n)}$ aide à les trouver tous.`, "N'oublie pas $1$ et le nombre lui-même."], solution: `Les diviseurs de $${n}$ sont $${D.join(" ; ")}$ : il y en a $${D.length}$.` };
    }
    // t === 5 : division euclidienne
    const k = rand(0, 2), b = pick([[6, 10, 12, 30], [6, 8, 10, 12, 15, 20, 25], [8, 10, 12, 15, 20, 24, 25, 30]][k]), q = rand(4, k === 0 ? 25 : 40), r = rand(1, b - 1), N = b * q + r;
    const C = [[`${nom} range $${N}$ œufs dans des boîtes de $${b}$.`, `Combien de boîtes pleines obtient-${il4(nom)} ?`, "Boîtes pleines :", q, [{ valeur: q + 1, message: "La dernière boîte n'est pas pleine : elle ne compte pas." }, { valeur: r, message: "Ça, c'est le reste : le nombre d'œufs qui ne remplissent pas une boîte." }]],
      [`Au marché de Mamoudzou, une vendeuse fait des sachets de $${b}$ litchis avec ses $${N}$ litchis.`, "Combien de litchis lui reste-t-il quand elle a rempli le plus de sachets possible ?", "Reste :", r, [{ valeur: q, message: "Ça, c'est le nombre de sachets (le quotient). On demande le reste." }, { valeur: b - r, message: "Le reste est ce qui ne suffit pas pour un sachet de plus : vérifie $" + b + " \\times " + q + " + \\ldots = " + N + "$." }]],
      [`$${N}$ personnes attendent la barge pour Petite-Terre ; un bateau-taxi transporte au plus $${b}$ passagers.`, "Combien de traversées faut-il au minimum pour transporter tout le monde ?", "Traversées :", q + 1, [{ valeur: q, message: `Avec $${q}$ traversées, il reste $${r}$ personnes à quai : il en faut une de plus.` }, { valeur: r, message: "Ça, c'est le nombre de personnes de la dernière traversée." }]]][k];
    return { enonce: `${C[0]} ${C[1]}`, mode: "nombre", prefixe: C[2], attendu: C[3], erreurs: C[4],
      aides: [`Effectue la division euclidienne de $${N}$ par $${b}$ : $${N} = ${b} \\times q + r$ avec $r < ${b}$.`, `$${b} \\times ${q} = ${b * q}$ et $${b} \\times ${q + 1} = ${b * (q + 1)}$.`, k === 2 ? "S'il reste des personnes, il faut une traversée de plus." : k === 1 ? "Le reste est ce qui reste après avoir rempli le plus de sachets possible." : "Le quotient donne le nombre de boîtes pleines."],
      solution: `$${N} = ${b} \\times ${q} + ${r}$ (avec $${r} < ${b}$) : quotient $${q}$, reste $${r}$. ${k === 0 ? `On obtient $${q}$ boîtes pleines (et $${r}$ œufs en plus).` : k === 1 ? `Il reste $${r}$ litchis.` : `$${q}$ traversées pleines ne suffisent pas (il reste $${r}$ personnes) : il faut $${q + 1}$ traversées.`}` };
  };

  /* =====================================================================
     Chapitre 2 : multiplier et diviser des relatifs (rx4-)
     ===================================================================== */
  const X4 = "\\times";
  const tire4 = (dec) => (dec ? rand(2, 30) / 10 : rand(2, 15)) * (Math.random() < 0.55 ? -1 : 1);
  const SIGNE4 = "Règle des signes : deux nombres de même signe donnent un résultat positif, deux nombres de signes contraires un résultat négatif.";

  /* Figures du chapitre 2 */
  // Droite graduée avec n sauts de longueur pas à partir de 0 ; o = { fin: texte au point d'arrivée, unite, vertical, total: true (accolade du total, sauts marqués « ? ») }
  function sauts4(pas, n, o) {
    o = o || {};
    const fin = pas * n, lo = Math.min(0, fin), hi = Math.max(0, fin), marge = Math.max(1, Math.abs(pas) * 0.6), m0 = lo - marge, m1 = hi + marge;
    const V = !!o.vertical, long = V ? 210 : 270, k = long / (m1 - m0), base = V ? 150 : o.total ? 44 : 36;
    // coordonnée le long de l'axe → point ; d = décalage perpendiculaire (positif : au-dessus ou à droite)
    const P = (v, d) => (V ? [base + (d || 0), 14 + (m1 - v) * k] : [24 + (v - m0) * k, base - (d || 0)]);
    let s = L4(...P(m0), ...P(m1), "g-droite");
    const pasGrad = Math.abs(pas) * n <= 24 ? 1 : Math.abs(pas);
    for (let v = Math.ceil(m0 / pasGrad) * pasGrad; v <= m1 + 1e-9; v += pasGrad) s += L4(...P(v, -4), ...P(v, 4), "g-graduation");
    const lab = (v, t, cl) => { const [x, y] = P(v, V ? -12 : -18); return T4(x, y + (V ? 4 : 0), t, cl || "g-mesure", V ? "end" : "middle"); };
    s += lab(0, "0") + (o.total ? "" : lab(pas, nbTexte(pas)));
    for (let i = 0; i < n; i++) {
      const a = P(pas * i), b = P(pas * (i + 1)), h = Math.min(26, Math.abs(pas) * k * 0.45 + 8), c = P(pas * (i + 0.5), h);
      const ang = Math.atan2(b[1] - c[1], b[0] - c[0]);
      s += `<path class="g-curve" d="M${f1(a[0])} ${f1(a[1])} Q${f1(c[0])} ${f1(c[1])} ${f1(b[0])} ${f1(b[1])}"/>` + P4([b, [b[0] - 8 * Math.cos(ang - 0.45), b[1] - 8 * Math.sin(ang - 0.45)], [b[0] - 8 * Math.cos(ang + 0.45), b[1] - 8 * Math.sin(ang + 0.45)]], "g-end");
      if (o.total && i === 0) { const [x, y] = P(pas * 0.5, h + 8); s += T4(x + (V ? 8 : 0), y + (V ? 4 : 0), "?", "g-hlabel", V ? "start" : "middle"); }
    }
    s += C4(...P(0), 3.5) + C4(...P(fin), 4.5);
    if (o.fin != null) s += lab(fin, o.fin, "g-hlabel");
    if (o.total) { const [xa, ya] = P(0, -30), [xb, yb] = P(fin, -30), [x, y] = P(fin / 2, -30); s += L4(xa, ya, xb, yb, "g-hline") + (V ? L4(xa - 4, ya, xa + 4, ya, "g-hline") + L4(xb - 4, yb, xb + 4, yb, "g-hline") : L4(xa, ya - 4, xa, ya + 4, "g-hline") + L4(xb, yb - 4, xb, yb + 4, "g-hline")) + T4(x + (V ? -6 : 0), y + (V ? 4 : 15), nbTexte(fin), "g-hlabel", V ? "end" : "middle"); }
    if (o.unite) { const [x, y] = P(m1, V ? 0 : -18); s += T4(x + (V ? 14 : 0), y + (V ? 4 : 0), o.unite, "g-tick", V ? "start" : "end"); }
    return svg4(V ? 260 : 320, V ? 240 : o.total ? 96 : 66, o.aria || `Droite graduée : ${n} sauts de ${nbTexte(pas)} à partir de 0`, s, V ? 260 : 0);
  }
  // Tableau de la règle des signes
  function tableSignes4() {
    const c = 56, x0 = 76, y0 = 8, cell = (i, j, t, fond) => (fond ? R4(x0 + j * c, y0 + i * 36, c, 36, "g-aire") : "") + T4(x0 + j * c + c / 2, y0 + i * 36 + 23, t, "g-clabel");
    let s = "";
    [["×", "+", "−"], ["+", "+", "−"], ["−", "−", "+"]].forEach((l, i) => l.forEach((t, j) => { s += cell(i, j, t, i === 0 || j === 0); }));
    s += `<g class="g-grid">${[0, 1, 2, 3].map((i) => L4(x0, y0 + i * 36, x0 + 3 * c, y0 + i * 36, "") + L4(x0 + i * c, y0, x0 + i * c, y0 + 108, "")).join("")}</g>`;
    return svg4(320, 124, "Tableau de la règle des signes : plus fois plus égale plus, plus fois moins égale moins, moins fois plus égale moins, moins fois moins égale plus", s);
  }
  // Facteurs d'un produit : les négatifs (en jaune) sont groupés par deux, chaque paire donne un produit positif
  function pairesSignes4(F, sansArcs) {
    const g = 14, w = Math.min(42, (304 - (F.length - 1) * g) / F.length), x0 = (320 - (F.length * w + (F.length - 1) * g)) / 2, X = (i) => x0 + i * (w + g), neg = F.map((x, i) => (x < 0 ? i : -1)).filter((i) => i >= 0);
    let s = F.map((x, i) => R4(X(i), 10, w, 30, x < 0 ? "g-poly g-poly-image" : "g-poly") + T4(X(i) + w / 2, 30, nbTexte(x)) + (i ? T4(X(i) - g / 2, 30, "×", "g-label") : "")).join("");
    if (sansArcs) return svg4(320, 50, `Produit de ${F.length} facteurs ; les facteurs négatifs sont surlignés en jaune`, s);
    for (let k = 0; k + 1 < neg.length; k += 2) { const a = X(neg[k]) + w / 2, b = X(neg[k + 1]) + w / 2; s += `<path class="g-curve g-curve-1" d="M${f1(a)} 42 Q${f1((a + b) / 2)} 78 ${f1(b)} 42"/>` + T4((a + b) / 2, 76, "+", "g-clabel"); }
    if (neg.length % 2) s += T4(X(neg[neg.length - 1]) + w / 2, 62, "reste −", "g-hlabel");
    return svg4(320, 86, `Produit de ${F.length} facteurs ; les ${neg.length} facteurs négatifs sont groupés par paires : chaque paire donne un produit positif${neg.length % 2 ? ", il reste un facteur négatif" : ""}`, s);
  }
  FIGURES["rx4-cours-sauts"] = () => sauts4(-4, 3, { fin: "−12", aria: "Droite graduée : 3 sauts de −4 à partir de 0 mènent à −12" });
  FIGURES["rx4-cours-paires"] = () => pairesSignes4([-2, 3, -1, -5]);
  FIGURES["rx4-meth-paires"] = () => pairesSignes4([-1, -2, -3, -4, 5]);
  FIGURES["rx4-cours-signes"] = () => tableSignes4();
  FIGURES["rx4-cours-division"] = () => sauts4(-3, 4, { total: true, aria: "Droite graduée : de 0 à −12 en 4 sauts égaux, chaque saut est à trouver" });
  FIGURES["rx4-cours-plongee"] = () => sauts4(-3, 4, { vertical: true, unite: "m", fin: "?", aria: "Altitude d'un plongeur : 4 descentes de 3 m à partir de la surface (altitude 0)" });

  GEN["rx4-produit"] = function () {
    if (Math.random() < 0.35) { // en situation : descentes, baisses, dettes
      const n = rand(2, 6), nom = pick(PRENOMS4), C = pick([
        () => { const p = rand(2, 8); return [-p, `${nom} plonge dans le lagon près de la plage de N'Gouja : ${il4(nom)} descend de $${p}$ m chaque minute, à partir de la surface (altitude $0$).`, `Quelle est son altitude au bout de $${n}$ minutes ?`, "Altitude :", "m", true, "m"]; },
        () => { const p = pick([0.5, 1.5, 2, 2.5, 3]); return [-p, `Dans une chambre froide du port de Longoni, la température baisse de $${nb(p)}$ °C chaque heure.`, `Quelle est la variation de température au bout de $${n}$ heures ?`, "Variation :", "°C", false, "°C"]; },
        () => { const p = rand(3, 12); return [-p, `Chaque semaine, ${nom} dépense $${p}$ € de plus que ce qu'${il4(nom)} gagne : son solde varie de $-${p}$ € par semaine.`, `Quelle est la variation de son solde au bout de $${n}$ semaines ?`, "Variation :", "€", false, "€"]; },
        () => { const p = rand(2, 6); return [-p, `Au jeu de la fête de l'école à ${pick(LIEUX4)}, chaque mauvaise réponse fait perdre $${p}$ points. ${nom} donne $${n}$ mauvaises réponses.`, "Quelle est la variation de son score ?", "Variation :", "points", false, ""]; }
      ])();
      const [pas, ctx, q, pre, suf, vert, un] = C, v = arr(pas * n, 4);
      return { enonce: `${ctx} ${q}`, figure: sauts4(pas, n, { vertical: vert, unite: un, fin: "?", aria: `Droite graduée : ${n} sauts de ${nbTexte(pas)} à partir de 0, point d'arrivée à trouver` }), mode: "nombre", prefixe: pre, suffixe: suf, attendu: v,
        erreurs: [{ valeur: -v, message: "Une descente (ou une baisse, une perte) se compte avec un nombre négatif : le résultat est négatif." }, { valeur: arr(pas + n, 4), message: "Il y a $" + n + "$ fois la même variation : c'est une multiplication, pas une addition." }],
        aides: [`Chaque fois, la variation est de $${rel(pas)}$.`, `Il y a $${n}$ fois cette variation : on calcule $${n} ${X4} ${relP(pas)}$.`, SIGNE4],
        solution: `$${n} ${X4} ${relP(pas)} = ${rel(v)}$ : ${vert ? `${il4(nom)} est à l'altitude $${rel(v)}$ m, soit $${nb(-v)}$ m sous la surface` : `la variation est de $${rel(v)}$${un ? ` ${un}` : " points"}`}.` };
    }
    const a = tire4(Math.random() < 0.3), b = tire4(false), p = arr(a * b, 4), dec = !Number.isInteger(a);
    return { enonce: `Calcule : $${relP(a)} ${X4} ${relP(b)}$`, mode: "nombre", prefixe: "Résultat :", attendu: p,
      erreurs: [{ valeur: -p, message: `Attention au signe. ${SIGNE4}` }, dec ? { valeur: arr(p * 10, 4), message: "Vérifie la place de la virgule : il y a autant de chiffres après la virgule dans le produit que dans les facteurs." } : { valeur: a + b, message: "Tu as additionné : ici, on multiplie." }],
      aides: ["On multiplie les distances à zéro.", "Règle des signes : même signe → positif ; signes contraires → négatif.", `$${nb(Math.abs(a))} ${X4} ${nb(Math.abs(b))} = ${nb(Math.abs(p))}$.`],
      solution: `$${nb(Math.abs(a))} ${X4} ${nb(Math.abs(b))} = ${nb(Math.abs(p))}$ ; ${(a < 0) === (b < 0) ? "même signe : le produit est positif" : "signes contraires : le produit est négatif"}. Résultat : $${rel(p)}$.` };
  };

  GEN["rx4-quotient"] = function () {
    if (Math.random() < 0.3) { // en situation : partager une baisse ou une dette
      const n = rand(2, 6), q = rand(2, 9), nom = pick(PRENOMS4), C = pick([
        [`La température d'une chambre froide a baissé régulièrement de $${n * q}$ °C en $${n}$ heures.`, "Quelle a été la variation de température par heure ?", "°C"],
        [`${nom} a fait des dépenses : son solde a varié de $-${n * q}$ € en $${n}$ semaines, toujours de la même façon.`, "Quelle a été la variation de son solde par semaine ?", "€"],
        [`Un plongeur est descendu régulièrement de la surface jusqu'à l'altitude $-${n * q}$ m en $${n}$ minutes, dans le lagon de Mayotte.`, "Quelle a été la variation de son altitude chaque minute ?", "m"]
      ]);
      return { enonce: `${C[0]} ${C[1]}`, figure: sauts4(-q, n, { total: true, vertical: C[2] === "m", unite: C[2], aria: `Droite graduée : de 0 à −${n * q} en ${n} sauts égaux, chaque saut est à trouver` }), mode: "nombre", prefixe: "Variation :", suffixe: C[2], attendu: -q,
        erreurs: [{ valeur: q, message: "La variation est une baisse : elle est négative." }, { valeur: -n * q * n, message: `Il faut **partager** la variation totale en $${n}$ parts égales : c'est une division.` }],
        aides: [`La variation totale est $-${n * q}$, en $${n}$ parts égales.`, `On calcule $(-${n * q}) \\div ${n}$.`, SIGNE4], solution: `$(-${n * q}) \\div ${n} = -${q}$ : la variation est de $-${q}$ ${C[2]} à chaque fois.` };
    }
    const q = tire4(Math.random() < 0.25), b = tire4(false), a = arr(q * b, 4);
    return { enonce: `Calcule : $${relP(a)} \\div ${relP(b)}$`, mode: "nombre", prefixe: "Résultat :", attendu: q,
      erreurs: [{ valeur: -q, message: `Même règle des signes que pour la multiplication. ${SIGNE4}` }, { valeur: arr(a * b, 4), message: "Tu as multiplié : ici, on divise." }],
      aides: ["On divise les distances à zéro.", "Même signe → positif ; signes contraires → négatif.", `$${nb(Math.abs(a))} \\div ${nb(Math.abs(b))} = ${nb(Math.abs(q))}$.`],
      solution: `$${nb(Math.abs(a))} \\div ${nb(Math.abs(b))} = ${nb(Math.abs(q))}$ ; ${(a < 0) === (b < 0) ? "même signe : positif" : "signes contraires : négatif"}. Résultat : $${rel(q)}$.` };
  };

  GEN["rx4-signe"] = function () {
    const CH = ["positif", "négatif", "nul", "on ne peut pas savoir sans calculer"];
    if (Math.random() < 0.3) { // puissance ou quotient
      const t = rand(0, 1);
      if (t === 0) { const a = rand(2, 9), n = rand(2, 12), par = Math.random() < 0.7, v = par ? (n % 2 ? 1 : 0) : 1;
        return { enonce: `Sans calculer, donne le signe de $${par ? `(-${a})` : `-${a}`}^{${n}}$.`, mode: "choix", choix: CH, attendu: v,
          aides: [par ? `$(-${a})^{${n}}$ est le produit de $${n}$ facteurs égaux à $-${a}$.` : `Sans parenthèses, la puissance ne porte que sur $${a}$ : $-${a}^{${n}} = -(${a}^{${n}})$.`, "Compte les facteurs négatifs.", "Nombre pair de facteurs négatifs : positif ; nombre impair : négatif."],
          solution: par ? `$(-${a})^{${n}}$ est un produit de $${n}$ facteurs négatifs : $${n}$ est ${n % 2 ? "impair, le résultat est négatif" : "pair, le résultat est positif"}.` : `$-${a}^{${n}} = -(${a}^{${n}})$ : on prend l'opposé d'un nombre positif, le résultat est négatif.` }; }
      const F = Array.from({ length: 3 }, () => tire4(false)), neg = F.filter((x) => x < 0).length;
      if (!neg) return GEN["rx4-signe"]();
      return { enonce: `Sans calculer, donne le signe de $\\dfrac{${relP(F[0])} ${X4} ${relP(F[1])}}{${rel(F[2])}}$.`, mode: "choix", choix: CH, attendu: neg % 2 ? 1 : 0,
        aides: ["Pour un quotient, la règle des signes est la même que pour un produit.", "Compte tous les nombres négatifs, au numérateur et au dénominateur.", "Nombre pair : positif ; nombre impair : négatif."],
        solution: `Il y a $${neg}$ nombre${neg > 1 ? "s" : ""} négatif${neg > 1 ? "s" : ""} au total : c'est un nombre ${neg % 2 ? "impair, le quotient est négatif" : "pair, le quotient est positif"}.` };
    }
    const n = rand(3, 6), F = Array.from({ length: n }, () => tire4(Math.random() < 0.3)), nul = Math.random() < 0.12;
    if (nul) F[rand(0, n - 1)] = 0;
    const neg = F.filter((x) => x < 0).length, rep = nul ? 2 : neg % 2 ? 1 : 0;
    if (!neg) return GEN["rx4-signe"]();
    const fig = !nul && Math.random() < 0.6 ? { figure: pairesSignes4(F, true), figureSolution: pairesSignes4(F) } : {};
    return { enonce: `Sans calculer, donne le signe du produit $${F.map(relP).join(` ${X4} `)}$.`, ...fig, mode: "choix", choix: CH, attendu: rep,
      aides: ["Si un facteur est nul, le produit est nul.", "Sinon, compte les facteurs négatifs.", "Nombre pair de facteurs négatifs : positif ; nombre impair : négatif."],
      solution: nul ? "Un des facteurs est $0$ : le produit est nul." : `Il y a $${neg}$ facteur${neg > 1 ? "s" : ""} négatif${neg > 1 ? "s" : ""} : c'est un nombre ${neg % 2 ? "impair" : "pair"}, donc le produit est ${neg % 2 ? "négatif" : "positif"}.` };
  };

  GEN["rx4-priorites"] = function () {
    for (let e = 0; e < 100; e++) {
      const a = rand(-15, 15), b = rand(-9, 9), c = rand(-9, 9), d = rand(2, 6), t = rand(0, 6);
      if (!a || !b || !c) continue;
      let tex, v, etapes, faux = [], enonce = null;
      const PRIO = "La multiplication (ou la division) passe avant l'addition et la soustraction.", SG = "Attention aux signes à chaque étape.";
      if (t === 0) { tex = `${rel(a)} + ${relP(b)} ${X4} ${relP(c)}`; v = a + b * c; etapes = `${rel(a)} + ${relP(b * c)}`; faux = [[(a + b) * c, PRIO], [a - b * c, SG]]; }
      if (t === 1) { tex = `(${rel(a)} - ${relP(b)}) ${X4} ${relP(c)}`; v = (a - b) * c; etapes = `${relP(a - b)} ${X4} ${relP(c)}`; faux = [[a - b * c, "Les parenthèses passent en premier."], [(a + b) * c, "Soustraire un nombre, c'est ajouter son opposé : vérifie le calcul dans la parenthèse."]]; }
      if (t === 2) { tex = `${rel(a)} - ${relP(b)} ${X4} ${relP(c)}`; v = a - b * c; etapes = `${rel(a)} - ${relP(b * c)}`; faux = [[(a - b) * c, PRIO], [a + b * c, SG]]; }
      if (t === 3) { const k = b * d; tex = `${relP(k)} \\div ${relP(b)} - ${relP(c)}`; v = d - c; etapes = `${rel(d)} - ${relP(c)}`; faux = [[-d - c, `$${relP(k)} \\div ${relP(b)}$ : même signe, le quotient est positif.`], [d + c, "Soustraire un nombre négatif, c'est ajouter son opposé."]]; }
      if (t === 4) { tex = `${relP(b)} ${X4} ${relP(c)} ${X4} ${relP(-d)}`; v = -b * c * d; etapes = `${relP(b * c)} ${X4} ${relP(-d)}`; faux = [[b * c * d, "Compte les facteurs négatifs pour trouver le signe."], [b * c - d, "Il n'y a que des multiplications : on multiplie les trois nombres."]]; }
      if (t === 5) { tex = `${relP(b)}^2 - ${d} ${X4} ${relP(c)}`; v = b * b - d * c; etapes = `${b * b} - ${relP(d * c)}`; faux = [[-(b * b) - d * c, b < 0 ? `$${relP(b)}^2 = ${relP(b)} ${X4} ${relP(b)}$ est positif.` : "Un carré est toujours positif."], [(b * b - d) * c, PRIO]]; }
      if (t === 6) { // score d'un jeu
        const g = rand(2, 5), p = rand(1, 4), nb1 = rand(3, 12), nb2 = rand(2, 10), nom = pick(PRENOMS4); v = nb1 * g - nb2 * p;
        tex = `${nb1} ${X4} ${g} + ${nb2} ${X4} (-${p})`; etapes = `${nb1 * g} + (-${nb2 * p})`;
        enonce = `Au quiz de la fête de l'école à ${pick(LIEUX4)}, une bonne réponse rapporte $${g}$ points et une mauvaise réponse en fait perdre $${p}$. ${nom} a $${nb1}$ bonnes réponses et $${nb2}$ mauvaises. Quel est son score ?`;
        faux = [[nb1 * g + nb2 * p, "Les mauvaises réponses font **perdre** des points : elles comptent négativement."], [(nb1 + nb2) * (g - p), "Calcule séparément les points gagnés et les points perdus."]];
      }
      faux = faux.filter(([x]) => x !== v);
      return { enonce: enonce || `Calcule : $${tex}$`, mode: "nombre", prefixe: t === 6 ? "Score :" : "Résultat :", suffixe: t === 6 ? "points" : undefined, attendu: v,
        erreurs: faux.map(([x, m]) => ({ valeur: x, message: m })),
        aides: [t === 6 ? `Le score est $${tex}$.` : "Mêmes priorités qu'avec les nombres positifs : parenthèses, puissances, multiplications et divisions, puis additions et soustractions.", "À chaque multiplication ou division, applique la règle des signes.", `Première étape : $${tex} = ${etapes}$.`],
        solution: `$${tex} = ${etapes} = ${rel(v)}$${t === 6 ? ` : le score est de $${rel(v)}$ points` : ""}.` };
    }
  };

  /* =====================================================================
     Chapitre 3 : théorème de Pythagore (py4-)
     ===================================================================== */
  const NOMS3_4 = [["A", "B", "C"], ["E", "F", "G"], ["M", "N", "P"], ["R", "S", "T"], ["I", "J", "K"], ["D", "E", "F"]];
  /* Triangle rectangle en R, à l'échelle (rapport des côtés de l'angle droit ramené entre 1/2,8 et 2,8) :
     [R P1] horizontal de longueur a, [R P2] vertical de longueur b ; labs : [texte sur RP1, sur RP2, sur l'hypoténuse] ;
     ang (facultatif) : arc de l'angle en P1 et son texte. */
  function figureRectangle4(noms, labs, a, b, ang, angP2) {
    a = a || 4; b = b || 3;
    let A = a, B = b; if (A / B > 2.8) B = A / 2.8; if (B / A > 2.8) A = B / 2.8;
    const k = Math.min(220 / A, 140 / B), [R, P1, P2] = noms, x0 = 66, y0 = 168, pR = [x0, y0], p1 = [x0 + A * k, y0], p2 = [x0, y0 - B * k];
    let s = geo({ W: 320, H: 196, pts: { [R]: pR, [P1]: p1, [P2]: p2 }, segs: [[R, P1], [P1, P2], [P2, R]], droitAngle: [[P1, R, P2]], decal: { [R]: [-14, 8], [P1]: [6, 8], [P2]: [-14, 0] }, aria: `Triangle ${noms.join("")} rectangle en ${R}${ang != null ? `, angle marqué en ${angP2 ? P2 : P1}` : ""}` });
    const L = Math.hypot(A * k, B * k), nx = (B * k) / L, ny = (A * k) / L; // normale à l'hypoténuse, vers l'extérieur
    let t = T4((pR[0] + p1[0]) / 2, y0 + 20, labs[0], "g-mesure") + T4(x0 - 8, (pR[1] + p2[1]) / 2 + 4, labs[1], "g-mesure", "end") + T4((p1[0] + p2[0]) / 2 + nx * 14, (p1[1] + p2[1]) / 2 - ny * 14 + 4, labs[2], "g-mesure", "start");
    if (ang != null && !angP2) { const r = 26, t1 = Math.PI, t2 = Math.PI + Math.atan2(B * k, A * k), q1 = [p1[0] + r * Math.cos(t1), p1[1] - r * Math.sin(t1)], q2 = [p1[0] + r * Math.cos(t2), p1[1] + r * Math.sin(t2)], tm = (t1 + t2) / 2;
      t += `<path class="g-arc" d="M${f1(q1[0])} ${f1(q1[1])} A${r} ${r} 0 0 1 ${f1(q2[0])} ${f1(q2[1])}"/>` + (ang ? T4(p1[0] + 44 * Math.cos(tm), p1[1] + 44 * Math.sin(tm) + 4, ang, "g-mesure") : ""); }
    if (ang != null && angP2) { const r = 22, t1 = Math.PI / 2, t2 = Math.atan2(B * k, A * k), q1 = [p2[0] + r * Math.cos(t1), p2[1] + r * Math.sin(t1)], q2 = [p2[0] + r * Math.cos(t2), p2[1] + r * Math.sin(t2)], tm = (t1 + t2) / 2;
      t += `<path class="g-arc" d="M${f1(q1[0])} ${f1(q1[1])} A${r} ${r} 0 0 0 ${f1(q2[0])} ${f1(q2[1])}"/>` + (ang ? T4(p2[0] + 40 * Math.cos(tm) + 4, p2[1] + 40 * Math.sin(tm) + 4, ang, "g-mesure", "start") : ""); }
    return s.replace("</svg>", t + "</svg>");
  }
  // Triangle à l'échelle à partir de ses trois côtés : noms [X, Y, Z], côtés XY (base), XZ, YZ ; labs dans le même ordre
  function triangle3c(noms, XY, XZ, YZ, labs) {
    const zx = (XZ * XZ - YZ * YZ + XY * XY) / (2 * XY), zy = Math.sqrt(Math.max(0, XZ * XZ - zx * zx)), minx = Math.min(0, zx), maxx = Math.max(XY, zx), k = Math.min(230 / (maxx - minx), 130 / zy);
    const X = [160 - ((maxx - minx) * k) / 2 - minx * k, 162], Y = [X[0] + XY * k, 162], Z = [X[0] + zx * k, 162 - zy * k], G = [(X[0] + Y[0] + Z[0]) / 3, (X[1] + Y[1] + Z[1]) / 3];
    const [nX, nY, nZ] = noms, s = geo({ W: 320, H: 190, pts: { [nX]: X, [nY]: Y, [nZ]: Z }, segs: [[nX, nY], [nX, nZ], [nY, nZ]], decal: { [nX]: [-14, 8], [nY]: [6, 8], [nZ]: [-4, -8] }, aria: `Triangle ${noms.join("")} de côtés ${labs.join(", ")}, dessiné à l'échelle` });
    const lb = (p, q, t) => { const m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2], dx = m[0] - G[0], dy = m[1] - G[1], d = Math.hypot(dx, dy) || 1; return T4(m[0] + (dx / d) * 16, m[1] + (dy / d) * 16 + 4, t, "g-mesure", Math.abs(dx / d) < 0.4 ? "middle" : dx > 0 ? "start" : "end"); };
    return s.replace("</svg>", lb(X, Y, labs[0]) + lb(X, Z, labs[1]) + lb(Y, Z, labs[2]) + "</svg>");
  }
  // Situation concrète : triangle rectangle (côté vertical h, côté horizontal d), avec un décor (mur, mât, cerf-volant, rampe)
  function scene4(h, d, labs, deco, angTxt) {
    const k = Math.min(200 / d, 130 / h, 60), W = 320, x0 = deco === "mur" ? 90 : 70, y0 = 160, H = [x0, y0 - h * k], P = [x0 + d * k, y0];
    let s = L4(18, y0, 302, y0, "g-droite");
    if (deco === "mur") { s += R4(x0 - 14, y0 - h * k - 22, 14, h * k + 22, "g-poly"); }
    if (deco === "mat") s += L4(x0, y0, x0, y0 - h * k - 10, "g-segment") + P4([[x0, y0 - h * k - 10], [x0 + 18, y0 - h * k - 4], [x0, y0 - h * k + 2]], "g-poly g-poly-image");
    if (deco === "kite") s += P4([[H[0], H[1] - 12], [H[0] + 9, H[1]], [H[0], H[1] + 14], [H[0] - 9, H[1]]], "g-poly g-poly-image");
    s += L4(x0, y0, H[0], H[1], deco === "kite" ? "g-guide" : "g-segment") + L4(H[0], H[1], P[0], P[1], "g-segment") + `<path class="g-code" d="M${x0 + 10} ${y0} V${y0 - 10} H${x0}"/>` + C4(H[0], H[1], 3) + C4(P[0], P[1], 3);
    const L = Math.hypot(d * k, h * k), nx = (h * k) / L, ny = (d * k) / L;
    s += T4(x0 - (deco === "mur" ? 20 : 8), y0 - (h * k) / 2 + 4, labs[0], "g-mesure", "end") + T4(x0 + (d * k) / 2, y0 + 18, labs[1], "g-mesure") + T4((H[0] + P[0]) / 2 + nx * 12, (H[1] + P[1]) / 2 - ny * 12 + 4, labs[2], "g-mesure", "start");
    if (angTxt != null) { const r = 24, t2 = Math.PI + Math.atan2(h * k, d * k), q1 = [P[0] - r, P[1]], q2 = [P[0] + r * Math.cos(t2), P[1] + r * Math.sin(t2)], tm = (Math.PI + t2) / 2; s += `<path class="g-arc" d="M${f1(q1[0])} ${f1(q1[1])} A${r} ${r} 0 0 1 ${f1(q2[0])} ${f1(q2[1])}"/>` + (angTxt ? T4(P[0] + 40 * Math.cos(tm), P[1] + 40 * Math.sin(tm) + 4, angTxt, "g-mesure") : ""); }
    return svg4(W, 186, `Schéma : triangle rectangle, côté vertical ${labs[0]}, côté horizontal ${labs[1]}, côté oblique ${labs[2]}`, s);
  }
  // Carré d'aire donnée, côté inconnu
  const carreAire4 = (aire, cote) => svg4(320, 150, `Carré d'aire ${aire}, son côté mesure ${cote}`, R4(110, 14, 110, 110, "g-poly") + T4(165, 74, aire, "g-label") + T4(165, 142, cote, "g-mesure") + T4(102, 73, cote, "g-mesure", "end"));
  // Les trois carrés de Pythagore sur un triangle 3-4-5 (aires 9, 16, 25)
  function carresPythagore4() {
    const R = [110, 160], B = [190, 160], C = [110, 100], n = [60, -80];
    const s = P4([R, B, [190, 240], [110, 240]], "g-poly") + P4([R, C, [50, 100], [50, 160]], "g-poly") + P4([B, C, [C[0] + n[0], C[1] + n[1]], [B[0] + n[0], B[1] + n[1]]], "g-poly g-poly-image") + P4([R, B, C], "g-rect")
      + `<path class="g-code" d="M120 160 V150 H110"/>` + T4(150, 205, "AB² = 16", "g-label") + T4(80, 134, "AC² = 9", "g-label") + T4(200, 96, "BC² = 25", "g-label")
      + T4(R[0] - 6, R[1] + 14, "A", "g-plabel", "end") + T4(B[0] + 8, B[1] + 14, "B", "g-plabel", "start") + T4(C[0] + 4, C[1] + 14, "C", "g-plabel", "start");
    return svg4(320, 250, "Triangle ABC rectangle en A avec un carré sur chaque côté : aires 16 et 9 sur les côtés de l'angle droit, 25 sur l'hypoténuse", s);
  }
  const TRIPLES = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20], [20, 21, 29], [9, 40, 41], [15, 20, 25], [10, 24, 26], [12, 35, 37], [1.5, 2, 2.5], [2.4, 3.2, 4], [0.9, 1.2, 1.5], [4.5, 6, 7.5]];
  const lab = (x) => nbTexte(x) + " cm";
  FIGURES["py4-triangle"] = () => figureRectangle4(["A", "B", "C"], ["4 cm", "3 cm", "?"], 4, 3);
  FIGURES["py4-cours-carres"] = () => carresPythagore4();
  FIGURES["py4-cours-carre"] = () => carreAire4("49 cm²", "?");
  FIGURES["py4-cours-cote"] = () => figureRectangle4(["E", "F", "G"], ["5 cm", "?", "9 cm"], 5, Math.sqrt(56));
  FIGURES["py4-cours-reciproque"] = () => triangle3c(["N", "P", "M"], 17, 8, 15, ["17", "8", "15"]);
  FIGURES["py4-qcm-echelle"] = () => scene4(2.4, 0.7, ["?", "0,7 m", "2,5 m"], "mur");
  FIGURES["py4-qcm-triangle"] = () => triangle3c(["R", "S", "T"], 11, 7, 8, ["11 cm", "7 cm", "8 cm"]);
  FIGURES["py4-meth-reciproque"] = () => triangle3c(["A", "B", "C"], 10, 6, 8, ["10 (le plus grand)", "6", "8"]);
  FIGURES["py4-meth-hyp"] = () => figureRectangle4(["A", "B", "C"], ["", "", "hypoténuse"], 4, 3);
  FIGURES["py4-meth-echelle"] = () => scene4(4, 1.5, ["4 m", "1,5 m", "L"], "mur");

  GEN["py4-hypotenuse"] = function () {
    const N = pick(NOMS3_4), [R, P1, P2] = N, exact = Math.random() < 0.5;
    let a, b, c, v;
    if (exact) { [a, b, c] = pick(TRIPLES); if (Math.random() < 0.5) [a, b] = [b, a]; v = c; } else { a = rand(2, 15); b = rand(2, 15); c = Math.sqrt(a * a + b * b); v = arr(c, 1); if (Number.isInteger(c)) return GEN["py4-hypotenuse"](); }
    return { enonce: `Le triangle $${R}${P1}${P2}$ est rectangle en $${R}$ avec $${R}${P1} = ${nb(a)}$ cm et $${R}${P2} = ${nb(b)}$ cm. Calcule $${P1}${P2}$${exact ? "" : ", arrondi au dixième"}.`, figure: figureRectangle4(N, [lab(a), lab(b), "?"], a, b), mode: "nombre", prefixe: `$${P1}${P2} ${exact ? "=" : "\\approx"}$`, suffixe: "cm", attendu: v,
      erreurs: [{ valeur: arr(a + b, 4), message: "On n'additionne pas les longueurs : on additionne leurs **carrés**." }, { valeur: arr(a * a + b * b, 4), message: `Ça, c'est $${P1}${P2}^2$. Il faut encore prendre la racine carrée.` }],
      aides: [`$[${P1}${P2}]$ est l'hypoténuse (le côté opposé à l'angle droit).`, `Théorème de Pythagore : $${P1}${P2}^2 = ${R}${P1}^2 + ${R}${P2}^2$.`, `$${P1}${P2}^2 = ${nb(a)}^2 + ${nb(b)}^2 = ${nb(arr(a * a + b * b, 4))}$.`],
      solution: `Le triangle est rectangle en $${R}$, donc d'après le théorème de Pythagore : $${P1}${P2}^2 = ${nb(a)}^2 + ${nb(b)}^2 = ${nb(arr(a * a, 4))} + ${nb(arr(b * b, 4))} = ${nb(arr(a * a + b * b, 4))}$. Donc $${P1}${P2} = \\sqrt{${nb(arr(a * a + b * b, 4))}} ${exact ? "=" : "\\approx"} ${nb(v)}$ cm.` };
  };

  GEN["py4-cote"] = function () {
    const N = pick(NOMS3_4), [R, P1, P2] = N, exact = Math.random() < 0.5;
    let a, b, c, v;
    if (exact) { [a, b, c] = pick(TRIPLES); if (Math.random() < 0.5) [a, b] = [b, a]; v = b; } else { a = rand(2, 12); c = a + rand(1, 10); b = Math.sqrt(c * c - a * a); v = arr(b, 1); if (Number.isInteger(b)) return GEN["py4-cote"](); }
    return { enonce: `Le triangle $${R}${P1}${P2}$ est rectangle en $${R}$ avec $${R}${P1} = ${nb(a)}$ cm et $${P1}${P2} = ${nb(c)}$ cm. Calcule $${R}${P2}$${exact ? "" : ", arrondi au dixième"}.`, figure: figureRectangle4(N, [lab(a), "?", lab(c)], a, b), mode: "nombre", prefixe: `$${R}${P2} ${exact ? "=" : "\\approx"}$`, suffixe: "cm", attendu: v,
      erreurs: [{ valeur: arr(Math.sqrt(a * a + c * c), 1), message: `$[${P1}${P2}]$ est l'hypoténuse : il faut **soustraire** $${R}${P1}^2$ de $${P1}${P2}^2$.` }, { valeur: arr(c * c - a * a, 4), message: `Ça, c'est $${R}${P2}^2$. Prends la racine carrée.` }],
      aides: [`L'hypoténuse est $[${P1}${P2}]$ : $${P1}${P2}^2 = ${R}${P1}^2 + ${R}${P2}^2$.`, `Donc $${R}${P2}^2 = ${P1}${P2}^2 - ${R}${P1}^2$.`, `$${R}${P2}^2 = ${nb(c)}^2 - ${nb(a)}^2 = ${nb(arr(c * c - a * a, 4))}$.`],
      solution: `D'après le théorème de Pythagore, $${P1}${P2}^2 = ${R}${P1}^2 + ${R}${P2}^2$, donc $${R}${P2}^2 = ${nb(c)}^2 - ${nb(a)}^2 = ${nb(arr(c * c, 4))} - ${nb(arr(a * a, 4))} = ${nb(arr(c * c - a * a, 4))}$ et $${R}${P2} = \\sqrt{${nb(arr(c * c - a * a, 4))}} ${exact ? "=" : "\\approx"} ${nb(v)}$ cm.` };
  };

  GEN["py4-reciproque"] = function () {
    const N = pick(NOMS3_4), droit = Math.random() < 0.55;
    let [a, b, c] = pick(TRIPLES); if (Math.random() < 0.5) [a, b] = [b, a];
    if (!droit) { const e = c > 5 ? 1 : 0.1; c = arr(c + (c - e > Math.max(a, b) && Math.random() < 0.5 ? -e : e), 4); }
    // côtés : [R P1] = a, [R P2] = b, [P1 P2] = c, présentés dans le désordre
    const [R, P1, P2] = shuffle(N.slice()), cotes = shuffle([[`${R}${P1}`, a], [`${R}${P2}`, b], [`${P1}${P2}`, c]]);
    const choix = [`Oui, il est rectangle en $${R}$`, "Non, il n'est pas rectangle", `Oui, il est rectangle en $${P1}$`, `Oui, il est rectangle en $${P2}$`];
    const fig = Math.random() < 0.7 ? triangle3c([P1, P2, R], c, b, a, [lab(c), lab(b), lab(a)]) : undefined;
    return { enonce: `Le triangle $${N.join("")}$ a pour côtés ${cotes.map(([n, v]) => `$${n} = ${nb(v)}$ cm`).join(", ")}.${fig ? " La figure est à l'échelle, mais on ne peut pas conclure à l'œil." : ""} Est-il rectangle ?`, figure: fig, mode: "choix", choix, attendu: droit ? 0 : 1,
      aides: ["Repère le plus grand côté.", "Compare le carré du plus grand côté avec la somme des carrés des deux autres.", "Égalité : rectangle (l'angle droit est en face du plus grand côté). Sinon : pas rectangle."],
      solution: `Le plus grand côté est $[${P1}${P2}]$ : $${P1}${P2}^2 = ${nb(arr(c * c, 4))}$ et $${R}${P1}^2 + ${R}${P2}^2 = ${nb(arr(a * a, 4))} + ${nb(arr(b * b, 4))} = ${nb(arr(a * a + b * b, 4))}$. ${droit ? `Les deux résultats sont égaux : d'après la réciproque du théorème de Pythagore, le triangle est rectangle en $${R}$ (le sommet opposé au plus grand côté).` : "Les résultats sont différents : le triangle n'est pas rectangle (s'il l'était, l'égalité de Pythagore serait vraie)."}` };
  };

  GEN["py4-racine"] = function () {
    const t = rand(0, 5);
    if (t === 0) { const a = rand(1, 20); return { enonce: `Calcule $\\sqrt{${a * a}}$.`, mode: "nombre", prefixe: "Résultat :", attendu: a,
      erreurs: [{ valeur: (a * a) / 2, message: `La racine carrée n'est pas la moitié : c'est le nombre positif dont le carré vaut $${a * a}$.` }, { valeur: -a, message: "Une racine carrée est toujours un nombre **positif** (ou nul)." }],
      aides: ["$\\sqrt{a}$ est le nombre positif dont le carré est $a$.", "Cherche un nombre qui, multiplié par lui-même, donne ce résultat.", a > 1 ? `$${a - 1}^2 = ${(a - 1) ** 2}$.` : "$1 \\times 1 = 1$."], solution: `$${a}^2 = ${a * a}$, donc $\\sqrt{${a * a}} = ${a}$.` }; }
    if (t === 1) { const n = rand(2, 300); if (Number.isInteger(Math.sqrt(n))) return GEN["py4-racine"]();
      const v = arr(Math.sqrt(n), 1), tr = Math.floor(Math.sqrt(n) * 10) / 10;
      return { enonce: `Donne la valeur de $\\sqrt{${n}}$ arrondie au dixième.`, mode: "nombre", prefixe: "Valeur :", attendu: v,
        erreurs: [...(tr !== v ? [{ valeur: tr, message: "Tu as tronqué : pour arrondir au dixième, regarde le chiffre des centièmes (s'il vaut $5$ ou plus, on arrondit au-dessus)." }] : []), { valeur: n / 2, message: "La racine carrée n'est pas la moitié du nombre." }],
        aides: ["Utilise la touche $\\sqrt{\\;}$ de la calculatrice.", `$\\sqrt{${n}} \\approx ${nb(arr(Math.sqrt(n), 4))}$.`, "Arrondis au dixième : regarde le chiffre des centièmes."], solution: `$\\sqrt{${n}} \\approx ${nb(arr(Math.sqrt(n), 4))}$, donc environ $${nb(v)}$ au dixième.` }; }
    if (t === 2) { const c = rand(2, 20), A = c * c, u = pick(["cm", "m"]), ctx = u === "m" ? pick([`Le jardin carré de ${pick(PRENOMS4)} à ${pick(LIEUX4)}`, "Un terrain de jeu carré", "Le sol carré d'une case"]) : pick(["Un carré", "Un carreau carré", "Une étiquette carrée"]);
      return { enonce: `${ctx} a une aire de $${A}$ ${u}². Quelle est la longueur de son côté ?`, figure: carreAire4(`${A} ${u}²`, "?"), mode: "nombre", prefixe: "Côté :", suffixe: u, attendu: c,
        erreurs: [{ valeur: A / 4, message: "L'aire d'un carré est $c \\times c$, et non $4 \\times c$ (ça, c'est le périmètre)." }, { valeur: A / 2, message: "La racine carrée n'est pas la moitié : cherche le nombre qui, multiplié par lui-même, donne l'aire." }],
        aides: ["Aire $= c \\times c = c^2$.", `$c^2 = ${A}$.`, `$c = \\sqrt{${A}}$.`], solution: `$c^2 = ${A}$ donc $c = \\sqrt{${A}} = ${c}$ ${u}.` }; }
    if (t === 3) { // encadrer une racine carrée par deux entiers consécutifs
      let n; do n = rand(5, 400); while (Number.isInteger(Math.sqrt(n)));
      const k = Math.floor(Math.sqrt(n)), tx = (p, q) => `entre $${p}$ et $${q}$`;
      const { choix, attendu } = melange(tx(k, k + 1), [tx(k - 1, k), tx(k + 1, k + 2), tx(Math.floor(n / 2), Math.floor(n / 2) + 1)].filter((x) => x !== tx(k, k + 1)));
      return { enonce: `Sans calculatrice : entre quels entiers consécutifs se trouve $\\sqrt{${n}}$ ?`, mode: "choix", choix, attendu,
        aides: ["Cherche les carrés parfaits qui encadrent le nombre.", `$${k}^2 = ${k * k}$ et $${k + 1}^2 = ${(k + 1) ** 2}$.`, `$${k * k} < ${n} < ${(k + 1) ** 2}$.`], solution: `$${k * k} < ${n} < ${(k + 1) ** 2}$, donc $${k} < \\sqrt{${n}} < ${k + 1}$.` };
    }
    if (t === 4) { // équation x² = a
      const cas = rand(0, 2), s = rand(2, 15), a = cas === 0 ? s * s : cas === 1 ? -rand(1, 50) : (() => { let m; do m = rand(2, 99); while (Number.isInteger(Math.sqrt(m))); return m; })();
      const bonne = cas === 0 ? `$${s}$ et $-${s}$` : cas === 1 ? "Il n'y a pas de solution" : `$\\sqrt{${a}}$ et $-\\sqrt{${a}}$`;
      const faux = cas === 0 ? [`$${s}$ seulement`, `$${nb(a / 2)}$ et $-${nb(a / 2)}$`, "Il n'y a pas de solution"] : cas === 1 ? [`$\\sqrt{${-a}}$ et $-\\sqrt{${-a}}$`, `$-\\sqrt{${-a}}$ seulement`, `$${nb(a / 2)}$`] : [`$\\sqrt{${a}}$ seulement`, `$${nb(a / 2)}$ et $-${nb(a / 2)}$`, "Il n'y a pas de solution"];
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `Quelles sont les solutions de l'équation $x^2 = ${rel(a)}$ ?`, mode: "choix", choix, attendu,
        aides: ["Un carré est toujours positif ou nul.", "Si $a > 0$, l'équation $x^2 = a$ a deux solutions : $\\sqrt{a}$ et $-\\sqrt{a}$.", "Si $a < 0$, elle n'a pas de solution."],
        solution: cas === 1 ? `Un carré est toujours positif ou nul : $x^2 = ${rel(a)}$ n'a pas de solution.` : cas === 0 ? `$${s}^2 = ${a}$ et $(-${s})^2 = ${a}$ : les solutions sont $${s}$ et $-${s}$.` : `$${a} > 0$ : les solutions sont $\\sqrt{${a}}$ et $-\\sqrt{${a}}$ (environ $${nb(arr(Math.sqrt(a), 2))}$ et $-${nb(arr(Math.sqrt(a), 2))}$).` };
    }
    // t === 5 : racine d'une somme
    let [p, q, r] = pick(TRIPLES.filter((x) => Number.isInteger(x[0]) && x[2] <= 30)); if (Math.random() < 0.5) [p, q] = [q, p];
    const k = r <= 15 ? rand(1, 3) : 1, P = p * k, Q = q * k, P2 = nb(P * P), Q2 = nb(Q * Q), S2 = nb(P * P + Q * Q), pw = Math.random() < 0.5;
    return { enonce: `Calcule $\\sqrt{${pw ? `${P}^2 + ${Q}^2` : `${P2} + ${Q2}`}}$.`, mode: "nombre", prefixe: "Résultat :", attendu: r * k,
      erreurs: [{ valeur: P + Q, message: `$\\sqrt{${P2}} + \\sqrt{${Q2}} = ${P + Q}$, mais la racine d'une somme n'est pas la somme des racines : calcule d'abord la somme.` }, { valeur: P * P + Q * Q, message: "Ça, c'est la somme : il faut encore prendre sa racine carrée." }],
      aides: ["Calcule d'abord ce qu'il y a sous la racine.", `$${P2} + ${Q2} = ${S2}$.`, `Cherche le nombre dont le carré vaut $${S2}$.`], solution: `$\\sqrt{${P2} + ${Q2}} = \\sqrt{${S2}} = ${r * k}$ car $${r * k}^2 = ${S2}$. Attention : $\\sqrt{${P2}} + \\sqrt{${Q2}} = ${P + Q}$, ce n'est pas le même résultat.` };
  };

  GEN["py4-problemes"] = function () {
    const t = rand(0, 5), nom = pick(PRENOMS4);
    const er = (somme, carre, texte) => [{ valeur: arr(somme, 2), message: "On n'additionne (ou on ne soustrait) pas les longueurs : on calcule avec leurs **carrés**." }, { valeur: arr(carre, 2), message: `Ça, c'est $${texte}^2$ : il faut encore prendre la racine carrée.` }];
    if (t === 0) { // échelle contre un mur : hypoténuse
      const h = rand(25, 60) / 10, d = rand(6, 20) / 10, L = Math.sqrt(h * h + d * d), v = arr(L, 2);
      const ctx = pick([`Pour cueillir des mangues, ${nom} pose une échelle contre le mur de sa maison.`, `Pour repeindre la façade d'une case à ${pick(LIEUX4)}, ${nom} pose une échelle contre le mur.`, `Pour réparer le toit d'un banga, ${nom} pose une échelle contre un mur vertical.`]);
      return { enonce: `${ctx} Le pied de l'échelle est à $${nb(d)}$ m du mur et le haut touche le mur à $${nb(h)}$ m de hauteur. Quelle est la longueur de l'échelle, arrondie au centième de mètre ?`, figure: scene4(h, d, [`${nbTexte(h)} m`, `${nbTexte(d)} m`, "?"], "mur"), mode: "nombre", prefixe: "Longueur :", suffixe: "m", attendu: v,
        erreurs: er(h + d, h * h + d * d, "L"),
        aides: ["Le mur et le sol forment un angle droit : l'échelle est l'hypoténuse.", `$L^2 = ${nb(h)}^2 + ${nb(d)}^2$.`, `$L^2 = ${nb(arr(h * h + d * d, 4))}$.`], solution: `Le triangle est rectangle (mur vertical, sol horizontal) : $L^2 = ${nb(h)}^2 + ${nb(d)}^2 = ${nb(arr(h * h + d * d, 4))}$, donc $L = \\sqrt{${nb(arr(h * h + d * d, 4))}} \\approx ${nb(v)}$ m.` }; }
    if (t === 1) { // diagonale d'un rectangle
      const L = rand(8, 60), l = rand(4, L - 2), D = Math.sqrt(L * L + l * l), v = arr(D, 1);
      if (Number.isInteger(D)) return GEN["py4-problemes"]();
      const ctx = pick([`Le terrain de football à cinq de ${pick(["Combani", "Koungou", "Sada", "Pamandzi"])} est un rectangle de $${L}$ m sur $${l}$ m.`, `Le champ de manioc ${de4(nom)} est un rectangle de $${L}$ m sur $${l}$ m.`, `Une parcelle de vanille de Bandrélé est un rectangle de $${L}$ m sur $${l}$ m.`]);
      return { enonce: `${ctx} Quelle est la longueur de sa diagonale, arrondie au dixième de mètre ?`, figure: svg4(320, 170, `Rectangle de ${L} m sur ${l} m et sa diagonale`, (() => { const k = Math.min(230 / L, 120 / l), w = L * k, hh = l * k, x0 = 50, y0 = 18; return R4(x0, y0, w, hh, "g-rect") + L4(x0, y0 + hh, x0 + w, y0, "g-segment") + T4(x0 + w / 2, y0 + hh + 18, `${L} m`, "g-mesure") + T4(x0 - 6, y0 + hh / 2 + 4, `${l} m`, "g-mesure", "end") + T4(x0 + w / 2 + 8, y0 + hh / 2 - 6, "?", "g-hlabel", "start"); })()), mode: "nombre", prefixe: "Diagonale :", suffixe: "m", attendu: v,
        erreurs: er(L + l, L * L + l * l, "D"),
        aides: ["La diagonale partage le rectangle en deux triangles rectangles : elle en est l'hypoténuse.", `$D^2 = ${L}^2 + ${l}^2$.`, `$D^2 = ${nb(L * L + l * l)}$.`], solution: `$D^2 = ${L}^2 + ${l}^2 = ${nb(L * L)} + ${nb(l * l)} = ${nb(L * L + l * l)}$, donc $D = \\sqrt{${nb(L * L + l * l)}} \\approx ${nb(v)}$ m.` }; }
    if (t === 2 || t === 3) { // vérifier un angle droit (réciproque)
      const [a, b, c] = pick(TRIPLES.filter((x) => Number.isInteger(x[0]) && x[2] <= 30)), k = pick([5, 10, 20]), A = a * k, B = b * k, C = c * k, im = rand(0, 2), metier = ["Un maçon de Dembéni", "Un menuisier de Mamoudzou", `${nom}, qui construit un poulailler,`][im], Pr = im === 2 && il4(nom) === "elle" ? "Elle" : "Il";
      if (t === 2) return { enonce: `${metier} veut tracer un angle droit. ${Pr} mesure $${A}$ cm sur un côté et $${B}$ cm sur l'autre. Quelle doit être la distance entre les deux marques pour que l'angle soit droit ?`, figure: scene4(B, A, [`${B} cm`, `${A} cm`, "?"], ""), mode: "nombre", prefixe: "Distance :", suffixe: "cm", attendu: C,
        erreurs: er(A + B, A * A + B * B, "d"),
        aides: ["Si l'angle est droit, la distance $d$ entre les marques est l'hypoténuse d'un triangle rectangle.", `$d^2 = ${A}^2 + ${B}^2$.`, `$d^2 = ${nb(A * A + B * B)}$.`], solution: `$d^2 = ${A}^2 + ${B}^2 = ${nb(A * A)} + ${nb(B * B)} = ${nb(A * A + B * B)}$, donc $d = \\sqrt{${nb(A * A + B * B)}} = ${C}$ cm.` };
      const ok = Math.random() < 0.5, Cm = ok ? C : C + pick([-2, -1, 1, 2]) * (k / 5);
      const { choix, attendu } = melange(ok ? `Oui, car $${A}^2 + ${B}^2 = ${Cm}^2$` : `Non, car $${A}^2 + ${B}^2 \\neq ${Cm}^2$`, [ok ? `Non, car $${A}^2 + ${B}^2 \\neq ${Cm}^2$` : `Oui, car $${A}^2 + ${B}^2 = ${Cm}^2$`, `Oui, car $${A} + ${B} > ${Cm}$`, "On ne peut pas savoir sans rapporteur"]);
      return { enonce: `${metier} mesure $${A}$ cm et $${B}$ cm sur les deux côtés d'un angle, puis $${Cm}$ cm entre les deux marques. L'angle est-il droit ?`, figure: scene4(B, A, [`${B} cm`, `${A} cm`, `${Cm} cm`], ""), mode: "choix", choix, attendu,
        aides: ["Compare le carré de la plus grande longueur avec la somme des carrés des deux autres.", `$${A}^2 + ${B}^2 = ${nb(A * A + B * B)}$.`, `$${Cm}^2 = ${nb(Cm * Cm)}$.`], solution: `$${A}^2 + ${B}^2 = ${nb(A * A)} + ${nb(B * B)} = ${nb(A * A + B * B)}$ et $${Cm}^2 = ${nb(Cm * Cm)}$. ${ok ? "Les deux résultats sont égaux : d'après la réciproque du théorème de Pythagore, l'angle est droit." : "Les résultats sont différents : l'angle n'est pas droit."} (Le dessin n'est qu'un schéma.)` };
    }
    if (t === 4) { // cerf-volant : côté de l'angle droit
      const L = rand(20, 60), d = rand(8, L - 6), h = Math.sqrt(L * L - d * d), v = arr(h, 1);
      return { enonce: `Sur la plage de ${pick(["Moya", "N'Gouja", "Sakouli", "Mtsanga Gouéla"])}, ${nom} fait voler un cerf-volant. La ficelle tendue mesure $${L}$ m et le cerf-volant est à la verticale d'un point situé à $${d}$ m ${de4(nom)}. À quelle hauteur vole le cerf-volant (en négligeant la taille ${de4(nom)}), arrondie au dixième de mètre ?`, figure: scene4(h, d, ["?", `${d} m`, `${L} m`], "kite"), mode: "nombre", prefixe: "Hauteur :", suffixe: "m", attendu: v,
        erreurs: [{ valeur: arr(Math.sqrt(L * L + d * d), 1), message: "La ficelle est l'hypoténuse : il faut **soustraire** les carrés." }, { valeur: arr(L * L - d * d, 2), message: "Ça, c'est $h^2$ : prends la racine carrée." }],
        aides: ["La ficelle est l'hypoténuse du triangle rectangle.", `$h^2 = ${L}^2 - ${d}^2$.`, `$h^2 = ${nb(L * L - d * d)}$.`], solution: `$${L}^2 = h^2 + ${d}^2$, donc $h^2 = ${nb(L * L)} - ${nb(d * d)} = ${nb(L * L - d * d)}$ et $h = \\sqrt{${nb(L * L - d * d)}} \\approx ${nb(v)}$ m.` };
    }
    // t === 5 : câble qui maintient un mât ou un poteau
    const h = rand(4, 15), d = rand(2, 9), L = Math.sqrt(h * h + d * d), v = arr(L, 1);
    if (Number.isInteger(L)) return GEN["py4-problemes"]();
    const ctx = pick([`Un poteau électrique vertical de $${h}$ m est maintenu par un câble tendu fixé en haut du poteau et au sol à $${d}$ m de son pied.`, `Le mât vertical d'une pirogue à voile mesure $${h}$ m. Un cordage tendu relie son sommet à un point de la coque situé à $${d}$ m du pied du mât, à la même hauteur que lui.`, `Une antenne verticale de $${h}$ m à ${pick(LIEUX4)} est tenue par un câble tendu attaché à son sommet et au sol, à $${d}$ m de son pied.`]);
    return { enonce: `${ctx} Quelle est la longueur du câble, arrondie au dixième de mètre ?`, figure: scene4(h, d, [`${h} m`, `${d} m`, "?"], "mat"), mode: "nombre", prefixe: "Longueur :", suffixe: "m", attendu: v,
      erreurs: er(h + d, h * h + d * d, "L"),
      aides: ["Le poteau est vertical et le sol horizontal : le triangle est rectangle, le câble est l'hypoténuse.", `$L^2 = ${h}^2 + ${d}^2$.`, `$L^2 = ${h * h + d * d}$.`], solution: `$L^2 = ${h}^2 + ${d}^2 = ${h * h} + ${d * d} = ${h * h + d * d}$, donc $L = \\sqrt{${h * h + d * d}} \\approx ${nb(v)}$ m.` };
  };

  /* =====================================================================
     Chapitre 4 : calculer avec des fractions (fq4-)
     ===================================================================== */
  // fraction signée en KaTeX : -\dfrac{a}{b} si négative ; entier si dénominateur 1
  const frS = (n, d) => { if (d < 0) { n = -n; d = -d; } const g = pgcd(Math.abs(n), d); n /= g; d /= g; return d === 1 ? rel(n) : `${n < 0 ? "-" : ""}${fr(Math.abs(n), d)}`; };
  const frP = (n, d) => (n < 0 ? `\\left(${frS(n, d)}\\right)` : frS(n, d));
  const frBrut = (n, d) => `${n < 0 ? "-" : ""}${fr(Math.abs(n), d)}`;
  const frPB = (n, d) => (n < 0 ? `\\left(${frBrut(n, d)}\\right)` : frBrut(n, d)); // comme frP, sans simplifier
  const tireFr = (neg) => { for (;;) { const d = rand(2, 9), n = rand(1, 2 * d) * (neg && Math.random() < 0.5 ? -1 : 1); if (pgcd(Math.abs(n), d) === 1 && Math.abs(n) !== d) return [n, d]; } };

  /* Figures du chapitre 4 (fractions positives) */
  // Une bande unité par fraction [n, d], partagée en L parts (dénominateur commun) ; « egal » : écrit aussi n/d = …/L
  function bandesFr4(fracs, L, egal) {
    const x0 = 58, w = 210, h = 24, gap = 14;
    let s = "";
    fracs.forEach(([n, d], i) => {
      const y = 8 + i * (h + gap), k = (n * L) / d;
      for (let j = 0; j < L; j++) s += R4(x0 + (j * w) / L, y, w / L, h, j < k ? "g-aire" : "g-vide");
      s += `<g class="g-grid">${Array.from({ length: L - 1 }, (_, j) => L4(x0 + ((j + 1) * w) / L, y, x0 + ((j + 1) * w) / L, y + h, "")).join("")}</g>` + R4(x0, y, w, h, "g-unite") + T4(x0 - 8, y + 17, `${n}/${d}`, "g-label", "end") + (egal ? T4(x0 + w + 6, y + 17, `= ${k}/${L}`, "g-mesure", "start") : "");
    });
    return svg4(320, 16 + fracs.length * (h + gap) - gap, `Bandes unité partagées en ${L} parts égales : ${fracs.map(([n, d]) => `${n}/${d}${egal ? ` = ${(n * L) / d}/${L}` : ""}`).join(" ; ")}`, s);
  }
  // Rectangle unité : a/b de la largeur (colonnes) et c/d de la hauteur (lignes) ; la zone commune représente le produit
  function aireProduit4(a, b, c, d, resultat) {
    const x0 = 80, y0 = 22, W = 180, H = 130;
    let s = R4(x0, y0, (W * a) / b, H, "g-aire") + R4(x0, y0 + H - (H * c) / d, W, (H * c) / d, "g-aire g-aire-neg");
    s += `<g class="g-grid">${Array.from({ length: b - 1 }, (_, j) => L4(x0 + ((j + 1) * W) / b, y0, x0 + ((j + 1) * W) / b, y0 + H, "")).join("")}${Array.from({ length: d - 1 }, (_, j) => L4(x0, y0 + ((j + 1) * H) / d, x0 + W, y0 + ((j + 1) * H) / d, "")).join("")}</g>`;
    s += R4(x0, y0, W, H, "g-unite") + T4(x0 + (W * a) / b / 2, y0 - 7, `${a}/${b}`, "g-label") + T4(x0 - 8, y0 + H - (H * c) / d / 2 + 4, `${c}/${d}`, "g-label", "end");
    if (resultat) s += T4(x0 + W + 8, y0 + H - 4, resultat, "g-mesure", "start");
    return svg4(320, y0 + H + 10, `Rectangle unité : ${a}/${b} de la largeur et ${c}/${d} de la hauteur sont colorés ; la partie colorée deux fois représente ${a}/${b} × ${c}/${d}${resultat ? " " + resultat : ""}`, s);
  }
  // Barre représentant une quantité N (accolade), partagée en b parts dont a colorées ; « ? » sur la partie colorée (ou valeur)
  function barreQ4(N, a, b, unite, lab, labReste) {
    const x0 = 30, w = 260, y0 = 30, h = 30, xa = x0 + (w * a) / b;
    let s = R4(x0, y0, (w * a) / b, h, "g-aire") + `<g class="g-grid">${Array.from({ length: b - 1 }, (_, j) => L4(x0 + ((j + 1) * w) / b, y0, x0 + ((j + 1) * w) / b, y0 + h, "")).join("")}</g>` + R4(x0, y0, w, h, "g-unite");
    s += `<path class="g-accolade" d="M${x0 + 2} ${y0 - 6} V${y0 - 12} H${x0 + w - 2} V${y0 - 6}"/>` + T4(x0 + w / 2, y0 - 16, `${N} ${unite}`, "g-label");
    s += `<path class="g-accolade" d="M${x0 + 2} ${y0 + h + 6} V${y0 + h + 12} H${f1(xa - 2)} V${y0 + h + 6}"/>` + T4((x0 + xa) / 2, y0 + h + 28, lab || "?", "g-hlabel", xa - x0 < 90 ? "start" : "middle");
    if (labReste) s += `<path class="g-accolade" d="M${f1(xa + 2)} ${y0 + h + 6} V${y0 + h + 12} H${x0 + w - 2} V${y0 + h + 6}"/>` + T4((xa + x0 + w) / 2, y0 + h + 28, labReste, "g-mesure", x0 + w - xa < 90 ? "end" : "middle");
    return svg4(320, y0 + h + 36, `Barre représentant ${N} ${unite}, partagée en ${b} parts égales dont ${a} ${a > 1 ? "sont colorées" : "est colorée"}${labReste ? ` ; la partie non colorée vaut ${labReste}` : ""}`, s);
  }
  // n unités partagées en b parts ; morceaux de a parts colorés une fois sur deux (combien de fois a/b dans n ?)
  function barreDivision4(n, a, b, seul) {
    const x0 = 20, w = 280, y0 = 24, h = 30, p = w / (n * b);
    let s = "";
    for (let j = 0; j * a < n * b && (!seul || j === 0); j++) s += R4(x0 + j * a * p, y0, Math.min(a, n * b - j * a) * p, h, j % 2 ? "g-aire g-aire-neg" : "g-aire");
    s += `<g class="g-grid">${Array.from({ length: n * b - 1 }, (_, j) => L4(x0 + (j + 1) * p, y0, x0 + (j + 1) * p, y0 + h, "")).join("")}</g>`;
    for (let u = 0; u <= n; u++) s += L4(x0 + u * b * p, y0 - 4, x0 + u * b * p, y0 + h + 4, "g-droite") + T4(x0 + u * b * p, y0 + h + 17, u, "g-mesure");
    s += T4(x0 + (a * p) / 2, y0 - 8, `${a}/${b}`, "g-label");
    return svg4(320, y0 + h + 24, `${n} unités partagées en ${b} parts ; des morceaux de ${a}/${b} sont colorés en alternance`, s);
  }
  FIGURES["fq4-cours-division"] = () => barreDivision4(6, 3, 4);
  FIGURES["fq4-cours-somme"] = () => bandesFr4([[1, 4], [1, 6]], 12, true);
  FIGURES["fq4-cours-produit"] = () => aireProduit4(2, 3, 3, 4);
  FIGURES["fq4-cours-quantite"] = () => barreQ4(60, 2, 3, "élèves", "40 élèves");
  FIGURES["fq4-qcm-produit"] = () => aireProduit4(1, 2, 2, 3);
  FIGURES["fq4-qcm-bandes"] = () => bandesFr4([[2, 3], [1, 4]], 12, false);
  FIGURES["fq4-meth-somme"] = () => bandesFr4([[1, 4], [2, 3]], 12, true);

  GEN["fq4-addsous"] = function () {
    const pos = Math.random() < 0.3, tire = () => { for (;;) { const f = tireFr(!pos); if (!pos || f[0] < f[1]) return f; } };
    const [a, b] = tire(), [c, d] = tire(), plus = pos || Math.random() < 0.5; if (b === d && Math.random() < 0.7) return GEN["fq4-addsous"]();
    const L = ppcm4(b, d), N = a * (L / b) + (plus ? 1 : -1) * c * (L / d), v = N / L, s = plus ? "+" : "-";
    const fig = a > 0 && c > 0 && a < b && c < d && L <= 24 && Math.random() < 0.6 ? { figure: bandesFr4([[a, b], [c, d]], L, false), figureSolution: bandesFr4([[a, b], [c, d]], L, true) } : {};
    return { enonce: `Calcule $${frBrut(a, b)} ${s} ${frP(c, d)}$.${fig.figure ? " Les bandes représentent les deux fractions." : ""}${CONSIGNE_FR}`, ...fig, mode: "nombre", prefixe: "Résultat :", attendu: v,
      erreurs: [{ valeur: (a + (plus ? c : -c)) / (b + d), message: "On n'additionne pas les dénominateurs : on réduit d'abord au même dénominateur." }, { valeur: (a + (plus ? c : -c)) / (b * d), message: `Le dénominateur commun est $${L}$ : il faut aussi multiplier chaque numérateur, pas seulement les dénominateurs.` }, ...(c < 0 || !plus ? [{ valeur: (a * (L / b) - (plus ? 1 : -1) * c * (L / d)) / L, message: "Attention aux signes : soustraire un nombre négatif revient à ajouter son opposé." }] : []), ...approx(v)],
      aides: ["Mets les deux fractions au même dénominateur.", `Dénominateur commun : $${L}$.`, "Calcule ensuite avec les numérateurs, en appliquant les règles des nombres relatifs."],
      solution: `$${frBrut(a, b)} ${s} ${frP(c, d)} = ${frBrut(a * (L / b), L)} ${s} ${frPB(c * (L / d), L)} = ${frBrut(N, L)}${pgcd(Math.abs(N), L) > 1 ? ` = ${frS(N, L)}` : ""}$.` };
  };

  GEN["fq4-produit"] = function () {
    const t = rand(0, 2);
    if (t === 0) { const [a, b] = tireFr(true), [c, d] = tireFr(true), v = (a * c) / (b * d);
      const fig = a > 0 && c > 0 && a < b && c < d && Math.random() < 0.6 ? { figure: aireProduit4(a, b, c, d), figureSolution: aireProduit4(a, b, c, d, `= ${a * c}/${b * d}`) } : {};
      return { enonce: `Calcule $${frBrut(a, b)} \\times ${frP(c, d)}$ et donne le résultat simplifié.${fig.figure ? " La partie colorée deux fois représente ce produit." : ""}${CONSIGNE_FR}`, ...fig, mode: "nombre", prefixe: "Résultat :", attendu: v,
        erreurs: [{ valeur: (a * d) / (b * c), message: "Pour multiplier, on multiplie numérateur par numérateur et dénominateur par dénominateur (pas en croix)." }, { valeur: -v, message: "Attention au signe : applique la règle des signes." }, ...approx(v)],
        aides: ["$\\dfrac{a}{b} \\times \\dfrac{c}{d} = \\dfrac{a \\times c}{b \\times d}$.", "On n'a pas besoin de dénominateur commun pour multiplier.", "Simplifie le résultat (tu peux simplifier avant de multiplier)."],
        solution: `$${frBrut(a, b)} \\times ${frP(c, d)} = ${frBrut(a * c, b * d)}${pgcd(Math.abs(a * c), b * d) > 1 ? ` = ${frS(a * c, b * d)}` : ""}$.` }; }
    if (t === 1) { const [a, b] = tireFr(false), k = rand(2, 12) * (Math.random() < 0.3 ? -1 : 1), v = (k * a) / b;
      return { enonce: `Calcule $${rel(k)} \\times ${fr(a, b)}$.${CONSIGNE_FR}`, mode: "nombre", prefixe: "Résultat :", attendu: v,
        erreurs: [{ valeur: (k * a) / (k * b), message: `On ne multiplie que le numérateur : $${rel(k)} = \\dfrac{${rel(k)}}{1}$.` }, { valeur: (k * b + a) / b, message: "On multiplie, on n'additionne pas : $k \\times \\dfrac{a}{b} = \\dfrac{k \\times a}{b}$." }, ...approx(v)],
        aides: [`$${rel(k)} = \\dfrac{${rel(k)}}{1}$.`, "Multiplie les numérateurs entre eux et les dénominateurs entre eux.", "Simplifie si possible."], solution: `$${rel(k)} \\times ${fr(a, b)} = ${frBrut(k * a, b)}${pgcd(Math.abs(k * a), b) > 1 ? ` = ${frS(k * a, b)}` : ""}$.` }; }
    // fraction d'une quantité, en situation
    let a, b; do [a, b] = tireFr(false); while (a >= b);
    const N = b * rand(2, 12), nom = pick(PRENOMS4), C = pick([
      [`Une classe de 4e de ${pick(LIEUX4)} compte $${N}$ élèves ; les $${fr(a, b)}$ viennent au collège en taxi-brousse.`, "Combien d'élèves viennent en taxi-brousse ?", "élèves"],
      [`${nom} a récolté $${N}$ kg de bananes ; ${il4(nom)} en vend les $${fr(a, b)}$ au marché de Mamoudzou.`, "Combien de kilogrammes vend-" + il4(nom) + " ?", "kg"],
      [`${nom} doit parcourir $${N}$ km à vélo cette semaine pour préparer le tour de Petite-Terre ; ${il4(nom)} en a déjà fait les $${fr(a, b)}$.`, "Combien de kilomètres a-t-" + il4(nom) + " déjà parcourus ?", "km"],
      [`Le lagon compte un récif de $${N}$ km de long ; les $${fr(a, b)}$ ont été observés par des plongeurs.`, "Combien de kilomètres ont été observés ?", "km"]]);
    return { enonce: `${C[0]} ${C[1]}`, figure: barreQ4(N, a, b, C[2]), mode: "nombre", prefixe: "Résultat :", suffixe: C[2], attendu: (a * N) / b,
      erreurs: [{ valeur: N / b, message: `Ça, c'est $${fr(1, b)}$ de $${N}$. Il en faut $${a}$ fois plus.` }, ...(a > 1 ? [{ valeur: (N * b) / a, message: "Tu as divisé par la fraction : prendre une fraction d'un nombre, c'est **multiplier** par cette fraction." }] : [{ valeur: N * b, message: `Prendre $${fr(1, b)}$ d'un nombre, c'est le diviser par $${b}$, pas le multiplier.` }])],
      aides: ["Prendre une fraction d'un nombre, c'est multiplier par cette fraction.", `$${fr(a, b)} \\times ${N} = \\dfrac{${a} \\times ${N}}{${b}}$.`, `$${N} \\div ${b} = ${N / b}$, puis on multiplie par $${a}$.`], solution: `$${fr(a, b)} \\times ${N} = \\dfrac{${a} \\times ${N}}{${b}} = ${(a * N) / b}$ ${C[2]}.` };
  };

  GEN["fq4-quotient"] = function () {
    const t = rand(0, 2);
    if (t === 0) { const [a, b] = tireFr(true);
      return { enonce: `Quel est l'inverse de $${frBrut(a, b)}$ ?${CONSIGNE_FR}`, mode: "nombre", prefixe: "Inverse :", attendu: b / a,
        erreurs: [{ valeur: -a / b, message: "Ça, c'est l'opposé. L'inverse est le nombre qui, multiplié par lui, donne $1$." }, { valeur: -b / a, message: "Un nombre et son inverse ont le **même** signe : leur produit vaut $1$, qui est positif." }, ...approx(b / a)],
        aides: ["L'inverse de $x$ est le nombre $y$ tel que $x \\times y = 1$.", "L'inverse de $\\dfrac{a}{b}$ est $\\dfrac{b}{a}$.", "Un nombre et son inverse ont le même signe."], solution: `$${frBrut(a, b)} \\times ${frP(b * Math.sign(a), Math.abs(a))} = 1$ : l'inverse est $${frS(b, a)}$.` }; }
    if (t === 2 && Math.random() < 0.7) { // combien de fois une fraction dans un nombre entier
      let a, b; do [a, b] = tireFr(false); while (a >= b);
      const n = a * rand(2, 9), v = (n * b) / a, C = pick([[`Combien de verres de $${fr(a, b)}$ L peut-on remplir avec $${n}$ L de jus de goyave ?`, "Verres :"], [`Combien de sachets de $${fr(a, b)}$ kg de vanille peut-on préparer avec $${n}$ kg ?`, "Sachets :"], [`Une barge fait la traversée Mamoudzou – Dzaoudzi en $${fr(a, b)}$ d'heure. Combien de traversées peut-elle faire en $${n}$ heures (sans compter les escales) ?`, "Traversées :"]]);
      const fig = n * b <= 40 ? barreDivision4(n, a, b, true) : undefined;
      return { enonce: fig ? `${C[0]} Sur la barre, chaque unité est partagée en $${b}$ parts.` : C[0], figure: fig, figureSolution: n * b <= 40 ? barreDivision4(n, a, b) : undefined, mode: "nombre", prefixe: C[1], attendu: v,
        erreurs: [{ valeur: (n * a) / b, message: "Il faut diviser par la fraction (multiplier par son inverse), pas multiplier par elle." }, { valeur: n * b, message: `Diviser par $${fr(a, b)}$, c'est multiplier par $${fr(b, a)}$ : n'oublie pas le numérateur $${a}$.` }],
        aides: [`On cherche combien de fois $${fr(a, b)}$ est contenu dans $${n}$ : c'est une division.`, `$${n} \\div ${fr(a, b)} = ${n} \\times ${fr(b, a)}$.`, `$${n} \\times ${b} = ${n * b}$, puis on divise par $${a}$.`], solution: `$${n} \\div ${fr(a, b)} = ${n} \\times ${fr(b, a)} = \\dfrac{${n * b}}{${a}} = ${v}$.` };
    }
    const [a, b] = tireFr(true), [c, d] = tireFr(false), v = (a * d) / (b * c);
    return { enonce: `Calcule $${frBrut(a, b)} \\div ${fr(c, d)}$.${CONSIGNE_FR}`, mode: "nombre", prefixe: "Résultat :", attendu: v,
      erreurs: [{ valeur: (a * c) / (b * d), message: "Diviser, c'est multiplier par l'**inverse** : il faut retourner la deuxième fraction." }, { valeur: (b * c) / (a * d), message: "C'est la deuxième fraction qu'on retourne, pas la première." }, ...approx(v)],
      aides: ["Diviser par un nombre non nul, c'est multiplier par son inverse.", `L'inverse de $${fr(c, d)}$ est $${fr(d, c)}$.`, `$${frBrut(a, b)} \\times ${fr(d, c)}$.`],
      solution: `$${frBrut(a, b)} \\div ${fr(c, d)} = ${frBrut(a, b)} \\times ${fr(d, c)} = ${frBrut(a * d, b * c)}${pgcd(Math.abs(a * d), b * c) > 1 ? ` = ${frS(a * d, b * c)}` : ""}$.` };
  };

  GEN["fq4-priorites"] = function () {
    const [a, b] = tireFr(false), [c, d] = tireFr(false), [e, f] = tireFr(false), t = rand(0, 1);
    if (t === 0) { const pn = c * e, pd = d * f, L = ppcm4(b, pd), N = a * (L / b) + pn * (L / pd), v = N / L;
      return { enonce: `Calcule $${fr(a, b)} + ${fr(c, d)} \\times ${fr(e, f)}$.${CONSIGNE_FR}`, mode: "nombre", prefixe: "Résultat :", attendu: v,
        erreurs: [{ valeur: (a / b + c / d) * (e / f), message: "La multiplication est prioritaire sur l'addition." }, { valeur: (a + pn) / (b + pd), message: "Pour additionner, on ne fait pas la somme des dénominateurs : on réduit au même dénominateur." }, ...approx(v)],
        aides: ["Priorité : la multiplication d'abord.", `$${fr(c, d)} \\times ${fr(e, f)} = ${fr(pn, pd)}$.`, "Puis additionne en réduisant au même dénominateur."],
        solution: `$${fr(c, d)} \\times ${fr(e, f)} = ${fr(pn, pd)}$, puis $${fr(a, b)} + ${fr(pn, pd)} = ${fr(N, L)}${pgcd(N, L) > 1 ? ` = ${frS(N, L)}` : ""}$.` }; }
    const k = rand(2, 6), L = ppcm4(b, d), N = a * (L / b) - c * (L / d), v = N / (L * k);
    return { enonce: `Calcule $\\left(${fr(a, b)} - ${fr(c, d)}\\right) \\div ${k}$.${CONSIGNE_FR}`, mode: "nombre", prefixe: "Résultat :", attendu: v,
      erreurs: [{ valeur: (N * k) / L, message: `Diviser par $${k}$, c'est multiplier par $${fr(1, k)}$ : le résultat est plus proche de $0$.` }, { valeur: N / L, message: `N'oublie pas de diviser par $${k}$ après avoir calculé la parenthèse.` }, ...approx(v)],
      aides: ["Calcule d'abord la parenthèse.", `$${fr(a, b)} - ${fr(c, d)} = ${frBrut(N, L)}$.`, `Diviser par $${k}$, c'est multiplier par $${fr(1, k)}$.`],
      solution: `$${fr(a, b)} - ${fr(c, d)} = ${frBrut(N, L)}$, puis $${frBrut(N, L)} \\div ${k} = ${frBrut(N, L * k)}${pgcd(Math.abs(N), L * k) > 1 && N !== 0 ? ` = ${frS(N, L * k)}` : ""}$.` };
  };

  GEN["fq4-problemes"] = function () {
    const t = rand(0, 5), nom = pick(PRENOMS4), il = il4(nom);
    const propre = (dmax) => { for (;;) { const d = rand(2, dmax), n = rand(1, d - 1); if (pgcd(n, d) === 1) return [n, d]; } };
    if (t === 0) { // fraction d'une fraction
      const [a, b] = propre(6), [c, d] = propre(5), v = (a * c) / (b * d), C = pick([
        [`Dans un collège de ${pick(LIEUX4)}, $${fr(a, b)}$ des élèves sont demi-pensionnaires. Parmi eux, $${fr(c, d)}$ prennent le taxi-brousse.`, "Quelle fraction des élèves du collège est demi-pensionnaire et prend le taxi-brousse ?"],
        [`Sur l'exploitation de ${nom}, $${fr(a, b)}$ du terrain est planté de bananiers ; $${fr(c, d)}$ de cette bananeraie est irriguée.`, "Quelle fraction du terrain est une bananeraie irriguée ?"],
        [`Dans un village de Mayotte, $${fr(a, b)}$ des habitants ont moins de $20$ ans ; parmi eux, $${fr(c, d)}$ vont à l'école primaire.`, "Quelle fraction des habitants va à l'école primaire ?"]]);
      return { enonce: `${C[0]} ${C[1]}${CONSIGNE_FR}`, figure: aireProduit4(a, b, c, d), figureSolution: aireProduit4(a, b, c, d, `= ${a * c}/${b * d}`), mode: "nombre", prefixe: "Fraction :", attendu: v,
        erreurs: [{ valeur: a / b + c / d, message: `On prend $${fr(c, d)}$ **de** $${fr(a, b)}$ : c'est une multiplication, pas une addition.` }, { valeur: c / d, message: `$${fr(c, d)}$ est la fraction du groupe, pas de l'ensemble : il faut la multiplier par $${fr(a, b)}$.` }, ...approx(v)],
        aides: [`« $${fr(c, d)}$ des $${fr(a, b)}$ » se calcule par une multiplication.`, `$${fr(c, d)} \\times ${fr(a, b)}$.`, "Simplifie le résultat."], solution: `$${fr(c, d)} \\times ${fr(a, b)} = ${fr(a * c, b * d)}${pgcd(a * c, b * d) > 1 ? ` = ${frS(a * c, b * d)}` : ""}$.` }; }
    if (t === 1) { // fraction du reste
      const [a, b] = propre(6), [c, d] = propre(4), restFin = ((b - a) * (d - c)) / (b * d), C = pick([
        [`${nom} dépense $${fr(a, b)}$ de son salaire pour le loyer, puis $${fr(c, d)}$ de ce qui lui reste pour la nourriture.`, `Quelle fraction de son salaire lui reste-t-il ensuite ?`, "loyer", "nourriture"],
        [`${nom} vend $${fr(a, b)}$ de sa récolte de mangues au marché de Mamoudzou, puis $${fr(c, d)}$ de ce qui reste à ses voisins.`, `Quelle fraction de sa récolte lui reste-t-il ?`, "marché", "voisins"]]);
      return { enonce: `${C[0]} ${C[1]}${CONSIGNE_FR}`, figure: barreQ4("1", a, b, "(le tout)", C[2]), mode: "nombre", prefixe: "Fraction :", attendu: restFin,
        erreurs: [1 - a / b - c / d > 0 ? { valeur: 1 - a / b - c / d, message: `$${fr(c, d)}$ porte sur ce qui reste après la première étape, pas sur le tout.` } : { valeur: (c * (b - a)) / (d * b), message: `Ça, c'est la part « ${C[3]} ». On demande ce qui reste à la fin.` }, { valeur: (b - a) / b, message: `Ça, c'est ce qui reste après la première étape. Il faut encore enlever la part « ${C[3]} ».` }, ...approx(restFin)],
        aides: [`Après la première étape, il reste $1 - ${fr(a, b)} = ${frS(b - a, b)}$ du tout.`, `La deuxième part représente $${fr(c, d)} \\times ${frS(b - a, b)}$ du tout.`, "Soustrais cette part de ce qui restait."],
        solution: `Il reste $${frS(b - a, b)}$ après la première étape ; la deuxième part vaut $${fr(c, d)} \\times ${frS(b - a, b)} = ${frS(c * (b - a), d * b)}$ du tout. Il reste $${frS(b - a, b)} - ${frS(c * (b - a), d * b)} = ${frS((b - a) * (d - c), b * d)}$.` }; }
    if (t === 2) { // somme de deux fractions puis complément
      const [a, b] = propre(6), [c, d] = propre(6), L = ppcm4(b, d), N = a * (L / b) + c * (L / d), v = (L - N) / L;
      if (N >= L || b === d) return GEN["fq4-problemes"]();
      return { enonce: `Au marché de Mamoudzou, ${nom} a vendu $${fr(a, b)}$ de ses brochettes le matin et $${fr(c, d)}$ l'après-midi. Quelle fraction de ses brochettes lui reste-t-il le soir ?${CONSIGNE_FR}`, figure: bandesFr4([[a, b], [c, d]], L, false), figureSolution: bandesFr4([[a, b], [c, d]], L, true), mode: "nombre", prefixe: "Fraction :", attendu: v,
        erreurs: [{ valeur: N / L, message: "Ça, c'est la fraction vendue. On demande ce qui **reste**." }, { valeur: 1 - (a + c) / (b + d), message: "On n'additionne pas les dénominateurs : réduis au même dénominateur." }, ...approx(v)],
        aides: ["Calcule d'abord la fraction vendue dans la journée.", `$${fr(a, b)} + ${fr(c, d)} = ${fr(a * (L / b), L)} + ${fr(c * (L / d), L)} = ${fr(N, L)}$.`, `Il reste $1 - ${fr(N, L)}$.`], solution: `Vendu : $${fr(a, b)} + ${fr(c, d)} = ${fr(N, L)}$. Il reste $1 - ${fr(N, L)} = ${fr(L - N, L)}${pgcd(L - N, L) > 1 ? ` = ${frS(L - N, L)}` : ""}$ des brochettes.` }; }
    if (t === 3) { // combien de fois une fraction dans une quantité
      const n = rand(2, 9), [a, b] = pick([[1, 4], [1, 2], [3, 4], [1, 3], [2, 3], [1, 5], [2, 5], [1, 6], [1, 8], [3, 8]]), v = (n * b) / a;
      if (!Number.isInteger(v)) return GEN["fq4-problemes"]();
      const C = pick([[`Combien de verres de $${fr(a, b)}$ de litre peut-on remplir avec $${n}$ litres de jus de goyave ?`, "Verres :"], [`Pour la fête de l'école, ${nom} coupe $${n}$ gâteaux en parts de $${fr(a, b)}$ de gâteau. Combien de parts obtient-${il} ?`, "Parts :"], [`Avec $${n}$ m de tissu de salouva, combien de bandes de $${fr(a, b)}$ de mètre peut-on découper ?`, "Bandes :"]]);
      return { enonce: C[0], mode: "nombre", prefixe: C[1], attendu: v,
        erreurs: [{ valeur: (n * a) / b, message: "Il faut diviser par la fraction, pas multiplier." }, { valeur: n + b, message: "Diviser par une fraction, c'est multiplier par son inverse." }],
        aides: [`On cherche combien de fois $${fr(a, b)}$ est contenu dans $${n}$ : c'est une division.`, `$${n} \\div ${fr(a, b)} = ${n} \\times ${fr(b, a)}$.`, "Calcule."], solution: `$${n} \\div ${fr(a, b)} = ${n} \\times ${fr(b, a)} = ${v}$.` }; }
    if (t === 4) { // partage d'une fraction en parts égales
      const [a, b] = propre(5), k = rand(2, 8), v = a / (b * k), u = pick([["L de jus de coco", "L"], ["kg de riz", "kg"], ["d'une pizza", ""]]);
      return { enonce: `${nom} partage $${fr(a, b)}$ ${u[0]} en $${k}$ parts égales. Que représente une part${u[1] ? ` (en ${u[1]})` : " (en fraction de la pizza)"} ?${CONSIGNE_FR}`, mode: "nombre", prefixe: "Une part :", suffixe: u[1] || undefined, attendu: v,
        erreurs: [{ valeur: (a * k) / b, message: `Partager en $${k}$, c'est diviser par $${k}$, donc multiplier par $${fr(1, k)}$.` }, { valeur: a / (b + k), message: "On ne divise pas en ajoutant au dénominateur : on multiplie le dénominateur par le nombre de parts." }, ...approx(v)],
        aides: [`Partager en $${k}$ parts égales, c'est diviser par $${k}$.`, `$${fr(a, b)} \\div ${k} = ${fr(a, b)} \\times ${fr(1, k)}$.`, "Simplifie si possible."], solution: `$${fr(a, b)} \\div ${k} = ${fr(a, b)} \\times ${fr(1, k)} = ${fr(a, b * k)}${pgcd(a, b * k) > 1 ? ` = ${frS(a, b * k)}` : ""}$.` }; }
    // t === 5 : retrouver le total à partir de la partie qui reste
    const [a, b] = propre(8), u = rand(2, 12), R = (b - a) * u, T = b * u;
    const C = pick([[`${nom} a déjà parcouru $${fr(a, b)}$ du trajet en taxi-brousse de Mamoudzou à ${pick(["Chirongui", "Kani-Kéli", "M'tsamboro", "Bandrélé"])}. Il reste $${R}$ km.`, "Quelle est la longueur totale du trajet ?", "km"], [`${nom} a déjà lu $${fr(a, b)}$ de son livre ; ${il} doit encore lire $${R}$ pages.`, "Combien de pages compte le livre ?", "pages"]]);
    return { enonce: `${C[0]} ${C[1]}`, figure: barreQ4("?", a, b, C[2], `${a}/${b}`, `${R} ${C[2]}`), mode: "nombre", prefixe: "Total :", suffixe: C[2], attendu: T,
      erreurs: [{ valeur: (R * b) / a, message: `Les $${R}$ ${C[2]} correspondent à la partie qui reste, soit $${frS(b - a, b)}$ du total, pas à $${fr(a, b)}$.` }, { valeur: R + (R * a) / b, message: `La fraction $${fr(a, b)}$ porte sur le total, pas sur ce qui reste : on ne peut pas ajouter les $${fr(a, b)}$ de $${R}$.` }],
      aides: [`Il reste $1 - ${fr(a, b)} = ${frS(b - a, b)}$ du total.`, `$${frS(b - a, b)}$ du total représentent $${R}$ ${C[2]}, donc $${fr(1, b)}$ du total représente $${R} \\div ${b - a} = ${u}$ ${C[2]}.`, `Le total, c'est $${b}$ fois plus.`], solution: `Le reste représente $${frS(b - a, b)}$ du total, soit $${R}$ ${C[2]}. Donc $${fr(1, b)}$ du total vaut $${u}$ ${C[2]} et le total vaut $${b} \\times ${u} = ${T}$ ${C[2]}.` };
  };

  /* =====================================================================
     Chapitre 5 : proportionnalité (pq4-) — produits en croix, quatrième proportionnelle, pourcentages, vitesses
     ===================================================================== */
  /* Figures du chapitre 5 */
  // Repère avec la courbe de f sur [0 ; xmax] ; o = { xmax, ymax, px, py, xlab, ylab, pts: [[x, y, texte]], aria }
  function graphe4(f, o) {
    const x0 = 40, y0 = 168, xr = 296, yt = 22, X = (x) => x0 + ((xr - x0) * x) / o.xmax, Y = (y) => y0 - ((y0 - yt) * y) / o.ymax;
    let g = "", t = "";
    for (let x = o.px; x <= o.xmax + 1e-9; x += o.px) { g += L4(X(x), yt, X(x), y0, ""); t += `<text x="${f1(X(x))}" y="${y0 + 14}" text-anchor="middle">${nbTexte(arr(x, 3))}</text>`; }
    for (let y = o.py; y <= o.ymax + 1e-9; y += o.py) { g += L4(x0, Y(y), xr, Y(y), ""); t += `<text x="${x0 - 5}" y="${f1(Y(y) + 3.5)}" text-anchor="end">${nbTexte(arr(y, 3))}</text>`; }
    let s = `<g class="g-grid">${g}</g><g class="g-tick">${t}<text x="${x0 - 5}" y="${y0 + 14}" text-anchor="end">0</text></g>`;
    s += `<g class="g-axis">${L4(x0, y0, xr + 8, y0, "")}${L4(x0, y0, x0, yt - 8, "")}<path d="M${xr + 12} ${y0} l-8 -4 v8z"/><path d="M${x0} ${yt - 12} l-4 8 h8z"/></g>`;
    const pts = []; for (let i = 0; i <= 60; i++) { const x = (o.xmax * i) / 60, y = f(x); if (y >= -1e-9 && y <= o.ymax * 1.02) pts.push(`${f1(X(x))},${f1(Y(y))}`); }
    s += `<polyline class="g-curve" points="${pts.join(" ")}"/>`;
    (o.pts || []).forEach(([x, y, txt]) => { s += L4(X(x), Y(y), X(x), y0, "g-guide") + L4(x0, Y(y), X(x), Y(y), "g-guide") + C4(X(x), Y(y), 4) + (txt ? T4(X(x) - 8, Y(y) - 8, txt, "g-mesure", "end") : ""); });
    s += T4(x0 + 4, yt - 10, o.ylab, "g-label", "start") + T4(xr + 10, y0 + 30, o.xlab, "g-label", "end");
    return svg4(320, y0 + 38, o.aria, s);
  }
  // Une barre pour chaque personne d'un partage selon un ratio : parts = [2, 3], total « 45 € »
  function ratioBarre4(noms, parts, total) {
    const n = parts.reduce((a, b) => a + b, 0), x0 = 20, w = 280, u = w / n, y0 = 30, h = 30;
    let s = "", x = x0;
    parts.forEach((p, i) => { for (let j = 0; j < p; j++) s += R4(x + j * u, y0, u, h, i % 2 ? "g-aire g-aire-neg" : "g-aire") + T4(x + (j + 0.5) * u, y0 + 20, "?", "g-label"); s += T4(x + (p * u) / 2, y0 - 8, noms[i], "g-label"); x += p * u; });
    s += `<g class="g-grid">${Array.from({ length: n - 1 }, (_, j) => L4(x0 + (j + 1) * u, y0, x0 + (j + 1) * u, y0 + h, "")).join("")}</g>` + R4(x0, y0, w, h, "g-unite");
    s += `<path class="g-accolade" d="M${x0 + 2} ${y0 + h + 6} V${y0 + h + 12} H${x0 + w - 2} V${y0 + h + 6}"/>` + T4(x0 + w / 2, y0 + h + 28, total, "g-label");
    return svg4(320, y0 + h + 36, `Partage selon le ratio ${parts.join(" : ")} : ${noms.map((nm, i) => `${nm} reçoit ${parts[i]} parts`).join(", ")}, ${n} parts égales en tout, soit ${total}`, s);
  }
  // Deux barres : la valeur de départ (100 %) et la valeur d'arrivée (k × 100 %)
  function barresPct4(k, lab1, lab2, p1, p2) {
    const x0 = 72, w = Math.min(180, 186 / Math.max(1, k));
    const s = T4(x0 - 8, 36, "Avant", "g-label", "end") + R4(x0, 18, w, 28, "g-aire") + T4(x0 + w / 2, 37, p1, "g-label") + T4(x0 + w + 6, 37, lab1, "g-mesure", "start")
      + T4(x0 - 8, 84, "Après", "g-label", "end") + R4(x0, 66, w * k, 28, "g-aire g-aire-neg") + T4(x0 + (w * k) / 2, 85, p2, "g-label") + T4(x0 + w * k + 6, 85, lab2, "g-mesure", "start");
    return svg4(320, 108, `Deux barres : avant (${p1}, ${lab1}) et après (${p2}, ${lab2})`, s);
  }
  const TYPES_G4 = ["propo", "affine", "courbe"];
  const grapheType4 = (type, k, labs, b) => graphe4(type === "propo" ? (x) => k * x : type === "affine" ? (x) => k * x + (b || 2) : (x) => (k / 5) * x * x, { xmax: 5, ymax: 12, px: 1, py: 2, xlab: (labs || ["x", "y"])[0], ylab: (labs || ["x", "y"])[1], aria: `Graphique : ${type === "propo" ? "une droite qui passe par l'origine" : type === "affine" ? "une droite qui ne passe pas par l'origine" : "une courbe qui passe par l'origine"}` });
  // Tableau de proportionnalité 2 × 2 avec la diagonale du produit en croix
  function croix4(l1, l2, cases) {
    const x0 = 90, c = 80, h = 34, y0 = 10, cell = (i, j, t) => T4(x0 + j * c + c / 2, y0 + i * h + 22, t, t === "x" ? "g-hlabel" : "g-label");
    let s = R4(10, y0, x0 - 10, 2 * h, "g-aire") + T4(50, y0 + 22, l1, "g-label") + T4(50, y0 + h + 22, l2, "g-label") + cell(0, 0, cases[0]) + cell(0, 1, cases[1]) + cell(1, 0, cases[2]) + cell(1, 1, cases[3]);
    s += `<g class="g-grid">${[0, 1, 2].map((i) => L4(10, y0 + i * h, x0 + 2 * c, y0 + i * h, "")).join("")}${[10, x0, x0 + c, x0 + 2 * c].map((x) => L4(x, y0, x, y0 + 2 * h, "")).join("")}</g>`;
    s += L4(x0 + c + 18, y0 + 12, x0 + c - 18, y0 + h + 22, "g-hline") + T4(x0 + c + 2, y0 + h + 2, "×", "g-hlabel") + T4(x0 + 2 * c + 8, y0 + h + 22, `÷ ${cases[0]}`, "g-hlabel", "start");
    return svg4(320, 2 * h + 22, `Tableau de proportionnalité : ${cases.join(", ")} ; on multiplie les deux nombres en diagonale, puis on divise par le troisième`, s);
  }
  FIGURES["pq4-meth-croix"] = () => croix4("Masse (kg)", "Prix (€)", ["3", "5", "7,50", "x"]);
  FIGURES["pq4-cours-graphe"] = () => graphe4((x) => 2.5 * x, { xmax: 4, ymax: 10, px: 1, py: 2, xlab: "masse (kg)", ylab: "prix (€)", pts: [[2, 5, "2 kg → 5 €"]], aria: "Graphique du prix en fonction de la masse : une droite qui passe par l'origine et par le point (2 ; 5)" });
  FIGURES["pq4-cours-pourcentage"] = () => barresPct4(1.2, "50 €", "60 €", "100 %", "120 %");
  FIGURES["pq4-cours-vitesse"] = () => graphe4((x) => (60 * x) / 60, { xmax: 60, ymax: 60, px: 10, py: 10, xlab: "durée (min)", ylab: "distance (km)", pts: [[30, 30, "30 min → 30 km"]], aria: "Distance parcourue en fonction de la durée à 60 km/h : une droite qui passe par l'origine" });
  FIGURES["pq4-cours-ratio"] = () => ratioBarre4(["Anli", "Fatima"], [2, 3], "45 €");
  FIGURES["pq4-qcm-affine"] = () => grapheType4("affine", 1.8);
  FIGURES["pq4-qcm-propo"] = () => grapheType4("propo", 2);

  GEN["pq4-croix"] = function () {
    const t = rand(0, 3);
    if (t === 2) { // reconnaître graphiquement une situation de proportionnalité
      const type = pick(["propo", "propo", "affine", "courbe"]), b = pick([1, 2, 3, 4]), k = type === "affine" ? pick([0.8, 1, 1.2, 1.4, 1.6]) : pick([1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4]), rep = TYPES_G4.indexOf(type);
      const [labs, quoi] = pick([[["masse (kg)", "prix (€)"], "le prix en fonction de la masse"], [["durée (h)", "distance (km)"], "la distance en fonction de la durée"], [["heures", "salaire (× 10 €)"], "le salaire en fonction du nombre d'heures de travail"], [["volume (L)", "masse (kg)"], "la masse en fonction du volume"], [["distance (× 10 km)", "gazole (L)"], "la consommation de gazole en fonction de la distance"]]);
      const choix = ["Oui : c'est une droite qui passe par l'origine du repère", "Non : c'est une droite, mais elle ne passe pas par l'origine", "Non : ce n'est pas une droite", "On ne peut pas savoir sans tableau"];
      return { enonce: `Ce graphique représente ${quoi}. Est-ce une situation de proportionnalité ?`, figure: grapheType4(type, k, labs, b), mode: "choix", choix, attendu: rep,
        aides: ["Une situation de proportionnalité est représentée par des points alignés avec l'origine du repère.", "Regarde d'abord si c'est une droite.", "Puis regarde si elle passe par le point $(0 \\, ; \\, 0)$."],
        solution: rep === 0 ? "C'est une droite qui passe par l'origine : la situation est proportionnelle." : rep === 1 ? "C'est une droite, mais elle ne passe pas par l'origine : ce n'est pas une situation de proportionnalité." : "La représentation n'est pas une droite : ce n'est pas une situation de proportionnalité (même si elle passe par l'origine)." };
    }
    if (t === 3) { // reconnaître un tableau de proportionnalité
      const k = pick([1.5, 2, 2.5, 3, 4, 0.5, 1.2, 6]), xs = shuffle([2, 3, 4, 5, 6, 8, 10, 12]).slice(0, 4).sort((p, q) => p - q), ok = Math.random() < 0.5, ys = xs.map((x) => arr(x * k, 2));
      if (!ok) { const i = rand(1, 3); ys[i] = arr(ys[i] + pick([-1, 1, 2]), 2); if (ys[i] <= 0) return GEN["pq4-croix"](); }
      const add = arr(ys[1] - ys[0], 2), constAdd = ys.every((y, i) => !i || Math.abs(y - ys[i - 1] - add) < 1e-9);
      const { choix, attendu } = melange(ok ? `Oui : on multiplie toujours par $${nb(k)}$` : "Non : les quotients ne sont pas tous égaux", [ok ? "Non : les quotients ne sont pas tous égaux" : `Oui : on multiplie toujours par $${nb(arr(ys[0] / xs[0], 2))}$`, "Oui : les nombres de la deuxième ligne augmentent", constAdd ? "Non : il faudrait que la deuxième ligne soit le double de la première" : `Oui : on ajoute toujours $${nb(add)}$`]);
      return { enonce: "Ce tableau est-il un tableau de proportionnalité ? Choisis la réponse correctement justifiée.", tableau: { lignes: [["x", ...xs.map(String)], ["y", ...ys.map(nb)]] }, mode: "choix", choix, attendu,
        aides: ["Calcule le quotient $\\dfrac{y}{x}$ pour chaque colonne.", "Le tableau est de proportionnalité si tous ces quotients sont égaux (coefficient de proportionnalité).", `Premier quotient : $${nb(ys[0])} \\div ${xs[0]} = ${nb(arr(ys[0] / xs[0], 4))}$.`],
        solution: `Quotients : ${xs.map((x, i) => `$${nb(ys[i])} \\div ${x} = ${nb(arr(ys[i] / x, 3))}$`).join(" ; ")}. ${ok ? `Ils sont tous égaux à $${nb(k)}$ : c'est un tableau de proportionnalité.` : "Ils ne sont pas tous égaux : ce n'est pas un tableau de proportionnalité."}` };
    }
    if (t === 0) {
      for (;;) {
        const a = rand(2, 15), b = rand(2, 15), d = rand(2, 20); if (a === b) continue;
        const x = arr((a * d) / b, 4); if (!Number.isInteger(x * 100)) continue;
        return { enonce: `Ce tableau est un tableau de proportionnalité. Calcule $x$.`, tableau: { lignes: [["", "", ""], ["", String(a), "x"], ["", String(b), String(d)]].slice(1).map((l, i) => [i ? "\\text{Ligne 2}" : "\\text{Ligne 1}", l[1], l[2]]) }, mode: "nombre", prefixe: "$x =$", attendu: x,
          erreurs: [{ valeur: arr((b * d) / a, 4), message: "Attention à la disposition : $x = \\dfrac{" + a + " \\times " + d + "}{" + b + "}$." }, ...(a + d - b > 0 ? [{ valeur: a + d - b, message: "Dans un tableau de proportionnalité, on ne passe pas d'une ligne à l'autre en ajoutant le même nombre : on multiplie." }] : [])],
          aides: ["Dans un tableau de proportionnalité, les produits en croix sont égaux.", `$${a} \\times ${d} = ${b} \\times x$.`, `$x = \\dfrac{${a} \\times ${d}}{${b}}$.`], solution: `Produits en croix : $${b} \\times x = ${a} \\times ${d} = ${a * d}$, donc $x = ${a * d} \\div ${b} = ${nb(x)}$.` };
      }
    }
    const a = rand(2, 12), b = rand(2, 12), k = rand(2, 5), eg = Math.random() < 0.5, c = a * k, d = eg ? b * k : b * k + pick([-1, 1]);
    const choix = ["Oui, car les produits en croix sont égaux", "Non, car les produits en croix sont différents", "Oui, car on ajoute le même nombre", "Non, car les numérateurs sont différents"];
    return { enonce: `Les fractions $${fr(a, b)}$ et $${fr(c, d)}$ sont-elles égales ?`, mode: "choix", choix, attendu: eg ? 0 : 1,
      aides: ["$\\dfrac{a}{b} = \\dfrac{c}{d}$ équivaut à $a \\times d = b \\times c$.", `Calcule $${a} \\times ${d}$ et $${b} \\times ${c}$.`, "Compare les deux produits."],
      solution: `$${a} \\times ${d} = ${a * d}$ et $${b} \\times ${c} = ${b * c}$. ${eg ? "Les produits en croix sont égaux : les fractions sont égales." : "Les produits sont différents : les fractions ne sont pas égales."}` };
  };

  GEN["pq4-quatrieme"] = function () {
    const nom = pick(PRENOMS4), il = il4(nom), t = rand(0, 6);
    if (t === 4) { // partage selon un ratio
      const [p, q] = pick([[1, 2], [2, 3], [3, 4], [1, 3], [2, 5], [3, 5], [1, 4], [4, 5], [3, 7]]), u = rand(2, 15) * (Math.random() < 0.5 ? 1 : 5), T = (p + q) * u, autre = pick(PRENOMS4.filter((x) => x !== nom)), qui = rand(0, 1);
      const ctx = pick([`${nom} et ${autre} se partagent $${T}$ € gagnés en vendant des brochettes, dans le ratio $${p} : ${q}$.`, `${nom} et ${autre} se partagent $${T}$ mangues dans le ratio $${p} : ${q}$.`, `Pour un sirop de gingembre, on mélange de l'eau et du jus dans le ratio $${p} : ${q}$ ; on veut $${T}$ cL de sirop en tout.`]);
      const sirop = ctx.startsWith("Pour un sirop"), noms = sirop ? ["eau", "jus"] : [nom, autre], v = (qui ? q : p) * u, un = ctx.includes("€") ? "€" : ctx.includes("mangues") ? "mangues" : "cL";
      const quiTxt = sirop ? (qui ? "Le jus" : "L'eau") : noms[qui], verbe = sirop ? "correspond à" : "reçoit";
      return { enonce: `${ctx} ${sirop ? `Quelle quantité ${qui ? "de jus" : "d'eau"} faut-il (en cL) ?` : `Quelle part reçoit ${noms[qui]} ?`}`, figure: ratioBarre4(noms, [p, q], `${T} ${un}`), mode: "nombre", prefixe: "Réponse :", suffixe: un, attendu: v,
        erreurs: [{ valeur: (qui ? p : q) * u, message: `C'est l'autre part : ${sirop ? quiTxt.toLowerCase() : quiTxt} ${verbe} $${qui ? q : p}$ parts sur $${p + q}$.` }, ...(T % (qui ? q : p) === 0 && T / (qui ? q : p) !== v ? [{ valeur: T / (qui ? q : p), message: `Le ratio $${p} : ${q}$ signifie $${p + q}$ parts égales en tout : on divise d'abord par $${p + q}$.` }] : [{ valeur: T / 2, message: `Le partage n'est pas en deux moitiés : le ratio $${p} : ${q}$ donne $${p + q}$ parts égales.` }])],
        aides: [`Le ratio $${p} : ${q}$ signifie : $${p}$ parts pour l'un, $${q}$ parts pour l'autre, soit $${p + q}$ parts égales.`, `Une part vaut $${T} \\div ${p + q} = ${u}$.`, `${quiTxt} ${verbe} $${qui ? q : p}$ parts.`],
        solution: `$${p} + ${q} = ${p + q}$ parts ; une part vaut $${T} \\div ${p + q} = ${u}$. ${quiTxt} ${verbe} $${qui ? q : p} \\times ${u} = ${v}$ ${un}.` };
    }
    if (t === 5) { // lecture graphique puis proportionnalité
      const k = pick([1.5, 2, 2.5, 3, 4]), x1 = rand(2, 4), x2 = rand(6, 15), v = arr(k * x2, 2), fruit = pick(["bananes", "mangues", "litchis", "tomates"]);
      return { enonce: `Au marché de Mamoudzou, le prix des ${fruit} est proportionnel à la masse achetée (graphique). Combien coûtent $${x2}$ kg de ${fruit} ?`, figure: graphe4((x) => k * x, { xmax: 5, ymax: Math.ceil((k * 5) / 2) * 2, px: 1, py: 2, xlab: "masse (kg)", ylab: "prix (€)", pts: [[x1, k * x1, ""]], aria: `Graphique du prix en fonction de la masse : une droite qui passe par l'origine et par le point (${x1} ; ${nbTexte(k * x1)})` }), mode: "nombre", prefixe: "Prix :", suffixe: "€", attendu: v,
        erreurs: [{ valeur: arr(k * x1 + (x2 - x1), 2), message: "Le prix n'augmente pas de $1$ € par kilogramme : utilise le coefficient de proportionnalité." }, { valeur: arr(k * x1 * x2, 2), message: `Tu as multiplié le prix de $${x1}$ kg par $${x2}$ : il faut d'abord trouver le prix d'un kilogramme.` }],
        aides: [`Lis sur le graphique le prix de $${x1}$ kg.`, `$${x1}$ kg coûtent $${nb(k * x1)}$ € : $1$ kg coûte $${nb(k * x1)} \\div ${x1} = ${nb(k)}$ €.`, `$${x2}$ kg coûtent $${x2} \\times ${nb(k)}$ €.`], solution: `Graphiquement, $${x1}$ kg coûtent $${nb(k * x1)}$ €, donc $1$ kg coûte $${nb(k)}$ €. Pour $${x2}$ kg : $${x2} \\times ${nb(k)} = ${nb(v)}$ €.` };
    }
    for (;;) {
      const tt = t === 6 ? rand(0, 3) : t;
      const C = [
        () => { const q = rand(2, 9), p = Dc(rand(15, 99) * 10, 2), q2 = rand(2, 15), r = (p.m / 100) * q2 / q, fr2 = pick(["de litchis", "de mangues", "de bananes", "d'ananas"]); return [`Au marché de Mamoudzou, $${q}$ kg ${fr2} coûtent $${tD(p)}$ €. Combien coûtent $${q2}$ kg ?`, r, "€", q, p.m / 100, q2]; },
        () => { const L = rand(3, 12), km = rand(30, 90), km2 = rand(100, 600), r = (L * km2) / km; return [`Un taxi-brousse consomme $${L}$ L de gazole pour $${km}$ km. Combien consomme-t-il pour $${km2}$ km ?`, r, "L", km, L, km2]; },
        () => { const p = rand(3, 8), f = rand(2, 6) * 50, p2 = rand(2, 15), r = (f * p2) / p; return [`Pour un voulé avec $${p}$ personnes, il faut $${f}$ g de riz. Quelle masse faut-il pour $${p2}$ personnes ?`, r, "g", p, f, p2]; },
        () => { const c = rand(2, 9), m = rand(3, 20) * 5, c2 = rand(2, 20), r = (m * c2) / c; return [`${nom} met $${m}$ minutes pour lire $${c}$ chapitres. Combien de minutes lui faut-il, au même rythme, pour $${c2}$ chapitres ?`, r, "min", c, m, c2]; }
      ][tt]();
      const [txt, r, u, a, b, c] = C;
      if (!Number.isInteger(arr(r, 6) * 100) || a === c) continue;
      return { enonce: txt, tableau: { lignes: [[`\\text{${["Masse (kg)", "Distance (km)", "Personnes", "Chapitres"][tt]}}`, nb(a), nb(c)], [`\\text{${["Prix (€)", "Gazole (L)", "Riz (g)", "Durée (min)"][tt]}}`, nb(b), "x"]] }, mode: "nombre", prefixe: "Réponse :", suffixe: u, attendu: arr(r, 2),
        erreurs: [{ valeur: arr((a * c) / b, 2), message: `Attention à la disposition : $x = \\dfrac{${nb(b)} \\times ${nb(c)}}{${nb(a)}}$.` }, ...(b + c - a > 0 ? [{ valeur: arr(b + c - a, 2), message: "Dans une situation de proportionnalité, on ne passe pas d'une colonne à l'autre en ajoutant : on multiplie." }] : [])],
        aides: ["La situation est proportionnelle : on peut utiliser la quatrième proportionnelle (produit en croix).", `Dans le tableau : $${nb(a)} \\times x = ${nb(b)} \\times ${nb(c)}$.`, `$x = \\dfrac{${nb(b)} \\times ${nb(c)}}{${nb(a)}}$.`], solution: `$x = \\dfrac{${nb(b)} \\times ${nb(c)}}{${nb(a)}} = ${nb(arr(r, 2))}$ ${u}.` };
    }
  };

  // [article, prix mini, prix maxi] en €, multiples de 5
  const ARTICLES4 = [["un salouva", 20, 80], ["un ballon de football", 15, 60], ["une paire de chaussures", 30, 150], ["un sac de riz de $20$ kg", 20, 60], ["un panier de fruits", 10, 40], ["une montre", 20, 200], ["un vélo", 100, 400], ["un téléphone", 80, 400]];
  GEN["pq4-pourcentages"] = function () {
    const t = rand(0, 3), p = pick([5, 10, 12, 15, 20, 25, 30, 35, 40, 50, 60]), A4 = pick(ARTICLES4), art = A4[0], P = rand(A4[1] / 5, A4[2] / 5) * 5, lieu = pick(["au marché de Mamoudzou", "dans une boutique de Kawéni", "dans un magasin de Combani", "à Dzaoudzi"]);
    if (t === 0) { const h = Math.random() < 0.5, k = h ? 1 + p / 100 : 1 - p / 100, f = arr(P * k, 2);
      return { enonce: `${lieu[0].toUpperCase() + lieu.slice(1)}, ${art} coûte $${P}$ €. Son prix ${h ? "augmente" : "baisse"} de $${p}\\,\\%$. Quel est son nouveau prix ?`, figure: barresPct4(k, `${P} €`, "?", "100 %", `${100 + (h ? p : -p)} %`), mode: "nombre", prefixe: "Nouveau prix :", suffixe: "€", attendu: f,
        erreurs: [{ valeur: arr((P * p) / 100, 2), message: "Ça, c'est le montant de la variation. Il faut l'ajouter ou le retirer." }, { valeur: P + (h ? p : -p), message: `$${p}\\,\\%$ n'est pas $${p}$ € : c'est $${p}$ € pour $100$ €, ici $${nb((P * p) / 100)}$ €.` }],
        aides: [`${h ? "Augmenter" : "Baisser"} de $${p}\\,\\%$, c'est multiplier par $${nb(k)}$.`, `$${P} \\times ${nb(k)}$.`, `Ou : $${p}\\,\\%$ de $${P}$ vaut $${nb((P * p) / 100)}$, puis ${h ? "on ajoute" : "on retire"}.`], solution: `$${P} \\times ${nb(k)} = ${nb(f)}$ €.` }; }
    if (t === 1) { const f = arr(P * (1 + p / 100), 2), C = pick([[`Le prix d'un repas dans un restaurant de ${pick(LIEUX4)} passe de $${P / 5}$ € à $${nb(f / 5)}$ €.`, P / 5, f / 5], [`${lieu[0].toUpperCase() + lieu.slice(1)}, le prix d'${art} passe de $${P}$ € à $${nb(f)}$ €.`, P, f]]);
      const [txt, A, B] = C;
      return { enonce: `${txt} De quel pourcentage a-t-il augmenté ?`, figure: barresPct4(B / A, `${nbTexte(A)} €`, `${nbTexte(B)} €`, "100 %", "?"), mode: "nombre", prefixe: "Hausse :", suffixe: "%", attendu: p,
        erreurs: [{ valeur: arr(B - A, 2), message: "Ça, c'est l'augmentation en euros. Il faut la rapporter au prix de départ." }, { valeur: arr(((B - A) / B) * 100, 2), message: "On rapporte l'augmentation au prix de **départ**, pas au nouveau prix." }],
        aides: [`Augmentation : $${nb(B)} - ${nb(A)} = ${nb(arr(B - A, 2))}$ €.`, `Rapporte au prix de départ : $\\dfrac{${nb(arr(B - A, 2))}}{${nb(A)}}$.`, "Multiplie par $100$."], solution: `$\\dfrac{${nb(arr(B - A, 2))}}{${nb(A)}} = ${nb(p / 100)}$, soit $${p}\\,\\%$.` }; }
    if (t === 2) { const n = rand(20, 600), N = n * 10, v = (N * p) / 100, C = pick([[`Dans une commune de Mayotte de $${nb(N)}$ habitants, $${p}\\,\\%$ ont moins de $15$ ans.`, "Combien d'habitants cela représente-t-il ?", "habitants"], [`Une tortue verte pond environ $${N / 10}$ œufs par saison sur la plage de Moya ; $${p}\\,\\%$ des petites tortues arrivent jusqu'à la mer.`, "Combien de petites tortues cela représente-t-il ?", "tortues"], [`Le collège de ${pick(LIEUX4)} compte $${nb(N / 10)}$ élèves ; $${p}\\,\\%$ sont demi-pensionnaires.`, "Combien d'élèves sont demi-pensionnaires ?", "élèves"]]);
      const tot = C[2] === "habitants" ? N : N / 10, val = (tot * p) / 100;
      if (!Number.isInteger(val)) return GEN["pq4-pourcentages"]();
      return { enonce: `${C[0]} ${C[1]}`, mode: "nombre", prefixe: "Réponse :", suffixe: C[2], attendu: val,
        erreurs: [{ valeur: tot - val, message: `Ça, c'est le nombre de ceux qui ne sont pas concernés (les $${100 - p}\\,\\%$ restants).` }, { valeur: arr(tot / p, 2), message: `Prendre $${p}\\,\\%$, ce n'est pas diviser par $${p}$ : c'est multiplier par $\\dfrac{${p}}{100}$.` }],
        aides: [`$${p}\\,\\%$ de $${nb(tot)}$, c'est $${nb(tot)} \\times \\dfrac{${p}}{100}$.`, `$${nb(tot)} \\times ${nb(p / 100)}$.`, "Le résultat doit être plus petit que le total."], solution: `$${nb(tot)} \\times ${nb(p / 100)} = ${nb(val)}$ ${C[2]}.` }; }
    const k = 1 - p / 100, f = arr(P * k, 2);
    return { enonce: `Pendant les soldes, ${lieu}, ${art} coûte $${nb(f)}$ € après une réduction de $${p}\\,\\%$. Quel était son prix avant la réduction ?`, figure: barresPct4(k, "?", `${nbTexte(f)} €`, "100 %", `${100 - p} %`), mode: "nombre", prefixe: "Prix initial :", suffixe: "€", attendu: P,
      erreurs: [{ valeur: arr(f * (1 + p / 100), 2), message: `On ne rajoute pas $${p}\\,\\%$ du nouveau prix : le prix initial multiplié par $${nb(k)}$ donne $${nb(f)}$.` }, { valeur: arr(f + p, 2), message: `$${p}\\,\\%$ n'est pas $${p}$ € : divise le nouveau prix par $${nb(k)}$.` }],
      aides: [`Baisser de $${p}\\,\\%$, c'est multiplier par $${nb(k)}$.`, `Prix initial $\\times ${nb(k)} = ${nb(f)}$.`, `Prix initial $= ${nb(f)} \\div ${nb(k)}$.`], solution: `$${nb(f)} \\div ${nb(k)} = ${P}$ €.` };
  };

  GEN["pq4-vitesse"] = function () {
    const t = rand(0, 4), nom = pick(PRENOMS4);
    // [véhicule, trajet, vitesse mini, vitesse maxi] (km/h, multiples de 5)
    const VEH = [["Un taxi-brousse", `de Mamoudzou à ${pick(["Chirongui", "Sada", "M'tsamboro", "Kani-Kéli", "Bandrélé"])}`, 30, 70], ["La barge", "entre Mamoudzou et Dzaoudzi", 10, 25], [`Le scooter ${de4(nom)}`, `de ${pick(LIEUX4.slice(1))} à Mamoudzou`, 25, 50], ["Un bateau de pêche", "dans le lagon", 15, 35], [`Le vélo ${de4(nom)}`, "sur la route de Petite-Terre", 10, 25]];
    const veh = pick(VEH), [ve, tr] = veh, vitesse = () => rand(veh[2] / 5, veh[3] / 5) * 5;
    if (t === 0) { const v = vitesse(), [h, txt] = pick([[0.5, "$30$ min"], [1.5, "$1$ h $30$ min"], [0.25, "$15$ min"], [0.75, "$45$ min"], [2.5, "$2$ h $30$ min"], [1.25, "$1$ h $15$ min"], [2, "$2$ h"], [3, "$3$ h"], [1 / 3, "$20$ min"], [2 / 3, "$40$ min"], [1.2, "$1$ h $12$ min"]]), d = arr(v * h, 4);
      if (!Number.isInteger(d * 100)) return GEN["pq4-vitesse"]();
      const hT = Number.isInteger(h * 100) ? nb(h) : fr(Math.round(h * 3), 3), H = Math.floor(h + 1e-9), M = Math.round((h - H) * 60), e1 = H && M ? { valeur: arr(d / (H + M / 100), 4), message: `$${H}$ h $${M}$ min ne s'écrit pas $${H}{,}${M}$ h : $${M}$ min $= \\dfrac{${M}}{60}$ h.` } : !H ? { valeur: arr(d / M, 4), message: `En divisant par $${M}$, tu obtiens des km par **minute** : convertis la durée en heures.` } : null;
      return { enonce: `${ve} parcourt $${nb(d)}$ km ${tr} en ${txt}. Quelle est sa vitesse moyenne en km/h ?`, mode: "nombre", prefixe: "Vitesse :", suffixe: "km/h", attendu: v,
        erreurs: [...(e1 ? [e1] : []), { valeur: arr(d * h, 4), message: "Vitesse $= \\dfrac{\\text{distance}}{\\text{durée}}$ : on divise la distance par la durée." }],
        aides: ["Vitesse $= \\dfrac{\\text{distance}}{\\text{durée}}$, avec la durée en heures.", Number.isInteger(h) ? `La durée est déjà en heures : $${h}$ h.` : `${txt} $= ${hT}$ h.`, `$${nb(d)} \\div ${hT}$.`], solution: `${Number.isInteger(h) ? "" : `${txt} $= ${hT}$ h, donc `}$v = ${nb(d)} \\div ${hT} = ${v}$ km/h.` }; }
    if (t === 1) { const v = vitesse(), m = pick([15, 20, 30, 40, 45, 90, 75, 12, 6, 36]), d = (v * m) / 60;
      return { enonce: `${ve} roule à $${v}$ km/h pendant $${m}$ minutes, ${tr}. Quelle distance parcourt-il ?`, mode: "nombre", prefixe: "Distance :", suffixe: "km", attendu: arr(d, 3),
        erreurs: [{ valeur: v * m, message: "La durée doit être en heures : $" + m + "$ min $= \\dfrac{" + m + "}{60}$ h." }, { valeur: arr(v / m, 3), message: "Distance $=$ vitesse $\\times$ durée : on multiplie." }],
        aides: ["Distance $=$ vitesse $\\times$ durée (en heures).", `$${m}$ min $= \\dfrac{${m}}{60}$ h.`, `$${v} \\times \\dfrac{${m}}{60}$.`], solution: `$d = ${v} \\times \\dfrac{${m}}{60} = ${nb(arr(d, 3))}$ km.` }; }
    if (t === 2) { const v = vitesse(), d = rand(1, 12) * v / 4;
      if (!Number.isInteger((d / v) * 60)) return GEN["pq4-vitesse"]();
      return { enonce: `${ve} roule à $${v}$ km/h. Combien de minutes lui faut-il pour parcourir $${nb(d)}$ km ?`, mode: "nombre", prefixe: "Durée :", suffixe: "min", attendu: (d / v) * 60,
        erreurs: [{ valeur: arr(d / v, 4), message: "Ça, c'est la durée en heures. Convertis en minutes." }, { valeur: arr((v / d) * 60, 4), message: "Durée $= \\dfrac{\\text{distance}}{\\text{vitesse}}$ : c'est la distance qu'on divise." }],
        aides: ["Durée $= \\dfrac{\\text{distance}}{\\text{vitesse}}$.", `$${nb(d)} \\div ${v} = ${nb(arr(d / v, 4))}$ h.`, "Multiplie par $60$ pour avoir des minutes."], solution: `$t = ${nb(d)} \\div ${v} = ${nb(arr(d / v, 4))}$ h $= ${(d / v) * 60}$ min.` }; }
    if (t === 3) { // lecture graphique
      const v = pick([24, 30, 36, 40, 45, 48, 60]), T = pick([20, 30, 40]), d = (v * T) / 60;
      if (!Number.isInteger(d)) return GEN["pq4-vitesse"]();
      return { enonce: `Le graphique donne la distance parcourue par ${pick(["un taxi-brousse", "une pirogue à moteur", "un cycliste"])} en fonction de la durée, à vitesse constante. Quelle est sa vitesse en km/h ?`, figure: graphe4((x) => (v * x) / 60, { xmax: T, ymax: Math.ceil(d / 2) * 2 + 2, px: 10, py: d > 20 ? 4 : 2, xlab: "durée (min)", ylab: "distance (km)", pts: [[T, d, ""]], aria: `Distance en fonction de la durée : une droite qui passe par l'origine et par le point (${T} min ; ${d} km)` }), mode: "nombre", prefixe: "Vitesse :", suffixe: "km/h", attendu: v,
        erreurs: [{ valeur: d, message: `Ça, c'est la distance parcourue en $${T}$ min, pas en une heure.` }, { valeur: arr(d / T, 4), message: "Ça, c'est une vitesse en km par **minute** : multiplie par $60$." }],
        aides: [`Lis la distance parcourue en $${T}$ minutes.`, `En $${T}$ min, on parcourt $${d}$ km.`, `En $60$ min, on parcourt $${nb(60 / T)}$ fois plus.`], solution: `En $${T}$ min, la distance est $${d}$ km ; en $1$ h $= 60$ min, elle est $${d} \\times ${nb(60 / T)} = ${v}$ km : la vitesse est $${v}$ km/h.` };
    }
    const ms = rand(1, 45), v = arr(ms * 3.6, 2), q = Math.random() < 0.5;
    return q ? { enonce: `Convertis $${nb(v)}$ km/h en m/s.`, mode: "nombre", prefixe: "Vitesse :", suffixe: "m/s", attendu: ms,
      erreurs: [{ valeur: arr(v * 3.6, 4), message: "On divise par $3{,}6$ pour passer des km/h aux m/s." }, { valeur: arr(v / 60, 4), message: "Une heure compte $3\\,600$ secondes, pas $60$." }],
      aides: ["$1$ km $= 1\\,000$ m et $1$ h $= 3\\,600$ s.", `$${nb(v)}$ km/h $= \\dfrac{${nb(v)} \\times 1\\,000}{3\\,600}$ m/s.`, "Cela revient à diviser par $3{,}6$."], solution: `$\\dfrac{${nb(v)} \\times 1\\,000}{3\\,600} = ${nb(ms)}$ m/s.` }
      : { enonce: `Convertis $${nb(ms)}$ m/s en km/h.`, mode: "nombre", prefixe: "Vitesse :", suffixe: "km/h", attendu: v,
        erreurs: [{ valeur: arr(ms / 3.6, 4), message: "Pour passer des m/s aux km/h, on multiplie par $3{,}6$." }, { valeur: ms * 60, message: "Une heure compte $3\\,600$ secondes, et $1$ km $= 1\\,000$ m : on multiplie par $3{,}6$." }],
        aides: ["En $1$ h, il y a $3\\,600$ s.", `En $1$ h, on parcourt $${nb(ms)} \\times 3\\,600$ m.`, "Convertis en km : divise par $1\\,000$ (au total, multiplie par $3{,}6$)."], solution: `$${nb(ms)} \\times 3{,}6 = ${nb(v)}$ km/h.` };
  };

  /* =====================================================================
     Chapitre 6 : pyramides, cônes et repérage dans l'espace (es4-)
     ===================================================================== */
  const POLY4 = { 3: "triangle", 4: "quadrilatère", 5: "pentagone", 6: "hexagone", 8: "octogone" };

  /* Figures du chapitre 6 : perspective cavalière (fuyantes à 45°, coefficient 0,5).
     Une arête est cachée (pointillés) quand aucune des faces qui la bordent n'est tournée vers l'observateur. */
  function polyedre4(V, F, o) {
    o = o || {};
    const c = 0.5 * Math.cos(Math.PI / 4), sn = 0.5 * Math.sin(Math.PI / 4), vue = [c, -1, sn], P2 = (p) => [p[0] + c * p[1], -(p[2] + sn * p[1])];
    const raw = {}; Object.keys(V).forEach((n) => (raw[n] = P2(V[n]))); (o.points || []).forEach(([n, p]) => (raw[n] = P2(p)));
    const xs = Object.values(raw).map((p) => p[0]), ys = Object.values(raw).map((p) => p[1]), W = 320, H = o.H || 190, mx = o.mx || 44, my = 22;
    const minx = Math.min(...xs), maxx = Math.max(...xs), miny = Math.min(...ys), maxy = Math.max(...ys), k = Math.min((W - 2 * mx) / (maxx - minx || 1), (H - 2 * my) / (maxy - miny || 1));
    const Q = {}; Object.keys(raw).forEach((n) => (Q[n] = [(W - (maxx - minx) * k) / 2 + (raw[n][0] - minx) * k, (H - (maxy - miny) * k) / 2 + (raw[n][1] - miny) * k]));
    const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], vis = F.map((f) => { const u = sub(V[f[1]], V[f[0]]), w = sub(V[f[2]], V[f[0]]), n = [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]]; return n[0] * vue[0] + n[1] * vue[1] + n[2] * vue[2] > 1e-9; });
    const ar = new Map(); F.forEach((f, i) => f.forEach((a, j) => { const key = [a, f[(j + 1) % f.length]].sort().join("|"); ar.set(key, ar.get(key) || vis[i]); }));
    let s = (o.fond || []).map((f) => P4(f.map((n) => Q[n]), "g-poly")).join("");
    ar.forEach((v, key) => { const [a, b] = key.split("|"); s += L4(...Q[a], ...Q[b], v ? "g-segment" : "g-cache"); });
    (o.segs || []).forEach(([a, b, cl]) => { s += L4(...Q[a], ...Q[b], cl || "g-cache"); });
    if (o.droit) { const [a, b, d] = o.droit, u = (p) => { const dx = Q[p][0] - Q[b][0], dy = Q[p][1] - Q[b][1], L = Math.hypot(dx, dy) || 1; return [(dx / L) * 8, (dy / L) * 8]; }, [ax, ay] = u(a), [dx2, dy2] = u(d); s += `<path class="g-code" d="M${f1(Q[b][0] + ax)} ${f1(Q[b][1] + ay)} l${f1(dx2)} ${f1(dy2)} l${f1(-ax)} ${f1(-ay)}"/>`; }
    const G = [xs.reduce((a, b) => a + b, 0) / xs.length, ys.reduce((a, b) => a + b, 0) / ys.length].map((v, i) => (i ? (H - (maxy - miny) * k) / 2 + (v - miny) * k : (W - (maxx - minx) * k) / 2 + (v - minx) * k));
    (o.lettres || Object.keys(V)).forEach((n) => { const dx = Q[n][0] - G[0], dy = Q[n][1] - G[1], L = Math.hypot(dx, dy) || 1; s += C4(...Q[n], 2.5) + T4(Q[n][0] + (dx / L) * 12, Q[n][1] + (dy / L) * 12 + 4, n, "g-plabel"); });
    (o.cotes || []).forEach(([a, b, t, dec]) => { const m = [(Q[a][0] + Q[b][0]) / 2, (Q[a][1] + Q[b][1]) / 2], d = dec || [0, 0]; s += T4(m[0] + d[0], m[1] + d[1], t, "g-mesure", d[0] > 2 ? "start" : d[0] < -2 ? "end" : "middle"); });
    return svg4(W, H, o.aria || "Solide en perspective cavalière", s);
  }
  // Pyramide de sommet S : base régulière à n côtés, ou rectangle (o.rect = [L, l]) ; o.hauteur : hauteur [SO] en pointillés
  function pyramide4(n, o) {
    o = o || {};
    const noms = (o.noms || "ABCDEF").slice(0, n).split(""), S = o.S || "S", h = o.h || 1.5, V = {};
    const base = o.rect ? [[-o.rect[0] / 2, -o.rect[1] / 2], [o.rect[0] / 2, -o.rect[1] / 2], [o.rect[0] / 2, o.rect[1] / 2], [-o.rect[0] / 2, o.rect[1] / 2]] : Array.from({ length: n }, (_, i) => { const t = -Math.PI / 2 - Math.PI / n + (2 * Math.PI * i) / n; return [Math.cos(t), Math.sin(t)]; });
    base.forEach(([x, y], i) => (V[noms[i]] = [x, y, 0])); V[S] = [0, 0, h];
    const F = [noms.slice().reverse(), ...noms.map((a, i) => [S, a, noms[(i + 1) % n]])];
    return polyedre4(V, F, { points: o.hauteur ? [["O", [0, 0, 0]]] : [], segs: o.hauteur ? [[S, "O", "g-cache"]] : [], droit: o.hauteur ? [S, "O", noms[1]] : null, lettres: o.lettres || [...noms, S, ...(o.hauteur ? ["O"] : [])], cotes: o.cotes, fond: o.fond, aria: o.aria || `Pyramide de sommet ${S} à base ${o.rect ? "rectangulaire" : POLY4[n]}` });
  }
  // Cône de révolution : base en ellipse (moitié arrière en pointillés), hauteur et rayon ; labs = [rayon, hauteur, génératrice]
  function cone4(labs, o) {
    o = o || {};
    const cx = 160, cy = 150, rx = 78, ry = 22, sy = 24;
    let s = `<path class="g-arc-plein" d="M${cx - rx} ${cy} A${rx} ${ry} 0 0 0 ${cx + rx} ${cy}"/><path class="g-cache-arc" d="M${cx - rx} ${cy} A${rx} ${ry} 0 0 1 ${cx + rx} ${cy}"/>` + L4(cx - rx, cy, cx, sy) + L4(cx + rx, cy, cx, sy);
    s += L4(cx, sy, cx, cy, "g-cache") + L4(cx, cy, cx + rx, cy, "g-cache") + `<path class="g-code" d="M${cx + 8} ${cy} v-8 h-8"/>` + C4(cx, sy, 2.5) + C4(cx, cy, 2.5) + T4(cx, sy - 8, o.S || "S", "g-plabel") + T4(cx - 8, cy + 14, o.O || "O", "g-plabel");
    if (labs) s += T4(cx + rx / 2, cy - 5, labs[0] || "", "g-mesure") + T4(cx - 6, (sy + cy) / 2 + 4, labs[1] || "", "g-mesure", "end") + T4(cx + rx / 2 + 12, (sy + cy) / 2, labs[2] || "", "g-mesure", "start");
    return svg4(320, 182, o.aria || `Cône de révolution de sommet ${o.S || "S"}, de base un disque de centre ${o.O || "O"}`, s);
  }
  // Pavé droit ABCDEFGH (ABCD en bas, E au-dessus de A) ; o.axes : flèches du repère d'origine A ; o.cotes ; o.marque : point mis en valeur
  function pave4(L, l0, h, o) {
    o = o || {};
    const l = Math.max(l0, 0.5 * Math.max(L, h)); // profondeur dessinée un peu agrandie si besoin, pour que les étiquettes ne se touchent pas
    const V = { A: [0, 0, 0], B: [L, 0, 0], C: [L, l, 0], D: [0, l, 0], E: [0, 0, h], F: [L, 0, h], G: [L, l, h], H: [0, l, h] };
    const F = [["A", "D", "C", "B"], ["E", "F", "G", "H"], ["A", "B", "F", "E"], ["B", "C", "G", "F"], ["C", "D", "H", "G"], ["D", "A", "E", "H"]];
    return polyedre4(V, F, { cotes: o.cotes, segs: o.segs, points: o.points, lettres: o.lettres, aria: o.aria || `Pavé droit ABCDEFGH de dimensions ${nbTexte(L)}, ${nbTexte(l)} et ${nbTexte(h)}`, H: o.H });
  }
  const PAVE_COTES = (L, l, h) => [["A", "B", `${L}`, [0, 16]], ["B", "C", `${l}`, [10, 14]], ["A", "E", `${h}`, [-12, 4]]];
  FIGURES["es4-cours-pyramide"] = () => pyramide4(4, { hauteur: true, aria: "Pyramide SABCD à base carrée ; la hauteur [SO] est en pointillés, perpendiculaire à la base" });
  FIGURES["es4-cours-cone"] = () => cone4(["r", "h", ""], { aria: "Cône de révolution de sommet S : la hauteur [SO] et le rayon r de la base sont en pointillés" });
  FIGURES["es4-cours-tiers"] = () => polyedre4({ A: [0, 0, 0], B: [2, 0, 0], C: [2, 2, 0], D: [0, 2, 0], E: [0, 0, 2], F: [2, 0, 2], G: [2, 2, 2], H: [0, 2, 2] }, [["A", "D", "C", "B"], ["E", "F", "G", "H"], ["A", "B", "F", "E"], ["B", "C", "G", "F"], ["C", "D", "H", "G"], ["D", "A", "E", "H"]], { points: [["S", [1, 1, 2]]], segs: [["S", "A", "g-segment"], ["S", "B", "g-segment"], ["S", "C", "g-segment"], ["S", "D", "g-cache"]], lettres: ["S"], aria: "Un cube et une pyramide de même base et de même hauteur, dont le sommet S est au centre de la face du haut : le volume de la pyramide est le tiers de celui du cube" });
  // Cubes en perspective isométrique (même dessin que le tronc commun), arête a, origine (ox, oy)
  const cubesIso4 = (h, a, ox, oy) => { const cx = Math.cos(Math.PI / 6) * a, sy = Math.sin(Math.PI / 6) * a, P = (i, j, k) => [ox + (i - j) * cx, oy + (i + j) * sy - k * a], L = []; h.forEach((r, i) => r.forEach((n, j) => { for (let k = 0; k < n; k++) L.push([i, j, k]); })); L.sort((p, q) => p[0] + p[1] - q[0] - q[1] || p[2] - q[2] || p[0] - q[0]); return L.map(([i, j, k]) => P4([P(i, j, k + 1), P(i + 1, j, k + 1), P(i + 1, j + 1, k + 1), P(i, j + 1, k + 1)], "g-cube-haut") + P4([P(i, j + 1, k), P(i + 1, j + 1, k), P(i + 1, j + 1, k + 1), P(i, j + 1, k + 1)], "g-cube-g") + P4([P(i + 1, j, k), P(i + 1, j + 1, k), P(i + 1, j + 1, k + 1), P(i + 1, j, k + 1)], "g-cube-d")).join(""); };
  FIGURES["es4-cours-agrandir"] = () => svg4(320, 176, "Deux cubes : le petit a une arête de 1, le grand une arête de 2 ; le grand contient 8 petits cubes", cubesIso4([[1]], 34, 70, 96) + T4(70, 166, "arête 1", "g-mesure") + cubesIso4([[2, 2], [2, 2]], 34, 228, 84) + T4(228, 168, "arête 2 : volume × 8", "g-mesure"));
  FIGURES["es4-cours-pave"] = () => pave4(4, 3, 2, { cotes: PAVE_COTES(4, 3, 2), aria: "Pavé droit ABCDEFGH avec AB = 4, AD = 3 et AE = 2 ; origine A" });
  FIGURES["es4-qcm-tetra"] = () => pyramide4(3, { aria: "Pyramide à base triangulaire SABC" });
  FIGURES["es4-qcm-hexa"] = () => pyramide4(6, { lettres: ["S"], aria: "Pyramide de sommet S à base hexagonale" });

  GEN["es4-vocab"] = function () {
    const t = rand(0, 5);
    if (t === 4) { // reconnaître un solide dessiné
      const n = pick([3, 4, 5, 6, 0]), nomS = n ? `une pyramide à base ${{ 3: "triangulaire", 4: "carrée", 5: "pentagonale", 6: "hexagonale" }[n]}` : "un cône de révolution";
      const fig = n ? pyramide4(n, { lettres: ["S"], aria: "Solide en perspective cavalière, arêtes cachées en pointillés" }) : cone4(null, { aria: "Solide en perspective cavalière, lignes cachées en pointillés" });
      const { choix, attendu } = melange(nomS[0].toUpperCase() + nomS.slice(1), ["Une pyramide à base triangulaire", "Une pyramide à base carrée", "Une pyramide à base pentagonale", "Une pyramide à base hexagonale", "Un cône de révolution", "Un prisme droit", "Un cylindre"].filter((x) => x.toLowerCase() !== nomS).sort(() => Math.random() - 0.5));
      return { enonce: "Quel est ce solide ?", figure: fig, mode: "choix", choix, attendu,
        aides: ["Regarde la base : un polygone (combien de côtés ?) ou un disque ?", "Les faces latérales d'une pyramide sont des triangles qui se rejoignent au sommet.", "Les arêtes cachées sont en pointillés : compte aussi celles-là."],
        solution: n ? `La base a $${n}$ côtés et les faces latérales sont des triangles qui se rejoignent au sommet $S$ : c'est ${nomS}.` : "La base est un disque et la surface latérale se termine en un sommet : c'est un cône de révolution." };
    }
    if (t === 5) { // compter sur la figure
      const n = pick([3, 4, 5, 6]), [mot, rep] = pick([["faces", n + 1], ["arêtes", 2 * n], ["sommets", n + 1]]), rect = n === 4 && Math.random() < 0.5, lettresT = Math.random() < 0.5;
      const fig = pyramide4(n, { rect: rect ? [1.7, 1.1] : null, h: pick([1.3, 1.6, 1.9]), lettres: lettresT ? null : ["S"], aria: `Pyramide de sommet S, base à ${n} côtés, arêtes cachées en pointillés` });
      return { enonce: pick([`Combien ${deM4(mot)} a la pyramide dessinée ?`, `Combien ${deM4(mot)} compte ce solide ?`, `Compte les ${mot} de cette pyramide (les pointillés comptent aussi).`]), figure: fig, mode: "nombre", prefixe: `Nombre ${deM4(mot)} :`, attendu: rep,
        erreurs: mot === "arêtes" ? [{ valeur: n, message: "Tu as compté les arêtes de la base : il y a aussi celles qui montent au sommet (y compris celles en pointillés)." }, { valeur: n + 1, message: "Ça, c'est le nombre de faces (ou de sommets), pas d'arêtes." }]
          : [{ valeur: n, message: mot === "faces" ? "N'oublie pas la base : c'est aussi une face." : "N'oublie pas le sommet principal $S$." }, { valeur: 2 * n, message: "Ça, c'est le nombre d'arêtes." }],
        aides: ["Les pointillés représentent des arêtes cachées : elles comptent.", `La base a $${n}$ côtés.`, mot === "faces" ? "Faces : la base et un triangle par côté de la base." : mot === "arêtes" ? "Arêtes : celles de la base et celles qui montent au sommet." : "Sommets : ceux de la base et le sommet $S$."],
        solution: `La base a $${n}$ côtés : la pyramide a $${n + 1}$ faces, $${2 * n}$ arêtes et $${n + 1}$ sommets. Réponse : $${rep}$.` };
    }
    if (t === 2) { const n = rand(3, 12), q = rand(0, 2), donne = [["arêtes", 2 * n], ["faces", n + 1], ["sommets", n + 1]][q], dem = pick([["côtés à sa base", n], ["faces", n + 1], ["arêtes", 2 * n], ["sommets", n + 1]].filter((z) => z[0] !== donne[0]));
      return { enonce: `Une pyramide a $${donne[1]}$ ${donne[0]}. Combien a-t-elle ${deM4(dem[0])} ?`, mode: "nombre", prefixe: "Nombre :", attendu: dem[1],
        aides: ["Si la base a $n$ côtés : $n + 1$ faces, $2n$ arêtes et $n + 1$ sommets.", `Retrouve d'abord le nombre $n$ de côtés de la base à partir des ${donne[0]}.`, `Ici $n = ${n}$.`], solution: `La base a $n = ${n}$ côtés, donc la pyramide a $${n + 1}$ faces, $${2 * n}$ arêtes et $${n + 1}$ sommets. Réponse : $${dem[1]}$.` }; }
    if (t === 0 || t === 3) { const n = t === 0 ? pick([3, 4, 5, 6, 8]) : rand(7, 20), [mot, rep] = pick([["faces", n + 1], ["arêtes", 2 * n], ["sommets", n + 1]]);
      if (t === 3) return { enonce: `La base d'une pyramide est un polygone à $${n}$ côtés. Combien a-t-elle ${deM4(mot)} ?`, mode: "nombre", prefixe: `Nombre ${deM4(mot)} :`, attendu: rep,
        erreurs: [{ valeur: mot === "arêtes" ? n : n, message: mot === "arêtes" ? "Il y a aussi les arêtes qui montent au sommet." : mot === "faces" ? "N'oublie pas la base." : "N'oublie pas le sommet principal." }, { valeur: mot === "arêtes" ? n + 1 : 2 * n, message: mot === "arêtes" ? "Ça, c'est le nombre de faces." : "Ça, c'est le nombre d'arêtes." }],
        aides: ["Une pyramide a une base et une face latérale triangulaire par côté de la base.", "Arêtes : celles de la base et celles qui montent au sommet.", "Sommets : ceux de la base et le sommet principal."], solution: `Base à $${n}$ côtés : $${n + 1}$ faces, $${2 * n}$ arêtes et $${n + 1}$ sommets. Réponse : $${rep}$.` };
      return { enonce: `Combien ${deM4(mot)} a une pyramide dont la base est un ${POLY4[n]} ?`, mode: "nombre", prefixe: `Nombre ${deM4(mot)} :`, attendu: rep,
        erreurs: [{ valeur: n, message: mot === "arêtes" ? "Il y a aussi les arêtes qui montent au sommet." : mot === "faces" ? "N'oublie pas la base." : "N'oublie pas le sommet principal." }, { valeur: mot === "arêtes" ? n + 1 : 2 * n, message: mot === "arêtes" ? "Ça, c'est le nombre de faces." : "Ça, c'est le nombre d'arêtes." }],
        aides: ["Une pyramide a une base (un polygone) et des faces latérales triangulaires qui se rejoignent au sommet.", `La base a $${n}$ côtés et $${n}$ sommets.`, mot === "faces" ? "Faces : la base et une face latérale par côté." : mot === "arêtes" ? "Arêtes : celles de la base et celles qui montent au sommet." : "Sommets : ceux de la base et le sommet principal."],
        solution: `Base à $${n}$ côtés : $${n + 1}$ faces ($1$ base et $${n}$ triangles), $${2 * n}$ arêtes ($${n}$ + $${n}$) et $${n + 1}$ sommets. Réponse : $${rep}$.` }; }
    const Q = pick([
      ["Une pyramide dont toutes les faces sont des triangles s'appelle :", "un tétraèdre", ["un cube", "un cône", "un prisme"]],
      ["Le patron d'un cône de révolution est formé :", "d'un disque et d'un secteur de disque", ["de deux disques et d'un rectangle", "d'un disque et d'un triangle", "de trois triangles"]],
      ["Dans une pyramide régulière, la hauteur est le segment qui joint le sommet :", "au centre de la base, perpendiculairement à la base", ["au milieu d'une arête de la base", "à un sommet de la base", "au milieu d'une face latérale"]],
      ["Les faces latérales d'une pyramide sont :", "des triangles", ["des rectangles", "des carrés", "des disques"]],
      ["Un cône de révolution est obtenu en faisant tourner autour d'un côté de l'angle droit :", "un triangle rectangle", ["un rectangle", "un demi-disque", "un carré"]],
      ["La base d'un cône de révolution est :", "un disque", ["un triangle", "un carré", "un rectangle"]],
      ["Sur une figure en perspective cavalière, les arêtes cachées sont dessinées :", "en pointillés", ["en gras", "en couleur", "elles ne sont pas dessinées"]],
      ["Le patron d'une pyramide à base carrée est formé :", "d'un carré et de quatre triangles", ["de deux carrés et de quatre rectangles", "d'un carré et de trois triangles", "de cinq carrés"]],
      ["Une pyramide régulière à base carrée a ses faces latérales :", "triangulaires et isocèles, toutes identiques", ["carrées", "rectangles et identiques", "toutes différentes"]],
      ["La hauteur d'un cône de révolution joint le sommet :", "au centre du disque de base", ["à un point du cercle de base", "au milieu d'une génératrice", "au bord de la base"]],
      ["On fait tourner un rectangle autour d'un de ses côtés. On obtient :", "un cylindre", ["un cône", "une pyramide", "une boule"]],
      ["Le sommet d'une pyramide est :", "le point commun à toutes les faces latérales", ["le centre de la base", "le milieu de la hauteur", "un sommet de la base"]],
      ["Une pyramide à base triangulaire a :", "$4$ faces, $6$ arêtes et $4$ sommets", ["$3$ faces, $3$ arêtes et $4$ sommets", "$4$ faces, $4$ arêtes et $4$ sommets", "$5$ faces, $6$ arêtes et $3$ sommets"]],
      ["Une génératrice d'un cône de révolution est un segment qui joint :", "le sommet à un point du cercle de base", ["le sommet au centre de la base", "deux points du cercle de base", "le centre de la base au cercle"]]
    ]);
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu, aides: ["Une pyramide : une base polygonale et des faces triangulaires qui se rejoignent au sommet.", "Un cône : une base en disque et un sommet.", "Imagine le solide déplié pour penser au patron."], solution: `Réponse : ${Q[1]}.` };
  };

  // coefficient exact de π : « 40\pi » si n/d est entier ou décimal court, sinon « \dfrac{160}{3}\pi »
  const coefPi4 = (n, d) => { const g = pgcd(n, d), a = n / g, b = d / g, q = a / b; return b === 1 ? `${a}\\pi` : Number.isInteger(q * 100) ? `${nb(q)}\\pi` : `\\dfrac{${a}}{${b}}\\pi`; };
  GEN["es4-volume"] = function () {
    const t = rand(0, 3);
    if (t === 0) { const c = rand(2, 12), h = rand(3, 15) * 3 / (Math.random() < 0.5 ? 1 : 3), v = (c * c * h) / 3;
      if (!Number.isInteger(v * 10)) return GEN["es4-volume"]();
      const ctx = pick(["une pyramide à base carrée", "un presse-papier en forme de pyramide à base carrée", "une boîte de bonbons coco en forme de pyramide à base carrée"]);
      return { enonce: `Calcule le volume d'${ctx} de côté $${c}$ cm et de hauteur $${nb(h)}$ cm.`, figure: pyramide4(4, { hauteur: true, cotes: [["A", "B", `${c} cm`, [0, 16]], ["S", "O", `${nbTexte(h)} cm`, [10, 0]]] }), mode: "nombre", prefixe: "Volume :", suffixe: "cm³", attendu: v,
        erreurs: [{ valeur: c * c * h, message: "N'oublie pas de diviser par $3$ : une pyramide a le tiers du volume du prisme de même base et même hauteur." }, { valeur: arr((4 * c * h) / 3, 4), message: "L'aire de la base d'un carré est côté $\\times$ côté, pas $4 \\times$ côté." }],
        aides: ["Volume d'une pyramide $= \\dfrac{\\text{aire de la base} \\times \\text{hauteur}}{3}$.", `Aire de la base : $${c}^2 = ${c * c}$ cm².`, `$\\dfrac{${c * c} \\times ${nb(h)}}{3}$.`], solution: `$V = \\dfrac{${c * c} \\times ${nb(h)}}{3} = ${nb(v)}$ cm³.` }; }
    if (t === 1) { const L = rand(3, 12), l = rand(2, 9), h = rand(2, 10) * 3, v = (L * l * h) / 3;
      if (L === l) return GEN["es4-volume"]();
      return { enonce: `Une pyramide a pour base un rectangle de $${L}$ cm sur $${l}$ cm et une hauteur de $${h}$ cm. Quel est son volume ?`, figure: pyramide4(4, { rect: [1.6, 1.1], hauteur: true, cotes: [["A", "B", `${L} cm`, [0, 16]], ["B", "C", `${l} cm`, [14, 6]], ["S", "O", `${h} cm`, [10, 0]]] }), mode: "nombre", prefixe: "Volume :", suffixe: "cm³", attendu: v,
        erreurs: [{ valeur: L * l * h, message: "Divise par $3$." }, { valeur: ((L + l) * 2 * h) / 3, message: "L'aire de la base est longueur $\\times$ largeur (pas le périmètre)." }],
        aides: ["$V = \\dfrac{B \\times h}{3}$.", `$B = ${L} \\times ${l} = ${L * l}$ cm².`, `$\\dfrac{${L * l} \\times ${h}}{3}$.`], solution: `$V = \\dfrac{${L * l} \\times ${h}}{3} = ${nb(v)}$ cm³.` }; }
    if (t === 2) { const r = rand(2, 10), h = rand(3, 15), v = arr((Math.PI * r * r * h) / 3, 1), diam = Math.random() < 0.4;
      return { enonce: `Calcule le volume d'un cône de révolution de ${diam ? `diamètre $${2 * r}$ cm` : `rayon $${r}$ cm`} et de hauteur $${h}$ cm, arrondi au dixième de cm³.`, figure: cone4([diam ? "" : `${r} cm`, `${h} cm`, ""], { aria: `Cône de révolution de sommet S ; ${diam ? `diamètre de la base ${2 * r} cm` : `rayon ${r} cm`}, hauteur ${h} cm` }), mode: "nombre", prefixe: "Volume :", suffixe: "cm³", attendu: v,
        erreurs: [{ valeur: arr(Math.PI * r * r * h, 1), message: "C'est le volume du cylindre : celui du cône est trois fois plus petit." }, diam ? { valeur: arr((Math.PI * 4 * r * r * h) / 3, 1), message: "Le rayon est la moitié du diamètre : utilise $r = " + r + "$ cm." } : { valeur: arr((Math.PI * 2 * r * h) / 3, 1), message: "L'aire de la base est $\\pi r^2$ (et non $2\\pi r$, qui est le périmètre du cercle)." }],
        aides: ["Volume d'un cône $= \\dfrac{\\pi r^2 \\times h}{3}$.", `Aire de la base : $\\pi \\times ${r}^2 = ${r * r}\\pi$ cm².`, `$\\dfrac{${r * r}\\pi \\times ${h}}{3}$.`], solution: `$V = \\dfrac{\\pi \\times ${r}^2 \\times ${h}}{3} = ${coefPi4(r * r * h, 3)} \\approx ${nb(v)}$ cm³.` }; }
    const a = rand(2, 8), b = rand(2, 8), h = rand(2, 10) * 3, v = (a * b * h) / 6;
    if (!Number.isInteger(v * 10)) return GEN["es4-volume"]();
    return { enonce: `Une pyramide a pour base un triangle rectangle dont les côtés de l'angle droit mesurent $${a}$ cm et $${b}$ cm. Sa hauteur mesure $${h}$ cm. Quel est son volume ?`, figure: polyedre4({ A: [0, 0, 0], B: [1.6, 0, 0], C: [0, 1.4, 0], S: [0, 0, 1.6] }, [["A", "C", "B"], ["S", "A", "B"], ["S", "B", "C"], ["S", "C", "A"]], { cotes: [["A", "B", `${a} cm`, [0, 16]], ["A", "C", `${b} cm`, [-14, 6]], ["S", "A", `${h} cm`, [-12, 0]]], droit: ["B", "A", "C"], aria: `Pyramide SABC : base ABC rectangle en A (${a} cm et ${b} cm), hauteur [SA] de ${h} cm` }), mode: "nombre", prefixe: "Volume :", suffixe: "cm³", attendu: v,
      erreurs: [{ valeur: (a * b * h) / 2, message: "L'aire de la base est bien $\\dfrac{a \\times b}{2}$, mais il faut aussi diviser le volume par $3$." }, { valeur: (a * b * h) / 3, message: "La base est un triangle : son aire est $\\dfrac{a \\times b}{2}$, pas $a \\times b$." }],
      aides: ["Calcule d'abord l'aire de la base triangulaire.", `$B = \\dfrac{${a} \\times ${b}}{2} = ${nb((a * b) / 2)}$ cm².`, `$V = \\dfrac{${nb((a * b) / 2)} \\times ${h}}{3}$.`], solution: `$B = ${nb((a * b) / 2)}$ cm² et $V = \\dfrac{${nb((a * b) / 2)} \\times ${h}}{3} = ${nb(v)}$ cm³.` };
  };

  GEN["es4-agrandir"] = function () {
    if (Math.random() < 0.3) { // retrouver le rapport, ou la mesure de départ
      const k = pick([2, 3, 4, 5, 10, 0.5]), t = rand(1, 2), x = rand(2, 20), y = arr(x * k ** (t + 1), 4), q = ["aires", "volumes"][t - 1], u = ["cm²", "cm³"][t - 1], ctx = pick(["une maquette de la mosquée de Tsingoni", "une maquette de boutre", "un modèle réduit de case mahoraise", "une maquette de phare"]);
      if (k < 1) return GEN["es4-agrandir"]();
      const dv = t === 2 ? "divisés" : "divisées";
      return { enonce: `Pour construire ${ctx}, on réduit toutes les longueurs : les ${q} sont ${dv} par $${nb(k ** (t + 1))}$. Par combien les longueurs sont-elles divisées ?`, mode: "nombre", prefixe: "Divisées par :", attendu: k,
        erreurs: [{ valeur: arr(k ** (t + 1) / (t + 1), 4), message: `Les ${q} sont ${dv} par $k^${t + 1}$ (et non par $${t + 1} \\times k$) : cherche le nombre dont la puissance $${t + 1}$ vaut $${nb(k ** (t + 1))}$.` }, { valeur: k ** (t + 1), message: "C'est le rapport des " + q + ", pas celui des longueurs." }],
        aides: [`Si les longueurs sont divisées par $k$, les ${q} sont ${dv} par $k^${t + 1}$.`, `On cherche $k$ tel que $k^${t + 1} = ${nb(k ** (t + 1))}$.`, `Essaie $k = 2$ : $2^${t + 1} = ${2 ** (t + 1)}$.`], solution: `$${k}^${t + 1} = ${nb(k ** (t + 1))}$ : les longueurs sont divisées par $${k}$.` };
    }
    const k = pick([2, 3, 4, 5, 0.5, 1.5, 2.5, 10, 0.1, 0.2]), t = rand(0, 2), x = rand(2, 30), q = ["longueurs", "aires", "volumes"][t], p = t + 1, v = arr(x * k ** p, 4), u = ["cm", "cm²", "cm³"][t];
    const fig = (k === 2 || k === 3) && t > 0 ? (t === 2 ? svg4(320, 176, `Un petit cube et un grand cube d'arête ${k} fois plus grande, formé de ${k ** 3} petits cubes`, cubesIso4([[1]], 26, 66, 100) + T4(66, 166, "arête 1", "g-mesure") + cubesIso4(Array.from({ length: k }, () => Array(k).fill(k)), 76 / k, 226, 160 - (76 / k) * k - 4) + T4(226, 168, `arête ${k}`, "g-mesure"))
      : svg4(320, 150, `Un petit carré et un grand carré de côté ${k} fois plus grand, formé de ${k * k} petits carrés`, R4(40, 80, 40, 40, "g-poly") + T4(60, 140, "côté 1", "g-mesure") + R4(160, 120 - 34 * k, 34 * k, 34 * k, "g-poly") + `<g class="g-grid">${Array.from({ length: k - 1 }, (_, i) => L4(160 + 34 * (i + 1), 120 - 34 * k, 160 + 34 * (i + 1), 120, "g-droite") + L4(160, 120 - 34 * (i + 1), 160 + 34 * k, 120 - 34 * (i + 1), "g-droite")).join("")}</g>` + T4(160 + 17 * k, 140, `côté ${k}`, "g-mesure"))) : undefined;
    const err = [[[x * k * k, "Les longueurs sont multipliées par $k$, pas par $k^2$ (ça, c'est pour les aires)."], [x + k, "On multiplie les longueurs par $k$ : on n'ajoute pas $k$."]],
      [[x * k, "Les aires sont multipliées par $k^2$, pas par $k$."], [x * k ** 3, "$k^3$, c'est pour les volumes : les aires sont multipliées par $k^2$."]],
      [[x * k, "Les volumes sont multipliés par $k^3$, pas par $k$."], [x * k * k, "$k^2$, c'est pour les aires : les volumes sont multipliés par $k^3$."]]][t].map(([w, m]) => ({ valeur: arr(w, 4), message: m }));
    return { enonce: `On ${k > 1 ? "agrandit" : "réduit"} un solide avec le rapport $${nb(k)}$. ${["Une arête mesure", "Une face a une aire de", "Le solide a un volume de"][t]} $${x}$ ${u}. Que devient cette mesure ?`, figure: fig, mode: "nombre", prefixe: "Nouvelle mesure :", suffixe: u, attendu: v,
      erreurs: err,
      aides: ["Dans un agrandissement ou une réduction de rapport $k$ : les longueurs sont multipliées par $k$.", "Les aires par $k^2$, les volumes par $k^3$.", `Ici, on multiplie par $${nb(k)}${p > 1 ? `^${p} = ${nb(arr(k ** p, 4))}` : ""}$.`], solution: `Les ${q} sont multipliées par $${nb(k)}${p > 1 ? `^${p} = ${nb(arr(k ** p, 4))}` : ""}$ : $${x} \\times ${nb(arr(k ** p, 4))} = ${nb(v)}$ ${u}.` };
  };

  GEN["es4-reperage"] = function () {
    const L = rand(2, 8), l = rand(2, 6), h = rand(2, 6);
    if (L === l || l === h || L === h) return GEN["es4-reperage"]();
    const S = { A: [0, 0, 0], B: [L, 0, 0], C: [L, l, 0], D: [0, l, 0], E: [0, 0, h], F: [L, 0, h], G: [L, l, h], H: [0, l, h] };
    const n = pick(["B", "C", "D", "E", "F", "G", "H"]), c = S[n], tx = (p) => `$(${p[0]} \\, ; \\, ${p[1]} \\, ; \\, ${p[2]})$`;
    const fausses = [[c[1], c[0], c[2]], [c[0], c[2], c[1]], [c[2], c[1], c[0]], [L, l, h]].map(tx).filter((z) => z !== tx(c));
    const { choix, attendu } = melange(tx(c), [...new Set(fausses)]);
    return { enonce: `$ABCDEFGH$ est un pavé droit : $ABCD$ est la face du bas et $E$, $F$, $G$, $H$ sont au-dessus de $A$, $B$, $C$, $D$. On a $AB = ${L}$, $AD = ${l}$ et $AE = ${h}$. Dans le repère d'origine $A$ (abscisse sur $[AB)$, ordonnée sur $[AD)$, altitude sur $[AE)$), quelles sont les coordonnées de $${n}$ ?`, figure: pave4(L, l, h, { cotes: PAVE_COTES(L, l, h), aria: `Pavé droit ABCDEFGH avec AB = ${L}, AD = ${l}, AE = ${h} ; origine A` }), mode: "choix", choix, attendu,
      aides: ["Un point de l'espace est repéré par trois nombres : (abscisse ; ordonnée ; altitude).", "Abscisse : déplacement le long de $[AB)$ ; ordonnée : le long de $[AD)$ ; altitude : vers le haut, le long de $[AE)$.", `Pour aller de $A$ à $${n}$, combien avance-t-on dans chaque direction ?`],
      solution: `Pour aller de $A$ à $${n}$ : $${c[0]}$ selon $[AB)$, $${c[1]}$ selon $[AD)$ et $${c[2]}$ vers le haut : $${n}${tx(c).slice(1)}.` };
  };

  /* =====================================================================
     Chapitre 7 : puissances (pw4-)
     ===================================================================== */
  const exp10 = (n) => `10^{${n}}`;

  /* Figures du chapitre 7 */
  // Arbre de multiplications successives : 1 → base → base² … (niveaux dessinés, puis « … »)
  // exposant écrit en petit et surélevé dans un texte SVG (police ≥ 8 px)
  const expT = (base, e) => `${base}<tspan dy="-5" font-size="8">${e < 0 ? "−" : ""}${Math.abs(e)}</tspan><tspan dy="5"> </tspan>`;
  function arbrePuiss4(base, niv) {
    const H = 34 + niv * 34, cx = 188, L = 244; let s = "", pts = [[cx, 16]];
    for (let l = 1; l <= niv; l++) {
      const n = base ** l, y = 16 + l * 34, w = Math.min(28, L / n), next = [];
      for (let i = 0; i < n; i++) { const x = cx + (i - (n - 1) / 2) * w, p = pts[Math.floor(i / base)]; s += L4(p[0], p[1] + 4, x, y - 4, "g-guide"); next.push([x, y]); }
      pts = next;
      s += T4(8, y + 4, `${expT(base, l)}= ${n}`, "g-mesure", "start");
    }
    let dots = ""; for (let l = 0; l <= niv; l++) { const n = base ** l, y = 16 + l * 34, w = Math.min(28, L / n); for (let i = 0; i < n; i++) dots += C4(cx + (i - (n - 1) / 2) * w, y, Math.min(5, w / 3), "g-point"); }
    return svg4(320, H, `Arbre : à chaque étape, chaque point en donne ${base} ; ${Array.from({ length: niv }, (_, l) => `${base ** (l + 1)}`).join(", ")} points`, s + dots + T4(8, 20, "1", "g-mesure", "start"));
  }
  // Échelle des puissances de 10 de 10^a à 10^b, avec des étiquettes [exposant, texte] et un exposant marqué « ? »
  function echelle10(a, b, labs, marque) {
    const x0 = 22, x1 = 300, X = (e) => x0 + ((x1 - x0) * (e - a)) / (b - a);
    let s = L4(x0 - 8, 70, x1 + 8, 70, "g-droite") + `<path class="g-end" d="M${x1 + 14} 70 l-8 -4 v8z"/>`;
    for (let e = a; e <= b; e++) s += L4(X(e), 64, X(e), 76, "g-graduation") + (e % (b - a > 12 ? 3 : 1) === 0 || e === marque ? T4(X(e), 94, e === marque ? "?" : expT(10, e), e === marque ? "g-hlabel" : "g-label") : "");
    (labs || []).forEach(([e, t], i) => { s += L4(X(e), 52 - (i % 2) * 18, X(e), 64, "g-guide") + T4(X(e), 46 - (i % 2) * 18, t, "g-label"); });
    return svg4(320, 100, `Échelle des puissances de 10, de 10 puissance ${a} à 10 puissance ${b}${labs ? " : " + labs.map(([e, t]) => `${t} vers 10 puissance ${e}`).join(", ") : ""}`, s);
  }
  FIGURES["pw4-cours-arbre"] = () => arbrePuiss4(2, 4);
  FIGURES["pw4-cours-dix"] = () => echelle10(-3, 3, [[-3, "0,001"], [-2, "0,01"], [-1, "0,1"], [0, "1"], [1, "10"], [2, "100"], [3, "1 000"]]);
  FIGURES["pw4-cours-tailles"] = () => echelle10(-9, 9, [[-9, "molécule"], [-7, "virus"], [-5, "cellule"], [-3, "fourmi"], [0, "élève"], [2, "Choungui"], [4, "Mayotte"], [7, "Terre"], [9, "Soleil"]]);
  FIGURES["pw4-cours-prefixes"] = () => echelle10(-9, 9, [[-9, "nano"], [-6, "micro"], [-3, "milli"], [0, "unité"], [3, "kilo"], [6, "méga"], [9, "giga"]]);
  FIGURES["pw4-qcm-arbre"] = () => arbrePuiss4(3, 3);

  GEN["pw4-calcul"] = function () {
    const t = rand(0, 6);
    if (t === 0) { let a, n; do { a = rand(2, 10); n = rand(2, 6); } while (a ** n > 100000 || (a === 10 && n > 5));
      const v = a ** n;
      return { enonce: `Calcule $${a}^{${n}}$.`, mode: "nombre", prefixe: "Résultat :", attendu: v, erreurs: [{ valeur: a * n, message: `$${a}^{${n}}$ est un produit de $${n}$ facteurs égaux à $${a}$, pas $${a} \\times ${n}$.` }, { valeur: n ** a, message: `Attention à l'ordre : $${a}^{${n}}$ n'est pas $${n}^{${a}}$.` }],
        aides: [`$${a}^{${n}} = ${Array(n).fill(a).join(" \\times ")}$.`, "Calcule de proche en proche.", `$${a}^2 = ${a * a}$.`], solution: `$${a}^{${n}} = ${Array(n).fill(a).join(" \\times ")} = ${nb(v)}$.` }; }
    if (t === 1) { const a = rand(2, 6), n = rand(2, 5), par = Math.random() < 0.5, v = par ? (-a) ** n : -(a ** n);
      return { enonce: `Calcule $${par ? `(-${a})` : `-${a}`}^{${n}}$.`, mode: "nombre", prefixe: "Résultat :", attendu: v, erreurs: [{ valeur: -v, message: par ? "Avec les parenthèses, la puissance porte sur $-" + a + "$ : compte les facteurs négatifs." : "Sans parenthèses, la puissance ne porte que sur $" + a + "$ ; le signe $-$ reste devant." }, { valeur: -a * n, message: `Une puissance n'est pas une multiplication par l'exposant : $${a}^{${n}} \\neq ${a} \\times ${n}$.` }],
        aides: [par ? `$(-${a})^{${n}}$ est le produit de $${n}$ facteurs égaux à $-${a}$.` : `$-${a}^{${n}} = -(${a}^{${n}})$.`, par ? "Un nombre pair de facteurs négatifs donne un résultat positif." : "Calcule d'abord la puissance de " + a + ".", `$${a}^{${n}} = ${nb(a ** n)}$.`], solution: `$${par ? `(-${a})` : `-${a}`}^{${n}} = ${rel(v)}$.` }; }
    if (t === 2) { const a = pick([1, 1, 1, rand(2, 9), rand(11, 99) / 10]), n = rand(1, Number.isInteger(a) ? 5 : 4), neg = Math.random() < 0.7, v = arr(a * 10 ** (neg ? -n : n), 8), tx = `${a === 1 ? "" : `${nb(a)} \\times `}10^{${neg ? "-" : ""}${n}}`;
      return { enonce: `Écris $${tx}$ en écriture décimale.`, mode: "nombre", prefixe: "Résultat :", attendu: v,
        erreurs: neg ? [{ valeur: -arr(a * 10 ** n, 8), message: "Un exposant négatif ne rend pas le nombre négatif : $10^{-n} = \\dfrac{1}{10^n}$." }, { valeur: arr(a * 10 ** -(n + 1), 9), message: `Compte les rangs : multiplier par $10^{-${n}}$, c'est déplacer la virgule de $${n}$ rang${n > 1 ? "s" : ""} vers la gauche.` }] : [{ valeur: arr(a * 10 ** (n - 1), 8), message: `Compte les rangs : multiplier par $10^{${n}}$, c'est déplacer la virgule de $${n}$ rang${n > 1 ? "s" : ""} vers la droite.` }, { valeur: arr(a * 10 * n, 8), message: `$10^{${n}}$ n'est pas $10 \\times ${n}$.` }],
        aides: [neg ? "$10^{-n} = \\dfrac{1}{10^n}$ : multiplier par $10^{-n}$, c'est diviser par $10^n$." : "$10^{n}$ s'écrit avec un $1$ suivi de $n$ zéros.", neg ? `$10^{-${n}} = ${nb(10 ** -n)}$.` : `$10^{${n}} = ${nb(10 ** n)}$.`, `On déplace la virgule de $${n}$ rang${n > 1 ? "s" : ""} vers la ${neg ? "gauche" : "droite"}.`], solution: `$${tx} = ${a === 1 ? "" : `${nb(a)} \\times `}${nb(10 ** (neg ? -n : n))} = ${nb(v)}$.` }; }
    if (t === 3) { const a = rand(2, 9), n = rand(1, 3), m = rand(2, 5), v = a * 10 ** n + m ** 2;
      return { enonce: `Calcule $${a} \\times 10^{${n}} + ${m}^2$.`, mode: "nombre", prefixe: "Résultat :", attendu: v,
        erreurs: [{ valeur: a * 10 ** n + 2 * m, message: `$${m}^2 = ${m} \\times ${m}$, et non $${m} \\times 2$.` }, { valeur: a * 10 * n + m * m, message: `$10^{${n}}$ n'est pas $10 \\times ${n}$ : c'est $${nb(10 ** n)}$.` }],
        aides: ["Les puissances sont prioritaires.", `$10^{${n}} = ${nb(10 ** n)}$ et $${m}^2 = ${m * m}$.`, "Puis la multiplication, et enfin l'addition."], solution: `$${a} \\times ${nb(10 ** n)} + ${m * m} = ${nb(a * 10 ** n)} + ${m * m} = ${nb(v)}$.` }; }
    if (t === 4) { const a = pick([rand(2, 99), -rand(2, 9)]), e = rand(0, 1), v = e ? a : 1, tx = a < 0 ? `(${a})` : `${a}`;
      return { enonce: `Calcule $${tx}^{${e}}$.`, mode: "nombre", prefixe: "Résultat :", attendu: v, erreurs: [{ valeur: e ? 1 : 0, message: e ? `Un nombre à la puissance $1$ est égal à lui-même : $${tx}^1 = ${a}$.` : "Par convention, tout nombre non nul à la puissance $0$ vaut $1$ (et non $0$)." }, { valeur: e ? 0 : a, message: e ? "$a^1 = a$." : `$a^0 = 1$ pour tout $a$ non nul (et non $a$).` }],
        aides: ["$a^1 = a$ et, pour $a$ non nul, $a^0 = 1$.", "Ce sont des conventions : elles prolongent les règles de calcul ($a^2 \\div a^2 = a^0 = 1$).", e ? `$${tx}^1 = ${a}$.` : `$${tx}^0 = 1$.`], solution: e ? `$${tx}^1 = ${rel(a)}$ : un nombre à la puissance $1$ est égal à lui-même.` : `$${tx}^0 = 1$ : tout nombre non nul à la puissance $0$ vaut $1$.` }; }
    if (t === 5) { // produit ou quotient de puissances de même base (par la définition)
      const a = rand(2, 9), m = rand(2, 6), n = rand(2, 5), prod = Math.random() < 0.6;
      if (!prod && m <= n) return GEN["pw4-calcul"]();
      const v = prod ? m + n : m - n;
      return { enonce: `Écris ${prod ? `$${a}^{${m}} \\times ${a}^{${n}}$` : `$\\dfrac{${a}^{${m}}}{${a}^{${n}}}$`} sous la forme $${a}^p$. Quelle est la valeur de $p$ ?`, mode: "nombre", prefixe: "$p =$", attendu: v,
        erreurs: prod ? [{ valeur: m * n, message: `On compte les facteurs : $${m} + ${n}$ facteurs égaux à $${a}$ (on ne multiplie pas les exposants).` }, { valeur: m - n === 0 ? 1 : Math.abs(m - n), message: "Dans un produit, les facteurs s'ajoutent." }] : [{ valeur: m + n, message: "Dans un quotient, on simplifie : les exposants se soustraient." }, { valeur: arr(m / n, 4), message: "On ne divise pas les exposants : on enlève les facteurs communs." }],
        aides: [prod ? `$${a}^{${m}} \\times ${a}^{${n}} = \\underbrace{${a} \\times \\cdots \\times ${a}}_{${m}} \\times \\underbrace{${a} \\times \\cdots \\times ${a}}_{${n}}$.` : `On simplifie par $${n}$ facteurs égaux à $${a}$.`, prod ? `Il y a $${m} + ${n}$ facteurs égaux à $${a}$.` : `Il reste $${m} - ${n}$ facteurs au numérateur.`, `$p = ${prod ? `${m} + ${n}` : `${m} - ${n}`}$.`],
        solution: prod ? `$${a}^{${m}} \\times ${a}^{${n}}$ est un produit de $${m} + ${n} = ${v}$ facteurs égaux à $${a}$ : $p = ${v}$.` : `On simplifie $${n}$ facteurs égaux à $${a}$ : il en reste $${m} - ${n} = ${v}$, donc $p = ${v}$.` };
    }
    // t === 6 : problème de doublements (ou triplements)
    const b = pick([2, 2, 3]), n = rand(3, b === 2 ? 10 : 6), nom = pick(PRENOMS4), C = pick([
      [`Une bactérie se divise en ${b === 2 ? "deux" : "trois"} toutes les heures. On part d'une seule bactérie.`, `Combien y a-t-il de bactéries au bout de $${n}$ heures ?`, "bactéries"],
      [`${nom} envoie un message à ${b === 2 ? "deux" : "trois"} amis ; chacun le transfère le lendemain à ${b === 2 ? "deux" : "trois"} nouvelles personnes, et ainsi de suite.`, `Combien de personnes reçoivent le message le $${n}$e jour ?`, "personnes"],
      [`On plie une feuille en deux, puis encore en deux, et ainsi de suite.`, `Combien d'épaisseurs de papier obtient-on après $${n}$ pliages ?`, "épaisseurs"]]);
    if (C[2] === "épaisseurs" && b === 3) return GEN["pw4-calcul"]();
    const v = b ** n;
    return { enonce: `${C[0]} ${C[1]}`, figure: arbrePuiss4(b, Math.min(3, n - 1)), mode: "nombre", prefixe: "Réponse :", suffixe: C[2], attendu: v,
      erreurs: [{ valeur: b * n, message: `On ne multiplie pas $${b}$ par $${n}$ : à chaque étape, le nombre est multiplié par $${b}$, soit $${b}^{${n}}$.` }, { valeur: b ** (n - 1), message: "Compte bien les étapes : il y en a " + n + "." }],
      aides: [`À chaque étape, le nombre est multiplié par $${b}$.`, `Après $${n}$ étapes : $${Array(Math.min(n, 4)).fill(b).join(" \\times ")}${n > 4 ? " \\times \\cdots" : ""} = ${b}^{${n}}$.`, `Calcule $${b}^{${n}}$.`], solution: `Le nombre est multiplié par $${b}$ à chaque étape : au bout de $${n}$ étapes, $${b}^{${n}} = ${nb(v)}$ ${C[2]}.` };
  };

  GEN["pw4-dix"] = function () {
    const t = rand(0, 2), a = rand(-6, 9), b = rand(-6, 9);
    const Q = [[`${exp10(a)} \\times ${exp10(b)}`, a + b, `$10^m \\times 10^n = 10^{m + n}$ : on additionne les exposants.`, a * b], [`\\dfrac{${exp10(a)}}{${exp10(b)}}`, a - b, `$\\dfrac{10^m}{10^n} = 10^{m - n}$ : on soustrait les exposants.`, a + b], [`(${exp10(a)})^{${Math.abs(b) % 4 + 2}}`, a * (Math.abs(b) % 4 + 2), "$(10^m)^p = 10^{m \\times p}$ : on multiplie les exposants.", a + (Math.abs(b) % 4 + 2)]][t];
    const e2 = [a - b, a + b, a * (Math.abs(b) % 4 + 2) + 1][t];
    return { enonce: `Écris sous la forme $10^n$ : $${Q[0]}$. Quel est l'exposant $n$ ?`, mode: "nombre", prefixe: "$n =$", attendu: Q[1],
      erreurs: [{ valeur: Q[3], message: ["Dans un produit de puissances de $10$, on **additionne** les exposants.", "Dans un quotient, on **soustrait** l'exposant du dénominateur.", "Pour une puissance de puissance, on **multiplie** les exposants."][t] }, { valeur: e2, message: t === 0 ? "Attention aux signes : on ajoute les exposants, avec la règle des relatifs." : t === 1 ? `Attention aux signes : $${a} - (${b})$.` : "Compte les facteurs : $(10^m)^p$ contient $p$ fois $10^m$." }],
      aides: [Q[2], "Attention aux exposants négatifs : applique les règles des relatifs.", "Vérifie avec de petits exposants : $10^2 \\times 10^3 = 100 \\times 1\\,000 = 10^5$."], solution: `${Q[2]} $${Q[0]} = 10^{${Q[1]}}$.` };
  };

  GEN["pw4-scientifique"] = function () {
    if (Math.random() < 0.3) { // comparer deux nombres en notation scientifique, ou situer un ordre de grandeur
      if (Math.random() < 0.5) {
        const m1 = rand(11, 99) / 10, m2 = rand(11, 99) / 10, e1 = rand(-6, 9), e2 = e1 + pick([-2, -1, 1, 2, 0]), v1 = m1 * 10 ** e1, v2 = m2 * 10 ** e2;
        if (v1 === v2) return GEN["pw4-scientifique"]();
        const T1 = `${nb(m1)} \\times 10^{${e1}}`, T2 = `${nb(m2)} \\times 10^{${e2}}`, g = v1 > v2;
        const { choix, attendu } = melange(`$${g ? T1 : T2}$`, [`$${g ? T2 : T1}$`, "Ils sont égaux", "On ne peut pas comparer sans calculatrice"]);
        return { enonce: `Quel est le plus grand de ces deux nombres : $${T1}$ et $${T2}$ ?`, mode: "choix", choix, attendu,
          aides: ["En notation scientifique, on compare d'abord les exposants : le plus grand exposant donne le plus grand nombre (pour des nombres positifs).", "Si les exposants sont égaux, on compare les premiers facteurs.", e1 === e2 ? "Ici, les exposants sont égaux." : `Ici, les exposants sont $${e1}$ et $${e2}$.`],
          solution: e1 === e2 ? `Les exposants sont égaux, on compare $${nb(m1)}$ et $${nb(m2)}$ : le plus grand nombre est $${g ? T1 : T2}$.` : `$${Math.max(e1, e2)} > ${Math.min(e1, e2)}$ : le plus grand nombre est $${g ? T1 : T2}$ (les premiers facteurs sont entre $1$ et $10$).` };
      }
      const objets = [[-10, "un atome"], [-7, "un virus"], [-5, "une bactérie"], [-3, "une fourmi"], [0, "un élève de 4e"], [2, "le Mont Choungui (en hauteur)"], [4, "l'île de Mayotte (sa longueur)"], [7, "la Terre (son diamètre)"]], [e, obj] = pick(objets);
      const { choix, attendu } = melange(`$10^{${e}}$ m`, objets.filter(([x]) => Math.abs(x - e) >= 2).map(([x]) => `$10^{${x}}$ m`).sort(() => Math.random() - 0.5));
      return { enonce: `Quel est l'ordre de grandeur de la taille de ${obj} ?`, figure: echelle10(-10, 8, null, e), mode: "choix", choix, attendu,
        aides: ["$10^0$ m $= 1$ m : c'est l'ordre de grandeur de la taille d'un élève.", "Chaque fois que l'exposant augmente de $1$, la taille est multipliée par $10$.", "Les objets microscopiques ont des exposants négatifs."], solution: `La taille de ${obj} est de l'ordre de $10^{${e}}$ m.` };
    }
    const m = Dc(rand(11, 99), 1), e = rand(-5, 9), v = (m.m / 10) * 10 ** e, t = rand(0, 1);
    if (Math.abs(e) <= 2 && Math.random() < 0.6) return GEN["pw4-scientifique"]();
    const ecr = nb(+v.toPrecision(2));
    if (t === 0) {
      const bonne = `$${tD(m)} \\times 10^{${e}}$`, faux = [`$${m.m} \\times 10^{${e - 1}}$`, `$${tD(m)} \\times 10^{${e + 1}}$`, `$${tD(m)} \\times 10^{${-e}}$`, `$${nb(m.m / 100)} \\times 10^{${e + 1}}$`].filter((z) => z !== bonne);
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `Quelle est l'écriture scientifique de $${ecr}$ ?`, mode: "choix", choix, attendu,
        aides: ["L'écriture scientifique est $a \\times 10^n$ avec $1 \\leq a < 10$ (un seul chiffre non nul avant la virgule).", "Déplace la virgule pour obtenir un nombre entre $1$ et $10$.", "Compte de combien de rangs tu l'as déplacée : c'est l'exposant (négatif si le nombre est plus petit que $1$)."],
        solution: `$${ecr} = ${tD(m)} \\times 10^{${e}}$ : $${tD(m)}$ est bien compris entre $1$ et $10$.` };
    }
    return { enonce: `On écrit $${ecr} = ${tD(m)} \\times 10^{n}$. Quelle est la valeur de $n$ ?`, mode: "nombre", prefixe: "$n =$", attendu: e,
      erreurs: [{ valeur: -e, message: e > 0 ? "Le nombre est plus grand que $10$ : l'exposant est positif." : "Le nombre est plus petit que $1$ : l'exposant est négatif." }],
      aides: ["Pour passer de " + tD(m).replace(/\{,\}/, ",") + " au nombre, on multiplie par une puissance de $10$.", "Compte de combien de rangs la virgule se déplace.", e > 0 ? "Vers la droite : exposant positif." : "Vers la gauche : exposant négatif."], solution: `$${ecr} = ${tD(m)} \\times 10^{${e}}$, donc $n = ${e}$.` };
  };

  const PREF = [["giga", "G", 9], ["méga", "M", 6], ["kilo", "k", 3], ["milli", "m", -3], ["micro", "µ", -6], ["nano", "n", -9]];
  GEN["pw4-prefixes"] = function () {
    const t = rand(0, 3), [nom, sym, e] = pick(PREF);
    if (t === 3) { // quel préfixe pour une puissance de 10 donnée ?
      const { choix, attendu } = melange(`${nom} (${sym})`, shuffle(PREF.filter((p) => p[2] !== e)).slice(0, 3).map(([n2, s2]) => `${n2} (${s2})`));
      return { enonce: `Quel préfixe correspond à $10^{${e}}$ ?`, figure: echelle10(-9, 9, PREF.filter((p) => p[2] !== e).map(([n2, , e2]) => [e2, n2]), e), mode: "choix", choix, attendu,
        aides: ["Les préfixes vont de $3$ en $3$ : $10^{3}$, $10^{6}$, $10^{9}$ pour les grandes unités.", "$10^{-3}$, $10^{-6}$, $10^{-9}$ pour les petites unités.", "kilo, méga, giga ; milli, micro, nano."], solution: `$10^{${e}}$ correspond au préfixe ${nom} (${sym}).` };
    }
    if (t === 0) { const u = pick([["mètre", "m"], ["octet", "o"], ["gramme", "g"], ["watt", "W"], ["seconde", "s"]]);
      return { enonce: `Le préfixe « ${nom} » (${sym}), comme dans ${nom}${u[0]} (${sym}${u[1]}), correspond à quelle puissance de $10$ ? Donne l'exposant.`, mode: "nombre", prefixe: "Exposant :", attendu: e,
        erreurs: [{ valeur: -e, message: "Attention au signe : les préfixes des grandes unités ont des exposants positifs, ceux des petites des exposants négatifs." }, { valeur: e / 3, message: "Les préfixes vont de $3$ en $3$ : kilo $= 10^3$, méga $= 10^6$, giga $= 10^9$." }],
        aides: ["kilo $= 10^3$, méga $= 10^6$, giga $= 10^9$.", "milli $= 10^{-3}$, micro $= 10^{-6}$, nano $= 10^{-9}$.", "Les préfixes vont de $3$ en $3$."], solution: `« ${nom} » signifie $10^{${e}}$ : $1$ ${sym}${u[1]} $= 10^{${e}}$ ${u[1]}.` }; }
    const u = pick([["m", "mètres"], ["o", "octets"], ["g", "grammes"], ["W", "watts"], ["s", "secondes"]]), x = rand(2, 900);
    if (t === 1) return { enonce: `Combien ${deM4(u[1])} représentent $${x}$ ${sym}${u[0]} ? Écris le résultat sous la forme $${x} \\times 10^n$ et donne $n$.`, mode: "nombre", prefixe: "$n =$", attendu: e,
      erreurs: [{ valeur: -e, message: `Attention au signe : « ${nom} » ${e > 0 ? "agrandit" : "réduit"} l'unité, l'exposant est ${e > 0 ? "positif" : "négatif"}.` }, { valeur: e / 3, message: "Les préfixes vont de $3$ en $3$ : kilo $= 10^3$, méga $= 10^6$, giga $= 10^9$." }],
      aides: [`Le préfixe ${nom} vaut $10^{${e}}$.`, `$${x}$ ${sym}${u[0]} $= ${x} \\times 10^{${e}}$ ${u[0]}.`, "L'exposant est celui du préfixe."], solution: `$${x}$ ${sym}${u[0]} $= ${x} \\times 10^{${e}}$ ${u[0]}.` };
    const [n2, s2, e2] = pick(PREF.filter((p) => p[2] !== e && Math.abs(p[2] - e) <= 9)), d = e - e2;
    return { enonce: `Convertis : $1$ ${sym}${u[0]} $= 10^n$ ${s2}${u[0]}. Quelle est la valeur de $n$ ?`, mode: "nombre", prefixe: "$n =$", attendu: d,
      erreurs: [{ valeur: -d, message: "Vérifie le sens : l'unité la plus grande contient beaucoup d'unités plus petites." }, { valeur: e + e2, message: "On **soustrait** les exposants (quotient de puissances de $10$), on ne les additionne pas." }],
      aides: [`$1$ ${sym}${u[0]} $= 10^{${e}}$ ${u[0]} et $1$ ${s2}${u[0]} $= 10^{${e2}}$ ${u[0]}.`, `$\\dfrac{10^{${e}}}{10^{${e2}}} = 10^{${e} - (${e2})}$.`, "Soustrais les exposants."], solution: `$1$ ${sym}${u[0]} $= \\dfrac{10^{${e}}}{10^{${e2}}}$ ${s2}${u[0]} $= 10^{${d}}$ ${s2}${u[0]}.` };
  };

  /* =====================================================================
     Chapitre 8 : théorème de Thalès dans le triangle (th4-)
     ===================================================================== */
  const NOMS_TH = [["A", "M", "N", "B", "C"], ["E", "F", "G", "H", "K"], ["O", "R", "S", "T", "U"], ["S", "I", "J", "K", "L"]];
  // Cinq lettres distinctes au hasard : sommet commun, deux points du petit côté, deux du grand
  const nomsTh4 = () => (Math.random() < 0.4 ? pick(NOMS_TH) : shuffle("ABCDEFGHIJKLMNPRSTUV".split("")).slice(0, 5));
  /* Triangles emboîtés de sommet A : M ∈ [AB] et N ∈ [AC] avec AM = k × AB (k < 1 : réduction ; k > 1 : M et N au-delà de B et C).
     labs : { AM, MB, AB, AN, NC, AC, MN, BC } (textes facultatifs, placés hors du triangle) */
  function figureThales(noms, k, labs, o) {
    o = o || {};
    const [A, M, N, B, C] = noms, f = o.forme || [[150, 18], [40, 182], [290, 176]], s0 = k > 1 ? 1 / k : 1;
    const pA = f[0], base = (p, t) => [pA[0] + t * (p[0] - pA[0]), pA[1] + t * (p[1] - pA[1])].map((v) => +v.toFixed(1));
    const pB = base(f[1], s0), pC = base(f[2], s0), pM = base(pB, k), pN = base(pC, o.kN || k);
    const loin = (k > 1 ? [M, N] : [B, C]);
    const pts = { [A]: pA, [B]: pB, [C]: pC, [M]: pM, [N]: pN }, G = [(pA[0] + f[1][0] + f[2][0]) / 3, (pA[1] + f[1][1] + f[2][1]) / 3];
    let s = geo({ W: 320, H: 206, pts, segs: [[A, loin[0]], [A, loin[1]], [B, C], ...(o.pointille ? [] : [[M, N]])], decal: { [A]: [-4, -6], [B]: [k > 1 ? -16 : -12, k > 1 ? 2 : 8], [C]: [k > 1 ? 8 : 6, k > 1 ? 2 : 8], [M]: [k > 1 ? -12 : -16, k > 1 ? 8 : 2], [N]: [k > 1 ? 6 : 8, k > 1 ? 8 : 2] }, aria: `Triangles emboîtés de sommet ${A} : ${M} sur la droite (${A}${B}), ${N} sur la droite (${A}${C}), (${M}${N}) parallèle à (${B}${C})${k > 1 ? ` ; ${M} et ${N} sont au-delà de ${B} et ${C}` : ""}` });
    // texte le long d'un segment (côté extérieur) ; « cote » : longueur totale, avec une ligne de cote décalée
    const t = (p, q, txt, int, cote) => { if (!txt) return ""; const m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2], dx = q[1] - p[1], dy = p[0] - q[0], L = Math.hypot(dx, dy) || 1; let ux = dx / L, uy = dy / L; if ((m[0] + ux - G[0]) ** 2 + (m[1] + uy - G[1]) ** 2 < (m[0] - G[0]) ** 2 + (m[1] - G[1]) ** 2 !== !!int) { ux = -ux; uy = -uy; }
      const d = cote ? 38 : 14, mc = cote ? [p[0] + 0.72 * (q[0] - p[0]), p[1] + 0.72 * (q[1] - p[1])] : m, ligne = cote ? L4(p[0] + ux * 30, p[1] + uy * 30, q[0] + ux * 30, q[1] + uy * 30, "g-guide") + L4(p[0] + ux * 25, p[1] + uy * 25, p[0] + ux * 35, p[1] + uy * 35, "g-guide") + L4(q[0] + ux * 25, q[1] + uy * 25, q[0] + ux * 35, q[1] + uy * 35, "g-guide") : "";
      return ligne + T4(mc[0] + ux * (d + 4), mc[1] + uy * (d + 4) + 4, txt, "g-mesure", Math.abs(ux) < 0.3 ? "middle" : ux > 0 ? "start" : "end"); };
    const l = labs || {}, petit = k < 1;
    return s.replace("</svg>", (o.pointille ? L4(...pM, ...pN, "g-guide") : "") + t(pA, pM, l.AM, false, !petit && l.AB) + t(pM, pB, l.MB) + t(pA, pB, l.AB, false, petit && l.AM) + t(pA, pN, l.AN, false, !petit && l.AC) + t(pN, pC, l.NC) + t(pA, pC, l.AC, false, petit && l.AN) + t(pM, pN, l.MN, k < 1) + t(pB, pC, l.BC, k > 1) + "</svg>");
  }
  FIGURES["th4-figure"] = () => figureThales(["A", "M", "N", "B", "C"], 0.4, { AM: "2", MB: "3" });
  FIGURES["th4-cours-agrandi"] = () => figureThales(["A", "M", "N", "B", "C"], 1.6, {});
  FIGURES["th4-cours-reciproque"] = () => figureThales(["A", "M", "N", "B", "C"], 0.4, { AM: "4", AB: "10", AN: "6", AC: "15" }, { pointille: true });
  FIGURES["th4-qcm-longueurs"] = () => figureThales(["A", "M", "N", "B", "C"], 1 / 3, { AM: "2", AB: "6", BC: "9", MN: "?" });
  FIGURES["th4-meth"] = () => figureThales(["A", "M", "N", "B", "C"], 0.4, { AM: "4", AB: "10", MN: "?", BC: "6" });
  FIGURES["th4-meth-ombre"] = () => ombres4(1.5, 2, 6, 8, ["h", "1,5 m", "8 m", "2 m"]);
  // Ombres : un bâton et un objet vertical, rayons du soleil parallèles
  function ombres4(b, o, H, O, noms) {
    const k = Math.min(250 / (O + 0.4), 140 / H), x0 = 30, y0 = 168, xs = x0 + (O + 0.0) * k, X1 = x0 + (O - o) * k;
    let s = L4(10, y0, 312, y0, "g-droite") + L4(x0, y0, x0, y0 - H * k, "g-segment") + L4(X1, y0, X1, y0 - b * k, "g-segment") + L4(x0, y0 - H * k, xs, y0, "g-hline") + L4(X1, y0 - b * k, xs, y0, "g-hline");
    s += T4(x0 - 4, y0 - (H * k) / 2, noms[0], "g-mesure", "end") + T4(X1 - 4, y0 - (b * k) / 2 + 4, noms[1], "g-mesure", "end") + T4((x0 + xs) / 2, y0 + 16, noms[2], "g-mesure") + T4((X1 + xs) / 2, y0 - 6, noms[3], "g-mesure");
    s += C4(xs, y0, 3) + `<path class="g-code" d="M${f1(x0 + 8)} ${y0} V${y0 - 8} H${x0}"/>`;
    return svg4(320, 192, `Schéma : un objet vertical (${noms[0]}) et un bâton vertical (${noms[1]}) ; leurs ombres se terminent au même point, les rayons du soleil sont parallèles`, s);
  }

  GEN["th4-longueur"] = function () {
    for (let e = 0; e < 300; e++) {
      const N = nomsTh4(), [A, M, Np, B, C] = N, agr = Math.random() < 0.3, num = rand(1, 4), den = rand(num + 1, 6), k = agr ? den / num : num / den;
      const u = (agr ? num : den) / pgcd(num, den), AB = rand(2, 9) * u * (Math.random() < 0.5 ? 1 : 0.5), AC = rand(2, 9) * u, BC = rand(2, 9) * u;
      const AM = AB * k, AN = AC * k, MN = BC * k;
      if (![AM, AN, MN, AB].every((x) => Number.isInteger(arr(x * 10, 6))) || AM > 40 || MN > 40) continue;
      const t = rand(0, 2);
      const vals = { AM, AB, AN, AC, MN, BC }, nomsL = { AM: A + M, AB: A + B, AN: A + Np, AC: A + C, MN: M + Np, BC: B + C };
      const [cherche, donnes] = [["AN", ["AM", "AB", "AC"]], ["MN", ["AM", "AB", "BC"]], ["AC", ["AM", "AB", "AN"]]][t];
      const L = (x) => `${nb(x)}`, texte = donnes.map((d) => `$${nomsL[d]} = ${L(vals[d])}$ cm`).join(", "), rep = vals[cherche];
      const figLabs = {}; donnes.forEach((d) => (figLabs[d] = `${nbTexte(vals[d])}`)); figLabs[cherche] = "?";
      const r1 = `\\dfrac{${nomsL.AM}}{${nomsL.AB}}`, r2 = `\\dfrac{${nomsL.AN}}{${nomsL.AC}}`, r3 = `\\dfrac{${nomsL.MN}}{${nomsL.BC}}`;
      const inv = t === 2 ? (AN * AM) / AB : t === 0 ? (AC * AB) / AM : (BC * AB) / AM, mb = Math.abs(AB - AM);
      const er = [{ valeur: arr(inv, 4), message: "Le rapport est à l'envers : chaque rapport s'écrit « côté du triangle " + (agr ? `$${A}${M}${Np}$` : `$${A}${M}${Np}$`) + " sur côté correspondant de $" + A + B + C + "$ »." }, ...(mb > 0 ? [{ valeur: arr(t === 2 ? (AN * mb) / AM : ((t === 0 ? AC : BC) * AM) / mb, 4), message: `On utilise $${nomsL.AB}$ (la longueur entière), et non $${B}${M}$.` }] : [])];
      return { enonce: `Les points $${A}$, $${M}$, $${B}$ sont alignés, ainsi que $${A}$, $${Np}$, $${C}$, ${agr ? `avec $${B} \\in [${A}${M}]$ et $${C} \\in [${A}${Np}]$` : `avec $${M} \\in [${A}${B}]$ et $${Np} \\in [${A}${C}]$`}. Les droites $(${M}${Np})$ et $(${B}${C})$ sont parallèles. On sait que ${texte}. Calcule $${nomsL[cherche]}$.`, figure: figureThales(N, k, figLabs), mode: "nombre", prefixe: `$${nomsL[cherche]} =$`, suffixe: "cm", attendu: rep, erreurs: er,
        aides: ["Les droites sont parallèles : on peut appliquer le théorème de Thalès.", `$${r1} = ${r2} = ${r3}$.`, `Utilise l'égalité qui contient $${nomsL[cherche]}$ et trois longueurs connues, puis le produit en croix.`],
        solution: `D'après le théorème de Thalès, $${r1} = ${r2} = ${r3}$, soit $\\dfrac{${L(AM)}}{${L(AB)}} = ${t === 0 ? `\\dfrac{${nomsL.AN}}{${L(AC)}}` : t === 1 ? `\\dfrac{${nomsL.MN}}{${L(BC)}}` : `\\dfrac{${L(AN)}}{${nomsL.AC}}`}$. Donc $${nomsL[cherche]} = ${t === 2 ? `\\dfrac{${L(AN)} \\times ${L(AB)}}{${L(AM)}}` : `\\dfrac{${L(t === 0 ? AC : BC)} \\times ${L(AM)}}{${L(AB)}}`} = ${nb(rep)}$ cm.` };
    }
  };

  GEN["th4-egalite"] = function () {
    const N = nomsTh4(), [A, M, Np, B, C] = N;
    if (Math.random() < 0.6) {
      const AB = rand(4, 15), AM = rand(1, AB - 1), AC = rand(4, 15), par = Math.random() < 0.5, AN0 = (AM * AC) / AB;
      if (!Number.isInteger(AN0 * 10)) return GEN["th4-egalite"]();
      const AN = par ? AN0 : arr(AN0 + pick([-0.5, 0.5, 1]), 2); if (AN <= 0 || AN >= AC) return GEN["th4-egalite"]();
      const choix = [`Oui, car $\\dfrac{${A}${M}}{${A}${B}} = \\dfrac{${A}${Np}}{${A}${C}}$`, `Non, car $\\dfrac{${A}${M}}{${A}${B}} \\neq \\dfrac{${A}${Np}}{${A}${C}}$`, "On ne peut pas savoir sans mesurer les angles", `Oui, car $${A}${M} < ${A}${B}$ et $${A}${Np} < ${A}${C}$`];
      return { enonce: `$${M} \\in [${A}${B}]$ et $${Np} \\in [${A}${C}]$ avec $${A}${M} = ${AM}$ cm, $${A}${B} = ${AB}$ cm, $${A}${Np} = ${nb(AN)}$ cm et $${A}${C} = ${AC}$ cm. Les droites $(${M}${Np})$ et $(${B}${C})$ sont-elles parallèles ?`, figure: Math.random() < 0.5 ? figureThales(N, AM / AB, { AM: `${AM}`, AB: `${AB}`, AN: nbTexte(AN), AC: `${AC}` }, { kN: AN / AC, pointille: true }) : undefined, mode: "choix", choix, attendu: par ? 0 : 1,
        aides: ["Réciproque du théorème de Thalès : si les points sont dans le même ordre et si les rapports sont égaux, les droites sont parallèles.", `Calcule $\\dfrac{${A}${M}}{${A}${B}}$ et $\\dfrac{${A}${Np}}{${A}${C}}$, ou compare les produits en croix.`, `$${AM} \\times ${AC} = ${AM * AC}$ et $${AB} \\times ${nb(AN)} = ${nb(arr(AB * AN, 4))}$.`],
        solution: `$${AM} \\times ${AC} = ${AM * AC}$ et $${AB} \\times ${nb(AN)} = ${nb(arr(AB * AN, 4))}$. ${par ? "Les produits en croix sont égaux : les rapports sont égaux et, d'après la réciproque du théorème de Thalès, les droites sont parallèles." : "Les produits sont différents : les rapports ne sont pas égaux, donc les droites ne sont pas parallèles (sinon le théorème de Thalès donnerait l'égalité)."}` };
    }
    const bonne = `$\\dfrac{${A}${M}}{${A}${B}} = \\dfrac{${A}${Np}}{${A}${C}} = \\dfrac{${M}${Np}}{${B}${C}}$`;
    const faux = [`$\\dfrac{${A}${M}}{${M}${B}} = \\dfrac{${A}${Np}}{${Np}${C}} = \\dfrac{${M}${Np}}{${B}${C}}$`, `$\\dfrac{${A}${M}}{${A}${B}} = \\dfrac{${A}${C}}{${A}${Np}} = \\dfrac{${M}${Np}}{${B}${C}}$`, `$\\dfrac{${A}${M}}{${A}${Np}} = \\dfrac{${A}${B}}{${B}${C}} = \\dfrac{${M}${Np}}{${A}${C}}$`];
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: `$${M} \\in [${A}${B}]$, $${Np} \\in [${A}${C}]$ et $(${M}${Np}) \\parallel (${B}${C})$. Quelle égalité donne le théorème de Thalès ?`, figure: figureThales(N, rand(3, 6) / 10, ["", "", "", "", "", ""]), mode: "choix", choix, attendu,
      aides: ["Le petit triangle $" + A + M + Np + "$ est une réduction du grand triangle $" + A + B + C + "$.", "Chaque rapport est : côté du petit triangle sur côté correspondant du grand.", "Les côtés correspondants sont sur la même droite (ou parallèles)."],
      solution: `Le triangle $${A}${M}${Np}$ est une réduction de $${A}${B}${C}$ : ${bonne}.` };
  };

  GEN["th4-coefficient"] = function () {
    const N = nomsTh4(), [A, M, Np, B, C] = N, AB = rand(4, 15), AM = rand(1, AB - 1), k = AM / AB, t = rand(0, 2);
    const hyp = `$${M} \\in [${A}${B}]$, $${Np} \\in [${A}${C}]$ et $(${M}${Np}) \\parallel (${B}${C})$`;
    if (t === 0) return { enonce: `${hyp}, avec $${A}${M} = ${AM}$ cm et $${A}${B} = ${AB}$ cm. Le triangle $${A}${M}${Np}$ est une réduction de $${A}${B}${C}$. Quel est le coefficient de réduction ?${CONSIGNE_FR}`, figure: figureThales(N, k, { AM: `${AM} cm`, AB: `${AB} cm` }), mode: "nombre", prefixe: "$k =$", attendu: k,
      erreurs: [{ valeur: AB / AM, message: "C'est l'inverse : le coefficient de réduction est plus petit que $1$." }, { valeur: AM / (AB - AM), message: `On divise par $${A}${B}$ (le côté entier), pas par $${M}${B}$.` }, ...approx(k)],
      aides: ["Le coefficient de réduction est le rapport « côté du petit triangle / côté correspondant du grand ».", `$k = \\dfrac{${A}${M}}{${A}${B}}$.`, "Simplifie la fraction."], solution: `$k = \\dfrac{${A}${M}}{${A}${B}} = \\dfrac{${AM}}{${AB}}${pgcd(AM, AB) > 1 ? ` = ${frS(AM, AB)}` : ""}$.` };
    const BC = rand(4, 20), MN = arr(BC * k, 4);
    if (!Number.isInteger(arr(MN * 100, 6))) return GEN["th4-coefficient"]();
    if (t === 1) return { enonce: `${hyp}, avec $${A}${M} = ${AM}$ cm, $${A}${B} = ${AB}$ cm et $${M}${Np} = ${nb(MN)}$ cm. Calcule $${B}${C}$.`, figure: figureThales(N, k, { AM: `${AM} cm`, AB: `${AB} cm`, MN: `${nbTexte(MN)} cm`, BC: "?" }), mode: "nombre", prefixe: `$${B}${C} =$`, suffixe: "cm", attendu: BC,
      erreurs: [{ valeur: arr(MN * k, 4), message: "On cherche une longueur du grand triangle : elle est plus grande que $" + M + Np + "$." }, { valeur: arr(MN + (AB - AM), 4), message: "Dans une réduction, on ne retire pas le même nombre : les longueurs sont multipliées par le même coefficient." }],
      aides: [`$\\dfrac{${A}${M}}{${A}${B}} = \\dfrac{${M}${Np}}{${B}${C}}$.`, `$\\dfrac{${AM}}{${AB}} = \\dfrac{${nb(MN)}}{${B}${C}}$.`, `$${B}${C} = \\dfrac{${nb(MN)} \\times ${AB}}{${AM}}$.`], solution: `D'après le théorème de Thalès, $\\dfrac{${A}${M}}{${A}${B}} = \\dfrac{${M}${Np}}{${B}${C}}$, donc $${B}${C} = \\dfrac{${nb(MN)} \\times ${AB}}{${AM}} = ${BC}$ cm.` };
    // t === 2 : le coefficient est donné, on calcule une longueur du petit triangle
    const g = pgcd(AM, AB);
    return { enonce: `${hyp}. Le triangle $${A}${M}${Np}$ est une réduction de $${A}${B}${C}$ de coefficient $${frS(AM, AB)}$. Sachant que $${B}${C} = ${BC}$ cm, calcule $${M}${Np}$.`, figure: figureThales(N, k, { BC: `${BC} cm`, MN: "?" }), mode: "nombre", prefixe: `$${M}${Np} =$`, suffixe: "cm", attendu: MN,
      erreurs: [{ valeur: arr(BC / k, 4), message: "On cherche une longueur du petit triangle : on **multiplie** par le coefficient de réduction (plus petit que $1$)." }, { valeur: arr((BC * AM) / g, 4), message: `Multiplier par $${frS(AM, AB)}$, c'est multiplier par $${AM / g}$ **puis diviser** par $${AB / g}$.` }],
      aides: ["Dans une réduction de coefficient $k$, toutes les longueurs sont multipliées par $k$.", `$${M}${Np} = ${frS(AM, AB)} \\times ${B}${C}$.`, `$${frS(AM, AB)} \\times ${BC}$.`], solution: `$${M}${Np} = ${frS(AM, AB)} \\times ${BC} = ${nb(MN)}$ cm.` };
  };

  GEN["th4-problemes"] = function () {
    const t = rand(0, 2), nom = pick(PRENOMS4);
    if (t === 0) { // hauteur inaccessible grâce aux ombres
      const b = rand(10, 20) / 10, o = rand(10, 40) / 10, O = rand(8, 30), H = (b * O) / o;
      if (!Number.isInteger(arr(H * 100, 6)) || O <= o + 1) return GEN["th4-problemes"]();
      const obj = pick(["du cocotier de la plage de Sakouli", "du baobab de la place du village", "du minaret de la mosquée de Tsingoni", "du lampadaire de la place de la barge", "du manguier de l'école"]), court = obj.split(" ").slice(0, 2).join(" ");
      return { enonce: `Pour mesurer la hauteur ${obj}, ${nom} plante un bâton vertical de $${nb(b)}$ m de façon que l'extrémité de son ombre coïncide avec celle de l'ombre ${court}. L'ombre du bâton mesure $${nb(o)}$ m et celle ${court} mesure $${O}$ m. Les rayons du soleil sont parallèles. Quelle est la hauteur ${court} ?`, figure: ombres4(b, o, H, O, ["?", `${nbTexte(b)} m`, `${O} m`, `${nbTexte(o)} m`]), mode: "nombre", prefixe: "Hauteur :", suffixe: "m", attendu: arr(H, 2),
        erreurs: [{ valeur: arr((o * O) / b, 4), message: "Le rapport est à l'envers : hauteur de l'objet sur hauteur du bâton = ombre de l'objet sur ombre du bâton." }, { valeur: arr(b + (O - o), 4), message: "On ne peut pas ajouter la différence des ombres : les longueurs sont proportionnelles (on multiplie)." }],
        aides: ["Les rayons du soleil étant parallèles, on a une configuration de Thalès : le petit triangle (bâton et son ombre) est une réduction du grand.", `$\\dfrac{h}{${nb(b)}} = \\dfrac{${O}}{${nb(o)}}$.`, `$h = \\dfrac{${nb(b)} \\times ${O}}{${nb(o)}}$.`], solution: `D'après le théorème de Thalès, $\\dfrac{h}{${nb(b)}} = \\dfrac{${O}}{${nb(o)}}$, donc $h = \\dfrac{${nb(b)} \\times ${O}}{${nb(o)}} = ${nb(arr(H, 2))}$ m.` }; }
    if (t === 1) { // rampe ou toboggan
      const d = rand(2, 6), D = d + rand(2, 12), h = rand(2, 9) / 10, H = (h * D) / d;
      if (!Number.isInteger(arr(H * 100, 6))) return GEN["th4-problemes"]();
      const [ctx, pr] = pick([["Une rampe d'accès au débarcadère de la barge monte régulièrement.", "elle"], ["Une rampe d'accès pour fauteuils roulants, devant le collège de " + pick(LIEUX4) + ", monte régulièrement.", "elle"], ["Le toit en pente d'un banga monte régulièrement.", "il"]]);
      return { enonce: `${ctx} À $${d}$ m de son point de départ (mesurés à l'horizontale), ${pr} est à $${nb(h)}$ m de hauteur. À quelle hauteur est-${pr} à $${D}$ m du départ ? (Les poteaux verticaux sont parallèles.)`, figure: svg4(320, 150, `Schéma de la pente : à ${d} m du départ, hauteur ${nbTexte(h)} m ; à ${D} m, hauteur inconnue`, (() => { const k = 270 / D, kv = Math.min(110 / H, 400), x0 = 20, y0 = 128; return L4(x0, y0, x0 + D * k, y0, "g-droite") + L4(x0, y0, x0 + D * k, y0 - H * kv, "g-segment") + L4(x0 + d * k, y0, x0 + d * k, y0 - h * kv, "g-segment") + L4(x0 + D * k, y0, x0 + D * k, y0 - H * kv, "g-segment") + T4(x0 + d * k - 4, y0 - (h * kv) / 2 + 4, `${nbTexte(h)} m`, "g-mesure", "end") + T4(x0 + D * k - 4, y0 - (H * kv) / 2 + 4, "?", "g-hlabel", "end") + T4(x0 + d * k, y0 + 16, `${d} m`, "g-mesure") + T4(x0 + D * k, y0 + 16, `${D} m`, "g-mesure", "end") + C4(x0, y0, 3) + T4(x0, y0 + 16, "départ", "g-tick", "start"); })()), mode: "nombre", prefixe: "Hauteur :", suffixe: "m", attendu: arr(H, 2),
        erreurs: [{ valeur: arr((d * h) / D, 4), message: "Le rapport est à l'envers : plus on s'éloigne, plus la rampe est haute." }, { valeur: arr(h + (D - d), 4), message: "On ne peut pas ajouter des mètres horizontaux à une hauteur : utilise la proportionnalité." }],
        aides: ["Les poteaux verticaux sont parallèles : on a une configuration de Thalès.", `$\\dfrac{h}{${nb(h)}} = \\dfrac{${D}}{${d}}$.`, `$h = \\dfrac{${nb(h)} \\times ${D}}{${d}}$.`], solution: `D'après le théorème de Thalès, $\\dfrac{h}{${nb(h)}} = \\dfrac{${D}}{${d}}$, donc $h = \\dfrac{${nb(h)} \\times ${D}}{${d}} = ${nb(arr(H, 2))}$ m.` }; }
    // t === 2 : largeur d'une rivière (ou d'un bras de mangrove)
    const AM = rand(3, 12), AB = AM + rand(5, 30), MN = rand(2, 9), BC = (MN * AB) / AM;
    if (!Number.isInteger(arr(BC * 10, 6))) return GEN["th4-problemes"]();
    return { enonce: `Pour estimer la largeur $BC$ d'un bras de mangrove près de ${pick(["Dembéni", "Bouéni", "Chirongui", "Kani-Kéli"])}, ${nom} plante des piquets : $M$ sur $[AB]$ et $N$ sur $[AC]$ avec $(MN) \\parallel (BC)$. ${il4(nom) === "elle" ? "Elle" : "Il"} mesure $AM = ${AM}$ m, $AB = ${AB}$ m et $MN = ${MN}$ m. Quelle est la largeur $BC$ ?`, figure: figureThales(["A", "M", "N", "B", "C"], AM / AB, { AM: `${AM} m`, AB: `${AB} m`, MN: `${MN} m`, BC: "?" }), mode: "nombre", prefixe: "$BC =$", suffixe: "m", attendu: BC,
      erreurs: [{ valeur: arr((MN * AM) / AB, 4), message: "$BC$ est une longueur du grand triangle : elle est plus grande que $MN$." }, { valeur: arr((MN * AB) / (AB - AM), 4), message: "On utilise $AM$ et $AB$ (côtés correspondants des deux triangles), pas $MB$." }],
      aides: ["$(MN) \\parallel (BC)$ : on peut appliquer le théorème de Thalès dans le triangle $ABC$.", `$\\dfrac{AM}{AB} = \\dfrac{MN}{BC}$, soit $\\dfrac{${AM}}{${AB}} = \\dfrac{${MN}}{BC}$.`, `$BC = \\dfrac{${MN} \\times ${AB}}{${AM}}$.`], solution: `D'après le théorème de Thalès, $\\dfrac{AM}{AB} = \\dfrac{MN}{BC}$, donc $BC = \\dfrac{${MN} \\times ${AB}}{${AM}} = ${nb(BC)}$ m.` };
  };

  /* =====================================================================
     Chapitre 9 : calcul littéral (lc4-)
     ===================================================================== */
  // Polynôme a x² + b x + c écrit proprement
  const poly4 = (a, b, c, x) => {
    const T = [[a, `${x}^2`], [b, x], [c, ""]].filter(([k]) => k !== 0);
    if (!T.length) return "0";
    return T.map(([k, v], i) => { const s = k < 0 ? "-" : "+", m = Math.abs(k), coef = v && m === 1 ? "" : String(m); return (i === 0 ? (k < 0 ? "-" : "") : ` ${s} `) + coef + v; }).join("");
  };
  const VAR4 = ["x", "a", "y", "t", "n"];

  /* Figures du chapitre 9 */
  // Rectangle de hauteur k partagé en deux : largeurs « gauche » et « droite » ; aires écrites dans chaque partie (ou « ? »)
  function aireDistrib4(k, g, d, aires, o) {
    o = o || {};
    const x0 = 60, y0 = 26, H = 76, W1 = o.w1 || 140, W2 = o.w2 || 80;
    const s = R4(x0, y0, W1, H, "g-aire") + R4(x0 + W1, y0, W2, H, "g-aire g-aire-neg") + R4(x0, y0, W1 + W2, H, "g-unite")
      + T4(x0 + W1 / 2, y0 - 8, g, "g-mesure") + T4(x0 + W1 + W2 / 2, y0 - 8, d, "g-mesure") + T4(x0 - 8, y0 + H / 2 + 4, k, "g-mesure", "end")
      + T4(x0 + W1 / 2, y0 + H / 2 + 5, aires[0], "g-clabel") + T4(x0 + W1 + W2 / 2, y0 + H / 2 + 5, aires[1], "g-clabel")
      + (o.total ? `<path class="g-accolade" d="M${x0 + 2} ${y0 + H + 6} V${y0 + H + 12} H${x0 + W1 + W2 - 2} V${y0 + H + 6}"/>` + T4(x0 + (W1 + W2) / 2, y0 + H + 28, o.total, "g-label") : "");
    return svg4(320, y0 + H + (o.total ? 36 : 12), o.aria || `Rectangle de hauteur ${k} partagé en deux rectangles de largeurs ${g} et ${d}`, s);
  }
  // Les termes d'une expression rangés par nature (couleurs) : [coef, degré]
  function termesBoites4(termes, x) {
    const n = termes.length, g = 6, w = Math.min(50, (304 - (n - 1) * g) / n), x0 = (320 - (n * w + (n - 1) * g)) / 2;
    const cl = ["g-poly g-poly-image", "g-poly", "g-rect"], s = termes.map(([k, d], i) => { const v = d === 2 ? `${x}²` : d === 1 ? x : "", m = Math.abs(k); return R4(x0 + i * (w + g), 12, w, 30, cl[2 - d]) + T4(x0 + i * (w + g) + w / 2, 32, `${k < 0 ? "−" : "+"}${v && m === 1 ? "" : m}${v}`); }).join("");
    return svg4(320, 74, `Les termes de l'expression, coloriés selon leur nature : termes en ${x}², termes en ${x}, nombres`, s + R4(40, 52, 12, 12, cl[0]) + T4(56, 62, `en ${x}²`, "g-tick", "start") + R4(130, 52, 12, 12, cl[1]) + T4(146, 62, `en ${x}`, "g-tick", "start") + R4(210, 52, 12, 12, cl[2]) + T4(226, 62, "nombres", "g-tick", "start"));
  }
  // Programme de calcul en étapes (boîtes et flèches)
  function programme4(etapes) {
    const n = etapes.length, w = Math.min(70, (300 - (n - 1) * 16) / n), x0 = (320 - (n * w + (n - 1) * 16)) / 2;
    let s = ""; etapes.forEach((t, i) => { const x = x0 + i * (w + 16); s += R4(x, 14, w, 32, i === 0 || i === n - 1 ? "g-poly g-poly-image" : "g-rect") + T4(x + w / 2, 34, t, "g-label"); if (i < n - 1) s += F4(x + w + 2, 30, x + w + 14, 30, "g-segment"); });
    return svg4(320, 60, `Programme de calcul : ${etapes.join(", puis ")}`, s);
  }
  FIGURES["lc4-cours-developper"] = () => aireDistrib4("3", "x", "4", ["3x", "12"], { aria: "Rectangle de hauteur 3 et de largeur x + 4, partagé en deux : aires 3x et 12, donc 3(x + 4) = 3x + 12" });
  FIGURES["lc4-cours-reduire"] = () => termesBoites4([[3, 2], [-2, 1], [5, 1], [-1, 2], [4, 0]], "x");
  FIGURES["lc4-cours-factoriser"] = () => aireDistrib4("?", "?", "?", ["6x", "15"], { total: "6x + 15", aria: "Rectangle d'aire totale 6x + 15 partagé en deux parties d'aires 6x et 15 ; la hauteur commune est à trouver" });
  FIGURES["lc4-cours-programme"] = () => programme4(["x", "+ 3", "× 2", "− 6", "?"]);
  FIGURES["lc4-qcm-aire"] = () => aireDistrib4("5", "x", "2", ["?", "?"], { aria: "Rectangle de hauteur 5 et de largeur x + 2" });

  GEN["lc4-developper"] = function () {
    const x = pick(VAR4), k = rand(2, 9) * (Math.random() < 0.4 ? -1 : 1), a = rand(1, 9) * (Math.random() < 0.3 ? -1 : 1), b = rand(1, 12) * (Math.random() < 0.5 ? -1 : 1);
    const bonne = `$${poly4(0, k * a, k * b, x)}$`;
    const faux = [`$${poly4(0, k * a, b, x)}$`, `$${poly4(0, k * a, -k * b, x)}$`, `$${poly4(0, k + a, k * b, x)}$`, `$${poly4(0, -k * a, k * b, x)}$`, `$${poly4(0, k * a, k + b, x)}$`, `$${poly4(0, a, k * b, x)}$`].filter((z) => z !== bonne);
    const { choix, attendu } = melange(bonne, faux);
    const ax = a === 1 ? x : `${a}${x}`, fig = k > 0 && a > 0 && b > 0 && Math.random() < 0.6 ? { figure: aireDistrib4(`${k}`, ax, `${b}`, ["?", "?"], { aria: `Rectangle de hauteur ${k} et de largeur ${ax} + ${b}, partagé en deux` }), figureSolution: aireDistrib4(`${k}`, ax, `${b}`, [`${k * a}${x}`, `${k * b}`], { aria: `Rectangle de hauteur ${k} : aires ${k * a}${x} et ${k * b}` }) } : {};
    return { enonce: `Développe $${rel(k)}(${poly4(0, a, b, x)})$.${fig.figure ? ` L'aire du rectangle est $${k}(${poly4(0, a, b, x)})$.` : ""}`, ...fig, mode: "choix", choix, attendu,
      aides: ["$k(a + b) = ka + kb$ : le facteur multiplie chaque terme.", "Attention aux signes : applique la règle des signes à chaque produit.", `$${relP(k)} \\times ${relP(b)} = ${rel(k * b)}$.`],
      solution: `$${rel(k)}(${poly4(0, a, b, x)}) = ${relP(k)} \\times ${a === 1 ? x : a === -1 ? `(-${x})` : `${relP(a)}${x}`} + ${relP(k)} \\times ${relP(b)} = ${poly4(0, k * a, k * b, x)}$.` };
  };

  GEN["lc4-reduire"] = function () {
    const x = pick(VAR4), r = () => rand(1, 9) * (Math.random() < 0.4 ? -1 : 1);
    const a1 = r(), a2 = r(), b1 = r(), b2 = r(), c1 = r(), c2 = Math.random() < 0.5 ? r() : 0;
    const termes = shuffle([[a1, 2], [b1, 1], [c1, 0], [a2, 2], [b2, 1], ...(c2 ? [[c2, 0]] : [])]);
    const tx = termes.map(([k, d], i) => { const v = d === 2 ? `${x}^2` : d === 1 ? x : ""; const m = Math.abs(k), coef = v && m === 1 ? "" : String(m); return (i === 0 ? (k < 0 ? "-" : "") : k < 0 ? " - " : " + ") + coef + v; }).join("");
    const A = a1 + a2, B = b1 + b2, C = c1 + c2, bonne = `$${poly4(A, B, C, x)}$`;
    const faux = [poly4(0, A + B, C, x), poly4(A, B, C + A, x), poly4(a1 - a2, b1 - b2, C, x), poly4(A, B, -C, x), poly4(B, A, C, x), poly4(A, B + 1, C, x), poly4(A + B + C, 0, 0, x), poly4(A, B, C - 1, x)].map((z) => `$${z}$`).filter((z) => z !== bonne);
    const { choix, attendu } = melange(bonne, faux);
    const fig = Math.random() < 0.5 ? { figure: termesBoites4(termes, x) } : {};
    return { enonce: `Réduis $${tx}$.${fig.figure ? " Les termes sont coloriés selon leur nature." : ""}`, ...fig, mode: "choix", choix, attendu,
      aides: [`Regroupe les termes en $${x}^2$, puis les termes en $${x}$, puis les nombres.`, `On n'additionne pas des termes en $${x}^2$ avec des termes en $${x}$.`, `Termes en $${x}^2$ : $${rel(a1)} + ${relP(a2)} = ${rel(A)}$.`],
      solution: `Termes en $${x}^2$ : $${rel(A)}$ ; termes en $${x}$ : $${rel(B)}$ ; nombres : $${rel(C)}$. Donc $${tx} = ${poly4(A, B, C, x)}$.` };
  };

  GEN["lc4-factoriser"] = function () {
    const x = pick(VAR4), t = rand(0, 1);
    if (t === 0) { const k = rand(2, 9), a = rand(1, 7), b = rand(1, 12) * (Math.random() < 0.5 ? -1 : 1); if (pgcd(a, Math.abs(b)) > 1) return GEN["lc4-factoriser"]();
      const bonne = `$${k}(${poly4(0, a, b, x)})$`, faux = [`$${k}(${poly4(0, a * k, b, x)})$`, `$${k}${x}(${poly4(0, 0, a, x)} ${b < 0 ? "-" : "+"} ${Math.abs(b)})$`, `$${x}(${poly4(0, 0, k * a, x)} ${b < 0 ? "-" : "+"} ${Math.abs(k * b)})$`, `$${k}(${poly4(0, a, -b, x)})$`].filter((z) => z !== bonne);
      const { choix, attendu } = melange(bonne, faux);
      const fig = b > 0 && Math.random() < 0.6 ? { figure: aireDistrib4("?", "?", "?", [`${k * a}${x}`, `${k * b}`], { total: poly4(0, k * a, k * b, x), aria: `Rectangle d'aire ${poly4(0, k * a, k * b, x)} partagé en deux parties d'aires ${k * a}${x} et ${k * b} ; la hauteur commune est à trouver` }), figureSolution: aireDistrib4(`${k}`, a === 1 ? x : `${a}${x}`, `${b}`, [`${k * a}${x}`, `${k * b}`], { total: `${k}(${poly4(0, a, b, x)})` }) } : {};
      return { enonce: `Factorise $${poly4(0, k * a, k * b, x)}$.${fig.figure ? " Le rectangle a pour aire cette expression." : ""}`, ...fig, mode: "choix", choix, attendu,
        aides: ["Cherche un facteur commun aux deux termes.", `$${k * a}${x} = ${k} \\times ${a === 1 ? "" : a}${x}$ et $${rel(k * b)} = ${k} \\times ${relP(b)}$.`, `Le facteur commun est $${k}$.`], solution: `$${poly4(0, k * a, k * b, x)} = ${k} \\times ${a === 1 ? "" : a}${x} + ${k} \\times ${relP(b)} = ${k}(${poly4(0, a, b, x)})$.` }; }
    const a = rand(1, 9), b = rand(1, 12) * (Math.random() < 0.5 ? -1 : 1);
    if (pgcd(a, Math.abs(b)) > 1) return GEN["lc4-factoriser"]();
    const bonne = `$${x}(${poly4(0, a, b, x)})$`, faux = [`$${x}^2(${a} ${b < 0 ? "-" : "+"} ${Math.abs(b)})$`, `$${x}(${poly4(0, a, b * 1, x).replace(x, `${x}^2`)})$`, ...(a > 1 ? [`$${a}(${x}^2 ${b < 0 ? "-" : "+"} ${Math.abs(b)}${x})$`] : []), `$${x}(${poly4(0, a, -b, x)})$`, `$${x}(${poly4(0, a, 0, x)} ${b < 0 ? "-" : "+"} ${Math.abs(b)}${x})$`].filter((z) => z !== bonne);
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: `Factorise $${poly4(a, b, 0, x)}$.`, mode: "choix", choix, attendu,
      aides: [`$${x}^2 = ${x} \\times ${x}$ : la lettre $${x}$ est un facteur commun.`, `$${a === 1 ? "" : a}${x}^2 = ${x} \\times ${a === 1 ? "" : a}${x}$ et $${rel(b)}${x} = ${x} \\times ${relP(b)}$.`, `On met $${x}$ en facteur.`], solution: `$${poly4(a, b, 0, x)} = ${x} \\times ${a === 1 ? "" : a}${x} + ${x} \\times ${relP(b)} = ${x}(${poly4(0, a, b, x)})$.` };
  };

  GEN["lc4-dev-reduire"] = function () {
    const x = pick(VAR4), k1 = rand(2, 7), k2 = rand(1, 6) * (Math.random() < 0.6 ? -1 : 1), a = rand(1, 6), b = rand(1, 9) * (Math.random() < 0.5 ? -1 : 1), c = rand(1, 6), d = rand(1, 9) * (Math.random() < 0.5 ? -1 : 1);
    const A = k1 * a + k2 * c, B = k1 * b + k2 * d;
    const s2 = poly4(0, k2 * c, k2 * d, x), dev = poly4(0, k1 * a, k1 * b, x) + (s2.startsWith("-") ? " - " + s2.slice(1) : " + " + s2);
    const tx = `${k1}(${poly4(0, a, b, x)}) ${k2 < 0 ? "-" : "+"} ${Math.abs(k2) === 1 ? "" : Math.abs(k2)}(${poly4(0, c, d, x)})`;
    if (Math.random() < 0.5) {
      const bonne = `$${poly4(0, A, B, x)}$`, faux = [`$${poly4(0, k1 * a - k2 * c, B, x)}$`, `$${poly4(0, A, k1 * b + Math.abs(k2) * d * Math.sign(k2) * -1, x)}$`, `$${poly4(0, A, k1 * b + d, x)}$`, `$${poly4(0, A + B, 0, x)}$`].filter((z) => z !== bonne);
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `Développe et réduis $${tx}$.`, mode: "choix", choix, attendu,
        aides: ["Développe chaque produit séparément.", k2 < 0 ? "Attention : le signe $-$ devant la deuxième parenthèse change le signe de chaque terme." : "Le facteur multiplie chaque terme de sa parenthèse.", `On obtient $${dev}$.`],
        solution: `$${tx} = ${dev} = ${poly4(0, A, B, x)}$.` };
    }
    return { enonce: `On développe et on réduit $${tx}$ sous la forme $a${x} + b$. Quelle est la valeur de $b$ ?`, mode: "nombre", prefixe: "$b =$", attendu: B,
      erreurs: [{ valeur: k1 * b + Math.abs(k2) * d, message: "Le signe devant la deuxième parenthèse multiplie aussi son terme constant." }, { valeur: b + d, message: "Chaque facteur multiplie **tous** les termes de sa parenthèse, y compris le nombre." }],
      aides: ["Développe chaque produit.", `Termes constants : $${k1} \\times ${relP(b)}$ et $${relP(k2)} \\times ${relP(d)}$.`, "Additionne-les."], solution: `$b = ${k1} \\times ${relP(b)} + ${relP(k2)} \\times ${relP(d)} = ${rel(k1 * b)} + ${relP(k2 * d)} = ${rel(B)}$.` };
  };

  GEN["lc4-substitution"] = function () {
    const tt = rand(0, 5);
    if (tt === 4) { // exprimer un périmètre ou une aire en fonction de x
      const x = pick(["x", "a", "y"]), p = rand(2, 9), aire = Math.random() < 0.5, ctx = pick(["Le jardin de Fatima", "Un terrain de jeu à Combani", "Le sol d'un banga", "Une affiche du collège"]);
      const bonne = aire ? `$${x}(${x} + ${p})$` : `$4${x} + ${2 * p}$`, faux = aire ? [`$${x} + ${x} + ${p}$`, `$2${x} + ${p}$`, `$4${x} + ${2 * p}$`, `$${x}^2 + ${p}$`] : [`$2${x} + ${p}$`, `$${x}(${x} + ${p})$`, `$4${x} + ${p}$`, `$2${x} + ${2 * p}$`];
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `${ctx} est un rectangle de largeur $${x}$ (en mètres) dont la longueur dépasse la largeur de $${p}$ m. Quelle expression donne ${aire ? "son aire (en m²)" : "son périmètre (en m)"} en fonction de $${x}$ ?`, figure: svg4(320, 140, `Rectangle de largeur ${x} et de longueur ${x} + ${p}`, R4(70, 20, 180, 90, "g-rect") + T4(160, 126, `${x} + ${p}`, "g-mesure") + T4(62, 69, x, "g-mesure", "end")), mode: "choix", choix, attendu,
        aides: [`La longueur est $${x} + ${p}$.`, aire ? "Aire d'un rectangle : longueur $\\times$ largeur." : "Périmètre d'un rectangle : $2 \\times (\\text{longueur} + \\text{largeur})$.", aire ? `$${x} \\times (${x} + ${p})$.` : `$2 \\times (${x} + ${p} + ${x})$, puis réduis.`],
        solution: aire ? `Aire $= ${x} \\times (${x} + ${p}) = ${x}(${x} + ${p})$ m² (soit $${x}^2 + ${p}${x}$ après développement).` : `Périmètre $= 2 \\times (${x} + ${p} + ${x}) = 2 \\times (2${x} + ${p}) = 4${x} + ${2 * p}$ m.` };
    }
    if (tt === 5) { // traduire et simplifier un programme de calcul (preuve)
      const a = rand(2, 9), m = rand(2, 5), k = a * m, x = "x";
      const { choix, attendu } = melange(`$${m}(${x} + ${a}) - ${k} = ${m}${x}$ : on obtient toujours le nombre de départ multiplié par $${m}$`, [`$${m}${x} + ${a} - ${k}$ : le résultat dépend du nombre choisi de façon compliquée`, `$${m}(${x} + ${a}) - ${k} = ${m}${x} + ${k}$`, `On ne peut pas savoir : il faut essayer tous les nombres`]);
      return { enonce: `Programme : choisir un nombre $${x}$, ajouter $${a}$, multiplier par $${m}$, soustraire $${k}$. Quelle affirmation est démontrée par le calcul littéral ?`, figure: programme4(["x", `+ ${a}`, `× ${m}`, `− ${k}`, "?"]), mode: "choix", choix, attendu,
        aides: ["Traduis chaque étape avec la lettre $x$.", `On obtient $${m}(${x} + ${a}) - ${k}$.`, "Développe et réduis cette expression."], solution: `$${m}(${x} + ${a}) - ${k} = ${m}${x} + ${k} - ${k} = ${m}${x}$ : quel que soit le nombre choisi, le programme donne $${m}$ fois ce nombre. Un exemple ne suffit pas ; le calcul littéral le prouve pour tous les nombres.` };
    }
    const x = pick(VAR4), v = rand(-6, 6), a = rand(1, 5) * (Math.random() < 0.3 ? -1 : 1), b = rand(-9, 9), c = rand(-12, 12);
    if (v === 0 || b === 0 || c === 0) return GEN["lc4-substitution"]();
    const r = a * v * v + b * v + c, e = poly4(a, b, c, x);
    return { enonce: `Calcule $${e}$ pour $${x} = ${rel(v)}$.`, mode: "nombre", prefixe: "Résultat :", attendu: r,
      erreurs: [v < 0 ? { valeur: -a * v * v + b * v + c, message: `$${relP(v)}^2$ est positif : c'est $${relP(v)} \\times ${relP(v)}$.` } : { valeur: a * a * v * v + b * v + c, message: `Le carré ne porte que sur $${x}$ : $${a === -1 ? "-" : a}${x}^2 = ${a === -1 ? "-" : `${a} \\times `}${x}^2$.` }, { valeur: a * 2 * v + b * v + c, message: "Le carré n'est pas le double." }],
      aides: [`Remplace $${x}$ par $${relP(v)}$ (avec des parenthèses).`, `$${relP(v)}^2 = ${v * v}$.`, "Applique les priorités et la règle des signes."],
      solution: `$${a === 1 ? "" : a === -1 ? "-" : `${a} \\times `}${relP(v)}^2 ${b < 0 ? "-" : "+"} ${Math.abs(b)} \\times ${relP(v)} ${c < 0 ? "-" : "+"} ${Math.abs(c)} = ${rel(a * v * v)} ${b * v < 0 ? "-" : "+"} ${Math.abs(b * v)} ${c < 0 ? "-" : "+"} ${Math.abs(c)} = ${rel(r)}$.` };
  };

  /* =====================================================================
     Chapitre 10 : probabilités (pb4-)
     ===================================================================== */
  const URNE4 = () => { const r = rand(1, 9), v = rand(1, 9), b = rand(0, 7); return { r, v, b, n: r + v + b, txt: `une urne contient $${r}$ boule${r > 1 ? "s" : ""} rouge${r > 1 ? "s" : ""}, $${v}$ verte${v > 1 ? "s" : ""}${b ? ` et $${b}$ bleue${b > 1 ? "s" : ""}` : ""}, indiscernables au toucher` }; };

  /* Figures du chapitre 10 */
  const COUL4 = { R: ["g-secteur-2", "rouge"], V: ["g-secteur-3", "verte"], B: ["g-secteur-0", "bleue"], J: ["g-secteur-1", "jaune"] };
  // Urne contenant des boules : groupes [[lettre, nombre]] ; chaque boule porte l'initiale de sa couleur
  function urne4(groupes) {
    const boules = []; groupes.forEach(([c, n]) => { for (let i = 0; i < n; i++) boules.push(c); });
    const n = boules.length, par = Math.min(8, Math.ceil(Math.sqrt(n * 2))), r = Math.min(11, 160 / par / 2.2), lignes = Math.ceil(n / par), W = par * r * 2.3 + 30, Ht = lignes * r * 2.3 + 30, x0 = 160 - W / 2, y0 = 18;
    let s = `<path class="g-arc-plein" d="M${f1(x0)} ${y0} V${f1(y0 + Ht - 14)} Q${f1(x0)} ${f1(y0 + Ht)} ${f1(x0 + 14)} ${f1(y0 + Ht)} H${f1(x0 + W - 14)} Q${f1(x0 + W)} ${f1(y0 + Ht)} ${f1(x0 + W)} ${f1(y0 + Ht - 14)} V${y0}"/>`;
    shuffle(boules).forEach((c, i) => { const cx = x0 + 15 + r * 1.15 + (i % par) * r * 2.3, cy = y0 + Ht - 15 - r * 1.15 - Math.floor(i / par) * r * 2.3; s += `<circle class="g-secteur ${COUL4[c][0]}" cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}"/>` + T4(cx, cy + 4, c, "g-label"); });
    return svg4(320, y0 + Ht + 10, `Urne contenant ${groupes.map(([c, k]) => `${k} boule${k > 1 ? "s" : ""} ${COUL4[c][1]}${k > 1 ? "s" : ""} (${c})`).join(", ")}`, s);
  }
  // Roue partagée en secteurs [[texte, part, numéro de couleur]] ; flèche en haut
  function roue4(secteurs, aria, div) {
    const cx = 110, cy = 92, r = 74, tot = secteurs.reduce((s, x) => s + x[1], 0); let a = -Math.PI / 2, s = "", leg = "";
    const part = (a1, b1, c) => { const p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)], p2 = [cx + r * Math.cos(b1), cy + r * Math.sin(b1)]; return `<path class="g-secteur g-secteur-${c}" d="M${cx} ${cy} L${f1(p1[0])} ${f1(p1[1])} A${r} ${r} 0 ${b1 - a1 > Math.PI ? 1 : 0} 1 ${f1(p2[0])} ${f1(p2[1])} Z"/>`; };
    secteurs.forEach(([t, v, c], i) => { const b = a + (2 * Math.PI * v) / tot, m = (a + b) / 2;
      if (v === tot && !div) s += C4(cx, cy, r, `g-secteur g-secteur-${c}`);
      else if (div && Number.isInteger(v)) for (let j = 0; j < v; j++) s += part(a + (2 * Math.PI * j) / tot, a + (2 * Math.PI * (j + 1)) / tot, c);
      else s += part(a, b, c);
      if (v / tot >= 0.07) s += T4(cx + r * 0.62 * Math.cos(m), cy + r * 0.62 * Math.sin(m) + 4, t, "g-label");
      a = b; });
    s += P4([[cx, cy - r - 2], [cx - 8, cy - r - 16], [cx + 8, cy - r - 16]], "g-end");
    secteurs.forEach(([t, v, c], i) => { leg += R4(214, 24 + i * 24, 14, 14, `g-secteur g-secteur-${c}`) + T4(234, 36 + i * 24, t, "g-plabel", "start"); });
    return svg4(320, 186, aria || `Roue partagée en secteurs : ${secteurs.map((x) => x[0]).join(", ")}`, s + leg);
  }
  // Tableau des 36 issues de deux dés (somme dans chaque case)
  function deuxDes4(f, titre) {
    const c = 34, x0 = 74, y0 = 40;
    let s = T4(x0 - 10, y0 - 8, titre || "+", "g-label", "end");
    for (let i = 1; i <= 6; i++) s += T4(x0 + (i - 0.5) * c, y0 - 8, i, "g-label") + T4(x0 - 10, y0 + (i - 0.5) * c + 4, i, "g-label", "end");
    for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) s += T4(x0 + (j - 0.5) * c, y0 + (i - 0.5) * c + 4, f(i, j), "g-mesure");
    s += `<g class="g-grid">${Array.from({ length: 7 }, (_, k) => L4(x0, y0 + k * c, x0 + 6 * c, y0 + k * c, "") + L4(x0 + k * c, y0, x0 + k * c, y0 + 6 * c, "")).join("")}</g>` + T4(x0 + 3 * c, 12, "dé 2", "g-tick") + T4(18, y0 + 3 * c, "dé 1", "g-tick", "start");
    return svg4(320, y0 + 6 * c + 8, "Tableau à double entrée des 36 issues du lancer de deux dés", s);
  }
  // Issues d'un dé (1 à n) ; « marque » : issues entourées
  const issues4 = (n, marque, aria) => { const w = Math.min(30, 300 / n); let s = ""; for (let i = 1; i <= n; i++) { const x = 160 + (i - (n + 1) / 2) * w; s += C4(x, 24, w * 0.42, marque && marque.includes(i) ? "g-secteur g-secteur-1" : "g-rect") + T4(x, 28, i, "g-label"); } return svg4(320, 48, aria || `Les ${n} issues équiprobables`, s); };
  FIGURES["pb4-cours-urne"] = () => urne4([["R", 3], ["V", 5]]);
  FIGURES["pb4-cours-des"] = () => deuxDes4((i, j) => i + j);
  FIGURES["pb4-cours-roue"] = () => roue4([["gagné", 3, 1], ["perdu", 17, 0]], "Roue : 3 parts « gagné » sur 20 parts égales, 17 parts « perdu »", true);
  FIGURES["pb4-cours-issues"] = () => issues4(6, [1, 6], "Les 6 issues d'un dé : 1 et 6 sont entourés (deux évènements incompatibles)");
  FIGURES["pb4-qcm-urne"] = () => urne4([["R", 4], ["B", 6]]);
  FIGURES["pb4-qcm-roue"] = () => roue4([["A", 1, 0], ["B", 1, 1], ["C", 2, 2]], "Roue partagée en 4 parts égales : A sur 1 part, B sur 1 part, C sur 2 parts", true);

  GEN["pb4-calcul"] = function () {
    const t = rand(0, 5), nom = pick(PRENOMS4);
    const fin = (k, n, txt, extra) => ({ mode: "nombre", prefixe: "Probabilité :", attendu: k / n,
      erreurs: [...(n - k > k ? [{ valeur: k / (n - k), message: "On divise par le nombre **total** d'issues, pas par le nombre d'issues défavorables." }] : []), ...(k !== n - k ? [{ valeur: (n - k) / n, message: "Ça, c'est la probabilité de l'évènement contraire." }] : []), ...(k > 1 ? [{ valeur: 1 / n, message: "Compte toutes les issues favorables, pas une seule." }] : []), ...approx(k / n)],
      solution: `${txt}$P = \\dfrac{${k}}{${n}}${pgcd(k, n) > 1 ? ` = ${frS(k, n)}` : ""}$.${extra || ""}` });
    if (t === 0) { const U = URNE4(), [c, k, L] = pick([["rouge", U.r, "R"], ["verte", U.v, "V"], ...(U.b ? [["bleue", U.b, "B"]] : [])]);
      return { enonce: `On tire une boule au hasard : ${U.txt}. Quelle est la probabilité de tirer une boule ${c} ?${CONSIGNE_FR}`, figure: urne4([["R", U.r], ["V", U.v], ...(U.b ? [["B", U.b]] : [])]), ...fin(k, U.n, `Il y a $${U.n}$ boules, dont $${k}$ ${c}${k > 1 ? "s" : ""} : `),
        aides: ["Les issues sont équiprobables : $P = \\dfrac{\\text{issues favorables}}{\\text{issues possibles}}$.", `Il y a $${U.n}$ boules en tout.`, `Il y a $${k}$ boule${k > 1 ? "s" : ""} ${c}${k > 1 ? "s" : ""} (${L}).`] }; }
    if (t === 1) { // dé à n faces, évènement fabriqué
      const n = pick([6, 8, 10, 12, 20]), m = rand(2, 4), seuil = rand(2, n - 2), E = pick([["un nombre pair", (x) => x % 2 === 0], ["un nombre impair", (x) => x % 2 === 1], [`un multiple de $${m}$`, (x) => x % m === 0], [`un nombre supérieur ou égal à $${seuil}$`, (x) => x >= seuil], [`un nombre strictement inférieur à $${seuil}$`, (x) => x < seuil], ["un nombre premier", (x) => estPremier(x)], [`un diviseur de $${n}$`, (x) => n % x === 0]]);
      const fav = Array.from({ length: n }, (_, i) => i + 1).filter(E[1]);
      return { enonce: `On lance un dé équilibré à $${n}$ faces numérotées de $1$ à $${n}$. Quelle est la probabilité d'obtenir ${E[0]} ?${CONSIGNE_FR}`, figure: issues4(n, null, `Les ${n} issues équiprobables du dé`), figureSolution: issues4(n, fav, `Les ${n} issues du dé ; les issues favorables sont en jaune`), ...fin(fav.length, n, `Issues favorables : $${fav.join(" ; ")}$, soit $${fav.length}$ sur $${n}$ : `),
        aides: [`Il y a $${n}$ issues équiprobables.`, "Liste les issues qui réalisent l'évènement.", `Il y en a $${fav.length}$.`] }; }
    if (t === 2) { // deux dés
      const s0 = rand(2, 12), pr = pick([6, 12, 4, 8]), k6 = rand(1, 6), E = pick([[`la somme vaut $${s0}$`, (i, j) => i + j === s0], [pick(["les deux dés donnent le même nombre", "les deux dés donnent des nombres différents"]), null], [`la somme est supérieure ou égale à $${s0}$`, (i, j) => i + j >= s0], [`la somme est inférieure ou égale à $${s0}$`, (i, j) => i + j <= s0], [pick(["la somme est paire", "la somme est impaire"]), null], [`au moins un des dés donne $${k6}$`, (i, j) => i === k6 || j === k6], [`aucun des deux dés ne donne $${k6}$`, (i, j) => i !== k6 && j !== k6], [`le produit vaut $${pr}$`, (i, j) => i * j === pr], [pick(["le produit est pair", "le produit est impair"]), null]]);
      if (!E[1]) E[1] = { "les deux dés donnent le même nombre": (i, j) => i === j, "les deux dés donnent des nombres différents": (i, j) => i !== j, "la somme est paire": (i, j) => (i + j) % 2 === 0, "la somme est impaire": (i, j) => (i + j) % 2 === 1, "le produit est pair": (i, j) => (i * j) % 2 === 0, "le produit est impair": (i, j) => (i * j) % 2 === 1 }[E[0]];
      let k = 0; for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) if (E[1](i, j)) k++;
      if (!k) return GEN["pb4-calcul"]();
      return { enonce: `On lance deux dés équilibrés à six faces. Le tableau donne les $36$ issues équiprobables (${E[0].startsWith("le produit") ? "produit" : "somme"} des deux dés). Quelle est la probabilité ${queM4(E[0])} ?${CONSIGNE_FR}`, figure: deuxDes4(E[0].startsWith("le produit") ? (i, j) => i * j : (i, j) => i + j, E[0].startsWith("le produit") ? "×" : "+"), ...fin(k, 36, `On compte $${k}$ case${k > 1 ? "s" : ""} favorable${k > 1 ? "s" : ""} sur $36$ : `),
        aides: ["Le premier dé est en ligne, le second en colonne : $6 \\times 6 = 36$ issues équiprobables.", "Compte les cases qui réalisent l'évènement.", `Il y en a $${k}$.`] }; }
    if (t === 3) { // roue
      const n = pick([6, 8, 10, 12]), a = rand(1, n - 2), b = rand(1, n - a - 1), c = n - a - b, [coul, k] = pick([["bleu", a], ["jaune", b], ["rouge", c]]);
      return { enonce: `Une roue de loterie de la fête de ${pick(LIEUX4)} est partagée en $${n}$ secteurs identiques : $${a}$ bleu${a > 1 ? "s" : ""}, $${b}$ jaune${b > 1 ? "s" : ""} et $${c}$ rouge${c > 1 ? "s" : ""}. On la fait tourner. Quelle est la probabilité que la flèche s'arrête sur un secteur ${coul} ?${CONSIGNE_FR}`, figure: roue4([["bleu", a, 0], ["jaune", b, 1], ["rouge", c, 2]], `Roue de ${n} secteurs identiques : ${a} bleu(s), ${b} jaune(s), ${c} rouge(s)`, true), ...fin(k, n, `$${k}$ secteur${k > 1 ? "s" : ""} ${coul}${k > 1 ? "s" : ""} sur $${n}$ secteurs identiques : `),
        aides: ["Les secteurs sont identiques : les issues sont équiprobables.", `Il y a $${n}$ secteurs en tout.`, `Compte les secteurs ${coul}s.`] }; }
    if (t === 4) { // tirage au sort dans un groupe
      const f = rand(5, 18), g = rand(5, 18), N = f + g, C = pick([[`La classe de 4e de ${nom} à ${pick(LIEUX4)} compte $${f}$ filles et $${g}$ garçons. On tire au sort le nom d'un élève pour être délégué.`, "que ce soit une fille", f], [`Pour la tombola de la fête du village, on a vendu $${N}$ billets, dont $${f}$ gagnants.`, "de tirer un billet gagnant", f], [`Dans un panier du marché de Mamoudzou, il y a $${f}$ mangues mûres et $${g}$ pas encore mûres. On prend une mangue au hasard.`, "qu'elle soit mûre", f]]);
      return { enonce: `${C[0]} Quelle est la probabilité ${C[1]} ?${CONSIGNE_FR}`, ...fin(C[2], N, `$${C[2]}$ issues favorables sur $${N}$ : `), aides: ["Chaque issue a la même probabilité.", `Il y a $${N}$ issues en tout.`, `Il y a $${C[2]}$ issues favorables.`] }; }
    // t === 5 : probabilité en pourcentage
    const n = pick([20, 25, 50, 100]), k = rand(1, n - 1), pc = (100 * k) / n;
    return { enonce: `Un sac contient $${n}$ jetons dont $${k}$ sont marqués « gagné ». On tire un jeton au hasard. Quelle est la probabilité de gagner, en pourcentage ?`, mode: "nombre", prefixe: "Probabilité :", suffixe: "%", attendu: pc,
      erreurs: [{ valeur: k, message: `Il faut ramener à $100$ : $\\dfrac{${k}}{${n}} = \\dfrac{${pc}}{100}$.` }, { valeur: arr(k / n, 4), message: "Ça, c'est l'écriture décimale. On demande un pourcentage : multiplie par $100$." }],
      aides: [`$P = \\dfrac{${k}}{${n}}$.`, "Un pourcentage est une fraction de dénominateur $100$.", `$\\dfrac{${k}}{${n}} = \\dfrac{${k} \\times ${100 / n}}{100}$.`], solution: `$P = \\dfrac{${k}}{${n}} = \\dfrac{${pc}}{100} = ${nb(pc / 100)}$, soit $${nb(pc)}\\,\\%$.` };
  };

  GEN["pb4-contraire"] = function () {
    let t = rand(0, 6); if (t === 4) t = 1; if (t === 5) t = rand(2, 3);
    if (t === 0) { const p = rand(1, 99) / 100, forme = rand(0, 2);
      const C = pick([["qu'il pleuve demain à Mamoudzou", "qu'il ne pleuve pas"], ["que la barge parte en retard", "qu'elle parte à l'heure"], ["de gagner à ce jeu de grattage", "de perdre"], ["qu'une tortue née sur la plage de Moya atteigne la mer", "qu'elle ne l'atteigne pas"], ["qu'un élève choisi au hasard soit externe", "qu'il soit demi-pensionnaire (il n'y a que ces deux catégories)"], ["que le taxi-brousse soit complet", "qu'il reste des places"], ["qu'une graine de vanille germe", "qu'elle ne germe pas"], ["de voir des dauphins pendant une sortie dans le lagon", "de ne pas en voir"]]);
      const pT = forme === 0 ? nb(p) : forme === 1 ? `${nb(p * 100)}\\,\\%` : null;
      if (forme === 2) { const d = pick([4, 5, 8, 10, 20]), k = rand(1, d - 1);
        return { enonce: `La probabilité ${C[0]} est $${fr(k, d)}$. Quelle est la probabilité ${C[1]} ?${CONSIGNE_FR}`, mode: "nombre", prefixe: "Probabilité :", attendu: (d - k) / d,
          erreurs: [{ valeur: k / d, message: "Ça, c'est la probabilité de l'évènement de départ. On demande celle de son contraire." }, { valeur: (d - k) / (2 * d), message: "$1 = \\dfrac{" + d + "}{" + d + "}$ : on calcule $\\dfrac{" + d + "}{" + d + "} - \\dfrac{" + k + "}{" + d + "}$." }],
          aides: ["L'évènement demandé est l'évènement contraire de celui dont on connaît la probabilité.", "$P(\\text{non } A) = 1 - P(A)$.", `$1 - ${fr(k, d)} = ${fr(d, d)} - ${fr(k, d)}$.`], solution: `$P(\\text{non } A) = 1 - ${fr(k, d)} = ${fr(d - k, d)}${pgcd(d - k, d) > 1 ? ` = ${frS(d - k, d)}` : ""}$.` }; }
      return { enonce: `La probabilité ${C[0]} est $${pT}$. Quelle est la probabilité ${C[1]}${forme === 1 ? " (en pourcentage)" : ""} ?`, mode: "nombre", prefixe: "Probabilité :", suffixe: forme === 1 ? "%" : undefined, attendu: forme === 1 ? arr(100 - 100 * p, 4) : arr(1 - p, 4),
        erreurs: forme === 1 ? [{ valeur: arr(100 * p, 4), message: "Ça, c'est la probabilité de l'évènement de départ." }, { valeur: arr(1 - p, 4), message: "En pourcentage, le total vaut $100\\,\\%$ : calcule $100 - " + nb(100 * p) + "$." }] : [{ valeur: p, message: "Ça, c'est la probabilité de l'évènement de départ. On demande celle de son contraire." }, { valeur: arr(100 - p, 4), message: "Une probabilité est entre $0$ et $1$ : on calcule $1 - " + nb(p) + "$." }],
        aides: ["L'évènement demandé est l'évènement contraire de celui dont on connaît la probabilité.", forme === 1 ? "$P(\\text{non } A) = 100\\,\\% - P(A)$." : "$P(\\text{non } A) = 1 - P(A)$.", forme === 1 ? `$100 - ${nb(100 * p)}$.` : `$1 - ${nb(p)}$.`], solution: forme === 1 ? `$P(\\text{non } A) = 100\\,\\% - ${pT} = ${nb(arr(100 - 100 * p, 4))}\\,\\%$.` : `$P(\\text{non } A) = 1 - ${nb(p)} = ${nb(arr(1 - p, 4))}$.` }; }
    if (t === 1) { // contraire d'un évènement sur un dé
      const n = pick([6, 8, 10, 12]), s = rand(2, n - 1), sens = Math.random() < 0.5, ev = sens ? `obtenir au moins $${s}$` : `obtenir au plus $${s}$`, bon = sens ? `obtenir au plus $${s - 1}$` : `obtenir au moins $${s + 1}$`;
      const faux = sens ? [`obtenir au plus $${s}$`, `obtenir au moins $${s - 1}$`, `obtenir $${s}$`] : [`obtenir au moins $${s}$`, `obtenir au plus $${s - 1}$`, `obtenir $${n}$`];
      const { choix, attendu } = melange(bon, faux);
      return { enonce: `On lance un dé à $${n}$ faces numérotées de $1$ à $${n}$. L'évènement contraire de « ${ev} » est :`, figure: issues4(n, null, `Les ${n} issues du dé`), figureSolution: issues4(n, Array.from({ length: n }, (_, i) => i + 1).filter((x) => (sens ? x >= s : x <= s)), `Les issues de « ${ev.replace(/\$/g, "")} » sont en jaune ; les autres forment l'évènement contraire`), mode: "choix", choix, attendu,
        aides: ["L'évènement contraire contient toutes les issues qui ne réalisent pas l'évènement.", sens ? `« Au moins $${s}$ » : $${s}$ ; $${s + 1}$ ; … ; $${n}$.` : `« Au plus $${s}$ » : $1$ ; … ; $${s}$.`, "Quelles issues restent ?"],
        solution: `L'évènement « ${ev} » contient les issues ${sens ? `de $${s}$ à $${n}$` : `de $1$ à $${s}$`}. Les autres issues sont ${sens ? `de $1$ à $${s - 1}$` : `de $${s + 1}$ à $${n}$`} : l'évènement contraire est « ${bon} ».` };
    }
    if (t === 2 || t === 3) { // ne pas tirer une couleur (urne ou roue)
      const roue = t === 3, U = URNE4(), [c, k, L] = pick([["rouge", U.r, "R"], ["verte", U.v, "V"], ...(U.b ? [["bleue", U.b, "B"]] : [])]), n = U.n;
      const fig = roue ? roue4([["R", U.r, 2], ["V", U.v, 3], ...(U.b ? [["B", U.b, 0]] : [])], `Roue de ${n} secteurs identiques : ${U.r} rouges (R), ${U.v} verts (V)${U.b ? `, ${U.b} bleus (B)` : ""}`, true) : urne4([["R", U.r], ["V", U.v], ...(U.b ? [["B", U.b]] : [])]);
      const txt = roue ? `Une roue est partagée en $${n}$ secteurs identiques : $${U.r}$ rouge${U.r > 1 ? "s" : ""}, $${U.v}$ vert${U.v > 1 ? "s" : ""}${U.b ? ` et $${U.b}$ bleu${U.b > 1 ? "s" : ""}` : ""}. On la fait tourner. Quelle est la probabilité que la flèche ne s'arrête pas sur un secteur ${c.replace("rouge", "rouge").replace("verte", "vert").replace("bleue", "bleu")} ?` : `On tire une boule au hasard : ${U.txt}. Quelle est la probabilité de ne pas tirer une boule ${c} ?`;
      const cm = roue ? c.replace("verte", "vert").replace("bleue", "bleu") : c;
      return { enonce: `${txt}${CONSIGNE_FR}`, figure: fig, mode: "nombre", prefixe: "Probabilité :", attendu: (n - k) / n,
        erreurs: [{ valeur: k / n, message: `Ça, c'est la probabilité de l'évènement « ${roue ? "secteur" : "boule"} ${cm} ». On demande celle de son contraire.` }, ...(n - k < k ? [{ valeur: (n - k) / k, message: "On divise par le nombre **total** d'issues." }] : [{ valeur: 1 - 1 / n, message: `Il y a $${k}$ issue${k > 1 ? "s" : ""} ${cm}${k > 1 ? "s" : ""} à enlever, pas une seule.` }]), ...approx((n - k) / n)],
        aides: ["« Ne pas obtenir … » est l'évènement contraire.", `$P(\\text{${cm}}) = ${fr(k, n)}$.`, `$P(\\text{non ${cm}}) = 1 - ${fr(k, n)}$.`], solution: `$P(\\text{${cm}}) = ${fr(k, n)}$, donc $P(\\text{non ${cm}}) = 1 - ${fr(k, n)} = ${fr(n - k, n)}${pgcd(n - k, n) > 1 ? ` = ${frS(n - k, n)}` : ""}$ (ou directement : $${n - k}$ issues favorables sur $${n}$).` };
    }
    const Q = pick([
      ["On lance un dé. L'évènement contraire de « obtenir un nombre pair » est :", "obtenir un nombre impair", ["obtenir $6$", "obtenir un nombre premier", "ne pas lancer le dé"]],
      ["On lance un dé. L'évènement contraire de « obtenir au moins $5$ » est :", "obtenir au plus $4$", ["obtenir $5$ ou $6$", "obtenir moins de $5$ ou $5$", "obtenir $1$"]],
      ["On tire une carte. L'évènement contraire de « tirer un cœur » est :", "tirer un pique, un carreau ou un trèfle", ["tirer un pique", "tirer une carte rouge", "tirer un roi"]],
      ...(() => { const [p1, p2] = shuffle(["pile", "face"]); return [[`On lance deux pièces. L'évènement contraire de « obtenir au moins un ${p1} » est :`, `obtenir deux ${p2}s`, [`obtenir deux ${p1}s`, `obtenir exactement un ${p1}`, `obtenir un ${p1} et un ${p2}`]]]; })(),
      ["La somme des probabilités d'un évènement et de son contraire vaut :", "$1$", ["$0$", "$\\dfrac{1}{2}$", "$100$"]],
      ...(() => { const a = rand(12, 15); return [[`Dans une classe, on tire un élève au hasard. L'évènement contraire de « l'élève a moins de $${a}$ ans » est :`, `l'élève a $${a}$ ans ou plus`, [`l'élève a plus de $${a}$ ans`, `l'élève a $${a - 1}$ ans`, `l'élève a moins de $${a - 1}$ ans`]]]; })(),
      ["Si $P(A) = 1$, l'évènement contraire de $A$ est :", "impossible", ["certain", "de probabilité $\\dfrac{1}{2}$", "de probabilité $1$"]],
      ["Un évènement et son contraire :", "n'ont aucune issue en commun et, ensemble, contiennent toutes les issues", ["ont toujours la même probabilité", "ont au moins une issue en commun", "ont des probabilités dont le produit vaut $1$"]],
      ["On tire une boule d'une urne de boules rouges, vertes et bleues. Le contraire de « tirer une boule rouge » est :", "tirer une boule verte ou bleue", ["tirer une boule verte", "tirer une boule bleue", "ne pas tirer de boule"]],
      ["La probabilité qu'il pleuve un jour de janvier à Mamoudzou est $0{,}6$. La probabilité qu'il ne pleuve pas ce jour-là est :", "$0{,}4$", ["$0{,}6$", "$1{,}6$", "$-0{,}6$"]]
    ]);
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu, aides: ["L'évènement contraire de $A$ est réalisé exactement quand $A$ ne l'est pas.", "Ensemble, $A$ et son contraire contiennent toutes les issues, sans en partager.", "$P(A) + P(\\text{non } A) = 1$."], solution: `Réponse : ${Q[1]}.` };
  };

  // Évènements sur un dé à 6 faces : [texte, ensemble d'issues]
  const EVTS_DE4 = () => { const k = rand(1, 6), s = rand(2, 5), m = rand(2, 3); return [[`obtenir $${k}$`, [k]], ["obtenir un nombre pair", [2, 4, 6]], ["obtenir un nombre impair", [1, 3, 5]], [`obtenir un multiple de $${m}$`, m === 2 ? [2, 4, 6] : [3, 6]], [`obtenir au moins $${s}$`, [1, 2, 3, 4, 5, 6].filter((x) => x >= s)], [`obtenir au plus $${s}$`, [1, 2, 3, 4, 5, 6].filter((x) => x <= s)], ["obtenir un nombre premier", [2, 3, 5]], [`obtenir un diviseur de $${pick([4, 6, 9, 10])}$`, null]].map(([t, e]) => [t, e || [1, 2, 3, 4, 5, 6].filter((x) => +t.match(/\d+/)[0] % x === 0)]); };
  GEN["pb4-incompatibles"] = function () {
    const t = rand(0, 2);
    if (t === 0) { const den = pick([10, 20, 100]), pa = rand(1, den / 2 - 1) / den, pb = rand(1, den / 2 - 1) / den, ctx = pick([["$A$ et $B$ sont deux évènements incompatibles", "« $A$ ou $B$ »"], ["Au jeu de la fête de l'école, gagner une peluche ($A$) et gagner un ballon ($B$) sont des évènements incompatibles", "de gagner une peluche ou un ballon"], ["Un sac contient des jetons de couleurs ; tirer un jeton rouge ($A$) et tirer un jeton vert ($B$) sont incompatibles", "de tirer un jeton rouge ou vert"]]);
      return { enonce: `${ctx[0]}, avec $P(A) = ${nb(pa)}$ et $P(B) = ${nb(pb)}$. Quelle est la probabilité ${ctx[1].startsWith("«") ? "de " + ctx[1] : ctx[1]} ?`, mode: "nombre", prefixe: "Probabilité :", attendu: arr(pa + pb, 4),
        erreurs: [{ valeur: arr(pa * pb, 4), message: "Pour des évènements incompatibles, on **additionne** les probabilités." }, { valeur: arr(1 - pa - pb, 4), message: "Ça, c'est la probabilité qu'aucun des deux ne se réalise." }],
        aides: ["Deux évènements incompatibles ne peuvent pas se réaliser en même temps.", "Alors $P(A \\text{ ou } B) = P(A) + P(B)$.", `$${nb(pa)} + ${nb(pb)}$.`], solution: `$A$ et $B$ sont incompatibles, donc $P(A \\text{ ou } B) = ${nb(pa)} + ${nb(pb)} = ${nb(arr(pa + pb, 4))}$.` }; }
    if (t === 1) { // deux évènements sur un dé : incompatibles ou non ?
      const E = shuffle(EVTS_DE4()), [A, B] = [E[0], E[1]], com = A[1].filter((x) => B[1].includes(x)), inc = com.length === 0;
      if (A[1].join() === B[1].join()) return GEN["pb4-incompatibles"]();
      const choix = ["Oui, ils ne peuvent pas se réaliser en même temps", "Non, une même issue peut réaliser les deux", "Oui, car ils ont la même probabilité", "On ne peut pas savoir sans lancer le dé"];
      const lst = (L) => L.map((x) => `$${x}$`).join(" ; ");
      return { enonce: `On lance un dé à six faces. Les évènements « ${A[0]} » et « ${B[0]} » sont-ils incompatibles ?`, figure: issues4(6, null, "Les 6 issues du dé"), figureSolution: issues4(6, com, com.length ? `Issues communes aux deux évènements (en jaune) : ${com.join(", ")}` : "Aucune issue commune aux deux évènements"), mode: "choix", choix, attendu: inc ? 0 : 1,
        aides: ["Deux évènements sont incompatibles s'ils n'ont aucune issue en commun.", `« ${A[0]} » : ${lst(A[1])}.`, `« ${B[0]} » : ${lst(B[1])}.`],
        solution: `« ${A[0]} » : ${lst(A[1])} ; « ${B[0]} » : ${lst(B[1])}. ${inc ? "Aucune issue commune : les évènements sont incompatibles." : `L'issue ${lst(com.slice(0, 1))} réalise les deux : ils ne sont pas incompatibles.`}` };
    }
    // t === 2 : probabilité de « A ou B » sur un dé (incompatibles ou non)
    const E = shuffle(EVTS_DE4()), [A, B] = [E[0], E[1]], U = [...new Set([...A[1], ...B[1]])], com = A[1].filter((x) => B[1].includes(x));
    if (A[1].join() === B[1].join() || U.length === 6) return GEN["pb4-incompatibles"]();
    return { enonce: `On lance un dé équilibré à six faces. Quelle est la probabilité de l'évènement « ${A[0]} ou ${B[0].replace("obtenir ", "")} » ?${CONSIGNE_FR}`, figure: issues4(6, null, "Les 6 issues du dé"), figureSolution: issues4(6, U, `Issues favorables (en jaune) : ${U.sort((p, q) => p - q).join(", ")}`), mode: "nombre", prefixe: "Probabilité :", attendu: U.length / 6,
      erreurs: [...(com.length ? [{ valeur: (A[1].length + B[1].length) / 6, message: `Les deux évènements ne sont pas incompatibles : l'issue $${com[0]}$ est comptée deux fois si on additionne les probabilités.` }] : [{ valeur: (A[1].length * B[1].length) / 36, message: "Pour « ou », on ne multiplie pas : on compte les issues qui réalisent l'un ou l'autre." }]), { valeur: A[1].length / 6, message: "Il faut aussi compter les issues du deuxième évènement." }, ...approx(U.length / 6)],
      aides: ["« A ou B » est réalisé dès que l'un des deux (au moins) est réalisé.", `Issues de « ${A[0]} » : ${A[1].join(" ; ")} ; issues de « ${B[0]} » : ${B[1].join(" ; ")}.`, "Compte chaque issue une seule fois."], solution: `Les issues favorables sont $${U.sort((p, q) => p - q).join(" ; ")}$ : il y en a $${U.length}$ sur $6$, donc $P = ${fr(U.length, 6)}${pgcd(U.length, 6) > 1 ? ` = ${frS(U.length, 6)}` : ""}$.${com.length ? "" : " (Les évènements sont incompatibles : on aurait aussi pu additionner les probabilités.)"}` };
  };

  GEN["pb4-tableau"] = function () {
    for (;;) { const k = rand(3, 5), P = Array.from({ length: k - 1 }, () => rand(1, 30) / 100), s = arr(P.reduce((a, b) => a + b, 0), 4); if (s >= 0.95) continue;
      const x = arr(1 - s, 4), noms = ["Rouge", "Vert", "Bleu", "Jaune", "Noir"].slice(0, k), fig = Math.random() < 0.6;
      return { enonce: `Une roue est partagée en secteurs de couleurs${fig ? " (voir la figure)" : ""}. Le tableau donne la probabilité de chaque couleur. Quelle est la probabilité de « ${noms[k - 1]} » ?`, figure: fig ? roue4(noms.map((nm, i) => [i < k - 1 ? nm : "?", i < k - 1 ? P[i] : x, [2, 3, 0, 1, 2][i]]), `Roue avec ${k} secteurs de tailles différentes ; le dernier secteur est marqué « ? »`) : undefined, tableau: { lignes: [["\\text{Couleur}", "\\text{Probabilité}"], ...noms.map((n, i) => [`\\text{${n}}`, i < k - 1 ? nb(P[i]) : "\\ldots"])] }, mode: "nombre", prefixe: "Probabilité :", attendu: x,
        erreurs: [{ valeur: s, message: "Ça, c'est la somme des probabilités connues. Il faut la retirer de $1$." }, { valeur: arr(1 / k, 4), message: "Les secteurs n'ont pas la même probabilité : on utilise le fait que la somme vaut $1$." }],
        aides: ["La somme des probabilités de toutes les issues vaut $1$.", `Somme des probabilités connues : $${P.map(nb).join(" + ")} = ${nb(s)}$.`, `$1 - ${nb(s)}$.`], solution: `$1 - (${P.map(nb).join(" + ")}) = 1 - ${nb(s)} = ${nb(x)}$.` }; }
  };

  /* =====================================================================
     Chapitre 11 : cosinus d'un angle (cs4-)
     Figure : triangle rectangle en R ; l'angle étudié est en P1 (en bas à droite).
     ===================================================================== */
  const DEG4 = Math.PI / 180;
  // figCos : triangle rectangle en R (côtés de l'angle droit a horizontal, b vertical), angle marqué en P1 (ou en P2 si p2)
  const figCos = (N, labs, ang, a, b, p2) => figureRectangle4(N, labs, a || 4, b || 3, ang || "", p2);
  const nomsCos4 = () => (Math.random() < 0.4 ? pick(NOMS3_4) : shuffle("ABCDEFGHIJKLMNPRSTUV".split("")).slice(0, 3));
  FIGURES["cs4-triangle"] = () => figCos(["A", "B", "C"], ["adjacent", "opposé", "hypoténuse"], "");
  FIGURES["cs4-cours-longueur"] = () => figCos(["A", "B", "C"], ["?", "", "8 cm"], "35°", Math.cos(35 * Math.PI / 180), Math.sin(35 * Math.PI / 180));
  FIGURES["cs4-cours-angle"] = () => figCos(["A", "B", "C"], ["4 cm", "", "7 cm"], "?", 4, Math.sqrt(33));
  FIGURES["cs4-qcm-p2"] = () => figCos(["R", "S", "T"], ["", "", ""], "", 3, 4, true);

  GEN["cs4-rapport"] = function () {
    const N = nomsCos4(), [R, P1, P2] = N;
    if (Math.random() < 0.55) {
      const [a, b, c] = pick(TRIPLES), autre = Math.random() < 0.5, adj = autre ? b : a, v = adj / c;
      const ang = autre ? `${R}${P2}${P1}` : `${R}${P1}${P2}`;
      return { enonce: `$${R}${P1}${P2}$ est rectangle en $${R}$ avec $${R}${P1} = ${nb(a)}$ cm, $${R}${P2} = ${nb(b)}$ cm et $${P1}${P2} = ${nb(c)}$ cm. Calcule $\\cos \\widehat{${ang}}$.${CONSIGNE_FR}`, figure: figCos(N, [lab(a), lab(b), lab(c)], "?", a, b, autre), mode: "nombre", prefixe: "Cosinus :", attendu: v,
        erreurs: [{ valeur: (autre ? a : b) / c, message: "Ça, c'est le rapport avec le côté opposé. Le cosinus utilise le côté adjacent." }, { valeur: c / adj, message: "C'est l'inverse : l'hypoténuse est au dénominateur." }, ...approx(v)],
        aides: ["$\\cos = \\dfrac{\\text{côté adjacent}}{\\text{hypoténuse}}$.", `L'hypoténuse est $[${P1}${P2}]$.`, `Le côté adjacent à l'angle $\\widehat{${ang}}$ est $[${R}${autre ? P2 : P1}]$.`],
        solution: `$\\cos \\widehat{${ang}} = \\dfrac{${R}${autre ? P2 : P1}}{${P1}${P2}} = \\dfrac{${nb(adj)}}{${nb(c)}}${Number.isInteger(arr(v * 10000, 6)) ? ` = ${nb(arr(v, 6))}` : ""}$.` };
    }
    const enP2 = Math.random() < 0.5, S = enP2 ? P2 : P1, O = enP2 ? P1 : P2, ang = `${R}${S}${O}`;
    const bonne = `$\\dfrac{${R}${S}}{${P1}${P2}}$`, faux = [`$\\dfrac{${R}${O}}{${P1}${P2}}$`, `$\\dfrac{${P1}${P2}}{${R}${S}}$`, `$\\dfrac{${R}${S}}{${R}${O}}$`];
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: `Le triangle $${R}${P1}${P2}$ est rectangle en $${R}$. Quelle est l'expression de $\\cos \\widehat{${ang}}$ ?`, figure: figCos(N, ["", "", ""], "", pick([4, 5, 3]), pick([3, 2.5, 4]), enP2), mode: "choix", choix, attendu,
      aides: ["$\\cos = \\dfrac{\\text{côté adjacent}}{\\text{hypoténuse}}$.", `L'hypoténuse est le côté opposé à l'angle droit : $[${P1}${P2}]$.`, `Le côté adjacent à l'angle en $${S}$ (autre que l'hypoténuse) est $[${R}${S}]$.`],
      solution: `$\\cos \\widehat{${ang}} = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}} = \\dfrac{${R}${S}}{${P1}${P2}}$.` };
  };

  GEN["cs4-longueur"] = function () {
    const N = nomsCos4(), [R, P1, P2] = N, a = rand(15, 75), t = rand(0, 1), ca = Math.cos(a * DEG4), sa = Math.sin(a * DEG4);
    if (t === 0) { const h = rand(4, 20), adj = arr(h * ca, 1);
      return { enonce: `$${R}${P1}${P2}$ est rectangle en $${R}$, $${P1}${P2} = ${h}$ cm et $\\widehat{${R}${P1}${P2}} = ${a}^\\circ$. Calcule $${R}${P1}$ arrondi au dixième.`, figure: figCos(N, ["?", "", `${h} cm`], `${a}°`, ca, sa), mode: "nombre", prefixe: `$${R}${P1} \\approx$`, suffixe: "cm", attendu: adj,
        erreurs: [{ valeur: arr(h / ca, 1), message: "On multiplie l'hypoténuse par le cosinus de l'angle." }, { valeur: arr(h * Math.cos(a), 1), message: "Ta calculatrice est en radians : règle-la en mode **degrés**." }],
        aides: [`$\\cos \\widehat{${R}${P1}${P2}} = \\dfrac{${R}${P1}}{${P1}${P2}}$.`, `$\\cos ${a}^\\circ = \\dfrac{${R}${P1}}{${h}}$.`, `$${R}${P1} = ${h} \\times \\cos ${a}^\\circ$ (calculatrice en mode degrés).`],
        solution: `$${R}${P1} = ${h} \\times \\cos ${a}^\\circ \\approx ${nb(adj)}$ cm.` }; }
    const adj = rand(3, 15), h = arr(adj / ca, 1);
    return { enonce: `$${R}${P1}${P2}$ est rectangle en $${R}$, $${R}${P1} = ${adj}$ cm et $\\widehat{${R}${P1}${P2}} = ${a}^\\circ$. Calcule l'hypoténuse $${P1}${P2}$ arrondie au dixième.`, figure: figCos(N, [`${adj} cm`, "", "?"], `${a}°`, ca, sa), mode: "nombre", prefixe: `$${P1}${P2} \\approx$`, suffixe: "cm", attendu: h,
      erreurs: [{ valeur: arr(adj * ca, 1), message: "L'hypoténuse est plus longue que le côté adjacent : on divise par le cosinus." }, { valeur: arr(adj / Math.cos(a), 1), message: "Ta calculatrice est en radians : règle-la en mode **degrés**." }],
      aides: [`$\\cos ${a}^\\circ = \\dfrac{${adj}}{${P1}${P2}}$.`, "Avec un produit en croix : $" + P1 + P2 + " = \\dfrac{" + adj + "}{\\cos " + a + "^\\circ}$.", "Utilise la calculatrice en mode degrés."],
      solution: `$${P1}${P2} = \\dfrac{${adj}}{\\cos ${a}^\\circ} \\approx ${nb(h)}$ cm.` };
  };

  GEN["cs4-angle"] = function () {
    const N = nomsCos4(), [R, P1, P2] = N; let adj, h;
    do { h = rand(4, 20); adj = rand(1, h - 1); } while (adj / h < 0.1);
    const ang = Math.round(Math.acos(adj / h) / DEG4);
    return { enonce: `$${R}${P1}${P2}$ est rectangle en $${R}$, $${R}${P1} = ${adj}$ cm et $${P1}${P2} = ${h}$ cm. Calcule $\\widehat{${R}${P1}${P2}}$ arrondi au degré.`, figure: figCos(N, [`${adj} cm`, "", `${h} cm`], "?", adj, Math.sqrt(h * h - adj * adj)), mode: "nombre", prefixe: "Angle :", suffixe: "°", attendu: ang,
      erreurs: [{ valeur: Math.round(Math.asin(adj / h) / DEG4), message: "Utilise la touche $\\cos^{-1}$ (ou Arccos), pas $\\sin^{-1}$ : tu as obtenu l'autre angle aigu." }, { valeur: arr(Math.acos(adj / h), 2), message: "Ta calculatrice est en radians : règle-la en mode **degrés**." }],
      aides: [`$\\cos \\widehat{${R}${P1}${P2}} = \\dfrac{${adj}}{${h}}$.`, "Pour retrouver l'angle, utilise la touche $\\cos^{-1}$ (ou Arccos) de la calculatrice, en mode degrés.", `$\\cos^{-1}\\left(\\dfrac{${adj}}{${h}}\\right) \\approx ${nb(arr(Math.acos(adj / h) / DEG4, 2))}$.`],
      solution: `$\\cos \\widehat{${R}${P1}${P2}} = \\dfrac{${adj}}{${h}}$, donc $\\widehat{${R}${P1}${P2}} = \\cos^{-1}\\left(\\dfrac{${adj}}{${h}}\\right) \\approx ${nb(arr(Math.acos(adj / h) / DEG4, 2))}^\\circ$, soit $${ang}^\\circ$ au degré près.` };
  };

  GEN["cs4-problemes"] = function () {
    const t = rand(0, 3), nom = pick(PRENOMS4);
    if (t === 0) { const L = rand(30, 60) / 10, d = rand(8, 20) / 10, ang = Math.round(Math.acos(d / L) / DEG4), hh = Math.sqrt(L * L - d * d);
      return { enonce: `Pour cueillir des noix de coco, ${nom} pose une échelle de $${nb(L)}$ m contre un mur vertical ; son pied est à $${nb(d)}$ m du mur. Quel angle fait l'échelle avec le sol, arrondi au degré ?`, figure: scene4(hh, d, ["", `${nbTexte(d)} m`, `${nbTexte(L)} m`], "mur", "?"), mode: "nombre", prefixe: "Angle :", suffixe: "°", attendu: ang,
        erreurs: [{ valeur: 90 - ang, message: "Tu as calculé l'angle entre l'échelle et le mur : le côté adjacent à l'angle avec le sol est la distance au mur." }, { valeur: arr(d / L, 2), message: "Ça, c'est le cosinus de l'angle : utilise la touche $\\cos^{-1}$ pour trouver l'angle." }],
        aides: ["Le mur, le sol et l'échelle forment un triangle rectangle ; l'échelle est l'hypoténuse.", `$\\cos(\\text{angle}) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}} = \\dfrac{${nb(d)}}{${nb(L)}}$.`, "Utilise $\\cos^{-1}$ (calculatrice en degrés)."], solution: `$\\cos \\alpha = \\dfrac{${nb(d)}}{${nb(L)}}$, donc $\\alpha = \\cos^{-1}\\left(\\dfrac{${nb(d)}}{${nb(L)}}\\right) \\approx ${ang}^\\circ$.` }; }
    if (t === 1) { const L = rand(50, 300), a = rand(5, 30), h = arr(L * Math.cos(a * DEG4), 1), lieu = pick(["la route qui monte vers le Mont Choungui", "la côte de Mtsapéré", "la route de Combani", "la montée vers Kani-Kéli"]);
      return { enonce: `Sur ${lieu}, la pente fait un angle de $${a}^\\circ$ avec l'horizontale. Un scooter parcourt $${L}$ m sur cette route. De quelle distance a-t-il avancé à l'horizontale, arrondie au dixième de mètre ?`, figure: scene4(L * Math.sin(a * DEG4), L * Math.cos(a * DEG4), ["", "?", `${L} m`], "", `${a}°`), mode: "nombre", prefixe: "Distance :", suffixe: "m", attendu: h,
        erreurs: [{ valeur: arr(L / Math.cos(a * DEG4), 1), message: "La distance horizontale est plus courte que la route : on multiplie par le cosinus." }, { valeur: arr(L * Math.cos(a), 1), message: "Ta calculatrice est en radians : règle-la en mode **degrés**." }],
        aides: ["La route est l'hypoténuse d'un triangle rectangle ; la distance horizontale est le côté adjacent à l'angle.", `$\\cos ${a}^\\circ = \\dfrac{d}{${L}}$.`, `$d = ${L} \\times \\cos ${a}^\\circ$.`], solution: `$d = ${L} \\times \\cos ${a}^\\circ \\approx ${nb(h)}$ m.` }; }
    if (t === 2) { // câble ou toboggan : hypoténuse
      const d = rand(4, 30), a = rand(15, 60), L = arr(d / Math.cos(a * DEG4), 1), C = pick([[`Une tyrolienne au-dessus d'une rivière près de ${pick(["Dembéni", "Combani", "Coconi"])} descend en ligne droite`, "le câble", "câble"], ["Un toboggan aquatique de la base nautique descend en ligne droite", "le toboggan", "toboggan"], ["Un hauban maintient le mât d'un voilier dans le lagon", "le hauban", "hauban"]]);
      return { enonce: `${C[0]} ; ${C[1]} fait un angle de $${a}^\\circ$ avec l'horizontale et ses extrémités sont écartées de $${d}$ m horizontalement. Quelle est la longueur ${C[1].replace("le ", "du ")}, arrondie au dixième de mètre ?`, figure: scene4(d * Math.tan(a * DEG4), d, ["", `${d} m`, "?"], "", `${a}°`), mode: "nombre", prefixe: "Longueur :", suffixe: "m", attendu: L,
        erreurs: [{ valeur: arr(d * Math.cos(a * DEG4), 1), message: `${C[1][0].toUpperCase() + C[1].slice(1)} est l'hypoténuse, plus long que la distance horizontale : on divise par le cosinus.` }, { valeur: arr(d / Math.cos(a), 1), message: "Ta calculatrice est en radians : règle-la en mode **degrés**." }],
        aides: [`${C[1][0].toUpperCase() + C[1].slice(1)} est l'hypoténuse ; la distance horizontale est le côté adjacent à l'angle.`, `$\\cos ${a}^\\circ = \\dfrac{${d}}{L}$.`, `$L = \\dfrac{${d}}{\\cos ${a}^\\circ}$.`], solution: `$\\cos ${a}^\\circ = \\dfrac{${d}}{L}$, donc $L = \\dfrac{${d}}{\\cos ${a}^\\circ} \\approx ${nb(L)}$ m.` }; }
    // t === 3 : angle d'une rampe d'accès
    const d = rand(30, 120) / 10, L = arr(d + rand(1, 10) / 10, 1), ang = Math.round(Math.acos(d / L) / DEG4);
    return { enonce: `Une rampe d'accès au débarcadère de la barge mesure $${nb(L)}$ m de long et couvre $${nb(d)}$ m à l'horizontale. Quel angle fait-elle avec l'horizontale, arrondi au degré ?`, figure: scene4(Math.sqrt(L * L - d * d), d, ["", `${nbTexte(d)} m`, `${nbTexte(L)} m`], "", "?"), mode: "nombre", prefixe: "Angle :", suffixe: "°", attendu: ang,
      erreurs: [{ valeur: 90 - ang, message: "Ça, c'est l'autre angle aigu du triangle." }, { valeur: Math.round(Math.acos(d / L) * 100) / 100, message: "Ta calculatrice est en radians : règle-la en mode **degrés**." }],
      aides: ["La rampe est l'hypoténuse ; la distance horizontale est le côté adjacent à l'angle.", `$\\cos \\alpha = \\dfrac{${nb(d)}}{${nb(L)}}$.`, "Utilise $\\cos^{-1}$ (calculatrice en degrés)."], solution: `$\\cos \\alpha = \\dfrac{${nb(d)}}{${nb(L)}}$, donc $\\alpha = \\cos^{-1}\\left(\\dfrac{${nb(d)}}{${nb(L)}}\\right) \\approx ${ang}^\\circ$.` };
  };

  /* =====================================================================
     Chapitre 12 : translations (tl4-)
     ===================================================================== */
  function grilleT(o) {
    const u = 24, W = 12 * u + 16, H = 8 * u + 16, X = (x) => 8 + x * u, Y = (y) => 8 + (8 - y) * u;
    let s = `<svg class="graph grille-sym" viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.aria}"><g class="g-grid">`;
    for (let i = 0; i <= 12; i++) s += `<line x1="${X(i)}" y1="${Y(0)}" x2="${X(i)}" y2="${Y(8)}"/>`;
    for (let j = 0; j <= 8; j++) s += `<line x1="${X(0)}" y1="${Y(j)}" x2="${X(12)}" y2="${Y(j)}"/>`;
    s += `</g>`;
    (o.polys || []).forEach((p) => {
      s += `<polygon class="${p.classe || "g-poly"}" points="${p.pts.map(([x, y]) => `${X(x)},${Y(y)}`).join(" ")}"/>`;
      if (p.num) { const g = p.pts.reduce((a, [x, y]) => [a[0] + x / p.pts.length, a[1] + y / p.pts.length], [0, 0]); s += `<text class="g-num-angle" x="${X(g[0])}" y="${Y(g[1]) + 5}" text-anchor="middle">${p.num}</text>`; }
    });
    if (o.fleche) { const [[x1, y1], [x2, y2]] = o.fleche; s += `<line class="g-segment" x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}"/>`; const ang = Math.atan2(Y(y2) - Y(y1), X(x2) - X(x1)), hx = X(x2), hy = Y(y2); s += `<path class="g-end" d="M${hx} ${hy} L${(hx - 10 * Math.cos(ang - 0.4)).toFixed(1)} ${(hy - 10 * Math.sin(ang - 0.4)).toFixed(1)} L${(hx - 10 * Math.cos(ang + 0.4)).toFixed(1)} ${(hy - 10 * Math.sin(ang + 0.4)).toFixed(1)} Z"/>`; }
    (o.points || []).forEach(([n, [x, y]]) => { s += `<circle class="g-point" cx="${X(x)}" cy="${Y(y)}" r="3.5"/><text class="g-plabel" x="${X(x) + 6}" y="${Y(y) - 6}">${n}</text>`; });
    return s + `</svg>`;
  }
  const dansT = ([x, y]) => x >= 0 && x <= 11 && y >= 0 && y <= 7;
  FIGURES["tl4-translation"] = () => grilleT({ fleche: [[1, 1], [5, 3]], points: [["A", [1, 1]], ["B", [5, 3]]], polys: [{ pts: [[2, 4], [4, 4], [3, 6]] }, { pts: [[6, 6], [8, 6], [7, 8]], classe: "g-poly g-poly-image" }], aria: "Quadrillage : la translation qui transforme A en B déplace le triangle de 4 carreaux vers la droite et 2 vers le haut" });

  // Image d'une figure : quatre figures numérotées, une seule est la bonne image
  const FORMES_T4 = [[[0, 0], [3, 0], [3, 2]], [[0, 0], [3, 0], [1, 2]], [[0, 0], [2, 0], [2, 1], [1, 2]], [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [0, 2]], [[0, 0], [2, 0], [0, 3]]];
  function figureT4() {
    const bb = (L) => [Math.min(...L.map((p) => p[0])), Math.max(...L.map((p) => p[0])), Math.min(...L.map((p) => p[1])), Math.max(...L.map((p) => p[1]))];
    const tr = (L, v) => L.map(([x, y]) => [x + v[0], y + v[1]]), norm = (L) => { const b = bb(L); return tr(L, [-b[0], -b[2]]); };
    const place = (L) => { const b = bb(L); return tr(L, [rand(0, 12 - b[1]), rand(0, 8 - b[3])]); };
    const libre = (a, b) => a[1] < b[0] || b[1] < a[0] || a[3] < b[2] || b[3] < a[2];
    for (let e = 0; e < 6000; e++) {
      const F = pick(FORMES_T4), P = place(F), v = [rand(-7, 7), rand(-5, 5)]; if (Math.abs(v[0]) + Math.abs(v[1]) < 4) continue;
      const img = tr(P, v), w = pick([[-v[0], -v[1]], [v[1], v[0]], [v[0], -v[1]], [-v[0], v[1]]]); if (w[0] === v[0] && w[1] === v[1]) continue;
      const cand = [img, tr(P, w), place(norm(F.map(([x, y]) => [-x, y]))), place(norm(F.map(([x, y]) => [-x, -y])))];
      const toutes = [P, ...cand], B = toutes.map(bb);
      if (!B.every((b) => b[0] >= 0 && b[1] <= 12 && b[2] >= 0 && b[3] <= 8)) continue;
      let ok = true; for (let i = 0; i < 5 && ok; i++) for (let j = i + 1; j < 5; j++) if (!libre(B[i], B[j])) { ok = false; break; }
      if (!ok) continue;
      const pA = [rand(0, 11), rand(0, 7)], pB = [pA[0] + v[0], pA[1] + v[1]];
      if (!dansT(pB)) continue;
      if (B.some((b) => [pA, pB].some(([x, y]) => x >= b[0] && x <= b[1] && y >= b[2] && y <= b[3]))) continue;
      const ordre = shuffle([0, 1, 2, 3]), bon = ordre.indexOf(0);
      const polys = [{ pts: P }, ...ordre.map((k, i) => ({ pts: cand[k], classe: "g-poly g-poly-image", num: String(i + 1) }))];
      const sens = (k, plus, moins) => (k ? `$${Math.abs(k)}$ carreau${Math.abs(k) > 1 ? "x" : ""} vers ${k > 0 ? plus : moins}` : "");
      const dep = [sens(v[0], "la droite", "la gauche"), sens(v[1], "le haut", "le bas")].filter(Boolean).join(" et ");
      return { enonce: "Quelle figure numérotée est l'image de la figure sans numéro par la translation qui transforme $A$ en $B$ ?", figure: grilleT({ fleche: [pA, pB], points: [["A", pA], ["B", pB]], polys, aria: "Quadrillage : une figure sans numéro, quatre figures numérotées de 1 à 4 et une flèche de A vers B" }), mode: "choix", choix: ["la figure 1", "la figure 2", "la figure 3", "la figure 4"], attendu: bon,
        aides: ["L'image par une translation a la même forme et la même orientation : elle n'est ni retournée ni tournée.", `Pour aller de $A$ à $B$ : ${dep}.`, "Fais subir ce déplacement à un sommet de la figure, puis cherche la figure qui commence là."],
        solution: `La translation déplace chaque point de ${dep}. La figure ${bon + 1} est obtenue ainsi. Parmi les autres, ${[2, 3].map((k) => ordre.indexOf(k) + 1).sort().join(" et ")} sont retournées ou tournées, et la figure ${ordre.indexOf(1) + 1} a glissé, mais pas du bon déplacement.` };
    }
    return null;
  }

  GEN["tl4-point"] = function () {
    if (Math.random() < 0.4) { const q = figureT4(); if (q) return q; }
    for (let e = 0; e < 2000; e++) {
      const A = [rand(0, 5), rand(0, 7)], v = [rand(-4, 5), rand(-4, 4)]; if (Math.abs(v[0]) + Math.abs(v[1]) < 3) continue; const B = [A[0] + v[0], A[1] + v[1]]; if (!dansT(B)) continue;
      const M = [rand(0, 11), rand(0, 7)], img = [M[0] + v[0], M[1] + v[1]]; if (!dansT(img)) continue;
      const cand = [img, [M[0] - v[0], M[1] - v[1]], [M[0] + v[1], M[1] + v[0]], [M[0] + v[0], M[1] - v[1]], [M[0] - v[0], M[1] + v[1]]].filter(dansT);
      const uniq = []; cand.forEach((p) => { if (!uniq.some((q) => Math.abs(q[0] - p[0]) + Math.abs(q[1] - p[1]) < 2) && ![A, B, M].some((q) => Math.abs(q[0] - p[0]) + Math.abs(q[1] - p[1]) < 2)) uniq.push(p); });
      if (uniq.length < 4 || uniq[0] !== cand[0] || cand[0] !== img) continue;
      const L = shuffle(uniq.slice(0, 4).map((p, i) => ({ p, ok: i === 0 }))), noms = ["E", "F", "G", "H"], bon = L.findIndex((z) => z.ok);
      return { enonce: "Quel point est l'image de $M$ par la translation qui transforme $A$ en $B$ ?", figure: grilleT({ fleche: [A, B], points: [["A", A], ["B", B], ["M", M], ...L.map((z, i) => [noms[i], z.p])], aria: "Quadrillage avec A, B, M et quatre points E, F, G, H" }), mode: "choix", choix: noms.map((n) => `$${n}$`), attendu: bon,
        aides: ["Une translation fait glisser tous les points de la même façon : même direction, même sens, même longueur.", `Pour aller de $A$ à $B$ : $${v[0]}$ carreau(x) horizontalement et $${v[1]}$ verticalement.`, "Fais le même déplacement à partir de $M$."],
        solution: `De $A$ à $B$, on se déplace de $${v[0] > 0 ? "+" : ""}${v[0]}$ horizontalement et $${v[1] > 0 ? "+" : ""}${v[1]}$ verticalement. Le même glissement à partir de $M$ mène en $${noms[bon]}$ : $AB${noms[bon]}M$ est un parallélogramme.` };
    }
  };

  const FORMES4 = [[[0, 0], [3, 0], [3, 2]], [[0, 0], [2, 0], [2, 1], [1, 3]], [[0, 0], [3, 0], [1, 2]], [[0, 0], [1, 0], [1, 2], [2, 2], [2, 3], [0, 3]]];
  GEN["tl4-identifier"] = function () {
    for (let e = 0; e < 3000; e++) {
      const F = pick(FORMES4), d = [rand(0, 3), rand(0, 4)], P = F.map(([x, y]) => [x + d[0], y + d[1]]), t = rand(0, 2);
      let Q, nom;
      if (t === 0) { const v = [rand(4, 7), rand(-3, 3)]; Q = P.map(([x, y]) => [x + v[0], y + v[1]]); nom = "une translation"; }
      if (t === 1) { const a = rand(5, 7); Q = P.map(([x, y]) => [2 * a - x, y]); nom = "une symétrie axiale"; }
      if (t === 2) { const O = [rand(5, 6), rand(3, 4)]; Q = P.map(([x, y]) => [2 * O[0] - x, 2 * O[1] - y]); nom = "une symétrie centrale"; }
      if (!Q.every(dansT) && !Q.every(([x, y]) => x >= 0 && x <= 12 && y >= 0 && y <= 8)) continue;
      const k = (L) => L.map((p) => p.join(",")).sort().join(";"); if (k(P) === k(Q)) continue;
      const bb = (L) => [Math.min(...L.map((p) => p[0])), Math.max(...L.map((p) => p[0])), Math.min(...L.map((p) => p[1])), Math.max(...L.map((p) => p[1]))], b1 = bb(P), b2 = bb(Q);
      if (b1[0] <= b2[1] && b2[0] <= b1[1] && b1[2] <= b2[3] && b2[2] <= b1[3]) continue;
      const choix = ["une translation", "une symétrie axiale", "une symétrie centrale"];
      return { enonce: "Quelle transformation permet de passer de la figure bleue à la figure jaune ?", figure: grilleT({ polys: [{ pts: P }, { pts: Q, classe: "g-poly g-poly-image" }], aria: "Quadrillage avec une figure et son image" }), mode: "choix", choix, attendu: t,
        aides: ["Translation : la figure glisse, sans tourner ni se retourner.", "Symétrie axiale : la figure est retournée « en miroir ».", "Symétrie centrale : la figure fait un demi-tour (« la tête en bas »)."],
        solution: `La figure ${t === 0 ? "a glissé sans tourner ni se retourner" : t === 1 ? "est retournée comme dans un miroir" : "a fait un demi-tour"} : c'est ${nom}.` };
    }
  };

  /* Figures « une figure et son image » sur feuille blanche (coordonnées en pixels, y vers le bas) */
  const centre4 = (L) => [L.reduce((s, p) => s + p[0], 0) / L.length, L.reduce((s, p) => s + p[1], 0) / L.length];
  const horsDe4 = (p, c, d) => { const dx = p[0] - c[0], dy = p[1] - c[1], n = Math.hypot(dx, dy) || 1; return [p[0] + (d * dx) / n, p[1] + (d * dy) / n]; };
  // étiquette au milieu de [pq], du côté opposé au point c
  const labSeg4 = (p, q, t, c, d) => { const m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; let nx = q[1] - p[1], ny = p[0] - q[0]; const n = Math.hypot(nx, ny) || 1; nx /= n; ny /= n; if ((m[0] - c[0]) * nx + (m[1] - c[1]) * ny < 0) { nx = -nx; ny = -ny; } return T4(m[0] + (d || 14) * nx, m[1] + (d || 14) * ny + 4, t, "g-mesure"); };
  // arc de l'angle de sommet S entre [SP) et [SQ)
  const arcT4 = (S, P, Q, r, txt) => {
    const a1 = Math.atan2(P[1] - S[1], P[0] - S[0]); let d = Math.atan2(Q[1] - S[1], Q[0] - S[0]) - a1;
    while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
    const a2 = a1 + d, am = a1 + d / 2;
    return `<path class="g-arc" d="M${f1(S[0] + r * Math.cos(a1))} ${f1(S[1] + r * Math.sin(a1))} A${r} ${r} 0 0 ${d > 0 ? 1 : 0} ${f1(S[0] + r * Math.cos(a2))} ${f1(S[1] + r * Math.sin(a2))}"/>` + (txt ? T4(S[0] + (r + 16) * Math.cos(am), S[1] + (r + 16) * Math.sin(am) + 4, txt, "g-mesure") : "");
  };
  // o : P (sommets), v (déplacement), noms, nomsI (noms des images, sinon noms + « ' »), ferme (polygone ou segment),
  // cotes [[i, j, texte, im]] (im = true : sur l'image ; im = "guide" : sur [P_i P'_i]), angles [[i, texte, im]], flecheTxt, aria
  function figTrans4(o) {
    const Q0 = o.P.map(([x, y]) => [x + o.v[0], y + o.v[1]]), tous = o.P.concat(Q0);
    const mx = Math.min(...tous.map((p) => p[0])) - 36, my = Math.min(...tous.map((p) => p[1])) - 30;
    const W = Math.max(...tous.map((p) => p[0])) - mx + 36, H = Math.max(...tous.map((p) => p[1])) - my + 30;
    const t = (L) => L.map(([x, y]) => [x - mx, y - my]), A = t(o.P), B = t(Q0), cA = centre4(A), cB = centre4(B), cM = [(cA[0] + cB[0]) / 2, (cA[1] + cB[1]) / 2];
    const nomsI = o.nomsI || o.noms.map((n) => n + "'");
    let s = "";
    A.forEach((p, i) => { if (i) s += L4(p[0], p[1], B[i][0], B[i][1], "g-guide"); });
    const forme = (L, cl) => (o.ferme ? P4(L, cl) : L4(L[0][0], L[0][1], L[1][0], L[1][1], "g-segment"));
    s += forme(A, "g-poly") + forme(B, "g-poly g-poly-image") + F4(A[0][0], A[0][1], B[0][0], B[0][1], "g-droite");
    if (o.flecheTxt) s += labSeg4(A[0], B[0], o.flecheTxt, cM);
    (o.angles || []).forEach(([i, txt, im]) => { const L = im ? B : A, n = L.length; s += arcT4(L[i], L[(i + 1) % n], L[(i + n - 1) % n], 18, txt); });
    (o.cotes || []).forEach(([i, j, txt, im]) => {
      if (im === "guide") { s += labSeg4(A[i], B[i], txt, cM); return; }
      const L = im ? B : A; s += labSeg4(L[i], L[j], txt, o.ferme ? (im ? cB : cA) : (im ? cA : cB));
    });
    A.forEach((p, i) => { const q = horsDe4(p, cA, 13); s += C4(p[0], p[1], 2.5) + T4(q[0], q[1] + 4, o.noms[i]); });
    B.forEach((p, i) => { const q = horsDe4(p, cB, 13); s += C4(p[0], p[1], 2.5) + T4(q[0], q[1] + 4, nomsI[i]); });
    return svg4(W, H, o.aria, s);
  }
  const tourne4 = (L, a) => L.map(([x, y]) => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)]);
  const diam4 = (L) => Math.max(...L.flatMap((p) => L.map((q) => Math.hypot(p[0] - q[0], p[1] - q[1]))));
  // déplacement de direction aléatoire, assez long pour que la figure et son image ne se chevauchent pas
  const depl4 = (L, mini) => { const ph = (rand(0, 35) * 10 + rand(0, 9)) * DEG4, n = Math.max(diam4(L) + 34, mini || 0); return [n * Math.cos(ph), n * Math.sin(ph)]; };
  // Frise : motif répété par translation (pas en pixels), s0 = distance du bord au premier motif
  function friseT4(pas, s0txt, dtxt, n) {
    const x0 = 16, e = 46, w = 30, y = 34, h = 34; let s = L4(x0, 14, x0, y + h + 18, "g-droite");
    for (let i = 0; i < n; i++) { const x = x0 + e + i * pas; s += P4([[x, y + h], [x + w / 2, y], [x + w, y + h]], i ? "g-poly g-poly-image" : "g-poly") + P4([[x + w / 2, y + h], [x + w / 4, y + h / 2], [x + w * 0.75, y + h / 2]], "g-poly") + T4(x + w / 2, y + h + 16, i ? `${i + 1}e` : "1er", "g-tick"); }
    s += T4(x0 + e + n * pas, y + h / 2 + 4, "…", "g-label");
    s += L4(x0, y - 8, x0 + e, y - 8, "g-guide") + T4(x0 + e / 2, y - 12, s0txt, "g-mesure") + F4(x0 + e, y + h + 26, x0 + e + pas, y + h + 26, "g-droite") + T4(x0 + e + pas / 2, y + h + 42, dtxt, "g-mesure");
    return svg4(x0 + e + n * pas + 26, y + h + 50, `Frise : le premier motif commence à ${s0txt} du bord, puis le motif est répété par translation de ${dtxt} vers la droite`, s);
  }
  const NOMS_T4 = [["A", "B", "C", "D"], ["E", "F", "G", "H"], ["M", "N", "P", "Q"], ["R", "S", "T", "U"], ["K", "L", "M", "N"]];

  GEN["tl4-proprietes"] = function () {
    const t = pick([0, 1, 2, 3, 4, 0, 1, 2, 3, 5]), [A, B, C, D] = pick(NOMS_T4);
    if (t === 0) { // longueurs conservées et longueur du déplacement (segment)
      const x = rand(15, 95) / 10; let d = rand(3, 12); if (d === Math.round(x)) d++;
      const th = rand(-60, 60) * DEG4; let ph; do { ph = rand(0, 359) * DEG4; } while (Math.abs(Math.sin(ph - th)) < 0.6);
      const q = rand(0, 1), P = [[0, 0], [100 * Math.cos(th), 100 * Math.sin(th)]], v = [130 * Math.cos(ph), 130 * Math.sin(ph)];
      const fig = figTrans4({ P, v, noms: [A, B], cotes: [[0, 1, `${nbTexte(x)} cm`], q ? [0, 1, "?", true] : [1, 1, "?", "guide"]], flecheTxt: `${d} cm`, aria: `Le segment [${A}${B}] de ${nbTexte(x)} cm et son image [${A}'${B}'] ; la flèche de ${A} à ${A}' mesure ${d} cm` });
      const enonce = `Le segment $[${A}'${B}']$ est l'image du segment $[${A}${B}]$ par la translation qui transforme $${A}$ en $${A}'$. On sait que $${A}${B} = ${nb(x)}$ cm et $${A}${A}' = ${d}$ cm. Combien mesure $${q ? `${A}'${B}'` : `${B}${B}'`}$ ?`;
      return q ? { enonce, figure: fig, mode: "nombre", prefixe: `$${A}'${B}' =$`, suffixe: "cm", attendu: x,
        erreurs: [{ valeur: d, message: `$${d}$ cm, c'est la longueur du déplacement ($${A}${A}'$), pas celle du segment image.` }, { valeur: arr(x + d, 1), message: "Une translation ne rallonge pas les segments : elle conserve les longueurs." }],
        aides: ["Une translation fait glisser le segment sans le déformer.", "Elle conserve les longueurs.", `$${A}'${B}' = ${A}${B}$.`], solution: `Une translation conserve les longueurs : $${A}'${B}' = ${A}${B} = ${nb(x)}$ cm.` }
        : { enonce, figure: fig, mode: "nombre", prefixe: `$${B}${B}' =$`, suffixe: "cm", attendu: d,
          erreurs: [{ valeur: x, message: `$${A}${B}$ est la longueur du segment ; $${B}${B}'$ est la longueur du déplacement de $${B}$.` }, { valeur: arr(x + d, 1), message: "Tous les points glissent de la même longueur : il n'y a rien à additionner." }],
          aides: ["Une translation déplace tous les points dans la même direction, le même sens et de la même longueur.", `$${A}$ s'est déplacé de $${d}$ cm.`, `$${B}$ s'est donc déplacé de la même longueur.`], solution: `Tous les points se déplacent de la même longueur : $${B}${B}' = ${A}${A}' = ${d}$ cm (et $${A}${A}'${B}'${B}$ est un parallélogramme).` };
    }
    if (t === 1) { // angles conservés
      let a, b, c; do { a = rand(35, 80); b = rand(35, 80); c = 180 - a - b; } while (c < 40);
      const L = 95, ac = (L * Math.sin(b * DEG4)) / Math.sin(c * DEG4), P = tourne4([[0, 0], [L, 0], [ac * Math.cos(-a * DEG4), ac * Math.sin(-a * DEG4)]], rand(-25, 25) * DEG4), v = depl4(P), q = pick([0, 1, 2, 2]);
      const rep = [a, b, c][q], nomQ = [A, B, C][q];
      const fig = figTrans4({ P, v, noms: [A, B, C], ferme: true, angles: [[0, `${a}°`], [1, `${b}°`], [q, "?", true]], aria: `Le triangle ${A}${B}${C}, avec un angle de ${a}° en ${A} et de ${b}° en ${B}, et son image ${A}'${B}'${C}' par une translation` });
      return { enonce: `Le triangle $${A}'${B}'${C}'$ est l'image du triangle $${A}${B}${C}$ par une translation. On sait que $\\widehat{${C}${A}${B}} = ${a}^\\circ$ et $\\widehat{${A}${B}${C}} = ${b}^\\circ$. Combien mesure l'angle de sommet $${nomQ}'$ ?`, figure: fig, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: rep,
        erreurs: q === 2 ? [{ valeur: a + b, message: `La somme des trois angles d'un triangle vaut $180^\\circ$ : il faut calculer $180 - ${a} - ${b}$.` }, { valeur: 180 - a, message: `Il faut enlever les deux angles connus : $180 - ${a} - ${b}$.` }]
          : [{ valeur: c, message: `Tu as calculé le troisième angle. L'angle en $${nomQ}'$ est l'image de l'angle en $${nomQ}$, qui est connu.` }, { valeur: 180 - rep, message: "La translation conserve les angles : l'angle image a exactement la même mesure." }],
        aides: ["Une translation conserve les angles.", `L'angle en $${nomQ}'$ a la même mesure que l'angle en $${nomQ}$.`, q === 2 ? "Dans un triangle, la somme des angles vaut $180^\\circ$." : `L'angle en $${nomQ}$ est donné dans l'énoncé.`],
        solution: q === 2 ? `Dans $${A}${B}${C}$ : $\\widehat{${A}${C}${B}} = 180^\\circ - ${a}^\\circ - ${b}^\\circ = ${c}^\\circ$. La translation conserve les angles, donc l'angle en $${C}'$ mesure $${c}^\\circ$.` : `La translation conserve les angles : l'angle en $${nomQ}'$ mesure, comme l'angle en $${nomQ}$, $${rep}^\\circ$.` };
    }
    if (t === 2) { // aire et périmètre conservés
      let Lr, l; do { Lr = rand(3, 12); l = rand(2, 9); } while (l >= Lr);
      const u = rand(0, 1) ? "cm" : "m", w = 105, h = Math.max(34, (w * l) / Lr), P = tourne4([[0, 0], [w, 0], [w, -h], [0, -h]], rand(-20, 20) * DEG4), v = depl4(P), q = rand(0, 1);
      const per = 2 * (Lr + l), aire = Lr * l;
      const fig = figTrans4({ P, v, noms: [A, B, C, D], ferme: true, cotes: [[0, 1, `${Lr} ${u}`], [1, 2, `${l} ${u}`]], aria: `Le rectangle ${A}${B}${C}${D} de ${Lr} ${u} sur ${l} ${u} et son image par une translation` });
      const ctx = u === "m" ? `Sur le plan d'un jardin de ${pick(LIEUX4)}, le potager rectangulaire $${A}${B}${C}${D}$ mesure $${Lr}$ m sur $${l}$ m. On le reproduit plus loin par une translation : on obtient $${A}'${B}'${C}'${D}'$.` : `Le rectangle $${A}'${B}'${C}'${D}'$ est l'image du rectangle $${A}${B}${C}${D}$ ($${Lr}$ cm sur $${l}$ cm) par une translation.`;
      return q ? { enonce: `${ctx} Quelle est l'aire de $${A}'${B}'${C}'${D}'$ ?`, figure: fig, mode: "nombre", prefixe: "Aire :", suffixe: `${u}²`, attendu: aire,
        erreurs: [{ valeur: per, message: "Ça, c'est le périmètre. L'aire est $\\text{longueur} \\times \\text{largeur}$." }, { valeur: Lr + l, message: "L'aire d'un rectangle est le produit de ses dimensions." }],
        aides: ["Une translation conserve les aires.", `L'image a donc la même aire que $${A}${B}${C}${D}$.`, `$\\text{aire} = ${Lr} \\times ${l}$.`], solution: `La translation conserve les aires : aire $= ${Lr} \\times ${l} = ${aire}$ ${u}².` }
        : { enonce: `${ctx} Quel est le périmètre de $${A}'${B}'${C}'${D}'$ ?`, figure: fig, mode: "nombre", prefixe: "Périmètre :", suffixe: u, attendu: per,
          erreurs: [{ valeur: aire, message: "Ça, c'est l'aire. Le périmètre est la longueur du tour." }, { valeur: Lr + l, message: "Le tour du rectangle compte deux longueurs et deux largeurs." }],
          aides: ["Une translation conserve les longueurs.", "Le rectangle image a les mêmes dimensions.", `$\\text{périmètre} = 2 \\times (${Lr} + ${l})$.`], solution: `La translation conserve les longueurs : périmètre $= 2 \\times (${Lr} + ${l}) = ${per}$ ${u}.` };
    }
    if (t === 3) { // parallélogramme
      let x, y; do { x = rand(3, 12); y = rand(2, 10); } while (x === y);
      const th = rand(-70, 70) * DEG4, ph = th + pick([-1, 1]) * rand(50, 110) * DEG4, P = [[0, 0], [95 * Math.cos(th), 95 * Math.sin(th)]], v = [120 * Math.cos(ph), 120 * Math.sin(ph)], q = rand(0, 1);
      const fig = figTrans4({ P, v, noms: [A, C], nomsI: [B, D], flecheTxt: `${x} cm`, cotes: [[0, 1, `${y} cm`], q ? [1, 1, "?", "guide"] : [0, 1, "?", true]], aria: `La translation qui transforme ${A} en ${B} (${x} cm) transforme ${C} en ${D} ; ${A}${C} = ${y} cm` });
      const ask = q ? `${C}${D}` : `${B}${D}`, rep = q ? x : y, autre = q ? y : x;
      return { enonce: `La translation qui transforme $${A}$ en $${B}$ transforme $${C}$ en $${D}$. On sait que $${A}${B} = ${x}$ cm et $${A}${C} = ${y}$ cm. Combien mesure $${ask}$ ?`, figure: fig, mode: "nombre", prefixe: `$${ask} =$`, suffixe: "cm", attendu: rep,
        erreurs: [{ valeur: autre, message: `Dans le parallélogramme $${A}${B}${D}${C}$, $[${ask}]$ est le côté opposé à $[${q ? A + B : A + C}]$.` }, { valeur: x + y, message: "Il n'y a rien à additionner : les côtés opposés d'un parallélogramme ont la même longueur." }],
        aides: [`Si la translation transforme $${A}$ en $${B}$ et $${C}$ en $${D}$, alors $${A}${B}${D}${C}$ est un parallélogramme.`, "Dans un parallélogramme, les côtés opposés ont la même longueur.", `Le côté opposé à $[${ask}]$ est $[${q ? A + B : A + C}]$.`],
        solution: `$${A}${B}${D}${C}$ est un parallélogramme, donc $${ask} = ${q ? A + B : A + C} = ${rep}$ cm.${q ? ` (On peut aussi dire : $${C}$ a glissé de la même longueur que $${A}$.)` : ` (Le segment $[${B}${D}]$ est l'image de $[${A}${C}]$ : même longueur.)`}` };
    }
    if (t === 4) { // frise : motif répété par translation (contexte de Mayotte)
      const d = rand(4, 12), s0 = rand(1, 5), n = rand(4, 9), r = s0 + (n - 1) * d;
      const ctx = pick([["Sur un salouva, un motif", "du bord du tissu"], ["Sur une natte tressée à Sada, un motif", "du bord de la natte"], [`Sur le mur du collège de ${pick(LIEUX4)}, un motif peint`, "du coin du mur"], ["Sur le bord d'un kishali (châle), un motif brodé", "du bord du kishali"]]);
      return { enonce: `${ctx[0]} commence à $${s0}$ cm ${ctx[1]}, puis il est reproduit plusieurs fois par une translation de $${d}$ cm vers la droite. À quelle distance ${ctx[1]} commence le ${n}e motif ?`, figure: friseT4(64, `${s0} cm`, `${d} cm`, 3), mode: "nombre", prefixe: "Distance :", suffixe: "cm", attendu: r,
        erreurs: [{ valeur: s0 + n * d, message: `Du 1er au ${n}e motif, il n'y a que $${n - 1}$ déplacements.` }, { valeur: (n - 1) * d, message: `N'oublie pas les $${s0}$ cm avant le premier motif.` }, { valeur: n * d, message: `Il y a $${n - 1}$ déplacements de $${d}$ cm, et il faut ajouter les $${s0}$ cm du début.` }],
        aides: ["Chaque motif est l'image du précédent par la même translation.", `Du 1er au ${n}e motif, combien de déplacements de $${d}$ cm ?`, `$${s0} + ${n - 1} \\times ${d}$.`], solution: `Du 1er au ${n}e motif, il y a $${n - 1}$ déplacements de $${d}$ cm : $${s0} + ${n - 1} \\times ${d} = ${r}$ cm.` };
    }
    const r = rand(2, 9);
    const Q = pick([
      [`La translation qui transforme $${A}$ en $${B}$ transforme $${C}$ en $${D}$. Alors $${A}${B}${D}${C}$ est :`, "un parallélogramme", ["un triangle", "un trapèze quelconque", "un cerf-volant"]],
      ["Par une translation, l'image d'une droite est :", "une droite parallèle", ["une droite perpendiculaire", "un cercle", "un segment de longueur double"]],
      ["Une translation est définie par :", "une direction, un sens et une longueur", ["un centre", "un axe", "un angle seulement"]],
      ["Par une translation, une figure :", "glisse sans tourner ni se retourner", ["fait un demi-tour", "est retournée en miroir", "est agrandie"]],
      ["Par une translation, l'aire d'une figure est :", "conservée", ["doublée", "divisée par deux", "multipliée par la longueur du déplacement"]],
      [`La translation qui transforme $${A}$ en $${B}$ transforme $${B}$ en $${C}$. Alors :`, `$${B}$ est le milieu de $[${A}${C}]$`, [`$${C} = ${A}$`, `$${C}$ est le milieu de $[${A}${B}]$`, `$${C} = ${B}$`]],
      [`Par une translation, le milieu $${D}$ de $[${A}${B}]$ a pour image :`, `le milieu de $[${A}'${B}']$`, [`le point $${D}$ lui-même`, `le point $${A}'$`, `le milieu de $[${A}${A}']$`]],
      ["Par une translation, trois points alignés ont pour images trois points :", "alignés", ["formant un triangle", "confondus", "toujours sur un cercle"]],
      [`Par une translation, un cercle de rayon $${r}$ cm a pour image :`, `un cercle de rayon $${r}$ cm`, [`un cercle de rayon $${2 * r}$ cm`, `un cercle de même centre et de rayon $${r + 1}$ cm`, "une ellipse"]],
      ["Par une translation, deux droites perpendiculaires ont pour images deux droites :", "perpendiculaires", ["parallèles", "confondues", "sécantes mais jamais perpendiculaires"]]
    ]);
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu, aides: ["Une translation fait glisser une figure sans la déformer.", "Elle conserve les longueurs, les angles, les aires, l'alignement, les milieux et le parallélisme.", `Si $${B}$ est l'image de $${A}$ et $${D}$ celle de $${C}$, alors $${A}${B}${D}${C}$ est un parallélogramme.`], solution: `Réponse : ${Q[1]}.` };
  };

  FIGURES["tl4-parallelogramme"] = () => figTrans4({ P: [[0, 0], [30, 95]], v: [150, -30], noms: ["A", "M"], nomsI: ["B", "M'"], aria: "La translation qui transforme A en B transforme M en M' : ABM'M est un parallélogramme" });
  FIGURES["tl4-conservation"] = () => figTrans4({ P: [[0, 0], [100, 0], [30, -70]], v: [130, 90], noms: ["A", "B", "C"], ferme: true, cotes: [[0, 1, "5 cm"], [0, 1, "5 cm", true]], angles: [[0, "67°"], [0, "67°", true]], aria: "Le triangle ABC et son image A'B'C' par une translation : AB = A'B' = 5 cm et les angles en A et en A' mesurent 67°" });
  FIGURES["tl4-frise"] = () => friseT4(64, "3 cm", "8 cm", 3);

  /* =====================================================================
     Chapitre 13 : équations (eq4-)
     ===================================================================== */
  const lin = (a, b, x) => poly4(0, a, b, x);
  const solRel = (v) => (Number.isInteger(v) ? rel(v) : frS(Math.round(v * 1000), 1000));

  /* Figures du chapitre 13 */
  // Balance de Roberval en équilibre : chaque plateau porte k boîtes « x » et une masse m (g, d = [k, m])
  function balance4(g, d, x, unite) {
    x = x || "x"; unite = unite || "";
    const plateau = (cx, [k, m]) => {
      const items = []; if (m) items.push({ w: 16 + 8 * String(m).length + (unite ? 8 * unite.length : 0), t: `${m}${unite ? " " + unite : ""}`, cl: "g-rect" });
      for (let i = 0; i < k; i++) items.push({ w: 20, t: x, cl: "g-poly g-poly-image" });
      const rangs = [[]]; let larg = 0; items.forEach((it) => { if (larg + it.w > 118 && rangs[rangs.length - 1].length) { rangs.push([]); larg = 0; } rangs[rangs.length - 1].push(it); larg += it.w + 3; });
      let s = "";
      rangs.forEach((r, j) => { const L = r.reduce((a, it) => a + it.w + 3, -3); let xx = cx - L / 2; const y = 104 - 22 * (j + 1); r.forEach((it) => { s += R4(xx, y, it.w, 20, it.cl) + T4(xx + it.w / 2, y + 14, it.t, "g-label"); xx += it.w + 3; }); });
      return [s, rangs.length];
    };
    const [sg, ng] = plateau(85, g), [sd, nd] = plateau(235, d), haut = 22 * Math.max(ng, nd) + 8, dy = Math.max(0, haut - 96);
    const corps = L4(25, 104, 145, 104, "g-droite") + L4(175, 104, 295, 104, "g-droite") + L4(85, 104, 85, 118, "g-segment") + L4(235, 104, 235, 118, "g-segment") + L4(60, 118, 260, 118, "g-droite") + P4([[160, 118], [150, 132], [170, 132]], "g-rect") + R4(125, 132, 70, 8, "g-rect") + sg + sd;
    const txt = ([k, m]) => [k ? `${k} boîte${k > 1 ? "s" : ""} ${x}` : "", m ? `${m}${unite ? " " + unite : ""}` : ""].filter(Boolean).join(" et ");
    return svg4(320, 144 + dy, `Balance en équilibre : à gauche ${txt(g)}, à droite ${txt(d)}`, dy ? `<g transform="translate(0 ${dy})">${corps}</g>` : corps);
  }
  // Schéma en barres : rows = [{ nom, parts: [[texte, largeur, image?]] }], total = texte de l'accolade sur la première ligne
  function barresEq4(rows, aria, total) {
    const u = Math.min(46, 220 / Math.max(...rows.map((r) => r.parts.reduce((s, p) => s + p[1], 0)))), x0 = 84; let s = "", y = total ? 34 : 8;
    if (total) { const L = rows[0].parts.reduce((a, p) => a + p[1], 0) * u, m = x0 + L / 2; s += `<path class="g-accolade" d="M${x0} ${y - 3} Q${x0} ${y - 11} ${x0 + 8} ${y - 11} H${f1(m - 6)} L${f1(m)} ${y - 17} L${f1(m + 6)} ${y - 11} H${f1(x0 + L - 8)} Q${f1(x0 + L)} ${y - 11} ${f1(x0 + L)} ${y - 3}"/>` + T4(m, y - 21, total, "g-mesure"); }
    rows.forEach((r) => { let xx = x0; s += T4(x0 - 8, y + 17, r.nom, "g-label", "end"); r.parts.forEach(([t, w, im]) => { s += R4(xx, y, w * u, 26, im ? "g-poly g-poly-image" : "g-rect") + T4(xx + (w * u) / 2, y + 17, t, "g-label"); xx += w * u; }); y += 36; });
    return svg4(320, y, aria, s);
  }

  FIGURES["eq4-balance"] = () => balance4([3, 4], [0, 19]);
  FIGURES["eq4-balance-deux"] = () => balance4([5, 3], [2, 15]);
  FIGURES["eq4-qcm-balance"] = () => balance4([4, 6], [1, 18]);
  FIGURES["eq4-rectangle"] = () => svg4(260, 100, "Rectangle de largeur x et de longueur x + 4", R4(50, 14, 150, 56) + T4(125, 92, "x + 4", "g-mesure") + T4(40, 46, "x", "g-mesure", "end"));
  FIGURES["eq4-barres"] = () => barresEq4([{ nom: "total", parts: [["x", 1, true], ["x", 1, true], ["x", 1, true], ["5 €", 1]] }], "Schéma : 3 fois x plus 5 € font 29 €", "29 €");

  GEN["eq4-etapes"] = function () {
    const x = pick(VAR4), r = Math.random();
    if (r < 0.25) { // tester des valeurs : lequel de ces nombres est solution ?
      const a = rand(2, 7) * pick([1, -1]), s = rand(-9, 9), b = rand(-12, 12); if (!b || !s) return GEN["eq4-etapes"]();
      const c = a * s + b, faux = [-s, (c + b) / a, c - b, s + 1, s - 1].filter((v) => Number.isInteger(v) && v !== s), F = [...new Set(faux)].slice(0, 3);
      if (F.length < 3) return GEN["eq4-etapes"]();
      const { choix, attendu } = melange(`$${rel(s)}$`, F.map((v) => `$${rel(v)}$`));
      return { enonce: `Parmi ces nombres, lequel est solution de l'équation $${lin(a, b, x)} = ${rel(c)}$ ?`, mode: "choix", choix, attendu,
        aides: ["Un nombre est solution si, en le mettant à la place de l'inconnue, l'égalité est vraie.", "Teste chaque nombre : calcule le membre de gauche.", `Il faut obtenir $${rel(c)}$.`],
        solution: `Pour $${x} = ${rel(s)}$ : $${rel(a)} \\times ${relP(s)} ${b > 0 ? "+" : "-"} ${Math.abs(b)} = ${rel(c)}$ : l'égalité est vraie. (Pour $${x} = ${rel(F[0])}$, on obtient $${rel(a * F[0] + b)} \\neq ${rel(c)}$.)` };
    }
    if (r < 0.5) { // balance : a x + b = c avec des nombres positifs
      const a = rand(2, 6), s = rand(2, 9), b = rand(2, 15), c = a * s + b, u = pick(["", "kg", "g"]);
      return { enonce: `La balance est en équilibre. Chaque boîte a la même masse $x$${u ? ` (en ${u})` : ""}. On peut écrire $${a}x + ${b} = ${c}$. Combien vaut $x$ ?`, figure: balance4([a, b], [0, c], "x", u), mode: "nombre", prefixe: "$x =$", suffixe: u, attendu: s,
        erreurs: [{ valeur: (c + b) / a, message: `On enlève $${b}$ des deux côtés : on soustrait $${b}$, on ne l'ajoute pas.` }, { valeur: c - b, message: `$${a}x = ${c - b}$ : il reste à partager entre les $${a}$ boîtes (diviser par $${a}$).` }, { valeur: c / a - b, message: "Enlève d'abord la masse posée à côté des boîtes, puis divise." }],
        aides: [`On peut enlever $${b}$ sur chaque plateau : la balance reste en équilibre.`, `Il reste $${a}x = ${c - b}$.`, `On partage en $${a}$ : $x = ${c - b} \\div ${a}$.`],
        solution: `$${a}x + ${b} = ${c}$ ; on enlève $${b}$ de chaque côté : $${a}x = ${c - b}$ ; on divise par $${a}$ : $x = ${s}$. Vérification : $${a} \\times ${s} + ${b} = ${c}$.` };
    }
    const a = rand(2, 9) * (Math.random() < 0.3 ? -1 : 1), s = rand(-10, 12), b = rand(-15, 15); if (!b) return GEN["eq4-etapes"]();
    const c = a * s + b;
    return { enonce: `Résous l'équation $${lin(a, b, x)} = ${rel(c)}$.`, mode: "nombre", prefixe: `$${x} =$`, attendu: s,
      erreurs: [{ valeur: (c + b) / a, message: `Pour enlever $${rel(b)}$, on ${b > 0 ? "soustrait" : "ajoute"} $${Math.abs(b)}$ aux deux membres.` }, { valeur: c / a - b, message: "Commence par éliminer le terme constant, puis divise." }, { valeur: (c - b) / -a, message: `On divise par $${rel(a)}$, avec son signe.` }],
      aides: [`On isole d'abord le terme en $${x}$ : ${b > 0 ? "soustrais" : "ajoute"} $${Math.abs(b)}$ aux deux membres.`, `$${a}${x} = ${rel(c - b)}$.`, `Divise les deux membres par $${rel(a)}$.`],
      solution: `$${lin(a, b, x)} = ${rel(c)}$ ; $${rel(a)}${x} = ${rel(c)} ${b > 0 ? "-" : "+"} ${Math.abs(b)} = ${rel(c - b)}$ ; $${x} = \\dfrac{${rel(c - b)}}{${rel(a)}} = ${rel(s)}$.` };
  };

  GEN["eq4-deux-membres"] = function () {
    if (Math.random() < 0.3) { // balance avec des boîtes des deux côtés
      const a = rand(3, 7), c = rand(1, a - 1), s = rand(2, 9), b = rand(1, 12), d = (a - c) * s + b, u = pick(["", "kg"]);
      return { enonce: `La balance est en équilibre et toutes les boîtes ont la même masse $x$${u ? ` (en ${u})` : ""}. On peut écrire $${a}x + ${b} = ${lin(c, d, "x")}$. Combien vaut $x$ ?`, figure: balance4([a, b], [c, d], "x", u), mode: "nombre", prefixe: "$x =$", suffixe: u, attendu: s,
        erreurs: [{ valeur: (d - b) / (a + c), message: `On enlève $${c}$ boîte${c > 1 ? "s" : ""} de chaque plateau : $${a}x - ${c}x$, pas $${a}x + ${c}x$.` }, { valeur: (d + b) / (a - c), message: `On enlève $${b}$ de chaque côté : $${d} - ${b}$.` }, { valeur: d - b, message: `Il reste $${a - c}x = ${d - b}$ : divise par $${a - c}$.` }],
        aides: [`Enlève $${c}$ boîte${c > 1 ? "s" : ""} sur chaque plateau : $${lin(a - c, b, "x")} = ${d}$.`, `Enlève ensuite $${b}$ de chaque côté : $${a - c === 1 ? "" : a - c}x = ${d - b}$.`, `Divise par $${a - c}$.`],
        solution: `$${a}x + ${b} = ${lin(c, d, "x")}$ ; on enlève $${c}x$ : $${lin(a - c, b, "x")} = ${d}$ ; on enlève $${b}$ : $${a - c === 1 ? "" : a - c}x = ${d - b}$ ; $x = ${s}$. Vérification : $${a * s + b} = ${c * s + d}$.` };
    }
    for (;;) {
      const x = pick(VAR4), a = rand(-6, 9), c = rand(-6, 9), s = rand(-8, 10), b = rand(-15, 15); if (a === c || !a || !c || !s) continue;
      const d = (a - c) * s + b;
      return { enonce: `Résous l'équation $${lin(a, b, x)} = ${lin(c, d, x)}$.`, mode: "nombre", prefixe: `$${x} =$`, attendu: s,
        erreurs: [{ valeur: (d - b) / (a + c), message: `En passant $${rel(c)}${x}$ dans l'autre membre, on le soustrait : $${rel(a)}${x} - ${relP(c)}${x}$.` }, { valeur: (d + b) / (a - c), message: `Pour enlever $${rel(b)}$ du membre de gauche, on ${b > 0 ? "soustrait" : "ajoute"} $${Math.abs(b)}$ aux deux membres.` }, { valeur: -s, message: `Attention au signe dans la dernière division : $${rel(a - c)}${x} = ${rel(d - b)}$.` }],
        aides: [`Regroupe les termes en $${x}$ dans un membre : soustrais $${c === 1 ? "" : c === -1 ? "-" : c}${x}$ aux deux membres.`, `Regroupe les nombres dans l'autre membre : soustrais $${rel(b)}$.`, `$${rel(a - c)}${x} = ${rel(d - b)}$.`],
        solution: `$${lin(a, b, x)} = ${lin(c, d, x)}$ ; $${rel(a)}${x} - ${relP(c)}${x} = ${rel(d)} - ${relP(b)}$ ; $${rel(a - c)}${x} = ${rel(d - b)}$ ; $${x} = ${rel(s)}$. Vérification : $${rel(a * s + b)} = ${rel(c * s + d)}$.` };
    }
  };

  GEN["eq4-parentheses"] = function () {
    if (Math.random() < 0.3) { // aire d'un rectangle : k(x + b) = A
      const k = rand(2, 9), b = rand(1, 9), s = rand(2, 12), A = k * (s + b), u = pick(["cm", "m"]);
      return { enonce: `Ce rectangle a pour hauteur $${k}$ ${u} et pour largeur $x + ${b}$ (en ${u}). Son aire est $${A}$ ${u}². Écris une équation, puis trouve $x$.`, figure: aireDistrib4(`${k}`, "x", `${b}`, [`${k}x`, `${k * b}`], { total: `aire : ${A} ${u}²`, aria: `Rectangle de hauteur ${k} et de largeur x + ${b}, d'aire ${A}` }), mode: "nombre", prefixe: "$x =$", suffixe: u, attendu: s,
        erreurs: [{ valeur: (A - b) / k, message: `$${k}(x + ${b}) = ${k}x + ${k * b}$ : le $${k}$ multiplie aussi le $${b}$.` }, { valeur: A / k + b, message: `$x + ${b} = ${A / k}$ : on soustrait $${b}$.` }, { valeur: A - k * b, message: `$${k}x = ${A - k * b}$ : il reste à diviser par $${k}$.` }],
        aides: ["Aire d'un rectangle : $\\text{hauteur} \\times \\text{largeur}$.", `$${k}(x + ${b}) = ${A}$.`, `Développe : $${k}x + ${k * b} = ${A}$.`],
        solution: `$${k}(x + ${b}) = ${A}$, donc $${k}x + ${k * b} = ${A}$, $${k}x = ${A - k * b}$ et $x = ${s}$ ${u}. Vérification : $${k} \\times ${s + b} = ${A}$.` };
    }
    for (;;) {
      const x = pick(VAR4), k = rand(2, 6) * (Math.random() < 0.3 ? -1 : 1), b = rand(-9, 9), c = rand(-5, 5), s = rand(-8, 8); if (!b || c === k) continue;
      const d = k * (s + b) - c * s;
      if (!s || k - c === 0) continue;
      return { enonce: `Résous l'équation $${rel(k)}(${lin(1, b, x)}) = ${lin(c, d, x)}$.`, mode: "nombre", prefixe: `$${x} =$`, attendu: s,
        erreurs: [{ valeur: (d - b) / (k - c), message: `En développant, $${rel(k)}$ multiplie les deux termes de la parenthèse : $${rel(k)}(${lin(1, b, x)}) = ${lin(k, k * b, x)}$.` }, { valeur: (d + k * b) / (k - c), message: `Pour enlever $${rel(k * b)}$, on ${k * b > 0 ? "soustrait" : "ajoute"} $${Math.abs(k * b)}$ aux deux membres.` }, { valeur: -s, message: "Attention au signe dans la dernière division." }],
        aides: ["Commence par développer le membre de gauche.", `$${rel(k)}(${lin(1, b, x)}) = ${lin(k, k * b, x)}$.`, `Résous ensuite $${lin(k, k * b, x)} = ${lin(c, d, x)}$.`],
        solution: `$${lin(k, k * b, x)} = ${lin(c, d, x)}$, donc $${rel(k - c)}${x} = ${rel(d - k * b)}$ et $${x} = ${rel(s)}$.` };
    }
  };

  GEN["eq4-problemes"] = function () {
    const t = rand(0, 4), n = pick(PRENOMS4);
    if (t === 0) { const k = rand(3, 5), d = rand(3, 15);
      // âge de l'enfant x, du père kx ; dans d ans : kx + d = m(x + d) ; le père a au moins 20 ans de plus que l'enfant
      for (const m of [2, 3]) { const x = (d * (m - 1)) / (k - m); if (k > m && Number.isInteger(x) && x > 3 && x < 18 && (k - 1) * x >= 20 && k * x <= 60) return { enonce: `Le père ${de4(n)} a $${k}$ fois l'âge ${de4(n)}. Dans $${d}$ ans, il n'aura plus que $${m}$ fois l'âge ${de4(n)}. Quel est l'âge ${de4(n)} aujourd'hui ?`,
        figure: barresEq4([{ nom: n, parts: [["x", 1, true]] }, { nom: "son père", parts: Array.from({ length: k }, () => ["x", 1, true]) }], `Schéma : l'âge ${de4(n)} est x, celui de son père est ${k} fois x`), mode: "nombre", prefixe: "Âge :", suffixe: "ans", attendu: x,
        erreurs: [{ valeur: k * x, message: `$${k * x}$ ans, c'est l'âge du père. On demande l'âge ${de4(n)}.` }, { valeur: x + d, message: `$${x + d}$ ans, c'est l'âge ${de4(n)} dans $${d}$ ans.` }],
        aides: [`Appelle $x$ l'âge ${de4(n)}. Son père a $${k}x$ ans.`, `Dans $${d}$ ans : $${k}x + ${d} = ${m}(x + ${d})$.`, "Développe, puis résous."], solution: `$${k}x + ${d} = ${m}x + ${m * d}$, donc $${k - m}x = ${(m - 1) * d}$ et $x = ${x}$ : ${n} a $${x}$ ans (et son père $${k * x}$ ans).` }; }
      return GEN["eq4-problemes"](); }
    if (t === 1) { const l = rand(3, 15), a = rand(2, 10), P = 2 * (2 * l + a), lieu = Math.random() < 0.5 ? `Un terrain rectangulaire à ${pick(LIEUX4)} a une` : "Un rectangle a une";
      const U = lieu.startsWith("Un terrain") ? "m" : "cm";
      return { enonce: `${lieu} longueur qui dépasse sa largeur de $${a}$ ${U}. Son périmètre est $${P}$ ${U}. Quelle est sa largeur ?`, figure: (() => { const w = 150, h = Math.max(40, (w * l) / (l + a)); return svg4(260, h + 40, `Rectangle de largeur x et de longueur x + ${a}`, R4(50, 14, w, h) + T4(50 + w / 2, h + 32, `x + ${a}`, "g-mesure") + T4(40, 14 + h / 2 + 4, "x", "g-mesure", "end")); })(), mode: "nombre", prefixe: "Largeur :", suffixe: U, attendu: l,
        erreurs: [{ valeur: l + a, message: "Ça, c'est la longueur. On demande la largeur $x$." }, { valeur: (P - a) / 2, message: `Le périmètre compte deux largeurs et deux longueurs : $2(x + x + ${a}) = ${P}$.` }, { valeur: (P - a) / 4, message: `$2(x + ${a}) = 2x + ${2 * a}$ : le $${a}$ compte deux fois.` }],
        aides: [`Appelle $x$ la largeur ; la longueur est $x + ${a}$.`, `$2(x + x + ${a}) = ${P}$.`, `$4x + ${2 * a} = ${P}$.`], solution: `$2(x + x + ${a}) = ${P}$, donc $4x + ${2 * a} = ${P}$, $4x = ${P - 2 * a}$ et $x = ${l}$ ${U} (la longueur mesure $${l + a}$ ${U}).` }; }
    if (t === 2) { const p = pick([2, 4, 5]), x = rand(3, 30), a = rand(2, 10), tot = p * x + a;
      const C = pick([["places pour un concert à Mamoudzou", "de frais de réservation", "d'une place"], ["barquettes de mabawa", "pour une bouteille d'eau", "d'une barquette"], ["livres au marché de Mamoudzou", "pour un sac", "d'un livre"], ["entrées de cinéma", "de frais de parking", "d'une entrée"]]);
      return { enonce: `${n} achète $${p}$ ${C[0]} au même prix et paie en plus $${a}$ € ${C[1]}. ${il4(n)[0].toUpperCase() + il4(n).slice(1)} paie $${tot}$ € en tout. Quel est le prix ${C[2]} ?`, figure: barresEq4([{ nom: "total", parts: [...Array.from({ length: p }, () => ["x", 1, true]), [`${a} €`, 1]] }], `Schéma : ${p} fois x plus ${a} € font ${tot} €`, `${tot} €`), mode: "nombre", prefixe: "Prix :", suffixe: "€", attendu: x,
        erreurs: [{ valeur: tot - a, message: `$${p}x = ${tot - a}$ : il reste à diviser par $${p}$.` }, { valeur: tot / p, message: `Enlève d'abord les $${a}$ € : $${p}x + ${a} = ${tot}$.` }, { valeur: (tot + a) / p, message: `On enlève les $${a}$ € : $${tot} - ${a}$, pas $${tot} + ${a}$.` }],
        aides: [`Appelle $x$ le prix ${C[2]}.`, `$${p}x + ${a} = ${tot}$.`, `$${p}x = ${tot - a}$.`], solution: `$${p}x + ${a} = ${tot}$, donc $${p}x = ${tot - a}$ et $x = ${nb(x)}$ €.` }; }
    if (t === 3) { // deux tarifs : pour quelle durée paie-t-on la même chose ?
      for (;;) { const p1 = rand(2, 6), p2 = p1 + rand(1, 4), h = rand(2, 10), f2 = rand(0, 10), f1 = f2 + (p2 - p1) * h; if (f1 > 40) continue;
        const C = pick([["Deux loueurs de scooters de Mamoudzou proposent", "heures de location", "€ par heure"], ["Deux clubs de plongée de N'Gouja proposent", "plongées", "€ par plongée"], ["Deux loueurs de kayaks de Sakouli proposent", "heures de location", "€ par heure"]]);
        const prix = f1 + p1 * h;
        return { enonce: `${C[0]} : tarif A, $${f1}$ € d'inscription puis $${p1}$ ${C[2]} ; tarif B, ${f2 ? `$${f2}$ € d'inscription puis ` : ""}$${p2}$ ${C[2]}. Pour combien de ${C[1]} les deux tarifs coûtent-ils le même prix ?`, mode: "nombre", prefixe: "Nombre :", attendu: h,
          erreurs: [{ valeur: prix, message: `$${prix}$ €, c'est le prix payé pour $${h}$ ${C[1]}. On demande le nombre de ${C[1]}.` }, { valeur: f1 - f2, message: `$${p2 - p1}x = ${f1 - f2}$ : divise par $${p2 - p1}$.` }, { valeur: (f1 + f2) / (p2 - p1), message: `En regroupant, on soustrait les frais : $${f1} - ${f2}$.` }],
          aides: ["Appelle $x$ le nombre cherché et écris le prix avec chaque tarif.", `$${f1} + ${p1}x = ${f2 ? `${f2} + ` : ""}${p2}x$.`, `Regroupe : $${f1 - f2} = ${p2 - p1 === 1 ? "" : p2 - p1}x$.`],
          solution: `$${f1} + ${p1}x = ${f2 ? `${f2} + ` : ""}${p2}x$, donc $${f1 - f2} = ${p2 - p1 === 1 ? "" : p2 - p1}x$ et $x = ${h}$. Vérification : $${f1} + ${p1} \\times ${h} = ${prix}$ et $${f2 ? `${f2} + ` : ""}${p2} \\times ${h} = ${f2 + p2 * h}$.` }; }
    }
    const x = rand(2, 20), a = rand(2, 9), b = rand(1, 15), k = rand(1, a - 1);
    return { enonce: `Je pense à un nombre. Je le multiplie par $${a}$ et j'ajoute $${b}$. J'obtiens le même résultat qu'en multipliant ce nombre par $${a - k}$ et en ajoutant $${b + k * x}$. Quel est ce nombre ?`, mode: "nombre", prefixe: "Nombre :", attendu: x,
      erreurs: [{ valeur: k * x, message: `$${k}x = ${k * x}$ : il reste à diviser par $${k}$.` }, { valeur: (k * x) / (2 * a - k), message: `En regroupant les $x$, on soustrait : $${a}x - ${a - k === 1 ? "" : a - k}x$.` }, { valeur: -x, message: "Vérifie le signe : remplace $x$ par ta réponse dans les deux programmes." }],
      aides: ["Appelle $x$ le nombre.", `$${a}x + ${b} = ${a - k === 1 ? "" : a - k}x + ${b + k * x}$.`, "Regroupe les $x$ d'un côté et les nombres de l'autre."], solution: `$${a}x + ${b} = ${lin(a - k, b + k * x, "x")}$ donne $${k === 1 ? "" : k}x = ${k * x}$, donc $x = ${x}$.` };
  };

  /* =====================================================================
     Chapitre 14 : statistiques (sx4-) — moyenne pondérée, médiane, étendue
     ===================================================================== */
  const listeT = (L) => L.map((v) => nb(v)).join(" ; ");
  const mediane = (L) => { const T = L.slice().sort((a, b) => a - b), n = T.length; return n % 2 ? T[(n - 1) / 2] : (T[n / 2 - 1] + T[n / 2]) / 2; };

  /* Figures du chapitre 14 */
  const exact2 = (v) => isFinite(v) && Math.abs(v * 100 - Math.round(v * 100)) < 1e-6;
  const somme4 = (L) => L.reduce((a, b) => a + b, 0);
  // Diagramme en barres (valeurs positives) : cats = [[nom, valeur]], o = { pas, unite (axe vertical), xTitre, aria, marque (indice de barre mise en valeur) }
  function diag4(cats, o) {
    const W = 320, x0 = 40, y0 = 150, haut = 18, vmax = Math.max(o.pas, Math.ceil(Math.max(...cats.map((c) => c[1])) / o.pas) * o.pas), H = y0 + (o.xTitre ? 40 : 24);
    const Y = (v) => y0 - ((y0 - haut) * v) / vmax, bw = (W - x0 - 10) / cats.length;
    let s = `<g class="g-grid">${Array.from({ length: vmax / o.pas + 1 }, (_, i) => L4(x0, Y(i * o.pas), W - 6, Y(i * o.pas), "")).join("")}</g>`;
    for (let v = 0; v <= vmax; v += o.pas) s += T4(x0 - 5, Y(v) + 4, nbTexte(v), "g-tick", "end");
    cats.forEach(([nom, v], i) => { const x = x0 + i * bw + bw * 0.18, w = bw * 0.64; s += R4(x, Y(v), w, y0 - Y(v), i === o.marque ? "g-poly g-poly-image" : "g-aire g-colorie g-barre") + T4(x + w / 2, y0 + 15, nom, "g-tick"); });
    s += `<g class="g-axis">${L4(x0, y0, W - 6, y0, "")}${L4(x0, y0, x0, haut - 8, "")}</g>`;
    if (o.unite) s += T4(x0 + 6, haut - 4, o.unite, "g-label", "start");
    if (o.xTitre) s += T4((x0 + W) / 2, y0 + 34, o.xTitre, "g-label");
    return svg4(W, H, `${o.aria || "Diagramme en barres"} : ${cats.map(([n, v]) => `${n} : ${nbTexte(v)}`).join(", ")}`, s);
  }
  // Série rangée dans des cases ; « milieu » = indices des cases mises en valeur
  function serieRangee4(L, milieu, aria) {
    const n = L.length, w = Math.min(40, 300 / n), x0 = (320 - n * w) / 2;
    const s = L.map((v, i) => R4(x0 + i * w, 14, w, 30, milieu.includes(i) ? "g-poly g-poly-image" : "g-rect") + T4(x0 + i * w + w / 2, 34, nbTexte(v), "g-label") + T4(x0 + i * w + w / 2, 60, i + 1, "g-tick")).join("");
    return svg4(320, 70, aria, s + T4(x0 - 6, 60, "rang", "g-tick", "end"));
  }
  // Valeurs placées sur une droite graduée, avec l'étendue
  function axeEtendue4(L, unite) {
    const mn = Math.min(...L), mx = Math.max(...L), a = Math.floor(mn / 5) * 5, b = Math.ceil(mx / 5) * 5, X = (v) => 24 + ((v - a) * 272) / (b - a);
    let s = L4(16, 70, 304, 70, "g-droite");
    for (let v = a; v <= b; v++) s += L4(X(v), v % 5 ? 66 : 63, X(v), v % 5 ? 74 : 77, "g-segment") + (v % 5 ? "" : T4(X(v), 92, nbTexte(v), "g-tick"));
    const vus = {}; L.forEach((v) => { vus[v] = (vus[v] || 0) + 1; s += C4(X(v), 70 - 10 * vus[v], 4); });
    s += F4(X(mn), 22, X(mx), 22, "g-droite") + F4(X(mx), 22, X(mn), 22, "g-droite") + T4((X(mn) + X(mx)) / 2, 16, `étendue : ${nbTexte(mx)} − ${mn < 0 ? `(${nbTexte(mn)})` : nbTexte(mn)} = ${nbTexte(mx - mn)}${unite ? " " + unite : ""}`, "g-mesure");
    return svg4(320, 100, `Valeurs ${L.map(nbTexte).join(", ")} placées sur une droite graduée ; l'étendue va de ${nbTexte(mn)} à ${nbTexte(mx)}`, s);
  }
  const CTX_SX4 = () => pick([
    { q: `les notes (sur $20$) obtenues à un contrôle par les élèves d'une classe du collège de ${pick(LIEUX4)}`, lab: "Note", vals: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17] },
    { q: "le nombre de frères et sœurs des élèves d'une classe", lab: "Frères et sœurs", vals: [0, 1, 2, 3, 4, 5, 6] },
    { q: `la pointure des joueuses d'un club de handball de ${pick(LIEUX4)}`, lab: "Pointure", vals: [36, 37, 38, 39, 40, 41, 42] },
    { q: "le nombre de poissons pêchés à chaque sortie par un pêcheur de M'tsamboro", lab: "Poissons", vals: [2, 3, 4, 5, 6, 7, 8, 9] },
    { q: `le nombre de buts marqués à chaque match par l'équipe de football de ${pick(LIEUX4)}`, lab: "Buts", vals: [0, 1, 2, 3, 4, 5] },
    { q: "les notes (sur $10$) obtenues à un test de calcul mental", lab: "Note", vals: [3, 4, 5, 6, 7, 8, 9, 10] }
  ]);
  const tireSerie4 = (C, kmin, kmax) => { const k = rand(kmin, Math.min(kmax, C.vals.length)), i0 = rand(0, C.vals.length - k); return C.vals.slice(i0, i0 + k); };

  FIGURES["sx4-cours-moyenne"] = () => diag4([["10", 3], ["14", 5], ["18", 2]], { pas: 1, unite: "Effectif", xTitre: "Note", aria: "Notes d'une classe" });
  FIGURES["sx4-cours-mediane"] = () => serieRangee4([3, 4, 5, 7, 9, 12], [2, 3], "Série rangée 3, 4, 5, 7, 9, 12 : les deux valeurs du milieu, 5 et 7, sont mises en valeur");
  FIGURES["sx4-cours-etendue"] = () => axeEtendue4([-3, 5, 12, 8, -1], "°C");
  FIGURES["sx4-qcm-diagramme"] = () => diag4([["0", 3], ["1", 7], ["2", 6], ["3", 3], ["4", 1]], { pas: 1, unite: "Effectif", xTitre: "Frères et sœurs", aria: "Nombre de frères et sœurs des élèves d'une classe" });
  FIGURES["sx4-qcm-temperatures"] = () => diag4([["janv.", 28], ["mars", 29], ["mai", 27], ["juil.", 24], ["sept.", 25], ["nov.", 27]], { pas: 5, unite: "°C", aria: "Températures moyennes mensuelles à Pamandzi" });

  GEN["sx4-moyenne"] = function () {
    const t = rand(0, 3);
    for (;;) {
      if (t === 3) { // moyenne avec coefficients
        const mat = shuffle(["français", "mathématiques", "histoire-géographie", "sciences", "anglais", "EPS"]).slice(0, rand(3, 4)), notes = mat.map(() => rand(6, 19)), co = mat.map(() => rand(1, 4)), C = somme4(co), S = somme4(notes.map((v, i) => v * co[i])), m = S / C;
        if (!exact2(m) || co.every((c) => c === co[0])) continue;
        const n = pick(PRENOMS4);
        return { enonce: `Voici les notes ${de4(n)} au brevet blanc et leurs coefficients. Calcule sa moyenne.`, tableau: { lignes: [["\\text{Matière}", "\\text{Note}", "\\text{Coef.}"], ...mat.map((x, i) => [`\\text{${x}}`, String(notes[i]), String(co[i])])] }, mode: "nombre", prefixe: "Moyenne :", attendu: m,
          erreurs: [{ valeur: somme4(notes) / notes.length, message: "Il faut tenir compte des coefficients : chaque note compte autant de fois que son coefficient." }, { valeur: S / notes.length, message: `On divise par la somme des coefficients ($${C}$), pas par le nombre de matières.` }, { valeur: S, message: `Il reste à diviser par la somme des coefficients : $${C}$.` }],
          aides: ["Multiplie chaque note par son coefficient.", `Somme : $${notes.map((v, i) => `${v} \\times ${co[i]}`).join(" + ")} = ${S}$.`, `Divise par la somme des coefficients : $${co.join(" + ")} = ${C}$.`],
          solution: `Somme des produits : $${notes.map((v, i) => `${v} \\times ${co[i]}`).join(" + ")} = ${S}$. Somme des coefficients : $${co.join(" + ")} = ${C}$. Moyenne : $\\dfrac{${S}}{${C}} = ${nb(m)}$.` };
      }
      if (t === 2) { // températures à Pamandzi : moyenne d'une liste
        const j = ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."].slice(0, rand(5, 7)), T = j.map(() => rand(24, 32)), S = somme4(T), m = S / T.length, M = mediane(T);
        if (!exact2(m)) continue;
        return { enonce: `Le diagramme donne la température maximale relevée chaque jour d'une semaine à Pamandzi. Calcule la moyenne de ces températures.`, figure: diag4(j.map((d, i) => [d, T[i]]), { pas: 5, unite: "°C", aria: "Températures maximales à Pamandzi" }), mode: "nombre", prefixe: "Moyenne :", suffixe: "°C", attendu: m,
          erreurs: [{ valeur: S, message: `C'est la somme des températures : divise par le nombre de jours ($${T.length}$).` }, { valeur: M, message: "Ça, c'est la médiane. La moyenne est la somme divisée par le nombre de valeurs." }, { valeur: (Math.max(...T) + Math.min(...T)) / 2, message: "La moyenne utilise toutes les valeurs, pas seulement la plus grande et la plus petite." }],
          aides: ["Lis chaque température sur le diagramme.", `Somme : $${T.join(" + ")} = ${S}$.`, `Divise par $${T.length}$.`], solution: `Somme : $${T.join(" + ")} = ${S}$. Moyenne : $\\dfrac{${S}}{${T.length}} = ${nb(m)}$ °C.` };
      }
      const C = CTX_SX4(), vals = tireSerie4(C, 3, 6), eff = vals.map(() => rand(1, 8)), N = somme4(eff), S = somme4(vals.map((v, i) => v * eff[i])), m = S / N;
      if (!exact2(m)) continue;
      const enonce = t === 1 ? `Le diagramme donne ${C.q}. Calcule la moyenne de cette série.` : `Le tableau donne ${C.q}. Calcule la moyenne de cette série.`;
      return { enonce, ...(t === 1 ? { figure: diag4(vals.map((v, i) => [String(v), eff[i]]), { pas: Math.max(...eff) > 8 ? 2 : 1, unite: "Effectif", xTitre: C.lab, aria: `Effectifs selon : ${C.lab}` }) } : { tableau: { lignes: [[`\\text{${C.lab}}`, ...vals.map(String)], ["\\text{Effectif}", ...eff.map(String)]] } }), mode: "nombre", prefixe: "Moyenne :", attendu: m,
        erreurs: [{ valeur: somme4(vals) / vals.length, message: "Il faut tenir compte des effectifs : c'est une moyenne pondérée." }, { valeur: S / vals.length, message: `On divise par l'effectif total ($${N}$), pas par le nombre de valeurs différentes.` }, { valeur: S, message: `Il reste à diviser par l'effectif total : $${N}$.` }],
        aides: ["Moyenne pondérée $= \\dfrac{\\text{somme des (valeur} \\times \\text{effectif)}}{\\text{effectif total}}$.", `Somme : $${vals.map((v, i) => `${v} \\times ${eff[i]}`).join(" + ")} = ${S}$.`, `Effectif total : $${N}$.`],
        solution: `Somme des produits : $${vals.map((v, i) => `${v} \\times ${eff[i]}`).join(" + ")} = ${S}$. Effectif total : $${N}$. Moyenne : $\\dfrac{${S}}{${N}} = ${nb(m)}$.` };
    }
  };

  GEN["sx4-mediane"] = function () {
    if (Math.random() < 0.4) { // médiane lue sur un diagramme en barres
      for (;;) {
        const C = CTX_SX4(), vals = tireSerie4(C, 4, 7), eff = vals.map(() => rand(1, 7)), N = somme4(eff), T = []; vals.forEach((v, i) => { for (let k = 0; k < eff[i]; k++) T.push(v); });
        const M = mediane(T), mode = vals[eff.indexOf(Math.max(...eff))], milieu = vals[Math.floor((vals.length - 1) / 2)], moy = somme4(T) / N;
        if (eff.filter((e) => e === Math.max(...eff)).length > 1) continue;
        const cum = []; eff.reduce((a, e, i) => (cum[i] = a + e), 0);
        return { enonce: `Le diagramme donne ${C.q}. Quelle est la médiane de cette série ?`, figure: diag4(vals.map((v, i) => [String(v), eff[i]]), { pas: 1, unite: "Effectif", xTitre: C.lab, aria: `Effectifs selon : ${C.lab}` }), mode: "nombre", prefixe: "Médiane :", attendu: M,
          erreurs: [{ valeur: mode, message: "Ça, c'est la valeur la plus fréquente (la plus haute barre). La médiane partage l'effectif total en deux." }, { valeur: milieu, message: "La médiane n'est pas la valeur au milieu de l'axe : elle dépend des effectifs." }, { valeur: moy, message: "Ça, c'est la moyenne." }],
          aides: [`Effectif total : $${eff.join(" + ")} = ${N}$.`, N % 2 ? `La médiane est la $${(N + 1) / 2}$e valeur de la série rangée.` : `La médiane est la moyenne des $${N / 2}$e et $${N / 2 + 1}$e valeurs.`, `Effectifs cumulés : $${cum.join(" ; ")}$.`],
          solution: `Effectif total $${N}$ ; effectifs cumulés : $${cum.join(" ; ")}$. ${N % 2 ? `La $${(N + 1) / 2}$e valeur est $${nb(M)}$.` : `Les $${N / 2}$e et $${N / 2 + 1}$e valeurs donnent $${nb(M)}$.`} La médiane est $${nb(M)}$.` };
      }
    }
    const n = rand(5, 12), C = pick([["", 1, 30], [" (durées en minutes du trajet pour venir au collège)", 5, 45], [` (hauteurs de pluie en mm relevées à ${pick(LIEUX4)})`, 0, 40], [" (nombre de passagers dans un taxi-brousse à chaque départ)", 2, 9], [" (masses en kg de thons pêchés au large de Mayotte)", 8, 40]]), L = Array.from({ length: n }, () => rand(C[1], C[2])), M = mediane(L), T = L.slice().sort((a, b) => a - b);
    return { enonce: `Détermine la médiane de la série${C[0]} : $${listeT(L)}$.`, mode: "nombre", prefixe: "Médiane :", attendu: M,
      figureSolution: serieRangee4(T, n % 2 ? [(n - 1) / 2] : [n / 2 - 1, n / 2], `Série rangée dans l'ordre croissant ; ${n % 2 ? "la valeur du milieu est" : "les deux valeurs du milieu sont"} mise${n % 2 ? "" : "s"} en valeur`),
      erreurs: [{ valeur: arr(L.reduce((a, b) => a + b, 0) / n, 4), message: "Ça, c'est la moyenne. La médiane partage la série rangée en deux groupes de même effectif." }, { valeur: L[Math.floor(n / 2)], message: "Il faut d'abord ranger les valeurs dans l'ordre croissant." }],
      aides: ["Range les valeurs dans l'ordre croissant.", `Il y a $${n}$ valeurs : ${n % 2 ? `la médiane est la $${(n + 1) / 2}$e valeur` : `la médiane est la moyenne des $${n / 2}$e et $${n / 2 + 1}$e valeurs`}.`, `Série rangée : $${listeT(T)}$.`],
      solution: `Série rangée : $${listeT(T)}$. ${n % 2 ? `La médiane est la $${(n + 1) / 2}$e valeur : $${M}$.` : `La médiane est la moyenne des $${n / 2}$e et $${n / 2 + 1}$e valeurs : $\\dfrac{${T[n / 2 - 1]} + ${T[n / 2]}}{2} = ${nb(M)}$.`}` };
  };

  GEN["sx4-etendue"] = function () {
    const t = rand(0, 2), n = rand(6, 10);
    if (t === 2) { // températures moyennes mensuelles à Mayotte, sur un diagramme
      const mois = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."], i0 = rand(0, 6), k = rand(5, 6), M = mois.slice(i0, i0 + k), T = M.map(() => rand(22, 31)), mx = Math.max(...T), mn = Math.min(...T), lieu = pick(["Pamandzi", "Mamoudzou", "Sada", "Kani-Kéli"]);
      if (mx === mn) return GEN["sx4-etendue"]();
      return { enonce: `Le diagramme donne la température moyenne de quelques mois à ${lieu}. Quelle est l'étendue de cette série ?`, figure: diag4(M.map((m, i) => [m, T[i]]), { pas: 5, unite: "°C", aria: `Températures moyennes mensuelles à ${lieu}` }), mode: "nombre", prefixe: "Étendue :", suffixe: "°C", attendu: mx - mn,
        erreurs: [{ valeur: mx, message: "C'est la plus grande valeur : l'étendue est l'écart entre la plus grande et la plus petite." }, { valeur: mn, message: "C'est la plus petite valeur : l'étendue est l'écart entre la plus grande et la plus petite." }, { valeur: mx + mn, message: "L'étendue est une différence, pas une somme." }],
        aides: ["Repère la plus haute et la plus basse barre.", `Plus grande valeur : $${mx}$ ; plus petite : $${mn}$.`, "L'étendue est la plus grande valeur moins la plus petite."], solution: `Étendue : $${mx} - ${mn} = ${mx - mn}$ °C.` };
    }
    if (t === 0) { const L = Array.from({ length: n }, () => rand(-5, 32)), e = Math.max(...L) - Math.min(...L), mx = Math.max(...L), mn = Math.min(...L);
      return { enonce: `Voici des températures relevées (en °C) dans une station de montagne : $${L.map(rel).join(" ; ")}$. Quelle est l'étendue de cette série ?`, mode: "nombre", prefixe: "Étendue :", suffixe: "°C", attendu: e,
        figureSolution: axeEtendue4(L, "°C"),
        erreurs: [...(mn < 0 ? [{ valeur: mx + mn, message: `Attention au signe : $${mx} - (${mn}) = ${mx} + ${-mn}$.` }] : [{ valeur: mx + mn, message: "L'étendue est une différence, pas une somme." }]), { valeur: mx, message: "C'est la plus grande valeur : il faut lui soustraire la plus petite." }, { valeur: Math.abs(mn), message: "L'étendue est l'écart entre la plus grande et la plus petite valeur." }],
        aides: ["L'étendue est la différence entre la plus grande et la plus petite valeur.", `Plus grande valeur : $${rel(Math.max(...L))}$ ; plus petite : $${rel(Math.min(...L))}$.`, "Attention si la plus petite est négative."], solution: `$${rel(Math.max(...L))} - ${relP(Math.min(...L))} = ${e}$ °C.` }; }
    const vals = [10, 11, 12, 13, 14, 15], eff = vals.map(() => rand(1, 7)), N = eff.reduce((a, b) => a + b, 0), T = []; vals.forEach((v, i) => { for (let k = 0; k < eff[i]; k++) T.push(v); }); const M = mediane(T);
    const modeV = vals[eff.indexOf(Math.max(...eff))];
    return { enonce: `Le tableau donne l'âge des adhérents d'un club de football de ${pick(LIEUX4)}. Quelle est la médiane de ces âges ?`, tableau: { lignes: [["\\text{Âge}", ...vals.map(String)], ["\\text{Effectif}", ...eff.map(String)]] }, mode: "nombre", prefixe: "Médiane :", suffixe: "ans", attendu: M,
      erreurs: [{ valeur: 12.5, message: "La médiane n'est pas le milieu des âges du tableau : elle dépend des effectifs." }, { valeur: somme4(T) / N, message: "Ça, c'est la moyenne." }, ...(eff.filter((e) => e === Math.max(...eff)).length === 1 ? [{ valeur: modeV, message: "Ça, c'est l'âge le plus fréquent. La médiane partage l'effectif total en deux." }] : [])],
      aides: [`Effectif total : $${N}$.`, N % 2 ? `La médiane est la $${(N + 1) / 2}$e valeur.` : `La médiane est la moyenne des $${N / 2}$e et $${N / 2 + 1}$e valeurs.`, "Cumule les effectifs pour trouver dans quelle colonne elle se trouve."],
      solution: `Effectif total $${N}$ ; ${N % 2 ? `la $${(N + 1) / 2}$e valeur` : `les $${N / 2}$e et $${N / 2 + 1}$e valeurs`} ${N % 2 ? "est" : "donnent"} $${nb(M)}$ : la médiane est $${nb(M)}$ ans.` };
  };

  GEN["sx4-interpreter"] = function () {
    const r = Math.random();
    if (r < 0.35) { // lire un diagramme en barres
      for (;;) {
        const C = CTX_SX4(), vals = tireSerie4(C, 4, 7), eff = vals.map(() => rand(1, 8)), N = somme4(eff), q = rand(0, 2);
        if (q === 0) { const v = pick(vals.slice(1, -1).length ? vals.slice(1, -1) : vals), i = vals.indexOf(v), ok = somme4(eff.slice(i)), F = [somme4(eff.slice(i + 1)), somme4(eff.slice(0, i + 1)), eff[i]];
          if (new Set([ok, ...F]).size < 4) continue;
          const { choix, attendu } = melange(`$${ok}$`, F.map((z) => `$${z}$`));
          return { enonce: `Le diagramme donne ${C.q}. Combien de valeurs de la série sont supérieures ou égales à $${v}$ ?`, figure: diag4(vals.map((x, j) => [String(x), eff[j]]), { pas: 1, unite: "Effectif", xTitre: C.lab, aria: `Effectifs selon : ${C.lab}` }), mode: "choix", choix, attendu,
            aides: ["Chaque barre donne l'effectif d'une valeur.", `« Supérieures ou égales à $${v}$ » : on compte la barre de $${v}$ et toutes celles à sa droite.`, `$${eff.slice(i).join(" + ")}$.`], solution: `$${eff.slice(i).join(" + ")} = ${ok}$ valeurs sont supérieures ou égales à $${v}$.` }; }
        if (q === 1) { const F = [vals.length, Math.max(...eff), somme4(vals)].filter((z) => z !== N);
          if (new Set([N, ...F]).size < 4) continue;
          const { choix, attendu } = melange(`$${N}$`, F.map((z) => `$${z}$`));
          return { enonce: `Le diagramme donne ${C.q}. Quel est l'effectif total de la série ?`, figure: diag4(vals.map((x, j) => [String(x), eff[j]]), { pas: 1, unite: "Effectif", xTitre: C.lab, aria: `Effectifs selon : ${C.lab}` }), mode: "choix", choix, attendu,
            aides: ["L'effectif total est le nombre de valeurs de la série.", "Additionne les hauteurs de toutes les barres.", `$${eff.join(" + ")}$.`], solution: `Effectif total : $${eff.join(" + ")} = ${N}$.` }; }
        const mx = Math.max(...eff); if (eff.filter((e) => e === mx).length > 1) continue;
        const bon = vals[eff.indexOf(mx)], F = [String(mx), String(vals[vals.length - 1]), String(vals[Math.floor((vals.length - 1) / 2)] === bon ? vals[0] : vals[Math.floor((vals.length - 1) / 2)])];
        if (new Set([String(bon), ...F]).size < 4) continue;
        const { choix, attendu } = melange(`$${bon}$`, F.map((z) => `$${z}$`));
        return { enonce: `Le diagramme donne ${C.q}. Quelle est la valeur la plus fréquente ?`, figure: diag4(vals.map((x, j) => [String(x), eff[j]]), { pas: 1, unite: "Effectif", xTitre: C.lab, aria: `Effectifs selon : ${C.lab}` }), mode: "choix", choix, attendu,
          aides: ["La valeur la plus fréquente correspond à la plus haute barre.", "On lit la valeur sous la barre, pas sa hauteur.", `La plus haute barre a une hauteur de $${mx}$.`], solution: `La plus haute barre (effectif $${mx}$) est celle de la valeur $${bon}$.` };
      }
    }
    if (r < 0.65) { // comparer deux séries à l'aide de leurs indicateurs
      for (;;) {
        const mA = rand(80, 150) / 10, mB = rand(80, 150) / 10, eA = rand(4, 16), eB = rand(4, 16), dA = Math.round(mA) + rand(-1, 1), dB = Math.round(mB) + rand(-1, 1); if (Math.abs(mA - mB) < 0.3 || eA === eB) continue;
        const [X, Y] = pick([["A", "B"], ["4e A", "4e B"], ["Anli", "Zaïnaba"]]), nom = (z) => (z.length > 1 && !z.startsWith("4e") ? z : `la classe ${z}`), Nom = (z) => (z.length > 1 && !z.startsWith("4e") ? z : `La classe ${z}`);
        const best = mA > mB ? X : Y, worst = mA > mB ? Y : X, disp = eA > eB ? X : Y, reg = eA > eB ? Y : X, notes = (z) => (z.length > 1 && !z.startsWith("4e") ? `les notes ${de4(z)}` : `les notes de la classe ${z}`);
        const vrais = [`${Nom(best)} a la meilleure moyenne`, `${notes(disp)[0].toUpperCase() + notes(disp).slice(1)} sont plus dispersées`, `Au moins la moitié des notes ${X.length > 1 && !X.startsWith("4e") ? de4(X) : `de la classe ${X}`} sont supérieures ou égales à $${dA}$`];
        const faux = [`${Nom(worst)} a la meilleure moyenne`, `${notes(reg)[0].toUpperCase() + notes(reg).slice(1)} sont plus dispersées`, `Toutes les notes ${X.length > 1 && !X.startsWith("4e") ? de4(X) : `de la classe ${X}`} sont égales à $${nb(mA)}$`, `${Nom(X)} et ${nom(Y)} ont exactement les mêmes notes`];
        const k = rand(0, 2), F = shuffle(faux.filter((f, i) => !(i === k && k < 2))).slice(0, 3), { choix, attendu } = melange(vrais[k], F);
        const qui = X.length > 1 && !X.startsWith("4e") ? "les notes de deux élèves sur l'année" : "les notes de deux classes à un même contrôle";
        return { enonce: `Le tableau résume ${qui}. Quelle affirmation est vraie ?`, tableau: { lignes: [["", `\\text{${X}}`, `\\text{${Y}}`], ["\\text{Moyenne}", nb(mA), nb(mB)], ["\\text{Médiane}", nb(dA), nb(dB)], ["\\text{Étendue}", String(eA), String(eB)]] }, mode: "choix", choix, attendu,
          aides: ["La moyenne et la médiane renseignent sur le niveau ; l'étendue sur la dispersion.", "Au moins la moitié des valeurs sont supérieures ou égales à la médiane.", "Une étendue plus grande signifie des valeurs plus dispersées."],
          solution: `Vrai : ${vrais[k][0].toLowerCase() + vrais[k].slice(1)}. ${k === 0 ? `Moyennes : $${nb(mA)}$ et $${nb(mB)}$.` : k === 1 ? `Étendues : $${eA}$ et $${eB}$.` : `C'est le sens de la médiane $${dA}$.`}` };
      }
    }
    if (r < 0.9) {
      const n = rand(9, 45), m = rand(8, 16);
      const bonne = n % 2 ? `la $${(n + 1) / 2}$e valeur` : `la moyenne des $${n / 2}$e et $${n / 2 + 1}$e valeurs`;
      const faux = [`la $${Math.floor(n / 2)}$e valeur`, `la $${n}$e valeur`, n % 2 ? `la moyenne des $${(n - 1) / 2}$e et $${(n + 1) / 2}$e valeurs` : `la $${n / 2 + 1}$e valeur`, "la moyenne de toutes les valeurs"].filter((z) => z !== bonne);
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `Une série de $${n}$ valeurs est rangée dans l'ordre croissant. Sa médiane est :`, mode: "choix", choix, attendu,
        aides: ["La médiane partage la série rangée en deux groupes de même effectif.", n % 2 ? "Avec un nombre impair de valeurs, c'est la valeur du milieu." : "Avec un nombre pair de valeurs, c'est la moyenne des deux valeurs du milieu.", `$${n} \\div 2 = ${nb(n / 2)}$.`], solution: `Avec $${n}$ valeurs, la médiane est ${bonne}.` };
    }
    const kk = rand(2, 9), md = rand(9, 15);
    const Q = pick([
      [`La médiane d'une série de notes est $${md}$. Cela signifie que :`, `au moins la moitié des notes sont inférieures ou égales à $${md}$`, [`la moyenne vaut $${md}$`, `toutes les notes valent $${md}$`, `la note la plus fréquente est $${md}$`]],
      ["L'étendue d'une série mesure :", "la dispersion des valeurs", ["la valeur centrale", "la valeur la plus fréquente", "le nombre de valeurs"]],
      ["Dans une série, une valeur très grande (extrême) modifie surtout :", "la moyenne", ["la médiane", "l'effectif total", "le nombre de valeurs"]],
      ["Pour une série de $20$ valeurs rangées, la médiane est :", "la moyenne des $10$e et $11$e valeurs", ["la $10$e valeur", "la $20$e valeur", "la moyenne de toutes les valeurs"]],
      ["Pour une série de $15$ valeurs rangées, la médiane est :", "la $8$e valeur", ["la $7$e valeur", "la moyenne des $7$e et $8$e valeurs", "la $15$e valeur"]],
      ["Deux classes ont la même moyenne, $11$. L'étendue est $4$ dans la classe A et $15$ dans la classe B. On peut dire :", "les notes de la classe B sont plus dispersées", ["la classe A a de meilleures notes", "la classe B a une meilleure médiane", "les deux classes ont les mêmes notes"]],
      ["On ajoute à une série une valeur égale à sa moyenne. La moyenne :", "ne change pas", ["augmente", "diminue", "double"]],
      [`Si on ajoute $${kk}$ à toutes les valeurs d'une série, l'étendue :`, "ne change pas", [`augmente de $${kk}$`, `augmente de $${2 * kk}$`, "double"]],
      [`Si on ajoute $${kk}$ à toutes les valeurs d'une série, la moyenne :`, `augmente de $${kk}$`, ["ne change pas", "double", `augmente de $${2 * kk}$`]],
      ["Pour calculer une moyenne pondérée, on divise la somme des produits par :", "l'effectif total", ["le nombre de valeurs différentes", "la plus grande valeur", "l'étendue"]]
    ]);
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu, aides: ["La moyenne tient compte de toutes les valeurs.", "La médiane partage la série rangée en deux moitiés.", "L'étendue mesure l'écart entre la plus grande et la plus petite valeur."], solution: `Réponse : ${Q[1]}.` };
  };

  /* =====================================================================
     Chapitre 15 : programmation (in4-) — variables, conditions, boucles « jusqu'à », événements
     ===================================================================== */
  // Programme en blocs façon Scratch, avec en plus { si, alors, sinon } et { jusqua, corps } (mêmes classes CSS que blocs())
  const CAT4 = { evt: "pi-evt", ent: "pi-ent", op: "pi-op", dire: "pi-dire", mvt: "pi-mvt", stylo: "pi-stylo", ctrl: "pi-ctrl", var: "pi-var" };
  function blocs4(prog) {
    const H = 26, CW = 6.6; let y = 6, s = "", W = 0;
    const ecrire = (t, x, yc) => {
      let out = "", cx = x;
      t.split(/(\[[^\]]*\])/).filter((seg) => seg.trim()).forEach((seg) => {
        if (seg[0] === "[") { const v = seg.slice(1, -1), w = Math.max(24, v.length * CW + 12);
          out += `<rect class="pi-champ" x="${cx}" y="${yc - 9}" width="${w}" height="18" rx="9"/><text class="pi-val" x="${cx + w / 2}" y="${yc + 4}" text-anchor="middle">${v}</text>`; cx += w + 5; }
        else { const m = seg.trim(); out += `<text class="pi-txt" x="${cx}" y="${yc + 4}" textLength="${(m.length * CW).toFixed(1)}" lengthAdjust="spacingAndGlyphs">${m}</text>`; cx += m.length * CW + 5; }
      });
      W = Math.max(W, cx + 4); return [out, cx - x];
    };
    const enveloppe = (x, entete, branches) => {
      // entete : texte du haut ; branches : [{ corps, etiquette }] (étiquette « sinon » entre deux branches)
      const y0 = y, [txt, w] = ecrire(entete, x + 8, y0 + H / 2); let Wt = Math.max(w + 14, 130), d = `M${x} ${y0}h${Wt}v${H}`, t = txt;
      y += H;
      branches.forEach((br, i) => {
        const yIn = y; br.corps.forEach((c) => poser(c, x + 14)); const hIn = Math.max(y - yIn, H);
        d += `h${-(Wt - 14)}v${hIn}h${Wt - 14}`;
        if (i < branches.length - 1) { const [t2] = ecrire(branches[i + 1].etiquette, x + 8, yIn + hIn + H / 2); t += t2; d += `v${H}`; y = yIn + hIn + H; }
        else y = yIn + hIn;
      });
      d += `v14h${-Wt}z`; s += `<path class="pi-ctrl" d="${d}"/>` + t; y += 16;
    };
    const poser = (b, x) => {
      if (b.rep != null) return enveloppe(x, `répéter [${b.rep}] fois`, [{ corps: b.corps }]);
      if (b.jusqua != null) return enveloppe(x, `répéter jusqu'à [${b.jusqua}]`, [{ corps: b.corps }]);
      if (b.si != null) return enveloppe(x, `si [${b.si}] alors`, b.sinon ? [{ corps: b.alors }, { corps: b.sinon, etiquette: "sinon" }] : [{ corps: b.alors }]);
      const [txt, w] = ecrire(b.t, x + 8, y + H / 2);
      s += `<rect class="${CAT4[b.c]}" x="${x}" y="${y}" width="${w + 11}" height="${H}" rx="${b.c === "evt" ? 12 : 5}"/>` + txt; y += H + 2;
    };
    prog.forEach((b) => poser(b, 6));
    const aria = (p) => p.map((b) => (b.rep != null ? `répéter ${b.rep} fois : ${aria(b.corps)} ; fin` : b.jusqua != null ? `répéter jusqu'à ${b.jusqua} : ${aria(b.corps)} ; fin` : b.si != null ? `si ${b.si} alors ${aria(b.alors)}${b.sinon ? ` sinon ${aria(b.sinon)}` : ""} ; fin du si` : b.t.replace(/[[\]]/g, ""))).join(" ; ");
    W = Math.max(W, 150);
    return `<svg class="graph pi-prog" viewBox="0 0 ${Math.ceil(W)} ${y + 4}" style="max-width:${Math.ceil(W)}px" role="img" aria-label="Programme : ${aria(prog).replace(/"/g, "'")}">${s}</svg>`;
  }
  window.PM_EXO.blocs4 = blocs4;
  const DRAP4 = { c: "evt", t: "quand le drapeau est cliqué" };
  const signeSc = (t) => t.replace(/\*/g, "\\times ");

  GEN["in4-variable"] = function () {
    for (;;) {
      const a = rand(2, 12), b = rand(2, 12), v = { A: a, B: b }, lignes = [{ c: "var", t: `mettre [A] à [${a}]` }, { c: "var", t: `mettre [B] à [${b}]` }], trace = [`$A = ${a}$, $B = ${b}$`];
      const OPS = [
        () => { const k = rand(2, 9); v.A += k; return [`ajouter [${k}] à [A]`, `$A = ${v.A}$`]; },
        () => { v.B = v.A + v.B; return ["mettre [B] à [A + B]", `$B = ${v.B}$`]; },
        () => { const k = rand(2, 4); v.A = v.A * k; return [`mettre [A] à [A * ${k}]`, `$A = ${v.A}$`]; },
        () => { v.A = v.B - v.A; return ["mettre [A] à [B - A]", `$A = ${v.A}$`]; },
        () => { const k = rand(2, 3); v.B = v.B * k - v.A; return [`mettre [B] à [B * ${k} - A]`, `$B = ${v.B}$`]; },
        () => { v.A = v.B; return ["mettre [A] à [B]", `$A = ${v.A}$`]; }
      ];
      const n = rand(2, 4), choisis = shuffle(OPS.map((f, i) => i)).slice(0, n), snaps = [{ A: a, B: b }];
      choisis.forEach((i) => { const [t, tr] = OPS[i](); lignes.push({ c: "var", t }); trace.push(tr); snaps.push({ A: v.A, B: v.B }); });
      const X = pick(["A", "B"]), Yv = X === "A" ? "B" : "A", r = v[X];
      if (Math.abs(r) > 300 || (X === "A" && r === a) || (X === "B" && r === b)) continue;
      let iDer = snaps.length - 1; while (iDer > 0 && snaps[iDer][X] === snaps[iDer - 1][X]) iDer--;
      const avant = snaps[Math.max(iDer - 1, 0)][X];
      const prog = blocs4([DRAP4, ...lignes, { c: "dire", t: `dire [${X}]` }]);
      return { enonce: "Que dit le lutin à la fin de ce programme ?", figure: prog, mode: "nombre", prefixe: "Le lutin dit :", attendu: r,
        erreurs: [{ valeur: X === "A" ? a : b, message: `La variable $${X}$ a changé de valeur pendant le programme : suis-la ligne par ligne.` }, { valeur: v[Yv], message: `C'est la valeur finale de $${Yv}$ ; le lutin dit la valeur de $${X}$.` }, { valeur: avant, message: `C'est la valeur de $${X}$ avant sa dernière modification : va jusqu'au bout du programme.` }],
        aides: ["Une variable est une « boîte » qui contient un nombre ; « mettre … à » remplace son contenu.", "Exécute les instructions dans l'ordre, en notant à chaque ligne les valeurs de $A$ et de $B$.", `Au début : $A = ${a}$ et $B = ${b}$.`],
        solution: `Valeurs successives : ${trace.join(" ; ")}. Le lutin dit $${r}$.` };
    }
  };

  GEN["in4-condition"] = function () {
    const k = rand(5, 20), a = rand(2, 5), b = rand(3, 15), t = rand(0, 2);
    const x = pick([k, k - rand(1, 4), k + rand(1, 6), rand(1, 30)]);
    const [cond, vrai] = [[`réponse > ${k}`, x > k], [`réponse < ${k}`, x < k], [`réponse = ${k}`, x === k]][t];
    const alors = x * a, sinon = x + b;
    const r = vrai ? alors : sinon, autre = vrai ? sinon : alors;
    const prog = blocs4([DRAP4, { c: "ent", t: "demander [Choisis un nombre] et attendre" }, { si: cond, alors: [{ c: "dire", t: `dire [réponse * ${a}]` }], sinon: [{ c: "dire", t: `dire [réponse + ${b}]` }] }]);
    const symb = [">", "<", "="][t];
    return { enonce: `On lance ce programme et on répond $${x}$. Que dit le lutin ?`, figure: prog, mode: "nombre", prefixe: "Le lutin dit :", attendu: r,
      erreurs: [...(autre !== r ? [{ valeur: autre, message: `La condition « réponse $${symb}$ $${k}$ » est ${vrai ? "vraie" : "fausse"} pour $${x}$ : c'est donc ${vrai ? "la branche « alors »" : "la branche « sinon »"} qui s'exécute.` }] : []), { valeur: x, message: "Le lutin ne répète pas la réponse : il dit le résultat du calcul de la branche choisie." }, { valeur: vrai ? x + a : x * b, message: `Relis bien l'opération de la branche ${vrai ? "« alors »" : "« sinon »"} : ${vrai ? `réponse $\\times ${a}$` : `réponse $+ ${b}$`}.` }],
      aides: ["« si … alors … sinon » : si la condition est vraie, on exécute le premier bloc ; sinon, le second.", `Teste la condition avec $${x}$ : est-ce que $${x} ${symb} ${k}$ ?`, t === 0 && x === k ? `Attention : $${k} > ${k}$ est faux (l'inégalité est stricte).` : t === 1 && x === k ? `Attention : $${k} < ${k}$ est faux (l'inégalité est stricte).` : "Puis fais le calcul de la branche choisie."],
      solution: `$${x} ${symb} ${k}$ est ${vrai ? "vrai" : "faux"}, donc le lutin dit ${vrai ? `$${x} \\times ${a} = ${r}$` : `$${x} + ${b} = ${r}$`}.` };
  };

  // polygone régulier tracé par le lutin (n côtés)
  const polyReg4 = (n, txt) => { const R = 52, cx = 160, cy = 66, pts = Array.from({ length: n }, (_, i) => [cx + R * Math.cos(Math.PI / 2 + Math.PI / n + (2 * Math.PI * i) / n), cy + R * Math.sin(Math.PI / 2 + Math.PI / n + (2 * Math.PI * i) / n)]); return svg4(320, 132, `Figure tracée : polygone régulier à ${n} côtés${txt ? ", " + txt : ""}`, P4(pts, "g-poly") + (txt ? T4(cx, 128, txt, "g-mesure") : "")); };
  GEN["in4-boucle"] = function () {
    const t = rand(0, 3);
    if (t === 3) { // boucle « répéter n fois » et tracé d'un polygone
      const n = pick([3, 4, 5, 6, 8, 9, 10, 12]), L = rand(2, 12) * 10, A = 360 / n, q = rand(0, 1);
      const prog = blocs4([DRAP4, { c: "stylo", t: "stylo en position d'écriture" }, { rep: n, corps: [{ c: "mvt", t: `avancer de [${L}] pas` }, { c: "mvt", t: `tourner ↻ de [${A}] degrés` }] }]);
      return q ? { enonce: "Quelle longueur totale (en pas) le lutin trace-t-il avec ce programme ?", figure: prog, mode: "nombre", prefixe: "Longueur :", suffixe: "pas", attendu: n * L, figureSolution: polyReg4(n, `${n} côtés de ${L} pas`),
        erreurs: [{ valeur: L, message: `La boucle est répétée $${n}$ fois : le lutin avance $${n}$ fois de $${L}$ pas.` }, { valeur: (n - 1) * L, message: `Compte bien : $${n}$ passages dans la boucle, donc $${n}$ côtés.` }, { valeur: n + L, message: `On multiplie : $${n} \\times ${L}$.` }],
        aides: ["Le contenu de la boucle est exécuté à chaque passage.", `À chaque passage, le lutin avance de $${L}$ pas.`, `Il y a $${n}$ passages.`], solution: `$${n} \\times ${L} = ${n * L}$ pas : le lutin trace un polygone régulier à $${n}$ côtés.` }
        : (() => { const F = [n - 1, n + 1, A, 2 * n].filter((z) => z !== n && z > 2), { choix, attendu } = melange(`un polygone régulier à $${n}$ côtés`, F.slice(0, 3).map((z) => `un polygone régulier à $${z}$ côtés`)); return { enonce: "Quelle figure le lutin trace-t-il avec ce programme ?", figure: prog, mode: "choix", choix, attendu, figureSolution: polyReg4(n, ""),
          aides: ["Chaque passage dans la boucle trace un côté, puis le lutin tourne.", `La boucle est répétée $${n}$ fois.`, `Le lutin tourne de $${A}^\\circ$ à chaque fois : $${n} \\times ${A} = 360$, il fait un tour complet.`], solution: `$${n}$ passages : $${n}$ côtés de même longueur, et $${n} \\times ${A}^\\circ = 360^\\circ$ : le lutin revient au départ. C'est un polygone régulier à $${n}$ côtés.` }; })();
    }
    if (t === 0) {
      const x = rand(1, 9), L = rand(20, 400), k = pick([2, 3]); let N = x; const vals = [x];
      while (!(N > L)) { N *= k; vals.push(N); }
      if (vals.length < 3) return GEN["in4-boucle"]();
      const prog = blocs4([DRAP4, { c: "var", t: `mettre [N] à [${x}]` }, { jusqua: `N > ${L}`, corps: [{ c: "var", t: `mettre [N] à [N * ${k}]` }] }, { c: "dire", t: "dire [N]" }]);
      return { enonce: "Que dit le lutin à la fin de ce programme ?", figure: prog, mode: "nombre", prefixe: "Le lutin dit :", attendu: N,
        erreurs: [{ valeur: vals[vals.length - 2], message: `On s'arrête seulement quand la condition « $N > ${L}$ » devient vraie.` }],
        aides: ["« répéter jusqu'à » répète le bloc tant que la condition est fausse ; on teste la condition avant chaque passage.", `$N$ vaut d'abord $${x}$, puis est multiplié par $${k}$ à chaque passage.`, `Valeurs : $${vals.slice(0, 3).join(" ; ")}$ ; …`],
        solution: `$N$ prend les valeurs $${vals.join(" ; ")}$. La boucle s'arrête dès que $N > ${L}$ : le lutin dit $${N}$.` };
    }
    if (t === 1) {
      const n = rand(3, 12), k = rand(2, 15), s0 = rand(0, 20), r = s0 + n * k;
      const prog = blocs4([DRAP4, { c: "var", t: `mettre [S] à [${s0}]` }, { c: "var", t: "mettre [i] à [0]" }, { jusqua: `i = ${n}`, corps: [{ c: "var", t: "ajouter [1] à [i]" }, { c: "var", t: `ajouter [${k}] à [S]` }] }, { c: "dire", t: "dire [S]" }]);
      return { enonce: "Que dit le lutin à la fin de ce programme ?", figure: prog, mode: "nombre", prefixe: "Le lutin dit :", attendu: r,
        erreurs: [{ valeur: s0 + (n - 1) * k, message: `La variable $i$ compte les passages : la boucle tourne $${n}$ fois.` }, { valeur: n * k, message: `N'oublie pas la valeur de départ de $S$ : $${s0}$.` }],
        aides: ["La variable $i$ sert de compteur : elle augmente de $1$ à chaque passage.", `La boucle s'arrête quand $i = ${n}$ : elle est donc répétée $${n}$ fois.`, `À chaque passage, $S$ augmente de $${k}$.`],
        solution: `La boucle est répétée $${n}$ fois : $S = ${s0} + ${n} \\times ${k} = ${r}$.` };
    }
    const a = rand(20, 90), b = rand(3, 12), c = Math.floor(a / b) + 1;
    const prog = blocs4([DRAP4, { c: "var", t: `mettre [N] à [${a}]` }, { c: "var", t: "mettre [compteur] à [0]" }, { jusqua: "N < 0", corps: [{ c: "var", t: `ajouter [-${b}] à [N]` }, { c: "var", t: "ajouter [1] à [compteur]" }] }, { c: "dire", t: "dire [compteur]" }]);
    return { enonce: "Que dit le lutin à la fin de ce programme ? (C'est le nombre de passages dans la boucle.)", figure: prog, mode: "nombre", prefixe: "Le lutin dit :", attendu: c,
      erreurs: [{ valeur: c - 1, message: `Tant que $N$ vaut $0$ ou plus, la condition « $N < 0$ » est fausse : on refait un passage.` }],
      aides: [`À chaque passage, $N$ diminue de $${b}$ et le compteur augmente de $1$.`, "On s'arrête dès que $N$ devient négatif (strictement).", `Combien de fois peut-on retirer $${b}$ à $${a}$ avant de passer sous $0$ ?`],
      solution: `$N$ passe par $${a}$, $${a - b}$, … ; après $${c - 1}$ passages, $N = ${a - (c - 1) * b} \\geqslant 0$, et après $${c}$ passages, $N = ${a - c * b} < 0$. Le lutin dit $${c}$.` };
  };

  GEN["in4-evenements"] = function () {
    const r0 = Math.random();
    if (r0 >= 0.35 && r0 < 0.6) { // touches du clavier et position du lutin
      const x0 = rand(-10, 10) * 10, dx = rand(2, 9) * 5, dg = rand(2, 9) * 5, p = rand(2, 8), q = rand(1, 6), x = x0 + p * dx - q * dg, n = pick(PRENOMS4);
      const prog = blocs4([DRAP4, { c: "mvt", t: `aller à x: [${x0}] y: [0]` }, { c: "evt", t: "quand la touche flèche droite est pressée" }, { c: "mvt", t: `ajouter [${dx}] à x` }, { c: "evt", t: "quand la touche flèche gauche est pressée" }, { c: "mvt", t: `ajouter [-${dg}] à x` }]);
      return { enonce: `Dans le jeu « La pêche dans le lagon » programmé par ${n}, la barque est un lutin qui a ces trois scripts. On clique sur le drapeau, puis on appuie $${p}$ fois sur la flèche droite et $${q}$ fois sur la flèche gauche. Quelle est l'abscisse $x$ de la barque à la fin ?`, figure: prog, mode: "nombre", prefixe: "$x =$", attendu: x,
        erreurs: [{ valeur: x0 + p * dx + q * dg, message: `La flèche gauche ajoute $-${dg}$ : elle fait diminuer $x$.` }, { valeur: p * dx - q * dg, message: `Au départ, le drapeau place la barque en $x = ${x0}$.` }, { valeur: x0 + p * dx, message: "La flèche gauche déclenche aussi un script." }],
        aides: ["Chaque appui sur une touche déclenche le script placé sous l'événement correspondant.", `Départ : $x = ${x0}$. Flèche droite : $+${dx}$ ; flèche gauche : $-${dg}$.`, `$${rel(x0)} + ${p} \\times ${dx} - ${q} \\times ${dg}$.`], solution: `$x = ${rel(x0)} + ${p} \\times ${dx} - ${q} \\times ${dg} = ${rel(x)}$.` };
    }
    if (r0 >= 0.6 && r0 < 0.8) { // messages entre deux lutins
      const a = rand(0, 10), b = rand(2, 9), k = rand(2, 6), c = rand(2, 5), N = a + k * b;
      const prog = blocs4([DRAP4, { c: "var", t: `mettre [N] à [${a}]` }, { rep: k, corps: [{ c: "var", t: `ajouter [${b}] à [N]` }] }, { c: "evt", t: "envoyer à tous [fini]" }, { c: "evt", t: "quand je reçois [fini]" }, { c: "dire", t: `dire [N * ${c}]` }]);
      return { enonce: `Le script du haut appartient au lutin Maki, celui du bas (« quand je reçois [fini] ») au lutin Tortue. On clique sur le drapeau. Que dit la Tortue ?`, figure: prog, mode: "nombre", prefixe: "La Tortue dit :", attendu: N * c,
        erreurs: [{ valeur: N, message: `$N = ${N}$, mais la Tortue dit $N \\times ${c}$.` }, { valeur: a * c, message: "Le message « fini » n'est envoyé qu'après la boucle : $N$ a déjà changé." }, { valeur: (a + b) * c, message: `La boucle est répétée $${k}$ fois.` }],
        aides: ["Le message « fini » est envoyé après la boucle ; il déclenche le script de la Tortue.", `Après la boucle : $N = ${a} + ${k} \\times ${b}$.`, `La Tortue dit $N \\times ${c}$.`], solution: `$N = ${a} + ${k} \\times ${b} = ${N}$, puis la Tortue reçoit « fini » et dit $${N} \\times ${c} = ${N * c}$.` };
    }
    if (r0 >= 0.8 && r0 < 0.9) { // reconnaître la nature d'un bloc
      const L = String.fromCharCode(97 + rand(0, 25)), n1 = rand(2, 12), cat = rand(0, 3);
      const B = [pick([{ c: "evt", t: `quand la touche [${L}] est pressée` }, { c: "evt", t: `quand je reçois [${pick(["départ", "gagné", "perdu", "niveau 2"])}]` }, { c: "evt", t: "quand ce lutin est cliqué" }]),
        pick([{ c: "var", t: `mettre [${pick(["score", "vies", "N", "compteur"])}] à [${n1}]` }, { c: "var", t: `ajouter [${n1}] à [${pick(["score", "vies", "N", "compteur"])}]` }]),
        pick([{ rep: n1, corps: [{ c: "mvt", t: `avancer de [${n1 * 5}] pas` }] }, { jusqua: `${pick(["score", "N", "x"])} > ${n1 * 10}`, corps: [{ c: "mvt", t: "avancer de [10] pas" }] }]),
        { si: `${pick(["réponse", "score", "N"])} ${pick([">", "<", "="])} ${n1}`, alors: [{ c: "dire", t: pick(["dire [Bravo !]", "dire [Perdu !]", "dire [Encore !]"]) }] }][cat];
      const noms = ["un événement", "une instruction sur une variable", "une boucle", "une instruction conditionnelle"], { choix, attendu } = melange(noms[cat], noms.filter((z, i) => i !== cat));
      return { enonce: "Ce bloc Scratch est :", figure: blocs4([B]), mode: "choix", choix, attendu,
        aides: ["Événement : « quand … » (il déclenche un script).", "Variable : « mettre … à », « ajouter … à ». Boucle : « répéter ».", "Instruction conditionnelle : « si … alors »."], solution: `C'est ${noms[cat]}.` };
    }
    if (r0 < 0.35) {
      const s0 = rand(0, 10), k = rand(2, 9), j = rand(1, 5), p = rand(2, 9), q = rand(1, 6), r = s0 + p * k - q * j;
      const prog = blocs4([DRAP4, { c: "var", t: `mettre [score] à [${s0}]` }, { c: "evt", t: "quand ce lutin est cliqué" }, { c: "var", t: `ajouter [${k}] à [score]` }, { c: "evt", t: "quand la touche espace est pressée" }, { c: "var", t: `ajouter [-${j}] à [score]` }]);
      return { enonce: `Ces trois scripts appartiennent au même lutin. On clique sur le drapeau, puis on clique $${p}$ fois sur le lutin et on appuie $${q}$ fois sur la touche espace. Que vaut la variable score ?`, figure: prog, mode: "nombre", prefixe: "score =", attendu: r,
        erreurs: [{ valeur: s0 + p * k, message: "La touche espace déclenche aussi un script : chaque appui enlève des points." }, { valeur: p * k - q * j, message: `Au départ, le drapeau met le score à $${s0}$.` }],
        aides: ["Chaque script démarre quand son événement se produit (drapeau, clic, touche).", `Chaque clic ajoute $${k}$ ; chaque appui sur espace enlève $${j}$.`, `$${s0} + ${p} \\times ${k} - ${q} \\times ${j}$.`],
        solution: `score $= ${s0} + ${p} \\times ${k} - ${q} \\times ${j} = ${r}$.` };
    }
    const Q = pick([
      ["Dans Scratch, le bloc « quand la touche espace est pressée » est :", "un événement qui déclenche un script", ["une boucle", "une variable", "une condition"]],
      ["Une variable informatique sert à :", "stocker une valeur qui peut changer", ["répéter des instructions", "tester une condition", "déplacer le lutin"]],
      ["Le bloc « répéter jusqu'à [N > 10] » répète les instructions :", "tant que $N > 10$ est faux", ["tant que $N > 10$ est vrai", "exactement $10$ fois", "une seule fois"]],
      ["Dans « si [réponse > 5] alors … sinon … », si on répond $5$ :", "ce sont les instructions de « sinon » qui s'exécutent", ["ce sont les instructions de « alors » qui s'exécutent", "les deux parties s'exécutent", "rien ne s'exécute"]],
      ["« mettre [A] à [A + 1] » :", "augmente de $1$ la valeur de $A$", ["met $A$ à $1$", "teste si $A$ vaut $A + 1$", "ne change rien"]],
      ["Pour qu'un lutin envoie une information à un autre lutin, on utilise :", "« envoyer à tous [message] » et « quand je reçois [message] »", ["une boucle « répéter »", "« demander … et attendre »", "« mettre … à »"]],
      ["Pour tester si un nombre $N$ est pair dans Scratch, on peut utiliser la condition :", "« $N$ modulo $2$ $= 0$ »", ["« $N / 2 = 0$ »", "« $N * 2 = 0$ »", "« $N - 2 = 0$ »"]],
      ["Deux scripts commencent par « quand le drapeau est cliqué ». Quand on clique sur le drapeau :", "les deux scripts démarrent en même temps", ["seul le premier démarre", "seul le second démarre", "aucun ne démarre"]]
    ]);
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu, aides: ["Un événement (drapeau, touche, clic, message reçu) déclenche un script.", "Une variable garde une valeur ; une condition est vraie ou fausse ; une boucle répète.", "Relis le rôle de chaque type de bloc dans le cours."], solution: `Réponse : ${Q[1]}.` };
  };

  FIGURES["in4-cours-variable"] = () => blocs4([DRAP4, { c: "var", t: "mettre [A] à [4]" }, { c: "var", t: "mettre [B] à [A + 3]" }, { c: "var", t: "mettre [A] à [B * 2]" }, { c: "dire", t: "dire [A]" }]);
  FIGURES["in4-cours-si"] = () => blocs4([DRAP4, { c: "ent", t: "demander [Choisis un nombre] et attendre" }, { si: "réponse > 10", alors: [{ c: "dire", t: "dire [réponse * 2]" }], sinon: [{ c: "dire", t: "dire [réponse + 5]" }] }]);
  FIGURES["in4-cours-boucle"] = () => blocs4([DRAP4, { c: "var", t: "mettre [N] à [3]" }, { jusqua: "N > 20", corps: [{ c: "var", t: "mettre [N] à [N * 2]" }] }, { c: "dire", t: "dire [N]" }]);
  FIGURES["in4-qcm-score"] = () => blocs4([DRAP4, { c: "var", t: "mettre [score] à [0]" }, { c: "evt", t: "quand ce lutin est cliqué" }, { c: "var", t: "ajouter [2] à [score]" }]);
  FIGURES["in4-qcm-polygone"] = () => blocs4([DRAP4, { c: "stylo", t: "stylo en position d'écriture" }, { rep: 6, corps: [{ c: "mvt", t: "avancer de [50] pas" }, { c: "mvt", t: "tourner ↻ de [60] degrés" }] }]);
  FIGURES["in4-qcm-message"] = () => blocs4([DRAP4, { c: "var", t: "mettre [N] à [5]" }, { rep: 3, corps: [{ c: "var", t: "ajouter [4] à [N]" }] }, { c: "evt", t: "envoyer à tous [fini]" }, { c: "evt", t: "quand je reçois [fini]" }, { c: "dire", t: "dire [N * 2]" }]);
  FIGURES["in4-qcm-si"] = () => blocs4([DRAP4, { c: "ent", t: "demander [Ton âge ?] et attendre" }, { si: "réponse < 14", alors: [{ c: "dire", t: "dire [Tarif enfant]" }], sinon: [{ c: "dire", t: "dire [Tarif adulte]" }] }]);

  /* Une « erreur connue » ne doit jamais coïncider avec la bonne réponse */
  Object.keys(GEN).filter((k) => /^(dp4|rx4|py4|fq4|pq4|es4|pw4|th4|lc4|pb4|cs4|tl4|eq4|sx4|in4)-/.test(k)).forEach((k) => {
    const g = GEN[k];
    GEN[k] = (i) => {
      const q = g(i);
      if (q.erreurs) q.erreurs = q.erreurs.filter((e) => Math.abs(e.valeur - q.attendu) >= (q.tolerance || 1e-9));
      // équations, statistiques : une « erreur » non décimale (comme 13/7) ne serait jamais saisie et bloquerait le passage en QCM
      if (q.erreurs && /^(eq4|sx4)-/.test(k)) q.erreurs = q.erreurs.filter((e) => isFinite(e.valeur) && Math.abs(e.valeur * 100 - Math.round(e.valeur * 100)) < 1e-6);
      return q;
    };
  });
})();
