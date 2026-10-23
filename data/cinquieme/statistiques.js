/*
  CHAPITRE : 5e — Statistiques
  -----------------------------
  Programme de mathématiques du cycle 4 (BO n° 10 du 5 mars 2026), en vigueur en 5e à la rentrée 2026, partie
  « Statistiques » : recueillir et organiser des données ; calculer des effectifs et des fréquences (écriture
  décimale, fractionnaire ou pourcentage) ; lire et interpréter tableaux, diagrammes et graphiques ; représenter
  des données (diagramme en barres, diagramme circulaire, graphique cartésien) et choisir une représentation
  adaptée ; calculer et interpréter la moyenne simple d'une série.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cinquieme-statistiques"] = {
  niveau: "5e",
  numero: 13,
  titre: "Statistiques",
  accroche: "Organiser des données, calculer des effectifs, des fréquences et une moyenne, et choisir le bon diagramme pour les représenter.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : statistiques et probabilités (PDF)", url: "https://www.maths-et-tiques.fr/telech/26Proba-stat.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : statistiques (Yvan Monka)", url: "https://youtu.be/jnxny9HUqt0", type: "video" },
    { titre: "Construire un diagramme en bâtons (Yvan Monka)", url: "https://youtu.be/NZnhF5VDy04", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Effectifs et fréquences",
      video: { titre: "Vidéo d'Yvan Monka : calculer des fréquences", youtube: "https://youtu.be/MwNV5eCBFrI" },
      texte:
        "Une **série statistique** est une liste de données (des notes, des pointures, des moyens de transport…).\n\n" +
        "- L'**effectif** d'une valeur est le nombre de fois où elle apparaît. L'**effectif total** est le nombre de données.\n" +
        "- La **fréquence** d'une valeur est son effectif divisé par l'effectif total. Elle est comprise entre $0$ et $1$, et peut s'écrire en fraction, en écriture décimale ou en pourcentage.\n\n" +
        "Sur le diagramme, $24$ élèves sont interrogés : $6$ viennent à pied, donc fréquence $\\dfrac{6}{24} = \\dfrac{1}{4} = 0{,}25 = 25\\,\\%$.",
      figure: "st5-cours-barres",
      exemple: {
        enonce: "Sur $40$ élèves interrogés, $14$ viennent à pied. Quelle est la fréquence des élèves qui viennent à pied ?",
        solution: "$\\dfrac{14}{40} = 0{,}35$, soit $35\\,\\%$."
      }
    },
    {
      titre: "La moyenne",
      video: { titre: "Vidéo d'Yvan Monka : calculer une moyenne", youtube: "https://youtu.be/h0urYAnMUNI" },
      texte:
        "La **moyenne** d'une série est la somme des valeurs divisée par le nombre de valeurs.\n\n" +
        "Notes : $12$ ; $8$ ; $15$ ; $13$. Somme : $48$. Moyenne : $48 \\div 4 = 12$.\n\n" +
        "Si toutes les valeurs étaient égales à la moyenne, la somme serait la même : c'est une façon de « partager équitablement » le total. Sur le diagramme, ce qui dépasse la ligne de la moyenne comble exactement ce qui manque en dessous.",
      figure: "st5-cours-moyenne",
      exemple: {
        enonce: "Faïza a $11$ et $14$. Quelle note doit-elle avoir au troisième contrôle pour avoir $13$ de moyenne ?",
        solution: "Il faut une somme de $3 \\times 13 = 39$. Elle a déjà $25$ : il lui faut $39 - 25 = 14$."
      }
    },
    {
      titre: "Diagrammes",
      video: { titre: "Vidéo d'Yvan Monka : construire un diagramme circulaire", youtube: "https://youtu.be/gpCY_3zq3bk" },
      texte:
        "- Le **diagramme en barres** (ou en bâtons) permet de **comparer** les effectifs des catégories : la hauteur de chaque barre est proportionnelle à l'effectif.\n" +
        "- Le **diagramme circulaire** montre la **part** de chaque catégorie dans le total : l'angle de chaque secteur est proportionnel à l'effectif. Le disque entier, $360^\\circ$, correspond à $100\\,\\%$.\n" +
        "- Le **graphique cartésien** (une courbe) montre une **évolution**, souvent en fonction du temps.\n\n" +
        "Un secteur de fréquence $25\\,\\%$ a un angle de $360^\\circ \\times 0{,}25 = 90^\\circ$. Sur le diagramme ($24$ élèves), le football ($12$ élèves) occupe la moitié du disque : $180^\\circ$.",
      figure: "st5-cours-circulaire",
      exemple: {
        enonce: "Dans une classe de $30$ élèves, $12$ font du football. Quel est l'angle du secteur « football » dans un diagramme circulaire ?",
        solution: "Un élève correspond à $360 \\div 30 = 12^\\circ$, donc $12 \\times 12 = 144^\\circ$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "st5-effectifs", titre: "Compter des effectifs", etape: "Effectifs et fréquences", nb: 5 },
    { type: "st5-frequences", titre: "Calculer des fréquences", etape: "Effectifs et fréquences", nb: 6 },
    { type: "st5-moyenne", titre: "Calculer une moyenne", etape: "Moyenne", nb: 6 },
    { type: "st5-diagrammes", titre: "Lire et choisir un diagramme", etape: "Représentations", nb: 6 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Dans la série $3$ ; $5$ ; $3$ ; $2$ ; $3$ ; $5$, l'effectif de la valeur $3$ est :", choix: ["$3$", "$2$", "$6$", "$1$"], bonne: 0, explication: "La valeur $3$ apparaît trois fois." },
    { question: "L'effectif total de la série $3$ ; $5$ ; $3$ ; $2$ ; $3$ ; $5$ est :", choix: ["$6$", "$21$", "$3$", "$5$"], bonne: 0, explication: "Il y a six valeurs." },
    { question: "$8$ élèves sur $20$ : la fréquence est :", choix: ["$0{,}4$", "$8$", "$0{,}8$", "$2{,}5$"], bonne: 0, explication: "$8 \\div 20 = 0{,}4$." },
    { question: "Une fréquence de $0{,}15$ correspond à :", choix: ["$15\\,\\%$", "$0{,}15\\,\\%$", "$1{,}5\\,\\%$", "$150\\,\\%$"], bonne: 0, explication: "$0{,}15 = \\dfrac{15}{100}$." },
    { question: "Une fréquence est toujours :", choix: ["comprise entre $0$ et $1$", "plus grande que $1$", "un nombre entier", "égale à l'effectif"], bonne: 0, explication: "Un effectif ne dépasse pas l'effectif total." },
    { question: "La moyenne de $10$ ; $12$ ; $17$ est :", choix: ["$13$", "$12$", "$39$", "$14$"], bonne: 0, explication: "$39 \\div 3 = 13$." },
    { question: "La moyenne de $4$ ; $6$ ; $8$ ; $10$ est :", choix: ["$7$", "$6$", "$28$", "$8$"], bonne: 0, explication: "$28 \\div 4 = 7$." },
    { question: "Pour avoir $12$ de moyenne avec deux notes, si la première est $9$, la seconde doit être :", choix: ["$15$", "$12$", "$3$", "$21$"], bonne: 0, explication: "Il faut une somme de $24$." },
    { question: "Dans un diagramme circulaire, le disque entier correspond à :", choix: ["$360^\\circ$", "$100^\\circ$", "$180^\\circ$", "$90^\\circ$"], bonne: 0, explication: "Un tour complet." },
    { question: "Une catégorie de fréquence $50\\,\\%$ a un secteur de :", choix: ["$180^\\circ$", "$50^\\circ$", "$90^\\circ$", "$360^\\circ$"], bonne: 0, explication: "La moitié du disque." },
    { question: "Pour montrer l'évolution d'une température au cours du temps, on choisit :", choix: ["un graphique cartésien", "un diagramme circulaire", "un diagramme en barres", "un tableau sans graphique"], bonne: 0, explication: "Une courbe montre une évolution." },
    { question: "Pour montrer la part de chaque candidat dans les votes, on choisit plutôt :", choix: ["un diagramme circulaire", "un graphique cartésien", "une droite graduée", "un repère"], bonne: 0, explication: "Les parts d'un tout." },
    { question: "Dans un diagramme en barres, la hauteur d'une barre est :", choix: ["proportionnelle à l'effectif", "égale au nombre de catégories", "toujours la même", "égale à l'angle"], bonne: 0, explication: "Elle représente l'effectif." },
    { question: "Sur $25$ élèves, $5$ ont un chat. Le pourcentage d'élèves ayant un chat est :", choix: ["$20\\,\\%$", "$5\\,\\%$", "$25\\,\\%$", "$50\\,\\%$"], bonne: 0, explication: "$\\dfrac{5}{25} = \\dfrac{20}{100}$." },
    { question: "D'après le diagramme, quel jour le plus de pirogues sont sorties ?", figure: "st5-qcm-pirogues", choix: ["mardi", "jeudi", "lundi", "mercredi"], bonne: 0, explication: "La barre la plus haute est celle du mardi ($12$ pirogues)." },
    { question: "D'après le diagramme, combien de pirogues sont sorties en tout sur les cinq jours ?", figure: "st5-qcm-pirogues", choix: ["$40$", "$12$", "$5$", "$30$"], bonne: 0, explication: "$8 + 12 + 4 + 10 + 6 = 40$." },
    { question: "D'après le diagramme, quel est le nombre moyen de pirogues sorties par jour ?", figure: "st5-qcm-pirogues", choix: ["$8$", "$40$", "$10$", "$6$"], bonne: 0, explication: "Total $40$ pour $5$ jours : $40 \\div 5 = 8$." },
    { question: "D'après le diagramme, quelle est la fréquence des sorties du mardi ?", figure: "st5-qcm-pirogues", choix: ["$0{,}3$", "$0{,}12$", "$12$", "$0{,}2$"], bonne: 0, explication: "$\\dfrac{12}{40} = 0{,}3$, soit $30\\,\\%$." },
    { question: "Le diagramme montre le moyen de transport de $36$ élèves. Combien viennent en bus ?", figure: "st5-qcm-transport", choix: ["$18$", "$9$", "$12$", "$36$"], bonne: 0, explication: "Le secteur « Bus » est la moitié du disque : $36 \\div 2 = 18$." },
    { question: "Sur le diagramme circulaire, quel est l'angle du secteur « À pied », qui occupe un quart du disque ?", figure: "st5-qcm-transport", choix: ["$90^\\circ$", "$25^\\circ$", "$45^\\circ$", "$180^\\circ$"], bonne: 0, explication: "Un quart de $360^\\circ$ : $360 \\div 4 = 90^\\circ$." },
    { question: "Quelle est la moyenne des quatre notes du diagramme ?", figure: "st5-qcm-notes", choix: ["$9$", "$36$", "$8$", "$10$"], bonne: 0, explication: "$6 + 9 + 14 + 7 = 36$ et $36 \\div 4 = 9$." },
    { question: "D'après la courbe, quel mois l'eau du lagon est-elle la plus chaude ?", figure: "st5-qcm-courbe", choix: ["le mois $7$", "le mois $1$", "le mois $11$", "le mois $5$"], bonne: 0, explication: "Le point le plus haut est au mois $7$ ($30$ °C)." },
    { question: "Quelle représentation est utilisée ici, et que montre-t-elle ?", figure: "st5-qcm-courbe", choix: ["un graphique cartésien : une évolution", "un diagramme circulaire : des parts", "un diagramme en barres : des effectifs", "un tableau : des fréquences"], bonne: 0, explication: "Des points reliés dans un repère : une évolution au cours du temps." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer une fréquence",
      etapes: [
        "Trouve l'effectif de la valeur et l'effectif total.",
        "Divise l'effectif par l'effectif total.",
        "Pour un pourcentage, multiplie par $100$."
      ],
      exemple: "Sur le diagramme, le bus : $9$ élèves sur $24$, donc $9 \\div 24 = 0{,}375 = 37{,}5\\,\\%$.",
      figure: "st5-cours-barres"
    },
    {
      titre: "Calculer une moyenne",
      etapes: [
        "Additionne toutes les valeurs.",
        "Compte les valeurs.",
        "Divise la somme par le nombre de valeurs."
      ],
      exemple: "Les notes du diagramme : $6 + 9 + 14 + 7 = 36$ et $36 \\div 4 = 9$.",
      figure: "st5-qcm-notes"
    },
    {
      titre: "Construire un diagramme circulaire",
      etapes: [
        "Calcule l'angle correspondant à un élément : $360^\\circ \\div$ effectif total.",
        "Multiplie par l'effectif de chaque catégorie.",
        "Trace les secteurs au rapporteur."
      ],
      exemple: "$24$ élèves : $360 \\div 24 = 15^\\circ$ par élève ; football $12$ élèves, soit $12 \\times 15 = 180^\\circ$ ; natation $3$ élèves, soit $45^\\circ$.",
      figure: "st5-cours-circulaire"
    }
  ],
  erreurs: [
    "Confondre l'effectif et la fréquence.",
    "Oublier de diviser la somme par le nombre de valeurs pour la moyenne.",
    "Utiliser $100^\\circ$ au lieu de $360^\\circ$ pour un diagramme circulaire.",
    "Choisir un diagramme circulaire pour montrer une évolution dans le temps.",
    "Oublier des valeurs en comptant les effectifs."
  ]
};
