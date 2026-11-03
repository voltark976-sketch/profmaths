/*
  ENTRAÎNEMENT : Première tronc commun — chapitre 13, Fonctions exponentielles : de la suite géométrique à la courbe
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre tronc-fonctions-exponentielles.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
  Puissances choisies pour se calculer à la main ; les autres valeurs approchées sont données dans l'énoncé. Données fictives.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["tronc-fonctions-exponentielles"] = {
  revisions: {
    intro: "Les fonctions exponentielles en un coup d'œil : prolonger une suite géométrique, règles de calcul, sens de variation, fractions de période, taux moyen et demi-vie. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Fonction exponentielle",
        texte: "Pour $a > 0$, la fonction $x \\mapsto a^x$ prolonge à tous les réels la suite géométrique $a^n$. On a $a^0 = 1$, $a^{0{,}5} = \\sqrt{a}$, et $a^x > 0$ pour tout $x$."
      },
      {
        titre: "Règles de calcul",
        texte:
          "- $a^x \\times a^y = a^{x + y}$ et $\\dfrac{a^x}{a^y} = a^{x - y}$ ;\n" +
          "- $(a^x)^y = a^{xy}$.\n\n" +
          "Par exemple $25^{0{,}5} = 5$ et $8^{\\frac{1}{3}} = 2$, car $2^3 = 8$."
      },
      {
        titre: "Sens de variation",
        texte: "Pour $k > 0$, $x \\mapsto k \\times a^x$ est croissante si $a > 1$ et décroissante si $0 < a < 1$ : c'est la base $a$ qui compte, pas le coefficient $k$."
      },
      {
        titre: "Fractions de période",
        texte: "Si une grandeur est multipliée par $q$ chaque année, elle est multipliée par $q^{0{,}5}$ en six mois et par $q^{\\frac{1}{12}}$ en un mois."
      },
      {
        titre: "Taux moyen",
        texte: "Une évolution de coefficient $C$ sur $n$ périodes correspond à un coefficient moyen $C^{\\frac{1}{n}}$ par période : $+44\\,\\%$ en $2$ ans donne $1{,}44^{0{,}5} = 1{,}2$, soit $+20\\,\\%$ par an."
      },
      {
        titre: "Demi-vie",
        texte: "Après une demi-vie, il reste la moitié d'une substance ; après un quart de demi-vie, il en reste $0{,}5^{0{,}25} \\approx 0{,}84$, soit environ $84\\,\\%$, et non $87{,}5\\,\\%$."
      }
    ],
    pieges: [
      "Confondre $a^x$ et $a \\times x$ : $3^{0{,}5} \\approx 1{,}73$, pas $1{,}5$.",
      "Multiplier les exposants au lieu de les additionner dans $a^x \\times a^y$.",
      "Diviser un taux global par le nombre de périodes pour obtenir le taux moyen.",
      "Croire qu'après une demi-demi-vie il reste $75\\,\\%$ de la substance.",
      "Juger le sens de variation sur le coefficient devant la puissance au lieu de la base.",
      "Exprimer $x$ en mois alors que le taux est annuel."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Les valeurs approchées utiles sont données. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Calculer avec des puissances",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $9^{0{,}5}$, $16^{0{,}75}$ et $8^{\\frac{2}{3}}$.",
            indice: "$16^{0{,}75} = \\left(16^{0{,}25}\\right)^3$ et $16^{0{,}25} = 2$, car $2^4 = 16$. De même, $8^{\\frac{1}{3}} = 2$.",
            corrige: "$9^{0{,}5} = \\sqrt{9} = 3$. $16^{0{,}75} = \\left(16^{0{,}25}\\right)^3 = 2^3 = 8$. $8^{\\frac{2}{3}} = \\left(8^{\\frac{1}{3}}\\right)^2 = 2^2 = 4$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Simplifie $A = 5^{1{,}2} \\times 5^{0{,}8}$, $B = \\left(2^{1{,}5}\\right)^2$ et $C = \\dfrac{7^{2{,}5}}{7^{0{,}5}}$.",
            indice: "Additionne, multiplie ou soustrais les exposants.",
            corrige: "$A = 5^{1{,}2 + 0{,}8} = 5^2 = 25$. $B = 2^{1{,}5 \\times 2} = 2^3 = 8$. $C = 7^{2{,}5 - 0{,}5} = 7^2 = 49$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Donne le sens de variation de $f(x) = 3 \\times 0{,}5^x$ et de $g(x) = 0{,}2 \\times 1{,}5^x$ sur $\\mathbb{R}$. Justifie.",
            indice: "Regarde la base de chaque puissance, pas le coefficient devant.",
            corrige: "La base de $f$ est $0{,}5$, comprise entre $0$ et $1$, avec un coefficient positif : $f$ est décroissante. La base de $g$ est $1{,}5 > 1$ : $g$ est croissante, même si son coefficient $0{,}2$ est petit."
          },
          {
            n: "4.", points: 1.5,
            texte: "Sans calculatrice, compare $1{,}2^{3{,}5}$ et $1{,}2^{3{,}4}$, puis $0{,}7^{2}$ et $0{,}7^{1{,}5}$.",
            indice: "$x \\mapsto 1{,}2^x$ est croissante ; $x \\mapsto 0{,}7^x$ est décroissante.",
            corrige: "$x \\mapsto 1{,}2^x$ est croissante et $3{,}5 > 3{,}4$, donc $1{,}2^{3{,}5} > 1{,}2^{3{,}4}$. $x \\mapsto 0{,}7^x$ est décroissante et $2 > 1{,}5$, donc $0{,}7^{2} < 0{,}7^{1{,}5}$."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « $3^{0{,}5} = 1{,}5$ ». Justifie.",
            indice: "$3^{0{,}5}$ est le nombre positif dont le carré vaut $3$.",
            corrige: "**Faux.** $3^{0{,}5} = \\sqrt{3}$, dont le carré vaut $3$, alors que $1{,}5^2 = 2{,}25$. En fait, $3^{0{,}5} \\approx 1{,}73$ : $a^x$ n'est pas $a \\times x$."
          }
        ]
      },
      {
        titre: "Les ventes d'une boutique en ligne",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Une boutique en ligne a réalisé $40\\,000$ € de ventes en 2023 et $48\\,400$ € en 2025. On suppose que les ventes augmentent chaque année du même pourcentage.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule le taux d'évolution global des ventes de 2023 à 2025.",
            indice: "$\\dfrac{48\\,400 - 40\\,000}{40\\,000}$.",
            corrige: "$\\dfrac{48\\,400 - 40\\,000}{40\\,000} = \\dfrac{8\\,400}{40\\,000} = 0{,}21$ : les ventes ont augmenté de $21\\,\\%$ en deux ans."
          },
          {
            n: "2.", points: 1.5,
            texte: "Détermine le taux d'évolution annuel moyen. Pourquoi n'est-ce pas $10{,}5\\,\\%$ ?",
            indice: "Le coefficient annuel $q$ vérifie $q^2 = 1{,}21$.",
            corrige: "Le coefficient annuel $q$ vérifie $q^2 = 1{,}21$, donc $q = 1{,}21^{0{,}5} = 1{,}1$ : $+10\\,\\%$ par an. Ce n'est pas $\\dfrac{21}{2} = 10{,}5\\,\\%$ : les évolutions se multiplient, et $1{,}1^2 = 1{,}21$."
          },
          {
            n: "3.", points: 1.5,
            texte: "On modélise les ventes $x$ années après 2023 par $f(x) = 40\\,000 \\times 1{,}1^x$. Quelles ventes prévoit ce modèle pour 2026 ?",
            indice: "2026 correspond à $x = 3$ : multiplie $48\\,400$ par $1{,}1$.",
            corrige: "$f(3) = 48\\,400 \\times 1{,}1 = 53\\,240$ € de ventes prévues en 2026."
          },
          {
            n: "4.", points: 1.5,
            texte: "On admet que $1{,}1^{0{,}5} \\approx 1{,}049$. Calcule $f(1{,}5)$. Que représente $1{,}1^{0{,}5}$ ?",
            indice: "$1{,}1^{1{,}5} = 1{,}1 \\times 1{,}1^{0{,}5}$.",
            corrige: "$f(1{,}5) = 40\\,000 \\times 1{,}1 \\times 1{,}1^{0{,}5} \\approx 44\\,000 \\times 1{,}049 = 46\\,156$ €. $1{,}1^{0{,}5}$ est le coefficient sur six mois : environ $+4{,}9\\,\\%$ par semestre."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « Une hausse de $10{,}5\\,\\%$ par an pendant deux ans donne une hausse totale de $21\\,\\%$. » Justifie.",
            indice: "Calcule $1{,}105^2$.",
            corrige: "**Faux.** $1{,}105^2 = 1{,}221025$ : la hausse totale serait d'environ $22{,}1\\,\\%$, un peu plus que $21\\,\\%$."
          }
        ]
      },
      {
        titre: "La demi-vie d'un médicament",
        duree: 25, points: 6, calculatrice: false,
        contexte: "Un patient reçoit $100$ mg d'un médicament. La quantité présente dans son sang est divisée par $2$ toutes les $8$ heures : c'est la demi-vie. Au bout de $t$ heures, il en reste $Q(t) = 100 \\times 0{,}5^{\\frac{t}{8}}$ mg (modèle fictif).",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $Q(8)$, $Q(16)$ et $Q(24)$.",
            indice: "$Q(8) = 100 \\times 0{,}5^1$, $Q(16) = 100 \\times 0{,}5^2$…",
            corrige: "$Q(8) = 50$ mg, $Q(16) = 25$ mg et $Q(24) = 12{,}5$ mg : la quantité est divisée par $2$ toutes les $8$ heures."
          },
          {
            n: "2.", points: 1.5,
            texte: "On admet que $0{,}5^{0{,}5} \\approx 0{,}707$. Calcule $Q(4)$. Un élève pense qu'après $4$ heures, il reste $75$ mg : a-t-il raison ?",
            indice: "$4$ heures, c'est la moitié d'une demi-vie : $\\dfrac{4}{8} = 0{,}5$.",
            corrige: "$Q(4) = 100 \\times 0{,}5^{0{,}5} \\approx 70{,}7$ mg. L'élève a tort : la baisse n'est pas linéaire. Pendant les $4$ premières heures, la quantité est multipliée par $0{,}707$ environ, puis encore par $0{,}707$ pendant les $4$ suivantes, et $0{,}707^2 \\approx 0{,}5$."
          },
          {
            n: "3.", points: 1.5,
            texte: "On admet que $0{,}5^{\\frac{1}{8}} \\approx 0{,}917$. De quel pourcentage la quantité diminue-t-elle chaque heure ?",
            indice: "$Q(t + 1) = Q(t) \\times 0{,}5^{\\frac{1}{8}}$.",
            corrige: "Chaque heure, la quantité est multipliée par $0{,}5^{\\frac{1}{8}} \\approx 0{,}917$ : elle diminue d'environ $8{,}3\\,\\%$ par heure."
          },
          {
            n: "4.", points: 1.5,
            texte: "Le médicament n'agit plus en dessous de $10$ mg. On admet que $0{,}5^{\\frac{26}{8}} \\approx 0{,}105$ et $0{,}5^{\\frac{27}{8}} \\approx 0{,}096$. Au bout de combien d'heures entières le médicament n'agit-il plus ?",
            indice: "$Q(26) \\approx 10{,}5$ mg et $Q(27) \\approx 9{,}6$ mg.",
            corrige: "$Q(24) = 12{,}5$ mg, puis $Q(26) \\approx 10{,}5$ mg, encore au-dessus de $10$ mg, et $Q(27) \\approx 9{,}6$ mg. Comme $Q$ est décroissante, le médicament n'agit plus à partir de $27$ heures."
          }
        ]
      }
    ]
  }
};
