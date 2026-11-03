/*
  ENTRAÎNEMENT : Terminale maths expertes — chapitre 10, Graphes et matrice d'adjacence
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre expertes-graphes.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths expertes.
  Le cours énonce le théorème d'Euler pour les chaînes ; le cas des chaînes fermées est admis dans l'énoncé.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
(function () {
  // graphe dans le style de ceux du cours (grapheG de assets/exercices-expertes.js) : sommets [nom, x, y], arêtes [a, b, "ajout"?]
  const graphe = (o) => {
    const R = 14, pos = {}, f1 = (v) => +v.toFixed(1);
    o.sommets.forEach(([n, x, y]) => (pos[n] = [x, y]));
    const cles = new Set(o.aretes.map(([a, b]) => a + ">" + b));
    const pointe = (x, y, dx, dy) => { const L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L; return `<path d="M${f1(x)} ${f1(y)}L${f1(x - 9 * ux - 4 * uy)} ${f1(y - 9 * uy + 4 * ux)}L${f1(x - 9 * ux + 4 * uy)} ${f1(y - 9 * uy - 4 * ux)}Z" style="fill:var(--encre)"/>`; };
    let s = `<svg class="graph" viewBox="0 0 320 ${o.h || 200}" role="img" aria-label="${o.aria}">`;
    o.aretes.forEach(([a, b, ajout]) => {
      const [x1, y1] = pos[a], [x2, y2] = pos[b], L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L, ny = (x2 - x1) / L;
      const k = o.oriente && cles.has(b + ">" + a) ? 15 : 0, qx = (x1 + x2) / 2 + k * nx, qy = (y1 + y2) / 2 + k * ny;
      const u1 = Math.hypot(qx - x1, qy - y1), u2 = Math.hypot(qx - x2, qy - y2);
      const sx = x1 + (R * (qx - x1)) / u1, sy = y1 + (R * (qy - y1)) / u1, ex = x2 + ((R + 1) * (qx - x2)) / u2, ey = y2 + ((R + 1) * (qy - y2)) / u2;
      s += `<path d="M${f1(sx)} ${f1(sy)}Q${f1(qx)} ${f1(qy)} ${f1(ex)} ${f1(ey)}" style="fill:none;stroke:var(--${ajout ? "ylang" : "encre"});stroke-width:${ajout ? "2.5;stroke-dasharray:6 4" : 1.5}"/>`;
      if (o.oriente) s += pointe(ex, ey, ex - qx, ey - qy);
    });
    o.sommets.forEach(([n, x, y]) => { s += `<circle cx="${x}" cy="${y}" r="${R}" style="fill:var(--surface);stroke:var(--lagon);stroke-width:2"/><text x="${x}" y="${y + 4.5}" text-anchor="middle" style="font:700 13px var(--f-texte);fill:var(--encre)">${n}</text>`; });
    return s + `</svg>`;
  };
  const VILLAGES = [["A", 40, 100], ["B", 120, 40], ["C", 120, 160], ["D", 220, 40], ["E", 220, 160], ["F", 290, 100]];
  const ROUTES = [["A", "B"], ["A", "C"], ["B", "C"], ["B", "D"], ["B", "E"], ["C", "E"], ["D", "E"], ["D", "F"], ["E", "F"]];

  window.EVALUATIONS["expertes-graphes"] = {
    revisions: {
      intro: "Les graphes en un coup d'œil : vocabulaire, somme des degrés, graphe complet, chaînes et connexité, matrice d'adjacence et nombre de chemins, théorème d'Euler. Relis, repère les pièges, puis teste-toi.",
      essentiel: [
        {
          titre: "Vocabulaire",
          texte: "Un graphe est formé de sommets reliés par des arêtes. Son **ordre** est le nombre de sommets ; deux sommets reliés sont **adjacents** ; le **degré** d'un sommet est le nombre d'arêtes qui en partent."
        },
        {
          titre: "Somme des degrés",
          texte: "La somme des degrés est égale au **double** du nombre d'arêtes, car chaque arête compte pour ses deux extrémités. Elle est donc paire, et le nombre de sommets de degré impair est pair."
        },
        {
          titre: "Graphe complet",
          texte: "Dans le graphe complet $K_n$, tous les sommets sont adjacents deux à deux : chacun est de degré $n - 1$, et il y a $\\dfrac{n(n - 1)}{2}$ arêtes. Par exemple, $K_5$ a $10$ arêtes."
        },
        {
          titre: "Chaînes et connexité",
          texte: "La **longueur** d'une chaîne est son nombre d'arêtes. Un graphe est **connexe** si deux sommets quelconques sont reliés par une chaîne ; la **distance** entre deux sommets est la longueur d'une plus courte chaîne qui les relie."
        },
        {
          titre: "Matrice d'adjacence",
          texte: "Les sommets étant numérotés, $a_{ij}$ est le nombre d'arêtes (ou d'arcs) du sommet $i$ vers le sommet $j$ : la ligne correspond au départ. Le coefficient $(i\\,;j)$ de $A^n$ est le nombre de chemins de longueur $n$ de $i$ vers $j$."
        },
        {
          titre: "Théorème d'Euler",
          texte: "Un graphe connexe possède une chaîne passant une fois et une seule par chaque arête si et seulement si il a $0$ ou $2$ sommets de degré impair. S'il y en a $2$, la chaîne part de l'un et arrive à l'autre."
        }
      ],
      pieges: [
        "Confondre l'ordre (nombre de sommets) et le nombre d'arêtes.",
        "Compter les sommets au lieu des arêtes pour la longueur d'une chaîne.",
        "Oublier de diviser par $2$ : la somme des degrés est le double du nombre d'arêtes.",
        "Écrire $n^2$ ou $n(n - 1)$ arêtes pour le graphe complet : c'est $\\dfrac{n(n - 1)}{2}$.",
        "Inverser ligne et colonne dans la matrice d'un graphe orienté : la ligne est le départ.",
        "Lire $A$ au lieu de $A^n$ pour les chemins de longueur $n$, ou élever chaque coefficient au carré pour obtenir $A^2$."
      ]
    },

    evaluation: {
      intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
      exercices: [
        {
          titre: "Les routes entre six villages",
          duree: 25, points: 7, calculatrice: false,
          contexte: "Le graphe ci-dessous représente les routes entre six villages, notés A, B, C, D, E et F : une arête relie deux villages quand une route directe les relie.",
          figure: () => graphe({ sommets: VILLAGES, aretes: ROUTES, aria: "Graphe à six sommets A, B, C, D, E, F et neuf arêtes : A–B, A–C, B–C, B–D, B–E, C–E, D–E, D–F, E–F" }),
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Donne l'ordre du graphe et le degré de chaque sommet. Déduis-en le nombre de routes.",
              indice: "Le degré d'un sommet est le nombre d'arêtes qui en partent. La somme des degrés est le double du nombre d'arêtes.",
              corrige: "Le graphe a $6$ sommets : il est d'ordre $6$. Les degrés sont :",
              tableauCorrige: { lignes: [["\\text{Sommet}", "\\text{A}", "\\text{B}", "\\text{C}", "\\text{D}", "\\text{E}", "\\text{F}"], ["\\text{Degré}", "2", "4", "3", "3", "4", "2"]] },
              corrigeFin: "La somme des degrés vaut $18$, le double du nombre d'arêtes : il y a $9$ routes."
            },
            {
              n: "2.", points: 1.5,
              texte: "Le graphe est-il complet ? Est-il connexe ? Détermine la distance entre A et F.",
              indice: "La distance est la longueur d'une plus courte chaîne. Les voisins de A sont B et C.",
              corrige: "Il n'est pas complet : par exemple, A et D ne sont pas adjacents. Il est connexe : la chaîne A – B – D – F – E – C passe par tous les sommets.\n\nAucun des voisins de A (B et C) n'est relié à F : aucune chaîne de longueur $1$ ou $2$ ne relie A à F. La chaîne A – B – D – F a pour longueur $3$ : la distance entre A et F vaut $3$."
            },
            {
              n: "3.", points: 2,
              texte: "Un agent d'entretien veut parcourir chaque route une fois et une seule. Est-ce possible ? Si oui, d'où doit-il partir et où arrivera-t-il ? Propose un tel parcours.",
              indice: "Théorème d'Euler : un graphe connexe a une chaîne qui passe une fois et une seule par chaque arête si et seulement si il a $0$ ou $2$ sommets de degré impair.",
              corrige: "Le graphe est connexe et a exactement deux sommets de degré impair, C et D : c'est possible, en partant de C pour arriver à D, ou l'inverse.\n\nPar exemple : C – A – B – C – E – B – D – E – F – D, qui emprunte les $9$ routes une fois chacune."
            },
            {
              n: "4.", points: 2,
              texte: "On admet qu'un graphe connexe a une chaîne **fermée** passant une fois et une seule par chaque arête si et seulement si tous ses sommets sont de degré pair. Combien de routes faut-il construire, au minimum, pour que l'agent puisse revenir à son point de départ ? Lesquelles ?",
              indice: "Quels sommets sont de degré impair ? Une nouvelle route augmente de $1$ le degré de ses deux extrémités.",
              corrige: "Il faut rendre tous les degrés pairs. Seuls C et D sont de degré impair, et ils ne sont pas reliés : une seule route, entre C et D, suffit. C et D passent au degré $4$, et le parcours C – A – B – C – E – B – D – E – F – D – C revient à son point de départ.",
              figureCorrige: () => graphe({ sommets: VILLAGES, aretes: ROUTES.concat([["C", "D", true]]), aria: "Le graphe des six villages avec la nouvelle route C–D en pointillés : tous les sommets sont alors de degré pair" })
            }
          ]
        },
        {
          titre: "Liens entre pages web",
          duree: 25, points: 7, calculatrice: false,
          contexte: "Le graphe orienté ci-dessous représente les liens entre quatre pages web A, B, C et D : un arc de X vers Y signifie que la page X contient un lien vers la page Y.",
          figure: () => graphe({ sommets: [["A", 70, 45], ["B", 250, 45], ["C", 70, 165], ["D", 250, 165]], aretes: [["A", "B"], ["A", "C"], ["C", "A"], ["B", "C"], ["C", "D"], ["D", "B"]], oriente: true, aria: "Graphe orienté à quatre sommets avec les arcs A→B, A→C, C→A, B→C, C→D et D→B" }),
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Écris la matrice d'adjacence $M$ de ce graphe, les sommets étant rangés dans l'ordre A, B, C, D.",
              indice: "La ligne d'un sommet indique les arcs qui en partent : un $1$ dans la colonne de chaque page vers laquelle il pointe.",
              corrige: "Ligne A : A pointe vers B et C. Ligne B : vers C. Ligne C : vers A et D. Ligne D : vers B. Donc $M = \\begin{pmatrix} 0 & 1 & 1 & 0 \\\\ 0 & 0 & 1 & 0 \\\\ 1 & 0 & 0 & 1 \\\\ 0 & 1 & 0 & 0 \\end{pmatrix}$."
            },
            {
              n: "2.", points: 1.5,
              texte: "Calcule $M^2$.",
              indice: "Le coefficient ligne $i$, colonne $j$ de $M^2$ s'obtient avec la ligne $i$ et la colonne $j$ de $M$.",
              corrige: "$M^2 = \\begin{pmatrix} 1 & 0 & 1 & 1 \\\\ 1 & 0 & 0 & 1 \\\\ 0 & 2 & 1 & 0 \\\\ 0 & 0 & 1 & 0 \\end{pmatrix}$.\n\nPar exemple, le coefficient ligne C, colonne B vaut $1 \\times 1 + 0 \\times 0 + 0 \\times 0 + 1 \\times 1 = 2$."
            },
            {
              n: "3.", points: 2,
              texte: "Combien y a-t-il de chemins de longueur $2$ de C vers B ? Écris-les. Combien de chemins de longueur $2$ partent de A ?",
              indice: "Lis la ligne C, colonne B de $M^2$, puis additionne les coefficients de la ligne A.",
              corrige: "Le coefficient ligne C, colonne B de $M^2$ vaut $2$ : ce sont C → A → B et C → D → B.\n\nLa ligne A de $M^2$ a pour somme $1 + 0 + 1 + 1 = 3$ : ce sont A → B → C, A → C → A et A → C → D."
            },
            {
              n: "4.", points: 2,
              texte: "On admet que $M^3 = \\begin{pmatrix} 1 & 2 & 1 & 1 \\\\ 0 & 2 & 1 & 0 \\\\ 1 & 0 & 2 & 1 \\\\ 1 & 0 & 0 & 1 \\end{pmatrix}$. Combien y a-t-il de chemins de longueur $3$ de A vers B ? Écris-les. Peut-on aller de la page B à la page A en exactement $3$ clics ?",
              indice: "Lis les coefficients ligne A, colonne B, et ligne B, colonne A, de $M^3$.",
              corrige: "Le coefficient ligne A, colonne B de $M^3$ vaut $2$ : A → C → A → B et A → C → D → B.\n\nLe coefficient ligne B, colonne A de $M^3$ vaut $0$ : aucun chemin de longueur $3$ ne mène de B à A. On peut pourtant aller de B à A en $2$ clics, par B → C → A (coefficient $1$ dans $M^2$)."
            }
          ]
        },
        {
          titre: "Poignées de mains",
          duree: 20, points: 6, calculatrice: false,
          contexte: "On modélise des poignées de mains par un graphe : les sommets sont les personnes, et une arête relie deux personnes qui se sont serré la main. Les questions sont indépendantes.",
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "À la fin d'une réunion, chaque participant a serré la main de chacun des autres une fois, ce qui fait $66$ poignées de mains. Combien y avait-il de participants ?",
              indice: "Le graphe est complet, et $K_n$ a $\\dfrac{n(n - 1)}{2}$ arêtes.",
              corrige: "Le graphe est le graphe complet $K_n$, qui a $\\dfrac{n(n - 1)}{2}$ arêtes. Donc $n(n - 1) = 132 = 12 \\times 11$, et comme $n(n - 1)$ augmente avec $n$, $n = 12$ : il y avait $12$ participants."
            },
            {
              n: "2.", points: 1.5,
              texte: "Est-il possible que $7$ personnes aient chacune serré la main d'exactement $3$ des autres ?",
              indice: "Calcule la somme des degrés.",
              corrige: "La somme des degrés vaudrait $7 \\times 3 = 21$, un nombre impair. Or elle est toujours égale au double du nombre d'arêtes, donc paire : c'est impossible."
            },
            {
              n: "3.", points: 1.5,
              texte: "Dans un groupe de $9$ personnes, montre qu'au moins une personne a serré un nombre pair de mains.",
              indice: "Combien de sommets peuvent être de degré impair ?",
              corrige: "La somme des degrés est paire, donc le nombre de sommets de degré impair est pair. Il ne peut pas valoir $9$ : au plus $8$ personnes ont serré un nombre impair de mains, donc au moins une en a serré un nombre pair (peut-être $0$)."
            },
            {
              n: "4.", points: 1.5,
              texte: "Un graphe d'ordre $6$ a des sommets de degrés $5$, $4$, $3$, $3$, $2$ et $1$. Combien a-t-il d'arêtes ? Dessine un tel graphe.",
              indice: "Le sommet de degré $5$ est relié à tous les autres. Commence par là, puis complète les degrés restants.",
              corrige: "La somme des degrés vaut $18$ : le graphe a $9$ arêtes. Par exemple, avec A de degré $5$, B de degré $4$, C et D de degré $3$, E de degré $2$ et F de degré $1$ : A est relié à tous les autres sommets, B à C, D et E, et C à D.",
              figureCorrige: () => graphe({ sommets: [["A", 160, 33], ["B", 231, 74], ["C", 231, 156], ["D", 160, 197], ["E", 89, 156], ["F", 89, 74]], aretes: [["A", "B"], ["A", "C"], ["A", "D"], ["A", "E"], ["A", "F"], ["B", "C"], ["B", "D"], ["B", "E"], ["C", "D"]], h: 230, aria: "Graphe à six sommets de degrés 5, 4, 3, 3, 2 et 1 : A relié à tous, B relié à C, D et E, C relié à D" })
            }
          ]
        }
      ]
    }
  };
})();
