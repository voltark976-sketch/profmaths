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
  // Projet Firebase « profmaths-ca535 » (compte voltark976@gmail.com), activé le 3 octobre 2026
  firebase: {
    apiKey: "AIzaSyCNr_bdQahLq_TulnkqaHm3Qk7DsFw3xI4",
    authDomain: "profmaths-ca535.firebaseapp.com",
    projectId: "profmaths-ca535",
    storageBucket: "profmaths-ca535.firebasestorage.app",
    messagingSenderId: "830391678944",
    appId: "1:830391678944:web:f472650d4f317277c41d85"
  },
  // Classes proposées à la création du compte (modifiable)
  classes: ["Seconde", "Première spécialité", "Terminale maths complémentaires"]
};
