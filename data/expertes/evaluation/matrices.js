/*
  ENTRAÎNEMENT : Terminale maths expertes — chapitre 9, Matrices et calcul matriciel
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre expertes-matrices.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths expertes.
  Une matrice s'écrit $\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$. Les suites de matrices sont au chapitre 11.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["expertes-matrices"] = {
  revisions: {
    intro: "Le calcul matriciel en un coup d'œil : opérations, produit « ligne par colonne », puissances, inverse, systèmes linéaires et transformations du plan. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Matrices",
        texte: "Une matrice $n \\times p$ a $n$ lignes et $p$ colonnes ; $a_{ij}$ est sur la ligne $i$ et la colonne $j$. On additionne deux matrices de même taille, et on multiplie par un réel, coefficient par coefficient."
      },
      {
        titre: "Produit",
        texte: "Si $A$ a autant de colonnes que $B$ a de lignes, le coefficient $(AB)_{ij}$ s'obtient avec la ligne $i$ de $A$ et la colonne $j$ de $B$ : $\\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}\\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix} = \\begin{pmatrix} 11 \\\\ 4 \\end{pmatrix}$. En général, $AB \\neq BA$."
      },
      {
        titre: "Puissances",
        texte: "$A^n = A \\times A \\times \\dots \\times A$ ($n$ facteurs) et $A^0 = I$. Pour une matrice diagonale, on élève chaque coefficient diagonal à la puissance $n$ ; sinon, on calcule les premières puissances, on conjecture, puis on démontre par récurrence."
      },
      {
        titre: "Inverse",
        texte: "$A$ est inversible s'il existe $B$ telle que $AB = BA = I$. Pour $A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$ avec $ad - bc \\neq 0$ : $A^{-1} = \\dfrac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$."
      },
      {
        titre: "Systèmes linéaires",
        texte: "Un système de deux équations à deux inconnues s'écrit $AX = B$. Si $A$ est inversible, on multiplie à gauche par $A^{-1}$ : $X = A^{-1}B$."
      },
      {
        titre: "Transformations du plan",
        texte:
          "Dans un repère orthonormé, l'image de $X = \\begin{pmatrix} x \\\\ y \\end{pmatrix}$ est $MX$ :\n" +
          "- rotation de centre $O$ et d'angle $\\theta$ : $M = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}$ ;\n" +
          "- symétrie d'axe $(Ox)$ : $M = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$."
      }
    ],
    pieges: [
      "Inverser lignes et colonnes : $a_{ij}$ est sur la ligne $i$ et la colonne $j$.",
      "Multiplier les coefficients placés au même endroit : le produit se fait « ligne par colonne ».",
      "Écrire $AB = BA$ : le produit n'est pas commutatif.",
      "Calculer $A^2$ en élevant chaque coefficient au carré.",
      "Écrire $X = BA^{-1}$ au lieu de $X = A^{-1}B$.",
      "Prendre l'inverse de chaque coefficient pour calculer $A^{-1}$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Une matrice et son inverse",
        duree: 25, points: 7, calculatrice: false,
        contexte: "On considère la matrice $A = \\begin{pmatrix} 4 & 3 \\\\ 1 & 1 \\end{pmatrix}$, et on note $I = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $A^2$.",
            indice: "$A^2 = A \\times A$ : chaque coefficient s'obtient « ligne de $A$ par colonne de $A$ ».",
            corrige: "Coefficient en haut à gauche : ligne $1$ par colonne $1$, $4 \\times 4 + 3 \\times 1 = 19$. De même pour les trois autres :\n\n$A^2 = \\begin{pmatrix} 16 + 3 & 12 + 3 \\\\ 4 + 1 & 3 + 1 \\end{pmatrix} = \\begin{pmatrix} 19 & 15 \\\\ 5 & 4 \\end{pmatrix}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Vérifie que $A^2 = 5A - I$.",
            indice: "Calcule $5A$, puis retranche $1$ aux coefficients de la diagonale.",
            corrige: "$5A - I = \\begin{pmatrix} 20 & 15 \\\\ 5 & 5 \\end{pmatrix} - \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix} = \\begin{pmatrix} 19 & 15 \\\\ 5 & 4 \\end{pmatrix} = A^2$."
          },
          {
            n: "3.", points: 2,
            texte: "Déduis-en que $A$ est inversible et donne $A^{-1}$.",
            indice: "Écris l'égalité de la question 2 sous la forme $A \\times (\\dots) = I$.",
            corrige: "$A^2 = 5A - I$ s'écrit $5A - A^2 = I$, soit $A(5I - A) = I$, et de même $(5I - A)A = I$. Donc $A$ est inversible et $A^{-1} = 5I - A = \\begin{pmatrix} 1 & -3 \\\\ -1 & 4 \\end{pmatrix}$.\n\nVérification avec la formule : $ad - bc = 4 - 3 = 1$, et $A^{-1} = \\begin{pmatrix} 1 & -3 \\\\ -1 & 4 \\end{pmatrix}$."
          },
          {
            n: "4.", points: 2,
            texte: "Résous le système $\\begin{cases} 4x + 3y = 5 \\\\ x + y = 2 \\end{cases}$.",
            indice: "Le système s'écrit $AX = B$ avec $X = \\begin{pmatrix} x \\\\ y \\end{pmatrix}$ et $B = \\begin{pmatrix} 5 \\\\ 2 \\end{pmatrix}$.",
            corrige: "Le système s'écrit $AX = B$, donc $X = A^{-1}B = \\begin{pmatrix} 1 & -3 \\\\ -1 & 4 \\end{pmatrix}\\begin{pmatrix} 5 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 5 - 6 \\\\ -5 + 8 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ 3 \\end{pmatrix}$.\n\nLa solution est $x = -1$ et $y = 3$. Vérification : $4 \\times (-1) + 3 \\times 3 = 5$ et $-1 + 3 = 2$."
          }
        ]
      },
      {
        titre: "Puissances d'une matrice",
        duree: 25, points: 7, calculatrice: false,
        contexte: "On considère les matrices $A = \\begin{pmatrix} 3 & 1 \\\\ 0 & 3 \\end{pmatrix}$ et $N = \\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $A^2$ et $A^3$.",
            indice: "$A^3 = A^2 \\times A$.",
            corrige: "$A^2 = \\begin{pmatrix} 9 & 6 \\\\ 0 & 9 \\end{pmatrix}$ et $A^3 = A^2 \\times A = \\begin{pmatrix} 27 & 9 + 18 \\\\ 0 & 27 \\end{pmatrix} = \\begin{pmatrix} 27 & 27 \\\\ 0 & 27 \\end{pmatrix}$."
          },
          {
            n: "2.", points: 2.5,
            texte: "Démontre par récurrence que, pour tout entier $n \\geqslant 1$, $A^n = \\begin{pmatrix} 3^n & n \\times 3^{n-1} \\\\ 0 & 3^n \\end{pmatrix}$.",
            indice: "Pour l'hérédité, calcule $A^{n+1} = A^n \\times A$ et factorise par $3^n$ le coefficient en haut à droite.",
            corrige: "Initialisation : pour $n = 1$, la formule donne $\\begin{pmatrix} 3 & 1 \\\\ 0 & 3 \\end{pmatrix} = A$.\n\nHérédité : si $A^n = \\begin{pmatrix} 3^n & n \\times 3^{n-1} \\\\ 0 & 3^n \\end{pmatrix}$, alors $A^{n+1} = A^n \\times A = \\begin{pmatrix} 3^{n+1} & 3^n + 3n \\times 3^{n-1} \\\\ 0 & 3^{n+1} \\end{pmatrix}$, et $3^n + n \\times 3^n = (n + 1) \\times 3^n$ : c'est la formule au rang $n + 1$.\n\nConclusion : la formule est vraie pour tout $n \\geqslant 1$."
          },
          {
            n: "3.", points: 1,
            texte: "Calcule $A^4$ de deux façons : avec la formule, puis en calculant $\\left(A^2\\right)^2$.",
            indice: "Avec la formule, $n = 4$ : $3^4 = 81$ et $4 \\times 3^3 = 108$.",
            corrige: "Avec la formule : $A^4 = \\begin{pmatrix} 81 & 108 \\\\ 0 & 81 \\end{pmatrix}$. Et $\\left(A^2\\right)^2 = \\begin{pmatrix} 9 & 6 \\\\ 0 & 9 \\end{pmatrix}^2 = \\begin{pmatrix} 81 & 54 + 54 \\\\ 0 & 81 \\end{pmatrix}$ : on retrouve le même résultat."
          },
          {
            n: "4.", points: 2,
            texte: "Détermine toutes les matrices $M = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$ telles que $MN = NM$.",
            indice: "Calcule $MN$ et $NM$, puis identifie les coefficients.",
            corrige: "$MN = \\begin{pmatrix} 0 & a \\\\ 0 & c \\end{pmatrix}$ et $NM = \\begin{pmatrix} c & d \\\\ 0 & 0 \\end{pmatrix}$. L'égalité $MN = NM$ donne $c = 0$ et $a = d$ (le coefficient $b$ est libre).\n\nLes matrices qui commutent avec $N$ sont les $\\begin{pmatrix} a & b \\\\ 0 & a \\end{pmatrix}$, avec $a$ et $b$ réels. C'est le cas de $A$, avec $a = 3$ et $b = 1$."
          }
        ]
      },
      {
        titre: "Rotation et symétrie",
        duree: 20, points: 6, calculatrice: false,
        contexte: "Dans un repère orthonormé, on note $r$ la rotation de centre $O$ et d'angle $\\dfrac{\\pi}{3}$, de matrice $R = \\dfrac{1}{2}\\begin{pmatrix} 1 & -\\sqrt{3} \\\\ \\sqrt{3} & 1 \\end{pmatrix}$, et $s$ la symétrie d'axe $(Ox)$, de matrice $S = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$. Dans les calculs, on peut garder les facteurs numériques devant : $(kA)(k'B) = kk'(AB)$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule les coordonnées de l'image $B$ du point $A(2\\,;0)$ par $r$, puis celles de l'image $C$ de $B$ par $r$.",
            indice: "$B$ a pour coordonnées $R\\begin{pmatrix} 2 \\\\ 0 \\end{pmatrix}$.",
            corrige: "$R\\begin{pmatrix} 2 \\\\ 0 \\end{pmatrix} = \\dfrac{1}{2}\\begin{pmatrix} 2 \\\\ 2\\sqrt{3} \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ \\sqrt{3} \\end{pmatrix}$, donc $B(1\\,;\\sqrt{3})$.\n\nPuis $R\\begin{pmatrix} 1 \\\\ \\sqrt{3} \\end{pmatrix} = \\dfrac{1}{2}\\begin{pmatrix} 1 - 3 \\\\ \\sqrt{3} + \\sqrt{3} \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ \\sqrt{3} \\end{pmatrix}$, donc $C(-1\\,;\\sqrt{3})$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule $R^2$ puis $R^3$. Quelle transformation a pour matrice $R^3$ ?",
            indice: "$R^3 = R^2 \\times R$. Tourner trois fois d'un angle $\\dfrac{\\pi}{3}$, c'est tourner d'un angle $\\pi$.",
            corrige: "$R^2 = \\dfrac{1}{4}\\begin{pmatrix} 1 - 3 & -\\sqrt{3} - \\sqrt{3} \\\\ \\sqrt{3} + \\sqrt{3} & -3 + 1 \\end{pmatrix} = \\dfrac{1}{2}\\begin{pmatrix} -1 & -\\sqrt{3} \\\\ \\sqrt{3} & -1 \\end{pmatrix}$ : c'est la matrice de la rotation d'angle $\\dfrac{2\\pi}{3}$.\n\nPuis $R^3 = R^2 \\times R = \\dfrac{1}{4}\\begin{pmatrix} -1 - 3 & \\sqrt{3} - \\sqrt{3} \\\\ \\sqrt{3} - \\sqrt{3} & -3 - 1 \\end{pmatrix} = \\begin{pmatrix} -1 & 0 \\\\ 0 & -1 \\end{pmatrix} = -I$ : c'est la symétrie de centre $O$, c'est-à-dire la rotation d'angle $\\pi$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Déduis-en $R^6$, puis la matrice $R^{-1}$.",
            indice: "$R^6 = \\left(R^3\\right)^2$, et $R \\times R^5 = R^6$.",
            corrige: "$R^6 = (-I)^2 = I$. Comme $R \\times R^5 = R^5 \\times R = I$, $R$ est inversible et $R^{-1} = R^5 = R^3 \\times R^2 = -R^2 = \\dfrac{1}{2}\\begin{pmatrix} 1 & \\sqrt{3} \\\\ -\\sqrt{3} & 1 \\end{pmatrix}$ : c'est la matrice de la rotation d'angle $-\\dfrac{\\pi}{3}$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Calcule $SRS$ et compare avec $R^{-1}$. Interprète géométriquement.",
            indice: "Calcule d'abord $SR$, puis $(SR)S$.",
            corrige: "$SR = \\dfrac{1}{2}\\begin{pmatrix} 1 & -\\sqrt{3} \\\\ -\\sqrt{3} & -1 \\end{pmatrix}$, puis $SRS = \\dfrac{1}{2}\\begin{pmatrix} 1 & \\sqrt{3} \\\\ -\\sqrt{3} & 1 \\end{pmatrix} = R^{-1}$.\n\nAppliquer $s$, puis $r$, puis $s$, revient à tourner d'un angle $-\\dfrac{\\pi}{3}$ : une symétrie d'axe change le sens de rotation."
          }
        ]
      }
    ]
  }
};
