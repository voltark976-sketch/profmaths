/*
  ENTRAÎNEMENT : Terminale maths complémentaires — chapitre 3, Suites arithmético-géométriques
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-arithmetico-geometriques.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type évaluation de maths complémentaires.
  Pas encore de logarithme (chapitre 8) : seuils à la calculatrice ou avec un programme. Données fictives.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-arithmetico-geometriques"] = {
  revisions: {
    intro: "Les suites arithmético-géométriques en un coup d'œil : la suite constante, la suite auxiliaire, la formule explicite, le sens de variation, la limite et le seuil. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Multiplier puis ajouter",
        texte: "Une suite arithmético-géométrique vérifie $u_{n+1} = au_n + b$. Si $a = 1$, elle est arithmétique ; si $b = 0$, géométrique ; sinon, ni l'un ni l'autre."
      },
      {
        titre: "La suite constante",
        texte: "Pour $a \\neq 1$, on cherche $\\ell$ tel que $\\ell = a\\ell + b$ : $\\ell = \\dfrac{b}{1 - a}$. C'est la valeur d'équilibre ; sur l'escalier, c'est l'abscisse du point commun de la droite $y = ax + b$ et de la droite $y = x$."
      },
      {
        titre: "Suite auxiliaire",
        texte: "$v_n = u_n - \\ell$ est géométrique de raison $a$ : $v_n = (u_0 - \\ell)a^n$. Donc $u_n = \\ell + (u_0 - \\ell) \\times a^n$."
      },
      {
        titre: "Sens de variation",
        texte: "Avec $a > 0$, $u_n = \\ell + (u_0 - \\ell)a^n$ : on part du sens de $a^n$, on l'inverse si $u_0 - \\ell < 0$, et ajouter $\\ell$ ne change rien."
      },
      {
        titre: "Limite",
        texte: "Si $0 < a < 1$, $a^n \\to 0$ et $u_n \\to \\ell$ : la suite se rapproche de son équilibre. Si $a > 1$ et $u_0 \\neq \\ell$, la suite s'en éloigne et tend vers $+\\infty$ ou $-\\infty$."
      },
      {
        titre: "Seuil en Python",
        texte: "Une boucle $\\texttt{while}$ calcule $u_{n+1} = au_n + b$ tant que le seuil n'est pas franchi, et compte les tours. Attention : si le seuil n'est jamais atteint, la boucle ne s'arrête pas."
      }
    ],
    pieges: [
      "Croire que $u_{n+1} = au_n + b$ définit une suite géométrique de raison $a$.",
      "Oublier de soustraire $\\ell$ : c'est $v_n = u_n - \\ell$ qui est géométrique.",
      "Calculer $\\ell = \\dfrac{b}{1 + a}$ au lieu de $\\dfrac{b}{1 - a}$.",
      "Oublier d'ajouter $\\ell$ à la fin : $u_n = \\ell + (u_0 - \\ell)a^n$.",
      "Écrire une boucle qui ne s'arrête jamais, parce que le seuil est impossible à atteindre."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme en évaluation (environ $70$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Les abonnés de la salle de sport",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Une salle de sport compte $400$ abonnés en janvier 2026. Chaque mois, $15\\,\\%$ des abonnés arrêtent et $90$ nouveaux s'inscrivent (modèle fictif). On note $u_n$ le nombre d'abonnés $n$ mois après janvier 2026 : $u_0 = 400$.",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Justifie que $u_{n+1} = 0{,}85u_n + 90$, puis calcule $u_1$ et $u_2$.",
            indice: "Il reste $85\\,\\%$ des abonnés, et on en ajoute $90$.",
            corrige: "Il reste $85\\,\\%$ des abonnés, soit $0{,}85u_n$, auxquels s'ajoutent $90$ inscrits. $u_1 = 340 + 90 = 430$ et $u_2 = 365{,}5 + 90 = 455{,}5$, soit environ $456$ abonnés."
          },
          {
            n: "2.", points: 1.5,
            texte: "Détermine le réel $\\ell$ tel que $\\ell = 0{,}85\\ell + 90$. On pose $v_n = u_n - \\ell$ : montre que $(v_n)$ est géométrique.",
            indice: "$0{,}15\\ell = 90$. Puis exprime $v_{n+1}$ en fonction de $v_n$.",
            corrige: "$\\ell - 0{,}85\\ell = 90$, donc $\\ell = \\dfrac{90}{0{,}15} = 600$. Puis $v_{n+1} = 0{,}85u_n + 90 - 600 = 0{,}85u_n - 510 = 0{,}85(u_n - 600) = 0{,}85v_n$ : $(v_n)$ est géométrique de raison $0{,}85$, avec $v_0 = -200$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Exprime $u_n$ en fonction de $n$, puis étudie le sens de variation de $(u_n)$.",
            indice: "$u_n = \\ell + v_0 \\times 0{,}85^n$.",
            corrige: "$u_n = 600 - 200 \\times 0{,}85^n$. Comme $0 < 0{,}85 < 1$, $0{,}85^n$ décroît ; multiplié par $-200 < 0$, il croît : la suite $(u_n)$ est croissante."
          },
          {
            n: "4.", points: 1.5,
            texte: "Détermine la limite de $(u_n)$ et interprète.",
            indice: "$0{,}85^n \\to 0$.",
            corrige: "$0{,}85^n \\to 0$, donc $u_n \\to 600$ : le nombre d'abonnés se stabilise près de $600$, sans jamais l'atteindre, puisque $u_n < 600$ pour tout $n$."
          },
          {
            n: "5.", points: 1.5,
            texte: "À partir de quel mois la salle compte-t-elle plus de $580$ abonnés ?",
            indice: "$u_n > 580 \\iff 200 \\times 0{,}85^n < 20 \\iff 0{,}85^n < 0{,}1$. Utilise le tableau de valeurs.",
            corrige: "$0{,}85^{14} \\approx 0{,}103$ et $0{,}85^{15} \\approx 0{,}087$ : la condition est remplie à partir de $n = 15$. La salle compte plus de $580$ abonnés à partir du $15^{\\text{e}}$ mois, en avril 2027."
          }
        ]
      },
      {
        titre: "Rembourser un emprunt",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Pour acheter un scooter, Faïna emprunte $8\\,000$ € à $0{,}5\\,\\%$ d'intérêts par mois. Chaque mois, les intérêts s'ajoutent, puis elle rembourse $300$ €. On note $D_n$ ce qu'elle doit encore au bout de $n$ mois : $D_0 = 8\\,000$ et $D_{n+1} = 1{,}005D_n - 300$ (données fictives).",
        questions: [
          {
            n: "1.", points: 1,
            texte: "Calcule $D_1$ et $D_2$, arrondis au centime.",
            indice: "$D_1 = 1{,}005 \\times 8\\,000 - 300$.",
            corrige: "$D_1 = 8\\,040 - 300 = 7\\,740$ € et $D_2 = 1{,}005 \\times 7\\,740 - 300 = 7\\,478{,}70$ €."
          },
          {
            n: "2.", points: 1.5,
            texte: "Détermine le réel $\\ell$ tel que $\\ell = 1{,}005\\ell - 300$.",
            indice: "$\\ell - 1{,}005\\ell = -300$.",
            corrige: "$-0{,}005\\ell = -300$, donc $\\ell = \\dfrac{300}{0{,}005} = 60\\,000$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Admettons que $D_n = 60\\,000 - 52\\,000 \\times 1{,}005^n$. Justifie cette formule par la suite auxiliaire, puis donne le sens de variation de $(D_n)$.",
            indice: "$D_n - \\ell$ est géométrique de raison $1{,}005$, de premier terme $8\\,000 - 60\\,000$.",
            corrige: "$D_n - 60\\,000$ est géométrique de raison $1{,}005$ et vaut $-52\\,000$ au départ : $D_n = 60\\,000 - 52\\,000 \\times 1{,}005^n$. Comme $1{,}005^n$ croît, $-52\\,000 \\times 1{,}005^n$ décroît : la dette diminue chaque mois."
          },
          {
            n: "4.", points: 2,
            texte: "Au bout de combien de mois l'emprunt est-il remboursé ? Combien Faïna aura-t-elle payé en tout, environ ?",
            indice: "Cherche le premier $n$ tel que $D_n \\leqslant 0$ avec un tableau de valeurs. Le dernier versement est plus petit que $300$ €.",
            corrige: "$D_{28} \\approx 206{,}62$ € et $D_{29} \\approx -92{,}34$ € : l'emprunt est remboursé au $29^{\\text{e}}$ mois, avec un dernier versement d'environ $300 - 92{,}34 = 207{,}66$ €. En tout, elle paie environ $28 \\times 300 + 207{,}66 = 8\\,607{,}66$ €, soit environ $608$ € d'intérêts."
          },
          {
            n: "5.", points: 1,
            texte: "Quel remboursement mensuel minimal faut-il pour que la dette de $8\\,000$ € diminue dès le premier mois ?",
            indice: "Le premier mois, les intérêts valent $0{,}005 \\times 8\\,000$.",
            corrige: "Les intérêts du premier mois valent $40$ € : il faut rembourser plus de $40$ € par mois. Avec exactement $40$ €, la dette resterait égale à $8\\,000$ € : c'est la suite constante."
          }
        ]
      },
      {
        titre: "Un équilibre instable",
        duree: 20, points: 6, calculatrice: true,
        contexte: "On considère les suites définies par $u_{n+1} = 1{,}2u_n - 4$, avec différents premiers termes $u_0$.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Détermine la suite constante solution, puis exprime $u_n$ en fonction de $n$ quand $u_0 = 15$.",
            indice: "$\\ell = \\dfrac{b}{1 - a}$ avec $a = 1{,}2$ et $b = -4$.",
            corrige: "$\\ell = \\dfrac{-4}{1 - 1{,}2} = \\dfrac{-4}{-0{,}2} = 20$. Avec $u_0 = 15$ : $u_n = 20 + (15 - 20) \\times 1{,}2^n = 20 - 5 \\times 1{,}2^n$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Avec $u_0 = 15$, étudie le sens de variation et la limite de $(u_n)$.",
            indice: "$1{,}2 > 1$ : $1{,}2^n$ croît vers $+\\infty$.",
            corrige: "$1{,}2^n$ croît et tend vers $+\\infty$ ; multiplié par $-5$, il décroît vers $-\\infty$. Donc $(u_n)$ est décroissante et $u_n \\to -\\infty$."
          },
          {
            n: "3.", points: 1.5,
            texte: "Que se passe-t-il si $u_0 = 20$ ? Et si $u_0 = 25$ ?",
            indice: "$u_n = 20 + (u_0 - 20) \\times 1{,}2^n$.",
            corrige: "Si $u_0 = 20$, $u_n = 20$ pour tout $n$ : la suite est constante. Si $u_0 = 25$, $u_n = 20 + 5 \\times 1{,}2^n$ croît vers $+\\infty$. Comme $a > 1$, le moindre écart avec $20$ grandit : l'équilibre est instable."
          },
          {
            n: "4.", points: 1.5,
            texte:
              "Avec $u_0 = 15$, que renvoie ce programme ?\n\n" +
              "```python\nn = 0\nu = 15\nwhile u >= 0:\n    u = 1.2 * u - 4\n    n = n + 1\nprint(n)\n```",
            indice: "$u_n < 0 \\iff 5 \\times 1{,}2^n > 20 \\iff 1{,}2^n > 4$.",
            corrige: "$1{,}2^7 \\approx 3{,}58$ et $1{,}2^8 \\approx 4{,}30$ : le premier terme négatif est $u_8 \\approx -1{,}50$, et le programme affiche $\\texttt{8}$."
          }
        ]
      }
    ]
  }
};
