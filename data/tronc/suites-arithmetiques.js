/*
  CHAPITRE : Première tronc commun — Suites arithmétiques (variation linéaire)
  ---------------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme de mathématiques intégré à l'enseignement scientifique de Première générale (BO n° 14 du 2 avril 2026),
  « Phénomènes d'évolution », partie « Variation linéaire » : suites arithmétiques (définition par la relation de récurrence,
  terme de rang n, sens de variation, représentation graphique) ; reconnaître et modéliser une croissance linéaire discrète ;
  problème de seuil. Notation fonctionnelle u(n) avant la notation indicielle u_n. Situations : intérêts simples, poste
  budgétaire, motifs géométriques en T, en croix, carré bordé. Tableur pour calculer les termes.
  video : vidéos de la chaîne et d'Yvan Monka. Générateurs : préfixes qa-, qu-, qg- dans assets/exercices-tronc.js ; figures "qa-cours-…", "qg-cours-…", "qu-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["tronc-suites-arithmetiques"] = {
  niveau: "Première tronc commun",
  numero: 9,
  titre: "Suites arithmétiques : croissance linéaire",
  accroche: "Ajouter toujours la même quantité : des carreaux à un motif, des euros à un capital placé à intérêts simples. Une suite arithmétique, des points alignés, et des seuils à trouver.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : suites arithmétiques (PDF)", url: "https://www.maths-et-tiques.fr/telech/20SuitesTT1.pdf" },
    { titre: "Cours d'Yvan Monka : les suites, chapitre 1 (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Suites1TM.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Une suite : des nombres numérotés",
      figure: "qu-cours-modes",
      video: { titre: "Vidéo de ton prof : notion de suite, formule explicite et récurrence (cours 1/6)", youtube: "https://youtu.be/sVkYEQQWvDo" },
      texte:
        "Une **suite** $u$ associe à chaque entier naturel $n$ un nombre noté $u(n)$ : le **terme de rang $n$**. Elle modélise une grandeur qui évolue **par étapes** (chaque année, chaque mois, chaque motif) : c'est une évolution **discrète**.\n\n" +
        "Deux façons de la définir :\n\n" +
        "- par une **formule explicite** : $u(n) = 3n + 2$ donne directement $u(4) = 14$ ;\n" +
        "- par **récurrence** : on donne le premier terme et la façon de passer d'un terme au suivant, par exemple $u(0) = 2$ et $u(n + 1) = u(n) + 3$ ; on calcule alors les termes de proche en proche.\n\n" +
        "On écrit aussi $u_n$ au lieu de $u(n)$ : c'est la **notation indicielle**, très utilisée dans les livres.",
      exemple: {
        enonce: "$u(0) = 5$ et $u(n + 1) = u(n) + 4$. Calcule $u(1)$, $u(2)$, $u(3)$.",
        solution: "$u(1) = 9$, $u(2) = 13$, $u(3) = 17$."
      }
    },
    {
      titre: "Suite arithmétique : on ajoute toujours la même raison",
      figure: "qa-cours-motifs",
      video: { titre: "Vidéo de ton prof : suites arithmétiques, raison et terme général (cours 3/6)", youtube: "https://youtu.be/nFBjpbUaTrM" },
      texte:
        "Une suite est **arithmétique** quand on passe d'un terme au suivant en **ajoutant toujours le même nombre** $r$, appelé **raison** :\n\n" +
        "$u(n + 1) = u(n) + r$ pour tout entier $n$.\n\n" +
        "Pour la reconnaître, on calcule les différences $u(n + 1) - u(n)$ : elles doivent toutes être égales à $r$.\n\n" +
        "**Motifs évolutifs.** Les motifs en croix ci-contre comptent $5$, $9$, $13$ carreaux : on ajoute $4$ carreaux à chaque étape (un au bout de chaque bras). Le nombre de carreaux forme une suite arithmétique de raison $4$. De même pour les motifs en T, ou pour un carré bordé de carreaux.",
      exemple: {
        enonce: "La suite $7$ ; $4$ ; $1$ ; $-2$ ; … est-elle arithmétique ?",
        solution: "Les différences valent toutes $-3$ : oui, de raison $-3$."
      }
    },
    {
      titre: "Terme de rang $n$",
      video: { titre: "Vidéo d'Yvan Monka : déterminer l'expression générale d'une suite arithmétique", youtube: "https://youtu.be/6O0KhPMHvBA" },
      texte:
        "Pour aller de $u(0)$ à $u(n)$, on ajoute $n$ fois la raison :\n\n" +
        "$u(n) = u(0) + n \\times r$.\n\n" +
        "Si la suite commence à $u(1)$ : $u(n) = u(1) + (n - 1) \\times r$. Plus généralement, $u(n) = u(p) + (n - p) \\times r$.\n\n" +
        "**Trouver la raison** à partir de deux termes : $r = \\dfrac{u(n) - u(p)}{n - p}$. Par exemple, si $u(2) = 11$ et $u(7) = 31$, alors $5r = 20$ et $r = 4$.",
      exemple: {
        enonce: "Motifs en croix : $u(1) = 5$, raison $4$. Combien de carreaux pour le motif $50$ ?",
        solution: "$u(50) = 5 + 49 \\times 4 = 201$ carreaux."
      }
    },
    {
      titre: "Sens de variation et représentation graphique",
      figure: "qg-cours-arith",
      video: { titre: "Vidéo d'Yvan Monka : représenter graphiquement une suite", youtube: "https://youtu.be/VpSK4uLTFhM" },
      texte:
        "Une suite arithmétique de raison $r$ est :\n\n" +
        "- **croissante** si $r > 0$ ;\n" +
        "- **décroissante** si $r < 0$ ;\n" +
        "- **constante** si $r = 0$.\n\n" +
        "On la représente par le **nuage de points** de coordonnées $(n\\,;u(n))$, sans relier les points (la suite n'existe qu'aux entiers). Pour une suite arithmétique, ces points sont **alignés** : c'est le signe d'une **croissance linéaire**. Ils sont sur la droite d'équation $y = rx + u(0)$, ce qui fait le lien avec les fonctions affines (chapitre 10).",
      exemple: {
        enonce: "$u(n) = 12 - 2{,}5n$. Sens de variation ?",
        solution: "Raison $-2{,}5 < 0$ : la suite est décroissante, ses points sont alignés sur une droite qui descend."
      }
    },
    {
      titre: "Modéliser : intérêts simples, seuil",
      video: { titre: "Vidéo de ton prof : linéaire ou exponentiel ? Les abonnés de Lagon propre (problème corrigé)", youtube: "https://youtu.be/eUVrDnmVZek" },
      texte:
        "Une grandeur qui **augmente (ou diminue) de la même quantité** à chaque étape se modélise par une suite arithmétique.\n\n" +
        "**Intérêts simples.** On place $2\\,000$ € à $3\\,\\%$ par an à intérêts simples : chaque année, on reçoit $3\\,\\%$ du capital **de départ**, soit $60$ €. Le capital après $n$ années est $u(n) = 2\\,000 + 60n$.\n\n" +
        "**Problème de seuil.** Au bout de combien d'années le capital dépassera-t-il $2\\,500$ € ? On résout $2\\,000 + 60n > 2\\,500$, soit $n > 8{,}33$ : à partir de $n = 9$. On peut aussi faire défiler les termes au **tableur** : en B2 le premier terme, en B3 la formule $\\texttt{=B2+60}$ recopiée vers le bas.",
      exemple: {
        enonce: "Un budget de $1\\,500$ € augmente de $120$ € par an. Quand dépassera-t-il $2\\,000$ € ?",
        solution: "$1\\,500 + 120n > 2\\,000$ donne $n > 4{,}17$ : à partir de la 5e année ($u(5) = 2\\,100$ €)."
      }
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "qu-termes-explicite", titre: "Calculer des termes (formule explicite)", etape: "Suites", nb: 4 },
    { type: "qa-recurrence", titre: "Calculer des termes (récurrence)", etape: "Suites", nb: 4 },
    { type: "qa-reconnaitre", titre: "Reconnaître une suite arithmétique", etape: "Arithmétiques", nb: 5 },
    { type: "qg-arith-terme", titre: "Terme de rang n", etape: "Arithmétiques", nb: 5 },
    { type: "qg-arith-raison", titre: "Raison à partir de deux termes", etape: "Arithmétiques", nb: 4 },
    { type: "qa-motif", titre: "Motifs évolutifs", etape: "Modéliser", nb: 5 },
    { type: "qa-variation", titre: "Sens de variation", etape: "Variations", nb: 4 },
    { type: "qa-graphique", titre: "Lire le nuage de points", etape: "Variations", nb: 4 },
    { type: "qa-interets", titre: "Intérêts simples", etape: "Modéliser", nb: 5 },
    { type: "qa-modele", titre: "Situations de croissance linéaire", etape: "Modéliser", nb: 4 },
    { type: "qa-seuil", titre: "Problème de seuil", etape: "Modéliser", nb: 4 },
    { type: "qa-tableur", titre: "Suites au tableur", etape: "Modéliser", nb: 4 },
    { type: "qa-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Si $u(n) = 4n - 3$, alors $u(5)$ vaut :", choix: ["$17$", "$20$", "$13$", "$1$"], bonne: 0, explication: "$4 \\times 5 - 3$." },
    { question: "$u(0) = 3$ et $u(n + 1) = u(n) + 5$. Alors $u(2)$ vaut :", choix: ["$13$", "$8$", "$15$", "$75$"], bonne: 0, explication: "$u(1) = 8$, $u(2) = 13$." },
    { question: "La suite $10$ ; $7$ ; $4$ ; $1$ est arithmétique de raison :", choix: ["$-3$", "$3$", "$0{,}7$", "$-7$"], bonne: 0, explication: "On retire $3$ à chaque fois." },
    { question: "La suite $2$ ; $4$ ; $8$ ; $16$ :", choix: ["n'est pas arithmétique", "est arithmétique de raison $2$", "est arithmétique de raison $4$", "est constante"], bonne: 0, explication: "Les différences $2$, $4$, $8$ ne sont pas égales." },
    { question: "Une suite arithmétique a pour premier terme $u(0) = 7$ et pour raison $2$. Alors $u(n)$ vaut :", choix: ["$7 + 2n$", "$7 \\times 2^n$", "$2 + 7n$", "$7 + n$"], bonne: 0, explication: "$u(n) = u(0) + nr$." },
    { question: "$u(0) = 100$, raison $-6$. Alors $u(10)$ vaut :", choix: ["$40$", "$94$", "$-60$", "$160$"], bonne: 0, explication: "$100 + 10 \\times (-6)$." },
    { question: "$u(1) = 5$ et raison $3$. Alors $u(20)$ vaut :", choix: ["$62$", "$65$", "$60$", "$23$"], bonne: 0, explication: "$5 + 19 \\times 3$." },
    { question: "$u(3) = 10$ et $u(8) = 35$ pour une suite arithmétique. La raison est :", choix: ["$5$", "$25$", "$7$", "$3{,}5$"], bonne: 0, explication: "$\\dfrac{35 - 10}{8 - 3}$." },
    { question: "Une suite arithmétique de raison $-0{,}5$ est :", choix: ["décroissante", "croissante", "constante", "ni croissante ni décroissante"], bonne: 0, explication: "Raison négative." },
    { question: "Les points d'une suite arithmétique sont :", choix: ["alignés", "sur une parabole", "de plus en plus espacés verticalement", "toujours au-dessus de l'axe"], bonne: 0, explication: "Même écart vertical d'un point au suivant." },
    { question: "Des motifs comptent $4$, $7$, $10$, $13$ carreaux. Le motif $n$ (avec $u(1) = 4$) en compte :", choix: ["$3n + 1$", "$4n$", "$n + 3$", "$3n + 4$"], bonne: 0, explication: "Raison $3$ : $4 + 3(n - 1) = 3n + 1$." },
    { question: "$1\\,000$ € placés à $2\\,\\%$ par an à intérêts simples rapportent chaque année :", choix: ["$20$ €", "$2$ €", "$200$ €", "$1\\,020$ €"], bonne: 0, explication: "$2\\,\\%$ du capital de départ." },
    { question: "Avec des intérêts simples, le capital forme une suite :", choix: ["arithmétique", "géométrique", "constante", "décroissante"], bonne: 0, explication: "On ajoute le même intérêt chaque année." },
    { question: "$u(n) = 50 + 8n$. Le premier rang $n$ tel que $u(n) > 100$ est :", choix: ["$7$", "$6$", "$8$", "$50$"], bonne: 0, explication: "$8n > 50$, $n > 6{,}25$." },
    { question: "Dans un tableur, B2 contient $u(0)$. Pour une suite arithmétique de raison $5$, on saisit en B3 :", choix: ["$\\texttt{=B2+5}$", "$\\texttt{=B2*5}$", "$\\texttt{=B3+5}$", "$\\texttt{=A2+5}$"], bonne: 0, explication: "Terme précédent plus la raison." },
    { question: "$u(n)$ se note aussi :", choix: ["$u_n$", "$u^n$", "$n_u$", "$u \\times n$"], bonne: 0, explication: "Notation indicielle." },
    { question: "Pour une suite définie par récurrence, pour calculer $u(5)$ on a besoin de :", choix: ["$u(4)$", "$u(6)$", "uniquement $n = 5$", "$u(5)$ elle-même"], bonne: 0, explication: "Chaque terme se calcule à partir du précédent." },
    { question: "Un carré bordé : $8$, $12$, $16$ carreaux pour les motifs $1$, $2$, $3$. Le motif $10$ en compte :", choix: ["$44$", "$40$", "$80$", "$48$"], bonne: 0, explication: "$u(n) = 4n + 4$." },
    { question: "La suite $u(n) = 6$ pour tout $n$ est :", choix: ["arithmétique de raison $0$", "arithmétique de raison $6$", "non arithmétique", "décroissante"], bonne: 0, explication: "On ajoute $0$ à chaque fois." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Reconnaître une suite arithmétique",
      etapes: [
        "Calculer les différences entre termes consécutifs : $u(1) - u(0)$, $u(2) - u(1)$, …",
        "Si elles sont toutes égales à un même nombre $r$, la suite est arithmétique de raison $r$.",
        "Avec une formule $u(n) = an + b$ : c'est une suite arithmétique de raison $a$.",
        "Dans un énoncé : « on ajoute (ou retire) chaque fois la même quantité »."
      ],
      exemple: "$5$ ; $8$ ; $11$ ; $14$ : différences $3$ : raison $3$."
    },
    {
      titre: "Calculer un terme de rang $n$",
      figure: "qa-cours-motifs",
      etapes: [
        "Repérer le premier terme ($u(0)$ ou $u(1)$) et la raison $r$.",
        "Écrire $u(n) = u(0) + nr$ (ou $u(1) + (n - 1)r$).",
        "Remplacer $n$ par le rang demandé.",
        "Vérifier sur les premiers termes."
      ],
      exemple: "Motifs en croix : $u(1) = 5$, $r = 4$, $u(n) = 5 + 4(n - 1) = 4n + 1$, $u(30) = 121$."
    },
    {
      titre: "Résoudre un problème de seuil",
      etapes: [
        "Écrire $u(n)$ en fonction de $n$.",
        "Traduire la question par une inéquation : $u(n) > S$ (ou $<$).",
        "Résoudre, puis prendre le premier entier qui convient.",
        "Vérifier avec $u(n - 1)$ et $u(n)$ (ou au tableur)."
      ],
      exemple: "$u(n) = 300 - 12n < 100$ : $n > 16{,}7$, donc $n = 17$ ; $u(16) = 108$, $u(17) = 96$."
    }
  ],
  erreurs: [
    "Multiplier par la raison au lieu de l'ajouter.",
    "Écrire $u(n) = u(1) + nr$ alors que la suite commence à $u(1)$ : c'est $u(1) + (n - 1)r$.",
    "Croire que le nombre de carreaux est proportionnel au numéro du motif (oublier le terme constant).",
    "Relier les points du nuage d'une suite.",
    "Confondre intérêts simples (suite arithmétique) et intérêts composés (suite géométrique).",
    "Donner une valeur non entière comme réponse à un problème de seuil.",
    "Dire qu'une suite est croissante parce que $u(1) > u(0)$, sans regarder le signe de la raison."
  ]
};
