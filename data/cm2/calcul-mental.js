/*
  CHAPITRE : CM2 — Calcul mental
  -------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM2 : faits numériques (tables, moitié des nombres impairs
  jusqu'à 15, relations entre fractions usuelles, écriture décimale des fractions usuelles) ; ajouter ou soustraire un
  entier à un décimal ; multiplier ou diviser un décimal par 10, 100, 1 000 ; ajouter deux décimaux à un chiffre après la
  virgule ; ajouter ou soustraire 9, 19, …, 99 ou 8, 18, … ; produits de dizaines, centaines, milliers ; distributivité ;
  double et moitié d'un décimal ; diviser par 4 ou 8 ; multiplier un décimal par 5 ou 50.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm2-calcul-mental"] = {
  niveau: "CM2",
  numero: 4,
  titre: "Calcul mental",
  accroche: "Des faits à connaître par cœur et des procédures rapides, avec des entiers et des décimaux.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Faits et numération",
      video: { titre: "Vidéo de Maître Lucas : multiplier et diviser par 10, 100 ou 1 000", youtube: "https://youtu.be/vXfBLrlCl-M" },
      texte:
        "- Moitiés des nombres impairs : moitié de $7$ $= 3{,}5$ ; moitié de $15$ $= 7{,}5$.\n" +
        "- Fractions usuelles : $\\dfrac{1}{2} = 0{,}5$ ; $\\dfrac{1}{4} = 0{,}25$ ; $\\dfrac{3}{4} = 0{,}75$ ; $\\dfrac{1}{5} = 0{,}2$ ; $\\dfrac{1}{10} = 0{,}1$.\n" +
        "- $\\times 10$, $\\times 100$, $\\times 1\\,000$ : chaque chiffre avance de $1$, $2$ ou $3$ rangs vers la gauche : $32{,}79 \\times 10 = 327{,}9$.\n" +
        "- $\\div 10$, $\\div 100$, $\\div 1\\,000$ : chaque chiffre recule : $67{,}4 \\div 100 = 0{,}674$.\n" +
        "- Ajouter un entier à un décimal : on ne touche qu'à la partie entière : $38{,}5 + 12 = 50{,}5$.",
      exemple: { enonce: "Calcule $0{,}8 \\times 1\\,000$.", solution: "$800$." }
    },
    {
      titre: "Des procédures efficaces",
      video: { titre: "Vidéo de Maître Lucas : multiplier par 20, 30, 200, 300…", youtube: "https://youtu.be/gyu9f6vpjHs" },
      texte:
        "- **Ajouter $99$** : ajouter $100$, puis enlever $1$ : $752 + 99 = 851$. **Enlever $49$** : enlever $50$, puis ajouter $1$.\n" +
        "- **Produits de dizaines, centaines** : $30 \\times 400 = 3 \\times 4 \\times 1\\,000 = 12\\,000$.\n" +
        "- **Distributivité** : $14 \\times 23 = 14 \\times 20 + 14 \\times 3 = 280 + 42 = 322$.\n" +
        "- **Diviser par $4$** : moitié de la moitié : $96 \\div 4 = 48 \\div 2 = 24$. Par $8$ : encore une moitié.\n" +
        "- **Multiplier par $5$** : $\\times 10$ puis moitié : $4{,}6 \\times 5 = 46 \\div 2 = 23$. Par $50$ : $\\times 100$ puis moitié.\n" +
        "- **Double, moitié** d'un décimal : double de $12{,}3$ $= 24{,}6$ ; moitié de $24{,}6$ $= 12{,}3$.",
      exemple: { enonce: "Calcule $2{,}4 \\times 50$.", solution: "$2{,}4 \\times 100 = 240$ ; moitié : $120$." }
    }
  ],
  exercices: [
    { type: "m2k-faits", titre: "Faits numériques", etape: "Par cœur", nb: 6 },
    { type: "m2k-numeration", titre: "Calculer avec la numération", etape: "Numération", nb: 6 },
    { type: "m2k-procedures", titre: "Procédures de calcul mental", etape: "Procédures", nb: 8 }
  ],
  qcm: [
    { question: "La moitié de $15$ est :", choix: ["$7{,}5$", "$7$", "$8$", "$7{,}05$"], bonne: 0, explication: "$14 \\div 2 = 7$ et la moitié de $1$ : $0{,}5$." },
    { question: "$\\dfrac{3}{4} =$", choix: ["$0{,}75$", "$0{,}34$", "$3{,}4$", "$0{,}25$"], bonne: 0, explication: "Trois quarts d'unité." },
    { question: "$\\dfrac{1}{5} =$", choix: ["$0{,}2$", "$0{,}5$", "$1{,}5$", "$0{,}15$"], bonne: 0, explication: "$\\dfrac{2}{10}$." },
    { question: "$32{,}79 \\times 10 =$", choix: ["$327{,}9$", "$32{,}790$", "$3\\,279$", "$320{,}79$"], bonne: 0, explication: "Chaque chiffre avance d'un rang." },
    { question: "$67{,}4 \\div 100 =$", choix: ["$0{,}674$", "$6{,}74$", "$6\\,740$", "$67{,}004$"], bonne: 0, explication: "Chaque chiffre recule de deux rangs." },
    { question: "$38{,}5 + 12 =$", choix: ["$50{,}5$", "$38{,}17$", "$39{,}7$", "$51{,}5$"], bonne: 0, explication: "On ajoute aux unités." },
    { question: "$3{,}7 + 4{,}6 =$", choix: ["$8{,}3$", "$7{,}13$", "$7{,}3$", "$8{,}13$"], bonne: 0, explication: "$13$ dixièmes $= 1{,}3$." },
    { question: "$752 + 99 =$", choix: ["$851$", "$841$", "$852$", "$861$"], bonne: 0, explication: "$+ 100 - 1$." },
    { question: "$530 - 49 =$", choix: ["$481$", "$479$", "$491$", "$480$"], bonne: 0, explication: "$- 50 + 1$." },
    { question: "$30 \\times 400 =$", choix: ["$12\\,000$", "$1\\,200$", "$120\\,000$", "$700$"], bonne: 0, explication: "$3 \\times 4 = 12$, puis trois zéros." },
    { question: "$14 \\times 23 =$", choix: ["$322$", "$283$", "$302$", "$312$"], bonne: 0, explication: "$280 + 42$." },
    { question: "$96 \\div 4 =$", choix: ["$24$", "$48$", "$32$", "$22$"], bonne: 0, explication: "Moitié de $48$." },
    { question: "$96 \\div 8 =$", choix: ["$12$", "$24$", "$11$", "$16$"], bonne: 0, explication: "Moitié de $24$." },
    { question: "$4{,}6 \\times 5 =$", choix: ["$23$", "$20{,}30$", "$46$", "$9{,}2$"], bonne: 0, explication: "$46 \\div 2$." },
    { question: "$2{,}4 \\times 50 =$", choix: ["$120$", "$12$", "$240$", "$1\\,200$"], bonne: 0, explication: "$240 \\div 2$." },
    { question: "Le double de $12{,}3$ est :", choix: ["$24{,}6$", "$24{,}3$", "$6{,}15$", "$12{,}6$"], bonne: 0, explication: "$24 + 0{,}6$." },
    { question: "La moitié de $24{,}6$ est :", choix: ["$12{,}3$", "$12{,}6$", "$49{,}2$", "$12{,}03$"], bonne: 0, explication: "$12 + 0{,}3$." },
    { question: "$0{,}8 \\times 1\\,000 =$", choix: ["$800$", "$80$", "$0{,}8000$", "$8\\,000$"], bonne: 0, explication: "Le $8$ avance de trois rangs." }
  ],
  methode: [
    { titre: "Multiplier un décimal par 5", etapes: ["Multiplie par $10$.", "Prends la moitié du résultat.", "Vérifie avec un ordre de grandeur."], exemple: "$4{,}6 \\times 5$ : $46$, puis $23$." },
    { titre: "Ajouter ou enlever 9, 19, 29…", etapes: ["Arrondis à la dizaine du dessus ($9 \\to 10$, $29 \\to 30$).", "Ajoute (ou enlève) ce nombre rond.", "Corrige : enlève (ou ajoute) ce que tu as fait en trop."], exemple: "$752 + 99 = 752 + 100 - 1 = 851$." }
  ],
  erreurs: ["Ajouter un zéro à droite d'un décimal pour multiplier par $10$.", "Écrire $3{,}7 + 4{,}6 = 7{,}13$ (oubli de la retenue).", "Corriger dans le mauvais sens après avoir arrondi.", "Croire que la moitié de $15$ est $7$."]
};
