/*
  Fabrique data/manifeste.js : pour chaque chapitre du catalogue, le fichier qui le contient
  et ses nombres de séries d'exercices et de questions de QCM.
  Le site ne charge plus tous les chapitres au démarrage : il lit ce manifeste, puis
  télécharge le fichier d'un chapitre seulement quand on l'ouvre (plus rapide en 3G).

  Il refait aussi les générateurs du lycée découpés par niveau (assets/lycee/*.js, voir outils/lycee.js).
  À relancer après avoir ajouté ou modifié un chapitre, ou modifié assets/exercices.js :   node outils/manifeste.js
  (sans argument : écrit le fichier ; avec --verifier : vérifie seulement, sans rien écrire)
*/
const fs = require("fs"), path = require("path"), vm = require("vm");
const racine = path.join(__dirname, "..");
const lire = (f) => fs.readFileSync(path.join(racine, f), "utf8");

// Catalogue
const ctx = { window: {} };
vm.runInNewContext(lire("data/catalogue.js"), ctx);
const CATALOGUE = ctx.window.CATALOGUE;

// Tous les fichiers de chapitre : data/<niveau>/*.js
const fichiers = [];
for (const d of fs.readdirSync(path.join(racine, "data"), { withFileTypes: true })) {
  if (!d.isDirectory()) continue;
  for (const f of fs.readdirSync(path.join(racine, "data", d.name))) if (f.endsWith(".js")) fichiers.push(`data/${d.name}/${f}`);
}
const parId = {};
for (const f of fichiers) {
  const w = { CHAPITRES: {} };
  try { vm.runInNewContext(lire(f), { window: w }); } catch (e) { console.error(`✗ ${f} : ${e.message}`); process.exitCode = 1; continue; }
  for (const id of Object.keys(w.CHAPITRES)) {
    if (parId[id]) { console.error(`✗ le chapitre « ${id} » est défini dans ${parId[id].fichier} et dans ${f}`); process.exitCode = 1; }
    const c = w.CHAPITRES[id];
    parId[id] = { fichier: f, series: (c.exercices || []).length, qcm: (c.qcm || []).length };
  }
}

// Moteur d'exercices de chaque niveau : fichiers à charger, dans l'ordre, avant d'afficher ses exercices.
// École : outils de l'école + fichier du niveau (champ exercices du catalogue). Collège : outils du collège + fichiers
// du niveau. Lycée : assets/lycee/<niveau>.js, la partie d'assets/exercices.js utile au niveau, fabriquée plus bas
// par outils/lycee.js. Un champ « exercices » (texte ou liste) dans le catalogue remplace la liste par défaut.
const BASE = "assets/exercices-base.js";
const COLLEGE = { sixieme: [], cinquieme: ["assets/exercices-cinquieme.js"], quatrieme: ["assets/exercices-quatrieme.js"], troisieme: ["assets/exercices-quatrieme.js", "assets/exercices-troisieme.js"] };
const lycee = require("./lycee.js");
const moteurs = {}, niveauxLycee = [];
for (const n of CATALOGUE.niveaux) {
  const propre = n.exercices ? [].concat(n.exercices) : null;
  let m;
  if (n.groupe === "ecole") m = ["assets/exercices-ecole.js"].concat(propre || []);
  else if (n.groupe === "college") m = ["assets/exercices-college.js"].concat(propre || COLLEGE[n.id] || []);
  else if (propre) m = propre;
  else { m = [lycee.fichierNiveau(n.id)]; niveauxLycee.push(n.id); }
  moteurs[n.id] = [BASE].concat(m.filter((f) => f !== BASE));
  for (const f of moteurs[n.id]) if (!niveauxLycee.includes(n.id) && !fs.existsSync(path.join(racine, f))) { console.error(`✗ ${n.nom} : fichier d'exercices introuvable ${f}`); process.exitCode = 1; }
}

// Manifeste dans l'ordre du catalogue ; seuls les chapitres « disponible » y figurent
const man = {};
for (const n of CATALOGUE.niveaux) for (const ch of n.chapitres) {
  if (ch.statut !== "disponible") continue;
  if (!parId[ch.id]) { console.error(`✗ ${n.nom} : le chapitre « ${ch.id} » (${ch.titre}) est « disponible » mais aucun fichier data/ ne le définit`); process.exitCode = 1; continue; }
  man[ch.id] = Object.assign({ niveau: n.id }, parId[ch.id]);
}
for (const id of Object.keys(parId)) if (!man[id]) console.warn(`· ${parId[id].fichier} définit « ${id} », absent du catalogue ou pas « disponible » : il ne sera pas chargé`);

const sortie = `/*
  FICHIER FABRIQUÉ AUTOMATIQUEMENT par   node outils/manifeste.js   — ne pas modifier à la main.
  MOTEURS : fichiers d'exercices de chaque niveau. MANIFESTE : pour chaque chapitre disponible, son niveau,
  son fichier, son nombre de séries et de questions de QCM. Le site charge ces fichiers seulement quand on ouvre le chapitre.
*/
window.MOTEURS = {
${Object.entries(moteurs).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(",\n")}
};
window.MANIFESTE = {
${Object.entries(man).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(",\n")}
};
`;
// Générateurs du lycée découpés par niveau (assets/lycee/*.js), refaits à partir d'assets/exercices.js
const fabriques = lycee.fabriquer(racine, CATALOGUE, man, niveauxLycee);
const verifier = process.argv.includes("--verifier");
const anciens = fs.existsSync(path.join(racine, lycee.dossier)) ? fs.readdirSync(path.join(racine, lycee.dossier)).map((f) => `${lycee.dossier}/${f}`).filter((f) => !fabriques[f]) : [];
for (const [f, texte] of Object.entries(fabriques)) {
  const p = path.join(racine, f), avant = fs.existsSync(p) ? fs.readFileSync(p, "utf8").replace(/\r\n/g, "\n") : "";
  if (avant === texte) continue;
  if (verifier) { console.error(`✗ ${f} n'est pas à jour (assets/exercices.js ou un chapitre a changé) : lance   node outils/manifeste.js`); process.exitCode = 1; }
  else { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, texte); console.log(`✓ ${f} écrit (${Math.round(texte.length / 1024)} ko)`); }
}
for (const f of anciens) {
  if (verifier) { console.error(`✗ ${f} ne sert plus : lance   node outils/manifeste.js`); process.exitCode = 1; }
  else { fs.unlinkSync(path.join(racine, f)); console.log(`✓ ${f} supprimé (niveau absent)`); }
}

const dest = path.join(racine, "data/manifeste.js");
const actuel = fs.existsSync(dest) ? fs.readFileSync(dest, "utf8").replace(/\r\n/g, "\n") : ""; // copie de travail en CRLF possible
if (verifier) {
  if (actuel !== sortie) { console.error("✗ data/manifeste.js n'est pas à jour : lance   node outils/manifeste.js"); process.exitCode = 1; }
  else console.log(`✓ data/manifeste.js à jour (${Object.keys(man).length} chapitres)`);
} else {
  fs.writeFileSync(dest, sortie);
  console.log(`✓ data/manifeste.js écrit : ${Object.keys(man).length} chapitres, ${Object.values(man).reduce((s, m) => s + m.series, 0)} séries, ${Object.values(man).reduce((s, m) => s + m.qcm, 0)} questions de QCM`);
}
