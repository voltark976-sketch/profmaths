/*
  Niveaux, rangs, points d'XP et récompenses d'avatar.
  Ce fichier se modifie à la main : noms des rangs, XP par niveau, récompenses débloquées.
*/
window.NIVEAUX = {
  // XP pour passer du niveau 1 au niveau 2, puis hausse à chaque niveau :
  // 1 → 2 : 60 XP, 2 → 3 : 80 XP, 3 → 4 : 100 XP… (niveau 10 vers 1 260 XP, niveau 30 vers 9 860 XP)
  xpPremierNiveau: 60,
  hausseParNiveau: 20,

  // Un rang tous les 5 niveaux (noms valables au féminin comme au masculin)
  rangs: [
    { des: 1, nom: "Novice" },
    { des: 5, nom: "Stratège" },
    { des: 10, nom: "Analyste" },
    { des: 15, nom: "Virtuose" },
    { des: 20, nom: "Prodige" },
    { des: 25, nom: "Génie" },
    { des: 30, nom: "Légende" }
  ],

  // Points d'XP gagnés
  xp: {
    question: 10,            // question d'exercice réussie du premier coup (moins avec indices ou erreurs, 2 au minimum)
    bonneReponseQcm: 5,      // par bonne réponse au QCM
    bonneReponseDefi: 3,     // par bonne réponse au défi chrono
    // Ce qui est déjà maîtrisé rapporte beaucoup moins
    serie3Etoiles: 0.1,      // série déjà à 3 étoiles : XP divisés par 10
    serie2Etoiles: 0.5,      // série déjà à 2 étoiles : XP divisés par 2
    qcmParfait: 0.1,         // QCM déjà réussi à 100 % : XP divisés par 10
    qcmBon: 0.5,             // QCM déjà réussi à 70 % ou plus : XP divisés par 2
    defisPleinTarif: 2,      // parties d'un même défi par jour qui rapportent tous leurs XP
    defiApres: 0.25          // ensuite, ce défi rapporte 4 fois moins jusqu'au lendemain
  },

  /*
    Avatar : chaque élément a un identifiant (utilisé par le dessin, ne pas le changer),
    un nom affiché et le niveau qui le débloque (sans niveau : disponible dès le départ).
  */
  avatar: {
    peau: [
      { id: "p1", nom: "Teint 1", couleur: "#f5d6c0" },
      { id: "p2", nom: "Teint 2", couleur: "#e8b896" },
      { id: "p3", nom: "Teint 3", couleur: "#c98d63" },
      { id: "p4", nom: "Teint 4", couleur: "#a26a43" },
      { id: "p5", nom: "Teint 5", couleur: "#7a4a2c" },
      { id: "p6", nom: "Teint 6", couleur: "#553220" }
    ],
    cheveux: [
      { id: "ras", nom: "Très courts" },
      { id: "court", nom: "Courts" },
      { id: "boucles", nom: "Bouclés" },
      { id: "tresses", nom: "Tresses" },
      { id: "long", nom: "Longs" },
      { id: "chignon", nom: "Chignon" },
      { id: "foulard", nom: "Foulard" }
    ],
    couleurCheveux: [
      { id: "noir", nom: "Noir", couleur: "#1f1a17" },
      { id: "brun", nom: "Brun", couleur: "#4a2f1d" },
      { id: "chatain", nom: "Châtain", couleur: "#7a4b2a" },
      { id: "blond", nom: "Blond", couleur: "#d9b26a" },
      { id: "roux", nom: "Roux", couleur: "#b5552b" },
      { id: "bleu", nom: "Bleu lagon", couleur: "#2bb3c0", niveau: 7 },
      { id: "rose", nom: "Rose corail", couleur: "#f07fa0", niveau: 14 },
      { id: "dore", nom: "Doré", couleur: "#e8c14d", niveau: 23 }
    ],
    visage: [
      { id: "sourire", nom: "Sourire" },
      { id: "content", nom: "Content" },
      { id: "concentre", nom: "Concentré" },
      { id: "clin", nom: "Clin d'œil", niveau: 10 },
      { id: "etoiles", nom: "Étoiles dans les yeux", niveau: 18 }
    ],
    haut: [
      { id: "lagon", nom: "T-shirt lagon", couleur: "#0a7c76" },
      { id: "corail", nom: "T-shirt corail", couleur: "#e2725b" },
      { id: "soleil", nom: "T-shirt soleil", couleur: "#e9b130" },
      { id: "violet", nom: "T-shirt violet", couleur: "#6747c7" },
      { id: "nuit", nom: "T-shirt nuit", couleur: "#24324a" },
      { id: "pi", nom: "Maillot π", couleur: "#1e63b8", niveau: 3 },
      { id: "pythagore", nom: "Sweat Pythagore", couleur: "#b3345e", niveau: 12 },
      { id: "blouse", nom: "Blouse de chercheur", couleur: "#f4f6f7", niveau: 19 },
      { id: "toge", nom: "Toge de diplômé", couleur: "#1d2433", niveau: 24 },
      { id: "dore", nom: "Veste dorée", couleur: "#d9a520", niveau: 28 },
      { id: "cape", nom: "Cape de légende", couleur: "#7a1f3d", niveau: 30 }
    ],
    accessoire: [
      { id: "aucun", nom: "Aucun" },
      { id: "lunettes", nom: "Lunettes rondes" },
      { id: "casquette", nom: "Casquette", niveau: 2 },
      { id: "soleil", nom: "Lunettes de soleil", niveau: 6 },
      { id: "fleur", nom: "Fleur d'ylang-ylang", niveau: 8 },
      { id: "casque", nom: "Casque audio", niveau: 13 },
      { id: "laurier", nom: "Couronne de laurier", niveau: 15 },
      { id: "toque", nom: "Toque de diplômé", niveau: 20 },
      { id: "aureole", nom: "Auréole π", niveau: 26 },
      { id: "couronne", nom: "Couronne d'or", niveau: 30 }
    ],
    fond: [
      { id: "lagon", nom: "Lagon" },
      { id: "sable", nom: "Sable" },
      { id: "ciel", nom: "Ciel" },
      { id: "corail", nom: "Corail" },
      { id: "grille", nom: "Grille de maths", niveau: 4 },
      { id: "vagues", nom: "Vagues du lagon", niveau: 11 },
      { id: "nuit", nom: "Nuit étoilée", niveau: 16 },
      { id: "coucher", nom: "Coucher de soleil", niveau: 21 },
      { id: "galaxie", nom: "Galaxie", niveau: 25 },
      { id: "ylang", nom: "Ylang doré", niveau: 29 }
    ],
    cadre: [
      { id: "simple", nom: "Simple" },
      { id: "bronze", nom: "Bronze (Stratège)", niveau: 5 },
      { id: "argent", nom: "Argent (Analyste)", niveau: 10 },
      { id: "or", nom: "Or (Virtuose)", niveau: 15 },
      { id: "lagon", nom: "Lagon (Prodige)", niveau: 20 },
      { id: "arcenciel", nom: "Arc-en-ciel (Génie)", niveau: 25 },
      { id: "legende", nom: "Légende", niveau: 30 }
    ],
    compagnon: [
      { id: "aucun", nom: "Aucun" },
      { id: "tortue", nom: "Tortue", emoji: "🐢", niveau: 5 },
      { id: "poisson", nom: "Poisson-clown", emoji: "🐠", niveau: 9 },
      { id: "dauphin", nom: "Dauphin", emoji: "🐬", niveau: 17 },
      { id: "hibou", nom: "Hibou", emoji: "🦉", niveau: 22 },
      { id: "dragon", nom: "Dragon", emoji: "🐉", niveau: 27 }
    ]
  }
};
