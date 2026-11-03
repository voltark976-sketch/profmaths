/*
  SUJET : Terminale maths expertes — Sujet type bac n° 1 (sujet original, données fictives)
  Page #sujet-expertes-1 ; PDF de l'énoncé et du corrigé fabriqués par outils/sujets-pdf.js.
  Même format que data/seconde/sujets/devoir-commun-1.js. Deux heures, calculatrice autorisée, trois exercices :
  équation de degré 3 et triangle dans le plan complexe ; équation diophantienne et congruences ; chaîne de Markov à
  deux états. Équations et matrices différentes de celles du cours et des onglets Évaluation du niveau.
*/
window.SUJETS = window.SUJETS || {};
(function () {
  // graphe probabiliste : copie du tracé de data/expertes/evaluation/suites-matrices-markov.js
  const graphe = (o) => {
    const R = 15, pos = {}, f1 = (v) => +v.toFixed(1);
    o.sommets.forEach(([n, x, y]) => (pos[n] = [x, y]));
    const cles = new Set(o.arcs.map(([a, b]) => a + ">" + b));
    const pointe = (x, y, dx, dy) => { const L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L; return `<path d="M${f1(x)} ${f1(y)}L${f1(x - 9 * ux - 4 * uy)} ${f1(y - 9 * uy + 4 * ux)}L${f1(x - 9 * ux + 4 * uy)} ${f1(y - 9 * uy - 4 * ux)}Z" style="fill:var(--encre)"/>`; };
    const poids = (x, y, w) => `<text x="${f1(x)}" y="${f1(y + 4)}" text-anchor="middle" style="font:700 11px var(--f-texte);fill:var(--lagon);paint-order:stroke;stroke:var(--surface);stroke-width:4px;stroke-linejoin:round">${w}</text>`;
    let traits = "", etiq = "";
    o.arcs.forEach(([a, b, w, t]) => {
      if (a === b) {
        const [x, y] = pos[a], d = (u, r) => [x + r * Math.cos(u), y + r * Math.sin(u)];
        const [p1x, p1y] = d(t - 0.42, R), [p2x, p2y] = d(t + 0.42, R + 1), [c1x, c1y] = d(t - 0.75, 46), [c2x, c2y] = d(t + 0.75, 46), [lx, ly] = d(t, 44);
        traits += `<path d="M${f1(p1x)} ${f1(p1y)}C${f1(c1x)} ${f1(c1y)} ${f1(c2x)} ${f1(c2y)} ${f1(p2x)} ${f1(p2y)}" style="fill:none;stroke:var(--encre);stroke-width:1.5"/>` + pointe(p2x, p2y, p2x - c2x, p2y - c2y);
        etiq += poids(lx, ly, w);
        return;
      }
      const [x1, y1] = pos[a], [x2, y2] = pos[b], L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L, ny = (x2 - x1) / L;
      const k = cles.has(b + ">" + a) ? 15 : 0, qx = (x1 + x2) / 2 + k * nx, qy = (y1 + y2) / 2 + k * ny;
      const u1 = Math.hypot(qx - x1, qy - y1), u2 = Math.hypot(qx - x2, qy - y2);
      const sx = x1 + (R * (qx - x1)) / u1, sy = y1 + (R * (qy - y1)) / u1, ex = x2 + ((R + 1) * (qx - x2)) / u2, ey = y2 + ((R + 1) * (qy - y2)) / u2;
      traits += `<path d="M${f1(sx)} ${f1(sy)}Q${f1(qx)} ${f1(qy)} ${f1(ex)} ${f1(ey)}" style="fill:none;stroke:var(--encre);stroke-width:1.5"/>` + pointe(ex, ey, ex - qx, ey - qy);
      const mx = 0.25 * x1 + 0.5 * qx + 0.25 * x2, my = 0.25 * y1 + 0.5 * qy + 0.25 * y2, dd = k ? 10 : 11;
      etiq += poids(mx + dd * nx, my + dd * ny, w);
    });
    let s = `<svg class="graph" viewBox="0 0 320 ${o.h || 200}" role="img" aria-label="${o.aria}">` + traits;
    o.sommets.forEach(([n, x, y]) => { s += `<circle cx="${x}" cy="${y}" r="${R}" style="fill:var(--surface);stroke:var(--lagon);stroke-width:2"/><text x="${x}" y="${y + 4.5}" text-anchor="middle" style="font:700 13px var(--f-texte);fill:var(--encre)">${n}</text>`; });
    return s + etiq + `</svg>`;
  };
  window.SUJETS["expertes-1"] = {
    entete: "Terminale maths expertes · Sujet type bac n° 1 · Durée : 2 heures",
    consignes: "La calculatrice est **autorisée**. Les trois exercices sont indépendants. La qualité de la rédaction, la clarté et la précision des raisonnements sont prises en compte.",
    exercices: [
      {
        numero: "Exercice 1", titre: "Une équation de degré 3 et un triangle",
        duree: 40, points: 7, calculatrice: true,
        contexte: "On considère le polynôme $P$ défini pour tout nombre complexe $z$ par $P(z) = z^3 - 8z^2 + 22z - 20$. Le plan complexe est muni d'un repère orthonormé direct.",
        questions: [
          { n: "1.", points: 0.5, texte: "Vérifie que $2$ est une racine de $P$.", corrige: "$P(2) = 8 - 32 + 44 - 20 = 0$ : $2$ est une racine de $P$." },
          { n: "2.", points: 1, texte: "Détermine les réels $a$ et $b$ tels que, pour tout complexe $z$, $P(z) = (z - 2)(z^2 + az + b)$.", indice: "Développe $(z - 2)(z^2 + az + b)$ et identifie les coefficients avec ceux de $P$.", corrige: "$(z - 2)(z^2 + az + b)$\n${} = z^3 + (a - 2)z^2$ ${} + (b - 2a)z - 2b$\n\nPar identification : $a - 2 = -8$, $b - 2a = 22$ et $-2b = -20$, d'où $a = -6$ et $b = 10$ (et l'on vérifie $10 + 12 = 22$). Ainsi $P(z) = (z - 2)(z^2 - 6z + 10)$." },
          { n: "3.", points: 1.5, texte: "Résous dans $\\mathbb{C}$ l'équation $P(z) = 0$.", indice: "Un produit est nul si l'un de ses facteurs est nul ; pour le trinôme, calcule le discriminant.", corrige: "$P(z) = 0 \\iff z = 2$ ou $z^2 - 6z + 10 = 0$. Pour le trinôme, $\\Delta = 36 - 40 = -4 = (2i)^2$ :\n\n$z = \\dfrac{6 - 2i}{2} = 3 - i$ ou $z = \\dfrac{6 + 2i}{2} = 3 + i$\n\nLes solutions sont $2$, $3 + i$ et $3 - i$." },
          { n: "4.", points: 1.5, texte: "On note $A$, $B$ et $C$ les points d'affixes $2$, $3 + i$ et $3 - i$. Calcule $\\dfrac{z_B - z_A}{z_C - z_A}$ sous forme algébrique, puis déduis-en la nature du triangle $ABC$.", indice: "Multiplie le numérateur et le dénominateur par le conjugué du dénominateur. Le module du quotient compare $AB$ et $AC$, son argument donne l'angle en $A$.", corrige: "$\\dfrac{z_B - z_A}{z_C - z_A} = \\dfrac{1 + i}{1 - i} = \\dfrac{(1 + i)^2}{(1 - i)(1 + i)} = \\dfrac{2i}{2} = i$\n\nLe module vaut $|i| = 1$, donc $AB = AC$. Un argument est $\\dfrac{\\pi}{2}$, donc $\\left(\\overrightarrow{AC}, \\overrightarrow{AB}\\right) = \\dfrac{\\pi}{2}$ à $2\\pi$ près. Le triangle $ABC$ est rectangle et isocèle en $A$." },
          { n: "5.", points: 1.5, texte: "Écris $1 + i$ sous forme exponentielle, puis détermine les entiers naturels $n$ pour lesquels $(1 + i)^n$ est un réel.", indice: "Un complexe non nul est réel si et seulement si un de ses arguments est un multiple de $\\pi$.", corrige: "$|1 + i| = \\sqrt{2}$ et un argument est $\\dfrac{\\pi}{4}$ : $1 + i = \\sqrt{2}\\,e^{i\\pi/4}$. Donc :\n\n$(1 + i)^n = \\left(\\sqrt{2}\\right)^n e^{in\\pi/4}$\n\nCe complexe non nul est réel si et seulement si $\\dfrac{n\\pi}{4}$ est un multiple de $\\pi$, c'est-à-dire si $n$ est un multiple de $4$. Par exemple, $(1 + i)^4 = 4\\,e^{i\\pi} = -4$." },
          { n: "6.", points: 1, texte: "Détermine l'affixe du point $D$ tel que $ABDC$ soit un carré.", indice: "Un parallélogramme $ABDC$ vérifie $\\overrightarrow{AB} = \\overrightarrow{CD}$ ; avec la question 4, ce parallélogramme est un carré.", corrige: "$ABDC$ est un parallélogramme si et seulement si $\\overrightarrow{AB} = \\overrightarrow{CD}$, soit $z_D = z_B + z_C - z_A = (3 + i) + (3 - i) - 2 = 4$.\n\nCe parallélogramme a deux côtés consécutifs $[AB]$ et $[AC]$ de même longueur et perpendiculaires (question 4) : c'est un carré. Le point $D$ a pour affixe $4$." }
        ]
      },
      {
        numero: "Exercice 2", titre: "Deux phares sur la côte",
        duree: 40, points: 7, calculatrice: true,
        contexte: "On considère l'équation $(E)$ : $13x - 8y = 1$, où $x$ et $y$ sont des entiers relatifs.",
        questions: [
          { n: "1.", points: 1, texte: "Justifie que l'équation $(E)$ admet des solutions.", indice: "Calcule le PGCD de $13$ et $8$, puis pense au théorème de Bézout.", corrige: "$13$ est premier et ne divise pas $8$, donc $\\mathrm{PGCD}(13, 8) = 1$. D'après le théorème de Bézout, il existe des entiers relatifs $u$ et $v$ tels que $13u + 8v = 1$. Le couple $(x\\,;y) = (u\\,;-v)$ vérifie alors $13x - 8y = 1$ : l'équation $(E)$ a des solutions." },
          { n: "2.", points: 1, texte: "Vérifie que le couple $(5\\,;8)$ est solution de $(E)$.", corrige: "$13 \\times 5 - 8 \\times 8 = 65 - 64 = 1$ : le couple $(5\\,;8)$ est solution de $(E)$." },
          { n: "3.", points: 2, texte: "Résous l'équation $(E)$ dans $\\mathbb{Z}^2$.", indice: "Soustrais l'égalité $13 \\times 5 - 8 \\times 8 = 1$ à $13x - 8y = 1$, puis utilise le théorème de Gauss.", corrige: "Si $(x\\,;y)$ est solution, en soustrayant $13 \\times 5 - 8 \\times 8 = 1$ : $13(x - 5) = 8(y - 8)$.\n\n$8$ divise $13(x - 5)$ et $8$ est premier avec $13$ : d'après le théorème de Gauss, $8$ divise $x - 5$. Il existe donc un entier $k$ tel que $x = 5 + 8k$, puis $13 \\times 8k = 8(y - 8)$ donne $y = 8 + 13k$.\n\nRéciproquement, $13(5 + 8k) - 8(8 + 13k) = 65 - 64 = 1$. Les solutions sont les couples $(5 + 8k\\,;8 + 13k)$, avec $k \\in \\mathbb{Z}$." },
          { n: "4.", points: 1, texte: "Montre que $13^2 \\equiv 1\\ [8]$, puis détermine le reste de la division euclidienne de $13^{2026}$ par $8$.", indice: "$13 \\equiv 5\\ [8]$ ; écris $2026 = 2 \\times 1\\,013$.", corrige: "$13 \\equiv 5\\ [8]$, donc $13^2 \\equiv 25 \\equiv 1\\ [8]$ (car $25 = 3 \\times 8 + 1$). Alors :\n\n$13^{2026} = \\left(13^2\\right)^{1\\,013} \\equiv 1^{1\\,013} \\equiv 1\\ [8]$\n\nLe reste de la division de $13^{2026}$ par $8$ est $1$." },
          { n: "5.", points: 1.5, texte: "Un phare A s'allume aux instants $13x$ (en secondes, $x$ entier naturel) et un phare B aux instants $8y + 1$ ($y$ entier naturel). Montre qu'ils s'allument en même temps exactement aux instants $65 + 104k$, $k$ entier naturel.", indice: "Les deux phares s'allument au même instant quand $13x = 8y + 1$ : c'est l'équation $(E)$.", corrige: "Les phares s'allument en même temps à l'instant $t$ si et seulement si $t = 13x = 8y + 1$ avec $x$ et $y$ entiers naturels, c'est-à-dire si $(x\\,;y)$ est solution de $(E)$ avec $x \\geqslant 0$ et $y \\geqslant 0$.\n\nD'après la question 3, $x = 5 + 8k$ et $y = 8 + 13k$ ; ils sont positifs ou nuls si et seulement si $k \\geqslant 0$. Alors $t = 13(5 + 8k) = 65 + 104k$, avec $k$ entier naturel." },
          { n: "6.", points: 0.5, texte: "Combien de fois s'allument-ils en même temps pendant la première heure ?", corrige: "$65 + 104k \\leqslant 3\\,600 \\iff k \\leqslant \\dfrac{3\\,535}{104} \\approx 33{,}99$, donc $k$ va de $0$ à $33$ : les deux phares s'allument en même temps $34$ fois pendant la première heure." }
        ]
      },
      {
        numero: "Exercice 3", titre: "Pluie et beau temps pendant la saison des pluies",
        duree: 40, points: 6, calculatrice: true,
        contexte: "Pendant la saison des pluies, on modélise le temps qu'il fait chaque jour : s'il pleut un jour, il pleut le lendemain avec la probabilité $0{,}55$ ; s'il fait sec un jour, il pleut le lendemain avec la probabilité $0{,}15$ (données fictives). On note $P$ l'état « il pleut » et $S$ l'état « il fait sec », et $\\pi_n = \\begin{pmatrix} p_n & q_n \\end{pmatrix}$ la distribution le jour $n$.",
        questions: [
          {
            n: "1.", points: 1, texte: "Représente la situation par un graphe probabiliste, puis donne la matrice de transition $M$ (états dans l'ordre $P$, $S$).",
            indice: "Chaque ligne de la matrice correspond à un état de départ ; la somme de chaque ligne vaut $1$.",
            corrige: "De $P$ : vers $P$ avec $0{,}55$, vers $S$ avec $0{,}45$. De $S$ : vers $P$ avec $0{,}15$, vers $S$ avec $0{,}85$.\n\n$M = \\begin{pmatrix} 0{,}55 & 0{,}45 \\\\ 0{,}15 & 0{,}85 \\end{pmatrix}$",
            figureCorrige: () => graphe({ sommets: [["P", 95, 70], ["S", 225, 70]], arcs: [["P", "P", "0,55", Math.PI], ["P", "S", "0,45"], ["S", "P", "0,15"], ["S", "S", "0,85", 0]], h: 140, aria: "Graphe probabiliste à deux sommets P et S : boucle 0,55 sur P, de P vers S 0,45, de S vers P 0,15, boucle 0,85 sur S" })
          },
          { n: "2.", points: 1.5, texte: "Il pleut le lundi (jour $0$). Calcule $\\pi_1$ et $\\pi_2$. Quelle est la probabilité qu'il pleuve le mercredi ?", indice: "$\\pi_0 = \\begin{pmatrix} 1 & 0 \\end{pmatrix}$ et $\\pi_{n+1} = \\pi_nM$.", corrige: "$\\pi_0 = \\begin{pmatrix} 1 & 0 \\end{pmatrix}$, donc $\\pi_1 = \\pi_0M = \\begin{pmatrix} 0{,}55 & 0{,}45 \\end{pmatrix}$.\n\n$p_2 = 0{,}55 \\times 0{,}55 + 0{,}45 \\times 0{,}15 = 0{,}37$ et $q_2 = 1 - 0{,}37 = 0{,}63$ : $\\pi_2 = \\begin{pmatrix} 0{,}37 & 0{,}63 \\end{pmatrix}$.\n\nLa probabilité qu'il pleuve le mercredi (jour $2$) est $0{,}37$." },
          { n: "3.", points: 1, texte: "Montre que, pour tout entier naturel $n$, $p_{n+1} = 0{,}4\\,p_n + 0{,}15$.", indice: "Écris la première coordonnée de $\\pi_nM$, puis utilise $q_n = 1 - p_n$.", corrige: "La première coordonnée de $\\pi_{n+1} = \\pi_nM$ donne $p_{n+1} = 0{,}55\\,p_n + 0{,}15\\,q_n$. Comme $q_n = 1 - p_n$ :\n\n$p_{n+1} = 0{,}55\\,p_n + 0{,}15 - 0{,}15\\,p_n = 0{,}4\\,p_n + 0{,}15$" },
          { n: "4.", points: 1.5, texte: "Détermine la distribution invariante $\\pi = \\begin{pmatrix} a & b \\end{pmatrix}$, telle que $\\pi M = \\pi$ et $a + b = 1$.", indice: "La première coordonnée de $\\pi M = \\pi$ donne $0{,}55a + 0{,}15b = a$.", corrige: "$\\pi M = \\pi$ donne $0{,}55a + 0{,}15b = a$, soit $0{,}15b = 0{,}45a$, donc $b = 3a$. Avec $a + b = 1$ : $4a = 1$, d'où $a = 0{,}25$ et $b = 0{,}75$.\n\nLa distribution invariante est $\\pi = \\begin{pmatrix} 0{,}25 & 0{,}75 \\end{pmatrix}$." },
          { n: "5.", points: 1, texte: "Montre que $(p_n)$ converge vers $0{,}25$ et interprète ce résultat.", indice: "Pose $u_n = p_n - 0{,}25$ : la suite $(u_n)$ est géométrique.", corrige: "Avec $u_n = p_n - 0{,}25$ : $u_{n+1} = 0{,}4\\,p_n + 0{,}15 - 0{,}25 = 0{,}4\\,(p_n - 0{,}25) = 0{,}4\\,u_n$. La suite $(u_n)$ est géométrique de raison $0{,}4$, comprise entre $-1$ et $1$ : elle tend vers $0$, donc $p_n$ tend vers $0{,}25$.\n\nÀ long terme, quel que soit le temps du premier jour, il pleut environ un jour sur quatre pendant la saison des pluies, selon ce modèle." }
        ]
      }
    ]
  };
})();
