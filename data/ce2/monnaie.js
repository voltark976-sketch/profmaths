/*
  CHAPITRE : CE2 — La monnaie
  ----------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE2 : simuler des achats ; poser et effectuer des additions de montants
  en euros (écriture à virgule) ; rendre la monnaie. Réponses avec virgule annoncées.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce2-monnaie"] = {
  niveau: "CE2",
  numero: 11,
  titre: "La monnaie",
  accroche: "Additionner des prix avec une virgule et rendre la monnaie.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Additionner des prix",
      video: { titre: "Vidéo de Maître Lucas : euros et centimes", youtube: "https://youtu.be/0zHqdLLWD68" },
      texte:
        "On pose l'addition en **alignant les virgules** : les euros sous les euros, les centimes sous les centimes.\n\n" +
        "$\\begin{array}{r} 3{,}50 \\\\ +\\;2{,}80 \\\\ \\hline 6{,}30 \\end{array}$\n\n" +
        "Centimes : $50 + 80 = 130$ centimes, c'est $1$ € et $30$ centimes : on écrit $30$ et on retient $1$ €.",
      exemple: { enonce: "Un cahier à $2{,}40$ € et une trousse à $5{,}75$ € : combien en tout ?", solution: "$2{,}40 + 5{,}75 = 8{,}15$ €." }
    },
    {
      titre: "Rendre la monnaie",
      video: { titre: "Vidéo de Maître Lucas : rendre la monnaie", youtube: "https://youtu.be/UHEzDyXuLqc" },
      texte:
        "On complète en partant du prix :\n\n" +
        "Prix $6{,}70$ €, payé avec $10$ € : $6{,}70 \\to 7$ € ($30$ centimes), puis $7 \\to 10$ € ($3$ €). On rend $3{,}30$ €.",
      exemple: { enonce: "Prix $13{,}60$ € ; on paie avec $20$ €. Combien rend-on ?", solution: "$40$ centimes $+ 6$ € $= 6{,}40$ €." }
    }
  ],
  exercices: [
    { type: "e2e-additionner", titre: "Additionner des prix", etape: "Acheter", nb: 5 },
    { type: "e2e-rendre", titre: "Rendre la monnaie", etape: "Acheter", nb: 5 },
    { type: "e2r-etapes", titre: "Problèmes d'achats", etape: "Acheter", nb: 4 }
  ],
  qcm: [
    { question: "$3{,}50$ € $+ 2{,}80$ € $=$", choix: ["$6{,}30$ €", "$5{,}30$ €", "$5{,}130$ €", "$6{,}80$ €"], bonne: 0, explication: "$130$ centimes $= 1{,}30$ €." },
    { question: "$2{,}40$ € $+ 5{,}75$ € $=$", choix: ["$8{,}15$ €", "$7{,}15$ €", "$7{,}115$ €", "$8{,}05$ €"], bonne: 0, explication: "$40 + 75 = 115$ centimes." },
    { question: "Pour additionner des prix, on aligne :", choix: ["les virgules", "les premiers chiffres", "les derniers chiffres sans regarder", "rien"], bonne: 0, explication: "Euros sous euros, centimes sous centimes." },
    { question: "$6{,}70$ € payés avec $10$ € : on rend", choix: ["$3{,}30$ €", "$4{,}30$ €", "$3{,}70$ €", "$16{,}70$ €"], bonne: 0, explication: "$30$ c puis $3$ €." },
    { question: "$13{,}60$ € payés avec $20$ € : on rend", choix: ["$6{,}40$ €", "$7{,}40$ €", "$6{,}60$ €", "$33{,}60$ €"], bonne: 0, explication: "$40$ c puis $6$ €." },
    { question: "$1{,}99$ € $+ 0{,}01$ € $=$", choix: ["$2$ €", "$1{,}100$ €", "$2{,}01$ €", "$1{,}91$ €"], bonne: 0, explication: "$99 + 1 = 100$ centimes." },
    { question: "$5$ € $- 1{,}50$ € $=$", choix: ["$3{,}50$ €", "$4{,}50$ €", "$3{,}05$ €", "$6{,}50$ €"], bonne: 0, explication: "$1{,}50 + 3{,}50 = 5$." },
    { question: "$150$ centimes s'écrit :", choix: ["$1{,}50$ €", "$15{,}0$ €", "$150$ €", "$0{,}150$ €"], bonne: 0, explication: "$100$ c $= 1$ €." },
    { question: "$3$ cahiers à $2$ € coûtent :", choix: ["$6$ €", "$5$ €", "$32$ €", "$1$ €"], bonne: 0, explication: "$3 \\times 2$." },
    { question: "Quel prix est le moins cher ?", choix: ["$4{,}09$ €", "$4{,}90$ €", "$4{,}19$ €", "$4{,}50$ €"], bonne: 0, explication: "$9$ centimes est le moins." },
    { question: "$0{,}75$ € $+ 0{,}75$ € $=$", choix: ["$1{,}50$ €", "$0{,}150$ €", "$1{,}40$ €", "$15$ €"], bonne: 0, explication: "$150$ centimes." },
    { question: "Pour rendre la monnaie, on part :", choix: ["du prix", "de zéro", "du billet", "de $100$"], bonne: 0, explication: "On complète du prix jusqu'à la somme donnée." },
    { question: "$12{,}50$ € $+ 7{,}50$ € $=$", choix: ["$20$ €", "$19$ €", "$19{,}100$ €", "$20{,}50$ €"], bonne: 0, explication: "$50 + 50 = 100$ centimes." },
    { question: "Un repas à $8{,}20$ € payé avec $10$ € : on rend", choix: ["$1{,}80$ €", "$2{,}80$ €", "$1{,}20$ €", "$18{,}20$ €"], bonne: 0, explication: "$80$ c puis $1$ €." },
    { question: "$4{,}05$ € se lit :", choix: ["$4$ euros et $5$ centimes", "$4$ euros et $50$ centimes", "$405$ euros", "$45$ centimes"], bonne: 0, explication: "Après la virgule : $05$ centimes." },
    { question: "$2{,}50$ € $+ 2{,}50$ € $+ 2{,}50$ € $=$", choix: ["$7{,}50$ €", "$6{,}150$ €", "$7{,}05$ €", "$2{,}50$ €"], bonne: 0, explication: "$3 \\times 2{,}50 = 7{,}50$." },
    { question: "On paie $4{,}35$ € avec $5$ €. On rend :", choix: ["$0{,}65$ €", "$1{,}65$ €", "$0{,}75$ €", "$9{,}35$ €"], bonne: 0, explication: "$4{,}35 + 0{,}65 = 5$." },
    { question: "$9{,}99$ € est presque :", choix: ["$10$ €", "$9$ €", "$99$ €", "$1$ €"], bonne: 0, explication: "Il manque un centime." }
  ],
  methode: [
    { titre: "Additionner des prix", etapes: ["Aligne les virgules.", "Additionne les centimes ; si tu dépasses $100$, retiens $1$ €.", "Additionne les euros, sans oublier la retenue."], exemple: "$3{,}50 + 2{,}80 = 6{,}30$ €." }
  ],
  erreurs: ["Ne pas aligner les virgules.", "Écrire $5{,}130$ € au lieu de $6{,}30$ € : $100$ centimes font $1$ €.", "Donner le prix au lieu de la monnaie rendue.", "Écrire $4{,}5$ € pour $4$ € et $5$ centimes."]
};
