/*
  CHAPITRE : CM2 — Solides et déplacements
  -----------------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM2 : nommer et décrire cube, pavé, pyramide, prisme droit, cylindre,
  cône, boule ; représentations en perspective (arêtes cachées en pointillés) ; reconnaître et construire un patron de
  cube ; reconnaître un patron de pavé ; assemblages de cubes ; vocabulaire des déplacements ; comprendre et produire
  une suite d'instructions qui décrit un déplacement.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm2-solides-deplacements"] = {
  niveau: "CM2",
  numero: 15,
  titre: "Solides et déplacements",
  accroche: "Patrons de cube, assemblages de cubes, et des déplacements codés dans la ville.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Solides et patrons",
      video: { titre: "Vidéo de Maître Lucas : les polyèdres (CM1-CM2)", youtube: "https://youtu.be/gFpJUZKnILE" },
      texte:
        "- **Cube** et **pavé** : $6$ faces, $12$ arêtes, $8$ sommets. **Prisme droit** à base triangulaire : $5$ faces, $9$ arêtes, $6$ sommets. **Pyramide** à base carrée : $5$ faces, $8$ arêtes, $5$ sommets.\n" +
        "- Un **patron** est une figure plane qu'on plie pour fabriquer le solide. Un patron de cube a **$6$ carrés** ; en pliant, aucun carré ne doit en recouvrir un autre.\n" +
        "- Ici, une croix : c'est un patron de cube. Six carrés en ligne, ou un bloc de $2 \\times 2$ carrés, ne sont **pas** des patrons de cube.\n" +
        "- Un patron de pavé a $6$ rectangles, **identiques deux à deux**.",
      figure: "m2e-cours-patron",
      exemple: { enonce: "Un pavé est formé de $4$ cubes de long, $3$ de large et $2$ de haut. Combien de cubes ?", solution: "$4 \\times 3 = 12$ par couche ; $2$ couches : $24$ cubes." }
    },
    {
      titre: "Coder un déplacement",
      video: { titre: "Vidéo de Maître Lucas : coder des déplacements", youtube: "https://youtu.be/0RQzTlSCN-k" },
      texte:
        "Sur un plan quadrillé de la ville, chaque flèche fait avancer d'**une case** : $\\rightarrow$ droite, $\\leftarrow$ gauche, $\\uparrow$ haut, $\\downarrow$ bas.\n\n" +
        "On peut aussi décrire un trajet avec des mots : « avance de $3$ cases, tourne à droite, avance de $2$ cases ». Attention : « tourner à droite » dépend du sens dans lequel on marche !\n\n" +
        "Pour vérifier un code, on le suit avec le doigt, une flèche après l'autre.",
      exemple: { enonce: "Pour aller $4$ cases à droite et $3$ cases vers le bas :", solution: "$\\rightarrow\\,\\rightarrow\\,\\rightarrow\\,\\rightarrow\\,\\downarrow\\,\\downarrow\\,\\downarrow$." }
    }
  ],
  exercices: [
    { type: "m2e-solides", titre: "Solides, patrons, assemblages", etape: "Solides", nb: 6 },
    { type: "m2e-deplacer", titre: "Suivre et écrire un code", etape: "Déplacements", nb: 6 },
    { type: "m2i-construire", titre: "Le robot dessinateur", etape: "Déplacements", nb: 4 }
  ],
  qcm: [
    { question: "Combien d'arêtes a un cube ?", choix: ["$12$", "$6$", "$8$", "$10$"], bonne: 0, explication: "$4$ en haut, $4$ en bas, $4$ verticales." },
    { question: "Combien de sommets a un prisme droit à base triangulaire ?", choix: ["$6$", "$5$", "$9$", "$3$"], bonne: 0, explication: "$3$ en haut, $3$ en bas." },
    { question: "Combien de faces a une pyramide à base carrée ?", choix: ["$5$", "$4$", "$6$", "$8$"], bonne: 0, explication: "La base et $4$ triangles." },
    { question: "Un patron de cube est formé de :", choix: ["$6$ carrés", "$6$ rectangles quelconques", "$4$ carrés", "$8$ carrés"], bonne: 0, explication: "Une face $=$ un carré." },
    { question: "Six carrés en ligne droite :", choix: ["ne forment pas un patron de cube", "forment un patron de cube", "forment un patron de pyramide", "forment un cylindre"], bonne: 0, explication: "En pliant, deux carrés se superposent." },
    { question: "Un patron de pavé est formé de :", choix: ["$6$ rectangles identiques deux à deux", "$6$ carrés toujours", "$4$ triangles", "$2$ disques et un rectangle"], bonne: 0, explication: "Trois paires de faces opposées." },
    { question: "Les arêtes cachées d'un solide en perspective sont dessinées :", choix: ["en pointillés", "en rouge", "plus épaisses", "elles ne sont pas dessinées"], bonne: 0, explication: "C'est une convention." },
    { question: "$4$ cubes de long, $3$ de large, $2$ de haut : combien de cubes ?", choix: ["$24$", "$9$", "$12$", "$14$"], bonne: 0, explication: "$4 \\times 3 \\times 2$." },
    { question: "Pour faire un grand cube de $3$ petits cubes de côté, il faut :", choix: ["$27$ petits cubes", "$9$ petits cubes", "$12$ petits cubes", "$6$ petits cubes"], bonne: 0, explication: "$3 \\times 3 \\times 3$." },
    { question: "Quel solide a deux bases identiques reliées par des rectangles ?", choix: ["le prisme droit", "la pyramide", "le cône", "la boule"], bonne: 0, explication: "C'est sa définition." },
    { question: "Quel solide n'a ni arête ni sommet ?", choix: ["la boule", "le cylindre", "le cône", "le cube"], bonne: 0, explication: "Elle est toute ronde." },
    { question: "Le code $\\rightarrow\\,\\rightarrow\\,\\downarrow$ veut dire :", choix: ["$2$ cases à droite, puis $1$ vers le bas", "$2$ vers le bas, puis $1$ à droite", "$3$ à droite", "$1$ à gauche"], bonne: 0, explication: "On suit les flèches dans l'ordre." },
    { question: "Le code $\\uparrow\\,\\downarrow\\,\\leftarrow\\,\\rightarrow$ ramène :", choix: ["au point de départ", "deux cases plus haut", "deux cases à gauche", "une case à droite"], bonne: 0, explication: "Chaque flèche est annulée par la suivante." },
    { question: "Pour aller $4$ cases à droite et $3$ vers le bas, il faut :", choix: ["$7$ flèches", "$4$ flèches", "$3$ flèches", "$12$ flèches"], bonne: 0, explication: "Une flèche par case : $4 + 3$." },
    { question: "« Tourner à droite » quand on marche vers le bas du plan fait aller vers :", choix: ["la gauche du plan", "la droite du plan", "le haut du plan", "le bas du plan"], bonne: 0, explication: "On se met à la place du marcheur : sa droite est la gauche du plan." },
    { question: "Un robot fait « répéter $4$ fois : avancer de $5$, tourner de $90°$ ». Il trace :", choix: ["un carré", "un triangle", "un cercle", "un hexagone"], bonne: 0, explication: "$4$ côtés égaux et $4$ angles droits." },
    { question: "Combien de faces a un pavé ?", choix: ["$6$", "$4$", "$8$", "$12$"], bonne: 0, explication: "Trois paires de faces opposées." },
    { question: "Les faces latérales d'une pyramide sont des :", choix: ["triangles", "rectangles", "carrés", "disques"], bonne: 0, explication: "Elles se rejoignent au sommet." }
  ],
  methode: [
    { titre: "Reconnaître un patron de cube", etapes: ["Vérifie qu'il y a $6$ carrés.", "Cherche un bloc de $2 \\times 2$ carrés ou $5$ carrés alignés : si oui, ce n'est pas un patron.", "Imagine le pliage : choisis un carré comme fond, plie les autres autour.", "Aucun carré ne doit en recouvrir un autre."], figure: "m2e-cours-patron", exemple: "La croix est un patron ; six carrés alignés, non." }
  ],
  erreurs: ["Oublier les arêtes cachées.", "Croire que toute figure de $6$ carrés est un patron de cube.", "Ne compter qu'une couche dans un assemblage de cubes.", "Confondre la droite du plan et la droite du marcheur."]
};
