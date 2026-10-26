/*
  CHAPITRE : CE2 — Calcul mental
  -------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE2 : tables d'addition et de multiplication dans les deux sens ;
  doubles (1 à 20 ; 20… 75 ; 100… 600) et moitiés ; multiples de 25 ; décompositions de 60 ; multiplier par 10 ou 100 ;
  ajouter 8, 9, 18, 19… 38 ; soustraire 9, 19, 29, 39 ; multiplier par 4 ou 8 ; multiplier un nombre inférieur à 10 par des
  dizaines ou des centaines ; 23 × 4 = 20 × 4 + 3 × 4 (distributivité).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce2-calcul-mental"] = {
  niveau: "CE2",
  numero: 7,
  titre: "Calcul mental",
  accroche: "Tables, doubles, moitiés, et des astuces : $\\times 10$, $\\times 100$, $\\times 4$, $+ 29$, $- 39$…",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Ce que je sais par cœur",
      video: { titre: "Vidéo de Maître Lucas : tables de multiplication", youtube: "https://youtu.be/IWcz-se9Pj0" },
      texte:
        "- Les tables d'addition et de multiplication, dans les deux sens : $7 \\times \\ldots = 42$.\n" +
        "- Doubles : de $1$ à $20$ ; de $25$, $35$, $45$, $60$, $75$ ; de $150$, $250$, $400$, $600$.\n" +
        "- $60 = 1 \\times 60 = 2 \\times 30 = 3 \\times 20 = 4 \\times 15 = 5 \\times 12 = 6 \\times 10$.",
      exemple: { enonce: "Double de $75$ ? Moitié de $120$ ?", solution: "$150$ et $60$." }
    },
    {
      titre: "Multiplier vite",
      video: { titre: "Vidéo de Maître Lucas : multiplier par 10, 100, 1000", youtube: "https://youtu.be/cqqyOZsq33g" },
      texte:
        "- $\\times 10$ : un $0$ à droite ($47 \\times 10 = 470$) ; $\\times 100$ : deux $0$ ($47 \\times 100 = 4\\,700$).\n" +
        "- $\\times 4$ : le double du double ; $\\times 8$ : le double du double du double.\n" +
        "- $3 \\times 40 = 120$ : $3 \\times 4 = 12$ dizaines.\n" +
        "- $23 \\times 4 = 20 \\times 4 + 3 \\times 4 = 80 + 12 = 92$.",
      exemple: { enonce: "Calcule $35 \\times 4$.", solution: "Double de $35$ : $70$ ; double de $70$ : $140$." }
    },
    {
      titre: "Ajouter ou retirer presque une dizaine",
      video: { titre: "Vidéo de « Cheddar & Mimolette » : ajouter 9, 19, 29…", youtube: "https://youtu.be/MoImxNK7AjQ" },
      texte:
        "- Ajouter $38$ : ajouter $40$ puis enlever $2$. $57 + 38$ → $97$ → $95$.\n" +
        "- Soustraire $29$ : enlever $30$ puis ajouter $1$. $84 - 29$ → $54$ → $55$.",
      exemple: { enonce: "Calcule $126 - 39$.", solution: "$126 - 40 = 86$, puis $86 + 1 = 87$." }
    }
  ],
  exercices: [
    { type: "e2k-faits", titre: "Tables, doubles, moitiés, décompositions", etape: "Ce que je sais par cœur", nb: 8 },
    { type: "e2k-strategies", titre: "× 10, × 100, × 4, + 29, 23 × 4…", etape: "Mes astuces", nb: 8 },
    { type: "e2k-numeration", titre: "Ajouter ou enlever des dizaines, des centaines, des milliers", etape: "Mes astuces", nb: 6 }
  ],
  qcm: [
    { question: "$7 \\times \\ldots = 42$", choix: ["$6$", "$35$", "$49$", "$7$"], bonne: 0, explication: "$7 \\times 6 = 42$." },
    { question: "Le double de $75$ est :", choix: ["$150$", "$140$", "$77$", "$37$"], bonne: 0, explication: "$75 + 75$." },
    { question: "La moitié de $120$ est :", choix: ["$60$", "$240$", "$12$", "$65$"], bonne: 0, explication: "$60 + 60 = 120$." },
    { question: "$60 = 4 \\times \\ldots$", choix: ["$15$", "$56$", "$16$", "$20$"], bonne: 0, explication: "$4 \\times 15 = 60$." },
    { question: "$47 \\times 100 = $", choix: ["$4\\,700$", "$470$", "$147$", "$47\\,000$"], bonne: 0, explication: "Deux zéros." },
    { question: "$35 \\times 4 = $", choix: ["$140$", "$70$", "$39$", "$120$"], bonne: 0, explication: "Double du double." },
    { question: "$12 \\times 8 = $", choix: ["$96$", "$20$", "$84$", "$48$"], bonne: 0, explication: "$24$, $48$, $96$." },
    { question: "$3 \\times 40 = $", choix: ["$120$", "$43$", "$12$", "$1\\,200$"], bonne: 0, explication: "$3 \\times 4 = 12$ dizaines." },
    { question: "$5 \\times 300 = $", choix: ["$1\\,500$", "$305$", "$150$", "$15\\,000$"], bonne: 0, explication: "$15$ centaines." },
    { question: "$57 + 38 = $", choix: ["$95$", "$85$", "$97$", "$105$"], bonne: 0, explication: "$57 + 40 - 2$." },
    { question: "$84 - 29 = $", choix: ["$55$", "$53$", "$65$", "$54$"], bonne: 0, explication: "$84 - 30 + 1$." },
    { question: "$23 \\times 4 = $", choix: ["$92$", "$83$", "$812$", "$27$"], bonne: 0, explication: "$80 + 12$." },
    { question: "$4 \\times 25 = $", choix: ["$100$", "$29$", "$125$", "$80$"], bonne: 0, explication: "Quatre fois vingt-cinq." },
    { question: "Le double de $18$ est :", choix: ["$36$", "$9$", "$28$", "$38$"], bonne: 0, explication: "$18 + 18$." },
    { question: "$9 \\times 9 = $", choix: ["$81$", "$18$", "$72$", "$99$"], bonne: 0, explication: "Table de $9$." },
    { question: "$126 - 39 = $", choix: ["$87$", "$85$", "$97$", "$165$"], bonne: 0, explication: "$126 - 40 + 1$." },
    { question: "$64 \\times 10 = $", choix: ["$640$", "$74$", "$6\\,400$", "$604$"], bonne: 0, explication: "Un zéro à droite." },
    { question: "Pour calculer $\\times 8$, on peut :", choix: ["doubler trois fois", "ajouter $8$", "doubler une fois", "multiplier par $10$"], bonne: 0, explication: "$8 = 2 \\times 2 \\times 2$." }
  ],
  methode: [
    { titre: "Multiplier un nombre à deux chiffres de tête", etapes: ["Décompose : $23 = 20 + 3$.", "Multiplie chaque morceau : $20 \\times 4$ et $3 \\times 4$.", "Additionne."], exemple: "$23 \\times 4 = 80 + 12 = 92$." }
  ],
  erreurs: ["Ajouter un seul zéro pour $\\times 100$.", "Pour $+ 38$, ajouter $40$ et oublier d'enlever $2$.", "Pour $- 29$, enlever $30$ puis enlever encore $1$ (il faut ajouter $1$).", "Oublier le $3 \\times 4$ dans $23 \\times 4$."]
};
