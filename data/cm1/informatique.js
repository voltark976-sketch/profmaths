/*
  CHAPITRE : CM1 — Pensée informatique
  -------------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM1 : notion d'algorithme (suite d'instructions dans un ordre
  précis) ; exécuter un programme de calcul ou un programme en blocs (type Scratch) ; boucle « répéter » ; prévoir le
  résultat d'un programme ; reconnaître la règle d'une suite et la prolonger. Activités débranchées possibles.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm1-informatique"] = {
  niveau: "CM1",
  numero: 17,
  titre: "Pensée informatique",
  accroche: "Exécuter un programme pas à pas, comprendre une boucle, prévoir le résultat.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Un algorithme, un programme",
      video: { titre: "Vidéo de « 1 jour, 1 question » : c'est quoi un algorithme ?", youtube: "https://youtu.be/ioCiS980Dbg" },
      texte:
        "Un **algorithme** est une suite d'instructions à suivre **dans l'ordre** pour obtenir un résultat, comme une recette de cuisine.\n\n" +
        "Un **programme** est un algorithme écrit pour un ordinateur, par exemple avec des **blocs** (comme dans Scratch).\n\n" +
        "Avec ce programme, si on choisit $5$ :\n\n" +
        "- $5 + 2 = 7$ ;\n" +
        "- $7 \\times 4 = 28$ ;\n" +
        "- le programme écrit $28$.\n\n" +
        "Si on change l'**ordre** des blocs, le résultat change : $5 \\times 4 + 2 = 22$.",
      figure: "m1i-cours-programme",
      exemple: { enonce: "Avec le même programme, on choisit $10$. Quel résultat ?", solution: "$10 + 2 = 12$, puis $12 \\times 4 = 48$." }
    },
    {
      titre: "La boucle « répéter »",
      video: { titre: "Vidéo de « 1 jour, 1 question » : c'est quoi le code informatique ?", youtube: "https://youtu.be/2UqIJlVQE7o" },
      texte:
        "Une **boucle** fait répéter plusieurs fois les mêmes instructions.\n\n" +
        "« mettre $n$ à $8$ », puis « **répéter $6$ fois** : ajouter $8$ à $n$ », puis « dire $n$ ».\n\n" +
        "On ajoute $6$ fois $8$ : $8 + 6 \\times 8 = 8 + 48 = 56$. Le programme dit $56$.\n\n" +
        "Pour faire avancer un robot de $4$ cases, plutôt que d'écrire $4$ fois « avancer », on écrit « répéter $4$ fois : avancer ».",
      exemple: { enonce: "« mettre $n$ à $0$ », « répéter $5$ fois : ajouter $3$ à $n$ », « dire $n$ ». Que dit le programme ?", solution: "$5 \\times 3 = 15$." }
    }
  ],
  exercices: [
    { type: "m1i-programme", titre: "Exécuter un programme", etape: "Programmes", nb: 5 },
    { type: "m1i-boucle", titre: "Les boucles", etape: "Boucles", nb: 5 },
    { type: "m1i-suites", titre: "Suites et régularités", etape: "Boucles", nb: 5 }
  ],
  qcm: [
    { question: "Un algorithme, c'est :", choix: ["une suite d'instructions dans un ordre précis", "un nombre très grand", "un ordinateur", "une figure géométrique"], bonne: 0, explication: "Comme une recette." },
    { question: "Avec le programme du cours, on choisit $5$. Résultat ?", figure: "m1i-cours-programme", choix: ["$28$", "$22$", "$11$", "$20$"], bonne: 0, explication: "$(5 + 2) \\times 4$." },
    { question: "Avec le programme du cours, on choisit $10$. Résultat ?", figure: "m1i-cours-programme", choix: ["$48$", "$42$", "$16$", "$40$"], bonne: 0, explication: "$12 \\times 4$." },
    { question: "Si on inverse l'ordre de deux instructions, le résultat :", choix: ["peut changer", "ne change jamais", "double toujours", "devient $0$"], bonne: 0, explication: "$5 + 2$ puis $\\times 4$ ne donne pas $5 \\times 4$ puis $+ 2$." },
    { question: "Une boucle sert à :", choix: ["répéter des instructions", "arrêter le programme", "effacer l'écran", "choisir un nombre au hasard"], bonne: 0, explication: "On évite d'écrire plusieurs fois la même chose." },
    { question: "« $n = 8$ », « répéter $6$ fois : ajouter $8$ à $n$ ». À la fin, $n$ vaut :", choix: ["$56$", "$48$", "$14$", "$22$"], bonne: 0, explication: "$8 + 6 \\times 8$." },
    { question: "« $n = 0$ », « répéter $5$ fois : ajouter $3$ à $n$ ». À la fin, $n$ vaut :", choix: ["$15$", "$8$", "$3$", "$53$"], bonne: 0, explication: "$5 \\times 3$." },
    { question: "« $n = 100$ », « répéter $4$ fois : enlever $10$ à $n$ ». À la fin, $n$ vaut :", choix: ["$60$", "$90$", "$40$", "$96$"], bonne: 0, explication: "$100 - 4 \\times 10$." },
    { question: "Pour faire avancer un robot de $5$ cases, on peut écrire :", choix: ["répéter $5$ fois : avancer d'une case", "avancer une fois", "tourner $5$ fois", "reculer $5$ fois"], bonne: 0, explication: "La boucle fait $5$ pas." },
    { question: "Programme : « choisir un nombre », « multiplier par $3$ », « ajouter $1$ ». Avec $4$ :", choix: ["$13$", "$15$", "$8$", "$12$"], bonne: 0, explication: "$4 \\times 3 + 1$." },
    { question: "Programme : « choisir un nombre », « ajouter $1$ », « multiplier par $3$ ». Avec $4$ :", choix: ["$15$", "$13$", "$8$", "$7$"], bonne: 0, explication: "$(4 + 1) \\times 3$." },
    { question: "La suite $3 \\;;\\; 6 \\;;\\; 9 \\;;\\; 12 \\;;\\; \\ldots$ ajoute à chaque fois :", choix: ["$3$", "$6$", "$2$", "$9$"], bonne: 0, explication: "$6 - 3 = 3$." },
    { question: "Le nombre suivant de $80 \\;;\\; 85 \\;;\\; 83 \\;;\\; 88 \\;;\\; 86$ est :", choix: ["$91$", "$84$", "$89$", "$93$"], bonne: 0, explication: "Règle « $+5$, $-2$ »." },
    { question: "Un programme qui « répète $3$ fois : avancer de $2$ cases » fait avancer de :", choix: ["$6$ cases", "$5$ cases", "$3$ cases", "$2$ cases"], bonne: 0, explication: "$3 \\times 2$." },
    { question: "Un « bug », c'est :", choix: ["une erreur dans un programme", "un nouveau programme", "une boucle réussie", "un ordinateur rapide"], bonne: 0, explication: "Il faut le corriger." },
    { question: "Pour trouver une erreur dans un programme, on peut :", choix: ["l'exécuter pas à pas", "le recopier plus vite", "ajouter des boucles", "le lire à l'envers"], bonne: 0, explication: "On vérifie chaque instruction." },
    { question: "Programme : « choisir $7$ », « répéter $2$ fois : multiplier par $2$ ». Résultat :", choix: ["$28$", "$14$", "$11$", "$49$"], bonne: 0, explication: "$7 \\times 2 = 14$, puis $14 \\times 2 = 28$." },
    { question: "Dans une recette, on mélange avant de cuire. C'est important car :", choix: ["l'ordre des étapes compte", "on peut tout faire en même temps", "l'ordre ne compte jamais", "on cuit deux fois"], bonne: 0, explication: "Comme dans un algorithme." }
  ],
  methode: [
    { titre: "Exécuter un programme pas à pas", etapes: ["Écris le nombre de départ.", "Applique chaque instruction dans l'ordre, en écrivant le résultat à chaque étape.", "Pour une boucle, compte bien le nombre de répétitions.", "Le dernier résultat est la réponse."], figure: "m1i-cours-programme", exemple: "$5 \\to 7 \\to 28$." }
  ],
  erreurs: ["Changer l'ordre des instructions.", "Répéter une fois de trop ou de moins dans une boucle.", "Oublier la valeur de départ dans une boucle.", "Lire la suite sans vérifier que la règle marche pour tous les nombres."]
};
