/*
  CHAPITRE : Première spécialité — Suites arithmétiques
  ------------------------------------------------------
  Chapitre 3 de la progression spiralée 2026-2027 (programme de Première 2026).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Vidéos : playlist « 1SPE – Suites numériques » de la chaîne d'abord, Yvan Monka en complément.
  Figure : "suite-arith". Générateurs : suite-arithmetique et su- (su-arith-…, su-somme-entiers).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["premiere-suites-arithmetiques"] = {
  niveau: "Première spécialité",
  numero: 3,
  titre: "Suites arithmétiques",
  accroche: "Ajouter toujours la même quantité : l'épargne pour le permis, la mangrove qui avance, les gradins du stade. Terme général, sens de variation et somme de Gauss.",

  playlist: "https://www.youtube.com/playlist?list=PLUTXHp2G5xZ4",
  drive: "https://drive.google.com/drive/folders/1Ymru1W2dLIhiEgpawEdchTrVvaK8Q3n6",
  pdfs: [
    {
      titre: "Dossier élève : cours, méthodes et exercices (chapitres 1, 3 et 6)",
      url: "https://drive.google.com/file/d/1ccZ0rwB10ZQr00MtVd9k_bBGR2KYtK44/view"
    }
  ],
  liens: [
    { titre: "Le cours sur les suites arithmétiques et géométriques en vidéo (Yvan Monka)", url: "https://youtu.be/05UHsy9G4M4", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Définition et terme général",
      video: { titre: "Vidéo de ton prof : suites arithmétiques, raison et terme général (cours 3/6)", youtube: "https://youtu.be/nFBjpbUaTrM" },
      texte:
        "$(u_n)$ est **arithmétique** de raison $r$ si l'on passe d'un terme au suivant en **ajoutant** toujours $r$ : pour tout $n$, $u_{n+1} = u_n + r$.\n\n" +
        "- **Terme général** : $u_n = u_0 + nr$, et plus généralement $u_n = u_p + (n - p)r$.\n" +
        "- Si la suite commence à $u_1$ : $u_n = u_1 + (n - 1)r$.\n\n" +
        "**Condition nécessaire et suffisante** : $(u_n)$ est arithmétique **si et seulement si** $u_{n+1} - u_n$ est constant (ne dépend pas de $n$).",
      exemple: {
        enonce: "Un club de plongée ramasse $40$ kg de déchets la première semaine, puis $6$ kg de plus chaque semaine ($u_1 = 40$). Combien la semaine $10$ ?",
        solution: "$(u_n)$ est arithmétique de raison $6$ : $u_{10} = u_1 + 9 \\times 6 = 40 + 54 = 94$ kg."
      }
    },
    {
      titre: "Démonstration : le terme général",
      video: { titre: "Vidéo d'Yvan Monka : démontrer le terme général d'une suite arithmétique", youtube: "https://youtu.be/Jn4_xM_ZJD0" },
      texte:
        "**Propriété** : si $(u_n)$ est arithmétique de raison $r$, alors $u_n = u_0 + nr$ pour tout $n$.\n\n" +
        "**Démonstration**. On écrit les égalités $u_{k+1} - u_k = r$ pour $k$ allant de $0$ à $n - 1$ :\n\n" +
        "$u_1 - u_0 = r$, $u_2 - u_1 = r$, …, $u_n - u_{n-1} = r$.\n\n" +
        "En additionnant ces $n$ égalités, les termes intermédiaires s'éliminent deux à deux (somme « télescopique ») : $u_n - u_0 = nr$, donc $u_n = u_0 + nr$.",
      exemple: {
        enonce: "$(u_n)$ est arithmétique avec $u_3 = 11$ et $u_7 = 23$. Trouver $r$ et $u_0$.",
        solution: "$u_7 = u_3 + 4r$, donc $23 = 11 + 4r$ et $r = 3$. Puis $u_0 = u_3 - 3r = 11 - 9 = 2$."
      }
    },
    {
      titre: "Lien avec les fonctions affines, sens de variation",
      figure: "suite-arith",
      video: { titre: "Vidéo de ton prof : croissance linéaire, la mangrove (exercice corrigé)", youtube: "https://youtu.be/1UcA3wiJL4w" },
      texte:
        "$u_n = u_0 + nr$ est de la forme $f(n)$ avec $f(x) = rx + u_0$ : une **fonction affine**. Les points $(n\\,;u_n)$ sont **alignés** sur une droite de coefficient directeur $r$.\n\n" +
        "- $r > 0$ : la suite est **croissante** ; $r < 0$ : **décroissante** ; $r = 0$ : constante.\n" +
        "- Une évolution à **accroissements constants** (on ajoute toujours la même quantité) est une croissance **linéaire** : elle se modélise par une suite arithmétique.",
      exemple: {
        enonce: "Une mangrove avance de $12$ m par an sur la vase ; elle est à $250$ m du rivage en 2026. Où sera-t-elle en 2040 ?",
        solution: "$u_n = 250 + 12n$ (avec $n$ années après 2026). En 2040, $n = 14$ : $u_{14} = 250 + 168 = 418$ m."
      }
    },
    {
      titre: "Somme $1 + 2 + \\dots + n$",
      video: { titre: "Vidéo de ton prof : sommes de termes consécutifs (cours 5/6)", youtube: "https://youtu.be/vP3Ts0VRPd4" },
      texte:
        "**Propriété** : $1 + 2 + \\dots + n = \\dfrac{n(n + 1)}{2}$.\n\n" +
        "**Démonstration** (Gauss). Soit $S = 1 + 2 + \\dots + n$. On l'écrit aussi à l'envers : $S = n + (n - 1) + \\dots + 1$. En additionnant les deux lignes terme à terme, chaque colonne vaut $n + 1$, et il y a $n$ colonnes : $2S = n(n + 1)$, donc $S = \\dfrac{n(n + 1)}{2}$.\n\n" +
        "Plus généralement, pour des termes consécutifs d'une suite arithmétique :\n\n" +
        "$S = \\text{nombre de termes} \\times \\dfrac{\\text{premier terme} + \\text{dernier terme}}{2}$.\n\n" +
        "Compter les termes : de $u_p$ à $u_n$, il y en a $n - p + 1$.",
      exemple: {
        enonce: "Calculer $1 + 2 + \\dots + 100$, puis $40 + 46 + 52 + \\dots + 94$.",
        solution: "$\\dfrac{100 \\times 101}{2} = 5\\,050$.\n\nRaison $6$, de $40$ à $94$ : $\\dfrac{94 - 40}{6} + 1 = 10$ termes. $S = 10 \\times \\dfrac{40 + 94}{2} = 670$."
      }
    },
    {
      titre: "Python : sommes et factorielle",
      video: { titre: "Vidéo d'Yvan Monka : calculer la somme des termes d'une suite avec Python", youtube: "https://youtu.be/_3bwycUCtmg" },
      texte:
        "Pour additionner les termes, on garde une variable $\\texttt{s}$ qui s'accumule à chaque tour :\n\n" +
        "```python\ndef somme(n):\n    u = 40\n    s = u\n    for i in range(n):\n        u = u + 6\n        s = s + u\n    return s\n```\n\n" +
        "Même idée avec un produit : la **factorielle** $n! = 1 \\times 2 \\times \\dots \\times n$.\n\n" +
        "```python\ndef factorielle(n):\n    p = 1\n    for i in range(1, n + 1):\n        p = p * i\n    return p\n```",
      exemple: {
        enonce: "Que renvoient $\\texttt{somme(9)}$ et $\\texttt{factorielle(5)}$ ?",
        solution: "$\\texttt{somme(9)}$ additionne $u_0$ à $u_9$ : $10$ termes de $40$ à $94$, soit $670$.\n\n$\\texttt{factorielle(5)} = 1 \\times 2 \\times 3 \\times 4 \\times 5 = 120$."
      }
    }
  ],

  videosNote: "Énoncés dans le dossier élève ci-dessus (numéros des exercices du dossier).",
  videos: [
    { titre: "Exercice 11 · Calculer avec le terme général", type: "Terme général", youtube: "https://youtu.be/lcNbml_x86s" },
    { titre: "Exercice 13 · Croissance linéaire : la mangrove", type: "Modéliser", youtube: "https://youtu.be/1UcA3wiJL4w" },
    { titre: "Exercice 20 · Calculer des sommes : Gauss et puissances", type: "Sommes", youtube: "https://youtu.be/HvTkzP61KcI" },
    { titre: "Exercice 22 · Les gradins du stade : somme et seuil", type: "Sommes", youtube: "https://youtu.be/-cmCL0ZkKzo" }
  ],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "suite-arithmetique", titre: "Terme général, raison", etape: "Terme général", nb: 5 },
    { type: "su-arith-reconnaitre", titre: "Arithmétique ou pas ?", etape: "Terme général", nb: 5 },
    { type: "su-arith-modele", titre: "L'épargne pour le permis", etape: "Modéliser", nb: 4 },
    { type: "su-somme-entiers", titre: "Sommes de termes consécutifs", etape: "Sommes", nb: 5 },
    { type: "su-arith-python", titre: "Python : somme et factorielle", etape: "Sommes", nb: 3 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
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
      question: "Une suite commence à $u_1 = 5$, de raison $4$. Son terme général est :",
      choix: ["$u_n = 5 + 4(n - 1)$", "$u_n = 5 + 4n$", "$u_n = 4 + 5n$", "$u_n = 5 \\times 4^{n-1}$"],
      bonne: 0,
      explication: "À partir de $u_1$, on ajoute la raison $n - 1$ fois pour arriver à $u_n$."
    },
    {
      question: "$(u_n)$ est arithmétique si et seulement si :",
      choix: ["$u_{n+1} - u_n$ est constant", "$\\dfrac{u_{n+1}}{u_n}$ est constant", "$u_n$ est positif", "$u_{n+1} > u_n$"],
      bonne: 0,
      explication: "C'est la condition nécessaire et suffisante. Le quotient constant caractérise les suites géométriques."
    },
    {
      question: "La suite $u_n = 3 - 5n$ est :",
      choix: ["arithmétique de raison $-5$, décroissante", "arithmétique de raison $3$, croissante", "arithmétique de raison $5$", "pas arithmétique"],
      bonne: 0,
      explication: "$u_{n+1} - u_n = -5$ : raison $-5 < 0$, donc décroissante."
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
      question: "Les points $(n\\,;u_n)$ d'une suite arithmétique sont :",
      choix: ["alignés", "sur une parabole", "de plus en plus espacés", "toujours au-dessus de l'axe"],
      bonne: 0,
      explication: "$u_n = u_0 + nr$ est une fonction affine de $n$."
    },
    {
      question: "Pour démontrer $1 + 2 + \\dots + n = \\dfrac{n(n + 1)}{2}$, on :",
      choix: ["écrit la somme à l'endroit et à l'envers, puis on additionne", "multiplie la somme par $n$", "calcule $S - nS$", "teste pour $n = 10$"],
      bonne: 0,
      explication: "Chaque colonne vaut $n + 1$, et il y a $n$ colonnes : $2S = n(n + 1)$."
    },
    {
      question: "$\\texttt{factorielle(4)}$ renvoie :",
      choix: ["$24$", "$10$", "$16$", "$4$"],
      bonne: 0,
      explication: "$4! = 1 \\times 2 \\times 3 \\times 4 = 24$."
    },
    { question: "Laquelle de ces suites est arithmétique ?", choix: ["$u_n = 4n - 7$", "$u_n = n^2 + 1$", "$u_n = 3 \\times 2^n$", "$u_n = \\dfrac{1}{n + 1}$"], bonne: 0, explication: "$u_{n+1} - u_n = 4(n + 1) - 7 - (4n - 7) = 4$ : la différence est constante, la raison est $4$." },
    { question: "$u_0 = 12$ et $u_{n+1} = u_n - 3$. Pour tout $n$, $u_n$ est égal à :", choix: ["$12 - 3n$", "$12 \\times (-3)^n$", "$-3 + 12n$", "$12 - 3(n - 1)$"], bonne: 0, explication: "On retire $3$ à chaque étape : suite arithmétique de raison $-3$ et de premier terme $u_0 = 12$, donc $u_n = 12 - 3n$." },
    { question: "$(u_n)$ est arithmétique, avec $u_5 = 20$ et $r = 4$. Combien vaut $u_{12}$ ?", choix: ["$48$", "$68$", "$52$", "$44$"], bonne: 0, explication: "$u_{12} = u_5 + (12 - 5) \\times 4 = 20 + 28 = 48$." },
    { question: "$(u_n)$ est arithmétique, avec $u_4 = 10$ et $r = 2{,}5$. Alors $u_0$ vaut :", choix: ["$0$", "$20$", "$7{,}5$", "$10$"], bonne: 0, explication: "$u_4 = u_0 + 4r$, donc $u_0 = 10 - 4 \\times 2{,}5 = 0$." },
    { question: "$u_0 = 1$, $u_1 = 3$ et $u_2 = 7$. La suite $(u_n)$ :", choix: ["n'est pas arithmétique, car $u_1 - u_0 \\neq u_2 - u_1$", "est arithmétique de raison $2$", "est arithmétique de raison $3$", "est arithmétique, puisqu'elle est croissante"], bonne: 0, explication: "$u_1 - u_0 = 2$ mais $u_2 - u_1 = 4$ : la différence n'est pas constante. Ce contre-exemple suffit." },
    { question: "Pour son permis, Anli a $300$ € et met $45$ € de côté chaque mois. Après $n$ mois, il a (en €) :", choix: ["$300 + 45n$", "$300 \\times 45^n$", "$45 + 300n$", "$300 \\times 1{,}45^n$"], bonne: 0, explication: "On ajoute toujours $45$ € : suite arithmétique de premier terme $300$ et de raison $45$." },
    { question: "Anli a $300$ € et met $45$ € de côté chaque mois. Au bout de combien de mois aura-t-il exactement $1\\,200$ € ?", choix: ["$20$ mois", "$27$ mois", "$26$ mois", "$30$ mois"], bonne: 0, explication: "$300 + 45n = 1\\,200 \\iff 45n = 900 \\iff n = 20$. ($27$ mois oublie les $300$ € de départ.)" },
    { question: "La suite arithmétique de premier terme $u_0 = -50$ et de raison $0{,}5$ est :", choix: ["croissante", "décroissante", "constante", "négative pour tout $n$"], bonne: 0, explication: "Le sens de variation dépend du signe de la raison, pas du premier terme : $r = 0{,}5 > 0$. Elle devient positive à partir de $n = 101$." },
    { question: "Les points $(n\\,;u_n)$ de la suite $u_n = 7 - 2n$ sont alignés sur une droite de coefficient directeur :", choix: ["$-2$", "$7$", "$2$", "$-\\dfrac{7}{2}$"], bonne: 0, explication: "$u_n = f(n)$ avec $f(x) = -2x + 7$ : le coefficient directeur est la raison $-2$, et $7$ est l'ordonnée à l'origine." },
    { question: "Dans la démonstration de $u_n = u_0 + nr$, on additionne les égalités $u_1 - u_0 = r$, $u_2 - u_1 = r$, …, $u_n - u_{n-1} = r$. Le membre de gauche se simplifie en :", choix: ["$u_n - u_0$", "$u_n + u_0$", "$n \\times u_n$", "$0$"], bonne: 0, explication: "Les termes intermédiaires $u_1$, $u_2$, …, $u_{n-1}$ apparaissent une fois avec $+$ et une fois avec $-$ : il reste $u_n - u_0 = nr$." },
    { question: "Combien vaut $1 + 2 + \\dots + 30$ ?", choix: ["$465$", "$450$", "$930$", "$900$"], bonne: 0, explication: "$\\dfrac{30 \\times 31}{2} = \\dfrac{930}{2} = 465$. ($930$ oublie la division par $2$.)" },
    { question: "Combien de termes compte la somme $u_5 + u_6 + \\dots + u_{20}$ ?", choix: ["$16$", "$15$", "$20$", "$25$"], bonne: 0, explication: "De $u_p$ à $u_n$, il y a $n - p + 1$ termes : $20 - 5 + 1 = 16$." },
    { question: "La somme $5 + 8 + 11 + \\dots + 32$ vaut :", choix: ["$185$", "$370$", "$166{,}5$", "$148$"], bonne: 0, explication: "Raison $3$ : $\\dfrac{32 - 5}{3} + 1 = 10$ termes. $S = 10 \\times \\dfrac{5 + 32}{2} = 185$." },
    { question: "La somme $2 + 4 + 6 + \\dots + 100$ vaut :", choix: ["$2\\,550$", "$5\\,050$", "$2\\,500$", "$5\\,100$"], bonne: 0, explication: "$50$ termes, de $2$ à $100$ : $S = 50 \\times \\dfrac{2 + 100}{2} = 50 \\times 51 = 2\\,550$. C'est aussi $2 \\times (1 + 2 + \\dots + 50) = 2 \\times 1\\,275$." },
    { question: "Avec la fonction $\\texttt{somme}$ du cours ($u_0 = 40$, raison $6$), que renvoie $\\texttt{somme(2)}$ ?", choix: ["$138$", "$86$", "$52$", "$46$"], bonne: 0, explication: "Au départ $\\texttt{s} = 40$ ; la boucle tourne $2$ fois : $\\texttt{u} = 46$ puis $52$, et $\\texttt{s} = 40 + 46 + 52 = 138$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Montrer qu'une suite est arithmétique",
      etapes: [
        "Calculer $u_{n+1} - u_n$ en fonction de $n$ et simplifier.",
        "Si le résultat ne dépend pas de $n$ : la suite est arithmétique, de raison ce résultat.",
        "Pour montrer qu'elle ne l'est pas : un contre-exemple sur les trois premiers termes."
      ],
      exemple: "$u_n = 5 - 3n$ : $u_{n+1} - u_n = -3$. Arithmétique de raison $-3$."
    },
    {
      titre: "Trouver la raison et le premier terme",
      etapes: [
        "Avec deux termes $u_p$ et $u_n$ : $r = \\dfrac{u_n - u_p}{n - p}$.",
        "Puis $u_0 = u_p - pr$.",
        "Écrire le terme général $u_n = u_0 + nr$ et vérifier."
      ],
      exemple: "$u_3 = 11$, $u_7 = 23$ : $r = 3$, $u_0 = 2$, $u_n = 2 + 3n$."
    },
    {
      titre: "Calculer une somme de termes consécutifs",
      etapes: [
        "Repérer le premier et le dernier terme.",
        "Compter les termes : de $u_p$ à $u_n$, il y en a $n - p + 1$.",
        "$S = \\text{nombre de termes} \\times \\dfrac{\\text{premier} + \\text{dernier}}{2}$."
      ],
      exemple: "$3 + 7 + 11 + \\dots + 43$ : $11$ termes, $S = 11 \\times \\dfrac{3 + 43}{2} = 253$."
    }
  ],
  erreurs: [
    "Oublier qu'une suite commençant à $u_1$ a pour terme général $u_1 + (n - 1)r$, et non $u_1 + nr$.",
    "Conclure qu'une suite est arithmétique en vérifiant seulement deux différences.",
    "Se tromper dans le nombre de termes d'une somme : de $u_0$ à $u_n$, il y en a $n + 1$.",
    "Confondre la raison $r$ (ce qu'on ajoute) et le premier terme.",
    "Écrire $\\dfrac{n^2}{2}$ au lieu de $\\dfrac{n(n + 1)}{2}$."
  ]
};
