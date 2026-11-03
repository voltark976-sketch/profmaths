/*
  ENTRAÎNEMENT : Terminale maths expertes — chapitre 5, Nombres complexes et géométrie
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre expertes-complexes-geometrie.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths expertes.
  Le cours traite z³ = 8 et le pentagone : ici, racines sixièmes de l'unité, z⁶ = −64 et l'hexagone.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["expertes-complexes-geometrie"] = {
  revisions: {
    intro: "La géométrie avec les complexes en un coup d'œil : le quotient $\\dfrac{c - a}{b - a}$, alignement et angle droit, ensembles de points, racines $n$-ièmes de l'unité et polygones réguliers. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Le quotient $\\dfrac{c - a}{b - a}$",
        texte: "Pour $A$, $B$, $C$ distincts d'affixes $a$, $b$, $c$ : $\\left|\\dfrac{c - a}{b - a}\\right| = \\dfrac{AC}{AB}$ et $\\arg\\left(\\dfrac{c - a}{b - a}\\right) = \\left(\\overrightarrow{AB}, \\overrightarrow{AC}\\right)\\ [2\\pi]$."
      },
      {
        titre: "Alignement, angle droit",
        texte:
          "Avec $q = \\dfrac{c - a}{b - a}$ :\n" +
          "- $q$ réel $\\iff$ $A$, $B$, $C$ alignés ;\n" +
          "- $q$ imaginaire pur $\\iff$ $(AB) \\perp (AC)$ ;\n" +
          "- $|q| = 1 \\iff AB = AC$ ;\n" +
          "- $q = \\pm i$ : rectangle isocèle en $A$ ; $q = e^{\\pm i\\frac{\\pi}{3}}$ : équilatéral."
      },
      {
        titre: "Ensembles de points",
        texte:
          "Pour $M$ d'affixe $z$ :\n" +
          "- $|z - a| = r$ : le cercle de centre $A$ et de rayon $r$ ;\n" +
          "- $|z - a| \\leqslant r$ : le disque de centre $A$ et de rayon $r$ ;\n" +
          "- $|z - a| = |z - b|$ : la médiatrice de $[AB]$."
      },
      {
        titre: "Racines $n$-ièmes de l'unité",
        texte: "Les solutions de $z^n = 1$ sont les $n$ nombres $e^{\\frac{2ik\\pi}{n}}$, pour $k$ allant de $0$ à $n - 1$. Leurs images sont les sommets d'un polygone régulier inscrit dans le cercle de centre $O$ et de rayon $1$, et leur somme est nulle pour $n \\geqslant 2$."
      },
      {
        titre: "Le nombre $j$",
        texte: "$j = e^{\\frac{2i\\pi}{3}} = -\\dfrac{1}{2} + \\dfrac{\\sqrt{3}}{2}i$ : $j^3 = 1$, $\\overline{j} = j^2$ et $1 + j + j^2 = 0$."
      },
      {
        titre: "Polygones réguliers",
        texte: "Multiplier une affixe par $e^{\\frac{2i\\pi}{n}}$, c'est tourner autour de $O$ d'un angle $\\dfrac{2\\pi}{n}$ : en partant d'un sommet, on obtient tous les sommets d'un polygone régulier à $n$ côtés de centre $O$."
      }
    ],
    pieges: [
      "Écrire $\\dfrac{AB}{AC}$ au lieu de $\\dfrac{AC}{AB}$ : dans $\\dfrac{c - a}{b - a}$, on lit « $C$ en haut, $B$ en bas ».",
      "Se tromper de signe sur le centre : $|z + 3| = 2$ a pour centre $-3$, pas $3$.",
      "Confondre le cercle ($=$) et le disque ($\\leqslant$).",
      "Conclure « alignés » quand le quotient est imaginaire pur : c'est un angle droit.",
      "Oublier $1$ parmi les racines $n$-ièmes de l'unité, ou en compter $n + 1$.",
      "Croire qu'une figure suffit : la nature d'un triangle se démontre par un calcul."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Nature de triangles",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Dans le plan complexe, on considère les points $A$, $B$ et $C$ d'affixes $a = 1 - i$, $b = 3 + i$ et $c = 1 + 3i$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $q = \\dfrac{c - a}{b - a}$ sous forme algébrique, puis sous forme exponentielle.",
            indice: "$c - a = 4i$ et $b - a = 2 + 2i$ : multiplie par le conjugué du dénominateur.",
            corrige: "$q = \\dfrac{4i}{2 + 2i} = \\dfrac{4i(2 - 2i)}{(2 + 2i)(2 - 2i)} = \\dfrac{8 + 8i}{8} = 1 + i$, et $1 + i = \\sqrt{2}\\,e^{i\\frac{\\pi}{4}}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Déduis-en le rapport $\\dfrac{AC}{AB}$ et une mesure de l'angle $\\left(\\overrightarrow{AB}, \\overrightarrow{AC}\\right)$.",
            indice: "Le module de $q$ donne le rapport des longueurs, son argument donne l'angle.",
            corrige: "$\\dfrac{AC}{AB} = |q| = \\sqrt{2}$ et $\\left(\\overrightarrow{AB}, \\overrightarrow{AC}\\right) = \\arg q = \\dfrac{\\pi}{4}\\ [2\\pi]$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule $\\dfrac{c - b}{a - b}$ et déduis-en la nature du triangle $ABC$.",
            indice: "$c - b = -2 + 2i$ et $a - b = -2 - 2i$.",
            corrige: "$\\dfrac{c - b}{a - b} = \\dfrac{-2 + 2i}{-2 - 2i} = \\dfrac{(-2 + 2i)^2}{(-2 - 2i)(-2 + 2i)} = \\dfrac{-8i}{8} = -i$.\n\nDonc $BC = BA$ (module $1$) et $\\left(\\overrightarrow{BA}, \\overrightarrow{BC}\\right) = -\\dfrac{\\pi}{2}\\ [2\\pi]$ : $ABC$ est **rectangle isocèle en $B$**, ce qui est cohérent avec la question 2."
          },
          {
            n: "4.", points: 1.5,
            texte: "Soit $E$ le point d'affixe $e = 5 + 3i$. Montre que $A$, $B$ et $E$ sont alignés, et précise la position de $B$.",
            indice: "Calcule $\\dfrac{e - a}{b - a}$.",
            corrige: "$\\dfrac{e - a}{b - a} = \\dfrac{4 + 4i}{2 + 2i} = 2$ est un réel : $A$, $B$ et $E$ sont alignés. De plus, $\\overrightarrow{AE} = 2\\overrightarrow{AB}$ : $B$ est le milieu de $[AE]$."
          },
          {
            n: "5.", points: 1,
            texte: "Quelle est la nature du triangle $ACE$ ?",
            indice: "Calcule $\\dfrac{e - c}{a - c}$.",
            corrige: "$\\dfrac{e - c}{a - c} = \\dfrac{4}{-4i} = \\dfrac{1}{-i} = i$ : $CE = CA$ et $\\left(\\overrightarrow{CA}, \\overrightarrow{CE}\\right) = \\dfrac{\\pi}{2}\\ [2\\pi]$, donc $ACE$ est rectangle isocèle en $C$. On le retrouve sans calcul : $[CB]$ est à la fois la médiane et la hauteur issues de $C$."
          }
        ]
      },
      {
        titre: "Ensembles de points",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Dans le plan complexe, on note $M$ le point d'affixe $z$. Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Détermine l'ensemble $\\mathcal{E}_1$ des points $M$ tels que $|z - 1 + 4i| = 3$.",
            indice: "Écris $|z - 1 + 4i|$ sous la forme $|z - a|$ : c'est une distance $AM$.",
            corrige: "$|z - 1 + 4i| = |z - (1 - 4i)| = AM$, avec $A(1 - 4i)$. Donc $\\mathcal{E}_1$ est le cercle de centre $A(1 - 4i)$ et de rayon $3$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Détermine l'ensemble $\\mathcal{E}_2$ des points $M$ tels que $|z + 1| = |z - 3i|$, puis une équation cartésienne de $\\mathcal{E}_2$.",
            indice: "$|z + 1| = BM$ avec $B(-1)$, et $|z - 3i| = CM$ avec $C(3i)$. Pour l'équation, pose $z = x + iy$ et élève au carré.",
            corrige: "Avec $B(-1)$ et $C(3i)$ : $BM = CM$, donc $\\mathcal{E}_2$ est la médiatrice de $[BC]$.\n\nAvec $z = x + iy$ : $(x + 1)^2 + y^2 = x^2 + (y - 3)^2 \\iff 2x + 1 = -6y + 9 \\iff x + 3y - 4 = 0$."
          },
          {
            n: "3.", points: 2,
            texte: "Détermine l'ensemble $\\mathcal{E}_3$ des points $M$ tels que $|(1 + i)z - 2| = 2$.",
            indice: "Factorise par $1 + i$ : $(1 + i)z - 2 = (1 + i)\\left(z - \\dfrac{2}{1 + i}\\right)$, et $|1 + i| = \\sqrt{2}$.",
            corrige: "$\\dfrac{2}{1 + i} = \\dfrac{2(1 - i)}{2} = 1 - i$, donc $|(1 + i)z - 2| = |1 + i| \\times |z - (1 - i)| = \\sqrt{2}\\,|z - (1 - i)|$.\n\nL'égalité devient $|z - (1 - i)| = \\dfrac{2}{\\sqrt{2}} = \\sqrt{2}$ : $\\mathcal{E}_3$ est le cercle de centre $D(1 - i)$ et de rayon $\\sqrt{2}$."
          },
          {
            n: "4.", points: 2,
            texte: "Soit $A(2i)$ et $B(4)$. Détermine l'ensemble $\\mathcal{E}_4$ des points $M$, avec $z \\neq 4$, tels que $\\dfrac{z - 2i}{z - 4}$ soit un imaginaire pur.",
            indice: "Pour $M$ différent de $A$ et de $B$, $\\dfrac{z - 2i}{z - 4} = \\dfrac{2i - z}{4 - z}$ a pour argument l'angle $\\left(\\overrightarrow{MB}, \\overrightarrow{MA}\\right)$. N'oublie pas le cas $z = 2i$.",
            corrige: "Si $z = 2i$, le quotient vaut $0$, qui est imaginaire pur : $A \\in \\mathcal{E}_4$.\n\nSi $M$ est différent de $A$ et de $B$, le quotient $\\dfrac{2i - z}{4 - z}$ a pour argument une mesure de $\\left(\\overrightarrow{MB}, \\overrightarrow{MA}\\right)$ : il est imaginaire pur si et seulement si cet angle est droit, c'est-à-dire si $M$ est sur le cercle de diamètre $[AB]$.\n\n$\\mathcal{E}_4$ est donc le cercle de diamètre $[AB]$ privé du point $B$ : son centre est le milieu $2 + i$ de $[AB]$ et son rayon $\\dfrac{AB}{2} = \\dfrac{|4 - 2i|}{2} = \\sqrt{5}$.\n\nVariante par le calcul : avec $z = x + iy$, la partie réelle de $(z - 2i)\\left(\\overline{z} - 4\\right)$ vaut $x^2 + y^2 - 4x - 2y$, et elle est nulle si et seulement si $(x - 2)^2 + (y - 1)^2 = 5$."
          }
        ]
      },
      {
        titre: "Racines sixièmes et hexagone",
        duree: 20, points: 6, calculatrice: false,
        contexte: "On note $\\omega = e^{i\\frac{\\pi}{3}}$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Écris les six racines sixièmes de l'unité sous forme exponentielle, puis sous forme algébrique.",
            indice: "Ce sont les nombres $e^{\\frac{2ik\\pi}{6}} = e^{\\frac{ik\\pi}{3}} = \\omega^k$, pour $k$ allant de $0$ à $5$.",
            corrige:
              "Ce sont les nombres $\\omega^k = e^{\\frac{ik\\pi}{3}}$ pour $k = 0, 1, \\dots, 5$ :\n" +
              "- $1$ et $e^{i\\pi} = -1$ ;\n" +
              "- $e^{i\\frac{\\pi}{3}} = \\dfrac{1}{2} + \\dfrac{\\sqrt{3}}{2}i$ et $e^{i\\frac{2\\pi}{3}} = -\\dfrac{1}{2} + \\dfrac{\\sqrt{3}}{2}i$ ;\n" +
              "- $e^{i\\frac{4\\pi}{3}} = -\\dfrac{1}{2} - \\dfrac{\\sqrt{3}}{2}i$ et $e^{i\\frac{5\\pi}{3}} = \\dfrac{1}{2} - \\dfrac{\\sqrt{3}}{2}i$."
          },
          {
            n: "2.", points: 1,
            texte: "Montre que la somme de ces six nombres est nulle.",
            indice: "C'est la somme $1 + \\omega + \\dots + \\omega^5$ des termes d'une suite géométrique de raison $\\omega \\neq 1$.",
            corrige: "$1 + \\omega + \\omega^2 + \\dots + \\omega^5 = \\dfrac{1 - \\omega^6}{1 - \\omega} = 0$, car $\\omega^6 = e^{2i\\pi} = 1$ et $\\omega \\neq 1$. On le voit aussi en regroupant les nombres opposés deux à deux."
          },
          {
            n: "3.", points: 2,
            texte: "Vérifie que $z_0 = 2e^{i\\frac{\\pi}{6}}$ est solution de $z^6 = -64$, puis résous cette équation dans $\\mathbb{C}$.",
            indice: "Comme $z_0 \\neq 0$ : $z^6 = -64 \\iff z^6 = z_0^6 \\iff \\left(\\dfrac{z}{z_0}\\right)^6 = 1$.",
            corrige: "$z_0^6 = 2^6e^{i\\pi} = -64$. Comme $z_0 \\neq 0$ : $z^6 = -64 \\iff \\left(\\dfrac{z}{z_0}\\right)^6 = 1$, c'est-à-dire que $\\dfrac{z}{z_0}$ est une racine sixième de l'unité.\n\nLes solutions sont les six nombres $z_k = z_0\\omega^k = 2e^{i\\left(\\frac{\\pi}{6} + \\frac{k\\pi}{3}\\right)}$, pour $k = 0, 1, \\dots, 5$ : $2e^{i\\frac{\\pi}{6}}$, $2e^{i\\frac{\\pi}{2}} = 2i$, $2e^{i\\frac{5\\pi}{6}}$, $2e^{i\\frac{7\\pi}{6}}$, $2e^{i\\frac{3\\pi}{2}} = -2i$ et $2e^{i\\frac{11\\pi}{6}}$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Les images $M_0$, …, $M_5$ de ces solutions forment un hexagone régulier de centre $O$. Calcule $M_0M_1$, puis compare le périmètre de l'hexagone à celui du cercle de centre $O$ et de rayon $2$. Qu'en déduis-tu pour $\\pi$ ?",
            indice: "$z_1 - z_0 = z_0(\\omega - 1)$, et $\\omega - 1 = -\\dfrac{1}{2} + \\dfrac{\\sqrt{3}}{2}i$.",
            corrige: "$M_0M_1 = |z_1 - z_0| = |z_0| \\times |\\omega - 1| = 2 \\times \\sqrt{\\dfrac{1}{4} + \\dfrac{3}{4}} = 2$, et le périmètre de l'hexagone vaut $6 \\times 2 = 12$.\n\nL'hexagone est inscrit dans le cercle de rayon $2$, de périmètre $4\\pi$. Chaque côté est plus court que l'arc de cercle qui joint ses extrémités, donc $12 < 4\\pi$, soit $\\pi > 3$ : c'est le point de départ de la méthode d'Archimède.",
            figureCorrige: (o) => o.graph({
              xmin: -2.6, xmax: 2.6, ymin: -2.6, ymax: 2.6,
              curves: [
                { f: (x) => Math.sqrt(Math.max(0, 4 - x * x)), a: -2, b: 2, closed: false, couleur: 1 },
                { f: (x) => -Math.sqrt(Math.max(0, 4 - x * x)), a: -2, b: 2, closed: false, couleur: 1 }
              ],
              chemins: [[[Math.sqrt(3), 1], [0, 2], [-Math.sqrt(3), 1], [-Math.sqrt(3), -1], [0, -2], [Math.sqrt(3), -1], [Math.sqrt(3), 1]]],
              points: [{ x: Math.sqrt(3), y: 1 }, { x: 0, y: 2 }, { x: -Math.sqrt(3), y: 1 }, { x: -Math.sqrt(3), y: -1 }, { x: 0, y: -2 }, { x: Math.sqrt(3), y: -1 }],
              marques: [
                { x: 2.15, y: 1.3, texte: "M<tspan class=\"sub\" dy=\"3\">0</tspan>" },
                { x: 0.4, y: 2.3, texte: "M<tspan class=\"sub\" dy=\"3\">1</tspan>" },
                { x: -2.15, y: 1.3, texte: "M<tspan class=\"sub\" dy=\"3\">2</tspan>" },
                { x: -2.15, y: -1.4, texte: "M<tspan class=\"sub\" dy=\"3\">3</tspan>" },
                { x: 0.4, y: -2.45, texte: "M<tspan class=\"sub\" dy=\"3\">4</tspan>" },
                { x: 2.15, y: -1.4, texte: "M<tspan class=\"sub\" dy=\"3\">5</tspan>" }
              ],
              aria: "L'hexagone régulier M0 M1 M2 M3 M4 M5, en pointillés, inscrit dans le cercle de centre O et de rayon 2"
            })
          }
        ]
      }
    ]
  }
};
