/*
  ENTRAÎNEMENT : 5e — chapitre 4, Proportionnalité et pourcentages
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre cinquieme-proportionnalite.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 5e, sans calculatrice.
  Données fictives, différentes de celles du cours, de la méthode, du QCM et des entraînements de 6e et de 4e.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["cinquieme-proportionnalite"] = {
  revisions: {
    intro: "La proportionnalité en un coup d'œil : la reconnaître, compléter un tableau, calculer une vitesse, un pourcentage ou une distance sur une carte. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Reconnaître la proportionnalité",
        texte: "Deux grandeurs sont proportionnelles si l'on passe de l'une à l'autre en multipliant toujours par le même nombre, le coefficient de proportionnalité."
      },
      {
        titre: "Compléter un tableau",
        texte: "On multiplie par le coefficient, ou on utilise les colonnes : si $3$ objets coûtent $7$ €, $6$ objets coûtent $14$ € (le double) et $9$ objets $21$ € ($3 + 6$)."
      },
      {
        titre: "Vitesse moyenne",
        texte: "Elle est proportionnelle à la distance parcourue en un temps donné : à $40$ km/h, on parcourt $40$ km en $1$ h, $20$ km en $30$ min, $10$ km en $15$ min."
      },
      {
        titre: "Pourcentages",
        texte: "Prendre $t\\,\\%$ d'une quantité, c'est la multiplier par $t$, puis diviser par $100$ : $15\\,\\%$ de $80$, c'est $80 \\times 15 \\div 100 = 12$."
      },
      {
        titre: "Échelles",
        texte: "Sur une carte à l'échelle $\\dfrac{1}{50\\,000}$, $1$ cm représente $50\\,000$ cm, soit $500$ m dans la réalité."
      }
    ],
    pieges: [
      "Croire qu'une situation est proportionnelle parce que les deux grandeurs augmentent ensemble : l'âge et la taille ne le sont pas.",
      "Ajouter un même nombre au lieu de multiplier pour compléter un tableau.",
      "Oublier de convertir : $20$ min, c'est le tiers d'une heure.",
      "Confondre « baisser de $20\\,\\%$ » et « payer $20\\,\\%$ du prix ».",
      "Oublier de convertir les centimètres de l'échelle en mètres ou en kilomètres."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le gâteau à la banane",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Pour $8$ personnes, une recette de gâteau à la banane demande $400$ g de farine, $6$ œufs, $240$ g de sucre et $4$ bananes. Les quantités sont proportionnelles au nombre de personnes.",
        questions: [
          {
            n: "1.", points: 2, texte: "Complète le tableau pour $12$ personnes.",
            tableau: { lignes: [["\\text{Personnes}", "8", "12"], ["\\text{Farine (g)}", "400", "?"], ["\\text{Œufs}", "6", "?"], ["\\text{Sucre (g)}", "240", "?"], ["\\text{Bananes}", "4", "?"]] },
            indice: "$12$, c'est $8$ plus la moitié de $8$.",
            corrige: "Pour $12$ personnes, on multiplie par $1{,}5$ : $600$ g de farine, $9$ œufs, $360$ g de sucre et $6$ bananes.",
            tableauCorrige: { lignes: [["\\text{Personnes}", "8", "12"], ["\\text{Farine (g)}", "400", "600"], ["\\text{Œufs}", "6", "9"], ["\\text{Sucre (g)}", "240", "360"], ["\\text{Bananes}", "4", "6"]] }
          },
          { n: "2.", points: 2, texte: "Quelles quantités faut-il pour $4$ personnes ?", corrige: "C'est la moitié de la recette : $200$ g de farine, $3$ œufs, $120$ g de sucre et $2$ bananes." },
          { n: "3.", points: 1.5, texte: "Avec $1$ kg de farine, pour combien de personnes au plus peut-on faire ce gâteau ?", corrige: "$400$ g pour $8$ personnes, donc $50$ g par personne. Avec $1\\,000$ g : $1\\,000 \\div 50 = 20$ personnes." },
          { n: "4.", points: 1.5, texte: "Quelle masse de sucre faut-il par personne ?", corrige: "$240 \\div 8 = 30$ g de sucre par personne : c'est le coefficient de proportionnalité." }
        ]
      },
      {
        titre: "Des pourcentages",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Quatre situations indépendantes.",
        questions: [
          { n: "1.", points: 2, texte: "Calcule $20\\,\\%$ de $65$ €. Un sac de riz de $25$ € est soldé à $-20\\,\\%$ : quel est son nouveau prix ?", corrige: "$65 \\times 20 \\div 100 = 13$ €.\n\nRéduction : $25 \\times 20 \\div 100 = 5$ €, donc le sac coûte $25 - 5 = 20$ €." },
          { n: "2.", points: 2, texte: "Sur les $240$ élèves d'un collège, $35\\,\\%$ viennent à pied. Combien d'élèves viennent à pied ?", corrige: "$240 \\times 35 \\div 100 = 84$ élèves." },
          { n: "3.", points: 1.5, texte: "Dans un collège de $600$ élèves, $150$ mangent à la cantine. Quel pourcentage des élèves cela représente-t-il ?", corrige: "$\\dfrac{150}{600} = \\dfrac{1}{4} = \\dfrac{25}{100}$, soit $25\\,\\%$ des élèves." },
          { n: "4.", points: 1.5, texte: "Un tee-shirt à $18$ € augmente de $10\\,\\%$. Quel est son nouveau prix ?", corrige: "Hausse : $18 \\times 10 \\div 100 = 1{,}80$ €, donc le nouveau prix est $19{,}80$ €." }
        ]
      },
      {
        titre: "La carte et le bus",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Sur une carte à l'échelle $\\dfrac{1}{200\\,000}$, deux villages sont à $6$ cm l'un de l'autre.",
        questions: [
          { n: "1.", points: 2, texte: "Quelle est la distance réelle entre les deux villages, en km ?", indice: "$1$ km $= 100\\,000$ cm.", corrige: "$6 \\times 200\\,000 = 1\\,200\\,000$ cm, soit $12$ km." },
          { n: "2.", points: 2, texte: "Un bus relie les deux villages en $20$ minutes. Quelle est sa vitesse moyenne, en km/h ?", corrige: "$20$ min, c'est le tiers d'une heure : en $1$ h, le bus parcourrait $3 \\times 12 = 36$ km. Sa vitesse moyenne est $36$ km/h." },
          { n: "3.", points: 2, texte: "À cette vitesse, combien de temps le bus met-il pour parcourir $30$ km ?", corrige: "Le bus parcourt $12$ km en $20$ min, donc $6$ km en $10$ min, et $30$ km en $5 \\times 10 = 50$ minutes." }
        ]
      }
    ]
  }
};
