// =====================================================================
//  LES PARURES DE TALOS
// =====================================================================
//  Les sceaux d'or se gagnent aux stèles d'or (les automatismes
//  facultatifs). Ils servent à deux choses :
//   - débloquer les parures ci-dessous, des ornements pour Talos
//     (on les porte ou on les retire avec le bouton « Parures ») ;
//   - ouvrir le sanctuaire secret de chaque chapitre (voir
//     « sanctuaire » dans niveaux.js).
//
//  Pour changer le nombre de sceaux d'or qu'il faut pour une parure,
//  modifiez « sceauxOr ». Les « id » ne doivent pas être changés :
//  c'est d'après eux que dessin.js sait quoi dessiner.
// =====================================================================

var PARURES = [
  {
    id: "cape",
    nom: "La cape pourpre",
    sceauxOr: 1,
    description: "Une cape de roi, qui flotte derrière Talos quand il court."
  },
  {
    id: "plumet",
    nom: "Le plumet d'Athéna",
    sceauxOr: 3,
    description: "Un panache rouge sur le cimier, comme sur le casque de la déesse."
  },
  {
    id: "laurier",
    nom: "La couronne de laurier",
    sceauxOr: 6,
    description: "La couronne que recevaient les vainqueurs des jeux d'Olympie."
  },
  {
    id: "sandales",
    nom: "Les sandales ailées d'Hermès",
    sceauxOr: 9,
    description: "De petites ailes battent aux chevilles de Talos."
  },
  {
    id: "armure",
    nom: "L'armure d'or",
    sceauxOr: 13,
    description: "Le bronze de Talos devient de l'or."
  },
  {
    id: "aura",
    nom: "L'aura de sagesse",
    sceauxOr: 17,
    description: "Les symboles π, Σ et ∞ tournent autour de Talos."
  }
];
