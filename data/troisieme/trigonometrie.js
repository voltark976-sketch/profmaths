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
        "Moyen mnémotechnique : **SOH CAH TOA**. Le cosinus et le sinus sont compris entre $0$ et $1$.",
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
        "$ABC$ rectangle en $A$, $\\widehat{B} = 35^\\circ$, $BC = 8$ cm : $AB = 8 \\times \\cos(35^\\circ) \\approx 6{,}6$ cm.",
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
        "Vérifie que la calculatrice est en mode **degrés**.",
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
    { question: "La calculatrice doit être réglée en mode :", choix: ["degrés", "radians", "grades", "scientifique"], bonne: 0, explication: "Les angles du collège sont en degrés." }
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
      exemple: "Opposé cherché, hypoténuse connue : sinus."
    },
    {
      titre: "Rédiger un calcul",
      etapes: [
        "« Dans le triangle $ABC$ rectangle en $A$, … »",
        "Écris la formule, remplace par les valeurs, isole l'inconnue (produit en croix).",
        "Calcule et arrondis comme demandé, avec l'unité."
      ],
      exemple: "$\\sin(25^\\circ) = \\dfrac{AC}{9}$, donc $AC = 9 \\sin(25^\\circ) \\approx 3{,}8$ cm."
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
