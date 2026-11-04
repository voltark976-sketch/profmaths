/*
  SUJET : 5e — Devoir commun n° 1 (milieu d'année, chapitres 1 à 9 de la progression)
  Page #sujet-cinquieme-dc-1 ; PDF de l'énoncé et du corrigé fabriqués par outils/sujets-pdf.js.
  Format : voir data/seconde/sujets/devoir-commun-1.js. 1 h 30 : partie 1 d'automatismes (6 points, 20 minutes,
  sans calculatrice), partie 2 de trois exercices (14 points, calculatrice autorisée). Sujet original, données fictives ;
  nombres et contextes différents de ceux des cours, des QCM et des onglets « Entraînement évaluation » de 5e.
  Repère dessiné par o.graph (assets/exercices-base.js).
*/
window.SUJETS = window.SUJETS || {};
window.SUJETS["cinquieme-dc-1"] = {
  entete: "5e · Devoir commun n° 1 · Durée : 1 h 30",
  consignes: "**Partie 1** (automatismes, $6$ points, $20$ minutes) : la calculatrice est **interdite**. Écris seulement les réponses.\n\n**Partie 2** ($14$ points) : la calculatrice est autorisée. Justifie tes réponses et écris tes calculs ; une recherche, même non aboutie, est prise en compte.",
  exercices: [
    {
      numero: "Partie 1", titre: "Automatismes",
      duree: 20, points: 6, calculatrice: false,
      contexte: "Pour chaque question, écris seulement la réponse. Les fractions sont à donner sous forme simplifiée.",
      questions: [
        { n: "1.", points: 0.5, texte: "Calcule $20 - 3 \\times 4 + 2$.", corrige: "$20 - 12 + 2 = 10$." },
        { n: "2.", points: 0.5, texte: "Calcule $(7 + 5) \\times (9 - 6)$.", corrige: "$12 \\times 3 = 36$." },
        { n: "3.", points: 0.5, texte: "Peut-on construire un triangle de côtés $4$ cm, $5$ cm et $10$ cm ?", corrige: "Non, car $4 + 5 = 9 < 10$." },
        { n: "4.", points: 0.5, texte: "Simplifie $\\dfrac{24}{32}$.", corrige: "$\\dfrac{3}{4}$." },
        { n: "5.", points: 0.5, texte: "Calcule $\\dfrac{2}{7} + \\dfrac{3}{14}$.", corrige: "$\\dfrac{4}{14} + \\dfrac{3}{14} = \\dfrac{7}{14} = \\dfrac{1}{2}$." },
        { n: "6.", points: 0.5, texte: "Calcule $30\\,\\%$ de $80$.", corrige: "$24$." },
        { n: "7.", points: 0.5, texte: "Deux angles d'un triangle mesurent $45^\\circ$ et $60^\\circ$. Combien mesure le troisième ?", corrige: "$180^\\circ - 45^\\circ - 60^\\circ = 75^\\circ$." },
        { n: "8.", points: 0.5, texte: "Donne le quotient et le reste de la division euclidienne de $100$ par $7$.", corrige: "$100 = 7 \\times 14 + 2$ : quotient $14$, reste $2$." },
        { n: "9.", points: 0.5, texte: "$1\\,245$ est-il divisible par $3$ ? Et par $5$ ?", corrige: "Oui par $3$ (la somme des chiffres vaut $12$) et oui par $5$ (il se termine par $5$)." },
        { n: "10.", points: 0.5, texte: "$A'$ est le symétrique de $A$ par rapport au point $O$. Que représente $O$ pour le segment $[AA']$ ?", corrige: "Son milieu." },
        { n: "11.", points: 0.5, texte: "Range dans l'ordre croissant : $-3$ ; $2$ ; $-5$ ; $0$.", corrige: "$-5 < -3 < 0 < 2$." },
        { n: "12.", points: 0.5, texte: "Calcule $(-7) + 4 - (-2)$.", corrige: "$-7 + 4 + 2 = -1$." }
      ]
    },
    {
      numero: "Partie 2 · exercice 1", titre: "Le jardin triangulaire",
      duree: 20, points: 4, calculatrice: true,
      contexte: "Une commune veut aménager un petit jardin en forme de triangle $ABC$.",
      questions: [
        { n: "1.", points: 1, texte: "Peut-on avoir $AB = 12$ m, $AC = 9$ m et $BC = 20$ m ?", indice: "Compare la plus grande longueur à la somme des deux autres.", corrige: "Le plus grand côté mesure $20$ m, et $12 + 9 = 21 > 20$ : oui, ce triangle est constructible." },
        { n: "2.", points: 1.5, texte: "On mesure $\\widehat{ABC} = 35^\\circ$ et $\\widehat{BCA} = 85^\\circ$. Combien mesure $\\widehat{BAC}$ ?", corrige: "La somme des angles d'un triangle vaut $180^\\circ$, donc $\\widehat{BAC} = 180^\\circ - 35^\\circ - 85^\\circ = 60^\\circ$." },
        { n: "3.", points: 1.5, texte: "On veut planter un arbre à égale distance des trois sommets du jardin. Où faut-il le planter ?", indice: "Les points situés à égale distance de $A$ et de $B$ sont sur la médiatrice du segment $[AB]$.", corrige: "Au centre du cercle circonscrit au triangle, c'est-à-dire au point où se coupent les médiatrices des trois côtés : ce point est à la même distance de $A$, de $B$ et de $C$." }
      ]
    },
    {
      numero: "Partie 2 · exercice 2", titre: "Le budget de la sortie",
      duree: 25, points: 5, calculatrice: true,
      contexte: "Une classe de $24$ élèves dispose de $840$ € pour une sortie. Elle consacre les $\\dfrac{3}{7}$ de cette somme au car et le quart aux entrées du musée.",
      questions: [
        { n: "1.", points: 1.5, texte: "Combien coûtent le car et les entrées ?", indice: "Pour prendre les $\\dfrac{3}{7}$ d'une somme, on la divise par $7$, puis on multiplie par $3$.", corrige: "Car : $840 \\div 7 \\times 3 = 360$ €. Entrées : $840 \\div 4 = 210$ €." },
        { n: "2.", points: 1, texte: "Combien reste-t-il pour le repas ?", corrige: "$840 - 360 - 210 = 270$ €." },
        { n: "3.", points: 1.5, texte: "Le repas coûte $12$ € par élève. La somme restante suffit-elle ? Écris le « solde » du budget avec un nombre relatif.", corrige: "Le repas coûte $24 \\times 12 = 288$ €. Il manque $288 - 270 = 18$ € : le solde vaut $270 - 288 = -18$ €." },
        { n: "4.", points: 1, texte: "Quelle fraction de la somme de départ représentent le car et les entrées réunis ?", indice: "Additionne les deux fractions après les avoir mises au même dénominateur $28$.", corrige: "$\\dfrac{3}{7} + \\dfrac{1}{4} = \\dfrac{12}{28} + \\dfrac{7}{28} = \\dfrac{19}{28}$." }
      ]
    },
    {
      numero: "Partie 2 · exercice 3", titre: "Dans le repère",
      duree: 25, points: 5, calculatrice: true,
      contexte: "Les points $A$, $B$ et $C$ sont placés dans le repère ci-dessous.",
      figure: (o) => o.graph({
        xmin: -4.5, xmax: 4.5, ymin: -3.5, ymax: 4.5, h: 260,
        points: [{ x: -3, y: 2, label: "A" }, { x: 1, y: 4, label: "B" }, { x: 2, y: -2, label: "C" }],
        aria: "Repère avec les points A(−3 ; 2), B(1 ; 4) et C(2 ; −2)"
      }),
      questions: [
        { n: "1.", points: 1.5, texte: "Lis les coordonnées des points $A$, $B$ et $C$.", corrige: "$A(-3\\,;2)$, $B(1\\,;4)$ et $C(2\\,;-2)$." },
        { n: "2.", points: 1.5, texte: "Le point $A'$ est le symétrique de $A$ par rapport à l'origine $O$ du repère. Quelles sont ses coordonnées ?", indice: "$O$ est le milieu de $[AA']$ : on fait le même déplacement de $O$ vers $A'$ que de $A$ vers $O$.", corrige: "De $A$ à $O$, on va de $3$ unités vers la droite et de $2$ vers le bas ; en recommençant depuis $O$, on arrive en $A'(3\\,;-2)$ : les coordonnées sont opposées à celles de $A$." },
        { n: "3.", points: 1, texte: "Quel est l'écart entre les ordonnées de $B$ et de $C$ ?", corrige: "$4 - (-2) = 4 + 2 = 6$." },
        { n: "4.", points: 1, texte: "Quels points ont deux coordonnées de signes contraires ?", corrige: "$A(-3\\,;2)$ et $C(2\\,;-2)$." }
      ]
    }
  ]
};
