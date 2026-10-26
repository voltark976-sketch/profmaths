/*
  CHAPITRE : CM1 — Algèbre
  -------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM1 : le signe « = » comme égalité entre deux écritures ; égalités à
  trous (178 – … = 6 × 8) ; trouver une valeur inconnue représentée par un symbole ou une lettre dans un problème ;
  suites de nombres ou de motifs et leur règle (80 ; 85 ; 83 ; 88…) ; prévoir un terme éloigné.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm1-algebre"] = {
  niveau: "CM1",
  numero: 8,
  titre: "Algèbre",
  accroche: "Le signe « = » dit que les deux côtés valent la même chose : trouve le nombre caché !",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Des égalités à trous",
      video: { titre: "Vidéo de Maître Lucas : comprendre l'égalité et trouver le nombre manquant", youtube: "https://youtu.be/xEulEbtXMnU" },
      texte:
        "Le signe $=$ ne veut pas dire « le résultat est » : il veut dire que **ce qui est à gauche vaut autant que ce qui est à droite**, comme une balance en équilibre.\n\n" +
        "$84 - \\ldots = 6 \\times 6$\n\n" +
        "- À droite : $6 \\times 6 = 36$.\n" +
        "- À gauche, on cherche le nombre qu'on enlève à $84$ pour obtenir $36$ : $84 - 36 = 48$.\n\n" +
        "Vérification : $84 - 48 = 36$ et $6 \\times 6 = 36$. ✔",
      exemple: { enonce: "Complète : $48 + 58 = \\ldots + 15$.", solution: "$48 + 58 = 106$ ; $106 - 15 = 91$. Donc $48 + 58 = 91 + 15$." }
    },
    {
      titre: "Une valeur inconnue, une suite",
      texte:
        "**Une valeur inconnue.** $3$ paires de ciseaux et $4$ stylos coûtent $13$ €. Un stylo coûte $1$ €.\n\n" +
        "Les $4$ stylos coûtent $4$ €, donc les $3$ paires de ciseaux coûtent $13 - 4 = 9$ €, et une paire coûte $9 \\div 3 = 3$ €. On peut écrire avec une lettre : $3 \\times c + 4 = 13$, donc $c = 3$.\n\n" +
        "**Une suite.** $80 \\;;\\; 85 \\;;\\; 83 \\;;\\; 88 \\;;\\; 86 \\;;\\; \\ldots$ La règle : « $+5$, puis $-2$ ». Le nombre suivant est $91$.",
      exemple: { enonce: "Motif $1$ : $5$ allumettes ; on ajoute $2$ allumettes à chaque motif. Combien pour le motif $10$ ?", solution: "Du motif $1$ au motif $10$, on ajoute $9$ fois $2$ : $5 + 18 = 23$ allumettes." }
    }
  ],
  exercices: [
    { type: "m1a-trous", titre: "Égalités à trous", etape: "L'égalité", nb: 6 },
    { type: "m1a-inconnu", titre: "Trouver la valeur inconnue", etape: "L'inconnue", nb: 5 },
    { type: "m1a-suites", titre: "Suites et motifs", etape: "Les suites", nb: 5 }
  ],
  qcm: [
    { question: "Dans $84 - \\ldots = 36$, le nombre manquant est :", choix: ["$48$", "$120$", "$36$", "$58$"], bonne: 0, explication: "$84 - 48 = 36$." },
    { question: "Complète : $48 + 58 = \\ldots + 15$", choix: ["$91$", "$106$", "$121$", "$43$"], bonne: 0, explication: "$106 - 15 = 91$." },
    { question: "Le signe $=$ veut dire :", choix: ["les deux côtés ont la même valeur", "le résultat vient après", "on doit additionner", "le côté gauche est plus grand"], bonne: 0, explication: "Comme une balance en équilibre." },
    { question: "$178 - \\ldots = 6 \\times 8$", choix: ["$130$", "$48$", "$226$", "$172$"], bonne: 0, explication: "$6 \\times 8 = 48$ ; $178 - 48 = 130$." },
    { question: "Quelle égalité est vraie ?", choix: ["$25 + 15 = 50 - 10$", "$25 + 15 = 50$", "$6 \\times 4 = 20 + 3$", "$100 - 1 = 101$"], bonne: 0, explication: "$40 = 40$." },
    { question: "$\\ldots \\times 7 = 56$", choix: ["$8$", "$7$", "$49$", "$63$"], bonne: 0, explication: "$8 \\times 7 = 56$." },
    { question: "$3 \\times c + 4 = 13$. Combien vaut $c$ ?", choix: ["$3$", "$9$", "$17$", "$4$"], bonne: 0, explication: "$3 \\times c = 9$, donc $c = 3$." },
    { question: "$2$ cahiers et $1$ stylo coûtent $11$ €. Le stylo coûte $3$ €. Un cahier coûte :", choix: ["$4$ €", "$8$ €", "$7$ €", "$5{,}50$ €"], bonne: 0, explication: "$11 - 3 = 8$ ; $8 \\div 2 = 4$." },
    { question: "Règle « $+5$ puis $-2$ » : $80 \\;;\\; 85 \\;;\\; 83 \\;;\\; 88 \\;;\\; 86 \\;;\\; \\ldots$", choix: ["$91$", "$84$", "$88$", "$93$"], bonne: 0, explication: "$86 + 5 = 91$." },
    { question: "$7 \\;;\\; 14 \\;;\\; 21 \\;;\\; 28 \\;;\\; \\ldots$ Le nombre suivant est :", choix: ["$35$", "$32$", "$56$", "$29$"], bonne: 0, explication: "On ajoute $7$." },
    { question: "$5$ allumettes au motif $1$, puis $+2$ à chaque motif. Motif $10$ ?", choix: ["$23$", "$25$", "$20$", "$15$"], bonne: 0, explication: "$5 + 9 \\times 2$." },
    { question: "$\\triangle + \\triangle + \\triangle = 27$. Combien vaut $\\triangle$ ?", choix: ["$9$", "$24$", "$3$", "$81$"], bonne: 0, explication: "$27 \\div 3$." },
    { question: "$\\square + 15 = 40$", choix: ["$\\square = 25$", "$\\square = 55$", "$\\square = 35$", "$\\square = 15$"], bonne: 0, explication: "$40 - 15$." },
    { question: "$100 \\;;\\; 90 \\;;\\; 80 \\;;\\; \\ldots$ Le $6$e nombre est :", choix: ["$50$", "$60$", "$40$", "$70$"], bonne: 0, explication: "$70$, $60$, puis $50$." },
    { question: "$9 \\times 5 = 45 = 3 \\times \\ldots$", choix: ["$15$", "$42$", "$5$", "$9$"], bonne: 0, explication: "$3 \\times 15 = 45$." },
    { question: "Une boîte pèse autant que $3$ sacs de $2$ kg plus $1$ kg. Elle pèse :", choix: ["$7$ kg", "$6$ kg", "$9$ kg", "$5$ kg"], bonne: 0, explication: "$3 \\times 2 + 1$." },
    { question: "$2 \\;;\\; 4 \\;;\\; 8 \\;;\\; 16 \\;;\\; \\ldots$ La règle est :", choix: ["on multiplie par $2$", "on ajoute $2$", "on ajoute $4$", "on multiplie par $4$"], bonne: 0, explication: "Chaque nombre est le double du précédent." },
    { question: "$60 - \\ldots = 25 + 5$", choix: ["$30$", "$35$", "$90$", "$20$"], bonne: 0, explication: "$25 + 5 = 30$ ; $60 - 30 = 30$." }
  ],
  methode: [
    { titre: "Compléter une égalité à trous", etapes: ["Calcule le côté qui est complet.", "Cherche le nombre manquant de l'autre côté (addition ou soustraction à trou).", "Vérifie que les deux côtés ont la même valeur."], exemple: "$84 - \\ldots = 6 \\times 6$ : $36$ ; $84 - 36 = 48$ ; vérification : $84 - 48 = 36$." },
    { titre: "Trouver la règle d'une suite", etapes: ["Calcule l'écart entre deux nombres qui se suivent.", "Regarde si les écarts se répètent (par exemple $+5$, $-2$).", "Applique la règle pour trouver les nombres suivants."], exemple: "$80$ ; $85$ ; $83$ ; $88$ ; $86$ ; $91$ ; $89$ …" }
  ],
  erreurs: ["Écrire le résultat du côté gauche au lieu du nombre manquant : $48 + 58 = 106 + 15$.", "Croire que « $=$ » annonce toujours un résultat.", "Ne regarder que le premier écart d'une suite.", "Oublier de vérifier en remplaçant le nombre trouvé."]
};
