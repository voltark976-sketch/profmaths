/*
  CHAPITRE : 5e — Additionner et soustraire des relatifs
  -------------------------------------------------------
  Programme de mathématiques du cycle 4 (BO n° 10 du 5 mars 2026), en vigueur en 5e à la rentrée 2026, partie
  « Nombres relatifs » : additionner deux puis plusieurs nombres décimaux relatifs ; soustraire deux nombres
  décimaux relatifs ; connaitre les situations où les parenthèses sont indispensables ; simplifier l'écriture de
  sommes comportant des parenthèses ; enchainer additions et soustractions ; résoudre des problèmes.
  Mêmes règles d'écriture que data/sixieme/nombres-entiers-decimaux.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cinquieme-calculs-relatifs"] = {
  niveau: "5e",
  numero: 9,
  titre: "Additionner et soustraire des relatifs",
  accroche: "Ajouter un nombre négatif, soustraire en ajoutant l'opposé, supprimer les parenthèses : calculer avec des températures, des altitudes et des soldes.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : calculs avec les nombres relatifs (PDF)", url: "https://www.maths-et-tiques.fr/telech/26Nomb_rel2.pdf" }
  ],
  liens: [
    { titre: "Additions et soustractions de relatifs (3) (Yvan Monka)", url: "https://youtu.be/pZyqwDHcGwA", type: "video" },
    { titre: "Additions et soustractions de relatifs (4) (Yvan Monka)", url: "https://youtu.be/ZjrmsHRKajg", type: "video" },
    { titre: "Additions et soustractions de relatifs (5) (Yvan Monka)", url: "https://youtu.be/8dXBlHn2jh4", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Additionner deux relatifs",
      video: { titre: "Vidéo d'Yvan Monka : additions et soustractions de relatifs (1)", youtube: "https://youtu.be/9L4lz1NMPoY" },
      texte:
        "- **Même signe** : on additionne les distances à zéro et on garde le signe commun : $(-4) + (-7) = -11$.\n" +
        "- **Signes contraires** : on soustrait les distances à zéro (la plus grande moins la plus petite) et on prend le signe du nombre qui a la plus grande distance à zéro : $(-9) + (+5) = -4$ et $(+9) + (-5) = 4$.\n\n" +
        "Pense à un compte en banque : une dette de $9$ € et un gain de $5$ € laissent une dette de $4$ €.\n\n" +
        "Sur une droite graduée, ajouter un nombre positif, c'est avancer vers la droite ; ajouter un nombre négatif, c'est reculer vers la gauche.",
      figure: "cr5-cours-addition",
      exemple: {
        enonce: "Calcule $(-2{,}5) + (+6)$ et $(-13) + (-8)$.",
        solution: "Signes contraires : $6 - 2{,}5 = 3{,}5$, signe de $+6$ : le résultat est $3{,}5$.\n\nMême signe : $13 + 8 = 21$, signe $-$ : le résultat est $-21$."
      }
    },
    {
      titre: "Soustraire un relatif",
      video: { titre: "Vidéo d'Yvan Monka : additions et soustractions de relatifs (2)", youtube: "https://youtu.be/6zLbeiq8sns" },
      texte:
        "**Soustraire un nombre, c'est ajouter son opposé.**\n\n" +
        "$5 - (+8) = 5 + (-8) = -3$ et $5 - (-8) = 5 + (+8) = 13$.\n\n" +
        "Pour calculer l'écart entre deux nombres, on soustrait le plus petit au plus grand : entre $-6$ °C et $4$ °C, l'écart est $4 - (-6) = 10$ °C.",
      figure: "cr5-cours-ecart",
      exemple: {
        enonce: "Calcule $(-7) - (+3)$ et $(-7) - (-3)$.",
        solution: "$(-7) - (+3) = (-7) + (-3) = -10$.\n\n$(-7) - (-3) = (-7) + (+3) = -4$."
      }
    },
    {
      titre: "Supprimer les parenthèses",
      video: { titre: "Vidéo d'Yvan Monka : additions et soustractions de relatifs (4)", youtube: "https://youtu.be/ZjrmsHRKajg" },
      texte:
        "Quand deux signes se suivent, on les remplace par un seul :\n\n" +
        "- $+(+a) = +a$ et $-(-a) = +a$ : deux signes identiques donnent $+$ ;\n" +
        "- $+(-a) = -a$ et $-(+a) = -a$ : deux signes contraires donnent $-$.\n\n" +
        "$7 + (-3) - (-5) - (+2) = 7 - 3 + 5 - 2$. Chaque nombre est alors précédé de son signe : c'est une somme de relatifs.\n\n" +
        "Les parenthèses sont indispensables pour écrire deux signes à la suite : on n'écrit jamais $5 - -3$.",
      figure: "cr5-cours-signes",
      exemple: {
        enonce: "Simplifie l'écriture de $-4 - (-6) + (-1)$.",
        solution: "$-(-6) = +6$ et $+(-1) = -1$ : $-4 + 6 - 1$."
      }
    },
    {
      titre: "Enchaîner additions et soustractions",
      video: { titre: "Vidéo d'Yvan Monka : additions et soustractions de relatifs (3)", youtube: "https://youtu.be/pZyqwDHcGwA" },
      texte:
        "Dans une suite d'additions et de soustractions sans parenthèses, chaque nombre est précédé de son signe. On peut :\n\n" +
        "- calculer de gauche à droite ;\n" +
        "- ou, plus sûr, **regrouper** les nombres positifs d'un côté et les négatifs de l'autre.\n\n" +
        "$-5 + 12 - 8 + 3 - 6$ : positifs $12 + 3 = 15$ ; négatifs $-5 - 8 - 6 = -19$ ; résultat $15 - 19 = -4$.",
      exemple: {
        enonce: "Calcule $8 - 15 + 4 - 9 + 20$.",
        solution: "Positifs : $8 + 4 + 20 = 32$. Négatifs : $-15 - 9 = -24$. Résultat : $32 - 24 = 8$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "cr5-addition", titre: "Additionner deux relatifs", etape: "Additionner et soustraire", nb: 6 },
    { type: "cr5-soustraction", titre: "Soustraire un relatif", etape: "Additionner et soustraire", nb: 6 },
    { type: "cr5-simplifier", titre: "Supprimer les parenthèses", etape: "Enchaîner les calculs", nb: 5 },
    { type: "cr5-enchainer", titre: "Enchaîner additions et soustractions", etape: "Enchaîner les calculs", nb: 5 },
    { type: "cr5-problemes", titre: "Problèmes", etape: "Problèmes", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$(-6) + (-4)$ est égal à :", choix: ["$-10$", "$10$", "$-2$", "$2$"], bonne: 0, explication: "Même signe : $6 + 4 = 10$, signe $-$." },
    { question: "$(-9) + (+4)$ est égal à :", choix: ["$-5$", "$5$", "$-13$", "$13$"], bonne: 0, explication: "Signes contraires : $9 - 4 = 5$, signe de $-9$." },
    { question: "$(+3) + (-8)$ est égal à :", choix: ["$-5$", "$5$", "$11$", "$-11$"], bonne: 0, explication: "$8 - 3 = 5$, signe de $-8$." },
    { question: "$7 - (+10)$ est égal à :", choix: ["$-3$", "$3$", "$17$", "$-17$"], bonne: 0, explication: "$7 + (-10) = -3$." },
    { question: "$7 - (-10)$ est égal à :", choix: ["$17$", "$-3$", "$3$", "$-17$"], bonne: 0, explication: "$7 + 10 = 17$." },
    { question: "$(-2) - (-2)$ est égal à :", choix: ["$0$", "$-4$", "$4$", "$-2$"], bonne: 0, explication: "$(-2) + 2 = 0$." },
    { question: "Soustraire un nombre, c'est :", choix: ["ajouter son opposé", "ajouter le même nombre", "multiplier par $-1$", "changer le signe du résultat"], bonne: 0, explication: "C'est la règle de la soustraction." },
    { question: "$-(-5)$ se simplifie en :", choix: ["$+5$", "$-5$", "$0$", "$-10$"], bonne: 0, explication: "Deux signes identiques donnent $+$." },
    { question: "$3 + (-4) - (+2)$ s'écrit sans parenthèses :", choix: ["$3 - 4 - 2$", "$3 + 4 - 2$", "$3 - 4 + 2$", "$3 + 4 + 2$"], bonne: 0, explication: "$+(-4) = -4$ et $-(+2) = -2$." },
    { question: "$-3 + 8 - 6 + 1$ est égal à :", choix: ["$0$", "$-18$", "$4$", "$-6$"], bonne: 0, explication: "Positifs $9$, négatifs $-9$." },
    { question: "Il fait $-4$ °C le matin et $6$ °C l'après-midi. La température a augmenté de :", choix: ["$10$ °C", "$2$ °C", "$-10$ °C", "$6$ °C"], bonne: 0, explication: "$6 - (-4) = 10$." },
    { question: "Un sommet à $150$ m et une épave à $-30$ m : la différence d'altitude est :", choix: ["$180$ m", "$120$ m", "$-180$ m", "$30$ m"], bonne: 0, explication: "$150 - (-30) = 180$." },
    { question: "Un solde de $25$ € et un paiement de $40$ € donnent un solde de :", choix: ["$-15$ €", "$15$ €", "$65$ €", "$-65$ €"], bonne: 0, explication: "$25 - 40 = -15$." },
    { question: "$(-1{,}5) + (-2{,}5)$ est égal à :", choix: ["$-4$", "$4$", "$-1$", "$1$"], bonne: 0, explication: "Même signe : $1{,}5 + 2{,}5 = 4$, signe $-$." },
    { question: "D'après la droite graduée, $(-3) + (+7)$ est égal à :", figure: "cr5-qcm-sauts", choix: ["$4$", "$-4$", "$10$", "$-10$"], bonne: 0, explication: "On part de $-3$ et on avance de $7$ graduations vers la droite : on arrive à $4$." },
    { question: "De combien de degrés la température a-t-elle augmenté entre le matin et l'après-midi ?", figure: "cr5-qcm-thermo", choix: ["$14$ °C", "$4$ °C", "$9$ °C", "$-14$ °C"], bonne: 0, explication: "$9 - (-5) = 9 + 5 = 14$ °C : $5$ degrés pour remonter à $0$, puis $9$ de plus." },
    { question: "$(-8) - (+5)$ est égal à :", choix: ["$-13$", "$-3$", "$3$", "$13$"], bonne: 0, explication: "$(-8) + (-5) = -13$." },
    { question: "$(-4) - (-4)$ est égal à :", choix: ["$0$", "$-8$", "$8$", "$-4$"], bonne: 0, explication: "$(-4) + (+4) = 0$ : un nombre moins lui-même donne $0$." },
    { question: "Un plongeur est à $-12$ m. Il remonte de $5$ m. Il est alors à :", choix: ["$-7$ m", "$-17$ m", "$7$ m", "$17$ m"], bonne: 0, explication: "Remonter, c'est ajouter : $-12 + 5 = -7$ m." },
    { question: "Quelle expression est égale à $-2$ ?", choix: ["$(-5) + (+3)$", "$(-5) - (+3)$", "$(+5) + (-3)$", "$(+5) - (-3)$"], bonne: 0, explication: "$(-5) + (+3) = -2$ ; les autres valent $-8$, $2$ et $8$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Additionner deux relatifs",
      etapes: [
        "Regarde les signes.",
        "Même signe : additionne les distances à zéro, garde le signe.",
        "Signes contraires : soustrais les distances à zéro, prends le signe du plus éloigné de zéro."
      ],
      figure: "cr5-cours-addition",
      exemple: "$(-12) + (+5) = -7$."
    },
    {
      titre: "Soustraire un relatif",
      etapes: [
        "Remplace « soustraire » par « ajouter l'opposé ».",
        "Change le signe du deuxième nombre.",
        "Applique la règle de l'addition."
      ],
      figure: "cr5-methode-soustraction",
      exemple: "$(-3) - (-8) = (-3) + 8 = 5$."
    },
    {
      titre: "Calculer une longue somme",
      etapes: [
        "Supprime les parenthèses avec la règle des signes.",
        "Regroupe les positifs et les négatifs.",
        "Additionne les deux résultats."
      ],
      figure: "cr5-cours-signes",
      exemple: "$4 - (-2) - 9 = 4 + 2 - 9 = 6 - 9 = -3$."
    },
    {
      titre: "Résoudre un problème",
      etapes: [
        "Traduis chaque donnée par un relatif (dépense, descente, froid : négatif).",
        "Écris le calcul en entier.",
        "Pour un écart, calcule « le plus grand moins le plus petit »."
      ],
      figure: "cr5-methode-ecart",
      exemple: "Écart entre $-8$ °C et $-3$ °C : $-3 - (-8) = 5$ °C."
    }
  ],
  erreurs: [
    "Additionner les distances à zéro quand les signes sont contraires.",
    "Oublier de changer le signe du deuxième nombre dans une soustraction.",
    "Écrire deux signes à la suite sans parenthèses.",
    "Croire que $-(-a) = -a$.",
    "Calculer un écart de température en soustrayant les distances à zéro sans tenir compte des signes."
  ]
};
