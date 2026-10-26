/*
  CHAPITRE : CM1 — Les aires
  ---------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM1 : notion d'aire ; comparer des aires (superposition, découpage,
  pavage) ; mesurer une aire en comptant des unités (carreaux, cm²) ; distinguer aire et périmètre. Pas de formule
  d'aire au CM1.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm1-aires"] = {
  niveau: "CM1",
  numero: 11,
  titre: "Les aires",
  accroche: "L'aire, c'est la place qu'occupe une surface : on la mesure en comptant des carreaux.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Comparer et mesurer une aire",
      video: { titre: "Vidéo de « Maths et Jeux » : comparer des surfaces selon leurs aires", youtube: "https://youtu.be/vaUZ-qDI5y4" },
      texte:
        "L'**aire** d'une figure, c'est la mesure de sa **surface** (l'intérieur).\n\n" +
        "Pour la mesurer, on compte combien de fois une unité tient dedans. Sur un quadrillage de carreaux de $1$ cm de côté, chaque carreau a une aire de $1$ **centimètre carré** ($1$ cm²).\n\n" +
        "Les deux figures coloriées ont la **même aire** ($6$ carreaux, soit $6$ cm²), même si elles n'ont pas la même forme.",
      figure: "m1s-cours-aire",
      exemple: { enonce: "Un rectangle colorié fait $3$ rangées de $4$ carreaux de $1$ cm². Son aire ?", solution: "$3$ rangées de $4$ : $12$ carreaux, soit $12$ cm²." }
    },
    {
      titre: "Aire ou périmètre ?",
      video: { titre: "Vidéo de Maître Lucas : différencier l'aire et le périmètre", youtube: "https://youtu.be/UkeNJRRBMOg" },
      texte:
        "- Le **périmètre** est la longueur du **tour** : il se mesure en cm, m…\n" +
        "- L'**aire** est la mesure de l'**intérieur** : elle se mesure en carreaux, en cm²…\n\n" +
        "Un rectangle de $4$ carreaux sur $3$ (carreaux de $1$ cm) : aire $12$ cm², périmètre $4 + 3 + 4 + 3 = 14$ cm.\n\n" +
        "Deux figures peuvent avoir la même aire et des périmètres différents !",
      exemple: { enonce: "Un rectangle de $6$ carreaux sur $1$ et un rectangle de $3$ carreaux sur $2$ : compare.", solution: "Même aire ($6$ cm²) ; périmètres $14$ cm et $10$ cm." }
    }
  ],
  exercices: [
    { type: "m1s-carreaux", titre: "Compter les carreaux, comparer", etape: "Mesurer", nb: 6 },
    { type: "m1s-rectangles", titre: "Aire et périmètre d'un rectangle", etape: "Aire ou périmètre", nb: 6 },
    { type: "m1l-perimetre", titre: "Révision : le périmètre", etape: "Aire ou périmètre", nb: 4 }
  ],
  qcm: [
    { question: "L'aire d'une figure, c'est :", choix: ["la mesure de sa surface", "la longueur de son tour", "le nombre de ses côtés", "sa hauteur"], bonne: 0, explication: "On mesure l'intérieur." },
    { question: "Le périmètre d'une figure, c'est :", choix: ["la longueur de son tour", "la mesure de sa surface", "le nombre de carreaux", "sa couleur"], bonne: 0, explication: "On fait le tour." },
    { question: "Un carreau de $1$ cm de côté a une aire de :", choix: ["$1$ cm²", "$4$ cm", "$1$ cm", "$4$ cm²"], bonne: 0, explication: "C'est l'unité : le centimètre carré." },
    { question: "Une figure de $15$ carreaux de $1$ cm² a une aire de :", choix: ["$15$ cm²", "$15$ cm", "$60$ cm²", "$30$ cm²"], bonne: 0, explication: "On compte les carreaux." },
    { question: "Un rectangle de $4$ carreaux sur $3$ a une aire de :", choix: ["$12$ cm²", "$14$ cm²", "$7$ cm²", "$24$ cm²"], bonne: 0, explication: "$3$ rangées de $4$." },
    { question: "Le même rectangle ($4$ sur $3$) a un périmètre de :", choix: ["$14$ cm", "$12$ cm", "$7$ cm", "$24$ cm"], bonne: 0, explication: "$4 + 3 + 4 + 3$." },
    { question: "Deux figures de formes différentes peuvent-elles avoir la même aire ?", choix: ["oui, si elles ont autant de carreaux", "non, jamais", "seulement si ce sont des carrés"], bonne: 0, explication: "On compare le nombre de carreaux." },
    { question: "Un rectangle de $6$ sur $1$ et un de $3$ sur $2$ ont :", choix: ["la même aire mais pas le même périmètre", "le même périmètre mais pas la même aire", "la même aire et le même périmètre", "rien en commun"], bonne: 0, explication: "Aire $6$ cm² ; périmètres $14$ cm et $10$ cm." },
    { question: "Pour comparer deux aires, on peut :", choix: ["superposer ou découper les figures", "mesurer seulement un côté", "compter les sommets", "peser la règle"], bonne: 0, explication: "On regarde si l'une tient dans l'autre." },
    { question: "Un carré de $5$ carreaux de côté contient :", choix: ["$25$ carreaux", "$20$ carreaux", "$10$ carreaux", "$5$ carreaux"], bonne: 0, explication: "$5$ rangées de $5$." },
    { question: "On découpe une figure et on recolle les morceaux autrement. Son aire :", choix: ["ne change pas", "double", "diminue", "devient nulle"], bonne: 0, explication: "On n'a rien enlevé ni ajouté." },
    { question: "L'unité cm² sert à mesurer :", choix: ["une aire", "une longueur", "une masse", "une durée"], bonne: 0, explication: "Centimètre carré." },
    { question: "Une figure A a $12$ carreaux, une figure B a $9$ carreaux. Laquelle a la plus grande aire ?", choix: ["A", "B", "elles ont la même aire"], bonne: 0, explication: "$12 > 9$." },
    { question: "Un rectangle de $2$ carreaux sur $8$ a une aire de :", choix: ["$16$ cm²", "$20$ cm²", "$10$ cm²", "$28$ cm²"], bonne: 0, explication: "$2$ rangées de $8$." },
    { question: "Un demi-carreau de $1$ cm² a une aire de :", choix: ["la moitié de $1$ cm²", "$2$ cm²", "$1$ cm²", "$0$ cm²"], bonne: 0, explication: "Deux demi-carreaux font un carreau." },
    { question: "Pour mettre une clôture autour d'un jardin, on a besoin :", choix: ["du périmètre", "de l'aire", "de la masse", "du volume"], bonne: 0, explication: "La clôture fait le tour." },
    { question: "Pour recouvrir le sol de carrelage, on a besoin :", choix: ["de l'aire", "du périmètre", "de la longueur seulement", "de la contenance"], bonne: 0, explication: "Le carrelage recouvre la surface." },
    { question: "Un rectangle de $5$ carreaux sur $2$ a un périmètre de :", choix: ["$14$ cm", "$10$ cm", "$7$ cm", "$20$ cm"], bonne: 0, explication: "$5 + 2 + 5 + 2$." }
  ],
  methode: [
    { titre: "Mesurer une aire sur un quadrillage", etapes: ["Vérifie l'unité : quelle aire a un carreau ?", "Compte les carreaux ligne par ligne (deux demi-carreaux font un carreau).", "Écris le résultat avec l'unité (cm²)."], figure: "m1s-cours-aire", exemple: "$6$ carreaux de $1$ cm² : $6$ cm²." }
  ],
  erreurs: ["Confondre aire et périmètre.", "Compter les carreaux du bord seulement.", "Écrire « cm » pour une aire au lieu de « cm² ».", "Croire que deux figures de formes différentes ne peuvent pas avoir la même aire."]
};
