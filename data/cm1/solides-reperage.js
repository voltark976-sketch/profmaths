/*
  CHAPITRE : CM1 — Solides et repérage
  -------------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM1 : reconnaître, nommer et décrire cube, pavé, prisme droit,
  pyramide, cylindre, cône, boule (faces, arêtes, sommets) ; assemblages de cubes ; se repérer et se déplacer sur un
  quadrillage ; lire et produire un code de déplacement (flèches).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm1-solides-reperage"] = {
  niveau: "CM1",
  numero: 15,
  titre: "Solides et repérage",
  accroche: "Prismes, pyramides et cubes, puis des déplacements codés sur un plan.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Décrire les solides",
      video: { titre: "Vidéo de Maître Lucas : pyramide et prisme", youtube: "https://youtu.be/ZqZNv-5S1fo" },
      texte:
        "- Le **prisme droit** a deux **bases** identiques et parallèles (ici des triangles) reliées par des faces **rectangulaires**. À base triangulaire : $5$ faces, $6$ sommets, $9$ arêtes.\n" +
        "- Le **pavé** (et le cube) : $6$ faces, $8$ sommets, $12$ arêtes. C'est un prisme droit à base rectangulaire !\n" +
        "- La **pyramide** a une base et des faces **triangulaires** qui se rejoignent en un sommet. À base carrée : $5$ faces, $5$ sommets, $8$ arêtes.\n" +
        "- Le cylindre, le cône et la boule ont des surfaces courbes : ils roulent.\n\n" +
        "Sur un dessin en perspective, les **pointillés** montrent les arêtes cachées.",
      figure: "m1e-cours-prisme",
      exemple: { enonce: "Un pavé est fait de $4$ cubes de long, $2$ de large et $2$ de haut. Combien de cubes ?", solution: "Une couche : $4 \\times 2 = 8$ cubes ; $2$ couches : $16$ cubes." }
    },
    {
      titre: "Se déplacer sur un quadrillage",
      video: { titre: "Vidéo de Maître Lucas : coder des déplacements", youtube: "https://youtu.be/0RQzTlSCN-k" },
      texte:
        "Sur un plan quadrillé, on code un déplacement avec des **flèches** : chaque flèche fait avancer d'**une case**.\n\n" +
        "$\\rightarrow$ droite, $\\leftarrow$ gauche, $\\uparrow$ haut, $\\downarrow$ bas.\n\n" +
        "Pour aller $3$ cases à droite puis $2$ cases vers le haut : $\\rightarrow\\,\\rightarrow\\,\\rightarrow\\,\\uparrow\\,\\uparrow$.\n\n" +
        "Pour suivre un code, on avance flèche par flèche, dans l'ordre, en posant le doigt sur le plan.",
      exemple: { enonce: "Que fait le code $\\uparrow\\,\\downarrow$ ?", solution: "On monte d'une case puis on redescend : on revient au point de départ." }
    }
  ],
  exercices: [
    { type: "m1e-solides", titre: "Nommer et décrire les solides", etape: "Les solides", nb: 6 },
    { type: "m1e-deplacer", titre: "Suivre un code de déplacement", etape: "Se déplacer", nb: 5 },
    { type: "m1e-coder", titre: "Écrire un code de déplacement", etape: "Se déplacer", nb: 5 }
  ],
  qcm: [
    { question: "Combien de faces a un cube ?", choix: ["$6$", "$8$", "$12$", "$4$"], bonne: 0, explication: "Six carrés." },
    { question: "Combien d'arêtes a un pavé ?", choix: ["$12$", "$6$", "$8$", "$10$"], bonne: 0, explication: "Comme le cube." },
    { question: "Combien de sommets a une pyramide à base carrée ?", choix: ["$5$", "$4$", "$8$", "$6$"], bonne: 0, explication: "$4$ en bas, $1$ en haut." },
    { question: "Un prisme droit à base triangulaire a combien de faces ?", choix: ["$5$", "$6$", "$3$", "$9$"], bonne: 0, explication: "$2$ triangles et $3$ rectangles." },
    { question: "Un prisme droit à base triangulaire a combien d'arêtes ?", choix: ["$9$", "$6$", "$12$", "$5$"], bonne: 0, explication: "$3$ en haut, $3$ en bas, $3$ verticales." },
    { question: "Les faces latérales d'un prisme droit sont des :", choix: ["rectangles", "triangles", "disques", "cercles"], bonne: 0, explication: "Elles relient les deux bases." },
    { question: "Les faces latérales d'une pyramide sont des :", choix: ["triangles", "rectangles", "carrés", "disques"], bonne: 0, explication: "Elles se rejoignent au sommet." },
    { question: "Quel solide n'a aucun sommet ?", choix: ["la boule", "le cube", "la pyramide", "le prisme"], bonne: 0, explication: "Elle est toute ronde." },
    { question: "Quel solide roule ?", choix: ["le cylindre", "le cube", "le pavé", "la pyramide"], bonne: 0, explication: "Il a une surface courbe." },
    { question: "Sur un dessin en perspective, les pointillés montrent :", choix: ["les arêtes cachées", "les faces colorées", "le centre", "les erreurs"], bonne: 0, explication: "Ce qu'on ne voit pas." },
    { question: "Un pavé de $3$ cubes de long, $2$ de large et $2$ de haut contient :", choix: ["$12$ cubes", "$7$ cubes", "$6$ cubes", "$10$ cubes"], bonne: 0, explication: "$3 \\times 2 \\times 2$." },
    { question: "Un pavé est aussi :", choix: ["un prisme droit", "une pyramide", "un cône", "une boule"], bonne: 0, explication: "Deux bases rectangulaires reliées par des rectangles." },
    { question: "Le code $\\rightarrow\\,\\rightarrow\\,\\uparrow$ veut dire :", choix: ["$2$ cases à droite puis $1$ vers le haut", "$2$ cases vers le haut puis $1$ à droite", "$3$ cases à droite", "$1$ case à gauche"], bonne: 0, explication: "On lit les flèches dans l'ordre." },
    { question: "Le code $\\leftarrow\\,\\rightarrow$ ramène :", choix: ["au point de départ", "deux cases à gauche", "deux cases à droite", "une case en haut"], bonne: 0, explication: "Les deux flèches s'annulent." },
    { question: "Pour aller $3$ cases à gauche, on écrit :", choix: ["$\\leftarrow\\,\\leftarrow\\,\\leftarrow$", "$\\rightarrow\\,\\rightarrow\\,\\rightarrow$", "$\\uparrow\\,\\uparrow\\,\\uparrow$", "$\\leftarrow$"], bonne: 0, explication: "Une flèche par case." },
    { question: "Combien de faces a une pyramide à base triangulaire ?", choix: ["$4$", "$3$", "$5$", "$6$"], bonne: 0, explication: "La base et $3$ triangles." },
    { question: "Un cylindre a :", choix: ["deux faces planes en forme de disque", "six faces carrées", "un sommet", "trois arêtes droites"], bonne: 0, explication: "Une face courbe et deux disques." },
    { question: "Pour suivre un code de déplacement, il faut :", choix: ["lire les flèches dans l'ordre", "compter toutes les flèches d'abord", "lire de droite à gauche", "commencer par la dernière flèche"], bonne: 0, explication: "Une flèche après l'autre." }
  ],
  methode: [
    { titre: "Compter faces, sommets et arêtes", etapes: ["Repère les bases du solide.", "Compte les faces : les bases, puis les faces latérales.", "Compte les sommets en haut, puis en bas.", "Compte les arêtes : celles des bases, puis celles qui les relient."], figure: "m1e-cours-prisme", exemple: "Prisme à base triangulaire : $3 + 3 + 3 = 9$ arêtes." },
    { titre: "Écrire un code de déplacement", etapes: ["Compte les cases vers la droite ou la gauche.", "Compte les cases vers le haut ou le bas.", "Écris une flèche par case, puis vérifie en suivant ton code."], exemple: "$2$ à droite, $3$ en bas : $\\rightarrow\\,\\rightarrow\\,\\downarrow\\,\\downarrow\\,\\downarrow$." }
  ],
  erreurs: ["Oublier les arêtes cachées (en pointillés).", "Confondre prisme et pyramide.", "Inverser gauche et droite.", "Compter la case de départ dans le déplacement."]
};
