/*
  CHAPITRE : Terminale spécialité — Fonction logarithme népérien
  ---------------------------------------------------------------
  Chapitre 9 de la progression de Terminale spécialité (V26, période 3, 2 semaines) :
  fonction logarithme népérien, propriétés algébriques, équations et inéquations, variations et limites,
  croissances comparées, dérivée de ln(u), seuils.
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Pas de vidéo de la chaîne sur ce thème : vidéos d'Yvan Monka (cours 20LogT1 et 20LogT2).
  Figure : "lnx-courbes". Générateurs : lnx- (et tln-proprietes).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-spe-logarithme"] = {
  niveau: "Terminale spécialité",
  numero: 9,
  titre: "Fonction logarithme népérien",
  accroche: "La fonction qui « défait » l'exponentielle : transformer les produits en sommes, résoudre $e^x = 5$ ou $0{,}9^n < 0{,}01$, et étudier une croissance très lente.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours complet sur le logarithme népérien en vidéo (Yvan Monka)", url: "https://youtu.be/VJns0RfVWGg", type: "video" },
    { titre: "Démonstration : la dérivée de ln (Yvan Monka)", url: "https://youtu.be/wmysrEq4XIg", type: "video" },
    { titre: "Démonstration : limite en 0 de x ln x (Yvan Monka)", url: "https://youtu.be/LxgQBYTaRaw", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Définition",
      figure: "lnx-courbes",
      video: { titre: "Vidéo d'Yvan Monka : étudier la fonction logarithme népérien", youtube: "https://youtu.be/3KLX-ScJmcI" },
      texte:
        "La fonction exponentielle est continue, strictement croissante sur $\\mathbb{R}$, à valeurs dans $]0\\,;+\\infty[$. Pour tout réel $a > 0$, l'équation $e^x = a$ a donc une **unique** solution, notée $\\ln a$ (logarithme népérien de $a$).\n\n" +
        "- La fonction $\\ln$ est définie sur $]0\\,;+\\infty[$.\n" +
        "- Pour $a > 0$ et $x$ réel : $e^x = a \\iff x = \\ln a$.\n" +
        "- $e^{\\ln a} = a$ pour $a > 0$, et $\\ln(e^x) = x$ pour tout réel $x$ : $\\ln$ et $\\exp$ sont **réciproques**.\n" +
        "- $\\ln 1 = 0$ et $\\ln e = 1$.\n\n" +
        "Les deux courbes sont symétriques par rapport à la droite $y = x$.",
      exemple: {
        enonce: "Résous $e^x = 7$, puis calcule $\\ln(e^{-3})$ et $e^{\\ln 4}$.",
        solution: "$e^x = 7 \\iff x = \\ln 7 \\approx 1{,}95$.\n\n$\\ln(e^{-3}) = -3$ et $e^{\\ln 4} = 4$."
      }
    },
    {
      titre: "Propriétés algébriques",
      video: { titre: "Vidéo d'Yvan Monka : appliquer les formules sur les logarithmes", youtube: "https://youtu.be/HGrK77-SCl4" },
      texte:
        "Pour tous réels $a > 0$ et $b > 0$ et tout entier $n$ :\n\n" +
        "- $\\ln(ab) = \\ln a + \\ln b$ (**relation fonctionnelle** : le logarithme transforme les produits en sommes) ;\n" +
        "- $\\ln\\left(\\dfrac{1}{a}\\right) = -\\ln a$ et $\\ln\\left(\\dfrac{a}{b}\\right) = \\ln a - \\ln b$ ;\n" +
        "- $\\ln(a^n) = n\\ln a$ ;\n" +
        "- $\\ln\\sqrt{a} = \\dfrac{1}{2}\\ln a$.\n\n" +
        "Ces formules découlent de $e^{x + y} = e^x \\times e^y$. Attention : $\\ln(a + b)$ ne se simplifie pas.",
      exemple: {
        enonce: "Exprime $\\ln 72$ et $\\ln\\left(\\dfrac{8}{9}\\right)$ en fonction de $\\ln 2$ et $\\ln 3$.",
        solution: "$72 = 2^3 \\times 3^2$, donc $\\ln 72 = 3\\ln 2 + 2\\ln 3$.\n\n$\\ln\\left(\\dfrac{8}{9}\\right) = \\ln(2^3) - \\ln(3^2) = 3\\ln 2 - 2\\ln 3$."
      }
    },
    {
      titre: "Équations et inéquations",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation contenant des logarithmes", youtube: "https://youtu.be/lCT-8ijhZiE" },
      texte:
        "La fonction $\\ln$ est strictement croissante sur $]0\\,;+\\infty[$. Pour $a > 0$ et $b > 0$ :\n\n" +
        "- $\\ln a = \\ln b \\iff a = b$ ;\n" +
        "- $\\ln a < \\ln b \\iff a < b$.\n\n" +
        "En particulier : $\\ln x > 0 \\iff x > 1$, et $\\ln x < 0 \\iff 0 < x < 1$.\n\n" +
        "**Méthode** : on cherche d'abord l'ensemble où les logarithmes existent (expressions **strictement positives**), on résout, puis on garde les solutions de cet ensemble.\n\n" +
        "Pour une équation avec exponentielle, on « prend le logarithme » : $e^{2x - 1} = 5 \\iff 2x - 1 = \\ln 5$.",
      exemple: {
        enonce: "Résous $\\ln(2x - 1) = \\ln(x + 3)$ puis $\\ln x \\leqslant 2$.",
        solution: "Il faut $x > \\dfrac{1}{2}$ et $x > -3$, donc $x > \\dfrac{1}{2}$. Alors $2x - 1 = x + 3 \\iff x = 4$, qui convient.\n\n$\\ln x \\leqslant 2 \\iff 0 < x \\leqslant e^2$ : l'ensemble des solutions est $]0\\,;e^2]$."
      }
    },
    {
      titre: "Seuils et suites géométriques",
      video: { titre: "Vidéo d'Yvan Monka : déterminer par le calcul un seuil pour une suite géométrique", youtube: "https://youtu.be/fm1YBGcix0E" },
      texte:
        "Le logarithme permet de résoudre des inéquations du type $q^n > A$ ou $q^n < A$, où l'inconnue est un **exposant** :\n\n" +
        "$q^n < A \\iff \\ln(q^n) < \\ln A \\iff n\\ln q < \\ln A$.\n\n" +
        "- Si $q > 1$, $\\ln q > 0$ : $n < \\dfrac{\\ln A}{\\ln q}$.\n" +
        "- Si $0 < q < 1$, $\\ln q < 0$ : en divisant, **le sens change**, $n > \\dfrac{\\ln A}{\\ln q}$.\n\n" +
        "On remplace ainsi la recherche de seuil par boucle (chapitres 1 et 4) par un calcul direct.",
      exemple: {
        enonce: "Un médicament est éliminé à $20\\,\\%$ par heure. À partir de combien d'heures en reste-t-il moins de $5\\,\\%$ ?",
        solution: "Il reste $0{,}8^n$ de la dose au bout de $n$ heures. $0{,}8^n < 0{,}05 \\iff n\\ln 0{,}8 < \\ln 0{,}05 \\iff n > \\dfrac{\\ln 0{,}05}{\\ln 0{,}8} \\approx 13{,}4$ (le sens change car $\\ln 0{,}8 < 0$).\n\nIl faut $14$ heures."
      }
    },
    {
      titre: "Dérivée et variations",
      video: { titre: "Vidéo d'Yvan Monka : dériver une fonction contenant des logarithmes", youtube: "https://youtu.be/yiQ4Z5FdFQ8" },
      texte:
        "- La fonction $\\ln$ est dérivable sur $]0\\,;+\\infty[$ et $(\\ln x)' = \\dfrac{1}{x}$ (démonstration au programme).\n" +
        "- Comme $\\dfrac{1}{x} > 0$, $\\ln$ est **strictement croissante** sur $]0\\,;+\\infty[$. Elle est **concave** : $(\\ln x)'' = -\\dfrac{1}{x^2} < 0$.\n" +
        "- Si $u$ est dérivable et **strictement positive** sur $I$, alors $\\ln(u)$ est dérivable sur $I$ et $(\\ln u)' = \\dfrac{u'}{u}$.\n\n" +
        "La tangente en $1$ a pour équation $y = x - 1$ ; comme $\\ln$ est concave, $\\ln x \\leqslant x - 1$ pour tout $x > 0$.",
      exemple: {
        enonce: "Étudie les variations de $f(x) = x - \\ln x$ sur $]0\\,;+\\infty[$.",
        solution: "$f'(x) = 1 - \\dfrac{1}{x} = \\dfrac{x - 1}{x}$. Sur $]0\\,;+\\infty[$, $f'$ a le signe de $x - 1$ : négative sur $]0\\,;1]$, positive sur $[1\\,;+\\infty[$.\n\n$f$ est décroissante puis croissante, avec un minimum $f(1) = 1$. Donc $x - \\ln x \\geqslant 1 > 0$ : $\\ln x < x$ pour tout $x > 0$."
      }
    },
    {
      titre: "Limites et croissances comparées",
      video: { titre: "Vidéo d'Yvan Monka : calculer une limite par croissance comparée", youtube: "https://youtu.be/lA3W_j4p-c8" },
      texte:
        "- $\\lim\\limits_{x \\to +\\infty} \\ln x = +\\infty$ et $\\lim\\limits_{x \\to 0^+} \\ln x = -\\infty$ : la droite $x = 0$ est asymptote verticale.\n" +
        "- **Croissances comparées** : $\\lim\\limits_{x \\to +\\infty} \\dfrac{\\ln x}{x} = 0$ et $\\lim\\limits_{x \\to 0^+} x\\ln x = 0$ (démonstration au programme). Plus généralement, $\\dfrac{\\ln x}{x^n} \\to 0$ en $+\\infty$ et $x^n\\ln x \\to 0$ en $0^+$.\n" +
        "- $\\lim\\limits_{x \\to 0} \\dfrac{\\ln(1 + x)}{x} = 1$ (c'est le nombre dérivé de $\\ln$ en $1$).\n\n" +
        "On retient : **en $+\\infty$, les puissances de $x$ l'emportent sur le logarithme**, qui croît très lentement ($\\ln(10^6) \\approx 13{,}8$).",
      exemple: {
        enonce: "Détermine $\\lim\\limits_{x \\to +\\infty} (x - 3\\ln x)$ et $\\lim\\limits_{x \\to 0^+} (x^2\\ln x + 1)$.",
        solution: "$x - 3\\ln x = x\\left(1 - 3\\dfrac{\\ln x}{x}\\right)$ et $\\dfrac{\\ln x}{x} \\to 0$ : la parenthèse tend vers $1$, la limite vaut $+\\infty$.\n\n$x^2\\ln x \\to 0$ en $0^+$, donc la seconde limite vaut $1$."
      }
    },
    {
      titre: "Algorithmique : logarithmes en Python",
      texte:
        "En Python, le module $\\texttt{math}$ fournit $\\texttt{log}$ (logarithme népérien $\\ln$) et $\\texttt{exp}$.\n\n" +
        "```python\nfrom math import log, floor\n\ndef seuil(q, e):\n    # plus petit entier n tel que q**n < e, pour 0 < q < 1\n    return floor(log(e) / log(q)) + 1\n\nprint(seuil(0.8, 0.05))\n```\n\n" +
        "- $\\texttt{floor}$ donne la partie entière : le programme calcule le premier entier strictement supérieur à $\\dfrac{\\ln e}{\\ln q}$.\n" +
        "- On peut vérifier le résultat avec une boucle $\\texttt{while}$, comme aux chapitres 1 et 4.\n" +
        "- Attention : $\\texttt{log(0)}$ ou $\\texttt{log(-1)}$ provoquent une erreur, comme $\\ln$ qui n'est définie que sur $]0\\,;+\\infty[$.",
      exemple: {
        enonce: "Que renvoie $\\texttt{seuil(0.5, 0.01)}$ ?",
        solution: "$\\dfrac{\\ln 0{,}01}{\\ln 0{,}5} \\approx 6{,}64$ : la fonction renvoie $7$.\n\nVérification : $0{,}5^6 \\approx 0{,}0156$ et $0{,}5^7 \\approx 0{,}0078 < 0{,}01$."
      }
    }
  ],

  videos: [
    { titre: "Résoudre une équation à l'aide des logarithmes", type: "Équation", youtube: "https://youtu.be/RzX506TFBIA" },
    { titre: "Résoudre une inéquation contenant des logarithmes", type: "Inéquation", youtube: "https://youtu.be/_fpPphstjYw" },
    { titre: "Dériver une fonction du type ln(u)", type: "Dérivée", youtube: "https://youtu.be/-zrhBc9xdRs" },
    { titre: "Étudier une fonction contenant des logarithmes", type: "Étude", youtube: "https://youtu.be/iT9C0BiOK4Y" },
    { titre: "Position relative du logarithme et de la droite y = x", type: "Étude", youtube: "https://youtu.be/0hQnOs_hcss" },
    { titre: "Prépare ton bac : logarithme, dérivation, variations", type: "Bac", youtube: "https://youtu.be/GmIueQ7MehA" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "lnx-ecrire", titre: "Calculer avec ln et exp", etape: "Calculer", nb: 5 },
    { type: "tln-proprietes", titre: "Propriétés algébriques", etape: "Calculer", nb: 5 },
    { type: "lnx-equation", titre: "Équations", etape: "Résoudre", nb: 5 },
    { type: "lnx-inequation", titre: "Inéquations", etape: "Résoudre", nb: 4 },
    { type: "lnx-seuil", titre: "Seuils et pourcentages", etape: "Résoudre", nb: 4 },
    { type: "lnx-derivee", titre: "Dériver avec ln", etape: "Étudier", nb: 5 },
    { type: "lnx-variations", titre: "Variations et extremums", etape: "Étudier", nb: 4 },
    { type: "lnx-limites", titre: "Limites et croissances comparées", etape: "Étudier", nb: 5 },
    { type: "lnx-python", titre: "Logarithmes en Python", etape: "Algorithmique", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "La fonction $\\ln$ est définie sur :", choix: ["$]0\\,;+\\infty[$", "$\\mathbb{R}$", "$[0\\,;+\\infty[$", "$]1\\,;+\\infty[$"], bonne: 0, explication: "$\\ln a$ est la solution de $e^x = a$, qui n'existe que pour $a > 0$." },
    { question: "$\\ln 1$ vaut :", choix: ["$0$", "$1$", "$e$", "il n'existe pas"], bonne: 0, explication: "$e^0 = 1$, donc $\\ln 1 = 0$." },
    { question: "$\\ln(e^5)$ vaut :", choix: ["$5$", "$e^5$", "$5e$", "$\\ln 5$"], bonne: 0, explication: "$\\ln(e^x) = x$." },
    { question: "La solution de $e^x = 3$ est :", choix: ["$x = \\ln 3$", "$x = e^3$", "$x = \\dfrac{3}{e}$", "$x = \\sqrt{3}$"], bonne: 0, explication: "Par définition du logarithme." },
    { question: "$\\ln 6 + \\ln 5$ est égal à :", choix: ["$\\ln 30$", "$\\ln 11$", "$\\ln 6 \\times \\ln 5$", "$11$"], bonne: 0, explication: "$\\ln a + \\ln b = \\ln(ab)$." },
    { question: "$\\ln 50 - \\ln 2$ est égal à :", choix: ["$\\ln 25$", "$\\ln 48$", "$\\dfrac{\\ln 50}{\\ln 2}$", "$25$"], bonne: 0, explication: "$\\ln a - \\ln b = \\ln\\left(\\dfrac{a}{b}\\right)$." },
    { question: "$\\ln(2^{10})$ est égal à :", choix: ["$10\\ln 2$", "$(\\ln 2)^{10}$", "$\\ln 20$", "$2\\ln 10$"], bonne: 0, explication: "$\\ln(a^n) = n\\ln a$." },
    { question: "$\\ln\\sqrt{e}$ vaut :", choix: ["$\\dfrac{1}{2}$", "$\\sqrt{e}$", "$2$", "$e^2$"], bonne: 0, explication: "$\\ln\\sqrt{a} = \\dfrac{1}{2}\\ln a$ et $\\ln e = 1$." },
    { question: "$\\ln(a + b)$ est égal à :", choix: ["aucune formule ne le simplifie", "$\\ln a + \\ln b$", "$\\ln a \\times \\ln b$", "$\\ln(ab)$"], bonne: 0, explication: "Le logarithme transforme les produits en sommes, pas les sommes." },
    { question: "L'ensemble des solutions de $\\ln x < 0$ est :", choix: ["$]0\\,;1[$", "$]-\\infty\\,;0[$", "$]-\\infty\\,;1[$", "$]1\\,;+\\infty[$"], bonne: 0, explication: "$\\ln x < \\ln 1 \\iff x < 1$, avec $x > 0$." },
    { question: "La solution de $e^{2x} = 9$ est :", choix: ["$x = \\ln 3$", "$x = \\dfrac{9}{2}$", "$x = 2\\ln 9$", "$x = \\ln 4{,}5$"], bonne: 0, explication: "$2x = \\ln 9 = 2\\ln 3$, donc $x = \\ln 3$." },
    { question: "L'équation $\\ln(x - 1) + \\ln(x + 1) = \\ln 8$ a pour solution :", choix: ["$x = 3$", "$x = -3$ et $x = 3$", "$x = 4$", "$x = 2\\sqrt{2}$"], bonne: 0, explication: "Il faut $x > 1$. $(x - 1)(x + 1) = 8 \\iff x^2 = 9$, et seule $x = 3$ convient." },
    { question: "$0{,}9^n < 0{,}1$ équivaut à :", choix: ["$n > \\dfrac{\\ln 0{,}1}{\\ln 0{,}9}$", "$n < \\dfrac{\\ln 0{,}1}{\\ln 0{,}9}$", "$n > \\ln 0{,}1 - \\ln 0{,}9$", "$n < 0{,}1 \\times 0{,}9$"], bonne: 0, explication: "$n\\ln 0{,}9 < \\ln 0{,}1$, et on divise par $\\ln 0{,}9 < 0$ : le sens change." },
    { question: "La dérivée de $\\ln x$ est :", choix: ["$\\dfrac{1}{x}$", "$\\ln x$", "$e^x$", "$-\\dfrac{1}{x^2}$"], bonne: 0, explication: "Démonstration au programme, en dérivant $e^{\\ln x} = x$." },
    { question: "La dérivée de $\\ln(x^2 + 4)$ est :", choix: ["$\\dfrac{2x}{x^2 + 4}$", "$\\dfrac{1}{x^2 + 4}$", "$\\dfrac{1}{2x}$", "$2x\\ln(x^2 + 4)$"], bonne: 0, explication: "$(\\ln u)' = \\dfrac{u'}{u}$ avec $u' = 2x$." },
    { question: "La fonction $\\ln$ est :", choix: ["croissante et concave", "croissante et convexe", "décroissante et concave", "décroissante et convexe"], bonne: 0, explication: "$(\\ln x)' = \\dfrac{1}{x} > 0$ et $(\\ln x)'' = -\\dfrac{1}{x^2} < 0$." },
    { question: "$\\lim\\limits_{x \\to 0^+} \\ln x$ vaut :", choix: ["$-\\infty$", "$0$", "$+\\infty$", "$1$"], bonne: 0, explication: "La droite $x = 0$ est asymptote verticale." },
    { question: "$\\lim\\limits_{x \\to +\\infty} \\dfrac{\\ln x}{x}$ vaut :", choix: ["$0$", "$1$", "$+\\infty$", "on ne peut pas conclure"], bonne: 0, explication: "Croissance comparée : $x$ l'emporte sur $\\ln x$." },
    { question: "$\\lim\\limits_{x \\to 0^+} x\\ln x$ vaut :", choix: ["$0$", "$-\\infty$", "$1$", "$+\\infty$"], bonne: 0, explication: "Croissance comparée en $0$ (démonstration au programme)." },
    { question: "La fonction $f(x) = x\\ln x$ atteint son minimum en :", choix: ["$x = \\dfrac{1}{e}$", "$x = 1$", "$x = e$", "$x = 0$"], bonne: 0, explication: "$f'(x) = \\ln x + 1 = 0 \\iff x = e^{-1}$." },
    { question: "Comme $\\ln$ est concave, pour tout $x > 0$ :", choix: ["$\\ln x \\leqslant x - 1$", "$\\ln x \\geqslant x - 1$", "$\\ln x = x - 1$", "$\\ln x \\geqslant x$"], bonne: 0, explication: "La courbe est sous sa tangente en $1$, d'équation $y = x - 1$." },
    { question: "Un capital augmente de $3\\,\\%$ par an. Il double au bout de $n$ années, avec $n$ le plus petit entier tel que :", choix: ["$n \\geqslant \\dfrac{\\ln 2}{\\ln 1{,}03}$", "$n \\geqslant \\dfrac{2}{1{,}03}$", "$n \\geqslant \\ln 2 - \\ln 1{,}03$", "$n \\geqslant \\dfrac{\\ln 1{,}03}{\\ln 2}$"], bonne: 0, explication: "$1{,}03^n \\geqslant 2 \\iff n\\ln 1{,}03 \\geqslant \\ln 2$ ; ici $\\ln 1{,}03 > 0$ : $n \\geqslant 23{,}4$, soit $24$ ans." },
    { question: "En Python, $\\texttt{log(x)}$ du module $\\texttt{math}$ calcule :", choix: ["$\\ln x$", "le logarithme décimal de $x$", "$e^x$", "$\\dfrac{1}{x}$"], bonne: 0, explication: "Sans second argument, $\\texttt{log}$ est le logarithme népérien." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Résoudre une équation ou inéquation avec ln",
      etapes: [
        "Déterminer l'ensemble où toutes les expressions dans les $\\ln$ sont **strictement positives**.",
        "Regrouper avec les propriétés ($\\ln a + \\ln b = \\ln(ab)$…) pour obtenir $\\ln A = \\ln B$ ou $\\ln A < \\ln B$.",
        "Supprimer les $\\ln$ ($\\ln$ est strictement croissante) : $A = B$ ou $A < B$.",
        "Résoudre, puis ne garder que les solutions de l'ensemble de départ."
      ],
      exemple: "$\\ln(x + 2) \\geqslant \\ln(3x)$ : il faut $x > 0$ ; $x + 2 \\geqslant 3x \\iff x \\leqslant 1$ ; solutions : $]0\\,;1]$."
    },
    {
      titre: "Résoudre une équation ou inéquation avec exp",
      etapes: [
        "Isoler l'exponentielle : $e^{u(x)} = k$ (avec $k > 0$, sinon pas de solution).",
        "Prendre le logarithme : $u(x) = \\ln k$.",
        "Résoudre l'équation obtenue.",
        "Pour une inéquation, le sens se conserve (fonctions croissantes)."
      ],
      exemple: "$3e^{x} - 6 = 0 \\iff e^x = 2 \\iff x = \\ln 2$."
    },
    {
      titre: "Trouver un seuil avec ln",
      etapes: [
        "Écrire l'inéquation sous la forme $q^n < A$ (ou $>$).",
        "Prendre le logarithme : $n\\ln q < \\ln A$.",
        "Diviser par $\\ln q$, en **changeant le sens** si $0 < q < 1$.",
        "Calculer la valeur, et prendre le premier entier qui convient."
      ],
      exemple: "$500 \\times 1{,}1^n > 2\\,000 \\iff 1{,}1^n > 4 \\iff n > \\dfrac{\\ln 4}{\\ln 1{,}1} \\approx 14{,}5$ : $n = 15$."
    },
    {
      titre: "Étudier une fonction avec ln",
      etapes: [
        "Donner l'ensemble de définition (ce qui est dans le $\\ln$ doit être $> 0$).",
        "Dériver avec $(\\ln u)' = \\dfrac{u'}{u}$ et les formules usuelles ; réduire au même dénominateur.",
        "Étudier le signe de $f'$ ($x > 0$ simplifie souvent le dénominateur).",
        "Limites aux bornes : factoriser par le terme qui l'emporte (croissances comparées)."
      ],
      exemple: "$f(x) = \\dfrac{\\ln x}{x}$ : $f'(x) = \\dfrac{1 - \\ln x}{x^2}$, maximum en $x = e$ ; $f \\to -\\infty$ en $0^+$ et $f \\to 0$ en $+\\infty$."
    }
  ],
  erreurs: [
    "Oublier l'ensemble de définition : $\\ln$ n'existe que pour des nombres strictement positifs.",
    "Écrire $\\ln(a + b) = \\ln a + \\ln b$.",
    "Écrire $\\ln(a^n) = (\\ln a)^n$ au lieu de $n\\ln a$.",
    "Oublier de changer le sens d'une inégalité en divisant par $\\ln q < 0$ (quand $0 < q < 1$).",
    "Garder une solution qui n'est pas dans l'ensemble de définition.",
    "Confondre $\\ln(e^x) = x$ et $e^{\\ln x} = x$ (ce dernier seulement pour $x > 0$).",
    "Oublier le $u'$ dans $(\\ln u)' = \\dfrac{u'}{u}$."
  ]
};
