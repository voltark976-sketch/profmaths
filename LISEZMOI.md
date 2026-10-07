# Site ProfMaths

Site statique : aucune base de données, aucun compte élève. Ouvrir `index.html` dans un navigateur suffit.

## Ce que vous pouvez modifier
- `data/catalogue.js` : la liste des niveaux et des chapitres (ordre des playlists, statut « disponible » ou « bientot »).
- `data/jeux.js` : le Défi chrono (onglet « Défi » de chaque chapitre) : durée, nombre de vies, séries exclues. Le classement (top 10 général et par classe) est dans la collection Firestore `classement` : prénom, classe et points seulement.
- `data/config-comptes.js` : activation des comptes élèves (Firebase) et liste des classes.
- `data/seconde/ensembles.js` : chapitre 1 de Seconde (ensembles de nombres, intervalles, valeur absolue). Les générateurs d'exercices correspondants commencent par `ens-`, `int-` et `abs-` dans `assets/exercices.js`.
- `data/seconde/information-chiffree.js` : chapitre 3 de Seconde.
- `data/seconde/automatismes.js` : automatismes de Seconde (10 fiches, séries flash, test).
- `data/automatismes/*.js` : partie Automatismes, un fichier par thème officiel de l'épreuve anticipée (calcul numérique, calcul algébrique, proportions, évolutions, fonctions, statistiques, probabilités). Les générateurs d'exercices correspondants commencent par `am-` dans `assets/exercices.js`.
- `data/premiere/suites.js` et `data/premiere/second-degre.js` : chapitres 1 et 2 de Première spécialité.
- `data/terminale-spe/denombrement.js` : chapitre 14 de Terminale spécialité (combinatoire et dénombrement). Les générateurs d'exercices correspondants commencent par `cd-` dans `assets/exercices.js`.
- `data/terminale/lois-discretes.js` : chapitre 2 de Terminale maths complémentaires.

Les niveaux du catalogue sont Seconde, Automatismes, Première spécialité, Terminale spécialité (`terminale-spe`) et Terminale maths complémentaires (`terminale`). Chaque niveau a sa couleur dans `assets/style.css` (règles `[data-niv="..."]`), et chaque classe des comptes a son nom court dans le classement du Défi (`COURTES` dans `assets/app.js`).
- `data/seconde/fonctions.js` : tout le contenu du chapitre pilote (cours, liens des vidéos YouTube, PDF, QCM, fiche méthode).
  Les règles d'écriture sont rappelées en haut du fichier.

## Le reste
- `assets/exercices.js` : graphiques et générateurs d'exercices aléatoires (indices et solutions).
- `assets/app.js` : navigation, QCM, points et étoiles.
- `assets/compte.js` : comptes élèves et sauvegarde de la progression.
- `assets/style.css` : mise en page, thème clair et sombre.
- `assets/katex/` : affichage des formules, hébergé avec le site (pas de dépendance externe).
- `outils/apercu.py` : assemble le site en un seul fichier HTML pour l'aperçu.
- `outils/comptes/creer-comptes.js` : création des comptes élèves et du compte professeur (voir « Comptes élèves »).
- `firestore.rules` et `firebase.json` : règles de sécurité des comptes dans Firebase.

## Ajouter un chapitre
1. Copier `data/seconde/fonctions.js` sous un nouveau nom et remplacer le contenu.
2. Ajouter une ligne `<script src="data/...">` dans `index.html`.
3. Passer le chapitre en `statut: "disponible"` dans `data/catalogue.js`.

## Version des fichiers (à chaque mise en ligne)
Les liens de `index.html` finissent par `?v=...` (par exemple `?v=20261007b`). À chaque mise en ligne, remplacer cette valeur partout dans `index.html` par une nouvelle (la date, plus une lettre). Sinon, les navigateurs des élèves peuvent garder l'ancienne version des fichiers jusqu'à 10 minutes, même après avoir rechargé la page.

## Le jeu « Les Salles »
Le jeu est dans le dossier `les-salles/` (page `les-salles/index.html`). La page **Jeu** du site (lien « Jeu » en haut, adresse `#jeu`) l'affiche dans un cadre ; le code de cette page est la fonction `pageJeu` de `assets/app.js`. La sauvegarde du jeu reste dans le navigateur de chaque élève.

Installer une nouvelle version du jeu :
1. Décompressez le nouveau zip : vous obtenez un dossier `les-salles`.
2. Supprimez l'ancien dossier `les-salles/` du site, puis mettez le nouveau à sa place (même nom, à côté de `index.html`).
3. Vérifiez que le dossier ne contient pas de fichier de réponses, puis remettez le site en ligne.
Sur GitHub, le plus simple est de demander à Claude de le faire : il remplace le dossier sur `main` et `gh-pages`. Rien d'autre à modifier, tant que la page du jeu reste `les-salles/index.html`.

## Mise en ligne
Voir `MISE-EN-LIGNE.md` (GitHub Pages, gratuit, sans rien installer).

## Comptes élèves
Les comptes sont **créés par le professeur** : les élèves ne peuvent plus s'inscrire. Chaque élève se connecte avec l'identifiant (`prenom.nom`) et le mot de passe qu'on lui a remis.
Leur progression (points, étoiles, meilleur QCM, date du dernier essai de chaque série) est enregistrée après chaque exercice.
Sans compte, la progression reste sur l'appareil ; elle rejoint le compte à la connexion.
À la déconnexion, la progression est effacée de l'appareil (utile sur un téléphone partagé) mais reste dans le compte.

Tant que `firebase` vaut `null` dans `data/config-comptes.js`, c'est un **mode démonstration** (comptes gardés sur l'appareil, création possible).

### Créer les comptes d'une classe
Sur l'ordinateur où `firebase login` a été fait, dans le dossier du site :
```
node outils/comptes/creer-comptes.js "C:\chemin\Comptes classe.xlsx"
```
Le fichier Excel (export Pronote) a une feuille par classe ou groupe, nommée par exemple `204`, `1SPE G2`, `Terminale SPE` ou `Terminale MATHS COMP`, avec soit une colonne « Élève » (« NOM Prénom »), soit deux colonnes « Nom » et « Prénom ». La classe affichée sur le site est déduite du nom de la feuille. Les élèves sortis, ceux qui ont déjà un compte et ceux déjà présents dans une autre feuille sont ignorés : on peut relancer la commande avec un fichier complété.
`--feuilles "204,207"` ne lit que ces feuilles, `--classe "Première spécialité"` impose la classe, `--essai` montre ce qui serait créé sans rien créer.

Les identifiants arrivent dans `Documents\Gestion site lycée` : `identifiants.csv` (Excel) et `identifiants.html` (étiquettes à imprimer et découper). **Ces fichiers ne doivent jamais aller dans le dossier du site**, qui est public.

- Mot de passe oublié : `node outils/comptes/creer-comptes.js --nouveau-mdp prenom.nom` (la progression est gardée).
- Compte professeur : `node outils/comptes/creer-comptes.js --prof prenom.nom --prenom Prénom --nom NOM` (crée ou réinitialise le compte ; mot de passe dans `Documents\Gestion site lycée\compte-professeur-prenom.nom.txt`). Chaque compte professeur voit le suivi de tous les élèves.
- Voir tous les comptes : console Firebase > Authentication > Utilisateurs (les élèves ont un UID qui commence par `eleve-`, les professeurs par `prof-`), ou `identifiants.csv`.

### Suivi des devoirs
Connecté avec le compte professeur, la page **Suivi des élèves** (`#suivi`, lien sur la page Mon compte) montre, par classe et par chapitre, les étoiles de chaque série, le score au QCM et la date du dernier essai. Le champ « Fait depuis le » ne compte que ce qui a été fait après la date donnée (le jour où le devoir a été donné, par exemple).
Un élève n'apparaît qu'après sa première connexion.

### Sécurité (Firebase)
Le prénom, le nom, la classe et le groupe sont inscrits dans le compte lui-même au moment de la création. Les règles `firestore.rules` n'acceptent que ces comptes : un compte créé autrement ne peut rien lire ni écrire, et un élève ne peut ni changer son nom ni lire la progression des autres. Après une modification des règles :
```
firebase deploy --only firestore:rules --project profmaths-ca535
```
Dans la console Firebase, Authentication > Méthode de connexion : seul **Adresse e-mail/Mot de passe** reste activé (Google désactivé).

### Installer Firebase sur un nouveau projet (une seule fois)
1. Aller sur https://console.firebase.google.com avec votre compte Google, « Créer un projet » (Google Analytics inutile).
2. Menu **Authentication** > Commencer > activer **Adresse e-mail/Mot de passe**.
3. Menu **Firestore Database** > Créer une base (région europe-west), mode production, puis publier les règles avec la commande ci-dessus.
4. Paramètres du projet > Vos applications > icône Web `</>` : copier l'objet `firebaseConfig` dans `data/config-comptes.js`.
5. Authentication > Paramètres > Domaines autorisés : ajouter l'adresse du site (ex. `xxx.github.io`).
