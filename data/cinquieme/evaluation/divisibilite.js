/*
  ENTRAÎNEMENT : 5e — chapitre 6, Divisibilité
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre cinquieme-divisibilite.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 5e, sans calculatrice.
  Nombres différents de ceux du cours, de la méthode, du QCM et de l'entraînement de 4e.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["cinquieme-divisibilite"] = {
  revisions: {
    intro: "La divisibilité en un coup d'œil : division euclidienne, division par un décimal, multiples, diviseurs et critères. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Division euclidienne",
        texte: "Diviser $a$ par $b$, c'est écrire $a = b \\times q + r$ avec un reste $r$ plus petit que $b$ : $73 = 8 \\times 9 + 1$."
      },
      {
        titre: "Diviser par un décimal",
        texte: "On multiplie le dividende et le diviseur par $10$, $100$… pour diviser par un entier : $2{,}4 \\div 0{,}3 = 24 \\div 3 = 8$."
      },
      {
        titre: "Multiples et diviseurs",
        texte: "$a$ est un multiple de $b$, et $b$ un diviseur de $a$, quand le reste de la division de $a$ par $b$ est nul : $35 = 5 \\times 7$."
      },
      {
        titre: "Critères de divisibilité",
        texte:
          "- par $2$ : chiffre des unités pair ; par $5$ : $0$ ou $5$ ; par $10$ : $0$ ;\n" +
          "- par $3$ : la somme des chiffres est divisible par $3$ ;\n" +
          "- par $9$ : la somme des chiffres est divisible par $9$."
      },
      {
        titre: "Multiples communs",
        texte: "Pour trouver quand deux évènements réguliers se reproduisent ensemble, on cherche le plus petit multiple commun de leurs durées : $4$ et $10$ ont $20$ pour premier multiple commun."
      }
    ],
    pieges: [
      "Donner un reste plus grand que le diviseur.",
      "Oublier que, dans un problème, il faut parfois prendre un groupe de plus pour ceux qui restent.",
      "Ne multiplier que le diviseur par $10$ quand on divise par un décimal.",
      "Croire qu'un nombre divisible par $3$ l'est aussi par $9$ : $12$ ne l'est pas.",
      "Oublier les diviseurs $1$ et le nombre lui-même."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Des divisions",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Écris les calculs.",
        questions: [
          { n: "1.", points: 2, texte: "Effectue la division euclidienne de $247$ par $12$ et écris l'égalité correspondante.", corrige: "$12 \\times 20 = 240$ et $247 - 240 = 7$ : $247 = 12 \\times 20 + 7$, avec $7 < 12$." },
          { n: "2.", points: 2, texte: "Pour une sortie, $214$ personnes prennent des cars de $52$ places. Combien faut-il de cars ? Combien restera-t-il de places libres ?", indice: "Fais la division euclidienne de $214$ par $52$.", corrige: "$214 = 52 \\times 4 + 6$ : $4$ cars ne suffisent pas, il en faut $5$ pour les $6$ personnes restantes. Places libres : $5 \\times 52 - 214 = 260 - 214 = 46$." },
          { n: "3.", points: 1.5, texte: "Calcule $8{,}4 \\div 0{,}7$ et $0{,}36 \\div 0{,}09$.", corrige: "$8{,}4 \\div 0{,}7 = 84 \\div 7 = 12$ et $0{,}36 \\div 0{,}09 = 36 \\div 9 = 4$." },
          { n: "4.", points: 1.5, texte: "On range $130$ mangues dans des cagettes de $16$. Combien de cagettes sont pleines, et combien de mangues restent ?", corrige: "$130 = 16 \\times 8 + 2$ : $8$ cagettes sont pleines et il reste $2$ mangues." }
        ]
      },
      {
        titre: "Les critères",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Justifie avec les critères de divisibilité.",
        questions: [
          {
            n: "1.", points: 3, texte: "Parmi les nombres $2\\,340$ ; $1\\,575$ ; $8\\,922$ et $6\\,015$, lesquels sont divisibles par $2$ ? par $3$ ? par $5$ ? par $9$ ? par $10$ ?",
            corrige: "Sommes des chiffres : $9$ ; $18$ ; $21$ ; $12$.",
            tableauCorrige: { lignes: [["", "2", "3", "5", "9", "10"], ["2\\,340", "\\text{oui}", "\\text{oui}", "\\text{oui}", "\\text{oui}", "\\text{oui}"], ["1\\,575", "\\text{non}", "\\text{oui}", "\\text{oui}", "\\text{oui}", "\\text{non}"], ["8\\,922", "\\text{oui}", "\\text{oui}", "\\text{non}", "\\text{non}", "\\text{non}"], ["6\\,015", "\\text{non}", "\\text{oui}", "\\text{oui}", "\\text{non}", "\\text{non}"]] }
          },
          { n: "2.", points: 2, texte: "Trouve tous les diviseurs de $42$.", corrige: "$42 = 1 \\times 42 = 2 \\times 21 = 3 \\times 14 = 6 \\times 7$ : les diviseurs sont $1$ ; $2$ ; $3$ ; $6$ ; $7$ ; $14$ ; $21$ et $42$." },
          { n: "3.", points: 2, texte: "Par quels chiffres peut-on remplacer le chiffre caché de $4\\,?\\,8$ pour que ce nombre soit divisible par $3$ ? Et par $9$ ?", indice: "La somme des chiffres vaut $12 + ?$.", corrige: "$12 + ?$ doit être un multiple de $3$ : $0$, $3$, $6$ ou $9$, ce qui donne $408$, $438$, $468$ et $498$.\n\nPour $9$, $12 + ?$ doit valoir $18$ : seul $468$ convient." }
        ]
      },
      {
        titre: "Les deux coureurs",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Sur une piste, Anli fait un tour en $6$ minutes et Fatima en $9$ minutes. Elles partent ensemble de la ligne de départ et courent à vitesse constante.",
        questions: [
          { n: "1.", points: 2, texte: "Au bout de combien de minutes repasseront-elles ensemble sur la ligne de départ pour la première fois ?", indice: "Écris les multiples de $6$ et ceux de $9$.", corrige: "Multiples de $6$ : $6$, $12$, $18$… ; multiples de $9$ : $9$, $18$… Elles repassent ensemble au bout de $18$ minutes." },
          { n: "2.", points: 2, texte: "Combien de tours chacune aura-t-elle faits à ce moment ?", corrige: "Anli : $18 \\div 6 = 3$ tours ; Fatima : $18 \\div 9 = 2$ tours." },
          { n: "3.", points: 2, texte: "Elles courent pendant une heure. Combien de fois se retrouvent-elles ensemble sur la ligne, après le départ ?", corrige: "Aux multiples de $18$ inférieurs à $60$ : $18$, $36$ et $54$ minutes, soit $3$ fois." }
        ]
      }
    ]
  }
};
