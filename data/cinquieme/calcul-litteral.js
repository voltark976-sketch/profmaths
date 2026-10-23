/*
  CHAPITRE : 5e — Calcul littéral
  --------------------------------
  Programme de mathématiques du cycle 4 (BO n° 10 du 5 mars 2026), en vigueur en 5e à la rentrée 2026 :
  « Puissances » : carré et cube, notation, carrés de 0 à 12, cube de 10, écrire un nombre comme un carré ou un
  cube, calculer des expressions avec des puissances simples. « Calcul littéral et algébrique » : produire des
  formules (double, triple, carré, successeur…), calculer par substitution, somme ou produit, développer et
  factoriser avec k(a + b) et k(a − b), réduire ax + b, démontrer une propriété générale, utiliser un
  contre-exemple. (Tester une égalité et résoudre des équations : chapitre « Équations ».)
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cinquieme-calcul-litteral"] = {
  niveau: "5e",
  numero: 11,
  titre: "Calcul littéral",
  accroche: "Des lettres pour généraliser : carrés et cubes, formules, substitution, développer, factoriser, réduire… et prouver qu'une propriété est toujours vraie.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : calcul littéral (PDF)", url: "https://www.maths-et-tiques.fr/telech/26Calcul_lettres1.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : calcul littéral (Yvan Monka)", url: "https://youtu.be/mbG8a5Uae30", type: "video" },
    { titre: "Écrire un nombre sous forme d'un carré ou d'un cube (Yvan Monka)", url: "https://youtu.be/650Bo4JbS2Y", type: "video" },
    { titre: "Prouver que la somme de deux entiers consécutifs est impaire (Yvan Monka)", url: "https://youtu.be/ecf2YXW259I", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Carrés et cubes",
      video: { titre: "Vidéo d'Yvan Monka : calculer un nombre au carré ou au cube", youtube: "https://youtu.be/VEZsnBEXbKI" },
      texte:
        "- $a^2 = a \\times a$ se lit « $a$ au carré » : $7^2 = 49$.\n" +
        "- $a^3 = a \\times a \\times a$ se lit « $a$ au cube » : $10^3 = 1\\,000$.\n\n" +
        "Attention : $5^2 = 25$, pas $10$. Ce sont l'aire d'un carré de côté $a$ et le volume d'un cube d'arête $a$.\n\n" +
        "Dans un calcul, les puissances passent **avant** les multiplications : $3 + 2^2 \\times 5 = 3 + 4 \\times 5 = 23$.\n\n" +
        "À connaître : $1$ ; $4$ ; $9$ ; $16$ ; $25$ ; $36$ ; $49$ ; $64$ ; $81$ ; $100$ ; $121$ ; $144$ sont les carrés de $1$ à $12$.",
      figure: "cl5-cours-carre-cube",
      exemple: {
        enonce: "Calcule $(6 - 2)^2$ et $6 - 2^2$.",
        solution: "$(6 - 2)^2 = 4^2 = 16$.\n\n$6 - 2^2 = 6 - 4 = 2$ : sans parenthèses, le carré ne porte que sur $2$."
      }
    },
    {
      titre: "Expressions littérales",
      video: { titre: "Vidéo d'Yvan Monka : simplifier une expression", youtube: "https://youtu.be/eBPOd0bTBro" },
      texte:
        "Une **expression littérale** contient des lettres qui représentent des nombres. Elle permet d'écrire une formule valable pour toutes les valeurs : le périmètre d'un carré de côté $c$ est $4c$.\n\n" +
        "**Simplifications d'écriture** : on peut supprimer le signe $\\times$ devant une lettre ou une parenthèse.\n\n" +
        "$3 \\times x = 3x$ ; $a \\times b = ab$ ; $5 \\times (x + 1) = 5(x + 1)$ ; $x \\times x = x^2$ ; $x \\times x \\times x = x^3$.\n\n" +
        "Pour **calculer** une expression, on remplace la lettre par sa valeur en rétablissant le $\\times$ : pour $x = 4$, $3x^2 + 1 = 3 \\times 4^2 + 1 = 49$.",
      figure: "cl5-cours-perimetre",
      exemple: {
        enonce: "Écris le double de $n$, le triple de $n$ augmenté de $1$, et le successeur de $n$. Calcule-les pour $n = 10$.",
        solution: "$2n = 20$ ; $3n + 1 = 31$ ; $n + 1 = 11$."
      }
    },
    {
      titre: "Développer et factoriser",
      video: { titre: "Vidéo d'Yvan Monka : appliquer la formule de distributivité", youtube: "https://youtu.be/Jdvi2WbIkjo" },
      texte:
        "Pour tous nombres $k$, $a$ et $b$ :\n\n" +
        "$k(a + b) = ka + kb$ et $k(a - b) = ka - kb$.\n\n" +
        "- **Développer**, c'est transformer un produit en somme : $4(x + 3) = 4x + 12$.\n" +
        "- **Factoriser**, c'est transformer une somme en produit : $5x - 20 = 5 \\times x - 5 \\times 4 = 5(x - 4)$.\n\n" +
        "Une expression est une **somme** ou un **produit** selon la dernière opération : $3x + 5$ est une somme, $3(x + 5)$ un produit.\n\n" +
        "Avec des aires : un rectangle de largeur $4$ et de longueur $x + 3$ a pour aire $4(x + 3)$, c'est-à-dire $4x + 12$.",
      figure: "cl5-cours-distributivite",
      exemple: {
        enonce: "Développe $7(2 - y)$ et factorise $6a + 18$.",
        solution: "$7(2 - y) = 14 - 7y$.\n\n$6a + 18 = 6 \\times a + 6 \\times 3 = 6(a + 3)$."
      }
    },
    {
      titre: "Réduire une expression",
      video: { titre: "Vidéo d'Yvan Monka : réduire une expression", youtube: "https://youtu.be/qEUb4IU-HiY" },
      texte:
        "**Réduire**, c'est écrire une expression avec le moins de termes possible.\n\n" +
        "On regroupe les termes « en $x$ » entre eux, et les nombres entre eux : $3x + 5 + 4x - 2 = 7x + 3$.\n\n" +
        "C'est la distributivité : $3x + 4x = (3 + 4)x = 7x$. Mais $7x + 3$ ne se réduit pas en $10x$ : $7x$ et $3$ ne sont pas du même type, comme les barres et les petits carrés de la figure.",
      figure: "cl5-cours-tuiles",
      exemple: {
        enonce: "Réduis $8a - 3 + 2a + 10$.",
        solution: "$8a + 2a = 10a$ et $-3 + 10 = 7$ : $10a + 7$."
      }
    },
    {
      titre: "Prouver avec des lettres",
      video: { titre: "Vidéo d'Yvan Monka : utiliser un contre-exemple", youtube: "https://youtu.be/YzTAInq40ms" },
      texte:
        "- Pour **démontrer** qu'une propriété est vraie pour tous les nombres, quelques exemples ne suffisent pas : on fait un calcul avec des lettres.\n" +
        "Deux entiers consécutifs s'écrivent $n$ et $n + 1$ ; leur somme $n + n + 1 = 2n + 1$ est toujours impaire.\n" +
        "- Pour prouver qu'une affirmation est **fausse**, un seul **contre-exemple** suffit.\n" +
        "« $x^2$ est toujours plus grand que $x$ » est fausse : pour $x = 0{,}5$, $x^2 = 0{,}25$.",
      figure: "cl5-cours-preuve",
      exemple: {
        enonce: "Montre que la somme de trois entiers consécutifs est un multiple de $3$.",
        solution: "$n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1)$ : c'est $3$ fois un entier, donc un multiple de $3$, quel que soit $n$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "cl5-puissances", titre: "Carrés et cubes", etape: "Puissances", nb: 6 },
    { type: "cl5-ecriture", titre: "Simplifier l'écriture", etape: "Expressions littérales", nb: 5 },
    { type: "cl5-substitution", titre: "Calculer une expression", etape: "Expressions littérales", nb: 6 },
    { type: "cl5-developper", titre: "Développer, factoriser, réduire", etape: "Transformer une expression", nb: 6 },
    { type: "cl5-raisonner", titre: "Formules, preuves et contre-exemples", etape: "Raisonner", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$6^2$ est égal à :", choix: ["$36$", "$12$", "$8$", "$66$"], bonne: 0, explication: "$6 \\times 6 = 36$." },
    { question: "$2^3$ est égal à :", choix: ["$8$", "$6$", "$9$", "$5$"], bonne: 0, explication: "$2 \\times 2 \\times 2 = 8$." },
    { question: "$10^3$ est égal à :", choix: ["$1\\,000$", "$30$", "$100$", "$10\\,000$"], bonne: 0, explication: "$10 \\times 10 \\times 10$." },
    { question: "$81$ est le carré de :", choix: ["$9$", "$8$", "$40{,}5$", "$27$"], bonne: 0, explication: "$9 \\times 9 = 81$." },
    { question: "$4 + 3^2$ est égal à :", choix: ["$13$", "$49$", "$10$", "$25$"], bonne: 0, explication: "$4 + 9 = 13$." },
    { question: "$5 \\times a \\times b$ s'écrit plus simplement :", choix: ["$5ab$", "$5 + ab$", "$a5b$", "$5a + b$"], bonne: 0, explication: "On supprime les signes $\\times$, le nombre en premier." },
    { question: "$y \\times y$ s'écrit :", choix: ["$y^2$", "$2y$", "$yy2$", "$y + y$"], bonne: 0, explication: "Un produit d'une lettre par elle-même est un carré." },
    { question: "Pour $x = 3$, $2x + 5$ vaut :", choix: ["$11$", "$28$", "$10$", "$16$"], bonne: 0, explication: "$2 \\times 3 + 5 = 11$." },
    { question: "Pour $x = 4$, $x^2 - 1$ vaut :", choix: ["$15$", "$7$", "$9$", "$17$"], bonne: 0, explication: "$16 - 1 = 15$." },
    { question: "$3(x + 4)$ développé donne :", choix: ["$3x + 12$", "$3x + 4$", "$7x$", "$x + 12$"], bonne: 0, explication: "$3 \\times x + 3 \\times 4$." },
    { question: "$8x - 16$ factorisé donne :", choix: ["$8(x - 2)$", "$8(x - 16)$", "$2(4x - 16)$", "$x(8 - 16)$"], bonne: 0, explication: "$8 \\times x - 8 \\times 2$." },
    { question: "$4x + 3 + 2x$ réduit donne :", choix: ["$6x + 3$", "$9x$", "$9$", "$6x + 3x$"], bonne: 0, explication: "$4x + 2x = 6x$, le $3$ reste seul." },
    { question: "Le triple du successeur de $n$ s'écrit :", choix: ["$3(n + 1)$", "$3n + 1$", "$n + 3$", "$3 + n + 1$"], bonne: 0, explication: "Successeur : $n + 1$ ; triple : $\\times 3$, avec des parenthèses." },
    { question: "Pour prouver qu'une affirmation est fausse, il suffit :", choix: ["d'un contre-exemple", "de trois exemples", "d'un calcul avec des lettres", "d'un dessin"], bonne: 0, explication: "Un seul cas où elle est fausse suffit." },
    { question: "L'aire totale de ce rectangle est :", figure: "cl5-qcm-rect", choix: ["$5a + 10$", "$5a + 2$", "$7a$", "$5 + a + 2$"], bonne: 0, explication: "$5(a + 2) = 5 \\times a + 5 \\times 2 = 5a + 10$ : les deux morceaux ont pour aires $5a$ et $10$." },
    { question: "Les tuiles représentent une expression. Une fois réduite, elle s'écrit :", figure: "cl5-qcm-tuiles", choix: ["$5x + 4$", "$9x$", "$5x + 4x$", "$6x + 4$"], bonne: 0, explication: "$2x + 3x = 5x$ et il reste $4$ unités : $5x + 4$. On n'ajoute pas les $x$ et les unités." },
    { question: "Ce carré est quadrillé en carreaux de $1$ cm. Son aire est :", figure: "cl5-qcm-carre", choix: ["$6^2 = 36$ cm²", "$2 \\times 6 = 12$ cm²", "$4 \\times 6 = 24$ cm²", "$6$ cm²"], bonne: 0, explication: "$6$ rangées de $6$ carreaux : $6 \\times 6 = 6^2 = 36$ cm² ($24$ cm, c'est son périmètre)." },
    { question: "$(3 + 2)^2$ est égal à :", choix: ["$25$", "$13$", "$10$", "$7$"], bonne: 0, explication: "La parenthèse d'abord : $5^2 = 25$. ($3^2 + 2^2 = 13$ n'est pas la même chose.)" },
    { question: "Pour $a = 4$ et $b = 1$, $2a + 3b$ vaut :", choix: ["$11$", "$24$", "$9$", "$15$"], bonne: 0, explication: "$2 \\times 4 + 3 \\times 1 = 8 + 3 = 11$." },
    { question: "Un contre-exemple à « le double d'un nombre est toujours plus grand que ce nombre » est :", choix: ["$0$", "$1$", "$5$", "$10$"], bonne: 0, explication: "Le double de $0$ est $0$ : il n'est pas plus grand que $0$. Un seul contre-exemple suffit." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer avec des puissances",
      etapes: [
        "$a^2 = a \\times a$ et $a^3 = a \\times a \\times a$.",
        "Priorités : parenthèses, puissances, multiplications et divisions, additions et soustractions.",
        "Ne confonds pas $a^2$ (carré) et $2a$ (double)."
      ],
      figure: "cl5-cours-carre-cube",
      exemple: "$2 \\times 5^2 = 2 \\times 25 = 50$."
    },
    {
      titre: "Calculer une expression littérale",
      etapes: [
        "Rétablis les signes $\\times$ : $3x = 3 \\times x$.",
        "Remplace la lettre par sa valeur.",
        "Applique les priorités."
      ],
      figure: "cl5-cours-perimetre",
      exemple: "$x = 2$ : $5x^2 - 3 = 5 \\times 4 - 3 = 17$."
    },
    {
      titre: "Développer ou factoriser",
      etapes: [
        "Développer : multiplie le facteur par chaque terme de la parenthèse.",
        "Factoriser : repère le facteur commun aux deux termes.",
        "Vérifie en développant ta factorisation."
      ],
      figure: "cl5-cours-distributivite",
      exemple: "$4a + 28 = 4(a + 7)$ car $4 \\times 7 = 28$."
    },
    {
      titre: "Réduire une expression",
      etapes: [
        "Repère les termes en $x$ et les nombres.",
        "Additionne les termes en $x$ entre eux, les nombres entre eux.",
        "Écris le résultat sous la forme $ax + b$."
      ],
      figure: "cl5-cours-tuiles",
      exemple: "$5x - 4 + x + 9 = 6x + 5$."
    }
  ],
  erreurs: [
    "Confondre $x^2$ et $2x$.",
    "Remplacer $3x$ par « $3$ à côté de la valeur » : pour $x = 5$, $3x = 15$, pas $35$.",
    "Ne multiplier que le premier terme de la parenthèse en développant.",
    "Réduire $5x + 3$ en $8x$.",
    "Croire que quelques exemples suffisent pour prouver une propriété générale."
  ]
};
