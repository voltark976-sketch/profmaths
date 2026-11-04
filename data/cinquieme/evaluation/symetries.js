/*
  ENTRAÎNEMENT : 5e — chapitre 7, Symétries
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre cinquieme-symetries.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 5e, sans calculatrice.
  Figure dessinée par o.figGeo (assets/exercices-base.js). Points et mesures différents de ceux du cours, de la méthode et du QCM.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["cinquieme-symetries"] = {
  revisions: {
    intro: "Les symétries en un coup d'œil : symétrie axiale, symétrie centrale, symétrique d'un point, propriétés et centres de symétrie. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Symétrie axiale",
        texte: "C'est un pliage le long d'une droite, l'axe : la figure et son image se superposent quand on plie. L'axe est la médiatrice du segment qui joint un point à son image."
      },
      {
        titre: "Symétrie centrale",
        texte: "C'est un demi-tour autour d'un point $O$, le centre. Le symétrique de $A$ est le point $A'$ tel que $O$ soit le milieu de $[AA']$."
      },
      {
        titre: "Sur un quadrillage",
        texte: "Pour placer le symétrique de $A$ par rapport à $O$, on compte le déplacement de $A$ à $O$, puis on refait le même déplacement à partir de $O$."
      },
      {
        titre: "Ce qui est conservé",
        texte: "Les deux symétries conservent les longueurs, les angles, les aires et les périmètres. Par une symétrie centrale, une droite a pour image une droite qui lui est parallèle."
      },
      {
        titre: "Centre et axes de symétrie",
        texte: "Une figure a un centre de symétrie si elle est sa propre image par un demi-tour : c'est le cas du cercle, du parallélogramme, du rectangle, du losange et du carré, mais pas du triangle."
      }
    ],
    pieges: [
      "Confondre symétrie axiale (pliage) et symétrie centrale (demi-tour).",
      "Placer $A'$ du même côté de $O$ que $A$ : $O$ doit être au milieu.",
      "Croire qu'une symétrie change les longueurs ou les angles.",
      "Croire que toute figure qui a un axe de symétrie a aussi un centre de symétrie : le triangle équilatéral n'en a pas.",
      "Oublier que le symétrique du centre $O$ est $O$ lui-même."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Sur le quadrillage",
        duree: 15, points: 7, calculatrice: false,
        contexte: "On considère la symétrie de centre $O$. Les points $D$, $E$, $F$, $G$ et $H$ sont des réponses possibles.",
        figure: (o) => o.figGeo({
          W: 320, H: 196,
          grille: [28, 10, 22, 12, 8],
          pts: { O: [160, 98], A: [72, 54], B: [138, 164], C: [204, 76], D: [248, 54], E: [248, 142], F: [182, 32], G: [116, 120], H: [72, 142] },
          decal: { O: [6, -6], A: [-6, -6], B: [6, 12], C: [6, -6], D: [6, -6], E: [6, 12], F: [6, -6], G: [-6, 12], H: [-6, 12] },
          aria: "Quadrillage avec le centre O et les points A, B, C, ainsi que les points D, E, F, G, H proposés comme réponses"
        }),
        questions: [
          { n: "1.", points: 2, texte: "Quel point est le symétrique de $A$ par rapport à $O$ ? Explique comment tu le trouves.", corrige: "De $A$ à $O$, on se déplace de $4$ carreaux vers la droite et de $2$ vers le bas. On refait ce déplacement à partir de $O$ : on arrive en $E$. Le symétrique de $A$ est $E$." },
          { n: "2.", points: 2, texte: "Quels sont les symétriques de $B$ et de $C$ par rapport à $O$ ?", corrige: "De $B$ à $O$ : $1$ carreau vers la droite et $3$ vers le haut ; on arrive en $F$. De $C$ à $O$ : $2$ carreaux vers la gauche et $1$ vers le bas ; on arrive en $G$. Les symétriques sont $F$ et $G$." },
          { n: "3.", points: 1.5, texte: "Le point $D$ est-il le symétrique de $A$ par rapport à $O$ ? Par quelle transformation passe-t-on de $A$ à $D$ ?", corrige: "Non : $O$ n'est pas le milieu de $[AD]$. On passe de $A$ à $D$ par la symétrie axiale d'axe la droite verticale qui passe par $O$ (un pliage)." },
          { n: "4.", points: 1.5, texte: "Que peut-on dire des segments $[AB]$ et $[EF]$ ?", corrige: "$[EF]$ est l'image de $[AB]$ par la symétrie de centre $O$ : les deux segments ont la même longueur, et les droites $(AB)$ et $(EF)$ sont parallèles." }
        ]
      },
      {
        titre: "Les propriétés",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Par la symétrie de centre $O$, le triangle $RST$ a pour image le triangle $R'S'T'$. On sait que $RS = 4{,}5$ cm, $ST = 6$ cm, $\\widehat{RST} = 72^\\circ$, et que l'aire du triangle $RST$ vaut $12$ cm².",
        questions: [
          { n: "1.", points: 1.5, texte: "Que valent $R'S'$ et $S'T'$ ?", corrige: "Une symétrie conserve les longueurs : $R'S' = 4{,}5$ cm et $S'T' = 6$ cm." },
          { n: "2.", points: 1.5, texte: "Que vaut l'angle $\\widehat{R'S'T'}$ ?", corrige: "Une symétrie conserve les angles : $\\widehat{R'S'T'} = 72^\\circ$." },
          { n: "3.", points: 1.5, texte: "Quelle est l'aire du triangle $R'S'T'$ ?", corrige: "Une symétrie conserve les aires : $12$ cm²." },
          { n: "4.", points: 2.5, texte: "On mesure $OR = 3{,}2$ cm. Que valent $OR'$ et $RR'$ ? Que peut-on dire des droites $(RS)$ et $(R'S')$ ?", corrige: "$O$ est le milieu de $[RR']$ : $OR' = 3{,}2$ cm et $RR' = 2 \\times 3{,}2 = 6{,}4$ cm. Par une symétrie centrale, une droite a pour image une droite parallèle : $(R'S') \\parallel (RS)$." }
        ]
      },
      {
        titre: "Centres et axes de symétrie",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Justifie chaque réponse en une phrase.",
        questions: [
          { n: "1.", points: 2, texte: "Parmi un rectangle, un losange, un triangle équilatéral et un cercle, lesquels ont un centre de symétrie ?", corrige: "Le rectangle (point d'intersection des diagonales), le losange (de même) et le cercle (son centre). Le triangle équilatéral n'a pas de centre de symétrie : un demi-tour le met « la tête en bas »." },
          { n: "2.", points: 2, texte: "Combien d'axes de symétrie ont un rectangle qui n'est pas un carré, un carré et un triangle équilatéral ?", corrige: "Le rectangle : $2$ axes (les médiatrices de ses côtés). Le carré : $4$ (deux médiatrices et deux diagonales). Le triangle équilatéral : $3$." },
          { n: "3.", points: 2, texte: "Écrits en lettres capitales, les mots SOS, NON et BOB ont-ils un centre de symétrie ?", indice: "Fais faire un demi-tour au mot, par exemple en retournant la feuille.", corrige: "SOS et NON, oui : les lettres S, O et N ont chacune un centre de symétrie, et le mot se lit pareil après un demi-tour. BOB, non : après un demi-tour, la lettre B est à l'envers." }
        ]
      }
    ]
  }
};
