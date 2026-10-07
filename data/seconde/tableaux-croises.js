/*
  CHAPITRE : Seconde — Tableaux croisés, fréquences conditionnelles, probabilités 1
  ----------------------------------------------------------------------------------
  Chapitre 10 de la progression spiralée 2026-2027 (programme de Seconde 2026).
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce, programme Python entre ```python et ```).
  figure : "tableau-transport" (l'enquête du premier paragraphe).
  Vidéos : celles de la chaîne d'abord, Yvan Monka en complément.
  Les générateurs d'exercices commencent par « tc- » dans assets/exercices.js
  (le chapitre reprend aussi auto-probabilites, am-proba-tableau et am-proba-notation).
  Arbres pondérés et inversion des conditionnements : chapitre 15.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["seconde-tableaux-croises"] = {
  niveau: "Seconde",
  numero: 10,
  titre: "Tableaux croisés, fréquences conditionnelles, probabilités 1",
  accroche: "Bus, à pied ou en voiture ? Lire une enquête du lycée dans un tableau croisé, calculer des fréquences « parmi… », puis des probabilités.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours sur les probabilités en vidéo (Yvan Monka)", url: "https://youtu.be/dvx_O37gfyY", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Tableau croisé d'effectifs",
      texte:
        "Un **tableau croisé** donne les effectifs d'une population selon **deux variables qualitatives** : une en ligne, une en colonne.\n\n" +
        "- Une variable qualitative est **nominale** si ses modalités n'ont pas d'ordre (mode de transport), **ordinale** si elles en ont un (niveau de classe, mention).\n" +
        "- La dernière ligne et la dernière colonne donnent les **totaux** ; la case en bas à droite est l'effectif total.\n" +
        "- On complète un tableau en utilisant les sommes par ligne et par colonne.",
      figure: "tableau-transport",
      exemple: {
        enonce: "Enquête sur $200$ élèves du lycée de Sada (tableau ci-contre). Compléter la case manquante.",
        solution: "Ligne « Bus » : $120 - 70 = 50$. Vérification avec la colonne « 1re » : $50 + 50 = 100$."
      }
    },
    {
      titre: "Fréquences marginales et conditionnelles",
      video: { titre: "Vidéo d'Yvan Monka : calculer une fréquence conditionnelle ou marginale", youtube: "https://youtu.be/SkhjnCoExD8" },
      texte:
        "- **Fréquence marginale** : un total de ligne (ou de colonne) divisé par l'effectif total. Exemple : la part des élèves qui viennent en bus.\n" +
        "- **Fréquence conditionnelle** : on se restreint à une **sous-population** (une ligne ou une colonne) et on divise par **son** total. On note $f_A(B)$ la fréquence de $B$ parmi les $A$.\n\n" +
        "Les médias utilisent souvent des fréquences conditionnelles : « $40\\,\\%$ **des** filles font du sport » se traduit par $f_F(S) = 0{,}4$. La population de référence est celle qui suit « des » ou « parmi les ».\n\n" +
        "Attention : $f_A(B)$ et $f_B(A)$ sont en général **différentes**.",
      exemple: {
        enonce: "Avec le tableau précédent : fréquence des élèves de Seconde ; fréquence des élèves de Seconde parmi ceux qui viennent en bus ; fréquence des élèves venant en bus parmi ceux de Seconde.",
        solution: "Marginale : $\\dfrac{100}{200} = 0{,}5$.\n\nParmi les élèves en bus : $\\dfrac{70}{120} \\approx 0{,}58$.\n\nParmi les élèves de Seconde : $\\dfrac{70}{100} = 0{,}7$. Ce n'est pas la même chose !"
      }
    },
    {
      titre: "Modèle probabiliste (rappels)",
      video: { titre: "Vidéo de ton prof : calculer des probabilités (urne, cartes, deux dés)", youtube: "https://youtu.be/rkdNL-3Ih9Q" },
      texte:
        "- Une **expérience aléatoire** a des **issues** ; leur ensemble est l'univers $\\Omega$. Un **événement** est un ensemble d'issues.\n" +
        "- Une loi de probabilité donne la probabilité de chaque issue ; la somme vaut $1$.\n" +
        "- En situation d'**équiprobabilité** (tirage au hasard) : $P(A) = \\dfrac{\\text{Card}(A)}{\\text{Card}(\\Omega)}$, où $\\text{Card}$ désigne le nombre d'éléments.\n" +
        "- Événement **contraire** : $\\overline{A}$ (« non $A$ »), et $P(\\overline{A}) = 1 - P(A)$.",
      exemple: {
        enonce: "On lance un dé équilibré à $6$ faces. $A$ : « obtenir un multiple de $3$ ». Calculer $P(A)$ et $P(\\overline{A})$.",
        solution: "$A = \\{3\\,;6\\}$ : $P(A) = \\dfrac{2}{6} = \\dfrac{1}{3}$. Et $P(\\overline{A}) = 1 - \\dfrac{1}{3} = \\dfrac{2}{3}$."
      }
    },
    {
      titre: "ET, OU, NON : intersection et réunion",
      video: { titre: "Vidéo d'Yvan Monka : calculer la probabilité d'une réunion", youtube: "https://youtu.be/y4P_BP-ldxk" },
      texte:
        "- $A \\cap B$ (« $A$ **et** $B$ ») : les issues qui sont à la fois dans $A$ et dans $B$. Dans un tableau croisé, c'est **une case**.\n" +
        "- $A \\cup B$ (« $A$ **ou** $B$ ») : les issues qui sont dans $A$, dans $B$, ou dans les deux.\n" +
        "- $\\text{Card}(A \\cup B) = \\text{Card}(A) + \\text{Card}(B) - \\text{Card}(A \\cap B)$ : on retire la partie commune, comptée deux fois.\n\n" +
        "En mathématiques, le « ou » est **inclusif** : « bus ou Seconde » contient aussi les élèves de Seconde qui viennent en bus.",
      exemple: {
        enonce: "Avec le tableau du premier paragraphe : on choisit un élève au hasard. $B$ : « vient en bus », $S$ : « est en Seconde ». Calculer $P(B \\cap S)$ et $P(B \\cup S)$.",
        solution: "$P(B \\cap S) = \\dfrac{70}{200} = 0{,}35$.\n\n$\\text{Card}(B \\cup S) = 120 + 100 - 70 = 150$, donc $P(B \\cup S) = \\dfrac{150}{200} = 0{,}75$."
      }
    },
    {
      titre: "Probabilité conditionnelle à partir d'un tableau",
      video: { titre: "Vidéo d'Yvan Monka : probabilité conditionnelle à l'aide d'un tableau", youtube: "https://youtu.be/7tS60nk6Z2I" },
      texte:
        "On tire au sort un individu dans la population. La probabilité de $A$ **sachant** $B$ est la fréquence de $A$ parmi les individus de $B$ :\n\n" +
        "$P_B(A) = \\dfrac{\\text{Card}(A \\cap B)}{\\text{Card}(B)}$.\n\n" +
        "On se place dans la ligne (ou la colonne) de $B$, et on divise par **son** total, pas par l'effectif total.",
      exemple: {
        enonce: "Toujours avec le même tableau : on choisit un élève qui vient en bus. Quelle est la probabilité qu'il soit en Seconde ?",
        solution: "$P_B(S) = \\dfrac{\\text{Card}(B \\cap S)}{\\text{Card}(B)} = \\dfrac{70}{120} = \\dfrac{7}{12} \\approx 0{,}58$."
      }
    },
    {
      titre: "Python : filtrer avec and, or, not",
      texte:
        "Pour compter les individus qui vérifient un critère, on parcourt la liste et on teste une condition avec $\\texttt{and}$ (et), $\\texttt{or}$ (ou), $\\texttt{not}$ (non).\n\n" +
        "```python\neleves = [(\"bus\", \"2de\"), (\"pied\", \"1re\"), (\"bus\", \"1re\")]\nc = 0\nfor (transport, niveau) in eleves:\n    if transport == \"bus\" and niveau == \"1re\":\n        c = c + 1\nprint(c)\n```\n\n" +
        "Avec deux listes de même longueur, on peut aussi construire tout un tableau croisé en comptant chaque couple de modalités.",
      exemple: {
        enonce: "Qu'affiche ce programme ? Et si on remplace $\\texttt{and}$ par $\\texttt{or}$ ?",
        solution: "Avec $\\texttt{and}$ : seul le 3e élève vient en bus **et** est en 1re : il affiche $1$.\n\nAvec $\\texttt{or}$ : les trois élèves vérifient « bus » ou « 1re » : il affiche $3$."
      }
    }
  ],

  /* Exercices corrigés en vidéo */
  videos: [
    { titre: "Calculer la probabilité d'une intersection", type: "Probabilités", youtube: "https://youtu.be/VprpP3e_R-4" },
    { titre: "Calculer une probabilité conditionnelle (formule)", type: "Probabilités", youtube: "https://youtu.be/SWmkdKxXf_I" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ----------
     Chaque série tire des nombres au hasard : on peut la refaire autant qu'on veut.
     type : nom du générateur (voir assets/exercices.js). nb : nombre de questions. */
  exercices: [
    { type: "tc-completer", titre: "Compléter un tableau croisé", etape: "Tableaux croisés", nb: 4 },
    { type: "tc-frequence", titre: "Fréquences marginales et conditionnelles", etape: "Tableaux croisés", nb: 6 },
    { type: "tc-medias", titre: "Traduire une phrase des médias", etape: "Tableaux croisés", nb: 4 },
    { type: "auto-probabilites", titre: "Calculer une probabilité", etape: "Probabilités", nb: 5 },
    { type: "tc-evenement", titre: "Et, ou, non dans un tableau", etape: "Probabilités", nb: 6 },
    { type: "am-proba-tableau", titre: "Probabilité conditionnelle avec un tableau", etape: "Probabilités", nb: 5 },
    { type: "am-proba-notation", titre: "Notations : P(A ∩ B), P_A(B)…", etape: "Probabilités", nb: 4 },
    { type: "tc-python", titre: "Python : filtrer avec and, or, not", etape: "Python", nb: 3 }
  ],

  /* ---------- 3. QCM DE RÉVISION ----------
     bonne : numéro de la bonne réponse en partant de 0 (0 = la première). */
  qcm: [
    {
      question: "La variable « niveau de classe (2de, 1re, Tle) » est :",
      choix: ["qualitative ordinale", "qualitative nominale", "quantitative continue", "quantitative discrète"],
      bonne: 0,
      explication: "Ses modalités ne sont pas des nombres mais elles sont rangées dans un ordre : qualitative ordinale."
    },
    {
      question: "Dans un tableau croisé, une fréquence marginale s'obtient en divisant :",
      choix: ["un total de ligne ou de colonne par l'effectif total", "une case par le total de sa ligne", "une case par une autre case", "l'effectif total par un total de ligne"],
      bonne: 0,
      explication: "Marginale : elle se lit dans la « marge » du tableau (les totaux), rapportée à toute la population."
    },
    {
      question: "« $30\\,\\%$ des élèves de Terminale viennent à pied » se note :",
      choix: ["$f_T(P) = 0{,}3$", "$f_P(T) = 0{,}3$", "$f(T \\cap P) = 0{,}3$", "$f(P) = 0{,}3$"],
      bonne: 0,
      explication: "La population de référence (les Terminales) va en indice : parmi les $T$, la part de $P$."
    },
    {
      question: "$200$ élèves, dont $120$ viennent en bus ; $70$ élèves de Seconde viennent en bus. Parmi les élèves en bus, la fréquence des Secondes est :",
      choix: ["$\\dfrac{70}{120}$", "$\\dfrac{70}{200}$", "$\\dfrac{120}{200}$", "$\\dfrac{70}{100}$"],
      bonne: 0,
      explication: "« Parmi les élèves en bus » : on divise par le nombre d'élèves en bus, $120$."
    },
    {
      question: "$P(A) = 0{,}35$. Alors $P(\\overline{A})$ vaut :",
      choix: ["$0{,}65$", "$-0{,}35$", "$0{,}35$", "$1{,}35$"],
      bonne: 0,
      explication: "$P(\\overline{A}) = 1 - P(A) = 1 - 0{,}35 = 0{,}65$."
    },
    {
      question: "$\\text{Card}(A) = 40$, $\\text{Card}(B) = 30$, $\\text{Card}(A \\cap B) = 10$. Alors $\\text{Card}(A \\cup B)$ vaut :",
      choix: ["$60$", "$70$", "$80$", "$10$"],
      bonne: 0,
      explication: "$40 + 30 - 10 = 60$ : les $10$ individus communs ont été comptés deux fois."
    },
    {
      question: "« $A$ ou $B$ » en mathématiques signifie :",
      choix: ["$A$, ou $B$, ou les deux", "$A$ ou $B$, mais pas les deux", "$A$ et $B$ à la fois", "ni $A$ ni $B$"],
      bonne: 0,
      explication: "Le « ou » mathématique est inclusif : $A \\cup B$ contient la partie commune $A \\cap B$."
    },
    {
      question: "$P_B(A)$ se calcule par :",
      choix: ["$\\dfrac{\\text{Card}(A \\cap B)}{\\text{Card}(B)}$", "$\\dfrac{\\text{Card}(A \\cap B)}{\\text{Card}(A)}$", "$\\dfrac{\\text{Card}(B)}{\\text{Card}(\\Omega)}$", "$\\dfrac{\\text{Card}(A)}{\\text{Card}(B)}$"],
      bonne: 0,
      explication: "« Sachant $B$ » : on se restreint aux individus de $B$, donc on divise par $\\text{Card}(B)$."
    },
    {
      question: "En Python, la condition $\\texttt{not x > 5}$ est vraie pour :",
      choix: ["$x = 5$", "$x = 6$", "$x = 10$", "aucune valeur"],
      bonne: 0,
      explication: "$\\texttt{not x > 5}$ équivaut à $x \\leqslant 5$ : elle est vraie pour $5$."
    }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Compléter un tableau croisé",
      etapes: [
        "Repérer une ligne ou une colonne où il ne manque qu'une seule valeur.",
        "Calculer la valeur manquante avec le total : total $-$ autres valeurs.",
        "Recommencer, puis vérifier que l'effectif total est cohérent."
      ],
      exemple: "Ligne « Bus » : $120 - 70 = 50$."
    },
    {
      titre: "Calculer une fréquence conditionnelle",
      etapes: [
        "Repérer la population de référence : ce qui suit « parmi les » ou « des ».",
        "Prendre l'effectif de la case qui croise les deux critères.",
        "Diviser par le **total** de la population de référence."
      ],
      exemple: "Parmi les élèves en bus, part des Secondes : $\\dfrac{70}{120} \\approx 0{,}58$."
    },
    {
      titre: "Calculer $P(A \\cap B)$, $P(A \\cup B)$, $P(\\overline{A})$",
      etapes: [
        "$A \\cap B$ : une case du tableau, divisée par l'effectif total.",
        "$A \\cup B$ : $\\text{Card}(A) + \\text{Card}(B) - \\text{Card}(A \\cap B)$, divisé par l'effectif total.",
        "$\\overline{A}$ : $1 - P(A)$."
      ],
      exemple: "$P(B \\cup S) = \\dfrac{120 + 100 - 70}{200} = 0{,}75$."
    }
  ],
  erreurs: [
    "Diviser par l'effectif total au lieu du total de la sous-population (« parmi les … »).",
    "Confondre $f_A(B)$ et $f_B(A)$ : « $40\\,\\%$ des filles font du sport » ne veut pas dire « $40\\,\\%$ des sportifs sont des filles ».",
    "Compter deux fois la partie commune dans $A \\cup B$.",
    "Croire que « ou » exclut les deux à la fois.",
    "Oublier que la somme des probabilités de toutes les issues vaut $1$."
  ]
};
