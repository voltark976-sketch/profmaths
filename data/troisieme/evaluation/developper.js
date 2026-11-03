/*
  ENTRAÎNEMENT : 3e — chapitre 2, Développer
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre troisieme-developper.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type brevet.
  Seule identité exigible au cycle 4 : (a − b)(a + b) = a² − b² ; les carrés se développent par double distributivité.
  Programme de calcul et expressions différents de ceux du cours, de la méthode et du QCM du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["troisieme-developper"] = {
  revisions: {
    intro: "Développer en un coup d'œil : la simple et la double distributivité, l'égalité $(a - b)(a + b) = a^2 - b^2$, et le calcul littéral pour prouver. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Simple distributivité",
        texte: "$k(a + b) = ka + kb$ et $k(a - b) = ka - kb$. Un signe moins devant une parenthèse change tous les signes : $-(x - 4) = -x + 4$."
      },
      {
        titre: "Double distributivité",
        texte: "$(a + b)(c + d) = ac + ad + bc + bd$ : chaque terme de la première parenthèse multiplie chaque terme de la seconde, puis on **réduit**. Exemple : $(x + 2)(3x - 1) = 3x^2 - x + 6x - 2 = 3x^2 + 5x - 2$."
      },
      {
        titre: "$(a - b)(a + b) = a^2 - b^2$",
        texte: "Le produit de la différence et de la somme de deux nombres est la différence de leurs carrés : $(x - 5)(x + 5) = x^2 - 25$, et $98 \\times 102 = (100 - 2)(100 + 2) = 10\\,000 - 4$."
      },
      {
        titre: "Développer un carré",
        texte: "$(x + 3)^2 = (x + 3)(x + 3)$, puis double distributivité : $x^2 + 3x + 3x + 9 = x^2 + 6x + 9$."
      },
      {
        titre: "Prouver",
        texte: "Pour prouver qu'une égalité est vraie **pour tout nombre**, on développe et on réduit avec une lettre. Pour prouver qu'elle est **fausse**, un seul contre-exemple suffit."
      }
    ],
    pieges: [
      "Écrire $(x + 3)^2 = x^2 + 9$ : il manque $6x$.",
      "Oublier de changer les signes après un moins : $-(x - 4) = -x + 4$.",
      "Oublier un des quatre produits de la double distributivité.",
      "Écrire $2x \\times 3x = 6x$ : c'est $6x^2$.",
      "Croire qu'un exemple qui marche prouve une égalité pour tous les nombres."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme au brevet (environ $60$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Un programme de calcul",
        duree: 20, points: 7, calculatrice: true,
        contexte: "Voici un programme de calcul :\n\n- choisir un nombre ;\n- le multiplier par $2$, puis ajouter $5$ ;\n- multiplier le résultat par le nombre de départ ;\n- soustraire le double du carré du nombre de départ.",
        questions: [
          { n: "1.", points: 1, texte: "Montre qu'en choisissant $4$, on obtient $20$.", corrige: "$4 \\times 2 = 8$, puis $8 + 5 = 13$, puis $13 \\times 4 = 52$. Le double du carré de $4$ est $2 \\times 16 = 32$, et $52 - 32 = 20$." },
          { n: "2.", points: 1.5, texte: "Quel résultat obtient-on en choisissant $-3$ ?", indice: "Attention aux signes : le carré de $-3$ est $9$.", corrige: "$-3 \\times 2 = -6$, puis $-6 + 5 = -1$, puis $-1 \\times (-3) = 3$. Le double du carré de $-3$ est $2 \\times 9 = 18$, et $3 - 18 = -15$." },
          { n: "3.", points: 1, texte: "Quelle conjecture peux-tu faire sur le résultat ?", corrige: "$20 = 5 \\times 4$ et $-15 = 5 \\times (-3)$ : le résultat semble être toujours égal à $5$ fois le nombre de départ." },
          { n: "4.", points: 2, texte: "Prouve ta conjecture en notant $x$ le nombre de départ.", indice: "Le résultat s'écrit $(2x + 5) \\times x - 2x^2$ : développe et réduis.", corrige: "Le résultat est $(2x + 5) \\times x - 2x^2 = 2x^2 + 5x - 2x^2 = 5x$ : pour tout nombre de départ $x$, on obtient bien $5$ fois ce nombre." },
          { n: "5.", points: 1.5, texte: "Quel nombre faut-il choisir pour obtenir $37$ ?", corrige: "On cherche $x$ tel que $5x = 37$ : $x = \\dfrac{37}{5} = 7{,}4$." }
        ]
      },
      {
        titre: "Le rectangle découpé",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Un rectangle a pour dimensions $2x + 3$ et $x + 4$, en mètres, avec $x$ positif. On y découpe un carré de côté $x$. On note $A$ l'aire restante, en mètres carrés.",
        questions: [
          { n: "1.", points: 1.5, texte: "Calcule l'aire restante pour $x = 2$.", indice: "Pour $x = 2$, le rectangle mesure $7$ m sur $6$ m et le carré a pour côté $2$ m.", corrige: "Le rectangle mesure $7$ m sur $6$ m, donc son aire est $42$ m² ; le carré a une aire de $4$ m². L'aire restante est $42 - 4 = 38$ m²." },
          { n: "2.", points: 2, texte: "Développe et réduis $(2x + 3)(x + 4)$.", indice: "Double distributivité : $2x \\times x$, $2x \\times 4$, $3 \\times x$ et $3 \\times 4$.", corrige: "$(2x + 3)(x + 4) = 2x^2 + 8x + 3x + 12 = 2x^2 + 11x + 12$." },
          { n: "3.", points: 2, texte: "Montre que $A = x^2 + 11x + 12$.", corrige: "$A$ est l'aire du rectangle moins celle du carré : $A = 2x^2 + 11x + 12 - x^2 = x^2 + 11x + 12$." },
          { n: "4.", points: 1.5, texte: "Vérifie la formule avec $x = 2$, puis calcule l'aire restante pour $x = 10$.", corrige: "Pour $x = 2$ : $4 + 22 + 12 = 38$ m², comme à la question 1.\n\nPour $x = 10$ : $100 + 110 + 12 = 222$ m². Vérification : le rectangle mesure $23$ m sur $14$ m, soit $322$ m², et $322 - 100 = 222$." }
        ]
      },
      {
        titre: "Vrai ou faux ?",
        duree: 20, points: 6, calculatrice: false,
        contexte: "Pour chaque affirmation, dis si elle est vraie ou fausse, et justifie. Les questions sont indépendantes.",
        questions: [
          { n: "1.", points: 1.5, texte: "Pour tout nombre $x$, $(x - 2)^2 = x^2 - 4$.", indice: "Teste un nombre, par exemple $x = 1$, ou développe $(x - 2)(x - 2)$.", corrige: "**Faux.** Contre-exemple : pour $x = 1$, $(1 - 2)^2 = 1$ alors que $1^2 - 4 = -3$. En fait, $(x - 2)^2 = (x - 2)(x - 2) = x^2 - 4x + 4$." },
          { n: "2.", points: 1.5, texte: "Pour tout nombre $a$, $(a + 1)^2 - (a - 1)^2 = 4a$.", indice: "Développe chaque carré par double distributivité.", corrige: "**Vrai.** $(a + 1)^2 = a^2 + 2a + 1$ et $(a - 1)^2 = a^2 - 2a + 1$, donc :\n\n$(a + 1)^2 - (a - 1)^2 = a^2 + 2a + 1 - a^2 + 2a - 1 = 4a$" },
          { n: "3.", points: 1.5, texte: "Sans calculatrice, $98 \\times 102 = 9\\,996$.", indice: "$98 = 100 - 2$ et $102 = 100 + 2$.", corrige: "**Vrai.** $98 \\times 102 = (100 - 2)(100 + 2) = 100^2 - 2^2 = 10\\,000 - 4 = 9\\,996$." },
          { n: "4.", points: 1.5, texte: "Le carré d'un nombre est toujours plus grand que ce nombre.", corrige: "**Faux.** Contre-exemple : $0{,}5^2 = 0{,}25$, qui est plus petit que $0{,}5$. C'est aussi faux pour $1$, car $1^2 = 1$." }
        ]
      }
    ]
  }
};
