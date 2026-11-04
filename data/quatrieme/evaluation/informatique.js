/*
  ENTRAÎNEMENT : 4e — chapitre 15, Programmation
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre quatrieme-informatique.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle de 4e, sans calculatrice.
  Les scripts Scratch sont écrits en texte, un bloc par ligne (28 caractères au plus, pour un écran de 360 px).
  Programmes différents de ceux du cours, de la méthode, du QCM et de l'entraînement de 3e.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["quatrieme-informatique"] = {
  revisions: {
    intro: "La programmation en un coup d'œil : variables, conditions, boucles et évènements. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Variables",
        texte: "Une variable a un nom et contient une valeur. « mettre [a] à 7 » remplace sa valeur ; « ajouter 2 à [a] » l'augmente de $2$. Les blocs s'exécutent dans l'ordre, de haut en bas."
      },
      {
        titre: "Si … alors … sinon",
        texte: "Si la condition est vraie, le lutin exécute les blocs du « alors » ; sinon, ceux du « sinon ». « n modulo 2 = 0 » est vrai quand $n$ est pair."
      },
      {
        titre: "Boucles",
        texte: "« répéter 5 fois » exécute $5$ fois son contenu ; « répéter jusqu'à » teste la condition avant chaque passage et s'arrête dès qu'elle est vraie."
      },
      {
        titre: "Polygones réguliers",
        texte: "Pour tracer un polygone régulier à $n$ côtés, le lutin avance, puis tourne de $360^\\circ \\div n$, et cela $n$ fois."
      },
      {
        titre: "Évènements",
        texte: "Un script démarre sur un évènement : « quand le drapeau est cliqué », « quand ce lutin est cliqué », « quand la touche espace est pressée »… Plusieurs scripts peuvent fonctionner en même temps."
      }
    ],
    pieges: [
      "Oublier qu'une variable garde sa dernière valeur : relis les blocs dans l'ordre.",
      "Confondre « mettre à », qui remplace la valeur, et « ajouter à », qui l'augmente.",
      "Dans une condition, se tromper entre « plus grand que » et « plus petit que ».",
      "Mal compter les passages d'une boucle « répéter jusqu'à ».",
      "Tourner de l'angle intérieur d'un polygone au lieu de $360^\\circ \\div n$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $50$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Suivre les variables",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Voici un script :\n\n```scratch\nquand le drapeau est cliqué\nmettre [a] à 6\nmettre [b] à (a - 2)\nmettre [a] à (a * b)\nmettre [b] à (a + b)\ndire (b)\n```",
        questions: [
          { n: "1.", points: 2, texte: "Donne les valeurs de $a$ et de $b$ après chaque bloc « mettre ».", corrige: "$a = 6$ ; puis $b = 6 - 2 = 4$ ; puis $a = 6 \\times 4 = 24$ ; enfin $b = 24 + 4 = 28$." },
          { n: "2.", points: 1, texte: "Que dit le lutin à la fin ?", corrige: "Il dit $28$." },
          { n: "3.", points: 2, texte: "Que dit le lutin si l'on remplace $6$ par $10$ dans le deuxième bloc ?", corrige: "$a = 10$, $b = 8$, $a = 80$, puis $b = 88$ : le lutin dit $88$." },
          { n: "4.", points: 2, texte: "Et si l'on remplace $6$ par $1$ ?", indice: "Attention aux nombres négatifs.", corrige: "$a = 1$, $b = 1 - 2 = -1$, $a = 1 \\times (-1) = -1$, puis $b = -1 + (-1) = -2$ : le lutin dit $-2$." }
        ]
      },
      {
        titre: "Pair ou impair",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Voici un script :\n\n```scratch\nquand le drapeau est cliqué\ndemander [n ?] et attendre\nmettre [n] à (réponse)\nsi (n modulo 2 = 0) alors\n  dire (n / 2)\nsinon\n  dire (3 * n + 1)\nfin\n```",
        questions: [
          { n: "1.", points: 1.5, texte: "Que dit le lutin si l'on répond $14$ ?", corrige: "$14$ est pair : le lutin dit $14 \\div 2 = 7$." },
          { n: "2.", points: 1.5, texte: "Que dit le lutin si l'on répond $7$ ?", corrige: "$7$ est impair : le lutin dit $3 \\times 7 + 1 = 22$." },
          { n: "3.", points: 2, texte: "On répond $6$, puis on relance le script en répondant à chaque fois le nombre que le lutin vient de dire. Après combien de lancements le lutin dit-il $1$ ?", corrige: "$6 \\to 3 \\to 10 \\to 5 \\to 16$ ${} \\to 8 \\to 4 \\to 2 \\to 1$ : le lutin dit $1$ au huitième lancement." },
          { n: "4.", points: 2, texte: "Quel nombre faut-il répondre pour que le lutin dise $13$ ?", indice: "Teste les deux cas : un nombre pair, puis un nombre impair.", corrige: "Si le nombre est pair, $n \\div 2 = 13$ donne $n = 26$, qui est bien pair. S'il est impair, $3n + 1 = 13$ donne $n = 4$, qui n'est pas impair : impossible. Il faut répondre $26$." }
        ]
      },
      {
        titre: "Le bloc polygone",
        duree: 15, points: 6, calculatrice: false,
        contexte: "On a créé ce bloc personnalisé :\n\n```scratch\ndéfinir polygone (n) (c)\nstylo en position d'écriture\nrépéter (n) fois\n  avancer de (c)\n  tourner ↻ (360 / n) degrés\nfin\n```",
        questions: [
          { n: "1.", points: 1.5, texte: "Quelle figure le lutin trace-t-il avec « polygone (6) (40) » ?", corrige: "Un hexagone régulier, c'est-à-dire à $6$ côtés égaux, de $40$ pas de côté." },
          { n: "2.", points: 1.5, texte: "Quelle longueur totale le lutin trace-t-il alors ?", corrige: "$6 \\times 40 = 240$ pas." },
          { n: "3.", points: 1.5, texte: "De combien de degrés le lutin tourne-t-il à chaque sommet avec « polygone (8) (25) » ?", corrige: "$360 \\div 8 = 45$ degrés." },
          { n: "4.", points: 1.5, texte: "Quelles valeurs de $n$ et de $c$ faut-il choisir pour tracer un triangle équilatéral de $270$ pas de périmètre ?", corrige: "$n = 3$ et $c = 270 \\div 3 = 90$ : « polygone (3) (90) »." }
        ]
      }
    ]
  }
};
