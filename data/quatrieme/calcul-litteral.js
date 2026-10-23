/*
  CHAPITRE : 4e — Calcul littéral
  --------------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 4e en 2026-2027 : utiliser une expression littérale ;
  calculer la valeur d'une expression (avec des nombres relatifs) ; développer et factoriser avec la distributivité
  simple ; réduire une expression ; démontrer l'égalité de deux expressions (programmes de calcul).
  Vidéos et cours PDF d'Yvan Monka (la double distributivité est vue en 3e).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["quatrieme-calcul-litteral"] = {
  niveau: "4e",
  numero: 9,
  titre: "Calcul littéral",
  accroche: "Développer, factoriser et réduire des expressions avec des nombres relatifs, puis calculer une expression pour une valeur donnée.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : calcul littéral, partie 1 (PDF)", url: "https://www.maths-et-tiques.fr/telech/19CalcLitt4e-1.pdf" },
    { titre: "Cours d'Yvan Monka : calcul littéral, partie 2 (PDF)", url: "https://www.maths-et-tiques.fr/telech/19CalcLitt4e-2.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : la distributivité (Yvan Monka)", url: "https://youtu.be/zRBOouW-O1c", type: "video" },
    { titre: "Prouver que deux programmes de calcul sont équivalents (Yvan Monka)", url: "https://youtu.be/-iw4OkMhgCA", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Développer",
      video: { titre: "Vidéo d'Yvan Monka : développer une expression", youtube: "https://youtu.be/S_ckQpWzmG8" },
      texte:
        "**Distributivité** : $k(a + b) = ka + kb$ et $k(a - b) = ka - kb$, pour tous nombres relatifs $k$, $a$, $b$.\n\n" +
        "Développer, c'est transformer un produit en somme, en appliquant la règle des signes à chaque produit :\n\n" +
        "$-3(2x - 5) = (-3) \\times 2x + (-3) \\times (-5) = -6x + 15$.\n\n" +
        "Un signe $-$ devant une parenthèse change le signe de chaque terme : $-(4x - 7) = -4x + 7$.",
      exemple: {
        enonce: "Développe $A = 4(3 - 2y)$ et $B = -(x + 6)$.",
        solution: "$A = 12 - 8y$.\n\n$B = -x - 6$."
      }
    },
    {
      titre: "Réduire",
      video: { titre: "Vidéo d'Yvan Monka : réduire une expression", youtube: "https://youtu.be/qEUb4IU-HiY" },
      texte:
        "Réduire une expression, c'est regrouper les termes de même nature :\n\n" +
        "- les termes en $x^2$ entre eux, les termes en $x$ entre eux, les nombres entre eux ;\n" +
        "- $3x^2 - 2x + 5x - x^2 + 4 = 2x^2 + 3x + 4$.\n\n" +
        "On ne réduit pas $2x^2 + 3x$ : ce ne sont pas des termes de même nature.",
      exemple: {
        enonce: "Développe et réduis $C = 2(x + 4) - 3(x - 1)$.",
        solution: "$C = 2x + 8 - 3x + 3 = -x + 11$."
      }
    },
    {
      titre: "Factoriser",
      video: { titre: "Vidéo d'Yvan Monka : factoriser une expression", youtube: "https://youtu.be/sr_vOR2ALhw" },
      texte:
        "Factoriser, c'est transformer une somme en produit en repérant un **facteur commun** : $ka + kb = k(a + b)$.\n\n" +
        "$6x - 15 = 3 \\times 2x - 3 \\times 5 = 3(2x - 5)$ ; $4x^2 + 7x = x \\times 4x + x \\times 7 = x(4x + 7)$.\n\n" +
        "On vérifie toujours en redéveloppant.",
      exemple: {
        enonce: "Factorise $D = 10a + 25$ et $E = 3y^2 - y$.",
        solution: "$D = 5(2a + 5)$.\n\n$E = y(3y - 1)$."
      }
    },
    {
      titre: "Calculer et prouver",
      video: { titre: "Vidéo d'Yvan Monka : prouver une égalité", youtube: "https://youtu.be/8-Bc8Dy3cQQ" },
      texte:
        "Pour calculer une expression avec un nombre négatif, on le remplace **entre parenthèses** : pour $x = -3$, $2x^2 - x = 2 \\times (-3)^2 - (-3) = 18 + 3 = 21$.\n\n" +
        "Pour **prouver** que deux programmes de calcul donnent toujours le même résultat, on traduit chacun par une expression, on développe, on réduit et on compare.",
      exemple: {
        enonce: "Programme 1 : ajouter $3$, multiplier par $2$, retirer $6$. Programme 2 : multiplier par $2$. Prouve qu'ils donnent le même résultat.",
        solution: "Avec $x$ : $2(x + 3) - 6 = 2x + 6 - 6 = 2x$. Les deux programmes donnent toujours $2x$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "lc4-developper", titre: "Développer", etape: "Distributivité", nb: 6 },
    { type: "lc4-factoriser", titre: "Factoriser", etape: "Distributivité", nb: 5 },
    { type: "lc4-reduire", titre: "Réduire", etape: "Réduire", nb: 5 },
    { type: "lc4-dev-reduire", titre: "Développer et réduire", etape: "Réduire", nb: 6 },
    { type: "lc4-substitution", titre: "Calculer une expression", etape: "Calculer", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$3(x + 5)$ développé donne :", choix: ["$3x + 15$", "$3x + 5$", "$8x$", "$x + 15$"], bonne: 0, explication: "Le facteur multiplie chaque terme." },
    { question: "$-2(x - 4)$ développé donne :", choix: ["$-2x + 8$", "$-2x - 8$", "$2x - 8$", "$-2x - 4$"], bonne: 0, explication: "$(-2) \\times (-4) = 8$." },
    { question: "$-(3x - 1)$ est égal à :", choix: ["$-3x + 1$", "$-3x - 1$", "$3x - 1$", "$3x + 1$"], bonne: 0, explication: "Le signe $-$ change chaque signe." },
    { question: "$5x - 2x + 7$ réduit donne :", choix: ["$3x + 7$", "$10x$", "$3x$", "$7x + 7$"], bonne: 0, explication: "$5x - 2x = 3x$." },
    { question: "$x^2 + 3x + 2x^2 - x$ réduit donne :", choix: ["$3x^2 + 2x$", "$5x^2$", "$3x^4 + 2x$", "$5x^3$"], bonne: 0, explication: "On regroupe les $x^2$ et les $x$." },
    { question: "$7x + 21$ factorisé donne :", choix: ["$7(x + 3)$", "$7(x + 21)$", "$x(7 + 21)$", "$3(7x + 7)$"], bonne: 0, explication: "$21 = 7 \\times 3$." },
    { question: "$2x^2 - 5x$ factorisé donne :", choix: ["$x(2x - 5)$", "$x^2(2 - 5)$", "$2(x^2 - 5x)$ seulement", "$-3x$"], bonne: 0, explication: "$x$ est commun aux deux termes." },
    { question: "$2(x + 1) + 3(x - 2)$ développé et réduit donne :", choix: ["$5x - 4$", "$5x + 4$", "$5x - 1$", "$6x - 4$"], bonne: 0, explication: "$2x + 2 + 3x - 6$." },
    { question: "$4(x - 1) - (x + 3)$ donne :", choix: ["$3x - 7$", "$3x - 1$", "$5x - 7$", "$3x + 7$"], bonne: 0, explication: "$4x - 4 - x - 3$." },
    { question: "Pour $x = -2$, $x^2 + 3x$ vaut :", choix: ["$-2$", "$10$", "$-10$", "$2$"], bonne: 0, explication: "$4 - 6 = -2$." },
    { question: "Pour $x = -1$, $3x^2 - 2x + 1$ vaut :", choix: ["$6$", "$2$", "$0$", "$-4$"], bonne: 0, explication: "$3 + 2 + 1$." },
    { question: "Pour $x = 3$, $-x^2$ vaut :", choix: ["$-9$", "$9$", "$-6$", "$6$"], bonne: 0, explication: "Le carré porte sur $x$ seulement." },
    { question: "Factoriser $a b + a c$ donne :", choix: ["$a(b + c)$", "$ab(c)$", "$(a + b)(a + c)$", "$a^2 bc$"], bonne: 0, explication: "$a$ est le facteur commun." },
    { question: "Pour prouver que deux expressions sont toujours égales, on peut :", choix: ["les développer et les réduire", "tester une seule valeur", "les dessiner", "comparer leur nombre de termes"], bonne: 0, explication: "Un test ne suffit pas à prouver." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Développer",
      etapes: [
        "Multiplie le facteur par chaque terme de la parenthèse.",
        "Applique la règle des signes à chaque produit.",
        "Réduis si possible."
      ],
      exemple: "$-5(2x - 3) = -10x + 15$."
    },
    {
      titre: "Factoriser",
      etapes: [
        "Écris chaque terme comme un produit.",
        "Repère le facteur commun (nombre ou lettre).",
        "Mets-le devant une parenthèse, puis vérifie en développant."
      ],
      exemple: "$9x - 12 = 3(3x - 4)$."
    },
    {
      titre: "Réduire",
      etapes: [
        "Souligne de couleurs différentes les termes en $x^2$, en $x$ et les nombres.",
        "Additionne les coefficients de chaque catégorie.",
        "Écris le résultat dans l'ordre $x^2$, $x$, nombre."
      ],
      exemple: "$4x - 3 + x^2 - 6x = x^2 - 2x - 3$."
    }
  ],
  erreurs: [
    "Oublier de multiplier le deuxième terme de la parenthèse.",
    "Oublier de changer les signes après un $-$ devant une parenthèse.",
    "Réduire $3x^2 + 2x$ en $5x^2$ ou $5x^3$.",
    "Remplacer un nombre négatif sans parenthèses : $-3^2$ au lieu de $(-3)^2$.",
    "Croire qu'un exemple suffit à prouver une égalité."
  ]
};
