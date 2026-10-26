/*
  CHAPITRE : CM2 — Algèbre
  -------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM2 : sens du signe « = » ; égalités à trous (178 – … = 6 × 8) ;
  problèmes algébriques (2 paires de ciseaux et 3 stylos coûtent 20 €) ; symbole générique : (N × 12) + 5 ;
  exécuter ou produire un programme de calcul ; règle d'une suite de nombres ; suites de motifs évolutives (nombre
  d'éléments à une étape donnée).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm2-algebre"] = {
  niveau: "CM2",
  numero: 8,
  titre: "Algèbre",
  accroche: "Raisonner sur des nombres qu'on ne connaît pas encore, avec des symboles et des lettres.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Égalités et nombres inconnus",
      video: { titre: "Vidéo de Maître Lucas : comprendre l'égalité et trouver le nombre manquant", youtube: "https://youtu.be/xEulEbtXMnU" },
      texte:
        "Le signe $=$ veut dire que **les deux côtés ont la même valeur**.\n\n" +
        "$178 - \\ldots = 6 \\times 8$ : à droite, $48$ ; on cherche ce qu'on enlève à $178$ pour avoir $48$ : $130$.\n\n" +
        "**Un problème avec un symbole** : $2$ paires de ciseaux et $3$ stylos coûtent $20$ €, un stylo coûte $2$ €.\n\n" +
        "$2 \\times \\square + 3 \\times 2 = 20$, donc $2 \\times \\square = 14$ et $\\square = 7$ € : une paire de ciseaux coûte $7$ €.",
      exemple: { enonce: "Trouve $\\square$ : $4 \\times \\square + 5 = 33$.", solution: "$4 \\times \\square = 28$, donc $\\square = 7$." }
    },
    {
      titre: "Une lettre pour tous les nombres",
      texte:
        "Des t-shirts coûtent $12$ € et la livraison $5$ €. Pour $N$ t-shirts, on paie $(N \\times 12) + 5$ €.\n\n" +
        "- Pour $3$ t-shirts : $(3 \\times 12) + 5 = 41$ €.\n" +
        "- Pour $10$ t-shirts : $(10 \\times 12) + 5 = 125$ €.\n\n" +
        "**Suites de motifs** : $1$ carré d'allumettes : $4$ allumettes ; $2$ carrés : $7$ ; $3$ carrés : $10$. À chaque carré, on ajoute $3$ allumettes. Pour $20$ carrés : $1 + 3 \\times 20 = 61$ allumettes.",
      exemple: { enonce: "Étape $1$ : $5$ jetons, puis $+4$ à chaque étape. Étape $10$ ?", solution: "$5 + 9 \\times 4 = 41$ jetons." }
    }
  ],
  exercices: [
    { type: "m2a-trous", titre: "Égalités à trous", etape: "Égalités", nb: 6 },
    { type: "m2a-problemes", titre: "Problèmes algébriques", etape: "Inconnues", nb: 5 },
    { type: "m2a-motifs", titre: "Suites de motifs et de nombres", etape: "Suites", nb: 5 }
  ],
  qcm: [
    { question: "$178 - \\ldots = 6 \\times 8$", choix: ["$130$", "$48$", "$226$", "$170$"], bonne: 0, explication: "$178 - 48 = 130$." },
    { question: "$4 \\times \\square + 5 = 33$. $\\square =$", choix: ["$7$", "$28$", "$9{,}5$", "$8$"], bonne: 0, explication: "$4 \\times \\square = 28$." },
    { question: "$2$ paires de ciseaux et $3$ stylos coûtent $20$ €, un stylo coûte $2$ €. Une paire de ciseaux coûte :", choix: ["$7$ €", "$14$ €", "$9$ €", "$6$ €"], bonne: 0, explication: "$(20 - 6) \\div 2$." },
    { question: "Pour $N$ t-shirts à $12$ € et $5$ € de livraison, on paie :", choix: ["$(N \\times 12) + 5$", "$N \\times 17$", "$N + 12 + 5$", "$(N + 5) \\times 12$"], bonne: 0, explication: "La livraison est payée une fois." },
    { question: "Avec $N = 3$, $(N \\times 12) + 5 =$", choix: ["$41$", "$51$", "$20$", "$36$"], bonne: 0, explication: "$36 + 5$." },
    { question: "$8{,}6 + 4{,}7 = 3{,}7 + \\ldots$", choix: ["$9{,}6$", "$13{,}3$", "$17$", "$5{,}6$"], bonne: 0, explication: "$13{,}3 - 3{,}7$." },
    { question: "$51 \\times 8 = 51 \\times 7 + \\ldots$", choix: ["$51$", "$1$", "$8$", "$408$"], bonne: 0, explication: "Une fois $51$ de plus." },
    { question: "$4$ allumettes pour $1$ carré, $7$ pour $2$, $10$ pour $3$. Pour $20$ carrés :", choix: ["$61$", "$80$", "$60$", "$63$"], bonne: 0, explication: "$1 + 3 \\times 20$." },
    { question: "Étape $1$ : $5$ jetons, $+4$ à chaque étape. Étape $10$ :", choix: ["$41$", "$45$", "$40$", "$50$"], bonne: 0, explication: "$5 + 9 \\times 4$." },
    { question: "Deux nombres ont pour somme $57$ ; l'un dépasse l'autre de $13$. Le plus petit est :", choix: ["$22$", "$35$", "$28{,}5$", "$44$"], bonne: 0, explication: "$(57 - 13) \\div 2$." },
    { question: "La suite $2 \\;;\\; 5 \\;;\\; 9 \\;;\\; 14 \\;;\\; 20 \\;;\\; \\ldots$ continue avec :", choix: ["$27$", "$26$", "$25$", "$34$"], bonne: 0, explication: "Les écarts augmentent de $1$ : $+3, +4, +5, +6, +7$." },
    { question: "$\\triangle + \\triangle + 8 = 30$. $\\triangle =$", choix: ["$11$", "$22$", "$19$", "$15$"], bonne: 0, explication: "$2 \\times \\triangle = 22$." },
    { question: "Quelle égalité est vraie ?", choix: ["$6 \\times 8 = 50 - 2$", "$6 \\times 8 = 50$", "$6 + 8 = 48$", "$48 = 6 \\times 7$"], bonne: 0, explication: "$48 = 48$." },
    { question: "Programme : « choisir un nombre, ajouter $2$, multiplier par $4$, retirer $3$ ». Avec $5$ :", choix: ["$25$", "$17$", "$28$", "$10$"], bonne: 0, explication: "$5 \\to 7 \\to 28 \\to 25$." },
    { question: "Le même programme avec $0$ donne :", choix: ["$5$", "$0$", "$3$", "$8$"], bonne: 0, explication: "$0 \\to 2 \\to 8 \\to 5$." },
    { question: "$\\square \\times 9 = 63 + 9$. $\\square =$", choix: ["$8$", "$7$", "$72$", "$9$"], bonne: 0, explication: "$72 \\div 9$." },
    { question: "Un taxi coûte $3$ € plus $2$ € par km. Pour $k$ km, on paie :", choix: ["$3 + 2 \\times k$", "$5 \\times k$", "$(3 + 2) \\times k$", "$3 \\times k + 2$"], bonne: 0, explication: "Le départ ($3$ €) est payé une fois." },
    { question: "Pour $k = 10$ km, ce taxi coûte :", choix: ["$23$ €", "$50$ €", "$32$ €", "$15$ €"], bonne: 0, explication: "$3 + 20$." }
  ],
  methode: [
    { titre: "Trouver un nombre caché", etapes: ["Écris l'égalité avec un symbole ($\\square$) pour le nombre inconnu.", "Enlève ou ajoute ce qui est connu des deux côtés pour isoler le symbole.", "Divise si le symbole est multiplié.", "Vérifie en remplaçant le symbole par le nombre trouvé."], exemple: "$4 \\times \\square + 5 = 33$ → $4 \\times \\square = 28$ → $\\square = 7$ ; $4 \\times 7 + 5 = 33$ ✔." }
  ],
  erreurs: ["Lire « $=$ » comme « le résultat est » et écrire $48 + 58 = 106 + 15$.", "Oublier que la livraison n'est payée qu'une fois.", "Compter $n$ ajouts au lieu de $n - 1$ entre l'étape $1$ et l'étape $n$.", "Ne pas vérifier la solution."]
};
