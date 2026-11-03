/*
  ENTRAÎNEMENT : Première spécialité — chapitre 15, Géométrie repérée
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre premiere-geometrie-reperee.
  Format : voir data/premiere/evaluation/second-degre-2.js. Sans calculatrice (épreuve anticipée) : √5 ≈ 2,24 donné.
  Tous les repères sont orthonormés.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["premiere-geometrie-reperee"] = {
  revisions: {
    intro: "La géométrie repérée en un coup d'œil : vecteur normal, équations de droites et de cercles, projeté orthogonal et disques. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Vecteur normal",
        texte: "La droite d'équation $ax + by + c = 0$ a pour vecteur normal $\\vec{n}\\begin{pmatrix} a \\\\ b \\end{pmatrix}$ et pour vecteur directeur $\\vec{u}\\begin{pmatrix} -b \\\\ a \\end{pmatrix}$."
      },
      {
        titre: "Droite et vecteur normal",
        texte:
          "La droite passant par $A$ et de vecteur normal $\\vec{n}\\begin{pmatrix} a \\\\ b \\end{pmatrix}$ est l'ensemble des points $M$ tels que $\\overrightarrow{AM} \\cdot \\vec{n} = 0$ :\n\n" +
          "$a(x - x_A) + b(y - y_A) = 0$."
      },
      {
        titre: "Projeté orthogonal",
        texte: "Le projeté orthogonal $H$ de $A$ sur $d$ est l'intersection de $d$ avec la perpendiculaire à $d$ passant par $A$ (dirigée par un vecteur normal de $d$). $AH$ est la distance de $A$ à la droite $d$."
      },
      {
        titre: "Équation d'un cercle",
        texte: "Le cercle de centre $\\Omega(a\\,;b)$ et de rayon $r$ a pour équation $(x - a)^2 + (y - b)^2 = r^2$. Attention aux signes : $(x + 2)^2$ correspond à l'abscisse $-2$ du centre."
      },
      {
        titre: "Centre et rayon",
        texte:
          "On complète les carrés : $x^2 + y^2 - 4x + 6y - 3 = 0$ devient\n\n" +
          "$(x - 2)^2 + (y + 3)^2 = 16$ : cercle de centre $(2\\,;-3)$ et de rayon $4$.\n\n" +
          "Si le nombre de droite est nul, l'ensemble est un point ; s'il est négatif, il est vide."
      },
      {
        titre: "Cercle ou disque ?",
        texte:
          "- cercle : $(x - a)^2 + (y - b)^2 = r^2$ ;\n" +
          "- disque : $(x - a)^2 + (y - b)^2 \\leqslant r^2$, par exemple la zone couverte par une antenne de portée $r$."
      },
      {
        titre: "Python : dans le disque ?",
        texte:
          "```python\ndef couvert(x, y, a, b, r):\n    d2 = (x-a)**2 + (y-b)**2\n    return d2 <= r**2\n```\n\n" +
          "On compare les carrés : pas besoin de racine carrée."
      }
    ],
    pieges: [
      "Confondre vecteur normal $\\begin{pmatrix} a \\\\ b \\end{pmatrix}$ et vecteur directeur $\\begin{pmatrix} -b \\\\ a \\end{pmatrix}$.",
      "Se tromper de signe en lisant le centre : $(x + 2)^2$ correspond à l'abscisse $-2$.",
      "Prendre $r^2$ pour le rayon : dans $(x - a)^2 + (y - b)^2 = 25$, le rayon vaut $5$.",
      "Oublier de compenser en complétant les carrés : $x^2 - 4x = (x - 2)^2 - 4$.",
      "Croire qu'une équation $x^2 + y^2 + \\dots = 0$ donne toujours un cercle : ce peut être un point, ou rien.",
      "Confondre cercle (égalité) et disque (inégalité)."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $70$ minutes en tout). Le repère est orthonormé. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Distance d'un point à une droite",
        duree: 25, points: 7, calculatrice: false,
        contexte: "On considère la droite $d$ d'équation $2x - y + 3 = 0$ et le point $A(4\\,;1)$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Donne un vecteur normal $\\vec{n}$ et un vecteur directeur $\\vec{u}$ de $d$.",
            indice: "Pour $ax + by + c = 0$ : normal $(a\\,;b)$, directeur $(-b\\,;a)$.",
            corrige: "$\\vec{n}\\begin{pmatrix} 2 \\\\ -1 \\end{pmatrix}$ est normal à $d$, et $\\vec{u}\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}$ la dirige. On vérifie : $\\vec{n} \\cdot \\vec{u} = 2 - 2 = 0$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Détermine une équation de la droite $\\Delta$ passant par $A$ et perpendiculaire à $d$.",
            indice: "$\\Delta$ est perpendiculaire à $d$ : le vecteur directeur $\\vec{u}$ de $d$ est normal à $\\Delta$.",
            corrige: "$\\vec{u}\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}$ est normal à $\\Delta$, donc $M(x\\,;y) \\in \\Delta \\iff 1 \\times (x - 4) + 2(y - 1) = 0 \\iff x + 2y - 6 = 0$."
          },
          {
            n: "3.", points: 2,
            texte: "Déduis-en les coordonnées du projeté orthogonal $H$ de $A$ sur $d$.",
            indice: "$H$ est sur $d$ et sur $\\Delta$ : résous le système. De $d$, tire $y = 2x + 3$.",
            corrige: "$H$ est l'intersection de $d$ et de $\\Delta$. Avec $y = 2x + 3$ dans $x + 2y - 6 = 0$ : $x + 4x + 6 - 6 = 0$, donc $x = 0$ et $y = 3$. Ainsi $H(0\\,;3)$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Calcule la distance du point $A$ à la droite $d$.",
            indice: "C'est la longueur $AH$.",
            corrige: "$AH = \\sqrt{(0 - 4)^2 + (3 - 1)^2} = \\sqrt{16 + 4} = \\sqrt{20} = 2\\sqrt{5}$."
          },
          {
            n: "5.", points: 1,
            texte: "Vérifie que $\\overrightarrow{AH}$ est colinéaire à $\\vec{n}$. Pourquoi est-ce normal ?",
            indice: "Calcule les coordonnées de $\\overrightarrow{AH}$ et compare avec $\\vec{n}$.",
            corrige: "$\\overrightarrow{AH}\\begin{pmatrix} -4 \\\\ 2 \\end{pmatrix} = -2\\,\\vec{n}$ : les vecteurs sont colinéaires. C'est normal, car $(AH)$ est perpendiculaire à $d$, comme son vecteur normal."
          }
        ]
      },
      {
        titre: "Les antennes relais",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Sur une carte du nord de Mayotte (unité : le kilomètre), une antenne relais $A$ est à l'origine $O(0\\,;0)$, avec une portée de $5$ km, et une antenne $B$ est en $(8\\,;2)$, avec une portée de $4$ km. Deux villages sont en $V_1(3\\,;4)$ et $V_2(4\\,;4)$. On donne $\\sqrt{5} \\approx 2{,}24$.",
        figure: (o) => o.graph({
          xmin: -1, xmax: 9.5, ymin: -1, ymax: 6.5, h: 280,
          curves: [
            { f: (x) => Math.sqrt(Math.max(0, 25 - x * x)), a: -0.95, b: 5, closed: false },
            { f: (x) => 2 + Math.sqrt(Math.max(0, 16 - (x - 8) ** 2)), a: 4, b: 9.45, closed: false, couleur: 1 },
            { f: (x) => 2 - Math.sqrt(Math.max(0, 16 - (x - 8) ** 2)), a: 4, b: 9.45, closed: false, couleur: 1 }
          ],
          points: [{ x: 0, y: 0, label: "A", gauche: true }, { x: 8, y: 2, label: "B" }, { x: 3, y: 4, label: "V₁", gauche: true }, { x: 4, y: 4, label: "V₂" }],
          aria: "Carte : l'antenne A à l'origine et le bord de sa zone (cercle de rayon 5), l'antenne B en (8 ; 2) et le bord de sa zone (cercle de rayon 4), les villages V1(3 ; 4) et V2(4 ; 4)"
        }),
        questions: [
          {
            n: "1.", points: 1,
            texte: "Écris une équation du cercle qui limite la zone couverte par l'antenne $A$.",
            indice: "Cercle de centre $O$ et de rayon $5$.",
            corrige: "$x^2 + y^2 = 25$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Les villages $V_1$ et $V_2$ sont-ils couverts par l'antenne $A$ ?",
            indice: "Un point est couvert quand $x^2 + y^2 \\leqslant 25$.",
            corrige: "$V_1$ : $3^2 + 4^2 = 25 \\leqslant 25$, il est couvert (juste au bord de la zone). $V_2$ : $4^2 + 4^2 = 32 > 25$, il n'est pas couvert par $A$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Écris l'inéquation de la zone couverte par $B$. Le village $V_2$ est-il couvert par $B$ ?",
            indice: "Disque de centre $(8\\,;2)$ et de rayon $4$ : $(x - 8)^2 + (y - 2)^2 \\leqslant 16$.",
            corrige: "Zone de $B$ : $(x - 8)^2 + (y - 2)^2 \\leqslant 16$. Pour $V_2$ : $(4 - 8)^2 + (4 - 2)^2 = 16 + 4 = 20 > 16$ : $V_2$ n'est pas couvert par $B$ non plus."
          },
          {
            n: "4.", points: 1.5,
            texte: "Quelle portée minimale faudrait-il donner à l'antenne $B$ pour couvrir $V_2$ ?",
            indice: "Il faut que la distance $BV_2$ soit inférieure ou égale à la portée.",
            corrige: "$BV_2 = \\sqrt{20} = 2\\sqrt{5} \\approx 4{,}48$ km. Il faut une portée d'au moins $2\\sqrt{5}$ km, environ $4{,}5$ km."
          },
          {
            n: "5.", points: 1.5,
            texte:
              "On utilise cette fonction. Que renvoient les deux appels ? Conclus pour le village $V_2$.\n\n" +
              "```python\ndef couvert(x, y, a, b, r):\n    d2 = (x-a)**2 + (y-b)**2\n    return d2 <= r**2\n\nprint(couvert(4, 4, 0, 0, 5))\nprint(couvert(4, 4, 8, 2, 4))\n```",
            indice: "Le premier appel teste l'antenne $A$, le second l'antenne $B$, pour le point $(4\\,;4)$.",
            corrige: "Le premier appel compare $32$ et $25$ : $\\texttt{False}$. Le second compare $20$ et $16$ : $\\texttt{False}$. Le village $V_2$ n'est couvert par aucune des deux antennes : il faut augmenter une portée ou installer une autre antenne."
          }
        ]
      },
      {
        titre: "Reconnaître un ensemble de points",
        duree: 20, points: 6, calculatrice: false,
        contexte: "Pour chacune des équations des questions 1 à 3, détermine l'ensemble des points $M(x\\,;y)$ qui la vérifient.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "$x^2 + y^2 - 4x + 2y - 4 = 0$.",
            indice: "Complète les carrés : $x^2 - 4x = (x - 2)^2 - 4$ et $y^2 + 2y = (y + 1)^2 - 1$.",
            corrige: "L'équation s'écrit $(x - 2)^2 - 4 + (y + 1)^2 - 1 - 4 = 0$, soit $(x - 2)^2 + (y + 1)^2 = 9$ : c'est le cercle de centre $(2\\,;-1)$ et de rayon $3$."
          },
          {
            n: "2.", points: 1.5,
            texte: "$x^2 + y^2 + 6x + 10 = 0$.",
            indice: "$x^2 + 6x = (x + 3)^2 - 9$.",
            corrige: "L'équation s'écrit $(x + 3)^2 - 9 + y^2 + 10 = 0$, soit $(x + 3)^2 + y^2 = -1$. Une somme de carrés n'est jamais négative : l'ensemble est **vide**."
          },
          {
            n: "3.", points: 1.5,
            texte: "$x^2 + y^2 - 2x - 4y + 5 = 0$.",
            indice: "$x^2 - 2x = (x - 1)^2 - 1$ et $y^2 - 4y = (y - 2)^2 - 4$.",
            corrige: "L'équation s'écrit $(x - 1)^2 + (y - 2)^2 = 0$. Une somme de deux carrés est nulle seulement si les deux sont nuls : l'ensemble est le **seul point** $(1\\,;2)$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Vrai ou faux : « la droite d'équation $y = 2$ et le cercle de la question 1 ont un seul point commun ». Justifie.",
            indice: "Remplace $y$ par $2$ dans l'équation $(x - 2)^2 + (y + 1)^2 = 9$.",
            corrige: "**Vrai.** Avec $y = 2$ : $(x - 2)^2 + 9 = 9 \\iff (x - 2)^2 = 0 \\iff x = 2$. Un seul point commun, $(2\\,;2)$ : la droite touche le cercle en son point le plus haut."
          }
        ]
      }
    ]
  }
};
