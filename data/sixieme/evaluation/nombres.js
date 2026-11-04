/*
  ENTRAÎNEMENT : 6e — chapitre 1, Nombres entiers et décimaux
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre sixieme-nombres.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 6e, sans calculatrice.
  Figure dessinée par o.figGeo (assets/exercices-base.js). Nombres différents de ceux du cours, de la méthode et du QCM.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["sixieme-nombres"] = {
  revisions: {
    intro: "Les nombres en un coup d'œil : rangs des chiffres, grands nombres, fractions décimales, multiplier par 10, comparer et arrondir. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Les rangs",
        texte: "Dans $52\\,086{,}37$ : $5$ est le chiffre des dizaines de mille, $2$ celui des unités de mille, $8$ celui des dizaines, $6$ celui des unités, $3$ celui des dixièmes et $7$ celui des centièmes."
      },
      {
        titre: "Les grands nombres",
        texte: "On groupe les chiffres par trois à partir de la droite : $4\\,060\\,300$ se lit « quatre millions soixante mille trois cents »."
      },
      {
        titre: "Fractions décimales",
        texte: "$\\dfrac{3}{10} = 0{,}3$ ; $\\dfrac{25}{100} = 0{,}25$ ; $\\dfrac{8}{1\\,000} = 0{,}008$."
      },
      {
        titre: "Multiplier ou diviser par 10, 100, 1 000",
        texte: "Chaque chiffre change de rang : $6{,}25 \\times 100 = 625$ et $41 \\div 1\\,000 = 0{,}041$."
      },
      {
        titre: "Comparer",
        texte: "On compare d'abord les parties entières, puis les dixièmes, les centièmes… : $5{,}09 < 5{,}1$, car $0$ dixième est moins que $1$ dixième."
      },
      {
        titre: "Arrondir",
        texte: "On regarde le chiffre juste après le rang voulu : s'il vaut $5$ ou plus, on arrondit au-dessus. $7{,}463$ arrondi au dixième donne $7{,}5$."
      }
    ],
    pieges: [
      "Croire que $5{,}12 > 5{,}9$ parce que $12 > 9$ : $5{,}9 = 5{,}90$.",
      "Oublier des zéros en écrivant un grand nombre en chiffres.",
      "Ajouter un zéro au lieu de changer les rangs : $3{,}5 \\times 10 = 35$, et non $3{,}50$.",
      "Confondre le chiffre des dizaines et le nombre de dizaines : $347$ a pour chiffre des dizaines $4$, mais contient $34$ dizaines.",
      "Arrondir en regardant le mauvais chiffre."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Lire et écrire les nombres",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Écris soigneusement les réponses.",
        questions: [
          { n: "1.", points: 2, texte: "Écris en chiffres « trente-deux millions cinq cent mille quatorze », puis écris en lettres $7\\,008\\,250$.", corrige: "$32\\,500\\,014$.\n\n$7\\,008\\,250$ : « sept millions huit mille deux cent cinquante »." },
          { n: "2.", points: 2, texte: "Dans $586\\,194{,}32$, quel est le chiffre des milliers ? celui des centièmes ? Combien ce nombre contient-il de centaines ?", indice: "Le nombre de centaines s'obtient en lisant tous les chiffres jusqu'à celui des centaines.", corrige: "Chiffre des milliers : $6$. Chiffre des centièmes : $2$. Nombre de centaines : $5\\,861$." },
          { n: "3.", points: 1.5, texte: "Écris avec une virgule : $\\dfrac{347}{100}$ ; $\\dfrac{9}{1\\,000}$ ; $5 + \\dfrac{2}{10} + \\dfrac{6}{100}$.", corrige: "$3{,}47$ ; $0{,}009$ ; $5{,}26$." },
          { n: "4.", points: 1.5, texte: "Calcule $0{,}58 \\times 1\\,000$ ; $73 \\div 100$ ; $4{,}2 \\div 10$.", corrige: "$580$ ; $0{,}73$ ; $0{,}42$." }
        ]
      },
      {
        titre: "Comparer et ranger",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Justifie si nécessaire.",
        questions: [
          { n: "1.", points: 2, texte: "Compare $7{,}8$ et $7{,}08$ ; $12{,}35$ et $12{,}4$ ; $0{,}6$ et $0{,}59$.", corrige: "$7{,}8 > 7{,}08$ (huit dixièmes contre zéro dixième) ; $12{,}35 < 12{,}4$ (trois dixièmes contre quatre) ; $0{,}6 > 0{,}59$ ($0{,}60 > 0{,}59$)." },
          { n: "2.", points: 2, texte: "Range dans l'ordre croissant : $4{,}5$ ; $4{,}05$ ; $4{,}55$ ; $4{,}505$ ; $5$.", indice: "Écris-les tous avec trois chiffres après la virgule.", corrige: "$4{,}05 < 4{,}5 < 4{,}505 < 4{,}55 < 5$" },
          { n: "3.", points: 1.5, texte: "Donne un nombre compris entre $3{,}6$ et $3{,}7$.", corrige: "Par exemple $3{,}65$ (tout nombre strictement entre les deux convient)." },
          { n: "4.", points: 1.5, texte: "Encadre $18{,}47$ par deux nombres entiers consécutifs, puis par deux nombres qui ont un seul chiffre après la virgule.", corrige: "$18 < 18{,}47 < 19$, puis $18{,}4 < 18{,}47 < 18{,}5$." }
        ]
      },
      {
        titre: "Graduations et arrondis",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Sur la demi-droite graduée ci-dessous, chaque unité est partagée en $4$ intervalles égaux.",
        figure: (o) => {
          const X = (v) => 30 + 85 * v, pts = { G0: [X(0), 60], G1: [X(3.2), 60] }, segs = [["G0", "G1"]], textes = [];
          for (let k = 0; k <= 12; k++) { const v = k / 4, ent = k % 4 === 0; pts["t" + k] = [X(v), ent ? 51 : 55]; pts["u" + k] = [X(v), ent ? 69 : 65]; segs.push(["t" + k, "u" + k]); if (ent) textes.push([X(v), 88, String(v), "middle"]); }
          [["A", 0.75], ["B", 1.5], ["C", 2.25]].forEach(([n, v]) => { pts[n] = [X(v), 60]; });
          return o.figGeo({ W: 320, H: 100, pts, segs, textes, sansPoint: Object.keys(pts).filter((n) => n.length > 1), decal: { A: [0, -14], B: [0, -14], C: [0, -14] }, aria: "Demi-droite graduée de 0 à 3, chaque unité partagée en 4 ; points A, B et C placés" });
        },
        questions: [
          { n: "1.", points: 2, texte: "Lis les abscisses des points $A$, $B$ et $C$.", indice: "Une petite graduation vaut $1 \\div 4 = 0{,}25$.", corrige: "$A(0{,}75)$, $B(1{,}5)$ et $C(2{,}25)$." },
          { n: "2.", points: 2, texte: "Arrondis $14{,}862$ à l'unité, au dixième, puis au centième.", corrige: "À l'unité : $15$ ; au dixième : $14{,}9$ ; au centième : $14{,}86$." },
          { n: "3.", points: 2, texte: "Arrondis $3{,}996$ au centième.", corrige: "Le chiffre des millièmes vaut $6$ : on arrondit au-dessus, $3{,}99$ devient $4{,}00$, c'est-à-dire $4$." }
        ]
      }
    ]
  }
};
