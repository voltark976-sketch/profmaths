/*
  CHAPITRE : CE2 — Tableaux et diagrammes
  ----------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE2 : caractères qualitatifs ou quantitatifs discrets (nombre de frères
  et sœurs, âge) ; produire un tableau ou un diagramme en barres (avec une échelle adaptée) ; lire et interpréter un tableau
  à double entrée ou un diagramme en barres ; résoudre des problèmes avec ces données (compléter un tableau, une barre).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce2-donnees"] = {
  niveau: "CE2",
  numero: 15,
  titre: "Tableaux et diagrammes",
  accroche: "Lire, compléter et utiliser des tableaux et des diagrammes en barres avec une échelle.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Le diagramme en barres et son échelle",
      video: { titre: "Vidéo de Maître Lucas : lire un graphique et un tableau", youtube: "https://youtu.be/s8HRE-YRjmQ" },
      texte:
        "L'axe vertical a une **échelle** : les lignes peuvent aller de $2$ en $2$, de $5$ en $5$, de $20$ en $20$…\n\n" +
        "Pour une barre qui s'arrête entre deux lignes, on estime : à mi-chemin entre $60$ et $80$, c'est $70$.\n\n" +
        "Sur ce diagramme, $175$ élèves habitent dans $4$ villes. Alphaville : $78$, Bêtaville : $32$, Gammaville : $13$ ; donc Deltaville : $175 - 78 - 32 - 13 = 52$.",
      figure: "e2d-cours-barres",
      exemple: { enonce: "Combien d'élèves de plus à Alphaville qu'à Bêtaville ?", solution: "$78 - 32 = 46$." }
    },
    {
      titre: "Le tableau à double entrée",
      video: { titre: "Vidéo de Super Croco : le tableau à double entrée", youtube: "https://youtu.be/FO-JWAxAW6U" },
      texte:
        "Un tableau à double entrée a des **totaux** de lignes et de colonnes.\n\n" +
        "Pour une case cachée : total de la ligne (ou de la colonne) moins les autres cases.\n\n" +
        "Les données peuvent être des nombres (âge, nombre de frères et sœurs) ou des mots (sport préféré).",
      exemple: { enonce: "Total des filles : $148$ ; à pied $77$, vélo $29$, voiture $24$. En bus ?", solution: "$148 - 130 = 18$." }
    }
  ],
  exercices: [
    { type: "e2d-diagramme", titre: "Lire un diagramme en barres", etape: "Diagrammes", nb: 6 },
    { type: "e2d-tableau", titre: "Lire et compléter un tableau", etape: "Tableaux", nb: 5 },
    { type: "e2r-etapes", titre: "Problèmes avec des données", etape: "Tableaux", nb: 4 }
  ],
  qcm: [
    { question: "Combien d'élèves habitent à Alphaville ?", figure: "e2d-cours-barres", choix: ["$78$", "$80$", "$70$", "$60$"], bonne: 0, explication: "La barre est un peu sous la ligne $80$." },
    { question: "Quelle ville a le moins d'élèves ?", figure: "e2d-cours-barres", choix: ["Gammaville", "Alphaville", "Bêtaville", "Deltaville"], bonne: 0, explication: "La barre la plus basse." },
    { question: "L'échelle va de $20$ en $20$. Une barre à mi-chemin entre $40$ et $60$ vaut :", choix: ["$50$", "$45$", "$55$", "$100$"], bonne: 0, explication: "Le milieu de $40$ et $60$." },
    { question: "Dans un tableau, le total d'une ligne est :", choix: ["la somme des cases de la ligne", "la plus grande case", "la première case", "le nombre de colonnes"], bonne: 0, explication: "On additionne toute la ligne." },
    { question: "Total $90$, autres cases $25$ et $40$ : la case cachée vaut", choix: ["$25$", "$65$", "$155$", "$15$"], bonne: 0, explication: "$90 - 65 = 25$." },
    { question: "« Nombre de frères et sœurs » donne des réponses :", choix: ["qui sont des nombres", "qui sont des couleurs", "qui sont des villes", "qui sont des sports"], bonne: 0, explication: "$0$, $1$, $2$, $3$…" },
    { question: "Pour présenter des données, on peut faire :", choix: ["un tableau ou un diagramme", "une horloge", "un patron", "une balance"], bonne: 0, explication: "Ce sont des façons de ranger des données." },
    { question: "$175$ élèves en tout ; trois villes en ont $78$, $32$ et $13$. La quatrième :", choix: ["$52$", "$123$", "$62$", "$42$"], bonne: 0, explication: "$175 - 123 = 52$." },
    { question: "Dans un diagramme, une barre deux fois plus haute qu'une autre représente :", choix: ["deux fois plus d'élèves", "deux élèves de plus", "la moitié", "le total"], bonne: 0, explication: "La hauteur est proportionnelle au nombre." },
    { question: "On lit la valeur d'une barre :", choix: ["sur l'axe vertical", "sous la barre", "dans le titre", "au hasard"], bonne: 0, explication: "On suit le haut de la barre." },
    { question: "Filles $48$, garçons $52$ : total ?", choix: ["$100$", "$4$", "$90$", "$110$"], bonne: 0, explication: "$48 + 52$." },
    { question: "La case en bas à droite d'un tableau avec totaux est :", choix: ["le total général", "une case vide", "la plus petite valeur", "le titre"], bonne: 0, explication: "Total de tout le tableau." },
    { question: "Barres : foot $30$, basket $15$. Combien de fois plus pour le foot ?", choix: ["$2$ fois", "$15$ fois", "$3$ fois", "$45$ fois"], bonne: 0, explication: "$2 \\times 15 = 30$." },
    { question: "Si l'échelle va de $5$ en $5$ et qu'une barre atteint la $7$e ligne, elle vaut :", choix: ["$35$", "$7$", "$12$", "$75$"], bonne: 0, explication: "$7 \\times 5$." },
    { question: "Un diagramme en barres sert surtout à :", choix: ["comparer des quantités d'un coup d'œil", "lire l'heure", "mesurer une longueur", "calculer un périmètre"], bonne: 0, explication: "On compare les hauteurs." },
    { question: "Les lignes d'un diagramme vont de $2$ en $2$. Une barre arrive à la $6$e ligne : elle vaut", choix: ["$12$", "$6$", "$8$", "$26$"], bonne: 0, explication: "$6 \\times 2$." },
    { question: "Pour savoir combien de réponses en tout, on :", choix: ["additionne toutes les barres", "prend la plus haute barre", "compte les barres", "lit le titre"], bonne: 0, explication: "Le total est la somme." },
    { question: "Colonne « bus » : total $45$, filles $18$. Garçons :", choix: ["$27$", "$63$", "$18$", "$37$"], bonne: 0, explication: "$45 - 18$." }
  ],
  methode: [
    { titre: "Compléter une barre manquante", etapes: ["Lis les valeurs des barres connues.", "Additionne-les.", "Enlève cette somme du total donné."], figure: "e2d-cours-barres", exemple: "$175 - (78 + 32 + 13) = 52$." }
  ],
  erreurs: ["Lire l'échelle de $1$ en $1$.", "Oublier une barre dans le total.", "Confondre le total d'une ligne et celui d'une colonne.", "Additionner au lieu de soustraire pour trouver une case cachée."]
};
