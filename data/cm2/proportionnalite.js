/*
  CHAPITRE : CM2 — La proportionnalité
  -------------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM2 : identifier une situation de proportionnalité ; résoudre des
  problèmes de proportionnalité en plusieurs étapes, dans le cadre des grandeurs, par des raisonnements en langage
  naturel fondés sur la linéarité (« 3 fois plus… », « 4 fois moins… », réunir deux quantités). Pas de tableau de
  proportionnalité, ni de coefficient, ni de produit en croix au cours moyen.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm2-proportionnalite"] = {
  niveau: "CM2",
  numero: 9,
  titre: "La proportionnalité",
  accroche: "« Si j'achète 3 fois plus, je paie 3 fois plus » : raisonner en phrases, étape par étape.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "Fois plus, fois moins",
      video: { titre: "Vidéo de Maître Lucas : découvrir la proportionnalité", youtube: "https://youtu.be/PDpsbdbmn_Q" },
      texte:
        "Au marché de Mamoudzou, $4$ kilos de mangues coûtent $12$ €.\n\n" +
        "- **$3$ fois plus** de mangues ($12$ kilos) : on paie $3$ fois plus : $3 \\times 12 = 36$ €.\n" +
        "- **$2$ fois moins** de mangues ($2$ kilos) : on paie $2$ fois moins : $12 \\div 2 = 6$ €.\n" +
        "- Une pile de $84$ feuilles a $6{,}72$ mm d'épaisseur ; **$2$ fois moins** de feuilles ($42$) : épaisseur $2$ fois plus petite : $3{,}36$ mm.",
      exemple: { enonce: "$6$ cahiers coûtent $9$ €. Combien coûtent $2$ cahiers ?", solution: "$2$, c'est $3$ fois moins que $6$ : $9 \\div 3 = 3$ €." }
    },
    {
      titre: "Combiner les raisonnements",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître la proportionnalité (sans tableau)", youtube: "https://youtu.be/7DSHIDWM-ss" },
      texte:
        "Une recette de mataba pour $4$ personnes demande $300$ g de feuilles de manioc. Pour $6$ personnes ?\n\n" +
        "- Pour $2$ personnes ($2$ fois moins) : $300 \\div 2 = 150$ g.\n" +
        "- Pour $6$ personnes ($4 + 2$) : $300 + 150 = 450$ g.\n\n" +
        "**Toutes les situations ne sont pas proportionnelles** : un abonnement de sport avec $15$ € d'inscription puis $3$ € par séance coûte $18$ € pour $1$ séance, mais $21$ € (et pas $36$ €) pour $2$ séances.",
      exemple: { enonce: "$2$ paquets de riz coûtent $6$ € et $5$ paquets $15$ €. Combien pour $9$ paquets ?", solution: "$9 = 2 \\times 2 + 5$ : $2 \\times 6 + 15 = 27$ €." }
    }
  ],
  exercices: [
    { type: "m2p-fois", titre: "Fois plus, fois moins", etape: "Fois plus", nb: 6 },
    { type: "m2p-combiner", titre: "Problèmes en plusieurs étapes", etape: "Combiner", nb: 6 },
    { type: "m2p-reconnaitre", titre: "Reconnaître la proportionnalité", etape: "Reconnaître", nb: 5 }
  ],
  qcm: [
    { question: "$4$ kilos de mangues coûtent $12$ €. $12$ kilos coûtent :", choix: ["$36$ €", "$20$ €", "$144$ €", "$24$ €"], bonne: 0, explication: "$3$ fois plus." },
    { question: "$4$ kilos de mangues coûtent $12$ €. $2$ kilos coûtent :", choix: ["$6$ €", "$10$ €", "$24$ €", "$4$ €"], bonne: 0, explication: "$2$ fois moins." },
    { question: "$6$ cahiers coûtent $9$ €. $2$ cahiers coûtent :", choix: ["$3$ €", "$5$ €", "$6$ €", "$4{,}50$ €"], bonne: 0, explication: "$3$ fois moins : $9 \\div 3$." },
    { question: "$300$ g pour $4$ personnes. Pour $6$ personnes :", choix: ["$450$ g", "$302$ g", "$600$ g", "$500$ g"], bonne: 0, explication: "$300 + 150$." },
    { question: "$2$ paquets : $6$ € ; $5$ paquets : $15$ €. $9$ paquets :", choix: ["$27$ €", "$21$ €", "$90$ €", "$30$ €"], bonne: 0, explication: "$2 \\times 6 + 15$." },
    { question: "$84$ feuilles : $6{,}72$ mm. $42$ feuilles :", choix: ["$3{,}36$ mm", "$13{,}44$ mm", "$6{,}30$ mm", "$4{,}2$ mm"], bonne: 0, explication: "$2$ fois moins de feuilles." },
    { question: "Un kilo de mangues coûte $3$ €. Le prix est-il proportionnel à la masse ?", choix: ["oui", "non", "on ne peut pas savoir"], bonne: 0, explication: "$2$ fois plus de kilos, $2$ fois plus cher." },
    { question: "Sport : $15$ € d'inscription et $3$ € par séance. Proportionnel au nombre de séances ?", choix: ["non", "oui", "on ne peut pas savoir"], bonne: 0, explication: "L'inscription ne se paie qu'une fois." },
    { question: "Le périmètre d'un carré est-il proportionnel à son côté ?", choix: ["oui", "non", "seulement pour les grands carrés"], bonne: 0, explication: "Côté doublé, périmètre doublé." },
    { question: "La taille d'un enfant est-elle proportionnelle à son âge ?", choix: ["non", "oui", "seulement jusqu'à $10$ ans"], bonne: 0, explication: "On ne mesure pas $2$ fois plus à $2$ fois plus d'âge." },
    { question: "Une piscine se remplit de $50$ L par minute. En $10$ minutes :", choix: ["$500$ L", "$60$ L", "$5$ L", "$5\\,000$ L"], bonne: 0, explication: "$10$ fois plus de temps." },
    { question: "$5$ tickets de barge coûtent $7{,}50$ €. $10$ tickets coûtent :", choix: ["$15$ €", "$12{,}50$ €", "$75$ €", "$17{,}50$ €"], bonne: 0, explication: "$2$ fois plus." },
    { question: "$8$ boîtes de sardines coûtent $20$ €. $2$ boîtes coûtent :", choix: ["$5$ €", "$10$ €", "$14$ €", "$4$ €"], bonne: 0, explication: "$4$ fois moins." },
    { question: "« Si je prends $4$ fois moins de feuilles, la pile est… »", choix: ["$4$ fois moins épaisse", "$4$ fois plus épaisse", "$4$ mm moins épaisse", "aussi épaisse"], bonne: 0, explication: "Situation de proportionnalité." },
    { question: "Pour résoudre un problème de proportionnalité au CM2, on :", choix: ["raisonne en phrases (« $3$ fois plus… »)", "fait un produit en croix", "devine", "additionne tout"], bonne: 0, explication: "On utilise les « fois plus », « fois moins », et on réunit." },
    { question: "$3$ sacs de ciment coûtent $30$ €. $7$ sacs coûtent :", choix: ["$70$ €", "$34$ €", "$210$ €", "$60$ €"], bonne: 0, explication: "Un sac : $10$ € ; $7 \\times 10$." },
    { question: "Un taxi : $4$ € fixes et $2$ € par km. $10$ km coûtent :", choix: ["$24$ €", "$40$ €", "$20$ €", "$60$ €"], bonne: 0, explication: "$4 + 20$ : pas proportionnel." },
    { question: "$12$ œufs pour $8$ personnes. Pour $2$ personnes :", choix: ["$3$ œufs", "$6$ œufs", "$4$ œufs", "$2$ œufs"], bonne: 0, explication: "$4$ fois moins de personnes : $12 \\div 4$." }
  ],
  methode: [
    { titre: "Résoudre un problème de proportionnalité", etapes: ["Vérifie que la situation est proportionnelle (pas de partie fixe).", "Compare les quantités : « fois plus » ? « fois moins » ?", "Sinon, décompose : réunis des quantités connues, ou passe par une quantité plus simple.", "Rédige ton raisonnement en phrases."], exemple: "Pour $6$ personnes : $4 + 2$ personnes → $300 + 150 = 450$ g." }
  ],
  erreurs: ["Ajouter au lieu de multiplier : « $2$ personnes de plus, $2$ g de plus ».", "Utiliser la proportionnalité quand il y a une partie fixe (inscription, prise en charge).", "Confondre « $4$ fois moins » et « $4$ de moins ».", "Oublier de rédiger le raisonnement."]
};
