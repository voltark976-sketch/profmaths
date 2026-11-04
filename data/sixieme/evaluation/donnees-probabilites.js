/*
  ENTRAÎNEMENT : 6e — chapitre 8, Organisation de données et probabilités
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre sixieme-donnees-probabilites.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 6e, sans calculatrice.
  Diagramme dessiné par o.figGeo (assets/exercices-base.js). Données fictives, différentes de celles du cours, de la méthode et du QCM.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["sixieme-donnees-probabilites"] = {
  revisions: {
    intro: "Les données et les probabilités en un coup d'œil : tableaux, diagrammes, courbes, hasard et probabilités. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Tableau à double entrée",
        texte: "Une donnée se lit à l'intersection d'une ligne et d'une colonne. Les totaux de lignes et de colonnes aident à répondre aux questions « en tout »."
      },
      {
        titre: "Diagramme en barres",
        texte: "La hauteur de chaque barre donne l'effectif ; on lit sa valeur sur l'axe vertical, en regardant bien la graduation."
      },
      {
        titre: "Diagramme circulaire et courbe",
        texte: "Un diagramme circulaire montre la part de chaque catégorie dans le tout ; une courbe montre comment une grandeur évolue, par exemple au cours du temps."
      },
      {
        titre: "Probabilité",
        texte: "Quand toutes les issues ont la même chance, probabilité $= \\dfrac{\\text{issues favorables}}{\\text{issues possibles}}$. Elle est comprise entre $0$ (impossible) et $1$ (certain)."
      },
      {
        titre: "Fréquence",
        texte: "Si l'on répète une expérience un grand nombre de fois, la fréquence d'un résultat se rapproche de sa probabilité."
      }
    ],
    pieges: [
      "Lire une barre sans regarder la graduation de l'axe.",
      "Confondre une ligne et une colonne du tableau.",
      "Oublier une catégorie en calculant un total.",
      "Croire qu'un résultat doit « sortir » parce qu'il n'est pas sorti depuis longtemps.",
      "Donner une probabilité plus grande que $1$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le tableau des transports",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Voici comment les élèves de deux classes de 6e viennent au collège (données fictives).",
        tableau: { lignes: [["", "\\text{bus}", "\\text{à pied}", "\\text{voiture}"], ["\\text{6}^\\text{e}\\text{ A}", "12", "8", "6"], ["\\text{6}^\\text{e}\\text{ B}", "10", "11", "4"]] },
        questions: [
          { n: "1.", points: 2, texte: "Combien d'élèves de 6e B viennent à pied ?", corrige: "On lit la ligne « 6e B » et la colonne « à pied » : $11$ élèves." },
          { n: "2.", points: 2, texte: "Combien d'élèves des deux classes viennent en bus ?", corrige: "$12 + 10 = 22$ élèves." },
          { n: "3.", points: 1.5, texte: "Combien y a-t-il d'élèves en tout dans les deux classes ?", corrige: "6e A : $12 + 8 + 6 = 26$ ; 6e B : $10 + 11 + 4 = 25$ ; en tout $51$ élèves." },
          { n: "4.", points: 1.5, texte: "Quel moyen de transport est le plus utilisé ?", corrige: "Le bus ($22$ élèves), devant la marche ($19$) et la voiture ($10$)." }
        ]
      },
      {
        titre: "Les fruits préférés",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Le diagramme en barres donne le fruit préféré des élèves d'une classe (données fictives).",
        figure: (o) => {
          const Y = (v) => 150 - 13 * v, pts = { O: [50, 150], X1: [300, 150], Y1: [50, 18] }, segs = [["O", "X1"], ["O", "Y1"]], formes = [], textes = [];
          [["mangue", 9], ["banane", 5], ["ananas", 7], ["letchi", 3]].forEach(([n, v], i) => { const x = 70 + 58 * i; formes.push({ p: [[x, 150], [x + 34, 150], [x + 34, Y(v)], [x, Y(v)]] }); textes.push([x + 17, 166, n, "middle"]); });
          for (let v = 0; v <= 10; v++) { pts["g" + v] = [46, Y(v)]; pts["h" + v] = [50, Y(v)]; segs.push(["g" + v, "h" + v]); if (v % 2 === 0) textes.push([40, Y(v) + 4, String(v), "end"]); }
          return o.figGeo({ W: 320, H: 176, pts, segs, formes, textes, sansPoint: Object.keys(pts), aria: "Diagramme en barres : mangue 9, banane 5, ananas 7, letchi 3" });
        },
        questions: [
          { n: "1.", points: 2, texte: "Combien d'élèves préfèrent l'ananas ?", indice: "Une graduation de l'axe vaut $1$ élève.", corrige: "La barre « ananas » monte à $7$ : $7$ élèves." },
          { n: "2.", points: 2, texte: "Combien d'élèves ont répondu ?", corrige: "$9 + 5 + 7 + 3 = 24$ élèves." },
          { n: "3.", points: 1.5, texte: "Quelle fraction des élèves préfère la mangue ? Simplifie-la.", corrige: "$\\dfrac{9}{24} = \\dfrac{3}{8}$." },
          { n: "4.", points: 1.5, texte: "Combien d'élèves de plus préfèrent la mangue plutôt que le letchi ?", corrige: "$9 - 3 = 6$ élèves de plus." }
        ]
      },
      {
        titre: "Le sac de jetons",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Un sac contient $2$ jetons rouges, $5$ jetons bleus et $3$ jetons verts, indiscernables au toucher. On tire un jeton au hasard. Les probabilités sont à donner sous forme de fraction simplifiée.",
        questions: [
          { n: "1.", points: 2, texte: "Quelle est la probabilité de tirer un jeton bleu ?", corrige: "$5$ jetons bleus sur $10$ : $\\dfrac{5}{10} = \\dfrac{1}{2}$." },
          { n: "2.", points: 2, texte: "Quelle est la probabilité de tirer un jeton rouge ?", corrige: "$\\dfrac{2}{10} = \\dfrac{1}{5}$." },
          { n: "3.", points: 2, texte: "Quelle couleur a le plus de chances d'être tirée ? Est-il certain qu'on la tirera ?", corrige: "Le bleu, car il y a plus de jetons bleus. Mais ce n'est pas certain : sa probabilité vaut $\\dfrac{1}{2}$, et non $1$." }
        ]
      }
    ]
  }
};
