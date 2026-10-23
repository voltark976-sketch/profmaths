/*
  CHAPITRE : 6e — Nombres entiers et décimaux
  --------------------------------------------
  Programme de mathématiques du cycle 3 (BO n° 16 du 17 avril 2025), en vigueur en 6e depuis la rentrée 2025 :
  « Les nombres entiers et décimaux » (numération, milliard, écritures d'un décimal, demi-droite graduée,
  comparer, ranger, encadrer, intercaler, arrondir, multiplier et diviser par 10, 100, 1 000 et par 0,1 ; 0,01 ; 0,001).
  Les pourcentages, les nombres mixtes et les opérations sont dans les chapitres suivants.
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce). Dans les formules, la virgule décimale s'écrit {,} : $0{,}35$,
  et l'espace entre les classes \\, : $3\\,205\\,040$.
  Pas encore de vidéo de la chaîne pour ce chapitre : les vidéos et les PDF sont ceux d'Yvan Monka (maths-et-tiques).
  figure : "n6-demi-droite" ou "n6-arrondi" (assets/exercices-college.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["sixieme-nombres"] = {
  niveau: "6e",
  numero: 1,
  titre: "Nombres entiers et décimaux",
  accroche: "Lire et écrire les grands nombres, comprendre la virgule, placer, comparer et arrondir les nombres décimaux.",

  playlist: "", // lien de la playlist YouTube du chapitre (quand elle existera)
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka, partie 1 : entiers et fractions décimales (PDF)", url: "https://www.maths-et-tiques.fr/telech/25Nombres1.pdf" },
    { titre: "Cours d'Yvan Monka, partie 2 : demi-droite, comparer, arrondir (PDF)", url: "https://www.maths-et-tiques.fr/telech/25Nombres2.pdf" }
  ],
  liens: [
    { titre: "Tout le cours en vidéo (Yvan Monka)", url: "https://youtu.be/LOp-LK2XQ5A", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Chiffres et rangs dans un nombre entier",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître le rang des chiffres dans un nombre entier", youtube: "https://youtu.be/NYD4iynRWMA" },
      texte:
        "On écrit tous les nombres avec dix **chiffres** : $0$, $1$, $2$, $3$, $4$, $5$, $6$, $7$, $8$, $9$.\n\n" +
        "La valeur d'un chiffre dépend de sa **place** (son **rang**) dans le nombre. Dans $1\\,522$, le $1$ vaut $1\\,000$ et le $5$ vaut $500$ : c'est la **numération de position**.\n\n" +
        "On regroupe les chiffres par **classes** de trois, en partant de la droite : unités, mille, millions, milliards. Dans chaque classe, on trouve les unités, les dizaines et les centaines.\n\n" +
        "On laisse un petit espace entre deux classes : on écrit $1\\,252\\,342\\,532$ et pas $1252342532$.\n\n" +
        "Le **tableau de numération** range chaque chiffre à son rang (u : unités, d : dizaines, c : centaines). La figure montre le nombre de l'exemple ; les colonnes coloriées sont les dizaines de mille et les centaines de millions.",
      figure: "n6-cours-tableau",
      exemple: {
        enonce: "Dans $3\\,205\\,040\\,017$, quel est le chiffre des dizaines de mille ? Et celui des centaines de millions ?",
        solution: "On range le nombre dans le tableau, classe par classe.\n\nChiffre des dizaines de mille : $4$. Chiffre des centaines de millions : $2$.",
        tableau: { lignes: [["\\text{Classe}", "\\text{Chiffres}"], ["\\text{milliards}", "3"], ["\\text{millions}", "205"], ["\\text{mille}", "040"], ["\\text{unités}", "017"]] }
      }
    },
    {
      titre: "Lire et écrire les grands nombres",
      video: { titre: "Vidéo d'Yvan Monka : lire et écrire les grands nombres", youtube: "https://youtu.be/1m7mBRT3eAc" },
      texte:
        "- $1$ million $= 1\\,000\\,000$ (mille milliers).\n" +
        "- $1$ **milliard** $= 1\\,000\\,000\\,000$ (mille millions).\n\n" +
        "Pour **lire** un grand nombre, on lit chaque classe comme un nombre de $0$ à $999$, suivie du nom de la classe. Une classe $000$ ne se lit pas.\n\n" +
        "Pour **écrire** en lettres, on met des traits d'union entre les mots-nombres (orthographe recommandée) : « deux-cent-cinq ». « Million » et « milliard » sont des noms : ils prennent un « s » au pluriel et restent séparés par des espaces.\n\n" +
        "Pour écrire en chiffres, chaque classe prend **trois chiffres** : « trois millions quarante-mille » s'écrit $3\\,040\\,000$.",
      exemple: {
        enonce: "La Terre compte environ huit milliards d'habitants, et le Soleil est à environ $149\\,600\\,000$ km de la Terre. Écris le premier nombre en chiffres et le second en lettres.",
        solution: "Huit milliards : $8\\,000\\,000\\,000$ (on complète les classes des millions, des mille et des unités par $000$).\n\n$149\\,600\\,000$ : « cent-quarante-neuf millions six-cent-mille »."
      }
    },
    {
      titre: "Décomposer un nombre, compter les dizaines",
      video: { titre: "Vidéo d'Yvan Monka : décomposer un nombre entier suivant ses rangs", youtube: "https://youtu.be/14XxGsJKniI" },
      texte:
        "Chaque rang vaut **dix fois** le rang à sa droite :\n\n" +
        "- $1$ millier $= 10$ centaines $= 100$ dizaines $= 1\\,000$ unités ;\n" +
        "- $1$ unité $= 10$ dixièmes $= 100$ centièmes $= 1\\,000$ millièmes.\n\n" +
        "On peut **décomposer** un nombre suivant ses rangs : $5\\,239 = (5 \\times 1\\,000) + (2 \\times 100) + (3 \\times 10) + (9 \\times 1)$.\n\n" +
        "Attention : le **chiffre** des centaines et le **nombre** de centaines sont différents. Dans $7\\,524$, le chiffre des centaines est $5$, mais il y a $75$ centaines en tout (on garde tout jusqu'au rang des centaines).\n\n" +
        "Sur la figure, les colonnes coloriées vont jusqu'au rang des dizaines : $7\\,524$ contient $752$ dizaines.",
      figure: "n6-cours-combien",
      exemple: {
        enonce: "Combien y a-t-il de dizaines dans $7\\,524$ ? Décompose $184\\,030$ suivant ses rangs.",
        solution: "On garde tout jusqu'au chiffre des dizaines : $7\\,524$ contient $752$ dizaines.\n\n$184\\,030 = (1 \\times 100\\,000) + (8 \\times 10\\,000) + (4 \\times 1\\,000) + (3 \\times 10)$."
      }
    },
    {
      titre: "Les nombres décimaux",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître le rang des chiffres", youtube: "https://youtu.be/icGHAYyXaE4" },
      texte:
        "Un nombre **décimal** s'écrit avec une virgule : $52{,}493$.\n\n" +
        "- $52$ est sa **partie entière** ; $0{,}493$ est sa **partie décimale** ; $52{,}493 = 52 + 0{,}493$.\n" +
        "- La virgule se place juste après le chiffre des **unités**. Après la virgule viennent les **dixièmes**, les **centièmes**, puis les **millièmes**.\n\n" +
        "Un nombre décimal s'écrit de plusieurs façons : $2{,}45 = 2{,}450 = 02{,}45$. Ces zéros sont **inutiles**. Mais le zéro de $5{,}08$ est indispensable : $5{,}08 \\neq 5{,}8$.\n\n" +
        "Un entier est aussi un décimal : $7 = 7{,}0$.\n\n" +
        "Dans le tableau, la virgule est le trait épais après la colonne des unités ; « dix. », « cent. », « mill. » désignent les dixièmes, centièmes et millièmes. La colonne coloriée est celle des dixièmes de $41\\,876{,}74$.",
      figure: "n6-cours-tableau-dec",
      exemple: {
        enonce: "Dans $41\\,876{,}74$, quel est le chiffre des dixièmes ? Combien y a-t-il de centièmes dans $52{,}493$ ?",
        solution: "Le chiffre des dixièmes est le premier après la virgule : $7$.\n\nOn garde tout jusqu'au chiffre des centièmes : $52{,}493$ contient $5\\,249$ centièmes."
      }
    },
    {
      titre: "Fractions décimales et écriture à virgule",
      video: { titre: "Vidéo d'Yvan Monka : passer de la fraction décimale à l'écriture décimale", youtube: "https://youtu.be/i75HKdds3Gc" },
      texte:
        "Une **fraction décimale** a pour dénominateur $10$, $100$, $1\\,000$… :\n\n" +
        "- $\\dfrac{1}{10} = 0{,}1$ (un dixième) ; $\\dfrac{1}{100} = 0{,}01$ (un centième) ; $\\dfrac{1}{1\\,000} = 0{,}001$ (un millième).\n" +
        "- $\\dfrac{1}{10} = \\dfrac{10}{100} = \\dfrac{100}{1\\,000}$ et $\\dfrac{1}{100} = \\dfrac{10}{1\\,000}$.\n\n" +
        "Un même nombre a plusieurs écritures : $\\dfrac{4\\,107}{1\\,000} = 4 + \\dfrac{107}{1\\,000} = 4 + \\dfrac{1}{10} + \\dfrac{7}{1\\,000} = 4{,}107$.\n\n" +
        "Dans le tableau de la figure, on lit $4$ unités, $1$ dixième, $0$ centième et $7$ millièmes : $4{,}107$.\n\n" +
        "Le savais-tu ? Le Flamand Simon Stevin a popularisé les nombres décimaux en 1585, pour simplifier les calculs avec les fractions.",
      figure: "n6-cours-fraction",
      exemple: {
        enonce: "Écris $\\dfrac{56}{10}$ et $\\dfrac{49}{100}$ avec une virgule. Écris $45{,}67$ sous forme de fraction décimale.",
        solution: "$\\dfrac{56}{10} = 5{,}6$ (le $6$ est au rang des dixièmes) et $\\dfrac{49}{100} = 0{,}49$ (le $9$ est au rang des centièmes).\n\n$45{,}67$, ce sont $4\\,567$ centièmes : $45{,}67 = \\dfrac{4\\,567}{100}$."
      }
    },
    {
      titre: "Multiplier et diviser par 10, 100, 1 000",
      video: { titre: "Vidéo d'Yvan Monka : multiplier par 10, 100 ou 1 000", youtube: "https://youtu.be/pPnCPmWGqyo" },
      texte:
        "- **Multiplier** par $10$, $100$ ou $1\\,000$ : chaque chiffre **monte** de $1$, $2$ ou $3$ rangs. Le nombre devient plus grand.\n" +
        "- **Diviser** par $10$, $100$ ou $1\\,000$ : chaque chiffre **descend** de $1$, $2$ ou $3$ rangs. Le nombre devient plus petit.\n" +
        "- Multiplier par $0{,}1$, c'est diviser par $10$. Multiplier par $0{,}01$, c'est diviser par $100$. Multiplier par $0{,}001$, c'est diviser par $1\\,000$.\n\n" +
        "On complète les rangs vides par des zéros. Attention : écrire un zéro à droite de $2{,}5$ ne le multiplie pas par $10$, car $2{,}50 = 2{,}5$.\n\n" +
        "Dans le tableau, $3{,}47 \\times 100 = 347$ : chaque chiffre a monté de deux colonnes.",
      figure: "n6-cours-x10",
      exemple: {
        enonce: "Calcule $3{,}47 \\times 100$ ; $25 \\div 1\\,000$ ; $8{,}6 \\times 0{,}1$.",
        solution: "$3{,}47 \\times 100 = 347$ (les chiffres montent de $2$ rangs).\n\n$25 \\div 1\\,000 = 0{,}025$ (ils descendent de $3$ rangs : on ajoute des zéros devant).\n\n$8{,}6 \\times 0{,}1 = 8{,}6 \\div 10 = 0{,}86$."
      }
    },
    {
      titre: "La demi-droite graduée",
      video: { titre: "Vidéo d'Yvan Monka : lire sur une demi-droite graduée", youtube: "https://youtu.be/qabaDLOdk4I" },
      texte:
        "Sur une **demi-droite graduée**, les graduations sont régulièrement espacées. Chaque point est repéré par un nombre : son **abscisse**. On note $A(0{,}7)$ : « le point $A$ d'abscisse $0{,}7$ ».\n\n" +
        "Pour lire une abscisse :\n\n" +
        "- on trouve ce que vaut **une graduation** : entre deux nombres écrits, on compte les **intervalles** et on partage l'écart ;\n" +
        "- on part d'un nombre écrit et on avance graduation par graduation.\n\n" +
        "Sur la figure, l'unité est partagée en $10$ : une graduation vaut $0{,}1$.",
      figure: "n6-demi-droite",
      exemple: {
        enonce: "Lis les abscisses des points $A$, $B$ et $C$ sur la figure.",
        solution: "Une graduation vaut $0{,}1$.\n\n$A$ est à $7$ graduations de $0$ : $A(0{,}7)$. $B$ est à $4$ graduations de $1$ : $B(1{,}4)$. $C$ est à $3$ graduations de $2$ : $C(2{,}3)$."
      }
    },
    {
      titre: "Comparer et ranger des nombres décimaux",
      video: { titre: "Vidéo d'Yvan Monka : comparer les nombres décimaux", youtube: "https://youtu.be/fr5GemewG4Q" },
      texte:
        "Pour **comparer** deux nombres décimaux :\n\n" +
        "- on compare d'abord les **parties entières** ;\n" +
        "- si elles sont égales, on écrit les deux nombres avec **autant de chiffres** après la virgule, puis on compare les parties décimales.\n\n" +
        "$<$ se lit « est inférieur à », $>$ se lit « est supérieur à ».\n\n" +
        "Ranger dans l'ordre **croissant**, c'est du plus petit au plus grand (avec $<$) ; dans l'ordre **décroissant**, du plus grand au plus petit (avec $>$).\n\n" +
        "Dans le tableau, on aligne les deux nombres et on complète par un zéro inutile (en couleur) : $8{,}32$ et $8{,}40$.",
      figure: "n6-cours-comparer",
      exemple: {
        enonce: "Compare $8{,}32$ et $8{,}4$. Range dans l'ordre croissant : $3$ ; $2{,}31$ ; $2{,}5$ ; $1{,}9$.",
        solution: "Même partie entière $8$. On écrit $8{,}4 = 8{,}40$, et $32 < 40$ : donc $8{,}32 < 8{,}4$. Un nombre avec plus de chiffres n'est pas forcément plus grand !\n\nOrdre croissant : $1{,}9 < 2{,}31 < 2{,}5 < 3$ (car $2{,}31 < 2{,}50$)."
      }
    },
    {
      titre: "Encadrer, intercaler, arrondir",
      video: { titre: "Vidéo d'Yvan Monka : arrondir un nombre", youtube: "https://youtu.be/KvYvKm70y00" },
      texte:
        "- **Encadrer** $33{,}48$ à l'unité : $33 < 33{,}48 < 34$ (deux entiers consécutifs). Au dixième : $33{,}4 < 33{,}48 < 33{,}5$.\n" +
        "- **Intercaler** un nombre entre $5{,}45$ et $5{,}46$ : on écrit $5{,}450$ et $5{,}460$, puis on choisit par exemple $5{,}456$.\n" +
        "- L'**arrondi** est la valeur de l'encadrement **la plus proche** du nombre. On regarde le chiffre juste après : de $0$ à $4$, on garde le nombre du bas ; de $5$ à $9$, on prend celui du haut.\n\n" +
        "Sur la figure, $33{,}48$ est plus près de $33{,}5$ que de $33{,}4$ : l'arrondi au dixième de $33{,}48$ est $33{,}5$.",
      figure: "n6-arrondi",
      exemple: {
        enonce: "Donne l'arrondi de $12{,}637$ à l'unité, au dixième et au centième.",
        solution: "À l'unité : $12 < 12{,}637 < 13$, le chiffre suivant est $6$ : l'arrondi est $13$.\n\nAu dixième : $12{,}6 < 12{,}637 < 12{,}7$, le chiffre suivant est $3$ : l'arrondi est $12{,}6$.\n\nAu centième : $12{,}63 < 12{,}637 < 12{,}64$, le chiffre suivant est $7$ : l'arrondi est $12{,}64$."
      }
    }
  ],

  /* Exercices corrigés en vidéo (Yvan Monka) */
  videosNote: "Exercices corrigés en vidéo par Yvan Monka (maths-et-tiques). Mets la vidéo sur pause et cherche avant de regarder la correction !",
  videos: [
    { titre: "Passer de la fraction à l'écriture décimale (et inversement)", type: "Fractions décimales", youtube: "https://youtu.be/n_x3EAigoB0" },
    { titre: "Multiplier ou diviser par 10, 100, 1 000…", type: "Calcul mental", youtube: "https://youtu.be/AYVuVQad8-I" },
    { titre: "Placer des nombres sur une droite graduée", type: "Demi-droite graduée", youtube: "https://youtu.be/ZBlkMCSIyMk" }
  ],

  /* ---------- 2. EXERCICES INTERACTIFS ----------
     Chaque série tire des nombres au hasard : on peut la refaire autant qu'on veut.
     type : nom du générateur (voir assets/exercices-college.js). nb : nombre de questions. */
  exercices: [
    { type: "n6-rang", titre: "Le rang d'un chiffre dans un entier", etape: "Nombres entiers", nb: 6 },
    { type: "n6-lire", titre: "Lire, écrire et décomposer les grands nombres", etape: "Nombres entiers", nb: 5 },
    { type: "n6-combien", titre: "Chiffre ou nombre de dizaines ? Unités de numération", etape: "Nombres entiers", nb: 6 },
    { type: "n6-rang-dec", titre: "Rangs, partie entière et partie décimale", etape: "Nombres décimaux", nb: 6 },
    { type: "n6-ecritures", titre: "Fractions décimales et écriture à virgule", etape: "Nombres décimaux", nb: 6 },
    { type: "n6-x10", titre: "Multiplier et diviser par 10, 100, 1 000 ou 0,1", etape: "Nombres décimaux", nb: 6 },
    { type: "n6-abscisse", titre: "Lire une abscisse", etape: "Demi-droite graduée", nb: 5 },
    { type: "n6-placer", titre: "Quel point a cette abscisse ?", etape: "Demi-droite graduée", nb: 5 },
    { type: "n6-comparer", titre: "Comparer deux nombres décimaux", etape: "Comparer et ranger", nb: 6 },
    { type: "n6-ranger", titre: "Ranger dans l'ordre croissant ou décroissant", etape: "Comparer et ranger", nb: 5 },
    { type: "n6-encadrer", titre: "Encadrer et intercaler", etape: "Encadrer et arrondir", nb: 6 },
    { type: "n6-arrondir", titre: "Arrondir à l'unité, au dixième, au centième", etape: "Encadrer et arrondir", nb: 6 }
  ],

  /* ---------- 3. QCM DE RÉVISION ----------
     bonne : numéro de la bonne réponse en partant de 0 (0 = la première). */
  qcm: [
    { question: "Dans $4\\,075\\,312$, quel est le chiffre des dizaines de mille ?", choix: ["$7$", "$0$", "$5$", "$3$"], bonne: 0, explication: "En partant de la droite : $2$ unités, $1$ dizaine, $3$ centaines, $5$ unités de mille, $7$ dizaines de mille." },
    { question: "Combien y a-t-il de centaines dans $7\\,524$ ?", choix: ["$75$", "$5$", "$752$", "$7$"], bonne: 0, explication: "On garde tout jusqu'au chiffre des centaines : $75$ centaines. $5$ est seulement le **chiffre** des centaines." },
    { question: "Comment s'écrit en chiffres « deux milliards trente millions six-mille » ?", choix: ["$2\\,030\\,006\\,000$", "$2\\,306\\,000$", "$2\\,030\\,600\\,000$", "$230\\,006\\,000$"], bonne: 0, explication: "Classe des milliards : $2$ ; des millions : $030$ ; des mille : $006$ ; des unités : $000$. Chaque classe a trois chiffres." },
    { question: "Comment se lit $80\\,200\\,000$ ?", choix: ["Quatre-vingts millions deux-cent-mille", "Huit millions deux-cent-mille", "Quatre-vingts millions deux-mille", "Huit-cent-deux millions"], bonne: 0, explication: "Classe des millions : $80$ ; des mille : $200$ ; des unités : $000$ (ne se lit pas)." },
    { question: "Un milliard, c'est :", choix: ["mille millions", "cent millions", "mille milliers", "dix millions"], bonne: 0, explication: "$1\\,000\\,000\\,000 = 1\\,000 \\times 1\\,000\\,000$. Mille milliers, c'est un million." },
    { question: "$(6 \\times 10\\,000) + (4 \\times 100) + (2 \\times 1)$ est égal à :", choix: ["$60\\,402$", "$642$", "$6\\,402$", "$604\\,020$"], bonne: 0, explication: "$6$ dizaines de mille, $0$ unité de mille, $4$ centaines, $0$ dizaine, $2$ unités : $60\\,402$." },
    { question: "$1$ unité, c'est combien de centièmes ?", choix: ["$100$", "$10$", "$1\\,000$", "$0{,}01$"], bonne: 0, explication: "$1$ unité $= 10$ dixièmes $= 100$ centièmes." },
    { question: "Dans $83{,}562$, quel est le chiffre des centièmes ?", choix: ["$6$", "$5$", "$8$", "$2$"], bonne: 0, explication: "Après la virgule : $5$ dixièmes, $6$ centièmes, $2$ millièmes. Le $8$ est le chiffre des dizaines." },
    { question: "Quelle est la partie décimale de $52{,}493$ ?", choix: ["$0{,}493$", "$493$", "$52$", "$0{,}52$"], bonne: 0, explication: "$52{,}493 = 52 + 0{,}493$ : la partie décimale est plus petite que $1$." },
    { question: "Quelle écriture est égale à $7{,}050$ ?", choix: ["$7{,}05$", "$7{,}5$", "$7{,}005$", "$70{,}5$"], bonne: 0, explication: "Le zéro à droite est inutile ; celui entre la virgule et le $5$ est indispensable." },
    { question: "$\\dfrac{37}{1\\,000}$ s'écrit :", choix: ["$0{,}037$", "$0{,}37$", "$3{,}7$", "$37\\,000$"], bonne: 0, explication: "$37$ millièmes : le $7$ va au rang des millièmes, $0{,}037$." },
    { question: "$4 + \\dfrac{1}{10} + \\dfrac{7}{1\\,000}$ est égal à :", choix: ["$4{,}107$", "$4{,}17$", "$4{,}0107$", "$41{,}07$"], bonne: 0, explication: "$4$ unités, $1$ dixième, $0$ centième et $7$ millièmes : $4{,}107$." },
    { question: "$45{,}67$ est égal à :", choix: ["$\\dfrac{4\\,567}{100}$", "$\\dfrac{4\\,567}{10}$", "$\\dfrac{4\\,567}{1\\,000}$", "$\\dfrac{45}{67}$"], bonne: 0, explication: "$45{,}67$, c'est $4\\,567$ centièmes." },
    { question: "$\\dfrac{1}{10}$ est égal à :", choix: ["$\\dfrac{100}{1\\,000}$", "$\\dfrac{10}{1\\,000}$", "$\\dfrac{1}{100}$", "$10$"], bonne: 0, explication: "$\\dfrac{1}{10} = 0{,}1 = \\dfrac{10}{100} = \\dfrac{100}{1\\,000}$." },
    { question: "$2{,}35 \\times 100 = $", choix: ["$235$", "$2{,}3500$", "$23{,}5$", "$0{,}0235$"], bonne: 0, explication: "Les chiffres montent de deux rangs : $235$. Ajouter des zéros à droite de $2{,}35$ ne change pas sa valeur." },
    { question: "$46 \\div 1\\,000 = $", choix: ["$0{,}046$", "$0{,}46$", "$46\\,000$", "$4{,}6$"], bonne: 0, explication: "Les chiffres descendent de trois rangs : $46 \\div 1\\,000 = 0{,}046$." },
    { question: "Multiplier par $0{,}1$, c'est :", choix: ["diviser par $10$", "multiplier par $10$", "diviser par $100$", "ajouter $0{,}1$"], bonne: 0, explication: "$0{,}1 = \\dfrac{1}{10}$ : multiplier par $0{,}1$, c'est prendre le dixième, donc diviser par $10$. Le résultat est plus petit." },
    { question: "Sur la figure, quelle est l'abscisse du point $B$ ?", figure: "n6-demi-droite", choix: ["$1{,}4$", "$1{,}04$", "$14$", "$0{,}14$"], bonne: 0, explication: "L'unité est partagée en $10$ : une graduation vaut $0{,}1$. $B$ est à $4$ graduations de $1$ : $1{,}4$." },
    { question: "Entre $2$ et $3$, une demi-droite a $5$ intervalles égaux. Que vaut une graduation ?", choix: ["$0{,}2$", "$0{,}5$", "$0{,}1$", "$5$"], bonne: 0, explication: "L'écart $1$ est partagé en $5$ : $1 \\div 5 = 0{,}2$." },
    { question: "Quel nombre est le plus grand ?", choix: ["$3{,}5$", "$3{,}45$", "$3{,}405$", "$3{,}099$"], bonne: 0, explication: "Avec trois chiffres après la virgule : $3{,}500$ ; $3{,}450$ ; $3{,}405$ ; $3{,}099$. Le plus grand est $3{,}5$." },
    { question: "Quelle comparaison est juste ?", choix: ["$8{,}32 < 8{,}4$", "$8{,}32 > 8{,}4$", "$2{,}5 < 2{,}45$", "$0{,}7 < 0{,}69$"], bonne: 0, explication: "$8{,}32 < 8{,}40$. Avoir plus de chiffres après la virgule ne rend pas un nombre plus grand." },
    { question: "L'ordre croissant de $1{,}9$ ; $2{,}31$ ; $2{,}5$ ; $3$ est :", choix: ["$1{,}9 < 2{,}31 < 2{,}5 < 3$", "$1{,}9 < 2{,}5 < 2{,}31 < 3$", "$3 < 2{,}5 < 2{,}31 < 1{,}9$", "$2{,}31 < 2{,}5 < 1{,}9 < 3$"], bonne: 0, explication: "$2{,}31 < 2{,}50$, donc $2{,}31$ vient avant $2{,}5$." },
    { question: "Quel nombre est compris entre $5{,}45$ et $5{,}46$ ?", choix: ["$5{,}456$", "$5{,}406$", "$5{,}5$", "$5{,}461$"], bonne: 0, explication: "$5{,}450 < 5{,}456 < 5{,}460$. Attention : $5{,}406 < 5{,}450$." },
    { question: "L'encadrement de $33{,}48$ par deux entiers consécutifs est :", choix: ["$33 < 33{,}48 < 34$", "$33{,}4 < 33{,}48 < 33{,}5$", "$30 < 33{,}48 < 40$", "$33 < 33{,}48 < 33{,}5$"], bonne: 0, explication: "Deux entiers qui se suivent : $33$ et $34$. $33{,}4 < 33{,}48 < 33{,}5$ est l'encadrement au dixième." },
    { question: "L'arrondi au dixième de $33{,}48$ est :", choix: ["$33{,}5$", "$33{,}4$", "$33$", "$33{,}48$"], bonne: 0, explication: "$33{,}4 < 33{,}48 < 33{,}5$ ; le chiffre suivant est $8$ : on prend le nombre du haut, $33{,}5$." },
    { question: "L'arrondi à l'unité de $12{,}49$ est :", choix: ["$12$", "$13$", "$12{,}5$", "$12{,}4$"], bonne: 0, explication: "$12 < 12{,}49 < 13$ ; le chiffre des dixièmes est $4$ : on garde $12$. On n'arrondit pas en deux étapes." },
    { question: "Quel est le chiffre des centaines de mille du nombre écrit dans ce tableau ?", figure: "n6-qcm-tableau", choix: ["$0$", "$5$", "$6$", "$2$"], bonne: 0, explication: "Le nombre est $6\\,052\\,814$. Dans la classe des mille : $0$ centaine, $5$ dizaines, $2$ unités. Le chiffre des centaines de mille est $0$." },
    { question: "Quel nombre est écrit dans ce tableau ?", figure: "n6-qcm-tableau-dec", choix: ["$30{,}405$", "$3{,}0405$", "$30{,}45$", "$304{,}05$"], bonne: 0, explication: "$3$ dizaines, $0$ unité, puis $4$ dixièmes, $0$ centième et $5$ millièmes : $30{,}405$. Le zéro des centièmes est indispensable." },
    { question: "Quel est l'arrondi au dixième du nombre placé sur cette demi-droite ?", figure: "n6-qcm-arrondi", choix: ["$7{,}3$", "$7{,}2$", "$7{,}26$", "$7$"], bonne: 0, explication: "$7{,}2 < 7{,}26 < 7{,}3$ et le point est après le milieu $7{,}25$ : il est plus près de $7{,}3$." },
    { question: "Un litre d'essence coûte $1{,}957$ €. Le prix arrondi au centième d'euro est :", choix: ["$1{,}96$ €", "$1{,}95$ €", "$2$ €", "$1{,}9$ €"], bonne: 0, explication: "$1{,}95 < 1{,}957 < 1{,}96$ ; le chiffre suivant est $7$ : on prend $1{,}96$ €." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Trouver le chiffre d'un rang",
      etapes: [
        "Repère la virgule (ou la fin du nombre entier) : juste avant, c'est le chiffre des unités.",
        "Avant : unités, dizaines, centaines, puis la classe des mille, des millions, des milliards.",
        "Après la virgule : dixièmes, centièmes, millièmes."
      ],
      exemple: "Dans $41\\,876{,}74$ : chiffre des centaines $8$, chiffre des dixièmes $7$, chiffre des centièmes $4$.",
      figure: "n6-cours-tableau-dec"
    },
    {
      titre: "Écrire un grand nombre en chiffres",
      etapes: [
        "Découpe la phrase en classes : milliards, millions, mille, unités.",
        "Écris chaque classe avec **trois chiffres** (sauf la première).",
        "Une classe absente s'écrit $000$."
      ],
      exemple: "« Trois millions quarante-mille-dix-sept » : $3\\,040\\,017$.",
      figure: "n6-methode-grand"
    },
    {
      titre: "Compter les dizaines, les centaines, les dixièmes…",
      etapes: [
        "Repère le chiffre du rang demandé.",
        "Garde tous les chiffres à sa gauche, et lui-même : c'est le nombre cherché."
      ],
      exemple: "$7\\,524$ contient $75$ centaines ; $52{,}493$ contient $524$ dixièmes.",
      figure: "n6-methode-combien"
    },
    {
      titre: "Passer d'une fraction décimale à l'écriture à virgule",
      etapes: [
        "Sur $10$ : le dernier chiffre va au rang des dixièmes. Sur $100$ : des centièmes. Sur $1\\,000$ : des millièmes.",
        "Ajoute des zéros devant si besoin.",
        "Dans l'autre sens, le numérateur est le nombre écrit sans la virgule."
      ],
      exemple: "$\\dfrac{7}{100} = 0{,}07$ ; $\\dfrac{1\\,234}{10} = 123{,}4$ ; $5{,}08 = \\dfrac{508}{100}$.",
      figure: "n6-methode-fraction"
    },
    {
      titre: "Multiplier ou diviser par 10, 100, 1 000",
      etapes: [
        "Multiplier : le nombre devient plus grand, les chiffres montent de $1$, $2$ ou $3$ rangs.",
        "Diviser, ou multiplier par $0{,}1$ ; $0{,}01$ ; $0{,}001$ : le nombre devient plus petit, les chiffres descendent.",
        "Complète par des zéros si un rang reste vide."
      ],
      exemple: "$0{,}52 \\times 1\\,000 = 520$ ; $3{,}5 \\div 100 = 0{,}035$ ; $64 \\times 0{,}1 = 6{,}4$.",
      figure: "n6-methode-x10"
    },
    {
      titre: "Lire une abscisse sur une demi-droite graduée",
      etapes: [
        "Prends deux nombres écrits et compte les **intervalles** entre eux.",
        "Une graduation vaut : (écart entre les deux nombres) $\\div$ (nombre d'intervalles).",
        "Pars d'un nombre écrit et avance graduation par graduation."
      ],
      exemple: "De $0$ à $1$ en $5$ intervalles : une graduation vaut $0{,}2$. Trois graduations après $1$ : $1{,}6$."
    },
    {
      titre: "Comparer deux nombres décimaux",
      etapes: [
        "Compare les parties entières.",
        "Si elles sont égales, écris les nombres avec autant de chiffres après la virgule.",
        "Compare les parties décimales comme des entiers."
      ],
      exemple: "$2{,}5$ et $2{,}45$ : $2{,}50 > 2{,}45$, donc $2{,}5 > 2{,}45$.",
      figure: "n6-methode-comparer"
    },
    {
      titre: "Arrondir un nombre",
      etapes: [
        "Encadre le nombre à la précision demandée (unité, dixième, centième).",
        "Regarde le chiffre juste après.",
        "De $0$ à $4$ : garde le nombre du bas. De $5$ à $9$ : prends celui du haut."
      ],
      exemple: "$12{,}637$ au centième : $12{,}63 < 12{,}637 < 12{,}64$, chiffre suivant $7$, arrondi $12{,}64$."
    }
  ],
  erreurs: [
    "Confondre le **chiffre** des centaines ($5$ dans $7\\,524$) et le **nombre** de centaines ($75$).",
    "Oublier les zéros d'une classe : « deux millions trente-mille » s'écrit $2\\,030\\,000$, pas $230\\,000$.",
    "Confondre dizaines (avant la virgule) et dixièmes (après la virgule).",
    "Croire que $\\dfrac{7}{100} = 0{,}7$ : c'est $0{,}07$ (sept centièmes).",
    "« Multiplier par $10$, c'est ajouter un zéro » : faux pour $2{,}5$, car $2{,}50 = 2{,}5$. On décale les chiffres : $25$.",
    "Croire qu'une graduation vaut toujours $0{,}1$ : il faut compter les intervalles.",
    "Penser que $2{,}45 > 2{,}5$ parce que $45 > 5$ : on compare $2{,}45$ et $2{,}50$.",
    "Arrondir en coupant simplement : l'arrondi au dixième de $33{,}48$ est $33{,}5$, pas $33{,}4$."
  ]
};
