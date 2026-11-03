/*
  ENTRAÎNEMENT : 4e — chapitre 1, Divisibilité et nombres premiers
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre quatrieme-divisibilite.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle de 4e, sans calculatrice.
  Nombres différents de ceux du cours, de la méthode et du QCM du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["quatrieme-divisibilite"] = {
  revisions: {
    intro: "La divisibilité en un coup d'œil : multiples et diviseurs, critères, nombres premiers, décomposition et fractions irréductibles. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Multiples et diviseurs",
        texte: "$a$ est un multiple de $b$ (on dit aussi que $b$ divise $a$) quand la division de $a$ par $b$ tombe juste : $42 = 6 \\times 7$, donc $6$ et $7$ sont des diviseurs de $42$."
      },
      {
        titre: "Critères de divisibilité",
        texte:
          "- par $2$ : le chiffre des unités est pair ;\n" +
          "- par $5$ : il vaut $0$ ou $5$ ; par $10$ : il vaut $0$ ;\n" +
          "- par $3$ : la somme des chiffres est divisible par $3$ ;\n" +
          "- par $9$ : la somme des chiffres est divisible par $9$."
      },
      {
        titre: "Nombres premiers",
        texte: "Un nombre premier a exactement deux diviseurs : $1$ et lui-même. Les premiers sont $2$, $3$, $5$, $7$, $11$, $13$, $17$, $19$, $23$… Le nombre $1$ n'est pas premier."
      },
      {
        titre: "Tester si un nombre est premier",
        texte: "On essaie de diviser par $2$, $3$, $5$, $7$, $11$… tant que le carré du diviseur ne dépasse pas le nombre. Pour $127$ : aucun de ces nombres jusqu'à $11$ ne le divise, et $13^2 = 169 > 127$, donc $127$ est premier."
      },
      {
        titre: "Décomposer en facteurs premiers",
        texte: "On divise par les nombres premiers, dans l'ordre, autant de fois que possible : $150 = 2 \\times 75 = 2 \\times 3 \\times 25 = 2 \\times 3 \\times 5^2$."
      },
      {
        titre: "Fractions irréductibles",
        texte: "On décompose le numérateur et le dénominateur, puis on simplifie par tous les facteurs communs :\n\n$\\dfrac{45}{75} = \\dfrac{3^2 \\times 5}{3 \\times 5^2} = \\dfrac{3}{5}$"
      }
    ],
    pieges: [
      "Croire que $1$ est un nombre premier.",
      "Croire qu'un nombre impair est forcément premier : $87 = 3 \\times 29$.",
      "Oublier un facteur dans une décomposition : vérifie en recalculant le produit.",
      "Confondre « $a$ divise $b$ » et « $a$ est un multiple de $b$ ».",
      "S'arrêter trop tôt en simplifiant : une fraction irréductible n'a plus aucun facteur commun."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $50$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question. Les fractions sont à donner sous forme irréductible.",
    exercices: [
      {
        titre: "Vrai ou faux ?",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Pour chaque affirmation, dis si elle est vraie ou fausse, et justifie.",
        questions: [
          { n: "1.", points: 1.5, texte: "« $3\\,762$ est divisible par $9$. »", corrige: "Vrai : la somme des chiffres vaut $3 + 7 + 6 + 2 = 18$, qui est divisible par $9$. D'ailleurs $3\\,762 = 9 \\times 418$." },
          { n: "2.", points: 1.5, texte: "« $143$ est un nombre premier. »", indice: "Essaie les divisions par $7$, $11$, $13$…", corrige: "Faux : $143 = 11 \\times 13$, donc $143$ a d'autres diviseurs que $1$ et lui-même." },
          { n: "3.", points: 2, texte: "« La somme de deux nombres premiers est toujours un nombre pair. »", indice: "Pense au seul nombre premier pair.", corrige: "Faux : un seul contre-exemple suffit. $2$ et $3$ sont premiers, et $2 + 3 = 5$ est impair." },
          { n: "4.", points: 2, texte: "« $2 \\times 3^2 \\times 11$ est un multiple de $6$. »", corrige: "Vrai : $2 \\times 3^2 \\times 11 = (2 \\times 3) \\times 3 \\times 11 = 6 \\times 33$. C'est $198$, qui vaut $6 \\times 33$." }
        ]
      },
      {
        titre: "Décomposer pour simplifier",
        duree: 20, points: 7, calculatrice: false,
        contexte: "On s'intéresse aux nombres $264$ et $360$.",
        questions: [
          { n: "1.", points: 2, texte: "Décompose $264$ et $360$ en produits de facteurs premiers.", corrige: "$264 = 2 \\times 132 = 2^2 \\times 66 = 2^3 \\times 33 = 2^3 \\times 3 \\times 11$.\n\n$360 = 2 \\times 180 = 2^2 \\times 90 = 2^3 \\times 45 = 2^3 \\times 3^2 \\times 5$." },
          { n: "2.", points: 2, texte: "Écris $\\dfrac{264}{360}$ sous forme irréductible.", indice: "Simplifie par les facteurs communs aux deux décompositions.", corrige: "Les facteurs communs sont $2^3$ et $3$ :\n\n$\\dfrac{264}{360} = \\dfrac{2^3 \\times 3 \\times 11}{2^3 \\times 3 \\times 3 \\times 5} = \\dfrac{11}{15}$" },
          { n: "3.", points: 1.5, texte: "Par quel plus petit nombre entier faut-il multiplier $360$ pour obtenir le carré d'un nombre entier ?", indice: "Dans un carré, chaque facteur premier apparaît un nombre pair de fois.", corrige: "$360 = 2^3 \\times 3^2 \\times 5$ : il manque un facteur $2$ et un facteur $5$. On multiplie par $2 \\times 5 = 10$ : $3\\,600 = 2^4 \\times 3^2 \\times 5^2 = 60^2$." },
          { n: "4.", points: 1.5, texte: "Donne tous les diviseurs premiers de $360$.", corrige: "Ce sont les nombres premiers de sa décomposition : $2$, $3$ et $5$." }
        ]
      },
      {
        titre: "Le code du cadenas",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Le code d'un cadenas est un nombre de trois chiffres. Son chiffre des centaines est $7$ ; il est divisible par $5$ et par $9$, et il est impair.",
        questions: [
          { n: "1.", points: 1.5, texte: "Pourquoi le code se termine-t-il par $5$ ?", corrige: "Un multiple de $5$ se termine par $0$ ou par $5$. Comme le code est impair, il se termine par $5$." },
          { n: "2.", points: 2, texte: "Trouve le code.", indice: "La somme $7 + \\ldots + 5$ des chiffres doit être un multiple de $9$.", corrige: "Le code s'écrit $7\\,?\\,5$. La somme des chiffres, $12 + ?$, doit être un multiple de $9$ : avec un chiffre entre $0$ et $9$, seul $18$ convient, donc le chiffre des dizaines est $6$. Le code est $765$." },
          { n: "3.", points: 1.5, texte: "Décompose ce code en produit de facteurs premiers.", corrige: "$765 = 5 \\times 153 = 5 \\times 9 \\times 17 = 3^2 \\times 5 \\times 17$." },
          { n: "4.", points: 1, texte: "Écris $\\dfrac{765}{900}$ sous forme irréductible.", corrige: "$900 = 2^2 \\times 3^2 \\times 5^2$ : les facteurs communs sont $3^2$ et $5$, soit $45$.\n\n$\\dfrac{765}{900} = \\dfrac{765 \\div 45}{900 \\div 45} = \\dfrac{17}{20}$" }
        ]
      }
    ]
  }
};
