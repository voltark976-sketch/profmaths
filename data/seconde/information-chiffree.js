/*
  CHAPITRE : Seconde — Information chiffrée (proportions et évolutions)
  ----------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé,
  **gras**, "- " pour une puce). Dans les formules, la virgule décimale s'écrit {,} : $0{,}35$.
  video : vidéo d'aide affichée sous une notion (ici les vidéos d'Yvan Monka citées dans le dossier élève).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["seconde-information-chiffree"] = {
  niveau: "Seconde",
  numero: 3,
  titre: "Information chiffrée",
  accroche: "Proportions, pourcentages, taux d'évolution et coefficients multiplicateurs, avec la population de Mayotte en fil rouge.",

  playlist: "",
  drive: "https://drive.google.com/drive/folders/153RvVVumMoWU_bPz6w6RypIZVkocK6Pb",
  pdfs: [
    {
      titre: "Dossier élève : cours, méthodes et exercices",
      url: "https://drive.google.com/file/d/1w9K0HLSB1TRSJObeyFL9XfsGa7ZtnENo/view"
    },
    {
      titre: "Énoncés des 4 exercices corrigés en vidéo",
      url: "https://drive.google.com/file/d/1KshgCyNpiNxcjCRrcv56ALwhAwgURk1q/view"
    }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Proportion et pourcentage",
      texte:
        "Dans une population $E$ d'effectif $n_E$, une partie $A$ a pour effectif $n_A$. La **proportion** de $A$ dans $E$ est\n\n" +
        "$p = \\dfrac{n_A}{n_E}$, avec toujours $0 \\leqslant p \\leqslant 1$.\n\n" +
        "- Elle s'écrit en fraction, en décimal ou en pourcentage : $\\dfrac{3}{8} = 0{,}375 = 37{,}5\\,\\%$.\n" +
        "- Pour trouver la partie : $n_A = p \\times n_E$. Pour trouver le tout : $n_E = \\dfrac{n_A}{p}$.\n\n" +
        "Une proportion n'a de sens qu'avec sa **population de référence**, souvent introduite par « parmi », « des » ou « sur ».",
      video: { titre: "Vidéo d'Yvan Monka : passer d'un effectif à une proportion", youtube: "https://youtu.be/r8S46rk9x9k" },
      exemple: {
        enonce: "Au marché de Mamoudzou, une commerçante a 240 mangues et en vend 84 le matin. Quelle proportion a-t-elle vendue ?",
        solution: "$p = \\dfrac{84}{240} = 0{,}35 = 35\\,\\%$. Elle a vendu $35\\,\\%$ de ses mangues le matin."
      }
    },
    {
      titre: "Proportion de proportion",
      texte:
        "Si $p_1$ des $E$ sont des $A$, et $p_2$ des $A$ sont des $C$, alors la proportion de $C$ dans $E$ est\n\n" +
        "$p = p_1 \\times p_2$.\n\n" +
        "On **multiplie**, on n'additionne pas : $30\\,\\%$ de $58\\,\\%$, c'est $0{,}30 \\times 0{,}58 = 0{,}174 = 17{,}4\\,\\%$.",
      video: { titre: "Vidéo d'Yvan Monka : calculer un pourcentage de pourcentage", youtube: "https://youtu.be/nPPRsOW2veU" },
      exemple: {
        enonce: "À N'Gouja, $65\\,\\%$ des tortues observées sont des tortues vertes, et $40\\,\\%$ des tortues vertes sont des femelles. Quelle proportion des tortues observées sont des tortues vertes femelles ?",
        solution: "$p = 0{,}65 \\times 0{,}40 = 0{,}26$. **$26\\,\\%$** des tortues observées sont des tortues vertes femelles."
      }
    },
    {
      titre: "Variation absolue et taux d'évolution",
      texte:
        "Une quantité passe d'une valeur initiale $V_1$ à une valeur finale $V_2$.\n\n" +
        "- **Variation absolue** : $V_2 - V_1$, dans l'unité de la quantité.\n" +
        "- **Taux d'évolution** : $t = \\dfrac{V_2 - V_1}{V_1}$, sans unité, souvent en pourcentage.\n\n" +
        "Si $t > 0$, c'est une hausse ; si $t < 0$, c'est une baisse.",
      video: { titre: "Vidéo d'Yvan Monka : déterminer un taux d'évolution", youtube: "https://youtu.be/Y48-iK7Cp20" },
      exemple: {
        enonce: "Mayotte comptait $256\\,518$ habitants en 2017 et $323\\,153$ au 1er janvier 2026 (Insee). Calculer la variation absolue et le taux d'évolution.",
        solution: "Variation absolue : $323\\,153 - 256\\,518 = 66\\,635$ habitants.\n\nTaux : $t = \\dfrac{66\\,635}{256\\,518} \\approx 0{,}260$, soit environ $+26\\,\\%$. Les deux titres « +26 % » et « 66 635 habitants de plus » sont donc vrais en même temps."
      }
    },
    {
      titre: "Le coefficient multiplicateur",
      texte:
        "Le **coefficient multiplicateur** est $CM = \\dfrac{V_2}{V_1}$, de sorte que $V_2 = V_1 \\times CM$.\n\n" +
        "- Augmenter de $t\\,\\%$, c'est multiplier par $1 + \\dfrac{t}{100}$ : $+5\\,\\%$ donne $\\times 1{,}05$.\n" +
        "- Diminuer de $t\\,\\%$, c'est multiplier par $1 - \\dfrac{t}{100}$ : $-5\\,\\%$ donne $\\times 0{,}95$.\n" +
        "- Dans l'autre sens : $t = CM - 1$.\n\n" +
        "Pour retrouver une valeur initiale, on **divise** par le coefficient : $V_1 = \\dfrac{V_2}{CM}$.",
      figure: "prix-evolution",
      video: { titre: "Vidéo d'Yvan Monka : appliquer une hausse ou une baisse", youtube: "https://youtu.be/-5QmcMuzy5I" },
      exemple: {
        enonce: "Après une hausse de $8\\,\\%$, un loyer vaut $540$ €. Quel était le loyer avant la hausse ?",
        solution: "$CM = 1{,}08$ donc $V_1 = \\dfrac{540}{1{,}08} = 500$ €.\n\nAttention : retirer $8\\,\\%$ de $540$ donne $496{,}80$ €, ce qui est faux, car les $8\\,\\%$ portaient sur l'ancien loyer."
      }
    },
    {
      titre: "Évolutions successives et évolution réciproque",
      texte:
        "- **Successives** : on multiplie les coefficients, $CM = CM_1 \\times CM_2$, puis $t = CM - 1$. Les taux ne s'additionnent pas.\n" +
        "- **Réciproque** (pour revenir à la valeur de départ) : $CM' = \\dfrac{1}{CM}$, puis $t' = CM' - 1$.",
      video: { titre: "Vidéo d'Yvan Monka : taux d'évolution successifs", youtube: "https://youtu.be/qOg2eXd8Hv0" },
      exemple: {
        enonce: "Le kilo de tomates coûte 4 € en octobre. Il augmente de $35\\,\\%$ en décembre, puis baisse de $20\\,\\%$ en février. Quel est le taux global ? Quel taux ramènerait le prix à 4 € ?",
        solution: "$CM = 1{,}35 \\times 0{,}8 = 1{,}08$ : hausse globale de $8\\,\\%$ (et non $15\\,\\%$). Le prix passe de 4 € à $4{,}32$ €.\n\nRéciproque : $\\dfrac{1}{1{,}08} \\approx 0{,}9259$, soit une baisse d'environ $7{,}41\\,\\%$."
      }
    },
    {
      titre: "Points de pourcentage ou pourcentage ?",
      texte:
        "« $80\\,\\%$ des élèves sont externes » est un pourcentage de **proportion**. « Le prix a baissé de $20\\,\\%$ » est un pourcentage d'**évolution**.\n\n" +
        "Quand une proportion évolue, l'écart se compte en **points**, et le taux d'évolution en **%**.",
      exemple: {
        enonce: "Le taux de réussite au bac d'un lycée passe de $75\\,\\%$ à $81\\,\\%$. Un journal titre « +6 % ». Est-ce correct ?",
        solution: "Non. Le taux a gagné $81 - 75 = 6$ **points**. Son taux d'évolution est $\\dfrac{81 - 75}{75} = 0{,}08$, soit $+8\\,\\%$."
      }
    }
  ],

  videos: [
    { titre: "Exercice 1 · Comparer deux prix", type: "Application", youtube: "" },
    { titre: "Exercice 2 · Évolutions et fonctions", type: "Graphique", youtube: "" },
    { titre: "Exercice 3 · Vrai ou faux ?", type: "Raisonnement", youtube: "" },
    { titre: "Exercice 4 · La coopérative agricole de Coconi", type: "Synthèse", youtube: "" }
  ],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "proportion-pourcentage", titre: "Calculer une proportion", etape: "Proportions", nb: 5 },
    { type: "partie-tout", titre: "Retrouver la partie ou le tout", etape: "Proportions", nb: 5 },
    { type: "proportion-de-proportion", titre: "Pourcentage de pourcentage", etape: "Proportions", nb: 4 },
    { type: "taux-evolution", titre: "Calculer un taux d'évolution", etape: "Évolutions", nb: 5 },
    { type: "coefficient", titre: "Taux et coefficient multiplicateur", etape: "Évolutions", nb: 5 },
    { type: "appliquer-evolution", titre: "Appliquer une évolution, retrouver le prix initial", etape: "Évolutions", nb: 5 },
    { type: "evolutions-successives", titre: "Évolutions successives", etape: "Défi", nb: 5 },
    { type: "taux-reciproque", titre: "Taux réciproque", etape: "Défi", nb: 4 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    {
      question: "27 élèves sur 45 ont choisi l'anglais renforcé. Quel pourcentage cela représente-t-il ?",
      choix: ["$60\\,\\%$", "$27\\,\\%$", "$45\\,\\%$", "$1{,}67\\,\\%$"],
      bonne: 0,
      explication: "$\\dfrac{27}{45} = 0{,}6 = 60\\,\\%$."
    },
    {
      question: "Dans une classe, les 21 filles représentent $60\\,\\%$ des élèves. Combien y a-t-il d'élèves ?",
      choix: ["$12{,}6$", "$35$", "$33{,}6$", "$81$"],
      bonne: 1,
      explication: "On cherche le tout : $n_E = \\dfrac{21}{0{,}6} = 35$. Le tout est toujours plus grand que la partie."
    },
    {
      question: "Que vaut $40\\,\\%$ de $35\\,\\%$ ?",
      choix: ["$75\\,\\%$", "$5\\,\\%$", "$14\\,\\%$", "$1\\,400\\,\\%$"],
      bonne: 2,
      explication: "On multiplie : $0{,}40 \\times 0{,}35 = 0{,}14 = 14\\,\\%$."
    },
    {
      question: "Un effectif passe de 64 à 80. Quel est le taux d'évolution ?",
      choix: ["$+16\\,\\%$", "$+20\\,\\%$", "$+25\\,\\%$", "$+80\\,\\%$"],
      bonne: 2,
      explication: "$t = \\dfrac{80 - 64}{64} = \\dfrac{16}{64} = 0{,}25 = +25\\,\\%$. $16$ est la variation absolue, pas le taux."
    },
    {
      question: "Diminuer une quantité de $7\\,\\%$ revient à la multiplier par :",
      choix: ["$0{,}7$", "$0{,}93$", "$1{,}07$", "$0{,}07$"],
      bonne: 1,
      explication: "$CM = 1 - 0{,}07 = 0{,}93$. Le coefficient $0{,}7$ correspond à une baisse de $30\\,\\%$."
    },
    {
      question: "Après une baisse de $15\\,\\%$, un prix vaut 68 €. Quel était le prix initial ?",
      choix: ["$78{,}20$ €", "$83$ €", "$80$ €", "$57{,}80$ €"],
      bonne: 2,
      explication: "$V_1 = \\dfrac{68}{0{,}85} = 80$ €. Ajouter $15\\,\\%$ à $68$ € ($78{,}20$ €) est faux : les $15\\,\\%$ portaient sur l'ancien prix."
    },
    {
      question: "Un prix augmente de $40\\,\\%$, puis baisse de $40\\,\\%$. Quel est le taux global ?",
      choix: ["$0\\,\\%$", "$-16\\,\\%$", "$+16\\,\\%$", "$-4\\,\\%$"],
      bonne: 1,
      explication: "$CM = 1{,}4 \\times 0{,}6 = 0{,}84$, donc $t = -0{,}16 = -16\\,\\%$. On ne revient pas au prix de départ."
    },
    {
      question: "Un magasin affiche « $-30\\,\\%$, puis $-20\\,\\%$ supplémentaires en caisse ». Quelle est la remise globale ?",
      choix: ["$50\\,\\%$", "$44\\,\\%$", "$56\\,\\%$", "$10\\,\\%$"],
      bonne: 1,
      explication: "$CM = 0{,}7 \\times 0{,}8 = 0{,}56$, donc $t = -0{,}44$ : la remise globale est de $44\\,\\%$."
    },
    {
      question: "Quel est le taux réciproque d'une hausse de $25\\,\\%$ ?",
      choix: ["$-25\\,\\%$", "$-20\\,\\%$", "$-75\\,\\%$", "$+25\\,\\%$"],
      bonne: 1,
      explication: "$CM' = \\dfrac{1}{1{,}25} = 0{,}8$, donc $t' = -20\\,\\%$. Vérification : $100 \\times 1{,}25 \\times 0{,}8 = 100$."
    },
    {
      question: "La part des femmes d'une coopérative passe de $40\\,\\%$ à $45\\,\\%$. Quelle phrase est correcte ?",
      choix: ["La part a augmenté de $5\\,\\%$.", "La part a augmenté de $5$ points, soit $+12{,}5\\,\\%$.", "La part a augmenté de $45\\,\\%$.", "La part a augmenté de $12{,}5$ points."],
      bonne: 1,
      explication: "Écart : $45 - 40 = 5$ points. Taux d'évolution : $\\dfrac{5}{40} = 0{,}125 = +12{,}5\\,\\%$."
    }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Passer d'un effectif à une proportion, et inversement",
      etapes: [
        "Identifier la population de référence $E$ et la partie $A$.",
        "Repérer les deux nombres connus parmi $n_A$, $n_E$ et $p$.",
        "Calculer le troisième : $p = \\dfrac{n_A}{n_E}$, $n_A = p \\times n_E$ ou $n_E = \\dfrac{n_A}{p}$.",
        "Pour un pourcentage, écrire d'abord $t\\,\\% = \\dfrac{t}{100}$ (par exemple $45\\,\\% = 0{,}45$)."
      ],
      exemple: "$42$ filles représentent $35\\,\\%$ des adhérents : $n_E = \\dfrac{42}{0{,}35} = 120$ adhérents."
    },
    {
      titre: "Calculer une proportion de proportion",
      etapes: [
        "Repérer les trois ensembles emboîtés $C \\subset A \\subset E$ (un schéma aide).",
        "Écrire chaque proportion avec sa référence : « $p_1$ des $E$ », « $p_2$ des $A$ ».",
        "Multiplier : $p = p_1 \\times p_2$, puis conclure par une phrase."
      ],
      exemple: "$32\\,\\%$ des élèves sont en Seconde, $55\\,\\%$ d'entre eux sont des filles : $0{,}32 \\times 0{,}55 = 17{,}6\\,\\%$."
    },
    {
      titre: "Calculer un taux d'évolution",
      etapes: [
        "Repérer la valeur initiale $V_1$ (la plus ancienne, ou la référence) et la valeur finale $V_2$.",
        "Calculer $t = \\dfrac{V_2 - V_1}{V_1}$ (ou $CM = \\dfrac{V_2}{V_1}$ puis $t = CM - 1$).",
        "Écrire $t$ en pourcentage et conclure : hausse ou baisse de … %."
      ],
      exemple: "Bananes : de $2{,}50$ € à $2$ €, $t = \\dfrac{-0{,}50}{2{,}50} = -0{,}2$, soit une baisse de $20\\,\\%$."
    },
    {
      titre: "Appliquer une évolution ou retrouver la valeur initiale",
      etapes: [
        "Traduire l'évolution : $CM = 1 + \\dfrac{t}{100}$ (hausse) ou $CM = 1 - \\dfrac{t}{100}$ (baisse).",
        "Valeur finale : $V_2 = V_1 \\times CM$.",
        "Valeur initiale : $V_1 = \\dfrac{V_2}{CM}$ (on divise, on n'applique pas l'évolution contraire)."
      ],
      exemple: "Kayak à $450$ € soldé à $-30\\,\\%$ : $450 \\times 0{,}7 = 315$ €."
    },
    {
      titre: "Taux global et taux réciproque",
      etapes: [
        "Écrire le coefficient multiplicateur de chaque évolution.",
        "Taux global : multiplier les coefficients, puis retrancher $1$.",
        "Taux réciproque : calculer $\\dfrac{1}{CM}$, puis retrancher $1$.",
        "Donner la valeur exacte si possible, sinon un arrondi en pourcentage."
      ],
      exemple: "$+20\\,\\%$ puis $-10\\,\\%$ : $1{,}2 \\times 0{,}9 = 1{,}08$, soit $+8\\,\\%$. Réciproque de $+25\\,\\%$ : $\\dfrac{1}{1{,}25} = 0{,}8$, soit $-20\\,\\%$."
    }
  ],
  erreurs: [
    "Calculer un pourcentage de la **partie** au lieu de chercher le **tout** : le tout est toujours plus grand que la partie.",
    "Additionner deux proportions emboîtées : $30\\,\\%$ de $58\\,\\%$ ne fait pas $88\\,\\%$.",
    "Confondre variation absolue (en €, en habitants) et taux d'évolution (sans unité).",
    "Écrire $0{,}7$ pour une baisse de $7\\,\\%$ : c'est $0{,}93$.",
    "Annuler une hausse de $8\\,\\%$ en retirant $8\\,\\%$ : il faut diviser par $1{,}08$.",
    "Additionner des taux successifs, ou croire que la réciproque de $+25\\,\\%$ est $-25\\,\\%$.",
    "Écrire « +6 % » quand une proportion passe de $75\\,\\%$ à $81\\,\\%$ : c'est $+6$ points, soit $+8\\,\\%$."
  ]
};
