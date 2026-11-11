/*
  Niveaux, rangs, points d'XP et récompenses d'avatar.
  Ce fichier se modifie à la main : noms des rangs, XP par niveau, récompenses débloquées.
*/
window.NIVEAUX = {
  // XP pour passer du niveau 1 au niveau 2, puis hausse à chaque niveau :
  // 1 → 2 : 60 XP, 2 → 3 : 120 XP, 3 → 4 : 180 XP…
  // Total : niveau 5 à 600 XP (environ un chapitre), niveau 10 à 2 700 XP, niveau 20 à 11 400 XP, niveau 30 à 26 100 XP
  xpPremierNiveau: 60,
  hausseParNiveau: 60,

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
    // Les XP d'une série sont comptés au bilan, à la fin de la série.
    // Première fois, ou record battu (plus d'étoiles, meilleur score au QCM, record au défi) : XP complets.
    // Sinon, ce qui est déjà fait rapporte beaucoup moins :
    rejeuSansProgres: 0.25,  // rejouer sans battre son record : XP divisés par 4
    dejaParfait: 0.1,        // série déjà à 3 étoiles ou QCM déjà à 100 % : XP divisés par 10
    defisPleinTarif: 3,      // défis par jour (tous chapitres confondus) qui rapportent tous leurs XP
    defiApres: 0.25,         // ensuite, les défis sans nouveau record rapportent 4 fois moins jusqu'au lendemain
    // Contre les scripts qui se donnent des XP en continu (novembre 2026) : un compte qui gagne ce nombre d'XP en moins
    // d'un jour est banni (sa fiche est figée). Le même nombre est écrit dans firestore.rules (banni) : changer les deux.
    bannissement: 10000
  },

  /*
    Avatar : chaque élément a un identifiant (utilisé par le dessin, ne pas le changer),
    un nom affiché et le niveau qui le débloque (sans niveau : disponible dès le départ).
    Tout ce qui décrit la personne (forme du visage, teint, coiffure, couleur naturelle des cheveux…)
    est disponible dès le départ ; les niveaux débloquent les éléments fantaisie.
    L'ordre des listes est l'ordre d'affichage dans l'éditeur.
  */
  avatar: {
    forme: [
      { id: "ovale", nom: "Ovale" },
      { id: "rond", nom: "Rond" },
      { id: "carre", nom: "Carré" },
      { id: "coeur", nom: "En cœur" },
      { id: "long", nom: "Allongé" },
      { id: "doux", nom: "Mâchoire large" }
    ],
    peau: [
      { id: "p7", nom: "Teint 1", couleur: "#fbe3d3" },
      { id: "p1", nom: "Teint 2", couleur: "#f5d6c0" },
      { id: "p2", nom: "Teint 3", couleur: "#e8b896" },
      { id: "p8", nom: "Teint 4", couleur: "#d9a074" },
      { id: "p3", nom: "Teint 5", couleur: "#c98d63" },
      { id: "p4", nom: "Teint 6", couleur: "#a26a43" },
      { id: "p9", nom: "Teint 7", couleur: "#8d5a38" },
      { id: "p5", nom: "Teint 8", couleur: "#7a4a2c" },
      { id: "p6", nom: "Teint 9", couleur: "#553220" },
      { id: "p10", nom: "Teint 10", couleur: "#3e2417" },
      { id: "f1", nom: "Lagon", couleur: "#8fd3cb", niveau: 31 },
      { id: "f2", nom: "Lavande", couleur: "#b9a8e6", niveau: 36 }
    ],
    yeux: [
      { id: "ronds", nom: "Ronds" },
      { id: "grands", nom: "Grands yeux" },
      { id: "amande", nom: "En amande" },
      { id: "cils", nom: "Avec cils" },
      { id: "rieurs", nom: "Rieurs" },
      { id: "miclos", nom: "Mi-clos" },
      { id: "clin", nom: "Clin d'œil", niveau: 10 },
      { id: "brillants", nom: "Pétillants", niveau: 13 },
      { id: "etoiles", nom: "Étoiles", niveau: 18 },
      { id: "coeurs", nom: "Cœurs", niveau: 24 }
    ],
    couleurYeux: [
      { id: "marron", nom: "Marron", couleur: "#5b3a1e" },
      { id: "noir", nom: "Noir", couleur: "#21160f" },
      { id: "noisette", nom: "Noisette", couleur: "#8a5a2b" },
      { id: "ambre", nom: "Ambre", couleur: "#b8780a" },
      { id: "vert", nom: "Vert", couleur: "#3f8f5a" },
      { id: "bleu", nom: "Bleu", couleur: "#3a7bd5" },
      { id: "gris", nom: "Gris", couleur: "#76858f" },
      { id: "violet", nom: "Violet", couleur: "#8b5cf6", niveau: 21 },
      { id: "dore", nom: "Doré", couleur: "#e3b23c", niveau: 29 }
    ],
    sourcils: [
      { id: "naturels", nom: "Naturels" },
      { id: "epais", nom: "Épais" },
      { id: "fins", nom: "Fins" },
      { id: "droits", nom: "Droits" },
      { id: "fronces", nom: "Froncés" },
      { id: "hauts", nom: "Étonnés" },
      { id: "aucun", nom: "Discrets" }
    ],
    nez: [
      { id: "arrondi", nom: "Arrondi" },
      { id: "point", nom: "Petit" },
      { id: "droit", nom: "Droit" },
      { id: "large", nom: "Large" },
      { id: "bouton", nom: "Bouton" },
      { id: "aucun", nom: "Sans" }
    ],
    bouche: [
      { id: "sourire", nom: "Sourire" },
      { id: "grand", nom: "Grand sourire" },
      { id: "rire", nom: "Rire" },
      { id: "neutre", nom: "Calme" },
      { id: "moue", nom: "En coin" },
      { id: "surpris", nom: "Surpris" },
      { id: "levres", nom: "Lèvres" },
      { id: "langue", nom: "Langue tirée", niveau: 4 },
      { id: "dents", nom: "Dents du bonheur", niveau: 7 }
    ],
    details: [
      { id: "aucun", nom: "Aucun" },
      { id: "joues", nom: "Joues roses" },
      { id: "rousseur", nom: "Taches de rousseur" },
      { id: "grain", nom: "Grain de beauté" },
      { id: "msindzano", nom: "Msindzano" },
      { id: "pansement", nom: "Pansement", niveau: 3 },
      { id: "paillettes", nom: "Paillettes", niveau: 17 },
      { id: "pi", nom: "Peinture π", niveau: 20 },
      { id: "eclair", nom: "Éclair", niveau: 28 }
    ],
    barbe: [
      { id: "aucune", nom: "Aucune" },
      { id: "moustache", nom: "Moustache" },
      { id: "bouc", nom: "Bouc" },
      { id: "collier", nom: "Collier" },
      { id: "courte", nom: "Barbe courte" }
    ],
    cheveux: [
      { id: "court", nom: "Courts" },
      { id: "ras", nom: "Très courts" },
      { id: "degrade", nom: "Dégradé" },
      { id: "epis", nom: "En épis" },
      { id: "meche", nom: "Mèche" },
      { id: "boucles", nom: "Bouclés" },
      { id: "afro", nom: "Afro" },
      { id: "vanilles", nom: "Vanilles" },
      { id: "nattes", nom: "Tresses collées" },
      { id: "locks", nom: "Locks" },
      { id: "tresses", nom: "Tresses" },
      { id: "tresse", nom: "Tresse sur l'épaule" },
      { id: "queue", nom: "Queue de cheval" },
      { id: "chignon", nom: "Chignon" },
      { id: "macarons", nom: "Macarons" },
      { id: "couettes", nom: "Couettes" },
      { id: "carre", nom: "Carré" },
      { id: "frange", nom: "Frange" },
      { id: "long", nom: "Longs" },
      { id: "ondules", nom: "Longs ondulés" },
      { id: "bouclelong", nom: "Longs bouclés" },
      { id: "foulard", nom: "Foulard" },
      { id: "kishali", nom: "Foulard à motifs" },
      { id: "rase", nom: "Crâne rasé" },
      { id: "dessin", nom: "Dégradé dessiné", niveau: 9 },
      { id: "crete", nom: "Crête", niveau: 6 },
      { id: "superepis", nom: "Super épis", niveau: 12 }
    ],
    couleurCheveux: [
      { id: "noir", nom: "Noir", couleur: "#1f1a17" },
      { id: "brun", nom: "Brun", couleur: "#4a2f1d" },
      { id: "chatain", nom: "Châtain", couleur: "#7a4b2a" },
      { id: "clair", nom: "Châtain clair", couleur: "#a0703f" },
      { id: "blond", nom: "Blond", couleur: "#d9b26a" },
      { id: "platine", nom: "Blond platine", couleur: "#eadcae" },
      { id: "roux", nom: "Roux", couleur: "#b5552b" },
      { id: "auburn", nom: "Auburn", couleur: "#7c2e1e" },
      { id: "gris", nom: "Gris", couleur: "#9aa1a8" },
      { id: "bleu", nom: "Bleu lagon", couleur: "#2bb3c0", niveau: 7 },
      { id: "vert", nom: "Vert menthe", couleur: "#3fbf86", niveau: 9 },
      { id: "violet", nom: "Violet", couleur: "#8b5cf6", niveau: 11 },
      { id: "rose", nom: "Rose corail", couleur: "#f07fa0", niveau: 14 },
      { id: "rouge", nom: "Rouge vif", couleur: "#dc3b3b", niveau: 16 },
      { id: "blanc", nom: "Blanc neige", couleur: "#f1f2f6", niveau: 19 },
      { id: "dore", nom: "Doré", couleur: "#e8c14d", niveau: 23 },
      { id: "arcenciel", nom: "Arc-en-ciel", couleur: "#ef4444", degrade: ["#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7"], niveau: 32 },
      { id: "galaxie", nom: "Galaxie", couleur: "#3b1d6e", degrade: ["#1e1b4b", "#6d28d9", "#db2777"], niveau: 38 }
    ],
    meches: [
      { id: "aucune", nom: "Aucune" },
      { id: "blond", nom: "Pointes blondes", couleur: "#e6c27a", niveau: 8 },
      { id: "bleu", nom: "Pointes bleues", couleur: "#38bdf8", niveau: 8 },
      { id: "rose", nom: "Pointes roses", couleur: "#f472b6", niveau: 12 },
      { id: "violet", nom: "Pointes violettes", couleur: "#a78bfa", niveau: 18 },
      { id: "rouge", nom: "Pointes rouges", couleur: "#ef4444", niveau: 22 },
      { id: "vert", nom: "Pointes vertes", couleur: "#4ade80", niveau: 26 }
    ],
    haut: [
      { id: "tshirt", nom: "T-shirt" },
      { id: "colv", nom: "Col en V" },
      { id: "debardeur", nom: "Débardeur" },
      { id: "sweat", nom: "Sweat à capuche" },
      { id: "chemise", nom: "Chemise" },
      { id: "polo", nom: "Polo" },
      { id: "salouva", nom: "Salouva" },
      { id: "kandzou", nom: "Kandzou brodé" },
      { id: "veste", nom: "Veste ouverte", niveau: 2 },
      { id: "maillot", nom: "Maillot de sport", niveau: 6 },
      { id: "blouse", nom: "Blouse de chercheur", niveau: 19, fixe: true },
      { id: "toge", nom: "Toge de diplômé", niveau: 24, fixe: true },
      { id: "dore", nom: "Veste dorée", niveau: 28, fixe: true },
      { id: "cape", nom: "Cape de légende", niveau: 30, fixe: true },
      { id: "spatiale", nom: "Combinaison spatiale", niveau: 40, fixe: true }
    ],
    couleurHaut: [
      { id: "lagon", nom: "Lagon", couleur: "#0a7c76" },
      { id: "menthe", nom: "Menthe", couleur: "#5cc8a8" },
      { id: "ciel", nom: "Ciel", couleur: "#7cc4ec" },
      { id: "bleu", nom: "Bleu", couleur: "#1e63b8" },
      { id: "nuit", nom: "Nuit", couleur: "#24324a" },
      { id: "violet", nom: "Violet", couleur: "#6747c7" },
      { id: "rose", nom: "Rose", couleur: "#f29bb4" },
      { id: "framboise", nom: "Framboise", couleur: "#b3345e" },
      { id: "rouge", nom: "Rouge", couleur: "#d63a3a" },
      { id: "corail", nom: "Corail", couleur: "#e2725b" },
      { id: "orange", nom: "Orange", couleur: "#f08a24" },
      { id: "soleil", nom: "Soleil", couleur: "#e9b130" },
      { id: "vert", nom: "Vert", couleur: "#2f9e44" },
      { id: "kaki", nom: "Kaki", couleur: "#6f7343" },
      { id: "beige", nom: "Beige", couleur: "#e2cfac" },
      { id: "bordeaux", nom: "Bordeaux", couleur: "#7a1f3d" },
      { id: "blanc", nom: "Blanc", couleur: "#f4f6f7" },
      { id: "gris", nom: "Gris", couleur: "#8a96a3" },
      { id: "noir", nom: "Noir", couleur: "#1d2127" },
      { id: "fluo", nom: "Jaune fluo", couleur: "#c6f432", niveau: 14 },
      { id: "arcenciel", nom: "Arc-en-ciel", couleur: "#ef4444", degrade: ["#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7"], niveau: 33 }
    ],
    motif: [
      { id: "aucun", nom: "Uni" },
      { id: "rayures", nom: "Rayures" },
      { id: "coeur", nom: "Cœur" },
      { id: "etoile", nom: "Étoile" },
      { id: "palmier", nom: "Cocotier" },
      { id: "pi", nom: "π", niveau: 3 },
      { id: "sigma", nom: "Somme Σ", niveau: 7 },
      { id: "infini", nom: "Infini ∞", niveau: 9 },
      { id: "racine", nom: "Racine √", niveau: 11 },
      { id: "pythagore", nom: "Pythagore", niveau: 12 },
      { id: "repere", nom: "Repère et courbe", niveau: 16 },
      { id: "integrale", nom: "Intégrale ∫", niveau: 19 },
      { id: "fractale", nom: "Fractale", niveau: 27 },
      { id: "phi", nom: "Nombre d'or φ", niveau: 35 },
      { id: "euler", nom: "Formule d'Euler", niveau: 45 }
    ],
    accessoire: [
      { id: "aucun", nom: "Aucun" },
      { id: "kofia", nom: "Kofia" },
      { id: "bonnet", nom: "Bonnet" },
      { id: "bandeau", nom: "Bandeau" },
      { id: "noeud", nom: "Nœud" },
      { id: "serretete", nom: "Serre-tête" },
      { id: "casquette", nom: "Casquette", niveau: 2 },
      { id: "bob", nom: "Bob", niveau: 4 },
      { id: "envers", nom: "Casquette à l'envers", niveau: 5 },
      { id: "fleur", nom: "Fleur d'ylang-ylang", niveau: 8 },
      { id: "paille", nom: "Chapeau de paille", niveau: 9 },
      { id: "couronnefleurs", nom: "Couronne de fleurs", niveau: 11 },
      { id: "casque", nom: "Casque audio", niveau: 13 },
      { id: "laurier", nom: "Couronne de laurier", niveau: 15 },
      { id: "hautdeforme", nom: "Haut-de-forme", niveau: 18 },
      { id: "toque", nom: "Toque de diplômé", niveau: 20 },
      { id: "sorcier", nom: "Chapeau de magicien des maths", niveau: 22 },
      { id: "aureole", nom: "Auréole π", niveau: 26 },
      { id: "couronne", nom: "Couronne d'or", niveau: 30 },
      { id: "antennes", nom: "Antennes", niveau: 34 }
    ],
    lunettes: [
      { id: "aucune", nom: "Aucune" },
      { id: "rondes", nom: "Rondes" },
      { id: "carrees", nom: "Carrées" },
      { id: "fines", nom: "Fines dorées" },
      { id: "epaisses", nom: "Monture épaisse" },
      { id: "soleil", nom: "Lunettes de soleil", niveau: 6 },
      { id: "plongee", nom: "Masque de plongée", niveau: 9 },
      { id: "aviateur", nom: "Aviateur", niveau: 10 },
      { id: "troisd", nom: "Lunettes 3D", niveau: 14 },
      { id: "coeur", nom: "Cœurs", niveau: 16 },
      { id: "etoile", nom: "Étoiles", niveau: 21 },
      { id: "monocle", nom: "Monocle", niveau: 25 },
      { id: "visiere", nom: "Visière du futur", niveau: 28 }
    ],
    boucles: [
      { id: "aucune", nom: "Aucune" },
      { id: "puces", nom: "Puces" },
      { id: "anneaux", nom: "Anneaux" },
      { id: "perles", nom: "Perles" },
      { id: "pendants", nom: "Pendants" },
      { id: "etoiles", nom: "Étoiles", niveau: 12 }
    ],
    compagnon: [
      { id: "aucun", nom: "Aucun" },
      { id: "maki", nom: "Maki", niveau: 3 },
      { id: "tortue", nom: "Tortue", niveau: 5 },
      { id: "chat", nom: "Chat", niveau: 7 },
      { id: "poisson", nom: "Poisson-clown", niveau: 9 },
      { id: "roussette", nom: "Roussette", niveau: 13 },
      { id: "dauphin", nom: "Dauphin", niveau: 17 },
      { id: "baleine", nom: "Baleine à bosse", niveau: 21 },
      { id: "hibou", nom: "Hibou", niveau: 22 },
      { id: "dragon", nom: "Dragon", niveau: 27 },
      { id: "robot", nom: "Robot", niveau: 31 }
    ],
    fond: [
      { id: "lagon", nom: "Lagon" },
      { id: "sable", nom: "Sable" },
      { id: "ciel", nom: "Ciel" },
      { id: "corail", nom: "Corail" },
      { id: "choungui", nom: "Mont Choungui" },
      { id: "feuilles", nom: "Maquis" },
      { id: "grille", nom: "Grille de maths", niveau: 4 },
      { id: "baobab", nom: "Baobab", niveau: 6 },
      { id: "vagues", nom: "Vagues du lagon", niveau: 11 },
      { id: "tableau", nom: "Tableau noir", niveau: 12 },
      { id: "nuit", nom: "Nuit étoilée", niveau: 16 },
      { id: "aurore", nom: "Aurore", niveau: 19 },
      { id: "coucher", nom: "Coucher de soleil", niveau: 21 },
      { id: "galaxie", nom: "Galaxie", niveau: 25 },
      { id: "neon", nom: "Néon", niveau: 27 },
      { id: "ylang", nom: "Ylang doré", niveau: 29 }
    ],
    cadre: [
      { id: "simple", nom: "Simple" },
      { id: "bronze", nom: "Bronze (Stratège)", niveau: 5 },
      { id: "fleurs", nom: "Fleurs", niveau: 8 },
      { id: "argent", nom: "Argent (Analyste)", niveau: 10 },
      { id: "or", nom: "Or (Virtuose)", niveau: 15 },
      { id: "lagon", nom: "Lagon (Prodige)", niveau: 20 },
      { id: "arcenciel", nom: "Arc-en-ciel (Génie)", niveau: 25 },
      { id: "legende", nom: "Légende", niveau: 30 },
      { id: "neon", nom: "Néon", niveau: 33 },
      { id: "diamant", nom: "Diamant", niveau: 40 },
      { id: "cosmos", nom: "Cosmos", niveau: 50 }
    ],
    medaillon: [
      { id: "rond", nom: "Rond" },
      { id: "arrondi", nom: "Carré arrondi" },
      { id: "hexagone", nom: "Hexagone", niveau: 13 },
      { id: "blason", nom: "Blason", niveau: 23 },
      { id: "fleur", nom: "Fleur", niveau: 37 }
    ],
    effet: [
      { id: "aucun", nom: "Aucun" },
      { id: "etincelles", nom: "Étincelles (Stratège)", niveau: 5 },
      { id: "bulles", nom: "Bulles (Analyste)", niveau: 10 },
      { id: "symboles", nom: "Symboles (Virtuose)", niveau: 15 },
      { id: "halo", nom: "Halo néon (Prodige)", niveau: 20 },
      { id: "orbite", nom: "Orbite (Génie)", niveau: 25 },
      { id: "rayons", nom: "Rayons d'or (Légende)", niveau: 30 },
      { id: "chiffres", nom: "Pluie de chiffres", niveau: 42 }
    ]
  }
};
