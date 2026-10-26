/*
  CHAPITRE : CM2 — Les probabilités
  ----------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM2 : issues d'une expérience aléatoire simple ; issues réalisant un
  évènement ; en situation d'équiprobabilité, probabilité sous la forme « a chances sur b » ; comparer des probabilités ;
  indépendance lors de la répétition d'une expérience (« le dé ne se souvient pas ») ; expériences en deux étapes :
  recenser les issues dans un tableau ou un arbre.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm2-probabilites"] = {
  niveau: "CM2",
  numero: 17,
  titre: "Les probabilités",
  accroche: "Mesurer les chances : « a chances sur b », arbres et tableaux.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "« a chances sur b »",
      video: { titre: "Vidéo de « Maths faciles avec Maître William » : exprimer une probabilité, « a chances sur b »", youtube: "https://youtu.be/_Aiu_wl_QDA" },
      texte:
        "On lance un dé équilibré : il y a $6$ **issues** qui ont toutes la même chance (on dit qu'elles sont **équiprobables**).\n\n" +
        "L'évènement « obtenir un nombre pair » est réalisé par $3$ issues ($2$, $4$, $6$) : il a **$3$ chances sur $6$**.\n\n" +
        "Un sac contient $3$ billes rouges et $5$ bleues : tirer une rouge a **$3$ chances sur $8$**.\n\n" +
        "Pour **comparer** deux sacs : $2$ chances sur $5$ ($\\dfrac{2}{5} = \\dfrac{4}{10}$) est plus que $3$ chances sur $10$.",
      exemple: { enonce: "Probabilité d'obtenir un multiple de $3$ avec un dé ?", solution: "$3$ et $6$ : $2$ chances sur $6$." }
    },
    {
      titre: "Deux étapes, et un dé sans mémoire",
      video: { titre: "Vidéo de « Maths faciles avec Maître William » : le dé se souvient-il ?", youtube: "https://youtu.be/GXV-N0dtv1E" },
      texte:
        "On lance **deux fois** une pièce. L'**arbre** montre les $4$ issues : PP, PF, FP, FF.\n\n" +
        "- « Deux fois pile » : $1$ chance sur $4$.\n" +
        "- « Une fois pile et une fois face » : PF et FP, $2$ chances sur $4$.\n\n" +
        "Avec deux dés, un **tableau** de $6 \\times 6 = 36$ cases donne toutes les sommes.\n\n" +
        "**Indépendance** : même après $5$ « pile » de suite, le lancer suivant a toujours $1$ chance sur $2$ de donner « pile » : la pièce ne se souvient de rien !",
      figure: "m2y-cours-arbre",
      exemple: { enonce: "Deux dés : combien de chances sur $36$ d'obtenir une somme de $12$ ?", solution: "Seulement $6 + 6$ : $1$ chance sur $36$." }
    }
  ],
  exercices: [
    { type: "m2y-chances", titre: "Calculer et comparer des chances", etape: "Chances", nb: 6 },
    { type: "m2y-deux-epreuves", titre: "Arbres et tableaux", etape: "Deux étapes", nb: 5 },
    { type: "m2r-chercher", titre: "Dénombrer (révision)", etape: "Deux étapes", nb: 3 }
  ],
  qcm: [
    { question: "On lance un dé équilibré. « Obtenir un nombre pair » :", choix: ["$3$ chances sur $6$", "$2$ chances sur $6$", "$1$ chance sur $6$", "$6$ chances sur $3$"], bonne: 0, explication: "$2$, $4$, $6$." },
    { question: "« Obtenir un multiple de $3$ » avec un dé :", choix: ["$2$ chances sur $6$", "$3$ chances sur $6$", "$1$ chance sur $3$ faces", "$1$ chance sur $6$"], bonne: 0, explication: "$3$ et $6$." },
    { question: "« Obtenir $7$ » avec un dé :", choix: ["$0$ chance sur $6$ (impossible)", "$1$ chance sur $6$", "$1$ chance sur $7$", "$7$ chances sur $6$"], bonne: 0, explication: "Il n'y a pas de face $7$." },
    { question: "$3$ billes rouges et $5$ bleues. Tirer une rouge :", choix: ["$3$ chances sur $8$", "$3$ chances sur $5$", "$5$ chances sur $8$", "$1$ chance sur $3$"], bonne: 0, explication: "$8$ billes en tout." },
    { question: "Quel sac donne le plus de chances de tirer une rouge ?", choix: ["$2$ rouges sur $5$ billes", "$3$ rouges sur $10$ billes", "ils sont pareils"], bonne: 0, explication: "$\\dfrac{4}{10} > \\dfrac{3}{10}$." },
    { question: "Deux lancers de pièce : combien d'issues ?", choix: ["$4$", "$2$", "$3$", "$6$"], bonne: 0, explication: "PP, PF, FP, FF." },
    { question: "Deux lancers de pièce : « deux fois pile » :", choix: ["$1$ chance sur $4$", "$1$ chance sur $2$", "$2$ chances sur $4$", "$1$ chance sur $3$"], bonne: 0, explication: "Seulement PP." },
    { question: "Deux lancers : « un pile et un face » :", choix: ["$2$ chances sur $4$", "$1$ chance sur $4$", "$1$ chance sur $3$", "$3$ chances sur $4$"], bonne: 0, explication: "PF et FP." },
    { question: "Deux lancers : « au moins un pile » :", choix: ["$3$ chances sur $4$", "$2$ chances sur $4$", "$1$ chance sur $4$", "$4$ chances sur $4$"], bonne: 0, explication: "PP, PF, FP." },
    { question: "On a obtenu « pile » $5$ fois de suite. Au 6e lancer, « pile » a :", choix: ["toujours $1$ chance sur $2$", "moins de chances", "plus de chances", "aucune chance"], bonne: 0, explication: "La pièce ne se souvient pas." },
    { question: "Deux dés : combien de cases dans le tableau des sommes ?", choix: ["$36$", "$12$", "$6$", "$11$"], bonne: 0, explication: "$6 \\times 6$." },
    { question: "Deux dés : « somme $12$ » :", choix: ["$1$ chance sur $36$", "$2$ chances sur $36$", "$1$ chance sur $12$", "$6$ chances sur $36$"], bonne: 0, explication: "Seulement $6 + 6$." },
    { question: "Deux dés : « somme $7$ » :", choix: ["$6$ chances sur $36$", "$1$ chance sur $36$", "$7$ chances sur $36$", "$1$ chance sur $7$"], bonne: 0, explication: "$1+6$, $2+5$, $3+4$, $4+3$, $5+2$, $6+1$." },
    { question: "Deux dés : « somme $2$ » :", choix: ["$1$ chance sur $36$", "$2$ chances sur $36$", "$2$ chances sur $12$", "impossible"], bonne: 0, explication: "Seulement $1 + 1$." },
    { question: "$3$ shorts et $2$ t-shirts : combien de tenues ?", choix: ["$6$", "$5$", "$3$", "$9$"], bonne: 0, explication: "$3 \\times 2$." },
    { question: "Une roue a $8$ secteurs égaux dont $3$ verts. « Tomber sur vert » :", choix: ["$3$ chances sur $8$", "$5$ chances sur $8$", "$3$ chances sur $5$", "$1$ chance sur $3$"], bonne: 0, explication: "$3$ issues favorables sur $8$." },
    { question: "Des issues équiprobables ont :", choix: ["toutes la même chance", "des chances différentes", "aucune chance", "toujours $1$ chance sur $2$"], bonne: 0, explication: "Comme les faces d'un dé équilibré." },
    { question: "Un sac a $4$ billes vertes et rien d'autre. Tirer une verte :", choix: ["$4$ chances sur $4$ (certain)", "$1$ chance sur $4$", "$0$ chance sur $4$", "$2$ chances sur $4$"], bonne: 0, explication: "Toutes les billes sont vertes." }
  ],
  methode: [
    { titre: "Calculer une probabilité « a chances sur b »", etapes: ["Vérifie que les issues ont toutes la même chance.", "Compte toutes les issues : c'est $b$.", "Compte les issues qui réalisent l'évènement : c'est $a$.", "Écris « $a$ chances sur $b$ »."], exemple: "Dé, « pair » : $a = 3$, $b = 6$ → $3$ chances sur $6$." },
    { titre: "Expérience en deux étapes", etapes: ["Fais un arbre (ou un tableau).", "Écris toutes les issues au bout des branches.", "Entoure celles qui réalisent l'évènement et compte-les."], figure: "m2y-cours-arbre", exemple: "Deux pièces : PP, PF, FP, FF ; « un pile et un face » : $2$ sur $4$." }
  ],
  erreurs: ["Oublier une issue (compter PF et FP comme une seule).", "Croire que le dé « se souvient » des lancers précédents.", "Comparer « $2$ sur $5$ » et « $3$ sur $10$ » en regardant seulement $2$ et $3$.", "Mettre le nombre d'issues favorables en bas."]
};
