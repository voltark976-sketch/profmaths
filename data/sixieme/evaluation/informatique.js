/*
  ENTRAÎNEMENT : 6e — chapitre 15, Initiation à la pensée informatique
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre sixieme-informatique.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 6e, sans calculatrice.
  Quadrillage dessiné par o.figGeo (assets/exercices-base.js). Programmes différents de ceux du cours, de la méthode, du QCM
  et des entraînements de 5e, 4e et 3e.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["sixieme-informatique"] = {
  revisions: {
    intro: "La pensée informatique en un coup d'œil : instructions, entrée et sortie, codes de déplacement, robot qui tourne et boucles. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Un programme",
        texte: "C'est une suite d'instructions exécutées dans l'ordre. L'entrée est la donnée qu'on lui fournit, la sortie est le résultat qu'il affiche."
      },
      {
        titre: "Codes de flèches",
        texte: "Sur un quadrillage, chaque flèche fait avancer d'une case dans sa direction : $\\uparrow$ vers le haut, $\\rightarrow$ vers la droite… L'ordre des flèches compte."
      },
      {
        titre: "Un robot qui tourne",
        texte: "« avancer » fait avancer le robot d'une case dans la direction où il regarde ; « tourner à droite » ou « tourner à gauche » change seulement sa direction, sans le déplacer."
      },
      {
        titre: "La boucle « répéter »",
        texte: "« répéter $3$ fois ( $\\rightarrow$ $\\uparrow$ ) » remplace $\\rightarrow \\uparrow \\rightarrow \\uparrow \\rightarrow \\uparrow$ : les instructions entre parenthèses sont faites $3$ fois."
      }
    ],
    pieges: [
      "Exécuter les instructions dans le désordre.",
      "Croire que « tourner » fait aussi avancer le robot.",
      "Confondre la gauche et la droite du robot quand il regarde vers le bas.",
      "Compter une répétition de trop, ou de moins.",
      "Confondre l'entrée et la sortie d'un programme."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Exécuter un programme",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Voici un programme :\n\n```scratch\ndemander un nombre\nle multiplier par 2\najouter 7\nafficher le résultat\n```",
        questions: [
          { n: "1.", points: 2, texte: "Qu'affiche le programme si l'on donne le nombre $5$ ?", corrige: "$5 \\times 2 = 10$, puis $10 + 7 = 17$ : il affiche $17$." },
          { n: "2.", points: 1.5, texte: "Et si l'on donne $0$ ?", corrige: "$0 \\times 2 = 0$, puis $0 + 7 = 7$ : il affiche $7$." },
          { n: "3.", points: 2, texte: "Quel nombre faut-il donner pour que le programme affiche $25$ ?", indice: "Remonte le programme avec les opérations inverses.", corrige: "$25 - 7 = 18$, puis $18 \\div 2 = 9$ : il faut donner $9$." },
          { n: "4.", points: 1.5, texte: "On échange les deux instructions du milieu (on ajoute $7$, puis on multiplie par $2$). Qu'affiche-t-il alors avec $5$ ?", corrige: "$5 + 7 = 12$, puis $12 \\times 2 = 24$ : l'ordre des instructions change le résultat." }
        ]
      },
      {
        titre: "Le robot sur le quadrillage",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Les colonnes du quadrillage sont notées de A à F, les lignes de $1$ à $5$. Chaque flèche fait avancer le robot d'une case.",
        figure: (o) => {
          const x0 = 50, y0 = 10, c = 40, pts = { R: [x0 + c * 1.5, y0 + c * 3.5] }, textes = [];
          "ABCDEF".split("").forEach((l, i) => textes.push([x0 + c * (i + 0.5), y0 + 5 * c + 16, l, "middle", "g-clabel"]));
          for (let j = 1; j <= 5; j++) textes.push([x0 - 10, y0 + c * (5 - j + 0.5) + 5, String(j), "end", "g-clabel"]);
          return o.figGeo({ W: 320, H: 236, grille: [x0, y0, c, 6, 5], pts, cercles: [["R", 12]], textes, sansPoint: ["R"], aria: "Quadrillage de 6 colonnes (A à F) et 5 lignes (1 à 5) ; le robot est dans la case B2" });
        },
        questions: [
          { n: "1.", points: 2.5, texte: "Le robot est en B2. Où arrive-t-il avec le code $\\uparrow \\uparrow \\rightarrow \\rightarrow \\downarrow$ ?", corrige: "B2 $\\to$ B3 $\\to$ B4 $\\to$ C4 $\\to$ D4 $\\to$ D3 : il arrive en D3." },
          { n: "2.", points: 2, texte: "Écris un code de flèches pour aller de A1 à E3.", corrige: "Par exemple $\\rightarrow \\rightarrow \\rightarrow \\rightarrow \\uparrow \\uparrow$ : $4$ cases vers la droite (de A à E), puis $2$ vers le haut (de $1$ à $3$)." },
          { n: "3.", points: 2.5, texte: "Le robot est en A1. Où arrive-t-il avec « répéter $3$ fois ( $\\rightarrow$ $\\uparrow$ ) » ?", corrige: "Le code revient à $\\rightarrow \\uparrow \\rightarrow \\uparrow \\rightarrow \\uparrow$ : A1 $\\to$ B1 $\\to$ B2 $\\to$ C2 $\\to$ C3 $\\to$ D3 $\\to$ D4. Il arrive en D4." }
        ]
      },
      {
        titre: "Le lutin et le carré",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Voici un programme pour un lutin qui trace :\n\n```scratch\nstylo en position d'écriture\nrépéter 4 fois\n  avancer de 50 pas\n  tourner à droite de 90°\nfin\n```",
        questions: [
          { n: "1.", points: 2, texte: "Quelle figure le lutin trace-t-il ?", corrige: "Un carré de $50$ pas de côté : quatre côtés égaux et quatre angles droits." },
          { n: "2.", points: 2, texte: "Quelle longueur totale trace-t-il ?", corrige: "$4 \\times 50 = 200$ pas." },
          { n: "3.", points: 2, texte: "Écris un programme qui trace un rectangle de $80$ pas sur $40$ pas.", corrige: "Par exemple : répéter $2$ fois ( avancer de $80$ pas ; tourner à droite de $90^\\circ$ ; avancer de $40$ pas ; tourner à droite de $90^\\circ$ )." }
        ]
      }
    ]
  }
};
