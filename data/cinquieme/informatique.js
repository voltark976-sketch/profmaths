/*
  CHAPITRE : 5e — Programmation par blocs
  ----------------------------------------
  Programme de mathématiques du cycle 4 (BO n° 10 du 5 mars 2026), en vigueur en 5e à la rentrée 2026, partie
  « La pensée informatique » : manipuler des instructions simples et les séquencer ; identifier les entrées et
  sorties d'un programme ; représenter des formules par une expression informatique en blocs ; calculer la valeur
  de formules par une suite d'instructions ; prévoir la valeur d'une expression avant son exécution ; analyser un
  programme simple et modifier ses paramètres ; boucle inconditionnelle « répéter … fois ». La variable n'est vue
  qu'en lecture d'une donnée saisie (« réponse »).
  figure : programmes dessinés avec blocs() (assets/exercices-college.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cinquieme-informatique"] = {
  niveau: "5e",
  numero: 18,
  titre: "Programmation par blocs",
  accroche: "Entrées, sorties, expressions avec la « réponse » et boucles « répéter » : lire, prévoir et modifier des programmes Scratch.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Apprendre à programmer avec Scratch (3) : les variables (Yvan Monka)", url: "https://youtu.be/qPF7vTP_VBs", type: "video" },
    { titre: "La boucle « répéter » pour tracer un carré (jaicompris Maths)", url: "https://youtu.be/mromwv04LcA", type: "video" },
    { titre: "Programmer en ligne avec Scratch (gratuit)", url: "https://scratch.mit.edu/projects/editor/", type: "jeu" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Entrées, sorties et expressions",
      video: { titre: "Vidéo d'Yvan Monka : apprendre à programmer avec Scratch (1)", youtube: "https://youtu.be/pdtMUgnmRa4" },
      texte:
        "Un programme est une **suite d'instructions** exécutées dans l'ordre.\n\n" +
        "- L'instruction « demander … et attendre » est une **entrée** : le nombre tapé est rangé dans la variable **réponse**.\n" +
        "- L'instruction « dire … » est une **sortie** : le lutin affiche un résultat.\n\n" +
        "Dans un bloc, on peut écrire une **expression** : « dire [réponse * 3 + 5] ». L'ordinateur respecte les **priorités** comme en mathématiques ; $*$ signifie « multiplier » et $/$ « diviser ».",
      figure: "pr5-cours-entree",
      exemple: {
        enonce: "On répond $4$ au programme « demander ; dire [(réponse + 2) * 5] ». Que dit le lutin ?",
        solution: "$(4 + 2) \\times 5 = 30$ : le lutin dit $30$."
      }
    },
    {
      titre: "Traduire une formule",
      video: { titre: "Vidéo d'Yvan Monka : apprendre à programmer avec Scratch (3), les variables", youtube: "https://youtu.be/qPF7vTP_VBs" },
      texte:
        "Pour faire calculer une formule à l'ordinateur, on l'écrit avec les opérateurs $+$, $-$, $*$, $/$ et des **parenthèses** si besoin.\n\n" +
        "- Périmètre d'un rectangle : $P = 2 \\times (L + \\ell)$ s'écrit « $(L + l) * 2$ ».\n" +
        "- Moyenne de deux notes : « (a + b) / 2 », et non « a + b / 2 ».\n\n" +
        "On **prévoit** le résultat en calculant à la main avant d'exécuter le programme. Le programme dessiné demande la base, puis la hauteur, et dit l'aire du triangle.",
      figure: "pr5-cours-formule",
      exemple: {
        enonce: "Quelle expression calcule l'aire d'un triangle de base $b$ et de hauteur $h$ ?",
        solution: "« b * h / 2 » (ou « (b * h) / 2 »)."
      }
    },
    {
      titre: "Répéter des instructions",
      video: { titre: "Vidéo d'Yvan Monka : apprendre à programmer avec Scratch (2), les boucles", youtube: "https://youtu.be/8Sfarvw6jgg" },
      texte:
        "La boucle **« répéter $n$ fois »** exécute $n$ fois les instructions qu'elle contient.\n\n" +
        "Pour tracer un **polygone régulier** à $n$ côtés : stylo en position d'écriture, puis répéter $n$ fois (avancer de $L$ pas ; tourner de $360 \\div n$ degrés). Après $n$ virages, le lutin a fait un tour complet.\n\n" +
        "On **modifie les paramètres** pour changer la figure : la longueur dans « avancer », le nombre de répétitions et l'angle. Le programme dessiné trace un pentagone régulier de côté $60$ pas.",
      figure: "pr5-cours-boucle",
      exemple: {
        enonce: "Que faut-il écrire pour tracer un pentagone régulier de côté $60$ pas ?",
        solution: "Répéter $5$ fois (avancer de $60$ pas ; tourner de $360 \\div 5 = 72$ degrés)."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "pr5-executer", titre: "Prévoir ce que dit le lutin", etape: "Entrées et sorties", nb: 6 },
    { type: "pr5-expression", titre: "Écrire une expression informatique", etape: "Expressions", nb: 5 },
    { type: "pr5-boucle", titre: "Exécuter une boucle", etape: "Boucles", nb: 6 },
    { type: "pr5-parametres", titre: "Analyser et modifier un programme", etape: "Boucles", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "« demander [Ton âge ?] et attendre » est :", choix: ["une entrée", "une sortie", "une boucle", "un déplacement"], bonne: 0, explication: "On donne une information au programme." },
    { question: "« dire [réponse * 2] » est :", choix: ["une sortie", "une entrée", "une boucle", "une condition"], bonne: 0, explication: "Le lutin affiche un résultat." },
    { question: "Après « demander », le nombre tapé est rangé dans :", choix: ["la variable réponse", "le lutin", "la boucle", "le drapeau"], bonne: 0, explication: "Scratch range la saisie dans « réponse »." },
    { question: "On répond $5$ : « dire [réponse * 2 + 1] » affiche :", choix: ["$11$", "$15$", "$7$", "$12$"], bonne: 0, explication: "$5 \\times 2 + 1 = 11$." },
    { question: "On répond $5$ : « dire [(réponse + 1) * 2] » affiche :", choix: ["$12$", "$11$", "$7$", "$10$"], bonne: 0, explication: "$(5 + 1) \\times 2 = 12$." },
    { question: "Dans Scratch, le symbole $*$ signifie :", choix: ["multiplier", "additionner", "diviser", "puissance"], bonne: 0, explication: "C'est le signe de la multiplication." },
    { question: "La moyenne de $a$ et $b$ s'écrit :", choix: ["« (a + b) / 2 »", "« a + b / 2 »", "« a / 2 + b »", "« a * b / 2 »"], bonne: 0, explication: "Les parenthèses imposent l'addition d'abord." },
    { question: "« répéter $4$ fois (ajouter $3$ à N) » avec N $= 1$ au départ donne :", choix: ["$13$", "$4$", "$7$", "$12$"], bonne: 0, explication: "$1 + 4 \\times 3 = 13$." },
    { question: "« répéter $3$ fois (mettre N à N * 2) » avec N $= 5$ donne :", choix: ["$40$", "$30$", "$11$", "$15$"], bonne: 0, explication: "$5 \\to 10 \\to 20 \\to 40$." },
    { question: "Pour un carré, le lutin tourne à chaque fois de :", choix: ["$90^\\circ$", "$60^\\circ$", "$45^\\circ$", "$360^\\circ$"], bonne: 0, explication: "$360 \\div 4$." },
    { question: "Pour un triangle équilatéral, le lutin tourne à chaque fois de :", choix: ["$120^\\circ$", "$60^\\circ$", "$90^\\circ$", "$180^\\circ$"], bonne: 0, explication: "$360 \\div 3$ : c'est l'angle extérieur." },
    { question: "« répéter $6$ fois (avancer de $50$ ; tourner de $60$) » trace :", choix: ["un hexagone régulier", "un carré", "un triangle", "un pentagone"], bonne: 0, explication: "$6$ côtés égaux." },
    { question: "Pour agrandir la figure tracée, on modifie :", choix: ["la longueur dans « avancer »", "le nombre de répétitions", "l'angle", "le drapeau vert"], bonne: 0, explication: "Les côtés deviennent plus longs, la forme reste la même." },
    { question: "Le périmètre de la figure « répéter $5$ fois (avancer de $40$ ; tourner de $72$) » est :", choix: ["$200$ pas", "$40$ pas", "$360$ pas", "$45$ pas"], bonne: 0, explication: "$5 \\times 40$." },
    { question: "Quelle figure trace ce programme ?", figure: "pr5-qcm-carre", choix: ["un carré de côté $50$ pas", "un rectangle de $50$ sur $90$ pas", "un triangle équilatéral", "un pentagone régulier"], bonne: 0, explication: "$4$ côtés de $50$ pas et des virages de $90^\\circ$ : un carré." },
    { question: "Quel est le périmètre de la figure tracée par ce programme ?", figure: "pr5-qcm-hexa", choix: ["$240$ pas", "$40$ pas", "$360$ pas", "$100$ pas"], bonne: 0, explication: "$6$ côtés de $40$ pas : $6 \\times 40 = 240$ pas." },
    { question: "Pour que ce programme trace un triangle équilatéral, il faut écrire :", figure: "pr5-qcm-hexa", choix: ["répéter $3$ fois, tourner de $120$ degrés", "répéter $3$ fois, tourner de $60$ degrés", "répéter $6$ fois, tourner de $120$ degrés", "répéter $3$ fois, tourner de $180$ degrés"], bonne: 0, explication: "$3$ côtés et $360 \\div 3 = 120^\\circ$ à chaque virage." },
    { question: "On lance ce programme et on répond $6$. Le lutin dit :", figure: "pr5-qcm-calcul", choix: ["$22$", "$42$", "$18$", "$13$"], bonne: 0, explication: "$6 \\times 3 + 4 = 22$ : la multiplication d'abord." },
    { question: "Dans ce programme, quelle instruction est la sortie ?", figure: "pr5-qcm-calcul", choix: ["dire [réponse * 3 + 4]", "demander [Nombre ?] et attendre", "quand le drapeau est cliqué", "il n'y a pas de sortie"], bonne: 0, explication: "« dire » affiche le résultat : c'est la sortie." },
    { question: "Que dit le lutin à la fin de ce programme ?", figure: "pr5-qcm-boucle", choix: ["$13$", "$4$", "$12$", "$7$"], bonne: 0, explication: "N vaut $1$, puis $4$, $7$, $10$ et $13$ après les quatre passages." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Prévoir le résultat d'un programme",
      etapes: [
        "Repère l'entrée (demander) et la sortie (dire).",
        "Remplace « réponse » par le nombre saisi.",
        "Calcule en respectant les priorités et les parenthèses."
      ],
      exemple: "Programme dessiné, réponse $4$ : $(4 + 2) \\times 5 = 30$. Et « réponse * réponse + 1 » avec $3$ donne $10$.",
      figure: "pr5-cours-entree"
    },
    {
      titre: "Exécuter une boucle à la main",
      etapes: [
        "Écris la valeur de départ des variables.",
        "À chaque passage, applique les instructions de la boucle et note la nouvelle valeur.",
        "Arrête-toi après le nombre de répétitions indiqué."
      ],
      exemple: "Programme dessiné : N $= 1$, puis $4$, $7$, $10$, $13$ ; le lutin dit $13$.",
      figure: "pr5-qcm-boucle"
    },
    {
      titre: "Tracer un polygone régulier",
      etapes: [
        "Répéter autant de fois qu'il y a de côtés.",
        "Avancer de la longueur du côté.",
        "Tourner de $360 \\div n$ degrés."
      ],
      exemple: "Pentagone : répéter $5$ fois (avancer ; tourner de $72$). Octogone : répéter $8$ fois (avancer ; tourner de $45$).",
      figure: "pr5-cours-trace"
    }
  ],
  erreurs: [
    "Oublier les parenthèses dans une expression : « a + b / 2 » ne calcule pas la moyenne.",
    "Calculer de gauche à droite sans respecter les priorités.",
    "Ne faire qu'un seul passage dans la boucle.",
    "Tourner de l'angle intérieur du polygone au lieu de $360 \\div n$.",
    "Confondre entrée et sortie."
  ]
};
