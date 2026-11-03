/*
  ENTRAÎNEMENT : Seconde — chapitre 1, Ensembles de nombres et intervalles
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre seconde-ensembles.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle ou devoir commun de Seconde.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["seconde-ensembles"] = {
  revisions: {
    intro: "Les nombres et les intervalles en un coup d'œil : les ensembles, les arrondis, les intervalles, l'intersection, la réunion et la valeur absolue. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Les ensembles de nombres",
        texte:
          "$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{D} \\subset \\mathbb{Q} \\subset \\mathbb{R}$ :\n\n" +
          "- $\\mathbb{N}$ : $0$, $1$, $2$… ; $\\mathbb{Z}$ : $-3$, $0$, $12$… ;\n" +
          "- $\\mathbb{D}$ : nombre fini de chiffres après la virgule ;\n" +
          "- $\\mathbb{Q}$ : quotients d'entiers ; $\\mathbb{R}$ : tous les réels."
      },
      {
        titre: "Décimal ou pas ?",
        texte: "Une fraction **irréductible** est décimale si son dénominateur ne contient que des facteurs $2$ et $5$ : $\\dfrac{7}{40} = 0{,}175$ ($40 = 2^3 \\times 5$), mais $\\dfrac{5}{12}$ n'est pas décimal ($12 = 2^2 \\times 3$)."
      },
      {
        titre: "Irrationnels",
        texte: "Un réel qui n'est pas un quotient d'entiers est **irrationnel** : $\\sqrt{2}$, $\\sqrt{5}$, $\\pi$. Mais attention : $\\sqrt{49} = 7$ et $\\sqrt{\\dfrac{4}{9}} = \\dfrac{2}{3}$ sont rationnels."
      },
      {
        titre: "Arrondis et chiffres significatifs",
        texte: "On regarde le chiffre suivant : $2{,}236$ arrondi au centième donne $2{,}24$. Les zéros du début ne comptent pas : $0{,}0457$ a $3$ chiffres significatifs."
      },
      {
        titre: "Intervalles",
        texte:
          "- $a \\leqslant x \\leqslant b \\iff x \\in [a\\,;b]$ ;\n" +
          "- $a < x \\leqslant b \\iff x \\in \\,]a\\,;b]$ ;\n" +
          "- $x \\geqslant a \\iff x \\in [a\\,;+\\infty[$ ;\n" +
          "- $x < b \\iff x \\in \\,]-\\infty\\,;b[$.\n\n" +
          "Le crochet est toujours ouvert du côté de l'infini."
      },
      {
        titre: "Intersection et réunion",
        texte: "$I \\cap J$ : les réels qui sont **à la fois** dans $I$ et dans $J$ (la partie commune, parfois vide). $I \\cup J$ : les réels qui sont dans $I$ **ou** dans $J$ (tout ce qui est colorié)."
      },
      {
        titre: "Valeur absolue et distance",
        texte:
          "$|a - b|$ est la distance entre $a$ et $b$ sur la droite graduée, toujours positive ou nulle.\n\n" +
          "$|x - a| \\leqslant r \\iff x \\in [a - r\\,;a + r]$ : centre $a$, rayon $r$."
      }
    ],
    pieges: [
      "Croire qu'une fraction n'est jamais un entier : $\\dfrac{12}{4} = 3 \\in \\mathbb{N}$.",
      "Écrire $\\dfrac{1}{3} = 0{,}33$ : ce n'est qu'une valeur approchée.",
      "Conclure trop vite qu'une racine carrée est irrationnelle : $\\sqrt{49} = 7$.",
      "Arrondir en coupant : l'arrondi de $2{,}236$ au centième est $2{,}24$.",
      "Mettre un crochet fermé du côté de l'infini : $[3\\,;+\\infty]$ n'a pas de sens.",
      "Se tromper de centre : pour $|x + 2| \\leqslant 1$, le centre est $-2$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle ou au devoir commun (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Ranger les nombres dans leur ensemble",
        duree: 20, points: 6, calculatrice: true,
        contexte: "On considère les nombres $\\dfrac{21}{7}$ ; $-\\dfrac{18}{6}$ ; $\\dfrac{7}{40}$ ; $\\dfrac{5}{12}$ ; $\\sqrt{81}$ ; $\\sqrt{5}$.",
        questions: [
          {
            n: "1.", points: 2,
            texte: "Donne, pour chacun de ces nombres, le plus petit ensemble parmi $\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{D}$, $\\mathbb{Q}$ et $\\mathbb{R}$ qui le contient.",
            indice: "Simplifie d'abord : $\\dfrac{21}{7}$, $-\\dfrac{18}{6}$ et $\\sqrt{81}$ sont des entiers.",
            corrige: "$\\dfrac{21}{7} = 3 \\in \\mathbb{N}$ ; $-\\dfrac{18}{6} = -3 \\in \\mathbb{Z}$ ; $\\dfrac{7}{40} = 0{,}175 \\in \\mathbb{D}$ ; $\\dfrac{5}{12} \\in \\mathbb{Q}$ (pas décimal) ; $\\sqrt{81} = 9 \\in \\mathbb{N}$ ; $\\sqrt{5} \\in \\mathbb{R}$ (irrationnel)."
          },
          {
            n: "2.", points: 1.5,
            texte: "Justifie que $\\dfrac{7}{40}$ est un nombre décimal, mais pas $\\dfrac{5}{12}$.",
            indice: "Décompose les dénominateurs des fractions irréductibles : ne doivent apparaître que des $2$ et des $5$.",
            corrige: "$\\dfrac{7}{40}$ est irréductible et $40 = 2^3 \\times 5$ : $\\dfrac{7}{40} = \\dfrac{7 \\times 25}{1\\,000} = 0{,}175$. $\\dfrac{5}{12}$ est irréductible et $12 = 2^2 \\times 3$ contient le facteur $3$ : son écriture décimale ne s'arrête pas ($0{,}41666\\dots$)."
          },
          {
            n: "3.", points: 1.5,
            texte: "Vrai ou faux ? Justifie. a) « $\\sqrt{81}$ est irrationnel. » b) « Tout nombre décimal est rationnel. »",
            indice: "a) Calcule $\\sqrt{81}$. b) Un décimal s'écrit $\\dfrac{a}{10^n}$.",
            corrige: "a) **Faux** : $\\sqrt{81} = 9$, un entier. b) **Vrai** : un décimal s'écrit $\\dfrac{a}{10^n}$ avec $a$ entier, par exemple $2{,}35 = \\dfrac{235}{100}$ : c'est un quotient de deux entiers."
          },
          {
            n: "4.", points: 1,
            texte: "Donne un encadrement de $\\sqrt{5}$ d'amplitude $10^{-2}$, puis son arrondi au centième.",
            indice: "La calculatrice donne $\\sqrt{5} \\approx 2{,}2360\\dots$",
            corrige: "$2{,}23 \\leqslant \\sqrt{5} < 2{,}24$. Le chiffre des millièmes est $6$, donc l'arrondi au centième est $2{,}24$."
          }
        ]
      },
      {
        titre: "La température du lagon",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Une sonde mesure la température $T$, en °C, de l'eau du lagon. Les coraux se portent bien quand $23 \\leqslant T \\leqslant 29$ ; au-dessus de $30$ °C, ils risquent de blanchir.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Traduis par un intervalle $I$ les températures où les coraux se portent bien.",
            indice: "Les deux inégalités sont larges : crochets fermés.",
            corrige: "$I = [23\\,;29]$."
          },
          {
            n: "2.", points: 1,
            texte: "Traduis par un intervalle les températures où les coraux risquent de blanchir.",
            indice: "« Au-dessus de $30$ » : $T > 30$, sans limite supérieure.",
            corrige: "$T > 30 \\iff T \\in \\,]30\\,;+\\infty[$ : crochet ouvert en $30$ (inégalité stricte) et du côté de l'infini."
          },
          {
            n: "3.", points: 1.5,
            texte: "Les relevés de la semaine sont $22{,}5$ ; $26$ ; $29$ ; $30{,}2$. Lesquels sont dans $I$ ?",
            indice: "Vérifie pour chacun : $23 \\leqslant T \\leqslant 29$ ?",
            corrige: "$26$ et $29$ sont dans $I$ ($29$ est une borne incluse). $22{,}5 < 23$ et $30{,}2 > 29$ ne le sont pas, et $30{,}2$ est même dans la zone de blanchiment."
          },
          {
            n: "4.", points: 2,
            texte: "Un plongeur est à l'aise sans combinaison quand $T \\in J = [25\\,;31[$. Détermine $I \\cap J$ et $I \\cup J$, et interprète $I \\cap J$.",
            indice: "Place les deux intervalles sur une même droite graduée : la partie commune, puis tout ce qui est colorié.",
            corrige: "$I \\cap J = [25\\,;29]$ : ce sont les températures bonnes à la fois pour les coraux et pour le plongeur sans combinaison. $I \\cup J = [23\\,;31[$."
          },
          {
            n: "5.", points: 1.5,
            texte: "En octobre, la température moyenne vérifie $|T - 27| \\leqslant 1{,}5$. Les coraux se portent-ils bien ?",
            indice: "$|T - a| \\leqslant r \\iff T \\in [a - r\\,;a + r]$.",
            corrige: "$|T - 27| \\leqslant 1{,}5 \\iff T \\in [25{,}5\\,;28{,}5]$. Cet intervalle est contenu dans $I = [23\\,;29]$ : en moyenne, les coraux se portent bien en octobre."
          }
        ]
      },
      {
        titre: "Distances et valeurs absolues",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $|-5|$, $|3 - 8|$, puis la distance entre $-2$ et $4$ sur la droite graduée.",
            indice: "La distance entre $a$ et $b$ est $|a - b|$.",
            corrige: "$|-5| = 5$, $|3 - 8| = |-5| = 5$ et la distance entre $-2$ et $4$ est $|4 - (-2)| = 6$."
          },
          {
            n: "2.", points: 2,
            texte: "Traduis par un intervalle : a) $|x - 3| \\leqslant 2$ ; b) $|x + 1| < 4$.",
            indice: "$|x + 1| = |x - (-1)|$ : le centre est $-1$.",
            corrige: "a) Les réels à une distance au plus $2$ de $3$ : $[1\\,;5]$. b) $|x - (-1)| < 4$ : les réels à une distance strictement inférieure à $4$ de $-1$, soit $]-5\\,;3[$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Écris l'intervalle $[-4\\,;6]$ sous la forme $|x - c| \\leqslant r$.",
            indice: "Le centre $c$ est le milieu des bornes, le rayon $r$ la moitié de la longueur.",
            corrige: "Le centre est $c = \\dfrac{-4 + 6}{2} = 1$ et le rayon $r = \\dfrac{6 - (-4)}{2} = 5$ : $x \\in [-4\\,;6] \\iff |x - 1| \\leqslant 5$."
          },
          {
            n: "4.", points: 1,
            texte: "Sur une droite graduée, l'unité est partagée en $4$ parts égales. Le point $A$ est situé $3$ graduations après le point d'abscisse $1$. Quelle est l'abscisse de $A$ ?",
            indice: "Une graduation vaut $\\dfrac{1}{4} = 0{,}25$.",
            corrige: "Une graduation vaut $0{,}25$, donc $A$ a pour abscisse $1 + 3 \\times 0{,}25 = 1{,}75$."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « pour tous réels $a$ et $b$, $|a + b| = |a| + |b|$ ». Justifie.",
            indice: "Essaie avec deux nombres de signes contraires.",
            corrige: "**Faux.** Pour $a = 1$ et $b = -1$ : $|a + b| = 0$ alors que $|a| + |b| = 2$. Un contre-exemple suffit."
          }
        ]
      }
    ]
  }
};
