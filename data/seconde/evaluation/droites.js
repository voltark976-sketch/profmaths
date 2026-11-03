/*
  ENTRAÎNEMENT : Seconde — chapitre 12, Droites du plan
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre seconde-droites.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle ou devoir commun de Seconde.
  Programme 2026 : intersection de deux droites par leurs équations réduites (pas de système), comme dans le cours.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["seconde-droites"] = {
  revisions: {
    intro: "Les droites en un coup d'œil : vecteur directeur, équation cartésienne, équation réduite, pente, parallèles ou sécantes. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Vecteur directeur",
        texte: "C'est un vecteur non nul qui a la direction de la droite : si $A$ et $B$ sont deux points distincts de $d$, $\\overrightarrow{AB}$ en est un. Tout vecteur non nul colinéaire à un vecteur directeur en est un autre."
      },
      {
        titre: "Équation cartésienne",
        texte: "Toute droite a une équation $ax + by + c = 0$, avec $(a\\,;b) \\neq (0\\,;0)$, et $\\vec{u}\\begin{pmatrix} -b \\\\ a \\end{pmatrix}$ la dirige. Pour la trouver : $M(x\\,;y) \\in d \\iff \\det(\\overrightarrow{AM}, \\vec{u}) = 0$."
      },
      {
        titre: "Équation réduite",
        texte: "Si $b \\neq 0$, on isole $y$ : $y = mx + p$. La pente vaut $m = \\dfrac{y_B - y_A}{x_B - x_A}$, $p$ est l'ordonnée à l'origine, et $\\vec{u}\\begin{pmatrix} 1 \\\\ m \\end{pmatrix}$ dirige la droite."
      },
      {
        titre: "Droite verticale",
        texte: "Si $b = 0$, la droite est verticale, d'équation $x = k$ : elle n'a pas d'équation de la forme $y = mx + p$."
      },
      {
        titre: "Un point sur la droite ?",
        texte: "On remplace $x$ et $y$ par les coordonnées du point dans l'équation : le point est sur la droite si et seulement si l'égalité est vraie."
      },
      {
        titre: "Lire une équation réduite",
        texte: "$p$ se lit là où la droite coupe l'axe des ordonnées. $m$ est la variation de $y$ quand on avance de $1$ vers la droite : si on monte de $2$ en avançant de $3$, alors $m = \\dfrac{2}{3}$."
      },
      {
        titre: "Parallèles ou sécantes",
        texte: "Deux droites sont parallèles si et seulement si leurs vecteurs directeurs sont colinéaires, c'est-à-dire, avec les équations réduites, si elles ont la même pente. Sinon, elles sont sécantes : on résout $mx + p = m'x + p'$, puis on calcule $y$."
      }
    ],
    pieges: [
      "Prendre $\\begin{pmatrix} a \\\\ b \\end{pmatrix}$ comme vecteur directeur de $ax + by + c = 0$ : c'est $\\begin{pmatrix} -b \\\\ a \\end{pmatrix}$.",
      "Inverser la pente : $m = \\dfrac{y_B - y_A}{x_B - x_A}$, avec les $y$ en haut.",
      "Oublier de diviser **tous** les termes par $b$ : $2x + 4y - 8 = 0$ donne $y = -\\dfrac{1}{2}x + 2$.",
      "Chercher une équation $y = \\ldots$ pour une droite verticale : c'est $x = k$.",
      "Conclure « parallèles » sans comparer les pentes, ou oublier de calculer $y$ pour le point d'intersection."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle ou au devoir commun (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Équations d'une droite",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Dans un repère orthonormé, on considère les points $A(-2\\,;5)$, $B(4\\,;2)$ et $C(1\\,;-3)$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Donne deux vecteurs directeurs de la droite $(AB)$.",
            indice: "$\\overrightarrow{AB}$ en est un ; tout vecteur non nul colinéaire à $\\overrightarrow{AB}$ en est un autre.",
            corrige: "$\\overrightarrow{AB}\\begin{pmatrix} 6 \\\\ -3 \\end{pmatrix}$ dirige $(AB)$, ainsi que $\\dfrac{1}{3}\\overrightarrow{AB}\\begin{pmatrix} 2 \\\\ -1 \\end{pmatrix}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Détermine une équation cartésienne de la droite $(AB)$.",
            indice: "$M(x\\,;y) \\in (AB) \\iff \\det(\\overrightarrow{AM}, \\overrightarrow{AB}) = 0$, avec $\\overrightarrow{AM}\\begin{pmatrix} x + 2 \\\\ y - 5 \\end{pmatrix}$.",
            corrige: "$M(x\\,;y) \\in (AB) \\iff \\det(\\overrightarrow{AM}, \\overrightarrow{AB}) = 0$. Avec $xy' - yx'$ : $\\det(\\overrightarrow{AM}, \\overrightarrow{AB}) = -3(x + 2) - 6(y - 5) = -3x - 6y + 24$. En divisant par $-3$, une équation cartésienne de $(AB)$ est $x + 2y - 8 = 0$. Vérification : $-2 + 10 - 8 = 0$ pour $A$ et $4 + 4 - 8 = 0$ pour $B$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Déduis-en l'équation réduite de $(AB)$. Vérifie la pente avec les coordonnées de $A$ et $B$.",
            indice: "Isole $y$ dans $x + 2y - 8 = 0$, en divisant **tous** les termes par $2$.",
            corrige: "$2y = -x + 8$, donc $y = -\\dfrac{1}{2}x + 4$ : la pente est $-\\dfrac{1}{2}$ et l'ordonnée à l'origine $4$. Vérification : $\\dfrac{y_B - y_A}{x_B - x_A} = \\dfrac{2 - 5}{4 - (-2)} = \\dfrac{-3}{6} = -\\dfrac{1}{2}$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Les points $C(1\\,;-3)$ et $D(10\\,;-1)$ sont-ils sur la droite $(AB)$ ?",
            indice: "Remplace $x$ et $y$ par les coordonnées de chaque point dans $x + 2y - 8 = 0$.",
            corrige: "Pour $C$ : $1 + 2 \\times (-3) - 8 = -13 \\neq 0$, donc $C$ n'est pas sur $(AB)$. Pour $D$ : $10 + 2 \\times (-1) - 8 = 0$, donc $D$ est sur $(AB)$."
          },
          {
            n: "5.", points: 1.5,
            texte: "Détermine l'équation réduite de la droite $d$ parallèle à $(AB)$ qui passe par $C$.",
            indice: "Deux droites parallèles ont la même pente : $d$ a une équation $y = -\\dfrac{1}{2}x + p$, et $C$ donne $p$.",
            corrige: "$d$ a la même pente que $(AB)$ : $y = -\\dfrac{1}{2}x + p$. Comme $C(1\\,;-3)$ est sur $d$ : $-3 = -\\dfrac{1}{2} + p$, donc $p = -\\dfrac{5}{2}$. Ainsi $d : y = -\\dfrac{1}{2}x - \\dfrac{5}{2}$, ou encore $x + 2y + 5 = 0$."
          }
        ]
      },
      {
        titre: "Lire et calculer une intersection",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les droites $d_1$ et $d_2$ sont tracées ci-dessous dans un repère orthonormé (le quadrillage a pour unité $1$). Elles se coupent au point $K$.",
        figure: (o) => o.graph({
          xmin: -2.5, xmax: 7.5, ymin: -3.5, ymax: 7.5, h: 330,
          curves: [
            { f: (x) => 2 * x - 1, a: -1.25, b: 4.25, closed: false, label: "d<tspan class=\"sub\" dy=\"3\">1</tspan>", lx: 3.9, dx: -10, dy: -2 },
            { f: (x) => -x / 3 + 4, a: -2.5, b: 7.5, closed: false, label: "d<tspan class=\"sub\" dy=\"3\">2</tspan>", lx: 6.6, dx: 0, dy: -8 }
          ],
          points: [{ x: 15 / 7, y: 23 / 7, label: "K" }],
          aria: "Deux droites sécantes en K : d1 passe par (0 ; −1) et (2 ; 3), d2 passe par (0 ; 4) et (3 ; 3)"
        }),
        questions: [
          {
            n: "1.", points: 2,
            texte: "Lis l'équation réduite de chacune des droites $d_1$ et $d_2$.",
            indice: "L'ordonnée à l'origine se lit sur l'axe des ordonnées. Pour la pente, cherche deux points de la droite placés sur le quadrillage et regarde de combien on monte (ou on descend) quand on avance de $1$.",
            corrige: "$d_1$ coupe l'axe des ordonnées en $-1$ et passe par $(2\\,;3)$ : on monte de $4$ en avançant de $2$, donc $m = 2$ et $d_1 : y = 2x - 1$. $d_2$ coupe l'axe des ordonnées en $4$ et passe par $(3\\,;3)$ : on descend de $1$ en avançant de $3$, donc $m = -\\dfrac{1}{3}$ et $d_2 : y = -\\dfrac{1}{3}x + 4$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Lis des valeurs approchées des coordonnées de $K$, puis calcule-les exactement.",
            indice: "$K$ est sur les deux droites : résous $2x - 1 = -\\dfrac{1}{3}x + 4$, puis calcule $y$ avec l'une des deux équations.",
            corrige: "Sur la figure, $K$ est vers $(2{,}1\\,;3{,}3)$. Par le calcul : $2x - 1 = -\\dfrac{1}{3}x + 4 \\iff \\dfrac{7}{3}x = 5 \\iff x = \\dfrac{15}{7}$. Puis $y = 2 \\times \\dfrac{15}{7} - 1 = \\dfrac{23}{7}$. Donc $K\\left(\\dfrac{15}{7}\\,;\\dfrac{23}{7}\\right)$, environ $(2{,}14\\,;3{,}29)$ : la lecture ne pouvait donner qu'une valeur approchée."
          },
          {
            n: "3.", points: 1.5,
            texte: "Donne une équation cartésienne de $d_2$, puis un vecteur directeur de $d_2$ à coordonnées entières.",
            indice: "Multiplie l'équation réduite par $3$ et passe tout du même côté. Pour $ax + by + c = 0$, le vecteur $\\begin{pmatrix} -b \\\\ a \\end{pmatrix}$ dirige la droite.",
            corrige: "$y = -\\dfrac{1}{3}x + 4 \\iff 3y = -x + 12 \\iff x + 3y - 12 = 0$. Un vecteur directeur est $\\vec{u}\\begin{pmatrix} -3 \\\\ 1 \\end{pmatrix}$ : on avance de $-3$ et on monte de $1$, comme sur le quadrillage."
          },
          {
            n: "4.", points: 1,
            texte: "La droite $d_3 : 4x - 2y + 7 = 0$ est-elle parallèle à $d_1$ ?",
            indice: "Écris l'équation réduite de $d_3$ et compare les pentes.",
            corrige: "$4x - 2y + 7 = 0 \\iff 2y = 4x + 7 \\iff y = 2x + \\dfrac{7}{2}$. La pente vaut $2$, comme celle de $d_1$ : $d_3$ est parallèle à $d_1$ (et distincte, car $\\dfrac{7}{2} \\neq -1$)."
          },
          {
            n: "5.", points: 1,
            texte: "La droite $(EF)$, avec $E(-3\\,;5)$ et $F(3\\,;3)$, est-elle parallèle à $d_2$ ?",
            indice: "Calcule la pente de $(EF)$. Si elle est égale à celle de $d_2$, regarde aussi si $E$ est sur $d_2$.",
            corrige: "La pente de $(EF)$ vaut $\\dfrac{3 - 5}{3 - (-3)} = -\\dfrac{1}{3}$, celle de $d_2$ : les droites sont parallèles. De plus, $-\\dfrac{1}{3} \\times (-3) + 4 = 5$, donc $E$ est sur $d_2$ : les droites $(EF)$ et $d_2$ sont **confondues**."
          }
        ]
      },
      {
        titre: "La pirogue et le kayak",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Sur une carte du lagon (repère orthonormé, unité : le kilomètre), une pirogue suit la droite $d$ qui passe par $A(-1\\,;2)$ et $B(3\\,;4)$. Un kayak part du point $K(5\\,;-1)$ et suit la droite $d'$ d'équation $y = -2x + 9$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Détermine l'équation réduite de la droite $d$. Vérifie que $K$ est bien sur $d'$.",
            indice: "La pente vaut $\\dfrac{y_B - y_A}{x_B - x_A}$ ; trouve ensuite $p$ avec les coordonnées de $A$.",
            corrige: "$m = \\dfrac{4 - 2}{3 - (-1)} = \\dfrac{2}{4} = 0{,}5$. Puis $2 = 0{,}5 \\times (-1) + p$, donc $p = 2{,}5$ : $d : y = 0{,}5x + 2{,}5$. Pour $K$ : $-2 \\times 5 + 9 = -1$, donc $K$ est sur $d'$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Les trajectoires se croisent-elles ? Si oui, calcule les coordonnées du point de croisement $P$.",
            indice: "Compare les pentes, puis résous $0{,}5x + 2{,}5 = -2x + 9$.",
            corrige: "Les pentes $0{,}5$ et $-2$ sont différentes : les droites sont sécantes. $0{,}5x + 2{,}5 = -2x + 9 \\iff 2{,}5x = 6{,}5 \\iff x = 2{,}6$, puis $y = -2 \\times 2{,}6 + 9 = 3{,}8$. Donc $P(2{,}6\\,;3{,}8)$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Le kayak va de $K$ jusqu'au point $P$. Quelle distance parcourt-il, arrondie à $0{,}1$ km près ?",
            indice: "Dans un repère orthonormé : $KP = \\sqrt{(x_P - x_K)^2 + (y_P - y_K)^2}$.",
            corrige: "$KP = \\sqrt{(2{,}6 - 5)^2 + (3{,}8 + 1)^2} = \\sqrt{5{,}76 + 23{,}04} = \\sqrt{28{,}8} \\approx 5{,}4$ km."
          },
          {
            n: "4.", points: 1.5,
            texte:
              "Voici la fonction du cours, qui renvoie la pente et l'ordonnée à l'origine de la droite $(AB)$. Que renvoie $\\texttt{droite(-1, 2, 3, 4)}$ ? Quelle instruction permet de tester si $C(7\\,;6)$ est sur $d$ ?\n\n" +
              "```python\ndef droite(xA, yA, xB, yB):\n    m = (yB - yA) / (xB - xA)\n    p = yA - m * xA\n    return m, p\n```",
            indice: "Calcule $\\texttt{m}$, puis $\\texttt{p}$, comme à la question 1. Pour $C$, compare $m \\times 7 + p$ à $6$.",
            corrige: "La fonction renvoie $\\texttt{(0.5, 2.5)}$ : c'est la pente et l'ordonnée à l'origine trouvées à la question 1. Le test $\\texttt{m * 7 + p == 6}$ vaut $\\texttt{True}$, car $0{,}5 \\times 7 + 2{,}5 = 6$ : $C$ est sur $d$."
          }
        ]
      }
    ]
  }
};
