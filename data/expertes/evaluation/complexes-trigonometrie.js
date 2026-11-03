/*
  ENTRAÎNEMENT : Terminale maths expertes — chapitre 3, Nombres complexes et trigonométrie
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre expertes-complexes-trigonometrie.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths expertes.
  Le cours linéarise cos³ : ici, angle triple par la formule de Moivre et linéarisation de sin⁴ par la formule d'Euler.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["expertes-complexes-trigonometrie"] = {
  revisions: {
    intro: "Les complexes au service de la trigonométrie en un coup d'œil : formules d'addition et de duplication, notation $e^{i\\theta}$, forme exponentielle, formules de Moivre et d'Euler. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Formules d'addition",
        texte:
          "Pour tous réels $a$ et $b$ :\n" +
          "- $\\cos(a + b) = \\cos a\\cos b - \\sin a\\sin b$ ;\n" +
          "- $\\sin(a + b) = \\sin a\\cos b + \\cos a\\sin b$ ;\n" +
          "- avec $a - b$, les signes du milieu changent."
      },
      {
        titre: "Duplication",
        texte: "$\\sin(2a) = 2\\sin a\\cos a$ et $\\cos(2a) = \\cos^2 a - \\sin^2 a = 2\\cos^2 a - 1 = 1 - 2\\sin^2 a$."
      },
      {
        titre: "Notation $e^{i\\theta}$",
        texte: "$e^{i\\theta} = \\cos\\theta + i\\sin\\theta$ : le nombre de module $1$ et d'argument $\\theta$. Par exemple, $e^{i\\pi} = -1$ et $e^{i\\frac{\\pi}{2}} = i$. On a $e^{i\\theta} \\times e^{i\\theta'} = e^{i(\\theta + \\theta')}$ et $\\overline{e^{i\\theta}} = e^{-i\\theta}$."
      },
      {
        titre: "Forme exponentielle",
        texte: "$z = re^{i\\theta}$ avec $r = |z| > 0$. Pour un produit, on multiplie les modules et on additionne les arguments : $2e^{i\\frac{\\pi}{5}} \\times 3e^{i\\frac{3\\pi}{10}} = 6e^{i\\frac{\\pi}{2}} = 6i$. Pour un quotient, on divise les modules et on soustrait les arguments."
      },
      {
        titre: "Formule de Moivre",
        texte: "Pour tout entier naturel $n$ : $(\\cos\\theta + i\\sin\\theta)^n = \\cos(n\\theta) + i\\sin(n\\theta)$, c'est-à-dire $\\left(e^{i\\theta}\\right)^n = e^{in\\theta}$, et $\\left(re^{i\\theta}\\right)^n = r^ne^{in\\theta}$."
      },
      {
        titre: "Formules d'Euler",
        texte: "$\\cos\\theta = \\dfrac{e^{i\\theta} + e^{-i\\theta}}{2}$ et $\\sin\\theta = \\dfrac{e^{i\\theta} - e^{-i\\theta}}{2i}$. Elles servent à **linéariser** : écrire $\\cos^n$ ou $\\sin^n$ comme une somme de $\\cos(kx)$ et de $\\sin(kx)$, par exemple $\\cos^2 x = \\dfrac{1 + \\cos(2x)}{2}$."
      }
    ],
    pieges: [
      "Écrire $\\cos(a + b) = \\cos a + \\cos b$, ou se tromper de signe : $\\cos(a + b) = \\cos a\\cos b$ **moins** $\\sin a\\sin b$.",
      "Écrire $\\sin(2x) = 2\\sin x$ : c'est $2\\sin x\\cos x$.",
      "Additionner les modules d'un produit : ils se multiplient, ce sont les arguments qui s'additionnent.",
      "Écrire $-2e^{i\\theta}$ comme forme exponentielle : le module doit être positif, $-2e^{i\\theta} = 2e^{i(\\theta + \\pi)}$.",
      "Oublier le $i$ au dénominateur de la formule d'Euler du sinus.",
      "Laisser un argument comme $\\dfrac{9\\pi}{4}$ sans le ramener à $\\dfrac{\\pi}{4}$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Des valeurs exactes grâce aux complexes",
        duree: 25, points: 7, calculatrice: false,
        contexte: "On considère les nombres complexes $z_1 = 1 + i$ et $z_2 = \\sqrt{3} + i$, et leur produit $Z = z_1z_2$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Écris $z_1$ et $z_2$ sous forme exponentielle.",
            indice: "Calcule le module, puis cherche un angle dont le cosinus et le sinus conviennent.",
            corrige: "$|z_1| = \\sqrt{2}$, avec $\\cos\\theta_1 = \\sin\\theta_1 = \\dfrac{\\sqrt{2}}{2}$ : $z_1 = \\sqrt{2}\\,e^{i\\frac{\\pi}{4}}$.\n\n$|z_2| = \\sqrt{3 + 1} = 2$, avec $\\cos\\theta_2 = \\dfrac{\\sqrt{3}}{2}$ et $\\sin\\theta_2 = \\dfrac{1}{2}$ : $z_2 = 2e^{i\\frac{\\pi}{6}}$."
          },
          {
            n: "2.", points: 1,
            texte: "Déduis-en la forme exponentielle de $Z$.",
            indice: "On multiplie les modules et on additionne les arguments.",
            corrige: "$Z = \\sqrt{2} \\times 2\\,e^{i\\left(\\frac{\\pi}{4} + \\frac{\\pi}{6}\\right)} = 2\\sqrt{2}\\,e^{i\\frac{5\\pi}{12}}$, car $\\dfrac{\\pi}{4} + \\dfrac{\\pi}{6} = \\dfrac{3\\pi + 2\\pi}{12} = \\dfrac{5\\pi}{12}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Écris $Z$ sous forme algébrique.",
            indice: "Développe $(1 + i)(\\sqrt{3} + i)$ et remplace $i^2$ par $-1$.",
            corrige: "$Z = (1 + i)(\\sqrt{3} + i) = \\sqrt{3} + i + i\\sqrt{3} + i^2 = (\\sqrt{3} - 1) + i(\\sqrt{3} + 1)$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Déduis-en les valeurs exactes de $\\cos\\dfrac{5\\pi}{12}$ et de $\\sin\\dfrac{5\\pi}{12}$.",
            indice: "$Z = 2\\sqrt{2}\\left(\\cos\\dfrac{5\\pi}{12} + i\\sin\\dfrac{5\\pi}{12}\\right)$ : identifie avec la forme algébrique.",
            corrige: "En identifiant les parties réelles et imaginaires : $2\\sqrt{2}\\cos\\dfrac{5\\pi}{12} = \\sqrt{3} - 1$ et $2\\sqrt{2}\\sin\\dfrac{5\\pi}{12} = \\sqrt{3} + 1$.\n\nDonc $\\cos\\dfrac{5\\pi}{12} = \\dfrac{\\sqrt{3} - 1}{2\\sqrt{2}} = \\dfrac{\\sqrt{6} - \\sqrt{2}}{4}$ et $\\sin\\dfrac{5\\pi}{12} = \\dfrac{\\sqrt{6} + \\sqrt{2}}{4}$ (on multiplie en haut et en bas par $\\sqrt{2}$)."
          },
          {
            n: "5.", points: 1.5,
            texte: "Retrouve $\\cos\\dfrac{5\\pi}{12}$ avec une formule d'addition, puis vérifie que $2\\cos^2\\dfrac{5\\pi}{12} - 1 = \\cos\\dfrac{5\\pi}{6}$.",
            indice: "$\\dfrac{5\\pi}{12} = \\dfrac{\\pi}{4} + \\dfrac{\\pi}{6}$. Pour le carré, $(\\sqrt{6} - \\sqrt{2})^2 = 8 - 2\\sqrt{12}$.",
            corrige: "$\\cos\\left(\\dfrac{\\pi}{4} + \\dfrac{\\pi}{6}\\right) = \\cos\\dfrac{\\pi}{4}\\cos\\dfrac{\\pi}{6} - \\sin\\dfrac{\\pi}{4}\\sin\\dfrac{\\pi}{6} = \\dfrac{\\sqrt{2}}{2} \\times \\dfrac{\\sqrt{3}}{2} - \\dfrac{\\sqrt{2}}{2} \\times \\dfrac{1}{2} = \\dfrac{\\sqrt{6} - \\sqrt{2}}{4}$.\n\n$\\cos^2\\dfrac{5\\pi}{12} = \\dfrac{8 - 4\\sqrt{3}}{16} = \\dfrac{2 - \\sqrt{3}}{4}$, donc $2\\cos^2\\dfrac{5\\pi}{12} - 1 = \\dfrac{2 - \\sqrt{3}}{2} - 1 = -\\dfrac{\\sqrt{3}}{2} = \\cos\\dfrac{5\\pi}{6}$ : c'est la formule de duplication $\\cos(2a) = 2\\cos^2 a - 1$ avec $a = \\dfrac{5\\pi}{12}$."
          }
        ]
      },
      {
        titre: "Moivre et l'angle triple",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Dans cet exercice, $\\theta$ désigne un nombre réel quelconque.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Avec la formule du binôme, développe $(\\cos\\theta + i\\sin\\theta)^3$.",
            indice: "$(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$, avec $b = i\\sin\\theta$ : attention à $i^2 = -1$ et $i^3 = -i$.",
            corrige: "$(\\cos\\theta + i\\sin\\theta)^3$ $= \\cos^3\\theta + 3i\\cos^2\\theta\\sin\\theta$ ${} + 3i^2\\cos\\theta\\sin^2\\theta + i^3\\sin^3\\theta$\n\n$= \\cos^3\\theta - 3\\cos\\theta\\sin^2\\theta$ ${} + i\\left(3\\cos^2\\theta\\sin\\theta - \\sin^3\\theta\\right)$."
          },
          {
            n: "2.", points: 2,
            texte: "Avec la formule de Moivre, déduis-en que $\\cos(3\\theta) = 4\\cos^3\\theta - 3\\cos\\theta$ et que $\\sin(3\\theta) = 3\\sin\\theta - 4\\sin^3\\theta$.",
            indice: "Moivre : $(\\cos\\theta + i\\sin\\theta)^3 = \\cos(3\\theta) + i\\sin(3\\theta)$. Identifie, puis remplace $\\sin^2\\theta$ par $1 - \\cos^2\\theta$ (et $\\cos^2\\theta$ par $1 - \\sin^2\\theta$).",
            corrige:
              "D'après la formule de Moivre, $(\\cos\\theta + i\\sin\\theta)^3 = \\cos(3\\theta) + i\\sin(3\\theta)$. En identifiant avec la question 1, puis avec $\\cos^2\\theta + \\sin^2\\theta = 1$ :\n\n" +
              "$\\cos(3\\theta) = \\cos^3\\theta - 3\\cos\\theta(1 - \\cos^2\\theta) = 4\\cos^3\\theta - 3\\cos\\theta$ ;\n\n" +
              "$\\sin(3\\theta) = 3(1 - \\sin^2\\theta)\\sin\\theta - \\sin^3\\theta = 3\\sin\\theta - 4\\sin^3\\theta$."
          },
          {
            n: "3.", points: 1,
            texte: "Vérifie ces deux formules pour $\\theta = \\dfrac{\\pi}{6}$.",
            indice: "$3\\theta = \\dfrac{\\pi}{2}$, $\\cos\\dfrac{\\pi}{6} = \\dfrac{\\sqrt{3}}{2}$ et $\\sin\\dfrac{\\pi}{6} = \\dfrac{1}{2}$.",
            corrige: "$\\cos\\dfrac{\\pi}{2} = 0$ et $4\\left(\\dfrac{\\sqrt{3}}{2}\\right)^3 - 3 \\times \\dfrac{\\sqrt{3}}{2} = \\dfrac{3\\sqrt{3}}{2} - \\dfrac{3\\sqrt{3}}{2} = 0$.\n\n$\\sin\\dfrac{\\pi}{2} = 1$ et $3 \\times \\dfrac{1}{2} - 4\\left(\\dfrac{1}{2}\\right)^3 = \\dfrac{3}{2} - \\dfrac{1}{2} = 1$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Montre que $c = \\cos\\dfrac{\\pi}{9}$ est solution de l'équation $8x^3 - 6x - 1 = 0$.",
            indice: "Applique la formule de $\\cos(3\\theta)$ avec $\\theta = \\dfrac{\\pi}{9}$.",
            corrige: "Avec $\\theta = \\dfrac{\\pi}{9}$ : $\\cos\\dfrac{\\pi}{3} = 4c^3 - 3c$, soit $4c^3 - 3c = \\dfrac{1}{2}$. En multipliant par $2$ : $8c^3 - 6c = 1$, donc $8c^3 - 6c - 1 = 0$."
          },
          {
            n: "5.", points: 1,
            texte: "De même, montre que $s = \\sin\\dfrac{\\pi}{18}$ est solution de l'équation $8x^3 - 6x + 1 = 0$.",
            indice: "Applique la formule de $\\sin(3\\theta)$ avec $\\theta = \\dfrac{\\pi}{18}$.",
            corrige: "Avec $\\theta = \\dfrac{\\pi}{18}$ : $\\sin\\dfrac{\\pi}{6} = 3s - 4s^3$, soit $3s - 4s^3 = \\dfrac{1}{2}$. En multipliant par $2$ : $6s - 8s^3 = 1$, donc $8s^3 - 6s + 1 = 0$."
          }
        ]
      },
      {
        titre: "Linéariser pour intégrer",
        duree: 20, points: 6, calculatrice: false,
        contexte: "On veut calculer l'intégrale $I = \\displaystyle\\int_0^{\\frac{\\pi}{2}} \\sin^4 x\\,dx$.",
        questions: [
          {
            n: "1.", points: 2,
            texte: "Avec la formule d'Euler du sinus, montre que, pour tout réel $x$, $\\sin^4 x = \\dfrac{\\cos(4x) - 4\\cos(2x) + 3}{8}$.",
            indice: "$\\sin x = \\dfrac{e^{ix} - e^{-ix}}{2i}$ et $(2i)^4 = 16$. Développe $(a - b)^4$ avec les coefficients $1$, $4$, $6$, $4$, $1$, puis regroupe $e^{ikx} + e^{-ikx} = 2\\cos(kx)$.",
            corrige: "$\\sin^4 x = \\dfrac{\\left(e^{ix} - e^{-ix}\\right)^4}{(2i)^4}$, et comme $e^{ix} \\times e^{-ix} = 1$, le numérateur vaut $e^{4ix} - 4e^{2ix} + 6 - 4e^{-2ix} + e^{-4ix}$.\n\nEn regroupant : $\\sin^4 x = \\dfrac{2\\cos(4x) - 8\\cos(2x) + 6}{16} = \\dfrac{\\cos(4x) - 4\\cos(2x) + 3}{8}$."
          },
          {
            n: "2.", points: 1,
            texte: "Vérifie cette égalité pour $x = \\dfrac{\\pi}{4}$.",
            indice: "$\\sin\\dfrac{\\pi}{4} = \\dfrac{\\sqrt{2}}{2}$, $\\cos\\pi = -1$ et $\\cos\\dfrac{\\pi}{2} = 0$.",
            corrige: "$\\sin^4\\dfrac{\\pi}{4} = \\left(\\dfrac{\\sqrt{2}}{2}\\right)^4 = \\dfrac{4}{16} = \\dfrac{1}{4}$, et $\\dfrac{\\cos\\pi - 4\\cos\\frac{\\pi}{2} + 3}{8} = \\dfrac{-1 - 0 + 3}{8} = \\dfrac{1}{4}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Déduis-en une primitive de la fonction $x \\mapsto \\sin^4 x$ sur $\\mathbb{R}$.",
            indice: "Une primitive de $x \\mapsto \\cos(kx)$ est $x \\mapsto \\dfrac{\\sin(kx)}{k}$.",
            corrige: "$\\sin^4 x = \\dfrac{1}{8}\\cos(4x) - \\dfrac{1}{2}\\cos(2x) + \\dfrac{3}{8}$. Une primitive de $\\cos(4x)$ est $\\dfrac{\\sin(4x)}{4}$ et une primitive de $\\cos(2x)$ est $\\dfrac{\\sin(2x)}{2}$, donc une primitive de $x \\mapsto \\sin^4 x$ est $F(x) = \\dfrac{\\sin(4x)}{32} - \\dfrac{\\sin(2x)}{4} + \\dfrac{3x}{8}$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Calcule $I$.",
            indice: "$I = F\\left(\\dfrac{\\pi}{2}\\right) - F(0)$, avec $\\sin(2\\pi) = \\sin\\pi = 0$.",
            corrige: "$I = F\\left(\\dfrac{\\pi}{2}\\right) - F(0) = \\dfrac{\\sin(2\\pi)}{32} - \\dfrac{\\sin\\pi}{4} + \\dfrac{3\\pi}{16} - 0 = \\dfrac{3\\pi}{16}$."
          }
        ]
      }
    ]
  }
};
