/*
  CHAPITRE : Seconde — Calcul littéral et équations
  --------------------------------------------------
  Chapitre 5 de la progression spiralée 2026-2027 (programme de Seconde 2026).
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce, programme Python entre ```python et ```).
  Vidéos : celles de la playlist « Secondes : automatismes » de la chaîne d'abord, Yvan Monka en complément.
  Pas encore de PDF pour ce chapitre : ajouter les liens dans pdfs le moment venu.
  Les générateurs d'exercices commencent par « cl- » dans assets/exercices.js
  (le chapitre reprend aussi am-isoler et am-produit-nul de la partie Automatismes).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["seconde-calcul-litteral"] = {
  niveau: "Seconde",
  numero: 5,
  titre: "Calcul littéral et équations",
  accroche: "Puissances, racines carrées, développer, factoriser, résoudre : les outils de calcul dont tu auras besoin toute l'année.",

  playlist: "https://www.youtube.com/playlist?list=PLVTjofGlms14", // playlist « Secondes : automatismes »
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur les puissances en vidéo (Yvan Monka)", url: "https://youtu.be/XA-JkXirNz4", type: "video" },
    { titre: "Le cours sur les racines carrées en vidéo (Yvan Monka)", url: "https://youtu.be/8Atxa6iMVsw", type: "video" },
    { titre: "Le cours sur les équations en vidéo (Yvan Monka)", url: "https://youtu.be/WoTpA2RyuVU", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Puissances entières relatives",
      video: { titre: "Vidéo de ton prof : puissances et écriture scientifique", youtube: "https://youtu.be/DKvTtv77YIw" },
      texte:
        "Pour $a \\neq 0$ et $n$ entier positif : $a^n = a \\times a \\times \\ldots \\times a$ ($n$ facteurs), $a^0 = 1$ et $a^{-n} = \\dfrac{1}{a^n}$.\n\n" +
        "Règles de calcul, pour $n$ et $p$ entiers relatifs :\n" +
        "- $a^n \\times a^p = a^{n+p}$ et $\\dfrac{a^n}{a^p} = a^{n-p}$\n" +
        "- $(a^n)^p = a^{n \\times p}$ et $(a \\times b)^n = a^n \\times b^n$\n\n" +
        "Attention aux signes : $(-3)^4 = 81$ mais $-3^4 = -81$ (sans parenthèses, la puissance ne porte que sur $3$).",
      exemple: {
        enonce: "Écrire sous la forme d'une seule puissance : $A = 4^5 \\times 4^7$ ; $B = \\dfrac{5^4}{5^6}$ ; $C = 7^3 \\times (7^2)^6$.",
        solution: "$A = 4^{5+7} = 4^{12}$.\n\n$B = 5^{4-6} = 5^{-2}$.\n\n$C = 7^3 \\times 7^{12} = 7^{15}$."
      }
    },
    {
      titre: "Racines carrées",
      video: { titre: "Vidéo d'Yvan Monka : extraire un carré parfait d'une racine carrée", youtube: "https://youtu.be/cz27kb_qTy4" },
      texte:
        "Pour $a \\geqslant 0$, $\\sqrt{a}$ est le nombre **positif** dont le carré est $a$ : $\\sqrt{49} = 7$. La racine carrée d'un nombre négatif n'existe pas.\n\n" +
        "- $(\\sqrt{a})^2 = a$ pour $a \\geqslant 0$, et $\\sqrt{a^2} = |a|$ pour tout réel $a$ : $\\sqrt{(-5)^2} = \\sqrt{25} = 5$.\n" +
        "- Pour $a$ et $b$ positifs : $\\sqrt{a \\times b} = \\sqrt{a} \\times \\sqrt{b}$ et $\\sqrt{\\dfrac{a}{b}} = \\dfrac{\\sqrt{a}}{\\sqrt{b}}$ ($b \\neq 0$).\n" +
        "- Mais $\\sqrt{a + b} \\neq \\sqrt{a} + \\sqrt{b}$ : $\\sqrt{9 + 16} = 5$, alors que $\\sqrt{9} + \\sqrt{16} = 7$.\n\n" +
        "**Extraire un carré parfait** : $\\sqrt{72} = \\sqrt{36 \\times 2} = 6\\sqrt{2}$.",
      exemple: {
        enonce: "Écrire le plus simplement possible : $\\sqrt{3} \\times \\sqrt{27}$ ; $\\sqrt{45}$ ; $\\sqrt{12} + 7\\sqrt{3}$.",
        solution: "$\\sqrt{3} \\times \\sqrt{27} = \\sqrt{81} = 9$.\n\n$\\sqrt{45} = \\sqrt{9 \\times 5} = 3\\sqrt{5}$.\n\n$\\sqrt{12} + 7\\sqrt{3} = 2\\sqrt{3} + 7\\sqrt{3} = 9\\sqrt{3}$."
      }
    },
    {
      titre: "Démonstration : $\\sqrt{ab} = \\sqrt{a} \\times \\sqrt{b}$",
      video: { titre: "Vidéo d'Yvan Monka : démontrer que √a × √b = √(ab)", youtube: "https://youtu.be/gzp16wnchaU" },
      texte:
        "**Propriété** : pour tous réels positifs $a$ et $b$, $\\sqrt{ab} = \\sqrt{a} \\times \\sqrt{b}$.\n\n" +
        "**Démonstration**.\n" +
        "- $\\left(\\sqrt{a} \\times \\sqrt{b}\\right)^2 = (\\sqrt{a})^2 \\times (\\sqrt{b})^2 = a \\times b$.\n" +
        "- $\\left(\\sqrt{ab}\\right)^2 = ab$, car $ab \\geqslant 0$.\n" +
        "- Les nombres $\\sqrt{a} \\times \\sqrt{b}$ et $\\sqrt{ab}$ sont **positifs** et ont le même carré : ils sont égaux.\n\n" +
        "La dernière étape est importante : $3$ et $-3$ ont le même carré, mais ne sont pas égaux. C'est la positivité qui permet de conclure.",
      exemple: {
        enonce: "Vrai ou faux : $\\sqrt{16 + 9} = \\sqrt{16} + \\sqrt{9}$ ?",
        solution: "**Faux** : $\\sqrt{16 + 9} = \\sqrt{25} = 5$ et $\\sqrt{16} + \\sqrt{9} = 4 + 3 = 7$. Ce **contre-exemple** suffit. La propriété marche pour le produit, pas pour la somme."
      }
    },
    {
      titre: "Développer : distributivité et identités remarquables",
      figure: "identite-carre",
      video: { titre: "Vidéo de ton prof : identités remarquables, développer et factoriser", youtube: "https://youtu.be/zrIo7AksY5o" },
      texte:
        "**Développer**, c'est transformer un produit en somme.\n" +
        "- Distributivité : $k(a + b) = ka + kb$.\n" +
        "- Double distributivité : $(a + b)(c + d) = ac + ad + bc + bd$.\n\n" +
        "**Identités remarquables**, à connaître par cœur :\n" +
        "- $(a + b)^2 = a^2 + 2ab + b^2$\n" +
        "- $(a - b)^2 = a^2 - 2ab + b^2$\n" +
        "- $(a + b)(a - b) = a^2 - b^2$\n\n" +
        "Un signe moins devant une parenthèse change tous les signes à l'intérieur : $-(a - b) = -a + b = b - a$.",
      exemple: {
        enonce: "Développer et réduire $A = (2x - 3)^2$ et $B = (x + 4)(3x - 1)$.",
        solution: "$A = (2x)^2 - 2 \\times 2x \\times 3 + 3^2 = 4x^2 - 12x + 9$.\n\n$B = 3x^2 - x + 12x - 4 = 3x^2 + 11x - 4$."
      }
    },
    {
      titre: "Factoriser et choisir la bonne forme",
      video: { titre: "Vidéo de ton prof : forme développée ou factorisée ?", youtube: "https://youtu.be/QcZ8u7ROq60" },
      texte:
        "**Factoriser**, c'est transformer une somme en produit.\n" +
        "- On cherche d'abord un **facteur commun** : $ka + kb = k(a + b)$, même quand $k$ est une parenthèse.\n" +
        "- Sinon, on reconnaît une identité remarquable lue de droite à gauche : $a^2 - b^2 = (a - b)(a + b)$.\n\n" +
        "**Choisir la forme adaptée** :\n" +
        "- forme **développée** pour calculer une image ou comparer avec une autre expression ;\n" +
        "- forme **factorisée** pour résoudre une équation $= 0$ ou étudier un signe.",
      exemple: {
        enonce: "Factoriser $C = (x + 1)(2x - 3) + (x + 1)(x + 5)$ et $D = 9x^2 - 25$.",
        solution: "$C = (x + 1)\\big[(2x - 3) + (x + 5)\\big] = (x + 1)(3x + 2)$.\n\n$D = (3x)^2 - 5^2 = (3x - 5)(3x + 5)$."
      }
    },
    {
      titre: "Expressions fractionnaires",
      video: { titre: "Vidéo d'Yvan Monka : réduire au même dénominateur", youtube: "https://youtu.be/Id_udNTKsqI" },
      texte:
        "Une expression comme $\\dfrac{7}{x - 2}$ n'existe que si son dénominateur n'est pas nul : ici $x \\neq 2$.\n\n" +
        "Pour additionner ou soustraire deux quotients, on les écrit avec le **même dénominateur** :\n\n" +
        "$\\dfrac{a}{b} + \\dfrac{c}{d} = \\dfrac{ad}{bd} + \\dfrac{cb}{bd} = \\dfrac{ad + cb}{bd}$.\n\n" +
        "Un entier s'écrit aussi comme un quotient : $3 = \\dfrac{3(2x + 1)}{2x + 1}$.",
      exemple: {
        enonce: "Pour $x \\neq 2$, écrire $A = \\dfrac{7}{x - 2} - \\dfrac{5}{3}$ sous la forme d'un seul quotient.",
        solution: "$A = \\dfrac{7 \\times 3}{3(x - 2)} - \\dfrac{5(x - 2)}{3(x - 2)} = \\dfrac{21 - 5x + 10}{3(x - 2)} = \\dfrac{31 - 5x}{3(x - 2)}$."
      }
    },
    {
      titre: "Équations du premier degré",
      video: { titre: "Vidéo de ton prof : équations et inéquations", youtube: "https://youtu.be/2Fv54-YT1lI" },
      texte:
        "Pour résoudre $ax + b = cx + d$, on transforme l'équation en une équation **équivalente** ($\\iff$), qui a les mêmes solutions :\n" +
        "- on peut ajouter ou soustraire un même nombre (ou un même terme en $x$) aux deux membres ;\n" +
        "- on peut multiplier ou diviser les deux membres par un même nombre **non nul**.\n\n" +
        "Méthode : on regroupe les $x$ d'un côté, les nombres de l'autre, puis on divise par le coefficient de $x$.",
      exemple: {
        enonce: "Résoudre $5x - 7 = 2x + 8$.",
        solution: "$5x - 7 = 2x + 8 \\iff 5x - 2x = 8 + 7 \\iff 3x = 15 \\iff x = 5$.\n\nVérification : $5 \\times 5 - 7 = 18$ et $2 \\times 5 + 8 = 18$. La solution est $5$."
      }
    },
    {
      titre: "L'équation $x^2 = a$",
      figure: "carre-niveaux",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation du type x² = a", youtube: "https://youtu.be/ef15aeQRs6w" },
      texte:
        "Le nombre de solutions de $x^2 = a$ dépend du signe de $a$ :\n" +
        "- si $a < 0$ : **aucune** solution (un carré n'est jamais négatif) ;\n" +
        "- si $a = 0$ : **une** solution, $0$ ;\n" +
        "- si $a > 0$ : **deux** solutions, $-\\sqrt{a}$ et $\\sqrt{a}$.\n\n" +
        "On le voit sur la parabole $y = x^2$ : la droite horizontale $y = a$ la coupe en $0$, $1$ ou $2$ points.",
      exemple: {
        enonce: "Résoudre $x^2 = 49$, $x^2 = 7$ et $x^2 = -4$.",
        solution: "$x^2 = 49$ : deux solutions, $-7$ et $7$.\n\n$x^2 = 7$ : deux solutions, $-\\sqrt{7}$ et $\\sqrt{7}$.\n\n$x^2 = -4$ : aucune solution."
      }
    },
    {
      titre: "Équation produit nul",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation-produit", youtube: "https://youtu.be/EFgwA5f6-40" },
      texte:
        "**Propriété** : un produit est nul si et seulement si l'un au moins de ses facteurs est nul.\n\n" +
        "$A \\times B = 0 \\iff A = 0$ **ou** $B = 0$.\n\n" +
        "Le « ou » veut dire : l'un, l'autre, ou les deux. On résout chaque petite équation, et on rassemble toutes les solutions.\n\n" +
        "Si l'équation n'est pas sous la forme « produit $= 0$ », on passe tout du même côté, puis on **factorise**.",
      exemple: {
        enonce: "Résoudre $(2x - 6)(x + 5) = 0$, puis $x^2 = 3x$.",
        solution: "$2x - 6 = 0$ ou $x + 5 = 0$, donc $x = 3$ ou $x = -5$. Deux solutions : $-5$ et $3$.\n\n$x^2 = 3x \\iff x^2 - 3x = 0 \\iff x(x - 3) = 0 \\iff x = 0$ ou $x = 3$."
      }
    },
    {
      titre: "Isoler une variable dans une formule",
      video: { titre: "Vidéo de ton prof : isoler une variable dans une formule", youtube: "https://youtu.be/4h0pTjSfrdE" },
      texte:
        "Une formule de physique ou de géométrie se manipule comme une équation : on fait la même opération des deux côtés.\n\n" +
        "- $U = RI \\iff I = \\dfrac{U}{R}$ (on divise par $R$).\n" +
        "- $d = vt \\iff t = \\dfrac{d}{v}$.\n" +
        "- $V = \\pi r^2 h \\iff h = \\dfrac{V}{\\pi r^2}$.\n" +
        "- $ax + by = c \\iff y = \\dfrac{c - ax}{b}$ (pour $b \\neq 0$).",
      exemple: {
        enonce: "La barge parcourt $d = 2{,}5$ km à la vitesse moyenne $v = 15$ km/h. Exprimer $t$ en fonction de $d$ et $v$, puis calculer la durée en minutes.",
        solution: "$d = vt \\iff t = \\dfrac{d}{v}$. Donc $t = \\dfrac{2{,}5}{15} = \\dfrac{1}{6}$ h, soit $10$ minutes."
      }
    },
    {
      titre: "Python : la boucle while",
      texte:
        "La boucle $\\texttt{while}$ (« tant que ») répète des instructions **tant qu'une condition est vraie**. On l'utilise quand on ne sait pas à l'avance combien de tours il faudra.\n\n" +
        "Première puissance de $a$ qui dépasse $s$ :\n\n" +
        "```python\ndef premiere_puissance(a, s):\n    n = 0\n    p = 1\n    while p <= s:\n        p = p * a\n        n = n + 1\n    return n\n```\n\n" +
        "À chaque tour, $p$ est multiplié par $a$ et $n$ augmente de $1$ : à la fin, $p = a^n$ est la première puissance strictement supérieure à $s$.",
      exemple: {
        enonce: "Que renvoie $\\texttt{premiere\\_puissance(2, 100)}$ ?",
        solution: "$p$ prend les valeurs $1$, $2$, $4$, $8$, $16$, $32$, $64$, puis $128 > 100$ : la boucle s'arrête. $128 = 2^7$, la fonction renvoie $7$."
      }
    }
  ],

  /* Exercices corrigés en vidéo (playlist « Secondes : automatismes ») */
  videos: [
    { titre: "#07 Supprimer les parenthèses", type: "Développer", youtube: "https://youtu.be/FX8UOq0J7uM" },
    { titre: "#12 Applications numériques et modélisation", type: "Formules", youtube: "https://youtu.be/WOSEvJv7GwQ" }
  ],
  videosNote: "Énoncés dans le dossier élève des automatismes (Drive de la chaîne).",

  /* ---------- 2. EXERCICES INTERACTIFS ----------
     Chaque série tire des nombres au hasard : on peut la refaire autant qu'on veut.
     type : nom du générateur (voir assets/exercices.js). nb : nombre de questions. */
  exercices: [
    { type: "cl-puissances", titre: "Calculer avec les puissances", etape: "Puissances et racines", nb: 6 },
    { type: "cl-racines", titre: "Simplifier des racines carrées", etape: "Puissances et racines", nb: 6 },
    { type: "cl-developper", titre: "Développer et réduire", etape: "Développer, factoriser", nb: 6 },
    { type: "cl-factoriser", titre: "Factoriser", etape: "Développer, factoriser", nb: 6 },
    { type: "cl-fraction", titre: "Réduire au même dénominateur", etape: "Développer, factoriser", nb: 4 },
    { type: "cl-equation", titre: "Résoudre ax + b = cx + d", etape: "Équations", nb: 6 },
    { type: "cl-carre", titre: "Résoudre x² = a", etape: "Équations", nb: 5 },
    { type: "am-produit-nul", titre: "Équation produit nul", etape: "Équations", nb: 5 },
    { type: "am-isoler", titre: "Isoler une variable dans une formule", etape: "Équations", nb: 5 },
    { type: "cl-python", titre: "Python : la boucle while", etape: "Python", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ----------
     bonne : numéro de la bonne réponse en partant de 0 (0 = la première). */
  qcm: [
    {
      question: "$2^5 \\times 2^{-3}$ est égal à :",
      choix: ["$2^2$", "$2^{-15}$", "$4^2$", "$2^8$"],
      bonne: 0,
      explication: "On additionne les exposants : $5 + (-3) = 2$. Donc $2^5 \\times 2^{-3} = 2^2 = 4$."
    },
    {
      question: "$-2^4$ est égal à :",
      choix: ["$-16$", "$16$", "$-8$", "$8$"],
      bonne: 0,
      explication: "Sans parenthèses, la puissance ne porte que sur $2$ : $-2^4 = -(2^4) = -16$. Avec parenthèses, $(-2)^4 = 16$."
    },
    {
      question: "$\\sqrt{(-7)^2}$ est égal à :",
      choix: ["$7$", "$-7$", "$49$", "n'existe pas"],
      bonne: 0,
      explication: "$(-7)^2 = 49$ et $\\sqrt{49} = 7$. Une racine carrée n'est jamais négative : $\\sqrt{a^2} = |a|$."
    },
    {
      question: "$\\sqrt{50}$ s'écrit aussi :",
      choix: ["$5\\sqrt{2}$", "$25\\sqrt{2}$", "$2\\sqrt{5}$", "$10\\sqrt{5}$"],
      bonne: 0,
      explication: "$50 = 25 \\times 2$, donc $\\sqrt{50} = \\sqrt{25} \\times \\sqrt{2} = 5\\sqrt{2}$."
    },
    {
      question: "La forme développée de $(x - 5)^2$ est :",
      choix: ["$x^2 - 10x + 25$", "$x^2 - 25$", "$x^2 + 25$", "$x^2 - 5x + 25$"],
      bonne: 0,
      explication: "$(a - b)^2 = a^2 - 2ab + b^2$ : $x^2 - 2 \\times x \\times 5 + 25 = x^2 - 10x + 25$. Ne pas oublier le double produit."
    },
    {
      question: "Une forme factorisée de $4x^2 - 9$ est :",
      choix: ["$(2x - 3)(2x + 3)$", "$(2x - 3)^2$", "$(4x - 9)(4x + 9)$", "$(4x - 3)(x + 3)$"],
      bonne: 0,
      explication: "$4x^2 - 9 = (2x)^2 - 3^2 = (2x - 3)(2x + 3)$, avec $a^2 - b^2 = (a - b)(a + b)$."
    },
    {
      question: "Pour résoudre $(x - 2)(x + 7) = 0$, la forme la plus adaptée est :",
      choix: ["la forme factorisée, déjà donnée", "la forme développée $x^2 + 5x - 14$", "on ne peut pas résoudre", "la calculatrice uniquement"],
      bonne: 0,
      explication: "Un produit est nul si l'un des facteurs est nul : $x = 2$ ou $x = -7$. La forme factorisée donne directement les solutions."
    },
    {
      question: "La solution de $3x + 4 = x - 6$ est :",
      choix: ["$-5$", "$5$", "$-\\dfrac{1}{2}$", "$-1$"],
      bonne: 0,
      explication: "$3x - x = -6 - 4 \\iff 2x = -10 \\iff x = -5$."
    },
    {
      question: "L'équation $x^2 = -9$ a :",
      choix: ["aucune solution", "une solution : $-3$", "deux solutions : $-3$ et $3$", "une solution : $3$"],
      bonne: 0,
      explication: "Un carré est toujours positif ou nul : il ne peut pas valoir $-9$."
    },
    {
      question: "Les solutions de $x^2 = 5x$ sont :",
      choix: ["$0$ et $5$", "$5$ seulement", "$-5$ et $5$", "$0$ seulement"],
      bonne: 0,
      explication: "$x^2 - 5x = 0 \\iff x(x - 5) = 0 \\iff x = 0$ ou $x = 5$. Diviser par $x$ ferait perdre la solution $0$."
    },
    {
      question: "De $V = \\pi r^2 h$, on tire :",
      choix: ["$h = \\dfrac{V}{\\pi r^2}$", "$h = V - \\pi r^2$", "$h = \\dfrac{\\pi r^2}{V}$", "$h = V \\pi r^2$"],
      bonne: 0,
      explication: "$h$ est multiplié par $\\pi r^2$ : on divise les deux membres par $\\pi r^2$."
    },
    {
      question: "Pour $x \\neq -1$, $2 + \\dfrac{3}{x + 1}$ est égal à :",
      choix: ["$\\dfrac{2x + 5}{x + 1}$", "$\\dfrac{5}{x + 1}$", "$\\dfrac{2x + 3}{x + 1}$", "$\\dfrac{5}{x + 3}$"],
      bonne: 0,
      explication: "$2 = \\dfrac{2(x + 1)}{x + 1}$, donc la somme vaut $\\dfrac{2x + 2 + 3}{x + 1} = \\dfrac{2x + 5}{x + 1}$."
    },
    { question: "$\\dfrac{3^7}{3^{-2}}$ est égal à :", choix: ["$3^9$", "$3^5$", "$3^{-14}$", "$3^{-9}$"], bonne: 0, explication: "Pour un quotient, on soustrait les exposants : $7 - (-2) = 7 + 2 = 9$. Donc $\\dfrac{3^7}{3^{-2}} = 3^9$." },
    { question: "$(5^3)^4$ est égal à :", choix: ["$5^{12}$", "$5^7$", "$5^{81}$", "$20^3$"], bonne: 0, explication: "Pour une puissance de puissance, on multiplie les exposants : $(5^3)^4 = 5^{3 \\times 4} = 5^{12}$. On additionne seulement pour un produit $5^3 \\times 5^4$." },
    { question: "$10^{-3}$ est égal à :", choix: ["$0{,}001$", "$-1\\,000$", "$-30$", "$0{,}0001$"], bonne: 0, explication: "$10^{-3} = \\dfrac{1}{10^3} = \\dfrac{1}{1\\,000} = 0{,}001$. Un exposant négatif ne rend pas le nombre négatif." },
    { question: "$(2x)^3$ est égal à :", choix: ["$8x^3$", "$2x^3$", "$6x^3$", "$6x$"], bonne: 0, explication: "$(a \\times b)^n = a^n \\times b^n$ : $(2x)^3 = 2^3 \\times x^3 = 8x^3$. La puissance porte sur les deux facteurs." },
    { question: "$\\sqrt{12} \\times \\sqrt{3}$ est égal à :", choix: ["$6$", "$\\sqrt{15}$", "$36$", "$3\\sqrt{2}$"], bonne: 0, explication: "$\\sqrt{12} \\times \\sqrt{3} = \\sqrt{12 \\times 3} = \\sqrt{36} = 6$." },
    { question: "$\\sqrt{18} + \\sqrt{8}$ est égal à :", choix: ["$5\\sqrt{2}$", "$\\sqrt{26}$", "$5\\sqrt{4}$", "$6\\sqrt{2}$"], bonne: 0, explication: "$\\sqrt{18} = \\sqrt{9 \\times 2} = 3\\sqrt{2}$ et $\\sqrt{8} = \\sqrt{4 \\times 2} = 2\\sqrt{2}$ : la somme vaut $5\\sqrt{2}$. Attention, $\\sqrt{18 + 8} \\neq \\sqrt{18} + \\sqrt{8}$." },
    { question: "Vrai ou faux : pour tout réel $a$, $\\sqrt{a^2} = a$.", choix: ["Faux", "Vrai"], bonne: 0, explication: "Contre-exemple : $\\sqrt{(-5)^2} = \\sqrt{25} = 5 \\neq -5$. Une racine carrée est toujours positive : $\\sqrt{a^2} = |a|$." },
    { question: "La forme développée de $(3x + 2)^2$ est :", choix: ["$9x^2 + 12x + 4$", "$9x^2 + 4$", "$3x^2 + 12x + 4$", "$9x^2 + 6x + 4$"], bonne: 0, explication: "$(a + b)^2 = a^2 + 2ab + b^2$ avec $a = 3x$ et $b = 2$ : $(3x)^2 + 2 \\times 3x \\times 2 + 2^2 = 9x^2 + 12x + 4$." },
    { question: "La forme développée de $(2x - 1)(x + 3)$ est :", choix: ["$2x^2 + 5x - 3$", "$2x^2 - 3$", "$2x^2 + 7x - 3$", "$2x^2 + 5x + 3$"], bonne: 0, explication: "Double distributivité : $2x \\times x + 2x \\times 3 - 1 \\times x - 1 \\times 3 = 2x^2 + 6x - x - 3 = 2x^2 + 5x - 3$." },
    { question: "$5 - (2x - 3)$ est égal à :", choix: ["$8 - 2x$", "$2 - 2x$", "$8 + 2x$", "$2 + 2x$"], bonne: 0, explication: "Le signe moins devant la parenthèse change tous les signes : $5 - (2x - 3) = 5 - 2x + 3 = 8 - 2x$." },
    { question: "Une forme factorisée de $(x + 1)(2x - 3) + (x + 1)(x + 5)$ est :", choix: ["$(x + 1)(3x + 2)$", "$(x + 1)(x - 8)$", "$(x + 1)^2(3x + 2)$", "$2(x + 1)(3x + 2)$"], bonne: 0, explication: "Le facteur commun est la parenthèse $(x + 1)$ : $(x + 1)\\big[(2x - 3) + (x + 5)\\big] = (x + 1)(3x + 2)$." },
    { question: "Une forme factorisée de $x^2 + 10x + 25$ est :", choix: ["$(x + 5)^2$", "$(x - 5)^2$", "$(x + 5)(x - 5)$", "$x(x + 10) + 25$"], bonne: 0, explication: "On reconnaît $a^2 + 2ab + b^2$ avec $a = x$ et $b = 5$, car $2 \\times x \\times 5 = 10x$. $x(x + 10) + 25$ est une somme, pas un produit." },
    { question: "Les solutions de $(2x - 6)(x + 4) = 0$ sont :", choix: ["$3$ et $-4$", "$6$ et $-4$", "$-3$ et $4$", "$3$ seulement"], bonne: 0, explication: "Un produit est nul si l'un des facteurs est nul : $2x - 6 = 0 \\iff x = 3$, ou $x + 4 = 0 \\iff x = -4$." },
    { question: "La solution de $\\dfrac{x}{3} - 1 = 4$ est :", choix: ["$15$", "$\\dfrac{5}{3}$", "$9$", "$13$"], bonne: 0, explication: "$\\dfrac{x}{3} - 1 = 4 \\iff \\dfrac{x}{3} = 5 \\iff x = 15$ : on multiplie les deux membres par $3$." },
    { question: "L'équation $x^2 = 7$ a pour solutions :", choix: ["$-\\sqrt{7}$ et $\\sqrt{7}$", "$\\sqrt{7}$ seulement", "$49$", "$-49$ et $49$"], bonne: 0, explication: "$7 > 0$ : il y a deux solutions opposées, $-\\sqrt{7}$ et $\\sqrt{7}$, car $(-\\sqrt{7})^2 = 7$ aussi." },
    { question: "Pour $x \\neq 0$, $\\dfrac{1}{x} + \\dfrac{1}{3}$ est égal à :", choix: ["$\\dfrac{x + 3}{3x}$", "$\\dfrac{2}{x + 3}$", "$\\dfrac{2}{3x}$", "$\\dfrac{1}{x + 3}$"], bonne: 0, explication: "Même dénominateur $3x$ : $\\dfrac{1}{x} + \\dfrac{1}{3} = \\dfrac{3}{3x} + \\dfrac{x}{3x} = \\dfrac{x + 3}{3x}$. On n'additionne jamais les dénominateurs." },
    { question: "L'expression $\\dfrac{4}{2x + 6}$ existe pour :", choix: ["tout réel $x \\neq -3$", "tout réel $x \\neq 3$", "tout réel $x \\neq -6$", "tout réel $x$"], bonne: 0, explication: "Le dénominateur ne doit pas être nul : $2x + 6 = 0 \\iff x = -3$. Seule la valeur $-3$ est interdite." },
    { question: "Le périmètre d'un rectangle vaut $P = 2(L + \\ell)$. On en tire :", choix: ["$L = \\dfrac{P}{2} - \\ell$", "$L = \\dfrac{P - \\ell}{2}$", "$L = 2P - \\ell$", "$L = \\dfrac{P}{2\\ell}$"], bonne: 0, explication: "On divise par $2$ : $\\dfrac{P}{2} = L + \\ell$, puis on soustrait $\\ell$ : $L = \\dfrac{P}{2} - \\ell$." },
    { question: "Avec la fonction $\\texttt{premiere\\_puissance}$ du cours, que renvoie $\\texttt{premiere\\_puissance(2, 20)}$ ?", choix: ["$5$", "$4$", "$32$", "$16$"], bonne: 0, explication: "$p$ prend les valeurs $1$, $2$, $4$, $8$, $16$, puis $32$. La boucle s'arrête quand $p = 32 > 20$, après $5$ tours : la fonction renvoie $n = 5$, car $2^5 = 32$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer avec des puissances",
      etapes: [
        "Vérifier que les puissances ont la même base (ou le même exposant).",
        "Produit : additionner les exposants. Quotient : soustraire. Puissance de puissance : multiplier.",
        "Exposant négatif : $a^{-n} = \\dfrac{1}{a^n}$."
      ],
      exemple: "$\\dfrac{10^{-4}}{10^5} = 10^{-4-5} = 10^{-9}$."
    },
    {
      titre: "Simplifier une racine carrée",
      etapes: [
        "Chercher le plus grand carré parfait qui divise le nombre ($4$, $9$, $16$, $25$, $36$…).",
        "Écrire $\\sqrt{k^2 \\times m} = k\\sqrt{m}$.",
        "Regrouper les racines de la même « famille » : $2\\sqrt{3} + 7\\sqrt{3} = 9\\sqrt{3}$."
      ],
      exemple: "$\\sqrt{72} = \\sqrt{36 \\times 2} = 6\\sqrt{2}$."
    },
    {
      titre: "Développer avec une identité remarquable",
      etapes: [
        "Repérer $a$ et $b$ (avec leur coefficient : $a = 2x$).",
        "Appliquer la formule, sans oublier le double produit $2ab$.",
        "Calculer chaque terme : $(2x)^2 = 4x^2$."
      ],
      exemple: "$(3x + 1)^2 = 9x^2 + 6x + 1$."
    },
    {
      titre: "Factoriser",
      etapes: [
        "Chercher un facteur commun (un nombre, $x$, ou une parenthèse entière).",
        "Sinon, reconnaître $a^2 - b^2$, $a^2 + 2ab + b^2$ ou $a^2 - 2ab + b^2$.",
        "Vérifier en redéveloppant."
      ],
      exemple: "$x^2 - 6x + 9 = (x - 3)^2$ ; $3x^2 + 6x = 3x(x + 2)$."
    },
    {
      titre: "Résoudre une équation",
      etapes: [
        "Premier degré : regrouper les $x$ d'un côté, les nombres de l'autre, puis diviser.",
        "Avec un $x^2$ : tout passer du même côté, factoriser, puis utiliser le produit nul.",
        "$x^2 = a$ : regarder le signe de $a$ (0, 1 ou 2 solutions).",
        "Vérifier les solutions en les remplaçant dans l'équation de départ."
      ],
      exemple: "$x^2 = 4x \\iff x(x - 4) = 0 \\iff x = 0$ ou $x = 4$."
    }
  ],
  erreurs: [
    "Confondre $(-3)^2 = 9$ et $-3^2 = -9$.",
    "Multiplier les exposants pour un produit : $2^3 \\times 2^4 = 2^7$, pas $2^{12}$.",
    "Écrire $\\sqrt{a + b} = \\sqrt{a} + \\sqrt{b}$ : c'est faux ($\\sqrt{9 + 16} = 5 \\neq 7$).",
    "Oublier le double produit : $(x + 3)^2 \\neq x^2 + 9$.",
    "Oublier de changer les signes après un moins : $-(x - 4) = -x + 4$.",
    "Oublier la solution négative de $x^2 = 9$ : il y a $-3$ **et** $3$.",
    "Diviser par $x$ dans $x^2 = 5x$ : on perd la solution $0$. Il faut factoriser.",
    "Additionner les dénominateurs : $\\dfrac{1}{2} + \\dfrac{1}{3} \\neq \\dfrac{2}{5}$."
  ]
};
