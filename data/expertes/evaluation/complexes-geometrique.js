/*
  ENTRAÎNEMENT : Terminale maths expertes — chapitre 2, Nombres complexes : point de vue géométrique
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre expertes-complexes-geometrique.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths expertes.
  L'argument d'un produit est au chapitre 3 et les ensembles de points (médiatrice, cercle quelconque) au chapitre 5 :
  ici, seulement les modules, les arguments de nombres donnés et la forme trigonométrique.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["expertes-complexes-geometrique"] = {
  revisions: {
    intro: "Les nombres complexes dans le plan en un coup d'œil : affixes, module et distances, l'ensemble $\\mathbb{U}$, arguments, forme trigonométrique et suites de points. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Affixes",
        texte: "Le point $M(a\\,;b)$ a pour affixe $z_M = a + ib$. Le vecteur $\\overrightarrow{AB}$ a pour affixe $z_B - z_A$ (arrivée moins départ), et le milieu de $[AB]$ a pour affixe $\\dfrac{z_A + z_B}{2}$."
      },
      {
        titre: "Module et distances",
        texte: "$|z| = \\sqrt{a^2 + b^2} = OM$, et $AB = |z_B - z_A|$. Par exemple, $|6 - 8i| = \\sqrt{36 + 64} = 10$. On a aussi $z\\overline{z} = |z|^2$."
      },
      {
        titre: "Propriétés du module",
        texte:
          "Pour tous complexes $z$ et $z'$ et tout entier naturel $n$ :\n" +
          "- $|zz'| = |z| \\times |z'|$ et $|z^n| = |z|^n$ ;\n" +
          "- si $z \\neq 0$, $\\left|\\dfrac{z'}{z}\\right| = \\dfrac{|z'|}{|z|}$ ;\n" +
          "- mais $|z + z'| \\leqslant |z| + |z'|$ seulement, sans égalité en général."
      },
      {
        titre: "L'ensemble $\\mathbb{U}$",
        texte: "$\\mathbb{U}$ regroupe les complexes de module $1$ : leurs images forment le cercle de centre $O$ et de rayon $1$. Par exemple, $\\dfrac{3}{5} + \\dfrac{4}{5}i \\in \\mathbb{U}$, car $\\dfrac{9}{25} + \\dfrac{16}{25} = 1$. Le produit de deux éléments de $\\mathbb{U}$ est dans $\\mathbb{U}$."
      },
      {
        titre: "Argument",
        texte: "Pour $z = a + ib \\neq 0$ de module $r$, un argument $\\theta$ vérifie $\\cos\\theta = \\dfrac{a}{r}$ et $\\sin\\theta = \\dfrac{b}{r}$ ; il est défini à $2\\pi$ près. Par exemple, $\\arg(-4) = \\pi\\ [2\\pi]$ et $\\arg(2i) = \\dfrac{\\pi}{2}\\ [2\\pi]$."
      },
      {
        titre: "Forme trigonométrique",
        texte: "$z = r(\\cos\\theta + i\\sin\\theta)$, avec $r = |z| > 0$ et $\\theta$ un argument de $z$. Par exemple, $\\sqrt{3} - i = 2\\left(\\cos\\left(-\\dfrac{\\pi}{6}\\right) + i\\sin\\left(-\\dfrac{\\pi}{6}\\right)\\right)$."
      },
      {
        titre: "Suites de points",
        texte: "Si $z_{n+1} = qz_n$, alors $|z_{n+1}| = |q| \\times |z_n|$ : les distances $OM_n$ forment une suite géométrique de raison $|q|$."
      }
    ],
    pieges: [
      "Oublier la racine carrée ou ajouter les parties : $|3 + 4i| = \\sqrt{9 + 16} = 5$, ni $25$, ni $3 + 4$.",
      "Écrire $|z + z'| = |z| + |z'|$ : c'est faux en général.",
      "Écrire $z_{\\overrightarrow{AB}} = z_A - z_B$ : c'est « arrivée moins départ », $z_B - z_A$.",
      "Choisir un angle qui a le bon cosinus mais le mauvais sinus : vérifie dans quel quart du plan se trouve le point.",
      "Donner un module négatif : $-2(\\cos\\theta + i\\sin\\theta)$ n'est pas une forme trigonométrique.",
      "Chercher un argument de $0$ : il n'en a pas."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Un carré dans le plan complexe",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Dans le plan complexe muni d'un repère orthonormé direct $(O\\,;\\vec{u},\\vec{v})$, on considère les points $A$, $B$ et $C$ d'affixes $z_A = -2 + i$, $z_B = 1 + 2i$ et $z_C = 2 - i$. Fais une figure, que tu compléteras au fil de l'exercice.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule l'affixe du vecteur $\\overrightarrow{AB}$ et celle du milieu $K$ du segment $[AC]$. Que remarques-tu ?",
            indice: "$z_{\\overrightarrow{AB}} = z_B - z_A$ et $z_K = \\dfrac{z_A + z_C}{2}$.",
            corrige: "$z_{\\overrightarrow{AB}} = z_B - z_A = 1 + 2i - (-2 + i) = 3 + i$.\n\n$z_K = \\dfrac{z_A + z_C}{2} = \\dfrac{-2 + i + 2 - i}{2} = 0$ : le milieu de $[AC]$ est l'origine $O$."
          },
          {
            n: "2.", points: 2,
            texte: "Calcule les distances $AB$, $BC$ et $AC$, puis déduis-en la nature du triangle $ABC$.",
            indice: "$AB = |z_B - z_A|$. Compare ensuite $AB^2 + BC^2$ et $AC^2$.",
            corrige: "$AB = |3 + i| = \\sqrt{10}$, $BC = |z_C - z_B| = |1 - 3i| = \\sqrt{10}$ et $AC = |z_C - z_A| = |4 - 2i| = \\sqrt{20} = 2\\sqrt{5}$.\n\n$AB = BC$ et $AB^2 + BC^2 = 10 + 10 = 20 = AC^2$ : d'après la réciproque du théorème de Pythagore, $ABC$ est **rectangle isocèle en $B$**."
          },
          {
            n: "3.", points: 1.5,
            texte: "Détermine l'affixe du point $D$ tel que $ABCD$ soit un parallélogramme, puis justifie que $ABCD$ est un carré.",
            indice: "$ABCD$ est un parallélogramme si et seulement si $\\overrightarrow{AB} = \\overrightarrow{DC}$, c'est-à-dire $z_B - z_A = z_C - z_D$.",
            corrige: "$z_D = z_C - z_B + z_A = 2 - i - 1 - 2i - 2 + i = -1 - 2i$.\n\n$ABCD$ est un parallélogramme avec un angle droit en $B$ (question 2) : c'est un rectangle. Ses côtés consécutifs $[AB]$ et $[BC]$ ont la même longueur : c'est un carré."
          },
          {
            n: "4.", points: 2,
            texte: "Calcule $|z_A|$, $|z_B|$, $|z_C|$ et $|z_D|$. Que peux-tu en déduire pour les points $A$, $B$, $C$ et $D$ ?",
            indice: "$|z_M| = OM$ pour tout point $M$.",
            corrige: "$|z_A| = |-2 + i| = \\sqrt{5}$, $|z_B| = |1 + 2i| = \\sqrt{5}$, $|z_C| = |2 - i| = \\sqrt{5}$ et $|z_D| = |-1 - 2i| = \\sqrt{5}$.\n\nDonc $OA = OB = OC = OD = \\sqrt{5}$ : les quatre sommets du carré sont sur le cercle de centre $O$ et de rayon $\\sqrt{5}$, et $O$ est le centre du carré (le milieu de la diagonale $[AC]$, question 1).",
            figureCorrige: (o) => o.graph({
              xmin: -3.2, xmax: 3.2, ymin: -3.2, ymax: 3.2,
              curves: [
                { f: (x) => Math.sqrt(Math.max(0, 5 - x * x)), a: -Math.sqrt(5), b: Math.sqrt(5), closed: false, couleur: 1 },
                { f: (x) => -Math.sqrt(Math.max(0, 5 - x * x)), a: -Math.sqrt(5), b: Math.sqrt(5), closed: false, couleur: 1 },
                { f: (x) => 1 + (x + 2) / 3, a: -2, b: 1, closed: false, couleur: 0 },
                { f: (x) => 2 - 3 * (x - 1), a: 1, b: 2, closed: false, couleur: 0 },
                { f: (x) => -1 + (x - 2) / 3, a: -1, b: 2, closed: false, couleur: 0 },
                { f: (x) => -2 - 3 * (x + 1), a: -2, b: -1, closed: false, couleur: 0 }
              ],
              points: [{ x: -2, y: 1 }, { x: 1, y: 2 }, { x: 2, y: -1 }, { x: -1, y: -2 }],
              marques: [{ x: -2.45, y: 1.2, texte: "A" }, { x: 1.25, y: 2.45, texte: "B" }, { x: 2.45, y: -1.35, texte: "C" }, { x: -1.25, y: -2.6, texte: "D" }],
              aria: "Le carré ABCD, avec A(−2 ; 1), B(1 ; 2), C(2 ; −1) et D(−1 ; −2), et son cercle circonscrit de centre O et de rayon racine de 5"
            })
          }
        ]
      },
      {
        titre: "Modules, arguments et ensemble $\\mathbb{U}$",
        duree: 25, points: 7, calculatrice: false,
        contexte: "On considère les nombres complexes $a = 1 + i\\sqrt{3}$, $b = -2 + 2i$ et $c = -3i$.",
        questions: [
          {
            n: "1.", points: 2,
            texte: "Détermine le module et un argument de $a$, de $b$ et de $c$, puis écris chacun de ces nombres sous forme trigonométrique.",
            indice: "Calcule d'abord le module $r$, puis cherche $\\theta$ tel que $\\cos\\theta = \\dfrac{\\text{Re}}{r}$ et $\\sin\\theta = \\dfrac{\\text{Im}}{r}$. Place le point pour vérifier le quart du plan.",
            corrige:
              "$|a| = \\sqrt{1 + 3} = 2$, $\\cos\\theta = \\dfrac{1}{2}$ et $\\sin\\theta = \\dfrac{\\sqrt{3}}{2}$, donc $\\theta = \\dfrac{\\pi}{3}$ : $a = 2\\left(\\cos\\dfrac{\\pi}{3} + i\\sin\\dfrac{\\pi}{3}\\right)$.\n\n" +
              "$|b| = \\sqrt{4 + 4} = 2\\sqrt{2}$, $\\cos\\theta = \\dfrac{-2}{2\\sqrt{2}} = -\\dfrac{\\sqrt{2}}{2}$ et $\\sin\\theta = \\dfrac{\\sqrt{2}}{2}$, donc $\\theta = \\dfrac{3\\pi}{4}$ : $b = 2\\sqrt{2}\\left(\\cos\\dfrac{3\\pi}{4} + i\\sin\\dfrac{3\\pi}{4}\\right)$.\n\n" +
              "L'image de $c = -3i$ est sur l'axe imaginaire, sous $O$ : $|c| = 3$ et $\\theta = -\\dfrac{\\pi}{2}$, donc $c = 3\\left(\\cos\\left(-\\dfrac{\\pi}{2}\\right) + i\\sin\\left(-\\dfrac{\\pi}{2}\\right)\\right)$."
          },
          {
            n: "2.", points: 1,
            texte: "Écris sous forme algébrique le nombre $w$ de module $4$ et d'argument $-\\dfrac{\\pi}{3}$.",
            indice: "$w = 4\\left(\\cos\\left(-\\dfrac{\\pi}{3}\\right) + i\\sin\\left(-\\dfrac{\\pi}{3}\\right)\\right)$.",
            corrige: "$w = 4\\left(\\cos\\left(-\\dfrac{\\pi}{3}\\right) + i\\sin\\left(-\\dfrac{\\pi}{3}\\right)\\right) = 4\\left(\\dfrac{1}{2} - i\\dfrac{\\sqrt{3}}{2}\\right) = 2 - 2i\\sqrt{3}$."
          },
          {
            n: "3.", points: 2,
            texte: "On pose $Z = \\dfrac{a^6}{b^4}$. Sans développer, calcule $|Z|$ et déduis-en que $Z$ appartient à $\\mathbb{U}$. Vérifie ensuite ce résultat en calculant $a^3$ et $b^2$.",
            indice: "$|Z| = \\dfrac{|a|^6}{|b|^4}$. Pour la vérification, $a^3 = a^2 \\times a$.",
            corrige: "$|Z| = \\dfrac{|a|^6}{|b|^4} = \\dfrac{2^6}{(2\\sqrt{2})^4} = \\dfrac{64}{64} = 1$, donc $Z \\in \\mathbb{U}$.\n\nVérification : $a^2 = 1 + 2i\\sqrt{3} - 3 = -2 + 2i\\sqrt{3}$, puis $a^3 = (-2 + 2i\\sqrt{3})(1 + i\\sqrt{3}) = -2 - 2i\\sqrt{3} + 2i\\sqrt{3} - 6 = -8$ ; et $b^2 = 4 - 8i - 4 = -8i$. Donc $a^6 = 64$, $b^4 = (-8i)^2 = -64$ et $Z = -1$, qui est bien de module $1$."
          },
          {
            n: "4.", points: 2,
            texte: "Soit $z$ un nombre complexe de module $1$. Montre que $\\dfrac{1}{z} = \\overline{z}$, puis que $z + \\dfrac{1}{z}$ est un réel compris entre $-2$ et $2$.",
            indice: "$z\\overline{z} = |z|^2$. Pour la suite, écris $z = \\cos\\theta + i\\sin\\theta$.",
            corrige: "$z\\overline{z} = |z|^2 = 1$, donc $z \\neq 0$ et $\\dfrac{1}{z} = \\overline{z}$.\n\nAvec $z = \\cos\\theta + i\\sin\\theta$ (module $1$) : $z + \\dfrac{1}{z} = z + \\overline{z} = 2\\cos\\theta$, un réel compris entre $-2$ et $2$."
          }
        ]
      },
      {
        titre: "Une spirale de points",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Dans le plan complexe, on considère les points $M_n$ d'affixes $z_n$ définies par $z_0 = 4$ et, pour tout entier naturel $n$, $z_{n+1} = \\dfrac{1 + i}{2}\\,z_n$. On note $r_n = |z_n| = OM_n$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $z_1$, $z_2$, $z_3$ et $z_4$ sous forme algébrique.",
            indice: "$z_1 = \\dfrac{1 + i}{2} \\times 4$. Ensuite, $\\dfrac{1 + i}{2}(2 + 2i) = (1 + i)^2$.",
            corrige: "$z_1 = 2(1 + i) = 2 + 2i$ ; $z_2 = \\dfrac{1 + i}{2}(2 + 2i) = (1 + i)^2 = 2i$ ; $z_3 = \\dfrac{1 + i}{2} \\times 2i = i(1 + i) = -1 + i$ ; $z_4 = \\dfrac{(1 + i)(-1 + i)}{2} = \\dfrac{-1 + i - i + i^2}{2} = -1$."
          },
          {
            n: "2.", points: 1,
            texte: "Montre que $(r_n)$ est une suite géométrique, puis exprime $r_n$ en fonction de $n$.",
            indice: "$|z_{n+1}| = \\left|\\dfrac{1 + i}{2}\\right| \\times |z_n|$.",
            corrige: "$r_{n+1} = \\left|\\dfrac{1 + i}{2}\\right| \\times |z_n| = \\dfrac{\\sqrt{2}}{2}\\,r_n$ : $(r_n)$ est géométrique de raison $\\dfrac{\\sqrt{2}}{2}$ et de premier terme $r_0 = 4$, donc $r_n = 4\\left(\\dfrac{\\sqrt{2}}{2}\\right)^n$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Montre que $z_{n+1} - z_n = \\dfrac{-1 + i}{2}\\,z_n$ pour tout $n$, puis que le triangle $OM_nM_{n+1}$ est rectangle isocèle en $M_{n+1}$.",
            indice: "Calcule $M_nM_{n+1} = |z_{n+1} - z_n|$ et compare avec $OM_{n+1} = r_{n+1}$, puis utilise la réciproque du théorème de Pythagore.",
            corrige: "$z_{n+1} - z_n = \\left(\\dfrac{1 + i}{2} - 1\\right)z_n = \\dfrac{-1 + i}{2}\\,z_n$, donc $M_nM_{n+1} = \\left|\\dfrac{-1 + i}{2}\\right| \\times r_n = \\dfrac{\\sqrt{2}}{2}\\,r_n = r_{n+1}$. Ainsi $M_nM_{n+1} = OM_{n+1}$ : le triangle est isocèle en $M_{n+1}$.\n\nDe plus, $OM_{n+1}^2 + M_nM_{n+1}^2 = 2 \\times \\dfrac{1}{2}\\,r_n^2 = r_n^2 = OM_n^2$ : d'après la réciproque du théorème de Pythagore, il est rectangle en $M_{n+1}$.",
            figureCorrige: (o) => o.graph({
              xmin: -1.6, xmax: 4.6, ymin: -1.05, ymax: 2.6,
              curves: [{ f: (x) => x, a: 0, b: 2, closed: false, couleur: 0 }],
              chemins: [[[4, 0], [2, 2], [0, 2], [-1, 1], [-1, 0], [-0.5, -0.5], [0, -0.5]]],
              points: [{ x: 4, y: 0 }, { x: 2, y: 2 }, { x: 0, y: 2 }, { x: -1, y: 1 }, { x: -1, y: 0 }, { x: -0.5, y: -0.5 }, { x: 0, y: -0.5 }],
              marques: [
                { x: 4.1, y: 0.25, texte: "M<tspan class=\"sub\" dy=\"3\">0</tspan>" },
                { x: 2.4, y: 2.05, texte: "M<tspan class=\"sub\" dy=\"3\">1</tspan>" },
                { x: 0.4, y: 2.2, texte: "M<tspan class=\"sub\" dy=\"3\">2</tspan>" },
                { x: -1.35, y: 1.15, texte: "M<tspan class=\"sub\" dy=\"3\">3</tspan>" },
                { x: -1.35, y: -0.35, texte: "M<tspan class=\"sub\" dy=\"3\">4</tspan>" }
              ],
              aria: "Les points M0(4 ; 0), M1(2 ; 2), M2(0 ; 2), M3(−1 ; 1), M4(−1 ; 0), puis deux autres points de plus en plus proches de O, reliés en pointillés ; le triangle O M0 M1 est rectangle isocèle en M1"
            })
          },
          {
            n: "4.", points: 1,
            texte: "Détermine la limite de la suite $(r_n)$. Interprète ce résultat pour les points $M_n$.",
            indice: "La raison $\\dfrac{\\sqrt{2}}{2}$ est comprise entre $0$ et $1$.",
            corrige: "Comme $0 < \\dfrac{\\sqrt{2}}{2} < 1$, $\\left(\\dfrac{\\sqrt{2}}{2}\\right)^n$ tend vers $0$, donc $r_n$ tend vers $0$ : les points $M_n$ se rapprochent de $O$ autant qu'on veut, en tournant autour de lui."
          },
          {
            n: "5.", points: 1,
            texte: "Avec la calculatrice, détermine le plus petit entier $n$ tel que $OM_n < 0{,}1$.",
            indice: "Calcule $r_n = 4\\left(\\dfrac{\\sqrt{2}}{2}\\right)^n$ pour des valeurs de $n$ croissantes, par exemple avec la table de la calculatrice.",
            corrige: "$r_{10} = 4 \\times \\left(\\dfrac{\\sqrt{2}}{2}\\right)^{10} = 4 \\times \\dfrac{1}{32} = 0{,}125$ et $r_{11} = 0{,}125 \\times \\dfrac{\\sqrt{2}}{2} \\approx 0{,}088$. Comme $(r_n)$ est décroissante, le plus petit entier cherché est $n = 11$."
          }
        ]
      }
    ]
  }
};
