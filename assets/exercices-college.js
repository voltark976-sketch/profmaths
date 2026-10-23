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
  // (le signe est traité à part : −0,5 s'écrit bien « -0{,}5 »)
  const nb = (x) => { if (+x < 0 && +(+x).toFixed(6) !== 0) return "-" + nb(-x); const s = Math.abs(+x).toFixed(6).replace(/0+$/, "").replace(/\.$/, ""); const [e, f] = s.split("."); return ecrit(+(e + (f || "")), (f || "").length); };
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

  /* ---------- Tableau de numération ----------
     L = [{ m, d }] (valeur m / 10^d), une ligne par nombre ; o.kmax / o.dmax : rangs extrêmes (sinon calculés) ;
     o.hl : rangs à colorier ; o.zeros : zéros inutiles ajoutés en couleur à droite ; L vide : tableau à remplir */
  function tableNum(L, o = {}) {
    const ent = (x) => Math.floor(x.m / P10(x.d)), k0 = o.kmax !== undefined ? o.kmax : Math.max(0, ...L.map((x) => String(ent(x)).length - 1)), kmax = 3 * Math.ceil((k0 + 1) / 3) - 1; // classes complètes
    const dmax = o.dmax !== undefined ? o.dmax : Math.max(0, ...L.map((x) => x.d)), n = kmax + dmax + 1, cw = Math.min(30, 304 / n), x0 = (320 - n * cw) / 2;
    const X = (k) => +(x0 + (kmax - k) * cw).toFixed(1), H = 40 + Math.max(1, L.length) * 26 + 4, f = (v) => +v.toFixed(1);
    const CL = ["unités", "mille", "millions", "milliards"], RG = ["u", "d", "c"], DC = ["dix.", "cent.", "mill."];
    let s = `<svg class="graph numeration" viewBox="0 0 320 ${H}" role="img" aria-label="Tableau de numération${L.length ? " : " + L.map((x) => nbTexte(x.m / P10(x.d))).join(" ; ") : ""}">`;
    (o.hl || []).forEach((k) => { s += `<rect class="g-aire g-colorie" x="${X(k)}" y="20" width="${f(cw)}" height="${H - 24}"/>`; });
    s += `<g style="stroke:var(--doux);stroke-width:1;fill:none"><rect x="${f(x0)}" y="4" width="${f(n * cw)}" height="${H - 8}"/><line x1="${f(x0)}" y1="20" x2="${f(x0 + n * cw)}" y2="20"/><line x1="${f(x0)}" y1="38" x2="${f(x0 + n * cw)}" y2="38"/>`;
    for (let k = kmax - 1; k >= -dmax; k--) s += `<line x1="${X(k)}" y1="${k % 3 === 2 || k === -1 ? 4 : 20}" x2="${X(k)}" y2="${H - 4}"${k === -1 ? ' style="stroke:var(--encre);stroke-width:2"' : ""}/>`;
    s += `</g><g class="g-tick">`;
    for (let c = 0; c <= Math.floor(kmax / 3); c++) { const a = Math.min(kmax, 3 * c + 2), b = 3 * c; s += `<text x="${f((X(a) + X(b) + cw) / 2)}" y="16" text-anchor="middle">${CL[c]}</text>`; }
    if (dmax) s += `<text x="${f((X(-1) + X(-dmax) + cw) / 2)}" y="16" text-anchor="middle">${dmax * cw >= 76 ? "partie décimale" : dmax * cw >= 44 ? "décimales" : "déc."}</text>`;
    for (let k = kmax; k >= -dmax; k--) s += `<text x="${f(X(k) + cw / 2)}" y="33" text-anchor="middle">${k >= 0 ? RG[k % 3] : DC[-k - 1] || ""}</text>`;
    s += `</g>`;
    L.forEach((x, i) => {
      const y = 58 + i * 26, top = String(ent(x)).length - 1;
      for (let k = top; k >= -dmax; k--) {
        const z = k < -x.d, ch = z ? 0 : Math.floor(x.m / P10(x.d + k)) % 10;
        if (z && !o.zeros) continue;
        s += `<text class="${z ? "g-mesure" : "g-clabel"}" x="${f(X(k) + cw / 2)}" y="${y}" text-anchor="middle">${ch}</text>`;
      }
      if (x.d || (o.zeros && dmax)) s += `<text class="g-clabel" x="${X(-1)}" y="${y + 3}" text-anchor="middle">,</text>`;
    });
    return s + `</svg>`;
  }
  FIGURES["n6-cours-tableau"] = () => tableNum([{ m: 3205040017, d: 0 }], { hl: [4, 8] });
  FIGURES["n6-cours-combien"] = () => tableNum([{ m: 7524, d: 0 }], { hl: [1, 2, 3] });
  FIGURES["n6-cours-tableau-dec"] = () => tableNum([{ m: 4187674, d: 2 }], { hl: [-1] });
  FIGURES["n6-cours-fraction"] = () => tableNum([{ m: 4107, d: 3 }]);
  FIGURES["n6-cours-x10"] = () => tableNum([{ m: 347, d: 2 }, { m: 347, d: 0 }]);
  FIGURES["n6-cours-comparer"] = () => tableNum([{ m: 832, d: 2 }, { m: 84, d: 1 }], { zeros: true });
  FIGURES["n6-methode-grand"] = () => tableNum([{ m: 3040017, d: 0 }], { kmax: 8 });
  FIGURES["n6-methode-combien"] = () => tableNum([{ m: 7524, d: 0 }], { hl: [2, 3] });
  FIGURES["n6-methode-fraction"] = () => tableNum([{ m: 7, d: 2 }, { m: 1234, d: 1 }, { m: 508, d: 2 }]);
  FIGURES["n6-methode-x10"] = () => tableNum([{ m: 52, d: 2 }, { m: 520, d: 0 }]);
  FIGURES["n6-methode-comparer"] = () => tableNum([{ m: 25, d: 1 }, { m: 245, d: 2 }], { zeros: true });
  FIGURES["n6-qcm-tableau"] = () => tableNum([{ m: 6052814, d: 0 }]);
  FIGURES["n6-qcm-tableau-dec"] = () => tableNum([{ m: 30405, d: 3 }]);
  FIGURES["n6-qcm-arrondi"] = () => demiDroite({ a: [72, 1], pas: [1, 2], n: 10, lab: [0, 10], moyens: [5], points: [{ i: 6, label: "7,26" }], aria: "Zoom entre 7,2 et 7,3 : le point 7,26" });

  /* ---------- Étape 1 : nombres entiers ---------- */
  GEN["n6-rang"] = function () {
    const N = entier(rand(4, 10)), L = String(N).length;
    if (Math.random() < 0.55) {
      const k = rand(0, L - 1), rep = chiffre(N, 0, k);
      const voisins = [k - 1, k + 1].filter((j) => j >= 0 && j < L);
      return {
        enonce: `Quel est le chiffre des **${rangNom(k)}** dans le nombre $${ecrit(N)}$ ? Aide-toi du tableau.`,
        figure: tableNum([{ m: N, d: 0 }]), figureSolution: tableNum([{ m: N, d: 0 }], { hl: [k] }),
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
      const paires = []; for (let a = 0; a < 6; a++) for (let b = a + 1; b < 7; b++) paires.push([a, b]);
      const [i, j] = pick(paires), A = UNITES_NUM[i], B = UNITES_NUM[j], k = Math.random() < 0.3 ? 1 : rand(2, 9);
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
      enonce: `Combien y a-t-il ${/^u/.test(U[2]) ? "d'" : "de "}**${U[2]}** dans $${ecrit(m, d)}$ ?`,
      figure: tableNum([{ m, d }]), figureSolution: tableNum([{ m, d }], { hl: Array.from({ length: String(Math.floor(m / P10(d))).length - k }, (_, j) => k + j) }),
      mode: "nombre", prefixe: "Il y en a", attendu: rep,
      erreurs: [{ valeur: ch, message: `Ça, c'est le **chiffre** des ${U[2]}. On demande le **nombre** ${deN(U[2])} : prends tout ce qui est à gauche, chiffre des ${U[2]} compris.` }],
      aides: [
        `Le chiffre des ${U[2]} est $${ch}$, mais on ne demande pas le chiffre : on demande **combien** ${deN(U[2])} il y a en tout.`,
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
        enonce: `Écris en chiffres : « ${enLettres(N)} ». Tu peux t'aider du tableau.`,
        figure: tableNum([], { kmax: 9 }), figureSolution: tableNum([{ m: N, d: 0 }], { kmax: 9 }),
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
      figure: tableNum([], { kmax: 8 }), figureSolution: tableNum([{ m: N, d: 0 }], { kmax: 8 }),
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
    if (m % 10 === 0) return GEN["n6-rang-dec"](); // pas de zéro inutile à la fin
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
        figure: tableNum([{ m, d }]), figureSolution: tableNum([{ m, d }], { hl: [k] }),
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
        enonce, figure: tableNum([], { kmax: 1, dmax: 3 }), figureSolution: tableNum([{ m, d: 3 }], { kmax: 1, dmax: 3 }),
        mode: "nombre", prefixe: "Le nombre est", attendu: rep,
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
      figure: tableNum([{ m, d }], { kmax: Math.max(String(Math.floor(m / P10(d))).length - 1, String(Math.floor(rep)).length - 1), dmax: Math.max(d, d - O.k, 0) }),
      figureSolution: tableNum([{ m, d }, { m, d: d - O.k }].map((x) => (x.d < 0 ? { m: x.m * P10(-x.d), d: 0 } : x))),
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
      figure: tableNum([{ m: a[0], d: a[1] }, { m: b[0], d: b[1] }]), figureSolution: tableNum([{ m: a[0], d: a[1] }, { m: b[0], d: b[1] }], { zeros: true }),
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
  // Opération posée en colonnes : nums (textes « 36,3 »), op (+, −, ×), res (texte ou « ? »).
  // Par défaut virgule sous virgule (o.zeros : zéros inutiles ajoutés en couleur) ; o.droite : calé à droite (multiplication).
  function posee(nums, op, res, o = {}) {
    const L = [...nums, res].map((t) => t.replace(/\s/g, "")), dec = (t) => (t.includes(",") ? t.split(",")[1].length : 0);
    const D = Math.max(...L.filter((t) => t !== "?").map(dec)), cw = 16, xr = 214, hl = 28, H = L.length * hl + 18;
    const cols = (t) => t.replace(",", "").length + (o.droite ? 0 : D - dec(t));
    const C = Math.max(...L.filter((t) => t !== "?").map(cols)) + 1, xs = xr - cw * (C + 0.6);
    let s = `<svg class="graph posee" viewBox="0 0 320 ${H}" role="img" aria-label="Opération posée : ${nums.join(` ${op} `)} = ${res}">`;
    L.forEach((t, i) => {
      const y = 26 + i * hl + (i === L.length - 1 ? 8 : 0);
      if (t === "?") { s += `<text class="g-mesure" x="${xr - cw * 1.5}" y="${y}" text-anchor="middle">?</text>`; return; }
      const d = dec(t), sh = o.droite ? 0 : D - d, g = t.replace(",", "").split("").reverse();
      g.forEach((c, k) => { s += `<text class="g-clabel" x="${xr - cw * (k + sh + 0.5)}" y="${y}" text-anchor="middle">${c}</text>`; });
      if (d) s += `<text class="g-clabel" x="${xr - cw * (sh + d)}" y="${y + 2}" text-anchor="middle">,</text>`;
      if (o.zeros && sh) for (let k = 0; k < sh; k++) s += `<text class="g-mesure" x="${xr - cw * (k + 0.5)}" y="${y}" text-anchor="middle">0</text>`;
      if (o.zeros && sh && !d) s += `<text class="g-mesure" x="${xr - cw * sh}" y="${y + 2}" text-anchor="middle">,</text>`;
      if (i === L.length - 2) s += `<text class="g-clabel" x="${xs}" y="${y}" text-anchor="middle">${op}</text><line x1="${xs - 10}" y1="${y + 9}" x2="${xr + 6}" y2="${y + 9}" style="stroke:var(--encre);stroke-width:1.6"/>`;
    });
    return s + `</svg>`;
  }
  const brut = (x) => { const s = String(x.m).padStart(x.d + 1, "0"); return x.d ? `${s.slice(0, -x.d)},${s.slice(-x.d)}` : s; }; // décimal {m, d} en texte, zéros gardés
  FIGURES["o6-cours-addition"] = () => posee(["36,3", "43,96"], "+", "80,26", { zeros: true });
  FIGURES["o6-cours-produit"] = () => posee(["844,7", "3,68"], "×", "3108,496", { droite: true });
  // Ticket de caisse : lignes [[libellé, prix]] ; les k dernières lignes (total, payé…) sous un trait pointillé
  function ticket(lignes, k = 1, titre = "Marché de Mamoudzou") {
    const H = 52 + lignes.length * 24 + 8, n = lignes.length;
    let s = `<svg class="graph ticket" viewBox="0 0 320 ${H}" role="img" aria-label="Ticket de caisse : ${lignes.map((l) => l.join(" ")).join(", ")}">`;
    s += `<rect x="50" y="4" width="220" height="${H - 8}" rx="4" style="fill:var(--surface);stroke:var(--doux);stroke-width:1.2"/><text class="g-plabel" x="160" y="28" text-anchor="middle">${titre}</text>`;
    lignes.forEach(([lab, p], i) => {
      const y = 56 + i * 24 + (i >= n - k ? 6 : 0);
      if (i === n - k) s += `<line x1="62" y1="${y - 17}" x2="258" y2="${y - 17}" style="stroke:var(--doux);stroke-dasharray:4 3"/>`;
      s += `<text class="g-plabel" x="62" y="${y}">${lab}</text><text class="${p === "?" ? "g-mesure" : "g-clabel"}" x="258" y="${y}" text-anchor="end">${p}</text>`;
    });
    return s + `</svg>`;
  }
  const rectSiLisible = (L, l) => (Math.max(vD(L) / vD(l), vD(l) / vD(L)) <= 6 ? figureRectangle(vD(L), vD(l), "m") : undefined);
  FIGURES["o6-cours-ticket"] = () => ticket([["Mangues : 2,5 kg", "12,25 €"], ["Bananes : 1 régime", "4,80 €"], ["Total", "17,05 €"], ["Payé", "20,00 €"], ["Rendu", "2,95 €"]], 3);
  FIGURES["o6-qcm-ticket"] = () => ticket([["3 kg de riz", "5,55 €"], ["Poisson", "?"], ["Total", "14,30 €"]]);
  FIGURES["o6-qcm-produit"] = () => posee(["12,5", "0,6"], "×", "?", { droite: true });
  FIGURES["o6-methode-addition"] = () => posee(["7,5", "12,36"], "+", "19,86", { zeros: true });
  FIGURES["o6-methode-produit"] = () => posee(["1,5", "0,24"], "×", "0,360", { droite: true });
  FIGURES["o6-qcm-malpose"] = () => posee(["36,3", "43,96"], "+", "47,59", { droite: true });

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
      figure: posee([brut(a), brut(b)], plus ? "+" : "−", "?"), figureSolution: posee([brut(a), brut(b)], plus ? "+" : "−", brut(R), { zeros: true }),
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
      figure: posee([brut(a), brut(b)], "×", "?", { droite: true }), figureSolution: posee([brut(a), brut(b)], "×", brut(Dc(a.m * b.m, nd)), { droite: true }),
      mode: "nombre", prefixe: "Résultat :", attendu: vD(R),
      erreurs: errs,
      aides: ["Multiplie d'abord les nombres **sans les virgules**, comme des entiers.", `Compte les chiffres après la virgule : $${a.d}$ ${b.d ? `et $${b.d}$` : "et $0$"}, soit $${nd}$ en tout.`, `Place la virgule dans le résultat pour avoir $${nd}$ chiffre${nd > 1 ? "s" : ""} après elle, puis contrôle avec un ordre de grandeur.`],
      solution: `$${ecrit(a.m)} \\times ${ecrit(b.m)} = ${ecrit(a.m * b.m)}$ ; il faut $${nd}$ chiffre${nd > 1 ? "s" : ""} après la virgule : $${tD(a)} \\times ${tD(b)} = ${tD(R)}$. Ordre de grandeur : $${nb(ordre(vD(a)))} \\times ${nb(ordre(vD(b)))} = ${nb(ordre(vD(a)) * ordre(vD(b)))}$.`.replace(/\{,\}0+\$/, "$")
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
        figure: ticket([[`Mangues : ${nbTexte(vD(kg))} kg`, "?"], ["Bananes : 1 régime", `${brut(Dc(regime, 2))} €`], ["Payé", `${billet / 100},00 €`], ["Rendu", "?"]], 2),
        figureSolution: ticket([[`Mangues : ${nbTexte(vD(kg))} kg`, `${brut(Dc(cm, 2))} €`], ["Bananes : 1 régime", `${brut(Dc(regime, 2))} €`], ["Total", `${brut(Dc(total, 2))} €`], ["Payé", `${billet / 100},00 €`], ["Rendu", `${brut(Dc(billet - total, 2))} €`]], 3),
        mode: "nombre", prefixe: "On te rend", suffixe: "€", attendu: (billet - total) / 100,
        erreurs: [{ valeur: total / 100, message: "Ça, c'est ce que tu paies. On demande la monnaie rendue." }, { valeur: (billet - cm) / 100, message: "N'oublie pas les bananes." }],
        aides: [`Prix des mangues : $${tD(kg)} \\times ${eurD(prix)}$.`, "Ajoute le prix du régime de bananes pour avoir le total.", `La monnaie rendue, c'est $${billet / 100}$ € moins le total.`],
        solution: `Mangues : $${tD(kg)} \\times ${eurD(prix)} = ${eur(cm)}$ €. Total : $${eur(cm)} + ${eur(regime)} = ${eur(total)}$ €. Monnaie : $${billet / 100} - ${eur(total)} = ${eur(billet - total)}$ €.`
      };
    }
    if (t === 1) { // grillage autour d'un enclos rectangulaire
      const L = decimal(40, 2, 1), l = decimal(20, 2, 1), P = addD(addD(L, L), addD(l, l));
      return {
        enonce: `Un enclos à chèvres rectangulaire mesure $${tD(L)}$ m de long et $${tD(l)}$ m de large. Quelle longueur de grillage faut-il pour en faire le tour ?`, figure: rectSiLisible(L, l),
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
        enonce: `Une parcelle rectangulaire de manioc mesure $${tD(L)}$ m sur $${tD(l)}$ m. Quelle est son aire ?`, figure: rectSiLisible(L, l),
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
  const hTxt = (t) => `${Math.floor(t / 60)} h ${String(t % 60).padStart(2, "0")}`; // horaire en texte simple (figures)

  // Division posée : dividende, diviseur, quotient, reste (textes) ; « legende » nomme les quatre termes
  function potence(a, b, q, r, legende) {
    const x = 150, dy = legende ? 16 : 0;
    let s = `<svg class="graph potence" viewBox="0 0 320 ${112 + 2 * dy}" role="img" aria-label="Division posée de ${a} par ${b}${q !== "?" ? ` : quotient ${q}, reste ${r}` : ""}">`;
    s += `<line x1="${x}" y1="${10 + dy}" x2="${x}" y2="${96 + dy}" style="stroke:var(--encre);stroke-width:1.6"/><line x1="${x}" y1="${40 + dy}" x2="${x + 120}" y2="${40 + dy}" style="stroke:var(--encre);stroke-width:1.6"/>`;
    s += `<text class="g-clabel" x="${x - 12}" y="${32 + dy}" text-anchor="end">${a}</text><text class="g-clabel" x="${x + 12}" y="${32 + dy}">${b}</text>`;
    s += `<text class="${q === "?" ? "g-mesure" : "g-clabel"}" x="${x + 12}" y="${64 + dy}">${q}</text>`;
    if (r !== "") s += `<text class="${r === "?" ? "g-mesure" : "g-clabel"}" x="${x - 12}" y="${92 + dy}" text-anchor="end">${r}</text>`;
    if (legende) s += `<g class="g-tick"><text x="${x - 12}" y="${12}" text-anchor="end">dividende</text><text x="${x + 12}" y="${12}">diviseur</text><text x="${x + 12}" y="${84 + dy}">quotient</text><text x="${x - 12}" y="${110 + dy}" text-anchor="end">reste</text></g>`;
    return s + `</svg>`;
  }
  // Horloges à aiguilles : L = [[heure, minute, légende]] (une ou deux horloges)
  function horloges(L) {
    const n = L.length, R = n > 1 ? 58 : 70, cy = R + 8, H = 2 * R + (L.some((x) => x[2]) ? 34 : 16);
    let s = `<svg class="graph horloge" viewBox="0 0 320 ${H}" role="img" aria-label="${L.map(([h, m, l]) => `${l ? l + " : " : ""}horloge qui indique ${h} h ${String(m).padStart(2, "0")}`).join(" ; ")}">`;
    L.forEach(([h, m, lab], i) => {
      const cx = n > 1 ? 80 + 160 * i : 160, p = (a, r) => `${+(cx + r * Math.sin(a)).toFixed(1)} ${+(cy - r * Math.cos(a)).toFixed(1)}`;
      s += `<circle cx="${cx}" cy="${cy}" r="${R}" style="fill:var(--surface);stroke:var(--encre);stroke-width:2.5"/>`;
      for (let k = 0; k < 60; k++) { const a = (k * Math.PI) / 30, l = k % 5 ? 4 : 8; s += `<path d="M${p(a, R - 3)} L${p(a, R - 3 - l)}" style="stroke:var(--encre);stroke-width:${k % 5 ? 0.8 : 2}"/>`; }
      for (let k = 1; k <= 12; k++) { const a = (k * Math.PI) / 6, [tx, ty] = p(a, R - 19).split(" "); s += `<text class="g-plabel" x="${tx}" y="${+ty + 4}" text-anchor="middle">${k}</text>`; }
      const ah = (((h % 12) + m / 60) * Math.PI) / 6, am = (m * Math.PI) / 30;
      s += `<path d="M${cx} ${cy} L${p(ah, R * 0.5)}" style="stroke:var(--encre);stroke-width:5;stroke-linecap:round"/><path d="M${cx} ${cy} L${p(am, R * 0.82)}" style="stroke:var(--lagon);stroke-width:3;stroke-linecap:round"/><circle cx="${cx}" cy="${cy}" r="4" style="fill:var(--encre)"/>`;
      if (lab) s += `<text class="g-plabel" x="${cx}" y="${H - 6}" text-anchor="middle">${lab}</text>`;
    });
    return s + `</svg>`;
  }
  // Frise du temps : horaires (minutes depuis minuit) sur une ligne, durées sur les arcs
  function frise(T, durees) {
    const x0 = 36, w = 248, n = T.length;
    let P = T.map((t) => +(x0 + ((t - T[0]) * w) / (T[n - 1] - T[0])).toFixed(1));
    if (P.some((x, k) => k && x - P[k - 1] < 76)) P = T.map((_, k) => +(x0 + (k * w) / (n - 1)).toFixed(1)); // trop serré : frise non à l'échelle
    let s = `<svg class="graph frise" viewBox="0 0 320 96" role="img" aria-label="Frise du temps de ${hTxt(T[0])} à ${hTxt(T[n - 1])}">`;
    s += `<g class="g-axis"><line x1="${x0 - 18}" y1="62" x2="${x0 + w + 16}" y2="62"/><path d="M${x0 + w + 22} 62 l-8 -4 v8z"/></g>`;
    T.forEach((t, k) => {
      s += `<line class="g-graduation" x1="${P[k]}" y1="55" x2="${P[k]}" y2="69"/><text class="g-plabel" x="${P[k]}" y="86" text-anchor="middle">${hTxt(t)}</text>`;
      if (k < n - 1) { const xm = +((P[k] + P[k + 1]) / 2).toFixed(1); s += `<path class="g-accolade" d="M${P[k] + 3} 52 Q${xm} 26 ${P[k + 1] - 3} 52"/><text class="g-mesure" x="${xm}" y="30" text-anchor="middle">${durees[k]}</text>`; }
    });
    return s + `</svg>`;
  }
  FIGURES["d6-cours-potence"] = () => potence("73", "3", "24", "1", true);
  FIGURES["d6-cours-decimale"] = () => potence("32,12", "4", "8,03", "0");
  FIGURES["d6-cours-horloge"] = () => horloges([[10, 15, "10 h 15 (ou 22 h 15)"]]);
  FIGURES["d6-cours-frise"] = () => frise([465, 480, 485], ["15 min", "5 min"]);
  FIGURES["d6-qcm-horloges"] = () => horloges([[7, 45, "départ"], [8, 5, "arrivée"]]);
  FIGURES["d6-qcm-horloge"] = () => horloges([[4, 40, ""]]);
  FIGURES["d6-qcm-potence"] = () => potence("158", "7", "22", "4");
  FIGURES["d6-cours-multiples"] = () => objetsFr(12, 3, 0);
  FIGURES["d6-cours-cars"] = () => schemaBarres([{ nom: "cars", u: 4, lab: "55", plus: "16" }], "236 élèves");
  FIGURES["d6-cours-arrondi"] = () => potence("23", "6", "3,833…", "");
  FIGURES["d6-methode-decimale"] = () => potence("14,7", "3", "4,9", "0");
  FIGURES["d6-methode-frise"] = () => frise([820, 840, 900, 910], ["20 min", "1 h", "10 min"]);

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
    return { enonce: `On sait que $${n} = ${a} \\times ${b}$ (la figure montre $${a}$ rangées de $${b}$). Quelle phrase est juste ?`, figure: objetsFr(n, a, 0), mode: "choix", choix: c.choix, attendu: c.attendu,
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
    const quoi = t === 0 ? "quotient" : "reste", aT = nbTexte(a);
    return {
      enonce: t === 2 ? `Complète l'égalité de la division euclidienne : $${ecrit(a)} = ${b} \\times ${q} + \\ldots$` : `Effectue la division euclidienne de $${ecrit(a)}$ par $${b}$. Quel est le **${quoi}** ?`,
      figure: potence(aT, String(b), t === 2 ? String(q) : "?", "?"), figureSolution: potence(aT, String(b), String(q), String(r)),
      mode: "nombre", prefixe: t === 2 ? "Le reste est" : `Le ${quoi} est`, attendu: t === 0 ? q : r,
      erreurs: t === 0 ? [{ valeur: q + 1, message: `$${b} \\times ${q + 1} = ${ecrit(b * (q + 1))}$ dépasse $${ecrit(a)}$.` }, { valeur: q - 1, message: "Le reste serait plus grand que le diviseur : on peut encore mettre une fois le diviseur." }] : [{ valeur: r + b, message: "Le reste doit être plus petit que le diviseur." }, { valeur: q, message: "Ça, c'est le quotient. On demande le reste." }],
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
      return { enonce: `On range $${n}$ ${obj} dans des cartons de $${p}$. ${rest ? `Combien ${/^[aeiouyœ]/.test(obj) ? "d'" : "de "}${obj} reste-t-il hors des cartons pleins ?` : "Combien de cartons pleins obtient-on ?"}`, mode: "nombre", prefixe: rest ? "Il en reste" : "Cartons pleins :", attendu: rest ? n % p : q,
        erreurs: rest ? [{ valeur: q, message: "Ça, c'est le nombre de cartons pleins (le quotient). On demande le reste." }] : [{ valeur: n % p, message: "Ça, c'est le reste. On demande le quotient." }, { valeur: q + 1, message: "Le dernier carton n'est pas plein." }],
        aides: [`Fais la division euclidienne de $${n}$ par $${p}$.`, "Le quotient donne le nombre de cartons pleins.", "Le reste donne ce qui ne remplit pas un carton."],
        solution: `$${n} = ${p} \\times ${q} + ${n % p}$ : $${q}$ cartons pleins, et il reste $${n % p}$ ${obj}.` };
    }
    if (t === 2) { // partage équitable (valeur d'une part)
      const k = rand(3, 9), part = rand(8, 120), r = rand(0, k - 1), n = k * part + r;
      return { enonce: `Un pêcheur de M'tsapéré partage $${n}$ poissons entre ses $${k}$ enfants, chacun autant, le plus possible. Combien chaque enfant reçoit-il de poissons ?`,
        figure: schemaBarres([{ nom: "parts", u: k, lab: "?", plus: r ? "r" : "" }], `${nbTexte(n)} poissons${r ? " (r : reste)" : ""}`), mode: "nombre", prefixe: "Chacun reçoit", attendu: part,
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
      enonce: `Calcule : $${tD(a)} \\div ${b}$.`, figure: potence(nbTexte(vD(a)), String(b), "?", ""), figureSolution: potence(nbTexte(vD(a)), String(b), nbTexte(vD(nq)), "0"),
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
      enonce: `${ctx}Donne la valeur arrondie ${nom} de $${a} \\div ${b}$.`, figure: potence(String(a), String(b), "?", ""), figureSolution: potence(String(a), String(b), `${ecran.replace("{,}", ",")}…`, ""),
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
      return { enonce: `Une planche de $${tD(L)}$ m est coupée en $${k}$ morceaux de même longueur. Quelle est la longueur d'un morceau ?`, figure: schemaBarres([{ nom: "planche", u: k, lab: "?" }], `${nbTexte(vD(L))} m`), mode: "nombre", prefixe: "Longueur :", suffixe: "m", attendu: vD(part),
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
    return { enonce: `$${k}$ amis partagent l'addition d'un restaurant de $${eurC(tot)}$ €, chacun la même somme. Combien paie chacun ?`, figure: schemaBarres([{ nom: "addition", u: k, lab: "?" }], `${eurC(tot).replace("{,}", ",").replace(/\\,/g, " ")} €`), mode: "nombre", prefixe: "Chacun paie", suffixe: "€", attendu: c / 100,
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
      return { enonce: `Convertis $${tot}$ min en heures et minutes.`, figure: potence(String(tot), "60", "? h", "? min"), mode: "choix", choix: c.choix, attendu: c.attendu,
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
    return { enonce: `On écrit $${ecrit(s)}$ s sous la forme … h … min … s. Combien de **minutes** ?`, figure: potence(nbTexte(s), "60", "? min", "? s"), figureSolution: potence(nbTexte(s), "60", `${Math.floor(s / 60)} min`, `${r} s`), mode: "nombre", prefixe: "Minutes :", suffixe: "min", attendu: m,
      erreurs: [{ valeur: Math.floor(s / 60), message: "Ça, c'est le nombre total de minutes : il faut encore en retirer les heures entières." }],
      aides: ["Divise d'abord par $60$ : tu obtiens des minutes et des secondes.", `$${ecrit(s)} = 60 \\times ${Math.floor(s / 60)} + ${r}$.`, `Puis divise $${Math.floor(s / 60)}$ min par $60$ pour trouver les heures.`],
      solution: `$${ecrit(s)} = 60 \\times ${Math.floor(s / 60)} + ${r}$, puis $${Math.floor(s / 60)} = 60 \\times ${h} + ${m}$. Donc $${ecrit(s)}$ s $= ${h}$ h $${m}$ min $${r}$ s.` };
  };

  GEN["d6-horaires"] = function () {
    const t = rand(0, 4);
    if (t === 4) { // lire une horloge à aiguilles
      const h = rand(1, 10), m = 5 * rand(1, 11), pm = Math.random() < 0.5, H = pm ? h + 12 : h, f = (a, b) => hTex(a, b, true);
      const opts = [f(H, m), f(pm ? h : h + 12, m), f((m / 5) + (pm ? 12 : 0), (h * 5) % 60), f(H + 1, m), f(H, m / 5), f(H, 60 - m)];
      const c = melange(opts[0], [...new Set(opts.slice(1))].filter((x) => x !== opts[0]));
      return { enonce: `Quelle heure indique cette horloge ? C'est ${pm ? "l'après-midi" : "le matin"}.`, figure: horloges([[h, m, ""]]), mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["La **petite** aiguille (foncée) indique les heures, la **grande** (bleue) les minutes.", "Sur le cadran, chaque chiffre vaut $5$ minutes pour la grande aiguille : sur le $3$, c'est $15$ min.", pm ? "L'après-midi, on ajoute $12$ aux heures : $3$ h de l'après-midi, c'est $15$ h." : "Si la petite aiguille est entre deux chiffres, on prend le plus petit des deux."],
        solution: `La petite aiguille est entre le $${h}$ et le $${h + 1}$ : il est $${h}$ h passées. La grande aiguille est sur le $${m / 5}$ : $${m / 5} \\times 5 = ${m}$ min. ${pm ? `L'après-midi : $${h} + 12 = ${H}$, donc ` : "Il est donc "}${f(H, m)}.` };
    }
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
      const naif = (Math.floor(arr / 60) - Math.floor(dep / 60)) * 100 + (arr % 60) - (dep % 60), pile = Math.floor(dep / 60) * 60 + 60;
      const hor = (x, lab) => [Math.floor(x / 60), x % 60, lab];
      return { enonce: `${debut} à ${minTex(dep, true)} et ${evt ? "se termine" : "arrive"} à ${minTex(arr, true)}. Combien de minutes ${evt ? "a-t-il duré" : "a duré le trajet"} ?`,
        figure: horloges([hor(dep, "début"), hor(arr, evt ? "fin" : "arrivée")]),
        figureSolution: arr > pile ? frise([dep, pile, arr], [`${pile - dep} min`, `${arr - pile} min`]) : frise([dep, arr], [`${dur} min`]), mode: "nombre", prefixe: "Durée :", suffixe: "min", attendu: dur,
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

  /* Autres représentations des fractions. Les parts coloriées sont données par leurs numéros (pas forcément côte à côte). */
  // Bandes empilées : rows = [{ n: parts, col: [numéros coloriés] ou nombre, lab: texte à gauche, cls: 1 (jaune) }]
  function bandesFr(rows) {
    const x0 = rows.some((r) => r.lab) ? 56 : 10, w = 300 - x0, h = 30, gap = 12, H = 12 + rows.length * (h + gap) - gap;
    let s = `<svg class="graph bandes" viewBox="0 0 310 ${H + 6}" role="img" aria-label="${rows.map((r) => `bande partagée en ${r.n}, ${Array.isArray(r.col) ? r.col.length : r.col} parts coloriées`).join(" ; ")}">`;
    rows.forEach((r, k) => {
      const y = 8 + k * (h + gap), col = Array.isArray(r.col) ? r.col : Array.from({ length: r.col }, (_, i) => i);
      for (let i = 0; i < r.n; i++) if (col.includes(i) || (r.col2 || []).includes(i)) s += `<rect class="${r.cls || !col.includes(i) ? "g-barre-plus" : "g-aire g-colorie"}" x="${+(x0 + (i * w) / r.n).toFixed(1)}" y="${y}" width="${+(w / r.n).toFixed(1)}" height="${h}"/>`;
      s += `<g class="g-grid">${Array.from({ length: r.n - 1 }, (_, i) => `<line x1="${+(x0 + ((i + 1) * w) / r.n).toFixed(1)}" y1="${y}" x2="${+(x0 + ((i + 1) * w) / r.n).toFixed(1)}" y2="${y + h}"/>`).join("")}</g><rect class="g-unite" x="${x0}" y="${y}" width="${w}" height="${h}"/>`;
      if (r.lab) s += `<text class="g-plabel" x="${x0 - 8}" y="${y + h / 2 + 4}" text-anchor="end">${r.lab}</text>`;
    });
    return s + `</svg>`;
  }
  // Disques (pizzas) partagés en b parts égales ; col = numéros coloriés (sur un ou deux disques)
  function disquesFr(b, col, nd) {
    nd = nd || 1; const R = nd > 1 ? 62 : 74, W = 320, H = 2 * R + 16, cx0 = nd > 1 ? [82, 238] : [160];
    let s = `<svg class="graph bandes" viewBox="0 0 ${W} ${H}" role="img" aria-label="${nd} disque${nd > 1 ? "s" : ""} partagé${nd > 1 ? "s" : ""} en ${b} parts égales, ${col.length} parts coloriées">`;
    cx0.forEach((cx, d) => { for (let i = 0; i < b; i++) { const a0 = -Math.PI / 2 + (2 * Math.PI * i) / b, a1 = a0 + (2 * Math.PI) / b, p = (a) => `${+(cx + R * Math.cos(a)).toFixed(1)} ${+(8 + R + R * Math.sin(a)).toFixed(1)}`;
      s += b === 1 ? `<circle class="${col.includes(d * b + i) ? "g-aire g-colorie" : "g-vide"}" cx="${cx}" cy="${8 + R}" r="${R}"/>` : `<path class="${col.includes(d * b + i) ? "g-aire g-colorie" : "g-vide"}" d="M${cx} ${8 + R} L${p(a0)} A${R} ${R} 0 0 1 ${p(a1)} Z" style="stroke:var(--encre);stroke-width:1.2"/>`; }
      s += `<circle class="g-unite" cx="${cx}" cy="${8 + R}" r="${R}"/>`; });
    return s + `</svg>`;
  }
  // Rectangle quadrillé en li × co cases égales ; col = numéros coloriés
  function grilleFr(li, co, col) {
    const u = Math.min(34, 280 / co, 150 / li), W = co * u, x0 = (320 - W) / 2;
    let s = `<svg class="graph bandes" viewBox="0 0 320 ${li * u + 16}" role="img" aria-label="Rectangle partagé en ${li * co} cases égales, ${col.length} coloriées">`;
    for (let i = 0; i < li * co; i++) if (col.includes(i)) s += `<rect class="g-aire g-colorie" x="${+(x0 + (i % co) * u).toFixed(1)}" y="${+(8 + Math.floor(i / co) * u).toFixed(1)}" width="${+u.toFixed(1)}" height="${+u.toFixed(1)}"/>`;
    s += `<g class="g-grid">`; for (let i = 1; i < co; i++) s += `<line x1="${+(x0 + i * u).toFixed(1)}" y1="8" x2="${+(x0 + i * u).toFixed(1)}" y2="${+(8 + li * u).toFixed(1)}"/>`; for (let j = 1; j < li; j++) s += `<line x1="${+x0.toFixed(1)}" y1="${+(8 + j * u).toFixed(1)}" x2="${+(x0 + W).toFixed(1)}" y2="${+(8 + j * u).toFixed(1)}"/>`;
    return s + `</g><rect class="g-unite" x="${+x0.toFixed(1)}" y="8" width="${+W.toFixed(1)}" height="${+(li * u).toFixed(1)}"/></svg>`;
  }
  // Segment de a unités (graduées), partagé en b parts égales ; une part marquée « ? »
  function segQuotient(a, b) {
    const x0 = 20, w = 280, u = w / a, X = (v) => +(x0 + v * u).toFixed(1);
    let s = `<svg class="graph droite" viewBox="0 0 320 92" role="img" aria-label="Segment de longueur ${a} partagé en ${b} parts égales ; une part est marquée d'un point d'interrogation">`;
    s += `<line class="g-segment" x1="${x0}" y1="40" x2="${x0 + w}" y2="40"/><g class="g-tick">`;
    for (let i = 0; i <= a; i++) s += `<line class="g-graduation" x1="${X(i)}" y1="33" x2="${X(i)}" y2="47"/><text x="${X(i)}" y="64" text-anchor="middle">${i}</text>`;
    s += `</g>`;
    for (let j = 1; j < b; j++) s += `<line class="g-code" x1="${X((j * a) / b)}" y1="30" x2="${X((j * a) / b)}" y2="40"/>`;
    s += `<line class="g-int" x1="${x0}" y1="40" x2="${X(a / b)}" y2="40"/><text class="g-mesure" x="${X(a / (2 * b))}" y="24" text-anchor="middle">?</text>`;
    return s + `<text class="g-tick" x="160" y="86" text-anchor="middle" style="fill:var(--doux);font-size:10px">(${b} parts égales)</text></svg>`;
  }
  // N objets rangés en b rangées égales (pour prendre une fraction d'une quantité) ; « col » rangées coloriées
  function objetsFr(N, b, col) {
    const k = N / b, r = Math.min(9, 140 / k, 70 / b), W = 320, dx = 2.4 * r, dy = 2.6 * r, x0 = (W - (k - 1) * dx) / 2;
    let s = `<svg class="graph bandes" viewBox="0 0 ${W} ${b * dy + 10}" role="img" aria-label="${N} objets rangés en ${b} rangées de ${k}${col ? `, ${col} rangées coloriées` : ""}">`;
    for (let j = 0; j < b; j++) for (let i = 0; i < k; i++) s += `<circle class="${j < (col || 0) ? "g-aire g-colorie" : "g-vide"}" cx="${+(x0 + i * dx).toFixed(1)}" cy="${+(5 + r + j * dy).toFixed(1)}" r="${+r.toFixed(1)}" style="stroke:var(--encre);stroke-width:1.2"/>`;
    return s + `</svg>`;
  }
  const choisis = (n, k) => shuffle(Array.from({ length: n }, (_, i) => i)).slice(0, k);
  FIGURES["f6-cours-quotient"] = () => segQuotient(3, 4);
  FIGURES["f6-cours-egales"] = () => bandesFr([{ n: 4, col: 3, lab: "3/4" }, { n: 8, col: 6, lab: "6/8" }]);
  FIGURES["f6-cours-comparer"] = () => droiteFractions(6, 2, [{ k: 1, label: "1/6" }, { k: 4, label: "2/3" }, { k: 5, label: "5/6" }, { k: 7, label: "7/6" }]).replace(/y="19"( text-anchor="middle">5\/6)/, 'y="49"$1');
  FIGURES["f6-cours-addition"] = () => bandesFr([{ n: 8, col: 3, lab: "3/8" }, { n: 8, col: 6, lab: "3/4", cls: 1 }, { n: 8, col: [0, 1, 2, 3, 4, 5, 6, 7], lab: "9/8" }, { n: 8, col: 1 }]);
  FIGURES["f6-cours-oeufs"] = () => objetsFr(12, 3, 2);
  FIGURES["f6-qcm-pizza"] = () => disquesFr(6, [0, 2, 3, 5]);
  FIGURES["f6-qcm-grille"] = () => grilleFr(3, 4, [0, 1, 5, 6, 10]);

  GEN["f6-partage"] = function () {
    const t = rand(0, 4);
    let b, a, fig, unite = "la bande";
    if (t === 0) { b = rand(2, 12); a = Math.random() < 0.3 ? rand(b + 1, 2 * b - 1) : rand(1, b - 1); fig = a > b ? bandes(a, b) : bandesFr([{ n: b, col: choisis(b, a) }]); }
    else if (t === 1) { b = pick([2, 3, 4, 5, 6, 8, 10, 12]); a = Math.random() < 0.25 && b <= 8 ? rand(b + 1, 2 * b - 1) : rand(1, b - 1); fig = a > b ? disquesFr(b, [...Array.from({ length: b }, (_, i) => i), ...choisis(b, a - b).map((i) => b + i)], 2) : disquesFr(b, choisis(b, a)); unite = a > b ? "un disque" : "le disque"; }
    else if (t === 2) { const [li, co] = pick([[2, 3], [2, 4], [3, 3], [2, 5], [3, 4], [4, 4], [2, 6], [3, 5]]); b = li * co; a = rand(1, b - 1); fig = grilleFr(li, co, choisis(b, a)); unite = "le rectangle"; }
    else { b = rand(3, 12); a = rand(1, b - 1); fig = t === 3 ? bandesFr([{ n: b, col: choisis(b, a) }]) : disquesFr(b, choisis(b, a)); unite = t === 3 ? "la bande" : "le disque"; }
    const nonCol = t >= 3 && a < b;
    const rep = nonCol ? [b - a, b] : [a, b];
    const bon = `$${fr(...rep)}$`;
    const fausses = [fr(rep[1], rep[0]), nonCol ? fr(a, b) : a < b ? fr(a, b - a) : fr(a - b, b), fr(rep[0], rep[1] + 1), fr(rep[0], 2 * b), fr(b - rep[0] > 0 ? b - rep[0] : rep[0] + 1, b)].map((x) => `$${x}$`);
    const c = melange(bon, fausses.filter((x) => x !== bon));
    return {
      enonce: a > b ? `Chaque ${t === 1 ? "disque" : "bande"} représente une unité. Quelle fraction d'${t === 1 ? "un disque" : "une bande"} la partie coloriée représente-t-elle ?` : `${Maj(unite)} représente une unité. Quelle fraction ${unite.startsWith("le ") ? "du " + unite.slice(3) : "de " + unite} ${nonCol ? "n'est **pas** coloriée" : "est coloriée"} ?`,
      figure: fig, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: [`L'unité est partagée en $${b}$ parts égales : chaque part est $${fr(1, b)}$ de l'unité.`, nonCol ? "Compte les parts **non** coloriées : c'est le numérateur." : "Compte les parts coloriées (même si elles ne sont pas côte à côte) : c'est le numérateur.", "Le dénominateur dit en combien de parts égales on a partagé **une** unité."],
      solution: nonCol ? `L'unité est partagée en $${b}$ parts égales ; $${a}$ sont coloriées, donc $${b} - ${a} = ${b - a}$ ne le sont pas : c'est $${fr(b - a, b)}$.` : `Une unité est partagée en $${b}$ parts égales et on colorie $${a}$ part${a > 1 ? "s" : ""} : c'est $${fr(a, b)}$${a > b ? `, plus que $1$ unité ($${fr(a, b)} = 1 + ${fr(a - b, b)}$)` : ""}.`
    };
  };

  GEN["f6-quotient"] = function () {
    const t = rand(0, 4);
    if (t === 4) { // partager un segment de a unités en b parts égales : chaque part mesure a/b
      const a = rand(2, 5), b = pick([3, 4, 5, 6, 7, 8].filter((x) => x !== a && a % x !== 0)), v = a / b;
      return { enonce: `Le segment de la figure mesure $${a}$ unités. On le partage en $${b}$ parts égales. Quelle est la longueur d'une part, en unités ?${CONSIGNE_FR}`, figure: segQuotient(a, b), mode: "nombre", prefixe: "Une part mesure", suffixe: "unité", attendu: v,
        erreurs: [{ valeur: b / a, message: `On partage $${a}$ unités en $${b}$ : c'est $${a} \\div ${b}$, pas $${b} \\div ${a}$.` }, { valeur: 1 / b, message: `Ça, c'est le partage d'**une** unité en $${b}$. Ici, le segment mesure $${a}$ unités.` }, ...(Number.isInteger(v * 1000) ? [] : FRAC_APPROX(v))],
        aides: [`Partager $${a}$ en $${b}$ parts égales, c'est calculer $${a} \\div ${b}$.`, `Le quotient de $${a}$ par $${b}$ s'écrit $${fr(a, b)}$.`, `Vérifie : $${b}$ parts de $${fr(a, b)}$ font $${b} \\times ${fr(a, b)} = ${a}$.`],
        solution: `Chaque part mesure $${a} \\div ${b} = ${fr(a, b)}$ d'unité : c'est aussi le « ${["", "", "demi", "tiers", "quart", "cinquième", "sixième", "septième", "huitième"][b]} de $${a}$ ». En effet $${b} \\times ${fr(a, b)} = ${a}$.` };
    }
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
      const haut = Math.random() < 0.5, fig = b * k <= 24 ? (fin) => bandesFr([{ n: b, col: a, lab: `${a}/${b}` }, { n: b * k, col: fin ? a * k : 0, lab: haut ? `?/${b * k}` : "?" }]) : null;
      return { enonce: haut ? `Complète : $${fr(a, b)} = ${fr("\\ldots", b * k)}$.` : `Complète : $${fr(a, b)} = ${fr(a * k, "\\ldots")}$.`, figure: fig && haut ? fig(false) : undefined, figureSolution: fig && haut ? fig(true) : undefined, mode: "nombre", prefixe: haut ? "Numérateur :" : "Dénominateur :", attendu: haut ? a * k : b * k,
        erreurs: [{ valeur: haut ? a + (b * k - b) : b + (a * k - a), message: "On ne change pas une fraction en **ajoutant** le même nombre : il faut **multiplier** en haut et en bas par le même nombre." }, { valeur: k, message: `Ça, c'est le nombre par lequel on multiplie ($${k}$). Il faut encore multiplier ${haut ? `le numérateur $${a}$` : `le dénominateur $${b}$`} par $${k}$.` }],
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
      const rep = Math.abs(va - vb) < 1e-12 ? 2 : va < vb ? 0 : 1, D = Math.max(A[1], B[1]), n = Math.max(1, Math.ceil(Math.max(va, vb) + 1e-9));
      const ka = Math.round(va * D), kb = Math.round(vb * D), la = `${A[0]}/${A[1]}`, lb = `${B[0]}/${B[1]}`;
      const serre = Math.abs(ka - kb) * (280 / (D * n)) < ((la.length + lb.length) * 7) / 2 + 10; // étiquettes trop proches : la seconde monte d'un cran
      const dr = (fin) => { const s = droiteFractions(D, n, fin ? (ka === kb ? [{ k: ka, label: `${la} = ${lb}` }] : [{ k: ka, label: la }, { k: kb, label: lb }]) : []);
        if (!(fin && ka !== kb && serre)) return s;
        return s.replace(new RegExp(`y="19"( text-anchor="middle">${lb.replace("/", "\\/")}<)`), 'y="5"$1').replace('viewBox="0 0 320 54"', 'viewBox="0 0 320 66"').replace(/(<svg[^>]*>)/, '$1<g transform="translate(0 12)">').replace(/<\/svg>$/, "</g></svg>"); };
      const fig = D * n <= 36;
      return { enonce: `Compare $${fr(...A)}$ et $${fr(...B)}$.${fig ? ` (Sur la demi-droite, l'unité est partagée en $${D}$.)` : ""}`, figure: fig ? dr(false) : undefined, figureSolution: fig ? dr(true) : undefined, mode: "choix", choix, attendu: rep,
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
    const bas = t === 0, nU = q + 2, fig = b * nU <= 40;
    return { enonce: `On encadre $${fr(a, b)}$ par deux entiers consécutifs : $n < ${fr(a, b)} < n + 1$. ${bas ? "Que vaut $n$ ?" : "Que vaut $n + 1$ ?"}${fig ? ` (La demi-droite est graduée en $${fr(1, b)}$.)` : ""}`, figure: fig ? droiteFractions(b, nU, []) : undefined, figureSolution: fig ? droiteFractions(b, nU, [{ k: a, label: `${a}/${b}` }]) : undefined, mode: "nombre", prefixe: bas ? "$n =$" : "$n + 1 =$", attendu: bas ? q : q + 1,
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
    const fig = t < 2 && D <= 24 && na <= D && nb2 <= D ? bandesFr([{ n: D, col: na, lab: `${A[0]}/${A[1]}` }, { n: D, col: nb2, lab: `${B[0]}/${B[1]}`, cls: 1 }]) : undefined;
    return {
      enonce: `Calcule $${tA} ${plus ? "+" : "-"} ${fr(...B)}$.${CONSIGNE_FR}${fig ? ` Les bandes représentent les deux fractions (chaque bande est une unité partagée en $${D}$).` : ""}`, figure: fig,
      mode: "nombre", prefixe: "Résultat :", attendu: v,
      erreurs: [...(isFinite(naif) && Math.abs(naif - v) > 1e-9 ? [{ valeur: naif, message: "On n'additionne pas les dénominateurs : on met les fractions au même dénominateur, puis on calcule avec les numérateurs." }] : []), ...(t > 0 ? [{ valeur: (plus ? A[0] + B[0] : Math.abs(A[0] - B[0])) / D, message: t === 2 ? `Il faut d'abord écrire $${A[0]}$ comme une fraction de dénominateur $${D}$ : $${A[0]} = ${fr(A[0] * D, D)}$.` : `Avant de calculer avec les numérateurs, il faut transformer ${A[1] === D ? "la seconde" : "la première"} fraction pour avoir le dénominateur $${D}$.` }] : []), ...(Number.isInteger(v * 1000) ? [] : FRAC_APPROX(v))],
      aides: ["On ne peut additionner ou soustraire que des fractions de **même dénominateur**.", expl, "Calcule avec les numérateurs et garde le dénominateur."],
      solution: `${expl} $${tA} ${plus ? "+" : "-"} ${fr(...B)} = ${t === 0 ? "" : `${fr(na, D)} ${plus ? "+" : "-"} ${fr(nb2, D)} = `}${fr(N, D)}$${pgcd(N, D) > 1 ? ` $= ${frNet(N, D)}$` : ""}.`
    };
  };

  GEN["f6-fois"] = function () {
    const t = rand(0, 2);
    if (t === 0) { // fraction d'une quantité
      const b = rand(2, 10), a = rand(1, b - 1), k = rand(2, 12), N = b * k;
      const [unite, obj] = pick([["", "œufs"], ["", "élèves"], [" €", ""], [" m", ""], [" kg", ""], ["", "mangues"], ["", "brochettes"], ["", "bananes"]]), fig = obj && N <= 48;
      return { enonce: `Calcule les $${fr(a, b)}$ de $${N}$${unite}${obj ? " " + obj : ""}.${fig ? ` Les ${obj} sont rangé${obj === "bananes" || obj === "mangues" || obj === "brochettes" ? "e" : ""}s en $${b}$ rangées égales.` : ""}`, figure: fig ? objetsFr(N, b, 0) : undefined, figureSolution: fig ? objetsFr(N, b, a) : undefined, mode: "nombre", prefixe: "Résultat :", suffixe: (unite.trim() || obj), attendu: a * k,
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
    const t = rand(0, 5), P1 = pick(PRENOMS6), P2 = pick(PRENOMS6.filter((x) => x !== P1));
    if (t === 4) { // livre ou trajet : fraction déjà faite, reste en nombre
      const b = pick([3, 4, 5, 6, 8, 10]), a = rand(1, b - 1), k = rand(5, 30), N = b * k, [quoi, u, verbe] = pick([["un livre de", "pages", "lu"], ["un trajet en pirogue de", "minutes", "fait"], ["une randonnée au Mont Choungui de", "minutes", "marché"], ["une collection de", "cartes", "rangé"]]);
      return { enonce: `${P1} a ${verbe} les $${fr(a, b)}$ d'${quoi} $${N}$ ${u}. Combien de ${u} lui reste-t-il ?`, figure: bandesFr([{ n: b, col: a }]), mode: "nombre", prefixe: "Il reste", suffixe: u, attendu: N - a * k,
        erreurs: [{ valeur: a * k, message: `Ça, c'est ce qui est déjà ${verbe} : on demande ce qui reste.` }, { valeur: k, message: `Ça, c'est $${fr(1, b)}$ de $${N}$.` }],
        aides: [`Calcule d'abord les $${fr(a, b)}$ de $${N}$ : $${N} \\div ${b} = ${k}$, puis $\\times ${a}$.`, `Déjà ${verbe} : $${a * k}$ ${u}.`, "Retire ce nombre du total (ou calcule directement la fraction qui reste)."],
        solution: `Déjà ${verbe} : $${fr(a, b)} \\times ${N} = ${a * k}$ ${u}. Reste : $${N} - ${a * k} = ${N - a * k}$ ${u} (c'est $${fr(b - a, b)}$ de $${N}$).` };
    }
    if (t === 5) { // deux dépenses successives exprimées en fractions du total
      const D = pick([8, 10, 12]), b1 = pick([2, 4].filter((x) => D % x === 0)), a1 = 1, b2 = D, a2 = rand(1, D - D / b1 - 1), k = rand(2, 6), N = D * k;
      const reste = N - (N / b1) * a1 - (N / b2) * a2;
      return { enonce: `${P1} a $${N}$ € d'économies. ${P1} dépense $${fr(a1, b1)}$ de cette somme pour un salouva et $${fr(a2, b2)}$ pour des livres. Combien d'euros lui reste-t-il ?`, figure: bandesFr([{ n: D, col: D / b1, lab: "salouva" }, { n: D, col: a2, lab: "livres", cls: 1 }]), mode: "nombre", prefixe: "Il reste", suffixe: "€", attendu: reste,
        erreurs: [{ valeur: (N / b1) * a1 + (N / b2) * a2, message: "Ça, c'est ce qui a été dépensé. On demande ce qui reste." }, { valeur: N - (N / b1) * a1, message: "N'oublie pas la deuxième dépense." }],
        aides: [`Salouva : $${fr(a1, b1)}$ de $${N}$ € $= ${N / b1}$ €.`, `Livres : $${fr(a2, b2)}$ de $${N}$ € $= ${(N / b2) * a2}$ €.`, "Retire les deux dépenses du total."],
        solution: `Salouva : $${N} \\div ${b1} = ${N / b1}$ €. Livres : $(${N} \\div ${b2}) \\times ${a2} = ${(N / b2) * a2}$ €. Reste : $${N} - ${N / b1} - ${(N / b2) * a2} = ${reste}$ €.` };
    }
    if (t === 0) { // reste d'une classe
      const b = pick([3, 4, 5, 6, 8]), a = rand(1, b - 1), k = rand(3, 6), N = b * k;
      const [activ, autre] = pick([["la natation", "le football"], ["le chant", "le théâtre"], ["le bus", "le taxi-brousse"], ["l'anglais", "l'espagnol"], ["le handball", "le basket"], ["la danse traditionnelle", "les percussions"]]);
      const pa = (a * N) / b;
      return { enonce: `Dans la classe ${deN(P1)}, au collège de ${pick(["Sada", "Koungou", "Dembéni", "Chirongui", "Pamandzi", "Kani-Kéli", "Bandraboua", "M'tsamboro"])}, il y a $${N}$ élèves. Les $${fr(a, b)}$ choisissent ${activ} et les autres ${autre}. Combien d'élèves choisissent ${autre} ?`, figure: N <= 48 ? objetsFr(N, b, 0) : undefined, figureSolution: N <= 48 ? objetsFr(N, b, a) : undefined, mode: "nombre", prefixe: "Élèves :", attendu: N - pa,
        erreurs: [{ valeur: pa, message: `Ça, ce sont les élèves qui choisissent ${activ}.` }, { valeur: k, message: `Ça, c'est $${fr(1, b)}$ de la classe.` }],
        aides: [`Calcule d'abord les $${fr(a, b)}$ de $${N}$.`, `$${N} \\div ${b} = ${k}$, puis $${k} \\times ${a} = ${pa}$.`, "Les autres, c'est le total moins ce nombre."],
        solution: `$${fr(a, b)}$ de $${N}$ : $${pa}$ élèves choisissent ${activ}. Les autres : $${N} - ${pa} = ${N - pa}$ élèves.` };
    }
    if (t === 1) { // fraction restante d'un gâteau / champ
      const b = pick([4, 6, 8, 10, 12]), a1 = rand(1, b / 2), a2 = rand(1, b - a1 - 1), r = b - a1 - a2;
      const [plante1, plante2] = shuffle(["des bananiers", "du manioc", "des ananas", "de l'ylang-ylang", "de la vanille", "des brèdes"]).slice(0, 2);
      return { enonce: `À ${pick(["Combani", "Ouangani", "Bandrélé", "Tsingoni", "Bouéni", "Dembéni"])}, ${P1} plante ${plante1} sur $${fr(a1, b)}$ de son champ et ${plante2} sur $${fr(a2, b)}$. Quelle fraction du champ reste libre ?${CONSIGNE_FR}`, figure: bandesFr([{ n: b, col: 0 }]), figureSolution: bandesFr([{ n: b, col: a1, col2: Array.from({ length: a2 }, (_, i) => a1 + i) }]), mode: "nombre", prefixe: "Fraction libre :", attendu: r / b,
        erreurs: [{ valeur: (a1 + a2) / b, message: "Ça, c'est la partie plantée. On demande la partie libre." }, ...(Number.isInteger((r / b) * 1000) ? [] : FRAC_APPROX(r / b))],
        aides: ["Le champ entier, c'est $1$, soit $" + fr(b, b) + "$.", `Partie plantée : $${fr(a1, b)} + ${fr(a2, b)} = ${fr(a1 + a2, b)}$.`, `Partie libre : $${fr(b, b)} - ${fr(a1 + a2, b)}$.`],
        solution: `Partie plantée : $${fr(a1 + a2, b)}$. Partie libre : $${fr(b, b)} - ${fr(a1 + a2, b)} = ${fr(r, b)}$${pgcd(r, b) > 1 ? ` $= ${frNet(r, b)}$` : ""}.` };
    }
    if (t === 2) { // distance parcourue
      const b = pick([2, 3, 4, 5]), a = rand(1, b - 1), k = rand(Math.ceil(20 / b), Math.floor(50 / b)), D = b * k;
      if (pgcd(a, b) !== 1) return GEN["f6-probleme"]();
      return { enonce: `Un sentier de randonnée vers le mont Choungui mesure $${D}$ hm. ${P1} a parcouru les $${fr(a, b)}$ du sentier. Combien d'hectomètres lui reste-t-il à parcourir ?`, figure: bandesFr([{ n: b, col: a }]), mode: "nombre", prefixe: "Il reste", suffixe: "hm", attendu: D - (a * D) / b,
        erreurs: [{ valeur: (a * D) / b, message: "Ça, c'est ce qui a déjà été parcouru." }, { valeur: k, message: `Ça, c'est $${fr(1, b)}$ du sentier.` }],
        aides: [`Calcule les $${fr(a, b)}$ de $${D}$.`, `$${D} \\div ${b} = ${k}$, puis $\\times ${a}$.`, "Retire ce résultat de la longueur totale."],
        solution: `Parcouru : $${fr(a, b)} \\times ${D} = ${(a * D) / b}$ hm. Reste : $${D} - ${(a * D) / b} = ${D - (a * D) / b}$ hm.` };
    }
    // comparer deux parts
    const b = rand(2, 6), k = b <= 3 ? pick([2, 3]) : 2, a1 = rand(1, b - 1), a2 = rand(1, b * k - 1);
    if (a1 * k === a2) return GEN["f6-probleme"]();
    const p1 = fr(a1, b), p2 = fr(a2, b * k), qui = a1 * k > a2 ? 0 : 1, gat = pick(["pizza", "tarte à la noix de coco", "galette de manioc", "gâteau"]);
    const choix = [P1, P2, "Ils ont mangé autant l'un que l'autre"];
    // deux disques côte à côte, partagés en b et en b × k parts
    const deux = (fin) => { const R = 62; let s = `<svg class="graph bandes" viewBox="0 0 320 160" role="img" aria-label="Deux disques de même taille, partagés en ${b} et en ${b * k} parts égales">`;
      [[b, a1, 82, P1], [b * k, a2, 238, P2]].forEach(([n, a, cx, nom]) => { for (let i = 0; i < n; i++) { const t0 = -Math.PI / 2 + (2 * Math.PI * i) / n, t1 = t0 + (2 * Math.PI) / n, p = (u) => `${+(cx + R * Math.cos(u)).toFixed(1)} ${+(72 + R * Math.sin(u)).toFixed(1)}`; s += `<path class="${fin && i < a ? "g-aire g-colorie" : "g-vide"}" d="M${cx} 72 L${p(t0)} A${R} ${R} 0 0 1 ${p(t1)} Z" style="stroke:var(--encre);stroke-width:1.2"/>`; } s += `<circle class="g-unite" cx="${cx}" cy="72" r="${R}"/><text class="g-plabel" x="${cx}" y="154" text-anchor="middle">${nom}</text>`; });
      return s + `</svg>`; };
    return { enonce: `${P1} mange $${p1}$ d'une ${gat} et ${P2} mange $${p2}$ d'une autre ${gat} de même taille. Qui a mangé le plus ?`, figure: deux(false), figureSolution: deux(true), mode: "choix", choix, attendu: qui,
      aides: ["Pour comparer, écris les deux fractions avec le même dénominateur.", `$${p1} = ${fr(a1 * k, b * k)}$.`, "Compare les numérateurs."],
      solution: `$${p1} = ${fr(a1 * k, b * k)}$ et ${qui === 0 ? `$${a1 * k} > ${a2}$` : `$${a1 * k} < ${a2}$`} : c'est ${choix[qui]} qui a mangé le plus.` };
  };

  /* =====================================================================
     6e, chapitre 5 : proportionnalité (préfixe p6-)
     Programme : proportionnalité entre deux grandeurs, reliée au « prix au kilo » ; procédures de linéarité
     (multiplicative, additive) et retour à l'unité ; tableaux avec le nom et l'unité de chaque grandeur ;
     initiation aux échelles. Le produit en croix n'est pas enseigné, le coefficient n'est pas nommé.
     ===================================================================== */
  // Situations : objets (pluriel, singulier), prix pour 1 en centimes (bornes), en-tête de tableau, lieu à Mayotte
  const SITU_P = [
    { pl: "cahiers", sg: "cahier", pr: [80, 250], col: "Cahiers", lieu: "à la librairie de Mamoudzou" },
    { pl: "mangues", sg: "mangue", pr: [40, 150], col: "Mangues", lieu: "au marché de Mamoudzou" },
    { pl: "kg de riz", sg: "kg de riz", pr: [120, 300], col: "Riz (kg)", lieu: "à la boutique de Combani" },
    { pl: "litres d'essence", sg: "litre d'essence", pr: [185, 210], col: "Essence (L)", lieu: "à la station de Kawéni" },
    { pl: "tickets de barge", sg: "ticket de barge", pr: [75, 75], col: "Tickets", lieu: "au guichet de la barge" },
    { pl: "kg de tomates", sg: "kg de tomates", pr: [200, 500], col: "Tomates (kg)", lieu: "au marché de Chirongui" },
    { pl: "bouteilles d'eau", sg: "bouteille d'eau", pr: [40, 120], col: "Bouteilles", lieu: "à la plage de N'Gouja" },
    { pl: "kg de bananes", sg: "kg de bananes", pr: [150, 300], col: "Bananes (kg)", lieu: "au marché de Sada" },
    { pl: "brochettes", sg: "brochette", pr: [50, 150], col: "Brochettes", lieu: "sur le front de mer de Mamoudzou" },
    { pl: "kg de manioc", sg: "kg de manioc", pr: [150, 350], col: "Manioc (kg)", lieu: "au marché de Dembéni" },
    { pl: "gousses de vanille", sg: "gousse de vanille", pr: [150, 300], col: "Gousses", lieu: "à la coopérative de Coconi" },
    { pl: "mètres de tissu", sg: "mètre de tissu", pr: [300, 800], col: "Tissu (m)", lieu: "au marché de Mamoudzou" }
  ];
  const cTex = (c) => (c % 100 ? ecrit(c, 2) : ecrit(c / 100)); // valeur en centièmes, écrite avec deux décimales si besoin
  const cTxt = (c) => cTex(c).replace("{,}", ",").replace(/\\,/g, " "); // la même chose en texte simple (figures)
  const tabP = (nom1, nom2, xs, ys) => ({ lignes: [[`\\text{${nom1}}`, ...xs], [`\\text{${nom2}}`, ...ys]] });
  const Maj = (s) => s[0].toUpperCase() + s.slice(1);
  const qteP = (S, q) => (q === 1 ? `$1$ ${S.sg}` : `$${nb(q)}$ ${S.pl}`), coute = (q) => (q === 1 ? "coûte" : "coûtent");
  const deN = (n) => (/^[aeiouyàâéèêîôœAEIOUYÂÉÈÊÎÔŒ]/.test(n) ? `d'${n}` : `de ${n}`); // « d'Anli », « d'une trousse », « de Moussa »
  const PRENOMS6 = ["Anli", "Nassim", "Zaïnaba", "Fatima", "Moussa", "Awa", "Ibrahim", "Mariama", "Saïd", "Djamila", "Hamada", "Faïza", "Kamal", "Zalifa", "Ambdi", "Nasra", "Toiyb", "Roukia", "Moinécha", "Chaharoumane"];
  // Erreurs typiques : on garde les valeurs positives, finies et distinctes
  const errP = (L) => { const M = L.filter((e) => e && isFinite(e.valeur)).map((e) => ({ valeur: +e.valeur.toFixed(6), message: e.message })); return M.filter((e, i) => e.valeur > 0 && M.findIndex((f) => Math.abs(f.valeur - e.valeur) < 1e-9) === i); };

  /* Tableau de proportionnalité dessiné (nom et unité de chaque grandeur), avec des flèches facultatives.
     o = { l1, l2 : en-têtes ; x, y : valeurs en texte simple ("?" pour l'inconnue) ;
           haut, bas : flèches [[i, j, "× 3", niveau]] entre les colonnes i et j ; cote : "× 2,5" (de la 1re ligne vers la 2de) ; aria } */
  function tabFleches(o) {
    const n = o.x.length, W = 320, haut = o.haut || [], bas = o.bas || [], r1 = (v) => +v.toFixed(1);
    const hx = Math.round(Math.min(108, Math.max(66, 6.3 * Math.max(o.l1.length, o.l2.length) + 14)));
    const cw = (W - hx - (o.cote ? 66 : 4)) / n, rh = 26, X = (i) => hx + (i + 0.5) * cw;
    const nivH = Math.max(0, ...haut.map((f) => f[3] || 1)), nivB = Math.max(0, ...bas.map((f) => f[3] || 1));
    const y0 = 6 + 22 * nivH, H = y0 + 2 * rh + 6 + 22 * nivB;
    let s = `<svg class="graph tab-prop" viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.aria || "Tableau de proportionnalité"}">`;
    [o.l1, o.l2].forEach((l, k) => {
      const y = y0 + k * rh;
      s += `<rect x="1" y="${y}" width="${hx - 1}" height="${rh}" style="fill:var(--lagon-pale);stroke:var(--doux)"/><text class="g-plabel" x="7" y="${y + 17}">${l}</text>`;
      (k ? o.y : o.x).forEach((v, i) => { s += `<rect x="${r1(hx + i * cw)}" y="${y}" width="${r1(cw)}" height="${rh}" style="fill:var(--surface);stroke:var(--doux)"/><text class="${v === "?" ? "g-mesure" : "g-plabel"}" x="${r1(X(i))}" y="${y + 17}" text-anchor="middle">${v}</text>`; });
    });
    const pointe = (xb, yb, ang) => `<path d="M${r1(xb)} ${r1(yb)} L${r1(xb - 7 * Math.cos(ang + 0.45))} ${r1(yb - 7 * Math.sin(ang + 0.45))} L${r1(xb - 7 * Math.cos(ang - 0.45))} ${r1(yb - 7 * Math.sin(ang - 0.45))}Z" style="fill:var(--encre)"/>`;
    const fleche = ([i, j, txt, niv], enBas) => {
      const c = 20 * (niv || 1) - 2, sg = j > i ? 1 : -1, xa = X(i) + 5 * sg, xb = X(j) - 5 * sg, xm = (xa + xb) / 2;
      const ya = enBas ? y0 + 2 * rh + 3 : y0 - 3, yc = enBas ? ya + c : ya - c;
      return `<path class="g-accolade" d="M${r1(xa)} ${ya} Q${r1(xm)} ${yc} ${r1(xb)} ${ya}"/>` + pointe(xb, ya, Math.atan2(ya - yc, xb - xm)) +
        (txt ? `<text class="g-mesure" x="${r1(xm)}" y="${enBas ? ya + c / 2 + 11 : ya - c / 2 - 3}" text-anchor="middle">${txt}</text>` : "");
    };
    haut.forEach((f) => { s += fleche(f, false); });
    bas.forEach((f) => { s += fleche(f, true); });
    if (o.cote) {
      const xs = hx + n * cw + 3, ya = y0 + rh / 2, yb = y0 + 1.5 * rh, ym = y0 + rh;
      s += `<path class="g-accolade" d="M${r1(xs)} ${ya} Q${r1(xs + 30)} ${ym} ${r1(xs)} ${yb}"/>` + pointe(xs, yb, Math.atan2(yb - ym, -30)) + `<text class="g-mesure" x="${r1(xs + 19)}" y="${ym + 4}">${o.cote}</text>`;
    }
    return s + `</svg>`;
  }

  /* Carte simplifiée de Mayotte pour les échelles : villes et contour en [longitude, latitude].
     Distances en km : 1° de latitude ≈ 110,6 km et 1° de longitude ≈ 108,5 km à cette latitude. */
  const VILLES_YT = { Mamoudzou: [45.227, -12.781], Dzaoudzi: [45.281, -12.788], Pamandzi: [45.28, -12.797], Koungou: [45.2, -12.737], Bandraboua: [45.122, -12.703], "M'tsamboro": [45.07, -12.7], Acoua: [45.058, -12.722], Tsingoni: [45.104, -12.79], Combani: [45.145, -12.779], Sada: [45.104, -12.849], Chiconi: [45.117, -12.831], Ouangani: [45.137, -12.849], "Dembéni": [45.172, -12.84], "Bandrélé": [45.192, -12.906], Chirongui: [45.15, -12.931], "Bouéni": [45.078, -12.903], "Kani-Kéli": [45.1, -12.956] };
  const CONTOUR_YT = [[45.075, -12.652], [45.105, -12.672], [45.125, -12.695], [45.15, -12.715], [45.18, -12.728], [45.205, -12.735], [45.222, -12.76], [45.232, -12.782], [45.218, -12.8], [45.196, -12.818], [45.205, -12.838], [45.21, -12.868], [45.205, -12.905], [45.215, -12.94], [45.205, -12.972], [45.17, -12.99], [45.13, -12.985], [45.098, -12.97], [45.075, -12.958], [45.07, -12.925], [45.075, -12.9], [45.11, -12.905], [45.148, -12.928], [45.14, -12.905], [45.125, -12.885], [45.1, -12.865], [45.105, -12.835], [45.095, -12.815], [45.095, -12.79], [45.08, -12.762], [45.062, -12.735], [45.052, -12.715], [45.05, -12.69], [45.06, -12.665]];
  const PT_YT = [[45.268, -12.772], [45.288, -12.77], [45.296, -12.79], [45.287, -12.812], [45.27, -12.805], [45.266, -12.788]];
  const kmYT = (a, b) => Math.hypot((VILLES_YT[a][0] - VILLES_YT[b][0]) * 108.5, (VILLES_YT[a][1] - VILLES_YT[b][1]) * 110.6);
  function carteMayotte(a, b, lab, echelle) {
    const X = ([lo, la]) => [+(62 + (lo - 45.03) * 499).toFixed(1), +(8 + (-12.66 - la) * 508.8).toFixed(1)];
    const poly = (L) => L.map(X).map((p) => p.join(",")).join(" ");
    const [A, B] = [X(VILLES_YT[a]), X(VILLES_YT[b])], cote = (v) => VILLES_YT[v][0] > 45.16;
    let s = `<svg class="graph carte" viewBox="0 0 320 190" role="img" aria-label="Carte de Mayotte : ${a} et ${b} reliées par un segment de ${lab}. ${echelle.replace(/\n/g, " ")}">`;
    s += `<rect x="0" y="0" width="320" height="190" style="fill:var(--lagon-pale)"/><polygon points="${poly(CONTOUR_YT)}" style="fill:var(--surface);stroke:var(--doux);stroke-width:1.2"/><polygon points="${poly(PT_YT)}" style="fill:var(--surface);stroke:var(--doux);stroke-width:1.2"/>`;
    s += `<line class="g-hline" x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}"/>`;
    [[a, A], [b, B]].forEach(([v, P]) => { s += `<circle class="g-point" cx="${P[0]}" cy="${P[1]}" r="3.5"/>` + (v === "Mamoudzou" ? `<text class="g-plabel" x="${P[0]}" y="${P[1] - 8}" text-anchor="middle">${v}</text>` : `<text class="g-plabel" x="${P[0] + (cote(v) ? 7 : -7)}" y="${P[1] + 4}" text-anchor="${cote(v) ? "start" : "end"}">${v}</text>`); });
    const mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2, L = Math.hypot(B[0] - A[0], B[1] - A[1]) || 1, nx = -(B[1] - A[1]) / L, ny = (B[0] - A[0]) / L, sg = nx > 0 ? 1 : -1;
    s += `<text class="g-mesure" x="${+(mx + sg * nx * 12).toFixed(1)}" y="${+(my + sg * ny * 12 + 4).toFixed(1)}" text-anchor="${sg * nx > 0.3 ? "start" : sg * nx < -0.3 ? "end" : "middle"}">${lab}</text>`;
    s += `<path d="M296 14 l-5 13 h10z" style="fill:var(--encre)"/><text class="g-plabel" x="296" y="40" text-anchor="middle">N</text>`;
    echelle.split("\n").forEach((l, i) => { s += `<text class="g-plabel" x="314" y="${160 + i * 14}" text-anchor="end">${l}</text>`; });
    return s + `</svg>`;
  }
  // Les deux noms et la longueur (environ 6 caractères) de carteMayotte ne se chevauchent pas
  function carteLisible(a, b) {
    const X = ([lo, la]) => [62 + (lo - 45.03) * 499, 8 + (-12.66 - la) * 508.8], cote = (v) => VILLES_YT[v][0] > 45.16;
    const boite = (v) => { const [x, y] = X(VILLES_YT[v]), w = 6.6 * v.length + 4; return v === "Mamoudzou" ? [x - w / 2, y - 20, x + w / 2, y - 6] : cote(v) ? [x, y - 8, x + 7 + w, y + 6] : [x - 7 - w, y - 8, x, y + 6]; };
    const [A, B] = [X(VILLES_YT[a]), X(VILLES_YT[b])], mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2, L = Math.hypot(B[0] - A[0], B[1] - A[1]) || 1;
    const nx = -(B[1] - A[1]) / L, ny = (B[0] - A[0]) / L, sg = nx > 0 ? 1 : -1, cx = mx + sg * nx * 12, cy = my + sg * ny * 12 + 4, an = sg * nx > 0.3 ? 0 : sg * nx < -0.3 ? 2 : 1;
    const lab = [cx - (an * 44) / 2, cy - 11, cx + 44 - (an * 44) / 2, cy + 3];
    const inter = (p, q) => p[0] < q[2] && q[0] < p[2] && p[1] < q[3] && q[1] < p[3];
    const Bx = [boite(a), boite(b), lab];
    return !inter(Bx[0], Bx[1]) && !inter(Bx[0], Bx[2]) && !inter(Bx[1], Bx[2]) && Bx.every((r) => r[0] >= 0 && r[2] <= 320);
  }
  // Plan d'un lieu : quelques bâtiments, deux endroits reliés par un segment (longueur à peu près à l'échelle)
  function planEchelle(n1, n2, Lcm, lab, echelle) {
    const L = Math.min(250, 25 * Lcm), A = [32, 112], B = [+(32 + L * 0.98).toFixed(1), +(112 - L * 0.2).toFixed(1)];
    let s = `<svg class="graph plan" viewBox="0 0 320 196" role="img" aria-label="Plan : ${n1} et ${n2} reliés par un segment de ${lab}. ${echelle.replace(/\n/g, " ")}">`;
    s += `<rect x="2" y="2" width="316" height="160" style="fill:var(--surface);stroke:var(--doux)"/>`;
    [[14, 14, 84, 34], [118, 12, 64, 26], [214, 14, 92, 22], [60, 132, 92, 24], [190, 128, 70, 26]].forEach(([x, y, w, h]) => { s += `<rect class="g-rect" x="${x}" y="${y}" width="${w}" height="${h}"/>`; });
    s += `<line class="g-segment" x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}"/>`;
    s += `<circle class="g-point" cx="${A[0]}" cy="${A[1]}" r="3.5"/><circle class="g-point" cx="${B[0]}" cy="${B[1]}" r="3.5"/>`;
    s += `<text class="g-plabel" x="${A[0] - 4}" y="${A[1] + 16}">${Maj(n1)}</text><text class="g-plabel" x="${B[0] + 4}" y="${B[1] + 16}" text-anchor="${B[0] > 200 ? "end" : "start"}">${Maj(n2)}</text>`;
    s += `<text class="g-mesure" x="${+((A[0] + B[0]) / 2).toFixed(1)}" y="${+((A[1] + B[1]) / 2 - 8).toFixed(1)}" text-anchor="middle">${lab}</text>`;
    echelle.split("\n").forEach((l, i) => { s += `<text class="g-plabel" x="160" y="${177 + i * 14}" text-anchor="middle">${l}</text>`; });
    return s + `</svg>`;
  }

  GEN["p6-reconnaitre"] = function () {
    if (Math.random() < 0.45) { // une situation parmi quatre
      const n1 = rand(2, 6), k = rand(2, 4), p = rand(3, 9) * 50, [P1, P2] = shuffle(PRENOMS6).slice(0, 2), S = pick(SITU_P), pS = rand(S.pr[0] / 5, S.pr[1] / 5) * 5;
      const PROP = [
        `${Maj(S.lieu)}, ${qteP(S, n1)} coûtent $${cTex(n1 * pS)}$ € et ${qteP(S, n1 * k)} coûtent $${cTex(n1 * k * pS)}$ €.`,
        `En $${n1}$ min, une pompe qui débite toujours autant remplit $${n1 * 3}$ L de la citerne ${deN(P1)} ; en $${n1 * k}$ min, elle remplit $${n1 * k * 3}$ L.`,
        `Un taxi-brousse qui roule toujours à la même vitesse parcourt $${n1 * 5}$ km en $${n1 * 6}$ min et $${n1 * k * 5}$ km en $${n1 * k * 6}$ min.`,
        `La location d'un kayak à N'Gouja coûte $${p / 50}$ € de l'heure, sans autres frais : $${n1}$ h coûtent $${(n1 * p) / 50}$ € et $${n1 * k}$ h coûtent $${(n1 * k * p) / 50}$ €.`
      ];
      const age = rand(5, 10), f = rand(2, 3), cm = rand(60, 90);
      const NON = [
        `À $${age}$ ans, ${P2} mesurait $${ecrit(rand(110, 135), 2)}$ m ; à $${age * 2}$ ans, ${P2} mesure $${ecrit(rand(160, 180), 2)}$ m.`,
        `Un taxi-brousse coûte $${f}$ € de prise en charge plus $1$ € par km : $${n1}$ km coûtent $${n1 + f}$ € et $${n1 * k}$ km coûtent $${n1 * k + f}$ €.`,
        `Un abonnement de cantine coûte $${rand(20, 40)}$ € par mois, que l'on mange $${n1}$ fois ou $${n1 * k}$ fois.`,
        `Une bougie mesure $${n1 * 2 + 10}$ cm ; après $${n1}$ h, elle mesure $${n1 * 2 + 10 - n1}$ cm, et après $${n1 * k}$ h, $${n1 * 2 + 10 - n1 * k > 0 ? n1 * 2 + 10 - n1 * k : 1}$ cm.`,
        `À $8$ h, il fait $${rand(24, 26)}$ °C à Mamoudzou ; à $16$ h, il fait $${rand(29, 32)}$ °C.`,
        `La location d'un kayak à N'Gouja coûte $${f * 5}$ € de caution plus $5$ € de l'heure : $${n1}$ h coûtent $${f * 5 + 5 * n1}$ € et $${n1 * k}$ h coûtent $${f * 5 + 5 * n1 * k}$ €.`,
        `${P1} a $${cm}$ cm de cheveux ; après $${n1}$ mois, ils mesurent $${cm + n1}$ cm et après $${n1 * k}$ mois, $${cm + n1 * k}$ cm.`
      ];
      const bon = pick(PROP), c = melange(bon, shuffle(NON).slice(0, 3));
      return { enonce: "Laquelle de ces situations est une situation de **proportionnalité** ?", mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Deux grandeurs sont proportionnelles si, quand on multiplie l'une par un nombre, l'autre est multipliée par le **même** nombre.", "Cherche par combien est multipliée la première grandeur, puis vérifie la seconde.", "Une somme fixe à payer en plus (prise en charge, caution, abonnement) empêche la proportionnalité."],
        solution: `${bon.replace(/\.$/, "")} : quand la première grandeur est multipliée par $${k}$, la seconde aussi. Dans les autres situations, ce n'est pas le cas.` };
    }
    // un tableau : proportionnel ou non, avec la bonne raison
    const S = pick(SITU_P.filter((x) => x.pr[1] > x.pr[0])), p = rand(S.pr[0] / 10, S.pr[1] / 10) * 10;
    const xs = shuffle([2, 3, 4, 5, 6, 8, 10]).slice(0, 3).sort((a, b) => a - b), prop = Math.random() < 0.5;
    const ys = xs.map((x) => x * p);
    const faute = rand(0, 2); if (!prop) ys[faute] += pick([-1, 1]) * rand(1, 3) * 10;
    const bons = prop ? `Oui : le prix pour $1$ est toujours $${cTex(p)}$ €` : `Non : ${qteP(S, xs[faute])} ne coûtent pas $${xs[faute]} \\times ${cTex(p)}$ €`;
    const fausses = prop
      ? [`Non : les prix ne sont pas des nombres entiers`, `Non : les deux lignes n'augmentent pas de la même façon`, `Oui : les deux lignes augmentent`]
      : [`Oui : les deux lignes augmentent`, `Oui : le prix pour $1$ est toujours $${cTex(p)}$ €`, `Non : les prix sont trop grands`];
    const c = melange(bons, fausses);
    const fig = (cote) => tabFleches({ l1: S.col, l2: "Prix (€)", x: xs.map(String), y: ys.map(cTxt), cote, aria: `Tableau : ${xs.map((x, i) => `${x} pour ${cTxt(ys[i])} €`).join(", ")}` });
    return { enonce: `${Maj(S.lieu)}, on relève les prix ci-dessous. Le prix est-il proportionnel au nombre de ${S.pl} ?`, figure: fig(), figureSolution: prop ? fig(`× ${cTxt(p)}`) : undefined,
      mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Calcule le prix pour $1$ dans chaque colonne : divise le prix par la quantité.", "Si on trouve toujours le même prix pour $1$, c'est un tableau de proportionnalité.", "Que les nombres augmentent ne suffit pas."],
      solution: prop ? `$${xs.map((x, i) => `${cTex(ys[i])} \\div ${x} = ${cTex(p)}`).join("$ ; $")}$ : le prix pour $1$ est toujours le même, c'est un tableau de proportionnalité. On passe de la 1re ligne à la 2de en multipliant par $${cTex(p)}$.`
        : `$${xs[faute]} \\times ${cTex(p)} = ${cTex(xs[faute] * p)}$, et pas $${cTex(ys[faute])}$ : le prix pour $1$ n'est pas toujours le même. Ce n'est pas un tableau de proportionnalité.` };
  };

  GEN["p6-lineaire-mult"] = function () {
    const S = pick(SITU_P), p = rand(S.pr[0] / 5, S.pr[1] / 5) * 5, n = rand(2, 8), k = rand(2, 5), fois = Math.random() < 0.6;
    const a = fois ? n : n * k, b = fois ? n * k : n, op = fois ? "\\times" : "\\div", opT = `${fois ? "×" : "÷"} ${k}`;
    const tab = (fin) => tabFleches({ l1: S.col, l2: "Prix (€)", x: [String(a), String(b)], y: [cTxt(a * p), fin ? cTxt(b * p) : "?"], haut: fin ? [[0, 1, opT]] : [], bas: fin ? [[0, 1, opT]] : [], aria: `Tableau : ${a} ${S.pl} coûtent ${cTxt(a * p)} €, ${b} ${S.pl} coûtent ?` });
    return { enonce: `${Maj(S.lieu)}, ${qteP(S, a)} coûtent $${cTex(a * p)}$ €. Le prix est proportionnel à la quantité. Combien coûtent ${qteP(S, b)} ?`, figure: tab(false), figureSolution: tab(true),
      mode: "nombre", prefixe: "Prix :", suffixe: "€", attendu: (b * p) / 100,
      erreurs: errP([{ valeur: (a * p + (b - a) * 100) / 100, message: "Ce n'est pas une addition : la quantité est multipliée (ou divisée), le prix aussi." },
        fois ? { valeur: (a * p * b) / 100, message: `Tu as multiplié le prix par $${b}$. Or de $${a}$ à $${b}$, la quantité n'est multipliée que par $${k}$ : le prix aussi.` }
          : { valeur: (a * p * k) / 100, message: `La quantité est **divisée** par $${k}$ : le prix aussi est divisé, pas multiplié.` }]),
      aides: [`De $${a}$ à $${b}$ ${S.pl}, la quantité est ${fois ? `multipliée par $${k}$` : `divisée par $${k}$`}.`, `Le prix est donc ${fois ? "multiplié" : "divisé"} par $${k}$ lui aussi.`, `Calcule $${cTex(a * p)} ${op} ${k}$.`],
      solution: `$${b} = ${a} ${op} ${k}$, donc le prix est $${cTex(a * p)} ${op} ${k} = ${cTex(b * p)}$ €.` };
  };

  GEN["p6-lineaire-add"] = function () {
    const S = pick(SITU_P), p = rand(S.pr[0] / 5, S.pr[1] / 5) * 5;
    let a = rand(2, 9), b = rand(2, 9); if (a === b) b = a + rand(1, 3);
    const [g, s] = a > b ? [a, b] : [b, a], moins = Math.random() < 0.4 && g !== 2 * s, cible = moins ? g - s : a + b;
    // colonnes du tableau : x0 + x1 = x2 (pour une différence, l'inconnue est la colonne du milieu)
    const xs = moins ? [s, cible, g] : [a, b, cible], trou = moins ? 1 : 2, fl = [[0, 2, "+", 2], [1, 2, "+", 1]];
    const tab = (fin) => tabFleches({ l1: S.col, l2: "Prix (€)", x: xs.map(String), y: xs.map((x, i) => (i === trou && !fin ? "?" : cTxt(x * p))), haut: fin ? fl : [], bas: fin ? fl : [], aria: `Tableau : ${xs.join(", ")} ${S.pl}, un des prix est inconnu` });
    return { enonce: `${Maj(S.lieu)}, ${qteP(S, a)} coûtent $${cTex(a * p)}$ € et ${qteP(S, b)} coûtent $${cTex(b * p)}$ €. Le prix est proportionnel à la quantité. Combien ${coute(cible)} ${qteP(S, cible)} ?`,
      figure: tab(false), figureSolution: tab(true), mode: "nombre", prefixe: "Prix :", suffixe: "€", attendu: (cible * p) / 100,
      erreurs: errP([{ valeur: ((moins ? g + s : g - s) * p) / 100, message: moins ? `$${cible} = ${g} - ${s}$ : c'est une **différence**, on soustrait les prix.` : `$${cible} = ${a} + ${b}$ : c'est une **somme**, on additionne les prix.` },
        { valeur: (a * p) / 100 + (cible - a), message: "On n'ajoute pas au prix la différence des quantités : le prix n'augmente pas de $1$ € par objet." }]),
      aides: [moins ? `$${cible} = ${g} - ${s}$.` : `$${cible} = ${a} + ${b}$.`, `Le prix de ${qteP(S, cible)} est donc ${moins ? "la différence" : "la somme"} des deux prix.`, moins ? `Calcule $${cTex(g * p)} - ${cTex(s * p)}$.` : `Calcule $${cTex(a * p)} + ${cTex(b * p)}$.`],
      solution: moins ? `$${cible} = ${g} - ${s}$ (car $${s} + ${cible} = ${g}$), donc le prix est $${cTex(g * p)} - ${cTex(s * p)} = ${cTex(cible * p)}$ €.` : `$${cible} = ${a} + ${b}$, donc le prix est $${cTex(a * p)} + ${cTex(b * p)} = ${cTex(cible * p)}$ €.` };
  };

  GEN["p6-unite"] = function () {
    if (Math.random() < 0.5) {
      const S = pick(SITU_P), p = rand(S.pr[0] / 5, S.pr[1] / 5) * 5, a = rand(3, 9);
      let b = rand(2, 12); while (b === a || b % a === 0 || a % b === 0) b = rand(2, 13);
      const pourUn = Math.random() < 0.3, cible = pourUn ? 1 : b, fl = pourUn ? [[0, 1, `÷ ${a}`]] : [[0, 1, `÷ ${a}`], [1, 2, `× ${b}`]];
      const tab = (fin) => tabFleches({ l1: S.col, l2: "Prix (€)", x: fin && !pourUn ? [String(a), "1", String(b)] : [String(a), String(cible)], y: fin ? [cTxt(a * p), cTxt(p), cTxt(b * p)].slice(0, pourUn ? 2 : 3) : [cTxt(a * p), "?"],
        haut: fin ? fl : [], bas: fin ? fl : [], aria: `Tableau : ${a} ${S.pl} coûtent ${cTxt(a * p)} €, ${cible} pour ?` });
      return { enonce: pourUn ? `${Maj(S.lieu)}, ${qteP(S, a)} coûtent $${cTex(a * p)}$ €. Combien coûte $1$ ${S.sg} ?` : `${Maj(S.lieu)}, ${qteP(S, a)} coûtent $${cTex(a * p)}$ €. Le prix est proportionnel à la quantité. Combien coûtent ${qteP(S, b)} ?`,
        figure: tab(false), figureSolution: tab(true), mode: "nombre", prefixe: "Prix :", suffixe: "€", attendu: (cible * p) / 100,
        erreurs: errP(pourUn ? [{ valeur: (a * a * p) / 100, message: `Pour $1$, il faut **diviser** le prix par $${a}$, pas le multiplier.` }, { valeur: (p * 10) / 100, message: "Attention à la virgule : vérifie avec un ordre de grandeur." }]
          : [{ valeur: (a * p) / 100 + (b - a), message: "On ne peut pas ajouter : passe d'abord par le prix pour $1$." }, { valeur: (a * p * b) / 100, message: `Tu as multiplié le prix de ${qteP(S, a)} par $${b}$ : divise-le d'abord par $${a}$ pour avoir le prix de $1$.` }]),
        aides: ["Calcule d'abord le prix pour **une** unité : c'est le retour à l'unité.", pourUn ? `Divise le prix par $${a}$.` : `$${cTex(a * p)} \\div ${a} = ${cTex(p)}$ € pour $1$.`, pourUn ? `Vérifie : $${a}$ fois ton résultat doit redonner $${cTex(a * p)}$ €.` : `Multiplie ensuite par $${b}$.`],
        solution: `Pour $1$ : $${cTex(a * p)} \\div ${a} = ${cTex(p)}$ €.${pourUn ? "" : ` Pour $${b}$ : $${cTex(p)} \\times ${b} = ${cTex(b * p)}$ €.`}` };
    }
    // battements du cœur, débit, vitesse régulière, rendement
    const P1 = pick(PRENOMS6);
    const [phrase, u, q, l1, l2] = pick([[`Au repos, le cœur ${deN(P1)} bat $VAL$ fois en $A$ minutes. Combien de fois bat-il en $B$ minutes ?`, "battements", [60, 80], "Durée (min)", "Battements"],
      [`Une pompe remplit $VAL$ litres de la citerne ${deN(P1)} en $A$ minutes. Combien de litres remplit-elle en $B$ minutes ?`, "L", [8, 25], "Durée (min)", "Eau (L)"],
      [`Sur le lagon, la pirogue ${deN(P1)} parcourt $VAL$ km en $A$ heures, toujours à la même vitesse. Combien de kilomètres parcourt-elle en $B$ heures ?`, "km", [3, 6], "Durée (h)", "Distance (km)"],
      [`À la distillerie, on obtient $VAL$ mL d'huile d'ylang-ylang avec $A$ kg de fleurs. Combien de mL obtient-on avec $B$ kg de fleurs ?`, "mL", [15, 25], "Fleurs (kg)", "Huile (mL)"],
      [`L'imprimante du collège de Sada imprime $VAL$ pages en $A$ minutes. Combien de pages imprime-t-elle en $B$ minutes ?`, "pages", [8, 20], "Durée (min)", "Pages"],
      [`${P1} roule à vélo, toujours à la même vitesse, et parcourt $VAL$ km en $A$ heures. Combien de kilomètres en $B$ heures ?`, "km", [12, 20], "Durée (h)", "Distance (km)"]]);
    const v = rand(q[0], q[1]), a = rand(2, 5); let b = rand(2, 9); while (b === a || b % a === 0) b = rand(2, 9);
    const fl = [[0, 1, `÷ ${a}`], [1, 2, `× ${b}`]];
    const tab = (fin) => tabFleches({ l1, l2, x: fin ? [String(a), "1", String(b)] : [String(a), String(b)], y: fin ? [nbTexte(v * a), String(v), nbTexte(v * b)] : [nbTexte(v * a), "?"], haut: fin ? fl : [], bas: fin ? fl : [], aria: `Tableau : ${a} pour ${v * a}, ${b} pour ?` });
    return { enonce: phrase.replace("$VAL$", `$${v * a}$`).replace("$A$", `$${a}$`).replace("$B$", `$${b}$`) + " On suppose que c'est proportionnel.", figure: tab(false), figureSolution: tab(true), mode: "nombre", prefixe: "Réponse :", suffixe: u, attendu: v * b,
      erreurs: errP([{ valeur: v * a + (b - a), message: "On ne peut pas ajouter : passe d'abord par la valeur pour $1$." }, { valeur: v * a * b, message: `Divise d'abord par $${a}$ pour avoir la valeur pour $1$, puis multiplie par $${b}$.` }]),
      aides: ["Calcule d'abord la valeur pour **une** unité (une minute, une heure, un kilo) : c'est le retour à l'unité.", `$${v * a} \\div ${a} = ${v}$.`, `Puis multiplie par $${b}$.`],
      solution: `Pour $1$ : $${v * a} \\div ${a} = ${v}$. Pour $${b}$ : $${v} \\times ${b} = ${v * b}$ ${u}.` };
  };

  GEN["p6-tableau"] = function () {
    const S = pick(SITU_P.filter((x) => x.pr[1] > x.pr[0])), p = rand(S.pr[0] / 10, S.pr[1] / 10) * 10;
    const xs = shuffle([2, 3, 4, 5, 6, 8, 10, 12]).slice(0, 3).sort((a, b) => a - b), trou = rand(0, 2), X = xs[trou];
    const autres = [0, 1, 2].filter((i) => i !== trou);
    // la procédure la plus simple : multiplier une autre colonne, la diviser, ajouter deux colonnes, ou le prix pour 1
    const j = autres.find((i) => X % xs[i] === 0), dv = autres.find((i) => xs[i] % X === 0), sum = xs[autres[0]] + xs[autres[1]] === X;
    let indice, sol, fl;
    if (j !== undefined) { const m = X / xs[j]; indice = `$${X} = ${xs[j]} \\times ${m}$ : multiplie le prix de $${xs[j]}$ ${S.pl} par $${m}$.`; sol = `$${X} = ${xs[j]} \\times ${m}$, donc le prix est $${cTex(xs[j] * p)} \\times ${m} = ${cTex(X * p)}$ €.`; fl = { haut: [[j, trou, `× ${m}`]], bas: [[j, trou, `× ${m}`]] }; }
    else if (dv !== undefined) { const m = xs[dv] / X; indice = `$${X} = ${xs[dv]} \\div ${m}$ : divise le prix de $${xs[dv]}$ ${S.pl} par $${m}$.`; sol = `$${X} = ${xs[dv]} \\div ${m}$, donc le prix est $${cTex(xs[dv] * p)} \\div ${m} = ${cTex(X * p)}$ €.`; fl = { haut: [[dv, trou, `÷ ${m}`]], bas: [[dv, trou, `÷ ${m}`]] }; }
    else if (sum) { const [u, w] = autres; indice = `$${X} = ${xs[u]} + ${xs[w]}$ : ajoute les prix de ces deux colonnes.`; sol = `$${X} = ${xs[u]} + ${xs[w]}$, donc le prix est $${cTex(xs[u] * p)} + ${cTex(xs[w] * p)} = ${cTex(X * p)}$ €.`; fl = { haut: [[u, trou, "+", 2], [w, trou, "+", 1]], bas: [[u, trou, "+", 2], [w, trou, "+", 1]] }; }
    else { const u = autres[0]; indice = `Calcule d'abord le prix pour $1$ : $${cTex(xs[u] * p)} \\div ${xs[u]}$, puis multiplie par $${X}$.`; sol = `Le prix pour $1$ est $${cTex(xs[u] * p)} \\div ${xs[u]} = ${cTex(p)}$ €, donc pour $${X}$ : $${cTex(p)} \\times ${X} = ${cTex(X * p)}$ €.`; fl = { cote: `× ${cTxt(p)}` }; }
    const tab = (fin) => tabFleches(Object.assign({ l1: S.col, l2: "Prix (€)", x: xs.map(String), y: xs.map((x, i) => (i === trou && !fin ? "?" : cTxt(x * p))), aria: `Tableau de proportionnalité : ${xs.map((x, i) => `${x} pour ${i === trou ? "?" : cTxt(x * p) + " €"}`).join(", ")}` }, fin ? fl : {}));
    const u0 = autres[0];
    return { enonce: `${Maj(S.lieu)}, le prix des ${S.pl} est proportionnel à la quantité. Quel prix manque à la place du point d'interrogation ?`, figure: tab(false), figureSolution: tab(true),
      mode: "nombre", prefixe: "Prix manquant :", suffixe: "€", attendu: (X * p) / 100,
      erreurs: errP([{ valeur: (xs[u0] * p) / 100 + (X - xs[u0]), message: "Les prix n'augmentent pas de $1$ € par objet : cherche plutôt par combien on multiplie." }, { valeur: p / 100, message: `Ça, c'est le prix pour $1$. Il faut encore multiplier par $${X}$.` }, { valeur: (xs[u0] * p * X) / 100, message: `Tu as multiplié le prix de $${xs[u0]}$ ${S.pl} par $${X}$ : il fallait multiplier le prix pour $1$.` }]),
      aides: ["Cherche un lien entre la quantité de la colonne « ? » et celle d'une autre colonne (fois plus, fois moins, somme).", indice, `Le prix pour $1$ est $${cTex(p)}$ €.`],
      solution: sol };
  };

  // Photo et son agrandissement (le grand rectangle est dessiné plus grand, sans être forcément à l'échelle)
  function photosAgr(dim, autre, e, lab) {
    const fv = Math.min(e, 2.2), h1 = 116, s1 = h1 / autre, w1 = dim * s1, w0 = w1 / fv, h0 = h1 / fv, x0 = 46, x1 = x0 + w0 + 70, yb = 140, r1 = (v) => +v.toFixed(1);
    let s = `<svg class="graph photos" viewBox="0 0 320 170" role="img" aria-label="Photo de ${dim} cm sur ${autre} cm et son agrandissement de ${dim * e} cm sur ${lab}">`;
    [[x0, w0, h0, `${dim} cm`, `${autre} cm`, "Photo"], [x1, w1, h1, `${dim * e} cm`, lab, "Agrandie"]].forEach(([x, w, h, bas, cote, nom]) => {
      s += `<rect class="g-rect" x="${r1(x)}" y="${r1(yb - h)}" width="${r1(w)}" height="${r1(h)}"/><text class="g-plabel" x="${r1(x + w / 2)}" y="${yb + 15}" text-anchor="middle">${bas}</text>`;
      s += `<text class="${cote.includes("?") ? "g-mesure" : "g-plabel"}" x="${r1(x - 5)}" y="${r1(yb - h / 2 + 4)}" text-anchor="end">${cote}</text><g class="g-tick"><text x="${r1(x + w / 2)}" y="${r1(yb - h - 5)}" text-anchor="middle">${nom}</text></g>`;
    });
    return s + `</svg>`;
  }

  GEN["p6-echelle"] = function () {
    const t = rand(0, 4);
    if (t === 0 || t === 1 || t === 4) { // carte de Mayotte : distances réelles à vol d'oiseau entre deux communes
      const noms = Object.keys(VILLES_YT); let a, b, d;
      do { [a, b] = shuffle(noms).slice(0, 2); d = kmYT(a, b); } while (d < 5 || !carteLisible(a, b));
      const e = pick([2, 2, 4, 5, 10].filter((x) => d / x >= (t === 4 ? 2.5 : 1.5))), ech = `1 cm sur la carte\nreprésente ${e} km`;
      if (t === 4) { // retrouver l'échelle : la longueur sur la carte est un nombre entier de cm
        const Lc = Math.max(1, Math.round(d / e)), R = Lc * e;
        return { enonce: `Sur une carte de Mayotte, ${a} et ${b} sont à $${Lc}$ cm l'une de l'autre. En réalité, elles sont à $${R}$ km à vol d'oiseau. Combien de kilomètres représente $1$ cm sur cette carte ?`, figure: carteMayotte(a, b, `${Lc} cm`, "1 cm sur la carte\nreprésente ? km"),
          mode: "nombre", prefixe: "$1$ cm représente", suffixe: "km", attendu: e,
          erreurs: errP([{ valeur: Lc / R, message: "C'est l'inverse : divise la distance réelle (en km) par la distance sur la carte (en cm)." }, { valeur: R - Lc, message: "Les longueurs sont proportionnelles : on cherche par combien on **multiplie**, pas ce qu'on ajoute." }]),
          aides: ["On cherche ce que représente $1$ cm : c'est le retour à l'unité.", `$${Lc}$ cm sur la carte représentent $${R}$ km.`, `Calcule $${R} \\div ${Lc}$ (ou cherche : $${Lc} \\times \\ldots = ${R}$).`],
          solution: `$${R} \\div ${Lc} = ${e}$ : sur cette carte, $1$ cm représente $${e}$ km.` };
      }
      const L = Dc(Math.max(5, Math.round((d / e) * 10)), 1), R = mulD(L, Dc(e));
      if (t === 0) return { enonce: `Sur une carte de Mayotte, $1$ cm représente $${e}$ km dans la réalité. Entre ${a} et ${b}, on mesure $${tD(L)}$ cm sur la carte. Quelle est la distance réelle, à vol d'oiseau ?`, figure: carteMayotte(a, b, `${tD(L).replace("{,}", ",")} cm`, ech),
        mode: "nombre", prefixe: "Distance réelle :", suffixe: "km", attendu: vD(R),
        erreurs: errP([{ valeur: vD(L) / e, message: "De la carte à la réalité, les longueurs sont plus grandes : on **multiplie**." }, { valeur: vD(L) + e, message: "Les longueurs sont proportionnelles : on multiplie, on n'ajoute pas." }]),
        aides: ["Les distances réelles sont proportionnelles aux distances sur la carte.", `$1$ cm sur la carte $\\rightarrow$ $${e}$ km en réalité.`, `Calcule $${tD(L)} \\times ${e}$.`],
        solution: `$${tD(L)} \\times ${e} = ${tD(R)}$ : il y a environ $${tD(R)}$ km à vol d'oiseau entre ${a} et ${b}.` };
      return { enonce: `Sur une carte de Mayotte, $1$ cm représente $${e}$ km dans la réalité. ${a} et ${b} sont à $${tD(R)}$ km l'une de l'autre, à vol d'oiseau. Quelle distance les sépare sur la carte ?`, figure: carteMayotte(a, b, "? cm", ech),
        mode: "nombre", prefixe: "Sur la carte :", suffixe: "cm", attendu: vD(L),
        erreurs: errP([{ valeur: vD(R) * e, message: "Sur la carte, les longueurs sont plus petites : de la réalité à la carte, on **divise**." }, { valeur: +(vD(R) - e).toFixed(6), message: "Les longueurs sont proportionnelles : on divise, on ne soustrait pas." }]),
        aides: ["Les distances sur la carte sont proportionnelles aux distances réelles.", `$${e}$ km en réalité $\\rightarrow$ $1$ cm sur la carte.`, `Calcule $${tD(R)} \\div ${e}$.`],
        solution: `$${tD(R)} \\div ${e} = ${tD(L)}$ : sur la carte, ${a} et ${b} sont à $${tD(L)}$ cm l'une de l'autre.` };
    }
    if (t === 2) { // plan du collège, d'un village ou du port
      const [lieu, e, endroits] = pick([["du collège de Kani-Kéli", pick([2, 5, 10]), ["le portail", "la cantine", "le CDI", "le gymnase", "la vie scolaire", "le plateau sportif"]], ["du village de Bandrélé", pick([10, 20, 50]), ["la mosquée", "l'école", "la plage", "la mairie", "le terrain de foot", "le marché"]], ["du port de Longoni", pick([20, 50, 100]), ["le quai", "la grue", "l'entrepôt", "le portail", "la capitainerie"]]]);
      const [n1, n2] = shuffle(endroits).slice(0, 2), L = Dc(rand(11, 95), 1), R = mulD(L, Dc(e)), inverse = Math.random() < 0.4;
      const ech = `Échelle : 1 cm sur le plan représente ${e} m`, Lt = `${tD(L).replace("{,}", ",")} cm`;
      if (!inverse) return { enonce: `Sur le plan ${lieu}, $1$ cm représente $${e}$ m dans la réalité. Entre ${n1} et ${n2}, on mesure $${tD(L)}$ cm sur le plan. Quelle est la distance réelle ?`, figure: planEchelle(n1, n2, vD(L), Lt, ech),
        mode: "nombre", prefixe: "Distance réelle :", suffixe: "m", attendu: vD(R),
        erreurs: errP([{ valeur: vD(L) / e, message: "Du plan à la réalité, les longueurs sont plus grandes : on **multiplie**." }, { valeur: vD(L) + e, message: "Les longueurs sont proportionnelles : on multiplie, on n'ajoute pas." }]),
        aides: ["Les longueurs réelles sont proportionnelles aux longueurs sur le plan.", `$1$ cm sur le plan $\\rightarrow$ $${e}$ m en réalité.`, `Calcule $${tD(L)} \\times ${e}$.`],
        solution: `$${tD(L)} \\times ${e} = ${tD(R)}$ : ${n1} et ${n2} sont à $${tD(R)}$ m l'un de l'autre.` };
      return { enonce: `Sur le plan ${lieu}, $1$ cm représente $${e}$ m dans la réalité. En réalité, ${n1} et ${n2} sont à $${tD(R)}$ m l'un de l'autre. Quelle distance les sépare sur le plan ?`, figure: planEchelle(n1, n2, vD(L), "? cm", ech),
        mode: "nombre", prefixe: "Sur le plan :", suffixe: "cm", attendu: vD(L),
        erreurs: errP([{ valeur: vD(R) * e, message: "Sur le plan, les longueurs sont plus petites : de la réalité au plan, on **divise**." }, { valeur: +(vD(R) - e).toFixed(6), message: "Les longueurs sont proportionnelles : on divise, on ne soustrait pas." }]),
        aides: ["Les longueurs sur le plan sont proportionnelles aux longueurs réelles.", `$${e}$ m en réalité $\\rightarrow$ $1$ cm sur le plan.`, `Calcule $${tD(R)} \\div ${e}$.`],
        solution: `$${tD(R)} \\div ${e} = ${tD(L)}$ : sur le plan, il y a $${tD(L)}$ cm entre ${n1} et ${n2}.` };
    }
    const e = pick([2, 3, 4, 5, 10]), dim = rand(4, 15), autre = dim + rand(1, 6), sujet = pick(["du lagon", "d'un maki", "du Mont Choungui", "de la plage de Moya", "de la barge", "d'une tortue de N'Gouja"]);
    return { enonce: `On agrandit une photo ${sujet} : toutes les longueurs sont multipliées par le même nombre. Un côté de $${dim}$ cm devient $${dim * e}$ cm. Que devient l'autre côté, qui mesure $${autre}$ cm ?`, figure: photosAgr(dim, autre, e, "? cm"), figureSolution: photosAgr(dim, autre, e, `${autre * e} cm`),
      mode: "nombre", prefixe: "Il devient", suffixe: "cm", attendu: autre * e,
      erreurs: errP([{ valeur: autre + dim * (e - 1), message: "On n'ajoute pas le même nombre : les longueurs sont **multipliées** par le même nombre." }, { valeur: autre * (dim * e - dim), message: `Le nombre par lequel on multiplie est $${dim * e} \\div ${dim} = ${e}$, pas $${dim * e} - ${dim}$.` }]),
      aides: [`$${dim} \\times ${e} = ${dim * e}$ : les longueurs sont multipliées par $${e}$.`, `L'autre côté est aussi multiplié par $${e}$.`, `Calcule $${autre} \\times ${e}$.`],
      solution: `Les longueurs sont multipliées par $${e}$ : $${autre} \\times ${e} = ${autre * e}$ cm.` };
  };

  /* Problème « x1 donne y1 ; combien pour x2 ? », résolu par la procédure la plus simple :
     multiplier, diviser, ou passer par la valeur pour 1. Figure : le tableau, puis le tableau fléché en solution. */
  function probP(o) {
    const r6 = (v) => +v.toFixed(6), { x1, y1, x2, u } = o, y2 = r6((y1 / x1) * x2), k = r6(x2 / x1), kd = r6(x1 / x2), un = r6(y1 / x1);
    let sol, fl, ind;
    if (Number.isInteger(k) && k > 1) { ind = `$${nb(x2)} = ${nb(x1)} \\times ${k}$ : l'autre grandeur est aussi multipliée par $${k}$.`; sol = `$${nb(x2)} = ${nb(x1)} \\times ${k}$, donc $${nb(y1)} \\times ${k} = ${nb(y2)}$ ${u}.`; fl = { haut: [[0, 1, `× ${k}`]], bas: [[0, 1, `× ${k}`]] }; }
    else if (Number.isInteger(kd) && kd > 1) { ind = `$${nb(x2)} = ${nb(x1)} \\div ${kd}$ : l'autre grandeur est aussi divisée par $${kd}$.`; sol = `$${nb(x2)} = ${nb(x1)} \\div ${kd}$, donc $${nb(y1)} \\div ${kd} = ${nb(y2)}$ ${u}.`; fl = { haut: [[0, 1, `÷ ${kd}`]], bas: [[0, 1, `÷ ${kd}`]] }; }
    else { ind = `Calcule d'abord la valeur pour $1$ : $${nb(y1)} \\div ${nb(x1)} = ${nb(un)}$.`; sol = `Pour $1$ : $${nb(y1)} \\div ${nb(x1)} = ${nb(un)}$ ${u}. Pour $${nb(x2)}$ : $${nb(un)} \\times ${nb(x2)} = ${nb(y2)}$ ${u}.`; fl = { cote: `× ${nbTexte(un)}` }; }
    const tab = (fin) => tabFleches(Object.assign({ l1: o.l1, l2: o.l2, x: [nbTexte(x1), nbTexte(x2)], y: [nbTexte(y1), fin ? nbTexte(y2) : "?"], aria: `Tableau : ${nbTexte(x1)} pour ${nbTexte(y1)}, ${nbTexte(x2)} pour ?` }, fin ? fl : {}));
    // erreurs typiques, les plus vraisemblables d'abord (elles servent aussi de leurres au QCM)
    const errs = [];
    if (!fl.haut) errs.push({ valeur: un, message: `Ça, c'est la valeur pour $1$. Il faut encore multiplier par $${nb(x2)}$.` });
    if (Number.isInteger(kd) && kd > 1) errs.push({ valeur: r6(y1 * kd), message: `La première grandeur est **divisée** par $${kd}$ : l'autre aussi.` });
    if (Math.abs(x2 - x1) <= y1) errs.push({ valeur: r6(y1 + (x2 - x1)), message: "Ce n'est pas une addition : quand une grandeur est multipliée (ou divisée), l'autre aussi." });
    errs.push({ valeur: r6(y2 * 10), message: "Vérifie avec un ordre de grandeur : ton résultat est dix fois trop grand (attention à la virgule ou aux zéros)." });
    if (x1 !== 1) errs.push({ valeur: r6(y1 * x2), message: `Tu as multiplié $${nb(y1)}$ par $${nb(x2)}$ : cherche plutôt par combien on passe de $${nb(x1)}$ à $${nb(x2)}$.` });
    return { enonce: o.enonce, figure: tab(false), figureSolution: tab(true), mode: "nombre", prefixe: o.prefixe || "Réponse :", suffixe: u, attendu: y2, erreurs: errP(errs),
      aides: ["Les deux grandeurs sont proportionnelles : cherche comment on passe de la première valeur à la seconde.", ind, "Écris l'unité dans ta réponse et vérifie qu'elle est vraisemblable."], solution: sol };
  }
  const listeEt = (L) => (L.length < 2 ? L.join("") : L.slice(0, -1).join(", ") + " et " + L[L.length - 1]);

  GEN["p6-probleme"] = function () {
    const t = rand(0, 6), P1 = pick(PRENOMS6);
    if (t === 0) { // recette
      const pers = pick([4, 6, 8]), pers2 = pers * pick([2, 3, 0.5, 1.5]);
      const [plat, L] = pick([["un gâteau à la noix de coco", [["farine", rand(8, 12) * 5, "g", "Farine (g)"], ["lait de coco", rand(8, 12), "cL", "Coco (cL)"], ["sucre", rand(4, 6) * 5, "g", "Sucre (g)"]]],
        ["un mataba", [["feuilles de manioc pilées", rand(8, 12) * 10, "g", "Manioc (g)"], ["lait de coco", rand(10, 15), "cL", "Coco (cL)"]]], ["un pilao", [["riz", rand(7, 9) * 10, "g", "Riz (g)"], ["viande", rand(10, 15) * 10, "g", "Viande (g)"]]]]);
      const [ing, q1, u, col] = pick(L);
      return probP({ x1: pers, y1: q1 * pers, x2: pers2, u, l1: "Personnes", l2: col, prefixe: "Il faut",
        enonce: `Pour préparer ${plat} pour $${pers}$ personnes, ${P1} utilise ${listeEt(L.map(([n, x, uu]) => `$${nb(x * pers)}$ ${uu} de ${n}`))}. Les quantités sont proportionnelles au nombre de personnes. Quelle quantité de ${ing} faut-il pour $${pers2}$ personnes ?` });
    }
    if (t === 1) { // consommation de carburant
      const conso = rand(5, 9), d = pick([50, 100]), k = d === 50 ? pick([3, 4, 5, 7, 8]) : pick([2, 3, 4, 5]), [veh, pr] = pick([["Le taxi-brousse", "il"], ["La voiture", "elle"], ["Le scooter", "il"]]);
      const c1 = veh === "Le scooter" ? conso / 2 : conso;
      return probP({ x1: d, y1: (c1 * d) / 100, x2: d * k, u: "L", l1: "Distance (km)", l2: "Essence (L)", prefixe: "Consommation :",
        enonce: `${veh} ${deN(P1)} consomme $${nb((c1 * d) / 100)}$ L d'essence pour $${d}$ km sur les routes de Mayotte. La consommation est proportionnelle à la distance. Combien consomme-t-${pr} pour $${d * k}$ km ?` });
    }
    if (t === 2) { // salaire à l'heure
      const pH = rand(8, 12), h = rand(2, 6); let h2 = rand(3, 12); while (h2 === h || h2 % h === 0 || h % h2 === 0) h2 = rand(3, 13);
      const job = pick(["en gardant des enfants", "en aidant à la cueillette de l'ylang-ylang", "en donnant des cours de soutien", "en aidant au marché de Mamoudzou"]);
      return probP({ x1: h, y1: pH * h, x2: h2, u: "€", l1: "Durée (h)", l2: "Gain (€)", prefixe: "Gain :",
        enonce: `${P1} gagne $${pH * h}$ € en $${h}$ heures ${job}. Combien gagne-t-on en $${h2}$ heures, au même tarif ?` });
    }
    if (t === 3) { // location : retrouver une durée (division)
      const pH = rand(4, 9), h2 = rand(2, 8), T = pH * h2;
      const tab = (fin) => tabFleches({ l1: "Durée (h)", l2: "Prix (€)", x: ["1", fin ? String(h2) : "?"], y: [String(pH), String(T)], haut: fin ? [[0, 1, `× ${h2}`]] : [], bas: fin ? [[0, 1, `× ${h2}`]] : [], aria: `Tableau : 1 heure coûte ${pH} €, ? heures coûtent ${T} €` });
      return { enonce: `À la plage de N'Gouja, la location d'un kayak coûte $${pH}$ € de l'heure, sans autres frais. ${P1} a payé $${T}$ €. Pendant combien d'heures le kayak a-t-il été loué ?`, figure: tab(false), figureSolution: tab(true),
        mode: "nombre", prefixe: "Durée :", suffixe: "h", attendu: h2,
        erreurs: errP([{ valeur: T - pH, message: "On ne soustrait pas : cherche combien de fois $" + pH + "$ € il y a dans $" + T + "$ €." }, { valeur: T * pH, message: "On ne multiplie pas : on cherche combien de fois $" + pH + "$ € il y a dans $" + T + "$ €, c'est une division." }]),
        aides: ["Chaque heure coûte le même prix : le prix est proportionnel à la durée.", `Combien de fois $${pH}$ € y a-t-il dans $${T}$ € ?`, `Calcule $${T} \\div ${pH}$.`],
        solution: `$${T} \\div ${pH} = ${h2}$ : le kayak a été loué $${h2}$ heures. Vérification : $${h2} \\times ${pH} = ${T}$ €.` };
    }
    if (t === 4) { // tissu au mètre, longueurs décimales
      const L1 = pick([0.5, 1.5, 2.5]), k = L1 === 0.5 ? pick([3, 4, 5]) : pick([2, 3, 4]), p = rand(6, 16) * 50;
      return probP({ x1: L1, y1: (L1 * p) / 100, x2: L1 * k, u: "€", l1: "Tissu (m)", l2: "Prix (€)", prefixe: "Prix :",
        enonce: `Au marché de Mamoudzou, ${P1} achète du tissu pour coudre un salouva. $${nb(L1)}$ m de tissu coûtent $${nb((L1 * p) / 100)}$ €. Le prix est proportionnel à la longueur. Combien coûtent $${nb(L1 * k)}$ m de ce tissu ?` });
    }
    if (t === 5) { // marche à vitesse constante
      const m = rand(12, 18), d1 = rand(2, 4); let d2 = rand(2, 8); while (d2 === d1) d2 = rand(2, 8);
      return probP({ x1: d1, y1: m * d1, x2: d2, u: "min", l1: "Distance (km)", l2: "Durée (min)", prefixe: "Durée :",
        enonce: `Pour monter au Mont Choungui, ${P1} marche toujours au même rythme : $${d1}$ km en $${m * d1}$ minutes. Combien de minutes lui faut-il pour $${d2}$ km à ce rythme ?` });
    }
    const v = rand(12, 25) * 10, j1 = pick([2, 3, 4]); let j2 = rand(2, 10); while (j2 === j1) j2 = rand(2, 10);
    return probP({ x1: j1, y1: v * j1, x2: j2, u: "L", l1: "Durée (jours)", l2: "Eau (L)", prefixe: "Consommation :",
      enonce: `À Pamandzi, la famille ${deN(P1)} consomme $${nb(v * j1)}$ L d'eau en $${j1}$ jours, toujours au même rythme. Combien de litres consomme-t-elle en $${j2}$ jours ?` });
  };

  // Figures du cours, du QCM et de la fiche méthode
  const flP = (L) => ({ haut: L, bas: L });
  FIGURES["p6-cours-pommes"] = () => tabFleches(Object.assign({ l1: "Masse (kg)", l2: "Prix (€)", x: ["2", "6"], y: ["5", "15"], aria: "2 kg coûtent 5 € et 6 kg coûtent 15 € : la masse et le prix sont multipliés par 3" }, flP([[0, 1, "× 3"]])));
  FIGURES["p6-cours-tours"] = () => tabFleches({ l1: "Nombre de tours", l2: "Prix (€)", x: ["2", "4", "6"], y: ["5", "10", "15"], cote: "× 2,5", aria: "Tableau de proportionnalité : 2, 4 et 6 tours coûtent 5, 10 et 15 € ; on multiplie toujours par 2,5 (prix d'un tour)" });
  FIGURES["p6-cours-effaceurs"] = () => tabFleches(Object.assign({ l1: "Effaceurs", l2: "Prix (€)", x: ["3", "6", "12"], y: ["4,50", "9", "18"], aria: "6 effaceurs coûtent 9 € ; divisé par 2 : 3 effaceurs pour 4,50 € ; multiplié par 2 : 12 effaceurs pour 18 €" }, flP([[1, 0, "÷ 2"], [1, 2, "× 2"]])));
  FIGURES["p6-cours-somme"] = () => tabFleches(Object.assign({ l1: "Effaceurs", l2: "Prix (€)", x: ["6", "3", "9"], y: ["9", "4,50", "13,50"], aria: "6 effaceurs plus 3 effaceurs font 9 effaceurs : 9 € plus 4,50 € font 13,50 €" }, flP([[0, 2, "+", 2], [1, 2, "+", 1]])));
  FIGURES["p6-cours-unite"] = () => tabFleches(Object.assign({ l1: "Effaceurs", l2: "Prix (€)", x: ["6", "1", "5"], y: ["9", "1,50", "7,50"], aria: "Retour à l'unité : 6 effaceurs pour 9 €, divisé par 6 : 1 effaceur pour 1,50 €, multiplié par 5 : 5 effaceurs pour 7,50 €" }, flP([[0, 1, "÷ 6"], [1, 2, "× 5"]])));
  FIGURES["p6-cours-carte"] = () => carteMayotte("Mamoudzou", "Sada", "7,7 cm", "1 cm sur la carte\nreprésente 2 km");
  FIGURES["p6-methode-plan"] = () => planEchelle("le portail", "la cantine", 6.5, "6,5 cm", "Échelle : 1 cm sur le plan représente 20 m");
  FIGURES["p6-qcm-mangues"] = () => tabFleches({ l1: "Mangues", l2: "Prix (€)", x: ["2", "5", "8"], y: ["1,20", "3", "5"], aria: "Tableau : 2 mangues pour 1,20 €, 5 mangues pour 3 €, 8 mangues pour 5 €" });
  FIGURES["p6-qcm-riz"] = () => tabFleches({ l1: "Riz (kg)", l2: "Prix (€)", x: ["4", "12"], y: ["7,20", "?"], haut: [[0, 1, "× 3"]], aria: "Tableau : 4 kg de riz coûtent 7,20 € ; 12 kg, trois fois plus, coûtent ?" });
  FIGURES["p6-qcm-plan"] = () => planEchelle("le CDI", "le gymnase", 4.5, "4,5 cm", "Échelle : 1 cm sur le plan représente 10 m");
  FIGURES["p6-qcm-photo"] = () => photosAgr(10, 15, 3, "? cm");

  /* =====================================================================
     6e, chapitre 6 : pourcentages (préfixe t6-)
     Programme : sens d'un pourcentage (« pour 100 »), écritures (fraction, décimal, pourcentage),
     calculer une proportion et l'exprimer en pourcentage dans des cas simples, appliquer un pourcentage.
     ===================================================================== */
  FIGURES["t6-quadrillage"] = () => quadrillage(10, 3).replace(/rectangle colorié de 10 dixièmes sur 3 dixièmes/, "30 petits carrés coloriés sur 100");
  /* Barre « 100 % » : le tout (texte au-dessus), une part de p % coloriée (texte « part »), graduée en n parts égales si n ;
     o = { p, tout, part, n, reste (texte sur la partie non coloriée), retire (part rayée : remise) } */
  function barrePct(o) {
    const x0 = 22, w = 276, y = 36, h = 30, xp = +(x0 + (w * Math.min(o.p, 100)) / 100).toFixed(1);
    let s = `<svg class="graph bandes" viewBox="0 0 320 104" role="img" aria-label="Barre représentant 100 % (${o.tout}) ; une part de ${o.p} % est coloriée">`;
    s += `<rect class="${o.retire ? "g-barre-plus" : "g-aire g-colorie"}" x="${x0}" y="${y}" width="${+(xp - x0).toFixed(1)}" height="${h}"/>`;
    if (o.n) { s += `<g class="g-grid">`; for (let i = 1; i < o.n; i++) s += `<line x1="${+(x0 + (w * i) / o.n).toFixed(1)}" y1="${y}" x2="${+(x0 + (w * i) / o.n).toFixed(1)}" y2="${y + h}"/>`; s += `</g>`; }
    s += `<rect class="g-unite" x="${x0}" y="${y}" width="${w}" height="${h}"/>`;
    s += `<path class="g-accolade" d="M${x0} ${y - 6} V${y - 12} H${x0 + w} V${y - 6}"/><text class="g-plabel" x="${x0 + w / 2}" y="${y - 16}" text-anchor="middle">${o.tout}</text>`;
    if (o.part) s += `<text class="g-mesure" x="${+((x0 + xp) / 2).toFixed(1)}" y="${y + h / 2 + 4}" text-anchor="middle">${o.part}</text>`;
    if (o.reste) s += `<text class="g-mesure" x="${+((xp + x0 + w) / 2).toFixed(1)}" y="${y + h / 2 + 4}" text-anchor="middle">${o.reste}</text>`;
    s += `<g class="g-tick"><text x="${x0}" y="${y + h + 16}" text-anchor="middle">0 %</text>${o.p >= 9 && o.p <= 91 ? `<text x="${xp}" y="${y + h + 16}" text-anchor="middle">${o.pLab || o.p + " %"}</text>` : ""}<text x="${x0 + w}" y="${y + h + 16}" text-anchor="middle">100 %</text></g>`;
    return s + `</svg>`;
  }
  FIGURES["t6-cours-barre"] = () => barrePct({ p: 25, n: 4, tout: "40 €", part: "?" });
  FIGURES["t6-cours-proportion"] = () => barrePct({ p: 36, tout: "25 élèves", part: "9 élèves", n: 25 });
  FIGURES["t6-cours-remise"] = () => barrePct({ p: 25, n: 4, tout: "24 €", part: "remise", reste: "prix payé", retire: true });
  FIGURES["t6-qcm-proportion"] = () => barrePct({ p: 36, tout: "25 élèves", part: "9 élèves", n: 25, pLab: "? %" });

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
    const rep = (p * N) / 100, parts = { 50: 2, 25: 4, 75: 4, 10: 10, 20: 5, 5: 20 }[p];
    return { enonce: `Calcule mentalement $${p}$ % de $${ecrit(N)}$${u ? " " + u : objet}.`, figure: parts ? barrePct({ p, n: parts, tout: `${nbTexte(N)}${u ? " " + u : objet}`, part: "?" }) : undefined, mode: "nombre", prefixe: "Résultat :", suffixe: u || objet.trim(), attendu: rep,
      erreurs: [{ valeur: N - rep, message: `Ça, c'est ce qui reste. On demande $${p}$ % de $${N}$.` }, { valeur: N - p, message: `On ne retire pas $${p}$ au nombre : $${p}$ %, c'est ${regle}.` }],
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
    return { enonce: ctx, figure: barrePct({ p, tout: `${nbTexte(N)} ${u}`, part: "?" }), mode: "nombre", prefixe: "Réponse :", suffixe: u, attendu: rep,
      erreurs: [{ valeur: p * N, message: "Il faut aussi diviser par $100$." }, { valeur: N - rep, message: "Ça, c'est le reste du total." }],
      aides: [`Prendre $${p}$ %, c'est multiplier par $${fr(p, 100)}$.`, `Calcule $${fr(p, 100)} \\times ${N}$, ou $${nb(p / 100)} \\times ${N}$.`, `Tu peux commencer par $${N} \\div 100 = ${nb(N / 100)}$, puis multiplier par $${p}$.`],
      solution: `$${p}$ % de $${ecrit(N)}$ : $${fr(p, 100)} \\times ${ecrit(N)} = ${nb(p / 100)} \\times ${ecrit(N)} = ${nb(rep)}$ ${u}.` };
  };

  GEN["t6-proportion"] = function () {
    const tot = pick([10, 20, 25, 50, 200, 500, 1000, 4, 5]), k = 100 / tot, part = rand(1, tot - 1);
    const p = part * k;
    if (!Number.isInteger(p)) return GEN["t6-proportion"]();
    const P1 = pick(PRENOMS6), pl = part > 1;
    const [ctx, u] = pick(tot <= 10 ? [
      [`Sur $${tot}$ tirs au but, ${P1} en réussit $${part}$. Quel est son pourcentage de réussite ?`, "tirs"],
      [`Un questionnaire compte $${tot}$ questions. ${P1} en réussit $${part}$. Quel pourcentage des questions a été réussi ?`, "questions"],
      [`Le club de ${pick(["Dzaoudzi", "Sada", "Bandrélé", "M'tsamboro", "Kani-Kéli", "Chiconi"])} engage $${tot}$ pirogues dans une course sur le lagon ; $${part}$ ${pl ? "arrivent" : "arrive"} avant midi. Quel pourcentage de ses pirogues cela représente-t-il ?`, "pirogues"]
    ] : tot <= 50 ? [
      tot < 50 ? [`Dans une classe de $${tot}$ élèves du collège de ${pick(["Sada", "Koungou", "Dembéni", "Chiconi", "Pamandzi"])}, $${part}$ ${pl ? "font" : "fait"} de la natation. Quel pourcentage des élèves fait de la natation ?`, "élèves"] : [`Sur $${tot}$ élèves de 6e interrogés à ${pick(["Sada", "Koungou", "Dembéni", "Chiconi", "Pamandzi"])}, $${part}$ ${pl ? "font" : "fait"} de la natation. Quel pourcentage des élèves interrogés cela représente-t-il ?`, "élèves"],
      [`Sur $${tot}$ mangues d'un cageot du marché de Mamoudzou, $${part}$ ${pl ? "sont mûres" : "est mûre"}. Quel est le pourcentage de mangues mûres ?`, "mangues"],
      [`Sur $${tot}$ tirs au but, ${P1} en réussit $${part}$. Quel est son pourcentage de réussite ?`, "tirs"]
    ] : [
      [`Sur $${nb(tot)}$ personnes interrogées à Mamoudzou, $${nb(part)}$ ${pl ? "prennent" : "prend"} la barge chaque jour. Quel pourcentage des personnes interrogées cela représente-t-il ?`, "personnes"],
      [`Une pépinière de Coconi a planté $${nb(tot)}$ jeunes arbres ; $${nb(part)}$ ${pl ? "sont des manguiers" : "est un manguier"}. Quel est le pourcentage de manguiers ?`, "arbres"],
      [`Sur $${nb(tot)}$ tortues observées sur les plages de Mayotte, $${nb(part)}$ ${pl ? "étaient" : "était"} des tortues vertes. Quel pourcentage cela représente-t-il ?`, "tortues"]
    ]);
    return { enonce: ctx, figure: barrePct({ p, tout: `${nbTexte(tot)} ${u}`, part: `${part}`, n: tot <= 25 ? tot : 0, pLab: "? %" }), figureSolution: barrePct({ p, tout: `${nbTexte(tot)} ${u}`, part: `${part}`, n: tot <= 25 ? tot : 0 }), mode: "nombre", prefixe: "Pourcentage :", suffixe: "%", attendu: p,
      erreurs: [{ valeur: part, message: `$${part}$ sur $${tot}$, ce n'est pas $${part}$ sur $100$ : ramène-toi à $100$.` }, { valeur: 100 - p, message: "Ça, c'est le pourcentage de ceux qui restent." }],
      aides: ["Un pourcentage, c'est une proportion « sur $100$ ».", tot < 100 ? `Si l'on avait $100$ ${u} au lieu de $${tot}$, on aurait $${k}$ fois plus.` : `Si l'on avait $100$ ${u} au lieu de $${tot}$, on aurait $${tot / 100}$ fois moins.`, `$${fr(part, tot)} = ${fr(p, 100)}$.`],
      solution: `$${fr(part, tot)} = ${fr(`${part} ${tot < 100 ? "\\times" : "\\div"} ${tot < 100 ? k : tot / 100}`, `${tot} ${tot < 100 ? "\\times" : "\\div"} ${tot < 100 ? k : tot / 100}`)} = ${fr(p, 100)}$ : c'est $${p}$ %.` };
  };

  GEN["t6-probleme"] = function () {
    const t = rand(0, 2);
    if (t === 0) { // remise
      const p = pick([10, 20, 25, 30, 50]), P = rand(4, 40) * (p === 25 ? 4 : p === 30 ? 10 : 5), r = (p * P) / 100, fin = Math.random() < 0.5;
      const art = pick(["un tee-shirt", "un salouva", "un ballon de foot", "un sac de sport", "une paire de sandales", "un maillot"]);
      return { enonce: `Pendant les soldes à Mamoudzou, ${art} à $${P}$ € est vendu avec une remise de $${p}$ %. ${fin ? "Combien paie-t-on ?" : "De combien est la remise, en euros ?"}`, figure: barrePct({ p, n: { 10: 10, 20: 5, 25: 4, 30: 10, 50: 2 }[p], tout: `${P} €`, part: fin ? "remise" : "?", reste: fin ? "?" : "", retire: true }), mode: "nombre", prefixe: fin ? "Prix payé :" : "Remise :", suffixe: "€", attendu: fin ? P - r : r,
        erreurs: fin ? [{ valeur: r, message: "Ça, c'est la remise : il faut la retirer du prix de départ." }, { valeur: P - p, message: `On ne retire pas $${p}$ €, mais $${p}$ % du prix.` }] : [{ valeur: P - r, message: "Ça, c'est le prix payé. On demande la remise." }, { valeur: p, message: `La remise n'est pas $${p}$ € : c'est $${p}$ % du prix.` }],
        aides: [`Calcule d'abord $${p}$ % de $${P}$ €.`, `$${p}$ % de $${P}$ $= ${nb(r)}$ €.`, fin ? `Le prix payé est $${P} - ${nb(r)}$.` : "C'est la réponse."],
        solution: `Remise : $${p}$ % de $${P}$ $= ${nb(r)}$ €.${fin ? ` Prix payé : $${P} - ${nb(r)} = ${nb(P - r)}$ €.` : ""}` };
    }
    if (t === 1) { // comparer deux proportions
      const a = pick([10, 20, 25, 50]), b = pick([10, 20, 25, 50]);
      let pa = rand(1, a - 1), pb = rand(1, b - 1);
      const qa = (pa * 100) / a, qb = (pb * 100) / b;
      if (!Number.isInteger(qa) || !Number.isInteger(qb)) return GEN["t6-probleme"]();
      const rep = qa === qb ? 2 : qa > qb ? 0 : 1;
      return { enonce: `En 6e A, $${pa}$ élèves sur $${a}$ viennent à pied. En 6e B, $${pb}$ élèves sur $${b}$. Dans quelle classe la proportion d'élèves venant à pied est-elle la plus grande ?`, figure: bandesFr([{ n: a, col: 0, lab: "6e A" }, { n: b, col: 0, lab: "6e B" }]), figureSolution: bandesFr([{ n: a, col: pa, lab: "6e A" }, { n: b, col: pb, lab: "6e B" }]), mode: "choix", choix: ["En 6e A", "En 6e B", "C'est la même proportion"], attendu: rep,
        aides: ["Pour comparer, exprime chaque proportion en pourcentage.", `6e A : $${fr(pa, a)} = ${fr(qa, 100)}$.`, `6e B : $${fr(pb, b)} = ${fr(qb, 100)}$.`],
        solution: `6e A : $${qa}$ % ; 6e B : $${qb}$ %. ${["La proportion est plus grande en 6e A.", "La proportion est plus grande en 6e B.", "C'est la même proportion."][rep]}` };
    }
    // reste après pourcentage
    const p = pick([10, 20, 25, 40, 50, 60, 75, 80]), N = rand(2, 30) * (p === 25 || p === 75 ? 4 : 10);
    return { enonce: `Au collège de ${pick(["Dembéni", "Sada", "Koungou", "Pamandzi", "Chirongui", "Kani-Kéli"])}, $${N}$ élèves de 6e participent au cross. $${p}$ % courent $2$ km, les autres courent $1$ km. Combien d'élèves courent $1$ km ?`, figure: barrePct({ p, tout: `${N} élèves`, part: "2 km", reste: "1 km : ?", n: { 10: 10, 20: 5, 25: 4, 40: 5, 50: 2, 60: 5, 75: 4, 80: 5 }[p] }), mode: "nombre", prefixe: "Élèves :", attendu: N - (p * N) / 100,
      erreurs: [{ valeur: (p * N) / 100, message: "Ça, ce sont les élèves qui courent $2$ km." }, { valeur: N - p, message: `On ne retire pas $${p}$ élèves : on retire $${p}$ % de $${N}$.` }],
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

  // Balance en équilibre : une expression (texte simple) sur chaque plateau
  function balance(g, d) {
    let s = `<svg class="graph balance" viewBox="0 0 320 150" role="img" aria-label="Balance en équilibre : ${g} d'un côté, ${d} de l'autre">`;
    s += `<path d="M146 142 h28 l-8 -10 h-12 z" style="fill:var(--doux)"/><line x1="160" y1="132" x2="160" y2="34" style="stroke:var(--encre);stroke-width:3"/><line x1="70" y1="34" x2="250" y2="34" style="stroke:var(--encre);stroke-width:3"/><circle cx="160" cy="34" r="5" style="fill:var(--encre)"/>`;
    [[78, g], [242, d]].forEach(([cx, t]) => {
      s += `<line x1="${cx - 8}" y1="34" x2="${cx - 58}" y2="104" style="stroke:var(--doux)"/><line x1="${cx + 8}" y1="34" x2="${cx + 58}" y2="104" style="stroke:var(--doux)"/><path d="M${cx - 66} 104 h132 l-12 10 h-108 z" style="fill:var(--doux)"/>`;
      s += `<rect class="g-rect" x="${cx - 54}" y="74" width="108" height="28" rx="4"/><text class="g-clabel" x="${cx}" y="93" text-anchor="middle">${t}</text>`;
    });
    return s + `</svg>`;
  }
  // Programme de calcul vu comme une machine : entrée → opérations → sortie (textes simples)
  function machine(entree, ops, sortie) {
    const L = [[entree, 1], ...ops.map((o) => [o, 0]), [sortie, 1]], wN = 48, wO = 56, gap = 18, W = L.reduce((s, [, n]) => s + (n ? wN : wO), 0) + gap * (L.length - 1), x0 = (320 - W) / 2;
    let s = `<svg class="graph machine" viewBox="0 0 320 76" role="img" aria-label="Programme de calcul : ${L.map((x) => x[0]).join(" puis ")}">`, x = x0;
    L.forEach(([t, n], k) => {
      const w = n ? wN : wO;
      s += n ? `<rect class="g-rect" x="${+x.toFixed(1)}" y="20" width="${w}" height="32" rx="6"/>` : `<rect x="${+x.toFixed(1)}" y="20" width="${w}" height="32" rx="16" style="fill:var(--ylang);fill-opacity:0.25;stroke:var(--ylang);stroke-width:1.5"/>`;
      s += `<text class="${t === "?" ? "g-mesure" : "g-clabel"}" x="${+(x + w / 2).toFixed(1)}" y="41" text-anchor="middle">${t}</text>`;
      if (k < L.length - 1) s += `<line class="g-accolade" x1="${+(x + w + 2).toFixed(1)}" y1="36" x2="${+(x + w + gap - 5).toFixed(1)}" y2="36"/><path d="M${+(x + w + gap - 1).toFixed(1)} 36 l-6 -4 v8z" style="fill:var(--encre)"/>`;
      x += w + gap;
    });
    return s + `<g class="g-tick"><text x="${x0 + wN / 2}" y="68" text-anchor="middle">départ</text><text x="${+(x - gap - wN / 2).toFixed(1)}" y="68" text-anchor="middle">résultat</text></g></svg>`;
  }
  // Début d'une suite : nombres dans des cases, reliés par des flèches ; « ? » pour l'inconnu
  function suiteCases(vals, labFl) {
    const n = vals.length, w = Math.min(52, (300 - (n - 1) * 12) / n), gap = 12, x0 = (320 - n * w - (n - 1) * gap) / 2;
    let s = `<svg class="graph suite-nb" viewBox="0 0 320 84" role="img" aria-label="Suite de nombres : ${vals.join(" ; ")}">`;
    vals.forEach((v, k) => {
      const x = x0 + k * (w + gap);
      s += `<rect class="${v === "?" ? "g-vide" : "g-rect"}" x="${+x.toFixed(1)}" y="38" width="${+w.toFixed(1)}" height="30" rx="5" style="${v === "?" ? "stroke:var(--ylang);stroke-width:2" : ""}"/><text class="${v === "?" ? "g-mesure" : "g-clabel"}" x="${+(x + w / 2).toFixed(1)}" y="58" text-anchor="middle">${v}</text>`;
      if (k < n - 1) { const xa = x + w / 2 + 4, xb = x + w + gap + w / 2 - 4, xm = (xa + xb) / 2; s += `<path class="g-accolade" d="M${+xa.toFixed(1)} 36 Q${+xm.toFixed(1)} 14 ${+xb.toFixed(1)} 36"/><path d="M${+xb.toFixed(1)} 36 l-7 -3 l3 -6z" style="fill:var(--encre)"/>`; if (labFl) s += `<text class="g-mesure" x="${+xm.toFixed(1)}" y="17" text-anchor="middle">${labFl}</text>`; }
    });
    return s + `</svg>`;
  }
  FIGURES["a6-cours-balance"] = () => balance("178 − …", "6 × 8");
  FIGURES["a6-cours-machine"] = () => machine("7", ["× 3", "+ 5"], "26");
  FIGURES["a6-cours-suite"] = () => suiteCases(["3", "7", "11", "15", "?"], "+ 4");
  FIGURES["a6-qcm-balance"] = () => balance("4 × …", "50 − 14");
  FIGURES["a6-qcm-machine"] = () => machine("?", ["+ 6", "× 4"], "48");
  FIGURES["a6-qcm-suite"] = () => suiteCases(["2", "6", "18", "54", "?"]);

  GEN["a6-trous"] = function () {
    const t = rand(0, 3);
    let gauche, rep, droite, val;
    const a = rand(3, 12), b = rand(3, 12); val = a * b;
    if (t === 0) { const x = rand(val + 10, val + 200); rep = x - val; gauche = `${x} - \\ldots`; droite = `${a} \\times ${b}`; }
    else if (t === 1) { const y = rand(5, val - 1 > 5 ? val - 1 : 30); rep = val - y; if (rep <= 0) return GEN["a6-trous"](); gauche = `\\ldots + ${y}`; droite = `${a} \\times ${b}`; }
    else if (t === 2) { const k = rand(2, 9), r = rand(2, 15), s2 = k * r; const y = rand(1, 40); rep = r; gauche = `${k} \\times \\ldots`; droite = `${s2 + y} - ${y}`; val = s2; }
    else { const k = rand(2, 9), q = rand(3, 20), y = rand(5, 60); rep = k * q; gauche = `\\ldots \\div ${k}`; droite = `${q + y} - ${y}`; val = q; }
    const g0 = +gauche.split(" ")[0], txtTex = (s) => s.replace(/\\ldots/g, "…").replace(/\\times/g, "×").replace(/\\div/g, "÷").replace(/ - /g, " − ");
    const faux = [t === 0 ? { valeur: g0 + val, message: `On cherche ce qu'on retire à $${g0}$ pour obtenir $${val}$ : c'est une soustraction, $${g0} - ${val}$.` } : t === 1 ? { valeur: val + +gauche.split(" + ")[1], message: "On cherche ce qu'il faut ajouter : on soustrait, on n'additionne pas." } : t === 2 ? { valeur: val * +gauche.split(" ")[0], message: `On cherche le nombre qui, multiplié par $${gauche.split(" ")[0]}$, donne $${val}$ : on divise.` } : { valeur: val + +gauche.split("\\div ")[1], message: "On cherche le nombre qui, divisé, donne ce résultat : on multiplie." }];
    return { enonce: `Complète l'égalité : $${gauche} = ${droite}$. La balance est en équilibre : les deux plateaux « valent » autant.`, figure: balance(txtTex(gauche), txtTex(droite)), mode: "nombre", prefixe: "Le nombre manquant est", attendu: rep,
      erreurs: [{ valeur: val, message: "Ça, c'est le résultat du membre de droite. Le signe $=$ dit que les deux côtés valent la même chose : il faut encore trouver le nombre manquant." }, ...faux],
      aides: ["Le signe $=$ veut dire : « les deux côtés valent le même nombre ».", `Calcule d'abord le côté que tu connais : $${droite} = ${val}$.`, `Cherche le nombre qui rend le côté gauche égal à $${val}$.`],
      solution: `$${droite} = ${val}$. ${t === 0 ? `$${gauche.split(" ")[0]} - ${rep} = ${val}$` : t === 1 ? `$${rep} + ${gauche.split(" + ")[1]} = ${val}$` : t === 2 ? `$${gauche.split(" ")[0]} \\times ${rep} = ${val}$` : `$${rep} \\div ${gauche.split("\\div ")[1]} = ${val}$`}, donc le nombre manquant est $${rep}$.` };
  };

  GEN["a6-programme"] = function () {
    const t = rand(0, 2), m = rand(2, 9), p = rand(1, 20), avant = Math.random() < 0.5;
    // programme : soit (x × m) + p, soit (x + p) × m
    const etapes = avant ? [`Multiplie-le par $${m}$.`, `Ajoute $${p}$.`] : [`Ajoute $${p}$.`, `Multiplie le résultat par $${m}$.`];
    const f = (x) => (avant ? x * m + p : (x + p) * m), prog = `« Choisis un nombre. ${etapes.join(" ")} »`, ops = avant ? [`× ${m}`, `+ ${p}`] : [`+ ${p}`, `× ${m}`];
    if (t === 0) { const x = Math.random() < 0.3 ? Dc(rand(11, 99), 1) : Dc(rand(1, 30)); const r = avant ? addD(mulD(x, Dc(m)), Dc(p)) : mulD(addD(x, Dc(p)), Dc(m));
      return { enonce: `Voici un programme de calcul : ${prog} Quel résultat obtient-on avec $${tD(x)}$ ?`, figure: machine(nbTexte(vD(x)), ops, "?"), mode: "nombre", prefixe: "Résultat :", attendu: vD(r),
        erreurs: [{ valeur: +((avant ? (vD(x) + p) * m : vD(x) * m + p)).toFixed(6), message: "Respecte l'ordre des étapes du programme." }, { valeur: +((vD(x) + p + m)).toFixed(6), message: `Une des étapes est une multiplication par $${m}$, pas une addition.` }],
        aides: ["Applique les étapes **dans l'ordre**.", avant ? `$${tD(x)} \\times ${m} = ${tD(mulD(x, Dc(m)))}$.` : `$${tD(x)} + ${p} = ${tD(addD(x, Dc(p)))}$.`, "Fais ensuite la deuxième étape."],
        solution: avant ? `$${tD(x)} \\times ${m} = ${tD(mulD(x, Dc(m)))}$, puis $${tD(mulD(x, Dc(m)))} + ${p} = ${tD(r)}$.` : `$${tD(x)} + ${p} = ${tD(addD(x, Dc(p)))}$, puis $${tD(addD(x, Dc(p)))} \\times ${m} = ${tD(r)}$.` }; }
    if (t === 1) { const x = rand(1, 30), r = f(x);
      return { enonce: `Voici un programme de calcul : ${prog} On a obtenu $${r}$. Quel nombre avait-on choisi ?`, figure: machine("?", ops, String(r)), mode: "nombre", prefixe: "Nombre choisi :", attendu: x,
        erreurs: [{ valeur: avant ? (r + p) / m : r / m + p, message: "En remontant le programme, on utilise les opérations **contraires** : soustraire au lieu d'ajouter, diviser au lieu de multiplier." }, { valeur: avant ? (r / m) - p : (r - p) / m, message: "On remonte le programme **en partant de la fin** : on défait d'abord la dernière étape." }].filter((e) => Number.isInteger(e.valeur) && e.valeur > 0),
        aides: ["Remonte le programme à l'envers, avec les opérations contraires.", avant ? `Le contraire de « ajouter $${p}$ », c'est « soustraire $${p}$ » : $${r} - ${p} = ${r - p}$.` : `Le contraire de « multiplier par $${m}$ », c'est « diviser par $${m}$ » : $${r} \\div ${m} = ${r / m}$.`, avant ? `Puis divise par $${m}$.` : `Puis soustrais $${p}$.`],
        solution: avant ? `$${r} - ${p} = ${r - p}$, puis $${r - p} \\div ${m} = ${x}$. Vérification : $${x} \\times ${m} + ${p} = ${r}$.` : `$${r} \\div ${m} = ${r / m}$, puis $${r / m} - ${p} = ${x}$. Vérification : $(${x} + ${p}) \\times ${m} = ${r}$.` }; }
    // expression générale : prix de N objets + livraison
    const [obj, prix, frais, phrase, fixe] = pick([["tee-shirts", rand(8, 15), rand(3, 8), (a, b) => `Sur un site, des tee-shirts coûtent $${a}$ € pièce, et la livraison coûte $${b}$ € quelle que soit la commande. $N$ désigne le nombre de tee-shirts achetés.`, "la livraison"],
      ["livres", rand(5, 12), rand(2, 6), (a, b) => `À la librairie de Mamoudzou, un livre coûte $${a}$ € et l'emballage cadeau coûte $${b}$ € pour toute la commande. $N$ désigne le nombre de livres achetés.`, "l'emballage"],
      ["heures", rand(4, 9), rand(5, 10), (a, b) => `À N'Gouja, la location d'un kayak coûte $${a}$ € de l'heure, plus $${b}$ € pour la location du gilet, une seule fois. $N$ désigne le nombre d'heures de location.`, "la location du gilet"],
      ["km", rand(1, 2), rand(2, 4), (a, b) => `Un taxi-brousse coûte $${b}$ € de prise en charge, plus $${a}$ € par kilomètre. $N$ désigne le nombre de kilomètres parcourus.`, "la prise en charge"]]), N = rand(2, 9);
    const bon = `$(N \\times ${prix}) + ${frais}$`;
    const c = melange(bon, [`$(N + ${prix}) \\times ${frais}$`, `$N \\times (${prix} + ${frais})$`, `$(N \\times ${frais}) + ${prix}$`, `$N + ${prix} + ${frais}$`]);
    return { enonce: `${phrase(prix, frais)} Quelle écriture donne le prix à payer, en euros ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Essaie avec un nombre : par exemple $N = 2$. Combien paie-t-on ?", `Pour $N = 2$ : $2 \\times ${prix} = ${2 * prix}$ €, plus ${fixe}.`, `${Maj(fixe)} n'est ${fixe.startsWith("l'emballage") ? "payé" : "payée"} qu'une fois.`],
      solution: `On paie $N$ fois $${prix}$ €, plus une seule fois $${frais}$ € : ${bon}. Par exemple, pour $N = ${N}$ : $(${N} \\times ${prix}) + ${frais} = ${N * prix + frais}$ €.` };
  };

  GEN["a6-suite"] = function () {
    const t = rand(0, 2), d = rand(2, 12), u0 = rand(1, 30), mult = Math.random() < 0.25;
    const terme = (k) => (mult ? u0 * 2 ** k : u0 + d * k), vus = [0, 1, 2, 3].map(terme);
    if (mult && u0 > 12) return GEN["a6-suite"]();
    const liste = vus.map(String).join(" ; ");
    if (t === 0) return { enonce: `Voici le début d'une suite de nombres : $${liste}$ ; … Quel est le nombre suivant ?`, figure: suiteCases([...vus.map(String), "?"]), mode: "nombre", prefixe: "Nombre suivant :", attendu: terme(4),
      erreurs: mult ? [{ valeur: vus[3] + (vus[3] - vus[2]), message: "On n'ajoute pas toujours le même nombre : ici, chaque nombre est le double du précédent." }, { valeur: vus[3] + 2, message: "Ce n'est pas « $+ 2$ », c'est « $\\times 2$ »." }] : [{ valeur: vus[3] + d + 1, message: `Vérifie l'écart : on ajoute $${d}$ à chaque fois.` }, { valeur: vus[3] * 2, message: `On n'a pas multiplié : on a ajouté $${d}$ à chaque fois.` }],
      aides: ["Compare deux nombres qui se suivent : que fait-on pour passer de l'un à l'autre ?", mult ? "On ne fait pas toujours la même addition : regarde plutôt les multiplications." : `$${vus[1]} - ${vus[0]} = ${d}$ et $${vus[2]} - ${vus[1]} = ${d}$.`, mult ? "Chaque nombre est le double du précédent." : `On ajoute $${d}$ à chaque fois.`],
      solution: mult ? `Chaque nombre est le double du précédent : $${vus[3]} \\times 2 = ${terme(4)}$.` : `On ajoute $${d}$ à chaque fois : $${vus[3]} + ${d} = ${terme(4)}$.` };
    if (t === 1) {
      const bon = mult ? "On multiplie par $2$" : `On ajoute $${d}$`;
      const c = melange(bon, mult ? [`On ajoute $${vus[1] - vus[0]}$`, "On multiplie par $3$", `On ajoute $${u0}$ puis on multiplie par $2$`] : [`On multiplie par $${d}$`, `On ajoute $${d + 1}$`, `On ajoute $${vus[0]}$`].filter((x) => x !== bon));
      return { enonce: `Quelle règle permet de passer d'un nombre au suivant dans la suite $${liste}$ ; … ?`, figure: suiteCases(vus.map(String), "?"), mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Teste chaque règle sur les deux premiers nombres, puis sur les deux suivants.", "Une bonne règle doit marcher **à chaque fois**.", `De $${vus[0]}$ à $${vus[1]}$, puis de $${vus[1]}$ à $${vus[2]}$ : que se passe-t-il ?`],
        solution: `${bon} : ${vus.slice(0, 3).map((v, k) => `$${v} \\rightarrow ${vus[k + 1]}$`).join(" ; ")}.` };
    }
    if (mult) return GEN["a6-suite"]();
    const k = rand(8, 30);
    return { enonce: `La suite $${liste}$ ; … continue en ajoutant toujours $${d}$. Quel est le ${k}e nombre de la suite ?`, figure: suiteCases(vus.map(String), `+ ${d}`), mode: "nombre", prefixe: `${k}e nombre :`, attendu: u0 + d * (k - 1),
      erreurs: [{ valeur: u0 + d * k, message: `Pour arriver au ${k}e nombre, on ajoute $${d}$ seulement $${k - 1}$ fois (le 1er nombre est déjà là).` }, { valeur: d * k, message: `N'oublie pas le premier nombre, $${u0}$.` }],
      aides: [`Du 1er au 2e nombre, on ajoute $${d}$ une fois ; du 1er au 3e, deux fois.`, `Du 1er au ${k}e, on ajoute $${d}$ en tout $${k - 1}$ fois.`, `Calcule $${u0} + ${k - 1} \\times ${d}$.`],
      solution: `$${u0} + ${k - 1} \\times ${d} = ${u0} + ${(k - 1) * d} = ${u0 + d * (k - 1)}$.` };
  };

  GEN["a6-motif"] = function () {
    const M = pick(MOTIFS), t = rand(0, 3), nb2 = (n) => M.a * n + M.b;
    const fig = dessinMotif(M);
    if (t === 0) { const n = rand(4, 6);
      return { enonce: `Voici les trois premières étapes d'un motif (${M.nom}). Combien ${deN(M.obj)} faut-il pour l'étape $${n}$ ?`, figure: fig, mode: "nombre", prefixe: "Réponse :", suffixe: M.obj, attendu: nb2(n),
        aides: [`Compte les ${M.obj} des étapes $1$, $2$ et $3$ : $${nb2(1)}$ ; $${nb2(2)}$ ; $${nb2(3)}$.`, `À chaque étape, on ajoute $${M.a}$ ${M.obj}.`, `Continue jusqu'à l'étape $${n}$.`],
        solution: `$${[1, 2, 3, 4, 5, 6].slice(0, n).map(nb2).join(" ; ")}$ : on ajoute $${M.a}$ ${M.obj} à chaque étape, donc l'étape $${n}$ compte $${nb2(n)}$ ${M.obj}.` }; }
    if (t === 1) { const n = pick([10, 12, 15, 20, 25, 30, 50, 100]);
      return { enonce: `Voici les trois premières étapes d'un motif (${M.nom}). Combien ${deN(M.obj)} faut-il pour l'étape $${n}$ ?`, figure: fig, mode: "nombre", prefixe: "Réponse :", suffixe: M.obj, attendu: nb2(n),
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
    const t = rand(0, 3), [A, B] = shuffle(PRENOMS6.filter((x) => x.length <= 8)).slice(0, 2);
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
      erreurs: [{ valeur: T / n, message: `Retire d'abord le prix ${deN(o2)}.` }, { valeur: T - y, message: `Ça, c'est le prix des $${n}$ ${o}. On demande le prix d'un seul.` }],
      aides: ["Sur le schéma, les barres « ? » sont les objets de même prix.", `Retire le prix ${deN(o2)} : $${T} - ${y} = ${T - y}$.`, `Partage en $${n}$ : $${T - y} \\div ${n}$.`],
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
    // contexte : colonnes (groupes) et lignes (catégories) ; « qui » et « de » pour les phrases
    const [cols, lignes, titre, unite, phrL, phrC] = pick([
      [shuffle(["6e A", "6e B", "6e C", "6e D"]).slice(0, 3).sort(), ["Bus", "À pied", "Voiture"], "le moyen de transport des élèves de trois classes", "élèves", ["en bus", "à pied", "en voiture"], (c) => `de ${c}`],
      [shuffle(["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"]).slice(0, 3), ["Mangues", "Bananes", "Ananas"], "les fruits vendus (en kg) par un marchand du marché de Mamoudzou", "kg", ["de mangues", "de bananes", "d'ananas"], (c) => `le ${c.toLowerCase()}`],
      [shuffle(["Sada", "Koungou", "Dembéni", "Chirongui", "Bandrélé"]).slice(0, 3), ["Foot", "Handball", "Basket"], "les licenciés de trois clubs de sport de communes de Mayotte", "licenciés", ["au foot", "au handball", "au basket"], (c) => `à ${c}`]]);
    const T = cols.map(() => lignes.map(() => rand(2, unite === "kg" ? 40 : 14)));
    const tab = { lignes: [["", ...cols.map((c) => `\\text{${c}}`)], ...lignes.map((m, j) => [`\\text{${m}}`, ...T.map((col) => col[j])])] };
    const t = rand(0, 3), i = rand(0, 2), j = rand(0, 2), totC = T[i].reduce((s, v) => s + v, 0), totL = T.reduce((s, col) => s + col[j], 0);
    const quoi = unite === "kg" ? `Combien de kilogrammes ${phrL[j]} ont été vendus ${phrC(cols[i])}` : `Combien ${deN(unite)} ${phrC(cols[i])} ${unite === "élèves" ? "viennent" : "jouent"} ${phrL[j]}`;
    if (t === 0) return { enonce: `Le tableau donne ${titre}. ${quoi} ?`, tableau: tab, mode: "nombre", prefixe: "Réponse :", suffixe: unite, attendu: T[i][j],
      erreurs: [{ valeur: T[(i + 1) % 3][j], message: "Vérifie la colonne : c'est celle qui est demandée." }, { valeur: T[i][(j + 1) % 3], message: "Vérifie la ligne : c'est celle qui est demandée." }],
      aides: ["Repère la bonne colonne.", "Repère la bonne ligne.", "Le nombre cherché est au croisement de la ligne et de la colonne."],
      solution: `Au croisement de la colonne « ${cols[i]} » et de la ligne « ${lignes[j]} » : $${T[i][j]}$ ${unite}.` };
    if (t === 1) return { enonce: `Le tableau donne ${titre}. Quel est le total de la colonne « ${cols[i]} » ?`, tableau: tab, mode: "nombre", prefixe: "Total :", suffixe: unite, attendu: totC,
      erreurs: [{ valeur: T.reduce((s, col) => s + col[i], 0), message: "Tu as additionné une ligne : on demande la colonne." }, { valeur: totC - T[i][2], message: "Tu as oublié un nombre de la colonne." }],
      aides: ["Tous les nombres de cette colonne comptent.", "Additionne les nombres de la colonne.", `$${T[i].join(" + ")}$.`],
      solution: `$${T[i].join(" + ")} = ${totC}$ ${unite}.` };
    if (t === 2) return { enonce: `Le tableau donne ${titre}. Quel est le total de la ligne « ${lignes[j]} » ?`, tableau: tab, mode: "nombre", prefixe: "Total :", suffixe: unite, attendu: totL,
      erreurs: [{ valeur: T[j].reduce((s, v) => s + v, 0), message: "Tu as additionné une colonne : on demande la ligne." }, { valeur: totL - T[2][j], message: "Tu as oublié un nombre de la ligne." }],
      aides: ["Cette catégorie correspond à une ligne.", "Additionne les nombres de la ligne.", `$${T.map((c) => c[j]).join(" + ")}$.`],
      solution: `$${T.map((c) => c[j]).join(" + ")} = ${totL}$ ${unite}.` };
    // filtrer selon un critère
    const s0 = unite === "kg" ? rand(12, 30) : rand(6, 10), n = T.flat().filter((v) => v > s0).length;
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
      erreurs: [{ valeur: vals[i] + pas, message: `Regarde bien la graduation : elle va de $${pas}$ en $${pas}$.` }, { valeur: vals[i] - pas, message: `Regarde bien la graduation : elle va de $${pas}$ en $${pas}$.` }],
      aides: ["Repère la barre « " + cats[i] + " ».", "Va jusqu'en haut de la barre, puis regarde l'axe vertical.", `Les graduations vont de $${pas}$ en $${pas}$.`],
      solution: `La barre « ${cats[i]} » monte jusqu'à $${vals[i]}$ ${unite}.` };
    if (t === 1) return { enonce: `${sujet}. Quelle est la différence entre « ${cats[i]} » et « ${cats[k]} » ?`, figure: fig, mode: "nombre", prefixe: "Différence :", suffixe: unite, attendu: Math.abs(vals[i] - vals[k]),
      erreurs: [{ valeur: vals[i] + vals[k], message: "On demande la **différence** : on soustrait, on n'additionne pas." }, { valeur: Math.max(vals[i], vals[k]), message: "Ça, c'est une seule des deux valeurs : il faut encore soustraire l'autre." }],
      aides: ["Lis les deux valeurs.", `« ${cats[i]} » : $${vals[i]}$ ; « ${cats[k]} » : $${vals[k]}$.`, "Soustrais la plus petite de la plus grande."],
      solution: `$${Math.max(vals[i], vals[k])} - ${Math.min(vals[i], vals[k])} = ${Math.abs(vals[i] - vals[k])}$ ${unite}.` };
    if (t === 2) { const tot = vals.reduce((s, v) => s + v, 0);
      return { enonce: `${sujet}. Quel est le total pour toutes les catégories ?`, figure: fig, mode: "nombre", prefixe: "Total :", suffixe: unite, attendu: tot,
        erreurs: [{ valeur: tot - vals[vals.length - 1], message: "Tu as oublié une barre : il faut les additionner toutes." }, { valeur: Math.max(...vals), message: "Ça, c'est la plus grande valeur, pas le total." }],
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

  /* Figures du hasard (couleurs du thème, initiale de la couleur écrite dans chaque boule ou secteur pour ne pas dépendre des couleurs) */
  const COUL6 = { rouge: ["--faux", "R"], bleue: ["--lagon", "B"], verte: ["--bon", "V"], jaune: ["--ylang", "J"] };
  function urne(L) { // L = [[couleur, nombre]]
    const boules = L.flatMap(([c, n]) => Array(n).fill(c)), N = boules.length, parLigne = Math.min(8, Math.max(4, Math.ceil(Math.sqrt(N * 2)))), lignes = Math.ceil(N / parLigne);
    const r = 13, W = 320, H = 50 + lignes * 2 * (r + 2);
    let s = `<svg class="graph urne" viewBox="0 0 ${W} ${H}" role="img" aria-label="Sac contenant ${L.filter((x) => x[1]).map(([c, n]) => `${n} boule${n > 1 ? "s" : ""} ${c}${n > 1 ? "s" : ""}`).join(", ")}">`;
    const lb = parLigne * 2 * (r + 2) + 24, x0 = (W - lb) / 2;
    s += `<path d="M${x0 + 10} 30 Q${x0} ${H - 4} ${x0 + lb / 2} ${H - 4} Q${x0 + lb} ${H - 4} ${x0 + lb - 10} 30 Z" style="fill:var(--lagon-pale);stroke:var(--doux);stroke-width:1.5"/><path d="M${x0 + lb / 2 - 26} 30 Q${x0 + lb / 2} 14 ${x0 + lb / 2 + 26} 30" style="fill:none;stroke:var(--doux);stroke-width:1.5"/>`;
    boules.forEach((c, k) => { const i = k % parLigne, j = Math.floor(k / parLigne), nl = j === lignes - 1 ? N - j * parLigne : parLigne, cx = W / 2 + (i - (nl - 1) / 2) * 2 * (r + 2), cy = 46 + j * 2 * (r + 2); s += `<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:var(${COUL6[c][0]});fill-opacity:0.3;stroke:var(${COUL6[c][0]});stroke-width:2.5"/><text class="g-plabel" x="${cx}" y="${cy + 4}" text-anchor="middle">${COUL6[c][1]}</text>`; });
    return s + `</svg>`;
  }
  function roue(cols) { // cols = couleurs des secteurs, dans l'ordre
    const n = cols.length, cx = 160, cy = 92, R = 78;
    let s = `<svg class="graph roue" viewBox="0 0 320 184" role="img" aria-label="Roue partagée en ${n} secteurs égaux : ${Object.keys(COUL6).map((c) => [c, cols.filter((x) => x === c).length]).filter((x) => x[1]).map(([c, k]) => `${k} ${c.replace("bleue", "bleu").replace("verte", "vert")}${k > 1 ? "s" : ""}`).join(", ")}">`;
    cols.forEach((c, k) => { const a0 = (2 * Math.PI * k) / n - Math.PI / 2, a1 = a0 + (2 * Math.PI) / n, am = (a0 + a1) / 2, p = (a, rr) => `${+(cx + rr * Math.cos(a)).toFixed(1)} ${+(cy + rr * Math.sin(a)).toFixed(1)}`;
      s += `<path d="M${cx} ${cy} L${p(a0, R)} A${R} ${R} 0 0 1 ${p(a1, R)} Z" style="fill:var(${COUL6[c][0]});fill-opacity:0.35;stroke:var(--encre);stroke-width:1.2"/><text class="g-plabel" x="${+(cx + R * 0.66 * Math.cos(am)).toFixed(1)}" y="${+(cy + R * 0.66 * Math.sin(am) + 4).toFixed(1)}" text-anchor="middle">${COUL6[c][1]}</text>`; });
    return s + `<path d="M${cx} ${cy - R - 10} l-7 -10 h14z" style="fill:var(--encre)"/><circle cx="${cx}" cy="${cy}" r="4" style="fill:var(--encre)"/></svg>`;
  }
  function cartes(mot) { // une carte par lettre
    const n = mot.length, w = Math.min(30, 300 / n - 4), x0 = (320 - n * (w + 4) + 4) / 2;
    let s = `<svg class="graph cartes" viewBox="0 0 320 56" role="img" aria-label="Cartes portant les lettres du mot ${mot}">`;
    mot.split("").forEach((l, k) => { s += `<rect x="${+(x0 + k * (w + 4)).toFixed(1)}" y="8" width="${+w.toFixed(1)}" height="40" rx="4" style="fill:var(--surface);stroke:var(--doux);stroke-width:1.4"/><text class="g-clabel" x="${+(x0 + k * (w + 4) + w / 2).toFixed(1)}" y="33" text-anchor="middle">${l}</text>`; });
    return s + `</svg>`;
  }
  const MOTS_YT = ["MAYOTTE", "MAMOUDZOU", "DZAOUDZI", "PAMANDZI", "COMBANI", "CHIRONGUI", "BANDRELE", "MTSAMBORO", "KOUNGOU", "LAGON", "VANILLE", "MANIOC", "PIROGUE", "COLLEGE", "MATHEMATIQUES", "BANANE"];
  FIGURES["g6-cours-urne"] = () => urne([["verte", 3], ["jaune", 4]]);
  FIGURES["g6-cours-cartes"] = () => cartes("MATHEMATIQUES");
  FIGURES["g6-cours-frequence"] = () => diagrammeBarres([["Rouges", 102], ["Bleues", 201], ["Vertes", 97]], 50, "tirages");
  FIGURES["g6-qcm-urne"] = () => urne([["rouge", 2], ["bleue", 5], ["verte", 3]]);
  FIGURES["g6-qcm-roue"] = () => roue(["jaune", "bleue", "jaune", "rouge", "bleue", "jaune", "bleue", "rouge"]);
  FIGURES["g6-qcm-cartes"] = () => cartes("MAYOTTE");

  const CHOIX_PROBA = ["Impossible (probabilité $0$)", "Possible, mais pas certain", "Certain (probabilité $1$)"];
  GEN["g6-proba-vocab"] = function () {
    const t = rand(0, 4);
    const aides = ["Un événement **impossible** ne se produit jamais : sa probabilité est $0$.", "Un événement **certain** se produit toujours : sa probabilité est $1$.", "Entre les deux, l'événement peut se produire ou non."];
    const fin = (ev, rep, fig) => ({ enonce: `L'événement « ${ev} » est :`, figure: fig, mode: "choix", choix: CHOIX_PROBA, attendu: rep, aides,
      solution: `« ${ev} » : ${["cela ne peut jamais arriver, l'événement est impossible (probabilité $0$).", "cela peut arriver, mais pas à tous les coups.", "cela arrive à tous les coups, l'événement est certain (probabilité $1$)."][rep]}` });
    if (t === 0) { // sac de boules
      const cs = shuffle(["rouge", "bleue", "verte", "jaune"]), n1 = rand(1, 6), n2 = pick([0, 0, rand(1, 5)]), L = [[cs[0], n1], [cs[1], n2]].filter((x) => x[1]);
      const q = pick([cs[0], cs[1], cs[2]]), k = q === cs[0] ? n1 : q === cs[1] ? n2 : 0, tot = n1 + n2;
      return fin(`tirer une boule ${q} dans ce sac`, k === 0 ? 0 : k === tot ? 2 : 1, urne(L));
    }
    if (t === 1) { // dé à n faces
      const n = pick([6, 6, 8, 10, 12]), sup = Math.random() < 0.5, k = rand(0, n + 2);
      const rep = sup ? (k >= n ? 0 : k < 1 ? 2 : 1) : (k < 1 ? 0 : k >= n ? 2 : 1);
      return fin(`obtenir un nombre ${sup ? "strictement supérieur" : "inférieur ou égal"} à $${k}$ en lançant un dé équilibré à $${n}$ faces numérotées de $1$ à $${n}$`, rep);
    }
    if (t === 2) { // lettres d'un mot
      const mot = pick(MOTS_YT), lettres = [...new Set(mot.split(""))], absente = pick("BCFGHJKLNPRSVWXZ".split("").filter((l) => !mot.includes(l))), u = rand(0, 3);
      const voy = mot.split("").filter((l) => "AEIOUY".includes(l)).length;
      const [ev, rep] = [[`tirer la lettre « ${pick(lettres)} »`, 1], [`tirer la lettre « ${absente} »`, 0], ["tirer une voyelle", voy === mot.length ? 2 : voy ? 1 : 0], ["tirer une lettre de l'alphabet", 2]][u];
      return fin(`${ev} parmi les cartes du mot « ${mot} »`, rep, cartes(mot));
    }
    if (t === 3) { // roue
      const n = pick([4, 6, 8]), c1 = pick(["jaune", "bleue", "rouge", "verte"]), mono = Math.random() < 0.3, autre = pick(Object.keys(COUL6).filter((c) => c !== c1));
      const cols = Array.from({ length: n }, (_, k) => (mono || k % 2 === 0 ? c1 : autre)), q = pick([c1, autre, Object.keys(COUL6).find((c) => c !== c1 && c !== autre)]);
      const k = cols.filter((c) => c === q).length;
      return fin(`la roue s'arrête sur un secteur ${q.replace("bleue", "bleu").replace("verte", "vert")}`, k === 0 ? 0 : k === n ? 2 : 1, roue(cols));
    }
    // un nombre qui ne peut pas être une probabilité
    const a = rand(2, 9), faux = pick([[`1{,}${rand(1, 9)}`, "elle est plus grande que $1$"], [fr(a + rand(1, 5), a), "elle est plus grande que $1$ (numérateur plus grand que le dénominateur)"], [`${rand(11, 19) * 10}~\\%`, "elle dépasse $100$ %, c'est-à-dire $1$"], [`-0{,}${rand(1, 9)}`, "elle est négative"], [`${rand(2, 5)}`, "elle est plus grande que $1$"]]);
    const bons = shuffle([`0{,}${rand(1, 9)}`, fr(rand(1, a - 1 || 1), a), "0", "1", `0{,}${rand(1, 9)}${rand(1, 9)}`, `${rand(1, 9) * 10}~\\%`, fr(1, rand(2, 9))]).filter((x, i, T) => T.indexOf(x) === i).slice(0, 3);
    const c = melange(`$${faux[0]}$`, bons.map((x) => `$${x}$`));
    return { enonce: "Lequel de ces nombres **ne peut pas** être une probabilité ?", mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Une probabilité est toujours un nombre compris entre $0$ et $1$ (entre $0$ % et $100$ %).", "$0$ : impossible ; $1$ : certain.", "Cherche un nombre en dehors de cet intervalle."],
      solution: `$${faux[0]}$ ne peut pas être une probabilité : ${faux[1]}.` };
  };

  GEN["g6-proba-calcul"] = function () {
    const t = rand(0, 5);
    let enonce, f, expl, fig;
    if (t === 0) { // sac de boules dessiné
      const cs = shuffle(["rouge", "bleue", "verte", "jaune"]), L = [[cs[0], rand(1, 6)], [cs[1], rand(1, 6)], [cs[2], rand(0, 4)]].filter((x) => x[1]), [coul, nb] = pick(L), tot = L.reduce((s, x) => s + x[1], 0);
      enonce = `On tire au hasard une boule dans ce sac (les boules sont indiscernables au toucher). Quelle est la probabilité de tirer une boule ${coul} ?`; f = [nb, tot]; expl = `$${nb}$ boule${nb > 1 ? "s" : ""} ${coul}${nb > 1 ? "s" : ""} sur $${tot}$ boules en tout`; fig = urne(L); }
    else if (t === 1) { const n = pick([6, 6, 8, 10, 12]), u = rand(0, 4), k0 = rand(2, n - 2);
      const [ev, k] = [["un nombre pair", n / 2], [`un nombre strictement supérieur à $${k0}$`, n - k0], [`un multiple de $${n % 3 === 0 ? 3 : 4}$`, Math.floor(n / (n % 3 === 0 ? 3 : 4))], [`le nombre $${k0}$`, 1], [`un nombre inférieur ou égal à $${k0}$`, k0]][u];
      enonce = `On lance un dé équilibré à $${n}$ faces numérotées de $1$ à $${n}$. Quelle est la probabilité d'obtenir ${ev} ?`; f = [k, n]; expl = `$${k}$ issue${k > 1 ? "s" : ""} favorable${k > 1 ? "s" : ""} sur $${n}$`; }
    else if (t === 2) { const mot = pick(MOTS_YT), lettre = pick([...new Set(mot.split(""))]), k = mot.split("").filter((x) => x === lettre).length;
      enonce = `On écrit chaque lettre du mot « ${mot} » sur une carte, puis on tire une carte au hasard. Quelle est la probabilité de tirer la lettre « ${lettre} » ?`; f = [k, mot.length]; expl = `la lettre « ${lettre} » apparaît $${k}$ fois sur $${mot.length}$ lettres`; fig = cartes(mot); }
    else if (t === 3) { const n = pick([6, 8, 10, 12]), j = rand(1, n - 1), autre = pick(["bleue", "rouge", "verte"]), cols = shuffle([...Array(j).fill("jaune"), ...Array(n - j).fill(autre)]);
      enonce = `On fait tourner cette roue partagée en $${n}$ secteurs égaux. Quelle est la probabilité qu'elle s'arrête sur un secteur jaune ?`; f = [j, n]; expl = `$${j}$ secteur${j > 1 ? "s" : ""} jaune${j > 1 ? "s" : ""} sur $${n}$`; fig = roue(cols); }
    else if (t === 4) { const N = rand(24, 32), F = rand(8, N - 8), P = pick(PRENOMS6), fille = Math.random() < 0.5;
      enonce = `Dans la classe ${deN(P)}, au collège de ${pick(["Sada", "Koungou", "Dembéni", "Chirongui", "Pamandzi", "Bandrélé"])}, il y a $${N}$ élèves dont $${F}$ filles. Le professeur tire au sort un élève pour être délégué. Quelle est la probabilité que ce soit ${fille ? "une fille" : "un garçon"} ?`; f = [fille ? F : N - F, N]; expl = `$${fille ? F : N - F}$ ${fille ? "filles" : "garçons"} sur $${N}$ élèves`; }
    else { const r = rand(2, 6), b = rand(2, 6), v = rand(1, 5), [sg, pl, nb] = pick([["rouge", "rouges", r], ["bleu", "bleus", b], ["vert", "verts", v]]);
      enonce = `Pour un jeu à la fête du village ${deN(pick(["Combani", "Bouéni", "Acoua", "Kani-Kéli", "Tsingoni"]))}, un sac contient $${r}$ jetons rouges, $${b}$ jetons bleus et $${v}$ ${v > 1 ? "jetons verts" : "jeton vert"}. On tire un jeton au hasard. Quelle est la probabilité qu'il soit ${sg} ?`; f = [nb, r + b + v]; expl = `$${nb}$ jeton${nb > 1 ? "s" : ""} ${nb > 1 ? pl : sg} sur $${r + b + v}$ jetons`; }
    const v = f[0] / f[1];
    return { enonce: enonce + CONSIGNE_FR.replace("le résultat", "la probabilité").replace("7/6", "3/8"), figure: fig, mode: "nombre", prefixe: "Probabilité :", attendu: v,
      erreurs: [{ valeur: f[0] / (f[1] - f[0] || 1), message: "On divise par le nombre **total** d'issues, pas par le nombre d'issues défavorables." }, { valeur: f[1] / f[0], message: "Une probabilité ne dépasse jamais $1$ : c'est le nombre d'issues favorables **sur** le nombre total." }, ...(Number.isInteger(v * 1000) ? [] : FRAC_APPROX(v))],
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
      const pas = N <= 200 ? 20 : N <= 500 ? 50 : 100;
      return { enonce: `Un sac contient ${tot} boules. On tire une boule, on note sa couleur, on la remet, et on recommence $${N}$ fois. Résultats : ${obs.map((o, k) => `$${o}$ ${coul[k]}`).join(", ")} (voir le diagramme). Quel est le contenu le plus probable du sac ?`.replace(`contient ${tot} boules`, `contient $${tot}$ boules`), figure: diagrammeBarres(obs.map((o, k) => [Maj(coul[k]), o]), pas, "tirages"), mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Quand on répète une expérience un grand nombre de fois, la fréquence de chaque couleur se rapproche de sa probabilité.", `Calcule la fréquence de chaque couleur : par exemple $${fr(obs[0], N)}$ pour les rouges.`, `Avec $${tot}$ boules, chaque boule correspond à environ $${fr(1, tot)}$ des tirages, soit $${Math.round(N / tot)}$ tirages sur $${N}$.`],
        solution: `Sur $${N}$ tirages, chaque boule sort environ $${N} \\div ${tot} = ${Math.round(N / tot)}$ fois. Les résultats correspondent à : ${vrai}.` };
    }
    // fréquence et probabilité du dé
    const N = pick([60, 120, 300, 600, 1200]), face = rand(1, 6), eff = Array.from({ length: 6 }, () => Math.round(N / 6 + (Math.random() - 0.5) * N * 0.05));
    eff[(face % 6)] += N - eff.reduce((s, v) => s + v, 0); const obs = eff[face - 1];
    const choix = [`La fréquence $${fr(obs, N)}$ est proche de la probabilité $${fr(1, 6)}$, c'est normal`, "Le dé est forcément truqué", `La probabilité d'obtenir $${face}$ est $${fr(obs, N)}$`, `Au prochain lancer, on a moins de chances d'obtenir $${face}$`];
    const cc = melange(choix[0], choix.slice(1));
    return { enonce: `On lance un dé équilibré $${N}$ fois ; le diagramme donne le nombre de sorties de chaque face. La face $${face}$ sort $${obs}$ fois. Que peut-on dire ?`, figure: diagrammeBarres(eff.map((v, k) => [String(k + 1), v]), N <= 120 ? 5 : N <= 600 ? 20 : 50, "sorties"), mode: "choix", choix: cc.choix, attendu: cc.attendu,
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
  // Segment [AB] légèrement penché, son milieu I codé ; lab = texte au-dessus de [AB], labAI = texte sous [AI]
  function figMilieu(A, B, I, lab, labAI, pente, cote) {
    const th = ((pente === undefined ? rand(-12, 12) : pente) * Math.PI) / 180, P = (t) => [+(160 + t * Math.cos(th)).toFixed(1), +(92 - t * Math.sin(th)).toFixed(1)];
    const pts = { [A]: P(-120), [B]: P(120), [I]: P(0) };
    let s = geo({ W: 320, H: 150, pts, segs: [[A, B]], codes: [[A, I, 2], [I, B, 2]], decal: { [A]: [-6, 18], [B]: [-2, 18], [I]: [-3, 18] }, aria: `Segment [${A}${B}] et son milieu ${I}` });
    const n = [-Math.sin(th), -Math.cos(th)];
    if (lab) s = s.replace("</svg>", `<text class="g-mesure" x="${+(160 + n[0] * 22).toFixed(1)}" y="${+(92 + n[1] * 22 + 4).toFixed(1)}" text-anchor="middle">${lab}</text></svg>`);
    if (labAI) { const m = P(cote === "B" ? 60 : -60); s = s.replace("</svg>", `<text class="g-mesure" x="${+(m[0] - n[0] * 30).toFixed(1)}" y="${+(m[1] - n[1] * 30 + 4).toFixed(1)}" text-anchor="middle">${labAI}</text></svg>`); }
    return s;
  }
  // Disque de centre O et de rayon r (en cm, dessiné à l'échelle k), rayon tracé et légendé, points [nom, distance, angle]
  function figDisque(O, r, lab, pts, k) {
    k = k || Math.min(14, 72 / r);
    const R = +(r * k).toFixed(1), c = [150, 98], P = (d, a) => [+(c[0] + d * k * Math.cos((a * Math.PI) / 180)).toFixed(1), +(c[1] - d * k * Math.sin((a * Math.PI) / 180)).toFixed(1)];
    const pp = { [O]: c }, segs = [], decal = { [O]: [-4, 16] };
    pp["r1"] = P(r, 160); segs.push([O, "r1"]);
    (pts || []).forEach(([nom, d, a]) => { pp[nom] = P(d, a); decal[nom] = decalDe(c, pp[nom], 13); });
    let s = geo({ W: 320, H: 196, pts: pp, segs, disques: [[O, R]], cercles: [[O, R]], caches: ["r1"], decal, aria: `Disque de centre ${O} et de rayon ${String(r).replace(".", ",")} cm${(pts || []).length ? " avec " + pts.map((p) => p[0]).join(", ") : ""}` });
    const m = P(r / 2, 160);
    return s.replace("</svg>", `<text class="g-mesure" x="${m[0]}" y="${+(m[1] - 8).toFixed(1)}" text-anchor="middle">${lab}</text></svg>`);
  }
  // Construction de la médiatrice au compas : arcs de même rayon centrés en A et B, points E et F
  function figMedCompas(A, B, E, F) {
    const PA = [70, 100], PB = [250, 100], r = 120, h = Math.sqrt(r * r - 90 * 90), PE = [160, +(100 - h).toFixed(1)], PF = [160, +(100 + h).toFixed(1)];
    const arc = (P, a0, a1) => { const q = (a) => `${+(P[0] + r * Math.cos((a * Math.PI) / 180)).toFixed(1)} ${+(P[1] - r * Math.sin((a * Math.PI) / 180)).toFixed(1)}`; return `<path class="g-arc" d="M${q(a0)} A${r} ${r} 0 0 0 ${q(a1)}"/>`; };
    let s = geo({ W: 320, H: 200, pts: { [A]: PA, [B]: PB, [E]: PE, [F]: PF }, segs: [[A, B]], droites: [[E, F]], decal: { [A]: [-14, 4], [B]: [8, 4], [E]: [13, 4], [F]: [13, 4] }, aria: `Médiatrice de [${A}${B}] construite au compas : arcs de même rayon qui se coupent en ${E} et ${F}` });
    return s.replace(/(<svg[^>]*>)/, `$1${arc(PA, 30, 50) + arc(PA, -50, -30) + arc(PB, 130, 150) + arc(PB, 210, 230)}`);
  }
  FIGURES["c6-cours-notations"] = () => {
    let s = `<svg class="graph geo" viewBox="0 0 320 132" role="img" aria-label="Le segment [AB], la droite (AB) et la demi-droite [AB)">`;
    [["[AB] : segment", 70, 250, 70, 250], ["(AB) : droite", 70, 250, 16, 306], ["[AB) : demi-droite", 70, 250, 70, 306]].forEach(([t, xa, xb, x1, x2], k) => {
      const y = 26 + k * 40;
      s += `<line class="${k ? "g-droite" : "g-segment"}" x1="${x1}" y1="${y}" x2="${x2}" y2="${y}"/><circle class="g-point" cx="${xa}" cy="${y}" r="3"/><circle class="g-point" cx="${xb}" cy="${y}" r="3"/><text class="g-plabel" x="${xa}" y="${y - 7}" text-anchor="middle">A</text><text class="g-plabel" x="${xb}" y="${y - 7}" text-anchor="middle">B</text><text class="g-mesure" x="160" y="${y + 15}" text-anchor="middle">${t}</text>`;
    });
    return s + `</svg>`;
  };
  FIGURES["c6-cours-milieu"] = () => figMilieu("A", "B", "I", "AB = 7,4 cm", "AI = ?", -6);
  FIGURES["c6-cours-disque"] = () => figDisque("O", 5, "5 cm", [["M", 5, 60], ["N", 3, 330], ["P", 6.6, 120]], 12);
  FIGURES["c6-cours-compas"] = () => figMedCompas("A", "B", "E", "F");

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
    // cercle de centre O, avec deux points A et B du cercle (diamétralement opposés si « diam »), segments et légendes
    const fig = (diam, labs) => { const a0 = rand(10, 70), c = [150, 96], R = 70, P = (a) => [+(c[0] + R * Math.cos((a * Math.PI) / 180)).toFixed(1), +(c[1] - R * Math.sin((a * Math.PI) / 180)).toFixed(1)];
      const pts = { [O]: c, [A]: P(diam ? a0 + 180 : a0 + rand(110, 150)), [B]: P(a0) }, s = geo({ W: 320, H: 192, pts, cercles: [[O, R]], segs: diam ? [[A, B]] : [[O, A], [O, B]], decal: { [O]: [4, 16], [A]: decalDe(c, pts[A], 13), [B]: decalDe(c, pts[B], 13) }, aria: diam ? `Cercle de centre ${O} et diamètre [${A}${B}]` : `Cercle de centre ${O} et deux rayons [${O}${A}] et [${O}${B}]` });
      const lab = (p, q, txt, sg) => { const m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2], dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy); return `<text class="g-mesure" x="${+(m[0] + (sg * -dy / L) * 13).toFixed(1)}" y="${+(m[1] + (sg * dx / L) * 13 + 4).toFixed(1)}" text-anchor="middle">${txt}</text>`; };
      return s.replace("</svg>", labs.map(([p, q, txt, sg]) => lab(pts[p], pts[q], txt, sg)).join("") + "</svg>"); };
    const rT = `${tD(r).replace("{,}", ",")} cm`, dT = `${tD(d).replace("{,}", ",")} cm`;
    if (t === 0) return { enonce: `Un cercle a pour rayon $${tD(r)}$ cm. Quel est son diamètre ?`, figure: fig(true, [[O, B, rT, 1]]), mode: "nombre", prefixe: "Diamètre :", suffixe: "cm", attendu: vD(d),
      erreurs: [{ valeur: vD(r) / 2, message: "Le diamètre est **deux fois plus long** que le rayon." }, { valeur: vD(r), message: "Ça, c'est le rayon : le diamètre en contient deux." }],
      aides: ["Un diamètre est formé de deux rayons bout à bout.", "Diamètre $=$ $2 \\times$ rayon.", `Calcule $2 \\times ${tD(r)}$.`], solution: `Diamètre $= 2 \\times ${tD(r)} = ${tD(d)}$ cm.` };
    if (t === 1) return { enonce: `Un cercle a pour diamètre $${tD(d)}$ cm. Quel est son rayon ?`, figure: fig(true, [[A, B, dT, -1], [O, B, "?", 1]]), mode: "nombre", prefixe: "Rayon :", suffixe: "cm", attendu: vD(r),
      erreurs: [{ valeur: vD(d) * 2, message: "Le rayon est **deux fois plus court** que le diamètre." }, { valeur: vD(d), message: "Ça, c'est le diamètre : le rayon en est la moitié." }],
      aides: ["Le rayon est la moitié du diamètre.", "Rayon $=$ diamètre $\\div 2$.", `Calcule $${tD(d)} \\div 2$.`], solution: `Rayon $= ${tD(d)} \\div 2 = ${tD(r)}$ cm.` };
    if (t === 2) return { enonce: `$${A}$ et $${B}$ sont deux points du cercle de centre $${O}$, et $${O}${A} = ${tD(r)}$ cm. Combien mesure $${O}${B}$ ?`, figure: fig(false, [[O, A, rT, 1], [O, B, "?", -1]]), mode: "nombre", prefixe: `$${O}${B} =$`, suffixe: "cm", attendu: vD(r),
      erreurs: [{ valeur: vD(d), message: `$${O}${B}$ est un rayon, pas un diamètre.` }, { valeur: vD(r) / 2, message: "Tous les rayons d'un cercle ont la même longueur." }],
      aides: [`$${O}${A}$ et $${O}${B}$ relient tous les deux le centre à un point du cercle.`, "Ce sont deux rayons du même cercle.", "Tous les rayons d'un cercle ont la même longueur."], solution: `$[${O}${A}]$ et $[${O}${B}]$ sont deux rayons du même cercle : $${O}${B} = ${O}${A} = ${tD(r)}$ cm.` };
    return { enonce: `$[${A}${B}]$ est un diamètre du cercle de centre $${O}$, et $${O}${A} = ${tD(r)}$ cm. Combien mesure $${A}${B}$ ?`, figure: fig(true, [[A, O, rT, 1], [A, B, `${A}${B} = ?`, -1]]), mode: "nombre", prefixe: `$${A}${B} =$`, suffixe: "cm", attendu: vD(d),
      erreurs: [{ valeur: vD(r), message: `$${A}${B}$ est un diamètre : il mesure deux rayons.` }, { valeur: vD(r) / 2, message: "Le diamètre est le **double** du rayon, pas la moitié." }],
      aides: [`$[${O}${A}]$ est un rayon.`, `Le diamètre $[${A}${B}]$ est formé de deux rayons : $[${A}${O}]$ et $[${O}${B}]$.`, `Calcule $2 \\times ${tD(r)}$.`], solution: `$${A}${B} = ${A}${O} + ${O}${B} = 2 \\times ${tD(r)} = ${tD(d)}$ cm.` };
  };

  GEN["c6-position"] = function () {
    const r = rand(2, 9), O = pick(["O", "K", "C"]), M = pick(["M", "N", "P", "R"]), pos = rand(0, 2);
    const dist = pos === 0 ? Dc(r) : pos === 1 ? Dc(rand(1, r * 10 - 1), 1) : Dc(rand(r * 10 + 1, r * 10 + 40), 1);
    if (dist.m % 10 === 0 && dist.d) dist.m /= 10, dist.d = 0;
    if (vD(dist) * Math.min(14, 72 / r, 78 / vD(dist)) < 22) return GEN["c6-position"](); // point trop près du centre : noms superposés
    const ctx = Math.random() < 0.35, u = ctx ? "m" : "cm", a = pick([rand(-60, 50), rand(200, 300)]);
    const choix = [`$${M}$ est sur le cercle`, `$${M}$ est à l'intérieur du disque, mais pas sur le cercle`, `$${M}$ est à l'extérieur du disque`];
    return { enonce: ctx ? `Une chèvre est attachée au piquet $${O}$ par une corde de $${r}$ m. Une touffe d'herbe $${M}$ est à $${tD(dist)}$ m du piquet. Où se trouve la touffe d'herbe par rapport au disque que la chèvre peut brouter ?` : `On considère le cercle de centre $${O}$ et de rayon $${r}$ cm. On sait que $${O}${M} = ${tD(dist)}$ cm. Où se trouve le point $${M}$ ?`,
      figure: figDisque(O, r, `${r} ${u}`, []), figureSolution: figDisque(O, r, `${r} ${u}`, [[M, vD(dist), a]], Math.min(14, 72 / r, 78 / vD(dist))),
      mode: "choix", choix: ctx ? [`Sur le bord : la chèvre l'atteint tout juste`, `À l'intérieur : la chèvre peut la manger`, `À l'extérieur : la chèvre ne peut pas l'atteindre`] : choix, attendu: pos,
      aides: [`Compare la distance $${O}${M}$ au rayon $${r}$.`, "Égale au rayon : sur le cercle. Plus petite : à l'intérieur du disque. Plus grande : à l'extérieur.", "Le disque, c'est le cercle et tout son intérieur."],
      solution: `$${O}${M} = ${tD(dist)}$ ${pos === 0 ? "=" : pos === 1 ? "<" : ">"} $${r}$ : ${[`le point est sur le cercle (à exactement $${r}$ du centre)`, "le point est plus près du centre que le cercle : il est à l'intérieur du disque", "le point est plus loin du centre que le cercle : il est à l'extérieur du disque"][pos]}.` };
  };

  GEN["c6-milieu"] = function () {
    const t = rand(0, 2), [A, B, I] = shuffle(["A", "B", "C", "D", "E", "F"]).slice(0, 2).concat(pick(["I", "J", "K"])), L = Dc(rand(21, 199), 1);
    const m = Dc(L.m * 5, L.d + 1), Lt = tD(L).replace("{,}", ","), mt = tD(m).replace("{,}", ",");
    if (t === 0) return { enonce: `$${I}$ est le milieu du segment $[${A}${B}]$ et $${A}${B} = ${tD(L)}$ cm. Combien mesure $${A}${I}$ ?`, figure: figMilieu(A, B, I, `${A}${B} = ${Lt} cm`, `${A}${I} = ?`), mode: "nombre", prefixe: `$${A}${I} =$`, suffixe: "cm", attendu: vD(L) / 2,
      erreurs: [{ valeur: vD(L) * 2, message: "Le milieu partage le segment en deux : on divise par $2$." }, { valeur: vD(L), message: `Ça, c'est la longueur du segment entier. $${A}${I}$ n'en est que la moitié.` }],
      aides: ["Le milieu est sur le segment et à égale distance des deux extrémités.", `$${A}${I} = ${I}${B}$ et $${A}${I} + ${I}${B} = ${A}${B}$.`, `Calcule $${tD(L)} \\div 2$.`], solution: `$${A}${I} = ${tD(L)} \\div 2 = ${tD(m)}$ cm.` };
    if (t === 1) return { enonce: `$${I}$ est le milieu du segment $[${A}${B}]$ et $${I}${B} = ${tD(m)}$ cm. Combien mesure $${A}${B}$ ?`, figure: figMilieu(A, B, I, `${A}${B} = ?`, `${I}${B} = ${mt} cm`, undefined, "B"), mode: "nombre", prefixe: `$${A}${B} =$`, suffixe: "cm", attendu: vD(L),
      erreurs: [{ valeur: vD(m) / 2, message: `$${A}${B}$ est le segment entier : il mesure deux fois $${I}${B}$.` }, { valeur: vD(m), message: `Ça, c'est $${I}${B}$, la moitié du segment.` }],
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
    const t = rand(0, 4), P1 = pick(PRENOMS6);
    if (t === 0) { // zone couverte : disque
      const [qui, unite, objet, ou] = pick([["Une antenne relais", "km", "Une maison", "de l'antenne"], ["Le phare de Dzaoudzi", "km", "Une pirogue", "du phare"], ["La borne wifi du CDI", "m", "La table " + deN(P1), "de la borne"], ["Un haut-parleur de la fête de Combani", "m", P1, "du haut-parleur"]]);
      const r = unite === "km" ? rand(2, 8) : rand(2, 9) * 5, rep = rand(0, 2), ecart = unite === "km" ? rand(1, 15) : rand(1, 40);
      const dd = Dc(r * 10 + [-ecart, ecart, 0][rep], 1);
      const choix = ["Oui, dans la zone couverte", "Non, en dehors de la zone couverte", "Exactement à la limite de la zone"];
      return { enonce: `${qui} porte jusqu'à $${r}$ ${unite} : la zone atteinte est le disque de rayon $${r}$ ${unite}. ${objet} est à $${tD(dd)}$ ${unite} ${ou}. Est-elle dans la zone ?`, figure: figDisque(pick(["O", "S", "A"]), r, `${r} ${unite}`, []), mode: "choix", choix, attendu: rep,
        aides: ["La zone est un **disque** : son centre est la source, son rayon est la portée.", `Son rayon est $${r}$ ${unite}.`, `Compare $${tD(dd)}$ à $${r}$.`],
        solution: `$${tD(dd)}$ ${rep === 0 ? "<" : rep === 1 ? ">" : "="} $${r}$ : ${["c'est dans le disque, dans la zone.", "c'est hors du disque, en dehors de la zone.", "c'est sur le cercle, exactement à la limite."][rep]}` }; }
    if (t === 1) { // à égale distance de deux villages : la médiatrice
      const [c1, c2] = shuffle(["Kani-Kéli", "Bandrélé", "Dembéni", "Sada", "Ouangani", "Chiconi", "Tsingoni", "M'tsamboro", "Bouéni", "Chirongui", "Koungou", "Acoua"]).slice(0, 2), quoi = pick(["une salle de sport", "un dispensaire", "un château d'eau", "un collège", "un plateau sportif", "une citerne"]);
      const c = melange("Sur la médiatrice du segment qui relie les deux villages", ["Au milieu exact de la route qui relie les deux villages, seulement", "Dans le village le plus peuplé", "N'importe où sur la route qui relie les deux villages"]);
      return { enonce: `On veut construire ${quoi} à égale distance des villages ${deN(c1)} et ${deN(c2)}. Où peut-on ${/^une /.test(quoi) ? "la" : "le"} placer ?`, figure: geo({ W: 320, H: 120, pts: { [c1]: [56, 64], [c2]: [264, 64] }, segs: [[c1, c2]], decal: { [c1]: [0, 22], [c2]: [0, 22] }, aria: `Les villages de ${c1} et de ${c2}, reliés par un segment` }),
        mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Quels sont les points à égale distance de deux points ?", "C'est une propriété de la médiatrice.", "Le milieu est un de ces points, mais il y en a beaucoup d'autres."],
        solution: "Les points à égale distance de deux points sont exactement ceux de la **médiatrice** du segment qui les relie. Le milieu en fait partie, mais toute la médiatrice convient." }; }
    if (t === 2) { // la plus grande distance dans le disque
      const r = rand(3, 12);
      return { enonce: `La chèvre ${deN(P1)} est attachée à un piquet par une corde de $${r}$ m. Quelle est la plus grande distance entre deux touffes d'herbe qu'elle peut brouter ?`, figure: figDisque("P", r, `${r} m`, []), mode: "nombre", prefixe: "Distance :", suffixe: "m", attendu: 2 * r,
        erreurs: [{ valeur: r, message: "Deux touffes peuvent être de part et d'autre du piquet." }, { valeur: 4 * r, message: "La plus grande distance est le diamètre du disque : deux rayons, pas quatre." }],
        aides: ["La chèvre peut brouter dans un disque de centre le piquet.", `Le rayon du disque est $${r}$ m.`, "La plus grande distance entre deux points d'un disque est son diamètre."],
        solution: `La chèvre broute dans un disque de rayon $${r}$ m. Deux points les plus éloignés sont aux extrémités d'un diamètre : $2 \\times ${r} = ${2 * r}$ m.` }; }
    if (t === 3) { // longueur de corde qui manque
      const r = rand(3, 10), d = Dc(r * 10 + rand(5, 60), 1);
      return { enonce: `La chèvre ${deN(P1)} est attachée à un piquet par une corde de $${r}$ m. Un manguier est à $${tD(d)}$ m du piquet. De combien de mètres faudrait-il rallonger la corde pour que la chèvre atteigne tout juste le manguier ?`, figure: figDisque("P", r, `${r} m`, [["M", vD(d), pick([rand(10, 50), rand(210, 330)])]], Math.min(14, 72 / r, 78 / vD(d))),
        mode: "nombre", prefixe: "Il faut rallonger de", suffixe: "m", attendu: +(vD(d) - r).toFixed(6),
        erreurs: [{ valeur: vD(d) + r, message: "On cherche ce qui **manque** : on soustrait la longueur de la corde." }, { valeur: vD(d), message: `Ça, c'est la distance du manguier au piquet. La corde mesure déjà $${r}$ m.` }],
        aides: ["Pour atteindre le manguier, la corde doit être aussi longue que la distance du piquet au manguier.", `Il faut une corde de $${tD(d)}$ m.`, `Calcule $${tD(d)} - ${r}$.`],
        solution: `Il faut une corde de $${tD(d)}$ m : $${tD(d)} - ${r} = ${tD(subD(d, Dc(r)))}$ m de plus.` }; }
    // points à égale distance de deux points et sur un cercle
    const [A, B] = shuffle(["A", "B", "E", "F"]).slice(0, 2), r = rand(3, 8);
    const c = melange("$2$ points", ["$1$ seul point", "aucun point", "une infinité de points"]);
    const ab = +(r * (0.7 + Math.random() * 1.1)).toFixed(1), k = 10;
    return { enonce: `Combien y a-t-il de points à égale distance de $${A}$ et de $${B}$, et situés à $${r}$ cm de $${A}$ ? (Ici $${A}${B} < ${2 * r}$ cm.)`, figure: geo({ W: 320, H: 196, pts: { [A]: [100, 98], [B]: [+(100 + ab * k).toFixed(1), 98] }, segs: [[A, B]], cercles: [[A, r * k]], decal: { [A]: [-12, 16], [B]: [6, 16] }, aria: `Segment [${A}${B}] et cercle de centre ${A} de rayon ${r} cm` }), mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: [`Les points à égale distance de $${A}$ et $${B}$ sont sur la médiatrice de $[${A}${B}]$.`, `Les points à $${r}$ cm de $${A}$ sont sur le cercle de centre $${A}$ et de rayon $${r}$ cm.`, "La droite coupe le cercle en deux points (c'est la construction au compas de la médiatrice)."],
      solution: `Ce sont les points communs à la médiatrice de $[${A}${B}]$ et au cercle de centre $${A}$ de rayon $${r}$ cm : comme $${A}${B} < ${2 * r}$ cm, la médiatrice coupe ce cercle en **deux points**.` };
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

  /* Demi-droites de même origine, avec des arcs marqués. o = { rays: [[degrés, nom]], arcs: [[d0, d1, texte, rayon, codé]],
     droits: [[d0, d1]], O: nom du sommet, plein: true si les demi-droites font tout le tour, aria } */
  function figRayons(o) {
    const W = 320, plein = o.plein, H = o.H || (plein ? 200 : 168), c = o.c || (plein ? [160, 100] : [160, 138]), r = o.r || (plein ? 78 : 104), rad = (d) => (d * Math.PI) / 180;
    const pt = (deg, rr) => [+(c[0] + rr * Math.cos(rad(deg))).toFixed(1), +(c[1] - rr * Math.sin(rad(deg))).toFixed(1)];
    let s = `<svg class="graph geo" viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.aria || "Demi-droites de même origine et angles marqués"}">`;
    (o.lignes || []).forEach(([d0, d1]) => { const [p, q] = [pt(d0, r + 10), pt(d1, r + 10)]; s += `<line class="g-guide" x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}"/>`; });
    (o.arcs || []).forEach(([d0, d1, txt, rr, code, f]) => {
      rr = rr || (d1 - d0 < 35 ? 52 : 30);
      const [p0, p1] = [pt(d0, rr), pt(d1, rr)], large = d1 - d0 > 180 ? 1 : 0;
      s += `<path class="g-arc" d="M${p0[0]} ${p0[1]} A${rr} ${rr} 0 ${large} 0 ${p1[0]} ${p1[1]}"/>`;
      if (code) { const [a, b] = [pt((d0 + d1) / 2, rr - 5), pt((d0 + d1) / 2, rr + 5)]; s += `<line class="g-code" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`; }
      if (txt) { const [tx, ty] = pt(d0 + (d1 - d0) * (f || 0.5), rr + 15); s += `<text class="g-mesure" x="${tx}" y="${ty + 4}" text-anchor="middle">${txt}</text>`; }
    });
    (o.droits || []).forEach(([d0, d1]) => { const u = (d) => [Math.cos(rad(d)) * 12, -Math.sin(rad(d)) * 12], [p, q] = [u(d0), u(d1)]; s += `<path class="g-code" d="M${+(c[0] + p[0]).toFixed(1)} ${+(c[1] + p[1]).toFixed(1)} L${+(c[0] + p[0] + q[0]).toFixed(1)} ${+(c[1] + p[1] + q[1]).toFixed(1)} L${+(c[0] + q[0]).toFixed(1)} ${+(c[1] + q[1]).toFixed(1)}"/>`; });
    o.rays.forEach(([d, n]) => { const [x, y] = pt(d, r), [lx, ly] = pt(d, r + 13); s += `<line class="g-segment" x1="${c[0]}" y1="${c[1]}" x2="${x}" y2="${y}"/><text class="g-plabel" x="${lx}" y="${ly + 4}" text-anchor="middle">${n}</text>`; });
    s += `<circle class="g-point" cx="${c[0]}" cy="${c[1]}" r="3"/><text class="g-plabel" x="${c[0]}" y="${c[1] + 17}" text-anchor="middle">${o.O || "O"}</text>`;
    return s + `</svg>`;
  }
  // Quatre angles côte à côte : aigu, droit, obtus, plat
  FIGURES["an6-cours-natures"] = () => {
    let s = `<svg class="graph geo" viewBox="0 0 320 96" role="img" aria-label="Un angle aigu, un angle droit, un angle obtus et un angle plat">`;
    [[50, "aigu"], [90, "droit"], [130, "obtus"], [180, "plat"]].forEach(([m, nom], k) => {
      const cx = 20 + k * 80 + (m === 180 ? 30 : m > 90 ? 34 : 6), cy = 62, L = 50, x2 = +(cx + L * Math.cos((m * Math.PI) / 180)).toFixed(1), y2 = +(cy - L * Math.sin((m * Math.PI) / 180)).toFixed(1);
      s += `<line class="g-segment" x1="${cx}" y1="${cy}" x2="${cx + L}" y2="${cy}"/><line class="g-segment" x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}"/>`;
      s += m === 90 ? `<path class="g-code" d="M${cx + 10} ${cy} V${cy - 10} H${cx}"/>` : `<path class="g-arc" d="M${cx + 16} ${cy} A16 16 0 0 0 ${+(cx + 16 * Math.cos((m * Math.PI) / 180)).toFixed(1)} ${+(cy - 16 * Math.sin((m * Math.PI) / 180)).toFixed(1)}"/>`;
      s += `<text class="g-plabel" x="${20 + k * 80 + 30}" y="88" text-anchor="middle">${nom}</text>`;
    });
    return s + `</svg>`;
  };
  FIGURES["an6-cours-construire"] = () => rapporteur(70, false, ["x", "O", "y"]);
  FIGURES["an6-cours-bissectrice"] = () => figRayons({ rays: [[10, "x"], [60, "z"], [110, "y"]], arcs: [[10, 60, "50°", 34, true], [60, 110, "50°", 34, true]], aria: "La demi-droite [Oz) partage l'angle xOy de 100° en deux angles de 50°" });
  FIGURES["an6-cours-adjacents"] = () => figRayons({ rays: [[10, "x"], [60, "z"], [130, "y"]], arcs: [[10, 60, "50°", 30], [60, 130, "70°", 30], [10, 130, "120°", 64, false, 0.82]], aria: "Les angles adjacents xOz de 50° et zOy de 70° forment l'angle xOy de 120°" });
  FIGURES["an6-qcm-obtus"] = () => figureAngle(5, 130, ["E", "F", "G"]);
  FIGURES["an6-qcm-adj"] = () => figRayons({ rays: [[15, "x"], [55, "z"], [125, "y"]], arcs: [[15, 55, "40°", 30], [55, 125, "70°", 30], [15, 125, "?", 64, false, 0.82]], aria: "Angles adjacents de 40° et 70° ; l'angle total est marqué d'un point d'interrogation" });
  FIGURES["an6-qcm-supp"] = () => figRayons({ rays: [[0, "x"], [38, "z"], [180, "y"]], arcs: [[0, 38, "38°"], [38, 180, "?"]], aria: "Angle plat xOy partagé par [Oz) : un angle de 38° et un angle inconnu" });
  FIGURES["an6-qcm-biss"] = () => figRayons({ rays: [[20, "x"], [62, "z"], [104, "y"]], arcs: [[20, 62, "?", 32, true], [62, 104, "", 32, true], [20, 104, "84°", 66, false, 0.8]], aria: "[Oz) bissectrice de l'angle xOy de 84°" });
  FIGURES["an6-qcm-tour"] = () => figRayons({ plein: true, rays: [[90, "x"], [190, "y"], [340, "z"]], arcs: [[90, 190, "100°", 26], [190, 340, "150°", 26], [340, 450, "?", 26]], aria: "Trois angles autour du point O : 100°, 150° et un angle inconnu" });
  FIGURES["an6-qcm-rapp"] = () => rapporteur(130, true, ["E", "S", "F"]);

  const NATURES = [["nul", (m) => m === 0], ["aigu", (m) => m > 0 && m < 90], ["droit", (m) => m === 90], ["obtus", (m) => m > 90 && m < 180], ["plat", (m) => m === 180], ["plein", (m) => m === 360]];
  const PHR_NAT = { nul: "c'est $0$°, un angle **nul**", aigu: "plus petit qu'un angle droit, c'est un angle **aigu**", droit: "c'est un angle **droit**", obtus: "entre $90$° et $180$°, c'est un angle **obtus**", plat: "c'est un angle **plat**", plein: "un tour complet, c'est un angle **plein**" };
  GEN["an6-nature"] = function () {
    const t = rand(0, 2), noms = shuffle(["A", "B", "C", "D", "E", "F", "M", "N", "P", "R", "S", "T"]).slice(0, 3), A = ang(...noms);
    const aides = ["Aigu : entre $0$° et $90$° ; droit : $90$° ; obtus : entre $90$° et $180$°.", "Plat : $180$° (les deux côtés sont dans le prolongement l'un de l'autre).", "Nul : $0$° ; plein : $360$° (un tour complet)."];
    if (t === 0) { // estimer sur la figure, sans rapporteur
      const m = pick([rand(15, 70), rand(15, 70), rand(110, 165), rand(110, 165), 90, 180]), nat = NATURES.find((n) => n[1](m))[0], d0 = rand(-10, Math.min(35, 190 - m));
      const c = melange(`Un angle ${nat}`, ["Un angle aigu", "Un angle droit", "Un angle obtus", "Un angle plat"].filter((x) => x !== `Un angle ${nat}`));
      return { enonce: `Sans utiliser de rapporteur, quelle est la nature de l'angle $${A}$ dessiné ?`, figure: figureAngle(d0, d0 + m, noms, m === 90), mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Compare l'angle à un angle droit (le coin d'une feuille, codé par un petit carré).", "Plus petit qu'un angle droit : aigu ; plus grand (mais moins qu'un angle plat) : obtus.", "Les côtés dans le prolongement l'un de l'autre : angle plat."],
        solution: `${m === 90 ? "Le petit carré code un angle droit" : m === 180 ? "Les deux côtés sont dans le prolongement l'un de l'autre" : m < 90 ? "L'angle est plus petit qu'un angle droit" : "L'angle est plus grand qu'un angle droit, mais plus petit qu'un angle plat"} : c'est un angle **${nat}** (il mesure $${m}$°).` };
    }
    if (t === 1) { // une mesure, quelle nature ?
      const m = pick([rand(1, 89), rand(1, 89), rand(91, 179), rand(91, 179), 90, 180, 0, 360]), nat = NATURES.find((n) => n[1](m))[0], fig = m > 0 && m < 180 && Math.random() < 0.6, d0 = rand(-10, Math.min(30, 190 - m));
      const c = melange(`Un angle ${nat}`, shuffle(["Un angle aigu", "Un angle droit", "Un angle obtus", "Un angle plat", "Un angle nul", "Un angle plein"].filter((x) => x !== `Un angle ${nat}`)));
      return { enonce: `L'angle $${A}$ mesure $${m}$°. C'est :`, figure: fig ? figureAngle(d0, d0 + m, noms, m === 90) : undefined, mode: "choix", choix: c.choix, attendu: c.attendu, aides,
        solution: `$${m}$° : ${PHR_NAT[nat]}.` };
    }
    // quelle mesure convient pour cette nature ?
    const nat = pick(["aigu", "obtus", "aigu", "obtus", "droit", "plat"]), bon = { aigu: rand(5, 85), obtus: rand(95, 175), droit: 90, plat: 180 }[nat];
    const fausses = shuffle([rand(5, 85), rand(95, 175), 90, 180, 360, rand(181, 300)].filter((v) => NATURES.find((n) => n[1](v)) ? NATURES.find((n) => n[1](v))[0] !== nat : true)).slice(0, 3);
    const c = melange(`$${bon}$°`, fausses.map((v) => `$${v}$°`));
    return { enonce: `L'angle $${A}$ est ${nat}. Quelle peut être sa mesure ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides,
      solution: `Un angle ${nat} ${{ aigu: "mesure entre $0$° et $90$°", obtus: "mesure entre $90$° et $180$°", droit: "mesure $90$°", plat: "mesure $180$°" }[nat]} : la seule mesure possible est $${bon}$°.` };
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
      erreurs: (m !== 90 ? [{ valeur: 180 - m, message: `Tu as lu la mauvaise graduation : utilise celle qui vaut $0$ sur le côté $[${S}${noms[0]})$.` }] : []).concat([{ valeur: m <= 170 ? m + 10 : m - 10, message: "Compte bien les traits : un petit trait vaut $5$°, et les nombres sont écrits de $20$° en $20$°." }]),
      aides: [`Le côté $[${S}${noms[0]})$ passe par le $0$ d'une des deux graduations : c'est celle-là qu'il faut lire.`, `Ici, c'est la graduation ${g ? "intérieure" : "extérieure"}. Suis-la jusqu'au côté $[${S}${noms[1]})$.`, `L'angle est ${m < 90 ? "aigu : sa mesure est plus petite que $90$°" : m > 90 ? "obtus : sa mesure est plus grande que $90$°" : "droit"}.`],
      solution: `On part du $0$ situé sur le côté $[${S}${noms[0]})$ (graduation ${g ? "intérieure" : "extérieure"}) et on lit la graduation sous le côté $[${S}${noms[1]})$ : $${m}$°. Contrôle : l'angle est ${m < 90 ? "aigu" : m > 90 ? "obtus" : "droit"}.` };
  };

  GEN["an6-calcul"] = function () {
    const t = rand(0, 4), [x, y, z] = shuffle([["x", "y", "z"], ["u", "v", "w"], ["x", "y", "t"], ["r", "s", "t"]])[0], O = pick(["O", "S", "A", "K"]);
    if (t === 0) { const a = rand(10, 80), b = rand(10, 90), d0 = rand(0, 170 - a - b > 0 ? Math.min(30, 170 - a - b) : 0);
      return { enonce: `Les angles $${ang(x, O, z)}$ et $${ang(z, O, y)}$ sont adjacents : $${ang(x, O, z)} = ${a}$° et $${ang(z, O, y)} = ${b}$°. Combien mesure $${ang(x, O, y)}$ ?`, figure: figRayons({ O, rays: [[d0, x], [d0 + a, z], [d0 + a + b, y]], arcs: [[d0, d0 + a, `${a}°`], [d0 + a, d0 + a + b, `${b}°`], [d0, d0 + a + b, "?", 68, false, a > b ? a / (2 * (a + b)) : (2 * a + b) / (2 * (a + b))]], aria: `Angles adjacents de ${a}° et ${b}° ; l'angle total est inconnu` }),
        mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: a + b,
        erreurs: [{ valeur: Math.abs(a - b), message: "Les deux angles sont côte à côte : leurs mesures s'**additionnent**." }, { valeur: 180 - a - b, message: `L'angle $${ang(x, O, y)}$ n'est pas forcément plat : il est formé des deux angles mis côte à côte.` }],
        aides: ["Deux angles **adjacents** ont le même sommet, un côté commun, et sont de part et d'autre de ce côté.", `L'angle $${ang(x, O, y)}$ est formé des deux angles mis côte à côte.`, `Calcule $${a} + ${b}$.`], solution: `$${ang(x, O, y)} = ${ang(x, O, z)} + ${ang(z, O, y)} = ${a} + ${b} = ${a + b}$°.` }; }
    if (t === 1) { const a = rand(5, 175);
      return { enonce: `Les angles $${ang(x, O, z)}$ et $${ang(z, O, y)}$ sont supplémentaires et $${ang(x, O, z)} = ${a}$°. Combien mesure $${ang(z, O, y)}$ ?`, figure: figRayons({ O, rays: [[0, x], [a, z], [180, y]], arcs: [[0, a, `${a}°`], [a, 180, "?"]], aria: `Angle plat partagé en un angle de ${a}° et un angle inconnu` }),
        mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: 180 - a,
        erreurs: [{ valeur: 90 - a, message: "Supplémentaires : la somme fait $180$°, pas $90$°." }, { valeur: 360 - a, message: "Supplémentaires : la somme fait $180$° (un angle plat)." }],
        aides: ["Deux angles **supplémentaires** ont une somme de $180$°.", `Il manque donc $180 - ${a}$.`, "Ensemble, ils forment un angle plat."], solution: `$${ang(x, O, z)} + ${ang(z, O, y)} = 180$°, donc $${ang(z, O, y)} = 180 - ${a} = ${180 - a}$°.` }; }
    if (t === 2) { const a = rand(20, 160), k = pick([2, 3, 4]), fig = figureSecantes(a), bon = k === 3 ? a : 180 - a;
      return { enonce: `Deux droites se coupent en $O$. L'angle n° $1$ mesure $${a}$°. Combien mesure l'angle n° $${k}$ ?`, figure: fig, mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: bon,
        erreurs: k === 3 ? [{ valeur: 180 - a, message: "Les angles n° $1$ et n° $3$ sont opposés par le sommet : ils ont la **même** mesure." }, { valeur: 360 - a, message: "Ils ne forment pas un tour complet : ils sont opposés par le sommet, donc égaux." }]
          : [{ valeur: a, message: `Les angles n° $1$ et n° $${k}$ ne sont pas opposés : ils forment un angle plat.` }, { valeur: 360 - a, message: "Ensemble, ils forment un angle plat ($180$°), pas un tour complet." }],
        aides: ["Les angles n° $1$ et n° $3$ sont **opposés par le sommet** : ils ont la même mesure.", "Les angles n° $1$ et n° $2$ (ou n° $1$ et n° $4$) forment un angle plat : ils sont supplémentaires.", "$180$° pour un demi-tour."],
        solution: k === 3 ? `Les angles n° $1$ et n° $3$ sont opposés par le sommet : ils mesurent tous les deux $${a}$°.` : `Les angles n° $1$ et n° $${k}$ forment un angle plat : $180 - ${a} = ${180 - a}$°.` }; }
    if (t === 3) { const a = rand(10, 80), d0 = rand(0, 60);
      return { enonce: `L'angle $${ang(x, O, y)}$ est droit. La demi-droite $[${O}${z})$ le partage en deux angles, et $${ang(x, O, z)} = ${a}$°. Combien mesure $${ang(z, O, y)}$ ?`, figure: figRayons({ O, rays: [[d0, x], [d0 + a, z], [d0 + 90, y]], arcs: [[d0, d0 + a, `${a}°`, a < 35 ? 56 : 34], [d0 + a, d0 + 90, "?", 90 - a < 35 ? 56 : 34]], droits: [[d0, d0 + 90]], aria: `Angle droit partagé en un angle de ${a}° et un angle inconnu` }),
        mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: 90 - a,
        erreurs: [{ valeur: 180 - a, message: "L'angle de départ est droit : $90$°, pas $180$°." }, { valeur: 90 + a, message: "On cherche une partie de l'angle droit : on soustrait." }],
        aides: ["Un angle droit mesure $90$°.", `Les deux angles adjacents font ensemble $90$°.`, `Calcule $90 - ${a}$.`], solution: `$${ang(x, O, z)} + ${ang(z, O, y)} = 90$°, donc $${ang(z, O, y)} = 90 - ${a} = ${90 - a}$°.` }; }
    const a = rand(30, 140), b = rand(30, 330 - a - 20 > 30 ? Math.min(170, 330 - a - 20) : 30);
    return { enonce: `Autour du point $${O}$, trois angles adjacents font un tour complet. Deux d'entre eux mesurent $${a}$° et $${b}$°. Combien mesure le troisième ?`, figure: figRayons({ O, plein: true, rays: [[90, x], [90 + a, y], [90 + a + b, z]], arcs: [[90, 90 + a, `${a}°`, a < 60 ? 40 : 24], [90 + a, 90 + a + b, `${b}°`, b < 60 ? 40 : 24], [90 + a + b, 450, "?", 360 - a - b < 60 ? 40 : 24]], aria: `Trois angles autour d'un point : ${a}°, ${b}° et un angle inconnu` }),
      mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: 360 - a - b,
      erreurs: [{ valeur: 180 - a - b, message: "Un tour complet, c'est $360$°, pas $180$°." }, { valeur: a + b, message: "Ça, c'est la somme des deux angles connus : il faut encore la retirer de $360$°." }],
      aides: ["Un tour complet est un angle plein : $360$°.", "Les trois angles ensemble font $360$°.", `Calcule $360 - ${a} - ${b}$.`], solution: `$360 - ${a} - ${b} = ${360 - a - b}$°.` };
  };

  GEN["an6-bissectrice"] = function () {
    const r = Math.random(), t = r < 0.05 ? 6 : rand(0, 5), O = pick(["O", "S", "A", "K"]), [x, y, z, w] = shuffle([["x", "y", "z", "t"], ["u", "v", "w", "t"], ["x", "y", "d", "t"], ["r", "s", "z", "t"]])[0];
    const X = ang(x, O, y), XZ = ang(x, O, z), ZY = ang(z, O, y);
    // figure : l'angle, sa bissectrice, les deux moitiés codées ; « haut » et « bas » = textes de l'angle entier et d'une moitié
    const fig = (a, tout, moitie, d0) => figRayons({ O, rays: [[d0, x], [d0 + a / 2, z], [d0 + a, y]], arcs: [[d0, d0 + a / 2, moitie, a / 2 < 30 ? 50 : 32, true], [d0 + a / 2, d0 + a, "", a / 2 < 30 ? 50 : 32, true], [d0, d0 + a, tout, 76, false, 0.8]], aria: `[${O}${z}) bissectrice de l'angle ${x}${O}${y}` });
    if (t === 0) { const a = rand(15, 85) * 2, d0 = rand(0, Math.max(0, Math.min(30, 175 - a)));
      return { enonce: `La demi-droite $[${O}${z})$ est la bissectrice de l'angle $${X}$, qui mesure $${a}$°. Combien mesure $${XZ}$ ?`, figure: fig(a, `${a}°`, "?", d0), mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: a / 2,
        erreurs: [{ valeur: 2 * a, message: "La bissectrice **partage** l'angle en deux : chaque moitié est plus petite que l'angle entier." }, { valeur: 180 - a, message: "Ce n'est pas un angle supplémentaire : la bissectrice partage l'angle en deux angles égaux." }],
        aides: ["La bissectrice partage l'angle en **deux angles égaux**.", "Chacun des deux angles mesure la moitié de l'angle de départ.", `Calcule $${a} \\div 2$.`], solution: `$${XZ} = ${ZY} = ${a} \\div 2 = ${a / 2}$°.` }; }
    if (t === 1 || t === 2) { const b = rand(15, 85), d0 = rand(0, Math.max(0, Math.min(30, 175 - 2 * b))), autre = t === 2;
      return { enonce: `$[${O}${z})$ est la bissectrice de $${X}$ et $${XZ} = ${b}$°. Combien mesure $${autre ? ZY : X}$ ?`, figure: autre ? figRayons({ O, rays: [[d0, x], [d0 + b, z], [d0 + 2 * b, y]], arcs: [[d0, d0 + b, `${b}°`, b < 30 ? 50 : 32, true], [d0 + b, d0 + 2 * b, "?", b < 30 ? 50 : 32, true]], aria: `[${O}${z}) bissectrice de l'angle ${x}${O}${y}` }) : fig(2 * b, "?", `${b}°`, d0),
        mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: autre ? b : 2 * b,
        erreurs: autre ? [{ valeur: 2 * b, message: `Ça, c'est l'angle entier $${X}$. On demande l'autre moitié.` }, { valeur: 180 - b, message: "Les deux angles ne sont pas supplémentaires : ils sont égaux." }]
          : [{ valeur: b / 2, message: "L'angle entier est le **double** de chaque moitié." }, { valeur: b, message: "Ça, c'est une seule moitié : l'angle entier en contient deux." }],
        aides: ["La bissectrice partage l'angle en deux angles égaux.", `$${XZ} = ${ZY} = ${b}$°.`, autre ? "Les deux moitiés ont la même mesure." : `Calcule $2 \\times ${b}$.`], solution: autre ? `La bissectrice partage $${X}$ en deux angles égaux : $${ZY} = ${XZ} = ${b}$°.` : `$${X} = ${XZ} + ${ZY} = 2 \\times ${b} = ${2 * b}$°.` }; }
    if (t === 3) { // est-ce la bissectrice ?
      const p = rand(15, 75), egal = Math.random() < 0.5, q = egal ? p : p + pick([-1, 1]) * rand(3, 12), d0 = rand(0, 20);
      const c = melange(egal ? `Oui, car $${XZ} = ${ZY}$` : `Non, car $${XZ} \\neq ${ZY}$`, [egal ? `Non, car $${XZ} \\neq ${ZY}$` : `Oui, car $${XZ} = ${ZY}$`, `Oui, car $[${O}${z})$ est entre $[${O}${x})$ et $[${O}${y})$`, "On ne peut pas savoir sans tracer le cercle"]);
      return { enonce: `On a mesuré : $${XZ} = ${p}$° et $${ZY} = ${q}$°. La demi-droite $[${O}${z})$ est-elle la bissectrice de $${X}$ ?`, figure: figRayons({ O, rays: [[d0, x], [d0 + p, z], [d0 + p + q, y]], arcs: [[d0, d0 + p, `${p}°`], [d0 + p, d0 + p + q, `${q}°`]], aria: `Angles ${x}${O}${z} de ${p}° et ${z}${O}${y} de ${q}°` }), mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["La bissectrice partage l'angle en **deux angles de même mesure**.", "Compare les deux mesures.", "Être « entre » les deux côtés ne suffit pas."],
        solution: egal ? `$${XZ} = ${ZY} = ${p}$° : $[${O}${z})$ partage l'angle en deux angles égaux, c'est la bissectrice de $${X}$.` : `$${p}$° $\\neq$ $${q}$° : les deux angles ne sont pas égaux, $[${O}${z})$ n'est pas la bissectrice de $${X}$.` }; }
    if (t === 4) { // bissectrice d'une moitié
      const a = rand(15, 43) * 4, d0 = rand(0, Math.max(0, Math.min(25, 175 - a)));
      return { enonce: `$${X}$ mesure $${a}$°. $[${O}${z})$ est sa bissectrice, puis $[${O}${w})$ est la bissectrice de $${XZ}$. Combien mesure $${ang(x, O, w)}$ ?`, figure: figRayons({ O, rays: [[d0, x], [d0 + a / 4, w], [d0 + a / 2, z], [d0 + a, y]], arcs: [[d0, d0 + a / 4, "?", 58], [d0, d0 + a, `${a}°`, 82]], aria: `Angle de ${a}° partagé par deux bissectrices successives` }),
        mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: a / 4,
        erreurs: [{ valeur: a / 2, message: `Ça, c'est $${XZ}$ : il faut encore le partager en deux.` }, { valeur: a / 3, message: "On partage deux fois en deux, pas en trois." }],
        aides: [`$${XZ} = ${a} \\div 2 = ${a / 2}$°.`, `$[${O}${w})$ partage $${XZ}$ en deux angles égaux.`, `Calcule $${a / 2} \\div 2$.`], solution: `$${XZ} = ${a} \\div 2 = ${a / 2}$°, puis $${ang(x, O, w)} = ${a / 2} \\div 2 = ${a / 4}$°.` }; }
    if (t === 5) { // tracer au rapporteur
      const a = rand(12, 85) * 2;
      return { enonce: `Pour tracer au rapporteur la bissectrice d'un angle $${X}$ de $${a}$°, on place le centre en $${O}$ et le $0$ sur $[${O}${x})$. Devant quelle graduation faut-il placer le repère de la bissectrice ?`, figure: rapporteur(a, false, [x, O, y]), mode: "nombre", prefixe: "Graduation :", suffixe: "°", attendu: a / 2,
        erreurs: [{ valeur: 180 - a / 2, message: "Lis sur la graduation qui part de $0$ sur $[" + O + x + ")$." }, { valeur: a, message: "Ça, c'est la mesure de l'angle entier : la bissectrice est à la moitié." }],
        aides: ["La bissectrice partage l'angle en deux angles égaux.", `La moitié de $${a}$°, c'est $${a} \\div 2$.`, "On lit sur la graduation qui vaut $0$ sur le premier côté."],
        solution: `$${a} \\div 2 = ${a / 2}$ : on place un repère devant $${a / 2}$° (sur la graduation qui part de $0$ sur $[${O}${x})$), puis on trace la demi-droite issue de $${O}$ qui passe par ce repère.` }; }
    const forme = rand(0, 2), bon = ["la demi-droite qui partage l'angle en deux angles de même mesure", "elle part du sommet et partage l'angle en deux angles égaux", "deux angles de même mesure"][forme];
    const c = melange(bon, [["la droite perpendiculaire à un côté", "la demi-droite qui partage l'angle en un angle droit et un autre", "le segment qui relie les extrémités des deux côtés"], ["elle est perpendiculaire à un des côtés", "elle passe par le milieu d'un côté", "elle forme toujours un angle droit avec un côté"], ["deux angles droits", "deux angles supplémentaires", "un angle aigu et un angle obtus"]][forme]);
    return { enonce: ["La bissectrice d'un angle est :", "Quelle phrase décrit la bissectrice d'un angle ?", "La bissectrice d'un angle saillant le partage en :"][forme], mode: "choix", choix: c.choix, attendu: c.attendu,
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
  const NOMS_TRI = () => shuffle([["A", "B", "C"], ["D", "E", "F"], ["M", "N", "P"], ["R", "S", "T"], ["I", "J", "K"], ["E", "F", "G"], ["U", "V", "W"], ["K", "L", "M"]].slice())[0];
  FIGURES["tg6-somme"] = () => figureTriangle([[40, 160], [280, 160], [110, 30]], ["A", "B", "C"], { angles: [[0, "62°"], [1, "37°"], [2, "?"]] });
  FIGURES["tg6-isocele"] = () => figureTriangle([[60, 165], [260, 165], [160, 25]], ["B", "C", "A"], { codes: [["A", "B", 2], ["A", "C", 2]], angles: [[0, "55°"], [1, "55°"], [2, "70°"]], aria: "Triangle ABC isocèle en A : AB = AC, angles à la base de 55°" });

  // Un triangle « type » tourné et placé au hasard dans le cadre (sommets dans l'ordre des noms)
  function placeTri(Q, tourner) {
    const th = tourner === false ? 0 : (pick([0, 90, 180, 270]) + rand(-15, 15)) * Math.PI / 180, R = Q.map(([x, y]) => [x * Math.cos(th) - y * Math.sin(th), x * Math.sin(th) + y * Math.cos(th)]);
    const xs = R.map((p) => p[0]), ys = R.map((p) => p[1]), k = Math.min(220 / (Math.max(...xs) - Math.min(...xs)), 140 / (Math.max(...ys) - Math.min(...ys)));
    const cx = (Math.max(...xs) + Math.min(...xs)) / 2, cy = (Math.max(...ys) + Math.min(...ys)) / 2;
    return R.map(([x, y]) => [+(160 + (x - cx) * k).toFixed(1), +(98 + (y - cy) * k).toFixed(1)]);
  }
  /* Triangle inscrit dans son cercle circonscrit (centre [160, 112], rayon 92) ; ecarts = arcs entre les sommets (somme 360°).
     o = { cercle, med (médiatrices), rayons: [[k, texte]] (segments du centre au sommet k), aria } */
  function figCirconscrit(noms, O, ecarts, o) {
    o = o || {};
    const c = [160, 112], R = 92, t0 = o.t0 === undefined ? rand(0, 359) : o.t0, an = [t0, t0 + ecarts[0], t0 + ecarts[0] + ecarts[1]];
    const P = an.map((a) => [+(c[0] + R * Math.cos((a * Math.PI) / 180)).toFixed(1), +(c[1] - R * Math.sin((a * Math.PI) / 180)).toFixed(1)]);
    const pts = { [noms[0]]: P[0], [noms[1]]: P[1], [noms[2]]: P[2] }, decal = {};
    noms.forEach((nm, k) => { decal[nm] = decalDe(c, P[k], 13); });
    const cotes = [[0, 1], [1, 2], [2, 0]], codes = [], extra = [];
    if (o.med) cotes.forEach(([i, j], k) => {
      const M = [(P[i][0] + P[j][0]) / 2, (P[i][1] + P[j][1]) / 2], nM = "m" + k, dx = M[0] - c[0], dy = M[1] - c[1], L = Math.hypot(dx, dy);
      const u = L > 2 ? [dx / L, dy / L] : [-(P[j][1] - P[i][1]) / Math.hypot(P[j][0] - P[i][0], P[j][1] - P[i][1]), (P[j][0] - P[i][0]) / Math.hypot(P[j][0] - P[i][0], P[j][1] - P[i][1])];
      pts[nM] = [+M[0].toFixed(1), +M[1].toFixed(1)]; codes.push([noms[i], nM, k + 1], [nM, noms[j], k + 1]);
      extra.push(`<line class="g-droite" x1="${+(c[0] - u[0] * 34).toFixed(1)}" y1="${+(c[1] - u[1] * 34).toFixed(1)}" x2="${+(c[0] + u[0] * (L + 34)).toFixed(1)}" y2="${+(c[1] + u[1] * (L + 34)).toFixed(1)}"/>`);
    });
    if (o.centre !== false) { pts[O] = c; decal[O] = [7, 15]; }
    let s = geo({ W: 320, H: 226, pts, segs: [[noms[0], noms[1]], [noms[1], noms[2]], [noms[2], noms[0]], ...(o.rayons || []).map(([k]) => [O, noms[k]])], codes, caches: ["m0", "m1", "m2"], decal, aria: o.aria || `Triangle ${noms.join("")}${o.cercle ? " et son cercle circonscrit de centre " + O : ""}` });
    const fond = (o.cercle ? `<circle class="g-cercle" cx="${c[0]}" cy="${c[1]}" r="${R}"/>` : "") + extra.join("");
    s = s.replace(/(<svg[^>]*>)/, `$1${fond}`);
    (o.rayons || []).forEach(([k, txt]) => { const m = [(c[0] + P[k][0]) / 2, (c[1] + P[k][1]) / 2], dx = P[k][0] - c[0], dy = P[k][1] - c[1], L = Math.hypot(dx, dy); s = s.replace("</svg>", `<text class="g-mesure" x="${+(m[0] - (dy / L) * 12).toFixed(1)}" y="${+(m[1] + (dx / L) * 12 + 4).toFixed(1)}" text-anchor="middle">${txt}</text></svg>`); });
    return s;
  }
  // Construction au compas : [AB] (le plus grand côté) tracé, arcs de centre A (rayon b) et de centre B (rayon a)
  function figArcs(noms, a, b, c) {
    const [A, B, C] = noms, k = Math.min(24, 224 / c, 120 / Math.max(a, b)), PA = [48, 150], PB = [+(48 + c * k).toFixed(1), 150], ra = +(b * k).toFixed(1), rb = +(a * k).toFixed(1);
    const arc = (P, rr, d0, d1) => { const q = (d) => [+(P[0] + rr * Math.cos((d * Math.PI) / 180)).toFixed(1), +(P[1] - rr * Math.sin((d * Math.PI) / 180)).toFixed(1)], [p0, p1] = [q(d0), q(d1)]; return `<path class="g-arc" d="M${p0[0]} ${p0[1]} A${rr} ${rr} 0 0 0 ${p1[0]} ${p1[1]}"/>`; };
    let s = `<svg class="graph geo" viewBox="0 0 320 178" role="img" aria-label="Construction au compas : segment ${A}${B} de ${c} cm, arc de centre ${A} de rayon ${b} cm, arc de centre ${B} de rayon ${a} cm">`;
    s += `<line class="g-segment" x1="${PA[0]}" y1="${PA[1]}" x2="${PB[0]}" y2="${PB[1]}"/>`;
    const x = (b * b - a * a + c * c) / (2 * c), y2 = b * b - x * x, coupe = a + b >= c;
    s += arc(PA, ra, 0, 100) + arc(PB, rb, 80, 180);
    if (coupe) { const PC = [+(PA[0] + x * k).toFixed(1), +(PA[1] - Math.sqrt(Math.max(0, y2)) * k).toFixed(1)]; s += `<line class="g-cache" x1="${PA[0]}" y1="${PA[1]}" x2="${PC[0]}" y2="${PC[1]}"/><line class="g-cache" x1="${PB[0]}" y1="${PB[1]}" x2="${PC[0]}" y2="${PC[1]}"/><circle class="g-point" cx="${PC[0]}" cy="${PC[1]}" r="3"/><text class="g-plabel" x="${PC[0]}" y="${PC[1] - 8}" text-anchor="middle">${C}</text>`; }
    s += `<circle class="g-point" cx="${PA[0]}" cy="${PA[1]}" r="3"/><circle class="g-point" cx="${PB[0]}" cy="${PB[1]}" r="3"/><text class="g-plabel" x="${PA[0] - 6}" y="${PA[1] + 16}">${A}</text><text class="g-plabel" x="${PB[0]}" y="${PB[1] + 16}">${B}</text><text class="g-mesure" x="${+((PA[0] + PB[0]) / 2).toFixed(1)}" y="${PA[1] + 16}" text-anchor="middle">${c} cm</text>`;
    return s + `</svg>`;
  }
  // Les trois longueurs dessinées à la même échelle, comme des baguettes
  function figBaguettes(L) {
    const k = Math.min(22, 200 / Math.max(...L.map((x) => x[1])));
    let s = `<svg class="graph geo" viewBox="0 0 320 ${L.length * 30 + 8}" role="img" aria-label="Trois segments de ${L.map((x) => x[1] + " cm").join(", ")}, à la même échelle">`;
    L.forEach(([nom, v], i) => { const y = 18 + i * 30; s += `<text class="g-plabel" x="8" y="${y + 4}">${nom}</text><line class="g-segment" x1="64" y1="${y}" x2="${+(64 + v * k).toFixed(1)}" y2="${y}"/><text class="g-mesure" x="${+(70 + v * k).toFixed(1)}" y="${y + 4}">${v} cm</text>`; });
    return s + `</svg>`;
  }
  // Trois angles dessinés séparément, côte à côte
  function figTroisAngles(M) {
    let s = `<svg class="graph geo" viewBox="0 0 320 92" role="img" aria-label="Trois angles de ${M.join("°, ")}°">`;
    M.forEach((m, k) => {
      const cx = 8 + k * 106 + (m > 90 ? 52 : 12), cy = 74, L = 46, r = (m * Math.PI) / 180, x2 = +(cx + L * Math.cos(r)).toFixed(1), y2 = +(cy - L * Math.sin(r)).toFixed(1);
      s += `<line class="g-segment" x1="${cx}" y1="${cy}" x2="${cx + L}" y2="${cy}"/><line class="g-segment" x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}"/><path class="g-arc" d="M${cx + 16} ${cy} A16 16 0 0 0 ${+(cx + 16 * Math.cos(r)).toFixed(1)} ${+(cy - 16 * Math.sin(r)).toFixed(1)}"/>`;
      s += `<text class="g-mesure" x="${+(cx + 30 * Math.cos(r / 2)).toFixed(1)}" y="${+(cy - 30 * Math.sin(r / 2) + 4).toFixed(1)}" text-anchor="middle">${m}°</text>`;
    });
    return s + `</svg>`;
  }
  FIGURES["tg6-cours-construction"] = () => figArcs(["A", "B", "C"], 5, 4, 6);
  FIGURES["tg6-cours-circonscrit"] = () => figCirconscrit(["A", "B", "C"], "O", [110, 140, 110], { cercle: true, med: true, t0: 210, aria: "Triangle ABC, les médiatrices de ses trois côtés concourantes en O, et le cercle circonscrit de centre O" });
  FIGURES["tg6-cours-particuliers"] = () => figureTriangle([[75, 176], [245, 176], [160, 28.8]], ["A", "B", "C"], { H: 198, codes: [["A", "B", 1], ["B", "C", 1], ["C", "A", 1]], angles: [[0, "60°"], [1, "60°"], [2, "60°"]], aria: "Triangle équilatéral ABC : trois côtés égaux et trois angles de 60°" });
  FIGURES["tg6-qcm-rectangle"] = () => figCirconscrit(["A", "B", "C"], "O", [180, 120, 60], { cercle: true, t0: 200, aria: "Triangle ABC rectangle en C inscrit dans son cercle circonscrit de centre O, milieu de [AB]" });
  FIGURES["tg6-qcm-arcs"] = () => figArcs(["A", "B", "C"], 3, 4, 8);
  FIGURES["tg6-qcm-angles"] = () => figTroisAngles([50, 60, 80]);
  FIGURES["tg6-qcm-isocele"] = () => figureTriangle([[60, 160], [260, 160], [160, 20]], ["B", "C", "A"], { codes: [["A", "B", 1], ["A", "C", 1]], angles: [[2, "40°"], [0, "?"]], aria: "Triangle ABC isocèle en A, angle au sommet de 40°" });
  FIGURES["tg6-qcm-equi"] = () => figureTriangle(placeTri([[0, 0], [2, 0], [1, 1.732]], false), ["D", "E", "F"], { codes: [["D", "E", 2], ["E", "F", 2], ["F", "D", 2]], aria: "Triangle DEF avec trois côtés codés de la même façon" });

  GEN["tg6-nature"] = function () {
    const n = NOMS_TRI(), [A, B, C] = n, t = rand(0, 5);
    const NAT = ["Un triangle isocèle", "Un triangle équilatéral", "Un triangle rectangle", "Un triangle rectangle isocèle", "Un triangle quelconque"];
    const aides = ["Les petits traits identiques indiquent des côtés de même longueur.", "Le petit carré indique un angle droit.", "On ne se fie qu'au codage (ou aux mesures), pas à l'impression visuelle."];
    if (t === 5) { // avec des longueurs ou un angle, sans figure
      const k = rand(0, 3), x = rand(3, 12), y = x + pick([-2, -1, 1, 2, 3]);
      const [txt, nom, expl] = [[`$${A}${B} = ${x}$ cm, $${A}${C} = ${x}$ cm et $${B}${C} = ${y}$ cm`, "Un triangle isocèle", `$${A}${B} = ${A}${C}$ : deux côtés de même longueur, il est isocèle en $${A}$`],
        [`$${A}${B} = ${B}${C} = ${C}${A} = ${x}$ cm`, "Un triangle équilatéral", "ses trois côtés ont la même longueur"],
        [`$\\widehat{${A}${B}${C}} = 90$°, $${A}${B} = ${x}$ cm et $${B}${C} = ${y}$ cm`, "Un triangle rectangle", `il a un angle droit en $${B}$ (et ses côtés de l'angle droit sont différents)`],
        [`$\\widehat{${B}${A}${C}} = 90$° et $${A}${B} = ${A}${C} = ${x}$ cm`, "Un triangle rectangle isocèle", `il a un angle droit en $${A}$ et deux côtés égaux : $${A}${B} = ${A}${C}$`]][k];
      const aussi = { "Un triangle équilatéral": ["Un triangle isocèle"], "Un triangle rectangle isocèle": ["Un triangle isocèle", "Un triangle rectangle"] }[nom] || [];
      const c = melange(nom, shuffle(NAT.filter((v) => v !== nom && !aussi.includes(v))).slice(0, 3));
      return { enonce: `Le triangle $${A}${B}${C}$ est tel que ${txt}. Quelle est sa nature la plus précise ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides, solution: `${nom} : ${expl}.` };
    }
    const formes = [
      { nom: NAT[0], Q: [[0, 0], [2, 0], [1, rand(15, 30) / 10]], codes: [[C, A, 2], [C, B, 2]], txt: `il a deux côtés de même longueur : $${C}${A} = ${C}${B}$. Il est isocèle en $${C}$` },
      { nom: NAT[1], Q: [[0, 0], [2, 0], [1, 1.732]], codes: [[A, B, 1], [B, C, 1], [C, A, 1]], txt: "ses trois côtés ont la même longueur" },
      { nom: NAT[2], Q: [[0, 0], [0, rand(10, 16) / 10], [rand(18, 26) / 10, 0]], droit: [[B, A, C]], txt: `il a un angle droit, en $${A}$` },
      { nom: NAT[3], Q: [[0, 0], [0, 1.5], [1.5, 0]], droit: [[B, A, C]], codes: [[A, B, 1], [A, C, 1]], txt: `il a un angle droit en $${A}$ et deux côtés de même longueur, $${A}${B} = ${A}${C}$` },
      { nom: NAT[4], Q: [[0, 0], [2.4, 0.2], [rand(6, 14) / 10, rand(13, 17) / 10]], txt: "il n'a ni côtés de même longueur codés, ni angle droit" }
    ];
    const F = formes[t];
    // une réponse plus précise rend vraies les réponses plus générales : on retire ces dernières des choix
    const aussiVrai = { "Un triangle équilatéral": ["Un triangle isocèle"], "Un triangle rectangle isocèle": ["Un triangle isocèle", "Un triangle rectangle"] }[F.nom] || [];
    const c = melange(F.nom, shuffle(NAT.filter((x) => x !== F.nom && !aussiVrai.includes(x))).slice(0, 3));
    return { enonce: `D'après le codage de la figure, quelle est la nature du triangle $${A}${B}${C}$ ?`, figure: figureTriangle(placeTri(F.Q), n, { codes: F.codes, droit: F.droit }), mode: "choix", choix: c.choix, attendu: c.attendu, aides,
      solution: `${F.nom} : ${F.txt}.` };
  };

  GEN["tg6-somme"] = function () {
    const n = NOMS_TRI(), [A, B, C] = n, t = rand(0, 4), h = (x, y, z) => `\\widehat{${x}${y}${z}}`;
    if (t === 0) { const a = rand(20, 110), b = rand(15, 160 - a), c = 180 - a - b;
      const P = [[40, 160], [280, 160], [rand(90, 200), 30]];
      return { enonce: `Dans le triangle $${A}${B}${C}$, $${h(C, A, B)} = ${a}$° et $${h(A, B, C)} = ${b}$°. Combien mesure $${h(A, C, B)}$ ? (La figure n'est pas en vraie grandeur.)`, figure: figureTriangle(P, n, { angles: [[0, a + "°"], [1, b + "°"], [2, "?"]] }), mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: c,
        erreurs: [{ valeur: 360 - a - b, message: "La somme des angles d'un triangle fait $180$°, pas $360$°." }, { valeur: a + b, message: "Il faut retirer les deux angles connus de $180$°." }],
        aides: ["La somme des trois angles d'un triangle est toujours $180$°.", `$${a} + ${b} = ${a + b}$.`, `Calcule $180 - ${a + b}$.`], solution: `$180 - ${a} - ${b} = ${c}$° : $${h(A, C, B)} = ${c}$°.` }; }
    const isoFig = (txtA, txtB) => figureTriangle([[60, 160], [260, 160], [160, rand(20, 50)]], [B, C, A], { codes: [[A, B, 1], [A, C, 1]], angles: [[2, txtA], [0, txtB]], aria: `Triangle ${A}${B}${C} isocèle en ${A}` });
    if (t === 1) { const b = rand(20, 85), sommet = 180 - 2 * b;
      return { enonce: `Le triangle $${A}${B}${C}$ est isocèle en $${A}$, et $${h(A, B, C)} = ${b}$°. Combien mesure $${h(B, A, C)}$ ? (La figure n'est pas en vraie grandeur.)`, figure: isoFig("?", `${b}°`), mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: sommet,
        erreurs: [{ valeur: 180 - b, message: `Les deux angles à la base, en $${B}$ et en $${C}$, mesurent tous les deux $${b}$°.` }, { valeur: b, message: "C'est un angle à la base qui est égal à l'autre angle à la base, pas l'angle au sommet." }],
        aides: [`Isocèle en $${A}$ : les angles à la base, $${h(A, B, C)}$ et $${h(A, C, B)}$, ont la même mesure.`, `Donc $${h(A, C, B)} = ${b}$°.`, `$180 - ${b} - ${b}$.`], solution: `$${h(A, C, B)} = ${h(A, B, C)} = ${b}$°, donc $${h(B, A, C)} = 180 - 2 \\times ${b} = ${sommet}$°.` }; }
    if (t === 2) { const s0 = rand(10, 80) * 2, base = (180 - s0) / 2;
      return { enonce: `Le triangle $${A}${B}${C}$ est isocèle en $${A}$, et $${h(B, A, C)} = ${s0}$°. Combien mesure $${h(A, B, C)}$ ? (La figure n'est pas en vraie grandeur.)`, figure: isoFig(`${s0}°`, "?"), mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: base,
        erreurs: [{ valeur: 180 - s0, message: "Il reste $" + (180 - s0) + "$° à partager entre les deux angles à la base." }, { valeur: s0 / 2, message: "On ne partage pas l'angle au sommet : on partage ce qui reste, $180 - " + s0 + "$." }],
        aides: [`Il reste $180 - ${s0} = ${180 - s0}$° pour les deux angles à la base.`, "Les deux angles à la base sont égaux.", `Calcule $${180 - s0} \\div 2$.`], solution: `$(180 - ${s0}) \\div 2 = ${base}$° : $${h(A, B, C)} = ${base}$°.` }; }
    if (t === 3) { const a = rand(10, 80), Q = placeTri([[0, 0], [0, 1.3], [2.2, 0]]);
      return { enonce: `Le triangle $${A}${B}${C}$ est rectangle en $${A}$, et $${h(A, B, C)} = ${a}$°. Combien mesure $${h(A, C, B)}$ ? (La figure n'est pas en vraie grandeur.)`, figure: figureTriangle(Q, n, { droit: [[B, A, C]], angles: [[1, `${a}°`], [2, "?"]], aria: `Triangle ${A}${B}${C} rectangle en ${A}` }), mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: 90 - a,
        erreurs: [{ valeur: 180 - a, message: `N'oublie pas l'angle droit en $${A}$ : $90$°.` }, { valeur: 270 - a, message: "La somme des angles d'un triangle fait $180$°, pas $360$°." }],
        aides: [`L'angle en $${A}$ est droit : $90$°.`, "Il reste $180 - 90 = 90$° pour les deux autres angles.", `Calcule $90 - ${a}$.`], solution: `$180 - 90 - ${a} = ${90 - a}$° : $${h(A, C, B)} = ${90 - a}$°.` }; }
    // triangles équilatéraux et rectangles isocèles : des angles connus
    const k = rand(0, 2), [x, y, z] = shuffle([A, B, C]);
    const [txt, rep, expl, fx] = [[`équilatéral. Combien mesure l'angle $${h(x, y, z)}$`, 60, "Trois angles égaux de somme $180$° : chacun mesure $180 \\div 3 = 60$°.", [90, 45, 180]],
      [`équilatéral. Combien vaut la somme $${h(x, y, z)} + ${h(y, z, x)}$`, 120, "Chaque angle mesure $180 \\div 3 = 60$°, donc deux angles font $60 + 60 = 120$°.", [60, 180, 90]],
      [`rectangle et isocèle en $${y}$. Combien mesure l'angle $${h(y, x, z)}$`, 45, `L'angle droit est en $${y}$ ; les deux autres angles sont égaux et font $90$° à eux deux : $90 \\div 2 = 45$°.`, [90, 60, 30]]][k];
    const c = melange(`$${rep}$°`, fx.map((v) => `$${v}$°`));
    return { enonce: `Le triangle $${A}${B}${C}$ est ${txt} ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["La somme des trois angles d'un triangle fait $180$°.", k < 2 ? "Dans un triangle équilatéral, les trois angles sont égaux." : "Dans un triangle isocèle, les deux angles à la base sont égaux.", k < 2 ? "$180 \\div 3$." : "Il reste $180 - 90 = 90$° pour les deux angles à la base."], solution: expl };
  };

  GEN["tg6-construire"] = function () {
    const t = rand(0, 2), n = NOMS_TRI(), [A, B, C] = n;
    let a, b, c;
    if (t === 0) { a = rand(3, 9); b = rand(3, 9); c = rand(Math.max(a, b), a + b - 1); }
    else if (t === 1) { a = rand(2, 7); b = rand(2, 7); c = a + b + rand(1, 5); }
    else { a = rand(2, 7); b = rand(2, 7); c = a + b; }
    // c est le plus grand côté : on le pose sur [AB], a = BC et b = AC
    const L = shuffle([[`${A}${B}`, c], [`${B}${C}`, a], [`${A}${C}`, b]]), plus = c, autres = a + b;
    const choix = ["Oui, on peut construire ce triangle", "Non : le plus grand côté est trop long, les arcs ne se coupent pas", "Non : les trois points sont alignés (triangle « aplati »)"];
    const ordre = [`$${A}${B} = ${c}$ cm`, `$${B}${C} = ${a}$ cm`, `$${A}${C} = ${b}$ cm`].sort(() => Math.random() - 0.5);
    return { enonce: `Peut-on construire un triangle $${A}${B}${C}$ avec ${ordre.join(", ")} ?`, figure: figBaguettes(L), figureSolution: figArcs(n, a, b, c), mode: "choix", choix, attendu: t,
      aides: ["Compare le plus grand côté à la somme des deux autres.", `Ici, le plus grand côté mesure $${plus}$ cm et les deux autres font ensemble $${a} + ${b} = ${autres}$ cm.`, "Plus petit : on peut construire. Égal : points alignés. Plus grand : impossible."],
      solution: `Plus grand côté : $${plus}$ cm ; somme des deux autres : $${a} + ${b} = ${autres}$ cm. ${[`$${plus} < ${autres}$ : les deux arcs de cercle se coupent, le triangle existe.`, `$${plus} > ${autres}$ : les deux autres côtés sont trop courts pour se rejoindre, le triangle n'existe pas.`, `$${plus} = ${autres}$ : les trois points sont alignés, on n'obtient pas un vrai triangle.`][t]} Le dessin montre la construction au compas.` };
  };

  GEN["tg6-angles-possibles"] = function () {
    const ok = Math.random() < 0.5, a = rand(20, 100), b = rand(15, 150 - a), c = ok ? 180 - a - b : 180 - a - b + pick([-20, -10, 10, 20, 30]);
    if (c <= 0) return GEN["tg6-angles-possibles"]();
    const n = NOMS_TRI(), s3 = a + b + c;
    const choix = ["Oui, la somme fait bien $180$°", "Non, la somme ne fait pas $180$°"];
    const cc = melange(choix[ok ? 0 : 1], [choix[ok ? 1 : 0], "Oui, tout triangle peut avoir ces angles", "On ne peut pas savoir sans mesurer les côtés"]);
    return { enonce: `Un triangle $${n.join("")}$ peut-il avoir des angles de $${a}$°, $${b}$° et $${c}$° ?`, figure: figTroisAngles([a, b, c]),
      figureSolution: figRayons({ c: [160, 112], r: 84, H: 196, rays: [[0, ""], [a, ""], [a + b, ""], [s3, ""]], arcs: [[0, a, `${a}°`, 28], [a, a + b, `${b}°`, 40], [a + b, s3, `${c}°`, 52]], lignes: [[0, 180]], aria: `Les trois angles mis côte à côte : ${s3}°` }),
      mode: "choix", choix: cc.choix, attendu: cc.attendu,
      aides: ["Additionne les trois mesures.", "Dans tout triangle, la somme des angles est $180$° : mis côte à côte, ils forment un angle plat.", `$${a} + ${b} + ${c} = ${s3}$.`],
      solution: `$${a} + ${b} + ${c} = ${s3}$ : ${ok ? "c'est $180$°, les trois angles mis côte à côte forment un angle plat : un tel triangle est possible." : "ce n'est pas $180$° (mis côte à côte, ils ne forment pas un angle plat) : un tel triangle est impossible."}` };
  };

  GEN["tg6-circonscrit"] = function () {
    const t = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 0][rand(0, 11)], n = NOMS_TRI(), [A, B, C] = n, O = pick(["O", "K", "L", "I"]);
    const ecAigu = () => { let e; do { e = [rand(70, 170), rand(70, 170)]; e.push(360 - e[0] - e[1]); } while (e[2] < 70 || e[2] > 170); return e; };
    if (t === 0 || t === 5) { const r = Dc(rand(15, 80), 1), dia = t === 5;
      return { enonce: dia ? `$${O}$ est le centre du cercle circonscrit au triangle $${A}${B}${C}$, et $${O}${B} = ${tD(r)}$ cm. Quel est le diamètre de ce cercle ?` : `$${O}$ est le centre du cercle circonscrit au triangle $${A}${B}${C}$, et $${O}${A} = ${tD(r)}$ cm. Combien mesure $${O}${C}$ ?`,
        figure: figCirconscrit(n, O, ecAigu(), { cercle: true, rayons: dia ? [[1, `${tD(r).replace("{,}", ",")} cm`]] : [[0, `${tD(r).replace("{,}", ",")} cm`], [2, "?"]] }), mode: "nombre", prefixe: dia ? "Diamètre :" : `$${O}${C} =$`, suffixe: "cm", attendu: dia ? vD(r) * 2 : vD(r),
        erreurs: dia ? [{ valeur: vD(r), message: "Ça, c'est le rayon. Le diamètre mesure deux rayons." }, { valeur: vD(r) / 2, message: "Le diamètre est le **double** du rayon." }] : [{ valeur: vD(r) * 2, message: `$${O}${C}$ est un rayon, pas un diamètre.` }, { valeur: vD(r) / 2, message: `$${O}${C}$ est un rayon : il a la même longueur que $${O}${A}$.` }],
        aides: ["Le cercle circonscrit passe par les trois sommets du triangle.", `$${A}$, $${B}$ et $${C}$ sont sur un même cercle de centre $${O}$.`, `$${O}${A}$, $${O}${B}$ et $${O}${C}$ sont trois rayons.`],
        solution: dia ? `$${O}${B}$ est un rayon : le diamètre mesure $2 \\times ${tD(r)} = ${tD(Dc(r.m * 2, r.d))}$ cm.` : `$${O}${C}$ est un rayon du cercle circonscrit, comme $${O}${A}$ : $${O}${C} = ${tD(r)}$ cm.` }; }
    if (t === 1) { const forme = rand(0, 2), bon = ["C'est le centre du cercle qui passe par les trois sommets", `$${O}${A} = ${O}${B} = ${O}${C}$`, "C'est le centre du cercle circonscrit au triangle"][forme];
      const c = melange(bon, [`C'est le milieu du côté $[${A}${B}]$`, "C'est le point de rencontre des bissectrices", "Il est toujours à l'intérieur du triangle", `$${O}${A} + ${O}${B} = ${A}${B}$`].slice(forme === 1 ? 1 : 0, forme === 1 ? 4 : 3));
      return { enonce: `Les trois droites tracées sont les médiatrices des côtés du triangle $${A}${B}${C}$ ; elles se coupent en $${O}$. Que peut-on dire de $${O}$ ?`, figure: figCirconscrit(n, O, ecAigu(), { med: true }), mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Tout point de la médiatrice d'un segment est à égale distance de ses extrémités.", `$${O}$ est sur les trois médiatrices : il est à égale distance de $${A}$, $${B}$ et $${C}$.`, "Un cercle de centre $" + O + "$ passe donc par les trois sommets."],
        solution: `$${O}$ est sur la médiatrice de $[${A}${B}]$, donc $${O}${A} = ${O}${B}$, et sur celle de $[${B}${C}]$, donc $${O}${B} = ${O}${C}$. Ainsi $${O}${A} = ${O}${B} = ${O}${C}$ : $${O}$ est le centre du cercle circonscrit au triangle.` }; }
    if (t === 2) { const c = melange(`Le cercle qui passe par $${A}$, $${B}$ et $${C}$`, [`Le cercle de diamètre $[${A}${B}]$ seulement`, `Le cercle de centre $${A}$ qui passe par $${B}$`, "Le cercle tracé à l'intérieur du triangle"]);
      return { enonce: pick([`Le cercle circonscrit au triangle $${A}${B}${C}$ est :`, `Quel est le cercle circonscrit au triangle $${A}${B}${C}$ ?`, `On veut tracer le cercle circonscrit au triangle $${A}${B}${C}$. De quel cercle s'agit-il ?`]), mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["« Circonscrit » : qui entoure, qui est autour.", "Il passe par les trois sommets.", "Son centre est le point de rencontre des médiatrices."],
        solution: `Le cercle circonscrit au triangle $${A}${B}${C}$ est le cercle qui passe par ses trois sommets $${A}$, $${B}$ et $${C}$.` }; }
    if (t === 3) { const r = Dc(rand(15, 80), 1);
      return { enonce: `Le point $${O}$ est sur la médiatrice de $[${A}${B}]$ et sur la médiatrice de $[${B}${C}]$. On sait que $${O}${A} = ${tD(r)}$ cm. Combien mesure $${O}${C}$ ?`, figure: figCirconscrit(n, O, ecAigu(), { med: true }), mode: "nombre", prefixe: `$${O}${C} =$`, suffixe: "cm", attendu: vD(r),
        erreurs: [{ valeur: vD(r) * 2, message: `On ne double pas : $${O}${A} = ${O}${B}$ et $${O}${B} = ${O}${C}$.` }, { valeur: vD(r) / 2, message: `$${O}$ est à la même distance des trois sommets.` }],
        aides: [`$${O}$ est sur la médiatrice de $[${A}${B}]$ : $${O}${A} = ${O}${B}$.`, `$${O}$ est sur la médiatrice de $[${B}${C}]$ : $${O}${B} = ${O}${C}$.`, `Donc $${O}${C} = ${O}${A}$.`],
        solution: `$${O}${A} = ${O}${B}$ (médiatrice de $[${A}${B}]$) et $${O}${B} = ${O}${C}$ (médiatrice de $[${B}${C}]$), donc $${O}${C} = ${O}${A} = ${tD(r)}$ cm.` }; }
    // où sera le centre ? (il dépend de la forme du triangle)
    const k = rand(0, 2), e = k === 0 ? ecAigu() : k === 1 ? [180, ...(() => { const u = rand(60, 120); return [u, 180 - u]; })()] : [rand(205, 250), ...(() => { const u = rand(40, 80); return [u, 0]; })()];
    if (k === 2) e[2] = 360 - e[0] - e[1];
    const info = [`Ses trois angles sont aigus.`, `Il est rectangle en $${C}$.`, `Son angle en $${C}$ est obtus.`][k];
    const bonT = ["À l'intérieur du triangle", `Au milieu du côté $[${A}${B}]$`, "À l'extérieur du triangle"][k];
    const c = melange(bonT, ["À l'intérieur du triangle", `Au milieu du côté $[${A}${B}]$`, "À l'extérieur du triangle", `Sur le sommet $${C}$`].filter((x) => x !== bonT));
    return { enonce: `Voici le triangle $${A}${B}${C}$. ${info} Où se trouve le centre de son cercle circonscrit ?`, figure: figCirconscrit(n, O, e, { centre: false }), figureSolution: figCirconscrit(n, O, e, { cercle: true, med: true }), mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Le centre du cercle circonscrit est le point de rencontre des médiatrices.", "Il n'est pas toujours à l'intérieur du triangle.", "Pour un triangle rectangle, il est au milieu de l'hypoténuse ; pour un angle obtus, il est à l'extérieur."],
      solution: [`Quand les trois angles sont aigus, les médiatrices se coupent **à l'intérieur** du triangle.`, `Pour un triangle rectangle en $${C}$, le centre est **le milieu de l'hypoténuse** $[${A}${B}]$.`, `Quand un angle est obtus, les médiatrices se coupent **à l'extérieur** du triangle.`][k] };
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
  const nomVisible = ([x, y]) => x >= 0 && x <= 11 && y >= 0 && y <= 7; // le nom s'écrit en haut à droite du point : pas sur le bord droit ni en haut
  function axeHasard() {
    const t = rand(0, 2);
    if (t === 0) return SYM.v(rand(4, 8));
    if (t === 1) return SYM.h(rand(3, 5));
    const c = rand(-3, 0); const A = SYM.d(c); A.trait = [[-c, 0], [8 - c, 8]]; return A;
  }
  FIGURES["sx6-grille"] = () => { const a = SYM.v(6); return grilleSym(a, [["A", [3, 5]], ["A'", [9, 5]]], [{ pts: [[2, 1], [4, 1], [4, 3]] }, { pts: [[10, 1], [8, 1], [8, 3]], classe: "g-poly g-poly-image" }]); };

  GEN["sx6-point"] = function () {
    for (let essai = 0; essai < 40; essai++) {
      const axe = axeHasard(), A = [rand(0, 11), rand(0, 7)], img = axe.f(A), [xd, yd] = axe.trait[1];
      const libre = (p) => nomVisible(p) && !(Math.abs(p[0] - xd) <= 2 && Math.abs(p[1] - yd) <= 1); // loin de l'étiquette (d)
      if (!libre(A) || !libre(img) || (img[0] === A[0] && img[1] === A[1])) continue;
      // pièges : symétrique par un autre axe, glissement, point à la même distance mais pas en face
      const pieges = [[img[0], A[1]], [A[0], img[1]], [img[0] + 1, img[1]], [img[0], img[1] + 1], [img[0] - 1, img[1] - 1], [2 * img[0] - A[0], 2 * img[1] - A[1]], [img[1], img[0]]]
        .filter((p) => libre(p) && !(p[0] === img[0] && p[1] === img[1]) && !(p[0] === A[0] && p[1] === A[1]));
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

  /* Papier uni : une droite (d) passant par I0 = [160, 96], d'angle phi (en degrés), et un point A avec un second point B.
     cas : "sym" (B symétrique de A : angle droit et longueurs égales codés), "oblique" (même distance, mais pas d'angle droit),
     "loin" (angle droit, mais pas la même distance). o = { lab: texte sur [AI], labB: texte sur [IB], nomI } */
  const refl = (P, phi) => { const u = [Math.cos((phi * Math.PI) / 180), -Math.sin((phi * Math.PI) / 180)], v = [P[0] - 160, P[1] - 96], k = v[0] * u[0] + v[1] * u[1]; return [+(160 + 2 * k * u[0] - v[0]).toFixed(1), +(96 + 2 * k * u[1] - v[1]).toFixed(1)]; };
  function figPointSym(A, B, phi, cas, o) {
    o = o || {};
    const u = [Math.cos((phi * Math.PI) / 180), -Math.sin((phi * Math.PI) / 180)], n = [-u[1], u[0]], d = 62, s0 = o.s0 !== undefined ? o.s0 : rand(-30, 30);
    const I = [+(160 + s0 * u[0]).toFixed(1), +(96 + s0 * u[1]).toFixed(1)], PA = [+(I[0] + d * n[0]).toFixed(1), +(I[1] + d * n[1]).toFixed(1)];
    let PB = [+(I[0] - d * n[0]).toFixed(1), +(I[1] - d * n[1]).toFixed(1)];
    if (cas === "oblique") { const w = [-n[0] * Math.cos(0.6) + u[0] * Math.sin(0.6), -n[1] * Math.cos(0.6) + u[1] * Math.sin(0.6)], dirA = [-w[0], -w[1]]; PB = [+(I[0] + d * 1.15 * w[0]).toFixed(1), +(I[1] + d * 1.15 * w[1]).toFixed(1)]; PA[0] = +(I[0] + d * 1.15 * dirA[0]).toFixed(1); PA[1] = +(I[1] + d * 1.15 * dirA[1]).toFixed(1); }
    if (cas === "loin") PB = [+(I[0] - d * 0.55 * n[0]).toFixed(1), +(I[1] - d * 0.55 * n[1]).toFixed(1)];
    const pts = { [A]: PA, [B]: PB, [o.nomI || "I"]: I }, nI = o.nomI || "I";
    const ext = [[160 - 175 * u[0], 96 - 175 * u[1]], [160 + 175 * u[0], 96 + 175 * u[1]]].map((p) => p.map((v) => +v.toFixed(1)));
    let s = geo({ W: 320, H: 192, pts, segs: [[A, B]], codes: cas === "sym" ? [[A, nI, 1], [nI, B, 1]] : cas === "oblique" ? [[A, nI, 1], [nI, B, 1]] : [[A, nI, 1], [nI, B, 2]], caches: o.nomI ? [] : [nI],
      decal: { [A]: [n[0] * 14 - 4, n[1] * 14 + 4], [B]: [-n[0] * 14 - 4, -n[1] * 14 + 4], [nI]: [+(-(n[0] + u[0]) * 11 - 3).toFixed(1), +(-(n[1] + u[1]) * 11 + 4).toFixed(1)] }, aria: o.aria || `Droite (d), points ${A} et ${B}` });
    const coin = cas !== "oblique" ? (() => { const a = [I[0] + n[0] * 10, I[1] + n[1] * 10], b = [I[0] + n[0] * 10 + u[0] * 10, I[1] + n[1] * 10 + u[1] * 10], c = [I[0] + u[0] * 10, I[1] + u[1] * 10]; return `<path class="g-code" d="M${a.map((v) => +v.toFixed(1)).join(" ")} L${b.map((v) => +v.toFixed(1)).join(" ")} L${c.map((v) => +v.toFixed(1)).join(" ")}"/>`; })() : "";
    s = s.replace(/(<svg[^>]*>)/, `$1<line class="g-axe" x1="${ext[0][0]}" y1="${ext[0][1]}" x2="${ext[1][0]}" y2="${ext[1][1]}"/>${coin}`);
    const lbl = (P, Q, txt) => { const m = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2], dx = Q[0] - P[0], dy = Q[1] - P[1], L = Math.hypot(dx, dy) || 1, sg = -dy / L > 0 ? 1 : -1; return `<text class="g-mesure" x="${+(m[0] - sg * (dy / L) * 13).toFixed(1)}" y="${+(m[1] + sg * (dx / L) * 13 + 4).toFixed(1)}" text-anchor="middle">${txt}</text>`; };
    s = s.replace("</svg>", (o.lab ? lbl(PA, I, o.lab) : "") + (o.labB ? lbl(I, PB, o.labB) : "") + `<text class="g-plabel g-axe-nom" x="${+(160 + u[0] * 84 + n[0] * 14).toFixed(1)}" y="${+(96 + u[1] * 84 + n[1] * 14 + 4).toFixed(1)}" text-anchor="middle">(d)</text></svg>`);
    return s;
  }
  // Triangle et son symétrique par rapport à une droite (d) passant par [160, 96] ; lab = [[i, j, texte]] sur les côtés
  function figTriSym(noms, phi, lab, labImg) {
    const u = [Math.cos((phi * Math.PI) / 180), -Math.sin((phi * Math.PI) / 180)], n = [-u[1], u[0]];
    const loc = [[-60, 26], [-8, 82], [46, 30]].map(([a, b]) => [+(160 + a * u[0] + b * n[0]).toFixed(1), +(96 + a * u[1] + b * n[1]).toFixed(1)]), img = loc.map((P) => refl(P, phi));
    const pts = {}, decal = {}, g = [0, 1].map((k) => (loc[0][k] + loc[1][k] + loc[2][k]) / 3), gi = refl(g, phi);
    noms.forEach((nm, k) => { pts[nm] = loc[k]; pts[nm + "'"] = img[k]; decal[nm] = decalDe(g, loc[k], 13); decal[nm + "'"] = decalDe(gi, img[k], 13); });
    const ext = [[160 - 175 * u[0], 96 - 175 * u[1]], [160 + 175 * u[0], 96 + 175 * u[1]]].map((p) => p.map((v) => +v.toFixed(1)));
    let s = geo({ W: 320, H: 192, pts, decal, aria: `Triangle ${noms.join("")} et son symétrique ${noms.map((x) => x + "'").join("")} par rapport à la droite (d)` });
    s = s.replace(/(<svg[^>]*>)/, `$1<line class="g-axe" x1="${ext[0][0]}" y1="${ext[0][1]}" x2="${ext[1][0]}" y2="${ext[1][1]}"/><polygon class="g-poly" points="${loc.map((p) => p.join(",")).join(" ")}"/><polygon class="g-poly g-poly-image" points="${img.map((p) => p.join(",")).join(" ")}"/>`);
    const lbl = (P, Q, txt, G) => { const m = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2], dx = m[0] - G[0], dy = m[1] - G[1], L = Math.hypot(dx, dy) || 1; return `<text class="g-mesure" x="${+(m[0] + (dx / L) * 13).toFixed(1)}" y="${+(m[1] + (dy / L) * 13 + 4).toFixed(1)}" text-anchor="middle">${txt}</text>`; };
    s = s.replace("</svg>", (lab || []).map(([i, j, t]) => lbl(loc[i], loc[j], t, g)).join("") + (labImg || []).map(([i, j, t]) => lbl(img[i], img[j], t, gi)).join("") + `<text class="g-plabel g-axe-nom" x="${+(160 + u[0] * 84 - n[0] * 12).toFixed(1)}" y="${+(96 + u[1] * 84 - n[1] * 12 + 4).toFixed(1)}" text-anchor="middle">(d)</text></svg>`);
    return s;
  }
  FIGURES["sx6-cours-point"] = () => figPointSym("A", "A'", 70, "sym", { nomI: "I", s0: -10, aria: "A et A' symétriques par rapport à (d) : (d) coupe [AA'] en son milieu I, perpendiculairement" });
  FIGURES["sx6-cours-proprietes"] = () => figTriSym(["A", "B", "C"], 80, [[0, 1, "4,2 cm"]], [[0, 1, "4,2 cm"]]);
  FIGURES["sx6-qcm-oblique"] = () => figPointSym("A", "B", 15, "oblique", { nomI: "I", s0: 0, aria: "Segment [AB] coupé en son milieu I par la droite (d), sans angle droit" });
  FIGURES["sx6-qcm-hexagone"] = () => figureForme("un hexagone régulier");
  FIGURES["sx6-cours-axes"] = () => figureForme("un rectangle (non carré)").replace("</svg>", `<line class="g-axe" x1="160" y1="22" x2="160" y2="148"/><line class="g-axe" x1="52" y1="85" x2="268" y2="85"/></svg>`);

  GEN["sx6-definition"] = function () {
    const t = rand(0, 5), [A, M, B] = shuffle(["A", "B", "C", "E", "F", "M", "N", "P", "R", "S"]).slice(0, 3), phi = pick([0, 20, 35, 70, 90, 110, 145, 160]), nI = pick(["I", "H", "K"]);
    if (t === 0) { const c = melange(`$(d)$ est la médiatrice du segment $[${A}${A}']$`, [`$(d)$ passe par $${A}$ et $${A}'$`, `$(d)$ est parallèle à $(${A}${A}')$`, `$${A}'$ est sur la droite $(d)$`, `$(d)$ est perpendiculaire à $(${A}${A}')$, quel que soit le point d'intersection`]);
      return { enonce: pick([`« $${A}'$ est le symétrique de $${A}$ par rapport à la droite $(d)$ » signifie que :`, `Le point $${A}'$ est le symétrique du point $${A}$ par rapport à $(d)$. Que peut-on affirmer ?`]), figure: figPointSym(A, A + "'", phi, "sym", { nomI: nI }), mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Le symétrique est de l'autre côté de la droite, à la même distance.", `La droite coupe $[${A}${A}']$ en son milieu.`, "Et elle lui est perpendiculaire."],
        solution: `$${A}'$ est le symétrique de $${A}$ par rapport à $(d)$ quand $(d)$ est la **médiatrice** de $[${A}${A}']$ : elle passe par son milieu et lui est perpendiculaire (les codages de la figure).` }; }
    if (t === 1 || t === 4) { const L = Dc(rand(11, 99), 1), d = Dc(L.m * 5, L.d + 1), inv = t === 4;
      return { enonce: inv ? `Le point $${A}$ est à $${tD(d)}$ cm de la droite $(d)$, et $${A}'$ est son symétrique par rapport à $(d)$. Quelle est la longueur $${A}${A}'$ ?` : `$${A}'$ est le symétrique de $${A}$ par rapport à $(d)$, et $${A}${A}' = ${tD(L)}$ cm. À quelle distance de la droite $(d)$ se trouve le point $${A}$ ?`,
        figure: figPointSym(A, A + "'", phi, "sym", { nomI: nI, lab: inv ? `${tD(d).replace("{,}", ",")} cm` : "?" }), mode: "nombre", prefixe: inv ? `$${A}${A}' =$` : "Distance :", suffixe: "cm", attendu: inv ? vD(L) : vD(L) / 2,
        erreurs: inv ? [{ valeur: vD(d), message: `Ça, c'est la distance de $${A}$ à $(d)$. $${A}'$ est à la même distance de l'autre côté.` }, { valeur: vD(d) / 2, message: "La droite est au milieu de $[" + A + A + "']$ : $" + A + A + "'$ est le double de la distance." }]
          : [{ valeur: vD(L), message: `$${A}$ et $${A}'$ sont chacun à la même distance de $(d)$ : on partage $${A}${A}'$ en deux.` }, { valeur: vD(L) * 2, message: "La distance à la droite est la **moitié** de $" + A + A + "'$." }],
        aides: [`$(d)$ est la médiatrice de $[${A}${A}']$ : elle passe par son milieu $${nI}$.`, inv ? `$${A}${nI} = ${nI}${A}' = ${tD(d)}$ cm.` : `$${A}$ est donc à la moitié de $${A}${A}'$ de la droite.`, inv ? `Calcule $2 \\times ${tD(d)}$.` : `Calcule $${tD(L)} \\div 2$.`],
        solution: inv ? `$(d)$ passe par le milieu $${nI}$ de $[${A}${A}']$ : $${A}${A}' = 2 \\times ${tD(d)} = ${tD(L)}$ cm.` : `$(d)$ passe par le milieu de $[${A}${A}']$ : la distance est $${tD(L)} \\div 2 = ${tD(d)}$ cm.` }; }
    if (t === 2) { const c = melange(`$${M}'$ est confondu avec $${M}$`, [`$${M}'$ est à $2$ cm de $${M}$`, `$${M}$ n'a pas de symétrique`, `$${M}'$ est sur la perpendiculaire à $(d)$, loin de $(d)$`]);
      return { enonce: `Le point $${M}$ est sur la droite $(d)$. Son symétrique $${M}'$ par rapport à $(d)$ :`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Le symétrique est à la même distance de $(d)$ que le point de départ.", `Ici, $${M}$ est à une distance $0$ de $(d)$.`, "Un point de l'axe ne bouge pas."], solution: `$${M}$ est sur $(d)$, à une distance $0$ : son symétrique est lui-même, $${M}' = ${M}$.` }; }
    if (t === 3) { // B est-il le symétrique de A ?
      const cas = pick(["sym", "oblique", "loin"]), bon = { sym: `Oui : $(d)$ est la médiatrice de $[${A}${B}]$`, oblique: `Non : $(${A}${B})$ n'est pas perpendiculaire à $(d)$`, loin: `Non : $${A}$ et $${B}$ ne sont pas à la même distance de $(d)$` }[cas];
      const c = melange(bon, [`Oui : $(d)$ est la médiatrice de $[${A}${B}]$`, `Non : $(${A}${B})$ n'est pas perpendiculaire à $(d)$`, `Non : $${A}$ et $${B}$ ne sont pas à la même distance de $(d)$`, "On ne peut pas savoir sans quadrillage"].filter((x) => x !== bon));
      return { enonce: `D'après les codages de la figure, le point $${B}$ est-il le symétrique de $${A}$ par rapport à la droite $(d)$ ?`, figure: figPointSym(A, B, phi, cas, { nomI: nI }), mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: [`Il faut que $(d)$ soit la **médiatrice** de $[${A}${B}]$.`, "Cherche un angle droit codé (petit carré) entre $(d)$ et le segment.", "Cherche des longueurs égales codées (mêmes petits traits) de part et d'autre de $(d)$."],
        solution: { sym: `L'angle droit et les longueurs égales sont codés : $(d)$ coupe $[${A}${B}]$ perpendiculairement en son milieu, c'est sa médiatrice. $${B}$ est bien le symétrique de $${A}$.`, oblique: `$${nI}$ est le milieu de $[${A}${B}]$, mais il n'y a pas d'angle droit : $(d)$ n'est pas la médiatrice de $[${A}${B}]$, donc $${B}$ n'est pas le symétrique de $${A}$.`, loin: `L'angle droit est codé, mais $${A}${nI} \\neq ${nI}${B}$ (codages différents) : $(d)$ ne passe pas par le milieu de $[${A}${B}]$. $${B}$ n'est pas le symétrique de $${A}$.` }[cas] }; }
    const x = Dc(rand(11, 95), 1);
    return { enonce: `$${A}'$ est le symétrique de $${A}$ par rapport à $(d)$ ; le segment $[${A}${A}']$ coupe $(d)$ en $${nI}$, et $${A}${nI} = ${tD(x)}$ cm. Combien mesure $${nI}${A}'$ ?`, figure: figPointSym(A, A + "'", phi, "sym", { nomI: nI, lab: `${tD(x).replace("{,}", ",")} cm`, labB: "?" }), mode: "nombre", prefixe: `$${nI}${A}' =$`, suffixe: "cm", attendu: vD(x),
      erreurs: [{ valeur: vD(x) * 2, message: `Ça, c'est $${A}${A}'$. On demande seulement $${nI}${A}'$.` }, { valeur: vD(x) / 2, message: `$${nI}$ est le milieu de $[${A}${A}']$ : $${nI}${A}' = ${A}${nI}$.` }],
      aides: [`$(d)$ est la médiatrice de $[${A}${A}']$.`, `Elle passe donc par le milieu de $[${A}${A}']$ : c'est le point $${nI}$.`, `$${nI}${A}' = ${A}${nI}$.`],
      solution: `$(d)$ est la médiatrice de $[${A}${A}']$, donc $${nI}$ est le milieu de $[${A}${A}']$ : $${nI}${A}' = ${A}${nI} = ${tD(x)}$ cm.` };
  };

  GEN["sx6-proprietes"] = function () {
    const t = rand(0, 4), [A, B, C] = NOMS_TRI(), phi = pick([70, 80, 90, 100, 110]);
    if (t === 0) { const L = Dc(rand(15, 95), 1), [i, j] = pick([[0, 1], [1, 2], [2, 0]]), N = [A, B, C];
      return { enonce: `Le triangle $${A}'${B}'${C}'$ est le symétrique du triangle $${A}${B}${C}$ par rapport à la droite $(d)$. On sait que $${N[i]}${N[j]} = ${tD(L)}$ cm. Combien mesure $${N[i]}'${N[j]}'$ ?`, figure: figTriSym(N, phi, [[i, j, `${tD(L).replace("{,}", ",")} cm`]], [[i, j, "?"]]), mode: "nombre", prefixe: `$${N[i]}'${N[j]}' =$`, suffixe: "cm", attendu: vD(L),
        erreurs: [{ valeur: vD(L) * 2, message: "La symétrie ne double pas les longueurs : elle les conserve." }, { valeur: vD(L) / 2, message: "La symétrie ne divise pas les longueurs : elle les conserve." }],
        aides: ["La symétrie axiale est comme un pliage : la figure ne change pas de forme ni de taille.", "Elle **conserve les longueurs**.", `$[${N[i]}'${N[j]}']$ est le symétrique de $[${N[i]}${N[j]}]$.`], solution: `La symétrie axiale conserve les longueurs : $${N[i]}'${N[j]}' = ${N[i]}${N[j]} = ${tD(L)}$ cm.` }; }
    if (t === 1) { const a = rand(15, 160);
      return { enonce: `Le triangle $${A}'${B}'${C}'$ est le symétrique du triangle $${A}${B}${C}$ par rapport à la droite $(d)$, et $\\widehat{${A}${B}${C}} = ${a}$°. Combien mesure $\\widehat{${A}'${B}'${C}'}$ ?`, figure: figTriSym([A, B, C], phi), mode: "nombre", prefixe: "Mesure :", suffixe: "°", attendu: a,
        erreurs: [{ valeur: 180 - a, message: "La symétrie ne « retourne » pas la mesure : elle conserve les angles." }, { valeur: 2 * a, message: "La symétrie ne double pas les angles : elle les conserve." }],
        aides: ["Pense au pliage : l'angle se pose exactement sur son symétrique.", "La symétrie axiale **conserve les angles**.", `$\\widehat{${A}'${B}'${C}'}$ est le symétrique de $\\widehat{${A}${B}${C}}$.`], solution: `La symétrie axiale conserve les angles : $\\widehat{${A}'${B}'${C}'} = ${a}$°.` }; }
    if (t === 2) { const v = rand(2, 9), x = rand(3, 12) * 5, [obj, img, fx] = pick([[`de la droite $(${A}${B})$`, `la droite $(${A}'${B}')$`, [`le segment $[${A}'${B}']$`, "un cercle", `le point $${A}'$`]], [`des points $${A}$, $${B}$, $${C}$ alignés`, `des points $${A}'$, $${B}'$, $${C}'$ alignés`, [`des points $${A}'$, $${B}'$, $${C}'$ non alignés`, `un triangle $${A}'${B}'${C}'$`, "deux points seulement"]], [`d'un segment de $${v}$ cm`, `un segment de $${v}$ cm`, [`un segment de $${2 * v}$ cm`, `une droite`, `un segment de $${v + 1}$ cm`]], [`d'un cercle de rayon $${v}$ cm`, `un cercle de rayon $${v}$ cm`, [`un cercle de rayon $${2 * v}$ cm`, `un disque de rayon $${v / 2 === Math.floor(v / 2) ? v / 2 : v + 1}$ cm`, "une droite"]], [`d'un carré de côté $${v}$ cm`, `un carré de côté $${v}$ cm`, [`un rectangle de $${v}$ cm sur $${2 * v}$ cm`, `un carré de côté $${2 * v}$ cm`, "un losange quelconque"]], [`d'un angle de $${x}$°`, `un angle de $${x}$°`, [`un angle de $${180 - x}$°`, `un angle de $${2 * x}$°`, `un angle de $${x + 10}$°`]]]);
      const c = melange(Maj(img), fx.filter((f) => f !== img).map(Maj));
      return { enonce: `Par une symétrie axiale, le symétrique ${obj} est :`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["La symétrie axiale conserve les longueurs, les angles et les alignements.", "Elle conserve donc la nature et la taille des figures.", "Pense à un pliage le long de l'axe."], solution: `La symétrie axiale conserve les formes et les mesures : le symétrique ${obj} est ${img}.` }; }
    if (t === 3) { const R = Dc(rand(12, 95), 1), r = vD(R), O = pick(["O", "K", "I", "J"]), dia = Math.random() < 0.4;
      return { enonce: `Le cercle $(\\mathscr{C}')$ est le symétrique du cercle $(\\mathscr{C})$ de centre $${O}$ et de rayon $${tD(R)}$ cm par rapport à une droite. Quel est ${dia ? "le diamètre" : "le rayon"} de $(\\mathscr{C}')$ ?`, mode: "nombre", prefixe: dia ? "Diamètre :" : "Rayon :", suffixe: "cm", attendu: dia ? 2 * r : r,
        erreurs: dia ? [{ valeur: r, message: "Ça, c'est le rayon : le diamètre en vaut deux." }, { valeur: 4 * r, message: "La symétrie ne double pas les longueurs : le diamètre est seulement deux rayons." }] : [{ valeur: 2 * r, message: "La symétrie conserve les longueurs : le rayon ne change pas." }, { valeur: r / 2, message: "La symétrie conserve les longueurs : le rayon ne change pas." }],
        aides: ["Le symétrique d'un cercle est un cercle.", "La symétrie conserve les longueurs, donc les rayons.", `Son centre est le symétrique $${O}'$ de $${O}$.`], solution: `Le symétrique d'un cercle est un cercle de même rayon, $${tD(R)}$ cm, dont le centre est le symétrique de $${O}$.${dia ? ` Son diamètre mesure $2 \\times ${tD(R)} = ${tD(Dc(R.m * 2, R.d))}$ cm.` : ""}` }; }
    // périmètre ou aire de la figure symétrique
    const a = rand(3, 9), b = rand(3, 9), aire = Math.random() < 0.5;
    return { enonce: `Un rectangle mesure $${a}$ cm sur $${b}$ cm. Quel est ${aire ? "l'aire" : "le périmètre"} de son symétrique par rapport à une droite ?`, mode: "nombre", prefixe: aire ? "Aire :" : "Périmètre :", suffixe: aire ? "cm²" : "cm", attendu: aire ? a * b : 2 * (a + b),
      erreurs: aire ? [{ valeur: 2 * a * b, message: "La symétrie conserve les aires : on ne double pas." }, { valeur: 2 * (a + b), message: "Ça, c'est le périmètre. On demande l'aire." }] : [{ valeur: 4 * (a + b), message: "La symétrie conserve les longueurs : on ne double pas." }, { valeur: a * b, message: "Ça, c'est l'aire. On demande le périmètre." }],
      aides: ["Le symétrique d'un rectangle est un rectangle de mêmes dimensions.", "La symétrie conserve les longueurs, donc le périmètre et l'aire.", aire ? `Aire $= ${a} \\times ${b}$.` : `Périmètre $= 2 \\times (${a} + ${b})$.`],
      solution: `Le symétrique est un rectangle de $${a}$ cm sur $${b}$ cm : ${aire ? `aire $= ${a} \\times ${b} = ${a * b}$ cm²` : `périmètre $= 2 \\times (${a} + ${b}) = ${2 * (a + b)}$ cm`}.` };
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
  // Tableau de conversion : unités U ([nom]), s sous-colonnes par unité (1 longueurs, 2 aires), conversion de U[i1] vers U[i2] ;
  // x (texte « 70,9 ») : avec sol, les chiffres sont placés, les zéros ajoutés et la nouvelle virgule en couleur
  function tableConv(U, s, i1, i2, x, sol) {
    const [e0, dec = ""] = x.split(","), ent = e0 === "0" && i2 > i1 ? "" : e0, c1 = i1 * s + s - 1, c2 = i2 * s + s - 1, deb = c1 - ent.length + 1;
    const cmin = Math.min(0, sol ? Math.min(deb, c2) : 0), cmax = Math.max(U.length * s - 1, sol ? Math.max(c1 + dec.length, c2) : 0);
    const n = cmax - cmin + 1, cw = Math.min(40, 300 / n), x0 = (320 - n * cw) / 2, X = (c) => +(x0 + (c - cmin) * cw).toFixed(1);
    let t = `<svg class="graph conv" viewBox="0 0 320 76" role="img" aria-label="Tableau de conversion de ${U[i1]} en ${U[i2]}${sol ? ` : ${x} ${U[i1]}` : ""}">`;
    [i1, i2].forEach((i) => { t += `<rect class="g-aire g-colorie" x="${X(i * s)}" y="6" width="${+(s * cw).toFixed(1)}" height="26"/>`; });
    U.forEach((u, i) => { t += `<text class="g-plabel" x="${+(X(i * s) + (s * cw) / 2).toFixed(1)}" y="24" text-anchor="middle">${u}</text>`; });
    t += `<g style="stroke:var(--doux);stroke-width:1"><rect x="${X(cmin)}" y="6" width="${+(n * cw).toFixed(1)}" height="60" style="fill:none"/><line x1="${X(cmin)}" y1="32" x2="${X(cmax + 1)}" y2="32"/>`;
    for (let c = cmin + 1; c <= cmax; c++) t += `<line x1="${X(c)}" y1="${c % s === 0 ? 6 : 32}" x2="${X(c)}" y2="66"${c % s ? ' style="stroke-dasharray:3 3"' : ""}/>`;
    t += `</g>`;
    if (sol) {
      const ch = {}; ent.split("").forEach((d, k) => { ch[deb + k] = [d, 0]; }); dec.split("").forEach((d, k) => { ch[c1 + 1 + k] = [d, 0]; });
      for (let c = Math.min(deb, c2); c <= Math.max(c1 + dec.length, c2); c++) if (!ch[c]) ch[c] = ["0", 1];
      for (let c = Math.min(deb, c2); c < c2 && ch[c] && ch[c][0] === "0"; c++) delete ch[c]; // pas de zéro inutile à gauche
      Object.keys(ch).forEach((c) => { t += `<text class="${ch[c][1] ? "g-mesure" : "g-clabel"}" x="${+(X(+c) + cw / 2).toFixed(1)}" y="56" text-anchor="middle">${ch[c][0]}</text>`; });
      if (Object.keys(ch).some((c) => +c > c2)) t += `<circle cx="${X(c2 + 1)}" cy="58" r="5" style="fill:var(--surface)"/><text class="g-mesure" x="${X(c2 + 1)}" y="62" text-anchor="middle" style="font-size:22px;font-weight:700">,</text>`;
    }
    return t + `</svg>`;
  }
  const UL6 = UL.map((u) => u[0]), UA6 = UA.map((u) => u[0]);
  // Fenêtre : rectangle L × l surmonté d'un demi-cercle de diamètre L (le côté du haut en pointillés)
  function figFenetre(L, l, u) {
    const k = Math.min(200 / L, 148 / (l + L / 2)), w = L * k, h = l * k, x0 = 160 - w / 2, yb = 170, yt = yb - h, f = (v) => +v.toFixed(1);
    let s = `<svg class="graph geo" viewBox="0 0 320 190" role="img" aria-label="Fenêtre : rectangle de ${L} ${u} sur ${l} ${u} surmonté d'un demi-cercle">`;
    s += `<path class="g-poly" d="M${f(x0)} ${f(yt)} V${yb} H${f(x0 + w)} V${f(yt)} A${f(w / 2)} ${f(w / 2)} 0 0 0 ${f(x0)} ${f(yt)} Z"/><line class="g-cache" x1="${f(x0)}" y1="${f(yt)}" x2="${f(x0 + w)}" y2="${f(yt)}"/>`;
    s += `<text class="g-mesure" x="160" y="${f(yt - 5)}" text-anchor="middle">${L} ${u}</text><text class="g-mesure" x="${f(x0 + w + 6)}" y="${f(yb - h / 2 + 4)}">${l} ${u}</text>`;
    return s + `</svg>`;
  }
  FIGURES["pa6-cours-conv"] = () => tableConv(UL6, 1, 3, 5, "3,5", true);
  FIGURES["pa6-cours-conv-aire"] = () => tableConv(UA6, 2, 2, 1, "450", true);
  FIGURES["pa6-cours-compare"] = () => { const c = []; for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) c.push([i, j]); for (let i = 0; i < 7; i++) for (let j = 2; j < 5; j++) c.push([6 + i, j]); return grilleAire(c, 13, 5); };
  FIGURES["pa6-methode-conv"] = () => tableConv(UL6, 1, 6, 5, "85", true);
  FIGURES["pa6-methode-aire"] = () => tableConv(UA6, 2, 0, 2, "2,5", true);
  FIGURES["pa6-qcm-fenetre"] = () => figFenetre(8, 6, "dm");
  FIGURES["pa6-qcm-roue"] = () => figureCercleDiam("60 cm");
  FIGURES["pa6-qcm-grille"] = () => { const c = []; for (let i = 0; i < 5; i++) for (let j = 2; j < 4; j++) c.push([i + 1, j + 1]); for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) c.push([i + 1, j + 1]); c.push([1, 5]); return grilleAire(c, 8, 7); };
  FIGURES["pa6-rectangle"] = () => figureRectangle(7, 4, "cm");
  FIGURES["pa6-cercle"] = () => figureCercleDiam("6 cm");
  FIGURES["pa6-L"] = () => figureL(8, 6, 3, 2, "m");

  GEN["pa6-conv-long"] = function () {
    let i = rand(0, 6), j = rand(0, 6); while (j === i) j = rand(0, 6);
    const [u1, e1] = UL[i], [u2, e2] = UL[j], x = Math.random() < 0.5 ? Dc(rand(1, 999)) : decimal(99, 2, 1);
    const R = e1 > e2 ? mulD(x, Dc(P10(e1 - e2))) : Dc(x.m, x.d + (e2 - e1));
    if (R.d > 6) return GEN["pa6-conv-long"](); // pas plus de six décimales
    return { enonce: `Convertis : $${tD(x)}$ ${u1} $= \\ldots$ ${u2}.`, figure: tableConv(UL6, 1, i, j, brut(x)), figureSolution: tableConv(UL6, 1, i, j, brut(x), true), mode: "nombre", prefixe: "Réponse :", suffixe: u2, attendu: vD(R),
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
    const t = rand(0, 3), u = pick(["cm", "cm", "m", "dm", "mm"]), val = () => (Math.random() < 0.3 ? Dc(rand(11, 99), 1) : Dc(rand(2, 60)));
    if (t === 3) { // roue qui tourne : distance parcourue
      const [obj, d] = pick([["La roue d'un vélo", pick([50, 55, 60, 65, 70])], ["La roue d'une brouette", pick([30, 35, 40, 45])], ["Un cerceau", pick([60, 70, 80, 90])], ["La roue d'un fauteuil roulant", pick([55, 60, 65])]]), n = rand(2, 25), un = mulD(Dc(d), Dc(314, 2)), D = mulD(un, Dc(n));
      return { enonce: `${obj} a un diamètre de $${d}$ cm. Quelle distance parcourt-elle en faisant $${n}$ tours complets ? Prends $3{,}14$ pour $\\pi$.`, figure: figureCercleDiam(`${d} cm`), mode: "nombre", prefixe: "Distance ≈", suffixe: "cm", attendu: vD(D),
        erreurs: [{ valeur: vD(un), message: `Ça, c'est la distance pour **un** tour. Il y a $${n}$ tours.` }, { valeur: vD(mulD(D, Dc(2))), message: "Le diamètre n'est pas un rayon : $P = \\pi \\times d$." }],
        aides: ["En un tour, la roue avance de la longueur de son cercle.", `Un tour : $3{,}14 \\times ${d}$.`, `Puis multiplie par $${n}$.`],
        solution: `Un tour : $3{,}14 \\times ${d} = ${tD(un)}$ cm. ${n} tours : $${tD(un)} \\times ${n} = ${tD(D)}$ cm.` }; }
    if (t === 0) { const d = val(), P = mulD(d, Dc(314, 2));
      return { enonce: `Un cercle a pour diamètre $${tD(d)}$ ${u}. Calcule son périmètre en prenant $3{,}14$ comme valeur approchée de $\\pi$.`, figure: figureCercleDiam(`${nbTexte(vD(d))} ${u}`), mode: "nombre", prefixe: "Périmètre ≈", suffixe: u, attendu: vD(P),
        erreurs: [{ valeur: vD(mulD(P, Dc(2))), message: "Tu as utilisé le diamètre comme un rayon : $P = \\pi \\times d$, ou $2 \\times \\pi \\times r$." }, { valeur: vD(P) / 2, message: "La formule avec le diamètre est $P = \\pi \\times d$." }],
        aides: ["Le périmètre d'un cercle est proportionnel à son diamètre.", "$P = \\pi \\times d$, avec $\\pi \\approx 3{,}14$.", `Calcule $3{,}14 \\times ${tD(d)}$.`], solution: `$P = \\pi \\times d \\approx 3{,}14 \\times ${tD(d)} = ${tD(P)}$ ${u}.` }; }
    if (t === 1) { const r = val(), d = mulD(r, Dc(2)), P = mulD(d, Dc(314, 2));
      return { enonce: `Un cercle a pour rayon $${tD(r)}$ ${u}. Calcule son périmètre en prenant $3{,}14$ pour $\\pi$.`, mode: "nombre", prefixe: "Périmètre ≈", suffixe: u, attendu: vD(P),
        erreurs: [{ valeur: vD(mulD(r, Dc(314, 2))), message: "Avec le rayon, il faut d'abord doubler : $d = 2 \\times r$." }],
        aides: [`Le diamètre est le double du rayon : $d = 2 \\times ${tD(r)}$.`, "$P = \\pi \\times d$.", "Prends $\\pi \\approx 3{,}14$."], solution: `$d = 2 \\times ${tD(r)} = ${tD(d)}$ ${u}, puis $P \\approx 3{,}14 \\times ${tD(d)} = ${tD(P)}$ ${u}.` }; }
    // rectangle surmonté d'un demi-cercle : périmètre
    const L = rand(4, 12) * 2, l = rand(3, 10), demi = mulD(Dc(L), Dc(157, 2)), P = addD(demi, Dc(L + 2 * l));
    return { enonce: `Une fenêtre a la forme d'un rectangle de $${L}$ dm de large et $${l}$ dm de haut, surmonté d'un demi-cercle de diamètre $${L}$ dm. Calcule le périmètre de la fenêtre, avec $\\pi \\approx 3{,}14$.`, figure: figFenetre(L, l, "dm"), mode: "nombre", prefixe: "Périmètre ≈", suffixe: "dm", attendu: vD(P),
      erreurs: [{ valeur: vD(addD(demi, Dc(2 * L + 2 * l))), message: "Le côté du haut du rectangle est remplacé par le demi-cercle : on ne le compte pas." }],
      aides: ["Le contour est formé de trois côtés du rectangle et d'un demi-cercle.", `Demi-cercle : $(3{,}14 \\times ${L}) \\div 2$.`, `Côtés : $${L} + ${l} + ${l}$.`], solution: `Demi-cercle : $3{,}14 \\times ${L} \\div 2 = ${tD(demi)}$ dm. Côtés : $${L} + ${l} + ${l} = ${L + 2 * l}$ dm. Total : $${tD(P)}$ dm.` };
  };

  GEN["pa6-conv-aire"] = function () {
    let i = rand(0, 2), j = rand(0, 2); while (j === i) j = rand(0, 2);
    const [u1, e1] = UA[i], [u2, e2] = UA[j], x = Math.random() < 0.5 ? Dc(rand(1, 999)) : decimal(99, 2, 1);
    const R = e1 > e2 ? mulD(x, Dc(P10(e1 - e2))) : Dc(x.m, x.d + (e2 - e1));
    const faux = e1 > e2 ? vD(x) * P10((e1 - e2) / 2) : vD(x) / P10((e2 - e1) / 2);
    return { enonce: `Convertis : $${tD(x)}$ ${u1} $= \\ldots$ ${u2}.`, figure: tableConv(UA6, 2, i, j, brut(x)), figureSolution: tableConv(UA6, 2, i, j, brut(x), true), mode: "nombre", prefixe: "Réponse :", suffixe: u2, attendu: vD(R),
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
    if (t === 0) return { enonce: `${pick(["Un jardin rectangulaire de Chiconi", "Un champ de manioc à Bandrélé", "Un enclos à zébus à Combani", "Un potager à Sada"])} mesure $${L}$ m sur $${l}$ m. Quelle longueur de grillage faut-il pour l'entourer ?`, figure: figureRectangle(L, l, "m"), mode: "nombre", prefixe: "Grillage :", suffixe: "m", attendu: 2 * (L + l),
      erreurs: [{ valeur: L * l, message: "Entourer, c'est faire le tour : c'est un périmètre, pas une aire." }],
      aides: ["Entourer le jardin : on cherche la longueur du tour.", "C'est le périmètre du rectangle.", `$2 \\times (${L} + ${l})$.`], solution: `Périmètre : $2 \\times (${L} + ${l}) = ${2 * (L + l)}$ m de grillage.` };
    if (t === 1) return { enonce: `${pick(["Une terrasse rectangulaire à Dzaoudzi", "La cour rectangulaire d'une maison de Mtsamboro", "Une salle de classe de Kani-Kéli"])} mesure $${L}$ m sur $${l}$ m. Combien de m² de carrelage faut-il pour la recouvrir ?`, figure: figureRectangle(L, l, "m"), mode: "nombre", prefixe: "Carrelage :", suffixe: "m²", attendu: L * l,
      erreurs: [{ valeur: 2 * (L + l), message: "Recouvrir une surface, c'est une aire, pas un périmètre." }],
      aides: ["Recouvrir la terrasse : on cherche une surface.", "C'est l'aire du rectangle.", `$${L} \\times ${l}$.`], solution: `Aire : $${L} \\times ${l} = ${L * l}$ m² de carrelage.` };
    const c = rand(3, 12), d = rand(2, 9);
    const pc = c * c, pd = 4 * c;
    const choix = [`Même périmètre, mais pas la même aire`, `Même aire, mais pas le même périmètre`, `Même périmètre et même aire`, `Ni le même périmètre, ni la même aire`];
    // rectangle (c+d) × (c−d) comparé au carré c × c
    if (d >= c) return GEN["pa6-probleme"]();
    const rep = 0, cc = melange(choix[rep], choix.filter((_, k) => k !== rep)), cases = [];
    for (let i = 0; i < c; i++) for (let j = 0; j < c; j++) cases.push([i, j]);
    for (let i = 0; i < c + d; i++) for (let j = d; j < c; j++) cases.push([c + 1 + i, j]);
    return { enonce: `On compare un carré de côté $${c}$ cm et un rectangle de $${c + d}$ cm sur $${c - d}$ cm${2 * c + d + 1 <= 14 ? " (un carreau = $1$ cm²)" : ""}. Que peut-on dire ?`, figure: 2 * c + d + 1 <= 14 ? grilleAire(cases, 2 * c + d + 1, c) : undefined, mode: "choix", choix: cc.choix, attendu: cc.attendu,
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

  // Prisme droit (bases horizontales) ou pyramide dont la base a n côtés, vus d'un peu au-dessus ; arêtes cachées en pointillés.
  // Renvoie { svg, caches } (caches = nombre d'arêtes cachées sur le dessin).
  function solideN(type, n) {
    const cx = 160, R = 82, r = 25, prisme = type === "prisme", yb = prisme ? 128 : 140, ht = prisme ? 90 : 118, t0 = (20 * Math.PI) / 180;
    const ang = (k) => t0 + (2 * Math.PI * k) / n, B = (k) => [+(cx + R * Math.cos(ang(k))).toFixed(1), +(yb + r * Math.sin(ang(k))).toFixed(1)];
    const T = (k) => [B(k)[0], +(B(k)[1] - ht).toFixed(1)], S = [cx, yb - ht];
    const vis = (k) => Math.sin(ang(k) + Math.PI / n) > 0.02; // face latérale k (entre les sommets k et k + 1) tournée vers nous
    const L = (p, q, v) => `<line class="${v ? "g-segment" : "g-cache"}" x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}"/>`;
    let cach = "", vu = "", nc = 0;
    const trait = (p, q, v) => { if (v) vu += L(p, q, true); else { cach += L(p, q, false); nc++; } };
    for (let k = 0; k < n; k++) {
      const k1 = (k + 1) % n, cote = vis(k) || vis((k - 1 + n) % n);
      trait(B(k), B(k1), vis(k));
      if (prisme) { trait(T(k), T(k1), true); trait(B(k), T(k), cote); } else trait(B(k), S, cote);
    }
    const nomB = { 3: "triangulaire", 4: "carrée", 5: "pentagonale", 6: "hexagonale", 7: "heptagonale", 8: "octogonale" }[n];
    return { caches: nc, svg: `<svg class="graph geo" viewBox="0 0 320 ${yb + r + 8}" role="img" aria-label="${prisme ? "Prisme droit" : "Pyramide"} à base ${nomB}, en perspective, arêtes cachées en pointillés">${cach}${vu}</svg>` };
  }
  // Pavé construit avec L × l × c petits cubes : seules les trois faces visibles, quadrillées
  function paveCubes(L, l, c, lab) {
    const a = Math.min(22, 270 / ((L + l) * 0.866), 200 / ((L + l) * 0.5 + c)), cx = a * 0.866, sy = a / 2;
    const W = 320, H = Math.round((L + l) * sy + c * a + 14), ox = 160 + ((l - L) * cx) / 2, oy = 7 + c * a;
    const P = (i, j, k) => `${+(ox + (i - j) * cx).toFixed(1)},${+(oy + (i + j) * sy - k * a).toFixed(1)}`;
    const ligne = (p, q) => `<polyline points="${p} ${q}" style="fill:none;stroke:var(--encre);stroke-width:0.9"/>`;
    let s = `<svg class="graph cubes" viewBox="0 0 ${W} ${H}" role="img" aria-label="${lab || `Pavé formé de ${L} cubes en longueur, ${l} en largeur et ${c} couches`}">`;
    s += `<polygon class="g-cube-haut" points="${P(0, 0, c)} ${P(L, 0, c)} ${P(L, l, c)} ${P(0, l, c)}"/><polygon class="g-cube-g" points="${P(0, l, 0)} ${P(L, l, 0)} ${P(L, l, c)} ${P(0, l, c)}"/><polygon class="g-cube-d" points="${P(L, 0, 0)} ${P(L, l, 0)} ${P(L, l, c)} ${P(L, 0, c)}"/>`;
    for (let i = 1; i < L; i++) s += ligne(P(i, 0, c), P(i, l, c)) + ligne(P(i, l, 0), P(i, l, c));
    for (let j = 1; j < l; j++) s += ligne(P(0, j, c), P(L, j, c)) + ligne(P(L, j, 0), P(L, j, c));
    for (let k = 1; k < c; k++) s += ligne(P(0, l, k), P(L, l, k)) + ligne(P(L, 0, k), P(L, l, k));
    return s + `</svg>`;
  }
  // Vue d'un assemblage : de dessus (quadrillage, avec la hauteur de chaque colonne si « hauteurs ») ou de côté (colonnes de carrés)
  function vueCubes(h, vue, hauteurs) {
    const u = 26, n = h.length, m = h[0].length;
    let s, W, H;
    if (vue === "dessus") {
      W = m * u + 20; H = n * u + 20; s = "";
      for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) if (h[i][j]) s += `<rect class="g-cube-haut" x="${10 + (m - 1 - j) * u}" y="${10 + i * u}" width="${u}" height="${u}"/>` + (hauteurs ? `<text class="g-plabel" x="${10 + (m - 0.5 - j) * u}" y="${14 + (i + 0.5) * u}" text-anchor="middle">${h[i][j]}</text>` : "");
    } else {
      const cols = vue === "droite" ? Array.from({ length: m }, (_, j) => Math.max(...h.map((l) => l[j]))).reverse() : h.map((l) => Math.max(...l));
      const hm = Math.max(...cols); W = cols.length * u + 20; H = hm * u + 20; s = "";
      cols.forEach((c, x) => { for (let k = 0; k < c; k++) s += `<rect class="${vue === "droite" ? "g-cube-d" : "g-cube-g"}" x="${10 + x * u}" y="${10 + (hm - 1 - k) * u}" width="${u}" height="${u}"/>`; });
    }
    return `<svg class="graph cubes" viewBox="0 0 ${W} ${H}" style="max-width:${Math.round(W * 1.1)}px" role="img" aria-label="Vue ${vue === "dessus" ? "de dessus" : "de côté"} de l'assemblage">${s}</svg>`;
  }
  // Patrons du cube (11) et assemblages de 6 carrés qui n'en sont pas ; cases [colonne, ligne]
  const PATRONS_OK = [[0, 0], [0, 1], [0, 2], [0, 3], [1, 1], [1, 2]].map(([a, b]) => [[0, 1], [1, 1], [2, 1], [3, 1], [a, 0], [b, 2]])
    .concat([1, 2, 3].map((b) => [[0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [b, 2]]), [[[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]], [[0, 0], [1, 0], [2, 0], [2, 1], [3, 1], [4, 1]]]);
  const PATRONS_NON = [[[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]], [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [1, 1]], [[0, 1], [1, 1], [2, 1], [3, 1], [1, 0], [2, 0]], [[0, 1], [1, 1], [2, 1], [3, 1], [0, 0], [3, 0]],
    [[0, 0], [1, 0], [2, 0], [1, 1], [2, 1], [3, 1]], [[0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [4, 1]], [[0, 1], [1, 1], [2, 1], [3, 1], [1, 0], [3, 0]], [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [3, 2]], [[0, 0], [1, 0], [2, 0], [2, 1], [3, 1], [3, 2]]];
  // Un patron retourné au hasard (symétries qui le gardent dans un cadre de 5 × 3 cases)
  const tourne = (P) => { const mx = Math.max(...P.map((c) => c[0])), my = Math.max(...P.map((c) => c[1])), fx = Math.random() < 0.5, fy = Math.random() < 0.5; return P.map(([x, y]) => [fx ? mx - x : x, fy ? my - y : y]); };
  function dessinPatrons(L) {
    const u = 19;
    let s = `<svg class="graph patrons" viewBox="0 0 320 196" role="img" aria-label="Quatre assemblages de six carrés, notés A, B, C et D">`;
    L.forEach((P, k) => {
      const x0 = (k % 2) * 160 + 24, y0 = Math.floor(k / 2) * 98 + 18;
      s += `<text class="g-plabel" x="${x0 - 14}" y="${y0 + 12}">${"ABCD"[k]}</text>`;
      P.forEach(([x, y]) => { s += `<rect class="g-cube-haut" x="${x0 + x * u}" y="${y0 + y * u}" width="${u}" height="${u}"/>`; });
    });
    return s + `</svg>`;
  }
  FIGURES["so6-patrons"] = () => dessinPatrons([PATRONS_NON[0], PATRONS_OK[1], PATRONS_NON[2], PATRONS_NON[1]]);
  FIGURES["so6-cours-prisme"] = () => solideN("prisme", 6).svg;
  FIGURES["so6-cours-pyramide"] = () => solideN("pyramide", 5).svg;
  FIGURES["so6-cours-volume"] = () => paveCubes(5, 3, 4);
  FIGURES["so6-methode-vue"] = () => vueCubes([[2, 1, 1], [1, 1, 0]], "dessus", true);
  FIGURES["so6-qcm-pave"] = () => paveCubes(4, 2, 3);
  FIGURES["so6-methode-pave"] = () => paveCubes(4, 3, 2);
  FIGURES["so6-cours-patron"] = () => { const u = 19; let s = `<svg class="graph patrons" viewBox="0 0 320 112" role="img" aria-label="À gauche, un patron du cube en forme de croix ; à droite, six carrés en rectangle qui ne forment pas un patron">`;
    [[PATRONS_OK[4], 14, "Patron du cube"], [PATRONS_NON[0], 200, "Pas un patron"]].forEach(([P, x0, t]) => { P.forEach(([x, y]) => { s += `<rect class="g-cube-haut" x="${x0 + x * u}" y="${8 + y * u}" width="${u}" height="${u}"/>`; }); s += `<text class="g-plabel" x="${x0 + 38}" y="${8 + 3 * u + 22}" text-anchor="middle">${t}</text>`; });
    return s + `</svg>`; };
  FIGURES["so6-cours-solides"] = () => dessinSolide("un pavé droit") + FIGURES["so6-cours-patron"]();
  FIGURES["so6-cours-elements"] = () => solideN("prisme", 6).svg + solideN("pyramide", 5).svg;

  const OBJETS_SOL = [["une boîte de conserve", "un cylindre"], ["un dé à jouer", "un cube"], ["une boîte à chaussures", "un pavé droit"], ["un ballon de football", "une boule"], ["un cornet de glace", "un cône"], ["une tente canadienne", "un prisme droit à base triangulaire"], ["une brique de lait", "un pavé droit"], ["un morceau de tronc de cocotier", "un cylindre"], ["une bille", "une boule"], ["un tambour ngoma", "un cylindre"], ["le toit pointu d'un kiosque à base carrée", "une pyramide à base carrée"], ["une orange", "une boule"], ["un morceau de sucre", "un cube"], ["un chapeau pointu de carnaval", "un cône"]];
  GEN["so6-reconnaitre"] = function () {
    const t = rand(0, 4), maj = (x) => x[0].toUpperCase() + x.slice(1);
    const desc = { "un cube": "Il a $6$ faces, toutes des carrés identiques.", "un pavé droit": "Il a $6$ faces rectangulaires ; les faces opposées sont identiques.", "un cylindre": "Il a deux bases qui sont des disques identiques et parallèles, reliées par une face courbe.", "un cône": "Il a une base en forme de disque et une face courbe qui se termine en pointe.", "une boule": "Tous les points de sa surface sont à la même distance de son centre ; elle roule dans toutes les directions.", "une pyramide à base carrée": "Il a une base carrée et quatre faces triangulaires qui se rejoignent en un sommet.", "un prisme droit à base triangulaire": "Il a deux bases triangulaires identiques et parallèles, et trois faces rectangulaires." };
    const fausses = (nom) => shuffle(SOLIDES.filter((x) => x !== nom && !(/un cube|un pavé/.test(nom) && /un cube|un pavé/.test(x)))).slice(0, 3).map(maj);
    if (t === 3) { // patron d'un cube
      const cherche = Math.random() < 0.7, L = cherche ? [pick(PATRONS_OK), ...shuffle(PATRONS_NON).slice(0, 3)] : [pick(PATRONS_NON), ...shuffle(PATRONS_OK).slice(0, 3)];
      const ordre = shuffle([0, 1, 2, 3]), dessins = ordre.map((k) => tourne(L[k])), bon = ordre.indexOf(0);
      return { enonce: cherche ? "Parmi ces quatre assemblages de six carrés, lequel est un **patron de cube** ?" : "Parmi ces quatre assemblages de six carrés, lequel n'est **pas** un patron de cube ?", figure: dessinPatrons(dessins), mode: "choix", choix: ["A", "B", "C", "D"], attendu: bon,
        aides: ["Un patron se plie pour former le cube : chaque carré devient une face, sans chevauchement.", "Un carré de $2 \\times 2$ carrés, ou plus de $4$ carrés alignés, ne peut jamais se plier en cube.", "Repère quatre carrés alignés : ils font le tour du cube ; il faut alors un carré de chaque côté de cette bande."],
        solution: cherche ? `C'est l'assemblage ${"ABCD"[bon]} : en le pliant, chaque carré devient une face du cube. Dans les autres, deux carrés se superposent au pliage (ou il y a un bloc de $2 \\times 2$ carrés, ou $5$ carrés alignés).` : `C'est l'assemblage ${"ABCD"[bon]} : au pliage, deux carrés viendraient l'un sur l'autre et une face resterait vide. Les trois autres sont des patrons de cube.` };
    }
    if (t === 4) { // objets de la vie courante
      const [obj, nom] = pick(OBJETS_SOL), c = melange(maj(nom), fausses(nom));
      return { enonce: `Quel solide ressemble le plus à ${obj} ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Imagine l'objet : a-t-il des faces planes ? une face courbe ? une pointe ?", "Deux bases identiques et parallèles : prisme ou cylindre. Une pointe : pyramide ou cône.", "Toutes les faces carrées : un cube ; des rectangles : un pavé."], solution: `${maj(obj)} ressemble à ${nom} : ${desc[nom][0].toLowerCase() + desc[nom].slice(1)}` };
    }
    const nom = pick(SOLIDES), fig = t < 2, c = melange(maj(nom), fausses(nom));
    return { enonce: fig ? "Quel est ce solide ?" : `Quel solide est décrit ? « ${desc[nom]} »`, figure: fig ? dessinSolide(nom) : undefined, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Regarde la forme des faces : carrés, rectangles, triangles, disques ?", "Une face courbe ? Une pointe ?", "Les pointillés montrent les arêtes cachées."], solution: `C'est ${nom} : ${desc[nom][0].toLowerCase() + desc[nom].slice(1)}` };
  };

  const POLY = { 3: "triangle", 4: "quadrilatère", 5: "pentagone", 6: "hexagone", 7: "heptagone", 8: "octogone" };
  const ADJ_B = { 3: "triangulaire", 4: "carrée", 5: "pentagonale", 6: "hexagonale", 7: "heptagonale", 8: "octogonale" };
  GEN["so6-elements"] = function () {
    // le solide : cube, pavé, prisme droit (base à 3, 5, 6, 7 ou 8 côtés) ou pyramide (base à 3, 4, 5, 6 ou 8 côtés)
    const k = rand(0, 11);
    let nom, F, S, A, expl = "", fig, caches = null, n = 0, prisme = false;
    if (k < 2) { nom = k ? "un pavé droit" : "un cube"; [F, S, A] = [6, 8, 12]; fig = dessinSolide(nom); caches = 3; expl = " $4$ arêtes en haut, $4$ en bas et $4$ verticales ; $4$ sommets en haut et $4$ en bas."; }
    else {
      prisme = k < 7; n = prisme ? [3, 5, 6, 7, 8][k - 2] : [3, 4, 5, 6, 8][k - 7];
      nom = prisme ? pick([`un prisme droit à base ${ADJ_B[n]}`, `un prisme droit dont les bases sont des ${POLY[n]}s`]) : pick([`une pyramide à base ${ADJ_B[n]}`, `une pyramide dont la base est un ${n === 4 ? "carré" : POLY[n]}`]);
      [F, S, A] = prisme ? [n + 2, 2 * n, 3 * n] : [n + 1, n + 1, 2 * n];
      const D = solideN(prisme ? "prisme" : "pyramide", n); fig = D.svg; caches = D.caches;
      expl = prisme ? ` Chaque base a $${n}$ côtés : $2$ bases et $${n}$ faces latérales ; $${n}$ sommets par base ; $${n}$ arêtes par base et $${n}$ arêtes latérales.` : ` La base a $${n}$ côtés : $1$ base et $${n}$ faces triangulaires ; $${n}$ sommets de la base et le sommet principal ; $${n}$ arêtes de la base et $${n}$ arêtes qui montent au sommet.`;
    }
    const Nom = nom[0].toUpperCase() + nom.slice(1), t = rand(0, 6), de = deN;
    if (t === 5 && n) { // faces latérales : nombre ou forme
      if (Math.random() < 0.5) return { enonce: `Combien de faces latérales (sans compter ${prisme ? "les bases" : "la base"}) a ${nom} ?`, figure: fig, mode: "nombre", prefixe: "Faces latérales :", attendu: n,
        erreurs: [{ valeur: F, message: `Ça, c'est le nombre total de faces : on ne compte pas ${prisme ? "les deux bases" : "la base"}.` }, { valeur: prisme ? 2 * n : n + 1, message: "Ça, c'est le nombre de sommets." }],
        aides: ["Il y a une face latérale pour chaque côté de la base.", `La base a $${n}$ côtés.`, `${prisme ? "Les bases ne sont pas des faces latérales." : "La base n'est pas une face latérale."}`],
        solution: `Une face latérale par côté de la base : $${n}$ faces latérales (et $${F}$ faces en tout avec ${prisme ? "les deux bases" : "la base"}).` };
      const c = melange(prisme ? "Des rectangles" : "Des triangles", prisme ? ["Des triangles", `Des ${POLY[n]}s`, "Des disques"] : ["Des rectangles", `Des ${n === 4 ? "carré" : POLY[n]}s`, "Des disques"]);
      return { enonce: `Quelle est la forme des faces latérales ${de(nom)} ?`, figure: fig, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Les faces latérales sont celles qui ne sont pas des bases.", prisme ? "Dans un prisme droit, elles relient les deux bases, côte à côte." : "Dans une pyramide, elles se rejoignent toutes au sommet.", "Regarde le dessin."],
        solution: prisme ? `Les faces latérales d'un prisme droit sont des **rectangles** ; ici il y en a $${n}$, et les deux bases sont des ${POLY[n]}s.` : `Les faces latérales d'une pyramide sont des **triangles** qui se rejoignent au sommet ; ici il y en a $${n}$.` };
    }
    if ((t === 3 || t === 6) && caches) // arêtes cachées ou visibles sur le dessin
      return t === 6 ? { enonce: `Ce dessin en perspective représente ${nom}. Combien de ses arêtes sont visibles (tracées en traits pleins) ?`, figure: fig, mode: "nombre", prefixe: "Arêtes visibles :", attendu: A - caches,
        erreurs: [{ valeur: A, message: `Ça, c'est le nombre total d'arêtes ($${A}$). On ne compte que celles en traits pleins.` }, { valeur: caches, message: "Ça, ce sont les arêtes cachées (en pointillés)." }],
        aides: ["Les arêtes visibles sont tracées en traits pleins, les arêtes cachées en pointillés.", "Compte seulement les traits pleins.", `Vérifie : arêtes visibles $+$ arêtes cachées $= ${A}$.`],
        solution: `Sur le dessin, $${A - caches}$ arêtes sont en traits pleins et $${caches}$ en pointillés : ${nom} a $${A}$ arêtes en tout.` }
      : { enonce: `Ce dessin en perspective représente ${nom}. Combien de ses arêtes sont cachées (tracées en pointillés) ?`, figure: fig, mode: "nombre", prefixe: "Arêtes cachées :", attendu: caches,
        erreurs: [{ valeur: A, message: `Ça, c'est le nombre total d'arêtes ($${A}$). On ne compte que celles en pointillés.` }, { valeur: A - caches, message: "Ça, ce sont les arêtes visibles (traits pleins)." }],
        aides: ["Les arêtes cachées sont celles qu'on ne verrait pas en regardant le vrai solide : on les trace en pointillés.", "Compte seulement les segments en pointillés.", `Vérifie : arêtes visibles $+$ arêtes cachées $= ${A}$.`],
        solution: `Sur le dessin, $${caches}$ arêtes sont en pointillés (et $${A - caches}$ en traits pleins) : ${nom} a $${A}$ arêtes en tout.` };
    if (t === 4) { // quel solide a ces nombres ?
      const autres = [["un cube", 6, 8, 12], ["une pyramide à base carrée", 5, 5, 8], ["un prisme droit à base triangulaire", 5, 6, 9], ["une pyramide à base triangulaire", 4, 4, 6], ["un prisme droit à base hexagonale", 8, 12, 18], ["une pyramide à base hexagonale", 7, 7, 12], ["un prisme droit à base pentagonale", 7, 10, 15], ["une pyramide à base pentagonale", 6, 6, 10]];
      const bon = k < 2 ? null : autres.find((x) => x[1] === F && x[2] === S && x[3] === A);
      if (!bon) return GEN["so6-elements"]();
      const c = melange(Maj(bon[0]), shuffle(autres.filter((x) => x !== bon && x[0] !== "un cube")).slice(0, 3).map((x) => Maj(x[0])));
      return { enonce: `Quel solide a $${F}$ faces, $${S}$ sommets et $${A}$ arêtes ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Pour une pyramide, le nombre de faces est égal au nombre de sommets.", "Un prisme dont la base a $n$ côtés a $n + 2$ faces et $2 \\times n$ sommets.", "Une pyramide dont la base a $n$ côtés a $n + 1$ faces et $2 \\times n$ arêtes."],
        solution: `${Maj(bon[0])} a $${F}$ faces, $${S}$ sommets et $${A}$ arêtes.${expl}` };
    }
    const [mot, rep] = [["faces", F], ["sommets", S], ["arêtes", A]][t % 3], err = [["faces", F], ["sommets", S], ["arêtes", A]].filter((x) => x[0] !== mot);
    const avecNom = Math.random() < 0.6;
    return { enonce: avecNom ? `Combien ${de(mot)} a ${nom} ?` : `Combien ${de(mot)} a ce solide ?`, figure: fig, mode: "nombre", prefixe: `Nombre ${de(mot)} :`, attendu: rep,
      erreurs: err.map(([m2, v]) => ({ valeur: v, message: `Ça, c'est le nombre ${de(m2)} ($${v}$). On cherche le nombre ${de(mot)}.` })).concat(mot === "arêtes" && caches ? [{ valeur: A - caches, message: "N'oublie pas les arêtes cachées (en pointillés)." }] : []),
      aides: ["Une **face** est une surface plane ; une **arête** est un segment où deux faces se rejoignent ; un **sommet** est un point où des arêtes se rejoignent.", "N'oublie pas les éléments cachés (en pointillés).", "Compte méthodiquement : la ou les bases d'abord, puis les côtés."],
      solution: `${avecNom ? Nom : `Ce solide est ${nom} : il`} a $${F}$ faces, $${S}$ sommets et $${A}$ arêtes : la réponse est $${rep}$.${expl}` };
  };

  // Assemblage au hasard, sans cube caché : les colonnes ne sont jamais plus hautes vers l'avant (vers la droite et vers la gauche du dessin)
  function hasardAssemblage() {
    const n = rand(2, 3), m = rand(2, 4), hm = n + m > 6 ? 3 : 4, h = [];
    for (let i = 0; i < n; i++) { h.push([]); for (let j = 0; j < m; j++) h[i].push(rand(i + j ? 0 : 1, Math.min(hm, i ? h[i - 1][j] : hm, j ? h[i][j - 1] : hm))); }
    if (h.flat().filter((x) => x > 0).length < 3 || !h[n - 1].some((x) => x) || !h.some((l) => l[m - 1])) return hasardAssemblage();
    return h;
  }
  const totalCubes = (h) => h.flat().reduce((s, x) => s + x, 0);
  GEN["so6-compter"] = function () {
    const h = hasardAssemblage(), N = totalCubes(h), cm = Math.random() < 0.4, col = h.flat().filter((x) => x > 0);
    return { enonce: `Combien de petits cubes forment cet assemblage ? (Tous les cubes sont posés sur d'autres cubes ou sur le sol : il n'y a pas de cube en l'air.)${cm ? " Chaque cube a un volume de $1$ cm³ : donne le volume de l'assemblage." : ""}`, figure: assemblage(h), figureSolution: vueCubes(h, "dessus", true), mode: "nombre", prefixe: cm ? "Volume :" : "Nombre de cubes :", suffixe: cm ? "cm³" : "cubes", attendu: N,
      erreurs: [{ valeur: col.length, message: "Tu as compté les colonnes. Une colonne de $3$ cubes compte pour $3$, même si on ne voit que son cube du dessus." }, { valeur: Math.max(...col) * col.length, message: "Toutes les colonnes n'ont pas la même hauteur : compte-les une par une." }],
      aides: ["Compte colonne par colonne : combien de cubes empilés à chaque endroit ?", "Une colonne de hauteur $3$ compte $3$ cubes, même si on ne voit que celui du dessus.", "Additionne les hauteurs de toutes les colonnes."],
      solution: `Hauteurs des colonnes (vue de dessus ci-contre) : ${col.map((x) => `$${x}$`).join(" ; ")}. Total : $${col.join(" + ")} = ${N}$ cubes${cm ? `, soit un volume de $${N}$ cm³` : ""}.` };
  };

  GEN["so6-vues"] = function () {
    const h = hasardAssemblage(), n = h.length, m = h[0].length, t = rand(0, 2);
    const dessus = h.flat().filter((x) => x > 0).length;
    const droite = Array.from({ length: m }, (_, j) => Math.max(...h.map((l) => l[j]))).reduce((s, x) => s + x, 0);
    const gauche = h.map((l) => Math.max(...l)).reduce((s, x) => s + x, 0);
    const V = [["de dessus", dessus, "on voit un carré pour chaque colonne de cubes, quelle que soit sa hauteur", "dessus"], ["bien en face de la face foncée (à droite)", droite, "pour chaque rangée vue de ce côté, seule la colonne la plus haute compte", "droite"], ["bien en face de la face claire (à gauche)", gauche, "pour chaque rangée vue de ce côté, seule la colonne la plus haute compte", "gauche"]];
    const [quoi, rep, expl, vue] = V[t], autre = V[t === 0 ? 1 : 0];
    return { enonce: `On regarde cet assemblage ${quoi}. Combien de carrés voit-on ? (Aucun cube n'est en l'air.)`, figure: assemblage(h), figureSolution: vueCubes(h, vue), mode: "nombre", prefixe: "Nombre de carrés :", attendu: rep,
      erreurs: [{ valeur: totalCubes(h), message: "Ça, c'est le nombre total de cubes : depuis un seul côté, on ne voit pas les cubes cachés." }, { valeur: autre[1], message: `Ça, c'est ce qu'on voit ${autre[0]}.` }],
      aides: ["Imagine-toi à la place de l'observateur : les cubes cachés derrière (ou dessous) ne se voient pas.", t === 0 ? "De dessus, chaque colonne de cubes se voit comme un seul carré." : "De côté, chaque rangée se voit comme une colonne de carrés : sa hauteur est celle de la colonne la plus haute de la rangée.", "Compte les carrés de la vue obtenue."],
      solution: `${quoi[0].toUpperCase() + quoi.slice(1)}, ${expl} : on voit $${rep}$ carrés (vue ci-contre).` };
  };

  GEN["so6-volume"] = function () {
    const t = rand(0, 2);
    if (t === 0) { const L = rand(2, 7), l = rand(2, 5), c = rand(1, 5);
      return { enonce: `Ce pavé est construit avec des cubes de $1$ cm³ : $${L}$ cubes en longueur, $${l}$ en largeur et $${c}$ couche${c > 1 ? "s" : ""}. Quel est son volume ?`, figure: paveCubes(L, l, c), mode: "nombre", prefixe: "Volume :", suffixe: "cm³", attendu: L * l * c,
        erreurs: [{ valeur: L + l + c, message: "On n'additionne pas : chaque couche contient plusieurs rangées de cubes." }, { valeur: L * l, message: `C'est une seule couche. Il y en a $${c}$.` }, { valeur: L * l + l * c + L * c, message: "Tu as compté les carrés visibles sur le dessin : il y a aussi des cubes cachés à l'intérieur." }],
        aides: [`Une couche contient $${L}$ rangées de $${l}$ cubes.`, `Une couche : $${L} \\times ${l} = ${L * l}$ cubes.`, `Il y a $${c}$ couche${c > 1 ? "s" : ""}.`], solution: `Une couche : $${L} \\times ${l} = ${L * l}$ cubes ; $${c}$ couche${c > 1 ? "s" : ""} : $${L * l} \\times ${c} = ${L * l * c}$ cubes, soit $${L * l * c}$ cm³.` }; }
    if (t === 1) { // compléter un pavé
      const L = rand(2, 3), l = rand(2, 3), c = rand(2, 3), h = Array.from({ length: L }, () => Array(l).fill(c));
      // on retire des cubes à l'avant, sans jamais rendre une colonne plus basse que celle placée devant elle (aucun cube caché)
      let manque = 0; for (let i = L - 1; i >= 0 && manque < 4; i--) for (let j = l - 1; j >= 0; j--) { const lim = h[i][j] - Math.max(i < L - 1 ? h[i + 1][j] : 0, j < l - 1 ? h[i][j + 1] : 0); if (lim > 0 && Math.random() < 0.5) { const d = rand(1, lim); h[i][j] -= d; manque += d; } }
      if (!manque) return GEN["so6-volume"]();
      const N = totalCubes(h);
      return { enonce: `On veut compléter cet assemblage pour obtenir un pavé de $${L}$ cubes sur $${l}$ cubes, haut de $${c}$ couches. Combien de cubes faut-il ajouter ? (Aucun cube n'est en l'air.)`, figure: assemblage(h), figureSolution: vueCubes(h, "dessus", true), mode: "nombre", prefixe: "Cubes à ajouter :", attendu: L * l * c - N,
        erreurs: [{ valeur: N, message: "Ça, c'est le nombre de cubes déjà posés. On demande combien il en manque." }, { valeur: L * l * c, message: "Ça, c'est le nombre de cubes du pavé complet. Retire ceux qui sont déjà posés." }],
        aides: [`Le pavé complet contient $${L} \\times ${l} \\times ${c} = ${L * l * c}$ cubes.`, "Compte les cubes déjà posés, colonne par colonne.", "Fais la différence."],
        solution: `Pavé complet : $${L} \\times ${l} \\times ${c} = ${L * l * c}$ cubes. Déjà posés : $${N}$ cubes. Il faut en ajouter $${L * l * c} - ${N} = ${L * l * c - N}$.` };
    }
    const h1 = hasardAssemblage(), h2 = hasardAssemblage(), n1 = totalCubes(h1), n2 = totalCubes(h2);
    const choix = ["Le solide A a le plus grand volume", "Le solide B a le plus grand volume", "Ils ont le même volume"], rep = n1 === n2 ? 2 : n1 > n2 ? 0 : 1;
    return { enonce: "Les deux assemblages sont faits de cubes identiques (aucun cube en l'air). Lequel a le plus grand volume ? Solide A : le premier ; solide B : le second.", figure: assemblage(h1).replace("</svg>", `<text class="g-plabel" x="10" y="16">A</text></svg>`) + assemblage(h2).replace("</svg>", `<text class="g-plabel" x="10" y="16">B</text></svg>`), mode: "choix", choix, attendu: rep,
      aides: ["Le volume se mesure en nombre de cubes.", "Compte les cubes de chaque assemblage, colonne par colonne.", "Compare les deux nombres."],
      solution: `A : $${n1}$ cubes ; B : $${n2}$ cubes. ${choix[rep]}.` };
  };

  /* =====================================================================
     6e, chapitre 15 : initiation à la pensée informatique (pi6-)
     Programmes en blocs façon Scratch, robot sur un quadrillage (colonnes A à H, lignes 1 à 6)
     ===================================================================== */
  const NX = 8, NY = 6, COLS = "ABCDEFGH";
  const nomCase = ([i, j]) => COLS[i] + (j + 1);
  const dansG = ([i, j]) => i >= 0 && i < NX && j >= 0 && j < NY;
  const FL = { "↑": [0, 1], "→": [1, 0], "↓": [0, -1], "←": [-1, 0] };
  const FLECHES = ["↑", "→", "↓", "←"], VECT = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  const VERS = ["vers le haut", "vers la droite", "vers le bas", "vers la gauche"];
  const plus = (p, v, k) => [p[0] + v[0] * (k || 1), p[1] + v[1] * (k || 1)];
  const suivre = (dep, code) => { const pts = [dep]; code.forEach((f) => pts.push(plus(pts[pts.length - 1], FL[f]))); return pts; };
  const codeTxt = (code) => code.join(" ");
  const runs = (code) => { const r = []; code.forEach((f) => { if (r.length && r[r.length - 1][0] === f) r[r.length - 1][1]++; else r.push([f, 1]); }); return r; };
  const casesTxt = (n) => `$${n}$ case${n > 1 ? "s" : ""}`;
  const parcours = (dep, code) => { let p = dep; return runs(code).map(([f, n]) => { p = plus(p, FL[f], n); return `${casesTxt(n)} ${VERS[FLECHES.indexOf(f)]} : **${nomCase(p)}**`; }).join(" ; "); };
  const autour = (p) => [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1], [2, 0], [0, 2]].map((v) => plus(p, v)).filter(dansG).map(nomCase);
  function choixCases(bonne, pos, fausses) {
    const f = [...new Set(fausses.filter(dansG).map(nomCase))].filter((x) => x !== bonne);
    autour(pos).forEach((v) => { if (f.length < 3 && v !== bonne && !f.includes(v)) f.push(v); });
    return melange(bonne, f);
  }

  // Programme en blocs : [{ c: catégorie, t: "texte avec [valeurs]" } | { rep: n, corps: [...] }]
  const CAT_PI = { evt: "pi-evt", ent: "pi-ent", op: "pi-op", dire: "pi-dire", mvt: "pi-mvt", stylo: "pi-stylo", ctrl: "pi-ctrl", var: "pi-var" };
  function blocs(prog) {
    const W = 320, H = 26, CW = 6.6; let y = 6, s = "";
    const ecrire = (t, x, yc) => {
      let out = "", cx = x;
      t.split(/(\[[^\]]*\])/).filter((seg) => seg.trim()).forEach((seg) => {
        if (seg[0] === "[") { const v = seg.slice(1, -1), w = Math.max(24, v.length * CW + 12);
          out += `<rect class="pi-champ" x="${cx}" y="${yc - 9}" width="${w}" height="18" rx="9"/><text class="pi-val" x="${cx + w / 2}" y="${yc + 4}" text-anchor="middle">${v}</text>`; cx += w + 5; }
        else { const m = seg.trim(); out += `<text class="pi-txt" x="${cx}" y="${yc + 4}" textLength="${(m.length * CW).toFixed(1)}" lengthAdjust="spacingAndGlyphs">${m}</text>`; cx += m.length * CW + 5; }
      });
      return [out, cx - x];
    };
    const poser = (b, x) => {
      if (b.rep != null) {
        const y0 = y, [txt, w] = ecrire(`répéter [${b.rep}] fois`, x + 8, y0 + H / 2), Wt = Math.max(w + 14, 130);
        y += H; const yIn = y; b.corps.forEach((c) => poser(c, x + 14)); const hIn = Math.max(y - yIn, H);
        s += `<path class="pi-ctrl" d="M${x} ${y0}h${Wt}v${H}h${-(Wt - 14)}v${hIn}h${Wt - 14}v14h${-Wt}z"/>` + txt;
        y = yIn + hIn + 16; return;
      }
      if (b.vide) { s += `<rect class="pi-vide" x="${x}" y="${y}" width="120" height="${H}" rx="5"/><text class="pi-vide-txt" x="${x + 60}" y="${y + H / 2 + 5}" text-anchor="middle">?</text>`; y += H + 2; return; }
      const [txt, w] = ecrire(b.t, x + 8, y + H / 2);
      s += `<rect class="${CAT_PI[b.c]}" x="${x}" y="${y}" width="${w + 11}" height="${H}" rx="${b.c === "evt" ? 12 : 5}"/>` + txt; y += H + 2;
    };
    prog.forEach((b) => poser(b, 6));
    const aria = (p) => p.map((b) => (b.rep != null ? `répéter ${b.rep} fois : ${aria(b.corps)} ; fin de la répétition` : b.vide ? "bloc vide" : b.t.replace(/[[\]]/g, ""))).join(" ; ");
    return `<svg class="graph pi-prog" viewBox="0 0 ${W} ${y + 4}" role="img" aria-label="Programme : ${aria(prog)}">${s}</svg>`;
  }

  // Quadrillage du robot
  function grille(o) {
    const c = 32, mx = 22, my = 20, W = mx + NX * c + 8, H = my + NY * c + 8;
    const X = (i) => mx + i * c + c / 2, Y = (j) => my + (NY - 1 - j) * c + c / 2;
    let s = `<svg class="graph pi-grille" viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.aria}"><g class="g-grid">`;
    for (let i = 0; i <= NX; i++) s += `<line x1="${mx + i * c}" y1="${my}" x2="${mx + i * c}" y2="${my + NY * c}"/>`;
    for (let j = 0; j <= NY; j++) s += `<line x1="${mx}" y1="${my + j * c}" x2="${mx + NX * c}" y2="${my + j * c}"/>`;
    s += `</g>`;
    for (let i = 0; i < NX; i++) s += `<text class="pi-case" x="${X(i)}" y="${my - 6}" text-anchor="middle">${COLS[i]}</text>`;
    for (let j = 0; j < NY; j++) s += `<text class="pi-case" x="${mx - 9}" y="${Y(j) + 4}" text-anchor="middle">${j + 1}</text>`;
    if (o.chemin) s += `<polyline class="pi-chemin" points="${o.chemin.map(([i, j]) => `${X(i)},${Y(j)}`).join(" ")}"/>`;
    if (o.arrivee) { const [i, j] = o.arrivee; s += `<rect class="pi-arrivee" x="${X(i) - 7}" y="${Y(j) - 7}" width="14" height="14" rx="2"/>`; }
    if (o.pion) { const [i, j] = o.pion; s += `<circle class="pi-pion" cx="${X(i)}" cy="${Y(j)}" r="10"/>`; }
    if (o.robot) { const { p: [i, j], d } = o.robot, cx = X(i), cy = Y(j);
      s += `<polygon class="pi-robot" points="${cx},${cy - 12} ${cx + 10},${cy + 9} ${cx - 10},${cy + 9}" transform="rotate(${d * 90} ${cx} ${cy})"/>`; }
    return s + `</svg>`;
  }

  /* --- Programmes de calcul --- */
  const OPS_PI = { "+": (x, k) => x + k, "-": (x, k) => x - k, "×": (x, k) => x * k, "÷": (x, k) => x / k };
  const SIGNE_PI = { "+": "+", "-": "-", "×": "\\times", "÷": "\\div" };
  const opBloc = ([o, k]) => ({ "+": `ajouter [${k}]`, "-": `soustraire [${k}]`, "×": `multiplier par [${k}]`, "÷": `diviser par [${k}]` })[o];
  const opTex = ([o, k]) => ({ "+": `ajouter $${k}$`, "-": `soustraire $${k}$`, "×": `multiplier par $${k}$`, "÷": `diviser par $${k}$` })[o];
  const appliquer = (x, ops) => ops.reduce((v, [o, k]) => OPS_PI[o](v, k), x);
  const etapes = (x, ops) => { let v = x; return ops.map(([o, k]) => { const w = OPS_PI[o](v, k), t = `$${nb(v)} ${SIGNE_PI[o]} ${k} = ${nb(w)}$`; v = w; return t; }).join(" ; "); };
  const ENTREES = ["demander un nombre", "demander un nombre entier", "demander le nombre de départ"];
  const progCalcBlocs = (ops, cache, entree) => blocs([{ c: "evt", t: "quand le drapeau est cliqué" }, { c: "ent", t: entree || ENTREES[0] }, ...ops.map((o, i) => (i === cache ? { vide: true } : { c: "op", t: opBloc(o) })), { c: "dire", t: "dire le résultat" }]);
  function progCalc(n) {
    for (let e = 0; e < 500; e++) {
      const x = rand(2, 20), ops = []; let v = x, ok = true;
      for (let i = 0; i < n; i++) {
        const possibles = [["+", rand(2, 15)], ["×", rand(2, 6)]];
        if (v > 3) possibles.push(["-", rand(1, Math.min(v - 1, 15))]);
        const ds = [2, 3, 4, 5, 10].filter((k) => v % k === 0 && v > k); if (ds.length) possibles.push(["÷", pick(ds)]);
        const permis = possibles.filter((p) => !ops.length || p[0] !== ops[ops.length - 1][0]), op = pick(permis);
        v = OPS_PI[op[0]](v, op[1]); ops.push(op); if (v > 400) ok = false;
      }
      if (ok) return { x, ops, y: v };
    }
  }
  FIGURES["pi6-programme"] = () => progCalcBlocs([["×", 3], ["+", 5]]);

  GEN["pi6-executer"] = function () {
    if (Math.random() < 0.72) {
      const { x, ops, y } = progCalc(rand(2, 4)), entree = pick(ENTREES), inv = appliquer(x, ops.slice().reverse());
      const erreurs = [{ valeur: appliquer(x, ops.slice(0, -1)), message: "Tu as oublié la dernière instruction avant « dire le résultat »." }];
      if (Number.isInteger(inv) && inv >= 0) erreurs.push({ valeur: inv, message: "Les instructions s'exécutent **dans l'ordre**, de haut en bas." });
      return { enonce: `On clique sur le drapeau et on donne le nombre $${x}$. Quel nombre le programme affiche-t-il ?`, figure: progCalcBlocs(ops, -1, entree), mode: "nombre", prefixe: "Le programme affiche :", attendu: y, erreurs,
        aides: ["Le nombre donné est l'**entrée** ; le nombre affiché est la **sortie**.", "Exécute les blocs un par un, de haut en bas : chaque instruction s'applique au résultat de la précédente.", `Première instruction : ${etapes(x, ops.slice(0, 1))}.`],
        solution: `On part de $${x}$ : ${etapes(x, ops)}. Le programme affiche $${y}$.` };
    }
    const { x, ops, y } = progCalc(2);
    const inverses = ops.slice().reverse().map(([o, k]) => [{ "+": "-", "-": "+", "×": "÷", "÷": "×" }[o], k]);
    const avant = appliquer(y, ops);
    const erreurs = Number.isInteger(avant) ? [{ valeur: avant, message: "Tu as appliqué le programme au résultat. Il faut le **remonter** avec les opérations contraires." }] : [];
    return { enonce: `On a lancé ce programme et il a affiché $${y}$. Quel nombre avait-on donné au départ ?`, figure: progCalcBlocs(ops), mode: "nombre", prefixe: "Nombre de départ :", attendu: x, erreurs,
      aides: ["Remonte le programme en partant de la fin, du bas vers le haut.", "À chaque étape, fais l'opération contraire : $+$ et $-$ sont contraires, $\\times$ et $\\div$ aussi.", `Dernière instruction : ${opTex(ops[1])}. Son contraire : ${opTex(inverses[0])}.`],
      solution: `On remonte avec les opérations contraires : ${etapes(y, inverses)}. Vérification : ${etapes(x, ops)}.` };
  };

  GEN["pi6-identifier"] = function () {
    const t = rand(0, 3);
    if (t === 0) {
      const { ops } = progCalc(rand(2, 3)), entree = pick(ENTREES), q = rand(0, 2);
      if (new Set(ops.map(opTex)).size < ops.length) return GEN["pi6-identifier"]();
      if (q < 2) {
        const bonne = q === 0 ? entree : "dire le résultat", autre = q === 0 ? "dire le résultat" : entree;
        const { choix, attendu } = melange(bonne, [autre, opTex(ops[0]), opTex(ops[1]), "quand le drapeau est cliqué"]);
        return { enonce: q === 0 ? "Dans ce programme, quelle instruction permet de donner un nombre au programme (l'**entrée**) ?" : "Dans ce programme, quelle instruction montre le résultat (la **sortie**) ?", figure: progCalcBlocs(ops, -1, entree), mode: "choix", choix, attendu,
          aides: ["L'**entrée** est ce qu'on donne au programme ; la **sortie** est ce que le programme nous rend.", "Les blocs verts sont des calculs : ils transforment le nombre, ils ne le donnent pas et ne l'affichent pas.", q === 0 ? "Cherche l'instruction qui demande quelque chose." : "Cherche l'instruction qui affiche quelque chose."],
          solution: q === 0 ? `L'entrée est l'instruction « ${entree} » : c'est là qu'on donne le nombre de départ.` : "La sortie est l'instruction « dire le résultat » : c'est là que le programme affiche le nombre obtenu." };
      }
      const i = rand(0, ops.length - 1), suite = i === ops.length - 1 ? "dire le résultat" : opTex(ops[i + 1]);
      const { choix, attendu } = melange(suite, [...ops.filter((_, j) => j !== i + 1).map(opTex), entree, "dire le résultat", "quand le drapeau est cliqué"].filter((c) => c !== opTex(ops[i])));
      return { enonce: `Dans ce programme, quelle instruction est exécutée juste après « ${opTex(ops[i])} » ?`, figure: progCalcBlocs(ops, -1, entree), mode: "choix", choix, attendu,
        aides: ["Un programme est une **séquence d'instructions** : elles s'exécutent l'une après l'autre.", "L'ordre d'exécution est l'ordre des blocs, de haut en bas.", `Repère le bloc « ${opTex(ops[i]).replace(/\$/g, "")} » et regarde le bloc juste en dessous.`],
        solution: `Juste en dessous de « ${opTex(ops[i])} », il y a « ${suite} » : c'est l'instruction suivante.` };
    }
    if (t === 1) {
      for (let e = 0; e < 200; e++) {
        const { x, ops, y } = progCalc(3), h = rand(0, 2), [o, k] = ops[h];
        const cands = [["+", k], ["-", k], ["×", k], ["÷", k], [o, k + 1], [o, Math.max(1, k - 1)], [o, k + 2], ["+", k * 2]];
        const fausses = []; cands.forEach((c) => { const ops2 = ops.slice(); ops2[h] = c; const r = appliquer(x, ops2); if (Math.abs(r - y) > 1e-9 && !(c[0] === o && c[1] === k) && !(c[0] === "÷" && c[1] === 1)) fausses.push(opTex(c)); });
        if (new Set(fausses).size < 3) continue;
        const { choix, attendu } = melange(opTex(ops[h]), shuffle(fausses));
        return { enonce: `On donne $${x}$ à ce programme et il affiche $${y}$. Quelle instruction manque à la place du bloc vide ?`, figure: progCalcBlocs(ops, h), mode: "choix", choix, attendu,
          aides: ["Exécute le programme depuis le début jusqu'au bloc vide.", h < 2 ? "Remonte aussi depuis la fin avec les opérations contraires, jusqu'au bloc vide." : "Compare le nombre obtenu juste avant le bloc vide avec le résultat affiché.", "Teste chaque proposition : une seule donne le bon résultat."],
          solution: `Avec « ${opTex(ops[h])} » : ${etapes(x, ops)}. On retrouve bien $${y}$.` };
      }
    }
    if (t === 2 || t === 3) {
      for (let e = 0; e < 200; e++) {
        const x = rand(2, 12), a = rand(2, 9), b = rand(2, 5), moins = Math.random() < 0.3 && x > 9;
        if (a === b) continue;
        const A = (v) => (moins ? ["-", v] : ["+", v]), progs = [[A(a), ["×", b]], [["×", b], A(a)], [A(b), ["×", a]], [["×", a], A(b)]];
        if (progs.some((p) => appliquer(x, p) < 0)) continue;
        const bon = pick([0, 1]), y = appliquer(x, progs[bon]);
        const txt = (p) => `${opTex(p[0])}, puis ${opTex(p[1])}`;
        const fausses = progs.filter((p) => appliquer(x, p) !== y).map(txt);
        if (fausses.length < 3) continue;
        const { choix, attendu } = melange(txt(progs[bon]), fausses), autre = progs[1 - bon];
        return { enonce: `On veut un programme qui, avec le nombre $${x}$, affiche $${y}$. Quelle séquence d'instructions convient ?`, mode: "choix", choix, attendu,
          aides: ["Teste chaque séquence avec le nombre $" + x + "$.", "Attention : l'ordre des instructions change le résultat.", `Par exemple : ${txt(progs[0]).replace(/\$/g, "")} donne ${etapes(x, progs[0])}.`],
          solution: `${txt(progs[bon])} : ${etapes(x, progs[bon])}. Dans l'autre ordre (${txt(autre)}), on obtiendrait ${etapes(x, autre)} : l'ordre compte.` };
      }
    }
    return GEN["pi6-identifier"]();
  };

  /* --- Codes de déplacement (flèches) --- */
  function codeHasard(nRuns, maxL) {
    for (let e = 0; e < 400; e++) {
      const dep = [rand(0, NX - 1), rand(0, NY - 1)], code = []; let der = -1;
      for (let r = 0; r < nRuns; r++) { let d; do d = rand(0, 3); while (d === der || (der >= 0 && d === (der + 2) % 4)); der = d; const L = rand(1, maxL); for (let k = 0; k < L; k++) code.push(FLECHES[d]); }
      const pts = suivre(dep, code);
      if (pts.every(dansG) && new Set(pts.map(nomCase)).size === pts.length) return { dep, code, pts, arr: pts[pts.length - 1] };
    }
  }
  const echange = (code, a, b) => code.map((f) => (f === a ? b : f === b ? a : f));
  FIGURES["pi6-fleches"] = () => { const dep = [1, 1], code = ["→", "→", "→", "↑", "↑", "←"]; return grille({ pion: dep, chemin: suivre(dep, code), arrivee: [3, 3], aria: "Quadrillage : le robot part de B2 et suit le chemin → → → ↑ ↑ ← jusqu'à D4" }); };

  GEN["pi6-fleches"] = function () {
    const { dep, code, pts, arr } = codeHasard(rand(2, 4), 3), bonne = nomCase(arr);
    if (Math.random() < 0.55) {
      const R = runs(code), moins = R[0][1] > 1 ? [...code.slice(1)] : [...code, code[code.length - 1]];
      const fausses = [echange(code, "↑", "↓"), echange(code, "←", "→"), code.slice(0, -1), moins].map((c) => suivre(dep, c).pop());
      const { choix, attendu } = choixCases(bonne, arr, fausses);
      return { enonce: `Le robot (le rond) est sur la case **${nomCase(dep)}**. Chaque flèche le fait avancer d'**une** case dans sa direction. Sur quelle case arrive-t-il avec le code **${codeTxt(code)}** ?`, figure: grille({ pion: dep, aria: `Quadrillage de A1 à H6, le robot est sur la case ${nomCase(dep)}` }), mode: "choix", choix, attendu,
        aides: ["Une case se nomme par sa colonne (une lettre) puis sa ligne (un nombre) : B3 est dans la colonne B, à la ligne 3.", "Exécute les flèches une par une, dans l'ordre, en déplaçant ton doigt sur le quadrillage.", `Regroupe les flèches identiques qui se suivent : ${runs(code).map(([f, n]) => `${n} × ${f}`).join(", ")}.`],
        solution: `Depuis **${nomCase(dep)}** : ${parcours(dep, code)}. Le robot arrive sur **${bonne}**.` };
    }
    const R = runs(code), inverse = [].concat(...R.slice().reverse().map(([f, n]) => Array(n).fill(f)));
    const plusUn = [].concat(...R.map(([f, n], i) => Array(i === R.length - 1 ? n + 1 : n).fill(f)));
    const fausses = [echange(code, "↑", "↓"), echange(code, "←", "→"), inverse, plusUn, code.slice(0, -1)].map(codeTxt);
    const { choix, attendu } = melange(codeTxt(code), fausses.filter((f) => f !== codeTxt(code)));
    return { enonce: `Quel code fait suivre au robot le chemin dessiné, de la case **${nomCase(dep)}** (le rond) à la case **${bonne}** (le carré) ?`, figure: grille({ pion: dep, chemin: pts, arrivee: arr, aria: `Quadrillage : chemin de ${nomCase(dep)} à ${bonne}` }), mode: "choix", choix, attendu,
      aides: ["Pars du rond et suis le chemin jusqu'au carré.", "Compte les cases dans chaque direction, dans l'ordre du chemin.", "Plusieurs codes arrivent peut-être au même endroit : il faut celui qui suit **exactement** le chemin."],
      solution: `Le chemin fait ${runs(code).map(([f, n]) => `${casesTxt(n)} ${VERS[FLECHES.indexOf(f)]}`).join(", puis ")}. Le code est **${codeTxt(code)}**.` };
  };

  /* --- Robot qui avance et tourne (déplacements relatifs) --- */
  function executer(dep, d, prog, abs) {
    let p = dep, dir = d; const pts = [dep];
    prog.forEach(([o, n]) => {
      if (o === "a") for (let k = 0; k < n; k++) { p = plus(p, VECT[dir]); pts.push(p); }
      else dir = abs ? (o === "d" ? 1 : 3) : (dir + (o === "d" ? 1 : 3)) % 4;
    });
    return { pts, p, dir };
  }
  const instrTex = ([o, n]) => (o === "a" ? `avancer de $${n}$` : o === "d" ? "tourner à droite" : "tourner à gauche");
  const progTex = (prog) => prog.map(instrTex).join(" ; ");
  const robotBlocs = (prog) => blocs([{ c: "evt", t: "quand le drapeau est cliqué" }, ...prog.map(([o, n]) => ({ c: "mvt", t: o === "a" ? `avancer de [${n}]` : o === "d" ? "tourner à droite ↻" : "tourner à gauche ↺" }))]);
  function progHasard() {
    for (let e = 0; e < 500; e++) {
      const dep = [rand(0, NX - 1), rand(0, NY - 1)], d = rand(0, 3), prog = [], nA = rand(2, 4);
      if (Math.random() < 0.3) prog.push([pick(["d", "g"])]);
      for (let k = 0; k < nA; k++) { if (k > 0) prog.push([pick(["d", "g"])]); prog.push(["a", rand(1, 3)]); }
      const r = executer(dep, d, prog);
      if (r.pts.every(dansG) && new Set(r.pts.map(nomCase)).size === r.pts.length) return { dep, d, prog, ...r };
    }
  }
  const inverseDG = (prog) => prog.map(([o, n]) => (o === "d" ? ["g"] : o === "g" ? ["d"] : [o, n]));
  const AIDE_TOURNER = "« Tourner à droite » : le robot fait un quart de tour sur place, vers **sa** droite (celle du robot, pas celle de la feuille). Il ne change pas de case.";
  FIGURES["pi6-robot"] = () => robotBlocs([["a", 2], ["d"], ["a", 3]]) + grille({ robot: { p: [1, 1], d: 0 }, aria: "Quadrillage : le robot est sur la case B2 et regarde vers le haut" });
  FIGURES["pi6-chemin"] = () => { const dep = [1, 1]; return grille({ robot: { p: dep, d: 1 }, chemin: suivre(dep, ["→", "→", "→", "↑", "↑", "←"]), arrivee: [3, 3], aria: "Quadrillage : le robot part de B2 en regardant vers la droite et suit le chemin jusqu'à D4" }); };

  GEN["pi6-robot"] = function () {
    const { dep, d, prog, pts, p, dir } = progHasard(), t = rand(0, 4), bonne = nomCase(p);
    const fig = robotBlocs(prog) + grille({ robot: { p: dep, d }, aria: `Quadrillage : le robot est sur la case ${nomCase(dep)} et regarde ${VERS[d]}` });
    const suivi = () => { let q = dep, di = d; return prog.map(([o, n]) => { if (o === "a") { q = plus(q, VECT[di], n); return `il avance de ${casesTxt(n)} ${VERS[di]} : **${nomCase(q)}**`; } di = (di + (o === "d" ? 1 : 3)) % 4; return `il tourne et regarde ${VERS[di]}`; }).join(" ; "); };
    if (t <= 1) {
      const premier = prog.findIndex(([o]) => o === "a"), compte = prog.map((x, i) => (i === premier && x[1] > 1 ? ["a", x[1] - 1] : x));
      const fausses = [executer(dep, d, inverseDG(prog)).p, executer(dep, d, prog, true).p, executer(dep, d, prog.slice(0, -1)).p, executer(dep, d, compte).p];
      const { choix, attendu } = choixCases(bonne, p, fausses);
      return { enonce: `Le robot (le triangle) regarde dans la direction de sa pointe. On lance le programme. Sur quelle case arrive-t-il ?`, figure: fig, mode: "choix", choix, attendu,
        aides: [AIDE_TOURNER, "« Avancer de 2 » : le robot avance de 2 cases tout droit, dans la direction où il regarde. La case de départ ne compte pas.", "Exécute les blocs un par un et note après chacun la case et la direction du robot."],
        solution: `Au départ, le robot est en **${nomCase(dep)}** et regarde ${VERS[d]}. Puis ${suivi()}. Il arrive sur **${bonne}**.` };
    }
    if (t === 2) {
      return { enonce: `Le robot (le triangle) regarde dans la direction de sa pointe. On lance le programme. À la fin, dans quelle direction regarde-t-il ?`, figure: fig, mode: "choix", choix: VERS.slice(), attendu: dir,
        aides: [AIDE_TOURNER, "Seuls les blocs « tourner » changent la direction ; « avancer » ne la change pas.", "Pour un quart de tour à droite : haut → droite → bas → gauche → haut."],
        solution: `Au départ, le robot regarde ${VERS[d]}. Puis ${suivi()}. À la fin, il regarde **${VERS[dir]}**.` };
    }
    const As = prog.filter(([o]) => o === "a").map(([, n]) => n);
    let k = -1; const distInv = prog.map(([o, n]) => (o === "a" ? ["a", As[As.length - 1 - ++k]] : [o]));
    const sansTour = prog[0][0] === "a" ? [[pick(["d", "g"])], ...prog] : prog.slice(1);
    const plusUn = prog.map((x, i) => (i === prog.length - 1 ? ["a", x[1] + 1] : x));
    const fausses = [inverseDG(prog), distInv, sansTour, plusUn].map(progTex).filter((s) => s !== progTex(prog));
    const { choix, attendu } = melange(progTex(prog), fausses);
    return { enonce: `Le robot (le triangle) part de la case **${nomCase(dep)}** en regardant ${VERS[d]}. Quel programme lui fait suivre le chemin dessiné jusqu'au carré ?`, figure: grille({ robot: { p: dep, d }, chemin: pts, arrivee: p, aria: `Quadrillage : chemin de ${nomCase(dep)} à ${bonne}, le robot regarde ${VERS[d]} au départ` }), mode: "choix", choix, attendu,
      aides: [AIDE_TOURNER, "Mets-toi à la place du robot : à chaque virage, demande-toi s'il tourne vers sa droite ou vers sa gauche.", "Vérifie aussi le nombre de cases de chaque ligne droite, et le tout premier déplacement : le robot doit-il d'abord tourner ?"],
      solution: `Le programme est : ${progTex(prog)}. En effet, au départ le robot regarde ${VERS[d]}, puis ${suivi()}.` };
  };

  /* --- Boucles « répéter » --- */
  function boucleGrille() {
    for (let e = 0; e < 500; e++) {
      const L = rand(2, 3), corps = []; let der = -1;
      for (let k = 0; k < L; k++) { let dd; do dd = rand(0, 3); while (der >= 0 && dd === (der + 2) % 4); der = dd; corps.push(FLECHES[dd]); }
      const n = rand(2, 4), dep = [rand(0, NX - 1), rand(0, NY - 1)], code = [].concat(...Array(n).fill(corps)), pts = suivre(dep, code);
      if (corps.every((f) => f === corps[0]) || FLECHES.indexOf(corps[0]) === (FLECHES.indexOf(corps[L - 1]) + 2) % 4) continue;
      if (pts.every(dansG) && nomCase(pts[pts.length - 1]) !== nomCase(dep)) return { dep, corps, n, code, pts, arr: pts[pts.length - 1] };
    }
  }
  const FORMES = { 3: "un triangle équilatéral", 4: "un carré", 5: "un pentagone régulier", 6: "un hexagone régulier", 8: "un octogone régulier" };
  const lutinBlocs = (corps, n) => blocs([{ c: "evt", t: "quand le drapeau est cliqué" }, { c: "stylo", t: "stylo en position d'écriture" }, { rep: n, corps }]);
  FIGURES["pi6-boucle"] = () => lutinBlocs([{ c: "mvt", t: "avancer de [80] pas" }, { c: "mvt", t: "tourner ↻ de [90] degrés" }], 4);
  FIGURES["pi6-qcm-calc"] = () => progCalcBlocs([["+", 4], ["×", 2]]);
  FIGURES["pi6-qcm-robot"] = () => robotBlocs([["a", 3], ["g"], ["a", 2]]) + grille({ robot: { p: [1, 3], d: 1 }, aria: "Quadrillage : le robot est sur la case B4 et regarde vers la droite" });
  FIGURES["pi6-qcm-triangle"] = () => lutinBlocs([{ c: "mvt", t: "avancer de [60] pas" }, { c: "mvt", t: "tourner ↻ de [120] degrés" }], 3);

  GEN["pi6-repeter"] = function () {
    const t = rand(0, 5);
    if (t === 0) {
      const x = rand(1, 20), s = rand(0, 3);
      let ops, n;
      if (s === 0) { n = rand(3, 9); ops = [["+", rand(2, 9)]]; }
      else if (s === 1) { n = rand(2, 5); ops = [["×", 2]]; }
      else if (s === 2) { n = rand(2, 3); ops = [["+", rand(1, 5)], ["×", 2]]; }
      else { n = rand(3, 6); const k = rand(2, 5); ops = [["-", k]]; if (x <= n * k) return GEN["pi6-repeter"](); }
      const y = appliquer(x, [].concat(...Array(n).fill(ops)));
      const prog = blocs([{ c: "evt", t: "quand le drapeau est cliqué" }, { c: "ent", t: "demander un nombre" }, { rep: n, corps: ops.map((o) => ({ c: "op", t: opBloc(o) })) }, { c: "dire", t: "dire le résultat" }]);
      const une = appliquer(x, ops), erreurs = [{ valeur: une, message: `Ça, c'est après **un seul** passage dans la boucle. Elle se répète $${n}$ fois.` }];
      if (s === 1) erreurs.push({ valeur: x * 2 * n, message: `Multiplier $${n}$ fois par $2$, ce n'est pas multiplier par $2 \\times ${n}$ : double, puis double encore…` });
      if (s === 0) erreurs.push({ valeur: x + ops[0][1] + n, message: `On ajoute $${ops[0][1]}$, et on le fait $${n}$ fois.` });
      let v = x; const tours = []; for (let i = 0; i < n; i++) { v = appliquer(v, ops); tours.push(`$${nb(v)}$`); }
      return { enonce: `On lance ce programme et on donne le nombre $${x}$. Quel nombre affiche-t-il ?`, figure: prog, mode: "nombre", prefixe: "Le programme affiche :", attendu: y, erreurs,
        aides: [`Les instructions à l'intérieur du bloc « répéter » sont exécutées $${n}$ fois de suite.`, "Note le nombre obtenu après chaque passage dans la boucle.", `Après le premier passage, on a ${tours[0]}.`],
        solution: `Après chaque passage dans la boucle, on obtient : ${tours.join(", ")}. Le programme affiche $${y}$.` };
    }
    if (t === 1) {
      const { dep, corps, n, code, arr } = boucleGrille(), bonne = nomCase(arr);
      const fausses = [suivre(dep, corps).pop(), suivre(dep, [].concat(...Array(n - 1).fill(corps))).pop(), suivre(dep, [].concat(...Array(n + 1).fill(corps))).pop(), suivre(dep, [...Array(n).fill(corps[0]), ...corps.slice(1)]).pop()];
      const { choix, attendu } = choixCases(bonne, arr, fausses);
      const fig = blocs([{ c: "evt", t: "quand le drapeau est cliqué" }, { rep: n, corps: corps.map((f) => ({ c: "mvt", t: `aller ${f}` })) }]) + grille({ pion: dep, aria: `Quadrillage de A1 à H6, le robot est sur la case ${nomCase(dep)}` });
      return { enonce: `Le robot (le rond) est sur la case **${nomCase(dep)}**. Chaque bloc « aller » le déplace d'une case dans la direction de la flèche. Sur quelle case arrive-t-il ?`, figure: fig, mode: "choix", choix, attendu,
        aides: [`La séquence ${codeTxt(corps)} est répétée $${n}$ fois.`, `Écris le code en entier : ${codeTxt(corps)}, puis encore ${codeTxt(corps)}…`, `En tout : ${codeTxt(code)}.`],
        solution: `Le code complet est ${codeTxt(code)}. Depuis **${nomCase(dep)}** : ${parcours(dep, code)}. Le robot arrive sur **${bonne}**.` };
    }
    if (t === 2) {
      const L = rand(2, 3), corps = []; for (let k = 0; k < L; k++) corps.push(pick(FLECHES));
      if (corps.every((f) => f === corps[0])) return GEN["pi6-repeter"]();
      const n = rand(3, 6), code = [].concat(...Array(n).fill(corps));
      return { enonce: `Un robot doit exécuter le code **${codeTxt(code)}**. Pour l'écrire plus court, on utilise une boucle : répéter $\\ldots$ fois **( ${codeTxt(corps)} )**. Combien de fois faut-il répéter ?`, mode: "nombre", prefixe: "Nombre de répétitions :", attendu: n,
        erreurs: [{ valeur: code.length, message: "Ça, c'est le nombre de flèches. On compte combien de fois le **groupe** de flèches revient." }],
        aides: [`Repère le groupe ${codeTxt(corps)} au début du code.`, "Découpe le code en groupes identiques.", "Compte les groupes."],
        solution: `Le code est formé du groupe ${codeTxt(corps)} écrit $${n}$ fois ($${code.length}$ flèches, soit $${n} \\times ${L}$) : on répète $${n}$ fois.` };
    }
    if (t === 3) {
      const n = pick([3, 4, 5, 6, 8]), Lp = rand(2, 10) * 10, A = 360 / n;
      const corps = [{ c: "mvt", t: `avancer de [${Lp}] pas` }, { c: "mvt", t: `tourner ↻ de [${A}] degrés` }];
      const autres = Object.keys(FORMES).filter((k) => +k !== n).map((k) => FORMES[k]);
      const { choix, attendu } = melange(FORMES[n], shuffle(autres));
      return { enonce: "Le lutin trace un trait quand il avance. Quelle figure ce programme trace-t-il ?", figure: lutinBlocs(corps, n), mode: "choix", choix, attendu,
        aides: ["À chaque passage dans la boucle, le lutin trace un côté, puis tourne.", `Combien de côtés en tout ? Autant que de répétitions : $${n}$.`, `Tous les côtés mesurent $${Lp}$ pas et le lutin tourne toujours du même angle.`],
        solution: `La boucle est répétée $${n}$ fois : le lutin trace $${n}$ côtés de $${Lp}$ pas, en tournant chaque fois de $${A}^\\circ$ (en tout $${n} \\times ${A}^\\circ = 360^\\circ$, un tour complet). C'est ${FORMES[n]}.` };
    }
    if (t === 4) {
      const rect = Math.random() < 0.4;
      if (rect) {
        const a = rand(3, 12) * 10; let b; do b = rand(2, 8) * 10; while (b === a);
        const corps = [{ c: "mvt", t: `avancer de [${a}] pas` }, { c: "mvt", t: "tourner ↻ de [90] degrés" }, { c: "mvt", t: `avancer de [${b}] pas` }, { c: "mvt", t: "tourner ↻ de [90] degrés" }];
        return { enonce: "Le lutin trace un trait quand il avance. Quelle est la longueur totale du tracé, en pas ?", figure: lutinBlocs(corps, 2), mode: "nombre", prefixe: "Longueur :", suffixe: "pas", attendu: 2 * (a + b),
          erreurs: [{ valeur: a + b, message: "Ça, c'est un seul passage dans la boucle. Elle se répète $2$ fois." }, { valeur: a * b, message: "On additionne les longueurs des traits, on ne les multiplie pas." }],
          aides: ["Un passage dans la boucle trace deux traits.", `Un passage : $${a} + ${b} = ${a + b}$ pas.`, "La boucle est répétée $2$ fois."],
          solution: `Chaque passage trace $${a} + ${b} = ${a + b}$ pas ; deux passages : $2 \\times ${a + b} = ${2 * (a + b)}$ pas. Le lutin a tracé un rectangle de $${a}$ pas sur $${b}$ pas.` };
      }
      const A = pick([90, 120, 60, 45, 72]), n = 360 / A, Lp = rand(2, 12) * 10;
      const corps = [{ c: "mvt", t: `avancer de [${Lp}] pas` }, { c: "mvt", t: `tourner ↻ de [${A}] degrés` }];
      return { enonce: "Le lutin trace un trait quand il avance. Quelle est la longueur totale du tracé, en pas ?", figure: lutinBlocs(corps, n), mode: "nombre", prefixe: "Longueur :", suffixe: "pas", attendu: n * Lp,
        erreurs: [{ valeur: Lp, message: `C'est un seul trait. La boucle est répétée $${n}$ fois.` }, { valeur: n + Lp, message: "On ne fait pas une addition : le même trait est tracé plusieurs fois." }],
        aides: ["Seul le bloc « avancer » trace un trait ; « tourner » ne trace rien.", `Chaque passage trace un trait de $${Lp}$ pas.`, `Il y a $${n}$ passages.`],
        solution: `$${n}$ traits de $${Lp}$ pas : $${n} \\times ${Lp} = ${n * Lp}$ pas.` };
    }
    const n = pick([3, 4, 5, 6, 8]), Lp = rand(2, 10) * 10, A = 360 / n;
    return { enonce: `Pour que le lutin trace ${FORMES[n]} de côté $${Lp}$ pas, on répète la séquence « avancer de $${Lp}$ pas ; tourner ↻ de $${A}$ degrés ». Combien de fois faut-il la répéter ?`, mode: "nombre", prefixe: "Nombre de répétitions :", attendu: n,
      erreurs: [{ valeur: A, message: "Ça, c'est l'angle dont tourne le lutin. On cherche le nombre de passages dans la boucle." }],
      aides: ["Chaque passage dans la boucle trace un côté de la figure.", `Combien de côtés a ${FORMES[n].replace(/ (équilatéral|régulier)$/, "")} ?`, `Vérifie : après tous les passages, le lutin a tourné de $360^\\circ$ (un tour complet) : $\\ldots \\times ${A}^\\circ = 360^\\circ$.`],
      solution: `${FORMES[n][0].toUpperCase() + FORMES[n].slice(1)} a $${n}$ côtés : on répète $${n}$ fois. Vérification : $${n} \\times ${A}^\\circ = 360^\\circ$, le lutin revient à son point de départ.` };
  };

  /* Une « erreur connue » ne doit jamais coïncider avec la bonne réponse ; propriétés internes retirées */
  Object.keys(GEN).filter((k) => /^(n6|o6|d6|f6|p6|t6|a6|g6|c6|an6|tg6|sx6|pa6|so6|pi6)-/.test(k)).forEach((k) => {
    const g = GEN[k];
    GEN[k] = (i) => {
      const q = g(i);
      if (q.erreurs) q.erreurs = q.erreurs.filter((e, j, E) => Math.abs(e.valeur - q.attendu) >= (q.tolerance || 1e-9) && E.findIndex((f) => Math.abs(f.valeur - e.valeur) < 1e-9) === j); // une seule erreur par valeur
      return q;
    };
  });

  // Outils partagés avec les fichiers des autres classes (assets/exercices-cinquieme.js…)
  window.PM_EXO.college = { rand, pick, melange, P10, ecrit, ecritNet, nb, nbTexte, enLettres, entier, Dc, vD, tD, addD, subD, mulD, decimal, pgcd, fr, frNet, CONSIGNE_FR, FRAC_APPROX, diviseurs, eurC, tabP, hTex, minTex, que, demiDroite, quadrillage, bandes, droiteFractions, schemaBarres, diagrammeBarres, diagrammeCirculaire, courbeDonnees, geo, surCercle, decalDe, figureTriangle, figureAngle, rapporteur, grilleSym, grilleAire, assemblage, dessinSolide, blocs, grille };
})();
