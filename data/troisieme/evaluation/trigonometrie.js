/*
  ENTRAÎNEMENT : 3e — chapitre 13, Trigonométrie
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre troisieme-trigonometrie.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type brevet.
  Figures dessinées par o.figGeo (assets/exercices-base.js), en pixels ; elles ne sont pas à l'échelle.
  Angles et longueurs différents de ceux du cours, de la méthode et du QCM du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["troisieme-trigonometrie"] = {
  revisions: {
    intro: "La trigonométrie en un coup d'œil : le vocabulaire, les trois formules, le calcul d'une longueur et celui d'un angle. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Le vocabulaire",
        texte: "Dans un triangle rectangle, l'hypoténuse est le côté opposé à l'angle droit. Pour un angle aigu, le côté opposé est en face de lui ; le côté adjacent le touche, sans être l'hypoténuse."
      },
      {
        titre: "Les trois formules",
        texte:
          "- $\\cos \\alpha = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$ ;\n" +
          "- $\\sin \\alpha = \\dfrac{\\text{opposé}}{\\text{hypoténuse}}$ ;\n" +
          "- $\\tan \\alpha = \\dfrac{\\text{opposé}}{\\text{adjacent}}$.\n\n" +
          "Pour s'en souvenir : « CAH SOH TOA »."
      },
      {
        titre: "Choisir la formule",
        texte: "Repère, par rapport à l'angle, les deux côtés qui interviennent (le connu et le cherché) : adjacent et hypoténuse, c'est le cosinus ; opposé et hypoténuse, le sinus ; opposé et adjacent, la tangente."
      },
      {
        titre: "Calculer une longueur",
        texte: "Si l'inconnue est en haut, on multiplie : $x = 6 \\times \\cos 40^\\circ$. Si elle est en bas, on divise :\n\n$\\cos 40^\\circ = \\dfrac{6}{x}$\n\ndonne $x = \\dfrac{6}{\\cos 40^\\circ}$."
      },
      {
        titre: "Calculer un angle",
        texte: "On calcule le quotient des deux côtés, puis on utilise la touche $\\cos^{-1}$, $\\sin^{-1}$ ou $\\tan^{-1}$ (Arccos, Arcsin, Arctan) de la calculatrice, réglée en degrés."
      },
      {
        titre: "Contrôler un résultat",
        texte: "Pour un angle aigu, $\\cos \\alpha$ et $\\sin \\alpha$ sont compris entre $0$ et $1$ : un quotient plus grand que $1$ signale une erreur. L'hypoténuse est toujours le plus long côté."
      }
    ],
    pieges: [
      "Utiliser ces formules dans un triangle qui n'est pas rectangle.",
      "Confondre l'hypoténuse et le côté adjacent.",
      "Oublier de régler la calculatrice en degrés.",
      "Multiplier alors que l'inconnue est au dénominateur : on divise.",
      "Arrondir trop tôt : garde la valeur affichée par la calculatrice jusqu'au résultat final."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme au brevet (environ $60$ minutes en tout), avec la calculatrice réglée en degrés. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le cerf-volant",
        duree: 20, points: 7, calculatrice: true,
        contexte: "Ali fait voler son cerf-volant. Le fil $[MC]$, tendu et rectiligne, mesure $50$ m : $M$ est la main d'Ali, $C$ le point d'attache du cerf-volant, et $H$ le point situé à la verticale de $C$, à la hauteur de la main. Le triangle $MHC$ est rectangle en $H$, et le fil fait avec l'horizontale un angle $\\widehat{HMC} = 35^\\circ$.",
        figure: (o) => o.figGeo({
          W: 320, H: 190,
          pts: { M: [40, 170], H: [240, 170], C: [240, 30], K1: [240, 12], K2: [254, 30], K3: [240, 54], K4: [226, 30] },
          polys: [["K1", "K2", "K3", "K4"]],
          caches: [["M", "H"], ["H", "C"]],
          segs: [["M", "C"]],
          droitAngle: [["M", "H", "C"]],
          angles: [["H", "M", "C", "35°", 30]],
          cotes: [["M", "C", "50 m", "H"]],
          sansPoint: ["K1", "K2", "K3", "K4"],
          decal: { M: [-6, 5], H: [6, 14], C: [-18, 4] },
          aria: "Triangle MHC rectangle en H : le fil [MC] de 50 m fait un angle de 35° avec l'horizontale [MH] ; le cerf-volant est en C, au-dessus de H"
        }),
        questions: [
          { n: "1.", points: 2, texte: "Calcule $HC$, arrondie au centimètre. La main d'Ali est à $1{,}2$ m du sol : à quelle hauteur du sol vole le cerf-volant ?", indice: "Pour l'angle $\\widehat{HMC}$, $[HC]$ est le côté opposé et $[MC]$ l'hypoténuse.", corrige: "$\\sin \\widehat{HMC} = \\dfrac{HC}{MC}$\n\ndonc $HC = 50 \\times \\sin 35^\\circ \\approx 28{,}68$ m.\n\nLe cerf-volant vole à environ $28{,}68 + 1{,}2 = 29{,}88$ m du sol." },
          { n: "2.", points: 1.5, texte: "Calcule $MH$, arrondie au centimètre.", corrige: "$\\cos \\widehat{HMC} = \\dfrac{MH}{MC}$\n\ndonc $MH = 50 \\times \\cos 35^\\circ \\approx 40{,}96$ m." },
          { n: "3.", points: 2, texte: "Le vent faiblit : le fil mesure toujours $50$ m, mais $HC = 20$ m. Calcule l'angle $\\widehat{HMC}$, arrondi au degré.", corrige: "$\\sin \\widehat{HMC} = \\dfrac{20}{50} = 0{,}4$\n\nAvec la touche $\\sin^{-1}$ : $\\widehat{HMC} \\approx 23{,}6^\\circ$, soit $24^\\circ$ arrondi au degré." },
          { n: "4.", points: 1.5, texte: "Ali veut faire voler son cerf-volant à $30$ m au-dessus de sa main, avec un fil qui fait un angle de $40^\\circ$ avec l'horizontale. Quelle longueur de fil doit-il dérouler ? Arrondis au décimètre.", indice: "Ici, l'inconnue est l'hypoténuse : elle se retrouve au dénominateur.", corrige: "$\\sin 40^\\circ = \\dfrac{30}{MC}$\n\ndonc $MC = \\dfrac{30}{\\sin 40^\\circ} \\approx 46{,}7$ m." }
        ]
      },
      {
        titre: "Le bateau et le phare",
        duree: 20, points: 7, calculatrice: true,
        contexte: "Les yeux $G$ du gardien d'un phare sont à $45$ m au-dessus de la mer, à la verticale du point $P$. Un bateau s'approche en ligne droite de $P$ : il passe du point $B$ au point $C$. On connaît les angles $\\widehat{GBP} = 12^\\circ$ et $\\widehat{GCP} = 30^\\circ$ ; les triangles $GPB$ et $GPC$ sont rectangles en $P$. La figure n'est pas à l'échelle.",
        figure: (o) => o.figGeo({
          W: 320, H: 192,
          pts: { G: [40, 30], P: [40, 170], C: [150, 170], B: [290, 170], T1: [33, 170], T2: [47, 170], T3: [44, 30], T4: [36, 30] },
          polys: [["T1", "T2", "T3", "T4"]],
          droites: [["P", "B", 0.06]],
          segs: [["G", "B"], ["G", "C"]],
          droitAngle: [["G", "P", "C"]],
          angles: [["G", "B", "P", "12°", 34], ["G", "C", "P", "30°", 22]],
          cotes: [["G", "P", "45 m", "C", 14]],
          sansPoint: ["T1", "T2", "T3", "T4"],
          decal: { G: [-10, 0], P: [-6, 14], C: [0, 16], B: [0, 16] },
          aria: "Phare [GP] de 45 m, rectangle en P ; le bateau passe de B à C sur la mer ; angle de 12° en B et de 30° en C"
        }),
        questions: [
          { n: "1.", points: 2, texte: "Calcule la distance $PB$, arrondie au mètre.", indice: "Pour l'angle $\\widehat{GBP}$, $[GP]$ est le côté opposé et $[PB]$ le côté adjacent.", corrige: "$\\tan \\widehat{GBP} = \\dfrac{GP}{PB}$\n\ndonc $PB = \\dfrac{45}{\\tan 12^\\circ} \\approx 212$ m." },
          { n: "2.", points: 2, texte: "Calcule la distance $PC$, arrondie au mètre.", corrige: "$\\tan \\widehat{GCP} = \\dfrac{GP}{PC}$\n\ndonc $PC = \\dfrac{45}{\\tan 30^\\circ} \\approx 78$ m." },
          { n: "3.", points: 1.5, texte: "Quelle distance $BC$ le bateau a-t-il parcourue ?", corrige: "$BC = PB - PC \\approx 212 - 78 = 134$ m." },
          { n: "4.", points: 1.5, texte: "Le bateau a mis une minute pour aller de $B$ à $C$. Calcule sa vitesse moyenne en km/h, arrondie à l'unité.", corrige: "$134$ m en une minute, c'est $134 \\times 60 = 8\\,040$ m en une heure, soit environ $8$ km/h." }
        ]
      },
      {
        titre: "La charpente de l'abri",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Le pignon d'un abri a la forme d'un triangle $ABC$ isocèle en $A$. La base $[BC]$ mesure $6$ m et chaque pan du toit fait un angle de $25^\\circ$ avec l'horizontale : $\\widehat{ABC} = \\widehat{ACB} = 25^\\circ$. $H$ est le milieu de $[BC]$.",
        figure: (o) => o.figGeo({
          W: 320, H: 186,
          pts: { A: [160, 94], B: [40, 150], C: [280, 150], H: [160, 150] },
          segs: [["A", "B"], ["A", "C"], ["B", "C"]],
          caches: [["A", "H"]],
          droitAngle: [["A", "H", "C"]],
          angles: [["A", "B", "C", "25°", 34], ["A", "C", "B", "25°", 34]],
          cotes: [["B", "C", "6 m", "A", 20], ["A", "H", "?", "B"]],
          decal: { A: [0, -8], B: [-6, 5], C: [6, 5], H: [5, 14] },
          aria: "Pignon triangulaire ABC isocèle en A, base [BC] de 6 m, angles de 25° en B et en C ; H milieu de [BC], hauteur [AH] en pointillés"
        }),
        questions: [
          { n: "1.", points: 1, texte: "Pourquoi le triangle $ABH$ est-il rectangle en $H$ ?", corrige: "Dans le triangle $ABC$ isocèle en $A$, la médiane issue de $A$ est aussi la hauteur : c'est l'axe de symétrie du triangle. Donc $(AH) \\perp (BC)$ et $ABH$ est rectangle en $H$." },
          { n: "2.", points: 2, texte: "Calcule la hauteur $AH$ du toit, arrondie au centimètre.", indice: "$BH = 3$ m est le côté adjacent à l'angle $\\widehat{ABH}$.", corrige: "$\\tan \\widehat{ABH} = \\dfrac{AH}{BH}$\n\ndonc $AH = 3 \\times \\tan 25^\\circ \\approx 1{,}40$ m." },
          { n: "3.", points: 1.5, texte: "Calcule la longueur $AB$ d'un chevron, arrondie au centimètre.", corrige: "$\\cos \\widehat{ABH} = \\dfrac{BH}{AB}$\n\ndonc $AB = \\dfrac{3}{\\cos 25^\\circ} \\approx 3{,}31$ m." },
          { n: "4.", points: 1.5, texte: "Le toit est formé de deux pans rectangulaires de largeur $AB$ et de longueur $8$ m. Calcule l'aire du toit, arrondie au m².", corrige: "$2 \\times 3{,}31 \\times 8 \\approx 53$ m² (avec la valeur non arrondie de $AB$, on trouve environ $52{,}96$ m²)." }
        ]
      }
    ]
  }
};
