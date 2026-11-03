/*
  ENTRAÎNEMENT : 3e — chapitre 14, Transformations
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre troisieme-transformations.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type brevet.
  Figures dessinées par o.figGeo (assets/exercices-base.js), en pixels.
  Figures, rapports et angles différents de ceux du cours, de la méthode et du QCM du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["troisieme-transformations"] = {
  revisions: {
    intro: "Les transformations en un coup d'œil : translation, rotation, homothétie, ce qu'elles conservent et comment les reconnaître. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Translation",
        texte: "La translation qui transforme $A$ en $B$ fait glisser toute la figure dans la même direction, le même sens et sur la même longueur que de $A$ vers $B$."
      },
      {
        titre: "Rotation",
        texte: "Une rotation est définie par un centre $O$, un angle et un sens. Chaque point $M$ tourne autour de $O$ : $OM' = OM$ et l'angle $\\widehat{MOM'}$ est l'angle de la rotation. Le demi-tour ($180^\\circ$) est la symétrie centrale."
      },
      {
        titre: "Homothétie",
        texte: "L'homothétie de centre $O$ et de rapport $k$ envoie $M$ sur $M'$, aligné avec $O$ et $M$, tel que $OM' = |k| \\times OM$ : du même côté que $M$ si $k > 0$, de l'autre côté de $O$ si $k < 0$."
      },
      {
        titre: "Ce qui est conservé",
        texte: "Translations, rotations et symétries conservent les longueurs, les angles, les aires et le parallélisme : l'image est superposable à la figure de départ."
      },
      {
        titre: "Effets d'une homothétie",
        texte: "Les longueurs sont multipliées par $|k|$ et les aires par $k^2$. Les angles sont conservés, et l'image d'une droite est une droite qui lui est parallèle."
      },
      {
        titre: "Reconnaître une transformation",
        texte:
          "- même taille, même orientation : translation ;\n" +
          "- même taille, la figure a tourné : rotation ;\n" +
          "- même taille, retournée comme dans un miroir : symétrie axiale ;\n" +
          "- taille différente : homothétie."
      }
    ],
    pieges: [
      "Confondre le sens des aiguilles d'une montre et le sens inverse.",
      "Oublier que, si $k < 0$, l'image est de l'autre côté du centre.",
      "Multiplier les aires par $k$ au lieu de $k^2$.",
      "Croire qu'un rapport négatif réduit la figure : c'est $|k|$ qui compte, et $k = -2$ agrandit.",
      "Prendre une rotation pour une symétrie axiale : une rotation ne retourne pas la figure."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme au brevet (environ $60$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le quadrillage",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Sur le quadrillage ci-dessous, les figures 2, 3 et 4 sont les images de la figure 1 par trois transformations différentes.",
        figure: (o) => o.figGeo({
          W: 320, H: 200,
          grille: [17, 14, 22, 13, 8],
          formes: [
            { p: [[83, 168], [127, 168], [127, 146], [105, 146], [105, 102], [83, 102]] },
            { p: [[259, 124], [303, 124], [303, 102], [281, 102], [281, 58], [259, 58]] },
            { p: [[127, 80], [127, 36], [105, 36], [105, 58], [61, 58], [61, 80]] },
            { p: [[149, 146], [237, 146], [237, 102], [193, 102], [193, 14], [149, 14]] }
          ],
          textes: [[94, 139, "1", "middle", "g-clabel"], [270, 95, "2", "middle", "g-clabel"], [94, 73, "3", "middle", "g-clabel"], [193, 128, "4", "middle", "g-clabel"]],
          pts: { K: [17, 190], O: [61, 102], A: [83, 168], B: [259, 124] },
          decal: { K: [5, -5], O: [-5, -4], A: [-5, 12], B: [-5, 12] },
          aria: "Quadrillage avec quatre figures en forme de L : la figure 1 en bas à gauche, la figure 2 à droite, la figure 3 en haut à gauche, tournée d'un quart de tour, la figure 4 au centre, deux fois plus grande ; points K (coin du quadrillage), O, A (sommet de la figure 1) et B (sommet de la figure 2)"
        }),
        questions: [
          { n: "1.", points: 1.5, texte: "Quelle transformation transforme la figure 1 en la figure 2 ?", corrige: "La figure a glissé sans tourner ni changer de taille : c'est la translation qui transforme $A$ en $B$ ($8$ carreaux vers la droite et $2$ vers le haut)." },
          { n: "2.", points: 2, texte: "Quelle transformation transforme la figure 1 en la figure 3 ? Précise son centre, son angle et son sens.", indice: "La figure 3 a la même taille que la figure 1, mais elle a tourné autour du point $O$.", corrige: "C'est la rotation de centre $O$ et d'angle $90^\\circ$, dans le sens inverse des aiguilles d'une montre : le sommet $A$, situé $3$ carreaux sous $O$ et $1$ à sa droite, arrive $3$ carreaux à droite de $O$ et $1$ au-dessus." },
          { n: "3.", points: 2, texte: "Quelle transformation transforme la figure 1 en la figure 4 ? Précise son centre et son rapport.", indice: "La figure 4 est deux fois plus grande que la figure 1.", corrige: "C'est l'homothétie de centre $K$ et de rapport $2$ : chaque sommet de la figure 4 est deux fois plus loin de $K$ que le sommet correspondant de la figure 1, du même côté. Par exemple, $A$ est à $3$ carreaux à droite et $1$ au-dessus de $K$, son image à $6$ carreaux à droite et $2$ au-dessus." },
          { n: "4.", points: 1.5, texte: "Compare les aires des figures 1 et 4.", corrige: "La figure 1 couvre $4$ carreaux. Les longueurs étant multipliées par $2$, l'aire est multipliée par $2^2 = 4$ : la figure 4 couvre $16$ carreaux." }
        ]
      },
      {
        titre: "Une homothétie de rapport négatif",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Sur la figure, qui n'est pas en vraie grandeur, le triangle $A'B'C'$ est l'image du triangle $ABC$ par une homothétie de centre $O$. On donne : $OA = 3$ cm, $OA' = 6$ cm, $AB = 2{,}5$ cm, et l'aire du triangle $ABC$ vaut $3$ cm².",
        figure: (o) => o.figGeo({
          W: 320, H: 165,
          pts: { O: [140, 90], A: [110, 65], B: [82, 82], C: [105, 105], "A'": [200, 140], "B'": [256, 106], "C'": [210, 60] },
          polys: [["A", "B", "C"]],
          teintes: [["A'", "B'", "C'"]],
          caches: [["A", "A'"], ["B", "B'"], ["C", "C'"]],
          cotes: [["O", "A", "3 cm", "B"], ["O", "A'", "6 cm", "B'"]],
          decal: { O: [0, 16], A: [0, -7], B: [-6, 4], C: [0, 15], "A'": [0, 15], "B'": [6, 4], "C'": [0, -7] },
          aria: "Triangle ABC et son image A'B'C' par une homothétie de centre O : chaque point et son image sont alignés avec O, de part et d'autre de O ; OA = 3 cm, OA' = 6 cm"
        }),
        questions: [
          { n: "1.", points: 1.5, texte: "Quel est le rapport de cette homothétie ? Justifie son signe.", corrige: "$A'$ est de l'autre côté de $O$ par rapport à $A$ : le rapport est négatif. De plus, $\\dfrac{OA'}{OA} = \\dfrac{6}{3} = 2$, donc le rapport vaut $-2$." },
          { n: "2.", points: 1.5, texte: "Calcule la longueur $A'B'$.", corrige: "Les longueurs sont multipliées par $|-2| = 2$ : $A'B' = 2 \\times 2{,}5 = 5$ cm." },
          { n: "3.", points: 2, texte: "Calcule l'aire du triangle $A'B'C'$.", indice: "Les aires sont multipliées par le carré du rapport.", corrige: "Les aires sont multipliées par $(-2)^2 = 4$ : l'aire de $A'B'C'$ vaut $4 \\times 3 = 12$ cm²." },
          { n: "4.", points: 2, texte: "Les droites $(AB)$ et $(A'B')$ sont-elles parallèles ? Que peut-on dire des angles du triangle $A'B'C'$ ?", corrige: "Une homothétie transforme une droite en une droite parallèle : $(A'B') \\parallel (AB)$. Elle conserve les angles : le triangle $A'B'C'$ a les mêmes angles que $ABC$ (les deux triangles sont semblables)." }
        ]
      },
      {
        titre: "L'éolienne",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Les trois pales d'une éolienne sont identiques et régulièrement réparties autour du centre $O$ du rotor. L'extrémité $A$ de la première pale est à $40$ m de $O$ ; $B$ est l'extrémité de la deuxième pale (valeurs arrondies).",
        figure: (o) => o.figGeo({
          W: 320, H: 204,
          formes: [
            { p: [[157, 96], [163, 96], [167, 196], [153, 196]] },
            { p: [[164, 92], [167, 72], [160, 22], [153, 72], [156, 92]] },
            { p: [[158, 95.5], [173.8, 108.1], [220.6, 127], [180.8, 95.9], [162, 88.5]] },
            { p: [[158, 88.5], [139.2, 95.9], [99.4, 127], [146.2, 108.1], [162, 95.5]] }
          ],
          cercles: [["O", 5]],
          pts: { O: [160, 92], A: [160, 22], B: [220.6, 127] },
          decal: { O: [8, -6], A: [0, -6], B: [6, 10] },
          aria: "Éolienne vue de face : trois pales identiques autour du centre O ; A est l'extrémité de la pale du haut, B celle de la pale suivante, en bas à droite"
        }),
        questions: [
          { n: "1.", points: 1.5, texte: "Par quelle rotation passe-t-on de la première pale à la deuxième ?", corrige: "Les trois pales se partagent le tour complet : $360^\\circ \\div 3 = 120^\\circ$. C'est la rotation de centre $O$ et d'angle $120^\\circ$, dans le sens des aiguilles d'une montre (de $A$ vers $B$)." },
          { n: "2.", points: 1, texte: "Quelle est l'image de la première pale par deux rotations successives de ce type ? Et par trois ?", corrige: "Deux rotations ($240^\\circ$) l'amènent à la place de la troisième pale. Trois rotations ($360^\\circ$) la ramènent à sa place." },
          { n: "3.", points: 2, texte: "Le triangle $OAB$ est isocèle en $O$, avec $OA = OB = 40$ m et $\\widehat{AOB} = 120^\\circ$. Calcule la distance $AB$, arrondie au dixième de mètre.", indice: "La hauteur issue de $O$ coupe $[AB]$ en son milieu $I$, et $\\widehat{AOI} = 60^\\circ$.", corrige: "Dans le triangle $AOI$ rectangle en $I$ :\n\n$\\sin \\widehat{AOI} = \\dfrac{AI}{OA}$\n\ndonc $AI = 40 \\times \\sin 60^\\circ \\approx 34{,}64$ m, et $AB = 2 \\times AI \\approx 69{,}3$ m." },
          { n: "4.", points: 1.5, texte: "Le rotor fait $15$ tours par minute. Quelle distance parcourt l'extrémité $A$ en une minute ? Déduis-en sa vitesse en km/h, arrondie à l'unité.", corrige: "Un tour : $2\\pi \\times 40 = 80\\pi$ m. En une minute : $15 \\times 80\\pi = 1\\,200\\pi \\approx 3\\,770$ m.\n\nEn une heure : $60 \\times 1\\,200\\pi = 72\\,000\\pi \\approx 226\\,195$ m, soit environ $226$ km/h." }
        ]
      }
    ]
  }
};
