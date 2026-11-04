/*
  ENTRAÎNEMENT : 5e — chapitre 17, Solides et volumes
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre cinquieme-solides-volumes.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 5e.
  Dimensions différentes de celles du cours, de la méthode, du QCM et des entraînements de 4e et de 3e.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["cinquieme-solides-volumes"] = {
  revisions: {
    intro: "Les solides et les volumes en un coup d'œil : perspective, patrons, volumes du pavé, du prisme et du cylindre, et unités. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Perspective cavalière",
        texte: "Les arêtes cachées sont dessinées en pointillés ; les faces avant gardent leur forme, les arêtes « en profondeur » sont raccourcies et dessinées en biais."
      },
      {
        titre: "Patrons",
        texte: "Un patron est un dessin à plat qu'on peut plier pour fabriquer le solide : $6$ rectangles pour un pavé, $2$ bases et des rectangles pour un prisme, $2$ disques et un rectangle pour un cylindre."
      },
      {
        titre: "Volumes",
        texte:
          "- pavé droit : longueur $\\times$ largeur $\\times$ hauteur ;\n" +
          "- prisme droit : aire de la base $\\times$ hauteur ;\n" +
          "- cylindre : $\\pi \\times r \\times r \\times h$."
      },
      {
        titre: "Unités",
        texte: "$1$ m³ $= 1\\,000$ dm³ et $1$ dm³ $= 1\\,000$ cm³. Pour les liquides : $1$ dm³ $= 1$ L et $1$ cm³ $= 1$ mL."
      }
    ],
    pieges: [
      "Convertir les volumes avec des facteurs $10$ ou $100$ au lieu de $1\\,000$.",
      "Oublier de mettre toutes les longueurs dans la même unité.",
      "Prendre le diamètre au lieu du rayon pour un cylindre.",
      "Confondre l'aire d'une face et le volume du solide.",
      "Oublier une face dans un patron."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Calculer des volumes",
        duree: 15, points: 7, calculatrice: true,
        contexte: "Écris la formule, puis le calcul.",
        questions: [
          { n: "1.", points: 1.5, texte: "Calcule le volume d'un cube de $6$ cm d'arête.", corrige: "$6 \\times 6 \\times 6 = 216$ cm³." },
          { n: "2.", points: 1.5, texte: "Calcule le volume d'un pavé droit de $8$ cm sur $5$ cm sur $3{,}5$ cm.", corrige: "$8 \\times 5 \\times 3{,}5 = 140$ cm³." },
          { n: "3.", points: 2, texte: "Un prisme droit a pour base un triangle rectangle dont les côtés de l'angle droit mesurent $6$ cm et $5$ cm, et une hauteur de $10$ cm. Calcule son volume.", indice: "Calcule d'abord l'aire du triangle de base.", corrige: "Aire de la base : $\\dfrac{6 \\times 5}{2} = 15$ cm². Volume : $15 \\times 10 = 150$ cm³." },
          { n: "4.", points: 2, texte: "Calcule le volume d'un cylindre de rayon $3$ cm et de hauteur $8$ cm : donne la valeur exacte, puis une valeur arrondie au cm³.", corrige: "$\\pi \\times 3 \\times 3 \\times 8 = 72\\pi \\approx 226$ cm³." }
        ]
      },
      {
        titre: "La citerne",
        duree: 15, points: 7, calculatrice: true,
        contexte: "Pour récupérer l'eau de pluie, une famille installe une citerne en forme de cylindre de $0{,}8$ m de rayon et de $1{,}5$ m de hauteur.",
        questions: [
          { n: "1.", points: 2, texte: "Calcule le volume de la citerne en m³, arrondi au centième.", corrige: "$\\pi \\times 0{,}8 \\times 0{,}8 \\times 1{,}5 = 0{,}96\\pi \\approx 3{,}02$ m³." },
          { n: "2.", points: 2, texte: "Combien de litres d'eau contient-elle quand elle est pleine ? Arrondis au litre.", indice: "$1$ m³ $= 1\\,000$ L.", corrige: "$0{,}96\\pi$ m³ $\\approx 3{,}016$ m³, soit environ $3\\,016$ L." },
          { n: "3.", points: 1.5, texte: "Combien de litres contient-elle quand elle est remplie aux trois quarts ?", corrige: "$\\dfrac{3}{4}$ de $3\\,016$ L : environ $2\\,262$ L." },
          { n: "4.", points: 1.5, texte: "La famille utilise $120$ L d'eau de pluie par jour. Combien de jours complets peut-elle tenir avec la citerne pleine, sans pluie ?", corrige: "$3\\,016 \\div 120 \\approx 25{,}1$ : elle peut tenir $25$ jours complets." }
        ]
      },
      {
        titre: "Le patron du pavé",
        duree: 15, points: 6, calculatrice: false,
        contexte: "On veut fabriquer une boîte en carton en forme de pavé droit de $5$ cm de long, $3$ cm de large et $2$ cm de haut.",
        questions: [
          { n: "1.", points: 2, texte: "Combien de faces le patron comporte-t-il ? Donne leurs dimensions.", corrige: "$6$ faces rectangulaires : deux de $5$ cm sur $3$ cm, deux de $5$ cm sur $2$ cm et deux de $3$ cm sur $2$ cm." },
          { n: "2.", points: 2, texte: "Quelle est l'aire totale du patron, sans compter les languettes de collage ?", corrige: "$2 \\times 15 + 2 \\times 10 + 2 \\times 6 = 30 + 20 + 12 = 62$ cm²." },
          { n: "3.", points: 2, texte: "Quel est le volume de la boîte ?", corrige: "$5 \\times 3 \\times 2 = 30$ cm³." }
        ]
      }
    ]
  }
};
