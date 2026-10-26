/*
  CHAPITRE : CM1 — La division euclidienne
  -----------------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM1 : sens de la division (partage, groupement) ; division
  euclidienne posée d'un entier par un nombre à un chiffre ; quotient et reste (reste plus petit que le diviseur) ;
  égalité a = b × q + r ; interpréter le quotient et le reste dans un problème ; multiples et diviseurs.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm1-division"] = {
  niveau: "CM1",
  numero: 6,
  titre: "La division euclidienne",
  accroche: "Partager ou grouper : poser la division, trouver le quotient et le reste.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Quotient et reste",
      video: { titre: "Vidéo de Maître Lucas : division en ligne", youtube: "https://youtu.be/uc6kOsSLzFY" },
      texte:
        "On range $165$ œufs dans des boîtes de $8$. Combien de boîtes pleines ?\n\n" +
        "$8 \\times 20 = 160$ et $8 \\times 21 = 168$ : c'est trop. On remplit donc $20$ boîtes et il reste $5$ œufs.\n\n" +
        "$165 = 8 \\times 20 + 5$\n\n" +
        "- $20$ est le **quotient**, $5$ est le **reste**.\n" +
        "- Le reste est toujours **plus petit que le diviseur** ($5 < 8$), sinon on pourrait remplir une boîte de plus.",
      exemple: { enonce: "Divise $74$ par $4$.", solution: "$74 = 4 \\times 18 + 2$ : quotient $18$, reste $2$." }
    },
    {
      titre: "Poser la division",
      video: { titre: "Vidéo de Maître Lucas : poser une division à un chiffre au diviseur", youtube: "https://youtu.be/i0Q6aAAZe0U" },
      texte:
        "Pour $984 \\div 6$ :\n\n" +
        "- En $9$ centaines, combien de fois $6$ ? $1$ fois ($6$), il reste $3$ centaines.\n" +
        "- $3$ centaines et $8$ dizaines font $38$ dizaines : $6$ fois ($36$), il reste $2$ dizaines.\n" +
        "- $2$ dizaines et $4$ unités font $24$ unités : $4$ fois ($24$), il reste $0$.\n\n" +
        "Quotient : $164$ ; reste : $0$. **Vérification** : $6 \\times 164 = 984$.\n\n" +
        "Dans un problème, on se demande ce que représentent le quotient et le reste : s'il reste des élèves, il faut **un voyage de plus** !",
      exemple: { enonce: "$111$ élèves, un bateau emmène $5$ élèves. Combien de voyages au minimum ?", solution: "$111 = 5 \\times 22 + 1$ : $22$ voyages pleins, plus $1$ voyage pour le dernier élève : $23$ voyages." }
    }
  ],
  exercices: [
    { type: "m1v-poser", titre: "Poser une division", etape: "Poser", nb: 5 },
    { type: "m1v-problemes", titre: "Problèmes de division", etape: "Problèmes", nb: 5 },
    { type: "m1n-multiples", titre: "Multiples et diviseurs", etape: "Poser", nb: 4 }
  ],
  qcm: [
    { question: "$165 = 8 \\times 20 + 5$. Le quotient de $165$ par $8$ est :", choix: ["$20$", "$5$", "$8$", "$165$"], bonne: 0, explication: "Le quotient est le nombre de fois." },
    { question: "Dans $165 = 8 \\times 20 + 5$, le reste est :", choix: ["$5$", "$20$", "$8$", "$0$"], bonne: 0, explication: "Ce qui reste quand on a fait le plus de groupes possible." },
    { question: "Le reste d'une division par $6$ peut être :", choix: ["$5$", "$6$", "$7$", "$12$"], bonne: 0, explication: "Il doit être plus petit que $6$." },
    { question: "$74 \\div 4$ : quotient et reste ?", choix: ["$18$ reste $2$", "$17$ reste $6$", "$18$ reste $0$", "$19$ reste $2$"], bonne: 0, explication: "$4 \\times 18 = 72$, $74 - 72 = 2$." },
    { question: "$984 \\div 6 =$", choix: ["$164$", "$154$", "$1\\,064$", "$16$"], bonne: 0, explication: "$6 \\times 164 = 984$." },
    { question: "Pour vérifier $74 = 4 \\times 18 + 2$, on calcule :", choix: ["$4 \\times 18 + 2$", "$74 \\times 4$", "$18 + 2$", "$74 - 4$"], bonne: 0, explication: "Ce calcul doit redonner $74$." },
    { question: "$111$ élèves, $5$ élèves par bateau : combien de voyages au minimum ?", choix: ["$23$", "$22$", "$21$", "$111$"], bonne: 0, explication: "$22$ voyages pleins et $1$ de plus pour le dernier élève." },
    { question: "$165$ œufs en boîtes de $8$ : combien de boîtes pleines ?", choix: ["$20$", "$21$", "$5$", "$8$"], bonne: 0, explication: "$8 \\times 20 = 160$." },
    { question: "On partage $146$ billes entre $4$ enfants. Combien de billes restent ?", choix: ["$2$", "$36$", "$4$", "$0$"], bonne: 0, explication: "$4 \\times 36 = 144$." },
    { question: "$7 \\times 9 = 63$, donc $63 \\div 7 =$", choix: ["$9$", "$7$", "$56$", "$70$"], bonne: 0, explication: "La division est l'opération inverse." },
    { question: "$3\\,702 \\div 4$ : combien de chiffres a le quotient ?", choix: ["$3$", "$4$", "$2$", "$1$"], bonne: 0, explication: "$3 < 4$ : on commence par $37$ centaines." },
    { question: "$248$ chaises rangées par $8$. Combien de rangées ?", choix: ["$31$", "$30$", "$32$", "$240$"], bonne: 0, explication: "$8 \\times 31 = 248$." },
    { question: "Dans une division, si le reste est égal au diviseur :", choix: ["il y a une erreur", "c'est normal", "le quotient est $0$", "on s'arrête"], bonne: 0, explication: "On pouvait faire un groupe de plus." },
    { question: "$50 \\div 6$ :", choix: ["quotient $8$, reste $2$", "quotient $8$, reste $6$", "quotient $9$, reste $4$", "quotient $7$, reste $8$"], bonne: 0, explication: "$6 \\times 8 = 48$." },
    { question: "$90$ € partagés en $9$ parts égales. Chaque part vaut :", choix: ["$10$ €", "$9$ €", "$81$ €", "$1$ €"], bonne: 0, explication: "$9 \\times 10 = 90$." },
    { question: "$3\\,415 \\div 4$ : quel est le reste ?", choix: ["$3$", "$1$", "$0$", "$5$"], bonne: 0, explication: "$4 \\times 853 = 3\\,412$." },
    { question: "$9$ est un diviseur de :", choix: ["$72$", "$70$", "$29$", "$91$"], bonne: 0, explication: "$9 \\times 8 = 72$." },
    { question: "On veut des paquets de $6$ mangues avec $40$ mangues. Combien de mangues ne seront pas dans un paquet ?", choix: ["$4$", "$6$", "$34$", "$0$"], bonne: 0, explication: "$40 = 6 \\times 6 + 4$." }
  ],
  methode: [
    { titre: "Poser une division euclidienne", etapes: ["Choisis le premier « morceau » du dividende assez grand pour contenir le diviseur.", "Cherche combien de fois le diviseur y tient (table) ; écris le reste.", "Abaisse le chiffre suivant et recommence.", "Vérifie : multiplie le diviseur par le quotient et ajoute le reste, tu dois retrouver le dividende ; le reste doit être plus petit que le diviseur."], exemple: "$984 \\div 6 = 164$ reste $0$ ; $6 \\times 164 = 984$." },
    { titre: "Interpréter le reste dans un problème", etapes: ["Fais la division.", "Demande-toi ce que représentent le quotient et le reste.", "S'il faut transporter tout le monde, ajoute $1$ au quotient quand le reste n'est pas nul."], exemple: "$111$ élèves par bateaux de $5$ : $23$ voyages." }
  ],
  erreurs: ["Trouver un reste plus grand que le diviseur.", "Oublier un $0$ au quotient (par exemple $3\\,212 \\div 4 = 803$).", "Donner le quotient quand on demande le reste.", "Oublier le voyage supplémentaire quand il reste des personnes."]
};
