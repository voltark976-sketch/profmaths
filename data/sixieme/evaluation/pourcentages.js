/*
  ENTRAÎNEMENT : 6e — chapitre 6, Pourcentages
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre sixieme-pourcentages.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 6e, sans calculatrice.
  Nombres différents de ceux du cours, de la méthode, du QCM et de l'entraînement de 5e.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["sixieme-pourcentages"] = {
  revisions: {
    intro: "Les pourcentages en un coup d'œil : ce que veut dire « pour cent », les écritures, les calculs de tête et les problèmes. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Pour cent",
        texte: "$t\\,\\%$ signifie « $t$ sur $100$ » : $15\\,\\% = \\dfrac{15}{100} = 0{,}15$."
      },
      {
        titre: "Des pourcentages à connaître",
        texte: "$50\\,\\%$, c'est la moitié ; $25\\,\\%$, le quart ; $75\\,\\%$, les trois quarts ; $10\\,\\%$, le dixième ; $100\\,\\%$, le tout."
      },
      {
        titre: "Appliquer un pourcentage",
        texte: "$t\\,\\%$ d'une quantité, c'est la quantité multipliée par $t$, puis divisée par $100$ : $30\\,\\%$ de $60$ €, c'est $60 \\times 30 \\div 100 = 18$ €."
      },
      {
        titre: "Calculer de tête",
        texte: "On passe par $10\\,\\%$ : $10\\,\\%$ de $70$ font $7$, donc $30\\,\\%$ font $21$ et $5\\,\\%$ font $3{,}5$."
      },
      {
        titre: "Exprimer en pourcentage",
        texte: "On écrit la proportion avec le dénominateur $100$ : $\\dfrac{13}{20} = \\dfrac{65}{100} = 65\\,\\%$."
      }
    ],
    pieges: [
      "Croire que $10\\,\\%$ d'un prix se calcule en retirant $10$ €.",
      "Confondre $5\\,\\%$ et $0{,}5$ : $5\\,\\% = 0{,}05$.",
      "Oublier qu'après une remise, il faut retirer la remise du prix de départ.",
      "Croire qu'un pourcentage ne peut pas dépasser $100\\,\\%$ : $200\\,\\%$ de $3$, c'est $6$.",
      "Calculer le pourcentage de la mauvaise quantité."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Les écritures",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Écris les réponses demandées.",
        questions: [
          { n: "1.", points: 2, texte: "Écris sous forme décimale : $9\\,\\%$ ; $60\\,\\%$ ; $150\\,\\%$.", corrige: "$9\\,\\% = 0{,}09$ ; $60\\,\\% = 0{,}6$ ; $150\\,\\% = 1{,}5$." },
          { n: "2.", points: 2, texte: "Écris en pourcentage : $0{,}35$ ; $\\dfrac{3}{4}$ ; $\\dfrac{1}{5}$.", corrige: "$0{,}35 = 35\\,\\%$ ; $\\dfrac{3}{4} = \\dfrac{75}{100} = 75\\,\\%$ ; $\\dfrac{1}{5} = \\dfrac{20}{100} = 20\\,\\%$." },
          { n: "3.", points: 1.5, texte: "Un grand carré est partagé en $100$ petits carrés, dont $36$ sont coloriés. Quel pourcentage du grand carré est colorié ?", corrige: "$36$ sur $100$ : $36\\,\\%$." },
          { n: "4.", points: 1.5, texte: "Range dans l'ordre croissant : $0{,}4$ ; $45\\,\\%$ ; $\\dfrac{3}{10}$.", corrige: "$\\dfrac{3}{10} = 30\\,\\%$ et $0{,}4 = 40\\,\\%$, donc $\\dfrac{3}{10} < 0{,}4 < 45\\,\\%$." }
        ]
      },
      {
        titre: "De tête",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Calcule de tête, en écrivant ta démarche.",
        questions: [
          { n: "1.", points: 2, texte: "$10\\,\\%$ de $70$ € ; $50\\,\\%$ de $90$ m.", corrige: "$70 \\div 10 = 7$ € ; $90 \\div 2 = 45$ m." },
          { n: "2.", points: 2, texte: "$25\\,\\%$ de $60$ élèves ; $75\\,\\%$ de $60$ élèves.", corrige: "Le quart de $60$ : $15$ élèves ; les trois quarts : $3 \\times 15 = 45$ élèves." },
          { n: "3.", points: 1.5, texte: "$20\\,\\%$ de $35$ kg.", indice: "Calcule d'abord $10\\,\\%$.", corrige: "$10\\,\\%$ de $35$ font $3{,}5$, donc $20\\,\\%$ font $7$ kg." },
          { n: "4.", points: 1.5, texte: "$5\\,\\%$ de $80$ L.", corrige: "$10\\,\\%$ de $80$ font $8$, donc $5\\,\\%$ font la moitié : $4$ L." }
        ]
      },
      {
        titre: "Des problèmes",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Trois situations indépendantes.",
        questions: [
          { n: "1.", points: 2, texte: "Dans une classe de $25$ élèves, $40\\,\\%$ ont un vélo. Combien d'élèves ont un vélo ?", corrige: "$25 \\times 40 \\div 100 = 10$ élèves." },
          { n: "2.", points: 2, texte: "Sur $80$ graines plantées, $68$ ont germé. Quel pourcentage des graines a germé ?", corrige: "$\\dfrac{68}{80} = \\dfrac{85}{100}$ (on divise par $4$, puis on multiplie par $5$) : $85\\,\\%$ des graines ont germé." },
          { n: "3.", points: 2, texte: "Un sac à dos coûte $30$ €. Il est soldé à $-20\\,\\%$. Quel est son nouveau prix ?", corrige: "Remise : $20\\,\\%$ de $30$ € $= 6$ €. Nouveau prix : $30 - 6 = 24$ €." }
        ]
      }
    ]
  }
};
