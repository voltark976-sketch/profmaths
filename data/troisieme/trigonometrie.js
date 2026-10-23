/*
  CHAPITRE : 3e — Trigonométrie
  ------------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 3e en 2026-2027 (brevet 2027) : connaître et
  utiliser les relations entre le cosinus, le sinus ou la tangente d'un angle aigu et les longueurs de deux des
  côtés d'un triangle rectangle ; calculer une longueur ou un angle. Vidéos et cours PDF d'Yvan Monka.
  figure : triangles rectangles dessinés avec figTrig3() (assets/exercices-troisieme.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["troisieme-trigonometrie"] = {
  niveau: "3e",
  numero: 13,
  titre: "Trigonométrie",
  accroche: "Cosinus, sinus et tangente dans le triangle rectangle : calculer une longueur ou un angle.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : trigonométrie (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Trigo.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : trigonométrie (Yvan Monka)", url: "https://youtu.be/DfgUYXB5_jg", type: "video" },
    { titre: "Calculer une longueur avec cos, sin ou tan (2) (Yvan Monka)", url: "https://youtu.be/FczJ1GvpD3w", type: "video" },
    { titre: "Résoudre un problème avec cos, sin ou tan (Yvan Monka)", url: "https://youtu.be/wX-ZieMMTSY", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Les trois formules",
      video: { titre: "Vidéo d'Yvan Monka : écrire les formules de trigonométrie", youtube: "https://youtu.be/XGnTdigL8fg" },
      texte:
        "Dans un triangle rectangle, pour un angle aigu $\\alpha$ :\n\n" +
        "- $\\cos \\alpha = \\dfrac{\\text{côté adjacent}}{\\text{hypoténuse}}$ ;\n" +
        "- $\\sin \\alpha = \\dfrac{\\text{côté opposé}}{\\text{hypoténuse}}$ ;\n" +
        "- $\\tan \\alpha = \\dfrac{\\text{côté opposé}}{\\text{côté adjacent}}$.\n\n" +
        "Moyen mnémotechnique : **SOH CAH TOA**. Le cosinus et le sinus sont compris entre $0$ et $1$.\n\n" +
        "Sur la figure, pour l'angle $\\alpha$ en $B$ : l'hypoténuse $[BC]$ est en face de l'angle droit, le côté adjacent $[AB]$ touche l'angle, le côté opposé $[AC]$ est en face.",
      figure: "tg3-cours-formules",
      exemple: {
        enonce: "$ABC$ rectangle en $A$. Écris $\\tan \\widehat{ABC}$.",
        solution: "$\\tan \\widehat{ABC} = \\dfrac{AC}{AB}$ (opposé sur adjacent)."
      }
    },
    {
      titre: "Calculer une longueur",
      video: { titre: "Vidéo d'Yvan Monka : calculer une longueur avec cos, sin ou tan (1)", youtube: "https://youtu.be/BscM5Iti3zI" },
      texte:
        "1. Repère l'angle connu, le côté connu et le côté cherché.\n" +
        "2. Choisis la formule qui contient ces deux côtés.\n" +
        "3. Remplace et termine par un produit en croix, puis arrondis.\n\n" +
        "Sur la figure : $ABC$ rectangle en $A$, $\\widehat{B} = 35^\\circ$, $BC = 8$ cm. On connaît l'hypoténuse et on cherche le côté adjacent : $\\cos(35^\\circ) = \\dfrac{AB}{8}$, donc $AB = 8 \\times \\cos(35^\\circ) \\approx 6{,}6$ cm.",
      figure: "tg3-cours-longueur",
      exemple: {
        enonce: "Rectangle en $A$, $\\widehat{B} = 40^\\circ$, $AB = 5$ cm. Calcule $AC$.",
        solution: "$\\tan(40^\\circ) = \\dfrac{AC}{5}$, donc $AC = 5 \\times \\tan(40^\\circ) \\approx 4{,}2$ cm."
      }
    },
    {
      titre: "Calculer un angle",
      video: { titre: "Vidéo d'Yvan Monka : calculer un angle avec cos, sin ou tan (1)", youtube: "https://youtu.be/md7hgVVKVI0" },
      texte:
        "Si l'on connaît deux côtés, on calcule le rapport puis on utilise la touche **arccos**, **arcsin** ou **arctan** de la calculatrice (souvent notée $\\cos^{-1}$, $\\sin^{-1}$, $\\tan^{-1}$).\n\n" +
        "$\\cos \\alpha = \\dfrac{3}{5}$ donne $\\alpha \\approx 53^\\circ$.\n\n" +
        "Vérifie que la calculatrice est en mode **degrés**.\n\n" +
        "Sur la figure, on connaît l'opposé ($4$ cm) et l'adjacent ($7$ cm) de l'angle $\\alpha$ : on utilise la tangente.",
      figure: "tg3-cours-angle",
      exemple: {
        enonce: "Côté opposé $4$ cm, côté adjacent $7$ cm. Angle ?",
        solution: "$\\tan \\alpha = \\dfrac{4}{7}$, $\\alpha \\approx 30^\\circ$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "tg3-formule", titre: "Écrire les formules", etape: "Formules", nb: 5 },
    { type: "tg3-longueur", titre: "Calculer une longueur", etape: "Calculer", nb: 6 },
    { type: "tg3-angle", titre: "Calculer un angle", etape: "Calculer", nb: 6 },
    { type: "tg3-problemes", titre: "Problèmes concrets", etape: "Problèmes", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Dans un triangle rectangle, $\\sin \\alpha$ est égal à :", choix: ["$\\dfrac{\\text{opposé}}{\\text{hypoténuse}}$", "$\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$", "$\\dfrac{\\text{opposé}}{\\text{adjacent}}$", "$\\dfrac{\\text{hypoténuse}}{\\text{opposé}}$"], bonne: 0, explication: "SOH." },
    { question: "$\\tan \\alpha$ est égal à :", choix: ["$\\dfrac{\\text{opposé}}{\\text{adjacent}}$", "$\\dfrac{\\text{adjacent}}{\\text{opposé}}$", "$\\dfrac{\\text{opposé}}{\\text{hypoténuse}}$", "$\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$"], bonne: 0, explication: "TOA." },
    { question: "L'hypoténuse est :", choix: ["le côté en face de l'angle droit", "le plus petit côté", "le côté adjacent", "le côté opposé à l'angle étudié"], bonne: 0, explication: "C'est aussi le plus long côté." },
    { question: "$ABC$ rectangle en $A$ : $\\cos \\widehat{ABC}$ vaut :", choix: ["$\\dfrac{AB}{BC}$", "$\\dfrac{AC}{BC}$", "$\\dfrac{AC}{AB}$", "$\\dfrac{BC}{AB}$"], bonne: 0, explication: "Adjacent sur hypoténuse." },
    { question: "Un cosinus peut valoir :", choix: ["$0{,}6$", "$1{,}4$", "$-2$", "$3$"], bonne: 0, explication: "Entre $0$ et $1$ pour un angle aigu." },
    { question: "$\\widehat{B} = 30^\\circ$, hypoténuse $10$ cm. Le côté opposé à $\\widehat{B}$ mesure :", choix: ["$5$ cm", "$8{,}7$ cm", "$20$ cm", "$3$ cm"], bonne: 0, explication: "$10 \\times \\sin(30^\\circ) = 5$." },
    { question: "Pour trouver un angle connaissant son cosinus, on utilise :", choix: ["$\\cos^{-1}$ (arccos)", "$\\cos$", "$\\tan$", "$\\sqrt{\\phantom{x}}$"], bonne: 0, explication: "Fonction réciproque." },
    { question: "$\\tan \\alpha = 1$ pour :", choix: ["$\\alpha = 45^\\circ$", "$\\alpha = 30^\\circ$", "$\\alpha = 60^\\circ$", "$\\alpha = 90^\\circ$"], bonne: 0, explication: "Opposé $=$ adjacent." },
    { question: "On connaît l'angle et l'hypoténuse ; on cherche le côté adjacent. On utilise :", choix: ["le cosinus", "le sinus", "la tangente", "le théorème de Thalès"], bonne: 0, explication: "Adjacent et hypoténuse : CAH." },
    { question: "On connaît l'angle et le côté adjacent ; on cherche le côté opposé. On utilise :", choix: ["la tangente", "le cosinus", "le sinus", "Pythagore seul"], bonne: 0, explication: "TOA." },
    { question: "$\\cos(60^\\circ)$ vaut :", choix: ["$0{,}5$", "$60$", "$\\dfrac{\\sqrt{3}}{2}$", "$1$"], bonne: 0, explication: "Valeur à connaître ou à la calculatrice." },
    { question: "La calculatrice doit être réglée en mode :", choix: ["degrés", "radians", "grades", "scientifique"], bonne: 0, explication: "Les angles du collège sont en degrés." },
    { question: "Sur la figure, l'hypoténuse du triangle $EFG$ est :", figure: "tg3-qcm-noms", choix: ["$[FG]$", "$[EF]$", "$[EG]$", "$[EF]$ ou $[EG]$"], bonne: 0, explication: "C'est le côté en face de l'angle droit (en $E$)." },
    { question: "Sur la figure, le côté adjacent à l'angle marqué en $F$ est :", figure: "tg3-qcm-noms", choix: ["$[EF]$", "$[EG]$", "$[FG]$", "il n'y en a pas"], bonne: 0, explication: "Il touche l'angle en $F$ sans être l'hypoténuse." },
    { question: "Sur la figure, $\\sin \\widehat{EFG}$ est égal à :", figure: "tg3-qcm-noms", choix: ["$\\dfrac{EG}{FG}$", "$\\dfrac{EF}{FG}$", "$\\dfrac{EG}{EF}$", "$\\dfrac{FG}{EG}$"], bonne: 0, explication: "Opposé sur hypoténuse." },
    { question: "Sur la figure, la longueur $RT$ vaut :", figure: "tg3-qcm-calc", choix: ["$6$ cm", "$10{,}4$ cm", "$24$ cm", "$6{,}9$ cm"], bonne: 0, explication: "$RT$ est opposé à l'angle de $30^\\circ$ : $RT = 12 \\times \\sin(30^\\circ) = 6$ cm." },
    { question: "Sur la figure, l'angle $\\widehat{KLM}$ mesure :", figure: "tg3-qcm-angle", choix: ["$60^\\circ$", "$30^\\circ$", "$45^\\circ$", "$0{,}5^\\circ$"], bonne: 0, explication: "$\\cos \\widehat{KLM} = \\dfrac{5}{10} = 0{,}5$, donc $\\widehat{KLM} = 60^\\circ$." },
    { question: "L'échelle de la figure touche le mur à une hauteur d'environ :", figure: "tg3-qcm-echelle", choix: ["$3{,}5$ m", "$2$ m", "$4{,}6$ m", "$6{,}9$ m"], bonne: 0, explication: "$h = 4 \\times \\sin(60^\\circ) \\approx 3{,}5$ m." },
    { question: "D'après la figure, la hauteur de l'arbre est d'environ :", figure: "tg3-qcm-arbre", choix: ["$16{,}8$ m", "$12{,}9$ m", "$15{,}3$ m", "$23{,}8$ m"], bonne: 0, explication: "On connaît l'adjacent : $h = 20 \\times \\tan(40^\\circ) \\approx 16{,}8$ m." },
    { question: "Si $\\sin \\alpha = 0{,}5$, alors $\\alpha$ vaut :", choix: ["$30^\\circ$", "$60^\\circ$", "$45^\\circ$", "$0{,}5^\\circ$"], bonne: 0, explication: "$\\sin^{-1}(0{,}5) = 30^\\circ$." },
    { question: "$\\cos \\alpha = 0{,}8$ et l'hypoténuse mesure $10$ cm. Le côté adjacent à $\\alpha$ mesure :", choix: ["$8$ cm", "$12{,}5$ cm", "$0{,}08$ cm", "$6$ cm"], bonne: 0, explication: "$10 \\times 0{,}8 = 8$ cm." },
    { question: "Dans un triangle rectangle, la somme des deux angles aigus vaut :", choix: ["$90^\\circ$", "$180^\\circ$", "$45^\\circ$", "$360^\\circ$"], bonne: 0, explication: "$180 - 90 = 90^\\circ$." },
    { question: "Quand un angle aigu augmente, son cosinus :", choix: ["diminue", "augmente", "reste égal", "devient négatif"], bonne: 0, explication: "Le côté adjacent raccourcit par rapport à l'hypoténuse : $\\cos(0^\\circ) = 1$ et $\\cos(90^\\circ) = 0$." },
    { question: "Un angle aigu $\\alpha$ vérifie $\\tan \\alpha = 2$. Alors :", choix: ["$\\alpha > 45^\\circ$", "$\\alpha < 45^\\circ$", "$\\alpha = 45^\\circ$", "$\\alpha = 2^\\circ$"], bonne: 0, explication: "$\\tan(45^\\circ) = 1$ et la tangente augmente avec l'angle." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Choisir la bonne formule",
      etapes: [
        "Repère l'hypoténuse (en face de l'angle droit), puis l'opposé et l'adjacent de l'angle étudié.",
        "Entoure les deux côtés en jeu (connu et cherché).",
        "Adjacent + hypoténuse : cos ; opposé + hypoténuse : sin ; opposé + adjacent : tan."
      ],
      figure: "tg3-cours-formules",
      exemple: "Opposé cherché, hypoténuse connue : sinus."
    },
    {
      titre: "Rédiger un calcul",
      etapes: [
        "« Dans le triangle $ABC$ rectangle en $A$, … »",
        "Écris la formule, remplace par les valeurs, isole l'inconnue (produit en croix).",
        "Calcule et arrondis comme demandé, avec l'unité."
      ],
      figure: "tg3-cours-redaction",
      exemple: "Sur la figure : $\\sin(25^\\circ) = \\dfrac{AC}{9}$, donc $AC = 9 \\times \\sin(25^\\circ) \\approx 3{,}8$ cm."
    },
    {
      titre: "Calculer un angle",
      etapes: [
        "Repère les deux côtés connus par rapport à l'angle cherché.",
        "Écris le rapport : $\\cos$, $\\sin$ ou $\\tan$ de l'angle.",
        "Utilise la touche $\\cos^{-1}$, $\\sin^{-1}$ ou $\\tan^{-1}$ (calculatrice en degrés), puis arrondis."
      ],
      figure: "tg3-cours-angle",
      exemple: "Sur la figure : $\\tan \\alpha = \\dfrac{4}{7}$, donc $\\alpha \\approx 29{,}7^\\circ$, soit $30^\\circ$ arrondi au degré."
    }
  ],
  erreurs: [
    "Confondre côté adjacent et hypoténuse.",
    "Diviser au lieu de multiplier (ou l'inverse) dans le produit en croix.",
    "Utiliser cos au lieu de cos⁻¹ pour trouver un angle.",
    "Oublier de régler la calculatrice en degrés.",
    "Appliquer la trigonométrie dans un triangle qui n'est pas rectangle."
  ]
};
