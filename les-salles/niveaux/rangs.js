// =====================================================================
//  LES COMBATS : manches, sablier, expérience, rangs et monstres
// =====================================================================
//  Chaque stèle est gardée par un monstre, qui rôde près d'elle dans la
//  salle : s'il voit Talos, il s'approche et l'attaque, et le combat
//  commence (on peut aussi aller lire la stèle soi-même, touche E).
//
//  Un combat se joue en plusieurs manches, un exercice par manche :
//   - 1re manche, l'attaque : une bonne réponse, et Talos frappe ;
//   - 2e manche, l'esquive : le monstre se prépare à frapper, une bonne
//     réponse et Talos esquive d'un salto arrière ;
//   - 3e manche, le coup final : le monstre est changé en pierre, et la
//     stèle s'allume.
//  Un boss (la dernière salle de chaque chapitre) se bat en 5 manches.
//  Une mauvaise réponse, ou un sablier vide, fait perdre un cœur à Talos.
//  Sans cœur, Talos revient au départ de la salle (les stèles déjà
//  résolues restent résolues) et retrouve tous ses cœurs.
//
//  L'expérience ne se gagne qu'une fois par stèle : la première fois
//  qu'on la résout. Rejouer une salle ne fait donc pas grimper
//  l'expérience.
//
//  Vous pouvez modifier les nombres et les textes ci-dessous.
// =====================================================================

// Le temps pour répondre à chaque manche, en secondes.
// Quand le sablier est vide, le monstre frappe (comme une erreur), puis
// la manche recommence avec un sablier plein. Fuir le combat (Échap)
// n'arrête pas le sablier.
// Un exercice peut avoir son propre temps : ajoutez par exemple
// temps: 150,  dans cet exercice (dans niveaux.js).
var TEMPS_LIMITE = {
  actif: true,        // false : pas de sablier du tout
  attaque: 90,        // la manche d'attaque (1 min 30)
  esquive: 90,        // la manche d'esquive (1 min 30)
  coupFinal: 120,     // la dernière manche, le coup final (2 min)
  automatisme: 60,    // chaque manche d'une stèle d'or (1 min)
  hermes: 120,        // une stèle d'Hermès, celle des figures (2 min)
  boss: 180,          // chaque question d'un boss (3 min)
  coefficient: 1      // multiplie tous les temps : 1.33 pour un tiers-temps
};

// Ce que rapporte une victoire.
var XP = {
  pierre: 100,      // une stèle de pierre (un combat en 3 manches)
  or: 80,           // une stèle d'or (des automatismes)
  boss: 300,        // un boss (un combat en 5 manches)
  figure: 60,       // une stèle d'Hermès, la première fois
  sansFaute: 50,    // bonus : le combat est gagné sans aucune erreur
  serie: 10,        // bonus par bonne réponse d'affilée, à partir de la 2e
  serieMax: 50      // le bonus de série ne dépasse jamais cette valeur
};

// Les rangs de Talos : l'expérience qu'il faut pour les atteindre,
// leur titre, et le nombre de cœurs de Talos à ce rang.
var RANGS = [
  { xp: 0,    titre: "Automate éveillé",    coeurs: 3 },
  { xp: 250,  titre: "Apprenti du temple",  coeurs: 3 },
  { xp: 600,  titre: "Gardien de bronze",   coeurs: 3 },
  { xp: 1000, titre: "Hoplite",             coeurs: 4 },
  { xp: 1500, titre: "Héros d'Athènes",     coeurs: 4 },
  { xp: 2100, titre: "Champion d'Olympie",  coeurs: 4 },
  { xp: 2800, titre: "Argonaute",           coeurs: 4 },
  { xp: 3600, titre: "Héros de l'Odyssée",  coeurs: 5 },
  { xp: 4500, titre: "Demi-dieu",           coeurs: 5 },
  { xp: 5500, titre: "Élu d'Athéna",        coeurs: 5 },
  { xp: 6600, titre: "Gardien de l'Olympe", coeurs: 5 },
  { xp: 7800, titre: "Légende du temple",   coeurs: 5 }
];

// L'ordre dans lequel les monstres gardent les stèles de pierre,
// d'une stèle à la suivante tout au long du jeu.
// Les stèles d'or sont gardées par les oiseaux du lac Stymphale,
// et les sanctuaires secrets par le Sphinx.
// Pour choisir le monstre d'une stèle précise, ajoutez dans la stèle
// (dans niveaux.js), à côté de « exercices », par exemple :   monstre: "hydre",
// Monstres possibles : "minotaure", "hydre", "cyclope", "meduse",
// "harpie", "chimere", "sphinx", "stymphale".
var ORDRE_DES_MONSTRES = ["minotaure", "hydre", "cyclope", "meduse", "harpie", "chimere"];
