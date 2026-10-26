/*
  CHAPITRE : CM2 — Les nombres décimaux
  --------------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM2 : fractions décimales jusqu'aux millièmes ; relations entre
  unités, dixièmes, centièmes, millièmes ; passer d'une écriture fractionnaire à l'écriture à virgule et réciproquement ;
  placer et repérer sur une demi-droite graduée ; comparer, encadrer, intercaler, ranger ; partie entière et arrondi à
  l'unité.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm2-decimaux"] = {
  niveau: "CM2",
  numero: 3,
  titre: "Les nombres décimaux",
  accroche: "Jusqu'aux millièmes : écrire, comparer, intercaler et arrondir.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Dixièmes, centièmes, millièmes",
      video: { titre: "Vidéo de Maître Lucas : fractions décimales et nombres décimaux", youtube: "https://youtu.be/Ryy9nmQxeY0" },
      texte:
        "Un **millième** ($\\dfrac{1}{1\\,000}$) est un centième partagé en $10$.\n\n" +
        "$47 + \\dfrac{2}{10} + \\dfrac{0}{100} + \\dfrac{5}{1\\,000} = 47{,}205$\n\n" +
        "- $1$ unité $= 10$ dixièmes $= 100$ centièmes $= 1\\,000$ millièmes.\n" +
        "- $47{,}205 = \\dfrac{47\\,205}{1\\,000}$ : c'est $47\\,205$ millièmes.\n" +
        "- Attention au zéro : $\\dfrac{5}{1\\,000} = 0{,}005$.",
      figure: "m2d-cours-tableau",
      exemple: { enonce: "Écris avec une virgule : $\\dfrac{3\\,084}{1\\,000}$.", solution: "$3{,}084$." }
    },
    {
      titre: "Comparer, intercaler, arrondir",
      video: { titre: "Vidéo de Pass Education : arrondir les nombres décimaux", youtube: "https://youtu.be/8uTGl9h_2a4" },
      texte:
        "- Pour **comparer**, on compare la partie entière, puis les dixièmes, les centièmes, les millièmes : $8{,}105 < 8{,}5$.\n" +
        "- Entre $3{,}4$ et $3{,}5$, on peut **intercaler** $3{,}45$ ou $3{,}47$ : sur la droite graduée en centièmes, B est à $3{,}47$.\n" +
        "- La **partie entière** de $54{,}98$ est $54$.\n" +
        "- L'**arrondi à l'unité** est l'entier le plus proche : $54{,}98$ est plus près de $55$ que de $54$, son arrondi est $55$. On regarde le chiffre des dixièmes : $5$ ou plus, on arrondit au-dessus.",
      figure: "m2d-cours-droite",
      exemple: { enonce: "Arrondi à l'unité de $12{,}38$ ?", solution: "Chiffre des dixièmes : $3$ (moins de $5$) → $12$." }
    }
  ],
  exercices: [
    { type: "m2d-ecritures", titre: "Écritures des décimaux", etape: "Écrire", nb: 6 },
    { type: "m2d-comparer", titre: "Comparer, ranger, intercaler", etape: "Comparer", nb: 6 },
    { type: "m2d-arrondir", titre: "Placer, encadrer, arrondir", etape: "Arrondir", nb: 6 }
  ],
  qcm: [
    { question: "$\\dfrac{5}{1\\,000} =$", choix: ["$0{,}005$", "$0{,}05$", "$0{,}5$", "$5{,}000$"], bonne: 0, explication: "Cinq millièmes." },
    { question: "$47 + \\dfrac{2}{10} + \\dfrac{5}{1\\,000} =$", choix: ["$47{,}205$", "$47{,}25$", "$47{,}2005$", "$47{,}502$"], bonne: 0, explication: "$0$ centième : on écrit un zéro." },
    { question: "Dans $47{,}205$, le chiffre des millièmes est :", choix: ["$5$", "$0$", "$2$", "$7$"], bonne: 0, explication: "Troisième chiffre après la virgule." },
    { question: "$3{,}084 =$", choix: ["$\\dfrac{3\\,084}{1\\,000}$", "$\\dfrac{3\\,084}{100}$", "$\\dfrac{3}{84}$", "$\\dfrac{384}{1\\,000}$"], bonne: 0, explication: "$3\\,084$ millièmes." },
    { question: "Combien de millièmes dans une unité ?", choix: ["$1\\,000$", "$100$", "$10$", "$1$"], bonne: 0, explication: "Une unité $= 1\\,000$ millièmes." },
    { question: "Quel nombre est le plus grand ?", choix: ["$8{,}5$", "$8{,}105$", "$8{,}05$", "$8{,}49$"], bonne: 0, explication: "$5$ dixièmes, c'est le plus." },
    { question: "Choisis le bon signe : $9{,}194 \\ldots 9{,}2$", choix: ["$<$", "$>$", "$=$"], bonne: 0, explication: "$1$ dixième $< 2$ dixièmes." },
    { question: "Quel nombre est entre $5{,}27$ et $5{,}28$ ?", choix: ["$5{,}275$", "$5{,}265$", "$5{,}29$", "$5{,}3$"], bonne: 0, explication: "$5{,}270 < 5{,}275 < 5{,}280$." },
    { question: "La partie entière de $54{,}98$ est :", choix: ["$54$", "$55$", "$98$", "$5$"], bonne: 0, explication: "Ce qui est avant la virgule." },
    { question: "L'arrondi à l'unité de $54{,}98$ est :", choix: ["$55$", "$54$", "$54{,}9$", "$50$"], bonne: 0, explication: "Plus près de $55$." },
    { question: "L'arrondi à l'unité de $12{,}38$ est :", choix: ["$12$", "$13$", "$12{,}4$", "$10$"], bonne: 0, explication: "$3$ dixièmes : moins de $5$." },
    { question: "L'arrondi à l'unité de $7{,}61$ est :", choix: ["$8$", "$7$", "$7{,}6$", "$6$"], bonne: 0, explication: "$6$ dixièmes : on arrondit au-dessus." },
    { question: "$2{,}5$ et $2{,}500$ sont :", choix: ["égaux", "différents", "impossibles à comparer"], bonne: 0, explication: "Les zéros à la fin ne changent rien." },
    { question: "Range dans l'ordre croissant : $1{,}02$ ; $1{,}2$ ; $1{,}002$", choix: ["$1{,}002 < 1{,}02 < 1{,}2$", "$1{,}2 < 1{,}02 < 1{,}002$", "$1{,}02 < 1{,}002 < 1{,}2$", "$1{,}002 < 1{,}2 < 1{,}02$"], bonne: 0, explication: "Avec trois chiffres : $1{,}002$ ; $1{,}020$ ; $1{,}200$." },
    { question: "Sur une droite graduée en centièmes de $3{,}4$ à $3{,}5$, le point à $7$ graduations de $3{,}4$ est :", choix: ["$3{,}47$", "$3{,}7$", "$3{,}407$", "$4{,}1$"], bonne: 0, explication: "$3{,}4 + 0{,}07$." },
    { question: "$\\dfrac{125}{100} =$", choix: ["$1{,}25$", "$12{,}5$", "$0{,}125$", "$125{,}100$"], bonne: 0, explication: "$125$ centièmes." },
    { question: "$0{,}7 =$", choix: ["$\\dfrac{700}{1\\,000}$", "$\\dfrac{7}{100}$", "$\\dfrac{7}{1\\,000}$", "$\\dfrac{70}{1\\,000}$"], bonne: 0, explication: "$7$ dixièmes $= 700$ millièmes." },
    { question: "Un sauteur fait $4{,}08$ m, un autre $4{,}8$ m. Qui saute le plus loin ?", choix: ["celui qui fait $4{,}8$ m", "celui qui fait $4{,}08$ m", "ils sautent pareil"], bonne: 0, explication: "$4{,}80 > 4{,}08$." }
  ],
  methode: [
    { titre: "Arrondir à l'unité", etapes: ["Écris les deux entiers qui encadrent le nombre.", "Regarde le chiffre des dixièmes.", "De $0$ à $4$ : garde l'entier du dessous ; de $5$ à $9$ : prends l'entier du dessus."], figure: "m2d-cours-droite", exemple: "$54{,}98$ : entre $54$ et $55$, dixièmes $9$ → $55$." },
    { titre: "Comparer deux décimaux", etapes: ["Compare les parties entières.", "Complète avec des zéros pour avoir autant de chiffres après la virgule.", "Compare chiffre par chiffre de gauche à droite."], exemple: "$8{,}105$ et $8{,}5 = 8{,}500$ : $105 < 500$." }
  ],
  erreurs: ["Croire que $8{,}105 > 8{,}5$ parce que $105 > 5$.", "Oublier le zéro des centièmes : écrire $47{,}25$ pour $47 + \\dfrac{2}{10} + \\dfrac{5}{1\\,000}$.", "Confondre partie entière et arrondi.", "Arrondir en regardant le dernier chiffre au lieu des dixièmes."]
};
