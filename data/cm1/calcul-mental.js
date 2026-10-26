/*
  CHAPITRE : CM1 — Calcul mental
  -------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM1 : faits numériques (tables, doubles et moitiés, compléments,
  égalités entre fractions usuelles et décimaux : 1/2 = 0,5 ; 1/4 = 0,25 ; 1/10 = 0,1…) ; procédures de calcul mental
  (multiplier par 10, 100, 1 000, par 20, 30…, par 5 ou 25 ; décomposer) ; ajouter ou retrancher 1, 10, 0,1, 0,01
  à un décimal. Sans calculatrice.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm1-calcul-mental"] = {
  niveau: "CM1",
  numero: 4,
  titre: "Calcul mental",
  accroche: "Des faits à connaître par cœur et des astuces pour calculer vite et juste, de tête.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Les faits à connaître par cœur",
      video: { titre: "Vidéo de Maître Lucas : les tables de multiplication", youtube: "https://youtu.be/IWcz-se9Pj0" },
      texte:
        "- Les **tables** de $2$ à $9$, dans les deux sens : $7 \\times 8 = 56$, donc $56 \\div 8 = 7$.\n" +
        "- Les **doubles et moitiés** : double de $45$ : $90$ ; moitié de $70$ : $35$.\n" +
        "- Les **égalités** entre fractions et décimaux :\n\n" +
        "$\\dfrac{1}{2} = 0{,}5 \\qquad \\dfrac{1}{4} = 0{,}25 \\qquad \\dfrac{3}{4} = 0{,}75 \\qquad \\dfrac{1}{10} = 0{,}1 \\qquad \\dfrac{1}{100} = 0{,}01$\n\n" +
        "Et aussi : $\\dfrac{1}{2} = \\dfrac{2}{4} = \\dfrac{5}{10}$.",
      exemple: { enonce: "Complète : $63 = 9 \\times \\ldots$", solution: "$7$, car $9 \\times 7 = 63$." }
    },
    {
      titre: "Des astuces de calcul",
      video: { titre: "Vidéo de Maître Lucas : multiplier et diviser par 10, 100 ou 1 000", youtube: "https://youtu.be/vXfBLrlCl-M" },
      texte:
        "- **Multiplier par $10$** : chaque chiffre prend une valeur $10$ fois plus grande : $287 \\times 10 = 2\\,870$ ; $15{,}9 \\times 10 = 159$.\n" +
        "- **Multiplier par $70$** : $6 \\times 70 = 6 \\times 7 \\times 10 = 420$.\n" +
        "- **Multiplier par $5$** : c'est la moitié de $\\times 10$ : $12 \\times 5 = 120 \\div 2 = 60$.\n" +
        "- **Décomposer** : $76 \\times 4 = 70 \\times 4 + 6 \\times 4 = 280 + 24 = 304$.\n" +
        "- **Ajouter $9$** : on ajoute $10$ puis on enlève $1$.\n" +
        "- Avec les décimaux, on fait attention au **rang** : $42{,}61 + 1 = 43{,}61$ mais $50{,}37 + 0{,}2 = 50{,}57$.",
      exemple: { enonce: "Calcule de tête $25 \\times 8$.", solution: "$25 \\times 4 = 100$, donc $25 \\times 8 = 200$." }
    }
  ],
  exercices: [
    { type: "m1k-faits", titre: "Les faits numériques", etape: "Par cœur", nb: 6 },
    { type: "m1k-strategies", titre: "Astuces de calcul", etape: "Astuces", nb: 6 },
    { type: "m1k-decimaux", titre: "Calcul mental avec des décimaux", etape: "Décimaux", nb: 6 }
  ],
  qcm: [
    { question: "$7 \\times 8 =$", choix: ["$56$", "$54$", "$64$", "$48$"], bonne: 0, explication: "Table de $7$ ou de $8$." },
    { question: "$63 \\div 9 =$", choix: ["$7$", "$6$", "$8$", "$9$"], bonne: 0, explication: "$9 \\times 7 = 63$." },
    { question: "$\\dfrac{1}{4} =$", choix: ["$0{,}25$", "$0{,}4$", "$1{,}4$", "$0{,}14$"], bonne: 0, explication: "Un quart de $100$ centièmes, c'est $25$ centièmes." },
    { question: "$0{,}5 =$", choix: ["$\\dfrac{1}{2}$", "$\\dfrac{1}{5}$", "$\\dfrac{5}{100}$", "$\\dfrac{2}{5}$"], bonne: 0, explication: "$5$ dixièmes, c'est la moitié." },
    { question: "$\\dfrac{3}{4} =$", choix: ["$0{,}75$", "$0{,}34$", "$3{,}4$", "$0{,}43$"], bonne: 0, explication: "Trois fois $0{,}25$." },
    { question: "$287 \\times 10 =$", choix: ["$2\\,870$", "$28\\,700$", "$2\\,087$", "$297$"], bonne: 0, explication: "Chaque chiffre prend une valeur $10$ fois plus grande." },
    { question: "$15{,}9 \\times 10 =$", choix: ["$159$", "$15{,}90$", "$150{,}9$", "$1\\,590$"], bonne: 0, explication: "Les dixièmes deviennent des unités." },
    { question: "$6 \\times 70 =$", choix: ["$420$", "$42$", "$4\\,200$", "$76$"], bonne: 0, explication: "$6 \\times 7 = 42$, puis $\\times 10$." },
    { question: "$12 \\times 5 =$", choix: ["$60$", "$17$", "$125$", "$50$"], bonne: 0, explication: "Moitié de $12 \\times 10$." },
    { question: "$25 \\times 4 =$", choix: ["$100$", "$29$", "$80$", "$90$"], bonne: 0, explication: "Quatre quarts d'une centaine." },
    { question: "$76 \\times 4 =$", choix: ["$304$", "$284$", "$2\\,824$", "$300$"], bonne: 0, explication: "$280 + 24$." },
    { question: "$773 - 9 =$", choix: ["$764$", "$766$", "$774$", "$754$"], bonne: 0, explication: "$773 - 10 + 1$." },
    { question: "$42{,}61 + 1 =$", choix: ["$43{,}61$", "$42{,}62$", "$42{,}71$", "$52{,}61$"], bonne: 0, explication: "On ajoute une unité." },
    { question: "$50{,}37 + 0{,}2 =$", choix: ["$50{,}57$", "$50{,}39$", "$52{,}37$", "$50{,}392$"], bonne: 0, explication: "On ajoute $2$ dixièmes." },
    { question: "$3{,}6 + 0{,}03 =$", choix: ["$3{,}63$", "$3{,}9$", "$3{,}609$", "$6{,}6$"], bonne: 0, explication: "On ajoute $3$ centièmes." },
    { question: "Le double de $45$ est :", choix: ["$90$", "$80$", "$47$", "$22{,}5$"], bonne: 0, explication: "$40 + 40 + 5 + 5$." },
    { question: "La moitié de $70$ est :", choix: ["$35$", "$140$", "$30$", "$45$"], bonne: 0, explication: "$70 \\div 2$." },
    { question: "$\\dfrac{1}{2}$ est aussi égal à :", choix: ["$\\dfrac{5}{10}$", "$\\dfrac{1}{5}$", "$\\dfrac{2}{1}$", "$\\dfrac{4}{10}$"], bonne: 0, explication: "$5$ dixièmes." }
  ],
  methode: [
    { titre: "Multiplier de tête par un grand nombre", etapes: ["Décompose le nombre en dizaines et unités.", "Multiplie chaque partie.", "Ajoute les deux résultats."], exemple: "$76 \\times 4 = 70 \\times 4 + 6 \\times 4 = 280 + 24 = 304$." },
    { titre: "Ajouter à un nombre décimal", etapes: ["Repère le rang de ce que tu ajoutes (unité, dixième, centième).", "Ajoute seulement au chiffre de ce rang.", "S'il dépasse $9$, fais une retenue au rang à gauche."], exemple: "$50{,}37 + 0{,}2$ : on ajoute $2$ aux dixièmes → $50{,}57$." }
  ],
  erreurs: ["Ajouter un zéro à droite d'un décimal pour multiplier par $10$ : $15{,}9 \\times 10 \\neq 15{,}90$.", "Ajouter $0{,}2$ au chiffre des centièmes.", "Confondre $\\dfrac{1}{4}$ et $0{,}4$.", "Se tromper dans les tables de $7$ et de $8$."]
};
