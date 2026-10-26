/*
  CHAPITRE : CP — Lire l'heure
  -----------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CP, « Le repérage dans le temps » (heures entières seulement) :
  - lire sur une horloge à aiguilles une heure entière (trois heures, neuf heures, midi) ;
  - positionner les aiguilles pour une heure entière inférieure ou égale à douze ;
  - associer une heure à un moment de la journée (se lever, aller à l'école, déjeuner…).
  figure : FIGURES de assets/exercices-cp.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cp-heure"] = {
  niveau: "CP",
  numero: 9,
  titre: "Lire l'heure",
  accroche: "La petite aiguille, la grande aiguille : lire les heures justes et les relier aux moments de la journée.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "Les deux aiguilles",
      video: { titre: "Vidéo de Maître Lucas : les heures pleines", youtube: "https://youtu.be/hyINRBm1YbU" },
      texte:
        "Une horloge a deux aiguilles :\n\n" +
        "- la **petite aiguille** montre les **heures** ;\n" +
        "- la **grande aiguille** montre les minutes.\n\n" +
        "Quand la grande aiguille est sur le $12$, c'est une **heure juste** : on lit le nombre montré par la petite aiguille.\n\n" +
        "Sur l'horloge, la petite aiguille est sur le $3$ et la grande sur le $12$ : il est $3$ heures.",
      figure: "cp9-cours-horloge",
      exemple: {
        enonce: "La petite aiguille est sur le $10$ et la grande sur le $12$. Quelle heure est-il ?",
        solution: "Il est $10$ heures."
      }
    },
    {
      titre: "Placer les aiguilles",
      video: { titre: "Vidéo de Maître Lama et Léo : lire l'heure au CP", youtube: "https://youtu.be/JoNb4PDIYLk" },
      texte:
        "Pour montrer une heure juste :\n\n" +
        "1. mets la **grande aiguille sur le $12$** ;\n" +
        "2. mets la **petite aiguille sur le nombre de l'heure**.\n\n" +
        "À **midi**, les deux aiguilles sont sur le $12$, l'une sur l'autre.",
      figure: "cp9-cours-aiguilles",
      exemple: {
        enonce: "Où mettre les aiguilles pour $6$ heures ?",
        solution: "La grande aiguille sur le $12$, la petite sur le $6$."
      }
    },
    {
      titre: "Les moments de la journée",
      video: { titre: "Vidéo de Maître Lucas : la journée", youtube: "https://youtu.be/ZPqYwqsXQik" },
      texte:
        "- Le **matin** : on se lève vers $6$ heures, on arrive à l'école vers $7$ heures.\n" +
        "- **Midi** : on déjeune.\n" +
        "- L'**après-midi** : on sort de l'école, on goûte vers $4$ heures, on va à la madrassa.\n" +
        "- Le **soir** : on dîne, on se couche vers $8$ heures.\n" +
        "- La **nuit** : on dort.\n\n" +
        "L'horloge fait deux tours dans une journée : il y a $7$ heures du matin et $7$ heures du soir.",
      exemple: {
        enonce: "Il est $9$ heures et il fait nuit. Est-ce le matin ou le soir ?",
        solution: "Il fait nuit : c'est $9$ heures du soir."
      }
    }
  ],

  exercices: [
    { type: "cp9-lire", titre: "Quelle heure est-il ?", etape: "Lire l'heure", nb: 6 },
    { type: "cp9-choisir", titre: "Trouver la bonne horloge", etape: "Lire l'heure", nb: 5 },
    { type: "cp9-moments", titre: "Les heures de la journée", etape: "Se repérer dans la journée", nb: 5 }
  ],

  qcm: [
    { question: "Quelle heure est-il ?", figure: "cp9-qcm-horloge", choix: ["$8$ heures", "$12$ heures", "$4$ heures", "$2$ heures"], bonne: 0, explication: "La petite aiguille est sur le $8$, la grande sur le $12$." },
    { question: "Quelle horloge indique $10$ heures ?", figure: "cp9-qcm-horloges", choix: ["B", "A", "C", "Aucune"], bonne: 0, explication: "La petite aiguille de l'horloge B est sur le $10$." },
    { question: "Quelle horloge indique midi ?", figure: "cp9-qcm-horloges", choix: ["C", "A", "B", "Aucune"], bonne: 0, explication: "À midi, les deux aiguilles sont sur le $12$." },
    { question: "La petite aiguille montre :", choix: ["les heures", "les minutes", "les jours", "les secondes"], bonne: 0, explication: "La petite aiguille montre les heures." },
    { question: "Pour une heure juste, la grande aiguille est sur le :", choix: ["$12$", "$6$", "$1$", "$3$"], bonne: 0, explication: "Grande aiguille sur le $12$ : heure juste." },
    { question: "À quel moment déjeune-t-on à la cantine ?", choix: ["à midi", "à minuit", "à $6$ heures du matin", "à $9$ heures du soir"], bonne: 0, explication: "On déjeune vers midi." },
    { question: "Il est $7$ heures, on va à l'école. C'est :", choix: ["le matin", "le soir", "la nuit", "midi"], bonne: 0, explication: "On va à l'école le matin." },
    { question: "Il est $3$ heures. Dans $2$ heures, il sera :", choix: ["$5$ heures", "$1$ heure", "$6$ heures", "$32$ heures"], bonne: 0, explication: "$3 + 2 = 5$." },
    { question: "Il est $11$ heures. Une heure plus tard, il est :", choix: ["midi", "$10$ heures", "$1$ heure", "$111$ heures"], bonne: 0, explication: "Après $11$ heures vient midi ($12$ heures)." },
    { question: "La petite aiguille est sur le $4$, la grande sur le $12$. Il est :", choix: ["$4$ heures", "$12$ heures", "$12$ heures $4$", "$4$ heures et demie"], bonne: 0, explication: "On lit la petite aiguille : $4$ heures." },
    { question: "Pour montrer $9$ heures, la petite aiguille va sur le :", choix: ["$9$", "$12$", "$3$", "$6$"], bonne: 0, explication: "La petite aiguille montre l'heure : $9$." },
    { question: "On se couche le plus souvent vers :", choix: ["$8$ heures du soir", "$8$ heures du matin", "midi", "$3$ heures de l'après-midi"], bonne: 0, explication: "On se couche le soir." },
    { question: "Une horloge fait combien de tours en une journée ?", choix: ["$2$ tours", "$1$ tour", "$12$ tours", "$24$ tours"], bonne: 0, explication: "Un tour le matin, un tour l'après-midi et le soir." },
    { question: "Les aiguilles sont toutes les deux sur le $12$ et il fait nuit. Il est :", choix: ["minuit", "midi", "$6$ heures", "$1$ heure"], bonne: 0, explication: "$12$ heures la nuit, c'est minuit." },
    { question: "Il est $6$ heures. Il y a $2$ heures, il était :", choix: ["$4$ heures", "$8$ heures", "$2$ heures", "$6$ heures"], bonne: 0, explication: "$6 - 2 = 4$." },
    { question: "Il est $9$ heures du matin. Que fait-on le plus souvent ?", choix: ["on est à l'école", "on dort", "on dîne", "on se couche"], bonne: 0, explication: "À $9$ heures du matin, on est en classe." },
    { question: "Il est $8$ heures. Une heure plus tôt, il était :", choix: ["$7$ heures", "$9$ heures", "$8$ heures", "$18$ heures"], bonne: 0, explication: "$8 - 1 = 7$." },
    { question: "La grande aiguille montre :", choix: ["les minutes", "les heures", "les jours", "les mois"], bonne: 0, explication: "La grande aiguille sert aux minutes." }
  ],

  methode: [
    {
      titre: "Lire une heure juste",
      etapes: [
        "Vérifie que la grande aiguille est sur le $12$.",
        "Regarde le nombre montré par la petite aiguille.",
        "Dis : « Il est … heures »."
      ],
      figure: "cp9-cours-horloge",
      exemple: "Petite aiguille sur le $3$ : il est $3$ heures."
    }
  ],
  erreurs: [
    "Lire la grande aiguille à la place de la petite.",
    "Dire « $12$ heures » à chaque fois parce que la grande aiguille est sur le $12$.",
    "Oublier que $7$ heures peut être le matin ou le soir.",
    "Confondre midi (le jour) et minuit (la nuit)."
  ]
};
