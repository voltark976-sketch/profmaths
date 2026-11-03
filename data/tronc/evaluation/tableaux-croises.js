/*
  ENTRAÎNEMENT : Première tronc commun — chapitre 5, Tableaux croisés : deux caractères qualitatifs
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre tronc-tableaux-croises.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
  Toutes les données sont fictives. L'exercice 2 illustre le paradoxe de Simpson avec des effectifs simples.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["tronc-tableaux-croises"] = {
  revisions: {
    intro: "Les tableaux croisés en un coup d'œil : lire et compléter un tableau, effectifs marginaux, fréquences « parmi », comparer des groupes de tailles différentes. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Tableau croisé",
        texte: "Chaque case donne l'effectif des individus qui ont à la fois la modalité de la ligne et celle de la colonne. Les totaux des lignes et des colonnes sont les effectifs marginaux."
      },
      {
        titre: "Compléter un tableau",
        texte: "Une case manquante vaut le total de sa ligne (ou de sa colonne) moins **toutes** les autres cases. On vérifie que le total général est le même par les lignes et par les colonnes."
      },
      {
        titre: "Fréquence « parmi »",
        texte: "« Parmi les filles, la part de celles qui… » : on divise par le total des filles, pas par l'effectif total. Le mot « parmi » indique par quel total diviser."
      },
      {
        titre: "Comparer des groupes",
        texte: "Pour comparer des groupes de tailles différentes, on compare des fréquences, pas des effectifs : $30$ sur $150$ ($20\\,\\%$) est moins que $25$ sur $100$ ($25\\,\\%$)."
      },
      {
        titre: "Attention aux mélanges",
        texte: "Un groupe peut faire mieux dans chaque catégorie et moins bien au total, s'il n'est pas réparti de la même façon entre les catégories : c'est le paradoxe de Simpson."
      }
    ],
    pieges: [
      "Diviser par l'effectif total pour une fréquence « parmi » un groupe.",
      "Diviser par le total de la ligne alors que la condition porte sur la colonne.",
      "Comparer des effectifs bruts entre des groupes de tailles différentes.",
      "Confondre « $30\\,\\%$ des filles… » et « $30\\,\\%$ des élèves sont des filles qui… ».",
      "Oublier de soustraire toutes les autres cases pour compléter une case.",
      "Ne pas vérifier que les totaux des lignes et des colonnes donnent le même total général."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Les données sont fictives. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Les loisirs préférés",
        duree: 25, points: 7, calculatrice: false,
        contexte: "On a demandé à $250$ élèves de Seconde et de Première leur loisir préféré. Voici les résultats, avec quelques cases manquantes.",
        tableau: { lignes: [["", "\\text{Sport}", "\\text{Musique}", "\\text{Jeux}", "\\text{Total}"], ["\\text{2de}", "40", "?", "35", "100"], ["\\text{1re}", "?", "30", "60", "150"], ["\\text{Total}", "100", "?", "?", "250"]] },
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Complète le tableau.",
            indice: "Dans chaque ligne, la case manquante vaut le total moins les autres cases.",
            corrige: "Seconde, musique : $100 - 40 - 35 = 25$. Première, sport : $150 - 30 - 60 = 60$. Puis les totaux : musique $25 + 30 = 55$, jeux $35 + 60 = 95$. On vérifie : $100 + 55 + 95 = 250$.",
            tableauCorrige: { lignes: [["", "\\text{Sport}", "\\text{Musique}", "\\text{Jeux}", "\\text{Total}"], ["\\text{2de}", "40", "25", "35", "100"], ["\\text{1re}", "60", "30", "60", "150"], ["\\text{Total}", "100", "55", "95", "250"]] }
          },
          {
            n: "2.", points: 1.5,
            texte: "Quel pourcentage des $250$ élèves préfère les jeux vidéo ?",
            indice: "On divise par l'effectif total.",
            corrige: "$\\dfrac{95}{250} = \\dfrac{38}{100} = 0{,}38$ : $38\\,\\%$ des élèves préfèrent les jeux vidéo."
          },
          {
            n: "3.", points: 1.5,
            texte: "Parmi les élèves de Seconde, quel pourcentage préfère les jeux vidéo ? Et parmi les élèves de Première ? Compare.",
            indice: "« Parmi les élèves de Seconde » : on divise par $100$.",
            corrige: "Parmi les élèves de Seconde : $\\dfrac{35}{100} = 35\\,\\%$. Parmi ceux de Première : $\\dfrac{60}{150} = 0{,}4 = 40\\,\\%$. En proportion, les jeux vidéo sont plus souvent préférés en Première."
          },
          {
            n: "4.", points: 1.5,
            texte: "Parmi les élèves qui préfèrent le sport, quel pourcentage est en Seconde ?",
            indice: "Cette fois, la condition porte sur la colonne « Sport » : on divise par son total.",
            corrige: "$\\dfrac{40}{100} = 40\\,\\%$ des élèves qui préfèrent le sport sont en Seconde."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « Les élèves de Première préfèrent plus souvent la musique que ceux de Seconde, puisqu'ils sont $30$ contre $25$. » Justifie.",
            indice: "Compare des fréquences, pas des effectifs.",
            corrige: "**Faux.** Les deux groupes n'ont pas la même taille : $\\dfrac{30}{150} = 20\\,\\%$ des élèves de Première préfèrent la musique, contre $\\dfrac{25}{100} = 25\\,\\%$ de ceux de Seconde."
          }
        ]
      },
      {
        titre: "Deux auto-écoles",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Voici les résultats à l'examen du code de la route des candidats de deux auto-écoles, selon qu'ils le passent pour la première fois ou qu'ils le repassent.",
        tableau: { lignes: [["", "\\text{1re fois}", "\\text{Repassage}", "\\text{Total}"], ["\\text{A : candidats}", "100", "20", "120"], ["\\text{A : reçus}", "80", "4", "84"], ["\\text{B : candidats}", "20", "30", "50"], ["\\text{B : reçus}", "17", "9", "26"]] },
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule le taux de réussite de chaque auto-école, tous candidats confondus. Laquelle semble la meilleure ?",
            indice: "Taux de réussite : nombre de reçus divisé par nombre de candidats.",
            corrige: "A : $\\dfrac{84}{120} = 0{,}7$, soit $70\\,\\%$. B : $\\dfrac{26}{50} = 0{,}52$, soit $52\\,\\%$. Au total, l'auto-école A semble nettement meilleure."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule les taux de réussite de chaque auto-école pour les candidats qui passent le code pour la première fois, puis pour ceux qui le repassent.",
            indice: "Quatre fréquences : à chaque fois, reçus divisés par candidats dans la même case.",
            corrige: "Première fois : A, $\\dfrac{80}{100} = 80\\,\\%$ ; B, $\\dfrac{17}{20} = 85\\,\\%$.\n\nRepassage : A, $\\dfrac{4}{20} = 20\\,\\%$ ; B, $\\dfrac{9}{30} = 30\\,\\%$."
          },
          {
            n: "3.", points: 1.5,
            texte: "L'auto-école B fait mieux dans chaque catégorie, mais moins bien au total. Explique ce paradoxe.",
            indice: "Compare la part des candidats qui repassent le code dans chaque auto-école.",
            corrige: "Les candidats qui repassent réussissent beaucoup moins bien. Or ils sont $30$ sur $50$, soit $60\\,\\%$ des candidats de B, contre $20$ sur $120$ chez A. Le taux global de B est tiré vers le bas par cette répartition, pas par la qualité de ses cours."
          },
          {
            n: "4.", points: 1.5,
            texte: "Dresse le tableau croisé « auto-école » et « résultat » (reçu ou refusé) pour l'ensemble des candidats.",
            indice: "Refusés : candidats moins reçus.",
            corrige: "A : $84$ reçus et $120 - 84 = 36$ refusés. B : $26$ reçus et $50 - 26 = 24$ refusés.",
            tableauCorrige: { lignes: [["", "\\text{Reçus}", "\\text{Refusés}", "\\text{Total}"], ["A", "84", "36", "120"], ["B", "26", "24", "50"], ["\\text{Total}", "110", "60", "170"]] }
          },
          {
            n: "5.", points: 1,
            texte: "Quelle auto-école conseillerais-tu à un candidat qui passe le code pour la première fois ? Justifie.",
            indice: "Utilise la question 2 plutôt que la question 1.",
            corrige: "L'auto-école B : pour les candidats qui passent le code pour la première fois, elle réussit mieux ($85\\,\\%$ contre $80\\,\\%$). Le taux global, qui mélange des candidats différents, ne répond pas à cette question."
          }
        ]
      },
      {
        titre: "Le temps partiel",
        duree: 25, points: 6, calculatrice: false,
        contexte: "Une entreprise emploie $200$ salariés : $120$ hommes et $80$ femmes. $30\\,\\%$ des hommes et $45\\,\\%$ des femmes travaillent à temps partiel.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Dresse le tableau croisé des effectifs selon le sexe et le temps de travail (partiel ou complet).",
            indice: "$30\\,\\%$ de $120$ et $45\\,\\%$ de $80$.",
            corrige: "Hommes à temps partiel : $0{,}3 \\times 120 = 36$ ; femmes à temps partiel : $0{,}45 \\times 80 = 36$.",
            tableauCorrige: { lignes: [["", "\\text{Partiel}", "\\text{Complet}", "\\text{Total}"], ["\\text{Hommes}", "36", "84", "120"], ["\\text{Femmes}", "36", "44", "80"], ["\\text{Total}", "72", "128", "200"]] }
          },
          {
            n: "2.", points: 1.5,
            texte: "Quel pourcentage des salariés de l'entreprise travaillent à temps partiel ?",
            indice: "On divise par l'effectif total.",
            corrige: "$\\dfrac{72}{200} = 0{,}36$ : $36\\,\\%$ des salariés travaillent à temps partiel."
          },
          {
            n: "3.", points: 1.5,
            texte: "Parmi les salariés à temps partiel, quel pourcentage sont des femmes ?",
            indice: "On divise par le total de la colonne « Partiel ».",
            corrige: "$\\dfrac{36}{72} = 0{,}5$ : la moitié des salariés à temps partiel sont des femmes."
          },
          {
            n: "4.", points: 1.5,
            texte: "Un journal écrit : « Dans cette entreprise, $45\\,\\%$ des salariés à temps partiel sont des femmes. » Corrige cette phrase.",
            indice: "Les $45\\,\\%$ portent sur quel groupe ?",
            corrige: "Le journal a inversé les deux groupes : ce sont $45\\,\\%$ **des femmes** qui travaillent à temps partiel. Parmi les salariés à temps partiel, $50\\,\\%$ sont des femmes."
          }
        ]
      }
    ]
  }
};
