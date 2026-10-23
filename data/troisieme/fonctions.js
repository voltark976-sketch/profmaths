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
        "On remplace $x$ par le nombre, **entre parenthèses** s'il est négatif.",
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
        "Pour trouver un antécédent de $k$ par le calcul, on résout l'équation $f(x) = k$. Dans un tableau, on cherche $k$ sur la ligne des images.",
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
        "- **antécédents** de $k$ : on trace la droite horizontale d'ordonnée $k$ et on lit les abscisses des points d'intersection avec la courbe.",
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
    { question: "Dans un tableau de valeurs, l'image de $x$ se lit :", choix: ["sous $x$, sur la ligne $f(x)$", "au-dessus de $x$", "dans la première colonne", "à la fin du tableau"], bonne: 0, explication: "Deuxième ligne." }
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
      exemple: "$f(x) = 5x + 2$ : $f(-1) = -3$ ; $5x + 2 = 12$ donne $x = 2$."
    },
    {
      titre: "Lire une courbe",
      etapes: [
        "Image : pars de l'abscisse, rejoins la courbe verticalement, lis l'ordonnée.",
        "Antécédents : pars de l'ordonnée, trace l'horizontale, lis les abscisses des intersections.",
        "Il peut y avoir plusieurs antécédents, ou aucun."
      ],
      exemple: "L'horizontale $y = 2$ coupe la courbe en $x = -1$ et $x = 3$ : deux antécédents."
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
