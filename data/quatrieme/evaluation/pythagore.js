/*
  ENTRAÎNEMENT : 4e — chapitre 3, Théorème de Pythagore
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre quatrieme-pythagore.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle de 4e.
  Figures dessinées par o.figGeo (assets/exercices-base.js). Longueurs différentes de celles du cours, de la méthode et du QCM.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["quatrieme-pythagore"] = {
  revisions: {
    intro: "Le théorème de Pythagore en un coup d'œil : racine carrée, calcul de l'hypoténuse ou d'un autre côté, réciproque et contraposée. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Carré et racine carrée",
        texte: "$\\sqrt{a}$ est le nombre positif dont le carré vaut $a$ : $\\sqrt{144} = 12$. Si $x^2 = 20$ et que $x$ est une longueur, alors $x = \\sqrt{20} \\approx 4{,}47$."
      },
      {
        titre: "Le théorème",
        texte: "Si le triangle $ABC$ est rectangle en $A$, alors $BC^2 = AB^2 + AC^2$ : le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés."
      },
      {
        titre: "Calculer l'hypoténuse",
        texte: "On additionne les carrés. Côtés de l'angle droit $5$ et $7$ : $5^2 + 7^2 = 74$, donc l'hypoténuse mesure $\\sqrt{74} \\approx 8{,}6$."
      },
      {
        titre: "Calculer un côté de l'angle droit",
        texte: "On soustrait. Hypoténuse $11$ et un côté $6$ : $11^2 - 6^2 = 85$, donc l'autre côté mesure $\\sqrt{85} \\approx 9{,}2$."
      },
      {
        titre: "La réciproque",
        texte: "Si, dans un triangle, le carré du plus long côté est égal à la somme des carrés des deux autres, alors le triangle est rectangle ; l'angle droit est en face du plus long côté."
      },
      {
        titre: "La contraposée",
        texte: "Si le carré du plus long côté n'est pas égal à la somme des carrés des deux autres, alors le triangle n'est pas rectangle."
      }
    ],
    pieges: [
      "Additionner les carrés alors qu'on cherche un côté de l'angle droit : on soustrait.",
      "Oublier de prendre la racine carrée à la fin.",
      "Utiliser le théorème dans un triangle dont on ne sait pas qu'il est rectangle.",
      "Dans la réciproque, ne pas isoler le plus long côté.",
      "Écrire $\\sqrt{a + b} = \\sqrt{a} + \\sqrt{b}$ : par exemple $\\sqrt{4 + 9} = \\sqrt{13} \\approx 3{,}6$, et non $2 + 3 = 5$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $50$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "La taille des écrans",
        duree: 20, points: 7, calculatrice: true,
        contexte: "La taille d'un écran est la longueur de sa diagonale, donnée en pouces ($1$ pouce $= 2{,}54$ cm). L'écran d'un téléviseur est un rectangle de $88$ cm de largeur et de $50$ cm de hauteur.",
        questions: [
          { n: "1.", points: 2, texte: "Calcule la longueur de la diagonale de cet écran, arrondie au millimètre.", indice: "La diagonale partage l'écran en deux triangles rectangles.", corrige: "D'après le théorème de Pythagore : $d^2 = 88^2 + 50^2 = 7\\,744 + 2\\,500 = 10\\,244$, donc $d = \\sqrt{10\\,244} \\approx 101{,}2$ cm." },
          { n: "2.", points: 1.5, texte: "Ce téléviseur est vendu comme un « 40 pouces ». Est-ce justifié ?", corrige: "$101{,}2 \\div 2{,}54 \\approx 39{,}8$ pouces, soit $40$ pouces arrondi à l'unité : c'est justifié." },
          { n: "3.", points: 2, texte: "L'écran d'un téléphone mesure $6{,}5$ pouces de diagonale et $7{,}2$ cm de largeur. Calcule sa hauteur, arrondie au millimètre.", indice: "Convertis d'abord la diagonale en centimètres ; c'est l'hypoténuse.", corrige: "Diagonale : $6{,}5 \\times 2{,}54 = 16{,}51$ cm. D'après le théorème de Pythagore :\n\n$h^2 = 16{,}51^2 - 7{,}2^2 \\approx 220{,}74$\n\ndonc $h \\approx 14{,}9$ cm." },
          { n: "4.", points: 1.5, texte: "Un vendeur annonce un écran rectangulaire de $30$ cm sur $40$ cm, avec une diagonale de $48$ cm. Est-ce possible ?", corrige: "Dans un rectangle, la diagonale vérifierait $d^2 = 30^2 + 40^2 = 2\\,500$, soit $d = 50$ cm. Une diagonale de $48$ cm est impossible pour un écran rectangulaire de ces dimensions." }
        ]
      },
      {
        titre: "Rectangle ou pas ?",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Dans chaque cas, justifie ta réponse par un calcul.",
        questions: [
          { n: "1.", points: 2, texte: "Le triangle $KLM$ a pour côtés $KL = 20$ cm, $LM = 21$ cm et $KM = 29$ cm. Est-il rectangle ?", corrige: "Le plus long côté est $[KM]$ : $KM^2 = 29^2 = 841$, et $KL^2 + LM^2 = 400 + 441 = 841$.\n\nComme $KM^2 = KL^2 + LM^2$, le triangle est rectangle en $L$, d'après la réciproque du théorème de Pythagore." },
          { n: "2.", points: 2, texte: "Le triangle $RST$ a pour côtés $RS = 9$ cm, $ST = 12$ cm et $RT = 16$ cm. Est-il rectangle ?", corrige: "Le plus long côté est $[RT]$ : $RT^2 = 256$, et $RS^2 + ST^2 = 81 + 144 = 225$.\n\nComme $256 \\neq 225$, le triangle n'est pas rectangle (contraposée du théorème de Pythagore)." },
          {
            n: "3.", points: 3, texte: "$ABCD$ est un rectangle avec $AB = 10$ cm et $BC = 4$ cm. Le point $E$ est sur $[DC]$, avec $DE = 2$ cm. Calcule $AE^2$ et $BE^2$, puis démontre que le triangle $AEB$ est rectangle en $E$.",
            indice: "Les triangles $ADE$ et $BCE$ sont rectangles en $D$ et en $C$ ; $EC = 8$ cm.",
            figure: (o) => o.figGeo({
              W: 320, H: 178,
              pts: { A: [40, 150], B: [280, 150], C: [280, 54], D: [40, 54], E: [88, 54] },
              segs: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["A", "E"], ["E", "B"]],
              droitAngle: [["A", "D", "C"], ["D", "C", "B"]],
              cotes: [["A", "B", "10 cm", "D"], ["B", "C", "4 cm", "A"], ["D", "E", "2 cm", "A"]],
              decal: { A: [-6, 12], B: [6, 12], C: [6, -4], D: [-6, -4], E: [0, -8] },
              aria: "Rectangle ABCD de 10 cm sur 4 cm ; E sur [DC] à 2 cm de D ; segments [AE] et [EB]"
            }),
            corrige: "Dans le triangle $ADE$ rectangle en $D$ : $AE^2 = AD^2 + DE^2 = 16 + 4 = 20$.\n\nDans le triangle $BCE$ rectangle en $C$, avec $EC = 10 - 2 = 8$ cm : $BE^2 = 16 + 64 = 80$.\n\nDans le triangle $AEB$, le plus long côté est $[AB]$ : $AB^2 = 100$ et $AE^2 + BE^2 = 20 + 80 = 100$. D'après la réciproque du théorème de Pythagore, le triangle $AEB$ est rectangle en $E$."
          }
        ]
      },
      {
        titre: "La tente",
        duree: 15, points: 6, calculatrice: true,
        contexte: "L'entrée d'une tente a la forme d'un triangle $ABC$ isocèle en $A$, avec $AB = AC = 2{,}5$ m et $BC = 3$ m. $H$ est le milieu de $[BC]$, et la droite $(AH)$ est perpendiculaire au sol $(BC)$.",
        figure: (o) => o.figGeo({
          W: 320, H: 180,
          pts: { A: [160, 30], B: [70, 150], C: [250, 150], H: [160, 150] },
          polys: [["A", "B", "C"]],
          caches: [["A", "H"]],
          droitAngle: [["A", "H", "C"]],
          codes: [["A", "B", 1], ["A", "C", 1]],
          cotes: [["A", "B", "2,5 m", "C"], ["B", "C", "3 m", "A", 18]],
          decal: { A: [0, -8], B: [-6, 5], C: [6, 5], H: [5, 14] },
          aria: "Triangle ABC isocèle en A, AB = AC = 2,5 m, BC = 3 m ; H milieu de [BC], hauteur [AH] en pointillés"
        }),
        questions: [
          { n: "1.", points: 2, texte: "Calcule la hauteur $AH$ de la tente.", corrige: "$BH = 3 \\div 2 = 1{,}5$ m. Dans le triangle $ABH$ rectangle en $H$ : $AH^2 = AB^2 - BH^2 = 6{,}25 - 2{,}25 = 4$, donc $AH = 2$ m." },
          { n: "2.", points: 1, texte: "Un adulte de $1{,}80$ m peut-il se tenir debout au centre de la tente ?", corrige: "Oui : au centre, la tente mesure $2$ m de haut, soit $20$ cm de plus que l'adulte." },
          { n: "3.", points: 1.5, texte: "Calcule l'aire du triangle $ABC$.", corrige: "$\\dfrac{BC \\times AH}{2} = \\dfrac{3 \\times 2}{2} = 3$ m²." },
          { n: "4.", points: 1.5, texte: "La tente est un prisme droit dont la base est le triangle $ABC$ et la longueur $2{,}2$ m. Calcule son volume.", corrige: "Volume d'un prisme droit $=$ aire de la base $\\times$ hauteur : $3 \\times 2{,}2 = 6{,}6$ m³." }
        ]
      }
    ]
  }
};
