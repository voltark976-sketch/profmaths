/*
  ENTRAÎNEMENT : 3e — chapitre 1, Calcul numérique : fractions et puissances
  Onglets « Révisions express » et « Entraînement évaluation » du chapitre troisieme-calcul-numerique.
  Format : voir data/premiere/evaluation/second-degre-2.js. Exercices type brevet.
  Données fictives (jardin) ; distances et vitesse de la lumière arrondies comme dans les manuels.
  Nombres différents de ceux du cours, de la méthode et du QCM du chapitre.
*/
window.EVALUATIONS = window.EVALUATIONS || {};
window.EVALUATIONS["troisieme-calcul-numerique"] = {
  revisions: {
    intro: "Fractions, puissances et écriture scientifique en un coup d'œil, comme au brevet. Relis, repère les pièges, puis teste-toi.",
    essentiel: [
      {
        titre: "Priorités et fractions",
        texte: "On calcule d'abord les parenthèses, puis les multiplications et divisions, puis les additions et soustractions. Pour additionner ou soustraire des fractions, on les met au **même dénominateur**."
      },
      {
        titre: "Multiplier, diviser",
        texte: "$\\dfrac{a}{b} \\times \\dfrac{c}{d} = \\dfrac{a \\times c}{b \\times d}$. Diviser par une fraction, c'est multiplier par son **inverse** : $\\dfrac{a}{b} \\div \\dfrac{c}{d} = \\dfrac{a}{b} \\times \\dfrac{d}{c}$. On simplifie le résultat."
      },
      {
        titre: "Règles des puissances",
        texte:
          "- $a^n \\times a^p = a^{n+p}$ et $\\dfrac{a^n}{a^p} = a^{n-p}$ ;\n" +
          "- $\\left(a^n\\right)^p = a^{n \\times p}$ ;\n" +
          "- $a^0 = 1$ et $a^{-n} = \\dfrac{1}{a^n}$ (pour $a \\neq 0$)."
      },
      {
        titre: "Puissances de $10$",
        texte: "$10^n$ s'écrit avec un $1$ suivi de $n$ zéros : $10^4 = 10\\,000$. $10^{-n}$ s'écrit avec $n$ chiffres après la virgule : $10^{-3} = 0{,}001$."
      },
      {
        titre: "Écriture scientifique",
        texte: "Un nombre est en écriture scientifique s'il s'écrit $a \\times 10^n$ avec $1 \\leqslant a < 10$ : $47\\,000 = 4{,}7 \\times 10^4$ et $0{,}0032 = 3{,}2 \\times 10^{-3}$."
      },
      {
        titre: "Préfixes",
        texte: "kilo : $10^3$ ; méga : $10^6$ ; giga : $10^9$ ; téra : $10^{12}$. milli : $10^{-3}$ ; micro : $10^{-6}$ ; nano : $10^{-9}$."
      }
    ],
    pieges: [
      "$(-3)^2 = 9$ mais $-3^2 = -9$ : le carré ne porte que sur $3$.",
      "$2^3 = 2 \\times 2 \\times 2 = 8$, et non $2 \\times 3$.",
      "Additionner les numérateurs entre eux et les dénominateurs entre eux.",
      "Croire que $10^{-2}$ est un nombre négatif : c'est $0{,}01$.",
      "Laisser $35 \\times 10^4$ : ce n'est pas une écriture scientifique ($3{,}5 \\times 10^5$).",
      "$\\left(2 \\times 10^3\\right)^2 = 4 \\times 10^6$ : le $2$ aussi est au carré."
    ]
  },

  evaluation: {
    intro: "Trois exercices comme au brevet (environ $60$ minutes en tout). Cherche d'abord sur une feuille, puis ouvre l'indice ou le corrigé de chaque question.",
    exercices: [
      {
        titre: "Le jardin partagé",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Un jardin partagé de $450$ m² est découpé ainsi : les $\\dfrac{2}{5}$ de la surface pour les légumes, $\\dfrac{1}{3}$ pour les fleurs, et le reste pour les arbres fruitiers (données fictives). Les résultats en fraction sont à donner sous forme irréductible.",
        questions: [
          { n: "1.", points: 1.5, texte: "Quelle fraction de la surface est réservée aux arbres fruitiers ?", indice: "Le jardin entier, c'est $1$. Mets tout au dénominateur $15$.", corrige: "$1 - \\dfrac{2}{5} - \\dfrac{1}{3} = \\dfrac{15}{15} - \\dfrac{6}{15} - \\dfrac{5}{15} = \\dfrac{4}{15}$ : les arbres fruitiers occupent les $\\dfrac{4}{15}$ du jardin." },
          { n: "2.", points: 2, texte: "Calcule la surface de chacune des trois parties.", indice: "Prendre les $\\dfrac{2}{5}$ de $450$, c'est calculer $\\dfrac{2}{5} \\times 450$.", corrige: "Légumes : $\\dfrac{2}{5} \\times 450 = 180$ m². Fleurs : $\\dfrac{1}{3} \\times 450 = 150$ m². Arbres fruitiers : $\\dfrac{4}{15} \\times 450 = 120$ m².\n\nVérification : $180 + 150 + 120 = 450$." },
          { n: "3.", points: 1.5, texte: "Les brèdes occupent les $\\dfrac{3}{4}$ de la partie légumes. Quelle fraction du jardin entier représentent-elles ? Quelle surface ?", indice: "Prendre les $\\dfrac{3}{4}$ des $\\dfrac{2}{5}$, c'est multiplier.", corrige: "$\\dfrac{3}{4} \\times \\dfrac{2}{5} = \\dfrac{6}{20} = \\dfrac{3}{10}$ du jardin, soit $\\dfrac{3}{10} \\times 450 = 135$ m²." },
          { n: "4.", points: 2, texte: "Calcule $B = \\left(\\dfrac{1}{3} - \\dfrac{1}{4}\\right) \\div \\dfrac{5}{6}$ et donne le résultat sous forme de fraction irréductible.", indice: "Commence par la parenthèse, puis divise en multipliant par l'inverse de $\\dfrac{5}{6}$.", corrige: "$\\dfrac{1}{3} - \\dfrac{1}{4} = \\dfrac{4}{12} - \\dfrac{3}{12} = \\dfrac{1}{12}$\n\n$B = \\dfrac{1}{12} \\times \\dfrac{6}{5} = \\dfrac{6}{60} = \\dfrac{1}{10}$" }
        ]
      },
      {
        titre: "Calculs avec des puissances",
        duree: 20, points: 7, calculatrice: false,
        contexte: "Les questions sont indépendantes. Détaille chaque étape, sans calculatrice.",
        questions: [
          { n: "1.", points: 1, texte: "Écris $C = \\dfrac{5^7 \\times 5^{-4}}{5^2}$ sous la forme d'une puissance de $5$.", indice: "Ajoute les exposants au numérateur, puis soustrais celui du dénominateur.", corrige: "$C = \\dfrac{5^{7 + (-4)}}{5^2} = \\dfrac{5^3}{5^2} = 5^{3 - 2} = 5^1$, soit $C = 5$." },
          { n: "2.", points: 1.5, texte: "Calcule $D = \\left(10^{-2}\\right)^3 \\times 10^8$.", indice: "$\\left(10^{-2}\\right)^3 = 10^{-2 \\times 3}$.", corrige: "$D = 10^{-6} \\times 10^8 = 10^{-6 + 8} = 10^2 = 100$." },
          { n: "3.", points: 1.5, texte: "Donne l'écriture scientifique de $E = \\left(6 \\times 10^{-4}\\right) \\times \\left(5 \\times 10^7\\right)$.", indice: "Multiplie $6$ par $5$, puis les puissances de $10$ entre elles.", corrige: "$E = 6 \\times 5 \\times 10^{-4 + 7} = 30 \\times 10^3$. Or $30 = 3 \\times 10^1$, donc $E = 3 \\times 10^4$." },
          { n: "4.", points: 1.5, texte: "Donne l'écriture scientifique de $F = \\dfrac{4{,}5 \\times 10^8}{9 \\times 10^3}$.", indice: "Divise $4{,}5$ par $9$, et les puissances de $10$ entre elles.", corrige: "$F = \\dfrac{4{,}5}{9} \\times 10^{8 - 3} = 0{,}5 \\times 10^5$. Or $0{,}5 = 5 \\times 10^{-1}$, donc $F = 5 \\times 10^4$." },
          { n: "5.", points: 1.5, texte: "Vrai ou faux : $2^{10}$ est plus grand que $10^3$. Justifie.", indice: "Calcule $2^{10}$ en doublant : $2$, $4$, $8$, $16$…", corrige: "$2^{10} = 1\\,024$ et $10^3 = 1\\,000$ : l'affirmation est **vraie**. C'est pour cela qu'un kilooctet a longtemps été compté comme $1\\,024$ octets." }
        ]
      },
      {
        titre: "La vitesse de la lumière",
        duree: 20, points: 6, calculatrice: true,
        contexte: "La lumière parcourt environ $3 \\times 10^5$ km en une seconde. La distance moyenne entre la Terre et le Soleil est d'environ $1{,}5 \\times 10^8$ km.",
        questions: [
          { n: "1.", points: 2, texte: "Combien de temps la lumière du Soleil met-elle pour arriver sur Terre ? Donne le résultat en secondes, puis en minutes et secondes.", indice: "Temps $=$ distance $\\div$ vitesse.", corrige: "$\\dfrac{1{,}5 \\times 10^8}{3 \\times 10^5} = 0{,}5 \\times 10^3 = 500$ secondes, soit $8$ minutes et $20$ secondes, car $500 = 8 \\times 60 + 20$." },
          { n: "2.", points: 2, texte: "Une année-lumière est la distance parcourue par la lumière en une année. Calcule-la en kilomètres (avec $365$ jours dans l'année) et donne son écriture scientifique arrondie au centième.", indice: "Compte les secondes dans une année : $365 \\times 24 \\times 3\\,600$.", corrige: "Une année compte $365 \\times 24 \\times 3\\,600 = 31\\,536\\,000$ secondes. La lumière y parcourt :\n\n$3 \\times 10^5 \\times 31\\,536\\,000 = 9\\,460\\,800\\,000\\,000$ km\n\nsoit environ $9{,}46 \\times 10^{12}$ km." },
          { n: "3.", points: 1, texte: "Un satellite de télévision est à $3{,}6 \\times 10^4$ km au-dessus de l'équateur. Combien de temps met un signal pour faire l'aller-retour entre la Terre et ce satellite ?", corrige: "L'aller-retour fait $2 \\times 3{,}6 \\times 10^4 = 7{,}2 \\times 10^4$ km, parcourus en $\\dfrac{7{,}2 \\times 10^4}{3 \\times 10^5} = 0{,}24$ seconde." },
          { n: "4.", points: 1, texte: "Un disque dur a une capacité de $1$ téraoctet, soit $10^{12}$ octets. Combien de photos de $4$ Mo ($4 \\times 10^6$ octets) peut-il contenir ?", corrige: "$\\dfrac{10^{12}}{4 \\times 10^6} = 0{,}25 \\times 10^6 = 250\\,000$ photos." }
        ]
      }
    ]
  }
};
