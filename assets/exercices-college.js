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

  /* Une « erreur connue » ne doit jamais coïncider avec la bonne réponse ; propriétés internes retirées */
  Object.keys(GEN).filter((k) => /^n6-/.test(k)).forEach((k) => {
    const g = GEN[k];
    GEN[k] = (i) => {
      const q = g(i);
      if (q.erreurs) q.erreurs = q.erreurs.filter((e) => Math.abs(e.valeur - q.attendu) >= (q.tolerance || 1e-9));
      return q;
    };
  });

  window.PM_EXO.college = { enLettres, ecrit, demiDroite };
})();
