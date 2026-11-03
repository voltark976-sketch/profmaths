/*
  ENTRAÎNEMENT : 3e — chapitre 5, Arithmétique
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre troisieme-arithmetique.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type brevet.
  Nombres différents de ceux du cours, de la méthode et du QCM du chapitre ; données fictives.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["troisieme-arithmetique"] = {
  revisions: {
    intro: "L'arithmétique en un coup d'œil : diviseurs, critères, nombres premiers, décompositions et partages. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Diviseur, multiple",
        texte: "$a$ est divisible par $b$ (ou $b$ divise $a$) si le reste de la division euclidienne de $a$ par $b$ est nul. Division euclidienne : $a = b \\times q + r$, avec $r < b$."
      },
      {
        titre: "Critères de divisibilité",
        texte:
          "- par $2$ : le chiffre des unités est pair ;\n" +
          "- par $3$ (ou par $9$) : la somme des chiffres est divisible par $3$ (ou par $9$) ;\n" +
          "- par $5$ : le chiffre des unités est $0$ ou $5$ ; par $10$ : il est $0$."
      },
      {
        titre: "Nombres premiers",
        texte: "Un nombre premier a exactement deux diviseurs : $1$ et lui-même. Ceux qui sont inférieurs à $30$ : $2$, $3$, $5$, $7$, $11$, $13$, $17$, $19$, $23$, $29$. Le nombre $1$ n'est pas premier."
      },
      {
        titre: "Décomposition",
        texte: "Tout entier supérieur à $1$ s'écrit de façon unique comme produit de nombres premiers : $360 = 2^3 \\times 3^2 \\times 5$. On divise par $2$, $3$, $5$, $7$… tant que c'est possible."
      },
      {
        titre: "Fractions irréductibles",
        texte: "On décompose le numérateur et le dénominateur, puis on simplifie par tous les facteurs communs : $\\dfrac{90}{150} = \\dfrac{2 \\times 3^2 \\times 5}{2 \\times 3 \\times 5^2} = \\dfrac{3}{5}$."
      },
      {
        titre: "Partage maximal",
        texte: "Pour faire le plus grand nombre de lots identiques avec tout le matériel, on cherche le plus grand diviseur commun des quantités, avec leurs décompositions."
      }
    ],
    pieges: [
      "Dire que $1$ est premier.",
      "Oublier que $2$ est premier : c'est le seul nombre premier pair.",
      "Croire que $91$ est premier : $91 = 7 \\times 13$.",
      "Dans une division euclidienne, laisser un reste plus grand que le diviseur.",
      "Divisible par $4$ et par $6$ ne veut pas dire divisible par $24$ : $12$ l'est par $4$ et par $6$, pas par $24$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme au brevet (environ $60$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Les kits de l'association",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Une association a reçu $168$ cahiers et $120$ stylos. Elle veut faire des kits identiques pour la rentrée, en utilisant tous les cahiers et tous les stylos (données fictives).",
        questions: [
          { n: "1.", points: 2, texte: "Décompose $168$ et $120$ en produits de facteurs premiers.", indice: "Divise par $2$ tant que c'est possible, puis par $3$, $5$, $7$.", corrige: "$168 = 2 \\times 84 = 2^2 \\times 42 = 2^3 \\times 21 = 2^3 \\times 3 \\times 7$.\n\n$120 = 2 \\times 60 = 2^2 \\times 30 = 2^3 \\times 15 = 2^3 \\times 3 \\times 5$." },
          { n: "2.", points: 1, texte: "Peut-elle faire $12$ kits ? Justifie.", corrige: "**Oui** : $168 = 12 \\times 14$ et $120 = 12 \\times 10$. Chaque kit aurait $14$ cahiers et $10$ stylos." },
          { n: "3.", points: 2, texte: "Quel est le plus grand nombre de kits qu'elle peut faire ?", indice: "Cherche le plus grand diviseur commun avec les décompositions.", corrige: "Les facteurs communs aux deux décompositions sont $2^3$ et $3$ : le plus grand diviseur commun est $2^3 \\times 3 = 24$. L'association peut faire au maximum $24$ kits." },
          { n: "4.", points: 2, texte: "Que contient alors chaque kit ?", corrige: "$168 \\div 24 = 7$ et $120 \\div 24 = 5$ : chaque kit contient $7$ cahiers et $5$ stylos." }
        ]
      },
      {
        titre: "Vrai ou faux ?",
        duree: 20, points: 7, calculatrice: true,
        contexte: "Pour chaque affirmation, dis si elle est vraie ou fausse, et justifie. Les questions sont indépendantes.",
        questions: [
          { n: "1.", points: 2, texte: "$221$ est un nombre premier.", indice: "Teste les divisions par $7$, $11$, $13$…", corrige: "**Faux** : $221 = 13 \\times 17$. Il a donc d'autres diviseurs que $1$ et $221$." },
          { n: "2.", points: 2, texte: "Le produit de deux entiers consécutifs est toujours pair.", indice: "Parmi deux entiers qui se suivent, l'un est pair.", corrige: "**Vrai** : de deux entiers consécutifs, l'un est pair, donc s'écrit $2k$. Le produit est alors un multiple de $2$ : il est pair." },
          { n: "3.", points: 1.5, texte: "Un nombre divisible par $4$ et par $6$ est divisible par $24$.", corrige: "**Faux** : $12$ est divisible par $4$ et par $6$, mais pas par $24$." },
          { n: "4.", points: 1.5, texte: "$36$ a exactement $9$ diviseurs.", corrige: "**Vrai** : ses diviseurs sont $1$, $2$, $3$, $4$, $6$, $9$, $12$, $18$ et $36$." }
        ]
      },
      {
        titre: "L'album photo",
        duree: 15, points: 6, calculatrice: true,
        contexte: "Inaya a $1\\,000$ photos à coller dans un album qui contient $36$ photos par page (données fictives).",
        questions: [
          { n: "1.", points: 1.5, texte: "Effectue la division euclidienne de $1\\,000$ par $36$. Combien de pages pleines aura-t-elle ?", corrige: "$1\\,000 = 36 \\times 27 + 28$, avec $28 < 36$. Elle remplit $27$ pages, et il reste $28$ photos pour une $28$e page." },
          { n: "2.", points: 1, texte: "Combien de photos lui manque-t-il pour remplir la dernière page ?", corrige: "$36 - 28 = 8$ photos." },
          { n: "3.", points: 2, texte: "Elle cherche un autre album dont toutes les pages seraient pleines, avec un nombre de photos par page strictement compris entre $30$ et $50$. Quel nombre convient ?", indice: "Cherche les diviseurs de $1\\,000 = 2^3 \\times 5^3$.", corrige: "$1\\,000 = 2^3 \\times 5^3$. Ses diviseurs sont $1$, $2$, $4$, $5$, $8$, $10$, $20$, $25$, $40$, $50$, $100$… Le seul strictement compris entre $30$ et $50$ est $40$ : un album de $40$ photos par page, avec $25$ pages pleines." },
          { n: "4.", points: 1.5, texte: "$375$ de ses photos sont des portraits. Quelle fraction des photos représentent-ils ? Donne-la sous forme irréductible.", corrige: "$\\dfrac{375}{1\\,000} = \\dfrac{3 \\times 5^3}{2^3 \\times 5^3} = \\dfrac{3}{8}$ des photos." }
        ]
      }
    ]
  }
};
