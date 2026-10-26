/*
  CHAPITRE : CM2 — Tableaux, diagrammes, courbes
  -----------------------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM2 : recueillir des données et produire un tableau, un diagramme
  en barres ou un ensemble de points ; lire et interpréter un tableau, un diagramme en barres, un diagramme circulaire
  ou une courbe ; résoudre des problèmes en une ou deux étapes avec ces données. Données liées à l'environnement de
  Mayotte (tortues, pluie…) ; les valeurs des exercices sont fictives.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm2-donnees"] = {
  niveau: "CM2",
  numero: 16,
  titre: "Tableaux et graphiques",
  accroche: "Lire un diagramme circulaire, une courbe, un tableau, et s'en servir pour résoudre un problème.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Le diagramme circulaire",
      video: { titre: "Vidéo d'Yvan Monka : lire un diagramme circulaire", youtube: "https://youtu.be/grV-ArNnua0" },
      texte:
        "On a demandé à $24$ élèves comment ils viennent à l'école. Dans un **diagramme circulaire**, le disque entier représente **tous** les élèves.\n\n" +
        "- « Bus » occupe **la moitié** du disque : $24 \\div 2 = 12$ élèves.\n" +
        "- « À pied » occupe **le quart** : $24 \\div 4 = 6$ élèves.\n" +
        "- « Voiture » occupe $\\dfrac{1}{6}$ : $4$ élèves ; « Vélo » $\\dfrac{1}{12}$ : $2$ élèves.\n\n" +
        "Vérification : $12 + 6 + 4 + 2 = 24$. ✔",
      figure: "m2x-cours-circulaire",
      exemple: { enonce: "Si on avait interrogé $40$ élèves avec les mêmes parts, combien viendraient en bus ?", solution: "La moitié de $40$ : $20$ élèves." }
    },
    {
      titre: "Courbes et tableaux",
      video: { titre: "Vidéo de Pass Education : lire des diagrammes et graphiques", youtube: "https://youtu.be/0aLUFNYXPu0" },
      texte:
        "- Une **courbe** montre une évolution (par exemple, le nombre de tortues venues pondre chaque mois). On lit le mois en bas, la valeur à gauche, et on compare les points.\n" +
        "- Un **tableau à double entrée** croise deux informations (filles/garçons et moyen de transport). La colonne « Total » aide à trouver une case cachée : total moins les autres cases.\n" +
        "- Pour résoudre un problème, on **prélève** les données utiles, puis on calcule.",
      exemple: { enonce: "Garçons : total $82$ ; bus $35$ ; à pied $25$ ; taxi ? ", solution: "$82 - 35 - 25 = 22$ garçons." }
    }
  ],
  exercices: [
    { type: "m2x-circulaire", titre: "Diagrammes circulaires", etape: "Circulaire", nb: 5 },
    { type: "m2x-courbe", titre: "Lire une courbe", etape: "Courbes", nb: 5 },
    { type: "m2x-tableaux", titre: "Tableaux à double entrée", etape: "Tableaux", nb: 5 }
  ],
  qcm: [
    { question: "Dans ce diagramme, quelle part représente « Bus » ?", figure: "m2x-cours-circulaire", choix: ["la moitié", "le quart", "le tiers", "les trois quarts"], bonne: 0, explication: "Un demi-disque." },
    { question: "Avec $24$ élèves interrogés, combien viennent à pied ?", figure: "m2x-cours-circulaire", choix: ["$6$", "$12$", "$4$", "$8$"], bonne: 0, explication: "Le quart de $24$." },
    { question: "Dans un diagramme circulaire, le disque entier représente :", choix: ["toutes les réponses", "la réponse la plus fréquente", "la moitié des réponses", "rien"], bonne: 0, explication: "C'est le total." },
    { question: "Un secteur qui occupe un quart du disque, sur $200$ personnes, représente :", choix: ["$50$ personnes", "$25$ personnes", "$4$ personnes", "$100$ personnes"], bonne: 0, explication: "$200 \\div 4$." },
    { question: "Un secteur qui occupe les trois quarts du disque, sur $40$ personnes :", choix: ["$30$", "$10$", "$34$", "$75$"], bonne: 0, explication: "$40 \\div 4 \\times 3$." },
    { question: "Sur une courbe, le point le plus haut correspond à :", choix: ["la plus grande valeur", "la plus petite valeur", "la moyenne", "le premier mois"], bonne: 0, explication: "Plus c'est haut, plus c'est grand." },
    { question: "Les lignes d'une courbe vont de $5$ en $5$. Un point est à mi-chemin entre $20$ et $25$ : il vaut environ", choix: ["$22{,}5$", "$21$", "$45$", "$2{,}5$"], bonne: 0, explication: "Le milieu de $20$ et $25$." },
    { question: "Une courbe sert surtout à montrer :", choix: ["une évolution dans le temps", "une part d'un tout", "une figure géométrique", "un patron"], bonne: 0, explication: "On voit si ça monte ou descend." },
    { question: "Un diagramme circulaire sert surtout à montrer :", choix: ["la part de chaque réponse dans le total", "une évolution dans le temps", "une distance", "une durée"], bonne: 0, explication: "Les secteurs sont des parts du disque." },
    { question: "Garçons : total $82$ ; bus $35$ ; à pied $25$. En taxi :", choix: ["$22$", "$60$", "$117$", "$47$"], bonne: 0, explication: "$82 - 60$." },
    { question: "Filles $58$, garçons $53$. Total :", choix: ["$111$", "$5$", "$101$", "$113$"], bonne: 0, explication: "$58 + 53$." },
    { question: "En juillet, $25$ tortues ; en octobre, $15$. La baisse est de :", choix: ["$10$", "$40$", "$15$", "$5$"], bonne: 0, explication: "$25 - 15$." },
    { question: "Dans un tableau, la colonne « Total » d'une ligne est :", choix: ["la somme des cases de la ligne", "la plus grande case", "la première case", "le nombre de colonnes"], bonne: 0, explication: "On additionne la ligne." },
    { question: "Pour un diagramme en barres, la hauteur d'une barre représente :", choix: ["l'effectif (le nombre)", "la couleur", "le nom de la catégorie", "la largeur"], bonne: 0, explication: "On lit la valeur sur l'axe vertical." },
    { question: "$60$ personnes ; « Riz » occupe la moitié du disque. Combien ont choisi le riz ?", choix: ["$30$", "$60$", "$15$", "$20$"], bonne: 0, explication: "$60 \\div 2$." },
    { question: "« Vélo » occupe $\\dfrac{1}{12}$ du disque de $24$ élèves :", choix: ["$2$", "$12$", "$1$", "$3$"], bonne: 0, explication: "$24 \\div 12$." },
    { question: "Pour vérifier un diagramme circulaire, on peut :", choix: ["additionner toutes les parts et retrouver le total", "compter les couleurs", "mesurer le rayon", "regarder le titre"], bonne: 0, explication: "Les parts réunies font le tout." },
    { question: "Des données comme « le moyen de transport » ou « le sport préféré » sont :", choix: ["des mots (catégories)", "toujours des nombres", "des durées", "des longueurs"], bonne: 0, explication: "On les compte par catégorie." }
  ],
  methode: [
    { titre: "Lire un diagramme circulaire", etapes: ["Repère le total (le disque entier).", "Pour chaque secteur, estime la part : moitié, quart, tiers…", "Calcule : total $\\div$ dénominateur $\\times$ numérateur.", "Vérifie que la somme des parts redonne le total."], figure: "m2x-cours-circulaire", exemple: "Bus : moitié de $24$ → $12$ élèves." }
  ],
  erreurs: ["Lire la valeur d'un secteur comme un pourcentage sans le relier au total.", "Se tromper de pas sur l'axe d'une courbe.", "Oublier une case quand on cherche une case cachée.", "Confondre total d'une ligne et total d'une colonne."]
};
