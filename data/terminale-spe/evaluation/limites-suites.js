/*
  ENTRAÎNEMENT : Terminale spécialité — chapitre 4, Limites de suites
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-spe-limites-suites.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit du bac.
  Le logarithme vient au chapitre 9 : les seuils se trouvent ici à la calculatrice ou avec un programme.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-spe-limites-suites"] = {
  revisions: {
    intro: "Les limites de suites en un coup d'œil : opérations, formes indéterminées, comparaison et gendarmes, suites géométriques, convergence monotone et seuils. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Limite d'une suite",
        texte: "$(u_n)$ converge vers $\\ell$ si tout intervalle ouvert contenant $\\ell$ contient tous les termes à partir d'un certain rang. Elle tend vers $+\\infty$ si tout intervalle $]A\\,;+\\infty[$ contient tous les termes à partir d'un certain rang."
      },
      {
        titre: "Formes indéterminées",
        texte: "Les quatre formes « $\\infty - \\infty$ », « $0 \\times \\infty$ », « $\\dfrac{\\infty}{\\infty}$ » et « $\\dfrac{0}{0}$ » demandent de transformer l'écriture : factoriser par le terme dominant, simplifier, ou multiplier par la quantité conjuguée."
      },
      {
        titre: "Comparaison et gendarmes",
        texte: "Si $u_n \\geqslant v_n$ à partir d'un rang et $v_n \\to +\\infty$, alors $u_n \\to +\\infty$. Si $v_n \\leqslant u_n \\leqslant w_n$ et si $v_n$ et $w_n$ tendent vers $\\ell$, alors $u_n \\to \\ell$."
      },
      {
        titre: "Suites géométriques",
        texte: "Si $q > 1$, $q^n \\to +\\infty$ ; si $-1 < q < 1$, $q^n \\to 0$ ; si $q \\leqslant -1$, pas de limite. Pour une somme : $1 + q + \\dots + q^n = \\dfrac{1 - q^{n+1}}{1 - q}$ tend vers $\\dfrac{1}{1 - q}$ si $-1 < q < 1$."
      },
      {
        titre: "Convergence monotone",
        texte: "Une suite croissante et majorée converge, une suite décroissante et minorée aussi. Le théorème donne l'existence de la limite, pas sa valeur."
      },
      {
        titre: "Limite de $u_{n+1} = f(u_n)$",
        texte: "Si $(u_n)$ converge vers $\\ell$ et si $f$ est continue, alors $\\ell = f(\\ell)$. On résout cette équation et on choisit la solution compatible avec les bornes de la suite."
      },
      {
        titre: "Seuils",
        texte: "Une boucle $\\texttt{while}$ calcule les termes tant que la condition n'est pas atteinte : $\\texttt{while u <= A}$ pour une suite qui tend vers $+\\infty$, $\\texttt{while abs(u - l) > e}$ pour une suite qui converge vers $\\ell$."
      }
    ],
    pieges: [
      "Conclure « pas de limite » devant une forme indéterminée : il faut transformer l'écriture.",
      "Croire que $\\dfrac{\\infty}{\\infty} = 1$ ou que $\\infty - \\infty = 0$.",
      "Oublier que $q^n \\to +\\infty$ dès que $q > 1$, même pour $q = 1{,}001$.",
      "Croire qu'une suite croissante tend forcément vers $+\\infty$ : elle converge si elle est majorée.",
      "Utiliser $\\ell = f(\\ell)$ sans avoir prouvé que la suite converge.",
      "Garder une inégalité stricte en passant à la limite : $u_n < 3$ pour tout $n$ donne seulement $\\ell \\leqslant 3$."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit du bac (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Calculer des limites",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions sont indépendantes. Justifie chaque limite.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Détermine les limites des suites définies pour tout entier $n \\geqslant 1$ par $u_n = \\dfrac{1 - 2n^3}{n^2 + 4}$ et $v_n = \\dfrac{3n + 1}{n^2 + 5}$.",
            indice: "Factorise le numérateur et le dénominateur par leurs termes de plus haut degré.",
            corrige: "$u_n = \\dfrac{n^3\\left(\\frac{1}{n^3} - 2\\right)}{n^2\\left(1 + \\frac{4}{n^2}\\right)} = n \\times \\dfrac{\\frac{1}{n^3} - 2}{1 + \\frac{4}{n^2}}$. La fraction tend vers $-2$ et $n \\to +\\infty$, donc $u_n \\to -\\infty$. De même, $v_n = \\dfrac{1}{n} \\times \\dfrac{3 + \\frac{1}{n}}{1 + \\frac{5}{n^2}}$, produit d'une suite qui tend vers $0$ par une suite qui tend vers $3$ : $v_n \\to 0$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Détermine la limite de $w_n = \\sqrt{n^2 + 3n} - n$.",
            indice: "C'est une forme « $\\infty - \\infty$ » : multiplie et divise par la quantité conjuguée $\\sqrt{n^2 + 3n} + n$.",
            corrige: "$w_n = \\dfrac{(n^2 + 3n) - n^2}{\\sqrt{n^2 + 3n} + n} = \\dfrac{3n}{\\sqrt{n^2 + 3n} + n}$. En factorisant par $n$ : $w_n = \\dfrac{3}{\\sqrt{1 + \\frac{3}{n}} + 1}$, qui tend vers $\\dfrac{3}{1 + 1} = \\dfrac{3}{2}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Détermine la limite de $t_n = \\dfrac{3 + (-1)^n}{n}$.",
            indice: "Encadre $3 + (-1)^n$ entre deux nombres, puis divise par $n > 0$.",
            corrige: "$2 \\leqslant 3 + (-1)^n \\leqslant 4$, donc $\\dfrac{2}{n} \\leqslant t_n \\leqslant \\dfrac{4}{n}$. Les deux suites qui encadrent tendent vers $0$ : d'après le théorème des gendarmes, $t_n \\to 0$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Détermine la limite de $z_n = n + \\sin(n)$.",
            indice: "$\\sin(n) \\geqslant -1$ pour tout $n$.",
            corrige: "Comme $\\sin(n) \\geqslant -1$, on a $z_n \\geqslant n - 1$. Or $n - 1 \\to +\\infty$ : par comparaison, $z_n \\to +\\infty$."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « une suite croissante tend vers $+\\infty$ ». Justifie.",
            indice: "Cherche une suite croissante et majorée.",
            corrige: "**Faux.** La suite $u_n = 1 - \\dfrac{1}{n}$ (pour $n \\geqslant 1$) est croissante, car $\\dfrac{1}{n}$ diminue, mais elle converge vers $1$."
          }
        ]
      },
      {
        titre: "Une suite qui descend vers 3",
        duree: 30, points: 7, calculatrice: true,
        contexte: "On considère la suite $(u_n)$ définie par $u_0 = 8$ et, pour tout entier naturel $n$, $u_{n+1} = \\sqrt{2u_n + 3}$. On note $f$ la fonction définie sur $[0\\,;+\\infty[$ par $f(x) = \\sqrt{2x + 3}$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule $u_1$ et $u_2$, arrondis au centième. Quelle conjecture peux-tu faire sur le sens de variation de la suite ?",
            indice: "$u_1 = \\sqrt{2 \\times 8 + 3}$.",
            corrige: "$u_1 = \\sqrt{19} \\approx 4{,}36$ et $u_2 = \\sqrt{2\\sqrt{19} + 3} \\approx 3{,}42$. La suite semble décroissante."
          },
          {
            n: "2.", points: 2,
            texte: "Démontre par récurrence que, pour tout entier naturel $n$, $3 \\leqslant u_{n+1} \\leqslant u_n$.",
            indice: "$f$ est croissante sur $[0\\,;+\\infty[$ (composée de $x \\mapsto 2x + 3$ et de la racine carrée), et $f(3) = 3$.",
            corrige:
              "**Initialisation** : $u_1 = \\sqrt{19}$ et $3 = \\sqrt{9} \\leqslant \\sqrt{19} \\leqslant 8 = u_0$.\n\n" +
              "**Hérédité** : supposons $3 \\leqslant u_{n+1} \\leqslant u_n$. La fonction $f$ est croissante sur $[0\\,;+\\infty[$, donc $f(3) \\leqslant f(u_{n+1}) \\leqslant f(u_n)$, soit $3 \\leqslant u_{n+2} \\leqslant u_{n+1}$, car $f(3) = \\sqrt{9} = 3$.\n\n" +
              "**Conclusion** : la suite est décroissante et minorée par $3$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Justifie que $(u_n)$ converge, puis détermine sa limite $\\ell$.",
            indice: "Théorème de convergence monotone. Puis $\\ell = f(\\ell)$, car $f$ est continue : élève au carré, avec $\\ell \\geqslant 3$.",
            corrige: "$(u_n)$ est décroissante et minorée par $3$ : elle converge vers un réel $\\ell \\geqslant 3$. Comme $f$ est continue, $\\ell = \\sqrt{2\\ell + 3}$, d'où $\\ell^2 - 2\\ell - 3 = 0$, soit $(\\ell - 3)(\\ell + 1) = 0$. Comme $\\ell \\geqslant 3$, $\\ell = 3$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Démontre que, pour tout entier naturel $n$, $u_{n+1} - 3 \\leqslant \\dfrac{1}{3}(u_n - 3)$. Déduis-en que $u_n - 3 \\leqslant 5 \\times \\left(\\dfrac{1}{3}\\right)^n$, et retrouve la limite.",
            indice: "Multiplie $u_{n+1} - 3 = \\sqrt{2u_n + 3} - 3$ par sa quantité conjuguée, et utilise $\\sqrt{2u_n + 3} \\geqslant 3$.",
            corrige: "$u_{n+1} - 3 = \\dfrac{2u_n + 3 - 9}{\\sqrt{2u_n + 3} + 3} = \\dfrac{2(u_n - 3)}{\\sqrt{2u_n + 3} + 3}$. Comme $u_n - 3 \\geqslant 0$ et $\\sqrt{2u_n + 3} + 3 \\geqslant 6$, on a $u_{n+1} - 3 \\leqslant \\dfrac{2(u_n - 3)}{6} = \\dfrac{1}{3}(u_n - 3)$. Par une récurrence immédiate, $u_n - 3 \\leqslant \\left(\\dfrac{1}{3}\\right)^n(u_0 - 3) = 5 \\times \\left(\\dfrac{1}{3}\\right)^n$. Comme $0 \\leqslant u_n - 3 \\leqslant 5 \\times \\left(\\dfrac{1}{3}\\right)^n$ et que $\\left(\\dfrac{1}{3}\\right)^n \\to 0$, les gendarmes redonnent $u_n \\to 3$."
          },
          {
            n: "5.", points: 1,
            texte:
              "Que renvoie $\\texttt{seuil(0.01)}$ ? Interprète.\n\n" +
              "```python\nfrom math import sqrt\n\ndef seuil(e):\n    u = 8\n    n = 0\n    while u - 3 > e:\n        u = sqrt(2 * u + 3)\n        n = n + 1\n    return n\n```",
            indice: "Calcule les termes à la calculatrice jusqu'à ce que $u_n - 3 \\leqslant 0{,}01$. Pense à vérifier le rang précédent.",
            corrige: "$u_5 \\approx 3{,}015$ et $u_6 \\approx 3{,}005$ : la boucle s'arrête pour $n = 6$, la fonction renvoie $\\texttt{6}$. À partir du rang $6$, $u_n$ est à moins de $0{,}01$ de sa limite $3$ (la suite est décroissante)."
          }
        ]
      },
      {
        titre: "La balle qui rebondit",
        duree: 20, points: 6, calculatrice: true,
        contexte: "On lâche une balle d'une hauteur de $2$ m. À chaque rebond, elle remonte à $60\\,\\%$ de la hauteur précédente. On note $h_n$ la hauteur, en mètres, atteinte après le $n$-ième rebond, et $h_0 = 2$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Exprime $h_n$ en fonction de $n$. Calcule $h_1$ et $h_2$.",
            indice: "Remonter à $60\\,\\%$, c'est multiplier par $0{,}6$ : la suite est géométrique.",
            corrige: "$(h_n)$ est géométrique de raison $0{,}6$ et de premier terme $2$ : $h_n = 2 \\times 0{,}6^n$. Ainsi $h_1 = 1{,}2$ m et $h_2 = 0{,}72$ m."
          },
          {
            n: "2.", points: 1,
            texte: "Détermine la limite de $(h_n)$. Interprète.",
            indice: "Limite de $q^n$ pour $-1 < q < 1$.",
            corrige: "$0 < 0{,}6 < 1$, donc $0{,}6^n \\to 0$ et $h_n \\to 0$ : les rebonds deviennent aussi petits qu'on veut."
          },
          {
            n: "3.", points: 1.5,
            texte: "À partir de quel rebond la hauteur est-elle inférieure à $1$ cm ?",
            indice: "Cherche le plus petit $n$ tel que $2 \\times 0{,}6^n < 0{,}01$ avec le tableau de valeurs de la calculatrice.",
            corrige: "$h_{10} = 2 \\times 0{,}6^{10} \\approx 0{,}012$ m et $h_{11} \\approx 0{,}0073$ m. Comme $(h_n)$ est décroissante, la hauteur est inférieure à $1$ cm à partir du $11^{\\text{e}}$ rebond."
          },
          {
            n: "4.", points: 1.5,
            texte: "Juste avant le $(n + 1)$-ième contact avec le sol, la balle a parcouru $d_n = 2 + 2(h_1 + h_2 + \\dots + h_n)$ mètres. Montre que $d_n = 8 - 6 \\times 0{,}6^n$ et détermine la limite de $(d_n)$.",
            indice: "$h_1 + \\dots + h_n = 1{,}2 \\times (1 + 0{,}6 + \\dots + 0{,}6^{n-1})$ : somme de termes d'une suite géométrique.",
            corrige: "$h_1 + \\dots + h_n = 1{,}2 \\times \\dfrac{1 - 0{,}6^n}{1 - 0{,}6} = 3(1 - 0{,}6^n)$. Donc $d_n = 2 + 6(1 - 0{,}6^n) = 8 - 6 \\times 0{,}6^n$. Comme $0{,}6^n \\to 0$, $d_n \\to 8$ : la balle parcourt moins de $8$ m en tout, même avec une infinité de rebonds."
          },
          {
            n: "5.", points: 1,
            texte:
              "Complète la ligne manquante pour que la fonction renvoie $d_n$.\n\n" +
              "```python\ndef distance(n):\n    d = 2\n    h = 2\n    for k in range(n):\n        h = 0.6 * h\n        d = ...\n    return d\n```",
            indice: "À chaque rebond, la balle monte de $h$ puis redescend de $h$.",
            corrige: "On écrit $\\texttt{d = d + 2 * h}$ : chaque rebond ajoute une montée et une descente de hauteur $h$. Par exemple, $\\texttt{distance(1)}$ renvoie $2 + 2 \\times 1{,}2 = 4{,}4$, qui est bien $d_1 = 8 - 6 \\times 0{,}6$."
          }
        ]
      }
    ]
  }
};
