/*
  ENTRAÎNEMENT : 3e — chapitre 6, Notion de fonction
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre troisieme-fonctions.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type brevet (courbe, tableau de valeurs, tableur).
  Fonctions différentes de celles du cours, de la méthode et du QCM du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["troisieme-fonctions"] = {
  revisions: {
    intro: "Les fonctions en un coup d'œil : image, antécédent, tableau de valeurs, courbe et tableur. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Fonction",
        texte: "Une fonction $f$ associe à chaque nombre $x$ **un seul** nombre, noté $f(x)$. On écrit $f : x \\mapsto 2x^2 - 3$, ou $f(x) = 2x^2 - 3$."
      },
      {
        titre: "Image",
        texte: "L'image de $3$ est $f(3)$. Par le calcul : on remplace $x$ par $3$. Sur une courbe : on part de $3$ sur l'axe horizontal et on lit l'ordonnée du point de la courbe."
      },
      {
        titre: "Antécédent",
        texte: "Un antécédent de $k$ est un nombre $x$ tel que $f(x) = k$. Un nombre peut avoir aucun, un ou plusieurs antécédents. Sur une courbe : on part de $k$ sur l'axe vertical."
      },
      {
        titre: "Tableau de valeurs",
        texte: "La première ligne donne des valeurs de $x$, la seconde leurs images $f(x)$. Un même nombre peut apparaître plusieurs fois sur la seconde ligne."
      },
      {
        titre: "Courbe",
        texte: "Le point $M(x\\,;y)$ est sur la courbe de $f$ si et seulement si $y = f(x)$."
      },
      {
        titre: "Tableur",
        texte: "Si $x$ est dans la cellule A2, la formule $\\texttt{=2*A2*A2-3}$ dans la cellule B2 calcule $f(x)$ ; on la recopie vers le bas."
      }
    ],
    pieges: [
      "Confondre l'image de $2$ et un antécédent de $2$.",
      "Écrire $f(-3) = -3^2 - 1$ au lieu de $(-3)^2 - 1$ : on met des parenthèses.",
      "Oublier un des antécédents lus sur la courbe.",
      "Croire qu'un nombre a toujours un antécédent.",
      "Lire l'image sur l'axe horizontal : elle se lit sur l'axe vertical."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme au brevet (environ $60$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le rectangle de périmètre 24",
        duree: 20, points: 7, calculatrice: true,
        contexte: "On considère des rectangles de périmètre $24$ cm. On note $x$ la largeur, en cm, et $A(x)$ l'aire, en cm². La courbe de la fonction $A$ est tracée ci-dessous.",
        figure: (o) => o.graph({
          xmin: -0.5, xmax: 12.5, ymin: -2, ymax: 40, ystep: 5, h: 300,
          curves: [{ f: (x) => x * (12 - x), a: 0, b: 12, label: "A", lx: 10.5, dx: 12, dy: 4 }],
          hlines: [{ y: 20 }],
          aria: "Courbe de la fonction A sur [0 ; 12] : elle part de 0, monte jusqu'à 36 pour x = 6, puis redescend à 0 pour x = 12 ; la droite horizontale d'ordonnée 20 la coupe en x = 2 et x = 10"
        }),
        questions: [
          { n: "1.", points: 1.5, texte: "Explique pourquoi la longueur vaut $12 - x$, puis pourquoi $A(x) = x(12 - x)$.", indice: "Le demi-périmètre vaut $12$ cm.", corrige: "Le demi-périmètre (largeur $+$ longueur) vaut $24 \\div 2 = 12$ cm, donc la longueur est $12 - x$. L'aire est largeur $\\times$ longueur : $A(x) = x(12 - x)$." },
          { n: "2.", points: 1, texte: "Calcule $A(3)$.", corrige: "$A(3) = 3 \\times 9 = 27$ cm² : le rectangle mesure $3$ cm sur $9$ cm." },
          { n: "3.", points: 1.5, texte: "Lis sur le graphique les antécédents de $20$. Que représentent-ils ?", indice: "Repère où la droite horizontale d'ordonnée $20$ coupe la courbe.", corrige: "Les antécédents de $20$ sont $2$ et $10$ : les rectangles de $2$ cm sur $10$ cm ont une aire de $20$ cm² (c'est le même rectangle, tourné)." },
          { n: "4.", points: 1.5, texte: "Pour quelle largeur l'aire est-elle la plus grande ? Quelle est alors la nature du rectangle ?", corrige: "L'aire est maximale pour $x = 6$ : $A(6) = 6 \\times 6 = 36$ cm². La longueur vaut aussi $6$ cm : c'est un carré." },
          { n: "5.", points: 1.5, texte: "Les largeurs sont dans la colonne A d'un tableur, à partir de A2. Quelle formule écrire en B2 pour calculer l'aire ?", corrige: "$\\texttt{=A2*(12-A2)}$, que l'on recopie vers le bas." }
        ]
      },
      {
        titre: "Un tableau de valeurs",
        duree: 20, points: 7, calculatrice: false,
        contexte: "On considère la fonction $f$ définie par $f(x) = 2x^2 - 3$.",
        questions: [
          {
            n: "1.", points: 2, texte: "Complète le tableau de valeurs de $f$ pour $x$ égal à $-2$, $-1$, $0$, $1$ et $2$.",
            indice: "$f(-2) = 2 \\times (-2)^2 - 3$ : le carré de $-2$ est $4$.",
            corrige: "$f(-2) = 2 \\times 4 - 3 = 5$, $f(-1) = 2 - 3 = -1$, $f(0) = -3$, $f(1) = -1$ et $f(2) = 5$.",
            tableauCorrige: { lignes: [["x", "-2", "-1", "0", "1", "2"], ["f(x)", "5", "-1", "-3", "-1", "5"]] }
          },
          { n: "2.", points: 1.5, texte: "Donne deux antécédents de $5$ par $f$.", corrige: "D'après le tableau, $f(-2) = 5$ et $f(2) = 5$ : $-2$ et $2$ sont deux antécédents de $5$." },
          { n: "3.", points: 1.5, texte: "Calcule l'image de $1{,}5$. Que remarques-tu ?", corrige: "$f(1{,}5) = 2 \\times 2{,}25 - 3 = 4{,}5 - 3 = 1{,}5$ : le nombre $1{,}5$ est sa propre image." },
          { n: "4.", points: 2, texte: "Le nombre $-4$ a-t-il un antécédent par $f$ ? Justifie.", indice: "Quel est le signe de $2x^2$ ?", corrige: "Un carré est positif ou nul, donc $2x^2 \\geqslant 0$ et $f(x) = 2x^2 - 3 \\geqslant -3$. Comme $-4 < -3$, le nombre $-4$ n'a **aucun** antécédent." }
        ]
      },
      {
        titre: "La boîte sans couvercle",
        duree: 20, points: 6, calculatrice: true,
        contexte: "Dans une feuille carrée de $24$ cm de côté, on découpe un carré de côté $x$ cm à chaque coin, puis on plie pour obtenir une boîte sans couvercle. Son volume, en cm³, est $V(x) = x(24 - 2x)^2$.",
        questions: [
          { n: "1.", points: 1.5, texte: "Calcule $V(2)$.", corrige: "Pour $x = 2$, le fond est un carré de $24 - 4 = 20$ cm de côté : $V(2) = 2 \\times 20^2 = 800$ cm³." },
          { n: "2.", points: 1, texte: "Explique pourquoi $x$ doit être compris entre $0$ et $12$.", corrige: "On découpe deux carrés de côté $x$ sur chaque côté de $24$ cm : il faut $2x < 24$, donc $x < 12$, et bien sûr $x > 0$." },
          { n: "3.", points: 1.5, texte: "Avec un tableur, quelle formule écrire en B2 pour calculer $V(x)$ si $x$ est en A2 ?", corrige: "$\\texttt{=A2*(24-2*A2)*(24-2*A2)}$ : le carré s'obtient en multipliant la parenthèse par elle-même." },
          {
            n: "4.", points: 2, texte: "Le tableur donne les valeurs ci-dessous. Pour quelle valeur de $x$, parmi celles-ci, la boîte a-t-elle le plus grand volume ?",
            tableau: { lignes: [["x", "1", "2", "3", "4", "5", "6"], ["V(x)", "484", "800", "972", "1\\,024", "980", "864"]] },
            corrige: "Le plus grand volume du tableau est $1\\,024$ cm³, pour $x = 4$ : on découpe des carrés de $4$ cm, et la boîte a un fond de $16$ cm de côté."
          }
        ]
      }
    ]
  }
};
