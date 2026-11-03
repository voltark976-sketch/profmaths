/*
  ENTRAÎNEMENT : Première tronc commun — chapitre 2, Automatismes : calcul algébrique et signes
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre tronc-calcul.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
  Expressions différentes de celles du cours et de l'entraînement de Première techno (chapitre 4).
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["tronc-calcul"] = {
  revisions: {
    intro: "Le calcul algébrique en un coup d'œil : développer, identités remarquables, factoriser, produit nul, signe d'une expression et tableau de signes. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Développer",
        texte: "$k(a + b) = ka + kb$ et $(a + b)(c + d) = ac + ad + bc + bd$. Un signe $-$ devant une parenthèse change **tous** les signes : $-(x - 3) = -x + 3$."
      },
      {
        titre: "Identités remarquables",
        texte:
          "- $(a + b)^2 = a^2 + 2ab + b^2$ ;\n" +
          "- $(a - b)^2 = a^2 - 2ab + b^2$ ;\n" +
          "- $(a + b)(a - b) = a^2 - b^2$."
      },
      {
        titre: "Factoriser",
        texte: "On repère un facteur commun, $ab + ac = a(b + c)$, ou une identité remarquable : $x^2 - 16 = (x - 4)(x + 4)$."
      },
      {
        titre: "Produit nul",
        texte: "$A \\times B = 0 \\iff A = 0$ ou $B = 0$. On met d'abord tous les termes du même côté du signe $=$, puis on factorise."
      },
      {
        titre: "Signe de $ax + b$",
        texte: "$ax + b$ s'annule en $-\\dfrac{b}{a}$ : il a le signe de $a$ après cette valeur, et le signe contraire avant. Par exemple $-3x + 6$ est positif pour $x < 2$."
      },
      {
        titre: "Tableau de signes",
        texte: "Une ligne par facteur, puis la règle des signes dans chaque colonne. Pour $a(x - x_1)(x - x_2)$, le produit a le signe de $a$ à l'extérieur des racines."
      }
    ],
    pieges: [
      "Oublier de distribuer à tous les termes : $3(x + 2) \\neq 3x + 2$.",
      "Oublier le double produit : $(x + 3)^2 \\neq x^2 + 9$.",
      "Ne changer qu'un signe après un $-$ devant une parenthèse.",
      "Diviser par $x$ dans $x^2 = 5x$ et perdre la solution $0$.",
      "Appliquer le produit nul à un produit qui n'est pas égal à $0$ : $(x - 1)(x + 2) = 4$ ne se résout pas ainsi.",
      "Oublier le signe de $a$ : $-2x + 4$ est positif **avant** $2$."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Développer et factoriser",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Développe et réduis $A = (x + 4)(2x - 3) - x(x - 1)$ et $B = (3x - 1)^2$.",
            indice: "Développe chaque produit séparément ; attention au signe $-$ devant $x(x - 1)$.",
            corrige: "$(x + 4)(2x - 3) = 2x^2 - 3x + 8x - 12 = 2x^2 + 5x - 12$, donc $A = 2x^2 + 5x - 12 - x^2 + x = x^2 + 6x - 12$.\n\n$B = (3x)^2 - 2 \\times 3x \\times 1 + 1 = 9x^2 - 6x + 1$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Factorise $C = 9x^2 - 25$ et $D = x^2 + 10x + 25$.",
            indice: "$9x^2 = (3x)^2$ et $25 = 5^2$. Pour $D$, pense à $(a + b)^2$.",
            corrige: "$C = (3x)^2 - 5^2 = (3x - 5)(3x + 5)$.\n\n$D = x^2 + 2 \\times x \\times 5 + 5^2 = (x + 5)^2$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Factorise $E = (x - 2)(x + 3) + 4(x - 2)$.",
            indice: "$(x - 2)$ est un facteur commun aux deux termes.",
            corrige: "$E = (x - 2)\\big[(x + 3) + 4\\big] = (x - 2)(x + 7)$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Résous l'équation $E = 0$, puis l'équation $E = 4(x - 2)$.",
            indice: "Pour la première, utilise la forme factorisée. Pour la seconde, simplifie d'abord : que reste-t-il de $E$ ?",
            corrige: "$(x - 2)(x + 7) = 0 \\iff x = 2$ ou $x = -7$ : $S = \\{-7\\,;2\\}$.\n\n$E = 4(x - 2) \\iff (x - 2)(x + 3) = 0 \\iff x = 2$ ou $x = -3$ : $S = \\{-3\\,;2\\}$."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « $-(x - 3) = -x - 3$ ». Justifie.",
            indice: "Un signe $-$ devant une parenthèse change tous les signes.",
            corrige: "**Faux.** $-(x - 3) = -x + 3$. Par exemple, pour $x = 0$ : $-(0 - 3) = 3$, alors que $-0 - 3 = -3$."
          }
        ]
      },
      {
        titre: "Signes et inéquations",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Les questions 1 à 3 portent sur l'expression $P(x) = (4 - 2x)(x + 1)$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Étudie le signe de $4 - 2x$ selon les valeurs de $x$.",
            indice: "$4 - 2x$ s'annule en $2$ ; le coefficient de $x$ est négatif.",
            corrige: "$4 - 2x > 0 \\iff 4 > 2x \\iff x < 2$ : $4 - 2x$ est positif avant $2$, nul en $2$ et négatif après."
          },
          {
            n: "2.", points: 1.5,
            texte: "Dresse le tableau de signes de $P(x)$.",
            indice: "Une ligne pour $4 - 2x$, une pour $x + 1$, puis la règle des signes.",
            corrige: "$x + 1$ s'annule en $-1$ et il est positif après. D'où le tableau :",
            tableauCorrige: { lignes: [["x", "-\\infty", "", "-1", "", "2", "", "+\\infty"], ["4 - 2x", "", "+", "", "+", "0", "-", ""], ["x + 1", "", "-", "0", "+", "", "+", ""], ["P(x)", "", "-", "0", "+", "0", "-", ""]] }
          },
          {
            n: "3.", points: 1.5,
            texte: "Résous l'inéquation $P(x) \\geqslant 0$.",
            indice: "Lis la dernière ligne du tableau ; les racines sont incluses avec $\\geqslant$.",
            corrige: "$P(x) \\geqslant 0 \\iff x \\in [-1\\,;2]$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Résous l'équation $(x + 1)(x - 3) = 5$. On pourra vérifier que $x^2 - 2x - 8 = (x - 4)(x + 2)$.",
            indice: "Ce n'est pas un produit nul : développe, puis mets tout du même côté.",
            corrige: "$(x + 1)(x - 3) = 5 \\iff x^2 - 2x - 3 = 5 \\iff x^2 - 2x - 8 = 0 \\iff (x - 4)(x + 2) = 0$. Donc $x = 4$ ou $x = -2$.\n\nOn vérifie : $(4 + 1)(4 - 3) = 5$ et $(-2 + 1)(-2 - 3) = 5$."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « Si $x < 3$, alors $x^2 < 9$. » Justifie.",
            indice: "Essaie un nombre négatif.",
            corrige: "**Faux.** Pour $x = -4$ : $-4 < 3$, mais $(-4)^2 = 16$ et $16 > 9$."
          }
        ]
      },
      {
        titre: "Les allées d'un jardin",
        duree: 25, points: 6, calculatrice: false,
        contexte: "Un jardin rectangulaire mesure $12$ m sur $8$ m. On y trace deux allées perpendiculaires de même largeur $x$, en mètres, parallèles aux côtés, avec $0 \\leqslant x \\leqslant 8$. Le reste du jardin est planté : en rapprochant les quatre parties plantées, on obtient un rectangle de $12 - x$ m sur $8 - x$ m.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Exprime l'aire plantée $A(x)$, puis développe-la.",
            indice: "Aire d'un rectangle : longueur $\\times$ largeur.",
            corrige: "$A(x) = (12 - x)(8 - x) = 96 - 12x - 8x + x^2 = x^2 - 20x + 96$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule l'aire plantée pour des allées de $1$ m, puis de $2$ m de large.",
            indice: "Utilise la forme $(12 - x)(8 - x)$, plus rapide.",
            corrige: "$A(1) = 11 \\times 7 = 77$ m² et $A(2) = 10 \\times 6 = 60$ m²."
          },
          {
            n: "3.", points: 1.5,
            texte: "On veut une aire plantée d'au moins $60$ m². Montre que cela revient à $x^2 - 20x + 36 \\geqslant 0$, puis vérifie que $x^2 - 20x + 36 = (x - 2)(x - 18)$.",
            indice: "Retire $60$ des deux membres de $A(x) \\geqslant 60$.",
            corrige: "$A(x) \\geqslant 60 \\iff x^2 - 20x + 96 - 60 \\geqslant 0 \\iff x^2 - 20x + 36 \\geqslant 0$.\n\nEt $(x - 2)(x - 18) = x^2 - 18x - 2x + 36 = x^2 - 20x + 36$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Étudie le signe de $(x - 2)(x - 18)$ sur $[0\\,;8]$ et conclus : quelle largeur peut-on donner aux allées ?",
            indice: "Sur $[0\\,;8]$, $x - 18$ est toujours négatif.",
            corrige: "Sur $[0\\,;8]$, $x - 18 < 0$ : le produit a le signe contraire de $x - 2$. Il est positif ou nul pour $x \\leqslant 2$ et négatif pour $x > 2$.\n\nLes allées doivent avoir une largeur d'au plus $2$ m."
          }
        ]
      }
    ]
  }
};
