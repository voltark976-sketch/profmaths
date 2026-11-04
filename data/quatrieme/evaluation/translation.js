/*
  ENTRAÎNEMENT : 4e — chapitre 12, Translations
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre quatrieme-translation.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle de 4e, sans calculatrice.
  Figures dessinées par o.figGeo (assets/exercices-base.js). Points et figures différents de ceux du cours, de la méthode et du QCM.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["quatrieme-translation"] = {
  revisions: {
    intro: "Les translations en un coup d'œil : faire glisser une figure, construire une image, calculer dans un repère et reconnaître une translation. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Translation",
        texte: "La translation qui transforme $A$ en $B$ fait glisser chaque point dans la même direction, dans le même sens et sur la même longueur que de $A$ vers $B$."
      },
      {
        titre: "Image d'un point",
        texte: "$M'$ est l'image de $M$ quand $ABM'M$ est un parallélogramme, éventuellement aplati : les segments $[AM']$ et $[BM]$ ont le même milieu."
      },
      {
        titre: "Sur un quadrillage",
        texte: "On reproduit le même déplacement pour chaque point : si $A$ arrive en $B$ en avançant de $3$ carreaux vers la droite et de $1$ vers le bas, tous les points font de même."
      },
      {
        titre: "Dans un repère",
        texte: "On ajoute le même déplacement aux coordonnées : avec le déplacement $(-1\\,;+4)$, le point $(5\\,;2)$ a pour image $(4\\,;6)$."
      },
      {
        titre: "Ce qui est conservé",
        texte: "Longueurs, angles, aires, alignement, parallélisme et milieux : l'image est superposable à la figure, sans être tournée ni retournée."
      }
    ],
    pieges: [
      "Confondre translation et symétrie : une translation ne retourne pas la figure.",
      "Se tromper de sens : la translation qui transforme $A$ en $B$ ne transforme pas $B$ en $A$.",
      "N'appliquer le déplacement qu'à un seul point de la figure.",
      "Ajouter le déplacement à une seule des deux coordonnées.",
      "Croire que l'image peut être plus grande ou plus petite que la figure."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $50$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Dans un repère",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Dans un repère, on donne $A(2\\,;-1)$ et $B(5\\,;3)$. On appelle $t$ la translation qui transforme $A$ en $B$.",
        questions: [
          { n: "1.", points: 1.5, texte: "Décris le déplacement qui mène de $A$ à $B$.", corrige: "L'abscisse augmente de $5 - 2 = 3$ et l'ordonnée de $3 - (-1) = 4$ : on se déplace de $3$ unités vers la droite et de $4$ vers le haut." },
          { n: "2.", points: 2, texte: "Donne les coordonnées des images par $t$ des points $C(-1\\,;0)$, $D(0\\,;-4)$ et $E(4\\,;2)$.", corrige: "On ajoute $3$ aux abscisses et $4$ aux ordonnées : $C'(2\\,;4)$, $D'(3\\,;0)$ et $E'(7\\,;6)$." },
          { n: "3.", points: 1.5, texte: "Quel point $F$ a pour image $F'(6\\,;1)$ par la translation $t$ ?", indice: "Fais le déplacement à l'envers.", corrige: "On retire $3$ à l'abscisse et $4$ à l'ordonnée : $F(3\\,;-3)$." },
          { n: "4.", points: 2, texte: "Le repère est orthonormé. Calcule la longueur $AB$. Que vaut alors $CC'$ ?", indice: "Utilise le théorème de Pythagore dans un triangle rectangle de côtés $3$ et $4$.", corrige: "$AB^2 = 3^2 + 4^2 = 25$, donc $AB = 5$. Par une translation, chaque point se déplace de la même longueur : $CC' = 5$ aussi." }
        ]
      },
      {
        titre: "La frise",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Une frise est formée d'un motif de $4$ cm de large, reproduit plusieurs fois par la translation de $6$ cm vers la droite. Le premier motif commence au bord gauche de la bande.",
        figure: (o) => {
          const formes = [], textes = [];
          for (let k = 0; k < 4; k++) {
            const x = 20 + 66 * k;
            formes.push({ p: [[x, 90], [x + 44, 90], [x + 22, 40]], image: k > 0 });
            textes.push([x + 22, 110, String(k + 1), "middle", "g-clabel"]);
          }
          return o.figGeo({ W: 320, H: 140, pts: { G: [20, 120], D: [300, 120] }, droites: [["G", "D", 0]], formes, textes: textes.concat([[290, 76, "…", "middle", "g-clabel"]]), sansPoint: ["G", "D"], aria: "Frise : un motif triangulaire de 4 cm de large répété tous les 6 cm vers la droite ; motifs numérotés 1, 2, 3, 4" });
        },
        questions: [
          { n: "1.", points: 2, texte: "À quelle distance du bord gauche commence le troisième motif ?", corrige: "Chaque motif commence $6$ cm après le précédent : le troisième commence à $2 \\times 6 = 12$ cm du bord." },
          { n: "2.", points: 2, texte: "La bande mesure $1$ m. Combien de motifs complets peut-on y placer ?", indice: "Le motif n° $n$ commence à $6(n - 1)$ cm et se termine $4$ cm plus loin.", corrige: "Le motif n° $n$ se termine à $6(n - 1) + 4$ cm. Il faut $6(n - 1) + 4 \\leqslant 100$, soit $n - 1 \\leqslant 16$ : on peut placer $17$ motifs complets (le dernier se termine exactement à $100$ cm)." },
          { n: "3.", points: 1.5, texte: "Un motif a une aire de $10$ cm². Quelle est l'aire totale des motifs de la bande ?", corrige: "Une translation conserve les aires : $17 \\times 10 = 170$ cm²." },
          { n: "4.", points: 1.5, texte: "Par quelle translation passe-t-on du deuxième motif au cinquième ?", corrige: "Il y a $3$ décalages de $6$ cm : c'est la translation de $18$ cm vers la droite." }
        ]
      },
      {
        titre: "Translation ou pas ?",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Sur le quadrillage, les figures 2, 3 et 4 ont toutes la même taille que la figure 1.",
        figure: (o) => o.figGeo({
          W: 320, H: 150,
          grille: [20, 14, 20, 14, 6],
          formes: [
            { p: [[40, 114], [80, 114], [80, 94], [60, 94], [60, 54], [40, 54]] },
            { p: [[100, 94], [140, 94], [140, 74], [120, 74], [120, 34], [100, 34]] },
            { p: [[220, 114], [180, 114], [180, 94], [200, 94], [200, 54], [220, 54]] },
            { p: [[280, 34], [240, 34], [240, 54], [260, 54], [260, 94], [280, 94]] }
          ],
          textes: [[50, 88, "1", "middle", "g-clabel"], [110, 68, "2", "middle", "g-clabel"], [210, 88, "3", "middle", "g-clabel"], [270, 68, "4", "middle", "g-clabel"]],
          pts: { A: [40, 114], B: [100, 94] },
          decal: { A: [-4, 12], B: [-4, 12] },
          aria: "Quadrillage avec quatre figures en L de même taille : la figure 2 est la figure 1 déplacée, la figure 3 est retournée comme dans un miroir, la figure 4 est la tête en bas ; A est un sommet de la figure 1 et B le sommet correspondant de la figure 2"
        }),
        questions: [
          { n: "1.", points: 2, texte: "Quelle figure est l'image de la figure 1 par une translation ? Justifie.", corrige: "La figure 2 : elle a glissé sans tourner ni se retourner, tous ses points s'étant déplacés de la même façon." },
          { n: "2.", points: 2, texte: "Décris cette translation.", corrige: "C'est la translation qui transforme $A$ en $B$ : $3$ carreaux vers la droite et $1$ carreau vers le haut." },
          { n: "3.", points: 2, texte: "Pourquoi les figures 3 et 4 ne sont-elles pas des images de la figure 1 par une translation ?", corrige: "La figure 3 est retournée, comme dans un miroir : c'est l'image par une symétrie axiale. La figure 4 a tourné d'un demi-tour (elle a la tête en bas) : c'est l'image par une symétrie centrale. Une translation ne retourne pas et ne fait pas tourner une figure." }
        ]
      }
    ]
  }
};
