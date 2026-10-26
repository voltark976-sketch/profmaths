/*
  CHAPITRE : CM1 — Les grands nombres
  ------------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM1 : nombres entiers jusqu'à 999 999 ; classe des mille et classe
  des unités ; lire, écrire en chiffres et en lettres ; valeur d'un chiffre selon sa position ; nombre de centaines, de
  milliers ; comparer, ranger, encadrer ; repérer sur une droite graduée ; multiples et diviseurs (2, 5, 10…).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm1-grands-nombres"] = {
  niveau: "CM1",
  numero: 1,
  titre: "Les grands nombres",
  accroche: "Lire, écrire et comparer les nombres jusqu'à 999 999, et reconnaître multiples et diviseurs.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "La classe des mille",
      video: { titre: "Vidéo de Maître Lucas : la classe des mille, les nombres jusqu'à 999 999", youtube: "https://youtu.be/4NDrTxdwceU" },
      texte:
        "Pour lire un grand nombre, on sépare les chiffres par **groupes de trois** en partant de la droite : ce sont les **classes**.\n\n" +
        "$457\\,082$ se lit : « quatre-cent-cinquante-sept-**mille** quatre-vingt-deux ».\n\n" +
        "- Le chiffre $4$ est le chiffre des **centaines de mille**.\n" +
        "- Il y a $4\\,570$ **centaines** en tout dans $457\\,082$, et $457$ **milliers**.\n" +
        "- En lettres, « mille » est invariable et on relie tous les mots par des traits d'union.",
      figure: "m1n-cours-classes",
      exemple: { enonce: "Écris en chiffres : trois-cent-mille-quarante.", solution: "$300\\,040$ (attention au zéro des centaines, des dizaines de mille…)." }
    },
    {
      titre: "Comparer, encadrer, multiples",
      video: { titre: "Vidéo de Maître Lucas : comparer des grands nombres", youtube: "https://youtu.be/LF9r29Iy4NA" },
      texte:
        "Pour **comparer** deux nombres, on compte d'abord leurs chiffres ; s'ils en ont autant, on compare chiffre par chiffre en partant de la gauche.\n\n" +
        "$693\\,000 < 693\\,332 < 694\\,000$ : on a **encadré** $693\\,332$ entre deux milliers qui se suivent.\n\n" +
        "- Un **multiple de $2$** se termine par $0$, $2$, $4$, $6$ ou $8$ ; de $5$ par $0$ ou $5$ ; de $10$ par $0$.\n" +
        "- $7$ est un **diviseur** de $56$ car $56 = 7 \\times 8$ : on dit aussi que $56$ est un multiple de $7$.",
      exemple: { enonce: "Range dans l'ordre croissant : $98\\,700$ ; $102\\,000$ ; $98\\,070$.", solution: "$98\\,070 < 98\\,700 < 102\\,000$." }
    }
  ],
  exercices: [
    { type: "m1n-lire", titre: "Lire et écrire les grands nombres", etape: "Lire et écrire", nb: 6 },
    { type: "m1n-comparer", titre: "Comparer, encadrer, placer", etape: "Comparer", nb: 6 },
    { type: "m1n-multiples", titre: "Multiples et diviseurs", etape: "Multiples", nb: 5 }
  ],
  qcm: [
    { question: "Dans $457\\,082$, quel est le chiffre des centaines de mille ?", choix: ["$4$", "$5$", "$7$", "$0$"], bonne: 0, explication: "C'est le premier chiffre à gauche de la classe des mille." },
    { question: "Combien y a-t-il de milliers en tout dans $457\\,082$ ?", choix: ["$457$", "$7$", "$4\\,570$", "$57$"], bonne: 0, explication: "On lit le nombre formé par la classe des mille." },
    { question: "« Deux-cent-mille-cinq » s'écrit :", choix: ["$200\\,005$", "$2\\,005$", "$200\\,500$", "$20\\,005$"], bonne: 0, explication: "Classe des mille : $200$ ; classe des unités : $005$." },
    { question: "$80\\,600$ s'écrit en lettres :", choix: ["quatre-vingt-mille-six-cents", "huit-mille-six-cents", "quatre-vingts-mille-six-cent", "quatre-vingt-six-mille"], bonne: 0, explication: "« Quatre-vingt » ne prend pas de s devant « mille », et « six-cents » termine le nombre." },
    { question: "Quel nombre est le plus grand ?", choix: ["$120\\,000$", "$99\\,999$", "$102\\,000$", "$119\\,999$"], bonne: 0, explication: "Il a $6$ chiffres et commence par $12$." },
    { question: "Quel est le nombre qui suit $199\\,999$ ?", choix: ["$200\\,000$", "$190\\,000$", "$200\\,999$", "$1\\,999\\,990$"], bonne: 0, explication: "$199\\,999 + 1 = 200\\,000$." },
    { question: "$693\\,332$ est compris entre :", choix: ["$693\\,000$ et $694\\,000$", "$692\\,000$ et $693\\,000$", "$600\\,000$ et $690\\,000$", "$694\\,000$ et $695\\,000$"], bonne: 0, explication: "On regarde la classe des mille : $693$." },
    { question: "Lequel est un multiple de $5$ ?", choix: ["$4\\,085$", "$4\\,083$", "$4\\,051$", "$4\\,509$"], bonne: 0, explication: "Il se termine par $5$." },
    { question: "Lequel est un multiple de $2$ ?", choix: ["$37\\,014$", "$37\\,015$", "$37\\,013$", "$37\\,019$"], bonne: 0, explication: "Il se termine par un chiffre pair." },
    { question: "$7$ est un diviseur de :", choix: ["$56$", "$50$", "$45$", "$66$"], bonne: 0, explication: "$56 = 7 \\times 8$." },
    { question: "Quel nombre n'est pas un diviseur de $24$ ?", choix: ["$5$", "$3$", "$4$", "$6$"], bonne: 0, explication: "$24$ ne se termine ni par $0$ ni par $5$." },
    { question: "Dans $305\\,218$, le chiffre $5$ vaut :", choix: ["$5\\,000$", "$500$", "$50\\,000$", "$5$"], bonne: 0, explication: "C'est le chiffre des unités de mille." },
    { question: "$40\\,000 + 3\\,000 + 20 + 7 =$", choix: ["$43\\,027$", "$43\\,207$", "$4\\,327$", "$403\\,027$"], bonne: 0, explication: "Il n'y a pas de centaines : on écrit un zéro." },
    { question: "Sur une droite graduée de $10\\,000$ en $10\\,000$, le nombre juste après $250\\,000$ est :", choix: ["$260\\,000$", "$251\\,000$", "$350\\,000$", "$250\\,010$"], bonne: 0, explication: "On ajoute $10\\,000$." },
    { question: "Ranger dans l'ordre décroissant, c'est ranger :", choix: ["du plus grand au plus petit", "du plus petit au plus grand", "par nombre de chiffres pairs", "au hasard"], bonne: 0, explication: "Décroissant : on descend." },
    { question: "Le nombre de centaines en tout dans $28\\,750$ est :", choix: ["$287$", "$7$", "$28$", "$2\\,875$"], bonne: 0, explication: "On lit tout ce qui est à gauche du chiffre des dizaines." },
    { question: "Un multiple de $10$ se termine toujours par :", choix: ["$0$", "$5$", "$1$", "$10$"], bonne: 0, explication: "Ex. : $10$, $20$, $3\\,450$." },
    { question: "La population de Mayotte (environ trois-cent-vingt-mille habitants) s'écrit :", choix: ["$320\\,000$", "$32\\,000$", "$3\\,200\\,000$", "$302\\,000$"], bonne: 0, explication: "$320$ milliers." }
  ],
  methode: [
    { titre: "Lire un grand nombre", etapes: ["Sépare les chiffres par groupes de trois en partant de la droite.", "Lis le groupe de gauche, puis dis « mille ».", "Lis le dernier groupe (les unités)."], figure: "m1n-cours-classes", exemple: "$457\\,082$ : « quatre-cent-cinquante-sept-mille quatre-vingt-deux »." },
    { titre: "Comparer deux grands nombres", etapes: ["Compte les chiffres : celui qui en a le plus est le plus grand.", "S'ils en ont autant, compare les chiffres un par un en partant de la gauche.", "Le premier chiffre différent décide."], exemple: "$544\\,800 < 570\\,982$ car $4 < 7$ au rang des dizaines de mille." }
  ],
  erreurs: ["Oublier les zéros : écrire $2\\,005$ pour « deux-cent-mille-cinq ».", "Confondre le chiffre des centaines ($7$ dans $28\\,750$) et le nombre de centaines ($287$).", "Comparer en regardant seulement le premier chiffre sans compter les chiffres.", "Mettre un s à « mille »."]
};
