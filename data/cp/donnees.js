/*
  CHAPITRE : CP — Tableaux et diagrammes
  ---------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CP, « Organisation et gestion de données » :
  - collecter des données (enquête, moins de quarante élèves, deux à cinq réponses possibles) ;
  - présenter ces données dans un tableau ou un diagramme en barres ;
  - construire et compléter un tableau à double entrée.
  figure : FIGURES de assets/exercices-cp.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cp-donnees"] = {
  niveau: "CP",
  numero: 12,
  titre: "Tableaux et diagrammes",
  accroche: "Faire une enquête dans la classe, ranger les réponses dans un tableau et les montrer avec un diagramme en barres.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "Faire une enquête et remplir un tableau",
      video: { titre: "Vidéo de Magnard : les tableaux et les diagrammes en bâtons", youtube: "https://youtu.be/tBquX2RI0rQ" },
      texte:
        "On pose une question à chaque élève : « Quel est ton fruit préféré ? ».\n\n" +
        "1. On note chaque réponse par un petit trait $|$.\n" +
        "2. On compte les traits de chaque fruit.\n" +
        "3. On écrit les nombres dans un **tableau** (ci-contre).\n\n" +
        "En tout : $4 + 12 + 8 + 2 = 26$ élèves ont répondu.",
      figure: "cp12-cours-tableau",
      exemple: {
        enonce: "Dans le tableau, combien d'élèves ont choisi la banane ?",
        solution: "On cherche la colonne « banane » : $8$ élèves."
      }
    },
    {
      titre: "Le diagramme en barres",
      video: { titre: "Vidéo de Maître Lucas : lire un graphique et un tableau", youtube: "https://youtu.be/s8HRE-YRjmQ" },
      texte:
        "Dans un **diagramme en barres**, chaque réponse a une barre. Plus la barre est haute, plus il y a d'élèves.\n\n" +
        "Pour lire une barre, on suit son haut jusqu'aux nombres écrits à gauche.\n\n" +
        "Sur le diagramme, la barre « fraise » est la plus haute : c'est le fruit le plus choisi ($12$ élèves).",
      figure: "cp12-cours-barres",
      exemple: {
        enonce: "Combien d'élèves de plus ont choisi la fraise que la banane ?",
        solution: "$12 - 8 = 4$ élèves de plus."
      }
    },
    {
      titre: "Le tableau à double entrée",
      video: { titre: "Vidéo de Magnard : les tableaux, les diagrammes et les graphiques", youtube: "https://youtu.be/vNFLRNJiQ_M" },
      texte:
        "Un tableau à **double entrée** range les réponses selon deux choses à la fois, par exemple filles et garçons (ci-contre).\n\n" +
        "Pour lire une case : on prend la **ligne** (Filles) et la **colonne** (en bus), et on regarde où elles se croisent : $5$ filles viennent en bus.",
      figure: "cp12-cours-double",
      exemple: {
        enonce: "Combien d'élèves viennent à pied ?",
        solution: "Filles $7$ et garçons $6$ : $7 + 6 = 13$ élèves."
      }
    }
  ],

  exercices: [
    { type: "cp12-tableau", titre: "Lire un tableau", etape: "Tableaux", nb: 5 },
    { type: "cp12-double", titre: "Le tableau à double entrée", etape: "Tableaux", nb: 5 },
    { type: "cp12-diagramme", titre: "Lire un diagramme en barres", etape: "Diagrammes", nb: 6 }
  ],

  qcm: [
    { question: "Combien d'élèves préfèrent la mangue ?", figure: "cp12-qcm-barres", choix: ["$9$", "$5$", "$7$", "$21$"], bonne: 0, explication: "La barre « mangue » monte jusqu'à $9$." },
    { question: "Quel fruit est le moins choisi ?", figure: "cp12-qcm-barres", choix: ["la banane", "la mangue", "la papaye", "aucun"], bonne: 0, explication: "La barre la plus basse est celle de la banane ($5$)." },
    { question: "Combien d'élèves ont répondu en tout ?", figure: "cp12-qcm-barres", choix: ["$21$", "$3$", "$9$", "$20$"], bonne: 0, explication: "$9 + 5 + 7 = 21$." },
    { question: "Combien d'élèves de plus préfèrent la mangue que la papaye ?", figure: "cp12-qcm-barres", choix: ["$2$", "$16$", "$4$", "$7$"], bonne: 0, explication: "$9 - 7 = 2$." },
    { question: "Dans un diagramme en barres, la barre la plus haute montre :", choix: ["la réponse la plus choisie", "la réponse la moins choisie", "le total", "rien"], bonne: 0, explication: "Plus la barre est haute, plus il y a de réponses." },
    { question: "Pour noter les réponses d'une enquête, on peut faire :", choix: ["un trait par réponse", "un dessin par classe", "une addition au hasard", "rien du tout"], bonne: 0, explication: "Un trait $|$ pour chaque élève, puis on compte." },
    { question: "Dans un tableau à double entrée, une case se lit avec :", choix: ["une ligne et une colonne", "seulement une ligne", "seulement une colonne", "le total"], bonne: 0, explication: "On regarde où la ligne et la colonne se croisent." },
    { question: "Filles : $7$ à pied, garçons : $6$ à pied. Combien d'élèves à pied ?", choix: ["$13$", "$1$", "$76$", "$7$"], bonne: 0, explication: "$7 + 6 = 13$." },
    { question: "Dans un tableau, « mangue : $4$, banane : $6$ ». Combien de réponses en tout ?", choix: ["$10$", "$2$", "$46$", "$6$"], bonne: 0, explication: "$4 + 6 = 10$." },
    { question: "« ||||| || » représente :", choix: ["$7$ réponses", "$5$ réponses", "$2$ réponses", "$52$ réponses"], bonne: 0, explication: "$5$ traits et encore $2$ : $7$." },
    { question: "Une enquête demande : « Quel est ton animal préféré ? ». Une bonne réponse serait :", choix: ["le maki", "$12$", "le mardi", "rouge et bleu"], bonne: 0, explication: "On répond par un animal." },
    { question: "Deux barres ont la même hauteur. Cela veut dire :", choix: ["autant d'élèves ont fait ces deux choix", "personne n'a choisi", "le diagramme est faux", "c'est le total"], bonne: 0, explication: "Même hauteur, même nombre." },
    { question: "Dans un tableau, « bus : $9$, à pied : $12$ ». Il y a plus d'élèves :", choix: ["à pied", "en bus", "autant", "on ne sait pas"], bonne: 0, explication: "$12 > 9$." },
    { question: "La barre « foot » s'arrête sur la ligne $8$. Combien d'élèves aiment le foot ?", choix: ["$8$", "$4$", "$80$", "$10$"], bonne: 0, explication: "On lit le nombre au bout de la barre." },
    { question: "Dans le tableau « orange $4$, fraise $12$, banane $8$, kiwi $2$ », quel fruit est le plus choisi ?", choix: ["la fraise", "l'orange", "la banane", "le kiwi"], bonne: 0, explication: "$12$ est le plus grand nombre." },
    { question: "Une barre s'arrête juste au milieu entre la ligne $6$ et la ligne $8$. Elle vaut :", choix: ["$7$", "$6$", "$8$", "$14$"], bonne: 0, explication: "Au milieu de $6$ et $8$, il y a $7$." },
    { question: "Pour faire un diagramme en barres, il faut d'abord :", choix: ["compter les réponses", "dessiner au hasard", "colorier", "calculer un double"], bonne: 0, explication: "On compte, puis on dessine des barres de la bonne hauteur." },
    { question: "Filles : $5$ en bus ; garçons : $3$ en bus. Il y a combien de filles de plus en bus ?", choix: ["$2$", "$8$", "$3$", "$5$"], bonne: 0, explication: "$5 - 3 = 2$." }
  ],

  methode: [
    {
      titre: "Lire un diagramme en barres",
      etapes: [
        "Trouve la barre de la réponse qui t'intéresse.",
        "Suis le haut de la barre jusqu'aux nombres à gauche.",
        "Lis le nombre : c'est le nombre de réponses."
      ],
      figure: "cp12-cours-barres",
      exemple: "La barre « banane » s'arrête à $8$ : $8$ élèves."
    },
    {
      titre: "Lire un tableau à double entrée",
      etapes: [
        "Trouve la bonne ligne (par exemple Filles).",
        "Trouve la bonne colonne (par exemple en bus).",
        "Lis la case où elles se croisent."
      ],
      exemple: "Ligne Filles, colonne en bus : $5$."
    }
  ],
  erreurs: [
    "Lire la barre d'à côté.",
    "Compter le nombre de barres au lieu de lire leur hauteur.",
    "Oublier une réponse quand on calcule le total.",
    "Dans un tableau à double entrée, lire la mauvaise ligne (filles ou garçons).",
    "Additionner quand on demande « combien de plus » : c'est une soustraction."
  ]
};
