/*
  ENTRAÎNEMENT : Terminale spécialité — chapitre 9, Fonction logarithme népérien
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-spe-logarithme.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit du bac. Données fictives.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-spe-logarithme"] = {
  revisions: {
    intro: "Le logarithme en un coup d'œil : définition, propriétés algébriques, équations, inéquations, seuils, dérivée, limites et croissances comparées. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Définition",
        texte: "Pour $a > 0$, $\\ln a$ est l'unique solution de $e^x = a$. Ainsi $e^{\\ln a} = a$ pour $a > 0$, et $\\ln(e^x) = x$ pour tout réel $x$. $\\ln 1 = 0$ et $\\ln e = 1$."
      },
      {
        titre: "Propriétés algébriques",
        texte: "Pour $a > 0$, $b > 0$ et $n$ entier : $\\ln(ab) = \\ln a + \\ln b$, $\\ln\\left(\\dfrac{a}{b}\\right) = \\ln a - \\ln b$, $\\ln(a^n) = n\\ln a$ et $\\ln\\sqrt{a} = \\dfrac{1}{2}\\ln a$."
      },
      {
        titre: "Équations et inéquations",
        texte: "On cherche d'abord l'ensemble où les logarithmes existent. Puis, $\\ln$ étant strictement croissante : $\\ln a = \\ln b \\iff a = b$ et $\\ln a < \\ln b \\iff a < b$. Enfin, on garde les solutions de l'ensemble de départ."
      },
      {
        titre: "Seuils",
        texte: "$q^n < A \\iff n\\ln q < \\ln A$. Si $0 < q < 1$, $\\ln q < 0$ : en divisant, le sens change, $n > \\dfrac{\\ln A}{\\ln q}$."
      },
      {
        titre: "Dérivées",
        texte: "$(\\ln x)' = \\dfrac{1}{x}$ sur $]0\\,;+\\infty[$ : $\\ln$ est strictement croissante et concave. Pour $u > 0$ dérivable : $(\\ln u)' = \\dfrac{u'}{u}$."
      },
      {
        titre: "Limites",
        texte: "$\\ln x \\to +\\infty$ en $+\\infty$ et $\\ln x \\to -\\infty$ en $0^+$. Croissances comparées : $\\dfrac{\\ln x}{x} \\to 0$ en $+\\infty$ et $x\\ln x \\to 0$ en $0^+$."
      }
    ],
    pieges: [
      "Oublier l'ensemble de définition : $\\ln$ n'existe que pour des nombres strictement positifs.",
      "Écrire $\\ln(a + b) = \\ln a + \\ln b$.",
      "Écrire $\\ln(a^n) = (\\ln a)^n$ au lieu de $n\\ln a$.",
      "Oublier de changer le sens en divisant par $\\ln q < 0$.",
      "Garder une solution qui n'est pas dans l'ensemble de définition.",
      "Oublier le $u'$ dans $(\\ln u)' = \\dfrac{u'}{u}$."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit du bac (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Une étude de fonction",
        duree: 30, points: 7, calculatrice: true,
        contexte: "On considère la fonction $f$ définie sur $]0\\,;+\\infty[$ par $f(x) = \\dfrac{1 + \\ln x}{x}$, et sa courbe $\\mathcal{C}$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Détermine les limites de $f$ en $0$ et en $+\\infty$. Interprète graphiquement.",
            indice: "En $+\\infty$, écris $f(x) = \\dfrac{1}{x} + \\dfrac{\\ln x}{x}$. En $0^+$, regarde le numérateur et $\\dfrac{1}{x}$.",
            corrige: "En $0^+$ : $1 + \\ln x \\to -\\infty$ et $\\dfrac{1}{x} \\to +\\infty$, donc $f(x) = (1 + \\ln x) \\times \\dfrac{1}{x} \\to -\\infty$ : la droite $x = 0$ est asymptote verticale. En $+\\infty$ : $\\dfrac{1}{x} \\to 0$ et $\\dfrac{\\ln x}{x} \\to 0$ (croissances comparées), donc $f(x) \\to 0$ : l'axe des abscisses est asymptote horizontale."
          },
          {
            n: "2.", points: 1.5,
            texte: "Démontre que $f'(x) = \\dfrac{-\\ln x}{x^2}$ et dresse le tableau de variations de $f$.",
            indice: "Dérivée d'un quotient, avec $(1 + \\ln x)' = \\dfrac{1}{x}$.",
            corrige: "$f'(x) = \\dfrac{\\frac{1}{x} \\times x - (1 + \\ln x) \\times 1}{x^2} = \\dfrac{-\\ln x}{x^2}$. Comme $x^2 > 0$, $f'(x)$ a le signe de $-\\ln x$ : positif sur $]0\\,;1[$, négatif sur $]1\\,;+\\infty[$. $f$ a un maximum en $1$ : $f(1) = 1$.",
            tableauCorrige: { lignes: [["x", "0", "", "1", "", "+\\infty"], ["f'(x)", "", "+", "0", "-", ""], ["f(x)", "-\\infty", "\\nearrow", "1", "\\searrow", "0"]] }
          },
          {
            n: "3.", points: 1.5,
            texte: "Résous l'équation $f(x) = 0$, puis étudie le signe de $f(x)$.",
            indice: "$x > 0$ : $f(x)$ a le signe de $1 + \\ln x$.",
            corrige: "$f(x) = 0 \\iff 1 + \\ln x = 0 \\iff \\ln x = -1 \\iff x = e^{-1}$. Comme $x > 0$, $f(x)$ a le signe de $1 + \\ln x$ : $f(x) < 0$ sur $]0\\,;e^{-1}[$ et $f(x) > 0$ sur $]e^{-1}\\,;+\\infty[$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Combien de solutions l'équation $f(x) = \\dfrac{1}{2}$ a-t-elle ? Encadre la plus petite à $0{,}01$ près.",
            indice: "Sur $]0\\,;1]$ et sur $[1\\,;+\\infty[$, $f$ est continue et strictement monotone. Utilise les limites et le maximum.",
            corrige: "Sur $]0\\,;1]$, $f$ est continue, strictement croissante, de $-\\infty$ à $1$ : comme $\\dfrac{1}{2} < 1$, une unique solution $\\alpha$. Sur $[1\\,;+\\infty[$, $f$ est strictement décroissante de $1$ vers $0$ : comme $0 < \\dfrac{1}{2} < 1$, une unique solution $\\beta$. Deux solutions en tout. À la calculatrice, $f(0{,}46) \\approx 0{,}486$ et $f(0{,}47) \\approx 0{,}521$ ; comme $f$ est croissante sur $]0\\,;1]$, $0{,}46 < \\alpha < 0{,}47$."
          },
          {
            n: "5.", points: 1,
            texte: "Écris l'équation de la tangente à $\\mathcal{C}$ au point d'abscisse $e^{-1}$.",
            indice: "$f(e^{-1}) = 0$ et $f'(e^{-1}) = \\dfrac{-\\ln(e^{-1})}{e^{-2}}$.",
            corrige: "$f(e^{-1}) = 0$ et $f'(e^{-1}) = \\dfrac{1}{e^{-2}} = e^2$. La tangente a pour équation $y = e^2(x - e^{-1})$, soit $y = e^2x - e$."
          }
        ]
      },
      {
        titre: "Calculer avec le logarithme",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Exprime en fonction de $\\ln 2$ et de $\\ln 5$ : $\\ln 40$, $\\ln 0{,}08$ et $\\ln\\sqrt{20}$.",
            indice: "$40 = 2^3 \\times 5$, $0{,}08 = \\dfrac{2}{25}$ et $20 = 2^2 \\times 5$.",
            corrige: "$\\ln 40 = 3\\ln 2 + \\ln 5$. $\\ln 0{,}08 = \\ln 2 - \\ln 25 = \\ln 2 - 2\\ln 5$. $\\ln\\sqrt{20} = \\dfrac{1}{2}(2\\ln 2 + \\ln 5) = \\ln 2 + \\dfrac{1}{2}\\ln 5$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Résous l'équation $\\ln(x + 2) + \\ln(x - 1) = \\ln 4$.",
            indice: "Les deux logarithmes existent pour $x > 1$. Regroupe le membre de gauche en un seul logarithme.",
            corrige: "Il faut $x + 2 > 0$ et $x - 1 > 0$, soit $x > 1$. Alors l'équation devient $\\ln((x + 2)(x - 1)) = \\ln 4$, soit $(x + 2)(x - 1) = 4$, c'est-à-dire $x^2 + x - 6 = 0$. Les solutions de ce trinôme sont $2$ et $-3$ ; seule $2$ vérifie $x > 1$ : $S = \\{2\\}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Résous l'équation $e^{2x} - 5e^x + 6 = 0$.",
            indice: "Pose $X = e^x$ : $e^{2x} = X^2$.",
            corrige: "Avec $X = e^x$ : $X^2 - 5X + 6 = 0$, de solutions $X = 2$ et $X = 3$. Puis $e^x = 2 \\iff x = \\ln 2$ et $e^x = 3 \\iff x = \\ln 3$ : $S = \\{\\ln 2\\,;\\ln 3\\}$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Résous l'inéquation $\\ln(3 - x) \\leqslant 1$.",
            indice: "Il faut $3 - x > 0$. Puis $1 = \\ln e$ et $\\ln$ est strictement croissante.",
            corrige: "Il faut $3 - x > 0$, soit $x < 3$. Alors $\\ln(3 - x) \\leqslant \\ln e \\iff 3 - x \\leqslant e \\iff x \\geqslant 3 - e$. Donc $S = [3 - e\\,;3[$."
          },
          {
            n: "5.", points: 1,
            texte: "Simplifie $A = e^{2\\ln 3}$ et $B = \\ln(e^3) - \\ln\\left(\\dfrac{1}{e}\\right)$.",
            indice: "$2\\ln 3 = \\ln 9$.",
            corrige: "$A = e^{\\ln 9} = 9$ et $B = 3 - (-1) = 4$."
          }
        ]
      },
      {
        titre: "Croissances et décroissances",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Les questions sont indépendantes ; les modèles sont fictifs.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Le nombre de visiteurs d'un site internet augmente de $15\\,\\%$ par mois. Au bout de combien de mois aura-t-il au moins doublé ?",
            indice: "Résous $1{,}15^n \\geqslant 2$ en appliquant $\\ln$, croissante.",
            corrige: "$1{,}15^n \\geqslant 2 \\iff n\\ln 1{,}15 \\geqslant \\ln 2 \\iff n \\geqslant \\dfrac{\\ln 2}{\\ln 1{,}15} \\approx 4{,}96$, car $\\ln 1{,}15 > 0$. Il faut $5$ mois."
          },
          {
            n: "2.", points: 1.5,
            texte: "Une voiture perd $12\\,\\%$ de sa valeur chaque année. Au bout de combien d'années vaut-elle moins de $30\\,\\%$ de son prix d'achat ?",
            indice: "Résous $0{,}88^n < 0{,}3$. Attention : $\\ln 0{,}88 < 0$.",
            corrige: "$0{,}88^n < 0{,}3 \\iff n\\ln 0{,}88 < \\ln 0{,}3 \\iff n > \\dfrac{\\ln 0{,}3}{\\ln 0{,}88} \\approx 9{,}42$ : le sens change, car on divise par $\\ln 0{,}88 < 0$. Il faut $10$ ans."
          },
          {
            n: "3.", points: 1.5,
            texte:
              "Que renvoie $\\texttt{annees(0.3)}$ ? Pourquoi la boucle s'arrête-t-elle forcément ?\n\n" +
              "```python\ndef annees(p):\n    n = 0\n    v = 1\n    while v >= p:\n        v = 0.88 * v\n        n = n + 1\n    return n\n```",
            indice: "$\\texttt{v}$ est la part de la valeur qui reste après $\\texttt{n}$ années.",
            corrige: "La fonction renvoie $\\texttt{10}$, comme à la question 2. La boucle s'arrête forcément, car $0{,}88^n \\to 0$ quand $n \\to +\\infty$ : la valeur finit toujours par passer sous $p > 0$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Quel pourcentage de baisse annuelle fait perdre à un objet la moitié de sa valeur en $5$ ans exactement ? Arrondis au dixième de pourcentage.",
            indice: "On cherche $t$ tel que $(1 - t)^5 = 0{,}5$, soit $1 - t = e^{\\frac{\\ln 0{,}5}{5}}$.",
            corrige: "$(1 - t)^5 = 0{,}5 \\iff 5\\ln(1 - t) = \\ln 0{,}5 \\iff 1 - t = e^{\\frac{\\ln 0{,}5}{5}} \\approx 0{,}8706$. Donc $t \\approx 0{,}129$ : une baisse d'environ $12{,}9\\,\\%$ par an."
          }
        ]
      }
    ]
  }
};
