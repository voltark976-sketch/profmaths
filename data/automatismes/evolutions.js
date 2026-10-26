/*
  AUTOMATISMES · ÉVOLUTIONS ET VARIATIONS
  ---------------------------------------
  Seconde 2026 : passer d'une formulation additive (« augmenter de 5 % ») à une formulation multiplicative (« multiplier par 1,05 »).
  Première 2026 : valeur finale ou initiale, taux d'évolution, évolutions successives, taux réciproque.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["auto-evolutions"] = {
  niveau: "Automatismes",
  numero: null,
  periode: "Seconde et Première",
  titre: "Évolutions et variations",
  accroche: "Hausses, baisses, coefficients multiplicateurs, taux successifs et taux réciproques : savoir passer d'un pourcentage à une multiplication.",

  playlist: "https://www.youtube.com/playlist?list=PLVTjofGlms14",
  drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv",
  pdfs: [
    { titre: "Dossier élève de Seconde (partie P5)", url: "https://drive.google.com/file/d/1vr9e5N38rAOQLWIvUR5suK6l6ciyoLNY/view" }
  ],

  cours: [
    {
      titre: "Formulation additive, formulation multiplicative",
      video: { titre: "Vidéo de ton prof : pourcentages et coefficients multiplicateurs", youtube: "https://youtu.be/DWf_35WEQuI" },
      texte:
        "- Augmenter de $t\\,\\%$, c'est **multiplier** par $1 + \\dfrac{t}{100}$ : augmenter de $5\\,\\%$, c'est multiplier par $1{,}05$.\n" +
        "- Diminuer de $t\\,\\%$, c'est multiplier par $1 - \\dfrac{t}{100}$ : diminuer de $5\\,\\%$, c'est multiplier par $0{,}95$ (schéma ci-contre).\n" +
        "- Ce nombre s'appelle le **coefficient multiplicateur** $CM$. Hausse : $CM > 1$. Baisse : $0 < CM < 1$.\n" +
        "- Dans l'autre sens : $CM = 1{,}3$ veut dire « augmenter de $30\\,\\%$ », $CM = 0{,}7$ veut dire « diminuer de $30\\,\\%$ ».",
      figure: "am-cours-coefficient",
      exemple: {
        enonce: "Par quel nombre multiplie-t-on pour augmenter de $3\\,\\%$ ? pour baisser de $12\\,\\%$ ? Que signifie multiplier par $1{,}5$ ?",
        solution: "$1 + 0{,}03 = 1{,}03$.\n\n$1 - 0{,}12 = 0{,}88$.\n\n$1{,}5 = 1 + 0{,}5$ : c'est augmenter de $50\\,\\%$."
      }
    },
    {
      titre: "Valeur finale, valeur initiale (Première)",
      video: { titre: "Vidéo de ton prof : calculer avec des proportions et des évolutions", youtube: "https://youtu.be/WwLJCEUa2t4" },
      texte:
        "- $V_{\\text{finale}} = V_{\\text{initiale}} \\times CM$. Dans le schéma ci-contre : $36 \\times 1{,}25 = 45$ €.\n" +
        "- Pour retrouver la valeur initiale, on **divise** : $V_{\\text{initiale}} = \\dfrac{V_{\\text{finale}}}{CM}$, ici $\\dfrac{45}{1{,}25} = 36$ €.\n" +
        "- Attention : après une baisse de $20\\,\\%$, on ne retrouve pas le prix de départ en ajoutant $20\\,\\%$.",
      figure: "am-cours-initiale",
      exemple: {
        enonce: "Après une baisse de $20\\,\\%$, un salouva coûte $32$ € au marché de Mamoudzou. Quel était son prix avant ?",
        solution: "$CM = 0{,}8$, donc $V_{\\text{initiale}} = \\dfrac{32}{0{,}8} = 40$ €. Vérification : $40 \\times 0{,}8 = 32$."
      }
    },
    {
      titre: "Taux d'évolution (Première)",
      video: { titre: "Vidéo d'Yvan Monka : déterminer un taux d'évolution", youtube: "https://youtu.be/Y48-iK7Cp20" },
      texte:
        "- Le taux d'évolution entre $V_0$ et $V_1$ est $t = \\dfrac{V_1 - V_0}{V_0}$, qu'on écrit en pourcentage.\n" +
        "- On divise toujours par la valeur **de départ**. Dans le schéma ci-contre, le litre d'essence passe de $1{,}60$ € à $1{,}84$ € : $t = \\dfrac{0{,}24}{1{,}60} = 0{,}15 = +15\\,\\%$.\n" +
        "- On peut aussi calculer $CM = \\dfrac{V_1}{V_0}$, puis $t = CM - 1$.",
      figure: "am-cours-taux",
      exemple: {
        enonce: "Le nombre de tortues observées en une saison sur une plage de Saziley passe de $80$ à $68$. Calculer le taux d'évolution.",
        solution: "$t = \\dfrac{68 - 80}{80} = \\dfrac{-12}{80} = -0{,}15 = -15\\,\\%$ : c'est une baisse de $15\\,\\%$."
      }
    },
    {
      titre: "Évolutions successives (Première)",
      video: { titre: "Vidéo de ton prof : raisonner sur les évolutions successives", youtube: "https://youtu.be/xb81PxfmSWQ" },
      texte:
        "- Évolutions successives : on **multiplie** les coefficients. $CM_{\\text{global}} = CM_1 \\times CM_2$.\n" +
        "- Une hausse de $10\\,\\%$ suivie d'une baisse de $10\\,\\%$ donne $1{,}1 \\times 0{,}9 = 0{,}99$, soit une **baisse** de $1\\,\\%$ (schéma ci-contre) : les pourcentages ne s'additionnent pas.",
      figure: "am-cours-successives",
      exemple: {
        enonce: "Un prix augmente de $20\\,\\%$, puis baisse de $25\\,\\%$. Quelle est l'évolution globale ?",
        solution: "$CM = 1{,}2 \\times 0{,}75 = 0{,}9 = 1 - 0{,}1$ : c'est une baisse de $10\\,\\%$ (et non une baisse de $5\\,\\%$)."
      }
    },
    {
      titre: "Taux d'évolution réciproque (Première)",
      video: { titre: "Vidéo d'Yvan Monka : calculer un taux d'évolution réciproque", youtube: "https://youtu.be/vv-yPWr4T54" },
      texte:
        "- L'évolution qui ramène à la valeur de départ a pour coefficient $CM' = \\dfrac{1}{CM}$.\n" +
        "- Une baisse de $20\\,\\%$ ($CM = 0{,}8$) se compense par une hausse de $25\\,\\%$, car $\\dfrac{1}{0{,}8} = 1{,}25$ (schéma ci-contre).\n" +
        "- Le taux réciproque n'est donc pas l'opposé du taux : il se calcule sur la valeur **modifiée**.",
      figure: "am-cours-reciproque",
      exemple: {
        enonce: "Le prix d'un billet de barge augmente de $60\\,\\%$. Quelle baisse le ramènerait à son prix initial ?",
        solution: "$CM = 1{,}6$, donc $CM' = \\dfrac{1}{1{,}6} = \\dfrac{10}{16} = \\dfrac{5}{8} = 0{,}625 = 1 - 0{,}375$ : il faudrait une baisse de $37{,}5\\,\\%$."
      }
    }
  ],

  videos: [
    { titre: "Exercice 13 · Pourcentages et coefficients multiplicateurs", type: "Coefficient", youtube: "https://youtu.be/DWf_35WEQuI" },
    { titre: "Exercice 14 · Proportions et évolutions", type: "Valeur initiale", youtube: "https://youtu.be/WwLJCEUa2t4" },
    { titre: "Exercice 15 · Évolutions successives", type: "Raisonner", youtube: "https://youtu.be/xb81PxfmSWQ" }
  ],
  videosNote: "Vidéos de ton prof (playlist « Secondes : automatismes ») : les énoncés sont dans le dossier élève ci-dessus.",

  exercices: [
    { type: "am-coefficient", titre: "Augmenter de t %, multiplier par…", etape: "Automatismes de Seconde", nb: 6 },
    { type: "appliquer-evolution", titre: "Valeur finale, valeur initiale", etape: "Automatismes de Première", nb: 5 },
    { type: "taux-evolution", titre: "Calculer un taux d'évolution", etape: "Automatismes de Première", nb: 5 },
    { type: "evolutions-successives", titre: "Évolutions successives", etape: "Automatismes de Première", nb: 5 },
    { type: "am-reciproque", titre: "Taux d'évolution réciproque", etape: "Automatismes de Première", nb: 5 },
    { type: "am-flash-ev", titre: "Flash : évolutions mélangées", etape: "Défi", nb: 8 }
  ],

  qcm: [
    { question: "Augmenter de $7\\,\\%$, c'est multiplier par :", choix: ["$0{,}07$", "$1{,}7$", "$1{,}07$", "$7$"], bonne: 2, explication: "$1 + \\dfrac{7}{100} = 1{,}07$." },
    { question: "Multiplier par $0{,}65$, c'est :", choix: ["baisser de $65\\,\\%$", "baisser de $35\\,\\%$", "augmenter de $65\\,\\%$", "baisser de $0{,}35\\,\\%$"], bonne: 1, explication: "$0{,}65 = 1 - 0{,}35$ : baisse de $35\\,\\%$." },
    { question: "Un article à $80$ € augmente de $15\\,\\%$. Son nouveau prix est :", choix: ["$95$ €", "$92$ €", "$68$ €", "$81{,}20$ €"], bonne: 1, explication: "$80 \\times 1{,}15 = 92$ € ($15\\,\\%$ de $80$ €, c'est $12$ €)." },
    { question: "Après une baisse de $10\\,\\%$, un article coûte $54$ €. Son prix initial était :", choix: ["$59{,}40$ €", "$60$ €", "$64$ €", "$48{,}60$ €"], bonne: 1, explication: "$\\dfrac{54}{0{,}9} = 60$ €. ($59{,}40$ €, c'est $54$ € augmenté de $10\\,\\%$ : faux, car les $10\\,\\%$ portent sur l'ancien prix.)" },
    { question: "Une population passe de $200$ à $230$ habitants. Le taux d'évolution est :", choix: ["$+30\\,\\%$", "$+15\\,\\%$", "$+13\\,\\%$", "$+1{,}15\\,\\%$"], bonne: 1, explication: "$\\dfrac{230 - 200}{200} = \\dfrac{30}{200} = 0{,}15$, soit $+15\\,\\%$." },
    { question: "Un prix passe de $50$ € à $40$ €. Le taux d'évolution est :", choix: ["$-10\\,\\%$", "$-20\\,\\%$", "$-25\\,\\%$", "$+20\\,\\%$"], bonne: 1, explication: "$\\dfrac{40 - 50}{50} = -\\dfrac{10}{50} = -0{,}2$, soit $-20\\,\\%$. ($-25\\,\\%$ vient d'une division par $40$, la valeur d'arrivée.)" },
    { question: "Une hausse de $20\\,\\%$ puis une baisse de $20\\,\\%$ donnent :", choix: ["aucune évolution", "une baisse de $4\\,\\%$", "une hausse de $4\\,\\%$", "une baisse de $40\\,\\%$"], bonne: 1, explication: "$1{,}2 \\times 0{,}8 = 0{,}96$ : baisse de $4\\,\\%$." },
    { question: "Deux hausses successives de $10\\,\\%$ équivalent à une hausse de :", choix: ["$20\\,\\%$", "$21\\,\\%$", "$1\\,\\%$", "$11\\,\\%$"], bonne: 1, explication: "$1{,}1 \\times 1{,}1 = 1{,}21$ : hausse de $21\\,\\%$." },
    { question: "Après une hausse de $25\\,\\%$, quelle évolution ramène au prix initial (schéma ci-contre) ?", figure: "am-qcm-retour", choix: ["une baisse de $25\\,\\%$", "une baisse de $20\\,\\%$", "une baisse de $75\\,\\%$", "une baisse de $12{,}5\\,\\%$"], bonne: 1, explication: "$CM' = \\dfrac{1}{1{,}25} = 0{,}8 = 1 - 0{,}2$ : baisse de $20\\,\\%$. Une baisse de $25\\,\\%$ donnerait $1{,}25 \\times 0{,}75 = 0{,}9375$ : on ne reviendrait pas au départ." },
    { question: "Un prix est divisé par $2$. Quelle hausse permet de revenir au prix initial ?", choix: ["$50\\,\\%$", "$100\\,\\%$", "$200\\,\\%$", "$150\\,\\%$"], bonne: 1, explication: "Il faut multiplier par $2 = 1 + 1$, soit une hausse de $100\\,\\%$." },
    { question: "Diminuer de $40\\,\\%$, c'est multiplier par :", choix: ["$0{,}6$", "$0{,}4$", "$1{,}4$", "$-0{,}4$"], bonne: 0, explication: "$1 - \\dfrac{40}{100} = 0{,}6$. Multiplier par $0{,}4$, c'est garder $40\\,\\%$, donc baisser de $60\\,\\%$." },
    { question: "Augmenter de $150\\,\\%$, c'est multiplier par :", choix: ["$2{,}5$", "$1{,}5$", "$1{,}15$", "$150$"], bonne: 0, explication: "$1 + \\dfrac{150}{100} = 2{,}5$. Une hausse de plus de $100\\,\\%$ fait plus que doubler la valeur." },
    { question: "Multiplier par $1{,}08$, c'est :", choix: ["augmenter de $8\\,\\%$", "augmenter de $108\\,\\%$", "augmenter de $0{,}08\\,\\%$", "augmenter de $80\\,\\%$"], bonne: 0, explication: "$1{,}08 = 1 + 0{,}08$ : hausse de $8\\,\\%$." },
    { question: "Multiplier par $0{,}97$, c'est :", choix: ["baisser de $3\\,\\%$", "baisser de $97\\,\\%$", "baisser de $0{,}3\\,\\%$", "augmenter de $97\\,\\%$"], bonne: 0, explication: "$0{,}97 = 1 - 0{,}03$ : baisse de $3\\,\\%$." },
    { question: "Un sac de riz à $25$ € augmente de $8\\,\\%$. Son nouveau prix est :", choix: ["$27$ €", "$33$ €", "$25{,}08$ €", "$23$ €"], bonne: 0, explication: "$25 \\times 1{,}08 = 27$ € ($8\\,\\%$ de $25$ €, c'est $2$ €)." },
    { question: "Un téléphone à $300$ € est soldé à $-30\\,\\%$. Son prix soldé est :", choix: ["$210$ €", "$270$ €", "$90$ €", "$200$ €"], bonne: 0, explication: "$300 \\times 0{,}7 = 210$ €. ($90$ € est le montant de la remise.)" },
    { question: "Après une hausse de $20\\,\\%$, un billet coûte $36$ €. Son prix initial était :", choix: ["$30$ €", "$28{,}80$ €", "$43{,}20$ €", "$16$ €"], bonne: 0, explication: "On divise par le coefficient : $\\dfrac{36}{1{,}2} = 30$ €. Retirer $20\\,\\%$ de $36$ € ($28{,}80$ €) est faux." },
    { question: "Après une baisse de $50\\,\\%$, un article coûte $40$ €. Son prix initial était :", choix: ["$80$ €", "$60$ €", "$20$ €", "$90$ €"], bonne: 0, explication: "$\\dfrac{40}{0{,}5} = 80$ € : une baisse de $50\\,\\%$ divise le prix par $2$." },
    { question: "Le nombre d'élèves d'un club passe de $40$ à $50$. Le taux d'évolution est :", choix: ["$+25\\,\\%$", "$+20\\,\\%$", "$+10\\,\\%$", "$+1{,}25\\,\\%$"], bonne: 0, explication: "$\\dfrac{50 - 40}{40} = \\dfrac{10}{40} = 0{,}25$. On divise par la valeur de départ ($+20\\,\\%$ vient d'une division par $50$)." },
    { question: "Une valeur passe de $80$ à $20$. Le taux d'évolution est :", choix: ["$-75\\,\\%$", "$-60\\,\\%$", "$-25\\,\\%$", "$-300\\,\\%$"], bonne: 0, explication: "$\\dfrac{20 - 80}{80} = -\\dfrac{60}{80} = -0{,}75$, soit une baisse de $75\\,\\%$ ($CM = 0{,}25$)." },
    { question: "Une baisse de $10\\,\\%$ suivie d'une baisse de $10\\,\\%$ équivaut à :", choix: ["une baisse de $19\\,\\%$", "une baisse de $20\\,\\%$", "une baisse de $1\\,\\%$", "une baisse de $81\\,\\%$"], bonne: 0, explication: "$0{,}9 \\times 0{,}9 = 0{,}81 = 1 - 0{,}19$ : baisse de $19\\,\\%$. ($81\\,\\%$, c'est ce qu'il reste.)" },
    { question: "Une hausse de $10\\,\\%$ suivie d'une hausse de $20\\,\\%$ équivaut à une hausse de :", choix: ["$32\\,\\%$", "$30\\,\\%$", "$2\\,\\%$", "$132\\,\\%$"], bonne: 0, explication: "$1{,}1 \\times 1{,}2 = 1{,}32$ : hausse de $32\\,\\%$. La seconde hausse porte sur un prix déjà augmenté." },
    { question: "Un prix est multiplié par $4$. Quelle baisse le ramène à sa valeur initiale ?", choix: ["$75\\,\\%$", "$25\\,\\%$", "$400\\,\\%$", "$300\\,\\%$"], bonne: 0, explication: "$CM' = \\dfrac{1}{4} = 0{,}25 = 1 - 0{,}75$ : baisse de $75\\,\\%$. Une baisse ne peut pas dépasser $100\\,\\%$." },
    { question: "Après une baisse de $10\\,\\%$, quelle hausse ramène au prix initial ?", choix: ["environ $11{,}1\\,\\%$", "$10\\,\\%$", "$9\\,\\%$", "$90\\,\\%$"], bonne: 0, explication: "$CM' = \\dfrac{1}{0{,}9} = \\dfrac{10}{9} \\approx 1{,}111$ : hausse d'environ $11{,}1\\,\\%$. Une hausse de $10\\,\\%$ ne suffit pas : $0{,}9 \\times 1{,}1 = 0{,}99$." },
    { question: "Au marché de Mamoudzou, le kilo de bananes passe de $2{,}50$ € à $3$ € (schéma ci-contre). Le taux d'évolution est :", figure: "am-qcm-bananes", choix: ["$+20\\,\\%$", "$+50\\,\\%$", "$+0{,}5\\,\\%$", "environ $+16{,}7\\,\\%$"], bonne: 0, explication: "$t = \\dfrac{3 - 2{,}5}{2{,}5} = \\dfrac{0{,}5}{2{,}5} = 0{,}2 = +20\\,\\%$. En divisant par $3$ (la valeur d'arrivée), on trouverait à tort environ $16{,}7\\,\\%$." },
    { question: "D'après le schéma, quel est le prix après la baisse ?", figure: "am-qcm-baisse", choix: ["$42$ €", "$30$ €", "$18$ €", "$78$ €"], bonne: 0, explication: "Baisser de $30\\,\\%$, c'est multiplier par $0{,}7$ : $60 \\times 0{,}7 = 42$ €. ($18$ € est le montant de la baisse, $30$ € vient du calcul faux $60 - 30$.)" }
  ],

  methode: [
    {
      titre: "Résoudre un problème d'évolution",
      etapes: [
        "Traduis chaque pourcentage en coefficient multiplicateur.",
        "Valeur finale inconnue : multiplie. Valeur initiale inconnue : divise.",
        "Plusieurs évolutions : multiplie les coefficients.",
        "Reviens au pourcentage à la fin : $t = CM - 1$."
      ],
      figure: "am-meth-evolution",
      exemple: "$+5\\,\\%$ puis $-8\\,\\%$ : $1{,}05 \\times 0{,}92 = 0{,}966$, soit $-3{,}4\\,\\%$."
    },
    {
      titre: "Lire un coefficient multiplicateur",
      etapes: [
        "$CM > 1$ : hausse de $(CM - 1) \\times 100\\,\\%$.",
        "$CM < 1$ : baisse de $(1 - CM) \\times 100\\,\\%$.",
        "$CM = 2$ : hausse de $100\\,\\%$ (la valeur double). $CM = 0{,}5$ : baisse de $50\\,\\%$."
      ],
      exemple: "$CM = 1{,}35$ : hausse de $35\\,\\%$. $CM = 0{,}94$ : baisse de $6\\,\\%$."
    }
  ],
  erreurs: [
    "Diminuer de $20\\,\\%$, c'est multiplier par $0{,}8$, pas par $0{,}2$.",
    "Le taux d'évolution se calcule en divisant par la valeur **de départ**.",
    "Les pourcentages successifs ne s'additionnent pas : on multiplie les coefficients.",
    "Une baisse de $20\\,\\%$ ne se compense pas par une hausse de $20\\,\\%$.",
    "Pour retrouver une valeur initiale, on divise par le coefficient, on ne retire pas le pourcentage au prix final."
  ]
};
