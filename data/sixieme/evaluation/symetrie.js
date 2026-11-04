/*
  ENTRAÎNEMENT : 6e — chapitre 12, Symétrie axiale
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre sixieme-symetrie.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 6e, sans calculatrice.
  Figure dessinée par o.figGeo (assets/exercices-base.js). Points et mesures différents de ceux du cours, de la méthode,
  du QCM et de l'entraînement de 5e.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["sixieme-symetrie"] = {
  revisions: {
    intro: "La symétrie axiale en un coup d'œil : figures symétriques, symétrique d'un point, ce qui est conservé et axes de symétrie. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Figures symétriques",
        texte: "Deux figures sont symétriques par rapport à une droite $(d)$ si elles se superposent quand on plie la feuille le long de $(d)$."
      },
      {
        titre: "Le symétrique d'un point",
        texte: "Le symétrique de $A$ par rapport à $(d)$ est le point $A'$ tel que $(d)$ soit la médiatrice de $[AA']$ : $A'$ est de l'autre côté de $(d)$, à la même distance. Un point de $(d)$ est son propre symétrique."
      },
      {
        titre: "Sur un quadrillage",
        texte: "On compte les carreaux entre le point et l'axe, perpendiculairement à l'axe, puis on reporte le même nombre de carreaux de l'autre côté."
      },
      {
        titre: "Ce qui est conservé",
        texte: "La symétrie axiale conserve les longueurs, les angles, les périmètres, les aires et l'alignement."
      },
      {
        titre: "Axes de symétrie",
        texte: "Un axe de symétrie partage une figure en deux parties qui se superposent par pliage : le carré en a $4$, le rectangle $2$, le losange $2$, le triangle équilatéral $3$ et le cercle une infinité."
      }
    ],
    pieges: [
      "Reporter les carreaux en biais au lieu de perpendiculairement à l'axe.",
      "Placer le symétrique du même côté de l'axe.",
      "Croire que les diagonales d'un rectangle sont des axes de symétrie.",
      "Oublier qu'un point de l'axe est son propre symétrique.",
      "Croire que la symétrie change les longueurs ou les angles."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Sur le quadrillage",
        duree: 15, points: 7, calculatrice: false,
        contexte: "On considère la symétrie d'axe $(d)$, la droite verticale tracée sur le quadrillage. Les points $D$, $E$, $F$ et $G$ sont des réponses possibles.",
        figure: (o) => o.figGeo({
          W: 320, H: 196,
          grille: [28, 10, 22, 12, 8],
          pts: { H1: [160, 4], H2: [160, 192], A: [72, 54], B: [116, 164], C: [138, 98], D: [248, 54], E: [204, 164], F: [182, 98], G: [248, 142] },
          droites: [["H1", "H2", 0]],
          textes: [[166, 20, "(d)", "start"]],
          sansPoint: ["H1", "H2"],
          decal: { A: [-6, -6], B: [-6, 12], C: [-6, -6], D: [6, -6], E: [6, 12], F: [6, -6], G: [6, 12] },
          aria: "Quadrillage avec l'axe vertical (d) ; à gauche les points A, B, C ; à droite les points D, E, F, G proposés comme réponses"
        }),
        questions: [
          { n: "1.", points: 2, texte: "Quel point est le symétrique de $A$ par rapport à $(d)$ ? Explique.", corrige: "$A$ est à $4$ carreaux à gauche de $(d)$. Son symétrique est sur la même ligne horizontale, à $4$ carreaux à droite de $(d)$ : c'est le point $D$." },
          { n: "2.", points: 2, texte: "Quels sont les symétriques de $B$ et de $C$ ?", corrige: "$B$ est à $2$ carreaux à gauche de $(d)$ : son symétrique est $E$. $C$ est à $1$ carreau à gauche : son symétrique est $F$." },
          { n: "3.", points: 1.5, texte: "Le point $G$ est-il le symétrique de $A$ par rapport à $(d)$ ? Pourquoi ?", corrige: "Non : $G$ est bien à $4$ carreaux à droite de $(d)$, mais pas sur la même ligne horizontale que $A$. Le segment $[AG]$ n'est pas perpendiculaire à $(d)$." },
          { n: "4.", points: 1.5, texte: "Un point $M$ est placé sur la droite $(d)$. Quel est son symétrique ?", corrige: "$M$ lui-même : un point de l'axe est son propre symétrique." }
        ]
      },
      {
        titre: "Ce qui est conservé",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Le triangle $R'S'T'$ est le symétrique du triangle $RST$ par rapport à une droite $(d)$. On sait que $RS = 5{,}3$ cm, $\\widehat{RST} = 48^\\circ$ et que le périmètre de $RST$ vaut $15$ cm.",
        questions: [
          { n: "1.", points: 2, texte: "Que vaut $R'S'$ ?", corrige: "La symétrie conserve les longueurs : $R'S' = 5{,}3$ cm." },
          { n: "2.", points: 2, texte: "Que vaut l'angle $\\widehat{R'S'T'}$ ?", corrige: "La symétrie conserve les angles : $48^\\circ$." },
          { n: "3.", points: 1.5, texte: "Quel est le périmètre du triangle $R'S'T'$ ?", corrige: "Il est conservé : $15$ cm." },
          { n: "4.", points: 1.5, texte: "On mesure $RR' = 6$ cm. À quelle distance de $(d)$ se trouve le point $R$ ?", indice: "$(d)$ est la médiatrice de $[RR']$.", corrige: "$(d)$ coupe $[RR']$ en son milieu : $R$ est à $6 \\div 2 = 3$ cm de $(d)$." }
        ]
      },
      {
        titre: "Les axes de symétrie",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Pense au pliage.",
        questions: [
          { n: "1.", points: 2, texte: "Combien d'axes de symétrie ont un carré, un rectangle qui n'est pas un carré, et un triangle équilatéral ?", corrige: "Le carré : $4$ (deux médiatrices de côtés et deux diagonales). Le rectangle : $2$ (les médiatrices de ses côtés). Le triangle équilatéral : $3$." },
          { n: "2.", points: 2, texte: "Combien d'axes de symétrie a un cercle ?", corrige: "Une infinité : toute droite qui passe par le centre est un axe de symétrie." },
          { n: "3.", points: 2, texte: "Écrites en majuscules, combien d'axes de symétrie ont les lettres H et A ?", corrige: "H en a $2$ (un vertical et un horizontal) ; A en a $1$ (vertical)." }
        ]
      }
    ]
  }
};
