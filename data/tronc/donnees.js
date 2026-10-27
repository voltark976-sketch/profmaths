/*
  CHAPITRE : Première tronc commun — Automatismes : lire et résumer des données
  ----------------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme de mathématiques intégré à l'enseignement scientifique de Première générale (BO n° 14 du 2 avril 2026),
  partie « Automatismes », bloc « Statistiques » : lire un graphique, un histogramme, un diagramme en barres ou circulaire,
  un diagramme en boîte (origine, unités, échelles) ; passer du graphique aux données et inversement ; calculer et
  interpréter des indicateurs (moyenne, médiane, quartiles, étendue, écart interquartile) ; comparer deux séries.
  video : vidéos de la chaîne et d'Yvan Monka. Générateurs : préfixe qs- dans assets/exercices-tronc.js ; figures "qs-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["tronc-donnees"] = {
  niveau: "Première tronc commun",
  numero: 4,
  titre: "Automatismes : lire et résumer des données",
  accroche: "Diagrammes en barres, circulaires, histogrammes, boîtes : savoir les lire sans se faire piéger, puis résumer une série par quelques nombres bien choisis.",

  playlist: "",
  drive: "",
  pdfs: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Lire un graphique sans se tromper",
      figure: "qs-cours-barres",
      video: { titre: "Vidéo d'Yvan Monka : lire et interpréter un graphique", youtube: "https://youtu.be/CR4lSAfho5A" },
      texte:
        "Avant de lire un graphique, on repère :\n\n" +
        "- ce que représente chaque **axe** et ses **unités** (milliers ? pourcentages ? années ?) ;\n" +
        "- l'**échelle** : de combien en combien vont les graduations ;\n" +
        "- l'**origine** de l'axe vertical : si elle ne vaut pas $0$, les différences de hauteur paraissent plus grandes qu'elles ne sont (piège fréquent dans les médias).\n\n" +
        "Dans un **diagramme en barres**, la hauteur de chaque barre donne l'effectif de la catégorie. Dans un **histogramme** à classes de même amplitude, la hauteur de chaque rectangle donne l'effectif de la classe ; une classe $[10\\,;20[$ contient $10$ mais pas $20$. Une **courbe** chronologique montre l'évolution d'une grandeur au cours du temps.",
      exemple: {
        enonce: "Sur le diagramme, combien d'élèves viennent en voiture ou en scooter ? Quelle proportion sur l'ensemble ?",
        solution: "$12 + 10 = 22$ élèves sur $6 + 12 + 9 + 3 + 10 = 40$, soit $\\dfrac{22}{40} = 55\\,\\%$."
      }
    },
    {
      titre: "Diagramme circulaire",
      figure: "qs-cours-circulaire",
      video: { titre: "Vidéo d'Yvan Monka : construire un diagramme circulaire", youtube: "https://youtu.be/gpCY_3zq3bk" },
      texte:
        "Dans un **diagramme circulaire**, chaque secteur est proportionnel à l'effectif de sa catégorie. Le disque entier correspond à $100\\,\\%$, soit $360°$.\n\n" +
        "- Du pourcentage à l'angle : $p\\,\\% \\to \\dfrac{p}{100} \\times 360°$. Ainsi $25\\,\\%$ donne $90°$.\n" +
        "- De l'angle au pourcentage : $\\alpha° \\to \\dfrac{\\alpha}{360} \\times 100$. Ainsi $72°$ donne $20\\,\\%$.\n" +
        "- Du pourcentage à l'effectif : on applique le pourcentage à l'effectif total.\n\n" +
        "Ce diagramme montre bien des **parts d'un tout**, mais il ne convient pas pour comparer des évolutions.",
      exemple: {
        enonce: "$600$ élèves ont répondu ; le secteur « bus » mesure $144°$. Combien d'élèves prennent le bus ?",
        solution: "$\\dfrac{144}{360} = 0{,}4$, soit $40\\,\\%$ ; $600 \\times 0{,}4 = 240$ élèves."
      }
    },
    {
      titre: "Moyenne et médiane",
      video: { titre: "Vidéo de ton prof : indicateurs statistiques, moyenne, médiane, quartiles", youtube: "https://youtu.be/ncb1y7IwBZA" },
      texte:
        "**Moyenne** $= \\dfrac{\\text{somme des valeurs}}{\\text{effectif total}}$. Quand la série est donnée par un tableau d'effectifs, chaque valeur compte autant de fois que son effectif : $\\bar{x} = \\dfrac{n_1 x_1 + n_2 x_2 + \\dots + n_p x_p}{N}$ (moyenne **pondérée**).\n\n" +
        "**Médiane** : on **range** les valeurs dans l'ordre croissant ; c'est la valeur du milieu (effectif impair) ou la moyenne des deux valeurs centrales (effectif pair). Au moins la moitié des valeurs lui sont inférieures ou égales, au moins la moitié supérieures ou égales.\n\n" +
        "La moyenne est sensible aux **valeurs extrêmes**, la médiane beaucoup moins : pour des salaires, la médiane décrit souvent mieux la situation d'un salarié « ordinaire ».",
      exemple: {
        enonce: "Notes : $8$ ; $12$ ; $15$ ; $9$ ; $16$ ; $12$. Moyenne et médiane ?",
        solution: "Moyenne : $\\dfrac{72}{6} = 12$. Rangée : $8$ ; $9$ ; $12$ ; $12$ ; $15$ ; $16$ : médiane $\\dfrac{12 + 12}{2} = 12$."
      }
    },
    {
      titre: "Quartiles et diagramme en boîte",
      figure: "qs-cours-boite",
      video: { titre: "Vidéo d'Yvan Monka : calculer les quartiles", youtube: "https://youtu.be/Yjh-9nMVmEw" },
      texte:
        "Sur la série **rangée** de $N$ valeurs :\n\n" +
        "- le **premier quartile** $Q_1$ est la plus petite valeur telle qu'au moins $25\\,\\%$ des valeurs lui soient inférieures ou égales : c'est la valeur de rang $\\dfrac{N}{4}$, arrondi à l'entier supérieur ;\n" +
        "- le **troisième quartile** $Q_3$ : même chose avec $75\\,\\%$, rang $\\dfrac{3N}{4}$ arrondi à l'entier supérieur.\n\n" +
        "Le **diagramme en boîte** résume la série : les moustaches vont du minimum au maximum, la boîte de $Q_1$ à $Q_3$, et un trait marque la médiane. Il ne donne **pas** la moyenne.\n\n" +
        "**Dispersion** : l'**étendue** est $\\max - \\min$ ; l'**écart interquartile** $Q_3 - Q_1$ (la longueur de la boîte) mesure la dispersion de la moitié centrale des valeurs.",
      exemple: {
        enonce: "Série rangée de $10$ valeurs : $3$ ; $5$ ; $6$ ; $8$ ; $9$ ; $11$ ; $12$ ; $14$ ; $15$ ; $20$. Donne $Q_1$, $Q_3$ et l'écart interquartile.",
        solution: "$\\dfrac{10}{4} = 2{,}5$ : $Q_1$ est la 3e valeur, $6$. $\\dfrac{30}{4} = 7{,}5$ : $Q_3$ est la 8e valeur, $14$. Écart interquartile : $14 - 6 = 8$."
      }
    },
    {
      titre: "Comparer deux séries",
      figure: "qs-cours-comparer",
      video: { titre: "Vidéo de ton prof : comparer deux séries avec des boîtes à moustaches", youtube: "https://youtu.be/ZuVX12i3Wp4" },
      texte:
        "Pour comparer deux séries, on compare un indicateur de **position** (médiane ou moyenne) et un indicateur de **dispersion** (écart interquartile ou étendue).\n\n" +
        "Sur la figure, la série B a une médiane un peu plus grande ($13$ contre $12$), mais elle est beaucoup plus dispersée : écart interquartile $10$ contre $4$. Les valeurs de A sont plus regroupées autour de la médiane.\n\n" +
        "Deux diagrammes en boîte placés sur le même axe permettent cette comparaison d'un coup d'œil.",
      exemple: {
        enonce: "Classe A : médiane $11$, $Q_1 = 9$, $Q_3 = 13$. Classe B : médiane $11$, $Q_1 = 6$, $Q_3 = 16$. Que dire ?",
        solution: "Même médiane, mais B est plus hétérogène : écart interquartile $10$ contre $4$ pour A."
      }
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "qs-barres", titre: "Lire un diagramme en barres", etape: "Lire", nb: 5 },
    { type: "qs-histogramme", titre: "Lire un histogramme", etape: "Lire", nb: 5 },
    { type: "qs-circulaire", titre: "Diagramme circulaire", etape: "Lire", nb: 5 },
    { type: "qs-courbe", titre: "Du graphique aux données", etape: "Lire", nb: 4 },
    { type: "qs-moyenne", titre: "Calculer une moyenne", etape: "Résumer", nb: 4 },
    { type: "qs-effectifs", titre: "Tableau d'effectifs : moyenne pondérée, fréquences", etape: "Résumer", nb: 5 },
    { type: "qs-mediane", titre: "Calculer une médiane", etape: "Résumer", nb: 4 },
    { type: "qs-quartiles", titre: "Quartiles d'une série", etape: "Résumer", nb: 5 },
    { type: "qs-boite", titre: "Lire un diagramme en boîte", etape: "Boîtes", nb: 5 },
    { type: "qs-comparer-boites", titre: "Comparer deux séries", etape: "Boîtes", nb: 4 },
    { type: "qs-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Dans un diagramme circulaire, $50\\,\\%$ correspond à un angle de :", choix: ["$180°$", "$50°$", "$90°$", "$360°$"], bonne: 0, explication: "La moitié de $360°$." },
    { question: "Un secteur de $54°$ représente :", choix: ["$15\\,\\%$", "$54\\,\\%$", "$5{,}4\\,\\%$", "$20\\,\\%$"], bonne: 0, explication: "$\\dfrac{54}{360} = 0{,}15$." },
    { question: "Sur $500$ personnes, un secteur de $20\\,\\%$ représente :", choix: ["$100$ personnes", "$20$ personnes", "$250$ personnes", "$72$ personnes"], bonne: 0, explication: "$500 \\times 0{,}2$." },
    { question: "Dans un histogramme à classes de même amplitude, l'effectif d'une classe se lit :", choix: ["sur la hauteur du rectangle", "sur la largeur du rectangle", "sur l'axe horizontal", "au milieu de la classe"], bonne: 0, explication: "Hauteur lue sur l'axe vertical." },
    { question: "La classe $[20\\,;30[$ contient :", choix: ["$20$ mais pas $30$", "$30$ mais pas $20$", "$20$ et $30$", "ni $20$ ni $30$"], bonne: 0, explication: "Crochet fermé en $20$, ouvert en $30$." },
    { question: "Un axe vertical qui ne commence pas à $0$ :", choix: ["peut exagérer visuellement les écarts", "rend le graphique faux", "n'a aucun effet", "diminue toujours les écarts"], bonne: 0, explication: "Il faut toujours vérifier l'origine." },
    { question: "La moyenne de $5$ ; $7$ ; $12$ est :", choix: ["$8$", "$7$", "$24$", "$12$"], bonne: 0, explication: "$\\dfrac{24}{3} = 8$." },
    { question: "Valeurs $0$, $1$, $2$ d'effectifs $3$, $5$, $2$. La moyenne est :", choix: ["$0{,}9$", "$1$", "$3{,}33$", "$9$"], bonne: 0, explication: "$\\dfrac{0 \\times 3 + 1 \\times 5 + 2 \\times 2}{10} = \\dfrac{9}{10}$." },
    { question: "La médiane de $4$ ; $9$ ; $2$ ; $7$ ; $5$ est :", choix: ["$5$", "$2$", "$5{,}4$", "$7$"], bonne: 0, explication: "Rangée : $2$ ; $4$ ; $5$ ; $7$ ; $9$." },
    { question: "La médiane de $3$ ; $6$ ; $8$ ; $10$ est :", choix: ["$7$", "$6$", "$8$", "$6{,}75$"], bonne: 0, explication: "Moyenne des deux valeurs centrales : $\\dfrac{6 + 8}{2}$." },
    { question: "Pour une série de $20$ valeurs rangées, $Q_1$ est :", choix: ["la 5e valeur", "la 4e valeur", "la 6e valeur", "la moyenne des 5e et 6e"], bonne: 0, explication: "$\\dfrac{20}{4} = 5$." },
    { question: "Pour une série de $13$ valeurs rangées, $Q_3$ est :", choix: ["la 10e valeur", "la 9e valeur", "la 11e valeur", "la 7e valeur"], bonne: 0, explication: "$\\dfrac{39}{4} = 9{,}75$, arrondi à $10$." },
    { question: "L'écart interquartile est :", choix: ["$Q_3 - Q_1$", "$\\max - \\min$", "$Q_1 + Q_3$", "la médiane moins $Q_1$"], bonne: 0, explication: "Longueur de la boîte." },
    { question: "Un diagramme en boîte ne permet pas de lire :", choix: ["la moyenne", "la médiane", "le minimum", "le troisième quartile"], bonne: 0, explication: "Il montre min, $Q_1$, médiane, $Q_3$, max." },
    { question: "La boîte d'un diagramme en boîte contient environ :", choix: ["la moitié des valeurs", "le quart des valeurs", "toutes les valeurs", "les trois quarts des valeurs"], bonne: 0, explication: "De $Q_1$ à $Q_3$ : la moitié centrale." },
    { question: "Si on remplace la plus grande valeur d'une série par une valeur dix fois plus grande :", choix: ["la moyenne augmente, la médiane ne change pas", "la médiane augmente, la moyenne ne change pas", "les deux sont multipliées par $10$", "rien ne change"], bonne: 0, explication: "La médiane ne dépend que du rang central." },
    { question: "Deux séries ont la même médiane ; la série A a un écart interquartile de $3$, la série B de $9$. Alors :", choix: ["B est plus dispersée que A", "A est plus dispersée que B", "elles ont la même moyenne", "B a de plus grandes valeurs"], bonne: 0, explication: "L'écart interquartile mesure la dispersion." },
    { question: "L'étendue de $12$ ; $5$ ; $9$ ; $20$ ; $14$ est :", choix: ["$15$", "$20$", "$12$", "$8$"], bonne: 0, explication: "$20 - 5$." },
    { question: "Sur $40$ élèves, $14$ viennent à pied. La fréquence correspondante est :", choix: ["$35\\,\\%$", "$14\\,\\%$", "$40\\,\\%$", "$26\\,\\%$"], bonne: 0, explication: "$\\dfrac{14}{40} = 0{,}35$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Lire un graphique",
      figure: "qs-cours-barres",
      etapes: [
        "Lire le titre, les axes, les unités.",
        "Repérer l'échelle et l'origine de l'axe vertical.",
        "Lire chaque valeur sur l'axe adapté.",
        "Répondre à la question (total, différence, proportion) avec l'unité."
      ],
      exemple: "Barres $6$, $12$, $9$ : total $27$ ; part de la deuxième catégorie $\\dfrac{12}{27} \\approx 44\\,\\%$."
    },
    {
      titre: "Diagramme circulaire",
      figure: "qs-cours-circulaire",
      etapes: [
        "$100\\,\\%$ correspond à $360°$.",
        "Pourcentage vers angle : $\\times 3{,}6$.",
        "Angle vers pourcentage : $\\div 3{,}6$.",
        "Pourcentage vers effectif : appliquer le pourcentage à l'effectif total."
      ],
      exemple: "$35\\,\\%$ : $35 \\times 3{,}6 = 126°$."
    },
    {
      titre: "Calculer médiane et quartiles",
      figure: "qs-cours-boite",
      etapes: [
        "Ranger la série dans l'ordre croissant et compter l'effectif $N$.",
        "Médiane : valeur du milieu, ou moyenne des deux valeurs centrales si $N$ est pair.",
        "$Q_1$ : rang $\\dfrac{N}{4}$ arrondi à l'entier supérieur ; $Q_3$ : rang $\\dfrac{3N}{4}$ arrondi à l'entier supérieur.",
        "Interpréter : au moins $25\\,\\%$ des valeurs sont inférieures ou égales à $Q_1$, au moins $75\\,\\%$ à $Q_3$."
      ],
      exemple: "$N = 11$ : médiane 6e valeur, $Q_1$ 3e valeur ($2{,}75 \\to 3$), $Q_3$ 9e valeur ($8{,}25 \\to 9$)."
    },
    {
      titre: "Comparer deux séries",
      figure: "qs-cours-comparer",
      etapes: [
        "Comparer les positions : médianes (ou moyennes).",
        "Comparer les dispersions : écarts interquartiles (ou étendues).",
        "Conclure par une phrase dans le contexte.",
        "Se méfier des valeurs extrêmes, qui influencent la moyenne et l'étendue."
      ],
      exemple: "Médianes $12$ et $13$, écarts interquartiles $4$ et $10$ : niveaux proches, mais la seconde série est bien plus hétérogène."
    }
  ],
  erreurs: [
    "Oublier de ranger la série avant de chercher la médiane ou les quartiles.",
    "Prendre la valeur du milieu de la liste non rangée.",
    "Calculer une moyenne simple au lieu d'une moyenne pondérée avec un tableau d'effectifs.",
    "Confondre l'angle d'un secteur et son pourcentage.",
    "Lire la moyenne sur un diagramme en boîte : il ne la donne pas.",
    "Confondre étendue ($\\max - \\min$) et écart interquartile ($Q_3 - Q_1$).",
    "Ne pas regarder l'origine et l'échelle de l'axe vertical."
  ]
};
