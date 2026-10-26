/*
  CHAPITRE : CM1 — Résoudre des problèmes
  ----------------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM1 : problèmes à une ou plusieurs étapes mobilisant les quatre
  opérations (comparaison, « fois plus », partage) ; schémas en barres ; problèmes de dénombrement (menus, poignées de
  main) ; problèmes d'optimisation simples (nombre minimal de véhicules, de boîtes…). Contextes de Mayotte.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm1-problemes"] = {
  niveau: "CM1",
  numero: 7,
  titre: "Résoudre des problèmes",
  accroche: "Lire, schématiser, calculer étape par étape, et chercher toutes les possibilités.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Les problèmes à étapes",
      video: { titre: "Vidéo de Maître Lucas : résoudre des problèmes (CM1-CM2)", youtube: "https://youtu.be/p39NsvRlHEU" },
      texte:
        "Une trottinette coûte $4$ fois plus cher qu'un casque à $47$ €. Roukia achète les deux et une lampe à $17$ €. Combien paie-t-elle ?\n\n" +
        "- **Étape 1** : la trottinette : $47 \\times 4 = 188$ €.\n" +
        "- **Étape 2** : le total : $188 + 47 + 17 = 252$ €.\n\n" +
        "Pour ne pas se perdre : on cherche ce qu'on demande, on repère les **questions intermédiaires**, on fait un **schéma**, puis on vérifie que la réponse est raisonnable.",
      exemple: { enonce: "Faïza achète $6$ cahiers à $6$ € et paie avec $50$ €. Combien lui rend-on ?", solution: "$6 \\times 6 = 36$ € ; $50 - 36 = 14$ €." }
    },
    {
      titre: "Dénombrer et optimiser",
      video: { titre: "Vidéo de Nathan Primaire : apprendre à chercher", youtube: "https://youtu.be/MwdziNgFnuA" },
      texte:
        "**Dénombrer**, c'est compter toutes les possibilités sans en oublier ni en compter deux fois.\n\n" +
        "Au snack, on choisit un plat parmi $3$ et un dessert parmi $2$ : pour **chaque** plat, il y a $2$ desserts possibles, donc $3 \\times 2 = 6$ menus. On peut faire une liste ou un arbre pour vérifier.\n\n" +
        "**Optimiser**, c'est chercher la meilleure solution : $70$ personnes, des taxis-bateaux de $12$ places. $12 \\times 5 = 60$, il reste $10$ personnes : il faut $6$ taxis-bateaux au minimum.",
      exemple: { enonce: "$4$ amis se serrent la main, chacun une fois avec chacun des autres. Combien de poignées de main ?", solution: "A-B, A-C, A-D, B-C, B-D, C-D : $6$ poignées de main." }
    }
  ],
  exercices: [
    { type: "m1r-etapes", titre: "Problèmes à étapes", etape: "Étapes", nb: 5 },
    { type: "m1r-denombrer", titre: "Dénombrer", etape: "Dénombrer", nb: 5 },
    { type: "m1r-optimiser", titre: "Trouver la meilleure solution", etape: "Optimiser", nb: 5 }
  ],
  qcm: [
    { question: "$6$ cahiers à $6$ €, payés avec $50$ €. On rend :", choix: ["$14$ €", "$36$ €", "$44$ €", "$12$ €"], bonne: 0, explication: "$50 - 36 = 14$." },
    { question: "Un casque coûte $47$ €, une trottinette $4$ fois plus. La trottinette coûte :", choix: ["$188$ €", "$51$ €", "$43$ €", "$235$ €"], bonne: 0, explication: "$47 \\times 4$." },
    { question: "Un plat parmi $3$ et un dessert parmi $2$. Combien de menus ?", choix: ["$6$", "$5$", "$3$", "$9$"], bonne: 0, explication: "$3 \\times 2$." },
    { question: "$4$ amis se serrent tous la main une fois. Combien de poignées de main ?", choix: ["$6$", "$4$", "$12$", "$16$"], bonne: 0, explication: "AB, AC, AD, BC, BD, CD." },
    { question: "$70$ personnes, taxis-bateaux de $12$ places. Combien de taxis au minimum ?", choix: ["$6$", "$5$", "$7$", "$58$"], bonne: 0, explication: "$5$ taxis ne suffisent pas ($60$ places)." },
    { question: "Avec les chiffres $1$, $2$ et $3$ utilisés une seule fois, combien de nombres à $3$ chiffres ?", choix: ["$6$", "$3$", "$9$", "$27$"], bonne: 0, explication: "$123$, $132$, $213$, $231$, $312$, $321$." },
    { question: "Pour résoudre un problème à étapes, on commence par :", choix: ["comprendre ce qu'on demande", "additionner tous les nombres", "écrire la réponse", "multiplier le plus grand nombre"], bonne: 0, explication: "On lit et on cherche la question." },
    { question: "Moussa a $120$ €. Il achète un ballon à $35$ € et un short à $28$ €. Il lui reste :", choix: ["$57$ €", "$63$ €", "$183$ €", "$85$ €"], bonne: 0, explication: "$35 + 28 = 63$ ; $120 - 63 = 57$." },
    { question: "Un bus a $45$ places. Combien de bus pour $100$ élèves ?", choix: ["$3$", "$2$", "$4$", "$55$"], bonne: 0, explication: "$2$ bus : $90$ places, pas assez." },
    { question: "On a $3$ t-shirts et $2$ shorts. Combien de tenues différentes ?", choix: ["$6$", "$5$", "$3$", "$1$"], bonne: 0, explication: "Chaque t-shirt avec chaque short." },
    { question: "Mariama a $3$ fois plus de billes que Saïd, qui en a $15$. Ensemble, ils ont :", choix: ["$60$ billes", "$45$ billes", "$18$ billes", "$48$ billes"], bonne: 0, explication: "$45 + 15$." },
    { question: "Des boîtes de $6$ œufs. Pour $50$ œufs, il faut au minimum :", choix: ["$9$ boîtes", "$8$ boîtes", "$6$ boîtes", "$10$ boîtes"], bonne: 0, explication: "$8$ boîtes : $48$ œufs ; il reste $2$ œufs." },
    { question: "Un litre de jus coûte $2$ €. Kamal en achète $7$ litres et paie avec $20$ €. On lui rend :", choix: ["$6$ €", "$14$ €", "$13$ €", "$11$ €"], bonne: 0, explication: "$20 - 14$." },
    { question: "Une barge fait $8$ allers-retours par heure. En $5$ heures, combien d'allers-retours ?", choix: ["$40$", "$13$", "$85$", "$3$"], bonne: 0, explication: "$8 \\times 5$." },
    { question: "$5$ équipes jouent chacune une fois contre chacune des autres. Combien de matchs ?", choix: ["$10$", "$20$", "$25$", "$5$"], bonne: 0, explication: "$4 + 3 + 2 + 1 = 10$." },
    { question: "Le schéma en barres sert à :", choix: ["représenter les quantités pour voir le calcul à faire", "dessiner joliment", "remplacer le calcul", "écrire la phrase réponse"], bonne: 0, explication: "Il aide à choisir l'opération." },
    { question: "$248$ élèves vont au cinéma. Un car transporte $50$ élèves. Combien de cars au minimum ?", choix: ["$5$", "$4$", "$6$", "$48$"], bonne: 0, explication: "$4$ cars : $200$ places ; il reste $48$ élèves." },
    { question: "Une tablette coûte $230$ €. On paie $50$ € tout de suite, puis le reste en $4$ fois égales. Chaque versement vaut :", choix: ["$45$ €", "$57{,}50$ €", "$180$ €", "$70$ €"], bonne: 0, explication: "$230 - 50 = 180$ ; $180 \\div 4 = 45$." }
  ],
  methode: [
    { titre: "Résoudre un problème à étapes", etapes: ["Lis l'énoncé et repère la question.", "Cherche ce qu'il faut savoir avant (question intermédiaire).", "Fais un schéma en barres si besoin.", "Calcule étape par étape, puis vérifie que la réponse est raisonnable.", "Écris une phrase réponse."], exemple: "Trottinette : $47 \\times 4 = 188$ ; total : $188 + 47 + 17 = 252$ €." },
    { titre: "Dénombrer sans oublier", etapes: ["Choisis un ordre : le premier élément, puis le deuxième…", "Fais une liste ou un arbre.", "Vérifie qu'aucune possibilité n'apparaît deux fois."], exemple: "Poignées de main à $4$ : $3 + 2 + 1 = 6$." }
  ],
  erreurs: ["Calculer avec tous les nombres de l'énoncé sans réfléchir.", "Oublier une étape intermédiaire.", "Compter deux fois la même poignée de main (A-B et B-A).", "Oublier le dernier véhicule pour les personnes qui restent."]
};
