/*
  ENTRAÎNEMENT : 5e — chapitre 14, Équations
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre cinquieme-equations.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 5e, sans calculatrice.
  Équations et problèmes différents de ceux du cours, de la méthode, du QCM et de l'entraînement de 4e.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["cinquieme-equations"] = {
  revisions: {
    intro: "Les équations en un coup d'œil : tester une égalité, résoudre $x + b = c$ et $ax = c$, puis mettre un problème en équation. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Une équation",
        texte: "C'est une égalité où un nombre inconnu est remplacé par une lettre. Une solution est un nombre qui rend l'égalité vraie."
      },
      {
        titre: "Tester un nombre",
        texte: "On calcule séparément les deux membres en remplaçant la lettre par le nombre : s'ils sont égaux, le nombre est solution."
      },
      {
        titre: "Résoudre $x + b = c$",
        texte: "On soustrait $b$ : $x + 14 = 30$ donne $x = 30 - 14 = 16$. Et $x - 6 = 9$ donne $x = 9 + 6 = 15$."
      },
      {
        titre: "Résoudre $ax = c$",
        texte: "On divise par $a$ : $5x = 32$ donne $x = 32 \\div 5 = 6{,}4$. Et $\\dfrac{x}{3} = 7$ donne $x = 7 \\times 3 = 21$."
      },
      {
        titre: "Mettre en équation",
        texte: "On choisit la lettre qui désigne le nombre cherché, on traduit l'énoncé par une égalité, on la résout, puis on vérifie et on répond par une phrase."
      }
    ],
    pieges: [
      "Soustraire au lieu d'ajouter pour résoudre $x - b = c$.",
      "Diviser $a$ par $c$ au lieu de $c$ par $a$ pour résoudre $ax = c$.",
      "Oublier que $5x$ signifie $5 \\times x$.",
      "Ne pas vérifier la solution trouvée.",
      "Donner seulement un nombre sans répondre à la question du problème."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Tester des nombres",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Justifie chaque réponse par un calcul.",
        questions: [
          { n: "1.", points: 2, texte: "Le nombre $3$ est-il solution de l'équation $4x + 5 = 6x - 1$ ?", corrige: "Pour $x = 3$ : $4 \\times 3 + 5 = 17$ et $6 \\times 3 - 1 = 17$. Les deux membres sont égaux : $3$ est solution." },
          { n: "2.", points: 2, texte: "Le nombre $2$ est-il solution de l'équation $x^2 + 1 = 3x$ ?", corrige: "Pour $x = 2$ : $2^2 + 1 = 5$ et $3 \\times 2 = 6$. Les deux membres sont différents : $2$ n'est pas solution." },
          { n: "3.", points: 3, texte: "Parmi les nombres $1$ ; $2$ ; $4$ et $5$, lequel est solution de $3x - 2 = x + 6$ ?", indice: "Teste les nombres un par un.", corrige: "Pour $1$ : $1$ et $7$ ; pour $2$ : $4$ et $8$ ; pour $4$ : $10$ et $10$ ; pour $5$ : $13$ et $11$. Seul $4$ est solution." }
        ]
      },
      {
        titre: "Résoudre",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Résous chaque équation et vérifie ta solution.",
        questions: [
          { n: "1.", points: 1.5, texte: "$x + 17 = 42$", corrige: "$x = 42 - 17 = 25$. Vérification : $25 + 17 = 42$." },
          { n: "2.", points: 1.5, texte: "$y - 9{,}5 = 4$", corrige: "$y = 4 + 9{,}5 = 13{,}5$. Vérification : $13{,}5 - 9{,}5 = 4$." },
          { n: "3.", points: 2, texte: "$6x = 45$", corrige: "$x = 45 \\div 6 = 7{,}5$. Vérification : $6 \\times 7{,}5 = 45$." },
          { n: "4.", points: 2, texte: "$\\dfrac{x}{4} = 2{,}5$", corrige: "$x = 2{,}5 \\times 4 = 10$. Vérification : $10 \\div 4 = 2{,}5$." }
        ]
      },
      {
        titre: "Trois problèmes",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Pour chaque problème, écris une équation, résous-la, puis réponds par une phrase.",
        questions: [
          { n: "1.", points: 2, texte: "Un stylo et $4$ cahiers identiques coûtent $9{,}80$ € en tout. Le stylo coûte $1{,}40$ €. Quel est le prix d'un cahier ?", corrige: "Avec $c$ le prix d'un cahier : $1{,}40 + 4c = 9{,}80$, donc $4c = 8{,}40$ et $c = 2{,}10$. Un cahier coûte $2{,}10$ €." },
          { n: "2.", points: 2, texte: "Le périmètre d'un carré vaut $26$ cm. Quelle est la longueur de son côté ?", corrige: "Avec $c$ le côté : $4c = 26$, donc $c = 6{,}5$. Le côté mesure $6{,}5$ cm." },
          { n: "3.", points: 2, texte: "Il y a $5$ ans, Samir avait $8$ ans. Quel âge a-t-il aujourd'hui ?", corrige: "Avec $a$ son âge : $a - 5 = 8$, donc $a = 13$. Samir a $13$ ans." }
        ]
      }
    ]
  }
};
