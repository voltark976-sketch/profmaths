/*
  ENTRAÎNEMENT : Terminale spécialité — chapitre 7, Continuité
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-spe-continuite.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit du bac.
  Pas encore de logarithme (chapitre 9) : les fonctions sont choisies pour s'en passer.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-spe-continuite"] = {
  revisions: {
    intro: "La continuité en un coup d'œil : fonctions continues, théorème des valeurs intermédiaires, solution unique, encadrement, dichotomie et suites. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Fonction continue",
        texte: "$f$ est continue en $a$ si $\\lim\\limits_{x \\to a} f(x) = f(a)$ ; graphiquement, la courbe se trace sans lever le crayon. Pour une fonction définie par morceaux, on compare les limites de chaque côté du point de raccord."
      },
      {
        titre: "Fonctions usuelles",
        texte: "Polynômes, exponentielle, sinus et cosinus sont continus sur $\\mathbb{R}$ ; l'inverse sur chacun de ses intervalles, la racine carrée sur $[0\\,;+\\infty[$. Sommes, produits, quotients et composées de fonctions continues sont continus. Une fonction dérivable est continue."
      },
      {
        titre: "Valeurs intermédiaires",
        texte: "Si $f$ est **continue** sur $[a\\,;b]$, pour tout $k$ entre $f(a)$ et $f(b)$, l'équation $f(x) = k$ a **au moins une** solution dans $[a\\,;b]$."
      },
      {
        titre: "Solution unique",
        texte: "Si de plus $f$ est **strictement monotone** sur $[a\\,;b]$, la solution est **unique**. Avec un tableau de variations, on l'applique sur chaque intervalle où $f$ est strictement monotone."
      },
      {
        titre: "Encadrer une solution",
        texte: "Par balayage, avec la calculatrice : un pas de $1$, puis $0{,}1$, puis $0{,}01$, en repérant le changement de signe. Par dichotomie : on coupe l'intervalle en deux et on garde la moitié où $f$ change de signe."
      },
      {
        titre: "Continuité et suites",
        texte: "Si $u_n \\to \\ell$ et si $f$ est continue en $\\ell$, alors $f(u_n) \\to f(\\ell)$. Pour $u_{n+1} = f(u_n)$ convergente avec $f$ continue : $\\ell = f(\\ell)$."
      }
    ],
    pieges: [
      "Appliquer le théorème des valeurs intermédiaires sans vérifier la continuité.",
      "Conclure à une solution **unique** sans monotonie stricte.",
      "Oublier de vérifier que $k$ est bien entre $f(a)$ et $f(b)$.",
      "Croire que continue implique dérivable.",
      "Dans la dichotomie, garder la moitié où $f$ ne change pas de signe.",
      "Écrire $\\ell = f(\\ell)$ sans avoir justifié la convergence ni la continuité."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit du bac (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Trois solutions",
        duree: 30, points: 7, calculatrice: true,
        contexte: "On considère la fonction $f$ définie sur $[-2\\,;2]$ par $f(x) = x^3 - 3x - 1$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Étudie les variations de $f$ et dresse son tableau de variations sur $[-2\\,;2]$.",
            indice: "$f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$.",
            corrige: "$f'(x) = 3(x - 1)(x + 1)$ : positif sur $[-2\\,;-1]$ et sur $[1\\,;2]$, négatif sur $[-1\\,;1]$. Avec $f(-2) = -3$, $f(-1) = 1$, $f(1) = -3$ et $f(2) = 1$ :",
            tableauCorrige: { lignes: [["x", "-2", "", "-1", "", "1", "", "2"], ["f'(x)", "", "+", "0", "-", "0", "+", ""], ["f(x)", "-3", "\\nearrow", "1", "\\searrow", "-3", "\\nearrow", "1"]] }
          },
          {
            n: "2.", points: 2,
            texte: "Démontre que l'équation $f(x) = 0$ a exactement trois solutions dans $[-2\\,;2]$, notées $\\alpha < \\beta < \\gamma$.",
            indice: "Sur chacun des trois intervalles, $f$ est continue et strictement monotone, et $0$ est compris entre les valeurs aux bornes.",
            corrige: "$f$ est un polynôme, donc continue. Sur $[-2\\,;-1]$, elle est strictement croissante de $-3$ à $1$, et $0 \\in [-3\\,;1]$ : d'après le corollaire du théorème des valeurs intermédiaires, l'équation a une unique solution $\\alpha$ dans cet intervalle. De même, sur $[-1\\,;1]$, $f$ est strictement décroissante de $1$ à $-3$ : une unique solution $\\beta$. Sur $[1\\,;2]$, strictement croissante de $-3$ à $1$ : une unique solution $\\gamma$. En tout, trois solutions."
          },
          {
            n: "3.", points: 1.5,
            texte: "Donne un encadrement de $\\gamma$ d'amplitude $0{,}01$.",
            indice: "Tableau de valeurs de $f$ sur $[1\\,;2]$ : un pas de $0{,}1$, puis de $0{,}01$.",
            corrige: "$f(1{,}8) \\approx -0{,}57$ et $f(1{,}9) \\approx 0{,}16$, puis $f(1{,}87) \\approx -0{,}071$ et $f(1{,}88) \\approx 0{,}005$. Comme $f$ est croissante sur $[1\\,;2]$ : $1{,}87 < \\gamma < 1{,}88$."
          },
          {
            n: "4.", points: 1,
            texte: "Déduis-en le signe de $f(x)$ sur $[-2\\,;2]$.",
            indice: "Utilise le tableau de variations et les trois solutions.",
            corrige: "$f(x) < 0$ sur $[-2\\,;\\alpha[$, $f(x) > 0$ sur $]\\alpha\\,;\\beta[$, $f(x) < 0$ sur $]\\beta\\,;\\gamma[$ et $f(x) > 0$ sur $]\\gamma\\,;2]$, avec $f(x) = 0$ en $\\alpha$, $\\beta$ et $\\gamma$."
          },
          {
            n: "5.", points: 1,
            texte:
              "Voici la fonction de dichotomie du cours. Que renvoie $\\texttt{dicho(f, 1, 2, 0.1)}$ ? Détaille les étapes.\n\n" +
              "```python\ndef dicho(f, a, b, e):\n    while b - a > e:\n        m = (a + b) / 2\n        if f(a) * f(m) <= 0:\n            b = m\n        else:\n            a = m\n    return a, b\n```",
            indice: "Premier tour : $m = 1{,}5$ et $f(1{,}5) = -2{,}125$, du même signe que $f(1) = -3$.",
            corrige: "$f(1{,}5) < 0$ : on garde $[1{,}5\\,;2]$. $f(1{,}75) \\approx -0{,}89 < 0$ : $[1{,}75\\,;2]$. $f(1{,}875) \\approx -0{,}033 < 0$ : $[1{,}875\\,;2]$. $f(1{,}9375) \\approx 0{,}46 > 0$ : $[1{,}875\\,;1{,}9375]$, d'amplitude $0{,}0625 \\leqslant 0{,}1$. La fonction renvoie $\\texttt{(1.875, 1.9375)}$, qui encadre bien $\\gamma$."
          }
        ]
      },
      {
        titre: "Une suite et son point fixe",
        duree: 25, points: 7, calculatrice: true,
        contexte: "On considère la fonction $f$ définie sur $\\mathbb{R}$ par $f(x) = \\dfrac{x^2 + 4}{5}$, et la suite $(u_n)$ définie par $u_0 = 2$ et $u_{n+1} = f(u_n)$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule $u_1$ et $u_2$. Résous l'équation $f(x) = x$.",
            indice: "$f(x) = x \\iff x^2 - 5x + 4 = 0$.",
            corrige: "$u_1 = \\dfrac{4 + 4}{5} = 1{,}6$ et $u_2 = \\dfrac{2{,}56 + 4}{5} = 1{,}312$. Puis $f(x) = x \\iff x^2 - 5x + 4 = 0 \\iff (x - 1)(x - 4) = 0$ : les solutions sont $1$ et $4$."
          },
          {
            n: "2.", points: 2,
            texte: "Démontre par récurrence que, pour tout entier naturel $n$, $1 \\leqslant u_{n+1} \\leqslant u_n \\leqslant 2$.",
            indice: "$f$ est croissante sur $[0\\,;+\\infty[$, et $f(1) = 1$.",
            corrige:
              "$f'(x) = \\dfrac{2x}{5} \\geqslant 0$ sur $[0\\,;+\\infty[$ : $f$ y est croissante.\n\n" +
              "**Initialisation** : $1 \\leqslant u_1 = 1{,}6 \\leqslant u_0 = 2 \\leqslant 2$.\n\n" +
              "**Hérédité** : si $1 \\leqslant u_{n+1} \\leqslant u_n \\leqslant 2$, alors, $f$ étant croissante sur $[0\\,;+\\infty[$, $f(1) \\leqslant f(u_{n+1}) \\leqslant f(u_n) \\leqslant f(2)$, soit $1 \\leqslant u_{n+2} \\leqslant u_{n+1} \\leqslant 1{,}6 \\leqslant 2$.\n\n" +
              "**Conclusion** : la propriété est vraie pour tout $n$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Démontre que la suite converge et détermine sa limite.",
            indice: "Théorème de convergence monotone, puis $\\ell = f(\\ell)$ car $f$ est continue.",
            corrige: "La suite est décroissante et minorée par $1$ : elle converge vers un réel $\\ell$, avec $1 \\leqslant \\ell \\leqslant 2$. La fonction $f$ est continue (c'est un polynôme), donc $\\ell = f(\\ell)$ : $\\ell = 1$ ou $\\ell = 4$. Comme $\\ell \\leqslant 2$, $\\ell = 1$."
          },
          {
            n: "4.", points: 1.5,
            texte:
              "Que renvoie ce programme ? Interprète.\n\n" +
              "```python\ndef rang(e):\n    u = 2\n    n = 0\n    while u - 1 > e:\n        u = (u**2 + 4) / 5\n        n = n + 1\n    return n\n\nprint(rang(0.001))\n```",
            indice: "La suite décroît vers $1$ : la boucle s'arrête au premier rang où $u_n - 1 \\leqslant 0{,}001$. Calcule les termes à la calculatrice.",
            corrige: "$u_8 - 1 \\approx 0{,}0017$ et $u_9 - 1 \\approx 0{,}0007$ : le programme affiche $\\texttt{9}$. À partir du rang $9$, $u_n$ est à moins de $0{,}001$ de sa limite."
          },
          {
            n: "5.", points: 1,
            texte: "On garde la même relation, mais avec $u_0 = 5$. Calcule $u_1$ et $u_2$. Que semble-t-il se passer ?",
            indice: "Compare $f(x)$ et $x$ pour $x > 4$ : $f(x) - x = \\dfrac{(x - 1)(x - 4)}{5}$.",
            corrige: "$u_1 = \\dfrac{29}{5} = 5{,}8$ et $u_2 = \\dfrac{5{,}8^2 + 4}{5} = 7{,}528$. Pour $x > 4$, $f(x) - x = \\dfrac{(x - 1)(x - 4)}{5} > 0$ : la suite semble croître et s'éloigner du point fixe $4$, vers $+\\infty$."
          }
        ]
      },
      {
        titre: "Continuité : utiliser et vérifier",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "On définit $g(x) = x^2 + 1$ pour $x \\leqslant 1$, et $g(x) = \\dfrac{ax + 3}{x + 1}$ pour $x > 1$. Pour quelle valeur de $a$ la fonction $g$ est-elle continue en $1$ ?",
            indice: "Il faut que la limite de $g$ en $1^+$ soit égale à $g(1) = 2$.",
            corrige: "$g(1) = 1^2 + 1 = 2$ et, quand $x \\to 1^+$, $\\dfrac{ax + 3}{x + 1} \\to \\dfrac{a + 3}{2}$. La continuité en $1$ demande $\\dfrac{a + 3}{2} = 2$, soit $a = 1$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Un parking coûte $2$ € par heure commencée : on note $P(t)$ le prix pour $t$ heures, avec $t \\in \\,]0\\,;4]$. Calcule $P(0{,}5)$, $P(1)$ et $P(1{,}2)$. L'équation $P(t) = 3$ a-t-elle une solution ? Pourquoi le théorème des valeurs intermédiaires ne s'applique-t-il pas ?",
            indice: "« Par heure commencée » : $1{,}2$ h compte pour $2$ heures.",
            corrige: "$P(0{,}5) = 2$, $P(1) = 2$ et $P(1{,}2) = 4$ €. Le prix ne prend que les valeurs $2$, $4$, $6$ et $8$ : l'équation $P(t) = 3$ n'a pas de solution, alors que $3$ est entre $P(0{,}5)$ et $P(4)$. Le théorème ne s'applique pas, car $P$ n'est pas continue : elle fait un saut en $1$, en $2$ et en $3$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Démontre que l'équation $e^x = 3 - x$ a une unique solution $\\alpha$ dans $[0\\,;1]$, et donnes-en un encadrement d'amplitude $0{,}01$.",
            indice: "Pose $h(x) = e^x + x - 3$ : elle est continue et strictement croissante.",
            corrige: "$h(x) = e^x + x - 3$ est continue et $h'(x) = e^x + 1 > 0$ : $h$ est strictement croissante. Comme $h(0) = -2 < 0$ et $h(1) = e - 2 > 0$, l'équation $h(x) = 0$, c'est-à-dire $e^x = 3 - x$, a une unique solution $\\alpha$ dans $[0\\,;1]$. À la calculatrice, $h(0{,}79) \\approx -0{,}007$ et $h(0{,}80) \\approx 0{,}026$, donc $0{,}79 < \\alpha < 0{,}80$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Vrai ou faux : « si $f$ est continue sur $[a\\,;b]$ et si $f(a)$ et $f(b)$ sont de signes contraires, alors l'équation $f(x) = 0$ a une unique solution dans $[a\\,;b]$ ». Justifie.",
            indice: "Pense à la fonction de l'exercice 1.",
            corrige: "**Faux.** La fonction $f(x) = x^3 - 3x - 1$ de l'exercice 1 est continue sur $[-2\\,;2]$, avec $f(-2) = -3 < 0$ et $f(2) = 1 > 0$, mais l'équation $f(x) = 0$ y a trois solutions. Le théorème garantit **au moins** une solution ; l'unicité demande la stricte monotonie."
          }
        ]
      }
    ]
  }
};
