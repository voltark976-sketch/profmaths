# Site ProfMaths

Site statique : aucune base de données, aucun compte élève. Ouvrir `index.html` dans un navigateur suffit.

## Ce que vous pouvez modifier
- `data/catalogue.js` : la liste des niveaux et des chapitres (ordre des playlists, statut « disponible » ou « bientot »).
- `data/config-comptes.js` : activation des comptes élèves (Firebase) et liste des classes.
- `data/seconde/ensembles.js` : chapitre 1 de Seconde (ensembles de nombres, intervalles, valeur absolue). Les générateurs d'exercices correspondants commencent par `ens-`, `int-` et `abs-` dans `assets/exercices.js`.
- `data/seconde/information-chiffree.js` : chapitre 3 de Seconde.
- `data/seconde/automatismes.js` : automatismes de Seconde (10 fiches, séries flash, test).
- `data/automatismes/*.js` : partie Automatismes, un fichier par thème officiel de l'épreuve anticipée (calcul numérique, calcul algébrique, proportions, évolutions, fonctions, statistiques, probabilités). Les générateurs d'exercices correspondants commencent par `am-` dans `assets/exercices.js`.
- `data/premiere/suites.js` et `data/premiere/second-degre.js` : chapitres 1 et 2 de Première spécialité.
- `data/terminale/lois-discretes.js` : chapitre 2 de Terminale maths complémentaires.
- `data/seconde/fonctions.js` : tout le contenu du chapitre pilote (cours, liens des vidéos YouTube, PDF, QCM, fiche méthode).
  Les règles d'écriture sont rappelées en haut du fichier.

## Le reste
- `assets/exercices.js` : graphiques et générateurs d'exercices aléatoires (indices et solutions).
- `assets/app.js` : navigation, QCM, points et étoiles.
- `assets/compte.js` : comptes élèves et sauvegarde de la progression.
- `assets/style.css` : mise en page, thème clair et sombre.
- `assets/katex/` : affichage des formules, hébergé avec le site (pas de dépendance externe).
- `outils/apercu.py` : assemble le site en un seul fichier HTML pour l'aperçu.

## Ajouter un chapitre
1. Copier `data/seconde/fonctions.js` sous un nouveau nom et remplacer le contenu.
2. Ajouter une ligne `<script src="data/...">` dans `index.html`.
3. Passer le chapitre en `statut: "disponible"` dans `data/catalogue.js`.

## Mise en ligne
Voir `MISE-EN-LIGNE.md` (GitHub Pages, gratuit, sans rien installer).

## Comptes élèves
Les élèves créent un compte avec prénom, classe, identifiant et mot de passe (pas d'e-mail).
Leur progression (points, étoiles, meilleur QCM) est enregistrée après chaque exercice.
Sans compte, la progression reste sur l'appareil ; elle rejoint le compte à la création.
À la déconnexion, la progression est effacée de l'appareil (utile sur un téléphone partagé) mais reste dans le compte.

Tant que `firebase` vaut `null` dans `data/config-comptes.js`, c'est un **mode démonstration** (comptes gardés sur l'appareil).

### Activer les vrais comptes (gratuit, une seule fois)
1. Aller sur https://console.firebase.google.com avec votre compte Google, « Créer un projet » (Google Analytics inutile).
2. Menu **Authentication** > Commencer > activer **Adresse e-mail/Mot de passe**.
3. Menu **Firestore Database** > Créer une base (région europe-west), mode production.
4. Onglet **Règles** de Firestore, coller puis publier :
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /eleves/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```
5. Paramètres du projet > Vos applications > icône Web `</>` : copier l'objet `firebaseConfig` dans `data/config-comptes.js`.
6. Authentication > Paramètres > Domaines autorisés : ajouter l'adresse du site (ex. `xxx.github.io`).

Mot de passe oublié : la console Firebase ne permet pas de choisir un nouveau mot de passe ; le plus simple est de supprimer le compte dans Authentication pour que l'élève en recrée un (la progression repart de zéro). Un outil de réinitialisation pour le professeur pourra être ajouté.
La progression de chaque élève se lit dans Firestore, collection `eleves` (un tableau de bord professeur pourra être ajouté ensuite).
