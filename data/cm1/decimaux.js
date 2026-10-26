/*
  CHAPITRE : CM1 — Les nombres décimaux
  --------------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM1 : fractions décimales (dixièmes, centièmes) ; passer d'une
  fraction décimale à l'écriture à virgule et inversement ; valeur des chiffres (dixièmes, centièmes) ; repérer sur une
  droite graduée ; comparer, ranger, encadrer des décimaux ayant au plus deux chiffres après la virgule.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm1-decimaux"] = {
  niveau: "CM1",
  numero: 3,
  titre: "Les nombres décimaux",
  accroche: "Dixièmes et centièmes : la virgule pour écrire des nombres entre les entiers.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Des fractions décimales à la virgule",
      video: { titre: "Vidéo de Maître Lucas : fractions décimales et nombres décimaux", youtube: "https://youtu.be/Ryy9nmQxeY0" },
      texte:
        "On partage l'unité en $10$ : chaque part est un **dixième** ($\\dfrac{1}{10}$). On partage un dixième en $10$ : chaque part est un **centième** ($\\dfrac{1}{100}$).\n\n" +
        "$35 + \\dfrac{7}{10} + \\dfrac{8}{100}$ s'écrit $35{,}78$.\n\n" +
        "- La **virgule** sépare la partie entière ($35$) de la partie décimale ($78$ centièmes).\n" +
        "- Le chiffre $7$ est le chiffre des **dixièmes**, le $8$ celui des **centièmes**.\n" +
        "- $\\dfrac{4}{10} = 0{,}4$ et $\\dfrac{4}{100} = 0{,}04$.",
      figure: "m1d-cours-tableau",
      exemple: { enonce: "Écris avec une virgule : $\\dfrac{253}{100}$.", solution: "$\\dfrac{253}{100} = 2 + \\dfrac{5}{10} + \\dfrac{3}{100} = 2{,}53$." }
    },
    {
      titre: "Placer et comparer des décimaux",
      video: { titre: "Vidéo de Maître Lucas : comparer et ranger des nombres décimaux", youtube: "https://youtu.be/odj60Ff-CTc" },
      texte:
        "Sur cette droite, l'unité entre $2$ et $3$ est partagée en $10$ dixièmes : le point A est à $2{,}3$.\n\n" +
        "Pour **comparer** deux décimaux :\n\n" +
        "- on compare d'abord les **parties entières** : $9{,}8 < 12{,}1$ ;\n" +
        "- si elles sont égales, on compare les **dixièmes**, puis les **centièmes** : $2{,}5 > 2{,}09$ car $5$ dixièmes $> 0$ dixième.\n\n" +
        "On peut ajouter un zéro à la fin sans changer le nombre : $2{,}5 = 2{,}50$.",
      figure: "m1d-cours-droite",
      exemple: { enonce: "Range dans l'ordre croissant : $2{,}78$ ; $2{,}5$ ; $2{,}09$.", solution: "$2{,}09 < 2{,}5 < 2{,}78$." }
    }
  ],
  exercices: [
    { type: "m1d-ecritures", titre: "Fractions décimales et virgule", etape: "Écrire", nb: 6 },
    { type: "m1d-droite", titre: "Décimaux sur la droite graduée", etape: "Placer", nb: 5 },
    { type: "m1d-comparer", titre: "Comparer et ranger", etape: "Comparer", nb: 6 }
  ],
  qcm: [
    { question: "$\\dfrac{7}{10}$ s'écrit :", choix: ["$0{,}7$", "$0{,}07$", "$7{,}10$", "$70$"], bonne: 0, explication: "Sept dixièmes." },
    { question: "$\\dfrac{7}{100}$ s'écrit :", choix: ["$0{,}07$", "$0{,}7$", "$7{,}100$", "$700$"], bonne: 0, explication: "Sept centièmes : le $7$ est au 2e rang après la virgule." },
    { question: "Dans $35{,}78$, le chiffre des dixièmes est :", choix: ["$7$", "$8$", "$5$", "$3$"], bonne: 0, explication: "C'est le premier chiffre après la virgule." },
    { question: "$4 + \\dfrac{3}{10} + \\dfrac{6}{100} =$", choix: ["$4{,}36$", "$4{,}63$", "$43{,}6$", "$4{,}306$"], bonne: 0, explication: "$3$ dixièmes, $6$ centièmes." },
    { question: "$\\dfrac{253}{100} =$", choix: ["$2{,}53$", "$25{,}3$", "$253{,}100$", "$0{,}253$"], bonne: 0, explication: "$253$ centièmes $= 2$ unités et $53$ centièmes." },
    { question: "$12{,}4 =$", choix: ["$\\dfrac{124}{10}$", "$\\dfrac{124}{100}$", "$\\dfrac{12}{4}$", "$\\dfrac{1\\,240}{10}$"], bonne: 0, explication: "$124$ dixièmes." },
    { question: "Quel est le plus grand ?", choix: ["$2{,}5$", "$2{,}09$", "$2{,}45$", "$2{,}1$"], bonne: 0, explication: "$5$ dixièmes est le plus grand nombre de dixièmes." },
    { question: "Choisis le bon signe : $28{,}29 \\ldots 28{,}19$", choix: ["$>$", "$<$", "$=$"], bonne: 0, explication: "$2$ dixièmes $> 1$ dixième." },
    { question: "$3{,}50$ et $3{,}5$ sont :", choix: ["égaux", "différents : $3{,}50$ est plus grand", "différents : $3{,}5$ est plus grand", "impossibles à comparer"], bonne: 0, explication: "Un zéro à la fin de la partie décimale ne change rien." },
    { question: "Quel nombre est entre $4$ et $5$ ?", choix: ["$4{,}8$", "$5{,}4$", "$3{,}9$", "$48$"], bonne: 0, explication: "Sa partie entière est $4$." },
    { question: "Sur une droite graduée en dixièmes, le point $3$ graduations après $2$ est :", choix: ["$2{,}3$", "$2{,}03$", "$3{,}2$", "$5$"], bonne: 0, explication: "$2$ et $3$ dixièmes." },
    { question: "Combien de centièmes dans un dixième ?", choix: ["$10$", "$100$", "$1$", "$1\\,000$"], bonne: 0, explication: "Un dixième partagé en $10$." },
    { question: "Ranger dans l'ordre croissant : $1{,}2$ ; $1{,}02$ ; $1{,}12$", choix: ["$1{,}02 < 1{,}12 < 1{,}2$", "$1{,}2 < 1{,}12 < 1{,}02$", "$1{,}02 < 1{,}2 < 1{,}12$", "$1{,}12 < 1{,}02 < 1{,}2$"], bonne: 0, explication: "On compare les dixièmes : $0$, $1$, $2$." },
    { question: "Encadre entre deux entiers qui se suivent : $\\ldots < 7{,}6 < \\ldots$", choix: ["$7$ et $8$", "$6$ et $7$", "$7{,}5$ et $7{,}7$", "$76$ et $77$"], bonne: 0, explication: "Partie entière $7$." },
    { question: "$0{,}5$ est égal à :", choix: ["$\\dfrac{1}{2}$", "$\\dfrac{1}{5}$", "$\\dfrac{5}{100}$", "$5$"], bonne: 0, explication: "$5$ dixièmes, c'est la moitié de l'unité." },
    { question: "Dans $6{,}04$, le chiffre $4$ représente :", choix: ["$4$ centièmes", "$4$ dixièmes", "$4$ unités", "$4$ dizaines"], bonne: 0, explication: "Il est au 2e rang après la virgule." },
    { question: "Un bébé mesure $0{,}52$ m. C'est :", choix: ["$52$ centièmes de mètre", "$52$ mètres", "$5{,}2$ mètres", "$52$ dixièmes de mètre"], bonne: 0, explication: "$0{,}52 = \\dfrac{52}{100}$." },
    { question: "Quel nombre est le plus proche de $10$ ?", choix: ["$9{,}9$", "$9{,}09$", "$10{,}5$", "$11$"], bonne: 0, explication: "Il ne manque qu'un dixième." }
  ],
  methode: [
    { titre: "Comparer deux nombres décimaux", etapes: ["Compare les parties entières.", "Si elles sont égales, compare les chiffres des dixièmes.", "S'ils sont égaux, compare les centièmes (ajoute un zéro si besoin)."], figure: "m1d-cours-tableau", exemple: "$2{,}5$ et $2{,}09$ : même partie entière ; dixièmes $5 > 0$, donc $2{,}5 > 2{,}09$." }
  ],
  erreurs: ["Croire que $2{,}09 > 2{,}5$ parce que $9 > 5$.", "Écrire $0{,}7$ pour $\\dfrac{7}{100}$.", "Mal compter les graduations sur la droite (oublier qu'il y en a $10$ par unité).", "Penser que la partie décimale est un deuxième nombre entier."]
};
