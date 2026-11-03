/*
  ENTRAÎNEMENT : 3e — chapitre 15, Géométrie dans l'espace
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre troisieme-espace.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type brevet.
  Figures dessinées par o.figGeo (assets/exercices-base.js), en pixels (perspective cavalière, arêtes cachées en pointillés).
  Solides et dimensions différents de ceux du cours, de la méthode et du QCM du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["troisieme-espace"] = {
  revisions: {
    intro: "La géométrie dans l'espace en un coup d'œil : volumes, sphère et boule, sections, réductions et repérage. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Volumes à connaître",
        texte:
          "- pavé droit : $L \\times \\ell \\times h$ ; cylindre : $\\pi r^2 h$ ;\n" +
          "- pyramide et cône : $\\dfrac{\\text{aire de la base} \\times h}{3}$ ;\n" +
          "- boule de rayon $r$ : $\\dfrac{4}{3}\\pi r^3$."
      },
      {
        titre: "Sphère et boule",
        texte: "La sphère de centre $O$ et de rayon $r$ est formée des points situés à la distance $r$ de $O$ ; la boule est le solide qu'elle limite. L'aire de la sphère vaut $4\\pi r^2$."
      },
      {
        titre: "Sections planes",
        texte:
          "- pavé ou cylindre coupé parallèlement à une face ou à la base : même forme que celle-ci ;\n" +
          "- pyramide ou cône coupé parallèlement à la base : une réduction de la base ;\n" +
          "- sphère : un cercle."
      },
      {
        titre: "Section d'une sphère",
        texte: "Un plan situé à la distance $d$ du centre, avec $d < r$, coupe la sphère selon un cercle de rayon $\\sqrt{r^2 - d^2}$ : c'est le théorème de Pythagore."
      },
      {
        titre: "Agrandissement et réduction",
        texte: "Dans un agrandissement ou une réduction de rapport $k$, les longueurs sont multipliées par $k$, les aires par $k^2$ et les volumes par $k^3$."
      },
      {
        titre: "Se repérer",
        texte: "Dans un pavé droit, un point est repéré par trois coordonnées : abscisse, ordonnée et altitude. Sur la Terre, on utilise la latitude (au nord ou au sud de l'équateur) et la longitude (à l'est ou à l'ouest du méridien de Greenwich)."
      }
    ],
    pieges: [
      "Oublier de diviser par $3$ le volume d'une pyramide ou d'un cône.",
      "Confondre le rayon et le diamètre.",
      "Multiplier un volume par $k$ ou par $k^2$ au lieu de $k^3$.",
      "Mélanger les unités : $1$ L $= 1$ dm³ $= 1\\,000$ cm³.",
      "Arrondir trop tôt : garde $\\pi$ jusqu'à la fin du calcul."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme au brevet (environ $60$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le cornet de glace",
        duree: 20, points: 7, calculatrice: true,
        contexte: "Un cornet a la forme d'un cône de révolution de sommet $S$, de hauteur $12$ cm et dont la base est un disque de centre $O$ et de rayon $2{,}5$ cm. Il est rempli de glace et surmonté d'une demi-boule de glace de même rayon.",
        figure: (o) => o.figGeo({
          W: 320, H: 210,
          pts: { O: [160, 75], L: [118, 75], R: [202, 75], S: [160, 190] },
          chemins: [["M118 75 A42 42 0 0 1 202 75", false]],
          ellipses: [["O", 42, 10, true]],
          segs: [["L", "S"], ["R", "S"]],
          caches: [["O", "R"], ["O", "S"]],
          textes: [[208, 79, "2,5 cm", "start"], [196, 140, "12 cm", "start"]],
          sansPoint: ["L", "R"],
          decal: { O: [0, -13], S: [0, 14] },
          aria: "Cornet en forme de cône de sommet S, de hauteur 12 cm et de rayon 2,5 cm, surmonté d'une demi-boule de même rayon"
        }),
        questions: [
          { n: "1.", points: 2, texte: "Calcule le volume du cône. Donne la valeur exacte, puis une valeur arrondie au dixième de cm³.", indice: "$V = \\dfrac{\\pi r^2 \\times h}{3}$", corrige: "$V_1 = \\dfrac{\\pi \\times 2{,}5^2 \\times 12}{3}$\n\n${} = 25\\pi \\approx 78{,}5$ cm³" },
          { n: "2.", points: 2, texte: "Calcule le volume de la demi-boule, arrondi au dixième de cm³.", corrige: "$V_2 = \\dfrac{1}{2} \\times \\dfrac{4}{3}\\pi \\times 2{,}5^3$\n\n${} = \\dfrac{2}{3}\\pi \\times 15{,}625 \\approx 32{,}7$ cm³" },
          { n: "3.", points: 1.5, texte: "Quel volume de glace faut-il pour un cornet ? Arrondis au dixième de cm³.", corrige: "$V_1 + V_2 \\approx 111{,}3$ cm³ (avec les valeurs non arrondies : $25\\pi + \\dfrac{125}{12}\\pi$)." },
          { n: "4.", points: 1.5, texte: "Un bac contient $2$ litres de glace. Combien de cornets complets peut-on servir ?", indice: "$1$ L $= 1\\,000$ cm³.", corrige: "$2$ L $= 2\\,000$ cm³, et $2\\,000 \\div 111{,}3 \\approx 17{,}97$. On peut servir $17$ cornets complets : le dix-huitième ne serait pas plein." }
        ]
      },
      {
        titre: "La pyramide coupée",
        duree: 20, points: 7, calculatrice: true,
        contexte: "Un presse-papier a la forme d'une pyramide régulière $SABCD$, de sommet $S$ et de hauteur $SO = 9$ cm, dont la base est un carré $ABCD$ de $6$ cm de côté. On le coupe par un plan parallèle à la base, à $3$ cm du sommet.",
        figure: (o) => o.figGeo({
          W: 320, H: 200,
          pts: { S: [170, 25], A: [70, 180], B: [210, 180], C: [270, 135], D: [130, 135], O: [170, 157.5], M: [136.7, 76.7], N: [183.3, 76.7], P: [203.3, 61.7], Q: [156.7, 61.7] },
          teintes: [["M", "N", "P", "Q"]],
          segs: [["S", "A"], ["S", "B"], ["S", "C"], ["A", "B"], ["B", "C"], ["M", "N"], ["N", "P"]],
          caches: [["S", "D"], ["A", "D"], ["D", "C"], ["P", "Q"], ["Q", "M"], ["S", "O"]],
          cotes: [["A", "B", "6 cm", "S"]],
          sansPoint: ["M", "N", "P", "Q"],
          decal: { S: [0, -8], A: [-6, 12], B: [6, 12], C: [6, 4], D: [-8, 0], O: [6, 12] },
          aria: "Pyramide SABCD à base carrée, hauteur [SO] en pointillés ; la section par un plan parallèle à la base, près du sommet, est teintée"
        }),
        questions: [
          { n: "1.", points: 1.5, texte: "Calcule le volume de la pyramide $SABCD$.", corrige: "$V = \\dfrac{6^2 \\times 9}{3} = \\dfrac{324}{3} = 108$ cm³." },
          { n: "2.", points: 2, texte: "Quelle est la nature de la section ? Donne ses dimensions.", indice: "La petite pyramide est une réduction de la grande, de rapport $\\dfrac{3}{9}$.", corrige: "La section d'une pyramide par un plan parallèle à sa base est une réduction de la base : c'est un carré. Le rapport de réduction vaut $k = \\dfrac{3}{9} = \\dfrac{1}{3}$, donc le carré a pour côté $6 \\times \\dfrac{1}{3} = 2$ cm." },
          { n: "3.", points: 2, texte: "Calcule le volume de la petite pyramide située au-dessus de la section.", corrige: "Les volumes sont multipliés par $k^3 = \\left(\\dfrac{1}{3}\\right)^3 = \\dfrac{1}{27}$ : $108 \\times \\dfrac{1}{27} = 4$ cm³.\n\nVérification : $\\dfrac{2^2 \\times 3}{3} = 4$ cm³." },
          { n: "4.", points: 1.5, texte: "Quel est le volume de la partie restante, sous la section ? Quel pourcentage du volume de départ représente-t-elle ? Arrondis au dixième.", corrige: "$108 - 4 = 104$ cm³, soit $\\dfrac{104}{108} \\approx 0{,}963 = 96{,}3\\,\\%$ du volume de départ." }
        ]
      },
      {
        titre: "L'aquarium",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Un aquarium a la forme d'un pavé droit $ABCDEFGH$ avec $AB = 60$ cm, $AD = 30$ cm et $AE = 40$ cm. On se repère dans l'espace avec l'origine $A$ et les axes $(AB)$, $(AD)$ et $(AE)$, en centimètres : par exemple, $E(0\\,;0\\,;40)$.",
        figure: (o) => o.figGeo({
          W: 320, H: 200,
          pts: { A: [40, 180], B: [220, 180], C: [280, 140], D: [100, 140], E: [40, 60], F: [220, 60], G: [280, 20], H: [100, 20] },
          segs: [["A", "B"], ["B", "C"], ["A", "E"], ["B", "F"], ["C", "G"], ["E", "F"], ["F", "G"], ["G", "H"], ["H", "E"]],
          caches: [["A", "D"], ["D", "C"], ["D", "H"]],
          cotes: [["A", "B", "60 cm", "E"], ["B", "C", "30 cm", "A"], ["A", "E", "40 cm", "B"]],
          decal: { A: [-6, 12], B: [4, 14], C: [6, 8], D: [5, -5], E: [-6, -2], F: [-4, -5], G: [6, 0], H: [-6, -2] },
          aria: "Pavé droit ABCDEFGH en perspective : face avant ABFE, AB = 60 cm, BC = 30 cm, AE = 40 cm ; les arêtes issues de D sont cachées"
        }),
        questions: [
          { n: "1.", points: 1.5, texte: "Donne les coordonnées des points $B$, $D$ et $G$.", corrige: "$B(60\\,;0\\,;0)$, $D(0\\,;30\\,;0)$ et $G(60\\,;30\\,;40)$." },
          { n: "2.", points: 1.5, texte: "Calcule le volume de l'aquarium, en litres.", corrige: "$60 \\times 30 \\times 40 = 72\\,000$ cm³ $= 72$ dm³, soit $72$ L." },
          { n: "3.", points: 1.5, texte: "On le remplit aux trois quarts. Quelle est la hauteur de l'eau ? Donne les coordonnées du point de l'arête $[CG]$ situé à la surface de l'eau.", corrige: "Hauteur de l'eau : $\\dfrac{3}{4} \\times 40 = 30$ cm. Le point cherché est $(60\\,;30\\,;30)$." },
          { n: "4.", points: 1.5, texte: "Calcule la longueur de la diagonale $[AC]$ du fond, puis celle de la grande diagonale $[AG]$, arrondies au millimètre.", indice: "Le triangle $ACG$ est rectangle en $C$.", corrige: "Dans le triangle $ABC$ rectangle en $B$ : $AC^2 = 60^2 + 30^2 = 4\\,500$, donc $AC \\approx 67{,}1$ cm.\n\nDans le triangle $ACG$ rectangle en $C$ : $AG^2 = 4\\,500 + 40^2 = 6\\,100$, donc $AG \\approx 78{,}1$ cm." }
        ]
      }
    ]
  }
};
