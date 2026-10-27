/*
  CHAPITRE : Première technologique — Suites numériques
  ------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme 2026 de première technologique, « Analyse », « Suites numériques » : modes de génération, sens de variation,
  représentation graphique (nuage de points (n ; u(n))), modélisation d'une situation ; notation u(n) avant u_n ;
  situations algorithmiques (terme de rang donné, somme, liste de termes, seuil). Les suites arithmétiques et géométriques
  sont au chapitre 6.
  video : vidéos de la chaîne (Première spé, mêmes notions) et d'Yvan Monka. Générateurs : préfixe ys- dans assets/exercices-techno.js ; figures "ys-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["techno-suites"] = {
  niveau: "Première technologique",
  numero: 5,
  titre: "Suites numériques",
  accroche: "Une suite, c'est une liste infinie de nombres numérotés : $u(0)$, $u(1)$, $u(2)$… Formule explicite ou récurrence, nuage de points, sens de variation, et Python pour calculer.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : suites, chapitre 1 (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Suites1TM.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Qu'est-ce qu'une suite ? Deux modes de génération",
      figure: "ys-cours-modes",
      video: { titre: "Vidéo de ton prof : notion de suite, formule explicite et récurrence (cours 1/6)", youtube: "https://youtu.be/sVkYEQQWvDo" },
      texte:
        "Une **suite** $(u(n))$ associe à chaque entier naturel $n$ un nombre $u(n)$, le **terme de rang $n$**. On lit « $u$ de $n$ » ; on note aussi $u_n$.\n\n" +
        "Deux façons de définir une suite :\n\n" +
        "- par une **formule explicite** : $u(n)$ s'exprime directement en fonction de $n$, comme une fonction. Exemple : $u(n) = 3n + 2$, alors $u(4) = 3 \\times 4 + 2 = 14$ ;\n" +
        "- par **récurrence** : on donne le premier terme et une relation entre un terme et le suivant. Exemple : $u(0) = 2$ et $u(n + 1) = u(n) + 3$ : $u(1) = 5$, $u(2) = 8$, $u(3) = 11$… Pour connaître $u(10)$, il faut calculer tous les termes précédents (ou un programme).\n\n" +
        "Un tableur fait ce travail : en colonne A les rangs, en colonne B la formule recopiée vers le bas.",
      exemple: {
        enonce: "$v(0) = 1$ et $v(n + 1) = 2v(n) - 1$. Calcule $v(1)$, $v(2)$, $v(3)$.",
        solution: "$v(1) = 2 \\times 1 - 1 = 1$, $v(2) = 2 \\times 1 - 1 = 1$, $v(3) = 1$ : cette suite est constante !"
      }
    },
    {
      titre: "Calculer des termes",
      video: { titre: "Vidéo d'Yvan Monka : calculer les premiers termes d'une suite", youtube: "https://youtu.be/HacflVQ7DIE" },
      texte:
        "**Formule explicite** : remplacer $n$ par la valeur voulue, en respectant les priorités. Pour $u(n) = n^2 - 4n + 5$ : $u(3) = 9 - 12 + 5 = 2$ et $u(n + 1) = (n + 1)^2 - 4(n + 1) + 5$, qu'on peut développer.\n\n" +
        "**Récurrence** : appliquer la relation au terme précédent, étape par étape. Erreur classique : remplacer $u(n)$ par $n$.\n\n" +
        "À la calculatrice, le mode « suite » (ou la touche de rappel du résultat précédent) enchaîne les termes.",
      exemple: {
        enonce: "$u(n) = 2^n - n$. Calcule $u(0)$, $u(1)$, $u(5)$.",
        solution: "$u(0) = 1 - 0 = 1$, $u(1) = 2 - 1 = 1$, $u(5) = 32 - 5 = 27$."
      }
    },
    {
      titre: "Représenter une suite : le nuage de points",
      figure: "ys-cours-nuage",
      video: { titre: "Vidéo d'Yvan Monka : représenter graphiquement une suite", youtube: "https://youtu.be/VpSK4uLTFhM" },
      texte:
        "On représente une suite par le **nuage de points** de coordonnées $(n\\,;u(n))$ : le rang en abscisse, le terme en ordonnée. **On ne relie pas les points** : la suite n'existe que pour les entiers.\n\n" +
        "La forme du nuage renseigne sur la suite : points alignés pour une croissance linéaire (chapitre 6, suites arithmétiques), points qui montent de plus en plus vite pour une croissance exponentielle (suites géométriques), ou toute autre allure.\n\n" +
        "Sur la figure, $u(n) = n^2 - 4n + 5$ : la suite décroît jusqu'au rang $2$, puis croît.",
      exemple: {
        enonce: "Sur la figure, lis $u(1)$ et $u(5)$.",
        solution: "Le point d'abscisse $1$ a pour ordonnée $2$ et celui d'abscisse $5$ a pour ordonnée $10$ : $u(1) = 2$, $u(5) = 10$."
      }
    },
    {
      titre: "Sens de variation",
      video: { titre: "Vidéo de ton prof : sens de variation d'une suite, trois méthodes (cours 2/6)", youtube: "https://youtu.be/jpI-dQAsU24" },
      texte:
        "Une suite est **croissante** si chaque terme est supérieur ou égal au précédent : $u(n + 1) \\geqslant u(n)$ pour tout $n$. Elle est **décroissante** si $u(n + 1) \\leqslant u(n)$ pour tout $n$.\n\n" +
        "Méthode : étudier le **signe de $u(n + 1) - u(n)$**. Pour $u(n) = 7 - 2n$ : $u(n + 1) - u(n) = 7 - 2(n + 1) - (7 - 2n) = -2 < 0$, la suite est décroissante.\n\n" +
        "Certaines suites ne sont **ni croissantes ni décroissantes** : $u(n) = (-1)^n$ alterne $1$, $-1$, $1$… ; $u(n) = n^2 - 4n + 5$ descend puis remonte. Calculer quelques termes donne une idée, mais seul un calcul sur $n$ quelconque prouve le résultat.",
      exemple: {
        enonce: "Étudie le sens de variation de $u(n) = 4n - 1$.",
        solution: "$u(n + 1) - u(n) = 4(n + 1) - 1 - (4n - 1) = 4 > 0$ : la suite est croissante."
      }
    },
    {
      titre: "Modéliser une situation par une suite",
      figure: "ys-cours-lineaire-expo",
      video: { titre: "Vidéo d'Yvan Monka : résoudre un problème avec une suite", youtube: "https://youtu.be/9Kox2DDd1wI" },
      texte:
        "Beaucoup de situations évoluent **par étapes** (mois, années, générations) : on les modélise par une suite, $u(n)$ étant la valeur à l'étape $n$.\n\n" +
        "- Si on **ajoute** toujours la même quantité (abonnement avec un prix fixe par mois, croissance de $5$ cm par mois), $u(n + 1) = u(n) + b$ : **évolution absolue constante**, croissance **linéaire**, points alignés.\n" +
        "- Si on **multiplie** toujours par le même nombre (capital à $3\\,\\%$ par an, population qui double), $u(n + 1) = q \\times u(n)$ : **évolution relative constante**, croissance **exponentielle**, points de plus en plus espacés.\n\n" +
        "Reconnaître le bon modèle, c'est la question clé du chapitre 6.",
      exemple: {
        enonce: "Un scooter acheté $2\\,400$ € perd $15\\,\\%$ de sa valeur chaque année. Exprime $u(n + 1)$ en fonction de $u(n)$, puis calcule $u(2)$.",
        solution: "Perdre $15\\,\\%$, c'est multiplier par $0{,}85$ : $u(n + 1) = 0{,}85\\,u(n)$ avec $u(0) = 2\\,400$. $u(1) = 2\\,040$ et $u(2) = 1\\,734$ €."
      }
    },
    {
      titre: "Python : termes, somme, seuil",
      video: { titre: "Vidéo d'Yvan Monka : déterminer un seuil avec un algorithme en Python", youtube: "https://youtu.be/vJmpzwhaka8" },
      texte:
        "Pour une suite récurrente $u(0) = 2$, $u(n + 1) = u(n) + 3$ :\n\n" +
        "```python\ndef terme(n):              # u(n)\n    u = 2\n    for k in range(n):\n        u = u + 3\n    return u\n\nL = [2]                    # liste des 10 premiers termes\nfor k in range(9):\n    L.append(L[-1] + 3)\n\ns = 0                      # somme u(0) + … + u(9)\nfor k in range(10):\n    s = s + terme(k)\n\nu, n = 2, 0                # seuil : premier rang où u(n) > 100\nwhile u <= 100:\n    u = u + 3\n    n = n + 1\nprint(n)                   # 33\n```\n\n" +
        "La boucle $\\texttt{while}$ est l'outil du **seuil** : on avance tant que la condition reste vraie, et $\\texttt{n}$ compte les étapes.",
      exemple: {
        enonce: "Que renvoie $\\texttt{terme(4)}$ ?",
        solution: "La boucle ajoute $4$ fois $3$ à partir de $2$ : $\\texttt{terme(4)} = 14$, c'est $u(4)$."
      }
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "ys-termes-explicite", titre: "Calculer un terme avec une formule explicite", etape: "Calculer", nb: 5 },
    { type: "ys-termes-recurrence", titre: "Calculer un terme par récurrence", etape: "Calculer", nb: 5 },
    { type: "ys-modeliser", titre: "Modéliser une situation", etape: "Modéliser", nb: 5 },
    { type: "ys-graphique", titre: "Lire un nuage de points", etape: "Représenter", nb: 5 },
    { type: "ys-variations", titre: "Sens de variation", etape: "Variations", nb: 5 },
    { type: "ys-seuil", titre: "Dépasser un seuil", etape: "Problèmes", nb: 4 },
    { type: "ys-python", titre: "Python : termes, somme, liste, seuil", etape: "Python", nb: 5 },
    { type: "ys-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Si $u(n) = 5n - 3$, alors $u(4)$ vaut :", choix: ["$17$", "$20$", "$2$", "$23$"], bonne: 0, explication: "$5 \\times 4 - 3 = 17$." },
    { question: "Si $u(n) = n^2 + 1$, alors $u(3)$ vaut :", choix: ["$10$", "$7$", "$16$", "$9$"], bonne: 0, explication: "$3^2 + 1 = 10$." },
    { question: "$u(0) = 3$ et $u(n + 1) = u(n) + 4$. Alors $u(3)$ vaut :", choix: ["$15$", "$12$", "$7$", "$16$"], bonne: 0, explication: "$3 \\to 7 \\to 11 \\to 15$." },
    { question: "$u(0) = 1$ et $u(n + 1) = 3u(n)$. Alors $u(2)$ vaut :", choix: ["$9$", "$6$", "$3$", "$27$"], bonne: 0, explication: "$u(1) = 3$, $u(2) = 9$." },
    { question: "$u(1) = 10$ et $u(n + 1) = 2u(n) - 4$. Alors $u(3)$ vaut :", choix: ["$28$", "$16$", "$32$", "$20$"], bonne: 0, explication: "$u(2) = 16$, $u(3) = 28$." },
    { question: "Une suite définie par $u(n + 1) = u(n) - 5$ est définie :", choix: ["par récurrence", "par une formule explicite", "par une fonction affine", "par un tableur"], bonne: 0, explication: "Chaque terme s'obtient à partir du précédent." },
    { question: "Si $u(n) = 2n + 7$, alors $u(n + 1)$ vaut :", choix: ["$2n + 9$", "$2n + 8$", "$2n + 7 + 1$", "$3n + 7$"], bonne: 0, explication: "$2(n + 1) + 7 = 2n + 9$." },
    { question: "Pour $u(n) = 2n + 7$, $u(n + 1) - u(n)$ vaut :", choix: ["$2$", "$7$", "$9$", "$1$"], bonne: 0, explication: "$(2n + 9) - (2n + 7) = 2$." },
    { question: "La suite $u(n) = 9 - 3n$ est :", choix: ["décroissante", "croissante", "constante", "ni croissante ni décroissante"], bonne: 0, explication: "$u(n + 1) - u(n) = -3 < 0$." },
    { question: "La suite $u(n) = (-1)^n \\times 5$ est :", choix: ["ni croissante ni décroissante", "croissante", "décroissante", "constante"], bonne: 0, explication: "Ses termes sont $5$, $-5$, $5$, $-5$…" },
    { question: "La suite $u(n) = n^2 - 6n$ (pour $n \\geqslant 0$) :", choix: ["décroît puis croît", "est croissante", "est décroissante", "est constante"], bonne: 0, explication: "$0, -5, -8, -9, -8, -5, 0, 7, \\dots$" },
    { question: "Le nuage de points d'une suite a pour coordonnées :", choix: ["$(n\\,;u(n))$", "$(u(n)\\,;n)$", "$(n\\,;n)$", "$(u(n)\\,;u(n + 1))$"], bonne: 0, explication: "Rang en abscisse, terme en ordonnée." },
    { question: "Sur le nuage de points d'une suite, on :", choix: ["ne relie pas les points", "relie les points par des segments", "trace une courbe lisse", "ne place que les points pairs"], bonne: 0, explication: "La suite n'est définie que pour les entiers." },
    { question: "Des points alignés sur un nuage indiquent une croissance :", choix: ["linéaire : on ajoute toujours la même quantité", "exponentielle", "nulle", "aléatoire"], bonne: 0, explication: "Même augmentation à chaque rang : les points sont sur une droite." },
    { question: "Une population multipliée par $1{,}2$ chaque année se modélise par :", choix: ["$u(n + 1) = 1{,}2\\,u(n)$", "$u(n + 1) = u(n) + 1{,}2$", "$u(n + 1) = u(n) + 20$", "$u(n) = 1{,}2n$"], bonne: 0, explication: "Évolution relative constante : on multiplie." },
    { question: "Un abonnement de $30$ € puis $12$ € par mois : le total après $n$ mois est :", choix: ["$u(n) = 30 + 12n$", "$u(n) = 30n + 12$", "$u(n) = 42n$", "$u(n) = 30 \\times 12^n$"], bonne: 0, explication: "On ajoute $12$ € chaque mois au $30$ € de départ." },
    { question: "Dans le programme $\\texttt{u = 2}$ ; $\\texttt{for k in range(3): u = u + 5}$, la valeur finale de $\\texttt{u}$ est :", choix: ["$17$", "$12$", "$22$", "$7$"], bonne: 0, explication: "Trois tours : $2 + 3 \\times 5 = 17$." },
    { question: "La boucle $\\texttt{while u <= 100:}$ s'arrête :", choix: ["dès que $u > 100$", "dès que $u \\geqslant 100$", "quand $u = 100$", "après $100$ tours"], bonne: 0, explication: "Elle tourne tant que $u \\leqslant 100$." },
    { question: "Pour $u(n) = 5 + 4n$, le premier rang tel que $u(n) > 50$ est :", choix: ["$12$", "$11$", "$13$", "$10$"], bonne: 0, explication: "$u(11) = 49$, $u(12) = 53$." },
    { question: "$\\texttt{L = [3]}$ puis $\\texttt{for k in range(4): L.append(L[-1] * 2)}$ donne :", choix: ["$\\texttt{[3, 6, 12, 24, 48]}$", "$\\texttt{[3, 6, 6, 6, 6]}$", "$\\texttt{[6, 12, 24, 48]}$", "$\\texttt{[3, 6, 12, 24]}$"], bonne: 0, explication: "On ajoute $4$ termes, chacun double du dernier." },
    { question: "$u(0) = 0$ et $u(n + 1) = u(n) + 2n + 1$. Alors $u(3)$ vaut :", choix: ["$9$", "$7$", "$6$", "$3$"], bonne: 0, explication: "$u(1) = 1$, $u(2) = 1 + 3 = 4$, $u(3) = 4 + 5 = 9$ : ce sont les carrés." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer un terme",
      figure: "ys-cours-modes",
      etapes: [
        "Formule explicite : remplacer $n$ par le rang demandé, calculer avec les priorités.",
        "Récurrence : partir du premier terme donné et appliquer la relation au terme précédent, autant de fois que nécessaire.",
        "Bien compter les étapes : de $u(0)$ à $u(4)$, il y a $4$ applications de la relation.",
        "Vérifier la cohérence avec le contexte (ordre de grandeur, signe)."
      ],
      exemple: "$u(0) = 5$, $u(n + 1) = 3u(n) - 2$ : $u(1) = 13$, $u(2) = 37$, $u(3) = 109$."
    },
    {
      titre: "Étudier le sens de variation",
      etapes: [
        "Calculer $u(n + 1)$ en remplaçant $n$ par $n + 1$ dans la formule.",
        "Calculer la différence $u(n + 1) - u(n)$ et la réduire.",
        "Étudier son signe pour tout $n \\geqslant 0$ : positif → croissante, négatif → décroissante.",
        "Si le signe change selon $n$, la suite n'est ni croissante ni décroissante (donner deux rangs qui le montrent)."
      ],
      exemple: "$u(n) = n^2 + n$ : $u(n + 1) - u(n) = 2n + 2 > 0$, croissante."
    },
    {
      titre: "Modéliser une situation",
      figure: "ys-cours-lineaire-expo",
      etapes: [
        "Définir $u(n)$ avec des mots (« valeur après $n$ mois »), et $u(0)$.",
        "Traduire l'évolution d'une étape à la suivante : $+ b$ (même quantité) ou $\\times q$ (même pourcentage).",
        "Écrire la relation $u(n + 1) = \\dots$, puis, si possible, la formule explicite.",
        "Répondre à la question (valeur, rang, seuil) et conclure dans le contexte."
      ],
      exemple: "Hausse de $4\\,\\%$ par an sur $800$ € : $u(n + 1) = 1{,}04\\,u(n)$, $u(0) = 800$, $u(n) = 800 \\times 1{,}04^n$."
    },
    {
      titre: "Trouver un seuil avec Python",
      etapes: [
        "Initialiser $\\texttt{u}$ au premier terme et le compteur $\\texttt{n = 0}$.",
        "Écrire $\\texttt{while}$ avec la condition contraire du but (but : $u > 100$ → $\\texttt{while u <= 100:}$).",
        "Dans la boucle : calculer le terme suivant, puis $\\texttt{n = n + 1}$.",
        "Après la boucle, $\\texttt{n}$ est le premier rang qui vérifie le but."
      ],
      exemple: "$u(0) = 2$, $u(n + 1) = 1{,}5\\,u(n)$, seuil $100$ : la boucle affiche $n = 10$."
    }
  ],
  erreurs: [
    "Confondre $u(n + 1)$ et $u(n) + 1$ : le premier est le terme suivant, le second le terme actuel augmenté de $1$.",
    "Dans une récurrence, remplacer $u(n)$ par $n$ au lieu du terme précédent.",
    "Se tromper dans le nombre d'étapes entre $u(0)$ et $u(5)$ (il y en a $5$).",
    "Relier les points du nuage d'une suite.",
    "Conclure sur le sens de variation à partir de deux ou trois termes seulement.",
    "Oublier les parenthèses dans $u(n + 1) = 3(n + 1) + 2$.",
    "Dans un seuil, confondre le rang $n$ et la valeur $u(n)$ dépassant le seuil.",
    "Écrire $\\texttt{while u > 100}$ pour chercher le premier rang où $u$ dépasse $100$ : la condition du $\\texttt{while}$ est celle qui fait **continuer**."
  ]
};
