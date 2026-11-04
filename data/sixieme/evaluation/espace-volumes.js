/*
  ENTRAÎNEMENT : 6e — chapitre 14, Solides, vision dans l'espace et volumes
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre sixieme-espace-volumes.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 6e, sans calculatrice.
  Solides et dimensions différents de ceux du cours, de la méthode, du QCM et de l'entraînement de 5e.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["sixieme-espace-volumes"] = {
  revisions: {
    intro: "Les solides en un coup d'œil : les reconnaître, compter faces, arêtes et sommets, compter des cubes et calculer un volume en cm³. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Les solides usuels",
        texte: "Cube, pavé droit, prisme droit, cylindre, pyramide, cône et boule. Un cylindre a deux bases en forme de disque et une face courbe ; une pyramide a une base polygonale et un sommet."
      },
      {
        titre: "Faces, arêtes, sommets",
        texte: "Un pavé droit a $6$ faces rectangulaires, $12$ arêtes et $8$ sommets. Un prisme à base triangulaire a $5$ faces, $9$ arêtes et $6$ sommets."
      },
      {
        titre: "Perspective",
        texte: "Dans un dessin en perspective, les arêtes cachées sont tracées en pointillés."
      },
      {
        titre: "Le volume",
        texte: "Un centimètre cube (cm³) est le volume d'un cube de $1$ cm d'arête. Un pavé de $a$ cubes de long, $b$ de large et $c$ de haut contient $a \\times b \\times c$ cubes."
      }
    ],
    pieges: [
      "Oublier les cubes cachés derrière ou dessous dans un assemblage.",
      "Confondre une face (une surface) et une arête (un segment).",
      "Croire que deux solides de même volume ont la même forme.",
      "Compter deux fois les arêtes communes à deux faces.",
      "Confondre le patron d'un pavé et celui d'un cube."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Reconnaître les solides",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Réponds par une phrase.",
        questions: [
          { n: "1.", points: 2, texte: "Quel solide reconnais-tu dans une canette de soda ? un dé à jouer ? un ballon ? une tente canadienne, à deux pans ?", corrige: "Une canette : un cylindre. Un dé : un cube. Un ballon : une boule. Une tente à deux pans : un prisme droit à base triangulaire." },
          { n: "2.", points: 2, texte: "Combien un pavé droit a-t-il de faces, d'arêtes et de sommets ?", corrige: "$6$ faces, $12$ arêtes et $8$ sommets." },
          { n: "3.", points: 1.5, texte: "Et un prisme droit à base triangulaire ?", corrige: "$5$ faces (deux triangles et trois rectangles), $9$ arêtes et $6$ sommets." },
          { n: "4.", points: 1.5, texte: "Et une pyramide à base triangulaire ?", corrige: "$4$ faces (quatre triangles), $6$ arêtes et $4$ sommets." }
        ]
      },
      {
        titre: "Les cubes",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Un pavé droit est formé de cubes de $1$ cm³ : il mesure $6$ cubes de long, $3$ cubes de large et $2$ cubes de haut.",
        questions: [
          { n: "1.", points: 2, texte: "Quel est le volume de ce pavé ?", corrige: "$6 \\times 3 \\times 2 = 36$ cubes, soit $36$ cm³." },
          { n: "2.", points: 2, texte: "On enlève toute la couche du dessus. Quel est le volume du solide obtenu ?", corrige: "Il reste une couche de $6 \\times 3 = 18$ cubes : $18$ cm³." },
          { n: "3.", points: 1.5, texte: "Combien faut-il de cubes de $1$ cm³ pour former un cube de $3$ cm d'arête ?", corrige: "$3 \\times 3 \\times 3 = 27$ cubes." },
          { n: "4.", points: 1.5, texte: "Avec le pavé de départ, combien de cubes voit-on quand on le regarde de dessus ?", corrige: "On voit la face du dessus : $6 \\times 3 = 18$ cubes." }
        ]
      },
      {
        titre: "Le patron du cube",
        duree: 15, points: 6, calculatrice: false,
        contexte: "On construit un cube de $4$ cm d'arête en pliant un patron.",
        questions: [
          { n: "1.", points: 2, texte: "Combien de faces le patron comporte-t-il ? Quelle est leur forme ?", corrige: "$6$ faces, qui sont des carrés identiques de $4$ cm de côté." },
          { n: "2.", points: 2, texte: "Quelle est l'aire totale du patron, sans compter les languettes ?", corrige: "Une face : $4 \\times 4 = 16$ cm². Six faces : $6 \\times 16 = 96$ cm²." },
          { n: "3.", points: 2, texte: "Quel est le volume du cube ?", corrige: "$4 \\times 4 \\times 4 = 64$ cm³." }
        ]
      }
    ]
  }
};
