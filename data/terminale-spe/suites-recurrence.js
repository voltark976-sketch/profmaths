/*
  CHAPITRE : Terminale spécialité — Suites numériques et récurrence
  -----------------------------------------------------------------
  Chapitre 1 de la progression de Terminale spécialité (V26, période 1, 3 semaines) :
  raisonnement par récurrence, comportement global d'une suite. Les limites de suites viennent au chapitre 4.
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce, virgule décimale {,} dans les formules).
  Vidéos : celles de la chaîne (rappels de Première) d'abord, puis Yvan Monka (cours 20SuitesTS1).
  Figures : "rec-dominos", "rec-bornee". Générateurs : rec- dans assets/exercices.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-spe-suites-recurrence"] = {
  niveau: "Terminale spécialité",
  numero: 1,
  titre: "Suites numériques et récurrence",
  accroche: "Démontrer qu'une propriété est vraie pour tous les entiers $n$ sans tous les essayer : le raisonnement par récurrence, puis le sens de variation et les bornes d'une suite.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours complet sur les suites en vidéo (Yvan Monka)", url: "https://youtu.be/MJv7_pkFcdA", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Rappels : définir une suite",
      video: { titre: "Vidéo de ton prof (rappel de Première) : notion de suite, formule explicite et récurrence", youtube: "https://youtu.be/sVkYEQQWvDo" },
      texte:
        "Une **suite** $(u_n)$ associe un nombre $u_n$ à chaque entier naturel $n$ (le **rang**).\n\n" +
        "- **Forme explicite** : $u_n$ se calcule directement à partir de $n$, par exemple $u_n = n^2 - 3n$.\n" +
        "- **Forme récurrente** : on donne le premier terme et la relation entre un terme et le suivant, par exemple $u_0 = 2$ et $u_{n+1} = 3u_n - 1$. On calcule alors les termes **un par un**.\n" +
        "- **Suite arithmétique** de raison $r$ : $u_{n+1} = u_n + r$, et $u_n = u_0 + nr$.\n" +
        "- **Suite géométrique** de raison $q$ : $u_{n+1} = q \\times u_n$, et $u_n = u_0 \\times q^n$.\n\n" +
        "Une forme récurrente permet de calculer les termes, mais pas directement $u_{100}$ : on cherche souvent une forme explicite, qu'il faut ensuite **démontrer**. C'est le rôle de la récurrence.",
      exemple: {
        enonce: "On pose $u_0 = 2$ et $u_{n+1} = 3u_n - 1$. Calcule $u_1$, $u_2$ et $u_3$.",
        solution: "$u_1 = 3 \\times 2 - 1 = 5$ ; $u_2 = 3 \\times 5 - 1 = 14$ ; $u_3 = 3 \\times 14 - 1 = 41$.\n\nLa suite n'est ni arithmétique ($5 - 2 \\neq 14 - 5$) ni géométrique ($\\dfrac{5}{2} \\neq \\dfrac{14}{5}$)."
      }
    },
    {
      titre: "Le raisonnement par récurrence",
      figure: "rec-dominos",
      video: { titre: "Vidéo d'Yvan Monka : apprendre à effectuer une démonstration par récurrence", youtube: "https://youtu.be/udGGlHdSAgc" },
      texte:
        "On veut démontrer qu'une propriété $P(n)$ est vraie pour tout entier $n \\geqslant n_0$. On procède en trois étapes :\n\n" +
        "- **Initialisation** : on vérifie que $P(n_0)$ est vraie (souvent $n_0 = 0$ ou $1$).\n" +
        "- **Hérédité** : on suppose que $P(n)$ est vraie pour **un** entier $n \\geqslant n_0$ fixé (c'est l'**hypothèse de récurrence**), et on démontre qu'alors $P(n + 1)$ est vraie.\n" +
        "- **Conclusion** : $P(n_0)$ est vraie et la propriété est héréditaire, donc $P(n)$ est vraie pour tout $n \\geqslant n_0$.\n\n" +
        "C'est comme une file de dominos : le premier tombe, et chaque domino qui tombe fait tomber le suivant, donc ils tombent tous.\n\n" +
        "**Attention** : les deux étapes sont indispensables. Sans initialisation, on peut « démontrer » une propriété fausse ; sans hérédité, vérifier quelques rangs ne prouve rien.",
      exemple: {
        enonce: "On pose $u_0 = 0$ et $u_{n+1} = 2u_n + 1$. Démontre que, pour tout entier naturel $n$, $u_n = 2^n - 1$.",
        solution: "Soit $P(n)$ : « $u_n = 2^n - 1$ ».\n\n**Initialisation** : $u_0 = 0$ et $2^0 - 1 = 0$, donc $P(0)$ est vraie.\n\n**Hérédité** : supposons $u_n = 2^n - 1$ pour un entier $n$ fixé. Alors $u_{n+1} = 2u_n + 1 = 2(2^n - 1) + 1 = 2^{n+1} - 2 + 1 = 2^{n+1} - 1$ : $P(n + 1)$ est vraie.\n\n**Conclusion** : par récurrence, $u_n = 2^n - 1$ pour tout entier naturel $n$."
      }
    },
    {
      titre: "Sommes et symbole $\\Sigma$",
      video: { titre: "Vidéo d'Yvan Monka : utiliser le symbole de somme Σ", youtube: "https://youtu.be/0zspJuzo7L8" },
      texte:
        "La somme $u_0 + u_1 + \\dots + u_n$ s'écrit $\\displaystyle\\sum_{k=0}^{n} u_k$ (« somme des $u_k$ pour $k$ allant de $0$ à $n$ »). La lettre $k$ est muette : on pourrait la remplacer par $i$.\n\n" +
        "Deux formules à connaître, démontrées par récurrence :\n\n" +
        "- $1 + 2 + \\dots + n = \\displaystyle\\sum_{k=1}^{n} k = \\dfrac{n(n + 1)}{2}$ ;\n" +
        "- pour $q \\neq 1$ : $1 + q + q^2 + \\dots + q^n = \\dfrac{q^{n+1} - 1}{q - 1}$.\n\n" +
        "**Hérédité de la première** : si $1 + \\dots + n = \\dfrac{n(n + 1)}{2}$, alors $1 + \\dots + n + (n + 1) = \\dfrac{n(n + 1)}{2} + (n + 1) = \\dfrac{(n + 1)(n + 2)}{2}$, qui est la formule au rang $n + 1$.",
      exemple: {
        enonce: "Démontre que, pour tout entier $n \\geqslant 1$, $1 + 3 + 5 + \\dots + (2n - 1) = n^2$.",
        solution: "**Initialisation** : pour $n = 1$, la somme vaut $1$ et $1^2 = 1$.\n\n**Hérédité** : supposons $1 + 3 + \\dots + (2n - 1) = n^2$. On ajoute le terme suivant, $2(n + 1) - 1 = 2n + 1$ : la somme devient $n^2 + 2n + 1 = (n + 1)^2$.\n\n**Conclusion** : la propriété est vraie pour tout $n \\geqslant 1$. Par exemple, la somme des $10$ premiers impairs vaut $100$."
      }
    },
    {
      titre: "Démontrer une inégalité par récurrence",
      video: { titre: "Vidéo d'Yvan Monka : démonstration par récurrence de l'inégalité de Bernoulli", youtube: "https://youtu.be/H6XJ2tB1_fg" },
      texte:
        "**Inégalité de Bernoulli** (démonstration au programme) : pour tout réel $a > 0$ et tout entier naturel $n$, $(1 + a)^n \\geqslant 1 + na$.\n\n" +
        "- Initialisation : $(1 + a)^0 = 1 \\geqslant 1 + 0 \\times a$.\n" +
        "- Hérédité : si $(1 + a)^n \\geqslant 1 + na$, on multiplie par $1 + a > 0$ : $(1 + a)^{n+1} \\geqslant (1 + na)(1 + a) = 1 + (n + 1)a + na^2 \\geqslant 1 + (n + 1)a$, car $na^2 \\geqslant 0$.\n\n" +
        "**Encadrer une suite** $u_{n+1} = f(u_n)$ : pour montrer que $a \\leqslant u_n \\leqslant b$ pour tout $n$, on utilise dans l'hérédité que $f$ est **croissante** sur $[a\\,;b]$ : de $a \\leqslant u_n \\leqslant b$, on déduit $f(a) \\leqslant u_{n+1} \\leqslant f(b)$, puis on vérifie que $f(a) \\geqslant a$ et $f(b) \\leqslant b$.\n\n" +
        "Attention : multiplier une inégalité par un nombre **négatif** en change le sens.",
      exemple: {
        enonce: "On pose $u_0 = 1$ et $u_{n+1} = \\sqrt{u_n + 6}$. Démontre que $0 \\leqslant u_n \\leqslant 3$ pour tout $n$.",
        solution: "La fonction $f : x \\mapsto \\sqrt{x + 6}$ est croissante sur $[0\\,;3]$.\n\n**Initialisation** : $0 \\leqslant u_0 = 1 \\leqslant 3$.\n\n**Hérédité** : si $0 \\leqslant u_n \\leqslant 3$, alors $f(0) \\leqslant f(u_n) \\leqslant f(3)$, soit $\\sqrt{6} \\leqslant u_{n+1} \\leqslant 3$. Comme $\\sqrt{6} \\geqslant 0$ : $0 \\leqslant u_{n+1} \\leqslant 3$.\n\n**Conclusion** : $0 \\leqslant u_n \\leqslant 3$ pour tout entier naturel $n$."
      }
    },
    {
      titre: "Sens de variation d'une suite",
      video: { titre: "Vidéo de ton prof (rappel de Première) : sens de variation d'une suite, trois méthodes", youtube: "https://youtu.be/jpI-dQAsU24" },
      texte:
        "$(u_n)$ est **croissante** si $u_{n+1} \\geqslant u_n$ pour tout $n$, **décroissante** si $u_{n+1} \\leqslant u_n$ pour tout $n$. Méthodes :\n\n" +
        "- étudier le **signe de** $u_{n+1} - u_n$ ;\n" +
        "- si tous les termes sont **strictement positifs**, comparer $\\dfrac{u_{n+1}}{u_n}$ à $1$ ;\n" +
        "- si $u_n = f(n)$ avec $f$ monotone sur $[0\\,;+\\infty[$, la suite a le même sens de variation que $f$ ;\n" +
        "- **par récurrence** pour une suite $u_{n+1} = f(u_n)$ : on démontre $u_n \\leqslant u_{n+1}$ (ou $\\geqslant$). Si $f$ est croissante, $u_n \\leqslant u_{n+1}$ donne $f(u_n) \\leqslant f(u_{n+1})$, soit $u_{n+1} \\leqslant u_{n+2}$.\n\n" +
        "Attention : pour $u_{n+1} = f(u_n)$, la suite n'a pas forcément le sens de variation de $f$ ; il faut comparer les deux premiers termes.",
      exemple: {
        enonce: "On pose $u_0 = 1$ et $u_{n+1} = 0{,}5u_n + 3$. Démontre que la suite est croissante.",
        solution: "Soit $P(n)$ : « $u_n \\leqslant u_{n+1}$ ».\n\n**Initialisation** : $u_1 = 3{,}5$ et $u_0 = 1 \\leqslant 3{,}5$.\n\n**Hérédité** : si $u_n \\leqslant u_{n+1}$, alors $0{,}5u_n + 3 \\leqslant 0{,}5u_{n+1} + 3$ (on multiplie par $0{,}5 > 0$ puis on ajoute $3$), soit $u_{n+1} \\leqslant u_{n+2}$.\n\n**Conclusion** : $u_n \\leqslant u_{n+1}$ pour tout $n$, la suite est croissante."
      }
    },
    {
      titre: "Suites majorées, minorées, bornées",
      figure: "rec-bornee",
      video: { titre: "Vidéo d'Yvan Monka : démontrer qu'une suite est majorée ou minorée", youtube: "https://youtu.be/F1u_BVwiW8E" },
      texte:
        "- $(u_n)$ est **majorée** s'il existe un réel $M$ tel que $u_n \\leqslant M$ pour tout $n$ ($M$ est un **majorant**).\n" +
        "- $(u_n)$ est **minorée** s'il existe un réel $m$ tel que $u_n \\geqslant m$ pour tout $n$.\n" +
        "- $(u_n)$ est **bornée** si elle est à la fois majorée et minorée.\n\n" +
        "Un majorant n'est pas unique : si $5$ est un majorant, $6$ et $100$ aussi. Le majorant doit être **le même pour tous les termes** : il ne dépend pas de $n$.\n\n" +
        "- Une suite croissante est minorée par son premier terme ; une suite décroissante est majorée par son premier terme.\n" +
        "- Pour majorer ou minorer, on encadre le morceau qui dépend de $n$, ou on raisonne par récurrence.\n\n" +
        "Ces propriétés serviront au chapitre 4 pour étudier les limites (théorème de convergence monotone).",
      exemple: {
        enonce: "Démontre que la suite $u_n = 2 + \\dfrac{3}{n + 1}$ est bornée.",
        solution: "Pour tout $n \\geqslant 0$, $n + 1 \\geqslant 1$, donc $0 < \\dfrac{3}{n + 1} \\leqslant 3$.\n\nEn ajoutant $2$ : $2 < u_n \\leqslant 5$. La suite est minorée par $2$ et majorée par $5$ : elle est bornée (voir la figure)."
      }
    },
    {
      titre: "Algorithmique : suites en Python",
      video: { titre: "Vidéo de ton prof (rappel de Première) : limite d'une suite et recherche de seuil", youtube: "https://youtu.be/ug71_j3MXlo" },
      texte:
        "Trois programmes types, à savoir lire et écrire :\n\n" +
        "- **Calculer un terme** : une boucle $\\texttt{for}$ répète la relation de récurrence.\n" +
        "- **Calculer une somme** : on ajoute chaque terme à une variable $\\texttt{s}$ qui vaut $0$ au départ.\n" +
        "- **Chercher un seuil** : une boucle $\\texttt{while}$ calcule les termes **tant que** la condition est vraie, et compte les étapes.\n\n" +
        "```python\ndef seuil(S):\n    n = 0\n    u = 100\n    while u < S:\n        u = 1.05 * u\n        n = n + 1\n    return n\n```\n\n" +
        "Attention : $\\texttt{range(1, n + 1)}$ va de $1$ à $n$ ; la borne de droite est **exclue**.",
      exemple: {
        enonce: "Que renvoie $\\texttt{seuil(120)}$ ?",
        solution: "Le programme calcule $u_1 = 105$, $u_2 = 110{,}25$, $u_3 \\approx 115{,}76$, $u_4 \\approx 121{,}55$ : c'est le premier terme qui n'est plus inférieur à $120$.\n\nLa fonction renvoie $4$ : il faut $4$ hausses de $5\\,\\%$ pour dépasser $120$."
      }
    }
  ],

  videos: [
    { titre: "Effectuer une démonstration par récurrence", type: "Récurrence", youtube: "https://youtu.be/LXSJB0BnPD4" },
    { titre: "Démontrer par récurrence l'expression générale d'une suite", type: "Récurrence", youtube: "https://youtu.be/OIUi3MG8efY" },
    { titre: "Démontrer par récurrence la monotonie d'une suite", type: "Variations", youtube: "https://youtu.be/nMnLaE2RAGk" },
    { titre: "Prépare ton bac : les suites", type: "Bac", youtube: "https://youtu.be/Iq0I4L_OX2s" },
    { titre: "Prépare ton bac : suites, pourcentages et algorithme", type: "Bac", youtube: "https://youtu.be/d4ZLf-GqTVo" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "rec-explicite", titre: "Rappels : suites arithmétiques et géométriques", etape: "Calculer des termes", nb: 5 },
    { type: "rec-termes", titre: "Calculer des termes d'une suite récurrente", etape: "Calculer des termes", nb: 5 },
    { type: "rec-sigma", titre: "Le symbole $\\Sigma$", etape: "Calculer des termes", nb: 4 },
    { type: "rec-etapes", titre: "Les étapes d'une récurrence", etape: "Raisonner par récurrence", nb: 5 },
    { type: "rec-conjecture", titre: "Conjecturer une formule", etape: "Raisonner par récurrence", nb: 4 },
    { type: "rec-sommes", titre: "Formules de sommes", etape: "Raisonner par récurrence", nb: 5 },
    { type: "rec-inegalite", titre: "Inégalités et récurrence", etape: "Raisonner par récurrence", nb: 5 },
    { type: "rec-variation", titre: "Sens de variation d'une suite", etape: "Comportement global", nb: 5 },
    { type: "rec-bornes", titre: "Suites majorées, minorées, bornées", etape: "Comportement global", nb: 5 },
    { type: "rec-python", titre: "Suites en Python", etape: "Algorithmique", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "La suite $(u_n)$ est définie par $u_0 = 3$ et $u_{n+1} = 2u_n - 1$. Que vaut $u_2$ ?", choix: ["$9$", "$5$", "$11$", "$7$"], bonne: 0, explication: "$u_1 = 2 \\times 3 - 1 = 5$, puis $u_2 = 2 \\times 5 - 1 = 9$." },
    { question: "Dans une démonstration par récurrence, l'**initialisation** consiste à :", choix: ["vérifier la propriété au premier rang", "supposer la propriété vraie pour tout $n$", "démontrer que $P(n)$ entraîne $P(n + 1)$", "vérifier la propriété pour quelques valeurs de $n$"], bonne: 0, explication: "On vérifie $P(n_0)$, le premier rang concerné (souvent $n = 0$ ou $n = 1$)." },
    { question: "Dans l'**hérédité**, on suppose que :", choix: ["$P(n)$ est vraie pour un entier $n$ fixé", "$P(n)$ est vraie pour tout entier $n$", "$P(n + 1)$ est vraie", "$P(0)$ est fausse"], bonne: 0, explication: "C'est l'hypothèse de récurrence : on la suppose pour **un** rang $n$ et on démontre $P(n + 1)$." },
    { question: "Une propriété est héréditaire, mais $P(0)$ est fausse. Que peut-on dire ?", choix: ["La récurrence ne permet pas de conclure", "$P(n)$ est vraie pour tout $n$", "$P(n)$ est fausse pour tout $n$", "$P(1)$ est forcément vraie"], bonne: 0, explication: "Sans initialisation, pas de conclusion. Par exemple « $n + 1 \\leqslant n$ » est héréditaire mais fausse pour tout $n$." },
    { question: "On a vérifié qu'une propriété est vraie pour $n = 0, 1, 2, \\dots, 100$. Est-elle démontrée pour tout $n$ ?", choix: ["Non, il faut encore démontrer l'hérédité", "Oui, $100$ cas suffisent", "Oui, si elle est aussi vraie pour $n = 101$", "Non, une propriété ne se démontre jamais pour tout $n$"], bonne: 0, explication: "Quelques cas, même nombreux, ne prouvent rien pour tous les entiers : il faut l'hérédité." },
    { question: "On pose $u_0 = 1$ et $u_{n+1} = 3u_n$. On veut démontrer $u_n = 3^n$. Que faut-il prouver dans l'hérédité ?", choix: ["Si $u_n = 3^n$, alors $u_{n+1} = 3^{n+1}$", "$u_0 = 3^0$", "$u_{n+1} = 3u_n$", "Si $u_{n+1} = 3^{n+1}$, alors $u_n = 3^n$"], bonne: 0, explication: "On part du rang $n$ pour arriver au rang $n + 1$ : $u_{n+1} = 3u_n = 3 \\times 3^n = 3^{n+1}$." },
    { question: "On suppose $u_n = 2^n + 1$ et on sait que $u_{n+1} = 2u_n - 1$. Alors $u_{n+1}$ vaut :", choix: ["$2^{n+1} + 1$", "$2^{n+1} + 2$", "$2^{n+1}$", "$4^n + 1$"], bonne: 0, explication: "$2(2^n + 1) - 1 = 2^{n+1} + 2 - 1 = 2^{n+1} + 1$." },
    { question: "Que vaut $\\displaystyle\\sum_{k=1}^{4} k^2$ ?", choix: ["$30$", "$100$", "$16$", "$10$"], bonne: 0, explication: "$1 + 4 + 9 + 16 = 30$. Attention, $100 = (1 + 2 + 3 + 4)^2$ n'est pas la même chose." },
    { question: "Que vaut $1 + 2 + 3 + \\dots + 100$ ?", choix: ["$5\\,050$", "$5\\,000$", "$10\\,100$", "$4\\,950$"], bonne: 0, explication: "$\\dfrac{100 \\times 101}{2} = 5\\,050$." },
    { question: "Que vaut $1 + 2 + 2^2 + \\dots + 2^{9}$ ?", choix: ["$1\\,023$", "$1\\,024$", "$512$", "$2\\,047$"], bonne: 0, explication: "$\\dfrac{2^{10} - 1}{2 - 1} = 1\\,023$ : il y a $10$ termes, de $2^0$ à $2^9$." },
    { question: "$\\displaystyle\\sum_{k=0}^{n} 3$ est égal à :", choix: ["$3(n + 1)$", "$3n$", "$3$", "$3^{n}$"], bonne: 0, explication: "On additionne $n + 1$ fois le nombre $3$ (pour $k = 0$, $1$, …, $n$)." },
    { question: "L'inégalité de Bernoulli affirme que, pour $a > 0$ et tout entier $n$ :", choix: ["$(1 + a)^n \\geqslant 1 + na$", "$(1 + a)^n \\leqslant 1 + na$", "$(1 + a)^n = 1 + na$", "$(1 + a)^n \\geqslant n + a$"], bonne: 0, explication: "Elle se démontre par récurrence : dans l'hérédité, on multiplie par $1 + a > 0$ et on utilise $na^2 \\geqslant 0$." },
    { question: "On sait que $1 \\leqslant u_n \\leqslant 4$. Quel encadrement a-t-on pour $-2u_n + 3$ ?", choix: ["$-5 \\leqslant -2u_n + 3 \\leqslant 1$", "$1 \\leqslant -2u_n + 3 \\leqslant -5$", "$1 \\leqslant -2u_n + 3 \\leqslant 11$", "$-5 \\leqslant -2u_n + 3 \\leqslant 11$"], bonne: 0, explication: "En multipliant par $-2 < 0$, le sens change : $-8 \\leqslant -2u_n \\leqslant -2$, puis on ajoute $3$." },
    { question: "Pour démontrer par récurrence que $0 \\leqslant u_n \\leqslant 2$ avec $u_{n+1} = f(u_n)$, quel argument sert dans l'hérédité ?", choix: ["$f$ est croissante sur $[0\\,;2]$, avec $f(0) \\geqslant 0$ et $f(2) \\leqslant 2$", "$f$ est décroissante sur $[0\\,;2]$", "$u_0$ est compris entre $0$ et $2$", "$f(2) = 4$"], bonne: 0, explication: "Une fonction croissante conserve l'ordre : $f(0) \\leqslant u_{n+1} \\leqslant f(2)$, puis on compare à $0$ et $2$." },
    { question: "La suite $u_n = n^2 - 4n$ est :", choix: ["ni croissante ni décroissante", "croissante", "décroissante", "constante"], bonne: 0, explication: "$u_0 = 0$, $u_1 = -3$, $u_2 = -4$, $u_3 = -3$ : elle descend puis remonte. En effet, $u_{n+1} - u_n = 2n - 3$ change de signe." },
    { question: "La suite $u_n = \\dfrac{n + 3}{n + 1}$ est :", choix: ["décroissante", "croissante", "constante", "ni croissante ni décroissante"], bonne: 0, explication: "$u_{n+1} - u_n = \\dfrac{-2}{(n + 1)(n + 2)} < 0$. On peut aussi écrire $u_n = 1 + \\dfrac{2}{n + 1}$." },
    { question: "Pour tout $n$, $u_n > 0$ et $\\dfrac{u_{n+1}}{u_n} = 0{,}9$. La suite est :", choix: ["décroissante", "croissante", "constante", "on ne peut pas savoir"], bonne: 0, explication: "Termes positifs et quotient inférieur à $1$ : $u_{n+1} = 0{,}9u_n < u_n$." },
    { question: "La suite définie par $u_0 = 5$ et $u_{n+1} = u_n - n^2 - 1$ est :", choix: ["décroissante", "croissante", "constante", "ni croissante ni décroissante"], bonne: 0, explication: "$u_{n+1} - u_n = -n^2 - 1 < 0$ pour tout $n$." },
    { question: "Une suite croissante est forcément :", choix: ["minorée par son premier terme", "majorée par son premier terme", "bornée", "positive"], bonne: 0, explication: "$u_0 \\leqslant u_1 \\leqslant u_2 \\leqslant \\dots$ : tous les termes sont au moins égaux à $u_0$. Elle n'est pas forcément majorée ($u_n = n$)." },
    { question: "La suite $u_n = 5 - \\dfrac{2}{n + 1}$ est :", choix: ["minorée par $3$ et majorée par $5$", "minorée par $5$", "non majorée", "majorée par $3$"], bonne: 0, explication: "$0 < \\dfrac{2}{n + 1} \\leqslant 2$, donc $3 \\leqslant u_n < 5$." },
    { question: "La suite $u_n = (-1)^n \\times n$ est :", choix: ["ni majorée ni minorée", "bornée", "majorée par $1$", "minorée par $-1$"], bonne: 0, explication: "Les termes pairs valent $n$ (aussi grands qu'on veut), les termes impairs $-n$ (aussi petits qu'on veut)." },
    { question: "Laquelle de ces phrases dit que $(u_n)$ est majorée par $7$ ?", choix: ["Pour tout entier $n$, $u_n \\leqslant 7$", "Il existe un entier $n$ tel que $u_n \\leqslant 7$", "Pour tout entier $n$, $u_n \\geqslant 7$", "$u_0 \\leqslant 7$"], bonne: 0, explication: "Un majorant doit convenir pour **tous** les termes." },
    { question: "Que fait ce programme ?\n\n```python\nu = 2\nfor i in range(5):\n    u = 3 * u\nprint(u)\n```", choix: ["Il affiche $u_5 = 486$", "Il affiche $u_4 = 162$", "Il affiche $u_6 = 1\\,458$", "Il affiche $15$"], bonne: 0, explication: "La boucle fait $5$ tours : $u$ est multiplié $5$ fois par $3$, soit $2 \\times 3^5 = 486$." },
    { question: "Que renvoie $\\texttt{range(1, 6)}$ en Python ?", choix: ["$1$, $2$, $3$, $4$, $5$", "$1$, $2$, $3$, $4$, $5$, $6$", "$0$, $1$, $2$, $3$, $4$, $5$", "$6$ nombres au hasard"], bonne: 0, explication: "La borne de gauche est incluse, celle de droite exclue." },
    { question: "Dans un programme de seuil avec $\\texttt{while u < 1000:}$, la boucle s'arrête :", choix: ["au premier terme supérieur ou égal à $1\\,000$", "au dernier terme inférieur à $1\\,000$", "quand $u$ vaut exactement $1\\,000$", "après $1\\,000$ tours"], bonne: 0, explication: "La boucle tourne tant que la condition est vraie, et s'arrête dès qu'elle devient fausse." },
    { question: "On pose $u_1 = 1$ et $u_{n+1} = u_n + 2n + 1$. Quelle formule conjecture-t-on ?", choix: ["$u_n = n^2$", "$u_n = 2n - 1$", "$u_n = n^2 + 1$", "$u_n = 2^n - 1$"], bonne: 0, explication: "$u_1 = 1$, $u_2 = 4$, $u_3 = 9$, $u_4 = 16$ : ce sont les carrés. Hérédité : $n^2 + 2n + 1 = (n + 1)^2$." },
    { question: "$(u_n)$ est géométrique de premier terme $u_0 = 5$ et de raison $2$. Que vaut $u_4$ ?", choix: ["$80$", "$40$", "$13$", "$160$"], bonne: 0, explication: "$u_4 = 5 \\times 2^4 = 80$." },
    { question: "$(u_n)$ est arithmétique avec $u_3 = 11$ et $u_8 = 26$. Sa raison est :", choix: ["$3$", "$15$", "$5$", "$\\dfrac{26}{11}$"], bonne: 0, explication: "De $u_3$ à $u_8$, on ajoute $5$ fois la raison : $5r = 15$, donc $r = 3$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Rédiger une démonstration par récurrence",
      etapes: [
        "Écrire clairement la propriété $P(n)$ à démontrer, et pour quels entiers $n$.",
        "**Initialisation** : vérifier $P(n_0)$ en calculant séparément les deux membres.",
        "**Hérédité** : « Supposons $P(n)$ vraie pour un entier $n \\geqslant n_0$ fixé ; montrons $P(n + 1)$. » Partir de l'expression au rang $n + 1$ et utiliser l'hypothèse de récurrence.",
        "**Conclusion** : « $P(n_0)$ est vraie et $P$ est héréditaire, donc $P(n)$ est vraie pour tout $n \\geqslant n_0$. »"
      ],
      exemple: "Pour $u_{n+1} = 3u_n - 4$ et $u_0 = 3$, montrer $u_n = 3^n + 2$ : $u_0 = 3 = 3^0 + 2$ ; si $u_n = 3^n + 2$, alors $u_{n+1} = 3(3^n + 2) - 4 = 3^{n+1} + 2$."
    },
    {
      titre: "Démontrer une formule de somme",
      etapes: [
        "Noter $S_n$ la somme et la propriété $P(n)$ : « $S_n = \\dots$ ».",
        "Initialisation : calculer la somme pour le premier rang (un seul terme).",
        "Hérédité : écrire $S_{n+1} = S_n + (\\text{terme suivant})$, remplacer $S_n$ par la formule.",
        "Factoriser ou réduire pour retrouver la formule au rang $n + 1$."
      ],
      exemple: "$S_{n+1} = \\dfrac{n(n + 1)}{2} + (n + 1) = (n + 1)\\left(\\dfrac{n}{2} + 1\\right) = \\dfrac{(n + 1)(n + 2)}{2}$."
    },
    {
      titre: "Encadrer une suite $u_{n+1} = f(u_n)$",
      etapes: [
        "Étudier les variations de $f$ sur l'intervalle visé : il faut qu'elle soit croissante.",
        "Initialisation : vérifier que $u_0$ est dans l'intervalle.",
        "Hérédité : appliquer $f$ à l'encadrement de $u_n$ (l'ordre est conservé car $f$ est croissante).",
        "Calculer $f$ aux bornes et comparer aux bornes voulues."
      ],
      exemple: "$f(x) = \\sqrt{x + 2}$ est croissante ; si $0 \\leqslant u_n \\leqslant 2$, alors $\\sqrt{2} \\leqslant u_{n+1} \\leqslant 2$, donc $0 \\leqslant u_{n+1} \\leqslant 2$."
    },
    {
      titre: "Étudier le sens de variation",
      etapes: [
        "Forme explicite : calculer et simplifier $u_{n+1} - u_n$, puis étudier son signe pour $n \\geqslant 0$.",
        "Termes strictement positifs (produits, puissances) : comparer $\\dfrac{u_{n+1}}{u_n}$ à $1$.",
        "Forme récurrente $u_{n+1} = f(u_n)$ avec $f$ croissante : démontrer $u_n \\leqslant u_{n+1}$ (ou $\\geqslant$) par récurrence.",
        "Vérifier sur les premiers termes que la conclusion est cohérente."
      ],
      exemple: "$u_n = \\dfrac{2n + 1}{n + 1}$ : $u_{n+1} - u_n = \\dfrac{1}{(n + 1)(n + 2)} > 0$, la suite est croissante."
    },
    {
      titre: "Programmer une recherche de seuil",
      etapes: [
        "Initialiser le rang $\\texttt{n = 0}$ et le premier terme $\\texttt{u}$.",
        "Écrire la condition de la boucle $\\texttt{while}$ : c'est le **contraire** de ce qu'on cherche.",
        "Dans la boucle, calculer le terme suivant et augmenter $\\texttt{n}$ de $1$.",
        "Après la boucle, renvoyer $\\texttt{n}$ : c'est le premier rang qui convient."
      ],
      exemple: "Premier rang où $u_n \\geqslant 500$ : on écrit $\\texttt{while u < 500:}$."
    }
  ],
  erreurs: [
    "Oublier l'initialisation : une propriété héréditaire peut être fausse pour tout $n$.",
    "Supposer dans l'hérédité que $P(n)$ est vraie **pour tout** $n$ : c'est supposer ce qu'on veut démontrer.",
    "Ne pas utiliser l'hypothèse de récurrence dans l'hérédité.",
    "Croire qu'une formule vérifiée sur quelques termes est démontrée.",
    "Confondre $u_{n+1}$ (terme suivant) et $u_n + 1$.",
    "Multiplier une inégalité par un nombre négatif sans changer son sens.",
    "Confondre $\\displaystyle\\sum_{k=1}^{n} k^2$ et $\\left(\\displaystyle\\sum_{k=1}^{n} k\\right)^2$.",
    "Oublier que $\\texttt{range(a, b)}$ s'arrête à $b - 1$.",
    "Donner un majorant qui dépend de $n$ : un majorant est un nombre fixe."
  ]
};
