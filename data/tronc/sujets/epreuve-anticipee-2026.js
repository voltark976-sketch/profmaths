/*
  SUJET OFFICIEL : Première tronc commun — Épreuve anticipée de mathématiques sans spécialité, 12 juin 2026,
  métropole, La Réunion et Mayotte (26-MATGEME1)
  Page #sujet-tronc-2026 ; PDF du corrigé fabriqué par outils/sujets-pdf.js. Même format que
  data/premiere/sujets/metropole-2026.js : l'énoncé n'est pas recopié (PDF publié par le ministère), chaque question n'a
  qu'un court rappel, avec un indice et le corrigé rédigé par ProfMaths. Le sujet donne les points des exercices (6 et 8) :
  leur répartition entre les questions est indicative. Partie 1 : QCM de 8 questions (0,75 point chacune), propositions a à d.
*/
window.SUJETS = window.SUJETS || {};
window.SUJETS["tronc-2026"] = {
  entete: "Première tronc commun · Épreuve anticipée de mathématiques du 12 juin 2026, sans spécialité (sujet officiel) · Durée : 2 heures, sans calculatrice",
  consignes: "**Sujet officiel** de la première session de l'épreuve anticipée pour les élèves sans spécialité mathématiques, passé le 12 juin 2026 en métropole, à La Réunion et à Mayotte. Le ministère l'a publié sur son site. Son énoncé n'est pas recopié ici : ouvre-le ou imprime-le, fais le sujet en $2$ heures sans calculatrice, puis compare ta copie avec ce corrigé, question par question.\n\nDans ce sujet, la partie 1 est un QCM de huit questions. En juin 2027, elle sera faite de questions à réponses courtes, sans propositions : entraîne-toi à trouver chaque réponse avant de regarder les propositions. Le sujet donne les points de chaque exercice ; leur répartition entre les questions est indicative.",
  exercices: [
    {
      numero: "Partie 1", titre: "Automatismes (QCM)",
      duree: 20, points: 6, calculatrice: false,
      contexte: "Huit questions, une seule proposition exacte par question ; une réponse fausse n'enlève pas de point. Le corrigé donne la lettre de la bonne réponse et le calcul qui y mène.",
      questions: [
        { n: "1.", points: 0.75, texte: "L'écriture décimale de $\\dfrac{2}{5}$.", corrige: "$\\dfrac{2}{5} = \\dfrac{4}{10} = 0{,}4$ : réponse **c**." },
        { n: "2.", points: 0.75, texte: "$30\\,\\%$ de $150$.", corrige: "$0{,}3 \\times 150 = 45$ : réponse **c**." },
        { n: "3.", points: 0.75, texte: "Un antécédent de $3$ par la fonction $f$ représentée.", corrige: "On cherche les abscisses des points de la courbe d'ordonnée $3$. La courbe n'atteint la hauteur $3$ qu'en son sommet, au point $(1\\,;3)$ : $1$ est un antécédent de $3$. Réponse **b**." },
        { n: "4.", points: 0.75, texte: "La solution de l'équation $7x + 4 = 5x + 6$.", corrige: "$7x + 4 = 5x + 6 \\iff 2x = 2 \\iff x = 1$ : réponse **d**." },
        { n: "5.", points: 0.75, texte: "Le prix final d'un article de $50$ € qui baisse de $10\\,\\%$, puis augmente de $10\\,\\%$.", corrige: "$50 \\times 0{,}9 = 45$, puis $45 \\times 1{,}1 = 49{,}5$ : le prix final est $49{,}50$ €. Réponse **a**.\n\nUne baisse et une hausse de même taux ne se compensent pas." },
        { n: "6.", points: 0.75, texte: "Le point d'abscisse $-1$ de la courbe d'équation $y = 2x^2 - x + 3$.", corrige: "$2 \\times (-1)^2 - (-1) + 3 = 2 + 1 + 3 = 6$ : le point est $D(-1\\,;6)$. Réponse **d**." },
        { n: "7.", points: 0.75, texte: "Le coefficient directeur de la droite passant par $A(-1\\,;2)$ et $B(-3\\,;4)$.", corrige: "$\\dfrac{y_B - y_A}{x_B - x_A} = \\dfrac{4 - 2}{-3 - (-1)} = \\dfrac{2}{-2} = -1$ : réponse **b**." },
        { n: "8.", points: 0.75, texte: "La médiane des notes $2$ ; $3$ ; $5$ ; $4$ ; $2$ ; $3$.", corrige: "Rangées dans l'ordre : $2$ ; $2$ ; $3$ ; $3$ ; $4$ ; $5$. Il y a six notes : la médiane est la moyenne des troisième et quatrième valeurs, $\\dfrac{3 + 3}{2} = 3$. Réponse **b**." }
      ]
    },
    {
      numero: "Partie 2 · exercice 1", titre: "Les sportifs de haut niveau d'un lycée",
      duree: 45, points: 6, calculatrice: false,
      contexte: "Rappel des données : $120$ élèves sportifs de haut niveau, en section judo ($J$) ou aquatique ($A$), en seconde ($S$), première ($P$) ou terminale ($T$). Le tableau de l'énoncé donne : judo et terminale $8$, total judo $24$, aquatique et seconde $40$, total seconde $50$, total terminale $14$. Les résultats sont à donner sous forme de fraction.",
      questions: [
        {
          n: "1.", points: 1.5, texte: "Compléter le tableau.",
          indice: "Commence par les cases où il ne manque qu'un nombre dans la ligne ou dans la colonne.",
          corrige: "Judo et seconde : $50 - 40 = 10$ ; aquatique et terminale : $14 - 8 = 6$ ; total aquatique : $120 - 24 = 96$ ; judo et première : $24 - 10 - 8 = 6$ ; aquatique et première : $96 - 40 - 6 = 50$ ; total première : $6 + 50 = 56$.",
          tableauCorrige: { lignes: [["", "2^{\\text{de}}", "1^{\\text{re}}", "\\text{T}^{\\text{le}}", "\\text{Total}"], ["\\text{Judo}", "10", "6", "8", "24"], ["\\text{Aquatique}", "40", "50", "6", "96"], ["\\text{Total}", "50", "56", "14", "120"]] },
          corrigeFin: "Vérification : $50 + 56 + 14 = 120$."
        },
        { n: "2.", points: 1, texte: "Décrire l'événement $A \\cap S$ par une phrase, puis calculer sa probabilité.", corrige: "$A \\cap S$ : « l'élève est en section aquatique et en seconde ». Le choix se fait au hasard parmi les $120$ élèves, dont $40$ sont dans ce cas :\n\n$P(A \\cap S) = \\dfrac{40}{120} = \\dfrac{1}{3}$" },
        { n: "3.", points: 1, texte: "La probabilité qu'un élève sportif de seconde soit en section aquatique.", indice: "On choisit parmi les élèves de seconde seulement : c'est la probabilité conditionnelle $P_S(A)$.", corrige: "Parmi les $50$ élèves de seconde, $40$ sont en section aquatique :\n\n$P_S(A) = \\dfrac{40}{50} = \\dfrac{4}{5}$" },
        { n: "4.a", points: 0.75, texte: "La probabilité de l'événement $J$.", corrige: "$P(J) = \\dfrac{24}{120} = \\dfrac{1}{5}$." },
        { n: "4.b", points: 0.75, texte: "La probabilité $P_T(J)$.", corrige: "Parmi les $14$ élèves de terminale, $8$ sont en section judo :\n\n$P_T(J) = \\dfrac{8}{14} = \\dfrac{4}{7}$" },
        { n: "4.c", points: 1, texte: "Les événements $J$ et $T$ sont-ils indépendants ?", indice: "$J$ et $T$ sont indépendants si et seulement si $P_T(J) = P(J)$.", corrige: "$J$ et $T$ sont indépendants si et seulement si $P_T(J) = P(J)$. Or $P_T(J) = \\dfrac{4}{7}$ et $P(J) = \\dfrac{1}{5}$ ne sont pas égaux : les événements $J$ et $T$ ne sont pas indépendants.\n\nLes élèves de terminale sont, en proportion, bien plus souvent en section judo que l'ensemble des sportifs." }
      ]
    },
    {
      numero: "Partie 2 · exercice 2", titre: "Deux placements pour un projet",
      duree: 55, points: 8, calculatrice: false,
      contexte: "Rappel des données : un capital de $20\\,000$ € en 2025 ; il faut $22\\,000$ € pour le projet. Placement A : $+200$ € chaque année ($a_n$ en $2025 + n$, $a_0 = 20\\,000$). Placement B : $+2\\,\\%$ chaque année ($b_n$ en $2025 + n$, $b_0 = 20\\,000$) ; l'énoncé donne un tableau des valeurs de $b_n$ arrondies à l'euro, pour $n$ de $0$ à $10$.",
      questions: [
        { partie: "A. Premier placement" },
        { n: "1.", points: 0.5, texte: "Calculer $a_1$ et $a_2$.", corrige: "$a_1 = 20\\,000 + 200 = 20\\,200$ et $a_2 = 20\\,200 + 200 = 20\\,400$." },
        { n: "2.a", points: 0.5, texte: "$a_{n+1}$ en fonction de $a_n$.", corrige: "Chaque année, le capital augmente de $200$ € : $a_{n+1} = a_n + 200$ pour tout entier naturel $n$." },
        { n: "2.b", points: 0.5, texte: "La nature de la suite $(a_n)$ et sa raison.", corrige: "On ajoute $200$ à chaque terme pour obtenir le suivant : $(a_n)$ est arithmétique de raison $200$." },
        { n: "3.", points: 1, texte: "$a_n$ en fonction de $n$.", corrige: "Pour une suite arithmétique, $a_n = a_0 + n \\times r$ : $a_n = 20\\,000 + 200n$ pour tout entier naturel $n$." },
        { n: "4.", points: 1, texte: "L'année à partir de laquelle le capital atteint $22\\,000$ €.", indice: "Résous $20\\,000 + 200n \\geqslant 22\\,000$, avec $n$ entier.", corrige: "$20\\,000 + 200n \\geqslant 22\\,000 \\iff 200n \\geqslant 2\\,000 \\iff n \\geqslant 10$.\n\nAvec le placement A, ils auront la somme nécessaire à partir de $2025 + 10 = 2035$." },
        { partie: "B. Second placement" },
        { n: "1.", points: 0.5, texte: "Détailler le calcul qui donne $b_1 = 20\\,400$.", corrige: "Augmenter de $2\\,\\%$, c'est multiplier par $1 + \\dfrac{2}{100} = 1{,}02$ : $b_1 = 20\\,000 \\times 1{,}02 = 20\\,400$. Autre calcul : $2\\,\\%$ de $20\\,000$ font $400$, et $20\\,000 + 400 = 20\\,400$." },
        { n: "2.a", points: 0.5, texte: "$b_{n+1}$ en fonction de $b_n$.", corrige: "Chaque année, le capital est multiplié par $1{,}02$ : $b_{n+1} = 1{,}02\\,b_n$ pour tout entier naturel $n$." },
        { n: "2.b", points: 0.5, texte: "La nature de la suite $(b_n)$ et sa raison.", corrige: "On multiplie chaque terme par $1{,}02$ pour obtenir le suivant : $(b_n)$ est géométrique de raison $1{,}02$." },
        { n: "3.", points: 1, texte: "$b_n$ en fonction de $n$.", corrige: "Pour une suite géométrique, $b_n = b_0 \\times q^n$ : $b_n = 20\\,000 \\times 1{,}02^n$ pour tout entier naturel $n$." },
        { n: "4.", points: 1, texte: "L'année à partir de laquelle le capital atteint $22\\,000$ €, avec le tableau.", indice: "Cherche dans le tableau la première valeur de $b_n$ supérieure ou égale à $22\\,000$.", corrige: "D'après le tableau, $b_4 \\approx 21\\,649$, encore en dessous de $22\\,000$, et $b_5 \\approx 22\\,082$. Le capital augmente chaque année, donc avec le placement B, ils auront la somme nécessaire à partir de $2025 + 5 = 2030$." },
        { partie: "C. Bilan" },
        { n: "", points: 1, texte: "Le placement à conseiller pour réaliser le projet le plus tôt possible.", corrige: "Avec le placement A, le projet est possible en 2035 ; avec le placement B, dès 2030. Il faut conseiller le **placement B**.\n\nLe placement B rapporte $2\\,\\%$ du capital, soit au moins $400$ € par an, alors que le placement A ne rapporte que $200$ € par an." }
      ]
    }
  ]
};
