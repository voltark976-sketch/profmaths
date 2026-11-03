/*
  ENTRAÎNEMENT : Terminale maths complémentaires — chapitre 14, Répartition des richesses et inégalités
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-repartition-richesses.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths complémentaires.
  Toutes les données des exercices sont fictives (dites comme telles dans les énoncés).
*/
window.EVALUATIONS = window.EVALUATIONS || {};
(function () {
  const L = (x) => (Math.exp(2 * x) - 1) / (Math.exp(2) - 1); // courbe de Lorenz de la ville B (exercice 2)
  const X3 = [0, 0.2, 0.4, 0.6, 0.8, 1], L3 = [0, 0.06, 0.17, 0.33, 0.55, 1]; // points connus de l'exercice 3
  const ligne3 = (x) => { const k = Math.min(4, Math.floor(x / 0.2 + 1e-9)); return L3[k] + ((L3[k + 1] - L3[k]) * (x - X3[k])) / 0.2; };

  window.EVALUATIONS["terminale-repartition-richesses"] = {
    revisions: {
      intro: "Mesurer les inégalités en un coup d'œil : déciles et rapport interdécile, courbe de Lorenz, indice de Gini et méthode des trapèzes. Relis, repère les pièges, puis teste-toi.",
      essentiel: [
        {
          titre: "Déciles",
          texte: "Dans une série rangée dans l'ordre croissant, $D_1$ est la plus petite valeur telle qu'au moins $10\\,\\%$ des valeurs lui sont inférieures ou égales ; $D_9$, de même avec $90\\,\\%$. Avec $40$ valeurs, $D_1$ est la $4^\\text{e}$ et $D_9$ la $36^\\text{e}$."
        },
        {
          titre: "Rapport interdécile",
          texte: "$\\dfrac{D_9}{D_1}$ compare le seuil d'entrée des $10\\,\\%$ les plus aisés au plafond des $10\\,\\%$ les plus modestes. Contrairement à la moyenne, il ne bouge pas si les plus riches s'enrichissent encore."
        },
        {
          titre: "Courbe de Lorenz",
          texte:
            "- $L(x)$ est la part du revenu total perçue par la proportion $x$ la plus modeste ;\n" +
            "- $L(0) = 0$, $L(1) = 1$, $L$ est croissante et convexe, et $L(x) \\leqslant x$ ;\n" +
            "- les $10\\,\\%$ les plus aisés perçoivent $1 - L(0{,}9)$."
        },
        {
          titre: "Indice de Gini",
          texte: "$G = 1 - 2\\displaystyle\\int_0^1 L(x)\\,\\mathrm{d}x$ : c'est le double de l'aire entre la diagonale et la courbe de Lorenz. Il vaut $0$ pour l'égalité parfaite ($L(x) = x$) et se rapproche de $1$ quand les inégalités augmentent."
        },
        {
          titre: "Méthode des trapèzes",
          texte: "Quand on ne connaît $L$ qu'en quelques points, on approche $\\displaystyle\\int_0^1 L(x)\\,\\mathrm{d}x$ par la somme des aires des trapèzes construits sur ces points. Comme $L$ est convexe, cette valeur est un peu trop grande."
        }
      ],
      pieges: [
        "Oublier de ranger les valeurs avant de chercher un décile.",
        "Confondre $L(0{,}1)$, la part des $10\\,\\%$ les plus modestes, et $1 - L(0{,}9)$, celle des $10\\,\\%$ les plus aisés.",
        "Prendre $\\displaystyle\\int_0^1 L(x)\\,\\mathrm{d}x$ pour l'indice de Gini.",
        "Croire qu'un indice de Gini élevé signifie un pays riche : il mesure les inégalités.",
        "Confondre le rapport interdécile $\\dfrac{D_9}{D_1}$ et la différence $D_9 - D_1$."
      ]
    },

    evaluation: {
      intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Les données sont fictives. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
      exercices: [
        {
          titre: "Les niveaux de vie d'un village",
          duree: 25, points: 7, calculatrice: true,
          contexte:
            "Voici les niveaux de vie mensuels, en euros, de $20$ foyers d'un village (données fictives), rangés dans l'ordre croissant :\n\n" +
            "$180$ ; $210$ ; $240$ ; $260$ ; $280$ ; $300$ ; $320$ ; $350$ ; $380$ ; $400$ ; $430$ ; $460$ ; $500$ ; $560$ ; $620$ ; $700$ ; $820$ ; $1\\,000$ ; $1\\,400$ ; $2\\,500$.\n\n" +
            "Leur somme vaut $11\\,910$ €.",
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Calcule la moyenne et la médiane de cette série. Pourquoi sont-elles si différentes ?",
              indice: "Avec $20$ valeurs rangées, la médiane est la moyenne de la $10^\\text{e}$ et de la $11^\\text{e}$.",
              corrige: "Moyenne : $\\dfrac{11\\,910}{20} = 595{,}50$ €. Médiane : $\\dfrac{400 + 430}{2} = 415$ €.\n\nQuelques niveaux de vie très élevés ($1\\,400$ € et $2\\,500$ €) tirent la moyenne vers le haut, mais pas la médiane : $14$ foyers sur $20$ sont sous la moyenne."
            },
            {
              n: "2.", points: 1.5,
              texte: "Détermine $D_1$ et $D_9$, puis le rapport interdécile $\\dfrac{D_9}{D_1}$. Interprète.",
              indice: "$10\\,\\%$ de $20$ valeurs, c'est $2$ valeurs ; $90\\,\\%$, c'est $18$ valeurs.",
              corrige: "$D_1$ est la $2^\\text{e}$ valeur : $D_1 = 210$ €. $D_9$ est la $18^\\text{e}$ valeur : $D_9 = 1\\,000$ €.\n\n$\\dfrac{D_9}{D_1} = \\dfrac{1\\,000}{210} \\approx 4{,}8$ : le seuil d'entrée des $10\\,\\%$ les plus aisés est environ $4{,}8$ fois plus élevé que le plafond des $10\\,\\%$ les plus modestes."
            },
            {
              n: "3.", points: 1.5,
              texte: "Quelle part du total reçoivent les $10$ foyers les plus modestes ? Et les $2$ foyers les plus aisés ? Déduis-en $L(0{,}5)$ et $L(0{,}9)$, où $L$ est la courbe de Lorenz du village.",
              indice: "Additionne les $10$ premières valeurs, puis les $2$ dernières, et divise par $11\\,910$.",
              corrige: "Les $10$ plus modestes ont en tout $2\\,920$ €, soit $\\dfrac{2\\,920}{11\\,910} \\approx 24{,}5\\,\\%$ du total. Les $2$ plus aisés ont $1\\,400 + 2\\,500 = 3\\,900$ €, soit $\\dfrac{3\\,900}{11\\,910} \\approx 32{,}7\\,\\%$.\n\nDonc $L(0{,}5) \\approx 0{,}245$, et $L(0{,}9) = 1 - \\dfrac{3\\,900}{11\\,910} \\approx 0{,}673$."
            },
            {
              n: "4.", points: 1.5,
              texte: "Le niveau de vie du foyer le plus aisé passe de $2\\,500$ € à $10\\,000$ €. Que deviennent la moyenne, la médiane et le rapport interdécile ?",
              indice: "La somme augmente de $7\\,500$ €. Les valeurs de rang $2$, $10$, $11$ et $18$ changent-elles ?",
              corrige: "La somme passe à $19\\,410$ € : la moyenne passe à $970{,}50$ €. La médiane, $D_1$ et $D_9$ ne changent pas, car les valeurs de rang $2$, $10$, $11$ et $18$ restent les mêmes : le rapport interdécile reste environ $4{,}8$.\n\nLes déciles et la médiane résistent aux valeurs extrêmes, pas la moyenne."
            },
            {
              n: "5.", points: 1,
              texte: "Vrai ou faux : « Un rapport interdécile de $4{,}8$ signifie que les $10\\,\\%$ les plus aisés gagnent en moyenne $4{,}8$ fois plus que les $10\\,\\%$ les plus modestes. » Justifie avec la série de départ.",
              indice: "Calcule le niveau de vie moyen des $2$ foyers les plus aisés et celui des $2$ plus modestes.",
              corrige: "**Faux.** Le rapport interdécile compare deux seuils, $D_9$ et $D_1$, pas des moyennes. Ici, les $2$ foyers les plus aisés ont en moyenne $1\\,950$ € et les $2$ plus modestes $195$ € : un rapport de $10$."
            }
          ]
        },
        {
          titre: "Une courbe de Lorenz exponentielle",
          duree: 25, points: 7, calculatrice: true,
          contexte: "Dans une ville B (fictive), la courbe de Lorenz des revenus est celle de la fonction $L(x) = \\dfrac{e^{2x} - 1}{e^2 - 1}$ sur $[0\\,;1]$ : la proportion $x$ des habitants les plus modestes perçoit la part $L(x)$ du revenu total. L'indice de Gini est $G = 1 - 2\\displaystyle\\int_0^1 L(x)\\,\\mathrm{d}x$ (le double de l'aire colorée).",
          figure: (o) => o.graph({
            xmin: -0.08, xmax: 1.08, ymin: 0, ymax: 1.08, xstep: 0.1, xetiq: 0.5, ystep: 0.1, yetiq: 0.5, h: 280, padL: 26,
            aires: [{ f: (x) => x, g: L, a: 0, b: 1 }],
            curves: [
              { f: (x) => x, a: 0, b: 1, label: "y = x", lx: 0.55, dx: -6, dy: -6 },
              { f: L, a: 0, b: 1, label: "L", lx: 0.75, dx: 16, dy: 10 }
            ],
            aria: "Dans le carré unité, la diagonale y = x et, en dessous, la courbe de Lorenz L, qui part de 0 et finit en 1 ; l'aire entre les deux est coloriée"
          }),
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Vérifie que $L(0) = 0$ et $L(1) = 1$, puis que $L$ est croissante et convexe sur $[0\\,;1]$.",
              indice: "$e^2 - 1$ est une constante positive. Dérive $e^{2x}$ deux fois.",
              corrige: "$L(0) = \\dfrac{1 - 1}{e^2 - 1} = 0$ et $L(1) = \\dfrac{e^2 - 1}{e^2 - 1} = 1$.\n\n$L'(x) = \\dfrac{2e^{2x}}{e^2 - 1} > 0$ : $L$ est croissante. $L''(x) = \\dfrac{4e^{2x}}{e^2 - 1} > 0$ : $L$ est convexe."
            },
            {
              n: "2.", points: 1,
              texte: "Montre que $L(0{,}5) = \\dfrac{1}{e + 1}$ et interprète.",
              indice: "$e^2 - 1 = (e - 1)(e + 1)$.",
              corrige: "$L(0{,}5) = \\dfrac{e - 1}{e^2 - 1} = \\dfrac{e - 1}{(e - 1)(e + 1)} = \\dfrac{1}{e + 1} \\approx 0{,}269$ : la moitié la plus modeste des habitants perçoit environ $27\\,\\%$ du revenu total."
            },
            {
              n: "3.", points: 1,
              texte: "Quelle part du revenu total perçoivent les $10\\,\\%$ les plus aisés ?",
              indice: "Les $90\\,\\%$ les plus modestes perçoivent $L(0{,}9)$.",
              corrige: "$L(0{,}9) = \\dfrac{e^{1{,}8} - 1}{e^2 - 1} \\approx 0{,}790$. Les $10\\,\\%$ les plus aisés perçoivent donc $1 - L(0{,}9) \\approx 0{,}21$, soit environ $21\\,\\%$ du revenu total."
            },
            {
              n: "4.", points: 2,
              texte: "Démontre que l'indice de Gini de la ville B vaut $G = \\dfrac{2}{e^2 - 1}$, puis donnes-en une valeur approchée.",
              indice: "Une primitive de $e^{2x} - 1$ est $\\dfrac{1}{2}e^{2x} - x$.",
              corrige: "$\\displaystyle\\int_0^1 L(x)\\,\\mathrm{d}x = \\dfrac{1}{e^2 - 1}\\left[\\dfrac{e^{2x}}{2} - x\\right]_0^1 = \\dfrac{1}{e^2 - 1}\\left(\\dfrac{e^2}{2} - 1 - \\dfrac{1}{2}\\right) = \\dfrac{e^2 - 3}{2(e^2 - 1)}$.\n\nAlors $G = 1 - \\dfrac{e^2 - 3}{e^2 - 1} = \\dfrac{(e^2 - 1) - (e^2 - 3)}{e^2 - 1} = \\dfrac{2}{e^2 - 1} \\approx 0{,}313$."
            },
            {
              n: "5.", points: 1.5,
              texte: "Dans une ville A, la courbe de Lorenz est celle de $x \\mapsto x^2$. Calcule son indice de Gini. Compare les deux villes avec $G$, puis avec la part de la moitié la plus modeste et avec celle des $10\\,\\%$ les plus aisés. Que remarques-tu ?",
              indice: "$G_A = 1 - 2\\displaystyle\\int_0^1 x^2\\,\\mathrm{d}x$. Puis calcule $0{,}5^2$ et $1 - 0{,}9^2$.",
              corrige: "$G_A = 1 - \\dfrac{2}{3} = \\dfrac{1}{3} \\approx 0{,}333$ : d'après l'indice de Gini, la ville B est un peu moins inégalitaire que A.\n\nLa moitié la plus modeste perçoit $0{,}5^2 = 25\\,\\%$ en A, contre $27\\,\\%$ en B. Mais les $10\\,\\%$ les plus aisés perçoivent $1 - 0{,}81 = 19\\,\\%$ en A, contre $21\\,\\%$ en B. Les deux courbes de Lorenz se croisent : un seul nombre ne résume pas toutes les inégalités."
            }
          ]
        },
        {
          titre: "Estimer un indice de Gini",
          duree: 20, points: 6, calculatrice: true,
          contexte: "Dans un pays (données fictives), les $20\\,\\%$ les plus modestes perçoivent $6\\,\\%$ du revenu total, les $40\\,\\%$ les plus modestes $17\\,\\%$, les $60\\,\\%$ les plus modestes $33\\,\\%$ et les $80\\,\\%$ les plus modestes $55\\,\\%$. On ne connaît donc la courbe de Lorenz $L$ qu'en quelques points, placés sur la figure et rassemblés dans le tableau.",
          tableau: { lignes: [["x", "0", "0{,}2", "0{,}4", "0{,}6", "0{,}8", "1"], ["L(x)", "0", "0{,}06", "0{,}17", "0{,}33", "0{,}55", "1"]] },
          figure: (o) => o.graph({
            xmin: -0.08, xmax: 1.08, ymin: 0, ymax: 1.08, xstep: 0.1, xetiq: 0.5, ystep: 0.1, yetiq: 0.5, h: 280, padL: 26,
            curves: [
              { f: (x) => x, a: 0, b: 1, label: "y = x", lx: 0.55, dx: -6, dy: -6 },
              { f: ligne3, a: 0, b: 1, label: "L", lx: 0.8, dx: 16, dy: 12 }
            ],
            points: X3.slice(1, 5).map((x, k) => ({ x, y: L3[k + 1] })),
            aria: "Dans le carré unité, la diagonale et la ligne brisée qui relie les points connus de la courbe de Lorenz, de (0 ; 0) à (1 ; 1) en passant par (0,2 ; 0,06), (0,4 ; 0,17), (0,6 ; 0,33) et (0,8 ; 0,55)"
          }),
          questions: [
            {
              n: "1.", points: 1.5,
              texte: "Quelle part du revenu total perçoivent les $20\\,\\%$ les plus aisés ? Et les $20\\,\\%$ « du milieu », situés entre $40\\,\\%$ et $60\\,\\%$ ?",
              indice: "Les $20\\,\\%$ les plus aisés, ce sont tous sauf les $80\\,\\%$ les plus modestes.",
              corrige: "Les $20\\,\\%$ les plus aisés perçoivent $1 - L(0{,}8) = 1 - 0{,}55 = 45\\,\\%$ du revenu total. Ceux du milieu perçoivent $L(0{,}6) - L(0{,}4) = 0{,}33 - 0{,}17 = 16\\,\\%$."
            },
            {
              n: "2.", points: 1.5,
              texte: "Approche $\\displaystyle\\int_0^1 L(x)\\,\\mathrm{d}x$ par la méthode des trapèzes construits sur ces points, puis estime l'indice de Gini $G = 1 - 2\\displaystyle\\int_0^1 L(x)\\,\\mathrm{d}x$.",
              indice: "Un trapèze de largeur $0{,}2$ entre deux points de hauteurs $u$ et $v$ a pour aire $0{,}2 \\times \\dfrac{u + v}{2}$.",
              corrige: "Les cinq trapèzes, de largeur $0{,}2$, ont pour aires $0{,}2 \\times \\dfrac{0 + 0{,}06}{2} = 0{,}006$, puis $0{,}023$, $0{,}05$, $0{,}088$ et $0{,}155$. Leur somme vaut $0{,}322$.\n\nDonc $\\displaystyle\\int_0^1 L(x)\\,\\mathrm{d}x \\approx 0{,}322$, et $G \\approx 1 - 2 \\times 0{,}322 = 0{,}356$."
            },
            {
              n: "3.", points: 1.5,
              texte: "La vraie courbe de Lorenz est convexe. Explique pourquoi la méthode des trapèzes surestime alors l'intégrale. Le vrai indice de Gini est-il plus grand ou plus petit que $0{,}356$ ?",
              indice: "Une fonction convexe est sous ses sécantes. Où est le côté oblique de chaque trapèze par rapport à la courbe ?",
              corrige: "Une fonction convexe est sous ses sécantes : entre deux points connus, la vraie courbe passe sous le côté oblique du trapèze. Chaque trapèze a donc une aire au moins égale à l'aire sous la courbe, et la somme surestime l'intégrale.\n\nComme $G = 1 - 2\\displaystyle\\int_0^1 L(x)\\,\\mathrm{d}x$, le vrai indice de Gini est un peu plus grand que $0{,}356$."
            },
            {
              n: "4.", points: 1.5,
              texte: "Le gouvernement prend aux $20\\,\\%$ les plus aisés $5\\,\\%$ du revenu total et les donne aux $20\\,\\%$ les plus modestes. Donne les nouvelles valeurs de $L(0{,}2)$, $L(0{,}4)$, $L(0{,}6)$ et $L(0{,}8)$, puis la nouvelle estimation de l'indice de Gini. Conclus.",
              indice: "Les $20\\,\\%$ les plus modestes sont inclus dans les $40\\,\\%$, $60\\,\\%$ et $80\\,\\%$ les plus modestes : chaque valeur augmente de $0{,}05$.",
              corrige: "Chaque valeur augmente de $0{,}05$ : $L(0{,}2) = 0{,}11$, $L(0{,}4) = 0{,}22$, $L(0{,}6) = 0{,}38$ et $L(0{,}8) = 0{,}60$.\n\nLes trapèzes ont pour aires $0{,}011$, $0{,}033$, $0{,}06$, $0{,}098$ et $0{,}16$, de somme $0{,}362$. Donc $G \\approx 1 - 2 \\times 0{,}362 = 0{,}276$ : l'indice baisse d'environ $0{,}08$, les inégalités diminuent."
            }
          ]
        }
      ]
    }
  };
})();
