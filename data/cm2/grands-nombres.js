/*
  CHAPITRE : CM2 — Les grands nombres
  ------------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM2 : nombres entiers jusqu'à 999 999 999 (classe des millions) ;
  lire, écrire, valeur des chiffres, nombre de milliers ou de millions ; comparer, encadrer, ranger, droite graduée ;
  diviseurs et multiples : diviseur ≤ 10 d'un nombre, diviseurs d'un nombre ≤ 30, diviseurs communs (≤ 30),
  multiples communs (< 15) ; critères de divisibilité par 2, 5 et 10.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm2-grands-nombres"] = {
  niveau: "CM2",
  numero: 1,
  titre: "Les grands nombres",
  accroche: "La classe des millions, et les diviseurs et multiples pour préparer les fractions.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "La classe des millions",
      video: { titre: "Vidéo de Maître Lucas : lire les grands nombres, la classe des millions", youtube: "https://youtu.be/gezWeHs2d4U" },
      texte:
        "On groupe les chiffres par **trois** à partir de la droite : classe des **unités**, classe des **mille**, classe des **millions**.\n\n" +
        "$320\\,508\\,416$ se lit : « trois-cent-vingt **millions** cinq-cent-huit-**mille** quatre-cent-seize ».\n\n" +
        "- Le chiffre $2$ est le chiffre des **dizaines de millions**.\n" +
        "- Il y a $320$ millions en tout, et $320\\,508$ milliers en tout.\n" +
        "- « Million » est un nom : il prend un s au pluriel ; « mille » est invariable.",
      figure: "m2n-cours-classes",
      exemple: { enonce: "Écris en chiffres : quarante-deux millions six-mille-trois.", solution: "$42\\,006\\,003$ (chaque classe a trois chiffres)." }
    },
    {
      titre: "Diviseurs et multiples",
      video: { titre: "Vidéo de Maître Lucas : diviseurs et multiples des nombres entiers", youtube: "https://youtu.be/DQ5c1oRLaYY" },
      texte:
        "$24 = 4 \\times 6$ : on dit que $4$ et $6$ sont des **diviseurs** de $24$, et que $24$ est un **multiple** de $4$ et de $6$.\n\n" +
        "- Les diviseurs de $24$ : $1$, $2$, $3$, $4$, $6$, $8$, $12$, $24$ (on les cherche par paires : $1 \\times 24$, $2 \\times 12$, $3 \\times 8$, $4 \\times 6$).\n" +
        "- Les diviseurs **communs** à $12$ et $18$ : $1$, $2$, $3$, $6$. Le plus grand est $6$.\n" +
        "- Les multiples communs à $4$ et $6$ : $12$, $24$, $36$… Le plus petit est $12$.\n" +
        "- Un nombre est divisible par $2$ s'il se termine par $0$, $2$, $4$, $6$, $8$ ; par $5$ s'il se termine par $0$ ou $5$ ; par $10$ s'il se termine par $0$.",
      exemple: { enonce: "$7$ est-il un diviseur de $91$ ?", solution: "Oui : $91 = 7 \\times 13$." }
    }
  ],
  exercices: [
    { type: "m2n-lire", titre: "Lire et écrire les grands nombres", etape: "Lire et écrire", nb: 6 },
    { type: "m2n-comparer", titre: "Comparer, ranger, placer", etape: "Comparer", nb: 6 },
    { type: "m2n-diviseurs", titre: "Diviseurs et multiples", etape: "Diviseurs", nb: 6 }
  ],
  qcm: [
    { question: "Dans $320\\,508\\,416$, le chiffre des dizaines de millions est :", choix: ["$2$", "$3$", "$0$", "$5$"], bonne: 0, explication: "Classe des millions : $3$ (centaines), $2$ (dizaines), $0$ (unités)." },
    { question: "Combien de millions en tout dans $320\\,508\\,416$ ?", choix: ["$320$", "$3$", "$20$", "$320\\,508$"], bonne: 0, explication: "On lit la classe des millions." },
    { question: "« Quarante-deux millions six-mille-trois » s'écrit :", choix: ["$42\\,006\\,003$", "$42\\,600\\,300$", "$4\\,206\\,003$", "$42\\,060\\,003$"], bonne: 0, explication: "Chaque classe a trois chiffres." },
    { question: "$1\\,000\\,000$ s'écrit en lettres :", choix: ["un million", "mille-mille", "cent-mille", "un milliard"], bonne: 0, explication: "Mille milliers font un million." },
    { question: "Quel nombre est le plus grand ?", choix: ["$100\\,000\\,000$", "$99\\,999\\,999$", "$10\\,000\\,000$", "$9\\,999\\,999$"], bonne: 0, explication: "C'est le seul à $9$ chiffres." },
    { question: "Le nombre qui suit $9\\,999\\,999$ est :", choix: ["$10\\,000\\,000$", "$1\\,000\\,000$", "$9\\,999\\,990$", "$99\\,999\\,999$"], bonne: 0, explication: "Dix millions." },
    { question: "La France compte environ $68$ millions d'habitants. Cela s'écrit :", choix: ["$68\\,000\\,000$", "$6\\,800\\,000$", "$680\\,000$", "$68\\,000$"], bonne: 0, explication: "$68$ suivi de six zéros." },
    { question: "$45\\,300\\,000$ est compris entre :", choix: ["$45$ et $46$ millions", "$4$ et $5$ millions", "$450$ et $460$ millions", "$45$ et $46$ milliers"], bonne: 0, explication: "Il y a $45$ millions en tout." },
    { question: "Les diviseurs de $12$ sont :", choix: ["$1, 2, 3, 4, 6, 12$", "$1, 2, 3, 4, 5, 6, 12$", "$2, 4, 6, 8, 10, 12$", "$12, 24, 36$"], bonne: 0, explication: "$1 \\times 12$, $2 \\times 6$, $3 \\times 4$." },
    { question: "Le plus grand diviseur commun à $12$ et $18$ est :", choix: ["$6$", "$3$", "$2$", "$36$"], bonne: 0, explication: "Diviseurs communs : $1$, $2$, $3$, $6$." },
    { question: "Le plus petit multiple commun à $4$ et $6$ est :", choix: ["$12$", "$24$", "$10$", "$2$"], bonne: 0, explication: "$12$ est dans les tables de $4$ et de $6$." },
    { question: "Lequel est divisible par $5$ ?", choix: ["$3\\,425$", "$3\\,452$", "$3\\,524$", "$3\\,542$"], bonne: 0, explication: "Il se termine par $5$." },
    { question: "$7$ est un diviseur de :", choix: ["$91$", "$81$", "$71$", "$101$"], bonne: 0, explication: "$91 = 7 \\times 13$." },
    { question: "Combien de diviseurs a $30$ ?", choix: ["$8$", "$6$", "$4$", "$10$"], bonne: 0, explication: "$1, 2, 3, 5, 6, 10, 15, 30$." },
    { question: "Quel nombre est un multiple de $2$, de $5$ et de $10$ ?", choix: ["$4\\,560$", "$4\\,565$", "$4\\,562$", "$4\\,567$"], bonne: 0, explication: "Il se termine par $0$." },
    { question: "Dans $607\\,040\\,000$, combien de milliers en tout ?", choix: ["$607\\,040$", "$40$", "$607$", "$7\\,040$"], bonne: 0, explication: "On cache les trois derniers chiffres." },
    { question: "Sur une droite graduée de $10$ millions en $10$ millions, après $250\\,000\\,000$ vient :", choix: ["$260\\,000\\,000$", "$251\\,000\\,000$", "$350\\,000\\,000$", "$250\\,010\\,000$"], bonne: 0, explication: "On ajoute $10\\,000\\,000$." },
    { question: "$9$ est-il un diviseur de $81$ ?", choix: ["oui, $81 = 9 \\times 9$", "non, $81$ est impair", "non, $81$ ne finit pas par $9$", "on ne peut pas savoir"], bonne: 0, explication: "Table de $9$." }
  ],
  methode: [
    { titre: "Trouver tous les diviseurs d'un nombre", etapes: ["Commence par $1 \\times$ le nombre.", "Teste $2$, $3$, $4$… : à chaque division sans reste, note la paire.", "Arrête-toi quand les paires se répètent.", "Range les diviseurs dans l'ordre."], exemple: "$24$ : $1 \\times 24$, $2 \\times 12$, $3 \\times 8$, $4 \\times 6$ → $1, 2, 3, 4, 6, 8, 12, 24$." },
    { titre: "Lire un très grand nombre", etapes: ["Sépare les classes de trois chiffres en partant de la droite.", "Lis la classe des millions et dis « millions ».", "Lis la classe des mille et dis « mille ».", "Lis la classe des unités."], figure: "m2n-cours-classes", exemple: "$320\\,508\\,416$." }
  ],
  erreurs: ["Oublier les zéros d'une classe : écrire $42\\,603$ au lieu de $42\\,006\\,003$.", "Confondre le chiffre des millions et le nombre de millions.", "Oublier $1$ et le nombre lui-même dans la liste des diviseurs.", "Confondre diviseur et multiple."]
};
