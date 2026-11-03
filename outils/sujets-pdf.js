/*
  PDF DES SUJETS COMPLETS (rubriques « Sujets type devoir commun », « Sujets type bac »)
  -----------------------------------------------------------------------------------
  node outils/sujets-pdf.js              → tous les sujets du catalogue
  node outils/sujets-pdf.js seconde-dc-1 → un seul sujet

  Pour chaque sujet : le site est servi en local, la page #sujet-<id> est ouverte dans Chrome (ou Edge)
  sans fenêtre, puis imprimée en A4 : l'énoncé (page normale : indices et corrigés fermés) et le corrigé
  (page #sujet-<id>.corrige : tous les corrigés ouverts). La feuille de style d'impression (assets/style.css,
  « @media print ») enlève le site autour et les boutons. Les PDF vont aux chemins du champ pdf du catalogue,
  et leur poids (en ko) est écrit dans le champ ko du sujet, dans data/catalogue.js.
  Un sujet officiel (champ officiel : énoncé sur le site d'origine) n'a que le PDF de son corrigé.
  Chrome est cherché aux emplacements habituels ; sinon, indiquer son chemin dans la variable CHROME.
  Sans dépendance : Node 22 ou plus récent (fetch et WebSocket intégrés).
*/
const http = require("http"), fs = require("fs"), path = require("path"), os = require("os"), vm = require("vm"), { spawn } = require("child_process");
const racine = path.join(__dirname, "..");
const attendre = (ms) => new Promise((r) => setTimeout(r, ms));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// Les sujets du catalogue
const w = {};
vm.runInNewContext(fs.readFileSync(path.join(racine, "data/catalogue.js"), "utf8"), { window: w });
const tous = w.CATALOGUE.niveaux.flatMap((n) => ((n.sujets && n.sujets.liste) || []).map((s) => ({ n, s })));
const voulus = process.argv.slice(2);
const sujets = voulus.length ? tous.filter((t) => voulus.includes(t.s.id)) : tous;
if (!sujets.length) { console.error(voulus.length ? `✗ sujet inconnu : ${voulus.join(", ")}` : "✗ aucun sujet dans le catalogue"); process.exit(1); }

// Chrome ou Edge
const candidats = [process.env.CHROME,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"].filter(Boolean);
const CHROME = candidats.find((c) => fs.existsSync(c));
if (!CHROME) { console.error("✗ Chrome introuvable : indique son chemin dans la variable CHROME."); process.exit(1); }

// Petit serveur du site (fichiers de racine/)
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf", ".webmanifest": "application/manifest+json" };
const serveur = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  const f = path.join(racine, p);
  if (!f.startsWith(racine) || !fs.existsSync(f) || !fs.statSync(f).isFile()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
});

(async () => {
  await new Promise((r) => serveur.listen(0, "127.0.0.1", r));
  const site = `http://127.0.0.1:${serveur.address().port}/`;
  const profil = fs.mkdtempSync(path.join(os.tmpdir(), "profmaths-pdf-"));
  const port = 9400 + Math.floor(Math.random() * 400);
  const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profil}`, "--no-first-run", "--no-default-browser-check", "about:blank"], { stdio: "ignore" });
  const fin = async (code) => { try { chrome.kill(); } catch (e) {} serveur.close(); await attendre(300); try { fs.rmSync(profil, { recursive: true, force: true }); } catch (e) {} process.exitCode = code; };
  try {
    let cible;
    for (let k = 0; k < 60 && !cible; k++) {
      try { cible = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === "page"); } catch (e) { await attendre(250); }
    }
    if (!cible) throw new Error("Chrome ne répond pas");
    const ws = new WebSocket(cible.webSocketDebuggerUrl);
    await new Promise((r) => ws.addEventListener("open", r));
    let n = 0; const attente = {}, erreurs = [];
    ws.addEventListener("message", (ev) => {
      const m = JSON.parse(ev.data);
      if (m.id && attente[m.id]) { attente[m.id](m); delete attente[m.id]; }
      if (m.method === "Runtime.exceptionThrown") erreurs.push((m.params.exceptionDetails.exception || {}).description || m.params.exceptionDetails.text);
    });
    const cmd = (method, params = {}) => new Promise((r) => { const id = ++n; attente[id] = r; ws.send(JSON.stringify({ id, method, params })); });
    const evaluer = async (expr) => ((await cmd("Runtime.evaluate", { expression: expr, returnByValue: true })).result.result || {}).value;
    await cmd("Page.enable"); await cmd("Runtime.enable");
    await cmd("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: "light" }] });

    let catalogue = fs.readFileSync(path.join(racine, "data/catalogue.js"), "utf8");
    for (const { n: niv, s } of sujets) {
      const ko = {};
      for (const mode of ["enonce", "corrige"]) {
        if (!s.pdf || !s.pdf[mode]) continue;
        // une adresse nouvelle à chaque fois (?pdf=…) : la page est rechargée, sans état de la précédente
        await cmd("Page.navigate", { url: `${site}?pdf=${mode}-${Date.now()}#sujet-${s.id}${mode === "corrige" ? ".corrige" : ""}` });
        let pret = false;
        for (let k = 0; k < 80 && !pret; k++) { await attendre(250); pret = await evaluer("!!document.querySelector('.sujet-corps[data-pret]') && document.fonts.status === 'loaded'"); }
        if (!pret) throw new Error(`le sujet ${s.id} ne s'affiche pas`);
        await attendre(400);
        const pied = `<div style="width:100%;margin:0 14mm;font:8px Arial,sans-serif;color:#5b6577;display:flex;justify-content:space-between"><span>ProfMaths · ${esc(niv.nom)} · ${esc(s.titre)}${mode === "corrige" ? " · corrigé" : ""}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`;
        const r = await cmd("Page.printToPDF", { paperWidth: 8.27, paperHeight: 11.69, marginTop: 0.55, marginBottom: 0.7, marginLeft: 0.55, marginRight: 0.55, printBackground: true, displayHeaderFooter: true, headerTemplate: "<div></div>", footerTemplate: pied });
        if (!r.result || !r.result.data) throw new Error(`impression impossible (${s.id}, ${mode})`);
        const sortie = path.join(racine, s.pdf[mode]), octets = Buffer.from(r.result.data, "base64");
        fs.mkdirSync(path.dirname(sortie), { recursive: true });
        fs.writeFileSync(sortie, octets);
        ko[mode] = Math.max(1, Math.round(octets.length / 1024));
        console.log(`✓ ${s.pdf[mode]} : ${ko[mode]} ko`);
      }
      // poids des PDF dans le catalogue (champ ko de la ligne du sujet)
      const champ = Object.keys(ko).map((k) => `${k}: ${ko[k]}`).join(", ");
      catalogue = catalogue.split("\n").map((l) => (l.includes(`id: "${s.id}"`) ? l.replace(/ko: \{[^}]*\}/, `ko: { ${champ} }`) : l)).join("\n");
    }
    fs.writeFileSync(path.join(racine, "data/catalogue.js"), catalogue);
    if (erreurs.length) console.log("Erreurs JavaScript pendant l'affichage :\n" + erreurs.join("\n"));
    ws.close();
    await fin(erreurs.length ? 1 : 0);
  } catch (e) { console.error("✗", e.message); await fin(1); }
})();
