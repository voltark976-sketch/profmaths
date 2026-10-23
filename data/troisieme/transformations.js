/*
  CHAPITRE : 3e — Transformations
  --------------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 3e en 2026-2027 (brevet 2027) : comprendre l'effet
  d'une translation, d'une symétrie (axiale et centrale), d'une rotation et d'une homothétie sur une figure ;
  homothéties de rapport positif ou négatif ; effet sur les longueurs, les angles et les aires.
  Vidéos et cours PDF d'Yvan Monka.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["troisieme-transformations"] = {
  niveau: "3e",
  numero: 14,
  titre: "Transformations",
  accroche: "Translations, rotations et homothéties : construire des images et prévoir leurs effets sur les figures.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : transformations, partie 1 (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Transfo1.pdf" },
    { titre: "Cours d'Yvan Monka : transformations, partie 2 (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Transfo2.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : transformations, partie 1 (Yvan Monka)", url: "https://youtu.be/4hACSwA1cn4", type: "video" },
    { titre: "Reconnaître une transformation (Yvan Monka)", url: "https://youtu.be/OVxRkeu8gTc", type: "video" },
    { titre: "Utiliser une homothétie pour calculer longueurs et aires (Yvan Monka)", url: "https://youtu.be/eU4tRPjQqFs", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Translations et rotations",
      video: { titre: "Vidéo d'Yvan Monka : le cours sur les transformations (partie 2)", youtube: "https://youtu.be/rM73EdeggJM" },
      texte:
        "- Une **translation** fait glisser la figure, sans la tourner : tous les points se déplacent de la même façon.\n" +
        "- Une **rotation** de centre $O$ et d'angle $\\alpha$ fait tourner la figure autour de $O$ : $OM' = OM$ et $\\widehat{MOM'} = \\alpha$.\n\n" +
        "Translations, symétries et rotations **conservent** les longueurs, les angles et les aires. La rotation de $180^\\circ$ est la symétrie centrale.",
      exemple: {
        enonce: "Image de $A(3 ; 1)$ par la rotation de centre $O$, $90^\\circ$, sens inverse des aiguilles d'une montre ?",
        solution: "$A'(-1 ; 3)$."
      }
    },
    {
      titre: "Homothéties",
      video: { titre: "Vidéo d'Yvan Monka : construire l'image d'un point par une homothétie", youtube: "https://youtu.be/BNgjzubShAo" },
      texte:
        "L'**homothétie** de centre $O$ et de rapport $k$ transforme $M$ en $M'$ aligné avec $O$ et $M$, avec $OM' = |k| \\times OM$ :\n\n" +
        "- si $k > 0$, $M'$ est du **même côté** que $M$ ;\n" +
        "- si $k < 0$, $M'$ est **de l'autre côté** de $O$ ($k = -1$ : symétrie centrale).\n\n" +
        "Dans un repère, l'homothétie de centre $O$ et de rapport $k$ envoie $(x ; y)$ sur $(kx ; ky)$.",
      exemple: {
        enonce: "Image de $A(2 ; -3)$ par l'homothétie de centre $O$ et de rapport $-2$ ?",
        solution: "$A'(-4 ; 6)$."
      }
    },
    {
      titre: "Effets d'une homothétie",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître une image par une homothétie", youtube: "https://youtu.be/JXuf4rj_iXA" },
      texte:
        "Une homothétie de rapport $k$ :\n\n" +
        "- multiplie les **longueurs** par $|k|$ ;\n" +
        "- multiplie les **aires** par $k^2$ ;\n" +
        "- **conserve** les angles, le parallélisme et l'alignement.\n\n" +
        "Si $|k| > 1$, c'est un agrandissement ; si $|k| < 1$, une réduction.",
      exemple: {
        enonce: "Un carré de $5$ cm² subit une homothétie de rapport $-3$. Aire de l'image ?",
        solution: "$5 \\times 9 = 45$ cm²."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "tf3-reconnaitre", titre: "Translations et propriétés", etape: "Reconnaître", nb: 5 },
    { type: "tf3-rotation", titre: "Rotations dans un repère", etape: "Construire", nb: 6 },
    { type: "tf3-homothetie", titre: "Images par une homothétie", etape: "Construire", nb: 6 },
    { type: "tf3-effets", titre: "Effets sur longueurs, aires, angles", etape: "Effets", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Une translation :", choix: ["fait glisser une figure sans la tourner", "fait tourner une figure", "agrandit une figure", "retourne une figure"], bonne: 0, explication: "Glissement." },
    { question: "La rotation de centre $O$ et d'angle $180^\\circ$ est :", choix: ["la symétrie de centre $O$", "une translation", "une homothétie de rapport $2$", "une symétrie axiale"], bonne: 0, explication: "Demi-tour." },
    { question: "Image de $A(4 ; 1)$ par la rotation de centre $O$ de $180^\\circ$ :", choix: ["$(-4 ; -1)$", "$(-1 ; 4)$", "$(1 ; -4)$", "$(4 ; -1)$"], bonne: 0, explication: "On change les deux signes." },
    { question: "Image de $A(2 ; 5)$ par l'homothétie de centre $O$ et de rapport $3$ :", choix: ["$(6 ; 15)$", "$(5 ; 8)$", "$(-6 ; -15)$", "$(2 ; 15)$"], bonne: 0, explication: "On multiplie par $3$." },
    { question: "Image de $A(-2 ; 4)$ par l'homothétie de centre $O$ et de rapport $-0{,}5$ :", choix: ["$(1 ; -2)$", "$(-1 ; 2)$", "$(4 ; -8)$", "$(-2{,}5 ; 3{,}5)$"], bonne: 0, explication: "$-0{,}5 \\times (-2) = 1$." },
    { question: "Une homothétie de rapport $-1$ est :", choix: ["une symétrie centrale", "une translation", "l'identité", "un agrandissement"], bonne: 0, explication: "$OM' = OM$, de l'autre côté." },
    { question: "Une homothétie de rapport $4$ multiplie les aires par :", choix: ["$16$", "$4$", "$8$", "$2$"], bonne: 0, explication: "$4^2$." },
    { question: "Une homothétie de rapport $-2$ multiplie les longueurs par :", choix: ["$2$", "$-2$", "$4$", "$\\dfrac{1}{2}$"], bonne: 0, explication: "$|k|$." },
    { question: "Une homothétie conserve :", choix: ["les angles", "les longueurs", "les aires", "les périmètres"], bonne: 0, explication: "C'est un agrandissement ou une réduction." },
    { question: "Une rotation conserve :", choix: ["les longueurs, les angles et les aires", "seulement les angles", "seulement les aires", "rien"], bonne: 0, explication: "C'est une isométrie." },
    { question: "Homothétie de rapport $0{,}5$ :", choix: ["une réduction", "un agrandissement", "une symétrie", "une rotation"], bonne: 0, explication: "$|k| < 1$." },
    { question: "Image du centre $O$ par une homothétie de centre $O$ :", choix: ["$O$ lui-même", "un point à $|k|$ cm", "aucun point", "le symétrique de $O$"], bonne: 0, explication: "Le centre est fixe." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Construire l'image par une homothétie",
      etapes: [
        "Trace la droite $(OM)$.",
        "Mesure $OM$ et calcule $|k| \\times OM$.",
        "Place $M'$ sur $(OM)$ : du côté de $M$ si $k > 0$, de l'autre côté de $O$ si $k < 0$."
      ],
      exemple: "$k = -2$, $OM = 3$ cm : $M'$ à $6$ cm de $O$, de l'autre côté."
    },
    {
      titre: "Rotation dans un quadrillage",
      etapes: [
        "Repère le déplacement de $O$ vers $M$ (horizontal et vertical).",
        "Quart de tour direct : $(x ; y)$ devient $(-y ; x)$ ; indirect : $(y ; -x)$.",
        "Demi-tour : $(x ; y)$ devient $(-x ; -y)$."
      ],
      exemple: "$M(2 ; 3)$, quart de tour direct : $M'(-3 ; 2)$."
    }
  ],
  erreurs: [
    "Confondre le sens des aiguilles d'une montre et le sens inverse.",
    "Oublier de changer de côté pour un rapport négatif.",
    "Multiplier les longueurs par $k$ négatif (une longueur reste positive).",
    "Multiplier une aire par $k$ au lieu de $k^2$.",
    "Croire qu'une homothétie change les angles."
  ]
};
