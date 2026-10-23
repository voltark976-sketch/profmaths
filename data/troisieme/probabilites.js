/*
  CHAPITRE : 3e — Probabilités
  -----------------------------
  Programme de mathématiques du cycle 4 (2020), en vigueur en 3e en 2026-2027 (brevet 2027) : calculer des
  probabilités dans des situations simples, y compris non équiprobables ; événement contraire ; expériences à
  deux épreuves (arbre, tableau à double entrée) ; faire le lien entre fréquence et probabilité.
  Vidéos et cours PDF d'Yvan Monka.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["troisieme-probabilites"] = {
  niveau: "3e",
  numero: 9,
  titre: "Probabilités",
  accroche: "Événement contraire, expériences à deux épreuves avec arbres et tableaux, fréquences et probabilités.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : probabilités (PDF)", url: "https://www.maths-et-tiques.fr/telech/19Proba3e.pdf" }
  ],
  liens: [
    { titre: "Le cours en vidéo : probabilités (Yvan Monka)", url: "https://youtu.be/CBtj0nLx-N4", type: "video" },
    { titre: "Probabilités : cas de non-équiprobabilité (Yvan Monka)", url: "https://youtu.be/D00GFy0Rx6U", type: "video" },
    { titre: "Simuler une expérience aléatoire avec le tableur (Yvan Monka)", url: "https://youtu.be/ieKedDC3xNc", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Probabilité et événement contraire",
      video: { titre: "Vidéo d'Yvan Monka : calculer une probabilité à l'aide de l'événement contraire", youtube: "https://youtu.be/3u_yFS-xiHc" },
      texte:
        "Quand toutes les issues ont la même chance (**équiprobabilité**) : $P(A) = \\dfrac{\\text{nombre d'issues favorables}}{\\text{nombre total d'issues}}$.\n\n" +
        "Une probabilité est comprise entre $0$ (événement impossible) et $1$ (événement certain). La somme des probabilités de toutes les issues vaut $1$.\n\n" +
        "L'**événement contraire** de $A$, noté $\\overline{A}$, a pour probabilité $P(\\overline{A}) = 1 - P(A)$.",
      exemple: {
        enonce: "Un dé est truqué : $P(6) = 0{,}3$. Quelle est la probabilité de ne pas obtenir $6$ ?",
        solution: "$1 - 0{,}3 = 0{,}7$."
      }
    },
    {
      titre: "Expériences à deux épreuves",
      video: { titre: "Vidéo d'Yvan Monka : calculer une probabilité avec un tableau à double entrée", youtube: "https://youtu.be/5DGQ-49xzgI" },
      texte:
        "- Un **tableau à double entrée** liste toutes les issues : avec deux dés, il y a $6 \\times 6 = 36$ issues équiprobables.\n" +
        "- Un **arbre** représente les épreuves successives : on **multiplie** les probabilités le long d'un chemin, puis on **additionne** les chemins qui réalisent l'événement.\n\n" +
        "Sans remise, la composition de l'urne change au second tirage.",
      exemple: {
        enonce: "Une urne contient $3$ rouges et $2$ vertes. On tire deux boules avec remise. $P(\\text{deux rouges})$ ?",
        solution: "$\\dfrac{3}{5} \\times \\dfrac{3}{5} = \\dfrac{9}{25}$."
      }
    },
    {
      titre: "Fréquence et probabilité",
      video: { titre: "Vidéo d'Yvan Monka : comprendre la notion de probabilité", youtube: "https://youtu.be/ithQHSY9Z-E" },
      texte:
        "La **fréquence** d'une issue est $\\dfrac{\\text{nombre de fois où elle apparaît}}{\\text{nombre d'essais}}$.\n\n" +
        "Quand on répète l'expérience un **grand nombre** de fois, la fréquence se rapproche de la probabilité. On peut ainsi **estimer** une probabilité inconnue.\n\n" +
        "Chaque lancer d'une pièce est indépendant des précédents : après $5$ « pile », $P(\\text{pile})$ vaut toujours $\\dfrac{1}{2}$.",
      exemple: {
        enonce: "Sur $200$ lancers d'une punaise, elle tombe $76$ fois sur la pointe. Estime la probabilité.",
        solution: "$\\dfrac{76}{200} = 0{,}38$."
      }
    }
  ],

  /* ---------- 2. EXERCICES (générés, corrigés automatiquement) ---------- */
  exercices: [
    { type: "pr3-simple", titre: "Probabilités et contraire", etape: "Une épreuve", nb: 6 },
    { type: "pr3-deux-epreuves", titre: "Tableaux et deux épreuves", etape: "Deux épreuves", nb: 5 },
    { type: "pr3-arbre", titre: "Arbres sans remise", etape: "Deux épreuves", nb: 5 },
    { type: "pr3-frequences", titre: "Fréquences et probabilités", etape: "Fréquences", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "On lance un dé équilibré. $P(\\text{obtenir un nombre pair})$ :", choix: ["$\\dfrac{1}{2}$", "$\\dfrac{1}{3}$", "$\\dfrac{1}{6}$", "$\\dfrac{2}{3}$"], bonne: 0, explication: "$2$, $4$, $6$ : $\\dfrac{3}{6}$." },
    { question: "Si $P(A) = \\dfrac{2}{7}$, alors $P(\\overline{A})$ vaut :", choix: ["$\\dfrac{5}{7}$", "$\\dfrac{2}{7}$", "$\\dfrac{7}{2}$", "$-\\dfrac{2}{7}$"], bonne: 0, explication: "$1 - \\dfrac{2}{7}$." },
    { question: "Une probabilité peut valoir :", choix: ["$0{,}85$", "$1{,}2$", "$-0{,}3$", "$\\dfrac{5}{3}$"], bonne: 0, explication: "Entre $0$ et $1$." },
    { question: "Avec deux dés, le nombre d'issues est :", choix: ["$36$", "$12$", "$11$", "$6$"], bonne: 0, explication: "$6 \\times 6$." },
    { question: "Avec deux dés, $P(\\text{somme} = 7)$ :", choix: ["$\\dfrac{1}{6}$", "$\\dfrac{1}{11}$", "$\\dfrac{7}{36}$", "$\\dfrac{1}{12}$"], bonne: 0, explication: "$6$ cases sur $36$." },
    { question: "Avec deux dés, $P(\\text{somme} = 12)$ :", choix: ["$\\dfrac{1}{36}$", "$\\dfrac{1}{12}$", "$\\dfrac{1}{6}$", "$\\dfrac{2}{36}$"], bonne: 0, explication: "Seulement $6 + 6$." },
    { question: "On lance deux fois une pièce. $P(\\text{deux fois pile})$ :", choix: ["$\\dfrac{1}{4}$", "$\\dfrac{1}{2}$", "$\\dfrac{1}{3}$", "$1$"], bonne: 0, explication: "$\\dfrac{1}{2} \\times \\dfrac{1}{2}$." },
    { question: "Dans un arbre, le long d'un chemin on :", choix: ["multiplie les probabilités", "additionne les probabilités", "soustrait les probabilités", "divise les probabilités"], bonne: 0, explication: "Règle de l'arbre." },
    { question: "Une urne : $2$ rouges, $3$ vertes. Deux tirages sans remise. $P(\\text{deux rouges})$ :", choix: ["$\\dfrac{1}{10}$", "$\\dfrac{4}{25}$", "$\\dfrac{2}{5}$", "$\\dfrac{1}{5}$"], bonne: 0, explication: "$\\dfrac{2}{5} \\times \\dfrac{1}{4}$." },
    { question: "Une roue : $P(\\text{bleu}) = 0{,}4$, $P(\\text{rouge}) = 0{,}35$. $P(\\text{vert})$, dernière couleur :", choix: ["$0{,}25$", "$0{,}75$", "$0{,}35$", "$0{,}33$"], bonne: 0, explication: "$1 - 0{,}4 - 0{,}35$." },
    { question: "Sur $500$ lancers, on obtient $90$ fois « 6 ». La fréquence est :", choix: ["$0{,}18$", "$0{,}09$", "$\\dfrac{1}{6}$", "$90$"], bonne: 0, explication: "$90 \\div 500$." },
    { question: "Après $4$ « face » de suite, au lancer suivant d'une pièce équilibrée :", choix: ["$P(\\text{face}) = \\dfrac{1}{2}$", "« pile » est plus probable", "« face » est plus probable", "$P(\\text{face}) = \\dfrac{1}{5}$"], bonne: 0, explication: "Les lancers sont indépendants." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Utiliser un arbre",
      etapes: [
        "Dessine les branches de la première épreuve, puis celles de la seconde (attention : sans remise, les probabilités changent).",
        "Multiplie les probabilités le long de chaque chemin.",
        "Additionne les chemins qui réalisent l'événement."
      ],
      exemple: "$P(\\text{couleurs différentes}) = P(RV) + P(VR)$."
    },
    {
      titre: "Penser à l'événement contraire",
      etapes: [
        "Repère les mots « au moins un », « ne … pas ».",
        "Calcule la probabilité de l'événement contraire, souvent plus simple.",
        "Conclus avec $P(A) = 1 - P(\\overline{A})$."
      ],
      exemple: "$P(\\text{au moins un six en deux lancers}) = 1 - \\dfrac{25}{36} = \\dfrac{11}{36}$."
    }
  ],
  erreurs: [
    "Considérer que les $11$ sommes de deux dés sont équiprobables.",
    "Additionner les probabilités le long d'un chemin de l'arbre.",
    "Oublier qu'au second tirage sans remise, il reste une boule de moins.",
    "Confondre fréquence observée et probabilité.",
    "Croire qu'une série de « pile » rend « face » plus probable."
  ]
};
