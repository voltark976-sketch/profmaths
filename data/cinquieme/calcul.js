/*
  CHAPITRE : 5e — Règles de calcul
  ---------------------------------
  Programme de mathématiques du cycle 4 (BO n° 10 du 5 mars 2026), en vigueur en 5e à la rentrée 2026, partie
  « Opérations » : enchainer des opérations ; traduire un problème, une succession d'opérations, un programme de
  calcul en une seule expression, avec ou sans parenthèses ; nommer un calcul, distinguer sommes et produits,
  termes et facteurs ; connaitre et utiliser les priorités opératoires ; connaitre et utiliser la distributivité
  simple sur des exemples numériques. (Multiples, diviseurs et division par un décimal : chapitre « Divisibilité ».)
  Vidéos et cours PDF d'Yvan Monka (programme 2026).
  Mêmes règles d'écriture que data/sixieme/nombres-entiers-decimaux.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cinquieme-calcul"] = {
  niveau: "5e",
  numero: 1,
  titre: "Règles de calcul",
  accroche: "Dans quel ordre calculer ? Les priorités, les parenthèses, le vocabulaire des opérations et la distributivité pour calculer vite et juste.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : règles de calcul (PDF)", url: "https://www.maths-et-tiques.fr/telech/26Calcul_num.pdf" }
  ],
  liens: [
    { titre: "Effectuer des calculs sans priorité (Yvan Monka)", url: "https://youtu.be/idB0-F7b1Yk", type: "video" },
    { titre: "Distributivité et calcul mental, suite (Yvan Monka)", url: "https://youtu.be/B16mT1yTF8I", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Calculer sans parenthèses",
      video: { titre: "Vidéo d'Yvan Monka : effectuer des calculs avec des priorités", youtube: "https://youtu.be/TJH-fiwAt5s" },
      texte:
        "**Sans priorité.** S'il n'y a que des additions et des soustractions, ou que des multiplications et des divisions, on calcule **de gauche à droite** :\n\n" +
        "$25 - 7 + 3 = 18 + 3 = 21$ et $48 \\div 6 \\times 2 = 8 \\times 2 = 16$.\n\n" +
        "**Avec priorité.** Dans un calcul sans parenthèses, on effectue **d'abord les multiplications et les divisions**, puis les additions et les soustractions :\n\n" +
        "$4 + 5 \\times 3 = 4 + 15 = 19$ (et non $9 \\times 3 = 27$).",
      exemple: {
        enonce: "Calcule $A = 30 - 4 \\times 6 + 2$ et $B = 7 \\times 8 - 36 \\div 4$.",
        solution: "$A = 30 - 24 + 2 = 6 + 2 = 8$.\n\n$B = 56 - 9 = 47$ : les deux produits (ou quotients) sont calculés avant la soustraction."
      }
    },
    {
      titre: "Calculer avec des parenthèses",
      video: { titre: "Vidéo d'Yvan Monka : le cours sur les règles de calcul", youtube: "https://youtu.be/r1dzDGtPm7A" },
      texte:
        "Les calculs **entre parenthèses** sont prioritaires : on les effectue en premier.\n\n" +
        "$5 \\times (8 - 3) = 5 \\times 5 = 25$, alors que $5 \\times 8 - 3 = 37$.\n\n" +
        "S'il y a des parenthèses dans des crochets, on commence par les parenthèses **les plus intérieures** :\n\n" +
        "$2 \\times [10 - (3 + 4)] = 2 \\times [10 - 7] = 2 \\times 3 = 6$.",
      exemple: {
        enonce: "Calcule $C = (12 + 8) \\times (9 - 4)$ et $D = 50 - (6 + 4 \\times 3)$.",
        solution: "$C = 20 \\times 5 = 100$.\n\n$D = 50 - (6 + 12) = 50 - 18 = 32$ : dans la parenthèse aussi, la multiplication passe avant l'addition."
      }
    },
    {
      titre: "Le trait de fraction",
      video: { titre: "Vidéo d'Yvan Monka : effectuer des calculs avec des quotients", youtube: "https://youtu.be/yr1anMpCoSM" },
      texte:
        "Un **trait de fraction** joue le rôle de parenthèses : on calcule le numérateur et le dénominateur, puis on divise.\n\n" +
        "$\\dfrac{18 + 6}{11 - 3} = \\dfrac{24}{8} = 3$. Écrit sur une ligne, ce calcul devient $(18 + 6) \\div (11 - 3)$.",
      exemple: {
        enonce: "Calcule $E = \\dfrac{7 \\times 6}{5 + 9}$.",
        solution: "$E = \\dfrac{42}{14} = 3$."
      }
    },
    {
      titre: "Somme, différence, produit, quotient",
      video: { titre: "Vidéo d'Yvan Monka : traduire une expression numérique par une phrase", youtube: "https://youtu.be/_yF5ItbcN28" },
      texte:
        "- $4 + 5$ est la **somme** de $4$ et de $5$ ; $4$ et $5$ sont les **termes**.\n" +
        "- $9 - 3$ est la **différence** entre $9$ et $3$.\n" +
        "- $5 \\times 8$ est le **produit** de $5$ par $8$ ; $5$ et $8$ sont les **facteurs**.\n" +
        "- $15 \\div 3$ est le **quotient** de $15$ par $3$.\n\n" +
        "La nature d'une expression est donnée par la **dernière opération** effectuée : $3 + 4 \\times 5$ est une somme, $(3 + 4) \\times 5$ est un produit.\n\n" +
        "Pour traduire une phrase, le premier mot donne la dernière opération : « le produit de $3$ par la somme de $4$ et de $5$ » s'écrit $3 \\times (4 + 5)$.",
      exemple: {
        enonce: "Écris une expression pour : « la différence entre $20$ et le quotient de $12$ par $4$ », puis calcule-la.",
        solution: "C'est une différence ; le second terme est le quotient $12 \\div 4$ : $20 - 12 \\div 4 = 20 - 3 = 17$."
      }
    },
    {
      titre: "La distributivité",
      video: { titre: "Vidéo d'Yvan Monka : appliquer la distributivité pour le calcul mental", youtube: "https://youtu.be/ByzozWOSOAY" },
      texte:
        "Pour tous nombres $k$, $a$ et $b$ :\n\n" +
        "$k \\times (a + b) = k \\times a + k \\times b$ et $k \\times (a - b) = k \\times a - k \\times b$.\n\n" +
        "Le facteur $k$ multiplie **chaque terme** de la parenthèse. Cette règle sert au calcul mental :\n\n" +
        "$7 \\times 102 = 7 \\times (100 + 2) = 700 + 14 = 714$ et $6 \\times 99 = 6 \\times (100 - 1) = 600 - 6 = 594$.\n\n" +
        "Dans l'autre sens, on regroupe un facteur commun : $13 \\times 7 + 13 \\times 3 = 13 \\times (7 + 3) = 130$.",
      exemple: {
        enonce: "Calcule mentalement $25 \\times 104$ et $4{,}5 \\times 37 + 4{,}5 \\times 63$.",
        solution: "$25 \\times 104 = 25 \\times 100 + 25 \\times 4 = 2\\,500 + 100 = 2\\,600$.\n\n$4{,}5 \\times 37 + 4{,}5 \\times 63 = 4{,}5 \\times (37 + 63) = 4{,}5 \\times 100 = 450$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "rc5-priorites", titre: "Calculer sans parenthèses", etape: "Priorités opératoires", nb: 6 },
    { type: "rc5-parentheses", titre: "Parenthèses, crochets et traits de fraction", etape: "Priorités opératoires", nb: 6 },
    { type: "rc5-vocabulaire", titre: "Somme, produit, termes et facteurs", etape: "Vocabulaire et traduction", nb: 5 },
    { type: "rc5-traduire", titre: "Traduire une phrase ou un problème", etape: "Vocabulaire et traduction", nb: 5 },
    { type: "rc5-distributivite", titre: "Distributivité et calcul mental", etape: "Distributivité", nb: 6 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$20 - 8 + 2$ est égal à :", choix: ["$14$", "$10$", "$30$", "$26$"], bonne: 0, explication: "De gauche à droite : $12 + 2 = 14$." },
    { question: "$6 + 4 \\times 5$ est égal à :", choix: ["$26$", "$50$", "$30$", "$15$"], bonne: 0, explication: "La multiplication d'abord : $6 + 20 = 26$." },
    { question: "$36 \\div 4 \\times 3$ est égal à :", choix: ["$27$", "$3$", "$12$", "$43$"], bonne: 0, explication: "De gauche à droite : $9 \\times 3 = 27$." },
    { question: "$3 \\times (7 - 2)$ est égal à :", choix: ["$15$", "$19$", "$21$", "$12$"], bonne: 0, explication: "La parenthèse d'abord : $3 \\times 5 = 15$." },
    { question: "$40 - 2 \\times (5 + 3)$ est égal à :", choix: ["$24$", "$304$", "$37$", "$27$"], bonne: 0, explication: "$40 - 2 \\times 8 = 40 - 16 = 24$." },
    { question: "$\\dfrac{20 + 4}{3 + 3}$ est égal à :", choix: ["$4$", "$12$", "$25{,}33$", "$8$"], bonne: 0, explication: "$\\dfrac{24}{6} = 4$." },
    { question: "$5 \\times [12 - (4 + 6)]$ est égal à :", choix: ["$10$", "$14$", "$46$", "$20$"], bonne: 0, explication: "$5 \\times [12 - 10] = 5 \\times 2 = 10$." },
    { question: "L'expression $8 + 3 \\times 4$ est :", choix: ["une somme", "un produit", "une différence", "un quotient"], bonne: 0, explication: "La dernière opération effectuée est l'addition." },
    { question: "L'expression $(8 + 3) \\times 4$ est :", choix: ["un produit", "une somme", "une différence", "un quotient"], bonne: 0, explication: "On calcule la parenthèse, puis on multiplie." },
    { question: "Dans $7 \\times 9$, les nombres $7$ et $9$ sont :", choix: ["les facteurs", "les termes", "les quotients", "les différences"], bonne: 0, explication: "On multiplie des facteurs, on additionne des termes." },
    { question: "« Le produit de $4$ par la somme de $2$ et de $6$ » s'écrit :", choix: ["$4 \\times (2 + 6)$", "$4 \\times 2 + 6$", "$(4 + 2) \\times 6$", "$4 + 2 \\times 6$"], bonne: 0, explication: "Le premier mot, « produit », donne la dernière opération." },
    { question: "$9 \\times 101$ est égal à :", choix: ["$909$", "$901$", "$910$", "$9\\,001$"], bonne: 0, explication: "$9 \\times 100 + 9 \\times 1 = 909$." },
    { question: "$8 \\times (10 - 3)$ est égal à :", choix: ["$8 \\times 10 - 8 \\times 3$", "$8 \\times 10 - 3$", "$80 - 3$", "$8 - 3 \\times 10$"], bonne: 0, explication: "Le facteur $8$ multiplie chaque terme de la parenthèse." },
    { question: "$17 \\times 6 + 17 \\times 4$ est égal à :", choix: ["$170$", "$408$", "$1\\,734$", "$27$"], bonne: 0, explication: "$17 \\times (6 + 4) = 17 \\times 10 = 170$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer une expression",
      etapes: [
        "Commence par les parenthèses (les plus intérieures d'abord) et par le numérateur et le dénominateur d'un trait de fraction.",
        "Effectue ensuite les multiplications et les divisions, de gauche à droite.",
        "Termine par les additions et les soustractions, de gauche à droite."
      ],
      exemple: "$3 + 2 \\times (9 - 4) = 3 + 2 \\times 5 = 3 + 10 = 13$."
    },
    {
      titre: "Trouver la nature d'une expression",
      etapes: [
        "Repère l'ordre des calculs avec les priorités.",
        "Cherche la dernière opération effectuée.",
        "Elle donne la nature : somme ($+$), différence ($-$), produit ($\\times$) ou quotient ($\\div$)."
      ],
      exemple: "$5 \\times 4 - 3$ : la soustraction est faite en dernier, c'est une différence."
    },
    {
      titre: "Traduire une phrase en expression",
      etapes: [
        "Le premier mot de la phrase donne la dernière opération.",
        "Écris les deux termes (ou facteurs) qu'elle relie.",
        "Ajoute des parenthèses si une addition ou une soustraction doit être faite avant une multiplication."
      ],
      exemple: "« Le double de la somme de $3$ et de $8$ » : $2 \\times (3 + 8)$."
    },
    {
      titre: "Calculer mentalement avec la distributivité",
      etapes: [
        "Décompose un facteur : $99 = 100 - 1$, $102 = 100 + 2$.",
        "Multiplie chaque terme : $k \\times (a + b) = k \\times a + k \\times b$.",
        "Avec un facteur commun, regroupe : $k \\times a + k \\times b = k \\times (a + b)$."
      ],
      exemple: "$12 \\times 99 = 1\\,200 - 12 = 1\\,188$."
    }
  ],
  erreurs: [
    "Calculer de gauche à droite sans respecter les priorités : $2 + 3 \\times 4$ vaut $14$, pas $20$.",
    "Oublier de calculer d'abord les parenthèses.",
    "Avec seulement $+$ et $-$, commencer par l'addition : $10 - 2 + 3$ vaut $11$, pas $5$.",
    "Ne multiplier qu'un seul terme de la parenthèse : $4 \\times (10 + 2) \\neq 4 \\times 10 + 2$.",
    "Confondre termes (dans une somme) et facteurs (dans un produit)."
  ]
};
