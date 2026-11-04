/*
  ENTRAÎNEMENT : 6e — chapitre 2, Addition, soustraction et multiplication des décimaux
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre sixieme-operations.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 6e, sans calculatrice.
  Nombres et prix différents de ceux du cours, de la méthode et du QCM du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["sixieme-operations"] = {
  revisions: {
    intro: "Les opérations sur les décimaux en un coup d'œil : vocabulaire, additions et soustractions posées, calcul en ligne, multiplication et ordre de grandeur. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Le vocabulaire",
        texte: "Le résultat d'une addition est une somme, celui d'une soustraction une différence, celui d'une multiplication un produit ; les nombres que l'on multiplie sont les facteurs."
      },
      {
        titre: "Poser une addition",
        texte: "On aligne les virgules, et on complète avec des zéros si besoin : $8{,}4 + 2{,}35 = 8{,}40 + 2{,}35 = 10{,}75$."
      },
      {
        titre: "Calculer en ligne",
        texte: "Sans parenthèses, on calcule de gauche à droite les additions et les soustractions : $20 - 6 + 3 = 17$. Avec des parenthèses, on commence par elles : $20 - (6 + 3) = 11$."
      },
      {
        titre: "Multiplier deux décimaux",
        texte: "On multiplie sans les virgules, puis on place la virgule : le produit a autant de chiffres après la virgule que les deux facteurs réunis. $2{,}3 \\times 0{,}4$ : $23 \\times 4 = 92$, donc $0{,}92$."
      },
      {
        titre: "Ordre de grandeur",
        texte: "On remplace les nombres par des valeurs proches et simples pour prévoir le résultat : $9{,}7 \\times 5{,}2 \\approx 10 \\times 5 = 50$."
      }
    ],
    pieges: [
      "Aligner les chiffres de droite au lieu des virgules.",
      "Oublier de compter les chiffres après la virgule dans un produit.",
      "Croire qu'un produit est toujours plus grand que les facteurs : $8 \\times 0{,}5 = 4$.",
      "Calculer $20 - 6 + 3$ comme $20 - 9$.",
      "Ne pas vérifier un résultat avec un ordre de grandeur."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Poser et calculer",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Pose les opérations sur ta feuille.",
        questions: [
          { n: "1.", points: 2, texte: "Calcule $27{,}6 + 8{,}45$ et $50 - 13{,}72$.", corrige: "$27{,}60 + 8{,}45 = 36{,}05$ et $50{,}00 - 13{,}72 = 36{,}28$." },
          { n: "2.", points: 2, texte: "Calcule $3{,}4 \\times 2{,}5$ et $0{,}7 \\times 0{,}08$.", corrige: "$34 \\times 25 = 850$, donc $3{,}4 \\times 2{,}5 = 8{,}50 = 8{,}5$. Puis $7 \\times 8 = 56$, donc $0{,}7 \\times 0{,}08 = 0{,}056$ (trois chiffres après la virgule)." },
          { n: "3.", points: 1.5, texte: "Sachant que $56 \\times 13 = 728$, donne $5{,}6 \\times 1{,}3$ et $0{,}56 \\times 13$.", corrige: "$5{,}6 \\times 1{,}3 = 7{,}28$ (deux chiffres après la virgule en tout) et $0{,}56 \\times 13 = 7{,}28$." },
          { n: "4.", points: 1.5, texte: "Calcule astucieusement $4 \\times 7{,}3 \\times 25$.", corrige: "$4 \\times 25 = 100$, donc $4 \\times 7{,}3 \\times 25 = 100 \\times 7{,}3 = 730$." }
        ]
      },
      {
        titre: "Ordres de grandeur et calcul en ligne",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Réponds sans poser d'opération.",
        questions: [
          { n: "1.", points: 2, texte: "Donne un ordre de grandeur de $49{,}7 \\times 6{,}1$, puis de $302{,}5 - 98{,}7$.", corrige: "$50 \\times 6 = 300$, puis $300 - 100 = 200$." },
          { n: "2.", points: 2, texte: "Sans poser l'opération, quel est le résultat de $19{,}9 \\times 4{,}05$ : $8{,}0595$ ; $80{,}595$ ou $805{,}95$ ?", indice: "Cherche un ordre de grandeur du produit.", corrige: "$19{,}9 \\times 4{,}05 \\approx 20 \\times 4 = 80$ : le résultat est $80{,}595$." },
          { n: "3.", points: 1.5, texte: "Calcule $18 - 4 + 6$, puis $18 - (4 + 6)$.", corrige: "$18 - 4 + 6 = 14 + 6 = 20$, et $18 - (4 + 6) = 18 - 10 = 8$." },
          { n: "4.", points: 1.5, texte: "Dans l'égalité $7{,}5 \\times 4 = 30$, comment s'appellent $7{,}5$ et $4$ ? Et $30$ ?", corrige: "$7{,}5$ et $4$ sont les facteurs ; $30$ est le produit." }
        ]
      },
      {
        titre: "Les courses au marché",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Au marché, Naïma achète $1{,}5$ kg de tomates à $3{,}20$ € le kilogramme et $2$ ananas à $2{,}75$ € l'un. Elle paie avec un billet de $20$ € (prix fictifs).",
        questions: [
          { n: "1.", points: 2, texte: "Combien coûtent les tomates ? Et les ananas ?", corrige: "Tomates : $1{,}5 \\times 3{,}20 = 4{,}80$ €. Ananas : $2 \\times 2{,}75 = 5{,}50$ €." },
          { n: "2.", points: 2, texte: "Combien paie-t-elle en tout ?", corrige: "$4{,}80 + 5{,}50 = 10{,}30$ €." },
          { n: "3.", points: 2, texte: "Combien la marchande doit-elle lui rendre ?", corrige: "$20 - 10{,}30 = 9{,}70$ €." }
        ]
      }
    ]
  }
};
