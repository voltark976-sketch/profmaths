/*
  Exercices du collège, classe de 4e (programme du cycle 4 de 2020, en vigueur en 4e en 2026-2027).
  Ce fichier se charge après assets/exercices-college.js et reprend ses outils (window.PM_EXO.college).
  Mêmes règles : chaque générateur fabrique une question avec des nombres tirés au hasard, la réponse
  attendue, trois indices progressifs et la solution rédigée.
  Préfixes : dp4-, rx4-, py4-.
*/
(function () {
  "use strict";
  const { GEN, FIGURES, shuffle } = window.PM_EXO;
  const { rand, pick, melange, nb, Dc, tD, mulD, addD, fr, frNet, pgcd, CONSIGNE_FR, FRAC_APPROX, diviseurs, geo, blocs } = window.PM_EXO.college;
  const approx = (v) => (Number.isInteger(v * 1000) ? [] : FRAC_APPROX(v));
  const arr = (x, k) => Math.round(x * 10 ** k) / 10 ** k;
  const rel = (x) => (x < 0 ? `-${nb(-x)}` : nb(x));
  const relP = (x) => (x < 0 ? `(${rel(x)})` : rel(x));

  /* =====================================================================
     Chapitre 1 : divisibilité et nombres premiers (dp4-)
     ===================================================================== */
  const PREMIERS = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
  const estPremier = (n) => { if (n < 2) return false; for (let k = 2; k * k <= n; k++) if (n % k === 0) return false; return true; };
  const plusPetitDiv = (n) => { for (let k = 2; k * k <= n; k++) if (n % k === 0) return k; return n; };
  const decompo = (n) => { const f = []; let m = n, p = 2; while (m > 1) { while (m % p === 0) { f.push(p); m /= p; } p++; } return f; };
  const decompoTex = (n) => { const f = decompo(n), c = {}; f.forEach((p) => { c[p] = (c[p] || 0) + 1; }); return Object.keys(c).map((p) => (c[p] > 1 ? `${p}^{${c[p]}}` : p)).join(" \\times "); };
  const composeTrompeur = () => pick([51, 57, 87, 91, 119, 133, 143, 161, 169, 187, 203, 209, 217, 221, 247, 253, 289, 299, 323, 341, 361, 377, 391, 403, 437, 451, 481, 493, 511, 529, 551, 559, 589, 611, 629, 667, 689, 697, 703, 713, 731, 767, 779, 793, 799, 817, 841, 851, 871, 893, 899, 901, 923, 943, 949, 961, 989]);

  GEN["dp4-premier"] = function () {
    const t = rand(0, 1);
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
      return { enonce: `Quelle est la décomposition de $${n}$ en produit de facteurs premiers ?`, mode: "choix", choix, attendu,
        aides: ["Tous les facteurs doivent être des nombres **premiers**.", `Divise $${n}$ par $2$ tant que c'est possible, puis par $3$, $5$, $7$…`, "Vérifie que le produit redonne bien le nombre."], solution: `$${f.reduce((acc, p) => { const m = acc[acc.length - 1] / p; acc.push(m); return acc; }, [n]).slice(0, -1).map((m, i) => `${m} = ${f[i]} \\times ${m / f[i]}`).join(" \\; ; \\; ")}$. Donc $${n} = ${decompoTex(n)}$.` };
    }
    if (t === 1) return { enonce: `Quel est le plus grand facteur premier de $${n}$ ?`, mode: "nombre", prefixe: "Facteur :", attendu: f[f.length - 1],
      aides: ["Décompose le nombre en produit de facteurs premiers.", `Commence par diviser par le plus petit nombre premier possible : $${f[0]}$.`, `$${n} = ${decompoTex(n)}$.`], solution: `$${n} = ${decompoTex(n)}$ : le plus grand facteur premier est $${f[f.length - 1]}$.` };
    const p = pick([...new Set(f)]), k = f.filter((q) => q === p).length;
    return { enonce: `Dans la décomposition de $${n}$ en produit de facteurs premiers, combien de fois apparaît le facteur $${p}$ ?`, mode: "nombre", prefixe: "Nombre de fois :", attendu: k,
      aides: [`Divise $${n}$ par $${p}$ autant de fois que possible.`, "Compte les divisions qui tombent juste.", `$${n} = ${decompoTex(n)}$.`], solution: `$${n} = ${decompoTex(n)}$ : le facteur $${p}$ apparaît $${k}$ fois.` };
  };

  GEN["dp4-irreductible"] = function () {
    for (;;) {
      const a = rand(1, 15), b = rand(2, 16), k = pick([2, 3, 4, 5, 6, 7, 8, 9, 12, 14, 15]);
      if (pgcd(a, b) > 1 || a === b) continue;
      const N = a * k, D = b * k;
      const t = rand(0, 1);
      if (t === 0) return { enonce: `Écris $${fr(N, D)}$ sous forme irréductible. Donne le numérateur de la fraction irréductible.`, mode: "nombre", prefixe: "Numérateur :", attendu: a,
        aides: ["Une fraction est irréductible quand son numérateur et son dénominateur n'ont plus de diviseur commun autre que $1$.", `Décompose : $${N} = ${decompoTex(N)}$ et $${D} = ${decompoTex(D)}$.`, "Simplifie par tous les facteurs communs."], solution: `$${fr(N, D)} = \\dfrac{${a} \\times ${k}}{${b} \\times ${k}} = ${fr(a, b)}$ : le numérateur est $${a}$.` };
      const bonne = `$${fr(a, b)}$`, autres = [k % 2 === 0 && (N / 2) % 1 === 0 ? `$${fr(N / 2, D / 2)}$` : `$${fr(a + 1, b)}$`, `$${fr(a, b + 1)}$`, `$${fr(N - 1, D - 1)}$`, `$${fr(b, a)}$`].filter((x) => x !== bonne);
      const { choix, attendu } = melange(bonne, autres);
      return { enonce: `Quelle est la forme irréductible de $${fr(N, D)}$ ?`, mode: "choix", choix, attendu,
        aides: ["Cherche les facteurs premiers communs au numérateur et au dénominateur.", `$${N} = ${decompoTex(N)}$ et $${D} = ${decompoTex(D)}$.`, "Une fraction simplifiée « à moitié » n'est pas encore irréductible."], solution: `$${fr(N, D)} = ${fr(a, b)}$ ; $${a}$ et $${b}$ n'ont plus de diviseur commun autre que $1$.` };
    }
  };

  GEN["dp4-problemes"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      const [a, b] = pick([[12, 18], [8, 12], [10, 15], [6, 8], [9, 12], [14, 21], [12, 20], [15, 25], [16, 24], [18, 24], [9, 15], [20, 30], [21, 28], [24, 36], [10, 12], [6, 15], [25, 40], [30, 42]]), m = (a * b) / pgcd(a, b);
      return { enonce: `Deux roues dentées s'engrènent : l'une a $${a}$ dents, l'autre $${b}$. Une dent de chaque roue est marquée et les deux marques sont face à face. Au bout de combien de dents passées les deux marques se retrouvent-elles face à face pour la première fois ?`, mode: "nombre", prefixe: "Dents :", attendu: m,
        erreurs: m !== a * b ? [{ valeur: a * b, message: "C'est un multiple commun, mais pas le plus petit." }] : [],
        aides: [`Il faut un nombre de dents qui soit à la fois un multiple de $${a}$ et de $${b}$.`, `Multiples de $${b}$ : $${b}$ ; $${2 * b}$ ; $${3 * b}$ ; …`, `Cherche le premier qui est aussi un multiple de $${a}$.`], solution: `Le plus petit multiple commun de $${a}$ et $${b}$ est $${m}$ : après $${m}$ dents, la première roue a fait $${m / a}$ tours et la seconde $${m / b}$ tours.` };
    }
    if (t === 1) {
      const [g, f] = pick([[24, 36], [18, 30], [20, 32], [28, 42], [30, 45], [36, 48], [16, 40], [27, 45], [42, 56], [12, 30], [24, 40], [35, 49], [32, 48], [45, 60], [26, 39], [33, 44]]), d = pgcd(g, f);
      return { enonce: `Pour un tournoi, on veut répartir $${g}$ filles et $${f}$ garçons en équipes, chaque équipe ayant le même nombre de filles et le même nombre de garçons, sans personne de côté. Quel est le plus grand nombre d'équipes possible ?`, mode: "nombre", prefixe: "Équipes :", attendu: d,
        aides: [`Le nombre d'équipes doit diviser $${g}$ et $${f}$.`, `Décompose : $${g} = ${decompoTex(g)}$ et $${f} = ${decompoTex(f)}$.`, "Prends le produit des facteurs communs."], solution: `Le plus grand diviseur commun de $${g}$ et $${f}$ est $${d}$ : $${d}$ équipes de $${g / d}$ filles et $${f / d}$ garçons.` };
    }
    const n = pick([48, 54, 56, 60, 64, 66, 70, 72, 75, 78, 80, 84, 88, 90, 96, 98, 100, 104, 108, 112, 120, 126, 132, 135, 140, 144, 150, 160, 168, 180, 196, 200]), D = diviseurs(n);
    return { enonce: `Combien le nombre $${n}$ a-t-il de diviseurs ?`, mode: "nombre", prefixe: "Diviseurs :", attendu: D.length,
      aides: ["Cherche les diviseurs par paires : $1 \\times " + n + "$, $2 \\times " + n / 2 + "$…", `La décomposition $${n} = ${decompoTex(n)}$ aide à les trouver tous.`, "N'oublie pas $1$ et le nombre lui-même."], solution: `Les diviseurs de $${n}$ sont $${D.join(" \\; ; \\; ")}$ : il y en a $${D.length}$.` };
  };

  /* =====================================================================
     Chapitre 2 : multiplier et diviser des relatifs (rx4-)
     ===================================================================== */
  const X4 = "\\times";
  const tire4 = (dec) => (dec ? rand(2, 30) / 10 : rand(2, 15)) * (Math.random() < 0.55 ? -1 : 1);

  GEN["rx4-produit"] = function () {
    const dec = Math.random() < 0.3, a = tire4(dec), b = tire4(false), p = arr(a * b, 4);
    return { enonce: `Calcule : $${relP(a)} ${X4} ${relP(b)}$`, mode: "nombre", prefixe: "Résultat :", attendu: p,
      erreurs: [{ valeur: -p, message: "Attention au signe : deux nombres de même signe donnent un produit positif, de signes contraires un produit négatif." }],
      aides: ["On multiplie les distances à zéro.", "Règle des signes : même signe → positif ; signes contraires → négatif.", `$${nb(Math.abs(a))} ${X4} ${nb(Math.abs(b))} = ${nb(Math.abs(p))}$.`],
      solution: `$${nb(Math.abs(a))} ${X4} ${nb(Math.abs(b))} = ${nb(Math.abs(p))}$ ; ${(a < 0) === (b < 0) ? "même signe : le produit est positif" : "signes contraires : le produit est négatif"}. Résultat : $${rel(p)}$.` };
  };

  GEN["rx4-quotient"] = function () {
    const q = tire4(Math.random() < 0.25), b = tire4(false), a = arr(q * b, 4);
    return { enonce: `Calcule : $${relP(a)} \\div ${relP(b)}$`, mode: "nombre", prefixe: "Résultat :", attendu: q,
      erreurs: [{ valeur: -q, message: "Même règle des signes que pour la multiplication." }],
      aides: ["On divise les distances à zéro.", "Même signe → positif ; signes contraires → négatif.", `$${nb(Math.abs(a))} \\div ${nb(Math.abs(b))} = ${nb(Math.abs(q))}$.`],
      solution: `$${nb(Math.abs(a))} \\div ${nb(Math.abs(b))} = ${nb(Math.abs(q))}$ ; ${(a < 0) === (b < 0) ? "même signe : positif" : "signes contraires : négatif"}. Résultat : $${rel(q)}$.` };
  };

  GEN["rx4-signe"] = function () {
    const n = rand(3, 7), F = Array.from({ length: n }, () => tire4(Math.random() < 0.3)), nul = Math.random() < 0.12;
    if (nul) F[rand(0, n - 1)] = 0;
    const neg = F.filter((x) => x < 0).length, rep = nul ? 2 : neg % 2 ? 1 : 0;
    return { enonce: `Sans calculer, donne le signe du produit $${F.map(relP).join(` ${X4} `)}$.`, mode: "choix", choix: ["positif", "négatif", "nul"], attendu: rep,
      aides: ["Si un facteur est nul, le produit est nul.", "Sinon, compte les facteurs négatifs.", "Nombre pair de facteurs négatifs : positif ; nombre impair : négatif."],
      solution: nul ? "Un des facteurs est $0$ : le produit est nul." : `Il y a $${neg}$ facteur${neg > 1 ? "s" : ""} négatif${neg > 1 ? "s" : ""} : c'est un nombre ${neg % 2 ? "impair" : "pair"}, donc le produit est ${neg % 2 ? "négatif" : "positif"}.` };
  };

  GEN["rx4-priorites"] = function () {
    for (let e = 0; e < 100; e++) {
      const a = rand(-15, 15), b = rand(-9, 9), c = rand(-9, 9), d = rand(2, 6), t = rand(0, 5);
      if (!a || !b || !c) continue;
      let tex, v, etapes, faux = null;
      if (t === 0) { tex = `${rel(a)} + ${relP(b)} ${X4} ${relP(c)}`; v = a + b * c; etapes = `${rel(a)} + ${relP(b * c)}`; faux = (a + b) * c; }
      if (t === 1) { tex = `(${rel(a)} - ${relP(b)}) ${X4} ${relP(c)}`; v = (a - b) * c; etapes = `${relP(a - b)} ${X4} ${relP(c)}`; faux = a - b * c; }
      if (t === 2) { tex = `${rel(a)} - ${relP(b)} ${X4} ${relP(c)}`; v = a - b * c; etapes = `${rel(a)} - ${relP(b * c)}`; faux = (a - b) * c; }
      if (t === 3) { const k = b * d; tex = `${relP(k)} \\div ${relP(b)} - ${relP(c)}`; v = d - c; etapes = `${rel(d)} - ${relP(c)}`; faux = -d - c; }
      if (t === 4) { tex = `${relP(b)} ${X4} ${relP(c)} ${X4} ${relP(-d)}`; v = -b * c * d; etapes = `${relP(b * c)} ${X4} ${relP(-d)}`; faux = b * c * d; }
      if (t === 5) { tex = `${relP(b)}^2 - ${d} ${X4} ${relP(c)}`; v = b * b - d * c; etapes = `${b * b} - ${relP(d * c)}`; faux = -(b * b) - d * c; }
      if (faux === v) faux = null;
      return { enonce: `Calcule : $${tex}$`, mode: "nombre", prefixe: "Résultat :", attendu: v,
        erreurs: faux != null ? [{ valeur: faux, message: t === 5 ? "$(-a)^2$ est positif : c'est $(-a) \\times (-a)$." : "Respecte les priorités et la règle des signes à chaque étape." }] : [],
        aides: ["Mêmes priorités qu'avec les nombres positifs : parenthèses, puissances, multiplications et divisions, puis additions et soustractions.", "À chaque multiplication ou division, applique la règle des signes.", `Première étape : $${tex} = ${etapes}$.`],
        solution: `$${tex} = ${etapes} = ${rel(v)}$.` };
    }
  };

  /* =====================================================================
     Chapitre 3 : théorème de Pythagore (py4-)
     ===================================================================== */
  const NOMS3_4 = [["A", "B", "C"], ["E", "F", "G"], ["M", "N", "P"], ["R", "S", "T"], ["I", "J", "K"], ["D", "E", "F"]];
  // Triangle rectangle en R (sommet de l'angle droit), côtés étiquetés : [lab RP1, lab RP2, lab hypoténuse]
  function figureRectangle4(noms, labs) {
    const [R, P1, P2] = noms, pts = { [R]: [70, 165], [P1]: [270, 165], [P2]: [70, 40] };
    let s = geo({ W: 320, H: 195, pts, segs: [[R, P1], [P1, P2], [P2, R]], droitAngle: [[P1, R, P2]], decal: { [R]: [-14, 6], [P1]: [6, 6], [P2]: [-14, 0] }, aria: `Triangle ${noms.join("")} rectangle en ${R}` });
    const t = (x, y, txt) => `<text class="g-mesure" x="${x}" y="${y}" text-anchor="middle">${txt}</text>`;
    s = s.replace("</svg>", t(170, 185, labs[0]) + t(48, 106, labs[1]) + t(186, 96, labs[2]) + "</svg>");
    return s;
  }
  const TRIPLES = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20], [20, 21, 29], [9, 40, 41], [15, 20, 25], [10, 24, 26], [12, 35, 37], [1.5, 2, 2.5], [2.4, 3.2, 4], [0.9, 1.2, 1.5], [4.5, 6, 7.5]];
  const lab = (x) => String(x).replace(".", ",") + " cm";
  FIGURES["py4-triangle"] = () => figureRectangle4(["A", "B", "C"], ["4 cm", "3 cm", "?"]);

  GEN["py4-hypotenuse"] = function () {
    const N = pick(NOMS3_4), [R, P1, P2] = N, exact = Math.random() < 0.5;
    let a, b, c, v;
    if (exact) { [a, b, c] = pick(TRIPLES); if (Math.random() < 0.5) [a, b] = [b, a]; v = c; } else { a = rand(2, 15); b = rand(2, 15); c = Math.sqrt(a * a + b * b); v = arr(c, 1); if (Number.isInteger(c)) return GEN["py4-hypotenuse"](); }
    return { enonce: `Le triangle $${R}${P1}${P2}$ est rectangle en $${R}$ avec $${R}${P1} = ${nb(a)}$ cm et $${R}${P2} = ${nb(b)}$ cm. Calcule $${P1}${P2}$${exact ? "" : ", arrondi au dixième"}.`, figure: figureRectangle4(N, [lab(a), lab(b), "?"]), mode: "nombre", prefixe: `$${P1}${P2} ${exact ? "=" : "\\approx"}$`, suffixe: "cm", attendu: v,
      erreurs: [{ valeur: arr(a + b, 4), message: "On n'additionne pas les longueurs : on additionne leurs **carrés**." }, { valeur: arr(a * a + b * b, 4), message: `Ça, c'est $${P1}${P2}^2$. Il faut encore prendre la racine carrée.` }],
      aides: [`$[${P1}${P2}]$ est l'hypoténuse (le côté opposé à l'angle droit).`, `Théorème de Pythagore : $${P1}${P2}^2 = ${R}${P1}^2 + ${R}${P2}^2$.`, `$${P1}${P2}^2 = ${nb(a)}^2 + ${nb(b)}^2 = ${nb(arr(a * a + b * b, 4))}$.`],
      solution: `Le triangle est rectangle en $${R}$, donc d'après le théorème de Pythagore : $${P1}${P2}^2 = ${nb(a)}^2 + ${nb(b)}^2 = ${nb(arr(a * a, 4))} + ${nb(arr(b * b, 4))} = ${nb(arr(a * a + b * b, 4))}$. Donc $${P1}${P2} = \\sqrt{${nb(arr(a * a + b * b, 4))}} ${exact ? "=" : "\\approx"} ${nb(v)}$ cm.` };
  };

  GEN["py4-cote"] = function () {
    const N = pick(NOMS3_4), [R, P1, P2] = N, exact = Math.random() < 0.5;
    let a, b, c, v;
    if (exact) { [a, b, c] = pick(TRIPLES); if (Math.random() < 0.5) [a, b] = [b, a]; v = b; } else { a = rand(2, 12); c = a + rand(1, 10); b = Math.sqrt(c * c - a * a); v = arr(b, 1); if (Number.isInteger(b)) return GEN["py4-cote"](); }
    return { enonce: `Le triangle $${R}${P1}${P2}$ est rectangle en $${R}$ avec $${R}${P1} = ${nb(a)}$ cm et $${P1}${P2} = ${nb(c)}$ cm. Calcule $${R}${P2}$${exact ? "" : ", arrondi au dixième"}.`, figure: figureRectangle4(N, [lab(a), "?", lab(c)]), mode: "nombre", prefixe: `$${R}${P2} ${exact ? "=" : "\\approx"}$`, suffixe: "cm", attendu: v,
      erreurs: [{ valeur: arr(Math.sqrt(a * a + c * c), 1), message: `$[${P1}${P2}]$ est l'hypoténuse : il faut **soustraire** $${R}${P1}^2$ de $${P1}${P2}^2$.` }, { valeur: arr(c * c - a * a, 4), message: `Ça, c'est $${R}${P2}^2$. Prends la racine carrée.` }],
      aides: [`L'hypoténuse est $[${P1}${P2}]$ : $${P1}${P2}^2 = ${R}${P1}^2 + ${R}${P2}^2$.`, `Donc $${R}${P2}^2 = ${P1}${P2}^2 - ${R}${P1}^2$.`, `$${R}${P2}^2 = ${nb(c)}^2 - ${nb(a)}^2 = ${nb(arr(c * c - a * a, 4))}$.`],
      solution: `D'après le théorème de Pythagore, $${P1}${P2}^2 = ${R}${P1}^2 + ${R}${P2}^2$, donc $${R}${P2}^2 = ${nb(c)}^2 - ${nb(a)}^2 = ${nb(arr(c * c, 4))} - ${nb(arr(a * a, 4))} = ${nb(arr(c * c - a * a, 4))}$ et $${R}${P2} = \\sqrt{${nb(arr(c * c - a * a, 4))}} ${exact ? "=" : "\\approx"} ${nb(v)}$ cm.` };
  };

  GEN["py4-reciproque"] = function () {
    const N = pick(NOMS3_4), droit = Math.random() < 0.55;
    let [a, b, c] = pick(TRIPLES); if (!droit) c = arr(c + pick([-1, 1]) * (c > 5 ? 1 : 0.1), 4);
    // côtés : [R P1] = a, [R P2] = b, [P1 P2] = c, présentés dans le désordre
    const [R, P1, P2] = shuffle(N.slice()), cotes = shuffle([[`${R}${P1}`, a], [`${R}${P2}`, b], [`${P1}${P2}`, c]]);
    const choix = [`Oui, il est rectangle en $${R}$`, "Non, il n'est pas rectangle", `Oui, il est rectangle en $${P1}$`];
    return { enonce: `Le triangle $${N.join("")}$ a pour côtés ${cotes.map(([n, v]) => `$${n} = ${nb(v)}$ cm`).join(", ")}. Est-il rectangle ?`, mode: "choix", choix, attendu: droit ? 0 : 1,
      aides: ["Repère le plus grand côté.", "Compare le carré du plus grand côté avec la somme des carrés des deux autres.", "Égalité : rectangle (l'angle droit est en face du plus grand côté). Sinon : pas rectangle."],
      solution: `Le plus grand côté est $[${P1}${P2}]$ : $${P1}${P2}^2 = ${nb(arr(c * c, 4))}$ et $${R}${P1}^2 + ${R}${P2}^2 = ${nb(arr(a * a, 4))} + ${nb(arr(b * b, 4))} = ${nb(arr(a * a + b * b, 4))}$. ${droit ? `Les deux résultats sont égaux : d'après la réciproque du théorème de Pythagore, le triangle est rectangle en $${R}$.` : "Les résultats sont différents : le triangle n'est pas rectangle (sinon l'égalité de Pythagore serait vraie)."}` };
  };

  GEN["py4-racine"] = function () {
    const t = rand(0, 2);
    if (t === 0) { const a = rand(1, 15); return { enonce: `Calcule $\\sqrt{${a * a}}$.`, mode: "nombre", prefixe: "Résultat :", attendu: a, erreurs: [{ valeur: (a * a) / 2, message: "La racine carrée n'est pas la moitié : c'est le nombre positif dont le carré vaut " + a * a + "." }],
      aides: ["$\\sqrt{a}$ est le nombre positif dont le carré est $a$.", "Cherche un nombre qui, multiplié par lui-même, donne ce résultat.", `$${a - 1}^2 = ${(a - 1) ** 2}$.`], solution: `$${a}^2 = ${a * a}$, donc $\\sqrt{${a * a}} = ${a}$.` }; }
    if (t === 1) { const n = rand(2, 200); if (Number.isInteger(Math.sqrt(n))) return GEN["py4-racine"]();
      return { enonce: `Donne la valeur de $\\sqrt{${n}}$ arrondie au dixième.`, mode: "nombre", prefixe: "Valeur :", attendu: arr(Math.sqrt(n), 1),
        aides: ["Utilise la touche $\\sqrt{\\;}$ de la calculatrice.", `$\\sqrt{${n}} \\approx ${nb(arr(Math.sqrt(n), 4))}$.`, "Arrondis au dixième : regarde le chiffre des centièmes."], solution: `$\\sqrt{${n}} \\approx ${nb(arr(Math.sqrt(n), 4))}$, donc environ $${nb(arr(Math.sqrt(n), 1))}$.` }; }
    const c = rand(2, 20), A = c * c;
    return { enonce: `Un carré a une aire de $${A}$ cm². Quelle est la longueur de son côté ?`, mode: "nombre", prefixe: "Côté :", suffixe: "cm", attendu: c, erreurs: [{ valeur: A / 4, message: "L'aire d'un carré est côté × côté, pas 4 × côté." }],
      aides: ["Aire $= c \\times c = c^2$.", `$c^2 = ${A}$.`, `$c = \\sqrt{${A}}$.`], solution: `$c^2 = ${A}$ donc $c = \\sqrt{${A}} = ${c}$ cm.` };
  };

  GEN["py4-problemes"] = function () {
    const t = rand(0, 2);
    if (t === 0) { const h = rand(30, 60) / 10, d = rand(8, 20) / 10, L = Math.sqrt(h * h + d * d);
      return { enonce: `Une échelle est posée contre un mur vertical. Son pied est à $${nb(d)}$ m du mur et elle touche le mur à $${nb(h)}$ m de hauteur. Quelle est la longueur de l'échelle, arrondie au centimètre ?`, mode: "nombre", prefixe: "Longueur :", suffixe: "m", attendu: arr(L, 2),
        aides: ["Le mur et le sol forment un angle droit : l'échelle est l'hypoténuse.", `$L^2 = ${nb(h)}^2 + ${nb(d)}^2$.`, `$L^2 = ${nb(arr(h * h + d * d, 4))}$.`], solution: `$L^2 = ${nb(h)}^2 + ${nb(d)}^2 = ${nb(arr(h * h + d * d, 4))}$, donc $L \\approx ${nb(arr(L, 2))}$ m.` }; }
    if (t === 1) { const L = rand(5, 30), l = rand(3, L - 1), D = Math.sqrt(L * L + l * l);
      return { enonce: `Un terrain de football à cinq a la forme d'un rectangle de $${L}$ m sur $${l}$ m. Quelle est la longueur de sa diagonale, arrondie au dixième de mètre ?`, mode: "nombre", prefixe: "Diagonale :", suffixe: "m", attendu: arr(D, 1),
        aides: ["La diagonale partage le rectangle en deux triangles rectangles.", `Diagonale$^2 = ${L}^2 + ${l}^2$.`, `$= ${L * L + l * l}$.`], solution: `$D^2 = ${L}^2 + ${l}^2 = ${L * L + l * l}$, donc $D \\approx ${nb(arr(D, 1))}$ m.` }; }
    const [a, b, c] = pick(TRIPLES.filter((x) => Number.isInteger(x[0]))), k = rand(1, 3);
    return { enonce: `Un menuisier veut vérifier qu'un angle est droit. Il mesure $${a * k * 10}$ cm sur un côté, $${b * k * 10}$ cm sur l'autre, et $${c * k * 10}$ cm entre les deux marques. Quelle est la valeur de $${a * k * 10}^2 + ${b * k * 10}^2$ ?`, mode: "nombre", prefixe: "Résultat :", attendu: (a * k * 10) ** 2 + (b * k * 10) ** 2,
      aides: ["Calcule chaque carré.", `$${a * k * 10}^2 = ${(a * k * 10) ** 2}$.`, `Compare ensuite avec $${c * k * 10}^2 = ${(c * k * 10) ** 2}$.`], solution: `$${(a * k * 10) ** 2} + ${(b * k * 10) ** 2} = ${(a * k * 10) ** 2 + (b * k * 10) ** 2} = ${c * k * 10}^2$ : d'après la réciproque du théorème de Pythagore, l'angle est droit.` };
  };

  /* Une « erreur connue » ne doit jamais coïncider avec la bonne réponse */
  Object.keys(GEN).filter((k) => /^(dp4|rx4|py4)-/.test(k)).forEach((k) => {
    const g = GEN[k];
    GEN[k] = (i) => {
      const q = g(i);
      if (q.erreurs) q.erreurs = q.erreurs.filter((e) => Math.abs(e.valeur - q.attendu) >= (q.tolerance || 1e-9));
      return q;
    };
  });
})();
