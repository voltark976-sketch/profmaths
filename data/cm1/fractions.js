/*
  CHAPITRE : CM1 — Les fractions
  -------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM1 : fractions de dénominateur au plus 20 (et fractions décimales
  jusqu'à 100) ; lire, écrire, représenter ; écrire une fraction comme somme d'un entier et d'une fraction inférieure à 1 ;
  encadrer entre deux entiers consécutifs ; repérer sur une droite graduée ; comparer ; ajouter des fractions de même
  dénominateur ; calculer la fraction d'une quantité (moitié, tiers, quart, dixième…).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm1-fractions"] = {
  niveau: "CM1",
  numero: 2,
  titre: "Les fractions",
  accroche: "Partager l'unité, placer des fractions sur une droite, les comparer et les additionner.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Lire et représenter une fraction",
      video: { titre: "Vidéo de Maître Lucas : découvrir les fractions", youtube: "https://youtu.be/0-y8RUNPnQE" },
      texte:
        "Dans $\\dfrac{3}{4}$, le **dénominateur** $4$ dit en combien de parts égales on partage l'unité ; le **numérateur** $3$ dit combien de parts on prend.\n\n" +
        "$\\dfrac{3}{4}$ se lit « trois quarts ».\n\n" +
        "- $\\dfrac{4}{4} = 1$ : on a pris toutes les parts.\n" +
        "- Quand le numérateur est plus grand que le dénominateur, la fraction est **plus grande que $1$** : $\\dfrac{7}{4} = 1 + \\dfrac{3}{4}$.",
      figure: "m1f-cours-bandes",
      exemple: { enonce: "Écris $\\dfrac{11}{5}$ sous la forme d'un entier et d'une fraction plus petite que $1$.", solution: "$\\dfrac{11}{5} = \\dfrac{10}{5} + \\dfrac{1}{5} = 2 + \\dfrac{1}{5}$." }
    },
    {
      titre: "Placer, comparer, additionner",
      video: { titre: "Vidéo de Maître Lucas : encadrer une fraction entre deux entiers", youtube: "https://youtu.be/YaLkcA4cIp4" },
      texte:
        "Sur une droite graduée, on partage chaque unité en autant de parts que le dénominateur. Ici chaque unité est partagée en $4$ : le point A est à $\\dfrac{7}{4}$, entre $1$ et $2$.\n\n" +
        "- Avec le **même dénominateur**, la plus grande fraction est celle qui a le plus grand numérateur : $\\dfrac{4}{6} < \\dfrac{5}{6}$.\n" +
        "- Pour **ajouter** des fractions de même dénominateur, on ajoute les numérateurs : $\\dfrac{2}{10} + \\dfrac{5}{10} = \\dfrac{7}{10}$.\n" +
        "- Le **quart** de $20$ litchis : $20 \\div 4 = 5$ litchis.",
      figure: "m1f-cours-droite",
      exemple: { enonce: "Encadre $\\dfrac{13}{4}$ entre deux entiers qui se suivent.", solution: "$\\dfrac{12}{4} = 3$ et $\\dfrac{16}{4} = 4$, donc $3 < \\dfrac{13}{4} < 4$." }
    }
  ],
  exercices: [
    { type: "m1f-ecrire", titre: "Écrire et décomposer une fraction", etape: "Écrire", nb: 5 },
    { type: "m1f-droite", titre: "Fractions sur la droite graduée", etape: "Placer", nb: 5 },
    { type: "m1f-comparer", titre: "Comparer et additionner", etape: "Comparer", nb: 5 },
    { type: "m1f-quantite", titre: "Fraction d'une quantité", etape: "Calculer", nb: 5 }
  ],
  qcm: [
    { question: "Dans $\\dfrac{3}{8}$, le dénominateur est :", choix: ["$8$", "$3$", "$11$", "$5$"], bonne: 0, explication: "C'est le nombre du bas : le nombre de parts égales." },
    { question: "$\\dfrac{3}{4}$ se lit :", choix: ["trois quarts", "trois quatre", "quatre tiers", "trois sur quatre parts entières"], bonne: 0, explication: "Le dénominateur $4$ se dit « quart »." },
    { question: "Quelle fraction est égale à $1$ ?", choix: ["$\\dfrac{6}{6}$", "$\\dfrac{1}{6}$", "$\\dfrac{6}{1}$", "$\\dfrac{5}{6}$"], bonne: 0, explication: "On prend toutes les parts." },
    { question: "$\\dfrac{7}{4} =$", choix: ["$1 + \\dfrac{3}{4}$", "$7 + \\dfrac{1}{4}$", "$1 + \\dfrac{4}{7}$", "$2 + \\dfrac{3}{4}$"], bonne: 0, explication: "$\\dfrac{4}{4} = 1$ et il reste $\\dfrac{3}{4}$." },
    { question: "$\\dfrac{13}{4}$ est compris entre :", choix: ["$3$ et $4$", "$1$ et $2$", "$13$ et $14$", "$4$ et $5$"], bonne: 0, explication: "$\\dfrac{12}{4} = 3$ et $\\dfrac{16}{4} = 4$." },
    { question: "Quelle fraction est plus grande que $1$ ?", choix: ["$\\dfrac{9}{7}$", "$\\dfrac{7}{9}$", "$\\dfrac{1}{2}$", "$\\dfrac{3}{3}$"], bonne: 0, explication: "Le numérateur est plus grand que le dénominateur." },
    { question: "Choisis le bon signe : $\\dfrac{4}{6} \\ldots \\dfrac{5}{6}$", choix: ["$<$", "$>$", "$=$"], bonne: 0, explication: "Même dénominateur : $4 < 5$." },
    { question: "$\\dfrac{2}{10} + \\dfrac{5}{10} =$", choix: ["$\\dfrac{7}{10}$", "$\\dfrac{7}{20}$", "$\\dfrac{10}{7}$", "$\\dfrac{3}{10}$"], bonne: 0, explication: "On ajoute les numérateurs, le dénominateur ne change pas." },
    { question: "Le quart de $20$ litchis, c'est :", choix: ["$5$ litchis", "$4$ litchis", "$80$ litchis", "$16$ litchis"], bonne: 0, explication: "$20 \\div 4 = 5$." },
    { question: "Le tiers de $27$ est :", choix: ["$9$", "$3$", "$24$", "$81$"], bonne: 0, explication: "$27 \\div 3 = 9$." },
    { question: "Le dixième de $130$ est :", choix: ["$13$", "$10$", "$120$", "$1\\,300$"], bonne: 0, explication: "$130 \\div 10 = 13$." },
    { question: "Sur une droite où chaque unité est partagée en $3$, le point situé $2$ graduations après $1$ est :", choix: ["$\\dfrac{5}{3}$", "$\\dfrac{2}{3}$", "$\\dfrac{3}{5}$", "$\\dfrac{1}{3}$"], bonne: 0, explication: "$1 = \\dfrac{3}{3}$, puis $2$ tiers de plus : $\\dfrac{5}{3}$." },
    { question: "$3 + \\dfrac{1}{2}$ s'écrit aussi :", choix: ["$\\dfrac{7}{2}$", "$\\dfrac{4}{2}$", "$\\dfrac{3}{2}$", "$\\dfrac{31}{2}$"], bonne: 0, explication: "$3 = \\dfrac{6}{2}$, et $\\dfrac{6}{2} + \\dfrac{1}{2} = \\dfrac{7}{2}$." },
    { question: "Quelle fraction est la plus petite ?", choix: ["$\\dfrac{2}{9}$", "$\\dfrac{5}{9}$", "$\\dfrac{8}{9}$", "$\\dfrac{9}{9}$"], bonne: 0, explication: "Même dénominateur : le plus petit numérateur." },
    { question: "Une pizza est coupée en $8$ parts égales. Zaïna en mange $3$. Quelle fraction de la pizza a-t-elle mangée ?", choix: ["$\\dfrac{3}{8}$", "$\\dfrac{8}{3}$", "$\\dfrac{5}{8}$", "$\\dfrac{3}{5}$"], bonne: 0, explication: "$3$ parts sur $8$." },
    { question: "Il reste alors :", choix: ["$\\dfrac{5}{8}$ de la pizza", "$\\dfrac{3}{8}$ de la pizza", "$\\dfrac{8}{5}$ de la pizza", "$\\dfrac{5}{3}$ de la pizza"], bonne: 0, explication: "$\\dfrac{8}{8} - \\dfrac{3}{8} = \\dfrac{5}{8}$." },
    { question: "$\\dfrac{1}{2}$ de $50$ €, c'est :", choix: ["$25$ €", "$52$ €", "$48$ €", "$100$ €"], bonne: 0, explication: "La moitié : $50 \\div 2$." },
    { question: "$\\dfrac{15}{5}$ est égal à :", choix: ["$3$", "$5$", "$10$", "$15$"], bonne: 0, explication: "$5$ cinquièmes font $1$ ; $15$ cinquièmes font $3$." }
  ],
  methode: [
    { titre: "Décomposer une fraction plus grande que 1", etapes: ["Cherche combien de fois le dénominateur « tient » dans le numérateur : c'est l'entier.", "Ce qui reste au numérateur donne la fraction plus petite que $1$.", "Vérifie : l'entier fois le dénominateur, plus le reste, redonne le numérateur."], figure: "m1f-cours-bandes", exemple: "$\\dfrac{11}{4}$ : $4$ tient $2$ fois dans $11$ (reste $3$) → $2 + \\dfrac{3}{4}$." },
    { titre: "Calculer une fraction d'une quantité", etapes: ["Partage la quantité par le dénominateur.", "Multiplie le résultat par le numérateur (s'il n'est pas $1$).", "Vérifie que le résultat est plus petit que la quantité si la fraction est plus petite que $1$."], exemple: "$\\dfrac{3}{4}$ de $20$ : $20 \\div 4 = 5$, puis $5 \\times 3 = 15$." }
  ],
  erreurs: ["Inverser numérateur et dénominateur.", "Additionner aussi les dénominateurs : $\\dfrac{2}{10} + \\dfrac{5}{10} \\neq \\dfrac{7}{20}$.", "Croire qu'une fraction est toujours plus petite que $1$.", "Pour le quart d'une quantité, multiplier par $4$ au lieu de diviser."]
};
