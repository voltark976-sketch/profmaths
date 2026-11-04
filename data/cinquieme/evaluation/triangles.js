/*
  ENTRAÎNEMENT : 5e — chapitre 2, Triangles
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre cinquieme-triangles.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 5e, sans calculatrice.
  Figure dessinée par o.figGeo (assets/exercices-base.js). Longueurs et aires différentes de celles du cours, de la méthode et du QCM.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["cinquieme-triangles"] = {
  revisions: {
    intro: "Les triangles en un coup d'œil : savoir s'ils sont constructibles, puis médiatrices, cercle circonscrit, hauteurs et médianes. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Inégalité triangulaire",
        texte: "On peut construire un triangle si le plus grand côté est plus petit que la somme des deux autres. En cas d'égalité, les trois points sont alignés : le triangle est aplati."
      },
      {
        titre: "Construire un triangle",
        texte:
          "On peut le construire si l'on connaît :\n" +
          "- ses trois longueurs (inégalité triangulaire) ;\n" +
          "- deux longueurs et l'angle compris entre elles ;\n" +
          "- une longueur et les deux angles qui la bordent, de somme inférieure à $180^\\circ$."
      },
      {
        titre: "Médiatrice",
        texte: "La médiatrice d'un segment est la droite perpendiculaire à ce segment en son milieu. Un point est sur la médiatrice de $[AB]$ quand il est à la même distance de $A$ et de $B$."
      },
      {
        titre: "Cercle circonscrit",
        texte: "Les trois médiatrices d'un triangle se coupent au centre du cercle qui passe par les trois sommets. Dans un triangle rectangle, ce centre est le milieu de l'hypoténuse."
      },
      {
        titre: "Hauteur",
        texte: "La hauteur issue de $A$ est la droite qui passe par $A$ et qui est perpendiculaire au côté opposé, $(BC)$. Elle sert à calculer l'aire : $\\dfrac{\\text{base} \\times \\text{hauteur}}{2}$."
      },
      {
        titre: "Médiane",
        texte: "La médiane issue de $A$ passe par $A$ et par le milieu du côté opposé. Elle partage le triangle en deux triangles de même aire."
      }
    ],
    pieges: [
      "Tester l'inégalité triangulaire avec un autre côté que le plus grand.",
      "Confondre la hauteur (perpendiculaire au côté) et la médiane (qui passe par son milieu).",
      "Confondre la médiatrice d'un côté et la médiane : la médiatrice ne passe pas forcément par un sommet.",
      "Croire qu'une hauteur est toujours à l'intérieur du triangle : avec un angle obtus, elle peut être à l'extérieur.",
      "Oublier que deux angles donnés doivent avoir une somme inférieure à $180^\\circ$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Constructible ou pas ?",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Dans chaque cas, dis si l'on peut construire le triangle, et justifie.",
        questions: [
          { n: "1.", points: 1.5, texte: "Un triangle de côtés $5$ cm, $9$ cm et $3$ cm.", corrige: "Le plus grand côté mesure $9$ cm, et $5 + 3 = 8 < 9$ : ce triangle n'est pas constructible." },
          { n: "2.", points: 1.5, texte: "Un triangle de côtés $6$ cm, $8$ cm et $13$ cm.", corrige: "Le plus grand côté mesure $13$ cm, et $6 + 8 = 14 > 13$ : le triangle est constructible." },
          { n: "3.", points: 1.5, texte: "Un triangle de côtés $4{,}5$ cm, $7$ cm et $2{,}5$ cm.", corrige: "$4{,}5 + 2{,}5 = 7$ : le triangle est aplati, ses trois sommets sont alignés." },
          { n: "4.", points: 2.5, texte: "Un triangle $ABC$ avec $AB = 6$ cm, $\\widehat{BAC} = 110^\\circ$ et $\\widehat{ABC} = 75^\\circ$. Et si $\\widehat{ABC} = 45^\\circ$ ?", indice: "La somme des angles d'un triangle vaut $180^\\circ$.", corrige: "$110 + 75 = 185 > 180$ : le premier triangle n'est pas constructible.\n\n$110 + 45 = 155 < 180$ : le second l'est, et son troisième angle mesure $180 - 155 = 25^\\circ$." }
        ]
      },
      {
        titre: "Le cercle circonscrit",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Le triangle $EFG$ est rectangle en $E$, avec $FG = 7{,}4$ cm. $O$ est le centre de son cercle circonscrit.",
        questions: [
          { n: "1.", points: 2, texte: "Où se trouve le point $O$ ? Quel est le rayon du cercle ?", corrige: "Dans un triangle rectangle, le centre du cercle circonscrit est le milieu de l'hypoténuse : $O$ est le milieu de $[FG]$, et le rayon vaut $7{,}4 \\div 2 = 3{,}7$ cm." },
          { n: "2.", points: 1.5, texte: "Que vaut la longueur $OE$ ?", corrige: "$E$ est sur le cercle, donc $OE$ est un rayon : $OE = 3{,}7$ cm." },
          { n: "3.", points: 2, texte: "Explique pourquoi $O$ est sur la médiatrice de $[EF]$.", corrige: "$OE = OF = 3{,}7$ cm : $O$ est à la même distance de $E$ et de $F$, donc il est sur la médiatrice de $[EF]$." },
          { n: "4.", points: 1.5, texte: "Un point $M$ vérifie $MF = MG = 5$ cm. Sur quelle droite se trouve-t-il ?", corrige: "$M$ est à la même distance de $F$ et de $G$ : il est sur la médiatrice de $[FG]$." }
        ]
      },
      {
        titre: "Médianes et aires",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Le triangle $ABC$ a une aire de $36$ cm². $I$ est le milieu de $[BC]$ et $K$ le milieu de $[AI]$.",
        figure: (o) => o.figGeo({
          W: 320, H: 180,
          pts: { A: [110, 24], B: [40, 156], C: [280, 156], I: [160, 156], K: [135, 90] },
          segs: [["A", "B"], ["A", "C"], ["B", "C"], ["A", "I"], ["B", "K"]],
          codes: [["B", "I", 1], ["I", "C", 1], ["A", "K", 2], ["K", "I", 2]],
          decal: { A: [0, -8], B: [-6, 12], C: [6, 12], I: [0, 16], K: [6, -4] },
          aria: "Triangle ABC ; I milieu de [BC], segment [AI] ; K milieu de [AI], segment [BK]"
        }),
        questions: [
          { n: "1.", points: 1.5, texte: "Que représente la droite $(AI)$ pour le triangle $ABC$ ?", corrige: "Elle passe par le sommet $A$ et par le milieu $I$ du côté opposé : c'est la médiane issue de $A$." },
          { n: "2.", points: 1.5, texte: "Quelle est l'aire du triangle $ABI$ ?", corrige: "Une médiane partage le triangle en deux triangles de même aire : $36 \\div 2 = 18$ cm²." },
          { n: "3.", points: 1.5, texte: "Quelle est l'aire du triangle $ABK$ ?", indice: "$[BK]$ est une médiane du triangle $ABI$.", corrige: "$K$ est le milieu de $[AI]$, donc $[BK]$ est une médiane du triangle $ABI$ : l'aire de $ABK$ vaut $18 \\div 2 = 9$ cm²." },
          { n: "4.", points: 1.5, texte: "La hauteur issue de $A$ mesure $6$ cm. Calcule la longueur $BC$.", corrige: "Aire $= \\dfrac{BC \\times 6}{2} = 36$, donc $BC \\times 6 = 72$ et $BC = 12$ cm." }
        ]
      }
    ]
  }
};
