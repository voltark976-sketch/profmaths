/*
  ENTRAÎNEMENT : 3e — chapitre 12, Triangles semblables
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre troisieme-triangles-semblables.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type brevet.
  Figures dessinées par o.figGeo (assets/exercices-base.js), en pixels.
  Triangles et longueurs différents de ceux du cours, de la méthode et du QCM du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["troisieme-triangles-semblables"] = {
  revisions: {
    intro: "Les triangles semblables en un coup d'œil : angles égaux, côtés proportionnels, sommets homologues, coefficient et triangles égaux. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Triangles semblables",
        texte: "Deux triangles sont semblables quand leurs angles sont égaux deux à deux. Leurs côtés sont alors proportionnels, et réciproquement."
      },
      {
        titre: "Par les angles",
        texte: "Il suffit de **deux** angles égaux deux à deux : le troisième s'en déduit, car la somme des angles d'un triangle vaut $180^\\circ$."
      },
      {
        titre: "Par les côtés",
        texte: "On range les côtés de chaque triangle dans l'ordre croissant, puis on compare les quotients. Pour $3$ ; $5$ ; $6$ et $4{,}2$ ; $7$ ; $8{,}4$, on trouve trois fois $1{,}4$ : les triangles sont semblables."
      },
      {
        titre: "Sommets et côtés homologues",
        texte: "Les sommets homologues portent les angles égaux ; les côtés homologues leur sont opposés. Le coefficient $k$ est le quotient d'une longueur d'un triangle par la longueur homologue de l'autre."
      },
      {
        titre: "Longueurs, aires et angles",
        texte: "Si un triangle est un agrandissement de rapport $k$ d'un autre, ses longueurs sont multipliées par $k$ et son aire par $k^2$. Ses angles ne changent pas."
      },
      {
        titre: "Triangles égaux",
        texte: "Des triangles égaux sont superposables : ils sont semblables, avec $k = 1$. Il suffit qu'ils aient :\n" +
          "- leurs trois côtés égaux ;\n" +
          "- ou un angle égal compris entre deux côtés égaux ;\n" +
          "- ou un côté égal compris entre deux angles égaux."
      }
    ],
    pieges: [
      "Associer les sommets dans l'ordre des lettres : les côtés homologues sont opposés aux angles égaux.",
      "Comparer les côtés sans les avoir rangés dans l'ordre croissant.",
      "Croire que deux triangles semblables ont la même aire, ou que leurs angles sont multipliés par $k$.",
      "Confondre semblables et égaux : deux triangles égaux sont semblables, mais l'inverse est faux.",
      "Calculer $k$ dans le mauvais sens : du petit triangle au grand, $k > 1$ ; du grand au petit, $k < 1$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme au brevet (environ $60$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "La hauteur du triangle rectangle",
        duree: 20, points: 7, calculatrice: true,
        contexte: "$ABC$ est un triangle rectangle en $A$ tel que $AB = 6$ cm et $AC = 8$ cm. $H$ est le pied de la hauteur issue de $A$ : $H$ est sur $[BC]$ et $(AH) \\perp (BC)$.",
        figure: (o) => o.figGeo({
          W: 320, H: 190,
          pts: { A: [123.6, 45.2], B: [30, 170], C: [290, 170], H: [123.6, 170] },
          segs: [["A", "B"], ["A", "C"], ["B", "C"], ["A", "H"]],
          droitAngle: [["B", "A", "C"], ["A", "H", "C"]],
          cotes: [["A", "B", "6 cm", "C"], ["A", "C", "8 cm", "B"]],
          decal: { A: [0, -8], B: [-6, 5], C: [6, 5], H: [0, 16] },
          aria: "Triangle ABC rectangle en A, AB = 6 cm, AC = 8 cm ; H pied de la hauteur issue de A sur [BC]"
        }),
        questions: [
          { n: "1.", points: 1, texte: "Calcule $BC$.", corrige: "D'après le théorème de Pythagore dans le triangle $ABC$ rectangle en $A$ : $BC^2 = 6^2 + 8^2 = 100$, donc $BC = 10$ cm." },
          { n: "2.", points: 2, texte: "Démontre que les triangles $ABC$ et $HBA$ sont semblables.", indice: "Cherche deux angles égaux deux à deux.", corrige: "Le triangle $ABC$ est rectangle en $A$ et le triangle $HBA$ est rectangle en $H$. Ils ont aussi l'angle $\\widehat{ABC}$ en commun.\n\nIls ont donc deux angles égaux deux à deux (le troisième vaut $180^\\circ$ moins les deux autres) : les triangles $ABC$ et $HBA$ sont semblables." },
          { n: "3.", points: 2, texte: "Quels sont les côtés homologues ? Calcule $BH$ et $AH$.", indice: "L'hypoténuse $[BC]$ de $ABC$ correspond à l'hypoténuse $[BA]$ de $HBA$.", corrige: "Sommets homologues : $A$ et $H$ (angles droits), $B$ et $B$, $C$ et $A$. Donc $[BC]$ correspond à $[BA]$, $[AB]$ à $[HB]$ et $[AC]$ à $[HA]$.\n\nCoefficient de réduction : $k = \\dfrac{BA}{BC} = \\dfrac{6}{10} = 0{,}6$.\n\n$BH = 0{,}6 \\times 6 = 3{,}6$ cm et $AH = 0{,}6 \\times 8 = 4{,}8$ cm." },
          { n: "4.", points: 2, texte: "Calcule $HC$, puis vérifie que $HB \\times HC = AH^2$.", corrige: "$HC = BC - BH = 10 - 3{,}6 = 6{,}4$ cm.\n\n$HB \\times HC = 3{,}6 \\times 6{,}4 = 23{,}04$ et $AH^2 = 4{,}8^2 = 23{,}04$ : l'égalité est vérifiée." }
        ]
      },
      {
        titre: "Le miroir au sol",
        duree: 20, points: 7, calculatrice: true,
        contexte: "Pour estimer la hauteur d'un baobab, Nadia pose un petit miroir $M$ sur le sol horizontal, à $12$ m du pied $P$ de l'arbre. Elle recule jusqu'à voir le sommet $S$ de l'arbre dans le miroir : elle est alors au point $N$, à $1{,}5$ m du miroir, et ses yeux $Y$ sont à $1{,}6$ m du sol. L'arbre et Nadia sont verticaux, et les angles $\\widehat{SMP}$ et $\\widehat{YMN}$ sont égaux : c'est la loi de la réflexion de la lumière. La figure n'est pas à l'échelle.",
        figure: (o) => o.figGeo({
          W: 320, H: 200,
          pts: { S: [40, 20], P: [40, 180], M: [190, 180], N: [245, 180], Y: [245, 121.3] },
          droites: [["P", "N", 0.12]],
          segs: [["S", "P"], ["Y", "N"], ["S", "M"], ["M", "Y"]],
          droitAngle: [["S", "P", "M"], ["Y", "N", "M"]],
          angles: [["S", "M", "P", "", 18], ["Y", "M", "N", "", 18]],
          cotes: [["P", "M", "12 m", "S"], ["M", "N", "1,5 m", "Y"], ["N", "Y", "1,6 m", "M"]],
          decal: { S: [-6, 4], P: [-6, 14], M: [0, 16], N: [6, 14], Y: [6, 0] },
          aria: "Le baobab [SP] et Nadia [YN] sont verticaux ; le miroir M est au sol entre eux, à 12 m de P et 1,5 m de N ; les yeux Y sont à 1,6 m du sol ; les angles en M sont égaux"
        }),
        questions: [
          { n: "1.", points: 2, texte: "Démontre que les triangles $SPM$ et $YNM$ sont semblables.", corrige: "Les deux triangles sont rectangles, en $P$ et en $N$, et $\\widehat{SMP} = \\widehat{YMN}$. Ils ont deux angles égaux deux à deux : ils sont semblables." },
          { n: "2.", points: 1.5, texte: "Écris l'égalité des rapports des côtés homologues.", indice: "Les sommets $P$ et $N$ (angles droits) se correspondent, ainsi que les deux sommets $M$.", corrige: "$S$ correspond à $Y$, $P$ à $N$ et $M$ à $M$, donc :\n\n$\\dfrac{SP}{YN} = \\dfrac{PM}{NM} = \\dfrac{SM}{YM}$" },
          { n: "3.", points: 2, texte: "Calcule la hauteur $SP$ du baobab.", corrige: "D'après la question 2 :\n\n$\\dfrac{SP}{1{,}6} = \\dfrac{12}{1{,}5}$\n\ndonc $SP = \\dfrac{1{,}6 \\times 12}{1{,}5} = 12{,}8$ m." },
          { n: "4.", points: 1.5, texte: "Par quel coefficient passe-t-on du triangle $YNM$ au triangle $SPM$ ? Par combien l'aire est-elle multipliée ?", corrige: "$k = \\dfrac{PM}{NM} = \\dfrac{12}{1{,}5} = 8$ : les longueurs sont multipliées par $8$ et l'aire par $8^2 = 64$." }
        ]
      },
      {
        titre: "Attention aux sommets homologues",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Sur la figure, qui n'est pas en vraie grandeur, $D$ est sur $[AB]$ et $E$ sur $[AC]$. On donne : $AB = 10$ cm, $AC = 8$ cm, $BC = 9$ cm et $AD = 4$ cm. Les angles $\\widehat{ADE}$ et $\\widehat{ACB}$, marqués sur la figure, sont égaux.",
        figure: (o) => o.figGeo({
          W: 320, H: 204,
          pts: { A: [35, 182], B: [275, 182], C: [134.6, 17.9], D: [131, 182], E: [97.3, 79.4] },
          segs: [["A", "B"], ["A", "C"], ["B", "C"], ["D", "E"]],
          angles: [["A", "D", "E", "", 16], ["A", "C", "B", "", 18]],
          decal: { A: [-6, 14], B: [6, 14], C: [0, -6], D: [0, 16], E: [-6, -2] },
          aria: "Triangle ABC avec D sur [AB] et E sur [AC] ; le segment [DE] n'est pas parallèle à (BC) ; les angles ADE et ACB sont marqués égaux"
        }),
        questions: [
          { n: "1.", points: 1.5, texte: "Démontre que les triangles $ADE$ et $ACB$ sont semblables.", corrige: "Les deux triangles ont l'angle $\\widehat{BAC}$ en commun, et $\\widehat{ADE} = \\widehat{ACB}$. Ils ont deux angles égaux deux à deux : les triangles $ADE$ et $ACB$ sont semblables." },
          { n: "2.", points: 1, texte: "Le sommet $A$ correspond à $A$. À quels sommets correspondent $D$ et $E$ ?", corrige: "$D$ correspond à $C$ (angles égaux), donc $E$ correspond à $B$. Ainsi $[AD]$ correspond à $[AC]$, $[AE]$ à $[AB]$ et $[DE]$ à $[CB]$." },
          { n: "3.", points: 2, texte: "Calcule $AE$ et $DE$.", indice: "Le coefficient de réduction vaut $\\dfrac{AD}{AC}$.", corrige: "$k = \\dfrac{AD}{AC} = \\dfrac{4}{8} = 0{,}5$.\n\n$AE = 0{,}5 \\times AB = 5$ cm et $DE = 0{,}5 \\times CB = 4{,}5$ cm." },
          { n: "4.", points: 1.5, texte: "Les droites $(DE)$ et $(BC)$ sont-elles parallèles ? Justifie.", indice: "Compare $\\dfrac{AD}{AB}$ et $\\dfrac{AE}{AC}$.", corrige: "$\\dfrac{AD}{AB} = \\dfrac{4}{10} = 0{,}4$\n\n$\\dfrac{AE}{AC} = \\dfrac{5}{8} = 0{,}625$\n\nLes rapports sont différents : d'après la contraposée du théorème de Thalès, $(DE)$ et $(BC)$ ne sont pas parallèles. Les triangles sont pourtant semblables, mais $D$ correspond à $C$, et non à $B$." }
        ]
      }
    ]
  }
};
