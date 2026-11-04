/*
  ENTRAÎNEMENT : 5e — chapitre 18, Programmation par blocs
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre cinquieme-informatique.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 5e, sans calculatrice.
  Les scripts Scratch sont écrits en texte, un bloc par ligne (28 caractères au plus, pour un écran de 360 px).
  Programmes différents de ceux du cours, de la méthode, du QCM et des entraînements de 4e et de 3e.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["cinquieme-informatique"] = {
  revisions: {
    intro: "La programmation par blocs en un coup d'œil : entrées, sorties, expressions, boucles « répéter » et polygones. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Entrée et sortie",
        texte: "« demander […] et attendre » est une entrée : le nombre tapé est rangé dans « réponse ». « dire […] » est une sortie : le lutin affiche un résultat."
      },
      {
        titre: "Expressions",
        texte: "Dans Scratch, $*$ signifie « multiplié par » et $/$ « divisé par ». Les parenthèses s'emboîtent comme en mathématiques : $(\\text{réponse} + 4) * 2$."
      },
      {
        titre: "Répéter",
        texte: "« répéter 5 fois » exécute $5$ fois les blocs qu'il contient, dans l'ordre. On suit la valeur d'une variable à chaque passage."
      },
      {
        titre: "Polygones réguliers",
        texte: "Pour un polygone régulier à $n$ côtés, le lutin répète $n$ fois : avancer, puis tourner de $360^\\circ \\div n$ ($90^\\circ$ pour un carré, $120^\\circ$ pour un triangle équilatéral)."
      }
    ],
    pieges: [
      "Oublier les priorités : $\\text{réponse} + 4 * 2$ n'est pas $(\\text{réponse} + 4) * 2$.",
      "Confondre l'entrée (demander) et la sortie (dire).",
      "Compter un passage de trop, ou de moins, dans une boucle.",
      "Tourner de l'angle intérieur du polygone au lieu de $360^\\circ \\div n$.",
      "Oublier que la variable garde sa nouvelle valeur au passage suivant."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Prévoir ce que dit le lutin",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Voici un script :\n\n```scratch\nquand le drapeau est cliqué\ndemander [n ?] et attendre\ndire ((réponse * 3) - 4)\n```",
        questions: [
          { n: "1.", points: 2, texte: "Que dit le lutin si l'on répond $5$ ? Et si l'on répond $10$ ?", corrige: "$5 \\times 3 - 4 = 11$ et $10 \\times 3 - 4 = 26$." },
          { n: "2.", points: 1.5, texte: "Que dit-il si l'on répond $0$ ?", corrige: "$0 \\times 3 - 4 = -4$." },
          { n: "3.", points: 2, texte: "Quel nombre faut-il répondre pour que le lutin dise $20$ ?", indice: "Fais les opérations inverses, dans l'ordre inverse.", corrige: "On ajoute $4$, puis on divise par $3$ : $(20 + 4) \\div 3 = 8$. Vérification : $8 \\times 3 - 4 = 20$." },
          { n: "4.", points: 1.5, texte: "On répond un nombre $x$. Écris l'expression que calcule le lutin.", corrige: "$x \\times 3 - 4$, c'est-à-dire $3x - 4$." }
        ]
      },
      {
        titre: "La boucle",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Voici un script :\n\n```scratch\nquand le drapeau est cliqué\nmettre [N] à 2\nrépéter 4 fois\n  mettre [N] à (N * 3)\nfin\ndire (N)\n```",
        questions: [
          { n: "1.", points: 2.5, texte: "Donne la valeur de $N$ après chaque passage dans la boucle.", corrige: "$2 \\times 3 = 6$ ; $6 \\times 3 = 18$ ; $18 \\times 3 = 54$ ; $54 \\times 3 = 162$." },
          { n: "2.", points: 1.5, texte: "Que dit le lutin à la fin ?", corrige: "Il dit $162$." },
          { n: "3.", points: 1.5, texte: "On remplace « mettre [N] à (N * 3) » par « ajouter 3 à [N] ». Que dit alors le lutin ?", corrige: "$N$ augmente de $3$ à chaque passage : $2 + 4 \\times 3 = 14$." },
          { n: "4.", points: 1.5, texte: "Avec le script de départ, combien de fois faudrait-il répéter la boucle pour que $N$ dépasse $1\\,000$ ?", corrige: "Après $5$ passages, $N = 486$ ; après $6$ passages, $N = 1\\,458$. Il faut répéter la boucle $6$ fois." }
        ]
      },
      {
        titre: "Tracer des polygones",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Voici un script :\n\n```scratch\nstylo en position d'écriture\nrépéter 3 fois\n  avancer de 80\n  tourner ↻ de 120 degrés\nfin\n```",
        questions: [
          { n: "1.", points: 1.5, texte: "Quelle figure le lutin trace-t-il ?", corrige: "Un triangle équilatéral de $80$ pas de côté : trois côtés égaux, et le lutin tourne de $360 \\div 3 = 120^\\circ$ à chaque sommet." },
          { n: "2.", points: 1.5, texte: "Quel est le périmètre de cette figure ?", corrige: "$3 \\times 80 = 240$ pas." },
          { n: "3.", points: 1.5, texte: "Que faut-il modifier pour tracer un carré de $50$ pas de côté ?", corrige: "Répéter $4$ fois, avancer de $50$ et tourner de $90$ degrés." },
          { n: "4.", points: 1.5, texte: "De combien de degrés le lutin doit-il tourner pour tracer un décagone régulier (à $10$ côtés) ?", corrige: "$360 \\div 10 = 36$ degrés, à chacun des $10$ sommets." }
        ]
      }
    ]
  }
};
