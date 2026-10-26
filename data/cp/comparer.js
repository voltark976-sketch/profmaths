/*
  CHAPITRE : CP — Comparer et ranger
  -----------------------------------
  Programme du cycle 2 (BO n° 41 du 31 octobre 2024), CP :
  - comparer, encadrer, intercaler des nombres entiers avec =, < et > ; vocabulaire « plus que, moins que, autant que » ;
  - ordonner cinq nombres dans l'ordre croissant ou décroissant ;
  - associer un nombre à une position sur une bande numérique et à un point d'une demi-droite graduée de un en un.
  figure : FIGURES de assets/exercices-cp.js.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cp-comparer"] = {
  niveau: "CP",
  numero: 2,
  titre: "Comparer et ranger",
  accroche: "Dire quel nombre est le plus grand, utiliser les signes $<$, $>$ et $=$, ranger des nombres et les placer sur une droite graduée.",

  playlist: "",
  drive: "",
  pdfs: [],
  liens: [],

  cours: [
    {
      titre: "Comparer deux nombres",
      video: { titre: "Vidéo de Maître Lucas : comparer et ranger les nombres jusqu'à 99", youtube: "https://youtu.be/gIh-H4iu9hE" },
      texte:
        "Pour savoir quel nombre est le plus grand :\n\n" +
        "1. on regarde d'abord les **dizaines** : celui qui a le plus de dizaines est le plus grand ;\n" +
        "2. si les dizaines sont pareilles, on regarde les **unités**.\n\n" +
        "$52$ est plus grand que $38$ : $5$ dizaines, c'est plus que $3$ dizaines.\n\n" +
        "$46$ est plus petit que $49$ : même nombre de dizaines, mais $6$ unités, c'est moins que $9$.\n\n" +
        "Sur la droite graduée, le plus petit nombre est toujours à gauche.",
      figure: "cp2-cours-signes",
      exemple: {
        enonce: "Zaïnaba a $27$ billes et Saïd en a $72$. Qui en a le plus ?",
        solution: "$72$ a $7$ dizaines et $27$ n'en a que $2$ : c'est Saïd qui en a le plus."
      }
    },
    {
      titre: "Les signes $<$, $>$ et $=$",
      video: { titre: "Vidéo d'« À nous les maths » : les signes plus petit et plus grand", youtube: "https://youtu.be/FVl4mH4--EA" },
      texte:
        "- $<$ se lit « est plus petit que » (ou « est inférieur à ») : $35 < 41$.\n" +
        "- $>$ se lit « est plus grand que » (ou « est supérieur à ») : $63 > 59$.\n" +
        "- $=$ se lit « est égal à » : $2$ dizaines et $4$ unités $= 24$.\n\n" +
        "Astuce : le signe est comme une bouche ouverte tournée vers le plus grand nombre. La pointe montre le plus petit.",
      exemple: {
        enonce: "Choisis le bon signe : $81 \\;\\ldots\\; 18$.",
        solution: "$81$ a $8$ dizaines, $18$ en a $1$ : $81 > 18$."
      }
    },
    {
      titre: "Ranger des nombres",
      video: { titre: "Vidéo de Maître Lucas : comparer et ranger les nombres jusqu'à 19", youtube: "https://youtu.be/Bq81VJ_0Ksc" },
      texte:
        "- Ranger dans l'ordre **croissant**, c'est aller du plus petit au plus grand : $12 < 29 < 31 < 70$.\n" +
        "- Ranger dans l'ordre **décroissant**, c'est aller du plus grand au plus petit : $70 > 31 > 29 > 12$.\n\n" +
        "Méthode : cherche le plus petit nombre, écris-le, barre-le, puis recommence avec ceux qui restent.",
      exemple: {
        enonce: "Range dans l'ordre croissant : $45$ ; $9$ ; $54$ ; $40$.",
        solution: "$9 < 40 < 45 < 54$."
      }
    },
    {
      titre: "Encadrer et placer sur une droite graduée",
      video: { titre: "Vidéo de Maître Lucas : utiliser une droite graduée, intercaler des nombres", youtube: "https://youtu.be/cZ9tQ_OV_3g" },
      texte:
        "- **Encadrer** $37$ entre deux dizaines : $30 < 37 < 40$.\n" +
        "- **Intercaler** : un nombre entre $58$ et $60$, c'est $59$.\n\n" +
        "Sur une droite graduée de un en un, on avance de $1$ à chaque trait. Pour lire un point, on part d'un nombre écrit et on compte les **bonds** (les espaces entre les traits).",
      figure: "cp2-cours-droite",
      exemple: {
        enonce: "Sur la figure, quel nombre est au point A ?",
        solution: "La droite commence à $20$ ; A est à $7$ bonds de $20$ : $27$."
      }
    }
  ],

  exercices: [
    { type: "cp2-signes", titre: "Choisir le bon signe : <, > ou =", etape: "Comparer", nb: 6 },
    { type: "cp2-ranger", titre: "Le plus grand, le plus petit, ranger", etape: "Comparer", nb: 6 },
    { type: "cp2-encadrer", titre: "Encadrer et intercaler", etape: "Encadrer et placer", nb: 6 },
    { type: "cp2-droite", titre: "Lire une droite graduée", etape: "Encadrer et placer", nb: 6 }
  ],

  qcm: [
    { question: "Quel est le plus grand nombre ?", choix: ["$61$", "$16$", "$59$", "$60$"], bonne: 0, explication: "$61$ a $6$ dizaines et $1$ unité : c'est plus que $60$, $59$ et $16$." },
    { question: "Quel est le plus petit nombre ?", choix: ["$39$", "$93$", "$40$", "$49$"], bonne: 0, explication: "$39$ n'a que $3$ dizaines." },
    { question: "$47 \\;\\ldots\\; 74$", choix: ["$<$", "$>$", "$=$"], bonne: 0, explication: "$47$ a $4$ dizaines, $74$ en a $7$ : $47 < 74$." },
    { question: "$85 \\;\\ldots\\; 58$", choix: ["$>$", "$<$", "$=$"], bonne: 0, explication: "$8$ dizaines, c'est plus que $5$ dizaines : $85 > 58$." },
    { question: "$3$ dizaines et $6$ unités $\\;\\ldots\\; 36$", choix: ["$=$", "$<$", "$>$"], bonne: 0, explication: "$3$ dizaines et $6$ unités, c'est $36$." },
    { question: "$62 \\;\\ldots\\; 65$", choix: ["$<$", "$>$", "$=$"], bonne: 0, explication: "Même nombre de dizaines ; $2$ unités, c'est moins que $5$ : $62 < 65$." },
    { question: "Que veut dire le signe $>$ ?", choix: ["est plus grand que", "est plus petit que", "est égal à", "plus"], bonne: 0, explication: "$9 > 4$ se lit « $9$ est plus grand que $4$ »." },
    { question: "Quels nombres sont rangés dans l'ordre croissant ?", choix: ["$15$ ; $21$ ; $38$ ; $80$", "$80$ ; $38$ ; $21$ ; $15$", "$21$ ; $15$ ; $38$ ; $80$", "$15$ ; $38$ ; $21$ ; $80$"], bonne: 0, explication: "Croissant : du plus petit au plus grand." },
    { question: "Quels nombres sont rangés dans l'ordre décroissant ?", choix: ["$94$ ; $49$ ; $44$ ; $9$", "$9$ ; $44$ ; $49$ ; $94$", "$94$ ; $44$ ; $49$ ; $9$", "$49$ ; $94$ ; $44$ ; $9$"], bonne: 0, explication: "Décroissant : du plus grand au plus petit." },
    { question: "Quel nombre est entre $69$ et $71$ ?", choix: ["$70$", "$60$", "$72$", "$80$"], bonne: 0, explication: "$69$, $70$, $71$ : le nombre du milieu est $70$." },
    { question: "Complète : $50 < 54 < \\ldots$", choix: ["$60$", "$55$", "$45$", "$50$"], bonne: 0, explication: "On encadre entre deux dizaines : $50 < 54 < 60$." },
    { question: "Quel nombre est au point B ?", figure: "cp2-qcm-droite", choix: ["$53$", "$54$", "$3$", "$52$"], bonne: 0, explication: "La droite commence à $50$ ; B est à $3$ bonds : $53$." },
    { question: "Sur une droite graduée, le plus petit nombre est :", choix: ["à gauche", "à droite", "au milieu", "n'importe où"], bonne: 0, explication: "Les nombres augmentent quand on va vers la droite." },
    { question: "Anli a $43$ billes, Awa en a $34$ et Kamal en a $40$. Qui en a le plus ?", choix: ["Anli", "Awa", "Kamal", "Ils en ont autant"], bonne: 0, explication: "$43 > 40 > 34$ : c'est Anli." },
    { question: "Avec les chiffres $2$ et $8$, le plus grand nombre est :", choix: ["$82$", "$28$", "$10$", "$88$"], bonne: 0, explication: "On met le plus grand chiffre aux dizaines : $82$." },
    { question: "Avec les chiffres $5$ et $1$, le plus petit nombre est :", choix: ["$15$", "$51$", "$6$", "$11$"], bonne: 0, explication: "On met le plus petit chiffre aux dizaines : $15$." },
    { question: "$100 \\;\\ldots\\; 99$", choix: ["$>$", "$<$", "$=$"], bonne: 0, explication: "$100$ vient juste après $99$ : $100 > 99$." },
    { question: "Quel nombre est plus grand que $57$ ?", choix: ["$61$", "$50$", "$56$", "$49$"], bonne: 0, explication: "$61$ a $6$ dizaines, plus que $57$." },
    { question: "Quel nombre est plus petit que $30$ ?", choix: ["$29$", "$31$", "$40$", "$300$"], bonne: 0, explication: "$29$ vient juste avant $30$." },
    { question: "Quelle écriture est juste ?", choix: ["$28 < 31$", "$28 > 31$", "$28 = 31$", "$31 < 28$"], bonne: 0, explication: "$28$ a $2$ dizaines, $31$ en a $3$ : $28 < 31$." }
  ],

  methode: [
    {
      titre: "Comparer deux nombres",
      etapes: [
        "Compare les chiffres des dizaines.",
        "S'ils sont pareils, compare les chiffres des unités.",
        "Écris le signe : la pointe vers le plus petit."
      ],
      exemple: "$76$ et $72$ : $7$ dizaines tous les deux, $6 > 2$, donc $76 > 72$."
    },
    {
      titre: "Ranger dans l'ordre croissant",
      etapes: [
        "Cherche le plus petit nombre et écris-le.",
        "Barre-le et cherche le plus petit des nombres qui restent.",
        "Continue jusqu'au dernier, puis vérifie avec le signe $<$."
      ],
      exemple: "$31$ ; $13$ ; $30$ → $13 < 30 < 31$."
    },
    {
      titre: "Lire un point sur une droite graduée",
      etapes: [
        "Repère un nombre écrit juste avant le point.",
        "Compte les bonds (espaces) jusqu'au point.",
        "Ajoute ce nombre de bonds au nombre écrit."
      ],
      figure: "cp2-methode-droite",
      exemple: "Point C : $60$ et encore $4$ bonds, c'est $64$."
    }
  ],
  erreurs: [
    "Regarder les unités avant les dizaines : $39 < 41$ même si $9 > 1$.",
    "Retourner le signe : la pointe de $<$ et $>$ montre toujours le plus petit nombre.",
    "Confondre croissant (du plus petit au plus grand) et décroissant.",
    "Compter les traits au lieu des bonds sur une droite graduée.",
    "Oublier que la droite graduée ne commence pas toujours à $0$."
  ]
};
