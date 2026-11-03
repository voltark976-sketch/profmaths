/*
  ENTRAÎNEMENT : 6e — chapitre 5, Proportionnalité (pilote du collège)
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre sixieme-proportionnalite.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 6e, sans calculatrice.
  Données fictives ; nombres différents de ceux du cours, de la méthode et du QCM du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["sixieme-proportionnalite"] = {
  revisions: {
    intro: "La proportionnalité en un coup d'œil : la reconnaître, puis trouver une valeur manquante de plusieurs façons. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "C'est quoi ?",
        texte: "Deux grandeurs sont **proportionnelles** si l'on passe toujours de l'une à l'autre en multipliant par le **même nombre**. Ce nombre s'appelle le coefficient de proportionnalité."
      },
      {
        titre: "Le reconnaître dans un tableau",
        texte: "On divise chaque nombre de la seconde ligne par celui du dessus. Si on trouve toujours le même résultat, le tableau est un tableau de proportionnalité ; sinon, il ne l'est pas."
      },
      {
        titre: "Multiplier ou diviser",
        texte: "Si une quantité est multipliée par $3$, l'autre aussi est multipliée par $3$. Si elle est divisée par $2$, l'autre aussi."
      },
      {
        titre: "Ajouter",
        texte: "Si on connaît le prix pour $4$ et pour $6$, le prix pour $10$ est la **somme** des deux, car $4 + 6 = 10$."
      },
      {
        titre: "Le retour à l'unité",
        texte: "On cherche d'abord la valeur pour $1$ (en divisant), puis on multiplie par la quantité voulue."
      },
      {
        titre: "Les échelles",
        texte: "Sur un plan, les longueurs sont proportionnelles aux longueurs réelles. Du plan à la réalité, on multiplie ; de la réalité au plan, on divise. On garde les mêmes unités."
      }
    ],
    pieges: [
      "Croire que deux grandeurs qui augmentent ensemble sont toujours proportionnelles : l'âge et la taille ne le sont pas.",
      "Un prix avec une partie fixe (une prise en charge, un abonnement) n'est pas proportionnel.",
      "Diviser dans le mauvais sens pour trouver le coefficient.",
      "Additionner deux colonnes alors que les quantités ne s'additionnent pas.",
      "Oublier de convertir : $1$ m $= 100$ cm."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le jus de goyave de la cantine",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Pour préparer $4$ litres de jus, le cuisinier de la cantine utilise $3$ kg de goyaves et $600$ g de sucre. Les quantités sont proportionnelles à la quantité de jus.",
        tableau: { lignes: [["\\text{Jus (L)}", "4", "2", "6", "10"], ["\\text{Goyaves (kg)}", "3", "?", "?", "?"], ["\\text{Sucre (g)}", "600", "?", "?", "?"]] },
        questions: [
          { n: "1.", points: 1.5, texte: "Quelles quantités faut-il pour $2$ litres de jus ?", indice: "$2$ litres, c'est la moitié de $4$ litres.", corrige: "$2$ litres, c'est deux fois moins que $4$ litres : il faut $3 \\div 2 = 1{,}5$ kg de goyaves et $600 \\div 2 = 300$ g de sucre." },
          { n: "2.", points: 1.5, texte: "Quelles quantités faut-il pour $6$ litres de jus ?", indice: "$6 = 4 + 2$ : ajoute les quantités pour $4$ litres et pour $2$ litres.", corrige: "$6$ litres, c'est $4$ litres $+ 2$ litres : il faut $3 + 1{,}5 = 4{,}5$ kg de goyaves et $600 + 300 = 900$ g de sucre." },
          {
            n: "3.", points: 2, texte: "Complète la colonne des $10$ litres et explique ta méthode.",
            indice: "$10 = 4 + 6$, ou bien $10 = 5 \\times 2$.",
            corrige: "$10$ litres, c'est $4$ litres $+ 6$ litres : il faut $3 + 4{,}5 = 7{,}5$ kg de goyaves et $600 + 900 = 1\\,500$ g de sucre, soit $1{,}5$ kg. On peut aussi multiplier par $5$ les quantités pour $2$ litres.",
            tableauCorrige: { lignes: [["\\text{Jus (L)}", "4", "2", "6", "10"], ["\\text{Goyaves (kg)}", "3", "1{,}5", "4{,}5", "7{,}5"], ["\\text{Sucre (g)}", "600", "300", "900", "1\\,500"]] }
          },
          { n: "4.", points: 2, texte: "Le cuisinier a $6$ kg de goyaves. Combien de litres de jus peut-il préparer ?", indice: "$6$ kg, c'est le double de $3$ kg.", corrige: "$6$ kg de goyaves, c'est deux fois $3$ kg : il peut préparer deux fois $4$ litres, soit $8$ litres de jus (avec $1\\,200$ g de sucre)." }
        ]
      },
      {
        titre: "Est-ce proportionnel ?",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Situation A : un ticket de bus coûte $1{,}20$ €. Situation B : la location d'un vélo coûte $4$ € la première heure, puis $2$ € par heure en plus. On a noté quelques prix dans deux tableaux.",
        questions: [
          { n: "1.", points: 2, texte: "Situation A : le prix est-il proportionnel au nombre de tickets ? Justifie.", tableau: { lignes: [["\\text{Tickets}", "2", "5", "8"], ["\\text{Prix (euros)}", "2{,}40", "6", "9{,}60"]] }, indice: "Divise chaque prix par le nombre de tickets.", corrige: "$2{,}40 \\div 2 = 1{,}20$ ; $6 \\div 5 = 1{,}20$ ; $9{,}60 \\div 8 = 1{,}20$. On trouve toujours $1{,}20$ : le prix est proportionnel au nombre de tickets, et le coefficient est $1{,}20$, le prix d'un ticket." },
          { n: "2.", points: 2, texte: "Situation B : le prix est-il proportionnel au nombre d'heures ? Justifie.", tableau: { lignes: [["\\text{Heures}", "1", "2", "4"], ["\\text{Prix (euros)}", "4", "6", "10"]] }, indice: "Divise chaque prix par le nombre d'heures et compare.", corrige: "$4 \\div 1 = 4$ mais $6 \\div 2 = 3$ : on ne trouve pas le même nombre. Le prix n'est pas proportionnel au nombre d'heures, à cause de la première heure plus chère." },
          { n: "3.", points: 1.5, texte: "Calcule le prix de $15$ tickets de bus.", corrige: "$15 \\times 1{,}20 = 18$ € (ou : $15$ tickets, c'est $3$ fois $5$ tickets, soit $3 \\times 6 = 18$ €)." },
          { n: "4.", points: 1.5, texte: "Calcule le prix de $6$ heures de vélo. Pourquoi ne peut-on pas faire $10 \\times 1{,}5$ ?", indice: "Compte la première heure à $4$ €, puis les heures suivantes à $2$ €.", corrige: "$4 + 5 \\times 2 = 14$ € : la première heure coûte $4$ €, puis les $5$ autres coûtent $2$ € chacune.\n\nOn ne peut pas faire $10 \\times 1{,}5 = 15$ € (en passant de $4$ à $6$ heures) : cette méthode ne marche que pour une situation de proportionnalité, et la situation B n'en est pas une." }
        ]
      },
      {
        titre: "Le plan du jardin du collège",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Sur le plan du jardin du collège, $1$ cm représente $3$ m dans la réalité.",
        questions: [
          { n: "1.", points: 1.5, texte: "Une allée mesure $4$ cm sur le plan. Quelle est sa longueur réelle ?", indice: "Du plan à la réalité, on multiplie.", corrige: "$4 \\times 3 = 12$ : l'allée mesure $12$ m." },
          { n: "2.", points: 1.5, texte: "Un carré de tomates mesure $7{,}5$ m de côté. Quelle longueur faut-il dessiner sur le plan ?", indice: "De la réalité au plan, on divise par $3$.", corrige: "$7{,}5 \\div 3 = 2{,}5$ : on dessine un côté de $2{,}5$ cm." },
          { n: "3.", points: 2, texte: "Sur le plan, le jardin est un rectangle de $8$ cm sur $5$ cm. Calcule ses dimensions réelles, puis son périmètre réel.", corrige: "Longueur : $8 \\times 3 = 24$ m. Largeur : $5 \\times 3 = 15$ m. Périmètre : $2 \\times (24 + 15) = 78$ m." },
          { n: "4.", points: 1, texte: "Écris l'échelle du plan sous la forme d'une fraction.", indice: "Convertis $3$ m en centimètres.", corrige: "$3$ m $= 300$ cm : $1$ cm sur le plan représente $300$ cm dans la réalité. L'échelle est $\\dfrac{1}{300}$." }
        ]
      }
    ]
  }
};
