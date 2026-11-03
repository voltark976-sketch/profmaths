/*
  ENTRAÎNEMENT : Première spécialité — chapitre 11, Produit scalaire 1
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre premiere-produit-scalaire-1.
  Format : voir data/premiere/evaluation/second-degre-2.js. Sans calculatrice (épreuve anticipée) :
  angles remarquables, √3 ≈ 1,73 donné. Bilinéarité, Al-Kashi et MA · MB = 0 : chapitre 14.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["premiere-produit-scalaire-1"] = {
  revisions: {
    intro: "Le produit scalaire en un coup d'œil : avec le cosinus, par projection, avec les coordonnées, et pour démontrer un angle droit. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Définition",
        texte: "$\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos(\\vec{u}, \\vec{v})$ pour deux vecteurs non nuls, et $0$ si l'un d'eux est nul. Le produit scalaire est un **nombre**, pas un vecteur."
      },
      {
        titre: "Par projection",
        texte: "Si $H$ est le projeté orthogonal de $C$ sur la droite $(AB)$ : $\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = \\overrightarrow{AB} \\cdot \\overrightarrow{AH}$. Il vaut $AB \\times AH$ si $\\overrightarrow{AB}$ et $\\overrightarrow{AH}$ sont de même sens, $-AB \\times AH$ sinon."
      },
      {
        titre: "Orthogonalité",
        texte: "$\\vec{u} \\cdot \\vec{v} = 0 \\iff \\vec{u}$ et $\\vec{v}$ sont orthogonaux (le vecteur nul est orthogonal à tout vecteur). Un produit scalaire nul ne veut pas dire qu'un vecteur est nul."
      },
      {
        titre: "Avec les coordonnées",
        texte:
          "Dans un repère **orthonormé**, avec $\\vec{u}\\begin{pmatrix} x \\\\ y \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} x' \\\\ y' \\end{pmatrix}$ :\n\n" +
          "- $\\vec{u} \\cdot \\vec{v} = xx' + yy'$ ;\n" +
          "- $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$."
      },
      {
        titre: "Calculer un angle",
        texte: "Pour deux vecteurs non nuls : $\\cos(\\vec{u}, \\vec{v}) = \\dfrac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\| \\times \\|\\vec{v}\\|}$. On calcule le produit scalaire avec les coordonnées, puis les normes."
      },
      {
        titre: "Démontrer un angle droit",
        texte: "Pour montrer que $ABC$ est rectangle en $A$ : coordonnées de $\\overrightarrow{AB}$ et de $\\overrightarrow{AC}$, puis $\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = 0$."
      },
      {
        titre: "Travail d'une force",
        texte: "Pour une force constante $\\vec{F}$ et un déplacement de $A$ à $B$ : $W = \\vec{F} \\cdot \\overrightarrow{AB} = F \\times AB \\times \\cos \\alpha$, en joules. Il est nul si la force est perpendiculaire au déplacement, négatif si elle le freine."
      }
    ],
    pieges: [
      "Croire que le produit scalaire est un vecteur : c'est un nombre.",
      "Écrire $\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = AB \\times AC$ en oubliant le cosinus.",
      "Oublier le signe moins quand les vecteurs projetés sont de sens contraires.",
      "Croiser les coordonnées : on calcule $xx' + yy'$, pas $xy' + x'y$.",
      "Oublier la racine carrée dans la norme : c'est $\\|\\vec{u}\\|^2$ qui vaut $x^2 + y^2$.",
      "Conclure qu'un vecteur est nul parce que le produit scalaire est nul."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Un triangle dans un repère",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Dans un repère orthonormé, on considère les points $A(1\\,;-1)$, $B(5\\,;-1)$ et $C(3\\,;1)$.",
        figure: (o) => o.graph({
          xmin: -0.6, xmax: 6.6, ymin: -3.8, ymax: 2.6, h: 260,
          points: [{ x: 1, y: -1, label: "A", gauche: true }, { x: 5, y: -1, label: "B" }, { x: 3, y: 1, label: "C" }],
          curves: [
            { f: () => -1, a: 1, b: 5, closed: false },
            { f: (x) => x - 2, a: 1, b: 3, closed: false },
            { f: (x) => -x + 4, a: 3, b: 5, closed: false }
          ],
          aria: "Le triangle ABC avec A(1 ; -1), B(5 ; -1) et C(3 ; 1)"
        }),
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule les coordonnées des vecteurs $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$, puis le produit scalaire $\\overrightarrow{AB} \\cdot \\overrightarrow{AC}$.",
            indice: "$\\overrightarrow{AB}$ a pour coordonnées $(x_B - x_A\\,;y_B - y_A)$. Puis $xx' + yy'$.",
            corrige: "$\\overrightarrow{AB}\\begin{pmatrix} 4 \\\\ 0 \\end{pmatrix}$ et $\\overrightarrow{AC}\\begin{pmatrix} 2 \\\\ 2 \\end{pmatrix}$, donc $\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = 4 \\times 2 + 0 \\times 2 = 8$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule $AB$ et $AC$, puis déduis-en la mesure de l'angle $\\widehat{BAC}$.",
            indice: "$\\cos \\widehat{BAC} = \\dfrac{\\overrightarrow{AB} \\cdot \\overrightarrow{AC}}{AB \\times AC}$. Reconnais une valeur remarquable.",
            corrige: "$AB = \\sqrt{16 + 0} = 4$ et $AC = \\sqrt{4 + 4} = 2\\sqrt{2}$. Donc $\\cos \\widehat{BAC} = \\dfrac{8}{4 \\times 2\\sqrt{2}} = \\dfrac{1}{\\sqrt{2}} = \\dfrac{\\sqrt{2}}{2}$, et $\\widehat{BAC} = 45°$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Montre que le triangle $ABC$ est rectangle en $C$.",
            indice: "Calcule $\\overrightarrow{CA} \\cdot \\overrightarrow{CB}$.",
            corrige: "$\\overrightarrow{CA}\\begin{pmatrix} -2 \\\\ -2 \\end{pmatrix}$ et $\\overrightarrow{CB}\\begin{pmatrix} 2 \\\\ -2 \\end{pmatrix}$, donc $\\overrightarrow{CA} \\cdot \\overrightarrow{CB} = -4 + 4 = 0$ : les vecteurs sont orthogonaux, le triangle est rectangle en $C$. Avec l'angle de $45°$ en $A$, il est même isocèle rectangle."
          },
          {
            n: "4.", points: 1.5,
            texte: "On place $D(3\\,;-3)$. Montre que $ACBD$ est un carré.",
            indice: "Compare $\\overrightarrow{AC}$ et $\\overrightarrow{DB}$, puis utilise la question 3 et $CA = CB$.",
            corrige: "$\\overrightarrow{DB}\\begin{pmatrix} 2 \\\\ 2 \\end{pmatrix} = \\overrightarrow{AC}$ : $ACBD$ est un parallélogramme. Il a un angle droit en $C$ (question 3) et deux côtés consécutifs égaux, $CA = CB = 2\\sqrt{2}$ : c'est un carré."
          },
          {
            n: "5.", points: 1,
            texte:
              "Que renvoie ce programme ?\n\n" +
              "```python\ndef prodscal(u, v):\n    a = u[0] * v[0]\n    b = u[1] * v[1]\n    return a + b\n\nu = (-2, -2)\nv = (2, -2)\nprint(prodscal(u, v))\n```",
            indice: "Les deux couples sont les coordonnées de $\\overrightarrow{CA}$ et $\\overrightarrow{CB}$.",
            corrige: "$(-2) \\times 2 + (-2) \\times (-2) = -4 + 4 = 0$ : le programme affiche $\\texttt{0}$, comme à la question 3."
          }
        ]
      },
      {
        titre: "Produits scalaires dans un rectangle",
        duree: 25, points: 7, calculatrice: false,
        contexte: "$ABCD$ est un rectangle tel que $AB = 6$ et $AD = 3$. Le point $I$ est le milieu de $[CD]$.",
        figure: (o) => o.graph({
          xmin: -0.8, xmax: 6.8, ymin: -0.8, ymax: 3.8, h: 230, xetiq: 10, yetiq: 10,
          points: [{ x: 0, y: 0, label: "A", gauche: true }, { x: 6, y: 0, label: "B" }, { x: 6, y: 3, label: "C" }, { x: 0, y: 3, label: "D", gauche: true }, { x: 3, y: 3, label: "I" }],
          rects: [{ a: 0, b: 6, h: 3 }],
          curves: [
            { f: (x) => x, a: 0, b: 3, closed: false, couleur: 1 }, { f: (x) => 6 - x, a: 3, b: 6, closed: false, couleur: 1 }
          ],
          aria: "Le rectangle ABCD de longueur 6 et de largeur 3, le milieu I de [CD] et les segments [AI] et [BI]"
        }),
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $\\overrightarrow{AB} \\cdot \\overrightarrow{AC}$ par projection.",
            indice: "Le projeté orthogonal de $C$ sur la droite $(AB)$ est le point $B$.",
            corrige: "Le projeté orthogonal de $C$ sur $(AB)$ est $B$, donc $\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = \\overrightarrow{AB} \\cdot \\overrightarrow{AB} = AB^2 = 36$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule $\\overrightarrow{AB} \\cdot \\overrightarrow{AI}$.",
            indice: "Le projeté orthogonal de $I$ sur $(AB)$ est le milieu de $[AB]$.",
            corrige: "Le projeté orthogonal de $I$ sur $(AB)$ est le milieu $H$ de $[AB]$, et $\\overrightarrow{AH}$ a le même sens que $\\overrightarrow{AB}$ : $\\overrightarrow{AB} \\cdot \\overrightarrow{AI} = AB \\times AH = 6 \\times 3 = 18$."
          },
          {
            n: "3.", points: 1,
            texte: "Calcule $\\overrightarrow{AB} \\cdot \\overrightarrow{CD}$.",
            indice: "$\\overrightarrow{CD} = -\\overrightarrow{AB}$.",
            corrige: "$\\overrightarrow{CD} = -\\overrightarrow{AB}$ : les vecteurs sont colinéaires de sens contraires, donc $\\overrightarrow{AB} \\cdot \\overrightarrow{CD} = -AB^2 = -36$."
          },
          {
            n: "4.", points: 1.5,
            texte: "On se place dans le repère orthonormé où $A(0\\,;0)$, $B(6\\,;0)$, $C(6\\,;3)$ et $D(0\\,;3)$. Pour un point $M(x\\,;3)$ du segment $[CD]$, montre que $\\overrightarrow{MA} \\cdot \\overrightarrow{MB} = (x - 3)^2$.",
            indice: "$\\overrightarrow{MA}$ a pour coordonnées $(-x\\,;-3)$ et $\\overrightarrow{MB}$ $(6 - x\\,;-3)$.",
            corrige: "$\\overrightarrow{MA}\\begin{pmatrix} -x \\\\ -3 \\end{pmatrix}$ et $\\overrightarrow{MB}\\begin{pmatrix} 6 - x \\\\ -3 \\end{pmatrix}$, donc $\\overrightarrow{MA} \\cdot \\overrightarrow{MB} = -x(6 - x) + 9 = x^2 - 6x + 9 = (x - 3)^2$."
          },
          {
            n: "5.", points: 1.5,
            texte: "Existe-t-il des points $M$ de $[CD]$ tels que l'angle $\\widehat{AMB}$ soit droit ? Lesquels ?",
            indice: "L'angle est droit quand $\\overrightarrow{MA} \\cdot \\overrightarrow{MB} = 0$.",
            corrige: "$\\widehat{AMB}$ est droit $\\iff \\overrightarrow{MA} \\cdot \\overrightarrow{MB} = 0 \\iff (x - 3)^2 = 0 \\iff x = 3$. Un seul point convient : $M = I$, le milieu de $[CD]$. Partout ailleurs sur $[CD]$, le produit scalaire est positif et l'angle est aigu."
          }
        ]
      },
      {
        titre: "Le kitesurfeur et sa voile",
        duree: 20, points: 6, calculatrice: false,
        contexte: "Dans le lagon, la voile d'un kitesurfeur le tire avec une force constante d'intensité $F = 400$ N. Il parcourt $50$ m en ligne droite. On note $\\alpha$ l'angle entre la force et le déplacement : le travail de la force est $W = F \\times 50 \\times \\cos \\alpha$, en joules. On donne $\\sqrt{3} \\approx 1{,}73$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule le travail de la force pour $\\alpha = 60°$.",
            indice: "$\\cos 60° = \\dfrac{1}{2}$.",
            corrige: "$W = 400 \\times 50 \\times \\cos 60° = 20\\,000 \\times \\dfrac{1}{2} = 10\\,000$ J."
          },
          {
            n: "2.", points: 1.5,
            texte: "Même question pour $\\alpha = 30°$. Donne la valeur exacte, puis une valeur approchée.",
            indice: "$\\cos 30° = \\dfrac{\\sqrt{3}}{2}$.",
            corrige: "$W = 20\\,000 \\times \\dfrac{\\sqrt{3}}{2} = 10\\,000\\sqrt{3}$ J, soit environ $17\\,300$ J : plus la force est dans l'axe du déplacement, plus son travail est grand."
          },
          {
            n: "3.", points: 1,
            texte: "Que vaut le travail pour $\\alpha = 90°$ ? Interprète.",
            indice: "$\\cos 90° = 0$.",
            corrige: "$W = 20\\,000 \\times 0 = 0$ J : une force perpendiculaire au déplacement ne fait pas avancer le kitesurfeur."
          },
          {
            n: "4.", points: 1,
            texte: "Une rafale fait tourner la voile : $\\alpha = 120°$. Que devient le travail ? Interprète son signe.",
            indice: "$\\cos 120° = -\\dfrac{1}{2}$.",
            corrige: "$W = 20\\,000 \\times \\left(-\\dfrac{1}{2}\\right) = -10\\,000$ J. Le travail est négatif : la force freine le kitesurfeur au lieu de le faire avancer."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « si $\\vec{u} \\cdot \\vec{v} = 0$, alors $\\vec{u}$ ou $\\vec{v}$ est le vecteur nul ». Justifie.",
            indice: "Cherche deux vecteurs non nuls orthogonaux, par exemple dans un repère orthonormé.",
            corrige: "**Faux.** Avec $\\vec{u}\\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix}$, $\\vec{u} \\cdot \\vec{v} = 0$ alors qu'aucun des deux n'est nul : ils sont orthogonaux, comme la force et le déplacement de la question 3."
          }
        ]
      }
    ]
  }
};
