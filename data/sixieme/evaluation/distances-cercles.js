/*
  ENTRAÎNEMENT : 6e — chapitre 9, Distances, cercles et médiatrice
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre sixieme-distances-cercles.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 6e, sans calculatrice.
  Longueurs différentes de celles du cours, de la méthode et du QCM du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["sixieme-distances-cercles"] = {
  revisions: {
    intro: "Distances, cercles et médiatrice en un coup d'œil : notations, milieu, cercle et disque, points à égale distance. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Les notations",
        texte: "$[AB]$ est le segment, $(AB)$ la droite, $[AB)$ la demi-droite d'origine $A$ qui passe par $B$, et $AB$ la longueur du segment. $C \\in [AB]$ se lit « $C$ appartient au segment $[AB]$ »."
      },
      {
        titre: "Le milieu",
        texte: "Le milieu $I$ de $[AB]$ est sur le segment, à la même distance de $A$ et de $B$ : $AI = IB = \\dfrac{AB}{2}$."
      },
      {
        titre: "Cercle et disque",
        texte: "Le cercle de centre $O$ et de rayon $r$ est formé des points situés à la distance $r$ de $O$ ; le disque est la surface qu'il entoure. Le diamètre vaut $2r$."
      },
      {
        titre: "Situer un point",
        texte: "Si $OM < r$, $M$ est à l'intérieur du cercle ; si $OM = r$, il est sur le cercle ; si $OM > r$, il est à l'extérieur."
      },
      {
        titre: "La médiatrice",
        texte: "La médiatrice de $[AB]$ est la droite perpendiculaire à $[AB]$ en son milieu. Tous ses points sont à la même distance de $A$ et de $B$ ; pour la tracer, on utilise deux arcs de même rayon centrés en $A$ et en $B$."
      }
    ],
    pieges: [
      "Confondre $[AB]$, $(AB)$ et $AB$.",
      "Confondre le rayon et le diamètre.",
      "Confondre le cercle, qui est une ligne, et le disque, qui est une surface.",
      "Changer l'écartement du compas entre les deux arcs de la médiatrice.",
      "Oublier que le milieu doit être sur le segment."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Notations et milieux",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Réponds en utilisant les notations.",
        questions: [
          { n: "1.", points: 2, texte: "Les points $E$, $F$ et $G$ sont alignés dans cet ordre, avec $EF = 3{,}5$ cm et $FG = 2{,}8$ cm. Calcule $EG$.", corrige: "$F$ est entre $E$ et $G$ : $EG = EF + FG = 3{,}5 + 2{,}8 = 6{,}3$ cm." },
          { n: "2.", points: 2, texte: "$K$ est le milieu de $[RS]$ et $RS = 9$ cm. Calcule $RK$.", corrige: "$RK = 9 \\div 2 = 4{,}5$ cm." },
          { n: "3.", points: 1.5, texte: "Écris avec des symboles : « le point $F$ appartient au segment $[EG]$ ».", corrige: "$F \\in [EG]$." },
          { n: "4.", points: 1.5, texte: "Que désignent $(EG)$ et $[EG)$ ?", corrige: "$(EG)$ est la droite qui passe par $E$ et $G$ ; $[EG)$ est la demi-droite d'origine $E$ qui passe par $G$." }
        ]
      },
      {
        titre: "Cercles",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Justifie chaque réponse.",
        questions: [
          { n: "1.", points: 2, texte: "Un cercle a un rayon de $4{,}5$ cm. Quel est son diamètre ?", corrige: "$2 \\times 4{,}5 = 9$ cm." },
          { n: "2.", points: 2.5, texte: "On trace le cercle de centre $O$ et de rayon $3$ cm. Où sont les points $M$, $N$ et $P$, avec $OM = 2{,}5$ cm, $ON = 3$ cm et $OP = 3{,}2$ cm ?", corrige: "$M$ est à l'intérieur du cercle ($2{,}5 < 3$), $N$ est sur le cercle ($ON = 3$), et $P$ est à l'extérieur ($3{,}2 > 3$)." },
          { n: "3.", points: 2.5, texte: "Une lampe éclaire tous les points situés à $4$ m d'elle au plus. Une chaise est à $3{,}6$ m de la lampe et une table à $4{,}3$ m. Lesquelles sont éclairées ?", corrige: "La zone éclairée est le disque de centre la lampe et de rayon $4$ m : la chaise ($3{,}6 < 4$) est éclairée, la table ($4{,}3 > 4$) ne l'est pas." }
        ]
      },
      {
        titre: "La médiatrice",
        duree: 15, points: 6, calculatrice: false,
        contexte: "$[AB]$ est un segment de $8$ cm.",
        questions: [
          { n: "1.", points: 2, texte: "Le point $M$ est sur la médiatrice de $[AB]$ et $MA = 6{,}1$ cm. Que vaut $MB$ ?", corrige: "Tous les points de la médiatrice sont à la même distance de $A$ et de $B$ : $MB = 6{,}1$ cm." },
          { n: "2.", points: 2, texte: "Le point $N$ vérifie $NA = NB = 4{,}5$ cm. Où se trouve-t-il ?", corrige: "$N$ est à la même distance de $A$ et de $B$ : il est sur la médiatrice de $[AB]$." },
          { n: "3.", points: 2, texte: "Explique comment tracer la médiatrice de $[AB]$ avec un compas et une règle.", corrige: "Avec un même écartement de compas, plus grand que la moitié de $AB$ (plus de $4$ cm), on trace deux arcs centrés en $A$, puis deux arcs centrés en $B$. Ils se coupent en deux points : la droite qui passe par ces deux points est la médiatrice." }
        ]
      }
    ]
  }
};
