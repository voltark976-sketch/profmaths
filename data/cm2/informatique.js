/*
  CHAPITRE : CM2 — Pensée informatique
  -------------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM2 : codages de déplacements plus longs ; suites évolutives de
  nombres ou de motifs plus complexes (7 ; 15 ; 31 ; 63 ; 127…) ; programmes de calcul jusqu'à trois instructions
  (choisir un nombre, ajouter 2, multiplier par 4, retirer 3) ; programmes en blocs (type Scratch) ; programmes de
  construction de figures simples.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm2-informatique"] = {
  niveau: "CM2",
  numero: 18,
  titre: "Pensée informatique",
  accroche: "Programmes de calcul, suites, et un robot qui dessine des figures.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Programmes de calcul",
      video: { titre: "Vidéo de « 1 jour, 1 question » : c'est quoi un algorithme ?", youtube: "https://youtu.be/ioCiS980Dbg" },
      texte:
        "Un **programme de calcul** est une suite d'instructions à exécuter **dans l'ordre**.\n\n" +
        "Avec ce programme, si on choisit $5$ : $5 + 2 = 7$ ; $7 \\times 4 = 28$ ; $28 - 3 = 25$. Le programme écrit $25$.\n\n" +
        "On peut le résumer : $5 \\to 7 \\to 28 \\to 25$.\n\n" +
        "Si on change l'ordre des instructions, le résultat change en général : « multiplier par $4$ » puis « ajouter $2$ » donne $5 \\times 4 + 2 = 22$.",
      figure: "m2i-cours-programme",
      exemple: { enonce: "Même programme avec $10$ ?", solution: "$10 \\to 12 \\to 48 \\to 45$." }
    },
    {
      titre: "Suites et robots",
      video: { titre: "Vidéo de « 1 jour, 1 question » : c'est quoi le code informatique ?", youtube: "https://youtu.be/2UqIJlVQE7o" },
      texte:
        "**Suites évolutives** : $7 \\;;\\; 15 \\;;\\; 31 \\;;\\; 63 \\;;\\; 127 \\;;\\; \\ldots$ La règle : multiplier par $2$, puis ajouter $1$. Le suivant : $2 \\times 127 + 1 = 255$.\n\n" +
        "**Boucles** : « répéter $4$ fois : avancer de $5$, tourner de $90°$ à droite » fait dessiner un **carré** à un robot.\n\n" +
        "- « répéter $3$ fois : avancer, tourner de $120°$ » : un triangle équilatéral.\n" +
        "- « répéter $6$ fois : avancer, tourner de $60°$ » : un hexagone.\n\n" +
        "Le robot tourne en tout d'un tour complet ($360°$) pour revenir à son point de départ.",
      exemple: { enonce: "Un motif a $4$ carrés à l'étape $1$ et $3$ de plus à chaque étape. Étape $14$ ?", solution: "$4 + 13 \\times 3 = 43$ carrés." }
    }
  ],
  exercices: [
    { type: "m2i-programme", titre: "Exécuter un programme de calcul", etape: "Programmes", nb: 6 },
    { type: "m2i-suites", titre: "Suites et boucles", etape: "Suites", nb: 5 },
    { type: "m2i-construire", titre: "Le robot dessinateur", etape: "Robots", nb: 4 }
  ],
  qcm: [
    { question: "Programme : « choisir $5$, ajouter $2$, multiplier par $4$, retirer $3$ ». Résultat :", figure: "m2i-cours-programme", choix: ["$25$", "$28$", "$19$", "$22$"], bonne: 0, explication: "$5 \\to 7 \\to 28 \\to 25$." },
    { question: "Le même programme avec $10$ :", figure: "m2i-cours-programme", choix: ["$45$", "$48$", "$39$", "$42$"], bonne: 0, explication: "$10 \\to 12 \\to 48 \\to 45$." },
    { question: "Le même programme avec $0$ :", figure: "m2i-cours-programme", choix: ["$5$", "$0$", "$8$", "$3$"], bonne: 0, explication: "$0 \\to 2 \\to 8 \\to 5$." },
    { question: "Dans un programme de calcul, l'ordre des instructions :", choix: ["compte", "ne compte jamais", "ne compte que pour les additions", "est au hasard"], bonne: 0, explication: "$5 \\times 4 + 2 \\neq (5 + 2) \\times 4$." },
    { question: "La suite $7 \\;;\\; 15 \\;;\\; 31 \\;;\\; 63 \\;;\\; 127$ continue avec :", choix: ["$255$", "$191$", "$254$", "$135$"], bonne: 0, explication: "$2 \\times 127 + 1$." },
    { question: "La règle de $3 \\;;\\; 7 \\;;\\; 15 \\;;\\; 31$ est :", choix: ["multiplier par $2$, puis ajouter $1$", "ajouter $4$", "multiplier par $2$", "ajouter $8$"], bonne: 0, explication: "$2 \\times 3 + 1 = 7$, $2 \\times 7 + 1 = 15$…" },
    { question: "« répéter $4$ fois : avancer de $5$, tourner de $90°$ » trace :", choix: ["un carré", "un triangle", "un rectangle non carré", "un hexagone"], bonne: 0, explication: "$4$ côtés égaux, $4$ angles droits." },
    { question: "« répéter $3$ fois : avancer de $6$, tourner de $120°$ » trace :", choix: ["un triangle équilatéral", "un carré", "un triangle rectangle", "un pentagone"], bonne: 0, explication: "$3$ côtés égaux." },
    { question: "« répéter $6$ fois : avancer, tourner de $60°$ » trace :", choix: ["un hexagone", "un pentagone", "un carré", "un triangle"], bonne: 0, explication: "$6$ côtés." },
    { question: "Pour revenir à son point de départ en traçant un polygone, le robot tourne en tout de :", choix: ["$360°$", "$90°$", "$180°$", "$100°$"], bonne: 0, explication: "Un tour complet : $4 \\times 90° = 360°$." },
    { question: "Étape $1$ : $4$ carrés ; $+3$ à chaque étape. Étape $14$ :", choix: ["$43$", "$46$", "$42$", "$56$"], bonne: 0, explication: "$4 + 13 \\times 3$." },
    { question: "Une boucle « répéter $5$ fois : ajouter $4$ » en partant de $10$ donne :", choix: ["$30$", "$29$", "$14$", "$50$"], bonne: 0, explication: "$10 + 5 \\times 4$." },
    { question: "Programme : « choisir $3$, multiplier par $5$, ajouter $1$, multiplier par $2$ ». Résultat :", choix: ["$32$", "$31$", "$16$", "$40$"], bonne: 0, explication: "$3 \\to 15 \\to 16 \\to 32$." },
    { question: "Un algorithme est :", choix: ["une suite d'instructions pour résoudre un problème", "un ordinateur", "un nombre", "un robot"], bonne: 0, explication: "Comme une recette." },
    { question: "La règle « multiplier par $3$, puis retirer $2$ » à partir de $2$ donne :", choix: ["$2 \\;;\\; 4 \\;;\\; 10 \\;;\\; 28$", "$2 \\;;\\; 6 \\;;\\; 18 \\;;\\; 54$", "$2 \\;;\\; 4 \\;;\\; 6 \\;;\\; 8$", "$2 \\;;\\; 5 \\;;\\; 8 \\;;\\; 11$"], bonne: 0, explication: "$3 \\times 2 - 2 = 4$ ; $3 \\times 4 - 2 = 10$ ; $3 \\times 10 - 2 = 28$." },
    { question: "Dans Scratch, le bloc « répéter $10$ fois » sert à :", choix: ["répéter des instructions", "arrêter le programme", "choisir au hasard", "effacer l'écran"], bonne: 0, explication: "C'est une boucle." },
    { question: "Pour trouver une erreur (un « bug »), on peut :", choix: ["exécuter le programme pas à pas", "le recopier plus vite", "ajouter des boucles au hasard", "changer l'ordre au hasard"], bonne: 0, explication: "On vérifie chaque instruction." },
    { question: "Programme : « choisir $N$, multiplier par $12$, ajouter $5$ ». Avec $N = 4$ :", choix: ["$53$", "$68$", "$21$", "$48$"], bonne: 0, explication: "$48 + 5$." }
  ],
  methode: [
    { titre: "Exécuter un programme de calcul", etapes: ["Écris le nombre choisi.", "Applique chaque instruction dans l'ordre, en notant le résultat.", "Résume avec des flèches : $5 \\to 7 \\to 28 \\to 25$.", "Le dernier nombre est le résultat."], figure: "m2i-cours-programme", exemple: "$10 \\to 12 \\to 48 \\to 45$." }
  ],
  erreurs: ["Changer l'ordre des instructions.", "Appliquer toutes les instructions au nombre de départ au lieu du résultat précédent.", "Compter une répétition de trop dans une boucle.", "Trouver une règle qui ne marche que pour les deux premiers nombres."]
};
