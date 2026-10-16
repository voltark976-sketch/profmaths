/*
  CHAPITRE : 6e — Addition, soustraction et multiplication des décimaux
  ----------------------------------------------------------------------
  Programme de mathématiques du cycle 3 (BO n° 16 du 17 avril 2025), en vigueur en 6e depuis la rentrée 2025 :
  additionner et soustraire des décimaux, comprendre le sens de la multiplication de deux décimaux (aire d'un rectangle),
  calculer le produit de deux décimaux (se ramener à un produit d'entiers, place de la virgule), contrôler avec un ordre
  de grandeur, résoudre des problèmes. Calculs en ligne avec parenthèses (acquis du CM2, entretenus).
  Les priorités opératoires sans parenthèses sont au programme de cycle 4 : elles ne sont pas dans ce chapitre.
  Mêmes règles d'écriture que data/sixieme/nombres-entiers-decimaux.js.
  figure : "o6-quadrillage" (assets/exercices-college.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["sixieme-operations"] = {
  niveau: "6e",
  numero: 2,
  titre: "Addition, soustraction et multiplication des décimaux",
  accroche: "Poser et calculer avec des nombres décimaux, calculer astucieusement, comprendre la multiplication de deux décimaux et contrôler avec un ordre de grandeur.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : addition, soustraction, multiplication (PDF)", url: "https://www.maths-et-tiques.fr/telech/25Operations.pdf" }
  ],
  liens: [
    { titre: "Tout le cours en vidéo (Yvan Monka)", url: "https://youtu.be/UyOard2MfNU", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Le vocabulaire des opérations",
      video: { titre: "Vidéo d'Yvan Monka : utiliser le vocabulaire sur les opérations", youtube: "https://youtu.be/tIqzLiwmeOg" },
      texte:
        "- Dans une **addition**, on ajoute des **termes** ; le résultat est la **somme**.\n" +
        "- Dans une **soustraction**, le résultat est la **différence**.\n" +
        "- Dans une **multiplication**, on multiplie des **facteurs** ; le résultat est le **produit**.\n\n" +
        "On dit « la somme de $7$ et de $9$ » ($7 + 9$), « la différence de $11$ et de $3$ » ($11 - 3$), « le produit de $4$ par $10$ » ($4 \\times 10$).\n\n" +
        "Le mot « facteur » vient du latin « factor » : « celui qui fait ».",
      exemple: {
        enonce: "Dans $844{,}7 \\times 3{,}68 = 3\\,108{,}496$, comment s'appellent $844{,}7$ et $3{,}68$ ? Et $3\\,108{,}496$ ?",
        solution: "$844{,}7$ et $3{,}68$ sont les **facteurs** ; $3\\,108{,}496$ est le **produit**."
      }
    },
    {
      titre: "Additionner et soustraire des décimaux",
      video: { titre: "Vidéo d'Yvan Monka : poser une addition", youtube: "https://youtu.be/ytLe8aUq2ZM" },
      texte:
        "Pour poser une addition ou une soustraction de nombres décimaux :\n\n" +
        "- on écrit les nombres l'un sous l'autre, **virgule sous virgule** (unités sous unités, dixièmes sous dixièmes…) ;\n" +
        "- on complète par des **zéros inutiles** pour avoir autant de chiffres après la virgule ;\n" +
        "- on calcule de droite à gauche, comme avec des entiers, et on place la virgule du résultat sous les autres.\n\n" +
        "Attention : $36{,}3 + 43{,}96$ n'est pas $47{,}59$. Il faut aligner les virgules, pas les derniers chiffres.",
      exemple: {
        enonce: "Pose et calcule $36{,}3 + 43{,}96$ et $29{,}13 - 12{,}6$.",
        solution: "$\\begin{array}{r} 36{,}30 \\\\ +\\ 43{,}96 \\\\ \\hline 80{,}26 \\end{array}$ et $\\begin{array}{r} 29{,}13 \\\\ -\\ 12{,}60 \\\\ \\hline 16{,}53 \\end{array}$\n\nDonc $36{,}3 + 43{,}96 = 80{,}26$ et $29{,}13 - 12{,}6 = 16{,}53$."
      }
    },
    {
      titre: "Calculer en ligne : de gauche à droite, parenthèses",
      video: { titre: "Vidéo d'Yvan Monka : effectuer des calculs avec des parenthèses", youtube: "https://youtu.be/LN-SKmgrt-w" },
      texte:
        "- S'il n'y a que des **additions** et des **soustractions**, on calcule **de gauche à droite** : $25 + 6 - 5 = 31 - 5 = 26$.\n" +
        "- S'il y a des **parenthèses**, on commence par le calcul **entre parenthèses** : $20 - (2 + 8) = 20 - 10 = 10$.\n" +
        "- Avec deux paires de parenthèses, on commence par les plus **intérieures**.\n\n" +
        "On écrit une ligne par étape, en recopiant ce qui n'a pas encore été calculé.",
      exemple: {
        enonce: "Calcule $A = 45 - 5 + 2$, $B = 3 \\times (10 - 2)$ et $C = 25 - (15 - (8 + 3))$.",
        solution: "$A = 40 + 2 = 42$ (de gauche à droite, et pas $45 - 7$).\n\n$B = 3 \\times 8 = 24$.\n\n$C = 25 - (15 - 11) = 25 - 4 = 21$."
      }
    },
    {
      titre: "Calculer astucieusement",
      video: { titre: "Vidéo d'Yvan Monka : calculer astucieusement", youtube: "https://youtu.be/jqrdOtWXxkU" },
      texte:
        "Dans une suite d'**additions**, ou dans une suite de **multiplications**, on peut **changer l'ordre** des nombres et les **regrouper** comme on veut. Le résultat ne change pas.\n\n" +
        "On en profite pour former des nombres « ronds » :\n\n" +
        "- $4{,}7 + 3{,}8 + 5{,}3 = (4{,}7 + 5{,}3) + 3{,}8 = 10 + 3{,}8 = 13{,}8$ ;\n" +
        "- $2{,}5 \\times 17 \\times 4 = (2{,}5 \\times 4) \\times 17 = 10 \\times 17 = 170$.\n\n" +
        "Quelques réflexes de calcul mental : $\\times 0{,}5$, c'est prendre la moitié ; $\\times 4$, c'est le double du double ; $+ 9$, c'est $+ 10 - 1$ ; $- 0{,}99$, c'est $- 1 + 0{,}01$.\n\n" +
        "Attention : on ne peut pas changer l'ordre dans une soustraction ($10 - 3 \\neq 3 - 10$).",
      exemple: {
        enonce: "Calcule astucieusement $0{,}5 \\times 37 \\times 2$, puis mentalement $56 \\times 0{,}5$ et $47{,}3 + 9{,}9$.",
        solution: "$0{,}5 \\times 37 \\times 2 = (0{,}5 \\times 2) \\times 37 = 1 \\times 37 = 37$.\n\n$56 \\times 0{,}5 = 28$ (la moitié de $56$).\n\n$47{,}3 + 9{,}9 = 47{,}3 + 10 - 0{,}1 = 57{,}3 - 0{,}1 = 57{,}2$."
      }
    },
    {
      titre: "Le sens de la multiplication de deux décimaux",
      texte:
        "Multiplier deux décimaux, ce n'est plus seulement « ajouter plusieurs fois le même nombre » : on ne peut pas ajouter $0{,}4$ fois le nombre $0{,}3$ !\n\n" +
        "On utilise l'**aire d'un rectangle** : un rectangle de $0{,}3$ sur $0{,}4$ a pour aire $0{,}3 \\times 0{,}4$.\n\n" +
        "Sur la figure, le grand carré a pour côté $1$ et pour aire $1$. Il est partagé en $100$ petits carrés de $0{,}01$. Le rectangle colorié couvre $3 \\times 4 = 12$ petits carrés : $0{,}3 \\times 0{,}4 = 0{,}12$.\n\n" +
        "Multiplier par un nombre plus petit que $1$ donne un résultat **plus petit** que le nombre de départ.",
      figure: "o6-quadrillage",
      exemple: {
        enonce: "Une dalle carrée de $0{,}6$ m de côté. Quelle est son aire ? Est-elle plus grande ou plus petite que $0{,}6$ m² ?",
        solution: "$0{,}6 \\times 0{,}6$ : le rectangle couvre $6 \\times 6 = 36$ petits carrés de $0{,}01$ m², donc $0{,}36$ m².\n\nC'est plus petit que $0{,}6$, car on a multiplié par $0{,}6$, un nombre plus petit que $1$."
      }
    },
    {
      titre: "Calculer le produit de deux décimaux",
      video: { titre: "Vidéo d'Yvan Monka : poser une multiplication", youtube: "https://youtu.be/4YQi_icWTTI" },
      texte:
        "On se ramène à un produit d'**entiers** :\n\n" +
        "$2{,}5 \\times 1{,}2 = (25 \\times 0{,}1) \\times (12 \\times 0{,}1) = (25 \\times 12) \\times (0{,}1 \\times 0{,}1) = 300 \\times 0{,}01 = 3$.\n\n" +
        "La règle qui en découle :\n\n" +
        "- on multiplie les nombres **sans les virgules** ;\n" +
        "- le produit a **autant de chiffres après la virgule** que les deux facteurs **ensemble** ;\n" +
        "- on contrôle avec un **ordre de grandeur**.\n\n" +
        "Pour $844{,}7 \\times 3{,}68$ : $8\\,447 \\times 368 = 3\\,108\\,496$, et $1 + 2 = 3$ chiffres après la virgule : $3\\,108{,}496$.",
      exemple: {
        enonce: "Calcule $4{,}3 \\times 0{,}27$, sachant que $43 \\times 27 = 1\\,161$.",
        solution: "$1 + 2 = 3$ chiffres après la virgule : $4{,}3 \\times 0{,}27 = 1{,}161$.\n\nContrôle : $4 \\times 0{,}3 = 1{,}2$, c'est proche."
      }
    },
    {
      titre: "Contrôler avec un ordre de grandeur",
      video: { titre: "Vidéo d'Yvan Monka : donner un ordre de grandeur d'un résultat", youtube: "https://youtu.be/eWG8Fa3q-ZU" },
      texte:
        "Un **ordre de grandeur** est un calcul rapide fait avec des valeurs « rondes » proches des nombres de l'énoncé.\n\n" +
        "Il sert à **contrôler** un résultat, surtout la place de la virgule : $48{,}7 \\times 3{,}1 \\approx 50 \\times 3 = 150$. Le résultat exact $150{,}97$ est cohérent ; $15{,}097$ ou $1\\,509{,}7$ sont impossibles.\n\n" +
        "Le symbole $\\approx$ se lit « est environ égal à ».",
      exemple: {
        enonce: "Donne un ordre de grandeur de $398{,}5 + 201{,}7$ et de $19{,}8 \\times 5{,}1$.",
        solution: "$398{,}5 + 201{,}7 \\approx 400 + 200 = 600$.\n\n$19{,}8 \\times 5{,}1 \\approx 20 \\times 5 = 100$."
      }
    },
    {
      titre: "Résoudre un problème",
      texte:
        "- Lis l'énoncé en entier et repère **la question**.\n" +
        "- Cherche les **étapes** : qu'est-ce que je peux calculer d'abord ?\n" +
        "- Pour chaque étape, choisis l'opération : ajouter, enlever, ou multiplier (prix de plusieurs kilos, aire d'un rectangle…).\n" +
        "- Écris les **unités** dans les calculs ($2{,}5$ kg $\\times$ $4{,}90$ € par kg) et fais une phrase de réponse.\n" +
        "- Contrôle avec un ordre de grandeur.",
      exemple: {
        enonce: "Au marché de Mamoudzou, tu achètes $2{,}5$ kg de mangues à $4{,}90$ € le kilo et un régime de bananes à $4{,}80$ €. Tu paies avec un billet de $20$ €. Combien te rend-on ?",
        solution: "Mangues : $2{,}5 \\times 4{,}90 = 12{,}25$ €. Total : $12{,}25 + 4{,}80 = 17{,}05$ €.\n\nMonnaie : $20 - 17{,}05 = 2{,}95$ €. On te rend $2{,}95$ €.\n\nContrôle : $2{,}5 \\times 5 + 5 = 17{,}5$ €, c'est proche de $17{,}05$ €."
      }
    }
  ],

  videosNote: "Méthodes expliquées pas à pas par Yvan Monka (maths-et-tiques), avec des exemples corrigés.",
  videos: [
    { titre: "Effectuer des calculs avec + et − seulement", type: "Calcul en ligne", youtube: "https://youtu.be/6_UeJI7JWTU" },
    { titre: "Poser une soustraction", type: "Soustraction", youtube: "https://youtu.be/CFKUxlh6R9s" },
    { titre: "Ajouter 299, soustraire 0,99", type: "Calcul mental", youtube: "https://youtu.be/SqWOGe_UNhU" },
    { titre: "Multiplier par 0,5", type: "Calcul mental", youtube: "https://youtu.be/SgKpjbooXLE" }
  ],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "o6-vocab", titre: "Somme, différence, produit : le vocabulaire", etape: "Vocabulaire et calcul en ligne", nb: 6 },
    { type: "o6-calcul", titre: "De gauche à droite, et les parenthèses d'abord", etape: "Vocabulaire et calcul en ligne", nb: 6 },
    { type: "o6-addsous", titre: "Additionner et soustraire des décimaux", etape: "Addition et soustraction", nb: 6 },
    { type: "o6-astuce", titre: "Calculer astucieusement et mentalement", etape: "Addition et soustraction", nb: 6 },
    { type: "o6-quadrillage", titre: "Le produit de deux décimaux sur un quadrillage", etape: "Multiplication", nb: 5 },
    { type: "o6-produit", titre: "Calculer le produit de deux décimaux", etape: "Multiplication", nb: 6 },
    { type: "o6-virgule", titre: "Où placer la virgule ?", etape: "Multiplication", nb: 5 },
    { type: "o6-ordre", titre: "Contrôler avec un ordre de grandeur", etape: "Ordre de grandeur et problèmes", nb: 5 },
    { type: "o6-probleme", titre: "Problèmes de la vie courante", etape: "Ordre de grandeur et problèmes", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Dans $12{,}5 + 7{,}3 = 19{,}8$, le nombre $19{,}8$ est :", choix: ["la somme", "la différence", "le produit", "un terme"], bonne: 0, explication: "C'est le résultat d'une addition : la somme. $12{,}5$ et $7{,}3$ sont les termes." },
    { question: "Dans $6 \\times 2{,}5 = 15$, les nombres $6$ et $2{,}5$ sont :", choix: ["les facteurs", "les termes", "les produits", "les sommes"], bonne: 0, explication: "Dans une multiplication, on multiplie des facteurs ; le résultat $15$ est le produit." },
    { question: "La différence de $11$ et de $3{,}5$ est :", choix: ["$7{,}5$", "$14{,}5$", "$8{,}5$", "$38{,}5$"], bonne: 0, explication: "$11 - 3{,}5 = 7{,}5$. $14{,}5$ est la somme et $38{,}5$ le produit." },
    { question: "$36{,}3 + 43{,}96 = $", choix: ["$80{,}26$", "$47{,}59$", "$79{,}26$", "$80{,}99$"], bonne: 0, explication: "Virgule sous virgule : $36{,}30 + 43{,}96 = 80{,}26$. $47{,}59$ vient d'un mauvais alignement." },
    { question: "$29{,}13 - 12{,}6 = $", choix: ["$16{,}53$", "$27{,}87$", "$17{,}53$", "$16{,}47$"], bonne: 0, explication: "$29{,}13 - 12{,}60 = 16{,}53$ : on complète $12{,}6$ par un zéro inutile." },
    { question: "$15 - 3{,}25 = $", choix: ["$11{,}75$", "$12{,}75$", "$12{,}25$", "$11{,}25$"], bonne: 0, explication: "$15{,}00 - 3{,}25 = 11{,}75$." },
    { question: "$45 - 5 + 2 = $", choix: ["$42$", "$38$", "$52$", "$40$"], bonne: 0, explication: "Que des additions et des soustractions : de gauche à droite. $45 - 5 = 40$, puis $40 + 2 = 42$." },
    { question: "$20 - (2 + 8) = $", choix: ["$10$", "$26$", "$14$", "$30$"], bonne: 0, explication: "On commence par la parenthèse : $2 + 8 = 10$, puis $20 - 10 = 10$." },
    { question: "$3 \\times (10 - 2) = $", choix: ["$24$", "$28$", "$32$", "$6$"], bonne: 0, explication: "Parenthèse d'abord : $10 - 2 = 8$, puis $3 \\times 8 = 24$." },
    { question: "$25 - (15 - (8 + 3)) = $", choix: ["$21$", "$-1$", "$7$", "$1$"], bonne: 0, explication: "Les parenthèses les plus intérieures d'abord : $8 + 3 = 11$ ; $15 - 11 = 4$ ; $25 - 4 = 21$." },
    { question: "Quelle écriture permet de calculer $2{,}5 \\times 17 \\times 4$ le plus facilement ?", choix: ["$(2{,}5 \\times 4) \\times 17$", "$(2{,}5 \\times 17) \\times 4$", "$2{,}5 \\times (17 + 4)$", "$(2{,}5 + 4) \\times 17$"], bonne: 0, explication: "On regroupe $2{,}5 \\times 4 = 10$ : $10 \\times 17 = 170$. Changer l'ordre des facteurs ne change pas le produit." },
    { question: "$4{,}7 + 3{,}8 + 5{,}3 = $", choix: ["$13{,}8$", "$12{,}8$", "$13{,}6$", "$14{,}8$"], bonne: 0, explication: "$(4{,}7 + 5{,}3) + 3{,}8 = 10 + 3{,}8 = 13{,}8$." },
    { question: "$64 \\times 0{,}5 = $", choix: ["$32$", "$320$", "$3{,}2$", "$64{,}5$"], bonne: 0, explication: "Multiplier par $0{,}5$, c'est prendre la moitié : $32$." },
    { question: "$47{,}3 + 9{,}9 = $", choix: ["$57{,}2$", "$57{,}4$", "$56{,}2$", "$56{,}12$"], bonne: 0, explication: "$+ 9{,}9$, c'est $+ 10 - 0{,}1$ : $57{,}3 - 0{,}1 = 57{,}2$." },
    { question: "Le grand carré a une aire de $1$. Quelle est l'aire coloriée ?", figure: "o6-quadrillage", choix: ["$0{,}12$", "$1{,}2$", "$12$", "$0{,}7$"], bonne: 0, explication: "$3 \\times 4 = 12$ petits carrés de $0{,}01$ : $0{,}3 \\times 0{,}4 = 0{,}12$. $0{,}7$ est la somme $0{,}3 + 0{,}4$." },
    { question: "$0{,}3 \\times 0{,}4 = $", choix: ["$0{,}12$", "$1{,}2$", "$0{,}7$", "$12$"], bonne: 0, explication: "$3 \\times 4 = 12$ et $1 + 1 = 2$ chiffres après la virgule : $0{,}12$." },
    { question: "$2{,}5 \\times 1{,}2 = $", choix: ["$3$", "$2{,}10$", "$30$", "$0{,}3$"], bonne: 0, explication: "$25 \\times 12 = 300$ et deux chiffres après la virgule : $3{,}00 = 3$. On ne multiplie pas $2 \\times 1$ et $5 \\times 2$ séparément." },
    { question: "Sachant que $43 \\times 27 = 1\\,161$, combien vaut $4{,}3 \\times 2{,}7$ ?", choix: ["$11{,}61$", "$116{,}1$", "$1{,}161$", "$1\\,161$"], bonne: 0, explication: "$1 + 1 = 2$ chiffres après la virgule : $11{,}61$. Contrôle : $4 \\times 3 = 12$." },
    { question: "Combien de chiffres après la virgule a le produit $3{,}14 \\times 2{,}5$ (avant de supprimer d'éventuels zéros) ?", choix: ["$3$", "$2$", "$1$", "$5$"], bonne: 0, explication: "$2$ chiffres dans $3{,}14$ et $1$ dans $2{,}5$ : $2 + 1 = 3$. Ici $314 \\times 25 = 7\\,850$, donc $7{,}850 = 7{,}85$." },
    { question: "Quand on multiplie $8$ par $0{,}6$, le résultat est :", choix: ["plus petit que $8$", "plus grand que $8$", "égal à $8$", "toujours un nombre entier"], bonne: 0, explication: "$0{,}6 < 1$ : on prend « une partie » de $8$. $8 \\times 0{,}6 = 4{,}8$." },
    { question: "Un ordre de grandeur de $48{,}7 \\times 3{,}1$ est :", choix: ["$150$", "$15$", "$1\\,500$", "$52$"], bonne: 0, explication: "$48{,}7 \\approx 50$ et $3{,}1 \\approx 3$ : $50 \\times 3 = 150$. $52$ serait un ordre de grandeur de la somme." },
    { question: "Sans poser l'opération, quel est le résultat de $19{,}8 \\times 5{,}1$ ?", choix: ["$100{,}98$", "$10{,}098$", "$1\\,009{,}8$", "$24{,}9$"], bonne: 0, explication: "$20 \\times 5 = 100$ : seul $100{,}98$ est proche." },
    { question: "Un ordre de grandeur de $398{,}5 + 201{,}7$ est :", choix: ["$600$", "$60$", "$6\\,000$", "$800$"], bonne: 0, explication: "$400 + 200 = 600$." },
    { question: "Tu achètes $3$ kg de riz à $1{,}85$ € le kilo. Tu paies :", choix: ["$5{,}55$ €", "$4{,}85$ €", "$55{,}5$ €", "$5{,}45$ €"], bonne: 0, explication: "$3 \\times 1{,}85 = 5{,}55$ €. Contrôle : $3 \\times 2 = 6$ €." },
    { question: "Un enclos rectangulaire mesure $12{,}5$ m sur $8{,}2$ m. Pour en faire le tour, il faut :", choix: ["$41{,}4$ m", "$20{,}7$ m", "$102{,}5$ m", "$40{,}14$ m"], bonne: 0, explication: "$12{,}5 + 12{,}5 + 8{,}2 + 8{,}2 = 41{,}4$ m. $102{,}5$ m² serait l'aire." },
    { question: "Tu paies $17{,}05$ € avec un billet de $20$ €. On te rend :", choix: ["$2{,}95$ €", "$3{,}05$ €", "$3{,}95$ €", "$2{,}05$ €"], bonne: 0, explication: "$20{,}00 - 17{,}05 = 2{,}95$ €." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Poser une addition ou une soustraction",
      etapes: [
        "Écris les nombres **virgule sous virgule**.",
        "Complète par des zéros pour avoir le même nombre de chiffres après la virgule.",
        "Calcule de droite à gauche, avec les retenues, et place la virgule du résultat."
      ],
      exemple: "$7{,}5 + 12{,}36$ : $7{,}50 + 12{,}36 = 19{,}86$."
    },
    {
      titre: "Calculer une expression en ligne",
      etapes: [
        "S'il y a des parenthèses, calcule d'abord ce qu'elles contiennent (les plus intérieures d'abord).",
        "Avec seulement $+$ et $-$, calcule de gauche à droite.",
        "Écris une ligne par étape."
      ],
      exemple: "$30 - 8 + 2 = 22 + 2 = 24$ ; $30 - (8 + 2) = 30 - 10 = 20$."
    },
    {
      titre: "Calculer astucieusement",
      etapes: [
        "Repère les nombres qui donnent un résultat « rond » ensemble ($2{,}5 \\times 4 = 10$ ; $0{,}7 + 0{,}3 = 1$).",
        "Change l'ordre et regroupe-les : c'est permis dans une suite d'additions ou dans une suite de multiplications.",
        "Termine le calcul."
      ],
      exemple: "$5 \\times 23 \\times 2 = (5 \\times 2) \\times 23 = 230$."
    },
    {
      titre: "Multiplier deux nombres décimaux",
      etapes: [
        "Multiplie les nombres sans les virgules.",
        "Compte les chiffres après la virgule dans les deux facteurs, et additionne.",
        "Place la virgule dans le résultat, puis contrôle avec un ordre de grandeur."
      ],
      exemple: "$1{,}5 \\times 0{,}24$ : $15 \\times 24 = 360$, $1 + 2 = 3$ chiffres, donc $0{,}360 = 0{,}36$."
    },
    {
      titre: "Trouver un ordre de grandeur",
      etapes: [
        "Remplace chaque nombre par une valeur ronde proche.",
        "Fais le calcul avec ces valeurs, de tête.",
        "Compare au résultat trouvé : la virgule est-elle au bon endroit ?"
      ],
      exemple: "$9{,}8 \\times 3{,}29 \\approx 10 \\times 3 = 30$ : le résultat est $32{,}242$, pas $322{,}42$."
    },
    {
      titre: "Résoudre un problème",
      etapes: [
        "Repère la question et les étapes.",
        "Choisis l'opération de chaque étape, en écrivant les unités.",
        "Fais une phrase de réponse et contrôle avec un ordre de grandeur."
      ],
      exemple: "$12$ L d'essence à $1{,}95$ € : $12 \\times 1{,}95 = 23{,}40$ €."
    }
  ],
  erreurs: [
    "Aligner les derniers chiffres au lieu des virgules : $36{,}3 + 43{,}96 \\neq 47{,}59$.",
    "Calculer de droite à gauche : $45 - 5 + 2 = 42$, pas $45 - 7$.",
    "Oublier de commencer par les parenthèses : $3 \\times (10 - 2) = 24$, pas $28$.",
    "Changer l'ordre dans une soustraction : $10 - 3 \\neq 3 - 10$.",
    "Multiplier séparément les parties entières et décimales : $2{,}5 \\times 1{,}2 = 3$, pas $2{,}10$.",
    "Ne compter les chiffres après la virgule que dans un seul facteur : $0{,}3 \\times 0{,}4 = 0{,}12$, pas $1{,}2$.",
    "Croire qu'une multiplication agrandit toujours : $8 \\times 0{,}6 = 4{,}8 < 8$.",
    "Oublier le contrôle par un ordre de grandeur, qui repère les virgules mal placées."
  ]
};
