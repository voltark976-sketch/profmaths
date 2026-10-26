/*
  CHAPITRE : CM1 — La proportionnalité
  -------------------------------------
  Programme du cycle 3 (BO n° 16 du 17 avril 2025), CM1 : reconnaître une situation de proportionnalité ; résoudre des
  problèmes en raisonnant en phrases (« 2 fois plus… », réunir deux quantités, passer par la valeur d'un seul objet).
  Pas de tableau de proportionnalité, de coefficient ni de produit en croix au CM1.
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["cm1-proportionnalite"] = {
  niveau: "CM1",
  numero: 9,
  titre: "La proportionnalité",
  accroche: "2 fois plus de mangues, 2 fois plus cher : raisonner pour trouver un prix.",
  playlist: "", drive: "", pdfs: [], liens: [],
  cours: [
    {
      titre: "« Fois plus » et « réunir »",
      video: { titre: "Vidéo de Maître Lucas : découvrir la proportionnalité", youtube: "https://youtu.be/PDpsbdbmn_Q" },
      texte:
        "Au marché de Mamoudzou, $3$ paquets de riz coûtent $9$ €.\n\n" +
        "- **Fois plus** : $6$ paquets, c'est $2$ fois plus que $3$ paquets, donc on paie $2$ fois plus : $2 \\times 9 = 18$ €.\n" +
        "- **Réunir** : si $2$ paquets coûtent $6$ €, alors $5$ paquets ($3 + 2$) coûtent $9 + 6 = 15$ €.\n\n" +
        "On dit que le prix est **proportionnel** au nombre de paquets.",
      exemple: { enonce: "$4$ cahiers coûtent $8$ €. Combien coûtent $12$ cahiers ?", solution: "$12$, c'est $3$ fois $4$ : on paie $3 \\times 8 = 24$ €." }
    },
    {
      titre: "Passer par un seul, reconnaître",
      video: { titre: "Vidéo d'Yvan Monka : reconnaître la proportionnalité (sans tableau)", youtube: "https://youtu.be/7DSHIDWM-ss" },
      texte:
        "**Passer par un seul objet.** $6$ paquets de riz coûtent $12$ €. Un seul coûte $12 \\div 6 = 2$ €. Donc $8$ paquets coûtent $8 \\times 2 = 16$ €.\n\n" +
        "**Toutes les situations ne sont pas proportionnelles !**\n\n" +
        "- Un taxi : $3$ € de prise en charge et $2$ € par km. Pour $1$ km : $5$ € ; pour $2$ km : $7$ €, pas $10$ €. Ce n'est **pas** proportionnel.\n" +
        "- La taille et l'âge : à $8$ ans on mesure environ $1{,}25$ m, mais pas $2{,}50$ m à $16$ ans !",
      exemple: { enonce: "$5$ tickets de barge coûtent $10$ €. Combien coûtent $7$ tickets ?", solution: "Un ticket coûte $10 \\div 5 = 2$ € ; $7 \\times 2 = 14$ €." }
    }
  ],
  exercices: [
    { type: "m1p-fois", titre: "Fois plus, fois plus cher", etape: "Fois plus", nb: 5 },
    { type: "m1p-unite", titre: "Passer par un seul objet", etape: "Un seul", nb: 5 },
    { type: "m1p-resoudre", titre: "Résoudre et reconnaître", etape: "Reconnaître", nb: 6 }
  ],
  qcm: [
    { question: "$3$ paquets de riz coûtent $9$ €. $6$ paquets coûtent :", choix: ["$18$ €", "$12$ €", "$54$ €", "$15$ €"], bonne: 0, explication: "$2$ fois plus de paquets, $2$ fois plus cher." },
    { question: "$4$ cahiers coûtent $8$ €. $12$ cahiers coûtent :", choix: ["$24$ €", "$16$ €", "$96$ €", "$20$ €"], bonne: 0, explication: "$3$ fois plus : $3 \\times 8$." },
    { question: "$2$ kilos de mangues coûtent $6$ € et $3$ kilos coûtent $9$ €. $5$ kilos coûtent :", choix: ["$15$ €", "$54$ €", "$3$ €", "$11$ €"], bonne: 0, explication: "$5 = 2 + 3$ : $6 + 9$." },
    { question: "$6$ paquets coûtent $12$ €. Un seul paquet coûte :", choix: ["$2$ €", "$6$ €", "$72$ €", "$18$ €"], bonne: 0, explication: "$12 \\div 6$." },
    { question: "$5$ tickets de barge coûtent $10$ €. $7$ tickets coûtent :", choix: ["$14$ €", "$12$ €", "$70$ €", "$17$ €"], bonne: 0, explication: "Un ticket : $2$ € ; $7 \\times 2$." },
    { question: "Une mangue coûte $2$ €. Le prix est-il proportionnel au nombre de mangues ?", choix: ["oui", "non", "on ne peut pas savoir"], bonne: 0, explication: "$2$ fois plus de mangues, $2$ fois plus cher." },
    { question: "Un taxi : $3$ € fixes et $2$ € par km. Le prix est-il proportionnel à la distance ?", choix: ["non", "oui", "on ne peut pas savoir"], bonne: 0, explication: "$1$ km : $5$ € ; $2$ km : $7$ €, pas $10$ €." },
    { question: "La taille d'un enfant est-elle proportionnelle à son âge ?", choix: ["non", "oui", "on ne peut pas savoir"], bonne: 0, explication: "On ne grandit pas toujours de la même façon." },
    { question: "Une recette : $4$ œufs pour $4$ personnes. Pour $8$ personnes :", choix: ["$8$ œufs", "$4$ œufs", "$12$ œufs", "$16$ œufs"], bonne: 0, explication: "$2$ fois plus de personnes." },
    { question: "$3$ sacs de ciment coûtent $30$ €. $9$ sacs coûtent :", choix: ["$90$ €", "$36$ €", "$270$ €", "$39$ €"], bonne: 0, explication: "$3$ fois plus : $3 \\times 30$." },
    { question: "$10$ pains aux raisins coûtent $15$ €. $5$ pains coûtent :", choix: ["$7{,}50$ €", "$10$ €", "$3$ €", "$30$ €"], bonne: 0, explication: "$2$ fois moins : la moitié de $15$." },
    { question: "Pour $2$ fois plus de bouteilles, on paie :", choix: ["$2$ fois plus", "$2$ € de plus", "la même chose", "la moitié"], bonne: 0, explication: "C'est une situation de proportionnalité." },
    { question: "$8$ boîtes de sardines coûtent $24$ €. Une boîte coûte :", choix: ["$3$ €", "$16$ €", "$32$ €", "$4$ €"], bonne: 0, explication: "$24 \\div 8$." },
    { question: "$4$ bouquets de brèdes coûtent $6$ € et $2$ bouquets coûtent $3$ €. $6$ bouquets coûtent :", choix: ["$9$ €", "$18$ €", "$12$ €", "$8$ €"], bonne: 0, explication: "$6 = 4 + 2$ : $6 + 3$." },
    { question: "Une voiture roule à vitesse constante : $60$ km en $1$ heure. En $3$ heures :", choix: ["$180$ km", "$63$ km", "$120$ km", "$20$ km"], bonne: 0, explication: "$3$ fois plus de temps, $3$ fois plus de distance." },
    { question: "Kamal a $10$ ans et sa sœur $5$ ans. Quand elle aura $10$ ans, il aura :", choix: ["$15$ ans", "$20$ ans", "$10$ ans", "$25$ ans"], bonne: 0, explication: "L'écart reste $5$ ans : ce n'est pas proportionnel." },
    { question: "$2$ kg de riz coûtent $4$ €. $1$ kg coûte :", choix: ["$2$ €", "$4$ €", "$8$ €", "$1$ €"], bonne: 0, explication: "La moitié." },
    { question: "$3$ cahiers coûtent $6$ €. Pour savoir le prix de $7$ cahiers, on peut :", choix: ["chercher le prix d'un cahier, puis multiplier par $7$", "ajouter $4$ € à $6$ €", "multiplier $6$ par $3$", "ajouter $7$ et $6$"], bonne: 0, explication: "Un cahier : $2$ € ; $7 \\times 2 = 14$ €." }
  ],
  methode: [
    { titre: "Trouver un prix par la proportionnalité", etapes: ["Compare les quantités : est-ce « $2$ fois plus », « $3$ fois plus » ?", "Sinon, essaie de réunir deux quantités connues.", "Sinon, cherche le prix d'un seul objet, puis multiplie.", "Écris ton raisonnement en phrases."], exemple: "$6$ paquets coûtent $12$ € → $1$ paquet : $2$ € → $8$ paquets : $16$ €." }
  ],
  erreurs: ["Ajouter au lieu de multiplier : $3$ paquets $9$ €, $6$ paquets $12$ € (faux).", "Croire que tout est proportionnel (âge, taxi avec prise en charge).", "Donner le prix d'un seul objet au lieu du prix demandé.", "Multiplier par la quantité finale au lieu du nombre de fois."]
};
