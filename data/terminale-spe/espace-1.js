/*
  CHAPITRE : Terminale spécialité — Géométrie dans l'espace 1 : vecteurs, droites et plans
  ---------------------------------------------------------------------------------------
  Chapitre 3 de la progression de Terminale spécialité (V26, période 1, 2 semaines) :
  vecteurs, droites et plans de l'espace ; positions relatives de droites et de plans ;
  repères de l'espace ; représentations paramétriques de droites.
  Le produit scalaire, les vecteurs normaux et les équations cartésiennes viennent au chapitre 8.
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Pas de vidéo de la chaîne sur ce thème : vidéos d'Yvan Monka (cours 20Esp1 et 20Esp3).
  Figure : "esp-cube". Générateurs : esp- dans assets/exercices.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-spe-espace-1"] = {
  niveau: "Terminale spécialité",
  numero: 3,
  titre: "Géométrie dans l'espace 1 : vecteurs, droites et plans",
  accroche: "Passer du plan à l'espace : vecteurs à trois coordonnées, droites et plans qui se coupent, sont parallèles ou ne se rencontrent jamais, et la représentation paramétrique d'une droite.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le cours : vecteurs, droites et plans de l'espace (Yvan Monka)", url: "https://youtu.be/EoT48VtnUJ4", type: "video" },
    { titre: "Le cours : positions relatives et parallélisme (Yvan Monka)", url: "https://youtu.be/aostYZK5jkE", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Vecteurs de l'espace",
      video: { titre: "Vidéo d'Yvan Monka : représenter une combinaison linéaire de vecteurs dans l'espace", youtube: "https://youtu.be/Z83z54pkGqA" },
      texte:
        "Les vecteurs de l'espace se définissent et se manipulent comme dans le plan : un vecteur $\\overrightarrow{AB}$ a une direction, un sens et une longueur ; il correspond à la translation qui envoie $A$ sur $B$.\n\n" +
        "- **Relation de Chasles** : $\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$.\n" +
        "- **Combinaison linéaire** de $\\vec{u}$ et $\\vec{v}$ : tout vecteur $a\\vec{u} + b\\vec{v}$ avec $a$ et $b$ réels.\n" +
        "- $\\vec{u}$ et $\\vec{v}$ sont **colinéaires** si l'un est un multiple de l'autre : $\\vec{v} = k\\vec{u}$ (ou $\\vec{u} = \\vec{0}$).\n" +
        "- $A$, $B$, $C$ sont **alignés** si $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$ sont colinéaires.\n\n" +
        "Dans un cube $ABCDEFGH$, par exemple, $\\overrightarrow{AG} = \\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CG} = \\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AE}$.",
      exemple: {
        enonce: "Dans le cube $ABCDEFGH$, exprime $\\overrightarrow{EC}$ en fonction de $\\overrightarrow{AB}$, $\\overrightarrow{AD}$ et $\\overrightarrow{AE}$.",
        solution: "$\\overrightarrow{EC} = \\overrightarrow{EA} + \\overrightarrow{AB} + \\overrightarrow{BC}$ (Chasles).\n\nOr $\\overrightarrow{EA} = -\\overrightarrow{AE}$ et $\\overrightarrow{BC} = \\overrightarrow{AD}$, donc $\\overrightarrow{EC} = \\overrightarrow{AB} + \\overrightarrow{AD} - \\overrightarrow{AE}$."
      }
    },
    {
      titre: "Droites et plans de l'espace",
      video: { titre: "Vidéo d'Yvan Monka : démontrer que 4 points sont coplanaires", youtube: "https://youtu.be/9baU60ZNioo" },
      texte:
        "- Une **droite** est déterminée par un point $A$ et un **vecteur directeur** $\\vec{u}$ non nul : $M \\in d$ si et seulement si $\\overrightarrow{AM} = t\\vec{u}$ pour un réel $t$.\n" +
        "- Un **plan** est déterminé par un point $A$ et deux vecteurs **non colinéaires** $\\vec{u}$ et $\\vec{v}$ (on dit qu'ils dirigent le plan) : $M \\in \\mathcal{P}$ si et seulement si $\\overrightarrow{AM} = a\\vec{u} + b\\vec{v}$ pour des réels $a$ et $b$.\n" +
        "- Trois vecteurs sont **coplanaires** si l'un est une combinaison linéaire des deux autres.\n" +
        "- Quatre points $A$, $B$, $C$, $D$ sont coplanaires si $\\overrightarrow{AB}$, $\\overrightarrow{AC}$ et $\\overrightarrow{AD}$ sont coplanaires.\n\n" +
        "Pour montrer que $\\vec{w} = a\\vec{u} + b\\vec{v}$, on écrit l'égalité coordonnée par coordonnée : on obtient trois équations d'inconnues $a$ et $b$. On résout avec deux d'entre elles, puis on vérifie la troisième.",
      exemple: {
        enonce: "Les vecteurs $\\vec{u}(1\\,;0\\,;2)$, $\\vec{v}(0\\,;1\\,;-1)$ et $\\vec{w}(2\\,;3\\,;1)$ sont-ils coplanaires ?",
        solution: "On cherche $a$ et $b$ avec $\\vec{w} = a\\vec{u} + b\\vec{v}$ : $2 = a$, $3 = b$ et $1 = 2a - b$.\n\nAvec $a = 2$ et $b = 3$ : $2a - b = 1$, la troisième équation est vérifiée. Donc $\\vec{w} = 2\\vec{u} + 3\\vec{v}$ : les trois vecteurs sont coplanaires."
      }
    },
    {
      titre: "Positions relatives de droites et de plans",
      figure: "esp-cube",
      video: { titre: "Vidéo d'Yvan Monka : le cours sur les positions relatives et le parallélisme", youtube: "https://youtu.be/aostYZK5jkE" },
      texte:
        "**Deux droites** de l'espace sont :\n\n" +
        "- soit **coplanaires** (dans un même plan) : elles sont alors **sécantes** (un point commun) ou **parallèles** (strictement, ou confondues) ;\n" +
        "- soit **non coplanaires** : aucun plan ne les contient, elles n'ont aucun point commun sans être parallèles.\n\n" +
        "**Une droite et un plan** sont sécants (un seul point commun) ou parallèles (la droite peut être contenue dans le plan).\n\n" +
        "**Deux plans** sont sécants (leur intersection est une droite) ou parallèles (strictement, ou confondus).\n\n" +
        "Dans le cube, les diagonales $(AG)$ et $(BH)$ sont sécantes au centre du cube, alors que $(AB)$ et $(CG)$ sont non coplanaires.",
      exemple: {
        enonce: "Dans le cube $ABCDEFGH$, donne la position relative de $(AB)$ et $(HG)$, puis de $(AB)$ et $(FG)$.",
        solution: "$\\overrightarrow{HG} = \\overrightarrow{AB}$ et $H$ n'est pas sur $(AB)$ : $(AB)$ et $(HG)$ sont strictement parallèles (elles sont dans le plan $(ABG)$).\n\n$(AB)$ est dans le plan du bas, $(FG)$ dans celui du haut, et elles n'ont pas la même direction : elles sont non coplanaires."
      }
    },
    {
      titre: "Parallélisme dans l'espace",
      video: { titre: "Vidéo d'Yvan Monka : démontrer que deux plans sont parallèles (avec des vecteurs)", youtube: "https://youtu.be/6B1liGkQL8E" },
      texte:
        "- Deux droites sont parallèles si et seulement si leurs vecteurs directeurs sont **colinéaires**.\n" +
        "- Une droite est parallèle à un plan si et seulement si son vecteur directeur est une combinaison linéaire de deux vecteurs qui dirigent le plan.\n" +
        "- Deux plans sont parallèles si et seulement s'ils sont dirigés par les **mêmes** vecteurs : deux vecteurs non colinéaires de l'un dirigent aussi l'autre.\n" +
        "- Si deux plans sont parallèles, tout plan qui coupe l'un coupe l'autre, et les deux droites d'intersection sont parallèles.\n\n" +
        "**Théorème du toit** : si deux plans sécants contiennent deux droites parallèles, leur droite d'intersection est parallèle à ces deux droites.",
      exemple: {
        enonce: "Dans le cube $ABCDEFGH$, montre que les plans $(AFH)$ et $(BDG)$ sont parallèles.",
        solution: "$\\overrightarrow{AF} = \\overrightarrow{DG}$ (car $ADGF$ est un parallélogramme) et $\\overrightarrow{AH} = \\overrightarrow{BG}$ (car $ABGH$ en est un).\n\nLes vecteurs $\\overrightarrow{DG}$ et $\\overrightarrow{BG}$, non colinéaires, dirigent le plan $(BDG)$ : ils dirigent aussi $(AFH)$. Les deux plans sont parallèles (et distincts, car $A \\notin (BDG)$)."
      }
    },
    {
      titre: "Bases et repères de l'espace",
      video: { titre: "Vidéo d'Yvan Monka : lire les coordonnées dans l'espace", youtube: "https://youtu.be/PZeBXIhNBAk" },
      texte:
        "Trois vecteurs $\\vec{i}$, $\\vec{j}$, $\\vec{k}$ **non coplanaires** forment une **base** de l'espace : tout vecteur $\\vec{u}$ s'écrit de façon **unique** $\\vec{u} = x\\vec{i} + y\\vec{j} + z\\vec{k}$. Les réels $(x\\,;y\\,;z)$ sont les **coordonnées** de $\\vec{u}$.\n\n" +
        "Un point $O$ et une base forment un **repère** $(O\\,;\\vec{i},\\vec{j},\\vec{k})$. Les coordonnées du point $M$ sont celles du vecteur $\\overrightarrow{OM}$ : l'**abscisse** $x$, l'**ordonnée** $y$ et la **cote** $z$.\n\n" +
        "Dans le cube $ABCDEFGH$, le repère $(A\\,;\\overrightarrow{AB},\\overrightarrow{AD},\\overrightarrow{AE})$ donne $B(1\\,;0\\,;0)$, $D(0\\,;1\\,;0)$, $E(0\\,;0\\,;1)$ et $G(1\\,;1\\,;1)$. Le repère est **orthonormé** quand les trois vecteurs sont orthogonaux deux à deux et de longueur $1$ (c'est le cas dans un cube).",
      exemple: {
        enonce: "Dans le repère $(A\\,;\\overrightarrow{AB},\\overrightarrow{AD},\\overrightarrow{AE})$ du cube, donne les coordonnées de $F$, de $H$ et du centre $K$ de la face $BCGF$.",
        solution: "$\\overrightarrow{AF} = \\overrightarrow{AB} + \\overrightarrow{AE}$, donc $F(1\\,;0\\,;1)$. $\\overrightarrow{AH} = \\overrightarrow{AD} + \\overrightarrow{AE}$, donc $H(0\\,;1\\,;1)$.\n\n$K$ est le milieu de $[BG]$ : $K\\left(1\\,;\\dfrac{1}{2}\\,;\\dfrac{1}{2}\\right)$."
      }
    },
    {
      titre: "Calculer avec des coordonnées",
      video: { titre: "Vidéo d'Yvan Monka : décomposer un vecteur dans une base pour démontrer l'alignement", youtube: "https://youtu.be/i4jDkJNtzZg" },
      texte:
        "Dans un repère de l'espace, avec $A(x_A\\,;y_A\\,;z_A)$ et $B(x_B\\,;y_B\\,;z_B)$ :\n\n" +
        "- $\\overrightarrow{AB}(x_B - x_A\\,;y_B - y_A\\,;z_B - z_A)$ ;\n" +
        "- le milieu $I$ de $[AB]$ a pour coordonnées $\\left(\\dfrac{x_A + x_B}{2}\\,;\\dfrac{y_A + y_B}{2}\\,;\\dfrac{z_A + z_B}{2}\\right)$ ;\n" +
        "- $\\vec{u} + \\vec{v}$ et $k\\vec{u}$ se calculent coordonnée par coordonnée.\n\n" +
        "**Colinéarité** : $\\vec{v}$ est colinéaire à $\\vec{u}$ si ses trois coordonnées sont obtenues en multipliant celles de $\\vec{u}$ par **le même** réel $k$. Avec trois coordonnées, il ne suffit pas de comparer deux d'entre elles.",
      exemple: {
        enonce: "On donne $A(1\\,;-2\\,;3)$, $B(3\\,;0\\,;2)$ et $C(7\\,;4\\,;0)$. Les points $A$, $B$, $C$ sont-ils alignés ?",
        solution: "$\\overrightarrow{AB}(2\\,;2\\,;-1)$ et $\\overrightarrow{AC}(6\\,;6\\,;-3)$.\n\n$\\overrightarrow{AC} = 3\\overrightarrow{AB}$ (les trois coordonnées sont multipliées par $3$) : les vecteurs sont colinéaires, les points sont alignés."
      }
    },
    {
      titre: "Représentation paramétrique d'une droite",
      video: { titre: "Vidéo d'Yvan Monka : utiliser la représentation paramétrique d'une droite", youtube: "https://youtu.be/smCUbzJs9xo" },
      texte:
        "La droite $d$ passant par $A(x_A\\,;y_A\\,;z_A)$, de vecteur directeur $\\vec{u}(a\\,;b\\,;c)$, est l'ensemble des points $M$ tels que $\\overrightarrow{AM} = t\\vec{u}$, $t \\in \\mathbb{R}$, c'est-à-dire :\n\n" +
        "$\\begin{cases} x = x_A + at \\\\ y = y_A + bt \\\\ z = z_A + ct \\end{cases}$, $t \\in \\mathbb{R}$ (**représentation paramétrique** de $d$).\n\n" +
        "- Chaque valeur du **paramètre** $t$ donne un point de la droite ; $t = 0$ donne $A$.\n" +
        "- Pour savoir si un point est sur $d$, on cherche **un même** $t$ qui convient pour les trois lignes.\n" +
        "- Une droite a une infinité de représentations paramétriques (autre point, vecteur directeur colinéaire).\n" +
        "- Pour étudier la position de deux droites : on compare leurs vecteurs directeurs, puis on cherche un point commun (deux paramètres $t$ et $s$ différents !).",
      exemple: {
        enonce: "Donne une représentation paramétrique de la droite $(AB)$ avec $A(2\\,;-1\\,;0)$ et $B(3\\,;1\\,;-2)$. Le point $C(5\\,;5\\,;-6)$ est-il sur $(AB)$ ?",
        solution: "$\\overrightarrow{AB}(1\\,;2\\,;-2)$, d'où $\\begin{cases} x = 2 + t \\\\ y = -1 + 2t \\\\ z = -2t \\end{cases}$, $t \\in \\mathbb{R}$.\n\nPour $C$ : $5 = 2 + t$ donne $t = 3$ ; alors $y = -1 + 6 = 5$ et $z = -6$. Les trois lignes conviennent : $C \\in (AB)$."
      }
    },
    {
      titre: "Algorithmique : l'espace en Python",
      texte:
        "Un point ou un vecteur de l'espace se représente par une **liste** de trois nombres. Une liste construite « en compréhension » calcule les trois coordonnées d'un coup :\n\n" +
        "```python\ndef vecteur(A, B):\n    return [B[i] - A[i] for i in range(3)]\n\ndef point(A, u, t):\n    return [A[i] + t * u[i] for i in range(3)]\n```\n\n" +
        "- $\\texttt{vecteur([1, 2, 0], [4, 0, 5])}$ renvoie $\\texttt{[3, -2, 5]}$.\n" +
        "- $\\texttt{point(A, u, t)}$ donne le point de paramètre $t$ de la droite passant par $A$ de vecteur directeur $\\vec{u}$.\n" +
        "- Attention : en Python, la division $\\texttt{/}$ donne toujours un nombre décimal ($\\texttt{6 / 2}$ affiche $\\texttt{3.0}$).",
      exemple: {
        enonce: "Avec $\\texttt{A = [1, 0, -2]}$ et $\\texttt{u = [2, 1, 3]}$, que renvoie $\\texttt{point(A, u, -1)}$ ?",
        solution: "On calcule $A - \\vec{u}$ coordonnée par coordonnée : $1 - 2 = -1$, $0 - 1 = -1$ et $-2 - 3 = -5$.\n\nLa fonction renvoie $\\texttt{[-1, -1, -5]}$."
      }
    }
  ],

  videos: [
    { titre: "Exprimer une combinaison linéaire de vecteurs dans l'espace", type: "Vecteurs", youtube: "https://youtu.be/l4FeV0-otP4" },
    { titre: "Reconnaître une base de l'espace", type: "Repères", youtube: "https://youtu.be/5a9pE6XQna4" },
    { titre: "Décomposer un vecteur dans une base", type: "Repères", youtube: "https://youtu.be/5-f0sa5HJfg" },
    { titre: "Prépare ton bac : vecteurs de l'espace et représentations paramétriques", type: "Bac", youtube: "https://youtu.be/gYNat8r4XRE" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "esp-coord", titre: "Coordonnées de vecteurs et de milieux", etape: "Vecteurs et coordonnées", nb: 5 },
    { type: "esp-colineaires", titre: "Vecteurs colinéaires", etape: "Vecteurs et coordonnées", nb: 4 },
    { type: "esp-alignes", titre: "Points alignés", etape: "Vecteurs et coordonnées", nb: 4 },
    { type: "esp-decomposition", titre: "Vecteurs coplanaires", etape: "Vecteurs et coordonnées", nb: 4 },
    { type: "esp-repere", titre: "Coordonnées dans un cube", etape: "Droites et plans", nb: 5 },
    { type: "esp-cube", titre: "Positions relatives dans un cube", etape: "Droites et plans", nb: 6 },
    { type: "esp-param-point", titre: "Utiliser une représentation paramétrique", etape: "Représentations paramétriques", nb: 5 },
    { type: "esp-param-ecrire", titre: "Écrire une représentation paramétrique", etape: "Représentations paramétriques", nb: 4 },
    { type: "esp-positions", titre: "Position relative de deux droites", etape: "Représentations paramétriques", nb: 4 },
    { type: "esp-python", titre: "L'espace en Python", etape: "Algorithmique", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Dans le cube $ABCDEFGH$, $\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AE}$ est égal à :", choix: ["$\\overrightarrow{AG}$", "$\\overrightarrow{AC}$", "$\\overrightarrow{AH}$", "$\\overrightarrow{AF}$"], bonne: 0, explication: "$\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CG} = \\overrightarrow{AG}$, avec $\\overrightarrow{BC} = \\overrightarrow{AD}$ et $\\overrightarrow{CG} = \\overrightarrow{AE}$." },
    { question: "Deux droites de l'espace qui n'ont aucun point commun sont :", choix: ["strictement parallèles ou non coplanaires", "forcément parallèles", "forcément non coplanaires", "sécantes"], bonne: 0, explication: "Dans l'espace, pas de point commun ne veut pas dire parallèles : elles peuvent être non coplanaires." },
    { question: "Dans le cube $ABCDEFGH$, les droites $(AB)$ et $(CG)$ sont :", choix: ["non coplanaires", "sécantes", "strictement parallèles", "confondues"], bonne: 0, explication: "Elles n'ont pas la même direction et aucun plan ne les contient toutes les deux." },
    { question: "Dans le cube $ABCDEFGH$, les droites $(AB)$ et $(HG)$ sont :", choix: ["strictement parallèles", "sécantes", "non coplanaires", "confondues"], bonne: 0, explication: "$\\overrightarrow{HG} = \\overrightarrow{AB}$ : même direction, et $H \\notin (AB)$." },
    { question: "Dans le cube $ABCDEFGH$, la droite $(EG)$ et le plan $(ABC)$ sont :", choix: ["strictement parallèles", "sécants", "la droite est contenue dans le plan", "on ne peut pas savoir"], bonne: 0, explication: "$(EG)$ est parallèle à $(AC)$, qui est dans le plan $(ABC)$, et elle est dans le plan du haut." },
    { question: "Deux plans distincts et non parallèles se coupent selon :", choix: ["une droite", "un point", "deux droites", "un plan"], bonne: 0, explication: "L'intersection de deux plans sécants est une droite." },
    { question: "Un plan est déterminé par un point et :", choix: ["deux vecteurs non colinéaires", "un vecteur non nul", "deux vecteurs colinéaires", "trois vecteurs coplanaires quelconques"], bonne: 0, explication: "Il faut deux directions différentes : deux vecteurs non colinéaires." },
    { question: "On donne $A(2\\,;-1\\,;4)$ et $B(-1\\,;3\\,;4)$. Les coordonnées de $\\overrightarrow{AB}$ sont :", choix: ["$(-3\\,;4\\,;0)$", "$(3\\,;-4\\,;0)$", "$(1\\,;2\\,;8)$", "$(-3\\,;4\\,;8)$"], bonne: 0, explication: "Arrivée moins départ : $(-1 - 2\\,;3 - (-1)\\,;4 - 4)$." },
    { question: "Le milieu de $[AB]$ avec $A(1\\,;5\\,;-2)$ et $B(3\\,;-1\\,;6)$ est :", choix: ["$(2\\,;2\\,;2)$", "$(4\\,;4\\,;4)$", "$(1\\,;-3\\,;4)$", "$(2\\,;3\\,;2)$"], bonne: 0, explication: "Moyennes : $\\dfrac{1 + 3}{2} = 2$, $\\dfrac{5 - 1}{2} = 2$, $\\dfrac{-2 + 6}{2} = 2$." },
    { question: "Les vecteurs $\\vec{u}(2\\,;-1\\,;3)$ et $\\vec{v}(-4\\,;2\\,;-6)$ sont :", choix: ["colinéaires, car $\\vec{v} = -2\\vec{u}$", "non colinéaires", "colinéaires, car $\\vec{v} = 2\\vec{u}$", "orthogonaux"], bonne: 0, explication: "Les trois coordonnées sont multipliées par $-2$." },
    { question: "Les vecteurs $\\vec{u}(1\\,;2\\,;3)$ et $\\vec{v}(2\\,;4\\,;5)$ sont-ils colinéaires ?", choix: ["Non, car $5 \\neq 2 \\times 3$", "Oui, car $2 = 2 \\times 1$ et $4 = 2 \\times 2$", "Oui, car ils ont la même direction", "On ne peut pas savoir"], bonne: 0, explication: "Il faut le même coefficient pour les **trois** coordonnées : $2$, $2$, mais pas pour la troisième." },
    { question: "Pour quelle valeur de $m$ les vecteurs $\\vec{u}(1\\,;m\\,;-2)$ et $\\vec{v}(3\\,;6\\,;-6)$ sont-ils colinéaires ?", choix: ["$m = 2$", "$m = 6$", "$m = -2$", "$m = 3$"], bonne: 0, explication: "$\\vec{v} = 3\\vec{u}$ (première et troisième coordonnées), donc $6 = 3m$." },
    { question: "Trois vecteurs $\\vec{u}$, $\\vec{v}$, $\\vec{w}$ sont coplanaires lorsque :", choix: ["l'un est une combinaison linéaire des deux autres", "ils sont deux à deux colinéaires", "ils sont tous non nuls", "ils ont la même longueur"], bonne: 0, explication: "Par exemple $\\vec{w} = a\\vec{u} + b\\vec{v}$." },
    { question: "Dans le repère $(A\\,;\\overrightarrow{AB},\\overrightarrow{AD},\\overrightarrow{AE})$ du cube $ABCDEFGH$, le point $G$ a pour coordonnées :", choix: ["$(1\\,;1\\,;1)$", "$(1\\,;1\\,;0)$", "$(0\\,;1\\,;1)$", "$(1\\,;0\\,;1)$"], bonne: 0, explication: "$\\overrightarrow{AG} = \\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AE}$." },
    { question: "Dans ce même repère, le centre du cube a pour coordonnées :", choix: ["$\\left(\\dfrac{1}{2}\\,;\\dfrac{1}{2}\\,;\\dfrac{1}{2}\\right)$", "$(1\\,;1\\,;1)$", "$\\left(\\dfrac{1}{2}\\,;\\dfrac{1}{2}\\,;0\\right)$", "$(0\\,;0\\,;0)$"], bonne: 0, explication: "C'est le milieu de la diagonale $[AG]$, avec $A(0\\,;0\\,;0)$ et $G(1\\,;1\\,;1)$." },
    { question: "Trois vecteurs forment une base de l'espace lorsqu'ils sont :", choix: ["non coplanaires", "non nuls", "deux à deux non colinéaires", "de même longueur"], bonne: 0, explication: "Trois vecteurs deux à deux non colinéaires peuvent être coplanaires : il faut qu'ils soient non coplanaires." },
    { question: "Une représentation paramétrique de la droite passant par $A(1\\,;0\\,;-1)$ de vecteur directeur $\\vec{u}(2\\,;-3\\,;1)$ est :", choix: ["$\\begin{cases} x = 1 + 2t \\\\ y = -3t \\\\ z = -1 + t \\end{cases}$", "$\\begin{cases} x = 2 + t \\\\ y = -3 \\\\ z = 1 - t \\end{cases}$", "$\\begin{cases} x = 1 + 2t \\\\ y = 3t \\\\ z = -1 + t \\end{cases}$", "$\\begin{cases} x = 2t \\\\ y = -3t \\\\ z = t \\end{cases}$"], bonne: 0, explication: "$x = x_A + at$, $y = y_A + bt$, $z = z_A + ct$." },
    { question: "La droite $d : \\begin{cases} x = 1 + t \\\\ y = 2 - t \\\\ z = 3t \\end{cases}$ passe par le point :", choix: ["$(3\\,;0\\,;6)$", "$(1\\,;-1\\,;3)$", "$(2\\,;1\\,;6)$", "$(3\\,;0\\,;3)$"], bonne: 0, explication: "Pour $t = 2$ : $x = 3$, $y = 0$, $z = 6$. Pour le troisième choix, $x = 2$ donne $t = 1$, mais alors $z = 3$." },
    { question: "Un vecteur directeur de la droite $\\begin{cases} x = 4 - 2t \\\\ y = 1 + t \\\\ z = 5 \\end{cases}$ est :", choix: ["$(-2\\,;1\\,;0)$", "$(4\\,;1\\,;5)$", "$(-2\\,;1\\,;5)$", "$(2\\,;1\\,;0)$"], bonne: 0, explication: "On lit les coefficients de $t$ : $-2$, $1$ et $0$ (car $z$ ne dépend pas de $t$)." },
    { question: "Deux droites ont pour vecteurs directeurs $(1\\,;2\\,;-1)$ et $(-3\\,;-6\\,;3)$. Elles sont :", choix: ["parallèles (strictement ou confondues)", "sécantes", "non coplanaires", "on ne peut rien dire"], bonne: 0, explication: "Les vecteurs sont colinéaires (coefficient $-3$) : les droites sont parallèles. Il faut un point pour savoir si elles sont confondues." },
    { question: "Pour chercher le point commun de $d_1$ (paramètre $t$) et $d_2$ (paramètre $s$), on :", choix: ["résout un système d'inconnues $t$ et $s$", "pose $t = s$", "compare leurs vecteurs directeurs", "additionne les deux représentations"], bonne: 0, explication: "Un point commun n'a pas forcément le même paramètre sur les deux droites : on garde deux inconnues." },
    { question: "Les points $A(0\\,;1\\,;2)$, $B(1\\,;3\\,;3)$ et $C(3\\,;7\\,;5)$ sont :", choix: ["alignés", "non alignés", "confondus", "coplanaires mais non alignés"], bonne: 0, explication: "$\\overrightarrow{AB}(1\\,;2\\,;1)$ et $\\overrightarrow{AC}(3\\,;6\\,;3) = 3\\overrightarrow{AB}$." },
    { question: "Que renvoie $\\texttt{[2 * x for x in [1, -3, 4]]}$ ?", choix: ["$\\texttt{[2, -6, 8]}$", "$\\texttt{[1, -3, 4, 1, -3, 4]}$", "$\\texttt{[3, -1, 6]}$", "$\\texttt{4}$"], bonne: 0, explication: "On multiplie chaque élément de la liste par $2$ : c'est le vecteur $2\\vec{u}$." },
    { question: "Dans le cube $ABCDEFGH$, les plans $(ABC)$ et $(EFG)$ sont :", choix: ["strictement parallèles", "sécants", "confondus", "perpendiculaires"], bonne: 0, explication: "Ce sont les faces du bas et du haut : même direction, aucun point commun." },
    { question: "Dans le cube $ABCDEFGH$, les plans $(ABF)$ et $(BCG)$ se coupent selon la droite :", choix: ["$(BF)$", "$(AB)$", "$(BC)$", "$(FG)$"], bonne: 0, explication: "$B$ et $F$ sont dans les deux plans (faces de devant et de droite)." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Étudier la position relative de deux droites",
      etapes: [
        "Lire un vecteur directeur de chaque droite (coefficients du paramètre).",
        "S'ils sont colinéaires : les droites sont parallèles. Tester un point de l'une sur l'autre : confondues ou strictement parallèles.",
        "Sinon : écrire le système des trois équations avec **deux paramètres différents** $t$ et $s$.",
        "Résoudre avec deux équations, puis tester la troisième : vérifiée → sécantes (calculer le point) ; non vérifiée → non coplanaires."
      ],
      exemple: "$d_1 : x = t,\\ y = 1 + t,\\ z = 2t$ et $d_2 : x = 1 + s,\\ y = 0,\\ z = s$. Les deux premières équations donnent $t = -1$ et $s = -2$ ; la troisième est vérifiée ($2t = -2 = s$) : elles sont sécantes en $(-1\\,;0\\,;-2)$."
    },
    {
      titre: "Démontrer que des vecteurs sont coplanaires",
      etapes: [
        "Chercher $a$ et $b$ tels que $\\vec{w} = a\\vec{u} + b\\vec{v}$.",
        "Écrire l'égalité coordonnée par coordonnée : trois équations, deux inconnues.",
        "Résoudre le système avec deux équations.",
        "Vérifier la troisième : si elle est vraie, les vecteurs sont coplanaires ; sinon, ils ne le sont pas."
      ],
      exemple: "Pour quatre points $A$, $B$, $C$, $D$ : on teste $\\overrightarrow{AD} = a\\overrightarrow{AB} + b\\overrightarrow{AC}$."
    },
    {
      titre: "Écrire et utiliser une représentation paramétrique",
      etapes: [
        "Trouver un point $A$ de la droite et un vecteur directeur $\\vec{u}(a\\,;b\\,;c)$ (par exemple $\\overrightarrow{AB}$).",
        "Écrire $x = x_A + at$, $y = y_A + bt$, $z = z_A + ct$, $t \\in \\mathbb{R}$.",
        "Pour tester un point : trouver $t$ avec une ligne, puis vérifier les deux autres avec **le même** $t$.",
        "Pour obtenir un point : choisir une valeur de $t$ et calculer."
      ],
      exemple: "$A(1\\,;2\\,;0)$, $B(2\\,;0\\,;3)$ : $\\overrightarrow{AB}(1\\,;-2\\,;3)$, donc $x = 1 + t$, $y = 2 - 2t$, $z = 3t$."
    },
    {
      titre: "Raisonner dans un cube",
      etapes: [
        "Repérer les faces : deux droites d'une même face sont coplanaires.",
        "Utiliser les égalités de vecteurs : $\\overrightarrow{AB} = \\overrightarrow{DC} = \\overrightarrow{EF} = \\overrightarrow{HG}$, etc.",
        "En cas de doute, se placer dans le repère $(A\\,;\\overrightarrow{AB},\\overrightarrow{AD},\\overrightarrow{AE})$ et calculer.",
        "Faire une figure à main levée en marquant les droites ou les plans étudiés."
      ],
      exemple: "$(AH)$ et $(BG)$ : $\\overrightarrow{BG} = \\overrightarrow{AH}$, donc elles sont parallèles (et distinctes)."
    }
  ],
  erreurs: [
    "Croire que deux droites sans point commun sont forcément parallèles : dans l'espace, elles peuvent être non coplanaires.",
    "Vérifier la colinéarité sur deux coordonnées seulement : il en faut trois.",
    "Utiliser le même paramètre $t$ pour deux droites différentes quand on cherche leur intersection.",
    "Prendre les coordonnées d'un point comme vecteur directeur (ou l'inverse) dans une représentation paramétrique.",
    "Calculer $\\overrightarrow{AB}$ avec « départ moins arrivée ».",
    "Croire qu'une droite n'a qu'une seule représentation paramétrique.",
    "Oublier de vérifier la troisième équation d'un système.",
    "Confondre « parallèle à un plan » et « contenue dans un plan »."
  ]
};
