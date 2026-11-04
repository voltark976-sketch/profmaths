/*
  ENTRAÎNEMENT : 6e — chapitre 7, Pensée algébrique : motifs et schémas en barre
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre sixieme-algebre.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 6e, sans calculatrice.
  Figure dessinée par o.figGeo (assets/exercices-base.js). Nombres et motifs différents de ceux du cours, de la méthode,
  du QCM et de l'entraînement de 5e.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["sixieme-algebre"] = {
  revisions: {
    intro: "La pensée algébrique en un coup d'œil : égalités à trous, programmes de calcul, suites, motifs et schémas en barre. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Le signe =",
        texte: "Il veut dire « vaut la même chose que » : $12 + 8 = 4 \\times 5$ est vrai, car les deux côtés valent $20$."
      },
      {
        titre: "Égalités à trous",
        texte: "On calcule d'abord ce qu'on connaît : dans $\\ldots + 14 = 6 \\times 5$, le côté droit vaut $30$, donc le nombre manquant est $30 - 14 = 16$."
      },
      {
        titre: "Programmes de calcul",
        texte: "On applique les étapes dans l'ordre. Pour retrouver le nombre de départ, on remonte le programme avec les opérations inverses : $\\times 2$ devient $\\div 2$, $+ 5$ devient $- 5$."
      },
      {
        titre: "Suites et motifs",
        texte: "On cherche ce qui change d'une étape à la suivante : si l'on ajoute toujours $4$, l'étape $n$ s'obtient en ajoutant $4$ autant de fois que nécessaire."
      },
      {
        titre: "Schémas en barre",
        texte: "On représente les quantités par des barres : « $3$ fois plus » se dessine avec $3$ barres égales, et l'on partage le total entre toutes les barres."
      }
    ],
    pieges: [
      "Lire le signe $=$ comme « donne » et écrire des égalités fausses à la suite.",
      "Remonter un programme sans inverser l'ordre des étapes.",
      "Croire qu'une suite augmente toujours du même nombre : $1$ ; $2$ ; $4$ ; $8$ double.",
      "Compter les étapes d'un motif à partir de $0$ au lieu de $1$.",
      "Oublier, dans un schéma en barre, la partie « en plus »."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Les égalités à trous",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Trouve le nombre manquant et vérifie.",
        questions: [
          { n: "1.", points: 2, texte: "$\\ldots + 38 = 9 \\times 7$", corrige: "$9 \\times 7 = 63$, et $63 - 38 = 25$ : le nombre manquant est $25$." },
          { n: "2.", points: 2, texte: "$8 \\times \\ldots = 100 - 28$", corrige: "$100 - 28 = 72$, et $72 \\div 8 = 9$ : le nombre manquant est $9$." },
          { n: "3.", points: 1.5, texte: "$150 - \\ldots = 4 \\times 25$", corrige: "$4 \\times 25 = 100$, et $150 - 100 = 50$ : le nombre manquant est $50$." },
          { n: "4.", points: 1.5, texte: "Vrai ou faux : $6 \\times 7 = 50 - 8$ ?", corrige: "Vrai : les deux côtés valent $42$." }
        ]
      },
      {
        titre: "Le programme de calcul",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Programme : « Choisis un nombre. Multiplie-le par $4$. Retire $3$. »",
        questions: [
          { n: "1.", points: 2, texte: "Quel résultat obtient-on avec $6$ ? Et avec $2{,}5$ ?", corrige: "$6 \\times 4 = 24$, puis $24 - 3 = 21$. Avec $2{,}5$ : $2{,}5 \\times 4 = 10$, puis $10 - 3 = 7$." },
          { n: "2.", points: 2.5, texte: "On obtient $37$. Quel était le nombre de départ ?", indice: "Remonte le programme : on ajoute $3$, puis on divise par $4$.", corrige: "$37 + 3 = 40$, puis $40 \\div 4 = 10$ : le nombre de départ était $10$." },
          { n: "3.", points: 2.5, texte: "On appelle $N$ le nombre de départ. Écris le calcul fait par le programme.", corrige: "$N \\times 4 - 3$ (on peut aussi l'écrire $4 \\times N - 3$)." }
        ]
      },
      {
        titre: "Le motif de triangles",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Avec des allumettes, on forme une rangée de triangles, comme ci-dessous : il faut $3$ allumettes pour $1$ triangle, $5$ pour $2$ triangles, $7$ pour $3$ triangles.",
        figure: (o) => o.figGeo({
          W: 320, H: 110,
          pts: { B0: [80, 90], B1: [160, 90], B2: [240, 90], T0: [120, 25], T1: [200, 25] },
          segs: [["B0", "B1"], ["B1", "B2"], ["T0", "T1"], ["B0", "T0"], ["T0", "B1"], ["B1", "T1"], ["T1", "B2"]],
          sansPoint: ["B0", "B1", "B2", "T0", "T1"],
          aria: "Une rangée de 3 triangles formée de 7 allumettes"
        }),
        questions: [
          { n: "1.", points: 1.5, texte: "Combien faut-il d'allumettes pour $4$ triangles ?", corrige: "Chaque nouveau triangle demande $2$ allumettes de plus : $7 + 2 = 9$ allumettes." },
          { n: "2.", points: 1.5, texte: "Combien faut-il d'allumettes pour $10$ triangles ?", corrige: "$3 + 9 \\times 2 = 21$ allumettes." },
          { n: "3.", points: 1.5, texte: "Écris une règle qui donne le nombre d'allumettes pour $n$ triangles.", indice: "Une allumette au départ, puis $2$ par triangle.", corrige: "$2 \\times n + 1$ allumettes. Vérification : pour $3$ triangles, $2 \\times 3 + 1 = 7$." },
          { n: "4.", points: 1.5, texte: "Avec $51$ allumettes, combien de triangles peut-on former ?", corrige: "$2 \\times n + 1 = 51$ donne $2 \\times n = 50$, donc $25$ triangles." }
        ]
      }
    ]
  }
};
