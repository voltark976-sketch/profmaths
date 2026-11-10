/*
  Vérifie (et corrige avec --corriger) l'empreinte du script en ligne d'index.html dans la politique de sécurité (CSP).
  Usage : node outils/regles/csp.js            → dit si l'empreinte est à jour (code de sortie 1 sinon)
          node outils/regles/csp.js --corriger → remplace l'empreinte par la bonne
  À lancer après toute modification du petit script du thème dans l'en-tête d'index.html : sans la bonne empreinte,
  le navigateur refuse ce script (le thème choisi ne s'applique plus, les polices ne se chargent plus).
*/
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const f = path.join(__dirname, "../../index.html");
let html = fs.readFileSync(f, "utf8");
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const meta = /<meta http-equiv="Content-Security-Policy" content="([^"]*)">/.exec(html);
if (!meta) { console.error("Pas de politique de sécurité (CSP) dans index.html"); process.exit(1); }
const voulues = scripts.map((s) => "'sha256-" + crypto.createHash("sha256").update(s, "utf8").digest("base64") + "'");
const presentes = meta[1].match(/'sha256-[^']+'/g) || [];
const manque = voulues.filter((h) => !presentes.includes(h)), trop = presentes.filter((h) => !voulues.includes(h));
if (!manque.length && !trop.length) { console.log(`Empreinte${voulues.length > 1 ? "s" : ""} de la CSP à jour (${voulues.length} script${voulues.length > 1 ? "s" : ""} en ligne).`); process.exit(0); }
if (!process.argv.includes("--corriger")) {
  console.error("Empreinte de la CSP périmée : lancer node outils/regles/csp.js --corriger");
  process.exit(1);
}
let csp = meta[1].replace(/ ?'sha256-[^']+'/g, "");
csp = csp.replace("script-src 'self'", "script-src 'self' " + voulues.join(" "));
html = html.replace(meta[0], meta[0].replace(meta[1], csp));
fs.writeFileSync(f, html);
console.log("Empreinte de la CSP corrigée.");
