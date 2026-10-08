/*
  CHAPITRE : Terminale maths complémentaires — Fonctions convexes
  ----------------------------------------------------------------
  Chapitre 9 de la progression spiralée 2026-2027 (programme de maths complémentaires de 2019).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Vidéos d'Yvan Monka (cours 20ConvexiteTC).
  Figures : "tcv-convexe", "tcv-inflexion", "tcv-epidemie". Générateurs : tcv-.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-convexite"] = {
  niveau: "Terminale maths complémentaires",
  numero: 9,
  titre: "Fonctions convexes",
  accroche: "Une courbe en « U » ou en « ∩ » : dérivée seconde, position par rapport aux sécantes et aux tangentes, point d'inflexion et ralentissement d'une épidémie.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur la convexité en vidéo (Yvan Monka)", url: "https://youtu.be/gge4xdn6cFA", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "La dérivée seconde",
      video: { titre: "Vidéo d'Yvan Monka : déterminer la dérivée seconde d'une fonction", youtube: "https://youtu.be/W6rypabq8uA" },
      texte:
        "Si $f'$ est elle-même dérivable, sa dérivée est la **dérivée seconde** de $f$, notée $f''$.\n\n" +
        "- $f(x) = x^3 - 3x^2 + 5$ : $f'(x) = 3x^2 - 6x$, puis $f''(x) = 6x - 6$.\n" +
        "- $f(x) = e^{2x}$ : $f'(x) = 2e^{2x}$, puis $f''(x) = 4e^{2x}$.\n" +
        "- $f(x) = \\ln x$ : $f'(x) = \\dfrac{1}{x}$, puis $f''(x) = -\\dfrac{1}{x^2}$.\n\n" +
        "En physique, si $f(t)$ est une position, $f'(t)$ est la vitesse et $f''(t)$ l'accélération.",
      exemple: {
        enonce: "Calcule $f''(2)$ pour $f(x) = 2x^3 - x^2 + 4x$.",
        solution: "$f'(x) = 6x^2 - 2x + 4$ et $f''(x) = 12x - 2$, donc $f''(2) = 22$."
      }
    },
    {
      titre: "Fonction convexe, fonction concave",
      figure: "tcv-convexe",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître graphiquement la convexité", youtube: "https://youtu.be/ERML85y_s6E" },
      texte:
        "Une fonction $f$ est **convexe** sur un intervalle $I$ si, entre deux points quelconques, sa courbe est **sous la sécante** (courbe « en U »). Elle est **concave** si sa courbe est au-dessus de ses sécantes (« en ∩ »).\n\n" +
        "Propriété admise : $f$ est convexe sur $I$ si et seulement si sa courbe est **au-dessus de toutes ses tangentes**.\n\n" +
        "Exemples : $x^2$ et $e^x$ sont convexes ; $\\sqrt{x}$ et $\\ln x$ sont concaves ; une fonction affine est les deux à la fois.",
      exemple: {
        enonce: "Vérifie sur un exemple que $x^2$ est sous sa sécante entre $0$ et $2$.",
        solution: "La sécante passe par $(0\\,;0)$ et $(2\\,;4)$ : $y = 2x$. En $x = 1$ : $1^2 = 1 < 2$. La courbe est bien sous la sécante."
      }
    },
    {
      titre: "Caractérisation par $f'$ et $f''$",
      video: { titre: "Vidéo d'Yvan Monka : étudier la convexité", youtube: "https://youtu.be/8H2aYKN8NGE" },
      texte:
        "Pour $f$ dérivable sur $I$ (propriétés admises) :\n\n" +
        "- $f$ est convexe sur $I$ $\\iff$ $f'$ est croissante sur $I$ ;\n" +
        "- si $f$ est deux fois dérivable : $f$ convexe sur $I$ $\\iff$ $f''(x) \\geqslant 0$ sur $I$ ; concave $\\iff$ $f''(x) \\leqslant 0$.\n\n" +
        "Méthode : on calcule $f''$, on étudie son signe, on conclut intervalle par intervalle.",
      exemple: {
        enonce: "Étudie la convexité de $f(x) = x^3 - 3x^2 + 5$.",
        solution: "$f''(x) = 6x - 6 = 6(x - 1)$ : négative pour $x < 1$, positive pour $x > 1$.\n\n$f$ est concave sur $]-\\infty\\,;1]$ et convexe sur $[1\\,;+\\infty[$."
      }
    },
    {
      titre: "Point d'inflexion",
      figure: "tcv-inflexion",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître graphiquement un point d'inflexion", youtube: "https://youtu.be/r8sYr6ToeLo" },
      texte:
        "Un **point d'inflexion** est un point où la courbe change de convexité. En ce point, **la tangente traverse la courbe**.\n\n" +
        "Si $f$ est deux fois dérivable, la courbe a un point d'inflexion en $a$ lorsque $f''$ **s'annule en changeant de signe** en $a$.\n\n" +
        "Attention : $f''(a) = 0$ ne suffit pas. Pour $f(x) = x^4$, $f''(0) = 0$ mais $f''(x) = 12x^2 \\geqslant 0$ ne change pas de signe : pas d'inflexion.",
      exemple: {
        enonce: "La courbe de $f(x) = x^3 - 3x^2 + 5$ a-t-elle un point d'inflexion ?",
        solution: "$f''(x) = 6(x - 1)$ s'annule en changeant de signe en $1$ : point d'inflexion $I(1\\,;f(1)) = (1\\,;3)$."
      }
    },
    {
      titre: "Convexité et inégalités",
      texte:
        "Une fonction convexe est au-dessus de ses tangentes : cela donne des inégalités utiles.\n\n" +
        "- $e^x$ est convexe, sa tangente en $0$ est $y = x + 1$ : pour tout réel $x$, $e^x \\geqslant x + 1$.\n" +
        "- $\\ln$ est concave, sa tangente en $1$ est $y = x - 1$ : pour tout $x > 0$, $\\ln x \\leqslant x - 1$.\n\n" +
        "On les retrouve souvent dans les sujets : « montrer que pour tout $x$, … ».",
      exemple: {
        enonce: "Déduis de $e^x \\geqslant x + 1$ une minoration de $e^{-0{,}5}$.",
        solution: "Avec $x = -0{,}5$ : $e^{-0{,}5} \\geqslant 0{,}5$ (en fait $e^{-0{,}5} \\approx 0{,}607$)."
      }
    },
    {
      titre: "Le ralentissement d'une épidémie",
      figure: "tcv-epidemie",
      video: { titre: "Vidéo d'Yvan Monka : étudier la convexité pour résoudre un problème", youtube: "https://youtu.be/_XlgCeLcN1k" },
      texte:
        "La figure donne le nombre **cumulé** de cas $N(t)$ d'une épidémie (par exemple de dengue). Sa dérivée $N'(t)$ est le nombre de **nouveaux cas** par jour.\n\n" +
        "- Au début, $N$ est convexe : $N'$ croît, l'épidémie s'accélère.\n" +
        "- Au point d'inflexion (jour $10$ ici), $N'$ est **maximale** : c'est le pic des nouveaux cas.\n" +
        "- Ensuite $N$ est concave : $N'$ décroît, l'épidémie ralentit, même si le nombre total continue d'augmenter.",
      exemple: {
        enonce: "Le nombre cumulé de cas augmente encore après le jour $10$. L'épidémie s'aggrave-t-elle ?",
        solution: "Non : après le point d'inflexion, les nouveaux cas quotidiens diminuent. Le total augmente de moins en moins vite : l'épidémie ralentit."
      }
    },
    {
      titre: "Python : tester la position d'une courbe et d'une sécante",
      texte:
        "On calcule la courbe et la sécante en $99$ points entre $a$ et $b$ :\n\n" +
        "```python\ndef f(x):\n    return x**2\n\ndef sous_secante(a, b):\n    for k in range(1, 100):\n        x = a + (b - a) * k / 100\n        s = f(a) + (f(b) - f(a)) * (x - a) / (b - a)\n        if f(x) > s:\n            return False\n    return True\n```\n\n" +
        "Pour $x^2$, la fonction renvoie True quels que soient $a$ et $b$ : c'est un indice (pas une preuve) de convexité. Pour $x^3$ entre $-2$ et $1$, elle renvoie False.",
      exemple: {
        enonce: "Pourquoi un test numérique ne démontre-t-il pas la convexité ?",
        solution: "Il ne teste que $99$ points et quelques intervalles : pour démontrer, il faut un argument valable pour tous les points, par exemple le signe de $f''$."
      }
    }
  ],

  videos: [
    { titre: "Étudier une fonction exponentielle exp(u)", type: "Étude", youtube: "https://youtu.be/Q4cqUJrTPZo" },
    { titre: "Reconnaître graphiquement un point d'inflexion", type: "Inflexion", youtube: "https://youtu.be/r8sYr6ToeLo" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "tcv-seconde", titre: "Calculer une dérivée seconde", etape: "Dérivée seconde", nb: 4 },
    { type: "tcv-graphique", titre: "Lire la convexité sur une courbe", etape: "Convexité", nb: 4 },
    { type: "tcv-etude", titre: "Étudier la convexité", etape: "Convexité", nb: 5 },
    { type: "tcv-inegalite", titre: "Sécantes, tangentes, inégalités", etape: "Convexité", nb: 4 },
    { type: "tcv-epidemie", titre: "Point d'inflexion d'une épidémie", etape: "Modéliser", nb: 3 },
    { type: "tcv-logique", titre: "Vrai ou faux sur la convexité", etape: "Raisonner", nb: 5 },
    { type: "tcv-python", titre: "Python : sous la sécante ?", etape: "Raisonner", nb: 3 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$f(x) = x^3$. Alors $f''(x) =$", choix: ["$6x$", "$3x^2$", "$6$", "$x^3$"], bonne: 0, explication: "$f' = 3x^2$, $f'' = 6x$." },
    { question: "$f(x) = e^{3x}$. Alors $f''(x) =$", choix: ["$9e^{3x}$", "$3e^{3x}$", "$e^{3x}$", "$6e^{3x}$"], bonne: 0, explication: "On multiplie deux fois par $3$." },
    { question: "Une fonction convexe a une courbe :", choix: ["sous ses sécantes et au-dessus de ses tangentes", "au-dessus de ses sécantes", "sous ses tangentes", "toujours croissante"], bonne: 0, explication: "Courbe « en U »." },
    { question: "$f$ est convexe sur $I$ si et seulement si :", choix: ["$f'$ est croissante sur $I$", "$f$ est croissante sur $I$", "$f' \\geqslant 0$ sur $I$", "$f$ est positive sur $I$"], bonne: 0, explication: "Caractérisation par la dérivée." },
    { question: "Si $f''(x) < 0$ sur $I$, alors $f$ est :", choix: ["concave sur $I$", "convexe sur $I$", "décroissante sur $I$", "négative sur $I$"], bonne: 0, explication: "Signe de la dérivée seconde." },
    { question: "La fonction $\\ln$ est :", choix: ["concave", "convexe", "ni l'un ni l'autre", "affine"], bonne: 0, explication: "$(\\ln)'' = -\\dfrac{1}{x^2} < 0$." },
    { question: "La fonction exponentielle est :", choix: ["convexe", "concave", "affine", "ni l'un ni l'autre"], bonne: 0, explication: "$(e^x)'' = e^x > 0$." },
    { question: "$x \\mapsto x^3$ a un point d'inflexion en :", choix: ["$0$", "$1$", "$-1$", "aucun point"], bonne: 0, explication: "$f''(x) = 6x$ change de signe en $0$." },
    { question: "En un point d'inflexion, la tangente :", choix: ["traverse la courbe", "est horizontale", "n'existe pas", "est verticale"], bonne: 0, explication: "La courbe change de côté." },
    { question: "$f''(a) = 0$ suffit-il pour un point d'inflexion ?", choix: ["Non, il faut que $f''$ change de signe", "Oui, toujours", "Oui, si $f$ est convexe", "Non, il faut $f'(a) = 0$"], bonne: 0, explication: "Contre-exemple : $x^4$ en $0$." },
    { question: "Pour tout réel $x$ :", choix: ["$e^x \\geqslant x + 1$", "$e^x \\leqslant x + 1$", "$e^x \\geqslant x + 2$", "$e^x = x + 1$"], bonne: 0, explication: "Convexité de l'exponentielle et tangente en $0$." },
    { question: "Pour tout $x > 0$ :", choix: ["$\\ln x \\leqslant x - 1$", "$\\ln x \\geqslant x - 1$", "$\\ln x \\geqslant x$", "$\\ln x = x - 1$"], bonne: 0, explication: "Concavité de $\\ln$ et tangente en $1$." },
    { question: "$f(x) = x^3 - 6x^2$. Son point d'inflexion a pour abscisse :", choix: ["$2$", "$0$", "$4$", "$6$"], bonne: 0, explication: "$f''(x) = 6x - 12$." },
    { question: "Une fonction affine est :", choix: ["à la fois convexe et concave", "seulement convexe", "seulement concave", "ni convexe ni concave"], bonne: 0, explication: "$f'' = 0$." },
    { question: "$x^2$ est convexe. Elle est aussi :", choix: ["décroissante sur $]-\\infty\\,;0]$", "croissante sur $\\mathbb{R}$", "positive et croissante", "concave sur $]-\\infty\\,;0]$"], bonne: 0, explication: "Convexe ne veut pas dire croissante." },
    { question: "Pour le nombre cumulé de cas d'une épidémie, le point d'inflexion correspond :", choix: ["au pic des nouveaux cas par jour", "à la fin de l'épidémie", "au maximum du nombre cumulé", "au premier cas"], bonne: 0, explication: "$N'$ y est maximale." },
    { question: "La négation de « $f$ est convexe sur $I$ » est :", choix: ["« il existe une sécante sous laquelle la courbe ne reste pas »", "« $f$ est concave sur $I$ »", "« $f$ est décroissante »", "« $f'' < 0$ partout »"], bonne: 0, explication: "Une fonction peut n'être ni convexe ni concave." },
    { question: "$f'(x) = x^2 + 1$ sur $\\mathbb{R}$. La fonction $f$ est :", choix: ["ni convexe ni concave sur $\\mathbb{R}$", "convexe sur $\\mathbb{R}$", "concave sur $\\mathbb{R}$", "affine"], bonne: 0, explication: "$f''(x) = 2x$ change de signe : concave puis convexe." },
    { question: "$\\sqrt{x}$ est :", choix: ["concave sur $]0\\,;+\\infty[$", "convexe sur $]0\\,;+\\infty[$", "affine", "décroissante"], bonne: 0, explication: "Sa dérivée $\\dfrac{1}{2\\sqrt{x}}$ décroît." },
    { question: "Le test Python « sous la sécante » qui renvoie True :", choix: ["donne un indice, pas une preuve", "prouve la convexité", "prouve la concavité", "n'a aucun sens"], bonne: 0, explication: "On ne teste qu'un nombre fini de points." },
    { question: "Si $f'$ est décroissante sur $I$, alors $f$ est :", choix: ["concave sur $I$", "convexe sur $I$", "décroissante sur $I$", "constante"], bonne: 0, explication: "Caractérisation par $f'$." },
    { question: "$f(x) = (x + 1)e^x$ : sachant $f''(x) = (x + 3)e^x$, l'inflexion est en :", choix: ["$-3$", "$-1$", "$0$", "$3$"], bonne: 0, explication: "$e^x > 0$ : le signe est celui de $x + 3$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Étudier la convexité d'une fonction",
      etapes: ["Calculer $f'$, puis $f''$.", "Étudier le signe de $f''$ (tableau de signes).", "Conclure : convexe où $f'' \\geqslant 0$, concave où $f'' \\leqslant 0$ ; inflexion là où $f''$ change de signe."],
      exemple: "$x^3 - 3x^2 + 5$ : $f'' = 6(x - 1)$, concave puis convexe, inflexion en $(1\\,;3)$."
    },
    {
      titre: "Lire la convexité sur un graphique",
      etapes: ["Courbe « en U », au-dessus des tangentes : convexe.", "Courbe « en ∩ », sous les tangentes : concave.", "Point où la tangente traverse la courbe : inflexion."],
      exemple: "Une courbe en S a un point d'inflexion au milieu."
    },
    {
      titre: "Démontrer une inégalité par convexité",
      etapes: ["Montrer que $f$ est convexe (ou concave).", "Écrire l'équation d'une tangente.", "Conclure : courbe au-dessus (ou au-dessous) de la tangente."],
      exemple: "$e^x \\geqslant x + 1$ pour tout réel $x$."
    }
  ],
  erreurs: [
    "Confondre convexe et croissante.",
    "Conclure à un point d'inflexion dès que $f''(a) = 0$, sans vérifier le changement de signe.",
    "Oublier de dériver deux fois et utiliser le signe de $f'$ pour la convexité.",
    "Croire que la négation de « convexe » est « concave ».",
    "Inverser les positions : convexe, c'est sous les sécantes et au-dessus des tangentes.",
    "Prendre un test numérique pour une démonstration."
  ]
};
