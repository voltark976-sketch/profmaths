/*
  ENTRAÎNEMENT : 4e — chapitre 7, Puissances
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre quatrieme-puissances.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle de 4e.
  Ordres de grandeur arrondis ; nombres différents de ceux du cours, de la méthode et du QCM du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["quatrieme-puissances"] = {
  revisions: {
    intro: "Les puissances en un coup d'œil : puissances d'un nombre, puissances de 10, notation scientifique et préfixes. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Puissance d'un nombre",
        texte: "$a^n = a \\times a \\times \\cdots \\times a$, avec $n$ facteurs : $2^5 = 32$. Par convention, $a^1 = a$ et $a^0 = 1$ (pour $a \\neq 0$)."
      },
      {
        titre: "Le signe",
        texte: "$(-3)^4 = 81$ : un exposant pair donne un résultat positif ; $(-3)^3 = -27$ : un exposant impair garde le signe. Mais $-3^4 = -81$ : le carré, ou la puissance, ne porte que sur $3$."
      },
      {
        titre: "Puissances de 10",
        texte: "$10^4 = 10\\,000$ (un $1$ suivi de $4$ zéros) et $10^{-3} = \\dfrac{1}{10^3} = 0{,}001$."
      },
      {
        titre: "Règles de calcul",
        texte:
          "- $10^a \\times 10^b = 10^{a + b}$ ;\n" +
          "- $\\dfrac{10^a}{10^b} = 10^{a - b}$ ;\n" +
          "- $(10^a)^b = 10^{a \\times b}$."
      },
      {
        titre: "Notation scientifique",
        texte: "$a \\times 10^n$, avec $1 \\leqslant a < 10$ : $47\\,000 = 4{,}7 \\times 10^4$ et $0{,}003\\,2 = 3{,}2 \\times 10^{-3}$."
      },
      {
        titre: "Préfixes",
        texte: "giga $= 10^9$, méga $= 10^6$, kilo $= 10^3$, milli $= 10^{-3}$, micro $= 10^{-6}$, nano $= 10^{-9}$."
      }
    ],
    pieges: [
      "Confondre $3^4 = 81$ et $3 \\times 4 = 12$.",
      "Oublier les parenthèses : $-3^2 = -9$, alors que $(-3)^2 = 9$.",
      "Multiplier les exposants au lieu de les additionner : $10^2 \\times 10^3 = 10^5$.",
      "Laisser $25 \\times 10^3$ : en notation scientifique, on écrit $2{,}5 \\times 10^4$.",
      "Croire que $10^{-3}$ est négatif : c'est $0{,}001$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $50$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Des calculs",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Calcule sans calculatrice, en détaillant.",
        questions: [
          { n: "1.", points: 2, texte: "Calcule $2^5$ ; $(-3)^4$ ; $-3^4$ et $5^0$.", corrige: "$2^5 = 32$ ; $(-3)^4 = 81$ ; $-3^4 = -81$ ; $5^0 = 1$." },
          { n: "2.", points: 2, texte: "Écris sous la forme d'une seule puissance de $10$ : $A = 10^4 \\times 10^{-7}$ ; $B = \\dfrac{10^{-3}}{10^2}$ ; $C = (10^{-2})^3$.", corrige: "$A = 10^{4 - 7} = 10^{-3}$ ; $B = 10^{-3 - 2} = 10^{-5}$ ; $C = 10^{-2 \\times 3} = 10^{-6}$." },
          { n: "3.", points: 1.5, texte: "Calcule $D = \\dfrac{10^5 \\times 10^{-2}}{10^{-1}}$ et donne le résultat sous la forme d'une puissance de $10$.", corrige: "$D = \\dfrac{10^3}{10^{-1}} = 10^{3 - (-1)} = 10^4$." },
          { n: "4.", points: 1.5, texte: "Range dans l'ordre croissant : $3{,}2 \\times 10^{-2}$ ; $5 \\times 10^{-3}$ ; $0{,}04$ ; $2 \\times 10^{-1}$.", indice: "Écris-les tous en écriture décimale.", corrige: "$3{,}2 \\times 10^{-2} = 0{,}032$ ; $5 \\times 10^{-3} = 0{,}005$ ; $2 \\times 10^{-1} = 0{,}2$. Donc :\n\n$5 \\times 10^{-3} < 3{,}2 \\times 10^{-2} < 0{,}04 < 2 \\times 10^{-1}$" }
        ]
      },
      {
        titre: "Le cœur et le sang",
        duree: 20, points: 7, calculatrice: true,
        contexte: "Le cœur d'un adulte au repos bat environ $70$ fois par minute. Le corps contient environ $5$ litres de sang, et $1$ mm³ de sang contient environ $5 \\times 10^6$ globules rouges (valeurs arrondies).",
        questions: [
          { n: "1.", points: 2, texte: "Combien de fois le cœur bat-il en une journée ? Donne le résultat en notation scientifique.", corrige: "$70 \\times 60 \\times 24 = 100\\,800$ battements, soit $1{,}008 \\times 10^5$." },
          { n: "2.", points: 1.5, texte: "Et en une année de $365$ jours ? Arrondis au dixième en notation scientifique.", corrige: "$100\\,800 \\times 365 = 36\\,792\\,000 \\approx 3{,}7 \\times 10^7$ battements." },
          { n: "3.", points: 2, texte: "On sait que $1$ L $= 1$ dm³ $= 10^6$ mm³. Combien de mm³ de sang le corps contient-il ?", corrige: "$5 \\times 10^6$ mm³." },
          { n: "4.", points: 1.5, texte: "Combien le corps contient-il de globules rouges, environ ?", corrige: "$5 \\times 10^6 \\times 5 \\times 10^6 = 25 \\times 10^{12} = 2{,}5 \\times 10^{13}$ globules rouges." }
        ]
      },
      {
        titre: "Du très petit au très grand",
        duree: 15, points: 6, calculatrice: true,
        contexte: "Des longueurs et des durées, arrondies.",
        questions: [
          { n: "1.", points: 1.5, texte: "Un cheveu a un diamètre d'environ $0{,}08$ mm. Écris ce diamètre en mètres, en notation scientifique.", corrige: "$0{,}08$ mm $= 0{,}000\\,08$ m $= 8 \\times 10^{-5}$ m." },
          { n: "2.", points: 1.5, texte: "Une bactérie mesure $2$ micromètres. Combien de bactéries faudrait-il aligner pour couvrir le diamètre du cheveu ?", indice: "$1$ micromètre $= 10^{-6}$ m.", corrige: "$\\dfrac{8 \\times 10^{-5}}{2 \\times 10^{-6}} = 4 \\times 10 = 40$ bactéries." },
          { n: "3.", points: 1.5, texte: "La Lune est à environ $384\\,000$ km de la Terre. Écris cette distance en mètres, en notation scientifique.", corrige: "$384\\,000$ km $= 384\\,000\\,000$ m $= 3{,}84 \\times 10^8$ m." },
          { n: "4.", points: 1.5, texte: "Un signal radio parcourt $3 \\times 10^8$ m par seconde. Combien de temps met-il pour aller de la Terre à la Lune ?", corrige: "$\\dfrac{3{,}84 \\times 10^8}{3 \\times 10^8} = 1{,}28$ s." }
        ]
      }
    ]
  }
};
