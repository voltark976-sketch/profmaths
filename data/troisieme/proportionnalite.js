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
  accroche: "Hausses, baisses, évolutions successives, grandeurs composées (vitesse, débit, masse volumique) et partages selon un ratio.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : proportionnalité et pourcentages (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Prop3e.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : pourcentages (Yvan Monka)", url: "https://youtu.be/1UV378tA_Hg", type: "video" },
    { titre: "Comprendre la masse volumique (Yvan Monka)", url: "https://youtu.be/LIbVWVN5J9w", type: "video" },
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
        "De $50$ € à $60$ € : $\\dfrac{10}{50} \\times 100 = 20$, soit une hausse de $20\\,\\%$.\n\n" +
        "Sur la barre, $240$ représente $100\\,\\%$ : chaque graduation vaut $10\\,\\%$, soit $24$ ; la partie coloriée, $15\\,\\%$, vaut $36$.",
      figure: "pp3-cours-pourcentage",
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
      figure: "pp3-cours-coefs",
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
        "Attention aux durées : $1$ h $15$ min $= 1{,}25$ h (et non $1{,}15$ h).\n\n" +
        "Pour convertir une vitesse : des m/s vers les km/h, on multiplie par $3{,}6$ ; des km/h vers les m/s, on divise par $3{,}6$ (voir la figure).",
      figure: "pp3-cours-conversions",
      exemple: {
        enonce: "Un train parcourt $210$ km en $1$ h $30$ min. Quelle est sa vitesse moyenne ?",
        solution: "$210 \\div 1{,}5 = 140$ km/h."
      }
    },
    {
      titre: "Partager selon un ratio",
      video: { titre: "Vidéo d'Yvan Monka : résoudre un problème de proportionnalité", youtube: "https://youtu.be/Qd6FDygCqDI" },
      texte:
        "Deux nombres $a$ et $b$ sont dans le **ratio** $2 : 3$ si $\\dfrac{a}{2} = \\dfrac{b}{3}$ : $a$ représente $2$ parts et $b$ représente $3$ parts égales.\n\n" +
        "Pour **partager** une quantité dans le ratio $2 : 3$, on la divise en $2 + 3 = 5$ parts égales. Avec $150$ € : une part vaut $150 \\div 5 = 30$ €, donc $2 \\times 30 = 60$ € et $3 \\times 30 = 90$ € (voir la figure).\n\n" +
        "Un ratio peut avoir trois nombres ($1 : 2 : 3$) et se simplifie comme une fraction : $12 : 18 = 2 : 3$.",
      figure: "pp3-cours-ratio",
      exemple: {
        enonce: "Le ratio filles : garçons d'un club est $3 : 4$ et il y a $15$ filles. Combien y a-t-il de garçons ?",
        solution: "Une part vaut $15 \\div 3 = 5$, donc il y a $4 \\times 5 = 20$ garçons."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "pp3-pourcentage", titre: "Pourcentages et taux d'évolution", etape: "Pourcentages", nb: 6 },
    { type: "pp3-evolutions", titre: "Évolutions successives", etape: "Pourcentages", nb: 5 },
    { type: "pp3-conversions", titre: "Convertir des grandeurs composées", etape: "Grandeurs", nb: 6 },
    { type: "pp3-grandeurs", titre: "Vitesse, masse volumique, proportionnalité", etape: "Grandeurs", nb: 5 },
    { type: "pp3-ratio", titre: "Partager selon un ratio", etape: "Ratio", nb: 5 }
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
    { question: "$3$ kg de riz coûtent $4{,}50$ €. $5$ kg coûtent :", choix: ["$7{,}50$ €", "$6{,}50$ €", "$9$ €", "$15$ €"], bonne: 0, explication: "$1{,}50$ € le kg." },
    { question: "Sur ce schéma, la partie coloriée représente $25\\,\\%$ de $80$ €. Elle vaut :", figure: "pp3-qcm-barre", choix: ["$20$ €", "$25$ €", "$55$ €", "$3{,}20$ €"], bonne: 0, explication: "$0{,}25 \\times 80 = 20$ : c'est le quart de $80$ €." },
    { question: "D'après le schéma, quel est le prix final ?", figure: "pp3-qcm-coefs", choix: ["$198$ €", "$200$ €", "$220$ €", "$180$ €"], bonne: 0, explication: "$200 \\times 1{,}1 = 220$, puis $220 \\times 0{,}9 = 198$ €." },
    { question: "Après deux hausses successives de $10\\,\\%$, le prix a augmenté de :", choix: ["$21\\,\\%$", "$20\\,\\%$", "$10\\,\\%$", "$11\\,\\%$"], bonne: 0, explication: "$1{,}1 \\times 1{,}1 = 1{,}21$." },
    { question: "Après une hausse de $25\\,\\%$, quelle baisse ramène au prix de départ ?", choix: ["$20\\,\\%$", "$25\\,\\%$", "$75\\,\\%$", "$12{,}5\\,\\%$"], bonne: 0, explication: "$1{,}25 \\times 0{,}8 = 1$ : il faut multiplier par $0{,}8$, soit une baisse de $20\\,\\%$." },
    { question: "$15$ m/s en km/h :", choix: ["$54$ km/h", "$4{,}17$ km/h", "$15\\,000$ km/h", "$0{,}9$ km/h"], bonne: 0, explication: "$15 \\times 3{,}6 = 54$." },
    { question: "Un robinet fuit de $3$ L par heure. En une journée, il perd :", choix: ["$72$ L", "$180$ L", "$36$ L", "$3$ L"], bonne: 0, explication: "$24 \\times 3 = 72$ L." },
    { question: "Partager $150$ € dans le ratio $2 : 3$ donne :", choix: ["$60$ € et $90$ €", "$50$ € et $100$ €", "$75$ € et $75$ €", "$30$ € et $120$ €"], bonne: 0, explication: "$5$ parts de $30$ € : $2 \\times 30$ et $3 \\times 30$." },
    { question: "Dans un groupe, le ratio filles : garçons est $3 : 4$. Il y a $12$ filles, donc :", choix: ["$16$ garçons", "$9$ garçons", "$13$ garçons", "$48$ garçons"], bonne: 0, explication: "Une part vaut $12 \\div 3 = 4$, donc $4 \\times 4 = 16$ garçons." },
    { question: "Une voiture roule à $80$ km/h pendant $45$ min. Elle parcourt :", choix: ["$60$ km", "$36$ km", "$125$ km", "$3\\,600$ km"], bonne: 0, explication: "$45$ min $= 0{,}75$ h et $80 \\times 0{,}75 = 60$ km." },
    { question: "La masse volumique du fer est $7{,}8$ g/cm³. Une pièce de fer de $10$ cm³ pèse :", choix: ["$78$ g", "$1{,}28$ g", "$17{,}8$ g", "$780$ g"], bonne: 0, explication: "$7{,}8 \\times 10 = 78$ g." }
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
      figure: "pp3-cours-coefs",
      exemple: "$+50\\,\\%$ puis $-50\\,\\%$ : $1{,}5 \\times 0{,}5 = 0{,}75$, soit $-25\\,\\%$."
    },
    {
      titre: "Vitesse et durées",
      etapes: [
        "Convertis la durée en heures : $\\text{minutes} \\div 60$.",
        "$d = v \\times t$, $v = \\dfrac{d}{t}$, $t = \\dfrac{d}{v}$.",
        "Pour passer de km/h à m/s, divise par $3{,}6$ ; dans l'autre sens, multiplie."
      ],
      figure: "pp3-cours-conversions",
      exemple: "$45$ min $= 0{,}75$ h ; à $80$ km/h : $60$ km."
    },
    {
      titre: "Partager selon un ratio",
      etapes: [
        "Additionne les nombres du ratio : c'est le nombre de parts égales.",
        "Divise la quantité totale par ce nombre : tu obtiens la valeur d'une part.",
        "Multiplie la valeur d'une part par le nombre de parts de chacun ; vérifie que le total est respecté."
      ],
      figure: "pp3-cours-ratio",
      exemple: "$150$ € dans le ratio $2 : 3$ : $5$ parts de $30$ €, soit $60$ € et $90$ €."
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
