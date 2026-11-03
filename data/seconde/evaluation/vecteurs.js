/*
  ENTRAÎNEMENT : Seconde — chapitre 7, Vecteurs 1 : translation et coordonnées
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre seconde-vecteurs.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle ou devoir commun de Seconde.
  Colinéarité et déterminant : chapitre 11 (pas ici). Repères orthonormés pour les distances.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["seconde-vecteurs"] = {
  revisions: {
    intro: "Les vecteurs en un coup d'œil : translation, égalité et parallélogramme, Chasles, coordonnées, milieu et distance. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Vecteur et translation",
        texte: "Le vecteur $\\overrightarrow{AB}$ représente la translation qui envoie $A$ sur $B$ : une direction (celle de la droite $(AB)$), un sens (de $A$ vers $B$) et une norme (la longueur $AB$)."
      },
      {
        titre: "Parallélogramme",
        texte: "$\\overrightarrow{AB} = \\overrightarrow{DC}$ si et seulement si $ABCD$ est un parallélogramme (éventuellement aplati). Attention à l'ordre : c'est $\\overrightarrow{DC}$, pas $\\overrightarrow{CD}$."
      },
      {
        titre: "Relation de Chasles",
        texte: "$\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$ : l'arrivée du premier vecteur est le départ du second. Et $\\overrightarrow{AB} + \\overrightarrow{BA} = \\vec{0}$."
      },
      {
        titre: "Coordonnées",
        texte:
          "$\\overrightarrow{AB}\\begin{pmatrix} x_B - x_A \\\\ y_B - y_A \\end{pmatrix}$ : arrivée moins départ.\n\n" +
          "On additionne les coordonnées pour une somme, on les multiplie par $k$ pour $k\\vec{u}$. Deux vecteurs égaux ont les mêmes coordonnées."
      },
      {
        titre: "Milieu",
        texte: "Le milieu $I$ de $[AB]$ a pour coordonnées $\\left(\\dfrac{x_A + x_B}{2}\\,;\\dfrac{y_A + y_B}{2}\\right)$, dans n'importe quel repère. Un quadrilatère dont les diagonales ont le même milieu est un parallélogramme."
      },
      {
        titre: "Norme et distance",
        texte:
          "Dans un repère **orthonormé** :\n\n" +
          "$AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$.\n\n" +
          "C'est le théorème de Pythagore : $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$."
      },
      {
        titre: "Nature d'un quadrilatère",
        texte: "Parallélogramme (vecteurs égaux ou mêmes milieux) ; losange s'il a deux côtés consécutifs égaux ; rectangle si ses diagonales sont égales ; carré s'il est les deux à la fois."
      }
    ],
    pieges: [
      "Faire « départ moins arrivée » : $\\overrightarrow{AB}$ a pour abscisse $x_B - x_A$.",
      "Écrire $\\overrightarrow{AB} = \\overrightarrow{CD}$ pour un parallélogramme $ABCD$ : c'est $\\overrightarrow{DC}$.",
      "Confondre le vecteur nul $\\vec{0}$ et le nombre $0$.",
      "Appliquer Chasles « à l'envers » : $\\overrightarrow{AB} + \\overrightarrow{CB}$ ne se simplifie pas directement.",
      "Oublier de diviser par $2$ pour le milieu.",
      "Additionner les écarts pour une distance : il faut Pythagore et une racine carrée."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle ou au devoir commun (environ $70$ minutes en tout). Le repère est orthonormé. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "La nature d'un quadrilatère",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Dans un repère orthonormé, on considère les points $A(-2\\,;1)$, $B(2\\,;3)$, $C(4\\,;-1)$ et $D(0\\,;-3)$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule les coordonnées de $\\overrightarrow{AB}$ et de $\\overrightarrow{DC}$. Qu'en déduis-tu pour $ABCD$ ?",
            indice: "Arrivée moins départ, puis utilise la propriété du parallélogramme.",
            corrige: "$\\overrightarrow{AB}\\begin{pmatrix} 4 \\\\ 2 \\end{pmatrix}$ et $\\overrightarrow{DC}\\begin{pmatrix} 4 \\\\ 2 \\end{pmatrix}$ : $\\overrightarrow{AB} = \\overrightarrow{DC}$, donc $ABCD$ est un parallélogramme."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule les coordonnées des milieux de $[AC]$ et de $[BD]$. Retrouve le résultat de la question 1.",
            indice: "Moyenne des abscisses, moyenne des ordonnées.",
            corrige: "Milieu de $[AC]$ : $\\left(\\dfrac{-2 + 4}{2}\\,;\\dfrac{1 - 1}{2}\\right) = (1\\,;0)$. Milieu de $[BD]$ : $\\left(\\dfrac{2 + 0}{2}\\,;\\dfrac{3 - 3}{2}\\right) = (1\\,;0)$. Les diagonales ont le même milieu : $ABCD$ est bien un parallélogramme."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule $AB$ et $AD$. Que peux-tu dire de $ABCD$ ?",
            indice: "$\\overrightarrow{AD}$ a pour coordonnées $(0 - (-2)\\,;-3 - 1)$.",
            corrige: "$AB = \\sqrt{4^2 + 2^2} = \\sqrt{20}$ et $\\overrightarrow{AD}\\begin{pmatrix} 2 \\\\ -4 \\end{pmatrix}$, donc $AD = \\sqrt{4 + 16} = \\sqrt{20}$. Le parallélogramme a deux côtés consécutifs égaux : c'est un losange."
          },
          {
            n: "4.", points: 1.5,
            texte: "Calcule $AC$ et $BD$. Conclus sur la nature de $ABCD$.",
            indice: "Un losange dont les diagonales ont la même longueur est un carré.",
            corrige: "$\\overrightarrow{AC}\\begin{pmatrix} 6 \\\\ -2 \\end{pmatrix}$, donc $AC = \\sqrt{40}$, et $\\overrightarrow{BD}\\begin{pmatrix} -2 \\\\ -6 \\end{pmatrix}$, donc $BD = \\sqrt{40}$. Les diagonales du losange sont égales : $ABCD$ est un **carré**. (Pythagore le confirme : $BD^2 = 40 = AB^2 + AD^2$, l'angle en $A$ est droit.)"
          },
          {
            n: "5.", points: 1,
            texte: "Donne les coordonnées de l'image $E'$ du point $E(1\\,;1)$ par la translation de vecteur $\\overrightarrow{AB}$.",
            indice: "$\\overrightarrow{EE'} = \\overrightarrow{AB}$.",
            corrige: "$\\overrightarrow{EE'} = \\overrightarrow{AB}$ donne $x_{E'} - 1 = 4$ et $y_{E'} - 1 = 2$, donc $E'(5\\,;3)$."
          }
        ]
      },
      {
        titre: "Le tour de l'îlot",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Sur une carte du lagon dans un repère orthonormé (unité : le kilomètre), un bateau part du port $M(1\\,;2)$, fait escale à l'îlot $I(4\\,;6)$, puis rejoint la plage $P(7\\,;2)$.",
        figure: (o) => o.graph({
          xmin: -0.5, xmax: 8.5, ymin: -0.5, ymax: 7.5, h: 280,
          points: [{ x: 1, y: 2, label: "M", gauche: true }, { x: 4, y: 6, label: "I" }, { x: 7, y: 2, label: "P" }],
          fleches: [{ x1: 1, y1: 2, x2: 4, y2: 6 }, { x1: 4, y1: 6, x2: 7, y2: 2, c: 1 }],
          aria: "Trajet du bateau : du port M(1 ; 2) à l'îlot I(4 ; 6), puis de l'îlot à la plage P(7 ; 2)"
        }),
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule les coordonnées de $\\overrightarrow{MI}$ et la distance $MI$.",
            indice: "$MI = \\sqrt{x^2 + y^2}$ avec les coordonnées de $\\overrightarrow{MI}$.",
            corrige: "$\\overrightarrow{MI}\\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}$ et $MI = \\sqrt{9 + 16} = \\sqrt{25} = 5$ km."
          },
          {
            n: "2.", points: 1.5,
            texte: "Même question pour $\\overrightarrow{IP}$. Que peut-on dire du triangle $MIP$ ?",
            indice: "Compare $MI$ et $IP$.",
            corrige: "$\\overrightarrow{IP}\\begin{pmatrix} 3 \\\\ -4 \\end{pmatrix}$ et $IP = \\sqrt{9 + 16} = 5$ km. Comme $MI = IP$, le triangle $MIP$ est isocèle en $I$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule $\\overrightarrow{MI} + \\overrightarrow{IP}$ de deux façons. Combien de kilomètres le détour par l'îlot ajoute-t-il ?",
            indice: "Avec les coordonnées, puis avec la relation de Chasles.",
            corrige: "En coordonnées : $\\begin{pmatrix} 3 + 3 \\\\ 4 - 4 \\end{pmatrix} = \\begin{pmatrix} 6 \\\\ 0 \\end{pmatrix}$. Par Chasles : $\\overrightarrow{MI} + \\overrightarrow{IP} = \\overrightarrow{MP}$, qui a bien ces coordonnées. Le trajet direct fait $MP = 6$ km, le trajet par l'îlot $5 + 5 = 10$ km : le détour ajoute $4$ km."
          },
          {
            n: "4.", points: 1.5,
            texte: "Soit $H$ le milieu de $[MP]$. Calcule ses coordonnées, puis la distance $IH$ et l'aire du triangle $MIP$.",
            indice: "Dans un triangle isocèle, le milieu de la base est le pied de la hauteur.",
            corrige: "$H\\left(\\dfrac{1 + 7}{2}\\,;\\dfrac{2 + 2}{2}\\right) = (4\\,;2)$ et $\\overrightarrow{IH}\\begin{pmatrix} 0 \\\\ -4 \\end{pmatrix}$, donc $IH = 4$ km. Comme $MIP$ est isocèle en $I$, $[IH]$ est une hauteur : l'aire vaut $\\dfrac{MP \\times IH}{2} = \\dfrac{6 \\times 4}{2} = 12$ km²."
          },
          {
            n: "5.", points: 1,
            texte:
              "Que renvoie $\\texttt{distance(1, 2, 4, 6)}$ ?\n\n" +
              "```python\nfrom math import sqrt\n\ndef distance(xA, yA, xB, yB):\n    dx = xB - xA\n    dy = yB - yA\n    return sqrt(dx**2 + dy**2)\n```",
            indice: "C'est la distance entre $M$ et $I$.",
            corrige: "$\\sqrt{3^2 + 4^2} = \\sqrt{25}$ : la fonction renvoie $\\texttt{5.0}$, la distance $MI$ de la question 1."
          }
        ]
      },
      {
        titre: "Calcul vectoriel",
        duree: 20, points: 6, calculatrice: false,
        contexte: "Les questions sont indépendantes. Dans les questions 2 et 3, $\\vec{u}\\begin{pmatrix} 3 \\\\ -2 \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} -1 \\\\ 4 \\end{pmatrix}$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Simplifie $\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CA}$, puis $\\overrightarrow{MA} + \\overrightarrow{AB} - \\overrightarrow{MB}$.",
            indice: "Relation de Chasles, et $-\\overrightarrow{MB} = \\overrightarrow{BM}$.",
            corrige: "$\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CA} = \\overrightarrow{AC} + \\overrightarrow{CA} = \\overrightarrow{AA} = \\vec{0}$. Et $\\overrightarrow{MA} + \\overrightarrow{AB} - \\overrightarrow{MB} = \\overrightarrow{MB} + \\overrightarrow{BM} = \\vec{0}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule les coordonnées de $\\vec{u} + \\vec{v}$ et de $2\\vec{u} - \\vec{v}$.",
            indice: "On calcule coordonnée par coordonnée.",
            corrige: "$\\vec{u} + \\vec{v}\\begin{pmatrix} 2 \\\\ 2 \\end{pmatrix}$ et $2\\vec{u} - \\vec{v}\\begin{pmatrix} 6 + 1 \\\\ -4 - 4 \\end{pmatrix}$, soit $\\begin{pmatrix} 7 \\\\ -8 \\end{pmatrix}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "On donne $A(2\\,;5)$. Trouve les coordonnées du point $D$ tel que $\\overrightarrow{AD} = \\vec{u}$.",
            indice: "$x_D - 2 = 3$ et $y_D - 5 = -2$.",
            corrige: "$x_D - 2 = 3$ et $y_D - 5 = -2$, donc $D(5\\,;3)$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Vrai ou faux : « si $\\overrightarrow{AB} = \\overrightarrow{CD}$, alors $ABCD$ est un parallélogramme ». Justifie.",
            indice: "Attention à l'ordre des lettres : la propriété porte sur $\\overrightarrow{AB} = \\overrightarrow{DC}$.",
            corrige: "**Faux.** Avec $A(0\\,;0)$, $B(1\\,;0)$, $C(0\\,;1)$ et $D(1\\,;1)$ : $\\overrightarrow{AB} = \\overrightarrow{CD}$, mais $ABCD$ est un quadrilatère croisé. C'est $ABDC$ qui est un parallélogramme."
          }
        ]
      }
    ]
  }
};
