/*
  CHAPITRE : 3e — Géométrie dans l'espace
  ----------------------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 3e en 2026-2027 (brevet 2027) : sphère et boule
  (aire, volume) ; volumes du cône, de la pyramide, du cylindre ; sections planes de solides ; repérage dans un
  pavé droit et sur la sphère terrestre (latitude, longitude) ; effet d'un agrandissement ou d'une réduction
  sur les volumes. Vidéos et cours PDF d'Yvan Monka.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["troisieme-espace"] = {
  niveau: "3e",
  numero: 15,
  titre: "Géométrie dans l'espace",
  accroche: "Boules, cônes et pyramides, sections de solides, repérage dans un pavé et sur la Terre.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : géométrie dans l'espace (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Espace_3e.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : géométrie dans l'espace (Yvan Monka)", url: "https://youtu.be/Wsv2pp5Ytx8", type: "video" },
    { titre: "Calculer une longueur dans un solide (Yvan Monka)", url: "https://youtu.be/NY75MafJJ3Y", type: "video" },
    { titre: "Rappel : calculer le volume d'un cône (Yvan Monka)", url: "https://youtu.be/kMssaNRPXz8", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Sphère, boule et volumes",
      video: { titre: "Vidéo d'Yvan Monka : calculer l'aire et le volume d'une boule", youtube: "https://youtu.be/YQF7CBY-uEk" },
      texte:
        "Pour une sphère (ou une boule) de rayon $r$ :\n\n" +
        "- aire de la sphère : $\\mathcal{A} = 4 \\pi r^2$ ;\n" +
        "- volume de la boule : $V = \\dfrac{4}{3} \\pi r^3$.\n\n" +
        "Rappels : cylindre $V = \\pi r^2 h$ ; cône et pyramide $V = \\dfrac{1}{3} \\times \\text{aire de la base} \\times h$.",
      exemple: {
        enonce: "Volume d'une boule de rayon $3$ cm ?",
        solution: "$\\dfrac{4}{3} \\pi \\times 27 = 36\\pi \\approx 113$ cm³."
      }
    },
    {
      titre: "Sections planes",
      video: { titre: "Vidéo d'Yvan Monka : dessiner en vraie grandeur la section d'un solide", youtube: "https://youtu.be/hNj4ySy-NaU" },
      texte:
        "- Cube, pavé : un plan parallèle à une face donne un rectangle (un carré pour le cube) ; parallèle à une arête, un rectangle.\n" +
        "- Cylindre : parallèle à la base, un disque ; parallèle à l'axe, un rectangle.\n" +
        "- Pyramide, cône : parallèle à la base, une **réduction** de la base.\n" +
        "- Sphère : toujours un **cercle**. Si le plan est à la distance $d$ du centre, le rayon de la section vaut $\\sqrt{R^2 - d^2}$ (Pythagore).",
      exemple: {
        enonce: "Sphère de rayon $5$ cm coupée à $3$ cm du centre. Rayon de la section ?",
        solution: "$\\sqrt{25 - 9} = 4$ cm."
      }
    },
    {
      titre: "Repérage et agrandissement",
      video: { titre: "Vidéo d'Yvan Monka : se repérer sur la sphère", youtube: "https://youtu.be/cNi_4U6tFWQ" },
      texte:
        "- Dans un pavé droit, un point est repéré par trois coordonnées : **abscisse, ordonnée, altitude**.\n" +
        "- Sur la Terre, un point est repéré par sa **latitude** (nord ou sud de l'équateur) et sa **longitude** (est ou ouest du méridien de Greenwich). Mayotte : environ $13^\\circ$ Sud, $45^\\circ$ Est.\n\n" +
        "Un agrandissement ou une réduction de rapport $k$ multiplie les volumes par $k^3$.",
      exemple: {
        enonce: "Une maquette au $\\dfrac{1}{10}$ : quel volume pour un réservoir réel de $500$ L ?",
        solution: "$500 \\times \\left(\\dfrac{1}{10}\\right)^3 = 0{,}5$ L."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "ep3-boule", titre: "Sphères et boules", etape: "Volumes", nb: 6 },
    { type: "ep3-volumes", titre: "Cônes, pyramides, k³", etape: "Volumes", nb: 6 },
    { type: "ep3-sections", titre: "Sections planes", etape: "Sections", nb: 5 },
    { type: "ep3-reperage", titre: "Se repérer dans l'espace", etape: "Repérage", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Le volume d'une boule de rayon $r$ est :", choix: ["$\\dfrac{4}{3} \\pi r^3$", "$4 \\pi r^2$", "$\\pi r^2$", "$\\dfrac{1}{3} \\pi r^3$"], bonne: 0, explication: "Formule du cours." },
    { question: "L'aire d'une sphère de rayon $r$ est :", choix: ["$4 \\pi r^2$", "$\\dfrac{4}{3} \\pi r^3$", "$2 \\pi r$", "$\\pi r^2$"], bonne: 0, explication: "Formule du cours." },
    { question: "Le volume d'un cône est :", choix: ["$\\dfrac{1}{3} \\pi r^2 h$", "$\\pi r^2 h$", "$\\dfrac{4}{3} \\pi r^3$", "$2 \\pi r h$"], bonne: 0, explication: "Un tiers du cylindre." },
    { question: "Une pyramide de base $12$ cm² et de hauteur $5$ cm a pour volume :", choix: ["$20$ cm³", "$60$ cm³", "$17$ cm³", "$180$ cm³"], bonne: 0, explication: "$\\dfrac{12 \\times 5}{3}$." },
    { question: "La section d'une sphère par un plan est :", choix: ["un cercle", "un carré", "un rectangle", "un triangle"], bonne: 0, explication: "Toujours un cercle." },
    { question: "La section d'un cylindre par un plan parallèle à sa base est :", choix: ["un disque", "un rectangle", "un triangle", "un carré"], bonne: 0, explication: "Même rayon que la base." },
    { question: "La section d'une pyramide par un plan parallèle à sa base est :", choix: ["une réduction de la base", "un cercle", "un agrandissement de la base", "un triangle quelconque"], bonne: 0, explication: "Configuration de Thalès." },
    { question: "Les longueurs sont multipliées par $2$. Le volume est multiplié par :", choix: ["$8$", "$2$", "$4$", "$6$"], bonne: 0, explication: "$2^3$." },
    { question: "L'équateur a pour latitude :", choix: ["$0^\\circ$", "$90^\\circ$", "$180^\\circ$", "$45^\\circ$"], bonne: 0, explication: "Référence des latitudes." },
    { question: "Mayotte se situe vers :", choix: ["$13^\\circ$ Sud, $45^\\circ$ Est", "$13^\\circ$ Nord, $45^\\circ$ Ouest", "$45^\\circ$ Sud, $13^\\circ$ Est", "$0^\\circ$, $0^\\circ$"], bonne: 0, explication: "Hémisphère sud, à l'est de Greenwich." },
    { question: "Dans un repère de l'espace, un point a :", choix: ["trois coordonnées", "deux coordonnées", "une coordonnée", "quatre coordonnées"], bonne: 0, explication: "Abscisse, ordonnée, altitude." },
    { question: "Sphère de rayon $13$ cm coupée à $5$ cm du centre : rayon de la section :", choix: ["$12$ cm", "$8$ cm", "$18$ cm", "$13$ cm"], bonne: 0, explication: "$\\sqrt{169 - 25}$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer un volume",
      etapes: [
        "Identifie le solide et écris la formule.",
        "Calcule l'aire de la base si besoin, puis remplace par les valeurs.",
        "Garde $\\pi$ jusqu'au bout et arrondis à la fin, avec l'unité de volume."
      ],
      exemple: "Cône $r = 3$, $h = 4$ : $\\dfrac{9\\pi \\times 4}{3} = 12\\pi \\approx 38$ cm³."
    },
    {
      titre: "Rayon d'une section de sphère",
      etapes: [
        "Dessine le triangle rectangle : centre $O$ de la sphère, centre $H$ de la section, point $M$ du cercle.",
        "$OM = R$ et $OH = d$.",
        "$HM = \\sqrt{R^2 - d^2}$ d'après le théorème de Pythagore."
      ],
      exemple: "$R = 10$, $d = 6$ : $HM = 8$."
    }
  ],
  erreurs: [
    "Confondre aire de la sphère et volume de la boule.",
    "Oublier de diviser par $3$ pour un cône ou une pyramide.",
    "Utiliser le diamètre à la place du rayon.",
    "Multiplier un volume par $k$ ou $k^2$ au lieu de $k^3$.",
    "Arrondir trop tôt dans un calcul avec $\\pi$."
  ]
};
