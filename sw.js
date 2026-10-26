/*
  Service worker : le site reste rapide et consultable hors ligne.
  - Les fichiers du site portent un numéro de version (?v=…) : une fois téléchargés, ils sont servis
    depuis le cache sans repasser par le réseau (le numéro change à chaque mise en ligne).
  - La page index.html est demandée au réseau d'abord (pour recevoir les mises à jour), le cache sert
    de secours hors ligne.
  - Polices, bibliothèque Firebase et vignettes YouTube : cache d'abord, mise à jour en arrière-plan.
  - Les échanges avec Firestore (comptes, progression) ne passent jamais par le cache.
  Le numéro de version vient de l'adresse d'enregistrement (sw.js?v=…) : chaque version a son cache,
  les anciens sont effacés à l'activation.
*/
const VERSION = new URL(self.location.href).searchParams.get("v") || "0";
const CACHE = "profmaths-" + VERSION;
const COQUILLE = ["./", "assets/style.css", "assets/katex/katex.min.css", "data/config-comptes.js", "data/catalogue.js", "data/jeux.js", "data/manifeste.js", "data/niveaux.js", "assets/avatar.js", "assets/compte.js", "assets/app.js"];
const v = (f) => (f === "./" ? "./" : f + "?v=" + VERSION);

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(COQUILLE.map(v))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith("profmaths-") && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

const JAMAIS = /firestore\.googleapis\.com|identitytoolkit|securetoken|googleapis\.com\/identitytoolkit|youtube(-nocookie)?\.com/;
const PERENNE = /^https:\/\/(fonts\.gstatic\.com|fonts\.googleapis\.com|cdn\.jsdelivr\.net|i\.ytimg\.com)\//;

// Copie une réponse dans le cache (la copie est prise tout de suite, avant que la page ne lise la réponse)
function garder(req, n) {
  if (!(n.ok || n.type === "opaque")) return;
  const copie = n.clone();
  caches.open(CACHE).then((c) => c.put(req, copie)).catch(() => {});
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (JAMAIS.test(url.href)) return;
  const memeOrigine = url.origin === self.location.origin;
  if (!memeOrigine && !PERENNE.test(url.href)) return;

  // La page elle-même : réseau d'abord, cache en secours (hors ligne)
  if (req.mode === "navigate" || (memeOrigine && /\/(index\.html)?$/.test(url.pathname) && !url.pathname.includes("les-salles"))) {
    e.respondWith(fetch(new Request(req, { cache: "no-cache" })).then((r) => { if (r.ok) { const copie = r.clone(); caches.open(CACHE).then((c) => c.put("./", copie)); } return r; })
      .catch(() => caches.match("./", { ignoreSearch: true }).then((r) => r || caches.match(req))));
    return;
  }
  // Fichiers versionnés du site (?v=…) et bibliothèques à adresse fixe : cache d'abord
  if ((memeOrigine && url.searchParams.has("v")) || /cdn\.jsdelivr\.net/.test(url.href)) {
    e.respondWith(caches.match(req).then((r) => r || fetch(req).then((n) => { garder(req, n); return n; })));
    return;
  }
  // Le reste (polices KaTeX et Google, images SVG, vignettes YouTube, jeu Les Salles) : cache tout de suite, réseau en fond
  e.respondWith(caches.match(req).then((r) => {
    const maj = fetch(req).then((n) => { garder(req, n); return n; }).catch(() => r);
    return r || maj;
  }));
});
