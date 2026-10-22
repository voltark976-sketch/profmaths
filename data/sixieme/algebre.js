/*
  CHAPITRE : 6e — Pensée algébrique : motifs et schémas en barre
  ---------------------------------------------------------------
  Programme de mathématiques du cycle 3 (BO n° 16 du 17 avril 2025), en vigueur en 6e depuis la rentrée 2025 :
  « Résoudre des problèmes mettant en jeu des nombres inconnus » : utiliser des modèles pré-algébriques (schémas en barre)
  pour résoudre des problèmes algébriques ; identifier la structure d'un motif évolutif. Avec les acquis du cours moyen
  entretenus : égalités à trous (le signe « = » entre deux expressions), programmes de calcul, suites de nombres.
  Les lettres ne sont pas un objectif en 6e : les règles sont dites en mots (une seule écriture avec N, comme dans le BO).
  Yvan Monka n'a pas de vidéo pour ce chapitre : vidéos de jaicompris Maths, CommeUnJeu, Mathlab et Maître Lucas.
  figure : "a6-motif", "a6-allumettes" ou "a6-barres" (assets/exercices-college.js).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["sixieme-algebre"] = {
  niveau: "6e",
  numero: 7,
  titre: "Pensée algébrique\u00a0: motifs et schémas en barre",
  accroche: "Raisonner sur des nombres qu'on ne connaît pas encore : égalités à trous, programmes de calcul, motifs qui grandissent et schémas en barre.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [
    { titre: "Le schéma en barres expliqué (jaicompris Maths)", url: "https://youtu.be/cy13LxIERrg", type: "video" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Le signe « = » et les égalités à trous",
      video: { titre: "Vidéo de Maître Lucas : résoudre des problèmes algébriques", youtube: "https://youtu.be/JNJs5wmuWnk" },
      texte:
        "Le signe $=$ ne veut pas seulement dire « voici le résultat » : il dit que **les deux côtés valent le même nombre**.\n\n" +
        "Dans $178 - \\ldots = 6 \\times 8$, le côté droit vaut $48$. On cherche donc le nombre qu'on retire à $178$ pour obtenir $48$ : c'est $130$.\n\n" +
        "Pour compléter une égalité à trous :\n\n" +
        "- on calcule le côté qui est complet ;\n" +
        "- on cherche le nombre qui rend l'autre côté égal, en utilisant l'opération contraire si besoin.",
      exemple: {
        enonce: "Complète : $\\ldots + 25 = 12 \\times 5$ et $7 \\times \\ldots = 80 - 17$.",
        solution: "$12 \\times 5 = 60$, et $35 + 25 = 60$ : le nombre manquant est $35$.\n\n$80 - 17 = 63$, et $7 \\times 9 = 63$ : le nombre manquant est $9$."
      }
    },
    {
      titre: "Les programmes de calcul",
      video: { titre: "Vidéo de Mathlab : programme de calcul, la base", youtube: "https://youtu.be/KMKB-p2i-os" },
      texte:
        "Un **programme de calcul** est une suite d'instructions à appliquer **dans l'ordre** à un nombre de départ.\n\n" +
        "« Choisis un nombre. Multiplie-le par $3$. Ajoute $5$. » Avec $7$ : $7 \\times 3 = 21$, puis $21 + 5 = 26$.\n\n" +
        "Pour retrouver le nombre de départ, on remonte le programme **à l'envers**, avec les opérations contraires : on obtient $26$, donc $26 - 5 = 21$, puis $21 \\div 3 = 7$.\n\n" +
        "Un programme peut aussi décrire un prix quel que soit le nombre d'objets : des tee-shirts à $12$ € et une livraison à $5$ € coûtent $(N \\times 12) + 5$ euros, où $N$ est le nombre de tee-shirts.",
      exemple: {
        enonce: "Programme : « Choisis un nombre. Ajoute $4$. Multiplie le résultat par $6$. » Quel résultat avec $2{,}5$ ? Quel nombre de départ donne $90$ ?",
        solution: "$2{,}5 + 4 = 6{,}5$, puis $6{,}5 \\times 6 = 39$.\n\nÀ l'envers : $90 \\div 6 = 15$, puis $15 - 4 = 11$. Le nombre de départ est $11$."
      }
    },
    {
      titre: "Les suites de nombres",
      texte:
        "Dans la suite $3$ ; $7$ ; $11$ ; $15$ ; … on **ajoute $4$** à chaque fois : le nombre suivant est $19$.\n\n" +
        "Pour trouver une règle, on compare deux nombres qui se suivent, et on vérifie que la règle marche **à chaque fois**. Parfois on ajoute toujours le même nombre, parfois on multiplie ($1$ ; $2$ ; $4$ ; $8$ ; … on double).\n\n" +
        "Pour le $10$e nombre de la suite $3$ ; $7$ ; $11$ ; … on part du $1$er nombre et on ajoute $4$ en tout $9$ fois : $3 + 9 \\times 4 = 39$.",
      exemple: {
        enonce: "Quel est le $20$e nombre de la suite $5$ ; $8$ ; $11$ ; $14$ ; … ?",
        solution: "On ajoute $3$ à chaque fois. Du $1$er au $20$e nombre, on ajoute $3$ en tout $19$ fois : $5 + 19 \\times 3 = 62$."
      }
    },
    {
      titre: "Les motifs évolutifs",
      video: { titre: "Vidéo de CommeUnJeu : motifs évolutifs, on commence avec…, puis on ajoute…", youtube: "https://youtu.be/6ce9n_vYGWU" },
      texte:
        "Un **motif évolutif** est une suite de figures qui grandit d'une étape à l'autre en suivant une règle.\n\n" +
        "Sur la figure, l'étape $1$ a $3$ carreaux, l'étape $2$ en a $5$, l'étape $3$ en a $7$ : **on commence avec $3$ carreaux, puis on ajoute $2$ carreaux à chaque étape**.\n\n" +
        "Pour une étape lointaine, on cherche la **structure** du motif : un carreau dans le coin, et deux branches qui ont chacune autant de carreaux que le numéro de l'étape. À l'étape $50$ : $2 \\times 50 + 1 = 101$ carreaux.\n\n" +
        "On vérifie toujours la règle sur les étapes dessinées.",
      figure: "a6-motif",
      exemple: {
        enonce: "Une rangée de carrés en allumettes : $4$ allumettes pour $1$ carré, $7$ pour $2$, $10$ pour $3$. Combien d'allumettes pour $100$ carrés ?",
        solution: "La première allumette (à gauche), puis $3$ allumettes par carré : $3 \\times 100 + 1 = 301$ allumettes.\n\nVérification avec $2$ carrés : $3 \\times 2 + 1 = 7$."
      }
    },
    {
      titre: "Les schémas en barre",
      video: { titre: "Vidéo de jaicompris Maths : résoudre un problème avec un schéma en barres", youtube: "https://youtu.be/O5sqmVGZ8Rw" },
      texte:
        "Un **schéma en barre** représente les nombres d'un problème par des rectangles. Les nombres inconnus sont marqués « ? », et des barres de même longueur représentent des nombres égaux.\n\n" +
        "« Sarah a $6$ billes de plus que Louis. Ensemble, ils ont $40$ billes. » Sur le schéma, Sarah a une barre comme Louis, plus $6$.\n\n" +
        "- On enlève les $6$ billes en plus : $40 - 6 = 34$.\n" +
        "- Il reste deux barres égales : $34 \\div 2 = 17$.\n" +
        "- Louis a $17$ billes et Sarah $17 + 6 = 23$ billes.\n\n" +
        "On vérifie : $17 + 23 = 40$.",
      figure: "a6-barres",
      exemple: {
        enonce: "Dans un club, il y a $2$ fois plus de filles que de garçons, et $27$ membres en tout. Combien de garçons ? Combien de filles ?",
        solution: "Schéma : $1$ barre pour les garçons, $2$ barres pour les filles, soit $3$ barres égales pour $27$ membres.\n\nUne barre : $27 \\div 3 = 9$. Il y a $9$ garçons et $2 \\times 9 = 18$ filles."
      }
    }
  ],

  videosNote: "Problèmes corrigés en vidéo (jaicompris Maths, CommeUnJeu).",
  videos: [
    { titre: "Schéma en barres : 2 fois plus de filles que de garçons", type: "Schéma en barre", youtube: "https://youtu.be/4qj3aUV4AC0" },
    { titre: "Schéma en barres : cours et exemple", type: "Schéma en barre", youtube: "https://youtu.be/cy13LxIERrg" },
    { titre: "Motifs évolutifs : combien d'allumettes pour 100 maisons ?", type: "Motif", youtube: "https://youtu.be/yaVRAzl1Cig" }
  ],

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "a6-trous", titre: "Égalités à trous", etape: "Nombres inconnus", nb: 6 },
    { type: "a6-programme", titre: "Programmes de calcul, dans les deux sens", etape: "Nombres inconnus", nb: 6 },
    { type: "a6-suite", titre: "Continuer une suite de nombres", etape: "Suites et motifs", nb: 5 },
    { type: "a6-motif", titre: "Motifs évolutifs : règle et étape lointaine", etape: "Suites et motifs", nb: 6 },
    { type: "a6-barres", titre: "Problèmes avec des schémas en barre", etape: "Schémas en barre", nb: 6 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Dans $178 - \\ldots = 6 \\times 8$, le nombre manquant est :", choix: ["$130$", "$48$", "$226$", "$172$"], bonne: 0, explication: "$6 \\times 8 = 48$, et $178 - 130 = 48$." },
    { question: "Dans $\\ldots + 25 = 12 \\times 5$, le nombre manquant est :", choix: ["$35$", "$60$", "$85$", "$37$"], bonne: 0, explication: "$12 \\times 5 = 60$ et $35 + 25 = 60$." },
    { question: "Le signe $=$ dans $15 + 5 = 4 \\times 5$ veut dire :", choix: ["les deux côtés valent le même nombre", "le résultat de $15 + 5$ est $4$", "il faut calculer $4 \\times 5$ en premier", "l'égalité est fausse"], bonne: 0, explication: "$15 + 5 = 20$ et $4 \\times 5 = 20$ : les deux côtés valent $20$." },
    { question: "« Choisis un nombre. Multiplie-le par $3$. Ajoute $5$. » Avec $7$, on obtient :", choix: ["$26$", "$36$", "$15$", "$22$"], bonne: 0, explication: "$7 \\times 3 = 21$, puis $21 + 5 = 26$. $36$ vient de l'ordre inversé : $(7 + 5) \\times 3$." },
    { question: "« Choisis un nombre. Multiplie-le par $3$. Ajoute $5$. » On obtient $26$. Le nombre de départ est :", choix: ["$7$", "$31$", "$93$", "$10$"], bonne: 0, explication: "À l'envers : $26 - 5 = 21$, puis $21 \\div 3 = 7$." },
    { question: "Des tee-shirts à $12$ € et une livraison à $5$ €. $N$ est le nombre de tee-shirts. Le prix à payer est :", choix: ["$(N \\times 12) + 5$", "$(N + 12) \\times 5$", "$N \\times 17$", "$N + 12 + 5$"], bonne: 0, explication: "On paie $N$ fois $12$ €, plus une seule livraison." },
    { question: "Le nombre suivant de la suite $3$ ; $7$ ; $11$ ; $15$ ; … est :", choix: ["$19$", "$18$", "$20$", "$30$"], bonne: 0, explication: "On ajoute $4$ à chaque fois." },
    { question: "La règle de la suite $1$ ; $2$ ; $4$ ; $8$ ; $16$ ; … est :", choix: ["on multiplie par $2$", "on ajoute $1$", "on ajoute $2$", "on ajoute le numéro"], bonne: 0, explication: "Chaque nombre est le double du précédent." },
    { question: "Le $20$e nombre de la suite $5$ ; $8$ ; $11$ ; $14$ ; … est :", choix: ["$62$", "$65$", "$60$", "$100$"], bonne: 0, explication: "On ajoute $3$ en tout $19$ fois : $5 + 19 \\times 3 = 62$." },
    { question: "Combien de carreaux à l'étape $4$ de ce motif ?", figure: "a6-motif", choix: ["$9$", "$8$", "$10$", "$12$"], bonne: 0, explication: "$3$ ; $5$ ; $7$ : on ajoute $2$ à chaque étape, donc $9$ à l'étape $4$." },
    { question: "Pour ce motif, combien de carreaux à l'étape $50$ ?", figure: "a6-motif", choix: ["$101$", "$100$", "$150$", "$53$"], bonne: 0, explication: "Un carreau dans le coin et deux branches de $50$ : $2 \\times 50 + 1 = 101$." },
    { question: "Rangée de carrés en allumettes. Combien d'allumettes pour $10$ carrés ?", figure: "a6-allumettes", choix: ["$31$", "$40$", "$30$", "$34$"], bonne: 0, explication: "$1$ allumette au départ, puis $3$ par carré : $3 \\times 10 + 1 = 31$. $40$ compterait $4$ allumettes par carré, alors que les murs sont partagés." },
    { question: "Un motif suit la règle « on commence avec $5$, puis on ajoute $4$ à chaque étape ». À l'étape $3$, il y a :", choix: ["$13$", "$12$", "$17$", "$9$"], bonne: 0, explication: "$5$, puis $9$, puis $13$." },
    { question: "Sarah a $6$ billes de plus que Louis. Ensemble, ils ont $40$ billes. Louis a :", figure: "a6-barres", choix: ["$17$ billes", "$20$ billes", "$23$ billes", "$34$ billes"], bonne: 0, explication: "$40 - 6 = 34$ pour deux barres égales, donc $34 \\div 2 = 17$." },
    { question: "Il y a $2$ fois plus de filles que de garçons, $27$ membres en tout. Il y a :", choix: ["$9$ garçons", "$13{,}5$ garçons", "$18$ garçons", "$25$ garçons"], bonne: 0, explication: "$3$ barres égales pour $27$ : $27 \\div 3 = 9$ garçons (et $18$ filles)." },
    { question: "Anli a $4$ fois plus de cartes que Mia, soit $30$ cartes de plus. Mia a :", choix: ["$10$ cartes", "$7{,}5$ cartes", "$40$ cartes", "$6$ cartes"], bonne: 0, explication: "La différence correspond à $4 - 1 = 3$ barres : $30 \\div 3 = 10$." },
    { question: "$3$ cahiers au même prix et une trousse à $4$ € coûtent $19$ €. Un cahier coûte :", choix: ["$5$ €", "$6{,}33$ €", "$15$ €", "$7{,}66$ €"], bonne: 0, explication: "$19 - 4 = 15$ € pour les $3$ cahiers, donc $15 \\div 3 = 5$ €." },
    { question: "Dans un schéma en barre, deux barres de même longueur représentent :", choix: ["deux nombres égaux", "deux nombres dont l'un est le double de l'autre", "le total", "des nombres connus seulement"], bonne: 0, explication: "C'est ce qui permet de partager le total en parts égales." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Compléter une égalité à trous",
      etapes: [
        "Calcule le côté complet de l'égalité.",
        "Cherche le nombre qui donne le même résultat de l'autre côté.",
        "Vérifie en remplaçant le trou par ce nombre."
      ],
      exemple: "$7 \\times \\ldots = 80 - 17$ : $80 - 17 = 63$ et $7 \\times 9 = 63$."
    },
    {
      titre: "Remonter un programme de calcul",
      etapes: [
        "Pars du résultat.",
        "Défais les étapes de la dernière à la première, avec l'opération contraire ($+ \\leftrightarrow -$, $\\times \\leftrightarrow \\div$).",
        "Vérifie en refaisant le programme dans le bon sens."
      ],
      exemple: "$\\times 3$ puis $+ 5$ donne $26$ : $26 - 5 = 21$, $21 \\div 3 = 7$."
    },
    {
      titre: "Trouver le nombre d'éléments d'une étape lointaine",
      etapes: [
        "Compte les éléments des premières étapes.",
        "Trouve ce qu'on ajoute à chaque étape, et la partie fixe (ce qui ne bouge pas).",
        "Étape $n$ : (ce qu'on ajoute) $\\times n$ $+$ (partie fixe). Vérifie sur les étapes dessinées."
      ],
      exemple: "$4$ ; $7$ ; $10$ allumettes : $3 \\times n + 1$, donc $301$ allumettes à l'étape $100$."
    },
    {
      titre: "Résoudre un problème avec un schéma en barre",
      etapes: [
        "Dessine une barre par personne ou par objet ; des barres égales pour des nombres égaux.",
        "Retire ce qui est en plus, puis partage le reste en barres égales.",
        "Réponds à la question posée et vérifie avec l'énoncé."
      ],
      exemple: "$6$ de plus, $40$ en tout : $(40 - 6) \\div 2 = 17$ et $17 + 6 = 23$."
    }
  ],
  erreurs: [
    "Croire que $=$ annonce seulement un résultat : dans $178 - \\ldots = 48$, le trou n'est pas $48$.",
    "Ne pas respecter l'ordre d'un programme de calcul.",
    "Oublier la partie fixe d'un motif : à l'étape $100$, $3 \\times 100 + 1$, pas $3 \\times 100$.",
    "Multiplier les éléments de l'étape $1$ par le numéro de l'étape, alors que certains sont partagés.",
    "Partager le total en deux sans retirer d'abord ce que l'un a en plus.",
    "Pour « $2$ fois plus », oublier de compter la barre de l'autre : $27 \\div 3$, pas $27 \\div 2$."
  ]
};
