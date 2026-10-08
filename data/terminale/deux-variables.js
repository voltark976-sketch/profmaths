/*
  CHAPITRE : Terminale maths complémentaires — Statistique à deux variables quantitatives
  ---------------------------------------------------------------------------------------
  Chapitre 6 de la progression spiralée 2026-2027 (programme de maths complémentaires de 2019).
  Mêmes règles d'écriture que data/seconde/fonctions.js.
  Vidéos d'Yvan Monka (cours 20StatTC). Les données de Pamandzi sont fictives (ordre de grandeur réaliste).
  Figures : "tsd-nuage", "tsd-correlations". Générateurs : tsd-.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["terminale-deux-variables"] = {
  niveau: "Terminale maths complémentaires",
  numero: 6,
  titre: "Statistique à deux variables quantitatives",
  accroche: "Un nuage de points, son point moyen, la droite des moindres carrés et le coefficient de corrélation : prévoir avec prudence, et ne pas confondre corrélation et causalité.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Nuage de points et point moyen",
      figure: "tsd-nuage",
      video: { titre: "Vidéo d'Yvan Monka : représenter un nuage de points et déterminer le point moyen", youtube: "https://youtu.be/Nn6uckb3RvE" },
      texte:
        "Une série statistique à deux variables est une liste de couples $(x_i\\,;y_i)$ : par exemple le rang $x_i$ d'une année et la température moyenne $y_i$ cette année-là.\n\n" +
        "- On la représente par un **nuage de points** $M_i(x_i\\,;y_i)$ dans un repère.\n" +
        "- Le **point moyen** est $G(\\bar{x}\\,;\\bar{y})$, où $\\bar{x}$ et $\\bar{y}$ sont les moyennes des $x_i$ et des $y_i$.\n\n" +
        "Sur la figure (données fictives pour Pamandzi, rang $1$ pour 2015) : $8$ années, températures de $26{,}5$ °C à $26{,}9$ °C, point moyen $G(4{,}5\\,;26{,}7)$.",
      exemple: {
        enonce: "Calcule le point moyen de la série $(1\\,;4)$, $(2\\,;6)$, $(3\\,;7)$, $(4\\,;11)$.",
        solution: "$\\bar{x} = \\dfrac{1 + 2 + 3 + 4}{4} = 2{,}5$ et $\\bar{y} = \\dfrac{4 + 6 + 7 + 11}{4} = 7$ : $G(2{,}5\\,;7)$."
      }
    },
    {
      titre: "Ajustement affine : la méthode des moindres carrés",
      video: { titre: "Vidéo d'Yvan Monka : déterminer et tracer la droite d'ajustement (moindres carrés)", youtube: "https://youtu.be/vdEL0MOKAIg" },
      texte:
        "Quand le nuage est allongé le long d'une droite, on cherche une droite $y = ax + b$ qui le résume au mieux.\n\n" +
        "La **droite des moindres carrés** est celle qui rend minimale la somme des carrés des écarts verticaux :\n\n" +
        "$S = (y_1 - ax_1 - b)^2 + \\dots + (y_n - ax_n - b)^2$.\n\n" +
        "On l'obtient à la **calculatrice** (régression linéaire) ou au tableur. Elle passe toujours par le point moyen $G$.\n\n" +
        "Pour la figure : $y \\approx 0{,}060x + 26{,}43$.\n\n" +
        "**Pourquoi par $G$ ?** Pour $a$ fixé, $S$ est un trinôme du second degré en $b$, de coefficient $n > 0$ devant $b^2$ ; son minimum est atteint pour $b = \\bar{y} - a\\bar{x}$, c'est-à-dire quand la droite passe par $G$.",
      exemple: {
        enonce: "La calculatrice donne $y = 0{,}06x + 26{,}43$. Vérifie que la droite passe (presque) par $G(4{,}5\\,;26{,}7)$.",
        solution: "$0{,}06 \\times 4{,}5 + 26{,}43 = 0{,}27 + 26{,}43 = 26{,}70$ : on retrouve $\\bar{y}$."
      }
    },
    {
      titre: "Le coefficient de corrélation",
      figure: "tsd-correlations",
      video: { titre: "Vidéo d'Yvan Monka : calculer un coefficient de corrélation", youtube: "https://youtu.be/FxREenh3fgE" },
      texte:
        "La calculatrice donne aussi le **coefficient de corrélation linéaire** $r$, toujours entre $-1$ et $1$.\n\n" +
        "- $|r|$ proche de $1$ : les points sont proches d'une droite, l'ajustement affine est justifié.\n" +
        "- $r > 0$ : droite croissante ; $r < 0$ : droite décroissante.\n" +
        "- $|r|$ proche de $0$ : pas de lien affine (il peut y avoir un autre type de lien).\n\n" +
        "Pour les températures de Pamandzi, $r \\approx 0{,}91$ : corrélation forte et positive. Sur la figure, $r$ est encore plus proche de $1$.",
      exemple: {
        enonce: "Une série a $r = -0{,}97$. Que peut-on dire de son nuage ?",
        solution: "$|r|$ est proche de $1$ et $r < 0$ : les points sont presque alignés sur une droite décroissante. Un ajustement affine est pertinent."
      }
    },
    {
      titre: "Interpoler, extrapoler, avec un regard critique",
      texte:
        "Avec la droite d'ajustement, on peut estimer une valeur :\n\n" +
        "- **interpolation** : à l'intérieur de la plage des données (assez fiable) ;\n" +
        "- **extrapolation** : en dehors (prévision), beaucoup plus fragile.\n\n" +
        "Exemple : pour le rang $12$ (année 2026), le modèle prévoit $0{,}06 \\times 12 + 26{,}43 \\approx 27{,}1$ °C. C'est une extrapolation : la tendance peut changer.\n\n" +
        "Un ajustement se **critique** : est-il cohérent avec le contexte ? Une concentration ne peut pas devenir négative, une température ne monte pas indéfiniment…",
      exemple: {
        enonce: "Pour un médicament, l'ajustement donne $C = -2x + 24$ ($C$ en mg/L, $x$ en heures, données de $1$ à $7$ h). Que prévoit-il à $15$ h ? Qu'en penser ?",
        solution: "$-2 \\times 15 + 24 = -6$ mg/L : impossible. L'extrapolation n'a pas de sens ici ; une décroissance exponentielle serait plus réaliste."
      }
    },
    {
      titre: "Ajustement par changement de variable",
      video: { titre: "Vidéo d'Yvan Monka : effectuer un ajustement à l'aide d'un changement de variable", youtube: "https://youtu.be/nVDL0razClY" },
      texte:
        "Si le nuage n'est pas allongé le long d'une droite, on peut transformer une variable : $z = x^2$, $z = \\sqrt{x}$, $z = \\dfrac{1}{x}$… (et plus tard $z = \\ln y$, chapitre 8).\n\n" +
        "Si le nuage des $(z_i\\,;y_i)$ est presque aligné, on fait un ajustement affine $y = az + b$, puis on revient à $x$ : par exemple $y = ax^2 + b$.",
      exemple: {
        enonce: "Avec $z = x^2$, l'ajustement donne $y = 0{,}5z + 4$. Estime $y$ pour $x = 6$.",
        solution: "$z = 36$, donc $y = 0{,}5 \\times 36 + 4 = 22$. En revenant à $x$ : $y = 0{,}5x^2 + 4$."
      }
    },
    {
      titre: "Corrélation n'est pas causalité",
      texte:
        "Deux variables peuvent être très corrélées sans que l'une soit la cause de l'autre.\n\n" +
        "**Contre-exemple classique** : sur une année, le nombre de glaces vendues et le nombre de noyades sont fortement corrélés. Manger une glace ne fait pas couler : un **facteur commun**, la chaleur de l'été, augmente les deux.\n\n" +
        "Logique : « corrélées » n'implique pas « l'une cause l'autre ». Pour établir une cause, il faut une expérience contrôlée ou une explication.",
      exemple: {
        enonce: "Dans plusieurs villes, le nombre de pharmacies et le nombre de malades sont corrélés. Les pharmacies rendent-elles malade ?",
        solution: "Non : un troisième facteur, la population de la ville, fait augmenter les deux. Corrélation n'est pas causalité."
      }
    },
    {
      titre: "Tableur ou Python : la somme des carrés des écarts",
      texte:
        "Pour comparer deux droites, on calcule la somme des carrés des écarts verticaux : la meilleure droite a la plus petite somme.\n\n" +
        "```python\ndef somme_carres(X, Y, a, b):\n    s = 0\n    for i in range(len(X)):\n        s = s + (Y[i] - (a * X[i] + b))**2\n    return s\n```\n\n" +
        "Au tableur : une colonne pour $ax_i + b$, une pour l'écart, une pour son carré, puis la fonction SOMME.",
      exemple: {
        enonce: "Points $(1\\,;3)$, $(2\\,;5)$, $(3\\,;8)$. Calcule la somme des carrés des écarts à la droite $y = 2x + 1$.",
        solution: "Écarts : $3 - 3 = 0$, $5 - 5 = 0$, $8 - 7 = 1$. Somme des carrés : $0 + 0 + 1 = 1$."
      }
    }
  ],

  videos: [
    { titre: "Déterminer la droite d'ajustement par la méthode des points moyens", type: "Ajustement", youtube: "https://youtu.be/ESHY4QPgriw" },
    { titre: "Représenter un nuage de points et déterminer le point moyen", type: "Nuage", youtube: "https://youtu.be/Nn6uckb3RvE" }
  ],
  videosNote: "Vidéos d'Yvan Monka : l'énoncé est donné au début de chaque vidéo.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "tsd-point-moyen", titre: "Point moyen d'un nuage", etape: "Nuage et ajustement", nb: 4 },
    { type: "tsd-droite", titre: "Droite des moindres carrés (calculatrice)", etape: "Nuage et ajustement", nb: 4 },
    { type: "tsd-moindres-carres", titre: "Somme des carrés des écarts", etape: "Nuage et ajustement", nb: 4 },
    { type: "tsd-correlation", titre: "Interpréter le coefficient r", etape: "Utiliser un ajustement", nb: 4 },
    { type: "tsd-prevision", titre: "Interpoler, extrapoler", etape: "Utiliser un ajustement", nb: 5 },
    { type: "tsd-changement", titre: "Changement de variable", etape: "Utiliser un ajustement", nb: 4 },
    { type: "tsd-logique", titre: "Corrélation et causalité : vrai ou faux ?", etape: "Raisonner", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Le point moyen d'un nuage a pour coordonnées :", choix: ["$(\\bar{x}\\,;\\bar{y})$", "$(x_1\\,;y_1)$", "le milieu des points extrêmes", "$(0\\,;0)$"], bonne: 0, explication: "Les moyennes des deux séries." },
    { question: "Point moyen de $(1\\,;2)$, $(3\\,;4)$, $(5\\,;9)$ :", choix: ["$(3\\,;5)$", "$(3\\,;4)$", "$(9\\,;15)$", "$(2\\,;5)$"], bonne: 0, explication: "$\\bar{x} = 3$ et $\\bar{y} = \\dfrac{15}{3} = 5$." },
    { question: "La droite des moindres carrés rend minimale :", choix: ["la somme des carrés des écarts verticaux", "la somme des écarts", "la distance entre les points extrêmes", "le coefficient de corrélation"], bonne: 0, explication: "C'est sa définition." },
    { question: "La droite des moindres carrés passe toujours par :", choix: ["le point moyen", "l'origine", "le premier point", "le point le plus haut"], bonne: 0, explication: "$b = \\bar{y} - a\\bar{x}$." },
    { question: "Le coefficient de corrélation $r$ est toujours :", choix: ["entre $-1$ et $1$", "positif", "entre $0$ et $100$", "égal à la pente"], bonne: 0, explication: "Propriété de $r$." },
    { question: "$r = -0{,}98$ signifie que les points sont :", choix: ["presque alignés sur une droite décroissante", "presque alignés sur une droite croissante", "très dispersés", "tous égaux"], bonne: 0, explication: "$|r|$ proche de $1$, $r < 0$." },
    { question: "$r = 0{,}05$ signifie :", choix: ["qu'un ajustement affine n'est pas pertinent", "que les points sont alignés", "que la pente vaut $0{,}05$", "une forte corrélation"], bonne: 0, explication: "$|r|$ proche de $0$." },
    { question: "Estimer une valeur en dehors de la plage des données, c'est :", choix: ["extrapoler", "interpoler", "corréler", "ajuster"], bonne: 0, explication: "Extrapolation : prévision, plus fragile." },
    { question: "La droite $y = 2x + 3$ prévoit pour $x = 10$ :", choix: ["$23$", "$20$", "$13$", "$50$"], bonne: 0, explication: "$2 \\times 10 + 3$." },
    { question: "Avec $y = 0{,}5x + 4$, pour quelle valeur de $x$ obtient-on $y = 9$ ?", choix: ["$10$", "$8{,}5$", "$2{,}5$", "$26$"], bonne: 0, explication: "$0{,}5x = 5$." },
    { question: "Une forte corrélation entre deux variables prouve :", choix: ["rien sur une relation de cause à effet", "que l'une cause l'autre", "qu'elles sont égales", "que $r = 0$"], bonne: 0, explication: "Corrélation n'est pas causalité." },
    { question: "Les ventes de glaces et les noyades sont corrélées à cause :", choix: ["d'un facteur commun, la chaleur", "des glaces", "des noyades", "du hasard uniquement"], bonne: 0, explication: "Un troisième facteur explique les deux." },
    { question: "Si $r > 0$, la droite d'ajustement est :", choix: ["croissante", "décroissante", "horizontale", "verticale"], bonne: 0, explication: "$r$ et la pente ont le même signe." },
    { question: "Pour $z = x^2$ et l'ajustement $y = 3z + 1$, l'estimation pour $x = 2$ est :", choix: ["$13$", "$7$", "$25$", "$9$"], bonne: 0, explication: "$z = 4$, $y = 13$." },
    { question: "Somme des carrés des écarts des points $(1\\,;2)$, $(2\\,;5)$ à la droite $y = 2x$ :", choix: ["$1$", "$0$", "$2$", "$5$"], bonne: 0, explication: "Écarts $0$ et $1$." },
    { question: "Entre deux droites, la meilleure au sens des moindres carrés a :", choix: ["la plus petite somme des carrés des écarts", "la plus grande pente", "le plus grand $r$", "la plus petite ordonnée à l'origine"], bonne: 0, explication: "C'est le critère." },
    { question: "Un ajustement qui prévoit une concentration négative pour un médicament :", choix: ["n'est plus valable dans cette zone", "est parfait", "prouve que le médicament disparaît", "doit être prolongé"], bonne: 0, explication: "Regard critique sur le modèle." },
    { question: "Pour obtenir la droite des moindres carrés, on utilise en pratique :", choix: ["la régression linéaire de la calculatrice ou du tableur", "un tirage au sort", "la droite passant par les deux premiers points", "la médiane"], bonne: 0, explication: "Les outils numériques la calculent." },
    { question: "$G(4\\,;10)$ et la pente $a = 2$. L'ordonnée à l'origine $b$ vaut :", choix: ["$2$", "$10$", "$8$", "$-2$"], bonne: 0, explication: "$b = 10 - 2 \\times 4$." },
    { question: "Si $|r| = 1$ :", choix: ["les points sont exactement alignés", "les points sont tous égaux", "le nuage est un cercle", "l'ajustement est impossible"], bonne: 0, explication: "Alignement parfait." },
    { question: "Pour un nuage qui « monte de plus en plus vite », on peut essayer :", choix: ["un changement de variable", "de supprimer des points", "la moyenne seule", "$r = 0$"], bonne: 0, explication: "Par exemple $z = x^2$ (ou $\\ln y$ plus tard)." },
    { question: "« Corrélation forte » dans le cas des pharmacies et des malades s'explique par :", choix: ["la taille de la population", "les pharmacies", "les malades", "une erreur de calcul"], bonne: 0, explication: "Facteur commun." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Ajuster un nuage de points",
      etapes: ["Représenter le nuage et calculer le point moyen $G(\\bar{x}\\,;\\bar{y})$.", "Si le nuage est allongé, obtenir $y = ax + b$ à la calculatrice (régression linéaire).", "Vérifier $|r|$ proche de $1$ et que la droite passe par $G$."],
      exemple: "Pamandzi : $G(4{,}5\\,;26{,}7)$, $y \\approx 0{,}060x + 26{,}43$, $r \\approx 0{,}91$."
    },
    {
      titre: "Utiliser l'ajustement",
      etapes: ["Remplacer $x$ (ou résoudre $ax + b = y$) pour estimer.", "Dire s'il s'agit d'une interpolation ou d'une extrapolation.", "Critiquer : la valeur est-elle réaliste dans le contexte ?"],
      exemple: "Rang $12$ : $\\approx 27{,}1$ °C, extrapolation à prendre avec prudence."
    },
    {
      titre: "Changement de variable",
      etapes: ["Choisir $z$ ($x^2$, $\\sqrt{x}$, $\\dfrac{1}{x}$…) qui aligne le nuage $(z\\,;y)$.", "Ajuster $y = az + b$.", "Remplacer $z$ par son expression en $x$ pour estimer."],
      exemple: "$z = x^2$, $y = 0{,}5z + 4$ : pour $x = 6$, $y = 22$."
    }
  ],
  erreurs: [
    "Conclure à une relation de cause à effet à partir d'une forte corrélation.",
    "Extrapoler loin des données sans esprit critique.",
    "Oublier de vérifier que $|r|$ est proche de $1$ avant un ajustement affine.",
    "Inverser les rôles de $x$ et de $y$ dans la calculatrice.",
    "Dans un changement de variable, remplacer $x$ au lieu de $z$ dans l'équation de la droite.",
    "Calculer la somme des écarts au lieu de la somme des carrés des écarts."
  ]
};
