/*
  Exercices du collège (6e, 5e, 4e, 3e).
  Ce fichier se charge après assets/exercices.js : il ajoute ses générateurs et ses figures
  à ceux du lycée (window.PM_EXO). Mêmes règles : chaque générateur fabrique une question avec
  des nombres tirés au hasard, la réponse attendue, trois indices progressifs et la solution rédigée.
  Préfixes : n6- pour la 6e, chapitre « Nombres entiers et décimaux ».
*/
(function () {
  "use strict";
  const { GEN, FIGURES, shuffle } = window.PM_EXO;

  /* ---------- Outils ---------- */
  const rand = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const P10 = (k) => 10 ** k;
  // Quatre choix au plus, mélangés, la bonne réponse en premier dans la liste fournie
  const melange = (bonne, fausses) => { const c = shuffle([bonne, ...[...new Set(fausses)].filter((f) => f !== bonne).slice(0, 3)]); return { choix: c, attendu: c.indexOf(bonne) }; };

  /* Nombre décimal x = m / 10^d (m entier positif) écrit à la française en KaTeX :
     espaces fines entre les classes, virgule {,}. Les zéros de la partie décimale sont gardés tels quels. */
  function ecrit(m, d) {
    d = d || 0;
    const s = String(m).padStart(d + 1, "0");
    const ent = s.slice(0, s.length - d), dec = s.slice(s.length - d);
    return ent.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") + (dec ? "{,}" + dec : "");
  }
  // Même chose sans zéros inutiles à droite
  function ecritNet(m, d) {
    d = d || 0;
    while (d > 0 && m % 10 === 0) { m /= 10; d--; }
    return ecrit(m, d);
  }
  // Écriture d'un nombre JavaScript (au plus 6 décimales)
  const nb = (x) => { const s = (+x).toFixed(6).replace(/0+$/, "").replace(/\.$/, ""); const [e, f] = s.split("."); return ecrit(+(e + (f || "")), (f || "").length); };
  // Texte simple (choix et légendes de figures) : 1 234,5
  const nbTexte = (x) => nb(x).replace(/\\,/g, " ").replace("{,}", ",");

  /* ---------- Rangs des chiffres ---------- */
  // rang k : 0 = unités, 1 = dizaines… ; -1 = dixièmes, -2 = centièmes, -3 = millièmes
  const RANGS = { "-3": "millièmes", "-2": "centièmes", "-1": "dixièmes", 0: "unités", 1: "dizaines", 2: "centaines", 3: "unités de mille", 4: "dizaines de mille", 5: "centaines de mille", 6: "unités de millions", 7: "dizaines de millions", 8: "centaines de millions", 9: "unités de milliards", 10: "dizaines de milliards", 11: "centaines de milliards" };
  const rangNom = (k) => RANGS[k];
  // Chiffre de rang k de m / 10^d
  const chiffre = (m, d, k) => Math.floor(m / P10(k + d)) % 10;
  // Écriture avec le chiffre de rang k souligné
  function souligne(m, d, k) {
    const s = String(m).padStart(d + 1, "0"), n = s.length, pos = n - 1 - (k + d);
    let out = "";
    for (let i = 0; i < n; i++) {
      const ent = n - d; // nombre de chiffres de la partie entière
      if (i === ent && d) out += "{,}";
      else if (i > 0 && i < ent && (ent - i) % 3 === 0) out += "\\,";
      out += i === pos ? `\\underline{\\mathbf{${s[i]}}}` : s[i];
    }
    return out;
  }
  // Un entier de n chiffres (premier chiffre non nul)
  const entier = (n) => { let s = String(rand(1, 9)); for (let i = 1; i < n; i++) s += rand(0, 9); return +s; };

  /* ---------- Nombres en lettres ----------
     Orthographe recommandée (rectifications de 1990) : traits d'union entre tous les mots-nombres.
     « million » et « milliard » sont des noms : ils prennent un s et restent séparés par des espaces. */
  const UN = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize"];
  const DIZ = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante"];
  function moinsDeCent(n, finS) {
    if (n < 17) return UN[n];
    if (n < 20) return "dix-" + UN[n - 10];
    const d = Math.floor(n / 10), u = n % 10;
    if (d === 7) return "soixante-" + (u === 1 ? "et-onze" : moinsDeCent(10 + u));
    if (d === 8) return u === 0 ? (finS ? "quatre-vingts" : "quatre-vingt") : "quatre-vingt-" + UN[u];
    if (d === 9) return "quatre-vingt-" + moinsDeCent(10 + u);
    return DIZ[d] + (u === 0 ? "" : u === 1 ? "-et-un" : "-" + UN[u]);
  }
  // n < 1000 ; finS : « vingt » et « cent » prennent un s s'ils terminent le nombre (pas devant « mille »)
  function moinsDeMille(n, finS) {
    const c = Math.floor(n / 100), r = n % 100;
    if (c === 0) return moinsDeCent(r, finS);
    const cent = c === 1 ? "cent" : UN[c] + "-cent";
    return r ? cent + "-" + moinsDeCent(r, finS) : cent + (c > 1 && finS ? "s" : "");
  }
  function enLettres(n) {
    if (n === 0) return "zéro";
    const mds = Math.floor(n / 1e9), mns = Math.floor(n / 1e6) % 1000, mil = Math.floor(n / 1e3) % 1000, u = n % 1000;
    const parts = [];
    if (mds) parts.push(moinsDeMille(mds, true) + " milliard" + (mds > 1 ? "s" : ""));
    if (mns) parts.push(moinsDeMille(mns, true) + " million" + (mns > 1 ? "s" : ""));
    let fin = "";
    if (mil) fin = mil === 1 ? "mille" : moinsDeMille(mil, false) + "-mille";
    if (u) fin += (fin ? "-" : "") + moinsDeMille(u, true);
    if (fin) parts.push(fin);
    return parts.join(" ");
  }
  // L'erreur classique : écrire les classes les unes après les autres sans compléter par des zéros
  const sansZeros = (n) => { const g = [Math.floor(n / 1e9), Math.floor(n / 1e6) % 1000, Math.floor(n / 1e3) % 1000, n % 1000]; let s = "", vu = false; g.forEach((x, i) => { if (x || (vu && i === 3)) { s += String(x); vu = true; } }); return +s; };

  /* ---------- Demi-droite graduée ----------
     o = { a: [m, d] (abscisse de la graduation 0, soit m / 10^d), pas: [m, d], n: nombre d'intervalles,
           lab: graduations numérotées (indices), points: [{ i, label }], origine: true si la demi-droite commence à la graduation 0 } */
  function demiDroite(o) {
    const W = 320, padL = 16, padR = 24, y0 = 30, H = 54;
    const ux = (W - padL - padR) / o.n, X = (i) => +(padL + i * ux).toFixed(1);
    const d = Math.max(o.a[1], o.pas[1]);
    const val = (i) => o.a[0] * P10(d - o.a[1]) + i * o.pas[0] * P10(d - o.pas[1]); // en 10^-d
    let s = `<svg class="graph droite demi-droite" viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.aria || "Demi-droite graduée"}">`;
    const x1 = o.origine ? X(0) : 4;
    s += `<g class="g-axis"><line x1="${x1}" y1="${y0}" x2="${W - 6}" y2="${y0}"/><path d="M${W - 2} ${y0} l-8 -4 v8z"/></g><g class="g-tick">`;
    for (let i = 0; i <= o.n; i++) {
      const grand = o.lab.includes(i) || (o.moyens && o.moyens.includes(i));
      s += `<line class="g-graduation" x1="${X(i)}" y1="${y0 - (grand ? 7 : 4)}" x2="${X(i)}" y2="${y0 + (grand ? 7 : 4)}"/>`;
      if (o.lab.includes(i)) s += `<text x="${X(i)}" y="${y0 + 20}" text-anchor="middle">${nbTexte(val(i) / P10(d)).replace(/ /g, " ")}</text>`;
    }
    s += `</g>`;
    (o.points || []).forEach((p) => {
      s += `<circle class="g-point" cx="${X(p.i)}" cy="${y0}" r="3.5"/>`;
      if (p.label) s += `<text class="g-plabel" x="${X(p.i)}" y="${y0 - 11}" text-anchor="middle">${p.label}</text>`;
    });
    return s + `</svg>`;
  }
  // Une demi-droite au hasard : { a, pas, n, lab, aria, val(i) en nombre, pasTexte, sub }
  function droiteHasard() {
    const t = rand(0, 4);
    let a, pas, n, lab, sub;
    if (t === 0) { // unité partagée en 2, 4, 5 ou 10
      sub = pick([2, 4, 5, 10, 10]);
      const unites = sub === 10 ? 2 : 3, debut = rand(0, 1) ? 0 : rand(1, 30);
      a = [debut, 0]; pas = sub === 4 ? [25, 2] : [10 / sub, 1]; n = sub * unites;
      lab = Array.from({ length: unites + 1 }, (_, k) => k * sub);
    } else if (t === 1) { // zoom : graduée en centièmes, nombres écrits tous les dixièmes
      sub = 10; a = [rand(0, 99) * 10 + rand(0, 9), 1]; pas = [1, 2]; n = 20; lab = [0, 10, 20];
    } else if (t === 2) { // grands nombres : pas de 10, 50, 100, 250, 1 000…
      const [p, k] = pick([[10, 5], [50, 4], [100, 5], [250, 4], [1000, 5], [500, 4], [20, 5]]);
      sub = k; a = [rand(0, 9) * p * k, 0]; pas = [p, 0]; n = 3 * k; lab = [0, k, 2 * k, 3 * k];
    } else if (t === 3) { // seulement deux nombres écrits, pas à retrouver
      sub = pick([4, 5, 10]); const base = rand(1, 40);
      a = [base * 10, 1]; pas = sub === 4 ? [25, 2] : [10 / sub, 1]; n = sub * 2 + pick([1, 2, 3]); lab = [0, sub];
    } else { // demi-droite d'origine 0 graduée en dixièmes
      sub = 10; a = [0, 0]; pas = [1, 1]; n = 25; lab = [0, 10, 20];
    }
    const d = Math.max(a[1], pas[1]);
    const val = (i) => (a[0] * P10(d - a[1]) + i * pas[0] * P10(d - pas[1])) / P10(d);
    return { a, pas, n, lab, sub, val, origine: t === 4 || a[0] === 0, pasNb: pas[0] / P10(pas[1]), aria: "Demi-droite graduée" };
  }
  const dessin = (D, points) => demiDroite({ a: D.a, pas: D.pas, n: D.n, lab: D.lab, origine: D.origine, points, aria: D.aria });
  const LETTRES = ["A", "B", "C", "D", "E", "M", "N", "P", "R", "S", "T", "K"];

  /* ---------- Figures du cours ---------- */
  FIGURES["n6-demi-droite"] = () => demiDroite({ a: [0, 0], pas: [1, 1], n: 25, lab: [0, 10, 20], origine: true, points: [{ i: 7, label: "A" }, { i: 14, label: "B" }, { i: 23, label: "C" }], aria: "Demi-droite graduée d'origine 0, graduée en dixièmes : A(0,7), B(1,4) et C(2,3)" });
  FIGURES["n6-arrondi"] = () => demiDroite({ a: [334, 1], pas: [1, 2], n: 10, lab: [0, 10], moyens: [5], points: [{ i: 8, label: "33,48" }], aria: "Zoom entre 33,4 et 33,5 : 33,48 est plus près de 33,5" });

  /* ---------- Étape 1 : nombres entiers ---------- */
  GEN["n6-rang"] = function () {
    const N = entier(rand(4, 10)), L = String(N).length;
    if (Math.random() < 0.55) {
      const k = rand(0, L - 1), rep = chiffre(N, 0, k);
      const voisins = [k - 1, k + 1].filter((j) => j >= 0 && j < L);
      return {
        enonce: `Quel est le chiffre des **${rangNom(k)}** dans le nombre $${ecrit(N)}$ ?`,
        mode: "nombre", prefixe: "Le chiffre est", attendu: rep,
        erreurs: voisins.map((j) => ({ valeur: chiffre(N, 0, j), message: `Ça, c'est le chiffre des ${rangNom(j)}. Repère d'abord la classe, puis compte unités, dizaines, centaines.` })),
        aides: [
          "Les nombres sont écrits par **classes** de trois chiffres : la classe des unités (à droite), puis celle des mille, des millions, des milliards.",
          "Dans chaque classe, on lit de droite à gauche : unités, dizaines, centaines.",
          `Les ${rangNom(k)}, c'est le chiffre placé à la position $${k + 1}$ en partant de la droite.`
        ],
        solution: `Dans $${souligne(N, 0, k)}$, le chiffre souligné est au rang des ${rangNom(k)} : c'est $${rep}$.`
      };
    }
    const k = rand(0, L - 1);
    const autres = [k - 1, k + 1, k + 3, k - 3, k + 2].filter((j) => j >= 0 && j <= 11 && j !== k).map(rangNom);
    const c = melange(rangNom(k), autres);
    return {
      enonce: `Dans le nombre $${souligne(N, 0, k)}$, quel est le rang du chiffre souligné ?`,
      mode: "choix", choix: c.choix.map((x) => x[0].toUpperCase() + x.slice(1)), attendu: c.attendu,
      aides: [
        "Repère dans quelle classe se trouve le chiffre : unités, mille, millions ou milliards.",
        "Dans sa classe, regarde s'il est à la place des unités, des dizaines ou des centaines.",
        "Les espaces séparent les classes de trois chiffres : c'est fait pour t'aider."
      ],
      solution: `Le chiffre souligné est à la position $${k + 1}$ en partant de la droite : c'est le chiffre des **${rangNom(k)}**.`
    };
  };

  const UNITES_NUM = [[3, "millier", "milliers"], [2, "centaine", "centaines"], [1, "dizaine", "dizaines"], [0, "unité", "unités"], [-1, "dixième", "dixièmes"], [-2, "centième", "centièmes"], [-3, "millième", "millièmes"]];
  GEN["n6-combien"] = function () {
    const t = rand(0, 2);
    if (t === 2) { // relations entre unités de numération
      let i = rand(0, 5), j = rand(i + 1, 6); const A = UNITES_NUM[i], B = UNITES_NUM[j], k = pick([1, 1, rand(2, 9)]);
      const rep = k * P10(A[0] - B[0]);
      return {
        enonce: `Complète : $${k}$ ${k > 1 ? A[2] : A[1]} $= \\ldots$ ${B[2]}.`,
        mode: "nombre", prefixe: "Il y en a", suffixe: B[2], attendu: rep,
        erreurs: [{ valeur: k * P10(A[0] - B[0] - 1), message: "Il manque un rang : recompte les étapes entre les deux unités." }, { valeur: k * P10(A[0] - B[0] + 1), message: "Un rang de trop : recompte les étapes entre les deux unités." }],
        aides: [
          "Chaque unité vaut **dix fois** la suivante : $1$ millier $= 10$ centaines, $1$ unité $= 10$ dixièmes…",
          `De ${A[2]} à ${B[2]}, il y a $${A[0] - B[0]}$ étape${A[0] - B[0] > 1 ? "s" : ""} : on multiplie par $10$ à chaque étape.`,
          `$1$ ${A[1]} $= ${ecrit(P10(A[0] - B[0]))}$ ${B[2]}.`
        ],
        solution: `$1$ ${A[1]} $= ${ecrit(P10(A[0] - B[0]))}$ ${B[2]}` + (k > 1 ? `, donc $${k}$ ${A[2]} $= ${k} \\times ${ecrit(P10(A[0] - B[0]))} = ${ecrit(rep)}$ ${B[2]}.` : ".")
      };
    }
    let m, d, k;
    if (t === 0) { m = entier(rand(4, 7)); d = 0; k = rand(1, 3); }
    else { d = rand(2, 3); m = rand(10, 9999) * P10(d) + rand(1, P10(d) - 1); k = -rand(1, d); }
    const U = UNITES_NUM.find((u) => u[0] === k), rep = Math.floor(m / P10(d + k)), ch = chiffre(m, d, k);
    return {
      enonce: `Combien y a-t-il de **${U[2]}** dans $${ecrit(m, d)}$ ?`,
      mode: "nombre", prefixe: "Il y en a", attendu: rep,
      erreurs: [{ valeur: ch, message: `Ça, c'est le **chiffre** des ${U[2]}. On demande le **nombre** de ${U[2]} : prends tout ce qui est à gauche, chiffre des ${U[2]} compris.` }],
      aides: [
        `Le chiffre des ${U[2]} est $${ch}$, mais on ne demande pas le chiffre : on demande **combien** de ${U[2]} il y a en tout.`,
        `Garde tous les chiffres jusqu'à celui des ${U[2]} (compris) et oublie ${k < 0 ? "les chiffres après" : "les chiffres à sa droite"}.`,
        `Par exemple, $7\\,524$ contient $75$ centaines, et $52{,}49$ contient $524$ dixièmes.`
      ],
      solution: `Dans $${souligne(m, d, k)}$, on garde tout jusqu'au chiffre des ${U[2]} : il y a $${ecrit(rep)}$ ${U[2]}.`
    };
  };

  GEN["n6-lire"] = function () {
    const t = rand(0, 2);
    // un grand nombre avec quelques zéros, pour que les classes comptent
    const grand = () => {
      const L = rand(5, 10); let s = String(rand(1, 9));
      for (let i = 1; i < L; i++) s += Math.random() < 0.35 ? "0" : rand(0, 9);
      return +s;
    };
    if (t === 0) {
      let N; do { N = grand(); } while (sansZeros(N) === N);
      return {
        enonce: `Écris en chiffres : « ${enLettres(N)} ».`,
        mode: "nombre", prefixe: "En chiffres :", attendu: N,
        erreurs: [{ valeur: sansZeros(N), message: "Attention aux zéros : chaque classe (mille, millions…) s'écrit avec **trois chiffres**." }],
        aides: [
          "Découpe la phrase en classes : ce qui est devant « milliard(s) », devant « million(s) », devant « mille », puis le reste.",
          "Chaque classe s'écrit avec **trois chiffres** : $40$ mille s'écrit $040$ dans la classe des mille, si une autre classe est devant.",
          "Une classe absente s'écrit $000$."
        ],
        solution: `On écrit chaque classe avec trois chiffres : « ${enLettres(N)} » s'écrit $${ecrit(N)}$.`
      };
    }
    if (t === 1) {
      const N = grand(), s = String(N);
      const autres = new Set();
      const ajoute = (x) => { if (x > 0 && x !== N && String(x).length >= 4) autres.add(x); };
      for (let i = 0; i < s.length - 1; i++) if (s[i] !== s[i + 1]) { ajoute(+(s.slice(0, i) + s[i + 1] + s[i] + s.slice(i + 2))); break; }
      const z = s.indexOf("0", 1); if (z > 0) ajoute(+(s.slice(0, z) + s.slice(z + 1)));
      ajoute(+(s + "0")); ajoute(sansZeros(N));
      ajoute(N + P10(rand(0, s.length - 2)));
      const c = melange(enLettres(N), [...autres].map(enLettres));
      return {
        enonce: `Comment s'écrit en lettres le nombre $${ecrit(N)}$ ?`,
        mode: "choix", choix: c.choix.map((x) => x[0].toUpperCase() + x.slice(1)), attendu: c.attendu,
        aides: [
          "Lis le nombre classe par classe, de gauche à droite : milliards, millions, mille, puis le reste.",
          "Chaque classe se lit comme un nombre de $0$ à $999$, suivi du nom de la classe.",
          "Une classe $000$ ne se lit pas."
        ],
        solution: `$${ecrit(N)}$ se lit classe par classe : « ${enLettres(N)} ».`
      };
    }
    // décomposition suivant les rangs
    const L = rand(4, 8); let rangs = []; for (let k = 0; k < L; k++) if (k === L - 1 || Math.random() < 0.6) rangs.push(k);
    if (rangs.length < 2) rangs.unshift(0);
    const termes = rangs.map((k) => ({ k, c: rand(1, 9) }));
    const N = termes.reduce((s, x) => s + x.c * P10(x.k), 0);
    const ordre = Math.random() < 0.3 ? shuffle(termes) : termes.slice().reverse();
    const naif = +ordre.map((x) => x.c).join("");
    return {
      enonce: `Quel nombre est égal à ${ordre.map((x) => `$(${x.c} \\times ${ecrit(P10(x.k))})$`).join(" $+$ ")} ?`,
      mode: "nombre", prefixe: "Le nombre est", attendu: N,
      erreurs: naif !== N ? [{ valeur: naif, message: "On ne colle pas les chiffres : chacun va au rang indiqué par $1$, $10$, $100$… et les rangs vides prennent un $0$." }] : [],
      aides: [
        "Chaque produit place un chiffre à un rang : $\\times 1\\,000$, c'est le rang des unités de mille.",
        "Repère le rang le plus grand : il donne le nombre de chiffres du résultat.",
        "Écris un $0$ à chaque rang qui n'apparaît pas."
      ],
      solution: `On place ${ordre.slice().sort((a, b) => b.k - a.k).map((x) => `$${x.c}$ au rang des ${rangNom(x.k)}`).join(", ")}, et un $0$ à chaque rang vide : le nombre est $${ecrit(N)}$.`
    };
  };

  /* ---------- Étape 2 : nombres décimaux ---------- */
  GEN["n6-rang-dec"] = function () {
    const d = rand(1, 3), m = rand(1, 99999) * P10(d) + rand(1, P10(d) - 1), L = String(Math.floor(m / P10(d))).length;
    const t = rand(0, 3);
    if (t === 3) {
      const ent = Math.random() < 0.5;
      const rep = ent ? Math.floor(m / P10(d)) : (m % P10(d)) / P10(d);
      return {
        enonce: `Quelle est la **partie ${ent ? "entière" : "décimale"}** de $${ecrit(m, d)}$ ?`,
        mode: "nombre", prefixe: `Partie ${ent ? "entière" : "décimale"} :`, attendu: rep,
        erreurs: ent ? [{ valeur: m % P10(d), message: "Ça, ce sont les chiffres après la virgule. La partie entière est avant la virgule." }] : [{ valeur: m % P10(d), message: `La partie décimale est un nombre plus petit que $1$ : écris-la $0{,}\\ldots$` }, { valeur: Math.floor(m / P10(d)), message: "Ça, c'est la partie entière (avant la virgule)." }],
        aides: ["Un nombre décimal est la somme de sa partie entière et de sa partie décimale.", "La partie entière est avant la virgule. La partie décimale est ce qui reste : elle est plus petite que $1$.", "Exemple : $52{,}493 = 52 + 0{,}493$."],
        solution: `$${ecrit(m, d)} = ${ecrit(Math.floor(m / P10(d)))} + ${ecrit(m % P10(d), d)}$. La partie ${ent ? "entière" : "décimale"} est $${ent ? ecrit(Math.floor(m / P10(d))) : ecrit(m % P10(d), d)}$.`
      };
    }
    const k = rand(-d, Math.min(L - 1, 3));
    if (t < 2) {
      const rep = chiffre(m, d, k), voisins = [k - 1, k + 1].filter((j) => j >= -d && j < L);
      const miroir = k < 0 && -k < L ? [-k] : []; // dixièmes ↔ dizaines, centièmes ↔ centaines
      return {
        enonce: `Quel est le chiffre des **${rangNom(k)}** dans $${ecrit(m, d)}$ ?`,
        mode: "nombre", prefixe: "Le chiffre est", attendu: rep,
        erreurs: voisins.map((j) => ({ valeur: chiffre(m, d, j), message: `Ça, c'est le chiffre des ${rangNom(j)}.` })).concat(miroir.map((j) => ({ valeur: chiffre(m, d, j), message: `Ça, c'est le chiffre des ${rangNom(j)} : il est avant la virgule. Les ${rangNom(k)} sont après.` }))),
        aides: [
          "La virgule se place juste après le chiffre des **unités**.",
          "Après la virgule : dixièmes, centièmes, millièmes. Avant : unités, dizaines, centaines…",
          k < 0 ? `Les ${rangNom(k)} : c'est le chiffre n° $${-k}$ après la virgule.` : `Les ${rangNom(k)} : c'est le chiffre n° $${k + 1}$ avant la virgule, en partant de la virgule.`
        ],
        solution: `Dans $${souligne(m, d, k)}$, le chiffre des ${rangNom(k)} est $${rep}$.`
      };
    }
    const autres = [k - 1, k + 1, -k, -k - 1, k + 2, k - 2].filter((j) => j !== k && j >= -3 && j <= 5).map(rangNom);
    const c = melange(rangNom(k), autres);
    return {
      enonce: `Dans le nombre $${souligne(m, d, k)}$, quel est le rang du chiffre souligné ?`,
      mode: "choix", choix: c.choix.map((x) => x[0].toUpperCase() + x.slice(1)), attendu: c.attendu,
      aides: ["Pars de la virgule : juste avant, c'est le chiffre des unités.", "Après la virgule : dixièmes, centièmes, millièmes.", "Attention : dizaines (avant la virgule) et dixièmes (après) ne sont pas la même chose."],
      solution: `Le chiffre souligné est ${k < 0 ? `le n° $${-k}$ après la virgule` : `le n° $${k + 1}$ avant la virgule`} : c'est le chiffre des **${rangNom(k)}**.`
    };
  };

  const FRAC_NOMS = { 1: "dixièmes", 2: "centièmes", 3: "millièmes" };
  GEN["n6-ecritures"] = function () {
    const t = rand(0, 4);
    if (t === 0) { // fraction décimale vers écriture décimale
      const k = rand(1, 3); let a; do { a = rand(1, 99999); } while (a % 10 === 0);
      const rep = a / P10(k);
      return {
        enonce: `Donne l'écriture décimale de $\\dfrac{${ecrit(a)}}{${ecrit(P10(k))}}$.`,
        mode: "nombre", prefixe: "Écriture décimale :", attendu: rep,
        erreurs: [{ valeur: a / P10(k + 1), message: `Un rang de trop : sur $${ecrit(P10(k))}$, le dernier chiffre va au rang des ${FRAC_NOMS[k]}.` }, { valeur: k > 1 ? a / P10(k - 1) : a * 10, message: `Pas assez décalé : sur $${ecrit(P10(k))}$, le dernier chiffre va au rang des ${FRAC_NOMS[k]}.` }],
        aides: [`$\\dfrac{${ecrit(a)}}{${ecrit(P10(k))}}$, c'est $${ecrit(a)}$ ${FRAC_NOMS[k]}.`, `Le dernier chiffre de $${ecrit(a)}$ doit arriver au rang des ${FRAC_NOMS[k]} : $${k}$ chiffre${k > 1 ? "s" : ""} après la virgule.`, "Ajoute des zéros devant si besoin : $\\dfrac{7}{100} = 0{,}07$."],
        solution: `$\\dfrac{${ecrit(a)}}{${ecrit(P10(k))}}$ = $${ecrit(a)}$ ${FRAC_NOMS[k]} $= ${ecritNet(a, k)}$ : le dernier chiffre est au rang des ${FRAC_NOMS[k]}.`
      };
    }
    if (t === 1) { // écriture décimale vers fraction décimale : trouver le numérateur
      const d = rand(1, 3), m = rand(1, 9999) * P10(d) + rand(1, P10(d) - 1);
      if (m % 10 === 0) return GEN["n6-ecritures"]();
      const k = d < 3 && Math.random() < 0.25 ? d + 1 : d, rep = m * P10(k - d);
      return {
        enonce: `Complète : $${ecrit(m, d)} = \\dfrac{\\ldots}{${ecrit(P10(k))}}$.`,
        mode: "nombre", prefixe: "Numérateur :", attendu: rep,
        erreurs: k !== d ? [{ valeur: m, message: `Avec $${ecrit(P10(k))}$ au dénominateur, on compte des ${FRAC_NOMS[k]} : il y a un rang de plus que de chiffres après la virgule.` }] : [{ valeur: m % P10(d), message: "N'oublie pas la partie entière : elle compte aussi." }],
        aides: [`Combien y a-t-il de ${FRAC_NOMS[k]} dans $${ecrit(m, d)}$ ?`, `$${ecrit(m, d)}$ s'écrit avec $${d}$ chiffre${d > 1 ? "s" : ""} après la virgule${k !== d ? `, et $${ecrit(m * 10, d + 1)}$ avec $${k}$` : ""}.`, "Le numérateur, c'est le nombre écrit sans la virgule."],
        solution: `$${ecrit(m, d)} = ${k !== d ? ecrit(m * 10, k) + " = " : ""}\\dfrac{${ecrit(rep)}}{${ecrit(P10(k))}}$ : il y a $${ecrit(rep)}$ ${FRAC_NOMS[k]}.`
      };
    }
    if (t === 2 || t === 3) { // somme de fractions décimales, ou unités de numération
      const e = rand(0, 99), ch = [rand(0, 9), rand(0, 9), rand(0, 9)];
      if (Math.random() < 0.7) ch[pick([0, 1])] = 0;
      if (ch[2] === 0) ch[2] = rand(1, 9);
      const m = e * 1000 + ch[0] * 100 + ch[1] * 10 + ch[2], rep = m / 1000;
      const non0 = ch.map((c, i) => ({ c, k: i + 1 })).filter((x) => x.c);
      const naif = +(String(e) + "." + non0.map((x) => x.c).join(""));
      const NOMS1 = { 1: "dixième", 2: "centième", 3: "millième" };
      const enonce = t === 2
        ? `Donne l'écriture décimale de $${[e ? ecrit(e) : ""].concat(non0.map((x) => `\\dfrac{${x.c}}{${ecrit(P10(x.k))}}`)).filter(Boolean).join(" + ")}$.`
        : `Écris avec une virgule le nombre formé de ${[e ? `$${e}$ unité${e > 1 ? "s" : ""}` : ""].concat(non0.map((x) => `$${x.c}$ ${NOMS1[x.k]}${x.c > 1 ? "s" : ""}`)).filter(Boolean).join(", ").replace(/, ([^,]*)$/, " et $1")}.`;
      return {
        enonce, mode: "nombre", prefixe: "Le nombre est", attendu: rep,
        erreurs: Math.abs(naif - rep) > 1e-9 ? [{ valeur: naif, message: "Chaque chiffre a sa place : les rangs vides (dixièmes, centièmes…) prennent un $0$." }] : [],
        aides: ["Range les morceaux dans le tableau : unités, dixièmes, centièmes, millièmes.", `$\\dfrac{1}{10} = 0{,}1$ ; $\\dfrac{1}{100} = 0{,}01$ ; $\\dfrac{1}{1\\,000} = 0{,}001$.`, "Un rang sans chiffre s'écrit $0$."],
        solution: `${e ? `$${e}$ unité${e > 1 ? "s" : ""}, ` : ""}$${ch[0]}$ dixième${ch[0] > 1 ? "s" : ""}, $${ch[1]}$ centième${ch[1] > 1 ? "s" : ""} et $${ch[2]}$ millième${ch[2] > 1 ? "s" : ""} : le nombre est $${ecritNet(m, 3)}$.`
      };
    }
    // zéros inutiles
    // le nombre e,0b écrit avec des zéros inutiles : 5,080 ; 05,08 ; 5,0800
    const e = rand(1, 99), b = rand(1, 9);
    const x = pick([ecrit(e * 1000 + b * 10, 3), "0" + ecrit(e * 100 + b, 2), ecrit(e * 10000 + b * 100, 4)]);
    const bonne = `$${ecrit(e * 100 + b, 2)}$`;
    const fausses = [`$${ecrit(e * 10 + b, 1)}$`, `$${ecrit(e * 1000 + b, 3)}$`, `$${ecrit(e * 100 + b, 1)}$`];
    const c = melange(bonne, fausses);
    return {
      enonce: `Quelle écriture est égale à $${x}$ ?`,
      mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Un zéro tout à **droite** de la partie décimale est inutile : on peut l'enlever.", "Un zéro tout à **gauche** de la partie entière est inutile aussi.", "Un zéro **au milieu** est indispensable : il garde les autres chiffres à leur rang."],
      solution: `On enlève seulement les zéros inutiles (à droite de la partie décimale, à gauche de la partie entière) : $${x} = ${ecrit(e * 100 + b, 2)}$. Les autres écritures déplacent des chiffres : leur valeur change.`
    };
  };

  /* ---------- Étape 3 : multiplier et diviser par 10, 100, 1 000 ---------- */
  const OPS = [
    { op: "\\times 10", k: 1 }, { op: "\\times 100", k: 2 }, { op: "\\times 1\\,000", k: 3 },
    { op: "\\div 10", k: -1 }, { op: "\\div 100", k: -2 }, { op: "\\div 1\\,000", k: -3 },
    { op: "\\times 0{,}1", k: -1 }, { op: "\\times 0{,}01", k: -2 }, { op: "\\times 0{,}001", k: -3 }
  ];
  GEN["n6-x10"] = function () {
    const d = rand(0, 3), m = rand(1, 9999), x = m / P10(d);
    if (m % 10 === 0 && d > 0) return GEN["n6-x10"]();
    const O = pick(OPS), rep = O.k > 0 ? (m * P10(O.k)) / P10(d) : m / P10(d - O.k);
    const sens = O.k > 0 ? "plus grand" : "plus petit", n = Math.abs(O.k);
    if (Math.random() < 0.25) { // trouver l'opération
      const bon = `$${O.op}$`;
      const fausses = OPS.filter((o) => o !== O && (o.k === -O.k || o.k === O.k || Math.abs(o.k) === n + 1 || Math.abs(o.k) === n - 1)).map((o) => `$${o.op}$`);
      // deux opérations peuvent donner le même résultat (÷ 10 et × 0,1) : on n'en garde qu'une dans les choix
      const equiv = OPS.filter((o) => o !== O && o.k === O.k).map((o) => `$${o.op}$`);
      const c = melange(bon, fausses.filter((f) => !equiv.includes(f)));
      return {
        enonce: `Par quelle opération passe-t-on de $${ecrit(m, d)}$ à $${nb(rep)}$ ?`,
        mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: [`Le résultat est-il plus grand ou plus petit que $${ecrit(m, d)}$ ?`, "Compare la place d'un même chiffre dans les deux nombres : de combien de rangs a-t-il bougé ?", "Multiplier par $0{,}1$, c'est diviser par $10$ ; multiplier par $0{,}01$, c'est diviser par $100$."],
        solution: `Le nombre devient ${sens} et chaque chiffre ${O.k > 0 ? "monte" : "descend"} de $${n}$ rang${n > 1 ? "s" : ""} : c'est $${O.op}$.${O.k < 0 ? ` (C'est aussi $${OPS.find((o) => o !== O && o.k === O.k).op}$.)` : ""}`
      };
    }
    return {
      enonce: `Calcule : $${ecrit(m, d)} ${O.op}$.`,
      mode: "nombre", prefixe: "Résultat :", attendu: rep,
      erreurs: [
        { valeur: O.k > 0 ? m / P10(d + O.k) : (m * P10(-O.k)) / P10(d), message: `Mauvais sens : le résultat doit être ${sens} que $${ecrit(m, d)}$.` },
        { valeur: x, message: "Ajouter ou enlever un zéro à droite de la partie décimale ne change pas la valeur : il faut décaler les chiffres." },
        { valeur: O.k > 0 ? (m * P10(O.k + 1)) / P10(d) : m / P10(d - O.k + 1), message: `Un rang de trop : on décale de $${n}$ rang${n > 1 ? "s" : ""}.` }
      ],
      aides: [
        O.op.includes("0{,}") ? `Multiplier par $${["", "0{,}1", "0{,}01", "0{,}001"][n]}$, c'est **diviser** par $${ecrit(P10(n))}$ : le résultat est ${sens}.` : `${O.k > 0 ? "Multiplier" : "Diviser"} par $${ecrit(P10(n))}$ : le résultat est ${sens}.`,
        `Chaque chiffre ${O.k > 0 ? "monte" : "descend"} de $${n}$ rang${n > 1 ? "s" : ""} (les unités deviennent des ${O.k > 0 ? ["", "dizaines", "centaines", "unités de mille"][n] : ["", "dixièmes", "centièmes", "millièmes"][n]}).`,
        "Ajoute des zéros si des rangs restent vides, enlève ceux qui deviennent inutiles."
      ],
      solution: `Chaque chiffre ${O.k > 0 ? "monte" : "descend"} de $${n}$ rang${n > 1 ? "s" : ""} : $${ecrit(m, d)} ${O.op} = ${nb(rep)}$.`
    };
  };

  /* ---------- Étape 4 : demi-droite graduée ---------- */
  GEN["n6-abscisse"] = function () {
    const D = droiteHasard();
    let i; do { i = rand(1, D.n - 1); } while (D.lab.includes(i));
    const L = pick(LETTRES), rep = D.val(i);
    const l0 = D.lab[0], l1 = D.lab[1], ecart = D.val(l1) - D.val(l0), nInt = l1 - l0;
    const faux = D.val(l0) + (i - l0) * (ecart / 10); // erreur : chaque graduation vaut un dixième de l'écart
    return {
      enonce: `Quelle est l'abscisse du point $${L}$ ?`,
      figure: dessin(D, [{ i, label: L }]),
      mode: "nombre", prefixe: `Abscisse de ${L} :`, attendu: rep,
      erreurs: Math.abs(faux - rep) > 1e-9 && nInt !== 10 ? [{ valeur: faux, message: `Compte les intervalles : entre $${nb(D.val(l0))}$ et $${nb(D.val(l1))}$, il y en a $${nInt}$, pas $10$.` }] : [],
      aides: [
        `Entre $${nb(D.val(l0))}$ et $${nb(D.val(l1))}$, compte le nombre d'**intervalles** (les petits espaces entre deux graduations) : il y en a $${nInt}$.`,
        `Une graduation vaut donc $${nb(ecart)} \\div ${nInt} = ${nb(D.pasNb)}$.`,
        `Pars d'un nombre écrit et avance graduation par graduation jusqu'à $${L}$.`
      ],
      solution: `Entre deux nombres écrits, l'écart $${nb(ecart)}$ est partagé en $${nInt}$ : une graduation vaut $${nb(D.pasNb)}$. Le point $${L}$ est à $${i - l0}$ graduation${i - l0 > 1 ? "s" : ""} de $${nb(D.val(l0))}$ : son abscisse est $${nb(D.val(l0))} + ${i - l0} \\times ${nb(D.pasNb)} = ${nb(rep)}$. On note $${L}(${nb(rep)})$.`
    };
  };

  GEN["n6-placer"] = function () {
    const D = droiteHasard();
    let i; do { i = rand(1, D.n - 1); } while (D.lab.includes(i));
    const v = D.val(i);
    // pièges : la graduation lue comme un dixième de l'écart, une de plus, une de moins, le symétrique
    const l0 = D.lab[0], nInt = D.lab[1] - D.lab[0];
    const pieges = [l0 + Math.round(((v - D.val(l0)) / (D.val(D.lab[1]) - D.val(l0))) * 10), i + 1, i - 1, i + 2, i - 2, D.n - i].filter((j) => j > 0 && j < D.n && j !== i && !D.lab.includes(j));
    const autres = [...new Set(nInt === 10 ? pieges.slice(1) : pieges)].slice(0, 3);
    while (autres.length < 3) { const j = rand(1, D.n - 1); if (j !== i && !autres.includes(j)) autres.push(j); }
    const lettres = shuffle(LETTRES).slice(0, 4);
    const pos = [i, ...autres];
    const pts = pos.map((j, k) => ({ i: j, label: lettres[k] }));
    const c = melange(`$${lettres[0]}$`, lettres.slice(1).map((l) => `$${l}$`));
    return {
      enonce: `Quel point a pour abscisse $${nb(v)}$ ?`,
      figure: dessin(D, pts.sort((a, b) => a.i - b.i)),
      mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: [`Trouve d'abord ce que vaut une graduation : entre deux nombres écrits, compte les intervalles.`, `Une graduation vaut $${nb(D.pasNb)}$.`, `Pars de $${nb(D.val(l0))}$ et avance de $${nb(D.pasNb)}$ à chaque graduation jusqu'à $${nb(v)}$.`],
      solution: `Une graduation vaut $${nb(D.pasNb)}$. $${nb(v)} = ${nb(D.val(l0))} + ${i - l0} \\times ${nb(D.pasNb)}$ : c'est la graduation n° $${i - l0}$ après $${nb(D.val(l0))}$, où se trouve le point $${lettres[0]}$.`
    };
  };

  /* ---------- Étape 5 : comparer et ranger ---------- */
  GEN["n6-comparer"] = function () {
    const t = rand(0, 4);
    let a, b; // [m, d]
    const e = rand(0, 30);
    if (t === 0) { const x = rand(1, 9), y = rand(10, 99); a = [e * 10 + x, 1]; b = [e * 100 + y, 2]; } // 2,5 et 2,45
    else if (t === 1) { const y = rand(10, 99); a = [e * 100 + y, 2]; b = [e * 1000 + y * 10, 3]; } // 3,45 et 3,450
    else if (t === 2) { const f = rand(1, 9); a = [e * 100 + f, 2]; b = [e * 10 + f, 1]; } // 3,08 et 3,8
    else if (t === 3) { const e2 = e + rand(1, 5); a = [e * 1000 + rand(100, 999), 3]; b = [e2 * 10 + rand(0, 9), 1]; } // 12,875 et 15,3
    else { const y = rand(1, 98); a = [e * 100 + y, 2]; b = [e * 100 + y + rand(1, 99 - y), 2]; }
    if (Math.random() < 0.5) [a, b] = [b, a];
    const va = a[0] / P10(a[1]), vb = b[0] / P10(b[1]);
    const A = ecrit(a[0], a[1]), B = ecrit(b[0], b[1]);
    const choix = [`$${A} < ${B}$`, `$${A} > ${B}$`, `$${A} = ${B}$`];
    const rep = Math.abs(va - vb) < 1e-12 ? 2 : va < vb ? 0 : 1;
    const dm = Math.max(a[1], b[1]);
    return {
      enonce: `Compare les nombres $${A}$ et $${B}$.`,
      mode: "choix", choix, attendu: rep,
      aides: ["Compare d'abord les parties entières.", "Si elles sont égales, écris les deux nombres avec **autant de chiffres** après la virgule (en ajoutant des zéros inutiles).", "Puis compare les parties décimales chiffre par chiffre, de gauche à droite."],
      solution: Math.floor(va) !== Math.floor(vb)
        ? `Les parties entières sont différentes : $${Math.floor(va)}$ et $${Math.floor(vb)}$. Donc ${choix[rep]}.`
        : `Même partie entière. Avec $${dm}$ chiffres après la virgule : $${ecrit(a[0] * P10(dm - a[1]), dm)}$ et $${ecrit(b[0] * P10(dm - b[1]), dm)}$. Donc ${choix[rep]}.`
    };
  };

  GEN["n6-ranger"] = function () {
    const e = rand(0, 20), croissant = Math.random() < 0.6;
    let xs;
    for (let essai = 0; essai < 50; essai++) {
      const motifs = shuffle([[rand(1, 9), 1], [rand(10, 99), 2], [rand(100, 999), 3], [rand(1, 9), 2], [rand(10, 99), 3], [rand(1, 9), 3]]).slice(0, 4);
      xs = motifs.map(([f, d]) => ({ m: e * P10(d) + f, d }));
      if (Math.random() < 0.3) xs[rand(0, 3)] = { m: e + 1, d: 0 };
      const vals = xs.map((x) => x.m / P10(x.d));
      if (new Set(vals).size < 4) continue;
      // le piège : ranger les parties décimales comme des entiers doit donner un autre ordre
      const vrai = xs.slice().sort((p, q) => p.m / P10(p.d) - q.m / P10(q.d)).map((x) => ecrit(x.m, x.d)).join();
      const piege = xs.slice().sort((p, q) => (Math.floor(p.m / P10(p.d)) - Math.floor(q.m / P10(q.d))) || ((p.m % P10(p.d)) - (q.m % P10(q.d)))).map((x) => ecrit(x.m, x.d)).join();
      if (vrai !== piege) break;
    }
    const v = (x) => x.m / P10(x.d), T = (x) => ecrit(x.m, x.d);
    const bon = xs.slice().sort((p, q) => (croissant ? 1 : -1) * (v(p) - v(q)));
    const piege = xs.slice().sort((p, q) => (croissant ? 1 : -1) * ((Math.floor(v(p)) - Math.floor(v(q))) || ((p.m % P10(p.d)) - (q.m % P10(q.d)))));
    const longueur = xs.slice().sort((p, q) => (croissant ? 1 : -1) * ((Math.floor(v(p)) - Math.floor(v(q))) || (p.d - q.d) || (v(p) - v(q))));
    const echange = bon.slice(); const k = rand(0, 2); [echange[k], echange[k + 1]] = [echange[k + 1], echange[k]];
    const inverse = bon.slice().reverse();
    const sym = croissant ? " < " : " > ";
    const fmt = (L) => `$${L.map(T).join(sym)}$`;
    const c = melange(fmt(bon), [fmt(piege), fmt(longueur), fmt(echange), fmt(inverse)]);
    return {
      enonce: `Range dans l'ordre **${croissant ? "croissant" : "décroissant"}** : $${xs.map(T).join(" \\; ; \\; ")}$.`,
      mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: [croissant ? "Ordre croissant : du plus petit au plus grand, avec le symbole $<$." : "Ordre décroissant : du plus grand au plus petit, avec le symbole $>$.", "Écris tous les nombres avec le même nombre de chiffres après la virgule.", `Exemple : $${e}{,}5 = ${e}{,}500$ est plus grand que $${e}{,}45 = ${e}{,}450$.`],
      solution: `Avec trois chiffres après la virgule : $${xs.map((x) => ecrit(x.m * P10(3 - x.d), 3)).join(" \\; ; \\; ")}$. On compare, puis on range : ${fmt(bon)}.`
    };
  };

  /* ---------- Étape 6 : encadrer, intercaler, arrondir ---------- */
  const PRECISIONS = [[0, "à l'unité", "deux nombres entiers consécutifs"], [1, "au dixième", "deux nombres à un chiffre après la virgule, écartés de $0{,}1$"], [2, "au centième", "deux nombres à deux chiffres après la virgule, écartés de $0{,}01$"]];
  // Partie entière à 1, 2 ou 3 chiffres, puis une petite phrase de contexte quand la valeur s'y prête
  const partieEntiere = () => pick([rand(0, 9), rand(1, 9), rand(10, 99), rand(100, 999)]);
  function contexte(m, d) {
    const v = m / P10(d), x = "$" + ecrit(m, d) + "$";
    const C = [];
    if (v >= 1 && v < 3 && d === 3) C.push(`À la station de Kawéni, un litre d'essence coûte ${x} €. `);
    if (v < 6) C.push(`Une planche mesure ${x} m. `, `La traversée en barge fait ${x} km. `);
    if (v >= 2 && v < 5) C.push(`Un bébé pèse ${x} kg à la naissance. `);
    if (v >= 1 && v < 30) C.push(`Un sac de riz pèse ${x} kg. `);
    if (v >= 100) C.push(`Un terrain a une aire de ${x} m². `);
    return C.length && Math.random() < 0.5 ? pick(C) : "";
  }

  GEN["n6-encadrer"] = function () {
    if (Math.random() < 0.4) { // intercaler
      // a et b = a + 1 en 10^-p (par exemple 5,45 et 5,46) ; un bon choix et des pièges, tous à p + 1 ou p + 2 chiffres après la virgule
      const p = rand(0, 2), a = rand(1, 999), A = a / P10(p), B = (a + 1) / P10(p);
      const dd = p + 1, u = rand(1, 9);
      const bon = `$${ecrit(a * 10 + u, dd)}$`;
      const cands = [[(a + 1) * 10 + u, dd], [(a - 1) * 10 + u, dd], [Math.floor(a / 10) * 1000 + u * 100 + (a % 10) * 10, dd + 1], [(a + 1) * 100 + u, dd + 1], [a * 100 - u, dd + 1]];
      const fausses = cands.filter(([m, k]) => m > 0 && !(m / P10(k) > A && m / P10(k) < B)).map(([m, k]) => `$${ecritNet(m, k)}$`);
      const c = melange(bon, fausses);
      return {
        enonce: `Quel nombre est compris entre $${ecrit(a, p)}$ et $${ecrit(a + 1, p)}$ ?`,
        mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: [`Ajoute un zéro inutile aux deux nombres : $${ecrit(a * 10, dd)}$ et $${ecrit((a + 1) * 10, dd)}$.`, `Il faut un nombre plus grand que $${ecrit(a * 10, dd)}$ et plus petit que $${ecrit((a + 1) * 10, dd)}$.`, "Compare chaque choix aux deux nombres, en écrivant le même nombre de chiffres après la virgule."],
        solution: `$${ecrit(a * 10, dd)} < ${bon.replace(/\$/g, "")} < ${ecrit((a + 1) * 10, dd)}$, donc $${ecrit(a, p)} < ${bon.replace(/\$/g, "")} < ${ecrit(a + 1, p)}$.`
      };
    }
    const [p, nom, desc] = pick(PRECISIONS), d = Math.min(3, p + rand(1, 2));
    let m; do { m = partieEntiere() * P10(d) + rand(1, P10(d) - 1); } while (m % P10(d - p) === 0 || m % 10 === 0);
    const bas = Math.floor(m / P10(d - p)), haut = bas + 1, quoi = Math.random() < 0.5;
    const rep = (quoi ? bas : haut) / P10(p);
    const ctx = contexte(m, d);
    return {
      enonce: `${ctx}On encadre $${ecrit(m, d)}$ ${nom} : $a < ${ecrit(m, d)} < b$, avec ${desc}. Que vaut $${quoi ? "a" : "b"}$ ?`,
      mode: "nombre", prefixe: `$${quoi ? "a" : "b"} =$`, attendu: rep,
      erreurs: [{ valeur: (quoi ? haut : bas) / P10(p), message: `Ça, c'est $${quoi ? "b" : "a"}$ : on cherche le nombre ${quoi ? "juste avant" : "juste après"}.` }],
      aides: [p === 0 ? "Garde seulement la partie entière : c'est $a$." : `Garde $${p}$ chiffre${p > 1 ? "s" : ""} après la virgule et coupe le reste : c'est $a$.`, `Puis $b = a + ${["1", "0{,}1", "0{,}01"][p]}$.`, `Vérifie : $a < ${ecrit(m, d)} < b$.`],
      solution: `$${ecrit(bas, p)} < ${ecrit(m, d)} < ${ecrit(haut, p)}$. Donc $${quoi ? "a" : "b"} = ${ecrit(quoi ? bas : haut, p)}$.`
    };
  };

  GEN["n6-arrondir"] = function () {
    const [p, nom] = pick(PRECISIONS), d = Math.min(3, p + rand(1, 2));
    let m; do { m = partieEntiere() * P10(d) + rand(1, P10(d) - 1); } while (m % P10(d - p) === 0 || m % 10 === 0);
    const tronc = Math.floor(m / P10(d - p)), suivant = Math.floor(m / P10(d - p - 1)) % 10;
    const arr = suivant >= 5 ? tronc + 1 : tronc;
    const ctx = contexte(m, d);
    return {
      enonce: `${ctx}Donne l'arrondi ${nom} de $${ecrit(m, d)}$.`,
      mode: "nombre", prefixe: "Arrondi :", attendu: arr / P10(p),
      erreurs: arr !== tronc ? [{ valeur: tronc / P10(p), message: `Tu as coupé sans arrondir : le chiffre suivant est $${suivant}$, le nombre est plus près de $${ecrit(arr, p)}$.` }] : [{ valeur: (tronc + 1) / P10(p), message: `Le chiffre suivant est $${suivant}$ : le nombre est plus près de $${ecrit(tronc, p)}$.` }],
      aides: [`Encadre d'abord ${nom} : $${ecrit(tronc, p)} < ${ecrit(m, d)} < ${ecrit(tronc + 1, p)}$.`, `L'arrondi est celui des deux qui est **le plus proche**. Regarde le chiffre juste après : c'est $${suivant}$.`, "De $0$ à $4$, on garde le nombre du bas ; de $5$ à $9$, on prend celui du haut."],
      solution: `$${ecrit(tronc, p)} < ${ecrit(m, d)} < ${ecrit(tronc + 1, p)}$. Le chiffre suivant est $${suivant}$ : ${suivant >= 5 ? "on prend le nombre du haut" : "on garde le nombre du bas"}. L'arrondi ${nom} est $${ecrit(arr, p)}$.`
    };
  };

  /* =====================================================================
     6e, chapitre 2 : addition, soustraction et multiplication des décimaux (préfixe o6-)
     Les décimaux sont gardés sous la forme { m, d } (m entier, valeur m / 10^d) : aucun calcul approché.
     ===================================================================== */
  const Dc = (m, d) => ({ m, d: d || 0 });
  const vD = (x) => x.m / P10(x.d);
  const tD = (x) => ecritNet(x.m, x.d);
  const addD = (a, b) => { const d = Math.max(a.d, b.d); return Dc(a.m * P10(d - a.d) + b.m * P10(d - b.d), d); };
  const subD = (a, b) => { const d = Math.max(a.d, b.d); return Dc(a.m * P10(d - a.d) - b.m * P10(d - b.d), d); };
  const mulD = (a, b) => Dc(a.m * b.m, a.d + b.d);
  // Un décimal « propre » : d chiffres après la virgule, le dernier non nul
  function decimal(maxEnt, dmax, dmin) {
    const d = rand(dmin || 0, dmax);
    let m; do { m = rand(d ? 1 : 1, (maxEnt + 1) * P10(d) - 1); } while (d && m % 10 === 0);
    return Dc(m, d);
  }
  // Mauvais alignement : on écrit les nombres l'un sous l'autre en calant les derniers chiffres
  const malAligne = (a, b, signe) => { const d = Math.max(a.d, b.d); return (a.m + signe * b.m) / P10(d); };

  // Figures : quadrillage d'une ou deux unités, partagées en 10 × 10, avec un rectangle colorié de L dixièmes sur l dixièmes
  function quadrillage(L, l) {
    const u = L > 10 ? 2 : 1, c = 13, W = u * 10 * c + 20, H = 10 * c + 20, x0 = 10, y0 = 10;
    let s = `<svg class="graph quadrillage" viewBox="0 0 ${W} ${H}" role="img" aria-label="Carré unité partagé en 100 petits carrés ; rectangle colorié de ${L} dixièmes sur ${l} dixièmes">`;
    s += `<rect class="g-aire g-colorie" x="${x0}" y="${y0 + (10 - l) * c}" width="${L * c}" height="${l * c}"/>`;
    s += `<g class="g-grid">`;
    for (let i = 0; i <= u * 10; i++) s += `<line x1="${x0 + i * c}" y1="${y0}" x2="${x0 + i * c}" y2="${y0 + 10 * c}"/>`;
    for (let j = 0; j <= 10; j++) s += `<line x1="${x0}" y1="${y0 + j * c}" x2="${x0 + u * 10 * c}" y2="${y0 + j * c}"/>`;
    s += `</g>`;
    for (let k = 0; k < u; k++) s += `<rect class="g-unite" x="${x0 + k * 10 * c}" y="${y0}" width="${10 * c}" height="${10 * c}"/>`;
    return s + `</svg>`;
  }
  FIGURES["o6-quadrillage"] = () => quadrillage(3, 4);

  GEN["o6-vocab"] = function () {
    const op = rand(0, 2), a = decimal(60, 2), b = op === 2 ? decimal(9, 1) : decimal(60, 2);
    let A = a, B = b; if (op === 1 && vD(A) < vD(B)) [A, B] = [B, A];
    if (op === 1 && vD(A) === vD(B)) A = addD(A, Dc(1, 0));
    const R = op === 0 ? addD(A, B) : op === 1 ? subD(A, B) : mulD(A, B);
    const sym = ["+", "-", "\\times"][op], NOM = ["la somme", "la différence", "le produit"][op], OPER = ["les termes", "les termes", "les facteurs"][op];
    const t = rand(0, 3);
    const egalite = `$${tD(A)} ${sym} ${tD(B)} = ${tD(R)}$`;
    const aides = ["Addition : on ajoute des **termes**, le résultat est une **somme**.", "Soustraction : le résultat est une **différence**. Multiplication : on multiplie des **facteurs**, le résultat est un **produit**.", "« Le produit de $5$ par $7$ », c'est $5 \\times 7$ ; « la différence de $9$ et de $4$ », c'est $9 - 4$."];
    const maj = (x) => x[0].toUpperCase() + x.slice(1);
    if (t === 0) {
      const c = melange(maj(NOM), ["La somme", "La différence", "Le produit", "Un facteur", "Un terme"].filter((x) => x !== maj(NOM)).slice(0, 4).sort(() => Math.random() - 0.5));
      return { enonce: `Dans l'égalité ${egalite}, comment s'appelle le nombre $${tD(R)}$ ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides, solution: `C'est le résultat d'une ${["addition", "soustraction", "multiplication"][op]} : $${tD(R)}$ est **${NOM}** de $${tD(A)}$ et de $${tD(B)}$.` };
    }
    if (t === 1) {
      const c = melange(maj(OPER), ["Les termes", "Les facteurs", "Les produits", "Les sommes", "Les différences"].filter((x) => x !== maj(OPER)));
      return { enonce: `Dans l'égalité ${egalite}, comment s'appellent les nombres $${tD(A)}$ et $${tD(B)}$ ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides, solution: `Dans une ${["addition", "soustraction", "multiplication"][op]}, les nombres qu'on ${["ajoute", "soustrait", "multiplie"][op]} s'appellent **${OPER}**.` };
    }
    if (t === 2) {
      const c = melange(maj(NOM), ["La somme", "La différence", "Le produit"].filter((x) => x !== maj(NOM)).concat(["Le facteur"]));
      return { enonce: `Complète : « … de $${tD(A)}$ ${op === 2 ? "par" : "et de"} $${tD(B)}$ vaut $${tD(R)}$. »`, mode: "choix", choix: c.choix, attendu: c.attendu, aides, solution: `$${tD(A)} ${sym} ${tD(B)} = ${tD(R)}$ : c'est **${NOM}** de $${tD(A)}$ ${op === 2 ? "par" : "et de"} $${tD(B)}$.` };
    }
    return {
      enonce: `Calcule ${NOM} de $${tD(A)}$ ${op === 2 ? "par" : "et de"} $${tD(B)}$.`,
      mode: "nombre", prefixe: "Résultat :", attendu: vD(R),
      erreurs: op !== 0 ? [{ valeur: vD(addD(A, B)), message: `Ça, c'est la somme. On demande ${NOM}.` }] : [{ valeur: vD(mulD(A, B)), message: "Ça, c'est le produit. La somme, c'est une addition." }],
      aides, solution: `${maj(NOM)} de $${tD(A)}$ ${op === 2 ? "par" : "et de"} $${tD(B)}$ : $${tD(A)} ${sym} ${tD(B)} = ${tD(R)}$.`
    };
  };

  GEN["o6-addsous"] = function () {
    let a, b;
    do { a = decimal(rand(0, 1) ? 99 : 999, 3); b = decimal(rand(0, 1) ? 99 : 999, 3); } while (a.d === b.d && Math.random() < 0.7);
    const plus = Math.random() < 0.5;
    if (!plus && vD(a) < vD(b)) [a, b] = [b, a];
    if (!plus && vD(a) === vD(b)) a = addD(a, Dc(rand(1, 9), 0));
    const R = plus ? addD(a, b) : subD(a, b), d = Math.max(a.d, b.d);
    const naif = malAligne(a, b, plus ? 1 : -1);
    const col = `\\begin{array}{r} ${ecrit(a.m * P10(d - a.d), d)} \\\\ ${plus ? "+" : "-"}\\ ${ecrit(b.m * P10(d - b.d), d)} \\\\ \\hline ${ecrit(R.m, d)} \\end{array}`;
    return {
      enonce: `Calcule : $${tD(a)} ${plus ? "+" : "-"} ${tD(b)}$.`,
      mode: "nombre", prefixe: "Résultat :", attendu: vD(R),
      erreurs: naif !== vD(R) && naif >= 0 ? [{ valeur: naif, message: "Les virgules doivent être l'une sous l'autre : aligne les unités avec les unités, les dixièmes avec les dixièmes." }] : [],
      aides: ["Pose l'opération en colonnes, **virgule sous virgule**.", `Complète par des zéros inutiles pour avoir $${d}$ chiffre${d > 1 ? "s" : ""} après la virgule dans les deux nombres.`, plus ? "Additionne de droite à gauche, sans oublier les retenues." : "Soustrais de droite à gauche ; si le chiffre du haut est trop petit, emprunte une unité au rang de gauche."],
      solution: `On aligne les virgules : $${col}$. Donc $${tD(a)} ${plus ? "+" : "-"} ${tD(b)} = ${tD(R)}$.`
    };
  };

  GEN["o6-calcul"] = function () {
    const t = rand(0, 4), n = () => rand(2, 30), dn = () => (Math.random() < 0.4 ? Dc(rand(11, 99), 1) : Dc(rand(2, 40), 0));
    let tex, R, faux, etapes, prem;
    if (t === 0) { // a + b - c ou a - b + c, de gauche à droite
      let a = dn(), b = dn(), c = dn();
      if (Math.random() < 0.5) { while (vD(a) + vD(b) < vD(c)) a = addD(a, Dc(10, 0)); R = subD(addD(a, b), c); tex = `${tD(a)} + ${tD(b)} - ${tD(c)}`; faux = null; prem = `${tD(a)} + ${tD(b)}`; etapes = [`${tD(addD(a, b))} - ${tD(c)}`]; }
      else { while (vD(a) < vD(b) + vD(c) + 0.0001) a = addD(a, Dc(10, 0)); R = addD(subD(a, b), c); tex = `${tD(a)} - ${tD(b)} + ${tD(c)}`; faux = vD(subD(a, addD(b, c))); prem = `${tD(a)} - ${tD(b)}`; etapes = [`${tD(subD(a, b))} + ${tD(c)}`]; }
    } else if (t === 1) { // a - (b + c)
      const b = dn(), c = dn(); let a = dn(); while (vD(a) < vD(b) + vD(c)) a = addD(a, Dc(10, 0));
      R = subD(a, addD(b, c)); tex = `${tD(a)} - (${tD(b)} + ${tD(c)})`; faux = vD(addD(subD(a, b), c)); etapes = [`${tD(a)} - ${tD(addD(b, c))}`];
    } else if (t === 2) { // a × (b - c) ou (a + b) × c, avec des entiers
      const a = rand(2, 9), b = rand(5, 20), c = rand(1, b - 1);
      if (Math.random() < 0.5) { R = Dc(a * (b - c)); tex = `${a} \\times (${b} - ${c})`; faux = a * b - c; etapes = [`${a} \\times ${b - c}`]; }
      else { R = Dc((b + c) * a); tex = `(${b} + ${c}) \\times ${a}`; faux = b + c * a; etapes = [`${b + c} \\times ${a}`]; }
    } else if (t === 3) { // a - (b - c)
      const c = n(), b = c + n(); let a = b + n();
      R = Dc(a - (b - c)); tex = `${a} - (${b} - ${c})`; faux = a - b - c; etapes = [`${a} - ${b - c}`];
    } else { // parenthèses doubles
      const e = rand(1, 9), c = rand(1, 9), b = c + e + rand(1, 12), a = b - c - e + rand(5, 30);
      R = Dc(a - (b - (c + e))); tex = `${a} - (${b} - (${c} + ${e}))`; faux = a - (b - c) + e; etapes = [`${a} - (${b} - ${c + e})`, `${a} - ${b - (c + e)}`];
    }
    const L = pick(["A", "B", "C", "D", "E"]);
    return {
      enonce: `Calcule $${L} = ${tex}$.`,
      mode: "nombre", prefixe: `$${L} =$`, attendu: vD(R),
      erreurs: faux !== null && faux !== undefined && Math.abs(faux - vD(R)) > 1e-9 ? [{ valeur: faux, message: t === 0 ? "Sans parenthèses, avec seulement $+$ et $-$, on calcule **de gauche à droite**." : "Commence par le calcul **entre parenthèses**." }] : [],
      aides: t === 0
        ? ["Il n'y a que des additions et des soustractions : on calcule **de gauche à droite**.", `Commence par $${prem}$.`, "Écris une ligne par étape, avec le signe $=$ au début de chaque ligne."]
        : ["On commence **toujours** par les calculs entre parenthèses.", t === 4 ? "Avec deux paires de parenthèses, on commence par les plus **intérieures**." : "Remplace la parenthèse par son résultat, puis termine le calcul.", "Écris une ligne par étape, avec le signe $=$ au début de chaque ligne."],
      solution: `$${L} = ${tex}$\n\n` + etapes.map((e) => `$${L} = ${e}$`).join("\n\n") + `\n\n$${L} = ${tD(R)}$`
    };
  };

  GEN["o6-astuce"] = function () {
    const t = rand(0, 3);
    if (t === 0) { // regrouper des facteurs
      const [p, q, pv] = pick([[Dc(25, 1), Dc(4), 10], [Dc(5, 1), Dc(2), 1], [Dc(25), Dc(4), 100], [Dc(5), Dc(2), 10], [Dc(2), Dc(50), 100], [Dc(25, 2), Dc(4), 1], [Dc(125, 1), Dc(8), 100], [Dc(5), Dc(20), 100]]);
      const k = rand(3, 99), ord = shuffle([tD(p), tD(q), String(k)]);
      return {
        enonce: `Calcule astucieusement : $${ord.join(" \\times ")}$.`,
        mode: "nombre", prefixe: "Résultat :", attendu: pv * k,
        aides: ["Dans une multiplication, on peut changer l'ordre des facteurs et les regrouper comme on veut.", `Cherche deux facteurs dont le produit est un nombre « rond » : $${tD(p)} \\times ${tD(q)} = ${pv}$.`, `Il reste à calculer $${pv} \\times ${k}$.`],
        solution: `$${ord.join(" \\times ")} = (${tD(p)} \\times ${tD(q)}) \\times ${k} = ${pv} \\times ${k} = ${ecrit(pv * k)}$.`
      };
    }
    if (t === 1) { // regrouper des termes
      const f = rand(1, 9), x = Dc(rand(1, 30) * 10 + f, 1), z = Dc(rand(1, 30) * 10 + (10 - f), 1), y = decimal(50, 1, 1);
      const ord = shuffle([x, y, z]).map(tD), R = addD(addD(x, y), z), xz = addD(x, z);
      return {
        enonce: `Calcule astucieusement : $${ord.join(" + ")}$.`,
        mode: "nombre", prefixe: "Résultat :", attendu: vD(R),
        aides: ["Dans une addition, on peut changer l'ordre des termes et les regrouper comme on veut.", "Cherche deux termes dont les dixièmes font une unité entière.", `$${tD(x)} + ${tD(z)} = ${tD(xz)}$.`],
        solution: `$${ord.join(" + ")} = (${tD(x)} + ${tD(z)}) + ${tD(y)} = ${tD(xz)} + ${tD(y)} = ${tD(R)}$.`
      };
    }
    if (t === 2) { // multiplier par 0,5 ; 4 ; 5 ; 20 ; 50
      const [f, regle] = pick([[Dc(5, 1), "Multiplier par $0{,}5$, c'est prendre la **moitié**."], [Dc(4), "Multiplier par $4$, c'est prendre le **double du double**."], [Dc(5), "Multiplier par $5$, c'est multiplier par $10$ puis prendre la moitié."], [Dc(20), "Multiplier par $20$, c'est multiplier par $2$ puis par $10$."], [Dc(50), "Multiplier par $50$, c'est multiplier par $100$ puis prendre la moitié."]]);
      const x = Math.random() < 0.6 ? Dc(rand(6, 99) * 2) : Dc(rand(11, 99), 1);
      const R = mulD(x, f);
      return {
        enonce: `Calcule mentalement : $${tD(x)} \\times ${tD(f)}$.`,
        mode: "nombre", prefixe: "Résultat :", attendu: vD(R),
        aides: [regle, "Fais le calcul en deux étapes simples, sans poser l'opération.", "Vérifie avec un ordre de grandeur."],
        solution: `${regle} $${tD(x)} \\times ${tD(f)} = ${tD(R)}$.`
      };
    }
    // ajouter ou soustraire 9 ; 99 ; 0,9 ; 0,99 ; 299
    const [k, rond, ec, mot] = pick([[Dc(9), Dc(10), Dc(1), "10"], [Dc(99), Dc(100), Dc(1), "100"], [Dc(9, 1), Dc(1), Dc(1, 1), "1"], [Dc(99, 2), Dc(1), Dc(1, 2), "1"], [Dc(299), Dc(300), Dc(1), "300"], [Dc(19), Dc(20), Dc(1), "20"]]);
    const plus = Math.random() < 0.5;
    let x = decimal(500, 2); while (!plus && vD(x) <= vD(k)) x = addD(x, Dc(300));
    const R = plus ? addD(x, k) : subD(x, k);
    return {
      enonce: `Calcule mentalement : $${tD(x)} ${plus ? "+" : "-"} ${tD(k)}$.`,
      mode: "nombre", prefixe: "Résultat :", attendu: vD(R),
      erreurs: [{ valeur: vD(plus ? addD(x, rond) : subD(x, rond)), message: `Tu as ${plus ? "ajouté" : "retiré"} $${mot}$ : il faut encore ${plus ? "retirer" : "ajouter"} $${tD(ec)}$.` }],
      aides: [`$${tD(k)}$, c'est $${mot} - ${tD(ec)}$.`, `${plus ? "Ajoute" : "Retire"} $${mot}$, c'est plus facile.`, `Puis ${plus ? "retire" : "ajoute"} $${tD(ec)}$ pour corriger.`],
      solution: `$${tD(x)} ${plus ? "+" : "-"} ${tD(k)} = ${tD(x)} ${plus ? "+" : "-"} ${mot} ${plus ? "-" : "+"} ${tD(ec)} = ${tD(plus ? addD(x, rond) : subD(x, rond))} ${plus ? "-" : "+"} ${tD(ec)} = ${tD(R)}$.`
    };
  };

  GEN["o6-quadrillage"] = function () {
    const L = rand(1, 19), l = rand(1, 9);
    if (L === 10) return GEN["o6-quadrillage"]();
    const A = Dc(L, 1), B = Dc(l, 1), R = mulD(A, B);
    const fig = quadrillage(L, l);
    if (Math.random() < 0.35) {
      const bon = `$${tD(A)} \\times ${tD(B)}$`;
      const c = melange(bon, [`$${L} \\times ${l}$`, `$${tD(A)} + ${tD(B)}$`, `$${tD(Dc(L, 2))} \\times ${tD(B)}$`, `$${tD(A)} \\times ${l}$`]);
      return {
        enonce: "Le grand carré a une aire de $1$ (une unité). Quelle multiplication donne l'aire de la partie coloriée ?",
        figure: fig, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Le côté du grand carré mesure $1$ : il est partagé en $10$ parts. Chaque part mesure $0{,}1$.", `La partie coloriée mesure $${L}$ parts sur $${l}$ parts.`, "L'aire d'un rectangle est longueur $\\times$ largeur."],
        solution: `La partie coloriée est un rectangle de $${tD(A)}$ sur $${tD(B)}$ : son aire est ${bon}, soit $${L * l}$ petits carrés de $0{,}01$, donc $${tD(R)}$.`
      };
    }
    return {
      enonce: `Le grand carré a une aire de $1$ (une unité). À l'aide de la figure, calcule $${tD(A)} \\times ${tD(B)}$.`,
      figure: fig, mode: "nombre", prefixe: "Résultat :", attendu: vD(R),
      erreurs: [{ valeur: (L * l) / 10, message: `Un petit carré n'est pas un dixième de l'unité : il en faut $100$ pour remplir le grand carré.` }, { valeur: L * l, message: "Compare au grand carré : la partie coloriée est-elle plus grande que l'unité ?" }],
      aides: ["Le grand carré est partagé en $100$ petits carrés : chacun a une aire de $0{,}01$ (un centième).", `La partie coloriée contient $${L} \\times ${l}$ petits carrés.`, `Il y a donc $${L * l}$ centièmes.`],
      solution: `La partie coloriée contient $${L} \\times ${l} = ${L * l}$ petits carrés, soit $${L * l}$ centièmes : $${tD(A)} \\times ${tD(B)} = ${tD(R)}$.${L > 10 ? " Elle déborde sur le deuxième carré : le résultat est plus grand que $" + tD(B) + "$." : " Le résultat est plus petit que chacun des deux facteurs."}`
    };
  };

  GEN["o6-produit"] = function () {
    const a = decimal(rand(0, 1) ? 9 : 99, 2, 1), b = Math.random() < 0.3 ? Dc(rand(2, 9)) : decimal(rand(0, 1) ? 9 : 30, 2, 1);
    if (a.m * b.m > 99999) return GEN["o6-produit"]();
    const R = mulD(a, b), nd = a.d + b.d;
    if (Math.random() < 0.3) {
      return {
        enonce: `On sait que $${ecrit(a.m)} \\times ${ecrit(b.m)} = ${ecrit(a.m * b.m)}$. Calcule $${tD(a)} \\times ${tD(b)}$.`,
        mode: "nombre", prefixe: "Résultat :", attendu: vD(R),
        erreurs: [{ valeur: (a.m * b.m) / P10(Math.max(a.d, b.d)), message: "Compte les chiffres après la virgule dans **les deux** facteurs, et additionne-les." }],
        aides: [`$${tD(a)} = ${ecrit(a.m)} \\times ${tD(Dc(1, a.d))}$${b.d ? ` et $${tD(b)} = ${ecrit(b.m)} \\times ${tD(Dc(1, b.d))}$` : ""}.`, `Le produit a donc autant de chiffres après la virgule que les deux facteurs ensemble : $${a.d} + ${b.d} = ${nd}$.`, `Pars de $${ecrit(a.m * b.m)}$ et place la virgule pour avoir $${nd}$ chiffre${nd > 1 ? "s" : ""} après elle.`],
        solution: `$${tD(a)} \\times ${tD(b)} = ${ecrit(a.m)} \\times ${ecrit(b.m)} \\times ${tD(Dc(1, nd))} = ${ecrit(a.m * b.m)} \\times ${tD(Dc(1, nd))} = ${tD(R)}$.`
      };
    }
    const errs = [{ valeur: (a.m * b.m) / P10(nd - 1), message: "La virgule n'est pas au bon endroit : compte les chiffres après la virgule dans les deux facteurs." }, { valeur: (a.m * b.m) / P10(nd + 1), message: "La virgule n'est pas au bon endroit : compte les chiffres après la virgule dans les deux facteurs." }];
    // erreur classique : multiplier les parties entières, puis les parties décimales
    const ea = Math.floor(vD(a)), eb = Math.floor(vD(b)), fa = a.m % P10(a.d), fb = b.m % P10(b.d);
    if (a.d === b.d && a.d === 1 && ea && eb) errs.push({ valeur: +(String(ea * eb) + "." + String(fa * fb)), message: "On ne multiplie pas séparément les parties entières et les parties décimales : pose la multiplication sans les virgules." });
    return {
      enonce: `Calcule : $${tD(a)} \\times ${tD(b)}$.`,
      mode: "nombre", prefixe: "Résultat :", attendu: vD(R),
      erreurs: errs,
      aides: ["Multiplie d'abord les nombres **sans les virgules**, comme des entiers.", `Compte les chiffres après la virgule : $${a.d}$ ${b.d ? `et $${b.d}$` : "et $0$"}, soit $${nd}$ en tout.`, `Place la virgule dans le résultat pour avoir $${nd}$ chiffre${nd > 1 ? "s" : ""} après elle, puis contrôle avec un ordre de grandeur.`],
      solution: `$${ecrit(a.m)} \\times ${ecrit(b.m)} = ${ecrit(a.m * b.m)}$ ; il faut $${nd}$ chiffre${nd > 1 ? "s" : ""} après la virgule : $${tD(a)} \\times ${tD(b)} = ${tD(R)}$. Ordre de grandeur : $${ordre(vD(a))} \\times ${ordre(vD(b))} = ${nb(ordre(vD(a)) * ordre(vD(b)))}$.`.replace(/\{,\}0+\$/, "$")
    };
  };
  // Valeur « ronde » proche, pour un ordre de grandeur (un seul chiffre significatif)
  function ordre(x) { if (x <= 0) return 0; const p = Math.floor(Math.log10(x)); const r = Math.round(x / 10 ** p) * 10 ** p; return +r.toPrecision(1); }

  GEN["o6-virgule"] = function () {
    const A = rand(12, 999), B = rand(2, 99), P = A * B;
    const da = rand(0, 2), db = rand(da ? 0 : 1, 2), nd = da + db;
    if (A % 10 === 0 || B % 10 === 0) return GEN["o6-virgule"]();
    const bon = `$${tD(Dc(P, nd))}$`;
    const fausses = [nd - 1, nd + 1, nd - 2, nd + 2, Math.max(da, db)].filter((k) => k >= 0 && k !== nd).map((k) => `$${tD(Dc(P, k))}$`);
    const c = melange(bon, [...new Set(fausses)]);
    return {
      enonce: `On sait que $${ecrit(A)} \\times ${ecrit(B)} = ${ecrit(P)}$. Combien vaut $${tD(Dc(A, da))} \\times ${tD(Dc(B, db))}$ ?`,
      mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Compte les chiffres après la virgule dans chaque facteur.", `Ici : $${da} + ${db} = ${nd}$ chiffre${nd > 1 ? "s" : ""} après la virgule dans le produit.`, "Contrôle avec un ordre de grandeur."],
      solution: `$${da} + ${db} = ${nd}$ chiffre${nd > 1 ? "s" : ""} après la virgule : $${tD(Dc(A, da))} \\times ${tD(Dc(B, db))} = ${tD(Dc(P, nd))}$. Ordre de grandeur : $${nb(ordre(A / P10(da)))} \\times ${nb(ordre(B / P10(db)))} = ${nb(+(ordre(A / P10(da)) * ordre(B / P10(db))).toPrecision(6))}$.`
    };
  };

  GEN["o6-ordre"] = function () {
    const somme = Math.random() < 0.3;
    if (somme) {
      const a = decimal(rand(0, 1) ? 99 : 999, 2, 1), b = decimal(rand(0, 1) ? 99 : 999, 2, 1), R = addD(a, b);
      const oa = ordre(vD(a)), ob = ordre(vD(b)), og = oa + ob;
      const c = melange(`$${nb(og)}$`, [og * 10, og / 10, og * 100, og + oa].filter((x) => x !== og && x > 0).map((x) => `$${nb(x)}$`));
      return {
        enonce: `Quel est le meilleur ordre de grandeur de $${tD(a)} + ${tD(b)}$ ?`,
        mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Remplace chaque nombre par une valeur « ronde » proche.", `$${tD(a)} \\approx ${nb(oa)}$ et $${tD(b)} \\approx ${nb(ob)}$.`, "Fais le calcul avec les valeurs rondes."],
        solution: `$${tD(a)} + ${tD(b)} \\approx ${nb(oa)} + ${nb(ob)} = ${nb(og)}$. (Le résultat exact est $${tD(R)}$.)`
      };
    }
    let a, b; do { a = decimal(rand(0, 1) ? 9 : 99, 2, 1); b = decimal(rand(0, 1) ? 9 : 50, 2, 1); } while (vD(a) < 1.5 || vD(b) < 1.5);
    const R = mulD(a, b), og = ordre(vD(a)) * ordre(vD(b));
    const ks = shuffle([-2, -1, 1, 2]).slice(0, 3);
    const bon = `$${tD(R)}$`;
    const c = melange(bon, ks.map((k) => `$${tD(k > 0 ? Dc(R.m * P10(k), R.d) : Dc(R.m, R.d - k))}$`));
    return {
      enonce: `Sans poser la multiplication, trouve le bon résultat de $${tD(a)} \\times ${tD(b)}$.`,
      mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Cherche un ordre de grandeur : remplace chaque facteur par une valeur ronde proche.", `$${tD(a)} \\approx ${nb(ordre(vD(a)))}$ et $${tD(b)} \\approx ${nb(ordre(vD(b)))}$.`, `$${nb(ordre(vD(a)))} \\times ${nb(ordre(vD(b)))} = ${nb(og)}$ : choisis le résultat le plus proche.`],
      solution: `Ordre de grandeur : $${nb(ordre(vD(a)))} \\times ${nb(ordre(vD(b)))} = ${nb(og)}$. Le seul résultat proche est $${tD(R)}$.`
    };
  };

  GEN["o6-probleme"] = function () {
    const t = rand(0, 5);
    const eur = (c) => (c % 100 ? ecrit(c, 2) : ecrit(c / 100)), eurD = (x) => eur(Math.round(vD(x) * 100)); // prix avec deux décimales (c en centimes)
    if (t === 0) { // marché : monnaie rendue
      const kg = Dc(rand(2, 6) * 5, 1), prix = Dc(rand(15, 60) * 10, 2), regime = rand(20, 80) * 10; // prix en €/kg, régime en centimes
      const mangues = mulD(kg, prix); const cm = mangues.m * P10(4 - mangues.d) / 100; // centimes
      if (!Number.isInteger(cm)) return GEN["o6-probleme"]();
      const total = cm + regime, billet = total < 1000 ? 1000 : total < 2000 ? 2000 : 5000;
      return {
        enonce: `Au marché de Mamoudzou, tu achètes $${tD(kg)}$ kg de mangues à $${eurD(prix)}$ € le kilo et un régime de bananes à $${eur(regime)}$ €. Tu paies avec un billet de $${billet / 100}$ €. Combien te rend-on ?`,
        mode: "nombre", prefixe: "On te rend", suffixe: "€", attendu: (billet - total) / 100,
        erreurs: [{ valeur: total / 100, message: "Ça, c'est ce que tu paies. On demande la monnaie rendue." }, { valeur: (billet - cm) / 100, message: "N'oublie pas les bananes." }],
        aides: [`Prix des mangues : $${tD(kg)} \\times ${eurD(prix)}$.`, "Ajoute le prix du régime de bananes pour avoir le total.", `La monnaie rendue, c'est $${billet / 100}$ € moins le total.`],
        solution: `Mangues : $${tD(kg)} \\times ${eurD(prix)} = ${eur(cm)}$ €. Total : $${eur(cm)} + ${eur(regime)} = ${eur(total)}$ €. Monnaie : $${billet / 100} - ${eur(total)} = ${eur(billet - total)}$ €.`
      };
    }
    if (t === 1) { // grillage autour d'un enclos rectangulaire
      const L = decimal(40, 2, 1), l = decimal(20, 2, 1), P = addD(addD(L, L), addD(l, l));
      return {
        enonce: `Un enclos à chèvres rectangulaire mesure $${tD(L)}$ m de long et $${tD(l)}$ m de large. Quelle longueur de grillage faut-il pour en faire le tour ?`,
        mode: "nombre", prefixe: "Longueur :", suffixe: "m", attendu: vD(P),
        erreurs: [{ valeur: vD(addD(L, l)), message: "Ça, c'est la moitié du tour : il y a deux longueurs et deux largeurs." }, { valeur: vD(mulD(L, l)), message: "Ça, c'est l'aire. Le tour, c'est le périmètre : on additionne les côtés." }],
        aides: ["Faire le tour, c'est additionner les longueurs des quatre côtés.", "Un rectangle a deux longueurs et deux largeurs.", "Pose l'addition virgule sous virgule."],
        solution: `$${tD(L)} + ${tD(L)} + ${tD(l)} + ${tD(l)} = ${tD(P)}$ : il faut $${tD(P)}$ m de grillage.`
      };
    }
    if (t === 2) { // essence
      const litres = rand(8, 45), prix = Dc(rand(180, 210), 2), R = mulD(Dc(litres), prix);
      return {
        enonce: `À la station, un litre d'essence coûte $${eurD(prix)}$ €. Combien paie-t-on pour $${litres}$ litres ?`,
        mode: "nombre", prefixe: "Prix :", suffixe: "€", attendu: vD(R),
        erreurs: [{ valeur: (litres * prix.m) / 10, message: "La virgule n'est pas au bon endroit : vérifie avec un ordre de grandeur (environ $2$ € le litre)." }],
        aides: ["Un litre coûte $" + eurD(prix) + "$ € : pour plusieurs litres, on multiplie.", `Calcule $${litres} \\times ${eurD(prix)}$.`, `Ordre de grandeur : $${litres} \\times 2 = ${litres * 2}$ €.`],
        solution: `$${litres} \\times ${eurD(prix)} = ${eurD(R)}$ : on paie $${eurD(R)}$ €.`
      };
    }
    if (t === 3) { // plongée : différence de profondeurs
      const a = decimal(30, 2, 1), b = decimal(15, 2, 1); let A = a, B = b; if (vD(A) < vD(B)) [A, B] = [B, A]; if (vD(A) === vD(B)) A = addD(A, Dc(3));
      const R = subD(A, B);
      return {
        enonce: `Dans le lagon, une plongeuse descend à $${tD(A)}$ m de profondeur, puis remonte jusqu'à $${tD(B)}$ m de profondeur. De combien de mètres est-elle remontée ?`,
        mode: "nombre", prefixe: "Elle est remontée de", suffixe: "m", attendu: vD(R),
        erreurs: [{ valeur: vD(addD(A, B)), message: "On cherche l'écart entre les deux profondeurs : c'est une soustraction." }, { valeur: malAligne(A, B, -1), message: "Aligne les virgules avant de soustraire." }],
        aides: ["On cherche l'écart entre deux profondeurs.", `Calcule $${tD(A)} - ${tD(B)}$.`, "Pose la soustraction virgule sous virgule."],
        solution: `$${tD(A)} - ${tD(B)} = ${tD(R)}$ : elle est remontée de $${tD(R)}$ m.`
      };
    }
    if (t === 4) { // aire d'une parcelle
      const L = decimal(30, 1, 1), l = decimal(12, 1, 1), R = mulD(L, l);
      return {
        enonce: `Une parcelle rectangulaire de manioc mesure $${tD(L)}$ m sur $${tD(l)}$ m. Quelle est son aire ?`,
        mode: "nombre", prefixe: "Aire :", suffixe: "m²", attendu: vD(R),
        erreurs: [{ valeur: vD(addD(addD(L, L), addD(l, l))), message: "Ça, c'est le périmètre (le tour). L'aire, c'est longueur × largeur." }, { valeur: (L.m * l.m) / 10, message: "La virgule n'est pas au bon endroit : il faut deux chiffres après la virgule." }],
        aides: ["L'aire d'un rectangle, c'est longueur $\\times$ largeur.", `Calcule $${tD(L)} \\times ${tD(l)}$ : d'abord sans les virgules.`, "Le produit a autant de chiffres après la virgule que les deux facteurs ensemble."],
        solution: `$${tD(L)} \\times ${tD(l)} = ${tD(R)}$ : l'aire est $${tD(R)}$ m².`
      };
    }
    // sortie scolaire : prix pour un groupe
    const n = rand(12, 35), prix = Dc(rand(15, 95) * 10, 2), car = rand(80, 250);
    const R = addD(mulD(Dc(n), prix), Dc(car));
    return {
      enonce: `Pour une sortie à la plage de N'Gouja, la classe loue un car pour $${car}$ € et chacun des $${n}$ élèves paie un repas de $${eurD(prix)}$ €. Combien coûte la sortie en tout ?`,
      mode: "nombre", prefixe: "Total :", suffixe: "€", attendu: vD(R),
      erreurs: [{ valeur: vD(mulD(Dc(n), prix)), message: "N'oublie pas le prix du car." }, { valeur: car + vD(prix), message: "Le repas est payé par chaque élève : multiplie par le nombre d'élèves." }],
      aides: [`Prix des repas : $${n} \\times ${eurD(prix)}$.`, "Ajoute ensuite le prix du car.", "Vérifie avec un ordre de grandeur."],
      solution: `Repas : $${n} \\times ${eurD(prix)} = ${eurD(mulD(Dc(n), prix))}$ €. Total : $${eurD(mulD(Dc(n), prix))} + ${car} = ${eurD(R)}$ €.`
    };
  };

  /* Une « erreur connue » ne doit jamais coïncider avec la bonne réponse ; propriétés internes retirées */
  Object.keys(GEN).filter((k) => /^(n6|o6)-/.test(k)).forEach((k) => {
    const g = GEN[k];
    GEN[k] = (i) => {
      const q = g(i);
      if (q.erreurs) q.erreurs = q.erreurs.filter((e) => Math.abs(e.valeur - q.attendu) >= (q.tolerance || 1e-9));
      return q;
    };
  });

  window.PM_EXO.college = { enLettres, ecrit, demiDroite };
})();
