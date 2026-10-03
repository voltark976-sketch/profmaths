/*
  CATALOGUE DU SITE
  -----------------
  La liste des niveaux et des chapitres, dans l'ordre des playlists.
  Pour ajouter un chapitre : copier une ligne { ... } et changer les valeurs.
  - id      : identifiant court, sans espace ni accent (sert dans l'adresse de la page)
  - statut  : "disponible" (page complète) ou "bientot" (affiché grisé)
  - drive   : lien du sous-dossier Drive du chapitre
  - fichier : nom de la variable du fichier de contenu (seulement si disponible)
*/
window.CATALOGUE = {
  niveaux: [
    {
      id: "seconde",
      nom: "Seconde",
      chapitres: [
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
          id: "seconde-automatismes",
          numero: null,
          titre: "Automatismes",
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
