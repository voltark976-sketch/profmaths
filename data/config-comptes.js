/*
  COMPTES ÉLÈVES
  --------------
  Les comptes et la progression sont stockés dans Firebase (service gratuit de Google).
  Tant que "firebase" vaut null, le site fonctionne en MODE DÉMONSTRATION :
  les comptes ne sont gardés que sur l'appareil utilisé (pratique pour tester).

  Pour activer les vrais comptes : coller ici la configuration donnée par la console Firebase
  (Paramètres du projet > Vos applications > Configuration du SDK), par exemple :

  firebase: {
    apiKey: "AIza...",
    authDomain: "profmaths-xxxx.firebaseapp.com",
    projectId: "profmaths-xxxx",
    appId: "1:123:web:abc"
  },

  Ces valeurs ne sont pas secrètes : la sécurité vient des règles Firestore (voir LISEZMOI.md).
*/
window.CONFIG_COMPTES = {
  firebase: null,
  // Classes proposées à la création du compte (modifiable)
  classes: ["Seconde", "Première spécialité", "Terminale maths complémentaires"]
};
