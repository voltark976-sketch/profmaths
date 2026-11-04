/*
  ENTRAÎNEMENT : 5e — chapitre 9, Additionner et soustraire des relatifs
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre cinquieme-calculs-relatifs.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices courts type contrôle de 5e, sans calculatrice.
  Calculs différents de ceux du cours, de la méthode et du QCM du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["cinquieme-calculs-relatifs"] = {
  revisions: {
    intro: "Additionner et soustraire des relatifs en un coup d'œil : les deux cas de l'addition, la soustraction, les parenthèses et les longues sommes. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Même signe",
        texte: "On additionne les distances à zéro et on garde le signe commun : $(-6) + (-9) = -15$."
      },
      {
        titre: "Signes contraires",
        texte: "On soustrait les distances à zéro et on prend le signe de celui qui est le plus loin de zéro : $(-11) + (+4) = -7$ et $(+11) + (-4) = 7$."
      },
      {
        titre: "Soustraire",
        texte: "Soustraire un nombre, c'est ajouter son opposé : $(+2) - (+9) = 2 + (-9) = -7$ et $(-5) - (-8) = -5 + 8 = 3$."
      },
      {
        titre: "Supprimer les parenthèses",
        texte: "$+(+a)$ et $-(-a)$ s'écrivent $+a$ ; $+(-a)$ et $-(+a)$ s'écrivent $-a$. Par exemple, $6 - (-2) + (-3) = 6 + 2 - 3 = 5$."
      },
      {
        titre: "Une longue somme",
        texte: "On peut regrouper les positifs d'un côté et les négatifs de l'autre : $7 - 4 + 2 - 9 = (7 + 2) - (4 + 9) = 9 - 13 = -4$."
      }
    ],
    pieges: [
      "Additionner les distances à zéro quand les signes sont contraires : $(-11) + 4 = -7$, et non $-15$.",
      "Oublier de changer le signe du nombre soustrait : $3 - (-5) = 3 + 5 = 8$.",
      "Garder un signe au hasard : regarde quel nombre est le plus loin de zéro.",
      "Calculer un écart en oubliant les nombres négatifs : de $-4$ à $6$, il y a $10$ degrés.",
      "Supprimer des parenthèses sans changer les signes à l'intérieur après un signe $-$."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $45$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Des calculs",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Calcule en écrivant les étapes.",
        questions: [
          { n: "1.", points: 2, texte: "$(-9) + (+15)$ ; $(-4{,}5) + (-3{,}5)$ ; $(+6) + (-11)$.", corrige: "$(-9) + (+15) = 6$ ; $(-4{,}5) + (-3{,}5) = -8$ ; $(+6) + (-11) = -5$." },
          { n: "2.", points: 2, texte: "$(-5) - (+8)$ ; $(+3) - (-9)$ ; $(-10) - (-4)$.", indice: "Ajoute l'opposé du nombre que l'on soustrait.", corrige: "$(-5) + (-8) = -13$ ; $(+3) + (+9) = 12$ ; $(-10) + (+4) = -6$." },
          { n: "3.", points: 1.5, texte: "Supprime les parenthèses, puis calcule $A = (+7) - (-2) + (-5) - (+6)$.", corrige: "$A = 7 + 2 - 5 - 6 = 9 - 11 = -2$." },
          { n: "4.", points: 1.5, texte: "Calcule $B = -12 + 5 - 8 + 15 - 3$.", corrige: "Positifs : $5 + 15 = 20$ ; négatifs : $-12 - 8 - 3 = -23$. Donc $B = 20 - 23 = -3$." }
        ]
      },
      {
        titre: "L'ascenseur",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Dans un immeuble, le rez-de-chaussée est le niveau $0$ ; les quatre niveaux de parking sont numérotés de $-1$ à $-4$, et les étages de $1$ à $9$.",
        questions: [
          { n: "1.", points: 2, texte: "L'ascenseur part du niveau $-2$, monte de $7$ niveaux, descend de $4$, puis descend encore de $3$. Où arrive-t-il ?", corrige: "$-2 + 7 - 4 - 3 = -2$ : il revient au niveau $-2$." },
          { n: "2.", points: 1.5, texte: "Depuis le niveau $-2$, de combien de niveaux doit-il monter pour atteindre le $5$e étage ?", corrige: "$5 - (-2) = 5 + 2 = 7$ niveaux." },
          { n: "3.", points: 2, texte: "Combien de niveaux séparent le niveau $-3$ du $8$e étage ?", corrige: "$8 - (-3) = 11$ niveaux." },
          { n: "4.", points: 1.5, texte: "Combien l'immeuble a-t-il de niveaux en tout, rez-de-chaussée compris ?", corrige: "$4$ niveaux de parking, le rez-de-chaussée et $9$ étages : $4 + 1 + 9 = 14$ niveaux." }
        ]
      },
      {
        titre: "Le compte de l'association",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Le compte d'une association contient $120$ €. Puis on note les opérations suivantes : un paiement de $85$ €, un dépôt de $40$ €, un paiement de $130$ €, un dépôt de $65$ €.",
        questions: [
          { n: "1.", points: 2, texte: "Calcule le solde du compte après chaque opération.", corrige: "$120 - 85 = 35$ € ; $35 + 40 = 75$ € ; $75 - 130 = -55$ € ; $-55 + 65 = 10$ €." },
          { n: "2.", points: 2, texte: "Après combien d'opérations le compte a-t-il été « à découvert », c'est-à-dire négatif ?", corrige: "Seulement après la troisième opération : le solde vaut alors $-55$ €." },
          { n: "3.", points: 2, texte: "Quel est l'écart entre le solde le plus haut et le solde le plus bas ?", corrige: "Le plus haut est $120$ € (au départ) et le plus bas $-55$ € : $120 - (-55) = 175$ €." }
        ]
      }
    ]
  }
};
