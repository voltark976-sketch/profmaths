/*
  CHAPITRE : CE2 — Les fractions
  -------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE2, « Les fractions » (dénominateur ≤ 12, fractions ≤ 1) :
  - égalités de fractions (6/8 = 3/4 ; ? / 10 = 1/2) ;
  - partager une unité de longueur en fractions d'unité et mesurer (« deux unités et un quart d'unité ») ;
  - comparer des fractions : même dénominateur, même numérateur, un dénominateur multiple de l'autre ;
  - additionner et soustraire des fractions (même dénominateur ou l'un multiple de l'autre) ; problèmes.
  Réponses en fraction annoncées (« 3/8 »).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce2-fractions"] = {
  niveau: "CE2",
  numero: 3,
  titre: "Les fractions",
  accroche: "Des fractions égales, des fractions pour mesurer, comparer et calculer avec les fractions.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Des fractions égales",
      video: { titre: "Vidéo de « Cours Primaire » : comprendre les fractions équivalentes", youtube: "https://youtu.be/L4mBkAn342o" },
      texte:
        "Si on coupe chaque part en deux, il y a **deux fois plus de parts**, deux fois plus petites : on prend la même quantité.\n\n" +
        "$\\dfrac{3}{4} = \\dfrac{6}{8}$ ; $\\dfrac{1}{2} = \\dfrac{2}{4} = \\dfrac{5}{10}$.\n\n" +
        "On multiplie le numérateur et le dénominateur par le **même nombre**.",
      figure: "e2f-cours-egales",
      exemple: { enonce: "Complète : $\\dfrac{\\ldots}{10} = \\dfrac{1}{2}$.", solution: "$\\dfrac{5}{10} = \\dfrac{1}{2}$ (on a multiplié par $5$)." }
    },
    {
      titre: "Mesurer avec des fractions d'unité",
      video: { titre: "Vidéo de « Chez Maîtresse Nath » : placer des fractions sur une droite graduée", youtube: "https://youtu.be/vzUcgt2KCVs" },
      texte:
        "On partage une unité de longueur en parts égales (par exemple en quarts, ou en dixièmes).\n\n" +
        "Le point M de la figure est à $9$ quarts de $0$ : la longueur est $2$ unités $+ \\dfrac{1}{4}$ d'unité.\n\n" +
        "Si un bout tombe entre deux graduations, on encadre : « entre $\\dfrac{7}{10}$ et $\\dfrac{8}{10}$ d'unité ».",
      figure: "e2f-cours-regle",
      exemple: { enonce: "Une bande mesure $13$ dixièmes d'unité. Écris sa longueur autrement.", solution: "$1$ unité $+ \\dfrac{3}{10}$ d'unité." }
    },
    {
      titre: "Comparer et calculer",
      video: { titre: "Vidéo de Maître Lucas : comparer des fractions", youtube: "https://youtu.be/eVvg3MRr9X8" },
      texte:
        "- Même dénominateur : $\\dfrac{5}{12} < \\dfrac{7}{12}$.\n" +
        "- Même numérateur : $\\dfrac{5}{9} < \\dfrac{5}{6}$ (les sixièmes sont plus grands que les neuvièmes).\n" +
        "- Dénominateur multiple : $\\dfrac{7}{10}$ et $\\dfrac{1}{2} = \\dfrac{5}{10}$, donc $\\dfrac{7}{10} > \\dfrac{1}{2}$.\n\n" +
        "Pour ajouter : $\\dfrac{1}{4} + \\dfrac{3}{8} = \\dfrac{2}{8} + \\dfrac{3}{8} = \\dfrac{5}{8}$.",
      exemple: { enonce: "Marc mange $\\dfrac{1}{10}$ du gâteau, Ange $\\dfrac{3}{10}$ et Sam $\\dfrac{2}{10}$. Quelle fraction reste-t-il ?", solution: "Mangé : $\\dfrac{6}{10}$. Reste : $\\dfrac{10}{10} - \\dfrac{6}{10} = \\dfrac{4}{10}$." }
    }
  ],
  exercices: [
    { type: "e2f-egales", titre: "Des fractions égales", etape: "Comprendre", nb: 6 },
    { type: "e2f-mesurer", titre: "Mesurer en fractions d'unité", etape: "Comprendre", nb: 5 },
    { type: "e2f-comparer", titre: "Comparer des fractions", etape: "Comparer et calculer", nb: 6 },
    { type: "e2f-calculer", titre: "Ajouter et retirer des fractions", etape: "Comparer et calculer", nb: 6 }
  ],
  qcm: [
    { question: "$\\dfrac{3}{4} = $", choix: ["$\\dfrac{6}{8}$", "$\\dfrac{4}{5}$", "$\\dfrac{3}{8}$", "$\\dfrac{6}{4}$"], bonne: 0, explication: "On multiplie en haut et en bas par $2$." },
    { question: "$\\dfrac{1}{2} = \\dfrac{\\ldots}{10}$", choix: ["$5$", "$2$", "$1$", "$20$"], bonne: 0, explication: "$\\dfrac{5}{10} = \\dfrac{1}{2}$." },
    { question: "Quelle fraction n'est pas égale à $\\dfrac{1}{2}$ ?", choix: ["$\\dfrac{2}{3}$", "$\\dfrac{2}{4}$", "$\\dfrac{3}{6}$", "$\\dfrac{6}{12}$"], bonne: 0, explication: "$\\dfrac{2}{3}$ est plus grand qu'un demi." },
    { question: "Quelle est la longueur de $0$ au point P ?", figure: "e2f-qcm-regle", choix: ["$1$ unité $+ \\dfrac{3}{10}$ d'unité", "$\\dfrac{3}{10}$ d'unité", "$13$ unités", "$2$ unités $+ \\dfrac{3}{10}$ d'unité"], bonne: 0, explication: "$13$ dixièmes = $1$ unité et $3$ dixièmes." },
    { question: "$\\dfrac{5}{12} \\;\\ldots\\; \\dfrac{7}{12}$", choix: ["$<$", "$>$", "$=$"], bonne: 0, explication: "Même dénominateur : $5 < 7$." },
    { question: "$\\dfrac{5}{6} \\;\\ldots\\; \\dfrac{5}{9}$", choix: ["$>$", "$<$", "$=$"], bonne: 0, explication: "Même numérateur : un sixième est plus grand qu'un neuvième." },
    { question: "$\\dfrac{7}{10} \\;\\ldots\\; \\dfrac{1}{2}$", choix: ["$>$", "$<$", "$=$"], bonne: 0, explication: "$\\dfrac{1}{2} = \\dfrac{5}{10}$." },
    { question: "$\\dfrac{2}{4} \\;\\ldots\\; \\dfrac{1}{2}$", choix: ["$=$", "$<$", "$>$"], bonne: 0, explication: "Ce sont deux fractions égales." },
    { question: "$\\dfrac{3}{8} + \\dfrac{4}{8} = $", choix: ["$\\dfrac{7}{8}$", "$\\dfrac{7}{16}$", "$\\dfrac{1}{8}$", "$\\dfrac{12}{8}$"], bonne: 0, explication: "On garde le dénominateur." },
    { question: "$\\dfrac{1}{4} + \\dfrac{3}{8} = $", choix: ["$\\dfrac{5}{8}$", "$\\dfrac{4}{12}$", "$\\dfrac{4}{8}$", "$\\dfrac{3}{32}$"], bonne: 0, explication: "$\\dfrac{1}{4} = \\dfrac{2}{8}$, puis $\\dfrac{2}{8} + \\dfrac{3}{8}$." },
    { question: "$1 - \\dfrac{3}{10} = $", choix: ["$\\dfrac{7}{10}$", "$\\dfrac{3}{10}$", "$\\dfrac{2}{10}$", "$\\dfrac{13}{10}$"], bonne: 0, explication: "$\\dfrac{10}{10} - \\dfrac{3}{10}$." },
    { question: "$\\dfrac{9}{12} - \\dfrac{1}{3} = $", choix: ["$\\dfrac{5}{12}$", "$\\dfrac{8}{9}$", "$\\dfrac{8}{12}$", "$\\dfrac{10}{12}$"], bonne: 0, explication: "$\\dfrac{1}{3} = \\dfrac{4}{12}$ ; $9 - 4 = 5$." },
    { question: "$9$ quarts d'unité, c'est :", choix: ["$2$ unités $+ \\dfrac{1}{4}$", "$9$ unités", "$\\dfrac{4}{9}$", "$1$ unité $+ \\dfrac{1}{4}$"], bonne: 0, explication: "$8$ quarts font $2$ unités." },
    { question: "Le plus grand :", choix: ["$\\dfrac{1}{3}$", "$\\dfrac{1}{4}$", "$\\dfrac{1}{6}$", "$\\dfrac{1}{12}$"], bonne: 0, explication: "Moins on partage, plus la part est grande." },
    { question: "$\\dfrac{4}{6} = \\dfrac{2}{\\ldots}$", choix: ["$3$", "$4$", "$12$", "$6$"], bonne: 0, explication: "On divise en haut et en bas par $2$." },
    { question: "Une règle en dixièmes : le bout d'une bande est entre $7$ et $8$ graduations. Sa longueur est :", choix: ["entre $\\dfrac{7}{10}$ et $\\dfrac{8}{10}$ d'unité", "$7$ unités", "$\\dfrac{7}{8}$ d'unité", "$78$ dixièmes"], bonne: 0, explication: "On encadre entre deux dixièmes." },
    { question: "Pour comparer $\\dfrac{3}{4}$ et $\\dfrac{5}{8}$, on peut écrire :", choix: ["$\\dfrac{3}{4} = \\dfrac{6}{8}$", "$\\dfrac{3}{4} = \\dfrac{5}{8}$", "$\\dfrac{3}{4} = \\dfrac{3}{8}$", "$\\dfrac{5}{8} = \\dfrac{5}{4}$"], bonne: 0, explication: "Même dénominateur : $\\dfrac{6}{8} > \\dfrac{5}{8}$." },
    { question: "Il reste $\\dfrac{4}{10}$ du gâteau. Quelle fraction a été mangée ?", choix: ["$\\dfrac{6}{10}$", "$\\dfrac{4}{10}$", "$\\dfrac{14}{10}$", "$\\dfrac{1}{10}$"], bonne: 0, explication: "$\\dfrac{10}{10} - \\dfrac{4}{10}$." }
  ],
  methode: [
    { titre: "Comparer deux fractions", etapes: ["Même dénominateur : compare les numérateurs.", "Même numérateur : la plus grande a le plus petit dénominateur.", "Sinon, si un dénominateur est multiple de l'autre, transforme une fraction pour avoir le même dénominateur."], figure: "e2f-cours-egales", exemple: "$\\dfrac{3}{4} = \\dfrac{6}{8} > \\dfrac{5}{8}$." },
    { titre: "Lire une longueur en fractions d'unité", etapes: ["Compte en combien de parts chaque unité est partagée.", "Compte les parts de $0$ au point.", "Regroupe les unités entières : $9$ quarts $= 2$ unités $+ \\dfrac{1}{4}$."], figure: "e2f-cours-regle", exemple: "$13$ dixièmes $= 1$ unité $+ \\dfrac{3}{10}$." }
  ],
  erreurs: ["Ajouter le même nombre en haut et en bas : $\\dfrac{3}{4} \\neq \\dfrac{4}{5}$.", "Croire que $\\dfrac{1}{9}$ est plus grand que $\\dfrac{1}{6}$.", "Ajouter les dénominateurs.", "Compter les traits au lieu des parts sur une règle graduée en fractions."]
};
