/*
  CHAPITRE : Première spécialité — Suites numériques
  ---------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce). Dans les formules, la virgule décimale s'écrit {,} : $0{,}35$.
  video : vidéo d'aide affichée sous une notion (cours de ta chaîne, sinon vidéo d'Yvan Monka citée dans le dossier élève).
  videos : exercices corrigés en vidéo (playlist de la chaîne), avec le numéro de l'exercice du dossier élève.
  Le corrigé détaillé du Drive est réservé au professeur : il n'est pas lié ici.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["premiere-suites"] = {
  niveau: "Première spécialité",
  numero: 1,
  titre: "Suites numériques",
  accroche: "Calculer des termes, reconnaître une suite arithmétique ou géométrique, étudier ses variations et chercher un seuil, avec le lagon propre en fil rouge.",

  playlist: "https://www.youtube.com/playlist?list=PLUTXHp2G5xZ4",
  drive: "https://drive.google.com/drive/folders/1Ymru1W2dLIhiEgpawEdchTrVvaK8Q3n6",
  pdfs: [
    {
      titre: "Dossier élève : cours, méthodes et exercices",
      url: "https://drive.google.com/file/d/1ccZ0rwB10ZQr00MtVd9k_bBGR2KYtK44/view"
    }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Qu'est-ce qu'une suite ?",
      texte:
        "Une **suite** $(u_n)$ associe à chaque entier naturel $n$ un nombre $u_n$, appelé **terme de rang $n$**.\n\n" +
        "- **Formule explicite** : $u_n$ s'exprime directement en fonction de $n$, par exemple $u_n = 3n^2 - 1$. On calcule n'importe quel terme d'un coup.\n" +
        "- **Relation de récurrence** : on donne le premier terme et le moyen de passer d'un terme au suivant, par exemple $u_0 = 5$ et $u_{n+1} = 2u_n - 3$. On calcule les termes **de proche en proche**.\n\n" +
        "Attention à ne pas confondre $u_{n+1}$ (le terme suivant) et $u_n + 1$ (le terme plus un).",
      video: { titre: "Vidéo de ton prof : notion de suite, formule explicite et récurrence (cours 1/6)", youtube: "https://youtu.be/sVkYEQQWvDo" },
      exemple: {
        enonce: "On définit $u_0 = 5$ et $u_{n+1} = 2u_n - 3$. Calcule $u_1$, $u_2$ et $u_3$.",
        solution: "$u_1 = 2 \\times 5 - 3 = 7$, $u_2 = 2 \\times 7 - 3 = 11$, $u_3 = 2 \\times 11 - 3 = 19$."
      }
    },
    {
      titre: "Représentation et sens de variation",
      texte:
        "On représente une suite par le **nuage de points** de coordonnées $(n\\,;u_n)$ : on ne relie pas les points.\n\n" +
        "- $(u_n)$ est **croissante** si $u_{n+1} \\geqslant u_n$ pour tout $n$, **décroissante** si $u_{n+1} \\leqslant u_n$.\n" +
        "- Méthode : on étudie le **signe de $u_{n+1} - u_n$**.\n" +
        "- Si $u_n = f(n)$ et que $f$ est monotone sur $[0\\,;+\\infty[$, la suite a le même sens de variation que $f$.",
      figure: "suite-nuage",
      video: { titre: "Vidéo de ton prof : sens de variation d'une suite, trois méthodes (cours 2/6)", youtube: "https://youtu.be/jpI-dQAsU24" },
      exemple: {
        enonce: "Étudie le sens de variation de $u_n = n^2 - 4n$ à partir du rang $2$.",
        solution: "$u_{n+1} - u_n = (n+1)^2 - 4(n+1) - n^2 + 4n = 2n - 3$. Pour $n \\geqslant 2$, $2n - 3 > 0$ : la suite est croissante à partir du rang $2$, comme on le voit sur le nuage."
      }
    },
    {
      titre: "Suites arithmétiques",
      texte:
        "$(u_n)$ est **arithmétique** de raison $r$ si l'on passe d'un terme au suivant en **ajoutant** toujours $r$ : $u_{n+1} = u_n + r$.\n\n" +
        "- Terme général : $u_n = u_0 + nr$, ou $u_n = u_p + (n - p)r$.\n" +
        "- Elle est croissante si $r > 0$, décroissante si $r < 0$.\n" +
        "- Ses points sont **alignés** : c'est l'équivalent discret d'une fonction affine.\n" +
        "- Pour la reconnaître : on vérifie que $u_{n+1} - u_n$ est constant.",
      video: { titre: "Vidéo de ton prof : suites arithmétiques, raison et terme général (cours 3/6)", youtube: "https://youtu.be/nFBjpbUaTrM" },
      exemple: {
        enonce: "Un club de plongée ramasse $40$ kg de déchets la première semaine, puis $6$ kg de plus chaque semaine. On note $u_1 = 40$. Combien ramasse-t-il la semaine $10$ ?",
        solution: "$(u_n)$ est arithmétique de raison $6$ : $u_{10} = u_1 + 9 \\times 6 = 40 + 54 = 94$ kg."
      }
    },
    {
      titre: "Suites géométriques",
      texte:
        "$(u_n)$ est **géométrique** de raison $q$ si l'on passe d'un terme au suivant en **multipliant** toujours par $q$ : $u_{n+1} = q \\times u_n$.\n\n" +
        "- Terme général : $u_n = u_0 \\times q^n$, ou $u_n = u_p \\times q^{n-p}$.\n" +
        "- Une évolution de $t\\,\\%$ à chaque étape donne une suite géométrique de raison $q = 1 + \\dfrac{t}{100}$.\n" +
        "- Avec $u_0 > 0$ : croissante si $q > 1$, décroissante si $0 < q < 1$. Si $q < 0$, elle n'est pas monotone.\n" +
        "- Pour la reconnaître : on vérifie que $\\dfrac{u_{n+1}}{u_n}$ est constant.",
      video: { titre: "Vidéo de ton prof : suites géométriques, raison et terme général (cours 4/6)", youtube: "https://youtu.be/Nx56kUnM1oI" },
      exemple: {
        enonce: "Grâce aux campagnes de nettoyage, la masse de plastique sur une plage diminue de $15\\,\\%$ par an. Elle est de $800$ kg en 2026. Exprime $u_n$, la masse $n$ années après 2026.",
        solution: "Baisser de $15\\,\\%$, c'est multiplier par $0{,}85$ : $u_n = 800 \\times 0{,}85^n$. En 2029 : $u_3 = 800 \\times 0{,}85^3 \\approx 491$ kg."
      }
    },
    {
      titre: "Sommes de termes",
      texte:
        "- **Entiers consécutifs** : $1 + 2 + \\dots + n = \\dfrac{n(n+1)}{2}$.\n" +
        "- **Suite arithmétique** : $S = \\text{nombre de termes} \\times \\dfrac{\\text{premier terme} + \\text{dernier terme}}{2}$.\n" +
        "- **Puissances** ($q \\neq 1$) : $1 + q + q^2 + \\dots + q^n = \\dfrac{1 - q^{n+1}}{1 - q}$.\n" +
        "- **Suite géométrique** : $S = \\text{premier terme} \\times \\dfrac{1 - q^{\\text{nombre de termes}}}{1 - q}$.\n\n" +
        "Compter les termes : de $u_0$ à $u_n$, il y en a $n + 1$.",
      video: { titre: "Vidéo de ton prof : sommes de termes consécutifs (cours 5/6)", youtube: "https://youtu.be/vP3Ts0VRPd4" },
      exemple: {
        enonce: "Le club de plongée de l'exemple précédent ramasse $40$, $46$, $52$… kg. Quelle masse totale en $10$ semaines ?",
        solution: "Dernier terme : $u_{10} = 94$. $S = 10 \\times \\dfrac{40 + 94}{2} = 670$ kg."
      }
    },
    {
      titre: "Comportement à l'infini et seuil",
      texte:
        "Quand $n$ devient très grand, on observe vers quoi vont les termes :\n\n" +
        "- $q^n$ devient aussi grand qu'on veut si $q > 1$ ;\n" +
        "- $q^n$ se rapproche de $0$ si $0 < q < 1$.\n\n" +
        "Pour trouver le **plus petit rang** $n$ à partir duquel $u_n$ dépasse (ou passe sous) un seuil, on utilise le **tableau de valeurs** de la calculatrice ou un **algorithme** avec une boucle « tant que ».",
      video: { titre: "Vidéo d'Yvan Monka : conjecturer la limite d'une suite", youtube: "https://youtu.be/0CC-EqOH92c" },
      exemple: {
        enonce: "Avec $u_n = 800 \\times 0{,}85^n$, à partir de quelle année la masse de plastique passe-t-elle sous $200$ kg ?",
        solution: "À la calculatrice : $u_8 \\approx 218$ et $u_9 \\approx 185$. Le seuil est $n = 9$, soit en **2035**."
      }
    },
    {
      titre: "Programmes Python",
      texte:
        "Trois programmes à savoir lire et compléter, pour la suite $u_0 = 500$ et $u_{n+1} = 0{,}9u_n + 20$.\n\n" +
        "**Calculer le terme** $u_n$ : la boucle « for » répète la ligne $n$ fois.\n\n" +
        "```python\ndef terme(n):\n    u = 500\n    for i in range(n):\n        u = 0.9 * u + 20\n    return u\n```\n\n" +
        "**Calculer la somme** $u_0 + u_1 + \\dots + u_n$ : on part de $s = u_0$ et on ajoute chaque nouveau terme.\n\n" +
        "```python\ndef somme(n):\n    u = 500\n    s = u\n    for i in range(n):\n        u = 0.9 * u + 20\n        s = s + u\n    return s\n```\n\n" +
        "**Chercher un seuil** : le plus petit $n$ tel que $u_n < 300$. La boucle « while » continue **tant que** la condition est vraie.\n\n" +
        "```python\ndef seuil():\n    u = 500\n    n = 0\n    while u >= 300:\n        u = 0.9 * u + 20\n        n = n + 1\n    return n\n```",
      video: { titre: "Vidéo d'Yvan Monka : déterminer un seuil pour une suite avec Python", youtube: "https://youtu.be/vJmpzwhaka8" },
      exemple: {
        enonce: "Que renvoie terme(3) ? Et seuil() ?",
        solution: "terme(3) : la boucle tourne $3$ fois. $u$ vaut $470$, puis $443$, puis $418{,}7$. La fonction renvoie $418{,}7$, c'est $u_3$.\n\nseuil() : $u_{10} \\approx 304{,}6$ et $u_{11} \\approx 294{,}1$. La boucle s'arrête quand $u < 300$, après $11$ passages : seuil() renvoie $11$."
      }
    },
    {
      titre: "Démonstrations à connaître",
      texte:
        "**Somme des entiers.** Soit $S = 1 + 2 + \\dots + n$. On l'écrit aussi à l'envers : $S = n + (n - 1) + \\dots + 1$. En additionnant les deux lignes terme à terme, chaque colonne vaut $n + 1$, et il y a $n$ colonnes : $2S = n(n + 1)$, donc $S = \\dfrac{n(n + 1)}{2}$.\n\n" +
        "**Somme des puissances** ($q \\neq 1$). Soit $S = 1 + q + q^2 + \\dots + q^n$. On multiplie par $q$ : $qS = q + q^2 + \\dots + q^n + q^{n+1}$. En soustrayant, tous les termes du milieu disparaissent : $S - qS = 1 - q^{n+1}$, soit $(1 - q)S = 1 - q^{n+1}$. Comme $q \\neq 1$, on divise par $1 - q$ : $S = \\dfrac{1 - q^{n+1}}{1 - q}$.\n\n" +
        "**Terme général.** Suite arithmétique : de $u_0$ à $u_n$, on ajoute $n$ fois la raison, donc $u_n = u_0 + nr$. Suite géométrique : on multiplie $n$ fois par $q$, donc $u_n = u_0 \\times q^n$.",
      video: { titre: "Vidéo d'Yvan Monka : démonstration de la somme des termes d'une suite géométrique", youtube: "https://youtu.be/7msY7aEe084" },
      exemple: {
        enonce: "Calculer $1 + 2 + \\dots + 100$, puis $1 + 2 + 2^2 + \\dots + 2^{10}$.",
        solution: "$1 + 2 + \\dots + 100 = \\dfrac{100 \\times 101}{2} = 5\\,050$.\n\n$1 + 2 + \\dots + 2^{10} = \\dfrac{1 - 2^{11}}{1 - 2} = \\dfrac{1 - 2\\,048}{-1} = 2\\,047$."
      }
    }
  ],

  videosNote: "Énoncés dans le dossier élève ci-dessus (numéros des exercices du dossier).",
  videos: [
    { titre: "Exercice 1 · Calculer des termes avec une formule explicite", type: "Notion de suite", youtube: "https://youtu.be/fDxBIGzwXzc" },
    { titre: "Exercice 4 · Un motif d'allumettes : récurrence et formule", type: "Notion de suite", youtube: "https://youtu.be/8xREkcpiSrg" },
    { titre: "Exercice 6 · Représenter, conjecturer, puis démontrer", type: "Sens de variation", youtube: "https://youtu.be/sY5T06fwq1E" },
    { titre: "Exercice 11 · Calculer avec le terme général", type: "Arithmétique", youtube: "https://youtu.be/lcNbml_x86s" },
    { titre: "Exercice 13 · Croissance linéaire : la mangrove", type: "Arithmétique", youtube: "https://youtu.be/1UcA3wiJL4w" },
    { titre: "Exercice 17 · Évolution à taux constant : la valeur d'un scooter", type: "Géométrique", youtube: "https://youtu.be/l5z9ZUXsDFA" },
    { titre: "Exercice 18 · Une suite auxiliaire : la plage", type: "Géométrique", youtube: "https://youtu.be/9a9eqhi2VxE" },
    { titre: "Exercice 20 · Calculer des sommes : Gauss et puissances", type: "Sommes", youtube: "https://youtu.be/HvTkzP61KcI" },
    { titre: "Exercice 22 · Les gradins du stade : somme et seuil", type: "Sommes", youtube: "https://youtu.be/-cmCL0ZkKzo" }
  ],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "suite-explicite", titre: "Calculer un terme (formule explicite)", etape: "Généralités", nb: 5 },
    { type: "suite-recurrence", titre: "Calculer un terme (récurrence)", etape: "Généralités", nb: 5 },
    { type: "suite-arithmetique", titre: "Suites arithmétiques", etape: "Arithmétique et géométrique", nb: 5 },
    { type: "suite-geometrique", titre: "Suites géométriques", etape: "Arithmétique et géométrique", nb: 5 },
    { type: "suite-nature", titre: "Arithmétique, géométrique ou ni l'un ni l'autre ?", etape: "Arithmétique et géométrique", nb: 5 },
    { type: "suite-variation", titre: "Sens de variation", etape: "Variations et limites", nb: 5 },
    { type: "suite-python", titre: "Que renvoie ce programme Python ?", etape: "Algorithmique", nb: 5 },
    { type: "suite-somme", titre: "Sommes de termes", etape: "Défi", nb: 4 },
    { type: "suite-seuil", titre: "Chercher un seuil", etape: "Défi", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    {
      question: "$u_n = n^2 - 3n$. Combien vaut $u_4$ ?",
      choix: ["$4$", "$-4$", "$28$", "$13$"],
      bonne: 0,
      explication: "$u_4 = 4^2 - 3 \\times 4 = 16 - 12 = 4$."
    },
    {
      question: "$u_0 = 2$ et $u_{n+1} = 3u_n - 1$. Combien vaut $u_2$ ?",
      choix: ["$5$", "$14$", "$17$", "$8$"],
      bonne: 1,
      explication: "$u_1 = 3 \\times 2 - 1 = 5$, puis $u_2 = 3 \\times 5 - 1 = 14$."
    },
    {
      question: "Pour une suite $(u_n)$, que désigne $u_{n+1}$ ?",
      choix: ["Le terme $u_n$ augmenté de $1$", "Le terme qui suit $u_n$", "Le rang du terme suivant", "Le produit de $u_n$ par $n + 1$"],
      bonne: 1,
      explication: "$u_{n+1}$ est le terme de rang $n + 1$, c'est-à-dire le suivant. À ne pas confondre avec $u_n + 1$."
    },
    {
      question: "$(u_n)$ est arithmétique, $u_0 = 7$ et $r = -2$. Combien vaut $u_{20}$ ?",
      choix: ["$-33$", "$47$", "$-35$", "$-40$"],
      bonne: 0,
      explication: "$u_{20} = 7 + 20 \\times (-2) = 7 - 40 = -33$."
    },
    {
      question: "$(u_n)$ est arithmétique avec $u_3 = 11$ et $u_7 = 23$. Quelle est sa raison ?",
      choix: ["$12$", "$4$", "$3$", "$\\dfrac{23}{11}$"],
      bonne: 2,
      explication: "$r = \\dfrac{23 - 11}{7 - 3} = \\dfrac{12}{4} = 3$."
    },
    {
      question: "Une population augmente de $4\\,\\%$ par an. Quelle est la raison de la suite géométrique associée ?",
      choix: ["$4$", "$0{,}04$", "$1{,}4$", "$1{,}04$"],
      bonne: 3,
      explication: "Augmenter de $4\\,\\%$, c'est multiplier par $1 + 0{,}04 = 1{,}04$."
    },
    {
      question: "$(u_n)$ est géométrique, $u_0 = 3$ et $q = 2$. Quelle est la formule de $u_n$ ?",
      choix: ["$u_n = 3 + 2n$", "$u_n = 6^n$", "$u_n = 3 \\times 2^n$", "$u_n = 2 \\times 3^n$"],
      bonne: 2,
      explication: "Terme général : $u_n = u_0 \\times q^n = 3 \\times 2^n$. Seule la raison est à la puissance $n$."
    },
    {
      question: "Les termes $2 ; 6 ; 18 ; 54$ peuvent être ceux d'une suite…",
      choix: ["arithmétique de raison $4$", "géométrique de raison $3$", "géométrique de raison $4$", "ni arithmétique ni géométrique"],
      bonne: 1,
      explication: "Les quotients valent tous $3$ ($6 \\div 2 = 18 \\div 6 = 54 \\div 18 = 3$), alors que les différences ($4$, $12$, $36$) ne sont pas constantes."
    },
    {
      question: "$u_n = -5 \\times 0{,}8^n$. Quel est le sens de variation de $(u_n)$ ?",
      choix: ["Croissante", "Décroissante", "Ni l'un ni l'autre", "Constante"],
      bonne: 0,
      explication: "$0 < 0{,}8 < 1$ donc $0{,}8^n$ diminue ; multiplié par $-5$ (négatif), le sens s'inverse : $(u_n)$ est croissante."
    },
    {
      question: "On sait que $u_{n+1} - u_n = -n^2 - 1$ pour tout $n$. Que peut-on dire de $(u_n)$ ?",
      choix: ["Elle est croissante", "Elle est décroissante", "Elle est arithmétique", "On ne peut pas conclure"],
      bonne: 1,
      explication: "$-n^2 - 1 < 0$ pour tout $n$, donc $u_{n+1} < u_n$ : la suite est décroissante."
    },
    {
      question: "Combien vaut $1 + 2 + 3 + \\dots + 40$ ?",
      choix: ["$800$", "$820$", "$1\\,600$", "$780$"],
      bonne: 1,
      explication: "$\\dfrac{40 \\times 41}{2} = 820$."
    },
    {
      question: "Combien de termes compte la somme $u_0 + u_1 + \\dots + u_{15}$ ?",
      choix: ["$14$", "$15$", "$16$", "$17$"],
      bonne: 2,
      explication: "De $0$ à $15$, il y a $15 + 1 = 16$ termes."
    },
    {
      question: "Combien vaut $1 + 2 + 2^2 + \\dots + 2^7$ ?",
      choix: ["$127$", "$128$", "$255$", "$256$"],
      bonne: 2,
      explication: "$\\dfrac{1 - 2^8}{1 - 2} = \\dfrac{-255}{-1} = 255$ (il y a $8$ termes, donc l'exposant est $8$)."
    },
    {
      question: "$u_n = 1\\,000 \\times 0{,}5^n$. Quand $n$ devient très grand, $u_n$…",
      choix: ["devient très grand", "se rapproche de $0$", "se rapproche de $500$", "se rapproche de $1\\,000$"],
      bonne: 1,
      explication: "$0 < 0{,}5 < 1$ donc $0{,}5^n$ se rapproche de $0$, et $u_n$ aussi."
    },
    {
      question: "$u_n = 100 \\times 2^n$. Quel est le plus petit $n$ tel que $u_n > 1\\,000$ ?",
      choix: ["$3$", "$4$", "$5$", "$10$"],
      bonne: 1,
      explication: "$u_3 = 800 \\leqslant 1\\,000$ et $u_4 = 1\\,600 > 1\\,000$ : le seuil est $n = 4$."
    },
    {
      question: "En Python, combien de fois la boucle « for i in range(5): » est-elle répétée ?",
      choix: ["$4$ fois", "$5$ fois", "$6$ fois", "Tant que $i < 5$, sans fin"],
      bonne: 1,
      explication: "« range(5) » donne $0$, $1$, $2$, $3$, $4$ : cinq passages."
    },
    {
      question: "Pour démontrer que $1 + q + \\dots + q^n = \\dfrac{1 - q^{n+1}}{1 - q}$, on calcule :",
      choix: ["$S - qS$", "$S + qS$", "$S \\times S$", "$2S$"],
      bonne: 0,
      explication: "$S - qS = 1 - q^{n+1}$ : tous les termes du milieu se simplifient. On écrit $S + S$ à l'envers pour la somme $1 + 2 + \\dots + n$."
    }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer des termes",
      etapes: [
        "Repérer le type de définition : formule explicite ($u_n$ en fonction de $n$) ou récurrence ($u_{n+1}$ en fonction de $u_n$).",
        "Explicite : remplacer $n$ par la valeur voulue, avec des parenthèses autour des nombres négatifs.",
        "Récurrence : partir du premier terme et calculer chaque terme à partir du précédent, dans l'ordre."
      ],
      exemple: "$u_0 = 4$, $u_{n+1} = \\dfrac{1}{2}u_n + 1$ : $u_1 = 3$, $u_2 = 2{,}5$, $u_3 = 2{,}25$."
    },
    {
      titre: "Montrer qu'une suite est arithmétique ou géométrique",
      etapes: [
        "Arithmétique : calculer $u_{n+1} - u_n$ et montrer que le résultat ne dépend pas de $n$ ; c'est la raison $r$.",
        "Géométrique : écrire $u_{n+1}$ sous la forme $q \\times u_n$ (ou montrer que $\\dfrac{u_{n+1}}{u_n}$ est constant).",
        "Pour montrer qu'une suite **n'est pas** arithmétique (ou géométrique), un contre-exemple sur les trois premiers termes suffit."
      ],
      exemple: "$u_n = 5 - 3n$ : $u_{n+1} - u_n = 5 - 3(n+1) - 5 + 3n = -3$. Arithmétique de raison $-3$."
    },
    {
      titre: "Étudier le sens de variation",
      etapes: [
        "Si la suite est arithmétique : signe de $r$. Si elle est géométrique : position de $q$ par rapport à $1$, et signe de $u_0$.",
        "Sinon, calculer et simplifier $u_{n+1} - u_n$.",
        "Étudier son signe pour tout $n \\in \\mathbb{N}$ et conclure."
      ],
      exemple: "$u_n = n^2 + n$ : $u_{n+1} - u_n = 2n + 2 > 0$, donc $(u_n)$ est croissante."
    },
    {
      titre: "Calculer une somme de termes",
      etapes: [
        "Reconnaître la nature de la suite et sa raison.",
        "Compter les termes : de $u_p$ à $u_n$, il y en a $n - p + 1$.",
        "Arithmétique : nombre de termes $\\times \\dfrac{\\text{premier} + \\text{dernier}}{2}$. Géométrique : premier $\\times \\dfrac{1 - q^{\\text{nb termes}}}{1 - q}$."
      ],
      exemple: "$3 + 6 + 12 + \\dots + 3 \\times 2^9$ : $10$ termes, $S = 3 \\times \\dfrac{1 - 2^{10}}{1 - 2} = 3\\,069$."
    },
    {
      titre: "Déterminer un seuil",
      etapes: [
        "Vérifier le sens de variation de la suite, pour savoir qu'une fois le seuil franchi, il le reste.",
        "Calculatrice : mode Suite, puis tableau de valeurs, et lire les deux termes qui encadrent le seuil.",
        "Ou algorithme : tant que $u \\leqslant A$, faire $n \\leftarrow n + 1$ et $u \\leftarrow q \\times u$ ; la valeur finale de $n$ est le seuil.",
        "Conclure dans le contexte (année, semaine…)."
      ],
      exemple: "$u_n = 50 \\times 1{,}2^n > 200$ : $u_7 \\approx 179$ et $u_8 \\approx 215$, donc $n = 8$."
    },
    {
      titre: "Lire un programme Python",
      etapes: [
        "Repérer les variables et leur valeur de départ.",
        "Faire un tableau : une colonne par variable, une ligne par passage dans la boucle.",
        "« for i in range(n) » : exactement $n$ passages. « while condition » : on continue tant que la condition est vraie.",
        "La fonction renvoie la variable écrite après « return »."
      ],
      exemple: "$u = 3$, puis « u = 2 * u » tant que $u < 100$ : $3$, $6$, $12$, $24$, $48$, $96$, $192$. Six passages : le seuil est $n = 6$."
    }
  ],
  erreurs: [
    "Confondre $u_{n+1}$ (le terme suivant) et $u_n + 1$.",
    "Oublier qu'une suite commençant à $u_1$ a pour terme général $u_n = u_1 + (n - 1)r$, et non $u_1 + nr$.",
    "Écrire $(u_0 \\times q)^n$ au lieu de $u_0 \\times q^n$ : seule la raison est à la puissance.",
    "Prendre le taux pour la raison : une hausse de $5\\,\\%$ donne $q = 1{,}05$, pas $0{,}05$.",
    "Conclure qu'une suite est arithmétique en vérifiant seulement les deux premières différences.",
    "Se tromper dans le nombre de termes d'une somme : de $u_0$ à $u_n$, il y en a $n + 1$.",
    "Relier les points du nuage d'une suite comme pour une courbe de fonction.",
    "Dans un programme de seuil, renvoyer $u$ au lieu de $n$ : la question porte sur le rang."
  ]
};
