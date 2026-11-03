/*
  ENTRAÎNEMENT : Terminale spécialité — chapitre 14, Combinatoire et dénombrement
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre terminale-spe-denombrement.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices dans l'esprit du bac. Données fictives.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["terminale-spe-denombrement"] = {
  revisions: {
    intro: "Le dénombrement en un coup d'œil : principes additif et multiplicatif, k-uplets, permutations, combinaisons, parties d'un ensemble et triangle de Pascal. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Additionner ou multiplier",
        texte: "Principe additif : pour deux ensembles disjoints, on additionne les cardinaux ; sinon, pour $A \\cup B$, on ajoute $\\text{Card}(A)$ et $\\text{Card}(B)$ et on retire $\\text{Card}(A \\cap B)$, compté deux fois. Principe multiplicatif : pour des choix **successifs**, on multiplie les nombres de possibilités."
      },
      {
        titre: "Les deux questions",
        texte: "L'ordre compte-t-il ? Les répétitions sont-elles permises ? Ordre et répétitions : $n^k$. Ordre sans répétition : $n(n - 1)\\cdots(n - k + 1) = \\dfrac{n!}{(n - k)!}$. Sans ordre ni répétition : $\\dbinom{n}{k}$."
      },
      {
        titre: "Permutations",
        texte: "Ranger $n$ éléments distincts dans un ordre : $n! = 1 \\times 2 \\times \\dots \\times n$ façons, avec la convention $0! = 1$."
      },
      {
        titre: "Combinaisons",
        texte: "$\\dbinom{n}{k} = \\dfrac{n!}{k!\\,(n - k)!}$ est le nombre de parties à $k$ éléments d'un ensemble à $n$ éléments. Par exemple, $\\dbinom{n}{2} = \\dfrac{n(n - 1)}{2}$."
      },
      {
        titre: "Propriétés",
        texte: "$\\dbinom{n}{k} = \\dbinom{n}{n - k}$ ; relation de Pascal : $\\dbinom{n}{k} + \\dbinom{n}{k + 1} = \\dbinom{n + 1}{k + 1}$ ; et $\\displaystyle\\sum_{k=0}^{n} \\dbinom{n}{k} = 2^n$, le nombre de parties d'un ensemble à $n$ éléments."
      },
      {
        titre: "« Au moins un »",
        texte: "On compte souvent plus vite le contraire : le nombre de cas avec au moins un élément d'un type est le total moins le nombre de cas où ce type est absent."
      },
      {
        titre: "Probabilités",
        texte: "En situation d'équiprobabilité, $P(A) = \\dfrac{\\text{Card}(A)}{\\text{Card}(\\Omega)}$ : on compte $A$ et $\\Omega$ **de la même façon**, tous deux avec ordre ou tous deux sans ordre."
      }
    ],
    pieges: [
      "Additionner au lieu de multiplier quand les choix sont successifs.",
      "Utiliser $\\dbinom{n}{k}$ alors que l'ordre compte : postes différents, classement, tirages successifs.",
      "Utiliser $\\dfrac{n!}{(n - k)!}$ alors que les répétitions sont permises : c'est $n^k$.",
      "Inverser $n^k$ et $k^n$ : la base est le nombre de choix à chaque position.",
      "Croire que $0! = 0$ : par convention $0! = 1$.",
      "Compter $\\Omega$ sans ordre et l'événement avec ordre, ou l'inverse."
    ]
  },

  evaluation: {
    intro: "Trois exercices dans l'esprit du bac (environ $75$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Codes et mots",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Un code de téléphone est formé de $4$ chiffres de $0$ à $9$. Combien y a-t-il de codes ? Combien ont leurs $4$ chiffres distincts ? Quelle est la probabilité qu'un code choisi au hasard ait ses chiffres distincts ?",
            indice: "Avec répétitions : $10^4$. Sans répétition : $10 \\times 9 \\times 8 \\times 7$.",
            corrige: "Il y a $10^4 = 10\\,000$ codes, dont $10 \\times 9 \\times 8 \\times 7 = 5\\,040$ à chiffres distincts. La probabilité vaut $\\dfrac{5\\,040}{10\\,000} = 0{,}504$."
          },
          {
            n: "2.", points: 1.5,
            texte: "Un mot de passe est formé de $6$ caractères, chacun choisi parmi les $26$ lettres minuscules et les $10$ chiffres. Combien de mots de passe contiennent au moins un chiffre ?",
            indice: "Compte tous les mots de passe, puis ceux qui n'ont que des lettres.",
            corrige: "Il y a $36^6$ mots de passe en tout et $26^6$ sans aucun chiffre. Donc $36^6 - 26^6 = 2\\,176\\,782\\,336 - 308\\,915\\,776 = 1\\,867\\,866\\,560$ mots de passe contiennent au moins un chiffre."
          },
          {
            n: "3.", points: 1.5,
            texte: "Combien de mots différents, ayant un sens ou non, peut-on écrire avec toutes les lettres de MAYOTTE ?",
            indice: "Choisis d'abord les $2$ places des deux T parmi les $7$, puis range les $5$ autres lettres, toutes différentes.",
            corrige: "On choisit les places des deux T : $\\dbinom{7}{2} = 21$ façons. Puis on range M, A, Y, O, E dans les $5$ places restantes : $5! = 120$ façons. En tout : $21 \\times 120 = 2\\,520$ mots."
          },
          {
            n: "4.", points: 1.5,
            texte: "Combien de mots de $7$ lettres peut-on écrire avec exactement $3$ lettres A et $4$ lettres B ?",
            indice: "Un tel mot est déterminé par les places des $3$ lettres A.",
            corrige: "Il suffit de choisir les $3$ places des A parmi $7$ : $\\dbinom{7}{3} = 35$ mots."
          },
          {
            n: "5.", points: 1,
            texte:
              "Qu'affiche ce programme ? Retrouve ce résultat par un calcul.\n\n" +
              "```python\nc = 0\nfor n in range(100, 1000):\n    s = str(n)\n    if len(set(s)) == 3:\n        c = c + 1\nprint(c)\n```",
            indice: "$\\texttt{set(s)}$ est l'ensemble des chiffres de $n$ : il a $3$ éléments si les $3$ chiffres sont distincts.",
            corrige: "Il compte les nombres de $3$ chiffres dont les chiffres sont distincts. Le premier chiffre a $9$ valeurs possibles ($1$ à $9$), le deuxième $9$ (tous sauf le premier), le troisième $8$ : le programme affiche $9 \\times 9 \\times 8 = 648$."
          }
        ]
      },
      {
        titre: "Le comité du club",
        duree: 25, points: 7, calculatrice: true,
        contexte: "Un club de football de Mamoudzou compte $12$ filles et $10$ garçons. Il désigne un comité de $4$ membres.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Combien de comités différents peut-on former ?",
            indice: "Dans un comité, les $4$ membres n'ont pas de rôle : l'ordre ne compte pas.",
            corrige: "On choisit $4$ personnes parmi $22$, sans ordre : $\\dbinom{22}{4} = \\dfrac{22 \\times 21 \\times 20 \\times 19}{24} = 7\\,315$ comités."
          },
          {
            n: "2.", points: 1.5,
            texte: "Combien de comités comportent exactement $2$ filles et $2$ garçons ?",
            indice: "Choisis les filles, puis les garçons, et multiplie.",
            corrige: "$\\dbinom{12}{2} \\times \\dbinom{10}{2} = 66 \\times 45 = 2\\,970$ comités."
          },
          {
            n: "3.", points: 1.5,
            texte: "Combien de comités comportent au moins un garçon ?",
            indice: "Le contraire : un comité formé uniquement de filles.",
            corrige: "Il y a $\\dbinom{12}{4} = 495$ comités sans garçon, donc $7\\,315 - 495 = 6\\,820$ comités avec au moins un garçon."
          },
          {
            n: "4.", points: 1.5,
            texte: "Le club élit plutôt un bureau : un président, un trésorier et un secrétaire, trois personnes différentes. Combien de bureaux sont possibles ?",
            indice: "Cette fois les rôles sont différents : l'ordre compte, sans répétition.",
            corrige: "$22$ choix pour le président, puis $21$ pour le trésorier, puis $20$ pour le secrétaire : $22 \\times 21 \\times 20 = 9\\,240$ bureaux."
          },
          {
            n: "5.", points: 1,
            texte: "On tire au sort un comité de $4$ membres. Quelle est la probabilité qu'il compte exactement $2$ filles et $2$ garçons ? Arrondis au millième.",
            indice: "Les $7\\,315$ comités sont équiprobables.",
            corrige: "$P = \\dfrac{2\\,970}{7\\,315} \\approx 0{,}406$."
          }
        ]
      },
      {
        titre: "Autour des coefficients binomiaux",
        duree: 25, points: 6, calculatrice: false,
        contexte: "Les questions sont indépendantes.",
        questions: [
          {
            n: "1.", points: 1.5,
            texte: "Calcule $\\dbinom{8}{2}$, $\\dbinom{8}{6}$ et $\\dbinom{8}{0}$. Explique pourquoi $\\dbinom{8}{2} = \\dbinom{8}{6}$ sans calcul.",
            indice: "Choisir $2$ éléments, c'est aussi choisir les $6$ que l'on laisse.",
            corrige: "$\\dbinom{8}{2} = \\dfrac{8 \\times 7}{2} = 28$, $\\dbinom{8}{6} = 28$ et $\\dbinom{8}{0} = 1$ (seule la partie vide a $0$ élément). Choisir les $2$ éléments que l'on prend revient à choisir les $6$ que l'on laisse : les deux nombres sont égaux."
          },
          {
            n: "2.", points: 1.5,
            texte: "À la fin d'une réunion, chaque participant serre la main de chacun des autres une seule fois. Il y a eu $45$ poignées de main. Combien de personnes étaient présentes ?",
            indice: "Une poignée de main correspond à une paire de personnes : $\\dbinom{n}{2} = \\dfrac{n(n - 1)}{2}$.",
            corrige: "$\\dbinom{n}{2} = 45 \\iff n(n - 1) = 90 \\iff n^2 - n - 90 = 0$. Les solutions sont $10$ et $-9$ ; comme $n$ est un entier positif, il y avait $10$ personnes."
          },
          {
            n: "3.", points: 1.5,
            texte: "On note $E = \\{1\\,;2\\,;3\\,;4\\,;5\\}$. Combien $E$ a-t-il de parties ? Combien de parties à $2$ éléments ? Vérifie que $\\displaystyle\\sum_{k=0}^{5} \\dbinom{5}{k} = 2^5$ avec la ligne $5$ du triangle de Pascal.",
            indice: "Ligne $5$ du triangle de Pascal : $1$, $5$, $10$, $10$, $5$, $1$.",
            corrige: "$E$ a $2^5 = 32$ parties, dont $\\dbinom{5}{2} = 10$ à $2$ éléments. Et $1 + 5 + 10 + 10 + 5 + 1 = 32 = 2^5$ : chaque partie a entre $0$ et $5$ éléments."
          },
          {
            n: "4.", points: 1.5,
            texte: "Démontre que, pour $1 \\leqslant k \\leqslant n$, $k\\dbinom{n}{k} = n\\dbinom{n - 1}{k - 1}$. Interprète avec une équipe de $k$ joueurs et son capitaine.",
            indice: "Écris les coefficients avec des factorielles : $k \\times \\dfrac{1}{k!} = \\dfrac{1}{(k - 1)!}$.",
            corrige: "$k\\dbinom{n}{k} = \\dfrac{k \\times n!}{k!\\,(n - k)!} = \\dfrac{n!}{(k - 1)!\\,(n - k)!} = n \\times \\dfrac{(n - 1)!}{(k - 1)!\\,(n - k)!} = n\\dbinom{n - 1}{k - 1}$, car $n - k = (n - 1) - (k - 1)$. Interprétation : choisir une équipe de $k$ joueurs puis son capitaine ($k\\dbinom{n}{k}$), c'est choisir d'abord le capitaine ($n$ choix), puis ses $k - 1$ coéquipiers parmi les $n - 1$ autres."
          }
        ]
      }
    ]
  }
};
