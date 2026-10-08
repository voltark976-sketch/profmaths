/*
  CHAPITRE : Terminale maths complémentaires — Répartition des richesses, inégalités
  ---------------------------------------------------------------------------------
  Chapitre 14 de la progression spiralée 2026-2027 (programme de maths complémentaires de 2019, thème d'étude).
  Quantiles, déciles, rapport interdécile ; courbe de Lorenz (continue, croissante, convexe de [0 ; 1] dans [0 ; 1]) ;
  indice de Gini (intégrale) ; Python : Gini par la méthode des trapèzes ; données INSEE Mayotte 2018 et métropole.
  Réinvestit les chapitres 9 (convexité) et 12 (intégration).
  Figures : "trr-lorenz", "trr-comparer". Générateurs : trr-.
  Source des chiffres : INSEE Analyses Mayotte n° 25, « Revenus et pauvreté à Mayotte en 2018 » (juillet 2020).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-repartition-richesses"] = {
  niveau: "Terminale maths complémentaires",
  numero: 14,
  titre: "Répartition des richesses et inégalités",
  accroche: "Mesurer les inégalités avec les maths : déciles, rapport interdécile, courbe de Lorenz et indice de Gini, avec les chiffres de l'INSEE pour Mayotte et la métropole.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "INSEE : revenus et pauvreté à Mayotte en 2018", url: "https://www.insee.fr/fr/statistiques/4622454" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Quantiles et déciles",
      video: { titre: "Vidéo de ton prof : indicateurs statistiques, moyenne, médiane, quartiles", youtube: "https://youtu.be/ncb1y7IwBZA" },
      texte:
        "Les valeurs d'une série étant rangées dans l'ordre croissant :\n\n" +
        "- le **premier décile** $D_1$ est la plus petite valeur telle qu'au moins $10\\,\\%$ des valeurs lui sont inférieures ou égales ;\n" +
        "- le **neuvième décile** $D_9$ : au moins $90\\,\\%$ des valeurs lui sont inférieures ou égales ;\n" +
        "- plus généralement, les **quantiles** partagent la série en parts égales : quartiles (en $4$), déciles (en $10$), centiles (en $100$). La médiane est $D_5$.\n\n" +
        "Le **rapport interdécile** $\\dfrac{D_9}{D_1}$ mesure l'écart entre les plus aisés et les plus modestes : plus il est grand, plus la série est inégalitaire.",
      exemple: {
        enonce: "Dans une série de $20$ niveaux de vie rangés, quel rang ont $D_1$ et $D_9$ ?",
        solution: "$10\\,\\% \\times 20 = 2$ : $D_1$ est la $2$e valeur ; $90\\,\\% \\times 20 = 18$ : $D_9$ est la $18$e valeur."
      }
    },
    {
      titre: "Les inégalités à Mayotte (INSEE, 2018)",
      texte:
        "Le **niveau de vie** d'un ménage est son revenu disponible divisé par le nombre d'unités de consommation (UC). D'après l'INSEE, en 2018 :\n\n" +
        "- la moitié des habitants de Mayotte vit avec moins de $260$ € par mois et par UC : le niveau de vie médian est **six fois plus faible** qu'en métropole ;\n" +
        "- les $40\\,\\%$ les plus modestes perçoivent moins de $140$ € par mois ;\n" +
        "- le $D_9$ vaut $6{,}8$ fois la médiane (environ $1\\,770$ €), contre $1{,}8$ fois en métropole : il est proche du niveau de vie médian de la métropole ;\n" +
        "- $77\\,\\%$ des habitants vivent sous le seuil de pauvreté national ($1\\,010$ € par mois).\n\n" +
        "Mayotte est donc à la fois plus pauvre et beaucoup plus inégalitaire que la métropole.",
      exemple: {
        enonce: "En métropole, $D_9 = 1{,}8 \\times$ médiane. Si la médiane vaut environ $1\\,770$ €, combien vaut $D_9$ ?",
        solution: "$1{,}8 \\times 1\\,770 \\approx 3\\,190$ € par mois, presque deux fois le $D_9$ de Mayotte."
      }
    },
    {
      titre: "La courbe de Lorenz",
      figure: "trr-lorenz",
      texte:
        "On range la population de la plus modeste à la plus aisée. Pour $x$ entre $0$ et $1$, $L(x)$ est la **part du revenu total** perçue par la proportion $x$ la plus modeste. Par exemple $L(0{,}5) = 0{,}2$ signifie : la moitié la plus modeste perçoit $20\\,\\%$ des revenus.\n\n" +
        "Une courbe de Lorenz est une fonction **continue, croissante, convexe** de $[0\\,;1]$ dans $[0\\,;1]$, avec $L(0) = 0$ et $L(1) = 1$. Elle reste sous la diagonale : $L(x) \\leqslant x$.\n\n" +
        "- Égalité parfaite : $L(x) = x$ (la diagonale).\n" +
        "- Plus la courbe est « creusée » sous la diagonale, plus la répartition est inégalitaire.\n\n" +
        "La convexité (chapitre 9) traduit que chaque tranche ajoutée est plus riche que la précédente.",
      exemple: {
        enonce: "Avec $L(x) = x^3$ (figure), quelle part des revenus reçoivent les $10\\,\\%$ les plus aisés ?",
        solution: "$1 - L(0{,}9) = 1 - 0{,}729 = 0{,}271$ : environ $27\\,\\%$ des revenus."
      }
    },
    {
      titre: "L'indice de Gini",
      figure: "trr-comparer",
      texte:
        "L'**indice de Gini** est le double de l'aire comprise entre la diagonale et la courbe de Lorenz (zone hachurée de la figure précédente) :\n\n" +
        "$G = 2\\displaystyle\\int_0^1 \\big(x - L(x)\\big)\\,\\mathrm{d}x = 1 - 2\\displaystyle\\int_0^1 L(x)\\,\\mathrm{d}x$ (chapitre 12).\n\n" +
        "- $G = 0$ : égalité parfaite ; $G$ proche de $1$ : une personne possède presque tout.\n" +
        "- Il tient compte de **toute** la répartition, alors que le rapport interdécile n'utilise que deux valeurs.\n\n" +
        "Sur la figure, la courbe A ($G \\approx 0{,}13$) est proche de la diagonale ; la courbe B ($G = 0{,}6$) est très creusée : le pays B est plus inégalitaire. Pour les niveaux de vie, l'INSEE donne un indice d'environ $0{,}29$ en France métropolitaine.",
      exemple: {
        enonce: "Calcule l'indice de Gini pour $L(x) = x^3$.",
        solution: "$\\displaystyle\\int_0^1 x^3\\,\\mathrm{d}x = \\dfrac{1}{4}$, donc $G = 1 - \\dfrac{2}{4} = 0{,}5$."
      }
    },
    {
      titre: "Python : indice de Gini par la méthode des trapèzes",
      texte:
        "Sur des données réelles, on connaît $L$ seulement en quelques points (déciles ou quintiles). On estime $\\displaystyle\\int_0^1 L$ par la méthode des trapèzes :\n\n" +
        "```python\ndef gini(L):\n    n = len(L) - 1\n    h = 1 / n\n    s = 0\n    for k in range(n):\n        s = s + h * (L[k] + L[k + 1]) / 2\n    return 1 - 2 * s\n\nprint(gini([0, 0.08, 0.2, 0.36, 0.58, 1]))\n```\n\n" +
        "La liste L contient $L(0)$, $L(0{,}2)$, …, $L(1)$. Comme $L$ est convexe, les trapèzes sont au-dessus de la courbe : le Gini obtenu est légèrement sous-estimé.",
      exemple: {
        enonce: "Que renvoie gini([0, 0.08, 0.2, 0.36, 0.58, 1]) ?",
        solution: "Somme des trapèzes : $0{,}2 \\times (0{,}04 + 0{,}14 + 0{,}28 + 0{,}47 + 0{,}79) = 0{,}344$, donc $G \\approx 1 - 0{,}688 \\approx 0{,}31$."
      }
    }
  ],

  videos: [
    { titre: "Ton prof : indicateurs statistiques, médiane, quartiles", type: "Cours", youtube: "https://youtu.be/ncb1y7IwBZA" },
    { titre: "Calculer les quartiles", type: "Méthode", youtube: "https://youtu.be/Yjh-9nMVmEw" }
  ],
  videosNote: "Ta vidéo de Seconde sur les indicateurs et une vidéo d'Yvan Monka pour revoir les quantiles. Pas de vidéo dédiée pour la courbe de Lorenz et l'indice de Gini : le cours ci-dessus et les exercices suffisent. Revois au besoin les vidéos d'intégration du chapitre 12.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "trr-quantile", titre: "Déciles et médiane", etape: "Quantiles", nb: 4 },
    { type: "trr-interdecile", titre: "Rapport interdécile", etape: "Quantiles", nb: 3 },
    { type: "trr-lorenz-proprietes", titre: "Reconnaître une courbe de Lorenz", etape: "Courbe de Lorenz", nb: 3 },
    { type: "trr-lorenz-lire", titre: "Lire une courbe de Lorenz", etape: "Courbe de Lorenz", nb: 4 },
    { type: "trr-gini", titre: "Calculer un indice de Gini", etape: "Indice de Gini", nb: 4 },
    { type: "trr-gini-trapezes", titre: "Python : Gini par les trapèzes", etape: "Indice de Gini", nb: 3 },
    { type: "trr-logique", titre: "Vrai ou faux", etape: "Raisonner", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "La médiane d'une série est aussi :", choix: ["le cinquième décile", "le premier décile", "le neuvième décile", "la moyenne"], bonne: 0, explication: "Elle partage la série en deux moitiés." },
    { question: "$D_9$ est la valeur telle qu'au moins :", choix: ["$90\\,\\%$ des valeurs lui sont inférieures ou égales", "$9\\,\\%$ des valeurs lui sont inférieures", "$90\\,\\%$ des valeurs lui sont supérieures", "$9$ valeurs lui sont inférieures"], bonne: 0, explication: "Définition du neuvième décile." },
    { question: "Série de $50$ valeurs rangées : $D_1$ est la :", choix: ["$5$e valeur", "$10$e valeur", "$1$re valeur", "$50$e valeur"], bonne: 0, explication: "$10\\,\\% \\times 50 = 5$." },
    { question: "$D_1 = 150$ € et $D_9 = 1\\,800$ €. Le rapport interdécile vaut :", choix: ["$12$", "$1\\,650$", "$0{,}083$", "$1\\,950$"], bonne: 0, explication: "$\\dfrac{1\\,800}{150}$." },
    { question: "À Mayotte en 2018, le niveau de vie médian est, par rapport à la métropole :", choix: ["environ $6$ fois plus faible", "le même", "deux fois plus faible", "plus élevé"], bonne: 0, explication: "INSEE : $260$ € par mois et par UC." },
    { question: "Pour une courbe de Lorenz, $L(0) =$", choix: ["$0$", "$1$", "$0{,}5$", "on ne sait pas"], bonne: 0, explication: "$0\\,\\%$ de la population perçoit $0\\,\\%$ des revenus." },
    { question: "Pour une courbe de Lorenz, $L(1) =$", choix: ["$1$", "$0$", "$0{,}5$", "$100$"], bonne: 0, explication: "Toute la population perçoit tout le revenu." },
    { question: "Une courbe de Lorenz est :", choix: ["croissante et convexe", "décroissante", "concave", "constante"], bonne: 0, explication: "Chaque tranche ajoutée est plus riche." },
    { question: "En cas d'égalité parfaite, $L(x) =$", choix: ["$x$", "$x^2$", "$1$", "$0$"], bonne: 0, explication: "La diagonale." },
    { question: "$L(0{,}5) = 0{,}2$ signifie :", choix: ["la moitié la plus modeste perçoit $20\\,\\%$ des revenus", "$20\\,\\%$ de la population perçoit la moitié des revenus", "la moitié la plus aisée perçoit $20\\,\\%$", "le revenu médian est $0{,}2$"], bonne: 0, explication: "Lecture d'une courbe de Lorenz." },
    { question: "L'indice de Gini vaut :", choix: ["$1 - 2\\displaystyle\\int_0^1 L(x)\\,\\mathrm{d}x$", "$\\displaystyle\\int_0^1 L(x)\\,\\mathrm{d}x$", "$2\\displaystyle\\int_0^1 L(x)\\,\\mathrm{d}x$", "$L(0{,}5)$"], bonne: 0, explication: "Double de l'aire entre la diagonale et la courbe." },
    { question: "Indice de Gini pour $L(x) = x^2$ :", choix: ["$\\dfrac{1}{3}$", "$\\dfrac{2}{3}$", "$\\dfrac{1}{2}$", "$0$"], bonne: 0, explication: "$1 - \\dfrac{2}{3}$." },
    { question: "Un indice de Gini égal à $0$ correspond à :", choix: ["l'égalité parfaite", "l'inégalité maximale", "un pays pauvre", "un pays riche"], bonne: 0, explication: "$L(x) = x$." },
    { question: "Le pays A a un Gini de $0{,}25$, le pays B de $0{,}45$. Alors :", choix: ["B est plus inégalitaire", "A est plus inégalitaire", "B est plus riche", "A est plus pauvre"], bonne: 0, explication: "Le Gini mesure les inégalités, pas la richesse." },
    { question: "Pour estimer $\\displaystyle\\int_0^1 L$ à partir de quelques points, on utilise :", choix: ["la méthode des trapèzes", "la dérivée", "le logarithme", "la formule de Bayes"], bonne: 0, explication: "Chapitre 12." },
    { question: "Les $10\\,\\%$ les plus aisés perçoivent :", choix: ["$1 - L(0{,}9)$", "$L(0{,}1)$", "$L(0{,}9)$", "$0{,}1$"], bonne: 0, explication: "Les $90\\,\\%$ les plus modestes perçoivent $L(0{,}9)$." },
    { question: "La fonction $\\sqrt{x}$ peut-elle être une courbe de Lorenz ?", choix: ["non, elle est au-dessus de la diagonale", "oui", "non, car $L(1) \\neq 1$", "non, car $L(0) \\neq 0$"], bonne: 0, explication: "Elle est concave et $\\sqrt{x} \\geqslant x$." },
    { question: "En France métropolitaine, l'indice de Gini des niveaux de vie est environ :", choix: ["$0{,}29$", "$0{,}9$", "$0$", "$2{,}9$"], bonne: 0, explication: "INSEE, ordre de grandeur." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Déterminer un décile",
      etapes: ["Ranger les valeurs dans l'ordre croissant ($n$ valeurs).", "Calculer $0{,}1 \\times n$ (ou $0{,}9 \\times n$) et arrondir à l'entier supérieur si besoin : c'est le rang.", "Lire la valeur de ce rang."],
      exemple: "$n = 20$ : $D_1$ est la $2$e valeur, $D_9$ la $18$e."
    },
    {
      titre: "Lire une courbe de Lorenz",
      etapes: ["$L(x)$ : part des revenus des $x$ les plus modestes.", "Les plus aisés : $1 - L(x)$.", "Comparer à la diagonale pour juger les inégalités."],
      exemple: "$L(0{,}9) = 0{,}73$ : les $10\\,\\%$ les plus aisés ont $27\\,\\%$ des revenus."
    },
    {
      titre: "Calculer un indice de Gini",
      etapes: ["Calculer $\\displaystyle\\int_0^1 L(x)\\,\\mathrm{d}x$ (primitive, ou trapèzes sur des données).", "$G = 1 - 2\\displaystyle\\int_0^1 L$.", "Interpréter : plus $G$ est proche de $1$, plus c'est inégalitaire."],
      exemple: "$L(x) = x^4$ : $G = 1 - \\dfrac{2}{5} = 0{,}6$."
    }
  ],
  erreurs: [
    "Oublier de ranger les valeurs avant de chercher un décile.",
    "Confondre $L(0{,}1)$ (les $10\\,\\%$ les plus modestes) et $1 - L(0{,}9)$ (les $10\\,\\%$ les plus aisés).",
    "Prendre $\\displaystyle\\int_0^1 L$ pour l'indice de Gini.",
    "Croire qu'un Gini élevé signifie un pays riche : il mesure les inégalités.",
    "Accepter une courbe au-dessus de la diagonale comme courbe de Lorenz.",
    "Confondre rapport interdécile ($D_9 / D_1$) et différence $D_9 - D_1$."
  ]
};
