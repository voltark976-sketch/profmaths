/*
  CATALOGUE DU SITE
  -----------------
  La liste des niveaux et des chapitres, dans l'ordre des playlists.
  Pour ajouter un chapitre : copier une ligne { ... } et changer les valeurs.
  - id      : identifiant court, sans espace ni accent (sert dans l'adresse de la page)
  - statut  : "disponible" (page complète) ou "bientot" (affiché grisé)
  - drive   : lien du sous-dossier Drive du chapitre
  - code    : sigle affiché dans la pastille (sinon le numéro du chapitre, ou « A »)
  - fichier : nom de la variable du fichier de contenu (seulement si disponible)
*/
window.CATALOGUE = {
  niveaux: [
    {
      id: "seconde",
      nom: "Seconde",
      chapitres: [
        {
          id: "seconde-ensembles",
          numero: 1,
          titre: "Ensembles de nombres et intervalles",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-fonctions",
          numero: 2,
          titre: "Généralités sur les fonctions",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1T6TrIhKIQw81y_UyeuU0X5AljmqZbbvr"
        },
        {
          id: "seconde-information-chiffree",
          numero: 3,
          titre: "Information chiffrée",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/153RvVVumMoWU_bPz6w6RypIZVkocK6Pb"
        },
        {
          id: "seconde-arithmetique",
          numero: 4,
          titre: "Arithmétique",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-calcul-litteral",
          numero: 5,
          titre: "Calcul littéral et équations",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-fonctions-affines",
          numero: 6,
          titre: "Fonctions affines, inégalités et inéquations",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-vecteurs",
          numero: 7,
          titre: "Vecteurs 1 : translation et coordonnées",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-statistiques",
          numero: 8,
          titre: "Statistiques 1 : indicateurs",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-variations",
          numero: 9,
          titre: "Variations et extremums ; fonctions carré et valeur absolue",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-tableaux-croises",
          numero: 10,
          titre: "Tableaux croisés, fréquences conditionnelles, probabilités 1",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-colinearite",
          numero: 11,
          titre: "Vecteurs 2 : colinéarité et déterminant",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-droites",
          numero: 12,
          titre: "Droites du plan",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-fonctions-reference",
          numero: 13,
          titre: "Fonctions de référence : inverse, racine carrée, cube",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-signes",
          numero: 14,
          titre: "Signes d'expressions et équations quotients",
          statut: "disponible",
          drive: ""
        },
        {
          id: "seconde-probabilites-conditionnelles",
          numero: 15,
          titre: "Probabilités conditionnelles et arbres pondérés",
          statut: "disponible",
          drive: ""
        }
      ]
    },
    {
      id: "automatismes",
      nom: "Automatismes",
      intro: "Les automatismes officiels de l'épreuve anticipée de mathématiques (programmes 2026) : la liste de Seconde, à entretenir en Première, et celle de Première.",
      chapitres: [
        {
          id: "auto-calcul-numerique",
          numero: null,
          code: "CN",
          titre: "Calcul numérique",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv"
        },
        {
          id: "auto-calcul-algebrique",
          numero: null,
          code: "CA",
          titre: "Calcul algébrique",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv"
        },
        {
          id: "auto-proportions",
          numero: null,
          code: "PP",
          titre: "Proportions et pourcentages",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv"
        },
        {
          id: "auto-evolutions",
          numero: null,
          code: "EV",
          titre: "Évolutions et variations",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv"
        },
        {
          id: "auto-fonctions",
          numero: null,
          code: "FR",
          titre: "Fonctions et représentations",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv"
        },
        {
          id: "auto-geometrie",
          numero: null,
          code: "GE",
          titre: "Géométrie",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv"
        },
        {
          id: "auto-statistiques",
          numero: null,
          code: "ST",
          titre: "Statistiques",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv"
        },
        {
          id: "auto-probabilites",
          numero: null,
          code: "PR",
          titre: "Probabilités",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv"
        },
        {
          id: "seconde-automatismes",
          numero: null,
          code: "2de",
          titre: "Dossier de Seconde : test et 10 fiches",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1FSdCJtja6emqTtKUZ_RQNPUYfwfHvoLv"
        }
      ]
    },
    {
      id: "premiere",
      nom: "Première spécialité",
      chapitres: [
        {
          id: "premiere-suites",
          numero: 1,
          titre: "Suites numériques",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1Ymru1W2dLIhiEgpawEdchTrVvaK8Q3n6"
        },
        {
          id: "premiere-second-degre",
          numero: 2,
          titre: "Second degré, formes factorisée et canonique",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1Jw7zQe-wQDLffgycdEJuUw56iU26NGsM"
        }
      ]
    },
    {
      id: "terminale-spe",
      nom: "Terminale spécialité",
      chapitres: [
        {
          id: "terminale-spe-denombrement",
          numero: 14,
          titre: "Combinatoire et dénombrement",
          statut: "disponible",
          drive: ""
        }
      ]
    },
    {
      id: "terminale",
      nom: "Terminale maths complémentaires",
      chapitres: [
        {
          id: "terminale-lois-discretes",
          numero: 2,
          titre: "Lois discrètes",
          statut: "disponible",
          drive: "https://drive.google.com/drive/folders/1Ocg_jAIkBcx1ZyeAMo7RfSITirsgvD59"
        }
      ]
    }
  ]
};
