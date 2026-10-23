/*
  CHAPITRE : 3e — Théorème de Thalès
  -----------------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 3e en 2026-2027 (brevet 2027) : connaître et
  utiliser le théorème de Thalès et sa réciproque dans les deux configurations (triangles emboîtés et
  « papillon ») ; démontrer que deux droites ne sont pas parallèles ; agrandissements et réductions (longueurs
  multipliées par k, aires par k²). Vidéos et cours PDF d'Yvan Monka.
  figure : configurations dessinées avec figureThales3() (assets/exercices-troisieme.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["troisieme-thales"] = {
  niveau: "3e",
  numero: 11,
  titre: "Théorème de Thalès",
  accroche: "Calculer des longueurs, prouver un parallélisme ou son absence, dans les deux configurations de Thalès.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : théorème de Thalès (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Thales.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : théorème de Thalès (Yvan Monka)", url: "https://youtu.be/puuHhlf0jAQ", type: "video" },
    { titre: "Démontrer que deux droites ne sont pas parallèles (Yvan Monka)", url: "https://youtu.be/ovlhagzONlw", type: "video" },
    { titre: "Résoudre un problème avec le théorème de Thalès (Yvan Monka)", url: "https://youtu.be/hmJQNkpi0gI", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Le théorème de Thalès",
      video: { titre: "Vidéo d'Yvan Monka : appliquer le théorème de Thalès (1)", youtube: "https://youtu.be/GwGQD2BdZ3s" },
      texte:
        "Si les droites $(BM)$ et $(CN)$ sont sécantes en $A$ et si $(MN) \\parallel (BC)$, alors :\n\n" +
        "$\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$.\n\n" +
        "Cela vaut dans les **deux configurations** : $M$ et $N$ sur les côtés $[AB]$ et $[AC]$ (triangles emboîtés), ou de l'autre côté de $A$ (configuration « papillon »).",
      exemple: {
        enonce: "$(MN) \\parallel (BC)$, $AM = 3$, $AB = 5$, $BC = 8$. Calcule $MN$.",
        solution: "$\\dfrac{3}{5} = \\dfrac{MN}{8}$, donc $MN = \\dfrac{3 \\times 8}{5} = 4{,}8$."
      }
    },
    {
      titre: "Réciproque et contraposée",
      video: { titre: "Vidéo d'Yvan Monka : appliquer la réciproque du théorème de Thalès", youtube: "https://youtu.be/uaPicwUSQz0" },
      texte:
        "- **Réciproque** : si les points $A, M, B$ et $A, N, C$ sont alignés **dans le même ordre** et si $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$, alors $(MN) \\parallel (BC)$.\n" +
        "- **Contraposée** : si $\\dfrac{AM}{AB} \\neq \\dfrac{AN}{AC}$, alors les droites ne sont **pas** parallèles.\n\n" +
        "Pour comparer deux fractions, on peut comparer les produits en croix.",
      exemple: {
        enonce: "$AM = 2$, $AB = 5$, $AN = 3$, $AC = 7{,}5$. $(MN)$ et $(BC)$ sont-elles parallèles ?",
        solution: "$2 \\times 7{,}5 = 15$ et $5 \\times 3 = 15$ : oui, d'après la réciproque."
      }
    },
    {
      titre: "Agrandissement et réduction",
      video: { titre: "Vidéo d'Yvan Monka : appliquer le théorème de Thalès (2)", youtube: "https://youtu.be/cq3wBbXYB4A" },
      texte:
        "Dans une configuration de Thalès, le triangle $AMN$ est une réduction (ou un agrandissement) du triangle $ABC$ de rapport $k = \\dfrac{AM}{AB}$.\n\n" +
        "Les **longueurs** sont multipliées par $k$, les **aires** par $k^2$ (et les volumes par $k^3$).",
      exemple: {
        enonce: "Rapport $k = \\dfrac{1}{3}$ ; aire de $ABC$ : $45$ cm². Aire de $AMN$ ?",
        solution: "$45 \\times \\dfrac{1}{9} = 5$ cm²."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "th3-longueur", titre: "Calculer une longueur", etape: "Théorème", nb: 6 },
    { type: "th3-reciproque", titre: "Parallèles ou non ?", etape: "Réciproque", nb: 6 },
    { type: "th3-rapport", titre: "Réductions et aires", etape: "Réduction", nb: 5 },
    { type: "th3-problemes", titre: "Problèmes concrets", etape: "Problèmes", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$(MN) \\parallel (BC)$, $M \\in [AB]$, $N \\in [AC]$. Le théorème de Thalès donne :", choix: ["$\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$", "$\\dfrac{AM}{MB} = \\dfrac{AN}{NC} = \\dfrac{MN}{BC}$", "$\\dfrac{AB}{AM} = \\dfrac{AN}{AC}$", "$AM + AB = AN + AC$"], bonne: 0, explication: "Petit triangle sur grand triangle." },
    { question: "$AM = 4$, $AB = 10$, $AC = 15$, $(MN) \\parallel (BC)$. $AN$ vaut :", choix: ["$6$", "$37{,}5$", "$9$", "$5$"], bonne: 0, explication: "$\\dfrac{4 \\times 15}{10}$." },
    { question: "Dans la configuration « papillon », le théorème de Thalès :", choix: ["s'applique aussi", "ne s'applique pas", "ne s'applique qu'aux triangles rectangles", "donne $AM = AN$"], bonne: 0, explication: "Les deux configurations sont valables." },
    { question: "Pour prouver que deux droites sont parallèles, on utilise :", choix: ["la réciproque du théorème de Thalès", "le théorème de Thalès", "le théorème de Pythagore", "la trigonométrie"], bonne: 0, explication: "On part des rapports pour conclure au parallélisme." },
    { question: "Si $\\dfrac{AM}{AB} \\neq \\dfrac{AN}{AC}$, alors $(MN)$ et $(BC)$ :", choix: ["ne sont pas parallèles", "sont parallèles", "sont perpendiculaires", "on ne peut rien dire"], bonne: 0, explication: "C'est la contraposée." },
    { question: "$AM = 3$, $AB = 7$, $AN = 4$, $AC = 9$. Les droites $(MN)$ et $(BC)$ :", choix: ["ne sont pas parallèles", "sont parallèles", "sont confondues", "sont perpendiculaires"], bonne: 0, explication: "$3 \\times 9 = 27 \\neq 28 = 7 \\times 4$." },
    { question: "Un triangle est réduit avec le rapport $\\dfrac{1}{2}$. Son aire est multipliée par :", choix: ["$\\dfrac{1}{4}$", "$\\dfrac{1}{2}$", "$2$", "$4$"], bonne: 0, explication: "$k^2$." },
    { question: "Un agrandissement de rapport $3$ multiplie les longueurs par :", choix: ["$3$", "$9$", "$27$", "$\\dfrac{1}{3}$"], bonne: 0, explication: "Les longueurs sont multipliées par $k$." },
    { question: "Pour la réciproque, il faut aussi vérifier :", choix: ["que les points sont alignés dans le même ordre", "que le triangle est rectangle", "que $AM = AN$", "rien d'autre"], bonne: 0, explication: "Condition de la réciproque." },
    { question: "$\\dfrac{2}{5}$ et $\\dfrac{6}{15}$ sont égales car :", choix: ["$2 \\times 15 = 5 \\times 6$", "$2 + 15 = 5 + 6$", "$2 \\times 5 = 6 \\times 15$", "$15 - 5 = 6 + 2$"], bonne: 0, explication: "Produits en croix." },
    { question: "Une ombre de bâton de $1$ m mesure $2$ m ; un arbre a une ombre de $9$ m. L'arbre mesure :", choix: ["$4{,}5$ m", "$18$ m", "$11$ m", "$7$ m"], bonne: 0, explication: "$\\dfrac{1 \\times 9}{2}$." },
    { question: "Échelle $\\dfrac{1}{50}$ : $8$ cm sur la maquette représentent :", choix: ["$4$ m", "$400$ m", "$0{,}16$ m", "$58$ cm"], bonne: 0, explication: "$8 \\times 50 = 400$ cm." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Rédiger le théorème de Thalès",
      etapes: [
        "Nomme la configuration : « les droites (BM) et (CN) sont sécantes en A et (MN) est parallèle à (BC) ».",
        "Écris l'égalité des trois rapports (petit triangle sur grand triangle).",
        "Garde l'égalité utile et termine par un produit en croix."
      ],
      exemple: "$\\dfrac{AM}{AB} = \\dfrac{MN}{BC}$, donc $MN = \\dfrac{AM \\times BC}{AB}$."
    },
    {
      titre: "Parallèles ou non ?",
      etapes: [
        "Calcule séparément $\\dfrac{AM}{AB}$ et $\\dfrac{AN}{AC}$ (ou les produits en croix).",
        "S'ils sont égaux et les points dans le même ordre : réciproque, les droites sont parallèles.",
        "S'ils sont différents : contraposée, elles ne le sont pas."
      ],
      exemple: "$\\dfrac{3}{6} = 0{,}5$ et $\\dfrac{4}{8} = 0{,}5$ : parallèles."
    }
  ],
  erreurs: [
    "Utiliser $\\dfrac{AM}{MB}$ au lieu de $\\dfrac{AM}{AB}$.",
    "Mélanger les côtés des deux triangles dans un même rapport.",
    "Utiliser le théorème pour prouver un parallélisme (c'est la réciproque).",
    "Oublier de vérifier l'ordre des points pour la réciproque.",
    "Multiplier une aire par $k$ au lieu de $k^2$."
  ]
};
