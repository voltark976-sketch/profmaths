/*
  CHAPITRE : 3e — Notion de fonction
  -----------------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 3e en 2026-2027 (brevet 2027) : dépendance d'une
  grandeur à une autre ; notations f(x) et x ↦ f(x) ; image et antécédent ; passer d'un mode de représentation à
  un autre (expression, tableau de valeurs, courbe). Vidéos et cours PDF d'Yvan Monka.
  figure : courbes dessinées avec repere3() (assets/exercices-troisieme.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["troisieme-fonctions"] = {
  niveau: "3e",
  numero: 6,
  titre: "Notion de fonction",
  accroche: "Image, antécédent, tableau de valeurs et courbe : lire et calculer avec une fonction.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : notion de fonction (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Notion_fonction.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : notion de fonction (Yvan Monka)", url: "https://youtu.be/E4SY8_L-DTA", type: "video" },
    { titre: "Calculer un antécédent par une fonction (Yvan Monka)", url: "https://youtu.be/0NakIDu5dQU", type: "video" },
    { titre: "Représenter graphiquement une fonction (Yvan Monka)", url: "https://youtu.be/xHJNdrhzY4Q", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Image par une fonction",
      video: { titre: "Vidéo d'Yvan Monka : calculer une image par une fonction", youtube: "https://youtu.be/FjqPwHS7vE8" },
      texte:
        "Une **fonction** $f$ associe à chaque nombre $x$ un unique nombre noté $f(x)$, son **image**. On note $f : x \\mapsto f(x)$.\n\n" +
        "Avec $f(x) = x^2 - 3x$ : $f(-2) = (-2)^2 - 3 \\times (-2) = 4 + 6 = 10$. L'image de $-2$ est $10$.\n\n" +
        "On remplace $x$ par le nombre, **entre parenthèses** s'il est négatif.\n\n" +
        "On peut voir une fonction comme une machine : le nombre de départ entre, l'image sort. Une fonction peut aussi être donnée par un **programme de calcul**, un **tableau de valeurs** ou une **courbe**.",
      figure: "fn3-cours-machine",
      exemple: {
        enonce: "$g(x) = 2x^2 + 1$. Calcule $g(3)$.",
        solution: "$g(3) = 2 \\times 9 + 1 = 19$."
      }
    },
    {
      titre: "Antécédent",
      video: { titre: "Vidéo d'Yvan Monka : image et antécédent dans un tableau", youtube: "https://youtu.be/EOS5bSPTZjg" },
      texte:
        "Si $f(a) = b$, on dit que $b$ est **l'image** de $a$ et que $a$ est **un antécédent** de $b$.\n\n" +
        "Un nombre a **une seule** image, mais il peut avoir **zéro, un ou plusieurs** antécédents.\n\n" +
        "Pour trouver un antécédent de $k$ par le calcul, on résout l'équation $f(x) = k$. Dans un tableau, on cherche $k$ sur la ligne des images.\n\n" +
        "Le diagramme en flèches de la fonction $x \\mapsto x^2$ montre que $4$ a deux antécédents, $-2$ et $2$, alors que chaque nombre de départ n'a qu'une seule image.",
      figure: "fn3-cours-fleches",
      exemple: {
        enonce: "$h(x) = 3x - 5$. Quel est l'antécédent de $7$ ?",
        solution: "$3x - 5 = 7$, $3x = 12$, $x = 4$."
      }
    },
    {
      titre: "Courbe représentative",
      video: { titre: "Vidéo d'Yvan Monka : lire graphiquement une image et un antécédent", youtube: "https://youtu.be/gQUt5y8LFKk" },
      texte:
        "La **courbe** de $f$ est formée des points de coordonnées $(x ; f(x))$.\n\n" +
        "- **image** de $a$ : on part de $a$ sur l'axe des abscisses, on rejoint la courbe, on lit l'ordonnée ;\n" +
        "- **antécédents** de $k$ : on trace la droite horizontale d'ordonnée $k$ et on lit les abscisses des points d'intersection avec la courbe.\n\n" +
        "Sur la figure : en partant de $3$, on lit $f(3) = 1$ ; la droite d'ordonnée $1$ coupe la courbe en $x = -1$ et $x = 3$, ce sont les deux antécédents de $1$.",
      figure: "fn3-cours-courbe",
      exemple: {
        enonce: "Le point $A(2 ; -1)$ est sur la courbe de $f$. Que peut-on dire ?",
        solution: "$f(2) = -1$ : l'image de $2$ est $-1$ et $2$ est un antécédent de $-1$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "fn3-image", titre: "Calculer une image ou un antécédent", etape: "Calculer", nb: 6 },
    { type: "fn3-tableau", titre: "Lire un tableau de valeurs", etape: "Tableau", nb: 5 },
    { type: "fn3-graphe", titre: "Lire une courbe", etape: "Courbe", nb: 6 },
    { type: "fn3-vocab", titre: "Vocabulaire et notations", etape: "Courbe", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "$f(x) = 3x - 4$. L'image de $2$ est :", choix: ["$2$", "$-2$", "$10$", "$6$"], bonne: 0, explication: "$3 \\times 2 - 4$." },
    { question: "$f(x) = x^2 + 1$. $f(-3)$ vaut :", choix: ["$10$", "$-8$", "$7$", "$-5$"], bonne: 0, explication: "$(-3)^2 + 1 = 9 + 1$." },
    { question: "$f(5) = 2$ signifie :", choix: ["l'image de $5$ est $2$", "l'image de $2$ est $5$", "$f$ vaut $10$", "$5$ est l'image de $2$"], bonne: 0, explication: "Le nombre entre parenthèses est le départ." },
    { question: "Si $f(4) = -1$, alors :", choix: ["$4$ est un antécédent de $-1$", "$-1$ est un antécédent de $4$", "$f(-1) = 4$", "$4$ est l'image de $-1$"], bonne: 0, explication: "$4$ est le nombre de départ." },
    { question: "$g(x) = 2x + 6$. L'antécédent de $0$ est :", choix: ["$-3$", "$6$", "$3$", "$0$"], bonne: 0, explication: "$2x + 6 = 0$." },
    { question: "Un nombre peut avoir :", choix: ["une seule image", "plusieurs images", "aucune image et deux antécédents seulement", "toujours deux antécédents"], bonne: 0, explication: "Une fonction donne une seule image." },
    { question: "Le point $(3 ; 7)$ est sur la courbe de $f$. Donc :", choix: ["$f(3) = 7$", "$f(7) = 3$", "$f(3) = 3$", "$f(10) = 0$"], bonne: 0, explication: "Abscisse $x$, ordonnée $f(x)$." },
    { question: "Pour lire l'image de $2$ sur une courbe, on part :", choix: ["de $2$ sur l'axe des abscisses", "de $2$ sur l'axe des ordonnées", "de l'origine", "du point le plus haut"], bonne: 0, explication: "On part de l'abscisse." },
    { question: "Pour lire les antécédents de $5$ sur une courbe, on trace :", choix: ["la droite horizontale d'ordonnée $5$", "la droite verticale d'abscisse $5$", "la diagonale", "la tangente"], bonne: 0, explication: "On cherche les points d'ordonnée $5$." },
    { question: "$f : x \\mapsto x^2$. Les antécédents de $9$ sont :", choix: ["$3$ et $-3$", "$81$", "$3$ seulement", "$4{,}5$"], bonne: 0, explication: "$x^2 = 9$." },
    { question: "« Multiplier par $4$ puis soustraire $1$ » correspond à :", choix: ["$f(x) = 4x - 1$", "$f(x) = 4(x - 1)$", "$f(x) = x - 4$", "$f(x) = 3x$"], bonne: 0, explication: "On multiplie d'abord." },
    { question: "Dans un tableau de valeurs, l'image de $x$ se lit :", choix: ["sous $x$, sur la ligne $f(x)$", "au-dessus de $x$", "dans la première colonne", "à la fin du tableau"], bonne: 0, explication: "Deuxième ligne." },
    { question: "D'après la courbe, l'image de $3$ par $f$ est :", figure: "fn3-cours-courbe", choix: ["$1$", "$3$", "$-1$", "$6$"], bonne: 0, explication: "On part de $3$ sur l'axe des abscisses, on monte jusqu'à la courbe et on lit l'ordonnée : $1$." },
    { question: "D'après la courbe, les antécédents de $1$ par $f$ sont :", figure: "fn3-cours-courbe", choix: ["$-1$ et $3$", "$1$ seulement", "$3$ seulement", "$-2$ et $4$"], bonne: 0, explication: "La droite horizontale d'ordonnée $1$ coupe la courbe en deux points, d'abscisses $-1$ et $3$." },
    { question: "D'après ce diagramme, les antécédents de $4$ sont :", figure: "fn3-cours-fleches", choix: ["$-2$ et $2$", "$16$", "$2$ seulement", "$0$"], bonne: 0, explication: "Deux flèches arrivent sur $4$ : elles partent de $-2$ et de $2$." },
    { question: "$f(x) = -2x + 7$. $f(-3)$ vaut :", choix: ["$13$", "$1$", "$-13$", "$4$"], bonne: 0, explication: "$-2 \\times (-3) + 7 = 6 + 7 = 13$." },
    { question: "$f(x) = x^2 - 5$. L'image de $-1$ est :", choix: ["$-4$", "$-6$", "$4$", "$-3$"], bonne: 0, explication: "$(-1)^2 - 5 = 1 - 5 = -4$." },
    { question: "$g(x) = 4x - 3$. L'antécédent de $9$ est :", choix: ["$3$", "$33$", "$1{,}5$", "$9$"], bonne: 0, explication: "$4x - 3 = 9$, donc $4x = 12$ et $x = 3$." },
    { question: "Dans un tableau, $f(2) = 7$ et $f(5) = 7$. Le nombre $7$ a :", choix: ["au moins deux antécédents : $2$ et $5$", "deux images", "une seule image : $2$", "aucun antécédent"], bonne: 0, explication: "$2$ et $5$ ont la même image $7$ : ce sont deux antécédents de $7$." },
    { question: "La fonction qui, à un nombre, associe son triple diminué de $1$ est :", choix: ["$x \\mapsto 3x - 1$", "$x \\mapsto 3(x - 1)$", "$x \\mapsto x - 3$", "$x \\mapsto x^3 - 1$"], bonne: 0, explication: "Le triple de $x$ est $3x$ ; diminué de $1$ : $3x - 1$." },
    { question: "Quel nombre sort de cette machine ?", figure: "fn3-qcm-machine", choix: ["$31$", "$63$", "$15$", "$7$"], bonne: 0, explication: "$2 \\times 4^2 - 1 = 2 \\times 16 - 1 = 31$." },
    { question: "Le point $A(-2 ; 5)$ est sur la courbe de $f$. On peut écrire :", choix: ["$f(-2) = 5$", "$f(5) = -2$", "$f(-2) = -5$", "$f(0) = 5$"], bonne: 0, explication: "L'abscisse est le nombre de départ, l'ordonnée son image." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Image et antécédent par le calcul",
      etapes: [
        "Image de $a$ : remplace $x$ par $a$ (entre parenthèses) et calcule en respectant les priorités.",
        "Antécédent de $k$ : résous l'équation $f(x) = k$.",
        "Vérifie en recalculant l'image de la solution trouvée."
      ],
      figure: "fn3-cours-machine",
      exemple: "$f(x) = 5x + 2$ : $f(-1) = -3$ ; $5x + 2 = 12$ donne $x = 2$."
    },
    {
      titre: "Lire une courbe",
      etapes: [
        "Image : pars de l'abscisse, rejoins la courbe verticalement, lis l'ordonnée.",
        "Antécédents : pars de l'ordonnée, trace l'horizontale, lis les abscisses des intersections.",
        "Il peut y avoir plusieurs antécédents, ou aucun."
      ],
      figure: "fn3-cours-courbe",
      exemple: "Sur la figure, l'horizontale d'ordonnée $1$ coupe la courbe en $x = -1$ et $x = 3$ : deux antécédents."
    }
  ],
  erreurs: [
    "Confondre image et antécédent.",
    "Oublier les parenthèses autour d'un nombre négatif : $-3^2 \\neq (-3)^2$.",
    "Lire l'image sur l'axe des abscisses au lieu de l'axe des ordonnées.",
    "N'indiquer qu'un seul antécédent alors qu'il y en a plusieurs.",
    "Croire qu'un nombre peut avoir deux images."
  ]
};
