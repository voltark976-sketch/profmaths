/*
  CHAPITRE : 4e — Translations
  -----------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 4e en 2026-2027 : comprendre l'effet d'une
  translation (glissement : direction, sens, longueur) ; construire l'image d'un point et d'une figure, sur
  quadrillage ; propriétés de conservation ; lien avec le parallélogramme ; distinguer translation et symétries.
  Figures : "tl4-translation", "tl4-parallelogramme", "tl4-conservation", "tl4-frise" (assets/exercices-quatrieme.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["quatrieme-translation"] = {
  niveau: "4e",
  numero: 12,
  titre: "Translations",
  accroche: "Faire glisser une figure sans la tourner ni la retourner : construire l'image d'un point et d'une figure, et reconnaître une translation parmi les transformations.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : translation (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Translation.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : translation (Yvan Monka)", url: "https://youtu.be/VDoKt5iFbm8", type: "video" },
    { titre: "Construire l'image d'une figure par une translation (Yvan Monka)", url: "https://youtu.be/chYUBSVEoFo", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Qu'est-ce qu'une translation ?",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître l'image d'une figure par une translation", youtube: "https://youtu.be/b_22mF3ZbwI" },
      texte:
        "Une **translation** fait **glisser** une figure : tous les points se déplacent dans la même **direction**, dans le même **sens** et de la même **longueur**. La figure ne tourne pas et n'est pas retournée.\n\n" +
        "La translation qui transforme $A$ en $B$ est représentée par une flèche de $A$ vers $B$. Sur la figure, elle déplace le triangle de $4$ carreaux vers la droite et de $2$ vers le haut.",
      figure: "tl4-translation",
      exemple: {
        enonce: "Comment distinguer une translation d'une symétrie ?",
        solution: "Par une translation, la figure garde la même orientation. Par une symétrie axiale, elle est retournée comme dans un miroir ; par une symétrie centrale, elle fait un demi-tour."
      }
    },
    {
      titre: "Construire une image",
      video: { titre: "Vidéo d'Yvan Monka : déterminer l'image d'un point par une translation", youtube: "https://youtu.be/SoVoMYDUgQY" },
      texte:
        "- Sur quadrillage : on compte le déplacement de $A$ à $B$ (carreaux horizontaux et verticaux), et on le reproduit à partir de chaque point.\n" +
        "- Sur feuille blanche : l'image $M'$ de $M$ est telle que $ABM'M$ est un **parallélogramme** (on peut le construire au compas).\n\n" +
        "Pour une figure, on construit l'image de chaque sommet, puis on les relie.",
      figure: "tl4-parallelogramme",
      exemple: {
        enonce: "La translation transforme $A(1 \\, ; \\, 1)$ en $B(5 \\, ; \\, 3)$. Quelle est l'image de $M(2 \\, ; \\, 4)$ ?",
        solution: "Le déplacement est de $+4$ horizontalement et $+2$ verticalement : $M'(6 \\, ; \\, 6)$."
      }
    },
    {
      titre: "Propriétés",
      video: { titre: "Vidéo d'Yvan Monka : utiliser les propriétés de conservation", youtube: "https://youtu.be/OX88gEucBY8" },
      texte:
        "Une translation **conserve** les longueurs, les angles, les aires, l'alignement et les milieux. L'image d'une droite est une droite **parallèle**.\n\n" +
        "Si la translation transforme $A$ en $B$ et $M$ en $M'$, alors $ABM'M$ est un parallélogramme (éventuellement aplati) : tous les points glissent de la même longueur $AB$.\n\n" +
        "Les frises des salouvas ou des nattes sont souvent faites d'un motif répété par la même translation.",
      figure: "tl4-conservation",
      exemple: {
        enonce: "Par une translation, un triangle d'aire $12$ cm² et de périmètre $16$ cm a pour image un triangle. Quelles sont son aire et son périmètre ?",
        solution: "Ils sont conservés : $12$ cm² et $16$ cm."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "tl4-point", titre: "Image d'un point, d'une figure", etape: "Construire", nb: 6 },
    { type: "tl4-identifier", titre: "Translation ou symétrie ?", etape: "Reconnaître", nb: 6 },
    { type: "tl4-proprietes", titre: "Propriétés", etape: "Propriétés", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Une translation correspond à :", choix: ["un glissement", "un demi-tour", "un pliage", "un agrandissement"], bonne: 0, explication: "Direction, sens et longueur fixés." },
    { question: "Une translation est définie par :", choix: ["une direction, un sens et une longueur", "un centre", "un axe", "un angle"], bonne: 0, explication: "Comme une flèche." },
    { question: "Par une translation, une figure :", choix: ["garde la même orientation", "est retournée", "fait un demi-tour", "change de forme"], bonne: 0, explication: "Elle glisse seulement." },
    { question: "La translation transforme $A$ en $B$ et $C$ en $D$. Alors $ABDC$ est :", choix: ["un parallélogramme", "un triangle", "un trapèze quelconque", "un losange toujours"], bonne: 0, explication: "Propriété de la translation." },
    { question: "Par une translation, un segment de $5$ cm a pour image un segment de :", choix: ["$5$ cm", "$10$ cm", "$2{,}5$ cm", "longueur variable"], bonne: 0, explication: "Les longueurs sont conservées." },
    { question: "Par une translation, l'image d'une droite est une droite :", choix: ["parallèle", "perpendiculaire", "sécante", "de longueur double"], bonne: 0, explication: "Propriété de conservation de la direction." },
    { question: "Sur la figure, le triangle se déplace de :", figure: "tl4-translation", choix: ["$4$ carreaux à droite et $2$ en haut", "$2$ à droite et $4$ en haut", "$4$ à gauche et $2$ en bas", "$6$ à droite"], bonne: 0, explication: "Comme de $A$ à $B$." },
    { question: "Avec un déplacement de $+3$ ; $-2$, le point $(1 \\, ; \\, 5)$ a pour image :", choix: ["$(4 \\, ; \\, 3)$", "$(-2 \\, ; \\, 7)$", "$(3 \\, ; \\, -2)$", "$(4 \\, ; \\, 7)$"], bonne: 0, explication: "$1 + 3 = 4$ et $5 - 2 = 3$." },
    { question: "Une figure retournée comme dans un miroir est l'image par :", choix: ["une symétrie axiale", "une translation", "une symétrie centrale", "un agrandissement"], bonne: 0, explication: "Le pliage retourne la figure." },
    { question: "Une figure « la tête en bas » est l'image par :", choix: ["une symétrie centrale", "une translation", "une symétrie axiale verticale", "aucune transformation"], bonne: 0, explication: "Demi-tour." },
    { question: "Par une translation, les angles sont :", choix: ["conservés", "doublés", "changés en angles droits", "divisés par deux"], bonne: 0, explication: "La figure ne se déforme pas." },
    { question: "La translation qui transforme $A$ en $B$ transforme $B$ en :", choix: ["un point $C$ tel que $B$ soit le milieu de $[AC]$", "$A$", "$B$", "le milieu de $[AB]$"], bonne: 0, explication: "On refait le même glissement à partir de $B$." },
    { question: "Sur la figure, la translation transforme $A$ en $B$ et $M$ en $M'$. Le quadrilatère $ABM'M$ est :", figure: "tl4-parallelogramme", choix: ["un parallélogramme", "un trapèze quelconque", "un cerf-volant", "un triangle"], bonne: 0, explication: "$[AB]$ et $[MM']$ sont parallèles, de même sens et de même longueur." },
    { question: "Sur la figure, $A'B'C'$ est l'image de $ABC$ par une translation. Que vaut $A'B'$ ?", figure: "tl4-conservation", choix: ["$5$ cm", "$10$ cm", "$2{,}5$ cm", "on ne peut pas savoir"], bonne: 0, explication: "Une translation conserve les longueurs." },
    { question: "Sur la figure, $A'B'C'$ est l'image de $ABC$ par une translation et $\\widehat{BAC} = 67^\\circ$. L'angle $\\widehat{B'A'C'}$ mesure :", figure: "tl4-conservation", choix: ["$67^\\circ$", "$113^\\circ$", "$23^\\circ$", "$134^\\circ$"], bonne: 0, explication: "Une translation conserve les angles." },
    { question: "Sur la frise, le premier motif commence à $3$ cm du bord et le motif est répété par une translation de $8$ cm. Le $5$e motif commence à :", figure: "tl4-frise", choix: ["$35$ cm", "$43$ cm", "$40$ cm", "$32$ cm"], bonne: 0, explication: "Du 1er au 5e motif : $4$ déplacements, donc $3 + 4 \\times 8 = 35$ cm." },
    { question: "La translation qui transforme $A$ en $B$ transforme $M$ en $M'$, avec $AB = 6$ cm. Alors $MM'$ mesure :", choix: ["$6$ cm", "$3$ cm", "$12$ cm", "ça dépend de $M$"], bonne: 0, explication: "Tous les points se déplacent de la même longueur." },
    { question: "Par une translation, un rectangle de $4$ cm sur $3$ cm a pour image une figure d'aire :", choix: ["$12$ cm²", "$14$ cm²", "$7$ cm²", "$24$ cm²"], bonne: 0, explication: "L'aire est conservée : $4 \\times 3 = 12$ cm²." },
    { question: "Par une translation, le milieu $I$ de $[AB]$ a pour image :", choix: ["le milieu de $[A'B']$", "le point $I$", "le point $A'$", "le milieu de $[AA']$"], bonne: 0, explication: "Les milieux sont conservés." },
    { question: "Avec un déplacement de $-4$ ; $+1$ sur quadrillage, le point $(6 \\, ; \\, 2)$ a pour image :", choix: ["$(2 \\, ; \\, 3)$", "$(10 \\, ; \\, 3)$", "$(2 \\, ; \\, 1)$", "$(5 \\, ; \\, -2)$"], bonne: 0, explication: "$6 - 4 = 2$ et $2 + 1 = 3$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Construire l'image d'une figure",
      etapes: [
        "Repère le déplacement de $A$ à $B$ (carreaux ou parallélogramme).",
        "Applique ce déplacement à chaque sommet.",
        "Relie les images dans le même ordre ; vérifie que la figure a juste glissé."
      ],
      figure: "tl4-translation",
      exemple: "Déplacement $(+2 \\, ; \\, -3)$ : $(4 \\, ; \\, 5)$ devient $(6 \\, ; \\, 2)$."
    },
    {
      titre: "Reconnaître une transformation",
      etapes: [
        "Même orientation : translation.",
        "Retournement en miroir : symétrie axiale.",
        "Demi-tour : symétrie centrale."
      ],
      exemple: "Un « L » qui reste un « L » à l'endroit, déplacé : translation."
    },
    {
      titre: "Utiliser les propriétés de conservation",
      etapes: [
        "Repère la figure de départ et son image (même ordre des lettres).",
        "Longueurs, angles, aires et milieux sont les mêmes que sur la figure de départ.",
        "Si la longueur cherchée est un déplacement ($MM'$), elle est égale à $AB$ : c'est le parallélogramme $ABM'M$."
      ],
      figure: "tl4-conservation",
      exemple: "$AB = 5$ cm et $\\widehat{BAC} = 67^\\circ$, donc $A'B' = 5$ cm et $\\widehat{B'A'C'} = 67^\\circ$."
    }
  ],
  erreurs: [
    "Faire le déplacement dans le mauvais sens (de $B$ vers $A$).",
    "Confondre translation et symétrie.",
    "Inverser déplacement horizontal et vertical.",
    "Oublier l'ordre des lettres dans le parallélogramme $ABM'M$.",
    "Croire qu'une translation change les longueurs."
  ]
};
