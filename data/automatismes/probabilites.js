/*
  AUTOMATISMES · PROBABILITÉS (PR01 à PR06)
  -----------------------------------------
  PR01 à PR04 : programme de Seconde. PR05 et PR06 : ajouts de Première.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["auto-probabilites"] = {
  niveau: "Automatismes",
  numero: null,
  periode: "Seconde et Première",
  titre: "Probabilités",
  accroche: "Événement contraire, somme des probabilités, équiprobabilité, tableaux croisés et arbres pondérés.",

  playlist: "",
  drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv",
  pdfs: [
    { titre: "Dossier élève de Seconde (partie P10)", url: "https://drive.google.com/file/d/1vr9e5N38rAOQLWIvUR5suK6l6ciyoLNY/view" }
  ],

  cours: [
    {
      titre: "Les règles de base (PR01, PR02, PR03)",
      video: { titre: "Vidéo d'Yvan Monka : le cours sur les probabilités", youtube: "https://youtu.be/dvx_O37gfyY" },
      texte:
        "- Une probabilité est toujours comprise entre $0$ (événement impossible) et $1$ (événement certain).\n" +
        "- La somme des probabilités de toutes les issues vaut $1$.\n" +
        "- La probabilité d'un événement est la **somme** des probabilités des issues qui le réalisent.\n" +
        "- Événement contraire : $P(\\overline{A}) = 1 - P(A)$.",
      exemple: {
        enonce: "Une roue a quatre couleurs : $P(\\text{rouge}) = 0{,}3$, $P(\\text{vert}) = 0{,}25$, $P(\\text{bleu}) = 0{,}15$. Calculer $P(\\text{jaune})$ et la probabilité de ne pas obtenir rouge.",
        solution: "$P(\\text{jaune}) = 1 - (0{,}3 + 0{,}25 + 0{,}15) = 0{,}3$.\n\n$P(\\overline{\\text{rouge}}) = 1 - 0{,}3 = 0{,}7$."
      }
    },
    {
      titre: "Équiprobabilité (PR04)",
      video: { titre: "Vidéo d'Yvan Monka : calculer des probabilités (dés spéciaux)", youtube: "https://youtu.be/Y9u4EnP01wo" },
      texte:
        "- Quand toutes les issues ont la même probabilité (dé équilibré, tirage « au hasard »), on dit qu'il y a équiprobabilité.\n" +
        "- Alors $P(A) = \\dfrac{\\text{nombre d'issues favorables}}{\\text{nombre d'issues possibles}}$.\n" +
        "- Deux dés : tableau à double entrée, $36$ issues équiprobables.",
      exemple: {
        enonce: "On lance un dé équilibré à six faces. Probabilité d'obtenir un multiple de $3$ ?",
        solution: "Issues favorables : $3$ et $6$. $P = \\dfrac{2}{6} = \\dfrac{1}{3}$."
      }
    },
    {
      titre: "Tableau croisé et probabilité conditionnelle (PR05, Première)",
      video: { titre: "Vidéo d'Yvan Monka : probabilité conditionnelle à l'aide d'un tableau", youtube: "https://youtu.be/Shh5IdHwqqw" },
      texte:
        "- Avec un tableau d'effectifs, on choisit un individu au hasard : $P(A) = \\dfrac{\\text{effectif de } A}{\\text{effectif total}}$.\n" +
        "- $P(A \\cap B)$ : probabilité que $A$ **et** $B$ soient réalisés. On divise par l'effectif **total**.\n" +
        "- $P_A(B)$ : probabilité de $B$ **sachant** $A$. On se place **parmi** les individus de $A$ : $P_A(B) = \\dfrac{\\text{effectif de } A \\cap B}{\\text{effectif de } A}$.\n" +
        "- Formule : $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
      exemple: {
        enonce: "Sur $200$ élèves, $120$ sont des filles, dont $45$ demi-pensionnaires. On choisit un élève au hasard. Calculer $P(F \\cap D)$ et $P_F(D)$.",
        solution: "$P(F \\cap D) = \\dfrac{45}{200} = 0{,}225$.\n\n$P_F(D) = \\dfrac{45}{120} = 0{,}375$ : parmi les filles, $37{,}5\\,\\%$ sont demi-pensionnaires."
      }
    },
    {
      titre: "Arbre pondéré (PR05, PR06, Première)",
      texte:
        "- Sur les branches du premier niveau : $P(A)$ et $P(\\overline{A})$. Sur celles du second niveau : des probabilités **conditionnelles** comme $P_A(B)$.\n" +
        "- La somme des probabilités des branches issues d'un même nœud vaut $1$.\n" +
        "- Le long d'un chemin, on **multiplie** : $P(A \\cap B) = P(A) \\times P_A(B)$.\n" +
        "- Probabilités totales : $P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$ (on additionne les chemins qui mènent à $B$).\n" +
        "- Ne pas confondre $P(A \\cap B)$, $P_A(B)$ et $P_B(A)$ : la condition « sachant… » se met en indice.",
      video: { titre: "Vidéo d'Yvan Monka : construire un arbre de répétitions indépendantes", youtube: "https://youtu.be/e7jH8a1cDtg" },
      exemple: {
        enonce: "$P(A) = 0{,}4$, $P_A(B) = 0{,}7$ et $P_{\\overline{A}}(B) = 0{,}2$. Calculer $P(B)$.",
        solution: "$P(B) = 0{,}4 \\times 0{,}7 + 0{,}6 \\times 0{,}2 = 0{,}28 + 0{,}12 = 0{,}4$."
      }
    }
  ],

  videos: [],

  exercices: [
    { type: "auto-probabilites", titre: "PR01 à PR04 · Dé, urne, événement contraire", etape: "Programme de Seconde", nb: 5 },
    { type: "am-proba-loi", titre: "PR03 · Somme des probabilités", etape: "Programme de Seconde", nb: 5 },
    { type: "am-proba-tableau", titre: "PR05 · Tableau croisé", etape: "Ajouts de Première", nb: 5 },
    { type: "am-proba-arbre", titre: "PR05 · Arbre pondéré", etape: "Ajouts de Première", nb: 5 },
    { type: "am-proba-notation", titre: "PR06 · P(A ∩ B), P_A(B) ou P_B(A) ?", etape: "Ajouts de Première", nb: 5 },
    { type: "am-flash-pr", titre: "Flash : probabilités mélangées", etape: "Défi", nb: 8 }
  ],

  qcm: [
    { question: "PR01 · Laquelle de ces valeurs peut être une probabilité ?", choix: ["$1{,}05$", "$-0{,}2$", "$0{,}97$", "$\\dfrac{5}{4}$"], bonne: 2, explication: "Une probabilité est entre $0$ et $1$." },
    { question: "PR02 · $P(A) = 0{,}28$. $P(\\overline{A}) =$", choix: ["$0{,}28$", "$0{,}72$", "$0{,}82$", "$1{,}28$"], bonne: 1, explication: "$1 - 0{,}28 = 0{,}72$." },
    { question: "PR03 · Trois issues ont pour probabilités $0{,}5$, $0{,}2$ et $p$. Alors $p =$", choix: ["$0{,}7$", "$0{,}3$", "$0{,}2$", "$1$"], bonne: 1, explication: "$p = 1 - 0{,}5 - 0{,}2 = 0{,}3$." },
    { question: "PR04 · Une urne contient $3$ boules rouges et $5$ vertes. Probabilité de tirer une rouge :", choix: ["$\\dfrac{3}{5}$", "$\\dfrac{3}{8}$", "$\\dfrac{5}{8}$", "$\\dfrac{1}{3}$"], bonne: 1, explication: "$3$ issues favorables sur $8$." },
    { question: "PR04 · On lance deux dés équilibrés. Combien y a-t-il d'issues ?", choix: ["$12$", "$36$", "$11$", "$6$"], bonne: 1, explication: "$6 \\times 6 = 36$ issues équiprobables." },
    { question: "PR05 · Sur $50$ élèves, $20$ font du sport, dont $8$ filles. Parmi les sportifs, la probabilité de choisir une fille :", choix: ["$\\dfrac{8}{50}$", "$\\dfrac{8}{20}$", "$\\dfrac{20}{50}$", "$\\dfrac{12}{20}$"], bonne: 1, explication: "« Parmi les sportifs » : on divise par $20$." },
    { question: "PR05 · $P(A) = 0{,}5$ et $P_A(B) = 0{,}4$. Alors $P(A \\cap B) =$", choix: ["$0{,}9$", "$0{,}2$", "$0{,}8$", "$0{,}1$"], bonne: 1, explication: "$0{,}5 \\times 0{,}4 = 0{,}2$." },
    { question: "PR05 · Dans un arbre, les deux branches issues de $A$ portent $0{,}35$ et :", choix: ["$0{,}35$", "$0{,}65$", "$1{,}35$", "on ne peut pas savoir"], bonne: 1, explication: "La somme des branches issues d'un même nœud vaut $1$." },
    { question: "PR06 · « La probabilité qu'un élève soit malade sachant qu'il est vacciné » se note ($M$ : malade, $V$ : vacciné) :", choix: ["$P(M \\cap V)$", "$P_V(M)$", "$P_M(V)$", "$P(M)$"], bonne: 1, explication: "On sait que l'élève est vacciné : $V$ est en indice." },
    { question: "PR06 · $P(A \\cap B)$ correspond à :", choix: ["$A$ ou $B$", "$A$ et $B$", "$B$ sachant $A$", "ni $A$ ni $B$"], bonne: 1, explication: "$\\cap$ se lit « et » (intersection)." }
  ],

  methode: [
    {
      titre: "Choisir la bonne formule",
      etapes: [
        "« Ne pas… », « au moins un… » : pense à l'événement contraire.",
        "« Et » : intersection. Avec un arbre, multiplie le long du chemin.",
        "« Sachant que… », « parmi… » : probabilité conditionnelle, on se restreint à l'ensemble de la condition.",
        "Plusieurs chemins mènent au même événement : additionne-les."
      ],
      exemple: "« Parmi les filles, la probabilité d'être externe » : $P_F(E) = \\dfrac{\\text{filles externes}}{\\text{filles}}$."
    },
    {
      titre: "Construire un arbre pondéré",
      etapes: [
        "Premier niveau : l'événement dont on connaît la probabilité sans condition.",
        "Second niveau : les probabilités conditionnelles.",
        "Complète chaque nœud pour que la somme des branches fasse $1$.",
        "Écris sous chaque chemin le produit des probabilités."
      ],
      exemple: "$P(A) = 0{,}3$ donne $P(\\overline{A}) = 0{,}7$ ; $P_A(B) = 0{,}6$ donne $P_A(\\overline{B}) = 0{,}4$."
    }
  ],
  erreurs: [
    "Une probabilité ne peut valoir ni $1{,}2$ ni $-0{,}3$.",
    "$P(\\overline{A}) = 1 - P(A)$, et non $-P(A)$.",
    "$P_A(B)$ et $P_B(A)$ sont en général différents : regarde bien qui est en indice.",
    "Pour $P(A \\cap B)$ dans un tableau, on divise par l'effectif total ; pour $P_A(B)$, par l'effectif de $A$.",
    "Le long d'un chemin d'arbre, on multiplie ; entre deux chemins, on additionne."
  ]
};
