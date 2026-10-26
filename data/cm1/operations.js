/*
  CHAPITRE : CM1 — Les opérations posées
  ---------------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM1 : addition et soustraction posées de nombres décimaux ;
  multiplication posée de deux entiers et d'un décimal par un entier ; ordre de grandeur d'un résultat ; calculs en
  ligne avec parenthèses et priorité de la multiplication. Sans calculatrice.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm1-operations"] = {
  niveau: "CM1",
  numero: 5,
  titre: "Les opérations posées",
  accroche: "Poser additions, soustractions et multiplications, vérifier avec un ordre de grandeur.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Additionner et soustraire des décimaux",
      video: { titre: "Vidéo de Maître Lucas : additionner et soustraire des nombres décimaux", youtube: "https://youtu.be/mhNZt2K0Khk" },
      texte:
        "On **aligne les virgules** : unités sous unités, dixièmes sous dixièmes, centièmes sous centièmes. On peut compléter avec des zéros.\n\n" +
        "$\\begin{array}{r} 27{,}70 \\\\ +\\;7{,}67 \\\\ \\hline 35{,}37 \\end{array}$\n\n" +
        "On calcule de droite à gauche, avec les retenues, et on place la virgule du résultat sous les autres virgules.",
      exemple: { enonce: "Pose $80{,}52 - 9{,}32$.", solution: "$80{,}52 - 9{,}32 = 71{,}20 = 71{,}2$." }
    },
    {
      titre: "Multiplier, estimer, calculer en ligne",
      video: { titre: "Vidéo de Maître Lucas : les multiplications posées à plusieurs chiffres", youtube: "https://youtu.be/M6t154vbydA" },
      texte:
        "Pour $358 \\times 23$ : on calcule $358 \\times 3 = 1\\,074$, puis $358 \\times 20 = 7\\,160$ (on écrit le $0$ des dizaines), et on additionne.\n\n" +
        "$\\begin{array}{r} 358 \\\\ \\times\\;23 \\\\ \\hline 1\\,074 \\\\ +\\;7\\,160 \\\\ \\hline 8\\,234 \\end{array}$\n\n" +
        "- Avant de poser, on cherche un **ordre de grandeur** : $358 \\times 23$ est proche de $400 \\times 20 = 8\\,000$.\n" +
        "- Dans un calcul en ligne, on fait d'abord ce qui est **entre parenthèses**, puis les **multiplications** : $9 + 6 \\times 7 = 9 + 42 = 51$.",
      exemple: { enonce: "Calcule $(5 + 3) \\times 9$.", solution: "$8 \\times 9 = 72$." }
    }
  ],
  exercices: [
    { type: "m1o-decimaux", titre: "Additions et soustractions de décimaux", etape: "Décimaux", nb: 5 },
    { type: "m1o-multiplication", titre: "Multiplications posées", etape: "Multiplier", nb: 5 },
    { type: "m1o-estimer", titre: "Ordre de grandeur et calcul en ligne", etape: "Estimer", nb: 6 }
  ],
  qcm: [
    { question: "Pour poser $27{,}7 + 7{,}67$, on aligne :", choix: ["les virgules", "les premiers chiffres à gauche", "les derniers chiffres à droite", "les nombres au centre"], bonne: 0, explication: "Chaque chiffre sous un chiffre du même rang." },
    { question: "$27{,}7 + 7{,}67 =$", choix: ["$35{,}37$", "$10{,}44$", "$34{,}37$", "$35{,}44$"], bonne: 0, explication: "$27{,}70 + 7{,}67$." },
    { question: "$80{,}52 - 9{,}32 =$", choix: ["$71{,}2$", "$71{,}02$", "$89{,}84$", "$71{,}22$"], bonne: 0, explication: "$80{,}52 - 9{,}32 = 71{,}20$." },
    { question: "$12{,}5 + 3{,}75 =$", choix: ["$16{,}25$", "$15{,}80$", "$4{,}00$", "$16{,}35$"], bonne: 0, explication: "$12{,}50 + 3{,}75$." },
    { question: "$10 - 2{,}4 =$", choix: ["$7{,}6$", "$8{,}4$", "$8{,}6$", "$12{,}4$"], bonne: 0, explication: "$2{,}4 + 7{,}6 = 10$." },
    { question: "$358 \\times 23 =$", choix: ["$8\\,234$", "$1\\,790$", "$7\\,160$", "$8\\,224$"], bonne: 0, explication: "$1\\,074 + 7\\,160$." },
    { question: "Dans $358 \\times 23$, la deuxième ligne est $358 \\times 20$. Elle vaut :", choix: ["$7\\,160$", "$716$", "$1\\,074$", "$71\\,600$"], bonne: 0, explication: "$358 \\times 2 = 716$, puis $\\times 10$." },
    { question: "$33{,}6 \\times 3 =$", choix: ["$100{,}8$", "$99{,}18$", "$1\\,008$", "$36{,}6$"], bonne: 0, explication: "$336 \\times 3 = 1\\,008$ dixièmes." },
    { question: "Un ordre de grandeur de $398 \\times 21$ est :", choix: ["$8\\,000$", "$800$", "$80\\,000$", "$600$"], bonne: 0, explication: "$400 \\times 20$." },
    { question: "Un ordre de grandeur de $612 + 289$ est :", choix: ["$900$", "$800$", "$300$", "$9\\,000$"], bonne: 0, explication: "$600 + 300$." },
    { question: "$9 + 6 \\times 7 =$", choix: ["$51$", "$105$", "$22$", "$63$"], bonne: 0, explication: "La multiplication d'abord : $9 + 42$." },
    { question: "$(5 + 3) \\times 9 =$", choix: ["$72$", "$32$", "$45$", "$17$"], bonne: 0, explication: "Les parenthèses d'abord : $8 \\times 9$." },
    { question: "$171 - (5 + 9) =$", choix: ["$157$", "$175$", "$167$", "$185$"], bonne: 0, explication: "$171 - 14$." },
    { question: "$74 \\times 83 =$", choix: ["$6\\,142$", "$814$", "$5\\,142$", "$6\\,042$"], bonne: 0, explication: "$74 \\times 3 = 222$ et $74 \\times 80 = 5\\,920$." },
    { question: "Rachid trouve $4\\,500$ pour $95 \\times 6$. Il se trompe car :", choix: ["le résultat doit être proche de $600$", "il faut un nombre décimal", "le résultat doit être plus petit que $95$", "$95 \\times 6$ est impossible"], bonne: 0, explication: "$100 \\times 6 = 600$ : $4\\,500$ est bien trop grand." },
    { question: "$2{,}5 \\times 4 =$", choix: ["$10$", "$8{,}20$", "$2{,}20$", "$100$"], bonne: 0, explication: "$25 \\times 4 = 100$ dixièmes." },
    { question: "Pour vérifier $44{,}34 - 3{,}42 = 40{,}92$, on calcule :", choix: ["$40{,}92 + 3{,}42$", "$44{,}34 + 3{,}42$", "$40{,}92 - 3{,}42$", "$44{,}34 \\times 3{,}42$"], bonne: 0, explication: "L'addition doit redonner $44{,}34$." },
    { question: "$15{,}04 - 0{,}5 =$", choix: ["$14{,}54$", "$14{,}99$", "$15{,}54$", "$10{,}04$"], bonne: 0, explication: "On enlève $5$ dixièmes." }
  ],
  methode: [
    { titre: "Poser une addition ou une soustraction de décimaux", etapes: ["Aligne les virgules ; complète par des zéros pour avoir autant de chiffres après la virgule.", "Calcule de droite à gauche, avec les retenues.", "Place la virgule du résultat sous les autres.", "Vérifie avec un ordre de grandeur."], exemple: "$27{,}70 + 7{,}67 = 35{,}37$ (proche de $28 + 8 = 36$)." },
    { titre: "Poser une multiplication à deux chiffres", etapes: ["Multiplie par le chiffre des unités.", "Écris un $0$ au rang des unités, puis multiplie par le chiffre des dizaines.", "Additionne les deux lignes."], exemple: "$358 \\times 23 = 1\\,074 + 7\\,160 = 8\\,234$." }
  ],
  erreurs: ["Aligner les derniers chiffres au lieu des virgules.", "Oublier le $0$ sur la deuxième ligne de la multiplication.", "Faire $9 + 6 = 15$ puis $\\times 7$ dans $9 + 6 \\times 7$.", "Oublier la virgule dans le résultat."]
};
