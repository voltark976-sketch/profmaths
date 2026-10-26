/*
  CHAPITRE : CE1 — Les fractions
  -------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE1, « Les fractions » (fractions d'un tout, inférieures ou égales à 1,
  dénominateurs 2, 3, 4, 5, 6, 8 ou 10) :
  - moitié, demi, quart ; fractions unitaires 1/2 … 1/10 ; fractions inférieures ou égales à 1 (3/8 = 1/8 + 1/8 + 1/8 ; 5/5 = 1) ;
  - numérateur et dénominateur ; comparer des fractions de même dénominateur, et des fractions de numérateur 1 ;
  - additionner et soustraire des fractions de même dénominateur ; complément d'une fraction au tout.
  Les réponses en fraction s'écrivent « 3/8 » (annoncé dans la consigne).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce1-fractions"] = {
  niveau: "CE1",
  numero: 4,
  titre: "Les fractions",
  accroche: "Partager un tout en parts égales : un demi, un tiers, un quart… Lire, comparer et ajouter des fractions.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "Partager en parts égales",
      video: { titre: "Vidéo de Maître Lucas : lire, écrire et représenter des fractions", youtube: "https://youtu.be/fEnWuWy2oX8" },
      texte:
        "Quand on partage un tout en parts **égales** :\n\n" +
        "- en $2$ parts : chaque part est **un demi** ($\\dfrac{1}{2}$), la moitié ;\n" +
        "- en $3$ parts : **un tiers** ($\\dfrac{1}{3}$) ; en $4$ parts : **un quart** ($\\dfrac{1}{4}$) ;\n" +
        "- en $5$, $6$, $8$, $10$ parts : un cinquième, un sixième, un huitième, un dixième.\n\n" +
        "Le disque ci-contre est partagé en $4$ parts égales : la part coloriée est un quart du disque.",
      figure: "e1f-cours-disque",
      exemple: {
        enonce: "Une pizza est partagée en $8$ parts égales. Comment appelle-t-on une part ?",
        solution: "Un huitième de la pizza : $\\dfrac{1}{8}$."
      }
    },
    {
      titre: "Numérateur et dénominateur",
      video: { titre: "Vidéo de Maître Lucas : les fractions, demi et quart", youtube: "https://youtu.be/sMSuVVGW47Y" },
      texte:
        "Dans $\\dfrac{3}{8}$ :\n\n" +
        "- le **dénominateur** $8$ (en bas) dit en combien de parts égales on a partagé le tout ;\n" +
        "- le **numérateur** $3$ (en haut) dit combien de parts on prend.\n\n" +
        "$\\dfrac{3}{8}$ se lit « trois huitièmes » : $\\dfrac{3}{8} = \\dfrac{1}{8} + \\dfrac{1}{8} + \\dfrac{1}{8}$.\n\n" +
        "Si on prend toutes les parts, on a le tout : $\\dfrac{5}{5} = 1$.",
      figure: "e1f-cours-bande",
      exemple: {
        enonce: "Une bande est partagée en $5$ parts égales et $2$ sont coloriées. Quelle fraction est coloriée ?",
        solution: "$\\dfrac{2}{5}$ (deux cinquièmes)."
      }
    },
    {
      titre: "Comparer des fractions",
      video: { titre: "Vidéo de Maître Lucas : comparer des fractions", youtube: "https://youtu.be/eVvg3MRr9X8" },
      texte:
        "- **Même dénominateur** : les parts ont la même taille. $\\dfrac{2}{5} < \\dfrac{3}{5}$ car $2$ parts, c'est moins que $3$ parts.\n" +
        "- **Numérateur $1$** : plus on partage, plus la part est petite. $\\dfrac{1}{5} < \\dfrac{1}{3}$ !\n\n" +
        "Attention : $5$ est plus grand que $3$, mais un cinquième est plus petit qu'un tiers.",
      figure: "e1f-cours-comparer",
      exemple: {
        enonce: "Compare $\\dfrac{1}{2}$ et $\\dfrac{1}{4}$.",
        solution: "Une moitié est plus grande qu'un quart : $\\dfrac{1}{2} > \\dfrac{1}{4}$."
      }
    },
    {
      titre: "Ajouter et retirer des fractions",
      video: { titre: "Vidéo de Maître Lucas : additionner et soustraire des fractions", youtube: "https://youtu.be/v45W57vab9U" },
      texte:
        "Avec le **même dénominateur**, on ajoute ou on retire les parts ; le dénominateur ne change pas :\n\n" +
        "- $\\dfrac{1}{5} + \\dfrac{2}{5} = \\dfrac{3}{5}$ ;\n" +
        "- $\\dfrac{2}{3} - \\dfrac{1}{3} = \\dfrac{1}{3}$ ;\n" +
        "- $\\dfrac{2}{5} + \\dfrac{3}{5} = \\dfrac{5}{5} = 1$.\n\n" +
        "Pour écrire une fraction dans une réponse, tape « $3/5$ » pour $\\dfrac{3}{5}$.",
      exemple: {
        enonce: "Lucie a colorié les $\\dfrac{3}{8}$ d'une figure en bleu, le reste en jaune. Quelle fraction est en jaune ?",
        solution: "Le tout, c'est $\\dfrac{8}{8}$ : $\\dfrac{8}{8} - \\dfrac{3}{8} = \\dfrac{5}{8}$."
      }
    }
  ],

  exercices: [
    { type: "e1f-lire", titre: "Lire une fraction", etape: "Comprendre les fractions", nb: 6 },
    { type: "e1f-comparer", titre: "Comparer des fractions", etape: "Comparer et calculer", nb: 6 },
    { type: "e1f-calculer", titre: "Ajouter et retirer des fractions", etape: "Comparer et calculer", nb: 6 }
  ],

  qcm: [
    { question: "Quelle fraction est coloriée ?", figure: "e1f-qcm-bande", choix: ["$\\dfrac{2}{5}$", "$\\dfrac{5}{2}$", "$\\dfrac{3}{5}$", "$\\dfrac{2}{3}$"], bonne: 0, explication: "$2$ parts coloriées sur $5$ parts égales." },
    { question: "Quelle fraction du disque est coloriée ?", figure: "e1f-qcm-disque", choix: ["$\\dfrac{5}{6}$", "$\\dfrac{1}{6}$", "$\\dfrac{6}{5}$", "$\\dfrac{5}{5}$"], bonne: 0, explication: "$5$ parts sur $6$." },
    { question: "$\\dfrac{1}{4}$ se lit :", choix: ["un quart", "un quatrième", "quatre", "un tiers"], bonne: 0, explication: "Une part sur quatre : un quart." },
    { question: "$\\dfrac{3}{10}$ se lit :", choix: ["trois dixièmes", "dix tiers", "trois sur dix cents", "treize"], bonne: 0, explication: "Trois parts de dix : trois dixièmes." },
    { question: "Dans $\\dfrac{5}{8}$, le dénominateur est :", choix: ["$8$", "$5$", "$13$", "$3$"], bonne: 0, explication: "Le dénominateur est en bas." },
    { question: "La moitié, c'est :", choix: ["$\\dfrac{1}{2}$", "$\\dfrac{1}{4}$", "$\\dfrac{2}{1}$", "$\\dfrac{1}{3}$"], bonne: 0, explication: "Une part sur deux." },
    { question: "$\\dfrac{2}{6} \\;\\ldots\\; \\dfrac{5}{6}$", choix: ["$<$", "$>$", "$=$"], bonne: 0, explication: "Même dénominateur : $2 < 5$." },
    { question: "$\\dfrac{1}{3} \\;\\ldots\\; \\dfrac{1}{6}$", choix: ["$>$", "$<$", "$=$"], bonne: 0, explication: "Un tiers est plus grand qu'un sixième." },
    { question: "La plus petite fraction est :", choix: ["$\\dfrac{1}{10}$", "$\\dfrac{1}{2}$", "$\\dfrac{1}{4}$", "$\\dfrac{1}{5}$"], bonne: 0, explication: "Plus on partage, plus la part est petite." },
    { question: "$\\dfrac{3}{8} = $", choix: ["$\\dfrac{1}{8} + \\dfrac{1}{8} + \\dfrac{1}{8}$", "$\\dfrac{1}{3} + \\dfrac{1}{8}$", "$\\dfrac{3}{1} + \\dfrac{8}{1}$", "$\\dfrac{1}{8} + \\dfrac{1}{8}$"], bonne: 0, explication: "Trois huitièmes, c'est trois fois un huitième." },
    { question: "$\\dfrac{4}{4} = $", choix: ["$1$", "$4$", "$0$", "$\\dfrac{1}{4}$"], bonne: 0, explication: "Toutes les parts : le tout." },
    { question: "$\\dfrac{1}{5} + \\dfrac{2}{5} = $", choix: ["$\\dfrac{3}{5}$", "$\\dfrac{3}{10}$", "$\\dfrac{2}{5}$", "$\\dfrac{1}{5}$"], bonne: 0, explication: "Le dénominateur ne change pas." },
    { question: "$\\dfrac{7}{8} - \\dfrac{3}{8} = $", choix: ["$\\dfrac{4}{8}$", "$\\dfrac{4}{0}$", "$\\dfrac{10}{8}$", "$\\dfrac{4}{16}$"], bonne: 0, explication: "$7 - 3 = 4$ huitièmes." },
    { question: "$\\dfrac{2}{3} + \\dfrac{1}{3} = $", choix: ["$1$", "$\\dfrac{3}{6}$", "$\\dfrac{1}{3}$", "$3$"], bonne: 0, explication: "$\\dfrac{3}{3} = 1$." },
    { question: "On a colorié $\\dfrac{1}{4}$ d'un carré. Quelle fraction n'est pas coloriée ?", choix: ["$\\dfrac{3}{4}$", "$\\dfrac{1}{4}$", "$\\dfrac{4}{1}$", "$\\dfrac{2}{4}$"], bonne: 0, explication: "$\\dfrac{4}{4} - \\dfrac{1}{4} = \\dfrac{3}{4}$." },
    { question: "Pour parler de fractions, les parts doivent être :", choix: ["égales", "de couleurs différentes", "rondes", "petites"], bonne: 0, explication: "On partage toujours en parts égales." },
    { question: "Un gâteau est coupé en $6$ parts égales ; Awa en mange $2$. Elle a mangé :", choix: ["$\\dfrac{2}{6}$ du gâteau", "$\\dfrac{6}{2}$ du gâteau", "$\\dfrac{2}{8}$ du gâteau", "$\\dfrac{4}{6}$ du gâteau"], bonne: 0, explication: "$2$ parts sur $6$." },
    { question: "Trois fois un sixième, c'est :", choix: ["$\\dfrac{3}{6}$, un demi", "$\\dfrac{1}{18}$", "$\\dfrac{6}{3}$", "$\\dfrac{3}{3}$"], bonne: 0, explication: "$\\dfrac{3}{6}$, la moitié du tout." }
  ],

  methode: [
    {
      titre: "Lire une fraction sur un dessin",
      etapes: [
        "Vérifie que les parts sont égales.",
        "Compte toutes les parts : c'est le dénominateur (en bas).",
        "Compte les parts coloriées : c'est le numérateur (en haut)."
      ],
      figure: "e1f-cours-bande",
      exemple: "$3$ parts coloriées sur $8$ : $\\dfrac{3}{8}$."
    },
    {
      titre: "Ajouter des fractions de même dénominateur",
      etapes: [
        "Vérifie que les dénominateurs sont les mêmes.",
        "Ajoute (ou retire) les numérateurs.",
        "Garde le dénominateur."
      ],
      exemple: "$\\dfrac{2}{10} + \\dfrac{5}{10} = \\dfrac{7}{10}$."
    }
  ],
  erreurs: [
    "Partager en parts qui ne sont pas égales.",
    "Inverser numérateur et dénominateur.",
    "Croire que $\\dfrac{1}{5}$ est plus grand que $\\dfrac{1}{3}$ parce que $5 > 3$.",
    "Ajouter aussi les dénominateurs : $\\dfrac{1}{5} + \\dfrac{2}{5} = \\dfrac{3}{5}$, pas $\\dfrac{3}{10}$.",
    "Oublier que le tout, c'est $\\dfrac{8}{8} = 1$."
  ]
};
