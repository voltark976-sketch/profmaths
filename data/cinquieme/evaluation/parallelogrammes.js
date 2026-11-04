/*
  ENTRAÎNEMENT : 5e — chapitre 12, Parallélogrammes
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre cinquieme-parallelogrammes.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 5e, sans calculatrice.
  Figure dessinée par o.figGeo (assets/exercices-base.js). Mesures différentes de celles du cours, de la méthode et du QCM.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["cinquieme-parallelogrammes"] = {
  revisions: {
    intro: "Les parallélogrammes en un coup d'œil : définition, propriétés, comment prouver qu'un quadrilatère en est un, rectangle, losange et carré. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Définition",
        texte: "Un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux."
      },
      {
        titre: "Propriétés",
        texte:
          "Dans un parallélogramme :\n" +
          "- les côtés opposés ont la même longueur ;\n" +
          "- les diagonales se coupent en leur milieu, le centre de symétrie ;\n" +
          "- les angles opposés sont égaux, deux angles consécutifs ont une somme de $180^\\circ$."
      },
      {
        titre: "Prouver que c'est un parallélogramme",
        texte: "Il suffit, par exemple, que ses diagonales aient le même milieu, ou que ses côtés opposés soient parallèles deux à deux."
      },
      {
        titre: "Rectangle, losange, carré",
        texte:
          "Un parallélogramme est :\n" +
          "- un rectangle s'il a un angle droit, ou des diagonales de même longueur ;\n" +
          "- un losange s'il a deux côtés consécutifs égaux, ou des diagonales perpendiculaires ;\n" +
          "- un carré s'il est à la fois rectangle et losange."
      }
    ],
    pieges: [
      "Croire que les diagonales d'un parallélogramme ont toujours la même longueur : c'est vrai seulement pour le rectangle.",
      "Confondre côtés opposés et côtés consécutifs.",
      "Utiliser une propriété du losange pour un parallélogramme quelconque.",
      "Oublier que le carré est aussi un rectangle et un losange.",
      "Mesurer sur la figure au lieu de justifier par une propriété."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Utiliser les propriétés",
        duree: 15, points: 7, calculatrice: false,
        contexte: "$ABCD$ est un parallélogramme de centre $O$, avec $AB = 7{,}5$ cm, $BC = 4$ cm, $AC = 9{,}9$ cm, $BD = 6{,}8$ cm (valeurs arrondies au millimètre) et $\\widehat{DAB} = 64^\\circ$. La figure n'est pas en vraie grandeur.",
        figure: (o) => o.figGeo({
          W: 320, H: 170,
          pts: { A: [40, 140], B: [220, 140], C: [262.1, 53.7], D: [82.1, 53.7], O: [151.05, 96.85] },
          segs: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"]],
          caches: [["A", "C"], ["B", "D"]],
          angles: [["B", "A", "D", "64°", 26]],
          decal: { A: [-6, 12], B: [6, 12], C: [6, -4], D: [-6, -4], O: [0, 16] },
          aria: "Parallélogramme ABCD de centre O, intersection des diagonales en pointillés ; angle de 64° en A"
        }),
        questions: [
          { n: "1.", points: 2, texte: "Que valent $CD$ et $AD$ ? Justifie.", corrige: "Dans un parallélogramme, les côtés opposés ont la même longueur : $CD = AB = 7{,}5$ cm et $AD = BC = 4$ cm." },
          { n: "2.", points: 2, texte: "Que valent $AO$ et $OD$ ?", corrige: "Les diagonales se coupent en leur milieu $O$ : $AO = 9{,}9 \\div 2 = 4{,}95$ cm et $OD = 6{,}8 \\div 2 = 3{,}4$ cm." },
          { n: "3.", points: 2, texte: "Donne la mesure des angles $\\widehat{BCD}$ et $\\widehat{ABC}$.", indice: "Les angles opposés sont égaux ; deux angles consécutifs ont une somme de $180^\\circ$.", corrige: "$\\widehat{BCD}$ est opposé à $\\widehat{DAB}$ : $64^\\circ$. $\\widehat{ABC}$ et $\\widehat{DAB}$ sont consécutifs : $180 - 64 = 116^\\circ$." },
          { n: "4.", points: 1, texte: "Calcule le périmètre du parallélogramme.", corrige: "$2 \\times (7{,}5 + 4) = 23$ cm." }
        ]
      },
      {
        titre: "Quelle est sa nature ?",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Justifie chaque réponse par une propriété.",
        questions: [
          { n: "1.", points: 2.5, texte: "Les segments $[KM]$ et $[LN]$ ont le même milieu $I$. Quelle est la nature du quadrilatère $KLMN$ ?", corrige: "Ses diagonales $[KM]$ et $[LN]$ ont le même milieu : $KLMN$ est un parallélogramme." },
          { n: "2.", points: 2.5, texte: "On sait de plus que $KM = LN$. Quelle est alors la nature de $KLMN$ ?", corrige: "C'est un parallélogramme dont les diagonales ont la même longueur : c'est un rectangle." },
          { n: "3.", points: 2, texte: "Un parallélogramme $EFGH$ a des diagonales perpendiculaires. Quelle est sa nature ? Que faudrait-il de plus pour que ce soit un carré ?", corrige: "C'est un losange. Pour que ce soit un carré, il faudrait aussi que ses diagonales aient la même longueur (ou qu'il ait un angle droit)." }
        ]
      },
      {
        titre: "Le losange",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Les diagonales d'un losange $RSTU$ mesurent $RT = 8$ cm et $SU = 6$ cm ; elles se coupent en $O$.",
        questions: [
          { n: "1.", points: 2, texte: "Quelle est l'aire du losange ?", indice: "Les diagonales le partagent en quatre triangles rectangles en $O$, de côtés $4$ cm et $3$ cm.", corrige: "Les diagonales sont perpendiculaires et se coupent en leur milieu : le losange est formé de $4$ triangles rectangles de côtés $4$ cm et $3$ cm, d'aire $\\dfrac{4 \\times 3}{2} = 6$ cm² chacun. Aire du losange : $4 \\times 6 = 24$ cm²." },
          { n: "2.", points: 2, texte: "On admet que chaque côté du losange mesure $5$ cm. Quel est son périmètre ?", corrige: "Les quatre côtés d'un losange ont la même longueur : $4 \\times 5 = 20$ cm." },
          { n: "3.", points: 2, texte: "Un autre losange a un angle droit. Que peut-on dire de ce quadrilatère ?", corrige: "Un losange est un parallélogramme ; s'il a un angle droit, c'est aussi un rectangle. C'est donc un carré." }
        ]
      }
    ]
  }
};
