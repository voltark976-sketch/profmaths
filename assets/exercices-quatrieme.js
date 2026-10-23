/*
  Exercices du collège, classe de 4e (programme du cycle 4 de 2020, en vigueur en 4e en 2026-2027).
  Ce fichier se charge après assets/exercices-college.js et reprend ses outils (window.PM_EXO.college).
  Mêmes règles : chaque générateur fabrique une question avec des nombres tirés au hasard, la réponse
  attendue, trois indices progressifs et la solution rédigée.
  Préfixes : dp4-, rx4-, py4-, fq4-, pq4-.
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

  /* =====================================================================
     Chapitre 4 : calculer avec des fractions (fq4-)
     ===================================================================== */
  const ppcm4 = (a, b) => (a * b) / pgcd(a, b);
  // fraction signée en KaTeX : -\dfrac{a}{b} si négative ; entier si dénominateur 1
  const frS = (n, d) => { if (d < 0) { n = -n; d = -d; } const g = pgcd(Math.abs(n), d); n /= g; d /= g; return d === 1 ? rel(n) : `${n < 0 ? "-" : ""}${fr(Math.abs(n), d)}`; };
  const frP = (n, d) => (n < 0 ? `\\left(${frS(n, d)}\\right)` : frS(n, d));
  const frBrut = (n, d) => `${n < 0 ? "-" : ""}${fr(Math.abs(n), d)}`;
  const tireFr = (neg) => { for (;;) { const d = rand(2, 9), n = rand(1, 2 * d) * (neg && Math.random() < 0.5 ? -1 : 1); if (pgcd(Math.abs(n), d) === 1 && Math.abs(n) !== d) return [n, d]; } };

  GEN["fq4-addsous"] = function () {
    const [a, b] = tireFr(true), [c, d] = tireFr(true), plus = Math.random() < 0.5; if (b === d && Math.random() < 0.7) return GEN["fq4-addsous"]();
    const L = ppcm4(b, d), N = a * (L / b) + (plus ? 1 : -1) * c * (L / d), v = N / L, s = plus ? "+" : "-";
    return { enonce: `Calcule $${frBrut(a, b)} ${s} ${frP(c, d)}$.${CONSIGNE_FR}`, mode: "nombre", prefixe: "Résultat :", attendu: v,
      erreurs: [{ valeur: (a + (plus ? c : -c)) / (b + d), message: "On n'additionne pas les dénominateurs : on réduit d'abord au même dénominateur." }, ...approx(v)],
      aides: ["Mets les deux fractions au même dénominateur.", `Dénominateur commun : $${L}$.`, "Calcule ensuite avec les numérateurs, en appliquant les règles des nombres relatifs."],
      solution: `$${frBrut(a, b)} ${s} ${frP(c, d)} = ${frBrut(a * (L / b), L)} ${s} ${frP(c * (L / d), L)} = ${frBrut(N, L)}${pgcd(Math.abs(N), L) > 1 ? ` = ${frS(N, L)}` : ""}$.` };
  };

  GEN["fq4-produit"] = function () {
    const t = rand(0, 2);
    if (t === 0) { const [a, b] = tireFr(true), [c, d] = tireFr(true), v = (a * c) / (b * d);
      return { enonce: `Calcule $${frBrut(a, b)} \\times ${frP(c, d)}$ et donne le résultat simplifié.${CONSIGNE_FR}`, mode: "nombre", prefixe: "Résultat :", attendu: v,
        erreurs: [{ valeur: (a * d) / (b * c), message: "Pour multiplier, on multiplie numérateur par numérateur et dénominateur par dénominateur (pas en croix)." }, ...approx(v)],
        aides: ["$\\dfrac{a}{b} \\times \\dfrac{c}{d} = \\dfrac{a \\times c}{b \\times d}$.", "On n'a pas besoin de dénominateur commun pour multiplier.", "Simplifie le résultat (tu peux simplifier avant de multiplier)."],
        solution: `$${frBrut(a, b)} \\times ${frP(c, d)} = ${frBrut(a * c, b * d)}${pgcd(Math.abs(a * c), b * d) > 1 ? ` = ${frS(a * c, b * d)}` : ""}$.` }; }
    if (t === 1) { const [a, b] = tireFr(false), k = rand(2, 12) * (Math.random() < 0.3 ? -1 : 1), v = (k * a) / b;
      return { enonce: `Calcule $${rel(k)} \\times ${fr(a, b)}$.${CONSIGNE_FR}`, mode: "nombre", prefixe: "Résultat :", attendu: v,
        erreurs: [{ valeur: (k * a) / (k * b), message: `On ne multiplie que le numérateur : $${rel(k)} = \\dfrac{${rel(k)}}{1}$.` }, ...approx(v)],
        aides: [`$${rel(k)} = \\dfrac{${rel(k)}}{1}$.`, "Multiplie les numérateurs entre eux et les dénominateurs entre eux.", "Simplifie si possible."], solution: `$${rel(k)} \\times ${fr(a, b)} = ${frBrut(k * a, b)}${pgcd(Math.abs(k * a), b) > 1 ? ` = ${frS(k * a, b)}` : ""}$.` }; }
    const [a, b] = tireFr(false), N = b * rand(2, 12);
    return { enonce: `Calcule $${fr(a, b)}$ de $${N}$ en utilisant une multiplication.`, mode: "nombre", prefixe: "Résultat :", attendu: (a * N) / b,
      aides: ["Prendre une fraction d'un nombre, c'est multiplier par cette fraction.", `$${fr(a, b)} \\times ${N}$.`, `$${N} \\div ${b} = ${N / b}$.`], solution: `$${fr(a, b)} \\times ${N} = \\dfrac{${a} \\times ${N}}{${b}} = ${(a * N) / b}$.` };
  };

  GEN["fq4-quotient"] = function () {
    const t = rand(0, 2);
    if (t === 0) { const [a, b] = tireFr(true);
      return { enonce: `Quel est l'inverse de $${frBrut(a, b)}$ ?${CONSIGNE_FR}`, mode: "nombre", prefixe: "Inverse :", attendu: b / a,
        erreurs: [{ valeur: -a / b, message: "Ça, c'est l'opposé. L'inverse est le nombre qui, multiplié par lui, donne $1$." }, ...approx(b / a)],
        aides: ["L'inverse de $x$ est le nombre $y$ tel que $x \\times y = 1$.", "L'inverse de $\\dfrac{a}{b}$ est $\\dfrac{b}{a}$.", "Un nombre et son inverse ont le même signe."], solution: `$${frBrut(a, b)} \\times ${frP(b * Math.sign(a), Math.abs(a))} = 1$ : l'inverse est $${frS(b, a)}$.` }; }
    const [a, b] = tireFr(true), [c, d] = tireFr(false), v = (a * d) / (b * c);
    return { enonce: `Calcule $${frBrut(a, b)} \\div ${fr(c, d)}$.${CONSIGNE_FR}`, mode: "nombre", prefixe: "Résultat :", attendu: v,
      erreurs: [{ valeur: (a * c) / (b * d), message: "Diviser, c'est multiplier par l'**inverse** : il faut retourner la deuxième fraction." }, ...approx(v)],
      aides: ["Diviser par un nombre non nul, c'est multiplier par son inverse.", `L'inverse de $${fr(c, d)}$ est $${fr(d, c)}$.`, `$${frBrut(a, b)} \\times ${fr(d, c)}$.`],
      solution: `$${frBrut(a, b)} \\div ${fr(c, d)} = ${frBrut(a, b)} \\times ${fr(d, c)} = ${frBrut(a * d, b * c)}${pgcd(Math.abs(a * d), b * c) > 1 ? ` = ${frS(a * d, b * c)}` : ""}$.` };
  };

  GEN["fq4-priorites"] = function () {
    const [a, b] = tireFr(false), [c, d] = tireFr(false), [e, f] = tireFr(false), t = rand(0, 1);
    if (t === 0) { const pn = c * e, pd = d * f, L = ppcm4(b, pd), N = a * (L / b) + pn * (L / pd), v = N / L;
      return { enonce: `Calcule $${fr(a, b)} + ${fr(c, d)} \\times ${fr(e, f)}$.${CONSIGNE_FR}`, mode: "nombre", prefixe: "Résultat :", attendu: v,
        erreurs: [{ valeur: (a / b + c / d) * (e / f), message: "La multiplication est prioritaire sur l'addition." }, ...approx(v)],
        aides: ["Priorité : la multiplication d'abord.", `$${fr(c, d)} \\times ${fr(e, f)} = ${fr(pn, pd)}$.`, "Puis additionne en réduisant au même dénominateur."],
        solution: `$${fr(c, d)} \\times ${fr(e, f)} = ${fr(pn, pd)}$, puis $${fr(a, b)} + ${fr(pn, pd)} = ${fr(N, L)}${pgcd(N, L) > 1 ? ` = ${frS(N, L)}` : ""}$.` }; }
    const k = rand(2, 6), L = ppcm4(b, d), N = a * (L / b) - c * (L / d), v = N / (L * k);
    return { enonce: `Calcule $\\left(${fr(a, b)} - ${fr(c, d)}\\right) \\div ${k}$.${CONSIGNE_FR}`, mode: "nombre", prefixe: "Résultat :", attendu: v,
      erreurs: [...approx(v)],
      aides: ["Calcule d'abord la parenthèse.", `$${fr(a, b)} - ${fr(c, d)} = ${frBrut(N, L)}$.`, `Diviser par $${k}$, c'est multiplier par $${fr(1, k)}$.`],
      solution: `$${fr(a, b)} - ${fr(c, d)} = ${frBrut(N, L)}$, puis $${frBrut(N, L)} \\div ${k} = ${frBrut(N, L * k)}${pgcd(Math.abs(N), L * k) > 1 && N !== 0 ? ` = ${frS(N, L * k)}` : ""}$.` };
  };

  GEN["fq4-problemes"] = function () {
    const t = rand(0, 2);
    if (t === 0) { const [a, b] = pick([[2, 3], [3, 4], [3, 5], [2, 5], [4, 5], [5, 6]]), [c, d] = pick([[1, 2], [1, 3], [3, 4], [2, 3], [1, 4]]);
      return { enonce: `Dans un collège, $${fr(a, b)}$ des élèves sont demi-pensionnaires. Parmi eux, $${fr(c, d)}$ prennent le bus. Quelle fraction des élèves du collège est demi-pensionnaire et prend le bus ?${CONSIGNE_FR}`, mode: "nombre", prefixe: "Fraction :", attendu: (a * c) / (b * d),
        erreurs: [{ valeur: a / b + c / d, message: `On prend $${fr(c, d)}$ **de** $${fr(a, b)}$ : c'est une multiplication.` }, ...approx((a * c) / (b * d))],
        aides: [`« $${fr(c, d)}$ des $${fr(a, b)}$ » se calcule par une multiplication.`, `$${fr(c, d)} \\times ${fr(a, b)}$.`, "Simplifie le résultat."], solution: `$${fr(c, d)} \\times ${fr(a, b)} = ${fr(a * c, b * d)}${pgcd(a * c, b * d) > 1 ? ` = ${frS(a * c, b * d)}` : ""}$.` }; }
    if (t === 1) { const [a, b] = pick([[1, 4], [1, 3], [2, 5], [1, 5], [3, 8]]), [c, d] = pick([[1, 2], [1, 3], [2, 3], [3, 4]]);
      const reste = 1 - a / b, part = reste * (c / d), restFin = reste - part, L = b * d;
      return { enonce: `Moussa dépense $${fr(a, b)}$ de son salaire pour le loyer, puis $${fr(c, d)}$ de ce qui lui reste pour la nourriture. Quelle fraction de son salaire lui reste-t-il ensuite ?${CONSIGNE_FR}`, mode: "nombre", prefixe: "Fraction :", attendu: restFin,
        erreurs: [{ valeur: 1 - a / b - c / d, message: `$${fr(c, d)}$ porte sur ce qui reste après le loyer, pas sur tout le salaire.` }, ...approx(restFin)],
        aides: [`Après le loyer, il reste $1 - ${fr(a, b)} = ${frS(b - a, b)}$ du salaire.`, `La nourriture représente $${fr(c, d)} \\times ${frS(b - a, b)}$ du salaire.`, "Soustrais cette part de ce qui restait."],
        solution: `Il reste $${frS(b - a, b)}$ après le loyer ; la nourriture coûte $${fr(c, d)} \\times ${frS(b - a, b)} = ${frS(c * (b - a), d * b)}$ du salaire. Il reste $${frS(b - a, b)} - ${frS(c * (b - a), d * b)} = ${frS((b - a) * (d - c), b * d)}$ du salaire.` }; }
    const n = rand(3, 9), [a, b] = pick([[1, 4], [1, 2], [3, 4], [1, 3], [2, 3], [1, 5]]), v = (n * b) / a;
    if (!Number.isInteger(v)) return GEN["fq4-problemes"]();
    return { enonce: `Combien de verres de $${fr(a, b)}$ de litre peut-on remplir avec $${n}$ litres de jus de goyave ?`, mode: "nombre", prefixe: "Verres :", attendu: v,
      erreurs: [{ valeur: (n * a) / b, message: "Il faut diviser par la contenance d'un verre, pas multiplier." }],
      aides: [`On cherche combien de fois $${fr(a, b)}$ est contenu dans $${n}$ : c'est une division.`, `$${n} \\div ${fr(a, b)} = ${n} \\times ${fr(b, a)}$.`, "Calcule."], solution: `$${n} \\div ${fr(a, b)} = ${n} \\times ${fr(b, a)} = ${v}$ verres.` };
  };

  /* =====================================================================
     Chapitre 5 : proportionnalité (pq4-) — produits en croix, quatrième proportionnelle, pourcentages, vitesses
     ===================================================================== */
  GEN["pq4-croix"] = function () {
    const t = rand(0, 1);
    if (t === 0) {
      for (;;) {
        const a = rand(2, 15), b = rand(2, 15), d = rand(2, 20); if (a === b) continue;
        const x = arr((a * d) / b, 4); if (!Number.isInteger(x * 100)) continue;
        return { enonce: `Ce tableau est un tableau de proportionnalité. Calcule $x$.`, tableau: { lignes: [["", "", ""], ["", String(a), "x"], ["", String(b), String(d)]].slice(1).map((l, i) => [i ? "\\text{Ligne 2}" : "\\text{Ligne 1}", l[1], l[2]]) }, mode: "nombre", prefixe: "$x =$", attendu: x,
          erreurs: [{ valeur: arr((b * d) / a, 4), message: "Attention à la disposition : $x = \\dfrac{" + a + " \\times " + d + "}{" + b + "}$." }],
          aides: ["Dans un tableau de proportionnalité, les produits en croix sont égaux.", `$${a} \\times ${d} = ${b} \\times x$.`, `$x = \\dfrac{${a} \\times ${d}}{${b}}$.`], solution: `Produits en croix : $${b} \\times x = ${a} \\times ${d} = ${a * d}$, donc $x = ${a * d} \\div ${b} = ${nb(x)}$.` };
      }
    }
    const a = rand(2, 12), b = rand(2, 12), k = rand(2, 5), eg = Math.random() < 0.5, c = a * k, d = eg ? b * k : b * k + pick([-1, 1]);
    const choix = ["Oui, car les produits en croix sont égaux", "Non, car les produits en croix sont différents", "Oui, car on ajoute le même nombre"];
    return { enonce: `Les fractions $${fr(a, b)}$ et $${fr(c, d)}$ sont-elles égales ?`, mode: "choix", choix, attendu: eg ? 0 : 1,
      aides: ["$\\dfrac{a}{b} = \\dfrac{c}{d}$ équivaut à $a \\times d = b \\times c$.", `Calcule $${a} \\times ${d}$ et $${b} \\times ${c}$.`, "Compare les deux produits."],
      solution: `$${a} \\times ${d} = ${a * d}$ et $${b} \\times ${c} = ${b * c}$. ${eg ? "Les produits en croix sont égaux : les fractions sont égales." : "Les produits sont différents : les fractions ne sont pas égales."}` };
  };

  GEN["pq4-quatrieme"] = function () {
    for (;;) {
      const t = rand(0, 3), nom = pick(["Awa", "Moussa", "Nasma", "Ibrahim", "Faïza", "Zaïd"]);
      const C = [
        () => { const q = rand(2, 9), p = Dc(rand(15, 99) * 10, 2), q2 = rand(2, 15), r = (p.m / 100) * q2 / q; return [`$${q}$ kg de litchis coûtent $${tD(p)}$ €. Combien coûtent $${q2}$ kg ?`, r, "€", q, p.m / 100, q2]; },
        () => { const L = rand(3, 12), km = rand(30, 90), km2 = rand(100, 600), r = (L * km2) / km; return [`Une voiture consomme $${L}$ L d'essence pour $${km}$ km. Combien consomme-t-elle pour $${km2}$ km ?`, r, "L", km, L, km2]; },
        () => { const p = rand(3, 8), f = rand(2, 6) * 50, p2 = rand(2, 15), r = (f * p2) / p; return [`Pour $${p}$ personnes, il faut $${f}$ g de riz. Quelle masse faut-il pour $${p2}$ personnes ?`, r, "g", p, f, p2]; },
        () => { const c = rand(2, 9), m = rand(3, 20) * 5, c2 = rand(2, 20), r = (m * c2) / c; return [`${nom} met $${m}$ minutes pour lire $${c}$ chapitres. Combien de minutes lui faut-il, au même rythme, pour $${c2}$ chapitres ?`, r, "min", c, m, c2]; }
      ][t]();
      const [txt, r, u, a, b, c] = C;
      if (!Number.isInteger(arr(r, 6) * 100) || a === c) continue;
      return { enonce: txt, mode: "nombre", prefixe: "Réponse :", suffixe: u, attendu: arr(r, 2),
        aides: ["La situation est proportionnelle : on peut utiliser la quatrième proportionnelle (produit en croix).", `Tableau : $${nb(a)} \\to ${nb(b)}$ et $${nb(c)} \\to x$.`, `$x = \\dfrac{${nb(b)} \\times ${nb(c)}}{${nb(a)}}$.`], solution: `$x = \\dfrac{${nb(b)} \\times ${nb(c)}}{${nb(a)}} = ${nb(arr(r, 2))}$ ${u}.` };
    }
  };

  GEN["pq4-pourcentages"] = function () {
    const t = rand(0, 3), p = pick([5, 10, 12, 15, 20, 25, 30, 35, 40, 50, 60]), P = rand(4, 60) * 5;
    if (t === 0) { const h = Math.random() < 0.5, k = h ? 1 + p / 100 : 1 - p / 100, f = arr(P * k, 2);
      return { enonce: `Un article coûte $${P}$ €. Son prix ${h ? "augmente" : "baisse"} de $${p}\\,\\%$. Quel est son nouveau prix ?`, mode: "nombre", prefixe: "Nouveau prix :", suffixe: "€", attendu: f,
        erreurs: [{ valeur: arr((P * p) / 100, 2), message: "Ça, c'est le montant de la variation. Il faut l'ajouter ou le retirer." }],
        aides: [`${h ? "Augmenter" : "Baisser"} de $${p}\\,\\%$, c'est multiplier par $${nb(k)}$.`, `$${P} \\times ${nb(k)}$.`, `Ou : $${p}\\,\\%$ de $${P}$ vaut $${nb((P * p) / 100)}$, puis ${h ? "on ajoute" : "on retire"}.`], solution: `$${P} \\times ${nb(k)} = ${nb(f)}$ €.` }; }
    if (t === 1) { const f = P * (1 + p / 100);
      return { enonce: `Un prix passe de $${P}$ € à $${nb(arr(f, 2))}$ €. De quel pourcentage a-t-il augmenté ?`, mode: "nombre", prefixe: "Hausse :", suffixe: "%", attendu: p,
        erreurs: [{ valeur: arr(f - P, 2), message: "Ça, c'est l'augmentation en euros. Il faut la rapporter au prix de départ." }],
        aides: [`Augmentation : $${nb(arr(f, 2))} - ${P} = ${nb(arr(f - P, 2))}$ €.`, `Rapporte au prix de départ : $\\dfrac{${nb(arr(f - P, 2))}}{${P}}$.`, "Multiplie par $100$."], solution: `$\\dfrac{${nb(arr(f - P, 2))}}{${P}} = ${nb(p / 100)}$, soit $${p}\\,\\%$.` }; }
    if (t === 2) { const n = rand(20, 600), q = arr((n * p) / 100, 2);
      return { enonce: `Dans une commune de $${n * 10}$ habitants, $${p}\\,\\%$ ont moins de $15$ ans. Combien d'habitants cela représente-t-il ?`, mode: "nombre", prefixe: "Habitants :", attendu: (n * 10 * p) / 100,
        aides: [`$${p}\\,\\%$ de $${n * 10}$, c'est $${n * 10} \\times \\dfrac{${p}}{100}$.`, `$${n * 10} \\times ${nb(p / 100)}$.`, "Le résultat doit être plus petit que la population."], solution: `$${n * 10} \\times ${nb(p / 100)} = ${nb((n * 10 * p) / 100)}$ habitants.` }; }
    const k = 1 - p / 100, f = arr(P * k, 2);
    return { enonce: `Après une réduction de $${p}\\,\\%$, un article coûte $${nb(f)}$ €. Quel était son prix avant la réduction ?`, mode: "nombre", prefixe: "Prix initial :", suffixe: "€", attendu: P,
      erreurs: [{ valeur: arr(f * (1 + p / 100), 2), message: `On ne rajoute pas $${p}\\,\\%$ du nouveau prix : le prix initial multiplié par $${nb(k)}$ donne $${nb(f)}$.` }],
      aides: [`Baisser de $${p}\\,\\%$, c'est multiplier par $${nb(k)}$.`, `Prix initial $\\times ${nb(k)} = ${nb(f)}$.`, `Prix initial $= ${nb(f)} \\div ${nb(k)}$.`], solution: `$${nb(f)} \\div ${nb(k)} = ${P}$ €.` };
  };

  GEN["pq4-vitesse"] = function () {
    const t = rand(0, 3);
    if (t === 0) { const v = rand(4, 24) * 5, [h, txt] = pick([[0.5, "$30$ min"], [1.5, "$1$ h $30$ min"], [0.25, "$15$ min"], [0.75, "$45$ min"], [2.5, "$2$ h $30$ min"], [1.25, "$1$ h $15$ min"], [2, "$2$ h"], [3, "$3$ h"]]), d = v * h;
      return { enonce: `Un bus parcourt $${nb(d)}$ km en ${txt}. Quelle est sa vitesse moyenne en km/h ?`, mode: "nombre", prefixe: "Vitesse :", suffixe: "km/h", attendu: v,
        aides: ["Vitesse $= \\dfrac{\\text{distance}}{\\text{durée}}$, avec la durée en heures.", `${txt} $= ${nb(h)}$ h.`, `$${nb(d)} \\div ${nb(h)}$.`], solution: `${txt} $= ${nb(h)}$ h, donc $v = ${nb(d)} \\div ${nb(h)} = ${v}$ km/h.` }; }
    if (t === 1) { const v = rand(3, 20) * 5, m = pick([15, 20, 30, 40, 45, 90, 75]), d = (v * m) / 60;
      return { enonce: `Un scooter roule à $${v}$ km/h pendant $${m}$ minutes. Quelle distance parcourt-il ?`, mode: "nombre", prefixe: "Distance :", suffixe: "km", attendu: arr(d, 3),
        erreurs: [{ valeur: v * m, message: "La durée doit être en heures : $" + m + "$ min $= \\dfrac{" + m + "}{60}$ h." }],
        aides: ["Distance $=$ vitesse $\\times$ durée (en heures).", `$${m}$ min $= ${nb(arr(m / 60, 4))}$ h.`, `$${v} \\times \\dfrac{${m}}{60}$.`], solution: `$d = ${v} \\times \\dfrac{${m}}{60} = ${nb(arr(d, 3))}$ km.` }; }
    if (t === 2) { const v = pick([30, 40, 50, 60, 80, 90, 120]), d = rand(1, 12) * v / 4;
      if (!Number.isInteger((d / v) * 60)) return GEN["pq4-vitesse"]();
      return { enonce: `Combien de minutes faut-il pour parcourir $${nb(d)}$ km à $${v}$ km/h ?`, mode: "nombre", prefixe: "Durée :", suffixe: "min", attendu: (d / v) * 60,
        erreurs: [{ valeur: arr(d / v, 4), message: "Ça, c'est la durée en heures. Convertis en minutes." }],
        aides: ["Durée $= \\dfrac{\\text{distance}}{\\text{vitesse}}$.", `$${nb(d)} \\div ${v} = ${nb(arr(d / v, 4))}$ h.`, "Multiplie par $60$ pour avoir des minutes."], solution: `$t = ${nb(d)} \\div ${v} = ${nb(arr(d / v, 4))}$ h $= ${(d / v) * 60}$ min.` }; }
    const v = pick([18, 36, 54, 72, 90, 108, 126, 144]), q = Math.random() < 0.5;
    return q ? { enonce: `Convertis $${v}$ km/h en m/s.`, mode: "nombre", prefixe: "Vitesse :", suffixe: "m/s", attendu: v / 3.6,
      erreurs: [{ valeur: v * 3.6, message: "On divise par $3{,}6$ pour passer des km/h aux m/s." }],
      aides: ["$1$ km $= 1\\,000$ m et $1$ h $= 3\\,600$ s.", `$${v}$ km/h $= \\dfrac{${v} \\times 1\\,000}{3\\,600}$ m/s.`, "Cela revient à diviser par $3{,}6$."], solution: `$\\dfrac{${v} \\times 1\\,000}{3\\,600} = ${nb(v / 3.6)}$ m/s.` }
      : { enonce: `Convertis $${nb(v / 3.6)}$ m/s en km/h.`, mode: "nombre", prefixe: "Vitesse :", suffixe: "km/h", attendu: v,
        aides: ["En $1$ h, il y a $3\\,600$ s.", `En $1$ h, on parcourt $${nb(v / 3.6)} \\times 3\\,600$ m.`, "Convertis en km : divise par $1\\,000$ (au total, multiplie par $3{,}6$)."], solution: `$${nb(v / 3.6)} \\times 3{,}6 = ${v}$ km/h.` };
  };

  /* Une « erreur connue » ne doit jamais coïncider avec la bonne réponse */
  Object.keys(GEN).filter((k) => /^(dp4|rx4|py4|fq4|pq4)-/.test(k)).forEach((k) => {
    const g = GEN[k];
    GEN[k] = (i) => {
      const q = g(i);
      if (q.erreurs) q.erreurs = q.erreurs.filter((e) => Math.abs(e.valeur - q.attendu) >= (q.tolerance || 1e-9));
      return q;
    };
  });
})();
