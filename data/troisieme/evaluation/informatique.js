/*
  ENTRAÎNEMENT : 3e — chapitre 16, Programmation
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre troisieme-informatique.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type brevet.
  Les scripts Scratch sont écrits en texte, un bloc par ligne (28 caractères au plus, pour un écran de 360 px).
  Programmes et nombres différents de ceux du cours, de la méthode et du QCM du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["troisieme-informatique"] = {
  revisions: {
    intro: "La programmation en un coup d'œil : variables, programmes de calcul, boucles, conditions, tracés et blocs personnalisés. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Variables",
        texte: "Une variable est une boîte qui porte un nom et contient une valeur. « mettre [x] à 5 » remplace la valeur de $x$ par $5$ ; « ajouter 2 à [x] » l'augmente de $2$."
      },
      {
        titre: "Programme de calcul",
        texte: "On suit les blocs dans l'ordre. Pour trouver l'expression du résultat, on appelle $x$ le nombre choisi : « multiplier par $2$, puis ajouter $3$ » donne $2x + 3$."
      },
      {
        titre: "Boucles",
        texte: "« répéter 4 fois » exécute $4$ fois les blocs qu'elle contient. « répéter jusqu'à » teste la condition avant chaque passage et s'arrête dès qu'elle est vraie. Avec deux boucles imbriquées, on multiplie les nombres de passages."
      },
      {
        titre: "Conditions",
        texte: "« si … alors … sinon » exécute l'une ou l'autre partie, selon que la condition est vraie ou fausse. « n modulo 3 = 0 » teste si le reste de la division de $n$ par $3$ est nul, c'est-à-dire si $n$ est un multiple de $3$."
      },
      {
        titre: "Polygones réguliers",
        texte: "Pour tracer un polygone régulier à $n$ côtés, le lutin tourne de $360^\\circ \\div n$ à chaque sommet : $45^\\circ$ pour un octogone."
      },
      {
        titre: "Blocs personnalisés et messages",
        texte: "Un bloc personnalisé (« définir ») regroupe des blocs que l'on réutilise, avec des paramètres. « envoyer à tous » déclenche les scripts qui commencent par « quand je reçois »."
      }
    ],
    pieges: [
      "Oublier que les blocs s'exécutent dans l'ordre : une variable modifiée garde sa nouvelle valeur pour la suite.",
      "Tourner de l'angle intérieur du polygone au lieu de $360^\\circ \\div n$.",
      "Mal compter les passages d'une boucle « répéter jusqu'à » : le test a lieu avant chaque passage.",
      "Confondre « mettre à », qui remplace la valeur, et « ajouter à », qui l'augmente.",
      "Oublier de relever le stylo : le lutin trace aussi ses déplacements."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme au brevet (environ $60$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le programme de calcul",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Voici un script Scratch :\n\n```scratch\nquand le drapeau est cliqué\ndemander [x ?] et attendre\nmettre [x] à (réponse)\nmettre [a] à (x + 3)\nmettre [b] à (x - 3)\ndire (a * b)\n```",
        questions: [
          { n: "1.", points: 1, texte: "Quel nombre le lutin dit-il si l'on répond $5$ ?", corrige: "$a = 5 + 3 = 8$ et $b = 5 - 3 = 2$ : le lutin dit $8 \\times 2 = 16$." },
          { n: "2.", points: 1, texte: "Et si l'on répond $-2$ ?", corrige: "$a = -2 + 3 = 1$ et $b = -2 - 3 = -5$ : le lutin dit $1 \\times (-5) = -5$." },
          { n: "3.", points: 2, texte: "On répond un nombre $x$. Montre que le lutin dit $x^2 - 9$.", indice: "Le lutin dit $(x + 3)(x - 3)$ : pense aux identités remarquables.", corrige: "Le lutin dit $a \\times b = (x + 3)(x - 3)$.\n\nAvec l'identité $(a + b)(a - b) = a^2 - b^2$ : $(x + 3)(x - 3) = x^2 - 9$." },
          { n: "4.", points: 1.5, texte: "Quels nombres faut-il répondre pour que le lutin dise $0$ ?", corrige: "On résout $x^2 - 9 = 0$, soit $x^2 = 9$ : il faut répondre $3$ ou $-3$." },
          { n: "5.", points: 1.5, texte: "Le lutin peut-il dire $-10$ ? Justifie.", indice: "Un carré est toujours positif ou nul.", corrige: "Il faudrait $x^2 - 9 = -10$, soit $x^2 = -1$. C'est impossible, car un carré est positif ou nul : le lutin ne peut pas dire $-10$. Il dit toujours un nombre supérieur ou égal à $-9$." }
        ]
      },
      {
        titre: "La frise de carrés",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Le lutin est orienté vers la droite. On a créé ce bloc personnalisé :\n\n```scratch\ndéfinir carré (c)\nstylo en position d'écriture\nrépéter 4 fois\n  avancer de (c)\n  tourner ↻ de 90 degrés\nfin\nrelever le stylo\n```\n\nPuis on lance ce script :\n\n```scratch\nquand le drapeau est cliqué\nrelever le stylo\naller à x: -200 y: 0\nmettre [côté] à 20\nrépéter 5 fois\n  carré (côté)\n  avancer de (côté + 10)\n  ajouter 10 à [côté]\nfin\n```",
        questions: [
          { n: "1.", points: 2, texte: "Quelles sont les longueurs des côtés des carrés tracés ?", corrige: "La variable « côté » vaut $20$ au premier passage et augmente de $10$ à chaque fois : les carrés ont pour côtés $20$, $30$, $40$, $50$ et $60$ pas." },
          { n: "2.", points: 2, texte: "Quelle longueur totale le stylo trace-t-il ?", indice: "Entre deux carrés, le stylo est relevé.", corrige: "Seuls les carrés sont tracés : $4 \\times (20 + 30 + 40 + 50 + 60) = 4 \\times 200 = 800$ pas." },
          { n: "3.", points: 1.5, texte: "Quelle est l'abscisse du lutin à la fin du script ?", corrige: "Après chaque carré, le lutin revient à son point de départ, puis avance de « côté $+ 10$ » : $30$, $40$, $50$, $60$ et $70$ pas, soit $250$ pas en tout. Son abscisse finale est $-200 + 250 = 50$." },
          { n: "4.", points: 1.5, texte: "On remplace « répéter 5 fois » par « répéter 7 fois ». Les abscisses de la scène vont de $-240$ à $240$. Le septième carré est-il entièrement sur la scène ?", corrige: "Le sixième carré, de côté $70$, commence en $50$ ; le lutin avance ensuite de $80$ et arrive en $130$. Le septième carré, de côté $80$, va de $130$ à $210$ : il est entièrement sur la scène, car $210 < 240$." }
        ]
      },
      {
        titre: "Le compteur",
        duree: 20, points: 6, calculatrice: false,
        contexte: "Voici un script Scratch :\n\n```scratch\nquand le drapeau est cliqué\nmettre [n] à 0\nmettre [score] à 0\nrépéter jusqu'à (n > 50)\n  ajouter 7 à [n]\n  si (n modulo 2 = 0) alors\n    ajouter 1 à [score]\n  fin\nfin\ndire (score)\n```",
        questions: [
          { n: "1.", points: 1.5, texte: "Quelles valeurs la variable $n$ prend-elle ? Combien de fois la boucle est-elle répétée ?", indice: "La condition $n > 50$ est testée avant chaque passage.", corrige: "$n$ prend les valeurs $7$, $14$, $21$, $28$, $35$, $42$, $49$ et $56$. Après $56$, la condition $n > 50$ est vraie : la boucle s'arrête. Elle a été répétée $8$ fois." },
          { n: "2.", points: 1.5, texte: "Que dit le lutin à la fin ?", corrige: "Le score augmente quand $n$ est pair : pour $14$, $28$, $42$ et $56$. Le lutin dit $4$." },
          { n: "3.", points: 1.5, texte: "Que teste la condition « n modulo 2 = 0 » ?", corrige: "Elle teste si le reste de la division de $n$ par $2$ vaut $0$, c'est-à-dire si $n$ est un nombre pair." },
          { n: "4.", points: 1.5, texte: "On remplace « n modulo 2 = 0 » par « n modulo 3 = 0 ». Que dit alors le lutin ?", corrige: "Parmi $7$, $14$, $21$, $28$, $35$, $42$, $49$ et $56$, seuls $21$ et $42$ sont des multiples de $3$ : le lutin dit $2$." }
        ]
      }
    ]
  }
};
