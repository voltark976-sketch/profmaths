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

  /* Une « erreur connue » ne doit jamais coïncider avec la bonne réponse ; propriétés internes retirées */
  Object.keys(GEN).filter((k) => /^(n6|o6|d6|f6|p6|t6)-/.test(k)).forEach((k) => {
    const g = GEN[k];
    GEN[k] = (i) => {
      const q = g(i);
      if (q.erreurs) q.erreurs = q.erreurs.filter((e) => Math.abs(e.valeur - q.attendu) >= (q.tolerance || 1e-9));
      return q;
    };
  });

  window.PM_EXO.college = { enLettres, ecrit, demiDroite };
})();
