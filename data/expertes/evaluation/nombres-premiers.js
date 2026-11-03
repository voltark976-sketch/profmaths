/*
  ENTRAÎNEMENT : Terminale maths expertes — chapitre 8, Nombres premiers
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre expertes-nombres-premiers.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths expertes.
  Le cours prend 5 modulo 13 pour Fermat : ici, 4 modulo 17. Les nombres de Mersenne sont un « problème possible » du programme.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["expertes-nombres-premiers"] = {
  revisions: {
    intro: "Les nombres premiers en un coup d'œil : les reconnaître, décomposer un entier, compter ses diviseurs, PGCD et PPCM, petit théorème de Fermat. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Nombre premier",
        texte: "$p$ est premier s'il a exactement deux diviseurs positifs, $1$ et $p$. Ainsi $1$ n'est pas premier, et $2$ est le seul nombre premier pair. Il y a une infinité de nombres premiers (Euclide)."
      },
      {
        titre: "Tester un nombre",
        texte: "Si $n \\geqslant 2$ n'est pas premier, il a un diviseur premier $p$ tel que $p^2 \\leqslant n$ : on teste les nombres premiers jusqu'à $\\sqrt{n}$. Par exemple, $\\sqrt{143} < 12$ et $143 = 11 \\times 13$."
      },
      {
        titre: "Décomposition",
        texte: "Tout entier $n \\geqslant 2$ s'écrit de façon unique (à l'ordre près) comme un produit de nombres premiers : $n = p_1^{a_1} \\times \\dots \\times p_k^{a_k}$. Par exemple, $600 = 2^3 \\times 3 \\times 5^2$."
      },
      {
        titre: "Diviseurs, carrés",
        texte: "$n = p_1^{a_1} \\times \\dots \\times p_k^{a_k}$ a $(a_1 + 1) \\times \\dots \\times (a_k + 1)$ diviseurs positifs, et $n$ est un carré si et seulement si tous les exposants $a_i$ sont pairs."
      },
      {
        titre: "PGCD et PPCM",
        texte: "Avec les décompositions, le PGCD prend chaque facteur premier commun avec le **plus petit** exposant, le PPCM chaque facteur avec le **plus grand**. Et $\\text{PGCD}(a\\,;b) \\times \\text{PPCM}(a\\,;b) = ab$."
      },
      {
        titre: "Petit théorème de Fermat",
        texte: "Si $p$ est premier et ne divise pas $a$, alors $a^{p-1} \\equiv 1\\ [p]$. Pour tout entier $a$, $a^p \\equiv a\\ [p]$. Pour réduire $a^k$ modulo $p$, on divise l'exposant $k$ par $p - 1$."
      }
    ],
    pieges: [
      "Dire que $1$ est premier : il n'a qu'un seul diviseur positif.",
      "Laisser un facteur non premier dans une décomposition, comme $12 = 2 \\times 6$.",
      "Tester les diviseurs jusqu'à $n$ ou $\\dfrac{n}{2}$ : la racine carrée suffit.",
      "Oublier d'ajouter $1$ aux exposants pour compter les diviseurs.",
      "Inverser PGCD (plus petits exposants) et PPCM (plus grands exposants).",
      "Appliquer Fermat avec un module non premier, ou diviser l'exposant par $p$ au lieu de $p - 1$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Reconnaître et décomposer",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions 2 à 4 portent sur les entiers $1\\,512$ et $1\\,400$.",
        questions: [
          {
            n: "1.", points: 2,
            texte: "Les nombres $391$ et $397$ sont-ils premiers ? Justifie.",
            indice: "$19^2 = 361$ et $20^2 = 400$ : il suffit de tester les nombres premiers jusqu'à $19$.",
            corrige: "Comme $19^2 < 391 < 397 < 20^2$, on teste les nombres premiers $2$, $3$, $5$, $7$, $11$, $13$, $17$ et $19$.\n\n$391 = 17 \\times 23$ : $391$ n'est pas premier.\n\n$397$ n'est divisible par aucun d'eux : il est impair, la somme de ses chiffres vaut $19$, il ne finit ni par $0$ ni par $5$, et $397 = 7 \\times 56 + 5 = 11 \\times 36 + 1 = 13 \\times 30 + 7 = 17 \\times 23 + 6 = 19 \\times 20 + 17$. Donc $397$ est premier."
          },
          {
            n: "2.", points: 1.5,
            texte: "Décompose $1\\,512$ en produit de facteurs premiers, puis détermine le nombre de ses diviseurs positifs.",
            indice: "Divise par $2$ tant que c'est possible, puis par $3$, et ainsi de suite.",
            corrige: "$1\\,512 = 2 \\times 756 = 2^2 \\times 378 = 2^3 \\times 189 = 2^3 \\times 3^3 \\times 7$.\n\nNombre de diviseurs : $(3 + 1)(3 + 1)(1 + 1) = 32$."
          },
          {
            n: "3.", points: 2,
            texte: "Détermine le plus petit entier naturel $k$ non nul tel que $1\\,512k$ soit le carré d'un entier.",
            indice: "Un entier est un carré si et seulement si tous les exposants de sa décomposition sont pairs.",
            corrige: "$1\\,512 = 2^3 \\times 3^3 \\times 7$ : pour rendre les trois exposants pairs, il faut au moins un facteur $2$, un facteur $3$ et un facteur $7$ de plus. Le plus petit $k$ est donc $2 \\times 3 \\times 7 = 42$.\n\nEn effet, $1\\,512 \\times 42 = 2^4 \\times 3^4 \\times 7^2 = \\left(2^2 \\times 3^2 \\times 7\\right)^2 = 252^2$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Sachant que $1\\,400 = 2^3 \\times 5^2 \\times 7$, détermine $\\text{PGCD}(1\\,512\\,;1\\,400)$ et $\\text{PPCM}(1\\,512\\,;1\\,400)$.",
            indice: "PGCD : facteurs communs avec le plus petit exposant ; PPCM : tous les facteurs avec le plus grand exposant.",
            corrige: "$\\text{PGCD} = 2^3 \\times 7 = 56$ et $\\text{PPCM} = 2^3 \\times 3^3 \\times 5^2 \\times 7 = 37\\,800$.\n\nVérification : $56 \\times 37\\,800 = 2\\,116\\,800 = 1\\,512 \\times 1\\,400$."
          }
        ]
      },
      {
        titre: "Le petit théorème de Fermat",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Rappel : si $p$ est premier et ne divise pas $a$, alors $a^{p-1} \\equiv 1\\ [p]$ ; et pour tout entier $a$, $a^p \\equiv a\\ [p]$. Les questions 3 et 4 sont indépendantes des deux premières.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Justifie que $4^{16} \\equiv 1\\ [17]$, puis déduis-en le reste de la division de $4^{2026}$ par $17$.",
            indice: "Divise $2026$ par $16$. Pour la fin du calcul, remarque que $4^2 = 16 \\equiv -1\\ [17]$.",
            corrige: "$17$ est premier et ne divise pas $4$ : d'après le petit théorème de Fermat, $4^{16} \\equiv 1\\ [17]$.\n\nComme $2026 = 16 \\times 126 + 10$, $4^{2026} = \\left(4^{16}\\right)^{126} \\times 4^{10} \\equiv 4^{10}\\ [17]$. Or $4^2 = 16 \\equiv -1\\ [17]$, donc $4^{10} = \\left(4^2\\right)^5 \\equiv (-1)^5 = -1 \\equiv 16\\ [17]$ : le reste est $16$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Vérifie que $4^4 \\equiv 1\\ [17]$, et retrouve le résultat de la question 1 plus rapidement.",
            indice: "$4^4 = \\left(4^2\\right)^2$. Divise $2026$ par $4$.",
            corrige: "$4^4 = \\left(4^2\\right)^2 \\equiv (-1)^2 = 1\\ [17]$. Comme $2026 = 4 \\times 506 + 2$, $4^{2026} \\equiv 4^2 = 16\\ [17]$ : le reste est bien $16$.\n\nFermat donne un exposant qui ramène à $1$ ($16$ ici), mais pas toujours le plus petit."
          },
          {
            n: "3.", points: 2.5,
            texte: "Montre que, pour tout entier $n$, $n^7 - n$ est divisible par $42$.",
            indice: "$42 = 2 \\times 3 \\times 7$. Montre que $n^7 \\equiv n$ modulo $7$ (Fermat), modulo $3$ et modulo $2$, puis conclus.",
            corrige: "Modulo $7$ : $7$ est premier, donc $n^7 \\equiv n\\ [7]$ (Fermat).\n\nModulo $3$ : $n^3 \\equiv n\\ [3]$ (Fermat), donc $n^7 = n^3 \\times n^3 \\times n \\equiv n \\times n \\times n = n^3 \\equiv n\\ [3]$.\n\nModulo $2$ : $n^7$ et $n$ ont la même parité, donc $n^7 \\equiv n\\ [2]$.\n\nAinsi $2$, $3$ et $7$ divisent $n^7 - n$. Ce sont des nombres premiers distincts, donc premiers entre eux deux à deux : leur produit $42$ divise $n^7 - n$ (conséquence du théorème de Gauss)."
          },
          {
            n: "4.", points: 1.5,
            texte: "Montre que $2^{40} - 1$ est divisible par $41$ et par $11$.",
            indice: "$41$ et $11$ sont premiers : applique le petit théorème de Fermat à chacun.",
            corrige: "$41$ est premier et ne divise pas $2$ : $2^{40} \\equiv 1\\ [41]$, donc $41$ divise $2^{40} - 1$.\n\n$11$ est premier et ne divise pas $2$ : $2^{10} \\equiv 1\\ [11]$, donc $2^{40} = \\left(2^{10}\\right)^4 \\equiv 1\\ [11]$ et $11$ divise aussi $2^{40} - 1$."
          }
        ]
      },
      {
        titre: "Les nombres de Mersenne",
        duree: 20, points: 6, calculatrice: false,
        contexte: "Pour tout entier $n \\geqslant 2$, on note $M_n = 2^n - 1$ le $n$-ième nombre de Mersenne.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $M_2$, $M_3$, $M_4$, $M_5$, $M_6$ et $M_7$. Lesquels sont premiers ?",
            indice: "Pour $M_7 = 127$, il suffit de tester les nombres premiers jusqu'à $11$.",
            corrige: "$M_2 = 3$, $M_3 = 7$, $M_4 = 15$, $M_5 = 31$, $M_6 = 63$ et $M_7 = 127$.\n\n$3$, $7$ et $31$ sont premiers ; $15 = 3 \\times 5$ et $63 = 7 \\times 9$ ne le sont pas. $127$ n'est divisible ni par $2$, ni par $3$, ni par $5$, ni par $7$, ni par $11$ (et $11^2 < 127 < 12^2$) : il est premier. Pour l'instant, $M_n$ est premier quand $n$ est premier."
          },
          {
            n: "2.", points: 2,
            texte: "On suppose que $n = ab$, avec $a \\geqslant 2$ et $b \\geqslant 2$ entiers. Montre que $2^a - 1$ divise $M_n$, puis que $M_n$ n'est pas premier.",
            indice: "Modulo $2^a - 1$, on a $2^a \\equiv 1$. Élève à la puissance $b$.",
            corrige: "Modulo $2^a - 1$ : $2^a \\equiv 1$, donc $2^n = \\left(2^a\\right)^b \\equiv 1^b = 1$, c'est-à-dire que $2^a - 1$ divise $2^n - 1 = M_n$.\n\nDe plus, $1 < 2^a - 1 < 2^n - 1$, car $2 \\leqslant a < n$. $M_n$ a donc un diviseur autre que $1$ et lui-même : il n'est pas premier."
          },
          {
            n: "3.", points: 1,
            texte: "Déduis-en que si $M_n$ est premier, alors $n$ est premier.",
            indice: "Raisonne par contraposée.",
            corrige: "Par contraposée : si $n$ n'est pas premier, il s'écrit $n = ab$ avec $a \\geqslant 2$ et $b \\geqslant 2$, et $M_n$ n'est pas premier d'après la question 2. Donc si $M_n$ est premier, $n$ est premier."
          },
          {
            n: "4.", points: 1.5,
            texte: "Vérifie que $M_{11} = 2\\,047 = 23 \\times 89$. La réciproque de la propriété de la question 3 est-elle vraie ?",
            indice: "La réciproque serait : « si $n$ est premier, alors $M_n$ est premier ».",
            corrige: "$2^{11} = 2\\,048$, donc $M_{11} = 2\\,047$, et $23 \\times 89 = 2\\,047$.\n\n$11$ est premier mais $M_{11}$ ne l'est pas : la réciproque est fausse. Un seul contre-exemple suffit."
          }
        ]
      }
    ]
  }
};
