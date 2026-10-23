/*
  CHAPITRE : 3e — Proportionnalité et pourcentages
  -------------------------------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 3e en 2026-2027 (brevet 2027) : résoudre des
  problèmes de proportionnalité ; calculer et appliquer des pourcentages d'évolution (hausses, baisses,
  évolutions successives, valeur initiale) ; utiliser et convertir des grandeurs composées (vitesse, débit,
  masse volumique). Vidéos et cours PDF d'Yvan Monka.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["troisieme-proportionnalite"] = {
  niveau: "3e",
  numero: 8,
  titre: "Proportionnalité et pourcentages",
  accroche: "Hausses, baisses, évolutions successives et grandeurs composées : vitesse, débit, masse volumique.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : proportionnalité et pourcentages (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Prop3e.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : pourcentages (Yvan Monka)", url: "https://youtu.be/1UV378tA_Hg", type: "video" },
    { titre: "Résoudre un problème de proportionnalité (Yvan Monka)", url: "https://youtu.be/Qd6FDygCqDI", type: "video" },
    { titre: "Résoudre un problème de débit (Yvan Monka)", url: "https://youtu.be/3dYAbDm3jNI", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Appliquer et calculer un pourcentage",
      video: { titre: "Vidéo d'Yvan Monka : effectuer un calcul de pourcentage", youtube: "https://youtu.be/c2s_Fta0jCo" },
      texte:
        "Prendre $t\\,\\%$ d'un nombre, c'est le multiplier par $\\dfrac{t}{100}$ : $15\\,\\%$ de $240$ font $0{,}15 \\times 240 = 36$.\n\n" +
        "Le **taux d'évolution** d'une valeur $V_0$ à une valeur $V_1$ est $\\dfrac{V_1 - V_0}{V_0} \\times 100$ (en $\\%$).\n\n" +
        "De $50$ € à $60$ € : $\\dfrac{10}{50} \\times 100 = 20$, soit une hausse de $20\\,\\%$.",
      exemple: {
        enonce: "Un prix passe de $80$ € à $68$ €. Quelle est l'évolution ?",
        solution: "$\\dfrac{68 - 80}{80} \\times 100 = -15$ : baisse de $15\\,\\%$."
      }
    },
    {
      titre: "Coefficients multiplicateurs",
      video: { titre: "Vidéo d'Yvan Monka : résoudre un problème de pourcentages", youtube: "https://youtu.be/_HXPkDRYCYA" },
      texte:
        "- Augmenter de $t\\,\\%$, c'est multiplier par $1 + \\dfrac{t}{100}$ (hausse de $8\\,\\%$ : $\\times 1{,}08$).\n" +
        "- Diminuer de $t\\,\\%$, c'est multiplier par $1 - \\dfrac{t}{100}$ (baisse de $8\\,\\%$ : $\\times 0{,}92$).\n\n" +
        "Pour des **évolutions successives**, on **multiplie** les coefficients : $+20\\,\\%$ puis $-20\\,\\%$ donne $1{,}2 \\times 0{,}8 = 0{,}96$, soit $-4\\,\\%$ (et non $0\\,\\%$).\n\n" +
        "Pour retrouver une valeur initiale, on **divise** par le coefficient.",
      exemple: {
        enonce: "Après une hausse de $25\\,\\%$, un vélo coûte $250$ €. Quel était son prix ?",
        solution: "$250 \\div 1{,}25 = 200$ €."
      }
    },
    {
      titre: "Grandeurs composées",
      video: { titre: "Vidéo d'Yvan Monka : convertir des unités de grandeurs quotients", youtube: "https://youtu.be/5LaL_SJVLoI" },
      texte:
        "- **Vitesse** : $v = \\dfrac{d}{t}$ ; $1$ m/s $= 3{,}6$ km/h.\n" +
        "- **Débit** : volume écoulé par unité de temps (L/min, m³/h).\n" +
        "- **Masse volumique** : $\\rho = \\dfrac{m}{V}$ ; $1$ g/cm³ $= 1\\,000$ kg/m³.\n\n" +
        "Attention aux durées : $1$ h $15$ min $= 1{,}25$ h (et non $1{,}15$ h).",
      exemple: {
        enonce: "Un train parcourt $210$ km en $1$ h $30$ min. Quelle est sa vitesse moyenne ?",
        solution: "$210 \\div 1{,}5 = 140$ km/h."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "pp3-pourcentage", titre: "Pourcentages et taux d'évolution", etape: "Pourcentages", nb: 6 },
    { type: "pp3-evolutions", titre: "Évolutions successives", etape: "Pourcentages", nb: 5 },
    { type: "pp3-conversions", titre: "Convertir des grandeurs composées", etape: "Grandeurs", nb: 6 },
    { type: "pp3-grandeurs", titre: "Vitesse, masse volumique, proportionnalité", etape: "Grandeurs", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$30\\,\\%$ de $250$ font :", choix: ["$75$", "$30$", "$83{,}3$", "$7{,}5$"], bonne: 0, explication: "$0{,}3 \\times 250$." },
    { question: "Augmenter de $12\\,\\%$ revient à multiplier par :", choix: ["$1{,}12$", "$0{,}12$", "$0{,}88$", "$12$"], bonne: 0, explication: "$1 + 0{,}12$." },
    { question: "Diminuer de $5\\,\\%$ revient à multiplier par :", choix: ["$0{,}95$", "$0{,}05$", "$1{,}05$", "$0{,}5$"], bonne: 0, explication: "$1 - 0{,}05$." },
    { question: "Un prix passe de $40$ € à $50$ €. L'évolution est :", choix: ["$+25\\,\\%$", "$+10\\,\\%$", "$+20\\,\\%$", "$+50\\,\\%$"], bonne: 0, explication: "$\\dfrac{10}{40} = 0{,}25$." },
    { question: "Une hausse de $10\\,\\%$ suivie d'une baisse de $10\\,\\%$ donne :", choix: ["une baisse de $1\\,\\%$", "aucune évolution", "une hausse de $1\\,\\%$", "une baisse de $10\\,\\%$"], bonne: 0, explication: "$1{,}1 \\times 0{,}9 = 0{,}99$." },
    { question: "Après une baisse de $20\\,\\%$, un article coûte $40$ €. Avant, il coûtait :", choix: ["$50$ €", "$48$ €", "$60$ €", "$32$ €"], bonne: 0, explication: "$40 \\div 0{,}8$." },
    { question: "$72$ km/h en m/s :", choix: ["$20$ m/s", "$259{,}2$ m/s", "$7{,}2$ m/s", "$72\\,000$ m/s"], bonne: 0, explication: "$72 \\div 3{,}6$." },
    { question: "$1$ h $30$ min en heures :", choix: ["$1{,}5$ h", "$1{,}3$ h", "$1{,}03$ h", "$130$ h"], bonne: 0, explication: "$30$ min $= 0{,}5$ h." },
    { question: "Une voiture parcourt $150$ km en $2$ h. Sa vitesse moyenne est :", choix: ["$75$ km/h", "$300$ km/h", "$152$ km/h", "$70$ km/h"], bonne: 0, explication: "$150 \\div 2$." },
    { question: "Un robinet débite $12$ L/min. En une heure, il coule :", choix: ["$720$ L", "$72$ L", "$0{,}2$ L", "$1\\,200$ L"], bonne: 0, explication: "$12 \\times 60$." },
    { question: "La masse volumique de l'eau est $1$ g/cm³. Un litre d'eau ($1\\,000$ cm³) pèse :", choix: ["$1$ kg", "$1$ g", "$100$ g", "$10$ kg"], bonne: 0, explication: "$1\\,000$ g." },
    { question: "$3$ kg de riz coûtent $4{,}50$ €. $5$ kg coûtent :", choix: ["$7{,}50$ €", "$6{,}50$ €", "$9$ €", "$15$ €"], bonne: 0, explication: "$1{,}50$ € le kg." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Pourcentages d'évolution",
      etapes: [
        "Écris le coefficient multiplicateur : $1 + \\dfrac{t}{100}$ ou $1 - \\dfrac{t}{100}$.",
        "Évolutions successives : multiplie les coefficients.",
        "Valeur initiale : divise la valeur finale par le coefficient."
      ],
      exemple: "$+50\\,\\%$ puis $-50\\,\\%$ : $1{,}5 \\times 0{,}5 = 0{,}75$, soit $-25\\,\\%$."
    },
    {
      titre: "Vitesse et durées",
      etapes: [
        "Convertis la durée en heures : $\\text{minutes} \\div 60$.",
        "$d = v \\times t$, $v = \\dfrac{d}{t}$, $t = \\dfrac{d}{v}$.",
        "Pour passer de km/h à m/s, divise par $3{,}6$ ; dans l'autre sens, multiplie."
      ],
      exemple: "$45$ min $= 0{,}75$ h ; à $80$ km/h : $60$ km."
    }
  ],
  erreurs: [
    "Additionner des pourcentages d'évolutions successives.",
    "Retirer le pourcentage au nouveau prix pour retrouver l'ancien.",
    "Diviser par la valeur finale pour un taux d'évolution.",
    "Écrire $1$ h $20$ min $= 1{,}2$ h.",
    "Multiplier par $3{,}6$ pour passer des km/h aux m/s."
  ]
};
