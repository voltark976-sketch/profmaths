/*
  CHAPITRE : 5e — Graphiques et grandeurs en fonction d'une autre
  ----------------------------------------------------------------
  Programme de mathématiques du cycle 4 (BO n° 10 du 5 mars 2026), en vigueur en 5e à la rentrée 2026 :
  « Fonctions » : introduire l'expression « en fonction de » ; produire, lire et interpréter un tableau de valeurs ;
  placer des points dans un repère ; lire et interpréter un graphique (courbe ou nuage de points) ; traduire une
  formule par un tableau de valeurs ; produire une formule simple ; caractériser graphiquement la proportionnalité.
  « Proportionnalité » : représenter et reconnaitre une situation de proportionnalité par un graphique.
  Pas de notation f(x) ni de vocabulaire « image, antécédent » (4e et 3e).
  figure : "gf5-rando" ou "gf5-prop" (assets/exercices-cinquieme.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cinquieme-graphiques"] = {
  niveau: "5e",
  numero: 10,
  titre: "Graphiques et grandeurs en fonction d'une autre",
  accroche: "Une distance en fonction du temps, un prix en fonction d'une quantité : lire un graphique, utiliser une formule et reconnaître la proportionnalité sur un dessin.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : proportionnalité et graphiques (PDF)", url: "https://www.maths-et-tiques.fr/telech/26Prop2.pdf" }
  ],
  liens: [
    { titre: "Lire et interpréter un graphique (Yvan Monka)", url: "https://youtu.be/CR4lSAfho5A", type: "video" },
    { titre: "Appliquer une formule (Yvan Monka)", url: "https://youtu.be/FOSVfFdDi7w", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Une grandeur en fonction d'une autre",
      video: { titre: "Vidéo d'Yvan Monka : exprimer en fonction de…", youtube: "https://youtu.be/bpYh7tvfI_Y" },
      texte:
        "Quand une grandeur dépend d'une autre, on dit qu'elle s'exprime **en fonction de** cette autre grandeur : le prix payé en fonction du nombre de cahiers, la distance parcourue en fonction du temps.\n\n" +
        "Cette dépendance peut être donnée par :\n\n" +
        "- une **formule** : $P = 3 \\times n$ ;\n" +
        "- un **tableau de valeurs** ;\n" +
        "- un **graphique** dans un repère : la première grandeur sur l'axe horizontal, la seconde sur l'axe vertical.",
      figure: "gf5-cours-taxi",
      exemple: {
        enonce: "Un taxi facture $4$ € de prise en charge, puis $2$ € par kilomètre. Écris le prix $P$ en fonction de la distance $d$ (en km).",
        solution: "$P = 4 + 2 \\times d$. Pour $d = 10$ km : $P = 4 + 20 = 24$ €."
      }
    },
    {
      titre: "Utiliser une formule",
      video: { titre: "Vidéo d'Yvan Monka : appliquer une formule (substitution)", youtube: "https://youtu.be/FOSVfFdDi7w" },
      texte:
        "Pour calculer avec une formule, on **remplace** la lettre par sa valeur (c'est une substitution), en remettant le signe $\\times$, puis on respecte les priorités.\n\n" +
        "Avec $M = 2 \\times n + 5$ : pour $n = 0$, $M = 5$ ; pour $n = 3$, $M = 11$ ; pour $n = 10$, $M = 25$. On peut ranger ces résultats dans un **tableau de valeurs**.",
      figure: "gf5-cours-tableau",
      exemple: {
        enonce: "Le périmètre d'un rectangle est $P = 2 \\times (L + \\ell)$. Calcule $P$ pour $L = 7$ cm et $\\ell = 4$ cm.",
        solution: "$P = 2 \\times (7 + 4) = 2 \\times 11 = 22$ cm."
      }
    },
    {
      titre: "Lire un graphique",
      video: { titre: "Vidéo d'Yvan Monka : construire et lire un graphique", youtube: "https://youtu.be/i3js20bsfgc" },
      texte:
        "Sur le graphique, la distance parcourue par un randonneur est donnée **en fonction** de la durée de marche.\n\n" +
        "- Pour lire la distance au bout de $4$ h, on part de $4$ sur l'axe horizontal, on monte jusqu'à la courbe, puis on lit sur l'axe vertical : $11$ km.\n" +
        "- Un morceau de courbe **horizontal** signifie que la distance ne change pas : c'est une pause (entre $2$ h et $3$ h).",
      figure: "gf5-rando",
      exemple: {
        enonce: "Sur le graphique, au bout de combien de temps le randonneur a-t-il parcouru $4$ km ? Quelle distance a-t-il parcourue en tout ?",
        solution: "On part de $4$ sur l'axe vertical : la courbe est atteinte à $1$ h.\n\nLe dernier point est à $14$ km : il a parcouru $14$ km en $5$ h."
      }
    },
    {
      titre: "Proportionnalité et graphique",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître graphiquement la proportionnalité", youtube: "https://youtu.be/VSmXKN5pS-Q" },
      texte:
        "**Propriété** : une situation de proportionnalité est représentée par des points **alignés avec l'origine** du repère.\n\n" +
        "Réciproquement, si les points sont alignés avec l'origine, la situation est une situation de proportionnalité.\n\n" +
        "Des points alignés sur une droite qui ne passe pas par l'origine (un taxi avec prise en charge) ne représentent pas une situation de proportionnalité.",
      figure: "gf5-prop",
      exemple: {
        enonce: "Le graphique représente-t-il une situation de proportionnalité ? Quel est le prix d'un kilogramme ?",
        solution: "Les points sont alignés avec l'origine : c'est une situation de proportionnalité. $1$ kg coûte $3$ € (et $2$ kg, $6$ €)."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "gf5-formule", titre: "Calculer avec une formule", etape: "Formules et tableaux", nb: 6 },
    { type: "gf5-produire", titre: "Écrire une formule", etape: "Formules et tableaux", nb: 5 },
    { type: "gf5-lire", titre: "Lire un graphique", etape: "Graphiques", nb: 6 },
    { type: "gf5-proportionnalite", titre: "Reconnaître la proportionnalité sur un graphique", etape: "Graphiques", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Avec $P = 5 \\times n$, pour $n = 7$ on obtient :", choix: ["$35$", "$12$", "$57$", "$2$"], bonne: 0, explication: "$5 \\times 7 = 35$." },
    { question: "Avec $M = 3 \\times n + 2$, pour $n = 4$ on obtient :", choix: ["$14$", "$20$", "$9$", "$34$"], bonne: 0, explication: "$12 + 2 = 14$." },
    { question: "Un livre coûte $8$ €. Le prix $P$ de $n$ livres est :", choix: ["$P = 8 \\times n$", "$P = 8 + n$", "$P = n \\div 8$", "$P = 8$"], bonne: 0, explication: "On multiplie le prix d'un livre par le nombre de livres." },
    { question: "Une location coûte $15$ € plus $3$ € par heure. Le prix pour $h$ heures est :", choix: ["$P = 15 + 3 \\times h$", "$P = 18 \\times h$", "$P = 15 \\times h + 3$", "$P = 3 \\times h$"], bonne: 0, explication: "$15$ € une fois, $3$ € par heure." },
    { question: "Sur le graphique, la distance parcourue au bout de $2$ h est :", figure: "gf5-rando", choix: ["$8$ km", "$4$ km", "$2$ km", "$11$ km"], bonne: 0, explication: "On lit $8$ km sur l'axe vertical." },
    { question: "Sur le graphique, le randonneur fait une pause :", figure: "gf5-rando", choix: ["entre $2$ h et $3$ h", "entre $0$ h et $1$ h", "entre $4$ h et $5$ h", "il ne fait pas de pause"], bonne: 0, explication: "La courbe est horizontale entre $2$ h et $3$ h." },
    { question: "Sur le graphique, il a parcouru $11$ km au bout de :", figure: "gf5-rando", choix: ["$4$ h", "$3$ h", "$5$ h", "$11$ h"], bonne: 0, explication: "On part de $11$ sur l'axe vertical." },
    { question: "Sur un graphique « distance en fonction du temps », la durée se lit :", choix: ["sur l'axe horizontal", "sur l'axe vertical", "sur la courbe seulement", "à l'origine"], bonne: 0, explication: "La grandeur dont l'autre dépend est en abscisse." },
    { question: "Une situation de proportionnalité est représentée par des points :", choix: ["alignés avec l'origine", "alignés, peu importe l'origine", "sur une courbe", "tous à la même hauteur"], bonne: 0, explication: "C'est la propriété graphique de la proportionnalité." },
    { question: "Le graphique représente :", figure: "gf5-prop", choix: ["une situation de proportionnalité", "une situation qui n'est pas de proportionnalité", "une pause", "une baisse de prix"], bonne: 0, explication: "Points alignés avec l'origine." },
    { question: "Sur le graphique, $4$ kg coûtent :", figure: "gf5-prop", choix: ["$12$ €", "$4$ €", "$7$ €", "$15$ €"], bonne: 0, explication: "On lit $12$ au-dessus de $4$." },
    { question: "Le prix d'un taxi ($3$ € plus $2$ € par km) est représenté par des points :", choix: ["alignés, mais pas avec l'origine", "alignés avec l'origine", "non alignés", "sur l'axe horizontal"], bonne: 0, explication: "Pour $0$ km, on paie déjà $3$ € : ce n'est pas proportionnel." },
    { question: "Avec $P = 2 \\times (L + 3)$, pour $L = 5$ :", choix: ["$16$", "$13$", "$10$", "$30$"], bonne: 0, explication: "$2 \\times 8 = 16$." },
    { question: "Dans le tableau de $M = 4 \\times n + 1$, pour $n = 0$, on lit :", choix: ["$1$", "$0$", "$4$", "$5$"], bonne: 0, explication: "$4 \\times 0 + 1 = 1$." },
    { question: "D'après le graphique, combien coûte une course de $3$ km ?", figure: "gf5-cours-taxi", choix: ["$10$ €", "$6$ €", "$3$ €", "$12$ €"], bonne: 0, explication: "On part de $3$ sur l'axe horizontal, on monte jusqu'à la droite et on lit $10$ € sur l'axe vertical ($4 + 2 \\times 3 = 10$)." },
    { question: "Ce graphique (taxi avec prise en charge) représente-t-il une situation de proportionnalité ?", figure: "gf5-cours-taxi", choix: ["Non : la droite ne passe pas par l'origine", "Oui : les points sont alignés", "Oui : le prix augmente avec la distance", "On ne peut pas savoir"], bonne: 0, explication: "Pour $0$ km, on paie déjà $4$ € : la droite ne passe pas par l'origine, ce n'est pas une situation de proportionnalité." },
    { question: "Ce nuage de points représente-t-il une situation de proportionnalité ?", figure: "gf5-qcm-nuage", choix: ["Non : les points ne sont pas alignés", "Oui : les points montent", "Non : la droite ne passe pas par l'origine", "Oui : il y a cinq points"], bonne: 0, explication: "Avec une règle, on voit que les points ne sont pas alignés : ce n'est pas une situation de proportionnalité." },
    { question: "Avec la formule $d = 15 \\times t$, pour $t = 4$ on obtient :", choix: ["$60$", "$19$", "$154$", "$11$"], bonne: 0, explication: "$15 \\times 4 = 60$." },
    { question: "Quelle formule donne le périmètre $P$ d'un carré de côté $c$ ?", choix: ["$P = 4 \\times c$", "$P = c \\times c$", "$P = c + 4$", "$P = 2 \\times c$"], bonne: 0, explication: "Un carré a quatre côtés de même longueur $c$." },
    { question: "Dans le tableau de valeurs de $P = 2 \\times n + 1$, pour $n = 5$, on écrit :", choix: ["$11$", "$12$", "$15$", "$8$"], bonne: 0, explication: "$2 \\times 5 + 1 = 10 + 1 = 11$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer avec une formule",
      etapes: [
        "Remplace la lettre par sa valeur, en rétablissant le signe $\\times$.",
        "Applique les priorités opératoires.",
        "Écris l'unité du résultat."
      ],
      figure: "gf5-cours-tableau",
      exemple: "$P = 4 + 2 \\times d$, $d = 6$ : $P = 4 + 12 = 16$ €."
    },
    {
      titre: "Écrire une formule",
      etapes: [
        "Repère ce qui est payé (ou ajouté) une seule fois, et ce qui dépend de la quantité.",
        "Écris « quantité fois prix unitaire » puis ajoute la partie fixe.",
        "Vérifie ta formule avec une valeur simple."
      ],
      figure: "gf5-cours-taxi",
      exemple: "$10$ € plus $2$ € par film : $P = 10 + 2 \\times f$."
    },
    {
      titre: "Lire un graphique",
      etapes: [
        "Repère ce qui est sur chaque axe et les unités.",
        "Pour une valeur de l'axe horizontal, monte jusqu'à la courbe puis lis sur l'axe vertical.",
        "Pour une valeur de l'axe vertical, va horizontalement jusqu'à la courbe puis descends."
      ],
      figure: "gf5-rando",
      exemple: "Une partie horizontale signifie que la grandeur ne change pas."
    },
    {
      titre: "Reconnaître la proportionnalité",
      etapes: [
        "Les points sont-ils alignés ?",
        "La droite passe-t-elle par l'origine ?",
        "Oui aux deux questions : proportionnalité."
      ],
      figure: "gf5-prop",
      exemple: "Points alignés mais pas avec l'origine : pas proportionnel."
    }
  ],
  erreurs: [
    "Oublier les priorités en remplaçant la lettre : $3 + 2 \\times 5 = 13$, pas $25$.",
    "Inverser les axes en lisant un graphique.",
    "Croire que des points alignés suffisent pour la proportionnalité.",
    "Oublier la partie fixe (prise en charge, abonnement) dans une formule.",
    "Lire une valeur entre deux graduations sans regarder ce que vaut une graduation."
  ]
};
