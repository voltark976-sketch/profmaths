/*
  CHAPITRE : 6e — Proportionnalité
  ---------------------------------
  Programme de mathématiques du cycle 3 (BO n° 16 du 17 avril 2025), en vigueur en 6e depuis la rentrée 2025 :
  définition de la proportionnalité entre deux grandeurs, reliée à des expressions de la vie courante (« prix au kilo ») ;
  reconnaître le « modèle » de la proportionnalité ; résoudre un problème par la linéarité multiplicative ou additive
  ou par le retour à l'unité ; représenter par un tableau (nom et unité de chaque grandeur) ; initiation aux échelles.
  Le programme précise que le « produit en croix » n'est pas enseigné : il n'apparaît pas dans ce chapitre,
  et le coefficient de proportionnalité n'est pas nommé.
  Mêmes règles d'écriture que data/sixieme/nombres-entiers-decimaux.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["sixieme-proportionnalite"] = {
  niveau: "6e",
  numero: 5,
  titre: "Proportionnalité",
  accroche: "Reconnaître une situation de proportionnalité, puis trouver une valeur manquante : en multipliant, en ajoutant, ou en passant par le prix pour 1.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : proportionnalité (PDF)", url: "https://www.maths-et-tiques.fr/telech/25Proportion.pdf" }
  ],
  liens: [
    { titre: "Tout le cours en vidéo (Yvan Monka)", url: "https://youtu.be/2U8Sgwnmy9g", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Qu'est-ce que la proportionnalité ?",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître la proportionnalité sans tableau", youtube: "https://youtu.be/7DSHIDWM-ss" },
      texte:
        "Deux grandeurs sont **proportionnelles** quand, si l'on multiplie (ou divise) l'une par un nombre, l'autre est multipliée (ou divisée) par **le même nombre**.\n\n" +
        "Dans la vie courante, on le reconnaît à des expressions comme « $2{,}50$ € **le kilo** », « $1{,}96$ € **le litre** », « $70$ battements **par minute** » : la quantité pour $1$ est toujours la même.\n\n" +
        "- Le prix de mangues vendues au kilo est proportionnel à la masse achetée.\n" +
        "- La taille d'un enfant n'est **pas** proportionnelle à son âge.\n" +
        "- Un taxi avec une prise en charge fixe n'est **pas** proportionnel à la distance : on paie une somme même pour $0$ km.",
      exemple: {
        enonce: "Au marché, $2$ kg de pommes coûtent $5$ € et $6$ kg coûtent $15$ €. À $10$ ans, Chipie mesurait $1{,}20$ m et à $20$ ans $1{,}70$ m. Quelles situations sont proportionnelles ?",
        solution: "Pommes : la masse est multipliée par $3$ ($2 \\times 3 = 6$) et le prix aussi ($5 \\times 3 = 15$) : c'est proportionnel.\n\nTaille : l'âge est multiplié par $2$, mais pas la taille ($1{,}20 \\times 2 = 2{,}40$, et non $1{,}70$) : ce n'est pas proportionnel."
      }
    },
    {
      titre: "Le tableau de proportionnalité",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître la proportionnalité avec un tableau", youtube: "https://youtu.be/fhO6OWYzVno" },
      texte:
        "On range les valeurs dans un tableau, en écrivant **le nom et l'unité** de chaque grandeur.\n\n" +
        "C'est un tableau de proportionnalité si l'on trouve **toujours la même quantité pour $1$** (le même prix pour $1$ tour, pour $1$ kg…).\n\n" +
        "Dans l'exemple, $5 \\div 2 = 2{,}5$ ; $10 \\div 4 = 2{,}5$ ; $15 \\div 6 = 2{,}5$ : un tour coûte toujours $2{,}50$ €.\n\n" +
        "Attention : il ne suffit pas que les deux lignes augmentent.",
      exemple: {
        enonce: "Le prix est-il proportionnel au nombre de tours de manège ?",
        solution: "Pour $1$ tour : $5 \\div 2 = 2{,}5$ ; $10 \\div 4 = 2{,}5$ ; $15 \\div 6 = 2{,}5$. Le prix pour $1$ tour est toujours $2{,}50$ € : c'est un tableau de proportionnalité.",
        tableau: { lignes: [["\\text{Nombre de tours}", "2", "4", "6"], ["\\text{Prix en €}", "5", "10", "15"]] }
      }
    },
    {
      titre: "Multiplier ou diviser les deux grandeurs",
      video: { titre: "Vidéo d'Yvan Monka : utiliser la proportionnalité sans tableau", youtube: "https://youtu.be/X0knMBxYcGg" },
      texte:
        "Dans une situation de proportionnalité, si une grandeur est **multipliée** par un nombre, l'autre est multipliée par le même nombre. Si elle est **divisée**, l'autre aussi.\n\n" +
        "$6$ effaceurs coûtent $9$ €. Pour $3$ effaceurs (deux fois moins), on paie deux fois moins : $9 \\div 2 = 4{,}50$ €. Pour $12$ effaceurs (deux fois plus) : $9 \\times 2 = 18$ €.\n\n" +
        "« $4$ fois plus », c'est multiplier par $4$ ; « $5$ fois moins », c'est diviser par $5$.",
      exemple: {
        enonce: "$3$ kg de riz coûtent $4{,}20$ €. Combien coûtent $12$ kg ? Et $1{,}5$ kg ?",
        solution: "$12 = 3 \\times 4$ : $4{,}20 \\times 4 = 16{,}80$ €.\n\n$1{,}5 = 3 \\div 2$ : $4{,}20 \\div 2 = 2{,}10$ €."
      }
    },
    {
      titre: "Ajouter ou soustraire",
      video: { titre: "Vidéo d'Yvan Monka : utiliser la proportionnalité", youtube: "https://youtu.be/gdiHWNjB7FQ" },
      texte:
        "Si l'on connaît la valeur pour deux quantités, on connaît aussi la valeur pour leur **somme** (ou leur **différence**).\n\n" +
        "$6$ effaceurs coûtent $9$ € et $3$ effaceurs coûtent $4{,}50$ €. Comme $9 = 6 + 3$, $9$ effaceurs coûtent $9 + 4{,}50 = 13{,}50$ €.",
      exemple: {
        enonce: "$4$ pains coûtent $7$ € et $6$ pains coûtent $10{,}50$ €. Combien coûtent $10$ pains ? Et $2$ pains ?",
        solution: "$10 = 4 + 6$ : $7 + 10{,}50 = 17{,}50$ €.\n\n$2 = 6 - 4$ : $10{,}50 - 7 = 3{,}50$ €."
      }
    },
    {
      titre: "Le retour à l'unité",
      video: { titre: "Vidéo d'Yvan Monka : utiliser la proportionnalité avec un tableau", youtube: "https://youtu.be/LKnPi7axexk" },
      texte:
        "Quand les nombres ne se « voient » pas l'un dans l'autre, on calcule d'abord la valeur pour **une** unité, puis on multiplie.\n\n" +
        "$6$ effaceurs coûtent $9$ €, donc $1$ effaceur coûte $9 \\div 6 = 1{,}50$ €, et $5$ effaceurs coûtent $1{,}50 \\times 5 = 7{,}50$ €.\n\n" +
        "On choisit la méthode la plus simple avec les nombres de l'énoncé, et on écrit les **unités** dans les calculs.",
      exemple: {
        enonce: "Au repos, le cœur de Nadia bat $210$ fois en $3$ minutes. Combien de fois bat-il en $7$ minutes ?",
        solution: "En $1$ minute : $210 \\div 3 = 70$ battements. En $7$ minutes : $70 \\times 7 = 490$ battements."
      }
    },
    {
      titre: "Les échelles",
      texte:
        "Sur un **plan** ou une **carte**, les longueurs sont proportionnelles aux longueurs réelles.\n\n" +
        "Si $1$ cm sur le plan représente $20$ m dans la réalité, un bâtiment de $6{,}5$ cm sur le plan mesure $6{,}5 \\times 20 = 130$ m.\n\n" +
        "Dans l'autre sens, une longueur réelle de $90$ m mesure $90 \\div 20 = 4{,}5$ cm sur le plan.\n\n" +
        "De même, quand on **agrandit** une photo, toutes les longueurs sont multipliées par le même nombre.",
      exemple: {
        enonce: "Sur une carte de Mayotte, $1$ cm représente $2$ km. Entre Mamoudzou et Sada, on mesure environ $8$ cm à vol d'oiseau. Quelle est la distance réelle ?",
        solution: "$8 \\times 2 = 16$ : environ $16$ km à vol d'oiseau.",
        tableau: { lignes: [["\\text{Carte en cm}", "1", "8"], ["\\text{Réalité en km}", "2", "16"]] }
      }
    }
  ],

  videosNote: "Méthodes expliquées pas à pas par Yvan Monka (maths-et-tiques).",
  videos: [
    { titre: "Reconnaître la proportionnalité dans un tableau (lignes)", type: "Tableau", youtube: "https://youtu.be/TN9RFjWGf6Y" },
    { titre: "Utiliser la proportionnalité sans tableau", type: "Problème", youtube: "https://youtu.be/gdiHWNjB7FQ" }
  ],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "p6-reconnaitre", titre: "Est-ce une situation de proportionnalité ?", etape: "Reconnaître la proportionnalité", nb: 5 },
    { type: "p6-lineaire-mult", titre: "Deux fois plus, trois fois moins…", etape: "Trouver une valeur manquante", nb: 6 },
    { type: "p6-lineaire-add", titre: "Ajouter ou soustraire deux colonnes", etape: "Trouver une valeur manquante", nb: 5 },
    { type: "p6-unite", titre: "Le retour à l'unité", etape: "Trouver une valeur manquante", nb: 6 },
    { type: "p6-tableau", titre: "Compléter un tableau de proportionnalité", etape: "Trouver une valeur manquante", nb: 5 },
    { type: "p6-echelle", titre: "Plans, cartes et agrandissements", etape: "Échelles et problèmes", nb: 5 },
    { type: "p6-probleme", titre: "Recettes, consommation, salaire", etape: "Échelles et problèmes", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Quelle situation est une situation de proportionnalité ?", choix: ["Le prix de mangues vendues $2{,}50$ € le kilo", "La taille d'un enfant selon son âge", "La température selon l'heure de la journée", "Le prix d'un taxi avec une prise en charge de $3$ €"], bonne: 0, explication: "Un prix « au kilo » fixe : le prix est proportionnel à la masse. Les trois autres ne le sont pas." },
    { question: "$2$ kg de pommes coûtent $5$ €. Si c'est proportionnel, $6$ kg coûtent :", choix: ["$15$ €", "$9$ €", "$10$ €", "$30$ €"], bonne: 0, explication: "$6 = 2 \\times 3$, donc $5 \\times 3 = 15$ €." },
    { question: "Un taxi-brousse coûte $2$ € de prise en charge plus $1$ € par km. Le prix est-il proportionnel à la distance ?", choix: ["Non : $5$ km coûtent $7$ € mais $10$ km coûtent $12$ €, pas $14$ €", "Oui : on paie $1$ € par km", "Oui : plus on va loin, plus on paie", "On ne peut pas savoir"], bonne: 0, explication: "Quand la distance double, le prix ne double pas, à cause de la prise en charge." },
    { question: "Dans un tableau de proportionnalité « nombre de tours » / « prix en € », on lit $2 \\rightarrow 5$ et $4 \\rightarrow 10$. Le prix pour $1$ tour est :", choix: ["$2{,}50$ €", "$3$ €", "$5$ €", "$0{,}40$ €"], bonne: 0, explication: "$5 \\div 2 = 2{,}5$ et $10 \\div 4 = 2{,}5$." },
    { question: "Lequel de ces tableaux (quantité → prix) est un tableau de proportionnalité ?", choix: ["$1 \\rightarrow 3$ ; $2 \\rightarrow 6$ ; $5 \\rightarrow 15$", "$1 \\rightarrow 3$ ; $2 \\rightarrow 5$ ; $5 \\rightarrow 15$", "$1 \\rightarrow 3$ ; $2 \\rightarrow 4$ ; $5 \\rightarrow 7$", "$1 \\rightarrow 3$ ; $2 \\rightarrow 6$ ; $5 \\rightarrow 12$"], bonne: 0, explication: "Le prix pour $1$ est toujours $3$ : $6 \\div 2 = 3$ et $15 \\div 5 = 3$." },
    { question: "Les deux lignes d'un tableau augmentent. Peut-on dire que c'est un tableau de proportionnalité ?", choix: ["Non, il faut vérifier que la quantité pour $1$ est toujours la même", "Oui, toujours", "Oui, si les nombres sont entiers", "Non, jamais"], bonne: 0, explication: "Augmenter ne suffit pas : la taille d'un enfant augmente avec l'âge sans être proportionnelle." },
    { question: "$6$ effaceurs coûtent $9$ €. Combien coûtent $3$ effaceurs ?", choix: ["$4{,}50$ €", "$6$ €", "$3$ €", "$18$ €"], bonne: 0, explication: "$3 = 6 \\div 2$, donc $9 \\div 2 = 4{,}50$ €." },
    { question: "$4$ pains coûtent $7$ € et $6$ pains $10{,}50$ €. Combien coûtent $10$ pains ?", choix: ["$17{,}50$ €", "$13$ €", "$70$ €", "$14$ €"], bonne: 0, explication: "$10 = 4 + 6$, donc $7 + 10{,}50 = 17{,}50$ €." },
    { question: "$5$ cahiers coûtent $7{,}50$ €. Combien coûte $1$ cahier ?", choix: ["$1{,}50$ €", "$2{,}50$ €", "$37{,}50$ €", "$1{,}05$ €"], bonne: 0, explication: "$7{,}50 \\div 5 = 1{,}50$ €." },
    { question: "$5$ cahiers coûtent $7{,}50$ €. Combien coûtent $7$ cahiers ?", choix: ["$10{,}50$ €", "$9{,}50$ €", "$12$ €", "$52{,}50$ €"], bonne: 0, explication: "Pour $1$ : $1{,}50$ €. Pour $7$ : $1{,}50 \\times 7 = 10{,}50$ €. $9{,}50$ € vient de l'erreur « $+ 2$ »." },
    { question: "« $4$ fois moins », c'est :", choix: ["diviser par $4$", "multiplier par $4$", "enlever $4$", "ajouter $4$"], bonne: 0, explication: "« $4$ fois plus » : $\\times 4$ ; « $4$ fois moins » : $\\div 4$." },
    { question: "Le cœur de Nadia bat $210$ fois en $3$ minutes. En $1$ minute, il bat :", choix: ["$70$ fois", "$630$ fois", "$207$ fois", "$30$ fois"], bonne: 0, explication: "$210 \\div 3 = 70$." },
    { question: "Pour $4$ personnes, il faut $200$ g de farine. Pour $6$ personnes, il faut :", choix: ["$300$ g", "$202$ g", "$250$ g", "$1\\,200$ g"], bonne: 0, explication: "Pour $2$ personnes : $100$ g. Pour $6 = 4 + 2$ : $200 + 100 = 300$ g." },
    { question: "Une voiture consomme $6$ L pour $100$ km. Pour $250$ km, elle consomme :", choix: ["$15$ L", "$12$ L", "$156$ L", "$25$ L"], bonne: 0, explication: "$100$ km → $6$ L ; $50$ km → $3$ L ; $250$ km $= 2 \\times 100 + 50$ → $6 + 6 + 3 = 15$ L." },
    { question: "Sur un plan, $1$ cm représente $20$ m. Un bâtiment de $6{,}5$ cm sur le plan mesure en réalité :", choix: ["$130$ m", "$26{,}5$ m", "$13$ m", "$1\\,300$ m"], bonne: 0, explication: "$6{,}5 \\times 20 = 130$ m." },
    { question: "Sur une carte, $1$ cm représente $5$ km. Une distance réelle de $35$ km mesure sur la carte :", choix: ["$7$ cm", "$175$ cm", "$30$ cm", "$40$ cm"], bonne: 0, explication: "$35 \\div 5 = 7$ cm." },
    { question: "On agrandit une photo : un côté de $10$ cm devient $30$ cm. Un côté de $6$ cm devient :", choix: ["$18$ cm", "$26$ cm", "$36$ cm", "$12$ cm"], bonne: 0, explication: "Les longueurs sont multipliées par $3$ : $6 \\times 3 = 18$ cm. $26$ cm vient de l'erreur « $+ 20$ »." },
    { question: "Moinécha gagne $20$ € en $2$ heures de baby-sitting. Au même tarif, en $5$ heures, elle gagne :", choix: ["$50$ €", "$23$ €", "$100$ €", "$40$ €"], bonne: 0, explication: "En $1$ heure : $10$ €. En $5$ heures : $50$ €." },
    { question: "Dans un tableau de proportionnalité, on doit écrire :", choix: ["le nom et l'unité de chaque grandeur", "seulement des nombres entiers", "les nombres dans l'ordre croissant", "un nombre plus grand en bas qu'en haut"], bonne: 0, explication: "Par exemple « Masse en kg » et « Prix en € » : on sait ce que représente chaque nombre." },
    { question: "$3$ L d'essence coûtent $5{,}85$ €. Combien coûtent $9$ L ?", choix: ["$17{,}55$ €", "$11{,}85$ €", "$15{,}55$ €", "$1{,}95$ €"], bonne: 0, explication: "$9 = 3 \\times 3$, donc $5{,}85 \\times 3 = 17{,}55$ €. $1{,}95$ € est le prix d'un litre." },
    { question: "Quelle situation n'est pas une situation de proportionnalité ?", choix: ["Un abonnement de cantine de $30$ € par mois, quel que soit le nombre de repas", "Le prix de tickets de bus à $1{,}50$ € l'un", "La distance parcourue à vitesse constante selon la durée", "La quantité de farine selon le nombre de gâteaux identiques"], bonne: 0, explication: "Le prix de l'abonnement ne change pas avec le nombre de repas." },
    { question: "$7$ tickets coûtent $10{,}50$ € et $5$ tickets $7{,}50$ €. Combien coûtent $2$ tickets ?", choix: ["$3$ €", "$18$ €", "$2{,}50$ €", "$1{,}50$ €"], bonne: 0, explication: "$2 = 7 - 5$, donc $10{,}50 - 7{,}50 = 3$ €." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Reconnaître une situation de proportionnalité",
      etapes: [
        "Cherche par combien est multipliée (ou divisée) la première grandeur.",
        "Vérifie si la seconde est multipliée (ou divisée) par le même nombre.",
        "Ou bien calcule la quantité pour $1$ dans chaque cas : elle doit toujours être la même."
      ],
      exemple: "$2$ kg → $5$ € et $6$ kg → $15$ € : $\\times 3$ et $\\times 3$, c'est proportionnel."
    },
    {
      titre: "Choisir sa méthode pour une valeur manquante",
      etapes: [
        "Une quantité est « $2$ fois », « $3$ fois »… l'autre ? Multiplie ou divise.",
        "Une quantité est la somme (ou la différence) de deux autres ? Ajoute (ou soustrais) les valeurs.",
        "Sinon, passe par la valeur pour $1$ (retour à l'unité), puis multiplie."
      ],
      exemple: "$6$ effaceurs → $9$ € : $3$ effaceurs → $4{,}50$ € ; $9$ effaceurs → $13{,}50$ € ; $5$ effaceurs → $7{,}50$ €."
    },
    {
      titre: "Compléter un tableau de proportionnalité",
      etapes: [
        "Vérifie que le tableau porte le nom et l'unité de chaque grandeur.",
        "Cherche un lien entre la colonne « ? » et une autre colonne (multiple, somme).",
        "À défaut, calcule la valeur pour $1$ et multiplie."
      ],
      exemple: "$3 \\rightarrow 4{,}20$ € ; pour $12 = 3 \\times 4$ : $16{,}80$ €."
    },
    {
      titre: "Utiliser une échelle",
      etapes: [
        "Repère ce que représente $1$ cm (ou $1$ unité) sur le plan.",
        "Du plan à la réalité : multiplie. De la réalité au plan : divise.",
        "Garde les bonnes unités (cm sur le plan, m ou km en vrai)."
      ],
      exemple: "$1$ cm → $20$ m : $6{,}5$ cm → $130$ m ; $90$ m → $4{,}5$ cm."
    }
  ],
  erreurs: [
    "Croire que deux grandeurs qui augmentent ensemble sont toujours proportionnelles (la taille et l'âge).",
    "Oublier une somme fixe (prise en charge, abonnement) : la situation n'est plus proportionnelle.",
    "Ajouter le même nombre aux deux grandeurs : pour $7$ cahiers au lieu de $5$, on ne paie pas $2$ € de plus.",
    "Confondre « $4$ fois moins » ($\\div 4$) et « $4$ de moins » ($- 4$).",
    "Oublier les unités dans le tableau ou dans la réponse.",
    "Inverser l'échelle : de la réalité au plan, on divise."
  ]
};
