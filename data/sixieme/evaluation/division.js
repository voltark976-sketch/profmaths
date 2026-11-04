/*
  ENTRAÎNEMENT : 6e — chapitre 3, Division euclidienne, division décimale et durées
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre sixieme-division.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 6e, sans calculatrice.
  Nombres et horaires différents de ceux du cours, de la méthode, du QCM et de l'entraînement de 5e.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["sixieme-division"] = {
  revisions: {
    intro: "La division en un coup d'œil : multiples et diviseurs, division euclidienne, division décimale, valeurs arrondies et durées. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Multiples et diviseurs",
        texte: "Comme $54 = 6 \\times 9$, $54$ est un multiple de $6$ et de $9$, et $6$ et $9$ sont des diviseurs de $54$."
      },
      {
        titre: "Division euclidienne",
        texte: "Diviser $a$ par $b$, c'est trouver le quotient $q$ et le reste $r$ tels que $a = b \\times q + r$, avec $r < b$ : $95 = 7 \\times 13 + 4$."
      },
      {
        titre: "Division décimale",
        texte: "On continue la division après la virgule en ajoutant des zéros : $9 \\div 4 = 2{,}25$ et $16{,}8 \\div 3 = 5{,}6$."
      },
      {
        titre: "Valeur arrondie",
        texte: "Certains quotients ne s'arrêtent jamais : $10 \\div 6 = 1{,}666\\ldots$ On en donne une valeur arrondie, par exemple $1{,}67$ au centième."
      },
      {
        titre: "Durées",
        texte: "$1$ h $= 60$ min et $1$ min $= 60$ s. Attention : $1{,}5$ h $= 1$ h $30$ min, et $0{,}25$ h $= 15$ min."
      }
    ],
    pieges: [
      "Donner un reste plus grand que le diviseur.",
      "Oublier la dernière place, ou le dernier car, pour ceux qui restent.",
      "Écrire $2{,}5$ h $= 2$ h $5$ min : c'est $2$ h $30$ min.",
      "Calculer avec les heures et les minutes comme avec des nombres décimaux : $60$ minutes font une heure.",
      "Oublier la virgule au quotient en passant aux dixièmes."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Des divisions",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Pose les divisions sur ta feuille.",
        questions: [
          { n: "1.", points: 2, texte: "Effectue la division euclidienne de $1\\,345$ par $24$ et écris l'égalité.", corrige: "$1\\,345 = 24 \\times 56 + 1$, avec $1 < 24$." },
          { n: "2.", points: 2, texte: "Calcule $37{,}8 \\div 6$ et $51 \\div 4$.", corrige: "$37{,}8 \\div 6 = 6{,}3$ et $51 \\div 4 = 12{,}75$." },
          { n: "3.", points: 1.5, texte: "Donne la valeur arrondie au centième de $20 \\div 7$.", corrige: "$20 \\div 7 = 2{,}857\\ldots$, donc environ $2{,}86$ au centième." },
          { n: "4.", points: 1.5, texte: "$168$ est-il un multiple de $7$ ? de $9$ ?", corrige: "$168 = 7 \\times 24$ : c'est un multiple de $7$. Mais $168 = 9 \\times 18 + 6$ : ce n'est pas un multiple de $9$." }
        ]
      },
      {
        titre: "La sortie scolaire",
        duree: 15, points: 7, calculatrice: false,
        contexte: "$173$ élèves et $12$ adultes partent en sortie. Ils prennent des cars de $50$ places.",
        questions: [
          { n: "1.", points: 2.5, texte: "Combien de cars faut-il ?", indice: "Fais la division euclidienne de $185$ par $50$.", corrige: "$173 + 12 = 185$ personnes, et $185 = 50 \\times 3 + 35$ : trois cars ne suffisent pas, il en faut $4$." },
          { n: "2.", points: 2, texte: "Combien restera-t-il de places libres ?", corrige: "$4 \\times 50 = 200$ places, donc $200 - 185 = 15$ places libres." },
          { n: "3.", points: 2.5, texte: "Sur place, les élèves sont répartis en groupes de $8$. Combien de groupes complets peut-on former ? Combien d'élèves restent ?", corrige: "$173 = 8 \\times 21 + 5$ : on forme $21$ groupes complets, et il reste $5$ élèves." }
        ]
      },
      {
        titre: "Les durées",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Écris les étapes de calcul.",
        questions: [
          { n: "1.", points: 2, texte: "Convertis $3{,}5$ h et $150$ min en heures et minutes.", corrige: "$3{,}5$ h $= 3$ h $30$ min, et $150$ min $= 120$ min $+ 30$ min $= 2$ h $30$ min." },
          { n: "2.", points: 2, texte: "Un film commence à $19$ h $45$ et dure $1$ h $35$ min. À quelle heure se termine-t-il ?", corrige: "$19$ h $45 + 1$ h $= 20$ h $45$, puis $+ 35$ min $= 21$ h $20$." },
          { n: "3.", points: 2, texte: "Un taxi-brousse part à $6$ h $40$ et arrive à $8$ h $15$. Combien de temps dure le trajet ?", indice: "Compte d'abord jusqu'à $7$ h.", corrige: "De $6$ h $40$ à $7$ h : $20$ min ; de $7$ h à $8$ h : $1$ h ; de $8$ h à $8$ h $15$ : $15$ min. Total : $1$ h $35$ min." }
        ]
      }
    ]
  }
};
