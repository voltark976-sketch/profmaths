/*
  ENTRAÎNEMENT : Première technologique — chapitre 6, Suites arithmétiques et géométriques
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre techno-suites-arithmetiques-geometriques.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit de la partie 2 de l'épreuve anticipée, sans calculatrice.
  Suites géométriques à termes strictement positifs, comme dans le programme de première technologique.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["techno-suites-arithmetiques-geometriques"] = {
  revisions: {
    intro: "Les suites arithmétiques et géométriques en un coup d'œil : relation de récurrence, terme de rang $n$, nature, sens de variation et modélisation. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Suite arithmétique",
        texte: "$u(n + 1) = u(n) + r$ : on ajoute toujours la **raison** $r$. Terme de rang $n$ : $u(n) = u(0) + n \\times r$. Ses points sont alignés : c'est une croissance linéaire."
      },
      {
        titre: "Suite géométrique",
        texte: "$u(n + 1) = q \\times u(n)$, avec des termes positifs : on multiplie toujours par la **raison** $q$. Terme de rang $n$ : $u(n) = u(0) \\times q^n$. C'est une évolution exponentielle."
      },
      {
        titre: "Démontrer la nature",
        texte:
          "- arithmétique : $u(n + 1) - u(n)$ est la même constante $r$ pour tout $n$ ;\n" +
          "- géométrique : $\\dfrac{u(n + 1)}{u(n)}$ est la même constante $q$ pour tout $n$ ;\n" +
          "- quelques termes permettent de conjecturer, pas de démontrer."
      },
      {
        titre: "Sens de variation",
        texte:
          "- arithmétique : croissante si $r > 0$, décroissante si $r < 0$ ;\n" +
          "- géométrique à termes positifs : croissante si $q > 1$, décroissante si $0 < q < 1$."
      },
      {
        titre: "Modéliser",
        texte: "« $+50$ par mois » : suite arithmétique de raison $50$. « $+5\\,\\%$ par mois » : suite géométrique de raison $1{,}05$. « $-20\\,\\%$ par an » : suite géométrique de raison $0{,}8$."
      },
      {
        titre: "Avec deux termes connus",
        texte: "Pour une suite arithmétique, il y a $n - p$ étapes de $u(p)$ à $u(n)$ : $u(n) = u(p) + (n - p) \\times r$. Par exemple, si $u(2) = 7$ et $u(5) = 16$, alors $3r = 9$ et $r = 3$."
      }
    ],
    pieges: [
      "Confondre les formules $u(0) + nr$ (arithmétique) et $u(0) \\times q^n$ (géométrique).",
      "Compter une étape de trop ou de moins entre $u(p)$ et $u(n)$ : il y en a $n - p$.",
      "Traduire « $+5\\,\\%$ par an » par une suite arithmétique de raison $5$ : c'est une suite géométrique de raison $1{,}05$.",
      "Dire qu'une suite géométrique de raison $0{,}8$ est croissante parce que $0{,}8 > 0$ : il faut comparer $q$ à $1$.",
      "Conclure « arithmétique » après trois termes, sans calcul général.",
      "Trouver la raison d'une suite géométrique en soustrayant au lieu de diviser."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit de la partie 2 de l'épreuve anticipée, **sans calculatrice** (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Les inscrits d'une plateforme de covoiturage",
        duree: 25, points: 7, calculatrice: false,
        contexte:
          "Une plateforme de covoiturage compte $400$ inscrits au lancement. On compare deux hypothèses pour les mois suivants :\n" +
          "- hypothèse A : $60$ nouveaux inscrits chaque mois ;\n" +
          "- hypothèse B : le nombre d'inscrits augmente de $10\\,\\%$ chaque mois.\n\n" +
          "On note $u(n)$ et $v(n)$ les nombres d'inscrits au bout de $n$ mois, selon l'hypothèse A et selon l'hypothèse B.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Donne la nature et la raison de chaque suite, ainsi que la relation entre deux termes consécutifs.",
            indice: "On ajoute $60$ dans un cas ; on multiplie par $1{,}1$ dans l'autre.",
            corrige: "$(u(n))$ est arithmétique de raison $60$ : $u(n + 1) = u(n) + 60$.\n\n$(v(n))$ est géométrique de raison $1{,}1$ : $v(n + 1) = 1{,}1 \\times v(n)$. Les deux commencent à $400$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Exprime $u(n)$ et $v(n)$ en fonction de $n$. Calcule $u(10)$, puis $v(1)$ et $v(2)$.",
            indice: "$u(n) = u(0) + n \\times r$ et $v(n) = v(0) \\times q^n$.",
            corrige: "$u(n) = 400 + 60n$ et $v(n) = 400 \\times 1{,}1^n$.\n\n$u(10) = 400 + 600 = 1\\,000$ ; $v(1) = 440$ et $v(2) = 440 \\times 1{,}1 = 484$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Donne le sens de variation de chaque suite, en justifiant.",
            indice: "Regarde le signe de $r$ pour $u$, et compare $q$ à $1$ pour $v$.",
            corrige: "La raison de $(u(n))$ est $60 > 0$ : la suite est croissante. La raison de $(v(n))$ est $1{,}1 > 1$, avec des termes positifs : elle est croissante aussi."
          },
          {
            n: "4.", points: 1.5,
            texte:
              "On exécute ce programme ; il affiche $\\texttt{9}$. Que signifie ce résultat ?\n\n" +
              "```python\nn = 0\nu = 400\nv = 400\nwhile v <= u:\n    n = n + 1\n    u = u + 60\n    v = v * 1.1\nprint(n)\n```",
            indice: "La boucle continue tant que $v \\leqslant u$. Quand s'arrête-t-elle ?",
            corrige: "La boucle calcule les deux suites mois après mois et s'arrête au premier $n$ tel que $v(n) > u(n)$. Le programme affiche $9$ : c'est au bout de $9$ mois que l'hypothèse B donne plus d'inscrits que l'hypothèse A."
          },
          {
            n: "5.", points: 1,
            texte: "Vrai ou faux : « Avec l'hypothèse B, la plateforme gagne $40$ inscrits chaque mois. » Justifie.",
            indice: "Compare $v(1) - v(0)$ et $v(2) - v(1)$.",
            corrige: "**Faux.** Elle gagne $440 - 400 = 40$ inscrits le premier mois, puis $484 - 440 = 44$ le deuxième : les gains augmentent, car on ajoute $10\\,\\%$ d'un nombre qui grandit."
          }
        ]
      },
      {
        titre: "La concentration d'un médicament",
        duree: 25, points: 7, calculatrice: false,
        contexte: "On injecte un médicament à un patient. Juste après l'injection, sa concentration dans le sang est de $50$ mg/L. Chaque heure, elle diminue de $20\\,\\%$. On note $c(n)$ la concentration, en mg/L, au bout de $n$ heures : $c(0) = 50$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $c(1)$, $c(2)$ et $c(3)$.",
            indice: "Diminuer de $20\\,\\%$, c'est multiplier par $0{,}8$.",
            corrige: "$c(1) = 50 \\times 0{,}8 = 40$, $c(2) = 40 \\times 0{,}8 = 32$ et $c(3) = 32 \\times 0{,}8 = 25{,}6$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Quelle est la nature de la suite $(c(n))$ ? Exprime $c(n)$ en fonction de $n$.",
            indice: "Chaque terme s'obtient en multipliant le précédent par le même nombre.",
            corrige: "$c(n + 1) = 0{,}8 \\times c(n)$ : la suite est géométrique de raison $0{,}8$ et de premier terme $50$. Donc $c(n) = 50 \\times 0{,}8^n$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Quel est le sens de variation de cette suite ? Justifie.",
            indice: "Compare la raison à $1$.",
            corrige: "Les termes sont positifs et la raison vérifie $0 < 0{,}8 < 1$ : chaque terme est plus petit que le précédent, la suite est décroissante."
          },
          {
            n: "4.", points: 1.5,
            texte: "Le médicament n'est plus efficace quand sa concentration passe sous $20$ mg/L. Au bout de combien d'heures cela arrive-t-il ?",
            indice: "Continue les calculs : $c(4) = 25{,}6 \\times 0{,}8$.",
            corrige: "$c(4) = 25{,}6 \\times 0{,}8 = 20{,}48$, qui est encore au-dessus de $20$, puis $c(5) = 20{,}48 \\times 0{,}8 = 16{,}384$. La concentration passe sous $20$ mg/L au bout de $5$ heures."
          },
          {
            n: "5.", points: 1,
            texte: "Une infirmière affirme : « La concentration baisse de $10$ mg/L chaque heure. » Vrai ou faux ? Justifie.",
            indice: "Calcule la baisse pendant la première heure, puis pendant la deuxième.",
            corrige: "**Faux.** La baisse est de $10$ mg/L la première heure ($50$ à $40$), puis de $8$ mg/L la deuxième ($40$ à $32$). La suite est géométrique, pas arithmétique : la baisse diminue avec la concentration."
          }
        ]
      },
      {
        titre: "Reconnaître une suite",
        duree: 25, points: 6, calculatrice: false,
        contexte: "Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "On pose $u(n) = 3n - 7$. Démontre que $(u(n))$ est arithmétique, puis donne sa raison et son sens de variation.",
            indice: "Calcule $u(n + 1) - u(n)$.",
            corrige: "$u(n + 1) - u(n) = 3(n + 1) - 7 - (3n - 7) = 3$ pour tout $n$ : la suite est arithmétique de raison $3$. Comme $3 > 0$, elle est croissante."
          },
          {
            n: "2.", points: 1.5,
            texte: "On pose $v(n) = 5 \\times 2^n$. Démontre que $(v(n))$ est géométrique, puis calcule $v(4)$.",
            indice: "Calcule $\\dfrac{v(n + 1)}{v(n)}$.",
            corrige: "$\\dfrac{v(n + 1)}{v(n)} = \\dfrac{5 \\times 2^{n+1}}{5 \\times 2^n} = 2$ pour tout $n$ : la suite est géométrique de raison $2$. Et $v(4) = 5 \\times 16 = 80$."
          },
          {
            n: "3.", points: 1.5,
            texte: "On pose $w(n) = n^2 + 3$. Calcule $w(0)$, $w(1)$, $w(2)$ et $w(3)$. La suite est-elle arithmétique ? Géométrique ?",
            indice: "Calcule les différences, puis les quotients, de deux termes consécutifs.",
            corrige: "$w(0) = 3$, $w(1) = 4$, $w(2) = 7$ et $w(3) = 12$. Les différences $1$, $3$ et $5$ ne sont pas égales : la suite n'est pas arithmétique. Les quotients $\\dfrac{4}{3}$ et $\\dfrac{7}{4}$ ne sont pas égaux : elle n'est pas géométrique non plus."
          },
          {
            n: "4.", points: 1.5,
            texte: "Une suite arithmétique $(a(n))$ vérifie $a(3) = 14$ et $a(7) = 30$. Détermine sa raison, puis $a(0)$.",
            indice: "De $a(3)$ à $a(7)$, il y a $4$ étapes.",
            corrige: "De $a(3)$ à $a(7)$, on ajoute $4$ fois la raison : $4r = 30 - 14 = 16$, donc $r = 4$. Puis $a(0) = a(3) - 3r = 14 - 12 = 2$."
          }
        ]
      }
    ]
  }
};
