/*
  ENTRAÎNEMENT : 4e — chapitre 11, Cosinus d'un angle
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre quatrieme-cosinus.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle de 4e, avec calculatrice (en degrés).
  Figures dessinées par o.figGeo (assets/exercices-base.js). Angles et longueurs différents de ceux du cours, de la méthode et du QCM.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["quatrieme-cosinus"] = {
  revisions: {
    intro: "Le cosinus en un coup d'œil : le vocabulaire, la formule, le calcul d'une longueur et celui d'un angle. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Le vocabulaire",
        texte: "Dans un triangle rectangle, l'hypoténuse est le côté opposé à l'angle droit. Le côté adjacent à un angle aigu est le côté de l'angle droit qui touche cet angle."
      },
      {
        titre: "La définition",
        texte: "Dans un triangle rectangle :\n\n$\\cos \\widehat{B} = \\dfrac{\\text{côté adjacent à } \\widehat{B}}{\\text{hypoténuse}}$"
      },
      {
        titre: "Calculer un côté adjacent",
        texte: "On multiplie l'hypoténuse par le cosinus : avec une hypoténuse de $12$ et un angle de $50^\\circ$, le côté adjacent mesure $12 \\times \\cos 50^\\circ \\approx 7{,}7$."
      },
      {
        titre: "Calculer l'hypoténuse",
        texte: "On divise le côté adjacent par le cosinus : avec un côté adjacent de $3$ et un angle de $70^\\circ$, l'hypoténuse mesure $\\dfrac{3}{\\cos 70^\\circ} \\approx 8{,}8$."
      },
      {
        titre: "Calculer un angle",
        texte: "On calcule le cosinus, puis on utilise la touche $\\cos^{-1}$ (ou Arccos) de la calculatrice, réglée en degrés : si $\\cos \\widehat{B} = 0{,}8$, alors $\\widehat{B} \\approx 37^\\circ$."
      },
      {
        titre: "Contrôler un résultat",
        texte: "Le cosinus d'un angle aigu est compris entre $0$ et $1$, et l'hypoténuse est le plus long côté : un résultat qui ne respecte pas cela signale une erreur."
      }
    ],
    pieges: [
      "Utiliser le cosinus dans un triangle qui n'est pas rectangle.",
      "Prendre le côté opposé à l'angle à la place du côté adjacent.",
      "Oublier de régler la calculatrice en degrés.",
      "Multiplier au lieu de diviser quand on cherche l'hypoténuse.",
      "Arrondir le cosinus en cours de calcul : garde la valeur de la calculatrice jusqu'au bout."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $50$ minutes en tout), avec la calculatrice réglée en degrés. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le triangle EFG",
        duree: 15, points: 7, calculatrice: true,
        contexte: "Le triangle $EFG$ est rectangle en $F$, avec $EG = 9$ cm et $\\widehat{FEG} = 38^\\circ$. La figure n'est pas en vraie grandeur.",
        figure: (o) => o.figGeo({
          W: 320, H: 180,
          pts: { E: [50, 160], F: [230, 160], G: [230, 19.4] },
          segs: [["E", "F"], ["F", "G"], ["E", "G"]],
          droitAngle: [["E", "F", "G"]],
          angles: [["F", "E", "G", "38°", 34]],
          cotes: [["E", "G", "9 cm", "F"]],
          decal: { E: [-6, 12], F: [6, 12], G: [6, 0] },
          aria: "Triangle EFG rectangle en F : hypoténuse [EG] de 9 cm, angle de 38° en E"
        }),
        questions: [
          { n: "1.", points: 1.5, texte: "Écris le cosinus de l'angle $\\widehat{FEG}$ à l'aide des longueurs du triangle.", corrige: "Pour l'angle $\\widehat{FEG}$, le côté adjacent est $[EF]$ et l'hypoténuse $[EG]$ : $\\cos \\widehat{FEG} = \\dfrac{EF}{EG}$." },
          { n: "2.", points: 2, texte: "Calcule $EF$, arrondie au millimètre.", corrige: "$EF = EG \\times \\cos \\widehat{FEG} = 9 \\times \\cos 38^\\circ \\approx 7{,}1$ cm." },
          { n: "3.", points: 2, texte: "Calcule $FG$, arrondie au millimètre.", indice: "Utilise le théorème de Pythagore, avec la valeur non arrondie de $EF$.", corrige: "D'après le théorème de Pythagore : $FG^2 = EG^2 - EF^2 \\approx 81 - 50{,}30 = 30{,}70$, donc $FG \\approx 5{,}5$ cm." },
          { n: "4.", points: 1.5, texte: "Quelle est la mesure de l'angle $\\widehat{EGF}$ ?", corrige: "Dans un triangle rectangle, les deux angles aigus ont pour somme $90^\\circ$ : $\\widehat{EGF} = 90 - 38 = 52^\\circ$." }
        ]
      },
      {
        titre: "La rampe d'accès",
        duree: 20, points: 7, calculatrice: true,
        contexte: "Pour qu'un fauteuil roulant puisse monter seul, une rampe d'accès doit faire avec le sol un angle d'au plus $5^\\circ$ (règle simplifiée).",
        questions: [
          { n: "1.", points: 2, texte: "Une rampe de $4{,}5$ m de long couvre $4{,}4$ m à l'horizontale. Calcule l'angle qu'elle fait avec le sol, arrondi au dixième de degré.", indice: "La rampe est l'hypoténuse ; la longueur horizontale est le côté adjacent à l'angle cherché.", corrige: "$\\cos \\alpha = \\dfrac{4{,}4}{4{,}5}$, donc $\\alpha \\approx 12{,}1^\\circ$." },
          { n: "2.", points: 1.5, texte: "Cette rampe respecte-t-elle la règle ?", corrige: "Non : $12{,}1^\\circ > 5^\\circ$, la rampe est beaucoup trop raide." },
          { n: "3.", points: 2, texte: "Une autre rampe de $5$ m de long fait un angle de $4^\\circ$ avec le sol. Quelle longueur couvre-t-elle à l'horizontale ? Arrondis au centimètre.", corrige: "Longueur horizontale $= 5 \\times \\cos 4^\\circ \\approx 4{,}99$ m." },
          { n: "4.", points: 1.5, texte: "Quelle hauteur cette rampe permet-elle de monter ? Arrondis au centimètre.", indice: "Utilise le théorème de Pythagore, avec la valeur non arrondie.", corrige: "$h^2 = 5^2 - (5 \\cos 4^\\circ)^2 \\approx 25 - 24{,}878 = 0{,}122$, donc $h \\approx 0{,}35$ m." }
        ]
      },
      {
        titre: "Le câble du mât",
        duree: 15, points: 6, calculatrice: true,
        contexte: "Un mât vertical $[MH]$ est tenu par un câble $[MA]$ tendu de $15$ m, fixé au sol au point $A$. Le câble fait avec le sol un angle $\\widehat{MAH} = 62^\\circ$, et le triangle $MAH$ est rectangle en $H$.",
        figure: (o) => o.figGeo({
          W: 320, H: 196,
          pts: { M: [230, 20], H: [230, 170], A: [150.3, 170], B: [173.4, 170] },
          segs: [["M", "H"], ["M", "A"]],
          caches: [["M", "B"]],
          droites: [["A", "H", 0.6]],
          droitAngle: [["M", "H", "A"]],
          angles: [["H", "A", "M", "62°", 26]],
          cotes: [["M", "A", "15 m", "H"]],
          decal: { M: [6, 0], H: [6, 14], A: [-6, 14], B: [0, 15] },
          aria: "Mât vertical [MH] ; le câble [MA] de 15 m fait un angle de 62° avec le sol en A ; un second câble en pointillés va de M au point B du sol"
        }),
        questions: [
          { n: "1.", points: 2, texte: "Calcule la distance $AH$ entre le point d'ancrage et le pied du mât, arrondie au centimètre.", corrige: "$AH = MA \\times \\cos \\widehat{MAH} = 15 \\times \\cos 62^\\circ \\approx 7{,}04$ m." },
          { n: "2.", points: 2, texte: "Calcule la hauteur $MH$ du mât, arrondie au centimètre.", corrige: "D'après le théorème de Pythagore : $MH^2 = 15^2 - AH^2 \\approx 225 - 49{,}59 = 175{,}41$, donc $MH \\approx 13{,}24$ m." },
          { n: "3.", points: 2, texte: "Un second câble, en pointillés, relie le sommet $M$ au point $B$ du sol, à $5$ m du pied du mât. Quel angle fait-il avec le sol ? Arrondis au degré.", indice: "Calcule d'abord la longueur $MB$ avec le théorème de Pythagore.", corrige: "$MB^2 = MH^2 + BH^2 \\approx 175{,}41 + 25 = 200{,}41$, donc $MB \\approx 14{,}16$ m.\n\n$\\cos \\widehat{MBH} = \\dfrac{BH}{MB} \\approx \\dfrac{5}{14{,}16}$, donc $\\widehat{MBH} \\approx 69^\\circ$." }
        ]
      }
    ]
  }
};
