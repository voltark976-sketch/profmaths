/*
  ENTRAÎNEMENT : Première tronc commun — chapitre 10, Fonctions affines : modéliser une variation linéaire
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre tronc-fonctions-affines.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
  Données et tarifs fictifs ; contextes différents de ceux du cours (taxi, °F, impôt, citerne).
*/
window.EVALUATIONS = window.EVALUATIONS || {};
(function () {
  const facture = (x) => (x <= 15 ? 12 + x : 27 + 2.5 * (x - 15)); // tarif de l'eau par tranches (exercice 1)
  const sub = (a, b) => `${a}<tspan class="sub" dy="3">${b}</tspan>`;

  window.EVALUATIONS["tronc-fonctions-affines"] = {
    revisions: {
      intro: "Les fonctions affines en un coup d'œil : coefficient directeur et ordonnée à l'origine, taux d'accroissement, sens de variation, point d'équilibre et tarifs par tranches. Relis, repère les pièges, puis teste-toi.",
      essentiel: [
        {
          titre: "Fonction affine",
          texte: "$f(x) = mx + p$ : $m$ est le coefficient directeur et $p$ l'ordonnée à l'origine ; la courbe est une droite. Attention à l'ordre d'écriture : pour $f(x) = 4 - 3x$, $m = -3$ et $p = 4$."
        },
        {
          titre: "Taux d'accroissement",
          texte: "Pour une fonction affine, $\\dfrac{f(b) - f(a)}{b - a} = m$ pour tous $a \\neq b$ : la variation de $f(x)$ est proportionnelle à celle de $x$."
        },
        {
          titre: "Sens de variation",
          texte: "$f$ est croissante si $m > 0$, décroissante si $m < 0$, constante si $m = 0$. Le signe de $p$ ne joue aucun rôle."
        },
        {
          titre: "Modéliser",
          texte: "Un montant fixe plus un prix par unité, un niveau qui baisse régulièrement… : $m$ est ce qui change pour une unité de plus, $p$ la valeur au départ."
        },
        {
          titre: "Point d'équilibre",
          texte: "Deux droites se coupent là où $f(x) = g(x)$ : par exemple le prix où l'offre égale la demande, ou la quantité pour laquelle deux tarifs se valent."
        },
        {
          titre: "Affine par morceaux",
          texte: "Un tarif par tranches change de coefficient directeur à chaque tranche : le prix d'une unité supplémentaire (le prix marginal) n'est pas le prix moyen."
        }
      ],
      pieges: [
        "Prendre le terme constant pour le coefficient directeur quand l'expression est écrite « à l'envers ».",
        "Croire qu'une fonction est croissante parce que $p > 0$.",
        "Mettre les $x$ au numérateur du taux d'accroissement.",
        "Appliquer le prix de la dernière tranche à toute la quantité.",
        "Oublier de vérifier qu'un modèle a un sens (prix, quantités positifs).",
        "Oublier les unités et le contexte dans la réponse."
      ]
    },

    evaluation: {
      intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Les tarifs et les données sont fictifs. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
      exercices: [
        {
          titre: "La facture d'eau",
          duree: 25, points: 7, calculatrice: false,
          contexte: "Une commune facture l'eau par tranches. Chaque mois : un abonnement de $12$ €, puis $1$ € par m³ pour les $15$ premiers m³, et $2{,}50$ € par m³ au-delà. On note $f(x)$ la facture mensuelle, en euros, pour une consommation de $x$ m³.",
          figure: (o) => o.graph({
            xmin: -1.5, xmax: 33, ymin: 0, ymax: 75, xstep: 5, ystep: 5, yetiq: 10, h: 260, padL: 30,
            xlabel: "x", ylabel: "f(x)",
            curves: [{ f: facture, a: 0, b: 30, closed: false, label: "facture", lx: 26, dx: -6, dy: -12 }],
            points: [{ x: 15, y: 27, label: "(15 ; 27)", gauche: true }],
            aria: "Courbe de la facture : un segment de (0 ; 12) à (15 ; 27), puis un segment plus raide de (15 ; 27) à (30 ; 64,5)"
          }),
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Calcule la facture pour $10$ m³, puis pour $20$ m³.",
              indice: "Pour $20$ m³ : $15$ m³ à $1$ €, puis $5$ m³ à $2{,}50$ €, sans oublier l'abonnement.",
              corrige: "Pour $10$ m³ : $12 + 10 = 22$ €. Pour $20$ m³ : $12 + 15 + 5 \\times 2{,}5 = 27 + 12{,}5 = 39{,}50$ €."
            },
            {
              n: "2.", points: 1.5,
              texte: "Exprime $f(x)$ pour $0 \\leqslant x \\leqslant 15$, puis pour $x > 15$. Développe la seconde expression.",
              indice: "Au-delà de $15$ m³, on paie $27$ € pour les $15$ premiers m³, puis $2{,}5$ € pour chacun des $x - 15$ suivants.",
              corrige: "Pour $0 \\leqslant x \\leqslant 15$ : $f(x) = x + 12$. Pour $x > 15$ : $f(x) = 27 + 2{,}5(x - 15) = 2{,}5x - 10{,}5$."
            },
            {
              n: "3.", points: 1.5,
              texte: "Sur la figure, la courbe est formée de deux segments. Que représentent leurs coefficients directeurs ? Pourquoi le second segment est-il plus raide ?",
              indice: "Le coefficient directeur indique de combien la facture augmente pour $1$ m³ de plus.",
              corrige: "Le premier segment a pour coefficient directeur $1$ : chaque m³ coûte $1$ € jusqu'à $15$ m³. Le second a pour coefficient directeur $2{,}5$ : au-delà, chaque m³ supplémentaire coûte $2{,}50$ €. Il est donc plus raide."
            },
            {
              n: "4.", points: 1.5,
              texte: "Une famille reçoit une facture de $52$ €. Quelle a été sa consommation ?",
              indice: "$52 > 27$ : la consommation dépasse $15$ m³. Résous $2{,}5x - 10{,}5 = 52$.",
              corrige: "La facture dépasse $27$ €, donc $x > 15$ : $2{,}5x - 10{,}5 = 52 \\iff 2{,}5x = 62{,}5 \\iff x = 25$. La famille a consommé $25$ m³."
            },
            {
              n: "5.", points: 1,
              texte: "Vrai ou faux : « Pour $30$ m³, chaque m³ coûte $2{,}50$ €. » Calcule le prix moyen d'un m³, abonnement compris, pour $30$ m³.",
              indice: "Calcule $f(30)$, puis divise par $30$.",
              corrige: "**Faux.** $f(30) = 2{,}5 \\times 30 - 10{,}5 = 64{,}50$ €, soit en moyenne $\\dfrac{64{,}5}{30} = 2{,}15$ € par m³. Seuls les m³ au-delà de $15$ coûtent $2{,}50$ € : c'est le prix marginal, pas le prix moyen."
            }
          ]
        },
        {
          titre: "Le marché des mangues",
          duree: 25, points: 7, calculatrice: false,
          contexte: "Sur un marché, pour un prix $p$ du kilo de mangues, en euros, la quantité demandée par les clients est $D(p) = 900 - 50p$ et la quantité proposée par les vendeurs est $O(p) = 100p - 300$, en kilos (modèle fictif).",
          figure: (o) => o.graph({
            xmin: -0.8, xmax: 19.5, ymin: 0, ymax: 1000, xstep: 1, xetiq: 2, ystep: 50, yetiq: 200, h: 280, padL: 34,
            xlabel: "p", ylabel: "kg",
            curves: [
              { f: (p) => 900 - 50 * p, a: 0, b: 18, closed: false, label: "demande", lx: 2, dx: 70, dy: -6 },
              { f: (p) => 100 * p - 300, a: 3, b: 12.6, closed: false, label: "offre", lx: 11.2, dx: -8, dy: -4 }
            ],
            aria: "Droite de la demande, qui descend de 900 kg pour un prix nul à 0 kg pour 18 € ; droite de l'offre, qui monte de 0 kg pour 3 € ; elles se coupent pour un prix de 8 €"
          }),
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Calcule $D(6)$ et $O(6)$. Que se passe-t-il sur le marché si le kilo est vendu $6$ € ?",
              indice: "Compare la quantité demandée et la quantité proposée.",
              corrige: "$D(6) = 900 - 300 = 600$ kg et $O(6) = 600 - 300 = 300$ kg : les clients veulent deux fois plus de mangues que les vendeurs n'en proposent. Il y a une pénurie."
            },
            {
              n: "2.", points: 1.5,
              texte: "Donne le sens de variation de $D$ et de $O$. Interprète leurs coefficients directeurs.",
              indice: "Regarde le signe du coefficient de $p$.",
              corrige: "$D$ est décroissante (coefficient $-50$) : quand le prix augmente de $1$ €, les clients demandent $50$ kg de moins. $O$ est croissante (coefficient $100$) : les vendeurs proposent $100$ kg de plus."
            },
            {
              n: "3.", points: 1.5,
              texte: "Détermine le prix d'équilibre, pour lequel l'offre est égale à la demande, et la quantité échangée.",
              indice: "Résous $900 - 50p = 100p - 300$.",
              corrige: "$900 - 50p = 100p - 300 \\iff 1\\,200 = 150p \\iff p = 8$. Le prix d'équilibre est $8$ € le kilo, et la quantité échangée $D(8) = 900 - 400 = 500$ kg."
            },
            {
              n: "4.", points: 1.5,
              texte: "Si le prix est fixé à $10$ €, quelle quantité de mangues reste invendue ?",
              indice: "Calcule $O(10) - D(10)$.",
              corrige: "$D(10) = 400$ kg et $O(10) = 700$ kg : il reste $700 - 400 = 300$ kg de mangues invendues."
            },
            {
              n: "5.", points: 1,
              texte: "Pour quels prix les deux quantités sont-elles positives ou nulles ? Sur quel intervalle de prix ce modèle a-t-il un sens ?",
              indice: "Résous $D(p) \\geqslant 0$, puis $O(p) \\geqslant 0$.",
              corrige: "$D(p) \\geqslant 0 \\iff p \\leqslant 18$ et $O(p) \\geqslant 0 \\iff p \\geqslant 3$. Le modèle n'a de sens que pour un prix entre $3$ € et $18$ €."
            }
          ]
        },
        {
          titre: "Le salaire d'un commercial",
          duree: 25, points: 6, calculatrice: false,
          contexte: "Le salaire mensuel d'un commercial est une fonction affine $S$ du chiffre d'affaires $x$ qu'il réalise dans le mois, en euros. En janvier, pour $x = 20\\,000$ €, il a touché $2\\,200$ € ; en février, pour $x = 30\\,000$ €, il a touché $2\\,700$ €.",
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Calcule le coefficient directeur de $S$ et interprète-le.",
              indice: "$m = \\dfrac{2\\,700 - 2\\,200}{30\\,000 - 20\\,000}$.",
              corrige: "$m = \\dfrac{500}{10\\,000} = 0{,}05$ : le commercial touche $5$ centimes par euro de chiffre d'affaires, c'est-à-dire une commission de $5\\,\\%$."
            },
            {
              n: "2.", points: 1.5,
              texte: "Détermine $S(x)$. Que représente l'ordonnée à l'origine ?",
              indice: "$2\\,200 = 0{,}05 \\times 20\\,000 + p$.",
              corrige: "$2\\,200 = 1\\,000 + p$, donc $p = 1\\,200$ : $S(x) = 0{,}05x + 1\\,200$. L'ordonnée à l'origine est la partie fixe du salaire, touchée même sans aucune vente."
            },
            {
              n: "3.", points: 1.5,
              texte: "Une autre entreprise propose $T(x) = 0{,}03x + 1\\,500$. Pour quel chiffre d'affaires les deux salaires sont-ils égaux ?",
              indice: "Résous $0{,}05x + 1\\,200 = 0{,}03x + 1\\,500$.",
              corrige: "$0{,}05x + 1\\,200 = 0{,}03x + 1\\,500 \\iff 0{,}02x = 300 \\iff x = 15\\,000$. Les deux salaires sont égaux, à $1\\,950$ €, pour $15\\,000$ € de chiffre d'affaires."
            },
            {
              n: "4.", points: 1.5,
              texte: "Le commercial réalise en moyenne $25\\,000$ € de chiffre d'affaires par mois. Quelle offre a-t-il intérêt à choisir ?",
              indice: "Calcule $S(25\\,000)$ et $T(25\\,000)$.",
              corrige: "$S(25\\,000) = 1\\,250 + 1\\,200 = 2\\,450$ € et $T(25\\,000) = 750 + 1\\,500 = 2\\,250$ € : il a intérêt à garder son offre actuelle. L'autre n'est meilleure qu'en dessous de $15\\,000$ € de chiffre d'affaires."
            }
          ]
        }
      ]
    }
  };
})();
