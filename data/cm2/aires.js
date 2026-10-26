/*
  CHAPITRE : CM2 — Les aires
  ---------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM2 : comparer des aires ; déterminer des aires ; unités cm², dm²,
  m² ; convertir des aires (1 m² = 100 dm², 1 dm² = 100 cm²) ; déterminer l'aire d'un carré ou d'un rectangle.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm2-aires"] = {
  niveau: "CM2",
  numero: 11,
  titre: "Les aires",
  accroche: "Les unités d'aire, et l'aire du carré et du rectangle.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Aire du rectangle et du carré",
      video: { titre: "Vidéo de Maître Lucas : aires d'un rectangle et d'un carré", youtube: "https://youtu.be/pcsEoZ5xzFw" },
      texte:
        "Ce rectangle de $5$ cm sur $3$ cm contient $3$ rangées de $5$ carrés de $1$ cm² : son aire est $5 \\times 3 = 15$ cm².\n\n" +
        "- **Aire du rectangle** $=$ longueur $\\times$ largeur (dans la même unité).\n" +
        "- **Aire du carré** $=$ côté $\\times$ côté : un carré de $12$ cm de côté a une aire de $144$ cm².\n" +
        "- Ne pas confondre avec le **périmètre** (le tour) : ici $5 + 3 + 5 + 3 = 16$ cm.",
      figure: "m2s-cours-rectangle",
      exemple: { enonce: "Un jardin rectangulaire a une aire de $174$ m² et une largeur de $6$ m. Sa longueur ?", solution: "$174 \\div 6 = 29$ m." }
    },
    {
      titre: "Les unités d'aire",
      video: { titre: "Vidéo de Maître Lucas : conversion d'unités d'aire", youtube: "https://youtu.be/lHbS8oclxE4" },
      texte:
        "- $1$ **cm²** : l'aire d'un carré de $1$ cm de côté (un ongle).\n" +
        "- $1$ **dm²** : l'aire d'un carré de $1$ dm ($10$ cm) de côté : $10 \\times 10 = 100$ cm².\n" +
        "- $1$ **m²** : l'aire d'un carré de $1$ m de côté : $10 \\times 10 = 100$ dm².\n\n" +
        "Donc $1$ m² $= 100$ dm² et $1$ dm² $= 100$ cm². Attention : on multiplie par $100$, **pas par $10$** !\n\n" +
        "$350$ cm² $= 3{,}5$ dm² ; $1$ cm² $= 0{,}01$ dm².",
      exemple: { enonce: "Compare $5$ dm² et $480$ cm².", solution: "$5$ dm² $= 500$ cm² $> 480$ cm²." }
    }
  ],
  exercices: [
    { type: "m2s-mesurer", titre: "Mesurer une aire sur quadrillage", etape: "Mesurer", nb: 5 },
    { type: "m2s-calculer", titre: "Aire du carré et du rectangle", etape: "Calculer", nb: 6 },
    { type: "m2s-unites", titre: "Unités d'aire", etape: "Unités", nb: 6 }
  ],
  qcm: [
    { question: "Aire d'un rectangle de $5$ cm sur $3$ cm :", choix: ["$15$ cm²", "$16$ cm²", "$8$ cm²", "$15$ cm"], bonne: 0, explication: "$5 \\times 3$." },
    { question: "Aire d'un carré de côté $12$ cm :", choix: ["$144$ cm²", "$48$ cm²", "$24$ cm²", "$124$ cm²"], bonne: 0, explication: "$12 \\times 12$." },
    { question: "Périmètre du rectangle de $5$ cm sur $3$ cm :", choix: ["$16$ cm", "$15$ cm", "$8$ cm", "$30$ cm"], bonne: 0, explication: "$5 + 3 + 5 + 3$." },
    { question: "$1$ m² $=$", choix: ["$100$ dm²", "$10$ dm²", "$1\\,000$ dm²", "$100$ cm²"], bonne: 0, explication: "Un carré de $10$ dm sur $10$ dm." },
    { question: "$1$ dm² $=$", choix: ["$100$ cm²", "$10$ cm²", "$1\\,000$ cm²", "$1$ cm²"], bonne: 0, explication: "Un carré de $10$ cm sur $10$ cm." },
    { question: "$21$ dm² $=$", choix: ["$2\\,100$ cm²", "$210$ cm²", "$21\\,000$ cm²", "$0{,}21$ cm²"], bonne: 0, explication: "$21 \\times 100$." },
    { question: "$350$ cm² $=$", choix: ["$3{,}5$ dm²", "$35$ dm²", "$0{,}35$ dm²", "$35\\,000$ dm²"], bonne: 0, explication: "$350 \\div 100$." },
    { question: "Choisis le bon signe : $5$ dm² $\\ldots$ $480$ cm²", choix: ["$>$", "$<$", "$=$"], bonne: 0, explication: "$500$ cm² $> 480$ cm²." },
    { question: "Une aire de $174$ m² et une largeur de $6$ m : la longueur est :", choix: ["$29$ m", "$168$ m", "$1\\,044$ m", "$30$ m"], bonne: 0, explication: "$174 \\div 6$." },
    { question: "L'aire d'une salle de classe est environ :", choix: ["$60$ m²", "$60$ cm²", "$60$ dm²", "$6$ cm²"], bonne: 0, explication: "Environ $8$ m sur $7{,}5$ m." },
    { question: "L'aire d'un timbre est environ :", choix: ["$6$ cm²", "$6$ m²", "$6$ dm²", "$600$ m²"], bonne: 0, explication: "Environ $2$ cm sur $3$ cm." },
    { question: "Un carré a une aire de $49$ cm². Son côté mesure :", choix: ["$7$ cm", "$49$ cm", "$12{,}25$ cm", "$24{,}5$ cm"], bonne: 0, explication: "$7 \\times 7 = 49$." },
    { question: "Une pièce de $6$ m sur $4$ m avec un tapis de $3$ m sur $2$ m : aire de sol visible :", choix: ["$18$ m²", "$24$ m²", "$6$ m²", "$30$ m²"], bonne: 0, explication: "$24 - 6$." },
    { question: "Pour calculer une aire, la longueur et la largeur doivent être :", choix: ["dans la même unité", "dans des unités différentes", "toujours en mètres", "toujours entières"], bonne: 0, explication: "Sinon, on convertit d'abord." },
    { question: "Si on double les côtés d'un carré, son aire :", choix: ["est multipliée par $4$", "double", "ne change pas", "est multipliée par $8$"], bonne: 0, explication: "$2 \\times 2 = 4$ fois plus de petits carrés." },
    { question: "$3$ m² $\\ldots$ $250$ dm² :", choix: ["$>$", "$<$", "$=$"], bonne: 0, explication: "$300$ dm² $> 250$ dm²." },
    { question: "Deux figures de même aire ont-elles toujours le même périmètre ?", choix: ["non", "oui", "seulement les carrés"], bonne: 0, explication: "Un rectangle $6 \\times 1$ et un $3 \\times 2$ : même aire, périmètres $14$ et $10$." },
    { question: "Un terrain de $50$ m sur $20$ m a une aire de :", choix: ["$1\\,000$ m²", "$140$ m²", "$70$ m²", "$100$ m²"], bonne: 0, explication: "$50 \\times 20$." }
  ],
  methode: [
    { titre: "Calculer l'aire d'un rectangle", etapes: ["Vérifie que la longueur et la largeur sont dans la même unité.", "Multiplie la longueur par la largeur.", "Écris l'unité d'aire (cm², dm², m²)."], figure: "m2s-cours-rectangle", exemple: "$5$ cm $\\times 3$ cm $= 15$ cm²." },
    { titre: "Convertir des aires", etapes: ["Retiens : $1$ m² $= 100$ dm² et $1$ dm² $= 100$ cm².", "Vers une unité plus petite : $\\times 100$ ; vers une plus grande : $\\div 100$.", "Vérifie : chaque saut d'unité déplace les chiffres de $2$ rangs."], exemple: "$350$ cm² $= 3{,}5$ dm²." }
  ],
  erreurs: ["Confondre aire et périmètre.", "Croire que $1$ m² $= 10$ dm².", "Écrire « cm » au lieu de « cm² ».", "Multiplier des longueurs dans des unités différentes."]
};
