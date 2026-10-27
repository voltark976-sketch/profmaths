/*
  CHAPITRE : Première technologique — Suites arithmétiques et géométriques
  -------------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme 2026 de première technologique, « Suites numériques » : suites arithmétiques (évolutions absolues constantes,
  croissance linéaire) et géométriques à termes strictement positifs (évolutions relatives constantes, croissance
  exponentielle) : relation de récurrence, terme de rang n, sens de variation, représentation graphique, modélisation,
  démontrer qu'une suite est arithmétique ou géométrique, conjecturer la nature à partir du graphique.
  video : vidéos de la chaîne (Première spé) et d'Yvan Monka. Générateurs : préfixe yg- dans assets/exercices-techno.js ; figures "yg-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["techno-suites-arithmetiques-geometriques"] = {
  niveau: "Première technologique",
  numero: 6,
  titre: "Suites arithmétiques et géométriques",
  accroche: "Ajouter toujours le même nombre (croissance linéaire) ou multiplier toujours par le même nombre (croissance exponentielle) : les deux modèles à reconnaître partout.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : suites arithmétiques et géométriques (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Suites2TM.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Suites arithmétiques",
      figure: "yg-cours-arith",
      video: { titre: "Vidéo de ton prof : suites arithmétiques, raison et terme général (cours 3/6)", youtube: "https://youtu.be/nFBjpbUaTrM" },
      texte:
        "Une suite est **arithmétique** quand on passe d'un terme au suivant en **ajoutant toujours le même nombre** $r$, la **raison** : $u(n + 1) = u(n) + r$.\n\n" +
        "**Terme de rang $n$** : $u(n) = u(0) + n \\times r$. Plus généralement, $u(n) = u(p) + (n - p) \\times r$.\n\n" +
        "C'est le modèle des **évolutions absolues constantes** (croissance **linéaire**) : un abonnement qui coûte $12$ € de plus chaque mois, une plante qui pousse de $3$ cm par semaine. Le nuage de points est formé de **points alignés** sur une droite de coefficient directeur $r$.\n\n" +
        "**Pourquoi** $u(n) = u(0) + nr$ ? Pour aller de $u(0)$ à $u(n)$, on ajoute $r$ exactement $n$ fois.",
      exemple: {
        enonce: "$(u(n))$ arithmétique, $u(0) = 5$ et $r = 3$. Calcule $u(20)$.",
        solution: "$u(20) = 5 + 20 \\times 3 = 65$."
      }
    },
    {
      titre: "Suites géométriques",
      figure: "yg-cours-geo",
      video: { titre: "Vidéo de ton prof : suites géométriques, raison et terme général (cours 4/6)", youtube: "https://youtu.be/Nx56kUnM1oI" },
      texte:
        "Une suite est **géométrique** quand on passe d'un terme au suivant en **multipliant toujours par le même nombre** $q$, la **raison** : $u(n + 1) = q \\times u(n)$. En Première technologique, on se limite aux termes **strictement positifs** ($u(0) > 0$ et $q > 0$).\n\n" +
        "**Terme de rang $n$** : $u(n) = u(0) \\times q^n$. Plus généralement, $u(n) = u(p) \\times q^{n - p}$.\n\n" +
        "C'est le modèle des **évolutions relatives constantes** (croissance **exponentielle**) : un capital qui augmente de $3\\,\\%$ par an ($q = 1{,}03$), une population qui double chaque heure ($q = 2$), un prix qui baisse de $20\\,\\%$ par an ($q = 0{,}8$). Les points du nuage s'écartent de plus en plus (ou se resserrent si $q < 1$).",
      exemple: {
        enonce: "$(u(n))$ géométrique, $u(0) = 800$ et $q = 1{,}05$. Calcule $u(3)$.",
        solution: "$u(3) = 800 \\times 1{,}05^3 = 800 \\times 1{,}157625 = 926{,}1$."
      }
    },
    {
      titre: "Reconnaître et démontrer",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître une suite arithmétique et une suite géométrique", youtube: "https://youtu.be/pHq6oClOylU" },
      texte:
        "**Conjecturer** avec les premiers termes : les différences $u(1) - u(0)$, $u(2) - u(1)$… sont-elles égales (arithmétique) ? les quotients $\\dfrac{u(1)}{u(0)}$, $\\dfrac{u(2)}{u(1)}$… sont-ils égaux (géométrique) ? Beaucoup de suites ne sont **ni l'un ni l'autre** : $1$ ; $4$ ; $9$ ; $16$ (les carrés).\n\n" +
        "**Démontrer**, pour tout $n$ :\n\n" +
        "- arithmétique : montrer que $u(n + 1) - u(n)$ est une **constante** (c'est la raison). Pour $u(n) = 5n - 2$ : $u(n + 1) - u(n) = 5(n + 1) - 2 - (5n - 2) = 5$ ;\n" +
        "- géométrique : montrer que $\\dfrac{u(n + 1)}{u(n)}$ est une constante. Pour $u(n) = 3 \\times 2^n$ : $\\dfrac{3 \\times 2^{n + 1}}{3 \\times 2^n} = 2$.\n\n" +
        "Vérifier sur trois termes ne suffit pas : il faut le calcul avec $n$ quelconque.",
      exemple: {
        enonce: "La suite $u(n) = n^2 + n$ est-elle arithmétique ?",
        solution: "$u(0) = 0$, $u(1) = 2$, $u(2) = 6$ : les différences sont $2$ puis $4$. Elle n'est pas arithmétique (un contre-exemple suffit)."
      }
    },
    {
      titre: "Sens de variation",
      video: { titre: "Vidéo d'Yvan Monka : déterminer le sens de variation d'une suite géométrique", youtube: "https://youtu.be/vLshnJqW-64" },
      texte:
        "**Suite arithmétique** : $u(n + 1) - u(n) = r$. Si $r > 0$, la suite est croissante ; si $r < 0$, décroissante ; si $r = 0$, constante. Le premier terme n'intervient pas.\n\n" +
        "**Suite géométrique à termes positifs** : si $q > 1$, chaque terme est plus grand que le précédent, la suite est croissante ; si $0 < q < 1$, elle est décroissante ; si $q = 1$, constante.\n\n" +
        "Exemple : $u(n) = 500 \\times 0{,}9^n$ (baisse de $10\\,\\%$ par an) est décroissante ; $v(n) = 20 \\times 1{,}02^n$ est croissante, même si la hausse est lente.",
      exemple: {
        enonce: "$(u(n))$ arithmétique de raison $-2{,}5$ et $u(0) = 100$ ; $(v(n))$ géométrique de raison $1{,}1$ et $v(0) = 1$. Sens de variation ?",
        solution: "$(u(n))$ est décroissante ($r < 0$) et $(v(n))$ est croissante ($q > 1$, termes positifs)."
      }
    },
    {
      titre: "Linéaire ou exponentiel ? Modéliser",
      figure: "yg-cours-compare",
      video: { titre: "Vidéo de ton prof : linéaire ou exponentiel ? Les abonnés de Lagon propre (problème corrigé)", youtube: "https://youtu.be/eUVrDnmVZek" },
      texte:
        "Face à une situation, la question est : **ajoute-t-on** une quantité fixe (arithmétique) ou **multiplie-t-on** par un coefficient fixe (géométrique) ?\n\n" +
        "- « $+ 50$ abonnés par mois » : $u(n + 1) = u(n) + 50$, croissance linéaire.\n" +
        "- « $+ 5\\,\\%$ d'abonnés par mois » : $u(n + 1) = 1{,}05\\,u(n)$, croissance exponentielle. Le pourcentage se calcule sur la valeur **précédente**, qui change : c'est pour ça qu'on multiplie.\n\n" +
        "Sur le long terme, une croissance exponentielle (même lente) finit toujours par dépasser une croissance linéaire (même rapide) : sur la figure, la suite géométrique part en dessous et rattrape puis dépasse la suite arithmétique.",
      exemple: {
        enonce: "Une voiture achetée $18\\,000$ € perd $12\\,\\%$ de sa valeur par an. Valeur après $4$ ans ?",
        solution: "$q = 0{,}88$ : $u(4) = 18\\,000 \\times 0{,}88^4 \\approx 10\\,795$ €."
      }
    },
    {
      titre: "Python : termes et seuil",
      video: { titre: "Vidéo d'Yvan Monka : calculer des termes d'une suite en Python", youtube: "https://youtu.be/CYDUNYndHfg" },
      texte:
        "```python\ndef arith(u0, r, n):          # terme de rang n\n    return u0 + n * r\n\ndef geo(u0, q, n):\n    return u0 * q ** n\n\n# premier rang où une suite géométrique croissante dépasse un seuil\nu, n = 800, 0\nwhile u <= 1000:\n    u = u * 1.05\n    n = n + 1\nprint(n)                      # 5 : après 5 ans, le capital dépasse 1 000 €\n```\n\n" +
        "Pour comparer deux suites (à partir de quel rang la géométrique dépasse-t-elle l'arithmétique ?), on boucle tant que $\\texttt{geo(...) <= arith(...)}$."
    }
  ],

  videos: [],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "yg-reconnaitre", titre: "Reconnaître la nature d'une suite", etape: "Reconnaître", nb: 5 },
    { type: "yg-nature-formule", titre: "Nature à partir de la formule", etape: "Reconnaître", nb: 5 },
    { type: "yg-demontrer", titre: "Démontrer : différence ou quotient", etape: "Reconnaître", nb: 4 },
    { type: "yg-arith-terme", titre: "Suite arithmétique : terme de rang n", etape: "Arithmétiques", nb: 5 },
    { type: "yg-arith-raison", titre: "Suite arithmétique : trouver la raison", etape: "Arithmétiques", nb: 4 },
    { type: "yg-geo-terme", titre: "Suite géométrique : terme de rang n", etape: "Géométriques", nb: 5 },
    { type: "yg-geo-raison", titre: "Suite géométrique : trouver la raison", etape: "Géométriques", nb: 4 },
    { type: "yg-variation", titre: "Sens de variation", etape: "Variations", nb: 4 },
    { type: "yg-graphique", titre: "Lire un nuage de points", etape: "Graphique", nb: 4 },
    { type: "yg-modele", titre: "Modéliser une évolution", etape: "Modéliser", nb: 5 },
    { type: "yg-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "La suite $4$ ; $9$ ; $14$ ; $19$ est :", choix: ["arithmétique de raison $5$", "géométrique de raison $5$", "arithmétique de raison $4$", "ni arithmétique ni géométrique"], bonne: 0, explication: "On ajoute $5$ à chaque fois." },
    { question: "La suite $3$ ; $6$ ; $12$ ; $24$ est :", choix: ["géométrique de raison $2$", "arithmétique de raison $3$", "géométrique de raison $3$", "arithmétique de raison $2$"], bonne: 0, explication: "On multiplie par $2$ à chaque fois." },
    { question: "La suite $2$ ; $5$ ; $10$ ; $17$ est :", choix: ["ni arithmétique ni géométrique", "arithmétique de raison $3$", "géométrique de raison $2{,}5$", "arithmétique de raison $5$"], bonne: 0, explication: "Différences $3$, $5$, $7$ : pas constantes ; quotients non plus." },
    { question: "$(u(n))$ arithmétique, $u(0) = 7$, $r = -2$. Alors $u(10)$ vaut :", choix: ["$-13$", "$27$", "$-20$", "$-11$"], bonne: 0, explication: "$7 + 10 \\times (-2) = -13$." },
    { question: "$(u(n))$ arithmétique, $u(3) = 11$, $r = 4$. Alors $u(8)$ vaut :", choix: ["$31$", "$43$", "$27$", "$35$"], bonne: 0, explication: "$u(8) = u(3) + 5 \\times 4 = 31$." },
    { question: "$(u(n))$ arithmétique, $u(2) = 10$ et $u(6) = 22$. Sa raison est :", choix: ["$3$", "$12$", "$2$", "$4$"], bonne: 0, explication: "$4r = 22 - 10 = 12$ donc $r = 3$." },
    { question: "Le terme général d'une suite arithmétique de premier terme $u(0)$ et de raison $r$ est :", choix: ["$u(n) = u(0) + nr$", "$u(n) = u(0) \\times r^n$", "$u(n) = u(0) + r$", "$u(n) = nr$"], bonne: 0, explication: "On ajoute $r$ exactement $n$ fois." },
    { question: "$(u(n))$ géométrique, $u(0) = 5$, $q = 2$. Alors $u(4)$ vaut :", choix: ["$80$", "$40$", "$13$", "$10$"], bonne: 0, explication: "$5 \\times 2^4 = 80$." },
    { question: "$(u(n))$ géométrique, $u(0) = 1\\,000$, $q = 1{,}1$. Alors $u(2)$ vaut :", choix: ["$1\\,210$", "$1\\,200$", "$1\\,100$", "$1\\,002{,}2$"], bonne: 0, explication: "$1\\,000 \\times 1{,}1^2 = 1\\,210$." },
    { question: "$(u(n))$ géométrique, $u(3) = 12$ et $u(4) = 36$. Sa raison est :", choix: ["$3$", "$24$", "$\\dfrac{1}{3}$", "$12$"], bonne: 0, explication: "$q = \\dfrac{36}{12} = 3$." },
    { question: "Le terme général d'une suite géométrique est :", choix: ["$u(n) = u(0) \\times q^n$", "$u(n) = u(0) + nq$", "$u(n) = u(0) \\times q \\times n$", "$u(n) = q^n$"], bonne: 0, explication: "On multiplie par $q$ exactement $n$ fois." },
    { question: "$u(n) = 8 - 3n$ est une suite :", choix: ["arithmétique de raison $-3$", "arithmétique de raison $8$", "géométrique de raison $-3$", "ni arithmétique ni géométrique"], bonne: 0, explication: "$u(n + 1) - u(n) = -3$." },
    { question: "$u(n) = 7 \\times 0{,}5^n$ est une suite :", choix: ["géométrique de raison $0{,}5$", "géométrique de raison $7$", "arithmétique de raison $0{,}5$", "arithmétique de raison $7$"], bonne: 0, explication: "$u(n) = u(0) \\times q^n$ avec $u(0) = 7$ et $q = 0{,}5$." },
    { question: "Pour démontrer qu'une suite est géométrique, on montre que :", choix: ["$\\dfrac{u(n + 1)}{u(n)}$ est constant", "$u(n + 1) - u(n)$ est constant", "$u(1) = 2u(0)$", "$u(n)$ est positif"], bonne: 0, explication: "Le quotient constant est la raison." },
    { question: "Une suite arithmétique de raison $-0{,}5$ est :", choix: ["décroissante", "croissante", "constante", "ni croissante ni décroissante"], bonne: 0, explication: "$r < 0$." },
    { question: "Une suite géométrique de premier terme $200$ et de raison $0{,}95$ est :", choix: ["décroissante", "croissante", "constante", "ni croissante ni décroissante"], bonne: 0, explication: "Termes positifs et $0 < q < 1$." },
    { question: "Une population augmente de $2\\,\\%$ par an. La suite des effectifs est :", choix: ["géométrique de raison $1{,}02$", "arithmétique de raison $2$", "géométrique de raison $0{,}02$", "arithmétique de raison $1{,}02$"], bonne: 0, explication: "Évolution relative constante : on multiplie par $1 + 0{,}02$." },
    { question: "Un salaire augmente de $40$ € chaque année. La suite des salaires est :", choix: ["arithmétique de raison $40$", "géométrique de raison $40$", "géométrique de raison $1{,}4$", "arithmétique de raison $1{,}4$"], bonne: 0, explication: "Évolution absolue constante : on ajoute $40$." },
    { question: "Sur un nuage de points, une suite arithmétique se reconnaît à :", choix: ["des points alignés", "des points de plus en plus espacés", "des points sur une parabole", "des points tous à la même hauteur"], bonne: 0, explication: "Même écart vertical à chaque rang : droite de pente $r$." },
    { question: "Un prix de $300$ € baisse de $20\\,\\%$ par an. Après $2$ ans, il vaut :", choix: ["$192$ €", "$180$ €", "$240$ €", "$260$ €"], bonne: 0, explication: "$300 \\times 0{,}8^2 = 192$." },
    { question: "Pour $u(n) = 5 + 4n$ et $v(n) = 2^n$, à partir de quel rang a-t-on $v(n) > u(n)$ ?", choix: ["$n = 5$", "$n = 4$", "$n = 3$", "$n = 6$"], bonne: 0, explication: "$u(4) = 21 > v(4) = 16$, mais $u(5) = 25 < v(5) = 32$." },
    { question: "$(u(n))$ géométrique à termes positifs avec $u(1) = 4$ et $u(3) = 36$. Alors $q$ vaut :", choix: ["$3$", "$9$", "$16$", "$32$"], bonne: 0, explication: "$q^2 = \\dfrac{36}{4} = 9$ donc $q = 3$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Reconnaître la nature d'une suite",
      etapes: [
        "Calculer les différences $u(1) - u(0)$, $u(2) - u(1)$, $u(3) - u(2)$.",
        "Toutes égales ? Conjecture : arithmétique, de raison cette différence.",
        "Sinon, calculer les quotients $\\dfrac{u(1)}{u(0)}$, $\\dfrac{u(2)}{u(1)}$… Tous égaux ? géométrique.",
        "Pour **démontrer**, calculer $u(n + 1) - u(n)$ ou $\\dfrac{u(n + 1)}{u(n)}$ avec $n$ quelconque."
      ],
      exemple: "$6$ ; $12$ ; $24$ : différences $6$, $12$ (non) ; quotients $2$, $2$ : géométrique de raison $2$."
    },
    {
      titre: "Calculer un terme de rang $n$",
      figure: "yg-cours-arith",
      etapes: [
        "Identifier la nature, le premier terme connu $u(p)$ et la raison.",
        "Arithmétique : $u(n) = u(p) + (n - p)\\,r$.",
        "Géométrique : $u(n) = u(p) \\times q^{\\,n - p}$.",
        "Compter le nombre d'étapes $n - p$ (de $u(0)$ à $u(n)$ : $n$ étapes)."
      ],
      exemple: "Géométrique, $u(2) = 50$, $q = 1{,}2$ : $u(5) = 50 \\times 1{,}2^3 = 86{,}4$."
    },
    {
      titre: "Trouver la raison avec deux termes",
      etapes: [
        "Arithmétique : $u(m) - u(p) = (m - p)\\,r$, donc $r = \\dfrac{u(m) - u(p)}{m - p}$.",
        "Géométrique : $\\dfrac{u(m)}{u(p)} = q^{\\,m - p}$ ; avec deux termes consécutifs, $q = \\dfrac{u(p + 1)}{u(p)}$.",
        "Vérifier en recalculant un des termes donnés.",
        "En déduire $u(0)$ si besoin : $u(0) = u(p) - pr$ ou $\\dfrac{u(p)}{q^p}$."
      ],
      exemple: "Arithmétique, $u(1) = 9$ et $u(7) = 27$ : $r = \\dfrac{18}{6} = 3$, $u(0) = 6$."
    },
    {
      titre: "Modéliser une évolution",
      figure: "yg-cours-compare",
      etapes: [
        "Repérer le mot clé : « de plus / de moins chaque … » (ajout) ou « de $t\\,\\%$ chaque … » (multiplication).",
        "Ajout : suite arithmétique, $r$ = la quantité ajoutée (négative pour une perte).",
        "Pourcentage : suite géométrique, $q = 1 + \\dfrac{t}{100}$ (ou $1 - \\dfrac{t}{100}$ pour une baisse).",
        "Écrire $u(n)$ puis répondre (valeur à une date, seuil avec un programme ou en testant les termes)."
      ],
      exemple: "« $+ 8\\,\\%$ par an » sur $2\\,500$ : $u(n) = 2\\,500 \\times 1{,}08^n$."
    }
  ],
  erreurs: [
    "Confondre les formules : $u(0) + nr$ (arithmétique) et $u(0) \\times q^n$ (géométrique).",
    "Compter une étape de trop ou de moins entre $u(p)$ et $u(n)$ : il y en a $n - p$.",
    "Traduire « $+ 5\\,\\%$ par an » par une suite arithmétique de raison $5$ : c'est géométrique de raison $1{,}05$.",
    "Croire que la première valeur influence le sens de variation d'une suite arithmétique : seul le signe de $r$ compte.",
    "Pour une suite géométrique de raison $0{,}8$, dire qu'elle est croissante parce que $0{,}8 > 0$ : il faut comparer $q$ à $1$.",
    "Conclure « arithmétique » après trois termes sans calcul général.",
    "Élever $u(0) \\times q$ à la puissance $n$ au lieu de $q$ seul.",
    "Trouver la raison géométrique en soustrayant au lieu de diviser."
  ]
};
