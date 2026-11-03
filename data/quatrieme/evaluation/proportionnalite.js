/*
  ENTRAÎNEMENT : 4e — chapitre 5, Proportionnalité
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre quatrieme-proportionnalite.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle de 4e.
  Prix et durées fictifs ; nombres différents de ceux du cours, de la méthode et du QCM du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["quatrieme-proportionnalite"] = {
  revisions: {
    intro: "La proportionnalité en un coup d'œil : la reconnaître, le produit en croix, les ratios, les pourcentages d'évolution et les vitesses. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Reconnaître la proportionnalité",
        texte: "Deux grandeurs sont proportionnelles si l'on passe de l'une à l'autre en multipliant toujours par le même nombre, le coefficient de proportionnalité. Sur un graphique, les points sont alignés avec l'origine."
      },
      {
        titre: "Le produit en croix",
        texte: "Si $\\dfrac{a}{b} = \\dfrac{c}{d}$, alors $a \\times d = b \\times c$. Pour trouver $x$ tel que $\\dfrac{4}{7} = \\dfrac{x}{21}$ :\n\n$x = \\dfrac{4 \\times 21}{7} = 12$"
      },
      {
        titre: "Partager selon un ratio",
        texte: "Partager dans le ratio $3 : 4$, c'est faire $3 + 4 = 7$ parts égales : $3$ parts pour l'un, $4$ pour l'autre."
      },
      {
        titre: "Pourcentages d'évolution",
        texte: "Augmenter de $t\\,\\%$, c'est multiplier par $1 + \\dfrac{t}{100}$ ; diminuer de $t\\,\\%$, c'est multiplier par $1 - \\dfrac{t}{100}$."
      },
      {
        titre: "Vitesse moyenne",
        texte: "$v = \\dfrac{d}{t}$, donc $d = v \\times t$ et $t = \\dfrac{d}{v}$, avec des unités cohérentes : en km/h, la durée doit être en heures."
      },
      {
        titre: "Durées décimales",
        texte: "$1$ h $= 60$ min : $0{,}2$ h $= 12$ min, et $15$ min $= 0{,}25$ h."
      }
    ],
    pieges: [
      "Croire qu'une situation est proportionnelle parce que les deux grandeurs augmentent en même temps.",
      "Écrire $2$ h $40$ min $= 2{,}40$ h : c'est $2 + \\dfrac{40}{60}$ heures.",
      "Additionner les pourcentages de deux évolutions successives.",
      "Se tromper de sens dans un produit en croix : vérifie avec un ordre de grandeur.",
      "Oublier de convertir les unités avant de calculer une vitesse."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $50$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Les mangues du marché",
        duree: 15, points: 7, calculatrice: true,
        contexte: "Au marché, chez le premier marchand, $2{,}5$ kg de mangues coûtent $7{,}50$ € ; le prix est proportionnel à la masse (prix fictifs).",
        questions: [
          { n: "1.", points: 1.5, texte: "Combien coûtent $4$ kg de mangues chez ce marchand ?", corrige: "Prix d'un kilogramme : $7{,}50 \\div 2{,}5 = 3$ €. Pour $4$ kg : $4 \\times 3 = 12$ €." },
          {
            n: "2.", points: 2, texte: "Complète ce tableau de proportionnalité.",
            tableau: { lignes: [["\\text{Masse (kg)}", "1", "2", "5", "8"], ["\\text{Prix (euros)}", "3", "6", "?", "?"]] },
            corrige: "Le coefficient de proportionnalité vaut $3$ : $5$ kg coûtent $15$ € et $8$ kg coûtent $24$ €.",
            tableauCorrige: { lignes: [["\\text{Masse (kg)}", "1", "2", "5", "8"], ["\\text{Prix (euros)}", "3", "6", "15", "24"]] }
          },
          { n: "3.", points: 2, texte: "Un second marchand affiche : $1$ kg pour $3{,}20$ € ; $3$ kg pour $9$ € ; $5$ kg pour $14$ €. Ses prix sont-ils proportionnels aux masses ?", indice: "Calcule le prix d'un kilogramme dans chaque cas.", corrige: "Prix d'un kilogramme : $3{,}20$ € ; $9 \\div 3 = 3$ € ; $14 \\div 5 = 2{,}80$ €. Ces quotients sont différents : les prix ne sont pas proportionnels aux masses." },
          { n: "4.", points: 1.5, texte: "Chez quel marchand vaut-il mieux acheter $5$ kg de mangues ?", corrige: "Chez le premier : $15$ € ; chez le second : $14$ €. Il vaut mieux acheter $5$ kg chez le second marchand." }
        ]
      },
      {
        titre: "La course de pirogues",
        duree: 20, points: 7, calculatrice: true,
        contexte: "Lors d'une course de pirogues, l'équipe de Sada parcourt les $12$ km du parcours en $1$ h $15$ min.",
        questions: [
          { n: "1.", points: 1.5, texte: "Convertis $1$ h $15$ min en heures (écriture décimale).", corrige: "$15$ min $= \\dfrac{15}{60}$ h $= 0{,}25$ h, donc $1$ h $15$ min $= 1{,}25$ h." },
          { n: "2.", points: 2, texte: "Calcule la vitesse moyenne de l'équipe de Sada.", corrige: "$v = \\dfrac{12}{1{,}25} = 9{,}6$ km/h." },
          { n: "3.", points: 2, texte: "L'équipe adverse avance à $10$ km/h de moyenne. Combien de temps met-elle pour le même parcours ? Donne la réponse en heures et minutes.", corrige: "$t = \\dfrac{12}{10} = 1{,}2$ h. Or $0{,}2$ h $= 0{,}2 \\times 60 = 12$ min : elle met $1$ h $12$ min." },
          { n: "4.", points: 1.5, texte: "Quelle équipe arrive la première, et avec combien de minutes d'avance ?", corrige: "L'équipe adverse arrive la première, avec $15 - 12 = 3$ minutes d'avance." }
        ]
      },
      {
        titre: "Soldes, hausse et partage",
        duree: 15, points: 6, calculatrice: true,
        contexte: "Trois situations indépendantes.",
        questions: [
          { n: "1.", points: 2, texte: "Une tenue de sport coûte $65$ €. Elle est soldée à $-20\\,\\%$. Quel est son nouveau prix ?", corrige: "$65 \\times (1 - 0{,}20) = 65 \\times 0{,}8 = 52$ €." },
          { n: "2.", points: 2, texte: "Après une hausse de $15\\,\\%$, un ballon coûte $23$ €. Combien coûtait-il avant ?", indice: "On divise par le coefficient multiplicateur.", corrige: "$23 \\div 1{,}15 = 20$ €." },
          { n: "3.", points: 2, texte: "Deux frères se partagent $56$ € dans le ratio $3 : 5$. Combien chacun reçoit-il ?", corrige: "$3 + 5 = 8$ parts, et $56 \\div 8 = 7$ € par part : l'un reçoit $3 \\times 7 = 21$ €, l'autre $5 \\times 7 = 35$ €." }
        ]
      }
    ]
  }
};
