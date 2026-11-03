/*
  ENTRAÎNEMENT : Première tronc commun — chapitre 4, Automatismes : lire et résumer des données
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre tronc-donnees.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
  Toutes les données sont fictives. Quartiles comme dans le cours : rangs N/4 et 3N/4 arrondis à l'entier supérieur.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
(function () {
  // deux diagrammes en boîte, dans le style de ceux de Seconde (exercice 3)
  const boites = () => {
    const X = (v) => 20 + v * 14, trait = (x1, y1, x2, y2, e) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:var(--encre);stroke-width:${e}"/>`;
    const boite = (y, m, q1, me, q3, M, c) =>
      trait(X(m), y, X(q1), y, 1.5) + trait(X(q3), y, X(M), y, 1.5) + trait(X(m), y - 6, X(m), y + 6, 1.5) + trait(X(M), y - 6, X(M), y + 6, 1.5) +
      `<rect x="${X(q1)}" y="${y - 12}" width="${X(q3) - X(q1)}" height="24" style="fill:${c};stroke:var(--encre);stroke-width:1.5"/>` + trait(X(me), y - 12, X(me), y + 12, 2.5);
    let s = `<svg class="graph" viewBox="0 0 320 146" role="img" aria-label="Classe A : minimum 4, Q1 8, médiane 11, Q3 13, maximum 18. Classe B : minimum 7, Q1 10, médiane 11, Q3 12, maximum 15">`;
    for (let v = 0; v <= 20; v++) s += `<line x1="${X(v)}" y1="18" x2="${X(v)}" y2="116" style="stroke:var(--trait);stroke-width:1"/>`;
    s += `<line x1="${X(0)}" y1="118" x2="${X(20)}" y2="118" style="stroke:var(--doux);stroke-width:1.4"/><g class="g-tick">`;
    for (let v = 0; v <= 20; v += 2) s += `<text x="${X(v)}" y="134" text-anchor="middle">${v}</text>`;
    s += `</g>` + boite(42, 4, 8, 11, 13, 18, "var(--lagon-pale)") + boite(88, 7, 10, 11, 12, 15, "var(--ylang-pale)");
    return s + `<text class="g-label" x="4" y="46">A</text><text class="g-label" x="4" y="92">B</text></svg>`;
  };

  window.EVALUATIONS["tronc-donnees"] = {
    revisions: {
      intro: "Lire et résumer des données en un coup d'œil : lire un graphique sans se faire piéger, diagramme circulaire, moyenne, médiane, quartiles et diagramme en boîte. Relis, repère les pièges, puis teste-toi.",
      essentiel: [
        {
          titre: "Lire un graphique",
          texte: "On repère d'abord l'origine des axes, les unités et l'échelle. Un axe vertical qui ne commence pas à $0$ grossit les écarts entre les barres."
        },
        {
          titre: "Diagramme circulaire",
          texte: "L'angle d'un secteur est proportionnel à l'effectif : $360°$ pour le total. Une catégorie qui représente $25\\,\\%$ du total a un secteur de $90°$."
        },
        {
          titre: "Moyenne, médiane",
          texte: "La moyenne est la somme des valeurs divisée par l'effectif. La médiane se lit sur la série **rangée** : la valeur du milieu, ou la moyenne des deux valeurs centrales. Elle résiste aux valeurs extrêmes, pas la moyenne."
        },
        {
          titre: "Quartiles",
          texte: "Sur la série rangée de $N$ valeurs, $Q_1$ est la valeur de rang $\\dfrac{N}{4}$ et $Q_3$ celle de rang $\\dfrac{3N}{4}$, ces rangs étant arrondis à l'entier supérieur. L'écart interquartile est $Q_3 - Q_1$."
        },
        {
          titre: "Diagramme en boîte",
          texte: "Les moustaches vont du minimum au maximum, la boîte de $Q_1$ à $Q_3$, avec un trait à la médiane. Environ la moitié des valeurs sont dans la boîte ; la moyenne ne s'y lit pas."
        }
      ],
      pieges: [
        "Oublier de ranger la série avant de chercher la médiane ou les quartiles.",
        "Calculer une moyenne simple au lieu d'une moyenne pondérée avec un tableau d'effectifs.",
        "Confondre l'angle d'un secteur et son pourcentage.",
        "Lire la moyenne sur un diagramme en boîte : il ne la donne pas.",
        "Confondre étendue ($\\max - \\min$) et écart interquartile ($Q_3 - Q_1$).",
        "Ne pas regarder l'origine et l'échelle de l'axe vertical."
      ]
    },

    evaluation: {
      intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Les données sont fictives. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
      exercices: [
        {
          titre: "Un graphique trompeur",
          duree: 25, points: 7, calculatrice: false,
          contexte: "Une boutique a vendu, en un mois, $600$ bouteilles de jus : des jus de la marque A, de la marque B et d'autres marques. Le vendeur de la marque B montre ce diagramme en barres à ses clients.",
          figure: (o) => o.graph({
            xmin: 0.2, xmax: 2.9, ymin: 200, ymax: 270, xstep: 1, xetiq: 9, ystep: 10, h: 240, padL: 32,
            ylabel: "bouteilles",
            bars: [{ x: 1, y: 220 }, { x: 2, y: 260 }],
            marques: [{ x: 1, y: 224, texte: "A" }, { x: 2, y: 264, texte: "B" }],
            aria: "Diagramme en barres dont l'axe vertical commence à 200 : la barre A monte à 220 et la barre B à 260, ce qui la fait paraître trois fois plus haute"
          }),
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Lis le nombre de bouteilles vendues de chaque marque.",
              indice: "Regarde où commence l'axe vertical et la valeur d'une graduation.",
              corrige: "La boutique a vendu $220$ bouteilles de la marque A et $260$ de la marque B."
            },
            {
              n: "2.", points: 1.5,
              texte: "Sur le diagramme, la barre B paraît trois fois plus haute que la barre A. Est-ce que B s'est vendue trois fois plus que A ? Explique pourquoi le graphique est trompeur.",
              indice: "Calcule la hauteur visible de chaque barre au-dessus de $200$.",
              corrige: "Non. L'axe vertical commence à $200$ : on ne voit que $20$ bouteilles pour A et $60$ pour B, d'où le rapport $3$. En réalité, $\\dfrac{260}{220}$ est à peine plus grand que $1$. Le graphique grossit l'écart."
            },
            {
              n: "3.", points: 1.5,
              texte: "De quel pourcentage les ventes de B dépassent-elles celles de A ? Donne une fraction, puis un arrondi à l'unité.",
              indice: "Calcule $\\dfrac{260 - 220}{220}$, et simplifie.",
              corrige: "$\\dfrac{260 - 220}{220} = \\dfrac{40}{220} = \\dfrac{2}{11} \\approx 0{,}18$ : la marque B s'est vendue environ $18\\,\\%$ de plus que la marque A."
            },
            {
              n: "4.", points: 1.5,
              texte: "On représente les ventes des trois catégories (A, B et autres marques) par un diagramme circulaire. Calcule l'angle de chaque secteur.",
              indice: "Les autres marques font $600 - 220 - 260$ bouteilles. Une bouteille correspond à $\\dfrac{360}{600} = 0{,}6°$.",
              corrige: "Autres marques : $600 - 480 = 120$ bouteilles. Une bouteille correspond à $0{,}6°$ : A, $220 \\times 0{,}6 = 132°$ ; B, $260 \\times 0{,}6 = 156°$ ; autres, $120 \\times 0{,}6 = 72°$. On vérifie : $132 + 156 + 72 = 360$."
            },
            {
              n: "5.", points: 1,
              texte: "Quelle proportion des ventes de la boutique représente la marque B ? Donne une fraction irréductible.",
              indice: "$\\dfrac{260}{600}$, à simplifier.",
              corrige: "$\\dfrac{260}{600} = \\dfrac{13}{30}$, soit environ $43\\,\\%$ des ventes : moins de la moitié, malgré l'impression donnée par le diagramme en barres."
            }
          ]
        },
        {
          titre: "Les temps de trajet",
          duree: 25, points: 7, calculatrice: false,
          contexte: "Voici les temps de trajet entre le domicile et le lycée, en minutes, de $12$ élèves, rangés dans l'ordre croissant : $5$ ; $8$ ; $10$ ; $10$ ; $12$ ; $15$ ; $15$ ; $18$ ; $20$ ; $25$ ; $30$ ; $60$. Leur somme vaut $228$.",
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Calcule la moyenne et la médiane de cette série.",
              indice: "Avec $12$ valeurs rangées, la médiane est la moyenne de la $6^\\text{e}$ et de la $7^\\text{e}$.",
              corrige: "Moyenne : $\\dfrac{228}{12} = 19$ minutes. Médiane : $\\dfrac{15 + 15}{2} = 15$ minutes."
            },
            {
              n: "2.", points: 1.5,
              texte: "Détermine $Q_1$, $Q_3$ et l'écart interquartile. Compare-le à l'étendue.",
              indice: "$\\dfrac{12}{4} = 3$ et $\\dfrac{3 \\times 12}{4} = 9$.",
              corrige: "$Q_1$ est la $3^\\text{e}$ valeur : $10$ ; $Q_3$ est la $9^\\text{e}$ : $20$. L'écart interquartile vaut $20 - 10 = 10$ minutes, alors que l'étendue vaut $60 - 5 = 55$ minutes : la moitié centrale des élèves a des temps assez proches."
            },
            {
              n: "3.", points: 1.5,
              texte: "Pourquoi la moyenne est-elle plus grande que la médiane ?",
              indice: "Regarde la plus grande valeur.",
              corrige: "Un élève met $60$ minutes, beaucoup plus que les autres : cette valeur extrême tire la moyenne vers le haut, mais pas la médiane, qui ne dépend que des valeurs du milieu."
            },
            {
              n: "4.", points: 1.5,
              texte: "On retire l'élève qui met $60$ minutes. Que deviennent la moyenne et la médiane des $11$ temps restants ?",
              indice: "La somme devient $228 - 60$ ; avec $11$ valeurs, la médiane est la $6^\\text{e}$.",
              corrige: "Moyenne : $\\dfrac{168}{11} \\approx 15{,}3$ minutes ; elle baisse beaucoup. Médiane : la $6^\\text{e}$ valeur, $15$ minutes ; elle ne change pas."
            },
            {
              n: "5.", points: 1,
              texte: "Vrai ou faux : « La moitié des élèves mettent plus de $19$ minutes. » Justifie.",
              indice: "Compte les temps supérieurs à $19$.",
              corrige: "**Faux.** Seuls $4$ élèves sur $12$ mettent plus de $19$ minutes ($20$, $25$, $30$ et $60$). C'est la médiane, $15$ minutes, qui partage les élèves en deux moitiés, pas la moyenne."
            }
          ]
        },
        {
          titre: "Comparer deux classes",
          duree: 25, points: 6, calculatrice: false,
          contexte: "Les diagrammes en boîte ci-dessous résument les notes sur $20$ de deux classes de Première à un même devoir.",
          figure: boites,
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Lis, pour chaque classe, la note minimale, $Q_1$, la médiane, $Q_3$ et la note maximale.",
              indice: "Les extrémités des moustaches donnent le minimum et le maximum ; le trait dans la boîte, la médiane.",
              corrige: "Classe A : minimum $4$, $Q_1 = 8$, médiane $11$, $Q_3 = 13$, maximum $18$.\n\nClasse B : minimum $7$, $Q_1 = 10$, médiane $11$, $Q_3 = 12$, maximum $15$."
            },
            {
              n: "2.", points: 1.5,
              texte: "Compare les médianes et les écarts interquartiles des deux classes. Que peut-on en conclure ?",
              indice: "Écart interquartile : $Q_3 - Q_1$.",
              corrige: "Les médianes sont égales ($11$). Les écarts interquartiles valent $13 - 8 = 5$ pour A et $12 - 10 = 2$ pour B : les notes de B sont beaucoup plus resserrées, celles de A plus dispersées."
            },
            {
              n: "3.", points: 1.5,
              texte: "Vrai ou faux ? Justifie. a) « Au moins un quart des élèves de A ont au moins $13$. » b) « Dans la classe B, aucun élève n'a moins de $7$. »",
              indice: "Au moins $25\\,\\%$ des valeurs sont supérieures ou égales à $Q_3$.",
              corrige: "a) **Vrai** : $Q_3 = 13$, donc au moins $25\\,\\%$ des notes de A sont supérieures ou égales à $13$.\n\nb) **Vrai** : la note minimale de B est $7$."
            },
            {
              n: "4.", points: 1.5,
              texte: "Un élève affirme : « Les deux classes ont la même médiane, donc elles ont la même moyenne. » Qu'en penses-tu ?",
              indice: "Un diagramme en boîte donne-t-il la moyenne ?",
              corrige: "Il a tort : un diagramme en boîte ne donne pas la moyenne, et deux séries de même médiane peuvent avoir des moyennes différentes. Il faudrait connaître toutes les notes pour calculer les moyennes."
            }
          ]
        }
      ]
    }
  };
})();
