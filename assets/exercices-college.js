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

  /* =====================================================================
     6e, chapitre 3 : division euclidienne, division décimale et durées (préfixe d6-)
     Programme : division euclidienne d'un entier par un entier inférieur à 100,
     division d'un décimal par un entier non nul inférieur à 10.
     ===================================================================== */
  const diviseurs = (n) => { const d = []; for (let k = 1; k <= n; k++) if (n % k === 0) d.push(k); return d; };
  // Horaire ou durée : « $14$ h $05$ » (min sur deux chiffres pour un horaire)
  const hTex = (h, m, horaire) => `$${h}$ h${m || horaire ? ` $${horaire ? String(m).padStart(2, "0") : m}$${horaire ? "" : " min"}` : ""}`;
  const minTex = (t, horaire) => hTex(Math.floor(t / 60), t % 60, horaire);

  GEN["d6-multiples"] = function () {
    const t = rand(0, 4);
    if (t === 0 || t === 1) { // un multiple parmi quatre, ou un non-diviseur parmi quatre
      const b = rand(3, 15);
      if (t === 0) {
        const k = rand(4, 30), bon = b * k;
        const fausses = shuffle([bon + 1, bon - 1, bon + rand(2, b - 1), bon - rand(2, b - 1), b * 10 + 1, bon + b + 1]).filter((x) => x > 0 && x % b !== 0);
        const c = melange(`$${ecrit(bon)}$`, fausses.map((x) => `$${ecrit(x)}$`));
        return { enonce: `Lequel de ces nombres est un **multiple** de $${b}$ ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
          aides: [`Un multiple de $${b}$ est un nombre de la table de $${b}$ : $${b} \\times 1$, $${b} \\times 2$, $${b} \\times 3$…`, `Pour chaque nombre, cherche s'il existe un entier $k$ avec $${b} \\times k$ égal à ce nombre.`, `Tu peux aussi diviser par $${b}$ : un multiple donne un reste nul.`],
          solution: `$${ecrit(bon)} = ${b} \\times ${k}$ : c'est un multiple de $${b}$. Les autres nombres donnent un reste non nul quand on les divise par $${b}$.` };
      }
      const n = pick([12, 18, 20, 24, 30, 36, 40, 42, 48, 50, 54, 56, 60, 63, 64, 72, 75, 80, 84, 90, 96, 100]);
      const D = diviseurs(n).filter((x) => x > 1 && x < n), non = shuffle(Array.from({ length: Math.min(n - 2, 20) }, (_, i) => i + 2).filter((x) => n % x !== 0))[0];
      if (D.length < 3 || !non) return GEN["d6-multiples"]();
      const c = melange(`$${non}$`, shuffle(D).slice(0, 3).map((x) => `$${x}$`));
      return { enonce: `Lequel de ces nombres n'est **pas** un diviseur de $${n}$ ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: [`$a$ est un diviseur de $${n}$ si $${n}$ est dans la table de $a$.`, `Pour chaque nombre, divise $${n}$ par ce nombre : le reste est-il nul ?`, "Pense aux tables de multiplication."],
        solution: `$${n} = ${non} \\times ${Math.floor(n / non)} + ${n % non}$ : le reste n'est pas nul, donc $${non}$ n'est pas un diviseur de $${n}$. Les autres le sont : ${shuffle(D).slice(0, 2).map((x) => `$${n} = ${x} \\times ${n / x}$`).join(" ; ")}.` };
    }
    if (t === 2) { // critères de divisibilité par 2, 5 ou 10
      const [p, regle] = pick([[2, "son chiffre des unités est $0$, $2$, $4$, $6$ ou $8$ (il est pair)"], [5, "son chiffre des unités est $0$ ou $5$"], [10, "son chiffre des unités est $0$"]]);
      const base = rand(10, 9999) * 10, ok = base + pick(p === 2 ? [0, 2, 4, 6, 8] : p === 5 ? [0, 5] : [0]);
      const fausses = shuffle([1, 3, 7, 9, p === 2 ? 5 : 2, p === 10 ? 5 : 1].map((u) => base + u)).filter((x) => x % p !== 0);
      const c = melange(`$${ecrit(ok)}$`, [...new Set(fausses)].map((x) => `$${ecrit(x)}$`));
      return { enonce: `Lequel de ces nombres est **divisible par ${p}** ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Il suffit de regarder le **chiffre des unités**.", `Un nombre est divisible par $${p}$ si ${regle}.`, "Pas besoin de poser de division."],
        solution: `$${ecrit(ok)}$ est divisible par $${p}$ : ${regle}.` };
    }
    if (t === 3) { // le plus petit multiple au-dessus d'un seuil
      const b = rand(6, 25), s = rand(50, 400), rep = (Math.floor(s / b) + 1) * b;
      return { enonce: `Quel est le plus petit multiple de $${b}$ strictement supérieur à $${s}$ ?`, mode: "nombre", prefixe: "Le multiple est", attendu: rep,
        erreurs: [{ valeur: rep - b, message: `Ce multiple est plus petit que $${s}$ (ou égal) : prends le suivant.` }],
        aides: [`Divise $${s}$ par $${b}$ : quel est le quotient ?`, `$${b} \\times ${Math.floor(s / b)} = ${b * Math.floor(s / b)}$.`, `Le multiple suivant est $${b} \\times ${Math.floor(s / b) + 1}$.`],
        solution: `$${s} = ${b} \\times ${Math.floor(s / b)} + ${s % b}$, donc le multiple cherché est $${b} \\times ${Math.floor(s / b) + 1} = ${rep}$.` };
    }
    // vocabulaire : 56 = 8 × 7
    const a = rand(3, 12), b = rand(3, 12), n = a * b;
    const bon = `$${n}$ est un multiple de $${a}$`;
    const c = melange(bon, [`$${a}$ est un multiple de $${n}$`, `$${n}$ est un diviseur de $${a}$`, `$${a}$ est divisible par $${n}$`]);
    return { enonce: `On sait que $${n} = ${a} \\times ${b}$. Quelle phrase est juste ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: [`Dans $${n} = ${a} \\times ${b}$, le grand nombre $${n}$ est dans la table de $${a}$ et de $${b}$.`, `On dit : $${n}$ est un **multiple** de $${a}$ ; $${a}$ est un **diviseur** de $${n}$ ; $${n}$ est **divisible** par $${a}$.`, "Un diviseur est plus petit que (ou égal à) son multiple."],
      solution: `$${n} = ${a} \\times ${b}$ : $${n}$ est un multiple de $${a}$ et de $${b}$, et $${a}$ et $${b}$ sont des diviseurs de $${n}$. Donc : ${bon}.` };
  };

  GEN["d6-euclide"] = function () {
    const b = Math.random() < 0.5 ? rand(2, 9) : rand(11, 99), q = rand(b < 10 ? 12 : 2, b < 10 ? 999 : 99), r = rand(0, b - 1), a = b * q + r;
    const t = rand(0, 3);
    if (t === 3) {
      const bon = `$${ecrit(a)} = ${b} \\times ${q} + ${r}$`;
      const fausses = [q > 1 ? `$${ecrit(a)} = ${b} \\times ${q - 1} + ${r + b}$` : null, `$${ecrit(a)} = ${b} \\times ${q + 1} - ${b - r}$`, `$${b} = ${ecrit(a)} \\times ${q} + ${r}$`, `$${ecrit(a)} = ${r} \\times ${q} + ${b}$`].filter(Boolean);
      const c = melange(bon, fausses);
      return { enonce: `Quelle égalité traduit la division euclidienne de $${ecrit(a)}$ par $${b}$ ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["L'égalité de la division euclidienne : dividende $=$ diviseur $\\times$ quotient $+$ reste.", "Le reste est toujours **plus petit que le diviseur**.", "Il n'y a pas de soustraction dans l'égalité euclidienne."],
        solution: `${bon}, avec un reste $${r} < ${b}$. Dans $${ecrit(a)} = ${b} \\times ${q > 1 ? q - 1 : q} + ${q > 1 ? r + b : r}$, le reste serait trop grand.` };
    }
    const quoi = t === 0 ? "quotient" : "reste";
    return {
      enonce: t === 2 ? `Complète l'égalité de la division euclidienne : $${ecrit(a)} = ${b} \\times ${q} + \\ldots$` : `Effectue la division euclidienne de $${ecrit(a)}$ par $${b}$. Quel est le **${quoi}** ?`,
      mode: "nombre", prefixe: t === 2 ? "Le reste est" : `Le ${quoi} est`, attendu: t === 0 ? q : r,
      erreurs: t === 0 ? [{ valeur: q + 1, message: `$${b} \\times ${q + 1} = ${ecrit(b * (q + 1))}$ dépasse $${ecrit(a)}$.` }, { valeur: q - 1, message: "Le reste serait plus grand que le diviseur : on peut encore mettre une fois le diviseur." }] : [{ valeur: r + b, message: "Le reste doit être plus petit que le diviseur." }],
      aides: [`Cherche combien de fois $${b}$ « va » dans $${ecrit(a)}$ : c'est le quotient.`, `Pose la division, ou encadre : $${b} \\times ${q} = ${ecrit(b * q)}$ et $${b} \\times ${q + 1} = ${ecrit(b * (q + 1))}$.`, "Le reste, c'est ce qui manque pour arriver au dividende ; il est plus petit que le diviseur."],
      solution: `$${ecrit(a)} = ${b} \\times ${q} + ${r}$, avec $${r} < ${b}$. Le quotient est $${q}$ et le reste est $${r}$.`
    };
  };

  GEN["d6-euclide-pb"] = function () {
    const t = rand(0, 4);
    if (t === 0) { // nombre de bus (on arrondit au-dessus)
      const p = pick([40, 45, 50, 55, 59, 63]), n = rand(2, 7) * p + rand(1, p - 1), q = Math.floor(n / p);
      return { enonce: `Pour une sortie, $${ecrit(n)}$ élèves du collège prennent des cars de $${p}$ places. Combien de cars faut-il réserver ?`, mode: "nombre", prefixe: "Il faut", suffixe: "cars", attendu: q + 1,
        erreurs: [{ valeur: q, message: `Avec $${q}$ cars, il reste $${n % p}$ élèves sans place.` }],
        aides: [`Combien de fois $${p}$ dans $${ecrit(n)}$ ? Fais la division euclidienne.`, `$${ecrit(n)} = ${p} \\times ${q} + ${n % p}$.`, "Que faire des élèves qui restent ?"],
        solution: `$${ecrit(n)} = ${p} \\times ${q} + ${n % p}$ : $${q}$ cars pleins, et il reste $${n % p}$ élèves. Il faut donc $${q + 1}$ cars.` };
    }
    if (t === 1) { // boîtes pleines
      const [obj, p] = pick([["œufs", 6], ["œufs", 12], ["mangues", 8], ["bouteilles", 6], ["yaourts", 4], ["crayons", 10], ["ananas", 9]]), n = rand(30, 400), q = Math.floor(n / p);
      const rest = Math.random() < 0.5;
      return { enonce: `On range $${n}$ ${obj} dans des cartons de $${p}$. ${rest ? `Combien de ${obj} reste-t-il hors des cartons pleins ?` : "Combien de cartons pleins obtient-on ?"}`, mode: "nombre", prefixe: rest ? "Il en reste" : "Cartons pleins :", attendu: rest ? n % p : q,
        erreurs: rest ? [{ valeur: q, message: "Ça, c'est le nombre de cartons pleins (le quotient). On demande le reste." }] : [{ valeur: n % p, message: "Ça, c'est le reste. On demande le quotient." }, { valeur: q + 1, message: "Le dernier carton n'est pas plein." }],
        aides: [`Fais la division euclidienne de $${n}$ par $${p}$.`, "Le quotient donne le nombre de cartons pleins.", "Le reste donne ce qui ne remplit pas un carton."],
        solution: `$${n} = ${p} \\times ${q} + ${n % p}$ : $${q}$ cartons pleins, et il reste $${n % p}$ ${obj}.` };
    }
    if (t === 2) { // partage équitable (valeur d'une part)
      const k = rand(3, 9), part = rand(8, 120), r = rand(0, k - 1), n = k * part + r;
      return { enonce: `Un pêcheur de M'tsapéré partage $${n}$ poissons entre ses $${k}$ enfants, chacun autant, le plus possible. Combien chaque enfant reçoit-il de poissons ?`, mode: "nombre", prefixe: "Chacun reçoit", attendu: part,
        erreurs: r ? [{ valeur: r, message: "Ça, c'est le reste : les poissons qui ne peuvent pas être partagés." }] : [],
        aides: ["On partage en parts égales : c'est une division.", `Divise $${n}$ par $${k}$ : le quotient donne la part de chacun.`, `$${k} \\times ${part} = ${k * part}$.`],
        solution: `$${n} = ${k} \\times ${part} + ${r}$ : chaque enfant reçoit $${part}$ poissons${r ? ` et il en reste $${r}$` : ""}.` };
    }
    if (t === 3) { // jours et semaines
      const n = rand(15, 400), q = Math.floor(n / 7), sem = Math.random() < 0.5;
      return { enonce: `Combien de semaines ${sem ? "complètes" : "complètes et de jours"} y a-t-il dans $${n}$ jours ? ${sem ? "Donne le nombre de semaines complètes." : "Donne le nombre de jours qui restent."}`, mode: "nombre", prefixe: sem ? "Semaines :" : "Jours restants :", attendu: sem ? q : n % 7,
        erreurs: sem ? [{ valeur: n % 7, message: "Ça, ce sont les jours qui restent." }] : [{ valeur: q, message: "Ça, c'est le nombre de semaines." }],
        aides: ["Une semaine compte $7$ jours.", `Fais la division euclidienne de $${n}$ par $7$.`, "Quotient : semaines complètes ; reste : jours en plus."],
        solution: `$${n} = 7 \\times ${q} + ${n % 7}$ : $${q}$ semaines complètes et $${n % 7}$ jour${n % 7 > 1 ? "s" : ""}.` };
    }
    // ficelle ou ruban : combien de morceaux (groupement)
    const L = rand(150, 980), p = rand(12, 45), q = Math.floor(L / p);
    return { enonce: `On découpe un ruban de $${L}$ cm en morceaux de $${p}$ cm. Combien de morceaux de $${p}$ cm obtient-on ?`, mode: "nombre", prefixe: "Morceaux :", attendu: q,
      erreurs: [{ valeur: q + 1, message: `Le dernier morceau ne mesure que $${L % p}$ cm.` }, { valeur: L % p, message: "Ça, c'est la longueur qui reste." }],
      aides: [`On cherche combien de fois $${p}$ cm dans $${L}$ cm.`, `Fais la division euclidienne de $${L}$ par $${p}$.`, `$${p} \\times ${q} = ${p * q}$.`],
      solution: `$${L} = ${p} \\times ${q} + ${L % p}$ : on obtient $${q}$ morceaux, et il reste $${L % p}$ cm.` };
  };

  GEN["d6-division"] = function () {
    const b = rand(2, 9);
    // quotient décimal exact : q = k / 10^d ; pour 3, 6, 7, 9 le dividende est choisi multiple
    const d = rand(0, 2), k = rand(11, 9999);
    let q = Dc(k, d);
    if ([2, 4, 5, 8].includes(b) && Math.random() < 0.6) { const e = b === 2 || b === 5 ? 1 : b === 4 ? 2 : 3; q = Dc(rand(101, 9999), Math.min(3, d + e)); }
    const a = mulD(q, Dc(b));
    if (a.m % 10 === 0 && a.d > 0) return GEN["d6-division"]();
    const R = Dc(a.m, a.d); // a = q × b
    const nq = q;
    if (q.m % 10 === 0 && q.d > 0) return GEN["d6-division"]();
    return {
      enonce: `Calcule : $${tD(a)} \\div ${b}$.`,
      mode: "nombre", prefixe: "Résultat :", attendu: vD(nq),
      erreurs: [{ valeur: vD(nq) * 10, message: "La virgule est mal placée : on l'écrit au quotient au moment où l'on « franchit » la virgule du dividende." }, { valeur: Math.floor(vD(nq)), message: "La division ne s'arrête pas au reste : ajoute des zéros après la virgule et continue." }],
      aides: ["Pose la division comme une division euclidienne.", "Quand tu abaisses le premier chiffre après la virgule, écris une **virgule au quotient**.", "Si le reste n'est pas nul, ajoute un $0$ au dividende et continue."],
      solution: `$${tD(a)} \\div ${b} = ${tD(nq)}$. Vérification : $${b} \\times ${tD(nq)} = ${tD(R)}$.`
    };
  };

  GEN["d6-arrondi-div"] = function () {
    const b = pick([3, 6, 7, 9, 3, 6, 7]), a = rand(10, 999);
    if (a % b === 0) return GEN["d6-arrondi-div"]();
    const [p, nom] = pick([[0, "à l'unité"], [1, "au dixième"], [2, "au centième"]]);
    const v = a / b, arr = Math.round(v * P10(p) + 1e-9) / P10(p), tronc = Math.floor(v * P10(p) + 1e-9) / P10(p);
    const ecran = (Math.floor(v * 10000) / 10000).toFixed(4).replace(".", "{,}");
    const ctx = pick(["", "", `On partage $${a}$ € entre $${b}$ personnes. `, `Un ruban de $${a}$ cm est coupé en $${b}$ morceaux égaux. `]);
    return {
      enonce: `${ctx}Donne la valeur arrondie ${nom} de $${a} \\div ${b}$.`,
      mode: "nombre", prefixe: "Arrondi :", attendu: arr,
      erreurs: arr !== tronc ? [{ valeur: tronc, message: "Tu as coupé sans arrondir : regarde le chiffre suivant." }] : [],
      aides: [`Pose la division et calcule un chiffre de plus que la précision demandée.`, `On trouve $${a} \\div ${b} = ${ecran}\\ldots$ : la division ne s'arrête jamais.`, "De $0$ à $4$ on garde, de $5$ à $9$ on monte."],
      solution: `$${a} \\div ${b} = ${ecran}\\ldots$ Ce quotient n'est pas un nombre décimal. Sa valeur arrondie ${nom} est $${nb(arr)}$.`
    };
  };

  GEN["d6-division-pb"] = function () {
    const t = rand(0, 3);
    if (t === 0) { const k = rand(2, 9), c = rand(80, 990), tot = k * c; // prix d'un objet, en centimes
      const [obj, pl] = pick([["cahier", "cahiers"], ["stylo", "stylos"], ["ananas", "ananas"], ["pain au chocolat", "pains au chocolat"], ["savon", "savons"]]);
      return { enonce: `$${k}$ ${pl} coûtent $${eurC(tot)}$ €. Combien coûte un ${obj} ?`, mode: "nombre", prefixe: "Prix :", suffixe: "€", attendu: c / 100,
        erreurs: [{ valeur: (tot * k) / 100, message: `Ça, c'est le prix de $${k} \\times ${k}$ objets : on cherche le prix d'**un** ${obj}, il faut diviser.` }],
        aides: ["Le prix d'un objet est plus petit que le prix de tous : c'est une division.", `Calcule $${eurC(tot)} \\div ${k}$.`, `Vérifie : $${k} \\times$ (ta réponse) doit redonner $${eurC(tot)}$.`],
        solution: `$${eurC(tot)} \\div ${k} = ${eurC(c)}$ : un ${obj} coûte $${eurC(c)}$ €. Vérification : $${k} \\times ${eurC(c)} = ${eurC(tot)}$.` }; }
    if (t === 1) { const k = rand(2, 8), part = Dc(rand(105, 990), 2), L = mulD(part, Dc(k));
      if (part.m % 10 === 0) return GEN["d6-division-pb"]();
      return { enonce: `Une planche de $${tD(L)}$ m est coupée en $${k}$ morceaux de même longueur. Quelle est la longueur d'un morceau ?`, mode: "nombre", prefixe: "Longueur :", suffixe: "m", attendu: vD(part),
        erreurs: [{ valeur: vD(part) * 10, message: "Vérifie la place de la virgule avec un ordre de grandeur." }],
        aides: ["On partage en parts égales : c'est une division.", `Calcule $${tD(L)} \\div ${k}$.`, "Écris la virgule au quotient quand tu franchis la virgule du dividende."],
        solution: `$${tD(L)} \\div ${k} = ${tD(part)}$ : chaque morceau mesure $${tD(part)}$ m.` }; }
    if (t === 2) { const k = rand(3, 9), moy = Dc(rand(50, 200), 1), tot = mulD(moy, Dc(k));
      if (moy.m % 10 === 0) return GEN["d6-division-pb"]();
      return { enonce: `En $${k}$ jours, il est tombé $${tD(tot)}$ mm de pluie à Mamoudzou, autant chaque jour. Combien de millimètres sont tombés par jour ?`, mode: "nombre", prefixe: "Par jour :", suffixe: "mm", attendu: vD(moy),
        erreurs: [{ valeur: vD(moy) * 10, message: "Vérifie la place de la virgule avec un ordre de grandeur." }],
        aides: ["On répartit la même quantité chaque jour : c'est une division.", `Calcule $${tD(tot)} \\div ${k}$.`, "Vérifie en multipliant ton résultat par le nombre de jours."],
        solution: `$${tD(tot)} \\div ${k} = ${tD(moy)}$ : il est tombé $${tD(moy)}$ mm par jour.` }; }
    // facture partagée entre amis
    const k = rand(2, 9), c = rand(250, 2500), tot = k * c;
    return { enonce: `$${k}$ amis partagent l'addition d'un restaurant de $${eurC(tot)}$ €, chacun la même somme. Combien paie chacun ?`, mode: "nombre", prefixe: "Chacun paie", suffixe: "€", attendu: c / 100,
      erreurs: [{ valeur: (tot - c) / 100, message: "On partage en parts égales : c'est une division, pas une soustraction." }],
      aides: ["Partager en parts égales, c'est diviser.", `Calcule $${eurC(tot)} \\div ${k}$.`, `Vérifie : $${k} \\times$ (ta réponse) $= ${eurC(tot)}$.`],
      solution: `$${eurC(tot)} \\div ${k} = ${eurC(c)}$ : chacun paie $${eurC(c)}$ €.` };
  };
  const eurC = (c) => (c % 100 ? ecrit(c, 2) : ecrit(c / 100)); // prix en centimes, écrit avec deux décimales

  GEN["d6-conv-duree"] = function () {
    const t = rand(0, 6);
    if (t === 0) { const h = rand(1, 12), m = rand(1, 59);
      return { enonce: `Convertis ${hTex(h, m)} en minutes.`, mode: "nombre", prefixe: "En minutes :", suffixe: "min", attendu: h * 60 + m,
        erreurs: [{ valeur: h * 100 + m, message: "Une heure, c'est $60$ minutes, pas $100$." }, { valeur: h * 60, message: `N'oublie pas les $${m}$ minutes.` }],
        aides: ["$1$ h $= 60$ min.", `$${h}$ h $= ${h} \\times 60$ min.`, `Ajoute les $${m}$ minutes.`],
        solution: `$${h} \\times 60 + ${m} = ${h * 60 + m}$ : ${hTex(h, m)} $= ${h * 60 + m}$ min.` }; }
    if (t === 1) { const m = rand(1, 40), s = rand(0, 59);
      return { enonce: `Convertis $${m}$ min${s ? ` $${s}$ s` : ""} en secondes.`, mode: "nombre", prefixe: "En secondes :", suffixe: "s", attendu: m * 60 + s,
        erreurs: [{ valeur: m * 100 + s, message: "Une minute, c'est $60$ secondes, pas $100$." }],
        aides: ["$1$ min $= 60$ s.", `$${m}$ min $= ${m} \\times 60$ s.`, s ? `Ajoute les $${s}$ secondes.` : "Calcule le produit."],
        solution: `$${m} \\times 60${s ? ` + ${s}` : ""} = ${ecrit(m * 60 + s)}$ s.` }; }
    if (t === 2) { // minutes vers h min (choix)
      const tot = rand(61, 600); if (tot % 60 === 0) return GEN["d6-conv-duree"]();
      const h = Math.floor(tot / 60), m = tot % 60;
      const fausses = [hTex(Math.floor(tot / 100), tot % 100), hTex(h - 1 > 0 ? h - 1 : h + 1, m), hTex(h, (m + 10) % 60 || 5), hTex(h + 1, m)].filter((x) => x !== hTex(h, m));
      const c = melange(hTex(h, m), fausses);
      return { enonce: `Convertis $${tot}$ min en heures et minutes.`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Combien de fois $60$ dans ce nombre de minutes ?", `Fais la division euclidienne de $${tot}$ par $60$.`, "Le quotient donne les heures, le reste les minutes."],
        solution: `$${tot} = 60 \\times ${h} + ${m}$ : $${tot}$ min $=$ ${hTex(h, m)}.` }; }
    if (t === 3) { // heures décimales vers minutes
      const [f, mm] = pick([[Dc(5, 1), 30], [Dc(25, 2), 15], [Dc(75, 2), 45], [Dc(1, 1), 6], [Dc(2, 1), 12], [Dc(3, 1), 18], [Dc(4, 1), 24], [Dc(6, 1), 36], [Dc(8, 1), 48]]);
      const h = rand(0, 5), x = addD(Dc(h), f);
      return { enonce: `Convertis $${tD(x)}$ h en minutes.`, mode: "nombre", prefixe: "En minutes :", suffixe: "min", attendu: h * 60 + mm,
        erreurs: [{ valeur: h * 60 + Math.round(vD(f) * 100), message: `$${tD(f)}$ h ne vaut pas $${Math.round(vD(f) * 100)}$ min : calcule $${tD(f)} \\times 60$.` }],
        aides: ["$1$ h $= 60$ min, donc on multiplie par $60$.", `$${tD(f)}$ h $= ${tD(f)} \\times 60$ min.`, `Par exemple, $0{,}5$ h est une demi-heure : $30$ min.`],
        solution: `$${tD(x)} \\times 60 = ${h * 60 + mm}$ : $${tD(x)}$ h $= ${h * 60 + mm}$ min${h ? `, soit ${hTex(h, mm)}` : ""}.` }; }
    if (t === 4) { // h min vers heures décimales
      const [mm, f] = pick([[30, Dc(5, 1)], [15, Dc(25, 2)], [45, Dc(75, 2)], [6, Dc(1, 1)], [12, Dc(2, 1)], [18, Dc(3, 1)], [24, Dc(4, 1)], [36, Dc(6, 1)], [48, Dc(8, 1)], [54, Dc(9, 1)]]);
      const h = rand(1, 9), x = addD(Dc(h), f);
      return { enonce: `Écris ${hTex(h, mm)} en heures, sous forme décimale.`, mode: "nombre", prefixe: "En heures :", suffixe: "h", attendu: vD(x),
        erreurs: [{ valeur: h + mm / 100, message: `$${mm}$ min ne font pas $${tD(Dc(mm, 2))}$ h : une heure a $60$ minutes, pas $100$.` }],
        aides: ["$1$ min $= \\dfrac{1}{60}$ h. Quelle fraction d'heure font ces minutes ?", "$30$ min $= 0{,}5$ h ; $15$ min $= 0{,}25$ h ; $6$ min $= 0{,}1$ h.", `Calcule $${mm} \\div 60$.`],
        solution: `$${mm} \\div 60 = ${tD(f)}$, donc ${hTex(h, mm)} $= ${tD(x)}$ h.` }; }
    if (t === 5) { // grandes unités
      const [enonce, rep, sol] = pick([
        (() => { const n = rand(2, 9); return [`Combien d'heures y a-t-il dans $${n}$ jours ?`, n * 24, `$1$ jour $= 24$ h, donc $${n} \\times 24 = ${n * 24}$ h.`]; })(),
        (() => { const n = rand(2, 20); return [`Combien d'années y a-t-il dans $${n}$ siècles ?`, n * 100, `$1$ siècle $= 100$ ans, donc $${n * 100}$ ans.`]; })(),
        (() => { const n = rand(2, 5); return [`Combien d'années y a-t-il dans $${n}$ millénaires ?`, n * 1000, `$1$ millénaire $= 1\\,000$ ans, donc $${ecrit(n * 1000)}$ ans.`]; })(),
        (() => { const n = rand(2, 9); return [`Combien de jours y a-t-il dans $${n}$ semaines ?`, n * 7, `$1$ semaine $= 7$ jours, donc $${n * 7}$ jours.`]; })(),
        (() => { const an = pick([2024, 2028, 2032, 2020]); return [`Combien de jours compte l'année ${"$" + an + "$"}, qui est bissextile ?`, 366, "Une année bissextile compte $366$ jours (le $29$ février en plus)."]; })(),
        (() => { const n = rand(2, 12); return [`Combien de minutes font $${n}$ quarts d'heure ?`, n * 15, `Un quart d'heure, c'est $15$ min : $${n} \\times 15 = ${n * 15}$ min.`]; })(),
        (() => { const n = rand(2, 9); return [`Combien de minutes font $${n}$ demi-heures ?`, n * 30, `Une demi-heure, c'est $30$ min : $${n} \\times 30 = ${n * 30}$ min.`]; })()
      ]);
      return { enonce, mode: "nombre", prefixe: "Réponse :", attendu: rep, aides: ["$1$ jour $= 24$ h ; $1$ semaine $= 7$ jours ; $1$ année $= 365$ ou $366$ jours.", "$1$ siècle $= 100$ ans ; $1$ millénaire $= 1\\,000$ ans.", "Un quart d'heure $= 15$ min ; une demi-heure $= 30$ min ; trois quarts d'heure $= 45$ min."], solution: sol };
    }
    // secondes vers h min s : on demande les minutes
    const s = rand(3700, 30000), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = s % 60;
    return { enonce: `On écrit $${ecrit(s)}$ s sous la forme … h … min … s. Combien de **minutes** ?`, mode: "nombre", prefixe: "Minutes :", suffixe: "min", attendu: m,
      erreurs: [{ valeur: Math.floor(s / 60), message: "Ça, c'est le nombre total de minutes : il faut encore en retirer les heures entières." }],
      aides: ["Divise d'abord par $60$ : tu obtiens des minutes et des secondes.", `$${ecrit(s)} = 60 \\times ${Math.floor(s / 60)} + ${r}$.`, `Puis divise $${Math.floor(s / 60)}$ min par $60$ pour trouver les heures.`],
      solution: `$${ecrit(s)} = 60 \\times ${Math.floor(s / 60)} + ${r}$, puis $${Math.floor(s / 60)} = 60 \\times ${h} + ${m}$. Donc $${ecrit(s)}$ s $= ${h}$ h $${m}$ min $${r}$ s.` };
  };

  GEN["d6-horaires"] = function () {
    const t = rand(0, 3);
    // [début de phrase, pronom, durée maximale en minutes]
    const TRAJETS = [["Le taxi-brousse part de Mamoudzou", "il", 80], ["La barge quitte Mamoudzou", "elle", 30], ["Le car part de Sada", "il", 95], ["Le bus scolaire part de Combani", "il", 55], ["Le film commence", "il", 190], ["Le match de football commence", "il", 110]];
    const longs = TRAJETS.filter((x) => x[2] >= 65);
    const [debut, pron, dmax] = t === 1 ? pick(longs) : pick(TRAJETS), evt = /film|match/.test(debut);
    if (t === 0 || t === 1) { // heure d'arrivée
      const dep = rand(6 * 60, 20 * 60), dur = t === 1 ? rand(65, dmax) : rand(10, Math.min(59, dmax)), arr = dep + dur;
      const fausses = [arr - 60, arr + 60, arr + 40, arr - 40, arr + 10, arr - 10];
      const naif = Math.floor(dep / 60) + Math.floor(dur / 60), naifM = (dep % 60) + (dur % 60); // « 14 h 85 »
      const opts = [minTex(arr, true), ...(naifM >= 60 ? [`$${naif}$ h $${naifM}$`] : []), ...fausses.filter((x) => x !== arr && x > 0).map((x) => minTex(x, true))];
      const c = melange(opts[0], [...new Set(opts.slice(1))]);
      return { enonce: `${debut} à ${minTex(dep, true)}. ${evt ? "Il" : "Le trajet"} dure ${dur >= 60 ? minTex(dur) : `$${dur}$ min`}. À quelle heure ${evt ? "se termine-t-il" : `arrive-t-${pron}`} ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Ajoute d'abord les heures, puis les minutes.", "Si tu dépasses $60$ minutes, transforme $60$ min en $1$ heure.", `Tu peux aussi compléter jusqu'à l'heure pile : de ${minTex(dep, true)} à $${Math.floor(dep / 60) + 1}$ h, il y a $${60 - (dep % 60)}$ min.`],
        solution: `${minTex(dep, true)} $+$ ${dur >= 60 ? minTex(dur) : `$${dur}$ min`} $=$ ${minTex(arr, true)}${naifM >= 60 ? ` (et pas $${naif}$ h $${naifM}$ : $${naifM}$ min $= 1$ h $${naifM - 60}$ min)` : ""}.` };
    }
    if (t === 2) { // durée entre deux horaires, en minutes
      const dep = rand(6 * 60, 20 * 60), dur = rand(12, dmax), arr = dep + dur;
      const naif = (Math.floor(arr / 60) - Math.floor(dep / 60)) * 100 + (arr % 60) - (dep % 60);
      return { enonce: `${debut} à ${minTex(dep, true)} et ${evt ? "se termine" : "arrive"} à ${minTex(arr, true)}. Combien de minutes ${evt ? "a-t-il duré" : "a duré le trajet"} ?`, mode: "nombre", prefixe: "Durée :", suffixe: "min", attendu: dur,
        erreurs: naif !== dur ? [{ valeur: naif, message: "On ne soustrait pas les horaires comme des nombres décimaux : une heure, c'est $60$ minutes." }] : [],
        aides: [`Va de ${minTex(dep, true)} jusqu'à l'heure pile suivante : combien de minutes ?`, "Compte ensuite les heures entières, puis les minutes jusqu'à l'arrivée.", "Additionne toutes les étapes, en minutes."],
        solution: arr < Math.floor(dep / 60) * 60 + 60
          ? `Même heure : $${arr % 60} - ${dep % 60} = ${dur}$ min.`
          : `De ${minTex(dep, true)} à ${minTex(Math.floor(dep / 60) * 60 + 60, true)} : $${60 - (dep % 60)}$ min, puis jusqu'à ${minTex(arr, true)} : $${arr - (Math.floor(dep / 60) * 60 + 60)}$ min. En tout : $${60 - (dep % 60)} + ${arr - (Math.floor(dep / 60) * 60 + 60)} = ${dur}$ min${dur >= 60 ? `, soit ${minTex(dur)}` : ""}.` };
    }
    // somme de deux durées
    const a = rand(65, 300), b = rand(65, 300);
    if ((a % 60) + (b % 60) < 60) return GEN["d6-horaires"]();
    const s = a + b, naifH = Math.floor(a / 60) + Math.floor(b / 60), naifM = (a % 60) + (b % 60);
    const c = melange(minTex(s), [`$${naifH}$ h $${naifM}$ min`, minTex(s - 60), minTex(s + 40), minTex(s - 40)]);
    return { enonce: `Calcule ${minTex(a)} $+$ ${minTex(b)}.`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Additionne les heures entre elles et les minutes entre elles.", `Les minutes font $${naifM}$ min : c'est plus que $60$.`, `$${naifM}$ min $= 1$ h $${naifM - 60}$ min.`],
      solution: `$${naifH}$ h $${naifM}$ min $= ${naifH}$ h $+ 1$ h $${naifM - 60}$ min $=$ ${minTex(s)}.` };
  };

  /* =====================================================================
     6e, chapitre 4 : fractions (préfixe f6-)
     Les réponses en fraction sont annoncées dans la consigne ; une valeur décimale approchée tapée
     par l'élève reçoit le message « valeur exacte » (FRAC_APPROX), sans être comptée juste.
     ===================================================================== */
  const pgcd = (a, b) => (b ? pgcd(b, a % b) : Math.abs(a));
  const fr = (a, b) => `\\dfrac{${a}}{${b}}`;
  const frNet = (a, b) => { const g = pgcd(a, b); return b / g === 1 ? `${a / g}` : fr(a / g, b / g); };
  const CONSIGNE_FR = " Donne le résultat sous forme d'une fraction (par exemple 7/6).";
  // Valeurs décimales approchées (troncatures et arrondis à 1, 2 ou 3 décimales) d'une fraction non décimale
  const FRAC_APPROX = (v) => { const out = []; [1, 2, 3].forEach((k) => { const p = P10(k); [Math.floor(v * p) / p, Math.round(v * p) / p].forEach((x) => { if (Math.abs(x - v) > 1e-9 && !out.some((e) => e.valeur === x)) out.push({ valeur: x, message: "Ce n'est qu'une valeur approchée : donne la **valeur exacte** sous forme de fraction, par exemple 7/6." }); }); }); return out; };

  // Bande (ou plusieurs bandes) partagée en b parts égales, a parts coloriées
  function bandes(a, b) {
    const nb = Math.max(1, Math.ceil(a / b)), W = 300, h = 34, gap = 12, x0 = 10, y0 = 8, w = W - 2 * x0;
    const H = y0 * 2 + nb * h + (nb - 1) * gap;
    let s = `<svg class="graph bandes" viewBox="0 0 ${W} ${H}" role="img" aria-label="${nb > 1 ? nb + " bandes unité" : "Une bande unité"} partagée${nb > 1 ? "s" : ""} en ${b} parts égales, ${a} parts coloriées">`;
    for (let k = 0; k < nb; k++) {
      const y = y0 + k * (h + gap);
      for (let i = 0; i < b; i++) {
        const plein = k * b + i < a;
        s += `<rect class="${plein ? "g-aire g-colorie" : "g-vide"}" x="${+(x0 + (i * w) / b).toFixed(1)}" y="${y}" width="${+(w / b).toFixed(1)}" height="${h}"/>`;
      }
      s += `<g class="g-grid">${Array.from({ length: b - 1 }, (_, i) => `<line x1="${+(x0 + ((i + 1) * w) / b).toFixed(1)}" y1="${y}" x2="${+(x0 + ((i + 1) * w) / b).toFixed(1)}" y2="${y + h}"/>`).join("")}</g>`;
      s += `<rect class="g-unite" x="${x0}" y="${y}" width="${w}" height="${h}"/>`;
    }
    return s + `</svg>`;
  }
  // Demi-droite graduée d'origine 0 : chaque unité partagée en b, n unités, points [{ k (numérateur), label }]
  function droiteFractions(b, n, points) {
    const W = 320, padL = 16, padR = 24, y0 = 30, H = 54, N = b * n, ux = (W - padL - padR) / N, X = (i) => +(padL + i * ux).toFixed(1);
    let s = `<svg class="graph droite demi-droite" viewBox="0 0 ${W} ${H}" role="img" aria-label="Demi-droite graduée d'origine 0, chaque unité partagée en ${b} parts égales">`;
    s += `<g class="g-axis"><line x1="${X(0)}" y1="${y0}" x2="${W - 6}" y2="${y0}"/><path d="M${W - 2} ${y0} l-8 -4 v8z"/></g><g class="g-tick">`;
    for (let i = 0; i <= N; i++) {
      const u = i % b === 0;
      s += `<line class="g-graduation" x1="${X(i)}" y1="${y0 - (u ? 7 : 4)}" x2="${X(i)}" y2="${y0 + (u ? 7 : 4)}"/>`;
      if (u) s += `<text x="${X(i)}" y="${y0 + 20}" text-anchor="middle">${i / b}</text>`;
    }
    s += `</g>`;
    (points || []).forEach((p) => { s += `<circle class="g-point" cx="${X(p.k)}" cy="${y0}" r="3.5"/><text class="g-plabel" x="${X(p.k)}" y="${y0 - 11}" text-anchor="middle">${p.label}</text>`; });
    return s + `</svg>`;
  }
  FIGURES["f6-bande"] = () => bandes(3, 4);
  FIGURES["f6-bande-7"] = () => bandes(7, 4);
  FIGURES["f6-droite"] = () => droiteFractions(5, 2, [{ k: 3, label: "M" }, { k: 7, label: "N" }]);

  GEN["f6-partage"] = function () {
    const b = rand(2, 12), a = Math.random() < 0.25 ? rand(b + 1, 2 * b - 1) : rand(1, b - 1);
    const bon = `$${fr(a, b)}$`;
    const fausses = [fr(b, a), a < b ? fr(a, b - a) : fr(a - b, b), fr(b - a > 0 ? b - a : a + 1, b), fr(a, b + 1), fr(a, 2 * b)].map((x) => `$${x}$`);
    const c = melange(bon, fausses.filter((x) => x !== bon));
    return {
      enonce: a > b ? "Chaque bande représente une unité. Quelle fraction d'une bande la partie coloriée représente-t-elle ?" : "La bande représente une unité. Quelle fraction de la bande est coloriée ?",
      figure: bandes(a, b), mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: [`Chaque bande est partagée en $${b}$ parts égales : chaque part est $${fr(1, b)}$ de la bande.`, "Compte les parts coloriées : c'est le numérateur.", "Le dénominateur dit en combien de parts égales on a partagé **une** unité."],
      solution: `Une unité est partagée en $${b}$ parts égales et on colorie $${a}$ part${a > 1 ? "s" : ""} : c'est $${fr(a, b)}$${a > b ? `, plus que $1$ unité ($${fr(a, b)} = 1 + ${fr(a - b, b)}$)` : ""}.`
    };
  };

  GEN["f6-quotient"] = function () {
    const t = rand(0, 3);
    if (t === 0) { // écriture décimale d'un quotient
      const b = pick([2, 4, 5, 8, 10, 20, 25, 50, 100]), a = rand(1, 4 * b);
      if (a % b === 0) return GEN["f6-quotient"]();
      return { enonce: `Donne l'écriture décimale de $${fr(a, b)}$.`, mode: "nombre", prefixe: "Écriture décimale :", attendu: a / b,
        erreurs: [{ valeur: +(a + "." + b), message: `$${fr(a, b)}$ n'est pas « $${a}$ virgule $${b}$ » : c'est le quotient $${a} \\div ${b}$.` }],
        aides: [`$${fr(a, b)}$, c'est le quotient de $${a}$ par $${b}$ : $${a} \\div ${b}$.`, "Pose la division décimale.", "Vérifie : le résultat multiplié par le dénominateur redonne le numérateur."],
        solution: `$${fr(a, b)} = ${a} \\div ${b} = ${nb(a / b)}$. Vérification : $${b} \\times ${nb(a / b)} = ${a}$.` };
    }
    if (t === 1) { // égalité à trous multiplicative
      let b = rand(2, 12), a = rand(1, 15); if (a % b === 0) a++;
      const v = a / b;
      return { enonce: `Complète : $${b} \\times \\ldots = ${a}$.${CONSIGNE_FR}`, mode: "nombre", prefixe: "Le nombre manquant est", attendu: v,
        erreurs: [{ valeur: b / a, message: "Le dénominateur, c'est le nombre par lequel on multiplie : ici $" + b + "$." }, ...FRAC_APPROX(v)],
        aides: [`On cherche le nombre qui, multiplié par $${b}$, donne $${a}$.`, `Par définition, c'est le quotient de $${a}$ par $${b}$.`, `On l'écrit $${fr(a, b)}$ : $${b} \\times ${fr(a, b)} = ${a}$.`],
        solution: `$${b} \\times ${fr(a, b)} = ${a}$ : le nombre manquant est $${fr(a, b)}$${Number.isInteger(v * 1000) ? ` $= ${nb(v)}$` : ""}.` };
    }
    if (t === 2) { // nature du quotient
      const b = rand(2, 12), a = rand(1, 60);
      const v = a / b;
      // décimal si le dénominateur de la fraction simplifiée n'a que 2 et 5 comme facteurs premiers
      let m = b / pgcd(a, b); while (m % 2 === 0) m /= 2; while (m % 5 === 0) m /= 5;
      const vraie = Number.isInteger(v) ? 0 : m === 1 ? 1 : 2;
      const choix = ["Un nombre entier", "Un nombre décimal qui n'est pas entier", "Un nombre qui n'est pas décimal"];
      return { enonce: `Le quotient $${fr(a, b)}$ est :`, mode: "choix", choix, attendu: vraie,
        aides: [`Calcule $${a} \\div ${b}$.`, "Si la division tombe juste sans virgule, c'est un entier ; si elle s'arrête après la virgule, c'est un décimal.", "Si la division ne s'arrête jamais, le quotient n'est pas décimal."],
        solution: [`$${fr(a, b)} = ${v}$ : c'est un nombre entier.`, `$${fr(a, b)} = ${nb(v)}$ : la division s'arrête, c'est un décimal (pas un entier).`, `$${fr(a, b)} = ${(Math.floor(v * 1000) / 1000).toFixed(3).replace(".", "{,}")}\\ldots$ : la division ne s'arrête jamais, ce n'est pas un nombre décimal.`][vraie] };
    }
    // le quotient de a par b
    const a = rand(2, 20), b = rand(2, 20); if (a === b) return GEN["f6-quotient"]();
    const c = melange(`$${fr(a, b)}$`, [`$${fr(b, a)}$`, `$${a} \\times ${b}$`, `$${a} + ${b}$`, `$${nb(+(a + "." + b))}$`]);
    return { enonce: `Le quotient de $${a}$ par $${b}$ s'écrit :`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Le quotient de $a$ par $b$, c'est $a \\div b$.", "En écriture fractionnaire : $a$ au numérateur, $b$ au dénominateur.", "Le premier nombre cité est celui qu'on divise."],
      solution: `Le quotient de $${a}$ par $${b}$, c'est $${a} \\div ${b} = ${fr(a, b)}$.` };
  };

  GEN["f6-droite"] = function () {
    const b = pick([2, 3, 4, 5, 6, 8, 10]), n = b >= 8 ? 2 : 3, k = rand(1, b * n - 1);
    if (k % b === 0) return GEN["f6-droite"]();
    const L = pick(LETTRES);
    const bon = `$${fr(k, b)}$`;
    const fausses = [fr(k, b + 1), fr(b, k), fr(k % b || 1, b), b !== 10 ? nb(k / 10) : fr(k, 2 * b), fr(k + 1, b)].map((x) => `$${x}$`);
    const c = melange(bon, fausses.filter((x) => x !== bon));
    return {
      enonce: `Quelle est l'abscisse du point $${L}$ ?`,
      figure: droiteFractions(b, n, [{ k, label: L }]), mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Compte en combien de parts égales est partagée **une unité** (de $0$ à $1$) : compte les intervalles, pas les traits.", `Chaque graduation vaut $${fr(1, b)}$.`, `Compte les graduations de $0$ jusqu'au point $${L}$.`],
      solution: `L'unité est partagée en $${b}$ : une graduation vaut $${fr(1, b)}$. $${L}$ est à $${k}$ graduations de $0$ : $${L}(${fr(k, b)})$${k > b ? `, et $${fr(k, b)} = ${Math.floor(k / b)} + ${fr(k % b, b)}$` : ""}.`
    };
  };

  GEN["f6-egales"] = function () {
    const t = rand(0, 2), a = rand(1, 9), b = rand(a + 1, 12), k = rand(2, 9);
    if (pgcd(a, b) !== 1) return GEN["f6-egales"]();
    if (t === 0) { // compléter en multipliant
      const haut = Math.random() < 0.5;
      return { enonce: haut ? `Complète : $${fr(a, b)} = ${fr("\\ldots", b * k)}$.` : `Complète : $${fr(a, b)} = ${fr(a * k, "\\ldots")}$.`, mode: "nombre", prefixe: haut ? "Numérateur :" : "Dénominateur :", attendu: haut ? a * k : b * k,
        erreurs: [{ valeur: haut ? a + (b * k - b) : b + (a * k - a), message: "On ne change pas une fraction en **ajoutant** le même nombre : il faut **multiplier** en haut et en bas par le même nombre." }],
        aides: [haut ? `De $${b}$ à $${b * k}$ au dénominateur, on a multiplié par combien ?` : `De $${a}$ à $${a * k}$ au numérateur, on a multiplié par combien ?`, `On a multiplié par $${k}$.`, "On fait la même chose à l'autre étage de la fraction."],
        solution: `$${fr(a, b)} = ${fr(`${a} \\times ${k}`, `${b} \\times ${k}`)} = ${fr(a * k, b * k)}$.` };
    }
    if (t === 1) { // simplifier
      const bas = Math.random() < 0.5;
      return { enonce: bas ? `Complète : $${fr(a * k, b * k)} = ${fr(a, "\\ldots")}$.` : `Complète : $${fr(a * k, b * k)} = ${fr("\\ldots", b)}$.`, mode: "nombre", prefixe: bas ? "Dénominateur :" : "Numérateur :", attendu: bas ? b : a,
        erreurs: [{ valeur: bas ? b * k - (a * k - a) : a * k - (b * k - b), message: "On ne change pas une fraction en **soustrayant** : il faut **diviser** en haut et en bas par le même nombre." }],
        aides: [bas ? `De $${a * k}$ à $${a}$ au numérateur, on a divisé par combien ?` : `De $${b * k}$ à $${b}$ au dénominateur, on a divisé par combien ?`, `On a divisé par $${k}$.`, "On fait la même chose à l'autre étage."],
        solution: `$${fr(a * k, b * k)} = ${fr(`${a * k} \\div ${k}`, `${b * k} \\div ${k}`)} = ${fr(a, b)}$.` };
    }
    const bon = `$${fr(a * k, b * k)}$`;
    const c = melange(bon, [`$${fr(a + k, b + k)}$`, `$${fr(a * k, b)}$`, `$${fr(a, b * k)}$`, `$${fr(b, a)}$`].filter((x) => x !== bon));
    return { enonce: `Quelle fraction est égale à $${fr(a, b)}$ ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Une fraction ne change pas si on multiplie (ou divise) son numérateur **et** son dénominateur par un même nombre.", "Ajouter le même nombre en haut et en bas change la fraction.", "Pour chaque choix, cherche par quoi on a multiplié le numérateur, puis le dénominateur."],
      solution: `$${fr(a, b)} = ${fr(`${a} \\times ${k}`, `${b} \\times ${k}`)} = ${fr(a * k, b * k)}$.` };
  };

  GEN["f6-comparer"] = function () {
    const t = rand(0, 2);
    if (t < 2) {
      let A, B, expl;
      if (t === 0) { const b = rand(3, 15), a1 = rand(1, 2 * b), a2 = rand(1, 2 * b); A = [a1, b]; B = [a2, b]; expl = "Même dénominateur : on compare les numérateurs."; }
      else { const b = rand(2, 9), k = rand(2, 5), a1 = rand(1, 2 * b), a2 = rand(1, 2 * b * k); A = [a1, b]; B = [a2, b * k]; expl = `On écrit $${fr(a1, b)} = ${fr(a1 * k, b * k)}$ pour avoir le même dénominateur, puis on compare les numérateurs.`; }
      if (Math.random() < 0.5) [A, B] = [B, A];
      const va = A[0] / A[1], vb = B[0] / B[1], choix = [`$${fr(...A)} < ${fr(...B)}$`, `$${fr(...A)} > ${fr(...B)}$`, `$${fr(...A)} = ${fr(...B)}$`];
      const rep = Math.abs(va - vb) < 1e-12 ? 2 : va < vb ? 0 : 1;
      return { enonce: `Compare $${fr(...A)}$ et $${fr(...B)}$.`, mode: "choix", choix, attendu: rep,
        aides: ["Pour comparer des fractions, on les écrit avec le **même dénominateur**.", "Si un dénominateur est un multiple de l'autre, on ne transforme qu'une des deux fractions.", "Avec le même dénominateur, la plus grande fraction est celle qui a le plus grand numérateur."],
        solution: `${expl} Donc ${choix[rep]}.` };
    }
    // ranger dans l'ordre croissant (même dénominateur ou multiples)
    const b = rand(2, 6), k = 2, nums = shuffle(Array.from({ length: 2 * b * k - 1 }, (_, i) => i + 1)).slice(0, 4);
    const fs = nums.map((n, i) => (i % 2 === 0 && n % k === 0 ? [n / k, b] : [n, b * k]));
    const v = (f) => f[0] / f[1];
    if (new Set(fs.map(v)).size < 4) return GEN["f6-comparer"]();
    const bonL = fs.slice().sort((x, y) => v(x) - v(y)), T = (L) => `$${L.map((f) => fr(...f)).join(" < ")}$`;
    const piegeNum = fs.slice().sort((x, y) => x[0] - y[0] || x[1] - y[1]);
    const ech = bonL.slice(); const j = rand(0, 2); [ech[j], ech[j + 1]] = [ech[j + 1], ech[j]];
    const c = melange(T(bonL), [T(piegeNum), T(ech), T(bonL.slice().reverse())]);
    return { enonce: `Range dans l'ordre croissant : $${fs.map((f) => fr(...f)).join(" \\; ; \\; ")}$.`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: [`Écris toutes les fractions avec le dénominateur $${b * k}$.`, `Par exemple, $${fr(1, b)} = ${fr(k, b * k)}$.`, "Range ensuite les numérateurs du plus petit au plus grand."],
      solution: `Avec le dénominateur $${b * k}$ : $${fs.map((f) => (f[1] === b ? fr(f[0] * k, b * k) : fr(...f))).join(" \\; ; \\; ")}$. Donc ${T(bonL)}.` };
  };

  GEN["f6-encadrer"] = function () {
    const b = rand(2, 9), a = rand(b + 1, 9 * b);
    if (a % b === 0) return GEN["f6-encadrer"]();
    const q = Math.floor(a / b), r = a % b, t = rand(0, 2);
    if (t === 2) { // nombre mixte
      const c = melange(`$${q} + ${fr(r, b)}$`, [`$${q + 1} + ${fr(r, b)}$`, `$${r} + ${fr(q, b)}$`, `$${q} + ${fr(b - r, b)}$`, `$${q - 1 > 0 ? q - 1 : q + 2} + ${fr(r, b)}$`]);
      return { enonce: `Écris $${fr(a, b)}$ comme la somme d'un entier et d'une fraction plus petite que $1$.`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: [`Combien de fois $${b}$ dans $${a}$ ? Fais la division euclidienne.`, `$${a} = ${b} \\times ${q} + ${r}$.`, `Donc $${fr(a, b)} = ${fr(b * q, b)} + ${fr(r, b)}$.`],
        solution: `$${a} = ${b} \\times ${q} + ${r}$, donc $${fr(a, b)} = ${fr(b * q, b)} + ${fr(r, b)} = ${q} + ${fr(r, b)}$.` };
    }
    const bas = t === 0;
    return { enonce: `On encadre $${fr(a, b)}$ par deux entiers consécutifs : $n < ${fr(a, b)} < n + 1$. ${bas ? "Que vaut $n$ ?" : "Que vaut $n + 1$ ?"}`, mode: "nombre", prefixe: bas ? "$n =$" : "$n + 1 =$", attendu: bas ? q : q + 1,
      erreurs: [{ valeur: bas ? q + 1 : q, message: bas ? "Ça, c'est l'entier juste après." : "Ça, c'est l'entier juste avant." }, { valeur: r, message: "Ça, c'est le reste de la division." }],
      aides: [`Cherche le plus grand multiple de $${b}$ inférieur à $${a}$.`, `$${b} \\times ${q} = ${b * q}$ et $${b} \\times ${q + 1} = ${b * (q + 1)}$.`, `Donc $${fr(b * q, b)} < ${fr(a, b)} < ${fr(b * (q + 1), b)}$.`],
      solution: `$${fr(b * q, b)} = ${q}$ et $${fr(b * (q + 1), b)} = ${q + 1}$, donc $${q} < ${fr(a, b)} < ${q + 1}$.` };
  };

  GEN["f6-addsous"] = function () {
    const plus = Math.random() < 0.6, t = rand(0, 2);
    let A, B, D, expl;
    if (t === 0) { const b = rand(3, 15); let a1 = rand(1, 2 * b), a2 = rand(1, 2 * b); if (a1 === b || a2 === b) return GEN["f6-addsous"](); if (!plus && a1 < a2) [a1, a2] = [a2, a1]; if (!plus && a1 === a2) a1++; A = [a1, b]; B = [a2, b]; D = b; expl = "Même dénominateur : on calcule avec les numérateurs et on garde le dénominateur."; }
    else if (t === 1) { const b = rand(2, 9), k = rand(2, 4); let a1 = rand(1, 2 * b), a2 = rand(1, 2 * b * k); A = [a1, b]; B = [a2, b * k]; if (Math.random() < 0.5) [A, B] = [B, A]; if (!plus && A[0] / A[1] <= B[0] / B[1]) [A, B] = [B, A]; if (!plus && A[0] / A[1] === B[0] / B[1]) return GEN["f6-addsous"](); D = b * k; expl = `On met d'abord les deux fractions au dénominateur $${b * k}$.`; }
    else { const b = rand(2, 9), n = rand(1, 5), a = rand(1, 2 * b); A = [n, 1]; B = [a, b]; if (!plus && n * b <= a) return GEN["f6-addsous"](); D = b; expl = `On écrit $${n} = ${fr(n * b, b)}$.`; }
    const na = A[0] * (D / A[1]), nb2 = B[0] * (D / B[1]), N = plus ? na + nb2 : na - nb2, v = N / D;
    const tA = A[1] === 1 ? `${A[0]}` : fr(...A);
    const naif = plus ? (A[0] + B[0]) / (A[1] + B[1]) : (A[0] - B[0]) / (A[1] - B[1] || 1);
    return {
      enonce: `Calcule $${tA} ${plus ? "+" : "-"} ${fr(...B)}$.${CONSIGNE_FR}`,
      mode: "nombre", prefixe: "Résultat :", attendu: v,
      erreurs: [...(isFinite(naif) && Math.abs(naif - v) > 1e-9 ? [{ valeur: naif, message: "On n'additionne pas les dénominateurs : on met les fractions au même dénominateur, puis on calcule avec les numérateurs." }] : []), ...(Number.isInteger(v * 1000) ? [] : FRAC_APPROX(v))],
      aides: ["On ne peut additionner ou soustraire que des fractions de **même dénominateur**.", expl, "Calcule avec les numérateurs et garde le dénominateur."],
      solution: `${expl} $${tA} ${plus ? "+" : "-"} ${fr(...B)} = ${t === 0 ? "" : `${fr(na, D)} ${plus ? "+" : "-"} ${fr(nb2, D)} = `}${fr(N, D)}$${pgcd(N, D) > 1 ? ` $= ${frNet(N, D)}$` : ""}.`
    };
  };

  GEN["f6-fois"] = function () {
    const t = rand(0, 2);
    if (t === 0) { // fraction d'une quantité
      const b = rand(2, 10), a = rand(1, b - 1), k = rand(2, 12), N = b * k;
      const [unite, obj] = pick([["", "œufs"], ["", "élèves"], [" €", ""], [" m", ""], [" kg", ""], ["", "mangues"]]);
      return { enonce: `Calcule les $${fr(a, b)}$ de $${N}$${unite}${obj ? " " + obj : ""}.`, mode: "nombre", prefixe: "Résultat :", suffixe: (unite.trim() || obj), attendu: a * k,
        erreurs: [{ valeur: k, message: `Ça, c'est $${fr(1, b)}$ de $${N}$. Il en faut $${a}$ fois plus.` }, { valeur: N * a + b, message: "Prendre une fraction d'une quantité, c'est multiplier par la fraction." }],
        aides: [`Prendre les $${fr(a, b)}$ de $${N}$, c'est calculer $${fr(a, b)} \\times ${N}$.`, `Commence par $${fr(1, b)}$ de $${N}$ : $${N} \\div ${b} = ${k}$.`, `Puis multiplie par $${a}$.`],
        solution: `$${fr(a, b)} \\times ${N} = (${N} \\div ${b}) \\times ${a} = ${k} \\times ${a} = ${a * k}$.` };
    }
    if (t === 1) { // fraction d'un nombre, résultat décimal
      const b = pick([2, 4, 5, 10]), a = rand(1, b - 1), N = rand(3, 40);
      if ((a * N) % b === 0) return GEN["f6-fois"]();
      const v = (a * N) / b;
      return { enonce: `Calcule $${fr(a, b)} \\times ${N}$. Donne le résultat sous forme décimale.`, mode: "nombre", prefixe: "Résultat :", attendu: v,
        aides: [`$${fr(a, b)} \\times ${N} = ${fr(`${a} \\times ${N}`, b)}$.`, `$${a} \\times ${N} = ${a * N}$.`, `Il reste à calculer $${a * N} \\div ${b}$.`],
        solution: `$${fr(a, b)} \\times ${N} = ${fr(a * N, b)} = ${nb(v)}$.` };
    }
    // entier × fraction, résultat en fraction
    const b = rand(3, 11), a = rand(1, b - 1), k = rand(2, 9);
    if ((a * k) % b === 0) return GEN["f6-fois"]();
    const v = (a * k) / b;
    return { enonce: `Calcule $${k} \\times ${fr(a, b)}$.${CONSIGNE_FR}`, mode: "nombre", prefixe: "Résultat :", attendu: v,
      erreurs: [{ valeur: (a * k) / (b * k), message: "On ne multiplie que le numérateur : le dénominateur ne change pas." }, ...(Number.isInteger(v * 1000) ? [] : FRAC_APPROX(v))],
      aides: [`$${k} \\times ${fr(a, b)}$, c'est $${fr(a, b)}$ répété $${k}$ fois.`, `On multiplie le numérateur par $${k}$ et on garde le dénominateur $${b}$.`, `$${k} \\times ${a} = ${k * a}$.`],
      solution: `$${k} \\times ${fr(a, b)} = ${fr(`${k} \\times ${a}`, b)} = ${fr(k * a, b)}$${pgcd(k * a, b) > 1 ? ` $= ${frNet(k * a, b)}$` : ""}.` };
  };

  GEN["f6-probleme"] = function () {
    const t = rand(0, 3);
    if (t === 0) { // reste d'une classe
      const b = pick([3, 4, 5, 6, 8]), a = rand(1, b - 1), k = rand(3, 6), N = b * k;
      const [activ, autre] = pick([["la natation", "le football"], ["le chant", "le théâtre"], ["le bus", "le taxi-brousse"], ["l'anglais", "l'espagnol"]]);
      const pa = (a * N) / b;
      return { enonce: `Dans une classe de $${N}$ élèves, les $${fr(a, b)}$ choisissent ${activ} et les autres ${autre}. Combien d'élèves choisissent ${autre} ?`, mode: "nombre", prefixe: "Élèves :", attendu: N - pa,
        erreurs: [{ valeur: pa, message: `Ça, ce sont les élèves qui choisissent ${activ}.` }],
        aides: [`Calcule d'abord les $${fr(a, b)}$ de $${N}$.`, `$${N} \\div ${b} = ${k}$, puis $${k} \\times ${a} = ${pa}$.`, "Les autres, c'est le total moins ce nombre."],
        solution: `$${fr(a, b)}$ de $${N}$ : $${pa}$ élèves choisissent ${activ}. Les autres : $${N} - ${pa} = ${N - pa}$ élèves.` };
    }
    if (t === 1) { // fraction restante d'un gâteau / champ
      const b = pick([4, 6, 8, 10, 12]), a1 = rand(1, b / 2), a2 = rand(1, b - a1 - 1), r = b - a1 - a2;
      return { enonce: `Un agriculteur plante des bananiers sur $${fr(a1, b)}$ de son champ et du manioc sur $${fr(a2, b)}$. Quelle fraction du champ reste libre ?${CONSIGNE_FR}`, mode: "nombre", prefixe: "Fraction libre :", attendu: r / b,
        erreurs: [{ valeur: (a1 + a2) / b, message: "Ça, c'est la partie plantée. On demande la partie libre." }, ...(Number.isInteger((r / b) * 1000) ? [] : FRAC_APPROX(r / b))],
        aides: ["Le champ entier, c'est $1$, soit $" + fr(b, b) + "$.", `Partie plantée : $${fr(a1, b)} + ${fr(a2, b)} = ${fr(a1 + a2, b)}$.`, `Partie libre : $${fr(b, b)} - ${fr(a1 + a2, b)}$.`],
        solution: `Partie plantée : $${fr(a1 + a2, b)}$. Partie libre : $${fr(b, b)} - ${fr(a1 + a2, b)} = ${fr(r, b)}$${pgcd(r, b) > 1 ? ` $= ${frNet(r, b)}$` : ""}.` };
    }
    if (t === 2) { // distance parcourue
      const b = pick([2, 3, 4, 5]), a = rand(1, b - 1), k = rand(Math.ceil(20 / b), Math.floor(50 / b)), D = b * k;
      if (pgcd(a, b) !== 1) return GEN["f6-probleme"]();
      return { enonce: `Un sentier de randonnée vers le mont Choungui mesure $${D}$ hm. Une randonneuse a parcouru les $${fr(a, b)}$ du sentier. Combien d'hectomètres lui reste-t-il à parcourir ?`, mode: "nombre", prefixe: "Il reste", suffixe: "hm", attendu: D - (a * D) / b,
        erreurs: [{ valeur: (a * D) / b, message: "Ça, c'est ce qu'elle a déjà parcouru." }],
        aides: [`Calcule les $${fr(a, b)}$ de $${D}$.`, `$${D} \\div ${b} = ${k}$, puis $\\times ${a}$.`, "Retire ce résultat de la longueur totale."],
        solution: `Parcouru : $${fr(a, b)} \\times ${D} = ${(a * D) / b}$ hm. Reste : $${D} - ${(a * D) / b} = ${D - (a * D) / b}$ hm.` };
    }
    // comparer deux parts
    const b = rand(2, 6), k = 2, a1 = rand(1, b - 1), a2 = rand(1, b * k - 1);
    if (a1 * k === a2) return GEN["f6-probleme"]();
    const p1 = fr(a1, b), p2 = fr(a2, b * k), qui = a1 * k > a2 ? 0 : 1;
    const choix = ["Fatima", "Ali", "Ils ont mangé autant"];
    return { enonce: `Fatima mange $${p1}$ d'une pizza et Ali $${p2}$ d'une autre pizza de même taille. Qui a mangé le plus ?`, mode: "choix", choix, attendu: qui,
      aides: ["Pour comparer, écris les deux fractions avec le même dénominateur.", `$${p1} = ${fr(a1 * k, b * k)}$.`, "Compare les numérateurs."],
      solution: `$${p1} = ${fr(a1 * k, b * k)}$ et ${qui === 0 ? `$${a1 * k} > ${a2}$` : `$${a1 * k} < ${a2}$`} : c'est ${choix[qui]} qui a mangé le plus.` };
  };

  /* =====================================================================
     6e, chapitre 5 : proportionnalité (préfixe p6-)
     Programme : proportionnalité entre deux grandeurs, reliée au « prix au kilo » ; procédures de linéarité
     (multiplicative, additive) et retour à l'unité ; tableaux avec le nom et l'unité de chaque grandeur ;
     initiation aux échelles. Le produit en croix n'est pas enseigné, le coefficient n'est pas nommé.
     ===================================================================== */
  // Situations : [objet au pluriel, unité de la première grandeur, prix ou valeur pour 1 (en centièmes), unité de la seconde]
  const SITUATIONS_P = [
    ["cahiers", "cahiers", [80, 250], "€", "Cahiers"], ["mangues", "mangues", [40, 150], "€", "Mangues"], ["kg de riz", "kg", [120, 300], "€", "Riz en kg"],
    ["litres d'essence", "L", [185, 210], "€", "Essence en L"], ["tickets de bus", "tickets", [100, 250], "€", "Tickets"], ["kg de tomates", "kg", [200, 500], "€", "Tomates en kg"],
    ["bouteilles d'eau", "bouteilles", [40, 120], "€", "Bouteilles"]
  ];
  const cTex = (c) => (c % 100 ? ecrit(c, 2) : ecrit(c / 100)); // valeur en centièmes, écrite avec deux décimales si besoin
  const tabP = (nom1, nom2, xs, ys) => ({ lignes: [[`\\text{${nom1}}`, ...xs], [`\\text{${nom2}}`, ...ys]] });

  GEN["p6-reconnaitre"] = function () {
    if (Math.random() < 0.5) { // une situation parmi quatre
      const n1 = rand(2, 6), k = rand(2, 4), p = rand(3, 9) * 50;
      const PROP = [
        `$${n1}$ cahiers identiques coûtent $${cTex(n1 * p)}$ € et $${n1 * k}$ cahiers coûtent $${cTex(n1 * k * p)}$ €.`,
        `En $${n1}$ min, un robinet qui coule toujours de la même façon remplit $${n1 * 3}$ L ; en $${n1 * k}$ min, il remplit $${n1 * k * 3}$ L.`,
        `Une voiture qui roule toujours à la même vitesse parcourt $${n1 * 15}$ km en $${n1 * 10}$ min et $${n1 * k * 15}$ km en $${n1 * k * 10}$ min.`
      ];
      const age = rand(5, 10);
      const NON = [
        `À $${age}$ ans, Anli mesurait $${ecrit(rand(110, 135), 2)}$ m ; à $${age * 2}$ ans, il mesure $${ecrit(rand(160, 180), 2)}$ m.`,
        `Un taxi-brousse coûte $${rand(2, 3)}$ € de prise en charge plus $1$ € par km : $${n1}$ km coûtent $${n1 + 2}$ € et $${n1 * k}$ km coûtent $${n1 * k + 2}$ €.`,
        `Un abonnement de cantine coûte $${rand(20, 40)}$ € par mois, que l'on mange $${n1}$ fois ou $${n1 * k}$ fois.`,
        `Une bougie mesure $${n1 * 2 + 10}$ cm ; après $${n1}$ h, elle mesure $${n1 * 2 + 10 - n1}$ cm, et après $${n1 * k}$ h, $${n1 * 2 + 10 - n1 * k > 0 ? n1 * 2 + 10 - n1 * k : 1}$ cm.`,
        `À $8$ h, il fait $${rand(24, 26)}$ °C à Mamoudzou ; à $16$ h, il fait $${rand(29, 32)}$ °C.`
      ];
      const bon = pick(PROP), c = melange(bon, shuffle(NON).slice(0, 3));
      return { enonce: "Laquelle de ces situations est une situation de **proportionnalité** ?", mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Deux grandeurs sont proportionnelles si, quand on multiplie l'une par un nombre, l'autre est multipliée par le **même** nombre.", "Cherche par combien est multipliée la première grandeur, puis vérifie la seconde.", "Une somme fixe à payer en plus (prise en charge, abonnement) empêche la proportionnalité."],
        solution: `${bon.replace(/\.$/, "")} : quand la première grandeur est multipliée par $${k}$, la seconde aussi. Dans les autres situations, ce n'est pas le cas.` };
    }
    // un tableau : proportionnel ou non, avec la bonne raison
    const [obj, u1, pr, u2, court] = pick(SITUATIONS_P), p = rand(pr[0] / 10, pr[1] / 10) * 10;
    const xs = shuffle([2, 3, 4, 5, 6, 8, 10]).slice(0, 3).sort((a, b) => a - b), prop = Math.random() < 0.5;
    const ys = xs.map((x) => x * p);
    const faute = rand(0, 2); if (!prop) ys[faute] += pick([-1, 1]) * rand(1, 3) * 10;
    const bons = prop ? `Oui : le prix pour $1$ est toujours $${cTex(p)}$ €` : `Non : $${xs[faute]}$ ${u1} ne coûtent pas $${xs[faute]} \\times ${cTex(p)}$ €`;
    const fausses = prop
      ? [`Non : les prix ne sont pas des nombres entiers`, `Non : les deux lignes n'augmentent pas de la même façon`, `Oui : les deux lignes augmentent`]
      : [`Oui : les deux lignes augmentent`, `Oui : le prix pour $1$ est toujours $${cTex(p)}$ €`, `Non : les prix sont trop grands`];
    const c = melange(bons, fausses);
    return { enonce: `Le prix est-il proportionnel au nombre de ${obj} ?`, tableau: tabP(court, "Prix en €", xs, ys.map(cTex)),
      mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Calcule le prix pour $1$ dans chaque colonne : divise le prix par la quantité.", "Si on trouve toujours le même prix pour $1$, c'est un tableau de proportionnalité.", "Que les nombres augmentent ne suffit pas."],
      solution: prop ? `$${xs.map((x, i) => `${cTex(ys[i])} \\div ${x} = ${cTex(p)}`).join("$ ; $")}$ : le prix pour $1$ est toujours le même, c'est un tableau de proportionnalité.`
        : `$${xs[faute]} \\times ${cTex(p)} = ${cTex(xs[faute] * p)}$, et pas $${cTex(ys[faute])}$ : le prix pour $1$ n'est pas toujours le même. Ce n'est pas un tableau de proportionnalité.` };
  };

  GEN["p6-lineaire-mult"] = function () {
    const [obj, u1, pr, u2] = pick(SITUATIONS_P), p = rand(pr[0] / 5, pr[1] / 5) * 5, n = rand(2, 8), k = rand(2, 5), fois = Math.random() < 0.6;
    const a = fois ? n : n * k, b = fois ? n * k : n;
    return { enonce: `$${a}$ ${obj} coûtent $${cTex(a * p)}$ €. Le prix est proportionnel à la quantité. Combien coûtent $${b}$ ${obj} ?`, mode: "nombre", prefixe: "Prix :", suffixe: "€", attendu: (b * p) / 100,
      erreurs: [{ valeur: (a * p + (b - a) * 100) / 100, message: "Ce n'est pas une addition : la quantité est multipliée (ou divisée), le prix aussi." }],
      aides: [`De $${a}$ à $${b}$ ${obj}, la quantité est ${fois ? `multipliée par $${k}$` : `divisée par $${k}$`}.`, `Le prix est donc ${fois ? "multiplié" : "divisé"} par $${k}$ lui aussi.`, `Calcule $${cTex(a * p)} ${fois ? "\\times" : "\\div"} ${k}$.`],
      solution: `$${b} = ${a} ${fois ? "\\times" : "\\div"} ${k}$, donc le prix est $${cTex(a * p)} ${fois ? "\\times" : "\\div"} ${k} = ${cTex(b * p)}$ €.` };
  };

  GEN["p6-lineaire-add"] = function () {
    const [obj, u1, pr] = pick(SITUATIONS_P), p = rand(pr[0] / 5, pr[1] / 5) * 5;
    let a = rand(2, 9), b = rand(2, 9); if (a === b) b++;
    const moins = Math.random() < 0.35 && a !== b;
    const [g, s] = a > b ? [a, b] : [b, a], cible = moins ? g - s : a + b;
    return { enonce: `$${a}$ ${obj} coûtent $${cTex(a * p)}$ € et $${b}$ ${obj} coûtent $${cTex(b * p)}$ €. Le prix est proportionnel à la quantité. Combien coûtent $${cible}$ ${obj} ?`, mode: "nombre", prefixe: "Prix :", suffixe: "€", attendu: (cible * p) / 100,
      aides: [moins ? `$${cible} = ${g} - ${s}$.` : `$${cible} = ${a} + ${b}$.`, `Le prix de $${cible}$ ${obj} est donc ${moins ? "la différence" : "la somme"} des deux prix.`, moins ? `Calcule $${cTex(g * p)} - ${cTex(s * p)}$.` : `Calcule $${cTex(a * p)} + ${cTex(b * p)}$.`],
      solution: moins ? `$${cible} = ${g} - ${s}$, donc le prix est $${cTex(g * p)} - ${cTex(s * p)} = ${cTex(cible * p)}$ €.` : `$${cible} = ${a} + ${b}$, donc le prix est $${cTex(a * p)} + ${cTex(b * p)} = ${cTex(cible * p)}$ €.` };
  };

  GEN["p6-unite"] = function () {
    const t = rand(0, 1);
    if (t === 0) {
      const [obj, u1, pr] = pick(SITUATIONS_P), p = rand(pr[0] / 5, pr[1] / 5) * 5, a = rand(3, 9);
      let b = rand(2, 12); while (b === a || b % a === 0 || a % b === 0) b = rand(2, 13);
      const pourUn = Math.random() < 0.35;
      return { enonce: pourUn ? `$${a}$ ${obj} coûtent $${cTex(a * p)}$ €. Combien coûte $1$ ${obj.replace(/s( |$)/, "$1").replace(/^kg/, "kg")} ?` : `$${a}$ ${obj} coûtent $${cTex(a * p)}$ €. Le prix est proportionnel à la quantité. Combien coûtent $${b}$ ${obj} ?`,
        mode: "nombre", prefixe: "Prix :", suffixe: "€", attendu: ((pourUn ? 1 : b) * p) / 100,
        erreurs: [{ valeur: (a * p) / 100 + (b - a), message: "On ne peut pas ajouter : passe d'abord par le prix pour $1$." }],
        aides: ["Calcule d'abord le prix pour **une** unité : c'est le retour à l'unité.", `$${cTex(a * p)} \\div ${a} = ${cTex(p)}$ € pour $1$.`, pourUn ? "C'est la réponse !" : `Multiplie ensuite par $${b}$.`],
        solution: `Pour $1$ : $${cTex(a * p)} \\div ${a} = ${cTex(p)}$ €.${pourUn ? "" : ` Pour $${b}$ : $${cTex(p)} \\times ${b} = ${cTex(b * p)}$ €.`}` };
    }
    // battements du cœur, vitesse régulière
    const [phrase, u, q] = pick([["Au repos, le cœur de Nadia bat $VAL$ fois en $A$ minutes. Combien de fois bat-il en $B$ minutes ?", "battements", [60, 80]], ["Une imprimante imprime $VAL$ pages en $A$ minutes. Combien de pages en $B$ minutes ?", "pages", [8, 20]], ["Un cycliste qui roule à vitesse constante parcourt $VAL$ km en $A$ heures. Combien de kilomètres en $B$ heures ?", "km", [15, 25]]]);
    const v = rand(q[0], q[1]), a = rand(2, 5); let b = rand(2, 9); while (b === a || b % a === 0) b = rand(2, 9);
    return { enonce: phrase.replace("$VAL$", `$${v * a}$`).replace("$A$", `$${a}$`).replace("$B$", `$${b}$`) + " (on suppose que c'est proportionnel)", mode: "nombre", prefixe: "Réponse :", suffixe: u, attendu: v * b,
      aides: ["Calcule d'abord pour **une** minute (ou une heure) : c'est le retour à l'unité.", `$${v * a} \\div ${a} = ${v}$.`, `Puis multiplie par $${b}$.`],
      solution: `Pour $1$ : $${v * a} \\div ${a} = ${v}$. Pour $${b}$ : $${v} \\times ${b} = ${v * b}$ ${u}.` };
  };

  GEN["p6-tableau"] = function () {
    const [obj, u1, pr, u2, court] = pick(SITUATIONS_P), p = rand(pr[0] / 10, pr[1] / 10) * 10;
    const xs = shuffle([2, 3, 4, 5, 6, 8, 10, 12]).slice(0, 3).sort((a, b) => a - b), trou = rand(0, 2);
    const ys = xs.map((x) => cTex(x * p)); ys[trou] = "?";
    // une procédure possible : d'une autre colonne par multiplication, addition, ou par le prix pour 1
    const j = xs.findIndex((x, i) => i !== trou && xs[trou] % x === 0), s = xs.findIndex((x, i) => i !== trou && xs.some((y, l) => l !== trou && l !== i && x + y === xs[trou]));
    let indice;
    if (j >= 0) indice = `$${xs[trou]} = ${xs[j]} \\times ${xs[trou] / xs[j]}$ : multiplie le prix de $${xs[j]}$ par $${xs[trou] / xs[j]}$.`;
    else if (s >= 0) { const l = xs.findIndex((y, l) => l !== trou && l !== s && xs[s] + y === xs[trou]); indice = `$${xs[trou]} = ${xs[s]} + ${xs[l]}$ : ajoute les prix de ces deux colonnes.`; }
    else indice = `Calcule d'abord le prix pour $1$, puis multiplie par $${xs[trou]}$.`;
    return { enonce: `Ce tableau est un tableau de proportionnalité. Quel nombre manque à la place du point d'interrogation ?`, tableau: tabP(court, "Prix en €", xs, ys),
      mode: "nombre", prefixe: "? =", attendu: (xs[trou] * p) / 100,
      aides: ["Cherche un lien entre la quantité de la colonne « ? » et celle d'une autre colonne.", indice, `Le prix pour $1$ est $${cTex(p)}$ €.`],
      solution: `Le prix pour $1$ est $${cTex(xs[(trou + 1) % 3] * p)} \\div ${xs[(trou + 1) % 3]} = ${cTex(p)}$ €, donc pour $${xs[trou]}$ : $${cTex(p)} \\times ${xs[trou]} = ${cTex(xs[trou] * p)}$ €.` };
  };

  GEN["p6-echelle"] = function () {
    const t = rand(0, 2);
    if (t < 2) {
      const [ctx, u, e, uu] = pick([["Sur le plan du collège", "cm", pick([2, 5, 10, 20]), "m"], ["Sur une carte de Mayotte", "cm", pick([2, 3, 5]), "km"], ["Sur le plan du village", "cm", pick([10, 20, 50]), "m"]]);
      const L = Dc(rand(11, 95), 1), R = mulD(L, Dc(e));
      if (t === 0) return { enonce: `${ctx}, $1$ ${u} représente $${e}$ ${uu} dans la réalité. Un segment mesure $${tD(L)}$ ${u} sur le plan. Quelle longueur réelle représente-t-il ?`, mode: "nombre", prefixe: "Longueur réelle :", suffixe: uu, attendu: vD(R),
        aides: ["Les longueurs réelles sont proportionnelles aux longueurs sur le plan.", `$1$ ${u} sur le plan $\\rightarrow$ $${e}$ ${uu} en vrai.`, `Calcule $${tD(L)} \\times ${e}$.`],
        solution: `$${tD(L)} \\times ${e} = ${tD(R)}$ : il représente $${tD(R)}$ ${uu}.`, tableau: tabP(`Plan en ${u}`, `Réalité en ${uu}`, ["1", tD(L)], [String(e), "?"]) };
      return { enonce: `${ctx}, $1$ ${u} représente $${e}$ ${uu} dans la réalité. Une longueur réelle de $${tD(R)}$ ${uu} mesure combien sur le plan ?`, mode: "nombre", prefixe: "Sur le plan :", suffixe: u, attendu: vD(L),
        aides: ["Les longueurs réelles sont proportionnelles aux longueurs sur le plan.", `$${e}$ ${uu} en vrai $\\rightarrow$ $1$ ${u} sur le plan.`, `Calcule $${tD(R)} \\div ${e}$.`],
        solution: `$${tD(R)} \\div ${e} = ${tD(L)}$ : elle mesure $${tD(L)}$ ${u} sur le plan.` };
    }
    const e = pick([2, 3, 4, 5, 10]), dim = rand(4, 15), autre = dim + rand(1, 6);
    return { enonce: `On agrandit une photo : toutes les longueurs sont multipliées par le même nombre. Un côté de $${dim}$ cm devient $${dim * e}$ cm. Que devient un autre côté de $${autre}$ cm ?`, mode: "nombre", prefixe: "Il devient", suffixe: "cm", attendu: autre * e,
      erreurs: [{ valeur: autre + dim * (e - 1), message: "On n'ajoute pas le même nombre : les longueurs sont **multipliées** par le même nombre." }],
      aides: [`$${dim} \\times ${e} = ${dim * e}$ : les longueurs sont multipliées par $${e}$.`, `L'autre côté est aussi multiplié par $${e}$.`, `Calcule $${autre} \\times ${e}$.`],
      solution: `Les longueurs sont multipliées par $${e}$ : $${autre} \\times ${e} = ${autre * e}$ cm.` };
  };

  GEN["p6-probleme"] = function () {
    const t = rand(0, 2);
    if (t === 0) { // recette
      const pers = pick([4, 6, 8]), k = pick([2, 3, 0.5]), pers2 = pers * k;
      const farine = pers * 50, coco = pers * 10, sucre = pers * 25;
      const [ing, q, u] = pick([["farine", farine, "g"], ["lait de coco", coco, "cL"], ["sucre", sucre, "g"]]);
      return { enonce: `Pour un gâteau de $${pers}$ personnes, il faut $${farine}$ g de farine, $${coco}$ cL de lait de coco et $${sucre}$ g de sucre. Quelle quantité de ${ing} faut-il pour $${pers2}$ personnes ?`, mode: "nombre", prefixe: "Il faut", suffixe: u, attendu: q * k,
        erreurs: [{ valeur: q + (pers2 - pers), message: "Les quantités sont proportionnelles au nombre de personnes : on multiplie (ou on divise), on n'ajoute pas." }],
        aides: [`De $${pers}$ à $${pers2}$ personnes, on ${k < 1 ? "divise par $2$" : `multiplie par $${k}$`}.`, `Toutes les quantités sont ${k < 1 ? "divisées par $2$" : `multipliées par $${k}$`}.`, `Calcule pour le ${ing} : $${q}$ ${u}.`],
        solution: `$${pers2} = ${pers} ${k < 1 ? "\\div 2" : `\\times ${k}`}$, donc il faut $${q} ${k < 1 ? "\\div 2" : `\\times ${k}`} = ${nb(q * k)}$ ${u} de ${ing}.` };
    }
    if (t === 1) { // essence et distance
      const conso = rand(5, 8), d = pick([100, 200, 50, 300]), d2 = pick([150, 250, 400, 350, 450]);
      if (d2 === d) return GEN["p6-probleme"]();
      const L1 = (conso * d) / 100;
      return { enonce: `Une voiture consomme $${nb(L1)}$ L d'essence pour $${d}$ km. Sa consommation est proportionnelle à la distance. Combien consomme-t-elle pour $${d2}$ km ?`, mode: "nombre", prefixe: "Consommation :", suffixe: "L", attendu: (conso * d2) / 100,
        aides: ["Passe par une distance simple : $50$ km ou $100$ km.", `Pour $100$ km, elle consomme $${conso}$ L.`, `$${d2} = ${d2 / 50} \\times 50$, ou décompose $${d2}$ en centaines et dizaines.`],
        solution: `Pour $100$ km : $${conso}$ L, donc pour $50$ km : $${nb(conso / 2)}$ L. Pour $${d2}$ km : $${nb(conso / 2)} \\times ${d2 / 50} = ${nb((conso * d2) / 100)}$ L.` };
    }
    // salaire ou location à l'heure
    const pH = rand(8, 12), h = rand(2, 6), h2 = rand(7, 20);
    return { enonce: `Pour garder sa petite sœur, Moinécha gagne $${pH * h}$ € en $${h}$ heures. Combien gagne-t-elle en $${h2}$ heures, au même tarif ?`, mode: "nombre", prefixe: "Elle gagne", suffixe: "€", attendu: pH * h2,
      erreurs: [{ valeur: pH * h + (h2 - h), message: "Elle ne gagne pas $1$ € de plus par heure : calcule d'abord ce qu'elle gagne en $1$ heure." }],
      aides: ["Calcule d'abord ce qu'elle gagne en $1$ heure.", `$${pH * h} \\div ${h} = ${pH}$ € par heure.`, `Puis multiplie par $${h2}$.`],
      solution: `En $1$ heure : $${pH * h} \\div ${h} = ${pH}$ €. En $${h2}$ heures : $${pH} \\times ${h2} = ${pH * h2}$ €.` };
  };

  /* =====================================================================
     6e, chapitre 6 : pourcentages (préfixe t6-)
     Programme : sens d'un pourcentage (« pour 100 »), écritures (fraction, décimal, pourcentage),
     calculer une proportion et l'exprimer en pourcentage dans des cas simples, appliquer un pourcentage.
     ===================================================================== */
  FIGURES["t6-quadrillage"] = () => quadrillage(10, 3).replace(/rectangle colorié de 10 dixièmes sur 3 dixièmes/, "30 petits carrés coloriés sur 100");

  GEN["t6-ecritures"] = function () {
    const t = rand(0, 3);
    if (t === 0) { // quadrillage de 100 carrés
      const L = rand(1, 10), l = rand(1, 9), p = L * l;
      return { enonce: "Le grand carré est partagé en $100$ petits carrés. Quel pourcentage du grand carré est colorié ?", figure: quadrillage(L, l), mode: "nombre", prefixe: "Pourcentage :", suffixe: "%", attendu: p,
        aides: ["« Pour cent », c'est « sur $100$ ».", `Compte les petits carrés coloriés : $${L} \\times ${l}$.`, "Le nombre de carrés coloriés sur $100$ donne le pourcentage."],
        solution: `$${L} \\times ${l} = ${p}$ petits carrés sur $100$ sont coloriés : c'est $${p}$ %.` };
    }
    if (t === 1) { // pourcentage vers décimal
      const p = rand(1, 150);
      return { enonce: `Écris $${p}$ % sous forme d'un nombre décimal.`, mode: "nombre", prefixe: "Écriture décimale :", attendu: p / 100,
        erreurs: [{ valeur: p / 10, message: `$${p}$ %, c'est $${p}$ **centièmes**, pas $${p}$ dixièmes.` }, { valeur: p, message: "Il faut diviser par $100$." }],
        aides: [`$${p}$ % $= ${fr(p, 100)}$.`, "Diviser par $100$, c'est décaler les chiffres de deux rangs vers la droite.", `$${p} \\div 100$.`],
        solution: `$${p}$ % $= ${fr(p, 100)} = ${nb(p / 100)}$.` };
    }
    if (t === 2) { // décimal vers pourcentage
      const p = rand(1, 120), x = p / 100;
      return { enonce: `Écris $${nb(x)}$ sous forme d'un pourcentage.`, mode: "nombre", prefixe: "Pourcentage :", suffixe: "%", attendu: p,
        erreurs: [{ valeur: p / 10, message: "Multiplie par $100$ : $" + nb(x) + "$, ce sont des centièmes." }],
        aides: [`$${nb(x)} = ${fr(p, 100)}$.`, "Un pourcentage, c'est un nombre de centièmes.", `$${nb(x)} \\times 100 = ${p}$.`],
        solution: `$${nb(x)} = ${fr(p, 100)} = ${p}$ %.` };
    }
    // pourcentages usuels et fractions
    const [p, f, mot] = pick([[50, fr(1, 2), "la moitié"], [25, fr(1, 4), "le quart"], [75, fr(3, 4), "les trois quarts"], [10, fr(1, 10), "le dixième"], [20, fr(1, 5), "le cinquième"], [100, "1", "le tout"], [200, "2", "le double"]]);
    const autres = [[50, fr(1, 2)], [25, fr(1, 4)], [75, fr(3, 4)], [10, fr(1, 10)], [20, fr(1, 5)], [100, "1"]].filter((x) => x[0] !== p);
    if (Math.random() < 0.5) {
      const c = melange(`$${f}$`, shuffle(autres).slice(0, 3).map((x) => `$${x[1]}$`).concat(p > 10 && p < 100 ? [`$${fr(p, 10)}$`] : []));
      return { enonce: `Prendre $${p}$ %, c'est prendre :`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["$p$ %, c'est $\\dfrac{p}{100}$.", `$${fr(p, 100)}$ : simplifie la fraction.`, `Prendre $${p}$ %, c'est prendre ${mot}.`],
        solution: `$${p}$ % $= ${fr(p, 100)} = ${f}$ : c'est ${mot}.` };
    }
    const c = melange(`$${p}$ %`, shuffle(autres).slice(0, 3).map((x) => `$${x[0]}$ %`));
    return { enonce: `Prendre ${mot}, c'est prendre :`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Écris la fraction avec le dénominateur $100$.", `${mot[0].toUpperCase() + mot.slice(1)}, c'est $${f}$.`, "Le numérateur sur $100$ donne le pourcentage."],
      solution: `${mot[0].toUpperCase() + mot.slice(1)}, c'est $${f} = ${fr(p, 100)}$, soit $${p}$ %.` };
  };

  GEN["t6-mental"] = function () {
    const [p, regle, div] = pick([[50, "la moitié", 2], [25, "le quart", 4], [10, "le dixième", 10], [75, "les trois quarts", 4], [100, "le tout", 1], [200, "le double", 0.5], [20, "le cinquième", 5], [5, "la moitié de $10$ %", 20]]);
    const N = p === 75 || p === 25 ? rand(2, 60) * 4 : p === 5 ? rand(1, 40) * 20 : p === 20 ? rand(2, 50) * 5 : p === 10 ? rand(2, 99) * 10 : rand(3, 120) * 2;
    const [u, objet] = pick([["€", ""], ["km", ""], ["kg", ""], ["L", ""], ["", " élèves"], ["", " mangues"]]);
    const rep = (p * N) / 100;
    return { enonce: `Calcule mentalement $${p}$ % de $${ecrit(N)}$${u ? " " + u : objet}.`, mode: "nombre", prefixe: "Résultat :", suffixe: u || objet.trim(), attendu: rep,
      erreurs: [{ valeur: N - rep, message: `Ça, c'est ce qui reste. On demande $${p}$ % de $${N}$.` }],
      aides: [`$${p}$ %, c'est ${regle}.`, p === 75 ? `Le quart de $${N}$ est $${N / 4}$ ; les trois quarts, c'est $3$ fois plus.` : p === 5 ? `$10$ % de $${N}$, c'est $${N / 10}$.` : `Calcule ${regle} de $${N}$.`, "Vérifie : le résultat est-il plus petit que le nombre de départ (si le pourcentage est inférieur à $100$ %) ?"],
      solution: `$${p}$ % de $${ecrit(N)}$, c'est ${regle} de $${ecrit(N)}$ : $${nb(rep)}$${u ? " " + u : objet}.` };
  };

  GEN["t6-appliquer"] = function () {
    const p = pick([12, 15, 18, 30, 35, 40, 45, 60, 65, 80, 85, 90, 8, 6, 3]), base = 100 / pgcd(p, 100), N = base * rand(1, Math.max(2, Math.floor(600 / base)));
    const [ctx, u] = pick([
      [`Dans un collège de $${N}$ élèves, $${p}$ % viennent en bus. Combien d'élèves viennent en bus ?`, "élèves"],
      [`Un jus de fruits de $${N}$ cL contient $${p}$ % de jus de mangue. Combien de cL de jus de mangue contient-il ?`, "cL"],
      [`Une parcelle de $${N}$ m² est plantée à $${p}$ % de manioc. Quelle aire est plantée de manioc ?`, "m²"],
      [`Un sondage interroge $${N}$ personnes : $${p}$ % répondent « oui ». Combien de personnes répondent « oui » ?`, "personnes"]
    ]);
    const rep = (p * N) / 100;
    return { enonce: ctx, mode: "nombre", prefixe: "Réponse :", suffixe: u, attendu: rep,
      erreurs: [{ valeur: p * N, message: "Il faut aussi diviser par $100$." }, { valeur: N - rep, message: "Ça, c'est le reste du total." }],
      aides: [`Prendre $${p}$ %, c'est multiplier par $${fr(p, 100)}$.`, `Calcule $${fr(p, 100)} \\times ${N}$, ou $${nb(p / 100)} \\times ${N}$.`, `Tu peux commencer par $${N} \\div 100 = ${nb(N / 100)}$, puis multiplier par $${p}$.`],
      solution: `$${p}$ % de $${ecrit(N)}$ : $${fr(p, 100)} \\times ${ecrit(N)} = ${nb(p / 100)} \\times ${ecrit(N)} = ${nb(rep)}$ ${u}.` };
  };

  GEN["t6-proportion"] = function () {
    const tot = pick([10, 20, 25, 50, 200, 500, 1000, 4, 5]), k = 100 / tot, part = rand(1, tot - 1);
    const p = part * k;
    if (!Number.isInteger(p)) return GEN["t6-proportion"]();
    const [ctx, u] = pick([
      [`Dans une classe de $${tot}$ élèves, $${part}$ font de la natation. Quel pourcentage des élèves fait de la natation ?`, "élèves"],
      [`Sur $${tot}$ tirs au but, Nassim en réussit $${part}$. Quel est son pourcentage de réussite ?`, "tirs"],
      [`Sur $${tot}$ mangues d'un cageot, $${part}$ sont mûres. Quel est le pourcentage de mangues mûres ?`, "mangues"],
      [`Un questionnaire compte $${tot}$ questions. Ali en réussit $${part}$. Quel pourcentage des questions a-t-il réussi ?`, "questions"]
    ]);
    return { enonce: ctx, mode: "nombre", prefixe: "Pourcentage :", suffixe: "%", attendu: p,
      erreurs: [{ valeur: part, message: `$${part}$ sur $${tot}$, ce n'est pas $${part}$ sur $100$ : ramène-toi à $100$.` }, { valeur: 100 - p, message: "Ça, c'est le pourcentage de ceux qui restent." }],
      aides: ["Un pourcentage, c'est une proportion « sur $100$ ».", tot < 100 ? `Si l'on avait $100$ ${u} au lieu de $${tot}$, on aurait $${k}$ fois plus.` : `Si l'on avait $100$ ${u} au lieu de $${tot}$, on aurait $${tot / 100}$ fois moins.`, `$${fr(part, tot)} = ${fr(p, 100)}$.`],
      solution: `$${fr(part, tot)} = ${fr(`${part} ${tot < 100 ? "\\times" : "\\div"} ${tot < 100 ? k : tot / 100}`, `${tot} ${tot < 100 ? "\\times" : "\\div"} ${tot < 100 ? k : tot / 100}`)} = ${fr(p, 100)}$ : c'est $${p}$ %.` };
  };

  GEN["t6-probleme"] = function () {
    const t = rand(0, 2);
    if (t === 0) { // remise
      const p = pick([10, 20, 25, 30, 50]), P = rand(4, 40) * (p === 25 ? 4 : p === 30 ? 10 : 5), r = (p * P) / 100, fin = Math.random() < 0.5;
      return { enonce: `Pendant les soldes, un tee-shirt à $${P}$ € est vendu avec une remise de $${p}$ %. ${fin ? "Combien paie-t-on ?" : "De combien est la remise, en euros ?"}`, mode: "nombre", prefixe: fin ? "Prix payé :" : "Remise :", suffixe: "€", attendu: fin ? P - r : r,
        erreurs: fin ? [{ valeur: r, message: "Ça, c'est la remise : il faut la retirer du prix de départ." }, { valeur: P - p, message: `On ne retire pas $${p}$ €, mais $${p}$ % du prix.` }] : [{ valeur: P - r, message: "Ça, c'est le prix payé. On demande la remise." }],
        aides: [`Calcule d'abord $${p}$ % de $${P}$ €.`, `$${p}$ % de $${P}$ $= ${nb(r)}$ €.`, fin ? `Le prix payé est $${P} - ${nb(r)}$.` : "C'est la réponse."],
        solution: `Remise : $${p}$ % de $${P}$ $= ${nb(r)}$ €.${fin ? ` Prix payé : $${P} - ${nb(r)} = ${nb(P - r)}$ €.` : ""}` };
    }
    if (t === 1) { // comparer deux proportions
      const a = pick([10, 20, 25, 50]), b = pick([10, 20, 25, 50]);
      let pa = rand(1, a - 1), pb = rand(1, b - 1);
      const qa = (pa * 100) / a, qb = (pb * 100) / b;
      if (!Number.isInteger(qa) || !Number.isInteger(qb)) return GEN["t6-probleme"]();
      const rep = qa === qb ? 2 : qa > qb ? 0 : 1;
      return { enonce: `En 6e A, $${pa}$ élèves sur $${a}$ viennent à pied. En 6e B, $${pb}$ élèves sur $${b}$. Dans quelle classe la proportion d'élèves venant à pied est-elle la plus grande ?`, mode: "choix", choix: ["En 6e A", "En 6e B", "C'est la même proportion"], attendu: rep,
        aides: ["Pour comparer, exprime chaque proportion en pourcentage.", `6e A : $${fr(pa, a)} = ${fr(qa, 100)}$.`, `6e B : $${fr(pb, b)} = ${fr(qb, 100)}$.`],
        solution: `6e A : $${qa}$ % ; 6e B : $${qb}$ %. ${["La proportion est plus grande en 6e A.", "La proportion est plus grande en 6e B.", "C'est la même proportion."][rep]}` };
    }
    // reste après pourcentage
    const p = pick([10, 20, 25, 40, 50, 60, 75, 80]), N = rand(2, 30) * (p === 25 || p === 75 ? 4 : 10);
    return { enonce: `Au collège, $${N}$ élèves de 6e participent au cross. $${p}$ % courent $2$ km, les autres courent $1$ km. Combien d'élèves courent $1$ km ?`, mode: "nombre", prefixe: "Élèves :", attendu: N - (p * N) / 100,
      erreurs: [{ valeur: (p * N) / 100, message: "Ça, ce sont les élèves qui courent $2$ km." }],
      aides: [`Les autres représentent $100 - ${p} = ${100 - p}$ %.`, `Calcule $${100 - p}$ % de $${N}$.`, `Ou bien : calcule $${p}$ % de $${N}$, puis retire-le de $${N}$.`],
      solution: `$${100 - p}$ % de $${N}$ : $${nb((100 - p) / 100)} \\times ${N} = ${N - (p * N) / 100}$ élèves courent $1$ km.` };
  };

  /* =====================================================================
     6e, chapitre 7 : pensée algébrique (préfixe a6-)
     Programme : égalités à trous (le signe « = » entre deux expressions), programmes de calcul, suites de nombres,
     motifs évolutifs (règle, nombre d'éléments à une étape donnée), problèmes avec des nombres inconnus
     modélisés par des schémas en barre. Les lettres ne sont pas un objectif en 6e : les règles sont dites en mots.
     ===================================================================== */
  // Motifs évolutifs : chaque famille donne le nombre d'éléments à l'étape n (a × n + b) et un dessin de l'étape n
  const MOTIFS = [
    { nom: "carreaux en L", obj: "carreaux", a: 2, b: 1, regle: "on commence avec $3$ carreaux, puis on ajoute $2$ carreaux à chaque étape", forme: "un carreau dans le coin, et deux branches qui grandissent d'un carreau à chaque étape",
      dessin: (n, u) => { const r = []; for (let i = 0; i <= n; i++) r.push([0, i]); for (let i = 1; i <= n; i++) r.push([i, 0]); return { carreaux: r, l: n + 1, h: n + 1 }; } },
    { nom: "croix de carreaux", obj: "carreaux", a: 4, b: 1, regle: "on commence avec $5$ carreaux, puis on ajoute $4$ carreaux à chaque étape", forme: "un carreau au centre, et quatre branches qui grandissent d'un carreau à chaque étape",
      dessin: (n) => { const r = [[n, n]]; for (let i = 1; i <= n; i++) r.push([n + i, n], [n - i, n], [n, n + i], [n, n - i]); return { carreaux: r, l: 2 * n + 1, h: 2 * n + 1 }; } },
    { nom: "rectangle de carreaux", obj: "carreaux", a: 2, b: 2, regle: "on commence avec $4$ carreaux, puis on ajoute $2$ carreaux à chaque étape", forme: "deux lignes de carreaux qui s'allongent d'un carreau à chaque étape",
      dessin: (n) => { const r = []; for (let i = 0; i <= n; i++) r.push([i, 0], [i, 1]); return { carreaux: r, l: n + 1, h: 2 }; } },
    { nom: "rangée de carrés en allumettes", obj: "allumettes", a: 3, b: 1, regle: "on commence avec $4$ allumettes, puis on ajoute $3$ allumettes à chaque étape", forme: "une rangée de carrés : le premier carré a $4$ allumettes, chaque carré ajouté en prend $3$",
      dessin: (n) => { const s = []; for (let i = 0; i <= n; i++) s.push([i, 0, i, 1]); for (let i = 0; i < n; i++) s.push([i, 0, i + 1, 0], [i, 1, i + 1, 1]); return { segments: s, l: n, h: 1 }; } },
    { nom: "maisons en allumettes", obj: "allumettes", a: 4, b: 1, regle: "on commence avec $5$ allumettes, puis on ajoute $4$ allumettes à chaque étape", forme: "une rangée de maisons : la première a $5$ allumettes, chaque maison ajoutée en prend $4$ (le mur de gauche est partagé)",
      dessin: (n) => { const s = []; for (let i = 0; i <= n; i++) s.push([i, 0, i, 1]); for (let i = 0; i < n; i++) s.push([i, 0, i + 1, 0], [i, 1, i + 0.5, 1.8], [i + 0.5, 1.8, i + 1, 1]); return { segments: s, l: n, h: 1.8 }; } },
    { nom: "rangée de triangles en allumettes", obj: "allumettes", a: 2, b: 1, regle: "on commence avec $3$ allumettes, puis on ajoute $2$ allumettes à chaque étape", forme: "une rangée de triangles, un à l'endroit, un à l'envers : le premier a $3$ allumettes, chaque triangle ajouté en prend $2$",
      dessin: (n) => { const h = 0.87, E = new Map(), arete = (p, q) => E.set([p, q].map((x) => x.join(",")).sort().join("|"), [p[0], p[1], q[0], q[1]]); for (let i = 0; i < n; i++) { const x = Math.floor(i / 2); if (i % 2 === 0) { const P = [x, 0], Q = [x + 1, 0], R = [x + 0.5, h]; arete(P, Q); arete(Q, R); arete(R, P); } else { const P = [x + 0.5, h], Q = [x + 1.5, h], R = [x + 1, 0]; arete(P, Q); arete(Q, R); arete(R, P); } } return { segments: [...E.values()], l: (n + 1) / 2, h }; } }
  ];
  // Dessin des étapes 1, 2 et 3 d'un motif, côte à côte
  function dessinMotif(M, etapes) {
    etapes = etapes || [1, 2, 3];
    const W = 320, gap = 18, bas = 20, haut = 8;
    const formes = etapes.map((n) => M.dessin(n));
    const largeurs = formes.map((f) => f.l + (f.carreaux ? 0 : 0));
    const totalL = largeurs.reduce((s, l) => s + l, 0), hMax = Math.max(...formes.map((f) => f.h));
    const u = Math.min(24, (W - gap * (etapes.length + 1)) / totalL, 110 / hMax);
    const H = Math.round(hMax * u + bas + haut + 6);
    let x = gap, s = `<svg class="graph motif" viewBox="0 0 ${W} ${H}" role="img" aria-label="Motif évolutif : ${M.nom}, étapes ${etapes.join(", ")}">`;
    formes.forEach((f, k) => {
      const w = f.l * u, y0 = haut + hMax * u; // bas du dessin
      if (f.carreaux) f.carreaux.forEach(([i, j]) => { s += `<rect class="g-carreau" x="${+(x + i * u).toFixed(1)}" y="${+(y0 - (j + 1) * u).toFixed(1)}" width="${+u.toFixed(1)}" height="${+u.toFixed(1)}"/>`; });
      else f.segments.forEach(([x1, y1, x2, y2]) => { s += `<line class="g-allumette" x1="${+(x + x1 * u).toFixed(1)}" y1="${+(y0 - y1 * u).toFixed(1)}" x2="${+(x + x2 * u).toFixed(1)}" y2="${+(y0 - y2 * u).toFixed(1)}"/>`; });
      s += `<text class="g-plabel" x="${+(x + w / 2).toFixed(1)}" y="${H - 5}" text-anchor="middle">Étape ${etapes[k]}</text>`;
      x += w + gap;
    });
    return s + `</svg>`;
  }
  FIGURES["a6-motif"] = () => dessinMotif(MOTIFS[0]);
  FIGURES["a6-allumettes"] = () => dessinMotif(MOTIFS[3]);

  // Schéma en barre : lignes de barres ; chaque barre = { u: nombre d'unités égales, plus: morceau en plus (texte), lab: étiquette }
  function schemaBarres(lignes, total) {
    const W = 320, x0 = 74, wMax = W - x0 - 30, hb = 26, gap = 14;
    const unites = Math.max(...lignes.map((l) => l.u + (l.plus ? 1 : 0)));
    const uw = wMax / unites, H = lignes.length * (hb + gap) + (total ? 22 : 4) + 4;
    let s = `<svg class="graph barres" viewBox="0 0 ${W} ${H}" role="img" aria-label="Schéma en barre">`;
    lignes.forEach((l, k) => {
      const y = 6 + k * (hb + gap);
      s += `<text class="g-plabel" x="${x0 - 8}" y="${y + hb / 2 + 4}" text-anchor="end">${l.nom}</text>`;
      for (let i = 0; i < l.u; i++) s += `<rect class="g-aire g-colorie g-barre" x="${+(x0 + i * uw).toFixed(1)}" y="${y}" width="${+uw.toFixed(1)}" height="${hb}"/><text class="g-plabel" x="${+(x0 + (i + 0.5) * uw).toFixed(1)}" y="${y + hb / 2 + 4}" text-anchor="middle">${l.lab || "?"}</text>`;
      if (l.plus) s += `<rect class="g-barre-plus" x="${+(x0 + l.u * uw).toFixed(1)}" y="${y}" width="${+uw.toFixed(1)}" height="${hb}"/><text class="g-plabel" x="${+(x0 + (l.u + 0.5) * uw).toFixed(1)}" y="${y + hb / 2 + 4}" text-anchor="middle">${l.plus}</text>`;
    });
    if (total) {
      const yb = lignes.length * (hb + gap) + 2, xe = x0 + Math.max(...lignes.map((l) => (l.u + (l.plus ? 1 : 0)) * uw));
      s += `<path class="g-accolade" d="M${x0 + 2} ${yb - 8} V${yb} H${xe - 2} V${yb - 8}"/><text class="g-plabel" x="${+((x0 + xe) / 2).toFixed(1)}" y="${yb + 14}" text-anchor="middle">${total}</text>`;
    }
    return s + `</svg>`;
  }
  FIGURES["a6-barres"] = () => schemaBarres([{ nom: "Louis", u: 1 }, { nom: "Sarah", u: 1, plus: "6" }], "40 billes en tout");

  GEN["a6-trous"] = function () {
    const t = rand(0, 3);
    let gauche, rep, droite, val;
    const a = rand(3, 12), b = rand(3, 12); val = a * b;
    if (t === 0) { const x = rand(val + 10, val + 200); rep = x - val; gauche = `${x} - \\ldots`; droite = `${a} \\times ${b}`; }
    else if (t === 1) { const y = rand(5, val - 1 > 5 ? val - 1 : 30); rep = val - y; if (rep <= 0) return GEN["a6-trous"](); gauche = `\\ldots + ${y}`; droite = `${a} \\times ${b}`; }
    else if (t === 2) { const k = rand(2, 9), r = rand(2, 15), s2 = k * r; const y = rand(1, 40); rep = r; gauche = `${k} \\times \\ldots`; droite = `${s2 + y} - ${y}`; val = s2; }
    else { const k = rand(2, 9), q = rand(3, 20), y = rand(5, 60); rep = k * q; gauche = `\\ldots \\div ${k}`; droite = `${q + y} - ${y}`; val = q; }
    const faux = t === 0 ? (gauche.split(" ")[0] - 0) + val : null;
    return { enonce: `Complète l'égalité : $${gauche} = ${droite}$.`, mode: "nombre", prefixe: "Le nombre manquant est", attendu: rep,
      erreurs: [{ valeur: val, message: "Ça, c'est le résultat du membre de droite. Le signe $=$ dit que les deux côtés valent la même chose : il faut encore trouver le nombre manquant." }],
      aides: ["Le signe $=$ veut dire : « les deux côtés valent le même nombre ».", `Calcule d'abord le côté que tu connais : $${droite} = ${val}$.`, `Cherche le nombre qui rend le côté gauche égal à $${val}$.`],
      solution: `$${droite} = ${val}$. ${t === 0 ? `$${gauche.split(" ")[0]} - ${rep} = ${val}$` : t === 1 ? `$${rep} + ${gauche.split(" + ")[1]} = ${val}$` : t === 2 ? `$${gauche.split(" ")[0]} \\times ${rep} = ${val}$` : `$${rep} \\div ${gauche.split("\\div ")[1]} = ${val}$`}, donc le nombre manquant est $${rep}$.` };
  };

  GEN["a6-programme"] = function () {
    const t = rand(0, 2), m = rand(2, 9), p = rand(1, 20), avant = Math.random() < 0.5;
    // programme : soit (x × m) + p, soit (x + p) × m
    const etapes = avant ? [`Multiplie-le par $${m}$.`, `Ajoute $${p}$.`] : [`Ajoute $${p}$.`, `Multiplie le résultat par $${m}$.`];
    const f = (x) => (avant ? x * m + p : (x + p) * m), prog = `« Choisis un nombre. ${etapes.join(" ")} »`;
    if (t === 0) { const x = Math.random() < 0.3 ? Dc(rand(11, 99), 1) : Dc(rand(1, 30)); const r = avant ? addD(mulD(x, Dc(m)), Dc(p)) : mulD(addD(x, Dc(p)), Dc(m));
      return { enonce: `Voici un programme de calcul : ${prog} Quel résultat obtient-on avec $${tD(x)}$ ?`, mode: "nombre", prefixe: "Résultat :", attendu: vD(r),
        erreurs: [{ valeur: avant ? (vD(x) + p) * m : vD(x) * m + p, message: "Respecte l'ordre des étapes du programme." }],
        aides: ["Applique les étapes **dans l'ordre**.", avant ? `$${tD(x)} \\times ${m} = ${tD(mulD(x, Dc(m)))}$.` : `$${tD(x)} + ${p} = ${tD(addD(x, Dc(p)))}$.`, "Fais ensuite la deuxième étape."],
        solution: avant ? `$${tD(x)} \\times ${m} = ${tD(mulD(x, Dc(m)))}$, puis $${tD(mulD(x, Dc(m)))} + ${p} = ${tD(r)}$.` : `$${tD(x)} + ${p} = ${tD(addD(x, Dc(p)))}$, puis $${tD(addD(x, Dc(p)))} \\times ${m} = ${tD(r)}$.` }; }
    if (t === 1) { const x = rand(1, 30), r = f(x);
      return { enonce: `Voici un programme de calcul : ${prog} On a obtenu $${r}$. Quel nombre avait-on choisi ?`, mode: "nombre", prefixe: "Nombre choisi :", attendu: x,
        aides: ["Remonte le programme à l'envers, avec les opérations contraires.", avant ? `Le contraire de « ajouter $${p}$ », c'est « soustraire $${p}$ » : $${r} - ${p} = ${r - p}$.` : `Le contraire de « multiplier par $${m}$ », c'est « diviser par $${m}$ » : $${r} \\div ${m} = ${r / m}$.`, avant ? `Puis divise par $${m}$.` : `Puis soustrais $${p}$.`],
        solution: avant ? `$${r} - ${p} = ${r - p}$, puis $${r - p} \\div ${m} = ${x}$. Vérification : $${x} \\times ${m} + ${p} = ${r}$.` : `$${r} \\div ${m} = ${r / m}$, puis $${r / m} - ${p} = ${x}$. Vérification : $(${x} + ${p}) \\times ${m} = ${r}$.` }; }
    // expression générale : prix de N objets + livraison
    const [obj, prix, frais] = pick([["tee-shirts", rand(8, 15), rand(3, 8)], ["livres", rand(5, 12), rand(2, 6)], ["places de cinéma", rand(6, 9), rand(1, 3)]]), N = rand(2, 9);
    const bon = `$(N \\times ${prix}) + ${frais}$`;
    const c = melange(bon, [`$(N + ${prix}) \\times ${frais}$`, `$N \\times (${prix} + ${frais})$`, `$(N \\times ${frais}) + ${prix}$`, `$N + ${prix} + ${frais}$`]);
    return { enonce: `Sur un site, des ${obj} coûtent $${prix}$ € pièce, et la livraison coûte $${frais}$ € quelle que soit la commande. $N$ désigne le nombre de ${obj} achetés. Quelle écriture donne le prix à payer, en euros ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Essaie avec un nombre : par exemple $N = 2$. Combien paie-t-on ?", `$2$ ${obj} : $2 \\times ${prix} = ${2 * prix}$ €, plus la livraison.`, "La livraison n'est payée qu'une fois."],
      solution: `On paie $N$ fois $${prix}$ €, plus une seule fois $${frais}$ € : ${bon}. Par exemple, pour $${N}$ ${obj} : $(${N} \\times ${prix}) + ${frais} = ${N * prix + frais}$ €.` };
  };

  GEN["a6-suite"] = function () {
    const t = rand(0, 2), d = rand(2, 12), u0 = rand(1, 30), mult = Math.random() < 0.25;
    const terme = (k) => (mult ? u0 * 2 ** k : u0 + d * k), vus = [0, 1, 2, 3].map(terme);
    if (mult && u0 > 12) return GEN["a6-suite"]();
    const liste = vus.map(String).join(" ; ");
    if (t === 0) return { enonce: `Voici le début d'une suite de nombres : $${liste}$ ; … Quel est le nombre suivant ?`, mode: "nombre", prefixe: "Nombre suivant :", attendu: terme(4),
      aides: ["Compare deux nombres qui se suivent : que fait-on pour passer de l'un à l'autre ?", mult ? "On ne fait pas toujours la même addition : regarde plutôt les multiplications." : `$${vus[1]} - ${vus[0]} = ${d}$ et $${vus[2]} - ${vus[1]} = ${d}$.`, mult ? "Chaque nombre est le double du précédent." : `On ajoute $${d}$ à chaque fois.`],
      solution: mult ? `Chaque nombre est le double du précédent : $${vus[3]} \\times 2 = ${terme(4)}$.` : `On ajoute $${d}$ à chaque fois : $${vus[3]} + ${d} = ${terme(4)}$.` };
    if (t === 1) {
      const bon = mult ? "On multiplie par $2$" : `On ajoute $${d}$`;
      const c = melange(bon, mult ? [`On ajoute $${vus[1] - vus[0]}$`, "On multiplie par $3$", `On ajoute $${u0}$ puis on multiplie par $2$`] : [`On multiplie par $${d}$`, `On ajoute $${d + 1}$`, `On ajoute $${vus[0]}$`].filter((x) => x !== bon));
      return { enonce: `Quelle règle permet de passer d'un nombre au suivant dans la suite $${liste}$ ; … ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Teste chaque règle sur les deux premiers nombres, puis sur les deux suivants.", "Une bonne règle doit marcher **à chaque fois**.", `De $${vus[0]}$ à $${vus[1]}$, puis de $${vus[1]}$ à $${vus[2]}$ : que se passe-t-il ?`],
        solution: `${bon} : ${vus.slice(0, 3).map((v, k) => `$${v} \\rightarrow ${vus[k + 1]}$`).join(" ; ")}.` };
    }
    if (mult) return GEN["a6-suite"]();
    const k = rand(8, 30);
    return { enonce: `La suite $${liste}$ ; … continue en ajoutant toujours $${d}$. Quel est le ${k}e nombre de la suite ?`, mode: "nombre", prefixe: `${k}e nombre :`, attendu: u0 + d * (k - 1),
      erreurs: [{ valeur: u0 + d * k, message: `Pour arriver au ${k}e nombre, on ajoute $${d}$ seulement $${k - 1}$ fois (le 1er nombre est déjà là).` }, { valeur: d * k, message: `N'oublie pas le premier nombre, $${u0}$.` }],
      aides: [`Du 1er au 2e nombre, on ajoute $${d}$ une fois ; du 1er au 3e, deux fois.`, `Du 1er au ${k}e, on ajoute $${d}$ en tout $${k - 1}$ fois.`, `Calcule $${u0} + ${k - 1} \\times ${d}$.`],
      solution: `$${u0} + ${k - 1} \\times ${d} = ${u0} + ${(k - 1) * d} = ${u0 + d * (k - 1)}$.` };
  };

  GEN["a6-motif"] = function () {
    const M = pick(MOTIFS), t = rand(0, 3), nb2 = (n) => M.a * n + M.b;
    const fig = dessinMotif(M);
    if (t === 0) { const n = rand(4, 6);
      return { enonce: `Voici les trois premières étapes d'un motif (${M.nom}). Combien de ${M.obj} faut-il pour l'étape $${n}$ ?`, figure: fig, mode: "nombre", prefixe: "Réponse :", suffixe: M.obj, attendu: nb2(n),
        aides: [`Compte les ${M.obj} des étapes $1$, $2$ et $3$ : $${nb2(1)}$ ; $${nb2(2)}$ ; $${nb2(3)}$.`, `À chaque étape, on ajoute $${M.a}$ ${M.obj}.`, `Continue jusqu'à l'étape $${n}$.`],
        solution: `$${[1, 2, 3, 4, 5, 6].slice(0, n).map(nb2).join(" ; ")}$ : on ajoute $${M.a}$ ${M.obj} à chaque étape, donc l'étape $${n}$ compte $${nb2(n)}$ ${M.obj}.` }; }
    if (t === 1) { const n = pick([10, 12, 15, 20, 25, 30, 50, 100]);
      return { enonce: `Voici les trois premières étapes d'un motif (${M.nom}). Combien de ${M.obj} faut-il pour l'étape $${n}$ ?`, figure: fig, mode: "nombre", prefixe: "Réponse :", suffixe: M.obj, attendu: nb2(n),
        erreurs: [{ valeur: M.a * n, message: `Tu as oublié ${M.b === 1 ? `le ${M.obj === "carreaux" ? "carreau" : "l'allumette"} de départ` : `les $${M.b}$ ${M.obj} de départ`}.` }, { valeur: nb2(1) * n, message: "Les éléments ne sont pas tous multipliés : certains sont partagés ou fixes. Regarde ce qu'on ajoute à chaque étape." }],
        aides: [`Structure du motif : ${M.forme}.`, `À l'étape $n$, il y a $${M.a} \\times n + ${M.b}$ ${M.obj} (vérifie avec les étapes $1$, $2$, $3$).`, `Calcule $${M.a} \\times ${n} + ${M.b}$.`],
        solution: `À chaque étape, on ajoute $${M.a}$ ${M.obj} ; à l'étape $n$, il y en a $${M.a} \\times n + ${M.b}$. Étape $${n}$ : $${M.a} \\times ${n} + ${M.b} = ${nb2(n)}$ ${M.obj}.` }; }
    if (t === 2) { const n = rand(6, 40), N = nb2(n);
      return { enonce: `Voici les trois premières étapes d'un motif (${M.nom}). Quelle étape utilise exactement $${N}$ ${M.obj} ?`, figure: fig, mode: "nombre", prefixe: "Étape", attendu: n,
        aides: [`À l'étape $n$, il y a $${M.a} \\times n + ${M.b}$ ${M.obj}.`, `On cherche $n$ tel que $${M.a} \\times n + ${M.b} = ${N}$.`, `Retire $${M.b}$, puis divise par $${M.a}$.`],
        solution: `$${N} - ${M.b} = ${N - M.b}$ et $${N - M.b} \\div ${M.a} = ${n}$ : c'est l'étape $${n}$.` }; }
    const bon = M.regle[0].toUpperCase() + M.regle.slice(1);
    const autres = MOTIFS.filter((x) => x !== M && x.regle !== M.regle).map((x) => x.regle[0].toUpperCase() + x.regle.slice(1));
    const c = melange(bon, shuffle([...new Set(autres)]).slice(0, 3));
    return { enonce: `Voici les trois premières étapes d'un motif (${M.nom}). Quelle phrase décrit ce motif ?`, figure: fig, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Compte les éléments de l'étape $1$.", "Compte ce qui change entre l'étape $1$ et l'étape $2$, puis entre l'étape $2$ et l'étape $3$.", "Vérifie que la règle marche pour les trois étapes."],
      solution: `Étapes $1$, $2$, $3$ : $${nb2(1)}$ ; $${nb2(2)}$ ; $${nb2(3)}$ ${M.obj}. ${bon}.` };
  };

  const que = (nom) => (/^[AEIOUYÀÉ]/.test(nom) ? `qu'${nom}` : `que ${nom}`);
  GEN["a6-barres"] = function () {
    const t = rand(0, 3), [A, B] = shuffle(["Louis", "Sarah", "Anli", "Fatima", "Nassim", "Zaïna", "Ali", "Mia"]).slice(0, 2);
    if (t === 0) { // A a d de plus que B, total T
      const b = rand(5, 40), d = rand(2, 15), T = 2 * b + d, obj = pick(["billes", "cartes", "mangues", "€"]);
      const qui = Math.random() < 0.5;
      return { enonce: `${B} a $${d}$ ${obj} de plus ${que(A)}. Les deux ensemble ont $${T}$ ${obj}. ${obj === "€" ? "Combien d'euros" : `Combien de ${obj}`} a ${qui ? A : B} ?`, figure: schemaBarres([{ nom: A, u: 1 }, { nom: B, u: 1, plus: String(d) }], `${T} en tout`),
        mode: "nombre", prefixe: "Réponse :", attendu: qui ? b : b + d,
        erreurs: [{ valeur: T / 2, message: "Les deux parts ne sont pas égales : retire d'abord ce que l'un a en plus." }, { valeur: qui ? b + d : b, message: `Ça, c'est ce qu'a ${qui ? B : A}.` }],
        aides: ["Sur le schéma, les deux barres « ? » sont égales.", `Retire les $${d}$ en plus : $${T} - ${d} = ${T - d}$ pour les deux barres « ? ».`, `Une barre « ? » vaut $${T - d} \\div 2$.`],
        solution: `$${T} - ${d} = ${T - d}$, puis $${T - d} \\div 2 = ${b}$ : ${A} a $${b}$, et ${B} a $${b} + ${d} = ${b + d}$.` }; }
    if (t === 1) { // k fois plus, total T
      const k = rand(2, 5), b = rand(3, 30), T = (k + 1) * b, qui = Math.random() < 0.5;
      return { enonce: `Dans un club de sport, il y a $${k}$ fois plus de filles que de garçons. Il y a $${T}$ membres en tout. Combien y a-t-il de ${qui ? "garçons" : "filles"} ?`, figure: schemaBarres([{ nom: "Garçons", u: 1 }, { nom: "Filles", u: k }], `${T} en tout`),
        mode: "nombre", prefixe: "Réponse :", attendu: qui ? b : k * b,
        erreurs: [{ valeur: T / k, message: `Compte toutes les barres « ? » : il y en a $${k} + 1 = ${k + 1}$.` }, { valeur: qui ? k * b : b, message: `Ça, c'est le nombre de ${qui ? "filles" : "garçons"}.` }],
        aides: ["Sur le schéma, toutes les petites barres « ? » sont égales.", `Il y a $1 + ${k} = ${k + 1}$ barres pour $${T}$ membres.`, `Une barre vaut $${T} \\div ${k + 1}$.`],
        solution: `$${T} \\div ${k + 1} = ${b}$ : il y a $${b}$ garçons et $${k} \\times ${b} = ${k * b}$ filles.` }; }
    if (t === 2) { // k fois plus, différence D
      const k = rand(2, 6), b = rand(3, 25), D = (k - 1) * b;
      return { enonce: `${A} a $${k}$ fois plus de cartes ${que(B)}. ${A} a $${D}$ cartes de plus ${que(B)}. Combien de cartes a ${B} ?`, figure: schemaBarres([{ nom: B, u: 1 }, { nom: A, u: k }], null),
        mode: "nombre", prefixe: "Réponse :", attendu: b,
        erreurs: [{ valeur: D / k, message: `La différence correspond à $${k} - 1 = ${k - 1}$ barres, pas $${k}$.` }],
        aides: ["Compare les deux lignes du schéma : ce qui dépasse, c'est la différence.", `La différence correspond à $${k} - 1 = ${k - 1}$ barres.`, `Une barre vaut $${D} \\div ${k - 1}$.`],
        solution: `La différence, $${D}$ cartes, correspond à $${k - 1}$ barres : une barre vaut $${D} \\div ${k - 1} = ${b}$. ${B} a $${b}$ cartes (et ${A} en a $${k * b}$).` }; }
    // n objets identiques + un autre prix connu = total
    const n = rand(2, 6), x = rand(2, 15), y = rand(2, 9), T = n * x + y, [o, o2, un] = pick([["cahiers", "une trousse", "un cahier"], ["stylos", "une règle", "un stylo"], ["mangues", "un ananas", "une mangue"], ["tickets", "une boisson", "un ticket"]]);
    return { enonce: `${A} achète $${n}$ ${o} au même prix et ${o2} à $${y}$ €. Le total à payer est de $${T}$ €. Combien coûte ${un} ?`, figure: schemaBarres([{ nom: "Achats", u: n, plus: `${y} €` }], `${T} € en tout`),
      mode: "nombre", prefixe: "Prix :", suffixe: "€", attendu: x,
      erreurs: [{ valeur: T / n, message: `Retire d'abord le prix de ${o2}.` }, { valeur: T - y, message: `Ça, c'est le prix des $${n}$ ${o}. On demande le prix d'un seul.` }],
      aides: ["Sur le schéma, les barres « ? » sont les objets de même prix.", `Retire le prix de ${o2} : $${T} - ${y} = ${T - y}$.`, `Partage en $${n}$ : $${T - y} \\div ${n}$.`],
      solution: `$${T} - ${y} = ${T - y}$ € pour les $${n}$ ${o}, donc ${un} coûte $${T - y} \\div ${n} = ${x}$ €.` };
  };

  /* =====================================================================
     6e, chapitre 8 : organisation et gestion de données, probabilités (préfixe g6-)
     Programme : lire un tableau, un diagramme en barres, un diagramme circulaire, une courbe ; construire un tableau,
     filtrer des données selon un critère ; probabilité entre 0 et 1, calcul en situation d'équiprobabilité
     (« a chances sur b » devient a/b), comparaison avec les fréquences d'une expérience répétée.
     ===================================================================== */
  // Diagramme en barres : cats = [[nom, valeur]], pas = graduation de l'axe
  function diagrammeBarres(cats, pas, unite) {
    const W = 320, H = 190, x0 = 34, y0 = 150, haut = 12, vmax = Math.ceil(Math.max(...cats.map((c) => c[1])) / pas) * pas;
    const Y = (v) => +(y0 - ((y0 - haut) * v) / vmax).toFixed(1), bw = (W - x0 - 10) / cats.length;
    let s = `<svg class="graph diag-barres" viewBox="0 0 ${W} ${H}" role="img" aria-label="Diagramme en barres${unite ? " (" + unite + ")" : ""}">`;
    s += `<g class="g-grid">`; for (let v = 0; v <= vmax; v += pas) s += `<line x1="${x0}" y1="${Y(v)}" x2="${W - 6}" y2="${Y(v)}"/>`; s += `</g>`;
    s += `<g class="g-tick">`; for (let v = 0; v <= vmax; v += pas) s += `<text x="${x0 - 5}" y="${Y(v) + 3.5}" text-anchor="end">${v}</text>`; s += `</g>`;
    cats.forEach(([nom, v], i) => {
      const x = x0 + i * bw + bw * 0.18, w = bw * 0.64;
      s += `<rect class="g-aire g-colorie g-barre" x="${+x.toFixed(1)}" y="${Y(v)}" width="${+w.toFixed(1)}" height="${+(y0 - Y(v)).toFixed(1)}"/>`;
      s += `<text class="g-plabel" x="${+(x + w / 2).toFixed(1)}" y="${y0 + 15}" text-anchor="middle">${nom}</text>`;
    });
    s += `<g class="g-axis"><line x1="${x0}" y1="${y0}" x2="${W - 6}" y2="${y0}"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${haut - 6}"/></g>`;
    if (unite) s += `<text class="g-plabel" x="${x0 + 4}" y="${haut - 2}">${unite}</text>`;
    return s + `</svg>`;
  }
  // Diagramme circulaire : parts = [[nom, fraction (en 24e)]] ; légende à droite
  function diagrammeCirculaire(parts) {
    const W = 320, H = 150, cx = 80, cy = 75, r = 64, tot = parts.reduce((s, p) => s + p[1], 0);
    let s = `<svg class="graph diag-circ" viewBox="0 0 ${W} ${H}" role="img" aria-label="Diagramme circulaire : ${parts.map((p) => p[0]).join(", ")}">`, a = -Math.PI / 2;
    parts.forEach(([nom, v], i) => {
      const b = a + (2 * Math.PI * v) / tot, grand = b - a > Math.PI ? 1 : 0;
      const x1 = +(cx + r * Math.cos(a)).toFixed(1), y1 = +(cy + r * Math.sin(a)).toFixed(1), x2 = +(cx + r * Math.cos(b)).toFixed(1), y2 = +(cy + r * Math.sin(b)).toFixed(1);
      s += v === tot ? `<circle class="g-secteur g-secteur-${i}" cx="${cx}" cy="${cy}" r="${r}"/>` : `<path class="g-secteur g-secteur-${i}" d="M${cx} ${cy} L${x1} ${y1} A${r} ${r} 0 ${grand} 1 ${x2} ${y2} Z"/>`;
      s += `<rect class="g-secteur g-secteur-${i}" x="170" y="${18 + i * 30}" width="16" height="16"/><text class="g-plabel" x="194" y="${31 + i * 30}">${nom}</text>`;
      a = b;
    });
    return s + `</svg>`;
  }
  // Courbe : points [[x, y]] reliés, axes gradués
  function courbeDonnees(pts, xlab, ylab, pasY) {
    const W = 320, H = 200, x0 = 34, y0 = 160, haut = 16, xmin = pts[0][0], xmax = pts[pts.length - 1][0];
    const ymin = Math.floor(Math.min(...pts.map((p) => p[1])) / pasY) * pasY, ymax = Math.ceil(Math.max(...pts.map((p) => p[1])) / pasY) * pasY;
    const X = (x) => +(x0 + ((W - x0 - 14) * (x - xmin)) / (xmax - xmin)).toFixed(1), Y = (y) => +(y0 - ((y0 - haut) * (y - ymin)) / (ymax - ymin)).toFixed(1);
    let s = `<svg class="graph courbe-donnees" viewBox="0 0 ${W} ${H}" role="img" aria-label="Courbe : ${ylab} en fonction de ${xlab}">`;
    s += `<g class="g-grid">`; for (let y = ymin; y <= ymax; y += pasY) s += `<line x1="${x0}" y1="${Y(y)}" x2="${W - 8}" y2="${Y(y)}"/>`; pts.forEach(([x]) => { s += `<line x1="${X(x)}" y1="${haut}" x2="${X(x)}" y2="${y0}"/>`; }); s += `</g>`;
    s += `<g class="g-tick">`; for (let y = ymin; y <= ymax; y += pasY) s += `<text x="${x0 - 5}" y="${Y(y) + 3.5}" text-anchor="end">${y}</text>`;
    pts.forEach(([x], i) => { if (pts.length <= 8 || i % 2 === 0) s += `<text x="${X(x)}" y="${y0 + 14}" text-anchor="middle">${x}</text>`; }); s += `</g>`;
    s += `<g class="g-axis"><line x1="${x0}" y1="${y0}" x2="${W - 8}" y2="${y0}"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${haut - 6}"/></g>`;
    s += `<polyline class="g-curve" points="${pts.map(([x, y]) => `${X(x)},${Y(y)}`).join(" ")}"/>`;
    pts.forEach(([x, y]) => { s += `<circle class="g-point" cx="${X(x)}" cy="${Y(y)}" r="3"/>`; });
    s += `<text class="g-plabel" x="${x0 + 4}" y="${haut - 4}">${ylab}</text><text class="g-plabel" x="${W - 8}" y="${y0 + 30}" text-anchor="end">${xlab}</text>`;
    return s.replace(`viewBox="0 0 ${W} ${H}"`, `viewBox="0 0 ${W} ${H + 18}"`) + `</svg>`;
  }
  FIGURES["g6-barres"] = () => diagrammeBarres([["Foot", 9], ["Basket", 5], ["Natation", 7], ["Danse", 4]], 2, "élèves");
  FIGURES["g6-circulaire"] = () => diagrammeCirculaire([["À pied", 12], ["Bus", 6], ["Voiture", 3], ["Vélo", 3]]);
  FIGURES["g6-courbe"] = () => courbeDonnees([[6, 24], [8, 26], [10, 29], [12, 31], [14, 31], [16, 29], [18, 27]], "heure", "°C", 1);

  GEN["g6-tableau"] = function () {
    const classes = shuffle(["6e A", "6e B", "6e C", "6e D"]).slice(0, 3).sort(), moyens = ["Bus", "À pied", "Voiture"];
    const T = classes.map(() => moyens.map(() => rand(2, 14)));
    const tab = { lignes: [["", ...classes.map((c) => `\\text{${c}}`)], ...moyens.map((m, j) => [`\\text{${m}}`, ...T.map((col) => col[j])])] };
    const t = rand(0, 3), i = rand(0, 2), j = rand(0, 2);
    if (t === 0) return { enonce: `Le tableau donne le moyen de transport des élèves de trois classes. Combien d'élèves de ${classes[i]} viennent ${["en bus", "à pied", "en voiture"][j]} ?`, tableau: tab, mode: "nombre", prefixe: "Réponse :", attendu: T[i][j],
      erreurs: [{ valeur: T[(i + 1) % 3][j], message: "Vérifie la colonne : c'est celle de la classe demandée." }],
      aides: ["Repère la colonne de la classe.", "Repère la ligne du moyen de transport.", "Le nombre cherché est au croisement de la ligne et de la colonne."],
      solution: `Au croisement de la colonne « ${classes[i]} » et de la ligne « ${moyens[j]} » : $${T[i][j]}$ élèves.` };
    if (t === 1) return { enonce: `Le tableau donne le moyen de transport des élèves de trois classes. Combien d'élèves compte la ${classes[i]} ?`, tableau: tab, mode: "nombre", prefixe: "Réponse :", attendu: T[i].reduce((s, v) => s + v, 0),
      aides: ["Tous les élèves d'une classe sont dans sa colonne.", "Additionne les nombres de la colonne.", `$${T[i].join(" + ")}$.`],
      solution: `$${T[i].join(" + ")} = ${T[i].reduce((s, v) => s + v, 0)}$ élèves en ${classes[i]}.` };
    if (t === 2) return { enonce: `Le tableau donne le moyen de transport des élèves de trois classes. Combien d'élèves viennent ${["en bus", "à pied", "en voiture"][j]}, toutes classes confondues ?`, tableau: tab, mode: "nombre", prefixe: "Réponse :", attendu: T.reduce((s, col) => s + col[j], 0),
      aides: ["Ce moyen de transport correspond à une ligne.", "Additionne les nombres de la ligne.", `$${T.map((c) => c[j]).join(" + ")}$.`],
      solution: `$${T.map((c) => c[j]).join(" + ")} = ${T.reduce((s, col) => s + col[j], 0)}$ élèves.` };
    // filtrer selon un critère
    const s0 = rand(6, 10), n = T.flat().filter((v) => v > s0).length;
    return { enonce: `Dans ce tableau, combien de cases (sans compter les titres) contiennent un nombre **strictement supérieur à $${s0}$** ?`, tableau: tab, mode: "nombre", prefixe: "Nombre de cases :", attendu: n,
      erreurs: [{ valeur: T.flat().filter((v) => v >= s0).length, message: `« Strictement supérieur » : $${s0}$ lui-même ne compte pas.` }],
      aides: ["Passe les cases une par une.", `Garde seulement les nombres plus grands que $${s0}$ (pas $${s0}$ lui-même).`, "Compte les cases gardées."],
      solution: `Les nombres plus grands que $${s0}$ sont : ${T.flat().filter((v) => v > s0).map((v) => `$${v}$`).join(" ; ") || "aucun"}. Il y a $${n}$ case${n > 1 ? "s" : ""}.` };
  };

  GEN["g6-barres"] = function () {
    const [sujet, cats, unite, pas] = pick([
      ["Sport préféré des élèves de 6e B", ["Foot", "Basket", "Natation", "Danse", "Judo"], "élèves", 2],
      ["Fruits vendus au marché de Mamoudzou (en kg)", ["Mangues", "Bananes", "Ananas", "Litchis"], "kg", 10],
      ["Pluie tombée à Mamoudzou (en mm)", ["Nov.", "Déc.", "Janv.", "Févr.", "Mars"], "mm", 50]
    ]);
    const vals = cats.map(() => rand(1, unite === "élèves" ? 6 : 9) * pas + (unite === "élèves" ? rand(0, 1) : 0));
    if (new Set(vals).size < vals.length) return GEN["g6-barres"]();
    const data = cats.map((c, k) => [c, vals[k]]), fig = diagrammeBarres(data, pas, unite);
    const t = rand(0, 3), i = rand(0, cats.length - 1);
    let k = rand(0, cats.length - 1); while (k === i) k = rand(0, cats.length - 1);
    if (t === 0) return { enonce: `${sujet}. Lis la valeur pour « ${cats[i]} ».`, figure: fig, mode: "nombre", prefixe: "Valeur :", suffixe: unite, attendu: vals[i],
      aides: ["Repère la barre « " + cats[i] + " ».", "Va jusqu'en haut de la barre, puis regarde l'axe vertical.", `Les graduations vont de $${pas}$ en $${pas}$.`],
      solution: `La barre « ${cats[i]} » monte jusqu'à $${vals[i]}$ ${unite}.` };
    if (t === 1) return { enonce: `${sujet}. Quelle est la différence entre « ${cats[i]} » et « ${cats[k]} » ?`, figure: fig, mode: "nombre", prefixe: "Différence :", suffixe: unite, attendu: Math.abs(vals[i] - vals[k]),
      aides: ["Lis les deux valeurs.", `« ${cats[i]} » : $${vals[i]}$ ; « ${cats[k]} » : $${vals[k]}$.`, "Soustrais la plus petite de la plus grande."],
      solution: `$${Math.max(vals[i], vals[k])} - ${Math.min(vals[i], vals[k])} = ${Math.abs(vals[i] - vals[k])}$ ${unite}.` };
    if (t === 2) { const tot = vals.reduce((s, v) => s + v, 0);
      return { enonce: `${sujet}. Quel est le total pour toutes les catégories ?`, figure: fig, mode: "nombre", prefixe: "Total :", suffixe: unite, attendu: tot,
        aides: ["Lis la valeur de chaque barre.", `$${vals.join(" ; ")}$.`, "Additionne-les."],
        solution: `$${vals.join(" + ")} = ${tot}$ ${unite}.` }; }
    const max = Math.random() < 0.5, cible = cats[vals.indexOf(max ? Math.max(...vals) : Math.min(...vals))];
    const c = melange(cible, cats.filter((x) => x !== cible));
    return { enonce: `${sujet}. Quelle catégorie a la valeur la plus ${max ? "grande" : "petite"} ?`, figure: fig, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: [`Cherche la barre la plus ${max ? "haute" : "basse"}.`, "Compare les hauteurs avec les graduations.", "Lis le nom sous la barre."],
      solution: `La barre la plus ${max ? "haute" : "basse"} est « ${cible} » ($${vals[cats.indexOf(cible)]}$ ${unite}).` };
  };

  GEN["g6-circulaire"] = function () {
    // parts en 24e : choisies parmi des fractions simples
    const modeles = [[12, 6, 3, 3], [12, 6, 6], [8, 8, 8], [6, 6, 6, 6], [12, 8, 4], [18, 6], [12, 12], [6, 12, 6], [16, 8], [12, 4, 4, 4]];
    const parts = shuffle(pick(modeles)), noms = shuffle(["à pied", "en bus", "en voiture", "à vélo", "en taxi"]).slice(0, parts.length);
    const fig = diagrammeCirculaire(noms.map((n, k) => [n[0].toUpperCase() + n.slice(1), parts[k]])), i = rand(0, parts.length - 1);
    const FR = { 24: ["1", 100], 18: [fr(3, 4), 75], 16: [fr(2, 3), null], 12: [fr(1, 2), 50], 8: [fr(1, 3), null], 6: [fr(1, 4), 25], 4: [fr(1, 6), null], 3: [fr(1, 8), 12.5] };
    const t = rand(0, 1), N = 24 * rand(1, 10);
    if (t === 0) { const bon = `$${FR[parts[i]][0]}$`; const autres = Object.values(FR).map((x) => `$${x[0]}$`).filter((x) => x !== bon && x !== "$1$");
      const c = melange(bon, shuffle(autres).slice(0, 3));
      return { enonce: `Le diagramme circulaire montre comment les élèves viennent au collège. Quelle fraction des élèves vient ${noms[i]} ?`, figure: fig, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Le disque entier représente tous les élèves.", "Compare la part au disque : est-ce la moitié, le quart, le tiers… ?", "Deux quarts font une moitié ; trois tiers font le disque entier."],
        solution: `La part « ${noms[i][0].toUpperCase() + noms[i].slice(1)} » occupe ${FR[parts[i]][0] === "1" ? "tout le disque" : `$${FR[parts[i]][0]}$ du disque`}.` }; }
    return { enonce: `Le diagramme circulaire montre comment viennent les $${N}$ élèves d'un collège. Combien d'élèves viennent ${noms[i]} ?`, figure: fig, mode: "nombre", prefixe: "Élèves :", attendu: (N * parts[i]) / 24,
      aides: ["Trouve d'abord la fraction du disque occupée par cette part.", `C'est $${FR[parts[i]][0]}$ du disque.`, `Calcule $${FR[parts[i]][0]}$ de $${N}$.`],
      solution: `La part « ${noms[i][0].toUpperCase() + noms[i].slice(1)} » est $${FR[parts[i]][0]}$ du disque : $${FR[parts[i]][0]} \\times ${N} = ${(N * parts[i]) / 24}$ élèves.` };
  };

  GEN["g6-courbe"] = function () {
    const debut = rand(5, 8), heures = Array.from({ length: 7 }, (_, k) => debut + 2 * k);
    let T = rand(22, 26); const temp = heures.map((h, k) => { if (k) T += k < 3 ? rand(1, 3) : k < 4 ? rand(-1, 1) : -rand(1, 2); return T; });
    const pts = heures.map((h, k) => [h, temp[k]]), fig = courbeDonnees(pts, "heure (h)", "°C", 1), t = rand(0, 2), i = rand(0, 6);
    if (t === 0) return { enonce: "La courbe donne la température à Mamoudzou au cours d'une journée. Quelle température fait-il à " + `$${heures[i]}$ h ?`, figure: fig, mode: "nombre", prefixe: "Température :", suffixe: "°C", attendu: temp[i],
      aides: [`Repère $${heures[i]}$ sur l'axe horizontal.`, "Monte jusqu'au point de la courbe.", "Lis la valeur sur l'axe vertical."],
      solution: `À $${heures[i]}$ h, le point de la courbe est à $${temp[i]}$ °C.` };
    if (t === 1) { const mx = Math.max(...temp), h = heures[temp.indexOf(mx)];
      return { enonce: "La courbe donne la température à Mamoudzou au cours d'une journée. À quelle heure la température est-elle la plus élevée (première fois) ?", figure: fig, mode: "nombre", prefixe: "Heure :", suffixe: "h", attendu: h,
        aides: ["Cherche le point le plus haut de la courbe.", "Descends jusqu'à l'axe horizontal.", "Lis l'heure."],
        solution: `Le point le plus haut est à $${mx}$ °C, atteint pour la première fois à $${h}$ h.` }; }
    let k = rand(0, 6); while (k === i) k = rand(0, 6); const [a, b] = [Math.min(i, k), Math.max(i, k)];
    return { enonce: `La courbe donne la température à Mamoudzou au cours d'une journée. De combien de degrés la température a-t-elle changé entre $${heures[a]}$ h et $${heures[b]}$ h ? (Donne l'écart, sans signe.)`, figure: fig, mode: "nombre", prefixe: "Écart :", suffixe: "°C", attendu: Math.abs(temp[b] - temp[a]),
      aides: [`Lis la température à $${heures[a]}$ h : $${temp[a]}$ °C.`, `Lis la température à $${heures[b]}$ h.`, "Calcule l'écart entre les deux."],
      solution: `À $${heures[a]}$ h : $${temp[a]}$ °C ; à $${heures[b]}$ h : $${temp[b]}$ °C. Écart : $${Math.abs(temp[b] - temp[a])}$ °C.` };
  };

  GEN["g6-proba-vocab"] = function () {
    const t = rand(0, 1);
    if (t === 0) {
      const ev = pick([
        ["obtenir $7$ en lançant un dé à six faces", 0], ["obtenir un nombre entre $1$ et $6$ en lançant un dé à six faces", 2], ["obtenir $6$ en lançant un dé à six faces", 1],
        ["tirer une boule rouge dans un sac qui ne contient que des boules bleues", 0], ["tirer une boule bleue dans un sac qui ne contient que des boules bleues", 2],
        ["tirer une boule rouge dans un sac de $3$ rouges et $5$ bleues", 1], ["obtenir « pile » en lançant une pièce", 1], ["obtenir un nombre pair en lançant un dé à six faces", 1],
        ["tirer une voyelle parmi les lettres du mot « MAYOTTE »", 1], ["tirer un multiple de $10$ parmi les nombres $1$ ; $2$ ; $3$ ; $4$", 0]
      ]);
      const choix = ["Impossible (probabilité $0$)", "Possible, mais pas certain", "Certain (probabilité $1$)"];
      return { enonce: `L'événement « ${ev[0]} » est :`, mode: "choix", choix, attendu: ev[1],
        aides: ["Un événement **impossible** ne se produit jamais : sa probabilité est $0$.", "Un événement **certain** se produit toujours : sa probabilité est $1$.", "Entre les deux, l'événement peut se produire ou non."],
        solution: `« ${ev[0]} » : ${["cela ne peut jamais arriver, l'événement est impossible.", "cela peut arriver, mais pas à tous les coups.", "cela arrive à tous les coups, l'événement est certain."][ev[1]]}` };
    }
    // une probabilité impossible parmi quatre
    const faux = pick([["1{,}2", "elle est plus grande que $1$"], [fr(7, 5), "elle est plus grande que $1$"], ["120", "elle est plus grande que $1$ (on ne dit pas $120$ %)"], ["-0{,}3", "elle est négative"]]);
    const bons = shuffle(["0{,}5", fr(3, 8), "0", "1", "0{,}75", fr(2, 9), "0{,}05"]).slice(0, 3);
    const c = melange(`$${faux[0]}$`, bons.map((x) => `$${x}$`));
    return { enonce: "Lequel de ces nombres **ne peut pas** être une probabilité ?", mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Une probabilité est toujours un nombre compris entre $0$ et $1$.", "$0$ : impossible ; $1$ : certain.", "Cherche un nombre en dehors de cet intervalle."],
      solution: `$${faux[0]}$ ne peut pas être une probabilité : ${faux[1]}.` };
  };

  GEN["g6-proba-calcul"] = function () {
    const t = rand(0, 3);
    let enonce, f, n, expl;
    if (t === 0) { const r = rand(1, 9), b = rand(1, 9), v = rand(0, 6), coul = pick(["rouge", "bleue", "verte"].slice(0, v ? 3 : 2)); const tot = r + b + v, nb = { rouge: r, bleue: b, verte: v }[coul];
      enonce = `Un sac contient $${r}$ boules rouges, $${b}$ boules bleues${v ? ` et $${v}$ boules vertes` : ""}, indiscernables au toucher. On tire une boule au hasard. Quelle est la probabilité qu'elle soit ${coul} ?`; f = [nb, tot]; expl = `$${nb}$ boules ${coul}s sur $${tot}$ boules en tout`; }
    else if (t === 1) { const [ev, k] = pick([["un nombre pair", 3], ["un nombre supérieur ou égal à $5$", 2], ["un multiple de $3$", 2], ["le nombre $6$", 1], ["un nombre inférieur à $3$", 2], ["un nombre impair", 3]]);
      enonce = `On lance un dé équilibré à six faces. Quelle est la probabilité d'obtenir ${ev} ?`; f = [k, 6]; expl = `$${k}$ issue${k > 1 ? "s" : ""} favorable${k > 1 ? "s" : ""} sur $6$`; }
    else if (t === 2) { const mot = pick(["MAYOTTE", "MAMOUDZOU", "MATHEMATIQUES", "DZAOUDZI", "COLLEGE"]), lettre = pick([...new Set(mot.split(""))]), k = mot.split("").filter((x) => x === lettre).length;
      enonce = `On écrit chaque lettre du mot « ${mot} » sur une carte, puis on tire une carte au hasard. Quelle est la probabilité de tirer la lettre « ${lettre} » ?`; f = [k, mot.length]; expl = `la lettre « ${lettre} » apparaît $${k}$ fois sur $${mot.length}$ lettres`; }
    else { const sect = pick([8, 10, 12]), j = rand(1, sect - 1);
      enonce = `Une roue de loterie est partagée en $${sect}$ secteurs égaux, dont $${j}$ sont jaunes. On fait tourner la roue. Quelle est la probabilité qu'elle s'arrête sur un secteur jaune ?`; f = [j, sect]; expl = `$${j}$ secteurs jaunes sur $${sect}$`; }
    const v = f[0] / f[1];
    return { enonce: enonce + CONSIGNE_FR.replace("le résultat", "la probabilité").replace("7/6", "3/8"), mode: "nombre", prefixe: "Probabilité :", attendu: v,
      erreurs: [{ valeur: f[0] / (f[1] - f[0] || 1), message: "On divise par le nombre **total** d'issues, pas par le nombre d'issues défavorables." }, ...(Number.isInteger(v * 1000) ? [] : FRAC_APPROX(v))],
      aides: ["Toutes les issues ont la même chance : on compte.", "Compte les issues favorables (celles qui réalisent l'événement), puis toutes les issues.", "Probabilité $=$ nombre d'issues favorables sur nombre total d'issues."],
      solution: `Il y a ${expl} : la probabilité est $${fr(f[0], f[1])}$${pgcd(f[0], f[1]) > 1 ? ` $= ${frNet(f[0], f[1])}$` : ""}.` };
  };

  GEN["g6-frequence"] = function () {
    const t = rand(0, 1);
    if (t === 0) { // estimer le contenu d'une urne à partir de fréquences
      const comp = pick([[1, 1, 2], [1, 2, 1], [2, 1, 1], [1, 1, 1], [3, 1, 0], [1, 3, 0], [2, 2, 0]]), tot = comp.reduce((s, v) => s + v, 0), N = pick([200, 400, 500, 1000]);
      const coul = ["rouges", "bleues", "vertes"], obs = comp.map((c) => Math.round((N * c) / tot + (Math.random() - 0.5) * N * 0.04));
      const diff = N - obs.reduce((s, v) => s + v, 0); obs[0] += diff;
      if (obs.some((o, k) => (comp[k] === 0 ? o !== 0 : o <= 0))) return GEN["g6-frequence"]();
      const decrit = (cp) => cp.map((c, k) => (c ? `$${c}$ ${coul[k].replace(/s$/, c > 1 ? "s" : "")}` : null)).filter(Boolean).join(", ");
      const vrai = decrit(comp), autres = [[1, 1, 1], [2, 1, 1], [1, 2, 1], [1, 1, 2], [3, 1, 0], [1, 3, 0], [2, 2, 0], [4, 1, 1]].map(decrit).filter((d) => d !== vrai);
      const c = melange(vrai, shuffle(autres).slice(0, 3));
      return { enonce: `Un sac contient ${tot} boules. On tire une boule, on note sa couleur, on la remet, et on recommence $${N}$ fois. Résultats : ${obs.map((o, k) => `$${o}$ ${coul[k]}`).join(", ")}. Quel est le contenu le plus probable du sac ?`.replace(`contient ${tot} boules`, `contient $${tot}$ boules`), mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Quand on répète une expérience un grand nombre de fois, la fréquence de chaque couleur se rapproche de sa probabilité.", `Calcule la fréquence de chaque couleur : par exemple $${fr(obs[0], N)}$ pour les rouges.`, `Avec $${tot}$ boules, chaque boule correspond à environ $${fr(1, tot)}$ des tirages, soit $${Math.round(N / tot)}$ tirages sur $${N}$.`],
        solution: `Sur $${N}$ tirages, chaque boule sort environ $${N} \\div ${tot} = ${Math.round(N / tot)}$ fois. Les résultats correspondent à : ${vrai}.` };
    }
    // fréquence et probabilité du dé
    const N = pick([60, 120, 300, 600, 1200]), face = rand(1, 6), obs = Math.round(N / 6 + (Math.random() - 0.5) * N * 0.04);
    const choix = [`La fréquence $${fr(obs, N)}$ est proche de la probabilité $${fr(1, 6)}$, c'est normal`, "Le dé est forcément truqué", `La probabilité d'obtenir $${face}$ est $${fr(obs, N)}$`, `Au prochain lancer, on a moins de chances d'obtenir $${face}$`];
    const cc = melange(choix[0], choix.slice(1));
    return { enonce: `On lance un dé équilibré $${N}$ fois. La face $${face}$ sort $${obs}$ fois. Que peut-on dire ?`, mode: "choix", choix: cc.choix, attendu: cc.attendu,
      aides: [`Calcule la fréquence : $${fr(obs, N)}$.`, `La probabilité d'obtenir $${face}$ est $${fr(1, 6)}$, soit $${N / 6}$ fois sur $${N}$ en moyenne.`, "Le dé n'a pas de mémoire : chaque lancer recommence avec les mêmes chances."],
      solution: `La fréquence $${fr(obs, N)}$ est proche de $${fr(N / 6, N)} = ${fr(1, 6)}$ : c'est ce qu'on attend d'un dé équilibré. Sur un grand nombre de lancers, la fréquence se rapproche de la probabilité, mais n'est presque jamais exactement égale.` };
  };

  /* =====================================================================
     6e, chapitre 9 : distances, cercles et médiatrice (préfixe c6-)
     Programme : distance entre deux points, milieu d'un segment ; cercle, disque, rayon, diamètre, corde
     (comme ensembles de points) ; problèmes de distance à un point ; médiatrice (définition et propriété
     caractéristique) ; lexique, notations et codage.
     ===================================================================== */
  /* Figure de géométrie en pixels. o = { W, H, pts: { A: [x, y] }, segs: [["A", "B"]], droites: [["A", "B"]],
     demi: [["A", "B"]] (demi-droite [AB)), cercles: [["O", r]], disques: [["O", r]], codes: [["A", "I", n]] (n traits),
     droitAngle: [["A", "I", "M"]] (angle droit en I), cachés: ["O"] (points sans étiquette) } */
  function geo(o) {
    const W = o.W || 320, H = o.H || 200, P = o.pts;
    let s = `<svg class="graph geo" viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.aria || "Figure de géométrie"}">`;
    (o.disques || []).forEach(([c, r]) => { s += `<circle class="g-disque" cx="${P[c][0]}" cy="${P[c][1]}" r="${r}"/>`; });
    (o.cercles || []).forEach(([c, r]) => { s += `<circle class="g-cercle" cx="${P[c][0]}" cy="${P[c][1]}" r="${r}"/>`; });
    const prolonge = (a, b, k1, k2) => { const dx = P[b][0] - P[a][0], dy = P[b][1] - P[a][1]; return [P[a][0] - k1 * dx, P[a][1] - k1 * dy, P[b][0] + k2 * dx, P[b][1] + k2 * dy].map((v) => +v.toFixed(1)); };
    (o.droites || []).forEach(([a, b]) => { const [x1, y1, x2, y2] = prolonge(a, b, 0.6, 0.6); s += `<line class="g-droite" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`; });
    (o.demi || []).forEach(([a, b]) => { const [x1, y1, x2, y2] = prolonge(a, b, 0, 0.7); s += `<line class="g-droite" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`; });
    (o.segs || []).forEach(([a, b]) => { s += `<line class="g-segment" x1="${P[a][0]}" y1="${P[a][1]}" x2="${P[b][0]}" y2="${P[b][1]}"/>`; });
    (o.codes || []).forEach(([a, b, n]) => {
      const mx = (P[a][0] + P[b][0]) / 2, my = (P[a][1] + P[b][1]) / 2, dx = P[b][0] - P[a][0], dy = P[b][1] - P[a][1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
      for (let k = 0; k < n; k++) { const c = (k - (n - 1) / 2) * 4; const cx = mx + ux * c, cy = my + uy * c; s += `<line class="g-code" x1="${+(cx - uy * 6 + ux * 2).toFixed(1)}" y1="${+(cy + ux * 6 + uy * 2).toFixed(1)}" x2="${+(cx + uy * 6 - ux * 2).toFixed(1)}" y2="${+(cy - ux * 6 - uy * 2).toFixed(1)}"/>`; }
    });
    (o.droitAngle || []).forEach(([a, i, b]) => {
      const u = (p) => { const dx = P[p][0] - P[i][0], dy = P[p][1] - P[i][1], L = Math.hypot(dx, dy); return [dx / L * 9, dy / L * 9]; };
      const [ax, ay] = u(a), [bx, by] = u(b), x = P[i][0], y = P[i][1];
      s += `<path class="g-code" d="M${+(x + ax).toFixed(1)} ${+(y + ay).toFixed(1)} L${+(x + ax + bx).toFixed(1)} ${+(y + ay + by).toFixed(1)} L${+(x + bx).toFixed(1)} ${+(y + by).toFixed(1)}"/>`;
    });
    Object.entries(P).forEach(([n, [x, y]]) => {
      if ((o.caches || []).includes(n)) return;
      s += `<circle class="g-point" cx="${x}" cy="${y}" r="3"/>`;
      const [dx, dy] = (o.decal && o.decal[n]) || [7, -7];
      s += `<text class="g-plabel" x="${x + dx}" y="${y + dy}" text-anchor="${dx < 0 ? "end" : dx === 0 ? "middle" : "start"}">${n}</text>`;
    });
    return s + `</svg>`;
  }
  // Point sur un cercle de centre c, rayon r, angle en degrés
  const surCercle = (c, r, deg) => [+(c[0] + r * Math.cos((deg * Math.PI) / 180)).toFixed(1), +(c[1] - r * Math.sin((deg * Math.PI) / 180)).toFixed(1)];
  const decalDe = (c, p, d) => { const dx = p[0] - c[0], dy = p[1] - c[1], L = Math.hypot(dx, dy) || 1; return [+((dx / L) * (d || 12)).toFixed(0) - 3, +((dy / L) * (d || 12) + 4).toFixed(0)]; };

  // Une figure « cercle » aux lettres tirées au hasard : centre, rayon, diamètre, corde
  function figureCercle() {
    const L = shuffle(["A", "B", "C", "D", "E", "F", "M", "N", "P", "R", "S", "T"]), O = pick(["O", "K", "I"]);
    const c = [130, 100], r = 78, a0 = rand(0, 359);
    const [rA, d1, d2, c1, c2] = L;
    const pts = { [O]: c, [rA]: surCercle(c, r, a0 + 100), [d1]: surCercle(c, r, a0 + 200), [d2]: surCercle(c, r, a0 + 20), [c1]: surCercle(c, r, a0 + 250), [c2]: surCercle(c, r, a0 + 330) };
    const decal = {}; Object.keys(pts).forEach((n) => { if (n !== O) decal[n] = decalDe(c, pts[n], 13); }); decal[O] = [6, 14];
    return { O, rA, d1, d2, c1, c2, fig: geo({ W: 320, H: 200, pts, cercles: [[O, r]], segs: [[O, rA], [d1, d2], [c1, c2]], decal, aria: `Cercle de centre ${O} avec un rayon, un diamètre et une corde` }) };
  }
  FIGURES["c6-cercle"] = () => geo({ W: 320, H: 200, pts: { O: [130, 100], A: surCercle([130, 100], 78, 120), B: surCercle([130, 100], 78, 210), C: surCercle([130, 100], 78, 30), D: surCercle([130, 100], 78, 260), E: surCercle([130, 100], 78, 340) }, cercles: [["O", 78]], segs: [["O", "A"], ["B", "C"], ["D", "E"]], decal: { O: [6, 14], A: decalDe([130, 100], surCercle([130, 100], 78, 120), 13), B: decalDe([130, 100], surCercle([130, 100], 78, 210), 13), C: decalDe([130, 100], surCercle([130, 100], 78, 30), 13), D: decalDe([130, 100], surCercle([130, 100], 78, 260), 13), E: decalDe([130, 100], surCercle([130, 100], 78, 340), 13) }, aria: "Cercle de centre O : rayon [OA], diamètre [BC], corde [DE]" });
  function figureMediatrice(lettres) {
    const [A, B, I, M, N] = lettres || ["A", "B", "I", "M", "N"];
    const pts = { [A]: [60, 120], [B]: [240, 120], [I]: [150, 120], [M]: [150, 40], [N]: [150, 175] };
    return geo({ W: 320, H: 195, pts, segs: [[A, B], [M, A], [M, B]], droites: [[M, N]], codes: [[A, I, 2], [I, B, 2], [M, A, 1], [M, B, 1]], droitAngle: [[B, I, M]], decal: { [A]: [-8, 4], [B]: [8, 4], [I]: [7, 14], [M]: [8, -2], [N]: [8, 4] }, aria: `Médiatrice de [${A}${B}] passant par ${I}, ${M} et ${N}, avec ${M}${A} = ${M}${B}` });
  }
  FIGURES["c6-mediatrice"] = () => figureMediatrice();

  GEN["c6-vocab"] = function () {
    const F = figureCercle(), t = rand(0, 3);
    const seg = [[`[${F.O}${F.rA}]`, "Un rayon", `il relie le centre $${F.O}$ à un point du cercle`], [`[${F.d1}${F.d2}]`, "Un diamètre", `il relie deux points du cercle en passant par le centre $${F.O}$`], [`[${F.c1}${F.c2}]`, "Une corde", "il relie deux points du cercle sans passer par le centre"]][t % 3];
    if (t === 3) {
      const c = melange("Le centre du cercle", ["Un rayon du cercle", "Le diamètre du cercle", "Une corde du cercle"]);
      return { enonce: `Sur la figure, comment s'appelle le point $${F.O}$ ?`, figure: F.fig, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Tous les points du cercle sont à la même distance d'un point particulier.", "Ce point est au milieu, à l'intérieur du cercle.", "Un rayon, un diamètre et une corde sont des segments, pas des points."],
        solution: `$${F.O}$ est le **centre** du cercle : tous les points du cercle sont à la même distance de $${F.O}$.` };
    }
    const c = melange(seg[1], ["Un rayon", "Un diamètre", "Une corde", "Un centre"].filter((x) => x !== seg[1]));
    return { enonce: `Sur la figure, le segment $${seg[0]}$ est :`, figure: F.fig, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Un **rayon** va du centre à un point du cercle.", "Un **diamètre** va d'un point du cercle à un autre en passant par le centre.", "Une **corde** relie deux points du cercle, sans forcément passer par le centre."],
      solution: `$${seg[0]}$ est ${seg[1].toLowerCase()} : ${seg[2]}.` };
  };

  GEN["c6-mesures"] = function () {
    const t = rand(0, 3), r = Dc(rand(11, 99), 1), d = mulD(r, Dc(2)), O = pick(["O", "K", "C"]), [A, B] = shuffle(["A", "B", "M", "N", "P", "R"]).slice(0, 2);
    if (t === 0) return { enonce: `Un cercle a pour rayon $${tD(r)}$ cm. Quel est son diamètre ?`, mode: "nombre", prefixe: "Diamètre :", suffixe: "cm", attendu: vD(d),
      erreurs: [{ valeur: vD(r) / 2, message: "Le diamètre est **deux fois plus long** que le rayon." }],
      aides: ["Un diamètre est formé de deux rayons bout à bout.", "Diamètre $=$ $2 \\times$ rayon.", `Calcule $2 \\times ${tD(r)}$.`], solution: `Diamètre $= 2 \\times ${tD(r)} = ${tD(d)}$ cm.` };
    if (t === 1) return { enonce: `Un cercle a pour diamètre $${tD(d)}$ cm. Quel est son rayon ?`, mode: "nombre", prefixe: "Rayon :", suffixe: "cm", attendu: vD(r),
      erreurs: [{ valeur: vD(d) * 2, message: "Le rayon est **deux fois plus court** que le diamètre." }],
      aides: ["Le rayon est la moitié du diamètre.", "Rayon $=$ diamètre $\\div 2$.", `Calcule $${tD(d)} \\div 2$.`], solution: `Rayon $= ${tD(d)} \\div 2 = ${tD(r)}$ cm.` };
    if (t === 2) return { enonce: `$${A}$ et $${B}$ sont deux points du cercle de centre $${O}$, et $${O}${A} = ${tD(r)}$ cm. Combien mesure $${O}${B}$ ?`, mode: "nombre", prefixe: `$${O}${B} =$`, suffixe: "cm", attendu: vD(r),
      erreurs: [{ valeur: vD(d), message: `$${O}${B}$ est un rayon, pas un diamètre.` }],
      aides: [`$${O}${A}$ et $${O}${B}$ relient tous les deux le centre à un point du cercle.`, "Ce sont deux rayons du même cercle.", "Tous les rayons d'un cercle ont la même longueur."], solution: `$[${O}${A}]$ et $[${O}${B}]$ sont deux rayons du même cercle : $${O}${B} = ${O}${A} = ${tD(r)}$ cm.` };
    return { enonce: `$[${A}${B}]$ est un diamètre du cercle de centre $${O}$, et $${O}${A} = ${tD(r)}$ cm. Combien mesure $${A}${B}$ ?`, mode: "nombre", prefixe: `$${A}${B} =$`, suffixe: "cm", attendu: vD(d),
      erreurs: [{ valeur: vD(r), message: `$${A}${B}$ est un diamètre : il mesure deux rayons.` }],
      aides: [`$[${O}${A}]$ est un rayon.`, `Le diamètre $[${A}${B}]$ est formé de deux rayons : $[${A}${O}]$ et $[${O}${B}]$.`, `Calcule $2 \\times ${tD(r)}$.`], solution: `$${A}${B} = ${A}${O} + ${O}${B} = 2 \\times ${tD(r)} = ${tD(d)}$ cm.` };
  };

  GEN["c6-position"] = function () {
    const r = rand(2, 9), O = pick(["O", "K", "C"]), M = pick(["M", "N", "P", "R"]), pos = rand(0, 2);
    const dist = pos === 0 ? Dc(r) : pos === 1 ? Dc(rand(1, r * 10 - 1), 1) : Dc(rand(r * 10 + 1, r * 10 + 40), 1);
    if (dist.m % 10 === 0 && dist.d) dist.m /= 10, dist.d = 0;
    const ctx = Math.random() < 0.35;
    const choix = [`$${M}$ est sur le cercle`, `$${M}$ est à l'intérieur du disque, mais pas sur le cercle`, `$${M}$ est à l'extérieur du disque`];
    return { enonce: ctx ? `Une chèvre est attachée au piquet $${O}$ par une corde de $${r}$ m. Une touffe d'herbe $${M}$ est à $${tD(dist)}$ m du piquet. Où se trouve la touffe d'herbe par rapport au disque que la chèvre peut brouter ?` : `On considère le cercle de centre $${O}$ et de rayon $${r}$ cm. On sait que $${O}${M} = ${tD(dist)}$ cm. Où se trouve le point $${M}$ ?`,
      mode: "choix", choix: ctx ? [`Sur le bord : la chèvre l'atteint tout juste`, `À l'intérieur : la chèvre peut la manger`, `À l'extérieur : la chèvre ne peut pas l'atteindre`] : choix, attendu: pos,
      aides: [`Compare la distance $${O}${M}$ au rayon $${r}$.`, "Égale au rayon : sur le cercle. Plus petite : à l'intérieur du disque. Plus grande : à l'extérieur.", "Le disque, c'est le cercle et tout son intérieur."],
      solution: `$${O}${M} = ${tD(dist)}$ ${pos === 0 ? "=" : pos === 1 ? "<" : ">"} $${r}$ : ${[`le point est sur le cercle (à exactement $${r}$ du centre)`, "le point est plus près du centre que le cercle : il est à l'intérieur du disque", "le point est plus loin du centre que le cercle : il est à l'extérieur du disque"][pos]}.` };
  };

  GEN["c6-milieu"] = function () {
    const t = rand(0, 2), [A, B, I] = shuffle(["A", "B", "C", "D", "E", "F"]).slice(0, 2).concat(pick(["I", "J", "K"])), L = Dc(rand(21, 199), 1);
    const m = Dc(L.m * 5, L.d + 1);
    if (t === 0) return { enonce: `$${I}$ est le milieu du segment $[${A}${B}]$ et $${A}${B} = ${tD(L)}$ cm. Combien mesure $${A}${I}$ ?`, mode: "nombre", prefixe: `$${A}${I} =$`, suffixe: "cm", attendu: vD(L) / 2,
      erreurs: [{ valeur: vD(L) * 2, message: "Le milieu partage le segment en deux : on divise par $2$." }],
      aides: ["Le milieu est sur le segment et à égale distance des deux extrémités.", `$${A}${I} = ${I}${B}$ et $${A}${I} + ${I}${B} = ${A}${B}$.`, `Calcule $${tD(L)} \\div 2$.`], solution: `$${A}${I} = ${tD(L)} \\div 2 = ${tD(m)}$ cm.` };
    if (t === 1) return { enonce: `$${I}$ est le milieu du segment $[${A}${B}]$ et $${I}${B} = ${tD(m)}$ cm. Combien mesure $${A}${B}$ ?`, mode: "nombre", prefixe: `$${A}${B} =$`, suffixe: "cm", attendu: vD(L),
      erreurs: [{ valeur: vD(m) / 2, message: `$${A}${B}$ est le segment entier : il mesure deux fois $${I}${B}$.` }],
      aides: [`$${I}$ partage $[${A}${B}]$ en deux segments de même longueur.`, `$${A}${I} = ${I}${B} = ${tD(m)}$ cm.`, `$${A}${B} = 2 \\times ${tD(m)}$.`], solution: `$${A}${B} = 2 \\times ${tD(m)} = ${tD(L)}$ cm.` };
    const bon = `$${I} \\in [${A}${B}]$ et $${A}${I} = ${I}${B}$`;
    const c = melange(bon, [`$${A}${I} = ${I}${B}$ seulement`, `$${I} \\in [${A}${B}]$ seulement`, `$${I} \\in (${A}${B})$ et $${A}${I} = 2 \\times ${I}${B}$`]);
    return { enonce: `$${I}$ est le milieu du segment $[${A}${B}]$ si et seulement si :`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Le milieu doit être **sur** le segment.", "Il doit aussi être **à égale distance** des deux extrémités.", "Il faut les deux conditions à la fois."],
      solution: `Le milieu de $[${A}${B}]$ appartient au segment et le partage en deux segments de même longueur : ${bon}. Un point à égale distance de $${A}$ et $${B}$ mais hors du segment n'est pas le milieu.` };
  };

  GEN["c6-mediatrice"] = function () {
    const t = rand(0, 3), [A, B] = shuffle(["A", "B", "C", "D", "E"]).slice(0, 2), M = pick(["M", "N", "P", "R", "S"]);
    if (t === 0) { const x = Dc(rand(15, 95), 1);
      return { enonce: `Le point $${M}$ est sur la médiatrice du segment $[${A}${B}]$, et $${M}${A} = ${tD(x)}$ cm. Combien mesure $${M}${B}$ ?`, figure: figureMediatrice([A, B, "I", M, "N"]), mode: "nombre", prefixe: `$${M}${B} =$`, suffixe: "cm", attendu: vD(x),
        aides: ["Rappelle-toi la propriété de la médiatrice.", "Tout point de la médiatrice d'un segment est à égale distance des deux extrémités.", `Donc $${M}${A} = ${M}${B}$.`],
        solution: `$${M}$ est sur la médiatrice de $[${A}${B}]$, donc il est à égale distance de $${A}$ et de $${B}$ : $${M}${B} = ${M}${A} = ${tD(x)}$ cm.` }; }
    if (t === 1) { // quel point est sur la médiatrice ?
      const noms = shuffle(["E", "F", "G", "H", "K", "L"]).slice(0, 4), bonIdx = rand(0, 3);
      const d = noms.map((n, k) => { const a = rand(2, 9); return k === bonIdx ? [a, a] : [a, a + pick([-1, 1, 2])]; });
      const c = melange(`$${noms[bonIdx]}$`, noms.filter((_, k) => k !== bonIdx).map((n) => `$${n}$`));
      return { enonce: `On connaît les distances de quatre points à $${A}$ et à $${B}$ : ${noms.map((n, k) => `$${n}${A} = ${d[k][0]}$ cm et $${n}${B} = ${d[k][1]}$ cm`).join(" ; ")}. Lequel est sur la médiatrice de $[${A}${B}]$ ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Les points de la médiatrice sont à **égale distance** de $" + A + "$ et de $" + B + "$.", "Pour chaque point, compare ses deux distances.", "Un seul point a ses deux distances égales."],
        solution: `$${noms[bonIdx]}${A} = ${noms[bonIdx]}${B} = ${d[bonIdx][0]}$ cm : $${noms[bonIdx]}$ est à égale distance de $${A}$ et de $${B}$, il est sur la médiatrice de $[${A}${B}]$.` }; }
    if (t === 2) { const bon = `la droite perpendiculaire à $[${A}${B}]$ qui passe par son milieu`;
      const c = melange(bon, [`la droite qui passe par $${A}$ et $${B}$`, `une droite perpendiculaire à $[${A}${B}]$ qui passe par $${A}$`, `une droite qui passe par le milieu de $[${A}${B}]$, dans n'importe quelle direction`]);
      return { enonce: `La médiatrice du segment $[${A}${B}]$ est :`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["« Média » : le milieu ; « trice » : qui coupe.", "Elle passe par le milieu du segment.", "Elle forme un angle droit avec le segment."],
        solution: `La médiatrice de $[${A}${B}]$ est ${bon}. Tous ses points sont à égale distance de $${A}$ et de $${B}$.` }; }
    const x = rand(3, 9), y = x + rand(1, 4);
    const choix = [`Oui : $${M}${A} = ${M}${B}$`, `Non : $${M}${A} \\neq ${M}${B}$`, `On ne peut pas savoir sans la figure`];
    const egal = Math.random() < 0.5;
    const cc = melange(choix[egal ? 0 : 1], [choix[egal ? 1 : 0], choix[2], `Oui : $${M}$ est entre $${A}$ et $${B}$`]);
    return { enonce: `On sait que $${M}${A} = ${x}$ cm et $${M}${B} = ${egal ? x : y}$ cm. Le point $${M}$ est-il sur la médiatrice de $[${A}${B}]$ ?`, mode: "choix", choix: cc.choix, attendu: cc.attendu,
      aides: ["La médiatrice de $[" + A + B + "]$ est formée de tous les points à égale distance de $" + A + "$ et de $" + B + "$.", "Compare $" + M + A + "$ et $" + M + B + "$.", "C'est une propriété caractéristique : elle marche dans les deux sens."],
      solution: egal ? `$${M}${A} = ${M}${B}$ : $${M}$ est à égale distance de $${A}$ et de $${B}$, il est sur la médiatrice de $[${A}${B}]$.` : `$${M}${A} \\neq ${M}${B}$ : $${M}$ n'est pas à égale distance de $${A}$ et de $${B}$, il n'est pas sur la médiatrice.` };
  };

  GEN["c6-notations"] = function () {
    const [A, B] = shuffle(["A", "B", "C", "D", "E", "F"]).slice(0, 2), t = rand(0, 1);
    if (t === 0) {
      const obj = pick([["le segment d'extrémités $" + A + "$ et $" + B + "$", `[${A}${B}]`], ["la droite qui passe par $" + A + "$ et $" + B + "$", `(${A}${B})`], ["la demi-droite d'origine $" + A + "$ qui passe par $" + B + "$", `[${A}${B})`], ["la longueur du segment d'extrémités $" + A + "$ et $" + B + "$", `${A}${B}`]]);
      const c = melange(`$${obj[1]}$`, [`$[${A}${B}]$`, `$(${A}${B})$`, `$[${A}${B})$`, `$${A}${B}$`, `$[${B}${A})$`].filter((x) => x !== `$${obj[1]}$`));
      return { enonce: `Comment note-t-on ${obj[0]} ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Crochets $[\\;]$ : le segment s'arrête aux deux points. Parenthèses $(\\;)$ : la droite continue des deux côtés.", "Demi-droite : un crochet du côté de l'origine, une parenthèse de l'autre côté.", "Sans crochets ni parenthèses, c'est une longueur (un nombre)."],
        solution: `On note ${obj[0]} : $${obj[1]}$.` };
    }
    // appartenance : trois points alignés A, C, B dans cet ordre
    const C = pick(["M", "N", "P"]), E = pick(["R", "S", "T"]);
    const pts = { [A]: [50, 110], [C]: [150, 110], [B]: [250, 110], [E]: [150, 40] };
    const fig = geo({ W: 320, H: 150, pts, droites: [[A, B]], decal: { [A]: [0, 20], [C]: [0, 20], [B]: [0, 20], [E]: [8, -4] }, aria: `Points ${A}, ${C}, ${B} alignés dans cet ordre sur une droite, et ${E} hors de la droite` });
    const vraies = [`$${C} \\in [${A}${B}]$`, `$${A} \\in (${C}${B})$`, `$${B} \\in [${A}${C})$`, `$${E} \\notin (${A}${B})$`, `$${A} \\notin [${C}${B}]$`];
    const fausses = [`$${A} \\in [${C}${B}]$`, `$${E} \\in (${A}${B})$`, `$${C} \\notin [${A}${B}]$`, `$${A} \\in [${C}${B})$`, `$${B} \\notin (${A}${C})$`];
    const c = melange(pick(vraies), shuffle(fausses).slice(0, 3));
    return { enonce: `Sur la figure, $${A}$, $${C}$ et $${B}$ sont alignés dans cet ordre. Quelle écriture est juste ?`, figure: fig, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["$\\in$ se lit « appartient à », $\\notin$ « n'appartient pas à ».", "Un segment s'arrête à ses extrémités ; une droite continue des deux côtés ; une demi-droite continue d'un seul côté.", "Pour chaque écriture, regarde si le point est vraiment sur l'objet."],
      solution: `${c.choix[c.attendu]} est juste. Les autres sont fausses : par exemple, $${A}$ n'est pas entre $${C}$ et $${B}$, donc $${A} \\notin [${C}${B}]$.` };
  };

  GEN["c6-probleme"] = function () {
    const t = rand(0, 2);
    if (t === 0) { const r = rand(2, 8), v = rand(0, 2); const d = v === 0 ? Dc(r * 10 - rand(1, 15), 1) : v === 1 ? Dc(r * 10 + rand(1, 15), 1) : Dc(r * 10, 1);
      const choix = ["Oui, elle est dans la zone couverte", "Non, elle est en dehors de la zone couverte", "Elle est exactement à la limite de la zone"];
      const rep = vD(d) < r ? 0 : vD(d) > r ? 1 : 2;
      return { enonce: `Une antenne relais couvre tous les points situés à $${r}$ km d'elle ou moins. Une maison est à $${tD(d)}$ km de l'antenne. Est-elle couverte ?`, mode: "choix", choix, attendu: rep,
        aides: ["La zone couverte est un **disque** de centre l'antenne.", `Son rayon est $${r}$ km.`, `Compare $${tD(d)}$ à $${r}$.`],
        solution: `$${tD(d)}$ ${rep === 0 ? "<" : rep === 1 ? ">" : "="} $${r}$ : ${["la maison est dans le disque, elle est couverte.", "la maison est hors du disque, elle n'est pas couverte.", "la maison est sur le cercle, à la limite de la zone."][rep]}` }; }
    if (t === 1) { const c1 = pick(["Kani-Kéli", "Bandrélé", "Dembéni", "Sada"]), c2 = pick(["Ouangani", "Chiconi", "Tsingoni", "Mtsamboro"]);
      const c = melange("Sur la médiatrice du segment qui relie les deux villages", ["Au milieu exact de la route qui relie les deux villages, seulement", "Dans le village le plus grand", "N'importe où sur la route qui relie les deux villages"]);
      return { enonce: `On veut construire une salle de sport à égale distance des villages de ${c1} et de ${c2}. Où peut-on la placer ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Quels sont les points à égale distance de deux points ?", "C'est une propriété de la médiatrice.", "Le milieu est un de ces points, mais il y en a beaucoup d'autres."],
        solution: "Les points à égale distance de deux points sont exactement ceux de la **médiatrice** du segment qui les relie. Le milieu en fait partie, mais toute la médiatrice convient." }; }
    const r = rand(3, 12);
    return { enonce: `Une chèvre est attachée à un piquet par une corde de $${r}$ m. Quelle est la plus grande distance entre deux touffes d'herbe qu'elle peut brouter ?`, mode: "nombre", prefixe: "Distance :", suffixe: "m", attendu: 2 * r,
      erreurs: [{ valeur: r, message: "Deux touffes peuvent être de part et d'autre du piquet." }],
      aides: ["La chèvre peut brouter dans un disque de centre le piquet.", `Le rayon du disque est $${r}$ m.`, "La plus grande distance entre deux points d'un disque est son diamètre."],
      solution: `La chèvre broute dans un disque de rayon $${r}$ m. Deux points les plus éloignés sont aux extrémités d'un diamètre : $2 \\times ${r} = ${2 * r}$ m.` };
  };

  /* =====================================================================
     6e, chapitre 10 : angles et bissectrice (préfixe an6-)
     Programme : lexique et notations (angle droit, plat, plein, nul, aigu, obtus, opposés par le sommet, adjacents,
     supplémentaires) ; mesurer un angle ; construire un angle de mesure donnée ; bissectrice d'un angle saillant.
     ===================================================================== */
  const ang = (a, s, b) => `\\widehat{${a}${s}${b}}`;
  // Rapporteur : sommet en bas au centre, un côté sur le 0 (à droite ou à gauche), l'autre à `mes` degrés
  function rapporteur(mes, aGauche, noms) {
    const W = 320, H = 190, cx = 160, cy = 160, R = 120, rad = (d) => (d * Math.PI) / 180;
    const [A, O, B] = noms || ["A", "O", "B"];
    const pt = (deg, r) => [+(cx + r * Math.cos(rad(deg))).toFixed(1), +(cy - r * Math.sin(rad(deg))).toFixed(1)];
    let s = `<svg class="graph rapporteur" viewBox="0 0 ${W} ${H}" role="img" aria-label="Rapporteur posé sur un angle ; les deux graduations vont de 0 à 180 en sens contraires">`;
    s += `<path class="g-rapporteur" d="M${cx - R} ${cy} A${R} ${R} 0 0 1 ${cx + R} ${cy} Z"/>`;
    for (let d = 0; d <= 180; d += 5) {
      const lg = d % 10 === 0 ? 10 : 5, [x1, y1] = pt(d, R), [x2, y2] = pt(d, R - lg);
      s += `<line class="g-graduation" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
      if (d % 20 === 0) { const [tx, ty] = pt(d, R - 20), [ux, uy] = pt(d, R - 34); s += `<text class="g-grad-ext" x="${tx}" y="${ty + 3}" text-anchor="middle">${d}</text><text class="g-grad-int" x="${ux}" y="${uy + 3}" text-anchor="middle">${180 - d}</text>`; }
    }
    // côtés de l'angle (le côté de départ sur le 0 de la graduation utilisée)
    const d0 = aGauche ? 180 : 0, d1 = aGauche ? 180 - mes : mes;
    const [ax, ay] = pt(d0, R + 26), [bx, by] = pt(d1, R + 26);
    s += `<line class="g-segment" x1="${cx}" y1="${cy}" x2="${ax}" y2="${ay}"/><line class="g-segment" x1="${cx}" y1="${cy}" x2="${bx}" y2="${by}"/>`;
    s += `<circle class="g-point" cx="${cx}" cy="${cy}" r="3"/><text class="g-plabel" x="${cx}" y="${cy + 16}" text-anchor="middle">${O}</text>`;
    s += `<text class="g-plabel" x="${aGauche ? ax + 4 : ax - 4}" y="${ay - 6}" text-anchor="${aGauche ? "start" : "end"}">${A}</text>`;
    const [lx, ly] = pt(d1, R + 34); s += `<text class="g-plabel" x="${lx}" y="${Math.max(12, ly)}" text-anchor="middle">${B}</text>`;
    return s.replace(`viewBox="0 0 ${W} ${H}"`, `viewBox="0 -14 ${W} ${H + 14}"`) + `</svg>`;
  }
  // Un angle seul, avec son arc : côtés à d0 et d1 degrés
  function figureAngle(d0, d1, noms, droit) {
    const W = 320, H = 170, c = [150, 120], r = 110, rad = (d) => (d * Math.PI) / 180;
    const pt = (deg, rr) => [+(c[0] + rr * Math.cos(rad(deg))).toFixed(1), +(c[1] - rr * Math.sin(rad(deg))).toFixed(1)];
    const [A, S, B] = noms, [ax, ay] = pt(d0, r), [bx, by] = pt(d1, r);
    let s = `<svg class="graph geo" viewBox="0 -10 ${W} ${H + 10}" role="img" aria-label="Angle de sommet ${S}">`;
    s += `<line class="g-segment" x1="${c[0]}" y1="${c[1]}" x2="${ax}" y2="${ay}"/><line class="g-segment" x1="${c[0]}" y1="${c[1]}" x2="${bx}" y2="${by}"/>`;
    if (droit) { const u = (d) => [Math.cos(rad(d)) * 12, -Math.sin(rad(d)) * 12], [p, q] = [u(d0), u(d1)]; s += `<path class="g-code" d="M${c[0] + p[0]} ${c[1] + p[1]} L${c[0] + p[0] + q[0]} ${c[1] + p[1] + q[1]} L${c[0] + q[0]} ${c[1] + q[1]}"/>`; }
    else { const [p0, p1] = [pt(d0, 26), pt(d1, 26)], large = (d1 - d0 + 360) % 360 > 180 ? 1 : 0; s += `<path class="g-arc" d="M${p0[0]} ${p0[1]} A26 26 0 ${large} 0 ${p1[0]} ${p1[1]}"/>`; }
    [[A, ax, ay, d0], [B, bx, by, d1]].forEach(([n, x, y, d]) => { const [lx, ly] = pt(d, r + 14); s += `<circle class="g-point" cx="${x}" cy="${y}" r="3"/><text class="g-plabel" x="${lx}" y="${ly + 4}" text-anchor="middle">${n}</text>`; });
    s += `<circle class="g-point" cx="${c[0]}" cy="${c[1]}" r="3"/><text class="g-plabel" x="${c[0]}" y="${c[1] + 18}" text-anchor="middle">${S}</text>`;
    return s + `</svg>`;
  }
  // Deux droites sécantes en O, quatre angles numérotés 1 à 4
  function figureSecantes(a) {
    const W = 320, H = 180, c = [160, 92], r = 120, rad = (d) => (d * Math.PI) / 180, pt = (deg, rr) => [+(c[0] + rr * Math.cos(rad(deg))).toFixed(1), +(c[1] - rr * Math.sin(rad(deg))).toFixed(1)];
    const dirs = [0, a, 180, 180 + a];
    let s = `<svg class="graph geo" viewBox="0 0 ${W} ${H}" role="img" aria-label="Deux droites sécantes en O, quatre angles numérotés de 1 à 4">`;
    [[0, 180], [a, 180 + a]].forEach(([d1, d2]) => { const [x1, y1] = pt(d1, r), [x2, y2] = pt(d2, r); s += `<line class="g-droite" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`; });
    dirs.forEach((d, k) => { const m = d + ((k % 2 === 0 ? a : 180 - a) / 2), [x, y] = pt(m, 34); s += `<text class="g-plabel g-num-angle" x="${x}" y="${y + 4}" text-anchor="middle">${k + 1}</text>`; });
    s += `<circle class="g-point" cx="${c[0]}" cy="${c[1]}" r="3"/><text class="g-plabel" x="${c[0] + 4}" y="${c[1] + 16}">O</text>`;
    return s + `</svg>`;
  }
  FIGURES["an6-rapporteur"] = () => rapporteur(50, false, ["A", "O", "B"]);
  FIGURES["an6-angle"] = () => figureAngle(10, 75, ["A", "B", "C"]);
  FIGURES["an6-secantes"] = () => figureSecantes(55);

  const NATURES = [["nul", (m) => m === 0], ["aigu", (m) => m > 0 && m < 90], ["droit", (m) => m === 90], ["obtus", (m) => m > 90 && m < 180], ["plat", (m) => m === 180], ["plein", (m) => m === 360]];
  GEN["an6-nature"] = function () {
    const m = pick([rand(1, 89), rand(1, 89), rand(91, 179), rand(91, 179), 90, 180, 0, 360]), nat = NATURES.find((n) => n[1](m))[0];
    const fig = Math.random() < 0.5 && m > 0 && m < 360 && m !== 180;
    const noms = shuffle(["A", "B", "C", "D", "E", "F"]).slice(0, 3), d0 = rand(-10, 30);
    const c = melange(`Un angle ${nat}`, ["Un angle aigu", "Un angle droit", "Un angle obtus", "Un angle plat", "Un angle nul"].filter((x) => x !== `Un angle ${nat}`).sort(() => Math.random() - 0.5));
    return { enonce: fig ? `L'angle $${ang(noms[0], noms[1], noms[2])}$ mesure $${m}$°. C'est :` : `Un angle qui mesure $${m}$° est :`, figure: fig ? figureAngle(d0, d0 + m, noms, m === 90) : undefined, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Aigu : entre $0$° et $90$° ; droit : $90$° ; obtus : entre $90$° et $180$°.", "Plat : $180$° (les deux côtés sont dans le prolongement l'un de l'autre).", "Nul : $0$° ; plein : $360$° (un tour complet)."],
      solution: `$${m}$° : ${{ nul: "c'est $0$°, un angle **nul**", aigu: "plus petit qu'un angle droit, c'est un angle **aigu**", droit: "c'est un angle **droit**", obtus: "entre $90$° et $180$°, c'est un angle **obtus**", plat: "c'est un angle **plat**", plein: "un tour complet, c'est un angle **plein**" }[nat]}.` };
  };

  GEN["an6-nommer"] = function () {
    const noms = shuffle(["A", "B", "C", "D", "E", "F", "M", "N", "P", "R"]).slice(0, 3), [A, S, B] = noms, d0 = rand(0, 40), d1 = d0 + rand(30, 140);
    const fig = figureAngle(d0, d1, noms), t = rand(0, 1);
    if (t === 0) { const c = melange(`$${ang(A, S, B)}$`, [`$${ang(S, A, B)}$`, `$${ang(A, B, S)}$`, `$${S}${A}${B}$`, `$[${S}${A})$`]);
      return { enonce: "Comment se note l'angle marqué sur la figure ?", figure: fig, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Repère le sommet de l'angle : le point où partent les deux côtés.", "Dans la notation, le sommet s'écrit **au milieu**, sous le chapeau.", `On peut aussi l'écrire $${ang(B, S, A)}$.`],
        solution: `Le sommet est $${S}$ et les côtés sont $[${S}${A})$ et $[${S}${B})$ : l'angle se note $${ang(A, S, B)}$ (ou $${ang(B, S, A)}$).` }; }
    const c = melange(`$[${S}${A})$ et $[${S}${B})$`, [`$[${A}${S})$ et $[${A}${B})$`, `$[${A}${B}]$ et $[${S}${B}]$`, `$(${S}${A})$ et $(${A}${B})$`]);
    return { enonce: `Quels sont les côtés de l'angle $${ang(A, S, B)}$ ?`, figure: fig, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Les côtés d'un angle sont deux **demi-droites** de même origine.", "Leur origine est le sommet de l'angle.", `Le sommet de $${ang(A, S, B)}$ est la lettre du milieu.`],
      solution: `Le sommet est $${S}$ ; les côtés sont les demi-droites $[${S}${A})$ et $[${S}${B})$.` };
  };

  GEN["an6-mesurer"] = function () {
    const m = rand(1, 35) * 5, g = Math.random() < 0.5, noms = shuffle(["A", "B", "C", "D", "E", "F", "M", "N"]).slice(0, 2), S = pick(["O", "S", "K"]);
    return { enonce: `Le rapporteur est posé sur l'angle $${ang(noms[0], S, noms[1])}$, son centre sur le sommet $${S}$. Quelle est la mesure de cet angle ?`, figure: rapporteur(m, g, [noms[0], S, noms[1]]), mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: m,
      erreurs: m !== 90 ? [{ valeur: 180 - m, message: `Tu as lu la mauvaise graduation : utilise celle qui vaut $0$ sur le côté $[${S}${noms[0]})$.` }] : [],
      aides: [`Le côté $[${S}${noms[0]})$ passe par le $0$ d'une des deux graduations : c'est celle-là qu'il faut lire.`, `Ici, c'est la graduation ${g ? "intérieure" : "extérieure"}. Suis-la jusqu'au côté $[${S}${noms[1]})$.`, `L'angle est ${m < 90 ? "aigu : sa mesure est plus petite que $90$°" : m > 90 ? "obtus : sa mesure est plus grande que $90$°" : "droit"}.`],
      solution: `On part du $0$ situé sur le côté $[${S}${noms[0]})$ (graduation ${g ? "intérieure" : "extérieure"}) et on lit la graduation sous le côté $[${S}${noms[1]})$ : $${m}$°. Contrôle : l'angle est ${m < 90 ? "aigu" : m > 90 ? "obtus" : "droit"}.` };
  };

  GEN["an6-calcul"] = function () {
    const t = rand(0, 3), [x, O, y, z] = ["x", pick(["O", "S"]), "y", "z"];
    if (t === 0) { const a = rand(10, 80), b = rand(10, 90);
      return { enonce: `Les angles $${ang(x, O, z)}$ et $${ang(z, O, y)}$ sont adjacents : $${ang(x, O, z)} = ${a}$° et $${ang(z, O, y)} = ${b}$°. Combien mesure $${ang(x, O, y)}$ ?`, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: a + b,
        aides: ["Deux angles **adjacents** ont le même sommet, un côté commun, et sont de part et d'autre de ce côté.", `L'angle $${ang(x, O, y)}$ est formé des deux angles mis côte à côte.`, `Calcule $${a} + ${b}$.`], solution: `$${ang(x, O, y)} = ${a} + ${b} = ${a + b}$°.` }; }
    if (t === 1) { const a = rand(5, 175);
      return { enonce: `Les angles $${ang(x, O, z)}$ et $${ang(z, O, y)}$ sont supplémentaires et $${ang(x, O, z)} = ${a}$°. Combien mesure $${ang(z, O, y)}$ ?`, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: 180 - a,
        erreurs: [{ valeur: 90 - a, message: "Supplémentaires : la somme fait $180$°, pas $90$°." }, { valeur: 360 - a, message: "Supplémentaires : la somme fait $180$° (un angle plat)." }],
        aides: ["Deux angles **supplémentaires** ont une somme de $180$°.", `Il manque donc $180 - ${a}$.`, "Ensemble, ils forment un angle plat."], solution: `$180 - ${a} = ${180 - a}$°.` }; }
    if (t === 2) { const a = rand(20, 160), k = pick([1, 2, 3, 4]), fig = figureSecantes(a);
      const val = [a, 180 - a, a, 180 - a], bon = val[k - 1];
      return { enonce: `Deux droites se coupent en $O$. L'angle n° $1$ mesure $${a}$°. Combien mesure l'angle n° $${k === 1 ? 3 : k}$ ?`, figure: fig, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: k === 1 ? a : bon,
        aides: ["Les angles n° $1$ et n° $3$ sont **opposés par le sommet** : ils ont la même mesure.", "Les angles n° $1$ et n° $2$ forment un angle plat : ils sont supplémentaires.", "$180$° pour un demi-tour."],
        solution: (k === 1 || k === 3) ? `Les angles n° $1$ et n° $3$ sont opposés par le sommet : ils mesurent tous les deux $${a}$°.` : `Les angles n° $1$ et n° $${k}$ forment un angle plat : $180 - ${a} = ${180 - a}$°.` }; }
    const a = rand(5, 100), b = rand(5, 360 - a - 30);
    return { enonce: `Autour du point $${O}$, trois angles adjacents font un tour complet. Deux d'entre eux mesurent $${a}$° et $${b}$°. Combien mesure le troisième ?`, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: 360 - a - b,
      erreurs: [{ valeur: 180 - a - b, message: "Un tour complet, c'est $360$°, pas $180$°." }],
      aides: ["Un tour complet est un angle plein : $360$°.", "Les trois angles ensemble font $360$°.", `Calcule $360 - ${a} - ${b}$.`], solution: `$360 - ${a} - ${b} = ${360 - a - b}$°.` };
  };

  GEN["an6-bissectrice"] = function () {
    const t = rand(0, 2), O = pick(["O", "S"]);
    if (t === 0) { const a = rand(10, 89) * 2;
      return { enonce: `La demi-droite $[${O}z)$ est la bissectrice de l'angle $${ang("x", O, "y")}$, qui mesure $${a}$°. Combien mesure $${ang("x", O, "z")}$ ?`, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: a / 2,
        aides: ["La bissectrice partage l'angle en **deux angles égaux**.", "Chacun des deux angles mesure la moitié de l'angle de départ.", `Calcule $${a} \\div 2$.`], solution: `$${ang("x", O, "z")} = ${a} \\div 2 = ${a / 2}$°.` }; }
    if (t === 1) { const b = rand(5, 89);
      return { enonce: `$[${O}z)$ est la bissectrice de $${ang("x", O, "y")}$ et $${ang("x", O, "z")} = ${b}$°. Combien mesure $${ang("x", O, "y")}$ ?`, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: 2 * b,
        erreurs: [{ valeur: b / 2, message: "L'angle entier est le **double** de chaque moitié." }],
        aides: ["La bissectrice partage l'angle en deux angles égaux.", `$${ang("x", O, "z")} = ${ang("z", O, "y")} = ${b}$°.`, `Calcule $2 \\times ${b}$.`], solution: `$${ang("x", O, "y")} = 2 \\times ${b} = ${2 * b}$°.` }; }
    const c = melange("la demi-droite qui partage l'angle en deux angles de même mesure", ["la droite perpendiculaire à un côté", "la demi-droite qui partage l'angle en un angle droit et un autre", "le segment qui relie les extrémités des deux côtés"]);
    return { enonce: "La bissectrice d'un angle est :", mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["« Bi » : deux ; « sectrice » : qui coupe.", "Elle passe par le sommet de l'angle.", "Elle coupe l'angle en deux parties égales."],
      solution: "La bissectrice d'un angle est la demi-droite, issue du sommet, qui partage l'angle en deux angles de même mesure." };
  };

  GEN["an6-vocab"] = function () {
    const a = rand(30, 150);
    if (a === 90) return GEN["an6-vocab"]();
    const fig = figureSecantes(a), paires = [[1, 3, "opposés par le sommet"], [2, 4, "opposés par le sommet"], [1, 2, "adjacents et supplémentaires"], [2, 3, "adjacents et supplémentaires"], [3, 4, "adjacents et supplémentaires"], [4, 1, "adjacents et supplémentaires"]];
    const [p, q, nat] = pick(paires);
    const c = melange(`Ils sont ${nat}`, ["Ils sont opposés par le sommet", "Ils sont adjacents et supplémentaires", "Ils sont tous les deux droits", "Ils n'ont aucun lien"].filter((x) => x !== `Ils sont ${nat}`));
    return { enonce: `Deux droites se coupent en $O$. Que peut-on dire des angles n° $${p}$ et n° $${q}$ ?`, figure: fig, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["**Adjacents** : même sommet, un côté commun, de part et d'autre de ce côté.", "**Opposés par le sommet** : même sommet, côtés dans le prolongement l'un de l'autre ; ils ont la même mesure.", "**Supplémentaires** : leur somme fait $180$°."],
      solution: nat.startsWith("opposés") ? `Les angles n° $${p}$ et n° $${q}$ ont le même sommet et leurs côtés se prolongent : ils sont **opposés par le sommet**, donc de même mesure.` : `Les angles n° $${p}$ et n° $${q}$ ont un côté commun et forment ensemble un angle plat : ils sont **adjacents et supplémentaires** (somme $180$°).` };
  };

  /* =====================================================================
     6e, chapitre 11 : triangles (préfixe tg6-)
     Programme : construire des triangles (trois longueurs ne permettent pas toujours de construire un triangle) ;
     propriétés angulaires des triangles rectangle, isocèle, équilatéral ; somme des angles égale à 180° ;
     médiatrices concourantes et cercle circonscrit.
     ===================================================================== */
  // Triangle ABC (sommets en pixels), avec codage et textes (mesures) placés près des sommets
  function figureTriangle(P, noms, o) {
    o = o || {};
    const [A, B, C] = noms, pts = { [A]: P[0], [B]: P[1], [C]: P[2] };
    const g = [P[0][0] + P[1][0] + P[2][0], P[0][1] + P[1][1] + P[2][1]].map((v) => v / 3);
    const decal = {}; [A, B, C].forEach((n, k) => { const dx = P[k][0] - g[0], dy = P[k][1] - g[1], L = Math.hypot(dx, dy); decal[n] = [Math.round((dx / L) * 12) - 3, Math.round((dy / L) * 12) + 4]; });
    let s = geo({ W: 320, H: o.H || 190, pts, segs: [[A, B], [B, C], [C, A]], codes: o.codes, droitAngle: o.droit, decal, aria: o.aria || `Triangle ${A}${B}${C}` });
    (o.angles || []).forEach(([k, txt]) => { const dx = g[0] - P[k][0], dy = g[1] - P[k][1], L = Math.hypot(dx, dy); s = s.replace("</svg>", `<text class="g-mesure" x="${+(P[k][0] + (dx / L) * 30).toFixed(1)}" y="${+(P[k][1] + (dy / L) * 30 + 4).toFixed(1)}" text-anchor="middle">${txt}</text></svg>`); });
    return s;
  }
  const NOMS_TRI = () => shuffle([["A", "B", "C"], ["D", "E", "F"], ["M", "N", "P"], ["R", "S", "T"], ["I", "J", "K"], ["E", "F", "G"]].slice())[0];
  FIGURES["tg6-somme"] = () => figureTriangle([[40, 160], [280, 160], [110, 30]], ["A", "B", "C"], { angles: [[0, "62°"], [1, "37°"], [2, "?"]] });
  FIGURES["tg6-isocele"] = () => figureTriangle([[60, 165], [260, 165], [160, 25]], ["B", "C", "A"], { codes: [["A", "B", 2], ["A", "C", 2]], angles: [[0, "55°"], [1, "55°"], [2, "70°"]], aria: "Triangle ABC isocèle en A : AB = AC, angles à la base de 55°" });

  GEN["tg6-nature"] = function () {
    const n = NOMS_TRI(), [A, B, C] = n, t = rand(0, 4);
    const formes = [
      { nom: "Un triangle isocèle", P: [[60, 165], [260, 165], [160 + rand(-20, 20), 30]], codes: [[C, A, 2], [C, B, 2]], txt: `il a deux côtés de même longueur : $${C}${A} = ${C}${B}$. Il est isocèle en $${C}$` },
      { nom: "Un triangle équilatéral", P: [[80, 172], [240, 172], [160, 33.4]], codes: [[A, B, 1], [B, C, 1], [C, A, 1]], txt: "ses trois côtés ont la même longueur" },
      { nom: "Un triangle rectangle", P: [[60, 165], [60, 40], [260 - rand(0, 40), 165]], droit: [[B, A, C]], txt: `il a un angle droit, en $${A}$` },
      { nom: "Un triangle rectangle isocèle", P: [[70, 170], [70, 40], [200, 170]], droit: [[B, A, C]], codes: [[A, B, 1], [A, C, 1]], txt: `il a un angle droit en $${A}$ et deux côtés de même longueur, $${A}${B} = ${A}${C}$` },
      { nom: "Un triangle quelconque", P: [[40, 165], [270, 150], [120 + rand(0, 40), 30]], txt: "il n'a ni côtés de même longueur codés, ni angle droit" }
    ];
    const F = formes[t];
    // une réponse plus précise rend vraies les réponses plus générales : on retire ces dernières des choix
    const aussiVrai = { "Un triangle équilatéral": ["Un triangle isocèle"], "Un triangle rectangle isocèle": ["Un triangle isocèle", "Un triangle rectangle"] }[F.nom] || [];
    const c = melange(F.nom, formes.map((f) => f.nom).filter((x) => x !== F.nom && !aussiVrai.includes(x)).sort(() => Math.random() - 0.5).slice(0, 3));
    return { enonce: `D'après le codage de la figure, quelle est la nature du triangle $${A}${B}${C}$ ?`, figure: figureTriangle(F.P, n, { codes: F.codes, droit: F.droit }), mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Les petits traits identiques indiquent des côtés de même longueur.", "Le petit carré indique un angle droit.", "On ne se fie qu'au codage, pas à l'impression visuelle."],
      solution: `${F.nom} : ${F.txt}.` };
  };

  GEN["tg6-somme"] = function () {
    const n = NOMS_TRI(), [A, B, C] = n, t = rand(0, 4), h = (x, y, z) => `\\widehat{${x}${y}${z}}`;
    if (t === 0) { const a = rand(20, 110), b = rand(15, 160 - a), c = 180 - a - b;
      const P = [[40, 160], [280, 160], [rand(90, 200), 30]];
      return { enonce: `Dans le triangle $${A}${B}${C}$, $${h(C, A, B)} = ${a}$° et $${h(A, B, C)} = ${b}$°. Combien mesure $${h(A, C, B)}$ ? (La figure n'est pas en vraie grandeur.)`, figure: figureTriangle(P, n, { angles: [[0, a + "°"], [1, b + "°"], [2, "?"]] }), mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: c,
        erreurs: [{ valeur: 360 - a - b, message: "La somme des angles d'un triangle fait $180$°, pas $360$°." }, { valeur: a + b, message: "Il faut retirer les deux angles connus de $180$°." }],
        aides: ["La somme des trois angles d'un triangle est toujours $180$°.", `$${a} + ${b} = ${a + b}$.`, `Calcule $180 - ${a + b}$.`], solution: `$180 - ${a} - ${b} = ${c}$° : $${h(A, C, B)} = ${c}$°.` }; }
    if (t === 1) { const b = rand(20, 85), sommet = 180 - 2 * b;
      return { enonce: `Le triangle $${A}${B}${C}$ est isocèle en $${A}$, et $${h(A, B, C)} = ${b}$°. Combien mesure $${h(B, A, C)}$ ?`, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: sommet,
        erreurs: [{ valeur: 180 - b, message: `Les deux angles à la base, en $${B}$ et en $${C}$, mesurent tous les deux $${b}$°.` }],
        aides: [`Isocèle en $${A}$ : les angles à la base, $${h(A, B, C)}$ et $${h(A, C, B)}$, ont la même mesure.`, `Donc $${h(A, C, B)} = ${b}$°.`, `$180 - ${b} - ${b}$.`], solution: `$${h(A, C, B)} = ${h(A, B, C)} = ${b}$°, donc $${h(B, A, C)} = 180 - 2 \\times ${b} = ${sommet}$°.` }; }
    if (t === 2) { const s0 = rand(10, 80) * 2, base = (180 - s0) / 2;
      return { enonce: `Le triangle $${A}${B}${C}$ est isocèle en $${A}$, et $${h(B, A, C)} = ${s0}$°. Combien mesure $${h(A, B, C)}$ ?`, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: base,
        erreurs: [{ valeur: 180 - s0, message: "Il reste $" + (180 - s0) + "$° à partager entre les deux angles à la base." }],
        aides: [`Il reste $180 - ${s0} = ${180 - s0}$° pour les deux angles à la base.`, "Les deux angles à la base sont égaux.", `Calcule $${180 - s0} \\div 2$.`], solution: `$(180 - ${s0}) \\div 2 = ${base}$° : $${h(A, B, C)} = ${base}$°.` }; }
    if (t === 3) { const a = rand(10, 80);
      return { enonce: `Le triangle $${A}${B}${C}$ est rectangle en $${A}$, et $${h(A, B, C)} = ${a}$°. Combien mesure $${h(A, C, B)}$ ?`, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: 90 - a,
        erreurs: [{ valeur: 180 - a, message: `N'oublie pas l'angle droit en $${A}$ : $90$°.` }],
        aides: [`L'angle en $${A}$ est droit : $90$°.`, "Il reste $180 - 90 = 90$° pour les deux autres angles.", `Calcule $90 - ${a}$.`], solution: `$180 - 90 - ${a} = ${90 - a}$° : $${h(A, C, B)} = ${90 - a}$°.` }; }
    const c = melange("$60$°", ["$90$°", "$45$°", "$180$°", "$30$°"]);
    return { enonce: `Le triangle $${A}${B}${C}$ est équilatéral. Combien mesure chacun de ses angles ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Dans un triangle équilatéral, les trois angles sont égaux.", "Leur somme fait $180$°.", "$180 \\div 3$."], solution: "Trois angles égaux de somme $180$° : chacun mesure $180 \\div 3 = 60$°." };
  };

  GEN["tg6-construire"] = function () {
    const t = rand(0, 2), n = NOMS_TRI(), [A, B, C] = n;
    let a, b, c;
    if (t === 0) { a = rand(3, 9); b = rand(3, 9); c = rand(Math.abs(a - b) + 1, a + b - 1); }
    else if (t === 1) { a = rand(2, 7); b = rand(2, 7); c = a + b + rand(1, 5); }
    else { a = rand(2, 7); b = rand(2, 7); c = a + b; }
    const cotes = shuffle([a, b, c]), plus = Math.max(a, b, c), autres = a + b + c - plus;
    const choix = ["Oui, on peut construire ce triangle", "Non : le plus grand côté est trop long, les arcs ne se coupent pas", "Non : les trois points sont alignés (triangle « aplati »)"];
    const rep = t;
    return { enonce: `Peut-on construire un triangle $${A}${B}${C}$ avec $${A}${B} = ${cotes[0]}$ cm, $${B}${C} = ${cotes[1]}$ cm et $${A}${C} = ${cotes[2]}$ cm ?`, mode: "choix", choix, attendu: rep,
      aides: ["Compare le plus grand côté à la somme des deux autres.", `Ici, le plus grand côté mesure $${plus}$ cm et les deux autres font ensemble $${autres}$ cm.`, "Plus petit : on peut construire. Égal : points alignés. Plus grand : impossible."],
      solution: `Plus grand côté : $${plus}$ cm ; somme des deux autres : $${autres}$ cm. ${[`$${plus} < ${autres}$ : les deux arcs de cercle se coupent, le triangle existe.`, `$${plus} > ${autres}$ : les deux autres côtés sont trop courts pour se rejoindre, le triangle n'existe pas.`, `$${plus} = ${autres}$ : les trois points sont alignés, on n'obtient pas un vrai triangle.`][rep]}` };
  };

  GEN["tg6-angles-possibles"] = function () {
    const ok = Math.random() < 0.5, a = rand(20, 100), b = rand(15, 150 - a), c = ok ? 180 - a - b : 180 - a - b + pick([-20, -10, 10, 20, 30]);
    if (c <= 0) return GEN["tg6-angles-possibles"]();
    const n = NOMS_TRI();
    const choix = ["Oui, la somme fait bien $180$°", "Non, la somme ne fait pas $180$°"];
    const cc = melange(choix[ok ? 0 : 1], [choix[ok ? 1 : 0], "Oui, tout triangle peut avoir ces angles", "On ne peut pas savoir sans mesurer les côtés"]);
    return { enonce: `Un triangle $${n.join("")}$ peut-il avoir des angles de $${a}$°, $${b}$° et $${c}$° ?`, mode: "choix", choix: cc.choix, attendu: cc.attendu,
      aides: ["Additionne les trois mesures.", "Dans tout triangle, la somme des angles est $180$°.", `$${a} + ${b} + ${c} = ${a + b + c}$.`],
      solution: `$${a} + ${b} + ${c} = ${a + b + c}$ : ${ok ? "c'est $180$°, un tel triangle est possible." : "ce n'est pas $180$°, un tel triangle est impossible."}` };
  };

  GEN["tg6-circonscrit"] = function () {
    const t = rand(0, 2), n = NOMS_TRI(), [A, B, C] = n, O = pick(["O", "K", "L"]);
    if (t === 0) { const r = Dc(rand(15, 80), 1);
      return { enonce: `$${O}$ est le centre du cercle circonscrit au triangle $${A}${B}${C}$, et $${O}${A} = ${tD(r)}$ cm. Combien mesure $${O}${C}$ ?`, mode: "nombre", prefixe: `$${O}${C} =$`, suffixe: "cm", attendu: vD(r),
        aides: ["Le cercle circonscrit passe par les trois sommets du triangle.", `$${A}$, $${B}$ et $${C}$ sont sur un même cercle de centre $${O}$.`, `$${O}${A}$, $${O}${B}$ et $${O}${C}$ sont trois rayons.`], solution: `$${O}${C}$ est un rayon du cercle circonscrit, comme $${O}${A}$ : $${O}${C} = ${tD(r)}$ cm.` }; }
    if (t === 1) { const c = melange("des médiatrices des côtés", ["des bissectrices des angles", "des côtés du triangle", "des milieux des côtés"]);
      return { enonce: `Le centre du cercle circonscrit à un triangle est le point de rencontre :`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Le centre doit être à la même distance des trois sommets.", "Quels points sont à la même distance de deux points ?", "Ce sont les points de la médiatrice."],
        solution: "Le centre est à égale distance des trois sommets : il est sur les trois médiatrices des côtés, qui se coupent en un même point (elles sont concourantes)." }; }
    const c = melange(`Le cercle qui passe par $${A}$, $${B}$ et $${C}$`, [`Le cercle de diamètre $[${A}${B}]$ seulement`, `Le cercle de centre $${A}$ qui passe par $${B}$`, "Le cercle tracé à l'intérieur du triangle"]);
    return { enonce: `Le cercle circonscrit au triangle $${A}${B}${C}$ est :`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["« Circonscrit » : qui entoure, qui est autour.", "Il passe par les trois sommets.", "Son centre est le point de rencontre des médiatrices."],
      solution: `Le cercle circonscrit au triangle $${A}${B}${C}$ est le cercle qui passe par ses trois sommets $${A}$, $${B}$ et $${C}$.` };
  };

  /* =====================================================================
     6e, chapitre 12 : symétrie axiale (préfixe sx6-)
     Programme : définition du symétrique d'un point par rapport à une droite ; propriétés de la symétrie axiale
     pour construire (conservation des longueurs, des angles, des alignements) ; axes de symétrie (automatisme).
     Supports : quadrillage, puis papier uni.
     ===================================================================== */
  // Quadrillage de 12 × 8 carreaux, un axe (d) et des points nommés ; coordonnées entières, (0, 0) en bas à gauche
  const SYM = {
    v: (a) => ({ f: ([x, y]) => [2 * a - x, y], trait: [[a, -0.4], [a, 8.4]], nom: "verticale" }),
    h: (b) => ({ f: ([x, y]) => [x, 2 * b - y], trait: [[-0.4, b], [12.4, b]], nom: "horizontale" }),
    d: (c) => ({ f: ([x, y]) => [y - c, x + c], trait: [[-c - 0.4 < 0 ? 0 : -c, (-c - 0.4 < 0 ? c : 0)], [8 - c, 8]], nom: "en biais" })
  };
  function grilleSym(axe, points, polys) {
    const u = 24, W = 12 * u + 16, H = 8 * u + 16, X = (x) => 8 + x * u, Y = (y) => 8 + (8 - y) * u;
    let s = `<svg class="graph grille-sym" viewBox="0 0 ${W} ${H}" role="img" aria-label="Quadrillage avec un axe de symétrie (d)"><g class="g-grid">`;
    for (let i = 0; i <= 12; i++) s += `<line x1="${X(i)}" y1="${Y(0)}" x2="${X(i)}" y2="${Y(8)}"/>`;
    for (let j = 0; j <= 8; j++) s += `<line x1="${X(0)}" y1="${Y(j)}" x2="${X(12)}" y2="${Y(j)}"/>`;
    s += `</g>`;
    (polys || []).forEach((p) => { s += `<polygon class="${p.classe || "g-poly"}" points="${p.pts.map(([x, y]) => `${X(x)},${Y(y)}`).join(" ")}"/>`; });
    const [[x1, y1], [x2, y2]] = axe.trait;
    s += `<line class="g-axe" x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}"/><text class="g-plabel g-axe-nom" x="${X(x2) + (axe.nom === "horizontale" ? -24 : 6)}" y="${Y(y2) + (axe.nom === "horizontale" ? -6 : 14)}">(d)</text>`;
    points.forEach(([n, [x, y]]) => { s += `<circle class="g-point" cx="${X(x)}" cy="${Y(y)}" r="3.5"/><text class="g-plabel" x="${X(x) + 6}" y="${Y(y) - 6}">${n}</text>`; });
    return s + `</svg>`;
  }
  const dansGrille = ([x, y]) => x >= 0 && x <= 12 && y >= 0 && y <= 8;
  function axeHasard() {
    const t = rand(0, 2);
    if (t === 0) return SYM.v(rand(4, 8));
    if (t === 1) return SYM.h(rand(3, 5));
    const c = rand(-3, 0); const A = SYM.d(c); A.trait = [[-c, 0], [8 - c, 8]]; return A;
  }
  FIGURES["sx6-grille"] = () => { const a = SYM.v(6); return grilleSym(a, [["A", [3, 5]], ["A'", [9, 5]]], [{ pts: [[2, 1], [4, 1], [4, 3]] }, { pts: [[10, 1], [8, 1], [8, 3]], classe: "g-poly g-poly-image" }]); };

  GEN["sx6-point"] = function () {
    for (let essai = 0; essai < 40; essai++) {
      const axe = axeHasard(), A = [rand(0, 12), rand(0, 8)], img = axe.f(A);
      if (!dansGrille(img) || (img[0] === A[0] && img[1] === A[1])) continue;
      // pièges : symétrique par un autre axe, glissement, point à la même distance mais pas en face
      const pieges = [[img[0], A[1]], [A[0], img[1]], [img[0] + 1, img[1]], [img[0], img[1] + 1], [img[0] - 1, img[1] - 1], [2 * img[0] - A[0], 2 * img[1] - A[1]], [img[1], img[0]]]
        .filter((p) => dansGrille(p) && !(p[0] === img[0] && p[1] === img[1]) && !(p[0] === A[0] && p[1] === A[1]));
      const autres = []; pieges.forEach((p) => { if (autres.length < 3 && !autres.some((q) => q[0] === p[0] && q[1] === p[1])) autres.push(p); });
      if (autres.length < 3) continue;
      const lettres = shuffle(["E", "F", "G", "H", "K", "L", "R", "S"]).slice(0, 4), P = shuffle([img, ...autres]);
      const bon = lettres[P.indexOf(img)];
      const c = melange(`$${bon}$`, lettres.filter((l) => l !== bon).map((l) => `$${l}$`));
      return { enonce: "Sur le quadrillage, quel point est le symétrique du point $A$ par rapport à la droite $(d)$ ?", figure: grilleSym(axe, [["A", A], ...P.map((p, k) => [lettres[k], p])]), mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Le symétrique est **de l'autre côté** de $(d)$, **à la même distance**.", `Le segment qui relie $A$ à son symétrique est **perpendiculaire** à $(d)$${axe.nom === "en biais" ? " : il suit les diagonales des carreaux" : ""}.`, "Compte les carreaux (ou les diagonales) entre $A$ et $(d)$, puis compte-les de l'autre côté."],
        solution: `$(d)$ doit être la médiatrice du segment qui relie $A$ à son symétrique : le point $${bon}$ est de l'autre côté de $(d)$, à la même distance, et $[A${bon}]$ est perpendiculaire à $(d)$.` };
    }
    return GEN["sx6-point"]();
  };

  GEN["sx6-definition"] = function () {
    const t = rand(0, 2), [A, M] = shuffle(["A", "B", "C", "M", "N", "P"]).slice(0, 2);
    if (t === 0) { const c = melange(`$(d)$ est la médiatrice du segment $[${A}${A}']$`, [`$(d)$ passe par $${A}$ et $${A}'$`, `$(d)$ est parallèle à $(${A}${A}')$`, `$${A}'$ est sur la droite $(d)$`]);
      return { enonce: `« $${A}'$ est le symétrique de $${A}$ par rapport à la droite $(d)$ » signifie que :`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Le symétrique est de l'autre côté de la droite, à la même distance.", "La droite coupe $[" + A + A + "']$ en son milieu.", "Et elle lui est perpendiculaire."],
        solution: `$${A}'$ est le symétrique de $${A}$ par rapport à $(d)$ quand $(d)$ est la **médiatrice** de $[${A}${A}']$ : elle passe par son milieu et lui est perpendiculaire.` }; }
    if (t === 1) { const L = Dc(rand(11, 99), 1), d = Dc(L.m * 5, L.d + 1);
      return { enonce: `$${A}'$ est le symétrique de $${A}$ par rapport à $(d)$, et $${A}${A}' = ${tD(L)}$ cm. À quelle distance de la droite $(d)$ se trouve le point $${A}$ ?`, mode: "nombre", prefixe: "Distance :", suffixe: "cm", attendu: vD(L) / 2,
        erreurs: [{ valeur: vD(L), message: `$${A}$ et $${A}'$ sont chacun à la même distance de $(d)$ : on partage $${A}${A}'$ en deux.` }],
        aides: [`$(d)$ est la médiatrice de $[${A}${A}']$ : elle passe par son milieu.`, `$${A}$ est donc à la moitié de $${A}${A}'$ de la droite.`, `Calcule $${tD(L)} \\div 2$.`], solution: `$(d)$ passe par le milieu de $[${A}${A}']$ : la distance est $${tD(L)} \\div 2 = ${tD(d)}$ cm.` }; }
    const c = melange(`$${M}'$ est confondu avec $${M}$`, [`$${M}'$ est à $2$ cm de $${M}$`, `$${M}$ n'a pas de symétrique`, `$${M}'$ est sur la perpendiculaire à $(d)$, loin de $(d)$`]);
    return { enonce: `Le point $${M}$ est sur la droite $(d)$. Son symétrique $${M}'$ par rapport à $(d)$ :`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Le symétrique est à la même distance de $(d)$ que le point de départ.", `Ici, $${M}$ est à une distance $0$ de $(d)$.`, "Un point de l'axe ne bouge pas."], solution: `$${M}$ est sur $(d)$, à une distance $0$ : son symétrique est lui-même, $${M}' = ${M}$.` };
  };

  GEN["sx6-proprietes"] = function () {
    const t = rand(0, 3), [A, B, C] = NOMS_TRI();
    if (t === 0) { const L = Dc(rand(15, 95), 1);
      return { enonce: `Le triangle $${A}'${B}'${C}'$ est le symétrique du triangle $${A}${B}${C}$ par rapport à une droite. On sait que $${A}${B} = ${tD(L)}$ cm. Combien mesure $${A}'${B}'$ ?`, mode: "nombre", prefixe: `$${A}'${B}' =$`, suffixe: "cm", attendu: vD(L),
        aides: ["La symétrie axiale est comme un pliage : la figure ne change pas de forme ni de taille.", "Elle **conserve les longueurs**.", `$[${A}'${B}']$ est le symétrique de $[${A}${B}]$.`], solution: `La symétrie axiale conserve les longueurs : $${A}'${B}' = ${A}${B} = ${tD(L)}$ cm.` }; }
    if (t === 1) { const a = rand(15, 160);
      return { enonce: `Le triangle $${A}'${B}'${C}'$ est le symétrique du triangle $${A}${B}${C}$ par rapport à une droite, et $\\widehat{${A}${B}${C}} = ${a}$°. Combien mesure $\\widehat{${A}'${B}'${C}'}$ ?`, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: a,
        erreurs: [{ valeur: 180 - a, message: "La symétrie ne « retourne » pas la mesure : elle conserve les angles." }],
        aides: ["Pense au pliage : l'angle se pose exactement sur son symétrique.", "La symétrie axiale **conserve les angles**.", `$\\widehat{${A}'${B}'${C}'}$ est le symétrique de $\\widehat{${A}${B}${C}}$.`], solution: `La symétrie axiale conserve les angles : $\\widehat{${A}'${B}'${C}'} = ${a}$°.` }; }
    if (t === 2) { const [obj, img] = pick([["d'une droite", "une droite"], ["d'un segment de $5$ cm", "un segment de $5$ cm"], ["d'un cercle de rayon $3$ cm", "un cercle de rayon $3$ cm"], ["d'un carré", "un carré de même côté"], ["de trois points alignés", "trois points alignés"]]);
      const faux = ["un objet plus grand", "un objet plus petit", "un objet déformé", "une droite parallèle à l'axe dans tous les cas", "un cercle de rayon double"].filter((x) => x !== img);
      const c = melange(img[0].toUpperCase() + img.slice(1), shuffle(faux).slice(0, 3).map((x) => x[0].toUpperCase() + x.slice(1)));
      return { enonce: `Par une symétrie axiale, le symétrique ${obj} est :`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["La symétrie axiale conserve les longueurs, les angles et les alignements.", "Elle conserve donc la nature et la taille des figures.", "Pense à un pliage le long de l'axe."], solution: `La symétrie axiale conserve les formes et les mesures : le symétrique ${obj} est ${img}.` }; }
    const r = rand(2, 9);
    return { enonce: `Le cercle $(\\mathscr{C}')$ est le symétrique du cercle $(\\mathscr{C})$ de centre $O$ et de rayon $${r}$ cm. Quel est le rayon de $(\\mathscr{C}')$ ?`, mode: "nombre", prefixe: "Rayon :", suffixe: "cm", attendu: r,
      aides: ["Le symétrique d'un cercle est un cercle.", "La symétrie conserve les longueurs, donc les rayons.", "Son centre est le symétrique $O'$ de $O$."], solution: `Le symétrique d'un cercle est un cercle de même rayon, $${r}$ cm, dont le centre est le symétrique de $O$.` };
  };

  // Axes de symétrie de figures usuelles
  function figureForme(nom) {
    const W = 320, H = 170, cx = 160, cy = 85, poly = (pts) => `<polygon class="g-poly" points="${pts.map(([x, y]) => `${+x.toFixed(1)},${+y.toFixed(1)}`).join(" ")}"/>`;
    const reg = (n, r, rot) => Array.from({ length: n }, (_, k) => [cx + r * Math.cos(((rot || -90) + (360 * k) / n) * Math.PI / 180), cy + r * Math.sin(((rot || -90) + (360 * k) / n) * Math.PI / 180)]);
    const F = {
      "un carré": poly([[100, 25], [220, 25], [220, 145], [100, 145]]), "un rectangle (non carré)": poly([[70, 40], [250, 40], [250, 130], [70, 130]]),
      "un losange (non carré)": poly([[160, 15], [240, 85], [160, 155], [80, 85]]), "un triangle équilatéral": poly(reg(3, 80)),
      "un triangle isocèle (non équilatéral)": poly([[160, 15], [215, 155], [105, 155]]), "un triangle quelconque": poly([[70, 150], [260, 130], [120, 25]]),
      "un parallélogramme (quelconque)": poly([[60, 140], [200, 140], [260, 30], [120, 30]]), "un hexagone régulier": poly(reg(6, 75, 0)),
      "un pentagone régulier": poly(reg(5, 78)), "un trapèze isocèle": poly([[60, 145], [260, 145], [210, 30], [110, 30]]), "un cercle": `<circle class="g-poly" cx="${cx}" cy="${cy}" r="70"/>`
    };
    return `<svg class="graph geo" viewBox="0 0 ${W} ${H}" role="img" aria-label="Figure : ${nom}">${F[nom]}</svg>`;
  }
  const AXES = [["un carré", 4], ["un rectangle (non carré)", 2], ["un losange (non carré)", 2], ["un triangle équilatéral", 3], ["un triangle isocèle (non équilatéral)", 1], ["un triangle quelconque", 0], ["un parallélogramme (quelconque)", 0], ["un hexagone régulier", 6], ["un pentagone régulier", 5], ["un trapèze isocèle", 1], ["un cercle", "infini"]];
  FIGURES["sx6-rectangle"] = () => figureForme("un rectangle (non carré)");

  GEN["sx6-axes"] = function () {
    const [nom, n] = pick(AXES), avecFig = Math.random() < 0.7;
    const txt = (k) => (k === "infini" ? "Une infinité" : k === 0 ? "Aucun" : `$${k}$ axe${k > 1 ? "s" : ""}`);
    const autres = [0, 1, 2, 3, 4, 6, "infini"].filter((k) => k !== n).sort(() => Math.random() - 0.5).slice(0, 3);
    const c = melange(txt(n), autres.map(txt));
    const pourquoi = { "un carré": "ses deux diagonales et les deux médiatrices de ses côtés", "un rectangle (non carré)": "les deux médiatrices de ses côtés (pas ses diagonales)", "un losange (non carré)": "ses deux diagonales", "un triangle équilatéral": "les trois médiatrices de ses côtés", "un triangle isocèle (non équilatéral)": "la médiatrice de sa base", "un triangle quelconque": "aucun pliage ne superpose les deux moitiés", "un parallélogramme (quelconque)": "aucun pliage ne superpose les deux moitiés (même pas les diagonales)", "un hexagone régulier": "trois droites qui joignent des sommets opposés et trois médiatrices de côtés", "un pentagone régulier": "les cinq droites qui joignent un sommet au milieu du côté opposé", "un trapèze isocèle": "la médiatrice de ses deux bases", "un cercle": "toutes les droites qui passent par son centre" }[nom];
    return { enonce: `Combien d'axes de symétrie a ${nom} ?`, figure: avecFig ? figureForme(nom) : undefined, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Un axe de symétrie partage la figure en deux parties qui se superposent par pliage.", "Imagine les pliages possibles : selon les diagonales, selon les médiatrices des côtés…", "Attention : les diagonales d'un rectangle ou d'un parallélogramme ne sont pas des axes de symétrie."],
      solution: `${txt(n).replace("$", "").replace("$", "")} : ${pourquoi}.`.replace(/^Une infinité/, "Une infinité d'axes").replace(/^Aucun/, "Aucun axe") };
  };

  /* =====================================================================
     6e, chapitre 13 : longueurs, périmètres et aires (préfixe pa6-)
     Programme : unités de longueur (kilo- à milli-) et conversions ; périmètre d'une figure (contour), du carré,
     du rectangle ; périmètre du disque proportionnel au diamètre, formule ; figures composées ; unités d'aire
     (cm², dm², m²) et conversions ; aire sur quadrillage ; formules de l'aire du carré et du rectangle.
     ===================================================================== */
  const UL = [["km", 3], ["hm", 2], ["dam", 1], ["m", 0], ["dm", -1], ["cm", -2], ["mm", -3]];
  const UA = [["m²", 0], ["dm²", -2], ["cm²", -4]];
  // Rectangle (ou carré) coté, en pixels proportionnels
  function figureRectangle(L, l, unite, carre) {
    const W = 320, H = 170, k = Math.min(220 / L, 110 / l), w = L * k, h = l * k, x0 = (W - w) / 2, y0 = 20 + (110 - h) / 2;
    let s = `<svg class="graph geo" viewBox="0 0 ${W} ${H}" role="img" aria-label="${carre ? "Carré" : "Rectangle"} de ${nbTexte(L)} ${unite} sur ${nbTexte(l)} ${unite}">`;
    s += `<rect class="g-poly" x="${+x0.toFixed(1)}" y="${+y0.toFixed(1)}" width="${+w.toFixed(1)}" height="${+h.toFixed(1)}"/>`;
    [[x0, y0], [x0 + w - 9, y0], [x0, y0 + h - 9], [x0 + w - 9, y0 + h - 9]].forEach(([x, y]) => { s += `<rect class="g-code" x="${+x.toFixed(1)}" y="${+y.toFixed(1)}" width="9" height="9"/>`; });
    s += `<text class="g-mesure" x="${+(x0 + w / 2).toFixed(1)}" y="${+(y0 + h + 18).toFixed(1)}" text-anchor="middle">${nbTexte(L)} ${unite}</text>`;
    if (!carre) s += `<text class="g-mesure" x="${+(x0 + w + 6).toFixed(1)}" y="${+(y0 + h / 2 + 4).toFixed(1)}">${nbTexte(l)} ${unite}</text>`;
    return s + `</svg>`;
  }
  // Figure en L : rectangle a × b dont on retire un coin c × d (en haut à droite)
  function figureL(a, b, c, d, unite) {
    const W = 320, H = 190, k = Math.min(190 / a, 130 / b), X = (x) => +(62 + x * k).toFixed(1), Y = (y) => +(162 - y * k).toFixed(1);
    const pts = [[0, 0], [a, 0], [a, b - d], [a - c, b - d], [a - c, b], [0, b]];
    let s = `<svg class="graph geo" viewBox="0 0 ${W} ${H}" role="img" aria-label="Figure en L : rectangle de ${a} sur ${b} auquel on a retiré un coin de ${c} sur ${d}">`;
    s += `<polygon class="g-poly" points="${pts.map(([x, y]) => `${X(x)},${Y(y)}`).join(" ")}"/>`;
    const lab = (x, y, t, ancre) => { s += `<text class="g-mesure" x="${x}" y="${y}" text-anchor="${ancre}">${t}</text>`; };
    lab(X(a / 2), Y(0) + 16, `${nbTexte(a)} ${unite}`, "middle");
    lab(X(0) - 6, Y(b / 2) + 4, `${nbTexte(b)} ${unite}`, "end");
    lab(X(a) + 6, Y((b - d) / 2) + 4, `${nbTexte(b - d)} ${unite}`, "start");
    lab(X(a - c / 2), Y(b - d) + 16, `${nbTexte(c)} ${unite}`, "middle");
    lab(X(a - c) + 6, Y(b - d / 2) + 4, `${nbTexte(d)} ${unite}`, "start");
    lab(X((a - c) / 2), Y(b) - 6, `${nbTexte(a - c)} ${unite}`, "middle");
    return s + `</svg>`;
  }
  // Cercle de diamètre donné
  function figureCercleDiam(dTexte) {
    const pts = { O: [160, 85], A: [90, 85], B: [230, 85] };
    return geo({ W: 320, H: 175, pts, cercles: [["O", 70]], segs: [["A", "B"]], caches: [], decal: { O: [0, 16], A: [-10, 4], B: [8, 4] }, aria: `Cercle de diamètre ${dTexte}` }).replace("</svg>", `<text class="g-mesure" x="160" y="76" text-anchor="middle">${dTexte}</text></svg>`);
  }
  // Figure sur quadrillage : ensemble de carreaux coloriés
  function grilleAire(cases, nx, ny) {
    const u = 22, W = nx * u + 16, H = ny * u + 16;
    let s = `<svg class="graph grille-sym" viewBox="0 0 ${W} ${H}" role="img" aria-label="Figure de ${cases.length} carreaux sur quadrillage">`;
    cases.forEach(([x, y]) => { s += `<rect class="g-poly" x="${8 + x * u}" y="${8 + y * u}" width="${u}" height="${u}"/>`; });
    s += `<g class="g-grid">`; for (let i = 0; i <= nx; i++) s += `<line x1="${8 + i * u}" y1="8" x2="${8 + i * u}" y2="${8 + ny * u}"/>`; for (let j = 0; j <= ny; j++) s += `<line x1="8" y1="${8 + j * u}" x2="${8 + nx * u}" y2="${8 + j * u}"/>`;
    return s + `</g></svg>`;
  }
  FIGURES["pa6-rectangle"] = () => figureRectangle(7, 4, "cm");
  FIGURES["pa6-cercle"] = () => figureCercleDiam("6 cm");
  FIGURES["pa6-L"] = () => figureL(8, 6, 3, 2, "m");

  GEN["pa6-conv-long"] = function () {
    let i = rand(0, 6), j = rand(0, 6); while (j === i) j = rand(0, 6);
    const [u1, e1] = UL[i], [u2, e2] = UL[j], x = Math.random() < 0.5 ? Dc(rand(1, 999)) : decimal(99, 2, 1);
    const R = e1 > e2 ? mulD(x, Dc(P10(e1 - e2))) : Dc(x.m, x.d + (e2 - e1));
    return { enonce: `Convertis : $${tD(x)}$ ${u1} $= \\ldots$ ${u2}.`, mode: "nombre", prefixe: "Réponse :", suffixe: u2, attendu: vD(R),
      erreurs: [{ valeur: e1 > e2 ? vD(x) / P10(e1 - e2) : vD(x) * P10(e2 - e1), message: `Mauvais sens : ${e1 > e2 ? "l'unité d'arrivée est plus petite, il en faut plus" : "l'unité d'arrivée est plus grande, il en faut moins"}.` }],
      aides: ["Rappel : km, hm, dam, m, dm, cm, mm ; chaque unité vaut $10$ fois la suivante.", `De ${u1} à ${u2}, il y a $${Math.abs(e1 - e2)}$ rang${Math.abs(e1 - e2) > 1 ? "s" : ""}.`, e1 > e2 ? `On multiplie par $${ecrit(P10(e1 - e2))}$.` : `On divise par $${ecrit(P10(e2 - e1))}$.`],
      solution: `$1$ ${e1 > e2 ? u1 : u2} $= ${ecrit(P10(Math.abs(e1 - e2)))}$ ${e1 > e2 ? u2 : u1}, donc $${tD(x)}$ ${u1} $= ${tD(R)}$ ${u2}.` };
  };

  GEN["pa6-perimetre"] = function () {
    const t = rand(0, 3), u = pick(["cm", "m"]);
    if (t === 0) { const L = decimal(15, 1, 0), l = decimal(Math.floor(vD(L)) || 1, 1, 0); if (vD(l) >= vD(L) || vD(l) === 0) return GEN["pa6-perimetre"]();
      const P = mulD(addD(L, l), Dc(2));
      return { enonce: `Calcule le périmètre de ce rectangle.`, figure: figureRectangle(vD(L), vD(l), u), mode: "nombre", prefixe: "Périmètre :", suffixe: u, attendu: vD(P),
        erreurs: [{ valeur: vD(addD(L, l)), message: "Ça, c'est seulement une longueur et une largeur : il y a deux longueurs et deux largeurs." }, { valeur: vD(mulD(L, l)), message: "Ça, c'est l'aire. Le périmètre est la longueur du contour." }],
        aides: ["Le périmètre est la longueur du **tour** de la figure.", "Un rectangle a deux longueurs et deux largeurs.", "$P = 2 \\times (L + l)$."], solution: `$P = 2 \\times (${tD(L)} + ${tD(l)}) = 2 \\times ${tD(addD(L, l))} = ${tD(P)}$ ${u}.` }; }
    if (t === 1) { const c = decimal(20, 1, 0); if (!vD(c)) return GEN["pa6-perimetre"](); const P = mulD(c, Dc(4));
      return { enonce: `Un carré a des côtés de $${tD(c)}$ ${u}. Quel est son périmètre ?`, mode: "nombre", prefixe: "Périmètre :", suffixe: u, attendu: vD(P),
        erreurs: [{ valeur: vD(mulD(c, c)), message: "Ça, c'est l'aire du carré." }, { valeur: vD(mulD(c, Dc(2))), message: "Un carré a quatre côtés." }],
        aides: ["Un carré a $4$ côtés de même longueur.", "$P = 4 \\times c$.", `Calcule $4 \\times ${tD(c)}$.`], solution: `$P = 4 \\times ${tD(c)} = ${tD(P)}$ ${u}.` }; }
    if (t === 2) { const n = rand(3, 6), cotes = Array.from({ length: n }, () => decimal(9, 1, 0)).map((x) => (vD(x) ? x : Dc(5)));
      const P = cotes.reduce((s, x) => addD(s, x), Dc(0)), nom = ["", "", "", "triangle", "quadrilatère", "pentagone", "hexagone"][n];
      return { enonce: `Un ${nom} a des côtés de ${cotes.map((x) => `$${tD(x)}$`).join(" ; ")} ${u}. Quel est son périmètre ?`, mode: "nombre", prefixe: "Périmètre :", suffixe: u, attendu: vD(P),
        aides: ["Le périmètre est la somme des longueurs de tous les côtés.", "Additionne-les en posant l'addition si besoin.", "Vérifie que tu n'as oublié aucun côté."], solution: `$P = ${cotes.map(tD).join(" + ")} = ${tD(P)}$ ${u}.` }; }
    const a = rand(6, 12), b = rand(4, 8), c = rand(1, a - 2), d = rand(1, b - 2), P = 2 * (a + b);
    return { enonce: "Calcule le périmètre de cette figure (tous les angles sont droits).", figure: figureL(a, b, c, d, "m"), mode: "nombre", prefixe: "Périmètre :", suffixe: "m", attendu: P,
      erreurs: [{ valeur: P - c - d, message: "Il manque des côtés : fais bien le tour complet de la figure." }, { valeur: a * b - c * d, message: "Ça, c'est l'aire. On demande le contour." }],
      aides: ["Fais le tour de la figure et additionne les six côtés.", `Côtés connus : $${a}$, $${b - d}$, $${c}$, $${d}$, $${a - c}$, $${b}$ — le côté de $${d}$ m se lit comme $${b} - ${b - d}$.`, "Astuce : pour une figure en escalier, le périmètre est celui du grand rectangle."],
      solution: `$${a} + ${b - d} + ${c} + ${d} + ${a - c} + ${b} = ${P}$ m (c'est aussi le périmètre du rectangle de $${a}$ m sur $${b}$ m).` };
  };

  GEN["pa6-cercle"] = function () {
    const t = rand(0, 2);
    if (t === 0) { const d = Dc(rand(2, 30)), P = mulD(d, Dc(314, 2));
      return { enonce: `Un cercle a pour diamètre $${tD(d)}$ cm. Calcule son périmètre en prenant $3{,}14$ comme valeur approchée de $\\pi$.`, figure: figureCercleDiam(`${tD(d)} cm`), mode: "nombre", prefixe: "Périmètre ≈", suffixe: "cm", attendu: vD(P),
        erreurs: [{ valeur: vD(mulD(P, Dc(2))), message: "Tu as utilisé le diamètre comme un rayon : $P = \\pi \\times d$, ou $2 \\times \\pi \\times r$." }, { valeur: vD(P) / 2, message: "La formule avec le diamètre est $P = \\pi \\times d$." }],
        aides: ["Le périmètre d'un cercle est proportionnel à son diamètre.", "$P = \\pi \\times d$, avec $\\pi \\approx 3{,}14$.", `Calcule $3{,}14 \\times ${tD(d)}$.`], solution: `$P = \\pi \\times d \\approx 3{,}14 \\times ${tD(d)} = ${tD(P)}$ cm.` }; }
    if (t === 1) { const r = Dc(rand(2, 20)), P = mulD(mulD(r, Dc(2)), Dc(314, 2));
      return { enonce: `Un cercle a pour rayon $${tD(r)}$ cm. Calcule son périmètre en prenant $3{,}14$ pour $\\pi$.`, mode: "nombre", prefixe: "Périmètre ≈", suffixe: "cm", attendu: vD(P),
        erreurs: [{ valeur: vD(mulD(r, Dc(314, 2))), message: "Avec le rayon, il faut d'abord doubler : $d = 2 \\times r$." }],
        aides: [`Le diamètre est le double du rayon : $d = 2 \\times ${tD(r)}$.`, "$P = \\pi \\times d$.", "Prends $\\pi \\approx 3{,}14$."], solution: `$d = 2 \\times ${tD(r)} = ${2 * vD(r)}$ cm, puis $P \\approx 3{,}14 \\times ${2 * vD(r)} = ${tD(P)}$ cm.` }; }
    // rectangle surmonté d'un demi-cercle : périmètre
    const L = rand(4, 12) * 2, l = rand(3, 10), demi = mulD(Dc(L), Dc(157, 2)), P = addD(demi, Dc(L + 2 * l));
    return { enonce: `Une fenêtre a la forme d'un rectangle de $${L}$ dm de large et $${l}$ dm de haut, surmonté d'un demi-cercle de diamètre $${L}$ dm. Calcule le périmètre de la fenêtre, avec $\\pi \\approx 3{,}14$.`, mode: "nombre", prefixe: "Périmètre ≈", suffixe: "dm", attendu: vD(P),
      erreurs: [{ valeur: vD(addD(demi, Dc(2 * L + 2 * l))), message: "Le côté du haut du rectangle est remplacé par le demi-cercle : on ne le compte pas." }],
      aides: ["Le contour est formé de trois côtés du rectangle et d'un demi-cercle.", `Demi-cercle : $(3{,}14 \\times ${L}) \\div 2$.`, `Côtés : $${L} + ${l} + ${l}$.`], solution: `Demi-cercle : $3{,}14 \\times ${L} \\div 2 = ${tD(demi)}$ dm. Côtés : $${L} + ${l} + ${l} = ${L + 2 * l}$ dm. Total : $${tD(P)}$ dm.` };
  };

  GEN["pa6-conv-aire"] = function () {
    let i = rand(0, 2), j = rand(0, 2); while (j === i) j = rand(0, 2);
    const [u1, e1] = UA[i], [u2, e2] = UA[j], x = Math.random() < 0.5 ? Dc(rand(1, 999)) : decimal(99, 2, 1);
    const R = e1 > e2 ? mulD(x, Dc(P10(e1 - e2))) : Dc(x.m, x.d + (e2 - e1));
    const faux = e1 > e2 ? vD(x) * P10((e1 - e2) / 2) : vD(x) / P10((e2 - e1) / 2);
    return { enonce: `Convertis : $${tD(x)}$ ${u1} $= \\ldots$ ${u2}.`, mode: "nombre", prefixe: "Réponse :", suffixe: u2, attendu: vD(R),
      erreurs: [{ valeur: faux, message: "Pour les aires, on passe d'une unité à la suivante en multipliant par $100$, pas par $10$." }],
      aides: ["$1$ m² $= 100$ dm² et $1$ dm² $= 100$ cm².", `De ${u1} à ${u2} : ${e1 > e2 ? "unité plus petite, on multiplie" : "unité plus grande, on divise"}.`, e1 > e2 ? `On multiplie par $${ecrit(P10(e1 - e2))}$.` : `On divise par $${ecrit(P10(e2 - e1))}$.`],
      solution: `$1$ ${e1 > e2 ? u1 : u2} $= ${ecrit(P10(Math.abs(e1 - e2)))}$ ${e1 > e2 ? u2 : u1}, donc $${tD(x)}$ ${u1} $= ${tD(R)}$ ${u2}.` };
  };

  GEN["pa6-aire"] = function () {
    const t = rand(0, 3), u = pick(["cm", "m"]);
    if (t === 0) { const L = decimal(15, 1, 0), l = decimal(Math.max(1, Math.floor(vD(L))), 1, 0); if (vD(l) >= vD(L) || vD(l) === 0) return GEN["pa6-aire"]();
      const A = mulD(L, l);
      return { enonce: "Calcule l'aire de ce rectangle.", figure: figureRectangle(vD(L), vD(l), u), mode: "nombre", prefixe: "Aire :", suffixe: `${u}²`, attendu: vD(A),
        erreurs: [{ valeur: vD(mulD(addD(L, l), Dc(2))), message: "Ça, c'est le périmètre. L'aire est la surface : longueur $\\times$ largeur." }],
        aides: ["L'aire d'un rectangle est longueur $\\times$ largeur.", `$\\mathscr{A} = ${tD(L)} \\times ${tD(l)}$.`, `L'unité est le ${u}² (${u === "cm" ? "centimètre" : "mètre"} carré).`], solution: `$\\mathscr{A} = ${tD(L)} \\times ${tD(l)} = ${tD(A)}$ ${u}².` }; }
    if (t === 1) { const c = Dc(rand(2, 15)), A = mulD(c, c);
      return { enonce: `Un carré a des côtés de $${tD(c)}$ ${u}. Quelle est son aire ?`, mode: "nombre", prefixe: "Aire :", suffixe: `${u}²`, attendu: vD(A),
        erreurs: [{ valeur: 4 * vD(c), message: "Ça, c'est le périmètre. L'aire est côté $\\times$ côté." }, { valeur: 2 * vD(c), message: "L'aire est côté $\\times$ côté, pas côté $\\times 2$." }],
        aides: ["L'aire d'un carré est côté $\\times$ côté.", `$\\mathscr{A} = ${tD(c)} \\times ${tD(c)}$.`, `L'unité est le ${u}².`], solution: `$\\mathscr{A} = ${tD(c)} \\times ${tD(c)} = ${tD(A)}$ ${u}².` }; }
    if (t === 2) { // quadrillage
      const nx = 12, ny = 7, cases = [], x0 = rand(0, 3), y0 = rand(0, 1), w = rand(3, 6), h = rand(2, 4);
      for (let i = 0; i < w; i++) for (let j = 0; j < h; j++) cases.push([x0 + i, y0 + j]);
      const ext = rand(1, 3); for (let i = 0; i < ext; i++) cases.push([x0 + i, y0 + h]);
      const ext2 = rand(0, 2); for (let j = 0; j < ext2; j++) cases.push([x0 + w, y0 + j]);
      if (y0 + h >= ny || x0 + w >= nx) return GEN["pa6-aire"]();
      return { enonce: "Chaque carreau du quadrillage a une aire de $1$ cm². Quelle est l'aire de la figure coloriée ?", figure: grilleAire(cases, nx, ny), mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: cases.length,
        aides: ["Compte les carreaux coloriés.", `Tu peux découper la figure en rectangles : par exemple un rectangle de $${w} \\times ${h}$ carreaux.`, "Ajoute les carreaux qui restent."],
        solution: `Rectangle de $${w} \\times ${h} = ${w * h}$ carreaux, plus $${ext + ext2}$ carreau${ext + ext2 > 1 ? "x" : ""} : $${cases.length}$ cm².` }; }
    const a = rand(6, 12), b = rand(4, 8), c = rand(1, a - 2), d = rand(1, b - 2), A = a * b - c * d;
    return { enonce: "Calcule l'aire de cette figure (tous les angles sont droits).", figure: figureL(a, b, c, d, "m"), mode: "nombre", prefixe: "Aire :", suffixe: "m²", attendu: A,
      erreurs: [{ valeur: a * b, message: "C'est l'aire du grand rectangle : il faut retirer le coin qui manque." }, { valeur: 2 * (a + b), message: "Ça, c'est le périmètre." }],
      aides: ["Imagine le grand rectangle complet, puis retire le coin qui manque.", `Grand rectangle : $${a} \\times ${b}$.`, `Coin retiré : $${c} \\times ${d}$.`],
      solution: `$${a} \\times ${b} - ${c} \\times ${d} = ${a * b} - ${c * d} = ${A}$ m².` };
  };

  GEN["pa6-probleme"] = function () {
    const t = rand(0, 2), L = rand(5, 25), l = rand(3, L - 1);
    if (t === 0) return { enonce: `Un jardin rectangulaire mesure $${L}$ m sur $${l}$ m. Quelle longueur de grillage faut-il pour l'entourer ?`, mode: "nombre", prefixe: "Grillage :", suffixe: "m", attendu: 2 * (L + l),
      erreurs: [{ valeur: L * l, message: "Entourer, c'est faire le tour : c'est un périmètre, pas une aire." }],
      aides: ["Entourer le jardin : on cherche la longueur du tour.", "C'est le périmètre du rectangle.", `$2 \\times (${L} + ${l})$.`], solution: `Périmètre : $2 \\times (${L} + ${l}) = ${2 * (L + l)}$ m de grillage.` };
    if (t === 1) return { enonce: `Une terrasse rectangulaire mesure $${L}$ m sur $${l}$ m. Combien de m² de carrelage faut-il pour la recouvrir ?`, mode: "nombre", prefixe: "Carrelage :", suffixe: "m²", attendu: L * l,
      erreurs: [{ valeur: 2 * (L + l), message: "Recouvrir une surface, c'est une aire, pas un périmètre." }],
      aides: ["Recouvrir la terrasse : on cherche une surface.", "C'est l'aire du rectangle.", `$${L} \\times ${l}$.`], solution: `Aire : $${L} \\times ${l} = ${L * l}$ m² de carrelage.` };
    const c = rand(3, 12), d = rand(2, 9);
    const pc = c * c, pd = 4 * c;
    const choix = [`Même périmètre, mais pas la même aire`, `Même aire, mais pas le même périmètre`, `Même périmètre et même aire`, `Ni le même périmètre, ni la même aire`];
    // rectangle (c+d) × (c−d) comparé au carré c × c
    if (d >= c) return GEN["pa6-probleme"]();
    const rep = 0, cc = melange(choix[rep], choix.filter((_, k) => k !== rep));
    return { enonce: `On compare un carré de côté $${c}$ cm et un rectangle de $${c + d}$ cm sur $${c - d}$ cm. Que peut-on dire ?`, mode: "choix", choix: cc.choix, attendu: cc.attendu,
      aides: ["Calcule le périmètre et l'aire de chaque figure.", `Carré : $P = 4 \\times ${c}$ et $\\mathscr{A} = ${c} \\times ${c}$.`, `Rectangle : $P = 2 \\times (${c + d} + ${c - d})$ et $\\mathscr{A} = ${c + d} \\times ${c - d}$.`],
      solution: `Carré : $P = ${pd}$ cm et $\\mathscr{A} = ${pc}$ cm². Rectangle : $P = ${2 * (2 * c)}$ cm et $\\mathscr{A} = ${(c + d) * (c - d)}$ cm². Même périmètre, mais l'aire du rectangle est plus petite : périmètre et aire ne varient pas ensemble.` };
  };

  /* =====================================================================
     6e, chapitre 14 : solides, vision dans l'espace et volumes (préfixe so6-)
     Programme : reconnaître pyramides, boules, cubes, cylindres, pavés, cônes, prismes droits (automatisme) ;
     voir dans l'espace des assemblages de cubes (passer du 3D aux vues 2D, dénombrer) ;
     unité cm³, comparer et déterminer des volumes.
     ===================================================================== */
  // Assemblage de cubes en perspective : h[i][j] = nombre de cubes empilés sur la case (i, j), i vers la droite, j vers l'avant
  function assemblage(h) {
    const a = 22, cx = Math.cos(Math.PI / 6) * a, sy = Math.sin(Math.PI / 6) * a, n = h.length, m = h[0].length;
    const hmax = Math.max(...h.flat());
    const W = 320, H = Math.round((n + m) * sy + hmax * a + 30), ox = 160 + ((m - n) * cx) / 2, oy = 14 + hmax * a;
    const P = (i, j, k) => [+(ox + (i - j) * cx).toFixed(1), +(oy + (i + j) * sy - k * a).toFixed(1)];
    let s = `<svg class="graph cubes" viewBox="0 0 ${W} ${H}" role="img" aria-label="Assemblage de cubes en perspective">`;
    const cases = []; for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) for (let k = 0; k < h[i][j]; k++) cases.push([i, j, k]);
    cases.sort((p, q) => (p[0] + p[1]) - (q[0] + q[1]) || p[2] - q[2] || p[0] - q[0]);
    const poly = (pts, c) => `<polygon class="${c}" points="${pts.map((p) => p.join(",")).join(" ")}"/>`;
    cases.forEach(([i, j, k]) => {
      s += poly([P(i, j, k + 1), P(i + 1, j, k + 1), P(i + 1, j + 1, k + 1), P(i, j + 1, k + 1)], "g-cube-haut");
      s += poly([P(i, j + 1, k), P(i + 1, j + 1, k), P(i + 1, j + 1, k + 1), P(i, j + 1, k + 1)], "g-cube-g");
      s += poly([P(i + 1, j, k), P(i + 1, j + 1, k), P(i + 1, j + 1, k + 1), P(i + 1, j, k + 1)], "g-cube-d");
    });
    return s + `</svg>`;
  }
  // Solides usuels dessinés simplement (traits cachés en pointillés)
  function dessinSolide(nom) {
    const W = 320, H = 170, L = (x1, y1, x2, y2, cache) => `<line class="${cache ? "g-cache" : "g-segment"}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
    const E = (cx, cy, rx, ry, moitie) => moitie === "haut" ? `<path class="g-cache-arc" d="M${cx - rx} ${cy} A${rx} ${ry} 0 0 1 ${cx + rx} ${cy}"/>` : moitie === "bas" ? `<path class="g-arc-plein" d="M${cx - rx} ${cy} A${rx} ${ry} 0 0 0 ${cx + rx} ${cy}"/>` : `<ellipse class="g-arc-plein" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>`;
    let s = `<svg class="graph geo" viewBox="0 0 ${W} ${H}" role="img" aria-label="Solide : ${nom}">`;
    if (nom === "un cube" || nom === "un pavé droit") {
      const w = nom === "un cube" ? 90 : 140, h = 90, dx = 40, dy = 30, x = 80, y = 55;
      s += L(x, y, x + w, y) + L(x, y + h, x + w, y + h) + L(x, y, x, y + h) + L(x + w, y, x + w, y + h) + L(x + dx, y - dy, x + w + dx, y - dy) + L(x, y, x + dx, y - dy) + L(x + w, y, x + w + dx, y - dy) + L(x + w + dx, y - dy, x + w + dx, y + h - dy) + L(x + w, y + h, x + w + dx, y + h - dy);
      s += L(x + dx, y - dy, x + dx, y + h - dy, true) + L(x + dx, y + h - dy, x + w + dx, y + h - dy, true) + L(x, y + h, x + dx, y + h - dy, true);
    } else if (nom === "un cylindre") s += E(160, 35, 60, 16) + E(160, 140, 60, 16, "bas") + E(160, 140, 60, 16, "haut") + L(100, 35, 100, 140) + L(220, 35, 220, 140);
    else if (nom === "un cône") s += E(160, 135, 70, 18, "bas") + E(160, 135, 70, 18, "haut") + L(90, 135, 160, 15) + L(230, 135, 160, 15);
    else if (nom === "une boule") s += `<circle class="g-arc-plein" cx="160" cy="85" r="70"/>` + E(160, 85, 70, 18, "bas") + E(160, 85, 70, 18, "haut");
    else if (nom === "une pyramide à base carrée") { const A = [90, 140], B = [200, 140], C = [240, 110], D = [130, 110], S = [165, 15]; s += L(...A, ...B) + L(...B, ...C) + L(...A, ...S) + L(...B, ...S) + L(...C, ...S) + L(...D, ...S, true) + L(...A, ...D, true) + L(...D, ...C, true); }
    else if (nom === "un prisme droit à base triangulaire") { const A = [80, 140], B = [170, 140], C = [125, 70], dx = 70, dy = -25; s += L(...A, ...B) + L(...B, ...C) + L(...C, ...A) + L(B[0], B[1], B[0] + dx, B[1] + dy) + L(C[0], C[1], C[0] + dx, C[1] + dy) + L(C[0] + dx, C[1] + dy, B[0] + dx, B[1] + dy) + L(A[0], A[1], A[0] + dx, A[1] + dy, true) + L(A[0] + dx, A[1] + dy, B[0] + dx, B[1] + dy, true) + L(A[0] + dx, A[1] + dy, C[0] + dx, C[1] + dy, true); }
    return s + `</svg>`;
  }
  const SOLIDES = ["un cube", "un pavé droit", "un cylindre", "un cône", "une boule", "une pyramide à base carrée", "un prisme droit à base triangulaire"];
  FIGURES["so6-assemblage"] = () => assemblage([[2, 1, 1], [1, 1, 0]]);
  FIGURES["so6-pave"] = () => dessinSolide("un pavé droit");

  GEN["so6-reconnaitre"] = function () {
    const nom = pick(SOLIDES), t = Math.random() < 0.65;
    const maj = (x) => x[0].toUpperCase() + x.slice(1);
    const c = melange(maj(nom), shuffle(SOLIDES.filter((x) => x !== nom)).slice(0, 3).map(maj));
    const desc = { "un cube": "Il a $6$ faces, toutes des carrés identiques.", "un pavé droit": "Il a $6$ faces rectangulaires ; les faces opposées sont identiques.", "un cylindre": "Il a deux bases qui sont des disques identiques et parallèles, reliées par une face courbe.", "un cône": "Il a une base en forme de disque et une face courbe qui se termine en pointe.", "une boule": "Tous ses points de surface sont à la même distance de son centre ; il roule dans toutes les directions.", "une pyramide à base carrée": "Il a une base carrée et quatre faces triangulaires qui se rejoignent en un sommet.", "un prisme droit à base triangulaire": "Il a deux bases triangulaires identiques et parallèles, et trois faces rectangulaires." }[nom];
    return { enonce: t ? "Quel est ce solide ?" : `Quel solide est décrit ? « ${desc} »`, figure: t ? dessinSolide(nom) : undefined, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Regarde la forme des faces : carrés, rectangles, triangles, disques ?", "Une face courbe ? Une pointe ?", "Les pointillés montrent les arêtes cachées."], solution: `C'est ${nom} : ${desc[0].toLowerCase() + desc.slice(1)}` };
  };

  const POLY = { 3: "triangle", 4: "quadrilatère", 5: "pentagone", 6: "hexagone", 7: "heptagone", 8: "octogone" };
  GEN["so6-elements"] = function () {
    let nom, F, S, A, expl;
    if (Math.random() < 0.5) { [nom, F, S, A] = pick([["un cube", 6, 8, 12], ["un pavé droit", 6, 8, 12], ["une pyramide à base carrée", 5, 5, 8], ["un prisme droit à base triangulaire", 5, 6, 9]]); expl = ""; }
    else { const n = rand(3, 8), prisme = Math.random() < 0.5;
      nom = prisme ? `un prisme droit dont les bases sont des ${POLY[n]}s` : `une pyramide dont la base est un ${POLY[n]}`;
      [F, S, A] = prisme ? [n + 2, 2 * n, 3 * n] : [n + 1, n + 1, 2 * n];
      expl = prisme ? ` Chaque base a $${n}$ côtés : $2$ bases et $${n}$ faces latérales, $${n}$ sommets par base, $${n}$ arêtes par base et $${n}$ arêtes latérales.` : ` La base a $${n}$ côtés : $1$ base et $${n}$ faces triangulaires, $${n}$ sommets de base et le sommet, $${n}$ arêtes de base et $${n}$ arêtes qui montent au sommet.`; }
    const [mot, rep] = pick([["faces", F], ["sommets", S], ["arêtes", A]]);
    const fig = SOLIDES.includes(nom) ? dessinSolide(nom) : undefined;
    return { enonce: `Combien de ${mot} a ${nom} ?`, figure: fig, mode: "nombre", prefixe: `Nombre de ${mot} :`, attendu: rep,
      aides: ["Une **face** est une surface plane ; une **arête** est un segment où deux faces se rejoignent ; un **sommet** est un point où des arêtes se rejoignent.", "N'oublie pas les éléments cachés.", "Compte méthodiquement : la ou les bases d'abord, puis les côtés."],
      solution: `${nom[0].toUpperCase() + nom.slice(1)} a $${F}$ faces, $${S}$ sommets et $${A}$ arêtes : la réponse est $${rep}$.${expl}` };
  };

  function hasardAssemblage() {
    const n = rand(2, 3), m = rand(2, 3), h = Array.from({ length: n }, () => Array.from({ length: m }, () => rand(0, 3)));
    if (h.flat().filter((x) => x > 0).length < 3) return hasardAssemblage();
    return h;
  }
  GEN["so6-compter"] = function () {
    const h = hasardAssemblage(), N = h.flat().reduce((s, x) => s + x, 0), cm = Math.random() < 0.4;
    return { enonce: `Combien de petits cubes forment cet assemblage ? (Tous les cubes sont posés sur d'autres cubes ou sur le sol : il n'y a pas de cube en l'air.)${cm ? " Chaque cube a un volume de $1$ cm³ : donne le volume de l'assemblage." : ""}`, figure: assemblage(h), mode: "nombre", prefixe: cm ? "Volume :" : "Nombre de cubes :", suffixe: cm ? "cm³" : "cubes", attendu: N,
      aides: ["Compte colonne par colonne : combien de cubes empilés à chaque endroit ?", "Une colonne de hauteur $3$ compte $3$ cubes, même si on ne voit que celui du dessus.", "Additionne les hauteurs de toutes les colonnes."],
      solution: `Hauteurs des colonnes : ${h.flat().filter((x) => x > 0).map((x) => `$${x}$`).join(" ; ")}. Total : $${N}$ cubes${cm ? `, soit un volume de $${N}$ cm³` : ""}.` };
  };

  GEN["so6-vues"] = function () {
    const h = hasardAssemblage(), n = h.length, m = h[0].length, t = rand(0, 2);
    const dessus = h.flat().filter((x) => x > 0).length;
    const droite = Array.from({ length: m }, (_, j) => Math.max(...h.map((l) => l[j]))).reduce((s, x) => s + x, 0);
    const gauche = h.map((l) => Math.max(...l)).reduce((s, x) => s + x, 0);
    const [quoi, rep, expl] = [["de dessus", dessus, "on voit un carré pour chaque colonne de cubes, quelle que soit sa hauteur"], ["bien en face de la face foncée (à droite)", droite, "pour chaque rangée vue de ce côté, seule la colonne la plus haute compte"], ["bien en face de la face claire (à gauche)", gauche, "pour chaque rangée vue de ce côté, seule la colonne la plus haute compte"]][t];
    return { enonce: `On regarde cet assemblage ${quoi}. Combien de carrés voit-on ? (Aucun cube n'est en l'air.)`, figure: assemblage(h), mode: "nombre", prefixe: "Nombre de carrés :", attendu: rep,
      erreurs: [{ valeur: h.flat().reduce((s, x) => s + x, 0), message: "Ça, c'est le nombre total de cubes : depuis un seul côté, on ne voit pas les cubes cachés." }],
      aides: ["Imagine-toi à la place de l'observateur : les cubes cachés derrière (ou dessous) ne se voient pas.", t === 0 ? "De dessus, chaque colonne de cubes se voit comme un seul carré." : "De côté, chaque rangée se voit comme une colonne de carrés : sa hauteur est celle de la colonne la plus haute de la rangée.", "Compte les carrés de la vue obtenue."],
      solution: `${quoi[0].toUpperCase() + quoi.slice(1)}, ${expl} : on voit $${rep}$ carrés.` };
  };

  GEN["so6-volume"] = function () {
    const t = rand(0, 1);
    if (t === 0) { const L = rand(2, 8), l = rand(2, 6), c = rand(1, 5);
      return { enonce: `Un pavé est construit avec des cubes de $1$ cm³ : $${L}$ cubes en longueur, $${l}$ en largeur et $${c}$ couche${c > 1 ? "s" : ""}. Quel est son volume ?`, mode: "nombre", prefixe: "Volume :", suffixe: "cm³", attendu: L * l * c,
        erreurs: [{ valeur: L + l + c, message: "On n'additionne pas : chaque couche contient plusieurs rangées de cubes." }, { valeur: L * l, message: `C'est une seule couche. Il y en a $${c}$.` }],
        aides: [`Une couche contient $${L}$ rangées de $${l}$ cubes.`, `Une couche : $${L} \\times ${l} = ${L * l}$ cubes.`, `Il y a $${c}$ couche${c > 1 ? "s" : ""}.`], solution: `Une couche : $${L} \\times ${l} = ${L * l}$ cubes ; $${c}$ couche${c > 1 ? "s" : ""} : $${L * l} \\times ${c} = ${L * l * c}$ cubes, soit $${L * l * c}$ cm³.` }; }
    const h1 = hasardAssemblage(), h2 = hasardAssemblage(), n1 = h1.flat().reduce((s, x) => s + x, 0), n2 = h2.flat().reduce((s, x) => s + x, 0);
    const choix = ["Le solide A a le plus grand volume", "Le solide B a le plus grand volume", "Ils ont le même volume"], rep = n1 === n2 ? 2 : n1 > n2 ? 0 : 1;
    return { enonce: "Les deux assemblages sont faits de cubes identiques (aucun cube en l'air). Lequel a le plus grand volume ? Solide A : le premier ; solide B : le second.", figure: assemblage(h1).replace("</svg>", `<text class="g-plabel" x="10" y="16">A</text></svg>`) + assemblage(h2).replace("</svg>", `<text class="g-plabel" x="10" y="16">B</text></svg>`), mode: "choix", choix, attendu: rep,
      aides: ["Le volume se mesure en nombre de cubes.", "Compte les cubes de chaque assemblage, colonne par colonne.", "Compare les deux nombres."],
      solution: `A : $${n1}$ cubes ; B : $${n2}$ cubes. ${choix[rep]}.` };
  };

  /* Une « erreur connue » ne doit jamais coïncider avec la bonne réponse ; propriétés internes retirées */
  Object.keys(GEN).filter((k) => /^(n6|o6|d6|f6|p6|t6|a6|g6|c6|an6|tg6|sx6|pa6|so6)-/.test(k)).forEach((k) => {
    const g = GEN[k];
    GEN[k] = (i) => {
      const q = g(i);
      if (q.erreurs) q.erreurs = q.erreurs.filter((e) => Math.abs(e.valeur - q.attendu) >= (q.tolerance || 1e-9));
      return q;
    };
  });

  window.PM_EXO.college = { enLettres, ecrit, demiDroite };
})();
