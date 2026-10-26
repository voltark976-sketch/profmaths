/*
  CHAPITRE : CM1 — Tableaux, diagrammes, probabilités
  ----------------------------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM1 : lire et interpréter des tableaux, des diagrammes en barres et
  des graphiques (courbes) ; prélever des informations et les utiliser dans un problème. Probabilités : expérience
  aléatoire, issues ; vocabulaire (impossible, peu probable, probable, certain, une chance sur deux) ; comparer des
  chances sur une échelle.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm1-donnees-probabilites"] = {
  niveau: "CM1",
  numero: 16,
  titre: "Tableaux, diagrammes, probabilités",
  accroche: "Lire un graphique, utiliser un diagramme, et parler du hasard avec les bons mots.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Lire un graphique",
      video: { titre: "Vidéo de Pass Education : lire des diagrammes et des graphiques", youtube: "https://youtu.be/0aLUFNYXPu0" },
      texte:
        "Ce graphique montre la hauteur de pluie tombée chaque mois à Mamoudzou, de janvier à août (en cm, valeurs arrondies).\n\n" +
        "- On lit le **mois** sur l'axe horizontal et la **hauteur de pluie** sur l'axe vertical.\n" +
        "- Pour lire une valeur, on part du mois, on monte jusqu'au point, puis on va à gauche lire le nombre.\n" +
        "- La **courbe** permet de voir d'un coup d'œil quand il pleut le plus : c'est la saison des pluies, de décembre à avril.\n\n" +
        "Dans un **diagramme en barres** ou un **tableau**, on prélève les nombres utiles, puis on calcule (somme, différence…).",
      figure: "m1x-cours-courbe",
      exemple: { enonce: "Combien de centimètres de pluie en mars ?", solution: "On part de M (mars), on monte jusqu'au point et on lit $20$ cm." }
    },
    {
      titre: "Le hasard et les probabilités",
      video: { titre: "Vidéo de Maître Lucas : expérience aléatoire et issues", youtube: "https://youtu.be/OmyITspw9XQ" },
      texte:
        "Une **expérience aléatoire** est une expérience dont on ne peut pas prévoir le résultat (lancer un dé, tirer une bille sans regarder).\n\n" +
        "Les résultats possibles sont les **issues** : un dé à six faces a $6$ issues.\n\n" +
        "Pour parler des chances qu'un évènement arrive, on utilise une échelle :\n\n" +
        "**impossible** → **peu probable** → **une chance sur deux** → **probable** → **certain**.\n\n" +
        "Avec un dé : « obtenir $7$ » est impossible ; « obtenir $6$ » est peu probable ; « obtenir un nombre pair » : une chance sur deux ; « obtenir plus que $1$ » est probable ; « obtenir un nombre plus petit que $7$ » est certain.",
      exemple: { enonce: "Un sac contient $2$ billes rouges et $7$ billes bleues. Quelle couleur a le plus de chances de sortir ?", solution: "Le bleu : il y a plus de billes bleues (mais ce n'est pas certain)." }
    }
  ],
  exercices: [
    { type: "m1x-courbe", titre: "Lire un graphique", etape: "Graphiques", nb: 5 },
    { type: "m1x-tableaux", titre: "Diagrammes et tableaux", etape: "Graphiques", nb: 5 },
    { type: "m1x-probas", titre: "Le vocabulaire du hasard", etape: "Probabilités", nb: 5 },
    { type: "m1x-issues", titre: "Issues et chances", etape: "Probabilités", nb: 5 }
  ],
  qcm: [
    { question: "Sur le graphique de la pluie, on lit les mois :", figure: "m1x-cours-courbe", choix: ["sur l'axe horizontal", "sur l'axe vertical", "dans le titre", "sur la courbe"], bonne: 0, explication: "Les mois sont en bas." },
    { question: "Combien de centimètres de pluie en avril ?", figure: "m1x-cours-courbe", choix: ["$10$ cm", "$20$ cm", "$5$ cm", "$4$ cm"], bonne: 0, explication: "Le 4e point (A pour avril) est sur la ligne $10$." },
    { question: "Quels mois sont les plus pluvieux ?", figure: "m1x-cours-courbe", choix: ["janvier et février", "mai et juin", "août", "avril"], bonne: 0, explication: "La courbe y atteint $25$ cm." },
    { question: "Une expérience aléatoire est une expérience :", choix: ["dont on ne peut pas prévoir le résultat", "qui donne toujours le même résultat", "impossible à faire", "qu'on fait sans matériel"], bonne: 0, explication: "Le résultat dépend du hasard." },
    { question: "Combien d'issues a le lancer d'un dé à six faces ?", choix: ["$6$", "$1$", "$2$", "$12$"], bonne: 0, explication: "$1$, $2$, $3$, $4$, $5$, $6$." },
    { question: "Combien d'issues a le lancer d'une pièce ?", choix: ["$2$", "$1$", "$6$", "$3$"], bonne: 0, explication: "Pile ou face." },
    { question: "Avec un dé, « obtenir $7$ » est :", choix: ["impossible", "peu probable", "probable", "certain"], bonne: 0, explication: "Il n'y a pas de face $7$." },
    { question: "Avec un dé, « obtenir un nombre pair » :", choix: ["une chance sur deux", "impossible", "certain", "peu probable"], bonne: 0, explication: "$3$ faces paires sur $6$." },
    { question: "Avec un dé, « obtenir un nombre plus petit que $7$ » est :", choix: ["certain", "probable", "impossible", "peu probable"], bonne: 0, explication: "Toutes les faces vont de $1$ à $6$." },
    { question: "Avec un dé, « obtenir $6$ » est :", choix: ["peu probable", "certain", "impossible", "une chance sur deux"], bonne: 0, explication: "Une seule face sur six." },
    { question: "Un sac a $9$ billes rouges et $1$ bleue. « Tirer une rouge » est :", choix: ["probable", "certain", "impossible", "peu probable"], bonne: 0, explication: "Il y a beaucoup plus de rouges, mais pas que des rouges." },
    { question: "Un sac ne contient que des billes vertes. « Tirer une bille verte » est :", choix: ["certain", "probable", "une chance sur deux", "impossible"], bonne: 0, explication: "On ne peut tirer que du vert." },
    { question: "Un sac a $2$ billes rouges et $7$ bleues. On a plus de chances de tirer :", choix: ["une bleue", "une rouge", "autant pour les deux", "une verte"], bonne: 0, explication: "$7 > 2$." },
    { question: "Un sac a $4$ billes rouges et $4$ bleues. On a :", choix: ["autant de chances pour les deux couleurs", "plus de chances pour le rouge", "plus de chances pour le bleu", "aucune chance"], bonne: 0, explication: "Une chance sur deux." },
    { question: "Pile ou face : « obtenir pile » :", choix: ["une chance sur deux", "certain", "impossible", "peu probable"], bonne: 0, explication: "$1$ issue sur $2$." },
    { question: "Dans un diagramme en barres, la barre la plus haute représente :", choix: ["la plus grande quantité", "la plus petite quantité", "le total", "rien"], bonne: 0, explication: "Plus c'est haut, plus il y en a." },
    { question: "Foot : $25$ élèves ; natation : $11$ élèves. Combien de plus pour le foot ?", choix: ["$14$", "$36$", "$11$", "$25$"], bonne: 0, explication: "$25 - 11$." },
    { question: "Une roue a $4$ secteurs égaux : $3$ bleus et $1$ rouge. « Tomber sur bleu » est :", choix: ["probable", "certain", "peu probable", "impossible"], bonne: 0, explication: "$3$ chances sur $4$." }
  ],
  methode: [
    { titre: "Lire une valeur sur un graphique", etapes: ["Repère ce que représente chaque axe (et l'unité).", "Pars de la valeur connue sur l'axe horizontal.", "Monte jusqu'à la courbe, puis lis la valeur sur l'axe vertical."], figure: "m1x-cours-courbe", exemple: "Mars → point → $20$ cm." },
    { titre: "Décrire les chances d'un évènement", etapes: ["Liste toutes les issues possibles.", "Compte celles qui réalisent l'évènement.", "Aucune : impossible ; toutes : certain ; la moitié : une chance sur deux ; plus ou moins de la moitié : probable ou peu probable."], exemple: "Dé, « nombre pair » : $3$ issues sur $6$, une chance sur deux." }
  ],
  erreurs: ["Lire la mauvaise graduation (ne pas regarder le pas de l'axe).", "Croire qu'un évènement probable est certain.", "Oublier des issues.", "Confondre le nombre d'issues et le nombre d'objets."]
};
