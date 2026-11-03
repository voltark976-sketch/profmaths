/*
  ENTRAÎNEMENT : Terminale maths expertes — chapitre 7, PGCD, théorèmes de Bézout et de Gauss
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre expertes-pgcd-bezout-gauss.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths expertes.
  Les nombres premiers et la décomposition en facteurs premiers sont au chapitre 8.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["expertes-pgcd-bezout-gauss"] = {
  revisions: {
    intro: "Le PGCD et ses théorèmes en un coup d'œil : algorithme d'Euclide, entiers premiers entre eux, Bézout, inverse modulo $n$, Gauss et équations $ax + by = c$. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Algorithme d'Euclide",
        texte: "Si $a = bq + r$, alors $\\text{PGCD}(a\\,;b) = \\text{PGCD}(b\\,;r)$. On enchaîne les divisions : le PGCD est le dernier reste non nul. Par exemple, $91 = 2 \\times 35 + 21$, $35 = 21 + 14$, $21 = 14 + 7$ et $14 = 2 \\times 7$ : $\\text{PGCD}(91\\,;35) = 7$."
      },
      {
        titre: "Premiers entre eux",
        texte: "$a$ et $b$ sont premiers entre eux si $\\text{PGCD}(a\\,;b) = 1$. Deux entiers consécutifs le sont toujours, mais ce ne sont pas forcément des nombres premiers : $8$ et $9$ sont premiers entre eux."
      },
      {
        titre: "Théorème de Bézout",
        texte: "Il existe des entiers $u$ et $v$ tels que $au + bv = \\text{PGCD}(a\\,;b)$. Et $a$ et $b$ sont premiers entre eux si et seulement si il existe $u$ et $v$ tels que $au + bv = 1$. On trouve $u$ et $v$ en remontant l'algorithme d'Euclide."
      },
      {
        titre: "Inverse modulo $n$",
        texte: "Si $au + nv = 1$, alors $au \\equiv 1\\ [n]$ : $u$ est un inverse de $a$ modulo $n$. Pour résoudre $ax \\equiv b\\ [n]$, on multiplie par $u$ : $x \\equiv ub\\ [n]$."
      },
      {
        titre: "Théorème de Gauss",
        texte: "Si $a$ divise $bc$ et si $a$ est premier avec $b$, alors $a$ divise $c$. Conséquence : si $a$ et $b$, premiers entre eux, divisent $N$, alors $ab$ divise $N$."
      },
      {
        titre: "Équations $ax + by = c$",
        texte: "Il y a des solutions entières si et seulement si $\\text{PGCD}(a\\,;b)$ divise $c$. Avec $a$ et $b$ premiers entre eux et une solution $(x_0\\,;y_0)$, Gauss donne toutes les solutions : $x = x_0 + bk$ et $y = y_0 - ak$, avec $k \\in \\mathbb{Z}$."
      }
    ],
    pieges: [
      "Confondre PGCD et PPCM : $\\text{PGCD}(12\\,;18) = 6$, mais $\\text{PPCM}(12\\,;18) = 36$.",
      "Arrêter l'algorithme d'Euclide trop tôt : le PGCD est le dernier reste non nul.",
      "Croire que « premiers entre eux » veut dire « nombres premiers ».",
      "Appliquer le théorème de Gauss sans vérifier que les nombres sont premiers entre eux.",
      "Dire « $2$ et $6$ divisent $n$, donc $12$ divise $n$ » : il faut des diviseurs premiers entre eux.",
      "Oublier la réciproque, ou se tromper de signe, dans les solutions de $ax + by = c$ : $x = x_0 + bk$ et $y = y_0 - ak$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "PGCD et identité de Bézout",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions 1 à 3 portent sur les entiers $1\\,078$ et $322$. La question 4 est indépendante.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Détermine $\\text{PGCD}(1\\,078\\,;322)$ avec l'algorithme d'Euclide.",
            indice: "Divise $1\\,078$ par $322$, puis $322$ par le reste, et ainsi de suite jusqu'à un reste nul.",
            corrige:
              "- $1\\,078 = 3 \\times 322 + 112$ ;\n" +
              "- $322 = 2 \\times 112 + 98$ ;\n" +
              "- $112 = 1 \\times 98 + 14$ ;\n" +
              "- $98 = 7 \\times 14 + 0$.\n\n" +
              "Le dernier reste non nul est $14$ : $\\text{PGCD}(1\\,078\\,;322) = 14$."
          },
          {
            n: "2.", points: 2,
            texte: "Déduis-en deux entiers $u$ et $v$ tels que $1\\,078u + 322v = 14$.",
            indice: "Remonte l'algorithme : $14 = 112 - 98$, puis remplace $98$ par $322 - 2 \\times 112$, et ainsi de suite.",
            corrige: "$14 = 112 - 98 = 112 - (322 - 2 \\times 112) = 3 \\times 112 - 322$.\n\nPuis $112 = 1\\,078 - 3 \\times 322$, donc $14 = 3 \\times 1\\,078 - 9 \\times 322 - 322 = 3 \\times 1\\,078 - 10 \\times 322$.\n\nAinsi $u = 3$ et $v = -10$ conviennent : $3\\,234 - 3\\,220 = 14$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Les équations $1\\,078x + 322y = 70$ et $1\\,078x + 322y = 100$ ont-elles des solutions entières ? Si oui, donnes-en une.",
            indice: "Une équation $ax + by = c$ a des solutions entières si et seulement si $\\text{PGCD}(a\\,;b)$ divise $c$.",
            corrige: "$70 = 5 \\times 14$ : la première équation a des solutions, par exemple $(5u\\,;5v) = (15\\,;-50)$, car $5 \\times (3 \\times 1\\,078 - 10 \\times 322) = 70$.\n\n$14$ ne divise pas $100$ : la seconde équation n'a pas de solution entière, car le membre de gauche est toujours un multiple de $14$."
          },
          {
            n: "4.", points: 2,
            texte: "Soit $n$ un entier naturel et $d = \\text{PGCD}(n + 2\\,;3n + 1)$. Montre que $d$ divise $5$, puis détermine les entiers $n$ pour lesquels $d = 5$.",
            indice: "$d$ divise toute combinaison de $n + 2$ et de $3n + 1$, par exemple $3(n + 2) - (3n + 1)$.",
            corrige: "$d$ divise $3(n + 2) - (3n + 1) = 5$, donc $d = 1$ ou $d = 5$.\n\nSi $d = 5$, alors $5$ divise $n + 2$, soit $n \\equiv 3\\ [5]$. Réciproquement, si $n \\equiv 3\\ [5]$, alors $n + 2 \\equiv 0\\ [5]$ et $3n + 1 \\equiv 10 \\equiv 0\\ [5]$ : $5$ divise les deux nombres, donc $d = 5$.\n\nConclusion : $d = 5$ si et seulement si $n \\equiv 3\\ [5]$, et $d = 1$ sinon."
          }
        ]
      },
      {
        titre: "Une sortie sur le lagon",
        duree: 25, points: 7, calculatrice: false,
        contexte: "On considère l'équation $(E)$ : $11x + 7y = 1$, d'inconnues les entiers relatifs $x$ et $y$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Justifie que $(E)$ a des solutions, et vérifie que le couple $(2\\,;-3)$ en est une.",
            indice: "$11$ et $7$ sont-ils premiers entre eux ?",
            corrige: "$11$ et $7$ sont premiers entre eux (ce sont deux nombres premiers distincts) : d'après le théorème de Bézout, $(E)$ a des solutions. Et $11 \\times 2 + 7 \\times (-3) = 22 - 21 = 1$."
          },
          {
            n: "2.", points: 2,
            texte: "Résous $(E)$ dans $\\mathbb{Z}^2$.",
            indice: "Soustrais l'égalité $11 \\times 2 + 7 \\times (-3) = 1$ à $11x + 7y = 1$, puis applique le théorème de Gauss.",
            corrige: "Si $11x + 7y = 1$, alors $11x + 7y = 11 \\times 2 + 7 \\times (-3)$, donc $11(x - 2) = 7(-3 - y)$.\n\n$7$ divise $11(x - 2)$ et $7$ est premier avec $11$ : d'après le théorème de Gauss, $7$ divise $x - 2$. Il existe donc un entier $k$ tel que $x = 2 + 7k$, et alors $11 \\times 7k = 7(-3 - y)$, soit $y = -3 - 11k$.\n\nRéciproquement, $11(2 + 7k) + 7(-3 - 11k) = 22 - 21 = 1$. Les solutions sont les couples $(2 + 7k\\,;-3 - 11k)$, avec $k \\in \\mathbb{Z}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Vérifie que $(1\\,;27)$ est solution de l'équation $11x + 7y = 200$, puis résous cette équation dans $\\mathbb{Z}^2$.",
            indice: "Même méthode qu'à la question 2, avec la solution $(1\\,;27)$.",
            corrige: "$11 + 7 \\times 27 = 11 + 189 = 200$. Comme à la question 2 : $11(x - 1) = 7(27 - y)$, donc $7$ divise $x - 1$ (Gauss), $x = 1 + 7k$ et $y = 27 - 11k$.\n\nRéciproquement, $11(1 + 7k) + 7(27 - 11k) = 11 + 189 = 200$. Les solutions sont les couples $(1 + 7k\\,;27 - 11k)$, avec $k \\in \\mathbb{Z}$."
          },
          {
            n: "4.", points: 2.5,
            texte: "Pour une sortie d'observation du lagon, un lycée réserve des bateaux de $11$ places et des bateaux de $7$ places pour transporter $200$ personnes, tous les bateaux étant remplis. Quelles sont les réservations possibles ? Laquelle demande le moins de bateaux ?",
            indice: "Avec $x$ bateaux de $11$ places et $y$ bateaux de $7$ places, il faut $x \\geqslant 0$ et $y \\geqslant 0$ dans les solutions de la question 3.",
            corrige:
              "On cherche les solutions de $11x + 7y = 200$ avec $x \\geqslant 0$ et $y \\geqslant 0$. Comme $k$ est entier, $x = 1 + 7k \\geqslant 0 \\iff k \\geqslant 0$, et $y = 27 - 11k \\geqslant 0 \\iff k \\leqslant 2$. Donc $k$ vaut $0$, $1$ ou $2$ :\n" +
              "- $k = 0$ : $1$ bateau de $11$ places et $27$ de $7$ places, soit $28$ bateaux ;\n" +
              "- $k = 1$ : $8$ bateaux de $11$ places et $16$ de $7$ places, soit $24$ bateaux ;\n" +
              "- $k = 2$ : $15$ bateaux de $11$ places et $5$ de $7$ places, soit $20$ bateaux.\n\n" +
              "La réservation qui demande le moins de bateaux est la dernière : $15$ bateaux de $11$ places et $5$ bateaux de $7$ places."
          }
        ]
      },
      {
        titre: "Inverse modulo 23 et théorème de Gauss",
        duree: 20, points: 6, calculatrice: false,
        contexte: "Les questions 1 et 2 sont liées ; les questions 3 et 4 sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Avec l'algorithme d'Euclide, montre que $5$ et $23$ sont premiers entre eux, puis trouve deux entiers $u$ et $v$ tels que $5u + 23v = 1$.",
            indice: "$23 = 4 \\times 5 + 3$ : continue, puis remonte les calculs.",
            corrige: "$23 = 4 \\times 5 + 3$, $5 = 1 \\times 3 + 2$, $3 = 1 \\times 2 + 1$ et $2 = 2 \\times 1 + 0$ : le PGCD vaut $1$.\n\nEn remontant : $1 = 3 - 2 = 3 - (5 - 3) = 2 \\times 3 - 5 = 2(23 - 4 \\times 5) - 5 = 2 \\times 23 - 9 \\times 5$. Donc $u = -9$ et $v = 2$ conviennent."
          },
          {
            n: "2.", points: 1.5,
            texte: "Déduis-en un inverse de $5$ modulo $23$, puis résous la congruence $5x \\equiv 7\\ [23]$.",
            indice: "$5 \\times (-9) \\equiv 1\\ [23]$, et $-9 \\equiv 14\\ [23]$ : multiplie les deux membres de la congruence par $14$.",
            corrige: "$5 \\times (-9) = 1 - 2 \\times 23$, donc $5 \\times (-9) \\equiv 1\\ [23]$ : $-9$, ou encore $14$, est un inverse de $5$ modulo $23$.\n\nSi $5x \\equiv 7\\ [23]$, alors $14 \\times 5x \\equiv 14 \\times 7\\ [23]$, soit $x \\equiv 98 \\equiv 6\\ [23]$. Réciproquement, $5 \\times 6 = 30 \\equiv 7\\ [23]$. Les solutions sont les entiers $x \\equiv 6\\ [23]$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Montre que, pour tout entier naturel $n$, $N = n(n + 1)(2n + 1)$ est divisible par $6$.",
            indice: "Montre que $N$ est divisible par $2$, puis par $3$ avec un tableau de congruences modulo $3$, et utilise que $2$ et $3$ sont premiers entre eux.",
            corrige: "$n(n + 1)$ est le produit de deux entiers consécutifs, donc il est pair : $2$ divise $N$.\n\nModulo $3$ : si $n \\equiv 0$, $3$ divise $n$ ; si $n \\equiv 1$, $2n + 1 \\equiv 3 \\equiv 0$ ; si $n \\equiv 2$, $n + 1 \\equiv 3 \\equiv 0$. Dans tous les cas, $3$ divise $N$.\n\nAinsi $N = 2k$, et $3$ divise $2k$ avec $3$ premier avec $2$ : d'après le théorème de Gauss, $3$ divise $k$, donc $6$ divise $N$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Un entier est divisible par $4$ et par $15$ : est-il forcément divisible par $60$ ? Même question pour un entier divisible par $6$ et par $10$.",
            indice: "Pense au théorème de Gauss, et cherche un contre-exemple dans le second cas.",
            corrige: "Si $N$ est divisible par $4$ et par $15$ : $N = 4k$ et $15$ divise $4k$. Comme $15$ et $4$ sont premiers entre eux, $15$ divise $k$ (Gauss), donc $N = 4 \\times 15k' = 60k'$ : oui, $N$ est divisible par $60$.\n\nDans le second cas, non : $30$ est divisible par $6$ et par $10$, mais pas par $60$. Ici, $6$ et $10$ ne sont pas premiers entre eux."
          }
        ]
      }
    ]
  }
};
