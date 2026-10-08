/*
  CHAPITRE : Seconde — Probabilités conditionnelles et arbres pondérés
  ---------------------------------------------------------------------
  Chapitre 15 de la progression spiralée 2026-2027 (programme de Seconde 2026).
  Les probabilités totales ne sont pas un attendu : on passe par un tableau d'effectifs
  (population fictive de 10 000 personnes) pour inverser un conditionnement.
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Figure disponible : "arbre-depistage".
  À ajouter quand elle sera publique : #26 « Raisonner avec les probabilités » (iliNfgwWyLM, encore privée le 07/10).
  Les générateurs d'exercices commencent par « pc- » dans assets/exercices.js (et am-proba-arbre).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["seconde-probabilites-conditionnelles"] = {
  niveau: "Seconde",
  numero: 15,
  titre: "Probabilités conditionnelles et arbres pondérés",
  accroche: "Un test de dépistage positif veut-il dire qu'on est malade ? Arbres pondérés, faux positifs et inversion des conditionnements.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur les probabilités conditionnelles en vidéo (Yvan Monka)", url: "https://youtu.be/eE90_sgdCG0", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Probabilité conditionnelle",
      video: { titre: "Vidéo d'Yvan Monka : calculer une probabilité conditionnelle (formule)", youtube: "https://youtu.be/SWmkdKxXf_I" },
      texte:
        "Soit $A$ un événement tel que $P(A) \\neq 0$. La probabilité de $B$ **sachant** $A$ est :\n\n" +
        "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.\n\n" +
        "- C'est la probabilité de $B$ quand on sait que $A$ est réalisé : on se restreint aux issues de $A$.\n" +
        "- On en déduit $P(A \\cap B) = P(A) \\times P_A(B)$.\n" +
        "- $P_A(B)$ et $P_B(A)$ sont en général **différentes** (comme $f_A(B)$ et $f_B(A)$ au chapitre 10).",
      exemple: {
        enonce: "Au lycée, $P(F) = 0{,}55$ (l'élève est une fille) et $P(F \\cap S) = 0{,}22$ (fille et fait du sport). Calculer $P_F(S)$.",
        solution: "$P_F(S) = \\dfrac{0{,}22}{0{,}55} = 0{,}4$ : $40\\,\\%$ des filles font du sport."
      }
    },
    {
      titre: "Arbre pondéré",
      video: { titre: "Vidéo d'Yvan Monka : construire un arbre pondéré", youtube: "https://youtu.be/Pc5kJBkPDbo" },
      texte:
        "Un **arbre pondéré** représente une expérience à deux épreuves. On écrit sur chaque branche sa probabilité :\n" +
        "- premier niveau : $P(A)$ et $P(\\overline{A})$ ;\n" +
        "- second niveau : des probabilités **conditionnelles**, $P_A(B)$, $P_A(\\overline{B})$, $P_{\\overline{A}}(B)$, $P_{\\overline{A}}(\\overline{B})$.\n\n" +
        "Règles :\n" +
        "- la somme des probabilités des branches issues d'un même nœud vaut $1$ ;\n" +
        "- la probabilité d'un **chemin** est le **produit** des probabilités de ses branches : $P(A \\cap B) = P(A) \\times P_A(B)$.",
      figure: "arbre-depistage",
      exemple: {
        enonce: "Dans l'arbre ci-contre, $M$ : « la personne est malade », $T$ : « le test est positif ». Calculer $P(M \\cap T)$ et $P(\\overline{M} \\cap T)$.",
        solution: "$P(M \\cap T) = 0{,}02 \\times 0{,}95 = 0{,}019$.\n\n$P(\\overline{M} \\cap T) = 0{,}98 \\times 0{,}1 = 0{,}098$."
      }
    },
    {
      titre: "Sensibilité, spécificité, faux positifs",
      texte:
        "Pour un test de dépistage, avec $M$ : « malade » et $T$ : « test positif » :\n" +
        "- la **sensibilité** est $P_M(T)$ : la probabilité que le test détecte un malade ;\n" +
        "- la **spécificité** est $P_{\\overline{M}}(\\overline{T})$ : la probabilité que le test soit négatif pour une personne saine ;\n" +
        "- un **faux positif** est une personne saine avec un test positif ; un **faux négatif**, une personne malade avec un test négatif.\n\n" +
        "Passer de la langue naturelle aux notations : « sachant que… » ou « parmi les… » indique ce qui va **en indice**.",
      exemple: {
        enonce: "Comment note-t-on « la probabilité qu'une personne dont le test est positif soit malade » ?",
        solution: "On sait que le test est positif : $T$ va en indice. C'est $P_T(M)$, à ne pas confondre avec la sensibilité $P_M(T)$."
      }
    },
    {
      titre: "Inverser le conditionnement avec un tableau",
      video: { titre: "Vidéo d'Yvan Monka : probabilité conditionnelle à l'aide d'un tableau", youtube: "https://youtu.be/7tS60nk6Z2I" },
      texte:
        "On connaît souvent $P_M(T)$ (la sensibilité) mais on veut $P_T(M)$ : la probabilité d'être malade quand le test est positif.\n\n" +
        "Méthode : on imagine une population de $10\\,000$ personnes et on remplit un **tableau croisé** à partir de l'arbre :\n" +
        "- malades : $10\\,000 \\times P(M)$, dont les positifs : $\\times P_M(T)$ ;\n" +
        "- sains : le reste, dont les positifs (faux positifs) : $\\times P_{\\overline{M}}(T)$ ;\n" +
        "- puis $P_T(M) = \\dfrac{\\text{malades positifs}}{\\text{total des positifs}}$.",
      exemple: {
        enonce: "Avec l'arbre du paragraphe 2 : une personne a un test positif. Quelle est la probabilité qu'elle soit malade ?",
        solution: "Sur $10\\,000$ personnes : $200$ malades, dont $190$ positifs ; $9\\,800$ saines, dont $980$ positifs (faux positifs).\n\nTotal des positifs : $1\\,170$. $P_T(M) = \\dfrac{190}{1\\,170} \\approx 0{,}16$.\n\nSeulement $16\\,\\%$ : la maladie est rare, les faux positifs sont plus nombreux que les vrais positifs. Un test positif se confirme par un second test."
      }
    },
    {
      titre: "Implication et réciproque",
      texte:
        "Ne pas confondre une implication et sa réciproque, c'est exactement ne pas confondre $P_A(B)$ et $P_B(A)$.\n\n" +
        "- « Presque tous les malades ont un test positif » : $P_M(T)$ est grande.\n" +
        "- Cela ne veut **pas** dire « presque tous les tests positifs viennent de malades » : $P_T(M)$ peut être petite.\n\n" +
        "Dans les médias, repérer la population de référence avant de conclure.",
      exemple: {
        enonce: "« $90\\,\\%$ des accidents de scooter impliquent un conducteur sans permis. » Peut-on en conclure que $90\\,\\%$ des conducteurs sans permis ont un accident ?",
        solution: "Non : la phrase donne $P_{\\text{accident}}(\\text{sans permis}) = 0{,}9$. La réciproque $P_{\\text{sans permis}}(\\text{accident})$ est une autre probabilité, sans doute bien plus petite."
      }
    },
    {
      titre: "Python : simuler une expérience à deux épreuves",
      texte:
        "$\\texttt{random()}$ (module $\\texttt{random}$) renvoie un nombre au hasard dans $[0\\,;1[$ : le test $\\texttt{random() < p}$ est vrai avec la probabilité $p$.\n\n" +
        "```python\nfrom random import random\n\ndef depistage():\n    malade = random() < 0.02\n    if malade:\n        positif = random() < 0.95\n    else:\n        positif = random() < 0.1\n    return malade, positif\n```\n\n" +
        "En répétant l'expérience $100\\,000$ fois et en comptant, on retrouve à peu près les probabilités de l'arbre (loi des grands nombres, chapitre 16).",
      exemple: {
        enonce: "Sur un grand nombre de simulations, quelle proportion de résultats $\\texttt{(True, True)}$ s'attend-on à observer ?",
        solution: "Environ $P(M \\cap T) = 0{,}02 \\times 0{,}95 = 0{,}019$, soit à peu près $1{,}9\\,\\%$."
      }
    }
  ],

  /* Exercices corrigés en vidéo */
  videos: [
    { titre: "Calculer une probabilité à l'aide d'un arbre pondéré", type: "Arbre", youtube: "https://youtu.be/dQPd9njK5ZA" },
    { titre: "Compléter un arbre pondéré", type: "Arbre", youtube: "https://youtu.be/o1HQ6xJ7o4U" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES ---------- */
  exercices: [
    { type: "pc-formule", titre: "La formule de $P_A(B)$", etape: "Probabilité conditionnelle", nb: 5 },
    { type: "pc-traduire", titre: "Traduire en notations", etape: "Probabilité conditionnelle", nb: 5 },
    { type: "pc-arbre", titre: "Compléter et lire un arbre", etape: "Arbres pondérés", nb: 6 },
    { type: "am-proba-arbre", titre: "Probabilité d'un chemin", etape: "Arbres pondérés", nb: 4 },
    { type: "pc-depistage", titre: "Test de dépistage : inverser le conditionnement", etape: "Inverser", nb: 4 },
    { type: "pc-python", titre: "Python : simulation à deux épreuves", etape: "Python", nb: 3 }
  ],

  /* ---------- 3. QCM ---------- */
  qcm: [
    {
      question: "$P(A) = 0{,}5$ et $P(A \\cap B) = 0{,}2$. Alors $P_A(B)$ vaut :",
      choix: ["$0{,}4$", "$0{,}1$", "$0{,}7$", "$2{,}5$"],
      bonne: 0,
      explication: "$P_A(B) = \\dfrac{0{,}2}{0{,}5} = 0{,}4$."
    },
    {
      question: "Dans un arbre, $P(A) = 0{,}3$ et $P_A(B) = 0{,}6$. Alors $P(A \\cap B)$ vaut :",
      choix: ["$0{,}18$", "$0{,}9$", "$0{,}5$", "$2$"],
      bonne: 0,
      explication: "On multiplie le long du chemin : $0{,}3 \\times 0{,}6 = 0{,}18$."
    },
    {
      question: "Si $P_A(B) = 0{,}35$, alors $P_A(\\overline{B})$ vaut :",
      choix: ["$0{,}65$", "$0{,}35$", "$-0{,}35$", "on ne peut pas savoir"],
      bonne: 0,
      explication: "Les branches issues du nœud $A$ ont pour somme $1$ : $1 - 0{,}35 = 0{,}65$."
    },
    {
      question: "La sensibilité d'un test ($M$ : malade, $T$ : positif) est :",
      choix: ["$P_M(T)$", "$P_T(M)$", "$P(M \\cap T)$", "$P_{\\overline{M}}(\\overline{T})$"],
      bonne: 0,
      explication: "C'est la probabilité que le test soit positif sachant que la personne est malade. $P_{\\overline{M}}(\\overline{T})$ est la spécificité."
    },
    {
      question: "Un faux positif est :",
      choix: ["une personne saine avec un test positif", "une personne malade avec un test négatif", "une personne malade avec un test positif", "un test qui ne marche pas"],
      bonne: 0,
      explication: "Le test dit « positif » à tort : la personne n'est pas malade."
    },
    {
      question: "Un test a une sensibilité de $99\\,\\%$ pour une maladie très rare. Si ton test est positif :",
      choix: ["la probabilité d'être malade peut rester faible", "tu es malade à $99\\,\\%$", "tu es sûrement en bonne santé", "le test est faux"],
      bonne: 0,
      explication: "$99\\,\\%$ est $P_M(T)$, pas $P_T(M)$. Quand la maladie est rare, les faux positifs peuvent être plus nombreux que les vrais positifs."
    },
    {
      question: "« $P_A(B)$ » se lit :",
      choix: ["probabilité de $B$ sachant $A$", "probabilité de $A$ sachant $B$", "probabilité de $A$ et $B$", "probabilité de $A$ ou $B$"],
      bonne: 0,
      explication: "L'événement en indice est celui qu'on sait réalisé."
    },
    { question: "Pour $P(A) \\neq 0$, la probabilité $P_A(B)$ est égale à :", choix: ["$\\dfrac{P(A \\cap B)}{P(A)}$", "$\\dfrac{P(A \\cap B)}{P(B)}$", "$P(A) \\times P(B)$", "$\\dfrac{P(A)}{P(A \\cap B)}$"], bonne: 0, explication: "On sait que $A$ est réalisé : on divise par $P(A)$, la probabilité de l'événement en indice." },
    { question: "$P(F) = 0{,}4$ et $P(F \\cap S) = 0{,}1$. Alors $P_F(S)$ vaut :", choix: ["$0{,}25$", "$0{,}04$", "$4$", "$0{,}5$"], bonne: 0, explication: "$P_F(S) = \\dfrac{0{,}1}{0{,}4} = \\dfrac{1}{4} = 0{,}25$. On divise, on ne multiplie pas ($0{,}04$) et on n'additionne pas ($0{,}5$)." },
    { question: "$P_A(B) = 0{,}5$ et $P(A \\cap B) = 0{,}2$. Alors $P(A)$ vaut :", choix: ["$0{,}4$", "$0{,}1$", "$0{,}7$", "$2{,}5$"], bonne: 0, explication: "$P(A \\cap B) = P(A) \\times P_A(B)$, donc $P(A) = \\dfrac{0{,}2}{0{,}5} = 0{,}4$." },
    { question: "$P(A) = 0{,}7$ et $P_{\\overline{A}}(B) = 0{,}4$. Alors $P(\\overline{A} \\cap B)$ vaut :", choix: ["$0{,}12$", "$0{,}28$", "$0{,}4$", "$1{,}1$"], bonne: 0, explication: "$P(\\overline{A}) = 1 - 0{,}7 = 0{,}3$, puis on multiplie le long du chemin : $0{,}3 \\times 0{,}4 = 0{,}12$. ($0{,}28$ utilise $P(A)$ au lieu de $P(\\overline{A})$.)" },
    { question: "Dans un arbre pondéré, la somme des probabilités des branches issues d'un même nœud vaut :", choix: ["$1$", "$0$", "$0{,}5$", "la probabilité du chemin"], bonne: 0, explication: "Depuis un nœud, on obtient sûrement l'un des événements des branches (par exemple $B$ ou $\\overline{B}$) : les probabilités ont pour somme $1$." },
    { question: "La spécificité d'un test ($M$ : malade, $T$ : positif) est :", choix: ["$P_{\\overline{M}}(\\overline{T})$", "$P_M(T)$", "$P_T(M)$", "$P(\\overline{M} \\cap \\overline{T})$"], bonne: 0, explication: "C'est la probabilité que le test soit négatif sachant que la personne est saine. $P_M(T)$ est la sensibilité." },
    { question: "Un faux négatif est :", choix: ["une personne malade dont le test est négatif", "une personne saine dont le test est négatif", "une personne saine dont le test est positif", "une personne malade dont le test est positif"], bonne: 0, explication: "Le test dit « négatif » à tort : la personne est malade, mais le test ne l'a pas détectée." },
    { question: "« Parmi les élèves qui prennent la barge ($B$), $30\\,\\%$ habitent à Pamandzi ($H$). » Cela s'écrit :", choix: ["$P_B(H) = 0{,}3$", "$P_H(B) = 0{,}3$", "$P(B \\cap H) = 0{,}3$", "$P(H) = 0{,}3$"], bonne: 0, explication: "« Parmi les élèves qui prennent la barge » : on se restreint à $B$, qui va en indice." },
    { question: "« $70\\,\\%$ des retards de la barge ont lieu les jours de forte houle. » Avec $R$ : « la barge est en retard » et $H$ : « il y a une forte houle », cette phrase donne :", choix: ["$P_R(H) = 0{,}7$", "$P_H(R) = 0{,}7$", "$P(R \\cap H) = 0{,}7$", "$P(H) = 0{,}7$"], bonne: 0, explication: "On se place parmi les retards : $R$ va en indice. Cela ne dit pas que la barge est en retard $70\\,\\%$ des jours de houle, ce qui serait $P_H(R)$." },
    { question: "Vrai ou faux : pour tous événements $A$ et $B$ de probabilités non nulles, $P_A(B) = P_B(A)$.", choix: ["Faux", "Vrai"], bonne: 0, explication: "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ et $P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$ : on ne divise pas par le même nombre. Elles ne sont égales que si $P(A) = P(B)$ (ou si $P(A \\cap B) = 0$)." },
    { question: "On imagine $10\\,000$ personnes, avec $P(M) = 0{,}03$ et $P_M(T) = 0{,}9$. Le nombre de malades dont le test est positif est :", choix: ["$270$", "$300$", "$9\\,000$", "$2\\,700$"], bonne: 0, explication: "$10\\,000 \\times 0{,}03 = 300$ malades, dont $300 \\times 0{,}9 = 270$ ont un test positif." },
    { question: "Sur $10\\,000$ personnes, $9\\,500$ sont saines et $P_{\\overline{M}}(T) = 0{,}02$. Le nombre de faux positifs est :", choix: ["$190$", "$200$", "$9\\,310$", "$19$"], bonne: 0, explication: "Les faux positifs sont les personnes saines au test positif : $9\\,500 \\times 0{,}02 = 190$." },
    { question: "Sur $10\\,000$ personnes, le test est positif pour $90$ malades et pour $495$ personnes saines. La probabilité qu'une personne au test positif soit malade est :", choix: ["$\\dfrac{90}{585}$", "$\\dfrac{90}{100}$", "$\\dfrac{90}{10\\,000}$", "$\\dfrac{495}{585}$"], bonne: 0, explication: "On se restreint aux $90 + 495 = 585$ tests positifs, dont $90$ viennent de malades : $P_T(M) = \\dfrac{90}{585} \\approx 0{,}15$." },
    { question: "Sur $50$ élèves, $20$ font de la natation et, parmi eux, $5$ font aussi du football. On choisit un nageur au hasard. La probabilité qu'il fasse du football est :", choix: ["$\\dfrac{5}{20}$", "$\\dfrac{5}{50}$", "$\\dfrac{20}{50}$", "$\\dfrac{5}{25}$"], bonne: 0, explication: "On sait que l'élève fait de la natation : on se restreint aux $20$ nageurs, dont $5$ font du football. $\\dfrac{5}{50}$ est la probabilité de « nageur et footballeur »." },
    { question: "En Python, le test $\\texttt{random() < 0.3}$ est vrai avec une probabilité de :", choix: ["$0{,}3$", "$0{,}7$", "$0{,}5$", "$0{,}03$"], bonne: 0, explication: "$\\texttt{random()}$ tire un nombre au hasard dans $[0\\,;1[$ : il tombe dans $[0\\,;0{,}3[$ avec la probabilité $0{,}3$." },
    { question: "Dans le programme $\\texttt{depistage}$ du cours, le nombre $\\texttt{0.1}$ représente :", choix: ["la probabilité qu'une personne saine ait un test positif", "la probabilité d'être malade", "la sensibilité du test", "la probabilité d'être malade quand le test est positif"], bonne: 0, explication: "La ligne $\\texttt{positif = random() < 0.1}$ est dans le cas $\\texttt{else}$, c'est-à-dire pour une personne saine : c'est $P_{\\overline{M}}(T)$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Construire et utiliser un arbre pondéré",
      etapes: [
        "Premier niveau : $A$ et $\\overline{A}$ avec $P(A)$ et $1 - P(A)$.",
        "Second niveau : les probabilités **conditionnelles** de $B$ et $\\overline{B}$.",
        "Vérifier que chaque nœud a des branches de somme $1$.",
        "Probabilité d'un chemin : produit des branches."
      ],
      exemple: "$P(\\overline{M} \\cap T) = 0{,}98 \\times 0{,}1 = 0{,}098$."
    },
    {
      titre: "Inverser un conditionnement",
      etapes: [
        "Imaginer une population de $10\\,000$ individus.",
        "Remplir un tableau croisé avec les probabilités de l'arbre.",
        "Calculer le total de la colonne qui sert de condition (par exemple les tests positifs).",
        "Diviser : $P_T(M) = \\dfrac{\\text{effectif de } M \\cap T}{\\text{effectif de } T}$."
      ],
      exemple: "$P_T(M) = \\dfrac{190}{1\\,170} \\approx 0{,}16$."
    },
    {
      titre: "Traduire une phrase en probabilité",
      etapes: [
        "Nommer les événements avec des lettres.",
        "« Sachant que », « parmi les », « si » : la condition va en indice.",
        "« Et » : intersection $\\cap$."
      ],
      exemple: "« Un malade a un test positif dans $95\\,\\%$ des cas » : $P_M(T) = 0{,}95$."
    }
  ],
  erreurs: [
    "Confondre $P_M(T)$ et $P_T(M)$.",
    "Additionner au lieu de multiplier le long d'un chemin.",
    "Mettre $P(B)$ au lieu de $P_A(B)$ sur une branche du second niveau.",
    "Oublier les faux positifs dans le total des tests positifs.",
    "Diviser par $P(B)$ au lieu de $P(A)$ dans $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$."
  ]
};
