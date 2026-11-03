/*
  ENTRAÎNEMENT : 4e — chapitre 10, Probabilités
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre quatrieme-probabilites.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type contrôle de 4e, sans calculatrice.
  Roue dessinée par o.figGeo (assets/exercices-base.js). Compositions différentes de celles du cours, de la méthode et du QCM.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["quatrieme-probabilites"] = {
  revisions: {
    intro: "Les probabilités en un coup d'œil : vocabulaire, équiprobabilité, évènement contraire, évènements incompatibles et fréquences. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Vocabulaire",
        texte: "Une issue est un résultat possible d'une expérience aléatoire ; un évènement est formé de certaines issues. Un évènement certain a pour probabilité $1$, un évènement impossible $0$."
      },
      {
        titre: "Issues équiprobables",
        texte: "Si toutes les issues ont la même chance, $P(A) = \\dfrac{\\text{nombre d'issues favorables}}{\\text{nombre total d'issues}}$."
      },
      {
        titre: "Évènement contraire",
        texte: "$P(\\text{non } A) = 1 - P(A)$."
      },
      {
        titre: "Évènements incompatibles",
        texte: "Ils ne peuvent pas se produire en même temps. Alors $P(A \\text{ ou } B) = P(A) + P(B)$."
      },
      {
        titre: "Somme des probabilités",
        texte: "La somme des probabilités de toutes les issues d'une expérience vaut $1$."
      },
      {
        titre: "Fréquence et probabilité",
        texte: "Quand on répète une expérience un grand nombre de fois, la fréquence d'un résultat se rapproche de sa probabilité."
      }
    ],
    pieges: [
      "Donner une probabilité plus grande que $1$, ou négative.",
      "Oublier des issues en les comptant.",
      "Additionner les probabilités de deux évènements qui peuvent se produire en même temps.",
      "Croire que les issues sont toujours équiprobables : sur une roue, les secteurs peuvent être inégaux.",
      "Confondre la fréquence observée et la probabilité."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en contrôle (environ $50$ minutes en tout), sans calculatrice. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question. Les probabilités sont à donner sous forme de fraction irréductible.",
    exercices: [
      {
        titre: "La roue de la kermesse",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Une roue est partagée en $8$ secteurs identiques : $3$ rouges (R), $2$ bleus (B), $1$ vert (V) et $2$ jaunes (J). On la fait tourner ; chaque secteur a la même chance de s'arrêter devant la flèche. Les résultats sont à donner sous forme de fraction irréductible.",
        figure: (o) => {
          const O = [160, 100], r = 82, rad = (d) => (d * Math.PI) / 180, P = (d, k) => [O[0] + k * Math.cos(rad(d)), O[1] - k * Math.sin(rad(d))];
          const pts = { O }, segs = [], textes = [];
          ["R", "B", "R", "J", "V", "R", "B", "J"].forEach((c, i) => {
            pts["T" + i] = P(90 - 45 * i, r); segs.push(["O", "T" + i]);
            const m = P(90 - 45 * i - 22.5, 54); textes.push([m[0], m[1] + 5, c, "middle", "g-clabel"]);
          });
          return o.figGeo({ W: 320, H: 200, pts, segs, cercles: [["O", r]], textes, sansPoint: Object.keys(pts), aria: "Roue partagée en 8 secteurs égaux : R, B, R, J, V, R, B, J" });
        },
        questions: [
          { n: "1.", points: 1.5, texte: "Quelle est la probabilité d'obtenir un secteur rouge ?", corrige: "$3$ secteurs sur $8$ : $P(R) = \\dfrac{3}{8}$." },
          { n: "2.", points: 1.5, texte: "Quelle est la probabilité de ne pas obtenir un secteur rouge ?", corrige: "$P(\\text{non } R) = 1 - \\dfrac{3}{8} = \\dfrac{5}{8}$." },
          { n: "3.", points: 2, texte: "Quelle est la probabilité d'obtenir un secteur bleu ou vert ?", indice: "« bleu » et « vert » sont incompatibles.", corrige: "Les évènements sont incompatibles : $\\dfrac{2}{8} + \\dfrac{1}{8} = \\dfrac{3}{8}$." },
          { n: "4.", points: 2, texte: "On repeint un secteur jaune en vert. Quelle est alors la probabilité d'obtenir un secteur vert ?", corrige: "Il y a alors $2$ secteurs verts sur $8$ : $\\dfrac{2}{8} = \\dfrac{1}{4}$." }
        ]
      },
      {
        titre: "Le sac de billes",
        duree: 15, points: 7, calculatrice: false,
        contexte: "Un sac contient $5$ billes rouges, $9$ billes bleues et $4$ billes jaunes, indiscernables au toucher. On tire une bille au hasard. Les résultats sont à donner sous forme de fraction irréductible.",
        questions: [
          { n: "1.", points: 1.5, texte: "Quelle est la probabilité de tirer une bille bleue ?", corrige: "Il y a $5 + 9 + 4 = 18$ billes, dont $9$ bleues : $\\dfrac{9}{18} = \\dfrac{1}{2}$." },
          { n: "2.", points: 1.5, texte: "Quelle est la probabilité de tirer une bille jaune ?", corrige: "$\\dfrac{4}{18} = \\dfrac{2}{9}$." },
          { n: "3.", points: 2, texte: "Léa affirme : « Il y a trois couleurs, donc la probabilité de tirer une rouge est $\\dfrac{1}{3}$. » A-t-elle raison ?", corrige: "Non : les trois couleurs n'ont pas la même chance, car il n'y a pas autant de billes de chaque couleur. La probabilité de tirer une rouge est $\\dfrac{5}{18}$, et non $\\dfrac{1}{3} = \\dfrac{6}{18}$." },
          { n: "4.", points: 2, texte: "On retire toutes les billes rouges du sac. Quelle est maintenant la probabilité de tirer une bille bleue ?", corrige: "Il reste $9 + 4 = 13$ billes, dont $9$ bleues : $\\dfrac{9}{13}$." }
        ]
      },
      {
        titre: "La tombola du collège",
        duree: 15, points: 6, calculatrice: false,
        contexte: "Pour une tombola, on vend $200$ billets : $1$ gagne le gros lot, $4$ gagnent un lot moyen, $15$ un petit lot, et les autres ne gagnent rien. Chaque billet a la même chance d'être acheté. Les résultats sont à donner sous forme de fraction irréductible.",
        questions: [
          { n: "1.", points: 1.5, texte: "Quelle est la probabilité qu'un billet gagne le gros lot ?", corrige: "$\\dfrac{1}{200}$." },
          { n: "2.", points: 1.5, texte: "Quelle est la probabilité qu'un billet gagne un lot, quel qu'il soit ?", corrige: "$1 + 4 + 15 = 20$ billets gagnants : $\\dfrac{20}{200} = \\dfrac{1}{10}$." },
          { n: "3.", points: 1.5, texte: "Quelle est la probabilité qu'un billet ne gagne rien ?", corrige: "C'est l'évènement contraire : $1 - \\dfrac{1}{10} = \\dfrac{9}{10}$." },
          { n: "4.", points: 1.5, texte: "Les $50$ premiers billets vendus étaient tous perdants. Pour le billet suivant, la probabilité de gagner un lot a-t-elle changé ?", corrige: "Oui : il reste $150$ billets, dont toujours $20$ gagnants. La probabilité devient $\\dfrac{20}{150} = \\dfrac{2}{15}$, plus grande que $\\dfrac{1}{10}$ : les billets vendus ne sont pas remis en jeu." }
        ]
      }
    ]
  }
};
