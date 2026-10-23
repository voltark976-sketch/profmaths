/*
  CHAPITRE : 6e — Pourcentages
  -----------------------------
  Programme de mathématiques du cycle 3 (BO n° 16 du 17 avril 2025), en vigueur en 6e depuis la rentrée 2025 :
  connaître la définition d'un pourcentage et l'associer aux autres écritures (fraction, décimal) ; comprendre le sens
  d'un pourcentage ; calculer une proportion et l'exprimer en pourcentage dans des cas simples ; appliquer un
  pourcentage à une grandeur ou à un nombre. Les évolutions en pourcentage (hausses, baisses successives) sont au cycle 4.
  Mêmes règles d'écriture que data/sixieme/nombres-entiers-decimaux.js. Le symbole % s'écrit en dehors des formules.
  figure : "t6-quadrillage" (assets/exercices-college.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["sixieme-pourcentages"] = {
  niveau: "6e",
  numero: 6,
  titre: "Pourcentages",
  accroche: "Comprendre « pour cent », passer d'une écriture à l'autre, calculer un pourcentage d'une quantité et exprimer une proportion en pourcentage.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : pourcentages (PDF)", url: "https://www.maths-et-tiques.fr/telech/25Pourcent.pdf" }
  ],
  liens: [
    { titre: "Tout le cours en vidéo (Yvan Monka)", url: "https://youtu.be/2dcxLVwH7W0", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Qu'est-ce qu'un pourcentage ?",
      video: { titre: "Vidéo d'Yvan Monka : apprendre à utiliser le symbole %", youtube: "https://youtu.be/hY-2J9zJJEw" },
      texte:
        "« $30$ % » se lit « $30$ pour cent » : c'est **$30$ sur $100$**.\n\n" +
        "Si $30$ % des élèves d'un collège viennent en bus, cela veut dire que, sur $100$ élèves, $30$ viennent en bus.\n\n" +
        "Un même nombre a plusieurs écritures : $30$ % $= \\dfrac{30}{100} = 0{,}30 = 0{,}3$.\n\n" +
        "Sur la figure, $30$ petits carrés sur $100$ sont coloriés : $30$ % du grand carré.\n\n" +
        "Le savais-tu ? Dans des manuscrits italiens du XVe siècle, on écrivait « per cento » en abrégé ; le symbole % vient de là.",
      figure: "t6-quadrillage",
      exemple: {
        enonce: "Écris $7$ % et $125$ % sous forme décimale, et $0{,}45$ sous forme de pourcentage.",
        solution: "$7$ % $= \\dfrac{7}{100} = 0{,}07$ et $125$ % $= \\dfrac{125}{100} = 1{,}25$.\n\n$0{,}45 = \\dfrac{45}{100} = 45$ %."
      }
    },
    {
      titre: "Calculer mentalement un pourcentage",
      video: { titre: "Vidéo d'Yvan Monka : calculer 10 %, 25 %, 50 % ou 75 % d'un nombre", youtube: "https://youtu.be/ixjag8jXLXk" },
      texte:
        "Certains pourcentages correspondent à des fractions simples :\n\n" +
        "- $50$ %, c'est **la moitié** ($\\dfrac{1}{2}$) : on divise par $2$ ;\n" +
        "- $25$ %, c'est **le quart** ($\\dfrac{1}{4}$) : on divise par $4$ ;\n" +
        "- $75$ %, ce sont **les trois quarts** : on divise par $4$, puis on multiplie par $3$ ;\n" +
        "- $10$ %, c'est **le dixième** : on divise par $10$ ;\n" +
        "- $100$ %, c'est **le tout** ; $200$ %, c'est **le double**.\n\n" +
        "Sur la figure, la barre entière vaut $100$ % de $40$ € ; partagée en $4$, chaque part vaut $25$ % : $40 \\div 4 = 10$ €.",
      figure: "t6-cours-barre",
      exemple: {
        enonce: "Calcule $50$ % de $40$ €, $25$ % de $8$ km, $10$ % de $30$ L et $75$ % de $1\\,000$.",
        solution: "$40 \\div 2 = 20$ € ; $8 \\div 4 = 2$ km ; $30 \\div 10 = 3$ L ; $1\\,000 \\div 4 = 250$, puis $250 \\times 3 = 750$."
      }
    },
    {
      titre: "Appliquer un pourcentage",
      video: { titre: "Vidéo d'Yvan Monka : appliquer un pourcentage", youtube: "https://youtu.be/Ce6E56gsbY0" },
      texte:
        "Prendre $p$ % d'une quantité, c'est la multiplier par $\\dfrac{p}{100}$.\n\n" +
        "$84$ % de $25$ élèves : $\\dfrac{84}{100} \\times 25 = 0{,}84 \\times 25 = 21$ élèves.\n\n" +
        "On peut aussi calculer $1$ % (on divise par $100$), puis multiplier par $p$ : $1$ % de $25$ est $0{,}25$, donc $84$ % de $25$ est $0{,}25 \\times 84 = 21$.",
      exemple: {
        enonce: "Une parcelle de $350$ m² est plantée à $40$ % de manioc. Quelle aire est plantée de manioc ?",
        solution: "$40$ % de $350$ : $0{,}4 \\times 350 = 140$. Il y a $140$ m² de manioc.\n\nContrôle : $40$ %, c'est un peu moins de la moitié ; la moitié de $350$ est $175$."
      }
    },
    {
      titre: "Exprimer une proportion en pourcentage",
      video: { titre: "Vidéo d'Yvan Monka : calculer un pourcentage", youtube: "https://youtu.be/_TcFaeFb6sI" },
      figure: "t6-cours-proportion",
      texte:
        "Pour exprimer une **proportion** (une partie sur le tout) en pourcentage, on cherche une fraction égale **sur $100$**.\n\n" +
        "$9$ élèves sur $25$ font de la natation : $\\dfrac{9}{25} = \\dfrac{9 \\times 4}{25 \\times 4} = \\dfrac{36}{100}$, soit $36$ %.\n\n" +
        "Cela permet de **comparer** des groupes de tailles différentes : $9$ sur $25$ ($36$ %) est plus que $7$ sur $20$ ($35$ %).",
      exemple: {
        enonce: "Sur ses $50$ oursons en chocolat, Mia en a donné $42$. Quel pourcentage de ses oursons a-t-elle donné ?",
        solution: "$\\dfrac{42}{50} = \\dfrac{84}{100}$ : Mia a donné $84$ % de ses oursons."
      }
    },
    {
      titre: "Résoudre un problème avec des pourcentages",
      video: { titre: "Vidéo d'Yvan Monka : exercice, calculer des pourcentages", youtube: "https://youtu.be/4Ii1FtAxAIY" },
      figure: "t6-cours-remise",
      texte:
        "- Lis bien ce que représente le pourcentage : une partie de quel total ?\n" +
        "- « Les autres » représentent $100$ % moins le pourcentage donné.\n" +
        "- Une **remise** de $20$ % sur un prix : on calcule $20$ % du prix, puis on le retire.\n\n" +
        "On termine toujours par une phrase de réponse avec l'unité.",
      exemple: {
        enonce: "Pendant les soldes, un tee-shirt à $24$ € est vendu avec une remise de $25$ %. Combien paie-t-on ?",
        solution: "Remise : $25$ % de $24$ €, c'est le quart : $6$ €.\n\nPrix payé : $24 - 6 = 18$ €."
      }
    }
  ],

  videosNote: "Exercices corrigés en vidéo par Yvan Monka (maths-et-tiques).",
  videos: [
    { titre: "Calculer 25 % ou 50 % d'un nombre", type: "Calcul mental", youtube: "https://youtu.be/dNXTrhaiBbI" },
    { titre: "Appliquer un pourcentage", type: "Problème", youtube: "https://youtu.be/MpQVpvTZBGk" }
  ],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "t6-ecritures", titre: "Pourcentage, fraction et écriture décimale", etape: "Comprendre un pourcentage", nb: 6 },
    { type: "t6-mental", titre: "10 %, 25 %, 50 %, 75 % de tête", etape: "Calculer un pourcentage", nb: 6 },
    { type: "t6-appliquer", titre: "Appliquer un pourcentage", etape: "Calculer un pourcentage", nb: 5 },
    { type: "t6-proportion", titre: "Exprimer une proportion en pourcentage", etape: "Proportions et problèmes", nb: 5 },
    { type: "t6-probleme", titre: "Remises, comparaisons, « les autres »", etape: "Proportions et problèmes", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "« $30$ % » signifie :", choix: ["$30$ sur $100$", "$30$ sur $10$", "$100$ sur $30$", "$30$ sur $1\\,000$"], bonne: 0, explication: "« Pour cent » : sur $100$." },
    { question: "Quel pourcentage du grand carré est colorié ?", figure: "t6-quadrillage", choix: ["$30$ %", "$3$ %", "$70$ %", "$13$ %"], bonne: 0, explication: "$30$ petits carrés sur $100$ : $30$ %." },
    { question: "$7$ % s'écrit :", choix: ["$0{,}07$", "$0{,}7$", "$7{,}0$", "$700$"], bonne: 0, explication: "$7$ % $= \\dfrac{7}{100} = 0{,}07$." },
    { question: "$0{,}45$ s'écrit :", choix: ["$45$ %", "$4{,}5$ %", "$0{,}45$ %", "$450$ %"], bonne: 0, explication: "$0{,}45 = \\dfrac{45}{100} = 45$ %." },
    { question: "$125$ % est égal à :", choix: ["$1{,}25$", "$12{,}5$", "$0{,}125$", "$125$"], bonne: 0, explication: "$\\dfrac{125}{100} = 1{,}25$ : c'est plus que le tout." },
    { question: "Prendre $25$ %, c'est prendre :", choix: ["le quart", "la moitié", "le tiers", "le cinquième"], bonne: 0, explication: "$25$ % $= \\dfrac{25}{100} = \\dfrac{1}{4}$." },
    { question: "Prendre les trois quarts, c'est prendre :", choix: ["$75$ %", "$34$ %", "$3{,}4$ %", "$25$ %"], bonne: 0, explication: "$\\dfrac{3}{4} = \\dfrac{75}{100}$." },
    { question: "$50$ % de $40$ € :", choix: ["$20$ €", "$50$ €", "$10$ €", "$80$ €"], bonne: 0, explication: "La moitié de $40$." },
    { question: "$10$ % de $30$ L :", choix: ["$3$ L", "$0{,}3$ L", "$10$ L", "$300$ L"], bonne: 0, explication: "Le dixième de $30$." },
    { question: "$75$ % de $1\\,000$ :", choix: ["$750$", "$75$", "$250$", "$7\\,500$"], bonne: 0, explication: "Le quart de $1\\,000$ est $250$, et $3 \\times 250 = 750$." },
    { question: "$200$ % de $7$ kg :", choix: ["$14$ kg", "$3{,}5$ kg", "$207$ kg", "$1\\,400$ kg"], bonne: 0, explication: "$200$ %, c'est le double." },
    { question: "$84$ % de $25$ élèves :", choix: ["$21$ élèves", "$84$ élèves", "$4$ élèves", "$2\\,100$ élèves"], bonne: 0, explication: "$0{,}84 \\times 25 = 21$." },
    { question: "$40$ % de $350$ m² :", choix: ["$140$ m²", "$310$ m²", "$14$ m²", "$210$ m²"], bonne: 0, explication: "$0{,}4 \\times 350 = 140$. $210$ m² correspond aux $60$ % restants." },
    { question: "$9$ élèves sur $25$ font de la natation. Cela représente :", choix: ["$36$ %", "$9$ %", "$25$ %", "$16$ %"], bonne: 0, explication: "$\\dfrac{9}{25} = \\dfrac{36}{100}$." },
    { question: "Mia a donné $42$ oursons sur $50$. C'est :", choix: ["$84$ %", "$42$ %", "$8$ %", "$92$ %"], bonne: 0, explication: "$\\dfrac{42}{50} = \\dfrac{84}{100}$." },
    { question: "Dans un collège, $35$ % des élèves viennent en bus. Quel pourcentage ne vient pas en bus ?", choix: ["$65$ %", "$35$ %", "$75$ %", "$100$ %"], bonne: 0, explication: "$100 - 35 = 65$." },
    { question: "Un tee-shirt à $24$ € avec une remise de $25$ % coûte :", choix: ["$18$ €", "$6$ €", "$23{,}75$ €", "$19$ €"], bonne: 0, explication: "Remise : le quart de $24$, soit $6$ €. Prix : $24 - 6 = 18$ €. $19$ € vient de l'erreur « retirer $5$ € »." },
    { question: "Laquelle de ces proportions est la plus grande ?", choix: ["$9$ sur $25$", "$7$ sur $20$", "$3$ sur $10$", "$16$ sur $50$"], bonne: 0, explication: "$36$ % ; $35$ % ; $30$ % ; $32$ % : c'est $9$ sur $25$." },
    { question: "Pour calculer $1$ % d'une quantité, on :", choix: ["divise par $100$", "multiplie par $100$", "divise par $10$", "retire $1$"], bonne: 0, explication: "$1$ % $= \\dfrac{1}{100}$ : on divise par $100$." },
    { question: "Un jus contient $20$ % de jus de mangue. Dans $50$ cL de ce jus, il y a :", choix: ["$10$ cL de jus de mangue", "$20$ cL", "$2{,}5$ cL", "$30$ cL"], bonne: 0, explication: "$20$ %, c'est le cinquième : $50 \\div 5 = 10$ cL." },
    { question: "La barre entière représente $40$ €. Combien vaut la partie coloriée ?", figure: "t6-cours-barre", choix: ["$10$ €", "$25$ €", "$15$ €", "$4$ €"], bonne: 0, explication: "La partie coloriée est $25$ %, le quart : $40 \\div 4 = 10$ €." },
    { question: "D'après la figure, quel pourcentage de la classe représentent les $9$ élèves ?", figure: "t6-qcm-proportion", choix: ["$36$ %", "$9$ %", "$25$ %", "$16$ %"], bonne: 0, explication: "$\\dfrac{9}{25} = \\dfrac{36}{100}$ : $36$ %." },
    { question: "Un article à $24$ € a une remise de $25$ % (voir la figure). Combien paie-t-on ?", figure: "t6-cours-remise", choix: ["$18$ €", "$6$ €", "$12$ €", "$19$ €"], bonne: 0, explication: "Remise : le quart de $24$ €, soit $6$ €. Prix payé : $24 - 6 = 18$ €." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Passer d'une écriture à l'autre",
      etapes: [
        "$p$ % $= \\dfrac{p}{100}$.",
        "Pour l'écriture décimale, divise $p$ par $100$.",
        "Dans l'autre sens, multiplie par $100$ : $0{,}35 = 35$ %."
      ],
      figure: "t6-quadrillage",
      exemple: "$8$ % $= \\dfrac{8}{100} = 0{,}08$."
    },
    {
      titre: "Calculer un pourcentage de tête",
      etapes: [
        "$50$ % : la moitié. $25$ % : le quart. $75$ % : les trois quarts.",
        "$10$ % : le dixième ; $5$ % : la moitié de $10$ % ; $20$ % : le double de $10$ %.",
        "$100$ % : le tout ; $200$ % : le double."
      ],
      figure: "t6-cours-barre",
      exemple: "$20$ % de $45$ € : $10$ % font $4{,}50$ €, donc $20$ % font $9$ €."
    },
    {
      titre: "Appliquer un pourcentage",
      etapes: [
        "Écris le pourcentage sous forme décimale : $p$ % $= \\dfrac{p}{100}$.",
        "Multiplie la quantité par ce nombre.",
        "Contrôle : moins de $100$ %, le résultat est plus petit que la quantité."
      ],
      figure: "t6-cours-remise",
      exemple: "$12$ % de $325$ : $0{,}12 \\times 325 = 39$."
    },
    {
      titre: "Exprimer une proportion en pourcentage",
      etapes: [
        "Écris la proportion sous forme de fraction : partie sur tout.",
        "Cherche une fraction égale de dénominateur $100$.",
        "Le numérateur est le pourcentage."
      ],
      figure: "t6-cours-proportion",
      exemple: "$\\dfrac{7}{20} = \\dfrac{35}{100}$ : $35$ %."
    }
  ],
  erreurs: [
    "Confondre $7$ % ($0{,}07$) et $0{,}7$ ($70$ %).",
    "Oublier de diviser par $100$ : $12$ % de $325$ n'est pas $12 \\times 325$.",
    "Croire que « $9$ sur $25$ » fait $9$ % : il faut se ramener à $100$.",
    "Retirer le pourcentage comme un nombre d'euros : une remise de $25$ % sur $24$ € n'est pas $25$ €.",
    "Oublier « les autres » : si $35$ % viennent en bus, $65$ % ne viennent pas en bus."
  ]
};
