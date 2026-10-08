/*
  CHAPITRE : Terminale maths complémentaires — Probabilités conditionnelles et inférence bayésienne
  -------------------------------------------------------------------------------------------------
  Chapitre 5 de la progression spiralée 2026-2027 (programme de maths complémentaires de 2019).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Vidéos d'Yvan Monka (probabilités conditionnelles, Première/Terminale).
  Figures : "tcb-dengue", "tcb-vpp". Générateurs : tcb- (et pi-totales, pi-inverser de Première).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-inference-bayesienne"] = {
  niveau: "Terminale maths complémentaires",
  numero: 5,
  titre: "Probabilités conditionnelles et inférence bayésienne",
  accroche: "Mon test est positif : suis-je malade ? Arbres, formule de Bayes, sensibilité, spécificité et valeurs prédictives, avec le dépistage de la dengue à Mayotte.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur les probabilités conditionnelles en vidéo (Yvan Monka)", url: "https://youtu.be/5oBnmZVrOXE", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Rappels : probabilité conditionnelle et arbre",
      figure: "tcb-dengue",
      video: { titre: "Vidéo d'Yvan Monka : calculer une probabilité conditionnelle (formule)", youtube: "https://youtu.be/SWmkdKxXf_I" },
      texte:
        "La probabilité de $B$ **sachant** $A$ (avec $P(A) \\neq 0$) est $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ : on se restreint aux issues où $A$ est réalisé.\n\n" +
        "Sur un **arbre pondéré** :\n\n" +
        "- les branches du deuxième niveau portent des probabilités conditionnelles ;\n" +
        "- la probabilité d'un chemin est le **produit** des probabilités : $P(A \\cap B) = P(A) \\times P_A(B)$ ;\n" +
        "- la somme des branches issues d'un même nœud vaut $1$.\n\n" +
        "Sur la figure : $M$ « la personne a la dengue », $T$ « le test est positif ».",
      exemple: {
        enonce: "Avec l'arbre de la figure, calcule $P(M \\cap T)$ et $P(\\overline{M} \\cap T)$.",
        solution: "$P(M \\cap T) = 0{,}05 \\times 0{,}9 = 0{,}045$.\n\n$P(\\overline{M} \\cap T) = 0{,}95 \\times 0{,}05 = 0{,}0475$."
      }
    },
    {
      titre: "Probabilités totales et inversion : la formule de Bayes",
      video: { titre: "Vidéo d'Yvan Monka : appliquer la formule des probabilités totales", youtube: "https://youtu.be/qTpTBoZA7zY" },
      texte:
        "**Probabilités totales** : $P(B) = P(A \\cap B) + P(\\overline{A} \\cap B) = P(A)P_A(B) + P(\\overline{A})P_{\\overline{A}}(B)$ (plus généralement, on additionne sur une partition).\n\n" +
        "**Formule de Bayes** : pour « remonter » l'arbre,\n\n" +
        "$P_B(A) = \\dfrac{P(A) \\times P_A(B)}{P(B)}$.\n\n" +
        "Attention : en général $P_A(B) \\neq P_B(A)$. « $95\\,\\%$ des malades ont un test positif » ne veut pas dire « $95\\,\\%$ des tests positifs viennent de malades ».",
      exemple: {
        enonce: "Avec l'arbre de la dengue, calcule $P(T)$, puis $P_T(M)$.",
        solution: "$P(T) = 0{,}045 + 0{,}0475 = 0{,}0925$.\n\n$P_T(M) = \\dfrac{0{,}045}{0{,}0925} \\approx 0{,}49$ : moins d'une chance sur deux d'avoir la dengue avec un test positif !"
      }
    },
    {
      titre: "Probabilité a priori, probabilité a posteriori",
      texte:
        "- La probabilité **a priori** $P(A)$ est ce que l'on sait **avant** l'observation (ici, la prévalence : $5\\,\\%$ de malades).\n" +
        "- La probabilité **a posteriori** $P_B(A)$ est la probabilité de $A$ **après** avoir appris que $B$ est réalisé.\n\n" +
        "L'**inférence bayésienne** consiste à mettre à jour une probabilité grâce à une information : avec un test positif, la probabilité d'être malade passe de $0{,}05$ à environ $0{,}49$.\n\n" +
        "On peut recommencer : un deuxième test positif (indépendant) part de la nouvelle probabilité $0{,}49$ comme probabilité a priori.",
      exemple: {
        enonce: "Un deuxième test indépendant est positif. Avec l'a priori $0{,}49$, que devient la probabilité d'être malade ?",
        solution: "$P = \\dfrac{0{,}49 \\times 0{,}9}{0{,}49 \\times 0{,}9 + 0{,}51 \\times 0{,}05} = \\dfrac{0{,}441}{0{,}4665} \\approx 0{,}95$. Deux tests positifs rendent le diagnostic presque sûr."
      }
    },
    {
      titre: "Sensibilité, spécificité, valeurs prédictives",
      texte:
        "Pour un test de dépistage ($M$ : malade, $T$ : test positif) :\n\n" +
        "- **sensibilité** $= P_M(T)$ : parmi les malades, la part de tests positifs ;\n" +
        "- **spécificité** $= P_{\\overline{M}}(\\overline{T})$ : parmi les personnes saines, la part de tests négatifs ;\n" +
        "- **valeur prédictive positive** (VPP) $= P_T(M)$ : parmi les tests positifs, la part de vrais malades ;\n" +
        "- **valeur prédictive négative** (VPN) $= P_{\\overline{T}}(\\overline{M})$ : parmi les tests négatifs, la part de personnes vraiment saines.\n\n" +
        "Le laboratoire mesure la sensibilité et la spécificité ; le patient s'intéresse aux valeurs prédictives, qu'on obtient avec la formule de Bayes.",
      exemple: {
        enonce: "Pour le test de la dengue (prévalence $0{,}05$, sensibilité $0{,}9$, spécificité $0{,}95$), calcule la VPN.",
        solution: "$P(\\overline{T}) = 1 - 0{,}0925 = 0{,}9075$ et $P(\\overline{M} \\cap \\overline{T}) = 0{,}95 \\times 0{,}95 = 0{,}9025$.\n\nVPN $= \\dfrac{0{,}9025}{0{,}9075} \\approx 0{,}994$ : un test négatif est très rassurant."
      }
    },
    {
      titre: "La valeur prédictive dépend de la prévalence",
      figure: "tcb-vpp",
      texte:
        "Pour un test de sensibilité $s$ et de spécificité $e$, en notant $p$ la prévalence :\n\n" +
        "$f(p) = P_T(M) = \\dfrac{sp}{sp + (1 - e)(1 - p)}$.\n\n" +
        "Avec $s = 0{,}9$ et $e = 0{,}95$ : $f(p) = \\dfrac{0{,}9p}{0{,}85p + 0{,}05}$ et $f'(p) = \\dfrac{0{,}9 \\times 0{,}05}{(0{,}85p + 0{,}05)^2} > 0$.\n\n" +
        "La VPP est **croissante** : quand la maladie est rare, la plupart des tests positifs sont des faux positifs. C'est pourquoi on dépiste en priorité les personnes à risque (prévalence plus forte), par exemple pendant une épidémie de dengue.",
      exemple: {
        enonce: "À partir de quelle prévalence la VPP de ce test dépasse-t-elle $0{,}5$ ?",
        solution: "$f(p) \\geqslant 0{,}5 \\iff 0{,}9p \\geqslant 0{,}05(1 - p) \\iff 0{,}95p \\geqslant 0{,}05 \\iff p \\geqslant \\dfrac{1}{19} \\approx 0{,}053$."
      }
    },
    {
      titre: "Logique : une implication et sa réciproque",
      texte:
        "« Si une personne est malade, son test est (presque toujours) positif » et « si le test est positif, la personne est (presque toujours) malade » sont une implication et sa **réciproque** : l'une peut être vraie sans l'autre.\n\n" +
        "En probabilités, c'est la différence entre $P_M(T)$ (sensibilité, $0{,}9$) et $P_T(M)$ (VPP, environ $0{,}49$).\n\n" +
        "Même raisonnement au tribunal ou en météo : « s'il pleut, le match est souvent annulé » ne veut pas dire « si le match est annulé, il a sûrement plu ».",
      exemple: {
        enonce: "$P(A) = 0{,}2$, $P_A(B) = 0{,}6$ et $P_{\\overline{A}}(B) = 0{,}05$. Compare $P_A(B)$ et $P_B(A)$.",
        solution: "$P(B) = 0{,}12 + 0{,}04 = 0{,}16$ et $P_B(A) = \\dfrac{0{,}12}{0{,}16} = 0{,}75$. Ici $P_A(B) = 0{,}6$ et $P_B(A) = 0{,}75$ : deux nombres différents."
      }
    },
    {
      titre: "Python : une fonction qui renvoie la VPP",
      texte:
        "```python\ndef vpp(p, s, e):\n    vrais = p * s\n    faux = (1 - p) * (1 - e)\n    return vrais / (vrais + faux)\n```\n\n" +
        "vpp(0.05, 0.9, 0.95) renvoie environ $0{,}486$. Une boucle permet d'afficher la VPP pour plusieurs prévalences et de retrouver la courbe du cours :\n\n" +
        "```python\nfor p in [0.01, 0.05, 0.1, 0.3, 0.5]:\n    print(p, round(vpp(p, 0.9, 0.95), 3))\n```",
      exemple: {
        enonce: "Que renvoie vpp(0.5, 0.9, 0.95) ?",
        solution: "vrais $= 0{,}45$, faux $= 0{,}025$ : $\\dfrac{0{,}45}{0{,}475} \\approx 0{,}947$."
      }
    }
  ],

  videos: [
    { titre: "Construire un arbre pondéré", type: "Arbre", youtube: "https://youtu.be/Pc5kJBkPDbo" },
    { titre: "Compléter un arbre pondéré", type: "Arbre", youtube: "https://youtu.be/o1HQ6xJ7o4U" },
    { titre: "Démontrer l'indépendance entre deux événements", type: "Indépendance", youtube: "https://youtu.be/wdiMq_lTk1w" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "pi-totales", titre: "Probabilités totales", etape: "Arbres", nb: 4 },
    { type: "pi-inverser", titre: "Inverser le conditionnement", etape: "Arbres", nb: 4 },
    { type: "tcb-bayes", titre: "A priori, a posteriori : formule de Bayes", etape: "Inférence bayésienne", nb: 4 },
    { type: "tcb-vocabulaire", titre: "Sensibilité, spécificité, valeurs prédictives", etape: "Dépistage", nb: 5 },
    { type: "tcb-depistage", titre: "Dépistage de la dengue ou de la leptospirose", etape: "Dépistage", nb: 5 },
    { type: "tcb-prevalence", titre: "La VPP en fonction de la prévalence", etape: "Dépistage", nb: 4 },
    { type: "tcb-logique", titre: "P(A sachant B) ou P(B sachant A) ?", etape: "Raisonner", nb: 5 },
    { type: "tcb-python", titre: "Python : la fonction vpp", etape: "Raisonner", nb: 3 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$P_A(B) =$", choix: ["$\\dfrac{P(A \\cap B)}{P(A)}$", "$\\dfrac{P(A \\cap B)}{P(B)}$", "$P(A) \\times P(B)$", "$\\dfrac{P(A)}{P(B)}$"], bonne: 0, explication: "On divise par la probabilité de ce que l'on sait." },
    { question: "Sur un arbre, la probabilité d'un chemin est :", choix: ["le produit des probabilités des branches", "la somme des probabilités des branches", "la plus grande probabilité", "toujours $0{,}5$"], bonne: 0, explication: "$P(A \\cap B) = P(A) \\times P_A(B)$." },
    { question: "$P(A) = 0{,}4$, $P_A(B) = 0{,}5$, $P_{\\overline{A}}(B) = 0{,}2$. $P(B) =$", choix: ["$0{,}32$", "$0{,}7$", "$0{,}2$", "$0{,}5$"], bonne: 0, explication: "$0{,}4 \\times 0{,}5 + 0{,}6 \\times 0{,}2 = 0{,}2 + 0{,}12$." },
    { question: "Avec les mêmes données, $P_B(A) =$", choix: ["$0{,}625$", "$0{,}5$", "$0{,}4$", "$0{,}2$"], bonne: 0, explication: "$\\dfrac{0{,}2}{0{,}32} = 0{,}625$." },
    { question: "La formule de Bayes permet de calculer :", choix: ["$P_B(A)$ à partir de $P_A(B)$", "$P(A \\cap B)$ sans arbre", "$P(A) + P(B)$", "la variance"], bonne: 0, explication: "Elle « inverse » le conditionnement." },
    { question: "En général :", choix: ["$P_A(B) \\neq P_B(A)$", "$P_A(B) = P_B(A)$", "$P_A(B) = 1 - P_B(A)$", "$P_A(B) = P(A)$"], bonne: 0, explication: "L'égalité n'a lieu que dans des cas particuliers." },
    { question: "La sensibilité d'un test est :", choix: ["$P_M(T)$", "$P_T(M)$", "$P_{\\overline{M}}(\\overline{T})$", "$P(M)$"], bonne: 0, explication: "Parmi les malades, la part de tests positifs." },
    { question: "La spécificité d'un test est :", choix: ["$P_{\\overline{M}}(\\overline{T})$", "$P_{\\overline{T}}(\\overline{M})$", "$P_M(T)$", "$P(\\overline{M})$"], bonne: 0, explication: "Parmi les personnes saines, la part de tests négatifs." },
    { question: "La valeur prédictive positive est :", choix: ["$P_T(M)$", "$P_M(T)$", "$P(T)$", "$P(M \\cap T)$"], bonne: 0, explication: "Parmi les tests positifs, la part de vrais malades." },
    { question: "La prévalence d'une maladie est :", choix: ["la proportion de malades dans la population", "la proportion de tests positifs", "la sensibilité", "la VPP"], bonne: 0, explication: "C'est la probabilité a priori $P(M)$." },
    { question: "Un faux positif est une personne :", choix: ["saine dont le test est positif", "malade dont le test est négatif", "malade dont le test est positif", "saine dont le test est négatif"], bonne: 0, explication: "Le test se « trompe » en annonçant la maladie." },
    { question: "Si la spécificité vaut $0{,}95$, la probabilité d'un faux positif parmi les personnes saines vaut :", choix: ["$0{,}05$", "$0{,}95$", "$0{,}5$", "on ne peut pas savoir"], bonne: 0, explication: "$P_{\\overline{M}}(T) = 1 - 0{,}95$." },
    { question: "Pour une maladie rare, un test positif :", choix: ["peut être souvent un faux positif", "est toujours un vrai positif", "prouve la maladie", "est impossible"], bonne: 0, explication: "La VPP est faible quand la prévalence est faible." },
    { question: "Quand la prévalence augmente (test fixé), la VPP :", choix: ["augmente", "diminue", "reste constante", "vaut la sensibilité"], bonne: 0, explication: "La VPP est une fonction croissante de la prévalence." },
    { question: "La probabilité a priori est celle connue :", choix: ["avant l'observation", "après l'observation", "après deux tests", "seulement si le test est négatif"], bonne: 0, explication: "« A priori » : avant." },
    { question: "La probabilité a posteriori de $A$ sachant $B$ s'écrit :", choix: ["$P_B(A)$", "$P_A(B)$", "$P(A)$", "$P(A \\cap B)$"], bonne: 0, explication: "On a appris que $B$ est réalisé." },
    { question: "$P_A(B) + P_A(\\overline{B}) =$", choix: ["$1$", "$0$", "$P(A)$", "$P(B)$"], bonne: 0, explication: "Les deux branches issues de $A$." },
    { question: "$A$ et $B$ indépendants, $P(A) \\neq 0$. Alors $P_A(B) =$", choix: ["$P(B)$", "$P(A)$", "$0$", "$1$"], bonne: 0, explication: "Savoir $A$ ne change pas la probabilité de $B$." },
    { question: "« $90\\,\\%$ des malades ont un test positif » traduit :", choix: ["$P_M(T) = 0{,}9$", "$P_T(M) = 0{,}9$", "$P(M \\cap T) = 0{,}9$", "$P(T) = 0{,}9$"], bonne: 0, explication: "La population de référence est celle des malades." },
    { question: "« $90\\,\\%$ des tests positifs viennent de malades » traduit :", choix: ["$P_T(M) = 0{,}9$", "$P_M(T) = 0{,}9$", "$P(M) = 0{,}9$", "$P_{\\overline{T}}(M) = 0{,}9$"], bonne: 0, explication: "La population de référence est celle des tests positifs." },
    { question: "Dans la fonction vpp(p, s, e) du cours, la variable faux vaut :", choix: ["$(1 - p)(1 - e)$", "$p(1 - s)$", "$(1 - p)e$", "$ps$"], bonne: 0, explication: "Personnes saines dont le test est positif." },
    { question: "Prévalence $0{,}5$, sensibilité $0{,}9$, spécificité $0{,}9$. La VPP vaut :", choix: ["$0{,}9$", "$0{,}5$", "$0{,}81$", "$0{,}45$"], bonne: 0, explication: "$\\dfrac{0{,}45}{0{,}45 + 0{,}05} = 0{,}9$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Inverser un conditionnement (Bayes)",
      etapes: ["Construire l'arbre avec $P(A)$, $P_A(B)$, $P_{\\overline{A}}(B)$.", "Calculer $P(B)$ par les probabilités totales.", "Conclure : $P_B(A) = \\dfrac{P(A) \\times P_A(B)}{P(B)}$."],
      exemple: "$P(A) = 0{,}2$, $P_A(B) = 0{,}6$, $P_{\\overline{A}}(B) = 0{,}05$ : $P(B) = 0{,}16$, $P_B(A) = 0{,}75$."
    },
    {
      titre: "Étudier un test de dépistage",
      etapes: ["Traduire : prévalence $P(M)$, sensibilité $P_M(T)$, spécificité $P_{\\overline{M}}(\\overline{T})$.", "Compléter l'arbre (les branches d'un même nœud font $1$).", "VPP $= P_T(M)$ et VPN $= P_{\\overline{T}}(\\overline{M})$ par la formule de Bayes."],
      exemple: "Dengue : $0{,}05$ ; $0{,}9$ ; $0{,}95$. VPP $\\approx 0{,}49$, VPN $\\approx 0{,}994$."
    },
    {
      titre: "Lire la bonne probabilité dans un énoncé",
      etapes: ["Repérer la population de référence (« parmi les… », « sachant que… »).", "Elle se met en indice : $P_{\\text{référence}}(\\dots)$.", "« Et » sans population de référence : c'est une intersection."],
      exemple: "« Parmi les tests positifs, $49\\,\\%$ de malades » : $P_T(M) = 0{,}49$."
    }
  ],
  erreurs: [
    "Confondre $P_M(T)$ (sensibilité) et $P_T(M)$ (valeur prédictive positive).",
    "Croire qu'un test très sensible rend un test positif presque sûr, même pour une maladie rare.",
    "Diviser par $P(A)$ au lieu de $P(B)$ dans la formule de Bayes.",
    "Oublier une branche dans la formule des probabilités totales.",
    "Confondre spécificité et valeur prédictive négative.",
    "Additionner $P_A(B)$ et $P_{\\overline{A}}(B)$ comme si elles étaient complémentaires."
  ]
};
