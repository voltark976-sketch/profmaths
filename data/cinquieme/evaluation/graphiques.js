/*
  ENTRAÎNEMENT : 5e — chapitre 10, Graphiques et grandeurs en fonction d'une autre
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre cinquieme-graphiques.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 5e, sans calculatrice.
  Figures dessinées par o.graph et o.figGeo (assets/exercices-base.js). Données fictives, différentes de celles du cours, de la méthode et du QCM.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["cinquieme-graphiques"] = {
  revisions: {
    intro: "Les grandeurs en fonction d'une autre en un coup d'œil : formules, tableaux, lecture de graphiques et proportionnalité. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Une formule",
        texte: "Une formule permet de calculer une grandeur à partir d'une autre : avec $P = 6 + 4 \\times n$, pour $n = 3$, on trouve $P = 6 + 12 = 18$."
      },
      {
        titre: "Un tableau de valeurs",
        texte: "On choisit des valeurs, on applique la formule à chacune, et on range les résultats dans un tableau à deux lignes."
      },
      {
        titre: "Lire un graphique",
        texte: "La grandeur de départ se lit sur l'axe horizontal, celle qui en dépend sur l'axe vertical. Une partie horizontale signifie que la grandeur ne change pas."
      },
      {
        titre: "Proportionnalité",
        texte: "Une situation de proportionnalité est représentée par des points alignés avec l'origine du repère. Des points alignés qui ne passent pas par l'origine ne traduisent pas une proportionnalité."
      }
    ],
    pieges: [
      "Inverser les axes : la durée, ici, se lit à l'horizontale.",
      "Oublier les priorités dans une formule : $6 + 4 \\times n$ n'est pas $(6 + 4) \\times n$.",
      "Croire que des points alignés traduisent toujours une proportionnalité.",
      "Lire un graphique sans regarder les unités et la graduation des axes.",
      "Prendre une pause, partie horizontale, pour une montée très rapide."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "La location de vélos",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Une agence loue des vélos : on paie $5$ € d'inscription, puis $1{,}50$ € par heure. Le prix $P$, en euros, pour $h$ heures est donné par la formule $P = 5 + 1{,}5 \\times h$.",
        questions: [
          {
            n: "1.", points: 2, texte: "Complète le tableau.",
            tableau: { lignes: [["h", "2", "4", "6"], ["P", "?", "?", "?"]] },
            corrige: "$5 + 1{,}5 \\times 2 = 8$ ; $5 + 1{,}5 \\times 4 = 11$ ; $5 + 1{,}5 \\times 6 = 14$.",
            tableauCorrige: { lignes: [["h", "2", "4", "6"], ["P", "8", "11", "14"]] }
          },
          { n: "2.", points: 1.5, texte: "Le prix est-il proportionnel à la durée de location ?", corrige: "Non : pour $2$ h on paie $8$ €, mais pour $4$ h on paie $11$ €, et non $16$ €. Le prix n'est pas proportionnel à la durée." },
          { n: "3.", points: 2, texte: "Combien d'heures peut-on louer un vélo avec $20$ € ?", indice: "Retire d'abord l'inscription.", corrige: "Sans l'inscription, il reste $20 - 5 = 15$ €, et $15 \\div 1{,}5 = 10$ : on peut louer le vélo $10$ heures." },
          { n: "4.", points: 1.5, texte: "Une autre agence fait payer $P = 2{,}5 \\times h$. Pour $4$ heures, quelle agence est la moins chère ?", corrige: "Autre agence : $2{,}5 \\times 4 = 10$ €, contre $11$ € pour la première. Pour $4$ heures, l'autre agence est moins chère." }
        ]
      },
      {
        titre: "La randonnée",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Le graphique donne la distance parcourue par un randonneur, en km, en fonction de la durée de marche, en heures.",
        figure: (o) => o.graph({
          xmin: -0.3, xmax: 4.4, xstep: 0.5, ymin: 0, ymax: 13.5, ystep: 1, h: 280,
          xlabel: "durée (h)", ylabel: "distance (km)",
          curves: [{ f: (t) => (t <= 1 ? 4.5 * t : t <= 2 ? 4.5 : t <= 3.5 ? 4.5 + (5.5 / 1.5) * (t - 2) : 10 + 4 * (t - 3.5)), a: 0, b: 4, closed: false }],
          aria: "Distance du randonneur en fonction du temps : 4,5 km en 1 h, pause de 1 h à 2 h, 10 km au bout de 3 h 30, 12 km au bout de 4 h"
        }),
        questions: [
          { n: "1.", points: 1.5, texte: "Quelle distance le randonneur a-t-il parcourue au bout d'une heure ?", corrige: "On lit $4{,}5$ km." },
          { n: "2.", points: 1.5, texte: "Le randonneur fait une pause. Quand, et combien de temps ?", corrige: "La courbe est horizontale entre $1$ h et $2$ h : la distance ne change pas. Il fait une pause d'une heure." },
          { n: "3.", points: 2, texte: "Au bout de combien de temps a-t-il parcouru $10$ km ?", corrige: "On part de $10$ sur l'axe vertical : on lit $3{,}5$ h, soit $3$ h $30$ min." },
          { n: "4.", points: 2, texte: "Quelle distance totale a-t-il parcourue en $4$ heures ? Combien de kilomètres a-t-il faits, en moyenne, par heure ?", corrige: "Il a parcouru $12$ km en $4$ h, soit $12 \\div 4 = 3$ km par heure en moyenne (pause comprise)." }
        ]
      },
      {
        titre: "Les carrés d'allumettes",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Avec des allumettes, on forme une rangée de carrés collés les uns aux autres. Voici la rangée de $3$ carrés.",
        figure: (o) => o.figGeo({
          W: 320, H: 110,
          pts: { A0: [80, 30], A1: [133, 30], A2: [186, 30], A3: [239, 30], B0: [80, 83], B1: [133, 83], B2: [186, 83], B3: [239, 83] },
          segs: [["A0", "A1"], ["A1", "A2"], ["A2", "A3"], ["B0", "B1"], ["B1", "B2"], ["B2", "B3"], ["A0", "B0"], ["A1", "B1"], ["A2", "B2"], ["A3", "B3"]],
          sansPoint: ["A0", "A1", "A2", "A3", "B0", "B1", "B2", "B3"],
          aria: "Une rangée de 3 carrés formée de 10 allumettes : 3 en haut, 3 en bas et 4 verticales"
        }),
        questions: [
          { n: "1.", points: 1.5, texte: "Combien faut-il d'allumettes pour $1$, $2$ et $3$ carrés ?", corrige: "$4$ allumettes pour $1$ carré, $7$ pour $2$ carrés, $10$ pour $3$ carrés : chaque nouveau carré en demande $3$ de plus." },
          { n: "2.", points: 1.5, texte: "Combien faut-il d'allumettes pour $10$ carrés ?", corrige: "$4 + 9 \\times 3 = 31$ allumettes." },
          { n: "3.", points: 1.5, texte: "Écris une formule qui donne le nombre $A$ d'allumettes pour $n$ carrés.", indice: "Une première allumette verticale, puis $3$ allumettes par carré.", corrige: "$A = 3 \\times n + 1$ (une allumette au départ, puis $3$ par carré). Vérification : pour $n = 10$, $A = 31$." },
          { n: "4.", points: 1.5, texte: "Avec $100$ allumettes, combien de carrés peut-on faire au maximum ?", corrige: "$3 \\times n + 1 = 100$ donne $3 \\times n = 99$, soit $n = 33$ carrés : les $100$ allumettes sont toutes utilisées." }
        ]
      }
    ]
  }
};
