/*
  Exercices du collège, classe de 3e (programme du cycle 4 de 2020, en vigueur en 3e en 2026-2027, brevet 2027).
  Ce fichier se charge après assets/exercices-college.js et reprend ses outils (window.PM_EXO.college).
  Mêmes règles : chaque générateur fabrique une question avec des nombres tirés au hasard, la réponse
  attendue, trois indices progressifs et la solution rédigée.
  Préfixes : cn3-, dv3-, fc3-, eq3-, ar3-, fn3-, fa3-, pp3-, pr3-, st3-, th3-, ts3-, tg3-, tf3-, ep3-, pg3-.
*/
(function () {
  "use strict";
  const { GEN, FIGURES, shuffle } = window.PM_EXO;
  const { rand, pick, melange, nb, nbTexte, fr, pgcd, CONSIGNE_FR, FRAC_APPROX, geo, schemaBarres, diagrammeBarres, diagrammeCirculaire } = window.PM_EXO.college;
  const approx = (v) => (Number.isInteger(v * 1000) ? [] : FRAC_APPROX(v));
  const arr = (x, k) => Math.round(x * 10 ** k) / 10 ** k;
  const rel = (x) => (x < 0 ? `-${nb(-x)}` : nb(x));
  const relP = (x) => (x < 0 ? `(${rel(x)})` : rel(x));
  const frS = (n, d) => { if (d < 0) { n = -n; d = -d; } const g = pgcd(Math.abs(n), d); n /= g; d /= g; return d === 1 ? rel(n) : `${n < 0 ? "-" : ""}${fr(Math.abs(n), d)}`; };
  const frP = (n, d) => (n < 0 ? `\\left(${frS(n, d)}\\right)` : frS(n, d));
  const frBrut = (n, d) => `${n < 0 ? "-" : ""}${fr(Math.abs(n), d)}`;
  const tireFr = (neg) => { for (;;) { const d = rand(2, 9), n = rand(1, 2 * d) * (neg && Math.random() < 0.5 ? -1 : 1); if (pgcd(Math.abs(n), d) === 1 && Math.abs(n) !== d) return [n, d]; } };
  const red = (n, d) => { if (d < 0) { n = -n; d = -d; } const g = pgcd(Math.abs(n), d) || 1; return [n / g, d / g]; };
  const sci = (m, e) => `${nb(m)} \\times 10^{${e}}`;
  const liste3 = (L, sep) => L.map((x) => `$${x}$`).join(sep || " ; "); // une formule par valeur : la ligne peut se couper sur un téléphone
  const voy3 = (m) => /^([aeiouyàâéèêëîïôöûü]|h(abit|eur|ist|ôpit|uit))/i.test(String(m).replace(/^[$\\{]+/, "x")); // initiale vocalique ou h muet courant
  const de3 = (m) => (voy3(m) ? `d'${m}` : `de ${m}`), du3 = (m) => (voy3(m) ? `de l'${m}` : `du ${m}`), le3 = (m) => (voy3(m) ? `l'${m}` : `le ${m}`);

  /* ---------- Mayotte : prénoms et lieux pour les problèmes ---------- */
  const PRENOMS3 = ["Anli", "Nassim", "Zaïnaba", "Fatima", "Moussa", "Awa", "Ibrahim", "Mariama", "Saïd", "Djamila", "Hamada", "Faïza", "Kamal", "Zalifa", "Ambdi", "Nasra", "Toiyb", "Roukia", "Soilihi", "Ousseni", "Anchya", "Raïssa"];
  const FILLES3 = ["Zaïnaba", "Fatima", "Awa", "Mariama", "Djamila", "Faïza", "Zalifa", "Nasra", "Roukia", "Anchya", "Raïssa"];
  const il3 = (n) => (FILLES3.includes(n) ? "elle" : "il");
  const VILLES3 = ["Mamoudzou", "Dzaoudzi", "Pamandzi", "Combani", "Sada", "Chirongui", "Bandrélé", "Kani-Kéli", "M'tsamboro", "Koungou", "Dembéni", "Labattoir", "Tsingoni", "Ouangani", "Bouéni", "Acoua"];

  /* ---------- Outils de figures de la 3e : SVG compacts, couleurs du thème uniquement ---------- */
  const r3 = (v) => +(+v).toFixed(1);
  const tx3 = (x, y, t, cl, anc) => `<text${cl === "" ? "" : ` class="${cl || "g-plabel"}"`} x="${r3(x)}" y="${r3(y)}"${anc && anc !== "start" ? ` text-anchor="${anc}"` : ""}>${t}</text>`;
  const ln3 = (x1, y1, x2, y2, cl) => `<line${cl === "" ? "" : ` class="${cl || "g-segment"}"`} x1="${r3(x1)}" y1="${r3(y1)}" x2="${r3(x2)}" y2="${r3(y2)}"/>`; // cl "" : sans classe (dans un groupe g-grid)
  const pl3 = (P) => P.map((p) => `${r3(p[0])},${r3(p[1])}`).join(" ");
  const sv3 = (W, H, aria, corps, cl) => `<svg class="graph${cl ? " " + cl : ""}" viewBox="0 0 ${Math.round(W)} ${Math.round(H)}" role="img" aria-label="${String(aria).replace(/"/g, "'")}">${corps}</svg>`;
  const sup3 = (b, e) => `${b}<tspan dy="-5" style="font-size:8.5px">${e}</tspan>`; // puissance, toujours en fin de texte
  const frs3 = (x, y, n, d, cl) => { cl = cl || "g-mesure"; const w = Math.max(String(n).length, String(d).length) * 6.6 + 4; return tx3(x, y - 3, n, cl, "middle") + `<line x1="${r3(x - w / 2)}" y1="${r3(y)}" x2="${r3(x + w / 2)}" y2="${r3(y)}" style="stroke:var(${cl === "g-mesure" ? "--lagon" : "--encre"});stroke-width:1.2"/>` + tx3(x, y + 11, d, cl, "middle"); };
  const d3 = (P, Q) => [P[0] - Q[0], P[1] - Q[1]];
  const u3 = (v) => { const L = Math.hypot(v[0], v[1]) || 1; return [v[0] / L, v[1] / L]; };
  // texte poussé à d px dans la direction n (unitaire), ancré selon cette direction pour ne pas mordre sur le trait
  const lab3 = (x, y, n, d, t, cl) => tx3(x + n[0] * d, y + n[1] * d + (n[1] > 0.45 ? 9 : n[1] < -0.45 ? 0 : 4), t, cl || "g-mesure", n[0] > 0.45 ? "start" : n[0] < -0.45 ? "end" : "middle");
  // étiquette au milieu de [PQ], du côté opposé au point G
  const labSeg3 = (P, Q, G, d, t, cl) => { const M = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2]; let n = u3([P[1] - Q[1], Q[0] - P[0]]); if ((M[0] - G[0]) * n[0] + (M[1] - G[1]) * n[1] < 0) n = [-n[0], -n[1]]; return lab3(M[0], M[1], n, d, t, cl); };
  const arc3 = (S, P, Q, r, cl) => { const u = u3(d3(P, S)), v = u3(d3(Q, S)); return `<path class="${cl || "g-arc"}" d="M${r3(S[0] + u[0] * r)} ${r3(S[1] + u[1] * r)} A${r} ${r} 0 0 ${u[0] * v[1] - u[1] * v[0] > 0 ? 1 : 0} ${r3(S[0] + v[0] * r)} ${r3(S[1] + v[1] * r)}"/>`; };
  const angLab3 = (S, P, Q, t, cl) => { const u = u3(d3(P, S)), v = u3(d3(Q, S)), b = u3([u[0] + v[0], u[1] + v[1]]), th = Math.acos(Math.max(-1, Math.min(1, u[0] * v[0] + u[1] * v[1]))), d = Math.max(24, Math.min(46, 15 / Math.tan(th / 2))); return tx3(S[0] + b[0] * d, S[1] + b[1] * d + 4, t, cl || "g-mesure", "middle"); };
  const droit3 = (S, P, Q, k) => { const u = u3(d3(P, S)), v = u3(d3(Q, S)); k = k || 9; return `<path class="g-code" d="M${r3(S[0] + u[0] * k)} ${r3(S[1] + u[1] * k)} L${r3(S[0] + (u[0] + v[0]) * k)} ${r3(S[1] + (u[1] + v[1]) * k)} L${r3(S[0] + v[0] * k)} ${r3(S[1] + v[1] * k)}"/>`; };
  const code3 = (P, Q, n) => { const M = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2], u = u3(d3(Q, P)); let s = ""; for (let k = 0; k < n; k++) { const c = (k - (n - 1) / 2) * 4, x = M[0] + u[0] * c, y = M[1] + u[1] * c; s += ln3(x - u[1] * 6 + u[0] * 2, y + u[0] * 6 + u[1] * 2, x + u[1] * 6 - u[0] * 2, y - u[0] * 6 - u[1] * 2, "g-code"); } return s; };
  const tk3 = (x, y, t, anc) => `<g class="g-tick">${tx3(x, y, t, "", anc)}</g>`; // petit texte gris (style des graduations)
  const pt3 = (P, nom, G, d) => `<circle class="g-point" cx="${r3(P[0])}" cy="${r3(P[1])}" r="3"/>` + (nom ? lab3(P[0], P[1], u3(d3(P, G)), d || 8, nom, "g-plabel") : "");
  const flc3 = (P, C, Q) => { const u = u3(d3(Q, C)), B = [Q[0] - u[0] * 8, Q[1] - u[1] * 8]; return `<path class="g-droite" style="fill:none" d="M${r3(P[0])} ${r3(P[1])} Q${r3(C[0])} ${r3(C[1])} ${r3(B[0])} ${r3(B[1])}"/><polygon style="fill:var(--encre)" points="${pl3([Q, [B[0] - u[1] * 4, B[1] + u[0] * 4], [B[0] + u[1] * 4, B[1] - u[0] * 4]])}"/>`; }; // flèche courbe
  const fl3 = (P, Q, cl) => { const u = u3(d3(Q, P)), B = [Q[0] - u[0] * 8, Q[1] - u[1] * 8]; return ln3(P[0], P[1], B[0], B[1], cl || "g-segment") + `<polygon style="fill:var(--encre)" points="${pl3([Q, [B[0] - u[1] * 4, B[1] + u[0] * 4], [B[0] + u[1] * 4, B[1] - u[0] * 4]])}"/>`; };
  // cote : trait fin parallèle à [PQ], décalé de off px (signe = côté), avec le texte au milieu
  const cote3 = (P, Q, off, t) => { const n = u3([P[1] - Q[1], Q[0] - P[0]]), A = [P[0] + n[0] * off, P[1] + n[1] * off], B = [Q[0] + n[0] * off, Q[1] + n[1] * off], s = Math.sign(off) || 1; return ln3(A[0], A[1], B[0], B[1], "g-guide") + ln3(A[0] - n[0] * 4, A[1] - n[1] * 4, A[0] + n[0] * 4, A[1] + n[1] * 4, "g-droite") + ln3(B[0] - n[0] * 4, B[1] - n[1] * 4, B[0] + n[0] * 4, B[1] + n[1] * 4, "g-droite") + lab3((A[0] + B[0]) / 2, (A[1] + B[1]) / 2, [n[0] * s, n[1] * s], 6, t); };
  // Triangle : P = 3 sommets (px) ; o.cotes = [[i, texte]] pour le côté [P_i P_(i+1)] ; o.angles = [[i, texte]] ; o.arcs = [[i, n]] ; o.droit = i ; o.codes = [[i, n]]
  function tri3(P, noms, o) {
    o = o || {};
    const G = [(P[0][0] + P[1][0] + P[2][0]) / 3, (P[0][1] + P[1][1] + P[2][1]) / 3], S = (i) => [P[i], P[(i + 1) % 3], P[(i + 2) % 3]];
    let s = `<polygon class="${o.cl || "g-poly"}" points="${pl3(P)}"/>`;
    (o.codes || []).forEach(([i, n]) => { s += code3(P[i], P[(i + 1) % 3], n); });
    if (o.droit != null) s += droit3(...S(o.droit));
    (o.arcs || []).forEach(([i, n]) => { for (let k = 0; k < n; k++) s += arc3(...S(i), 13 + 4 * k); });
    (o.angles || []).forEach(([i, t]) => { s += (o.droit === i ? "" : arc3(...S(i), 15)) + angLab3(...S(i), t); });
    (o.cotes || []).forEach(([i, t]) => { s += labSeg3(P[i], P[(i + 1) % 3], G, 7, t); });
    noms.forEach((n, i) => { s += pt3(P[i], n, G, 8); });
    return s;
  }

  /* =====================================================================
     Chapitre 1 : calcul numérique (cn3-) — fractions, puissances, écriture scientifique
     ===================================================================== */
  // Carré unité : a/b des colonnes et c/d des lignes coloriés (produit de fractions = partie commune)
  function aireFrac3(a, b, c, d, montrer, aria) {
    const x0 = 64, y0 = 30, L = 150, w = L / b, h = L / d;
    let s = `<rect class="g-aire" x="${x0}" y="${y0}" width="${r3(a * w)}" height="${L}"/><rect x="${x0}" y="${y0}" width="${L}" height="${r3(c * h)}" style="fill:var(--ylang);fill-opacity:.32"/><g class="g-grid">`;
    for (let i = 1; i < b; i++) s += ln3(x0 + i * w, y0, x0 + i * w, y0 + L, "");
    for (let j = 1; j < d; j++) s += ln3(x0, y0 + j * h, x0 + L, y0 + j * h, "");
    s += `</g><rect class="g-unite" x="${x0}" y="${y0}" width="${L}" height="${L}"/><rect x="${x0}" y="${y0}" width="${r3(a * w)}" height="${r3(c * h)}" style="fill:none;stroke:var(--encre);stroke-width:2.2"/>`;
    s += `<path class="g-accolade" d="M${x0 + 1} ${y0 - 5} V${y0 - 10} H${r3(x0 + a * w - 1)} V${y0 - 5}"/>` + tx3(x0 + (a * w) / 2, y0 - 14, `${a}/${b}`, "g-mesure", "middle");
    s += `<path class="g-accolade" d="M${x0 - 5} ${y0 + 1} H${x0 - 10} V${r3(y0 + c * h - 1)} H${x0 - 5}"/>` + tx3(x0 - 14, y0 + (c * h) / 2 + 4, `${c}/${d}`, "g-mesure", "end");
    if (montrer) s += tx3(x0 + L + 12, y0 + 60, `${a * c} cases`, "g-plabel") + tx3(x0 + L + 12, y0 + 76, `sur ${b * d}`, "g-plabel");
    return sv3(320, y0 + L + 10, aria || `Carré unité partagé en ${b} colonnes et ${d} lignes : ${a} colonnes et ${c} lignes coloriées`, s);
  }
  // Schéma en barre : n1/d1 de la quantité, puis n2/d2 du reste ; ce qui reste est marqué « ? »
  function barreFrac3(n1, d1, n2, d2, total, aria) {
    const x0 = 14, w = 292, y = 34, h = 30, a = (w * n1) / d1, b = ((w - a) * n2) / d2;
    let s = `<rect class="g-rect" x="${x0}" y="${y}" width="${r3(a)}" height="${h}"/><rect class="g-barre-plus" x="${r3(x0 + a)}" y="${y}" width="${r3(b)}" height="${h}"/><rect class="g-unite" x="${x0}" y="${y}" width="${w}" height="${h}"/>`;
    for (let i = 1; i < d1; i++) if (i !== n1) s += ln3(x0 + (w * i) / d1, y, x0 + (w * i) / d1, y + h, i < n1 ? "g-droite" : "g-guide");
    s += tx3(x0 + a / 2, y + h / 2 + 4, `${n1}/${d1}`, "g-plabel", "middle") + tx3(x0 + a + b / 2, y + h / 2 + 4, `${n2}/${d2}${b > 92 ? " du reste" : ""}`, "g-plabel", "middle") + tx3(x0 + a + b + (w - a - b) / 2, y + h / 2 + 4, "?", "g-plabel", "middle");
    s += `<path class="g-accolade" d="M${x0 + 1} ${y - 5} V${y - 11} H${x0 + w - 1} V${y - 5}"/>` + tx3(x0 + w / 2, y - 15, total, "g-mesure", "middle");
    s += `<path class="g-accolade" d="M${r3(x0 + a + 1)} ${y + h + 5} V${y + h + 11} H${x0 + w - 1} V${y + h + 5}"/>` + tk3(x0 + a + (w - a) / 2, y + h + 25, `le reste après ${n1}/${d1}`, "middle");
    return sv3(320, y + h + 32, aria || `Schéma en barre : ${n1}/${d1} de la quantité, puis ${n2}/${d2} du reste, et ce qui reste marqué d'un point d'interrogation`, s);
  }

  GEN["cn3-fractions"] = function () {
    for (;;) {
      const [a, b] = tireFr(true), [c, d] = tireFr(false), [e, f] = tireFr(false), t = rand(0, 3);
      if (t === 3) { // problème : n1/d1 d'une quantité, puis n2/d2 du reste (schéma en barre)
        const d1 = rand(3, 6), n1 = rand(1, Math.max(1, d1 - 2)), d2 = rand(2, 5), n2 = rand(1, d2 - 1);
        if (pgcd(n1, d1) > 1 || pgcd(n2, d2) > 1) continue;
        const S = d1 * d2 * rand(2, 12), nom = pick(PRENOMS3), Il = il3(nom) === "elle" ? "Elle" : "Il", q = rand(0, 1);
        const C = pick([
          [`${nom} a $${S}$ €. ${Il} dépense $${fr(n1, d1)}$ de cette somme au marché de Mamoudzou, puis $${fr(n2, d2)}$ de ce qui reste pour des allers-retours en barge.`, "€", "Quelle fraction de la somme de départ lui reste-t-il ?", "Combien d'euros lui reste-t-il ?", `${S} €`],
          [`Un champ de $${S}$ m² à ${pick(VILLES3)} : $${fr(n1, d1)}$ du champ est planté en manioc, puis $${fr(n2, d2)}$ du reste en bananiers ; tout le reste est planté en ylang-ylang.`, "m²", "Quelle fraction du champ est plantée en ylang-ylang ?", "Quelle surface (en m²) est plantée en ylang-ylang ?", `${S} m²`],
          [`Pour un trajet de $${S}$ km, ${nom} fait $${fr(n1, d1)}$ du parcours en taxi-brousse, puis $${fr(n2, d2)}$ du reste en pirogue ; ${il3(nom)} finit à pied.`, "km", `Quelle fraction du trajet ${nom} fait-${il3(nom)} à pied ?`, `Combien de kilomètres ${nom} fait-${il3(nom)} à pied ?`, `${S} km`],
          [`Une classe de 3e de ${pick(VILLES3)} récolte $${S}$ € pour un voyage. Elle paie $${fr(n1, d1)}$ de la somme pour le bus, puis $${fr(n2, d2)}$ de ce qui reste pour la visite de l'îlot Mbouzi.`, "€", "Quelle fraction de la somme récoltée reste-t-il ?", "Combien d'euros reste-t-il ?", `${S} €`]
        ]);
        const [rn, rd] = red((d1 - n1) * (d2 - n2), d1 * d2), R = rn / rd, f1 = 1 - n1 / d1 - n2 / d2;
        const etapes = `Après la première étape, il reste $1 - ${fr(n1, d1)} = ${frS(d1 - n1, d1)}$. On en utilise $${fr(n2, d2)}$, il en reste donc $${fr(d2 - n2, d2)}$ : $${fr(d2 - n2, d2)} \\times ${frS(d1 - n1, d1)} = ${frS(rn, rd)}$`;
        if (q === 0) return { enonce: `${C[0]} ${C[2]}${CONSIGNE_FR}`, figure: barreFrac3(n1, d1, n2, d2, C[4]), mode: "nombre", prefixe: "Fraction :", attendu: R,
          erreurs: [...(f1 > 0 ? [{ valeur: f1, message: `« ${n2}/${d2} du reste » : on prend $${fr(n2, d2)}$ de ce qui reste, pas de la quantité de départ.` }] : []), { valeur: 1 - R, message: "Ça, c'est la part déjà utilisée ; on demande ce qui reste." }, ...approx(R)],
          aides: [`Après la première étape, il reste $1 - ${fr(n1, d1)} = ${frS(d1 - n1, d1)}$ de la quantité.`, `Sur ce reste, on utilise $${fr(n2, d2)}$ : il en reste les $${fr(d2 - n2, d2)}$.`, `Calcule $${fr(d2 - n2, d2)} \\times ${frS(d1 - n1, d1)}$.`],
          solution: `${etapes} de la quantité de départ.` };
        return { enonce: `${C[0]} ${C[3]}`, figure: barreFrac3(n1, d1, n2, d2, C[4]), mode: "nombre", suffixe: C[1], attendu: S * R,
          erreurs: [...(f1 > 0 ? [{ valeur: S * f1, message: `« ${n2}/${d2} du reste » : on prend $${fr(n2, d2)}$ de ce qui reste, pas de la quantité de départ.` }] : []), { valeur: S * (1 - R), message: "Ça, c'est ce qui a été utilisé ; on demande ce qui reste." }],
          aides: [`Première étape : $${fr(n1, d1)} \\times ${S} = ${(S * n1) / d1}$ ; il reste $${S - (S * n1) / d1}$.`, `Deuxième étape : $${fr(n2, d2)} \\times ${S - (S * n1) / d1} = ${((S - (S * n1) / d1) * n2) / d2}$.`, "Retire cette quantité à ce qui restait."],
          solution: `Il reste $${S} - ${(S * n1) / d1} = ${S - (S * n1) / d1}$ après la première étape, puis $${S - (S * n1) / d1} - ${((S - (S * n1) / d1) * n2) / d2} = ${S * R}$ ${C[1]}. (${etapes} et $${frS(rn, rd)} \\times ${S} = ${S * R}$.)` };
      }
      let N, D, tex, faux, msg, faux2, msg2, etapes;
      if (t === 0) { // a/b + c/d × e/f
        const [pn, pd] = red(c * e, d * f); [N, D] = red(a * pd + pn * b, b * pd);
        tex = `${frBrut(a, b)} + ${fr(c, d)} \\times ${fr(e, f)}`; faux = ((a * d + c * b) / (b * d)) * (e / f); faux2 = (a + pn) / (b + pd);
        msg = "Respecte les priorités : la multiplication passe avant l'addition."; msg2 = "Pour additionner deux fractions, on les met au même dénominateur : on n'additionne pas les dénominateurs.";
        etapes = [`Priorité à la multiplication : $${fr(c, d)} \\times ${fr(e, f)} = ${frS(c * e, d * f)}$.`, `Puis $${frBrut(a, b)} + ${frS(pn, pd)}$ : réduis au même dénominateur.`];
      } else if (t === 1) { // (a/b − c/d) ÷ e/f
        const [sn, sd] = red(a * d - c * b, b * d); [N, D] = red(sn * f, sd * e);
        tex = `\\left(${frBrut(a, b)} - ${fr(c, d)}\\right) \\div ${fr(e, f)}`; faux = ((a * d - c * b) / (b * d)) * (e / f); faux2 = a / b - (c * f) / (d * e);
        msg = `Diviser par $${fr(e, f)}$, c'est multiplier par son inverse $${frS(f, e)}$, pas par $${fr(e, f)}$.`; msg2 = "Les parenthèses sont prioritaires : calcule d'abord la différence.";
        etapes = [`D'abord la parenthèse : $${frBrut(a, b)} - ${fr(c, d)} = ${frS(sn, sd)}$.`, `Diviser par $${fr(e, f)}$, c'est multiplier par $${frS(f, e)}$.`];
      } else { // a/b − c/d ÷ e/f
        const [qn, qd] = red(c * f, d * e); [N, D] = red(a * qd - qn * b, b * qd);
        tex = `${frBrut(a, b)} - ${fr(c, d)} \\div ${fr(e, f)}`; faux = ((a * d - c * b) / (b * d)) / (e / f); faux2 = a / b - (c * e) / (d * f);
        msg = "Respecte les priorités : la division passe avant la soustraction."; msg2 = `Diviser par $${fr(e, f)}$, c'est multiplier par son inverse $${frS(f, e)}$.`;
        etapes = [`Priorité à la division : $${fr(c, d)} \\div ${fr(e, f)} = ${fr(c, d)} \\times ${frS(f, e)} = ${frS(c * f, d * e)}$.`, `Puis $${frBrut(a, b)} - ${frP(qn, qd)}$ : réduis au même dénominateur.`];
      }
      if (D > 60 || Math.abs(N) > 150) continue;
      const v = N / D;
      return { enonce: `Calcule $A = ${tex}$.${CONSIGNE_FR}`, mode: "nombre", prefixe: "$A =$", attendu: v,
        erreurs: [{ valeur: faux, message: msg }, { valeur: faux2, message: msg2 }, ...approx(v)],
        aides: ["Repère d'abord l'opération prioritaire.", ...etapes],
        solution: `${etapes.join(" ")} On obtient $A = ${frS(N, D)}$.` };
    }
  };

  // Cube (ou carré) en perspective, arête marquée par une puissance
  function cube3(base, k, unite, carre) {
    const x = 92, y = 58, c = 96, dx = carre ? 0 : 40, dy = carre ? 0 : 30, lab = sup3(base, k) + (unite ? `<tspan dy="5"> ${unite}</tspan>` : "");
    let s = `<rect class="g-rect" x="${x}" y="${y}" width="${c}" height="${c}"/>`;
    if (!carre) s += `<polygon class="g-poly" points="${pl3([[x, y], [x + dx, y - dy], [x + c + dx, y - dy], [x + c, y]])}"/><polygon class="g-poly" points="${pl3([[x + c, y], [x + c + dx, y - dy], [x + c + dx, y + c - dy], [x + c, y + c]])}"/>` + ln3(x + dx, y - dy, x + dx, y + c - dy, "g-cache") + ln3(x + dx, y + c - dy, x + c + dx, y + c - dy, "g-cache") + ln3(x, y + c, x + dx, y + c - dy, "g-cache");
    s += tx3(x + c / 2, y + c + 17, lab, "g-mesure", "middle") + tx3(x - 8, y + c / 2 + 4, lab, "g-mesure", "end");
    return sv3(320, y + c + 26, `${carre ? "Carré" : "Cube"} dont le côté mesure ${base} puissance ${k}${unite ? " " + unite : ""}`, s);
  }

  GEN["cn3-puissances"] = function () {
    const a = pick([2, 3, 5, 7, 10, 6]), t = rand(0, 4);
    if (t === 4) { // aire d'un carré ou volume d'un cube dont le côté est une puissance
      const carre = Math.random() < 0.45, b = pick([2, 3, 5, 10]), k = b === 10 ? nz(1, 6, true) : rand(2, 6), u = b === 10 ? pick(["m", "cm", "mm"]) : "cm", p = carre ? 2 : 3, e = k * p;
      return { enonce: `${carre ? "Un carré" : "Un cube"} a des côtés de longueur $${b}^{${k}}$ ${u}. Écris ${carre ? "son aire" : "son volume"} sous la forme $${b}^{n}$ ${u}${carre ? "²" : "³"}. Quel est l'exposant $n$ ?`, figure: cube3(b, k, u, carre), mode: "nombre", prefixe: "$n =$", attendu: e,
        erreurs: [{ valeur: k + p, message: `$\\left(${b}^{${k}}\\right)^{${p}} = ${b}^{${k}} \\times ${b}^{${k}}${carre ? "" : ` \\times ${b}^{${k}}`}$ : on multiplie les exposants, on ne les additionne pas.` }, { valeur: k, message: `${carre ? "L'aire" : "Le volume"} n'est pas égal${carre ? "e" : ""} au côté : il faut l'élever ${carre ? "au carré" : "au cube"}.` }],
        aides: [carre ? "Aire d'un carré : côté $\\times$ côté $= c^2$." : "Volume d'un cube : arête $\\times$ arête $\\times$ arête $= c^3$.", `Ici $${carre ? "\\mathcal{A}" : "V"} = \\left(${b}^{${k}}\\right)^{${p}}$.`, `$\\left(a^{m}\\right)^{n} = a^{m \\times n}$ : calcule $${relP(k)} \\times ${p}$.`],
        solution: `$${carre ? "\\mathcal{A}" : "V"} = \\left(${b}^{${k}}\\right)^{${p}} = ${b}^{${k} \\times ${p}} = ${b}^{${e}}$ ${u}${carre ? "²" : "³"}, donc $n = ${e}$.` };
    }
    let m = rand(-5, 8), n = rand(-5, 8), p = rand(-4, 6), e, tex, faux, faux2, msg2, regle;
    if (t === 0) { e = m + n; tex = `${a}^{${m}} \\times ${a}^{${n}}`; faux = m * n; regle = `$${a}^{m} \\times ${a}^{n} = ${a}^{m + n}$ : on additionne les exposants.`; if (m < 0 || n < 0) { faux2 = Math.abs(m) + Math.abs(n); msg2 = "Attention au signe : ajouter un exposant négatif, c'est soustraire."; } }
    else if (t === 1) { e = m - n; tex = `\\dfrac{${a}^{${m}}}{${a}^{${n}}}`; faux = m + n; faux2 = n - m; msg2 = "C'est l'exposant du numérateur moins celui du dénominateur, dans cet ordre."; regle = `$\\dfrac{${a}^{m}}{${a}^{n}} = ${a}^{m - n}$ : on soustrait les exposants.`; }
    else if (t === 2) { m = rand(-4, 5); n = rand(2, 4) * pick([1, -1]); e = m * n; tex = `\\left(${a}^{${m}}\\right)^{${n}}`; faux = m + n; if (m > 1 && n > 0 && m ** n <= 99) { faux2 = m ** n; msg2 = `On ne calcule pas $${m}^{${n}}$ : l'exposant est $${m} \\times ${n}$.`; } regle = `$\\left(${a}^{m}\\right)^{n} = ${a}^{m \\times n}$ : on multiplie les exposants.`; }
    else { e = m + n - p; tex = `\\dfrac{${a}^{${m}} \\times ${a}^{${n}}}{${a}^{${p}}}`; faux = m + n + p; faux2 = m * n - p; msg2 = "Pour le produit du numérateur, on additionne les exposants (on ne les multiplie pas)."; regle = "Additionne les exposants du numérateur, puis soustrais celui du dénominateur."; }
    if (e === faux || (m === 0 || n === 0)) return GEN["cn3-puissances"]();
    return { enonce: `Écris $B = ${tex}$ sous la forme d'une seule puissance de $${a}$. Quel est l'exposant ?`, mode: "nombre", prefixe: `$B = ${a}^{\\ldots}$ avec l'exposant :`, attendu: e,
      erreurs: [{ valeur: faux, message: "Revois la règle : produit → on additionne, quotient → on soustrait, puissance de puissance → on multiplie." }, ...(faux2 != null && faux2 !== faux ? [{ valeur: faux2, message: msg2 }] : [])],
      aides: ["Les règles ne s'appliquent qu'avec la même base.", regle, "Attention aux exposants négatifs : $a - (-b) = a + b$."],
      solution: `${regle} $B = ${a}^{${e}}$.` };
  };

  // Échelle des puissances de 10 (en mètres), de 10^-9 à 10^9, avec les préfixes ; objets = [[nom, log10 de la taille]], marque = exposant du point « ? »
  function echelle3(objets, marque, aria) {
    const X = (e) => 20 + (e + 9) * (280 / 18), y = 64;
    let s = `<g class="g-axis"><line x1="14" y1="${y}" x2="306" y2="${y}"/><path d="M312 ${y} l-8 -4 v8z"/></g><g class="g-tick">`;
    for (let e = -9; e <= 9; e++) s += ln3(X(e), y - (e % 3 ? 3 : 6), X(e), y + (e % 3 ? 3 : 6), "g-graduation") + (e % 3 ? "" : tx3(X(e), y + 19, e ? sup3("10", String(e).replace("-", "−")) : "1", "", "middle"));
    ["nano", "micro", "milli", "", "kilo", "méga", "giga"].forEach((p, i) => { if (p) s += tx3(X(i * 3 - 9), y + 32, p, "", "middle"); });
    s += tx3(314, y - 8, "m", "", "end") + `</g>`;
    (objets || []).forEach(([nom, e], i) => { const h = i % 2 ? 24 : 42; s += ln3(X(e), y - 4, X(e), y - h + 4, "g-guide") + `<circle class="g-point" cx="${r3(X(e))}" cy="${y}" r="3.5"/>` + tx3(X(e), y - h, nom, "g-plabel", "middle"); });
    if (marque != null) s += `<circle class="g-point" cx="${r3(X(marque))}" cy="${y}" r="4.5"/>` + tx3(X(marque), y - 12, "?", "g-mesure", "middle");
    return sv3(320, y + 40, aria || "Échelle des puissances de 10, de 10 puissance -9 à 10 puissance 9 mètres, avec les préfixes nano, micro, milli, kilo, méga, giga", s);
  }
  const OBJETS3 = [[-7, "la taille d'un virus"], [-6, "la taille d'une bactérie"], [-5, "le diamètre d'un globule rouge"], [-4, "l'épaisseur d'un cheveu"], [-3, "la taille d'un grain de sable"], [-2, "le diamètre d'une pièce de monnaie"], [-1, "la longueur d'une main"], [0, "la taille d'un élève de 3e"], [1, "la hauteur d'un baobab"], [2, "la longueur d'un terrain de football"], [3, "la longueur de la piste de l'aéroport de Pamandzi"], [5, "la distance de Mayotte à Anjouan"], [6, "la longueur de Madagascar"], [7, "le diamètre de la Terre"]];

  GEN["cn3-scientifique"] = function () {
    const t = rand(0, 4);
    if (t === 3) { // lire un ordre de grandeur sur l'échelle des puissances de 10
      const [k, nom] = pick(OBJETS3), p = (e) => `$10^{${e}}$ m`;
      const { choix, attendu } = melange(p(k), [p(k + 1), p(k - 1), k ? p(-k) : p(k + 2)]);
      return { enonce: `Sur l'échelle ci-dessous, chaque graduation correspond à une puissance de $10$ (en mètres). Le point marqué « ? » repère ${nom}. Quel est cet ordre de grandeur ?`, figure: echelle3(null, k), mode: "choix", choix, attendu,
        aides: ["Les graduations numérotées vont de $3$ en $3$ : $10^{-9}$, $10^{-6}$, $10^{-3}$, $1$, $10^{3}$…", "Entre deux graduations voisines, on multiplie par $10$.", "Compte les graduations à partir de la valeur numérotée la plus proche."],
        solution: `Le point est sur la graduation $10^{${k}}$ : ${nom} est de l'ordre de $10^{${k}}$ m.` };
    }
    if (t === 4) { // comparer des nombres en écriture scientifique
      const grand = Math.random() < 0.5, base = rand(-6, 7), L = [];
      while (L.length < 4) { const m = rand(11, 99) / 10, e = base + rand(-1, 1), v = m * 10 ** e; if (!L.some((z) => Math.abs(z[2] / v - 1) < 0.05)) L.push([m, e, v]); }
      const best = L.reduce((p, q) => (grand ? (q[2] > p[2] ? q : p) : q[2] < p[2] ? q : p));
      const { choix, attendu } = melange(`$${sci(best[0], best[1])}$`, L.filter((z) => z !== best).map(([m, e]) => `$${sci(m, e)}$`));
      return { enonce: `Quel est le plus ${grand ? "grand" : "petit"} de ces quatre nombres ?`, mode: "choix", choix, attendu,
        aides: ["Les nombres sont en écriture scientifique : le nombre devant la puissance de $10$ est entre $1$ et $10$.", `On compare d'abord les exposants : le plus ${grand ? "grand" : "petit"} exposant donne le plus ${grand ? "grand" : "petit"} nombre.`, "À exposant égal, on compare les nombres devant la puissance de $10$."],
        solution: `On compare les exposants, puis, à exposant égal, les nombres devant : le plus ${grand ? "grand" : "petit"} est $${sci(best[0], best[1])}$.` };
    }
    let m1 = rand(11, 99) / 10, e1 = rand(-8, 9), m2 = rand(11, 99) / 10, e2 = rand(-8, 9), M, E, enonce, sol;
    if (t === 0) { // nombre décimal → écriture scientifique
      const k = pick([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7]), mant = rand(101, 999) / 100, v = mant * 10 ** k;
      const ecr = k >= 0 ? nb(arr(v, 2)) : nb(+v.toFixed(2 - k));
      M = mant; E = k; enonce = `Quelle est l'écriture scientifique de $${ecr}$ ?`; sol = `On place la virgule après le premier chiffre non nul : $${ecr} = ${sci(M, E)}$.`;
    } else if (t === 1) { // produit
      const P = m1 * m2; E = e1 + e2; M = P; if (P >= 10) { M = P / 10; E += 1; } M = arr(M, 4);
      enonce = `Donne l'écriture scientifique de $C = ${sci(m1, e1)} \\times ${sci(m2, e2)}$.`;
      sol = `$C = (${nb(m1)} \\times ${nb(m2)}) \\times 10^{${e1} + ${e2 < 0 ? `(${e2})` : e2}} = ${nb(arr(P, 4))} \\times 10^{${e1 + e2}}$${P >= 10 ? ` $= ${sci(M, E)}$` : ""}.`;
    } else { // quotient avec résultat décimal exact
      m2 = pick([2, 4, 5, 2.5, 1.6, 1.25]); M = rand(11, 99) / 10; const P = arr(M * m2, 4), dec = P >= 10 ? 1 : 0; m1 = dec ? arr(P / 10, 4) : P; E = e1 - e2 - dec; const Q = arr(m1 / m2, 4);
      enonce = `Donne l'écriture scientifique de $D = \\dfrac{${sci(m1, e1)}}{${sci(m2, e2)}}$.`;
      sol = `$D = \\dfrac{${nb(m1)}}{${nb(m2)}} \\times 10^{${e1} - ${e2 < 0 ? `(${e2})` : e2}} = ${nb(arr(Q, 4))} \\times 10^{${e1 - e2}}$${dec ? ` $= ${sci(M, E)}$` : ""}.`;
    }
    if (M < 1 || M >= 10 || !Number.isInteger(arr(M * 10000, 0))) return GEN["cn3-scientifique"]();
    const bonne = `$${sci(M, E)}$`, faux = [`$${sci(M, E + 1)}$`, `$${sci(M, E - 1)}$`, `$${nb(arr(M * 10, 4))} \\times 10^{${E - 1}}$`, `$${sci(M, -E)}$`].filter((z, i, A) => z !== bonne && A.indexOf(z) === i).slice(0, 3);
    const { choix, attendu } = melange(bonne, faux);
    return { enonce, mode: "choix", choix, attendu,
      aides: ["Écriture scientifique : $a \\times 10^{n}$ avec $1 \\leqslant a < 10$ (un seul chiffre non nul avant la virgule).", "$10^{m} \\times 10^{n} = 10^{m + n}$ et $\\dfrac{10^{m}}{10^{n}} = 10^{m - n}$.", "Si le nombre devant la puissance de $10$ n'est pas entre $1$ et $10$, ajuste l'exposant."],
      solution: sol };
  };

  // Produit de puissances par la définition : m facteurs, puis n facteurs égaux à b
  function facteurs3(b, m, n) {
    const w = 26, g = 4, x0 = 160 - ((m + n) * (w + g) + 14) / 2, y = 36;
    let s = "", x = x0;
    const groupe = (k, lab) => { const xs = x; for (let i = 0; i < k; i++) { s += `<rect class="g-rect" x="${r3(x)}" y="${y}" width="${w}" height="${w}" rx="4"/>` + tx3(x + w / 2, y + w / 2 + 4, b, "g-plabel", "middle"); x += w + g; } s += `<path class="g-accolade" d="M${r3(xs + 1)} ${y - 5} V${y - 11} H${r3(x - g - 1)} V${y - 5}"/>` + tx3((xs + x - g) / 2, y - 15, lab, "g-mesure", "middle"); };
    groupe(m, sup3(b, m)); s += tx3(x + 3, y + w / 2 + 5, "×", "g-plabel", "middle"); x += 14; groupe(n, sup3(b, n));
    s += `<path class="g-accolade" d="M${r3(x0 + 1)} ${y + w + 6} V${y + w + 12} H${r3(x - g - 1)} V${y + w + 6}"/>` + tx3((x0 + x - g) / 2, y + w + 28, `${m + n} facteurs égaux à ${b} : ` + sup3(b, m + n), "g-plabel", "middle");
    return sv3(320, y + w + 38, `Le produit de ${b} puissance ${m} par ${b} puissance ${n} : ${m} facteurs, puis ${n} facteurs, soit ${m + n} facteurs égaux à ${b}`, s);
  }
  FIGURES["cn3-cours-produit"] = () => aireFrac3(3, 4, 2, 3, true, "Carré unité : 3/4 des colonnes et 2/3 des lignes coloriés ; la partie commune encadrée fait 6 cases sur 12");
  FIGURES["cn3-cours-puissances"] = () => facteurs3(2, 5, 3);
  FIGURES["cn3-cours-echelle"] = () => echelle3([["virus", -7], ["bactérie", -5.7], ["fourmi", -2.3], ["élève", 0.2], ["Mont Choungui", 2.77], ["Mayotte", 4.6], ["Terre", 7.1]], null, "Échelle des puissances de 10 en mètres, de 10 puissance -9 à 10 puissance 9, avec les préfixes et quelques objets : virus, bactérie, fourmi, élève, Mont Choungui, île de Mayotte, Terre");
  FIGURES["cn3-qcm-produit"] = () => aireFrac3(2, 5, 3, 4, false);
  FIGURES["cn3-qcm-echelle"] = () => echelle3(null, -6);
  FIGURES["cn3-qcm-cube"] = () => cube3(2, 3, "cm");

  // Une bactérie se divise en deux toutes les « per » minutes : 1, 2, 4 puis 8 bactéries
  function doublement3(per) {
    const X = (k) => 30 + k * 84; let s = "";
    for (let k = 0; k <= 3; k++) {
      const n = 2 ** k, h = 150 / n;
      for (let i = 0; i < n; i++) {
        const y = 22 + h * (i + 0.5);
        s += `<circle cx="${X(k)}" cy="${r3(y)}" r="${k === 3 ? 5 : 7}" style="fill:var(--bon);fill-opacity:.5;stroke:var(--encre);stroke-width:1"/>`;
        if (k < 3) s += ln3(X(k) + 8, y, X(k + 1) - 8, 22 + (h / 2) * (2 * i + 0.5), "g-guide") + ln3(X(k) + 8, y, X(k + 1) - 8, 22 + (h / 2) * (2 * i + 1.5), "g-guide");
      }
      s += tk3(X(k), 190, k ? `${k * per} min` : "départ", "middle");
    }
    return sv3(320, 198, `Une bactérie se divise en deux toutes les ${per} minutes : 1 bactérie au départ, puis 2, 4 et 8`, s + tx3(308, 102, "…", "g-plabel", "middle"));
  }

  GEN["cn3-problemes"] = function () {
    const t = rand(0, 4);
    if (t === 0) { // combien de fois plus grand
      // [nombre 1, nombre 2, unité, exposants plausibles pour 1, pour 2]
      const A = pick([["Le nombre de grains de sable de la plage de N'Gouja", "celui d'un seau de sable", "grains", [10, 13], [6, 8]], ["La masse d'eau du lagon de Mayotte", "celle de l'eau d'une piscine", "kg", [12, 13], [5, 6]], ["Le nombre de feuilles des arbres d'une forêt de Mayotte", "celui d'un manguier", "feuilles", [8, 10], [4, 5]], ["Le nombre de gouttes d'une grosse averse sur Mamoudzou", "celui d'une bouteille d'eau", "gouttes", [9, 11], [4, 4]], ["La masse de la Terre", "celle d'un gros astéroïde", "kg", [24, 24], [17, 20]], ["Le nombre de grains de riz vendus en un an au marché de Mamoudzou", "celui d'un sac de riz", "grains", [9, 10], [5, 6]]]);
      const e1 = rand(...A[3]), e2 = Math.max(A[4][0], Math.min(A[4][1], e1 - rand(1, 7), e1 - 1)), k = pick([1, 1, 2, 3, 4, 5]); let m2; do m2 = rand(11, 50) / 10; while (m2 * k >= 10);
      if (e1 - e2 < 1 || e1 - e2 > 7) return GEN["cn3-problemes"]();
      const m1 = arr(m2 * k, 2), R = k * 10 ** (e1 - e2);
      return { enonce: `${A[0]} est d'environ $${sci(m1, e1)}$ ${A[2]} et ${A[1]} d'environ $${sci(m2, e2)}$ ${A[2]}. Combien de fois plus grand est le premier nombre ?`, mode: "nombre", prefixe: "Environ", suffixe: "fois", attendu: R,
        erreurs: [{ valeur: e1 - e2, message: "On cherche le quotient des deux nombres, pas la différence des exposants." }, ...(k > 1 ? [{ valeur: 10 ** (e1 - e2), message: `Divise aussi $${nb(m1)}$ par $${nb(m2)}$.` }] : [])],
        aides: ["« Combien de fois plus » : on divise.", `$\\dfrac{${sci(m1, e1)}}{${sci(m2, e2)}} = \\dfrac{${nb(m1)}}{${nb(m2)}} \\times 10^{${e1} - ${e2}}$.`, `$\\dfrac{${nb(m1)}}{${nb(m2)}} = ${k}$ ; écris le résultat en écriture décimale.`],
        solution: `$\\dfrac{${sci(m1, e1)}}{${sci(m2, e2)}} = ${k > 1 ? `${k} \\times ` : ""}10^{${e1 - e2}} = ${nb(R)}$.` };
    }
    if (t === 4) { // bactéries : doublements successifs
      const per = pick([10, 12, 15, 20, 30]), q = rand(0, 1), hs = [1, 2, 3, 4].filter((h) => { const n = (60 * h) / per; return n >= 4 && (q ? n <= 18 : n <= 12); });
      if (!hs.length) return GEN["cn3-problemes"]();
      const h = pick(hs), n = (60 * h) / per, lieu = pick(["dans une goutte d'eau du lagon", "dans un jus de mangue oublié au soleil", "sur une tranche de papaye", "dans un bol de riz laissé à l'air libre", "dans une bouteille de lait mal fermée"]);
      const ctx = `Une bactérie ${lieu} se divise en deux toutes les $${per}$ minutes. Au départ, il y a une seule bactérie.`;
      if (q === 0) return { enonce: `${ctx} Combien de bactéries y a-t-il au bout de $${h}$ heure${h > 1 ? "s" : ""} ?`, figure: doublement3(per), mode: "nombre", prefixe: "Bactéries :", attendu: 2 ** n,
        erreurs: [{ valeur: 2 * n, message: "À chaque division, le nombre de bactéries est multiplié par $2$ : on ne lui ajoute pas $2$." }, { valeur: n, message: "Ça, c'est le nombre de divisions ; le nombre de bactéries double à chacune." }, { valeur: 2 ** (n - 1), message: "Compte bien : après $1$ division il y a $2$ bactéries, après $2$ divisions $2^2 = 4$…" }],
        aides: [`En $${h}$ h, soit $${60 * h}$ min, il y a $${60 * h} \\div ${per} = ${n}$ divisions.`, "À chaque division, le nombre de bactéries est multiplié par $2$.", `Après $${n}$ divisions : $2^{${n}}$ bactéries.`],
        solution: `$${60 * h} \\div ${per} = ${n}$ divisions, donc $2^{${n}} = ${nb(2 ** n)}$ bactéries.` };
      return { enonce: `${ctx} Au bout de $${h}$ heure${h > 1 ? "s" : ""}, le nombre de bactéries s'écrit $2^{n}$. Quel est l'exposant $n$ ?`, figure: doublement3(per), mode: "nombre", prefixe: "$n =$", attendu: n,
        erreurs: [{ valeur: h, message: "Ça, c'est la durée en heures : compte le nombre de divisions." }, { valeur: 2 * n, message: `Chaque division multiplie par $2$ : après $${n}$ divisions, c'est $2^{${n}}$.` }],
        aides: [`Convertis la durée en minutes : $${h}$ h $= ${60 * h}$ min.`, `Nombre de divisions : $${60 * h} \\div ${per}$.`, "Chaque division multiplie le nombre de bactéries par $2$."],
        solution: `$${60 * h} \\div ${per} = ${n}$ divisions : il y a $2^{${n}}$ bactéries, donc $n = ${n}$.` };
    }
    if (t === 1) { // distance parcourue par la lumière
      const mn = Math.random() < 0.4, s = mn ? rand(2, 20) : rand(2, 90) * 10, sec = mn ? s * 60 : s, d = 3e5 * sec;
      return { enonce: `La lumière parcourt environ $3 \\times 10^{5}$ km par seconde. Quelle distance parcourt-elle en $${nb(s)}$ ${mn ? "minutes" : "secondes"} ? Donne la réponse en km, en écriture décimale.`, mode: "nombre", prefixe: "Distance :", suffixe: "km", attendu: d,
        erreurs: [{ valeur: 3e5 + sec, message: "Il faut multiplier la vitesse par la durée." }, ...(mn ? [{ valeur: 3e5 * s, message: "Convertis d'abord la durée en secondes : $1$ min $= 60$ s." }] : [])],
        aides: ["distance $=$ vitesse $\\times$ durée, avec la durée en secondes.", mn ? `$${s}$ min $= ${s} \\times 60 = ${sec}$ s.` : `$3 \\times 10^{5} \\times ${nb(s)}$.`, "$3 \\times 10^{5} = 300\\,000$."],
        solution: `$3 \\times 10^{5} \\times ${nb(sec)} = ${nb(d)}$ km, soit $${sci(arr(d / 10 ** Math.floor(Math.log10(d)), 4), Math.floor(Math.log10(d)))}$ km.` };
    }
    if (t === 2) { // stockage numérique
      const go = pick([8, 16, 32, 64, 128, 256]), [quoi, une, mo] = pick([["photos", "Une photo occupe", pick([1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8, 9])], ["morceaux de musique", "Un morceau de musique occupe", rand(3, 12)], ["vidéos", "Une vidéo occupe", pick([150, 200, 250, 300, 350, 400, 450, 600, 700, 800, 900])]]);
      const sup = pick(["Une clé USB", `La mémoire du téléphone de ${pick(PRENOMS3)}`, "Une carte mémoire"]), N = Math.floor(arr((go * 1000) / mo, 6)), exact = Number.isInteger(arr((go * 1000) / mo, 6));
      return { enonce: `${sup} a une capacité de $${go}$ Go ($1$ Go $= 10^{9}$ octets). ${une} $${nb(mo)}$ Mo ($1$ Mo $= 10^{6}$ octets). Combien de ${quoi} entiers peut-on stocker au maximum ?`.replace("entiers", quoi === "photos" || quoi === "vidéos" ? "entières" : "entiers"), mode: "nombre", prefixe: `${quoi[0].toUpperCase() + quoi.slice(1)} :`, attendu: N,
        erreurs: [...(exact ? [] : [{ valeur: arr((go * 1000) / mo, 2), message: "Le nombre doit être entier : on garde la partie entière." }]), { valeur: Math.floor(go / mo), message: "Convertis d'abord dans la même unité : $1$ Go $= 1\\,000$ Mo." }, { valeur: arr(go * 1000 * mo, 2), message: "On divise la capacité par la taille d'un fichier (on ne multiplie pas)." }],
        aides: [`$\\dfrac{10^{9}}{10^{6}} = 10^{3}$ : $1$ Go $= 1\\,000$ Mo.`, `La mémoire contient $${go} \\times 1\\,000 = ${nb(go * 1000)}$ Mo.`, `Divise par $${nb(mo)}$ et garde la partie entière.`],
        solution: `$${nb(go * 1000)} \\div ${nb(mo)} ${exact ? `= ${nb(N)}` : `\\approx ${nb(arr((go * 1000) / mo, 2))}`}$ : on peut stocker $${nb(N)}$ ${quoi}.` };
    }
    // [début de phrase, fin, objets alignés, exposant plausible, nombres possibles devant]
    const [o0, o1, o2, e, ms] = pick([["Un globule rouge mesure environ", "m de diamètre", "globules rouges mis bout à bout", -6, [6, 7, 8]], ["Une bactérie mesure environ", "m de long", "bactéries mises bout à bout", -6, [1, 2, 3, 4, 5]], ["Un grain de pollen mesure environ", "m", "grains de pollen alignés", -5, [2, 3, 4, 5, 6, 8]], ["Un virus mesure environ", "m", "virus alignés", -8, [2, 3, 4, 5, 6, 8, 9]], ["Un cheveu a une épaisseur d'environ", "m", "cheveux posés côte à côte", -5, [5, 6, 7, 8, 9]], ["Un grain de sable de la plage de Sakouli mesure environ", "m", "grains de sable alignés", -4, [2, 3, 4, 5, 6, 8]]]);
    const objet = [o0, o1, o2], m = pick(ms), N = rand(2, 9);
    const L = N * 10 ** (-e - 2); // nombre d'objets pour m × N cm
    return { enonce: `${objet[0]} $${m} \\times 10^{${e}}$ ${objet[1]}. Combien faut-il de ${objet[2]} pour obtenir une longueur de $${nb(m * N)}$ cm ?`, mode: "nombre", prefixe: "Il en faut :", attendu: L,
      erreurs: [{ valeur: N * 10 ** (-e), message: "Convertis d'abord les centimètres en mètres : $1$ cm $= 10^{-2}$ m." }],
      aides: [`$${nb(m * N)}$ cm $= ${nb(m * N)} \\times 10^{-2}$ m.`, `On divise la longueur totale par $${m} \\times 10^{${e}}$.`, `$\\dfrac{${m * N} \\times 10^{-2}}{${m} \\times 10^{${e}}} = ${N} \\times 10^{-2 - (${e})}$.`],
      solution: `$\\dfrac{${m * N} \\times 10^{-2}}{${m} \\times 10^{${e}}} = ${N} \\times 10^{${-2 - e}} = ${nb(L)}$.` };
  };

  /* =====================================================================
     Chapitre 2 : développer (dv3-) — double distributivité, (a − b)(a + b), preuves
     ===================================================================== */
  // ax² + bx + c en KaTeX (coefficients nuls omis)
  const poly = (a, b, c, x) => {
    const T = [[a, `${x}^2`], [b, x], [c, ""]].filter(([k]) => k !== 0);
    if (!T.length) return "0";
    return T.map(([k, v], i) => { const s = k < 0 ? "-" : "+", m = Math.abs(k), coef = v && m === 1 ? "" : String(m); return (i === 0 ? (k < 0 ? "-" : "") : ` ${s} `) + coef + v; }).join("");
  };
  const VAR3 = ["x", "a", "y", "t", "n"];
  const nz = (lo, hi, neg) => { const v = rand(lo, hi); return neg && Math.random() < 0.5 ? -v : v; };
  const facteur = (a, b, x) => `(${poly(0, a, b, x)})`;

  // Rectangle découpé (distributivité) : cols = [[étiquette, largeur]], rows = [[étiquette, hauteur]], cells[j][i] = texte de la case
  function aireRect3(cols, rows, cells, aria) {
    const W = 320, x0 = 52, y0 = 26, sw = cols.reduce((s, c) => s + c[1], 0), sh = rows.reduce((s, r) => s + r[1], 0), k = Math.min((W - x0 - 14) / sw, 136 / sh);
    let s = "", y = y0;
    rows.forEach(([lr, h], j) => {
      let x = x0;
      cols.forEach(([, w], i) => { s += `<rect class="${(i + j) % 2 ? "g-barre-plus" : "g-rect"}" x="${r3(x)}" y="${r3(y)}" width="${r3(w * k)}" height="${r3(h * k)}"/>`; if (cells && cells[j] && cells[j][i]) s += tx3(x + (w * k) / 2, y + (h * k) / 2 + 4, cells[j][i], "g-plabel", "middle"); x += w * k; });
      s += tx3(x0 - 8, y + (h * k) / 2 + 4, lr, "g-mesure", "end"); y += h * k;
    });
    let x = x0; cols.forEach(([lc, w]) => { s += tx3(x + (w * k) / 2, y0 - 9, lc, "g-mesure", "middle"); x += w * k; });
    return sv3(W, y + 8, aria || "Rectangle découpé en rectangles plus petits", s);
  }
  // a² − b² : carré de côté a privé d'un carré de côté b (forme en L), puis les deux morceaux recollés en un rectangle (a + b) × (a − b)
  function carresDiff3(aL, bL, aria, plusL, moinsL, seul) {
    const a = 96, b = 38, x0 = seul ? 112 : 30, y0 = 24, x1 = 172, yr = y0 + b;
    let s = `<rect class="g-rect" x="${x0}" y="${y0 + b}" width="${a}" height="${a - b}"/><rect class="g-barre-plus" x="${x0}" y="${y0}" width="${a - b}" height="${b}"/><rect class="g-vide g-cache" x="${x0 + a - b}" y="${y0}" width="${b}" height="${b}"/>`;
    s += tx3(x0 + a / 2, y0 + a + 15, aL, "g-mesure", "middle") + tx3(x0 - 6, y0 + a / 2 + 4, aL, "g-mesure", "end") + tx3(x0 + a - b / 2, y0 - 5, bL, "g-mesure", "middle") + tx3(x0 + a + 5, y0 + b / 2 + 4, bL, "g-mesure");
    if (seul) return sv3(320, y0 + a + 22, aria || `Un carré de côté ${aL} privé d'un carré de côté ${bL} dans un coin`, s);
    s += flc3([x0 + a + 14, y0 + 6], [x1 - 10, y0 - 8], [x1 + 16, yr - 6]);
    s += `<rect class="g-rect" x="${x1}" y="${yr}" width="${a}" height="${a - b}"/><rect class="g-barre-plus" x="${x1 + a}" y="${yr}" width="${b}" height="${a - b}"/>`;
    s += tx3(x1 + (a + b) / 2, yr + a - b + 15, plusL || `${aL} + ${bL}`, "g-mesure", "middle") + tx3(x1 - 5, yr + (a - b) / 2 + 4, moinsL || `${aL} − ${bL}`, "g-mesure", "end");
    return sv3(320, y0 + a + 22, aria || `Un carré de côté ${aL} privé d'un carré de côté ${bL} : les deux morceaux restants forment un rectangle de côtés ${aL} + ${bL} et ${aL} − ${bL}`, s);
  }

  GEN["dv3-double"] = function () {
    const x0 = pick(VAR3), aire = Math.random() < 0.35, x = aire ? "x" : x0;
    const a = aire ? rand(1, 4) : nz(1, 5, true), b = aire ? rand(1, 9) : nz(1, 9, true), c = aire ? rand(1, 4) : nz(1, 5, false), d = aire ? rand(1, 9) : nz(1, 9, true);
    const A = a * c, B = a * d + b * c, C = b * d;
    if (B === 0) return GEN["dv3-double"]();
    const bonne = `$${poly(A, B, C, x)}$`;
    const faux = [`$${poly(A, 0, C, x)}$`, `$${poly(A, B, -C, x)}$`, `$${poly(A, a * d - b * c, C, x)}$`, `$${poly(0, a + c, b + d, x)}$`, `$${poly(A, -B, C, x)}$`, `$${poly(A, B, C + a + c, x)}$`].filter((z, i, T) => z !== bonne && T.indexOf(z) === i).slice(0, 3);
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: aire ? `Un rectangle a pour côtés $${poly(0, a, b, x)}$ et $${poly(0, c, d, x)}$ (en cm). Développe et réduis son aire $${facteur(a, b, x)}${facteur(c, d, x)}$.` : `Développe et réduis $${facteur(a, b, x)}${facteur(c, d, x)}$.`, mode: "choix", choix, attendu,
      figure: aire ? aireRect3([[coefX(c, x), 3], [String(d), 1.7]], [[coefX(a, x), 2.4], [String(b), 1.4]], [["?", "?"], ["?", "?"]], `Rectangle de côtés ${poly(0, a, b, x)} et ${poly(0, c, d, x)}, découpé en quatre rectangles dont l'aire est à calculer`) : undefined,
      aides: ["Double distributivité : $(a + b)(c + d) = ac + ad + bc + bd$.", `Il y a quatre produits : $${poly(0, a, 0, x)} \\times ${poly(0, c, 0, x)}$, $${poly(0, a, 0, x)} \\times ${relP(d)}$, $${relP(b)} \\times ${poly(0, c, 0, x)}$ et $${relP(b)} \\times ${relP(d)}$.`, `On obtient $${poly(A, 0, 0, x)} ${a * d < 0 ? "-" : "+"} ${coefX(Math.abs(a * d), x)} ${b * c < 0 ? "-" : "+"} ${coefX(Math.abs(b * c), x)} ${C < 0 ? "-" : "+"} ${Math.abs(C)}$ ; réduis.`],
      solution: `$${facteur(a, b, x)}${facteur(c, d, x)} = ${poly(A, 0, 0, x)} ${a * d < 0 ? "-" : "+"} ${coefX(Math.abs(a * d), x)} ${b * c < 0 ? "-" : "+"} ${coefX(Math.abs(b * c), x)} ${C < 0 ? "-" : "+"} ${Math.abs(C)} = ${poly(A, B, C, x)}$.` };
  };

  GEN["dv3-coef"] = function () {
    const x = pick(VAR3), a = nz(1, 4, true), b = nz(1, 8, true), c = nz(1, 4, false), d = nz(1, 8, true), k = nz(1, 5, true), e = nz(1, 6, true), q = rand(0, 2);
    // E = (ax + b)(cx + d) + k(x + e) ou − (cx + d)²… on reste sur une somme de deux produits
    const A = a * c, B = a * d + b * c + k, C = b * d + k * e;
    const ex = `${facteur(a, b, x)}${facteur(c, d, x)} ${k < 0 ? "-" : "+"} ${Math.abs(k) === 1 ? "" : Math.abs(k)}(${poly(0, 1, e, x)})`;
    const lettre = ["a", "b", "c"][q], val = [A, B, C][q], s2 = poly(0, k, k * e, x);
    const lien = { a: `${x}^2`, b: x, c: "nombre seul" }[lettre];
    return { enonce: `On développe et on réduit $E = ${ex}$ sous la forme $E = a${x}^2 + b${x} + c$. Quelle est la valeur de $${lettre}$ ?`, mode: "nombre", prefixe: `$${lettre} =$`, attendu: val,
      erreurs: q === 1 ? [{ valeur: a * d + b * c, message: "N'oublie pas le terme en " + `$${x}$` + " qui vient du second produit." }] : q === 2 ? [{ valeur: b * d + Math.abs(k) * e, message: "Le signe devant le second produit s'applique aussi à son terme constant." }, { valeur: b * d, message: "N'oublie pas le nombre qui vient du second produit." }] : [],
      aides: ["Développe le premier produit avec la double distributivité, puis le second avec la simple distributivité.", `$${facteur(a, b, x)}${facteur(c, d, x)} = ${poly(A, a * d + b * c, b * d, x)}$ et $${k === 1 ? "" : k === -1 ? "-" : rel(k)}(${poly(0, 1, e, x)}) = ${poly(0, k, k * e, x)}$.`, `Additionne les termes de même nature (${lettre === "c" ? "les nombres seuls" : `les termes en $${lien}$`}).`],
      solution: `$E = ${poly(A, a * d + b * c, b * d, x)}${s2.startsWith("-") ? " - " + s2.slice(1) : " + " + s2} = ${poly(A, B, C, x)}$, donc $${lettre} = ${rel(val)}$.` };
  };

  GEN["dv3-identite"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      const x = pick(VAR3), a = rand(1, 7), b = rand(1, 9), s = Math.random() < 0.5;
      const bonne = `$${poly(a * a, 0, -b * b, x)}$`, faux = [`$${poly(a * a, 0, b * b, x)}$`, `$${poly(a, 0, -b, x)}$`, `$${poly(a * a, -2 * a * b, -b * b, x)}$`, `$${poly(2 * a, 0, -2 * b, x)}$`].filter((z, i, T) => z !== bonne && T.indexOf(z) === i).slice(0, 3);
      const { choix, attendu } = melange(bonne, faux);
      const ex = s ? `${facteur(a, -b, x)}${facteur(a, b, x)}` : `${facteur(a, b, x)}${facteur(a, -b, x)}`;
      return { enonce: `Développe $${ex}$.`, mode: "choix", choix, attendu,
        aides: ["Reconnais l'égalité $(a - b)(a + b) = a^2 - b^2$.", `Ici, le premier terme est $${poly(0, a, 0, x)}$ et le second $${b}$.`, `$(${poly(0, a, 0, x)})^2 = ${poly(a * a, 0, 0, x)}$ et $${b}^2 = ${b * b}$.`],
        solution: `$${ex} = (${poly(0, a, 0, x)})^2 - ${b}^2 = ${poly(a * a, 0, -b * b, x)}$.` };
    }
    if (t === 1) {
      const c = pick([20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 1000]), d = rand(1, c >= 100 ? 9 : 4), r = c * c - d * d;
      return { enonce: `Sans poser la multiplication, calcule $${c - d} \\times ${c + d}$ en utilisant l'égalité $(a - b)(a + b) = a^2 - b^2$.`, mode: "nombre", prefixe: "Résultat :", attendu: r,
        figure: carresDiff3(String(c), String(d), `Un carré de côté ${c} privé d'un carré de côté ${d} ; les deux morceaux forment un rectangle de côtés ${c + d} et ${c - d}`, String(c + d), String(c - d)),
        erreurs: [{ valeur: c * c + d * d, message: "C'est $a^2 - b^2$, avec une soustraction." }, { valeur: c * c - d, message: `$b$ aussi est au carré : on retire $${d}^2 = ${d * d}$.` }],
        aides: [`$${c - d} = ${c} - ${d}$ et $${c + d} = ${c} + ${d}$.`, `Donc $${c - d} \\times ${c + d} = ${c}^2 - ${d}^2$.`, `$${c}^2 = ${nb(c * c)}$ et $${d}^2 = ${d * d}$.`],
        solution: `$${c - d} \\times ${c + d} = (${c} - ${d})(${c} + ${d}) = ${c}^2 - ${d}^2 = ${nb(c * c)} - ${d * d} = ${nb(r)}$.` };
    }
    const x = pick(VAR3), a = rand(2, 6), b = rand(1, 9), v = rand(1, 9) * (Math.random() < 0.5 ? -1 : 1);
    return { enonce: `On pose $F = ${facteur(1, -b, x)}${facteur(1, b, x)} - ${poly(1, 0, 0, x)}$. Calcule $F$ pour $${x} = ${nb(v * 1000)}$ (indice : développe d'abord).`, mode: "nombre", prefixe: "$F =$", attendu: -b * b,
      erreurs: [{ valeur: b * b, message: `$(${x} - ${b})(${x} + ${b}) = ${x}^2 - ${b * b}$ : le $${x}^2$ disparaît mais il reste $-${b * b}$.` }],
      aides: ["Développe $F$ avant de remplacer : le calcul devient très simple.", `$${facteur(1, -b, x)}${facteur(1, b, x)} = ${x}^2 - ${b * b}$.`, `$F = ${x}^2 - ${b * b} - ${x}^2$.`],
      solution: `$F = ${x}^2 - ${b * b} - ${x}^2 = -${b * b}$ quelle que soit la valeur de $${x}$ : pour $${x} = ${nb(v * 1000)}$, $F = -${b * b}$.` };
  };

  GEN["dv3-prouver"] = function () {
    const t = rand(0, 4);
    if (t === 3) { // programme en blocs dont le résultat ne dépend pas du nombre choisi
      const v = rand(0, 2), a = rand(2, 9), k = rand(2, 7), b = rand(1, 9);
      const [lignes, res, err, msgE, calc] = [
        [[`mettre [A] à [x + ${a}]`, `mettre [A] à [A * ${k}]`, `mettre [B] à [x * ${k}]`, "dire [A - B]"], k * a, a, `Le facteur $${k}$ multiplie toute la parenthèse : $${k}(x + ${a}) = ${k}x + ${k * a}$.`, `$${k}(x + ${a}) - ${k}x = ${k}x + ${k * a} - ${k}x = ${k * a}$`],
        [[`mettre [A] à [(x + ${a}) * (x + ${b})]`, `mettre [B] à [x * x + ${a + b} * x]`, "dire [A - B]"], a * b, a + b, `Le nombre seul de $(x + ${a})(x + ${b})$ est $${a} \\times ${b}$, pas $${a} + ${b}$.`, `$(x + ${a})(x + ${b}) - (x^2 + ${a + b}x) = x^2 + ${a + b}x + ${a * b} - x^2 - ${a + b}x = ${a * b}$`],
        [[`mettre [A] à [(x + ${a}) * (x + ${a})]`, `mettre [B] à [x * (x + ${2 * a})]`, "dire [A - B]"], a * a, 2 * a, `$(x + ${a})^2 = x^2 + ${2 * a}x + ${a * a}$ : le nombre seul est $${a}^2$.`, `$(x + ${a})^2 - x(x + ${2 * a}) = x^2 + ${2 * a}x + ${a * a} - x^2 - ${2 * a}x = ${a * a}$`]
      ][v];
      const prog = B3([DRAP3, { c: "ent", t: "demander [Choisis un nombre] et attendre" }, { c: "var", t: "mettre [x] à [réponse]" }, ...lignes.map((l, i) => ({ c: i === lignes.length - 1 ? "dire" : "var", t: l }))]);
      return { enonce: `${pick(PRENOMS3)} lance ce programme plusieurs fois et remarque que le lutin dit toujours le même nombre. Prouve-le avec $x$ : quel est ce nombre ?`, figure: prog, mode: "nombre", prefixe: "Le lutin dit toujours :", attendu: res,
        erreurs: [{ valeur: err, message: msgE }, { valeur: 0, message: "Développe et réduis $A - B$ : les termes en $x$ s'annulent, mais pas le nombre seul." }],
        aides: ["Appelle $x$ le nombre choisi et écris $A$ et $B$ en fonction de $x$.", "Développe $A$, puis calcule $A - B$ en enlevant les parenthèses (attention aux signes).", "Les termes en $x$ disparaissent : il ne reste qu'un nombre."],
        solution: `${calc} : le lutin dit toujours $${res}$, quel que soit le nombre choisi.` };
    }
    if (t === 4) { // un contre-exemple prouve qu'une égalité est fausse
      const a = rand(2, 9), k = rand(2, 6), b = rand(2, 9), v = pick([1, 2, 3, 4, 5, -1, -2, -3]), nom = pick(PRENOMS3), w = rand(0, 3);
      const C = [[`(x + ${a})^2 = x^2 + ${a * a}`, (z) => (z + a) ** 2, (z) => z * z + a * a], [`(x - ${a})^2 = x^2 - ${a * a}`, (z) => (z - a) ** 2, (z) => z * z - a * a], [`${k}(x + ${a}) = ${k}x + ${a}`, (z) => k * (z + a), (z) => k * z + a], [`(x + ${a})(x + ${b}) = x^2 + ${a * b}`, (z) => (z + a) * (z + b), (z) => z * z + a * b]][w];
      const g = C[1](v), d = C[2](v);
      if (g === d) return GEN["dv3-prouver"]();
      return { enonce: `${nom} affirme : « Pour tout nombre $x$, $${C[0]}$. » Pour tester, calcule les deux membres pour $x = ${rel(v)}$. Que vaut le membre de gauche moins le membre de droite ?`, mode: "nombre", prefixe: "Différence :", attendu: g - d,
        erreurs: [{ valeur: g, message: "Ça, c'est le membre de gauche seul ; retranche le membre de droite." }, { valeur: d, message: "Ça, c'est le membre de droite seul ; calcule gauche moins droite." }, { valeur: 0, message: "Calcule vraiment les deux membres : ils ne sont pas égaux ici." }],
        aides: [`Remplace $x$ par $${relP(v)}$ dans chaque membre.`, `Membre de gauche : $${rel(g)}$.`, `Membre de droite : $${rel(d)}$ ; fais la différence.`],
        solution: `Pour $x = ${rel(v)}$ : gauche $= ${rel(g)}$, droite $= ${rel(d)}$, différence $= ${rel(g - d)} \\neq 0$. Ce contre-exemple prouve que l'égalité de ${nom} est fausse.` };
    }
    if (t === 0) { // programme de calcul : (x + a)(x − a) + a² = x²
      const a = rand(2, 9), n = rand(-12, 15);
      if (n === 0) return GEN["dv3-prouver"]();
      const r = n * n;
      return { enonce: `Programme : « Choisis un nombre. Ajoute $${a}$. Multiplie le résultat par le nombre de départ diminué de $${a}$. Ajoute $${a * a}$. » Quel résultat obtient-on en partant de $${rel(n)}$ ?`, mode: "nombre", prefixe: "Résultat :", attendu: r,
        erreurs: [{ valeur: (n + a) * n + a * a, message: `On multiplie par « le nombre de départ diminué de $${a}$ », c'est-à-dire $(${rel(n)} - ${a})$.` }, { valeur: n * n - a * a, message: `N'oublie pas la dernière étape : ajouter $${a * a}$.` }],
        aides: [`Avec $x$ : $(x + ${a})(x - ${a}) + ${a * a}$.`, `$(x + ${a})(x - ${a}) = x^2 - ${a * a}$.`, "Le programme donne donc toujours le carré du nombre de départ."],
        solution: `$(x + ${a})(x - ${a}) + ${a * a} = x^2 - ${a * a} + ${a * a} = x^2$. En partant de $${rel(n)}$, on obtient $${relP(n)}^2 = ${r}$.` };
    }
    if (t === 1) { // (n + 1)² − n² = 2n + 1
      const n = rand(15, 500), r = 2 * n + 1, k = rand(1, 3);
      if (k === 1) return { enonce: `En développant, on montre que $(n + 1)^2 - n^2 = 2n + 1$. Utilise ce résultat pour calculer $${n + 1}^2 - ${n}^2$.`, mode: "nombre", prefixe: "Résultat :", attendu: r,
        erreurs: [{ valeur: 1, message: "$(n + 1)^2 \\neq n^2 + 1$ : il y a aussi le terme $2n$." }],
        aides: ["$(n + 1)^2 = (n + 1)(n + 1) = n^2 + 2n + 1$.", "Donc $(n + 1)^2 - n^2 = 2n + 1$.", `Ici $n = ${n}$.`], solution: `$${n + 1}^2 - ${n}^2 = 2 \\times ${n} + 1 = ${r}$.` };
      const m = rand(2, 9), s = n + m; // (n + m)² − n² = 2mn + m²
      return { enonce: `Développe $(n + ${m})^2 - n^2$ pour calculer rapidement $${s}^2 - ${n}^2$.`, mode: "nombre", prefixe: "Résultat :", attendu: s * s - n * n,
        erreurs: [{ valeur: m * m, message: `$(n + ${m})^2 \\neq n^2 + ${m * m}$ : il y a aussi le terme $${2 * m}n$.` }],
        aides: [`$(n + ${m})^2 = (n + ${m})(n + ${m}) = n^2 + ${2 * m}n + ${m * m}$.`, `Donc $(n + ${m})^2 - n^2 = ${2 * m}n + ${m * m}$.`, `Ici $n = ${n}$.`], solution: `$${s}^2 - ${n}^2 = ${2 * m} \\times ${n} + ${m * m} = ${nb(s * s - n * n)}$.` };
    }
    const k = pick([3, 5, 7]), p = rand(2, 7), m = rand(2, 9), Q = pick([
      [`La somme de ${k} entiers consécutifs $n$, $n + 1$, …, $n + ${k - 1}$ est toujours :`, `un multiple de $${k}$`, ["un nombre pair", `un multiple de $${2 * k}$`, "un nombre premier"], `La somme vaut $${k}n + ${(k * (k - 1)) / 2} = ${k}(n + ${(k - 1) / 2})$ : c'est un multiple de $${k}$.`],
      ["Pour un entier $n$, le nombre $2n + 1$ est toujours :", "impair", ["pair", "un multiple de $3$", "premier"], "$2n$ est pair, donc $2n + 1$ est impair."],
      ["Le produit de deux entiers consécutifs $n(n + 1)$ est toujours :", "pair", ["impair", "un multiple de $3$", "un carré"], "L'un des deux nombres consécutifs est pair, donc le produit est pair."],
      ["La différence $(n + 1)^2 - n^2$ est toujours :", "impaire", ["paire", "égale à $1$", "un multiple de $3$"], "Elle vaut $n^2 + 2n + 1 - n^2 = 2n + 1$ : c'est un nombre impair."],
      ["La somme de deux entiers consécutifs $n + (n + 1)$ est toujours :", "impaire", ["paire", "un multiple de $3$", "un carré"], "$n + (n + 1) = 2n + 1$ : c'est un nombre impair."],
      ["La somme de trois nombres pairs consécutifs $2n$, $2n + 2$ et $2n + 4$ est toujours :", "un multiple de $6$", ["un multiple de $4$", "impaire", "un nombre premier"], "$2n + 2n + 2 + 2n + 4 = 6n + 6 = 6(n + 1)$."],
      ["La somme de deux nombres impairs consécutifs $(2n + 1) + (2n + 3)$ est toujours :", "un multiple de $4$", ["impaire", "un multiple de $3$", "un nombre premier"], "$(2n + 1) + (2n + 3) = 4n + 4 = 4(n + 1)$."],
      ["Le carré d'un nombre impair $(2n + 1)^2$ est toujours :", "impair", ["pair", "un multiple de $4$", "un nombre premier"], "$(2n + 1)^2 = 4n^2 + 4n + 1 = 2(2n^2 + 2n) + 1$ : il est impair."],
      [`Pour tout entier $n$, le nombre $${p}n + ${p * m}$ est toujours :`, `un multiple de $${p}$`, [`un multiple de $${p * m}$`, "un nombre premier", "impair"], `$${p}n + ${p * m} = ${p}(n + ${m})$ : c'est un multiple de $${p}$.`],
      ["Pour tout entier $n$, le nombre $n^2 + n$ est toujours :", "pair", ["impair", "un carré", "un multiple de $3$"], "$n^2 + n = n(n + 1)$ : c'est le produit de deux entiers consécutifs, donc il est pair."],
      ["Pour prouver qu'une égalité est vraie pour tous les nombres, il faut :", "faire un calcul littéral valable pour tout $x$", ["la vérifier sur trois exemples", "la vérifier pour $x = 0$", "la vérifier sur la calculatrice"], "Des exemples ne suffisent pas : il faut un calcul général."],
      ["Pour prouver qu'une égalité est fausse, il suffit de :", "trouver un contre-exemple", ["la développer", "la vérifier pour $x = 1$", "la factoriser"], "Un seul cas où elle est fausse suffit."],
      [`On remarque que $(x + ${m})^2 - x^2$ vaut $${2 * m + m * m}$ pour $x = 1$ et $${4 * m + m * m}$ pour $x = 2$. Pour tout $x$, cette expression est égale à :`, `$${2 * m}x + ${m * m}$`, [`$${m * m}$`, `$${2 * m}x$`, `$x + ${m * m}$`], `$(x + ${m})^2 - x^2 = x^2 + ${2 * m}x + ${m * m} - x^2 = ${2 * m}x + ${m * m}$.`]
    ]);
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu, aides: ["Écris le nombre avec la lettre $n$, puis développe et réduis.", "Un multiple de $k$ s'écrit $k \\times$ (un entier).", "Un nombre pair s'écrit $2 \\times$ (un entier), un nombre impair $2 \\times$ (un entier) $+ 1$."], solution: Q[3] };
  };

  // Somme de trois entiers consécutifs : n, n + 1, n + 2 points ; le dernier point de la 3e ligne complète la 1re
  function pointsConsec3(n) {
    const g = 18, x0 = 96, y0 = 22; let s = "";
    ["n", "n + 1", "n + 2"].forEach((lab, j) => {
      const y = y0 + j * 30; s += tx3(x0 - 18, y + 4, lab, "g-mesure", "end");
      for (let i = 0; i < n + j; i++) { const d = j === 2 && i === n + 1; s += `<circle cx="${x0 + i * g}" cy="${y}" r="6" style="fill:var(${d ? "--ylang" : "--lagon"});fill-opacity:${d ? 0.9 : 0.5};stroke:var(--encre);stroke-width:1"/>`; }
    });
    s += `<circle class="g-cache" cx="${x0 + n * g}" cy="${y0}" r="6" style="fill:none"/>` + flc3([x0 + (n + 1) * g + 8, y0 + 56], [x0 + (n + 1) * g + 44, y0 + 26], [x0 + n * g + 9, y0 + 3]);
    s += tx3(160, y0 + 92, "3 lignes de n + 1 points : 3(n + 1)", "g-plabel", "middle");
    return sv3(320, y0 + 102, `Trois lignes de ${n}, ${n + 1} et ${n + 2} points : en déplaçant le dernier point de la troisième ligne vers la première, on obtient 3 lignes de ${n + 1} points`, s);
  }
  FIGURES["dv3-cours-double"] = () => aireRect3([["c", 3], ["d", 2]], [["a", 2.2], ["b", 1.4]], [["a × c", "a × d"], ["b × c", "b × d"]], "Rectangle de côtés a + b et c + d découpé en quatre rectangles d'aires a × c, a × d, b × c et b × d");
  FIGURES["dv3-cours-carres"] = () => carresDiff3("a", "b");
  FIGURES["dv3-cours-consecutifs"] = () => pointsConsec3(5);
  FIGURES["dv3-qcm-aire"] = () => aireRect3([["x", 3], ["5", 1.8]], [["x", 2.6], ["2", 1.2]], null, "Rectangle de côtés x + 5 et x + 2 découpé en quatre rectangles");

  /* =====================================================================
     Chapitre 3 : factoriser (fc3-) — facteur commun, a² − b² = (a − b)(a + b)
     ===================================================================== */
  const uniq3 = (bonne, L) => L.filter((z, i, T) => z !== bonne && T.indexOf(z) === i).slice(0, 3);
  const coefX = (k, x) => (k === 1 ? x : k === -1 ? `-${x}` : `${k}${x}`);
  const svgX = (s) => s.replace(/\^2/g, "²").replace(/-/g, "−"); // expression KaTeX simple → texte pour une figure

  GEN["fc3-commun"] = function () {
    const x = pick(VAR3), t = rand(0, 2);
    if (t === 0) { // kx² + mx avec facteur commun monôme
      const k = rand(2, 6), p = rand(1, 5), q = nz(1, 9, true); if (pgcd(p, Math.abs(q)) > 1) return GEN["fc3-commun"]();
      const bonne = `$${coefX(k, x)}(${poly(0, p, q, x)})$`, faux = uniq3(bonne, [`$${coefX(k, x)}(${poly(p, q, 0, x)})$`, `$${coefX(k * p, x)}(${poly(0, 1, q, x)})$`, `$${coefX(k, x)}(${poly(0, p, -q, x)})$`, `$${coefX(k, x)}(${poly(0, k * p, k * q, x)})$`]);
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `Factorise le plus possible $${poly(k * p, k * q, 0, x)}$.${q > 0 ? " La figure représente cette somme comme l'aire de deux rectangles de même hauteur." : ""}`, mode: "choix", choix, attendu,
        figure: q > 0 ? aireRect3([["?", 2.6], ["?", 1.7]], [["?", 2]], [[svgX(poly(k * p, 0, 0, x)), svgX(poly(0, k * q, 0, x))]], `Deux rectangles de même hauteur inconnue, d'aires ${svgX(poly(k * p, 0, 0, x))} et ${svgX(poly(0, k * q, 0, x))}`) : undefined,
        figureSolution: q > 0 ? aireRect3([[coefX(p, x), 2.6], [String(q), 1.7]], [[coefX(k, x), 2]], [[svgX(poly(k * p, 0, 0, x)), svgX(poly(0, k * q, 0, x))]], `Deux rectangles de hauteur ${coefX(k, x)} et de largeurs ${coefX(p, x)} et ${q}`) : undefined,
        aides: ["Cherche ce qui est commun aux deux termes : un nombre et une lettre.", `$${poly(k * p, 0, 0, x)} = ${coefX(k, x)} \\times ${coefX(p, x)}$ et $${poly(0, k * q, 0, x)} = ${coefX(k, x)} \\times ${relP(q)}$.`, `Le facteur commun est $${coefX(k, x)}$.`],
        solution: `$${poly(k * p, k * q, 0, x)} = ${coefX(k, x)} \\times ${coefX(p, x)} + ${coefX(k, x)} \\times ${relP(q)} = ${coefX(k, x)}(${poly(0, p, q, x)})$.` };
    }
    // (x + a)(bx + c) ± (x + a)(dx + e)
    const a = nz(1, 9, true), b = rand(1, 5), c = nz(1, 9, true), d = rand(1, 5), e = nz(1, 9, true), moins = t === 2;
    const B = moins ? b - d : b + d, C = moins ? c - e : c + e; if (B <= 0 || C === 0 || pgcd(B, Math.abs(C)) > 1) return GEN["fc3-commun"]();
    const F = facteur(1, a, x), ex = `${F}${facteur(b, c, x)} ${moins ? "-" : "+"} ${F}${facteur(d, e, x)}`;
    const bonne = `$${F}(${poly(0, B, C, x)})$`;
    const faux = uniq3(bonne, [moins ? `$${F}(${poly(0, b - d, c + e, x)})$` : `$${F}(${poly(0, b * d, c * e, x)})$`, `$${F}^2(${poly(0, B, C, x)})$`, `$${F}(${poly(0, B, -C, x)})$`, `$(${poly(0, B, C + a, x)})${F}$`]);
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: `Factorise $${ex}$.`, mode: "choix", choix, attendu,
      aides: [`Le facteur commun est la parenthèse $${F}$.`, `$ka ${moins ? "-" : "+"} kb = k(a ${moins ? "-" : "+"} b)$ avec $k = ${F}$.`, moins ? `Attention au signe : $${facteur(b, c, x)} - ${facteur(d, e, x)} = ${poly(0, b, c, x)} - ${d === 1 ? "" : d}${x} ${e < 0 ? "+" : "-"} ${Math.abs(e)}$.` : `Additionne $${facteur(b, c, x)}$ et $${facteur(d, e, x)}$.`],
      solution: `$${ex} = ${F}[${facteur(b, c, x)} ${moins ? "-" : "+"} ${facteur(d, e, x)}] = ${F}(${poly(0, B, C, x)})$.` };
  };

  GEN["fc3-carres"] = function () {
    const x = pick(VAR3), t = rand(0, 2), a = t === 0 ? 1 : rand(2, 7), b = rand(1, 9);
    if (t < 2) {
      if (a !== 1 && pgcd(a, b) > 1) return GEN["fc3-carres"]();
      const A = coefX(a, x), bonne = `$(${A} - ${b})(${A} + ${b})$`;
      const faux = uniq3(bonne, [`$(${A} - ${b})^2$`, `$(${A} - ${b * b})(${A} + ${b * b})$`, `$(${coefX(a * a, x)} - ${b})(${coefX(a * a, x)} + ${b})$`, `$(${A} + ${b})^2$`]);
      const { choix, attendu } = melange(bonne, faux);
      const L = Math.random() < 0.4; // énoncé avec la figure du carré privé d'un carré
      return { enonce: L ? `La partie colorée est un carré de côté $${A}$ privé d'un carré de côté $${b}$ : son aire est $${poly(a * a, 0, -b * b, x)}$. Factorise cette aire.` : `Factorise $${poly(a * a, 0, -b * b, x)}$.`, mode: "choix", choix, attendu,
        figure: L ? carresDiff3(A, String(b), `Un carré de côté ${A} privé d'un carré de côté ${b} dans un coin`, 0, 0, true) : undefined,
        figureSolution: carresDiff3(A, String(b), `Un carré de côté ${A} privé d'un carré de côté ${b} : les deux morceaux forment un rectangle de côtés ${A} + ${b} et ${A} − ${b}`),
        aides: ["Reconnais une différence de deux carrés : $a^2 - b^2 = (a - b)(a + b)$.", `$${poly(a * a, 0, 0, x)} = (${A})^2$ et $${b * b} = ${b}^2$.`, `Donc $a = ${A}$ et $b = ${b}$.`],
        solution: `$${poly(a * a, 0, -b * b, x)} = (${A})^2 - ${b}^2 = (${A} - ${b})(${A} + ${b})$.` };
    }
    // (x + p)² − b² = (x + p − b)(x + p + b)
    const p = nz(1, 9, true), q = b; if (Math.abs(p) === q) return GEN["fc3-carres"](); const F = facteur(1, p, x);
    const bonne = `$(${poly(0, 1, p - q, x)})(${poly(0, 1, p + q, x)})$`;
    const faux = uniq3(bonne, [`$(${poly(0, 1, p - q * q, x)})(${poly(0, 1, p + q * q, x)})$`, `$(${poly(0, 1, -p - q, x)})(${poly(0, 1, p + q, x)})$`, `$${F}(${poly(0, 1, p - q * q, x)})$`, `$(${poly(0, 1, p - q, x)})^2$`]);
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: `Factorise $${F}^2 - ${q * q}$.`, mode: "choix", choix, attendu,
      aides: ["C'est une différence de deux carrés : $a^2 - b^2 = (a - b)(a + b)$.", `Ici $a = ${F}$ et $b = ${q}$.`, `$(a - b)(a + b) = [${F} - ${q}][${F} + ${q}]$ ; réduis chaque crochet.`],
      solution: `$${F}^2 - ${q}^2 = [${F} - ${q}][${F} + ${q}] = (${poly(0, 1, p - q, x)})(${poly(0, 1, p + q, x)})$.` };
  };

  GEN["fc3-calcul"] = function () {
    const t = rand(0, 1);
    if (t === 0) {
      const a = rand(21, 99), b = rand(11, a - 2), r = a * a - b * b;
      return { enonce: `Calcule astucieusement $${a}^2 - ${b}^2$ en factorisant.`, mode: "nombre", prefixe: "Résultat :", attendu: r,
        figureSolution: carresDiff3(String(a), String(b), `Un carré de côté ${a} privé d'un carré de côté ${b} : rectangle de côtés ${a + b} et ${a - b}`, String(a + b), String(a - b)),
        erreurs: [{ valeur: (a - b) * (a - b), message: "$a^2 - b^2 \\neq (a - b)^2$ : c'est $(a - b)(a + b)$." }, { valeur: 2 * a, message: `On multiplie les deux facteurs $${a - b}$ et $${a + b}$, on ne les additionne pas.` }],
        aides: ["$a^2 - b^2 = (a - b)(a + b)$.", `$${a}^2 - ${b}^2 = (${a} - ${b})(${a} + ${b})$.`, `$= ${a - b} \\times ${a + b}$.`],
        solution: `$${a}^2 - ${b}^2 = (${a} - ${b})(${a} + ${b}) = ${a - b} \\times ${a + b} = ${nb(r)}$.` };
    }
    const k = rand(11, 99), a = rand(2, 9), c = pick([10, 100]) - a; // k × a + k × c = k × (a + c)
    return { enonce: `Calcule mentalement $${k} \\times ${a} + ${k} \\times ${c}$ en factorisant.`, mode: "nombre", prefixe: "Résultat :", attendu: k * (a + c),
      figure: aireRect3([[String(a), 1.3], [String(c), c > 50 ? 4 : 3]], [[String(k), 1.6]], [[`${k} × ${a}`, `${k} × ${c}`]], `Deux rectangles de même hauteur ${k}, de largeurs ${a} et ${c}`),
      erreurs: [{ valeur: k + a + c, message: `On met $${k}$ en facteur : $${k} \\times (${a} + ${c})$.` }, { valeur: k * a + c, message: `$${k}$ multiplie aussi $${c}$ : $${k} \\times ${a} + ${k} \\times ${c} = ${k} \\times (${a} + ${c})$.` }],
      aides: [`$${k}$ est un facteur commun.`, `$${k} \\times ${a} + ${k} \\times ${c} = ${k} \\times (${a} + ${c})$.`, `$${a} + ${c} = ${a + c}$.`],
      solution: `$${k} \\times (${a} + ${c}) = ${k} \\times ${a + c} = ${nb(k * (a + c))}$.` };
  };

  GEN["fc3-reconnaitre"] = function () {
    const x = pick(VAR3), a = rand(1, 5), b = nz(1, 9, true), c = rand(1, 5), d = nz(1, 9, true), t = rand(0, 4);
    if (t === 4) { // aire de deux rectangles de même hauteur : la forme factorisée
      const k = rand(2, 9), m = rand(1, 9), y = pick(["x", "a", "t", "y"]);
      const bonne = `$${k}(${y} + ${m})$`, faux = uniq3(bonne, [`$${k}${y} + ${m}$`, `$${k}${y} + ${k * m}$`, `$${k}(${y} + ${k * m})$`, `$${y}(${k} + ${m})$`]);
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `Ce rectangle est formé de deux rectangles de même hauteur $${k}$. Laquelle de ces écritures de son aire totale est une **forme factorisée** ?`, mode: "choix", choix, attendu,
        figure: aireRect3([[y, 3], [String(m), 1.7]], [[String(k), 1.6]], [[`${k}${y}`, String(k * m)]], `Deux rectangles de hauteur ${k}, de largeurs ${y} et ${m}, d'aires ${k}${y} et ${k * m}`),
        aides: ["Une forme factorisée est un produit : la dernière opération est une multiplication.", `Les deux rectangles ont la même hauteur $${k}$ : c'est le facteur commun.`, `La largeur totale est $${y} + ${m}$.`],
        solution: `L'aire totale vaut $${k}${y} + ${k * m}$ (forme développée) ou $${k}(${y} + ${m})$ : hauteur $\\times$ largeur totale, c'est la forme factorisée.` };
    }
    const formes = [
      [`${facteur(a, b, x)}${facteur(c, d, x)}`, "un produit (forme factorisée)"],
      [`${poly(a * c, a * d + b * c, b * d, x)}`, "une somme (forme développée)"],
      [`${facteur(a, b, x)}${facteur(c, d, x)} + ${Math.abs(b) + 1}`, "une somme (ni factorisée ni développée réduite)"],
      [`${rand(2, 9)}${facteur(a, b, x)}^2`, "un produit (forme factorisée)"]
    ];
    const [ex, nature] = formes[t];
    if (t === 2) {
      const bonne = "une somme : ce n'est pas une forme factorisée", faux = ["un produit : c'est une forme factorisée", "un quotient", "une différence de deux carrés"];
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `L'expression $${ex}$ est :`, mode: "choix", choix, attendu,
        aides: ["Cherche la **dernière** opération à effectuer si on calculait l'expression pour une valeur de $" + x + "$.", "Ici, on calcule le produit puis on ajoute un nombre.", "La dernière opération est une addition."], solution: "La dernière opération est une addition : c'est une somme, donc ce n'est pas une forme factorisée." };
    }
    const bonne = t === 1 ? "une somme : c'est une forme développée" : "un produit : c'est une forme factorisée";
    const faux = uniq3(bonne, ["une somme : c'est une forme développée", "un produit : c'est une forme factorisée", "un quotient", "une différence de deux carrés"]);
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: `L'expression $${ex}$ est :`, mode: "choix", choix, attendu,
      aides: ["Cherche la dernière opération à effectuer si on calculait l'expression pour une valeur de $" + x + "$.", "Si c'est une multiplication, l'expression est un produit (forme factorisée).", "Si c'est une addition ou une soustraction, c'est une somme."], solution: `L'expression est ${nature}.` };
  };

  FIGURES["fc3-cours-forme"] = () => aireRect3([["x", 3], ["2", 1.6]], [["3", 1.6]], [["3x", "6"]], "Rectangle de hauteur 3 et de largeur x + 2, formé de deux rectangles d'aires 3x et 6");
  FIGURES["fc3-cours-commun"] = () => aireRect3([["2x", 2.6], ["3", 1.6]], [["3x", 2]], [["6x²", "9x"]], "Deux rectangles de hauteur 3x et de largeurs 2x et 3, d'aires 6x² et 9x");
  FIGURES["fc3-cours-carres"] = () => carresDiff3("3x", "5");
  FIGURES["fc3-qcm-aire"] = () => aireRect3([["x", 3], ["3", 1.6]], [["4", 1.6]], [["4x", "12"]], "Deux rectangles de hauteur 4, de largeurs x et 3, d'aires 4x et 12");

  /* =====================================================================
     Chapitre 4 : équations (eq3-) — premier degré, équation produit, x² = a, problèmes
     ===================================================================== */
  const solTex = (L) => { const T = [...new Set(L.map((v) => v.toFixed(6)))].map(Number).sort((a, b) => a - b); return T; };
  const racTex = (n, d) => frS(n, d);
  const ensemble = (S, x) => (S.length === 0 ? "aucune solution" : S.length === 1 ? `une seule solution : $${x} = ${S[0]}$` : `deux solutions : $${x} = ${S[0]}$ et $${x} = ${S[1]}$`);

  // Balance en équilibre : g = [nombre de boîtes « x », poids] à gauche, d = idem à droite
  function balance3(g, d, aria) {
    const yb = 96, py = 74; // fléau horizontal (équilibre) et plateaux posés dessus
    let s = `<polygon class="g-poly" points="${pl3([[120, 150], [200, 150], [186, 136], [134, 136]])}"/>` + ln3(160, 136, 160, yb) + ln3(52, yb, 268, yb) + `<circle class="g-point" cx="160" cy="${yb}" r="4"/>`;
    [[82, g], [238, d]].forEach(([cx, [nx, n]]) => {
      s += ln3(cx, yb, cx, py + 4, "g-droite") + `<rect class="g-rect" x="${cx - 74}" y="${py}" width="148" height="5" rx="2"/>`;
      const w = 22, wn = n ? Math.max(30, String(n).length * 8 + 22) : 0; let x = cx - (nx * (w + 3) + wn) / 2;
      for (let i = 0; i < nx; i++) { s += `<rect class="g-rect" x="${r3(x)}" y="${py - w - 1}" width="${w}" height="${w}" rx="3"/>` + tx3(x + w / 2, py - w / 2 + 3, "x", "g-plabel", "middle"); x += w + 3; }
      if (n) s += `<rect class="g-barre-plus" x="${r3(x)}" y="${py - 27}" width="${wn}" height="26" rx="4"/>` + tx3(x + wn / 2, py - 10, `${n} kg`, "g-plabel", "middle");
    });
    return sv3(320, 158, aria || `Balance en équilibre : à gauche ${g[0]} boîtes de masse x et ${g[1]} kg, à droite ${d[0]} boîte${d[0] > 1 ? "s" : ""} de masse x et ${d[1]} kg`, s);
  }

  GEN["eq3-premier"] = function () {
    const x = pick(VAR3), t = rand(0, 3), s = rand(-9, 12);
    if (t === 3) { // balance en équilibre
      const a = rand(2, 4), c = rand(1, a - 1), v = rand(1, 9), b = rand(0, 9), d = (a - c) * v + b;
      if (d > 45 || (b === 0 && c === 0)) return GEN["eq3-premier"]();
      return { enonce: `Sur cette balance en équilibre, toutes les boîtes ont la même masse $x$ (en kg). Écris l'équation qui traduit l'équilibre, puis trouve $x$.`, figure: balance3([a, b], [c, d]), mode: "nombre", prefixe: "$x =$", suffixe: "kg", attendu: v,
        erreurs: [{ valeur: arr((d - b) / (a + c), 4), message: `Pour garder l'équilibre, on enlève $${c}$ boîte${c > 1 ? "s" : ""} des deux côtés : il reste $${coefX(a - c, "x")}$ à gauche.` }, ...(b ? [{ valeur: arr((d + b) / (a - c), 4), message: `On enlève $${b}$ kg des deux côtés : à droite il reste $${d} - ${b}$.` }] : [])],
        aides: [`L'équilibre se traduit par $${poly(0, a, b, "x")} = ${poly(0, c, d, "x")}$.`, `Enlève $${coefX(c, "x")}$ des deux côtés${b ? `, puis $${b}$ kg des deux côtés` : ""}.`, `Il reste $${poly(0, a - c, 0, "x")} = ${d - b}$.`],
        solution: `$${poly(0, a, b, "x")} = ${poly(0, c, d, "x")}$, donc ${a - c === 1 ? `$x = ${b ? `${d} - ${b} = ` : ""}${v}$ kg` : `$${poly(0, a - c, 0, "x")} = ${d - b}$ et $x = ${v}$ kg`}.` };
    }
    if (t === 0) { // a(x + b) = cx + d
      const a = nz(2, 6, true), b = nz(1, 7, true), c = nz(1, 6, true); if (a === c) return GEN["eq3-premier"]();
      const d = a * (s + b) - c * s;
      return { enonce: `Résous l'équation $${a}(${poly(0, 1, b, x)}) = ${poly(0, c, d, x)}$.`, mode: "nombre", prefixe: `$${x} =$`, attendu: s,
        erreurs: [{ valeur: (d - b) / (a - c), message: "Développe d'abord : le facteur multiplie aussi le nombre dans la parenthèse." }, ...(a + c !== 0 ? [{ valeur: (d - a * b) / (a + c), message: `Pour faire passer $${poly(0, c, 0, x)}$ à gauche, on le soustrait aux deux membres : son signe change.` }] : [])],
        aides: [`Développe : $${a}(${poly(0, 1, b, x)}) = ${poly(0, a, a * b, x)}$.`, `Regroupe les termes en $${x}$ d'un côté : $${poly(0, a - c, 0, x)} = ${rel(d - a * b)}$.`, `Divise par $${rel(a - c)}$.`],
        solution: `$${poly(0, a, a * b, x)} = ${poly(0, c, d, x)}$, donc ${a - c === 1 ? `$${x} = ${rel(s)}$` : `$${poly(0, a - c, 0, x)} = ${rel(d - a * b)}$ et $${x} = ${rel(s)}$`}.` };
    }
    if (t === 1) { // x/a + b = c
      const a = rand(2, 9), q = rand(-6, 9), b = nz(1, 12, true), c = q + b, v = a * q;
      return { enonce: `Résous l'équation $\\dfrac{${x}}{${a}} ${b < 0 ? "-" : "+"} ${Math.abs(b)} = ${rel(c)}$.`, mode: "nombre", prefixe: `$${x} =$`, attendu: v,
        erreurs: [{ valeur: arr((c - b) / a, 4), message: `On multiplie par $${a}$ (on ne divise pas) pour se débarrasser du dénominateur.` }, { valeur: a * c - b, message: `Isole d'abord $\\dfrac{${x}}{${a}}$ en retirant $${relP(b)}$, puis multiplie par $${a}$.` }],
        aides: [`Isole d'abord $\\dfrac{${x}}{${a}}$ : $\\dfrac{${x}}{${a}} = ${rel(c)} ${b < 0 ? "+" : "-"} ${Math.abs(b)} = ${rel(q)}$.`, `Multiplie les deux membres par $${a}$.`, `$${x} = ${rel(q)} \\times ${a}$.`],
        solution: `$\\dfrac{${x}}{${a}} = ${rel(q)}$, donc $${x} = ${rel(q)} \\times ${a} = ${rel(v)}$.` };
    }
    // (ax + b)/c = (dx + e)/f par produit en croix
    const c = rand(2, 5), f = rand(2, 5), a = nz(1, 4, false), dd = nz(1, 4, false); if (a * f === dd * c || c === f) return GEN["eq3-premier"]();
    const b = nz(1, 9, true), e = ((a * s + b) * f) / c - dd * s; if (!Number.isInteger(e) || e === 0) return GEN["eq3-premier"]();
    return { enonce: `Résous l'équation $\\dfrac{${poly(0, a, b, x)}}{${c}} = \\dfrac{${poly(0, dd, e, x)}}{${f}}$.`, mode: "nombre", prefixe: `$${x} =$`, attendu: s,
      erreurs: [...(a * c !== dd * f ? [{ valeur: arr((f * e - c * b) / (c * a - f * dd), 4), message: `Produits en croix : on multiplie $${poly(0, a, b, x)}$ par $${f}$ et $${poly(0, dd, e, x)}$ par $${c}$ (pas l'inverse).` }] : []), ...(f * a + c * dd !== 0 ? [{ valeur: arr((c * e - f * b) / (f * a + c * dd), 4), message: "En faisant passer un terme de l'autre côté, on change son signe." }] : [])],
      aides: ["Utilise les produits en croix : $\\dfrac{A}{c} = \\dfrac{B}{f}$ équivaut à $f \\times A = c \\times B$.", `$${f}(${poly(0, a, b, x)}) = ${c}(${poly(0, dd, e, x)})$, soit $${poly(0, f * a, f * b, x)} = ${poly(0, c * dd, c * e, x)}$.`, `Regroupe : $${poly(0, f * a - c * dd, 0, x)} = ${rel(c * e - f * b)}$.`],
      solution: `$${poly(0, f * a, f * b, x)} = ${poly(0, c * dd, c * e, x)}$, donc ${f * a - c * dd === 1 ? `$${x} = ${rel(s)}$` : `$${poly(0, f * a - c * dd, 0, x)} = ${rel(c * e - f * b)}$ et $${x} = ${rel(s)}$`}.` };
  };

  GEN["eq3-produit"] = function () {
    const x = pick(VAR3), a = nz(1, 5, false), b = nz(1, 9, true), c = nz(1, 5, false), d = nz(1, 9, true), t = rand(0, 1);
    if (t === 0) {
      const s1 = [-b, a], s2 = [-d, c]; if ((-b) * c === (-d) * a) return GEN["eq3-produit"]();
      const v1 = -b / a, v2 = -d / c, L = v1 < v2 ? [s1, s2] : [s2, s1];
      const bonne = `$${x} = ${racTex(...L[0])}$ ou $${x} = ${racTex(...L[1])}$`;
      const faux = uniq3(bonne, [`$${x} = ${racTex(b, a)}$ ou $${x} = ${racTex(d, c)}$`, `$${x} = ${racTex(-b * a, 1)}$ ou $${x} = ${racTex(-d * c, 1)}$`, `$${x} = ${racTex(a, -b)}$ ou $${x} = ${racTex(c, -d)}$`, `$${x} = ${racTex(...L[0])}$ seulement`]);
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `Résous l'équation produit $${facteur(a, b, x)}${facteur(c, d, x)} = 0$.`, mode: "choix", choix, attendu,
        aides: ["Un produit est nul si et seulement si l'un au moins de ses facteurs est nul.", `Donc $${poly(0, a, b, x)} = 0$ ou $${poly(0, c, d, x)} = 0$.`, `Résous chacune : $${poly(0, a, 0, x)} = ${rel(-b)}$ et $${poly(0, c, 0, x)} = ${rel(-d)}$.`],
        solution: `$${poly(0, a, b, x)} = 0$ donne $${x} = ${racTex(-b, a)}$ ; $${poly(0, c, d, x)} = 0$ donne $${x} = ${racTex(-d, c)}$. Les solutions sont $${racTex(...L[0])}$ et $${racTex(...L[1])}$.` };
    }
    // factoriser d'abord : x² + kx = 0 ou x² − m² = 0
    const u = rand(0, 1), k = nz(1, 9, true), m = rand(1, 9);
    const ex = u ? poly(1, k, 0, x) : poly(1, 0, -m * m, x), S = u ? solTex([0, -k]) : [-m, m];
    const bonne = `$${x} = ${rel(S[0])}$ ou $${x} = ${rel(S[1])}$`;
    const faux = uniq3(bonne, u ? [`$${x} = ${rel(-k)}$ seulement`, `$${x} = 0$ ou $${x} = ${rel(k)}$`, `$${x} = ${rel(k)}$ ou $${x} = ${rel(-k)}$`, `$${x} = 0$ seulement`] : [`$${x} = ${m}$ seulement`, `$${x} = ${rel(-m * m)}$ ou $${x} = ${m * m}$`, "aucune solution", `$${x} = ${m * m}$`]);
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: `Résous l'équation $${ex} = 0$ (factorise d'abord le membre de gauche).`, mode: "choix", choix, attendu,
      aides: [u ? `Mets $${x}$ en facteur : $${ex} = ${x}(${poly(0, 1, k, x)})$.` : `$${ex} = (${x} - ${m})(${x} + ${m})$.`, "Un produit est nul si l'un de ses facteurs est nul.", u ? `$${x} = 0$ ou $${poly(0, 1, k, x)} = 0$.` : `$${x} - ${m} = 0$ ou $${x} + ${m} = 0$.`],
      solution: u ? `$${x}(${poly(0, 1, k, x)}) = 0$ : $${x} = 0$ ou $${x} = ${rel(-k)}$.` : `$(${x} - ${m})(${x} + ${m}) = 0$ : $${x} = ${m}$ ou $${x} = -${m}$.` };
  };

  // Parabole y = x² et droite horizontale y = a : nombre de solutions de x² = a
  const paraFig3 = (a) => { const ymax = a <= 8 ? 10 : 17, ymin = Math.min(-2, a - 1); return repere3({ xmin: -4, xmax: 4, ymin, ymax, lignes: [a], courbes: [{ f: (z) => z * z, nom: "y = x²", lab: [3.9, a < 0 ? 2 : ymin + 0.6, "end"] }], points: a > 0 ? [[-Math.sqrt(a), a], [Math.sqrt(a), a]] : a === 0 ? [[0, 0]] : [], etiq: [[-3.9, a + 0.4, `y = ${String(a).replace("-", "−")}`, "g-hlabel"]], aria: `Parabole d'équation y = x² et droite horizontale d'équation y = ${a} : ${a > 0 ? "deux points d'intersection" : a === 0 ? "un seul point commun" : "aucun point d'intersection"}` }); };
  // Carré de côté c (inconnu) et d'aire donnée
  const carreAire3 = (aireT) => sv3(320, 150, `Carré d'aire ${aireT} et de côté inconnu c`, `<rect class="g-rect" x="105" y="14" width="110" height="110"/>` + tx3(160, 74, aireT, "g-plabel", "middle") + tx3(160, 141, "c", "g-mesure", "middle") + tx3(96, 73, "c", "g-mesure", "end"));

  GEN["eq3-carre"] = function () {
    const x = pick(VAR3), t = rand(0, 5);
    if (t === 3) { // problème : un carré d'aire donnée
      const c = rand(2, 30), A = c * c, [obj, u] = pick([["Un carreau carré", "cm"], [`Un terrain carré à ${pick(VILLES3)}`, "m"], ["Une parcelle carrée de manioc", "m"], ["Une nappe carrée", "cm"], ["Un bassin carré pour les tortues du centre de soins", "m"]]);
      return { enonce: `${obj} a une aire de $${nb(A)}$ ${u}². On note $c$ la longueur de son côté. Résous $c^2 = ${A}$ pour trouver $c$.`, figure: carreAire3(`${nbTexte(A)} ${u}²`), mode: "nombre", prefixe: "$c =$", suffixe: u, attendu: c,
        erreurs: [{ valeur: A / 2, message: "Le carré n'est pas le double : on cherche le nombre qui, multiplié par lui-même, donne l'aire." }, { valeur: A / 4, message: "L'aire n'est pas le périmètre : on ne divise pas par $4$, on cherche le nombre dont le carré vaut l'aire." }],
        aides: [`$c^2 = ${A}$ a deux solutions, $\\sqrt{${A}}$ et $-\\sqrt{${A}}$.`, "Une longueur est positive.", `$\\sqrt{${A}} = ${c}$.`], solution: `$c = \\sqrt{${A}} = ${c}$ ${u} (on écarte $-${c}$, car une longueur est positive).` };
    }
    if (t === 5) { // solution positive (carrés parfaits jusqu'à 144)
      const r = rand(2, 12), a = r * r;
      return { enonce: `Quelle est la solution positive de l'équation $${x}^2 = ${a}$ ?`, mode: "nombre", prefixe: `$${x} =$`, attendu: r,
        erreurs: [{ valeur: a / 2, message: `$${x}^2$, c'est $${x} \\times ${x}$, pas $2 \\times ${x}$.` }, { valeur: a, message: `On cherche le nombre dont le carré vaut $${a}$.` }],
        aides: ["Cherche un nombre positif qui, multiplié par lui-même, donne le nombre de droite.", "Les carrés parfaits à connaître : $1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144$.", `$\\sqrt{${a}} = \\ldots$`],
        solution: `$${r} \\times ${r} = ${a}$ : la solution positive est $${x} = \\sqrt{${a}} = ${r}$ (l'autre solution est $-${r}$).` };
    }
    let a, eq, etape = "";
    if (t === 4) { // se ramener à x² = a
      const v = rand(0, 2), k = rand(2, 5), r = rand(1, 9), b = rand(1, 20);
      if (v === 0) { a = r * r; eq = `${k}${x}^2 = ${k * a}`; etape = `On divise par $${k}$ : $${x}^2 = ${a}$. `; }
      else { a = v === 1 ? r * r : -rand(1, 15); eq = `${x}^2 + ${b} = ${rel(a + b)}`; etape = `On retire $${b}$ : $${x}^2 = ${rel(a)}$. `; }
    } else a = t === 0 ? rand(1, 12) ** 2 : t === 1 ? (Math.random() < 0.2 ? 0 : -rand(1, 50)) : pick([2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 17, 19, 20, 21, 23]);
    const S = a > 0 ? (Number.isInteger(Math.sqrt(a)) ? [`-${Math.sqrt(a)}`, `${Math.sqrt(a)}`] : [`-\\sqrt{${a}}`, `\\sqrt{${a}}`]) : a === 0 ? ["0"] : [];
    const bonne = ensemble(S, x);
    const faux = uniq3(bonne, a > 0 ? [ensemble([S[1]], x), ensemble([`${a / 2}`.replace(".", "{,}")], x), "aucune solution", ensemble([`-${a}`, `${a}`], x)] : a === 0 ? ["aucune solution", ensemble(["-1", "1"], x), ensemble(["1"], x)] : [ensemble([`-\\sqrt{${-a}}`, `\\sqrt{${-a}}`], x), ensemble([`-\\sqrt{${-a}}`], x), ensemble([`${a}`], x), ensemble(["0"], x)]);
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: `L'équation $${eq || `${x}^2 = ${rel(a)}`}$ a :`, mode: "choix", choix, attendu, figureSolution: Math.abs(a) <= 16 ? paraFig3(a) : undefined,
      aides: [eq ? `Ramène-toi à une équation $${x}^2 = a$.` : "Un carré est toujours positif ou nul.", "Si $a > 0$, $x^2 = a$ a deux solutions : $\\sqrt{a}$ et $-\\sqrt{a}$.", "Si $a < 0$, $x^2 = a$ n'a pas de solution ; si $a = 0$, une seule : $0$."],
      solution: etape + (a > 0 ? `$${rel(a)} > 0$ : deux solutions, $${S[0]}$ et $${S[1]}$.` : a === 0 ? `$${x}^2 = 0$ a une seule solution : $0$.` : `$${rel(a)} < 0$ et un carré n'est jamais négatif : aucune solution.`) + (Math.abs(a) <= 16 ? ` Sur la figure, on compte les points communs à la parabole d'équation $y = x^2$ et à la droite horizontale d'équation $y = ${rel(a)}$.` : "") };
  };

  // Rectangle de largeur x et de longueur x + k ; carré agrandi d'une bande de largeur k
  const rectEq3 = (labL, labl, aria, dedans) => sv3(320, 150, aria, `<rect class="g-rect" x="60" y="16" width="200" height="104"/>` + tx3(160, 138, labL, "g-mesure", "middle") + tx3(52, 72, labl, "g-mesure", "end") + (dedans ? tx3(160, 72, dedans, "g-plabel", "middle") : ""));
  function carreAgrandi3(kL, aria) {
    const x0 = 96, y0 = 14, c = 104, e = 30;
    let s = `<rect class="g-barre-plus" x="${x0}" y="${y0}" width="${c + e}" height="${c + e}"/><rect class="g-rect" x="${x0}" y="${y0 + e}" width="${c}" height="${c}"/>`;
    s += tx3(x0 + c / 2, y0 + e + c / 2 + 4, "carré de départ", "g-plabel", "middle") + tx3(x0 + c / 2, y0 + c + e + 15, "x", "g-mesure", "middle") + tx3(x0 + c + e / 2, y0 + c + e + 15, kL, "g-mesure", "middle");
    s += tx3(x0 - 6, y0 + e + c / 2 + 4, "x", "g-mesure", "end") + tx3(x0 - 6, y0 + e / 2 + 4, kL, "g-mesure", "end");
    return sv3(320, y0 + c + e + 24, aria, s);
  }

  GEN["eq3-problemes"] = function () {
    const t = rand(0, 3);
    if (t === 0) { // rectangle : longueur = largeur + k, périmètre P
      const l = rand(3, 25), k = rand(2, 12), P = 2 * (2 * l + k), [obj, u] = pick([[`Un jardin rectangulaire à ${pick(VILLES3)}`, "m"], ["Une table rectangulaire", "dm"], ["Le cadre rectangulaire d'une photo", "cm"], [`Un terrain de jeu rectangulaire à ${pick(VILLES3)}`, "m"], ["Un enclos rectangulaire pour les cabris", "m"]]);
      return { enonce: `${obj} a un périmètre de $${P}$ ${u}. Sa longueur dépasse sa largeur de $${k}$ ${u}. Quelle est sa largeur ?`, figure: rectEq3(`x + ${k}`, "x", `Rectangle de largeur x et de longueur x + ${k}, de périmètre ${P} ${u}`, `périmètre : ${P} ${u}`), mode: "nombre", prefixe: "Largeur :", suffixe: u, attendu: l,
        erreurs: [{ valeur: l + k, message: "Ça, c'est la longueur." }, { valeur: (P - k) / 2, message: "Le périmètre compte deux largeurs et deux longueurs." }],
        aides: [`Soit $x$ la largeur ; la longueur est $x + ${k}$.`, `$2(x + x + ${k}) = ${P}$.`, `$4x + ${2 * k} = ${P}$.`], solution: `$2(x + x + ${k}) = ${P}$, soit $4x + ${2 * k} = ${P}$, donc $4x = ${P - 2 * k}$ et $x = ${l}$ ${u}.` };
    }
    if (t === 1) { // âges
      let f, r, p; do { f = rand(5, 16); r = rand(3, 5); p = r * f; } while (p - f < 18 || p > 60);
      const n = rand(2, 12), parent = Math.random() < 0.5 ? pick(["Ambdi", "Hamada", "Moussa", "Saïd", "Kamal", "Soilihi"]) : pick(["Fatima", "Mariama", "Djamila", "Zalifa", "Roukia"]), fille = Math.random() < 0.5, E = pick(fille ? ["Nasra", "Awa", "Faïza", "Anchya", "Raïssa"] : ["Toiyb", "Nassim", "Anli", "Ibrahim", "Ousseni"]);
      return { enonce: `${parent} a $${r}$ fois l'âge de ${fille ? "sa fille" : "son fils"} ${E}. Dans $${n}$ ans, la somme de leurs deux âges sera $${p + f + 2 * n}$ ans. Quel est l'âge actuel de ${E} ?`, mode: "nombre", prefixe: `Âge de ${E} :`, suffixe: "ans", attendu: f,
        erreurs: [{ valeur: p, message: `Ça, c'est l'âge de ${parent}.` }, { valeur: (p + f + n) / (r + 1), message: `Dans $${n}$ ans, chacun aura vieilli de $${n}$ ans : on ajoute $${2 * n}$ en tout.` }],
        aides: [`Soit $x$ l'âge de ${E} ; ${parent} a $${r}x$ ans.`, `Dans $${n}$ ans : $(x + ${n}) + (${r}x + ${n}) = ${p + f + 2 * n}$.`, `$${r + 1}x + ${2 * n} = ${p + f + 2 * n}$.`], solution: `$${r + 1}x + ${2 * n} = ${p + f + 2 * n}$, donc $${r + 1}x = ${p + f}$ et $x = ${f}$ : ${E} a $${f}$ ans (et ${parent} $${p}$ ans).` };
    }
    if (t === 2) { // deux tarifs
      const a = rand(4, 9), b = rand(1, a - 1), fixe = rand(2, 8) * 5;
      if (fixe % (a - b)) return GEN["eq3-problemes"]();
      const N = fixe / (a - b), [lieu, un, des] = pick([["Un club de plongée de Petite-Terre", "plongée", "plongées"], ["Le cinéma de Mamoudzou", "séance", "séances"], ["Un club de kayak de Sada", "sortie", "sorties"], ["La salle de sport de Koungou", "séance", "séances"], ["Une piscine", "entrée", "entrées"]]);
      return { enonce: `${lieu} propose deux tarifs : A, $${a}$ € par ${un} ; B, un abonnement de $${fixe}$ € puis $${b}$ € par ${un}. Pour combien de ${des} les deux tarifs coûtent-ils le même prix ?`, mode: "nombre", prefixe: `Nombre de ${des} :`, attendu: N,
        erreurs: [{ valeur: arr(fixe / a, 2), message: `Le tarif B coûte aussi $${b}$ € par ${un}.` }, { valeur: arr(fixe / (a + b), 4), message: `Résous $${a}x = ${fixe} + ${coefX(b, "x")}$ : on soustrait $${coefX(b, "x")}$ aux deux membres, on ne l'ajoute pas.` }],
        aides: [`Soit $x$ le nombre de ${des}.`, `Tarif A : $${a}x$ ; tarif B : $${fixe} + ${coefX(b, "x")}$.`, `Résous $${a}x = ${fixe} + ${coefX(b, "x")}$.`], solution: `$${a}x = ${fixe} + ${coefX(b, "x")}$ donne $${coefX(a - b, "x")} = ${fixe}$, donc $x = ${N}$ ${des}.` };
    }
    const c = rand(3, 12), k = rand(1, 6), s = c + k, d = s * s - c * c, [obj, u] = pick([[`Un potager carré à ${pick(VILLES3)}`, "m"], ["Un carreau de faïence", "cm"], ["Une serviette carrée", "cm"], ["Un bassin carré", "m"]]); // carré agrandi : (c + k)² − c² = d
    return { enonce: `${obj} a des côtés de $x$ ${u}. Si on augmente son côté de $${k}$ ${u}, son aire augmente de $${d}$ ${u}². Quel est le côté du carré de départ ?`, figure: carreAgrandi3(`${k} ${u}`, `Carré de côté x agrandi d'une bande de largeur ${k} ${u} sur deux côtés ; l'aire de la bande vaut ${d} ${u}²`), mode: "nombre", prefixe: "$x =$", suffixe: u, attendu: c,
      erreurs: [{ valeur: s, message: "Ça, c'est le côté du carré agrandi." }, { valeur: arr(d / (2 * k), 4), message: `$(x + ${k})^2 = x^2 + ${2 * k}x + ${k * k}$ : n'oublie pas le terme $${k * k}$.` }],
      aides: [`L'aire passe de $x^2$ à $(x + ${k})^2$ : $(x + ${k})^2 - x^2 = ${d}$.`, `Développe : $x^2 + ${2 * k}x + ${k * k} - x^2 = ${d}$.`, `$${2 * k}x + ${k * k} = ${d}$.`], solution: `$(x + ${k})^2 - x^2 = ${2 * k}x + ${k * k} = ${d}$, donc $${2 * k}x = ${d - k * k}$ et $x = ${c}$ ${u}.` };
  };

  FIGURES["eq3-cours-balance"] = () => balance3([3, 2], [1, 8]);
  FIGURES["eq3-cours-produit"] = () => repere3({ xmin: -1, xmax: 5, ymin: -4, ymax: 5, courbes: [{ f: (z) => z * z - 4 * z, nom: "y = x² − 4x", lab: [2, 3.5] }], points: [[0, 0, "0", -5, -6], [4, 0, "4", 5, -6]], aria: "Courbe de y = x² − 4x : elle coupe l'axe des abscisses en x = 0 et x = 4" });
  FIGURES["eq3-cours-carre"] = () => repere3({ xmin: -4, xmax: 4, ymin: -3, ymax: 10, lignes: [4, -2], courbes: [{ f: (z) => z * z, nom: "y = x²", lab: [3.9, 0.6, "end"] }], points: [[-2, 4], [2, 4]], etiq: [[-3.9, 4.4, "y = 4", "g-hlabel"], [-3.9, -1.6, "y = −2", "g-hlabel"]], aria: "Parabole y = x² : la droite y = 4 la coupe en x = −2 et x = 2, la droite y = −2 ne la coupe pas" });
  FIGURES["eq3-qcm-balance"] = () => balance3([4, 3], [2, 11]);

  /* =====================================================================
     Chapitre 5 : arithmétique (ar3-) — critères, décomposition, diviseurs communs, preuves
     ===================================================================== */
  const premier3 = (n) => { if (n < 2) return false; for (let k = 2; k * k <= n; k++) if (n % k === 0) return false; return true; };
  const decompo3 = (n) => { const f = []; let m = n, p = 2; while (m > 1) { while (m % p === 0) { f.push(p); m /= p; } p++; } return f; };
  const decTex3 = (n) => { const c = {}; decompo3(n).forEach((p) => { c[p] = (c[p] || 0) + 1; }); return Object.keys(c).map((p) => (c[p] > 1 ? `${p}^{${c[p]}}` : p)).join(" \\times "); };
  const nbDiv3 = (n) => { const c = {}; decompo3(n).forEach((p) => { c[p] = (c[p] || 0) + 1; }); return Object.values(c).reduce((a, k) => a * (k + 1), 1); };
  // Arbre de décomposition « en échelle » : n = p × (n / p), etc. ; les nombres premiers sont entourés ; cache = indice du nœud remplacé par « ? »
  function arbreFact3(n, cache, aria) {
    const f = decompo3(n), noeuds = []; let s = "", x = 70, y = 22, m = n;
    const noeud = (x, y, t, prem) => { const i = noeuds.length; noeuds.push(t); return (prem ? `<circle class="g-rect" cx="${r3(x)}" cy="${r3(y - 4)}" r="${String(t).length > 2 ? 16 : 13}"/>` : "") + tx3(x, y, i === cache ? "?" : nbTexte(t), i === cache ? "g-mesure" : "g-plabel", "middle"); };
    s += noeud(x, y, m, f.length === 1);
    f.slice(0, -1).forEach((p, i) => {
      const q = m / p, y2 = y + 32;
      s += ln3(x - 5, y + 5, x - 22, y2 - 16, "g-droite") + ln3(x + 5, y + 5, x + 22, y2 - 16, "g-droite") + noeud(x - 28, y2, p, true) + noeud(x + 28, y2, q, i === f.length - 2);
      x += 28; y = y2; m = q;
    });
    return { svg: sv3(320, y + 18, aria || `Arbre de décomposition de ${nbTexte(n)} en facteurs premiers${cache != null ? ", un nombre est remplacé par un point d'interrogation" : ""}`, s), noeuds };
  }
  // Rectangle de p × q carreaux ; liste de rectangles pour les diviseurs
  function rectCarreaux3(p, q, x0, y0, c) {
    let s = `<rect class="g-carreau" x="${x0}" y="${y0}" width="${q * c}" height="${p * c}"/><g class="g-grid">`;
    for (let i = 1; i < q; i++) s += ln3(x0 + i * c, y0, x0 + i * c, y0 + p * c, "");
    for (let j = 1; j < p; j++) s += ln3(x0, y0 + j * c, x0 + q * c, y0 + j * c, "");
    return s + `</g><rect class="g-unite" x="${x0}" y="${y0}" width="${q * c}" height="${p * c}"/>`;
  }
  function rectDiviseurs3(n) {
    const P = []; for (let p = 1; p * p <= n; p++) if (n % p === 0) P.push([p, n / p]);
    const c = Math.min(14, Math.floor(280 / n)); let s = "", y = 10, x = 20, h = 0;
    P.forEach(([p, q]) => { const w = q * c; if (x + w > 304) { x = 20; y += h + 24; h = 0; } s += rectCarreaux3(p, q, x, y, c) + tx3(x + w / 2, y + p * c + 13, `${p} × ${q}`, "g-mesure", "middle"); x += w + 22; h = Math.max(h, p * c); });
    return sv3(320, y + h + 22, `Rectangles formés avec ${n} carreaux : ${P.map(([p, q]) => `${p} × ${q}`).join(", ")}`, s);
  }
  // Pièce rectangulaire de A × B (cm) ; carrelée par des carrés de côté g si « montrer »
  function carrelage3(A, B, g, montrer, aria) {
    const k = Math.min(250 / A, 140 / B), w = A * k, h = B * k, x0 = 52, y0 = 12;
    let s = montrer ? rectCarreaux3(B / g, A / g, x0, y0, g * k) : `<rect class="g-rect" x="${x0}" y="${y0}" width="${r3(w)}" height="${r3(h)}"/>`;
    s += tx3(x0 + w / 2, y0 + h + 15, `${nbTexte(A)} cm`, "g-mesure", "middle") + tx3(x0 - 6, y0 + h / 2 + 4, `${nbTexte(B)} cm`, "g-mesure", "end");
    return sv3(320, y0 + h + 24, aria || `Rectangle de ${A} cm sur ${B} cm${montrer ? `, pavé par des carrés de ${g} cm de côté` : ""}`, s);
  }

  GEN["ar3-criteres"] = function () {
    const t = rand(0, 3);
    if (t === 3) { // rectangles de carreaux : nombre de diviseurs
      const n = pick([12, 16, 18, 20, 24, 28, 30, 32, 36, 40, 42, 44, 45, 48, 50, 54, 60, 63, 64, 72]), D = nbDiv3(n), R = Math.ceil(D / 2), P = []; for (let p = 1; p * p <= n; p++) if (n % p === 0) P.push([p, n / p]);
      const [p, q] = pick(P.filter(([a]) => a > 1 && a <= 6)) || P[1] || P[0], nom = pick(PRENOMS3);
      return { enonce: `${nom} a $${n}$ carreaux carrés identiques. ${il3(nom) === "elle" ? "Elle" : "Il"} veut former un rectangle plein en les utilisant tous, comme celui de la figure ($${p} \\times ${q}$). Combien de rectangles différents peut-${il3(nom)} former ? (Un rectangle et le même tourné d'un quart de tour comptent pour un seul.)`, figure: sv3(320, p * Math.min(18, Math.floor(280 / q)) + 20, `Rectangle de ${p} rangées de ${q} carreaux`, rectCarreaux3(p, q, 160 - (q * Math.min(18, Math.floor(280 / q))) / 2, 10, Math.min(18, Math.floor(280 / q)))), mode: "nombre", prefixe: "Rectangles :", attendu: R,
        erreurs: [{ valeur: D, message: "Ça, c'est le nombre de diviseurs : chaque rectangle correspond à deux diviseurs (largeur et longueur)." }, { valeur: R - 1, message: `N'oublie pas le rectangle d'une seule rangée : $1 \\times ${n}$.` }],
        aides: ["Un rectangle de $a$ rangées de $b$ carreaux utilise $a \\times b$ carreaux.", `Cherche toutes les façons d'écrire $${n} = a \\times b$ avec $a \\leqslant b$.`, `Liste les diviseurs de $${n}$ et associe-les deux par deux.`],
        solution: `$${n} = ${P.map(([a, b]) => `${a} \\times ${b}`).join(" = ")}$ : il y a $${R}$ rectangles différents.` };
    }
    if (t === 0) { // chiffre manquant pour être divisible par 9
      for (;;) {
        const L = Array.from({ length: rand(3, 4) }, () => rand(0, 9)); L[0] = rand(1, 9); const pos = rand(1, L.length);
        const s = L.reduce((a, b) => a + b, 0), c = (9 - (s % 9)) % 9; if (c === 0) continue;
        const ecr = [...L.slice(0, pos), "\\square", ...L.slice(pos)].join("");
        return { enonce: `Quel chiffre faut-il écrire à la place de $\\square$ pour que le nombre $${ecr}$ soit divisible par $9$ ?`, mode: "nombre", prefixe: "Chiffre :", attendu: c,
          erreurs: [{ valeur: (3 - (s % 3)) % 3, message: "Ce chiffre rend le nombre divisible par $3$, mais pas forcément par $9$." }],
          aides: ["Un nombre est divisible par $9$ si la somme de ses chiffres est un multiple de $9$.", `Somme des chiffres connus : $${L.join(" + ")} = ${s}$.`, `Quel chiffre ajouter à $${s}$ pour obtenir un multiple de $9$ ?`],
          solution: `$${s} + ${c} = ${s + c}$, qui est un multiple de $9$ : le chiffre est $${c}$.` };
      }
    }
    if (t === 1) { // reste de la division euclidienne
      const b = rand(6, 25), q = rand(4, 60), r = rand(1, b - 1), a = b * q + r;
      return { enonce: `Quel est le reste de la division euclidienne de $${nb(a)}$ par $${b}$ ?`, mode: "nombre", prefixe: "Reste :", attendu: r,
        erreurs: [{ valeur: q, message: "Ça, c'est le quotient." }],
        aides: [`Cherche le plus grand multiple de $${b}$ inférieur ou égal à $${nb(a)}$.`, `$${b} \\times ${q} = ${nb(b * q)}$.`, `Le reste est $${nb(a)} - ${nb(b * q)}$ ; il doit être inférieur à $${b}$.`],
        solution: `$${nb(a)} = ${b} \\times ${q} + ${r}$ avec $${r} < ${b}$ : le reste est $${r}$.` };
    }
    // par quels nombres est-il divisible ?
    const n = rand(10, 999) * pick([1, 2, 3, 5, 6, 9, 10, 15]);
    const d = [2, 3, 5, 9].filter((k) => n % k === 0), non = [2, 3, 5, 9].filter((k) => n % k);
    const txt = (D) => (D.length ? `par $${D.join("$, $")}$` : "par aucun de ces nombres");
    const bonne = `divisible ${txt(d)}${non.length && d.length ? `, mais pas par $${non.join("$, $")}$` : ""}`;
    const variantes = [[2, 3], [3, 5], [2, 5], [3, 9], [2, 3, 5], [5], [3], [2], [9], [2, 9]].map((D) => `divisible ${txt(D)}${[2, 3, 5, 9].filter((k) => !D.includes(k)).length ? `, mais pas par $${[2, 3, 5, 9].filter((k) => !D.includes(k)).join("$, $")}$` : ""}`);
    const faux = uniq3(bonne, shuffle(variantes));
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: `Parmi $2$, $3$, $5$ et $9$, le nombre $${nb(n)}$ est :`, mode: "choix", choix, attendu,
      aides: ["Par $2$ : chiffre des unités pair ; par $5$ : chiffre des unités $0$ ou $5$.", "Par $3$ (ou $9$) : somme des chiffres multiple de $3$ (ou de $9$).", `Somme des chiffres de $${nb(n)}$ : $${String(n).split("").join(" + ")} = ${String(n).split("").reduce((a, b) => a + +b, 0)}$.`],
      solution: `$${nb(n)}$ est ${bonne}.` };
  };

  GEN["ar3-decomposer"] = function () {
    let n; do { const f = Array.from({ length: rand(3, 6) }, () => pick([2, 2, 2, 3, 3, 5, 5, 7, 11, 13])); n = f.reduce((a, b) => a * b, 1); } while (n < 60 || n > 9000);
    const t = rand(0, 3);
    if (t === 0) {
      const f = decompo3(n), bonne = `$${decTex3(n)}$`;
      const faux = uniq3(bonne, [`$${decTex3(n / f[0])} \\times ${f[0] * f[0]}$`.replace(/\$ \\times/, "$ \\times"), `$${decTex3(n * 2)}$`, `$${decTex3((n / f[f.length - 1]) * 3)}$`, `$${f[0]} \\times ${n / f[0]}$`]);
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `Quelle est la décomposition de $${nb(n)}$ en produit de facteurs premiers ?`, mode: "choix", choix, attendu, figureSolution: arbreFact3(n).svg,
        aides: ["Tous les facteurs doivent être premiers, et leur produit doit redonner le nombre.", `Divise par $2$ autant que possible, puis par $3$, $5$, $7$…`, `Commence : $${nb(n)} = ${f[0]} \\times ${nb(n / f[0])}$.`], solution: `$${nb(n)} = ${decTex3(n)}$.` };
    }
    if (t === 2) { // arbre de décomposition avec un nombre caché
      const N = arbreFact3(n).noeuds.length; if (N < 5) return GEN["ar3-decomposer"]();
      const i = rand(1, N - 1), B = arbreFact3(n, i), V = B.noeuds, L = Math.ceil(i / 2), par = V[L === 1 ? 0 : 2 * (L - 1)], sib = V[i % 2 ? i + 1 : i - 1];
      return { enonce: `Voici un arbre de décomposition de $${nb(n)}$ en facteurs premiers (les nombres premiers sont entourés). Quel nombre est caché sous le « ? » ?`, figure: B.svg, mode: "nombre", prefixe: "? =", attendu: V[i],
        erreurs: [{ valeur: par - sib, message: `Chaque nombre de l'arbre est le **produit** des deux nombres situés en dessous : on divise $${nb(par)}$ par $${nb(sib)}$.` }, { valeur: par * sib, message: `$${nb(par)}$ est le produit des deux nombres en dessous : le « ? » est plus petit que $${nb(par)}$.` }],
        aides: ["Dans l'arbre, chaque nombre se décompose en un produit de deux nombres, placés juste en dessous.", `Repère le nombre au-dessus du « ? » : $${nb(par)}$.`, `$${nb(par)} = ${nb(sib)} \\times \\ldots$`],
        solution: `$${nb(par)} = ${i % 2 ? `${V[i]} \\times ${nb(sib)}` : `${nb(sib)} \\times ${nb(V[i])}`}$, donc le nombre caché est $${nb(V[i])}$. Finalement, $${nb(n)} = ${decTex3(n)}$.` };
    }
    if (t === 3) { // rendre une fraction irréductible avec les décompositions
      let a, b, g; do { a = rand(1, 12); b = rand(2, 15); g = pick([6, 10, 12, 14, 15, 18, 20, 21, 22, 24, 28, 30, 33, 35, 36, 42]); } while (a === b || pgcd(a, b) > 1 || g * b > 600);
      const N = g * a, D = g * b, p = decompo3(g)[0], bonne = `$${fr(a, b)}$`;
      const faux = uniq3(bonne, [`$${fr(N / p, D / p)}$`, `$${frS(b, a)}$`, ...[[a + 1, b], [a, b + 1], [a + 2, b], [a, b + 2]].filter(([u, v]) => u !== v && pgcd(u, v) === 1).map(([u, v]) => `$${fr(u, v)}$`)]);
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `On sait que $${N} = ${decTex3(N)}$ et $${D} = ${decTex3(D)}$. Quelle est la forme irréductible de $${fr(N, D)}$ ?`, mode: "choix", choix, attendu,
        aides: ["Une fraction est irréductible quand son numérateur et son dénominateur n'ont plus de diviseur commun autre que $1$.", "Repère les facteurs premiers communs aux deux décompositions.", `Le produit des facteurs communs est $${g}$ : divise le numérateur et le dénominateur par $${g}$.`],
        solution: `Les facteurs communs donnent $${decTex3(g)} = ${g}$ : $${fr(N, D)} = ${fr(`${a} \\times ${g}`, `${b} \\times ${g}`)} = ${fr(a, b)}$.` };
    }
    const k = nbDiv3(n);
    return { enonce: `On sait que $${nb(n)} = ${decTex3(n)}$. Combien $${nb(n)}$ a-t-il de diviseurs ?`, mode: "nombre", prefixe: "Diviseurs :", attendu: k,
      erreurs: [{ valeur: decompo3(n).length, message: "Ça, c'est le nombre de facteurs premiers ; les diviseurs sont tous les produits possibles de ces facteurs." }],
      aides: ["Un diviseur s'obtient en choisissant, pour chaque nombre premier, un exposant entre $0$ et celui de la décomposition.", "Si $n = p^a \\times q^b$, il y a $(a + 1)(b + 1)$ diviseurs.", `Ici : ${Object.entries(decompo3(n).reduce((c, p) => ((c[p] = (c[p] || 0) + 1), c), {})).map(([p, e]) => `$${e} + 1$`).join(", ")}.`],
      solution: `Le nombre de diviseurs est ${Object.entries(decompo3(n).reduce((c, p) => ((c[p] = (c[p] || 0) + 1), c), {})).map(([p, e]) => `$(${e} + 1)$`).join(" $\\times$ ")} $= ${k}$.` };
  };

  GEN["ar3-problemes"] = function () {
    const t = rand(0, 2);
    let a, b, g;
    do { g = rand(2, 15); a = rand(2, 12); b = rand(2, 12); } while (pgcd(a, b) !== 1 || a === b);
    const A = g * a, B = g * b;
    // [phrase de départ, objets 1, objets 2, groupes, un groupe]
    const C = pick([[`Au marché de Mamoudzou, une vendeuse a $${A}$ mangues et $${B}$ ananas.`, "mangues", "ananas", "paniers", "panier"], [`Un fleuriste a $${A}$ roses et $${B}$ fleurs d'ylang-ylang.`, "roses", "fleurs d'ylang-ylang", "bouquets", "bouquet"], [`Pour la fête du collège de ${pick(VILLES3)}, on a $${A}$ brochettes et $${B}$ samoussas.`, "brochettes", "samoussas", "barquettes", "barquette"], [`Un club de ${pick(VILLES3)} a $${A}$ ballons et $${B}$ chasubles.`, "ballons", "chasubles", "lots", "lot"], [`Une classe prépare des sachets avec $${A}$ bonbons et $${B}$ chocolats.`, "bonbons", "chocolats", "sachets", "sachet"]]);
    if (t === 0) return { enonce: `${C[0]} On veut faire le plus grand nombre de ${C[3]} identiques en utilisant tout. Combien de ${C[3]} peut-on faire ?`, mode: "nombre", prefixe: `${C[3][0].toUpperCase() + C[3].slice(1)} :`, attendu: g,
      erreurs: [{ valeur: a + b, message: `Ça, c'est le nombre d'objets dans chaque ${C[4]}.` }, ...(A % B && B % A ? [{ valeur: Math.min(A, B), message: `Le nombre de ${C[3]} doit diviser les deux nombres $${A}$ et $${B}$.` }] : [])],
      aides: [`Le nombre de ${C[3]} doit diviser $${A}$ et $${B}$.`, `$${A} = ${decTex3(A)}$ et $${B} = ${decTex3(B)}$.`, "Prends le plus grand diviseur commun : le produit des facteurs premiers communs."],
      solution: `Le plus grand diviseur commun de $${A}$ et $${B}$ est $${g}$ : $${g}$ ${C[3]} de $${a}$ ${C[1]} et $${b}$ ${C[2]}.` };
    if (t === 1) return { enonce: `On veut carreler une pièce rectangulaire de $${A * 10}$ cm sur $${B * 10}$ cm avec des carreaux carrés identiques, les plus grands possible, sans découpe. Quel est le côté d'un carreau ?`, figure: carrelage3(Math.max(A, B) * 10, Math.min(A, B) * 10, g * 10, false), figureSolution: carrelage3(Math.max(A, B) * 10, Math.min(A, B) * 10, g * 10, true), mode: "nombre", prefixe: "Côté :", suffixe: "cm", attendu: g * 10,
      erreurs: [{ valeur: a * b, message: "Ça, c'est le nombre de carreaux." }, { valeur: g, message: "Attention aux unités : les dimensions sont en centimètres." }],
      aides: [`Le côté doit diviser $${A * 10}$ et $${B * 10}$.`, `$${A * 10} = ${decTex3(A * 10)}$ et $${B * 10} = ${decTex3(B * 10)}$.`, "Prends le plus grand diviseur commun."],
      solution: `Le plus grand diviseur commun de $${A * 10}$ et $${B * 10}$ est $${g * 10}$ : carreaux de $${g * 10}$ cm de côté ($${a} \\times ${b} = ${a * b}$ carreaux).` };
    return { enonce: `${C[0]} On fait le plus grand nombre possible de ${C[3]} identiques, en utilisant tout. Combien de ${C[2]} y a-t-il dans chaque ${C[4]} ?`, mode: "nombre", prefixe: `${C[2][0].toUpperCase() + C[2].slice(1)} :`, attendu: b,
      erreurs: [{ valeur: g, message: `Ça, c'est le nombre de ${C[3]}.` }, { valeur: a, message: `Ça, c'est le nombre de ${C[1]} par ${C[4]}.` }],
      aides: [`Le nombre de ${C[3]} est le plus grand diviseur commun de $${A}$ et $${B}$.`, `C'est $${g}$.`, `Divise le nombre de ${C[2]} par $${g}$.`],
      solution: `On fait $${g}$ ${C[3]} (plus grand diviseur commun de $${A}$ et $${B}$). Dans chaque ${C[4]} : $${B} \\div ${g} = ${b}$ ${C[2]} (et $${A} \\div ${g} = ${a}$ ${C[1]}).` };
  };

  const ppdp3 = (n) => decompo3(n)[0]; // plus petit diviseur premier
  const grilleNombres3 = (a, b) => { let s = ""; for (let k = a; k <= b; k++) { const x = 15 + ((k - a) % 10) * 29, y = 6 + Math.floor((k - a) / 10) * 24; s += `<rect class="g-rect" x="${x}" y="${y}" width="27" height="21" rx="3"/>` + tx3(x + 13.5, y + 15, k, "g-plabel", "middle"); } return sv3(320, 10 + Math.ceil((b - a + 1) / 10) * 24, `Tableau des nombres entiers de ${a} à ${b}`, s); };
  const fauxPremier3 = (k) => k > 1 && !premier3(k) && k % 2 && k % 3 && k % 5; // composé mais sans diviseur 2, 3 ou 5 (49, 77, 91…)

  GEN["ar3-preuves"] = function () {
    const t = rand(0, 4);
    if (t === 0) { // nombres premiers dans un intervalle
      const a = rand(2, 190), b = a + rand(10, 30), L = [], F = []; for (let k = a; k <= b; k++) { if (premier3(k)) L.push(k); else if (fauxPremier3(k)) F.push(k); }
      return { enonce: `Combien y a-t-il de nombres premiers entre $${a}$ et $${b}$ (compris) ? Les nombres sont dans le tableau.`, figure: grilleNombres3(a, b), mode: "nombre", prefixe: "Nombres premiers :", attendu: L.length,
        erreurs: F.length ? [{ valeur: L.length + F.length, message: `Attention : $${F[0]} = ${ppdp3(F[0])} \\times ${F[0] / ppdp3(F[0])}$ n'est pas premier. Teste aussi la division par $7$, $11$, $13$.` }] : [],
        aides: ["Élimine les nombres pairs et ceux qui se terminent par $0$ ou $5$, puis les multiples de $3$ (somme des chiffres).", "Teste ensuite la divisibilité par $7$, $11$, $13$.", `Il suffit de tester les nombres premiers jusqu'à $${Math.floor(Math.sqrt(b))}$, car $${Math.floor(Math.sqrt(b)) + 1}^2 > ${b}$.`],
        solution: L.length ? `Les nombres premiers entre $${a}$ et $${b}$ sont ${liste3(L)} : il y en a $${L.length}$.${F.length ? ` (Pièges : $${F.map((k) => `${k} = ${ppdp3(k)} \\times ${k / ppdp3(k)}`).join("$, $")}$.)` : ""}` : `Il n'y a aucun nombre premier entre $${a}$ et $${b}$ : la réponse est $0$.` };
    }
    if (t === 1) { // ce nombre est-il premier ?
      let n; do n = rand(31, 399); while (n % 2 === 0 || n % 5 === 0 || (!premier3(n) && Math.random() < 0.3));
      const prem = premier3(n), p = ppdp3(n), d = [3, 7, 11, 13, 17].filter((q) => n % q);
      const bonne = prem ? "Oui : ses seuls diviseurs sont $1$ et lui-même" : `Non : il est divisible par $${p}$`;
      const faux = prem ? d.slice(0, 3).map((q) => `Non : il est divisible par $${q}$`) : ["Oui : ses seuls diviseurs sont $1$ et lui-même", ...d.slice(0, 2).map((q) => `Non : il est divisible par $${q}$`), "Non : il est pair"];
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `Le nombre $${n}$ est-il premier ?`, mode: "choix", choix, attendu,
        aides: ["Un nombre premier a exactement deux diviseurs : $1$ et lui-même.", `$${n}$ est impair et ne se termine ni par $0$ ni par $5$ : teste $3$ (somme des chiffres), puis $7$, $11$, $13$…`, `Il suffit de tester les nombres premiers jusqu'à $${Math.floor(Math.sqrt(n))}$.`],
        solution: prem ? `$${n}$ n'est divisible par aucun nombre premier inférieur ou égal à $${Math.floor(Math.sqrt(n))}$ : il est premier.` : `$${n} = ${p} \\times ${n / p}$ : il n'est pas premier.` };
    }
    if (t === 2) { // plus petit diviseur premier
      let n; do n = rand(21, 399); while (premier3(n) || n % 2 === 0 || n % 5 === 0);
      const p = ppdp3(n), f = decompo3(n), g = f[f.length - 1];
      return { enonce: `Quel est le plus petit diviseur premier de $${n}$ ?`, mode: "nombre", prefixe: "Plus petit diviseur premier :", attendu: p,
        erreurs: [{ valeur: 1, message: "$1$ n'est pas un nombre premier." }, { valeur: 2, message: `$${n}$ est impair : il n'est pas divisible par $2$.` }, ...(g !== p ? [{ valeur: g, message: `$${g}$ divise bien $${n}$, mais il y a un diviseur premier plus petit.` }] : [])],
        aides: ["Teste les nombres premiers dans l'ordre : $2$, $3$, $5$, $7$, $11$…", `$${n}$ est impair et ne se termine ni par $0$ ni par $5$.`, "Pour $3$ : regarde la somme des chiffres."],
        solution: `$${n} = ${p} \\times ${n / p}$ et $${n}$ n'est divisible par aucun nombre premier plus petit que $${p}$ : la réponse est $${p}$. (Décomposition : $${n} = ${decTex3(n)}$.)` };
    }
    if (t === 4) { // nombres premiers inférieurs ou égaux à N
      const N = rand(10, 100), L = []; for (let k = 2; k <= N; k++) if (premier3(k)) L.push(k);
      return { enonce: `Combien y a-t-il de nombres premiers inférieurs ou égaux à $${N}$ ?`, mode: "nombre", prefixe: "Nombres premiers :", attendu: L.length,
        erreurs: [{ valeur: L.length + 1, message: "$1$ n'est pas un nombre premier : il n'a qu'un seul diviseur." }, { valeur: L.length - 1, message: "N'oublie pas $2$ : c'est le seul nombre premier pair." }],
        aides: ["Les nombres premiers jusqu'à $30$ sont à connaître : $2, 3, 5, 7, 11, 13, 17, 19, 23, 29$.", "Au-delà, élimine les multiples de $2$, $3$, $5$ et $7$.", "$1$ n'est pas premier."],
        solution: `Les nombres premiers inférieurs ou égaux à $${N}$ sont ${liste3(L)} : il y en a $${L.length}$.` };
    }
    const k = pick([3, 4, 6, 7, 9, 11]), [k1, k2] = pick([[2, 3], [2, 5], [3, 5], [3, 4], [2, 9], [4, 5], [2, 7]]), Q = pick([
      [`Un multiple de $${k}$ s'écrit, avec $m$ entier :`, `$${k}m$`, [`$m + ${k}$`, `$\\dfrac{m}{${k}}$`, `$m^{${k}}$`], `Un multiple de $${k}$ est $${k}$ fois un entier : $${k}m$.`],
      ["Un nombre impair s'écrit, avec $k$ entier :", "$2k + 1$", ["$2k$", "$k + 1$", "$k^2$"], "Il suit un nombre pair $2k$."],
      ["La somme de deux nombres pairs $2k + 2m$ est :", "toujours paire", ["toujours impaire", "parfois paire", "un multiple de $4$"], "$2k + 2m = 2(k + m)$."],
      ["La somme de deux nombres impairs $(2k + 1) + (2m + 1)$ est :", "toujours paire", ["toujours impaire", "un multiple de $4$", "un nombre premier"], "$2k + 2m + 2 = 2(k + m + 1)$."],
      ["La somme d'un nombre pair $2k$ et d'un nombre impair $2m + 1$ est :", "toujours impaire", ["toujours paire", "un multiple de $3$", "parfois paire"], "$2k + 2m + 1 = 2(k + m) + 1$."],
      ["Le produit de deux nombres impairs est :", "toujours impair", ["toujours pair", "un multiple de $4$", "parfois pair"], "$(2k + 1)(2m + 1) = 2(2km + k + m) + 1$."],
      ["Le produit d'un nombre pair $2k$ par un entier $m$ est :", "toujours pair", ["toujours impair", "parfois impair", "un nombre premier"], "$2k \\times m = 2(km)$."],
      ["$2$ est :", "le seul nombre premier pair", ["un nombre composé", "un nombre qui n'est pas premier", "divisible par $4$"], "Ses seuls diviseurs sont $1$ et $2$."],
      ["Le nombre $1$ est :", "ni premier ni composé", ["premier", "pair", "un multiple de tous les nombres"], "Il n'a qu'un seul diviseur."],
      [`Si un nombre est divisible par $${k1 * k2}$, alors il est divisible :`, `par $${k1}$ et par $${k2}$`, [`par $${2 * k1 * k2}$`, `par $${k1 + k2}$`, `par $${k1 * k1}$`], `$${k1 * k2} = ${k1} \\times ${k2}$ : un multiple de $${k1 * k2}$ est un multiple de $${k1}$ et de $${k2}$.`],
      ["Le carré d'un nombre pair $(2k)^2$ est :", "un multiple de $4$", ["impair", "un nombre premier", "un multiple de $3$"], "$(2k)^2 = 4k^2$."],
      ["Tout nombre entier supérieur ou égal à $2$ :", "se décompose de façon unique en produit de facteurs premiers", ["est un nombre premier", "a un nombre pair de diviseurs", "est divisible par $2$"], "C'est la décomposition en facteurs premiers (à l'ordre des facteurs près)."],
      ["Un nombre premier supérieur à $2$ est toujours :", "impair", ["pair", "un multiple de $3$", "terminé par $1$"], "S'il était pair, il serait divisible par $2$."],
      ["Le reste de la division euclidienne d'un nombre pair par $2$ est :", "$0$", ["$1$", "$2$", "on ne peut pas savoir"], "Un nombre pair est divisible par $2$ : le reste est nul."]
    ]);
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu, aides: ["Écris les nombres avec des lettres : pair $= 2k$, impair $= 2k + 1$, multiple de $3$ $= 3k$.", "Développe et factorise pour faire apparaître la forme voulue.", "Un nombre premier a exactement deux diviseurs."], solution: Q[3] };
  };

  FIGURES["ar3-cours-diviseurs"] = () => rectDiviseurs3(12);
  FIGURES["ar3-cours-arbre"] = () => arbreFact3(360).svg;
  FIGURES["ar3-cours-carrelage"] = () => carrelage3(84, 60, 12, true);
  FIGURES["ar3-methode-arbre"] = () => arbreFact3(180).svg;
  FIGURES["ar3-methode-carrelage"] = () => carrelage3(126, 90, 18, true);
  FIGURES["ar3-qcm-arbre"] = () => arbreFact3(84, 4).svg;
  FIGURES["ar3-qcm-rect"] = () => sv3(320, 74, "Rectangle de 3 rangées de 6 carreaux", rectCarreaux3(3, 6, 106, 10, 18));

  /* =====================================================================
     Chapitre 6 : notion de fonction (fn3-) — image, antécédent, tableau, courbe
     ===================================================================== */
  // Repère quadrillé (unité = 1) avec la courbe de f sur [xmin ; xmax] ; o.lignes : droites horizontales y = k en pointillés
  function repere3(o) {
    const { f, xmin, xmax, ymin, ymax } = o, px = o.pasX || 1, py = o.pasY || 1, u = Math.min(28 / px, 300 / (xmax - xmin)), v = Math.min(24 / py, 260 / (ymax - ymin));
    const mx = o.pasY > 1 ? 26 : 18, my = 12, W = Math.round(mx * 2 + u * (xmax - xmin)), H = Math.round(my * 2 + v * (ymax - ymin) + (ymin >= 0 ? 12 : 0) + (o.titreX ? 14 : 0));
    const X = (x) => +(mx + (x - xmin) * u).toFixed(1), Y = (y) => +(my + (ymax - y) * v).toFixed(1);
    let s = `<svg class="graph repere3" viewBox="0 0 ${W} ${H}" style="max-width:${W}px" role="img" aria-label="${o.aria}"><g class="g-grid">`;
    for (let x = xmin; x <= xmax + 1e-9; x += px) s += `<line x1="${X(x)}" y1="${Y(ymax)}" x2="${X(x)}" y2="${Y(ymin)}"/>`;
    for (let y = ymin; y <= ymax + 1e-9; y += py) s += `<line x1="${X(xmin)}" y1="${Y(y)}" x2="${X(xmax)}" y2="${Y(y)}"/>`;
    s += `</g><g class="g-axis"><line x1="${X(xmin)}" y1="${Y(0)}" x2="${X(xmax)}" y2="${Y(0)}"/><line x1="${X(0)}" y1="${Y(ymin)}" x2="${X(0)}" y2="${Y(ymax)}"/></g><g class="g-tick">`;
    const tN = (v) => (v < 0 ? "−" : "") + nbTexte(Math.abs(v));
    for (let x = xmin; x <= xmax + 1e-9; x += px) if (Math.abs(x) > 1e-9 && ((xmax - xmin) / px <= 12 || Math.round(x / px) % 2 === 0)) s += `<text x="${X(x)}" y="${Y(0) + 12}" text-anchor="middle">${tN(x)}</text>`;
    for (let y = ymin; y <= ymax + 1e-9; y += py) if (Math.abs(y) > 1e-9 && ((ymax - ymin) / py <= 12 || Math.round(y / py) % 2 === 0)) s += `<text x="${X(0) - 4}" y="${Y(y) + 4}" text-anchor="end">${tN(y)}</text>`;
    s += `<text x="${X(0) - 4}" y="${Y(0) + 12}" text-anchor="end">0</text>${o.titreX ? `<text x="${X(xmax)}" y="${Y(0) + 27}" text-anchor="end">${o.titreX}</text>` : ""}${o.titreY ? `<text x="${X(0) + 4}" y="${my + 4}">${o.titreY}</text>` : ""}</g>`;
    (o.segs || []).forEach(([x1, y1, x2, y2, cl]) => { s += ln3(X(x1), Y(y1), X(x2), Y(y2), cl || "g-guide"); });
    (o.lignes || []).forEach((k) => { s += `<line class="g-hline" x1="${X(xmin)}" y1="${Y(k)}" x2="${X(xmax)}" y2="${Y(k)}"/>`; });
    (o.guides || []).forEach(([x, y]) => { s += ln3(X(x), Y(0), X(x), Y(y), "g-guide") + ln3(X(0), Y(y), X(x), Y(y), "g-guide"); });
    // courbes : o.f (nom o.nom en haut à droite) et/ou o.courbes = [{ f, nom, cl, lab: [x, y] }]
    const trace = (g, cl, tiret) => { const P = []; for (let i = 0; i <= 120; i++) { const x = xmin + ((xmax - xmin) * i) / 120, y = g(x); if (y >= ymin - 0.01 && y <= ymax + 0.01) P.push(`${X(x)},${Y(y)}`); else if (P.length && P[P.length - 1] !== "|") P.push("|"); } P.join(" ").split("|").filter((z) => z.trim()).forEach((seg) => { s += `<polyline class="g-curve${cl ? " " + cl : ""}"${tiret ? ' style="stroke-dasharray:8 5"' : ""} points="${seg.trim()}"/>`; }); };
    if (f) trace(f);
    (o.courbes || []).forEach((c) => { trace(c.f, c.cl, c.tiret); if (c.nom) s += tx3(X(c.lab[0]), Y(c.lab[1]), c.nom, `g-clabel${c.cl ? " " + c.cl : " g-curve-0"}`, c.lab[2] || "middle"); });
    (o.points || []).forEach(([x, y, lab, dx, dy]) => { s += `<circle class="g-point" cx="${X(x)}" cy="${Y(y)}" r="3.5"/>` + (lab ? tx3(X(x) + (dx == null ? 5 : dx), Y(y) + (dy == null ? -6 : dy), lab, "g-plabel", dx < 0 ? "end" : null) : ""); });
    (o.etiq || []).forEach(([x, y, t, cl, anc]) => { s += tx3(X(x), Y(y), t, cl || "g-hlabel", anc); });
    return s + (f ? `<text class="g-plabel" x="${X(xmax) - 4}" y="${Y(ymax) + 14}" text-anchor="end">${o.nom || "𝒞"}</text>` : "") + `</svg>`;
  }
  // parabole y = p(x − h)² + m tenant dans la fenêtre, valeurs entières aux points utiles
  const parabole3 = () => {
    for (;;) {
      const p = pick([1, -1, 0.5, -0.5]), h = rand(-2, 2), m = rand(-4, 4), f = (x) => p * (x - h) ** 2 + m;
      const xmin = h - 4, xmax = h + 4, ys = [xmin, xmax].map(f); const ymin = Math.floor(Math.min(m, ...ys)), ymax = Math.ceil(Math.max(m, ...ys));
      if (ymax - ymin > 14 || ymin > 0 || ymax < 0 || xmin > 0 || xmax < 0) continue;
      return { p, h, m, f, xmin, xmax, ymin: Math.min(ymin, -1), ymax: Math.max(ymax, 1) };
    }
  };

  // « Machine » : nombre de départ → fonction → image
  function machine3(entree, nom, sortie, aria) {
    const w = Math.max(116, nom.length * 6.6 + 24);
    let s = `<rect class="g-rect" x="${r3(160 - w / 2)}" y="26" width="${r3(w)}" height="52" rx="10"/>` + tx3(160, 57, nom, "g-plabel", "middle");
    s += `<rect class="g-barre-plus" x="8" y="36" width="${Math.max(40, String(entree).length * 8 + 16)}" height="32" rx="6"/>` + tx3(8 + Math.max(40, String(entree).length * 8 + 16) / 2, 57, entree, "g-plabel", "middle");
    const ws = Math.max(40, String(sortie).length * 8 + 16);
    s += `<rect class="g-barre-plus" x="${312 - ws}" y="36" width="${ws}" height="32" rx="6"/>` + tx3(312 - ws / 2, 57, sortie, "g-plabel", "middle");
    s += fl3([10 + Math.max(40, String(entree).length * 8 + 16), 52], [158 - w / 2, 52]) + fl3([162 + w / 2, 52], [308 - ws, 52]);
    s += tk3(8, 92, "nombre de départ") + tk3(312, 92, "image", "end");
    return sv3(320, 100, aria || `Machine : le nombre ${entree} entre dans la fonction ${nom} et ressort en ${sortie}`, s);
  }
  // Diagramme en flèches : xs (départ) → f(x) (arrivée)
  function sagittal3(xs, f, aria) {
    const ys = [...new Set(xs.map(f))].sort((p, q) => p - q), H = Math.max(xs.length, ys.length) * 26 + 40;
    const Yx = (i) => 30 + ((H - 50) * (i + 0.5)) / xs.length, Yy = (j) => 30 + ((H - 50) * (j + 0.5)) / ys.length;
    let s = `<ellipse class="g-rect" cx="90" cy="${(H - 10) / 2 + 10}" rx="44" ry="${(H - 34) / 2}"/><ellipse class="g-rect" cx="230" cy="${(H - 10) / 2 + 10}" rx="44" ry="${(H - 34) / 2}"/>` + tk3(90, 14, "nombres de départ", "middle") + tk3(230, 14, "images", "middle");
    xs.forEach((x, i) => { const j = ys.indexOf(f(x)); s += tx3(90, Yx(i) + 4, String(x).replace("-", "−"), "g-plabel", "middle") + fl3([106, Yx(i)], [212, Yy(j)], "g-droite"); });
    ys.forEach((y, j) => { s += tx3(230, Yy(j) + 4, String(y).replace("-", "−"), "g-plabel", "middle"); });
    return sv3(320, H, aria || `Diagramme en flèches d'une fonction : ${xs.map((x) => `${x} donne ${f(x)}`).join(", ")}`, s);
  }

  GEN["fn3-image"] = function () {
    const x = "x", a = nz(1, 4, true), b = rand(-6, 6), c = rand(-9, 9), v = nz(1, 6, true), t = rand(0, 3);
    if (t === 2) { // fonction donnée par un programme en blocs
      const k = rand(2, 5), m = nz(1, 6, true), w = rand(0, 2), V = nz(1, 6, true);
      const [lignes, F, ex] = [[[`mettre [y] à [x + ${m}]`.replace("+ -", "- "), "mettre [y] à [y * y]"], (z) => (z + m) ** 2, `(x ${m < 0 ? "-" : "+"} ${Math.abs(m)})^2`], [["mettre [y] à [x * x]", `mettre [y] à [y * ${k}]`, `ajouter [${m}] à [y]`], (z) => k * z * z + m, poly(k, 0, m, "x")], [[`mettre [y] à [x * ${k}]`, `ajouter [${m}] à [y]`, "mettre [y] à [y * x]"], (z) => (k * z + m) * z, `(${poly(0, k, m, "x")}) \\times x`]][w];
      const prog = B3([DRAP3, { c: "ent", t: "demander [Choisis un nombre] et attendre" }, { c: "var", t: "mettre [x] à [réponse]" }, ...lignes.map((l) => ({ c: "var", t: l })), { c: "dire", t: "dire [y]" }]), r = F(V);
      return { enonce: `Ce programme définit une fonction $f$ : le nombre choisi est $x$ et le lutin dit $f(x)$. Calcule l'image de $${rel(V)}$ par $f$.`, figure: prog, mode: "nombre", prefixe: `$f(${rel(V)}) =$`, attendu: r,
        erreurs: [...(w === 0 ? [{ valeur: V * V + m * m, message: `$(x + m)^2 \\neq x^2 + m^2$ : calcule d'abord $${rel(V)} ${m < 0 ? "-" : "+"} ${Math.abs(m)}$, puis élève au carré.` }] : w === 1 ? [{ valeur: (k * V) ** 2 + m, message: `On élève d'abord $x$ au carré, puis on multiplie par $${k}$.` }] : [{ valeur: k * V + m, message: "N'oublie pas la dernière instruction : on multiplie $y$ par $x$." }]), { valeur: -r, message: "Attention aux signes : un carré est positif, et « moins par moins donne plus »." }],
        aides: ["Suis les instructions dans l'ordre avec le nombre choisi.", `Avec $x$, le programme donne $f(x) = ${ex}$.`, `Remplace $x$ par $${relP(V)}$.`],
        solution: `$f(x) = ${ex}$, donc $f(${rel(V)}) = ${rel(r)}$.` };
    }
    if (t === 3) { // machine
      const r = a * v * v + b * v + c, nom = `f : x ↦ ${svgX(poly(a, b, c, x))}`;
      return { enonce: `On fait entrer le nombre $${rel(v)}$ dans la machine $f : x \\mapsto ${poly(a, b, c, x)}$. Quel nombre sort de la machine ?`, figure: machine3(String(v).replace("-", "−"), nom, "?"), mode: "nombre", prefixe: `$f(${rel(v)}) =$`, attendu: r,
        erreurs: [{ valeur: -a * v * v + b * v + c, message: `$${relP(v)}^2 = ${v * v}$ est positif.` }, { valeur: a * 2 * v + b * v + c, message: "$x^2$ n'est pas $2x$ : c'est $x \\times x$." }],
        aides: [`Le nombre qui sort est l'image $f(${rel(v)})$.`, `Remplace $x$ par $${relP(v)}$ dans $${poly(a, b, c, x)}$.`, `$${relP(v)}^2 = ${v * v}$ ; respecte les priorités.`],
        solution: `$f(${rel(v)}) = ${rel(a * v * v)} ${b * v < 0 ? "-" : "+"} ${Math.abs(b * v)} ${c < 0 ? "-" : "+"} ${Math.abs(c)} = ${rel(r)}$ : c'est l'image de $${rel(v)}$.` };
    }
    if (t === 0) {
      const r = a * v * v + b * v + c;
      return { enonce: `On considère la fonction $f : x \\mapsto ${poly(a, b, c, x)}$. Calcule l'image de $${rel(v)}$ par $f$.`, mode: "nombre", prefixe: `$f(${rel(v)}) =$`, attendu: r,
        erreurs: [{ valeur: -a * v * v + b * v + c, message: `$${relP(v)}^2 = ${v * v}$ est positif.` }, { valeur: a * 2 * v + b * v + c, message: "$x^2$ n'est pas $2x$." }],
        aides: [`Remplace $x$ par $${relP(v)}$ dans l'expression.`, `$f(${rel(v)}) = ${a === 1 ? "" : a === -1 ? "-" : `${a} \\times `}${relP(v)}^2 ${b < 0 ? "-" : "+"} ${Math.abs(b)} \\times ${relP(v)} ${c < 0 ? "-" : "+"} ${Math.abs(c)}$.`, `$${relP(v)}^2 = ${v * v}$ ; respecte les priorités.`],
        solution: `$f(${rel(v)}) = ${rel(a * v * v)} ${b * v < 0 ? "-" : "+"} ${Math.abs(b * v)} ${c < 0 ? "-" : "+"} ${Math.abs(c)} = ${rel(r)}$.` };
    }
    // antécédent par une fonction affine : résoudre f(x) = k
    const s = rand(-8, 9), k = a * s + b;
    return { enonce: `On considère la fonction $g : x \\mapsto ${poly(0, a, b, x)}$. Quel est l'antécédent de $${rel(k)}$ par $g$ ?`, mode: "nombre", prefixe: "Antécédent :", attendu: s,
      erreurs: [{ valeur: a * k + b, message: `Ça, c'est l'image de $${rel(k)}$. On cherche $x$ tel que $g(x) = ${rel(k)}$.` }],
      aides: [`On cherche $x$ tel que $g(x) = ${rel(k)}$.`, `Résous $${poly(0, a, b, x)} = ${rel(k)}$.`, `$${poly(0, a, 0, x)} = ${rel(k - b)}$.`],
      solution: `$${poly(0, a, b, x)} = ${rel(k)}$ donne $${poly(0, a, 0, x)} = ${rel(k - b)}$, donc $x = ${rel(s)}$. L'antécédent de $${rel(k)}$ est $${rel(s)}$.` };
  };

  GEN["fn3-tableau"] = function () {
    const xs = shuffle([-3, -2, -1, 0, 1, 2, 3, 4, 5]).slice(0, 5).sort((p, q) => p - q), a = nz(1, 3, true), b = rand(-4, 4), c = rand(-6, 6);
    const f = (x) => a * x * x + b * x + c, ys = xs.map(f), tab = { lignes: [["x", ...xs.map(rel)], ["f(x)", ...ys.map(rel)]] };
    const t = rand(0, 3), i = rand(0, xs.length - 1);
    if (t === 3) { // du tableau aux points de la courbe
      const j = (i + rand(1, xs.length - 1)) % xs.length, P = (u, w) => `$(${rel(u)} ; ${rel(w)})$`, bonne = P(xs[i], ys[i]);
      const fx = uniq3(bonne, [[ys[i], xs[i]], [xs[i], ys[j]], [xs[i], -ys[i]], [xs[j], ys[i]], [xs[i], ys[i] + 1], [-xs[i], ys[i]], [xs[i] + 1, ys[i]], [xs[i], ys[i] - 2]].filter(([u, w]) => f(u) !== w).map(([u, w]) => P(u, w)));
      if (fx.length < 3) return GEN["fn3-tableau"]();
      const { choix, attendu } = melange(bonne, fx);
      return { enonce: "Voici un tableau de valeurs d'une fonction $f$. Lequel de ces points est sur la courbe représentative de $f$ ?", tableau: tab, mode: "choix", choix, attendu,
        aides: ["La courbe de $f$ est formée des points de coordonnées $(x ; f(x))$.", "L'abscisse est sur la première ligne, l'ordonnée (l'image) juste en dessous.", "Vérifie chaque point colonne par colonne."],
        solution: `On lit $f(${rel(xs[i])}) = ${rel(ys[i])}$ : le point ${bonne} est sur la courbe.` };
    }
    if (t === 0) return { enonce: "Voici un tableau de valeurs d'une fonction $f$. Quelle est l'image de " + `$${rel(xs[i])}$ par $f$ ?`, tableau: tab, mode: "nombre", prefixe: `$f(${rel(xs[i])}) =$`, attendu: ys[i],
      aides: ["L'image de $x$ se lit sur la deuxième ligne, sous $x$.", `Repère la colonne où $x = ${rel(xs[i])}$.`, "Lis la valeur de $f(x)$ dans cette colonne."], solution: `Sous $x = ${rel(xs[i])}$, on lit $f(${rel(xs[i])}) = ${rel(ys[i])}$.` };
    const cnt = ys.filter((y) => y === ys[i]).length;
    if (t === 1 && cnt === 1 && !xs.includes(ys[i])) return { enonce: `Voici un tableau de valeurs d'une fonction $f$. D'après ce tableau, quel est un antécédent de $${rel(ys[i])}$ par $f$ ?`, tableau: tab, mode: "nombre", prefixe: "Antécédent :", attendu: xs[i],
      aides: ["Un antécédent de $k$ est une valeur de $x$ dont l'image est $k$.", `Cherche $${rel(ys[i])}$ sur la deuxième ligne.`, "Lis la valeur de $x$ au-dessus."], solution: `On lit $f(${rel(xs[i])}) = ${rel(ys[i])}$ : $${rel(xs[i])}$ est un antécédent de $${rel(ys[i])}$.` };
    const k = rand(0, xs.length - 1);
    return { enonce: `Voici un tableau de valeurs d'une fonction $f$. Calcule $f(${rel(xs[k])}) + f(${rel(xs[i])})$.`, tableau: tab, mode: "nombre", prefixe: "Résultat :", attendu: ys[k] + ys[i],
      aides: ["Lis chaque image dans le tableau.", `$f(${rel(xs[k])}) = ${rel(ys[k])}$.`, `$f(${rel(xs[i])}) = ${rel(ys[i])}$.`], solution: `$${rel(ys[k])} + ${relP(ys[i])} = ${rel(ys[k] + ys[i])}$.` };
  };

  GEN["fn3-graphe"] = function () {
    const P = parabole3(), t = rand(0, 1), fig = (lignes) => repere3({ f: P.f, xmin: P.xmin, xmax: P.xmax, ymin: P.ymin, ymax: P.ymax, lignes, nom: "𝒞f", aria: `Courbe d'une parabole de sommet (${P.h} ; ${P.m})` });
    if (t === 0) {
      let x0; do x0 = rand(P.xmin, P.xmax); while (!Number.isInteger(P.f(x0)) || P.f(x0) < P.ymin || P.f(x0) > P.ymax || x0 === 0);
      const y0 = P.f(x0);
      return { enonce: `La courbe représente une fonction $f$. Lis l'image de $${rel(x0)}$ par $f$.`, figure: fig(), mode: "nombre", prefixe: `$f(${rel(x0)}) =$`, attendu: y0,
        erreurs: [{ valeur: x0, message: "Pars de $" + rel(x0) + "$ sur l'axe des abscisses (horizontal) et lis l'ordonnée du point de la courbe." }],
        aides: [`Place-toi à $x = ${rel(x0)}$ sur l'axe horizontal.`, "Monte ou descends jusqu'à la courbe.", "Lis l'ordonnée de ce point sur l'axe vertical."],
        solution: `Le point de la courbe d'abscisse $${rel(x0)}$ a pour ordonnée $${rel(y0)}$ : $f(${rel(x0)}) = ${rel(y0)}$.` };
    }
    // antécédents de k (deux, entiers)
    for (let e = 0; e < 50; e++) {
      const d = pick(Math.abs(P.p) === 0.5 ? [2] : [1, 2, 3]), k = P.m + P.p * d * d, s1 = P.h - d, s2 = P.h + d;
      if (!Number.isInteger(k) || k < P.ymin || k > P.ymax || s1 < P.xmin || s2 > P.xmax) continue;
      const bonne = `$${rel(s1)}$ et $${rel(s2)}$`;
      const faux = uniq3(bonne, [`$${rel(P.f(k))}$`, `$${rel(s1)}$ seulement`, `$${rel(-s1)}$ et $${rel(-s2)}$`, `$${rel(k)}$`, `$${rel(s2)}$ seulement`]);
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `La courbe représente une fonction $f$. Quels sont les antécédents de $${rel(k)}$ par $f$ ?`, figure: fig([k]), mode: "choix", choix, attendu,
        aides: [`Trace la droite horizontale d'ordonnée $${rel(k)}$ (en pointillés).`, "Repère les points où elle coupe la courbe.", "Lis les abscisses de ces points."],
        solution: `La droite d'ordonnée $${rel(k)}$ coupe la courbe en deux points, d'abscisses $${rel(s1)}$ et $${rel(s2)}$ : ce sont les antécédents de $${rel(k)}$.` };
    }
    return GEN["fn3-graphe"]();
  };

  GEN["fn3-vocab"] = function () {
    const a = rand(-9, 9), b = rand(-9, 12), t = rand(0, 4);
    if (t === 4) { // diagramme en flèches
      const m = rand(-3, 3), s = rand(1, 3), xs = [...shuffle([-3, -2, -1, 0, 1, 2, 3].filter((z) => Math.abs(z) !== s)).slice(0, 3), -s, s].sort((p, q) => p - q), F = (z) => z * z + m, fig = sagittal3(xs, F);
      if (Math.random() < 0.5) {
        const u = pick(xs), bonne = `$${rel(F(u))}$`, { choix, attendu } = melange(bonne, uniq3(bonne, [`$${rel(u)}$`, ...shuffle(xs.map(F).filter((y) => y !== F(u))).map((y) => `$${rel(y)}$`), `$${rel(-F(u))}$`]));
        return { enonce: `Le diagramme représente une fonction $f$. Quelle est l'image de $${rel(u)}$ par $f$ ?`, figure: fig, mode: "choix", choix, attendu,
          aides: ["Dans le diagramme, chaque flèche va d'un nombre de départ vers son image.", `Repère $${rel(u)}$ à gauche.`, "Suis la flèche jusqu'à la colonne de droite."],
          solution: `La flèche partant de $${rel(u)}$ arrive sur $${rel(F(u))}$ : $f(${rel(u)}) = ${rel(F(u))}$.` };
      }
      const y = F(s), bonne = `$${rel(-s)}$ et $${rel(s)}$`, { choix, attendu } = melange(bonne, [`$${rel(s)}$ seulement`, Math.abs(y) === s ? "aucun antécédent" : `$${rel(y)}$`, `$${rel(-s)}$ seulement`]);
      return { enonce: `Le diagramme représente une fonction $f$. Quels sont les antécédents de $${rel(y)}$ par $f$ ?`, figure: fig, mode: "choix", choix, attendu,
        aides: ["Un antécédent de $k$ est un nombre de départ dont l'image est $k$.", `Repère $${rel(y)}$ dans la colonne des images.`, "Compte toutes les flèches qui arrivent sur ce nombre."],
        solution: `Deux flèches arrivent sur $${rel(y)}$ : elles partent de $${rel(-s)}$ et de $${rel(s)}$. Ce sont les antécédents de $${rel(y)}$ (un nombre peut avoir plusieurs antécédents, mais une seule image).` };
    }
    if (t === 0) {
      const bonne = `l'image de $${rel(a)}$ par $f$ est $${rel(b)}$`, faux = [`l'image de $${rel(b)}$ par $f$ est $${rel(a)}$`, `$${rel(b)}$ a pour antécédent $${rel(b)}$`, `$f$ multiplié par $${relP(a)}$ vaut $${rel(b)}$`];
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `L'égalité $f(${rel(a)}) = ${rel(b)}$ signifie :`, mode: "choix", choix, attendu, aides: ["$f(x)$ se lit « $f$ de $x$ » : c'est l'image de $x$.", "La valeur entre parenthèses est le nombre de départ.", "Le résultat est son image."], solution: `$f(${rel(a)}) = ${rel(b)}$ : l'image de $${rel(a)}$ est $${rel(b)}$, et $${rel(a)}$ est un antécédent de $${rel(b)}$.` };
    }
    if (t === 1) {
      const bonne = `$${rel(a)}$ est un antécédent de $${rel(b)}$`, faux = [`$${rel(b)}$ est un antécédent de $${rel(a)}$`, `$${rel(a)}$ est l'image de $${rel(b)}$`, `$f(${rel(b)}) = ${rel(a)}$`];
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `On sait que $f(${rel(a)}) = ${rel(b)}$. On peut dire que :`, mode: "choix", choix, attendu, aides: ["L'antécédent est le nombre de départ.", "L'image est le nombre d'arrivée.", `Ici le nombre de départ est $${rel(a)}$.`], solution: `$${rel(a)}$ est un antécédent de $${rel(b)}$ (et $${rel(b)}$ est l'image de $${rel(a)}$).` };
    }
    // programme de calcul → expression
    const k = rand(2, 9), m = rand(2, 9), u = rand(0, 1);
    const bonne = u ? `$f(x) = ${k}(x + ${m})$` : `$f(x) = ${k}x + ${m}$`, faux = u ? [`$f(x) = ${k}x + ${m}$`, `$f(x) = x + ${k * m}$`, `$f(x) = ${k + m}x$`] : [`$f(x) = ${k}(x + ${m})$`, `$f(x) = ${k + m}x$`, `$f(x) = (x + ${m})^{${k}}$`];
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: `Une fonction $f$ correspond au programme : ${u ? `« ajouter $${m}$, puis multiplier par $${k}$ »` : `« multiplier par $${k}$, puis ajouter $${m}$ »`}. Son expression est :`, mode: "choix", choix, attendu,
      aides: ["Applique le programme à $x$, étape par étape.", u ? `D'abord $x + ${m}$, puis on multiplie le tout par $${k}$.` : `D'abord $${k}x$, puis on ajoute $${m}$.`, "Les parenthèses sont nécessaires quand l'addition est faite en premier."], solution: `Réponse : ${bonne}.` };
  };

  FIGURES["fn3-cours-machine"] = () => machine3("−2", "f : x ↦ x² − 3x", "10");
  FIGURES["fn3-cours-fleches"] = () => sagittal3([-3, -2, 0, 2, 3], (z) => z * z);
  const courbeCours3 = () => repere3({ f: (z) => (z - 1) ** 2 - 3, xmin: -2, xmax: 4, ymin: -3, ymax: 6, lignes: [1], guides: [[3, 1]], points: [[-1, 1], [3, 1]], nom: "𝒞f", aria: "Courbe de f : l'image de 3 est 1 (pointillés) ; la droite horizontale d'ordonnée 1 coupe la courbe en x = −1 et x = 3" });
  FIGURES["fn3-cours-courbe"] = courbeCours3;
  FIGURES["fn3-qcm-machine"] = () => machine3("4", "x ↦ 2x² − 1", "?");

  /* =====================================================================
     Chapitre 7 : fonctions linéaires et affines (fa3-)
     ===================================================================== */
  const affTex = (a, b) => poly(0, a, b, "x");
  const affD3 = (a, b) => { const A = a === 1 ? "x" : a === -1 ? "-x" : `${a < 0 ? "-" : ""}${nb(Math.abs(a))}x`; return b ? `${A} ${b < 0 ? "-" : "+"} ${nb(Math.abs(b))}` : A; }; // ax + b avec a décimal (virgule)
  const fenetre = (f) => { const ys = [-4, 4].map(f), lo = Math.floor(Math.min(...ys, 0)), hi = Math.ceil(Math.max(...ys, 0)); return { xmin: -4, xmax: 4, ymin: Math.max(lo, -8), ymax: Math.min(hi, 8) }; };

  GEN["fa3-reconnaitre"] = function () {
    const a = nz(2, 9, true), b = nz(1, 9, true), t = rand(0, 4);
    if (t === 3) { // quelle droite représente f ?
      const A = pick([-3, -2, -1, 1, 2, 3, 0.5, -0.5]), B = rand(-3, 3), autres = shuffle([[-A, B], [A, B === 0 ? 2 : -B], [B === 0 ? 1 : B, A], [A, B + pick([-2, 2])]].filter(([p, q], i, T) => (p !== A || q !== B) && p !== 0 && Math.abs(p) <= 3 && T.findIndex(([p2, q2]) => p2 === p && q2 === q) === i)).slice(0, 2);
      if (autres.length < 2) return GEN["fa3-reconnaitre"]();
      const L = shuffle([[A, B], ...autres]), noms = ["(d₁)", "(d₂)", "(d₃)"], k = L.findIndex(([p, q]) => p === A && q === B), cl = ["", "g-curve-1", "g-curve-0"], pris = [];
      // étiquette de chaque droite : loin de l'axe des abscisses, du bord et des autres étiquettes
      const place = (p, q, i) => { const cand = [[3.4, 2.4, 1.8, -1.8, -2.4, -3.4], [2.4, -2.4, 3.4, -3.4, 1.8, -1.8], [-3.4, -2.4, 1.8, 3.4, -1.8, 2.4]][i]; for (const xl of cand) { const yl = p * xl + q, ye = yl + (yl + 0.7 > 5.5 ? -0.9 : 0.7); if (Math.abs(yl) >= 1 && Math.abs(yl) <= 5.2 && Math.abs(ye) >= 1.1 && Math.abs(xl) > 0.8 && pris.every(([a2, b2]) => Math.abs(a2 - xl) > 1.3 || Math.abs(b2 - ye) > 1.1)) { pris.push([xl, ye]); return [xl, ye]; } } const yl = p * cand[0] + q; pris.push([cand[0], yl]); return [cand[0], yl + 0.7]; };
      const fig = repere3({ xmin: -4, xmax: 4, ymin: -6, ymax: 6, courbes: L.map(([p, q], i) => ({ f: (z) => p * z + q, cl: cl[i], tiret: i === 2, nom: noms[i], lab: place(p, q, i) })), aria: `Trois droites ${noms.join(", ")} dans un repère (la troisième en tirets)` });
      const { choix, attendu } = melange(`$(d_${k + 1})$`, ["$(d_1)$", "$(d_2)$", "$(d_3)$", "aucune de ces droites"].filter((z) => z !== `$(d_${k + 1})$`));
      return { enonce: `Quelle droite représente la fonction affine $f(x) = ${affD3(A, B)}$ ?`, figure: fig, mode: "choix", choix, attendu,
        aides: [`$b = ${rel(B)}$ : la droite coupe l'axe des ordonnées au point $(0 ; ${rel(B)})$.`, `$a = ${rel(A)}$ : quand $x$ augmente de $1$, $f(x)$ ${A > 0 ? "augmente" : "diminue"} de $${nb(Math.abs(A))}$ (la droite ${A > 0 ? "monte" : "descend"}).`, `Vérifie avec un autre point : $f(2) = ${rel(A * 2 + B)}$.`],
        solution: `La droite de $f$ passe par $(0 ; ${rel(B)})$ et par $(2 ; ${rel(2 * A + B)})$ : c'est $(d_${k + 1})$.` };
    }
    if (t === 4) { // un point appartient-il à la droite ?
      const x0 = nz(1, 6, true), on = Math.random() < 0.5, y0 = on ? a * x0 + b : a * x0 + b + nz(1, 3, true), A0 = `A(${rel(x0)} ; ${rel(y0)})`;
      const bonne = on ? `Oui, car $f(${rel(x0)}) = ${rel(y0)}$` : `Non, car $f(${rel(x0)}) = ${rel(a * x0 + b)}$`;
      const { choix, attendu } = melange(bonne, uniq3(bonne, [on ? `Non, car $f(${rel(x0)}) = ${rel(-y0)}$` : `Oui, car $f(${rel(x0)}) = ${rel(y0)}$`, `Oui, car $f(${rel(y0)}) = ${rel(x0)}$`, "On ne peut pas savoir sans tracer la droite", `Non, car $${rel(x0)} \\neq ${rel(y0)}$`]));
      return { enonce: `$f$ est la fonction affine $f(x) = ${affTex(a, b)}$. Le point $${A0}$ appartient-il à la droite qui représente $f$ ?`, mode: "choix", choix, attendu,
        aides: ["Un point $(x ; y)$ est sur la droite de $f$ si et seulement si $f(x) = y$.", `Calcule l'image de l'abscisse : $f(${rel(x0)})$.`, `$f(${rel(x0)}) = ${a} \\times ${relP(x0)} ${b < 0 ? "-" : "+"} ${Math.abs(b)} = ${rel(a * x0 + b)}$ ; compare avec $${rel(y0)}$.`],
        solution: `$f(${rel(x0)}) = ${rel(a * x0 + b)}$ ${on ? "$=$" : "$\\neq$"} $${rel(y0)}$ : le point ${on ? "est" : "n'est pas"} sur la droite.` };
    }
    if (t === 0) {
      const L = [[`$f(x) = ${affTex(a, b)}$`, "affine (non linéaire)"], [`$f(x) = ${affTex(a, 0)}$`, "linéaire (donc affine)"], [`$f(x) = ${poly(a, 0, b, "x")}$`, "ni linéaire ni affine"], [`$f(x) = \\dfrac{${a}}{x}$`, "ni linéaire ni affine"], [`$f(x) = ${a}(x ${b < 0 ? "-" : "+"} ${Math.abs(b)})$`, "affine (non linéaire)"]];
      const [ex, nature] = pick(L), opts = ["affine (non linéaire)", "linéaire (donc affine)", "ni linéaire ni affine", "on ne peut pas savoir"];
      const { choix, attendu } = melange(nature, opts.filter((o) => o !== nature));
      return { enonce: `La fonction ${ex} est :`, mode: "choix", choix, attendu,
        aides: ["Une fonction affine s'écrit $f(x) = ax + b$ ; linéaire si en plus $b = 0$.", "Développe si nécessaire pour voir la forme $ax + b$.", "Un $x^2$ ou un $x$ au dénominateur : ce n'est pas affine."], solution: `${ex} est ${nature}.` };
    }
    if (t === 1) { const v = nz(1, 8, true), r = a * v + b;
      return { enonce: `$f$ est la fonction affine $f(x) = ${affTex(a, b)}$. Calcule $f(${rel(v)})$.`, mode: "nombre", prefixe: `$f(${rel(v)}) =$`, attendu: r,
        erreurs: [{ valeur: a * v - b, message: "Garde le signe de $b$." }], aides: [`Remplace $x$ par $${relP(v)}$.`, `$${a} \\times ${relP(v)} = ${rel(a * v)}$.`, `Puis ajoute $${relP(b)}$.`], solution: `$f(${rel(v)}) = ${a} \\times ${relP(v)} ${b < 0 ? "-" : "+"} ${Math.abs(b)} = ${rel(r)}$.` }; }
    const c = rand(0, 1);
    return { enonce: `On considère la fonction affine $f(x) = ${affTex(a, b)}$. Quel est ${c ? "son coefficient directeur $a$" : "son ordonnée à l'origine $b$"} ?`, mode: "nombre", prefixe: c ? "$a =$" : "$b =$", attendu: c ? a : b,
      erreurs: [{ valeur: c ? b : a, message: c ? "Le coefficient directeur multiplie $x$." : "L'ordonnée à l'origine est le nombre seul, $f(0)$." }],
      aides: ["Écris $f(x)$ sous la forme $ax + b$.", "$a$ est le nombre qui multiplie $x$.", "$b$ est le nombre seul : $b = f(0)$."], solution: `$f(x) = ${affTex(a, b)}$ : $a = ${rel(a)}$ et $b = ${rel(b)}$.` };
  };

  GEN["fa3-deux-points"] = function () {
    const a = nz(1, 6, true), b = rand(-10, 10), x1 = rand(-5, 4), x2 = x1 + rand(1, 6), y1 = a * x1 + b, y2 = a * x2 + b, q = rand(0, 1);
    return { enonce: `$f$ est une fonction affine telle que $f(${rel(x1)}) = ${rel(y1)}$ et $f(${rel(x2)}) = ${rel(y2)}$. Détermine ${q ? "son coefficient directeur $a$" : "son ordonnée à l'origine $b$"}.`, mode: "nombre", prefixe: q ? "$a =$" : "$b =$", attendu: q ? a : b,
      erreurs: q ? [{ valeur: arr((x2 - x1) / (y2 - y1), 4), message: "C'est $\\dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$ : les images en haut." }] : [{ valeur: a, message: "Ça, c'est $a$ ; il faut ensuite calculer $b$." }],
      aides: ["$a = \\dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$ : l'accroissement des images divisé par celui des nombres.", `$a = \\dfrac{${rel(y2)} - ${relP(y1)}}{${rel(x2)} - ${relP(x1)}} = \\dfrac{${y2 - y1}}{${x2 - x1}} = ${rel(a)}$.`, `Puis $b = f(${rel(x1)}) - a \\times ${relP(x1)}$.`],
      solution: `$a = \\dfrac{${y2 - y1}}{${x2 - x1}} = ${rel(a)}$ ; $b = ${rel(y1)} - ${relP(a)} \\times ${relP(x1)} = ${rel(b)}$. Donc $f(x) = ${affTex(a, b)}$.` };
  };

  GEN["fa3-graphe"] = function () {
    const a = pick([-3, -2, -1, 1, 2, 3, 0.5, -0.5]), b = rand(-3, 3), f = (x) => a * x + b, W = fenetre(f), q = rand(0, 2);
    if (W.ymax - W.ymin < 4) return GEN["fa3-graphe"]();
    const fig = repere3({ f, ...W, nom: "𝒟", aria: "Droite représentant une fonction affine dans un repère quadrillé" });
    if (q === 0) return { enonce: "La droite représente une fonction affine $f(x) = ax + b$. Lis l'ordonnée à l'origine $b$.", figure: fig, mode: "nombre", prefixe: "$b =$", attendu: b,
      aides: ["$b = f(0)$ : c'est l'ordonnée du point de la droite situé sur l'axe vertical.", "Repère où la droite coupe l'axe des ordonnées.", "Lis la graduation."], solution: `La droite coupe l'axe des ordonnées en $${rel(b)}$ : $b = ${rel(b)}$.` };
    if (q === 1) return { enonce: "La droite représente une fonction affine $f(x) = ax + b$. Lis son coefficient directeur $a$.", figure: fig, mode: "nombre", prefixe: "$a =$", attendu: a,
      erreurs: [{ valeur: -a, message: "Si la droite monte de gauche à droite, $a$ est positif ; si elle descend, $a$ est négatif." }, { valeur: b, message: "Ça, c'est l'ordonnée à l'origine." }],
      aides: ["Quand $x$ augmente de $1$, $f(x)$ augmente de $a$.", `Pars du point $(0 ; ${rel(b)})$ et avance de ${Math.abs(a) === 0.5 ? "$2$ unités vers la droite" : "$1$ unité vers la droite"}.`, Math.abs(a) === 0.5 ? "De combien monte-t-on (ou descend-on) ? Divise par $2$." : "De combien faut-il monter (ou descendre) pour retrouver la droite ?"],
      solution: `Quand $x$ augmente de $${Math.abs(a) === 0.5 ? 2 : 1}$, $f(x)$ ${a > 0 ? "augmente" : "diminue"} de $${nb(Math.abs(a) === 0.5 ? 1 : Math.abs(a))}$ : $a = ${rel(a)}$.` };
    let x0; do x0 = rand(-3, 3); while (!Number.isInteger(f(x0)) || f(x0) < W.ymin || f(x0) > W.ymax || x0 === 0);
    return { enonce: `La droite représente une fonction affine $f$. Lis $f(${rel(x0)})$.`, figure: fig, mode: "nombre", prefixe: `$f(${rel(x0)}) =$`, attendu: f(x0),
      erreurs: [{ valeur: x0, message: "On lit l'ordonnée du point de la droite, pas son abscisse." }],
      aides: [`Pars de $${rel(x0)}$ sur l'axe horizontal.`, "Rejoins la droite verticalement.", "Lis l'ordonnée."], solution: `Le point de la droite d'abscisse $${rel(x0)}$ a pour ordonnée $${rel(f(x0))}$.` };
  };

  GEN["fa3-problemes"] = function () {
    const t = rand(0, 2);
    if (t === 0) { // pourcentage : fonction linéaire
      const p = pick([5, 10, 15, 20, 25, 30, 40, 50]), up = Math.random() < 0.5, k = arr(up ? 1 + p / 100 : 1 - p / 100, 2), x = rand(2, 40) * 10, q = rand(0, 1);
      if (q === 0) return { enonce: `${up ? "Augmenter" : "Diminuer"} un prix de $${p}\\,\\%$ revient à appliquer une fonction linéaire $f(x) = kx$. Quel est le coefficient $k$ ?`, mode: "nombre", prefixe: "$k =$", attendu: k,
        erreurs: [{ valeur: p / 100, message: `Il faut garder le prix de départ : $k = 1 ${up ? "+" : "-"} \\dfrac{${p}}{100}$.` }, { valeur: arr(up ? 1 - p / 100 : 1 + p / 100, 2), message: up ? "Pour une augmentation, $k > 1$." : "Pour une diminution, $k < 1$." }],
        aides: [`${up ? "Augmenter" : "Diminuer"} de $${p}\\,\\%$, c'est ${up ? "ajouter" : "retirer"} $\\dfrac{${p}}{100}$ du prix.`, `$x ${up ? "+" : "-"} \\dfrac{${p}}{100}x = \\left(1 ${up ? "+" : "-"} \\dfrac{${p}}{100}\\right)x$.`, `$1 ${up ? "+" : "-"} ${nb(p / 100)}$.`], solution: `$k = 1 ${up ? "+" : "-"} ${nb(p / 100)} = ${nb(k)}$.` };
      return { enonce: `Un article coûte $${x}$ €. Son prix ${up ? "augmente" : "baisse"} de $${p}\\,\\%$. Quel est le nouveau prix ?`, mode: "nombre", prefixe: "Nouveau prix :", suffixe: "€", attendu: arr(x * k, 2),
        erreurs: [{ valeur: arr((x * p) / 100, 2), message: "Ça, c'est le montant de la variation ; ajoute-le ou retire-le au prix." }, { valeur: up ? x + p : x - p, message: `${up ? "Augmenter" : "Baisser"} de $${p}\\,\\%$, ce n'est pas ${up ? "ajouter" : "retirer"} $${p}$ € : on multiplie par $${nb(k)}$.` }],
        aides: [`On applique $f(x) = ${nb(k)}x$.`, `$${x} \\times ${nb(k)}$.`, "Vérifie que le prix augmente ou baisse dans le bon sens."], solution: `$${x} \\times ${nb(k)} = ${nb(arr(x * k, 2))}$ €.` };
    }
    if (t === 1) { // deux tarifs : comparaison
      const a1 = rand(3, 9), b2 = rand(2, 8) * 5, a2 = rand(1, a1 - 1), n = rand(2, 30), q = rand(0, 1), [lieu, des] = pick([["Un club de danse de Mamoudzou", "séances"], ["Le club de plongée de Petite-Terre", "plongées"], ["Une salle de sport de Koungou", "séances"], ["Un club de kayak de Sada", "sorties"], ["Le cinéma de Mamoudzou", "séances"]]);
      const ctx = `${lieu} propose deux tarifs : tarif A, $f(x) = ${a1}x$ ; tarif B, $g(x) = ${poly(0, a2, b2, "x")}$, où $x$ est le nombre de ${des} et le prix est en euros.`;
      if (q === 0) { const c1 = a1 * n, c2 = b2 + a2 * n, best = c1 < c2 ? "A" : c1 > c2 ? "B" : "les deux";
        const bonne = best === "les deux" ? "les deux tarifs coûtent pareil" : `le tarif ${best}`, faux = ["le tarif A", "le tarif B", "les deux tarifs coûtent pareil"].filter((z) => z !== bonne).concat(["on ne peut pas savoir"]);
        const { choix, attendu } = melange(bonne, faux), xm = Math.ceil((Math.max(n, b2 / (a1 - a2)) + 2) / 5) * 5, ym = Math.max(a1 * xm, b2 + a2 * xm), pyy = [10, 20, 25, 50, 100].find((p) => ym / p <= 10) || 100;
        const fig = repere3({ xmin: 0, xmax: xm, ymin: 0, ymax: Math.ceil(ym / pyy) * pyy, pasX: xm > 12 ? 5 : 1, pasY: pyy, titreX: des, titreY: "prix (€)", courbes: [{ f: (z) => a1 * z, nom: "A", lab: [Math.min(xm * 0.8, (Math.ceil(ym / pyy) * pyy * 0.92) / a1), Math.min(a1 * xm * 0.8, Math.ceil(ym / pyy) * pyy * 0.92) + pyy * 0.3] }, { f: (z) => b2 + a2 * z, cl: "g-curve-1", nom: "B", lab: [xm * 0.92, b2 + a2 * xm * 0.92 - pyy * 0.6] }], aria: `Droites représentant le tarif A (f(x) = ${a1}x) et le tarif B (g(x) = ${svgX(poly(0, a2, b2, "x"))})` });
        return { enonce: `${ctx} Pour $${n}$ ${des}, quel est le tarif le moins cher ? Tu peux t'aider du graphique.`, figure: fig, mode: "choix", choix, attendu,
          aides: [`Calcule $f(${n})$ et $g(${n})$, ou lis le graphique à l'abscisse $${n}$.`, `$f(${n}) = ${a1} \\times ${n} = ${c1}$ €.`, `$g(${n}) = ${a2} \\times ${n} + ${b2} = ${c2}$ €.`], solution: `$f(${n}) = ${c1}$ € et $g(${n}) = ${c2}$ € : ${bonne}. Sur le graphique, à l'abscisse $${n}$, ${best === "les deux" ? "les deux droites se coupent" : `la droite ${best} est la plus basse`}.` }; }
      if (b2 % (a1 - a2)) return GEN["fa3-problemes"]();
      const s = b2 / (a1 - a2);
      return { enonce: `${ctx} Pour combien de ${des} les deux tarifs sont-ils égaux ?`, mode: "nombre", prefixe: `${des[0].toUpperCase() + des.slice(1)} :`, attendu: s,
        erreurs: [{ valeur: arr(b2 / (a1 + a2), 4), message: `Pour résoudre $${a1}x = ${poly(0, a2, b2, "x")}$, on soustrait $${coefX(a2, "x")}$ aux deux membres.` }, { valeur: arr(b2 / a1, 4), message: `Le tarif B coûte aussi $${a2}$ € par unité : résous $${a1}x = ${poly(0, a2, b2, "x")}$.` }],
        aides: ["Résous $f(x) = g(x)$.", `$${a1}x = ${poly(0, a2, b2, "x")}$.`, `$${poly(0, a1 - a2, 0, "x")} = ${b2}$.`], solution: `$${a1}x = ${poly(0, a2, b2, "x")}$ donne $${poly(0, a1 - a2, 0, "x")} = ${b2}$, donc $x = ${s}$ ${des}.` };
    }
    // taxi : prise en charge + prix au km
    const pc = rand(2, 6), pk = pick([1.2, 1.5, 1.8, 2, 2.5]), d = rand(3, 25), C = arr(pc + pk * d, 2), q = rand(0, 1), taxi = pick(["Un taxi de Mamoudzou", "Un taxi-brousse", `Un taxi de ${pick(VILLES3)}`]);
    if (q === 0) return { enonce: `${taxi} facture $${pc}$ € de prise en charge et $${nb(pk)}$ € par kilomètre. Le prix est une fonction affine de la distance $x$. Combien coûte une course de $${d}$ km ?`, mode: "nombre", prefixe: "Prix :", suffixe: "€", attendu: C,
      erreurs: [{ valeur: arr(pk * d, 2), message: "N'oublie pas la prise en charge." }, { valeur: arr((pc + pk) * d, 2), message: "La prise en charge ne se paie qu'une seule fois : $f(x) = " + nb(pk) + "x + " + pc + "$." }],
      aides: [`$f(x) = ${nb(pk)}x + ${pc}$.`, `Calcule $f(${d})$.`, `$${nb(pk)} \\times ${d} = ${nb(arr(pk * d, 2))}$.`], solution: `$f(${d}) = ${nb(pk)} \\times ${d} + ${pc} = ${nb(C)}$ €.` };
    return { enonce: `${taxi} facture $${pc}$ € de prise en charge et $${nb(pk)}$ € par kilomètre. Une course a coûté $${nb(C)}$ €. Quelle distance a été parcourue ?`, mode: "nombre", prefixe: "Distance :", suffixe: "km", attendu: d,
      erreurs: [{ valeur: arr(C / pk, 2), message: "Retire d'abord la prise en charge." }, { valeur: arr((C + pc) / pk, 2), message: "On retire la prise en charge, on ne l'ajoute pas." }],
      aides: [`Résous $${nb(pk)}x + ${pc} = ${nb(C)}$.`, `$${nb(pk)}x = ${nb(arr(C - pc, 2))}$.`, `Divise par $${nb(pk)}$.`], solution: `$x = \\dfrac{${nb(arr(C - pc, 2))}}{${nb(pk)}} = ${d}$ km.` };
  };

  FIGURES["fa3-cours-lineaire"] = () => repere3({ xmin: -4, xmax: 4, ymin: -5, ymax: 6, courbes: [{ f: (z) => 2 * z, nom: "f(x) = 2x", lab: [2.9, 4.6, "end"] }, { f: (z) => -z + 3, cl: "g-curve-1", nom: "g(x) = −x + 3", lab: [3.9, -1.8, "end"] }], points: [[0, 0], [0, 3]], aria: "Droite de la fonction linéaire f(x) = 2x, qui passe par l'origine, et droite de la fonction affine g(x) = −x + 3, qui passe par (0 ; 3)" });
  FIGURES["fa3-cours-pente"] = () => repere3({ xmin: -3, xmax: 4, ymin: -4, ymax: 5, courbes: [{ f: (z) => 2 * z - 1, nom: "f(x) = 2x − 1", lab: [-0.3, 4.2, "end"] }], points: [[0, -1, "b = −1", 7, 15], [1, 1], [2, 3]], segs: [[1, 1, 2, 1, "g-hline"], [2, 1, 2, 3, "g-hline"]], etiq: [[1.5, 0.4, "+1", "g-hlabel", "middle"], [2.15, 1.85, "+2", "g-hlabel"]], aria: "Droite de f(x) = 2x − 1 : elle coupe l'axe des ordonnées en −1 ; en avançant de 1 vers la droite, on monte de 2" });
  FIGURES["fa3-cours-deux-points"] = () => repere3({ xmin: -1, xmax: 5, ymin: 0, ymax: 12, pasY: 2, courbes: [{ f: (z) => 2 * z + 3, nom: "", lab: [0, 0] }], points: [[1, 5, "A(1 ; 5)", 6, 15], [4, 11, "B(4 ; 11)", -6, -6], [0, 3, "b = 3", 6, 12]], segs: [[1, 5, 4, 5, "g-hline"], [4, 5, 4, 11, "g-hline"]], etiq: [[2.6, 5.35, "+3", "g-hlabel", "middle"], [4.15, 8, "+6", "g-hlabel"]], aria: "Droite passant par A(1 ; 5) et B(4 ; 11) : quand x augmente de 3, f(x) augmente de 6, donc a = 2 ; elle coupe l'axe des ordonnées en 3" });
  FIGURES["fa3-qcm-droite"] = () => repere3({ f: (z) => 2 * z + 1, xmin: -4, xmax: 4, ymin: -5, ymax: 6, nom: "𝒟", aria: "Droite passant par (0 ; 1) et (1 ; 3)" });
  FIGURES["fa3-qcm-lineaire"] = () => repere3({ f: (z) => -0.5 * z, xmin: -4, xmax: 4, ymin: -3, ymax: 3, nom: "𝒟", aria: "Droite passant par l'origine et par le point (2 ; −1)" });
  FIGURES["fa3-qcm-tarifs"] = () => repere3({ xmin: 0, xmax: 8, ymin: 0, ymax: 40, pasY: 5, titreX: "séances", titreY: "prix (€)", courbes: [{ f: (z) => 5 * z, nom: "A", lab: [6.6, 37] }, { f: (z) => 2 * z + 15, cl: "g-curve-1", nom: "B", lab: [7.6, 27.5] }], aria: "Tarif A : droite passant par l'origine et (6 ; 30) ; tarif B : droite passant par (0 ; 15) et (5 ; 25)" });

  /* =====================================================================
     Chapitre 8 : proportionnalité et pourcentages (pp3-) — évolutions, grandeurs composées
     ===================================================================== */
  const pct = (p) => `${nb(p)}\\,\\%`;
  const pctS = (p) => `${nbTexte(p)} %`;
  // Barre représentant 100 % d'une quantité, graduée de 10 % en 10 %, avec p % colorié
  function barrePct3(p, total, lab, aria) {
    const x0 = 16, w = 288, y = 32, h = 30, a = (w * p) / 100;
    let s = `<rect class="g-rect" x="${x0}" y="${y}" width="${r3(a)}" height="${h}"/><rect class="g-unite" x="${x0}" y="${y}" width="${w}" height="${h}"/><g class="g-grid">`;
    for (let i = 1; i < 10; i++) s += ln3(x0 + (w * i) / 10, y, x0 + (w * i) / 10, y + h, "");
    s += `</g>` + tx3(x0 + a / 2, y + h / 2 + 4, lab || "?", "g-plabel", "middle") + `<path class="g-accolade" d="M${x0 + 1} ${y - 5} V${y - 11} H${x0 + w - 1} V${y - 5}"/>` + tx3(x0 + w / 2, y - 15, `${total} (100 %)`, "g-mesure", "middle");
    s += `<path class="g-accolade" d="M${x0 + 1} ${y + h + 5} V${y + h + 11} H${r3(x0 + a - 1)} V${y + h + 5}"/>` + tx3(x0 + a / 2, y + h + 25, pctS(p), "g-mesure", "middle");
    return sv3(320, y + h + 32, aria || `Barre représentant ${total} (100 %), graduée de 10 % en 10 %, dont ${nbTexte(p)} % sont coloriés`, s);
  }
  // Valeurs successives reliées par des flèches portant les coefficients : vals = [textes], ops = [textes]
  function coefs3(vals, ops, global, aria) {
    const n = vals.length, wb = n > 3 ? 54 : 62, ga = (300 - n * wb) / (n - 1), y = 30;
    let s = "";
    vals.forEach((v, i) => { const x = 10 + i * (wb + ga); s += `<rect class="${v === "?" ? "g-barre-plus" : "g-rect"}" x="${r3(x)}" y="${y}" width="${wb}" height="30" rx="6"/>` + tx3(x + wb / 2, y + 20, v, "g-plabel", "middle"); if (i < n - 1) s += fl3([x + wb + 3, y + 15], [x + wb + ga - 3, y + 15]) + tx3(x + wb + ga / 2, y - 6, ops[i], "g-mesure", "middle"); });
    if (global) s += flc3([10 + wb / 2, y + 34], [160, y + 70], [10 + (n - 1) * (wb + ga) + wb / 2, y + 36]) + tx3(160, y + 68, global, "g-mesure", "middle");
    return sv3(320, global ? y + 74 : y + 40, aria || `Évolutions successives : ${vals.map((v, i) => (i ? `${ops[i - 1]}, ` : "") + v).join(" ; ")}`, s);
  }

  GEN["pp3-pourcentage"] = function () {
    const t = rand(0, 2);
    if (t === 0) { // appliquer un pourcentage
      const p = pick([5, 12, 15, 20, 25, 30, 35, 40, 45, 60, 65, 70, 75, 80, 85, 90]), N = rand(2, 60) * 20, r = arr((p * N) / 100, 2);
      if (!Number.isInteger(r)) return GEN["pp3-pourcentage"]();
      const ctx = pick([["élèves d'un collège de Mamoudzou", "viennent en bus", "élèves"], ["habitants de " + pick(VILLES3), "ont moins de 20 ans", "habitants"], ["spectateurs d'un concert à Dzaoudzi", "sont venus par la barge", "spectateurs"], ["passagers d'un taxi-brousse en une semaine", "vont au marché de Mamoudzou", "passagers"], ["tortues observées à N'Gouja cette année", "sont des tortues vertes", "tortues"], ["bananes d'une récolte", "sont vendues au marché", "bananes"]]);
      return { enonce: `Parmi les $${nb(N)}$ ${ctx[0]}, $${pct(p)}$ ${ctx[1]}. Combien cela représente-t-il de ${ctx[2]} ?`, figure: barrePct3(p, `${nbTexte(N)} ${ctx[2]}`), mode: "nombre", prefixe: "Nombre :", attendu: r,
        erreurs: [{ valeur: arr(N / p, 2), message: `$${pct(p)}$ de $N$ se calcule $\\dfrac{${p}}{100} \\times N$.` }, { valeur: N - r, message: `Ça, c'est le nombre de ${ctx[2]} qui ne sont pas concernés ($${100 - p}\\,\\%$).` }],
        aides: [`Prendre $${pct(p)}$ d'un nombre, c'est le multiplier par $\\dfrac{${p}}{100}$.`, `$\\dfrac{${p}}{100} \\times ${nb(N)}$.`, `$${nb(N)} \\div 100 = ${nb(N / 100)}$, puis multiplie par $${p}$.`], solution: `$\\dfrac{${p}}{100} \\times ${nb(N)} = ${nb(r)}$ ${ctx[2]}.` };
    }
    if (t === 1) { // trouver un taux d'évolution
      const p = pick([4, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50]) * (Math.random() < 0.5 ? -1 : 1), V0 = rand(2, 30) * 20, V1 = arr(V0 * (1 + p / 100), 2);
      return { enonce: `Un prix passe de $${nb(V0)}$ € à $${nb(V1)}$ €. Quel est le pourcentage d'évolution ? (Réponds par un nombre négatif s'il s'agit d'une baisse.)`, mode: "nombre", prefixe: "Évolution :", suffixe: "%", attendu: p,
        erreurs: [{ valeur: arr(V1 - V0, 2), message: "Ça, c'est la variation en euros ; divise-la par le prix de départ." }, { valeur: arr(((V1 - V0) / V1) * 100, 2), message: "On divise par la valeur de **départ**." }],
        aides: ["Taux d'évolution $= \\dfrac{\\text{valeur finale} - \\text{valeur initiale}}{\\text{valeur initiale}} \\times 100$.", `Variation : $${nb(V1)} - ${nb(V0)} = ${rel(arr(V1 - V0, 2))}$.`, `$\\dfrac{${rel(arr(V1 - V0, 2))}}{${nb(V0)}} \\times 100$.`],
        solution: `$\\dfrac{${rel(arr(V1 - V0, 2))}}{${nb(V0)}} \\times 100 = ${rel(p)}$ : ${p > 0 ? "hausse" : "baisse"} de $${pct(Math.abs(p))}$.` };
    }
    // retrouver la valeur initiale
    const p = pick([10, 20, 25, 50, 5, 30, 40]), up = Math.random() < 0.5, k = up ? 1 + p / 100 : 1 - p / 100, V0 = rand(2, 40) * 10, V1 = arr(V0 * k, 2);
    const art = pick(["un article", "un ventilateur", "un vélo", "un sac de riz", "une paire de chaussures", "un téléphone"]);
    return { enonce: `Après une ${up ? "hausse" : "baisse"} de $${pct(p)}$, ${art} coûte $${nb(V1)}$ €. Quel était son prix avant ${up ? "la hausse" : "la baisse"} ?`, figure: coefs3(["?", `${nbTexte(V1)} €`], [`× ${nbTexte(k)}`], null, `Prix de départ inconnu, multiplié par ${nbTexte(k)}, donne ${nbTexte(V1)} €`), mode: "nombre", prefixe: "Prix initial :", suffixe: "€", attendu: V0,
      erreurs: [{ valeur: arr(up ? V1 * (1 - p / 100) : V1 * (1 + p / 100), 2), message: `On ne ${up ? "retire" : "rajoute"} pas $${pct(p)}$ du nouveau prix : on divise par le coefficient $${nb(k)}$.` }, { valeur: arr(V1 * k, 2), message: `Pour revenir en arrière, on divise par $${nb(k)}$ (on ne multiplie pas).` }],
      aides: [`Le nouveau prix est l'ancien multiplié par $${nb(k)}$.`, `Donc ancien prix $\\times ${nb(k)} = ${nb(V1)}$.`, `Divise $${nb(V1)}$ par $${nb(k)}$.`], solution: `$${nb(V1)} \\div ${nb(k)} = ${nb(V0)}$ €.` };
  };

  GEN["pp3-evolutions"] = function () {
    const t = rand(0, 3), mot = (s, p) => `${s > 0 ? "une hausse" : "une baisse"} de $${pct(p)}$`, objet = pick(["Le prix d'un sac de riz", "Le prix du litre d'essence", "Le loyer d'un appartement à Mamoudzou", "Le prix d'un billet d'avion Mayotte–La Réunion", "Le prix d'un kilo de bananes au marché", "Le nombre d'abonnés d'un club de foot de Koungou"]);
    if (t === 3) { // pourcentage réciproque : revenir à la valeur de départ
      const [hausse, p, q] = pick([[1, 25, 20], [1, 100, 50], [1, 300, 75], [1, 400, 80], [1, 150, 60], [0, 20, 25], [0, 50, 100], [0, 60, 150], [0, 75, 300], [0, 80, 400]]), k = hausse ? 1 + p / 100 : 1 - p / 100;
      return { enonce: `${pick(["Le nombre de visiteurs d'un site Internet", "Le nombre d'abonnés d'une chaîne de vidéos", "Le nombre de tortues venues pondre sur une plage de Mayotte", "Le prix d'un article en promotion", "Le nombre de passagers d'une ligne de taxi-brousse"])} subit ${mot(hausse ? 1 : -1, p)}. Quelle ${hausse ? "baisse" : "hausse"} (en pourcentage) faut-il ensuite pour revenir à la valeur de départ ?`, figure: coefs3(["100", nbTexte(100 * k), "100"], [`× ${nbTexte(k)}`, "× ?"], null, `100 multiplié par ${nbTexte(k)} donne ${nbTexte(100 * k)}, puis multiplié par un coefficient inconnu redonne 100`), mode: "nombre", prefixe: `${hausse ? "Baisse" : "Hausse"} de`, suffixe: "%", attendu: q,
        erreurs: [{ valeur: p, message: `On ne revient pas au départ avec le même pourcentage : le second pourcentage s'applique à la nouvelle valeur.` }],
        aides: [`Coefficient de la première évolution : $${nb(k)}$.`, `Pour revenir au départ, on multiplie par l'inverse : $\\dfrac{1}{${nb(k)}} = ${nb(1 / k)}$.`, `$${nb(1 / k)}$ correspond à ${hausse ? `une baisse de $${pct(q)}$` : `une hausse de $${pct(q)}$`}.`],
        solution: `$${nb(k)} \\times ${nb(1 / k)} = 1$ : il faut ${hausse ? "une baisse" : "une hausse"} de $${pct(q)}$ (par exemple $100 \\to ${nb(100 * k)} \\to 100$).` };
    }
    const L = [5, 10, 15, 20, 25, 30, 40, 50], a = pick(L), b = t === 1 ? a : pick(L), s1 = t === 1 ? (Math.random() < 0.5 ? 1 : -1) : Math.random() < 0.6 ? 1 : -1, s2 = t === 1 ? s1 : Math.random() < 0.6 ? -1 : 1;
    const k1 = 1 + (s1 * a) / 100, k2 = 1 + (s2 * b) / 100, K = arr(k1 * k2, 4), T = arr((K - 1) * 100, 2);
    if (t === 2) { // prix final après deux évolutions
      const V0 = rand(2, 40) * 10, Vf = arr(V0 * K, 2), art = pick(["un ventilateur", "une paire de chaussures", "un vélo", "un téléphone", "une montre", "un sac de voyage"]);
      return { enonce: `Le prix d'${art}, $${V0}$ €, subit ${mot(s1, a)}, puis ${mot(s2, b)}. Quel est son prix final ?`, figure: coefs3([`${V0} €`, "?", "?"], [`× ${nbTexte(k1)}`, `× ${nbTexte(k2)}`]), mode: "nombre", prefixe: "Prix final :", suffixe: "€", attendu: Vf,
        erreurs: [{ valeur: arr(V0 * (1 + (s1 * a + s2 * b) / 100), 2), message: "Les pourcentages ne s'additionnent pas : la seconde évolution s'applique au nouveau prix." }, { valeur: arr(V0 * k1, 2), message: "N'oublie pas la seconde évolution." }],
        aides: [`Coefficients : $${nb(k1)}$ puis $${nb(k2)}$.`, `Après la première évolution : $${V0} \\times ${nb(k1)} = ${nb(arr(V0 * k1, 2))}$ €.`, `Puis $${nb(arr(V0 * k1, 2))} \\times ${nb(k2)}$.`],
        solution: `$${V0} \\times ${nb(k1)} = ${nb(arr(V0 * k1, 2))}$ €, puis $${nb(arr(V0 * k1, 2))} \\times ${nb(k2)} = ${nb(Vf)}$ €.` };
    }
    return { enonce: t === 1 ? `${objet} subit deux ${s1 > 0 ? "hausses" : "baisses"} successives de $${pct(a)}$. Quel est le pourcentage d'évolution global ? (Négatif pour une baisse.)` : `${objet} subit ${mot(s1, a)}, puis ${mot(s2, b)}. Quel est le pourcentage d'évolution global ? (Négatif pour une baisse.)`, figure: coefs3(["100", "?", "?"], [`× ${nbTexte(k1)}`, `× ${nbTexte(k2)}`], "× ?"), mode: "nombre", prefixe: "Évolution globale :", suffixe: "%", attendu: T,
      erreurs: [{ valeur: s1 * a + s2 * b, message: "Les pourcentages ne s'additionnent pas : on multiplie les coefficients." }, { valeur: arr(K * 100, 2), message: `Le coefficient global $${nb(K)}$ correspond à une évolution de $(${nb(K)} - 1) \\times 100$, pas à $${nb(arr(K * 100, 2))}\\,\\%$.` }],
      aides: [`Coefficients : $${nb(k1)}$ puis $${nb(k2)}$.`, `Coefficient global : $${nb(k1)} \\times ${nb(k2)} = ${nb(K)}$.`, `Taux : $(${nb(K)} - 1) \\times 100$.`],
      solution: `$${nb(k1)} \\times ${nb(k2)} = ${nb(K)}$ : évolution globale de $${rel(T)}\\,\\%$ (avec $100$ au départ : $100 \\to ${nb(arr(100 * k1, 2))} \\to ${nb(arr(100 * K, 2))}$).` };
  };

  // Deux unités reliées par deux flèches (aller : × k ; retour : ÷ k)
  const convFig3 = (u1, u2, k, aria) => sv3(320, 104, aria || `Pour passer de ${u1} à ${u2}, on multiplie par ${k} ; dans l'autre sens, on divise par ${k}`, `<rect class="g-rect" x="20" y="34" width="90" height="36" rx="8"/><rect class="g-rect" x="210" y="34" width="90" height="36" rx="8"/>` + tx3(65, 57, u1, "g-plabel", "middle") + tx3(255, 57, u2, "g-plabel", "middle") + flc3([110, 40], [160, 16], [210, 40]) + flc3([210, 64], [160, 88], [110, 64]) + tx3(160, 14, `× ${k}`, "g-mesure", "middle") + tx3(160, 99, `÷ ${k}`, "g-mesure", "middle"));

  GEN["pp3-conversions"] = function () {
    const t = rand(0, 4);
    if (t === 0) { const v = pick([18, 36, 54, 72, 90, 108, 126, 144, 9, 27, 45, 63, 81, 99, 117, 135]), r = v / 3.6, [qui, verbe] = pick([["La barge", "avance"], ["Un scooter", "roule"], ["Un coureur", "court"], ["Le vent", "souffle"], ["Une pirogue à moteur", "avance"], ["Un taxi-brousse", "roule"]]);
      return { enonce: `${qui} ${verbe} à $${v}$ km/h. Convertis cette vitesse en m/s.`, figure: Math.random() < 0.5 ? convFig3("m/s", "km/h", "3,6") : undefined, mode: "nombre", prefixe: "Vitesse :", suffixe: "m/s", attendu: r,
        erreurs: [{ valeur: arr(v * 3.6, 2), message: "Il faut diviser par $3{,}6$ (et non multiplier)." }, { valeur: arr(v / 60, 4), message: "$1$ h $= 3\\,600$ s, et il faut aussi convertir les km en m : on divise par $3{,}6$." }],
        aides: ["$1$ km $= 1\\,000$ m et $1$ h $= 3\\,600$ s.", `$${v}$ km/h $= \\dfrac{${v} \\times 1\\,000 \\text{ m}}{3\\,600 \\text{ s}}$.`, "Diviser par $3{,}6$ revient au même."], solution: `$\\dfrac{${nb(v * 1000)}}{3\\,600} = ${nb(r)}$ m/s.` }; }
    if (t === 1) { const v = rand(2, 40), r = arr(v * 3.6, 2), [qui, verbe] = pick([["Un requin", "nage"], ["Un cycliste", "roule"], ["Un ballon", "file"], ["Le vent", "souffle"], ["Un dauphin du lagon", "nage"]]);
      return { enonce: `${qui} ${verbe} à $${v}$ m/s. Convertis cette vitesse en km/h.`, figure: Math.random() < 0.5 ? convFig3("m/s", "km/h", "3,6") : undefined, mode: "nombre", prefixe: "Vitesse :", suffixe: "km/h", attendu: r,
        erreurs: [{ valeur: arr(v / 3.6, 4), message: "Pour passer des m/s aux km/h, on multiplie par $3{,}6$." }, { valeur: v * 3600, message: "En une heure on parcourt $3\\,600$ fois plus de mètres ; convertis ensuite ces mètres en kilomètres." }],
        aides: ["En $1$ h $= 3\\,600$ s, on parcourt $3\\,600$ fois plus.", `$${v} \\times 3\\,600 = ${nb(v * 3600)}$ m par heure.`, "Convertis les mètres en kilomètres."], solution: `$${v} \\times 3\\,600 = ${nb(v * 3600)}$ m par heure, soit $${nb(r)}$ km/h (on multiplie par $3{,}6$).` }; }
    if (t === 2) { // débits
      const qui = pick(["Un robinet", "Une pompe", "La gouttière d'une case", "Une fontaine", "Le tuyau d'arrosage d'un jardin de Combani"]), v = rand(0, 2);
      if (v === 0) { const d = rand(2, 30), r = d * 60;
        return { enonce: `${qui} a un débit de $${d}$ L/min. Quel est son débit en L/h ?`, mode: "nombre", prefixe: "Débit :", suffixe: "L/h", attendu: r,
          erreurs: [{ valeur: arr(d / 60, 4), message: "En une heure, il coule $60$ fois plus d'eau qu'en une minute." }, { valeur: d * 100, message: "$1$ h $= 60$ min (et non $100$ min)." }],
          aides: ["$1$ h $= 60$ min.", `En $60$ minutes : $${d} \\times 60$.`, "Calcule."], solution: `$${d} \\times 60 = ${nb(r)}$ L/h.` }; }
      if (v === 1) { const d = rand(2, 30) * 60, r = d / 60;
        return { enonce: `${qui} a un débit de $${nb(d)}$ L/h. Quel est son débit en L/min ?`, mode: "nombre", prefixe: "Débit :", suffixe: "L/min", attendu: r,
          erreurs: [{ valeur: d * 60, message: "En une minute, il coule $60$ fois moins d'eau qu'en une heure : on divise par $60$." }, { valeur: arr(d / 100, 2), message: "$1$ h $= 60$ min (et non $100$ min)." }],
          aides: ["$1$ h $= 60$ min.", "En une minute, il coule $60$ fois moins qu'en une heure.", `$${nb(d)} \\div 60$.`], solution: `$${nb(d)} \\div 60 = ${nb(r)}$ L/min.` }; }
      const m3 = rand(1, 12) * 3, r = (m3 * 1000) / 60;
      return { enonce: `${qui} a un débit de $${m3}$ m³/h. Quel est son débit en L/min ? (Rappel : $1$ m³ $= 1\\,000$ L.)`, mode: "nombre", prefixe: "Débit :", suffixe: "L/min", attendu: r,
        erreurs: [{ valeur: arr(m3 / 60, 4), message: "Convertis aussi les m³ en litres : $1$ m³ $= 1\\,000$ L." }, { valeur: m3 * 1000, message: "Ça, c'est le débit en L/h : divise par $60$ pour l'avoir en L/min." }],
        aides: [`$${m3}$ m³ $= ${nb(m3 * 1000)}$ L.`, `Le débit est donc $${nb(m3 * 1000)}$ L/h.`, "Divise par $60$ pour passer aux litres par minute."], solution: `$${m3}$ m³/h $= ${nb(m3 * 1000)}$ L/h $= ${nb(m3 * 1000)} \\div 60 = ${nb(r)}$ L/min.` };
    }
    if (t === 4) { // vitesse en m/min → km/h
      const [qui, mm] = pick([["Une tortue marine nage", [20, 25, 30, 40, 50, 60]], ["Un piéton marche", [50, 60, 75, 80, 90, 100]], ["Un escargot avance", [1, 2, 3, 5]], ["Un nageur avance", [40, 50, 60, 75]]]), v = pick(mm), r = arr((v * 60) / 1000, 4);
      return { enonce: `${qui} à $${v}$ m/min. Quelle est sa vitesse en km/h ?`, mode: "nombre", prefixe: "Vitesse :", suffixe: "km/h", attendu: r,
        erreurs: [{ valeur: v * 60, message: "Ça, c'est la distance en mètres parcourue en une heure : convertis-la en kilomètres." }, { valeur: arr(v / 60 / 1000, 6), message: "En une heure, on parcourt $60$ fois plus qu'en une minute : on multiplie par $60$." }],
        aides: ["$1$ h $= 60$ min.", `En une heure : $${v} \\times 60 = ${nb(v * 60)}$ m.`, "$1$ km $= 1\\,000$ m."], solution: `$${v} \\times 60 = ${nb(v * 60)}$ m par heure, soit $${nb(r)}$ km/h.` };
    }
    const [mat, rho] = pick([["du fer", 7.8], ["de l'aluminium", 2.7], ["du bois de manguier", 0.8], ["du plomb", 11.3], ["de l'eau de mer", 1.03], ["du verre", 2.5], ["de l'huile", 0.9], ["du béton", 2.4]]), inv = Math.random() < 0.4;
    if (inv) return { enonce: `La masse volumique ${mat} est $${nb(rho * 1000)}$ kg/m³. Exprime-la en g/cm³.`, mode: "nombre", prefixe: "Masse volumique :", suffixe: "g/cm³", attendu: rho,
      erreurs: [{ valeur: rho * 1000000, message: "$1$ m³ $= 1\\,000\\,000$ cm³ et $1$ kg $= 1\\,000$ g : on divise par $1\\,000$." }, { valeur: arr(rho / 1000, 6), message: "On divise par $1\\,000$ une seule fois." }],
      aides: ["$1$ kg $= 1\\,000$ g et $1$ m³ $= 1\\,000\\,000$ cm³.", `$${nb(rho * 1000)}$ kg/m³ $= \\dfrac{${nb(rho * 1000000)} \\text{ g}}{1\\,000\\,000 \\text{ cm}^3}$.`, "Cela revient à diviser par $1\\,000$."], solution: `$${nb(rho * 1000)} \\div 1\\,000 = ${nb(rho)}$ g/cm³.` };
    return { enonce: `La masse volumique ${mat} est $${nb(rho)}$ g/cm³. Exprime-la en kg/m³.`, mode: "nombre", prefixe: "Masse volumique :", suffixe: "kg/m³", attendu: arr(rho * 1000, 4),
      erreurs: [{ valeur: arr(rho / 1000, 6), message: "$1$ m³ $= 1\\,000\\,000$ cm³ et $1$ kg $= 1\\,000$ g : on multiplie par $1\\,000$." }, { valeur: arr(rho * 1000000, 2), message: "Après avoir multiplié par $1\\,000\\,000$ (des cm³ aux m³), convertis les grammes en kilogrammes." }],
      aides: ["$1$ m³ $= 1\\,000\\,000$ cm³.", `$${nb(rho)}$ g/cm³ $= ${nb(rho)} \\times 1\\,000\\,000$ g/m³.`, "Puis divise par $1\\,000$ pour avoir des kg."], solution: `$${nb(rho)} \\times 1\\,000\\,000 \\div 1\\,000 = ${nb(arr(rho * 1000, 4))}$ kg/m³.` };
  };

  GEN["pp3-grandeurs"] = function () {
    const t = rand(0, 3);
    if (t === 3) { // lire un graphique distance-temps (vitesse constante)
      const v = pick([30, 40, 45, 50, 60, 75, 80, 90]), T = pick([1, 1.5, 2, 2.5, 3]), D = v * T, ym = v * 4, py = [20, 25, 40, 50, 60, 75, 100].find((p) => ym / p <= 8), q = rand(0, 1), qui = pick(["un scooter", "un taxi-brousse", "une voiture", "un bus de ramassage scolaire"]);
      const fig = repere3({ xmin: 0, xmax: 4, ymin: 0, ymax: Math.ceil(ym / py) * py, pasX: 0.5, pasY: py, titreX: "temps (h)", titreY: "distance (km)", courbes: [{ f: (z) => v * z }], points: [[T, D]], guides: [[T, D]], aria: `Droite passant par l'origine : distance parcourue en fonction du temps ; le point marqué a pour abscisse ${nbTexte(T)} h et pour ordonnée ${nbTexte(D)} km` });
      if (q === 0) return { enonce: `Le graphique donne la distance parcourue par ${qui} en fonction du temps, à vitesse constante. Quelle est sa vitesse en km/h ?`, figure: fig, mode: "nombre", prefixe: "Vitesse :", suffixe: "km/h", attendu: v,
        erreurs: [{ valeur: D, message: `Ça, c'est la distance parcourue en $${nb(T)}$ h ; divise-la par la durée.` }, { valeur: arr(T / D, 4), message: "vitesse $= \\dfrac{\\text{distance}}{\\text{durée}}$ : la distance au numérateur." }],
        aides: ["Lis les coordonnées du point marqué : une durée et une distance.", `En $${nb(T)}$ h, la distance parcourue est $${nb(D)}$ km.`, `vitesse $= \\dfrac{${nb(D)}}{${nb(T)}}$.`],
        solution: `En $${nb(T)}$ h, ${qui} parcourt $${nb(D)}$ km : $v = \\dfrac{${nb(D)}}{${nb(T)}} = ${v}$ km/h. La droite passe par l'origine : la distance est proportionnelle au temps.` };
      const T2 = pick([0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4].filter((z) => z !== T)), D2 = v * T2;
      return { enonce: `Le graphique donne la distance parcourue par ${qui} en fonction du temps, à vitesse constante. Quelle distance parcourt-${qui.startsWith("une") ? "elle" : "il"} en $${nb(T2)}$ h ?`, figure: fig, mode: "nombre", prefixe: "Distance :", suffixe: "km", attendu: D2,
        erreurs: [{ valeur: D, message: `Ça, c'est la distance parcourue en $${nb(T)}$ h.` }, { valeur: v, message: "Ça, c'est la distance parcourue en $1$ h (la vitesse)." }],
        aides: ["La droite passe par l'origine : la distance est proportionnelle à la durée.", `Le point marqué donne $${nb(D)}$ km en $${nb(T)}$ h, soit $${v}$ km par heure.`, `Multiplie la vitesse par $${nb(T2)}$.`],
        solution: `Vitesse : $${nb(D)} \\div ${nb(T)} = ${v}$ km/h, donc en $${nb(T2)}$ h : $${v} \\times ${nb(T2)} = ${nb(D2)}$ km.` };
    }
    if (t === 0) { // vitesse moyenne avec durée en h et min
      const [veh, vs] = pick([["Un scooter", [30, 40, 45, 50, 60]], ["Un taxi-brousse", [40, 50, 60, 72]], ["Une voiture", [50, 60, 72, 80, 90]], ["Un avion", [600, 720, 800, 900]], ["Un bateau", [20, 24, 30, 36]]]);
      const h = rand(0, 3), m = pick([15, 30, 45, 20, 40]), D = h * 60 + m, v = pick(vs), d = arr((v * D) / 60, 2);
      if (!Number.isInteger(d * 10)) return GEN["pp3-grandeurs"]();
      const q = rand(0, 1);
      if (q === 0) return { enonce: `${veh} ${veh === "Un avion" ? "vole" : veh === "Un bateau" ? "navigue" : "roule"} à la vitesse moyenne de $${v}$ km/h pendant ${h ? `$${h}$ h ` : ""}$${m}$ min. Quelle distance parcourt-${veh === "Une voiture" ? "elle" : "il"} ?`, mode: "nombre", prefixe: "Distance :", suffixe: "km", attendu: d,
        erreurs: [{ valeur: arr(v * (h + m / 100), 2), message: `$${m}$ min ne font pas $0{,}${m}$ h : $${m}$ min $= \\dfrac{${m}}{60}$ h.` }, { valeur: arr(v * D, 2), message: "La vitesse est en km par heure : la durée doit être en heures, pas en minutes." }],
        aides: ["distance $=$ vitesse $\\times$ durée, avec la durée en heures.", `$${h ? `${h}$ h ` : ""}$${m}$ min $= ${nb(arr(D / 60, 4))}$ h.`.replace("$$", "$"), `$${v} \\times ${nb(arr(D / 60, 4))}$.`],
        solution: `$${v} \\times \\dfrac{${D}}{60} = ${nb(d)}$ km.` };
      const trajet = pick(["Un taxi-brousse va de Mamoudzou à Kani-Kéli", "Un bus va de Mamoudzou à M'tsamboro", "Une voiture fait le tour de Grande-Terre", "Un scooter va de Dzaoudzi à Pamandzi puis revient", "Un véhicule fait un trajet"]);
      return { enonce: `${trajet} : $${nb(d)}$ km en ${h ? `$${h}$ h ` : ""}$${m}$ min. Quelle est sa vitesse moyenne en km/h ?`, mode: "nombre", prefixe: "Vitesse :", suffixe: "km/h", attendu: v,
        erreurs: [{ valeur: arr(d / (h + m / 100), 2), message: `$${m}$ min $= \\dfrac{${m}}{60}$ h, pas $0{,}${m}$ h.` }, { valeur: arr(d / D, 4), message: "En divisant par la durée en minutes, on obtient des km par minute ; il faut des km par heure." }],
        aides: ["vitesse $= \\dfrac{\\text{distance}}{\\text{durée}}$, avec la durée en heures.", `Durée : $\\dfrac{${D}}{60}$ h.`, `$${nb(d)} \\div \\dfrac{${D}}{60} = ${nb(d)} \\times \\dfrac{60}{${D}}$.`],
        solution: `$${nb(d)} \\times \\dfrac{60}{${D}} = ${v}$ km/h.` };
    }
    if (t === 1) { // masse volumique
      const [obj, mat, rho] = pick([["Un objet en bois de manguier", "du bois de manguier", 0.8], ["Un volume d'eau douce", "de l'eau douce", 1], ["Une pièce en aluminium", "de l'aluminium", 2.7], ["Un outil en fer", "du fer", 7.8], ["Un volume d'huile", "de l'huile", 0.9], ["Un bloc de béton", "du béton", 2.4], ["Un volume d'eau de mer", "de l'eau de mer", 1.03]]), V = rand(2, 50) * 10, q = rand(0, 1), M = arr(rho * V, 2);
      return q === 0 ? { enonce: `${obj} a un volume de $${V}$ cm³. La masse volumique ${mat} est $${nb(rho)}$ g/cm³. Quelle est sa masse ?`, mode: "nombre", prefixe: "Masse :", suffixe: "g", attendu: M,
        erreurs: [{ valeur: arr(V / rho, 2), message: "masse $=$ masse volumique $\\times$ volume." }, { valeur: arr(V + rho, 2), message: "On multiplie la masse volumique par le volume (on n'additionne pas)." }], aides: ["La masse volumique est la masse d'un cm³.", `Pour $${V}$ cm³ : $${nb(rho)} \\times ${V}$.`, "Calcule."], solution: `$${nb(rho)} \\times ${V} = ${nb(M)}$ g.` }
        : { enonce: `${obj} a un volume de $${V}$ cm³ et une masse de $${nb(M)}$ g. Quelle est la masse volumique ${mat}, en g/cm³ ?`, mode: "nombre", prefixe: "Masse volumique :", suffixe: "g/cm³", attendu: rho,
        erreurs: [{ valeur: arr(V / M, 4), message: "masse volumique $= \\dfrac{\\text{masse}}{\\text{volume}}$ : la masse au numérateur." }, { valeur: arr(M * V, 2), message: "On divise la masse par le volume (on ne multiplie pas)." }], aides: ["masse volumique $= \\dfrac{\\text{masse}}{\\text{volume}}$.", `$\\dfrac{${nb(M)}}{${V}}$.`, "Calcule."], solution: `$${nb(M)} \\div ${V} = ${nb(rho)}$ g/cm³.` };
    }
    // proportionnalité : quatrième proportionnelle
    const a = rand(2, 12), pu = pick([0.5, 1.2, 1.5, 2.4, 3, 4.5, 2.5, 0.8]), b = rand(2, 20), pa = arr(a * pu, 2), pb = arr(b * pu, 2);
    const obj = pick([["kg de mangues", "€"], ["litres de jus de goyave", "€"], ["mètres de tissu pour un salouva", "€"], ["kg de manioc", "€"], ["kg de riz", "€"], ["bouquets d'ylang-ylang", "€"]]);
    return { enonce: `Au marché de Mamoudzou, $${a}$ ${obj[0]} coûtent $${nb(pa)}$ ${obj[1]}. Combien coûtent $${b}$ ${obj[0]} (le prix est proportionnel à la quantité) ?`, mode: "nombre", prefixe: "Prix :", suffixe: obj[1], attendu: pb,
      erreurs: [{ valeur: arr(pa + b - a, 2), message: "Ce n'est pas un écart constant : c'est une situation de proportionnalité." }, { valeur: arr(pa * b, 2), message: `On multiplie le prix d'**une** unité par $${b}$, pas le prix de $${a}$ unités.` }],
      aides: [`Calcule d'abord le prix d'une unité : $${nb(pa)} \\div ${a}$.`, `Prix unitaire : $${nb(pu)}$ ${obj[1]}.`, `Multiplie par $${b}$.`], solution: `$${nb(pa)} \\div ${a} \\times ${b} = ${nb(pu)} \\times ${b} = ${nb(pb)}$ ${obj[1]}.` };
  };

  // Barre partagée selon un ratio : parts = [[nom, nombre de parts, texte dans la barre ?]], total au-dessus
  function ratioBarre3(parts, total, aria) {
    const n = parts.reduce((s, p) => s + p[1], 0), x0 = 14, w = 292, y = 34, h = 30, u = w / n; let s = "", k = 0;
    parts.forEach(([nom, m, dedans], i) => {
      const xs = x0 + k * u, cl = ["g-rect", "g-barre-plus", "g-carreau"][i % 3];
      for (let j = 0; j < m; j++) s += `<rect class="${cl}" x="${r3(x0 + (k + j) * u)}" y="${y}" width="${r3(u)}" height="${h}"/>`;
      if (dedans) s += tx3(xs + (m * u) / 2, y + h / 2 + 4, dedans, "g-plabel", "middle");
      s += tx3(xs + (m * u) / 2, y + h + 16 + (m * u < 64 && i % 2 ? 14 : 0), nom, "g-plabel", "middle");
      k += m;
    });
    s += `<rect class="g-unite" x="${x0}" y="${y}" width="${w}" height="${h}"/><path class="g-accolade" d="M${x0 + 1} ${y - 5} V${y - 11} H${x0 + w - 1} V${y - 5}"/>` + tx3(x0 + w / 2, y - 15, total, "g-mesure", "middle");
    return sv3(320, y + h + 36, aria || `Barre partagée en ${n} parts égales : ${parts.map(([nom, m]) => `${m} pour ${nom}`).join(", ")}`, s);
  }

  GEN["pp3-ratio"] = function () {
    const t = rand(0, 4), [n1, n2, n3] = shuffle(PRENOMS3.slice()).slice(0, 3);
    if (t <= 1) { // partager une quantité selon un ratio a : b ou a : b : c
      const R = t === 1 ? pick([[1, 2, 3], [2, 3, 5], [1, 1, 2], [2, 3, 4], [3, 4, 5], [1, 2, 2], [1, 3, 4], [2, 2, 3]]) : pick([[1, 2], [2, 3], [3, 4], [1, 3], [3, 5], [2, 5], [4, 5], [1, 4], [5, 7], [3, 7]]);
      const N = R.reduce((s, v) => s + v, 0), k = rand(2, 30), S = N * k, noms = [n1, n2, n3].slice(0, R.length), i = rand(0, R.length - 1);
      const [u, phrase] = pick([["€", `${noms.join(t ? ", " : " et ").replace(/, ([^,]*)$/, " et $1")} se partagent un gain de $${S}$ € au tournoi de football du collège`], ["mangues", `${noms.join(t ? ", " : " et ").replace(/, ([^,]*)$/, " et $1")} se partagent les $${S}$ mangues d'un manguier`], ["€", `${noms.join(t ? ", " : " et ").replace(/, ([^,]*)$/, " et $1")} se partagent les $${S}$ € gagnés en vendant des brochettes`], ["coquillages", `${noms.join(t ? ", " : " et ").replace(/, ([^,]*)$/, " et $1")} se partagent les $${S}$ coquillages ramassés à la plage de Moya`]]);
      return { enonce: `${phrase}, dans le ratio $${R.join(" : ")}$ (dans cet ordre). Combien ${noms[i]} reçoit-${il3(noms[i])} ?`, figure: ratioBarre3(noms.map((nm, j) => [nm, R[j]]), `${S} ${u}`), mode: "nombre", prefixe: `${noms[i]} :`, suffixe: u, attendu: R[i] * k,
        erreurs: [{ valeur: k, message: `Ça, c'est la valeur d'une seule part ; ${noms[i]} en reçoit $${R[i]}$.` }, ...(S % R.length === 0 ? [{ valeur: S / R.length, message: "Le partage n'est pas égal : il suit le ratio." }] : []), { valeur: S - R[i] * k, message: `Ça, c'est ce que reçoivent les autres.` }],
        aides: [`Le ratio $${R.join(" : ")}$ partage la quantité en $${R.join(" + ")} = ${N}$ parts égales.`, `Une part vaut $${S} \\div ${N} = ${k}$ ${u}.`, `${noms[i]} reçoit $${R[i]}$ part${R[i] > 1 ? "s" : ""}.`],
        solution: `$${S} \\div ${N} = ${k}$ ${u} par part, donc ${noms[i]} reçoit $${R[i]} \\times ${k} = ${R[i] * k}$ ${u}.` };
    }
    if (t === 2) { // une quantité connue → l'autre
      const [a, b] = pick([[2, 3], [3, 2], [3, 4], [4, 3], [5, 4], [1, 2], [3, 5], [5, 6], [2, 5]]), k = rand(2, 8), A = a * k, B = b * k, [g1, g2, lieu] = pick([["filles", "garçons", `une classe de 3e de ${pick(VILLES3)}`], ["tortues vertes", "tortues imbriquées", "un groupe de tortues observé à N'Gouja"], ["bananes", "mangues", "un panier du marché de Mamoudzou"], ["élèves externes", "élèves demi-pensionnaires", "un club du collège"]]);
      return { enonce: `Dans ${lieu}, le ratio ${g1} : ${g2} est $${a} : ${b}$. Il y a $${A}$ ${g1}. Combien y a-t-il de ${g2} ?`, figure: ratioBarre3([[g1, a, String(A)], [g2, b, "?"]], "?"), mode: "nombre", prefixe: `${g2[0].toUpperCase() + g2.slice(1)} :`, attendu: B,
        erreurs: [{ valeur: A + (b - a), message: "Un ratio ne donne pas un écart constant : c'est une situation de proportionnalité." }, { valeur: k, message: "Ça, c'est la valeur d'une part." }, { valeur: A * b, message: `Divise d'abord par $${a}$ pour trouver une part.` }],
        aides: [`$${a}$ parts correspondent à $${A}$ ${g1}.`, `Une part vaut $${A} \\div ${a} = ${k}$.`, `Les ${g2} représentent $${b}$ parts.`],
        solution: `Une part vaut $${A} \\div ${a} = ${k}$, donc il y a $${b} \\times ${k} = ${B}$ ${g2}.` };
    }
    if (t === 3) { // mélange
      const [a, b] = pick([[1, 4], [1, 3], [1, 5], [2, 3], [1, 2], [2, 5], [3, 7]]), N = a + b, k = rand(2, 15) * 5, V = N * k, [ing, mel] = pick([["sirop de goyave", "eau"], ["jus de citron", "eau"], ["lait de coco", "jus d'ananas"], ["jus de mangue", "jus de fruit de la passion"]]), q = Math.random() < 0.5;
      const part = (s) => (s === "eau" ? "de l'eau" : `du ${s}`), de = (s) => (/^[aeiouéè]/.test(s) ? `d'${s}` : `de ${s}`);
      return { enonce: `Pour une boisson, on mélange ${part(ing)} et ${part(mel)} dans le ratio $${a} : ${b}$. Quelle quantité ${de(q ? ing : mel)} faut-il pour préparer $${V}$ cL de boisson ?`, figure: ratioBarre3([[ing, a], [mel, b]], `${V} cL`), mode: "nombre", suffixe: "cL", attendu: (q ? a : b) * k,
        erreurs: [{ valeur: k, message: "Ça, c'est la valeur d'une part." }, { valeur: arr((V * (q ? a : b)) / (q ? b : a), 2), message: `Le total compte $${a} + ${b} = ${N}$ parts : on divise $${V}$ par $${N}$.` }],
        aides: [`Le ratio $${a} : ${b}$ partage le mélange en $${N}$ parts égales.`, `Une part : $${V} \\div ${N} = ${k}$ cL.`, `Il faut $${q ? a : b}$ part${(q ? a : b) > 1 ? "s" : ""}.`],
        solution: `$${V} \\div ${N} = ${k}$ cL par part, donc $${q ? a : b} \\times ${k} = ${(q ? a : b) * k}$ cL ${de(q ? ing : mel)}.` };
    }
    // simplifier un ratio
    let a0, b0; do { a0 = rand(1, 7); b0 = rand(2, 9); } while (a0 === b0 || pgcd(a0, b0) > 1);
    const k = rand(2, 9), A = a0 * k, B = b0 * k, bonne = `$${a0} : ${b0}$`;
    const faux = [[b0, a0], [a0 + 1, b0], [a0, b0 + 1], [A - a0, B - b0 + 1], [a0 * 2, b0 * 3]].filter(([p, q]) => p > 0 && q > 0 && p * B !== q * A).map(([p, q]) => `$${p} : ${q}$`);
    const { choix, attendu } = melange(bonne, uniq3(bonne, faux));
    return { enonce: `Le ratio $${A} : ${B}$ est égal au ratio :`, mode: "choix", choix, attendu,
      aides: ["Comme pour une fraction, on peut diviser les deux nombres d'un ratio par un même nombre.", `Cherche un diviseur commun à $${A}$ et $${B}$.`, `$${A} = ${k} \\times ${a0}$ et $${B} = ${k} \\times ${b0}$.`],
      solution: `On divise les deux nombres par $${k}$ : $${A} : ${B} = ${a0} : ${b0}$.` };
  };

  FIGURES["pp3-cours-pourcentage"] = () => barrePct3(15, "240", "?", "Barre représentant 240 (100 %), graduée de 10 % en 10 % ; 15 % sont coloriés");
  FIGURES["pp3-cours-coefs"] = () => coefs3(["50 €", "60 €", "48 €"], ["× 1,2", "× 0,8"], "× 0,96 : baisse de 4 %", "50 € multiplié par 1,2 donne 60 €, puis multiplié par 0,8 donne 48 € : en tout, multiplication par 0,96");
  FIGURES["pp3-cours-conversions"] = () => convFig3("m/s", "km/h", "3,6");
  FIGURES["pp3-cours-ratio"] = () => ratioBarre3([["Anli", 2, "60 €"], ["Nasra", 3, "90 €"]], "150 €", "Barre de 150 € partagée en 5 parts de 30 € : 2 parts (60 €) pour Anli et 3 parts (90 €) pour Nasra");
  FIGURES["pp3-qcm-barre"] = () => barrePct3(25, "80 €");
  FIGURES["pp3-qcm-coefs"] = () => coefs3(["200 €", "?", "?"], ["× 1,1", "× 0,9"]);

  /* =====================================================================
     Chapitre 9 : probabilités (pr3-) — contraire, deux épreuves, arbres, fréquences
     ===================================================================== */
  // Urne (ou sac) de boules marquées R, V, J, B (couleurs du thème + lettre) : c = [[nombre, lettre]]
  const COUL3 = { R: "--faux", V: "--bon", J: "--ylang", B: "--lagon" };
  function figUrne3(c, aria) {
    const balls = []; c.forEach(([n, l]) => { for (let i = 0; i < n; i++) balls.push(l); });
    const par = Math.min(8, Math.max(4, Math.ceil(Math.sqrt(balls.length * 2.2)))), rows = Math.ceil(balls.length / par), d = 24, w = par * d + 22, h = rows * d + 16, x0 = 160 - w / 2, yb = h + 18;
    let s = `<path class="g-arc-plein" d="M${r3(x0)} 10 V${yb - 10} Q${r3(x0)} ${yb} ${r3(x0 + 12)} ${yb} H${r3(x0 + w - 12)} Q${r3(x0 + w)} ${yb} ${r3(x0 + w)} ${yb - 10} V10"/>`;
    balls.forEach((l, i) => { const cx = x0 + 11 + d / 2 + (i % par) * d, cy = yb - 4 - d / 2 - Math.floor(i / par) * d; s += `<circle cx="${r3(cx)}" cy="${r3(cy)}" r="10.5" style="fill:var(${COUL3[l]});fill-opacity:.5;stroke:var(--encre);stroke-width:1"/>` + tx3(cx, cy + 4, l, "g-plabel", "middle"); });
    return sv3(320, yb + 6, aria || `Urne contenant ${c.filter(([n]) => n).map(([n, l]) => `${n} boule${n > 1 ? "s" : ""} ${{ R: "rouge", V: "verte", J: "jaune", B: "bleue" }[l]}${n > 1 ? "s" : ""}`).join(", ")}`, s);
  }
  // Roue de loterie : parts = [[étiquette, valeur proportionnelle]], flèche en haut
  function roue3(parts, aria) {
    const cx = 160, cy = 96, r = 74, tot = parts.reduce((s, p) => s + p[1], 0); let a = -Math.PI / 2, s = "";
    parts.forEach(([lab, v], i) => {
      const b = a + (2 * Math.PI * v) / tot, m = (a + b) / 2, P1 = [cx + r * Math.cos(a), cy + r * Math.sin(a)], P2 = [cx + r * Math.cos(b), cy + r * Math.sin(b)];
      s += v >= tot ? `<circle class="g-secteur g-secteur-${i % 4}" cx="${cx}" cy="${cy}" r="${r}" style="fill-opacity:.5"/>` : `<path class="g-secteur g-secteur-${i % 4}" style="fill-opacity:.5" d="M${cx} ${cy} L${r3(P1[0])} ${r3(P1[1])} A${r} ${r} 0 ${b - a > Math.PI ? 1 : 0} 1 ${r3(P2[0])} ${r3(P2[1])} Z"/>`;
      s += tx3(cx + 0.62 * r * Math.cos(m), cy + 0.62 * r * Math.sin(m) + 4, lab, "g-plabel", "middle"); a = b;
    });
    return sv3(320, 178, aria || `Roue de loterie partagée en secteurs ${parts.map((p) => p[0]).join(", ")}`, s + `<circle class="g-point" cx="${cx}" cy="${cy}" r="4"/><polygon class="g-poly" points="${cx - 8},${cy - r - 14} ${cx + 8},${cy - r - 14} ${cx},${cy - r + 6}"/>`);
  }
  // Arbre de probabilités à deux niveaux : n1 = [[issue, proba]], n2 = [[[issue, proba], …] pour chaque branche] ; proba = [n, d] ou texte
  function arbreP3(n1, n2, aria) {
    const F = n2.reduce((s, b) => s + b.length, 0), hF = F > 4 ? 28 : 40, H = F * hF + 14, x0 = 14, x1 = 136, x2 = 270, ys1 = [];
    let s = "", yF = 7 + hF / 2;
    const lab = (P, Q, p, haut, petit) => { const M = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2]; if (typeof p === "string" || petit) return tx3(M[0], M[1] + (haut ? -6 : 14), typeof p === "string" ? p : `${p[0]}/${p[1]}`, "g-mesure", "middle"); return frs3(M[0], M[1] + (haut ? -16 : 14), p[0], p[1]); };
    n2.forEach((br) => { if (br.length === 1) yF += hF * 0.35; const ys = br.map(() => { const y = yF; yF += hF; return y; }); if (br.length === 1) yF += hF * 0.35; ys1.push([(ys[0] + ys[ys.length - 1]) / 2, ys]); });
    const y0 = (ys1[0][0] + ys1[ys1.length - 1][0]) / 2;
    const hw = (t) => Math.max(10, String(t).length * 3.7 + 5); // demi-largeur d'une étiquette de nœud
    n1.forEach(([nom, p], i) => {
      const [y1, ys] = ys1[i]; s += ln3(x0 + 4, y0, x1 - hw(nom), y1, "g-droite") + lab([x0, y0], [x1 - hw(nom), y1], p, y1 <= y0, n1.length > 2) + tx3(x1, y1 + 4, nom, "g-plabel", "middle");
      n2[i].forEach(([nom2, p2], j) => { s += ln3(x1 + hw(nom), y1, x2 - hw(nom2), ys[j], "g-droite") + lab([x1 + hw(nom), y1], [x2 - hw(nom2), ys[j]], p2, ys[j] <= y1, n2[i].length > 2) + tx3(x2, ys[j] + 4, nom2, "g-plabel", "middle"); });
    });
    return sv3(320, Math.max(H, yF - hF / 2 + 7), aria || "Arbre de probabilités à deux niveaux", s + `<circle class="g-point" cx="${x0}" cy="${r3(y0)}" r="3"/>`);
  }
  // Tableau à double entrée des sommes (ou produits) de deux dés
  const tableDes3 = (op) => ({ lignes: [[op === "×" ? "\\times" : "+", "1", "2", "3", "4", "5", "6"], ...[1, 2, 3, 4, 5, 6].map((a) => [String(a), ...[1, 2, 3, 4, 5, 6].map((b) => String(op === "×" ? a * b : a + b))])] });
  const urne3 = () => { const r = rand(1, 8), v = rand(1, 8), j = rand(0, 5), [rec, art] = pick([["Une urne", "boule"], ["Un sac", "bille"], ["Une boîte", "balle"]]); return { r, v, j, n: r + v + j, art, txt: `${rec} contient $${r}$ ${art}${r > 1 ? "s" : ""} rouge${r > 1 ? "s" : ""}, $${v}$ verte${v > 1 ? "s" : ""}${j ? ` et $${j}$ jaune${j > 1 ? "s" : ""}` : ""}, indiscernables au toucher.`, fig: figUrne3([[r, "R"], [v, "V"], [j, "J"]]) }; };

  GEN["pr3-simple"] = function () {
    const U = urne3(), t = rand(0, 3);
    if (t === 0) { const v = U.r / U.n;
      return { enonce: `${U.txt} On tire une ${U.art} au hasard. Quelle est la probabilité qu'elle soit rouge ?${CONSIGNE_FR}`, figure: U.fig, mode: "nombre", prefixe: "$P(R) =$", attendu: v,
        erreurs: [{ valeur: U.r / (U.n - U.r), message: `On divise par le nombre **total** de ${U.art}s.` }, { valeur: U.v / U.n, message: "Ça, c'est la probabilité de tirer une verte." }, ...approx(v)],
        aides: ["Les tirages sont équiprobables.", `Il y a $${U.n}$ ${U.art}s en tout, dont $${U.r}$ rouge${U.r > 1 ? "s" : ""}.`, `$P(R) = \\dfrac{${U.r}}{${U.n}}$.`], solution: `$P(R) = ${fr(U.r, U.n)}${pgcd(U.r, U.n) > 1 ? ` = ${frS(U.r, U.n)}` : ""}$.` }; }
    if (t === 1) { const v = 1 - U.v / U.n;
      return { enonce: `${U.txt} On tire une ${U.art} au hasard. Quelle est la probabilité qu'elle ne soit pas verte ?${CONSIGNE_FR}`, figure: U.fig, mode: "nombre", prefixe: "Probabilité :", attendu: v,
        erreurs: [{ valeur: U.v / U.n, message: "Ça, c'est la probabilité qu'elle soit verte." }, ...(U.j ? [{ valeur: U.r / U.n, message: "« Pas verte », c'est rouge **ou** jaune : n'oublie pas les jaunes." }] : []), ...approx(v)],
        aides: ["« Ne pas être verte » est l'événement contraire de « être verte ».", `$P(V) = ${fr(U.v, U.n)}$.`, "$P(\\overline{V}) = 1 - P(V)$."], solution: `$1 - ${fr(U.v, U.n)} = ${frS(U.n - U.v, U.n)}$.` }; }
    if (t === 3) { // cartes numérotées
      const n = rand(10, 30), [nom, test] = pick([["un multiple de $3$", (k) => k % 3 === 0], ["un multiple de $4$", (k) => k % 4 === 0], ["un multiple de $5$", (k) => k % 5 === 0], ["un nombre pair", (k) => k % 2 === 0], ["un nombre premier", premier3], [`un nombre supérieur ou égal à $${Math.floor(n / 2) + 3}$`, (k) => k >= Math.floor(n / 2) + 3], ["un nombre dont le chiffre des unités est $7$", (k) => k % 10 === 7]]), L = []; for (let k = 1; k <= n; k++) if (test(k)) L.push(k);
      const v = L.length / n;
      return { enonce: `On tire au hasard une carte parmi $${n}$ cartes numérotées de $1$ à $${n}$ (voir le tableau). Quelle est la probabilité d'obtenir ${nom} ?${CONSIGNE_FR}`, figure: grilleNombres3(1, n), mode: "nombre", prefixe: "Probabilité :", attendu: v,
        erreurs: [{ valeur: L.length / (n - L.length), message: "On divise par le nombre **total** de cartes." }, { valeur: 1 - v, message: "Ça, c'est la probabilité de l'événement contraire." }, ...approx(v)],
        aides: ["Les $" + n + "$ cartes ont la même chance d'être tirées.", `Compte les cartes qui conviennent : ${nom}.`, `Il y en a $${L.length}$.`], solution: `Les cartes qui conviennent sont ${liste3(L)} : $P = ${fr(L.length, n)}${pgcd(L.length, n) > 1 ? ` = ${frS(L.length, n)}` : ""}$.` };
    }
    // non équiprobable : roue
    const a = pick([0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45]), b = pick([0.1, 0.15, 0.2, 0.25, 0.3, 0.4]), c = arr(1 - a - b, 2), q = rand(0, 1);
    if (c <= 0.05) return GEN["pr3-simple"]();
    if (q === 1) return { enonce: `Une roue de loterie a trois secteurs A, B et C. $P(A) = ${nb(a)}$ et $P(B) = ${nb(b)}$. Quelle est la probabilité de ne pas obtenir le secteur A ?`, figure: roue3([["A", a], ["B", b], ["C", c]]), mode: "nombre", prefixe: "Probabilité :", attendu: arr(1 - a, 2),
      erreurs: [{ valeur: a, message: "Ça, c'est la probabilité d'obtenir A." }, { valeur: b, message: "« Ne pas obtenir A », c'est obtenir B **ou** C." }],
      aides: ["« Ne pas obtenir A » est l'événement contraire de « obtenir A ».", "$P(\\overline{A}) = 1 - P(A)$.", `$1 - ${nb(a)}$.`], solution: `$P(\\overline{A}) = 1 - ${nb(a)} = ${nb(arr(1 - a, 2))}$.` };
    return { enonce: `Une roue de loterie a trois secteurs A, B et C. $P(A) = ${nb(a)}$ et $P(B) = ${nb(b)}$. Quelle est la probabilité d'obtenir C ?`, figure: roue3([["A", a], ["B", b], ["C ?", c]]), mode: "nombre", prefixe: "$P(C) =$", attendu: c,
      erreurs: [{ valeur: arr(1 / 3, 4), message: "Les secteurs n'ont pas la même probabilité : on utilise que la somme vaut $1$." }, { valeur: arr(a + b, 2), message: "Ça, c'est la probabilité d'obtenir A ou B : retire-la de $1$." }],
      aides: ["La somme des probabilités de toutes les issues vaut $1$.", `$P(C) = 1 - ${nb(a)} - ${nb(b)}$.`, "Calcule."], solution: `$1 - ${nb(a)} - ${nb(b)} = ${nb(c)}$.` };
  };

  GEN["pr3-deux-epreuves"] = function () {
    const t = rand(0, 2);
    if (t === 0) { // deux dés : somme, produit, double…
      const op = Math.random() < 0.7 ? "+" : "×", k = op === "+" ? rand(2, 12) : pick([1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20, 24, 30, 36]), v0 = rand(0, 6), cases = [], qui = pick(PRENOMS3);
      for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) cases.push([a, b, op === "+" ? a + b : a * b]);
      const seuil = op === "+" ? Math.max(6, Math.min(k, 11)) : Math.max(10, Math.min(k, 30)), m3 = rand(3, 5);
      const e = op === "+" ? "e" : "", [nom, test] = [[`égal${e} à $${k}$`, (z) => z[2] === k], [`supérieur${e} ou égal${e} à $${seuil}$`, (z) => z[2] >= seuil], [`pair${e}`, (z) => z[2] % 2 === 0], ["un double (deux dés identiques)", (z) => z[0] === z[1]], [`un multiple de $${m3}$`, (z) => z[2] % m3 === 0], ["au moins un $6$", (z) => z[0] === 6 || z[1] === 6], ["deux nombres différents", (z) => z[0] !== z[1]]][v0];
      const n = cases.filter(test).length, v = n / 36, tab = Math.random() < 0.6, surDes = v0 === 3 || v0 >= 5;
      if (!n) return GEN["pr3-deux-epreuves"]();
      return { enonce: surDes ? `${qui} lance deux dés équilibrés à six faces${tab ? " (le tableau donne les 36 issues avec leur somme)" : ""}. Quelle est la probabilité d'obtenir ${nom} ?${CONSIGNE_FR}` : `${qui} lance deux dés équilibrés à six faces et ${op === "+" ? "additionne" : "multiplie"} les résultats${tab ? " (voir le tableau)" : ""}. Quelle est la probabilité que ${op === "+" ? "la somme" : "le produit"} soit ${nom} ?${CONSIGNE_FR}`, tableau: tab ? tableDes3(surDes ? "+" : op) : undefined, mode: "nombre", prefixe: "Probabilité :", attendu: v,
        erreurs: [...(op === "+" && v0 === 0 ? [{ valeur: 1 / 11, message: "Les $11$ sommes possibles ne sont pas équiprobables : utilise le tableau à double entrée ($36$ cases)." }] : []), { valeur: n / 6, message: "Il y a $6 \\times 6 = 36$ issues équiprobables, pas $6$." }, { valeur: 1 - v, message: "Ça, c'est la probabilité de l'événement contraire." }, ...approx(v)],
        aides: ["Le tableau à double entrée contient $6 \\times 6 = 36$ issues équiprobables.", "Compte les cases qui conviennent.", `Il y en a $${n}$.`], solution: `$${n}$ cases sur $36$ conviennent : $P = ${fr(n, 36)}${pgcd(n, 36) > 1 ? ` = ${frS(n, 36)}` : ""}$.` };
    }
    if (t === 1) { // deux tirages avec remise (arbre)
      const U = urne3(), q = U.j && Math.random() < 0.4 ? 1 : 0, cols = [["R", U.r], ["V", U.v], ...(U.j ? [["J", U.j]] : [])];
      const fig = arbreP3(cols.map(([c, m]) => [c, [m, U.n]]), cols.map(() => cols.map(([c, m]) => [c, [m, U.n]])), `Arbre de probabilités de deux tirages avec remise : à chaque tirage, rouge ${U.r}/${U.n}, verte ${U.v}/${U.n}${U.j ? `, jaune ${U.j}/${U.n}` : ""}`);
      if (q === 0) { const v = (U.r / U.n) ** 2;
        return { enonce: `${U.txt} On tire une ${U.art}, on note sa couleur, on la remet, puis on en tire une seconde. Quelle est la probabilité d'obtenir deux ${U.art}s rouges ?${CONSIGNE_FR}`, figure: fig, mode: "nombre", prefixe: "Probabilité :", attendu: v,
          erreurs: [{ valeur: (2 * U.r) / U.n, message: "On multiplie les probabilités le long d'une branche de l'arbre (on n'additionne pas)." }, { valeur: U.r / U.n, message: "Ça, c'est la probabilité pour un seul tirage." }, ...approx(v)],
          aides: ["Suis le chemin R puis R dans l'arbre.", `À chaque tirage, $P(R) = ${fr(U.r, U.n)}$ (on remet la ${U.art}).`, "On multiplie les probabilités sur le chemin."], solution: `$${fr(U.r, U.n)} \\times ${fr(U.r, U.n)} = ${frS(U.r * U.r, U.n * U.n)}$.` }; }
      const s = U.r * U.r + U.v * U.v + U.j * U.j, v = s / (U.n * U.n);
      return { enonce: `${U.txt} On tire une ${U.art}, on note sa couleur, on la remet, puis on en tire une seconde. Quelle est la probabilité que les deux ${U.art}s aient la même couleur ?${CONSIGNE_FR}`, figure: fig, mode: "nombre", prefixe: "Probabilité :", attendu: v,
        erreurs: [{ valeur: (U.r * U.r) / (U.n * U.n), message: "Il y a trois chemins qui conviennent : RR, VV et JJ." }, { valeur: 1 - v, message: "Ça, c'est la probabilité que les couleurs soient différentes." }, ...approx(v)],
        aides: ["Repère les chemins RR, VV et JJ dans l'arbre.", "Multiplie les probabilités le long de chaque chemin.", "Additionne les trois résultats."], solution: `$${fr(U.r * U.r, U.n * U.n)} + ${fr(U.v * U.v, U.n * U.n)} + ${fr(U.j * U.j, U.n * U.n)} = ${frS(s, U.n * U.n)}$.` };
    }
    // pièce + dé : tableau des 12 issues
    const face = pick(["pile", "face"]), cond = pick([["un nombre pair", 3], ["un multiple de $3$", 2], ["un $6$", 1], ["un nombre supérieur à $4$", 2], ["un nombre premier", 3], ["un nombre inférieur à $3$", 2], ["un nombre impair", 3]]), v = (1 / 2) * (cond[1] / 6);
    return { enonce: `${pick(PRENOMS3)} lance une pièce équilibrée puis un dé équilibré à six faces. Le tableau donne les $12$ issues. Quelle est la probabilité d'obtenir « ${face} » et ${cond[0]} ?${CONSIGNE_FR}`, tableau: { lignes: [["", "1", "2", "3", "4", "5", "6"], ["\\text{P}", ...[1, 2, 3, 4, 5, 6].map((k) => `\\text{P}${k}`)], ["\\text{F}", ...[1, 2, 3, 4, 5, 6].map((k) => `\\text{F}${k}`)]] }, mode: "nombre", prefixe: "Probabilité :", attendu: v,
      erreurs: [{ valeur: 1 / 2 + cond[1] / 6, message: "« Et » sur deux épreuves successives : on multiplie (ou on compte les cases du tableau)." }, { valeur: cond[1] / 6, message: "N'oublie pas la pièce : une seule ligne du tableau convient." }, ...approx(v)],
      aides: ["Il y a $2 \\times 6 = 12$ issues équiprobables (P pour pile, F pour face).", `Compte les cases qui conviennent sur la ligne « ${face} ».`, `$P(\\text{${face}}) = ${fr(1, 2)}$ et $P(\\text{dé}) = ${fr(cond[1], 6)}$ : on peut aussi multiplier.`], solution: `$${cond[1]}$ cases sur $12$, ou $${fr(1, 2)} \\times ${fr(cond[1], 6)} = ${frS(cond[1], 12)}$.` };
  };

  GEN["pr3-arbre"] = function () {
    const r = rand(2, 7), v = rand(1, 6), n = r + v, t = rand(0, 3);
    // [contenant, objet, objets, A (sing., plur., lettre), B (sing., plur., lettre)]
    const [rec, ob, obs, [A1, A2, LA], [B1, B2, LB]] = pick([["Un sac", "jeton", "jetons", ["rouge", "rouges", "R"], ["vert", "verts", "V"]], ["Une trousse", "stylo", "stylos", ["bleu", "bleus", "B"], ["noir", "noirs", "N"]], ["Un panier", "mangue", "mangues", ["mûre", "mûres", "M"], ["verte", "vertes", "V"]], ["Un bocal", "bonbon", "bonbons", ["à la vanille", "à la vanille", "V"], ["à la noix de coco", "à la noix de coco", "C"]], ["Un tiroir", "chaussette", "chaussettes", ["blanche", "blanches", "B"], ["noire", "noires", "N"]]]);
    const nm = (k, s, p) => `$${k}$ ${k > 1 ? obs : ob} ${k > 1 ? p : s}`, une = /e$/.test(ob) && ob !== "stylo" ? "une" : "un", unOb = `${une} ${ob}`;
    const txt = `${rec} contient ${nm(r, A1, A2)} et ${nm(v, B1, B2)}. On tire ${unOb} au hasard, on ${une === "une" ? "la" : "le"} garde, puis on en tire ${une === "une" ? "une deuxième" : "un deuxième"} (sans remise).`;
    const br = (k, m) => (k > 0 ? [[LA, [k, m]]] : []), fig = arbreP3([[LA, [r, n]], [LB, [v, n]]], [[...br(r - 1, n - 1), ...(v ? [[LB, [v, n - 1]]] : [])], [[LA, [r, n - 1]], ...(v - 1 > 0 ? [[LB, [v - 1, n - 1]]] : [])]], `Arbre de deux tirages sans remise : ${LA} pour ${A1}, ${LB} pour ${B1}`);
    if (t === 0) { const P = (r / n) * ((r - 1) / (n - 1));
      return { enonce: `${txt} Quelle est la probabilité d'obtenir deux ${obs} ${A2} ?${CONSIGNE_FR}`, figure: fig, mode: "nombre", prefixe: "Probabilité :", attendu: P,
        erreurs: [{ valeur: (r / n) ** 2, message: `Sans remise, il reste ${une} ${ob} de moins au second tirage.` }, { valeur: r / n + (r - 1) / (n - 1), message: "Le long d'un chemin de l'arbre, on multiplie les probabilités (on n'additionne pas)." }, ...approx(P)],
        aides: [`Suis le chemin ${LA} puis ${LA} dans l'arbre.`, `Premier tirage : $${fr(r, n)}$. Il reste alors $${r - 1}$ ${obs} ${A2} sur $${n - 1}$.`, "Multiplie les probabilités le long du chemin."], solution: `$${fr(r, n)} \\times ${fr(r - 1, n - 1)} = ${frS(r * (r - 1), n * (n - 1))}$.` }; }
    if (t === 1) { const P = 2 * (r / n) * (v / (n - 1));
      return { enonce: `${txt} Quelle est la probabilité d'obtenir deux ${obs} différent${une === "une" ? "e" : ""}s (${une} de chaque sorte) ?${CONSIGNE_FR}`, figure: fig, mode: "nombre", prefixe: "Probabilité :", attendu: P,
        erreurs: [{ valeur: (r / n) * (v / (n - 1)), message: `Il y a deux chemins : ${LA} puis ${LB}, et ${LB} puis ${LA}.` }, { valeur: 2 * (r / n) * (v / n), message: "Sans remise, le second tirage se fait parmi un objet de moins." }, ...approx(P)],
        aides: [`Deux chemins conviennent : ${LA} puis ${LB}, et ${LB} puis ${LA}.`, `$P(${LA} \\text{ puis } ${LB}) = ${fr(r, n)} \\times ${fr(v, n - 1)}$.`, `$P(${LB} \\text{ puis } ${LA}) = ${fr(v, n)} \\times ${fr(r, n - 1)}$ ; additionne.`], solution: `$${fr(r, n)} \\times ${fr(v, n - 1)} + ${fr(v, n)} \\times ${fr(r, n - 1)} = 2 \\times ${fr(r * v, n * (n - 1))} = ${frS(2 * r * v, n * (n - 1))}$.` }; }
    if (t === 3) { // le second tirage
      const P = v / n;
      return { enonce: `${txt} Quelle est la probabilité que ${une === "une" ? "la deuxième" : "le deuxième"} ${ob} soit ${B1} ?${CONSIGNE_FR}`, figure: fig, mode: "nombre", prefixe: "Probabilité :", attendu: P,
        erreurs: [{ valeur: v / (n - 1), message: `Le premier tirage peut être ${A1} ou ${B1} : il y a deux chemins à additionner.` }, { valeur: (v / n) * ((v - 1) / (n - 1)), message: `Ça, c'est la probabilité que les deux soient ${B2}.` }, ...approx(P)],
        aides: [`Deux chemins se terminent par ${LB} : ${LA} puis ${LB}, et ${LB} puis ${LB}.`, `$P(${LA} \\text{ puis } ${LB}) = ${fr(r, n)} \\times ${fr(v, n - 1)}$ et $P(${LB} \\text{ puis } ${LB}) = ${fr(v, n)} \\times ${fr(v - 1, n - 1)}$.`, "Additionne les deux probabilités."], solution: `$${fr(r * v, n * (n - 1))} + ${fr(v * (v - 1), n * (n - 1))} = ${fr(v * (n - 1), n * (n - 1))} = ${frS(v, n)}$ : la même probabilité qu'au premier tirage !` };
    }
    const P = 1 - (v / n) * ((v - 1) / (n - 1));
    if (v < 2) return GEN["pr3-arbre"]();
    return { enonce: `${txt} Quelle est la probabilité d'obtenir au moins ${unOb} ${A1} ?${CONSIGNE_FR}`, figure: fig, mode: "nombre", prefixe: "Probabilité :", attendu: P,
      erreurs: [{ valeur: (v / n) * ((v - 1) / (n - 1)), message: `Ça, c'est la probabilité de l'événement contraire « deux ${obs} ${B2} ».` }, { valeur: (r / n) * ((r - 1) / (n - 1)), message: "Ça, c'est la probabilité d'en avoir deux ; « au moins un » compte aussi les cas avec un seul." }, ...approx(P)],
      aides: [`« Au moins ${une} ${A1} » est le contraire de « deux ${obs} ${B2} ».`, `$P(\\text{deux ${B2}}) = ${fr(v, n)} \\times ${fr(v - 1, n - 1)}$.`, `$P = 1 - P(\\text{deux ${B2}})$.`], solution: `$1 - ${frS(v * (v - 1), n * (n - 1))} = ${frS(n * (n - 1) - v * (v - 1), n * (n - 1))}$.` };
  };

  GEN["pr3-frequences"] = function () {
    const t = Math.random() < 0.16 ? 3 : rand(0, 2);
    if (t === 0) {
      const N = pick([50, 100, 200, 250, 500, 1000]), p = pick([1 / 6, 1 / 2, 1 / 4, 1 / 3]), k = Math.round(N * p) + rand(-Math.round(N / 25), Math.round(N / 25)), f = arr(k / N, 3), nom = pick(PRENOMS3);
      return { enonce: `${nom} lance $${N}$ fois ${p === 1 / 2 ? "une pièce de monnaie" : p === 1 / 4 ? "un dé à quatre faces" : p === 1 / 3 ? "une roue à trois secteurs égaux numérotés de 1 à 3" : "un dé à six faces"} et obtient $${k}$ fois ${p === 1 / 2 ? "pile" : "le résultat « 1 »"}. Quelle est la fréquence d'apparition de cette issue (en écriture décimale) ?`, mode: "nombre", prefixe: "Fréquence :", attendu: f,
        erreurs: [{ valeur: arr(p, 3), message: "Ça, c'est (environ) la probabilité théorique ; on demande la fréquence observée." }, { valeur: arr(N / k, 3), message: "Fréquence $= \\dfrac{\\text{effectif}}{\\text{nombre d'essais}}$ : le nombre d'essais au dénominateur." }],
        aides: ["Fréquence $= \\dfrac{\\text{nombre de fois où l'issue apparaît}}{\\text{nombre total d'essais}}$.", `$\\dfrac{${k}}{${N}}$.`, "Fais la division."], solution: `$\\dfrac{${k}}{${N}} = ${nb(f)}$, proche de la probabilité $${p === 1 / 2 ? "0{,}5" : fr(1, Math.round(1 / p))}$.` };
    }
    if (t === 1) { // diagramme des résultats de N lancers d'un dé
      const N = pick([60, 120, 300, 600]), base = N / 6, eff = [1, 2, 3, 4, 5].map(() => base + rand(-Math.round(base / 5), Math.round(base / 5))); eff.push(N - eff.reduce((a, b) => a + b, 0));
      if (eff[5] <= 0) return GEN["pr3-frequences"]();
      const i = rand(0, 5), q = Math.random() < 0.5, f = eff[i] / N, pas = N <= 120 ? 5 : N <= 300 ? 10 : 20;
      const fig = diagrammeBarres(eff.map((e, j) => [String(j + 1), e]), pas, "effectif");
      if (q) return { enonce: `Le diagramme donne les résultats de $${N}$ lancers d'un dé. Quelle est la fréquence de la face $${i + 1}$ ? Donne-la sous forme d'une fraction.`, figure: fig, mode: "nombre", prefixe: "Fréquence :", attendu: f,
        erreurs: [{ valeur: eff[i], message: "Ça, c'est l'effectif : divise-le par le nombre total de lancers." }, { valeur: 1 / 6, message: "Ça, c'est la probabilité théorique ; on demande la fréquence observée." }, ...approx(f)],
        aides: ["Lis l'effectif de la face sur le diagramme.", `Effectif de la face $${i + 1}$ : $${eff[i]}$.`, `Fréquence $= \\dfrac{${eff[i]}}{${N}}$ ; simplifie si possible.`], solution: `$\\dfrac{${eff[i]}}{${N}}${pgcd(eff[i], N) > 1 ? ` = ${frS(eff[i], N)}` : ""}$, proche de la probabilité $\\dfrac{1}{6}$.` };
      const k = eff.filter((e) => e > base).length;
      return { enonce: `Le diagramme donne les résultats de $${N}$ lancers d'un dé équilibré. Combien de faces sont sorties plus de $${base}$ fois (c'est-à-dire plus que $${N} \\times \\dfrac{1}{6}$) ?`, figure: fig, mode: "nombre", prefixe: "Nombre de faces :", attendu: k,
        erreurs: [{ valeur: 6 - k, message: `Ça, c'est le nombre de faces sorties $${base}$ fois ou moins.` }],
        aides: [`Avec un dé équilibré, on attend environ $${N} \\times \\dfrac{1}{6} = ${base}$ apparitions par face.`, `Repère la graduation $${base}$ sur l'axe vertical.`, "Compte les barres qui la dépassent."], solution: `Les effectifs sont ${liste3(eff)} : $${k}$ face${k > 1 ? "s" : ""} dépasse${k > 1 ? "nt" : ""} $${base}$. Les fréquences sont proches de $\\dfrac{1}{6}$ sans être égales : c'est normal, c'est le hasard.` };
    }
    if (t === 2) { // estimer une probabilité puis prévoir
      const N = pick([200, 400, 500, 1000]), [obj, issue] = pick([["une punaise", "sur la pointe"], ["un bouchon de bouteille", "sur le côté"], ["une capsule de soda", "à l'envers"], ["un gobelet", "debout"]]), f = pick([0.3, 0.35, 0.4, 0.45, 0.55, 0.6, 0.65, 0.7]), k = Math.round(f * N), M = pick([100, 200, 1000, 2000]), q = Math.random() < 0.5;
      if (q) return { enonce: `On lance $${N}$ fois ${obj} : elle tombe $${k}$ fois ${issue}. Donne une estimation de la probabilité qu'elle tombe ${issue}.`.replace("elle tombe", /^un /.test(obj) ? "il tombe" : "elle tombe").replace("qu'elle tombe", /^un /.test(obj) ? "qu'il tombe" : "qu'elle tombe"), mode: "nombre", prefixe: "Probabilité ≈", attendu: f,
        erreurs: [{ valeur: 0.5, message: "Il n'y a pas équiprobabilité : on estime la probabilité par la fréquence observée." }, { valeur: k, message: "Ça, c'est un effectif : divise-le par le nombre de lancers." }],
        aides: ["Quand le nombre d'essais est grand, la fréquence est proche de la probabilité.", `Fréquence observée : $\\dfrac{${k}}{${N}}$.`, "Fais la division."], solution: `$\\dfrac{${k}}{${N}} = ${nb(f)}$ : on estime la probabilité à environ $${nb(f)}$.` };
      const fM = Math.round(f * M);
      return { enonce: `On a observé que ${obj} tombe ${issue} avec une fréquence de $${nb(f)}$. Sur $${nb(M)}$ nouveaux lancers, environ combien de fois peut-on s'attendre à ce qu'${/^un /.test(obj) ? "il" : "elle"} tombe ${issue} ?`, mode: "nombre", prefixe: "Environ", suffixe: "fois", attendu: fM,
        erreurs: [{ valeur: arr(M / f, 2), message: `On multiplie le nombre de lancers par la fréquence : $${nb(M)} \\times ${nb(f)}$.` }, { valeur: M / 2, message: "La probabilité n'est pas $0{,}5$ : utilise la fréquence observée." }],
        aides: ["La fréquence observée donne une estimation de la probabilité.", `On s'attend à environ $${nb(f)} \\times ${nb(M)}$ fois.`, "Calcule ce produit."], solution: `$${nb(f)} \\times ${nb(M)} = ${nb(fM)}$ : environ $${nb(fM)}$ fois (ce n'est qu'une estimation).` };
    }
    const x = pick([0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.6, 0.7, 0.8, 0.85]), n0 = pick([600, 1200, 1800, 3000, 6000]), np = rand(3, 8), Q = pick([
      ["Quand on répète une expérience un très grand nombre de fois, la fréquence d'une issue :", "se rapproche de sa probabilité", ["devient égale à $0{,}5$", "s'éloigne de sa probabilité", "vaut toujours $1$"]],
      [`${pick(PRENOMS3)} a obtenu $${np}$ fois « pile » de suite avec une pièce équilibrée. Au lancer suivant :`, "la probabilité de « pile » vaut toujours $\\dfrac{1}{2}$", ["« face » est plus probable", "« pile » est plus probable", `la probabilité de « pile » est $\\dfrac{1}{${np + 1}}$`]],
      ["Avec un dé à six faces, obtenir $7$ est un événement :", "impossible : sa probabilité est $0$", ["certain : sa probabilité est $1$", "peu probable : sa probabilité est $\\dfrac{1}{7}$", "probable : sa probabilité est $\\dfrac{1}{6}$"]],
      ["Avec un dé à six faces, obtenir un nombre inférieur à $7$ est un événement :", "certain : sa probabilité est $1$", ["impossible : sa probabilité est $0$", "probable : sa probabilité est $\\dfrac{6}{7}$", "équiprobable : sa probabilité est $\\dfrac{1}{2}$"]],
      ["Une probabilité est toujours :", "comprise entre $0$ et $1$", ["supérieure à $1$", "un nombre entier", "égale à $\\dfrac{1}{2}$"]],
      ["Un événement impossible a pour probabilité :", "$0$", ["$1$", "$\\dfrac{1}{2}$", "$-1$"]],
      ["Un événement certain a pour probabilité :", "$1$", ["$0$", "$\\dfrac{1}{2}$", "$100$"]],
      [`Si $P(A) = ${nb(x)}$, alors $P(\\overline{A})$ vaut :`, `$${nb(arr(1 - x, 2))}$`, [`$${nb(x)}$`, `$-${nb(x)}$`, `$${nb(arr(1 + x, 2))}$`]],
      ["Pour estimer une probabilité inconnue (une punaise qui tombe sur la pointe), on peut :", "faire un grand nombre d'essais et calculer la fréquence", ["faire un seul essai", "diviser $1$ par $2$", "compter les faces de la punaise"]],
      [`On lance $${nb(n0)}$ fois un dé équilibré. On peut s'attendre à obtenir le $6$ environ :`, `$${nb(n0 / 6)}$ fois`, [`$${nb(n0 / 2)}$ fois`, "$6$ fois", `$${nb(n0 / 3)}$ fois`]],
      ["Une probabilité peut s'écrire :", "sous forme décimale, fractionnaire ou en pourcentage", ["seulement sous forme de fraction", "seulement en pourcentage", "seulement avec un nombre entier"]],
      [`Une issue a une probabilité de $${nb(x)}$. En pourcentage, cela fait :`, `$${nb(arr(100 * x, 2))}\\,\\%$`, [`$${nb(x)}\\,\\%$`, `$${nb(arr(1000 * x, 2))}\\,\\%$`, `$${nb(arr(100 - x, 2))}\\,\\%$`]]
    ]);
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu, aides: ["Une probabilité est entre $0$ et $1$.", "La fréquence observée se rapproche de la probabilité quand le nombre d'essais augmente.", "Les lancers successifs d'une pièce sont indépendants."], solution: `Réponse : ${Q[1]}.` };
  };

  // Fréquence de « pile » en fonction du nombre de lancers (abscisses régulièrement espacées)
  function freqFig3(pts, p, aria) {
    const x0 = 42, x1 = 300, y0 = 150, y1 = 14, X = (i) => x0 + ((x1 - x0) * i) / (pts.length - 1), Y = (f) => y0 - (y0 - y1) * f;
    let s = `<g class="g-grid">`; [0, 0.25, 0.5, 0.75, 1].forEach((f) => { s += ln3(x0, Y(f), x1, Y(f), ""); }); s += `</g><g class="g-axis">${ln3(x0, y0, x1, y0, "")}${ln3(x0, y0, x0, y1 - 4, "")}</g><g class="g-tick">`;
    [0, 0.25, 0.5, 0.75, 1].forEach((f) => { s += tx3(x0 - 5, Y(f) + 4, nbTexte(f), "", "end"); }); pts.forEach(([n], i) => { s += tx3(X(i), y0 + 14, nbTexte(n), "", "middle"); }); s += tx3(x1, y0 + 28, "nombre de lancers", "", "end") + `</g>`;
    s += `<line class="g-hline" x1="${x0}" y1="${Y(p)}" x2="${x1}" y2="${Y(p)}"/>` + tx3(x0 + 6, Y(p) + 15, `probabilité : ${nbTexte(p)}`, "g-hlabel");
    s += `<polyline class="g-curve" points="${pl3(pts.map(([, f], i) => [X(i), Y(f)]))}"/>` + pts.map(([, f], i) => `<circle class="g-point" cx="${r3(X(i))}" cy="${r3(Y(f))}" r="3"/>`).join("") + tx3(x0 + 4, y1 - 2, "fréquence", "g-plabel");
    return sv3(320, y0 + 34, aria || "Fréquence de l'issue en fonction du nombre de lancers : elle se rapproche de la probabilité", s);
  }
  FIGURES["pr3-cours-urne"] = () => figUrne3([[5, "R"], [3, "V"], [2, "J"]]);
  FIGURES["pr3-cours-arbre"] = () => arbreP3([["R", [3, 5]], ["V", [2, 5]]], [[["R", [3, 5]], ["V", [2, 5]]], [["R", [3, 5]], ["V", [2, 5]]]], "Arbre de deux tirages avec remise dans une urne de 3 boules rouges et 2 vertes : 3/5 pour R et 2/5 pour V à chaque tirage");
  FIGURES["pr3-cours-frequence"] = () => freqFig3([[10, 0.7], [20, 0.6], [50, 0.56], [100, 0.47], [200, 0.515], [500, 0.494], [1000, 0.502]], 0.5, "Fréquence de pile en fonction du nombre de lancers d'une pièce : 0,7 pour 10 lancers, puis 0,6 ; 0,56 ; 0,47 ; 0,515 ; 0,494 et 0,502 pour 1 000 lancers, de plus en plus proche de 0,5");
  FIGURES["pr3-qcm-urne"] = () => figUrne3([[4, "R"], [3, "V"], [1, "J"]]);
  FIGURES["pr3-qcm-arbre"] = () => arbreP3([["R", [2, 5]], ["V", [3, 5]]], [[["R", [1, 4]], ["V", [3, 4]]], [["R", [2, 4]], ["V", [2, 4]]]], "Arbre de deux tirages sans remise dans une urne de 2 boules rouges et 3 vertes");
  FIGURES["pr3-qcm-roue"] = () => roue3([["A", 2], ["B", 1], ["C", 1]]);
  FIGURES["pr3-methode-six"] = () => arbreP3([["6", [1, 6]], ["pas 6", [5, 6]]], [[["6", [1, 6]], ["pas 6", [5, 6]]], [["6", [1, 6]], ["pas 6", [5, 6]]]], "Arbre de deux lancers de dé : à chaque lancer, 6 avec la probabilité 1/6, pas 6 avec la probabilité 5/6");

  /* =====================================================================
     Chapitre 10 : statistiques (st3-) — fréquences, indicateurs, classes, comparaison
     ===================================================================== */
  const med3 = (T) => { const n = T.length; return n % 2 ? T[(n - 1) / 2] : (T[n / 2 - 1] + T[n / 2]) / 2; };
  const pasAxe3 = (vmax) => [1, 2, 5, 10, 20, 25, 50, 100].find((p) => vmax / p <= 7) || 200;
  // Histogramme : bornes des classes [b0, b1, …], effectifs ; titre de l'axe horizontal
  function histo3(bornes, effs, titre, aria) {
    const W = 320, x0 = 40, y0 = 150, haut = 16, pas = pasAxe3(Math.max(...effs)), vmax = Math.ceil(Math.max(...effs) / pas) * pas, n = effs.length, bw = (W - x0 - 22) / n, Y = (v) => y0 - ((y0 - haut) * v) / vmax;
    let s = `<g class="g-grid">`; for (let v = 0; v <= vmax; v += pas) s += ln3(x0, Y(v), W - 14, Y(v), ""); s += `</g><g class="g-tick">`;
    for (let v = pas; v <= vmax; v += pas) s += tx3(x0 - 5, Y(v) + 4, v, "", "end");
    bornes.forEach((b, i) => { s += tx3(x0 + i * bw, y0 + 15, nbTexte(b), "", "middle"); });
    s += tx3(W - 14, y0 + 30, titre, "", "end") + `</g>`;
    effs.forEach((e, i) => { s += `<rect class="g-aire g-colorie g-barre" x="${r3(x0 + i * bw)}" y="${r3(Y(e))}" width="${r3(bw)}" height="${r3(y0 - Y(e))}" style="stroke:var(--encre);stroke-width:1"/>`; });
    s += `<g class="g-axis">${ln3(x0, y0, W - 10, y0, "")}${ln3(x0, y0, x0, haut - 6, "")}</g>` + tx3(x0 + 4, haut - 4, "effectif", "g-plabel");
    return sv3(W, y0 + 36, aria || `Histogramme : classes de ${bornes[0]} à ${bornes[bornes.length - 1]}, effectifs ${effs.join(", ")}`, s);
  }
  // Nuages de points de plusieurs séries sur un même axe (une ligne par série)
  function nuage3(series, vmin, vmax, aria) {
    const x0 = 64, x1 = 306, X = (v) => x0 + ((x1 - x0) * (v - vmin)) / (vmax - vmin), H = series.length * 44 + 30;
    let s = `<g class="g-tick">`; for (let v = vmin; v <= vmax; v += vmax - vmin > 12 ? 2 : 1) s += ln3(X(v), H - 26, X(v), H - 22, "g-graduation") + tx3(X(v), H - 10, v, "", "middle"); s += `</g>` + ln3(x0, H - 24, x1, H - 24, "g-droite");
    series.forEach(([nom, vals], k) => {
      const y = 22 + k * 44, cpt = {}; s += tx3(x0 - 10, y + 4, nom, "g-plabel", "end") + ln3(x0, y, x1, y, "g-guide");
      vals.slice().sort((a, b) => a - b).forEach((v) => { const c = (cpt[v] = (cpt[v] || 0) + 1); s += `<circle cx="${r3(X(v))}" cy="${y + 8 - c * 8}" r="3.6" style="fill:var(${k ? "--courbe2" : "--lagon"})"/>`; });
    });
    return sv3(320, H, aria || `Valeurs des séries ${series.map(([nom, v]) => `${nom} : ${v.join(", ")}`).join(" ; ")}`, s);
  }
  const CAT3 = [["Moyen de transport", ["Bus", "Voiture", "À pied", "Taxi"], "élèves d'un collège de Mamoudzou"], ["Sport préféré", ["Football", "Handball", "Basket", "Natation"], "élèves de 3e"], ["Fruit préféré", ["Mangue", "Banane", "Ananas", "Papaye"], "clients du marché de Mamoudzou"], ["Langue parlée", ["Shimaoré", "Kibouchi", "Français", "Autre"], "habitants d'un quartier"], ["Plage préférée", ["N'Gouja", "Sakouli", "Moya", "Saziley"], "touristes interrogés"]];

  GEN["st3-frequences"] = function () {
    const N = pick([20, 25, 40, 50, 200, 100, 80, 120]), [titre, cats, qui] = pick(CAT3), rep = rand(0, 2);
    for (;;) {
      const e = cats.map(() => rand(1, N)); const s = e.slice(0, 3).reduce((a, b) => a + b, 0); if (s >= N) continue; e[3] = N - s;
      const i = rand(0, 3), f = arr((e[i] / N) * 100, 2);
      if (!Number.isInteger(f * 10)) continue;
      const tab = { lignes: [[`\\text{${titre}}`, "\\text{Effectif}"], ...cats.map((c, j) => [`\\text{${c.replace("'", "’")}}`, String(e[j])])] };
      const fig = rep === 1 ? diagrammeBarres(cats.map((c, j) => [c, e[j]]), pasAxe3(Math.max(...e)), "effectif") : undefined;
      return { enonce: `${rep === 1 ? "Le diagramme" : "Le tableau"} donne les réponses de $${N}$ ${qui} (${titre.toLowerCase()}). Quelle est la fréquence de la réponse « ${cats[i]} », en pourcentage ?`, tableau: rep === 1 ? undefined : tab, figure: fig, mode: "nombre", prefixe: "Fréquence :", suffixe: "%", attendu: f,
        erreurs: [{ valeur: arr(e[i] / N, 4), message: "Ça, c'est la fréquence en écriture décimale : multiplie par $100$ pour l'avoir en pourcentage." }, { valeur: e[i], message: "Ça, c'est l'effectif ; divise-le par l'effectif total." }],
        aides: ["Fréquence $= \\dfrac{\\text{effectif}}{\\text{effectif total}}$.", `$\\dfrac{${e[i]}}{${N}} = ${nb(arr(e[i] / N, 4))}$.`, "Multiplie par $100$ pour obtenir un pourcentage."], solution: `$\\dfrac{${e[i]}}{${N}} \\times 100 = ${nb(f)}\\,\\%$.` };
    }
  };

  GEN["st3-indicateurs"] = function () {
    // [nom de la valeur (tableau), description de la série, valeur (sing.), début possible des valeurs]
    const [nomV, serie, val, debut] = pick([["Note", "les notes d'un contrôle de 3e", "note", [5, 14]], ["Pointure", "les pointures des élèves d'une classe", "pointure", [34, 40]], ["Buts", "le nombre de buts marqués à chaque match par un club de foot de Koungou", "nombre de buts", [0, 0]], ["Enfants", "le nombre d'enfants des familles d'un quartier de Mamoudzou", "nombre d'enfants", [0, 1]], ["Poissons", "le nombre de poissons pêchés par sortie en pirogue", "nombre de poissons", [1, 6]]]);
    for (;;) {
      const v0 = rand(...debut), vals = [0, 1, 2, 3, 4, 5].slice(0, rand(5, 6)).map((k) => v0 + k), eff = vals.map(() => rand(1, 9)), N = eff.reduce((a, b) => a + b, 0);
      const T = []; vals.forEach((v, i) => { for (let k = 0; k < eff[i]; k++) T.push(v); });
      const S = vals.reduce((s, v, i) => s + v * eff[i], 0), m = S / N, q = rand(0, 2), dia = Math.random() < 0.4;
      if (q === 0 && !Number.isInteger(m * 100)) continue;
      const tab = { lignes: [[`\\text{${nomV}}`, ...vals.map(String)], ["\\text{Effectif}", ...eff.map(String)]] };
      const pres = dia ? `Le diagramme en bâtons donne ${serie}.` : `Le tableau donne ${serie}.`, sup = dia ? { figure: diagrammeBarres(vals.map((v, i) => [String(v), eff[i]]), pasAxe3(Math.max(...eff)), "effectif") } : { tableau: tab };
      if (q === 0) return { enonce: `${pres} Calcule la moyenne de cette série.`, ...sup, mode: "nombre", prefixe: "Moyenne :", attendu: m,
        erreurs: [{ valeur: arr(vals.reduce((a, b) => a + b, 0) / vals.length, 4), message: "Il faut pondérer chaque valeur par son effectif." }, { valeur: arr(S / vals.length, 4), message: `On divise par l'effectif total $${N}$, pas par le nombre de valeurs différentes.` }],
        aides: [`Moyenne $= \\dfrac{\\text{somme des (valeur} \\times \\text{effectif)}}{\\text{effectif total}}$.`, `Somme : ${liste3(vals.map((v, i) => `${v} \\times ${eff[i]}`), " + ")} $= ${S}$.`, `Effectif total : $${N}$.`], solution: `$\\dfrac{${S}}{${N}} = ${nb(m)}$.` };
      if (q === 1) { const M = med3(T);
        return { enonce: `${pres} Détermine la médiane de cette série.`, ...sup, mode: "nombre", prefixe: "Médiane :", attendu: M,
          erreurs: [{ valeur: vals[Math.floor(vals.length / 2)], message: "La médiane dépend des effectifs : utilise les effectifs cumulés." }, { valeur: (vals[0] + vals[vals.length - 1]) / 2, message: "La médiane n'est pas le milieu entre la plus petite et la plus grande valeur." }],
          aides: [`Effectif total : $${N}$.`, N % 2 ? `La médiane est la $${(N + 1) / 2}$e valeur de la série rangée.` : `La médiane est la moyenne des $${N / 2}$e et $${N / 2 + 1}$e valeurs de la série rangée.`, `Effectifs cumulés : ${liste3(eff.map((_, i) => eff.slice(0, i + 1).reduce((x, y) => x + y, 0)))}.`],
          solution: `Avec $${N}$ valeurs, ${N % 2 ? `la $${(N + 1) / 2}$e` : `les $${N / 2}$e et $${N / 2 + 1}$e`} ${N % 2 ? "vaut" : "donnent"} $${nb(M)}$ : la médiane est $${nb(M)}$.` }; }
      const e = vals[vals.length - 1] - vals[0];
      return { enonce: `${pres} Quelle est l'étendue de cette série ?`, ...sup, mode: "nombre", prefixe: "Étendue :", attendu: e,
        erreurs: [{ valeur: Math.max(...eff) - Math.min(...eff), message: `L'étendue se calcule sur les valeurs (${val}), pas sur les effectifs.` }, { valeur: vals[vals.length - 1], message: "Étendue $=$ plus grande valeur $-$ plus petite valeur." }],
        aides: ["Étendue $=$ plus grande valeur $-$ plus petite valeur.", `Plus grande valeur : $${vals[vals.length - 1]}$.`, `Plus petite valeur : $${vals[0]}$.`], solution: `$${vals[vals.length - 1]} - ${vals[0]} = ${e}$.` };
    }
  };

  GEN["st3-classes"] = function () {
    for (;;) {
      // [bornes possibles, largeurs, titre du tableau, titre de l'axe, série]
      const [as, ws, unite, axe, serie] = pick([[[0, 10, 20], [10, 20], "Temps (min)", "temps (min)", "le temps de trajet des élèves d'un collège de Koungou"], [[140, 150], [5, 10], "Taille (cm)", "taille (cm)", "la taille des élèves de 3e"], [[0, 20], [10, 20], "Masse (kg)", "masse (kg)", "la masse des poissons pêchés au large de M'tsamboro"], [[20, 40], [20], "Durée (min)", "durée (min)", "la durée des trajets en barge et en taxi d'un groupe de voyageurs"]]);
      const a = pick(as), w = pick(ws), k = rand(4, 5), eff = Array.from({ length: k }, () => rand(2, 12)), N = eff.reduce((x, y) => x + y, 0);
      const cl = eff.map((_, i) => [a + i * w, a + (i + 1) * w]), centres = cl.map(([u, v]) => (u + v) / 2), S = centres.reduce((s, c, i) => s + c * eff[i], 0), m = S / N, histo = Math.random() < 0.5;
      const tab = { lignes: [[`\\text{${unite}}`, "\\text{Effectif}"], ...cl.map(([u, v], j) => [`[${u} ; ${v}[`, String(eff[j])])] };
      const sup = histo ? { figure: histo3([...cl.map(([u]) => u), cl[k - 1][1]], eff, axe) } : { tableau: tab }, pres = `${histo ? "L'histogramme" : "Le tableau"} donne ${serie} (données regroupées en classes).`;
      if (Math.random() < 0.5) {
        if (!Number.isInteger(m * 100)) continue;
        return { enonce: `${pres} Calcule une estimation de la moyenne en utilisant le centre de chaque classe.`, ...sup, mode: "nombre", prefixe: "Moyenne :", attendu: m,
          erreurs: [{ valeur: arr(cl.reduce((s, [u], i) => s + u * eff[i], 0) / N, 4), message: "On prend le centre de chaque classe, pas sa borne inférieure." }, { valeur: arr(S / k, 4), message: `On divise par l'effectif total $${N}$, pas par le nombre de classes.` }],
          aides: [`Centres des classes : ${liste3(centres.map(nb))}.`, `Somme des (centre $\\times$ effectif) : $${nb(S)}$.`, `Effectif total : $${N}$.`], solution: `$\\dfrac{${nb(S)}}{${N}} = ${nb(m)}$ (c'est une estimation, car on ne connaît pas les valeurs exactes).` };
      }
      let c = 0, j = 0; const rang = Math.ceil(N / 2); while (c + eff[j] < rang) { c += eff[j]; j++; }
      if (N % 2 === 0 && c + eff[j] === N / 2) continue; // médiane à cheval sur deux classes : on évite
      const bonne = `$[${cl[j][0]} ; ${cl[j][1]}[$`, faux = cl.filter((_, i) => i !== j).map(([u, v]) => `$[${u} ; ${v}[$`);
      const { choix, attendu } = melange(bonne, shuffle(faux).slice(0, 3));
      return { enonce: `${pres} Dans quelle classe se trouve la médiane ?`, ...sup, mode: "choix", choix, attendu,
        aides: [`Effectif total : $${N}$ ; la médiane est vers la $${rang}$e valeur.`, "Cumule les effectifs de gauche à droite.", `Effectifs cumulés : ${liste3(eff.map((_, i) => eff.slice(0, i + 1).reduce((x, y) => x + y, 0)))}.`],
        solution: `Les effectifs cumulés atteignent $${rang}$ dans la classe ${bonne} : la médiane s'y trouve.` };
    }
  };

  GEN["st3-comparer"] = function () {
    const t = rand(0, 3);
    if (t === 0) { // note nécessaire
      const nom = pick(PRENOMS3), n = rand(3, 6), notes = Array.from({ length: n }, () => rand(6, 18)), M = rand(10, 15), S = notes.reduce((a, b) => a + b, 0), x = M * (n + 1) - S;
      if (x < 0 || x > 20) return GEN["st3-comparer"]();
      return { enonce: `${nom} a obtenu les notes ${liste3(notes)}. Quelle note doit-${il3(nom)} avoir au prochain contrôle pour obtenir une moyenne de $${M}$ ?`, mode: "nombre", prefixe: "Note :", attendu: x,
        erreurs: [{ valeur: M, message: "Ce n'est pas la moyenne voulue elle-même : les autres notes comptent aussi." }, ...(M * n - S >= 0 && M * n - S <= 20 ? [{ valeur: M * n - S, message: `Avec la nouvelle note, il y aura $${n + 1}$ notes : la somme doit valoir $${n + 1} \\times ${M}$.` }] : [])],
        aides: [`Avec $${n + 1}$ notes de moyenne $${M}$, la somme doit être $${n + 1} \\times ${M} = ${M * (n + 1)}$.`, `Somme actuelle : $${S}$.`, "Fais la différence."],
        solution: `$${M * (n + 1)} - ${S} = ${x}$ : il lui faut $${x}$.` };
    }
    if (t === 1) { // deux classes représentées par des nuages de points
      const m = rand(9, 13), nA = rand(7, 9), nB = rand(7, 9), A = Array.from({ length: nA }, () => m + rand(-2, 2)), B = Array.from({ length: nB }, () => Math.max(0, Math.min(20, m + rand(-7, 7))));
      const eA = Math.max(...A) - Math.min(...A), eB = Math.max(...B) - Math.min(...B), q = rand(0, 2), fig = nuage3([["3e A", A], ["3e B", B]], 0, 20, `Notes de la 3e A : ${A.join(", ")} ; notes de la 3e B : ${B.join(", ")}`);
      if (eA === eB) return GEN["st3-comparer"]();
      if (q === 0) { const [c, L, e] = pick([["A", A, eA], ["B", B, eB]]);
        return { enonce: `Le graphique montre les notes de deux classes de 3e (chaque point est une note). Quelle est l'étendue des notes de la 3e ${c} ?`, figure: fig, mode: "nombre", prefixe: "Étendue :", attendu: e,
          erreurs: [{ valeur: Math.max(...L), message: "Étendue $=$ plus grande note $-$ plus petite note." }, { valeur: c === "A" ? eB : eA, message: "Attention à la ligne : lis la bonne classe." }],
          aides: [`Repère la ligne de la 3e ${c}.`, `Plus grande note : $${Math.max(...L)}$ ; plus petite : $${Math.min(...L)}$.`, "Fais la différence."], solution: `$${Math.max(...L)} - ${Math.min(...L)} = ${e}$.` }; }
      if (q === 1) { const bonne = eB > eA ? "la 3e B" : "la 3e A", { choix, attendu } = melange(bonne, [eB > eA ? "la 3e A" : "la 3e B", "les deux classes de la même façon", "on ne peut pas savoir sans la moyenne"]);
        return { enonce: "Le graphique montre les notes de deux classes de 3e (chaque point est une note). Quelle classe a les notes les plus dispersées ?", figure: fig, mode: "choix", choix, attendu,
          aides: ["La dispersion se mesure avec l'étendue.", `Étendue de la 3e A : $${Math.max(...A)} - ${Math.min(...A)}$.`, `Étendue de la 3e B : $${Math.max(...B)} - ${Math.min(...B)}$.`],
          solution: `Étendues : $${eA}$ pour la 3e A et $${eB}$ pour la 3e B : les notes de ${bonne} sont les plus dispersées.` }; }
      const [c, L] = pick([["A", A], ["B", B]]), T = L.slice().sort((p, r) => p - r), Me = med3(T);
      return { enonce: `Le graphique montre les notes de deux classes de 3e (chaque point est une note). Quelle est la médiane des notes de la 3e ${c} ?`, figure: fig, mode: "nombre", prefixe: "Médiane :", attendu: Me,
        erreurs: [{ valeur: arr(L.reduce((p, r) => p + r, 0) / L.length, 2), message: "Ça, c'est la moyenne ; la médiane partage la série rangée en deux moitiés." }, { valeur: (T[0] + T[T.length - 1]) / 2, message: "La médiane n'est pas le milieu entre la plus petite et la plus grande note." }],
        aides: [`Range les $${L.length}$ notes de la 3e ${c} dans l'ordre croissant.`, L.length % 2 ? `La médiane est la $${(L.length + 1) / 2}$e note.` : `La médiane est la moyenne des $${L.length / 2}$e et $${L.length / 2 + 1}$e notes.`, `Notes rangées : ${liste3(T.map(nb))}.`],
        solution: `Notes rangées : ${liste3(T.map(nb))} ; la médiane est $${nb(Me)}$.` };
    }
    if (t === 2) { // nouvelle moyenne après l'ajout d'une valeur
      const n = rand(4, 12), m = rand(9, 15), m2 = m + nz(1, 2, true), x = (n + 1) * m2 - n * m, nom = pick(PRENOMS3);
      if (x < 0 || x > 20) return GEN["st3-comparer"]();
      return { enonce: `Après $${n}$ contrôles, la moyenne de ${nom} est $${m}$. ${il3(nom) === "elle" ? "Elle" : "Il"} obtient $${x}$ au contrôle suivant. Quelle est sa nouvelle moyenne ?`, mode: "nombre", prefixe: "Nouvelle moyenne :", attendu: m2,
        erreurs: [{ valeur: (m + x) / 2, message: `On ne fait pas la moyenne de $${m}$ et de $${x}$ : les $${n}$ premières notes comptent chacune.` }, { valeur: m, message: "La nouvelle note change la moyenne." }],
        aides: [`Somme des $${n}$ premières notes : $${n} \\times ${m} = ${n * m}$.`, `Nouvelle somme : $${n * m} + ${x} = ${n * m + x}$.`, `Divise par $${n + 1}$.`],
        solution: `$\\dfrac{${n * m} + ${x}}{${n + 1}} = \\dfrac{${n * m + x}}{${n + 1}} = ${m2}$.` };
    }
    const m = rand(10, 14), e1 = rand(3, 6), e2 = rand(10, 16), A = pick(["A", "B"]), k2 = rand(1, 3);
    const Q = pick([
      [`Toutes les notes d'une série augmentent de $${k2}$ point${k2 > 1 ? "s" : ""}. La moyenne, qui était $${m}$, devient :`, `$${m + k2}$`, [`$${m}$`, `$${m * k2}$`, `$${m + 2 * k2}$`], `Chaque note augmente de $${k2}$, donc la somme augmente de $${k2}$ fois l'effectif : la moyenne augmente de $${k2}$.`],
      [`Toutes les notes d'une série augmentent de $${k2}$ point${k2 > 1 ? "s" : ""}. L'étendue, qui était $${e1}$ :`, "ne change pas", [`devient $${e1 + k2}$`, `devient $${e1 + 2 * k2}$`, `devient $${e1 * k2}$`], "La plus grande et la plus petite valeur augmentent toutes les deux de la même quantité."],
      [`Deux classes ont la même moyenne, $${m}$. L'étendue des notes est $${e1}$ en 3e ${A === "A" ? "A" : "B"} et $${e2}$ en 3e ${A === "A" ? "B" : "A"}. On peut dire que :`, `les notes de la 3e ${A === "A" ? "B" : "A"} sont plus dispersées`, [`les notes de la 3e ${A === "A" ? "A" : "B"} sont plus dispersées`, "les deux classes ont les mêmes notes", `la 3e ${A === "A" ? "B" : "A"} a la meilleure médiane`], `L'étendue mesure la dispersion : $${e2} > ${e1}$, donc les notes de la 3e ${A === "A" ? "B" : "A"} sont plus dispersées (même si les moyennes sont égales).`],
      [`Dans une série, la médiane est $${m}$ et la moyenne $${m + rand(2, 4)}$. Cela peut s'expliquer par :`, "quelques valeurs très grandes", ["quelques valeurs très petites", "une étendue égale à zéro", "une erreur de calcul obligatoire"], "La moyenne est tirée vers le haut par quelques valeurs très grandes, alors que la médiane change peu."],
      [`La médiane des salaires d'une entreprise de Mamoudzou est $${nb(m * 150)}$ €. Cela signifie :`, `qu'au moins la moitié des salariés gagne $${nb(m * 150)}$ € ou moins`, [`que tous les salariés gagnent $${nb(m * 150)}$ €`, `que le salaire moyen est $${nb(m * 150)}$ €`, `que la moitié gagne exactement $${nb(m * 150)}$ €`], "La médiane partage les salariés en deux groupes de même effectif : au moins la moitié gagne ce salaire ou moins."],
      [`On ajoute la valeur $${m * 10}$ à une série dont toutes les valeurs sont entre $${m - 3}$ et $${m + 3}$. Quel indicateur change le plus ?`, "la moyenne et l'étendue", ["la médiane seulement", "aucun indicateur", "l'effectif total seulement"], "Une valeur très grande augmente beaucoup la moyenne et l'étendue ; la médiane bouge peu."]
    ]);
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu, aides: ["La moyenne est sensible aux valeurs extrêmes ; la médiane l'est peu.", "L'étendue mesure la dispersion.", "La médiane partage la série en deux groupes de même effectif."], solution: Q[3] || `Réponse : ${Q[1]}.` };
  };

  FIGURES["st3-cours-circulaire"] = () => diagrammeCirculaire([["Bus", 12], ["À pied", 14], ["Voiture", 10], ["Taxi", 4]]);
  FIGURES["st3-cours-batons"] = () => diagrammeBarres([["8", 2], ["12", 5], ["15", 3]], 1, "effectif");
  FIGURES["st3-cours-nuage"] = () => nuage3([["3e A", [9, 10, 10, 11, 11, 11, 12, 12, 13]], ["3e B", [4, 6, 8, 10, 11, 13, 15, 16, 16]]], 0, 20, "Notes de deux classes de 3e de même moyenne 11 : en 3e A, de 9 à 13 ; en 3e B, de 4 à 16");
  FIGURES["st3-methode-histo"] = () => histo3([0, 10, 20], [3, 5], "temps (min)");
  FIGURES["st3-qcm-barres"] = () => diagrammeBarres([["8", 2], ["10", 4], ["12", 6], ["14", 3], ["16", 1]], 1, "effectif");
  FIGURES["st3-qcm-histo"] = () => histo3([0, 10, 20, 30, 40], [4, 9, 5, 2], "durée (min)");

  /* =====================================================================
     Chapitre 11 : théorème de Thalès (th3-) — deux configurations, réciproque, problèmes
     ===================================================================== */
  const NOMS3 = [["A", "M", "N", "B", "C"], ["O", "E", "F", "G", "H"], ["S", "R", "T", "U", "V"], ["K", "I", "J", "L", "P"]];
  // k > 0 : triangle emboîté (M sur [AB]) ; k < 0 : papillon (M sur la demi-droite opposée)
  // Cote à l'extérieur d'une figure (côté opposé au point G)
  const coteOut3 = (P, Q, G, d, t) => { const n = u3([P[1] - Q[1], Q[0] - P[0]]), M = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2]; return cote3(P, Q, (M[0] - G[0]) * n[0] + (M[1] - G[1]) * n[1] >= 0 ? d : -d, t); };
  // k > 0 : triangles emboîtés (M sur [AB]) ; k < 0 : papillon (M sur la demi-droite opposée) ; kN : rapport pour N (par défaut k, autre valeur pour une figure à l'échelle non parallèle)
  // labs = { AM, AB, AN, AC, MN, BC } : textes des longueurs (« ? » pour l'inconnue)
  function figureThales3(noms, k, labs, kN, aria) {
    const [A, M, N, B, C] = noms; kN = kN == null ? k : kN;
    if (Math.abs(k) < 0.34) { const f = 0.34 / Math.abs(k); k *= f; kN = Math.sign(kN) * Math.min(0.95, Math.abs(kN * f)); } // petit rapport : figure agrandie pour rester lisible (croquis)
    const pA = k > 0 ? [160, 34] : [158, 96], pB = k > 0 ? [64, 184] : [60, 186], pC = k > 0 ? [276, 178] : [272, 180];
    const P = (u, v, t) => [+(u[0] + t * (v[0] - u[0])).toFixed(1), +(u[1] + t * (v[1] - u[1])).toFixed(1)];
    const pM = P(pA, pB, k), pN = P(pA, pC, kN);
    const segs = k > 0 ? [[A, B], [A, C], [B, C], [M, N]] : [[M, B], [N, C], [B, C], [M, N]];
    const decal = k > 0 ? { [A]: [-4, -7], [B]: [-12, 8], [C]: [6, 8], [M]: [-14, 0], [N]: [6, 0] } : { [A]: [12, 4], [B]: [-12, 6], [C]: [6, 6], [M]: [8, -4], [N]: [-14, -4] };
    let s = geo({ W: 320, H: 206, pts: { [A]: pA, [B]: pB, [C]: pC, [M]: pM, [N]: pN }, segs, decal, aria: aria || (k > 0 ? `Triangle ${A}${B}${C}, ${M} sur [${A}${B}], ${N} sur [${A}${C}]` : `Droites (${B}${M}) et (${C}${N}) sécantes en ${A} (configuration papillon)`) + (labs ? ` ; longueurs : ${Object.entries(labs).filter(([, v]) => v).map(([c, v]) => `${{ AM: A + M, AB: A + B, AN: A + N, AC: A + C, MN: M + N, BC: B + C }[c]} = ${v}`).join(", ")}` : "") });
    if (labs) {
      let x = "";
      if (k > 0) {
        const G = [(pA[0] + pB[0] + pC[0]) / 3, (pA[1] + pB[1] + pC[1]) / 3];
        if (labs.AM) x += labSeg3(pA, pM, G, 7, labs.AM); if (labs.AN) x += labSeg3(pA, pN, G, 7, labs.AN);
        if (labs.AB) x += coteOut3(pA, pB, G, 44, labs.AB); if (labs.AC) x += coteOut3(pA, pC, G, 44, labs.AC);
        if (labs.MN) x += labSeg3(pM, pN, pA, 7, labs.MN); if (labs.BC) x += labSeg3(pB, pC, pA, 7, labs.BC);
      } else {
        const G1 = [(pA[0] + pM[0] + pN[0]) / 3, (pA[1] + pM[1] + pN[1]) / 3], G2 = [(pA[0] + pB[0] + pC[0]) / 3, (pA[1] + pB[1] + pC[1]) / 3];
        if (labs.AM) x += labSeg3(pA, pM, G1, 7, labs.AM); if (labs.AN) x += labSeg3(pA, pN, G1, 7, labs.AN);
        if (labs.AB) x += labSeg3(pA, pB, G2, 7, labs.AB); if (labs.AC) x += labSeg3(pA, pC, G2, 7, labs.AC);
        if (labs.MN) x += labSeg3(pM, pN, pA, 7, labs.MN); if (labs.BC) x += labSeg3(pB, pC, pA, 7, labs.BC);
      }
      s = s.replace("</svg>", x + "</svg>");
    }
    return s;
  }
  const tireThales3 = () => {
    for (;;) {
      const num = rand(1, 4), den = rand(num + 1, Math.min(7, 3 * num + 1)), k = num / den, AB = rand(2, 9) * den / pgcd(num, den), AC = rand(2, 9) * den / pgcd(num, den), BC = rand(2, 9) * den / pgcd(num, den);
      const AM = AB * k, AN = AC * k, MN = BC * k;
      if (AB + AC <= BC || AB + BC <= AC || AC + BC <= AB) continue;
      if ([AM, AN, MN].every((x) => Number.isInteger(x * 10))) return { k, AB, AC, BC, AM, AN, MN };
    }
  };

  GEN["th3-longueur"] = function () {
    const N = pick(NOMS3), [A, M, Np, B, C] = N, pap = Math.random() < 0.6, T = tireThales3(), t = rand(0, 2);
    const nomsL = { AM: A + M, AB: A + B, AN: A + Np, AC: A + C, MN: M + Np, BC: B + C };
    const [cherche, donnes] = [["AN", ["AM", "AB", "AC"]], ["MN", ["AM", "AB", "BC"]], ["AB", ["AM", "AN", "AC"]]][t];
    const vals = { AM: T.AM, AB: T.AB, AN: T.AN, AC: T.AC, MN: T.MN, BC: T.BC };
    const hyp = pap ? `Les droites $(${B}${M})$ et $(${C}${Np})$ se coupent en $${A}$, et $(${M}${Np}) \\parallel (${B}${C})$` : `$${M} \\in [${A}${B}]$, $${Np} \\in [${A}${C}]$ et $(${M}${Np}) \\parallel (${B}${C})$`;
    const r1 = `\\dfrac{${nomsL.AM}}{${nomsL.AB}}`, r2 = `\\dfrac{${nomsL.AN}}{${nomsL.AC}}`, r3 = `\\dfrac{${nomsL.MN}}{${nomsL.BC}}`;
    const rep = vals[cherche], egal = { AN: [r1, r2, `${nomsL.AN} = \\dfrac{${nb(T.AC)} \\times ${nb(T.AM)}}{${nb(T.AB)}}`], MN: [r1, r3, `${nomsL.MN} = \\dfrac{${nb(T.BC)} \\times ${nb(T.AM)}}{${nb(T.AB)}}`], AB: [r1, r2, `${nomsL.AB} = \\dfrac{${nb(T.AM)} \\times ${nb(T.AC)}}{${nb(T.AN)}}`] }[cherche];
    const labs = {}; donnes.forEach((d) => { labs[d] = `${nbTexte(vals[d])} cm`; }); labs[cherche] = "?";
    const diff = { AN: T.AC - (T.AB - T.AM), MN: T.BC - (T.AB - T.AM), AB: T.AM + (T.AC - T.AN) }[cherche];
    return { enonce: `${hyp}. On sait que ${donnes.map((d) => `$${nomsL[d]} = ${nb(vals[d])}$ cm`).join(", ")}. Calcule $${nomsL[cherche]}$.`, figure: figureThales3(N, pap ? -T.k : T.k, labs), mode: "nombre", prefixe: `$${nomsL[cherche]} =$`, suffixe: "cm", attendu: rep,
      erreurs: [{ valeur: arr({ AN: (T.AC * T.AB) / T.AM, MN: (T.BC * T.AB) / T.AM, AB: (T.AN * T.AC) / T.AM }[cherche], 4), message: "Vérifie le rapport : petit triangle en haut, grand triangle en bas, côtés correspondants." }, ...(diff > 0 ? [{ valeur: arr(diff, 4), message: "Le théorème de Thalès donne des rapports égaux (des quotients), pas des différences égales." }] : [])],
      aides: [pap ? "Configuration « papillon » : les deux triangles sont opposés par le sommet, le théorème de Thalès s'applique de la même façon." : "Le petit triangle est une réduction du grand.", `$${r1} = ${r2} = ${r3}$.`, `Choisis l'égalité $${egal[0]} = ${egal[1]}$ puis fais un produit en croix.`],
      solution: `D'après le théorème de Thalès, $${r1} = ${r2} = ${r3}$. Donc $${egal[2]} = ${nb(rep)}$ cm.` };
  };

  GEN["th3-reciproque"] = function () {
    const N = pick(NOMS3), [A, M, Np, B, C] = N, pap = Math.random() < 0.5;
    const AB = rand(4, 15), AM = rand(Math.ceil(AB / 4), AB - 1), AC = rand(4, 15), AN0 = (AM * AC) / AB, par = Math.random() < 0.5;
    if (!Number.isInteger(AN0 * 10)) return GEN["th3-reciproque"]();
    const AN = par ? AN0 : arr(AN0 + pick([-0.5, 0.5, 1, -1]), 2); if (AN <= 0 || AN >= AC) return GEN["th3-reciproque"]();
    const pos = pap ? `Les points $${M}$, $${A}$, $${B}$ d'une part et $${Np}$, $${A}$, $${C}$ d'autre part sont alignés dans cet ordre` : `$${M} \\in [${A}${B}]$ et $${Np} \\in [${A}${C}]$`;
    const L = [`Oui, car $\\dfrac{${A}${M}}{${A}${B}} = \\dfrac{${A}${Np}}{${A}${C}}$ et les points sont dans le même ordre`, `Non, car $\\dfrac{${A}${M}}{${A}${B}} \\neq \\dfrac{${A}${Np}}{${A}${C}}$`, `Oui, car $${A}${M} + ${A}${B} = ${A}${Np} + ${A}${C}$`, "On ne peut pas savoir sans mesurer les angles"];
    const { choix, attendu } = melange(L[par ? 0 : 1], L.filter((_, i) => i !== (par ? 0 : 1)));
    const fig = figureThales3(N, pap ? -AM / AB : AM / AB, { AM: `${AM} cm`, AB: `${AB} cm`, AN: `${nbTexte(AN)} cm`, AC: `${AC} cm` }, pap ? -AN / AC : AN / AC, pap ? `Droites (${B}${M}) et (${C}${Np}) sécantes en ${A}` : `Triangle ${A}${B}${C}, ${M} sur [${A}${B}], ${Np} sur [${A}${C}]`);
    return { enonce: `${pos}, avec $${A}${M} = ${AM}$ cm, $${A}${B} = ${AB}$ cm, $${A}${Np} = ${nb(AN)}$ cm et $${A}${C} = ${AC}$ cm. Les droites $(${M}${Np})$ et $(${B}${C})$ sont-elles parallèles ?`, figure: fig, mode: "choix", choix, attendu,
      aides: ["Compare les rapports $\\dfrac{" + A + M + "}{" + A + B + "}$ et $\\dfrac{" + A + Np + "}{" + A + C + "}$ (ou les produits en croix).", `$${AM} \\times ${AC} = ${AM * AC}$ et $${AB} \\times ${nb(AN)} = ${nb(arr(AB * AN, 4))}$.`, "Égaux : réciproque de Thalès (droites parallèles). Différents : contraposée (pas parallèles)."],
      solution: par ? `$${AM} \\times ${AC} = ${AB} \\times ${nb(AN)}$ : les rapports sont égaux et les points sont dans le même ordre. D'après la réciproque du théorème de Thalès, les droites sont parallèles.` : `$${AM} \\times ${AC} = ${AM * AC}$ et $${AB} \\times ${nb(AN)} = ${nb(arr(AB * AN, 4))}$ : les rapports sont différents. D'après la contraposée du théorème de Thalès, les droites ne sont pas parallèles.` };
  };

  GEN["th3-rapport"] = function () {
    const N = pick(NOMS3), [A, M, Np, B, C] = N, AB = rand(4, 15), AM = rand(Math.ceil(AB / 4), AB - 1), t = rand(0, 1);
    if (pgcd(AM, AB) === 1 && Math.random() < 0.3) return GEN["th3-rapport"]();
    const k = AM / AB, fig = figureThales3(N, k, { AM: `${AM} cm`, AB: `${AB} cm` }, null, `Triangle ${A}${B}${C}, ${M} sur [${A}${B}], ${Np} sur [${A}${C}], (${M}${Np}) parallèle à (${B}${C})`);
    if (t === 0) { const S = rand(2, 12) * AB * AB, s = arr(S * k * k, 4);
      return { enonce: `Le triangle $${A}${M}${Np}$ est une réduction du triangle $${A}${B}${C}$ ($(${M}${Np}) \\parallel (${B}${C})$) avec $${A}${M} = ${AM}$ cm et $${A}${B} = ${AB}$ cm. L'aire de $${A}${B}${C}$ est $${nb(S)}$ cm². Quelle est l'aire de $${A}${M}${Np}$ ?`, figure: fig, mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: s,
        erreurs: [{ valeur: arr(S * k, 4), message: "Dans une réduction de rapport $k$, les aires sont multipliées par $k^2$." }, { valeur: arr(S * k * k * k, 4), message: "$k^3$, c'est pour les volumes ; pour les aires, c'est $k^2$." }],
        aides: [`Rapport de réduction : $k = \\dfrac{${AM}}{${AB}}$.`, "Les aires sont multipliées par $k^2$.", `Aire $= ${nb(S)} \\times \\left(${fr(AM, AB)}\\right)^2$.`], solution: `$${nb(S)} \\times \\left(${fr(AM, AB)}\\right)^2 = ${nb(S)} \\times ${fr(AM * AM, AB * AB)} = ${nb(s)}$ cm².` }; }
    const bonne = `$${frS(AM, AB)}$`, faux = uniq3(bonne, [`$${frS(AB, AM)}$`, `$${frS(AM, AB - AM)}$`, `$${frS(AM * AM, AB * AB)}$`, `$${frS(AB - AM, AB)}$`]);
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: `$(${M}${Np}) \\parallel (${B}${C})$ avec $${M} \\in [${A}${B}]$, $${A}${M} = ${AM}$ cm et $${A}${B} = ${AB}$ cm. Quel est le coefficient de réduction qui transforme $${A}${B}${C}$ en $${A}${M}${Np}$ ?`, figure: fig, mode: "choix", choix, attendu,
      aides: ["Coefficient de réduction $=$ longueur du petit triangle $\\div$ longueur correspondante du grand.", `$k = \\dfrac{${A}${M}}{${A}${B}}$.`, "Il est inférieur à $1$."], solution: `$k = \\dfrac{${AM}}{${AB}} = ${frS(AM, AB)}$.` };
  };

  // Ombres : piquet et objet dont les ombres se terminent au même point S (configuration emboîtée)
  function ombre3(b, o, O, H, labB, labO, labo, labH, objet) {
    const g = 172, s = Math.min(270 / O, 150 / H), S = [24, g], P = [24 + o * s, g], Q = [24 + O * s, g], Pt = [P[0], g - b * s], Qt = [Q[0], g - H * s];
    const c = ln3(10, g, 312, g, "g-droite") + ln3(S[0], S[1], Qt[0] + (Qt[0] - S[0]) * 0.04, Qt[1] + (Qt[1] - S[1]) * 0.04, "g-guide") + `<line class="g-segment" style="stroke-width:3" x1="${r3(P[0])}" y1="${g}" x2="${r3(Pt[0])}" y2="${r3(Pt[1])}"/><line class="g-segment" style="stroke-width:5" x1="${r3(Q[0])}" y1="${g}" x2="${r3(Qt[0])}" y2="${r3(Qt[1])}"/>`
      + pt3(S, "S", [S[0] + 10, S[1] + 10]) + tx3(P[0] + 6, (g + Pt[1]) / 2 + 6, labB, "g-mesure", "start") + tx3(Q[0] + 8, (g + Qt[1]) / 2 + 4, labH, "g-mesure", "start")
      + tk3(P[0], Pt[1] - 6, "piquet", "middle") + tk3(Math.min(Q[0], 290), Qt[1] - 6, objet, "middle") + cote3(S, P, 12, labo) + cote3(S, Q, 36, labO);
    return sv3(320, 228, `Un piquet de ${labB} et un ${objet} de hauteur ${labH} ; leurs ombres se terminent au même point S : ombre du piquet ${labo}, ombre du ${objet} ${labO}`, c);
  }
  function maquette3(l, e) {
    const h = Math.min(110, 20 + l * 3);
    return sv3(320, 160, `Maquette de bateau à l'échelle 1/${e} : le mât mesure ${l} cm`, `<polygon class="g-aire" points="60,${130} 260,130 236,150 84,150"/>` + ln3(60, 130, 260, 130, "g-segment") + `<line class="g-segment" style="stroke-width:3" x1="160" y1="130" x2="160" y2="${130 - h}"/><polygon class="g-poly" points="166,${130 - h + 6} 166,124 ${166 + h * 0.6},124"/>` + tx3(152, 134 - h / 2, `${l} cm`, "g-mesure", "end") + tk3(240, 24, `échelle 1/${e}`, "middle"));
  }
  const OBJ3 = [["cocotier", "un cocotier"], ["baobab", "un baobab"], ["pylône", "un pylône"], ["immeuble", "un immeuble de Mamoudzou"], ["minaret", "le minaret d'une mosquée"]];

  GEN["th3-problemes"] = function () {
    const t = rand(0, 2);
    if (t === 0) { // largeur d'une rivière (papillon)
      const [A, M, Np, B, C] = pick(NOMS3.filter((n) => !n.includes("L"))); let a, b, c, L;
      do { a = rand(2, 9); b = rand(3, 12); c = rand(Math.ceil(a / 0.85), 18); L = arr((b * c) / a, 1); } while (Math.abs((b * c) / a - L) > 1e-9 || c === a); // largeur décimale exacte
      const fig = figureThales3([A, M, Np, B, C], -a / c, { AM: `${a} m`, MN: `${b} m`, AB: `${c} m`, BC: "L" }, null, `Rivière de largeur ${B}${C} = L : droites (${B}${M}) et (${C}${Np}) sécantes en ${A}, (${M}${Np}) parallèle à (${B}${C})`);
      const dif = b + (c - a);
      return { enonce: `Pour mesurer la largeur $L = ${B}${C}$ d'une rivière près de Combani, on plante des piquets : les points $${M}$, $${A}$, $${B}$ sont alignés, ainsi que $${Np}$, $${A}$, $${C}$ et $(${M}${Np}) \\parallel (${B}${C})$. On mesure $${A}${M} = ${a}$ m, $${M}${Np} = ${b}$ m et $${A}${B} = ${c}$ m. Calcule la largeur $L$.`, figure: fig, mode: "nombre", prefixe: "$L =$", suffixe: "m", attendu: L,
        erreurs: [{ valeur: arr((a * b) / c, 2), message: "Les rapports se forment entre côtés correspondants : $\\dfrac{" + A + B + "}{" + A + M + "} = \\dfrac{L}{" + M + Np + "}$." }, { valeur: dif, message: "Le théorème de Thalès donne des rapports égaux, pas des différences égales." }],
        aides: ["Configuration papillon : le théorème de Thalès s'applique.", `$\\dfrac{${A}${B}}{${A}${M}} = \\dfrac{${B}${C}}{${M}${Np}}$, soit $\\dfrac{${c}}{${a}} = \\dfrac{L}{${b}}$.`, `$L = \\dfrac{${b} \\times ${c}}{${a}}$.`], solution: `D'après le théorème de Thalès, $\\dfrac{${A}${B}}{${A}${M}} = \\dfrac{${B}${C}}{${M}${Np}}$, donc $L = \\dfrac{${b} \\times ${c}}{${a}} = ${nb(L)}$ m.` }; }
    if (t === 1) { // hauteur avec ombre
      const [obj, objT] = pick(OBJ3); let b, o, O, H;
      do { b = rand(10, 20) / 10; o = rand(15, 40) / 10; O = rand(Math.ceil(3 * o), Math.floor(10 * o)); H = arr((b * O) / o, 2); } while (Math.abs((b * O) / o - H) > 1e-9); // hauteur décimale exacte (au centième au plus)
      const dif = arr(b + O - o, 2);
      return { enonce: `Au même moment, l'ombre d'un piquet vertical de $${nb(b)}$ m et celle ${objT.replace(/^un /, "d'un ").replace(/^le /, "du ")} se terminent au même point $S$. L'ombre du piquet mesure $${nb(o)}$ m, celle ${du3(obj)} $${O}$ m. Quelle est la hauteur ${du3(obj)} ?`, figure: ombre3(b, o, O, H, `${nbTexte(b)} m`, `${O} m`, `${nbTexte(o)} m`, "?", obj), mode: "nombre", prefixe: "Hauteur :", suffixe: "m", attendu: H,
        erreurs: [{ valeur: arr((o * O) / b, 2), message: "Hauteur et ombre " + du3(obj) + " sont proportionnelles à celles du piquet, dans le même sens : $\\dfrac{h}{" + nb(b) + "} = \\dfrac{" + O + "}{" + nb(o) + "}$." }, ...(dif > 0 ? [{ valeur: dif, message: "Le théorème de Thalès donne des rapports égaux, pas des différences égales." }] : [])],
        aides: ["Le piquet et " + le3(obj) + " sont verticaux, donc parallèles : configuration de Thalès de sommet $S$.", `$\\dfrac{h}{${nb(b)}} = \\dfrac{${O}}{${nb(o)}}$.`, `$h = \\dfrac{${nb(b)} \\times ${O}}{${nb(o)}}$.`], solution: `D'après le théorème de Thalès, $\\dfrac{h}{${nb(b)}} = \\dfrac{${O}}{${nb(o)}}$, donc $h = \\dfrac{${nb(b)} \\times ${O}}{${nb(o)}} = ${nb(H)}$ m.` }; }
    // longueur réelle à partir d'une maquette
    const e = pick([10, 20, 25, 50, 100]), l = rand(3, 30), r = l * e;
    return { enonce: `Une maquette est une réduction à l'échelle $${fr(1, e)}$ d'un bateau. Sur la maquette, le mât mesure $${l}$ cm. Quelle est la hauteur réelle du mât, en mètres ?`, figure: maquette3(l, e), mode: "nombre", prefixe: "Hauteur :", suffixe: "m", attendu: r / 100,
      erreurs: [{ valeur: r, message: "C'est la hauteur en centimètres : convertis en mètres." }, { valeur: l / e, message: "La taille réelle est plus grande : on multiplie par $" + e + "$." }],
      aides: [`Échelle $${fr(1, e)}$ : $1$ cm sur la maquette représente $${e}$ cm en réalité.`, `$${l} \\times ${e} = ${r}$ cm.`, "$100$ cm $= 1$ m."], solution: `$${l} \\times ${e} = ${r}$ cm $= ${nb(r / 100)}$ m.` };
  };

  const NA3 = ["A", "M", "N", "B", "C"];
  FIGURES["th3-cours-emboites"] = () => figureThales3(NA3, 0.6, { AM: "3", AB: "5", MN: "?", BC: "8" }, null, "Triangles emboîtés : M sur [AB], N sur [AC], (MN) parallèle à (BC)");
  FIGURES["th3-cours-papillon"] = () => figureThales3(NA3, -0.6, null, null, "Configuration papillon : droites (BM) et (CN) sécantes en A, (MN) parallèle à (BC)");
  FIGURES["th3-cours-configs"] = () => FIGURES["th3-cours-emboites"]() + FIGURES["th3-cours-papillon"]();
  FIGURES["th3-cours-reciproque"] = () => figureThales3(NA3, 0.4, { AM: "2", AB: "5", AN: "3", AC: "7,5" }, null, "M sur [AB], N sur [AC]");
  FIGURES["th3-cours-reduction"] = () => {
    const A = [160, 22], B = [40, 196], C = [280, 196], P = (u, v, t) => [u[0] + t * (v[0] - u[0]), u[1] + t * (v[1] - u[1])], G = [160, 140];
    let c = `<polygon class="g-aire" points="${pl3([A, P(A, B, 1 / 3), P(A, C, 1 / 3)])}"/>`;
    [1 / 3, 2 / 3].forEach((t) => { [[A, B, C], [B, A, C], [C, A, B]].forEach(([S, U, V]) => { const X = P(S, U, t), Y = P(S, V, t); c += ln3(X[0], X[1], Y[0], Y[1], "g-guide"); }); });
    c += `<polygon class="g-poly" points="${pl3([A, B, C])}"/>` + ln3(P(A, B, 1 / 3)[0], P(A, B, 1 / 3)[1], P(A, C, 1 / 3)[0], P(A, C, 1 / 3)[1], "g-segment");
    c += pt3(A, "A", G) + pt3(B, "B", G) + pt3(C, "C", G) + pt3(P(A, B, 1 / 3), "M", G, 9) + pt3(P(A, C, 1 / 3), "N", G, 9) + tk3(160, 216, "9 petits triangles identiques au triangle grisé AMN", "middle");
    return sv3(320, 224, "Triangle ABC découpé en 9 petits triangles identiques ; le triangle AMN grisé, avec AM égal au tiers de AB, est l'un d'eux", c);
  };
  FIGURES["th3-qcm-calc"] = () => figureThales3(["E", "F", "G", "H", "K"], 4 / 6, { AM: "4 cm", AB: "6 cm", MN: "?", BC: "9 cm" }, null, "(FG) parallèle à (HK), F sur [EH], G sur [EK]");
  FIGURES["th3-qcm-papillon"] = () => figureThales3(["O", "R", "S", "T", "U"], -0.4, { AM: "2 cm", AB: "5 cm", AN: "3 cm", AC: "?" }, null, "Droites (TR) et (US) sécantes en O, (RS) parallèle à (TU)");
  FIGURES["th3-qcm-reciproque"] = () => figureThales3(NA3, 6 / 9, { AM: "6 cm", AB: "9 cm", AN: "8 cm", AC: "12 cm" }, null, "M sur [AB], N sur [AC]");
  FIGURES["th3-qcm-ombre"] = () => ombre3(1.5, 2, 12, 9, "1,5 m", "12 m", "2 m", "?", "cocotier");
  FIGURES["th3-qcm-riviere"] = () => figureThales3(NA3, -0.4, { AM: "4 m", MN: "6 m", AB: "10 m", BC: "?" }, null, "Rivière : droites (BM) et (CN) sécantes en A, (MN) parallèle à (BC)");

  /* =====================================================================
     Chapitre 12 : triangles semblables (ts3-) — angles, côtés proportionnels, calculs, triangles égaux
     ===================================================================== */
  const TRI3 = [["ABC", "DEF"], ["IJK", "LMN"], ["RST", "UVW"], ["EFG", "PQR"]];
  // Deux triangles côte à côte. S : longueurs [d01, d12, d02] (forme) ; L : textes des côtés ; A : textes des angles (sommets 0, 1, 2) ;
  // C : codages (nombre de traits) des côtés ; rot (degrés), flip, taille (≤ 1) pour chaque triangle
  const formeAng3 = (a, b) => { const c = 180 - a - b, s = (x) => Math.sin((x * Math.PI) / 180); return [s(c), s(a), s(b)]; }; // côtés opposés : d01 face au sommet 2, etc.
  function deuxTri3(o) {
    let corps = "";
    [0, 1].forEach((i) => {
      const [a, b, c] = o.S[i], x = (a * a + c * c - b * b) / (2 * a), y = -Math.sqrt(Math.max(0, c * c - x * x)), r = ((o.rot ? o.rot[i] : 0) * Math.PI) / 180, f = o.flip && o.flip[i] ? -1 : 1;
      let P = [[0, 0], [a, 0], [x, y]].map(([u, v]) => [f * (u * Math.cos(r) - v * Math.sin(r)), u * Math.sin(r) + v * Math.cos(r)]);
      const xs = P.map((p) => p[0]), ys = P.map((p) => p[1]), w = Math.max(...xs) - Math.min(...xs), h = Math.max(...ys) - Math.min(...ys), s = Math.min(190 / w, 100 / h) * (o.taille ? o.taille[i] : 1);
      const cx = (Math.max(...xs) + Math.min(...xs)) / 2, cy = (Math.max(...ys) + Math.min(...ys)) / 2;
      P = P.map((p) => [160 + (p[0] - cx) * s, 74 + 150 * i + (p[1] - cy) * s]);
      const G = [(P[0][0] + P[1][0] + P[2][0]) / 3, (P[0][1] + P[1][1] + P[2][1]) / 3], T = o.T[i], cotes = [[0, 1], [1, 2], [0, 2]];
      corps += `<polygon class="g-poly" points="${pl3(P)}"/>`;
      cotes.forEach(([p, q], j) => { if (o.C && o.C[i] && o.C[i][j]) corps += code3(P[p], P[q], o.C[i][j]); if (o.L && o.L[i] && o.L[i][j]) corps += labSeg3(P[p], P[q], G, Math.hypot(P[p][0] - P[q][0], P[p][1] - P[q][1]) < 70 ? 12 : 6, o.L[i][j]); });
      // étiquettes d'angles sur la bissectrice, éloignées l'une de l'autre si elles se gênent
      const E = [0, 1, 2].map((j) => { const t = o.A && o.A[i] && o.A[i][j]; if (!t) return null; const S = P[j], u = u3(d3(P[(j + 1) % 3], S)), v = u3(d3(P[(j + 2) % 3], S)), b = u3([u[0] + v[0], u[1] + v[1]]), th = Math.acos(Math.max(-1, Math.min(1, u[0] * v[0] + u[1] * v[1]))); return { j, t, S, b, th, d: Math.max(24, Math.min(46, 15 / Math.tan(th / 2))) }; }).filter(Boolean);
      const pos = (e) => [e.S[0] + e.b[0] * e.d, e.S[1] + e.b[1] * e.d + 4];
      for (let k = 0; k < 6; k++) E.forEach((e1, m) => E.forEach((e2, n) => { if (m < n) { const p1 = pos(e1), p2 = pos(e2); if (Math.abs(p1[0] - p2[0]) < 32 && Math.abs(p1[1] - p2[1]) < 13) { const g = e1.th > e2.th ? e1 : e2; g.d += 8; } } }));
      E.forEach((e) => { const p = pos(e); corps += arc3(e.S, P[(e.j + 1) % 3], P[(e.j + 2) % 3], 15) + tx3(p[0], p[1], e.t, "g-mesure", "middle"); });
      [0, 1, 2].forEach((j) => { corps += pt3(P[j], T[j], G, 9); });
    });
    return sv3(320, 298, o.aria, corps);
  }
  const angTxt3 = (L) => L.map((x) => (x === "" || x == null ? "" : typeof x === "number" ? `${x}°` : x));
  const decrit3 = (T, A, L) => [0, 1, 2].map((j) => (A && A[j] ? `angle en ${T[j]} : ${A[j]}` : "")).concat([[0, 1], [1, 2], [0, 2]].map(([p, q], j) => (L && L[j] ? `${T[p]}${T[q]} = ${L[j]}` : ""))).filter(Boolean).join(", ");

  GEN["ts3-angles"] = function () {
    const [T1, T2] = pick(TRI3), a = rand(25, 85), b = rand(25, 95 - Math.floor(a / 3)), c = 180 - a - b;
    if (c < 15 || a === b || b === c || a === c) return GEN["ts3-angles"]();
    const t = rand(0, 1), rot = [pick([0, 0, 10, -10]), pick([0, 180, 20, -25, 160])], flip = [false, Math.random() < 0.5], taille = Math.random() < 0.5 ? [0.92, 1] : [1, 0.92];
    if (t === 0) {
      const sem = Math.random() < 0.5, d = sem ? b : b + pick([-6, -4, 4, 6, 8]), e = 180 - a - d;
      if (e < 10 || d < 10) return GEN["ts3-angles"]();
      const p = shuffle([0, 1, 2]), A2 = []; A2[p[0]] = a; A2[p[1]] = e; A2[p[2]] = d; const L2 = []; L2[p[0]] = a; L2[p[1]] = e; L2[p[2]] = "";
      const fig = deuxTri3({ T: [T1, T2], S: [formeAng3(a, b), formeAng3(A2[0], A2[1])], A: [angTxt3([a, b, ""]), angTxt3(L2)], rot, flip, taille, aria: `Triangle ${T1} (${decrit3(T1, angTxt3([a, b, ""]))}) et triangle ${T2} (${decrit3(T2, angTxt3(L2))})` });
      const L = [`Oui : leurs angles sont deux à deux de même mesure`, `Non : leurs angles ne sont pas deux à deux égaux`, `Oui : ils ont un angle de $${a}^\\circ$ en commun, cela suffit`, `On ne peut pas savoir sans les longueurs`];
      const { choix, attendu } = melange(L[sem ? 0 : 1], L.filter((_, i) => i !== (sem ? 0 : 1)));
      return { enonce: `Le triangle $${T1}$ a des angles de $${a}^\\circ$ et $${b}^\\circ$. Le triangle $${T2}$ a des angles de $${a}^\\circ$ et $${e}^\\circ$. Sont-ils semblables ?`, figure: fig, mode: "choix", choix, attendu,
        aides: ["Deux triangles sont semblables si leurs angles sont deux à deux de même mesure.", "Calcule le troisième angle de chaque triangle : la somme des angles vaut $180^\\circ$.", `Troisième angle de $${T1}$ : $180 - ${a} - ${b} = ${c}^\\circ$ ; de $${T2}$ : $180 - ${a} - ${e} = ${180 - a - e}^\\circ$.`],
        solution: `Angles de $${T1}$ : $${a}^\\circ$, $${b}^\\circ$, $${c}^\\circ$ ; angles de $${T2}$ : $${a}^\\circ$, $${e}^\\circ$, $${180 - a - e}^\\circ$. ${sem ? "Ce sont les mêmes : les triangles sont semblables." : "Ils ne sont pas les mêmes : les triangles ne sont pas semblables."}` };
    }
    const fig = deuxTri3({ T: [T1, T2], S: [formeAng3(a, b), formeAng3(a, b)], A: [angTxt3([a, b, ""]), angTxt3([a, "", ""])], rot, flip, taille, aria: `Triangle ${T1} (angles de ${a}° en ${T1[0]} et ${b}° en ${T1[1]}) et triangle semblable ${T2} (angle de ${a}° en ${T2[0]})` });
    return { enonce: `Les triangles $${T1}$ et $${T2}$ sont semblables. $${T1}$ a des angles de $${a}^\\circ$ et $${b}^\\circ$. $${T2}$ a un angle de $${a}^\\circ$. Quelle est la mesure du plus petit des deux autres angles de $${T2}$ ?`, figure: fig, mode: "nombre", prefixe: "Angle :", suffixe: "°", attendu: Math.min(b, c),
      erreurs: [{ valeur: Math.max(b, c), message: "On demande le plus petit des deux autres angles." }, { valeur: 180 - a, message: "Il reste $180 - " + a + "$ degrés pour les deux autres angles ensemble, pas pour un seul." }],
      aides: ["Des triangles semblables ont les mêmes angles.", `Le troisième angle de $${T1}$ vaut $180 - ${a} - ${b} = ${c}^\\circ$.`, `Les angles de $${T2}$ sont donc $${a}^\\circ$, $${b}^\\circ$ et $${c}^\\circ$.`],
      solution: `Les angles de $${T2}$ sont $${a}^\\circ$, $${b}^\\circ$ et $${c}^\\circ$ : le plus petit des deux autres est $${Math.min(b, c)}^\\circ$.` };
  };

  GEN["ts3-cotes"] = function () {
    const [T1, T2] = pick(TRI3), base = shuffle([[3, 4, 5], [4, 5, 6], [5, 6, 8], [2, 3, 4], [5, 7, 9], [6, 7, 10], [4, 6, 7], [3, 5, 7]])[0], k = pick([1.5, 2, 2.5, 3, 0.5, 4]);
    const sem = Math.random() < 0.5, c2 = base.map((x) => arr(x * k, 2)); if (!sem) c2[rand(0, 2)] = arr(c2[0] + pick([-1, 1, 0.5]), 2);
    const tri = c2.slice().sort((p, q) => p - q);
    if (new Set(c2).size < 3 || tri[0] + tri[1] <= tri[2]) return GEN["ts3-cotes"]();
    const t = rand(0, 1), opt = { rot: [0, pick([0, 180, 15, -20])], flip: [false, Math.random() < 0.5], taille: k >= 1 ? [0.8, 1] : [1, 0.8] };
    const melange2 = shuffle(c2.slice()), cm = (x) => `${nbTexte(x)} cm`;
    if (t === 0) {
      const L = ["Oui : les longueurs des côtés sont proportionnelles", "Non : les longueurs des côtés ne sont pas proportionnelles", "Oui : ils ont tous les deux trois côtés", "On ne peut pas savoir sans les angles"];
      const { choix, attendu } = melange(L[sem ? 0 : 1], L.filter((_, i) => i !== (sem ? 0 : 1)));
      const fig = deuxTri3({ T: [T1, T2], S: [base, melange2], L: [base.map(cm), melange2.map(cm)], ...opt, aria: `Triangle ${T1} de côtés ${base.map(cm).join(", ")} et triangle ${T2} de côtés ${melange2.map(cm).join(", ")}` });
      return { enonce: `Les côtés de $${T1}$ mesurent $${base.join("$ cm, $")}$ cm ; ceux de $${T2}$ mesurent $${melange2.map(nb).join("$ cm, $")}$ cm. Ces triangles sont-ils semblables ?`, figure: fig, mode: "choix", choix, attendu,
        aides: ["Range les côtés de chaque triangle dans l'ordre croissant.", "Calcule les quotients « grand triangle / petit triangle » des côtés correspondants.", "S'ils sont tous égaux, les côtés sont proportionnels et les triangles sont semblables."],
        solution: `Rangés : $${base.join(" ; ")}$ et $${c2.slice().sort((p, q) => p - q).map(nb).join(" ; ")}$. Quotients : ${base.map((x, i) => `$${nb(arr(c2.slice().sort((p, q) => p - q)[i] / x, 4))}$`).join(", ")}. ${sem ? "Ils sont égaux : les triangles sont semblables." : "Ils ne sont pas tous égaux : les triangles ne sont pas semblables."}` };
    }
    if (!sem) return GEN["ts3-cotes"]();
    const fig = deuxTri3({ T: [T1, T2], S: [base, c2], L: [base.map(cm), ["", "", cm(c2[2])]], ...opt, aria: `Triangle ${T1} de côtés ${base.map(cm).join(", ")} ; triangle ${T2} dont le plus grand côté mesure ${cm(c2[2])}` });
    return { enonce: `Le triangle $${T2}$ est un agrandissement ou une réduction de $${T1}$. Les côtés de $${T1}$ mesurent $${base.join("$ cm, $")}$ cm et le plus grand côté de $${T2}$ mesure $${nb(c2[2])}$ cm. Quel est le coefficient $k$ ?`, figure: fig, mode: "nombre", prefixe: "$k =$", attendu: k,
      erreurs: [{ valeur: arr(1 / k, 4), message: "$k = \\dfrac{\\text{côté de " + T2 + "}}{\\text{côté correspondant de " + T1 + "}}$." }, { valeur: arr(c2[2] / base[0], 4), message: "Le plus grand côté de $" + T2 + "$ correspond au plus grand côté de $" + T1 + "$." }, { valeur: arr(c2[2] - base[2], 4), message: "Le coefficient est un quotient, pas une différence." }],
      aides: ["Le plus grand côté de l'un correspond au plus grand côté de l'autre.", `$k = \\dfrac{${nb(c2[2])}}{${base[2]}}$.`, "Calcule le quotient."], solution: `$k = \\dfrac{${nb(c2[2])}}{${base[2]}} = ${nb(k)}$.` };
  };

  GEN["ts3-longueur"] = function () {
    const [T1, T2] = pick(TRI3), base = pick([[3, 4, 5], [4, 5, 6], [5, 6, 8], [6, 8, 9], [5, 7, 9], [6, 7, 10], [4, 6, 7]]), k = pick([1.5, 2, 2.5, 3, 4, 0.5]);
    const c2 = base.map((x) => arr(x * k, 2)), i = rand(0, 2), j = (i + 1 + rand(0, 1)) % 3;
    const n1 = [T1[0] + T1[1], T1[1] + T1[2], T1[0] + T1[2]], n2 = [T2[0] + T2[1], T2[1] + T2[2], T2[0] + T2[2]];
    const L1 = ["", "", ""], L2 = ["", "", ""]; L1[i] = `${base[i]} cm`; L1[j] = `${base[j]} cm`; L2[i] = `${nbTexte(c2[i])} cm`; L2[j] = "?";
    const fig = deuxTri3({ T: [T1, T2], S: [base, c2], L: [L1, L2], rot: [0, pick([0, 180, 20, -20, 160])], flip: [false, Math.random() < 0.5], taille: k >= 1 ? [0.8, 1] : [1, 0.8], aria: `Triangles semblables ${T1} (${decrit3(T1, null, L1)}) et ${T2} (${decrit3(T2, null, L2)})` });
    const dif = arr(base[j] + c2[i] - base[i], 4);
    return { enonce: `Les triangles $${T1}$ et $${T2}$ sont semblables, les sommets $${T1[0]}$, $${T1[1]}$, $${T1[2]}$ correspondant à $${T2[0]}$, $${T2[1]}$, $${T2[2]}$. On a $${n1[i]} = ${base[i]}$ cm, $${n1[j]} = ${base[j]}$ cm et $${n2[i]} = ${nb(c2[i])}$ cm. Calcule $${n2[j]}$.`, figure: fig, mode: "nombre", prefixe: `$${n2[j]} =$`, suffixe: "cm", attendu: c2[j],
      erreurs: [{ valeur: arr((base[j] * base[i]) / c2[i], 4), message: "Le coefficient est $\\dfrac{" + n2[i] + "}{" + n1[i] + "}$ (du premier triangle vers le second)." }, ...(dif > 0 ? [{ valeur: dif, message: "Les longueurs sont proportionnelles : on multiplie par $k$, on n'ajoute pas la même longueur." }] : [])],
      aides: ["Dans des triangles semblables, les longueurs des côtés correspondants sont proportionnelles.", `Coefficient : $k = \\dfrac{${n2[i]}}{${n1[i]}} = \\dfrac{${nb(c2[i])}}{${base[i]}} = ${nb(k)}$.`, `$${n2[j]} = ${nb(k)} \\times ${n1[j]}$.`],
      solution: `$k = \\dfrac{${nb(c2[i])}}{${base[i]}} = ${nb(k)}$, donc $${n2[j]} = ${nb(k)} \\times ${base[j]} = ${nb(c2[j])}$ cm.` };
  };

  GEN["ts3-egaux"] = function () {
    const tirage = Math.random();
    const Q = pick([
      ["Deux triangles qui ont leurs trois côtés deux à deux de même longueur sont :", "égaux (superposables)", ["seulement semblables, sans être égaux", "rectangles", "isocèles"]],
      ["Deux triangles égaux sont toujours :", "semblables", ["rectangles", "isocèles", "équilatéraux"]],
      ["Deux triangles semblables avec un coefficient $k = 1$ sont :", "égaux", ["différents", "isocèles", "rectangles"]],
      ["Deux triangles ont un angle de même mesure compris entre deux côtés deux à deux de même longueur. Ils sont :", "égaux", ["seulement semblables", "rectangles", "on ne peut pas savoir"]],
      ["Deux triangles ont un côté de même longueur compris entre deux angles deux à deux de même mesure. Ils sont :", "égaux", ["seulement semblables", "isocèles", "on ne peut pas savoir"]],
      ["Deux triangles qui ont seulement leurs trois angles deux à deux égaux sont :", "semblables, mais pas forcément égaux", ["toujours égaux", "jamais semblables", "forcément rectangles"]],
      ...[2, 3, 4, 5].map((k) => [`Si un triangle est un agrandissement de rapport $${k}$ d'un autre, ses angles sont :`, "les mêmes", [`multipliés par $${k}$`, `multipliés par $${k * k}$`, `divisés par $${k}$`]]).slice(rand(0, 3)).slice(0, 1),
      ...[2, 3, 4, 5].map((k) => [`Si un triangle est un agrandissement de rapport $${k}$ d'un autre, son aire est multipliée par :`, `$${k * k}$`, [`$${k}$`, `$${k * k * k}$`, `$${2 * k}$`]]).slice(rand(0, 3)).slice(0, 1),
      ["Deux triangles équilatéraux sont toujours :", "semblables", ["égaux", "rectangles", "de même aire"]],
      ["Deux triangles rectangles isocèles sont toujours :", "semblables", ["égaux", "de même périmètre", "équilatéraux"]],
      ["Deux triangles isocèles qui ont le même angle au sommet sont :", "semblables", ["égaux", "rectangles", "jamais semblables"]],
      ["Deux triangles égaux ont toujours :", "la même aire", ["la même orientation", "un sommet commun", "des angles droits"]],
      ["Un triangle et son image par une symétrie axiale sont :", "égaux", ["seulement semblables", "de tailles différentes", "jamais superposables"]]
    ]);
    if (tirage < 0.5) { // cas d'égalité lus sur une figure
      const [T1, T2] = pick(TRI3), cas = rand(0, 3), al = rand(35, 80), be = rand(35, 85), opt = { rot: [0, pick([180, 30, -35, 150, 0])], flip: [false, Math.random() < 0.5] };
      if (al + be > 150 || al === be) return GEN["ts3-egaux"]();
      let S, L = ["", "", ""], A = ["", "", ""], taille = [1, 1], quoi, bonne = "égaux";
      if (cas === 0) { const p = rand(3, 7), q = rand(p + 1, 9), r = rand(q - p + 1, Math.min(p + q - 1, 12)); S = [p, r, q]; L = [`${p} cm`, `${r} cm`, `${q} cm`]; quoi = "les trois côtés deux à deux de même longueur"; }
      else if (cas === 1) { const p = rand(3, 8), q = rand(3, 8); S = [p, Math.sqrt(p * p + q * q - 2 * p * q * Math.cos((al * Math.PI) / 180)), q]; L = [`${p} cm`, "", `${q} cm`]; A = [`${al}°`, "", ""]; quoi = "un angle de même mesure compris entre deux côtés de même longueur"; }
      else if (cas === 2) { const p = rand(4, 9); S = formeAng3(al, be); L = [`${p} cm`, "", ""]; A = [`${al}°`, `${be}°`, ""]; quoi = "un côté de même longueur compris entre deux angles de même mesure"; }
      else { S = formeAng3(al, be); A = [`${al}°`, `${be}°`, `${180 - al - be}°`]; taille = [0.78, 1]; bonne = "semblables, mais pas forcément égaux"; quoi = "seulement leurs trois angles deux à deux de même mesure"; }
      const fig = deuxTri3({ T: [T1, T2], S: [S, S], L: [L, L], A: [A, A], taille, ...opt, aria: `Triangles ${T1} (${decrit3(T1, A, L)}) et ${T2} (${decrit3(T2, A, L)})` });
      const { choix, attendu } = melange(bonne, ["égaux", "semblables, mais pas forcément égaux", "ni égaux ni semblables", "on ne peut rien dire"]);
      return { enonce: `Sur la figure, les triangles $${T1}$ et $${T2}$ ont les mesures indiquées. Que peut-on affirmer ?`, figure: fig, mode: "choix", choix, attendu,
        aides: ["Trois côtés égaux deux à deux : triangles égaux.", "Un angle égal entre deux côtés égaux, ou un côté égal entre deux angles égaux : triangles égaux.", "Seulement les angles égaux : triangles semblables (la taille peut changer)."],
        solution: `Les triangles ont ${quoi} : ils sont ${bonne}.` };
    }
    if (tirage < 0.82) { // aire d'un agrandissement
      const k = pick([2, 3, 1.5, 0.5, 4]), A = rand(2, 30) * 4, r = arr(A * k * k, 2);
      return { enonce: `Un triangle a une aire de $${A}$ cm². On l'agrandit (ou le réduit) en multipliant ses longueurs par $${nb(k)}$. Quelle est l'aire du nouveau triangle ?`, mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: r,
        erreurs: [{ valeur: arr(A * k, 2), message: "Les aires sont multipliées par $k^2$, pas par $k$." }],
        aides: ["Quand les longueurs sont multipliées par $k$, les aires sont multipliées par $k^2$.", `$k^2 = ${nb(arr(k * k, 4))}$.`, `$${A} \\times ${nb(arr(k * k, 4))}$.`], solution: `$${A} \\times ${nb(k)}^2 = ${A} \\times ${nb(arr(k * k, 4))} = ${nb(r)}$ cm².` };
    }
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu, aides: ["Semblables : mêmes angles (et côtés proportionnels).", "Égaux : superposables, mêmes côtés et mêmes angles.", "Des triangles égaux sont semblables avec $k = 1$."], solution: `Réponse : ${Q[1]}.` };
  };

  FIGURES["ts3-cours-angles"] = () => deuxTri3({ T: ["ABC", "DEF"], S: [formeAng3(40, 75), formeAng3(65, 40)], A: [["40°", "75°", ""], ["65°", "40°", ""]], rot: [0, 180], taille: [0.8, 1], aria: "Triangle ABC : angles de 40° en A et 75° en B ; triangle DEF : angles de 65° en D et 40° en E" });
  FIGURES["ts3-cours-cotes"] = () => deuxTri3({ T: ["ABC", "DEF"], S: [[2, 4, 3], [5, 10, 7.5]], L: [["2", "4", "3"], ["5", "10", "7,5"]], rot: [0, 20], taille: [0.45, 1], aria: "Triangle ABC de côtés 2, 4 et 3 ; triangle DEF de côtés 5, 10 et 7,5" });
  FIGURES["ts3-cours-homologues"] = () => deuxTri3({ T: ["ABC", "DEF"], S: [[4, 6, 5], [10, 15, 12.5]], L: [["4", "6", ""], ["10", "?", ""]], taille: [0.45, 1], aria: "Triangles semblables ABC et DEF : AB = 4, BC = 6, DE = 10, EF inconnu" });
  FIGURES["ts3-cours-egaux"] = () => deuxTri3({ T: ["ABC", "DEF"], S: [[5, Math.sqrt(41 - 40 * Math.cos((50 * Math.PI) / 180)), 4], [5, Math.sqrt(41 - 40 * Math.cos((50 * Math.PI) / 180)), 4]], L: [["5 cm", "", "4 cm"], ["5 cm", "", "4 cm"]], A: [["50°", "", ""], ["50°", "", ""]], rot: [0, 160], flip: [false, true], aria: "Triangles ABC et DEF : AB = DE = 5 cm, AC = DF = 4 cm, angle de 50° en A et en D" });
  FIGURES["ts3-qcm-angles"] =() => deuxTri3({ T: ["IJK", "LMN"], S: [formeAng3(50, 60), formeAng3(70, 50)], A: [["50°", "60°", ""], ["70°", "50°", ""]], rot: [0, 25], flip: [false, true], taille: [1, 0.7], aria: "Triangle IJK : angles de 50° en I et 60° en J ; triangle LMN : angles de 70° en L et 50° en M" });
  FIGURES["ts3-qcm-k"] = () => deuxTri3({ T: ["ABC", "DEF"], S: [[4, 7, 6], [6, 10.5, 9]], L: [["4", "7", "6"], ["6", "10,5", "9"]], rot: [0, 180], taille: [0.67, 1], aria: "Triangle ABC de côtés 4, 7 et 6 ; triangle DEF de côtés 6, 10,5 et 9" });
  FIGURES["ts3-qcm-homol"] = () => deuxTri3({ T: ["ABC", "EFD"], S: [formeAng3(30, 80), formeAng3(30, 80)], A: [["30°", "80°", ""], ["30°", "80°", ""]], rot: [0, 170], flip: [false, true], taille: [0.75, 1], aria: "Triangle ABC : angles de 30° en A et 80° en B ; triangle DEF : angles de 30° en E et 80° en F" });
  FIGURES["ts3-qcm-longueur"] = () => deuxTri3({ T: ["ABC", "DEF"], S: [[4, 6, 5], [6, 9, 7.5]], L: [["4 cm", "6 cm", ""], ["6 cm", "?", ""]], rot: [0, 180], flip: [false, true], taille: [0.67, 1], aria: "Triangles semblables ABC et DEF (A, B, C correspondent à D, E, F) : AB = 4 cm, BC = 6 cm, DE = 6 cm, EF inconnu" });
  FIGURES["ts3-qcm-ccc"] = () => deuxTri3({ T: ["RST", "UVW"], S: [[5, 7, 6], [5, 7, 6]], L: [["5 cm", "7 cm", "6 cm"], ["5 cm", "7 cm", "6 cm"]], rot: [0, 200], flip: [false, true], aria: "Triangles RST et UVW de côtés 5 cm, 7 cm et 6 cm chacun" });
  FIGURES["ts3-qcm-aaa"] = () => deuxTri3({ T: ["RST", "UVW"], S: [formeAng3(45, 75), formeAng3(45, 75)], A: [["45°", "75°", ""], ["45°", "75°", "60°"]], rot: [0, 15], taille: [0.78, 1], aria: "Triangles RST et UVW d'angles 45°, 75° et 60°, de tailles différentes" });

  /* =====================================================================
     Chapitre 13 : trigonométrie (tg3-) — cosinus, sinus, tangente
     ===================================================================== */
  const NOMS_TG = [["A", "B", "C"], ["E", "F", "G"], ["R", "S", "T"], ["K", "L", "M"], ["H", "I", "J"]];
  // Triangle rectangle en R ; angle marqué en P1 ; labs = [R P1 (adjacent), R P2 (opposé), P1 P2 (hypoténuse), angle]
  // o : 0 à 3 (symétries de la figure : angle droit en bas à gauche, en bas à droite, en haut à gauche, en haut à droite)
  function figTrig3(N, labs, o) {
    o = o == null ? rand(0, 3) : o; const [R, P1, P2] = N, T = (p) => [o & 1 ? 320 - p[0] : p[0], o & 2 ? 204 - p[1] : p[1]], pR = T([72, 172]), p1 = T([248, 172]), p2 = T([72, 32]), G = [(pR[0] + p1[0] + p2[0]) / 3, (pR[1] + p1[1] + p2[1]) / 3];
    let c = `<polygon class="g-poly" points="${pl3([pR, p1, p2])}"/>` + droit3(pR, p1, p2, 10);
    if (labs[3]) c += arc3(p1, pR, p2, 30) + angLab3(p1, pR, p2, labs[3]);
    [[pR, p1, labs[0]], [pR, p2, labs[1]], [p1, p2, labs[2]]].forEach(([P, Q, t]) => { if (t) c += labSeg3(P, Q, G, 7, t); });
    c += pt3(pR, R, G, 9) + pt3(p1, P1, G, 9) + pt3(p2, P2, G, 9);
    const L = [[R + P1, labs[0]], [R + P2, labs[1]], [P1 + P2, labs[2]]].filter((x) => x[1]).map((x) => `${x[0]} = ${x[1]}`);
    return sv3(320, 204, `Triangle ${R}${P1}${P2} rectangle en ${R}, angle marqué en ${P1}${labs[3] && labs[3].trim() ? ` (${labs[3]})` : ""}${L.length ? ` ; ${L.join(", ")}` : ""}`, c);
  }
  // Problèmes concrets : échelle contre un mur, arbre (angle d'élévation), rampe, câble tendu
  function scene3(type, v) {
    const g = 176; let c = ln3(12, g, 308, g, "g-droite"), aria;
    if (type === "echelle" || type === "cable") {
      const a = Math.min(v.a, 62) * RAD, F = [250 - 150 * Math.cos(a), g], H = [250, g - 150 * Math.sin(a)];
      c += `<line class="g-segment" style="stroke-width:${type === "cable" ? 5 : 6}" x1="250" y1="${g}" x2="250" y2="${type === "cable" ? r3(H[1] - 12) : 20}"/>` + `<line class="g-segment" style="stroke-width:${type === "cable" ? 1.5 : 3}" x1="${r3(F[0])}" y1="${g}" x2="${r3(H[0])}" y2="${r3(H[1])}"/>`;
      c += droit3([250, g], F, H, 10) + arc3(F, [300, g], H, 26) + tx3(F[0] + 42 * Math.cos(a / 2), g - 42 * Math.sin(a / 2) + 4, v.labA, "g-mesure", "middle") + labSeg3(F, H, [250, g], 8, v.labL) + tx3(258, (g + H[1]) / 2 + 4, v.labH, "g-mesure", "start") + tk3(258, g + 13, type === "cable" ? v.nom : "mur", "start");
      if (v.labD) c += cote3(F, [250, g], 14, v.labD);
      aria = type === "cable" ? `Câble tendu de ${v.labL} entre le haut d'un pylône et le sol, à ${v.labD} du pied ; angle avec le sol : ${v.labA}` : `Échelle de ${v.labL} contre un mur vertical, angle de ${v.labA} avec le sol ; hauteur ${v.labH}`;
    } else if (type === "arbre") {
      const s = Math.min(220 / v.d, 140 / v.H), O = [40, g], B = [40 + v.d * s, g], Tp = [B[0], g - v.H * s];
      c += `<line class="g-segment" style="stroke-width:5" x1="${r3(B[0])}" y1="${g}" x2="${r3(Tp[0])}" y2="${r3(Tp[1])}"/><circle class="g-poly" cx="${r3(Tp[0])}" cy="${r3(Tp[1])}" r="12"/>` + ln3(O[0], O[1], Tp[0], Tp[1], "g-guide");
      c += droit3(B, O, Tp, 10) + arc3(O, B, Tp, 30) + angLab3(O, B, Tp, v.labA) + cote3(O, B, 14, v.labD) + tx3(B[0] - 8, (g + Tp[1]) / 2 + 4, v.labH, "g-mesure", "end") + pt3(O, "", O) + tk3(O[0], g - 10, "œil", "middle");
      aria = `Arbre vu à ${v.labD} de son pied sous un angle de ${v.labA} ; hauteur ${v.labH}`;
    } else {
      const s = 230 / v.l, h = Math.max(v.h * s, 26), A = [40, g], B = [270, g], C = [270, g - h];
      c += `<polygon class="g-aire" points="${pl3([A, B, C])}"/>` + ln3(A[0], A[1], C[0], C[1], "g-segment") + droit3(B, A, C, 9) + arc3(A, B, C, 44) + tx3(92, g - 6, v.labA, "g-mesure", "start") + cote3(A, B, 14, v.labD) + tx3(278, g - h / 2 + 4, v.labH, "g-mesure", "start");
      aria = `Rampe qui monte de ${v.labH} sur ${v.labD} à l'horizontale (figure non à l'échelle) ; angle ${v.labA}`;
    }
    return sv3(320, 216, aria, c);
  }
  const decS = (x) => String(x).replace(".", ","), RAD = Math.PI / 180, TRIG = { cos: Math.cos, sin: Math.sin, tan: Math.tan };
  const degTex = (a) => `${a}^\\circ`;

  GEN["tg3-formule"] = function () {
    const N = shuffle(pick(NOMS_TG).slice()), [R, P1, P2] = N, f = pick(["cos", "sin", "tan"]);
    const adj = `${R}${P1}`, opp = `${R}${P2}`, hyp = `${P1}${P2}`;
    const exprs = { cos: `\\dfrac{${adj}}{${hyp}}`, sin: `\\dfrac{${opp}}{${hyp}}`, tan: `\\dfrac{${opp}}{${adj}}` };
    const u = Math.random();
    if (u < 0.35) { // valeur d'un rapport à partir des longueurs (triangle pythagoricien)
      const [p, q, h] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20], [20, 21, 29]]), sw = Math.random() < 0.5, A = sw ? q : p, O = sw ? p : q;
      const v = { cos: A / h, sin: O / h, tan: O / A }[f], [n, d] = { cos: [A, h], sin: [O, h], tan: [O, A] }[f];
      return { enonce: `$${R}${P1}${P2}$ est rectangle en $${R}$ avec $${adj} = ${A}$ cm, $${opp} = ${O}$ cm et $${hyp} = ${h}$ cm. Calcule $\\${f} \\widehat{${R}${P1}${P2}}$.${CONSIGNE_FR}`, figure: figTrig3(N, [`${A} cm`, `${O} cm`, `${h} cm`, ""]), mode: "nombre", prefixe: `$\\${f} \\widehat{${R}${P1}${P2}} =$`, attendu: v,
        erreurs: [{ valeur: d / n, message: "C'est l'inverse : vérifie quel côté va au numérateur." }, ...approx(v)],
        aides: ["SOH CAH TOA.", `$\\${f} \\widehat{${R}${P1}${P2}} = ${exprs[f]}$.`, `$= \\dfrac{${n}}{${d}}$ ; simplifie.`],
        solution: `$\\${f} \\widehat{${R}${P1}${P2}} = ${exprs[f]} = \\dfrac{${n}}{${d}} = ${frS(n, d)}$.` };
    }
    if (u < 0.7) {
      const bonne = `$${exprs[f]}$`, faux = uniq3(bonne, [`$${exprs.cos}$`, `$${exprs.sin}$`, `$${exprs.tan}$`, `$\\dfrac{${hyp}}{${adj}}$`, `$\\dfrac{${adj}}{${opp}}$`]);
      const { choix, attendu } = melange(bonne, faux);
      return { enonce: `Le triangle $${R}${P1}${P2}$ est rectangle en $${R}$. Quelle est l'expression de $\\${f} \\widehat{${R}${P1}${P2}}$ ?`, figure: figTrig3(N, ["", "", "", ""]), mode: "choix", choix, attendu,
        aides: ["« SOH CAH TOA » : Sinus = Opposé / Hypoténuse, Cosinus = Adjacent / Hypoténuse, Tangente = Opposé / Adjacent.", `L'hypoténuse est $[${hyp}]$, en face de l'angle droit.`, `Pour l'angle en $${P1}$ : côté adjacent $[${adj}]$, côté opposé $[${opp}]$.`],
        solution: `$\\${f} \\widehat{${R}${P1}${P2}} = ${exprs[f]}$.` };
    }
    const q = pick([["opposé", opp], ["adjacent", adj]]);
    const bonne = `$[${q[1]}]$`, faux = [`$[${opp}]$`, `$[${adj}]$`, `$[${hyp}]$`].filter((z) => z !== bonne);
    const { choix, attendu } = melange(bonne, [...faux, "aucun : il n'y en a pas pour un angle aigu"]);
    return { enonce: `Dans le triangle $${R}${P1}${P2}$ rectangle en $${R}$, quel est le côté ${q[0]} à l'angle $\\widehat{${R}${P1}${P2}}$ ?`, figure: figTrig3(N, ["", "", "", ""]), mode: "choix", choix, attendu,
      aides: ["L'hypoténuse est le côté en face de l'angle droit.", `Le côté adjacent touche l'angle en $${P1}$ (sans être l'hypoténuse).`, `Le côté opposé est en face de l'angle en $${P1}$.`],
      solution: `Pour l'angle en $${P1}$, le côté ${q[0]} est $[${q[1]}]$.` };
  };

  GEN["tg3-longueur"] = function () {
    const N = shuffle(pick(NOMS_TG).slice()), [R, P1, P2] = N, a = rand(15, 75), cas = rand(0, 5), L = rand(20, 150) / 10;
    const adj = `${R}${P1}`, opp = `${R}${P2}`, hyp = `${P1}${P2}`;
    // [fonction, côté connu, côté cherché, valeur]
    const C = [["cos", hyp, adj, L * Math.cos(a * RAD)], ["cos", adj, hyp, L / Math.cos(a * RAD)], ["sin", hyp, opp, L * Math.sin(a * RAD)], ["sin", opp, hyp, L / Math.sin(a * RAD)], ["tan", adj, opp, L * Math.tan(a * RAD)], ["tan", opp, adj, L / Math.tan(a * RAD)]][cas];
    const [f, connu, cherche, v] = C, r = arr(v, 1);
    const formule = { cos: `\\dfrac{${adj}}{${hyp}}`, sin: `\\dfrac{${opp}}{${hyp}}`, tan: `\\dfrac{${opp}}{${adj}}` }[f];
    const multiplie = (f === "cos" && cherche === adj) || (f === "sin" && cherche === opp) || (f === "tan" && cherche === opp);
    const labs = [connu === adj ? `${decS(L)} cm` : cherche === adj ? "?" : "", connu === opp ? `${decS(L)} cm` : cherche === opp ? "?" : "", connu === hyp ? `${decS(L)} cm` : cherche === hyp ? "?" : "", `${a}°`];
    const faux = multiplie ? L / TRIG[f](a * RAD) : L * TRIG[f](a * RAD);
    return { enonce: `$${R}${P1}${P2}$ est rectangle en $${R}$, $\\widehat{${R}${P1}${P2}} = ${degTex(a)}$ et $${connu} = ${nb(L)}$ cm. Calcule $${cherche}$, arrondi au dixième.`, figure: figTrig3(N, labs), mode: "nombre", prefixe: `$${cherche} \\approx$`, suffixe: "cm", attendu: r,
      erreurs: [{ valeur: arr(faux, 1), message: "Vérifie le produit en croix : multiplier ou diviser par le " + f + " ?" }, ...(arr(v, 1) !== Math.trunc(v * 10) / 10 ? [{ valeur: Math.trunc(v * 10) / 10, message: "Arrondis au dixième le plus proche (ne tronque pas)." }] : [])],
      aides: [`On connaît l'angle, $[${connu}]$ et on cherche $[${cherche}]$ : on utilise le ${f === "cos" ? "cosinus" : f === "sin" ? "sinus" : "tangente"}.`, `$\\${f} \\widehat{${R}${P1}${P2}} = ${formule}$, soit $\\${f}(${degTex(a)}) = ${formule.replace(connu, nb(L))}$.`, multiplie ? `$${cherche} = ${nb(L)} \\times \\${f}(${degTex(a)})$.` : `$${cherche} = \\dfrac{${nb(L)}}{\\${f}(${degTex(a)})}$.`],
      solution: `$${cherche} = ${multiplie ? `${nb(L)} \\times \\${f}(${degTex(a)})` : `\\dfrac{${nb(L)}}{\\${f}(${degTex(a)})}`} \\approx ${nb(r)}$ cm.` };
  };

  GEN["tg3-angle"] = function () {
    const N = shuffle(pick(NOMS_TG).slice()), [R, P1, P2] = N, f = pick(["cos", "sin", "tan"]);
    const adj = `${R}${P1}`, opp = `${R}${P2}`, hyp = `${P1}${P2}`;
    let x, y; do { x = rand(20, 120) / 10; y = rand(20, 150) / 10; } while (f !== "tan" && y <= x + 0.5);
    const [num, den, nn, nd] = { cos: [x, y, adj, hyp], sin: [x, y, opp, hyp], tan: [x, y, opp, adj] }[f];
    const ang = { cos: Math.acos, sin: Math.asin, tan: Math.atan }[f](num / den) / RAD, r = Math.round(ang);
    const labs = [nn === adj ? `${decS(num)} cm` : nd === adj ? `${decS(den)} cm` : "", nn === opp ? `${decS(num)} cm` : "", nd === hyp ? `${decS(den)} cm` : "", "?"];
    const autre = Math.round(90 - ang);
    return { enonce: `$${R}${P1}${P2}$ est rectangle en $${R}$ avec $${nn} = ${nb(num)}$ cm et $${nd} = ${nb(den)}$ cm. Calcule $\\widehat{${R}${P1}${P2}}$, arrondi au degré.`, figure: figTrig3(N, labs), mode: "nombre", prefixe: `$\\widehat{${R}${P1}${P2}} \\approx$`, suffixe: "°", attendu: r,
      erreurs: [{ valeur: autre, message: `Ça, c'est l'autre angle aigu, en $${P2}$.` }, { valeur: arr(num / den, 2), message: `C'est la valeur ${f === "tan" ? "de la tangente" : f === "cos" ? "du cosinus" : "du sinus"}, pas l'angle : utilise la touche ${f}⁻¹.` }, ...(f !== "tan" ? [{ valeur: Math.round(Math.atan(num / den) / RAD), message: "Le côté au dénominateur est l'hypoténuse : ce n'est pas la tangente." }] : [])],
      aides: [`$[${nn}]$ et $[${nd}]$ sont ${f === "cos" ? "l'adjacent et l'hypoténuse : cosinus" : f === "sin" ? "l'opposé et l'hypoténuse : sinus" : "l'opposé et l'adjacent : tangente"}.`, `$\\${f} \\widehat{${R}${P1}${P2}} = \\dfrac{${nb(num)}}{${nb(den)}}$.`, `À la calculatrice : $\\text{${f === "cos" ? "arccos" : f === "sin" ? "arcsin" : "arctan"}}\\left(\\dfrac{${nb(num)}}{${nb(den)}}\\right)$ (touche ${f}⁻¹).`],
      solution: `$\\${f} \\widehat{${R}${P1}${P2}} = \\dfrac{${nb(num)}}{${nb(den)}}$, donc $\\widehat{${R}${P1}${P2}} \\approx ${nb(arr(ang, 2))}^\\circ$, soit $${r}^\\circ$ arrondi au degré.` };
  };

  GEN["tg3-problemes"] = function () {
    const t = rand(0, 3);
    if (t === 3) { // câble tendu : angle avec le sol (cosinus)
      const L = rand(12, 60), d = rand(Math.ceil(L * 0.3), Math.floor(L * 0.85)), a = Math.round(Math.acos(d / L) / RAD), [lieu, nom] = pick([["d'un pylône électrique à Kawéni", "pylône"], ["du poteau d'une tyrolienne à Combani", "poteau"], ["d'une antenne à Chirongui", "antenne"], ["du mât d'un bateau à Dzaoudzi", "mât"]]);
      return { enonce: `Un câble tendu de $${L}$ m relie le sommet ${lieu} à un point du sol situé à $${d}$ m du pied (le support est vertical, le sol horizontal). Quel angle le câble fait-il avec le sol, arrondi au degré ?`, figure: scene3("cable", { a: Math.acos(d / L) / RAD, labL: `${L} m`, labD: `${d} m`, labA: "?", labH: "", nom }), mode: "nombre", prefixe: "Angle :", suffixe: "°", attendu: a,
        erreurs: [{ valeur: Math.round(Math.asin(d / L) / RAD), message: "La distance au sol est le côté adjacent à l'angle : c'est le cosinus." }, { valeur: arr(d / L, 2), message: "C'est la valeur du cosinus : utilise la touche cos⁻¹ pour obtenir l'angle." }],
        aides: ["Le câble est l'hypoténuse ; la distance au sol est le côté adjacent à l'angle cherché.", `$\\cos \\alpha = \\dfrac{${d}}{${L}}$.`, "Utilise la touche cos⁻¹ de la calculatrice."], solution: `$\\cos \\alpha = \\dfrac{${d}}{${L}}$, donc $\\alpha \\approx ${nb(arr(Math.acos(d / L) / RAD, 2))}^\\circ$, soit $${a}^\\circ$ arrondi au degré.` };
    }
    if (t === 0) { const L = rand(30, 80) / 10, a = rand(60, 80), h = arr(L * Math.sin(a * RAD), 2), r = arr(h, 1);
      return { enonce: `Une échelle de $${nb(L)}$ m est appuyée contre un mur vertical. Elle fait un angle de $${degTex(a)}$ avec le sol horizontal. À quelle hauteur touche-t-elle le mur ? (Arrondi au dixième.)`, figure: scene3("echelle", { a, labL: `${nbTexte(L)} m`, labA: `${a}°`, labH: "h ?" }), mode: "nombre", prefixe: "Hauteur :", suffixe: "m", attendu: r,
        erreurs: [{ valeur: arr(L * Math.cos(a * RAD), 1), message: "La hauteur est le côté opposé à l'angle au sol : c'est le sinus." }, { valeur: arr(L / Math.sin(a * RAD), 1), message: "L'échelle est l'hypoténuse : on multiplie sa longueur par le sinus, on ne divise pas." }],
        aides: ["L'échelle est l'hypoténuse ; la hauteur sur le mur est opposée à l'angle avec le sol.", `$\\sin(${degTex(a)}) = \\dfrac{h}{${nb(L)}}$.`, `$h = ${nb(L)} \\times \\sin(${degTex(a)})$.`], solution: `$h = ${nb(L)} \\times \\sin(${degTex(a)}) \\approx ${nb(r)}$ m.` }; }
    if (t === 1) { const d = rand(10, 50), a = rand(20, 60), H = arr(d * Math.tan(a * RAD), 1), arbre = pick(["d'un baobab", "d'un manguier", "d'un cocotier", "d'un fromager"]);
      return { enonce: `À $${d}$ m du pied ${arbre}, on voit son sommet sous un angle de $${degTex(a)}$ par rapport à l'horizontale (on néglige la taille de l'observateur). Quelle est la hauteur de l'arbre ? (Arrondi au dixième.)`, figure: scene3("arbre", { d, H: d * Math.tan(a * RAD), labD: `${d} m`, labA: `${a}°`, labH: "?" }), mode: "nombre", prefixe: "Hauteur :", suffixe: "m", attendu: H,
        erreurs: [{ valeur: arr(d * Math.sin(a * RAD), 1), message: "On connaît le côté adjacent ($" + d + "$ m) : c'est la tangente." }, { valeur: arr(d / Math.tan(a * RAD), 1), message: "$\\tan = \\dfrac{\\text{opposé}}{\\text{adjacent}}$ : la hauteur vaut $" + d + " \\times \\tan$, on ne divise pas." }],
        aides: ["Le triangle est rectangle au pied de l'arbre.", `Côté adjacent : $${d}$ m ; côté opposé : la hauteur. $\\tan(${degTex(a)}) = \\dfrac{h}{${d}}$.`, `$h = ${d} \\times \\tan(${degTex(a)})$.`], solution: `$h = ${d} \\times \\tan(${degTex(a)}) \\approx ${nb(H)}$ m.` }; }
    const l = rand(20, 120) / 10, h = rand(3, 15) / 10, a = Math.round(Math.atan(h / l) / RAD);
    if (a < 2) return GEN["tg3-problemes"]();
    return { enonce: `Une rampe monte de $${nb(h)}$ m sur une distance horizontale de $${nb(l)}$ m. Quel angle fait-elle avec l'horizontale, arrondi au degré ?`, figure: scene3("rampe", { l, h, labD: `${nbTexte(l)} m`, labH: `${nbTexte(h)} m`, labA: "?" }), mode: "nombre", prefixe: "Angle :", suffixe: "°", attendu: a,
      erreurs: [{ valeur: Math.round(Math.asin(Math.min(1, h / l)) / RAD), message: "La distance horizontale est le côté adjacent, pas l'hypoténuse : c'est la tangente." }, { valeur: Math.round(Math.atan(l / h) / RAD), message: "C'est l'autre angle aigu : $\\tan \\alpha = \\dfrac{\\text{hauteur}}{\\text{distance horizontale}}$." }],
      aides: ["Hauteur : côté opposé ; distance horizontale : côté adjacent.", `$\\tan \\alpha = \\dfrac{${nb(h)}}{${nb(l)}}$.`, "Utilise la touche tan⁻¹ de la calculatrice."], solution: `$\\tan \\alpha = \\dfrac{${nb(h)}}{${nb(l)}}$, donc $\\alpha \\approx ${a}^\\circ$.` };
  };

  FIGURES["tg3-cours-formules"] = () => figTrig3(["A", "B", "C"], ["adjacent", "opposé", "hypoténuse", "α"], 0);
  FIGURES["tg3-cours-longueur"] = () => figTrig3(["A", "B", "C"], ["?", "", "8 cm", "35°"], 1);
  FIGURES["tg3-cours-angle"] = () => figTrig3(["A", "B", "C"], ["7 cm", "4 cm", "", "α ?"], 0);
  FIGURES["tg3-cours-redaction"] = () => figTrig3(["A", "B", "C"], ["", "?", "9 cm", "25°"], 2);
  FIGURES["tg3-qcm-noms"] = () => figTrig3(["E", "F", "G"], ["", "", "", " "], 3);
  FIGURES["tg3-qcm-calc"] = () => figTrig3(["R", "S", "T"], ["", "?", "12 cm", "30°"], 1);
  FIGURES["tg3-qcm-angle"] = () => figTrig3(["K", "L", "M"], ["5 cm", "", "10 cm", "?"], 2);
  FIGURES["tg3-qcm-echelle"] = () => scene3("echelle", { a: 60, labL: "4 m", labA: "60°", labH: "h ?" });
  FIGURES["tg3-qcm-arbre"] = () => scene3("arbre", { d: 20, H: 20 * Math.tan(40 * RAD), labD: "20 m", labA: "40°", labH: "?" });

  /* =====================================================================
     Chapitre 14 : transformations (tf3-) — translation, rotation, homothétie
     ===================================================================== */
  const pt = (x, y) => `(${rel(x)} ; ${rel(y)})`;
  const choixPts = (bonne, L) => melange(`$${bonne}$`, uniq3(`$${bonne}$`, L.map((z) => `$${z}$`)));
  const tN3 = (v) => (v < 0 ? "−" : "") + nbTexte(Math.abs(v));
  // Repère quadrillé carré [-n ; n]² : polys [{ P, cl, lab: [x, y, texte] }], points [[x, y, nom, dx, dy]], fleches [[x1, y1, x2, y2]], arcs [[cx, cy, r, a1, a2]] (degrés, flèche au bout)
  function grilleTf3(o) {
    const n = o.n || 7, u = Math.min(22, 292 / (2 * n)), m = 14, W = Math.round(2 * m + 2 * n * u), X = (x) => m + (x + n) * u, Y = (y) => m + (n - y) * u, pas = n > 5 ? 2 : 1;
    let c = `<g class="g-grid">`; for (let i = -n; i <= n; i++) c += ln3(X(i), Y(n), X(i), Y(-n), "") + ln3(X(-n), Y(i), X(n), Y(i), "");
    c += `</g><g class="g-axis">` + ln3(X(-n), Y(0), X(n), Y(0), "") + ln3(X(0), Y(-n), X(0), Y(n), "") + `</g>`;
    const libre = (x, y) => !(o.polys || []).some((p) => p.lab && Math.abs(p.lab[0] - x) < 1 && Math.abs(p.lab[1] - y) < 0.9) && !(o.points || []).some((p) => Math.abs(p[0] - x) < 0.8 && Math.abs(p[1] - y) < 0.8 && (p[0] || p[1])); // pas de graduation sous une étiquette
    for (let i = -n + 1; i < n; i++) if (i && i % pas === 0) c += (libre(i, -0.55) ? tk3(X(i), Y(0) + 11, tN3(i), "middle") : "") + (libre(-0.5, i) ? tk3(X(0) - 3, Y(i) + 4, tN3(i), "end") : "");
    (o.polys || []).forEach(({ P, cl, lab }) => { c += `<polygon class="${cl || "g-poly"}" points="${pl3(P.map(([x, y]) => [X(x), Y(y)]))}"/>`; if (lab) c += tx3(X(lab[0]), Y(lab[1]) + 4, lab[2], "g-plabel", "middle"); });
    (o.fleches || []).forEach(([x1, y1, x2, y2]) => { c += fl3([X(x1), Y(y1)], [X(x2), Y(y2)]); });
    (o.arcs || []).forEach(([cx, cy, r, a1, a2]) => { const p = (a, R) => [X(cx + R * Math.cos(a * RAD)), Y(cy + R * Math.sin(a * RAD))]; c += flc3(p(a1, r), p((a1 + a2) / 2, r / Math.cos(((a2 - a1) / 2) * RAD)), p(a2, r)); });
    (o.points || []).forEach(([x, y, nom, dx, dy]) => { c += `<circle class="g-point" cx="${r3(X(x))}" cy="${r3(Y(y))}" r="3"/>` + (nom ? tx3(X(x) + (dx == null ? 5 : dx), Y(y) + (dy == null ? -5 : dy), nom, "g-plabel", dx < 0 ? "end" : null) : ""); });
    return sv3(W, W, o.aria, c);
  }
  // Homothétie de centre O (origine) et de rapport k appliquée à un triangle ABC ; o : { L, Li (textes de [AB] et [A'B']), ang (angle en A et A') }
  function homTri3(k, o) {
    o = o || {}; const T = [[1.5, 0.9], [2.6, 0.4], [2.1, 1.8]], I = T.map(([x, y]) => [k * x, k * y]), all = [[0, 0], ...T, ...I];
    const xs = all.map((p) => p[0]), ys = all.map((p) => p[1]), s = Math.min(270 / (Math.max(...xs) - Math.min(...xs)), 150 / (Math.max(...ys) - Math.min(...ys)));
    const cx = (Math.max(...xs) + Math.min(...xs)) / 2, cy = (Math.max(...ys) + Math.min(...ys)) / 2, P = ([x, y]) => [160 + (x - cx) * s, 98 - (y - cy) * s], O = P([0, 0]), Tp = T.map(P), Ip = I.map(P);
    let c = ""; [0, 1, 2].forEach((i) => { const D = k < 0 ? Ip[i] : O, E = k < 0 || Math.abs(k) < 1 ? Tp[i] : Ip[i]; c += ln3(D[0], D[1], E[0], E[1], "g-guide"); });
    const GT = [(Tp[0][0] + Tp[1][0] + Tp[2][0]) / 3, (Tp[0][1] + Tp[1][1] + Tp[2][1]) / 3], GI = [(Ip[0][0] + Ip[1][0] + Ip[2][0]) / 3, (Ip[0][1] + Ip[1][1] + Ip[2][1]) / 3];
    c += `<polygon class="g-poly" points="${pl3(Tp)}"/><polygon class="g-poly-image" points="${pl3(Ip)}"/>`;
    if (o.ang) c += arc3(Tp[0], Tp[1], Tp[2], 13) + arc3(Ip[0], Ip[1], Ip[2], 13) + angLab3(Tp[0], Tp[1], Tp[2], o.ang) + angLab3(Ip[0], Ip[1], Ip[2], o.angI || o.ang);
    if (o.L) c += labSeg3(Tp[0], Tp[1], GT, 6, o.L); if (o.Li) c += labSeg3(Ip[0], Ip[1], GI, 6, o.Li);
    ["A", "B", "C"].forEach((nm, i) => { c += pt3(Tp[i], nm, GT, 8) + pt3(Ip[i], nm + "'", GI, 8); });
    c += pt3(O, "O", [O[0] + (k > 0 ? 10 : 0), O[1] - (k > 0 ? 0 : 10)], 9);
    return sv3(320, 196, o.aria || `Triangle ABC et son image A'B'C' par l'homothétie de centre O et de rapport ${tN3(k)}`, c);
  }
  // Figure « drapeau » et son image : type 0 translation, 1 quart de tour direct, 2 quart de tour indirect, 3 symétrie de centre O, 4 homothétie de rapport 2, 5 symétrie d'axe (Oy)
  const DRAPEAU3 = [[0, 0], [0, 3], [2, 3], [2, 2], [1, 2], [1, 0]];
  const imgTf3 = (t, [x, y], v) => [[x + v[0], y + v[1]], [-y, x], [y, -x], [-x, -y], [2 * x, 2 * y], [-x, y]][t];
  const NOMS_TF3 = ["une translation", "la rotation de centre $O$ et d'angle $90^\\circ$ dans le sens inverse des aiguilles d'une montre", "la rotation de centre $O$ et d'angle $90^\\circ$ dans le sens des aiguilles d'une montre", "la symétrie de centre $O$", "l'homothétie de centre $O$ et de rapport $2$", "la symétrie d'axe l'axe des ordonnées"];
  function recoTf3(t, a, b, v) {
    const F = DRAPEAU3.map(([x, y]) => [x + a, y + b]), I = F.map((p) => imgTf3(t, p, v || [0, 0])), G = (P) => [P.reduce((s, p) => s + p[0], 0) / P.length, P.reduce((s, p) => s + p[1], 0) / P.length];
    const gF = G(F), gI = G(I);
    return grilleTf3({ n: 8, polys: [{ P: F, lab: [gF[0] - 0.1, gF[1] + 0.7, "1"] }, { P: I, cl: "g-poly-image", lab: [gI[0], gI[1], "2"] }], points: [[0, 0, "O", -5, 13]], aria: `Repère quadrillé : figure 1 (drapeau) et figure 2, son image par une transformation à trouver` });
  }

  GEN["tf3-rotation"] = function () {
    const x = nz(1, 6, true), y = nz(1, 6, true), t = rand(0, 2);
    if (x === y || x === -y) return GEN["tf3-rotation"]();
    const L = [[-y, x], [y, -x], [-x, -y], [x, -y], [-x, y], [y, x]];
    const [img, txt] = [[[-y, x], "de $90^\\circ$ dans le sens inverse des aiguilles d'une montre"], [[y, -x], "de $90^\\circ$ dans le sens des aiguilles d'une montre"], [[-x, -y], "de $180^\\circ$"]][t];
    const { choix, attendu } = choixPts(pt(...img), L.map((p) => pt(...p)));
    const a0 = (Math.atan2(y, x) / RAD + 360) % 360, fig = grilleTf3({ points: [[0, 0, "O", -5, 13], [x, y, "A"]], arcs: t === 2 ? [] : [t === 0 ? [0, 0, 1.8, a0 + 15, a0 + 85] : [0, 0, 1.8, a0 - 15, a0 - 85]], segs: [], aria: `Repère quadrillé avec le point A${pt(x, y).replace(/ ; /, " ; ")}${t === 2 ? "" : ", une flèche indique le sens de rotation autour de O"}` });
    return { enonce: `Dans un repère d'origine $O$, on applique au point $A${pt(x, y)}$ la rotation de centre $O$ ${txt}. Quelles sont les coordonnées de l'image $A'$ ?`, figure: fig, mode: "choix", choix, attendu,
      aides: ["Une rotation conserve les distances au centre : $OA' = OA$.", t === 2 ? "La rotation de $180^\\circ$ est la symétrie de centre $O$ : on change les signes des deux coordonnées." : "Dessine un quadrillage : un quart de tour échange les rôles des coordonnées.", t === 0 ? "Quart de tour direct : $(x ; y)$ devient $(-y ; x)$." : t === 1 ? "Quart de tour indirect : $(x ; y)$ devient $(y ; -x)$." : "$(x ; y)$ devient $(-x ; -y)$."],
      solution: `L'image de $A${pt(x, y)}$ est $A'${pt(...img)}$.` };
  };

  GEN["tf3-homothetie"] = function () {
    const k = pick([2, 3, -1, -2, 0.5, -0.5, 1.5]), t = rand(0, 1);
    if (t === 0) {
      let x, y; do { x = nz(1, 6, true); y = nz(1, 6, true); } while (!Number.isInteger(k * x) || !Number.isInteger(k * y));
      const img = [k * x, k * y], { choix, attendu } = choixPts(pt(...img), [pt(-k * x, -k * y), pt(x + k, y + k), pt(k * x, y), pt(x / k, y / k), pt(k * y, k * x)].filter((z) => !z.includes("NaN")));
      return { enonce: `Dans un repère d'origine $O$, quelles sont les coordonnées de l'image du point $A${pt(x, y)}$ par l'homothétie de centre $O$ et de rapport $${nb(k)}$ ?`, figure: grilleTf3({ points: [[0, 0, "O", -5, 13], [x, y, "A"]], aria: `Repère quadrillé d'origine O avec le point A${pt(x, y)}` }), mode: "choix", choix, attendu,
        aides: ["L'homothétie de centre $O$ et de rapport $k$ envoie $A$ sur $A'$ tel que $\\overrightarrow{OA'} = k\\,\\overrightarrow{OA}$.", "Avec le centre à l'origine, on multiplie chaque coordonnée par $k$.", k < 0 ? "$k$ est négatif : $A'$ est de l'autre côté de $O$." : `$A'$ est du même côté que $A$ par rapport à $O$.`],
        solution: `$A' = (${nb(k)} \\times ${relP(x)} ; ${nb(k)} \\times ${relP(y)}) = ${pt(...img)}$.` };
    }
    // centre quelconque, sur une droite graduée
    const c = rand(-5, 5), a = c + nz(1, 4, true), img = c + k * (a - c);
    if (!Number.isInteger(img)) return GEN["tf3-homothetie"]();
    const Xd = (v) => 160 + v * 14.5; let dg = ln3(10, 60, 310, 60, "g-droite");
    for (let v = -10; v <= 10; v++) dg += ln3(Xd(v), 56, Xd(v), 64, "g-graduation") + (v % 2 === 0 && v !== c && v !== a ? tk3(Xd(v), 80, tN3(v), "middle") : "");
    dg += pt3([Xd(c), 60], "", [Xd(c), 70]) + tx3(Xd(c), 46, "C", "g-plabel", "middle") + tx3(Xd(c), 80, tN3(c), "g-mesure", "middle") + pt3([Xd(a), 60], "", [Xd(a), 70]) + tx3(Xd(a), 46, "A", "g-plabel", "middle") + tx3(Xd(a), 80, tN3(a), "g-mesure", "middle");
    return { enonce: `Sur une droite graduée, $C$ a pour abscisse $${rel(c)}$ et $A$ pour abscisse $${rel(a)}$. Quelle est l'abscisse de l'image $A'$ de $A$ par l'homothétie de centre $C$ et de rapport $${nb(k)}$ ?`, figure: sv3(320, 92, `Droite graduée de −10 à 10 : C d'abscisse ${tN3(c)}, A d'abscisse ${tN3(a)}`, dg), mode: "nombre", prefixe: "Abscisse de $A'$ :", attendu: img,
      erreurs: [{ valeur: k * a, message: "Le centre n'est pas l'origine : on part de $C$, $CA' = " + nb(Math.abs(k)) + " \\times CA$." }, { valeur: c - k * (a - c), message: "Attention au sens : " + (k > 0 ? "$k > 0$, $A'$ est du même côté que $A$." : "$k < 0$, $A'$ est de l'autre côté de $C$.") }],
      aides: [`De $C$ à $A$, on avance de $${rel(a - c)}$.`, `De $C$ à $A'$, on avance de $${nb(k)} \\times ${relP(a - c)} = ${rel(k * (a - c))}$.`, `Abscisse de $A'$ : $${rel(c)} + ${relP(k * (a - c))}$.`],
      solution: `$${rel(c)} + ${relP(k)} \\times ${relP(a - c)} = ${rel(img)}$.` };
  };

  GEN["tf3-effets"] = function () {
    const k = pick([2, 3, -2, -3, 0.5, -0.5, 1.5, 4]), t = rand(0, 2), K = Math.abs(k);
    if (t === 0) { const L = rand(2, 20), r = arr(L * K, 2);
      return { enonce: `Une homothétie de rapport $${nb(k)}$ transforme un segment de $${L}$ cm. Quelle est la longueur de son image ?`, figure: homTri3(k, { L: `${L} cm`, Li: "?", aria: `Triangle ABC avec AB = ${L} cm et son image A'B'C' par une homothétie de centre O et de rapport ${tN3(k)} ; A'B' inconnu` }), mode: "nombre", prefixe: "Longueur :", suffixe: "cm", attendu: r,
        erreurs: [{ valeur: arr(L * k, 2), message: "Une longueur est positive : on multiplie par $|k|$, ici $" + nb(K) + "$." }, { valeur: arr(L * k * k, 2), message: "$k^2$, c'est pour les aires." }],
        aides: ["Une homothétie de rapport $k$ multiplie les longueurs par $|k|$ (la distance à zéro de $k$).", `$|${nb(k)}| = ${nb(K)}$.`, `$${L} \\times ${nb(K)}$.`], solution: `$${L} \\times ${nb(K)} = ${nb(r)}$ cm.` }; }
    if (t === 1) { const A = rand(2, 30) * 4, r = arr(A * k * k, 2);
      return { enonce: `Une homothétie de rapport $${nb(k)}$ transforme une figure d'aire $${A}$ cm². Quelle est l'aire de l'image ?`, figure: homTri3(k, { aria: `Un triangle et son image par une homothétie de centre O et de rapport ${tN3(k)}` }), mode: "nombre", prefixe: "Aire :", suffixe: "cm²", attendu: r,
        erreurs: [{ valeur: arr(A * K, 2), message: "Les aires sont multipliées par $k^2$." }],
        aides: ["Les aires sont multipliées par $k^2$.", `$(${nb(k)})^2 = ${nb(arr(k * k, 4))}$.`, `$${A} \\times ${nb(arr(k * k, 4))}$.`], solution: `$${A} \\times ${nb(arr(k * k, 4))} = ${nb(r)}$ cm².` }; }
    const ang = rand(20, 150);
    const bonne = `$${ang}^\\circ$`, faux = uniq3(bonne, [`$${nb(arr(ang * K, 2))}^\\circ$`, `$${nb(arr(ang * k * k, 2))}^\\circ$`, `$${180 - ang}^\\circ$`, `$${nb(arr(ang / K, 2))}^\\circ$`]);
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: `Une homothétie de rapport $${nb(k)}$ transforme un angle de $${ang}^\\circ$. Quelle est la mesure de l'angle image ?`, figure: homTri3(k, { ang: `${ang}°`, angI: "?", aria: `Triangle ABC avec un angle de ${ang}° en A et son image A'B'C' par une homothétie de centre O et de rapport ${tN3(k)} (figure non à l'échelle)` }), mode: "choix", choix, attendu,
      aides: ["Une homothétie est un agrandissement ou une réduction.", "Elle conserve les angles (et le parallélisme).", "Seules les longueurs et les aires changent."], solution: `Les angles sont conservés : l'image mesure $${ang}^\\circ$.` };
  };

  GEN["tf3-reconnaitre"] = function () {
    const tir = Math.random();
    if (tir < 0.45) { // reconnaître une transformation sur un quadrillage
      const t = rand(0, 5); let a, b, v = [0, 0], ok = false;
      for (let essai = 0; essai < 200 && !ok; essai++) {
        a = rand(-6, 4); b = rand(-6, 3); v = [nz(2, 6, true), nz(2, 5, true)];
        const F = DRAPEAU3.map(([x, y]) => [x + a, y + b]), I = F.map((p) => imgTf3(t, p, v)), dans = (P) => P.every(([x, y]) => Math.abs(x) <= 7 && Math.abs(y) <= 7);
        ok = dans(F) && dans(I) && !(a <= 0 && a + 2 >= 0 && b <= 0 && b + 3 >= 0) && (t !== 5 || a >= 1 || a + 2 <= -1) && (t !== 0 || Math.abs(v[0]) >= 3 || Math.abs(v[1]) >= 4) && (t !== 4 || (a >= 0 && b >= 0) || (a <= -2 && b <= -3));
      }
      if (!ok) return GEN["tf3-reconnaitre"]();
      const { choix, attendu } = melange(NOMS_TF3[t], shuffle(NOMS_TF3.filter((_, i) => i !== t)));
      const expl = [`Chaque point glisse de $${rel(v[0])}$ horizontalement et de $${rel(v[1])}$ verticalement, sans tourner : c'est une translation.`, "La figure a tourné d'un quart de tour autour de $O$, dans le sens inverse des aiguilles d'une montre.", "La figure a tourné d'un quart de tour autour de $O$, dans le sens des aiguilles d'une montre.", "Chaque point a pour image son symétrique par rapport à $O$ : $(x ; y)$ devient $(-x ; -y)$ (demi-tour).", "La figure est agrandie : les distances à $O$ et les longueurs sont multipliées par $2$, du même côté de $O$.", "La figure est retournée par rapport à l'axe des ordonnées : $(x ; y)$ devient $(-x ; y)$."][t];
      return { enonce: "Quelle transformation transforme la figure 1 en la figure 2 ?", figure: recoTf3(t, a, b, v), mode: "choix", choix, attendu,
        aides: ["Compare la taille des deux figures : même taille (translation, rotation, symétrie) ou taille différente (homothétie) ?", "Regarde l'orientation du drapeau : a-t-il tourné, est-il retourné ?", "Suis un sommet précis de la figure 1 et son image."], solution: `${expl} Réponse : ${NOMS_TF3[t]}.` };
    }
    if (tir < 0.83) { // translation dans un repère
      const x = rand(-6, 6), y = rand(-6, 6), u = nz(1, 5, true), v = nz(1, 5, true), img = [x + u, y + v];
      const { choix, attendu } = choixPts(pt(...img), [pt(x - u, y - v), pt(x + v, y + u), pt(u, v), pt(x * u, y * v)]);
      const fig = grilleTf3({ points: [[0, 0, "O", -5, 13], [u, v, "B"], [x, y, "A"]], fleches: [[0, 0, u, v]], aria: `Repère quadrillé : flèche de O à B${pt(u, v)} et point A${pt(x, y)}` });
      return { enonce: `La translation qui transforme $O(0 ; 0)$ en $B${pt(u, v)}$ transforme $A${pt(x, y)}$ en $A'$. Quelles sont les coordonnées de $A'$ ?`, figure: fig, mode: "choix", choix, attendu,
        aides: ["Une translation fait glisser tous les points de la même façon.", `De $O$ à $B$ : $${rel(u)}$ horizontalement et $${rel(v)}$ verticalement.`, `Ajoute ces déplacements aux coordonnées de $A$.`], solution: `$A' = (${rel(x)} + ${relP(u)} ; ${rel(y)} + ${relP(v)}) = ${pt(...img)}$.` };
    }
    const Q = pick([
      ["La symétrie de centre $O$ est aussi :", "la rotation de centre $O$ et d'angle $180^\\circ$", ["la rotation de centre $O$ et d'angle $90^\\circ$", "une translation", "l'homothétie de rapport $2$"]],
      ["L'homothétie de centre $O$ et de rapport $-1$ est :", "la symétrie de centre $O$", ["la symétrie axiale d'axe $(O x)$", "une translation", "un agrandissement de rapport $2$"]],
      ["Quelle transformation conserve les longueurs et ne fait pas tourner les figures ?", "la translation", ["l'homothétie de rapport $3$", "la rotation de $90^\\circ$", "l'homothétie de rapport $0{,}5$"]],
      ["Une homothétie de rapport $k$ avec $0 < k < 1$ est :", "une réduction", ["un agrandissement", "une rotation", "une translation"]],
      ["Une homothétie de rapport $k > 1$ est :", "un agrandissement", ["une réduction", "une symétrie", "une translation"]],
      ["Une rotation conserve :", "les longueurs, les angles et les aires", ["seulement les longueurs", "seulement les angles", "rien"]],
      ["Par une homothétie de centre $O$, le centre $O$ :", "est sa propre image", ["a pour image un point plus loin", "n'a pas d'image", "devient l'origine d'une translation"]],
      ["Pour construire l'image d'un point $M$ par la rotation de centre $O$ et d'angle $60^\\circ$, on utilise :", "un compas et un rapporteur", ["seulement une règle", "une équerre seulement", "un tableau de proportionnalité"]],
      ["Par une translation, l'image d'une droite est :", "une droite parallèle (ou confondue)", ["une droite perpendiculaire", "un cercle", "un point"]],
      ["Une homothétie de rapport $k < -1$ est :", "un agrandissement, avec l'image de l'autre côté du centre", ["une réduction du même côté du centre", "une translation", "une rotation de $90^\\circ$"]]
    ]);
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu, aides: ["Translation : glissement ; rotation : on tourne autour d'un point ; homothétie : agrandissement ou réduction depuis un centre.", "Les translations et rotations conservent longueurs, angles et aires.", "Une homothétie conserve les angles, multiplie les longueurs par $|k|$ et les aires par $k^2$."], solution: `Réponse : ${Q[1]}.` };
  };

  FIGURES["tf3-cours-trans-rot"] = () => { const F = DRAPEAU3.map(([x, y]) => [x + 1, y + 1]); return grilleTf3({ polys: [{ P: F, lab: [1.9, 3.7, "1"] }, { P: F.map(([x, y]) => [x + 3, y - 5]), cl: "g-poly-image", lab: [4.9, -1.3, "2"] }, { P: F.map(([x, y]) => [-y, x]), cl: "g-poly-image", lab: [-3.7, 1.9, "3"] }], fleches: [[1, 1, 4, -4]], arcs: [[0, 0, 1.6, 15, 95]], points: [[0, 0, "O", -5, 13]], aria: "Drapeau 1 ; drapeau 2, image par une translation (flèche) ; drapeau 3, image par le quart de tour de centre O dans le sens inverse des aiguilles d'une montre" }); };
  FIGURES["tf3-cours-homothetie"] = () => homTri3(2, { L: "2 cm", Li: "4 cm", aria: "Triangle ABC et son image A'B'C' par l'homothétie de centre O et de rapport 2 : AB = 2 cm, A'B' = 4 cm" });
  FIGURES["tf3-cours-effets"] = () => homTri3(-2, { L: "2 cm", Li: "4 cm", aria: "Triangle ABC et son image A'B'C' par l'homothétie de centre O et de rapport −2, de l'autre côté de O : AB = 2 cm, A'B' = 4 cm" });
  FIGURES["tf3-qcm-T"] = () => recoTf3(0, -5, 1, [7, -4]);
  FIGURES["tf3-qcm-R"] = () => recoTf3(1, 2, 1);
  FIGURES["tf3-qcm-H"] = () => recoTf3(4, 1, 0);
  FIGURES["tf3-qcm-S"] = () => recoTf3(3, 2, 1);
  FIGURES["tf3-qcm-kneg"] = () => homTri3(-0.5, { aria: "Triangle ABC et son image A'B'C', plus petite et de l'autre côté du centre O" });
  FIGURES["tf3-qcm-k3"] = () => homTri3(3, { aria: "Triangle ABC et son image A'B'C', trois fois plus grande, du même côté du centre O" });
  FIGURES["tf3-methode-rot"] = () => grilleTf3({ n: 5, points: [[0, 0, "O", -5, 13], [2, 3, "M"], [-3, 2, "M'", -5]], fleches: [[0, 0, 2, 3], [0, 0, -3, 2]], arcs: [[0, 0, 2.2, 62, 140]], aria: "Quadrillage : M(2 ; 3) et son image M'(−3 ; 2) par le quart de tour de centre O dans le sens inverse des aiguilles d'une montre" });

  /* =====================================================================
     Chapitre 15 : géométrie dans l'espace (ep3-) — boule, volumes, sections, repérage
     ===================================================================== */
  // Solides en perspective : ellipse (moitié arrière en pointillés), sphère, cône, pyramide, cylindre, pavé, globe
  const ell3 = (cx, cy, rx, ry, plein) => `<path class="g-droite" style="fill:none" d="M${r3(cx - rx)} ${r3(cy)} A${r3(rx)} ${r3(ry)} 0 0 0 ${r3(cx + rx)} ${r3(cy)}"/><path class="${plein ? "g-droite" : "g-cache-arc"}" style="fill:none" d="M${r3(cx - rx)} ${r3(cy)} A${r3(rx)} ${r3(ry)} 0 0 1 ${r3(cx + rx)} ${r3(cy)}"/>`;
  const ellA3 = (cx, cy, rx, ry) => `<ellipse class="g-aire" cx="${r3(cx)}" cy="${r3(cy)}" rx="${r3(rx)}" ry="${r3(ry)}"/>`;
  function sphere3(o) { // o : { R (vrai rayon), d (plan de section), labR, labD, labS, diam, aria }
    const cx = 160, cy = 100, Rp = 80, s = Rp / (o.R || 1); let c = `<circle class="g-poly" cx="${cx}" cy="${cy}" r="${Rp}"/>` + ell3(cx, cy, Rp, 20);
    if (o.d != null) { const yS = cy - o.d * s, rS = Math.sqrt(o.R * o.R - o.d * o.d) * s; c += ellA3(cx, yS, rS, rS * 0.25) + ell3(cx, yS, rS, rS * 0.25) + ln3(cx, cy, cx, yS, "g-cache") + ln3(cx, yS, cx + rS, yS, "g-segment") + ln3(cx, cy, cx + rS, yS, "g-segment") + droit3([cx, yS], [cx + rS, yS], [cx, cy], 7) + pt3([cx, yS], "H", [cx + 10, yS + 10], 8) + pt3([cx + rS, yS], "M", [cx, yS + 10], 8) + (o.labS ? tx3(cx + rS / 2, yS - 6, o.labS, "g-mesure", "middle") : "") + (o.labD ? tx3(cx - 8, (cy + yS) / 2 + 4, o.labD, "g-mesure", "end") : "") + (o.labR ? labSeg3([cx, cy], [cx + rS, yS], [cx, yS], 11, o.labR) : ""); }
    else if (o.diam) c += ln3(cx - Rp, cy, cx + Rp, cy, "g-segment") + tx3(cx + 30, cy - 6, o.diam, "g-mesure", "middle");
    else if (o.labR) c += ln3(cx, cy, cx + Rp * 0.94, cy - Rp * 0.34, "g-segment") + tx3(cx + 40, cy - 22, o.labR, "g-mesure", "middle");
    c += pt3([cx, cy], "O", [cx + 4, cy - 10], 8);
    return sv3(320, 200, o.aria, c);
  }
  function cone3(o) { // o : { labR, labH, t (section à la fraction t depuis le sommet), aria }
    const S = [160, 22], cx = 160, by = 170, rx = 74, ry = 20; let c = `<polygon class="g-poly" style="stroke:none" points="${pl3([S, [cx - rx, by], [cx + rx, by]])}"/>` + ln3(S[0], S[1], cx - rx, by, "g-segment") + ln3(S[0], S[1], cx + rx, by, "g-segment") + ell3(cx, by, rx, ry);
    if (o.t) { const y = S[1] + o.t * (by - S[1]); c += ellA3(cx, y, rx * o.t, ry * o.t) + ell3(cx, y, rx * o.t, ry * o.t); }
    c += ln3(S[0], S[1], cx, by, "g-cache") + droit3([cx, by], [cx + rx, by], S, 8) + ln3(cx, by, cx + rx, by, "g-cache") + pt3([cx, by], "", [cx, by]) + (o.labR ? tx3(cx + rx / 2, by + 15, o.labR, "g-mesure", "middle") : "") + (o.labH ? tx3(cx - 6, S[1] + (o.t ? (o.t > 0.45 ? o.t - 0.22 : o.t + 0.22) : 0.6) * (by - S[1]) + 4, o.labH, "g-mesure", "end") : "");
    return sv3(320, 200, o.aria, c);
  }
  function pyramide3(o) { // base carrée ABCD, sommet S ; o : { labC, labH, t, aria }
    const A = [62, 176], B = [206, 176], C = [262, 136], D = [118, 136], O = [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2], S = [O[0], 20], G = [O[0], 120];
    let c = `<polygon class="g-poly" style="stroke:none" points="${pl3([A, B, C, S])}"/>` + [[A, B], [B, C], [S, A], [S, B], [S, C]].map(([P, Q]) => ln3(P[0], P[1], Q[0], Q[1], "g-segment")).join("") + [[A, D], [D, C], [S, D]].map(([P, Q]) => ln3(P[0], P[1], Q[0], Q[1], "g-cache")).join("");
    if (o.t) { const R = [A, B, C, D].map((P) => [S[0] + o.t * (P[0] - S[0]), S[1] + o.t * (P[1] - S[1])]); c += `<polygon class="g-aire" points="${pl3(R)}"/>` + ln3(R[0][0], R[0][1], R[1][0], R[1][1], "g-droite") + ln3(R[1][0], R[1][1], R[2][0], R[2][1], "g-droite"); }
    c += ln3(S[0], S[1], O[0], O[1], "g-cache") + droit3(O, [O[0] + 20, O[1]], S, 7) + ["A", "B", "C", "D", "S"].map((n, i) => pt3([A, B, C, D, S][i], n, G, 8)).join("") + (o.labC ? labSeg3(A, B, G, 6, o.labC) : "") + (o.labH ? tx3(O[0] + 6, S[1] + (o.t ? (o.t > 0.45 ? o.t - 0.22 : o.t + 0.22) : 0.55) * (O[1] - S[1]) + 4, o.labH, "g-mesure", "start") : "");
    return sv3(320, 200, o.aria, c);
  }
  function cylindre3(o) { // o : { labR, labH, balles, section: "base" | "axe", aria }
    const cx = 160, by = 174, ty = 36, rx = 62, ry = 17; let c = `<rect class="g-poly" style="stroke:none" x="${cx - rx}" y="${ty}" width="${2 * rx}" height="${by - ty}"/>` + ln3(cx - rx, ty, cx - rx, by, "g-segment") + ln3(cx + rx, ty, cx + rx, by, "g-segment") + ell3(cx, by, rx, ry) + `<ellipse class="g-droite" style="fill:none" cx="${cx}" cy="${ty}" rx="${rx}" ry="${ry}"/>`;
    if (o.balles) { const rb = Math.min(rx * 0.92, (by - ty) / (2 * o.balles)); for (let i = 0; i < o.balles; i++) c += `<circle class="g-cercle" cx="${cx}" cy="${r3(by - rb * (2 * i + 1))}" r="${r3(rb)}"/>`; }
    if (o.section === "base") { const y = (ty + by) / 2; c += ellA3(cx, y, rx, ry) + ell3(cx, y, rx, ry); }
    if (o.section === "axe") { const dy = ry * 0.5, dx = rx * Math.sqrt(0.75); c += `<polygon class="g-aire" points="${pl3([[cx - dx, ty + dy], [cx + dx, ty + dy], [cx + dx, by + dy], [cx - dx, by + dy]])}"/>` + ln3(cx - dx, ty + dy, cx + dx, ty + dy, "g-droite") + ln3(cx - dx, ty + dy, cx - dx, by + dy, "g-droite") + ln3(cx + dx, ty + dy, cx + dx, by + dy, "g-droite") + ln3(cx - dx, by + dy, cx + dx, by + dy, "g-droite"); }
    if (o.labR) c += ln3(cx, ty, cx + rx, ty, "g-segment") + tx3(cx + rx / 2, ty - 5, o.labR, "g-mesure", "middle");
    if (o.labH) c += cote3([cx + rx, by], [cx + rx, ty], 16, o.labH);
    return sv3(320, 200, o.aria, c);
  }
  function pave3(o) { // o : { L, l, h, labs: [AB, AD, AE], axes, section (points 3D), marque (nom d'un sommet), aria }
    const { L, l, h } = o, ax = o.axes ? 1.22 : 1, s = Math.min(220 / (L * ax + 0.37 * l), 140 / (h * ax + 0.26 * l)), P = ([x, y, z]) => [44 + (x + y * 0.37) * s, 178 - (z + y * 0.26) * s];
    const V = { A: [0, 0, 0], B: [L, 0, 0], C: [L, l, 0], D: [0, l, 0], E: [0, 0, h], F: [L, 0, h], G: [L, l, h], H: [0, l, h] }, Q = {}; Object.keys(V).forEach((k) => { Q[k] = P(V[k]); });
    const ctr = P([L / 2, l / 2, h / 2]); let c = `<polygon class="g-poly" style="stroke:none" points="${pl3([Q.A, Q.B, Q.C, Q.G, Q.H, Q.E])}"/>`;
    c += ["AB", "BC", "BF", "CG", "EF", "FG", "GH", "HE", "AE"].map(([p, q]) => ln3(Q[p][0], Q[p][1], Q[q][0], Q[q][1], "g-segment")).join("") + ["AD", "DC", "DH"].map(([p, q]) => ln3(Q[p][0], Q[p][1], Q[q][0], Q[q][1], "g-cache")).join("");
    if (o.section) c += `<polygon class="g-aire" points="${pl3(o.section.map(P))}"/>` + o.section.map((p, i, T) => { const a = P(p), b = P(T[(i + 1) % T.length]); return ln3(a[0], a[1], b[0], b[1], "g-droite"); }).join("");
    if (o.axes) { const X = P([L * 1.22, 0, 0]), Y = P([0, l * 1.4, 0]), Z = P([0, 0, h * 1.22]); c += fl3(Q.B, X, "g-droite") + fl3(Q.D, Y, "g-droite") + fl3(Q.E, Z, "g-droite"); } // axes : flèches seules (les noms des axes sont donnés dans l'énoncé)
    if (o.noms !== false) Object.keys(Q).forEach((k) => { c += (o.marque === k ? `<circle class="g-point" cx="${r3(Q[k][0])}" cy="${r3(Q[k][1])}" r="4.5"/>` : "") + pt3(Q[k], k, k === "D" ? [Q.D[0] + 10, Q.D[1] + 7] : ctr, 9); });
    if (o.labs) { const [a, b, e] = o.labs; if (a) c += labSeg3(Q.A, Q.B, ctr, 7, a); if (b) c += labSeg3(Q.F, Q.G, ctr, 6, b); if (e) c += labSeg3(Q.A, Q.E, ctr, 7, e); }
    return sv3(320, 200, o.aria, c);
  }
  function globe3(o) { // o : { point: [lat, long, nom], aria }
    const cx = 160, cy = 100, R = 78, vue = 25, xy = (la, lo) => [cx + R * Math.cos(la * RAD) * Math.sin((lo - vue) * RAD), cy - R * Math.sin(la * RAD) + 16 * Math.cos(la * RAD) * Math.cos((lo - vue) * RAD) * 0];
    let c = `<circle class="g-poly" cx="${cx}" cy="${cy}" r="${R}"/>` + ell3(cx, cy, R, 16) + `<path class="g-droite" style="fill:none" d="M${cx} ${cy - R} A${r3(R * Math.sin(vue * RAD))} ${R} 0 0 0 ${cx} ${cy + R}"/>`;
    c += pt3([cx, cy - R], "N", [cx, cy], 8) + pt3([cx, cy + R], "S", [cx, cy], 8) + tk3(cx + R + 4, cy + 4, "équateur", "start") + tk3(cx - R * Math.sin(vue * RAD) - 4, cy - 40, "Greenwich", "end");
    if (o.point) { const [la, lo, nm] = o.point, p = xy(la, lo); c += pt3([p[0], p[1] + 14 * Math.cos(la * RAD)], nm, [cx, cy - 30], 8); }
    return sv3(320, 200, o.aria || "Globe terrestre : pôles Nord et Sud, équateur et méridien de Greenwich", c);
  }

  GEN["ep3-boule"] = function () {
    const r = rand(2, 30), t = rand(0, 2), u = pick(["cm", "cm", "m", "mm"]), fig = sphere3({ labR: `${r} ${u}`, aria: `Boule de centre O et de rayon ${r} ${u}` });
    if (t === 0) { const V = (4 / 3) * Math.PI * r ** 3, R = Math.round(V);
      return { enonce: `Calcule le volume d'une boule de rayon $${r}$ ${u}, arrondi au ${u}³.`, figure: fig, mode: "nombre", prefixe: "Volume :", suffixe: `${u}³`, attendu: R,
        erreurs: [{ valeur: Math.round(4 * Math.PI * r * r), message: "Ça, c'est l'aire de la sphère ($4\\pi r^2$). Le volume est $\\dfrac{4}{3}\\pi r^3$." }, { valeur: Math.floor(V) === R ? Math.ceil(V) : Math.floor(V), message: "Vérifie l'arrondi à l'unité." }],
        aides: ["$V = \\dfrac{4}{3} \\pi r^3$.", `$${r}^3 = ${r ** 3}$.`, `$V = \\dfrac{4}{3} \\times \\pi \\times ${r ** 3}$.`], solution: `$V = \\dfrac{4}{3} \\pi \\times ${r}^3 \\approx ${nb(arr(V, 2))}$, soit $${nb(R)}$ ${u}³.` }; }
    if (t === 1) { const A = 4 * Math.PI * r * r, R = Math.round(A);
      return { enonce: `Calcule l'aire d'une sphère de rayon $${r}$ ${u}, arrondie au ${u}².`, figure: fig, mode: "nombre", prefixe: "Aire :", suffixe: `${u}²`, attendu: R,
        erreurs: [{ valeur: Math.round(Math.PI * r * r), message: "Ça, c'est l'aire d'un disque. L'aire de la sphère vaut $4\\pi r^2$." }, { valeur: Math.round((4 / 3) * Math.PI * r ** 3), message: "Ça, c'est le volume de la boule : l'aire vaut $4\\pi r^2$." }],
        aides: ["$\\mathcal{A} = 4 \\pi r^2$.", `$${r}^2 = ${r * r}$.`, `$\\mathcal{A} = 4 \\times \\pi \\times ${r * r}$.`], solution: `$\\mathcal{A} = 4 \\pi \\times ${r}^2 \\approx ${nb(arr(A, 2))}$, soit $${nb(R)}$ ${u}².` }; }
    const [obj, dmin, dmax, ud] = pick([["Un ballon de football", 20, 24, "cm"], ["Une boule de pétanque", 70, 80, "mm"], ["Une orange", 6, 10, "cm"], ["Un ballon de basket", 23, 25, "cm"], ["Une bille", 10, 25, "mm"], ["Un ballon de plage", 30, 60, "cm"], ["Une noix de coco presque sphérique", 12, 18, "cm"], ["Une citerne sphérique", 2, 6, "m"]]), d = rand(dmin, dmax), rr = d / 2, V = (4 / 3) * Math.PI * rr ** 3, R = Math.round(V);
    return { enonce: `${obj} a un diamètre de $${d}$ ${ud}. Quel est son volume, arrondi au ${ud}³ ?`, figure: sphere3({ diam: `${d} ${ud}`, aria: `Boule de diamètre ${d} ${ud}` }), mode: "nombre", prefixe: "Volume :", suffixe: `${ud}³`, attendu: R,
      erreurs: [{ valeur: Math.round((4 / 3) * Math.PI * d ** 3), message: "Le rayon est la moitié du diamètre." }],
      aides: [`Rayon : $${d} \\div 2 = ${nb(rr)}$ ${ud}.`, "$V = \\dfrac{4}{3} \\pi r^3$.", `$\\dfrac{4}{3} \\times \\pi \\times ${nb(rr)}^3$.`], solution: `$r = ${nb(rr)}$ ${ud} et $V = \\dfrac{4}{3} \\pi \\times ${nb(rr)}^3 \\approx ${nb(R)}$ ${ud}³.` };
  };

  GEN["ep3-volumes"] = function () {
    const t = rand(0, 3);
    if (t === 0) { const r = rand(2, 12), h = rand(3, 20), V = (Math.PI * r * r * h) / 3, R = Math.round(V);
      return { enonce: `Calcule le volume d'un cône de révolution de rayon $${r}$ cm et de hauteur $${h}$ cm, arrondi au cm³.`, figure: cone3({ labR: `${r} cm`, labH: `${h} cm`, aria: `Cône de révolution de rayon ${r} cm et de hauteur ${h} cm` }), mode: "nombre", prefixe: "Volume :", suffixe: "cm³", attendu: R,
        erreurs: [{ valeur: Math.round(Math.PI * r * r * h), message: "Ça, c'est le volume du cylindre : pour un cône, on divise par $3$." }, { valeur: Math.round((Math.PI * r * h) / 3), message: "Le rayon doit être élevé au carré : $\\pi r^2$." }],
        aides: ["$V = \\dfrac{1}{3} \\times \\pi r^2 \\times h$.", `Aire de la base : $\\pi \\times ${r}^2 = ${r * r}\\pi$.`, `$V = \\dfrac{${r * r} \\pi \\times ${h}}{3}$.`], solution: `$V = \\dfrac{\\pi \\times ${r}^2 \\times ${h}}{3} \\approx ${nb(R)}$ cm³.` }; }
    if (t === 1) { const c = rand(2, 12), h = rand(3, 18) * 3 / 3, V = (c * c * h) / 3;
      if (!Number.isInteger(V * 100)) return GEN["ep3-volumes"]();
      return { enonce: `Une pyramide a pour base un carré de côté $${c}$ cm et pour hauteur $${h}$ cm. Calcule son volume.`, figure: pyramide3({ labC: `${c} cm`, labH: `${h} cm`, aria: `Pyramide SABCD à base carrée de côté ${c} cm et de hauteur ${h} cm` }), mode: "nombre", prefixe: "Volume :", suffixe: "cm³", attendu: arr(V, 2),
        erreurs: [{ valeur: c * c * h, message: "Pour une pyramide, on divise par $3$." }],
        aides: ["$V = \\dfrac{1}{3} \\times \\text{aire de la base} \\times h$.", `Aire de la base : $${c}^2 = ${c * c}$ cm².`, `$V = \\dfrac{${c * c} \\times ${h}}{3}$.`], solution: `$V = \\dfrac{${c * c} \\times ${h}}{3} = ${nb(arr(V, 2))}$ cm³.` }; }
    if (t === 2) { const k = pick([2, 3, 0.5, 4, 1.5]), V = rand(2, 40) * 8, r = arr(V * k ** 3, 3);
      return { enonce: `Un solide a un volume de $${V}$ cm³. On l'${k > 1 ? "agrandit" : "réduit"} à l'échelle $${nb(k)}$ (longueurs multipliées par $${nb(k)}$). Quel est le volume du nouveau solide ?`, mode: "nombre", prefixe: "Volume :", suffixe: "cm³", attendu: r,
        erreurs: [{ valeur: arr(V * k, 3), message: "Les volumes sont multipliés par $k^3$." }, { valeur: arr(V * k * k, 3), message: "$k^2$, c'est pour les aires ; pour les volumes, c'est $k^3$." }],
        aides: ["Longueurs × $k$, aires × $k^2$, volumes × $k^3$.", `$${nb(k)}^3 = ${nb(arr(k ** 3, 4))}$.`, `$${V} \\times ${nb(arr(k ** 3, 4))}$.`], solution: `$${V} \\times ${nb(k)}^3 = ${nb(r)}$ cm³.` }; }
    const r = rand(2, 10), h = rand(5, 25), Vc = Math.PI * r * r * h, n = Math.floor(Vc / ((4 / 3) * Math.PI * r ** 3));
    if (n < 1) return GEN["ep3-volumes"]();
    const L = 2 * r * pick([2, 3, 4]), Vcyl = Math.PI * r * r * L, Vb = (4 / 3) * Math.PI * r ** 3, rest = Math.round(Vcyl - (L / (2 * r)) * Vb);
    return { enonce: `Une boîte cylindrique de rayon $${r}$ cm et de hauteur $${L}$ cm contient $${L / (2 * r)}$ balles de rayon $${r}$ cm. Quel volume reste-t-il libre dans la boîte, arrondi au cm³ ?`, figure: cylindre3({ labR: `${r} cm`, labH: `${L} cm`, balles: L / (2 * r), aria: `Boîte cylindrique de rayon ${r} cm et de hauteur ${L} cm contenant ${L / (2 * r)} balles de rayon ${r} cm` }), mode: "nombre", prefixe: "Volume libre :", suffixe: "cm³", attendu: rest,
      erreurs: [{ valeur: Math.round(Vcyl), message: "Retire le volume des balles." }, { valeur: Math.round((L / (2 * r)) * Vb), message: "Ça, c'est le volume des balles : calcule ce qui reste dans le cylindre." }],
      aides: [`Volume du cylindre : $\\pi \\times ${r}^2 \\times ${L}$.`, `Volume d'une balle : $\\dfrac{4}{3} \\pi \\times ${r}^3$.`, `Volume libre : cylindre $- ${L / (2 * r)} \\times$ balle.`], solution: `$\\pi \\times ${r * r} \\times ${L} - ${L / (2 * r)} \\times \\dfrac{4}{3}\\pi \\times ${r ** 3} \\approx ${nb(rest)}$ cm³.` };
  };

  GEN["ep3-sections"] = function () {
    const tir = Math.random();
    if (tir < 0.35) { // rayon d'une section de sphère
      const ech = pick([1, 1, 2, 3, 0.5]), [d, rr, R] = pick([[3, 4, 5], [5, 12, 13], [4, 3, 5], [12, 5, 13], [8, 15, 17], [15, 8, 17], [7, 24, 25], [24, 7, 25], [20, 21, 29], [21, 20, 29]]).map((v) => v * ech);
      return { enonce: `Une sphère de centre $O$ et de rayon $${nb(R)}$ cm est coupée par un plan situé à $${nb(d)}$ cm de $O$. Quel est le rayon du cercle de section ?`, figure: sphere3({ R, d, labR: `${nbTexte(R)} cm`, labD: `${nbTexte(d)} cm`, labS: "?", aria: `Sphère de centre O et de rayon OM = ${nbTexte(R)} cm coupée par un plan à OH = ${nbTexte(d)} cm du centre ; triangle OHM rectangle en H, HM inconnu` }), mode: "nombre", prefixe: "Rayon :", suffixe: "cm", attendu: rr,
        erreurs: [{ valeur: R - d, message: "Utilise le théorème de Pythagore dans le triangle rectangle formé par $O$, le centre de la section et un point du cercle." }, { valeur: arr(Math.sqrt(R * R + d * d), 2), message: "$[OM]$ est l'hypoténuse : $HM^2 = OM^2 - OH^2$ (on soustrait)." }],
        aides: ["Le centre $H$ du cercle de section, le centre $O$ et un point $M$ du cercle forment un triangle rectangle en $H$.", `$OM = ${nb(R)}$ (rayon de la sphère) et $OH = ${nb(d)}$.`, `$HM^2 = ${nb(R)}^2 - ${nb(d)}^2$.`], solution: `$HM^2 = ${nb(R * R)} - ${nb(d * d)} = ${nb(rr * rr)}$, donc $HM = ${nb(rr)}$ cm.` };
    }
    if (tir < 0.68) { // section parallèle à la base d'une pyramide ou d'un cône : réduction (Thalès)
      const cone = Math.random() < 0.5; let H, d, c, x;
      do { H = rand(4, 15); d = rand(1, H - 1); c = rand(3, 12); x = arr((c * d) / H, 2); } while (!Number.isInteger(x * 10));
      const quoi = cone ? ["Un cône de révolution", "une base de rayon", "le rayon du disque de section"] : ["Une pyramide", "pour base un carré de côté", "le côté du carré de section"];
      const fig = cone ? cone3({ labR: `${c} cm`, labH: `${H} cm`, t: d / H, aria: `Cône de hauteur ${H} cm et de rayon ${c} cm, coupé parallèlement à la base à ${d} cm du sommet` }) : pyramide3({ labC: `${c} cm`, labH: `${H} cm`, t: d / H, aria: `Pyramide de hauteur ${H} cm à base carrée de côté ${c} cm, coupée parallèlement à la base à ${d} cm du sommet` });
      return { enonce: `${quoi[0]} de hauteur $${H}$ cm a ${quoi[1]} $${c}$ cm. On la coupe par un plan parallèle à sa base, à $${d}$ cm du sommet. Quel est ${quoi[2]} ?`.replace("On la coupe", cone ? "On le coupe" : "On la coupe"), figure: fig, mode: "nombre", prefixe: cone ? "Rayon :" : "Côté :", suffixe: "cm", attendu: x,
        erreurs: [{ valeur: arr((c * (H - d)) / H, 2), message: "La distance est mesurée depuis le sommet : le rapport de réduction est $\\dfrac{" + d + "}{" + H + "}$." }, ...(c - (H - d) > 0 ? [{ valeur: c - (H - d), message: "La section est une réduction : on multiplie par un rapport, on ne soustrait pas." }] : [])],
        aides: ["La section parallèle à la base est une réduction de la base.", `Rapport de réduction : $k = \\dfrac{${d}}{${H}}$ (distance au sommet sur hauteur).`, `$${c} \\times \\dfrac{${d}}{${H}}$.`], solution: `La section est une réduction de la base de rapport $\\dfrac{${d}}{${H}}$ : $${c} \\times \\dfrac{${d}}{${H}} = ${nb(x)}$ cm.` };
    }
    if (tir < 0.8) { // cylindre coupé
      const r = rand(2, 15), axe = Math.random() < 0.5; let h; do { h = rand(5, 30); } while (h === r || h === 2 * r);
      const bonne = axe ? `un rectangle de hauteur $${h}$ cm` : `un disque de rayon $${r}$ cm`, { choix, attendu } = melange(bonne, axe ? [`un disque de rayon $${r}$ cm`, `un rectangle de hauteur $${2 * r}$ cm`, `un triangle de hauteur $${h}$ cm`] : [`un disque de rayon $${h}$ cm`, `un rectangle de hauteur $${h}$ cm`, `un disque de rayon $${2 * r}$ cm`]);
      return { enonce: `Un cylindre de révolution de rayon $${r}$ cm et de hauteur $${h}$ cm est coupé par un plan parallèle à ${axe ? "son axe" : "sa base"}. La section est :`, figure: cylindre3({ labR: `${r} cm`, labH: `${h} cm`, section: axe ? "axe" : "base", aria: `Cylindre de rayon ${r} cm et de hauteur ${h} cm coupé par un plan parallèle à ${axe ? "son axe" : "sa base"}` }), mode: "choix", choix, attendu,
        aides: ["Parallèle à la base : on obtient une copie de la base.", "Parallèle à l'axe : on obtient un rectangle dont la hauteur est celle du cylindre.", "Imagine que tu coupes une boîte de conserve."], solution: axe ? `Un plan parallèle à l'axe coupe le cylindre selon un rectangle de hauteur $${h}$ cm (la hauteur du cylindre).` : `Un plan parallèle à la base coupe le cylindre selon un disque de même rayon que la base : $${r}$ cm.` };
    }
    const cube = (sec) => pave3({ L: 1, l: 1, h: 1, noms: false, section: sec, aria: "Cube coupé par un plan (section grisée)" });
    const Q = pick([
      ["La section d'un cube par un plan parallèle à une face est :", "un carré", ["un rectangle non carré", "un triangle", "un cercle"], () => cube([[0.5, 0, 0], [0.5, 1, 0], [0.5, 1, 1], [0.5, 0, 1]])],
      ["La section d'un cylindre par un plan parallèle à sa base est :", "un disque de même rayon que la base", ["un rectangle", "un disque plus petit", "une ellipse"], () => cylindre3({ section: "base", aria: "Cylindre coupé parallèlement à sa base" })],
      ["La section d'un cylindre par un plan parallèle à son axe est :", "un rectangle", ["un disque", "un triangle", "un carré obligatoirement"], () => cylindre3({ section: "axe", aria: "Cylindre coupé parallèlement à son axe" })],
      ["La section d'une sphère par un plan est :", "un cercle", ["un carré", "un rectangle", "un triangle"], () => sphere3({ R: 1, d: 0.55, aria: "Sphère coupée par un plan" })],
      ["La section d'une pyramide par un plan parallèle à sa base est :", "une réduction de la base", ["un agrandissement de la base", "un triangle quelconque", "un cercle"], () => pyramide3({ t: 0.5, aria: "Pyramide coupée parallèlement à sa base" })],
      ["La section d'un cône par un plan parallèle à sa base est :", "un disque", ["un triangle", "un rectangle", "un carré"], () => cone3({ t: 0.5, aria: "Cône coupé parallèlement à sa base" })],
      ["La section d'un pavé droit par un plan parallèle à une arête est :", "un rectangle", ["un triangle", "un cercle", "un trapèze obligatoirement"], () => pave3({ L: 3, l: 2, h: 2, noms: false, section: [[1.8, 0, 0], [3, 1.4, 0], [3, 1.4, 2], [1.8, 0, 2]], aria: "Pavé droit coupé par un plan parallèle à une arête verticale" })],
      ["Un plan passant par le centre d'une sphère la coupe selon :", "un grand cercle, de même rayon que la sphère", ["un point", "un petit cercle", "un carré"], () => sphere3({ R: 1, aria: "Sphère et son équateur, un grand cercle" })],
      ["La section d'un cube par le plan qui contient deux arêtes opposées (parallèles, non dans une même face) est :", "un rectangle non carré", ["un carré", "un triangle", "un cercle"], () => cube([[0, 0, 0], [1, 0, 0], [1, 1, 1], [0, 1, 1]])],
      ["La section d'un cône par un plan qui contient son axe est :", "un triangle isocèle", ["un disque", "un rectangle", "un carré"], null],
      ["La section d'une boule (solide plein) par un plan est :", "un disque", ["un carré", "un rectangle", "une sphère"], null],
      ["Plus un plan est loin du centre d'une sphère, plus le cercle de section est :", "petit", ["grand", "de même rayon", "proche d'un carré"], () => sphere3({ R: 1, d: 0.75, aria: "Sphère coupée par un plan éloigné du centre : petit cercle de section" })]
    ]);
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], figure: Q[3] ? Q[3]() : undefined, mode: "choix", choix, attendu, aides: ["Imagine que tu coupes le solide comme un fromage.", "Un plan parallèle à une base donne une figure semblable à cette base.", "Une sphère coupée donne toujours un cercle."], solution: `Réponse : ${Q[1]}.` };
  };

  GEN["ep3-reperage"] = function () {
    const tir = Math.random();
    if (tir < 0.3) { // latitude et longitude
      const a = rand(1, 80), b = rand(1, 170), ns = pick(["Nord", "Sud"]), eo = pick(["Est", "Ouest"]);
      const txt = (n, e) => `dans l'hémisphère ${n}, à l'${e === "Est" ? "est" : "ouest"} du méridien de Greenwich`, bonne = txt(ns, eo);
      const { choix, attendu } = melange(bonne, [txt(ns === "Nord" ? "Sud" : "Nord", eo), txt(ns, eo === "Est" ? "Ouest" : "Est"), txt(ns === "Nord" ? "Sud" : "Nord", eo === "Est" ? "Ouest" : "Est")]);
      return { enonce: `Un point de la Terre a pour latitude $${a}^\\circ$ ${ns} et pour longitude $${b}^\\circ$ ${eo}. Il est situé :`, figure: globe3({}), mode: "choix", choix, attendu,
        aides: ["La latitude dit si l'on est au nord ou au sud de l'équateur.", "La longitude dit si l'on est à l'est ou à l'ouest du méridien de Greenwich.", "Mayotte, par exemple, est vers $13^\\circ$ Sud et $45^\\circ$ Est."], solution: `Latitude ${ns} : ${ns === "Nord" ? "au nord" : "au sud"} de l'équateur ; longitude ${eo} : à l'${eo === "Est" ? "est" : "ouest"} de Greenwich. Réponse : ${bonne}.` };
    }
    if (tir < 0.83) { // pavé dans un repère de l'espace
      const L = rand(2, 9), l = rand(2, 9), h = rand(2, 9), q = pick([["G", [L, l, h], "le sommet opposé à l'origine"], ["B", [L, 0, 0], "le sommet sur l'axe des abscisses"], ["D", [0, l, 0], "le sommet sur l'axe des ordonnées"], ["E", [0, 0, h], "le sommet sur l'axe des altitudes"], ["F", [L, 0, h], "le sommet au-dessus de B"], ["C", [L, l, 0], "le sommet de la base opposé à l'origine"], ["H", [0, l, h], "le sommet au-dessus de D"]]), c = rand(0, 2);
      return { enonce: `Un pavé droit $ABCDEFGH$ a pour sommet $A$ l'origine d'un repère de l'espace ; ses arêtes issues de $A$ sont sur les axes : $AB = ${L}$ (abscisses), $AD = ${l}$ (ordonnées), $AE = ${h}$ (altitudes). Quelle est ${["l'abscisse", "l'ordonnée", "l'altitude"][c]} du point $${q[0]}$ (${q[2]}) ?`, figure: pave3({ L, l, h, axes: true, marque: q[0], labs: [`${L}`, "", `${h}`], aria: `Pavé droit ABCDEFGH dans un repère de l'espace d'origine A : AB = ${L}, AD = ${l}, AE = ${h} ; le point ${q[0]} est marqué` }), mode: "nombre", prefixe: `${["Abscisse", "Ordonnée", "Altitude"][c]} :`, attendu: q[1][c],
        aides: ["Dans l'espace, un point est repéré par trois coordonnées : abscisse, ordonnée, altitude.", `$${q[0]}$ s'obtient en partant de $A$ et en suivant les arêtes du pavé.`, `$${q[0]}(${q[1].join(" ; ")})$.`], solution: `$${q[0]}(${q[1].join(" ; ")})$ : ${["l'abscisse", "l'ordonnée", "l'altitude"][c]} vaut $${q[1][c]}$.` };
    }
    const Q = pick([
      ["Sur la Terre, on repère un point par :", "sa latitude et sa longitude", ["son altitude seulement", "sa distance au pôle Nord seulement", "son fuseau horaire"]],
      ["L'équateur correspond à la latitude :", "$0^\\circ$", ["$90^\\circ$ Nord", "$180^\\circ$", "$45^\\circ$ Nord"]],
      ["Le méridien de Greenwich correspond à la longitude :", "$0^\\circ$", ["$90^\\circ$ Est", "$180^\\circ$", "$23^\\circ$ Ouest"]],
      ["Mayotte est dans l'hémisphère :", "Sud, et à l'est du méridien de Greenwich", ["Nord, et à l'ouest de Greenwich", "Nord, et à l'est de Greenwich", "Sud, et à l'ouest de Greenwich"]],
      ["Le pôle Nord a pour latitude :", "$90^\\circ$ Nord", ["$0^\\circ$", "$180^\\circ$ Nord", "$45^\\circ$ Nord"]],
      ["Les méridiens sont :", "des demi-cercles qui joignent les deux pôles", ["des cercles parallèles à l'équateur", "des droites", "des points"]],
      ["Les parallèles sont :", "des cercles parallèles à l'équateur", ["des demi-cercles d'un pôle à l'autre", "des droites", "des carrés"]],
      ["Un point de latitude $0^\\circ$ se trouve :", "sur l'équateur", ["au pôle Nord", "sur le méridien de Greenwich", "au pôle Sud"]],
      ["Deux villes situées sur le même méridien ont la même :", "longitude", ["latitude", "altitude", "température"]],
      ["Les latitudes sont comprises entre :", "$0^\\circ$ et $90^\\circ$ (Nord ou Sud)", ["$0^\\circ$ et $180^\\circ$ (Nord ou Sud)", "$0^\\circ$ et $360^\\circ$", "$-45^\\circ$ et $45^\\circ$"]],
      ["Les longitudes sont comprises entre :", "$0^\\circ$ et $180^\\circ$ (Est ou Ouest)", ["$0^\\circ$ et $90^\\circ$ (Est ou Ouest)", "$0^\\circ$ et $360^\\circ$ (Est)", "$0^\\circ$ et $45^\\circ$"]]
    ]);
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], figure: globe3(/Mayotte/.test(Q[0]) ? { point: [-13, 45, "Mayotte"], aria: "Globe terrestre : équateur, méridien de Greenwich et Mayotte" } : {}), mode: "choix", choix, attendu, aides: ["La latitude mesure l'angle au nord ou au sud de l'équateur.", "La longitude mesure l'angle à l'est ou à l'ouest du méridien de Greenwich.", "Mayotte : environ $13^\\circ$ Sud et $45^\\circ$ Est."], solution: `Réponse : ${Q[1]}.` };
  };

  FIGURES["ep3-cours-volumes"] = () => sphere3({ labR: "r", aria: "Boule de centre O et de rayon r" }) + cone3({ labR: "r", labH: "h", aria: "Cône de révolution de rayon r et de hauteur h" });
  FIGURES["ep3-cours-sections"] = () => sphere3({ R: 5, d: 3, labR: "5 cm", labD: "3 cm", labS: "?", aria: "Sphère de rayon OM = 5 cm coupée à OH = 3 cm du centre ; triangle OHM rectangle en H" }) + pyramide3({ t: 0.5, aria: "Pyramide coupée parallèlement à sa base : la section est une réduction de la base" });
  FIGURES["ep3-cours-reperage"] = () => pave3({ L: 4, l: 3, h: 2, axes: true, marque: "G", labs: ["4", "3", "2"], aria: "Pavé droit dans un repère de l'espace d'origine A : AB = 4, BC = AD = 3, AE = 2 ; G(4 ; 3 ; 2)" }) + globe3({ point: [-13, 45, "Mayotte"], aria: "Globe : équateur, méridien de Greenwich et Mayotte, vers 13° Sud et 45° Est" });
  FIGURES["ep3-qcm-cone"] = () => cone3({ labR: "3 cm", labH: "4 cm", aria: "Cône de rayon 3 cm et de hauteur 4 cm" });
  FIGURES["ep3-qcm-pyr"] = () => pyramide3({ labC: "6 cm", labH: "5 cm", aria: "Pyramide à base carrée de côté 6 cm et de hauteur 5 cm" });
  FIGURES["ep3-qcm-boule"] = () => sphere3({ labR: "6 cm", aria: "Boule de rayon 6 cm" });
  FIGURES["ep3-qcm-section"] = () => sphere3({ R: 10, d: 6, labR: "10 cm", labD: "6 cm", labS: "?", aria: "Sphère de rayon OM = 10 cm coupée à OH = 6 cm du centre ; HM inconnu" });
  FIGURES["ep3-qcm-pave"] = () => pave3({ L: 5, l: 3, h: 2, axes: true, marque: "G", labs: ["5", "3", "2"], aria: "Pavé droit dans un repère de l'espace d'origine A : AB = 5, BC = AD = 3, AE = 2 ; le point G est marqué" });
  FIGURES["ep3-qcm-balles"] = () => cylindre3({ labR: "2 cm", labH: "12 cm", balles: 3, aria: "Boîte cylindrique de rayon 2 cm et de hauteur 12 cm contenant 3 balles de rayon 2 cm" });
  FIGURES["ep3-qcm-pyr-section"] = () => pyramide3({ labC: "8 cm", labH: "10 cm", t: 0.5, aria: "Pyramide de hauteur 10 cm à base carrée de côté 8 cm, coupée à mi-hauteur parallèlement à la base" });
  FIGURES["ep3-qcm-globe"] = () => globe3({ point: [-13, 45, "Mayotte"], aria: "Globe : équateur, méridien de Greenwich et un point marqué Mayotte" });

  /* =====================================================================
     Chapitre 16 : programmation (pg3-) — programmes de calcul, tracés, boucles et conditions, blocs personnalisés
     ===================================================================== */
  const B3 = (prog) => window.PM_EXO.blocs4(prog); // dessin des blocs (défini dans assets/exercices-quatrieme.js)
  const DRAP3 = { c: "evt", t: "quand le drapeau est cliqué" };
  const POLY3 = { 3: "triangle équilatéral", 4: "carré", 5: "pentagone régulier", 6: "hexagone régulier", 8: "octogone régulier", 10: "décagone régulier", 12: "dodécagone régulier" };

  // Tracé d'un polygone régulier par le lutin : un côté prolongé et l'angle dont il tourne (angle extérieur)
  function traceAngle3(n, lab, aria) {
    const P = [[0, 0]]; let h = 0; for (let i = 0; i < n; i++) { const q = P[P.length - 1]; P.push([q[0] + Math.cos(h), q[1] + Math.sin(h)]); h += (2 * Math.PI) / n; }
    const xs = P.map((p) => p[0]), ys = P.map((p) => p[1]), s = Math.min(170 / (Math.max(...xs) - Math.min(...xs)), 150 / (Math.max(...ys) - Math.min(...ys))), Q = P.map(([x, y]) => [70 + (x - Math.min(...xs)) * s, 28 + (y - Math.min(...ys)) * s]);
    const A = Q[1], E = [A[0] + (Q[1][0] - Q[0][0]) * 0.55, A[1] + (Q[1][1] - Q[0][1]) * 0.55];
    let c = `<polygon class="g-poly" points="${pl3(Q.slice(0, n))}"/>` + ln3(A[0], A[1], E[0], E[1], "g-guide") + arc3(A, E, Q[2], 24) + angLab3(A, E, Q[2], lab) + fl3(Q[0], [(Q[0][0] + Q[1][0]) / 2, (Q[0][1] + Q[1][1]) / 2], "g-segment") + tk3(Q[0][0] - 4, Q[0][1] - 6, "départ", "end");
    return sv3(320, 200, aria || `Polygone régulier à ${n} côtés tracé par le lutin ; à chaque sommet il tourne de l'angle ${lab} (angle extérieur)`, c);
  }

  GEN["pg3-calcul"] = function () {
    const a = rand(2, 6), b = nz(1, 9, true), t = rand(0, 1);
    // x → y = a x + b → z = y × x  (soit a x² + b x)
    const prog = B3([DRAP3, { c: "ent", t: "demander [Choisis un nombre] et attendre" }, { c: "var", t: "mettre [x] à [réponse]" }, { c: "var", t: `mettre [y] à [x * ${a}]` }, { c: "var", t: `ajouter [${b}] à [y]` }, { c: "var", t: "mettre [z] à [y * x]" }, { c: "dire", t: "dire [z]" }]);
    if (t === 0) { const x = nz(1, 9, true), r = (a * x + b) * x;
      return { enonce: `On lance ce programme et on répond $${rel(x)}$. Que dit le lutin ?`, figure: prog, mode: "nombre", prefixe: "Le lutin dit :", attendu: r,
        erreurs: [{ valeur: a * x + b, message: "N'oublie pas la dernière étape : $z = y \\times x$." }],
        aides: [`$x = ${rel(x)}$.`, `$y = ${rel(x)} \\times ${a} + ${relP(b)} = ${rel(a * x + b)}$.`, `$z = y \\times x$.`], solution: `$y = ${rel(a * x + b)}$ puis $z = ${rel(a * x + b)} \\times ${relP(x)} = ${rel(r)}$.` }; }
    const bonne = `$${poly(a, b, 0, "x")}$`, faux = uniq3(bonne, [`$${poly(0, a, b, "x")}$`, `$${poly(a, 0, b, "x")}$`, `$${poly(0, a + b, 0, "x")}$`, `$${poly(a, b * a, 0, "x")}$`]);
    const { choix, attendu } = melange(bonne, faux);
    return { enonce: "Si on répond $x$, quelle expression développée donne le nombre dit par le lutin ?", figure: prog, mode: "choix", choix, attendu,
      aides: ["Suis les variables avec la lettre $x$.", `$y = ${poly(0, a, b, "x")}$.`, `$z = (${poly(0, a, b, "x")}) \\times x$ ; développe.`], solution: `$z = (${poly(0, a, b, "x")}) \\times x = ${poly(a, b, 0, "x")}$.` };
  };

  GEN["pg3-dessin"] = function () {
    const t = rand(0, 2);
    if (t === 0) { const n = pick([3, 4, 5, 6, 8, 10, 12]), L = rand(3, 12) * 10;
      const prog = B3([DRAP3, { c: "stylo", t: "stylo en position d'écriture" }, { rep: n, corps: [{ c: "mvt", t: `avancer de [${L}] pas` }, { c: "mvt", t: "tourner ↻ de [ ? ] degrés" }] }]);
      return { enonce: `On veut tracer un ${POLY3[n]} de côté $${L}$ avec ce programme. Quel angle faut-il mettre à la place de « ? » ?`, figure: prog + traceAngle3(n, "?"), mode: "nombre", prefixe: "Angle :", suffixe: "°", attendu: 360 / n,
        erreurs: [{ valeur: 180 - 360 / n, message: "Le lutin tourne de l'angle extérieur : en tout, il fait un tour complet de $360^\\circ$." }, { valeur: 180 * (n - 2), message: "C'est la somme des angles intérieurs : le lutin tourne de $360 \\div " + n + "$ à chaque sommet." }],
        aides: ["Après tous les côtés, le lutin a fait un tour complet.", `Il tourne $${n}$ fois du même angle.`, `$360 \\div ${n}$.`], solution: `$360 \\div ${n} = ${nb(360 / n)}^\\circ$.` }; }
    if (t === 1) { const n = pick([3, 4, 5, 6]), m = pick([2, 3, 4, 5, 6, 8, 9, 10, 12]), L = rand(2, 9) * 10, A = 360 / n;
      const prog = B3([DRAP3, { c: "stylo", t: "stylo en position d'écriture" }, { rep: m, corps: [{ rep: n, corps: [{ c: "mvt", t: `avancer de [${L}] pas` }, { c: "mvt", t: `tourner ↻ de [${nb(A).replace("{,}", ",")}] degrés` }] }, { c: "mvt", t: `tourner ↻ de [${360 / m}] degrés` }] }]);
      return { enonce: "Quelle distance totale (en pas) le lutin parcourt-il avec ce programme ?", figure: prog, mode: "nombre", prefixe: "Distance :", suffixe: "pas", attendu: m * n * L,
        erreurs: [{ valeur: n * L, message: "La boucle intérieure est elle-même répétée : multiplie aussi par le nombre de répétitions extérieures." }, { valeur: m * L, message: "La boucle intérieure trace " + n + " côtés à chaque passage." }],
        aides: [`La boucle intérieure trace un ${POLY3[n]} : $${n} \\times ${L}$ pas.`, `Elle est répétée $${m}$ fois.`, `$${m} \\times ${n} \\times ${L}$.`], solution: `$${m} \\times ${n} \\times ${L} = ${m * n * L}$ pas (${m} ${POLY3[n]}s tournés autour d'un point).` }; }
    const n = pick([3, 4, 5, 6, 8]), L = rand(3, 12) * 10, c = rand(2, 5);
    const prog = B3([{ c: "ctrl", t: "définir [polygone] (côté)" }, { rep: n, corps: [{ c: "mvt", t: "avancer de [côté] pas" }, { c: "mvt", t: `tourner ↻ de [${nb(360 / n).replace("{,}", ",")}] degrés` }] }, DRAP3, { c: "ctrl", t: `polygone [${L}]` }, { c: "ctrl", t: `polygone [${L * c}]` }]);
    return { enonce: "Le bloc personnalisé « polygone » est défini en haut. Quelle est la longueur totale tracée (en pas) quand on clique sur le drapeau ?", figure: prog, mode: "nombre", prefixe: "Longueur :", suffixe: "pas", attendu: n * L * (1 + c),
      erreurs: [{ valeur: n * L, message: "Le bloc est appelé deux fois, avec deux valeurs différentes du paramètre « côté »." }, { valeur: L * (1 + c), message: "Chaque appel trace un polygone de " + n + " côtés : multiplie par " + n + "." }],
      aides: [`Le bloc trace un ${POLY3[n]} dont le côté est le paramètre.`, `Premier appel : $${n} \\times ${L}$ ; second : $${n} \\times ${L * c}$.`, "Additionne."], solution: `$${n} \\times ${L} + ${n} \\times ${L * c} = ${n * L * (1 + c)}$ pas.` };
  };

  GEN["pg3-boucles"] = function () {
    const t = rand(0, 3);
    if (t === 3) { // suite définie par une boucle « répéter n fois »
      const u0 = rand(1, 9), n = rand(2, 5), m = pick([2, 3]), b = pick([-1, 1, 2, 3, -2]), V = [u0]; for (let i = 0; i < n; i++) V.push(V[V.length - 1] * m + b);
      const prog = B3([DRAP3, { c: "var", t: `mettre [u] à [${u0}]` }, { rep: n, corps: [{ c: "var", t: `mettre [u] à [u * ${m}]` }, { c: "var", t: `ajouter [${b}] à [u]` }] }, { c: "dire", t: "dire [u]" }]);
      return { enonce: "Que dit le lutin à la fin de ce programme ?", figure: prog, mode: "nombre", prefixe: "Le lutin dit :", attendu: V[n],
        erreurs: [{ valeur: V[n - 1], message: `La boucle est exécutée $${n}$ fois : tu t'es arrêté un passage trop tôt.` }, { valeur: V[n] * m + b, message: `La boucle est exécutée $${n}$ fois seulement.` }, { valeur: u0 * m ** n + b, message: `On ajoute $${rel(b)}$ à chaque passage, pas seulement à la fin.` }],
        aides: [`Départ : $u = ${u0}$.`, `À chaque passage : $u \\leftarrow u \\times ${m}$, puis $u \\leftarrow u + ${relP(b)}$.`, `Fais un tableau des $${n}$ passages.`], solution: `$u$ prend les valeurs $${V.map(rel).join(" ; ")}$ : le lutin dit $${rel(V[n])}$.` };
    }
    if (t === 0) { // Syracuse : nombre de passages
      const x = rand(3, 40); let n = x, k = 0; while (n !== 1) { n = n % 2 ? 3 * n + 1 : n / 2; k++; }
      if (k > 24) return GEN["pg3-boucles"]();
      const prog = B3([DRAP3, { c: "var", t: `mettre [n] à [${x}]` }, { c: "var", t: "mettre [compteur] à [0]" }, { jusqua: "n = 1", corps: [{ si: "n modulo 2 = 0", alors: [{ c: "var", t: "mettre [n] à [n / 2]" }], sinon: [{ c: "var", t: "mettre [n] à [3 * n + 1]" }] }, { c: "var", t: "ajouter [1] à [compteur]" }] }, { c: "dire", t: "dire [compteur]" }]);
      return { enonce: "Que dit le lutin à la fin de ce programme ? (« n modulo 2 = 0 » signifie « n est pair ».)", figure: prog, mode: "nombre", prefixe: "Le lutin dit :", attendu: k,
        erreurs: [{ valeur: k + 1, message: "On s'arrête dès que $n = 1$ : ce dernier passage n'est pas compté." }, { valeur: k - 1, message: "Le passage qui donne $n = 1$ compte aussi : le compteur augmente avant le test suivant." }],
        aides: ["Si $n$ est pair, on le divise par $2$ ; sinon on calcule $3n + 1$.", `Départ : $n = ${x}$.`, "Note la suite des valeurs de $n$ et compte les passages."],
        solution: (() => { const L = [x]; let m = x; while (m !== 1) { m = m % 2 ? 3 * m + 1 : m / 2; L.push(m); } return `$n$ prend les valeurs ${liste3(L)} : il y a $${k}$ passages.`; })() };
    }
    if (t === 1) { // somme des multiples
      const k = rand(2, 7), N = rand(15, 60), S = Array.from({ length: Math.floor(N / k) }, (_, i) => (i + 1) * k).reduce((a, b) => a + b, 0);
      const prog = B3([DRAP3, { c: "var", t: "mettre [S] à [0]" }, { c: "var", t: "mettre [i] à [0]" }, { rep: N, corps: [{ c: "var", t: "ajouter [1] à [i]" }, { si: `i modulo ${k} = 0`, alors: [{ c: "var", t: "ajouter [i] à [S]" }] }] }, { c: "dire", t: "dire [S]" }]);
      return { enonce: `Que dit le lutin à la fin de ce programme ? (« i modulo ${k} = 0 » signifie « i est un multiple de ${k} ».)`, figure: prog, mode: "nombre", prefixe: "Le lutin dit :", attendu: S,
        erreurs: [{ valeur: Math.floor(N / k), message: "On ajoute la valeur de $i$, pas $1$ : c'est une somme, pas un comptage." }, { valeur: (N * (N + 1)) / 2, message: `On n'ajoute $i$ que si c'est un multiple de $${k}$.` }],
        aides: [`$i$ prend les valeurs $1$, $2$, …, $${N}$.`, `On ajoute $i$ à $S$ seulement si $i$ est un multiple de $${k}$.`, `Additionne les multiples de $${k}$ jusqu'à $${N}$.`], solution: `$S =$ ${liste3(Array.from({ length: Math.floor(N / k) }, (_, i) => (i + 1) * k), " + ")} $= ${S}$.` };
    }
    // compte à rebours avec condition
    const x = rand(20, 60), b = rand(3, 9); let n = x, c = 0; while (n > 0) { n -= b; c++; }
    const prog = B3([DRAP3, { c: "var", t: `mettre [n] à [${x}]` }, { c: "var", t: "mettre [tours] à [0]" }, { jusqua: "n < 1", corps: [{ c: "var", t: `ajouter [-${b}] à [n]` }, { c: "var", t: "ajouter [1] à [tours]" }] }, { si: "n = 0", alors: [{ c: "dire", t: "dire [tours]" }], sinon: [{ c: "dire", t: "dire [n]" }] }]);
    const r = n === 0 ? c : n;
    return { enonce: "Que dit le lutin à la fin de ce programme ?", figure: prog, mode: "nombre", prefixe: "Le lutin dit :", attendu: r,
      erreurs: [{ valeur: n === 0 ? n : c, message: `À la fin, regarde si $n$ vaut $0$ : le lutin dit ${n === 0 ? "« tours »" : "« n »"}.` }, { valeur: n === 0 ? c - 1 : n + b, message: "La boucle continue tant que $n \\geqslant 1$ : n'oublie pas le dernier passage." }],
      aides: [`À chaque passage, $n$ diminue de $${b}$.`, "La boucle s'arrête dès que $n < 1$.", `Après la boucle, $n$ vaut $${rel(n)}$ ${n === 0 ? "(égal à $0$)" : "(différent de $0$)"}.`],
      solution: `Après $${c}$ passages, $n = ${rel(n)}$. ${n === 0 ? `La condition $n = 0$ est vraie : le lutin dit $${c}$.` : `La condition $n = 0$ est fausse : le lutin dit $${rel(n)}$.`}` };
  };

  GEN["pg3-evenements"] = function () {
    const tir = Math.random();
    if (tir >= 0.5 && tir < 0.83) { // reste avec « modulo »
      const b = rand(2, 9), a = rand(b + 1, 99), Q = Math.floor(a / b), R = a % b, test = Math.random() < 0.5;
      if (test) {
        const prog = B3([DRAP3, { c: "var", t: `mettre [n] à [${a}]` }, { si: `n modulo ${b} = 0`, alors: [{ c: "dire", t: `dire [multiple de ${b}]` }], sinon: [{ c: "dire", t: "dire [n modulo " + b + "]" }] }]);
        const L = [R === 0 ? `« multiple de ${b} »` : `$${R}$`, `$${Q}$`, R === 0 ? `$${b}$` : `« multiple de ${b} »`, `$${a - b}$`, `$${R + 1}$`, `$${a}$`];
        const { choix, attendu } = melange(L[0], L.slice(1));
        return { enonce: "Que dit le lutin à la fin de ce programme ?", figure: prog, mode: "choix", choix, attendu, aides: [`« n modulo ${b} » est le reste de la division euclidienne de $n$ par $${b}$.`, `$${a} = ${b} \\times ${Q} + ${R}$.`, "Si le reste est nul, la condition est vraie."], solution: `$${a} = ${b} \\times ${Q} + ${R}$ : le reste vaut $${R}$, ${R === 0 ? `la condition est vraie, le lutin dit « multiple de ${b} »` : `la condition est fausse, le lutin dit $${R}$`}.` };
      }
      return { enonce: `Dans Scratch, que renvoie le bloc « $${a}$ modulo $${b}$ » ?`, mode: "nombre", prefixe: "Résultat :", attendu: R,
        erreurs: [{ valeur: Q, message: "C'est le quotient : « modulo » donne le reste de la division euclidienne." }, { valeur: arr(a / b, 2), message: "« modulo » ne donne pas le quotient décimal, mais le reste de la division euclidienne." }],
        aides: ["« a modulo b » est le reste de la division euclidienne de $a$ par $b$.", `Cherche le plus grand multiple de $${b}$ inférieur ou égal à $${a}$.`, `$${a} = ${b} \\times ${Q} + \\ldots$`], solution: `$${a} = ${b} \\times ${Q} + ${R}$, donc « $${a}$ modulo $${b}$ » vaut $${R}$.` };
    }
    if (tir < 0.5) {
      const s0 = rand(0, 5), k = rand(2, 6), p = rand(2, 6), q = rand(1, 4), m = rand(1, 3);
      const prog = B3([DRAP3, { c: "var", t: `mettre [points] à [${s0}]` }, { c: "evt", t: "quand ce lutin est cliqué" }, { c: "var", t: `ajouter [${k}] à [points]` }, { c: "ctrl", t: "envoyer à tous [bonus]" }, { c: "evt", t: "quand je reçois [bonus]" }, { c: "var", t: `ajouter [${m}] à [points]` }, { c: "evt", t: "quand la touche espace est pressée" }, { c: "var", t: "mettre [points] à [points * 2]" }]);
      const r = (s0 + p * (k + m)) * 2 ** q;
      return { enonce: `Ces scripts sont ceux d'un même lutin. On clique sur le drapeau, puis $${p}$ fois sur le lutin, puis on appuie $${q}$ fois sur espace. Que vaut « points » ?`, figure: prog, mode: "nombre", prefixe: "points =", attendu: r,
        erreurs: [{ valeur: (s0 + p * k) * 2 ** q, message: "Chaque clic envoie aussi le message « bonus », qui ajoute des points." }, { valeur: s0 + p * (k + m) + 2 * q, message: "La touche espace double les points (multiplication), elle n'ajoute pas $2$." }],
        aides: [`Chaque clic : $+${k}$, puis le message « bonus » : $+${m}$.`, `Après les clics : $${s0} + ${p} \\times ${k + m} = ${s0 + p * (k + m)}$.`, `Puis on double $${q}$ fois.`], solution: `$(${s0} + ${p} \\times ${k + m}) \\times 2^{${q}} = ${r}$.` };
    }
    const Q = pick([
      ["Le bloc « envoyer à tous [message] » sert à :", "déclencher les scripts « quand je reçois [message] »", ["afficher un texte", "arrêter le programme", "créer une variable"]],
      ["Un bloc personnalisé (« définir … ») sert à :", "regrouper des instructions réutilisables, avec des paramètres", ["dessiner un lutin", "remplacer les variables", "accélérer l'ordinateur"]],
      ["Dans « définir carré (côté) », « côté » est :", "un paramètre qui prend une valeur à chaque appel", ["une constante égale à $10$", "une boucle", "un message"]],
      ["Pour répéter des instructions tant qu'une condition n'est pas réalisée, on utilise :", "« répéter jusqu'à »", ["« si … alors »", "« répéter 10 fois »", "« envoyer à tous »"]],
      ["« n modulo 3 » donne :", "le reste de la division de $n$ par $3$", ["le quotient de $n$ par $3$", "$n \\times 3$", "$n - 3$"]],
      ["Pour tester qu'un nombre $n$ est pair, on écrit :", "« n modulo 2 = 0 »", ["« n / 2 = 0 »", "« n * 2 = 0 »", "« n - 2 = 0 »"]],
      ["Dans un « si … alors … sinon », lorsque la condition est vraie :", "seules les instructions du « alors » s'exécutent", ["les deux branches s'exécutent", "seules les instructions du « sinon » s'exécutent", "le programme s'arrête"]],
      ["Une variable sert à :", "mémoriser une valeur qui peut changer pendant le programme", ["dessiner un lutin", "envoyer un message", "répéter des instructions"]],
      ["Deux scripts commencent par « quand je reçois [go] ». Quand le message « go » est envoyé :", "les deux scripts démarrent", ["seul le premier démarre", "aucun ne démarre", "le programme s'arrête"]],
      ["Le bloc « quand la touche espace est pressée » est :", "un événement qui déclenche un script", ["une boucle", "une variable", "une condition « si »"]],
      ["Pour qu'un lutin fasse un tour complet sur lui-même, il doit tourner de :", "$360$ degrés", ["$180$ degrés", "$90$ degrés", "$100$ degrés"]]
    ]);
    const { choix, attendu } = melange(Q[1], Q[2]);
    return { enonce: Q[0], mode: "choix", choix, attendu, aides: ["Un événement ou un message déclenche un script.", "Un bloc personnalisé est un sous-programme qu'on peut appeler plusieurs fois.", "« modulo » donne le reste d'une division euclidienne."], solution: `Réponse : ${Q[1]}.` };
  };

  FIGURES["pg3-cours-calcul"] = () => B3([DRAP3, { c: "ent", t: "demander [Choisis un nombre] et attendre" }, { c: "var", t: "mettre [x] à [réponse]" }, { c: "var", t: "mettre [y] à [x * 3]" }, { c: "var", t: "ajouter [2] à [y]" }, { c: "var", t: "mettre [z] à [y * x]" }, { c: "dire", t: "dire [z]" }]);
  FIGURES["pg3-cours-boucles"] = () => B3([{ c: "ctrl", t: "définir [polygone] (côté)" }, { rep: 6, corps: [{ c: "mvt", t: "avancer de [côté] pas" }, { c: "mvt", t: "tourner ↻ de [60] degrés" }] }, DRAP3, { c: "stylo", t: "stylo en position d'écriture" }, { rep: 3, corps: [{ c: "ctrl", t: "polygone [40]" }, { c: "mvt", t: "tourner ↻ de [120] degrés" }] }]) + traceAngle3(6, "60°");
  FIGURES["pg3-cours-conditions"] = () => B3([DRAP3, { c: "var", t: "mettre [n] à [6]" }, { si: "n modulo 2 = 0", alors: [{ c: "var", t: "mettre [n] à [n / 2]" }], sinon: [{ c: "var", t: "mettre [n] à [3 * n + 1]" }] }, { c: "dire", t: "dire [n]" }, { c: "ctrl", t: "envoyer à tous [fini]" }, { c: "evt", t: "quand je reçois [fini]" }, { c: "dire", t: "dire [Bravo !]" }]);
  FIGURES["pg3-qcm-prog"] = () => B3([DRAP3, { c: "ent", t: "demander [Choisis un nombre] et attendre" }, { c: "var", t: "mettre [x] à [réponse]" }, { c: "var", t: "mettre [y] à [x - 4]" }, { c: "var", t: "mettre [y] à [y * y]" }, { c: "dire", t: "dire [y]" }]);
  FIGURES["pg3-qcm-trace"] = () => traceAngle3(5, "α");
  FIGURES["pg3-qcm-imbrique"] = () => B3([DRAP3, { c: "stylo", t: "stylo en position d'écriture" }, { rep: 4, corps: [{ rep: 3, corps: [{ c: "mvt", t: "avancer de [30] pas" }, { c: "mvt", t: "tourner ↻ de [120] degrés" }] }, { c: "mvt", t: "tourner ↻ de [90] degrés" }] }]);
  FIGURES["pg3-qcm-bloc"] = () => B3([{ c: "ctrl", t: "définir [carré] (côté)" }, { rep: 4, corps: [{ c: "mvt", t: "avancer de [côté] pas" }, { c: "mvt", t: "tourner ↻ de [90] degrés" }] }, DRAP3, { c: "ctrl", t: "carré [20]" }, { c: "ctrl", t: "carré [50]" }]);
  FIGURES["pg3-qcm-jusqua"] = () => B3([DRAP3, { c: "var", t: "mettre [n] à [50]" }, { jusqua: "n < 10", corps: [{ c: "var", t: "ajouter [-15] à [n]" }] }, { c: "dire", t: "dire [n]" }]);
  FIGURES["pg3-qcm-msg"] = () => B3([DRAP3, { c: "var", t: "mettre [score] à [0]" }, { c: "evt", t: "quand ce lutin est cliqué" }, { c: "var", t: "ajouter [3] à [score]" }, { c: "ctrl", t: "envoyer à tous [bonus]" }, { c: "evt", t: "quand je reçois [bonus]" }, { c: "var", t: "ajouter [1] à [score]" }]);
  FIGURES["pg3-qcm-si"] = () => B3([DRAP3, { c: "var", t: "mettre [n] à [15]" }, { si: "n modulo 3 = 0", alors: [{ c: "dire", t: "dire [Fizz]" }], sinon: [{ c: "dire", t: "dire [n]" }] }]);

  /* Une « erreur connue » ne doit jamais coïncider avec la bonne réponse, ni apparaître deux fois */
  Object.keys(GEN).filter((k) => /^(cn3|dv3|fc3|eq3|ar3|fn3|fa3|pp3|pr3|st3|th3|ts3|tg3|tf3|ep3|pg3)-/.test(k)).forEach((k) => {
    const g = GEN[k];
    GEN[k] = (i) => {
      const q = g(i);
      // Élisions après insertion d'un prénom, d'une ville ou d'un nom : « de Ousseni » → « d'Ousseni », « du immeuble » → « de l'immeuble »
      const V = "(?=[AEIOUÉÈÂÎaeiouéèâêîôû])(?!onze|oui|ouate|yaourt)";
      const el = (s) => (typeof s === "string" ? s.replace(new RegExp(`(^|[\\s(«])([Dd])e ${V}`, "g"), "$1$2'").replace(new RegExp(`(^|[\\s(«])([Dd])u ${V}`, "g"), "$1$2e l'").replace(new RegExp(`(^|[\\s(«])([Qq])ue ${V}(?=il|elle|on|un)`, "g"), "$1$2u'").replace(new RegExp(`(^|[\\s(«])([Ll])[ea] ${V}(?!un\\b|une\\b)`, "g"), "$1$2'") : s);
      q.enonce = el(q.enonce); q.solution = el(q.solution); if (q.aides) q.aides = q.aides.map(el); if (q.choix) q.choix = q.choix.map(el); if (q.erreurs) q.erreurs.forEach((e) => { e.message = el(e.message); });
      if (q.erreurs) q.erreurs = q.erreurs.filter((e, j, T) => isFinite(e.valeur) && Math.abs(e.valeur - q.attendu) >= (q.tolerance || 1e-9) && T.findIndex((f) => Math.abs(f.valeur - e.valeur) < 1e-9) === j);
      return q;
    };
  });
})();
