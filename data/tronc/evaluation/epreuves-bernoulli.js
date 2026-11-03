/*
  ENTRAÎNEMENT : Première tronc commun — chapitre 8, Répétition d'épreuves de Bernoulli
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre tronc-epreuves-bernoulli.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
  Au plus 4 épreuves dans les arbres, pas de loi binomiale ; simulation au tableur (loi des grands nombres). Données fictives.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["tronc-epreuves-bernoulli"] = {
  revisions: {
    intro: "Les épreuves répétées en un coup d'œil : épreuve de Bernoulli, arbre et règle du produit, exactement $k$ succès, au moins un succès et simulation au tableur. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Épreuve de Bernoulli",
        texte: "Deux issues : le succès, de probabilité $p$, et l'échec, de probabilité $1 - p$. Répéter la même épreuve de façon indépendante, c'est faire comme si chaque résultat n'influençait pas les suivants."
      },
      {
        titre: "Règle du produit",
        texte: "Sur l'arbre, la probabilité d'un chemin est le produit des probabilités de ses branches : avec $p = 0{,}3$, le chemin « succès, échec » a pour probabilité $0{,}3 \\times 0{,}7 = 0{,}21$."
      },
      {
        titre: "Exactement $k$ succès",
        texte: "On repère tous les chemins qui ont exactement $k$ succès ; ils ont la même probabilité, qu'on multiplie par leur nombre. Avec $4$ épreuves, il y a $6$ chemins à $2$ succès."
      },
      {
        titre: "Au moins un succès",
        texte: "Le contraire de « au moins un succès » est « aucun succès », de probabilité $(1 - p)^n$. Donc $P(\\text{au moins un succès}) = 1 - (1 - p)^n$."
      },
      {
        titre: "Simuler au tableur",
        texte: "$\\texttt{=SI(ALEA()<0,3;1;0)}$ donne $1$ avec la probabilité $0{,}3$. Sur un grand nombre de simulations, la fréquence observée se rapproche de la probabilité : c'est la loi des grands nombres."
      }
    ],
    pieges: [
      "Additionner les probabilités le long d'un chemin au lieu de les multiplier.",
      "Oublier des chemins pour « exactement $k$ succès ».",
      "Calculer « au moins un succès » par $n \\times p$ au lieu de passer par le contraire.",
      "Croire qu'après plusieurs échecs, le succès devient plus probable.",
      "Modéliser des tirages sans remise dans un petit lot par des épreuves indépendantes.",
      "Attendre d'une petite simulation qu'elle donne exactement la probabilité."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Les données sont fictives. Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Trois vols à l'heure ?",
        duree: 25, points: 7, calculatrice: false,
        contexte: "Pour aller de Mayotte en métropole, Soilihi prend trois avions, avec des correspondances. On admet que chaque vol part à l'heure avec la probabilité $0{,}8$, indépendamment des autres. On note $H$ « le vol part à l'heure ».",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Justifie que l'on peut modéliser la situation par la répétition de trois épreuves de Bernoulli. Combien de chemins compte l'arbre ?",
            indice: "Chaque vol a deux issues. Chaque niveau de l'arbre double le nombre de chemins.",
            corrige: "Chaque vol a deux issues : à l'heure (succès, $p = 0{,}8$) ou en retard. On répète trois fois cette épreuve, de façon indépendante. L'arbre a $2 \\times 2 \\times 2 = 8$ chemins."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule la probabilité que les trois vols partent à l'heure.",
            indice: "Un seul chemin : $HHH$.",
            corrige: "$P(HHH) = 0{,}8 \\times 0{,}8 \\times 0{,}8 = 0{,}64 \\times 0{,}8 = 0{,}512$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule la probabilité qu'exactement deux vols partent à l'heure.",
            indice: "Trois chemins : $HH\\overline{H}$, $H\\overline{H}H$ et $\\overline{H}HH$.",
            corrige: "Chacun des trois chemins a pour probabilité $0{,}8 \\times 0{,}8 \\times 0{,}2 = 0{,}128$. Donc la probabilité cherchée vaut $3 \\times 0{,}128 = 0{,}384$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Calcule la probabilité qu'au moins un des trois vols soit en retard.",
            indice: "C'est l'événement contraire de « les trois vols à l'heure ».",
            corrige: "$1 - 0{,}512 = 0{,}488$ : presque une chance sur deux d'avoir au moins un retard."
          },
          {
            n: "5.", points: 1,
            texte: "Soilihi raisonne : « Un vol est en retard une fois sur cinq, donc sur trois vols, la probabilité d'au moins un retard vaut $3 \\times 0{,}2 = 0{,}6$. » Qu'en penses-tu ?",
            indice: "Compare avec la question 4.",
            corrige: "Il a tort : on ne multiplie pas $n$ par $p$. En passant par l'événement contraire, on trouve $0{,}488$, et non $0{,}6$. Son calcul compterait plusieurs fois les voyages qui ont deux ou trois retards."
          }
        ]
      },
      {
        titre: "Pile ou face, quatre fois",
        duree: 25, points: 7, calculatrice: false,
        contexte: "On lance quatre fois une pièce équilibrée. On note $P$ « obtenir pile » et $F$ « obtenir face ».",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Combien l'arbre compte-t-il de chemins ? Quelle est la probabilité de chacun ?",
            indice: "Chaque lancer double le nombre de chemins ; chaque branche a la probabilité $\\dfrac{1}{2}$.",
            corrige: "L'arbre compte $2^4 = 16$ chemins, et chacun a pour probabilité $\\left(\\dfrac{1}{2}\\right)^4 = \\dfrac{1}{16}$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Calcule la probabilité d'obtenir exactement deux fois pile, sous forme de fraction. Écris la liste des chemins correspondants.",
            indice: "Les deux piles peuvent être aux lancers 1 et 2, 1 et 3… Il y a $6$ façons.",
            corrige: "Les chemins sont $PPFF$, $PFPF$, $PFFP$, $FPPF$, $FPFP$ et $FFPP$ : $6$ chemins, donc la probabilité vaut $\\dfrac{6}{16} = \\dfrac{3}{8}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Calcule la probabilité d'obtenir au moins une fois pile.",
            indice: "Un seul chemin ne contient aucun pile.",
            corrige: "Le contraire est « aucun pile », c'est-à-dire le seul chemin $FFFF$ : $1 - \\dfrac{1}{16} = \\dfrac{15}{16}$."
          },
          {
            n: "4.", points: 1.5,
            texte: "Avec $n$ lancers, la probabilité d'au moins un pile vaut $1 - \\left(\\dfrac{1}{2}\\right)^n$. Combien de lancers faut-il pour qu'elle dépasse $0{,}99$ ?",
            indice: "Il faut $\\left(\\dfrac{1}{2}\\right)^n < 0{,}01$, c'est-à-dire $2^n > 100$.",
            corrige: "Il faut $\\left(\\dfrac{1}{2}\\right)^n < 0{,}01$, soit $2^n > 100$. Or $2^6 = 64$ et $2^7 = 128$ : il faut au moins $7$ lancers."
          },
          {
            n: "5.", points: 1,
            texte: "Après quatre « face » de suite, un joueur affirme : « Au prochain lancer, pile est plus probable. » A-t-il raison ?",
            indice: "Les lancers sont indépendants.",
            corrige: "Non. Les lancers sont indépendants : la pièce n'a pas de mémoire, et pile garde la probabilité $\\dfrac{1}{2}$ au cinquième lancer."
          }
        ]
      },
      {
        titre: "Simuler au tableur",
        duree: 25, points: 6, calculatrice: false,
        contexte: "On reprend le modèle d'un voyage de trois vols, chacun à l'heure avec la probabilité $0{,}8$, indépendamment des autres. La probabilité que les trois vols soient à l'heure vaut $0{,}512$. On simule des voyages au tableur : chaque ligne est un voyage, et chacune des cellules A, B et C contient $\\texttt{=SI(ALEA()<0,8;1;0)}$.",
        tableau: { lignes: [["N", "10", "100", "1\\,000", "10\\,000"], ["f", "0{,}6", "0{,}48", "0{,}523", "0{,}511"]] },
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Que simule la formule $\\texttt{=SI(ALEA()<0,8;1;0)}$ ?",
            indice: "$\\texttt{ALEA()}$ donne un nombre au hasard entre $0$ et $1$.",
            corrige: "Elle affiche $1$ si le nombre au hasard est inférieur à $0{,}8$, ce qui arrive avec la probabilité $0{,}8$, et $0$ sinon : elle simule un vol, $1$ voulant dire « à l'heure »."
          },
          {
            n: "2.", points: 1.5,
            texte: "Quelle formule écrire dans la cellule D2 pour qu'elle affiche $1$ si les trois vols de la ligne 2 sont à l'heure, et $0$ sinon ?",
            indice: "Un produit de $0$ et de $1$ vaut $1$ seulement si tous les nombres valent $1$.",
            corrige: "Par exemple $\\texttt{=A2*B2*C2}$ : le produit vaut $1$ seulement si les trois cellules valent $1$. On peut aussi écrire $\\texttt{=SI(A2+B2+C2=3;1;0)}$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Le tableau donne la fréquence $f$ des voyages sans aucun retard, pour $N$ voyages simulés. Que constates-tu ? Comment s'appelle ce résultat ?",
            indice: "Compare chaque fréquence avec $0{,}512$.",
            corrige: "Pour de petits $N$, la fréquence varie beaucoup ($0{,}6$ pour $10$ voyages). Plus $N$ est grand, plus elle se rapproche de la probabilité $0{,}512$ : c'est la loi des grands nombres."
          },
          {
            n: "4.", points: 1.5,
            texte: "Sur $10\\,000$ voyages simulés, environ combien sont sans aucun retard ? Un élève obtient $0{,}6$ avec $10$ voyages et pense que son tableur est faux. Qu'en penses-tu ?",
            indice: "$0{,}512 \\times 10\\,000$.",
            corrige: "Environ $0{,}512 \\times 10\\,000 = 5\\,120$ voyages, ici $5\\,110$ dans la simulation. Le tableur de l'élève n'est pas faux : avec seulement $10$ voyages, la fréquence fluctue beaucoup autour de $0{,}512$."
          }
        ]
      }
    ]
  }
};
