/*
  ENTRAÎNEMENT : Terminale maths complémentaires — chapitre 1, Suites et modèles discrets
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-suites.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths complémentaires.
  Pas encore de logarithme (chapitre 8) ni de suites arithmético-géométriques (chapitre 3) : seuils à la calculatrice
  ou avec un programme. Données fictives.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-suites"] = {
  revisions: {
    intro: "Les suites en un coup d'œil : modéliser, suites arithmétiques et géométriques, limites, comparaison, sommes géométriques et seuils. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Arithmétique ou géométrique",
        texte: "On ajoute toujours le même nombre $r$ : $u_n = u_0 + nr$. On multiplie toujours par le même nombre $q$ : $u_n = u_0 \\times q^n$. Augmenter de $t\\,\\%$ revient à multiplier par $1 + \\dfrac{t}{100}$."
      },
      {
        titre: "Limite d'une suite",
        texte: "$(u_n)$ tend vers $\\ell$ si ses termes finissent par être aussi proches de $\\ell$ qu'on veut. Limites de référence : $\\dfrac{1}{n}$, $\\dfrac{1}{n^2}$ tendent vers $0$ ; $n$, $n^2$, $\\sqrt{n}$ vers $+\\infty$."
      },
      {
        titre: "Comparaison et gendarmes",
        texte: "Si $u_n \\geqslant v_n$ et $v_n \\to +\\infty$, alors $u_n \\to +\\infty$. Si $v_n \\leqslant u_n \\leqslant w_n$ et si $v_n$ et $w_n$ tendent vers $\\ell$, alors $u_n \\to \\ell$."
      },
      {
        titre: "Suites géométriques",
        texte: "Pour $q > 0$ : si $q > 1$, $q^n \\to +\\infty$ ; si $0 < q < 1$, $q^n \\to 0$. Ainsi $200 \\times 0{,}9^n + 50 \\to 50$."
      },
      {
        titre: "Somme géométrique",
        texte: "Pour $q \\neq 1$ : $1 + q + \\dots + q^n = \\dfrac{1 - q^{n+1}}{1 - q}$, avec $n + 1$ termes. Si $0 < q < 1$, cette somme tend vers $\\dfrac{1}{1 - q}$."
      },
      {
        titre: "Seuil",
        texte: "Pour trouver le premier rang où une suite dépasse une valeur, on utilise le tableau de valeurs de la calculatrice, ou une boucle $\\texttt{while}$ qui calcule les termes tant que le seuil n'est pas atteint."
      }
    ],
    pieges: [
      "Additionner les pourcentages : $+3\\,\\%$ par an pendant $10$ ans ne fait pas $+30\\,\\%$.",
      "Oublier qu'une suite peut n'avoir aucune limite, comme $(-1)^n$.",
      "Croire qu'une suite croissante tend forcément vers $+\\infty$.",
      "Penser que $1{,}001^n$ reste proche de $1$ : il tend vers $+\\infty$.",
      "Se tromper sur le nombre de termes de $1 + q + \\dots + q^n$ : il y en a $n + 1$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Deux placements",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Anfani dispose de $5\\,000$ €. Placement A : intérêts composés de $3\\,\\%$ par an. Placement B : $200$ € d'intérêts chaque année. On note $A_n$ et $B_n$ les capitaux, en euros, au bout de $n$ années : $A_0 = B_0 = 5\\,000$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule $A_1$, $A_2$, $B_1$ et $B_2$.",
            indice: "A : on multiplie par $1{,}03$ chaque année. B : on ajoute $200$.",
            corrige: "$A_1 = 5\\,150$, $A_2 = 5\\,304{,}50$ ; $B_1 = 5\\,200$, $B_2 = 5\\,400$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Quelle est la nature de chaque suite ? Exprime $A_n$ et $B_n$ en fonction de $n$.",
            indice: "L'une multiplie, l'autre ajoute.",
            corrige: "$(A_n)$ est géométrique de raison $1{,}03$ : $A_n = 5\\,000 \\times 1{,}03^n$. $(B_n)$ est arithmétique de raison $200$ : $B_n = 5\\,000 + 200n$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule $A_{10}$ et $B_{10}$, arrondis au centime. Quel placement est le plus intéressant sur $10$ ans ?",
            indice: "Calculatrice : $1{,}03^{10}$.",
            corrige: "$A_{10} = 5\\,000 \\times 1{,}03^{10} \\approx 6\\,719{,}58$ € et $B_{10} = 7\\,000$ € : sur $10$ ans, le placement B rapporte davantage."
          },
          {
            n: "4.", points: 1.5,
            texte:
              "Que renvoie ce programme ? Interprète.\n\n" +
              "```python\nn = 0\na = 5000\nb = 5000\nwhile a <= b:\n    n = n + 1\n    a = 1.03 * a\n    b = b + 200\nprint(n)\n```",
            indice: "La boucle s'arrête la première année où $A_n > B_n$. Utilise le tableau de valeurs de la calculatrice.",
            corrige: "$A_{19} \\approx 8\\,767{,}53 < B_{19} = 8\\,800$, mais $A_{20} \\approx 9\\,030{,}56 > B_{20} = 9\\,000$ : le programme affiche $\\texttt{20}$. À partir de $20$ ans, le placement A devient le meilleur."
          },
          {
            n: "5.", points: 1.5,
            texte: "Au bout de combien d'années le capital du placement A aura-t-il doublé ? Et celui du placement B ?",
            indice: "Pour A, cherche le premier $n$ tel que $1{,}03^n \\geqslant 2$ ; pour B, résous $200n \\geqslant 5\\,000$.",
            corrige: "$1{,}03^{23} \\approx 1{,}974$ et $1{,}03^{24} \\approx 2{,}033$ : le capital A double au bout de $24$ ans. Pour B : $200n \\geqslant 5\\,000 \\iff n \\geqslant 25$, il faut $25$ ans."
          }
        ]
      },
      {
        titre: "Limites et sommes",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions sont indépendantes. Justifie chaque réponse.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Détermine les limites des suites définies pour $n \\geqslant 1$ par $u_n = 5 - \\dfrac{3}{n^2}$ et $v_n = 2n^3 - n$.",
            indice: "Pour $v_n$, factorise par $n$ : $v_n = n(2n^2 - 1)$.",
            corrige: "$\\dfrac{3}{n^2} \\to 0$, donc $u_n \\to 5$. Puis $v_n = n(2n^2 - 1)$, produit de deux suites qui tendent vers $+\\infty$ : $v_n \\to +\\infty$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Détermine la limite de $w_n = 1 + \\dfrac{(-1)^n}{n^2 + 1}$.",
            indice: "$-1 \\leqslant (-1)^n \\leqslant 1$ : encadre $w_n$.",
            corrige: "$1 - \\dfrac{1}{n^2 + 1} \\leqslant w_n \\leqslant 1 + \\dfrac{1}{n^2 + 1}$, et les deux suites qui encadrent tendent vers $1$. D'après le théorème des gendarmes, $w_n \\to 1$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Détermine les limites de $a_n = 300 \\times 0{,}6^n + 20$ et de $b_n = -2 \\times 1{,}1^n$.",
            indice: "$0 < 0{,}6 < 1$ et $1{,}1 > 1$.",
            corrige: "$0{,}6^n \\to 0$, donc $a_n \\to 20$. Et $1{,}1^n \\to +\\infty$, donc $b_n = -2 \\times 1{,}1^n \\to -\\infty$."
          },
          {
            n: "4.", points: 1.5,
            texte: "On pose $S_n = 1 + \\dfrac{1}{3} + \\dfrac{1}{3^2} + \\dots + \\dfrac{1}{3^n}$. Exprime $S_n$ en fonction de $n$, puis détermine sa limite.",
            indice: "Somme des termes d'une suite géométrique de raison $q = \\dfrac{1}{3}$.",
            corrige: "$S_n = \\dfrac{1 - \\left(\\frac{1}{3}\\right)^{n+1}}{1 - \\frac{1}{3}} = \\dfrac{3}{2}\\left(1 - \\left(\\dfrac{1}{3}\\right)^{n+1}\\right)$. Comme $\\left(\\dfrac{1}{3}\\right)^{n+1} \\to 0$, $S_n \\to \\dfrac{3}{2}$."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « une suite croissante tend vers $+\\infty$ ». Justifie.",
            indice: "Cherche une suite croissante qui reste sous un nombre fixe.",
            corrige: "**Faux.** La suite $u_n = 1 - \\dfrac{1}{n}$ (pour $n \\geqslant 1$) est croissante et tend vers $1$."
          }
        ]
      },
      {
        titre: "Les touristes",
        duree: 20, points: 6, calculatrice: true,
        contexte: "En 2025, $60\\,000$ touristes ont visité l'île. On suppose que leur nombre augmente ensuite de $5\\,\\%$ par an (modèle fictif). On note $T_n$ le nombre de touristes l'année $2025 + n$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Exprime $T_n$ en fonction de $n$, puis estime le nombre de touristes en $2030$.",
            indice: "Augmenter de $5\\,\\%$, c'est multiplier par $1{,}05$ ; $2030$ correspond à $n = 5$.",
            corrige: "$(T_n)$ est géométrique de raison $1{,}05$ : $T_n = 60\\,000 \\times 1{,}05^n$. En $2030$ : $T_5 = 60\\,000 \\times 1{,}05^5 \\approx 76\\,577$ touristes."
          },
          {
            n: "2.", points: 1.5,
            texte:
              "Complète ce programme pour qu'il affiche la première année où le nombre de touristes dépasse $100\\,000$, puis donne cette année.\n\n" +
              "```python\nn = 0\nt = 60000\nwhile ...:\n    n = n + 1\n    t = 1.05 * t\nprint(2025 + n)\n```",
            indice: "La boucle doit continuer tant que $t \\leqslant 100\\,000$.",
            corrige: "On écrit $\\texttt{while t <= 100000:}$. Comme $T_{10} \\approx 97\\,734$ et $T_{11} \\approx 102\\,620$, le programme affiche $\\texttt{2036}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Combien de touristes au total l'île accueillerait-elle de $2025$ à $2034$ inclus ? Arrondis à l'unité.",
            indice: "C'est $T_0 + T_1 + \\dots + T_9$, soit $60\\,000(1 + 1{,}05 + \\dots + 1{,}05^9)$ : il y a $10$ termes.",
            corrige: "$60\\,000 \\times \\dfrac{1 - 1{,}05^{10}}{1 - 1{,}05} \\approx 60\\,000 \\times 12{,}578 \\approx 754\\,674$ touristes."
          },
          {
            n: "4.", points: 1.5,
            texte: "Quelle est la limite de $(T_n)$ ? Ce modèle est-il réaliste à très long terme ?",
            indice: "$1{,}05 > 1$.",
            corrige: "$1{,}05^n \\to +\\infty$, donc $T_n \\to +\\infty$. Ce n'est pas réaliste à très long terme : le nombre de touristes est limité (hébergements, vols, place sur l'île). Un modèle qui ralentit, comme celui de Verhulst, conviendrait mieux."
          }
        ]
      }
    ]
  }
};
