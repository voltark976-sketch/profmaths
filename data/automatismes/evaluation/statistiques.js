/*
  ENTRAÎNEMENT : Automatismes — Statistiques
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre auto-statistiques.
  Format : voir data/automatismes/evaluation/calcul-numerique.js (série d'automatismes, puis deux exercices en situation).
  Données fictives.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
(function () {
  // diagramme circulaire dans le style de celui du cours (amSecteurs de assets/exercices.js) : angles en degrés
  const secteurs = (v, noms, aria) => {
    const R = 72, cx = 160, cy = 110, f1 = (x) => +x.toFixed(1), pt = (t, r) => [f1(cx + r * Math.cos(t)), f1(cy - r * Math.sin(t))];
    let s = `<svg class="graph" viewBox="0 0 320 226" role="img" aria-label="${aria}">`, a = Math.PI / 2;
    v.forEach((x, k) => {
      const b = a - (x / 360) * 2 * Math.PI, p1 = pt(a, R), p2 = pt(b, R), m = (a + b) / 2, [lx, ly] = pt(m, R + 12), c = Math.cos(m), sn = Math.sin(m);
      s += `<path class="g-secteur g-secteur-${k}" d="M${cx} ${cy} L${p1[0]} ${p1[1]} A${R} ${R} 0 ${a - b > Math.PI ? 1 : 0} 1 ${p2[0]} ${p2[1]} Z"/>`;
      const anc = c > 0.25 ? "start" : c < -0.25 ? "end" : "middle", y = f1(ly + (sn > 0.5 ? -12 : sn < -0.5 ? 10 : 0));
      s += `<text class="g-label" x="${lx}" y="${y}" text-anchor="${anc}">${noms[k]}</text><text class="g-mesure" x="${lx}" y="${f1(y + 14)}" text-anchor="${anc}">${x}°</text>`;
      a = b;
    });
    return s + `</svg>`;
  };

  window.EVALUATIONS["auto-statistiques"] = {
    revisions: {
      intro: "Les statistiques en un coup d'œil : lire un graphique, moyenne simple ou pondérée, médiane, quartiles et étendue. Relis, repère les pièges, puis teste-toi.",
      essentiel: [
        {
          titre: "Moyenne",
          texte: "Somme des valeurs divisée par leur nombre. Avec des effectifs ou des coefficients : $\\overline{x} = \\dfrac{n_1x_1 + n_2x_2 + \\dots}{n_1 + n_2 + \\dots}$, chaque valeur comptant autant de fois que son effectif."
        },
        {
          titre: "Médiane",
          texte: "On range les valeurs dans l'ordre croissant : la médiane partage la série en deux groupes de même effectif. Avec $n$ valeurs, c'est la valeur du milieu si $n$ est impair, la moyenne des deux valeurs du milieu si $n$ est pair."
        },
        {
          titre: "Quartiles, étendue",
          texte: "$Q_1$ est la plus petite valeur telle qu'au moins $25\\,\\%$ des valeurs lui soient inférieures ou égales ; $Q_3$, de même avec $75\\,\\%$. Écart interquartile : $Q_3 - Q_1$ ; étendue : maximum moins minimum."
        },
        {
          titre: "Diagramme circulaire",
          texte: "Les angles sont proportionnels aux effectifs : $360°$ pour $100\\,\\%$, donc $3{,}6°$ pour $1\\,\\%$. Par exemple, $10\\,\\%$ correspond à $36°$."
        },
        {
          titre: "Moyenne et médiane",
          texte: "Une valeur extrême déplace la moyenne, mais presque pas la médiane. Ajouter le même nombre à toutes les valeurs ajoute ce nombre à la moyenne et à la médiane."
        }
      ],
      pieges: [
        "On range les valeurs **avant** de chercher la médiane ou les quartiles.",
        "Avec des effectifs, chaque valeur compte autant de fois que son effectif.",
        "Écart interquartile ($Q_3 - Q_1$) et étendue (maximum $-$ minimum) sont deux choses différentes.",
        "La médiane n'est pas forcément au milieu de la boîte d'un diagramme en boîte.",
        "Dans un diagramme circulaire, ce sont les angles qui sont proportionnels aux effectifs.",
        "Diviser par le nombre de valeurs différentes au lieu de l'effectif total."
      ]
    },

    evaluation: {
      intro: "Une série d'automatismes comme dans la partie 1 de l'épreuve anticipée, puis deux exercices qui les mettent en situation, **sans calculatrice** (environ $55$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
      exercices: [
        {
          titre: "Automatismes",
          duree: 15, points: 6, calculatrice: false,
          contexte: "Pour chaque question, écris seulement le résultat, sans justification.",
          questions: [
            { n: "1.", points: 0.5, texte: "Calcule la moyenne de la série $7$ ; $11$ ; $15$ ; $19$.", corrige: "$\\dfrac{52}{4} = 13$." },
            { n: "2.", points: 0.5, texte: "Un élève a $14$ (coefficient $2$) et $10$ (coefficient $3$). Quelle est sa moyenne ?", corrige: "$\\dfrac{2 \\times 14 + 3 \\times 10}{5} = \\dfrac{58}{5} = 11{,}6$." },
            { n: "3.", points: 0.5, texte: "Donne la médiane de la série $5$ ; $9$ ; $2$ ; $8$ ; $6$.", corrige: "Rangée : $2$ ; $5$ ; $6$ ; $8$ ; $9$. La médiane est $6$." },
            { n: "4.", points: 0.5, texte: "Donne la médiane de la série $12$ ; $4$ ; $10$ ; $7$.", corrige: "Rangée : $4$ ; $7$ ; $10$ ; $12$. La médiane est $\\dfrac{7 + 10}{2} = 8{,}5$." },
            { n: "5.", points: 0.5, texte: "Quelle est l'étendue de la série $3$ ; $15$ ; $8$ ; $21$ ; $10$ ?", corrige: "$21 - 3 = 18$." },
            { n: "6.", points: 0.5, texte: "Donne $Q_1$ et $Q_3$ pour la série rangée $1$ ; $2$ ; $4$ ; $5$ ; $7$ ; $8$ ; $10$ ; $11$.", corrige: "$8$ valeurs : $Q_1$ est la $2$e valeur, $2$, et $Q_3$ la $6$e, $8$." },
            { n: "7.", points: 0.5, texte: "Une série a pour quartiles $Q_1 = 12$ et $Q_3 = 18$. Quel est son écart interquartile ?", corrige: "$18 - 12 = 6$." },
            { n: "8.", points: 0.5, texte: "Les valeurs $1$, $2$ et $3$ ont pour effectifs $4$, $5$ et $1$. Calcule la moyenne.", corrige: "$\\dfrac{4 \\times 1 + 5 \\times 2 + 1 \\times 3}{10} = \\dfrac{17}{10} = 1{,}7$." },
            { n: "9.", points: 0.5, texte: "Dans un diagramme circulaire, quel angle correspond à $30\\,\\%$ de l'effectif ?", corrige: "$0{,}3 \\times 360° = 108°$." },
            { n: "10.", points: 0.5, texte: "Une série de $20$ valeurs a pour moyenne $12$. Quelle est la somme de ces valeurs ?", corrige: "$20 \\times 12 = 240$." },
            { n: "11.", points: 0.5, texte: "La moyenne d'une classe à un devoir est $11$. Le professeur ajoute $2$ points à chaque copie. Quelle est la nouvelle moyenne ?", corrige: "$11 + 2 = 13$." },
            { n: "12.", points: 0.5, texte: "La médiane d'une série est $14$. Que peut-on dire des valeurs de la série ?", corrige: "Au moins la moitié des valeurs sont inférieures ou égales à $14$, et au moins la moitié sont supérieures ou égales à $14$." }
          ]
        },
        {
          titre: "Les buts d'un championnat",
          duree: 20, points: 7, calculatrice: false,
          contexte: "Le tableau donne le nombre de buts marqués lors des matchs d'un championnat de football des jeunes (données fictives).",
          tableau: { lignes: [["\\text{Buts}", "0", "1", "2", "3", "4", "5"], ["\\text{Matchs}", "3", "6", "7", "5", "3", "1"]] },
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Combien de matchs ont été joués ? Calcule le nombre moyen de buts par match.",
              indice: "Moyenne : somme des « buts × matchs », divisée par le nombre de matchs.",
              corrige: "$3 + 6 + 7 + 5 + 3 + 1 = 25$ matchs. Nombre total de buts : $0 + 6 + 14 + 15 + 12 + 5 = 52$, donc la moyenne vaut $\\dfrac{52}{25} = 2{,}08$ buts par match."
            },
            {
              n: "2.", points: 2,
              texte: "Détermine la médiane, le premier quartile et le troisième quartile de cette série.",
              indice: "Avec $25$ valeurs rangées : la médiane est la $13$e, $Q_1$ la $7$e ($25 \\times 0{,}25 = 6{,}25$) et $Q_3$ la $19$e ($25 \\times 0{,}75 = 18{,}75$). Utilise les effectifs cumulés.",
              corrige: "Effectifs cumulés : $3$ ; $9$ ; $16$ ; $21$ ; $24$ ; $25$.\n\nLa $13$e valeur est $2$ (les valeurs de rang $10$ à $16$ valent $2$) : la médiane vaut $2$. La $7$e valeur vaut $1$ : $Q_1 = 1$. La $19$e valeur vaut $3$ : $Q_3 = 3$."
            },
            {
              n: "3.", points: 1.5,
              texte: "Quel pourcentage des matchs comptent au moins $3$ buts ?",
              indice: "Compte les matchs à $3$, $4$ ou $5$ buts.",
              corrige: "$5 + 3 + 1 = 9$ matchs sur $25$, soit $\\dfrac{9}{25} = \\dfrac{36}{100} = 36\\,\\%$."
            },
            {
              n: "4.", points: 2,
              texte: "Un dernier match se termine sur le score de $9$ à $0$. Que deviennent la moyenne et la médiane ? Commente.",
              indice: "Il y a maintenant $26$ matchs et $61$ buts. La médiane est la moyenne des $13$e et $14$e valeurs.",
              corrige: "Nouvelle moyenne : $\\dfrac{52 + 9}{26} = \\dfrac{61}{26} \\approx 2{,}35$ buts par match. Avec $26$ valeurs, la médiane est la moyenne des $13$e et $14$e valeurs, qui valent toujours $2$ : elle reste égale à $2$.\n\nUne seule valeur extrême a fait monter la moyenne, mais pas la médiane."
            }
          ]
        },
        {
          titre: "Les sports préférés",
          duree: 20, points: 7, calculatrice: false,
          contexte: "On a demandé à $480$ élèves d'un lycée leur sport préféré. Le diagramme circulaire ci-dessous donne les résultats, avec l'angle de chaque secteur (données fictives).",
          figure: () => secteurs([144, 90, 54, 72], ["Football", "Handball", "Basket", "Autres"], "Diagramme circulaire : football 144 degrés, handball 90 degrés, basket 54 degrés, autres sports 72 degrés"),
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Quel pourcentage des élèves représente chaque secteur ?",
              indice: "$360°$ correspondent à $100\\,\\%$ : divise chaque angle par $3{,}6$.",
              corrige: "Football : $\\dfrac{144}{360} = 40\\,\\%$ ; handball : $\\dfrac{90}{360} = 25\\,\\%$ ; basket : $\\dfrac{54}{360} = 15\\,\\%$ ; autres : $\\dfrac{72}{360} = 20\\,\\%$. Le total fait bien $100\\,\\%$."
            },
            {
              n: "2.", points: 1.5,
              texte: "Combien d'élèves préfèrent chacun de ces sports ?",
              indice: "$10\\,\\%$ de $480$, c'est $48$.",
              corrige: "Football : $0{,}4 \\times 480 = 192$ ; handball : $120$ ; basket : $72$ ; autres : $96$. Total : $480$."
            },
            {
              n: "3.", points: 2,
              texte: "Parmi les élèves qui préfèrent le handball, $40\\,\\%$ sont des filles. Combien sont-elles ? Quel pourcentage de l'ensemble des élèves cela représente-t-il ?",
              indice: "$40\\,\\%$ de $120$, puis compare à $480$.",
              corrige: "$0{,}4 \\times 120 = 48$ filles, soit $\\dfrac{48}{480} = 10\\,\\%$ des élèves (c'est aussi $0{,}25 \\times 0{,}4$)."
            },
            {
              n: "4.", points: 2,
              texte: "L'année suivante, le nombre d'élèves qui préfèrent le football augmente de $25\\,\\%$, et le lycée compte toujours $480$ élèves. Quel sera l'angle du secteur « Football » ?",
              indice: "Calcule d'abord le nouvel effectif : $192 \\times 1{,}25$.",
              corrige: "$192 \\times 1{,}25 = 240$ élèves, soit $\\dfrac{240}{480} = 50\\,\\%$ : le secteur « Football » sera un demi-disque, d'angle $180°$."
            }
          ]
        }
      ]
    }
  };
})();
