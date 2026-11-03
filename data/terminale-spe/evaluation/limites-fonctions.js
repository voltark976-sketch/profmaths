/*
  ENTRAÎNEMENT : Terminale spécialité — chapitre 6, Limites de fonctions
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-spe-limites-fonctions.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit du bac.
  Pas encore de logarithme (chapitre 9) ni de théorème des valeurs intermédiaires (chapitre 7).
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-spe-limites-fonctions"] = {
  revisions: {
    intro: "Les limites de fonctions en un coup d'œil : limites de référence, asymptotes, formes indéterminées, composées, comparaison et croissances comparées. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Asymptotes",
        texte: "Si $\\lim\\limits_{x \\to +\\infty} f(x) = \\ell$, la droite $y = \\ell$ est asymptote horizontale en $+\\infty$. Si $f(x)$ tend vers $\\pm\\infty$ quand $x$ tend vers $a$, la droite $x = a$ est asymptote verticale."
      },
      {
        titre: "Limite en un réel",
        texte: "Pour une valeur interdite $a$, on étudie séparément $a^+$ et $a^-$ : le signe du dénominateur, qui tend vers $0$, donne le signe de l'infini."
      },
      {
        titre: "Exponentielle",
        texte: "$\\lim\\limits_{x \\to +\\infty} e^x = +\\infty$ et $\\lim\\limits_{x \\to -\\infty} e^x = 0$. Donc $e^{-x} \\to 0$ en $+\\infty$."
      },
      {
        titre: "Formes indéterminées",
        texte: "En $\\pm\\infty$, un polynôme a la limite de son terme de plus haut degré, et un quotient de polynômes celle du quotient des termes de plus haut degré. En un réel, on factorise et on simplifie."
      },
      {
        titre: "Fonction composée",
        texte: "Pour $g(u(x))$ : on pose $X = u(x)$, on cherche la limite $b$ de $X$, puis la limite de $g(X)$ quand $X$ tend vers $b$."
      },
      {
        titre: "Comparaison, gendarmes",
        texte: "Si $f(x) \\geqslant g(x)$ pour $x$ assez grand et $g(x) \\to +\\infty$, alors $f(x) \\to +\\infty$. Si $g(x) \\leqslant f(x) \\leqslant h(x)$ et si $g$ et $h$ tendent vers $\\ell$, alors $f(x) \\to \\ell$."
      },
      {
        titre: "Croissances comparées",
        texte: "Pour tout entier $n$ : $\\lim\\limits_{x \\to +\\infty} \\dfrac{e^x}{x^n} = +\\infty$ et $\\lim\\limits_{x \\to -\\infty} x^n e^x = 0$. En l'infini, l'exponentielle l'emporte sur les puissances de $x$."
      }
    ],
    pieges: [
      "Oublier le signe en $-\\infty$ : $x^3 \\to -\\infty$ mais $x^2 \\to +\\infty$.",
      "Utiliser la règle des termes de plus haut degré en un réel : elle ne vaut qu'en $\\pm\\infty$.",
      "Confondre asymptote horizontale $y = \\ell$ et asymptote verticale $x = a$.",
      "Oublier d'étudier le signe du dénominateur en $a^+$ et en $a^-$.",
      "Croire que $\\dfrac{e^x}{x} \\to 1$ : l'exponentielle l'emporte, la limite est $+\\infty$.",
      "Croire qu'une courbe ne peut pas couper son asymptote horizontale."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit du bac (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Une fonction avec exponentielle",
        duree: 30, points: 7, calculatrice: true,
        contexte: "On considère la fonction $f$ définie sur $\\mathbb{R}$ par $f(x) = (2x - 1)e^x$, et sa courbe $\\mathcal{C}$ dans un repère.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Détermine la limite de $f$ en $+\\infty$, puis en $-\\infty$. Interprète graphiquement le second résultat.",
            indice: "En $-\\infty$, écris $f(x) = 2xe^x - e^x$ et utilise les croissances comparées.",
            corrige: "En $+\\infty$ : $2x - 1 \\to +\\infty$ et $e^x \\to +\\infty$, donc $f(x) \\to +\\infty$. En $-\\infty$ : $f(x) = 2xe^x - e^x$, avec $xe^x \\to 0$ (croissances comparées) et $e^x \\to 0$, donc $f(x) \\to 0$. L'axe des abscisses, d'équation $y = 0$, est asymptote horizontale à $\\mathcal{C}$ en $-\\infty$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Démontre que $f'(x) = (2x + 1)e^x$ et étudie le signe de $f'(x)$.",
            indice: "Dérivée d'un produit ; $e^x > 0$ pour tout $x$.",
            corrige: "$f'(x) = 2e^x + (2x - 1)e^x = (2x + 1)e^x$. Comme $e^x > 0$, $f'(x)$ a le signe de $2x + 1$ : négatif pour $x < -\\dfrac{1}{2}$, positif pour $x > -\\dfrac{1}{2}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Dresse le tableau de variations complet de $f$, avec la valeur exacte du minimum.",
            indice: "$f\\left(-\\dfrac{1}{2}\\right) = -2e^{-\\frac{1}{2}}$.",
            corrige: "$f$ est décroissante sur $\\left]-\\infty\\,;-\\dfrac{1}{2}\\right]$ et croissante sur $\\left[-\\dfrac{1}{2}\\,;+\\infty\\right[$. Son minimum est $f\\left(-\\dfrac{1}{2}\\right) = -2e^{-\\frac{1}{2}} = -\\dfrac{2}{\\sqrt{e}} \\approx -1{,}21$.",
            tableauCorrige: { lignes: [["x", "-\\infty", "", "-\\dfrac{1}{2}", "", "+\\infty"], ["f'(x)", "", "-", "0", "+", ""], ["f(x)", "0", "\\searrow", "-\\dfrac{2}{\\sqrt{e}}", "\\nearrow", "+\\infty"]] }
          },
          {
            n: "4.", points: 1.5,
            texte: "Étudie le signe de $f(x)$. Comment la courbe $\\mathcal{C}$ s'approche-t-elle de son asymptote en $-\\infty$ ?",
            indice: "$e^x > 0$ : $f(x)$ a le signe de $2x - 1$.",
            corrige: "$f(x)$ a le signe de $2x - 1$ : $f(x) < 0$ pour $x < \\dfrac{1}{2}$, $f\\left(\\dfrac{1}{2}\\right) = 0$, et $f(x) > 0$ ensuite. En $-\\infty$, $f(x) < 0$ et $f(x) \\to 0$ : la courbe s'approche de l'axe des abscisses **par en dessous**."
          },
          {
            n: "5.", points: 1,
            texte:
              "On exécute ce programme. Que va-t-il afficher, à peu près ? Est-ce cohérent avec la question 1 ?\n\n" +
              "```python\nfrom math import exp\n\nfor x in [-5, -10, -20]:\n    y = (2*x - 1) * exp(x)\n    print(x, y)\n```",
            indice: "Calcule $f(-5)$ à la calculatrice ; les valeurs suivantes sont bien plus proches de $0$.",
            corrige: "Il affiche environ $-0{,}074$ pour $x = -5$, $-0{,}00095$ pour $x = -10$ et $-8 \\times 10^{-8}$ pour $x = -20$ : des nombres négatifs de plus en plus proches de $0$, comme prévu par la limite en $-\\infty$ et la question 4."
          }
        ]
      },
      {
        titre: "Des limites variées",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions sont indépendantes. Justifie chaque limite.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Détermine les limites de $p(x) = x^3 - 5x^2 + 2$ en $+\\infty$ et en $-\\infty$.",
            indice: "Factorise par $x^3$, le terme de plus haut degré. Attention au signe de $x^3$ en $-\\infty$.",
            corrige: "$p(x) = x^3\\left(1 - \\dfrac{5}{x} + \\dfrac{2}{x^3}\\right)$, et la parenthèse tend vers $1$. Donc $p(x) \\to +\\infty$ en $+\\infty$ et $p(x) \\to -\\infty$ en $-\\infty$, comme $x^3$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Détermine $\\lim\\limits_{x \\to +\\infty} \\dfrac{4x^2 + 1}{2x^2 - x}$ et $\\lim\\limits_{x \\to -\\infty} \\dfrac{x + 3}{x^2 + 1}$.",
            indice: "Quotients de polynômes en l'infini : quotient des termes de plus haut degré.",
            corrige: "En $+\\infty$ : $\\dfrac{4x^2 + 1}{2x^2 - x} = \\dfrac{4 + \\frac{1}{x^2}}{2 - \\frac{1}{x}} \\to \\dfrac{4}{2} = 2$. En $-\\infty$ : $\\dfrac{x + 3}{x^2 + 1} = \\dfrac{1}{x} \\times \\dfrac{1 + \\frac{3}{x}}{1 + \\frac{1}{x^2}} \\to 0 \\times 1 = 0$."
          },
          {
            n: "3.", points: 1.5,
            texte: "On pose $g(x) = \\dfrac{2x + 3}{(x - 1)^2}$ pour $x \\neq 1$. Détermine la limite de $g$ en $1$ et interprète graphiquement.",
            indice: "Le numérateur tend vers $5$ ; quel est le signe du dénominateur près de $1$ ?",
            corrige: "Quand $x \\to 1$, $2x + 3 \\to 5$ et $(x - 1)^2 \\to 0$ en restant strictement positif, des deux côtés. Donc $g(x) \\to +\\infty$ en $1^-$ comme en $1^+$ : la droite $x = 1$ est asymptote verticale à la courbe de $g$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Détermine $\\lim\\limits_{x \\to +\\infty} e^{\\frac{1 - x^2}{x + 2}}$ et $\\lim\\limits_{x \\to +\\infty} \\sqrt{\\dfrac{4x + 1}{x + 3}}$.",
            indice: "Fonctions composées : cherche d'abord la limite de ce qui est dans l'exponentielle, ou sous la racine.",
            corrige: "$\\dfrac{1 - x^2}{x + 2}$ a la limite de $\\dfrac{-x^2}{x} = -x$, soit $-\\infty$ ; et $\\lim\\limits_{X \\to -\\infty} e^X = 0$, donc la première limite vaut $0$. Puis $\\dfrac{4x + 1}{x + 3} \\to 4$ et la racine carrée est continue en $4$ : la seconde limite vaut $\\sqrt{4} = 2$."
          },
          {
            n: "5.", points: 1,
            texte: "Détermine $\\lim\\limits_{x \\to +\\infty} (e^x - 5x)$ et $\\lim\\limits_{x \\to -\\infty} xe^x$.",
            indice: "La première est une forme « $\\infty - \\infty$ » : factorise par $x$.",
            corrige: "$e^x - 5x = x\\left(\\dfrac{e^x}{x} - 5\\right)$ ; comme $\\dfrac{e^x}{x} \\to +\\infty$ (croissances comparées), la parenthèse tend vers $+\\infty$ et la limite vaut $+\\infty$. Et $xe^x \\to 0$ en $-\\infty$ (croissances comparées)."
          }
        ]
      },
      {
        titre: "La concentration d'un médicament",
        duree: 20, points: 6, calculatrice: true,
        contexte: "La concentration d'un médicament dans le sang, en mg/L, $t$ heures après une prise, est modélisée par $C(t) = 20te^{-0{,}5t}$ pour $t \\geqslant 0$ (modèle fictif).",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Détermine la limite de $C$ en $+\\infty$ et interprète.",
            indice: "Écris $C(t) = 40 \\times (0{,}5t)e^{-0{,}5t}$ et pose $X = 0{,}5t$ : $Xe^{-X} = \\dfrac{X}{e^X}$.",
            corrige: "$C(t) = 40 \\times \\dfrac{X}{e^X}$ avec $X = 0{,}5t \\to +\\infty$. Par croissances comparées, $\\dfrac{e^X}{X} \\to +\\infty$, donc $\\dfrac{X}{e^X} \\to 0$ et $C(t) \\to 0$ : à long terme, le médicament disparaît du sang."
          },
          {
            n: "2.", points: 1.5,
            texte: "Étudie les variations de $C$ sur $[0\\,;+\\infty[$. Quelle est la concentration maximale, et quand est-elle atteinte ?",
            indice: "$C'(t) = 20e^{-0{,}5t} + 20t \\times (-0{,}5)e^{-0{,}5t}$ : factorise par $10e^{-0{,}5t}$.",
            corrige: "$C'(t) = 20e^{-0{,}5t} - 10te^{-0{,}5t} = 10e^{-0{,}5t}(2 - t)$, du signe de $2 - t$ : $C$ est croissante sur $[0\\,;2]$ et décroissante sur $[2\\,;+\\infty[$. Le maximum est $C(2) = 40e^{-1} \\approx 14{,}7$ mg/L, deux heures après la prise."
          },
          {
            n: "3.", points: 1.5,
            texte: "Le médicament est efficace quand la concentration est au moins de $5$ mg/L. À l'aide de la calculatrice, estime à $0{,}1$ h près le début et la fin de cette période.",
            indice: "Tableau de valeurs de $C$ avec un pas de $0{,}1$, avant puis après $t = 2$.",
            corrige: "$C(0{,}2) \\approx 3{,}6$ et $C(0{,}3) \\approx 5{,}2$ ; $C(6{,}5) \\approx 5{,}04$ et $C(6{,}6) \\approx 4{,}86$. Le médicament est efficace d'environ $0{,}3$ h jusqu'à environ $6{,}5$ h après la prise, soit un peu plus de $6$ heures."
          },
          {
            n: "4.", points: 1.5,
            texte:
              "Que va afficher ce programme ? Interprète.\n\n" +
              "```python\nfrom math import exp\n\ndef C(t):\n    return 20*t*exp(-0.5*t)\n\nt = 2\nwhile C(t) >= 0.5:\n    t = t + 0.5\nprint(t)\n```",
            indice: "Après le pic, $C$ décroît : la boucle avance de demi-heure en demi-heure tant que $C(t) \\geqslant 0{,}5$. Calcule $C(12)$ et $C(12{,}5)$.",
            corrige: "$C(12) \\approx 0{,}595$ et $C(12{,}5) \\approx 0{,}483$ : la boucle s'arrête pour $t = 12{,}5$ et le programme affiche $\\texttt{12.5}$. À la demi-heure près, la concentration passe sous $0{,}5$ mg/L environ $12$ h $30$ après la prise."
          }
        ]
      }
    ]
  }
};
