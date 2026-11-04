/*
  SUJET : 6e — Devoir commun n° 1 (milieu d'année, chapitres 1 à 8 de la progression)
  Page #sujet-sixieme-dc-1 ; PDF de l'énoncé et du corrigé fabriqués par outils/sujets-pdf.js.
  Format : voir data/seconde/sujets/devoir-commun-1.js. 1 h 30 : partie 1 d'automatismes (6 points, 20 minutes,
  sans calculatrice), partie 2 de trois exercices (14 points, calculatrice autorisée). Sujet original, données fictives ;
  nombres et contextes différents de ceux des cours, des QCM et des onglets « Entraînement évaluation » de 6e.
*/
window.SUJETS = window.SUJETS || {};
window.SUJETS["sixieme-dc-1"] = {
  entete: "6e · Devoir commun n° 1 · Durée : 1 h 30",
  consignes: "**Partie 1** (automatismes, $6$ points, $20$ minutes) : la calculatrice est **interdite**. Écris seulement les réponses.\n\n**Partie 2** ($14$ points) : la calculatrice est autorisée. Justifie tes réponses et écris tes calculs ; une recherche, même non aboutie, est prise en compte.",
  exercices: [
    {
      numero: "Partie 1", titre: "Automatismes",
      duree: 20, points: 6, calculatrice: false,
      contexte: "Pour chaque question, écris seulement la réponse. Les fractions sont à donner sous forme simplifiée.",
      questions: [
        { n: "1.", points: 0.5, texte: "Écris en chiffres : « deux millions soixante-quinze mille huit ».", corrige: "$2\\,075\\,008$." },
        { n: "2.", points: 0.5, texte: "Quel est le chiffre des dixièmes de $403{,}58$ ?", corrige: "$5$." },
        { n: "3.", points: 0.5, texte: "Calcule $6{,}4 \\times 100$.", corrige: "$640$." },
        { n: "4.", points: 0.5, texte: "Range dans l'ordre croissant : $2{,}7$ ; $2{,}07$ ; $2{,}17$.", corrige: "$2{,}07 < 2{,}17 < 2{,}7$." },
        { n: "5.", points: 0.5, texte: "Calcule $15{,}6 + 4{,}75$.", corrige: "$20{,}35$." },
        { n: "6.", points: 0.5, texte: "Calcule $9 \\times 0{,}6$.", corrige: "$5{,}4$." },
        { n: "7.", points: 0.5, texte: "Donne le quotient et le reste de la division euclidienne de $85$ par $6$.", corrige: "$85 = 6 \\times 14 + 1$ : quotient $14$, reste $1$." },
        { n: "8.", points: 0.5, texte: "Écris $\\dfrac{13}{5}$ sous forme décimale.", corrige: "$13 \\div 5 = 2{,}6$." },
        { n: "9.", points: 0.5, texte: "Calcule les $\\dfrac{2}{5}$ de $30$.", corrige: "$30 \\div 5 \\times 2 = 12$." },
        { n: "10.", points: 0.5, texte: "Calcule $25\\,\\%$ de $48$.", corrige: "Le quart de $48$ : $12$." },
        { n: "11.", points: 0.5, texte: "$4$ stylos coûtent $6$ €. Combien coûtent $10$ stylos ?", corrige: "Un stylo coûte $1{,}50$ €, donc $10$ stylos coûtent $15$ €." },
        { n: "12.", points: 0.5, texte: "On lance un dé équilibré à six faces. Quelle est la probabilité d'obtenir $5$ ?", corrige: "$\\dfrac{1}{6}$." }
      ]
    },
    {
      numero: "Partie 2 · exercice 1", titre: "Le stand de crêpes",
      duree: 20, points: 4, calculatrice: true,
      contexte: "Pour la fête du collège, une classe tient un stand de crêpes. Il faut $250$ g de farine pour $10$ crêpes ; la masse de farine est proportionnelle au nombre de crêpes.",
      questions: [
        { n: "1.", points: 1, texte: "Quelle masse de farine faut-il pour $30$ crêpes ?", corrige: "$30$, c'est $3 \\times 10$ : il faut $3 \\times 250 = 750$ g de farine." },
        { n: "2.", points: 1, texte: "Combien de crêpes peut-on faire avec $1$ kg de farine ?", indice: "$1$ kg $= 1\\,000$ g : combien de fois $250$ g y a-t-il dans $1\\,000$ g ?", corrige: "$1$ kg $= 1\\,000$ g $= 4 \\times 250$ g : on peut faire $4 \\times 10 = 40$ crêpes." },
        { n: "3.", points: 1, texte: "La classe vend $36$ crêpes à $1{,}50$ € l'une. Quelle somme d'argent reçoit-elle ?", corrige: "$36 \\times 1{,}50 = 54$ €." },
        { n: "4.", points: 1, texte: "Les ingrédients ont coûté $13{,}80$ €. Quel est le bénéfice, c'est-à-dire ce qu'il reste une fois les ingrédients payés ?", corrige: "$54 - 13{,}80 = 40{,}20$ €." }
      ]
    },
    {
      numero: "Partie 2 · exercice 2", titre: "La cour de l'école",
      duree: 25, points: 5, calculatrice: true,
      contexte: "La cour d'une école mesure $600$ m². Le quart de la cour est occupé par le préau, les $\\dfrac{2}{5}$ par le terrain de football, et le reste par un jardin.",
      questions: [
        { n: "1.", points: 1.5, texte: "Calcule l'aire du préau, puis celle du terrain de football.", indice: "Pour prendre les $\\dfrac{2}{5}$ d'une quantité, on la divise par $5$, puis on multiplie par $2$.", corrige: "Préau : $600 \\div 4 = 150$ m². Terrain : $600 \\div 5 \\times 2 = 240$ m²." },
        { n: "2.", points: 1.5, texte: "Quelle est l'aire du jardin ?", corrige: "$600 - 150 - 240 = 210$ m²." },
        { n: "3.", points: 1, texte: "Quelle fraction de la cour le jardin occupe-t-il ? Simplifie-la.", corrige: "$\\dfrac{210}{600} = \\dfrac{7}{20}$." },
        { n: "4.", points: 1, texte: "Exprime cette part en pourcentage.", indice: "Cherche la fraction égale dont le dénominateur est $100$.", corrige: "$\\dfrac{7}{20} = \\dfrac{35}{100} = 35\\,\\%$ de la cour." }
      ]
    },
    {
      numero: "Partie 2 · exercice 3", titre: "Les petits déjeuners",
      duree: 25, points: 5, calculatrice: true,
      contexte: "On a demandé aux $25$ élèves d'une classe ce qu'ils mangent le matin (données fictives) : $10$ mangent des céréales, $8$ du pain, $5$ des fruits et $2$ ne mangent rien.",
      questions: [
        { n: "1.", points: 1, texte: "Vérifie que tous les élèves ont répondu.", corrige: "$10 + 8 + 5 + 2 = 25$ : les $25$ élèves ont répondu." },
        { n: "2.", points: 1.5, texte: "Quelle fraction de la classe mange des céréales ? Exprime-la en pourcentage.", corrige: "$\\dfrac{10}{25} = \\dfrac{2}{5} = \\dfrac{40}{100}$, soit $40\\,\\%$ de la classe." },
        { n: "3.", points: 1.5, texte: "On choisit un élève de la classe au hasard. Quelle est la probabilité qu'il mange des fruits le matin ? Donne-la sous forme d'une fraction simplifiée.", corrige: "$5$ élèves sur $25$ : $\\dfrac{5}{25} = \\dfrac{1}{5}$." },
        { n: "4.", points: 1, texte: "Quel pourcentage des élèves ne mange rien le matin ?", corrige: "$\\dfrac{2}{25} = \\dfrac{8}{100}$, soit $8\\,\\%$ des élèves." }
      ]
    }
  ]
};
