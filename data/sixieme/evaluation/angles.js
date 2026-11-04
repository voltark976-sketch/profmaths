/*
  ENTRAÎNEMENT : 6e — chapitre 10, Angles et bissectrice
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre sixieme-angles.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 6e, sans calculatrice.
  Mesures différentes de celles du cours, de la méthode, du QCM et de l'entraînement de 5e.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["sixieme-angles"] = {
  revisions: {
    intro: "Les angles en un coup d'œil : nommer, reconnaître, mesurer au rapporteur, calculer et utiliser une bissectrice. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Nommer un angle",
        texte: "L'angle de sommet $B$, dont les côtés passent par $A$ et $C$, se note $\\widehat{ABC}$ : la lettre du sommet est au milieu."
      },
      {
        titre: "La nature d'un angle",
        texte:
          "- aigu : entre $0^\\circ$ et $90^\\circ$ ;\n" +
          "- droit : $90^\\circ$ ;\n" +
          "- obtus : entre $90^\\circ$ et $180^\\circ$ ;\n" +
          "- plat : $180^\\circ$."
      },
      {
        titre: "Le rapporteur",
        texte: "On place le centre du rapporteur sur le sommet et le zéro sur un côté, puis on lit sur la graduation qui part de ce zéro. On vérifie avec la nature de l'angle : un angle aigu ne peut pas mesurer $120^\\circ$."
      },
      {
        titre: "Calculer des angles",
        texte: "Deux angles adjacents s'additionnent ; deux angles supplémentaires ont une somme de $180^\\circ$ ; deux angles opposés par le sommet sont égaux ; un tour complet fait $360^\\circ$."
      },
      {
        titre: "La bissectrice",
        texte: "La bissectrice d'un angle le partage en deux angles égaux : chacun mesure la moitié de l'angle."
      }
    ],
    pieges: [
      "Mettre la lettre du sommet au début ou à la fin du nom de l'angle.",
      "Lire sur la mauvaise graduation du rapporteur.",
      "Croire qu'un angle est plus grand parce que ses côtés sont plus longs.",
      "Oublier qu'un tour complet fait $360^\\circ$, et un angle plat $180^\\circ$.",
      "Doubler au lieu de partager en deux avec une bissectrice."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Nature et mesure",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Justifie chaque réponse.",
        questions: [
          { n: "1.", points: 2, texte: "Donne la nature des angles de $48^\\circ$, $90^\\circ$, $152^\\circ$ et $180^\\circ$.", corrige: "$48^\\circ$ : aigu ; $90^\\circ$ : droit ; $152^\\circ$ : obtus ; $180^\\circ$ : plat." },
          { n: "2.", points: 2, texte: "Pour un angle obtus, Samia lit sur son rapporteur les nombres $70$ et $110$. Quelle est la mesure de l'angle ?", corrige: "Un angle obtus mesure plus de $90^\\circ$ : c'est $110^\\circ$." },
          { n: "3.", points: 1.5, texte: "Un angle aigu peut-il mesurer $95^\\circ$ ?", corrige: "Non : un angle aigu mesure moins de $90^\\circ$, et $95^\\circ$ est un angle obtus." },
          { n: "4.", points: 1.5, texte: "Écris le nom de l'angle de sommet $K$ dont les côtés passent par $J$ et par $L$.", corrige: "$\\widehat{JKL}$ (ou $\\widehat{LKJ}$) : la lettre du sommet $K$ est au milieu." }
        ]
      },
      {
        titre: "Calculer des angles",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Écris les calculs.",
        questions: [
          { n: "1.", points: 2, texte: "Deux angles adjacents mesurent $47^\\circ$ et $68^\\circ$. Quelle est la mesure de l'angle qu'ils forment ensemble ?", corrige: "$47 + 68 = 115^\\circ$." },
          { n: "2.", points: 2, texte: "Deux angles sont supplémentaires. L'un mesure $72^\\circ$. Combien mesure l'autre ?", corrige: "$180 - 72 = 108^\\circ$." },
          { n: "3.", points: 1.5, texte: "Deux droites sécantes forment un angle de $63^\\circ$. Quelles sont les mesures des trois autres angles ?", indice: "Pense aux angles opposés par le sommet et aux angles supplémentaires.", corrige: "L'angle opposé par le sommet mesure aussi $63^\\circ$ ; les deux autres mesurent $180 - 63 = 117^\\circ$." },
          { n: "4.", points: 1.5, texte: "Autour d'un point, trois angles forment un tour complet. Deux d'entre eux mesurent $120^\\circ$ et $95^\\circ$. Combien mesure le troisième ?", corrige: "$360 - 120 - 95 = 145^\\circ$." }
        ]
      },
      {
        titre: "La bissectrice",
        duree: 15, points: 6, calculatrice: false,
        contexte: "$[Ou)$ est la bissectrice de l'angle $\\widehat{xOy}$.",
        questions: [
          { n: "1.", points: 2, texte: "$\\widehat{xOy} = 104^\\circ$. Combien mesure $\\widehat{xOu}$ ?", corrige: "$104 \\div 2 = 52^\\circ$." },
          { n: "2.", points: 2, texte: "On sait maintenant que $\\widehat{xOu} = 28^\\circ$. Combien mesure $\\widehat{xOy}$ ?", corrige: "$\\widehat{xOy} = 2 \\times 28 = 56^\\circ$." },
          { n: "3.", points: 2, texte: "On trace la bissectrice d'un angle droit. Combien mesurent les deux angles obtenus ?", corrige: "$90 \\div 2 = 45^\\circ$ chacun." }
        ]
      }
    ]
  }
};
