/*
  CHAPITRE : CE1 — Comparer, ranger, encadrer
  --------------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE1 :
  - comparer, encadrer, intercaler des nombres jusqu'à 1 000 avec =, < et > ; « supérieur à », « inférieur à », « compris entre » ;
  - ordonner jusqu'à cinq nombres ; placer des nombres sur une demi-droite graduée de un en un, de dix en dix, de cent en cent ;
  - nombres ordinaux jusqu'à cent ; rang et nombre d'éléments qui précèdent ; suites répétitives et évolutives
    (« 1, 2, 4, 7, 11… », « 1, 2, 4, 8, 16… »).
  figure : FIGURES de assets/exercices-ce1.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce1-comparer"] = {
  niveau: "CE1",
  numero: 2,
  titre: "Comparer, ranger, encadrer",
  accroche: "Comparer des nombres à trois chiffres, les ranger, les encadrer, les placer sur une droite graduée, et continuer des suites.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "Comparer des nombres jusqu'à 1 000",
      video: { titre: "Vidéo de Maître Lucas : comparer et ranger les nombres jusqu'à 999", youtube: "https://youtu.be/VI4DUHs3JDE" },
      texte:
        "On compare d'abord les **centaines**, puis les **dizaines**, puis les **unités**.\n\n" +
        "- $412 > 398$ : $4$ centaines, c'est plus que $3$ centaines.\n" +
        "- $536 < 563$ : mêmes centaines, mais $3$ dizaines $<$ $6$ dizaines.\n\n" +
        "« $412$ est **supérieur** à $398$ » ; « $536$ est **inférieur** à $563$ ».\n\n" +
        "Pour ranger, on peut écrire : $229 < 234 < 239 < 243 < 300$ (ordre croissant).",
      exemple: {
        enonce: "Range dans l'ordre décroissant : $705$ ; $750$ ; $570$ ; $507$.",
        solution: "$750 > 705 > 570 > 507$."
      }
    },
    {
      titre: "Encadrer et placer sur une droite graduée",
      video: { titre: "Vidéo de Maître Lucas : utiliser une droite graduée, intercaler des nombres", youtube: "https://youtu.be/cZ9tQ_OV_3g" },
      texte:
        "- Entre deux **dizaines** : $340 < 347 < 350$.\n" +
        "- Entre deux **centaines** : $300 < 347 < 400$.\n" +
        "- « $347$ est **compris entre** $340$ et $350$ ».\n\n" +
        "Sur une droite graduée, on regarde d'abord combien vaut un bond (ici $10$) : de $470$ à $480$, puis on compte.",
      figure: "e1c-cours-droite",
      exemple: {
        enonce: "Quel nombre est au « ? » sur la figure ?",
        solution: "Chaque bond vaut $10$ ; le « ? » est à $6$ bonds de $470$ : $530$."
      }
    },
    {
      titre: "Rangs et suites",
      video: { titre: "Vidéo de Maître Lucas : les suites de nombres", youtube: "https://youtu.be/7kdCpfjRfPM" },
      texte:
        "- Avant le $48$e coureur, il y a $47$ coureurs.\n" +
        "- Dans la suite qui se répète « ABABAB… », les rangs impairs sont des A : la $89$e lettre est A.\n" +
        "- Dans une suite **évolutive**, l'écart change : $1$ ; $2$ ; $4$ ; $7$ ; $11$ ; $16$ (on ajoute $1$, $2$, $3$, $4$, $5$…).\n" +
        "- On peut aussi doubler : $1$ ; $2$ ; $4$ ; $8$ ; $16$ ; $32$…",
      exemple: {
        enonce: "Dans la suite $1$ ; $2$ ; $4$ ; $8$ ; $16$…, quel est le huitième nombre ?",
        solution: "$1$, $2$, $4$, $8$, $16$, $32$, $64$, $128$ : le huitième est $128$."
      }
    }
  ],

  exercices: [
    { type: "e1c-signes", titre: "Comparer avec <, > ou =", etape: "Comparer et ranger", nb: 6 },
    { type: "e1c-ranger", titre: "Ranger des nombres", etape: "Comparer et ranger", nb: 5 },
    { type: "e1c-encadrer", titre: "Encadrer et lire une droite graduée", etape: "Encadrer", nb: 6 },
    { type: "e1c-rangs", titre: "Rangs et suites", etape: "Rangs et suites", nb: 5 }
  ],

  qcm: [
    { question: "$456 \\;\\ldots\\; 465$", choix: ["$<$", "$>$", "$=$"], bonne: 0, explication: "Mêmes centaines ; $5$ dizaines $<$ $6$ dizaines." },
    { question: "$903 \\;\\ldots\\; 899$", choix: ["$>$", "$<$", "$=$"], bonne: 0, explication: "$9$ centaines $>$ $8$ centaines." },
    { question: "« $712$ est supérieur à $698$ » s'écrit :", choix: ["$712 > 698$", "$712 < 698$", "$712 = 698$", "$698 > 712$"], bonne: 0, explication: "Supérieur : signe $>$." },
    { question: "Le plus grand nombre est :", choix: ["$620$", "$602$", "$260$", "$206$"], bonne: 0, explication: "$620$ : $6$ centaines et $2$ dizaines." },
    { question: "Ordre croissant :", choix: ["$128$ ; $182$ ; $218$ ; $281$", "$281$ ; $218$ ; $182$ ; $128$", "$128$ ; $218$ ; $182$ ; $281$", "$182$ ; $128$ ; $218$ ; $281$"], bonne: 0, explication: "Du plus petit au plus grand." },
    { question: "Complète : $\\ldots < 538 < 540$", choix: ["$530$", "$500$", "$537$", "$539$"], bonne: 0, explication: "Les deux dizaines autour de $538$ : $530$ et $540$." },
    { question: "Complète : $700 < 764 < \\ldots$", choix: ["$800$", "$770$", "$765$", "$1\\,000$"], bonne: 0, explication: "Centaines : $700$ et $800$." },
    { question: "Un nombre compris entre $390$ et $400$ :", choix: ["$397$", "$307$", "$401$", "$39$"], bonne: 0, explication: "$390 < 397 < 400$." },
    { question: "Sur une droite graduée de $100$ en $100$, après $200$ vient :", choix: ["$300$", "$201$", "$210$", "$2\\,000$"], bonne: 0, explication: "On ajoute $100$ à chaque bond." },
    { question: "Quel nombre est au point A ?", figure: "e1c-qcm-droite", choix: ["$700$", "$250$", "$205$", "$600$"], bonne: 0, explication: "Un bond vaut $100$ ; A est à $5$ bonds de $200$." },
    { question: "Combien de coureurs arrivent avant le soixantième ?", choix: ["$59$", "$60$", "$61$", "$6$"], bonne: 0, explication: "Un de moins que le rang." },
    { question: "Dans « ABABAB… », la $40$e lettre est :", choix: ["B", "A", "C", "on ne peut pas savoir"], bonne: 0, explication: "Les rangs pairs sont des B." },
    { question: "Suite $1$ ; $2$ ; $4$ ; $7$ ; $11$ ; … Le nombre suivant est :", choix: ["$16$", "$15$", "$14$", "$22$"], bonne: 0, explication: "On ajoute $1$, $2$, $3$, $4$, puis $5$ : $11 + 5 = 16$." },
    { question: "Suite $3$ ; $6$ ; $12$ ; $24$ ; … Le nombre suivant est :", choix: ["$48$", "$27$", "$36$", "$30$"], bonne: 0, explication: "On double : $24 \\times 2 = 48$." },
    { question: "Le nombre juste avant $500$ est :", choix: ["$499$", "$490$", "$501$", "$400$"], bonne: 0, explication: "$500 - 1 = 499$." },
    { question: "« Inférieur à » veut dire :", choix: ["plus petit que", "plus grand que", "égal à", "à côté de"], bonne: 0, explication: "Inférieur : plus petit." },
    { question: "$608 \\;\\ldots\\; 6$ centaines et $8$ unités", choix: ["$=$", "$<$", "$>$"], bonne: 0, explication: "$600 + 8 = 608$." },
    { question: "Quel nombre est entre $299$ et $301$ ?", choix: ["$300$", "$290$", "$310$", "$302$"], bonne: 0, explication: "$299$, $300$, $301$." }
  ],

  methode: [
    {
      titre: "Comparer deux nombres à trois chiffres",
      etapes: [
        "Compare les centaines.",
        "Si elles sont égales, compare les dizaines.",
        "Si elles sont encore égales, compare les unités."
      ],
      exemple: "$473$ et $437$ : mêmes centaines, $7 > 3$ dizaines, donc $473 > 437$."
    },
    {
      titre: "Lire une droite graduée",
      etapes: [
        "Regarde deux nombres écrits qui se suivent pour trouver la valeur d'un bond.",
        "Compte les bonds jusqu'au point.",
        "Multiplie le nombre de bonds par la valeur d'un bond, puis ajoute le résultat au nombre de départ."
      ],
      figure: "e1c-cours-droite",
      exemple: "Bonds de $10$, $6$ bonds après $470$ : $530$."
    }
  ],
  erreurs: [
    "Comparer les unités avant les centaines.",
    "Croire qu'un nombre est plus grand parce qu'il a de « grands chiffres » : $199 < 201$.",
    "Penser qu'un bond vaut toujours $1$ sur une droite graduée.",
    "Compter le coureur lui-même parmi ceux qui sont arrivés avant.",
    "Dans une suite évolutive, ajouter toujours le même nombre."
  ]
};
