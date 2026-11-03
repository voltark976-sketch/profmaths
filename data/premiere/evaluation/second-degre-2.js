/*
  ENTRAÎNEMENT : Première spécialité — chapitre 5, Second degré 2 : forme canonique et discriminant
  -----------------------------------------------------------------------------------------------
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre premiere-second-degre-2.
  Le site ne télécharge ce fichier qu'à l'ouverture de l'un de ces deux onglets (champ « eval » du manifeste :
  relancer   node outils/manifeste.js   après avoir ajouté un fichier comme celui-ci).

  revisions : intro, essentiel (cartes { titre, texte, figure? }), pieges (liste de phrases).
    Les questions flash et le défi chrono sont tirés des séries du chapitre : rien à écrire ici.
  evaluation : intro, exercices [{ titre, duree (min), points, calculatrice, contexte, figure?, questions }].
    Une question : { n, texte, points, indice, corrige, tableauCorrige?, figureCorrige?, corrigeFin? } ;
    { partie: "…" } est un intertitre (Partie A…).
  Figures : une fonction qui reçoit les outils communs (o.graph de assets/exercices-base.js), pour ne pas
  télécharger les générateurs du niveau ; ou le nom d'une figure du chapitre.
  Mêmes règles d'écriture que les chapitres : formules entre $...$, antislash doublé, **gras**, "- " pour une puce,
  virgule décimale {,} dans les formules. Exercices sans calculatrice, comme la partie 2 de l'épreuve anticipée.
  Les valeurs des corrigés ont été recalculées par un script avant la mise en ligne.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["premiere-second-degre-2"] = {
  revisions: {
    intro: "Tout le chapitre en un coup d'œil : les trois écritures d'un trinôme, le discriminant et le signe. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Trois écritures d'un même trinôme",
        texte:
          "- développée : $ax^2 + bx + c$ ;\n" +
          "- canonique : $a(x - \\alpha)^2 + \\beta$ ;\n" +
          "- factorisée : $a(x - x_1)(x - x_2)$.\n\n" +
          "Le coefficient $a$ est le même dans les trois."
      },
      {
        titre: "Forme canonique",
        texte:
          "$\\alpha = -\\dfrac{b}{2a}$ et $\\beta = f(\\alpha)$.\n\n" +
          "Ou on complète le carré :\n\n" +
          "$x^2 + 6x + 2 = (x + 3)^2 - 7$, car $(x + 3)^2 = x^2 + 6x + 9$."
      },
      {
        titre: "Extremum",
        texte:
          "- Si $a > 0$ : $f$ décroît puis croît, son **minimum** $\\beta$ est atteint en $x = \\alpha$.\n" +
          "- Si $a < 0$ : $f$ croît puis décroît, son **maximum** $\\beta$ est atteint en $x = \\alpha$.\n\n" +
          "Dans $(x + 3)^2$, on lit $\\alpha = -3$."
      },
      {
        titre: "Discriminant",
        texte:
          "Équation écrite sous la forme $ax^2 + bx + c = 0$.\n\n" +
          "Discriminant : $\\Delta = b^2 - 4ac$.\n\n" +
          "- $\\Delta > 0$ : deux solutions $x_1$ et $x_2$ ;\n" +
          "- $\\Delta = 0$ : une seule solution $x_0 = -\\dfrac{b}{2a}$ ;\n" +
          "- $\\Delta < 0$ : aucune solution réelle.\n\n" +
          "$x_1 = \\dfrac{-b - \\sqrt{\\Delta}}{2a}$ et $x_2 = \\dfrac{-b + \\sqrt{\\Delta}}{2a}$."
      },
      {
        titre: "Factoriser",
        texte:
          "- $\\Delta > 0$ : $a(x - x_1)(x - x_2)$ ;\n" +
          "- $\\Delta = 0$ : $a(x - x_0)^2$ ;\n" +
          "- $\\Delta < 0$ : pas de factorisation en facteurs du premier degré.\n\n" +
          "Avant de calculer $\\Delta$, cherche un facteur commun : $x^2 - 7x = x(x - 7)$."
      },
      {
        titre: "Signe du trinôme",
        texte:
          "Du **signe de $a$ à l'extérieur** des racines, du signe contraire entre elles. Sans racine, il est du signe de $a$ partout.\n\n" +
          "Pour une inéquation : tout passer à gauche, chercher les racines, faire le tableau de signes, lire les intervalles (crochets fermés seulement pour $\\leqslant$ ou $\\geqslant$).",
        figure: (o) => o.graph({
          xmin: -2.6, xmax: 4.6, ymin: -2.6, ymax: 3.2, h: 210, xetiq: 10, yetiq: 10,
          curves: [{ f: (x) => 0.5 * (x + 1) * (x - 3), a: -2.2, b: 4.2, closed: false }],
          points: [{ x: -1, y: 0, label: "x₁", gauche: true }, { x: 3, y: 0, label: "x₂" }],
          marques: [
            { x: -2, y: 0.9, texte: "<tspan style=\"font-size:22px;fill:var(--bon)\">+</tspan>" },
            { x: 1, y: 0.7, texte: "<tspan style=\"font-size:22px;fill:var(--faux)\">−</tspan>" },
            { x: 4, y: 0.9, texte: "<tspan style=\"font-size:22px;fill:var(--bon)\">+</tspan>" }
          ],
          aria: "Parabole tournée vers le haut (a positif) qui coupe l'axe en x1 et x2 : le trinôme est positif à l'extérieur des racines, négatif entre elles"
        })
      },
      {
        titre: "Choisir la bonne forme",
        texte:
          "- $f(0)$ et les images : forme développée ;\n" +
          "- extremum et variations : forme canonique ;\n" +
          "- racines, signe, inéquations : forme factorisée."
      },
      {
        titre: "Décaler une courbe",
        texte: "La courbe de $x \\mapsto f(x - m)$ est celle de $f$ décalée de $m$ unités vers la **droite** si $m > 0$, vers la gauche si $m < 0$."
      },
      {
        titre: "Position de deux courbes",
        texte:
          "On étudie le signe de la différence $f(x) - g(x)$ :\n\n" +
          "- les points communs ont pour abscisses les solutions de $f(x) = g(x)$ ;\n" +
          "- la courbe de $f$ est au-dessus de celle de $g$ là où la différence est positive."
      }
    ],
    pieges: [
      "Lire $\\alpha = 3$ dans $(x + 3)^2$ : c'est $\\alpha = -3$, la valeur qui annule la parenthèse.",
      "Écrire $-3^2 = -9$ au lieu de $(-3)^2 = 9$ dans $\\Delta$ : mets les nombres négatifs entre parenthèses.",
      "Diviser par $2$ au lieu de $2a$ dans $\\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$.",
      "Oublier $a$ dans la forme factorisée : $2x^2 - 2x - 12 = 2(x + 2)(x - 3)$.",
      "Confondre le signe de $\\Delta$, qui donne le nombre de racines, et le signe du trinôme.",
      "Confondre le maximum $\\beta$ (une valeur de $f$) et l'endroit $\\alpha$ où il est atteint."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Les achards de Mariama",
        duree: 25, points: 7, calculatrice: false,
        contexte:
          "Mariama fabrique et vend des pots d'achards de mangue à Bandrélé. Pour $x$ centaines de pots vendus dans le mois, avec $x \\in [0\\,;10]$, son bénéfice, en centaines d'euros, est :\n\n" +
          "$B(x) = -x^2 + 10x - 16$.\n\n" +
          "La courbe de $B$ est tracée ci-dessous.",
        figure: (o) => o.graph({
          xmin: -0.6, xmax: 10.6, ymin: -17, ymax: 11, ystep: 2,
          xlabel: "x", ylabel: "B(x)",
          curves: [{ f: (x) => -x * x + 10 * x - 16, a: 0, b: 10, label: "C<tspan class=\"sub\" dy=\"3\">B</tspan>", lx: 8.6, dx: 34, dy: 6 }],
          aria: "Courbe de B : parabole tournée vers le bas, tracée pour x de 0 à 10"
        }),
        questions: [
          { partie: "Partie A : lecture graphique" },
          {
            n: "1.", points: 1,
            texte: "Lis $B(0)$ sur le graphique. Que représente ce nombre pour Mariama ?",
            indice: "Lis l'ordonnée du point de la courbe d'abscisse $0$. Un bénéfice négatif est une perte.",
            corrige: "$B(0) = -16$ : si Mariama ne vend aucun pot, elle perd $1\\,600$ €. Ce sont ses frais fixes du mois (location, matériel, bocaux…)."
          },
          {
            n: "2.", points: 1,
            texte: "Lis graphiquement les quantités pour lesquelles le bénéfice est nul, puis le bénéfice maximal et la quantité qui le donne.",
            indice: "Le bénéfice est nul là où la courbe coupe l'axe des abscisses ; le maximum se lit au point le plus haut de la courbe.",
            corrige:
              "La courbe coupe l'axe des abscisses en $x = 2$ et $x = 8$ : le bénéfice est nul pour $200$ pots et pour $800$ pots.\n\n" +
              "Le point le plus haut semble être $(5\\,;9)$ : le bénéfice maximal semble être de $900$ €, pour $500$ pots. Une lecture graphique reste approximative : la partie B le démontre."
          },
          { partie: "Partie B : étude algébrique" },
          {
            n: "3.", points: 1,
            texte: "Montre que, pour tout réel $x$, $B(x) = -(x - 5)^2 + 9$.",
            indice: "Développe $-(x - 5)^2 + 9$ avec $(x - 5)^2 = x^2 - 10x + 25$, sans oublier le signe moins devant la parenthèse.",
            corrige: "$-(x - 5)^2 + 9 = -(x^2 - 10x + 25) + 9 = -x^2 + 10x - 25 + 9 = -x^2 + 10x - 16 = B(x)$."
          },
          {
            n: "4.", points: 1,
            texte: "Déduis-en le bénéfice maximal et le nombre de pots à vendre pour l'obtenir. Justifie.",
            indice: "Un carré est toujours positif ou nul : quel est alors le signe de $-(x - 5)^2$ ?",
            corrige:
              "Pour tout réel $x$, $(x - 5)^2 \\geqslant 0$, donc $-(x - 5)^2 \\leqslant 0$ et $B(x) \\leqslant 9$, avec égalité seulement pour $x = 5$.\n\n" +
              "Le bénéfice maximal est donc de $9$ centaines d'euros, soit $900$ €, obtenu pour $500$ pots vendus."
          },
          {
            n: "5. a)", points: 1,
            texte: "Résous l'équation $B(x) = 0$ à l'aide du discriminant.",
            indice: "Ici $a = -1$, $b = 10$ et $c = -16$ : calcule $\\Delta = b^2 - 4ac$ en mettant les nombres négatifs entre parenthèses.",
            corrige:
              "$\\Delta = 10^2 - 4 \\times (-1) \\times (-16) = 100 - 64 = 36 > 0$ et $\\sqrt{36} = 6$ : l'équation a deux solutions,\n\n" +
              "$x_1 = \\dfrac{-10 - 6}{2 \\times (-1)} = \\dfrac{-16}{-2} = 8$ et $x_2 = \\dfrac{-10 + 6}{2 \\times (-1)} = \\dfrac{-4}{-2} = 2$.\n\n" +
              "Les solutions sont $2$ et $8$, ce qui confirme la lecture graphique."
          },
          {
            n: "5. b)", points: 1,
            texte: "Déduis-en une forme factorisée de $B(x)$, puis le signe de $B(x)$ sur $[0\\,;10]$. Pour quelles quantités Mariama fait-elle un bénéfice ?",
            indice: "Avec deux racines $x_1$ et $x_2$, $B(x) = a(x - x_1)(x - x_2)$. Le trinôme est du signe de $a$ à l'extérieur des racines.",
            corrige: "$B(x) = -(x - 2)(x - 8)$. Comme $a = -1 < 0$, $B(x)$ est négatif à l'extérieur des racines et positif entre elles :",
            tableauCorrige: { lignes: [["x", "0", "", "2", "", "8", "", "10"], ["B(x)", "", "-", "0", "+", "0", "-", ""]] },
            corrigeFin: "Mariama fait un bénéfice, c'est-à-dire $B(x) > 0$, pour $x \\in ]2\\,;8[$ : entre $200$ et $800$ pots vendus, ces deux valeurs exclues."
          },
          {
            n: "6.", points: 1,
            texte: "Mariama veut gagner au moins $500$ € dans le mois. Combien de pots doit-elle vendre ?",
            indice: "Traduis la demande par l'inéquation $B(x) \\geqslant 5$. Avec la forme canonique, elle s'écrit $-(x - 5)^2 + 9 \\geqslant 5$.",
            corrige:
              "On résout $B(x) \\geqslant 5$, c'est-à-dire $-(x - 5)^2 + 9 \\geqslant 5$, soit $(x - 5)^2 \\leqslant 4$.\n\n" +
              "Un carré est inférieur ou égal à $4$ quand le nombre est compris entre $-2$ et $2$ : $-2 \\leqslant x - 5 \\leqslant 2$, soit $3 \\leqslant x \\leqslant 7$.\n\n" +
              "Autre méthode : $-x^2 + 10x - 21 \\geqslant 0$, avec $\\Delta = 100 - 84 = 16$, de racines $3$ et $7$ ; comme $a < 0$, le trinôme est positif entre ses racines.\n\n" +
              "Mariama doit vendre entre $300$ et $700$ pots dans le mois."
          }
        ]
      },
      {
        titre: "Le saut du dauphin",
        duree: 25, points: 7, calculatrice: false,
        contexte:
          "Dans le lagon de Mayotte, un dauphin à long bec saute hors de l'eau. Dans un repère où l'axe des abscisses représente la surface de l'eau (unité : le mètre), sa trajectoire est la courbe de la fonction $h$ définie sur $\\mathbb{R}$ par :\n\n" +
          "$h(x) = -0{,}5x^2 + 4x - 6$,\n\n" +
          "où $x$ est la distance horizontale à une bouée, en mètres, et $h(x)$ la hauteur du dauphin au-dessus de l'eau (négative quand il est sous l'eau).",
        questions: [
          {
            n: "1. a)", points: 0.5,
            texte: "Montre que, pour tout réel $x$, $h(x) = -0{,}5(x - 2)(x - 6)$.",
            indice: "Développe d'abord $(x - 2)(x - 6)$, puis multiplie le résultat par $-0{,}5$.",
            corrige: "$(x - 2)(x - 6) = x^2 - 6x - 2x + 12 = x^2 - 8x + 12$, donc $-0{,}5(x - 2)(x - 6) = -0{,}5x^2 + 4x - 6 = h(x)$."
          },
          {
            n: "1. b)", points: 1,
            texte: "À quelle distance de la bouée le dauphin sort-il de l'eau, puis y retombe-t-il ? Quelle est la longueur de son saut ?",
            indice: "Le dauphin est à la surface quand $h(x) = 0$ : utilise la forme factorisée et la règle du produit nul.",
            corrige:
              "$h(x) = 0 \\iff x - 2 = 0$ ou $x - 6 = 0 \\iff x = 2$ ou $x = 6$ (le facteur $-0{,}5$ n'est pas nul).\n\n" +
              "Le dauphin sort de l'eau à $2$ m de la bouée et y retombe à $6$ m : son saut est long de $4$ m."
          },
          {
            n: "2. a)", points: 1,
            texte: "Détermine la forme canonique de $h(x)$.",
            indice: "Calcule $\\alpha = -\\dfrac{b}{2a}$ avec $a = -0{,}5$ et $b = 4$, puis $\\beta = h(\\alpha)$.",
            corrige:
              "$\\alpha = -\\dfrac{4}{2 \\times (-0{,}5)} = -\\dfrac{4}{-1} = 4$ et $\\beta = h(4) = -0{,}5 \\times 16 + 16 - 6 = -8 + 16 - 6 = 2$.\n\n" +
              "Donc $h(x) = -0{,}5(x - 4)^2 + 2$."
          },
          {
            n: "2. b)", points: 0.5,
            texte: "Quelle hauteur maximale le dauphin atteint-il, et à quelle distance de la bouée ?",
            indice: "Comme $a = -0{,}5 < 0$, la forme canonique donne un maximum.",
            corrige: "$a = -0{,}5 < 0$ : $h$ admet un maximum $\\beta = 2$, atteint en $\\alpha = 4$. Le dauphin monte à $2$ m au-dessus de l'eau, à $4$ m de la bouée, au milieu de son saut."
          },
          {
            n: "3.", points: 1.5,
            texte: "Un photographe veut le dauphin à **au moins** $1{,}5$ m au-dessus de l'eau. Sur quelle distance horizontale est-ce le cas ?",
            indice: "Résous $h(x) \\geqslant 1{,}5$ avec la forme canonique : l'inéquation revient à $(x - 4)^2 \\leqslant 1$.",
            corrige:
              "$h(x) \\geqslant 1{,}5 \\iff -0{,}5(x - 4)^2 + 2 \\geqslant 1{,}5 \\iff -0{,}5(x - 4)^2 \\geqslant -0{,}5 \\iff (x - 4)^2 \\leqslant 1$, car en divisant par $-0{,}5 < 0$ le sens de l'inégalité change.\n\n" +
              "$(x - 4)^2 \\leqslant 1 \\iff -1 \\leqslant x - 4 \\leqslant 1 \\iff 3 \\leqslant x \\leqslant 5$.\n\n" +
              "Le dauphin est à au moins $1{,}5$ m de hauteur entre $3$ m et $5$ m de la bouée, donc sur $2$ m."
          },
          {
            n: "4. a)", points: 1,
            texte: "Un deuxième dauphin fait exactement le même saut, mais $3$ m plus loin : sa trajectoire est la courbe de la fonction $g$ définie par $g(x) = h(x - 3)$. Où sort-il de l'eau, où y retombe-t-il, et où atteint-il sa hauteur maximale ?",
            indice: "La courbe de $x \\mapsto h(x - 3)$ est celle de $h$ décalée de $3$ unités vers la droite.",
            corrige:
              "La courbe de $g$ est celle de $h$ décalée de $3$ m vers la droite. Le deuxième dauphin sort de l'eau à $2 + 3 = 5$ m de la bouée, y retombe à $6 + 3 = 9$ m et atteint sa hauteur maximale de $2$ m à $4 + 3 = 7$ m.\n\n" +
              "Vérification : $g(x) = -0{,}5(x - 3 - 2)(x - 3 - 6) = -0{,}5(x - 5)(x - 9)$."
          },
          {
            n: "4. b)", points: 1.5,
            texte: "Les deux trajectoires se croisent. Montre que l'abscisse $x$ du point de croisement vérifie $(x - 2)(x - 6) = (x - 5)(x - 9)$, puis calcule-la. À quelle hauteur les trajectoires se croisent-elles ?",
            indice: "Écris $h(x) = g(x)$ avec les formes factorisées, simplifie par $-0{,}5$, puis développe les deux membres : les termes en $x^2$ disparaissent.",
            corrige:
              "$h(x) = g(x) \\iff -0{,}5(x - 2)(x - 6) = -0{,}5(x - 5)(x - 9) \\iff (x - 2)(x - 6) = (x - 5)(x - 9)$.\n\n" +
              "En développant : $x^2 - 8x + 12 = x^2 - 14x + 45 \\iff 6x = 33 \\iff x = 5{,}5$.\n\n" +
              "Hauteur : $h(5{,}5) = -0{,}5 \\times 3{,}5 \\times (-0{,}5) = 0{,}875$. Les trajectoires se croisent à $5{,}5$ m de la bouée, à $0{,}875$ m (soit $87{,}5$ cm) au-dessus de l'eau.",
            figureCorrige: (o) => o.graph({
              xmin: -0.6, xmax: 10.6, ymin: -3, ymax: 2.6, ystep: 0.5, yetiq: 1,
              curves: [
                { f: (x) => -0.5 * (x - 2) * (x - 6), a: 1, b: 7, closed: false, label: "C<tspan class=\"sub\" dy=\"3\">h</tspan>", lx: 2.4, dx: -6, dy: -6 },
                { f: (x) => -0.5 * (x - 5) * (x - 9), a: 4, b: 10, closed: false, label: "C<tspan class=\"sub\" dy=\"3\">g</tspan>", lx: 8.6, dx: 26, dy: -4 }
              ],
              points: [{ x: 5.5, y: 0.875, label: "I" }],
              aria: "Les deux trajectoires, décalées de 3 m, se croisent au point I d'abscisse 5,5 et de hauteur 0,875"
            })
          }
        ]
      },
      {
        titre: "Une parabole et des droites",
        duree: 25, points: 6, calculatrice: false,
        contexte:
          "Dans un repère, on note $\\mathcal{P}$ la parabole d'équation $y = x^2 + 9$ et, pour tout réel $m$, $\\mathcal{D}_m$ la droite d'équation $y = mx$, qui passe par l'origine du repère.\n\n" +
          "On cherche, selon la valeur de $m$, combien de points communs ont $\\mathcal{P}$ et $\\mathcal{D}_m$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Dans cette question, $m = 10$. Résous l'équation $x^2 + 9 = 10x$, puis donne les coordonnées des points communs à $\\mathcal{P}$ et $\\mathcal{D}_{10}$.",
            indice: "Ramène l'équation à $x^2 - 10x + 9 = 0$. Pour les ordonnées, utilise l'équation $y = 10x$ de la droite.",
            corrige:
              "$x^2 + 9 = 10x \\iff x^2 - 10x + 9 = 0$. $\\Delta = 100 - 36 = 64$ et $\\sqrt{64} = 8$ : $x_1 = \\dfrac{10 - 8}{2} = 1$ et $x_2 = \\dfrac{10 + 8}{2} = 9$.\n\n" +
              "Avec $y = 10x$, les points communs sont $(1\\,;10)$ et $(9\\,;90)$."
          },
          {
            n: "2.", points: 1,
            texte: "Dans cette question, $m = 2$. Montre que $\\mathcal{P}$ et $\\mathcal{D}_2$ n'ont aucun point commun, puis précise laquelle des deux est au-dessus de l'autre.",
            indice: "Étudie le signe de la différence $(x^2 + 9) - 2x = x^2 - 2x + 9$.",
            corrige:
              "$x^2 + 9 = 2x \\iff x^2 - 2x + 9 = 0$, et $\\Delta = 4 - 36 = -32 < 0$ : l'équation n'a pas de solution, donc aucun point commun.\n\n" +
              "De plus $a = 1 > 0$ et $\\Delta < 0$, donc $x^2 - 2x + 9 > 0$ pour tout réel $x$ : $x^2 + 9 > 2x$, la parabole $\\mathcal{P}$ est toujours au-dessus de la droite $\\mathcal{D}_2$."
          },
          {
            n: "3. a)", points: 1,
            texte: "Cas général : montre que les abscisses des points communs à $\\mathcal{P}$ et $\\mathcal{D}_m$ sont les solutions de l'équation $x^2 - mx + 9 = 0$, puis que son discriminant est $\\Delta = m^2 - 36$.",
            indice: "Les coordonnées d'un point commun vérifient les deux équations à la fois : $x^2 + 9 = mx$.",
            corrige:
              "Un point de coordonnées $(x\\,;y)$ est commun à $\\mathcal{P}$ et $\\mathcal{D}_m$ quand $y = x^2 + 9$ et $y = mx$, donc quand $x^2 + 9 = mx$, c'est-à-dire $x^2 - mx + 9 = 0$.\n\n" +
              "Avec $a = 1$, $b = -m$ et $c = 9$ : $\\Delta = (-m)^2 - 4 \\times 1 \\times 9 = m^2 - 36$."
          },
          {
            n: "3. b)", points: 1.5,
            texte: "Étudie le signe de $m^2 - 36$ selon les valeurs de $m$. Déduis-en, selon $m$, le nombre de points communs à $\\mathcal{P}$ et $\\mathcal{D}_m$.",
            indice: "$m^2 - 36$ est un trinôme en $m$ : $m^2 - 36 = (m - 6)(m + 6)$, de racines $-6$ et $6$.",
            corrige:
              "$m^2 - 36 = (m - 6)(m + 6)$ est un trinôme en $m$, de racines $-6$ et $6$ et de coefficient $1 > 0$ : il est positif à l'extérieur des racines et négatif entre elles.\n\n" +
              "- Si $m < -6$ ou $m > 6$ : $\\Delta > 0$, deux points communs.\n" +
              "- Si $m = -6$ ou $m = 6$ : $\\Delta = 0$, un seul point commun.\n" +
              "- Si $-6 < m < 6$ : $\\Delta < 0$, aucun point commun.\n\n" +
              "C'est cohérent avec la question 1 ($m = 10$ : deux points) et la question 2 ($m = 2$ : aucun). La figure montre $\\mathcal{D}_2$, $\\mathcal{D}_6$ et $\\mathcal{D}_7$.",
            figureCorrige: (o) => o.graph({
              xmin: -0.5, xmax: 5.5, ymin: -2, ymax: 40, ystep: 5, yetiq: 10,
              curves: [
                { f: (x) => x * x + 9, a: -0.4, b: 5.4, closed: false, label: "P", lx: 4.9, dx: -10, dy: -6, couleur: 0 },
                { f: (x) => 2 * x, a: -0.4, b: 5.4, closed: false, label: "D<tspan class=\"sub\" dy=\"3\">2</tspan>", lx: 5.4, dx: -2, dy: -6, couleur: 1 },
                { f: (x) => 6 * x, a: -0.3, b: 5.4, closed: false, label: "D<tspan class=\"sub\" dy=\"3\">6</tspan>", lx: 5.4, dx: -2, dy: 14, couleur: 2 },
                { f: (x) => 7 * x, a: -0.25, b: 5.4, closed: false, label: "D<tspan class=\"sub\" dy=\"3\">7</tspan>", lx: 5.2, dx: -10, dy: -2, couleur: 1 }
              ],
              points: [{ x: 3, y: 18, label: "(3 ; 18)" }],
              aria: "La parabole P et les droites D2 (aucun point commun), D6 (un seul point commun, (3 ; 18)) et D7 (deux points communs)"
            })
          },
          {
            n: "3. c)", points: 0.5,
            texte: "Pour $m = 6$, détermine les coordonnées du point commun à $\\mathcal{P}$ et $\\mathcal{D}_6$.",
            indice: "Quand $\\Delta = 0$, l'unique solution est $-\\dfrac{b}{2a}$ ; on peut aussi reconnaître une identité remarquable.",
            corrige: "Pour $m = 6$ : $x^2 - 6x + 9 = (x - 3)^2 = 0 \\iff x = 3$, et $y = 6 \\times 3 = 18$. Le point commun est $(3\\,;18)$ : la droite touche la parabole sans la traverser."
          },
          {
            n: "4.", points: 1,
            texte:
              "Complète cette fonction Python pour qu'elle renvoie le nombre de points communs à $\\mathcal{P}$ et $\\mathcal{D}_m$.\n\n" +
              "```python\ndef nbpoints(m):\n    d = ...\n    if d > 0:\n        return 2\n    elif ...:\n        return 1\n    else:\n        return ...\n```",
            indice: "La variable $\\texttt{d}$ contient le discriminant. En Python, $m^2$ s'écrit $\\texttt{m**2}$ et « est égal à » s'écrit $\\texttt{==}$.",
            corrige:
              "```python\ndef nbpoints(m):\n    d = m**2 - 36\n    if d > 0:\n        return 2\n    elif d == 0:\n        return 1\n    else:\n        return 0\n```\n\n" +
              "Par exemple, $\\texttt{nbpoints(10)}$ renvoie $\\texttt{2}$, $\\texttt{nbpoints(6)}$ renvoie $\\texttt{1}$ et $\\texttt{nbpoints(2)}$ renvoie $\\texttt{0}$."
          }
        ]
      }
    ]
  }
};
