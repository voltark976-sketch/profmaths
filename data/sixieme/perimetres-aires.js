/*
  CHAPITRE : 6e — Longueurs, périmètres et aires
  -----------------------------------------------
  Programme de mathématiques du cycle 3 (BO n° 16 du 17 avril 2025), en vigueur en 6e depuis la rentrée 2025 :
  « Les longueurs » : préfixes de kilo- à milli-, conversions ; périmètre d'une figure, du carré, du rectangle ;
  le périmètre du disque est proportionnel à son diamètre, formule, calcul ; périmètres de figures composées.
  « Les aires » : comparer sans mesurer, aire sur quadrillage ; 1 m² = 100 dm², 1 dm² = 100 cm² et conversions ;
  formules de l'aire du carré et du rectangle. Les formules sont une première sensibilisation au calcul littéral.
  Mêmes règles d'écriture que data/sixieme/nombres-entiers-decimaux.js.
  figure : "pa6-rectangle", "pa6-cercle" ou "pa6-L" (assets/exercices-college.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["sixieme-perimetres-aires"] = {
  niveau: "6e",
  numero: 13,
  titre: "Longueurs, périmètres et aires",
  accroche: "Convertir des longueurs et des aires, calculer le périmètre d'un rectangle ou d'un cercle, l'aire d'un rectangle, et ne plus les confondre.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : périmètres (PDF)", url: "https://www.maths-et-tiques.fr/telech/25Perim.pdf" },
    { titre: "Cours d'Yvan Monka : aires (PDF)", url: "https://www.maths-et-tiques.fr/telech/25Aires6.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : périmètres (Yvan Monka)", url: "https://youtu.be/7tU_9CAcjJI", type: "video" },
    { titre: "Le cours en vidéo : aires (Yvan Monka)", url: "https://youtu.be/LESrNzrb9NI", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Les unités de longueur",
      video: { titre: "Vidéo d'Yvan Monka : convertir les unités de longueurs", youtube: "https://youtu.be/a6rFbX2eRx4" },
      texte:
        "L'unité de longueur est le **mètre** (m). Les préfixes ont le même sens qu'en numération :\n\n" +
        "- **kilo** $= 1\\,000$ : $1$ km $= 1\\,000$ m ; **hecto** $= 100$ : $1$ hm $= 100$ m ; **déca** $= 10$ : $1$ dam $= 10$ m ;\n" +
        "- **déci** $=$ un dixième : $1$ dm $= 0{,}1$ m ; **centi** $=$ un centième : $1$ cm $= 0{,}01$ m ; **milli** $=$ un millième : $1$ mm $= 0{,}001$ m.\n\n" +
        "Chaque unité vaut **$10$ fois** la suivante : pour passer à une unité plus petite, on multiplie ; à une unité plus grande, on divise.\n\n" +
        "Le **tableau de conversion** évite les erreurs : on place le chiffre des unités dans la colonne de l'unité de départ, puis on lit le nombre jusqu'à la colonne de l'unité d'arrivée, en complétant par des zéros (en couleur). Ici, $3{,}5$ m $= 350$ cm.",
      figure: "pa6-cours-conv",
      exemple: {
        enonce: "Convertis $3{,}5$ m en cm, puis $250$ m en km.",
        solution: "$1$ m $= 100$ cm, donc $3{,}5$ m $= 350$ cm.\n\n$1$ km $= 1\\,000$ m, donc $250$ m $= 0{,}25$ km."
      }
    },
    {
      titre: "Le périmètre d'une figure",
      video: { titre: "Vidéo d'Yvan Monka : calculer le périmètre d'un rectangle, d'un losange, d'un carré", youtube: "https://youtu.be/6Qv9N7StHHc" },
      texte:
        "Le **périmètre** d'une figure est la **longueur de son contour** : on additionne les longueurs de tous ses côtés.\n\n" +
        "- carré de côté $c$ : $P = 4 \\times c$ ;\n" +
        "- rectangle de longueur $L$ et de largeur $l$ : $P = 2 \\times (L + l)$.\n\n" +
        "Pour une figure composée, on fait le tour en additionnant chaque morceau du contour.",
      figure: "pa6-rectangle",
      exemple: {
        enonce: "Calcule le périmètre du rectangle de la figure, puis celui d'un carré de côté $6{,}5$ cm.",
        solution: "Rectangle : $P = 2 \\times (7 + 4) = 22$ cm.\n\nCarré : $P = 4 \\times 6{,}5 = 26$ cm."
      }
    },
    {
      titre: "Le périmètre d'un cercle",
      video: { titre: "Vidéo d'Yvan Monka : calculer la longueur d'un cercle", youtube: "https://youtu.be/iKyAfCzKnu4" },
      texte:
        "Le périmètre d'un cercle (on dit aussi sa longueur) est **proportionnel à son diamètre** : on multiplie toujours le diamètre par le même nombre, appelé **$\\pi$** (« pi »).\n\n" +
        "**$P = \\pi \\times d$**, ou **$P = 2 \\times \\pi \\times r$** avec le rayon.\n\n" +
        "$\\pi \\approx 3{,}14$ : ce n'est qu'une valeur approchée, $\\pi = 3{,}14159\\ldots$ a une infinité de décimales.\n\n" +
        "Le savais-tu ? Archimède, il y a plus de $2\\,000$ ans, avait déjà montré que $\\pi$ est compris entre $3{,}140$ et $3{,}143$.",
      figure: "pa6-cercle",
      exemple: {
        enonce: "Calcule le périmètre du cercle de la figure, de diamètre $6$ cm, avec $\\pi \\approx 3{,}14$.",
        solution: "$P = \\pi \\times d \\approx 3{,}14 \\times 6 = 18{,}84$ cm."
      }
    },
    {
      titre: "Aires et unités d'aire",
      video: { titre: "Vidéo d'Yvan Monka : convertir les unités d'aire", youtube: "https://youtu.be/Yb6GM-oeeFU" },
      texte:
        "L'**aire** d'une figure mesure sa **surface**. On peut la mesurer en comptant des carreaux.\n\n" +
        "- $1$ cm² est l'aire d'un carré de $1$ cm de côté ; $1$ dm², d'un carré de $1$ dm de côté ; $1$ m², d'un carré de $1$ m de côté.\n" +
        "- $1$ m² $= 10$ dm $\\times 10$ dm $= 100$ dm² ; $1$ dm² $= 100$ cm².\n\n" +
        "Pour les aires, on passe d'une unité à la suivante en multipliant ou en divisant par **$100$** (et non par $10$).\n\n" +
        "Dans le tableau de conversion des aires, chaque unité a donc **deux colonnes**. Sur la figure : $450$ cm² $= 4{,}50$ dm² $= 4{,}5$ dm² (la virgule se place après la colonne des dm²).",
      figure: "pa6-cours-conv-aire",
      exemple: {
        enonce: "Convertis $3$ m² en dm², puis $450$ cm² en dm².",
        solution: "$3$ m² $= 3 \\times 100 = 300$ dm².\n\n$450$ cm² $= 450 \\div 100 = 4{,}5$ dm²."
      }
    },
    {
      titre: "L'aire du carré et du rectangle",
      video: { titre: "Vidéo d'Yvan Monka : calculer l'aire d'un carré et d'un rectangle", youtube: "https://youtu.be/FyCDJE7yIzU" },
      texte:
        "- rectangle de longueur $L$ et de largeur $l$ : $\\mathscr{A} = L \\times l$ ;\n" +
        "- carré de côté $c$ : $\\mathscr{A} = c \\times c$.\n\n" +
        "Les deux longueurs doivent être dans **la même unité** ; l'aire s'exprime alors dans l'unité « carré » correspondante.\n\n" +
        "Pour une figure en L, on peut **découper** en rectangles, ou **compléter** en un grand rectangle et retirer le coin.",
      figure: "pa6-L",
      exemple: {
        enonce: "Calcule l'aire du rectangle de $7$ cm sur $4$ cm, puis l'aire de la figure en L.",
        solution: "Rectangle : $\\mathscr{A} = 7 \\times 4 = 28$ cm².\n\nFigure en L : $8 \\times 6 - 3 \\times 2 = 48 - 6 = 42$ m²."
      }
    },
    {
      titre: "Ne pas confondre périmètre et aire",
      texte:
        "- Le **périmètre** est une **longueur** (cm, m) : clôturer un jardin, poser une frise, faire le tour d'un stade.\n" +
        "- L'**aire** est une **surface** (cm², m²) : carreler une terrasse, peindre un mur, semer une pelouse.\n\n" +
        "Deux figures peuvent avoir le même périmètre sans avoir la même aire : un carré de $5$ cm de côté et un rectangle de $7$ cm sur $3$ cm ont tous les deux un périmètre de $20$ cm, mais des aires de $25$ cm² et $21$ cm² (sur la figure, un carreau représente $1$ cm²).",
      figure: "pa6-cours-compare",
      exemple: {
        enonce: "Une terrasse mesure $6$ m sur $4$ m. Combien de m² de carrelage faut-il ? Quelle longueur de frise pour en faire le tour ?",
        solution: "Carrelage : une aire, $6 \\times 4 = 24$ m².\n\nFrise : un périmètre, $2 \\times (6 + 4) = 20$ m."
      }
    }
  ],

  videosNote: "Méthodes et exercices corrigés par Yvan Monka (maths-et-tiques).",
  videos: [
    { titre: "Calculer le périmètre d'une figure", type: "Périmètre", youtube: "https://youtu.be/w7n638xdT6E" },
    { titre: "Périmètre d'une figure avec un demi-cercle", type: "Cercle", youtube: "https://youtu.be/zfF9oEwy0G0" },
    { titre: "Calculer la longueur d'un cercle (exercice)", type: "Cercle", youtube: "https://youtu.be/t29tPtZGtlU" },
    { titre: "Calculer l'aire d'une figure dans un quadrillage", type: "Aire", youtube: "https://youtu.be/VDI8DV-njS0" }
  ],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "pa6-conv-long", titre: "Convertir des longueurs", etape: "Longueurs et périmètres", nb: 6 },
    { type: "pa6-perimetre", titre: "Périmètre d'un rectangle, d'un carré, d'un polygone", etape: "Longueurs et périmètres", nb: 6 },
    { type: "pa6-cercle", titre: "Périmètre d'un cercle", etape: "Longueurs et périmètres", nb: 5 },
    { type: "pa6-conv-aire", titre: "Convertir des aires", etape: "Aires", nb: 6 },
    { type: "pa6-aire", titre: "Aire d'un rectangle, d'un carré, d'une figure composée", etape: "Aires", nb: 6 },
    { type: "pa6-probleme", titre: "Périmètre ou aire ?", etape: "Aires", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$3{,}5$ m $=$", choix: ["$350$ cm", "$35$ cm", "$3\\,500$ cm", "$0{,}35$ cm"], bonne: 0, explication: "$1$ m $= 100$ cm." },
    { question: "$250$ m $=$", choix: ["$0{,}25$ km", "$2{,}5$ km", "$25$ km", "$250\\,000$ km"], bonne: 0, explication: "$1$ km $= 1\\,000$ m : on divise par $1\\,000$." },
    { question: "Le préfixe « milli » signifie :", choix: ["un millième", "mille", "un million", "un centième"], bonne: 0, explication: "$1$ mm $= 0{,}001$ m." },
    { question: "Le périmètre d'un rectangle de $7$ cm sur $4$ cm est :", figure: "pa6-rectangle", choix: ["$22$ cm", "$28$ cm", "$11$ cm", "$28$ cm²"], bonne: 0, explication: "$2 \\times (7 + 4) = 22$ cm. $28$ cm² est l'aire." },
    { question: "Le périmètre d'un carré de $6{,}5$ cm de côté est :", choix: ["$26$ cm", "$42{,}25$ cm", "$13$ cm", "$24$ cm"], bonne: 0, explication: "$4 \\times 6{,}5 = 26$ cm." },
    { question: "Le périmètre d'un cercle de diamètre $6$ cm est environ :", figure: "pa6-cercle", choix: ["$18{,}84$ cm", "$37{,}68$ cm", "$9{,}42$ cm", "$28{,}26$ cm"], bonne: 0, explication: "$3{,}14 \\times 6 = 18{,}84$ cm." },
    { question: "Le périmètre d'un cercle de rayon $5$ cm est environ :", choix: ["$31{,}4$ cm", "$15{,}7$ cm", "$78{,}5$ cm", "$10$ cm"], bonne: 0, explication: "$d = 10$ cm, puis $3{,}14 \\times 10 = 31{,}4$ cm." },
    { question: "Le périmètre d'un cercle est proportionnel :", choix: ["à son diamètre", "à son aire", "au carré de son rayon", "à rien du tout"], bonne: 0, explication: "$P = \\pi \\times d$ : on multiplie toujours le diamètre par $\\pi$." },
    { question: "$1$ m² $=$", choix: ["$100$ dm²", "$10$ dm²", "$1\\,000$ dm²", "$100$ cm²"], bonne: 0, explication: "$1$ m² $= 10$ dm $\\times 10$ dm $= 100$ dm²." },
    { question: "$450$ cm² $=$", choix: ["$4{,}5$ dm²", "$45$ dm²", "$0{,}45$ dm²", "$45\\,000$ dm²"], bonne: 0, explication: "$1$ dm² $= 100$ cm² : on divise par $100$." },
    { question: "L'aire d'un rectangle de $7$ cm sur $4$ cm est :", choix: ["$28$ cm²", "$22$ cm²", "$11$ cm²", "$28$ cm"], bonne: 0, explication: "$7 \\times 4 = 28$ cm²." },
    { question: "L'aire d'un carré de $9$ m de côté est :", choix: ["$81$ m²", "$36$ m²", "$18$ m²", "$81$ m"], bonne: 0, explication: "$9 \\times 9 = 81$ m²." },
    { question: "L'aire de la figure en L est :", figure: "pa6-L", choix: ["$42$ m²", "$48$ m²", "$28$ m²", "$54$ m²"], bonne: 0, explication: "$8 \\times 6 - 3 \\times 2 = 42$ m²." },
    { question: "Pour savoir combien de grillage il faut autour d'un jardin, on calcule :", choix: ["son périmètre", "son aire", "son volume", "sa diagonale"], bonne: 0, explication: "Faire le tour : c'est une longueur." },
    { question: "Pour savoir combien de m² de peinture il faut pour un mur, on calcule :", choix: ["son aire", "son périmètre", "sa hauteur seulement", "sa longueur seulement"], bonne: 0, explication: "Recouvrir une surface : c'est une aire." },
    { question: "Un carré de $5$ cm de côté et un rectangle de $7$ cm sur $3$ cm (un carreau $= 1$ cm²) ont :", figure: "pa6-cours-compare", choix: ["le même périmètre, mais pas la même aire", "la même aire, mais pas le même périmètre", "le même périmètre et la même aire", "rien en commun"], bonne: 0, explication: "Périmètres : $20$ cm et $20$ cm. Aires : $25$ cm² et $21$ cm²." },
    { question: "Quel est le périmètre de cette fenêtre (rectangle surmonté d'un demi-cercle), avec $\\pi \\approx 3{,}14$ ?", figure: "pa6-qcm-fenetre", choix: ["$32{,}56$ dm", "$40{,}56$ dm", "$45{,}12$ dm", "$25{,}12$ dm"], bonne: 0, explication: "Demi-cercle : $3{,}14 \\times 8 \\div 2 = 12{,}56$ dm. Côtés : $8 + 6 + 6 = 20$ dm (le côté du haut ne fait pas partie du contour). Total : $32{,}56$ dm." },
    { question: "Cette roue fait $10$ tours complets. Quelle distance parcourt-elle, avec $\\pi \\approx 3{,}14$ ?", figure: "pa6-qcm-roue", choix: ["$18{,}84$ m", "$1{,}884$ m", "$9{,}42$ m", "$188{,}4$ m"], bonne: 0, explication: "Un tour : $3{,}14 \\times 60 = 188{,}4$ cm. Dix tours : $1\\,884$ cm, soit $18{,}84$ m." },
    { question: "Chaque carreau a une aire de $1$ cm². Quelle est l'aire de la figure ?", figure: "pa6-qcm-grille", choix: ["$17$ cm²", "$16$ cm²", "$22$ cm²", "$18$ cm²"], bonne: 0, explication: "On découpe : $5 \\times 2 = 10$, $3 \\times 2 = 6$, plus $1$ carreau : $10 + 6 + 1 = 17$ cm²." },
    { question: "$85$ mm $=$", choix: ["$8{,}5$ cm", "$85$ cm", "$850$ cm", "$0{,}85$ cm"], bonne: 0, explication: "$1$ cm $= 10$ mm : on divise par $10$." },
    { question: "$2{,}5$ m² $=$", choix: ["$25\\,000$ cm²", "$250$ cm²", "$2\\,500$ cm²", "$25$ cm²"], bonne: 0, explication: "$1$ m² $= 100$ dm² $= 10\\,000$ cm² : $2{,}5 \\times 10\\,000 = 25\\,000$ cm²." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Convertir des longueurs",
      etapes: [
        "Range les unités : km, hm, dam, m, dm, cm, mm.",
        "Compte les rangs entre les deux unités.",
        "Vers une unité plus petite : multiplie par $10$, $100$, $1\\,000$… ; vers une plus grande : divise."
      ],
      exemple: "$4{,}7$ km $= 4\\,700$ m ; $85$ mm $= 8{,}5$ cm.",
      figure: "pa6-methode-conv"
    },
    {
      titre: "Calculer un périmètre",
      etapes: [
        "Vérifie que toutes les longueurs sont dans la même unité.",
        "Carré : $4 \\times c$ ; rectangle : $2 \\times (L + l)$ ; cercle : $\\pi \\times d$.",
        "Figure composée : fais le tour et additionne chaque morceau."
      ],
      exemple: "Fenêtre : demi-cercle $3{,}14 \\times 8 \\div 2 = 12{,}56$ dm, plus $8 + 6 + 6 = 20$ dm, soit $32{,}56$ dm.",
      figure: "pa6-qcm-fenetre"
    },
    {
      titre: "Convertir des aires",
      etapes: [
        "Range les unités : m², dm², cm².",
        "Entre deux unités qui se suivent, le rapport est $100$.",
        "Multiplie par $100$ vers une unité plus petite, divise par $100$ vers une plus grande."
      ],
      exemple: "$2{,}5$ m² $= 250$ dm² $= 25\\,000$ cm².",
      figure: "pa6-methode-aire"
    },
    {
      titre: "Calculer une aire",
      etapes: [
        "Rectangle : $L \\times l$ ; carré : $c \\times c$ (mêmes unités).",
        "Figure composée : découpe en rectangles, ou complète puis retire.",
        "Écris l'unité d'aire : cm², m²…"
      ],
      exemple: "Figure en L : $8 \\times 6 - 3 \\times 2 = 42$ m².",
      figure: "pa6-L"
    }
  ],
  erreurs: [
    "Confondre périmètre (longueur, en cm) et aire (surface, en cm²).",
    "Convertir des aires en multipliant par $10$ : $1$ m² $= 100$ dm².",
    "Utiliser le rayon à la place du diamètre dans $P = \\pi \\times d$.",
    "Oublier que $3{,}14$ n'est qu'une valeur approchée de $\\pi$.",
    "Multiplier des longueurs qui ne sont pas dans la même unité.",
    "Oublier un côté quand on fait le tour d'une figure composée."
  ]
};
