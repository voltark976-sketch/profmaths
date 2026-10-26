/*
  CHAPITRE : CE2 — Comparer, ranger, encadrer
  --------------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE2 : comparer, encadrer, intercaler des nombres jusqu'à 10 000 avec
  =, < et > ; ordonner cinq nombres (6 234, 6 243, 6 239, 6 300, 5 229) ; placer un nombre sur une demi-droite graduée
  de un en un, de dix en dix, de cent en cent ou de mille en mille.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce2-comparer"] = {
  niveau: "CE2",
  numero: 2,
  titre: "Comparer, ranger, encadrer",
  accroche: "Comparer et ranger des nombres jusqu'à $10\\,000$, les encadrer et les placer sur une droite graduée.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Comparer et ranger",
      video: { titre: "Vidéo de Maître Lucas : comparer et ranger les nombres jusqu'à 999", youtube: "https://youtu.be/VI4DUHs3JDE" },
      texte:
        "On compare les chiffres **de gauche à droite** : milliers, puis centaines, puis dizaines, puis unités.\n\n" +
        "$6\\,243 > 6\\,239$ : mêmes milliers, mêmes centaines, mais $4$ dizaines $>$ $3$ dizaines.\n\n" +
        "Ordre croissant : $5\\,229 < 6\\,234 < 6\\,239 < 6\\,243 < 6\\,300$.",
      exemple: { enonce: "Compare $9\\,099$ et $9\\,909$.", solution: "Mêmes milliers ; $0$ centaine $< 9$ centaines : $9\\,099 < 9\\,909$." }
    },
    {
      titre: "Encadrer et placer",
      video: { titre: "Vidéo de Maître Lucas : utiliser une droite graduée, intercaler des nombres", youtube: "https://youtu.be/cZ9tQ_OV_3g" },
      texte:
        "- Entre deux **centaines** : $3\\,500 < 3\\,552 < 3\\,600$.\n" +
        "- Entre deux **milliers** : $3\\,000 < 3\\,552 < 4\\,000$.\n\n" +
        "Sur une droite graduée, un bond peut valoir $1$, $10$, $100$ ou $1\\,000$ : on le trouve avec deux nombres écrits.",
      figure: "e2c-cours-droite",
      exemple: { enonce: "Quel nombre est au point A ?", solution: "Un bond vaut $1\\,000$ ; A est à $5$ bonds de $3\\,000$ : $8\\,000$." }
    }
  ],
  exercices: [
    { type: "e2c-signes", titre: "Comparer avec <, > ou =", etape: "Comparer", nb: 6 },
    { type: "e2c-ranger", titre: "Ranger cinq nombres", etape: "Comparer", nb: 5 },
    { type: "e2c-encadrer", titre: "Encadrer et lire une droite graduée", etape: "Encadrer", nb: 6 }
  ],
  qcm: [
    { question: "$4\\,560 \\;\\ldots\\; 4\\,506$", choix: ["$>$", "$<$", "$=$"], bonne: 0, explication: "$6$ dizaines $> 0$ dizaine." },
    { question: "$7\\,089 \\;\\ldots\\; 7\\,098$", choix: ["$<$", "$>$", "$=$"], bonne: 0, explication: "$8$ dizaines $< 9$ dizaines." },
    { question: "$3\\,000 + 200 \\;\\ldots\\; 3\\,200$", choix: ["$=$", "$<$", "$>$"], bonne: 0, explication: "$3\\,200 = 3\\,200$." },
    { question: "Le plus grand nombre est :", choix: ["$8\\,010$", "$8\\,001$", "$7\\,999$", "$8\\,000$"], bonne: 0, explication: "$8\\,010$ a une dizaine." },
    { question: "Le plus petit nombre est :", choix: ["$5\\,229$", "$6\\,234$", "$6\\,239$", "$5\\,292$"], bonne: 0, explication: "$5\\,229 < 5\\,292$." },
    { question: "Complète : $\\ldots < 6\\,347 < 6\\,400$", choix: ["$6\\,300$", "$6\\,340$", "$6\\,000$", "$6\\,346$"], bonne: 0, explication: "Deux centaines qui se suivent." },
    { question: "Complète : $2\\,000 < 2\\,785 < \\ldots$", choix: ["$3\\,000$", "$2\\,800$", "$2\\,790$", "$10\\,000$"], bonne: 0, explication: "Deux milliers qui se suivent." },
    { question: "Un nombre compris entre $4\\,990$ et $5\\,010$ :", choix: ["$5\\,000$", "$4\\,900$", "$5\\,100$", "$500$"], bonne: 0, explication: "$4\\,990 < 5\\,000 < 5\\,010$." },
    { question: "Sur une droite graduée de $100$ en $100$, après $3\\,800$ vient :", choix: ["$3\\,900$", "$3\\,801$", "$4\\,800$", "$3\\,810$"], bonne: 0, explication: "On ajoute $100$." },
    { question: "Quel nombre est au point A ?", figure: "e2c-cours-droite", choix: ["$8\\,000$", "$3\\,005$", "$5\\,000$", "$7\\,000$"], bonne: 0, explication: "$3\\,000 + 5 \\times 1\\,000$." },
    { question: "Ordre décroissant :", choix: ["$9\\,100$ ; $9\\,010$ ; $9\\,001$ ; $910$", "$910$ ; $9\\,001$ ; $9\\,010$ ; $9\\,100$", "$9\\,010$ ; $9\\,100$ ; $9\\,001$ ; $910$", "$9\\,100$ ; $9\\,001$ ; $9\\,010$ ; $910$"], bonne: 0, explication: "Du plus grand au plus petit." },
    { question: "« $6\\,500$ est supérieur à $6\\,050$ » s'écrit :", choix: ["$6\\,500 > 6\\,050$", "$6\\,500 < 6\\,050$", "$6\\,050 > 6\\,500$", "$6\\,500 = 6\\,050$"], bonne: 0, explication: "Supérieur : $>$." },
    { question: "Entre $1\\,999$ et $2\\,001$, il y a :", choix: ["$2\\,000$", "$1\\,000$", "$2\\,010$", "$1\\,990$"], bonne: 0, explication: "$1\\,999$, $2\\,000$, $2\\,001$." },
    { question: "Le plus grand nombre de $4$ chiffres est :", choix: ["$9\\,999$", "$10\\,000$", "$9\\,000$", "$1\\,000$"], bonne: 0, explication: "$10\\,000$ a $5$ chiffres." },
    { question: "Le plus petit nombre de $4$ chiffres est :", choix: ["$1\\,000$", "$0\\,001$", "$1\\,111$", "$999$"], bonne: 0, explication: "$999$ n'a que $3$ chiffres." },
    { question: "Quel nombre est entre $4\\,000$ et $5\\,000$ ?", choix: ["$4\\,876$", "$5\\,004$", "$3\\,999$", "$40\\,500$"], bonne: 0, explication: "Il a $4$ milliers." },
    { question: "$9\\,999 + 1 = $", choix: ["$10\\,000$", "$99\\,910$", "$9\\,990$", "$1\\,000$"], bonne: 0, explication: "Dix-mille." },
    { question: "Pour comparer deux nombres de $4$ chiffres, on commence par :", choix: ["les milliers", "les unités", "les dizaines", "le chiffre le plus grand"], bonne: 0, explication: "De gauche à droite." }
  ],
  methode: [
    { titre: "Ranger des nombres de 4 chiffres", etapes: ["Range d'abord selon les milliers.", "À milliers égaux, compare les centaines, puis les dizaines, puis les unités.", "Vérifie avec les signes $<$."], exemple: "$6\\,234 < 6\\,239 < 6\\,243$." }
  ],
  erreurs: ["Comparer les unités en premier.", "Confondre croissant et décroissant.", "Croire qu'un bond vaut toujours $1$ sur une droite graduée.", "Encadrer avec des dizaines quand on demande des centaines."]
};
