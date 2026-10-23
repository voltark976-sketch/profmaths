/*
  CHAPITRE : 4e — Proportionnalité
  ---------------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 4e en 2026-2027 : reconnaitre une situation de
  proportionnalité (tableau, graphique : droite passant par l'origine) ; calculer une quatrième proportionnelle
  (produit en croix) ; utiliser l'égalité des produits en croix ; partager une quantité selon un ratio ; appliquer
  et calculer un pourcentage d'évolution (coefficient multiplicateur) ; vitesse moyenne et grandeurs quotients,
  conversions (km/h et m/s). Vidéos et cours PDF d'Yvan Monka.
  Figures : "pq4-cours-…", "pq4-qcm-…", "pq4-meth-…" (assets/exercices-quatrieme.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["quatrieme-proportionnalite"] = {
  niveau: "4e",
  numero: 5,
  titre: "Proportionnalité",
  accroche: "Reconnaître une situation de proportionnalité, utiliser le produit en croix, partager selon un ratio, calculer des pourcentages d'évolution et des vitesses.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : proportionnalité, partie 1 (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Proport1.pdf" },
    { titre: "Cours d'Yvan Monka : proportionnalité, partie 2 (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Proport2.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : proportionnalité (Yvan Monka)", url: "https://youtu.be/qSbYsztzMpU", type: "video" },
    { titre: "Représenter graphiquement une situation de proportionnalité (Yvan Monka)", url: "https://youtu.be/Ta0fHOtLJKw", type: "video" },
    { titre: "Convertir des grandeurs quotients (Yvan Monka)", url: "https://youtu.be/5LaL_SJVLoI", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Reconnaître la proportionnalité",
      video: { titre: "Vidéo d'Yvan Monka : appliquer les produits en croix", youtube: "https://youtu.be/NKdhdmVoY1g" },
      texte:
        "Deux grandeurs sont **proportionnelles** quand on passe de l'une à l'autre en multipliant toujours par le même nombre : le **coefficient de proportionnalité**. Dans un tableau, les quotients $\\dfrac{y}{x}$ sont tous égaux.\n\n" +
        "**Graphiquement**, une situation de proportionnalité est représentée par des points alignés avec l'**origine** du repère : une droite qui passe par $(0 \\, ; \\, 0)$. Ici, $2$ kg coûtent $5$ € : le coefficient est $2{,}5$.\n\n" +
        "**Produits en croix** : $\\dfrac{a}{b} = \\dfrac{c}{d}$ équivaut à $a \\times d = b \\times c$ (avec $b$ et $d$ non nuls). Cela permet de vérifier si deux fractions sont égales, ou si un tableau est de proportionnalité.",
      figure: "pq4-cours-graphe",
      exemple: {
        enonce: "$\\dfrac{12}{18}$ et $\\dfrac{10}{15}$ sont-elles égales ?",
        solution: "$12 \\times 15 = 180$ et $18 \\times 10 = 180$ : oui, elles sont égales."
      }
    },
    {
      titre: "Quatrième proportionnelle et ratio",
      video: { titre: "Vidéo d'Yvan Monka : appliquer la règle de la 4e proportionnelle", youtube: "https://youtu.be/2UDYG_hRCU4" },
      texte:
        "Quand trois nombres d'un tableau de proportionnalité sont connus, on calcule le quatrième par le produit en croix : si $\\dfrac{a}{b} = \\dfrac{x}{d}$, alors $x = \\dfrac{a \\times d}{b}$. Par exemple, $3$ kg de mangues coûtent $7{,}50$ €, donc $5$ kg coûtent $x = \\dfrac{7{,}5 \\times 5}{3} = 12{,}50$ €.\n\n" +
        "**Ratio** : partager $45$ € entre Anli et Fatima dans le ratio $2 : 3$, c'est faire $2 + 3 = 5$ parts égales de $45 \\div 5 = 9$ € ; Anli reçoit $2 \\times 9 = 18$ € et Fatima $3 \\times 9 = 27$ €.",
      figure: "pq4-cours-ratio",
      exemple: {
        enonce: "Un taxi-brousse consomme $6$ L de gazole pour $80$ km. Combien consomme-t-il pour $200$ km ?",
        solution: "$x = \\dfrac{6 \\times 200}{80} = 15$ L."
      }
    },
    {
      titre: "Pourcentages d'évolution",
      video: { titre: "Vidéo d'Yvan Monka : appliquer un pourcentage", youtube: "https://youtu.be/GI-x8mTHJbo" },
      texte:
        "- Augmenter de $t\\,\\%$, c'est multiplier par $1 + \\dfrac{t}{100}$ : $+20\\,\\%$ → $\\times 1{,}2$ (sur les barres, $50$ € deviennent $60$ €).\n" +
        "- Diminuer de $t\\,\\%$, c'est multiplier par $1 - \\dfrac{t}{100}$ : $-15\\,\\%$ → $\\times 0{,}85$.\n\n" +
        "Pour retrouver un prix avant réduction, on **divise** par le coefficient. Pour trouver le pourcentage d'évolution, on divise la variation par la valeur de départ.",
      figure: "pq4-cours-pourcentage",
      exemple: {
        enonce: "Un vélo à $240$ € est soldé à $-25\\,\\%$. Quel est son prix soldé ?",
        solution: "$240 \\times 0{,}75 = 180$ €."
      }
    },
    {
      titre: "Vitesse moyenne",
      video: { titre: "Vidéo d'Yvan Monka : effectuer des calculs de vitesse", youtube: "https://youtu.be/1t6fCpwVT6o" },
      texte:
        "Lors d'un mouvement à vitesse constante, la distance est proportionnelle à la durée : $v = \\dfrac{d}{t}$, $d = v \\times t$, $t = \\dfrac{d}{v}$. Le graphique de la distance en fonction de la durée est une droite qui passe par l'origine.\n\n" +
        "Les durées s'expriment en heures pour des vitesses en km/h : $20$ min $= \\dfrac{1}{3}$ h ; $45$ min $= 0{,}75$ h.\n\n" +
        "Conversion : $1$ m/s $= 3{,}6$ km/h (car $1$ m/s $= 3\\,600$ m/h $= 3{,}6$ km/h).",
      figure: "pq4-cours-vitesse",
      exemple: {
        enonce: "Un cycliste roule à $24$ km/h pendant $40$ min. Quelle distance parcourt-il ?",
        solution: "$d = 24 \\times \\dfrac{40}{60} = 16$ km."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "pq4-croix", titre: "Reconnaître la proportionnalité", etape: "Reconnaître", nb: 6 },
    { type: "pq4-quatrieme", titre: "Quatrième proportionnelle et ratio", etape: "Calculer", nb: 6 },
    { type: "pq4-pourcentages", titre: "Pourcentages d'évolution", etape: "Pourcentages", nb: 6 },
    { type: "pq4-vitesse", titre: "Vitesses et conversions", etape: "Vitesse", nb: 6 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$\\dfrac{a}{b} = \\dfrac{c}{d}$ équivaut à :", choix: ["$a \\times d = b \\times c$", "$a \\times c = b \\times d$", "$a + d = b + c$", "$a \\times b = c \\times d$"], bonne: 0, explication: "Égalité des produits en croix." },
    { question: "$\\dfrac{6}{8} = \\dfrac{x}{12}$ donne $x =$ :", choix: ["$9$", "$16$", "$10$", "$4$"], bonne: 0, explication: "$x = \\dfrac{6 \\times 12}{8} = 9$." },
    { question: "$\\dfrac{7}{9}$ et $\\dfrac{21}{28}$ sont :", choix: ["différentes", "égales", "opposées", "inverses"], bonne: 0, explication: "$7 \\times 28 = 196$ et $9 \\times 21 = 189$." },
    { question: "$4$ cahiers coûtent $6$ €. $10$ cahiers coûtent :", choix: ["$15$ €", "$12$ €", "$24$ €", "$60$ €"], bonne: 0, explication: "$\\dfrac{6 \\times 10}{4} = 15$." },
    { question: "Augmenter de $30\\,\\%$, c'est multiplier par :", choix: ["$1{,}3$", "$0{,}3$", "$30$", "$0{,}7$"], bonne: 0, explication: "$1 + 0{,}3$." },
    { question: "Diminuer de $8\\,\\%$, c'est multiplier par :", choix: ["$0{,}92$", "$0{,}08$", "$1{,}08$", "$0{,}8$"], bonne: 0, explication: "$1 - 0{,}08$." },
    { question: "Un prix de $50$ € augmente de $10\\,\\%$. Il devient :", choix: ["$55$ €", "$60$ €", "$5$ €", "$50{,}10$ €"], bonne: 0, explication: "$50 \\times 1{,}1$." },
    { question: "Un prix passe de $80$ € à $100$ €. L'augmentation est de :", choix: ["$25\\,\\%$", "$20\\,\\%$", "$20$ €, soit $20\\,\\%$", "$80\\,\\%$"], bonne: 0, explication: "$\\dfrac{20}{80} = 0{,}25$." },
    { question: "Après $-20\\,\\%$, un article coûte $40$ €. Il coûtait :", choix: ["$50$ €", "$48$ €", "$32$ €", "$60$ €"], bonne: 0, explication: "$40 \\div 0{,}8$." },
    { question: "$45$ min, c'est :", choix: ["$0{,}75$ h", "$0{,}45$ h", "$4{,}5$ h", "$0{,}5$ h"], bonne: 0, explication: "$\\dfrac{45}{60}$." },
    { question: "$150$ km en $2$ h $30$ min, c'est une vitesse de :", choix: ["$60$ km/h", "$75$ km/h", "$65$ km/h", "$50$ km/h"], bonne: 0, explication: "$150 \\div 2{,}5$." },
    { question: "À $60$ km/h, en $20$ min on parcourt :", choix: ["$20$ km", "$3$ km", "$12$ km", "$30$ km"], bonne: 0, explication: "$60 \\times \\dfrac{1}{3}$." },
    { question: "$10$ m/s est égal à :", choix: ["$36$ km/h", "$3{,}6$ km/h", "$100$ km/h", "$2{,}8$ km/h"], bonne: 0, explication: "$10 \\times 3{,}6$." },
    { question: "$72$ km/h est égal à :", choix: ["$20$ m/s", "$259{,}2$ m/s", "$7{,}2$ m/s", "$2$ m/s"], bonne: 0, explication: "$72 \\div 3{,}6$." },
    { question: "Ce graphique représente-t-il une situation de proportionnalité ?", figure: "pq4-qcm-affine", choix: ["Non : la droite ne passe pas par l'origine", "Oui : c'est une droite", "Oui : les valeurs augmentent", "On ne peut pas savoir"], bonne: 0, explication: "Une situation de proportionnalité est représentée par une droite qui passe par l'origine ; celle-ci coupe l'axe vertical en $2$." },
    { question: "D'après le graphique, le coefficient de proportionnalité est :", figure: "pq4-qcm-propo", choix: ["$2$", "$0{,}5$", "$10$", "$5$"], bonne: 0, explication: "La droite passe par l'origine et par le point $(5 \\, ; \\, 10)$ : $y = 2x$, le coefficient est $10 \\div 5 = 2$." },
    { question: "Anli et Fatima se partagent $45$ € dans le ratio $2 : 3$ (voir la barre). Fatima reçoit :", figure: "pq4-cours-ratio", choix: ["$27$ €", "$18$ €", "$22{,}50$ €", "$15$ €"], bonne: 0, explication: "$2 + 3 = 5$ parts de $45 \\div 5 = 9$ € ; Fatima en reçoit $3$ : $27$ €." },
    { question: "Le graphique donne la distance parcourue en fonction de la durée. La vitesse est :", figure: "pq4-cours-vitesse", choix: ["$60$ km/h", "$30$ km/h", "$1$ km/h", "$120$ km/h"], bonne: 0, explication: "$30$ km en $30$ min, donc $60$ km en $60$ min : $60$ km/h." },
    { question: "Un prix passe de $50$ € à $60$ €, comme sur les barres. Le pourcentage d'augmentation est :", figure: "pq4-cours-pourcentage", choix: ["$20\\,\\%$", "$10\\,\\%$", "$16{,}7\\,\\%$", "$60\\,\\%$"], bonne: 0, explication: "$\\dfrac{60 - 50}{50} = \\dfrac{10}{50} = 0{,}2$, soit $20\\,\\%$." },
    { question: "Dans le tableau $\\begin{array}{|c|c|c|} \\hline 2 & 5 & 8 \\\\ \\hline 3 & 7{,}5 & 12 \\\\ \\hline \\end{array}$, le coefficient de proportionnalité est :", choix: ["$1{,}5$", "$1$", "$2{,}5$", "ce n'est pas un tableau de proportionnalité"], bonne: 0, explication: "$3 \\div 2 = 7{,}5 \\div 5 = 12 \\div 8 = 1{,}5$." },
    { question: "Un mélange d'eau et de sirop dans le ratio $4 : 1$ fait $50$ cL. Il contient :", choix: ["$10$ cL de sirop", "$12{,}5$ cL de sirop", "$40$ cL de sirop", "$5$ cL de sirop"], bonne: 0, explication: "$4 + 1 = 5$ parts de $50 \\div 5 = 10$ cL : $1$ part de sirop, soit $10$ cL (et $40$ cL d'eau)." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer une quatrième proportionnelle",
      etapes: [
        "Range les données dans un tableau de proportionnalité.",
        "Écris l'égalité des produits en croix.",
        "Isole $x$ : on multiplie les deux nombres en diagonale, puis on divise par le troisième."
      ],
      figure: "pq4-meth-croix",
      exemple: "$3$ kg pour $7{,}50$ € : $5$ kg coûtent $x = \\dfrac{5 \\times 7{,}5}{3} = 12{,}50$ €."
    },
    {
      titre: "Pourcentages d'évolution",
      etapes: [
        "Écris le coefficient : $1 + \\dfrac{t}{100}$ (hausse) ou $1 - \\dfrac{t}{100}$ (baisse).",
        "Valeur finale $=$ valeur initiale $\\times$ coefficient.",
        "Valeur initiale $=$ valeur finale $\\div$ coefficient."
      ],
      figure: "pq4-cours-pourcentage",
      exemple: "$+5\\,\\%$ sur $120$ € : $120 \\times 1{,}05 = 126$ €."
    },
    {
      titre: "Calculer avec une vitesse",
      etapes: [
        "Convertis la durée en heures (ou la vitesse en m/s).",
        "$d = v \\times t$ ; $v = d \\div t$ ; $t = d \\div v$.",
        "Vérifie l'unité du résultat."
      ],
      figure: "pq4-cours-vitesse",
      exemple: "$90$ km/h pendant $1$ h $20$ min : $90 \\times \\dfrac{4}{3} = 120$ km."
    }
  ],
  erreurs: [
    "Placer les nombres au mauvais endroit dans le produit en croix.",
    "Croire qu'une droite représente toujours une situation de proportionnalité : il faut qu'elle passe par l'origine.",
    "Pour un ratio $2 : 3$, partager en deux moitiés au lieu de faire $5$ parts égales.",
    "Pour retrouver un prix avant une baisse de $20\\,\\%$, ajouter $20\\,\\%$ du nouveau prix.",
    "Écrire $1$ h $30$ min $= 1{,}3$ h au lieu de $1{,}5$ h.",
    "Multiplier par $3{,}6$ au lieu de diviser pour passer des km/h aux m/s."
  ]
};
