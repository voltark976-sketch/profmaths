/*
  CHAPITRE : 4e — Théorème de Thalès
  -----------------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 4e en 2026-2027 : connaitre et utiliser le théorème
  de Thalès dans la configuration du triangle (deux points sur deux côtés, droite parallèle au troisième côté) et
  sa réciproque ; lien avec l'agrandissement et la réduction. (La configuration « papillon » est vue en 3e.)
  figure : "th4-figure" (assets/exercices-quatrieme.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["quatrieme-thales"] = {
  niveau: "4e",
  numero: 8,
  titre: "Théorème de Thalès",
  accroche: "Une parallèle à un côté d'un triangle découpe un petit triangle dont les longueurs sont proportionnelles à celles du grand : calculer des longueurs et prouver un parallélisme.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : théorème de Thalès (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Thales4.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : le théorème de Thalès (Yvan Monka)", url: "https://youtu.be/JpU7X7AhB-A", type: "video" },
    { titre: "Calculer une longueur avec le théorème de Thalès (2) (Yvan Monka)", url: "https://youtu.be/RnN4UtfUkI8", type: "video" },
    { titre: "Résoudre un problème avec le théorème de Thalès (Yvan Monka)", url: "https://youtu.be/hmJQNkpi0gI", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Le théorème de Thalès",
      video: { titre: "Vidéo d'Yvan Monka : calculer une longueur avec le théorème de Thalès", youtube: "https://youtu.be/zP16D2Zrv1A" },
      texte:
        "**Théorème** : dans un triangle $ABC$, si $M$ est un point de $[AB]$, $N$ un point de $[AC]$ et si les droites $(MN)$ et $(BC)$ sont **parallèles**, alors :\n\n" +
        "$\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$.\n\n" +
        "Le triangle $AMN$ est une **réduction** du triangle $ABC$ : ces rapports sont égaux au coefficient de réduction.",
      figure: "th4-figure",
      exemple: {
        enonce: "Sur la figure, $AM = 2$ cm, $MB = 3$ cm, $(MN) \\parallel (BC)$ et $BC = 7{,}5$ cm. Calcule $MN$.",
        solution: "$AB = 5$ cm. D'après le théorème de Thalès, $\\dfrac{AM}{AB} = \\dfrac{MN}{BC}$, soit $\\dfrac{2}{5} = \\dfrac{MN}{7{,}5}$. Donc $MN = \\dfrac{2 \\times 7{,}5}{5} = 3$ cm."
      }
    },
    {
      titre: "Utiliser le théorème",
      texte:
        "1. On vérifie les hypothèses : points sur les côtés, droites parallèles.\n" +
        "2. On écrit les trois rapports égaux (petit triangle en haut, grand triangle en bas).\n" +
        "3. On garde l'égalité de deux rapports qui contient la longueur cherchée et trois longueurs connues.\n" +
        "4. On termine par un produit en croix.\n\n" +
        "Attention : on utilise $AB$ (le côté entier) et non $MB$.",
      exemple: {
        enonce: "Avec $AM = 3$, $AB = 9$ et $AC = 12$, calcule $AN$ (les droites sont parallèles).",
        solution: "$\\dfrac{3}{9} = \\dfrac{AN}{12}$ donc $AN = \\dfrac{3 \\times 12}{9} = 4$."
      }
    },
    {
      titre: "La réciproque",
      video: { titre: "Vidéo d'Yvan Monka : la réciproque du théorème de Thalès", youtube: "https://youtu.be/_6d-3GHwKRc" },
      texte:
        "**Réciproque** : dans un triangle $ABC$, si $M \\in [AB]$, $N \\in [AC]$ et $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$, alors les droites $(MN)$ et $(BC)$ sont **parallèles**.\n\n" +
        "Si les rapports ne sont pas égaux, les droites ne sont pas parallèles. On compare souvent les rapports avec les produits en croix.",
      exemple: {
        enonce: "$AM = 4$, $AB = 10$, $AN = 6$, $AC = 15$. $(MN)$ et $(BC)$ sont-elles parallèles ?",
        solution: "$4 \\times 15 = 60$ et $10 \\times 6 = 60$ : les rapports sont égaux, les droites sont parallèles."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "th4-longueur", titre: "Calculer une longueur", etape: "Théorème de Thalès", nb: 6 },
    { type: "th4-coefficient", titre: "Coefficient de réduction", etape: "Théorème de Thalès", nb: 5 },
    { type: "th4-egalite", titre: "Égalité de Thalès et réciproque", etape: "Réciproque", nb: 6 },
    { type: "th4-problemes", titre: "Problèmes", etape: "Problèmes", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Pour appliquer le théorème de Thalès dans le triangle $ABC$ avec $M \\in [AB]$, $N \\in [AC]$, il faut savoir que :", choix: ["$(MN) \\parallel (BC)$", "$(MN) \\perp (BC)$", "$AM = AN$", "$ABC$ est rectangle"], bonne: 0, explication: "C'est l'hypothèse du théorème." },
    { question: "Avec $(MN) \\parallel (BC)$, l'égalité correcte est :", choix: ["$\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$", "$\\dfrac{AM}{MB} = \\dfrac{AN}{NC} = \\dfrac{MN}{BC}$", "$\\dfrac{AB}{AM} = \\dfrac{AN}{AC}$", "$AM \\times AN = AB \\times AC$"], bonne: 0, explication: "Petit triangle sur grand triangle." },
    { question: "$AM = 2$, $AB = 6$, $BC = 9$, $(MN) \\parallel (BC)$. Alors $MN =$ :", choix: ["$3$", "$27$", "$6$", "$4{,}5$"], bonne: 0, explication: "$\\dfrac{2}{6} \\times 9 = 3$." },
    { question: "$AN = 5$, $AC = 8$, $AB = 12$, $(MN) \\parallel (BC)$. Alors $AM =$ :", choix: ["$7{,}5$", "$19{,}2$", "$9$", "$6$"], bonne: 0, explication: "$\\dfrac{5 \\times 12}{8}$." },
    { question: "Le coefficient de réduction de $ABC$ vers $AMN$ avec $AM = 3$ et $AB = 12$ est :", choix: ["$\\dfrac{1}{4}$", "$4$", "$\\dfrac{3}{4}$", "$9$"], bonne: 0, explication: "$\\dfrac{3}{12}$." },
    { question: "Si $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$ (points sur les côtés), alors :", choix: ["$(MN) \\parallel (BC)$", "$(MN) \\perp (BC)$", "$AM = AN$", "on ne peut rien dire"], bonne: 0, explication: "Réciproque du théorème de Thalès." },
    { question: "$AM = 3$, $AB = 5$, $AN = 4$, $AC = 7$. Les droites $(MN)$ et $(BC)$ :", choix: ["ne sont pas parallèles", "sont parallèles", "sont perpendiculaires", "on ne peut pas savoir"], bonne: 0, explication: "$3 \\times 7 = 21 \\neq 5 \\times 4 = 20$." },
    { question: "Dans l'égalité de Thalès, on utilise :", choix: ["la longueur $AB$ entière", "la longueur $MB$", "la hauteur du triangle", "l'aire du triangle"], bonne: 0, explication: "Côtés du petit triangle sur côtés du grand." },
    { question: "Un bâton de $1$ m a une ombre de $2$ m ; un arbre a une ombre de $8$ m. L'arbre mesure :", choix: ["$4$ m", "$16$ m", "$9$ m", "$2$ m"], bonne: 0, explication: "Rapport $\\dfrac{1}{2}$." },
    { question: "Si $\\dfrac{AM}{AB} = \\dfrac{2}{5}$ et $AC = 10$, alors $AN =$ :", choix: ["$4$", "$25$", "$5$", "$2$"], bonne: 0, explication: "$\\dfrac{2}{5} \\times 10$." },
    { question: "Le triangle $AMN$ est :", choix: ["une réduction du triangle $ABC$", "un agrandissement de $ABC$", "toujours isocèle", "toujours rectangle"], bonne: 0, explication: "Ses côtés sont proportionnels à ceux de $ABC$." },
    { question: "Sur la figure, $AM = 2$ et $MB = 3$. Le coefficient $\\dfrac{AM}{AB}$ vaut :", figure: "th4-figure", choix: ["$\\dfrac{2}{5}$", "$\\dfrac{2}{3}$", "$\\dfrac{3}{5}$", "$\\dfrac{3}{2}$"], bonne: 0, explication: "$AB = 2 + 3 = 5$." },
    { question: "Les rapports de Thalès sont égaux :", choix: ["au coefficient de réduction", "à $1$", "à l'aire", "au périmètre"], bonne: 0, explication: "Les longueurs sont multipliées par $k$." },
    { question: "Pour la réciproque, on compare souvent :", choix: ["les produits en croix", "les angles", "les aires", "les hauteurs"], bonne: 0, explication: "Deux fractions sont égales si les produits en croix le sont." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer une longueur avec Thalès",
      etapes: [
        "Vérifie : points sur les côtés et droites parallèles.",
        "Écris $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$.",
        "Garde deux rapports, remplace et fais un produit en croix."
      ],
      exemple: "$\\dfrac{4}{10} = \\dfrac{MN}{6}$ : $MN = \\dfrac{4 \\times 6}{10} = 2{,}4$."
    },
    {
      titre: "Démontrer que deux droites sont parallèles",
      etapes: [
        "Calcule $\\dfrac{AM}{AB}$ et $\\dfrac{AN}{AC}$ séparément (ou les produits en croix).",
        "Égaux : les droites sont parallèles (réciproque).",
        "Différents : elles ne le sont pas."
      ],
      exemple: "$\\dfrac{3}{6} = \\dfrac{4}{8}$ : $(MN) \\parallel (BC)$."
    }
  ],
  erreurs: [
    "Utiliser $MB$ au lieu de $AB$ dans les rapports.",
    "Mélanger petit et grand triangle dans un même rapport.",
    "Appliquer le théorème sans droites parallèles.",
    "Conclure au parallélisme sans comparer les deux rapports.",
    "Arrondir les rapports avant de comparer."
  ]
};
