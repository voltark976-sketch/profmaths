/*
  ENTRAÎNEMENT : 6e — chapitre 11, Triangles
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre sixieme-triangles.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 6e, sans calculatrice.
  Longueurs et angles différents de ceux du cours, de la méthode, du QCM et de l'entraînement de 5e.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["sixieme-triangles"] = {
  revisions: {
    intro: "Les triangles en un coup d'œil : construction au compas, triangles particuliers, somme des angles et cercle circonscrit. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Construire un triangle",
        texte: "Avec trois longueurs, on trace le plus grand côté, puis deux arcs de cercle. Le triangle existe si le plus grand côté est plus petit que la somme des deux autres."
      },
      {
        titre: "Triangles particuliers",
        texte:
          "- isocèle : deux côtés de même longueur ;\n" +
          "- équilatéral : trois côtés de même longueur ;\n" +
          "- rectangle : un angle droit."
      },
      {
        titre: "La somme des angles",
        texte: "Dans tout triangle, la somme des trois angles vaut $180^\\circ$."
      },
      {
        titre: "Les angles des triangles particuliers",
        texte: "Dans un triangle isocèle, les deux angles à la base sont égaux ; dans un triangle équilatéral, chaque angle mesure $60^\\circ$ ; dans un triangle rectangle, les deux angles aigus ont pour somme $90^\\circ$."
      },
      {
        titre: "Le cercle circonscrit",
        texte: "C'est le cercle qui passe par les trois sommets. Son centre $O$ est à la même distance des trois sommets : il est sur les médiatrices des côtés."
      }
    ],
    pieges: [
      "Comparer le plus grand côté avec un seul des deux autres.",
      "Confondre l'angle au sommet et les angles à la base d'un triangle isocèle.",
      "Oublier que la somme des angles vaut $180^\\circ$, et non $360^\\circ$.",
      "Croire qu'un triangle équilatéral n'est pas isocèle : il l'est, et même de trois façons.",
      "Prendre pour rayon du cercle circonscrit la longueur d'un côté."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Construire ou pas ?",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Justifie chaque réponse.",
        questions: [
          { n: "1.", points: 2, texte: "Peut-on construire un triangle de côtés $7$ cm, $3$ cm et $5$ cm ?", corrige: "Le plus grand côté mesure $7$ cm, et $3 + 5 = 8 > 7$ : oui, on peut le construire." },
          { n: "2.", points: 2, texte: "Peut-on construire un triangle de côtés $2$ cm, $9$ cm et $6$ cm ?", corrige: "$2 + 6 = 8 < 9$ : non, les deux arcs ne se coupent pas." },
          { n: "3.", points: 1.5, texte: "Quelle est la nature d'un triangle de côtés $4$ cm, $4$ cm et $4$ cm ?", corrige: "Ses trois côtés ont la même longueur : il est équilatéral." },
          { n: "4.", points: 1.5, texte: "Quelle est la nature d'un triangle de côtés $5$ cm, $5$ cm et $8$ cm ?", corrige: "Deux côtés ont la même longueur : il est isocèle." }
        ]
      },
      {
        titre: "Les angles du triangle",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Écris les calculs.",
        questions: [
          { n: "1.", points: 2, texte: "Deux angles d'un triangle mesurent $52^\\circ$ et $71^\\circ$. Combien mesure le troisième ?", corrige: "$180 - 52 - 71 = 57^\\circ$." },
          { n: "2.", points: 2, texte: "Un triangle rectangle a un angle de $28^\\circ$. Combien mesure son troisième angle ?", corrige: "$180 - 90 - 28 = 62^\\circ$." },
          { n: "3.", points: 1.5, texte: "Un triangle isocèle a un angle au sommet de $64^\\circ$. Combien mesurent ses angles à la base ?", corrige: "$(180 - 64) \\div 2 = 58^\\circ$ chacun." },
          { n: "4.", points: 1.5, texte: "Un triangle isocèle a des angles à la base de $33^\\circ$. Combien mesure son angle au sommet ?", corrige: "$180 - 2 \\times 33 = 114^\\circ$." }
        ]
      },
      {
        titre: "Le cercle circonscrit",
        duree: 15, points: 6, calculatrice: false,
        contexte: "$O$ est le centre du cercle circonscrit au triangle $RST$, et $OR = 4{,}2$ cm.",
        questions: [
          { n: "1.", points: 2, texte: "Que valent $OS$ et $OT$ ?", corrige: "Le cercle passe par les trois sommets : $OS = OT = OR = 4{,}2$ cm." },
          { n: "2.", points: 2, texte: "Pourquoi le point $O$ est-il sur la médiatrice de $[RS]$ ?", corrige: "$OR = OS$ : $O$ est à la même distance de $R$ et de $S$, donc il est sur la médiatrice de $[RS]$." },
          { n: "3.", points: 2, texte: "Quel est le diamètre de ce cercle ?", corrige: "$2 \\times 4{,}2 = 8{,}4$ cm." }
        ]
      }
    ]
  }
};
