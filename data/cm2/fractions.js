/*
  CHAPITRE : CM2 — Les fractions
  -------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM2 : fractions de dénominateur au plus 60 ; écrire une fraction
  comme somme d'un entier et d'une fraction inférieure à 1 et réciproquement ; encadrer ; placer et repérer sur une
  demi-droite graduée ; comparer ; additionner et soustraire ; produit d'un entier par une fraction ; fraction d'une
  quantité ou d'une grandeur (deux tiers de 12 €, trois quarts de 100 m).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm2-fractions"] = {
  niveau: "CM2",
  numero: 2,
  titre: "Les fractions",
  accroche: "Comparer, additionner, multiplier par un entier, et calculer une fraction d'une quantité.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Écrire, placer, comparer",
      video: { titre: "Vidéo de Maître Lucas : les fractions supérieures à 1", youtube: "https://youtu.be/hRtloUVsI7o" },
      texte:
        "- $\\dfrac{12}{5} = \\dfrac{10}{5} + \\dfrac{2}{5} = 2 + \\dfrac{2}{5}$ : la fraction est entre $2$ et $3$. Sur la droite, le point A est à $\\dfrac{12}{5}$.\n" +
        "- **Même dénominateur** : la plus grande fraction a le plus grand numérateur : $\\dfrac{7}{9} > \\dfrac{4}{9}$.\n" +
        "- **Même numérateur** : plus le dénominateur est grand, plus les parts sont petites : $\\dfrac{3}{8} < \\dfrac{3}{5}$.\n" +
        "- Des fractions peuvent être **égales** : $\\dfrac{2}{3} = \\dfrac{4}{6}$ (on a multiplié le numérateur et le dénominateur par $2$).",
      figure: "m2f-cours-droite",
      exemple: { enonce: "Compare $\\dfrac{2}{3}$ et $\\dfrac{5}{6}$.", solution: "$\\dfrac{2}{3} = \\dfrac{4}{6}$ et $\\dfrac{4}{6} < \\dfrac{5}{6}$, donc $\\dfrac{2}{3} < \\dfrac{5}{6}$." }
    },
    {
      titre: "Calculer avec des fractions",
      video: { titre: "Vidéo de Maître Lucas : calculer la fraction d'un nombre", youtube: "https://youtu.be/1YWM6nwVZuY" },
      texte:
        "- **Additionner ou soustraire** avec le même dénominateur : $\\dfrac{7}{10} - \\dfrac{3}{10} = \\dfrac{4}{10}$.\n" +
        "- Si les dénominateurs sont différents, on écrit d'abord les fractions avec le **même dénominateur** : $\\dfrac{1}{3} + \\dfrac{4}{6} = \\dfrac{2}{6} + \\dfrac{4}{6} = \\dfrac{6}{6} = 1$.\n" +
        "- **Entier $\\times$ fraction** : $3 \\times \\dfrac{2}{5} = \\dfrac{6}{5}$ (on prend $3$ fois deux cinquièmes).\n" +
        "- **Fraction d'une quantité** : les $\\dfrac{2}{3}$ de $12$ € : $12 \\div 3 = 4$, puis $2 \\times 4 = 8$ €.",
      figure: "m2f-cours-bandes",
      exemple: { enonce: "Les trois quarts de $100$ m ?", solution: "$100 \\div 4 = 25$ ; $3 \\times 25 = 75$ m." }
    }
  ],
  exercices: [
    { type: "m2f-ecrire", titre: "Décomposer et encadrer", etape: "Écrire", nb: 5 },
    { type: "m2f-droite", titre: "Fractions sur la droite graduée", etape: "Écrire", nb: 5 },
    { type: "m2f-calculer", titre: "Comparer et calculer", etape: "Calculer", nb: 6 },
    { type: "m2f-quantite", titre: "Fraction d'une quantité", etape: "Calculer", nb: 5 }
  ],
  qcm: [
    { question: "$\\dfrac{12}{5} =$", choix: ["$2 + \\dfrac{2}{5}$", "$12 + \\dfrac{1}{5}$", "$1 + \\dfrac{2}{5}$", "$2 + \\dfrac{5}{2}$"], bonne: 0, explication: "$\\dfrac{10}{5} = 2$." },
    { question: "$3 + \\dfrac{1}{4} =$", choix: ["$\\dfrac{13}{4}$", "$\\dfrac{4}{4}$", "$\\dfrac{31}{4}$", "$\\dfrac{3}{4}$"], bonne: 0, explication: "$3 = \\dfrac{12}{4}$." },
    { question: "$\\dfrac{17}{6}$ est compris entre :", choix: ["$2$ et $3$", "$1$ et $2$", "$17$ et $18$", "$3$ et $4$"], bonne: 0, explication: "$\\dfrac{12}{6} = 2$ et $\\dfrac{18}{6} = 3$." },
    { question: "Choisis le bon signe : $\\dfrac{3}{8} \\ldots \\dfrac{3}{5}$", choix: ["$<$", "$>$", "$=$"], bonne: 0, explication: "Huitièmes plus petits que cinquièmes." },
    { question: "$\\dfrac{2}{3} =$", choix: ["$\\dfrac{4}{6}$", "$\\dfrac{3}{4}$", "$\\dfrac{2}{6}$", "$\\dfrac{4}{3}$"], bonne: 0, explication: "Numérateur et dénominateur multipliés par $2$." },
    { question: "$\\dfrac{7}{10} - \\dfrac{3}{10} =$", choix: ["$\\dfrac{4}{10}$", "$\\dfrac{3}{10}$","$\\dfrac{10}{10}$", "$\\dfrac{4}{20}$"], bonne: 0, explication: "On soustrait les numérateurs." },
    { question: "$\\dfrac{1}{3} + \\dfrac{4}{6} =$", choix: ["$1$", "$\\dfrac{5}{9}$", "$\\dfrac{5}{6}$", "$\\dfrac{4}{18}$"], bonne: 0, explication: "$\\dfrac{2}{6} + \\dfrac{4}{6} = \\dfrac{6}{6}$." },
    { question: "$3 \\times \\dfrac{2}{5} =$", choix: ["$\\dfrac{6}{5}$", "$\\dfrac{6}{15}$", "$\\dfrac{5}{6}$", "$\\dfrac{2}{15}$"], bonne: 0, explication: "Trois fois deux cinquièmes." },
    { question: "Les $\\dfrac{2}{3}$ de $12$ € :", choix: ["$8$ €", "$4$ €", "$6$ €", "$18$ €"], bonne: 0, explication: "$12 \\div 3 \\times 2$." },
    { question: "Les trois quarts de $100$ m :", choix: ["$75$ m", "$25$ m", "$34$ m", "$300$ m"], bonne: 0, explication: "$100 \\div 4 \\times 3$." },
    { question: "Les $\\dfrac{3}{5}$ de $40$ élèves :", choix: ["$24$", "$8$", "$15$", "$35$"], bonne: 0, explication: "$40 \\div 5 = 8$ ; $8 \\times 3 = 24$." },
    { question: "Quelle fraction est la plus grande ?", choix: ["$\\dfrac{7}{9}$", "$\\dfrac{4}{9}$", "$\\dfrac{5}{9}$", "$\\dfrac{1}{9}$"], bonne: 0, explication: "Même dénominateur." },
    { question: "$\\dfrac{5}{4} + \\dfrac{3}{4} =$", choix: ["$2$", "$\\dfrac{8}{8}$", "$1$", "$\\dfrac{2}{4}$"], bonne: 0, explication: "$\\dfrac{8}{4} = 2$." },
    { question: "$\\dfrac{1}{2} + \\dfrac{1}{4} =$", choix: ["$\\dfrac{3}{4}$", "$\\dfrac{2}{6}$", "$\\dfrac{1}{6}$", "$\\dfrac{2}{4}$"], bonne: 0, explication: "$\\dfrac{2}{4} + \\dfrac{1}{4}$." },
    { question: "Sur une droite partagée en sixièmes, le point $2$ graduations après $3$ est :", choix: ["$\\dfrac{20}{6}$", "$\\dfrac{5}{6}$", "$\\dfrac{3}{6}$", "$\\dfrac{23}{6}$"], bonne: 0, explication: "$3 = \\dfrac{18}{6}$ ; $\\dfrac{18}{6} + \\dfrac{2}{6}$." },
    { question: "Dans une classe de $30$ élèves, $\\dfrac{1}{3}$ fait du foot. Combien ?", choix: ["$10$", "$3$", "$33$", "$90$"], bonne: 0, explication: "$30 \\div 3$." },
    { question: "$5 \\times \\dfrac{1}{5} =$", choix: ["$1$", "$\\dfrac{1}{25}$", "$5$", "$\\dfrac{5}{25}$"], bonne: 0, explication: "Cinq cinquièmes font une unité." },
    { question: "Quelle fraction est égale à $\\dfrac{1}{2}$ ?", choix: ["$\\dfrac{30}{60}$", "$\\dfrac{2}{1}$", "$\\dfrac{12}{20}$", "$\\dfrac{1}{60}$"], bonne: 0, explication: "$30$ est la moitié de $60$." }
  ],
  methode: [
    { titre: "Additionner deux fractions de dénominateurs différents", etapes: ["Cherche si un dénominateur est un multiple de l'autre.", "Écris la première fraction avec ce dénominateur (multiplie en haut et en bas).", "Additionne les numérateurs, garde le dénominateur."], figure: "m2f-cours-bandes", exemple: "$\\dfrac{1}{3} + \\dfrac{4}{6} = \\dfrac{2}{6} + \\dfrac{4}{6} = \\dfrac{6}{6}$." },
    { titre: "Calculer une fraction d'une quantité", etapes: ["Divise la quantité par le dénominateur.", "Multiplie par le numérateur.", "Vérifie : le résultat est plus petit que la quantité si la fraction est inférieure à $1$."], exemple: "$\\dfrac{2}{3}$ de $12$ € : $12 \\div 3 = 4$ ; $4 \\times 2 = 8$ €." }
  ],
  erreurs: ["Additionner les dénominateurs : $\\dfrac{1}{3} + \\dfrac{1}{3} \\neq \\dfrac{2}{6}$.", "Multiplier aussi le dénominateur : $3 \\times \\dfrac{2}{5} \\neq \\dfrac{6}{15}$.", "Croire que $\\dfrac{3}{8} > \\dfrac{3}{5}$ parce que $8 > 5$.", "Diviser par le numérateur au lieu du dénominateur."]
};
