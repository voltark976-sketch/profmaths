/*
  CHAPITRE : Première tronc commun — Automatismes : évolutions et pourcentages
  ---------------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme de mathématiques intégré à l'enseignement scientifique de Première générale (BO n° 14 du 2 avril 2026),
  partie « Automatismes », bloc « Évolutions et variations » : appliquer un taux (valeur finale ou initiale), calculer un
  taux et l'exprimer en pourcentage, taux équivalent à des évolutions successives, taux réciproque ; rappels de Seconde
  (proportion, proportion de proportion, points de pourcentage).
  video : vidéos de la chaîne et d'Yvan Monka. Générateurs : préfixe qv- dans assets/exercices-tronc.js ; figures "qv-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["tronc-evolutions"] = {
  niveau: "Première tronc commun",
  numero: 1,
  titre: "Automatismes : évolutions et pourcentages",
  accroche: "Hausses, baisses, évolutions successives et retour en arrière : tout passe par le **coefficient multiplicateur** $1 + \\dfrac{t}{100}$.",

  playlist: "",
  drive: "",
  pdfs: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Rappel : proportion et pourcentage",
      video: { titre: "Vidéo d'Yvan Monka : passer d'un effectif à une proportion", youtube: "https://youtu.be/r8S46rk9x9k" },
      texte:
        "La **proportion** d'une partie dans un ensemble est $p = \\dfrac{\\text{effectif de la partie}}{\\text{effectif total}}$, un nombre entre $0$ et $1$ qu'on écrit souvent en pourcentage : $p = 0{,}35 = \\dfrac{35}{100} = 35\\,\\%$.\n\n" +
        "- Prendre $t\\,\\%$ d'une quantité : multiplier par $\\dfrac{t}{100}$. Ainsi $35\\,\\%$ de $240$ font $240 \\times 0{,}35 = 84$.\n" +
        "- **Proportion de proportion** : si $40\\,\\%$ des élèves sont en Première et que $30\\,\\%$ d'entre eux font de l'espagnol, les hispanisants de Première représentent $0{,}4 \\times 0{,}3 = 0{,}12 = 12\\,\\%$ de tous les élèves.",
      exemple: {
        enonce: "Sur $1\\,250$ habitants, $450$ ont moins de $20$ ans. Quel pourcentage cela représente-t-il ?",
        solution: "$\\dfrac{450}{1\\,250} = 0{,}36 = 36\\,\\%$."
      }
    },
    {
      titre: "Taux d'évolution et coefficient multiplicateur",
      figure: "qv-cours-cm",
      video: { titre: "Vidéo de ton prof : pourcentages et coefficients multiplicateurs", youtube: "https://youtu.be/DWf_35WEQuI" },
      texte:
        "Quand une grandeur passe d'une valeur $V_0$ à une valeur $V_1$ :\n\n" +
        "- la **variation absolue** est $V_1 - V_0$ ;\n" +
        "- le **taux d'évolution** est $t = \\dfrac{V_1 - V_0}{V_0}$, souvent écrit en pourcentage. Il est positif pour une hausse, négatif pour une baisse ;\n" +
        "- le **coefficient multiplicateur** est $CM = \\dfrac{V_1}{V_0} = 1 + \\dfrac{t}{100}$ (avec $t$ en pourcentage).\n\n" +
        "Augmenter de $t\\,\\%$, c'est **multiplier** par $1 + \\dfrac{t}{100}$ ; diminuer de $t\\,\\%$, c'est multiplier par $1 - \\dfrac{t}{100}$. Hausse de $8\\,\\%$ : $\\times 1{,}08$. Baisse de $15\\,\\%$ : $\\times 0{,}85$.",
      exemple: {
        enonce: "Un loyer passe de $650$ € à $689$ €. Quel est le taux d'évolution ?",
        solution: "$\\dfrac{689 - 650}{650} = \\dfrac{39}{650} = 0{,}06$ : une hausse de $6\\,\\%$ (coefficient $1{,}06$)."
      }
    },
    {
      titre: "Valeur finale, valeur initiale",
      video: { titre: "Vidéo de ton prof : calculer avec des proportions et des évolutions", youtube: "https://youtu.be/WwLJCEUa2t4" },
      texte:
        "$V_1 = V_0 \\times CM$. On en déduit les deux calculs :\n\n" +
        "- **valeur finale** connaissant la valeur initiale : $V_1 = V_0 \\times CM$ ;\n" +
        "- **valeur initiale** connaissant la valeur finale : $V_0 = \\dfrac{V_1}{CM}$ (on **divise**, on ne retire pas le pourcentage).\n\n" +
        "Erreur classique : après une hausse de $20\\,\\%$, un prix de $60$ € ne valait pas $60 - 20\\,\\% \\times 60 = 48$ € avant, mais $\\dfrac{60}{1{,}2} = 50$ €.",
      exemple: {
        enonce: "Après une baisse de $30\\,\\%$, un téléphone coûte $224$ €. Quel était son prix avant la baisse ?",
        solution: "Coefficient $0{,}7$. Prix initial : $\\dfrac{224}{0{,}7} = 320$ €. Vérification : $320 \\times 0{,}7 = 224$."
      }
    },
    {
      titre: "Évolutions successives",
      figure: "qv-cours-successives",
      video: { titre: "Vidéo de ton prof : raisonner sur les évolutions successives", youtube: "https://youtu.be/xb81PxfmSWQ" },
      texte:
        "Quand une grandeur subit plusieurs évolutions de coefficients $CM_1$, $CM_2$…, le coefficient global est le **produit** : $CM = CM_1 \\times CM_2 \\times \\dots$\n\n" +
        "Le taux global vaut alors $(CM - 1) \\times 100$. **Les taux ne s'additionnent jamais.** Une hausse de $20\\,\\%$ suivie d'une baisse de $25\\,\\%$ : $1{,}2 \\times 0{,}75 = 0{,}9$, soit une baisse de $10\\,\\%$ (et non de $5\\,\\%$).\n\n" +
        "Cas particulier : $n$ évolutions identiques de taux $t$ donnent un coefficient $\\left(1 + \\dfrac{t}{100}\\right)^n$. C'est le lien avec les suites géométriques (chapitre 12) et le taux moyen (chapitre 13).",
      exemple: {
        enonce: "Un prix augmente de $10\\,\\%$ deux années de suite. Quel est le taux global ?",
        solution: "$1{,}1 \\times 1{,}1 = 1{,}21$ : hausse de $21\\,\\%$, pas de $20\\,\\%$."
      }
    },
    {
      titre: "Taux d'évolution réciproque",
      video: { titre: "Vidéo d'Yvan Monka : calculer un taux d'évolution réciproque", youtube: "https://youtu.be/vv-yPWr4T54" },
      texte:
        "Le **taux réciproque** est celui de l'évolution qui ramène à la valeur de départ. Son coefficient est l'**inverse** : $CM' = \\dfrac{1}{CM}$.\n\n" +
        "Après une hausse de $25\\,\\%$ ($CM = 1{,}25$), on revient au départ avec $CM' = \\dfrac{1}{1{,}25} = 0{,}8$, soit une **baisse de $20\\,\\%$**, et non de $25\\,\\%$.\n\n" +
        "Après une baisse de $50\\,\\%$ ($CM = 0{,}5$), il faut une **hausse de $100\\,\\%$** ($CM' = 2$) pour revenir au départ.",
      exemple: {
        enonce: "Un prix a baissé de $20\\,\\%$. De quel pourcentage doit-il augmenter pour retrouver sa valeur initiale ?",
        solution: "$CM = 0{,}8$, $CM' = \\dfrac{1}{0{,}8} = 1{,}25$ : une hausse de $25\\,\\%$."
      }
    },
    {
      titre: "Points de pourcentage ou pourcentage ?",
      video: { titre: "Vidéo de ton prof : proportions et points de pourcentage", youtube: "https://youtu.be/brXtcTsDP8M" },
      texte:
        "Quand la grandeur est elle-même un pourcentage (taux de chômage, taux de réussite), deux lectures sont possibles. Si le taux de réussite passe de $80\\,\\%$ à $84\\,\\%$ :\n\n" +
        "- il a augmenté de $4$ **points** de pourcentage (différence $84 - 80$) ;\n" +
        "- son taux d'évolution est $\\dfrac{84 - 80}{80} = 5\\,\\%$.\n\n" +
        "Dire « il a augmenté de $4\\,\\%$ » serait faux. Attention aux titres de presse !"
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "qv-proportion", titre: "Proportion et pourcentage", etape: "Rappels", nb: 5 },
    { type: "qv-coefficient", titre: "Taux et coefficient multiplicateur", etape: "Évolutions", nb: 5 },
    { type: "qv-appliquer", titre: "Appliquer un taux d'évolution", etape: "Évolutions", nb: 5 },
    { type: "qv-initiale", titre: "Retrouver la valeur initiale", etape: "Évolutions", nb: 5 },
    { type: "qv-taux", titre: "Calculer un taux d'évolution", etape: "Évolutions", nb: 5 },
    { type: "qv-successives", titre: "Évolutions successives", etape: "Composer", nb: 5 },
    { type: "qv-reciproque", titre: "Taux réciproque", etape: "Composer", nb: 5 },
    { type: "qv-points", titre: "Points de pourcentage ou pourcentage ?", etape: "Composer", nb: 4 },
    { type: "qv-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Augmenter une valeur de $15\\,\\%$, c'est la multiplier par :", choix: ["$1{,}15$", "$0{,}15$", "$1{,}5$", "$0{,}85$"], bonne: 0, explication: "$1 + \\dfrac{15}{100} = 1{,}15$." },
    { question: "Diminuer une valeur de $40\\,\\%$, c'est la multiplier par :", choix: ["$0{,}6$", "$0{,}4$", "$1{,}4$", "$0{,}96$"], bonne: 0, explication: "$1 - \\dfrac{40}{100} = 0{,}6$." },
    { question: "Un coefficient multiplicateur de $1{,}3$ correspond à :", choix: ["une hausse de $30\\,\\%$", "une hausse de $13\\,\\%$", "une baisse de $30\\,\\%$", "une hausse de $130\\,\\%$"], bonne: 0, explication: "$(1{,}3 - 1) \\times 100 = 30$." },
    { question: "Un coefficient multiplicateur de $0{,}75$ correspond à :", choix: ["une baisse de $25\\,\\%$", "une baisse de $75\\,\\%$", "une hausse de $75\\,\\%$", "une baisse de $0{,}75\\,\\%$"], bonne: 0, explication: "$0{,}75 - 1 = -0{,}25$." },
    { question: "Un prix de $80$ € augmente de $5\\,\\%$. Il devient :", choix: ["$84$ €", "$85$ €", "$76$ €", "$120$ €"], bonne: 0, explication: "$80 \\times 1{,}05 = 84$." },
    { question: "Un prix de $150$ € baisse de $20\\,\\%$. Il devient :", choix: ["$120$ €", "$130$ €", "$180$ €", "$30$ €"], bonne: 0, explication: "$150 \\times 0{,}8 = 120$." },
    { question: "Un prix passe de $50$ € à $60$ €. Le taux d'évolution est :", choix: ["$+20\\,\\%$", "$+10\\,\\%$", "$+16{,}7\\,\\%$", "$+60\\,\\%$"], bonne: 0, explication: "$\\dfrac{60 - 50}{50} = 0{,}2$." },
    { question: "Une population passe de $2\\,000$ à $1\\,700$ habitants. Le taux d'évolution est :", choix: ["$-15\\,\\%$", "$-30\\,\\%$", "$-300\\,\\%$", "$+15\\,\\%$"], bonne: 0, explication: "$\\dfrac{1\\,700 - 2\\,000}{2\\,000} = -0{,}15$." },
    { question: "Après une hausse de $25\\,\\%$, un article coûte $100$ €. Avant, il coûtait :", choix: ["$80$ €", "$75$ €", "$125$ €", "$95$ €"], bonne: 0, explication: "$\\dfrac{100}{1{,}25} = 80$. Retirer $25\\,\\%$ de $100$ donnerait $75$, ce qui est faux." },
    { question: "Après une baisse de $10\\,\\%$, un loyer est de $540$ €. Il était de :", choix: ["$600$ €", "$594$ €", "$486$ €", "$550$ €"], bonne: 0, explication: "$\\dfrac{540}{0{,}9} = 600$." },
    { question: "Une hausse de $10\\,\\%$ suivie d'une hausse de $20\\,\\%$ équivaut à :", choix: ["une hausse de $32\\,\\%$", "une hausse de $30\\,\\%$", "une hausse de $200\\,\\%$", "une hausse de $12\\,\\%$"], bonne: 0, explication: "$1{,}1 \\times 1{,}2 = 1{,}32$." },
    { question: "Une hausse de $50\\,\\%$ suivie d'une baisse de $50\\,\\%$ équivaut à :", choix: ["une baisse de $25\\,\\%$", "aucune évolution", "une hausse de $25\\,\\%$", "une baisse de $50\\,\\%$"], bonne: 0, explication: "$1{,}5 \\times 0{,}5 = 0{,}75$." },
    { question: "Deux baisses successives de $20\\,\\%$ équivalent à :", choix: ["une baisse de $36\\,\\%$", "une baisse de $40\\,\\%$", "une baisse de $64\\,\\%$", "une baisse de $20\\,\\%$"], bonne: 0, explication: "$0{,}8 \\times 0{,}8 = 0{,}64$ : il reste $64\\,\\%$, baisse de $36\\,\\%$." },
    { question: "Trois hausses successives de $10\\,\\%$ ont pour coefficient global :", choix: ["$1{,}1^3 = 1{,}331$", "$1{,}3$", "$3{,}3$", "$1{,}1 \\times 3$"], bonne: 0, explication: "On multiplie trois fois par $1{,}1$." },
    { question: "Le taux réciproque d'une hausse de $25\\,\\%$ est :", choix: ["une baisse de $20\\,\\%$", "une baisse de $25\\,\\%$", "une baisse de $75\\,\\%$", "une hausse de $20\\,\\%$"], bonne: 0, explication: "$\\dfrac{1}{1{,}25} = 0{,}8$." },
    { question: "Le taux réciproque d'une baisse de $50\\,\\%$ est :", choix: ["une hausse de $100\\,\\%$", "une hausse de $50\\,\\%$", "une hausse de $200\\,\\%$", "une hausse de $150\\,\\%$"], bonne: 0, explication: "$\\dfrac{1}{0{,}5} = 2$ : il faut doubler." },
    { question: "Après une hausse de $10\\,\\%$, pour revenir au prix initial il faut baisser :", choix: ["d'environ $9{,}1\\,\\%$", "de $10\\,\\%$", "de $11\\,\\%$", "de $1\\,\\%$"], bonne: 0, explication: "$\\dfrac{1}{1{,}1} \\approx 0{,}909$ : baisse d'environ $9{,}1\\,\\%$." },
    { question: "Un taux de réussite passe de $70\\,\\%$ à $77\\,\\%$. Il a augmenté :", choix: ["de $7$ points, soit $10\\,\\%$", "de $7\\,\\%$", "de $77\\,\\%$", "de $7$ points, soit $7\\,\\%$"], bonne: 0, explication: "Différence $7$ points ; taux $\\dfrac{7}{70} = 10\\,\\%$." },
    { question: "$30\\,\\%$ des élèves sont internes et $50\\,\\%$ des internes sont en Première. Les internes de Première représentent :", choix: ["$15\\,\\%$ des élèves", "$80\\,\\%$ des élèves", "$20\\,\\%$ des élèves", "$60\\,\\%$ des élèves"], bonne: 0, explication: "$0{,}3 \\times 0{,}5 = 0{,}15$." },
    { question: "Sur $400$ personnes, $60$ sont végétariennes. Cela représente :", choix: ["$15\\,\\%$", "$6{,}7\\,\\%$", "$60\\,\\%$", "$25\\,\\%$"], bonne: 0, explication: "$\\dfrac{60}{400} = 0{,}15$." },
    { question: "Une quantité multipliée par $2{,}5$ a augmenté de :", choix: ["$150\\,\\%$", "$250\\,\\%$", "$25\\,\\%$", "$2{,}5\\,\\%$"], bonne: 0, explication: "$(2{,}5 - 1) \\times 100 = 150$." },
    { question: "Un prix de $45$ € augmente de $100\\,\\%$. Il devient :", choix: ["$90$ €", "$145$ €", "$45{,}1$ €", "$450$ €"], bonne: 0, explication: "Hausse de $100\\,\\%$ : coefficient $2$, le prix double." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Appliquer une évolution",
      figure: "qv-cours-cm",
      etapes: [
        "Écrire le coefficient multiplicateur : $CM = 1 + \\dfrac{t}{100}$ (hausse) ou $1 - \\dfrac{t}{100}$ (baisse).",
        "Valeur finale : $V_1 = V_0 \\times CM$.",
        "Valeur initiale : $V_0 = \\dfrac{V_1}{CM}$.",
        "Vérifier l'ordre de grandeur : une hausse donne plus, une baisse donne moins."
      ],
      exemple: "Baisse de $12\\,\\%$ sur $250$ € : $250 \\times 0{,}88 = 220$ €. Si $220$ € est le prix après la baisse, avant c'était $\\dfrac{220}{0{,}88} = 250$ €."
    },
    {
      titre: "Calculer un taux d'évolution",
      etapes: [
        "Repérer la valeur de départ $V_0$ et la valeur d'arrivée $V_1$.",
        "Calculer $\\dfrac{V_1 - V_0}{V_0}$ (ou $CM = \\dfrac{V_1}{V_0}$ puis $CM - 1$).",
        "Multiplier par $100$ et mettre le signe : $+$ pour une hausse, $-$ pour une baisse.",
        "Arrondir seulement si l'énoncé le demande."
      ],
      exemple: "De $320$ à $368$ : $\\dfrac{368 - 320}{320} = 0{,}15$, soit $+15\\,\\%$."
    },
    {
      titre: "Composer des évolutions",
      figure: "qv-cours-successives",
      etapes: [
        "Écrire le coefficient de chaque évolution.",
        "Multiplier tous les coefficients : c'est le coefficient global.",
        "Taux global $= (CM_{\\text{global}} - 1) \\times 100$.",
        "Ne jamais additionner les pourcentages."
      ],
      exemple: "$+30\\,\\%$ puis $-30\\,\\%$ : $1{,}3 \\times 0{,}7 = 0{,}91$, soit $-9\\,\\%$."
    },
    {
      titre: "Taux réciproque",
      etapes: [
        "Écrire le coefficient $CM$ de l'évolution subie.",
        "Le coefficient réciproque est $CM' = \\dfrac{1}{CM}$.",
        "Taux réciproque $= (CM' - 1) \\times 100$ : signe opposé, valeur différente.",
        "Vérifier : $CM \\times CM' = 1$."
      ],
      exemple: "Hausse de $60\\,\\%$ : $CM = 1{,}6$, $CM' = \\dfrac{1}{1{,}6} = 0{,}625$, baisse de $37{,}5\\,\\%$."
    }
  ],
  erreurs: [
    "Additionner des pourcentages successifs : $+20\\,\\%$ puis $+20\\,\\%$ font $+44\\,\\%$, pas $+40\\,\\%$.",
    "Retrouver la valeur initiale en retirant le pourcentage de la valeur finale : il faut diviser par le coefficient.",
    "Croire qu'une hausse de $t\\,\\%$ s'annule par une baisse de $t\\,\\%$.",
    "Diviser par la valeur d'arrivée au lieu de la valeur de départ dans un taux d'évolution.",
    "Oublier le $1$ dans le coefficient : une hausse de $8\\,\\%$ multiplie par $1{,}08$, pas par $0{,}08$.",
    "Confondre une variation en points et un taux d'évolution quand la grandeur est un pourcentage.",
    "Oublier le signe négatif d'une baisse."
  ]
};
