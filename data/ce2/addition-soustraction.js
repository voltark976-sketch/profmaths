/*
  CHAPITRE : CE2 — Addition et soustraction
  ------------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE2 : comprendre et utiliser « terme », « somme », « différence » ;
  poser et effectuer additions et soustractions en colonnes avec des nombres jusqu'à 10 000 (et des prix avec virgule).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce2-addition-soustraction"] = {
  niveau: "CE2",
  numero: 4,
  titre: "Addition et soustraction",
  accroche: "Termes, somme, différence : poser des additions et des soustractions avec des milliers.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Les mots de l'addition et de la soustraction",
      video: { titre: "Vidéo de Maître Lucas : revoir les soustractions posées", youtube: "https://youtu.be/bczl1rK-BLs" },
      texte:
        "- « La **somme** de $12$ et de $25$ est $37$. » $12$ et $25$ sont les **termes** de l'addition $12 + 25$.\n" +
        "- « La **différence** entre $60$ et $37$ est $23$. » $60$ et $37$ sont les termes de la soustraction $60 - 37$.",
      exemple: { enonce: "Quelle est la différence entre $500$ et $350$ ?", solution: "$500 - 350 = 150$." }
    },
    {
      titre: "Poser avec des milliers",
      video: { titre: "Vidéo de Maître Lucas : soustractions posées avec retenues", youtube: "https://youtu.be/iVSY_zXH6DU" },
      texte:
        "On aligne unités, dizaines, centaines et **milliers**, puis on calcule de droite à gauche avec les retenues.\n\n" +
        "$\\begin{array}{r} 6\\,252 \\\\ +\\;2\\,780 \\\\ \\hline 9\\,032 \\end{array}$\n\n" +
        "On vérifie une soustraction avec une addition : $9\\,032 - 2\\,780 = 6\\,252$ car $6\\,252 + 2\\,780 = 9\\,032$.",
      exemple: { enonce: "Pose et calcule $4\\,005 - 1\\,238$.", solution: "$4\\,005 - 1\\,238 = 2\\,767$ ; vérification : $2\\,767 + 1\\,238 = 4\\,005$." }
    }
  ],
  exercices: [
    { type: "e2a-vocabulaire", titre: "Somme, différence, termes", etape: "Comprendre", nb: 6 },
    { type: "e2a-posee", titre: "Poser une addition ou une soustraction", etape: "Calculer", nb: 5 },
    { type: "e2a-completer", titre: "Compléter, ajouter, enlever", etape: "Calculer", nb: 5 }
  ],
  qcm: [
    { question: "La somme de $1\\,200$ et de $300$ est :", choix: ["$1\\,500$", "$900$", "$1\\,230$", "$4\\,200$"], bonne: 0, explication: "$1\\,200 + 300$." },
    { question: "La différence entre $1\\,000$ et $400$ est :", choix: ["$600$", "$1\\,400$", "$400$", "$6\\,000$"], bonne: 0, explication: "$1\\,000 - 400$." },
    { question: "Dans $45 + 78 = 123$, $123$ est :", choix: ["la somme", "un terme", "la différence", "un facteur"], bonne: 0, explication: "Le résultat d'une addition." },
    { question: "Dans $90 - 35 = 55$, $55$ est :", choix: ["la différence", "la somme", "le produit", "un terme"], bonne: 0, explication: "Le résultat d'une soustraction." },
    { question: "$6\\,252 + 2\\,780 = $", choix: ["$9\\,032$", "$8\\,932$", "$9\\,022$", "$8\\,032$"], bonne: 0, explication: "Avec deux retenues." },
    { question: "$5\\,000 - 1 = $", choix: ["$4\\,999$", "$4\\,909$", "$5\\,001$", "$4\\,000$"], bonne: 0, explication: "Le nombre juste avant." },
    { question: "$7\\,350 - 2\\,200 = $", choix: ["$5\\,150$", "$9\\,550$", "$5\\,130$", "$5\\,350$"], bonne: 0, explication: "$7\\,350 - 2\\,000 = 5\\,350$, puis $- 200$." },
    { question: "Pour vérifier $9\\,032 - 2\\,780 = 6\\,252$, on calcule :", choix: ["$6\\,252 + 2\\,780$", "$9\\,032 + 2\\,780$", "$6\\,252 - 2\\,780$", "$9\\,032 + 6\\,252$"], bonne: 0, explication: "Résultat + nombre enlevé = nombre de départ." },
    { question: "$2\\,999 + 1\\,001 = $", choix: ["$4\\,000$", "$3\\,000$", "$4\\,100$", "$3\\,990$"], bonne: 0, explication: "$2\\,999 + 1 = 3\\,000$, puis $+ 1\\,000$." },
    { question: "$4\\,005 - 1\\,238 = $", choix: ["$2\\,767$", "$3\\,233$", "$2\\,867$", "$5\\,243$"], bonne: 0, explication: "Vérification : $2\\,767 + 1\\,238 = 4\\,005$." },
    { question: "$3{,}50$ € $+ 2{,}80$ € $=$", choix: ["$6{,}30$ €", "$5{,}30$ €", "$5{,}130$ €", "$6{,}80$ €"], bonne: 0, explication: "$50 + 80 = 130$ centimes $= 1{,}30$ €." },
    { question: "$8\\,000 + 700 + 6 = $", choix: ["$8\\,706$", "$8\\,760$", "$876$", "$87\\,006$"], bonne: 0, explication: "Milliers, centaines, unités." },
    { question: "Complète : $3\\,600 + \\ldots = 5\\,000$", choix: ["$1\\,400$", "$2\\,400$", "$1\\,600$", "$8\\,600$"], bonne: 0, explication: "$5\\,000 - 3\\,600$." },
    { question: "Les termes de $250 + 380$ sont :", choix: ["$250$ et $380$", "$630$", "$250$ et $630$", "$380$ et $630$"], bonne: 0, explication: "Les nombres qu'on additionne." },
    { question: "$1\\,234 + 4\\,321 = $", choix: ["$5\\,555$", "$5\\,545$", "$4\\,555$", "$5\\,655$"], bonne: 0, explication: "Pas de retenue : $5\\,555$." },
    { question: "$6\\,000 - 2\\,500 = $", choix: ["$3\\,500$", "$4\\,500$", "$8\\,500$", "$3\\,000$"], bonne: 0, explication: "$2\\,500 + 3\\,500 = 6\\,000$." },
    { question: "Dans une soustraction posée, le plus grand nombre est :", choix: ["en haut", "en bas", "n'importe où", "au milieu"], bonne: 0, explication: "On enlève au nombre du haut." },
    { question: "$9\\,999 - 9\\,000 = $", choix: ["$999$", "$9$", "$99$", "$900$"], bonne: 0, explication: "On enlève $9$ milliers." }
  ],
  methode: [
    { titre: "Poser une soustraction avec des milliers", etapes: ["Aligne les chiffres, le plus grand nombre en haut.", "Calcule de droite à gauche ; si c'est impossible, casse une unité du rang suivant (ou utilise la retenue).", "Vérifie par une addition."], exemple: "$4\\,005 - 1\\,238 = 2\\,767$ et $2\\,767 + 1\\,238 = 4\\,005$." }
  ],
  erreurs: ["Confondre somme et différence.", "Mal aligner un nombre à $3$ chiffres sous un nombre à $4$ chiffres.", "Oublier les retenues successives (avec des $0$, comme $4\\,005 - 1\\,238$).", "Ne pas vérifier une soustraction."]
};
