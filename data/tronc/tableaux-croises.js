/*
  CHAPITRE : Première tronc commun — Tableaux croisés : deux caractères qualitatifs
  --------------------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme de mathématiques intégré à l'enseignement scientifique de Première générale (BO n° 14 du 2 avril 2026),
  « Analyse de l'information chiffrée », analyse statistique de deux caractères qualitatifs : tableau croisé d'effectifs,
  analyse du croisement par représentation graphique (diagrammes en barres, circulaires) ; utiliser un tableur pour
  représenter des données. Fréquences marginales et conditionnelles (préparent les probabilités conditionnelles, chapitre 7).
  video : vidéos d'Yvan Monka. Générateurs : préfixe qx- dans assets/exercices-tronc.js ; figures "qx-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["tronc-tableaux-croises"] = {
  niveau: "Première tronc commun",
  numero: 5,
  titre: "Tableaux croisés : deux caractères qualitatifs",
  accroche: "Filles ou garçons, bus ou à pied : croiser deux caractères dans un tableau, calculer les bonnes fréquences et comparer des groupes de tailles différentes sans se faire piéger.",

  playlist: "",
  drive: "",
  pdfs: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Le tableau croisé d'effectifs",
      figure: "qx-cours-tableau",
      video: { titre: "Vidéo d'Yvan Monka : calculer une fréquence conditionnelle ou marginale", youtube: "https://youtu.be/SkhjnCoExD8" },
      texte:
        "On étudie une population selon **deux caractères qualitatifs** (par exemple le sexe et le moyen de transport). Le **tableau croisé** donne, dans chaque case, l'effectif des individus qui ont **à la fois** une modalité de chaque caractère.\n\n" +
        "Le tableau ci-contre répartit $180$ élèves de Première : par exemple, $48$ élèves sont des filles qui viennent en bus.",
      exemple: {
        enonce: "Avec ce tableau : combien d'élèves sont des filles qui viennent à pied ? Combien de garçons en tout ?",
        solution: "La case « filles » et « à pied » : $30$. Le total de la ligne « garçons » : $90$."
      }
    },
    {
      titre: "Totaux : les effectifs marginaux",
      video: { titre: "Vidéo d'Yvan Monka : calculer une fréquence conditionnelle ou marginale", youtube: "https://youtu.be/SkhjnCoExD8" },
      texte:
        "La dernière colonne et la dernière ligne contiennent les **totaux** (effectifs **marginaux**) : chaque total de ligne est la somme des cases de la ligne, chaque total de colonne la somme des cases de la colonne. La case en bas à droite est l'**effectif total**.\n\n" +
        "Ces relations permettent de **compléter** un tableau : une case manquante s'obtient en soustrayant les autres cases de la même ligne (ou colonne) de son total.\n\n" +
        "Dans un **tableur**, on calcule un total de ligne avec la formule $\\texttt{=SOMME(B2:D2)}$, puis on la recopie vers le bas.",
      exemple: {
        enonce: "Une ligne contient $25$, $?$ et $18$, avec un total de $70$. Que vaut la case manquante ?",
        solution: "$70 - 25 - 18 = 27$."
      }
    },
    {
      titre: "Fréquences : par rapport à quel total ?",
      video: { titre: "Vidéo d'Yvan Monka : probabilité conditionnelle à l'aide d'un tableau", youtube: "https://youtu.be/JEL4hxtnw0Q" },
      texte:
        "Toute la question est de savoir **par rapport à quel effectif** on calcule :\n\n" +
        "- **fréquence par rapport au total** : effectif d'une case (ou d'une marge) divisé par l'effectif total. « $30$ élèves sur $180$ sont des filles qui viennent à pied », soit $\\dfrac{30}{180} \\approx 16{,}7\\,\\%$ ;\n" +
        "- **fréquence marginale** : un total de ligne ou de colonne divisé par l'effectif total. « $\\dfrac{54}{180} = 30\\,\\%$ des élèves viennent à pied » ;\n" +
        "- **fréquence conditionnelle** : une case divisée par le total de **sa ligne** ou de **sa colonne**. « **Parmi** les filles, $\\dfrac{30}{90} \\approx 33{,}3\\,\\%$ viennent à pied » ; « **parmi** ceux qui viennent à pied, $\\dfrac{30}{54} \\approx 55{,}6\\,\\%$ sont des filles ».\n\n" +
        "Le mot « parmi » (ou « chez les… ») signale une fréquence conditionnelle : le dénominateur est l'effectif de la sous-population.",
      exemple: {
        enonce: "Avec le tableau des élèves, quel pourcentage des élèves qui viennent en scooter sont des garçons ?",
        solution: "Parmi les $42$ élèves en scooter, $30$ sont des garçons : $\\dfrac{30}{42} \\approx 71{,}4\\,\\%$."
      }
    },
    {
      titre: "Comparer des groupes de tailles différentes",
      video: { titre: "Vidéo d'Yvan Monka : calculer une fréquence conditionnelle ou marginale", youtube: "https://youtu.be/SkhjnCoExD8" },
      texte:
        "Pour savoir si un caractère dépend de l'autre, on compare des **fréquences conditionnelles**, jamais des effectifs bruts : un groupe plus nombreux a naturellement plus d'individus dans chaque case.\n\n" +
        "Exemple : dans un dispensaire, $40$ patients vaccinés et $60$ non vaccinés sont malades. On pourrait croire que la maladie touche « plus » les non-vaccinés… mais il y a $800$ vaccinés et $200$ non-vaccinés. Proportions de malades : $\\dfrac{40}{800} = 5\\,\\%$ chez les vaccinés, $\\dfrac{60}{200} = 30\\,\\%$ chez les non-vaccinés. Ici la conclusion va dans le même sens, mais il faut toujours la vérifier avec des proportions.\n\n" +
        "Si les fréquences conditionnelles sont à peu près égales d'un groupe à l'autre, les deux caractères semblent **indépendants** (notion précisée au chapitre 7).",
      exemple: {
        enonce: "Club : $45$ garçons sur $150$ font du handball, $30$ filles sur $60$. Qui en fait le plus, en proportion ?",
        solution: "Garçons : $\\dfrac{45}{150} = 30\\,\\%$ ; filles : $\\dfrac{30}{60} = 50\\,\\%$. Les filles, même si elles sont moins nombreuses en effectif."
      }
    },
    {
      titre: "Représenter le croisement : diagrammes",
      figure: "qx-cours-barres",
      video: { titre: "Vidéo d'Yvan Monka : lire et interpréter un graphique", youtube: "https://youtu.be/CR4lSAfho5A" },
      texte:
        "Un **diagramme en barres groupées** place, pour chaque modalité d'un caractère, une barre par modalité de l'autre (une couleur par groupe, expliquée dans la légende). On compare facilement les effectifs ; pour comparer les proportions, on peut tracer un diagramme circulaire **par groupe** (un disque pour les filles, un pour les garçons).\n\n" +
        "Avec un tableur, on sélectionne le tableau (sans les totaux) et on insère un graphique « histogramme groupé » ou « secteurs ». Les données réelles (Insee, data.gouv) se traitent ainsi.",
      exemple: {
        enonce: "Sur le diagramme des élèves, quel moyen de transport les garçons utilisent-ils le plus ?",
        solution: "Les barres des garçons valent $36$ (bus), $24$ (à pied) et $30$ (scooter) : le bus."
      }
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "qx-lire", titre: "Lire un tableau croisé", etape: "Tableau", nb: 5 },
    { type: "qx-completer", titre: "Compléter un tableau croisé", etape: "Tableau", nb: 5 },
    { type: "qx-frequence", titre: "Fréquences par rapport au total", etape: "Fréquences", nb: 5 },
    { type: "qx-frequence-cond", titre: "Fréquences conditionnelles (« parmi »)", etape: "Fréquences", nb: 5 },
    { type: "qx-comparer", titre: "Comparer deux groupes", etape: "Fréquences", nb: 4 },
    { type: "qx-diagramme", titre: "Lire un diagramme en barres groupées", etape: "Graphiques", nb: 5 },
    { type: "qx-tableur", titre: "Formules de tableur", etape: "Graphiques", nb: 4 },
    { type: "qx-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Une case d'un tableau croisé compte les individus qui ont :", choix: ["une modalité de chaque caractère à la fois", "l'une ou l'autre des deux modalités", "une seule modalité", "aucune des deux modalités"], bonne: 0, explication: "« Et » : au croisement de la ligne et de la colonne." },
    { question: "La case en bas à droite d'un tableau croisé complet donne :", choix: ["l'effectif total", "la plus grande case", "la fréquence totale", "la moyenne"], bonne: 0, explication: "Somme de toutes les cases." },
    { question: "Une ligne contient $12$, $?$ et $20$ avec un total de $50$. La case manquante vaut :", choix: ["$18$", "$32$", "$82$", "$38$"], bonne: 0, explication: "$50 - 12 - 20$." },
    { question: "Sur $200$ élèves, $50$ sont des filles qui font du sport. La fréquence de ce groupe par rapport à l'ensemble est :", choix: ["$25\\,\\%$", "$50\\,\\%$", "$40\\,\\%$", "$20\\,\\%$"], bonne: 0, explication: "$\\dfrac{50}{200}$." },
    { question: "$80$ filles dont $20$ font du sport. Parmi les filles, la part qui fait du sport est :", choix: ["$25\\,\\%$", "$20\\,\\%$", "$80\\,\\%$", "$40\\,\\%$"], bonne: 0, explication: "$\\dfrac{20}{80}$ : on divise par l'effectif des filles." },
    { question: "« Parmi les clients du soir, $30\\,\\%$ choisissent le poisson » est :", choix: ["une fréquence conditionnelle", "une fréquence marginale", "un effectif", "une moyenne"], bonne: 0, explication: "« Parmi » : sous-population de référence." },
    { question: "Une fréquence marginale se calcule avec :", choix: ["un total de ligne ou de colonne divisé par l'effectif total", "une case divisée par sa ligne", "une case divisée par sa colonne", "deux cases"], bonne: 0, explication: "Les marges sont les totaux." },
    { question: "Groupe A : $30$ réussites sur $50$. Groupe B : $45$ réussites sur $90$. Le meilleur taux de réussite est :", choix: ["celui de A ($60\\,\\%$)", "celui de B ($50\\,\\%$)", "celui de B, car $45 > 30$", "le même"], bonne: 0, explication: "On compare des proportions, pas des effectifs." },
    { question: "« $20\\,\\%$ des élèves sont des filles qui viennent en bus » et « $40\\,\\%$ des filles viennent en bus » :", choix: ["ne sont pas calculés par rapport au même effectif", "sont contradictoires", "disent la même chose", "sont impossibles ensemble"], bonne: 0, explication: "Le premier sur tous les élèves, le second sur les filles." },
    { question: "Dans un tableur, la formule qui additionne les cellules B2 à D2 est :", choix: ["$\\texttt{=SOMME(B2:D2)}$", "$\\texttt{=SOMME(B2;D2)}$", "$\\texttt{SOMME(B2:D2)}$", "$\\texttt{=B2:D2}$"], bonne: 0, explication: "Le « : » désigne une plage de cellules, et une formule commence par « = »." },
    { question: "Le total de la colonne B est en B4. La fréquence de la cellule B2 parmi cette colonne s'obtient par :", choix: ["$\\texttt{=B2/B4}$", "$\\texttt{=B4/B2}$", "$\\texttt{=B2*B4}$", "$\\texttt{=B2-B4}$"], bonne: 0, explication: "Effectif divisé par l'effectif de référence." },
    { question: "Pour comparer la répartition des moyens de transport chez les filles et chez les garçons, le plus adapté est :", choix: ["un diagramme circulaire par groupe", "un seul diagramme circulaire de tous les élèves", "un histogramme des âges", "un nuage de points"], bonne: 0, explication: "Un disque par groupe montre les proportions de chaque groupe." },
    { question: "Dans un diagramme en barres groupées, la légende indique :", choix: ["à quel groupe correspond chaque couleur", "l'effectif total", "la moyenne", "l'échelle"], bonne: 0, explication: "Chaque couleur est une modalité du second caractère." },
    { question: "Si, dans chaque groupe, la même proportion d'individus a une modalité, les deux caractères semblent :", choix: ["indépendants", "liés", "égaux", "incompatibles"], bonne: 0, explication: "L'appartenance au groupe ne change pas la proportion." },
    { question: "Sur $300$ habitants, $120$ sont favorables, dont $80$ à Grande-Terre. Parmi les favorables, la part de Grande-Terre est d'environ :", choix: ["$66{,}7\\,\\%$", "$40\\,\\%$", "$26{,}7\\,\\%$", "$80\\,\\%$"], bonne: 0, explication: "$\\dfrac{80}{120}$." },
    { question: "La somme des totaux des colonnes vaut :", choix: ["l'effectif total", "le nombre de colonnes", "$100$", "le total de la première ligne"], bonne: 0, explication: "Chaque individu est compté une fois." },
    { question: "Les fréquences conditionnelles d'une même ligne (par rapport au total de la ligne) ont pour somme :", choix: ["$100\\,\\%$", "l'effectif de la ligne", "la fréquence marginale de la ligne", "$50\\,\\%$"], bonne: 0, explication: "Elles répartissent toute la ligne." },
    { question: "Pour savoir si les non-vaccinés sont plus souvent malades, on compare :", choix: ["la proportion de malades chez les vaccinés et chez les non-vaccinés", "le nombre de malades vaccinés et non vaccinés", "le nombre de vaccinés et de non-vaccinés", "le total des malades"], bonne: 0, explication: "Fréquences conditionnelles : les groupes n'ont pas la même taille." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Lire et compléter un tableau croisé",
      etapes: [
        "Repérer les deux caractères : un en lignes, l'autre en colonnes.",
        "Une case : les individus qui ont les deux modalités à la fois.",
        "Les totaux : somme des cases de la ligne ou de la colonne.",
        "Case manquante : total moins les autres cases de la même ligne (ou colonne)."
      ],
      exemple: "Ligne $25$ ; $?$ ; $18$, total $70$ : $? = 70 - 25 - 18 = 27$."
    },
    {
      titre: "Choisir le bon dénominateur",
      etapes: [
        "Lire la question : « parmi… », « chez les… » ? C'est une fréquence conditionnelle.",
        "Sans condition : diviser par l'effectif total.",
        "Avec condition : diviser par le total de la ligne ou de la colonne de la condition.",
        "Écrire le résultat en pourcentage, arrondi si besoin."
      ],
      exemple: "Parmi les $90$ filles, $30$ viennent à pied : $\\dfrac{30}{90} \\approx 33{,}3\\,\\%$."
    },
    {
      titre: "Comparer deux groupes",
      figure: "qx-cours-barres",
      etapes: [
        "Calculer, dans chaque groupe, la fréquence conditionnelle de la modalité étudiée.",
        "Comparer ces fréquences, pas les effectifs.",
        "Conclure par une phrase dans le contexte.",
        "Si les fréquences sont proches, le caractère ne semble pas dépendre du groupe."
      ],
      exemple: "Handball : $30\\,\\%$ des garçons, $50\\,\\%$ des filles : les filles en font plus, en proportion."
    }
  ],
  erreurs: [
    "Diviser par l'effectif total pour une fréquence conditionnelle (« parmi »).",
    "Diviser par le total de la ligne alors que la condition porte sur la colonne.",
    "Comparer des effectifs bruts entre des groupes de tailles différentes.",
    "Confondre « $30\\,\\%$ des filles » et « $30\\,\\%$ des élèves sont des filles qui… ».",
    "Oublier de soustraire **toutes** les autres cases pour compléter un tableau.",
    "Oublier le signe « = » au début d'une formule de tableur."
  ]
};
