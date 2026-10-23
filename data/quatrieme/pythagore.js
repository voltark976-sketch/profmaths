/*
  CHAPITRE : 4e — Théorème de Pythagore
  --------------------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 4e en 2026-2027 : connaitre et utiliser le théorème
  de Pythagore pour calculer une longueur, et sa réciproque pour démontrer qu'un triangle est rectangle ; carrés
  parfaits de 1 à 144, définition de la racine carrée, valeur approchée à la calculatrice, équations x² = a.
  Règle du site : une réponse « arrondie au dixième » n'accepte que le bon arrondi.
  Figures : "py4-triangle", "py4-cours-…", "py4-qcm-…", "py4-meth-…" (assets/exercices-quatrieme.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["quatrieme-pythagore"] = {
  niveau: "4e",
  numero: 3,
  titre: "Théorème de Pythagore",
  accroche: "Dans un triangle rectangle, le carré de l'hypoténuse est la somme des carrés des deux autres côtés : calculer une longueur, ou prouver qu'un angle est droit.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : théorème de Pythagore, partie 1 (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Pyth1.pdf" },
    { titre: "Cours d'Yvan Monka : théorème de Pythagore, partie 2 (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Pyth2.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : le théorème de Pythagore (Yvan Monka)", url: "https://youtu.be/QYM86GzWWG8", type: "video" },
    { titre: "Encadrer une racine carrée par deux entiers (Yvan Monka)", url: "https://youtu.be/bjS5LW-hgWk", type: "video" },
    { titre: "Résoudre une équation dont l'inconnue est au carré (Yvan Monka)", url: "https://youtu.be/2g67qQnGgrE", type: "video" },
    { titre: "Résoudre un problème avec le théorème de Pythagore (Yvan Monka)", url: "https://youtu.be/gBuzFW_GlGc", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Racine carrée",
      video: { titre: "Vidéo d'Yvan Monka : calculer une racine carrée", youtube: "https://youtu.be/y2HlgP09Bog" },
      texte:
        "La **racine carrée** d'un nombre positif $a$, notée $\\sqrt{a}$, est le nombre positif dont le carré est $a$ : $\\sqrt{49} = 7$ car $7^2 = 49$. Un carré d'aire $49$ cm² a donc un côté de $7$ cm.\n\n" +
        "Les **carrés parfaits** de $1$ à $144$ : $1$ ; $4$ ; $9$ ; $16$ ; $25$ ; $36$ ; $49$ ; $64$ ; $81$ ; $100$ ; $121$ ; $144$. Pour les autres nombres, on utilise la calculatrice ($\\sqrt{20} \\approx 4{,}47$) ou on encadre : $16 < 20 < 25$, donc $4 < \\sqrt{20} < 5$.\n\n" +
        "L'équation $x^2 = 36$ a deux solutions : $6$ et $-6$. Si $x$ est une longueur, alors $x = \\sqrt{36} = 6$. L'équation $x^2 = -4$ n'a pas de solution (un carré est toujours positif).",
      figure: "py4-cours-carre",
      exemple: {
        enonce: "Calcule $\\sqrt{81}$ et donne une valeur de $\\sqrt{50}$ arrondie au dixième.",
        solution: "$\\sqrt{81} = 9$.\n\n$\\sqrt{50} \\approx 7{,}07$, soit $7{,}1$ au dixième."
      }
    },
    {
      titre: "Le théorème de Pythagore",
      video: { titre: "Vidéo d'Yvan Monka : écrire la formule de Pythagore", youtube: "https://youtu.be/_6ZjpAIWNkM" },
      texte:
        "**Théorème** : si un triangle est **rectangle**, alors le carré de la longueur de l'**hypoténuse** (le côté opposé à l'angle droit) est égal à la somme des carrés des longueurs des deux autres côtés.\n\n" +
        "Si $ABC$ est rectangle en $A$ : $BC^2 = AB^2 + AC^2$.\n\n" +
        "Avec des aires : le carré construit sur l'hypoténuse a la même aire que les deux autres carrés réunis ($25 = 16 + 9$).",
      figure: "py4-cours-carres",
      exemple: {
        enonce: "$ABC$ est rectangle en $A$ avec $AB = 4$ cm et $AC = 3$ cm. Calcule $BC$.",
        solution: "D'après le théorème de Pythagore : $BC^2 = AB^2 + AC^2 = 16 + 9 = 25$, donc $BC = \\sqrt{25} = 5$ cm."
      }
    },
    {
      titre: "Calculer un côté de l'angle droit",
      video: { titre: "Vidéo d'Yvan Monka : appliquer le théorème de Pythagore pour calculer une longueur", youtube: "https://youtu.be/M9sceJ8gzNc" },
      texte:
        "Si on connaît l'hypoténuse et un autre côté, on **soustrait** :\n\n" +
        "$ABC$ rectangle en $A$ avec $BC = 10$ et $AB = 6$ : $AC^2 = BC^2 - AB^2 = 100 - 36 = 64$, donc $AC = 8$.\n\n" +
        "Repère toujours l'hypoténuse avant d'écrire l'égalité : c'est le plus grand côté.",
      figure: "py4-cours-cote",
      exemple: {
        enonce: "Sur la figure, $EFG$ est rectangle en $E$, $FG = 9$ cm et $EF = 5$ cm. Calcule $EG$ arrondi au dixième.",
        solution: "$EG^2 = 9^2 - 5^2 = 81 - 25 = 56$, donc $EG = \\sqrt{56} \\approx 7{,}5$ cm."
      }
    },
    {
      titre: "Démontrer qu'un triangle est rectangle",
      video: { titre: "Vidéo d'Yvan Monka : vérifier si un triangle est rectangle", youtube: "https://youtu.be/puXyHcU5Awg" },
      texte:
        "**Réciproque** : si, dans un triangle, le carré du plus grand côté est égal à la somme des carrés des deux autres, alors le triangle est **rectangle** (l'angle droit est en face du plus grand côté).\n\n" +
        "Si l'égalité est fausse, le triangle n'est pas rectangle.\n\n" +
        "On calcule séparément : d'un côté le carré du plus grand côté, de l'autre la somme des deux autres carrés, puis on compare. Une figure, même précise, ne suffit pas à prouver qu'un angle est droit.",
      figure: "py4-cours-reciproque",
      exemple: {
        enonce: "$MNP$ a pour côtés $MN = 8$, $NP = 17$ et $MP = 15$. Est-il rectangle ?",
        solution: "$NP^2 = 289$ et $MN^2 + MP^2 = 64 + 225 = 289$. Égalité : $MNP$ est rectangle en $M$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "py4-racine", titre: "Racines carrées", etape: "Racine carrée", nb: 5 },
    { type: "py4-hypotenuse", titre: "Calculer l'hypoténuse", etape: "Calculer une longueur", nb: 6 },
    { type: "py4-cote", titre: "Calculer un côté de l'angle droit", etape: "Calculer une longueur", nb: 6 },
    { type: "py4-reciproque", titre: "Le triangle est-il rectangle ?", etape: "Réciproque", nb: 5 },
    { type: "py4-problemes", titre: "Problèmes", etape: "Problèmes", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$\\sqrt{64}$ est égal à :", choix: ["$8$", "$32$", "$4$", "$16$"], bonne: 0, explication: "$8^2 = 64$." },
    { question: "$\\sqrt{30}$ est compris entre :", choix: ["$5$ et $6$", "$4$ et $5$", "$15$ et $16$", "$6$ et $7$"], bonne: 0, explication: "$25 < 30 < 36$." },
    { question: "L'hypoténuse d'un triangle rectangle est :", choix: ["le côté opposé à l'angle droit", "le plus petit côté", "un côté de l'angle droit", "la hauteur"], bonne: 0, explication: "C'est aussi le plus grand côté." },
    { question: "$ABC$ est rectangle en $B$. On a :", choix: ["$AC^2 = AB^2 + BC^2$", "$AB^2 = AC^2 + BC^2$", "$BC^2 = AB^2 + AC^2$", "$AC = AB + BC$"], bonne: 0, explication: "L'hypoténuse est $[AC]$, en face de $B$." },
    { question: "Les côtés de l'angle droit mesurent $6$ et $8$. L'hypoténuse mesure :", choix: ["$10$", "$14$", "$100$", "$48$"], bonne: 0, explication: "$36 + 64 = 100$, $\\sqrt{100} = 10$." },
    { question: "L'hypoténuse mesure $13$ et un côté $5$. L'autre côté mesure :", choix: ["$12$", "$8$", "$144$", "$\\sqrt{194}$"], bonne: 0, explication: "$169 - 25 = 144$." },
    { question: "Sur la figure, $BC$ mesure :", figure: "py4-triangle", choix: ["$5$ cm", "$7$ cm", "$25$ cm", "$1$ cm"], bonne: 0, explication: "$\\sqrt{16 + 9} = 5$." },
    { question: "Un triangle de côtés $5$, $12$ et $13$ est :", choix: ["rectangle", "équilatéral", "isocèle", "non rectangle"], bonne: 0, explication: "$25 + 144 = 169$." },
    { question: "Un triangle de côtés $4$, $5$ et $6$ est :", choix: ["non rectangle", "rectangle", "rectangle isocèle", "équilatéral"], bonne: 0, explication: "$16 + 25 = 41 \\neq 36$." },
    { question: "Pour la réciproque, on compare le carré du plus grand côté avec :", choix: ["la somme des carrés des deux autres", "la somme des deux autres côtés", "le produit des deux autres", "le périmètre"], bonne: 0, explication: "C'est l'égalité de Pythagore." },
    { question: "Si $x^2 = 49$ et $x$ est une longueur, alors :", choix: ["$x = 7$", "$x = 24{,}5$", "$x = 98$", "$x = -7$"], bonne: 0, explication: "Une longueur est positive." },
    { question: "La diagonale d'un carré de côté $1$ m mesure :", choix: ["$\\sqrt{2}$ m", "$2$ m", "$1$ m", "$\\sqrt{1}$ m"], bonne: 0, explication: "$1 + 1 = 2$." },
    { question: "$\\sqrt{2}$ arrondi au dixième vaut :", choix: ["$1{,}4$", "$1{,}5$", "$1{,}41$", "$2$"], bonne: 0, explication: "$\\sqrt{2} \\approx 1{,}414$." },
    { question: "Une échelle de $5$ m a son pied à $3$ m du mur. Elle atteint une hauteur de :", choix: ["$4$ m", "$2$ m", "$8$ m", "$\\sqrt{34}$ m"], bonne: 0, explication: "$25 - 9 = 16$." },
    { question: "Sur la figure, les carrés construits sur les côtés de l'angle droit ont pour aires $16$ et $9$. L'aire du carré construit sur l'hypoténuse est :", figure: "py4-cours-carres", choix: ["$25$", "$7$", "$144$", "$12$"], bonne: 0, explication: "D'après le théorème de Pythagore, $BC^2 = AB^2 + AC^2 = 16 + 9 = 25$." },
    { question: "L'échelle de $2{,}5$ m a son pied à $0{,}7$ m du mur (voir le schéma). Elle touche le mur à une hauteur de :", figure: "py4-qcm-echelle", choix: ["$2{,}4$ m", "$1{,}8$ m", "$2{,}6$ m", "$3{,}2$ m"], bonne: 0, explication: "$h^2 = 2{,}5^2 - 0{,}7^2 = 6{,}25 - 0{,}49 = 5{,}76$, donc $h = \\sqrt{5{,}76} = 2{,}4$ m." },
    { question: "Le triangle $RST$ de la figure a pour côtés $7$ cm, $8$ cm et $11$ cm. Il est :", figure: "py4-qcm-triangle", choix: ["non rectangle", "rectangle en $T$", "rectangle en $R$", "rectangle en $S$"], bonne: 0, explication: "$11^2 = 121$ et $7^2 + 8^2 = 49 + 64 = 113$ : l'égalité est fausse, le triangle n'est pas rectangle." },
    { question: "$\\sqrt{50}$ est compris entre :", choix: ["$7$ et $8$", "$6$ et $7$", "$25$ et $26$", "$8$ et $9$"], bonne: 0, explication: "$49 < 50 < 64$, donc $7 < \\sqrt{50} < 8$." },
    { question: "Les solutions de l'équation $x^2 = 36$ sont :", choix: ["$6$ et $-6$", "$6$ seulement", "$18$ et $-18$", "il n'y en a pas"], bonne: 0, explication: "$6^2 = 36$ et $(-6)^2 = 36$." },
    { question: "Un terrain rectangulaire mesure $8$ m sur $6$ m. Sa diagonale mesure :", choix: ["$10$ m", "$14$ m", "$100$ m", "$7$ m"], bonne: 0, explication: "$8^2 + 6^2 = 64 + 36 = 100$, donc la diagonale mesure $\\sqrt{100} = 10$ m." },
    { question: "Lequel de ces triangles n'est **pas** rectangle ?", choix: ["côtés $4$ ; $5$ ; $6$", "côtés $3$ ; $4$ ; $5$", "côtés $6$ ; $8$ ; $10$", "côtés $5$ ; $12$ ; $13$"], bonne: 0, explication: "$4^2 + 5^2 = 41 \\neq 6^2 = 36$. Pour les autres, l'égalité de Pythagore est vraie." },
    { question: "$\\sqrt{9 + 16}$ est égal à :", choix: ["$5$", "$7$", "$25$", "$12{,}5$"], bonne: 0, explication: "$\\sqrt{9 + 16} = \\sqrt{25} = 5$. Attention : $\\sqrt{9} + \\sqrt{16} = 7$, ce n'est pas pareil." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer une longueur",
      etapes: [
        "Vérifie que le triangle est rectangle et repère l'hypoténuse (en face de l'angle droit).",
        "Écris l'égalité de Pythagore : hypoténuse$^2$ $=$ somme des deux autres carrés.",
        "Remplace, calcule (on ajoute pour l'hypoténuse, on soustrait pour un autre côté), puis prends la racine carrée."
      ],
      figure: "py4-meth-hyp",
      exemple: "$BC^2 = 7^2 + 4^2 = 65$, $BC \\approx 8{,}1$."
    },
    {
      titre: "Démontrer qu'un triangle est rectangle",
      etapes: [
        "Repère le plus grand côté.",
        "Calcule séparément son carré et la somme des carrés des deux autres.",
        "Égalité : rectangle (réciproque) ; sinon : pas rectangle."
      ],
      figure: "py4-meth-reciproque",
      exemple: "$10^2 = 100$ et $6^2 + 8^2 = 100$ : rectangle."
    },
    {
      titre: "Résoudre un problème concret",
      etapes: [
        "Fais un schéma et repère l'angle droit (mur et sol, poteau vertical, coin d'un rectangle…).",
        "Repère l'hypoténuse : l'échelle, le câble, la diagonale…",
        "Applique le théorème, puis réponds avec l'unité et l'arrondi demandés."
      ],
      figure: "py4-meth-echelle",
      exemple: "Échelle : $L^2 = 4^2 + 1{,}5^2 = 18{,}25$, donc $L \\approx 4{,}27$ m."
    }
  ],
  erreurs: [
    "Additionner les longueurs au lieu de leurs carrés.",
    "Oublier de prendre la racine carrée à la fin.",
    "Additionner les carrés quand on cherche un côté de l'angle droit (il faut soustraire).",
    "Se tromper d'hypoténuse : c'est le côté en face de l'angle droit.",
    "Croire que $\\sqrt{9 + 16} = \\sqrt{9} + \\sqrt{16}$.",
    "Arrondir trop tôt dans les calculs."
  ]
};
