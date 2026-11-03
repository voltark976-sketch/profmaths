/*
  ENTRAÎNEMENT : Seconde — chapitre 10, Tableaux croisés, fréquences conditionnelles, probabilités 1
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre seconde-tableaux-croises.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle ou devoir commun de Seconde.
  Notations du cours : f_A(B) fréquence de B parmi les A, P_B(A) probabilité de A sachant B, Card.
  Données fictives.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["seconde-tableaux-croises"] = {
  revisions: {
    intro: "Les tableaux croisés et les probabilités en un coup d'œil : fréquences « parmi… », et, ou, non, probabilité conditionnelle. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Tableau croisé",
        texte: "Il donne les effectifs d'une population selon **deux variables qualitatives**, l'une en ligne, l'autre en colonne. La dernière ligne et la dernière colonne donnent les totaux ; on complète une case avec les sommes par ligne ou par colonne."
      },
      {
        titre: "Fréquence marginale",
        texte: "C'est un total de ligne ou de colonne divisé par l'effectif total : la part de toute la population qui a cette modalité."
      },
      {
        titre: "Fréquence conditionnelle",
        texte: "$f_A(B)$ est la fréquence de $B$ **parmi les** $A$ : l'effectif de « $A$ et $B$ » divisé par l'effectif de $A$, pas par l'effectif total. En général, $f_A(B)$ et $f_B(A)$ sont différentes."
      },
      {
        titre: "Lire une phrase des médias",
        texte: "« $x\\,\\%$ des $A$ sont $B$ » se traduit par $f_A(B) = \\dfrac{x}{100}$ : la population de référence est celle qui suit « des » ou « parmi les »."
      },
      {
        titre: "Probabilité",
        texte: "Les probabilités des issues font $1$ en tout. En cas d'équiprobabilité : $P(A) = \\dfrac{\\text{Card}(A)}{\\text{Card}(\\Omega)}$. Événement contraire : $P(\\overline{A}) = 1 - P(A)$."
      },
      {
        titre: "Et, ou",
        texte: "$A \\cap B$ : à la fois $A$ et $B$ (une case du tableau). $A \\cup B$ : $A$, ou $B$, ou les deux, car le « ou » est **inclusif**. Pour compter $A \\cup B$ : $\\text{Card}(A) + \\text{Card}(B)$, moins $\\text{Card}(A \\cap B)$, comptée deux fois."
      },
      {
        titre: "Probabilité conditionnelle",
        texte: "On tire un individu au hasard : $P_B(A) = \\dfrac{\\text{Card}(A \\cap B)}{\\text{Card}(B)}$. On se place dans la ligne ou la colonne de $B$, et on divise par **son** total."
      },
      {
        titre: "Python : and, or, not",
        texte: "Pour compter les individus qui vérifient un critère, on parcourt la liste et on teste une condition avec $\\texttt{and}$ (et), $\\texttt{or}$ (ou, inclusif) et $\\texttt{not}$ (non)."
      }
    ],
    pieges: [
      "Diviser par l'effectif total au lieu du total de la sous-population (« parmi les… »).",
      "Confondre $f_A(B)$ et $f_B(A)$ : « $25\\,\\%$ des musiciens chantent » ne veut pas dire « $25\\,\\%$ des chanteurs sont musiciens ».",
      "Compter deux fois la partie commune dans $A \\cup B$.",
      "Croire que « ou » exclut les deux à la fois : en mathématiques, il est inclusif.",
      "Oublier que les probabilités de toutes les issues font $1$ : c'est ce qui donne $P(\\overline{A}) = 1 - P(A)$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle ou au devoir commun (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Partir tôt, sans petit-déjeuner ?",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Une enquête a interrogé les $400$ élèves d'un lycée sur leur heure de départ de la maison et sur leur petit-déjeuner (données fictives). Dans le tableau, « Oui » signifie que l'élève prend un petit-déjeuner avant de partir.",
        tableau: {
          lignes: [
            ["\\text{Départ}", "\\text{Oui}", "\\text{Non}", "\\text{Total}"],
            ["\\text{avant 6 h}", "40", "\\ldots", "100"],
            ["\\text{de 6 h à 6 h 30}", "140", "40", "\\ldots"],
            ["\\text{après 6 h 30}", "\\ldots", "20", "\\ldots"],
            ["\\text{Total}", "280", "\\ldots", "400"]
          ]
        },
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Recopie et complète le tableau.",
            indice: "Dans chaque ligne, la somme des cases fait le total de la ligne ; dans chaque colonne, la somme fait le total de la colonne. Commence par la ligne « avant 6 h ».",
            corrige: "Ligne « avant 6 h » : $100 - 40 = 60$. Colonne « Oui » : $280 - 40 - 140 = 100$. Puis les totaux : $140 + 40 = 180$, $100 + 20 = 120$ et $60 + 40 + 20 = 120$. Vérification : $100 + 180 + 120 = 400$.",
            tableauCorrige: {
              lignes: [
                ["\\text{Départ}", "\\text{Oui}", "\\text{Non}", "\\text{Total}"],
                ["\\text{avant 6 h}", "40", "60", "100"],
                ["\\text{de 6 h à 6 h 30}", "140", "40", "180"],
                ["\\text{après 6 h 30}", "100", "20", "120"],
                ["\\text{Total}", "280", "120", "400"]
              ]
            }
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule la fréquence des élèves qui ne prennent pas de petit-déjeuner, puis cette fréquence parmi les élèves qui partent avant 6 h. Que remarques-tu ?",
            indice: "La première est une fréquence marginale (on divise par $400$). La seconde est conditionnelle : on se place dans la ligne « avant 6 h » et on divise par son total.",
            corrige: "Fréquence marginale : $\\dfrac{120}{400} = 0{,}3$, soit $30\\,\\%$. Parmi les élèves qui partent avant 6 h : $\\dfrac{60}{100} = 0{,}6$, soit $60\\,\\%$. Les élèves qui partent tôt sautent deux fois plus souvent le petit-déjeuner."
          },
          {
            n: "3.", points: 1.5,
            texte: "Un article affirme : « $60\\,\\%$ des élèves qui ne prennent pas de petit-déjeuner partent avant 6 h. » Est-ce exact ? Explique l'erreur.",
            indice: "Ici, la population de référence est celle qui suit « des » : les élèves qui ne prennent pas de petit-déjeuner. Place-toi dans la colonne « Non ».",
            corrige: "Non. Parmi les $120$ élèves qui ne prennent pas de petit-déjeuner, $60$ partent avant 6 h : $\\dfrac{60}{120} = 0{,}5$, soit $50\\,\\%$. Le journaliste a confondu cette fréquence avec la fréquence des élèves sans petit-déjeuner **parmi** ceux qui partent avant 6 h, qui vaut $60\\,\\%$ : on n'a pas divisé par le même total."
          },
          {
            n: "4.", points: 1.5,
            texte: "On choisit un élève au hasard. On note $A$ : « il part avant 6 h » et $N$ : « il ne prend pas de petit-déjeuner ». Calcule $P(A \\cap N)$, $P(A \\cup N)$ et $P(\\overline{A})$.",
            indice: "$A \\cap N$ est une case du tableau. Pour $A \\cup N$, retire la case commune, comptée deux fois.",
            corrige: "$P(A \\cap N) = \\dfrac{60}{400} = 0{,}15$. $\\text{Card}(A \\cup N) = 100 + 120 - 60 = 160$, donc $P(A \\cup N) = \\dfrac{160}{400} = 0{,}4$. Enfin $P(\\overline{A}) = 1 - \\dfrac{100}{400} = 0{,}75$."
          },
          {
            n: "5.", points: 1,
            texte: "On choisit au hasard un élève qui part après 6 h 30. Quelle est la probabilité qu'il ne prenne pas de petit-déjeuner ? Compare avec $P_A(N)$.",
            indice: "Place-toi dans la ligne « après 6 h 30 ».",
            corrige: "Dans la ligne « après 6 h 30 », $20$ élèves sur $120$ ne prennent pas de petit-déjeuner : la probabilité vaut $\\dfrac{20}{120} = \\dfrac{1}{6} \\approx 0{,}17$. C'est bien moins que $P_A(N) = \\dfrac{60}{100} = 0{,}6$ : plus on part tôt, plus on saute le petit-déjeuner."
          }
        ]
      },
      {
        titre: "Natation et football",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Dans une classe de Seconde de $32$ élèves, $18$ font de la natation, $12$ font du football et $5$ font les deux (données fictives). On choisit un élève au hasard. On note $N$ : « il fait de la natation » et $F$ : « il fait du football ». Donne les probabilités sous forme de fractions irréductibles.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Combien d'élèves font seulement de la natation ? seulement du football ? ni l'un ni l'autre ? Représente la situation par un diagramme.",
            indice: "Les $5$ élèves qui font les deux sont comptés parmi les $18$ nageurs et parmi les $12$ footballeurs.",
            corrige: "Seulement natation : $18 - 5 = 13$. Seulement football : $12 - 5 = 7$. Au moins un des deux : $13 + 5 + 7 = 25$, donc ni l'un ni l'autre : $32 - 25 = 7$.",
            figureCorrige: () => {
              let s = `<svg class="graph" viewBox="0 0 320 170" role="img" aria-label="Diagramme : 13 élèves font seulement de la natation, 5 font les deux, 7 seulement du football, 7 ni l'un ni l'autre, 32 élèves en tout">`;
              s += `<rect x="8" y="8" width="304" height="154" rx="8" style="fill:none;stroke:var(--doux);stroke-width:1.4"/>`;
              s += `<circle cx="128" cy="90" r="58" style="fill:var(--lagon-pale);fill-opacity:0.8;stroke:var(--lagon);stroke-width:2"/><circle cx="196" cy="90" r="58" style="fill:var(--ylang-pale);fill-opacity:0.6;stroke:var(--ylang);stroke-width:2"/>`;
              s += `<text class="g-label" x="78" y="38" style="font-style:italic;font-size:14px">N</text><text class="g-label" x="240" y="38" style="font-style:italic;font-size:14px">F</text>`;
              s += `<text class="g-label" x="104" y="95" text-anchor="middle" style="font-size:14px">13</text><text class="g-label" x="162" y="95" text-anchor="middle" style="font-size:14px">5</text><text class="g-label" x="222" y="95" text-anchor="middle" style="font-size:14px">7</text>`;
              return s + `<text class="g-label" x="288" y="150" text-anchor="middle" style="font-size:14px">7</text><text class="g-label" x="18" y="26" style="font-weight:400">32 élèves</text></svg>`;
            }
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule $P(N)$, $P(F)$ et $P(N \\cap F)$.",
            indice: "Chaque élève a la même chance d'être choisi : on divise le nombre d'élèves concernés par $32$, puis on simplifie.",
            corrige: "$P(N) = \\dfrac{18}{32} = \\dfrac{9}{16}$, $P(F) = \\dfrac{12}{32} = \\dfrac{3}{8}$ et $P(N \\cap F) = \\dfrac{5}{32}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Traduis l'événement $N \\cup F$ par une phrase, puis calcule $P(N \\cup F)$ de deux façons.",
            indice: "Avec la formule du cours, ou avec l'événement contraire « ni natation ni football ».",
            corrige: "$N \\cup F$ : « l'élève fait de la natation ou du football (ou les deux) ». Avec la formule : $P(N \\cup F) = \\dfrac{18 + 12 - 5}{32} = \\dfrac{25}{32}$. Avec le contraire : $1 - \\dfrac{7}{32} = \\dfrac{25}{32}$."
          },
          {
            n: "4.", points: 1.5,
            texte: "On choisit au hasard un élève qui fait du football. Quelle est la probabilité qu'il fasse aussi de la natation ? Calcule ensuite $P_N(F)$ et compare.",
            indice: "On se restreint aux $12$ footballeurs, puis aux $18$ nageurs.",
            corrige: "$P_F(N) = \\dfrac{5}{12}$ : $5$ footballeurs sur $12$ nagent aussi. $P_N(F) = \\dfrac{5}{18}$ : $5$ nageurs sur $18$ jouent au football. Le numérateur est le même, mais pas la population de référence : $P_F(N) > P_N(F)$."
          },
          {
            n: "5.", points: 1,
            texte: "Un élève écrit : $P(N \\cup F) = P(N) + P(F) = \\dfrac{30}{32}$. Explique son erreur.",
            indice: "Où sont comptés les $5$ élèves qui font les deux sports ?",
            corrige: "En additionnant $18$ et $12$, il compte deux fois les $5$ élèves qui font les deux sports. Il faut les retirer une fois : $P(N \\cup F) = \\dfrac{18 + 12 - 5}{32} = \\dfrac{25}{32}$."
          }
        ]
      },
      {
        titre: "Les jetons de l'urne",
        duree: 20, points: 6, calculatrice: false,
        contexte: "Une urne contient $20$ jetons numérotés de $1$ à $20$, indiscernables au toucher. On tire un jeton au hasard. On note $A$ : « le numéro est pair » et $B$ : « le numéro est un multiple de $3$ ».",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Écris la liste des issues de $B$. Calcule $P(A)$, $P(B)$ et $P(\\overline{A})$.",
            indice: "Les multiples de $3$ jusqu'à $20$ : $3$, $6$… Les $20$ issues sont équiprobables.",
            corrige: "$B = \\{3\\,;6\\,;9\\,;12\\,;15\\,;18\\}$. Il y a $10$ numéros pairs : $P(A) = \\dfrac{10}{20} = 0{,}5$. $P(B) = \\dfrac{6}{20} = 0{,}3$ et $P(\\overline{A}) = 1 - 0{,}5 = 0{,}5$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Écris les issues de $A \\cap B$, puis calcule $P(A \\cap B)$ et $P(A \\cup B)$.",
            indice: "Un numéro pair et multiple de $3$ est un multiple de $6$.",
            corrige: "$A \\cap B = \\{6\\,;12\\,;18\\}$, donc $P(A \\cap B) = \\dfrac{3}{20} = 0{,}15$. Puis $\\text{Card}(A \\cup B) = 10 + 6 - 3 = 13$, donc $P(A \\cup B) = \\dfrac{13}{20} = 0{,}65$."
          },
          {
            n: "3.", points: 1.5,
            texte:
              "Qu'affiche ce programme ? Quelle probabilité calcule-t-il ? Que faut-il changer pour obtenir $P(A \\cap B)$ ?\n\n" +
              "```python\nc = 0\nfor n in range(1, 21):\n    pair = n % 2 == 0\n    mult3 = n % 3 == 0\n    if pair or mult3:\n        c = c + 1\nprint(c / 20)\n```",
            indice: "$\\texttt{n \\% 2 == 0}$ teste si $n$ est pair. Le $\\texttt{or}$ est inclusif.",
            corrige: "Il compte les numéros pairs ou multiples de $3$ : $\\texttt{c}$ vaut $13$ et le programme affiche $\\texttt{0.65}$, c'est $P(A \\cup B)$. En remplaçant $\\texttt{or}$ par $\\texttt{and}$, il compte $6$, $12$ et $18$ et affiche $\\texttt{0.15}$, soit $P(A \\cap B)$."
          },
          {
            n: "4.", points: 1.5,
            texte: "On remplace le test par $\\texttt{if not pair and not mult3:}$. Qu'affiche alors le programme ? Traduis cet événement à l'aide de $A$ et $B$.",
            indice: "Ce sont les numéros ni pairs ni multiples de $3$. Quel est le contraire de « pair ou multiple de $3$ » ?",
            corrige: "Le programme compte les numéros ni pairs ni multiples de $3$ : $1$, $5$, $7$, $11$, $13$, $17$, $19$, soit $7$ numéros. Il affiche $\\texttt{0.35}$. C'est l'événement $\\overline{A} \\cap \\overline{B}$, contraire de $A \\cup B$ : $1 - 0{,}65 = 0{,}35$."
          }
        ]
      }
    ]
  }
};
