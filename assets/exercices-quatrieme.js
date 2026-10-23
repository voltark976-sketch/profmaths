/*
  Exercices du collège, classe de 4e (programme du cycle 4 de 2020, en vigueur en 4e en 2026-2027).
  Ce fichier se charge après assets/exercices-college.js et reprend ses outils (window.PM_EXO.college).
  Mêmes règles : chaque générateur fabrique une question avec des nombres tirés au hasard, la réponse
  attendue, trois indices progressifs et la solution rédigée.
  Préfixes : dp4-.
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

  /* Une « erreur connue » ne doit jamais coïncider avec la bonne réponse */
  Object.keys(GEN).filter((k) => /^(dp4)-/.test(k)).forEach((k) => {
    const g = GEN[k];
    GEN[k] = (i) => {
      const q = g(i);
      if (q.erreurs) q.erreurs = q.erreurs.filter((e) => Math.abs(e.valeur - q.attendu) >= (q.tolerance || 1e-9));
      return q;
    };
  });
})();
