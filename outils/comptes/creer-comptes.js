/*
  Création des comptes élèves (à lancer sur l'ordinateur du professeur, connecté avec « firebase login »).

    node outils/comptes/creer-comptes.js "C:\chemin\Comptes classe.xlsx"
        Une feuille par classe (le nom de la feuille = le groupe, ex. 204), colonne « Élève » au format
        « NOM Prénom » (export Pronote). Les élèves déjà créés sont ignorés, ceux marqués « Sortie » aussi.
    node outils/comptes/creer-comptes.js --nouveau-mdp prenom.nom
        Donne un nouveau mot de passe à un élève (sa progression est gardée).
    node outils/comptes/creer-comptes.js --prof identifiant
        Crée (ou réinitialise) le compte du professeur, qui voit la page « Suivi des élèves ».

  Option --classe "Seconde" (par défaut) : classe affichée sur le site et dans le classement.
  Option --essai : affiche les comptes qui seraient créés, sans rien créer.

  Les identifiants et mots de passe sont écrits dans Documents\profmaths-comptes (hors du dépôt public) :
  identifiants.csv (ouvrable dans Excel) et identifiants.html (étiquettes à imprimer et découper).
  Ne jamais copier ces fichiers dans le dossier du site.
*/
"use strict";
const fs = require("fs"), path = require("path"), zlib = require("zlib"), crypto = require("crypto"), os = require("os");
const { execFileSync } = require("child_process");

const PROJET = "profmaths-ca535", DOMAINE = "profmaths.example.com";
const DOSSIER = path.join(os.homedir(), "Documents", "profmaths-comptes");
const REGISTRE = path.join(DOSSIER, "comptes.json");
// Paramètres scrypt du fichier d'import (Firebase les convertit à la première connexion)
const SCRYPT = { N: 16384, r: 8, p: 1, dkLen: 64 };

/* ---------- Lecture d'un fichier .xlsx (zip + XML), sans dépendance ---------- */
function lireZip(fichier) {
  const b = fs.readFileSync(fichier), out = {};
  let fin = b.length - 22;
  while (fin >= 0 && b.readUInt32LE(fin) !== 0x06054b50) fin--;
  let p = b.readUInt32LE(fin + 16);
  const n = b.readUInt16LE(fin + 10);
  for (let i = 0; i < n; i++) {
    const methode = b.readUInt16LE(p + 10), taille = b.readUInt32LE(p + 20);
    const ln = b.readUInt16LE(p + 28), lx = b.readUInt16LE(p + 30), lc = b.readUInt16LE(p + 32), local = b.readUInt32LE(p + 42);
    const nom = b.toString("utf8", p + 46, p + 46 + ln);
    const debut = local + 30 + b.readUInt16LE(local + 26) + b.readUInt16LE(local + 28);
    const brut = b.subarray(debut, debut + taille);
    out[nom] = (methode === 8 ? zlib.inflateRawSync(brut) : brut).toString("utf8");
    p += 46 + ln + lx + lc;
  }
  return out;
}
const dec = (s) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");
function lireXlsx(fichier) {
  const z = lireZip(fichier);
  const ss = [...(z["xl/sharedStrings.xml"] || "").matchAll(/<si>([\s\S]*?)<\/si>/g)].map((m) => dec([...m[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((t) => t[1]).join("")));
  const liens = Object.fromEntries([...z["xl/_rels/workbook.xml.rels"].matchAll(/<Relationship [^>]*?Id="([^"]+)"[^>]*?Target="([^"]+)"/g)].map((m) => [m[1], m[2]]));
  const feuilles = {};
  for (const m of z["xl/workbook.xml"].matchAll(/<sheet [^>]*?name="([^"]*)"[^>]*?r:id="([^"]+)"/g)) {
    const xml = z["xl/" + liens[m[2]].replace(/^\/?xl\//, "")];
    feuilles[dec(m[1])] = [...xml.matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)].map((r) => {
      const ligne = [];
      for (const c of r[1].matchAll(/<c r="([A-Z]+)\d+"([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
        const col = c[1].split("").reduce((a, ch) => a * 26 + ch.charCodeAt(0) - 64, 0) - 1;
        const v = (c[3] || "").match(/<v>([\s\S]*?)<\/v>/);
        ligne[col] = /t="s"/.test(c[2]) ? ss[+v[1]] : /t="inlineStr"/.test(c[2]) ? dec(((c[3] || "").match(/<t[^>]*>([\s\S]*?)<\/t>/) || [])[1] || "") : v ? dec(v[1]) : "";
      }
      return ligne;
    });
  }
  return feuilles;
}

/* ---------- Identifiants et mots de passe ---------- */
const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9-]/g, "");
const majuscules = (w) => w === w.toUpperCase() && /[A-Z]/.test(w);
const CONS = "bcdfgjkmnprstvz", VOY = "aeiou";
// Facile à taper sur un téléphone : trois syllabes et deux chiffres (ex. bamoti42)
function motDePasse(syllabes = 3) {
  let s = "";
  for (let i = 0; i < syllabes; i++) s += CONS[crypto.randomInt(CONS.length)] + VOY[crypto.randomInt(VOY.length)];
  return s + crypto.randomInt(10, 100);
}
function compteImport(c, mdp, claims) {
  const sel = crypto.randomBytes(16);
  return {
    localId: c.uid, email: `${c.identifiant}@${DOMAINE}`, emailVerified: true, displayName: c.prenom,
    passwordHash: crypto.scryptSync(mdp, sel, SCRYPT.dkLen, { N: SCRYPT.N, r: SCRYPT.r, p: SCRYPT.p, maxmem: 64 * 1024 * 1024 }).toString("base64"),
    salt: sel.toString("base64"), customAttributes: JSON.stringify(claims)
  };
}
function importer(comptes) {
  const tmp = path.join(os.tmpdir(), `profmaths-import-${Date.now()}.json`);
  fs.writeFileSync(tmp, JSON.stringify({ users: comptes }));
  try {
    execFileSync(process.platform === "win32" ? "firebase.cmd" : "firebase", ["auth:import", tmp, "--project", PROJET,
      "--hash-algo=STANDARD_SCRYPT", `--mem-cost=${SCRYPT.N}`, `--block-size=${SCRYPT.r}`, `--parallelization=${SCRYPT.p}`, `--dk-len=${SCRYPT.dkLen}`],
    { stdio: "inherit", shell: process.platform === "win32" });
  } finally { fs.rmSync(tmp, { force: true }); }
}
const claimsEleve = (c) => ({ eleve: true, prenom: c.prenom, nom: c.nom, classe: c.classe, groupe: c.groupe });

/* ---------- Fichiers à distribuer ---------- */
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
function ecrireListes(reg) {
  const eleves = reg.eleves.filter((c) => c.mdp).sort((a, b) => a.groupe.localeCompare(b.groupe) || a.nom.localeCompare(b.nom));
  const csv = ["Groupe;Nom;Prénom;Identifiant;Mot de passe"].concat(eleves.map((c) => [c.groupe, c.nom, c.prenom, c.identifiant, c.mdp].join(";")));
  fs.writeFileSync(path.join(DOSSIER, "identifiants.csv"), "\ufeff" + csv.join("\r\n"));
  const etiquettes = eleves.map((c) => `<div class="e"><b>${esc(c.prenom)} ${esc(c.nom)}</b> <small>${esc(c.groupe)}</small><br>Site : voltark976-sketch.github.io/profmaths<br>Identifiant : <code>${esc(c.identifiant)}</code><br>Mot de passe : <code>${esc(c.mdp)}</code></div>`).join("");
  fs.writeFileSync(path.join(DOSSIER, "identifiants.html"), `<!doctype html><meta charset="utf-8"><title>Identifiants ProfMaths</title>
<style>body{font:14px system-ui,sans-serif;margin:1cm}.g{display:grid;grid-template-columns:1fr 1fr;gap:0}.e{border:1px dashed #999;padding:.45cm;line-height:1.6;break-inside:avoid}code{font-size:16px}small{color:#666}</style>
<p>Identifiants des élèves : imprimer, découper et distribuer. Ne pas publier.</p><div class="g">${etiquettes}</div>`);
}

/* ---------- Programme ---------- */
fs.mkdirSync(DOSSIER, { recursive: true });
const reg = fs.existsSync(REGISTRE) ? JSON.parse(fs.readFileSync(REGISTRE, "utf8")) : { eleves: [], prof: null };
const args = process.argv.slice(2), opt = (n) => { const i = args.indexOf(n); return i < 0 ? null : args.splice(i, 2)[1]; };
const essai = args.includes("--essai") && args.splice(args.indexOf("--essai"), 1);
const classe = opt("--classe") || "Seconde", reinit = opt("--nouveau-mdp"), prof = opt("--prof");
const sauver = () => { fs.writeFileSync(REGISTRE, JSON.stringify(reg, null, 1)); ecrireListes(reg); };

if (prof) {
  const mdp = motDePasse(5);
  reg.prof = { identifiant: norm(prof.replace(/\s+/g, ".")) || "prof", uid: "prof-" + norm(prof) };
  importer([compteImport(Object.assign({ prenom: "Professeur" }, reg.prof), mdp, { prof: true, prenom: "Professeur" })]);
  sauver();
  console.log(`\nCompte professeur : identifiant ${reg.prof.identifiant}, mot de passe ${mdp} (à noter, il n'est enregistré nulle part).`);
} else if (reinit) {
  const c = reg.eleves.find((x) => x.identifiant === reinit);
  if (!c) { console.error("Identifiant inconnu : " + reinit); process.exit(1); }
  c.mdp = motDePasse();
  importer([compteImport(c, c.mdp, claimsEleve(c))]);
  sauver();
  console.log(`\n${c.prenom} ${c.nom} : nouveau mot de passe ${c.mdp}`);
} else if (args[0]) {
  const pris = new Set(reg.eleves.map((c) => c.identifiant)), nouveaux = [];
  for (const [groupe, lignes] of Object.entries(lireXlsx(args[0]))) {
    const tete = lignes[0] || [], col = (t) => tete.findIndex((x) => x && x.startsWith(t));
    const cEleve = Math.max(0, col("Élève")), cSortie = col("Sortie");
    for (const l of lignes.slice(1)) {
      const brut = l && l[cEleve] && l[cEleve].trim();
      if (!brut) continue;
      if (cSortie >= 0 && l[cSortie]) { console.log(`Ignoré (sorti) : ${brut}`); continue; }
      const mots = brut.split(/\s+/), nom = mots.filter(majuscules).join(" "), prenom = mots.filter((w) => !majuscules(w)).join(" ") || nom;
      if (reg.eleves.some((c) => c.groupe === groupe && c.nom === nom && c.prenom === prenom)) continue;
      const base = (norm(prenom.split(/\s/)[0]) + "." + norm(nom.split(/\s/)[0])).slice(0, 27);
      let id = base, k = 2;
      while (pris.has(id)) id = base + k++;
      pris.add(id);
      const c = { groupe, classe, nom, prenom, identifiant: id, uid: "eleve-" + id, mdp: motDePasse() };
      nouveaux.push(c);
    }
  }
  if (!nouveaux.length) { console.log("Aucun nouvel élève."); process.exit(0); }
  if (essai) { nouveaux.forEach((c) => console.log(`${c.groupe}  ${c.identifiant.padEnd(28)} ${c.prenom} | ${c.nom}`)); console.log(`${nouveaux.length} comptes à créer (essai : rien n'est créé)`); process.exit(0); }
  for (let i = 0; i < nouveaux.length; i += 500) importer(nouveaux.slice(i, i + 500).map((c) => compteImport(c, c.mdp, claimsEleve(c))));
  reg.eleves.push(...nouveaux);
  sauver();
  console.log(`\n${nouveaux.length} comptes créés. Identifiants dans ${DOSSIER}`);
} else {
  console.log(fs.readFileSync(__filename, "utf8").split("*/")[0]);
}
