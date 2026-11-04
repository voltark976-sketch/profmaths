/*
  ENTRAÎNEMENT : 6e — chapitre 13, Longueurs, périmètres et aires
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre sixieme-perimetres-aires.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 6e, sans calculatrice.
  Figure dessinée par o.figGeo (assets/exercices-base.js). Dimensions différentes de celles du cours, de la méthode,
  du QCM et de l'entraînement de 5e.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["sixieme-perimetres-aires"] = {
  revisions: {
    intro: "Longueurs, périmètres et aires en un coup d'œil : conversions, périmètre d'un polygone et d'un cercle, aire du carré et du rectangle. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Unités de longueur",
        texte: "km, hm, dam, m, dm, cm, mm : on passe d'une unité à la suivante en multipliant ou en divisant par $10$. $1$ km $= 1\\,000$ m et $1$ m $= 100$ cm."
      },
      {
        titre: "Périmètre",
        texte: "C'est la longueur du contour. Rectangle : $2 \\times (L + \\ell)$ ; carré : $4 \\times c$."
      },
      {
        titre: "Périmètre d'un cercle",
        texte: "$\\pi \\times$ diamètre, avec $\\pi \\approx 3{,}14$ : un cercle de diamètre $10$ cm mesure environ $31{,}4$ cm de tour."
      },
      {
        titre: "Unités d'aire",
        texte: "$1$ m² $= 100$ dm² et $1$ dm² $= 100$ cm² : pour les aires, on multiplie ou on divise par $100$."
      },
      {
        titre: "Aires du carré et du rectangle",
        texte: "Rectangle : $L \\times \\ell$ ; carré : $c \\times c$. Pour une figure composée, on découpe ou on retire des rectangles."
      }
    ],
    pieges: [
      "Confondre périmètre (une longueur, en m) et aire (une surface, en m²).",
      "Utiliser des facteurs $10$ pour convertir des aires.",
      "Prendre le rayon au lieu du diamètre dans $\\pi \\times d$.",
      "Additionner des longueurs exprimées dans des unités différentes.",
      "Croire qu'en retirant un coin d'un rectangle, on diminue toujours son périmètre."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Conversions et rectangle",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Écris les calculs.",
        questions: [
          { n: "1.", points: 2, texte: "Convertis $2{,}8$ km en m, $450$ cm en m et $65$ mm en cm.", corrige: "$2{,}8$ km $= 2\\,800$ m ; $450$ cm $= 4{,}5$ m ; $65$ mm $= 6{,}5$ cm." },
          { n: "2.", points: 2, texte: "Convertis $4$ m² en dm² et $900$ cm² en dm².", corrige: "$4$ m² $= 400$ dm² et $900$ cm² $= 9$ dm²." },
          { n: "3.", points: 1.5, texte: "Calcule le périmètre d'un rectangle de $12$ cm sur $7{,}5$ cm.", corrige: "$2 \\times (12 + 7{,}5) = 2 \\times 19{,}5 = 39$ cm." },
          { n: "4.", points: 1.5, texte: "Calcule l'aire de ce rectangle.", corrige: "$12 \\times 7{,}5 = 90$ cm²." }
        ]
      },
      {
        titre: "Le cercle et la roue",
        duree: 15, points: 7, calculatrice: false,
        contexte: "On prend $\\pi \\approx 3{,}14$.",
        questions: [
          { n: "1.", points: 2, texte: "Calcule le périmètre d'un cercle de rayon $5$ cm.", corrige: "Diamètre : $10$ cm, donc périmètre : $3{,}14 \\times 10 = 31{,}4$ cm." },
          { n: "2.", points: 2.5, texte: "Une roue de vélo a un diamètre de $60$ cm. Quelle distance parcourt-elle en un tour ? En $100$ tours, en mètres ?", corrige: "Un tour : $3{,}14 \\times 60 = 188{,}4$ cm. En $100$ tours : $18\\,840$ cm, soit $188{,}4$ m." },
          { n: "3.", points: 2.5, texte: "Calcule le périmètre et l'aire d'un carré de $6{,}5$ cm de côté.", corrige: "Périmètre : $4 \\times 6{,}5 = 26$ cm. Aire : $6{,}5 \\times 6{,}5 = 42{,}25$ cm²." }
        ]
      },
      {
        titre: "Le jardin en L",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Un jardin a la forme d'un rectangle de $10$ m sur $7$ m dont on a retiré, dans un coin, un rectangle de $4$ m sur $3$ m (la maison).",
        figure: (o) => o.figGeo({
          W: 320, H: 180,
          pts: { A: [60, 160], B: [260, 160], C: [260, 80], D: [180, 80], E: [180, 20], F: [60, 20] },
          polys: [["A", "B", "C", "D", "E", "F"]],
          cotes: [["A", "B", "10 m", "E"], ["F", "A", "7 m", "B"], ["D", "C", "4 m", "A"], ["C", "B", "4 m", "A"]],
          textes: [[220, 54, "maison", "middle"]],
          sansPoint: ["A", "B", "C", "D", "E", "F"],
          aria: "Jardin en forme de L : un rectangle de 10 m sur 7 m auquel on a retiré un rectangle de 4 m sur 3 m dans le coin en haut à droite"
        }),
        questions: [
          { n: "1.", points: 2, texte: "Calcule l'aire du jardin.", corrige: "$10 \\times 7 - 4 \\times 3 = 70 - 12 = 58$ m²." },
          { n: "2.", points: 2, texte: "Calcule le périmètre du jardin.", indice: "Ajoute toutes les longueurs du contour : il y a six côtés.", corrige: "$10 + 4 + 4 + 3 + 6 + 7 = 34$ m. C'est aussi le périmètre du grand rectangle : en retirant le coin, on a seulement déplacé deux côtés." },
          { n: "3.", points: 2, texte: "On veut clôturer tout le tour du jardin avec un grillage à $4$ € le mètre. Combien cela coûte-t-il ?", corrige: "$34 \\times 4 = 136$ €." }
        ]
      }
    ]
  }
};
