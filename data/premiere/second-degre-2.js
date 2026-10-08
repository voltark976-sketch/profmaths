/*
  CHAPITRE : Première spécialité — Second degré 2 : forme canonique et discriminant
  ----------------------------------------------------------------------------------
  Chapitre 5 de la progression spiralée 2026-2027 (programme de Première 2026).
  La forme factorisée, le signe d'un produit et la somme et le produit des racines sont au chapitre 2
  (data/premiere/second-degre.js).
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce). Dans les formules, la virgule décimale s'écrit {,} : $0{,}35$.
  Les vidéos d'exercices corrigés (#06 à #09) correspondent aux exercices 5 à 8 du livret élève.
  Les corrigés du Drive sont réservés au professeur (Pronote) : ils ne sont pas liés ici.
  Figures : "parabole-canonique", "completer-carre", "carre-niveaux", "signe-trinome", "parabole-translation", "ballon".
  Générateurs : sd- et s5-.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["premiere-second-degre-2"] = {
  niveau: "Première spécialité",
  numero: 5,
  titre: "Second degré 2 : forme canonique et discriminant",
  accroche: "Compléter le carré, lire le sommet, résoudre et factoriser avec le discriminant, décaler une parabole et suivre le ballon de Faïza au stade de Cavani.",

  playlist: "https://www.youtube.com/playlist?list=PLNiZpXHauJZw",
  drive: "https://drive.google.com/drive/folders/1Jw7zQe-wQDLffgycdEJuUw56iU26NGsM",
  pdfs: [
    {
      titre: "Livret élève : formes développée, canonique et factorisée (chapitres 2 et 5)",
      url: "https://drive.google.com/file/d/1rryaVPvC2IRRHjYga5P2UGewdiqDGhs8/view"
    }
  ],
  liens: [
    { titre: "Jeuxmaths : équations du second degré", url: "https://www.jeuxmaths.fr/exoshtml5/equations-second-degre.html" },
    { titre: "Jeuxmaths : inéquations du second degré", url: "https://www.jeuxmaths.fr/exoshtml5/inequations-second-degre.html" },
    { titre: "Jeuxmaths : vrai ou faux sur le second degré", url: "https://www.jeuxmaths.fr/exercice-de-math-vrai-faux-seconddegre.html" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Forme canonique : sommet et extremum",
      figure: "parabole-canonique",
      video: { titre: "Vidéo de ton prof : lire une forme canonique, sommet et extremum (exercice corrigé)", youtube: "https://youtu.be/bd8ZITKW6hs" },
      texte:
        "Toute fonction polynôme du second degré $f(x) = ax^2 + bx + c$ (avec $a \\neq 0$) peut s'écrire sous **forme canonique** :\n\n" +
        "$f(x) = a(x - \\alpha)^2 + \\beta$.\n\n" +
        "- La parabole a pour **sommet** $S(\\alpha\\,;\\beta)$ et pour **axe de symétrie** la droite d'équation $x = \\alpha$.\n" +
        "- Si $a > 0$ : $f$ décroît sur $]-\\infty\\,;\\alpha]$ puis croît sur $[\\alpha\\,;+\\infty[$ ; $\\beta$ est le **minimum**.\n" +
        "- Si $a < 0$ : $f$ croît puis décroît ; $\\beta$ est le **maximum**.\n\n" +
        "Pourquoi ? Un carré est toujours positif ou nul. Si $a > 0$, alors $a(x - \\alpha)^2 \\geqslant 0$, donc $f(x) \\geqslant \\beta$, avec égalité seulement pour $x = \\alpha$.\n\n" +
        "Attention au signe : dans $(x + 3)^2$, on lit $\\alpha = -3$.",
      exemple: {
        enonce: "Lis le sommet et l'extremum de $f(x) = (x - 1)^2 - 4$ (courbe ci-contre), puis de $g(x) = -(x + 2)^2 + 5$.",
        solution: "$f$ : sommet $S(1\\,;-4)$ et $a = 1 > 0$, donc minimum $-4$ atteint en $x = 1$.\n\n$g$ : sommet $(-2\\,;5)$ et $a = -1 < 0$, donc maximum $5$ atteint en $x = -2$."
      }
    },
    {
      titre: "Compléter le carré",
      figure: "completer-carre",
      video: { titre: "Vidéo d'Yvan Monka : déterminer la forme canonique", youtube: "https://youtu.be/JcT6kph74O0" },
      texte:
        "On lit l'identité $(x + a)^2 = x^2 + 2ax + a^2$ à l'envers :\n\n" +
        "$x^2 + 2ax = (x + a)^2 - a^2$.\n\n" +
        "Sur le schéma, le carré $x^2$ et les deux rectangles $ax$ forment **presque** le carré de côté $x + a$ : il manque le petit carré $a^2$, qu'il faut retirer.\n\n" +
        "**Méthode** pour $x^2 + bx + c$ : on prend la moitié de $b$, on écrit le carré, on compense.\n\n" +
        "- $x^2 + 6x + 2 = (x + 3)^2 - 9 + 2 = (x + 3)^2 - 7$.\n" +
        "- $x^2 - 10x = (x - 5)^2 - 25$.\n\n" +
        "Si le coefficient de $x^2$ n'est pas $1$, on le met d'abord en facteur dans les termes en $x^2$ et en $x$.",
      exemple: {
        enonce: "Écris $f(x) = 2x^2 - 8x + 3$ sous forme canonique.",
        solution: "$f(x) = 2(x^2 - 4x) + 3 = 2\\left[(x - 2)^2 - 4\\right] + 3 = 2(x - 2)^2 - 8 + 3 = 2(x - 2)^2 - 5$.\n\nLe sommet de la parabole est $S(2\\,;-5)$."
      }
    },
    {
      titre: "Forme canonique avec $\\alpha$ et $\\beta$",
      video: { titre: "Vidéo de ton prof : trouver la forme canonique avec α et β (exercice corrigé)", youtube: "https://youtu.be/27CXhoSxvV8" },
      texte:
        "Autre méthode, valable pour tout trinôme $ax^2 + bx + c$ :\n\n" +
        "$\\alpha = -\\dfrac{b}{2a}$ puis $\\beta = f(\\alpha)$.\n\n" +
        "- On calcule $\\alpha$, puis l'image $\\beta = f(\\alpha)$.\n" +
        "- On écrit $f(x) = a(x - \\alpha)^2 + \\beta$, avec le **même** coefficient $a$.\n" +
        "- On vérifie en développant.\n\n" +
        "La formule $\\alpha = -\\dfrac{b}{2a}$ donne aussi directement l'abscisse du sommet, donc les variations.",
      exemple: {
        enonce: "Détermine la forme canonique de $f(x) = 2x^2 + 4x - 1$.",
        solution: "$\\alpha = -\\dfrac{4}{2 \\times 2} = -1$ et $\\beta = f(-1) = 2 - 4 - 1 = -3$. Donc $f(x) = 2(x + 1)^2 - 3$.\n\nVérification : $2(x^2 + 2x + 1) - 3 = 2x^2 + 4x - 1$."
      }
    },
    {
      titre: "Utiliser la forme canonique : minimum et équation",
      figure: "carre-niveaux",
      video: { titre: "Vidéo de ton prof : forme canonique, minimum et f(x) = 0 (exercice corrigé)", youtube: "https://youtu.be/EG8NR8NU8w4" },
      texte:
        "La forme canonique permet de résoudre $f(x) = 0$ en **isolant le carré** :\n\n" +
        "$a(x - \\alpha)^2 + \\beta = 0 \\iff (x - \\alpha)^2 = -\\dfrac{\\beta}{a}$.\n\n" +
        "Comme pour $x^2 = k$ (schéma ci-contre) :\n\n" +
        "- si $-\\dfrac{\\beta}{a} > 0$ : deux solutions ;\n" +
        "- si $-\\dfrac{\\beta}{a} = 0$ : une seule solution, $x = \\alpha$ ;\n" +
        "- si $-\\dfrac{\\beta}{a} < 0$ : aucune solution, car un carré n'est jamais négatif.\n\n" +
        "C'est exactement l'idée du discriminant, qu'on va généraliser.",
      exemple: {
        enonce: "$f(x) = x^2 - 6x + 5 = (x - 3)^2 - 4$. Montre que $f(x) \\geqslant -4$, puis résous $f(x) = 0$.",
        solution: "$(x - 3)^2 \\geqslant 0$ donc $f(x) \\geqslant -4$, avec égalité pour $x = 3$ : le minimum est $-4$.\n\n$f(x) = 0 \\iff (x - 3)^2 = 4 \\iff x - 3 = 2$ ou $x - 3 = -2 \\iff x = 5$ ou $x = 1$."
      }
    },
    {
      titre: "Discriminant : résoudre et factoriser",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une équation du second degré", youtube: "https://youtu.be/youUIZ-wsYk" },
      texte:
        "Pour $ax^2 + bx + c$ (avec $a \\neq 0$), on calcule le **discriminant** $\\Delta = b^2 - 4ac$, après avoir tout ramené dans le membre de gauche.\n\n" +
        "- $\\Delta > 0$ : deux racines $x_1 = \\dfrac{-b - \\sqrt{\\Delta}}{2a}$ et $x_2 = \\dfrac{-b + \\sqrt{\\Delta}}{2a}$, et $ax^2 + bx + c = a(x - x_1)(x - x_2)$.\n" +
        "- $\\Delta = 0$ : une racine double $x_0 = -\\dfrac{b}{2a}$, et $ax^2 + bx + c = a(x - x_0)^2$.\n" +
        "- $\\Delta < 0$ : aucune racine réelle, et pas de factorisation en facteurs du premier degré.\n\n" +
        "Avant de calculer $\\Delta$, regarde si une factorisation simple suffit : $x^2 - 7x = x(x - 7)$, $4x^2 - 25 = (2x - 5)(2x + 5)$.",
      exemple: {
        enonce: "Résous $2x^2 - 5x + 2 = 0$, puis factorise $2x^2 - 5x + 2$.",
        solution: "$\\Delta = (-5)^2 - 4 \\times 2 \\times 2 = 25 - 16 = 9 > 0$ : $x_1 = \\dfrac{5 - 3}{4} = \\dfrac{1}{2}$ et $x_2 = \\dfrac{5 + 3}{4} = 2$.\n\nDonc $2x^2 - 5x + 2 = 2\\left(x - \\dfrac{1}{2}\\right)(x - 2)$."
      }
    },
    {
      titre: "Démonstration : une disjonction des cas",
      video: { titre: "Vidéo d'Yvan Monka : démonstration des solutions d'une équation du second degré", youtube: "https://youtu.be/7VFpZ63Tgis" },
      texte:
        "On part de $ax^2 + bx + c$ avec $a \\neq 0$ et on pose $\\Delta = b^2 - 4ac$. En complétant le carré (vérifie en développant) :\n\n" +
        "$ax^2 + bx + c = a\\left[\\left(x + \\dfrac{b}{2a}\\right)^2 - \\dfrac{\\Delta}{4a^2}\\right]$.\n\n" +
        "En divisant par $a \\neq 0$, l'équation $ax^2 + bx + c = 0$ devient :\n\n" +
        "$\\left(x + \\dfrac{b}{2a}\\right)^2 = \\dfrac{\\Delta}{4a^2}$.\n\n" +
        "Comme $4a^2 > 0$, on raisonne par **disjonction des cas** selon le signe de $\\Delta$ :\n\n" +
        "- si $\\Delta < 0$ : un carré n'est jamais négatif, il n'y a **aucune solution** ;\n" +
        "- si $\\Delta = 0$ : le carré est nul, donc $x = -\\dfrac{b}{2a}$ ;\n" +
        "- si $\\Delta > 0$ : $x + \\dfrac{b}{2a} = \\dfrac{\\sqrt{\\Delta}}{2a}$ ou $x + \\dfrac{b}{2a} = -\\dfrac{\\sqrt{\\Delta}}{2a}$, d'où $x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$.\n\n" +
        "Les trois cas couvrent toutes les possibilités : la démonstration est complète.",
      exemple: {
        enonce: "Complète le carré pour résoudre $x^2 + 6x + 5 = 0$ sans formule.",
        solution: "$x^2 + 6x + 5 = (x + 3)^2 - 9 + 5 = (x + 3)^2 - 4$.\n\n$(x + 3)^2 = 4 \\iff x + 3 = 2$ ou $x + 3 = -2 \\iff x = -1$ ou $x = -5$."
      }
    },
    {
      titre: "Signe du trinôme et inéquations",
      figure: "signe-trinome",
      video: { titre: "Vidéo d'Yvan Monka : résoudre une inéquation en étudiant le signe d'un trinôme", youtube: "https://youtu.be/AEL4qKKNvp8" },
      texte:
        "- **Deux racines** $x_1 < x_2$ ($\\Delta > 0$) : le trinôme est **du signe de $a$ à l'extérieur** des racines et **du signe contraire entre** elles.\n" +
        "- **Racine double** ($\\Delta = 0$) : du signe de $a$ partout, nul seulement en $x_0$.\n" +
        "- **Aucune racine** ($\\Delta < 0$) : strictement du signe de $a$ sur $\\mathbb{R}$.\n\n" +
        "Le schéma montre le cas $a > 0$ ; pour $a < 0$, tous les signes s'inversent.\n\n" +
        "Pour résoudre une inéquation : tout ramener à $0$, chercher les racines, dresser le tableau de signes, choisir les intervalles. Les racines sont incluses seulement si l'inégalité est large.\n\n" +
        "**Contre-exemple** : « si $\\Delta > 0$, le trinôme est positif » est faux. Le trinôme $x^2 - 1$ a pour discriminant $4 > 0$, mais il vaut $-1$ en $x = 0$.",
      exemple: {
        enonce: "Résous $-x^2 + 2x + 3 > 0$.",
        solution: "$\\Delta = 2^2 - 4 \\times (-1) \\times 3 = 16$ : racines $\\dfrac{-2 - 4}{-2} = 3$ et $\\dfrac{-2 + 4}{-2} = -1$.\n\nComme $a = -1 < 0$, le trinôme est positif **entre** les racines : $S = ]-1\\,;3[$."
      }
    },
    {
      titre: "Courbe de $x \\mapsto f(x - m)$",
      figure: "parabole-translation",
      texte:
        "Soit $m$ un réel et $g(x) = f(x - m)$. La courbe de $g$ est celle de $f$ **décalée horizontalement** de $m$ unités :\n\n" +
        "- vers la **droite** si $m > 0$ ;\n" +
        "- vers la **gauche** si $m < 0$.\n\n" +
        "Pourquoi ? Puisque $g(x_0 + m) = f(x_0)$, le point $(x_0\\,;f(x_0))$ de la courbe de $f$ se retrouve en $(x_0 + m\\,;f(x_0))$ sur celle de $g$.\n\n" +
        "Exemple du schéma : $(x - 3)^2$ est la parabole $y = x^2$ décalée de $3$ vers la droite. Plus généralement, la parabole de $a(x - \\alpha)^2 + \\beta$ est celle de $ax^2$ décalée de $\\alpha$ horizontalement et de $\\beta$ verticalement.\n\n" +
        "Piège : $f(x - 3)$ décale vers la **droite**, pas vers la gauche.",
      exemple: {
        enonce: "$f(x) = (x + 1)^2 + 2$. Quel est le sommet de la courbe de $g(x) = f(x - 4)$ ?",
        solution: "Le sommet de la courbe de $f$ est $(-1\\,;2)$. On décale de $4$ vers la droite : le sommet devient $(3\\,;2)$.\n\nVérification : $g(x) = (x - 4 + 1)^2 + 2 = (x - 3)^2 + 2$."
      }
    },
    {
      titre: "Choisir la forme adaptée",
      video: { titre: "Vidéo de ton prof : développée, canonique ou factorisée ? (exercice corrigé)", youtube: "https://youtu.be/um5vzSymAr4" },
      texte:
        "Une même fonction peut s'écrire de trois façons. On choisit la plus pratique selon la question :\n\n" +
        "- **développée** $ax^2 + bx + c$ : $f(0) = c$, des images, l'équation $f(x) = c$ ;\n" +
        "- **canonique** $a(x - \\alpha)^2 + \\beta$ : sommet, extremum, variations, l'équation $f(x) = \\beta$ ;\n" +
        "- **factorisée** $a(x - x_1)(x - x_2)$ : racines, signe, inéquations.\n\n" +
        "Le coefficient $a$ est le même dans les trois formes.",
      exemple: {
        enonce: "$f(x) = 2x^2 - 8x + 6 = 2(x - 2)^2 - 2 = 2(x - 1)(x - 3)$. Calcule $f(0)$ et le minimum de $f$, puis résous $f(x) \\leqslant 0$ et $f(x) = 6$.",
        solution: "Développée : $f(0) = 6$. Canonique : minimum $-2$ atteint en $x = 2$.\n\nFactorisée : $a = 2 > 0$, donc $f(x) \\leqslant 0$ entre les racines, $S = [1\\,;3]$.\n\nDéveloppée : $f(x) = 6 \\iff 2x^2 - 8x = 0 \\iff 2x(x - 4) = 0 \\iff x = 0$ ou $x = 4$."
      }
    },
    {
      titre: "Position de deux courbes",
      video: { titre: "Vidéo d'Yvan Monka : étudier la position relative de deux courbes", youtube: "https://youtu.be/OWoaJjL9Hy4" },
      texte:
        "Pour comparer les courbes de $f$ et $g$ :\n\n" +
        "- les **points communs** ont pour abscisses les solutions de $f(x) = g(x)$, soit $f(x) - g(x) = 0$ ;\n" +
        "- la courbe de $f$ est **au-dessus** de celle de $g$ là où $f(x) - g(x) \\geqslant 0$.\n\n" +
        "On étudie donc le signe de $f(x) - g(x)$, qui est souvent un trinôme.",
      exemple: {
        enonce: "$f(x) = x^2$ et $g(x) = 4x - 4$. Étudie la position des deux courbes.",
        solution: "$f(x) - g(x) = x^2 - 4x + 4 = (x - 2)^2 \\geqslant 0$. La parabole est toujours au-dessus de la droite, avec un seul point commun $(2\\,;4)$ : la droite est tangente à la parabole."
      }
    },
    {
      titre: "Modéliser : la trajectoire d'un ballon",
      figure: "ballon",
      texte:
        "Au stade de Cavani, Faïza dégage le ballon depuis le sol. Sa hauteur en mètres, au bout de $t$ secondes, est modélisée par $h(t) = -5t^2 + 15t$ (on néglige les frottements de l'air).\n\n" +
        "- **Hauteur maximale** : $a = -5 < 0$, le sommet est un maximum. $\\alpha = -\\dfrac{15}{2 \\times (-5)} = 1{,}5$ et $h(1{,}5) = -11{,}25 + 22{,}5 = 11{,}25$. Le ballon monte à $11{,}25$ m au bout de $1{,}5$ s.\n" +
        "- **Point de chute** : $h(t) = t(-5t + 15) = 0 \\iff t = 0$ ou $t = 3$. Le ballon retombe au bout de $3$ s.\n\n" +
        "Le modèle n'a de sens que pour $t \\in [0\\,;3]$ : on vérifie toujours que la réponse a du sens dans le contexte.",
      exemple: {
        enonce: "Pendant combien de temps le ballon est-il à au moins $10$ m de hauteur ?",
        solution: "$h(t) \\geqslant 10 \\iff -5t^2 + 15t - 10 \\geqslant 0 \\iff -5(t - 1)(t - 2) \\geqslant 0$.\n\nAvec $a = -5 < 0$, le trinôme est positif entre ses racines : $t \\in [1\\,;2]$. Le ballon reste au-dessus de $10$ m pendant $1$ seconde."
      }
    },
    {
      titre: "Python : la liste des solutions",
      texte:
        "Cette fonction suit la disjonction des cas sur $\\Delta$ et renvoie la **liste** des solutions de $ax^2 + bx + c = 0$ :\n\n" +
        "```python\nfrom math import sqrt\n\ndef solutions(a, b, c):\n    d = b**2 - 4*a*c\n    if d > 0:\n        return [(-b - sqrt(d)) / (2*a), (-b + sqrt(d)) / (2*a)]\n    elif d == 0:\n        return [-b / (2*a)]\n    else:\n        return []\n```\n\n" +
        "La longueur de la liste, $\\texttt{len(solutions(a, b, c))}$, donne le nombre de solutions. Les résultats sont des valeurs décimales approchées : $\\sqrt{2}$ s'affiche $\\texttt{1.4142135623730951}$.",
      exemple: {
        enonce: "Que renvoient $\\texttt{solutions(1, -2, -3)}$ et $\\texttt{solutions(1, 2, 5)}$ ?",
        solution: "$\\Delta = 4 + 12 = 16 > 0$ : la liste $\\texttt{[-1.0, 3.0]}$.\n\n$\\Delta = 4 - 20 = -16 < 0$ : la liste vide $\\texttt{[]}$."
      }
    }
  ],

  videos: [
    { titre: "Exercice 5 · Forme canonique : minimum et f(x) = 0", type: "Découverte", youtube: "https://youtu.be/EG8NR8NU8w4" },
    { titre: "Exercice 6 · Lire une forme canonique : sommet et extremum", type: "Application", youtube: "https://youtu.be/bd8ZITKW6hs" },
    { titre: "Exercice 7 · Trouver la forme canonique avec α et β", type: "Méthode", youtube: "https://youtu.be/27CXhoSxvV8" },
    { titre: "Exercice 8 · Développée, canonique ou factorisée ?", type: "Synthèse", youtube: "https://youtu.be/um5vzSymAr4" }
  ],
  videosNote: "Énoncés dans le livret élève ci-dessus (exercices 5 à 8).",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "sd-canonique-lire", titre: "Lire une forme canonique", etape: "Forme canonique", nb: 5 },
    { type: "sd-variations", titre: "Variations d'une fonction du second degré", etape: "Forme canonique", nb: 5 },
    { type: "sd-completer-carre", titre: "Compléter le carré", etape: "Forme canonique", nb: 5 },
    { type: "sd-canonique-construire", titre: "Trouver la forme canonique", etape: "Forme canonique", nb: 5 },
    { type: "sd-discriminant", titre: "Calculer un discriminant", etape: "Discriminant", nb: 5 },
    { type: "sd-nb-racines", titre: "Combien de racines ?", etape: "Discriminant", nb: 5 },
    { type: "sd-resoudre", titre: "Résoudre une équation du second degré", etape: "Discriminant", nb: 6 },
    { type: "s5-factoriser", titre: "Factoriser avec le discriminant", etape: "Discriminant", nb: 5 },
    { type: "sd-inequation-delta", titre: "Résoudre une inéquation", etape: "Signe", nb: 6 },
    { type: "s5-vrai-faux", titre: "Vrai ou faux ? Le contre-exemple", etape: "Signe", nb: 5 },
    { type: "sd-intersection", titre: "Points communs à deux courbes", etape: "Signe", nb: 4 },
    { type: "s5-translation", titre: "Courbe de $x \\mapsto f(x - m)$", etape: "Modéliser", nb: 5 },
    { type: "s5-forme-adaptee", titre: "Choisir la forme adaptée", etape: "Modéliser", nb: 5 },
    { type: "s5-ballon", titre: "La trajectoire du ballon", etape: "Modéliser", nb: 4 },
    { type: "s5-python", titre: "Python : la liste des solutions", etape: "Modéliser", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    {
      question: "Quelle est la forme canonique de $x^2 - 6x + 5$ ?",
      choix: ["$(x - 3)^2 + 5$", "$(x + 3)^2 - 4$", "$(x - 3)^2 - 4$", "$(x - 6)^2 + 5$"],
      bonne: 2,
      explication: "$x^2 - 6x = (x - 3)^2 - 9$, donc $x^2 - 6x + 5 = (x - 3)^2 - 4$."
    },
    {
      question: "En complétant le carré, $x^2 + 8x$ est égal à :",
      choix: ["$(x + 4)^2 - 16$", "$(x + 4)^2 + 16$", "$(x + 8)^2 - 64$", "$(x - 4)^2 - 16$"],
      bonne: 0,
      explication: "La moitié de $8$ est $4$ : $(x + 4)^2 = x^2 + 8x + 16$, il faut donc retirer $16$."
    },
    {
      question: "$f(x) = 2(x - 1)^2 - 3$. Que peut-on dire de $f$ ?",
      choix: ["Minimum $-3$ atteint en $1$", "Maximum $-3$ atteint en $1$", "Minimum $1$ atteint en $-3$", "Minimum $-3$ atteint en $-1$"],
      bonne: 0,
      explication: "$a = 2 > 0$ : minimum $\\beta = -3$, atteint en $\\alpha = 1$."
    },
    {
      question: "$g(x) = -(x + 2)^2 + 5$. Sur quel intervalle $g$ est-elle croissante ?",
      choix: ["$[-2\\,;+\\infty[$", "$]-\\infty\\,;-2]$", "$]-\\infty\\,;2]$", "$[5\\,;+\\infty[$"],
      bonne: 1,
      explication: "$\\alpha = -2$ et $a = -1 < 0$ : $g$ croît sur $]-\\infty\\,;-2]$ puis décroît."
    },
    {
      question: "Quel est le discriminant de $2x^2 - 3x - 2$ ?",
      choix: ["$-7$", "$25$", "$-25$", "$7$"],
      bonne: 1,
      explication: "$\\Delta = (-3)^2 - 4 \\times 2 \\times (-2) = 9 + 16 = 25$."
    },
    {
      question: "Un élève résout $2x^2 - 3x - 2 = 0$ et trouve $\\Delta = 25$, puis $x = \\dfrac{3 \\pm 5}{2}$. Où est l'erreur ?",
      choix: ["Dans le calcul de $\\Delta$", "Il faut diviser par $2a = 4$, pas par $2$", "Il faut prendre $-3$ au lieu de $3$", "Il n'y a pas d'erreur"],
      bonne: 1,
      explication: "$x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a} = \\dfrac{3 \\pm 5}{4}$, soit $-\\dfrac{1}{2}$ et $2$."
    },
    {
      question: "Combien de solutions réelles a l'équation $3x^2 + 2x + 1 = 0$ ?",
      choix: ["Aucune", "Une", "Deux", "Une infinité"],
      bonne: 0,
      explication: "$\\Delta = 4 - 12 = -8 < 0$ : aucune solution réelle."
    },
    {
      question: "Les solutions de $x^2 + 6x + 9 = 0$ sont…",
      choix: ["$3$", "$-3$", "$-3$ et $3$", "aucune"],
      bonne: 1,
      explication: "$x^2 + 6x + 9 = (x + 3)^2$ : racine double $-3$ (et $\\Delta = 36 - 36 = 0$)."
    },
    {
      question: "Pour résoudre $x^2 = 7x$, quelle est la bonne méthode ?",
      choix: ["Diviser par $x$ : $x = 7$", "Écrire $x(x - 7) = 0$ : $x = 0$ ou $x = 7$", "Prendre la racine : $x = \\sqrt{7x}$", "Il n'y a pas de solution"],
      bonne: 1,
      explication: "Diviser par $x$ fait perdre la solution $x = 0$. On factorise et on applique le produit nul."
    },
    {
      question: "Une forme factorisée de $x^2 + 2x - 8$ est :",
      choix: ["$(x - 2)(x + 4)$", "$(x + 2)(x - 4)$", "$(x - 2)(x - 4)$", "On ne peut pas factoriser"],
      bonne: 0,
      explication: "$\\Delta = 4 + 32 = 36$ : racines $\\dfrac{-2 - 6}{2} = -4$ et $\\dfrac{-2 + 6}{2} = 2$, donc $(x - 2)(x + 4)$."
    },
    {
      question: "Peut-on factoriser $x^2 + x + 1$ en produit de facteurs du premier degré ?",
      choix: ["Oui : $(x + 1)^2$", "Oui : $x(x + 1) + 1$", "Non, car $\\Delta < 0$", "Non, car $a > 0$"],
      bonne: 2,
      explication: "$\\Delta = 1 - 4 = -3 < 0$ : aucune racine, donc pas de factorisation. $x(x + 1) + 1$ n'est pas un produit."
    },
    {
      question: "Les solutions de $x^2 - x - 6 \\geqslant 0$ sont…",
      choix: ["$]-\\infty\\,;-2] \\cup [3\\,;+\\infty[$", "$[-2\\,;3]$", "$]-\\infty\\,;-3] \\cup [2\\,;+\\infty[$", "$[-3\\,;2]$"],
      bonne: 0,
      explication: "$\\Delta = 25$, racines $-2$ et $3$ ; $a > 0$ : positif ou nul à l'extérieur des racines."
    },
    {
      question: "Les solutions de $2x^2 + 2x + 3 \\leqslant 0$ sont…",
      choix: ["$\\mathbb{R}$", "$\\varnothing$", "$[-1\\,;0]$", "$\\left\\{-\\dfrac{1}{2}\\right\\}$"],
      bonne: 1,
      explication: "$\\Delta = 4 - 24 < 0$ et $a > 0$ : le trinôme est strictement positif partout, jamais négatif ou nul."
    },
    {
      question: "Les solutions de $-x^2 + 4x - 4 \\geqslant 0$ sont…",
      choix: ["$\\mathbb{R}$", "$\\varnothing$", "$\\{2\\}$", "$[2\\,;+\\infty[$"],
      bonne: 2,
      explication: "$-x^2 + 4x - 4 = -(x - 2)^2$ : toujours négatif, nul seulement en $2$."
    },
    {
      question: "Vrai ou faux : « si le discriminant est positif, le trinôme est positif ».",
      choix: ["Vrai", "Faux"],
      bonne: 1,
      explication: "Faux : $\\Delta > 0$ indique seulement deux racines. Contre-exemple : $x^2 - 1$ ($\\Delta = 4$) vaut $-1$ en $0$."
    },
    {
      question: "Pour montrer que « pour tout réel $x$, $x^2 - 4x + 3 > 0$ » est faux, il suffit de…",
      choix: ["donner un contre-exemple, comme $x = 2$", "vérifier que c'est vrai pour $x = 0$ et $x = 5$", "trouver une valeur où l'expression est positive", "rien : l'affirmation est vraie"],
      bonne: 0,
      explication: "Un seul contre-exemple suffit : en $x = 2$, $4 - 8 + 3 = -1$ n'est pas strictement positif. Vérifier des cas où c'est vrai ne prouve rien."
    },
    {
      question: "Vrai ou faux : « si un trinôme a un minimum strictement positif, il n'a aucune racine réelle ».",
      choix: ["Vrai", "Faux"],
      bonne: 0,
      explication: "Vrai : toutes ses valeurs sont supérieures ou égales au minimum, donc strictement positives ; il ne s'annule jamais."
    },
    {
      question: "La courbe de $g(x) = f(x + 2)$ s'obtient à partir de celle de $f$ par un décalage…",
      choix: ["de $2$ vers la droite", "de $2$ vers la gauche", "de $2$ vers le haut", "de $2$ vers le bas"],
      bonne: 1,
      explication: "$f(x + 2) = f(x - (-2))$ : $m = -2 < 0$, la courbe est décalée de $2$ vers la gauche."
    },
    {
      question: "La parabole de $f(x) = x^2$ et la droite d'équation $y = 4x - 4$ ont…",
      choix: ["aucun point commun", "un seul point commun", "deux points communs", "une infinité de points communs"],
      bonne: 1,
      explication: "$x^2 - 4x + 4 = (x - 2)^2 = 0$ a une seule solution : un point commun $(2\\,;4)$."
    },
    {
      question: "Une balle a pour hauteur $h(t) = -5t^2 + 20t + 1$ (en m, $t$ en s). Quelle est sa hauteur maximale ?",
      choix: ["$1$ m", "$2$ m", "$21$ m", "$41$ m"],
      bonne: 2,
      explication: "$\\alpha = -\\dfrac{20}{-10} = 2$ et $h(2) = -20 + 40 + 1 = 21$ m. ($2$ s, c'est l'instant du maximum.)"
    },
    {
      question: "Un ballon a pour hauteur $h(t) = -5t^2 + 10t$. Au bout de combien de temps retombe-t-il au sol ?",
      choix: ["$1$ s", "$2$ s", "$5$ s", "$10$ s"],
      bonne: 1,
      explication: "$h(t) = t(-5t + 10) = 0 \\iff t = 0$ ou $t = 2$. Il retombe au bout de $2$ s ($1$ s, c'est l'instant du maximum)."
    },
    {
      question: "Avec la fonction Python du cours, que renvoie $\\texttt{solutions(1, -4, 4)}$ ?",
      choix: ["$\\texttt{[2.0]}$", "$\\texttt{[2.0, 2.0]}$", "$\\texttt{[-2.0]}$", "$\\texttt{[]}$"],
      bonne: 0,
      explication: "$\\Delta = 16 - 16 = 0$ : la fonction renvoie une liste d'un seul élément, $-\\dfrac{b}{2a} = 2$."
    },
    {
      question: "Dans la forme canonique $a(x - \\alpha)^2 + \\beta$ de $ax^2 + bx + c$, on a $\\beta =$ :",
      choix: ["$-\\dfrac{\\Delta}{4a}$", "$-\\dfrac{b}{2a}$", "$\\dfrac{\\Delta}{4a}$", "$b^2 - 4ac$"],
      bonne: 0,
      explication: "En complétant le carré : $a\\left(x + \\dfrac{b}{2a}\\right)^2 - \\dfrac{b^2 - 4ac}{4a}$, donc $\\beta = -\\dfrac{\\Delta}{4a}$. $-\\dfrac{b}{2a}$, c'est $\\alpha$."
    }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Obtenir la forme canonique",
      etapes: [
        "Cas simple $x^2 + bx + c$ : compléter le carré avec la moitié de $b$, puis compenser.",
        "Cas général : calculer $\\alpha = -\\dfrac{b}{2a}$, puis $\\beta = f(\\alpha)$.",
        "Écrire $f(x) = a(x - \\alpha)^2 + \\beta$ et vérifier en développant."
      ],
      exemple: "$x^2 - 4x + 1 = (x - 2)^2 - 4 + 1 = (x - 2)^2 - 3$ ; et $h(x) = -x^2 + 6x - 2$ : $\\alpha = 3$, $\\beta = h(3) = 7$, donc $h(x) = -(x - 3)^2 + 7$."
    },
    {
      titre: "Dresser le tableau de variations",
      etapes: [
        "Trouver $\\alpha$ et $\\beta$ (forme canonique, ou $\\alpha = -\\dfrac{b}{2a}$).",
        "Regarder le signe de $a$ : si $a > 0$, la flèche descend puis monte ; si $a < 0$, elle monte puis descend.",
        "Placer $\\beta$ sous $\\alpha$ et conclure : minimum ou maximum $\\beta$ atteint en $\\alpha$."
      ],
      exemple: "$g(x) = -2(x + 1)^2 + 8$ : croissante sur $]-\\infty\\,;-1]$, décroissante ensuite, maximum $8$ en $-1$."
    },
    {
      titre: "Résoudre une équation du second degré",
      etapes: [
        "Tout ramener dans le membre de gauche pour obtenir $ax^2 + bx + c = 0$.",
        "Chercher d'abord une factorisation simple (facteur commun, identité remarquable).",
        "Sinon, calculer $\\Delta = b^2 - 4ac$ en mettant les négatifs entre parenthèses.",
        "Selon le signe de $\\Delta$ : deux solutions $\\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$, une solution $-\\dfrac{b}{2a}$, ou aucune.",
        "Vérifier une solution en la remplaçant dans l'équation de départ."
      ],
      exemple: "$x^2 + 2x = 8 \\iff x^2 + 2x - 8 = 0$ : $\\Delta = 36$, $x = \\dfrac{-2 \\pm 6}{2}$, soit $-4$ ou $2$."
    },
    {
      titre: "Factoriser un trinôme",
      etapes: [
        "Calculer $\\Delta$.",
        "Si $\\Delta > 0$ : $a(x - x_1)(x - x_2)$. Si $\\Delta = 0$ : $a(x - x_0)^2$. Si $\\Delta < 0$ : pas de factorisation en facteurs du premier degré.",
        "Ne pas oublier le coefficient $a$ devant, puis vérifier en développant."
      ],
      exemple: "$2x^2 - 2x - 12$ : $\\Delta = 4 + 96 = 100$, racines $-2$ et $3$, donc $2x^2 - 2x - 12 = 2(x + 2)(x - 3)$."
    },
    {
      titre: "Résoudre une inéquation du second degré",
      etapes: [
        "Tout passer d'un côté pour comparer à $0$.",
        "Trouver les racines (factorisation ou $\\Delta$) et le signe de $a$.",
        "Dresser le tableau de signes : signe de $a$ à l'extérieur des racines, signe contraire entre ; sans racine, signe de $a$ partout.",
        "Lire les solutions. Crochets fermés en une racine seulement si l'inégalité est large."
      ],
      exemple: "$2x^2 - 3x > 2 \\iff 2x^2 - 3x - 2 > 0$ : racines $-\\dfrac{1}{2}$ et $2$, $a > 0$, donc $S = ]-\\infty\\,;-\\tfrac{1}{2}[ \\cup ]2\\,;+\\infty[$."
    },
    {
      titre: "Choisir la forme adaptée",
      etapes: [
        "Repérer ce qu'on cherche : une image, un extremum, des racines, un signe.",
        "Forme développée pour $f(0)$ et $f(x) = c$ ; canonique pour le sommet et les variations ; factorisée pour les racines et le signe.",
        "Si la forme utile manque, la calculer : $\\Delta$ pour la factorisée, $\\alpha$ et $\\beta$ pour la canonique."
      ],
      exemple: "Pour résoudre $f(x) = f(0)$ : $ax^2 + bx + c = c \\iff x(ax + b) = 0$."
    },
    {
      titre: "Réfuter une affirmation : le contre-exemple",
      etapes: [
        "Repérer le « pour tout » (parfois sous-entendu).",
        "Chercher une valeur où l'affirmation est fausse : une racine, le sommet, une valeur entre les racines.",
        "Un seul contre-exemple suffit pour conclure « faux ». Pour conclure « vrai », il faut une démonstration, par exemple une disjonction des cas sur $\\Delta$."
      ],
      exemple: "« Pour tout $x$, $x^2 \\geqslant x$ » est faux : pour $x = \\dfrac{1}{2}$, $x^2 = \\dfrac{1}{4} < \\dfrac{1}{2}$."
    }
  ],
  erreurs: [
    "Lire $\\alpha = 3$ dans $(x + 3)^2$ : on cherche ce qui annule la parenthèse, donc $\\alpha = -3$.",
    "Confondre l'extremum $\\beta$ (une image) et l'endroit où il est atteint $\\alpha$ (une abscisse) : au ballon, la hauteur maximale n'est pas l'instant du maximum.",
    "Compléter le carré sans compenser : $x^2 + 6x$ n'est pas $(x + 3)^2$, il faut retirer $9$.",
    "Calculer $-3^2 = -9$ au lieu de $(-3)^2 = 9$ dans $\\Delta$ : mets les négatifs entre parenthèses.",
    "Calculer $\\Delta$ avant d'avoir ramené l'équation à « $= 0$ ».",
    "Diviser seulement par $2$ au lieu de $2a$ dans $\\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$.",
    "Oublier $a$ dans la forme factorisée : $2x^2 - 2x - 12 = 2(x + 2)(x - 3)$, pas $(x + 2)(x - 3)$.",
    "Diviser une équation par $x$ et perdre la solution $x = 0$.",
    "Confondre le signe de $\\Delta$ (nombre de racines) et le signe du trinôme.",
    "Oublier le signe de $a$ dans un tableau de signes : avec $a < 0$, tout s'inverse.",
    "Décaler $f(x - 3)$ vers la gauche : c'est vers la **droite**.",
    "Inclure les racines dans la solution d'une inéquation stricte (ou les exclure d'une inéquation large)."
  ]
};
