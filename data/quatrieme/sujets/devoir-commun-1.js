/*
  SUJET : 4e — Devoir commun n° 1 (milieu d'année, chapitres 1 à 8 de la progression)
  Page #sujet-quatrieme-dc-1 ; PDF de l'énoncé et du corrigé fabriqués par outils/sujets-pdf.js.
  Format : voir data/seconde/sujets/devoir-commun-1.js. 1 h 30 : partie 1 d'automatismes (6 points, 20 minutes,
  sans calculatrice), partie 2 de trois exercices (14 points, calculatrice autorisée). Sujet original, données fictives ;
  nombres et contextes différents de ceux des cours, des QCM et des onglets « Entraînement évaluation » de 4e.
  Figure dessinée par o.figGeo (assets/exercices-base.js).
*/
window.SUJETS = window.SUJETS || {};
window.SUJETS["quatrieme-dc-1"] = {
  entete: "4e · Devoir commun n° 1 · Durée : 1 h 30",
  consignes: "**Partie 1** (automatismes, $6$ points, $20$ minutes) : la calculatrice est **interdite**. Écris seulement les réponses.\n\n**Partie 2** ($14$ points) : la calculatrice est autorisée. Justifie tes réponses et écris tes calculs ; une recherche, même non aboutie, est prise en compte.",
  exercices: [
    {
      numero: "Partie 1", titre: "Automatismes",
      duree: 20, points: 6, calculatrice: false,
      contexte: "Pour chaque question, écris seulement la réponse. Les fractions sont à donner sous forme irréductible.",
      questions: [
        { n: "1.", points: 0.5, texte: "Décompose $126$ en produit de facteurs premiers.", corrige: "$126 = 2 \\times 3^2 \\times 7$." },
        { n: "2.", points: 0.5, texte: "Calcule $(-9) \\times (-4)$.", corrige: "$36$." },
        { n: "3.", points: 0.5, texte: "Calcule $\\dfrac{-45}{9}$.", corrige: "$-5$." },
        { n: "4.", points: 0.5, texte: "Calcule $\\dfrac{2}{3} \\times \\dfrac{9}{8}$.", corrige: "$\\dfrac{18}{24} = \\dfrac{3}{4}$." },
        { n: "5.", points: 0.5, texte: "Calcule $\\dfrac{7}{10} - \\dfrac{1}{4}$.", corrige: "$\\dfrac{14}{20} - \\dfrac{5}{20} = \\dfrac{9}{20}$." },
        { n: "6.", points: 0.5, texte: "Écris $0{,}000\\,72$ en notation scientifique.", corrige: "$7{,}2 \\times 10^{-4}$." },
        { n: "7.", points: 0.5, texte: "Écris $10^5 \\times 10^{-3}$ sous la forme d'une puissance de $10$.", corrige: "$10^2$." },
        { n: "8.", points: 0.5, texte: "Augmenter un prix de $15\\,\\%$, c'est le multiplier par quel nombre ?", corrige: "$1{,}15$." },
        { n: "9.", points: 0.5, texte: "Dans un triangle rectangle, les côtés de l'angle droit mesurent $7$ cm et $24$ cm. Combien mesure l'hypoténuse ?", corrige: "$\\sqrt{49 + 576} = \\sqrt{625} = 25$ cm." },
        { n: "10.", points: 0.5, texte: "Une pyramide a une base de $15$ cm² et une hauteur de $6$ cm. Quel est son volume ?", corrige: "$\\dfrac{15 \\times 6}{3} = 30$ cm³." },
        { n: "11.", points: 0.5, texte: "Dans un triangle $ABC$, $M$ est sur $[AB]$ et $N$ sur $[AC]$, avec $(MN) \\parallel (BC)$, $AM = 3$, $AB = 4$ et $BC = 8$. Combien mesure $MN$ ?", corrige: "$MN = \\dfrac{3}{4} \\times 8 = 6$." },
        { n: "12.", points: 0.5, texte: "Calcule $-2 + 3 \\times (-5)$.", corrige: "$-2 - 15 = -17$." }
      ]
    },
    {
      numero: "Partie 2 · exercice 1", titre: "L'échelle et le mur",
      duree: 20, points: 4, calculatrice: true,
      contexte: "Une échelle de $5{,}2$ m de long est appuyée contre un mur vertical. Son pied est posé sur le sol horizontal, à $2$ m du mur.",
      questions: [
        { n: "1.", points: 2, texte: "À quelle hauteur le haut de l'échelle touche-t-il le mur ?", indice: "Le mur, le sol et l'échelle forment un triangle rectangle ; l'échelle en est l'hypoténuse.", corrige: "Le mur est perpendiculaire au sol. On note $h$ la hauteur cherchée ; d'après le théorème de Pythagore :\n\n$h^2 = 5{,}2^2 - 2^2 = 27{,}04 - 4 = 23{,}04$\n\ndonc $h = \\sqrt{23{,}04} = 4{,}8$ m." },
        { n: "2.", points: 1, texte: "On admet qu'une échelle est stable quand son pied est à une distance du mur comprise entre le quart et le tiers de sa longueur. Cette échelle est-elle stable ?", indice: "Calcule le quart et le tiers de $5{,}2$ m, puis compare-les à $2$ m.", corrige: "Le quart de $5{,}2$ m vaut $1{,}3$ m et le tiers vaut environ $1{,}73$ m. Or $2 > 1{,}73$ : le pied est trop loin du mur, l'échelle n'est pas stable." },
        { n: "3.", points: 1, texte: "Pour vérifier qu'un autre mur est vertical, un maçon marque un point $P$ sur le mur à $1{,}2$ m du sol, et un point $Q$ sur le sol à $0{,}9$ m du pied $R$ du mur. Il mesure $PQ = 1{,}5$ m. Le mur est-il vertical ?", indice: "Compare $PQ^2$ et $PR^2 + RQ^2$.", corrige: "$PQ^2 = 1{,}5^2 = 2{,}25$\n\n$PR^2 + RQ^2 = 1{,}2^2 + 0{,}9^2$\n\n${} = 1{,}44 + 0{,}81 = 2{,}25$\n\nL'égalité de Pythagore est vérifiée : d'après la réciproque du théorème de Pythagore, le triangle $PQR$ est rectangle en $R$. Le mur est perpendiculaire au sol horizontal, donc il est vertical." }
      ]
    },
    {
      numero: "Partie 2 · exercice 2", titre: "Le réservoir conique",
      duree: 25, points: 5, calculatrice: true,
      contexte: "Un réservoir d'eau a la forme d'un cône de révolution de rayon $1{,}5$ m et de hauteur $2$ m.",
      questions: [
        { n: "1.", points: 2, texte: "Calcule le volume du réservoir, en m³, arrondi au centième.", indice: "Le volume d'un cône vaut $\\dfrac{\\pi \\times r^2 \\times h}{3}$.", corrige: "$V = \\dfrac{\\pi \\times 1{,}5^2 \\times 2}{3}$\n\n${} = 1{,}5\\pi \\approx 4{,}71$ m³" },
        { n: "2.", points: 1, texte: "Combien de litres d'eau peut-il contenir ? Arrondis à la centaine de litres.", indice: "$1$ m³ $= 1\\,000$ L.", corrige: "$1{,}5\\pi$ m³ $\\approx 4\\,712$ L, soit environ $4\\,700$ L." },
        { n: "3.", points: 2, texte: "On fabrique une maquette du réservoir à l'échelle $\\dfrac{1}{10}$. Quel est le volume de la maquette, en litres ?", indice: "Dans une réduction de rapport $k$, les longueurs sont multipliées par $k$ et les volumes par $k^3$.", corrige: "Les longueurs sont divisées par $10$, donc le volume est divisé par $10^3 = 1\\,000$ : environ $4\\,712 \\div 1\\,000 \\approx 4{,}7$ L." }
      ]
    },
    {
      numero: "Partie 2 · exercice 3", titre: "L'escabeau",
      duree: 25, points: 5, calculatrice: true,
      contexte: "Vu de côté, un escabeau ouvert forme un triangle $ABC$ isocèle en $A$, posé sur le sol $(BC)$, avec $AB = AC = 2$ m et $BC = 1{,}5$ m. Une barre de sécurité $[MN]$, parallèle au sol, relie les deux montants : $M$ est sur $[AB]$ et $N$ sur $[AC]$, avec $AM = 1{,}2$ m.",
      figure: (o) => o.figGeo({
        W: 320, H: 210,
        pts: { A: [160, 30.26], B: [97, 186], C: [223, 186], M: [122.2, 123.7], N: [197.8, 123.7] },
        segs: [["A", "B"], ["A", "C"], ["M", "N"]],
        droites: [["B", "C", 0.6]],
        cotes: [["A", "M", "1,2 m", "C", 14]],
        textes: [[292, 180, "sol", "end", "g-clabel"]],
        decal: { A: [0, -6], B: [-6, 14], C: [6, 14], M: [-8, 0], N: [8, 0] },
        aria: "Escabeau vu de côté : triangle ABC isocèle en A posé sur le sol, barre [MN] parallèle au sol, AM = 1,2 m"
      }),
      questions: [
        { n: "1.", points: 2, texte: "Calcule la longueur $MN$ de la barre.", indice: "Écris l'égalité des rapports de Thalès dans les triangles $AMN$ et $ABC$.", corrige: "$(MN) \\parallel (BC)$, donc d'après le théorème de Thalès :\n\n$\\dfrac{AM}{AB} = \\dfrac{MN}{BC}$\n\n$\\dfrac{1{,}2}{2} = \\dfrac{MN}{1{,}5}$\n\nDonc $MN = 0{,}6 \\times 1{,}5 = 0{,}9$ m." },
        { n: "2.", points: 1.5, texte: "Calcule $AN$.", corrige: "$\\dfrac{AN}{AC} = \\dfrac{AM}{AB} = 0{,}6$\n\nDonc $AN = 0{,}6 \\times 2 = 1{,}2$ m." },
        { n: "3.", points: 1.5, texte: "Sur un autre escabeau, on mesure $AM = 1{,}5$ m, $AB = 2{,}5$ m, $AN = 1{,}4$ m et $AC = 2{,}4$ m. La barre est-elle parallèle au sol ?", indice: "Si la barre était parallèle au sol, on aurait $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$ : vérifie si c'est le cas.", corrige: "$\\dfrac{AM}{AB} = \\dfrac{1{,}5}{2{,}5} = 0{,}6$\n\n$\\dfrac{AN}{AC} = \\dfrac{1{,}4}{2{,}4} \\approx 0{,}58$\n\nLes rapports ne sont pas égaux (sans arrondi : $1{,}5 \\times 2{,}4 = 3{,}6$ alors que $2{,}5 \\times 1{,}4 = 3{,}5$). Si la barre était parallèle au sol, ils seraient égaux d'après le théorème de Thalès : la barre n'est donc pas parallèle au sol." }
      ]
    }
  ]
};
