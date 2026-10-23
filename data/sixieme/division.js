/*
  CHAPITRE : 6e — Division euclidienne, division décimale et durées
  -----------------------------------------------------------------
  Programme de mathématiques du cycle 3 (BO n° 16 du 17 avril 2025), en vigueur en 6e depuis la rentrée 2025 :
  - division euclidienne d'un entier par un entier inférieur à 100, problèmes (partage et groupement) ;
  - division d'un nombre décimal par un entier non nul inférieur à 10, problèmes ; valeur arrondie d'un quotient non décimal ;
  - multiples et diviseurs (réactivés pour le calcul sur les fractions), critères de divisibilité par 2, 5 et 10 ;
  - durées : unités (jour, heure, minute, seconde, année, siècle, millénaire), calculs sur des horaires et des durées,
    conversions entre écriture décimale et heures-minutes.
  Mêmes règles d'écriture que data/sixieme/nombres-entiers-decimaux.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["sixieme-division"] = {
  niveau: "6e",
  numero: 3,
  titre: "Division euclidienne, division décimale et durées",
  accroche: "Multiples et diviseurs, division avec reste, division décimale, puis calculs sur les horaires et les durées.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : division, durées (PDF)", url: "https://www.maths-et-tiques.fr/telech/25Divisions1.pdf" }
  ],
  liens: [
    { titre: "Tout le cours en vidéo (Yvan Monka)", url: "https://youtu.be/Ge-I7vwsIes", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Multiples et diviseurs",
      video: { titre: "Vidéo d'Yvan Monka : déterminer un multiple ou un diviseur", youtube: "https://youtu.be/03a7Lw4MRY8" },
      texte:
        "Comme $56 = 8 \\times 7$, on dit que :\n\n" +
        "- $56$ est un **multiple** de $7$ et de $8$ (il est dans leurs tables) ;\n" +
        "- $7$ et $8$ sont des **diviseurs** de $56$ ;\n" +
        "- $56$ est **divisible** par $7$ et par $8$.\n\n" +
        "Critères de divisibilité, en regardant le chiffre des unités :\n\n" +
        "- par $2$ : $0$, $2$, $4$, $6$ ou $8$ (le nombre est **pair**) ;\n" +
        "- par $5$ : $0$ ou $5$ ;\n" +
        "- par $10$ : $0$.\n\n" +
        "On ne divise jamais par $0$ : la division par $0$ n'a pas de sens.\n\n" +
        "Sur la figure, $12$ jetons forment $3$ rangées de $4$ : $12 = 3 \\times 4$, donc $3$ et $4$ sont des diviseurs de $12$.",
      figure: "d6-cours-multiples",
      exemple: {
        enonce: "Donne les quatre premiers multiples de $5$. $134$ est-il un multiple de $12$ ? Trouve tous les diviseurs de $12$.",
        solution: "Multiples de $5$ : $0$ ; $5$ ; $10$ ; $15$.\n\n$12 \\times 11 = 132$ et $12 \\times 12 = 144$ : $134$ n'est pas dans la table de $12$, ce n'est pas un multiple de $12$.\n\n$12 = 1 \\times 12 = 2 \\times 6 = 3 \\times 4$ : les diviseurs de $12$ sont $1$ ; $2$ ; $3$ ; $4$ ; $6$ ; $12$."
      }
    },
    {
      titre: "La division euclidienne",
      video: { titre: "Vidéo d'Yvan Monka : poser une division euclidienne (avec reste)", youtube: "https://youtu.be/2Ocfhucc58g" },
      texte:
        "Effectuer la **division euclidienne** de $73$ par $3$, c'est chercher combien de fois $3$ « va » dans $73$, et ce qui reste.\n\n" +
        "On trouve $73 = 3 \\times 24 + 1$ :\n\n" +
        "- $73$ est le **dividende**, $3$ le **diviseur** ;\n" +
        "- $24$ est le **quotient**, $1$ le **reste**.\n\n" +
        "**Dividende $=$ diviseur $\\times$ quotient $+$ reste**, et le reste est toujours **plus petit que le diviseur**.\n\n" +
        "Si le reste est $0$, le dividende est un multiple du diviseur. La figure montre où l'on écrit chaque terme quand on pose la division.",
      figure: "d6-cours-potence",
      exemple: {
        enonce: "Effectue la division euclidienne de $2\\,102$ par $59$.",
        solution: "$59 \\times 35 = 2\\,065$ et $59 \\times 36 = 2\\,124$ (trop grand).\n\nDonc $2\\,102 = 59 \\times 35 + 37$ : le quotient est $35$, le reste est $37$, et $37 < 59$."
      }
    },
    {
      titre: "Résoudre un problème avec une division euclidienne",
      video: { titre: "Vidéo d'Yvan Monka : résoudre un problème avec la division euclidienne", youtube: "https://youtu.be/iT1b33r72gg" },
      texte:
        "Une division répond à deux sortes de questions :\n\n" +
        "- **le partage** : combien chacun reçoit-il ? (on connaît le nombre de parts) ;\n" +
        "- **le groupement** : combien de parts peut-on faire ? (on connaît la taille d'une part).\n\n" +
        "Il faut ensuite **interpréter le reste** selon la question : faut-il un car de plus pour les élèves qui restent ? Les objets en trop sont-ils perdus ?\n\n" +
        "Le schéma illustre l'exemple : $4$ cars pleins de $55$ élèves, et $16$ élèves en plus.",
      figure: "d6-cours-cars",
      exemple: {
        enonce: "$236$ élèves partent en sortie dans des cars de $55$ places. Combien de cars faut-il ?",
        solution: "$236 = 55 \\times 4 + 16$ : $4$ cars pleins, et il reste $16$ élèves.\n\nIl faut un car de plus pour eux : $5$ cars."
      }
    },
    {
      titre: "La division décimale",
      video: { titre: "Vidéo d'Yvan Monka : poser une division décimale", youtube: "https://youtu.be/RbkDd_p_EVU" },
      texte:
        "Pour diviser un nombre décimal par un entier (ici de $2$ à $9$), on pose la division comme une division euclidienne :\n\n" +
        "- quand on abaisse le premier chiffre après la virgule, on écrit **une virgule au quotient** ;\n" +
        "- si le reste n'est pas nul, on ajoute des **zéros** après la virgule du dividende et on continue.\n\n" +
        "On vérifie en multipliant : $8{,}03 \\times 4 = 32{,}12$.",
      figure: "d6-cours-decimale",
      exemple: {
        enonce: "Calcule $32{,}12 \\div 4$ et $45 \\div 8$.",
        solution: "$32{,}12 \\div 4 = 8{,}03$ : dans $1$ dixième, il y a $0$ fois $4$, on écrit $0$ au quotient.\n\n$45 \\div 8$ : on écrit $45{,}000$ et on continue après la virgule : $45 \\div 8 = 5{,}625$."
      }
    },
    {
      titre: "Quotient non décimal et valeur arrondie",
      video: { titre: "Vidéo d'Yvan Monka : poser une division décimale (suite)", youtube: "https://youtu.be/CnuDwxwNl9k" },
      texte:
        "Certaines divisions ne s'arrêtent jamais : $23 \\div 6 = 3{,}8333\\ldots$ Le quotient n'est pas un nombre décimal.\n\n" +
        "On en donne alors une **valeur arrondie** : on calcule **un chiffre de plus** que la précision demandée, puis on arrondit.\n\n" +
        "$23 \\div 6 \\approx 3{,}8$ (au dixième) et $23 \\div 6 \\approx 3{,}83$ (au centième).",
      figure: "d6-cours-arrondi",
      exemple: {
        enonce: "On partage $100$ € entre $3$ personnes. Combien reçoit chacune, au centime près ?",
        solution: "$100 \\div 3 = 33{,}333\\ldots$ Le chiffre des millièmes est $3$ : on garde $33{,}33$.\n\nChacune reçoit environ $33{,}33$ € (et il reste $1$ centime)."
      }
    },
    {
      titre: "Les unités de durée",
      video: { titre: "Vidéo d'Yvan Monka : convertir les unités de temps", youtube: "https://youtu.be/ZV7VG7NzDwE" },
      texte:
        "- $1$ h $= 60$ min ; $1$ min $= 60$ s ; donc $1$ h $= 3\\,600$ s.\n" +
        "- $1$ jour $= 24$ h ; $1$ semaine $= 7$ jours ; $1$ année $= 365$ jours, ou $366$ si elle est **bissextile**.\n" +
        "- $1$ siècle $= 100$ ans ; $1$ millénaire $= 1\\,000$ ans.\n" +
        "- Une demi-heure $= 30$ min ; un quart d'heure $= 15$ min ; trois quarts d'heure $= 45$ min.\n\n" +
        "Les durées se comptent par **soixante**, pas par dix : $1{,}5$ h $= 1$ h $30$ min, et non $1$ h $50$ min. Pour passer des heures décimales aux minutes, on multiplie par $60$.\n\n" +
        "Sur une horloge, la **petite** aiguille indique les heures et la **grande** les minutes (chaque chiffre vaut $5$ min). La figure indique $10$ h $15$ le matin, ou $22$ h $15$ le soir.\n\n" +
        "Le savais-tu ? Compter par $60$ vient des Babyloniens, il y a environ $4\\,000$ ans.",
      figure: "d6-cours-horloge",
      exemple: {
        enonce: "Convertis $20\\,543$ s en heures, minutes et secondes, puis $2{,}25$ h en heures et minutes.",
        solution: "$20\\,543 = 60 \\times 342 + 23$ : $342$ min et $23$ s. Puis $342 = 60 \\times 5 + 42$ : $5$ h $42$ min. Donc $20\\,543$ s $= 5$ h $42$ min $23$ s.\n\n$0{,}25 \\times 60 = 15$ : $2{,}25$ h $= 2$ h $15$ min."
      }
    },
    {
      titre: "Calculer avec des horaires et des durées",
      video: { titre: "Vidéo d'Yvan Monka : utiliser les durées", youtube: "https://youtu.be/x6WHxJUI1kE" },
      texte:
        "Un **horaire** dit à quel moment se passe quelque chose ($14$ h $35$) ; une **durée** dit combien de temps ça dure ($1$ h $50$ min).\n\n" +
        "- **Ajouter** une durée : on ajoute les heures, puis les minutes. Si les minutes dépassent $60$, on transforme $60$ min en $1$ h.\n" +
        "- **Durée entre deux horaires** : on avance par étapes, jusqu'à l'heure pile, puis les heures entières, puis les minutes restantes.\n\n" +
        "Attention : on ne calcule pas avec les horaires comme avec des nombres décimaux.\n\n" +
        "Une **frise** aide à compter les étapes : celle-ci correspond à la traversée de la barge de l'exemple.",
      figure: "d6-cours-frise",
      exemple: {
        enonce: "Calcule $2$ h $35$ min $+ 3$ h $48$ min. Puis : la barge part à $7$ h $45$ et arrive à $8$ h $05$, combien de temps dure la traversée ?",
        solution: "$2$ h $35$ min $+ 3$ h $48$ min $= 5$ h $83$ min $= 5$ h $+ 1$ h $23$ min $= 6$ h $23$ min.\n\nDe $7$ h $45$ à $8$ h $00$ : $15$ min ; de $8$ h $00$ à $8$ h $05$ : $5$ min. La traversée dure $20$ min."
      }
    }
  ],

  videosNote: "Méthodes et exercices corrigés par Yvan Monka (maths-et-tiques).",
  videos: [
    { titre: "Vérifier si un nombre est divisible par 2", type: "Divisibilité", youtube: "https://youtu.be/tviMPAlA-JM" },
    { titre: "Résoudre un problème avec la division euclidienne (2)", type: "Problème", youtube: "https://youtu.be/9Fu2CAnMeLY" },
    { titre: "Poser une division décimale (2)", type: "Division décimale", youtube: "https://youtu.be/kagPFHfG-ZU" },
    { titre: "Convertir les unités de temps", type: "Durées", youtube: "https://youtu.be/dgIkLTCEQww" },
    { titre: "Convertir « s » en « h-min-s »", type: "Durées", youtube: "https://youtu.be/5xtJtMGEQT8" }
  ],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "d6-multiples", titre: "Multiples, diviseurs, divisibilité par 2, 5 et 10", etape: "Multiples et division euclidienne", nb: 6 },
    { type: "d6-euclide", titre: "Quotient et reste d'une division euclidienne", etape: "Multiples et division euclidienne", nb: 6 },
    { type: "d6-euclide-pb", titre: "Problèmes : partager, grouper, interpréter le reste", etape: "Multiples et division euclidienne", nb: 5 },
    { type: "d6-division", titre: "Diviser un décimal par un entier", etape: "Division décimale", nb: 6 },
    { type: "d6-arrondi-div", titre: "Valeur arrondie d'un quotient", etape: "Division décimale", nb: 5 },
    { type: "d6-division-pb", titre: "Problèmes de partage avec des décimaux", etape: "Division décimale", nb: 5 },
    { type: "d6-conv-duree", titre: "Convertir des durées", etape: "Durées", nb: 6 },
    { type: "d6-horaires", titre: "Horaires et durées", etape: "Durées", nb: 6 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Comme $56 = 8 \\times 7$, on peut dire que :", choix: ["$56$ est un multiple de $8$", "$8$ est un multiple de $56$", "$56$ est un diviseur de $7$", "$7$ est divisible par $56$"], bonne: 0, explication: "$56$ est dans la table de $8$ : c'est un multiple de $8$, et $8$ est un diviseur de $56$." },
    { question: "Lequel de ces nombres est un multiple de $9$ ?", choix: ["$108$", "$98$", "$119$", "$190$"], bonne: 0, explication: "$108 = 9 \\times 12$. Les autres ne sont pas dans la table de $9$." },
    { question: "Lequel de ces nombres n'est pas un diviseur de $24$ ?", choix: ["$5$", "$3$", "$8$", "$12$"], bonne: 0, explication: "$24 = 5 \\times 4 + 4$ : le reste n'est pas nul. $24 = 3 \\times 8 = 2 \\times 12$." },
    { question: "Lequel de ces nombres est divisible par $5$ ?", choix: ["$1\\,235$", "$1\\,253$", "$5\\,321$", "$3\\,512$"], bonne: 0, explication: "Un nombre est divisible par $5$ si son chiffre des unités est $0$ ou $5$." },
    { question: "Lequel de ces nombres est divisible par $2$ ?", choix: ["$4\\,078$", "$2\\,467$", "$8\\,881$", "$6\\,445$"], bonne: 0, explication: "Son chiffre des unités, $8$, est pair." },
    { question: "Dans la division euclidienne de $73$ par $3$, le quotient est :", choix: ["$24$", "$1$", "$25$", "$23$"], bonne: 0, explication: "$73 = 3 \\times 24 + 1$ : le quotient est $24$ et le reste $1$." },
    { question: "Quelle égalité traduit la division euclidienne de $50$ par $7$ ?", choix: ["$50 = 7 \\times 7 + 1$", "$50 = 7 \\times 6 + 8$", "$50 = 7 \\times 8 - 6$", "$7 = 50 \\times 7 + 1$"], bonne: 0, explication: "Le reste doit être plus petit que le diviseur : $1 < 7$. Avec $8$, le reste serait trop grand." },
    { question: "Dans une division euclidienne par $12$, le reste peut être :", choix: ["$11$", "$12$", "$15$", "$20$"], bonne: 0, explication: "Le reste est toujours plus petit que le diviseur : de $0$ à $11$." },
    { question: "$236$ élèves partent dans des cars de $55$ places. Il faut :", choix: ["$5$ cars", "$4$ cars", "$16$ cars", "$6$ cars"], bonne: 0, explication: "$236 = 55 \\times 4 + 16$ : il faut un car de plus pour les $16$ élèves restants." },
    { question: "On range $100$ œufs dans des boîtes de $6$. On obtient :", choix: ["$16$ boîtes pleines et $4$ œufs de reste", "$17$ boîtes pleines", "$16$ boîtes pleines et $6$ œufs de reste", "$4$ boîtes pleines et $16$ œufs de reste"], bonne: 0, explication: "$100 = 6 \\times 16 + 4$." },
    { question: "$32{,}12 \\div 4 = $", choix: ["$8{,}03$", "$8{,}3$", "$80{,}3$", "$8{,}003$"], bonne: 0, explication: "$4 \\times 8{,}03 = 32{,}12$. Dans $1$ dixième, il y a $0$ fois $4$ : on écrit $0$ au quotient." },
    { question: "$45 \\div 8 = $", choix: ["$5{,}625$", "$5{,}5$", "$5$ reste $5$", "$56{,}25$"], bonne: 0, explication: "On ajoute des zéros après la virgule : $45{,}000 \\div 8 = 5{,}625$. « $5$ reste $5$ » est la division euclidienne." },
    { question: "$7{,}5 \\div 3 = $", choix: ["$2{,}5$", "$25$", "$0{,}25$", "$2{,}05$"], bonne: 0, explication: "$3 \\times 2{,}5 = 7{,}5$." },
    { question: "La valeur arrondie au dixième de $23 \\div 6$ est :", choix: ["$3{,}8$", "$3{,}9$", "$3{,}83$", "$4$"], bonne: 0, explication: "$23 \\div 6 = 3{,}83\\ldots$ Le chiffre des centièmes est $3$ : on garde $3{,}8$." },
    { question: "$10 \\div 3$ est :", choix: ["un nombre qui n'est pas décimal", "égal à $3{,}3$", "égal à $3{,}33$", "égal à $3$ reste $1$, donc $3{,}1$"], bonne: 0, explication: "$10 \\div 3 = 3{,}333\\ldots$ : la division ne s'arrête jamais. $3{,}3$ et $3{,}33$ sont des valeurs approchées." },
    { question: "$6$ cahiers coûtent $9{,}30$ €. Un cahier coûte :", choix: ["$1{,}55$ €", "$1{,}50$ €", "$55{,}80$ €", "$3{,}30$ €"], bonne: 0, explication: "$9{,}30 \\div 6 = 1{,}55$ €. Vérification : $6 \\times 1{,}55 = 9{,}30$." },
    { question: "$1$ h $= $", choix: ["$60$ min", "$100$ min", "$3\\,600$ min", "$24$ min"], bonne: 0, explication: "$1$ h $= 60$ min $= 3\\,600$ s." },
    { question: "$2$ h $15$ min $= $", choix: ["$135$ min", "$215$ min", "$2{,}15$ h", "$115$ min"], bonne: 0, explication: "$2 \\times 60 + 15 = 135$ min. Et $2$ h $15$ min $= 2{,}25$ h, pas $2{,}15$ h." },
    { question: "$1{,}5$ h $= $", choix: ["$1$ h $30$ min", "$1$ h $50$ min", "$1$ h $5$ min", "$150$ min"], bonne: 0, explication: "$0{,}5$ h, c'est une demi-heure : $30$ min." },
    { question: "$200$ min $= $", choix: ["$3$ h $20$ min", "$2$ h $00$ min", "$3$ h $33$ min", "$2$ h $20$ min"], bonne: 0, explication: "$200 = 60 \\times 3 + 20$ : $3$ h $20$ min." },
    { question: "Trois quarts d'heure, c'est :", choix: ["$45$ min", "$34$ min", "$75$ min", "$30$ min"], bonne: 0, explication: "Un quart d'heure $= 15$ min, donc $3 \\times 15 = 45$ min." },
    { question: "Une année bissextile compte :", choix: ["$366$ jours", "$365$ jours", "$360$ jours", "$364$ jours"], bonne: 0, explication: "Le $29$ février est ajouté : $366$ jours." },
    { question: "$2$ h $35$ min $+ 3$ h $48$ min $= $", choix: ["$6$ h $23$ min", "$5$ h $83$ min", "$6$ h $83$ min", "$5$ h $23$ min"], bonne: 0, explication: "$5$ h $83$ min, et $83$ min $= 1$ h $23$ min : $6$ h $23$ min." },
    { question: "La barge part à $7$ h $45$ et arrive à $8$ h $05$. La traversée dure :", choix: ["$20$ min", "$40$ min", "$60$ min", "$1$ h $20$ min"], bonne: 0, explication: "$15$ min jusqu'à $8$ h, puis $5$ min : $20$ min. ($8{,}05 - 7{,}45 = 0{,}60$ est un piège : on ne soustrait pas des horaires comme des décimaux.)" },
    { question: "Un film commence à $20$ h $40$ et dure $1$ h $50$ min. Il se termine à :", choix: ["$22$ h $30$", "$21$ h $90$", "$22$ h $90$", "$21$ h $30$"], bonne: 0, explication: "$20$ h $40 + 1$ h $50$ min $= 21$ h $90$ min $= 22$ h $30$." },
    { question: "Combien d'années dans $3$ siècles ?", choix: ["$300$", "$30$", "$3\\,000$", "$100$"], bonne: 0, explication: "$1$ siècle $= 100$ ans, donc $3$ siècles $= 300$ ans." },
    { question: "Les horloges indiquent le départ et l'arrivée d'un taxi-brousse, le matin. Combien de temps dure le trajet ?", figure: "d6-qcm-horloges", choix: ["$20$ min", "$40$ min", "$1$ h $20$ min", "$60$ min"], bonne: 0, explication: "Départ $7$ h $45$, arrivée $8$ h $05$ : $15$ min jusqu'à $8$ h, puis $5$ min, soit $20$ min." },
    { question: "Quelle heure indique cette horloge l'après-midi ?", figure: "d6-qcm-horloge", choix: ["$16$ h $40$", "$4$ h $40$", "$20$ h $20$", "$17$ h $40$"], bonne: 0, explication: "La petite aiguille est entre $4$ et $5$ : $4$ h passées ; la grande est sur le $8$ : $40$ min. L'après-midi : $4 + 12 = 16$, donc $16$ h $40$." },
    { question: "Dans cette division posée, quel est le reste ?", figure: "d6-qcm-potence", choix: ["$4$", "$22$", "$7$", "$3$"], bonne: 0, explication: "$158 = 7 \\times 22 + 4$ : le quotient est $22$ et le reste est $4$, plus petit que $7$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Savoir si un nombre est un multiple (ou un diviseur)",
      etapes: [
        "Pour $2$, $5$ ou $10$ : regarde le chiffre des unités.",
        "Sinon, fais la division euclidienne.",
        "Reste nul : c'est un multiple ; sinon, ce n'en est pas un."
      ],
      exemple: "$134 = 12 \\times 11 + 2$ : $134$ n'est pas un multiple de $12$."
    },
    {
      titre: "Effectuer une division euclidienne",
      etapes: [
        "Cherche combien de fois le diviseur va dans le dividende (encadre avec les tables).",
        "Calcule le reste : dividende $-$ diviseur $\\times$ quotient.",
        "Vérifie que le reste est plus petit que le diviseur, et écris l'égalité."
      ],
      exemple: "$73 = 3 \\times 24 + 1$, avec $1 < 3$.",
      figure: "d6-cours-potence"
    },
    {
      titre: "Résoudre un problème de division",
      etapes: [
        "Partage ou groupement ? Repère le nombre qui joue le rôle de diviseur.",
        "Fais la division.",
        "Lis bien la question pour interpréter le reste (un car de plus ? des objets en trop ?)."
      ],
      exemple: "$236$ élèves, cars de $55$ : $236 = 55 \\times 4 + 16$, donc $5$ cars.",
      figure: "d6-cours-cars"
    },
    {
      titre: "Diviser un décimal par un entier",
      etapes: [
        "Pose la division comme une division euclidienne.",
        "Écris la virgule au quotient quand tu franchis la virgule du dividende.",
        "Ajoute des zéros si besoin, puis vérifie en multipliant."
      ],
      exemple: "$14{,}7 \\div 3 = 4{,}9$ car $3 \\times 4{,}9 = 14{,}7$.",
      figure: "d6-methode-decimale"
    },
    {
      titre: "Convertir des durées",
      etapes: [
        "$1$ h $= 60$ min et $1$ min $= 60$ s : on multiplie par $60$ pour passer à l'unité plus petite.",
        "Pour passer des minutes aux heures, fais la division euclidienne par $60$.",
        "Heures décimales : multiplie la partie décimale par $60$ ($0{,}5$ h $= 30$ min)."
      ],
      exemple: "$200$ min $= 3$ h $20$ min ; $2{,}25$ h $= 2$ h $15$ min."
    },
    {
      titre: "Calculer une durée entre deux horaires",
      etapes: [
        "Avance jusqu'à l'heure pile suivante.",
        "Ajoute les heures entières.",
        "Ajoute les minutes restantes, puis additionne toutes les étapes."
      ],
      exemple: "De $13$ h $40$ à $15$ h $10$ : $20$ min $+ 1$ h $+ 10$ min $= 1$ h $30$ min.",
      figure: "d6-methode-frise"
    }
  ],
  erreurs: [
    "Trouver un reste plus grand que le diviseur : on peut encore mettre une fois le diviseur.",
    "Oublier d'interpréter le reste : pour $236$ élèves et des cars de $55$, il faut $5$ cars, pas $4$.",
    "Oublier la virgule au quotient ou le $0$ : $32{,}12 \\div 4 = 8{,}03$, pas $8{,}3$.",
    "S'arrêter au reste dans une division décimale : $45 \\div 8 = 5{,}625$.",
    "Écrire $10 \\div 3 = 3{,}3$ : c'est seulement une valeur approchée.",
    "Croire qu'une heure fait $100$ minutes : $1{,}5$ h $= 1$ h $30$ min, pas $1$ h $50$ min.",
    "Écrire « $5$ h $83$ min » : $83$ min $= 1$ h $23$ min, donc $6$ h $23$ min.",
    "Soustraire des horaires comme des décimaux : de $7$ h $45$ à $8$ h $05$, il y a $20$ min."
  ]
};
