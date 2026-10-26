/*
  CHAPITRE : CM2 — Résoudre des problèmes
  ----------------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM2 : modèle en quatre phases (comprendre, modéliser, calculer,
  répondre) ; problèmes additifs et mixtes en plusieurs étapes ; problèmes multiplicatifs « parties-tout » ; comparaison
  multiplicative ; dénombrement ; optimisation ; problèmes préparant aux algorithmes. Données : entiers jusqu'à
  999 999 999, décimaux et fractions. Contextes de Mayotte.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm2-problemes"] = {
  niveau: "CM2",
  numero: 7,
  titre: "Résoudre des problèmes",
  accroche: "Comprendre, modéliser, calculer, répondre… et vérifier que la réponse est plausible.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Les quatre phases",
      video: { titre: "Vidéo de Maître Lucas : résoudre des problèmes (CM1-CM2)", youtube: "https://youtu.be/p39NsvRlHEU" },
      texte:
        "1. **Comprendre** : je raconte l'histoire avec mes mots ; je repère la question.\n" +
        "2. **Modéliser** : je fais un schéma en barres, je choisis les opérations.\n" +
        "3. **Calculer** : de tête ou en posant.\n" +
        "4. **Répondre** : je fais une phrase, et je vérifie que c'est **plausible** (une voiture de $4{,}5$ km de long ? Non !).\n\n" +
        "Attention : le mot « plus » n'annonce pas toujours une addition ! « Kamal a $12$ billes de plus que Saïd, qui en a $30$ » : Kamal en a $42$ ; mais « Kamal a $42$ billes, c'est $12$ de plus que Saïd » : Saïd en a $30$.",
      exemple: { enonce: "$3$ bouquets de brèdes à $2{,}50$ €, payés avec $20$ €. Combien rend-on ?", solution: "$3 \\times 2{,}50 = 7{,}50$ € ; $20 - 7{,}50 = 12{,}50$ €." }
    },
    {
      titre: "Comparer, dénombrer, optimiser",
      video: { titre: "Vidéo de Nathan Primaire : apprendre à chercher", youtube: "https://youtu.be/MwdziNgFnuA" },
      texte:
        "- **Comparaison multiplicative** : « $4$ fois plus » → on multiplie ; « $4$ fois moins » ou « $4$ fois plus petit » → on divise.\n" +
        "- **Dénombrer** avec un arbre : $3$ entrées, $2$ plats, $2$ desserts : $3 \\times 2 \\times 2 = 12$ menus.\n" +
        "- **Optimiser** : chercher la solution la moins chère, la plus rapide… en comparant plusieurs possibilités dans un tableau.",
      exemple: { enonce: "Une baleine de $150$ dm est $5$ fois plus longue qu'un dauphin. Le dauphin mesure ?", solution: "$150 \\div 5 = 30$ dm." }
    }
  ],
  exercices: [
    { type: "m2r-etapes", titre: "Problèmes à plusieurs étapes", etape: "Étapes", nb: 5 },
    { type: "m2r-comparaison", titre: "Fois plus, fois moins", etape: "Comparer", nb: 5 },
    { type: "m2r-chercher", titre: "Dénombrer et optimiser", etape: "Chercher", nb: 5 }
  ],
  qcm: [
    { question: "La première phase pour résoudre un problème est :", choix: ["comprendre l'histoire et la question", "calculer vite", "écrire la réponse", "additionner les nombres"], bonne: 0, explication: "Sans comprendre, on ne choisit pas la bonne opération." },
    { question: "$3$ bouquets à $2{,}50$ € payés avec $20$ € : on rend", choix: ["$12{,}50$ €", "$7{,}50$ €", "$17{,}50$ €", "$13{,}50$ €"], bonne: 0, explication: "$20 - 7{,}50$." },
    { question: "Saïd a $30$ billes. Kamal en a $4$ fois plus. Kamal en a :", choix: ["$120$", "$34$", "$26$", "$7{,}5$"], bonne: 0, explication: "$30 \\times 4$." },
    { question: "Une baleine de $150$ dm est $5$ fois plus longue qu'un dauphin. Le dauphin mesure :", choix: ["$30$ dm", "$750$ dm", "$145$ dm", "$155$ dm"], bonne: 0, explication: "$150 \\div 5$." },
    { question: "Faïza a $48$ €, Zaïnaba $12$ €. Faïza a combien de fois plus ?", choix: ["$4$ fois", "$36$ fois", "$3$ fois", "$60$ fois"], bonne: 0, explication: "$48 \\div 12$." },
    { question: "« Kamal a $42$ billes, c'est $12$ de plus que Saïd. » Saïd a :", choix: ["$30$ billes", "$54$ billes", "$12$ billes", "$42$ billes"], bonne: 0, explication: "$42 - 12$ : le mot « plus » cache une soustraction." },
    { question: "$3$ entrées, $2$ plats, $2$ desserts : combien de menus ?", choix: ["$12$", "$7$", "$6$", "$9$"], bonne: 0, explication: "$3 \\times 2 \\times 2$." },
    { question: "$6$ équipes jouent chacune contre chacune une fois. Combien de matchs ?", choix: ["$15$", "$30$", "$36$", "$12$"], bonne: 0, explication: "$5 + 4 + 3 + 2 + 1$." },
    { question: "De combien de façons ranger $3$ livres côte à côte ?", choix: ["$6$", "$3$", "$9$", "$27$"], bonne: 0, explication: "$3 \\times 2 \\times 1$." },
    { question: "Un champ de $17$ m sur $14$ m est entouré de $4$ rangées de fil. Longueur de fil :", choix: ["$248$ m", "$62$ m", "$124$ m", "$952$ m"], bonne: 0, explication: "$62 \\times 4$." },
    { question: "La longueur d'une voiture est plausible si elle vaut :", choix: ["$4{,}5$ m", "$4{,}5$ km", "$45$ cm", "$450$ m"], bonne: 0, explication: "Une voiture fait quelques mètres." },
    { question: "Un club a $287$ licenciés ; $26$ partent, $43$ arrivent. Il en a :", choix: ["$304$", "$356$", "$218$", "$270$"], bonne: 0, explication: "$287 - 26 + 43$." },
    { question: "Un groupe paie $190$ € : $10$ € de matériel et $6$ places identiques. Une place coûte :", choix: ["$30$ €", "$31{,}67$ €", "$33{,}33$ €", "$180$ €"], bonne: 0, explication: "$(190 - 10) \\div 6$." },
    { question: "Un lot de $10$ bouteilles coûte $7$ €, un lot de $4$ coûte $3$ €. Le moins cher pour $14$ bouteilles :", choix: ["un lot de $10$ et un lot de $4$ : $10$ €", "quatre lots de $4$ : $12$ €", "deux lots de $10$ : $14$ €", "trois lots de $4$ : $9$ €"], bonne: 0, explication: "$7 + 3 = 10$ € pour exactement $14$ bouteilles." },
    { question: "Inaya a $9$ ans. Son grand-père a $6$ fois son âge plus $6$ ans. Il a :", choix: ["$60$ ans", "$54$ ans", "$21$ ans", "$90$ ans"], bonne: 0, explication: "$9 \\times 6 + 6$." },
    { question: "Un schéma en barres sert à :", choix: ["voir les parties et le tout pour choisir l'opération", "décorer la copie", "remplacer la phrase réponse", "mesurer une longueur"], bonne: 0, explication: "C'est un outil pour modéliser." },
    { question: "$4$ amis partagent $26{,}40$ € de courses. Chacun paie :", choix: ["$6{,}60$ €", "$6{,}10$ €", "$105{,}60$ €", "$22{,}40$ €"], bonne: 0, explication: "$26{,}40 \\div 4$." },
    { question: "Après avoir trouvé une réponse, on doit :", choix: ["vérifier qu'elle est plausible", "passer vite au suivant", "effacer le brouillon", "recopier l'énoncé"], bonne: 0, explication: "C'est la phase de régulation." }
  ],
  methode: [
    { titre: "Résoudre un problème en quatre phases", etapes: ["Comprendre : raconte l'histoire, repère la question.", "Modéliser : fais un schéma, choisis les opérations.", "Calculer : de tête ou en posant.", "Répondre : fais une phrase et vérifie que c'est plausible."], exemple: "$3 \\times 2{,}50 = 7{,}50$ ; $20 - 7{,}50 = 12{,}50$ € rendus." }
  ],
  erreurs: ["Additionner dès qu'on voit le mot « plus ».", "Multiplier pour « $5$ fois plus petit ».", "Compter deux fois le même match dans un tournoi.", "Ne pas vérifier la vraisemblance du résultat."]
};
