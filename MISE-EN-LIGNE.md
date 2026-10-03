# Mettre le site en ligne (gratuit)

Le site est un ensemble de fichiers « statiques » (HTML, CSS, JavaScript) : pas de serveur à louer, pas de base de données à installer. On le dépose chez un hébergeur gratuit, et il obtient une adresse publique à donner aux élèves.

Hébergeur conseillé : **GitHub Pages**. Il est gratuit, sans publicité, et l'adresse ne change plus (`https://votre-nom.github.io/profmaths/`). Tout se fait dans le navigateur, sans rien installer.

## 1. Récupérer les fichiers du site
Téléchargez `profmaths-site.zip` (joint dans le fil de discussion) et décompressez-le sur votre ordinateur. Vous obtenez un dossier avec `index.html`, `assets/`, `data/`…

Vérification : double-cliquez sur `index.html`, le site s'ouvre déjà dans votre navigateur (hors ligne).

## 2. Créer un compte GitHub (une seule fois)
1. Allez sur https://github.com et cliquez sur **Sign up**.
2. Choisissez un nom d'utilisateur court : il apparaîtra dans l'adresse du site (par exemple `profmaths976` donnera `profmaths976.github.io`).

## 3. Créer le dépôt et y déposer les fichiers
1. Une fois connecté, cliquez sur **+** en haut à droite, puis **New repository**.
2. Nom du dépôt : `profmaths`. Cochez **Public** (obligatoire pour GitHub Pages gratuit). Cliquez sur **Create repository**.
3. Sur la page du dépôt, cliquez sur le lien **uploading an existing file**.
4. Faites glisser **le contenu** du dossier décompressé (le fichier `index.html` et les dossiers `assets`, `data`, `outils`, ainsi que les fichiers `.md`), pas le dossier lui-même : `index.html` doit être à la racine du dépôt.
5. En bas de page, cliquez sur **Commit changes**.

## 4. Activer la publication
1. Dans le dépôt : **Settings** > **Pages** (menu de gauche).
2. Rubrique **Build and deployment** : Source = **Deploy from a branch**, Branch = **main**, dossier **/ (root)**, puis **Save**.
3. Attendez une à deux minutes et rechargez la page : l'adresse du site s'affiche en haut (« Your site is live at… »).

C'est cette adresse que vous donnez aux élèves (Pronote, ENT, QR code en classe, description de vos vidéos YouTube).

## 5. Avant de partager : les liens Drive
Les élèves ne pourront ouvrir les PDF que s'ils sont partagés. Dans Google Drive, pour chaque livret élève ou dossier de chapitre : clic droit > **Partager** > Accès général : **Tous les utilisateurs disposant du lien** (lecteur).
Ne partagez pas les corrigés réservés au professeur : le site ne les affiche pas.

## 6. Activer les vrais comptes élèves (facultatif)
Sans cette étape, le site fonctionne, mais la progression reste sur l'appareil de l'élève (mode démonstration).
Suivez la partie « Activer les vrais comptes » de `LISEZMOI.md` (projet Firebase gratuit, une quinzaine de minutes). À l'étape 6, ajoutez votre domaine `votre-nom.github.io` dans les domaines autorisés.
Le fichier `data/config-comptes.js` modifié se redépose ensuite comme indiqué ci-dessous.

## 7. Mettre à jour le site plus tard
Quand un chapitre est ajouté ou un fichier modifié :
1. Dans le dépôt GitHub, ouvrez le dossier concerné (par exemple `data/premiere`).
2. **Add file** > **Upload files**, faites glisser le ou les fichiers modifiés (ils remplacent les anciens), puis **Commit changes**.
3. Le site en ligne est à jour une à deux minutes plus tard. Sur téléphone, rechargez la page si l'ancienne version reste affichée.

Ajouter une vidéo YouTube à un chapitre : dans le fichier du chapitre (`data/...`), collez le lien de la vidéo entre les guillemets de `youtube: ""`, puis redéposez ce fichier.

## Autres hébergeurs possibles
- **Netlify** (https://app.netlify.com/drop) : on glisse le dossier entier dans la page, l'adresse est immédiate. Il faut créer un compte pour que le site reste en ligne.
- **Firebase Hosting** : pratique si vous activez déjà Firebase pour les comptes, mais il demande d'installer un outil en ligne de commande.
