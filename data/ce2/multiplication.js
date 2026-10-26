/*
  CHAPITRE : CE2 — La multiplication posée
  -----------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE2 : comprendre et utiliser « facteur », « produit », « multiple » ;
  poser et effectuer des multiplications d'un nombre à deux ou trois chiffres par un nombre à un ou deux chiffres
  (algorithme introduit en période 4 au plus tard), le nombre ayant le moins de chiffres sur la deuxième ligne.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce2-multiplication"] = {
  niveau: "CE2",
  numero: 5,
  titre: "La multiplication posée",
  accroche: "Facteurs, produit, multiples, et la multiplication posée par un ou deux chiffres.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Facteurs, produit, multiples",
      video: { titre: "Vidéo de Maître Lucas : le sens de la multiplication", youtube: "https://youtu.be/z97YBO49dL0" },
      texte:
        "« Le **produit** de $3$ et de $25$ est $75$. » $3$ et $25$ sont les **facteurs**.\n\n" +
        "« $75$ est un **multiple** de $25$ » : il est dans la table de $25$.\n\n" +
        "Les nombres pairs sont les multiples de $2$.",
      exemple: { enonce: "$48$ est-il un multiple de $6$ ?", solution: "Oui : $6 \\times 8 = 48$." }
    },
    {
      titre: "Multiplier par un nombre à un chiffre",
      video: { titre: "Vidéo de Maître Lucas : les multiplications posées à un chiffre", youtube: "https://youtu.be/DbFlbmiXVqA" },
      texte:
        "Pour $548 \\times 6$ : on multiplie $6$ par chaque chiffre, en commençant par les unités, avec les retenues.\n\n" +
        "$\\begin{array}{r} 548 \\\\ \\times\\;6 \\\\ \\hline 3\\,288 \\end{array}$\n\n" +
        "$6 \\times 8 = 48$ : j'écris $8$, je retiens $4$. $6 \\times 4 = 24$, $+ 4 = 28$ : j'écris $8$, je retiens $2$. $6 \\times 5 = 30$, $+ 2 = 32$.",
      exemple: { enonce: "Calcule $237 \\times 4$.", solution: "$948$." }
    },
    {
      titre: "Multiplier par un nombre à deux chiffres",
      video: { titre: "Vidéo de Maître Lucas : les multiplications posées à plusieurs chiffres", youtube: "https://youtu.be/M6t154vbydA" },
      texte:
        "Pour $548 \\times 16$ : on calcule $548 \\times 6$, puis $548 \\times 10$ (on écrit d'abord un $0$), et on additionne.\n\n" +
        "$548 \\times 6 = 3\\,288$ ; $548 \\times 10 = 5\\,480$ ; $3\\,288 + 5\\,480 = 8\\,768$.",
      exemple: { enonce: "Calcule $83 \\times 34$.", solution: "$83 \\times 4 = 332$ ; $83 \\times 30 = 2\\,490$ ; total $2\\,822$." }
    }
  ],
  exercices: [
    { type: "e2m-vocabulaire", titre: "Facteurs, produit, multiples", etape: "Comprendre", nb: 6 },
    { type: "e2m-posee", titre: "Poser une multiplication", etape: "Calculer", nb: 5 },
    { type: "e2k-faits", titre: "Les tables et les doubles (révision)", etape: "Calculer", nb: 8 }
  ],
  qcm: [
    { question: "Le produit de $7$ et de $8$ est :", choix: ["$56$", "$15$", "$78$", "$54$"], bonne: 0, explication: "$7 \\times 8 = 56$." },
    { question: "Dans $6 \\times 9 = 54$, $6$ et $9$ sont :", choix: ["les facteurs", "les termes", "le produit", "les différences"], bonne: 0, explication: "On les multiplie." },
    { question: "Lequel est un multiple de $4$ ?", choix: ["$28$", "$26$", "$30$", "$14$"], bonne: 0, explication: "$4 \\times 7 = 28$." },
    { question: "$548 \\times 6 = $", choix: ["$3\\,288$", "$3\\,048$", "$554$", "$3\\,248$"], bonne: 0, explication: "Avec les retenues $4$ et $2$." },
    { question: "$237 \\times 4 = $", choix: ["$948$", "$828$", "$241$", "$908$"], bonne: 0, explication: "$4 \\times 7 = 28$, $4 \\times 3 + 2 = 14$, $4 \\times 2 + 1 = 9$." },
    { question: "$25 \\times 4 = $", choix: ["$100$", "$29$", "$80$", "$1\\,000$"], bonne: 0, explication: "Quatre fois vingt-cinq." },
    { question: "$83 \\times 34 = $", choix: ["$2\\,822$", "$581$", "$2\\,822 + 10$", "$2\\,492$"], bonne: 0, explication: "$332 + 2\\,490$." },
    { question: "Pour $548 \\times 16$, la deuxième ligne commence par :", choix: ["un $0$", "un $1$", "un $6$", "rien"], bonne: 0, explication: "On multiplie par $10$ : un $0$ aux unités." },
    { question: "Quand on pose une multiplication, on met en bas :", choix: ["le nombre qui a le moins de chiffres", "le plus grand nombre", "toujours $10$", "le résultat"], bonne: 0, explication: "C'est plus simple." },
    { question: "$100 \\times 9 = $", choix: ["$900$", "$109$", "$90$", "$9\\,000$"], bonne: 0, explication: "Deux zéros." },
    { question: "Les nombres pairs sont les multiples de :", choix: ["$2$", "$3$", "$5$", "$10$"], bonne: 0, explication: "$2$, $4$, $6$…" },
    { question: "$12 \\times 11 = $", choix: ["$132$", "$121$", "$23$", "$122$"], bonne: 0, explication: "$12 \\times 10 + 12$." },
    { question: "$305 \\times 3 = $", choix: ["$915$", "$905$", "$308$", "$9\\,015$"], bonne: 0, explication: "$900 + 15$." },
    { question: "$75$ est un multiple de :", choix: ["$25$", "$10$", "$2$", "$4$"], bonne: 0, explication: "$3 \\times 25 = 75$." },
    { question: "$40 \\times 6 = $", choix: ["$240$", "$46$", "$2\\,400$", "$24$"], bonne: 0, explication: "$4 \\times 6 = 24$ dizaines." },
    { question: "Le produit de $9$ et de $0$ est :", choix: ["$0$", "$9$", "$90$", "$1$"], bonne: 0, explication: "Fois zéro, c'est zéro." },
    { question: "$16 \\times 548 = 548 \\times \\ldots$", choix: ["$16$", "$548$", "$61$", "$1$"], bonne: 0, explication: "On peut échanger les facteurs." },
    { question: "$123 \\times 3 = $", choix: ["$369$", "$126$", "$339$", "$396$"], bonne: 0, explication: "Pas de retenue." }
  ],
  methode: [
    { titre: "Poser une multiplication par deux chiffres", etapes: ["Multiplie par le chiffre des unités.", "Écris un $0$ sur la deuxième ligne, puis multiplie par le chiffre des dizaines.", "Additionne les deux lignes."], exemple: "$66 \\times 26 = 396 + 1\\,320 = 1\\,716$." }
  ],
  erreurs: ["Oublier une retenue.", "Oublier le $0$ de la deuxième ligne.", "Additionner au lieu de multiplier.", "Confondre facteur (multiplication) et terme (addition)."]
};
