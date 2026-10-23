/*
  CHAPITRE : 5e — Proportionnalité et pourcentages
  -------------------------------------------------
  Programme de mathématiques du cycle 4 (BO n° 10 du 5 mars 2026), en vigueur en 5e à la rentrée 2026, partie
  « Proportionnalité » : reconnaitre une situation de proportionnalité ; mobiliser une procédure adaptée
  (linéarité, retour à l'unité, coefficient) ; utiliser un coefficient de proportionnalité (prix unitaire, vitesse
  moyenne, échelle) ; calculer et appliquer des proportions et des pourcentages. Les représentations graphiques
  sont traitées au chapitre « Graphiques et grandeurs en fonction d'une autre ». Pas de produit en croix (cycle 4,
  plus tard), comme dans le programme.
  Mêmes règles d'écriture que data/sixieme/nombres-entiers-decimaux.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cinquieme-proportionnalite"] = {
  niveau: "5e",
  numero: 4,
  titre: "Proportionnalité et pourcentages",
  accroche: "Reconnaître une situation de proportionnalité, compléter un tableau par la méthode la plus rapide, calculer une vitesse, un pourcentage ou une échelle.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : proportionnalité (PDF)", url: "https://www.maths-et-tiques.fr/telech/26Prop1.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : proportionnalité (Yvan Monka)", url: "https://youtu.be/xzh9846HI0w", type: "video" },
    { titre: "Compléter un tableau de proportionnalité (Yvan Monka)", url: "https://youtu.be/ryQJljicsxU", type: "video" },
    { titre: "Calculer une échelle (Yvan Monka)", url: "https://youtu.be/82qxwdhWYq8", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Reconnaître la proportionnalité",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître un tableau de proportionnalité", youtube: "https://youtu.be/O7oU-J1OqCw" },
      texte:
        "Deux grandeurs sont **proportionnelles** quand on obtient les valeurs de l'une en multipliant celles de l'autre par un **même nombre**, le **coefficient de proportionnalité**.\n\n" +
        "Pour vérifier un tableau, on calcule les quotients « nombre du bas $\\div$ nombre du haut » : s'ils sont tous égaux, le tableau est de proportionnalité.\n\n" +
        "Le prix payé est proportionnel à la masse de tomates achetée. L'âge et la taille d'un enfant, eux, ne sont pas proportionnels.",
      figure: "pp5-cours-tableau",
      exemple: {
        enonce: "$2$ kg de mangues coûtent $7$ € et $5$ kg coûtent $17{,}50$ €. Le prix est-il proportionnel à la masse ?",
        solution: "$7 \\div 2 = 3{,}5$ et $17{,}5 \\div 5 = 3{,}5$ : les quotients sont égaux. Le prix est proportionnel à la masse, de coefficient $3{,}5$ (le prix d'un kilogramme)."
      }
    },
    {
      titre: "Compléter un tableau de proportionnalité",
      video: { titre: "Vidéo d'Yvan Monka : appliquer la proportionnalité (4 méthodes)", youtube: "https://youtu.be/O91-Dq06k0U" },
      texte:
        "Plusieurs méthodes, à choisir selon les nombres :\n\n" +
        "- **le coefficient** : on multiplie par le coefficient de proportionnalité ;\n" +
        "- **multiplier une colonne** : si la quantité est $3$ fois plus grande, le prix aussi ;\n" +
        "- **additionner deux colonnes** : le prix de $2 + 3$ kg est le prix de $2$ kg plus celui de $3$ kg ;\n" +
        "- **le retour à l'unité** : on calcule d'abord la valeur pour $1$, puis on multiplie.",
      figure: "pp5-cours-methodes",
      exemple: {
        enonce: "$4$ cahiers coûtent $6$ €. Combien coûtent $12$ cahiers ? Et $7$ cahiers ?",
        solution: "$12 = 3 \\times 4$, donc $12$ cahiers coûtent $3 \\times 6 = 18$ €.\n\nRetour à l'unité : un cahier coûte $6 \\div 4 = 1{,}5$ €, donc $7$ cahiers coûtent $7 \\times 1{,}5 = 10{,}5$ €."
      }
    },
    {
      titre: "Vitesse moyenne",
      video: { titre: "Vidéo d'Yvan Monka : utiliser les durées", youtube: "https://youtu.be/x6WHxJUI1kE" },
      texte:
        "Quand un véhicule roule à vitesse constante, la distance parcourue est proportionnelle à la durée. Le coefficient est la **vitesse moyenne** : la distance parcourue en $1$ heure.\n\n" +
        "Vitesse $=$ distance $\\div$ durée. Attention aux durées : $30$ min $= 0{,}5$ h, $15$ min $= 0{,}25$ h.\n\n" +
        "Une **double droite graduée** montre la proportionnalité : en face de $0$ h, il y a $0$ km, et chaque durée correspond à la distance placée en dessous.",
      figure: "pp5-cours-vitesse",
      exemple: {
        enonce: "Le taxi-brousse relie deux villages distants de $45$ km en $1$ h $30$ min. Quelle est sa vitesse moyenne ?",
        solution: "$1$ h $30$ min $= 1{,}5$ h. Vitesse : $45 \\div 1{,}5 = 30$ km/h."
      }
    },
    {
      titre: "Pourcentages",
      video: { titre: "Vidéo d'Yvan Monka : calculer un pourcentage", youtube: "https://youtu.be/_TcFaeFb6sI" },
      texte:
        "Un **pourcentage** est une proportion ramenée à $100$ : $30\\,\\%$ signifie $30$ sur $100$, soit $\\dfrac{30}{100}$.\n\n" +
        "- **Appliquer** un pourcentage : $30\\,\\%$ de $250$ € $= 250 \\times 30 \\div 100 = 75$ €.\n" +
        "- **Calculer** un pourcentage : $9$ élèves sur $25$, c'est $\\dfrac{9}{25} = \\dfrac{36}{100}$, soit $36\\,\\%$.\n\n" +
        "Repères : $10\\,\\%$, c'est diviser par $10$ ; $50\\,\\%$, la moitié ; $25\\,\\%$, le quart.",
      figure: "pp5-cours-pourcentage",
      exemple: {
        enonce: "Un jean à $40$ € est soldé à $-20\\,\\%$. Quel est son nouveau prix ?",
        solution: "$20\\,\\%$ de $40$ : $40 \\times 20 \\div 100 = 8$ €. Nouveau prix : $40 - 8 = 32$ €."
      }
    },
    {
      titre: "Échelles",
      video: { titre: "Vidéo d'Yvan Monka : utiliser une échelle", youtube: "https://youtu.be/-nKF5P_xxyQ" },
      texte:
        "Sur un plan ou une carte, les longueurs sont proportionnelles aux longueurs réelles. L'**échelle** est le coefficient qui permet de passer des longueurs réelles aux longueurs du plan, **dans la même unité**.\n\n" +
        "Une échelle de $\\dfrac{1}{50\\,000}$ signifie que $1$ cm sur la carte représente $50\\,000$ cm, soit $500$ m, en réalité.",
      figure: "pp5-cours-echelle",
      exemple: {
        enonce: "Sur une carte de Mayotte à l'échelle $\\dfrac{1}{100\\,000}$, Combani et Mamoudzou sont à $7{,}5$ cm l'un de l'autre. Quelle est la distance réelle à vol d'oiseau ?",
        solution: "$7{,}5 \\times 100\\,000 = 750\\,000$ cm $= 7\\,500$ m $= 7{,}5$ km."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "pp5-reconnaitre", titre: "Reconnaître un tableau de proportionnalité", etape: "Proportionnalité", nb: 5 },
    { type: "pp5-completer", titre: "Compléter un tableau", etape: "Proportionnalité", nb: 6 },
    { type: "pp5-coefficient", titre: "Prix unitaire, recette, vitesse", etape: "Proportionnalité", nb: 5 },
    { type: "pp5-pourcentages", titre: "Calculer et appliquer un pourcentage", etape: "Pourcentages et échelles", nb: 6 },
    { type: "pp5-echelles", titre: "Utiliser une échelle", etape: "Pourcentages et échelles", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Quelle situation est une situation de proportionnalité ?", choix: ["Le prix de l'essence et le nombre de litres", "L'âge et la taille d'un enfant", "La pointure et la taille d'une personne", "La note et le temps passé à réviser"], bonne: 0, explication: "Le prix est toujours le prix d'un litre multiplié par le nombre de litres." },
    { question: "$3$ kg de riz coûtent $4{,}50$ €. Un kilogramme coûte :", choix: ["$1{,}50$ €", "$1{,}35$ €", "$13{,}50$ €", "$7{,}50$ €"], bonne: 0, explication: "$4{,}5 \\div 3 = 1{,}5$." },
    { question: "$5$ stylos coûtent $4$ €. $15$ stylos coûtent :", choix: ["$12$ €", "$14$ €", "$19$ €", "$20$ €"], bonne: 0, explication: "$15 = 3 \\times 5$, donc $3 \\times 4 = 12$ €." },
    { question: "$2$ kg coûtent $5$ € et $3$ kg coûtent $7{,}50$ €. $5$ kg coûtent :", choix: ["$12{,}50$ €", "$10$ €", "$15$ €", "$12$ €"], bonne: 0, explication: "On additionne les colonnes : $5 + 7{,}5 = 12{,}5$." },
    { question: "Une voiture parcourt $150$ km en $2$ h. Sa vitesse moyenne est :", choix: ["$75$ km/h", "$300$ km/h", "$152$ km/h", "$50$ km/h"], bonne: 0, explication: "$150 \\div 2 = 75$." },
    { question: "$30$ min, c'est :", choix: ["$0{,}5$ h", "$0{,}3$ h", "$3$ h", "$0{,}03$ h"], bonne: 0, explication: "La moitié d'une heure." },
    { question: "$10\\,\\%$ de $350$ est égal à :", choix: ["$35$", "$3{,}5$", "$340$", "$10$"], bonne: 0, explication: "$10\\,\\%$, c'est diviser par $10$." },
    { question: "$25\\,\\%$ de $80$ est égal à :", choix: ["$20$", "$25$", "$55$", "$40$"], bonne: 0, explication: "$25\\,\\%$, c'est le quart : $80 \\div 4 = 20$." },
    { question: "$12$ élèves sur $50$, cela représente :", choix: ["$24\\,\\%$", "$12\\,\\%$", "$38\\,\\%$", "$6\\,\\%$"], bonne: 0, explication: "$\\dfrac{12}{50} = \\dfrac{24}{100}$." },
    { question: "Un article à $60$ € baisse de $10\\,\\%$. Il coûte maintenant :", choix: ["$54$ €", "$50$ €", "$6$ €", "$59$ €"], bonne: 0, explication: "$60 - 6 = 54$." },
    { question: "Sur un plan à l'échelle $\\dfrac{1}{100}$, $1$ cm représente :", choix: ["$1$ m", "$100$ m", "$10$ cm", "$1$ km"], bonne: 0, explication: "$100$ cm $= 1$ m." },
    { question: "À l'échelle $\\dfrac{1}{50\\,000}$, $4$ cm sur la carte représentent :", choix: ["$2$ km", "$200$ m", "$20$ km", "$50$ km"], bonne: 0, explication: "$4 \\times 50\\,000 = 200\\,000$ cm $= 2$ km." },
    { question: "Une recette pour $4$ personnes demande $200$ g de farine. Pour $6$ personnes, il faut :", choix: ["$300$ g", "$202$ g", "$250$ g", "$1\\,200$ g"], bonne: 0, explication: "$50$ g par personne, $6 \\times 50 = 300$." },
    { question: "Le coefficient de proportionnalité du tableau « $2 \\to 7$ ; $4 \\to 14$ ; $6 \\to 21$ » est :", choix: ["$3{,}5$", "$5$", "$7$", "$2$"], bonne: 0, explication: "$7 \\div 2 = 3{,}5$." },
    { question: "D'après la double droite graduée, combien coûtent $5$ kg de bananes ?", figure: "pp5-qcm-double", choix: ["$12{,}5$ €", "$9{,}5$ €", "$10$ €", "$15$ €"], bonne: 0, explication: "$1$ kg coûte $7{,}5 \\div 3 = 2{,}5$ €, donc $5$ kg coûtent $5 \\times 2{,}5 = 12{,}5$ €. ($9{,}5$ € : on a ajouté $2$, c'est faux.)" },
    { question: "Ce tableau est de proportionnalité. Quel nombre manque ?", figure: "pp5-qcm-tableau", choix: ["$25$", "$19$", "$20$", "$30$"], bonne: 0, explication: "$10 = 4 + 6$, donc on additionne les colonnes : $10 + 15 = 25$ (ou : coefficient $2{,}5$, $10 \\times 2{,}5 = 25$)." },
    { question: "D'après la figure, $25\\,\\%$ de $60$ € valent :", figure: "pp5-qcm-pct", choix: ["$15$ €", "$25$ €", "$35$ €", "$2{,}4$ €"], bonne: 0, explication: "$25\\,\\%$, c'est le quart : $60 \\div 4 = 15$ €." },
    { question: "Un scooter parcourt $20$ km en $30$ min à vitesse constante. Sa vitesse moyenne est :", choix: ["$40$ km/h", "$10$ km/h", "$20$ km/h", "$60$ km/h"], bonne: 0, explication: "$30$ min $= 0{,}5$ h : en $1$ h, il parcourt deux fois plus, $40$ km." },
    { question: "Sur une carte à l'échelle $\\dfrac{1}{25\\,000}$, $8$ cm représentent :", choix: ["$2$ km", "$200$ m", "$20$ km", "$25$ km"], bonne: 0, explication: "$8 \\times 25\\,000 = 200\\,000$ cm $= 2\\,000$ m $= 2$ km." },
    { question: "Dans un village de $400$ habitants, $60$ ont moins de $10$ ans. Cela représente :", choix: ["$15\\,\\%$", "$60\\,\\%$", "$6{,}67\\,\\%$", "$0{,}15\\,\\%$"], bonne: 0, explication: "$\\dfrac{60}{400} = \\dfrac{15}{100}$ : $15\\,\\%$." },
    { question: "Le prix d'un salouva de $35$ € augmente de $20\\,\\%$. Son nouveau prix est :", choix: ["$42$ €", "$55$ €", "$7$ €", "$37$ €"], bonne: 0, explication: "$20\\,\\%$ de $35$ : $35 \\times 20 \\div 100 = 7$ €. Nouveau prix : $35 + 7 = 42$ €." },
    { question: "Quelle situation n'est **pas** une situation de proportionnalité ?", choix: ["Le prix d'un taxi : $3$ € de prise en charge puis $1{,}50$ € par km", "Le prix des bananes vendues $2$ € le kilo", "La distance parcourue à vitesse constante", "Le périmètre d'un carré en fonction de son côté"], bonne: 0, explication: "Avec la prise en charge, $2$ km coûtent $6$ € mais $4$ km coûtent $9$ € (pas le double) : ce n'est pas proportionnel." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Reconnaître un tableau de proportionnalité",
      etapes: [
        "Calcule chaque quotient « nombre du bas $\\div$ nombre du haut ».",
        "S'ils sont tous égaux, c'est un tableau de proportionnalité.",
        "Ce quotient commun est le coefficient de proportionnalité."
      ],
      figure: "pp5-cours-tableau",
      exemple: "$6 \\div 4 = 1{,}5$ et $9 \\div 6 = 1{,}5$ : proportionnel, coefficient $1{,}5$."
    },
    {
      titre: "Compléter un tableau",
      etapes: [
        "Cherche un lien simple entre les colonnes ($\\times 2$, $\\times 3$, somme de deux colonnes).",
        "Sinon, utilise le coefficient ou le retour à l'unité.",
        "Vérifie que ta réponse est vraisemblable."
      ],
      figure: "pp5-cours-methodes",
      exemple: "$3 \\to 12$ ; $9 \\to$ ? : $9 = 3 \\times 3$, donc $36$."
    },
    {
      titre: "Appliquer ou calculer un pourcentage",
      etapes: [
        "Appliquer : multiplie par le pourcentage, puis divise par $100$.",
        "Calculer : écris la proportion, puis ramène-la sur $100$.",
        "Hausse ou baisse : calcule le montant, puis ajoute-le ou retire-le."
      ],
      figure: "pp5-methode-pct",
      exemple: "$15\\,\\%$ de $60$ : $60 \\times 15 \\div 100 = 9$."
    },
    {
      titre: "Utiliser une échelle",
      etapes: [
        "Écris les longueurs dans la même unité (en cm).",
        "Plan $\\to$ réalité : multiplie par $n$ (échelle $\\dfrac{1}{n}$). Réalité $\\to$ plan : divise par $n$.",
        "Convertis le résultat dans une unité adaptée."
      ],
      figure: "pp5-methode-echelle",
      exemple: "Échelle $\\dfrac{1}{200}$ : $3$ cm représentent $600$ cm, soit $6$ m."
    }
  ],
  erreurs: [
    "Ajouter le même nombre au lieu de multiplier : la proportionnalité se fait par multiplication.",
    "Croire que $30$ min $= 0{,}3$ h.",
    "Confondre le pourcentage et le nombre d'éléments.",
    "Oublier d'ajouter ou de retirer le montant d'une hausse ou d'une baisse.",
    "Calculer une échelle avec deux unités différentes (cm et m)."
  ]
};
