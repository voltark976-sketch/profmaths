/*
  CHAPITRE : 6e — Organisation de données et probabilités
  ---------------------------------------------------------
  Programme de mathématiques du cycle 3 (BO n° 16 du 17 avril 2025), en vigueur en 6e depuis la rentrée 2025 :
  - organisation et gestion de données : lire un tableau, un diagramme en barres, un diagramme circulaire ou une courbe ;
    construire un tableau simple ; filtrer les données d'un tableau selon un critère ; mener une enquête ;
  - probabilités : une probabilité est un nombre entre 0 et 1 ; calculer des probabilités en situation d'équiprobabilité
    (« a chances sur b » devient a/b) ; comparer les résultats d'une expérience répétée à une probabilité calculée.
    Le vocabulaire (expérience, issue, évènement) peut être employé, mais n'est pas exigé des élèves.
  Mêmes règles d'écriture que data/sixieme/nombres-entiers-decimaux.js.
  figure : "g6-barres", "g6-circulaire" ou "g6-courbe" (assets/exercices-college.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["sixieme-donnees-probabilites"] = {
  niveau: "6e",
  numero: 8,
  titre: "Organisation de données et probabilités",
  accroche: "Lire des tableaux, des diagrammes et des courbes, puis mesurer le hasard : chances, probabilités et fréquences.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : tableaux, graphiques et probabilités (PDF)", url: "https://www.maths-et-tiques.fr/telech/25Tab_Graph.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : gestion de données (Yvan Monka)", url: "https://youtu.be/_BxvQGxtBE4", type: "video" },
    { titre: "Le cours en vidéo : probabilités (Yvan Monka)", url: "https://youtu.be/g9CT15Tz7TI", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Lire et construire un tableau",
      video: { titre: "Vidéo d'Yvan Monka : réaliser un tableau à double entrée", youtube: "https://youtu.be/33fSc9-24-A" },
      texte:
        "Un **tableau** range des données en lignes et en colonnes, avec un titre pour chacune.\n\n" +
        "Dans un tableau **à double entrée**, on lit une donnée au **croisement** d'une ligne et d'une colonne. On peut additionner une ligne ou une colonne pour avoir un total.\n\n" +
        "On peut aussi **filtrer** les données : ne garder que celles qui vérifient un critère (par exemple, les classes qui ont plus de $10$ élèves venant en bus).",
      exemple: {
        enonce: "Combien d'élèves de 6e B viennent à pied ? Combien d'élèves viennent en bus dans les deux classes ?",
        solution: "Au croisement de « 6e B » et « À pied » : $11$ élèves.\n\nLigne « Bus » : $12 + 9 = 21$ élèves.",
        tableau: { lignes: [["", "\\text{6e A}", "\\text{6e B}"], ["\\text{Bus}", "12", "9"], ["\\text{À pied}", "8", "11"], ["\\text{Voiture}", "5", "6"]] }
      }
    },
    {
      titre: "Le diagramme en barres",
      video: { titre: "Vidéo d'Yvan Monka : lire un diagramme en barres", youtube: "https://youtu.be/aEPTqT8aAc0" },
      texte:
        "Dans un **diagramme en barres**, chaque catégorie a une barre ; la **hauteur** de la barre donne la valeur.\n\n" +
        "Pour lire une valeur, on va du haut de la barre jusqu'à l'axe vertical, en regardant bien **la graduation** (ici de $2$ en $2$).\n\n" +
        "Le diagramme permet de comparer d'un coup d'œil : la barre la plus haute est la catégorie la plus nombreuse.",
      figure: "g6-barres",
      exemple: {
        enonce: "Sport préféré des élèves de 6e B : combien d'élèves préfèrent la natation ? Combien d'élèves de plus préfèrent le foot plutôt que la danse ?",
        solution: "Natation : $7$ élèves.\n\nFoot : $9$ ; danse : $4$. Différence : $9 - 4 = 5$ élèves."
      }
    },
    {
      titre: "Le diagramme circulaire",
      video: { titre: "Vidéo d'Yvan Monka : lire un diagramme circulaire", youtube: "https://youtu.be/grV-ArNnua0" },
      texte:
        "Dans un **diagramme circulaire**, le disque entier représente **le tout**, et chaque part (secteur) représente une catégorie.\n\n" +
        "On compare chaque part au disque : la moitié, le quart, le tiers…\n\n" +
        "Sur la figure, la moitié des élèves vient à pied, un quart en bus, et un huitième en voiture comme à vélo.",
      figure: "g6-circulaire",
      exemple: {
        enonce: "Le collège compte $480$ élèves. D'après le diagramme, combien viennent en bus ? Combien viennent à vélo ?",
        solution: "Bus : le quart de $480$, soit $480 \\div 4 = 120$ élèves.\n\nVélo : un huitième de $480$, soit $480 \\div 8 = 60$ élèves."
      }
    },
    {
      titre: "La courbe",
      video: { titre: "Vidéo d'Yvan Monka : représenter des données dans un graphique", youtube: "https://youtu.be/qGM1V5Z-roo" },
      texte:
        "Une **courbe** montre comment une grandeur évolue, souvent au cours du temps : ici, la température à Mamoudzou au fil d'une journée.\n\n" +
        "- Pour lire une valeur : on part de l'axe horizontal (l'heure), on monte jusqu'au point, puis on lit l'axe vertical (la température).\n" +
        "- Quand la courbe monte, la température augmente ; quand elle descend, elle baisse.",
      figure: "g6-courbe",
      exemple: {
        enonce: "Quelle température fait-il à $10$ h ? À quelle heure fait-il le plus chaud ?",
        solution: "À $10$ h : $29$ °C.\n\nLe point le plus haut est à $31$ °C, atteint à $12$ h et à $14$ h."
      }
    },
    {
      titre: "Le hasard et les probabilités",
      video: { titre: "Vidéo d'Yvan Monka : résoudre un problème lié au hasard", youtube: "https://youtu.be/6EtRH4udcKY" },
      texte:
        "Lancer un dé, tirer une boule dans un sac sans regarder : ce sont des **expériences aléatoires**, dont on ne peut pas prévoir le résultat.\n\n" +
        "La **probabilité** d'un évènement mesure ses chances de se produire. C'est un nombre **entre $0$ et $1$** :\n\n" +
        "- $0$ : l'évènement est **impossible** (obtenir $7$ avec un dé à six faces) ;\n" +
        "- $1$ : il est **certain** (obtenir un nombre entre $1$ et $6$) ;\n" +
        "- entre les deux, il est possible sans être certain.\n\n" +
        "On peut l'écrire sous forme de fraction, de nombre décimal ou de pourcentage : $\\dfrac{1}{2} = 0{,}5 = 50$ %.",
      exemple: {
        enonce: "On tire au hasard une carte parmi les lettres du mot « MATHEMATIQUES ». Quelles lettres ont le plus de chances de sortir ? A-t-on plus de chances d'obtenir une consonne ou une voyelle ?",
        solution: "M, A, T et E apparaissent deux fois : ce sont les plus probables.\n\nIl y a $7$ consonnes et $6$ voyelles sur $13$ lettres : une consonne a un peu plus de chances."
      }
    },
    {
      titre: "Calculer une probabilité",
      video: { titre: "Vidéo d'Yvan Monka : effectuer des calculs de probabilités très simples", youtube: "https://youtu.be/a9Mb5v7Z4Mw" },
      texte:
        "Quand toutes les issues ont **la même chance** de se produire (dé équilibré, boules indiscernables…) :\n\n" +
        "**probabilité $=$ nombre d'issues favorables $\\div$ nombre total d'issues**.\n\n" +
        "« $3$ chances sur $7$ » s'écrit $\\dfrac{3}{7}$.\n\n" +
        "Obtenir $2$ avec un dé : $1$ issue sur $6$, probabilité $\\dfrac{1}{6}$. Obtenir un nombre pair : $3$ issues ($2$, $4$, $6$) sur $6$, probabilité $\\dfrac{3}{6} = \\dfrac{1}{2}$.",
      exemple: {
        enonce: "Un sac contient $3$ boules vertes et $4$ boules jaunes. On tire une boule au hasard. Quelle est la probabilité qu'elle soit verte ?",
        solution: "$3$ boules vertes sur $3 + 4 = 7$ boules : la probabilité est $\\dfrac{3}{7}$."
      }
    },
    {
      titre: "Fréquence et probabilité",
      texte:
        "On lance un dé $600$ fois et on obtient $6$ en tout $97$ fois. La **fréquence** du $6$ est $\\dfrac{97}{600}$, soit environ $0{,}16$.\n\n" +
        "La probabilité d'obtenir $6$ est $\\dfrac{1}{6} \\approx 0{,}17$. Quand on répète une expérience **un grand nombre de fois**, la fréquence se rapproche de la probabilité, sans être forcément égale.\n\n" +
        "Le dé n'a pas de mémoire : après plusieurs $6$, le prochain lancer a toujours $1$ chance sur $6$ de donner $6$.",
      exemple: {
        enonce: "Un sac contient $4$ boules. On tire une boule, on la remet, et on recommence $400$ fois : $102$ rouges, $201$ bleues, $97$ vertes. Quel est le contenu probable du sac ?",
        solution: "Chaque boule sort environ $400 \\div 4 = 100$ fois. Les bleues sortent environ $200$ fois : il y a sans doute $2$ bleues, $1$ rouge et $1$ verte."
      }
    }
  ],

  videosNote: "Méthodes expliquées pas à pas par Yvan Monka (maths-et-tiques).",
  videos: [
    { titre: "Construire un tableau", type: "Tableau", youtube: "https://youtu.be/2yOpmEcbS_Q" }
  ],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "g6-tableau", titre: "Lire et filtrer un tableau", etape: "Organisation de données", nb: 5 },
    { type: "g6-barres", titre: "Lire un diagramme en barres", etape: "Organisation de données", nb: 5 },
    { type: "g6-circulaire", titre: "Lire un diagramme circulaire", etape: "Organisation de données", nb: 5 },
    { type: "g6-courbe", titre: "Lire une courbe", etape: "Organisation de données", nb: 5 },
    { type: "g6-proba-vocab", titre: "Impossible, possible, certain", etape: "Probabilités", nb: 5 },
    { type: "g6-proba-calcul", titre: "Calculer une probabilité", etape: "Probabilités", nb: 6 },
    { type: "g6-frequence", titre: "Fréquences et probabilités", etape: "Probabilités", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Dans un tableau à double entrée, une donnée se lit :", choix: ["au croisement d'une ligne et d'une colonne", "toujours dans la dernière ligne", "en additionnant toute la colonne", "dans le titre du tableau"], bonne: 0, explication: "On repère la ligne et la colonne, la donnée est à leur croisement." },
    { question: "Dans le diagramme, combien d'élèves préfèrent le foot ?", figure: "g6-barres", choix: ["$9$", "$8$", "$10$", "$4$"], bonne: 0, explication: "La barre « Foot » monte jusqu'à $9$ (les graduations vont de $2$ en $2$)." },
    { question: "Dans le diagramme, combien d'élèves ont répondu en tout ?", figure: "g6-barres", choix: ["$25$", "$9$", "$4$", "$20$"], bonne: 0, explication: "$9 + 5 + 7 + 4 = 25$." },
    { question: "Dans le diagramme circulaire, quelle fraction des élèves vient à pied ?", figure: "g6-circulaire", choix: ["$\\dfrac{1}{2}$", "$\\dfrac{1}{4}$", "$\\dfrac{1}{3}$", "$\\dfrac{3}{4}$"], bonne: 0, explication: "La part « À pied » occupe la moitié du disque." },
    { question: "Le collège compte $480$ élèves. D'après le diagramme circulaire, combien viennent en bus ?", figure: "g6-circulaire", choix: ["$120$", "$240$", "$60$", "$48$"], bonne: 0, explication: "Le bus représente un quart du disque : $480 \\div 4 = 120$." },
    { question: "D'après la courbe, quelle température fait-il à $8$ h ?", figure: "g6-courbe", choix: ["$26$ °C", "$24$ °C", "$29$ °C", "$8$ °C"], bonne: 0, explication: "Au-dessus de $8$ h, le point est à $26$ °C." },
    { question: "D'après la courbe, entre $14$ h et $18$ h, la température :", figure: "g6-courbe", choix: ["baisse", "monte", "reste la même", "double"], bonne: 0, explication: "La courbe descend : de $31$ °C à $27$ °C." },
    { question: "Une probabilité est toujours :", choix: ["un nombre entre $0$ et $1$", "un nombre entier", "plus grande que $1$", "un pourcentage plus grand que $100$ %"], bonne: 0, explication: "$0$ pour l'impossible, $1$ pour le certain, et entre les deux pour le reste." },
    { question: "Obtenir $7$ en lançant un dé à six faces est :", choix: ["impossible", "certain", "possible", "très probable"], bonne: 0, explication: "Aucune face ne porte le $7$ : sa probabilité est $0$." },
    { question: "La probabilité d'obtenir $2$ avec un dé équilibré à six faces est :", choix: ["$\\dfrac{1}{6}$", "$\\dfrac{2}{6}$", "$\\dfrac{1}{2}$", "$2$"], bonne: 0, explication: "$1$ issue favorable sur $6$." },
    { question: "La probabilité d'obtenir un nombre pair avec un dé équilibré est :", choix: ["$\\dfrac{1}{2}$", "$\\dfrac{1}{6}$", "$\\dfrac{2}{6}$", "$\\dfrac{4}{6}$"], bonne: 0, explication: "$2$, $4$, $6$ : $3$ issues sur $6$, soit $\\dfrac{3}{6} = \\dfrac{1}{2}$." },
    { question: "Un sac contient $3$ boules vertes et $4$ jaunes. La probabilité de tirer une verte est :", choix: ["$\\dfrac{3}{7}$", "$\\dfrac{3}{4}$", "$\\dfrac{4}{7}$", "$\\dfrac{1}{3}$"], bonne: 0, explication: "$3$ vertes sur $7$ boules en tout. $\\dfrac{3}{4}$ divise par le nombre de jaunes, ce qui est faux." },
    { question: "Une roue a $12$ secteurs égaux dont $3$ jaunes. La probabilité de s'arrêter sur un jaune est :", choix: ["$\\dfrac{1}{4}$", "$\\dfrac{1}{3}$", "$\\dfrac{3}{9}$", "$\\dfrac{12}{3}$"], bonne: 0, explication: "$\\dfrac{3}{12} = \\dfrac{1}{4}$." },
    { question: "Lequel de ces nombres ne peut pas être une probabilité ?", choix: ["$1{,}2$", "$0$", "$\\dfrac{3}{8}$", "$0{,}99$"], bonne: 0, explication: "$1{,}2$ est plus grand que $1$." },
    { question: "On a obtenu cinq fois « pile » de suite avec une pièce équilibrée. Au lancer suivant :", choix: ["« face » a toujours $1$ chance sur $2$", "« face » est certain", "« pile » est plus probable", "« face » est plus probable"], bonne: 0, explication: "La pièce n'a pas de mémoire : chaque lancer est une nouvelle expérience." },
    { question: "On lance un dé $600$ fois ; le $6$ sort $97$ fois. Que peut-on dire ?", choix: ["La fréquence est proche de la probabilité $\\dfrac{1}{6}$", "Le dé est truqué", "La probabilité d'obtenir $6$ est $\\dfrac{97}{600}$", "Il aurait fallu exactement $100$ fois"], bonne: 0, explication: "$\\dfrac{97}{600} \\approx 0{,}16$ et $\\dfrac{1}{6} \\approx 0{,}17$ : c'est proche, c'est normal." },
    { question: "Pour qu'une fréquence soit proche de la probabilité, il faut :", choix: ["répéter l'expérience un grand nombre de fois", "faire l'expérience une seule fois", "choisir les résultats", "lancer le dé plus fort"], bonne: 0, explication: "Avec beaucoup de répétitions, la fréquence se rapproche de la probabilité." },
    { question: "Sur $13$ lettres de « MATHEMATIQUES », il y a $7$ consonnes. La probabilité de tirer une consonne est :", choix: ["$\\dfrac{7}{13}$", "$\\dfrac{6}{13}$", "$\\dfrac{7}{6}$", "$\\dfrac{1}{7}$"], bonne: 0, explication: "$7$ issues favorables sur $13$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Lire un graphique",
      etapes: [
        "Lis le titre et les axes : que représentent-ils, dans quelle unité ?",
        "Repère la graduation (de combien en combien ?).",
        "Lis la valeur demandée, puis vérifie qu'elle est cohérente."
      ],
      exemple: "Diagramme en barres gradué de $2$ en $2$ : une barre entre $8$ et $10$, à mi-hauteur, vaut $9$."
    },
    {
      titre: "Lire un diagramme circulaire",
      etapes: [
        "Le disque entier est le tout.",
        "Compare chaque part au disque : moitié, quart, tiers, huitième…",
        "Pour un nombre, prends cette fraction de l'effectif total."
      ],
      exemple: "Un quart de $480$ élèves : $480 \\div 4 = 120$ élèves."
    },
    {
      titre: "Calculer une probabilité",
      etapes: [
        "Vérifie que toutes les issues ont la même chance.",
        "Compte les issues favorables, puis le nombre total d'issues.",
        "Probabilité $=$ favorables $\\div$ total ; simplifie la fraction si possible."
      ],
      exemple: "Dé, nombre supérieur ou égal à $5$ : $2$ issues sur $6$, soit $\\dfrac{1}{3}$."
    },
    {
      titre: "Relier fréquence et probabilité",
      etapes: [
        "Fréquence $=$ nombre de fois où l'évènement s'est produit $\\div$ nombre d'essais.",
        "Sur un grand nombre d'essais, elle est proche de la probabilité.",
        "On peut donc estimer une probabilité inconnue (le contenu d'un sac) avec les fréquences."
      ],
      exemple: "$201$ bleues sur $400$ tirages : environ la moitié des boules sont bleues."
    }
  ],
  erreurs: [
    "Oublier de regarder la graduation de l'axe : elle ne va pas toujours de $1$ en $1$.",
    "Confondre une ligne et une colonne dans un tableau à double entrée.",
    "Donner une probabilité plus grande que $1$ ou négative.",
    "Diviser par le nombre d'issues défavorables : $3$ vertes et $4$ jaunes donnent $\\dfrac{3}{7}$, pas $\\dfrac{3}{4}$.",
    "Croire que le hasard « se souvient » : après cinq « pile », « face » n'est pas plus probable.",
    "Croire que la fréquence doit être exactement égale à la probabilité."
  ]
};
