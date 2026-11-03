/*
  ENTRAÎNEMENT : Terminale maths complémentaires — chapitre 4, Limites de fonctions et continuité
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-limites-continuite.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths complémentaires.
  Pas encore de logarithme (chapitre 8) : solutions encadrées à la calculatrice. Données fictives.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-limites-continuite"] = {
  revisions: {
    intro: "Les limites et la continuité en un coup d'œil : limites de référence, asymptotes, opérations, continuité, théorème des valeurs intermédiaires et encadrement. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Limites de référence",
        texte: "En $+\\infty$ : $x^2$, $x^3$, $\\sqrt{x}$ et $e^x$ tendent vers $+\\infty$ ; $\\dfrac{1}{x}$ et $e^{-x}$ tendent vers $0$. En $-\\infty$ : $x^2 \\to +\\infty$, $x^3 \\to -\\infty$ et $e^x \\to 0$."
      },
      {
        titre: "Asymptotes",
        texte: "Si $f(x) \\to \\ell$ en $+\\infty$ ou en $-\\infty$, la droite $y = \\ell$ est asymptote horizontale. Si $f(x) \\to \\pm\\infty$ quand $x$ tend vers $a$, la droite $x = a$ est asymptote verticale."
      },
      {
        titre: "Opérations",
        texte: "On combine les limites comme les nombres, avec $\\ell + \\infty = \\infty$ et un nombre non nul fois $\\infty$ égal à $\\pm\\infty$. Les formes « $\\infty - \\infty$ » et « $0 \\times \\infty$ » demandent de transformer l'écriture."
      },
      {
        titre: "Continuité",
        texte: "Une fonction continue sur un intervalle se trace sans lever le crayon. Les polynômes, l'exponentielle, $\\sqrt{x}$, $\\dfrac{1}{x}$ sur chacun de ses intervalles, et leurs combinaisons sont continues."
      },
      {
        titre: "Valeurs intermédiaires",
        texte: "Si $f$ est continue sur $[a\\,;b]$ et si $k$ est entre $f(a)$ et $f(b)$, l'équation $f(x) = k$ a au moins une solution dans $[a\\,;b]$ ; une seule si, en plus, $f$ est strictement monotone."
      },
      {
        titre: "Encadrer une solution",
        texte: "Avec le tableau de valeurs, de $0{,}1$ en $0{,}1$, puis de $0{,}01$ en $0{,}01$, on repère le changement de signe de $f(x) - k$. Un programme peut faire ce balayage, ou une dichotomie."
      }
    ],
    pieges: [
      "Croire que $e^x \\to -\\infty$ en $-\\infty$ : l'exponentielle est positive, elle tend vers $0$.",
      "Oublier le signe de $x$ pour $\\dfrac{1}{x}$ près de $0$.",
      "Confondre asymptote horizontale $y = \\ldots$ et asymptote verticale $x = \\ldots$.",
      "Annoncer une solution unique sans vérifier la stricte monotonie.",
      "Utiliser la réciproque du théorème des valeurs intermédiaires, qui est fausse."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le coût moyen de la confiture",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Une coopérative fabrique de la confiture de goyave. Pour $x$ kilogrammes ($x > 0$), le coût total est $C(x) = 2x + 150$ euros : $150$ € de frais fixes et $2$ € par kilogramme (données fictives). Le coût moyen d'un kilogramme est $C_M(x) = \\dfrac{C(x)}{x}$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Montre que $C_M(x) = 2 + \\dfrac{150}{x}$, puis détermine la limite de $C_M$ en $+\\infty$. Interprète.",
            indice: "Sépare la fraction en deux.",
            corrige: "$C_M(x) = \\dfrac{2x + 150}{x} = 2 + \\dfrac{150}{x}$. Quand $x \\to +\\infty$, $\\dfrac{150}{x} \\to 0$, donc $C_M(x) \\to 2$ : pour de grandes quantités, les frais fixes deviennent négligeables et le kilogramme revient à environ $2$ €. La droite $y = 2$ est asymptote horizontale."
          },
          {
            n: "2.", points: 1.5,
            texte: "Détermine la limite de $C_M$ en $0^+$. Quelle asymptote en déduis-tu ?",
            indice: "Pour $x > 0$ proche de $0$, $\\dfrac{150}{x}$ devient très grand.",
            corrige: "Quand $x \\to 0^+$, $\\dfrac{150}{x} \\to +\\infty$, donc $C_M(x) \\to +\\infty$ : la droite $x = 0$, l'axe des ordonnées, est asymptote verticale. Produire très peu coûte très cher par kilogramme."
          },
          {
            n: "3.", points: 1.5,
            texte: "Étudie le sens de variation de $C_M$ sur $]0\\,;+\\infty[$.",
            indice: "$\\left(\\dfrac{1}{x}\\right)' = -\\dfrac{1}{x^2}$.",
            corrige: "$C_M'(x) = -\\dfrac{150}{x^2} < 0$ : le coût moyen diminue quand la production augmente."
          },
          {
            n: "4.", points: 1.5,
            texte: "À partir de quelle quantité le coût moyen est-il inférieur à $2{,}50$ € par kilogramme ?",
            indice: "Résous $2 + \\dfrac{150}{x} < 2{,}5$ avec $x > 0$.",
            corrige: "$2 + \\dfrac{150}{x} < 2{,}5 \\iff \\dfrac{150}{x} < 0{,}5 \\iff 150 < 0{,}5x \\iff x > 300$ (on multiplie par $x > 0$). Il faut produire plus de $300$ kg."
          },
          {
            n: "5.", points: 1,
            texte: "La coopérative vend sa confiture $3$ € le kilogramme. À partir de quelle quantité fait-elle un bénéfice ?",
            indice: "Bénéfice : recette moins coût, soit $3x - C(x)$.",
            corrige: "$3x - (2x + 150) = x - 150 > 0 \\iff x > 150$ : il faut vendre plus de $150$ kg. C'est aussi là que le coût moyen passe sous le prix de vente : $C_M(x) < 3 \\iff x > 150$."
          }
        ]
      },
      {
        titre: "Compter les solutions",
        duree: 25, points: 7, calculatrice: true,
        contexte: "On considère la fonction $f$ définie sur $[-1\\,;3]$ par $f(x) = x^3 - 3x^2 + 2$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $f'(x)$, puis dresse le tableau de variations de $f$ sur $[-1\\,;3]$.",
            indice: "$f'(x) = 3x^2 - 6x = 3x(x - 2)$.",
            corrige: "$f'(x) = 3x(x - 2)$ : positif sur $[-1\\,;0]$, négatif sur $[0\\,;2]$, positif sur $[2\\,;3]$. Avec $f(-1) = -2$, $f(0) = 2$, $f(2) = -2$ et $f(3) = 2$ :",
            tableauCorrige: { lignes: [["x", "-1", "", "0", "", "2", "", "3"], ["f'(x)", "", "+", "0", "-", "0", "+", ""], ["f(x)", "-2", "\\nearrow", "2", "\\searrow", "-2", "\\nearrow", "2"]] }
          },
          {
            n: "2.", points: 2,
            texte: "Démontre que l'équation $f(x) = 0$ a exactement trois solutions dans $[-1\\,;3]$.",
            indice: "Sur chaque intervalle du tableau, $f$ est continue et strictement monotone, et $0$ est entre les valeurs aux bornes.",
            corrige: "$f$ est un polynôme, donc continue. Sur $[-1\\,;0]$, elle est strictement croissante de $-2$ à $2$ : une seule solution. Sur $[0\\,;2]$, strictement décroissante de $2$ à $-2$ : une seule solution. Sur $[2\\,;3]$, strictement croissante de $-2$ à $2$ : une seule solution. En tout, trois solutions."
          },
          {
            n: "3.", points: 1.5,
            texte: "Vérifie que $1$ est l'une des solutions. Encadre la plus grande solution $\\gamma$ à $0{,}01$ près.",
            indice: "Calcule $f(1)$. Pour $\\gamma$, tableau de valeurs sur $[2\\,;3]$.",
            corrige: "$f(1) = 1 - 3 + 2 = 0$ : $1$ est la solution de $[0\\,;2]$. À la calculatrice, $f(2{,}73) \\approx -0{,}012$ et $f(2{,}74) \\approx 0{,}048$ ; comme $f$ est croissante sur $[2\\,;3]$, $2{,}73 < \\gamma < 2{,}74$."
          },
          {
            n: "4.", points: 1,
            texte: "Combien de solutions l'équation $f(x) = 3$ a-t-elle dans $[-1\\,;3]$ ?",
            indice: "Quel est le maximum de $f$ sur $[-1\\,;3]$ ?",
            corrige: "D'après le tableau, le maximum de $f$ sur $[-1\\,;3]$ est $2$ : l'équation $f(x) = 3$ n'a aucune solution."
          },
          {
            n: "5.", points: 1,
            texte:
              "Qu'affiche ce programme ? Est-ce cohérent avec la question 3 ?\n\n" +
              "```python\ndef f(x):\n    return x**3 - 3*x**2 + 2\n\nk = 200\nwhile f(k / 100) < 0:\n    k = k + 1\nprint(k / 100)\n```",
            indice: "Le programme teste $x = 2$, puis $2{,}01$, $2{,}02$… tant que $f(x) < 0$.",
            corrige: "Il affiche $\\texttt{2.74}$, la première valeur au centième où $f(x) \\geqslant 0$ : c'est cohérent avec $2{,}73 < \\gamma < 2{,}74$."
          }
        ]
      },
      {
        titre: "La température du four",
        duree: 20, points: 6, calculatrice: true,
        contexte: "On allume un four. Sa température, en °C, $t$ minutes plus tard, est $T(t) = 200 - 175e^{-0{,}1t}$ pour $t \\geqslant 0$ (modèle fictif).",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $T(0)$, puis la limite de $T$ en $+\\infty$. Interprète.",
            indice: "$e^{-0{,}1t} \\to 0$ quand $t \\to +\\infty$.",
            corrige: "$T(0) = 200 - 175 = 25$ °C, la température de la pièce. Comme $e^{-0{,}1t} \\to 0$, $T(t) \\to 200$ : la température se rapproche de $200$ °C, la droite $y = 200$ est asymptote horizontale."
          },
          {
            n: "2.", points: 1.5,
            texte: "Étudie le sens de variation de $T$.",
            indice: "La dérivée de $e^{-0{,}1t}$ est $-0{,}1e^{-0{,}1t}$.",
            corrige: "$T'(t) = -175 \\times (-0{,}1)e^{-0{,}1t} = 17{,}5e^{-0{,}1t} > 0$ : la température augmente."
          },
          {
            n: "3.", points: 1.5,
            texte: "Démontre qu'il existe un unique instant $t_0$ de $[0\\,;30]$ où le four atteint $180$ °C.",
            indice: "$T$ est continue et strictement croissante sur $[0\\,;30]$ : compare $180$ avec $T(0)$ et $T(30)$.",
            corrige: "$T$ est continue et strictement croissante sur $[0\\,;30]$, avec $T(0) = 25$ et $T(30) = 200 - 175e^{-3} \\approx 191{,}3$. Comme $180$ est entre ces deux valeurs, le théorème des valeurs intermédiaires, dans le cas strictement monotone, donne un unique $t_0$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Encadre $t_0$ entre deux nombres entiers consécutifs, puis au dixième.",
            indice: "Tableau de valeurs de $T$ de minute en minute, puis de $0{,}1$ en $0{,}1$.",
            corrige: "$T(21) \\approx 178{,}6$ et $T(22) \\approx 180{,}6$ : $21 < t_0 < 22$. Puis $T(21{,}6) \\approx 179{,}82$ et $T(21{,}7) \\approx 180{,}02$, donc $21{,}6 < t_0 < 21{,}7$ : le four atteint $180$ °C au bout d'environ $21$ min $40$ s."
          }
        ]
      }
    ]
  }
};
