/*
  ENTRAÎNEMENT : Terminale maths expertes — chapitre 6, Divisibilité et congruences
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre expertes-divisibilite-congruences.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths expertes.
  Le PGCD, Bézout et Gauss sont au chapitre 7 : ici, l'inverse de 7 modulo 26 est donné, on le vérifie seulement.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["expertes-divisibilite-congruences"] = {
  revisions: {
    intro: "L'arithmétique des restes en un coup d'œil : divisibilité, division euclidienne, congruences et leurs règles de calcul, tableaux de congruences, critères de divisibilité et chiffrement affine. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Divisibilité",
        texte: "$a \\mid b$ s'il existe un entier $k$ tel que $b = ka$. Si $a$ divise $b$ et $c$, alors $a$ divise toute combinaison $ub + vc$, avec $u$ et $v$ entiers : c'est l'outil pour éliminer $n$."
      },
      {
        titre: "Division euclidienne",
        texte: "Pour $a$ entier et $b \\geqslant 1$, il existe un unique couple $(q\\,;r)$ tel que $a = bq + r$ avec $0 \\leqslant r < b$. Par exemple, $-30 = 7 \\times (-5) + 5$ : le reste est $5$."
      },
      {
        titre: "Congruences",
        texte: "$a \\equiv b\\ [n]$ signifie que $n$ divise $a - b$, c'est-à-dire que $a$ et $b$ ont le même reste dans la division par $n$. Si $a \\equiv b$ et $c \\equiv d\\ [n]$, alors $a + c \\equiv b + d$, $ac \\equiv bd$ et $a^k \\equiv b^k\\ [n]$."
      },
      {
        titre: "Tableau de congruences",
        texte: "Tout entier est congru modulo $n$ à l'un des restes $0$, $1$, …, $n - 1$ : pour étudier une expression en $n$, on calcule son reste pour chacun de ces cas."
      },
      {
        titre: "Critères de divisibilité",
        texte:
          "Pour un entier écrit avec ses chiffres :\n" +
          "- modulo $9$ (et $3$), $10 \\equiv 1$ : on additionne les chiffres ;\n" +
          "- modulo $11$, $10 \\equiv -1$ : on alterne les signes en partant du chiffre des unités."
      },
      {
        titre: "Chiffrement affine",
        texte: "Les lettres sont numérotées de A $= 0$ à Z $= 25$, et la lettre de rang $x$ est codée par la lettre de rang $y$, reste de $ax + b$ modulo $26$. Pour décoder, on cherche $a'$ tel que $aa' \\equiv 1\\ [26]$."
      }
    ],
    pieges: [
      "Donner un reste négatif : le reste d'une division euclidienne par $b$ est toujours entre $0$ et $b - 1$.",
      "Écrire « $a \\equiv b\\ [n]$ donc $a - b = n$ » : $a - b$ est seulement un multiple de $n$.",
      "Simplifier une congruence par un facteur commun : $2a \\equiv 2b\\ [8]$ n'entraîne pas $a \\equiv b\\ [8]$.",
      "Réduire l'exposant modulo $n$ : on cherche le cycle des puissances, par exemple $2^3 \\equiv 1\\ [7]$.",
      "Croire qu'un produit nul modulo $n$ impose un facteur nul : $2 \\times 3 \\equiv 0\\ [6]$.",
      "Commencer à $1$ pour A dans un chiffrement : par convention, A a le rang $0$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Divisibilité et division euclidienne",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Détermine les entiers relatifs $n$ tels que $n - 2$ divise $3n + 4$.",
            indice: "Écris $3n + 4 = 3(n - 2) + 10$ : si $n - 2$ divise $3n + 4$, il divise aussi $10$.",
            corrige: "$3n + 4 = 3(n - 2) + 10$. Si $n - 2$ divise $3n + 4$, il divise $3n + 4 - 3(n - 2) = 10$ ; réciproquement, s'il divise $10$, il divise $3(n - 2) + 10$.\n\nLes diviseurs de $10$ sont $\\pm 1$, $\\pm 2$, $\\pm 5$ et $\\pm 10$, donc $n - 2$ vaut l'un d'eux : $n \\in \\{-8\\,;-3\\,;0\\,;1\\,;3\\,;4\\,;7\\,;12\\}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Dans la division euclidienne de l'entier naturel $a$ par l'entier naturel $b$, le quotient est $7$ et le reste $12$. Sachant que $a - b = 102$, détermine $a$ et $b$.",
            indice: "Traduis l'énoncé : $a = 7b + 12$, avec $12 < b$.",
            corrige: "$a = 7b + 12$ avec $12 < b$. Alors $a - b = 6b + 12 = 102$, donc $b = 15$ et $a = 7 \\times 15 + 12 = 117$.\n\nOn vérifie que $12 < 15$ : la division de $117$ par $15$ a bien pour quotient $7$ et pour reste $12$."
          },
          {
            n: "3.", points: 2,
            texte: "À l'aide d'un tableau de congruences modulo $7$, détermine les entiers $n$ tels que $n^2 + n + 1$ soit divisible par $7$.",
            indice: "Pour chaque reste $r$ de $n$ modulo $7$, de $0$ à $6$, calcule le reste de $r^2 + r + 1$.",
            corrige: "Si $n \\equiv r\\ [7]$, alors $n^2 + n + 1 \\equiv r^2 + r + 1\\ [7]$. Les restes modulo $7$ sont :",
            tableauCorrige: { lignes: [["r", "0", "1", "2", "3", "4", "5", "6"], ["r^2 + r + 1", "1", "3", "0", "6", "0", "3", "1"]] },
            corrigeFin: "$n^2 + n + 1$ est divisible par $7$ si et seulement si $n \\equiv 2\\ [7]$ ou $n \\equiv 4\\ [7]$."
          },
          {
            n: "4.", points: 2,
            texte: "On note $N$ le nombre à cinq chiffres $\\overline{52x14}$, où $x$ est un chiffre. Détermine $x$ pour que $N$ soit divisible par $9$, puis pour qu'il soit divisible par $11$.",
            indice: "Modulo $9$, $N$ est congru à la somme de ses chiffres. Modulo $11$, $10 \\equiv -1$ : $N \\equiv 4 - 1 + x - 2 + 5\\ [11]$.",
            corrige: "Somme des chiffres : $5 + 2 + x + 1 + 4 = 12 + x$, comprise entre $12$ et $21$. Elle est divisible par $9$ seulement pour $x = 6$ : $N = 52\\,614 = 9 \\times 5\\,846$.\n\nModulo $11$ : $N \\equiv 4 - 1 + x - 2 + 5 = 6 + x\\ [11]$, nul seulement pour $x = 5$ : $N = 52\\,514 = 11 \\times 4\\,774$."
          }
        ]
      },
      {
        titre: "Les puissances de 2 modulo 7",
        duree: 25, points: 7, calculatrice: false,
        contexte: "On étudie les restes des puissances de $2$ dans la division euclidienne par $7$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Vérifie que $2^3 \\equiv 1\\ [7]$. Déduis-en, pour tout entier naturel $k$, les restes de $2^{3k}$, $2^{3k+1}$ et $2^{3k+2}$ dans la division par $7$.",
            indice: "$2^{3k} = \\left(2^3\\right)^k$.",
            corrige: "$2^3 = 8 = 7 + 1$, donc $2^3 \\equiv 1\\ [7]$. Alors $2^{3k} = \\left(2^3\\right)^k \\equiv 1^k = 1\\ [7]$, puis $2^{3k+1} = 2^{3k} \\times 2 \\equiv 2\\ [7]$ et $2^{3k+2} \\equiv 4\\ [7]$ : les restes sont $1$, $2$ et $4$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Détermine le reste de la division de $2^{2026}$ par $7$.",
            indice: "Divise $2026$ par $3$.",
            corrige: "$2026 = 3 \\times 675 + 1$, donc $2^{2026} = 2^{3 \\times 675 + 1} \\equiv 2\\ [7]$ : le reste est $2$."
          },
          {
            n: "3.", points: 2,
            texte: "Détermine les entiers naturels $n$ tels que $2^n + 3$ soit divisible par $7$.",
            indice: "$2^n + 3 \\equiv 0\\ [7] \\iff 2^n \\equiv 4\\ [7]$ : utilise la question 1.",
            corrige: "$2^n + 3 \\equiv 0\\ [7] \\iff 2^n \\equiv -3\\ [7] \\iff 2^n \\equiv 4\\ [7]$. D'après la question 1, cela arrive exactement quand $n$ s'écrit $3k + 2$ : ce sont les entiers $n \\equiv 2\\ [3]$, c'est-à-dire $2$, $5$, $8$, $11$…\n\nPar exemple, $2^5 + 3 = 35 = 7 \\times 5$."
          },
          {
            n: "4.", points: 1,
            texte: "Montre que, pour tout entier naturel $n$, $9^n - 2^n$ est divisible par $7$.",
            indice: "Quel est le reste de $9$ modulo $7$ ?",
            corrige: "$9 \\equiv 2\\ [7]$, donc $9^n \\equiv 2^n\\ [7]$ et $9^n - 2^n \\equiv 0\\ [7]$."
          },
          {
            n: "5.", points: 1,
            texte: "Quel est le reste de la division de $100^{2026}$ par $7$ ?",
            indice: "Commence par le reste de $100$ modulo $7$.",
            corrige: "$100 = 7 \\times 14 + 2$, donc $100 \\equiv 2\\ [7]$ et $100^{2026} \\equiv 2^{2026} \\equiv 2\\ [7]$ d'après la question 2 : le reste est $2$."
          }
        ]
      },
      {
        titre: "Un chiffrement affine",
        duree: 20, points: 6, calculatrice: false,
        contexte: "On numérote les lettres de l'alphabet de $0$ à $25$ : A $= 0$, B $= 1$, …, M $= 12$, …, Z $= 25$. La lettre de rang $x$ est codée par la lettre de rang $y$, où $y$ est le reste de la division de $7x + 3$ par $26$.",
        questions: [
          {
            n: "1.", points: 2,
            texte: "Code le mot MAYOTTE.",
            indice: "Calcule $7x + 3$ pour chaque lettre, puis son reste modulo $26$. Par exemple, M a le rang $12$.",
            corrige:
              "- M : $7 \\times 12 + 3 = 87 = 3 \\times 26 + 9$, lettre J ;\n" +
              "- A : $3$, lettre D ;\n" +
              "- Y : $7 \\times 24 + 3 = 171 = 6 \\times 26 + 15$, lettre P ;\n" +
              "- O : $7 \\times 14 + 3 = 101 = 3 \\times 26 + 23$, lettre X ;\n" +
              "- T : $7 \\times 19 + 3 = 136 = 5 \\times 26 + 6$, lettre G ;\n" +
              "- E : $7 \\times 4 + 3 = 31 = 26 + 5$, lettre F.\n\n" +
              "MAYOTTE est codé JDPXGGF."
          },
          {
            n: "2.", points: 1,
            texte: "Vérifie que $7 \\times 15 \\equiv 1\\ [26]$.",
            indice: "Divise $105$ par $26$.",
            corrige: "$7 \\times 15 = 105 = 4 \\times 26 + 1$, donc $7 \\times 15 \\equiv 1\\ [26]$."
          },
          {
            n: "3.", points: 2,
            texte: "Démontre que, pour tous entiers $x$ et $y$ : $y \\equiv 7x + 3\\ [26] \\iff x \\equiv 15y + 7\\ [26]$.",
            indice: "Dans le sens direct, multiplie par $15$ ; dans l'autre, multiplie par $7$. Remarque que $-45 \\equiv 7\\ [26]$.",
            corrige: "Si $y \\equiv 7x + 3\\ [26]$, alors $15y \\equiv 105x + 45 \\equiv x + 45\\ [26]$, donc $x \\equiv 15y - 45 \\equiv 15y + 7\\ [26]$, car $-45 + 52 = 7$.\n\nRéciproquement, si $x \\equiv 15y + 7\\ [26]$, alors $7x \\equiv 105y + 49 \\equiv y + 23\\ [26]$, donc $y \\equiv 7x - 23 \\equiv 7x + 3\\ [26]$.\n\nAinsi chaque lettre codée provient d'une seule lettre : on peut décoder."
          },
          {
            n: "4.", points: 1,
            texte: "Décode le mot KDR.",
            indice: "Utilise $x \\equiv 15y + 7\\ [26]$, avec K $= 10$, D $= 3$ et R $= 17$.",
            corrige: "K ($y = 10$) : $15 \\times 10 + 7 = 157 = 6 \\times 26 + 1$, lettre B. D ($y = 3$) : $52 = 2 \\times 26$, lettre A. R ($y = 17$) : $262 = 10 \\times 26 + 2$, lettre C. Le mot est BAC."
          }
        ]
      }
    ]
  }
};
