/*
  ENTRAÎNEMENT : 4e — chapitre 6, Pyramides, cônes et repérage dans l'espace
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre quatrieme-espace.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle de 4e.
  Figures dessinées par o.figGeo (assets/exercices-base.js). Solides et dimensions différents de ceux du cours, de la méthode et du QCM.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["quatrieme-espace"] = {
  revisions: {
    intro: "Pyramides, cônes et repérage en un coup d'œil : décrire les solides, calculer leur volume, prévoir l'effet d'un agrandissement et lire des coordonnées dans un pavé. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Pyramide et cône",
        texte: "Une pyramide a pour base un polygone et des faces latérales triangulaires qui se rejoignent au sommet. Un cône de révolution a pour base un disque ; sa hauteur relie le sommet au centre de la base."
      },
      {
        titre: "Volumes",
        texte:
          "- pyramide : $V = \\dfrac{\\text{aire de la base} \\times h}{3}$ ;\n" +
          "- cône de rayon $r$ : $V = \\dfrac{\\pi r^2 \\times h}{3}$ ;\n" +
          "- c'est le tiers du volume du prisme ou du cylindre de même base et de même hauteur."
      },
      {
        titre: "Agrandissement et réduction",
        texte: "Si les longueurs sont multipliées par $k$, les aires sont multipliées par $k^2$ et les volumes par $k^3$ : avec $k = \\dfrac{1}{2}$, un volume est divisé par $8$."
      },
      {
        titre: "Se repérer dans un pavé",
        texte: "Avec une origine et trois axes, un point est repéré par trois nombres : l'abscisse, l'ordonnée et l'altitude, par exemple $(3\\,;1\\,;2)$."
      },
      {
        titre: "Unités de volume",
        texte: "$1$ m³ $= 1\\,000$ dm³ et $1$ dm³ $= 1$ L $= 1\\,000$ cm³."
      }
    ],
    pieges: [
      "Oublier de diviser par $3$ pour une pyramide ou un cône.",
      "Prendre le diamètre à la place du rayon dans $\\pi r^2$.",
      "Multiplier les volumes par $k$ ou $k^2$ au lieu de $k^3$.",
      "Confondre la hauteur d'une pyramide avec la hauteur d'une face latérale.",
      "Mélanger l'ordre des coordonnées : abscisse, puis ordonnée, puis altitude."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $50$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le tas de sable",
        duree: 20, points: 7, calculatrice: true,
        contexte: "Sur un chantier, un tas de sable a la forme d'un cône de révolution de rayon $1{,}2$ m et de hauteur $0{,}9$ m.",
        questions: [
          { n: "1.", points: 2, texte: "Calcule le volume du tas de sable : donne la valeur exacte, puis une valeur arrondie au centième de m³.", corrige: "$V = \\dfrac{\\pi \\times 1{,}2^2 \\times 0{,}9}{3}$\n\n${} = 0{,}432\\pi \\approx 1{,}36$ m³" },
          { n: "2.", points: 1.5, texte: "Un mètre cube de ce sable pèse $1{,}5$ tonne. Quelle est la masse du tas, arrondie au centième de tonne ?", corrige: "$0{,}432\\pi \\times 1{,}5 \\approx 2{,}04$ tonnes." },
          { n: "3.", points: 2, texte: "On veut remplir une jardinière en forme de pavé droit de $2$ m sur $0{,}8$ m sur $0{,}5$ m. Le tas suffit-il ? Combien de sable reste-t-il ?", corrige: "Volume de la jardinière : $2 \\times 0{,}8 \\times 0{,}5 = 0{,}8$ m³. Comme $0{,}8 < 1{,}36$, le tas suffit, et il reste environ $1{,}36 - 0{,}8 = 0{,}56$ m³ de sable." },
          { n: "4.", points: 1.5, texte: "Un autre tas a la même forme, mais il est deux fois plus large et deux fois plus haut. Quel est son volume ?", indice: "C'est un agrandissement de rapport $2$.", corrige: "Les longueurs sont multipliées par $2$, donc le volume par $2^3 = 8$ : environ $8 \\times 1{,}357 \\approx 10{,}86$ m³." }
        ]
      },
      {
        titre: "Les bougies pyramidales",
        duree: 15, points: 7, calculatrice: true,
        contexte: "Une grande bougie a la forme d'une pyramide régulière à base carrée de $9$ cm de côté et de $12$ cm de hauteur. Une petite bougie a la même forme, avec une base carrée de $6$ cm de côté.",
        questions: [
          { n: "1.", points: 2, texte: "Calcule le volume de la grande bougie.", corrige: "$V = \\dfrac{9^2 \\times 12}{3} = \\dfrac{972}{3} = 324$ cm³." },
          { n: "2.", points: 2, texte: "La petite bougie est une réduction de la grande. Quel est le rapport de réduction ? Quelle est sa hauteur ?", corrige: "$k = \\dfrac{6}{9} = \\dfrac{2}{3}$. Hauteur : $12 \\times \\dfrac{2}{3} = 8$ cm." },
          { n: "3.", points: 2, texte: "Calcule le volume de la petite bougie de deux façons.", corrige: "Avec le rapport : $324 \\times \\left(\\dfrac{2}{3}\\right)^3 = 324 \\times \\dfrac{8}{27} = 96$ cm³.\n\nDirectement : $\\dfrac{6^2 \\times 8}{3} = \\dfrac{288}{3} = 96$ cm³." },
          { n: "4.", points: 1, texte: "La cire coûte $1{,}50$ € pour $100$ cm³. Combien coûte la cire des deux bougies ?", corrige: "$324 + 96 = 420$ cm³, soit $4{,}2 \\times 1{,}50 = 6{,}30$ €." }
        ]
      },
      {
        titre: "Se repérer dans le pavé",
        duree: 15, points: 6, calculatrice: false,
        contexte: "$ABCDEFGH$ est un pavé droit avec $AB = 5$, $AD = 4$ et $AE = 3$ (en cm). On se repère avec l'origine $A$ et les axes $(AB)$, $(AD)$ et $(AE)$.",
        figure: (o) => o.figGeo({
          W: 320, H: 196,
          pts: { A: [60, 170], B: [220, 170], C: [284, 122], D: [124, 122], E: [60, 74], F: [220, 74], G: [284, 26], H: [124, 26] },
          segs: [["A", "B"], ["B", "C"], ["A", "E"], ["B", "F"], ["C", "G"], ["E", "F"], ["F", "G"], ["G", "H"], ["H", "E"]],
          caches: [["A", "D"], ["D", "C"], ["D", "H"]],
          cotes: [["A", "B", "5 cm", "E"], ["B", "C", "4 cm", "A"], ["A", "E", "3 cm", "B"]],
          decal: { A: [-6, 12], B: [4, 14], C: [6, 8], D: [5, -5], E: [-6, -2], F: [-4, -5], G: [6, 0], H: [-6, -2] },
          aria: "Pavé droit ABCDEFGH : AB = 5 cm, BC = 4 cm, AE = 3 cm ; les arêtes issues de D sont cachées"
        }),
        questions: [
          { n: "1.", points: 1.5, texte: "Donne les coordonnées des points $B$, $D$ et $E$.", corrige: "$B(5\\,;0\\,;0)$, $D(0\\,;4\\,;0)$ et $E(0\\,;0\\,;3)$." },
          { n: "2.", points: 1.5, texte: "Donne les coordonnées des points $G$ et $H$.", corrige: "$G(5\\,;4\\,;3)$ et $H(0\\,;4\\,;3)$." },
          { n: "3.", points: 1.5, texte: "$I$ est le milieu de l'arête $[FG]$. Donne ses coordonnées.", indice: "$F(5\\,;0\\,;3)$ et $G(5\\,;4\\,;3)$.", corrige: "$I$ est à mi-chemin entre $F(5\\,;0\\,;3)$ et $G(5\\,;4\\,;3)$ : $I(5\\,;2\\,;3)$." },
          { n: "4.", points: 1.5, texte: "Quels sommets ont pour coordonnées $(5\\,;4\\,;0)$ et $(0\\,;0\\,;0)$ ?", corrige: "$(5\\,;4\\,;0)$ est le sommet $C$, et $(0\\,;0\\,;0)$ l'origine $A$." }
        ]
      }
    ]
  }
};
