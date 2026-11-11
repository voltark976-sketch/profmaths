/*
  Débloque un compte banni par les règles Firestore (10 000 XP ou plus gagnés en moins d'un jour : fiche figée).
  Usage :
    node outils/comptes/debannir.js <identifiant>                 affiche la fiche, sans rien changer
    node outils/comptes/debannir.js <identifiant> --confirmer     XP ramenés au début de la période (gains de la triche retirés)
    node outils/comptes/debannir.js <identifiant> --garder --confirmer   débloque en gardant les XP
  Il faut le CLI firebase connecté (firebase login) : l'outil écrit avec les droits de la console, hors des règles.
  Les étoiles, QCM et défis de la fiche ne sont pas touchés (le professeur peut les juger dans le suivi).
*/
"use strict";
const path = require("path");
const { execFileSync } = require("child_process");
const PROJET = "profmaths-ca535";
const FIRESTORE = `https://firestore.googleapis.com/v1/projects/${PROJET}/databases/(default)/documents`;

async function jetonFirebase() {
  const racine = execFileSync(process.platform === "win32" ? "npm.cmd" : "npm", ["root", "-g"], { encoding: "utf8", shell: process.platform === "win32" }).trim();
  const auth = require(path.join(racine, "firebase-tools", "lib", "auth"));
  const compte = auth.getGlobalDefaultAccount();
  if (!compte || !compte.tokens) throw new Error("Aucun compte Firebase connecté : lancer « firebase login »");
  return (await auth.getAccessToken(compte.tokens.refresh_token, [])).access_token;
}
async function appel(jeton, methode, url, corps) {
  const r = await fetch(url, { method: methode, headers: { Authorization: "Bearer " + jeton, "Content-Type": "application/json" }, body: corps ? JSON.stringify(corps) : undefined });
  if (!r.ok) throw new Error(`Firestore ${methode} : ${r.status} ${(await r.text()).slice(0, 300)}`);
  return r.json();
}
const entier = (v) => (v && "integerValue" in v ? +v.integerValue : v && "doubleValue" in v ? v.doubleValue : 0);

(async () => {
  const id = process.argv[2], confirmer = process.argv.includes("--confirmer"), garder = process.argv.includes("--garder");
  if (!id || id.startsWith("--")) { console.log("Usage : node outils/comptes/debannir.js <identifiant> [--garder] [--confirmer]"); process.exit(1); }
  const jeton = await jetonFirebase();
  let doc = null;
  for (const col of ["eleves", "inscrits", "profs"]) {
    const r = await appel(jeton, "POST", `${FIRESTORE}:runQuery`, { structuredQuery: {
      from: [{ collectionId: col }], where: { fieldFilter: { field: { fieldPath: "identifiant" }, op: "EQUAL", value: { stringValue: id } } }, limit: 1 } });
    const d = r.find((x) => x.document);
    if (d) { doc = d.document; break; }
  }
  if (!doc) { console.log(`Aucune fiche pour l'identifiant « ${id} ».`); process.exit(1); }
  const f = doc.fields || {}, xp = entier(f.xp), J = f.xpJ && f.xpJ.mapValue ? f.xpJ.mapValue.fields || {} : null;
  const base = J ? entier(J.base) : null, debut = J && J.t ? J.t.timestampValue : null;
  console.log(`Fiche : ${doc.name.split("/documents/")[1]}`);
  console.log(`XP : ${xp}${J ? ` · période commencée le ${debut} avec ${base} XP (gagnés depuis : ${xp - base})` : " · aucune période enregistrée"}`);
  if (!J || xp - base < 10000) console.log("Ce compte n'est pas banni.");
  if (!J) return;
  const nouveau = garder ? xp : base;
  if (!confirmer) { console.log(`Sans --confirmer, rien n'est changé. Avec --confirmer : XP = ${nouveau}, période effacée${garder ? " (XP gardés)" : ""}.`); return; }
  // Le champ xpJ est dans le masque mais absent du corps : il est supprimé
  await appel(jeton, "PATCH", `https://firestore.googleapis.com/v1/${doc.name}?updateMask.fieldPaths=xp&updateMask.fieldPaths=xpJ`,
    { fields: { xp: { integerValue: String(nouveau) } } });
  console.log(`Débloqué : XP = ${nouveau}, période effacée.`);
})().catch((e) => { console.error(e.message); process.exit(1); });
