/*
  CHAPITRE : 4e — Puissances
  ---------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 4e en 2026-2027 : utiliser les puissances
  d'exposants strictement positifs d'un nombre et les puissances de 10 d'exposant entier relatif ; règles de
  calcul sur les puissances de 10 ; notation scientifique ; préfixes de nano à giga.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["quatrieme-puissances"] = {
  niveau: "4e",
  numero: 7,
  titre: "Puissances",
  accroche: "Écrire un produit répété avec une puissance, calculer avec les puissances de 10, et écrire de très grands ou très petits nombres en notation scientifique.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : puissances (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Puiss.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : les puissances (Yvan Monka)", url: "https://youtu.be/IxCzv5FPJ3s", type: "video" },
    { titre: "Résoudre un problème à l'aide des puissances (Yvan Monka)", url: "https://youtu.be/4kwH1rM992Q", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Puissances d'un nombre",
      video: { titre: "Vidéo d'Yvan Monka : utiliser la notation des puissances", youtube: "https://youtu.be/jts9wiXPHtk" },
      texte:
        "Pour un nombre $a$ et un entier $n \\geq 1$ : $a^n = \\underbrace{a \\times a \\times \\cdots \\times a}_{n \\text{ facteurs}}$. On lit « $a$ exposant $n$ ».\n\n" +
        "$2^5 = 32$ ; $(-3)^2 = 9$ ; $(-3)^3 = -27$. Par convention, $a^1 = a$ et $a^0 = 1$ (pour $a$ non nul).\n\n" +
        "Attention : $(-3)^2 = 9$ mais $-3^2 = -9$.",
      exemple: {
        enonce: "Calcule $(-2)^4$ et $-2^4$.",
        solution: "$(-2)^4 = 16$ (quatre facteurs négatifs).\n\n$-2^4 = -16$ (la puissance ne porte que sur $2$)."
      }
    },
    {
      titre: "Puissances de 10",
      video: { titre: "Vidéo d'Yvan Monka : utiliser les puissances de 10 d'exposant négatif", youtube: "https://youtu.be/TSeL-rVZNPQ" },
      texte:
        "$10^n = 1\\underbrace{0 \\cdots 0}_{n \\text{ zéros}}$ et $10^{-n} = \\dfrac{1}{10^n} = 0{,}\\underbrace{0 \\cdots 0}_{n - 1}1$.\n\n" +
        "$10^4 = 10\\,000$ et $10^{-3} = 0{,}001$.\n\n" +
        "**Règles** : $10^m \\times 10^n = 10^{m+n}$ ; $\\dfrac{10^m}{10^n} = 10^{m-n}$ ; $(10^m)^p = 10^{m \\times p}$.",
      exemple: {
        enonce: "Écris sous la forme d'une puissance de $10$ : $10^5 \\times 10^{-8}$ et $\\dfrac{10^2}{10^{-4}}$.",
        solution: "$10^{5 + (-8)} = 10^{-3}$.\n\n$10^{2 - (-4)} = 10^6$."
      }
    },
    {
      titre: "Notation scientifique",
      video: { titre: "Vidéo d'Yvan Monka : écrire un nombre avec des puissances de 10", youtube: "https://youtu.be/D5Fe9Fv6CqQ" },
      texte:
        "L'**écriture scientifique** d'un nombre positif est $a \\times 10^n$ avec $1 \\leq a < 10$ et $n$ entier relatif.\n\n" +
        "$45\\,000\\,000 = 4{,}5 \\times 10^7$ ; $0{,}000\\,32 = 3{,}2 \\times 10^{-4}$.\n\n" +
        "L'exposant indique de combien de rangs on a déplacé la virgule : positif pour un grand nombre, négatif pour un nombre plus petit que $1$.",
      exemple: {
        enonce: "La distance Terre-Soleil est d'environ $150\\,000\\,000$ km. Écris-la en notation scientifique.",
        solution: "$150\\,000\\,000 = 1{,}5 \\times 10^8$ km."
      }
    },
    {
      titre: "Préfixes",
      video: { titre: "Vidéo d'Yvan Monka : utiliser les préfixes de nano à giga", youtube: "https://youtu.be/PlxaQEZ00wI" },
      texte:
        "- giga (G) $= 10^9$ ; méga (M) $= 10^6$ ; kilo (k) $= 10^3$ ;\n" +
        "- milli (m) $= 10^{-3}$ ; micro (µ) $= 10^{-6}$ ; nano (n) $= 10^{-9}$.\n\n" +
        "Un téléphone de $128$ Go stocke $128 \\times 10^9$ octets ; un virus mesure environ $100$ nm $= 10^{-7}$ m.",
      exemple: {
        enonce: "Combien de mégaoctets (Mo) y a-t-il dans $1$ gigaoctet (Go) ?",
        solution: "$\\dfrac{10^9}{10^6} = 10^3$ : $1$ Go $= 1\\,000$ Mo."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "pw4-calcul", titre: "Calculer des puissances", etape: "Puissances", nb: 6 },
    { type: "pw4-dix", titre: "Règles sur les puissances de 10", etape: "Puissances de 10", nb: 6 },
    { type: "pw4-scientifique", titre: "Notation scientifique", etape: "Puissances de 10", nb: 6 },
    { type: "pw4-prefixes", titre: "Préfixes de nano à giga", etape: "Puissances de 10", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$3^4$ est égal à :", choix: ["$81$", "$12$", "$64$", "$7$"], bonne: 0, explication: "$3 \\times 3 \\times 3 \\times 3$." },
    { question: "$(-2)^3$ est égal à :", choix: ["$-8$", "$8$", "$-6$", "$6$"], bonne: 0, explication: "Trois facteurs négatifs." },
    { question: "$-5^2$ est égal à :", choix: ["$-25$", "$25$", "$-10$", "$10$"], bonne: 0, explication: "La puissance ne porte que sur $5$." },
    { question: "$10^{-2}$ est égal à :", choix: ["$0{,}01$", "$-100$", "$0{,}1$", "$-20$"], bonne: 0, explication: "$\\dfrac{1}{100}$." },
    { question: "$10^6$ est égal à :", choix: ["un million", "cent mille", "dix millions", "un milliard"], bonne: 0, explication: "$1$ suivi de $6$ zéros." },
    { question: "$10^3 \\times 10^4$ est égal à :", choix: ["$10^7$", "$10^{12}$", "$100^7$", "$10^1$"], bonne: 0, explication: "On additionne les exposants." },
    { question: "$\\dfrac{10^5}{10^8}$ est égal à :", choix: ["$10^{-3}$", "$10^3$", "$10^{13}$", "$10^{40}$"], bonne: 0, explication: "$5 - 8 = -3$." },
    { question: "$(10^2)^3$ est égal à :", choix: ["$10^6$", "$10^5$", "$10^8$", "$10^9$"], bonne: 0, explication: "$2 \\times 3 = 6$." },
    { question: "L'écriture scientifique de $3\\,200$ est :", choix: ["$3{,}2 \\times 10^3$", "$32 \\times 10^2$", "$0{,}32 \\times 10^4$", "$3{,}2 \\times 10^{-3}$"], bonne: 0, explication: "Un seul chiffre non nul avant la virgule." },
    { question: "L'écriture scientifique de $0{,}007\\,5$ est :", choix: ["$7{,}5 \\times 10^{-3}$", "$75 \\times 10^{-4}$", "$7{,}5 \\times 10^3$", "$0{,}75 \\times 10^{-2}$"], bonne: 0, explication: "On déplace la virgule de $3$ rangs." },
    { question: "$2{,}5 \\times 10^4$ est égal à :", choix: ["$25\\,000$", "$2\\,500$", "$250\\,000$", "$0{,}000\\,25$"], bonne: 0, explication: "On décale la virgule de $4$ rangs vers la droite." },
    { question: "Le préfixe « micro » correspond à :", choix: ["$10^{-6}$", "$10^{-3}$", "$10^6$", "$10^{-9}$"], bonne: 0, explication: "Un millionième." },
    { question: "$1$ km est égal à :", choix: ["$10^3$ m", "$10^{-3}$ m", "$10^6$ m", "$10$ m"], bonne: 0, explication: "kilo $= 10^3$." },
    { question: "$5$ ns (nanosecondes) est égal à :", choix: ["$5 \\times 10^{-9}$ s", "$5 \\times 10^9$ s", "$5 \\times 10^{-6}$ s", "$5 \\times 10^{-3}$ s"], bonne: 0, explication: "nano $= 10^{-9}$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer avec des puissances de 10",
      etapes: [
        "Produit : additionne les exposants.",
        "Quotient : soustrais les exposants.",
        "Puissance d'une puissance : multiplie les exposants."
      ],
      exemple: "$\\dfrac{10^3 \\times 10^{-5}}{10^{-4}} = \\dfrac{10^{-2}}{10^{-4}} = 10^2$."
    },
    {
      titre: "Écrire en notation scientifique",
      etapes: [
        "Place la virgule après le premier chiffre non nul.",
        "Compte de combien de rangs tu as déplacé la virgule.",
        "Exposant positif si le nombre est $\\geq 10$, négatif s'il est $< 1$."
      ],
      exemple: "$0{,}000\\,61 = 6{,}1 \\times 10^{-4}$."
    }
  ],
  erreurs: [
    "Confondre $a^n$ et $a \\times n$.",
    "Croire qu'un exposant négatif donne un nombre négatif.",
    "Multiplier les exposants au lieu de les additionner dans un produit.",
    "Écrire $32 \\times 10^2$ comme écriture scientifique (le premier facteur doit être entre $1$ et $10$).",
    "Confondre $(-3)^2$ et $-3^2$."
  ]
};
