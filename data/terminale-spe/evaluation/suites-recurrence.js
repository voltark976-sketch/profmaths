/*
  ENTRAÎNEMENT : Terminale spécialité — chapitre 1, Suites numériques et récurrence
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-spe-suites-recurrence.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit du bac (calculatrice autorisée
  sauf mention contraire). Les limites viennent au chapitre 4 : ici, on conjecture seulement.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-spe-suites-recurrence"] = {
  revisions: {
    intro: "Les suites et la récurrence en un coup d'œil : les trois étapes d'une récurrence, les sommes, le sens de variation, les bornes, la suite auxiliaire et les programmes types. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Raisonnement par récurrence",
        texte: "Pour démontrer $P(n)$ pour tout $n \\geqslant n_0$ : **initialisation**, on vérifie $P(n_0)$ ; **hérédité**, on suppose $P(n)$ vraie pour **un** entier $n \\geqslant n_0$ et on démontre $P(n + 1)$ ; **conclusion**. Les deux étapes sont indispensables."
      },
      {
        titre: "Sommes",
        texte: "$\\displaystyle\\sum_{k=1}^{n} k = \\dfrac{n(n + 1)}{2}$ et, pour $q \\neq 1$, $1 + q + \\dots + q^n = \\dfrac{q^{n+1} - 1}{q - 1}$. Pour une somme, l'hérédité consiste à ajouter le terme suivant."
      },
      {
        titre: "Inégalités par récurrence",
        texte: "On part de l'hypothèse de récurrence et on applique les mêmes opérations des deux côtés : multiplier par un nombre **positif**, ajouter, appliquer une fonction **croissante**. Exemple au programme : $(1 + a)^n \\geqslant 1 + na$ pour $a > 0$."
      },
      {
        titre: "Sens de variation",
        texte: "On étudie le signe de $u_{n+1} - u_n$, ou on compare $\\dfrac{u_{n+1}}{u_n}$ à $1$ si les termes sont strictement positifs. Pour $u_{n+1} = f(u_n)$ avec $f$ croissante, on démontre $u_n \\leqslant u_{n+1}$ par récurrence."
      },
      {
        titre: "Suites bornées",
        texte: "$(u_n)$ est majorée par $M$ si $u_n \\leqslant M$ pour tout $n$, minorée par $m$ si $u_n \\geqslant m$, bornée si elle est les deux. Un majorant est un nombre **fixe**, qui ne dépend pas de $n$."
      },
      {
        titre: "Suite auxiliaire",
        texte: "Pour $u_{n+1} = au_n + b$ avec $a \\neq 1$, on cherche $\\ell$ tel que $\\ell = a\\ell + b$ : la suite $v_n = u_n - \\ell$ est géométrique de raison $a$. On en déduit $u_n = \\ell + v_0 \\times a^n$."
      },
      {
        titre: "Programmes types",
        texte: "Un terme : une boucle $\\texttt{for}$ qui répète la relation. Une somme : une variable $\\texttt{s}$ qui part de $0$. Un seuil : une boucle $\\texttt{while}$ qui continue **tant que** la condition n'est pas atteinte, et qui compte les tours."
      }
    ],
    pieges: [
      "Oublier l'initialisation : une propriété héréditaire peut être fausse pour tout $n$.",
      "Supposer dans l'hérédité que $P(n)$ est vraie **pour tout** $n$ : c'est supposer ce qu'on veut démontrer.",
      "Ne pas utiliser l'hypothèse de récurrence dans l'hérédité.",
      "Croire qu'une formule vérifiée sur quelques termes est démontrée.",
      "Confondre $u_{n+1}$, le terme suivant, et $u_n + 1$.",
      "Oublier que $\\texttt{range(1, n + 1)}$ s'arrête à $n$."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit du bac (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Une suite définie par une fonction",
        duree: 30, points: 7, calculatrice: true,
        contexte: "On considère la fonction $f$ définie sur $[0\\,;+\\infty[$ par $f(x) = \\dfrac{4x + 2}{x + 3}$, et la suite $(u_n)$ définie par $u_0 = 0$ et, pour tout entier naturel $n$, $u_{n+1} = f(u_n)$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule $u_1$ et $u_2$, sous forme de fractions irréductibles.",
            indice: "$u_1 = f(0)$, puis $u_2 = f(u_1)$ : simplifie la fraction de fractions.",
            corrige: "$u_1 = f(0) = \\dfrac{2}{3}$. Puis $u_2 = f\\left(\\dfrac{2}{3}\\right) = \\dfrac{\\frac{8}{3} + 2}{\\frac{2}{3} + 3} = \\dfrac{14/3}{11/3} = \\dfrac{14}{11}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Étudie le sens de variation de $f$ sur $[0\\,;+\\infty[$, puis calcule $f(2)$.",
            indice: "$f$ est un quotient : $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$.",
            corrige: "$f'(x) = \\dfrac{4(x + 3) - (4x + 2) \\times 1}{(x + 3)^2} = \\dfrac{10}{(x + 3)^2} > 0$ : $f$ est strictement croissante sur $[0\\,;+\\infty[$. Et $f(2) = \\dfrac{10}{5} = 2$."
          },
          {
            n: "3.", points: 2,
            texte: "Démontre par récurrence que, pour tout entier naturel $n$, $0 \\leqslant u_n \\leqslant u_{n+1} \\leqslant 2$.",
            indice: "Pour l'hérédité, applique la fonction $f$, croissante sur $[0\\,;+\\infty[$, aux quatre membres de l'encadrement : l'ordre est conservé.",
            corrige:
              "On note $P(n)$ : « $0 \\leqslant u_n \\leqslant u_{n+1} \\leqslant 2$ ».\n\n" +
              "**Initialisation** : $u_0 = 0$ et $u_1 = \\dfrac{2}{3}$, donc $0 \\leqslant 0 \\leqslant \\dfrac{2}{3} \\leqslant 2$ : $P(0)$ est vraie.\n\n" +
              "**Hérédité** : supposons $P(n)$ vraie pour un entier $n$. Comme $f$ est croissante sur $[0\\,;+\\infty[$, $f(0) \\leqslant f(u_n) \\leqslant f(u_{n+1}) \\leqslant f(2)$, soit $\\dfrac{2}{3} \\leqslant u_{n+1} \\leqslant u_{n+2} \\leqslant 2$. A fortiori $0 \\leqslant u_{n+1} \\leqslant u_{n+2} \\leqslant 2$ : $P(n + 1)$ est vraie.\n\n" +
              "**Conclusion** : $P(n)$ est vraie pour tout $n$ ; la suite est croissante et majorée par $2$."
          },
          {
            n: "4.", points: 1.5,
            texte: "On pose $v_n = \\dfrac{u_n - 2}{u_n + 1}$. Démontre que $(v_n)$ est géométrique de raison $\\dfrac{2}{5}$ et donne $v_0$.",
            indice: "Remplace $u_{n+1}$ par $\\dfrac{4u_n + 2}{u_n + 3}$ dans $v_{n+1}$, puis multiplie le numérateur et le dénominateur par $u_n + 3$.",
            corrige: "$v_{n+1} = \\dfrac{\\frac{4u_n + 2}{u_n + 3} - 2}{\\frac{4u_n + 2}{u_n + 3} + 1} = \\dfrac{4u_n + 2 - 2u_n - 6}{4u_n + 2 + u_n + 3} = \\dfrac{2u_n - 4}{5u_n + 5}$, donc $v_{n+1} = \\dfrac{2}{5} \\times \\dfrac{u_n - 2}{u_n + 1} = \\dfrac{2}{5}v_n$. La suite est géométrique de raison $\\dfrac{2}{5}$, avec $v_0 = \\dfrac{0 - 2}{0 + 1} = -2$."
          },
          {
            n: "5.", points: 1,
            texte: "Exprime $v_n$, puis $u_n$, en fonction de $n$. Vérifie avec $u_1$.",
            indice: "De $v = \\dfrac{u - 2}{u + 1}$, tire $u$ : $v(u + 1) = u - 2$.",
            corrige: "$v_n = -2 \\times 0{,}4^n$. De $v_n(u_n + 1) = u_n - 2$, on tire $u_n(1 - v_n) = 2 + v_n$, donc $u_n = \\dfrac{2 + v_n}{1 - v_n} = \\dfrac{2 - 2 \\times 0{,}4^n}{1 + 2 \\times 0{,}4^n}$. Pour $n = 1$ : $\\dfrac{2 - 0{,}8}{1 + 0{,}8} = \\dfrac{1{,}2}{1{,}8} = \\dfrac{2}{3}$, c'est bien $u_1$."
          }
        ]
      },
      {
        titre: "Somme et divisibilité",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les parties A et B sont indépendantes.",
        questions: [
          { partie: "Partie A : une somme", texte: "Pour tout entier $n \\geqslant 1$, on pose $S_n = 1 \\times 2 + 2 \\times 3 + \\dots + n(n + 1) = \\displaystyle\\sum_{k=1}^{n} k(k + 1)$." },
          {
            n: "1.", points: 1,
            texte: "Calcule $S_1$, $S_2$ et $S_3$. Vérifie qu'ils sont égaux à $\\dfrac{n(n + 1)(n + 2)}{3}$ pour $n = 1$, $2$ et $3$.",
            indice: "$S_2 = 1 \\times 2 + 2 \\times 3$.",
            corrige: "$S_1 = 2$, $S_2 = 2 + 6 = 8$ et $S_3 = 8 + 12 = 20$. Et $\\dfrac{1 \\times 2 \\times 3}{3} = 2$, $\\dfrac{2 \\times 3 \\times 4}{3} = 8$, $\\dfrac{3 \\times 4 \\times 5}{3} = 20$."
          },
          {
            n: "2.", points: 2,
            texte: "Démontre par récurrence que, pour tout entier $n \\geqslant 1$, $S_n = \\dfrac{n(n + 1)(n + 2)}{3}$.",
            indice: "Hérédité : $S_{n+1} = S_n + (n + 1)(n + 2)$. Mets $(n + 1)(n + 2)$ en facteur.",
            corrige:
              "**Initialisation** : $S_1 = 2 = \\dfrac{1 \\times 2 \\times 3}{3}$.\n\n" +
              "**Hérédité** : supposons $S_n = \\dfrac{n(n + 1)(n + 2)}{3}$ pour un entier $n \\geqslant 1$. Alors $S_{n+1} = S_n + (n + 1)(n + 2)$, c'est-à-dire $\\dfrac{n(n + 1)(n + 2)}{3}$ plus $(n + 1)(n + 2)$. En factorisant par $(n + 1)(n + 2)$ : $S_{n+1} = (n + 1)(n + 2)\\left(\\dfrac{n}{3} + 1\\right) = \\dfrac{(n + 1)(n + 2)(n + 3)}{3}$ : c'est la formule au rang $n + 1$.\n\n" +
              "**Conclusion** : la formule est vraie pour tout $n \\geqslant 1$."
          },
          {
            n: "3.", points: 1,
            texte:
              "Complète la ligne manquante pour que la fonction renvoie $S_n$. Que renvoie $\\texttt{S(10)}$ ?\n\n" +
              "```python\ndef S(n):\n    s = 0\n    for k in range(1, n + 1):\n        s = ...\n    return s\n```",
            indice: "À chaque tour, on ajoute le terme $k(k + 1)$.",
            corrige: "On écrit $\\texttt{s = s + k * (k + 1)}$. Avec la formule, $\\texttt{S(10)}$ renvoie $\\dfrac{10 \\times 11 \\times 12}{3} = 440$."
          },
          { partie: "Partie B : divisibilité" },
          {
            n: "4.", points: 2,
            texte: "Démontre par récurrence que, pour tout entier naturel $n$, $4^n - 1$ est divisible par $3$.",
            indice: "Hérédité : écris $4^{n+1} - 1 = 4 \\times 4^n - 1 = 4(4^n - 1) + 3$.",
            corrige:
              "**Initialisation** : $4^0 - 1 = 0 = 3 \\times 0$.\n\n" +
              "**Hérédité** : supposons $4^n - 1 = 3k$ avec $k$ entier. Alors $4^{n+1} - 1 = 4(4^n - 1) + 3 = 12k + 3 = 3(4k + 1)$, qui est divisible par $3$.\n\n" +
              "**Conclusion** : $4^n - 1$ est divisible par $3$ pour tout entier naturel $n$."
          },
          {
            n: "5.", points: 1,
            texte: "Un élève démontre que, si $4^n + 1$ est divisible par $3$, alors $4^{n+1} + 1$ l'est aussi. Peut-on en conclure que $4^n + 1$ est divisible par $3$ pour tout $n$ ?",
            indice: "Regarde $n = 0$. Que dit la question 4 sur le reste de $4^n + 1$ ?",
            corrige: "Non : la propriété est bien héréditaire, mais l'initialisation échoue, car $4^0 + 1 = 2$. En fait, $4^n + 1 = (4^n - 1) + 2$ : d'après la question 4, le reste de la division par $3$ vaut toujours $2$. La propriété est fausse pour tout $n$."
          }
        ]
      },
      {
        titre: "Les tortues de la baie",
        duree: 20, points: 6, calculatrice: true,
        contexte: "En 2025, une association recense $2\\,000$ tortues vertes qui fréquentent une baie de Mayotte. On estime que chaque année, $10\\,\\%$ des tortues quittent la baie et $300$ nouvelles tortues arrivent (modèle fictif). On note $u_n$ le nombre de tortues l'année $2025 + n$ : $u_0 = 2\\,000$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Justifie que $u_{n+1} = 0{,}9u_n + 300$, puis calcule $u_1$ et $u_2$.",
            indice: "Perdre $10\\,\\%$, c'est multiplier par $0{,}9$.",
            corrige: "Il reste $90\\,\\%$ des tortues, soit $0{,}9u_n$, auxquelles s'ajoutent $300$ arrivées : $u_{n+1} = 0{,}9u_n + 300$. Puis $u_1 = 1\\,800 + 300 = 2\\,100$ et $u_2 = 1\\,890 + 300 = 2\\,190$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Démontre par récurrence que, pour tout entier naturel $n$, $u_n \\leqslant u_{n+1} \\leqslant 3\\,000$.",
            indice: "Hérédité : multiplie l'encadrement par $0{,}9 > 0$, puis ajoute $300$.",
            corrige:
              "**Initialisation** : $u_0 = 2\\,000 \\leqslant u_1 = 2\\,100 \\leqslant 3\\,000$.\n\n" +
              "**Hérédité** : si $u_n \\leqslant u_{n+1} \\leqslant 3\\,000$, alors $0{,}9u_n + 300 \\leqslant 0{,}9u_{n+1} + 300 \\leqslant 0{,}9 \\times 3\\,000 + 300$, soit $u_{n+1} \\leqslant u_{n+2} \\leqslant 3\\,000$.\n\n" +
              "**Conclusion** : la suite est croissante et majorée par $3\\,000$."
          },
          {
            n: "3.", points: 1.5,
            texte: "On pose $v_n = u_n - 3\\,000$. Démontre que $(v_n)$ est géométrique, puis exprime $u_n$ en fonction de $n$.",
            indice: "$v_{n+1} = u_{n+1} - 3\\,000 = 0{,}9u_n - 2\\,700$ : factorise par $0{,}9$.",
            corrige: "$v_{n+1} = 0{,}9u_n + 300 - 3\\,000 = 0{,}9u_n - 2\\,700 = 0{,}9(u_n - 3\\,000) = 0{,}9v_n$ : $(v_n)$ est géométrique de raison $0{,}9$ et $v_0 = -1\\,000$. Donc $v_n = -1\\,000 \\times 0{,}9^n$ et $u_n = 3\\,000 - 1\\,000 \\times 0{,}9^n$."
          },
          {
            n: "4.", points: 1,
            texte:
              "Que renvoie $\\texttt{annee(2900)}$ ? Interprète.\n\n" +
              "```python\ndef annee(S):\n    n = 0\n    u = 2000\n    while u < S:\n        u = 0.9 * u + 300\n        n = n + 1\n    return 2025 + n\n```",
            indice: "La boucle s'arrête au premier rang $n$ tel que $u_n \\geqslant 2\\,900$. Utilise la formule de la question 3 et la calculatrice.",
            corrige: "$u_{21} = 3\\,000 - 1\\,000 \\times 0{,}9^{21} \\approx 2\\,890{,}6$ et $u_{22} \\approx 2\\,901{,}5$ : la boucle s'arrête pour $n = 22$ et la fonction renvoie $\\texttt{2047}$. Selon ce modèle, la baie comptera au moins $2\\,900$ tortues à partir de $2047$."
          },
          {
            n: "5.", points: 1,
            texte: "Avec ce modèle, le nombre de tortues peut-il dépasser $3\\,000$ ? Que semble-t-il se passer à long terme ?",
            indice: "Regarde le signe de $1\\,000 \\times 0{,}9^n$.",
            corrige: "Non : $1\\,000 \\times 0{,}9^n > 0$, donc $u_n < 3\\,000$ pour tout $n$. Comme $0{,}9^n$ devient très petit quand $n$ grandit, le nombre de tortues semble se stabiliser près de $3\\,000$ (les limites, au chapitre 4, le confirmeront)."
          }
        ]
      }
    ]
  }
};
