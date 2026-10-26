/*
  CHAPITRE : CE1 — Se repérer, tableaux et diagrammes
  ----------------------------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CE1 :
  - repérage dans l'espace : vocabulaire des positions, plans d'espaces familiers, comprendre, utiliser et produire
    une suite d'instructions qui codent un déplacement ; assemblages de cubes et de pavés ;
  - organisation et gestion de données : produire un tableau ou un diagramme en barres ; lire et interpréter un diagramme
    en barres et un tableau à double entrée (« Combien de garçons viennent à l'école en vélo ? »).
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["ce1-reperage-donnees"] = {
  niveau: "CE1",
  numero: 14,
  titre: "Se repérer, tableaux et diagrammes",
  accroche: "Coder un trajet avec des flèches, lire un tableau à double entrée et un diagramme en barres.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "Coder un déplacement",
      video: { titre: "Vidéo de Maître Lucas : se repérer sur un quadrillage", youtube: "https://youtu.be/B86Ddx5hzRA" },
      texte:
        "Sur un quadrillage, chaque flèche fait avancer d'une case : $\\rightarrow$ droite, $\\leftarrow$ gauche, $\\uparrow$ haut, $\\downarrow$ bas.\n\n" +
        "Le chemin dessiné va du point rond à l'étoile : $\\rightarrow \\rightarrow \\rightarrow \\uparrow \\uparrow \\rightarrow \\uparrow \\uparrow$.\n\n" +
        "Sur un plan de l'école ou du quartier, on peut décrire un trajet avec des mots : « tourne à gauche, avance jusqu'à la cantine ».",
      figure: "e1d-cours-chemin",
      exemple: {
        enonce: "Écris le code pour aller de $3$ cases vers la droite puis de $2$ cases vers le bas.",
        solution: "$\\rightarrow \\rightarrow \\rightarrow \\downarrow \\downarrow$."
      }
    },
    {
      titre: "Le tableau à double entrée",
      video: { titre: "Vidéo de Super Croco : le tableau à double entrée", youtube: "https://youtu.be/FO-JWAxAW6U" },
      texte:
        "Un tableau à double entrée range des données selon **deux** critères (filles / garçons et moyen de transport, par exemple).\n\n" +
        "Pour lire une case, on prend une **ligne** et une **colonne**. La ligne « Total » et la colonne « Total » donnent les sommes.\n\n" +
        "Si une case est cachée, on la retrouve avec le total : total de la ligne moins les autres cases.",
      exemple: {
        enonce: "Filles à pied : $77$ ; total à pied : $142$. Combien de garçons à pied ?",
        solution: "$142 - 77 = 65$ garçons."
      }
    },
    {
      titre: "Le diagramme en barres",
      video: { titre: "Vidéo de Maître Lucas : lire un graphique et un tableau", youtube: "https://youtu.be/s8HRE-YRjmQ" },
      texte:
        "Chaque barre représente une réponse. Sa hauteur se lit sur l'axe vertical.\n\n" +
        "Attention à l'**échelle** : les lignes peuvent aller de $5$ en $5$, de $10$ en $10$, de $20$ en $20$…\n\n" +
        "Sur ce diagramme, la plupart des élèves viennent à pied ($142$).",
      figure: "e1d-cours-barres",
      exemple: {
        enonce: "Combien d'élèves viennent en voiture ?",
        solution: "La barre « voiture » monte jusqu'à $48$."
      }
    }
  ],

  exercices: [
    { type: "e1d-chemin", titre: "Suivre et écrire un code", etape: "Se repérer", nb: 5 },
    { type: "e1d-double", titre: "Le tableau à double entrée", etape: "Tableaux et diagrammes", nb: 5 },
    { type: "e1d-diagramme", titre: "Lire un diagramme en barres", etape: "Tableaux et diagrammes", nb: 5 }
  ],

  qcm: [
    { question: "Combien d'élèves aiment le bleu ?", figure: "e1d-qcm-barres", choix: ["$40$", "$8$", "$35$", "$45$"], bonne: 0, explication: "Les lignes vont de $5$ en $5$ ; la barre bleue monte à $40$." },
    { question: "Quelle couleur est la moins choisie ?", figure: "e1d-qcm-barres", choix: ["vert", "rouge", "bleu", "jaune"], bonne: 0, explication: "La barre verte est la plus basse ($15$)." },
    { question: "Combien d'élèves de plus aiment le jaune que le rouge ?", figure: "e1d-qcm-barres", choix: ["$5$", "$55$", "$1$", "$10$"], bonne: 0, explication: "$30 - 25 = 5$." },
    { question: "Combien d'élèves ont répondu en tout ?", figure: "e1d-qcm-barres", choix: ["$110$", "$100$", "$4$", "$95$"], bonne: 0, explication: "$25 + 40 + 15 + 30 = 110$." },
    { question: "La flèche $\\downarrow$ fait aller :", choix: ["d'une case vers le bas", "d'une case vers le haut", "à droite", "à gauche"], bonne: 0, explication: "Elle pointe vers le bas." },
    { question: "Le code $\\rightarrow \\rightarrow \\uparrow$ fait avancer de :", choix: ["$2$ cases à droite puis $1$ en haut", "$1$ case à droite puis $2$ en haut", "$3$ cases à droite", "$2$ cases en haut"], bonne: 0, explication: "On lit les flèches dans l'ordre." },
    { question: "Dans un tableau à double entrée, une case se trouve avec :", choix: ["une ligne et une colonne", "seulement la ligne", "seulement la colonne", "le total"], bonne: 0, explication: "On croise ligne et colonne." },
    { question: "Filles en bus : $18$ ; garçons en bus : $27$. Élèves en bus :", choix: ["$45$", "$9$", "$1\\,827$", "$35$"], bonne: 0, explication: "$18 + 27 = 45$." },
    { question: "Total de la ligne « Filles » : $148$ ; filles à pied $77$, en vélo $29$, en voiture $24$. Filles en bus :", choix: ["$18$", "$130$", "$28$", "$48$"], bonne: 0, explication: "$77 + 29 + 24 = 130$ ; $148 - 130 = 18$." },
    { question: "Sur un diagramme, l'échelle va de $10$ en $10$. Une barre à mi-chemin entre $40$ et $50$ vaut :", choix: ["$45$", "$4{,}5$", "$41$", "$90$"], bonne: 0, explication: "Au milieu de $40$ et $50$ : $45$." },
    { question: "Pour revenir au point de départ après $\\rightarrow \\rightarrow \\uparrow$, on fait :", choix: ["$\\downarrow \\leftarrow \\leftarrow$", "$\\rightarrow \\rightarrow \\uparrow$", "$\\uparrow \\leftarrow$", "$\\downarrow \\downarrow$"], bonne: 0, explication: "On fait le chemin à l'envers." },
    { question: "« Près » est le contraire de :", choix: ["loin", "sous", "devant", "gauche"], bonne: 0, explication: "Près / loin." },
    { question: "Un plan de l'école montre l'école vue :", choix: ["d'en haut", "de côté", "de dessous", "de loin seulement"], bonne: 0, explication: "Un plan est une vue de dessus." },
    { question: "Dans un tableau, la case « Total » en bas à droite donne :", choix: ["le nombre de toutes les réponses", "la première réponse", "la plus petite case", "rien"], bonne: 0, explication: "C'est le total de tout le tableau." },
    { question: "La barre la plus haute correspond à :", choix: ["la réponse la plus fréquente", "la réponse la moins fréquente", "le total", "la première réponse"], bonne: 0, explication: "Plus haut = plus d'élèves." },
    { question: "Total de la colonne « vélo » : $47$ ; filles à vélo : $29$. Garçons à vélo :", choix: ["$18$", "$76$", "$29$", "$28$"], bonne: 0, explication: "$47 - 29 = 18$." },
    { question: "Pour présenter les réponses d'une enquête, on peut faire :", choix: ["un tableau ou un diagramme en barres", "une addition posée", "un cercle au compas", "une horloge"], bonne: 0, explication: "Tableau et diagramme rangent les données." },
    { question: "Combien de cases fait le code $\\uparrow \\uparrow \\rightarrow \\rightarrow \\rightarrow$ ?", choix: ["$5$", "$2$", "$3$", "$6$"], bonne: 0, explication: "Une flèche = une case." }
  ],

  methode: [
    {
      titre: "Retrouver une case cachée d'un tableau",
      etapes: [
        "Prends la ligne (ou la colonne) où se trouve la case cachée.",
        "Additionne les autres cases de cette ligne.",
        "Enlève ce résultat du total de la ligne."
      ],
      exemple: "Total $148$, autres cases $77 + 29 + 24 = 130$ : la case cachée vaut $18$."
    },
    {
      titre: "Lire un diagramme en barres",
      etapes: [
        "Regarde l'échelle : de combien en combien vont les lignes ?",
        "Suis le haut de la barre jusqu'à l'axe.",
        "Lis la valeur (au milieu de deux lignes si besoin)."
      ],
      figure: "e1d-cours-barres",
      exemple: "Barre « vélo » : $47$."
    }
  ],
  erreurs: [
    "Lire l'échelle de $1$ en $1$ alors qu'elle va de $5$ en $5$.",
    "Prendre la mauvaise ligne dans un tableau à double entrée.",
    "Confondre la case « Total » avec une case de données.",
    "Oublier une flèche dans un code de déplacement."
  ]
};
