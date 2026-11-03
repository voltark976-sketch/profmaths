/*
  ENTRAÎNEMENT : Première technologique — chapitre 10, Fonction dérivée et variations
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre techno-fonction-derivee.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
  Polynômes de degré au plus 3, comme dans le programme 2026 de première technologique.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["techno-fonction-derivee"] = {
  revisions: {
    intro: "La fonction dérivée en un coup d'œil : dérivées usuelles, dériver un polynôme, signe de la dérivée et variations, extremums et optimisation. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Dérivées usuelles",
        texte:
          "- une constante a pour dérivée $0$ ;\n" +
          "- $x$ a pour dérivée $1$ ;\n" +
          "- $x^2$ a pour dérivée $2x$ ;\n" +
          "- $x^3$ a pour dérivée $3x^2$."
      },
      {
        titre: "Dériver un polynôme",
        texte: "On dérive terme à terme, en gardant les coefficients : $(k \\times u)' = k \\times u'$ et $(u + v)' = u' + v'$. Par exemple $(4x^3 - 5x + 1)' = 12x^2 - 5$."
      },
      {
        titre: "Signe de $f'$ et variations",
        texte: "Sur un intervalle, si $f'(x) > 0$, alors $f$ y est croissante ; si $f'(x) < 0$, alors $f$ y est décroissante. On étudie donc le signe de $f'(x)$, souvent après l'avoir factorisée."
      },
      {
        titre: "Extremum",
        texte: "Si $f'$ s'annule en $a$ **en changeant de signe**, $f$ a un extremum en $a$ : un maximum si $f'$ passe de $+$ à $-$, un minimum si elle passe de $-$ à $+$."
      },
      {
        titre: "Tableau de variations",
        texte: "Une ligne pour $x$, une pour le signe de $f'(x)$, une pour les flèches de $f$, avec les valeurs de $f$ aux bornes et là où $f'$ s'annule."
      },
      {
        titre: "Optimiser",
        texte: "On exprime la grandeur en fonction de $x$ sur son intervalle, on dérive, on étudie le signe de la dérivée, puis on conclut avec les unités du contexte."
      }
    ],
    pieges: [
      "Oublier de baisser l'exposant : la dérivée de $x^3$ est $3x^2$, pas $3x^3$.",
      "Garder le terme constant : la dérivée de $x^2 + 5$ est $2x$.",
      "Confondre le signe de $f'$ (les variations de $f$) et le signe de $f$.",
      "Conclure à un extremum dès que $f'(a) = 0$, sans vérifier le changement de signe.",
      "Donner l'abscisse à la place de la valeur de l'extremum, ou l'inverse.",
      "Oublier les unités dans la conclusion d'un problème d'optimisation."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Étudier un polynôme de degré 3",
        duree: 25, points: 7, calculatrice: false,
        contexte: "On considère la fonction $f$ définie sur $[-2\\,;4]$ par $f(x) = x^3 - 3x^2 - 9x + 2$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $f'(x)$, puis vérifie que $f'(x) = 3(x + 1)(x - 3)$.",
            indice: "Dérive terme à terme. Pour la vérification, développe $(x + 1)(x - 3)$, puis multiplie par $3$.",
            corrige: "$f'(x) = 3x^2 - 6x - 9$. Et $3(x + 1)(x - 3) = 3(x^2 - 3x + x - 3) = 3(x^2 - 2x - 3) = 3x^2 - 6x - 9$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Étudie le signe de $f'(x)$ sur $[-2\\,;4]$.",
            indice: "$f'(x)$ s'annule en $-1$ et en $3$, et son coefficient $3$ est positif.",
            corrige: "$f'(x)$ est du signe de $3$, positif, à l'extérieur des racines $-1$ et $3$, et négatif entre elles : $f'(x) > 0$ sur $[-2\\,;-1[$ et sur $]3\\,;4]$, $f'(x) < 0$ sur $]-1\\,;3[$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Dresse le tableau de variations de $f$ sur $[-2\\,;4]$, avec les valeurs de $f$ aux bornes et en $-1$ et $3$.",
            indice: "Calcule $f(-2)$, $f(-1)$, $f(3)$ et $f(4)$.",
            corrige: "$f(-2) = -8 - 12 + 18 + 2 = 0$, $f(-1) = -1 - 3 + 9 + 2 = 7$, $f(3) = 27 - 27 - 27 + 2 = -25$ et $f(4) = 64 - 48 - 36 + 2 = -18$.",
            tableauCorrige: { lignes: [["x", "-2", "", "-1", "", "3", "", "4"], ["f'(x)", "", "+", "0", "-", "0", "+", ""], ["f(x)", "0", "\\nearrow", "7", "\\searrow", "-25", "\\nearrow", "-18"]] }
          },
          {
            n: "4.", points: 1.5,
            texte: "Donne le maximum et le minimum de $f$ sur $[-2\\,;4]$, et les valeurs de $x$ où ils sont atteints.",
            indice: "Compare les valeurs du tableau de variations.",
            corrige: "Le maximum de $f$ sur $[-2\\,;4]$ est $7$, atteint en $x = -1$. Le minimum est $-25$, atteint en $x = 3$ (il est plus petit que $f(4) = -18$)."
          },
          {
            n: "5.", points: 1,
            texte: "Détermine l'équation réduite de la tangente à la courbe de $f$ au point d'abscisse $0$.",
            indice: "$y = f'(0)(x - 0) + f(0)$.",
            corrige: "$f(0) = 2$ et $f'(0) = -9$ : la tangente a pour équation $y = -9x + 2$."
          }
        ]
      },
      {
        titre: "Le prix d'un collier",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Une artisane vend des colliers en coquillages. Si elle fixe le prix d'un collier à $p$ euros, avec $5 \\leqslant p \\leqslant 20$, elle en vend $200 - 10p$ par mois. On note $R(p)$ sa recette mensuelle, en euros.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Combien de colliers vend-elle au prix de $8$ € ? Au prix de $15$ € ? Calcule la recette dans chaque cas.",
            indice: "Recette : prix d'un collier $\\times$ nombre de colliers vendus.",
            corrige: "À $8$ € : $200 - 80 = 120$ colliers, soit une recette de $8 \\times 120 = 960$ €. À $15$ € : $200 - 150 = 50$ colliers, soit $15 \\times 50 = 750$ €."
          },
          {
            n: "2.", points: 1.5,
            texte: "Montre que $R(p) = 200p - 10p^2$, puis calcule $R'(p)$.",
            indice: "Développe $p(200 - 10p)$.",
            corrige: "$R(p) = p(200 - 10p) = 200p - 10p^2$, donc $R'(p) = 200 - 20p$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Étudie le signe de $R'(p)$ sur $[5\\,;20]$, puis dresse le tableau de variations de $R$.",
            indice: "$200 - 20p > 0 \\iff p < 10$.",
            corrige: "$R'(p) > 0$ pour $p < 10$, $R'(p) = 0$ pour $p = 10$ et $R'(p) < 0$ pour $p > 10$. $R(5) = 750$, $R(10) = 1\\,000$ et $R(20) = 0$.",
            tableauCorrige: { lignes: [["p", "5", "", "10", "", "20"], ["R'(p)", "", "+", "0", "-", ""], ["R(p)", "750", "\\nearrow", "1\\,000", "\\searrow", "0"]] }
          },
          {
            n: "4.", points: 1.5,
            texte: "Quel prix l'artisane doit-elle choisir pour avoir la plus grande recette ? Combien de colliers vend-elle alors, et pour quelle recette ?",
            indice: "Lis le maximum dans le tableau de variations.",
            corrige: "La recette est maximale pour un prix de $10$ € : l'artisane vend alors $200 - 100 = 100$ colliers, pour une recette de $1\\,000$ € par mois."
          },
          {
            n: "5.", points: 1,
            texte: "Chaque collier lui coûte $4$ € à fabriquer : son bénéfice est $B(p) = (p - 4)(200 - 10p)$. Compare $B(10)$ et $B(12)$. Le prix qui donne la plus grande recette donne-t-il aussi le plus grand bénéfice ?",
            indice: "Calcule $(10 - 4) \\times 100$, puis $(12 - 4) \\times 80$.",
            corrige: "$B(10) = 6 \\times 100 = 600$ € et $B(12) = 8 \\times 80 = 640$ € : à $12$ €, elle vend moins de colliers mais gagne plus. Le prix de la plus grande recette ne donne donc pas le plus grand bénéfice."
          }
        ]
      },
      {
        titre: "Dériver et conclure",
        duree: 25, points: 6, calculatrice: false,
        contexte: "Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Dérive $g(x) = 4x^3 - 5x^2 + 2x - 7$, puis calcule $g'(1)$.",
            indice: "$(4x^3)' = 4 \\times 3x^2$ ; la dérivée d'une constante est nulle.",
            corrige: "$g'(x) = 12x^2 - 10x + 2$, et $g'(1) = 12 - 10 + 2 = 4$."
          },
          {
            n: "2.", points: 1.5,
            texte: "On pose $k(x) = -x^2 + 6x - 4$ sur $\\mathbb{R}$. Étudie le signe de $k'(x)$, déduis-en les variations de $k$ et son maximum.",
            indice: "$k'(x) = -2x + 6$ s'annule en $3$.",
            corrige: "$k'(x) = -2x + 6$ : il est positif pour $x < 3$ et négatif pour $x > 3$. $k$ est croissante sur $]-\\infty\\,;3]$ et décroissante sur $[3\\,;+\\infty[$ ; son maximum est $k(3) = -9 + 18 - 4 = 5$."
          },
          {
            n: "3.", points: 1.5,
            texte: "On pose $m(x) = x^3 - 6x^2 + 12x - 7$. Calcule $m'(x)$, vérifie que $m'(x) = 3(x - 2)^2$, puis déduis-en le sens de variation de $m$.",
            indice: "$(x - 2)^2 = x^2 - 4x + 4$. Un carré est toujours positif ou nul.",
            corrige: "$m'(x) = 3x^2 - 12x + 12 = 3(x^2 - 4x + 4) = 3(x - 2)^2$. Un carré est positif ou nul : $m'(x) \\geqslant 0$ pour tout $x$, et il ne s'annule qu'en $2$. La fonction $m$ est croissante sur $\\mathbb{R}$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Vrai ou faux : « Comme $m'(2) = 0$, la fonction $m$ admet un extremum en $2$. » Justifie.",
            indice: "La dérivée change-t-elle de signe en $2$ ? Calcule $m(1)$, $m(2)$ et $m(3)$.",
            corrige: "**Faux.** $m'$ s'annule en $2$ sans changer de signe : $m$ est croissante, avant comme après $2$. D'ailleurs $m(1) = 0$, $m(2) = 1$ et $m(3) = 2$ : $m(2)$ n'est ni un maximum ni un minimum."
          }
        ]
      }
    ]
  }
};
