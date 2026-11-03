/*
  ENTRAÎNEMENT : Seconde — chapitre 9, Variations et extremums ; fonctions carré et valeur absolue
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre seconde-variations.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle ou devoir commun de Seconde.
  Les tableaux de variations sont dessinés comme ceux du cours (tabvar de assets/lycee/seconde.js, recopié ici
  dans une fonction locale pour que la page n'attende pas les générateurs du niveau).
*/
(() => {
  // Tableau de variations : valeurs de x, valeurs de f au bout des flèches (en haut si la valeur dépasse la précédente)
  const tabvar = (xs, ys, aria) => {
    const W = 320, H = 112, g = 52, L = (W - g - 26) / (xs.length - 1), X = (k) => g + 12 + k * L;
    const nb = (v) => String(v).replace("-", "−").replace(".", ",");
    let s = `<svg class="graph tabvar" viewBox="0 0 ${W} ${H}" role="img" aria-label="${aria}">`;
    s += `<g class="g-axis"><rect x="1" y="1" width="${W - 2}" height="${H - 2}" fill="none" stroke-width="1.2" style="stroke:var(--doux)"/><line x1="1" y1="30" x2="${W - 1}" y2="30"/><line x1="${g}" y1="1" x2="${g}" y2="${H - 1}"/></g>`;
    s += `<text class="g-label" x="${g / 2}" y="20" text-anchor="middle" style="font-style:italic">x</text><text class="g-label" x="${g / 2}" y="76" text-anchor="middle" style="font-style:italic">f</text>`;
    const haut = ys.map((y, k) => (k === 0 ? y > ys[1] : y > ys[k - 1]));
    xs.forEach((x, k) => { s += `<text class="g-label" x="${X(k)}" y="20" text-anchor="middle">${nb(x)}</text><text class="g-label" x="${X(k)}" y="${haut[k] ? 48 : 102}" text-anchor="middle">${nb(ys[k])}</text>`; });
    for (let k = 0; k < xs.length - 1; k++) {
      const y1 = haut[k] ? 54 : 90, y2 = haut[k + 1] ? 54 : 90, x1 = X(k) + 12, x2 = X(k + 1) - 12;
      const a = Math.atan2(y2 - y1, x2 - x1), hx = x2 - 7 * Math.cos(a - 0.45), hy = y2 - 7 * Math.sin(a - 0.45), kx = x2 - 7 * Math.cos(a + 0.45), ky = y2 - 7 * Math.sin(a + 0.45);
      s += `<line x1="${x1.toFixed(1)}" y1="${y1}" x2="${x2.toFixed(1)}" y2="${y2}" style="stroke:var(--lagon);stroke-width:1.8"/><path d="M${x2.toFixed(1)} ${y2} L${hx.toFixed(1)} ${hy.toFixed(1)} L${kx.toFixed(1)} ${ky.toFixed(1)}z" style="fill:var(--lagon)"/>`;
    }
    return s + `</svg>`;
  };

  window.EVALUATIONS = window.EVALUATIONS || {};
  window.EVALUATIONS["seconde-variations"] = {
    revisions: {
      intro: "Les variations en un coup d'œil : sens de variation, tableau, maximum et minimum, fonctions carré et valeur absolue, optimisation. Relis, repère les pièges, puis teste-toi.",
      essentiel: [
        {
          titre: "Croissante, décroissante",
          texte: "$f$ est **croissante** sur $I$ si, pour tous $a < b$ de $I$, $f(a) \\leqslant f(b)$ : la courbe monte. Elle est **décroissante** si $f(a) \\geqslant f(b)$ : l'ordre s'inverse. On lit la courbe de gauche à droite, et les intervalles sont des valeurs de $x$."
        },
        {
          titre: "Tableau de variations",
          texte: "Première ligne : les valeurs de $x$ ; seconde ligne : des flèches, avec les valeurs de $f(x)$ au bout. Ici, le **maximum** est $3$, atteint en $x = -2$ ; le **minimum** est $-1$, atteint en $x = 1$.",
          figure: () => tabvar([-2, 1, 3], [3, -1, 2], "Tableau de variations : f(−2) = 3, f décroissante jusqu'à f(1) = −1, puis croissante jusqu'à f(3) = 2")
        },
        {
          titre: "Fonction carré",
          texte: "$x^2 \\geqslant 0$ ; la fonction carré est décroissante sur $]-\\infty\\,;0]$ et croissante sur $[0\\,;+\\infty[$, de minimum $0$ en $0$. Pour des nombres positifs, les carrés sont dans le même ordre ; pour des nombres négatifs, l'ordre s'inverse : $-5 < -2$ mais $25 > 4$."
        },
        {
          titre: "$x$ et $x^2$",
          texte: "Pour $0 \\leqslant x \\leqslant 1$ : $x^2 \\leqslant x$. Pour $x \\geqslant 1$ : $x^2 \\geqslant x$. On le démontre avec le signe de $x^2 - x = x(x - 1)$."
        },
        {
          titre: "Encadrer $x^2$",
          texte: "On regarde si $0$ est dans l'intervalle. Pour $1 \\leqslant x \\leqslant 3$ : $1 \\leqslant x^2 \\leqslant 9$. Pour $-1 \\leqslant x \\leqslant 3$ : le minimum est $0$, donc $0 \\leqslant x^2 \\leqslant 9$."
        },
        {
          titre: "$x^2 = k$ et $x^2 < k$",
          texte: "Pour $k > 0$ : $x^2 = k \\iff x = -\\sqrt{k}$ ou $x = \\sqrt{k}$ ; $x^2 < k \\iff -\\sqrt{k} < x < \\sqrt{k}$ ; $x^2 > k \\iff x < -\\sqrt{k}$ ou $x > \\sqrt{k}$. Si $k < 0$, $x^2 = k$ n'a aucune solution."
        },
        {
          titre: "Valeur absolue",
          texte: "$|x|$ est la distance entre $x$ et $0$ : $|x| = x$ si $x \\geqslant 0$, $|x| = -x$ si $x < 0$. Sa courbe est un V, de minimum $0$ en $0$. Pour $k > 0$ : $|x| = k \\iff x = -k$ ou $x = k$, et $|x| < k \\iff -k < x < k$."
        },
        {
          titre: "Optimiser",
          texte: "On exprime la quantité en fonction de $x$, avec ses valeurs possibles, puis on cherche le maximum : tableau de valeurs, courbe ou calcul. Une parabole qui s'annule en deux valeurs a son extremum **au milieu**. En Python, un **balayage** donne une valeur approchée, d'autant plus précise que le pas est petit."
        }
      ],
      pieges: [
        "Lire les intervalles de variation sur l'axe des ordonnées : ce sont des valeurs de $x$.",
        "Confondre le maximum, qui est une valeur de $f(x)$, et la valeur de $x$ où il est atteint.",
        "Oublier une solution : $x^2 = 25$ a deux solutions, $-5$ et $5$.",
        "Écrire $x^2 < 16 \\iff x < 4$ : il manque la condition $x > -4$.",
        "Ranger les carrés de nombres négatifs dans le même ordre : $-5 < -1$ mais $(-5)^2 > (-1)^2$.",
        "Croire que $x^2 \\geqslant x$ pour tout $x$ positif : $0{,}3^2 = 0{,}09 < 0{,}3$.",
        "Pour $-2 \\leqslant x \\leqslant 3$, écrire $4 \\leqslant x^2 \\leqslant 9$ : comme $0$ est dans l'intervalle, le minimum de $x^2$ est $0$."
      ]
    },

    evaluation: {
      intro: "Trois exercices comme en contrôle ou au devoir commun (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
      exercices: [
        {
          titre: "Un tableau de variations",
          duree: 25, points: 7, calculatrice: false,
          contexte: "Une fonction $f$ est définie sur $[-4\\,;5]$. Voici son tableau de variations.",
          figure: () => tabvar([-4, -1, 2, 5], [1, 4, -3, 2], "Tableau de variations de f : f(−4) = 1, f croissante jusqu'à f(−1) = 4, décroissante jusqu'à f(2) = −3, puis croissante jusqu'à f(5) = 2"),
          questions: [
            {
              n: "1.", points: 1,
              texte: "Sur quels intervalles $f$ est-elle croissante ? décroissante ?",
              indice: "Une flèche qui monte indique que $f$ est croissante. Les intervalles se lisent sur la ligne des $x$.",
              corrige: "$f$ est croissante sur $[-4\\,;-1]$ et sur $[2\\,;5]$, décroissante sur $[-1\\,;2]$."
            },
            {
              n: "2.", points: 1.5,
              texte: "Quels sont le maximum et le minimum de $f$ sur $[-4\\,;5]$ ? En quelles valeurs de $x$ sont-ils atteints ?",
              indice: "Compare les valeurs en haut des flèches ($4$ et $2$), puis celles du bas ($1$ et $-3$).",
              corrige: "Le maximum est $4$, atteint en $x = -1$ : il dépasse $2$, l'autre valeur du haut. Le minimum est $-3$, atteint en $x = 2$ : il est plus petit que $1$, l'autre valeur du bas."
            },
            {
              n: "3.", points: 1.5,
              texte: "Compare, en justifiant : a) $f(-3)$ et $f(-2)$ ; b) $f(0)$ et $f(1)$ ; c) $f(3)$ et $f(-1)$.",
              indice: "a) et b) : les deux nombres sont dans un même intervalle où $f$ est monotone. c) : que vaut $f(-1)$ ? Et entre quelles valeurs est $f(3)$ ?",
              corrige: "a) $-3 < -2$ dans $[-4\\,;-1]$, où $f$ est croissante : $f(-3) \\leqslant f(-2)$. b) $0 < 1$ dans $[-1\\,;2]$, où $f$ est décroissante, donc l'ordre s'inverse : $f(0) \\geqslant f(1)$. c) $f$ est croissante sur $[2\\,;5]$, donc $f(3) \\leqslant f(5) = 2$. Comme $2 < 4 = f(-1)$, on a $f(3) < f(-1)$."
            },
            {
              n: "4.", points: 1.5,
              texte: "Combien de solutions ont les équations $f(x) = 0$ et $f(x) = 5$ sur $[-4\\,;5]$ ?",
              indice: "Pour chaque flèche, regarde si $0$ est entre les valeurs de ses deux extrémités. Et $5$ dépasse-t-il le maximum ?",
              corrige: "$f(x) = 0$ : sur $[-4\\,;-1]$, $f(x)$ va de $1$ à $4$ et ne s'annule pas ; sur $[-1\\,;2]$, il descend de $4$ à $-3$ et passe une fois par $0$ ; sur $[2\\,;5]$, il monte de $-3$ à $2$ et passe encore une fois par $0$. L'équation a **deux** solutions. L'équation $f(x) = 5$ n'en a **aucune** : le maximum de $f$ est $4$."
            },
            {
              n: "5.", points: 1.5,
              texte: "a) Justifie que $-3 \\leqslant f(x) \\leqslant 4$ pour tout $x$ de $[-4\\,;5]$. b) Peut-on connaître le signe de $f(0)$ ?",
              indice: "a) Utilise le maximum et le minimum. b) $0$ est entre $-1$ et $2$ : que sait-on de $f(x)$ sur cet intervalle ?",
              corrige: "a) Le minimum de $f$ est $-3$ et son maximum est $4$, donc $-3 \\leqslant f(x) \\leqslant 4$ pour tout $x$ de $[-4\\,;5]$. b) Non. Sur $[-1\\,;2]$, $f$ descend de $4$ à $-3$ : on sait seulement que $-3 \\leqslant f(0) \\leqslant 4$. Deux fonctions qui ont ce tableau peuvent avoir $f(0) > 0$ pour l'une et $f(0) < 0$ pour l'autre."
            }
          ]
        },
        {
          titre: "Carré et valeur absolue",
          duree: 25, points: 7, calculatrice: false,
          contexte: "Les questions sont indépendantes. Justifie chaque réponse avec les propriétés du cours.",
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Compare sans calculer : a) $(-4{,}2)^2$ et $(-3{,}9)^2$ ; b) $0{,}97^2$ et $0{,}97$.",
              indice: "a) Les deux nombres sont négatifs : quel est le sens de variation de la fonction carré sur $]-\\infty\\,;0]$ ? b) $0{,}97$ est entre $0$ et $1$.",
              corrige: "a) $-4{,}2 < -3{,}9 \\leqslant 0$ et la fonction carré est décroissante sur $]-\\infty\\,;0]$ : l'ordre s'inverse, donc $(-4{,}2)^2 > (-3{,}9)^2$. b) $0 \\leqslant 0{,}97 \\leqslant 1$, donc $0{,}97^2 \\leqslant 0{,}97$ (en effet $0{,}97^2 = 0{,}9409$)."
            },
            {
              n: "2.", points: 1.5,
              texte: "Encadre $x^2$ dans chaque cas : a) $2 \\leqslant x \\leqslant 5$ ; b) $-4 \\leqslant x \\leqslant 1$.",
              indice: "a) La fonction carré est croissante sur $[0\\,;+\\infty[$. b) Attention, $0$ est dans l'intervalle : où le carré est-il le plus petit ? le plus grand ?",
              corrige: "a) La fonction carré est croissante sur $[0\\,;+\\infty[$, donc $2^2 \\leqslant x^2 \\leqslant 5^2$, soit $4 \\leqslant x^2 \\leqslant 25$. b) Sur $[-4\\,;0]$, $x^2$ descend de $16$ à $0$ ; sur $[0\\,;1]$, il monte de $0$ à $1$. Donc $0 \\leqslant x^2 \\leqslant 16$, et non $1 \\leqslant x^2 \\leqslant 16$."
            },
            {
              n: "3.", points: 1.5,
              texte: "Résous dans $\\mathbb{R}$ : a) $x^2 = 49$ ; b) $x^2 < 5$ ; c) $x^2 \\geqslant 16$.",
              indice: "Pense aux deux nombres $-\\sqrt{k}$ et $\\sqrt{k}$. La parabole est sous la droite $y = k$ entre eux, et au-dessus à l'extérieur.",
              corrige: "a) $x = -7$ ou $x = 7$. b) $x^2 < 5 \\iff -\\sqrt{5} < x < \\sqrt{5}$, soit $S = ]-\\sqrt{5}\\,;\\sqrt{5}[$. c) $x^2 \\geqslant 16 \\iff x \\leqslant -4$ ou $x \\geqslant 4$, soit $S = ]-\\infty\\,;-4] \\cup [4\\,;+\\infty[$."
            },
            {
              n: "4.", points: 1,
              texte: "Résous : a) $|x| = 2{,}5$ ; b) $|x| < 6$.",
              indice: "$|x|$ est la distance entre $x$ et $0$.",
              corrige: "a) Les nombres à la distance $2{,}5$ de $0$ : $x = -2{,}5$ ou $x = 2{,}5$. b) Les nombres à moins de $6$ de $0$ : $-6 < x < 6$, soit $S = ]-6\\,;6[$."
            },
            {
              n: "5.", points: 1.5,
              texte: "Démontre que la fonction carré est décroissante sur $]-\\infty\\,;0]$ : pour deux réels $a < b \\leqslant 0$, étudie le signe de $b^2 - a^2$.",
              indice: "Factorise $b^2 - a^2$ avec une identité remarquable, puis cherche le signe de chaque facteur.",
              corrige: "$b^2 - a^2 = (b - a)(b + a)$. Comme $a < b$, $b - a > 0$. Comme $a < b \\leqslant 0$, on a $a < 0$ et $b \\leqslant 0$, donc $b + a < 0$. Le produit d'un nombre positif par un nombre négatif est négatif : $b^2 - a^2 < 0$, soit $a^2 > b^2$. L'ordre s'inverse : la fonction carré est décroissante sur $]-\\infty\\,;0]$."
            }
          ]
        },
        {
          titre: "Le potager le long du mur",
          duree: 20, points: 6, calculatrice: true,
          contexte: "À Bandrélé, Madi veut un potager rectangulaire contre le mur de sa maison. Il a $30$ m de grillage pour les trois autres côtés. On note $x$ la largeur du potager, en mètres : les deux côtés perpendiculaires au mur mesurent $x$.",
          figure: () => {
            let s = `<svg class="graph" viewBox="0 0 320 140" role="img" aria-label="Un potager rectangulaire contre un mur : les deux côtés perpendiculaires au mur mesurent x ; les trois côtés qui ne touchent pas le mur sont grillagés">`;
            s += `<g style="stroke:var(--doux);stroke-width:1.2">`;
            for (let x = 50; x <= 270; x += 10) s += `<line x1="${x}" y1="30" x2="${x + 8}" y2="22"/>`;
            s += `</g><line x1="50" y1="30" x2="278" y2="30" style="stroke:var(--encre);stroke-width:3"/>`;
            s += `<rect x="90" y="30" width="140" height="76" style="fill:var(--lagon-pale)"/><polyline points="90,30 90,106 230,106 230,30" style="fill:none;stroke:var(--ylang);stroke-width:2.5;stroke-dasharray:6 3"/>`;
            s += `<text class="g-label" x="160" y="15" text-anchor="middle">mur</text><text class="g-label" x="160" y="72" text-anchor="middle">potager</text>`;
            s += `<text class="g-label" x="80" y="72" text-anchor="end" style="font-style:italic;font-size:13px">x</text><text class="g-label" x="240" y="72" style="font-style:italic;font-size:13px">x</text>`;
            return s + `<text class="g-label" x="160" y="128" text-anchor="middle" style="font-weight:400">grillage en pointillés : 30 m en tout</text></svg>`;
          },
          questions: [
            {
              n: "1.", points: 1,
              texte: "Exprime en fonction de $x$ la longueur du côté parallèle au mur. Quelles sont les valeurs possibles de $x$ ?",
              indice: "Les trois côtés grillagés mesurent $x$, $x$ et la longueur cherchée, pour un total de $30$ m.",
              corrige: "$x + x + L = 30$, donc $L = 30 - 2x$. Les longueurs sont positives : $x \\geqslant 0$ et $30 - 2x \\geqslant 0$, soit $x \\leqslant 15$. Donc $x \\in [0\\,;15]$."
            },
            {
              n: "2.", points: 1,
              texte: "Montre que l'aire du potager, en m², est $A(x) = 30x - 2x^2$. Calcule $A(5)$ et $A(10)$.",
              indice: "Aire d'un rectangle : largeur fois longueur.",
              corrige: "$A(x) = x(30 - 2x) = 30x - 2x^2$. Puis $A(5) = 5 \\times 20 = 100$ et $A(10) = 10 \\times 10 = 100$ : deux potagers différents de $100$ m²."
            },
            {
              n: "3.", points: 1.5,
              texte: "Résous $A(x) = 0$. Par symétrie, pour quelle valeur de $x$ l'aire semble-t-elle maximale ? Calcule cette aire.",
              indice: "$A(x) = x(30 - 2x)$ : un produit est nul si l'un de ses facteurs est nul. La parabole s'annule en deux valeurs, son sommet est au milieu.",
              corrige: "$x(30 - 2x) = 0 \\iff x = 0$ ou $x = 15$. Le milieu de $0$ et $15$ est $7{,}5$ (c'est aussi le milieu de $5$ et $10$, qui ont la même image). $A(7{,}5) = 7{,}5 \\times 15 = 112{,}5$ m²."
            },
            {
              n: "4.", points: 1.5,
              texte: "Vérifie que $A(x) = 112{,}5 - 2(x - 7{,}5)^2$, puis démontre que $A(x) \\leqslant 112{,}5$ pour tout $x$. Quelles sont les dimensions du plus grand potager ?",
              indice: "Développe $(x - 7{,}5)^2$ avec une identité remarquable. Un carré est toujours positif.",
              corrige: "$(x - 7{,}5)^2 = x^2 - 15x + 56{,}25$, donc $112{,}5 - 2(x - 7{,}5)^2 = 112{,}5 - 2x^2 + 30x - 112{,}5 = A(x)$. Comme $(x - 7{,}5)^2 \\geqslant 0$, on a $A(x) \\leqslant 112{,}5$, avec égalité seulement pour $x = 7{,}5$. Le plus grand potager mesure $7{,}5$ m sur $15$ m, pour $112{,}5$ m²."
            },
            {
              n: "5.", points: 1,
              texte:
                "On reprend la fonction de balayage du cours, écrite avec un nom plus court : $\\texttt{m}$ garde la meilleure valeur de $x$ trouvée.\n\n" +
                "```python\ndef balayage(f, a, b, pas):\n    x = a\n    m = a\n    while x <= b:\n        if f(x) > f(m):\n            m = x\n        x = x + pas\n    return m\n```\n\n" +
                "Que renvoie $\\texttt{balayage(A, 0, 15, 2)}$ ? Pourquoi n'obtient-on pas $7{,}5$ ?",
              indice: "Avec un pas de $2$, la fonction teste $x = 0$, puis $2$, $4$… jusqu'à $14$. Calcule $A(6)$ et $A(8)$.",
              corrige: "Les valeurs testées sont $0$ ; $2$ ; $4$ ; … ; $14$. Les plus grandes aires sont $A(6) = 108$ et $A(8) = 112$ : la fonction renvoie $8$. Avec un pas de $2$, la valeur $7{,}5$ n'est jamais testée : le balayage ne donne qu'une valeur approchée. Avec un pas de $0{,}5$, on obtiendrait $7{,}5$."
            }
          ]
        }
      ]
    }
  };
})();
