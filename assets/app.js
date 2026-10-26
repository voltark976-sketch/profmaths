/*
  Moteur du site : navigation, affichage des chapitres, exercices, QCM et progression.
  Le contenu se trouve dans data/ ; ce fichier n'a normalement pas besoin d'être modifié.
*/
(function () {
  "use strict";
  const $app = document.getElementById("app");
  const $xp = document.getElementById("xp");
  // Générateurs et figures : remplis par assets/exercices*.js, chargés à la demande (voir « Chargement à la demande »)
  let GEN = {}, FIGURES = {};
  const shuffle = (a) => { const t = a.slice(); for (let i = t.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [t[i], t[j]] = [t[j], t[i]]; } return t; };
  const MAN = window.MANIFESTE || {}, MOTEURS = window.MOTEURS || {};
  // Un chapitre est « en ligne » s'il figure au manifeste (data/manifeste.js, fabriqué par outils/manifeste.js)
  const dispo = (id) => !!(MAN[id] || (window.CHAPITRES && CHAPITRES[id]));
  const charge = (id) => !!(window.CHAPITRES && CHAPITRES[id]);
  const nbSeries = (id) => (charge(id) ? CHAPITRES[id].exercices.length : MAN[id] ? MAN[id].series : 0);
  const nbQcmBanque = (id) => (charge(id) ? CHAPITRES[id].qcm.length : MAN[id] ? MAN[id].qcm : 0);
  // Série, QCM ou défi en cours : la page n'est pas redessinée quand le compte se connecte (l'élève garderait sa question)
  let activiteEnCours = false;

  /* ---------- Progression (gardée dans le navigateur de l'élève) ---------- */
  const CLE = "profmaths:v1";
  let prog = { xp: 0, exo: {}, qcm: {}, jeux: {}, quand: {} };
  try { prog = Object.assign(prog, JSON.parse(localStorage.getItem(CLE) || "{}")); } catch (e) {}
  const Compte = window.PM_COMPTE;
  // Compte auquel appartient la progression gardée dans ce navigateur (vide = sans compte)
  const CLE_PROPRIO = "profmaths:proprio";
  let proprio = null;
  try { proprio = localStorage.getItem(CLE_PROPRIO); } catch (e) {}
  const save = () => { try { localStorage.setItem(CLE, JSON.stringify(prog)); } catch (e) {} majXP(); Compte.sauver(prog); };

  /* ---------- Niveau, rang et avatar ---------- */
  const AV = window.PM_AVATAR, XP = window.NIVEAUX.xp;
  const $xpAv = document.getElementById("xp-avatar"), $xpLien = document.getElementById("xp-lien");
  const monAvatar = (niv) => AV.normaliser(prog.avatar, niv === undefined ? AV.niveau(prog.xp).niveau : niv);
  function majXP() {
    const n = AV.niveau(prog.xp);
    $xp.textContent = n.niveau;
    $xpAv.innerHTML = AV.dessin(monAvatar(n.niveau), 26);
    $xpLien.title = `Niveau ${n.niveau} · ${n.rang} · ${prog.xp} XP`;
  }
  majXP();
  window.addEventListener("storage", (ev) => {
    if (ev.key !== CLE || !ev.newValue) return;
    try { prog = Object.assign({ xp: 0, exo: {}, qcm: {}, jeux: {}, quand: {} }, Compte.fusion(prog, JSON.parse(ev.newValue))); majXP(); } catch (e) {}
  });
  // Ajoute des XP (nombre entier) et annonce un passage de niveau
  function gagnerXP(pts) {
    pts = Math.max(0, Math.round(pts));
    if (!pts) return 0;
    const avant = AV.niveau(prog.xp).niveau;
    prog.xp += pts; save();
    const apres = AV.niveau(prog.xp).niveau;
    if (apres > avant) annoncerNiveau(avant, apres);
    return pts;
  }
  const $annonce = document.createElement("div");
  $annonce.className = "sr-only"; $annonce.setAttribute("role", "status"); $annonce.setAttribute("aria-live", "polite");
  document.body.appendChild($annonce);
  function annoncerNiveau(avant, apres) {
    const nouveautes = [];
    for (let n = avant + 1; n <= apres; n++) nouveautes.push(...AV.recompenses(n));
    const rangChange = AV.rang(apres) !== AV.rang(avant);
    document.querySelectorAll(".toast-niv").forEach((t) => t.remove());
    const t = document.createElement("div");
    t.className = "toast-niv";
    t.innerHTML = `<span class="toast-av">${AV.dessin(monAvatar(apres), 48)}</span><span class="toast-t"><strong>Niveau ${apres} !</strong>${rangChange ? `<span>Nouveau rang : <b>${esc(AV.rang(apres))}</b></span>` : ""}${nouveautes.length ? `<span>Débloqué : ${nouveautes.map((r) => esc(r.nom)).join(", ")}</span>` : ""}<a href="#avatar">Voir mon avatar →</a></span><button type="button" class="toast-x" aria-label="Fermer">×</button>`;
    document.body.appendChild(t);
    $annonce.textContent = `Niveau ${apres} !${rangChange ? ` Nouveau rang : ${AV.rang(apres)}.` : ""}${nouveautes.length ? ` Débloqué : ${nouveautes.map((r) => r.nom).join(", ")}.` : ""}`;
    const fermer = () => { t.classList.add("sort"); setTimeout(() => t.remove(), 300); };
    t.querySelector(".toast-x").addEventListener("click", fermer);
    t.querySelector("a").addEventListener("click", fermer);
    setTimeout(fermer, 8000);
  }
  // Coefficient d'XP quand on rejoue : record battu = XP complets, sinon beaucoup moins
  const coefRejeu = (premiere, progres, parfait) => (premiere || progres ? 1 : parfait ? XP.dejaParfait : XP.rejeuSansProgres);
  const divise = (c) => `XP divisés par ${String(Math.round((1 / c) * 10) / 10).replace(".", ",")}`;
  const texteCoef = (c, fem) => (c === XP.dejaParfait ? `déjà réussi${fem ? "e" : ""} parfaitement : ` : `rejoué${fem ? "e" : ""} sans battre ton record : `) + divise(c);
  // Défis : au-delà de quelques parties dans la journée (tous chapitres confondus), les XP diminuent
  function partieDuJour() {
    const e = Compte.eleve(), cle = "profmaths:defis-jour:" + (e ? e.uid : "anonyme");
    const auj = new Date().toLocaleDateString("fr-CA");
    let j = { d: auj, n: 0 };
    try { const l = JSON.parse(localStorage.getItem(cle) || "null"); if (l && l.d === auj && Number.isFinite(l.n)) j = l; } catch (e2) {}
    const deja = j.n;
    j.n = deja + 1;
    try { localStorage.setItem(cle, JSON.stringify(j)); } catch (e2) {}
    return deja;
  }

  /* ---------- Compte élève ---------- */
  const $compteBtn = document.getElementById("compte-btn");
  let etaitConnecte = false;
  function majBoutonCompte() {
    const e = Compte.eleve();
    $compteBtn.textContent = e ? (e.prenom || e.identifiant) : "Connexion";
    $compteBtn.classList.toggle("connecte", !!e);
  }
  const progVide = () => ({ xp: 0, exo: {}, qcm: {}, jeux: {}, quand: {} });
  // Le service de comptes (Firebase, environ 230 ko) démarre juste après le premier affichage de la page,
  // pour que le contenu demandé arrive d'abord ; tout de suite pour les pages du compte.
  let compteLance = false;
  function lancerCompte() {
    if (compteLance) return;
    compteLance = true;
    Compte.init(quandCompte);
  }
  function quandCompte(eleve, distant, indisponible) {
    if (eleve) {
      // La progression appartient au compte : celle d'un autre compte ou faite sans compte sur cet appareil
      // est écartée ; seule la copie locale du même compte (essais faits hors ligne) est fusionnée.
      if (proprio !== eleve.uid) prog = progVide();
      prog = Compte.fusion(prog, distant);
      proprio = eleve.uid;
      try { localStorage.setItem(CLE_PROPRIO, proprio); } catch (e) {}
      etaitConnecte = true;
      save();
    } else if ((etaitConnecte || proprio) && !indisponible) {
      // Déconnexion (ou session terminée) : on efface la progression de l'appareil (téléphone partagé)
      prog = progVide();
      proprio = null;
      try { localStorage.removeItem(CLE); localStorage.removeItem(CLE_PROPRIO); } catch (e) {}
      etaitConnecte = false;
      majXP();
    }
    majBoutonCompte();
    if (!activiteEnCours) route();
  }
  majBoutonCompte();
  setTimeout(lancerCompte, 5000); // au plus tard 5 s après le départ
  if (/^#(compte|suivi|demandes|comptes|frequentation|avatar)\b/.test(location.hash)) lancerCompte();

  /* ---------- Apparence : clair, sombre ou ruines ---------- */
  // Sans choix enregistré, le site suit le réglage clair/sombre de l'appareil.
  // Ordinateur : trois boutons. Téléphone : un seul bouton qui passe au thème suivant.
  const CLE_THEME = "profmaths:theme";
  const THEMES = { light: "Clair", dark: "Sombre", ruines: "Ruines" };
  const boutonsTheme = document.querySelectorAll("[data-theme-choix]");
  const cycleTheme = document.getElementById("theme-cycle");
  // Couleur de la barre du navigateur sur téléphone, accordée à la barre du haut du site
  const COULEUR_BARRE = { light: "#f2f6f6", dark: "#0c1a1c", ruines: "#fbf1d9" };
  const sombreSysteme = matchMedia("(prefers-color-scheme: dark)");
  const themeActuel = () => document.documentElement.dataset.theme || (sombreSysteme.matches ? "dark" : "light");
  function majTheme() {
    const t = themeActuel();
    boutonsTheme.forEach((b) => b.setAttribute("aria-pressed", b.dataset.themeChoix === t));
    if (cycleTheme) {
      cycleTheme.dataset.actuel = t;
      cycleTheme.setAttribute("aria-label", `Apparence : ${THEMES[t]}. Toucher pour changer.`);
      cycleTheme.title = `Apparence : ${THEMES[t]}`;
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = COULEUR_BARRE[t];
  }
  if (sombreSysteme.addEventListener) sombreSysteme.addEventListener("change", majTheme);
  // La feuille du thème « Ruines » n'est téléchargée que si on le choisit : on attend qu'elle soit
  // arrivée avant de changer d'apparence, pour ne pas montrer une page à moitié habillée.
  function chargerRuines(suite) {
    if (document.getElementById("css-ruines")) return suite();
    const base = document.querySelector('link[href*="style.css"]');
    const l = document.createElement("link");
    l.rel = "stylesheet"; l.id = "css-ruines";
    l.href = base ? base.getAttribute("href").replace("style.css", "ruines.css") : "assets/ruines.css";
    l.onload = l.onerror = suite;
    document.head.appendChild(l);
  }
  function choisirTheme(t) {
    const appliquer = () => {
      document.documentElement.dataset.theme = t;
      try { localStorage.setItem(CLE_THEME, t); } catch (e) {}
      majTheme();
    };
    if (t === "ruines") chargerRuines(appliquer); else appliquer();
  }
  boutonsTheme.forEach((b) => b.addEventListener("click", () => choisirTheme(b.dataset.themeChoix)));
  if (cycleTheme) cycleTheme.addEventListener("click", () => {
    const ordre = Object.keys(THEMES);
    choisirTheme(ordre[(ordre.indexOf(themeActuel()) + 1) % ordre.length]);
  });
  majTheme();

  /* ---------- Mise en forme du texte : $maths$, **gras**, puces ---------- */
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // Une liste écrite dans une seule formule ($3 ; 11 ; 19 ; …$) ne peut pas passer à la ligne sur un téléphone :
  // on la découpe aux « ; » de premier niveau, chaque nombre devient une petite formule.
  function decoupeListe(src) {
    const parts = []; let d = 0, cur = "";
    for (let i = 0; i < src.length; i++) {
      const c = src[i];
      if (c === "\\") { cur += c + (src[i + 1] || ""); i++; continue; }
      if (c === "{") d++; else if (c === "}") d--;
      if (d === 0 && src.startsWith(" ; ", i)) { parts.push(cur); cur = ""; i += 2; continue; }
      cur += c;
    }
    parts.push(cur);
    return parts;
  }
  function tex(src, display) {
    const tt = !display && String(src).match(/^\s*\\texttt\{((?:[^{}\\]|\\.)*)\}\s*$/); // code Python en ligne : du texte qui peut passer à la ligne
    if (tt) return `<code class="tt">${esc(tt[1].replace(/\\([_{}#%&$ ])/g, "$1"))}</code>`;
    if (!display && src.includes(" ; ") && !/\\left|\\right|\\begin/.test(src)) {
      const parts = decoupeListe(src);
      if (parts.length > 1) return parts.map((p) => tex(p)).join(" ; ");
    }
    if (window.katex) {
      // Intervalles : ]a ; b[ s'écrit comme d'habitude, l'espacement des crochets est corrigé ici
      // (sauf après \left : \left[ … \right] s'ajuste déjà tout seul)
      src = src.replace(/([\[\]])([^\[\];$]*?)\\,;([^\[\];$]*?)([\[\]])/g, (m, o, a, b, f, i, t) => (/\\left$/.test(t.slice(0, i)) ? m : `\\mathopen{${o}}${a}\\,;${b}\\mathclose{${f}}`));
      try { return katex.renderToString(src, { throwOnError: false, displayMode: !!display }); } catch (e) {}
    }
    return `<code>${esc(src)}</code>`;
  }
  function inline(s) {
    const maths = [];
    // Typographie sur petit écran : espace insécable devant « ? ! : ; » et à l'intérieur des guillemets,
    // et aucune coupure de ligne entre une formule et la ponctuation qui la suit (pas de « . » seul en début de ligne)
    const t = String(s).replace(/\$([^$]+)\$/g, (_, m) => "\u0000" + (maths.push(m) - 1) + "\u0000")
      .replace(/ ([?!:;»])/g, " $1").replace(/« /g, "« ")
      .replace(/\u0000(\d+)\u0000(?=[.,;:!?)%» ])/g, "\u0000$1\u0000⁠")
      // ni coupure entre un nombre (ou une formule) et son unité : « 45 °C », « 12 km/h », « 30 élèves »
      .replace(/(\d|\u0000) (?=(?:°C|°|%|€|[kcmd]?m[²³]?|[kmc]?g|[mcd]?L|h|min|s|ha|m\/s|km\/h|mg\/L|ans?|jours?|mois|heures?|minutes?|secondes?)(?![A-Za-zÀ-ÿ0-9]))/g, "$1\u00a0")
      .replace(/\((?=\u0000)/g, "(\u2060"); // ni entre « ( » et la formule qui suit
    return esc(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\u0000(\d+)\u0000/g, (_, i) => tex(maths[+i]));
  }
  // Étiquette devant la case réponse : « x_I = », « P(Ā ∩ B) ≈ », « Q₃ − Q₁ = » sont écrits en maths (KaTeX),
  // « Moyenne : » ou « Médiane ≈ » restent du texte. Aucune notation ne doit s'afficher brute.
  const VERS_TEX = { "Ā": "\\overline{A}", "B̄": "\\overline{B}", "∩": "\\cap ", "∪": "\\cup ", "−": "-", "σ": "\\sigma ", "α": "\\alpha ", "β": "\\beta ", "Δ": "\\Delta ", "′": "'", "≤": "\\leqslant ", "≥": "\\geqslant ", "∞": "\\infty " };
  function etiquette(p) {
    p = String(p == null ? "" : p);
    if (p.includes("$")) return inline(p);
    const m = p.match(/^(.*?)\s*(=|≈|≠)$/);
    if (!m || !m[1] || /[a-zà-ÿ]{3,}/i.test(m[1].replace(/det/g, ""))) return esc(p);
    let t = m[1].replace(/‖(\w)‖/g, "\\|\\vec{$1}\\|").replace(/det/g, "\\det ");
    t = t.replace(/B̄/g, VERS_TEX["B̄"]).replace(/[Ā∩∪−σαβΔ′≤≥∞]/g, (c) => VERS_TEX[c]);
    t = t.replace(/[₀-₉]+/g, (d) => `_{${[...d].map((c) => c.charCodeAt(0) - 0x2080).join("")}}`);
    t = t.replace(/(\d),(\d)/g, "$1{,}$2").replace(/\s;\s/g, "\\,;\\,");
    return tex(`${t} ${{ "=": "=", "≈": "\\approx", "≠": "\\neq" }[m[2]]}`);
  }
  function md(s) {
    // Blocs de code (programmes Python) entre deux lignes ``` : mis de côté d'abord, pour garder leurs lignes vides
    const codes = [];
    s = String(s).replace(/```[a-z]*\n?([\s\S]*?)\n?```/g, (_, c) => `\n\n\u0000${codes.push(c) - 1}\u0000\n\n`);
    return s.split(/\n\n+/).filter((bloc) => bloc.trim()).map((bloc) => {
      const code = bloc.trim().match(/^\u0000(\d+)\u0000$/);
      if (code) return `<pre class="code"><code>${esc(codes[+code[1]])}</code></pre>`;
      const lignes = bloc.split("\n");
      let out = "", liste = [];
      const flush = () => { if (liste.length) { out += `<ul>${liste.map((l) => `<li>${inline(l)}</li>`).join("")}</ul>`; liste = []; } };
      lignes.forEach((l) => {
        if (l.startsWith("- ")) liste.push(l.slice(2));
        else { flush(); out += `<p>${inline(l)}</p>`; }
      });
      flush();
      return out;
    }).join("");
  }
  const tableau = (t) => t.lignes
    ? `<div class="scroll-x"><table class="valeurs croise">${t.lignes.map((l, i) => `<tr>${l.map((v, j) => (i === 0 || j === 0 ? `<th>${v === "" ? "" : tex(String(v))}</th>` : `<td>${tex(String(v))}</td>`)).join("")}</tr>`).join("")}</table></div>`
    : `<div class="scroll-x"><table class="valeurs"><tr><th>${tex(t.var || "x")}</th>${t.x.map((v) => `<td>${tex(String(v))}</td>`).join("")}</tr><tr><th>${tex(t.nom)}</th>${t.y.map((v) => `<td>${tex(String(v))}</td>`).join("")}</tr></table></div>`;
  // Une figure nommée (FIGURES de assets/exercices*.js), ou une liste de noms
  // (générateurs pas encore chargés : place réservée, remplie ensuite par remplirFigures)
  const figure = (nom) => [].concat(nom || []).map((n) => (FIGURES[n] ? `<figure class="fig">${FIGURES[n]()}</figure>` : `<figure class="fig fig-attente" data-figure="${esc(n)}" aria-busy="true"></figure>`)).join("");

  /* ---------- Vidéos YouTube : vignette légère, la vidéo ne se charge qu'au clic ---------- */
  function ytId(url) {
    const m = String(url || "").match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    return m ? m[1] : null;
  }
  function video(v) {
    const id = ytId(v.youtube);
    if (!id) {
      return `<div class="video video-vide"><span class="video-play" aria-hidden="true"></span><div><strong>Vidéo à venir</strong></div></div>`;
    }
    return `<button class="video" data-yt="${id}" aria-label="Lire la vidéo : ${esc(v.titre)}"><img loading="lazy" src="https://i.ytimg.com/vi/${id}/mqdefault.jpg" alt=""><span class="video-play" aria-hidden="true"></span></button>`;
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-yt]");
    if (!b) return;
    const f = document.createElement("iframe");
    f.src = `https://www.youtube-nocookie.com/embed/${b.dataset.yt}?autoplay=1&rel=0`;
    f.allow = "autoplay; encrypted-media; picture-in-picture";
    f.allowFullscreen = true;
    f.className = "video-frame";
    b.replaceWith(f);
  });

  /* ---------- Navigation par #ancre ---------- */
  const ONGLETS = [
    { id: "cours", nom: "Cours" },
    { id: "exercices", nom: "Exercices" },
    { id: "qcm", nom: "QCM" },
    { id: "defi", nom: "Défi" },
    { id: "methode", nom: "Méthode" }
  ];
  let minuterieJeu = null; // chrono du jeu en cours, arrêté quand on change de page

  /* ---------- Chargement à la demande (rapide en 3G) ----------
     Au démarrage, index.html ne charge que le catalogue, data/manifeste.js et le moteur du site.
     À l'ouverture d'un chapitre : son fichier (data/…), KaTeX et les outils communs (assets/exercices-base.js, 7 ko).
     Les générateurs de son niveau (MOTEURS du manifeste) arrivent pour les onglets Exercices, QCM et Défi,
     ou pour une figure du cours qui en a besoin. Les fichiers déjà téléchargés restent en cache (sw.js). */
  const VERSION = (/[?&]v=([^&]+)/.exec((document.currentScript || {}).src || "") || [])[1] || "";
  const BASE = "assets/exercices-base.js", KATEX = "assets/katex/katex.min.js";
  const scriptsCharges = {}, scriptsFaits = new Set();
  const chargerScript = (src) => scriptsCharges[src] || (scriptsCharges[src] = new Promise((ok, ko) => {
    const s = document.createElement("script");
    s.src = src + (VERSION ? "?v=" + VERSION : "");
    s.onload = () => { scriptsFaits.add(src); ok(); };
    s.onerror = () => { delete scriptsCharges[src]; s.remove(); ko(new Error(src)); };
    document.body.appendChild(s);
  }));
  // Les fichiers d'exercices remplissent window.PM_EXO : on reprend ses GEN et FIGURES
  const majMoteur = () => { if (window.PM_EXO) { GEN = window.PM_EXO.GEN || GEN; FIGURES = window.PM_EXO.FIGURES || FIGURES; } };
  const chargerListe = (l) => l.reduce((p, f) => p.then(() => chargerScript(f)), Promise.resolve()).then(majMoteur);
  const moteurDe = (id) => (MAN[id] && MOTEURS[MAN[id].niveau]) || [BASE, "assets/exercices.js"];
  const moteurPret = (id) => moteurDe(id).every((f) => scriptsFaits.has(f));
  const assurerMoteur = (id) => chargerListe(moteurDe(id));
  const chapitrePret = (id) => charge(id) && scriptsFaits.has(KATEX) && scriptsFaits.has(BASE);
  // Précharge les générateurs du chapitre pendant que l'élève lit le cours, seulement si le réseau est bon
  function prechargerMoteur(id) {
    const c = navigator.connection || {};
    if (c.saveData || /(^|-)(2g|3g)$/.test(c.effectiveType || "")) return;
    const go = () => assurerMoteur(id).catch(() => {});
    if (window.requestIdleCallback) requestIdleCallback(go, { timeout: 5000 }); else setTimeout(go, 3000);
  }
  const msgAttente = (t) => `<p class="patiente" role="status">${esc(t)}</p>`;
  const msgReseau = (t) => `<p class="retour-rep info"><strong>${esc(t)}</strong> Vérifie ta connexion, puis <a href="javascript:location.reload()">recharge la page</a>. Les chapitres déjà ouverts restent lisibles hors connexion.</p>`;
  const memePage = (h) => location.hash === h;

  function route() {
    const h = location.hash.replace(/^#/, "");
    const [chap, onglet] = h.split(".");
    if (minuterieJeu) { clearInterval(minuterieJeu); minuterieJeu = null; }
    activiteEnCours = false;
    if (chap && MAN[chap] && !chapitrePret(chap)) {
      // Le titre du chapitre s'affiche tout de suite, le contenu arrive juste après
      const n = CATALOGUE.niveaux.find((x) => x.id === MAN[chap].niveau), e = n && n.chapitres.find((x) => x.id === chap);
      const retour = `<a class="retour" href="#${n ? "niveau-" + esc(n.id) : ""}">← ${n ? esc(n.nom) : "Accueil"} : tous les chapitres</a>`;
      $app.dataset.niv = MAN[chap].niveau;
      $app.innerHTML = `${retour}<header class="chap-head"><p class="eyebrow">${n ? esc(n.nom) : ""}${e && e.numero ? ` · Chapitre&nbsp;${e.numero}` : ""}</p><h1>${esc(e ? e.titre : "")}</h1></header>${msgAttente("Chargement du chapitre…")}`;
      const h0 = location.hash;
      Promise.all([chargerScript(MAN[chap].fichier), chargerScript(KATEX), chargerScript(BASE)]).then(majMoteur)
        .then(() => { if (memePage(h0)) route(); })
        .catch(() => { if (memePage(h0)) $app.innerHTML = retour + msgReseau("Le chapitre n'a pas pu se charger."); });
      setTimeout(lancerCompte, 300);
      return;
    }
    document.getElementById("jeu-btn").toggleAttribute("aria-current", chap === "jeu");
    $xpLien.toggleAttribute("aria-current", chap === "avatar");
    if (chap === "compte") pageCompte();
    else if (chap === "suivi") pageSuivi();
    else if (chap === "demandes") pageDemandes();
    else if (chap === "comptes") pageComptes();
    else if (chap === "frequentation") pageFrequentation();
    else if (chap === "avatar") pageAvatar();
    else if (chap === "jeu") pageJeu(onglet);
    else if (Object.prototype.hasOwnProperty.call(CYCLES, chap)) pageCycle(chap);
    else if (chap && charge(chap)) pageChapitre(chap, onglet || "cours");
    else if (chap && CATALOGUE.niveaux.some((n) => "niveau-" + n.id === chap)) pageNiveau(CATALOGUE.niveaux.find((n) => "niveau-" + n.id === chap));
    else pageAccueil();
    // Fréquentation anonyme (une fois par appareil et par jour)
    if (chap === "jeu") Compte.visite("jeu");
    else if (chap && dispo(chap)) Compte.visite(chap, ONGLETS.some((o) => o.id === onglet) ? onglet : "cours");
    else Compte.visite();
    // Couleur du niveau (Seconde, Première...) pour habiller la page niveau et la page chapitre
    const niv = CATALOGUE.niveaux.find((n) => "niveau-" + n.id === chap || n.chapitres.some((ch) => ch.id === chap));
    if (niv) $app.dataset.niv = niv.id; else if (Object.prototype.hasOwnProperty.call(CYCLES, chap)) $app.dataset.niv = chap; else delete $app.dataset.niv;
    // La page est affichée : le service de comptes peut démarrer
    setTimeout(lancerCompte, 300);
  }
  window.addEventListener("hashchange", () => { route(); window.scrollTo(0, 0); });
  // Lien d'évitement (clavier, lecteur d'écran) : va droit au contenu
  const $evite = document.getElementById("evite");
  if ($evite) $evite.addEventListener("click", (e) => { e.preventDefault(); $app.focus(); });

  const etoiles = (n, max) => `<span class="etoiles" aria-label="${n} étoile${n > 1 ? "s" : ""} sur ${max}">${"★".repeat(n)}<span class="off">${"★".repeat(max - n)}</span></span>`;
  // Numéro de chapitre en chiffres romains, gravé en filigrane dans le thème « Ruines »
  function romain(n) {
    n = parseInt(n, 10);
    if (!(n > 0 && n < 4000)) return "";
    let r = "";
    [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]].forEach(([v, s]) => { while (n >= v) { r += s; n -= v; } });
    return r;
  }

  function bilanChapitre(id) {
    const total = nbSeries(id) * 3;
    // Chapitre chargé : étoiles série par série ; sinon toutes les étoiles enregistrées pour ce chapitre
    const got = charge(id)
      ? CHAPITRES[id].exercices.reduce((s, e) => s + (prog.exo[id + ":" + e.type] || 0), 0)
      : Object.keys(prog.exo).filter((k) => k.startsWith(id + ":")).reduce((s, k) => s + (+prog.exo[k] || 0), 0);
    return { got: Math.min(got, total), total, qcm: prog.qcm[id] };
  }

  /* ---------- Accueil ---------- */
  // Décor du bandeau d'accueil : courbes et symboles dessinés en SVG (aucune image à télécharger)
  const DECOR_HERO = `<svg class="hero-decor" viewBox="0 0 320 240" aria-hidden="true" focusable="false">
    <g class="d-grille">${[40, 80, 120, 160, 200].map((y) => `<line x1="0" y1="${y}" x2="320" y2="${y}"/>`).join("")}${[40, 80, 120, 160, 200, 240, 280].map((x) => `<line x1="${x}" y1="0" x2="${x}" y2="240"/>`).join("")}</g>
    <path class="d-courbe" d="M40 30 Q160 330 280 30"/>
    <path class="d-courbe d2" d="M0 150 C40 100 80 100 120 150 S200 200 240 150 S300 100 320 130"/>
    <circle class="d-point" cx="160" cy="180" r="6"/>
    <text x="34" y="214">π</text><text x="236" y="72" class="t2">x²</text><text x="252" y="214" class="t3">√2</text><text x="96" y="64" class="t3">Δ</text>
  </svg>`;
  const YT_PROF = "https://www.youtube.com/@Profmaths-q1p";
  const YT_MONKA = "https://www.youtube.com/@YMONKA";
  const ACCROCHES = {
    sixieme: "Nombres, fractions, géométrie : les bases",
    cinquieme: "Nouveau programme 2026",
    quatrieme: "Puissances, Pythagore, calcul littéral",
    troisieme: "Objectif brevet",
    seconde: "Les bases solides du lycée",
    automatismes: "Calcul et réflexes, pour l'épreuve anticipée",
    premiere: "Suites, second degré et plus",
    "terminale-spe": "Vers le bac et le supérieur",
    terminale: "Option maths complémentaires"
  };
  const chapitresEnLigne = (n) => n.chapitres.filter((ch) => ch.statut === "disponible" && dispo(ch.id)).length;
  // L'accueil a trois grandes cartes : Primaire (groupe « ecole »), Collège (groupe « college ») et Lycée (tous les autres)
  const CYCLES = {
    ecole: { nom: "Primaire", sous: "Du CP au CM2", glyphe: "+", lead: "Choisis ta classe. Chaque chapitre suit le programme officiel du primaire en vigueur cette année.", niveaux: () => CATALOGUE.niveaux.filter((n) => n.groupe === "ecole") },
    college: { nom: "Collège", sous: "De la 6e à la 3e", glyphe: "÷", lead: "Choisis ta classe. Chaque chapitre suit le programme officiel en vigueur cette année.", niveaux: () => CATALOGUE.niveaux.filter((n) => n.groupe === "college") },
    lycee: { nom: "Lycée", sous: "De la Seconde à la Terminale", glyphe: "∫", lead: "Choisis ta classe. Les chapitres sont rangés dans l'ordre des playlists de la chaîne.", niveaux: () => CATALOGUE.niveaux.filter((n) => !n.groupe) }
  };
  const COURT = { "Première spécialité": "Première spé", "Terminale spécialité": "Terminale spé", "Terminale maths complémentaires": "Terminale compl." };
  const carteNiveau = (href, id, nom, nb) => `<a class="carte-niv" href="${href}" data-niv="${esc(id)}"><span class="pastille-niv" aria-hidden="true"></span><span class="carte-niv-t"><strong>${esc(nom)}</strong>${ACCROCHES[id] ? `<span class="accroche">${esc(ACCROCHES[id])}</span>` : ""}<span class="meta">${nb ? `${nb} chapitre${nb > 1 ? "s" : ""} en ligne` : "En préparation"}</span></span><span class="go" aria-hidden="true">→</span></a>`;

  function pageAccueil() {
    document.title = "ProfMaths";
    const dispos = CATALOGUE.niveaux.flatMap((n) => n.chapitres.filter((ch) => ch.statut === "disponible").map((ch) => ch.id)).filter(dispo);
    const totSeries = dispos.reduce((s, k) => s + nbSeries(k), 0);
    const nbQcm = dispos.reduce((s, k) => s + nbQcmBanque(k), 0);
    let h = `<section class="hero"><div class="hero-in"><p class="eyebrow">Maths de l'école au lycée · Mayotte</p><h1>Une vidéo, un cours, des exercices. À ton rythme.</h1><p class="lead">Choisis ton niveau : tous ses chapitres s'affichent, dans l'ordre du programme.</p>
      <ul class="chiffres"><li><b>${dispos.length}</b> chapitres</li><li><b>${totSeries}</b> séries d'exercices</li><li><b>${nbQcm}</b> questions de QCM</li></ul></div>${DECOR_HERO}</section>`;
    // Deux grandes cartes, Collège et Lycée : chacune ouvre la page qui regroupe ses classes
    h += `<h2 class="titre-bloc">Choisis ton niveau</h2><nav class="cartes-cycle" aria-label="Collège ou lycée">`;
    Object.keys(CYCLES).forEach((k) => {
      const C = CYCLES[k], nivs = C.niveaux();
      if (!nivs.length) return;
      const nb = nivs.reduce((s, n) => s + chapitresEnLigne(n), 0);
      h += `<a class="carte-cycle" href="#${k}" data-niv="${k}"><span class="cycle-glyphe" aria-hidden="true">${C.glyphe}</span>
        <span class="eyebrow">${esc(C.sous)}</span><strong>${esc(C.nom)}</strong>
        <span class="cycle-classes">${nivs.map((n) => `<span>${esc(COURT[n.nom] || n.nom)}</span>`).join("")}</span>
        <span class="cycle-pied"><span class="meta">${nb ? `${nb} chapitre${nb > 1 ? "s" : ""} en ligne` : "En préparation"}</span><span class="go" aria-hidden="true">→</span></span></a>`;
    });
    h += `</nav>`;
    // À découvrir : le jeu et les chaînes YouTube
    h += `<h2 class="titre-bloc">À découvrir</h2><div class="decouvrir">
      <a class="promo promo-jeu" href="#jeu"><span class="promo-ico" aria-hidden="true">🏛️</span><span class="promo-t"><span class="eyebrow">Le jeu · du primaire au lycée</span><strong>Les Salles</strong><span>Explore un temple grec et résous les exercices gravés sur les stèles pour ouvrir les portes. Deux niveaux : Facile (primaire et collège) et Moyen (lycée). Se joue sur ordinateur ou sur téléphone.</span><span class="promo-btn">Découvrir le jeu →</span></span></a>
      <a class="promo promo-yt" href="${YT_PROF}?sub_confirmation=1" target="_blank" rel="noopener"><span class="promo-ico" aria-hidden="true">▶</span><span class="promo-t"><span class="eyebrow">Ma chaîne YouTube</span><strong>Profmaths</strong><span>Toutes les vidéos de cours et les corrections d'exercices de ce site. Abonne-toi pour ne rater aucune nouvelle vidéo !</span><span class="promo-btn">S'abonner à la chaîne</span></span></a>
      <a class="promo promo-monka" href="${YT_MONKA}" target="_blank" rel="noopener"><span class="promo-ico" aria-hidden="true">▶</span><span class="promo-t"><span class="eyebrow">En complément</span><strong>Yvan Monka</strong><span>Une autre explication, pas à pas, de chaque notion du collège et du lycée. Pratique pour revoir une méthode autrement.</span><span class="promo-btn">Voir sa chaîne →</span></span></a>
    </div>`;
    if (!Compte.eleve()) h += `<a class="invite" href="#compte"><strong>Crée ton compte</strong><span>pour retrouver ton niveau, ton avatar et tes étoiles sur n'importe quel téléphone ou ordinateur.</span></a>`;
    h += piedDePage();
    $app.innerHTML = h;
  }
  const piedDePage = () => `<footer class="pied"><a href="${YT_PROF}" target="_blank" rel="noopener">Chaîne YouTube</a><a href="https://drive.google.com/drive/folders/1mTeWgDGTv4hNYrD_ozxN9-cSDDGH_Oqn" target="_blank" rel="noopener">Cours et corrigés (Drive)</a><p class="pied-note">Site gratuit et sans publicité, fait par un professeur de mathématiques de Mayotte. Les chapitres déjà ouverts restent lisibles sans connexion.</p></footer>`;

  /* ---------- Pages Collège et Lycée : les classes de chaque cycle ---------- */
  function pageCycle(k) {
    const C = CYCLES[k];
    document.title = `${C.nom} · ProfMaths`;
    let h = `<a class="retour" href="#">← Accueil</a>
      <header class="niv-head"><p class="eyebrow">${esc(C.sous)}</p><h1><span class="pastille-niv" aria-hidden="true"></span>${esc(C.nom)}</h1><p class="lead">${esc(C.lead)}</p></header>
      <nav class="cartes-niv" aria-label="Classes ${{ ecole: "de l'école", college: "du collège", lycee: "du lycée" }[k]}">`;
    C.niveaux().forEach((n) => { h += carteNiveau(`#niveau-${esc(n.id)}`, n.id, n.nom, chapitresEnLigne(n)); });
    h += `</nav>` + piedDePage();
    $app.innerHTML = h;
  }

  /* ---------- Page d'un niveau : tous ses chapitres ---------- */
  function pageNiveau(n) {
    document.title = `${n.nom} · ProfMaths`;
    const cycle = n.groupe || "lycee";
    let h = `<a class="retour" href="#${cycle}">← ${CYCLES[cycle].nom}</a>
      <header class="niv-head"><p class="eyebrow">${CYCLES[cycle].nom}</p><h1><span class="pastille-niv" aria-hidden="true"></span>${esc(n.nom)}</h1>${n.intro ? `<p class="lead">${esc(n.intro)}</p>` : `<p class="lead">Choisis ton chapitre. Ils sont rangés dans l'ordre de la playlist.</p>`}</header>
      <ol class="chapitres chapitres-niv">`;
    if (!n.chapitres.length) h += `<li><div class="chap chap-off"><span class="num num-a">…</span><span class="chap-t"><strong>Les chapitres arrivent bientôt</strong><span class="meta">En attendant, révise avec les vidéos d'<a href="${YT_MONKA}" target="_blank" rel="noopener">Yvan Monka</a>.</span></span></div></li>`;
    n.chapitres.forEach((ch) => {
      const enLigne = ch.statut === "disponible" && dispo(ch.id);
      const num = ch.code ? `<span class="num num-a">${esc(ch.code)}</span>` : ch.numero ? `<span class="num">${ch.numero}</span>` : `<span class="num num-a">A</span>`;
      if (enLigne) {
        const b = bilanChapitre(ch.id);
        const pct = b.total ? Math.round((b.got / b.total) * 100) : 0;
        // Étoiles déjà gagnées dans le chapitre, coche verte quand tout est réussi
        const gagnees = b.got ? `<span class="chap-prog${b.got >= b.total ? " fini" : ""}" aria-label="${b.got} étoiles sur ${b.total}">${b.got}/${b.total}</span>` : "";
        h += `<li><a class="chap" href="#${ch.id}">${num}<span class="chap-t"><strong>${esc(ch.titre)}</strong><span class="meta">Cours · ${nbSeries(ch.id)} séries · QCM${b.qcm !== undefined ? ` ${Math.min(b.qcm, tailleQcmId(ch.id))}/${tailleQcmId(ch.id)}` : ""}${gagnees}</span><span class="barre" role="progressbar" aria-label="Étoiles d'exercices" aria-valuemin="0" aria-valuemax="${b.total}" aria-valuenow="${b.got}"><span style="width:${pct}%"></span></span></span><span class="go" aria-hidden="true">→</span></a></li>`;
      } else {
        h += `<li><div class="chap chap-off">${num}<span class="chap-t"><strong>${esc(ch.titre)}</strong><span class="meta">En préparation${ch.drive ? ` · <a href="${ch.drive}" target="_blank" rel="noopener">documents sur le Drive</a>` : ""}</span></span></div></li>`;
      }
    });
    h += `</ol>` + piedDePage();
    $app.innerHTML = h;
  }

  /* ---------- Niveau et avatar ---------- */
  // Carte résumé : avatar, niveau, rang et barre d'XP (page compte et page avatar)
  function carteProfil(grand) {
    const n = AV.niveau(prog.xp), suiv = AV.prochaine(n.niveau);
    return `<${grand ? "div" : "a href=\"#avatar\""} class="profil${grand ? " profil-grand" : ""}"><span class="profil-av">${AV.dessin(monAvatar(n.niveau), grand ? 132 : 72, "Ton avatar")}</span>
      <span class="profil-t"><span class="eyebrow">Rang ${esc(n.rang)}</span><strong>Niveau ${n.niveau}</strong>
      <span class="barre-xp" role="progressbar" aria-valuemin="0" aria-valuemax="${n.besoin}" aria-valuenow="${n.dans}" aria-label="XP vers le niveau suivant"><span style="width:${Math.round((n.dans / n.besoin) * 100)}%"></span></span>
      <span class="meta">${n.dans} / ${n.besoin} XP · encore ${n.reste} XP pour le niveau ${n.niveau + 1}</span>
      ${suiv ? `<span class="meta prochaine">Prochaine récompense au niveau ${suiv.niveau} : ${suiv.recompenses.map((r) => esc(r.nom)).join(", ")}</span>` : ""}</span></${grand ? "div" : "a"}>`;
  }

  let catAvatar = "cheveux";
  function pageAvatar() {
    document.title = "Mon avatar · ProfMaths";
    const n = AV.niveau(prog.xp);
    const rangs = window.NIVEAUX.rangs;
    $app.innerHTML = `<section class="page-avatar"><p class="eyebrow">Mon profil</p><h1>Mon avatar</h1>
      <p class="lead">Gagne des XP avec les exercices, les QCM et les défis. À chaque niveau, de nouveaux éléments se débloquent pour ton avatar.</p>
      <div id="profil">${carteProfil(true)}</div>
      <ol class="rangs" aria-label="Rangs">${rangs.map((r, k) => { const fin = rangs[k + 1] ? rangs[k + 1].des - 1 : null; const ici = n.niveau >= r.des && (fin === null || n.niveau <= fin); return `<li class="${ici ? "ici" : n.niveau > (fin || Infinity) ? "fait" : ""}"><strong>${esc(r.nom)}</strong><span>niv. ${r.des}${fin ? `–${fin}` : " et +"}</span></li>`; }).join("")}</ol>
      <h2>Personnaliser</h2>
      <div class="cats" role="tablist" aria-label="Parties de l'avatar">${AV.CATEGORIES.map((c) => `<button type="button" role="tab" data-cat="${c.id}" aria-selected="${c.id === catAvatar}">${esc(c.nom)}</button>`).join("")}</div>
      <div id="options" class="options" role="tabpanel"></div>
      <details class="regles-xp"><summary>Comment gagner des XP ?</summary>
        <ul><li><strong>Exercices :</strong> jusqu'à ${XP.question} XP par question réussie (moins avec des indices ou des erreurs), comptés au bilan à la fin de la série.</li>
        <li><strong>QCM :</strong> ${XP.bonneReponseQcm} XP par bonne réponse.</li>
        <li><strong>Défis chrono :</strong> ${XP.bonneReponseDefi} XP par bonne réponse.</li>
        <li><strong>Bats tes records :</strong> la première fois, ou quand tu fais mieux qu'avant (plus d'étoiles, meilleur score au QCM, record au défi), tu gagnes tous les XP. Rejouer sans faire mieux : ${divise(XP.rejeuSansProgres)}, et ${divise(XP.dejaParfait)} si tu avais déjà 3 étoiles ou 100 % au QCM.</li>
        <li><strong>Défis :</strong> après ${XP.defisPleinTarif} défis dans la journée, ceux sans nouveau record ont leurs ${divise(XP.defiApres)} jusqu'au lendemain.</li>
        <li>Chaque niveau demande un peu plus d'XP que le précédent : ${AV.xpPour(2)} XP pour le niveau 2, ${AV.xpPour(3) - AV.xpPour(2)} de plus pour le niveau 3, et ainsi de suite.</li></ul>
      </details></section>`;
    $app.querySelectorAll(".cats button").forEach((b) => b.addEventListener("click", () => {
      catAvatar = b.dataset.cat;
      $app.querySelectorAll(".cats button").forEach((x) => x.setAttribute("aria-selected", x === b));
      afficherOptions();
    }));
    afficherOptions();
  }
  function afficherOptions() {
    const n = AV.niveau(prog.xp).niveau, av = monAvatar(n);
    const $o = document.getElementById("options");
    $o.innerHTML = window.NIVEAUX.avatar[catAvatar].map((e) => {
      const ok = AV.debloque(e, n), choisi = av[catAvatar] === e.id;
      const apercu = AV.dessin(Object.assign({}, av, { [catAvatar]: e.id }), 64);
      return `<button type="button" class="opt-av${ok ? "" : " verrou"}" data-id="${e.id}" aria-pressed="${choisi}"${ok ? "" : " disabled"}>${apercu}<span class="opt-nom">${esc(e.nom)}</span>${ok ? "" : `<span class="opt-niv">🔒 Niveau ${e.niveau}</span>`}</button>`;
    }).join("");
    $o.querySelectorAll(".opt-av:not([disabled])").forEach((b) => b.addEventListener("click", () => {
      prog.avatar = Object.assign(monAvatar(), { [catAvatar]: b.dataset.id, t: Date.now() });
      save();
      document.getElementById("profil").innerHTML = carteProfil(true);
      const choisi = b.dataset.id;
      afficherOptions();
      const nb = document.querySelector(`#options [data-id="${choisi}"]`);
      if (nb) nb.focus();
    }));
  }

  /* ---------- Page jeu : « Les Salles », deux versions ----------
     #jeu : choix du niveau ; #jeu.facile : dossier les-salles-ecole/ (primaire et collège) ;
     #jeu.moyen : dossier les-salles/ (lycée). Chaque version a sa propre sauvegarde. */
  const VERSIONS_JEU = {
    facile: { nom: "Facile", public: "primaire et collège", dossier: "les-salles-ecole" },
    moyen: { nom: "Moyen", public: "lycée", dossier: "les-salles" }
  };
  function pageJeu(version) {
    document.title = "Les Salles · ProfMaths";
    const v = VERSIONS_JEU[version];
    const intro = `<p class="eyebrow">Jeu</p><h1>Les Salles</h1>
      <p class="lead">Un jeu de plateforme dans un temple grec : résous les exercices gravés sur les stèles pour ouvrir les portes.</p>`;
    if (!v) {
      $app.innerHTML = `<section class="page-jeu">${intro}
        <h2 class="titre-bloc">Choisis ton niveau</h2>
        <div class="choix-jeu">${Object.keys(VERSIONS_JEU).map((k) =>
          `<a class="btn" href="#jeu.${k}">${VERSIONS_JEU[k].nom} (${VERSIONS_JEU[k].public})</a>`).join("")}</div>
        <p class="muted">Chaque niveau garde sa propre progression dans ce navigateur.</p></section>`;
      return;
    }
    const src = `${v.dossier}/index.html`;
    $app.innerHTML = `<section class="page-jeu">${intro}
      <p><strong>Niveau ${v.nom} (${v.public})</strong> · <a href="#jeu">changer de niveau</a></p>
      <p class="muted">Sur ordinateur, se joue au clavier : clique une fois dans le jeu (le bouton « Commencer » suffit) pour que les touches répondent. Sur téléphone, des boutons apparaissent sous la salle : ouvre plutôt le jeu en plein écran et tiens ton téléphone à l'horizontale. Ta progression reste dans ce navigateur.</p>
      <iframe class="cadre-jeu" src="${src}" title="Jeu Les Salles, niveau ${v.nom}" width="100%" height="720" style="border:0"></iframe>
      <p class="muted"><a href="${src}" target="_blank" rel="noopener">Ouvrir le jeu en plein écran</a></p></section>`;
  }

  /* ---------- Page compte ---------- */
  function pageCompte() {
    document.title = "Mon compte · ProfMaths";
    const e = Compte.eleve();
    const demo = Compte.demo ? `<p class="demo">Mode démonstration : le compte n'est gardé que sur cet appareil. Les vrais comptes, accessibles partout, seront activés à la mise en ligne.</p>` : "";
    const deco = () => document.getElementById("deco").addEventListener("click", () => Compte.deconnecter().then(() => { location.hash = ""; }));
    if (e && e.prof && e.externe) {
      // Professeur extérieur approuvé : sa progression est gardée, il ne voit aucun élève
      $app.innerHTML = `<section class="page-compte"><p class="eyebrow">Compte professeur</p><h1>Bonjour ${esc(e.prenom || "")} !</h1>
        <p class="lead">Identifiant : <strong>${esc(e.identifiant)}</strong></p>
        <p>Votre compte professeur est validé : vous pouvez utiliser tout le site, votre progression est enregistrée et vous n'apparaissez pas dans les classements des élèves.</p>
        <p class="muted">Pour que vos élèves aient des comptes rattachés à vos classes, écrivez à <a href="mailto:${MAIL_PROF}">${MAIL_PROF}</a>.</p>
        <button class="btn-sec" id="deco">Se déconnecter</button></section>`;
      return deco();
    }
    if (e && e.prof) {
      $app.innerHTML = `<section class="page-compte"><p class="eyebrow">Compte professeur</p><h1>Bonjour !</h1>
        <p class="lead">Identifiant : <strong>${esc(e.identifiant)}</strong></p>
        <p class="btns-prof"><a class="btn" href="#suivi">Suivi des élèves</a> <a class="btn" href="#frequentation">Fréquentation du site</a>${Compte.chef() ? ` <a class="btn" href="#demandes">Demandes de comptes</a> <a class="btn" href="#comptes">Tous les comptes</a>` : ""}</p>
        <button class="btn-sec" id="deco">Se déconnecter</button></section>`;
      return deco();
    }
    if (e && e.attente) {
      const d = e.demande || {};
      const refus = e.attente === "refuse";
      $app.innerHTML = `<section class="page-compte"><p class="eyebrow">Compte professeur</p><h1>${refus ? "Demande non retenue" : "Demande envoyée"}</h1>
        <p class="lead">Identifiant : <strong>${esc(e.identifiant)}</strong></p>
        <p>${refus ? `Votre demande de compte professeur n'a pas été acceptée. Pour en parler, écrivez à <a href="mailto:${MAIL_PROF}">${MAIL_PROF}</a>.`
          : "Votre demande est enregistrée. M. Cadena doit l'approuver : vous aurez vos droits de professeur à la prochaine connexion après son accord."}</p>
        ${refus ? "" : `<p class="demo">Pour qu'il la voie plus vite, prévenez-le par un mail déjà rédigé : il ne reste qu'à l'envoyer.</p>
        <p><a class="btn" href="${mailDemande(Object.assign({ identifiant: e.identifiant }, d))}">Prévenir M. Cadena par mail</a></p>`}
        <button class="btn-sec" id="deco">Se déconnecter</button></section>`;
      return deco();
    }
    if (e) {
      let lignes = "";
      CATALOGUE.niveaux.forEach((n) => n.chapitres.forEach((ch) => {
        if (!dispo(ch.id)) return;
        const b = bilanChapitre(ch.id);
        // Seulement les chapitres commencés : la liste complète (plus de 200 chapitres) serait illisible
        if (!b.got && b.qcm === undefined) return;
        lignes += `<li><a class="chap" href="#${ch.id}"><span class="chap-t"><strong>${esc(ch.titre)}</strong><span class="meta">${esc(n.nom)} · ${b.got}/${b.total} étoiles${b.qcm !== undefined ? ` · QCM ${Math.min(b.qcm, tailleQcmId(ch.id))}/${tailleQcmId(ch.id)}` : ""}</span><span class="barre"><span style="width:${b.total ? Math.round((b.got / b.total) * 100) : 0}%"></span></span></span></a></li>`;
      }));
      $app.innerHTML = `<section class="page-compte"><p class="eyebrow">Mon compte</p><h1>Bonjour ${esc(e.prenom || e.identifiant)} !</h1>
        <p class="lead">Identifiant : <strong>${esc(e.identifiant)}</strong>${e.classe ? ` · ${esc(e.classe)}${e.groupe ? " " + esc(e.groupe) : ""}${e.niveau ? " (" + esc(e.niveau) + ")" : ""}` : ""}</p>${demo}
        ${e.inscrit ? `<p class="demo">Tu es dans une classe de M. Cadena ? Déconnecte-toi et utilise plutôt les identifiants transmis sur Pronote : c'est avec eux que ton professeur voit ton travail.</p>` : ""}
        ${carteProfil()}
        <h2>Ma progression</h2>${lignes ? `<ol class="chapitres">${lignes}</ol>` : `<p class="muted">Aucun chapitre commencé pour l'instant. Choisis ton niveau sur l'<a href="#">accueil</a> et lance une première série !</p>`}
        <p class="muted">Ta progression est enregistrée automatiquement après chaque exercice et chaque QCM.</p>
        <button class="btn-sec" id="deco">Se déconnecter</button>
        <p class="muted">Sur un téléphone partagé, pense à te déconnecter : tes points restent sauvegardés dans ton compte.</p></section>`;
      return deco();
    }
    // Connexion, ou création d'un compte : élève (hors des classes de M. Cadena) ou demande de compte professeur
    const niveaux = CATALOGUE.niveaux.filter((n) => n.id !== "automatismes" && n.nom !== "Automatismes").map((n) => n.nom);
    const options = niveaux.concat("Autre").map((n) => `<option>${esc(n)}</option>`).join("");
    const cases = niveaux.map((n) => `<label class="case"><input type="checkbox" name="pr-niv" value="${esc(n)}"> ${esc(n)}</label>`).join("");
    const champsCompte = (p) => `<label for="${p}-id">Identifiant choisi <span class="aide-champ">ex. : prenom.nom</span></label><input id="${p}-id" name="username" autocomplete="username" autocapitalize="none" spellcheck="false" required>
        <label for="${p}-mdp">Mot de passe <span class="aide-champ">6 caractères minimum</span></label><input id="${p}-mdp" name="password" type="password" autocomplete="new-password" minlength="6" required>`;
    $app.innerHTML = `<section class="page-compte"><p class="eyebrow">Mon compte</p><h1>Garde ta progression partout</h1>
      <p class="lead">Avec un compte, ton niveau, ton avatar et tes étoiles te suivent sur tous tes appareils.</p>${demo}
      <div class="bascule" role="tablist"><button type="button" role="tab" id="t-co" aria-selected="true">Me connecter</button><button type="button" role="tab" id="t-cr" aria-selected="false">Créer un compte</button></div>
      <form id="f-co" class="formulaire" autocomplete="on">
        <label for="co-id">Identifiant <span class="aide-champ">ex. : prenom.nom</span></label><input id="co-id" name="username" autocomplete="username" autocapitalize="none" spellcheck="false" required>
        <label for="co-mdp">Mot de passe</label><input id="co-mdp" name="password" type="password" autocomplete="current-password" required>
        <p class="erreur" role="alert">${esc(Compte.erreurCompte())}</p><button class="btn" type="submit">Me connecter</button>
        <p class="muted">Élève de M. Cadena : tes identifiants t'ont été transmis sur Pronote. Mot de passe oublié ? Demande-le à ton professeur.</p>
      </form>
      <div id="p-cr" hidden>
        <p class="note-cadena"><strong>Tu es dans une classe de M. Cadena ?</strong> Ne crée pas de compte : tu as déjà un identifiant et un mot de passe, transmis sur Pronote. Utilise « Me connecter ».</p>
        <p class="qui">Je suis :</p>
        <div class="bascule" role="tablist"><button type="button" role="tab" id="t-el" aria-selected="true">Élève</button><button type="button" role="tab" id="t-pr" aria-selected="false">Professeur</button></div>
        <form id="f-el" class="formulaire" autocomplete="on">
          <label for="el-prenom">Prénom</label><input id="el-prenom" autocomplete="given-name" maxlength="40" required>
          <label for="el-nom">Nom <span class="aide-champ">facultatif</span></label><input id="el-nom" autocomplete="family-name" maxlength="40">
          <label for="el-niv">Niveau</label><select id="el-niv">${options}</select>
          ${champsCompte("el")}
          <p class="erreur" role="alert"></p><button class="btn" type="submit">Créer mon compte</button>
          <p class="muted">Ton compte est rangé dans « Autres élèves » : tu gardes ta progression, mais tu n'apparais pas dans les classes ni dans le classement des élèves de M. Cadena.</p>
        </form>
        <form id="f-pr" class="formulaire" autocomplete="on" hidden>
          <p class="note">Un compte professeur est validé par M. Cadena. Deux possibilités : lui écrire directement à <a href="${mailDemande({})}">${MAIL_PROF}</a>, ou remplir ce formulaire : la demande lui arrive sur son compte, et un mail tout prêt vous est proposé pour le prévenir.</p>
          <label for="pr-prenom">Prénom</label><input id="pr-prenom" autocomplete="given-name" maxlength="40" required>
          <label for="pr-nom">Nom</label><input id="pr-nom" autocomplete="family-name" maxlength="40" required>
          <label for="pr-etab">Établissement <span class="aide-champ">facultatif</span></label><input id="pr-etab" autocomplete="organization" maxlength="80">
          <fieldset class="cases"><legend>Niveaux de vos classes</legend>${cases}</fieldset>
          <label for="pr-contact">E-mail ou téléphone <span class="aide-champ">pour vous répondre</span></label><input id="pr-contact" autocomplete="email" maxlength="80" required>
          <label for="pr-msg">Message <span class="aide-champ">facultatif</span></label><textarea id="pr-msg" rows="3" maxlength="500"></textarea>
          ${champsCompte("pr")}
          <p class="erreur" role="alert"></p><button class="btn" type="submit">Envoyer ma demande</button>
        </form>
      </div></section>`;
    const envoyer = (form, action) => form.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const err = form.querySelector(".erreur"), b = form.querySelector("button[type=submit]");
      err.textContent = ""; b.disabled = true;
      try { await action(); } catch (x) { err.textContent = x.message; b.disabled = false; }
    });
    const val = (id) => document.getElementById(id).value;
    const onglets = (a, b, pa, pb) => {
      const montrer = (deux) => { pa.hidden = deux; pb.hidden = !deux; a.setAttribute("aria-selected", !deux); b.setAttribute("aria-selected", deux); };
      a.addEventListener("click", () => montrer(false));
      b.addEventListener("click", () => montrer(true));
    };
    const fco = document.getElementById("f-co"), fel = document.getElementById("f-el"), fpr = document.getElementById("f-pr");
    onglets(document.getElementById("t-co"), document.getElementById("t-cr"), fco, document.getElementById("p-cr"));
    onglets(document.getElementById("t-el"), document.getElementById("t-pr"), fel, fpr);
    envoyer(fco, () => Compte.connecter(val("co-id"), val("co-mdp")));
    envoyer(fel, () => Compte.creer({ type: "eleve", prenom: val("el-prenom"), nom: val("el-nom"), niveau: val("el-niv"), classe: val("el-niv"), identifiant: val("el-id"), mdp: val("el-mdp") }));
    envoyer(fpr, () => Compte.creer({
      type: "prof", prenom: val("pr-prenom"), nom: val("pr-nom"), etablissement: val("pr-etab"), contact: val("pr-contact"), message: val("pr-msg"),
      niveaux: [...fpr.querySelectorAll("[name=pr-niv]:checked")].map((c) => c.value), identifiant: val("pr-id"), mdp: val("pr-mdp")
    }));
  }

  // Mail tout prêt pour une demande de compte professeur (le professeur n'a qu'à l'envoyer)
  const MAIL_PROF = "voltark976@gmail.com";
  function mailDemande(d) {
    const l = [
      "Bonjour,", "", "Je souhaite un compte professeur sur le site ProfMaths.", "",
      "Prénom et nom : " + [d.prenom, d.nom].filter(Boolean).join(" "),
      "Établissement : " + (d.etablissement || ""),
      "Niveaux de mes classes : " + (d.niveaux || []).join(", "),
      "Contact : " + (d.contact || "")
    ];
    if (d.identifiant) l.push("Identifiant choisi sur le site : " + d.identifiant, "", "Ma demande est enregistrée sur le site : il reste à l'approuver depuis le compte prof.maths (Mon compte > Demandes de comptes).");
    if (d.message) l.push("", d.message);
    l.push("", "Merci !");
    return `mailto:${MAIL_PROF}?subject=${encodeURIComponent("Demande de compte professeur ProfMaths")}&body=${encodeURIComponent(l.join("\n"))}`;
  }

  /* ---------- Page prof.maths : demandes de comptes professeurs et élèves inscrits sur le site ---------- */
  async function pageDemandes() {
    document.title = "Demandes de comptes · ProfMaths";
    if (!Compte.chef()) {
      $app.innerHTML = `<section class="page-compte"><p class="eyebrow">Demandes de comptes</p><h1>Page réservée au compte prof.maths</h1><p><a class="btn" href="#compte">Mon compte</a></p></section>`;
      return;
    }
    $app.innerHTML = `<section class="page-compte page-demandes"><p class="eyebrow">Compte professeur</p><h1>Demandes de comptes</h1><p class="muted" id="dem-etat">Chargement…</p></section>`;
    let r;
    try { r = await Compte.demandes(); }
    catch (x) { document.getElementById("dem-etat").textContent = "Lecture impossible. Vérifie la connexion internet puis recharge la page."; return; }
    if (location.hash !== "#demandes") return;
    const date = (t) => (t && t.toDate ? t.toDate().toLocaleDateString("fr-FR") : "");
    const tri = (a, b) => ((b.creeLe && b.creeLe.seconds) || 0) - ((a.creeLe && a.creeLe.seconds) || 0);
    const ETAT = { attente: "En attente", approuve: "Approuvée", refuse: "Refusée" };
    const contact = (c) => (/@/.test(c) ? `<a href="mailto:${esc(c)}">${esc(c)}</a>` : esc(c));
    const carte = (d) => `<li class="demande ${esc(d.statut)}">
      <p><strong>${esc(d.prenom)} ${esc(d.nom)}</strong> <span class="etat">${ETAT[d.statut] || esc(d.statut)}</span></p>
      <p class="meta">Identifiant ${esc(d.identifiant)} · demandé le ${date(d.creeLe)}</p>
      ${d.etablissement ? `<p>${esc(d.etablissement)}</p>` : ""}
      <p>Niveaux : ${esc((d.niveaux || []).join(", "))}</p>
      <p>Contact : ${contact(d.contact || "")}</p>
      ${d.message ? `<p class="msg">${esc(d.message)}</p>` : ""}
      <p class="btns-prof">${d.statut !== "approuve" ? `<button class="btn" data-dem="${esc(d.uid)}" data-statut="approuve">Approuver</button>` : ""}${d.statut !== "refuse" ? ` <button class="btn-sec" data-dem="${esc(d.uid)}" data-statut="refuse">${d.statut === "approuve" ? "Retirer l'accès" : "Refuser"}</button>` : ""}${d.statut === "refuse" ? ` <button class="btn-sec" data-dem="${esc(d.uid)}" data-statut="attente">Remettre en attente</button>` : ""}</p></li>`;
    const enAttente = r.profs.filter((d) => d.statut === "attente").sort(tri), traitees = r.profs.filter((d) => d.statut !== "attente").sort(tri);
    const eleves = r.eleves.sort(tri);
    document.querySelector(".page-demandes").innerHTML = `<p class="eyebrow">Compte professeur</p><h1>Demandes de comptes</h1>
      <h2>Professeurs en attente (${enAttente.length})</h2>
      ${enAttente.length ? `<ul class="demandes">${enAttente.map(carte).join("")}</ul>` : `<p class="muted">Aucune demande en attente.</p>`}
      <p class="muted">Un professeur approuvé reçoit ses droits à sa prochaine connexion : sa progression est gardée, il n'apparaît pas dans le classement et ne voit aucun élève. Pour qu'il suive des classes, crée-lui un compte avec outils/comptes (option --prof).</p>
      ${traitees.length ? `<details><summary>Demandes déjà traitées (${traitees.length})</summary><ul class="demandes">${traitees.map(carte).join("")}</ul></details>` : ""}
      <h2>Autres élèves (${eleves.length})</h2>
      <p class="muted">Élèves qui ont créé leur compte sur le site. Ils n'apparaissent ni dans tes classes ni dans le classement.</p>
      ${eleves.length ? `<div class="table-defile"><table class="table-autres"><tr><th>Élève</th><th>Niveau</th><th>Identifiant</th><th>Créé le</th><th>XP</th></tr>${eleves.map((x) => `<tr><td>${esc(x.prenom)} ${esc(x.nom || "")}</td><td>${esc(x.niveau || "")}</td><td>${esc(x.identifiant)}</td><td>${date(x.creeLe)}</td><td>${+x.xp || 0}</td></tr>`).join("")}</table></div>` : `<p class="muted">Aucun pour l'instant.</p>`}`;
    document.querySelectorAll("[data-dem]").forEach((b) => b.addEventListener("click", async () => {
      b.disabled = true;
      try { await Compte.decider(b.dataset.dem, b.dataset.statut); pageDemandes(); }
      catch (x) { b.disabled = false; alert("Modification impossible : " + x.message); }
    }));
  }

  /* ---------- Page professeur : qui a fait quoi (devoirs) ---------- */
  let suiviCache = null; // { eleves (fiches des élèves déjà connectés), classes (listes écrites par outils/comptes) }
  const suiviChoix = { groupe: "", chap: "*", depuis: "", tri: { col: "nom", sens: 1 }, filtres: {} };
  let suiviCols = []; // colonnes du tableau affiché (pour le tri)
  async function pageSuivi() {
    document.title = "Suivi des élèves · ProfMaths";
    const e = Compte.eleve();
    if (!e || !e.prof || e.externe) {
      $app.innerHTML = `<section class="page-compte"><p class="eyebrow">Suivi des élèves</p><h1>Page réservée au professeur</h1><p><a class="btn" href="#compte">Se connecter</a></p></section>`;
      return;
    }
    $app.innerHTML = `<section class="page-suivi"><p class="eyebrow">Compte professeur</p><h1>Suivi des élèves</h1><p class="muted" id="suivi-etat">Chargement…</p></section>`;
    try { suiviCache = await Compte.suivi(); }
    catch (x) { document.getElementById("suivi-etat").textContent = "Lecture impossible. Vérifie la connexion internet puis recharge la page."; return; }
    if (location.hash !== "#suivi") return;
    afficherSuivi();
  }
  const sansAccent = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  // Filtres proposés pour une date (t en ms, 0 = jamais), une durée (secondes) ou un nombre
  function choixDate(val, jamais) {
    const j = (n) => Date.now() - n * 864e5, auj = jourISO(new Date());
    return [["auj", "Aujourd'hui", (l) => val(l) > 0 && jourISO(new Date(val(l))) === auj], ["7", "7 derniers jours", (l) => val(l) >= j(7)], ["30", "30 derniers jours", (l) => val(l) >= j(30)],
      ["vieux", "Plus de 30 jours", (l) => val(l) > 0 && val(l) < j(30)], ["jamais", jamais, (l) => !val(l)]];
  }
  const choixDuree = (val) => [["0", "Aucun", (l) => !val(l)], ["5", "5 min ou plus", (l) => val(l) >= 300], ["15", "15 min ou plus", (l) => val(l) >= 900], ["30", "30 min ou plus", (l) => val(l) >= 1800], ["60", "1 h ou plus", (l) => val(l) >= 3600]];
  const choixNombre = (val, seuils) => [["0", "0", (l) => !val(l)]].concat(seuils.map((n) => [String(n), `${n} ou plus`, (l) => val(l) >= n]));
  // Tableau triable (touche un titre) et filtrable (ligne sous les titres).
  // cols : [{ id, titre, val(l) = valeur de tri, html(l, i), classe(l), choix = "texte" | [[valeur, libellé, test(l)]], desc = premier tri décroissant }]
  function tableauSuivi(cols, lignes, classeTable, detail, opts) {
    suiviCols = cols;
    const choix = (opts && opts.choix) || suiviChoix, mots = Object.assign({ pl: "élèves", vide: "Aucun élève pour l'instant.", filtre: "Aucun élève ne correspond aux filtres." }, opts && opts.mots);
    const f = choix.filtres, t = choix.tri;
    const visibles = lignes.filter((l) => cols.every((c) => {
      const v = f[c.id]; if (!v) return true;
      if (c.choix === "texte") return sansAccent(c.val(l)).includes(sansAccent(v));
      const o = c.choix.find((o) => o[0] === v); return !o || o[2](l);
    }));
    const col = cols.find((c) => c.id === t.col) || cols[0], sens = t.sens || 1;
    const cmp = (c, a, b) => { const x = c.val(a), y = c.val(b); return typeof x === "string" || typeof y === "string" ? String(x).localeCompare(String(y), "fr") : x - y; };
    visibles.sort((a, b) => cmp(col, a, b) * sens || cmp(cols[0], a, b));
    const nbFiltres = cols.filter((c) => f[c.id]).length;
    const entete = cols.map((c) => `<th scope="col" aria-sort="${c.id === col.id ? (sens > 0 ? "ascending" : "descending") : "none"}"${c.aide ? ` title="${esc(c.aide)}"` : ""}><button type="button" class="tri" data-tri="${c.id}">${c.titre}<span class="fleche" aria-hidden="true">${c.id === col.id ? (sens > 0 ? "▲" : "▼") : "⇅"}</span></button></th>`).join("");
    const filtres = cols.map((c) => `<th>${c.choix === "texte"
      ? `<input type="search" data-filtre="${c.id}" value="${esc(f[c.id] || "")}" placeholder="Filtrer" aria-label="Filtrer : ${esc(c.aide || c.titre)}" autocomplete="off">`
      : `<select data-filtre="${c.id}" aria-label="Filtrer : ${esc(c.aide || c.titre)}"${f[c.id] ? ` class="actif"` : ""}><option value="">Tous</option>${c.choix.map((o) => `<option value="${o[0]}"${f[c.id] === o[0] ? " selected" : ""}>${o[1]}</option>`).join("")}</select>`}</th>`).join("");
    const corps = visibles.map((l, i) => `<tr${l.cls ? ` class="${l.cls}"` : ""}>${cols.map((c, j) => j === 0 ? `<th scope="row">${c.html(l, i)}</th>` : `<td${c.classe && c.classe(l) ? ` class="${c.classe(l)}"` : ""}>${c.html(l, i)}</td>`).join("")}</tr>${detail ? detail(l, i) : ""}`).join("");
    const vide = lignes.length ? mots.filtre : mots.vide;
    return `<p class="suivi-compte muted">${nbFiltres ? `<strong>${visibles.length}</strong> ${mots.pl} affichés sur ${lignes.length} · <button type="button" class="lien" id="s-effacer">Effacer les filtres</button>` : `${lignes.length} ${mots.pl} · touche un titre de colonne pour trier, la ligne du dessous pour filtrer.`}</p>
      <div class="scroll-x"><table class="suivi ${classeTable}"><thead><tr>${entete}</tr><tr class="suivi-filtres">${filtres}</tr></thead><tbody>${corps || `<tr><td colspan="${cols.length}">${vide}</td></tr>`}</tbody></table></div>`;
  }
  function afficherSuivi() {
    // Le détail d'un chapitre a besoin de son fichier (titres des séries) et de KaTeX : on les charge d'abord
    if (suiviChoix.chap && suiviChoix.chap !== "*" && MAN[suiviChoix.chap] && !chapitrePret(suiviChoix.chap)) {
      const etat = document.getElementById("suivi-etat") || $app.querySelector(".suivi-compte");
      if (etat) etat.textContent = "Chargement du chapitre…";
      Promise.all([chargerScript(MAN[suiviChoix.chap].fichier), chargerScript(KATEX), chargerScript(BASE)]).then(majMoteur)
        .catch(() => { suiviChoix.chap = "*"; })
        .then(() => { if (location.hash === "#suivi") afficherSuivi(); });
      return;
    }
    const donnees = suiviCache || {}, fiches = donnees.eleves || [], classes = donnees.classes || {};
    const groupeDe = (x) => x.groupe || x.classe || "?";
    // Classes du professeur (même sans élève encore connecté), classes des listes et classes présentes dans les fiches
    const groupes = [...new Set(((Compte.eleve() || {}).groupes || []).concat(Object.keys(classes), fiches.map(groupeDe)))].sort();
    if (!groupes.includes(suiviChoix.groupe)) suiviChoix.groupe = groupes[0] || "";
    const chaps = [];
    CATALOGUE.niveaux.forEach((n) => n.chapitres.forEach((ch) => { if (dispo(ch.id)) chaps.push({ id: ch.id, titre: ch.titre, niveau: n.nom }); }));
    if (suiviChoix.chap !== "*" && !chaps.some((c) => c.id === suiviChoix.chap)) suiviChoix.chap = "*";
    // Élèves de la classe : fiches des élèves déjà connectés, complétées par la liste de classe (élèves jamais connectés, marqués « jamais »)
    const parUid = new Map(fiches.filter((x) => groupeDe(x) === suiviChoix.groupe).map((x) => [x.uid, x]));
    const liste0 = (classes[suiviChoix.groupe] || {}).eleves || {};
    Object.keys(liste0).forEach((uid) => { if (!parUid.has(uid)) parUid.set(uid, Object.assign({ uid, groupe: suiviChoix.groupe, jamais: true }, liste0[uid])); });
    const liste = [...parUid.values()];
    const infos = { avecListe: !!classes[suiviChoix.groupe], jamais: liste.filter((x) => x.jamais).length };
    const choix = (extra) => `<div class="suivi-choix">
        <label>Classe <select id="s-groupe">${groupes.map((g) => `<option${g === suiviChoix.groupe ? " selected" : ""}>${esc(g)}</option>`).join("")}</select></label>
        <label>Chapitre <select id="s-chap"><option value="*"${suiviChoix.chap === "*" ? " selected" : ""}>Tout le site</option>${chaps.map((ch) => `<option value="${esc(ch.id)}"${ch.id === suiviChoix.chap ? " selected" : ""}>${esc(ch.niveau)} · ${esc(ch.titre)}</option>`).join("")}</select></label>
        <label>${suiviChoix.chap === "*" ? "Depuis le" : "Fait depuis le"} <input type="date" id="s-depuis" value="${esc(suiviChoix.depuis)}"></label>${extra || ""}
        <button class="btn-sec" id="s-maj" type="button">Actualiser</button>
      </div>`;
    const brancher = () => {
      const maj = (cle, el) => el && el.addEventListener("change", () => { suiviChoix[cle] = el.value; afficherSuivi(); });
      maj("groupe", document.getElementById("s-groupe"));
      maj("chap", document.getElementById("s-chap"));
      maj("depuis", document.getElementById("s-depuis"));
      document.getElementById("s-maj").addEventListener("click", pageSuivi);
      brancherTableau(suiviChoix, afficherSuivi);
    };
    if (suiviChoix.chap === "*") { suiviSite(liste, choix, infos); brancher(); return; }
    const c = CHAPITRES[suiviChoix.chap];
    const depuis = suiviChoix.depuis ? new Date(suiviChoix.depuis + "T00:00").getTime() : 0;
    const date = (t) => new Date(t).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
    const taille = tailleQcm(c);
    let faits = 0;
    const lignes = liste.map((x) => {
      const q = x.quand || {};
      // Fait = essayé (depuis la date choisie, si elle est indiquée)
      const fait = (k, existe) => (depuis ? (q[k] || 0) >= depuis : existe);
      let dernier = 0;
      const series = c.exercices.map((ex) => {
        const k = suiviChoix.chap + ":" + ex.type, st = (x.exo || {})[k];
        if (q[k]) dernier = Math.max(dernier, q[k]);
        return { ok: fait(k, st !== undefined), st: st || 0, le: q[k] };
      });
      const kq = "qcm:" + suiviChoix.chap, sq = (x.qcm || {})[suiviChoix.chap];
      if (q[kq]) dernier = Math.max(dernier, q[kq]);
      const qcm = { ok: fait(kq, sq !== undefined), score: Math.min(sq || 0, taille) };
      if (series.some((s) => s.ok) || qcm.ok) faits++;
      return { x, series, qcm, dernier, tps: +((x.temps || {}).ch || {})[suiviChoix.chap] || 0, xp: +x.xp || 0, cls: x.jamais ? "jamais" : "" };
    });
    const nom = (x) => `${esc(x.nom || "")} ${esc(x.prenom || x.identifiant || "")}`;
    const cols = [{ id: "nom", titre: "Élève", aide: "Nom de l'élève", val: (l) => `${l.x.nom || ""} ${l.x.prenom || l.x.identifiant || ""}`.toLowerCase(), html: (l) => nom(l.x), choix: "texte" }]
      .concat(c.exercices.map((ex, i) => ({
        id: "s" + i, titre: `S${i + 1}`, aide: ex.titre.replace(/\$/g, ""), desc: true,
        val: (l) => (l.series[i].ok ? l.series[i].st : -1),
        html: (l) => { const s = l.series[i]; return s.ok ? `${"★".repeat(s.st)}${s.st ? "" : "0"}` : "·"; },
        classe: (l) => (l.series[i].ok ? "fait" : "vide"),
        choix: [["fait", "Fait", (l) => l.series[i].ok], ["pas", "Pas fait", (l) => !l.series[i].ok], ["3", "3 étoiles", (l) => l.series[i].ok && l.series[i].st >= 3], ["<3", "Fait, moins de 3 étoiles", (l) => l.series[i].ok && l.series[i].st < 3]]
      })))
      .concat([
        { id: "qcm", titre: "QCM", aide: `QCM sur ${taille}`, desc: true, val: (l) => (l.qcm.ok ? l.qcm.score : -1), html: (l) => (l.qcm.ok ? `${l.qcm.score}/${taille}` : "·"), classe: (l) => (l.qcm.ok ? "fait qcm" : "vide"),
          choix: [["fait", "Fait", (l) => l.qcm.ok], ["pas", "Pas fait", (l) => !l.qcm.ok], ["tout", "Tout juste", (l) => l.qcm.ok && l.qcm.score >= taille], ["moitie", "Moins de la moitié", (l) => l.qcm.ok && l.qcm.score * 2 < taille]] },
        { id: "dernier", titre: "Dernier essai", aide: "Date du dernier essai dans ce chapitre", desc: true, val: (l) => l.dernier, html: (l) => (l.dernier ? date(l.dernier) : "–"), choix: choixDate((l) => l.dernier, "Pas encore") },
        { id: "temps", titre: "Temps", aide: "Temps actif passé dans ce chapitre", desc: true, val: (l) => l.tps, html: (l) => (l.tps ? duree(l.tps) : "–"), choix: choixDuree((l) => l.tps) },
        { id: "xp", titre: "XP", aide: "Points d'expérience", desc: true, val: (l) => l.xp, html: (l) => l.xp, choix: choixNombre((l) => l.xp, [50, 100, 200, 500]) }
      ]);
    $app.innerHTML = `<section class="page-suivi"><p class="eyebrow">Compte professeur · <a href="#frequentation">Fréquentation du site</a></p><h1>Suivi des élèves</h1>
      ${choix()}
      <p class="lead"><strong>${faits}/${liste.length}</strong> élèves ont fait au moins une série ou le QCM${depuis ? ` depuis le ${new Date(depuis).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}` : ""}.</p>
      <p class="muted">${c.exercices.map((ex, i) => `S${i + 1} : ${inline(ex.titre)}`).join(" · ")}. Étoiles = meilleur résultat (0 à 3), « · » = pas fait. Temps = temps actif passé dans ce chapitre (au total). ${infos.avecListe ? `Les élèves jamais connectés au site sont en grisé${infos.jamais ? ` (${infos.jamais})` : ""}.` : "Un élève n'apparaît qu'après sa première connexion (lance « creer-comptes.js --classes » pour voir aussi les autres)."}</p>
      ${tableauSuivi(cols, lignes, "suivi-chap")}</section>`;
    brancher();
  }
  // Tri (un titre de colonne ; même colonne = sens inverse) et filtres (la ligne sous les titres) d'un tableauSuivi ;
  // choix = { tri, filtres } modifié sur place, redessiner() réaffiche la page
  function brancherTableau(choix, redessiner) {
    $app.querySelectorAll("[data-tri]").forEach((b) => b.addEventListener("click", () => {
      const id = b.dataset.tri, t = choix.tri, c = suiviCols.find((x) => x.id === id) || {};
      if (t.col === id) t.sens = -t.sens; else { t.col = id; t.sens = c.desc ? -1 : 1; }
      redessiner();
    }));
    // Le champ texte garde le curseur après le réaffichage
    $app.querySelectorAll("[data-filtre]").forEach((el) => el.addEventListener(el.tagName === "SELECT" ? "change" : "input", () => {
      const id = el.dataset.filtre, pos = el.selectionStart;
      choix.filtres[id] = el.value;
      redessiner();
      const n = $app.querySelector(`[data-filtre="${id}"]`);
      if (n && n.tagName === "INPUT") { n.focus(); try { n.setSelectionRange(pos, pos); } catch (x) { /* rien */ } }
    }));
    const eff = document.getElementById("s-effacer");
    if (eff) eff.addEventListener("click", () => { choix.filtres = {}; redessiner(); });
  }
  // Durée en secondes -> « 8 min », « 1 h 05 »
  function duree(s) {
    const m = Math.round((+s || 0) / 60);
    if (m < 1) return "< 1 min";
    return m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, "0")}`;
  }
  // Vue « Tout le site » : pour chaque élève de la classe, dernière activité, temps passé et chapitres travaillés
  function suiviSite(liste, choix, infos) {
    const auj = jourISO(new Date());
    // Période : depuis la date choisie, sinon les 7 derniers jours
    const d7 = new Date(); d7.setDate(d7.getDate() - 6);
    const debutJ = suiviChoix.depuis || jourISO(d7), debut = new Date(debutJ + "T00:00").getTime();
    const periode = suiviChoix.depuis ? `depuis le ${new Date(debut).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}` : "ces 7 derniers jours";
    const titres = { jeu: "Jeu Les Salles" };
    CATALOGUE.niveaux.forEach((n) => n.chapitres.forEach((ch) => { titres[ch.id] = `${n.nom} · ${ch.titre}`; }));
    const ms = (t) => (t && typeof t.toMillis === "function" ? t.toMillis() : +t || 0);
    const quand = (t) => {
      const j = jourISO(new Date(t)), hier = new Date(); hier.setDate(hier.getDate() - 1);
      return j === auj ? "aujourd'hui" : j === jourISO(hier) ? "hier" : new Date(t).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
    };
    const parChap = {}; // chapitre -> élèves qui y ont fait un essai sur la période, temps total de la classe
    const lignes = liste.map((x) => {
      const q = x.quand || {}, tj = (x.temps || {}).j || {}, tch = (x.temps || {}).ch || {}, tder = (x.temps || {}).der || {};
      const tPeriode = Object.keys(tj).filter((j) => j >= debutJ).reduce((s, j) => s + (+tj[j] || 0), 0);
      const tTotal = Object.values(tj).reduce((s, v) => s + (+v || 0), 0);
      // Chapitres : date du dernier essai (série ou QCM), et ceux où l'élève a seulement passé du temps
      const ch = {};
      for (const k in q) { const id = k.replace(/^qcm:/, "").split(":")[0]; ch[id] = Math.max(ch[id] || 0, +q[k] || 0); }
      // Dernière fois dans chaque chapitre : essai, ou jour où l'élève y a passé du temps
      const der = (id) => Math.max(ch[id] || 0, tder[id] ? new Date(tder[id] + "T12:00").getTime() : 0);
      for (const id in tch) if (!(id in ch)) ch[id] = 0;
      const vus = Object.keys(ch).filter((id) => ch[id] >= debut || (tder[id] || "") >= debutJ);
      const compte = (id) => parChap[id] || (parChap[id] = { eleves: 0, temps: 0 });
      vus.forEach((id) => { compte(id).eleves++; });
      for (const id in tch) compte(id).temps += +tch[id] || 0;
      const dernier = x.jamais ? 0 : Math.max(ms(x.vuLe), ms(x.majLe), ...Object.values(q).map((t) => +t || 0));
      const detail = Object.keys(ch).sort((a, b) => der(b) - der(a) || (tch[b] || 0) - (tch[a] || 0)).map((id) => `<li><span>${esc(titres[id] || id)}</span><span>${tch[id] ? duree(tch[id]) : "–"}${der(id) ? ` · ${ch[id] ? "dernier essai" : "vu"} ${quand(ch[id] || der(id))}` : ""}</span></li>`).join("");
      const actif = tPeriode > 0 || vus.length > 0 || dernier >= debut;
      return { x, tPeriode, tTotal, dernier, nb: vus.filter((id) => id !== "jeu").length, xp: +x.xp || 0, actif, detail, cls: x.jamais ? "jamais" : actif ? "" : "inactif" };
    });
    const actifs = lignes.filter((l) => l.actif).length, tempsClasse = lignes.reduce((s, l) => s + l.tPeriode, 0);
    const nom = (x) => `${esc(x.nom || "")} ${esc(x.prenom || x.identifiant || "")}`;
    const court = suiviChoix.depuis ? "période" : "7 j";
    const cols = [
      { id: "nom", titre: "Élève", aide: "Nom de l'élève", val: (l) => `${l.x.nom || ""} ${l.x.prenom || l.x.identifiant || ""}`.toLowerCase(), choix: "texte",
        html: (l, i) => (l.detail ? `<button type="button" class="lien-eleve" aria-expanded="false" data-detail="${i}">${nom(l.x)}</button>` : nom(l.x)) },
      { id: "dernier", titre: "Dernière activité", aide: "Dernière fois que l'élève est venu connecté", desc: true, val: (l) => l.dernier,
        html: (l) => (l.x.jamais ? `<span class="jamais-co">jamais connecté</span>` : l.dernier ? quand(l.dernier) : "–"), choix: choixDate((l) => l.dernier, "Jamais connecté") },
      { id: "tper", titre: `Temps ${court}`, aide: `Temps actif ${periode}`, desc: true, val: (l) => l.tPeriode, html: (l) => (l.tPeriode ? duree(l.tPeriode) : "–"), choix: choixDuree((l) => l.tPeriode) },
      { id: "ttot", titre: "Temps total", aide: "Temps actif depuis le début", desc: true, val: (l) => l.tTotal, html: (l) => (l.tTotal ? duree(l.tTotal) : "–"), choix: choixDuree((l) => l.tTotal) },
      { id: "nb", titre: "Chapitres", aide: `Chapitres ouverts ou travaillés ${periode}`, desc: true, val: (l) => l.nb, html: (l) => l.nb || "–", choix: choixNombre((l) => l.nb, [1, 2, 3, 5]) },
      { id: "xp", titre: "XP", aide: "Points d'expérience", desc: true, val: (l) => l.xp, html: (l) => l.xp, choix: choixNombre((l) => l.xp, [50, 100, 200, 500]) }
    ];
    const detail = (l, i) => (l.detail ? `<tr class="suivi-detail" id="sd-${i}" hidden><td colspan="${cols.length}"><ul>${l.detail}</ul></td></tr>` : "");
    const chapsClasse = Object.entries(parChap).filter(([, v]) => v.eleves || v.temps).sort((a, b) => b[1].eleves - a[1].eleves || b[1].temps - a[1].temps);
    $app.innerHTML = `<section class="page-suivi"><p class="eyebrow">Compte professeur · <a href="#frequentation">Fréquentation du site</a></p><h1>Suivi des élèves</h1>
      ${choix()}
      <div class="freq-tuiles"><div class="freq-tuile"><b>${actifs}/${liste.length}</b><span>élèves actifs ${periode}</span></div>${infos.avecListe ? `<div class="freq-tuile"><b>${infos.jamais}</b><span>jamais connecté${infos.jamais > 1 ? "s" : ""} au site</span></div>` : ""}<div class="freq-tuile"><b>${tempsClasse ? duree(tempsClasse) : "0 min"}</b><span>temps passé par la classe</span></div><div class="freq-tuile"><b>${actifs && tempsClasse ? duree(tempsClasse / actifs) : "–"}</b><span>par élève actif</span></div></div>
      <p class="muted">Actif = venu sur le site connecté, ou a fait une série ou un QCM, ${periode}. Temps = temps actif sur le site (page ouverte et utilisée, vidéos comprises). Chapitres = chapitres ouverts ou travaillés (série, QCM) sur la période. Touche un nom pour voir le détail par chapitre.${infos.avecListe ? " Les élèves jamais connectés sont en grisé." : " Un élève n'apparaît qu'après sa première connexion (lance « creer-comptes.js --classes » pour voir aussi les autres)."}</p>
      ${tableauSuivi(cols, lignes, "suivi-site", detail)}
      <h2>Chapitres travaillés par la classe</h2>
      ${chapsClasse.length ? `<div class="scroll-x"><table class="suivi freq-chap"><thead><tr><th>Chapitre</th><th>Élèves (${court})</th><th>Temps total</th></tr></thead><tbody>${chapsClasse.map(([id, v]) => `<tr><th scope="row">${dispo(id) ? `<a href="#${esc(id)}">${esc(titres[id] || id)}</a>` : esc(titres[id] || id)}</th><td>${v.eleves || "·"}</td><td>${v.temps ? duree(v.temps) : "·"}</td></tr>`).join("")}</tbody></table></div>` : `<p class="muted">Rien pour l'instant.</p>`}
      <p class="muted">Le temps passé n'est mesuré que pour un élève connecté à son compte, depuis la mise à jour du site d'octobre 2026. Les élèves ne voient pas ces durées.</p></section>`;
    $app.querySelector(".suivi-site tbody").addEventListener("click", (ev) => {
      const b = ev.target.closest("[data-detail]");
      if (!b) return;
      const tr = document.getElementById("sd-" + b.dataset.detail), ouvrir = tr.hidden;
      tr.hidden = !ouvrir; b.setAttribute("aria-expanded", ouvrir);
    });
  }

  /* ---------- Page prof.maths : tous les comptes du site et leur temps actif ---------- */
  let comptesCache = null; // { eleves, classes, inscrits, demandes, profs } (voir Compte.tous)
  const comptesChoix = { tri: { col: "ttot", sens: -1 }, filtres: {} };
  async function pageComptes() {
    document.title = "Tous les comptes · ProfMaths";
    if (!Compte.chef()) {
      $app.innerHTML = `<section class="page-compte"><p class="eyebrow">Tous les comptes</p><h1>Page réservée au compte prof.maths</h1><p><a class="btn" href="#compte">Mon compte</a></p></section>`;
      return;
    }
    $app.innerHTML = `<section class="page-suivi"><p class="eyebrow">Compte professeur</p><h1>Tous les comptes</h1><p class="muted" id="comptes-etat">Chargement…</p></section>`;
    try { comptesCache = await Compte.tous(); }
    catch (x) { document.getElementById("comptes-etat").textContent = "Lecture impossible. Vérifie la connexion internet puis recharge la page."; return; }
    if (location.hash !== "#comptes") return;
    afficherComptes();
  }
  function afficherComptes() {
    const d = comptesCache || {}, auj = jourISO(new Date());
    const d7 = new Date(); d7.setDate(d7.getDate() - 6);
    const debutJ = jourISO(d7), debut = new Date(debutJ + "T00:00").getTime();
    const ms = (t) => (t && typeof t.toMillis === "function" ? t.toMillis() : +t || 0);
    const dateCourte = (t) => new Date(t).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "2-digit" });
    const quand = (t) => {
      const j = jourISO(new Date(t)), hier = new Date(); hier.setDate(hier.getDate() - 1);
      return j === auj ? "aujourd'hui" : j === jourISO(hier) ? "hier" : dateCourte(t);
    };
    const TYPES = { eleve: "Élève", autre: "Autre élève", prof: "Professeur", demande: "Demande prof" }, PLURIELS = { eleve: "Élèves des classes", autre: "Autres élèves", prof: "Professeurs", demande: "Demandes prof" };
    const ETAT = { attente: "en attente", refuse: "refusée", approuve: "approuvée" };
    // Une ligne par compte : type, classe, niveau, dernière activité, temps (7 jours et total), XP, date de création
    const ligne = (x, type, extra) => {
      const q = x.quand || {}, tj = (x.temps || {}).j || {};
      const tPeriode = Object.keys(tj).filter((j) => j >= debutJ).reduce((s, j) => s + (+tj[j] || 0), 0);
      const tTotal = Object.values(tj).reduce((s, v) => s + (+v || 0), 0);
      const dernier = x.jamais ? 0 : Math.max(ms(x.vuLe), ms(x.majLe), ms(x.decideLe), ms(x.creeLe), ...Object.values(q).map((t) => +t || 0));
      return Object.assign({ x, type, classe: "", niveau: "", etat: "", tPeriode, tTotal, dernier, xp: +x.xp || 0, cree: ms(x.creeLe), cls: x.jamais ? "jamais" : "" }, extra);
    };
    const lignes = [];
    // Élèves des classes : fiches des élèves déjà connectés, complétées par les listes de classes (jamais connectés)
    const vus = new Set();
    (d.eleves || []).forEach((x) => { vus.add(x.uid); lignes.push(ligne(x, "eleve", { classe: x.groupe || x.classe || "?", niveau: x.classe || "" })); });
    Object.entries(d.classes || {}).forEach(([groupe, c]) => Object.entries(c.eleves || {}).forEach(([uid, e]) => {
      if (!vus.has(uid)) lignes.push(ligne(Object.assign({ uid, jamais: true }, e), "eleve", { classe: groupe, niveau: c.classe || "" }));
    }));
    (d.inscrits || []).forEach((x) => lignes.push(ligne(x, "autre", { classe: "Autres élèves", niveau: x.niveau || "" })));
    // Professeurs : fiche « profs » (progression, temps) complétée par la demande de compte (professeur extérieur approuvé)
    const demandes = new Map((d.demandes || []).map((x) => [x.uid, x]));
    (d.profs || []).forEach((p) => {
      const dem = demandes.get(p.uid);
      if (dem) demandes.delete(p.uid);
      const x = Object.assign({}, dem || {}, p, { creeLe: p.creeLe || (dem && dem.creeLe) });
      if (!x.identifiant && !x.prenom) x.prenom = "Professeur (avant la mise à jour)";
      lignes.push(ligne(x, "prof", { classe: dem ? dem.etablissement || "Extérieur" : "", niveau: dem ? (dem.niveaux || []).join(", ") : "", etat: dem ? ETAT[dem.statut] || dem.statut : "" }));
    });
    // Demandes sans fiche « profs » : en attente, refusées, ou approuvées mais jamais reconnectées
    demandes.forEach((dem) => lignes.push(ligne(dem, "demande", { classe: dem.etablissement || "Extérieur", niveau: (dem.niveaux || []).join(", "), etat: ETAT[dem.statut] || dem.statut, cls: dem.statut === "refuse" ? "inactif" : "" })));
    const nom = (x) => `${esc(x.nom || "")} ${esc(x.prenom || x.identifiant || "")}`.trim() || "?";
    const cols = [
      { id: "nom", titre: "Compte", aide: "Nom, prénom et identifiant", val: (l) => `${l.x.nom || ""} ${l.x.prenom || l.x.identifiant || ""} ${l.x.identifiant || ""}`.toLowerCase(), choix: "texte",
        html: (l) => `${nom(l.x)}${l.x.identifiant ? ` <span class="ident">${esc(l.x.identifiant)}</span>` : ""}` },
      { id: "type", titre: "Type", aide: "Élève d'une classe, élève inscrit sur le site, professeur ou demande de compte professeur", val: (l) => TYPES[l.type] + (l.etat ? " " + l.etat : ""),
        html: (l) => `${TYPES[l.type]}${l.etat ? ` <span class="muted">(${esc(l.etat)})</span>` : ""}`,
        choix: Object.keys(TYPES).map((t) => [t, PLURIELS[t], (l) => l.type === t]).concat([["attente", "Demandes en attente", (l) => l.etat === "en attente"]]) },
      { id: "classe", titre: "Classe", aide: "Classe de l'élève, « Autres élèves » pour un compte créé sur le site, établissement d'un professeur extérieur", val: (l) => l.classe.toLowerCase(), html: (l) => esc(l.classe) || "–", choix: "texte" },
      { id: "niveau", titre: "Niveau", aide: "Niveau indiqué dans le compte", val: (l) => l.niveau.toLowerCase(), html: (l) => esc(l.niveau) || "–", choix: "texte" },
      { id: "dernier", titre: "Dernière activité", aide: "Dernière fois que le compte est venu connecté", desc: true, val: (l) => l.dernier,
        html: (l) => (l.x.jamais ? `<span class="jamais-co">jamais connecté</span>` : l.dernier ? quand(l.dernier) : "–"), choix: choixDate((l) => l.dernier, "Jamais connecté") },
      { id: "tper", titre: "Temps 7 j", aide: "Temps actif ces 7 derniers jours", desc: true, val: (l) => l.tPeriode, html: (l) => (l.tPeriode ? duree(l.tPeriode) : "–"), choix: choixDuree((l) => l.tPeriode) },
      { id: "ttot", titre: "Temps total", aide: "Temps actif depuis le début", desc: true, val: (l) => l.tTotal, html: (l) => (l.tTotal ? duree(l.tTotal) : "–"), choix: choixDuree((l) => l.tTotal) },
      { id: "xp", titre: "XP", aide: "Points d'expérience", desc: true, val: (l) => l.xp, html: (l) => l.xp || "–", choix: choixNombre((l) => l.xp, [50, 100, 200, 500]) },
      { id: "cree", titre: "Créé le", aide: "Date de création de la fiche (première connexion)", desc: true, val: (l) => l.cree, html: (l) => (l.cree ? dateCourte(l.cree) : "–"), choix: choixDate((l) => l.cree, "Inconnue") }
    ];
    const nb = (t) => lignes.filter((l) => l.type === t).length, attente = lignes.filter((l) => l.etat === "en attente").length;
    const tempsTotal = lignes.reduce((s, l) => s + l.tTotal, 0), temps7 = lignes.reduce((s, l) => s + l.tPeriode, 0);
    const actifs7 = lignes.filter((l) => l.tPeriode > 0 || l.dernier >= debut).length;
    $app.innerHTML = `<section class="page-suivi page-comptes"><p class="eyebrow">Compte professeur · <a href="#suivi">Suivi des élèves</a> · <a href="#demandes">Demandes de comptes</a></p><h1>Tous les comptes</h1>
      <div class="freq-tuiles"><div class="freq-tuile"><b>${lignes.length}</b><span>comptes au total</span></div><div class="freq-tuile"><b>${nb("eleve")}</b><span>élèves de tes classes</span></div><div class="freq-tuile"><b>${nb("autre")}</b><span>autres élèves</span></div><div class="freq-tuile"><b>${nb("prof")}${attente ? ` <small>+${attente}</small>` : ""}</b><span>professeurs${attente ? ` (${attente} demande${attente > 1 ? "s" : ""} en attente)` : ""}</span></div><div class="freq-tuile"><b>${actifs7}</b><span>actifs ces 7 jours</span></div><div class="freq-tuile"><b>${tempsTotal ? duree(tempsTotal) : "0 min"}</b><span>temps passé au total${temps7 ? `, dont ${duree(temps7)} ces 7 jours` : ""}</span></div></div>
      ${(d.manquants || []).length ? `<p class="alerte">Certaines listes n'ont pas pu être lues (${d.manquants.map((c) => ({ eleves: "élèves des classes", classes: "listes de classes", inscrits: "autres élèves", demandesProf: "demandes de comptes professeurs", profs: "professeurs" }[c] || c)).join(", ")}) : les règles Firebase du site ne sont sans doute pas à jour (voir LISEZMOI, firebase deploy --only firestore:rules). Le reste du tableau est affiché.</p>` : ""}
      <p class="muted">Tous les comptes connus du site : les élèves de tes classes (y compris jamais connectés, en grisé), les élèves inscrits eux-mêmes, les professeurs et les demandes de compte professeur. Temps = temps actif sur le site connecté (page ouverte et utilisée, vidéos comprises).</p>
      ${tableauSuivi(cols, lignes, "suivi-site", null, { choix: comptesChoix, mots: { pl: "comptes", vide: "Aucun compte pour l'instant.", filtre: "Aucun compte ne correspond aux filtres." } })}
      <p class="btns-prof"><button class="btn-sec" id="c-maj" type="button">Actualiser</button></p>
      <p class="muted">Le temps est mesuré depuis la mise à jour du site d'octobre 2026 pour les élèves des classes, et depuis celle de fin octobre 2026 pour les autres élèves et les professeurs. Un professeur créé avec outils/comptes n'apparaît qu'après sa première connexion suivant cette mise à jour. Les élèves ne voient pas ces durées.</p></section>`;
    document.getElementById("c-maj").addEventListener("click", pageComptes);
    brancherTableau(comptesChoix, afficherComptes);
  }

  /* ---------- Page professeur : fréquentation du site (compteurs anonymes, voir compte.js) ---------- */
  const freqChoix = { jours: 30, niveau: "" };
  let freqCache = null; // { depuis, data } : les données déjà lues servent aussi pour une période plus courte
  const jourISO = (d) => d.toLocaleDateString("fr-CA");
  async function pageFrequentation(recharger) {
    document.title = "Fréquentation · ProfMaths";
    const e = Compte.eleve();
    if (!e || !e.prof || e.externe) {
      $app.innerHTML = `<section class="page-compte"><p class="eyebrow">Fréquentation du site</p><h1>Page réservée au professeur</h1><p><a class="btn" href="#compte">Se connecter</a></p></section>`;
      return;
    }
    const debut = new Date(); debut.setDate(debut.getDate() - freqChoix.jours + 1);
    const depuis = jourISO(debut);
    if (recharger === true || !freqCache || freqCache.depuis > depuis) {
      $app.innerHTML = `<section class="page-suivi"><p class="eyebrow">Compte professeur</p><h1>Fréquentation du site</h1><p class="muted" id="freq-etat">Chargement…</p></section>`;
      try { freqCache = { depuis, data: await Compte.frequentation(depuis) }; }
      catch (x) { document.getElementById("freq-etat").textContent = "Lecture impossible. Vérifie la connexion internet puis recharge la page."; return; }
      if (location.hash !== "#frequentation") return;
    }
    afficherFrequentation(depuis);
  }
  function afficherFrequentation(depuis) {
    const d = (freqCache && freqCache.data) || { jours: [], chapitres: [] };
    const jours = d.jours.filter((x) => x.j >= depuis), lus = d.chapitres.filter((x) => x.j >= depuis);
    const somme = (l, f) => l.reduce((s, x) => s + (+x[f] || 0), 0);
    const nb = (n) => n.toLocaleString("fr-FR");
    const dateCourte = (j) => new Date(j + "T12:00").toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
    const dateLongue = (j) => new Date(j + "T12:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
    // Visites jour par jour (un jour sans visite compte 0)
    const parJour = {};
    jours.forEach((x) => { parJour[x.j] = x; });
    const serie = [], auj = jourISO(new Date());
    for (const t = new Date(depuis + "T12:00"); jourISO(t) <= auj; t.setDate(t.getDate() + 1)) serie.push({ j: jourISO(t), n: +(parJour[jourISO(t)] || {}).visites || 0 });
    const total = somme(jours, "visites"), tel = somme(jours, "tel"), pc = somme(jours, "pc"), jeu = somme(jours, "jeu");
    const max = Math.max(1, ...serie.map((s) => s.n)), record = serie.reduce((a, b) => (b.n > a.n ? b : a), serie[0]);
    const classes = {};
    jours.forEach((x) => Object.entries(x.classes || {}).forEach(([g, n]) => { classes[g] = (classes[g] || 0) + (+n || 0); }));
    const eleves = Object.values(classes).reduce((s, n) => s + n, 0);
    // Onglets ouverts, par chapitre puis par niveau
    const OC = ["cours", "exercices", "qcm", "defi", "methode"];
    const parChap = {};
    lus.forEach((x) => { const c = parChap[x.ch] || (parChap[x.ch] = { total: 0 }); OC.forEach((o) => { c[o] = (c[o] || 0) + (+x[o] || 0); c.total += +x[o] || 0; }); });
    const niveaux = CATALOGUE.niveaux.map((n) => ({ id: n.id, nom: n.nom, chaps: n.chapitres.filter((ch) => parChap[ch.id]).map((ch) => Object.assign({ id: ch.id, titre: ch.titre }, parChap[ch.id])) }))
      .map((n) => Object.assign(n, { total: n.chaps.reduce((s, c) => s + c.total, 0) }));
    const maxNiv = Math.max(1, ...niveaux.map((n) => n.total));
    if (!niveaux.some((n) => n.id === freqChoix.niveau)) freqChoix.niveau = "";
    const chapsVus = niveaux.filter((n) => !freqChoix.niveau || n.id === freqChoix.niveau).flatMap((n) => n.chaps).sort((a, b) => b.total - a.total);
    const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
    const tuile = (v, t) => `<div class="freq-tuile"><b>${v}</b><span>${t}</span></div>`;
    const vide = `<p class="muted">Aucune visite enregistrée sur cette période.</p>`;
    $app.innerHTML = `<section class="page-suivi page-freq"><p class="eyebrow">Compte professeur · <a href="#suivi">Suivi des élèves</a></p><h1>Fréquentation du site</h1>
      <div class="suivi-choix">
        <label>Période <select id="f-jours">${[[7, "7 derniers jours"], [30, "30 derniers jours"], [90, "90 derniers jours"], [365, "12 derniers mois"]].map(([v, t]) => `<option value="${v}"${v === freqChoix.jours ? " selected" : ""}>${t}</option>`).join("")}</select></label>
        <button class="btn-sec" id="f-maj" type="button">Actualiser</button>
      </div>
      <div class="freq-tuiles">${tuile(nb(total), "visites")}${tuile(nb(Math.round((total / serie.length) * 10) / 10), "par jour en moyenne")}${tuile(pct(tel, tel + pc) + " %", "sur téléphone ou tablette")}${tuile(nb(eleves), "connexions d'élèves")}</div>
      <h2>Visites par jour</h2>
      ${total ? `<div class="freq-barres" id="freq-barres" role="img" aria-label="Visites par jour : record ${record.n} le ${dateLongue(record.j)}">${serie.map((s) => `<span data-j="${s.j}" data-n="${s.n}" title="${dateCourte(s.j)} : ${s.n}"><i style="height:${(s.n / max) * 100}%"></i></span>`).join("")}</div>
      <div class="freq-axe"><span>${dateCourte(serie[0].j)}</span><span>${dateCourte(auj)}</span></div>
      <p class="muted" id="freq-info" aria-live="polite">Record : <strong>${record.n}</strong> visite${record.n > 1 ? "s" : ""} le ${dateLongue(record.j)}. Touche une barre pour voir son jour.</p>` : vide}
      <h2>Par niveau</h2>
      <p class="muted">Onglets de chapitre ouverts (cours, exercices, QCM, défi, méthode).${jeu ? ` Jeu Les Salles : ${nb(jeu)} visite${jeu > 1 ? "s" : ""}.` : ""}</p>
      ${niveaux.some((n) => n.total) ? `<ul class="freq-niv">${niveaux.map((n) => `<li data-niv="${esc(n.id)}"><span>${esc(n.nom)}</span><span class="piste"><i style="width:${(n.total / maxNiv) * 100}%"></i></span><b>${nb(n.total)}</b></li>`).join("")}</ul>` : vide}
      <h2>Par chapitre</h2>
      <div class="suivi-choix"><label>Niveau <select id="f-niv"><option value="">Tous les niveaux</option>${niveaux.map((n) => `<option value="${esc(n.id)}"${n.id === freqChoix.niveau ? " selected" : ""}>${esc(n.nom)}</option>`).join("")}</select></label></div>
      ${chapsVus.length ? `<div class="scroll-x"><table class="suivi freq-chap"><thead><tr><th>Chapitre</th><th>Cours</th><th>Exos</th><th>QCM</th><th>Défi</th><th>Méthode</th><th>Total</th></tr></thead><tbody>${chapsVus.map((c) => `<tr><th scope="row"><a href="#${esc(c.id)}">${esc(c.titre)}</a></th>${OC.map((o) => `<td>${c[o] ? nb(c[o]) : "·"}</td>`).join("")}<td><strong>${nb(c.total)}</strong></td></tr>`).join("")}</tbody></table></div>` : vide}
      <h2>Élèves connectés, par classe</h2>
      ${eleves ? `<ul class="freq-classes">${Object.entries(classes).sort((a, b) => b[1] - a[1]).map(([g, n]) => `<li><span>${esc(g)}</span><b>${nb(n)}</b></li>`).join("")}</ul>` : `<p class="muted">Aucun élève connecté sur cette période.</p>`}
      <p class="muted">Ces chiffres sont anonymes : aucun nom n'est enregistré, seulement des compteurs. Un appareil compte une fois par jour pour le site et une fois par jour pour chaque onglet de chapitre ; un élève connecté compte une fois par jour pour sa classe. Ordinateurs : ${nb(pc)} · téléphones et tablettes : ${nb(tel)}. Tes propres visites (compte professeur) ne sont pas comptées.</p></section>`;
    document.getElementById("f-jours").addEventListener("change", (ev) => { freqChoix.jours = +ev.target.value; pageFrequentation(); });
    document.getElementById("f-niv").addEventListener("change", (ev) => { freqChoix.niveau = ev.target.value; afficherFrequentation(depuis); });
    document.getElementById("f-maj").addEventListener("click", () => pageFrequentation(true));
    const barres = document.getElementById("freq-barres"), info = document.getElementById("freq-info");
    if (barres) ["click", "pointerover"].forEach((t) => barres.addEventListener(t, (ev) => {
      const b = ev.target.closest("[data-j]");
      if (!b) return;
      barres.querySelectorAll(".on").forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
      info.innerHTML = `${dateLongue(b.dataset.j).replace(/^./, (c) => c.toUpperCase())} : <strong>${b.dataset.n}</strong> visite${b.dataset.n > 1 ? "s" : ""}.`;
    }));
  }

  /* ---------- Page chapitre ---------- */
  function pageChapitre(id, onglet) {
    const c = CHAPITRES[id];
    document.title = `${c.titre} · ProfMaths`;
    if (!ONGLETS.some((o) => o.id === onglet)) onglet = "cours";
    const b = bilanChapitre(id);
    const nivChap = CATALOGUE.niveaux.find((n) => n.chapitres.some((ch) => ch.id === id));
    let h = `<a class="retour" href="#${nivChap ? "niveau-" + esc(nivChap.id) : ""}">← ${nivChap ? esc(nivChap.nom) : "Accueil"} : tous les chapitres</a>
      <header class="chap-head">${c.numero ? `<span class="chap-filigrane" aria-hidden="true" data-romain="${romain(c.numero)}">${c.numero}</span>` : ""}<p class="eyebrow">${esc(c.niveau)} · ${c.numero ? `Chapitre&nbsp;${c.numero}` : esc(c.periode || "Toute l'année")}</p><h1>${esc(c.titre)}</h1><p class="lead">${inline(c.accroche)}</p>
      <p class="score-chap">${etoiles(Math.round((b.got / b.total) * 5), 5)} <span>${b.got}/${b.total} étoiles d'exercices</span></p></header>
      <nav class="onglets" aria-label="Parties du chapitre">${ONGLETS.map((o) => `<a href="#${id}.${o.id}" ${o.id === onglet ? 'aria-current="page"' : ""}>${o.nom}</a>`).join("")}</nav>
      <div class="panneau" id="panneau"></div>`;
    $app.innerHTML = h;
    const p = document.getElementById("panneau");
    const h0 = location.hash;
    if (onglet === "cours" || onglet === "methode") {
      // Le cours s'affiche sans attendre les générateurs ; une figure qui en a besoin arrive dès qu'ils sont là
      ({ cours: vueCours, methode: vueMethode })[onglet](p, c, id);
      if (p.querySelector("[data-figure]")) assurerMoteur(id).then(() => { if (memePage(h0)) remplirFigures(p); }).catch(() => {});
      else prechargerMoteur(id);
      return;
    }
    const vue = () => ({ exercices: vueExercices, qcm: vueQCM, defi: vueDefi })[onglet](p, c, id);
    const vueEtFigures = () => { vue(); remplirFigures(p); };
    if (moteurPret(id)) return vueEtFigures();
    p.innerHTML = msgAttente("Chargement des exercices…");
    assurerMoteur(id).then(() => { if (memePage(h0)) vueEtFigures(); })
      .catch(() => { if (memePage(h0)) p.innerHTML = msgReseau("Les exercices n'ont pas pu se charger."); });
  }
  // Figures du cours réservées (data-figure) : dessinées quand les générateurs du niveau sont chargés
  function remplirFigures(p) {
    p.querySelectorAll("[data-figure]").forEach((f) => {
      const d = FIGURES[f.dataset.figure];
      if (d) { f.innerHTML = d(); f.classList.remove("fig-attente"); f.removeAttribute("data-figure"); } else f.remove();
    });
  }

  function vueCours(p, c, id) {
    let h = `<div class="ressources">`;
    c.pdfs.forEach((f) => { h += `<a class="pdf" href="${f.url}" target="_blank" rel="noopener"><span class="pdf-ico" aria-hidden="true">PDF</span><span>${esc(f.titre)}</span></a>`; });
    (c.liens || []).forEach((l) => { h += `<a class="pdf" href="${l.url}" target="_blank" rel="noopener"><span class="pdf-ico lien" aria-hidden="true">${l.type === "video" ? "▶" : "JEU"}</span><span>${esc(l.titre)}</span></a>`; });
    if (c.playlist) h += `<a class="pdf" href="${c.playlist}" target="_blank" rel="noopener"><span class="pdf-ico yt" aria-hidden="true">▶</span><span>Playlist du chapitre sur YouTube</span></a>`;
    h += `</div>`;
    c.cours.forEach((s, i) => {
      h += `<article class="notion"><h2><span class="n">${i + 1}</span><span class="t">${inline(s.titre)}</span></h2><div class="notion-texte">${md(s.texte)}${s.video ? `<div class="video-aide">${video(s.video)}<p class="muted">${esc(s.video.titre)}</p></div>` : ""}</div><aside class="notion-cote">${s.figure ? figure(s.figure) : ""}`;
      if (s.exemple) {
        h += `<div class="exemple"><p class="tag">Exemple</p>${md(s.exemple.enonce)}
          <details><summary>Voir la réponse</summary>${md(s.exemple.solution)}${s.exemple.tableau ? tableau(s.exemple.tableau) : ""}</details></div>`;
      }
      h += `</aside></article>`;
    });
    if (c.videos && c.videos.length) {
      h += `<section class="videos"><h2>Les ${c.videos.length} exercices corrigés en vidéo</h2><p class="muted">${esc(c.videosNote || "Énoncés et corrigés dans les PDF ci-dessus.")}</p><div class="video-grille">`;
      c.videos.forEach((v) => { h += `<div class="video-carte">${video(v)}<p><span class="tag">${esc(v.type)}</span> ${esc(v.titre)}</p></div>`; });
      h += `</div></section>`;
    }
    h += `<a class="suite" href="#${id}.exercices">Je m'entraîne avec les exercices →</a>`;
    p.innerHTML = h;
  }

  /* ---------- Exercices ---------- */
  function vueExercices(p, c, id) {
    let h = `<p class="intro">Chaque série tire de nouveaux nombres à chaque fois. Réponds sans indice pour gagner un maximum de points : <strong>10 points</strong> du premier coup, moins avec des indices.</p><ol class="series">`;
    let etape = "";
    c.exercices.forEach((e, i) => {
      const st = prog.exo[id + ":" + e.type] || 0;
      if (e.etape !== etape) { etape = e.etape; h += `<li class="etape">${inline(etape)}</li>`; }
      h += `<li><button class="serie${st >= 3 ? " serie-faite" : ""}" data-i="${i}"><span class="chap-t"><strong>${inline(e.titre)}</strong><span class="meta">${e.nb} questions</span></span>${etoiles(st, 3)}</button></li>`;
    });
    h += `</ol>`;
    p.innerHTML = h;
    p.querySelectorAll(".serie").forEach((b) => b.addEventListener("click", () => lancerSerie(p, c, id, c.exercices[+b.dataset.i])));
  }

  function normaliser(s) {
    return String(s).trim().toLowerCase().replace(/[−–—]/g, "-").replace(/,/g, ".").replace(/\s+/g, "").replace(/[%€°]$/, "").replace(/^\+/, "").replace(/^[{(\[]|[})\]]$/g, "");
  }
  function lireNombre(s) {
    s = normaliser(s);
    if (/^-?\d+(\.\d+)?$/.test(s)) return parseFloat(s);
    const m = s.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
    if (m && +m[2] !== 0) return +m[1] / +m[2];
    return NaN;
  }
  function lireEnsemble(s) {
    const n = normaliser(s);
    if (["aucun", "aucune", "rien", "∅", "", "vide"].includes(n)) return n === "" ? null : [];
    const parts = n.split(/;|et/).filter(Boolean).map(lireNombre);
    return parts.some(isNaN) ? null : parts.sort((a, b) => a - b);
  }

  /* Zone de réponse : boutons de choix, ou champ avec touches de symboles */
  function champReponse(q) {
    return q.mode === "choix"
      ? `<div class="choix">${q.choix.map((ch, k) => `<button class="opt" data-k="${k}"><span>${inline(ch)}</span></button>`).join("")}</div>`
      : `<form class="saisie" autocomplete="off"><label for="rep">${etiquette(q.prefixe)}</label><span class="champ"><input id="rep" inputmode="text" enterkeyhint="done" placeholder="${q.mode === "ensemble" ? "ex. −1 ; 3  ou  aucun" : "ta réponse"}">${q.suffixe ? `<span class="suffixe">${inline(q.suffixe)}</span>` : ""}</span>
         <div class="touches" aria-label="Symboles">${["−", ";", "/", ","].map((t) => `<button type="button" class="touche" data-t="${t}">${t}</button>`).join("")}</div>
         <button class="btn" type="submit">Vérifier</button></form>`;
  }
  function brancherTouches(p, inp) {
    p.querySelectorAll(".touche").forEach((t) => t.addEventListener("click", () => {
      const s = inp.selectionStart ?? inp.value.length;
      const ins = t.dataset.t === ";" ? " ; " : t.dataset.t;
      inp.value = inp.value.slice(0, s) + ins + inp.value.slice(inp.selectionEnd ?? s);
      inp.focus(); inp.setSelectionRange(s + ins.length, s + ins.length);
    }));
  }

  /* Pas deux fois la même question dans une série : on retire jusqu'à trouver une question nouvelle.
     On évite aussi, autant que possible, les questions de la série précédente du même type. */
  const RECENTS = {};
  const cleQuestion = (q) => [q.enonce, JSON.stringify(q.tableau || ""), q.figure || "", (q.choix || []).slice().sort().join("¦"), q.mode === "choix" ? q.choix[q.attendu] : JSON.stringify(q.attendu)].join("§");
  function tirerSansDoublon(tirer, vus, recents) {
    let q, k;
    for (let t = 0; t < 60; t++) {
      q = tirer(); k = cleQuestion(q);
      if (!vus.has(k) && (t >= 30 || !recents || !recents.has(k))) break;
    }
    vus.add(k);
    return q;
  }

  function lancerSerie(p, c, id, ex) {
    const gen = GEN[ex.type];
    activiteEnCours = true;
    let i = 0, score = 0;
    const max = ex.nb * 10;
    const vus = new Set(), recents = new Set(RECENTS[ex.type] || []);

    function question() {
      const q = tirerSansDoublon(() => gen(i), vus, recents);
      if (i + 1 === ex.nb) RECENTS[ex.type] = [...vus];
      let aides = 0, erreurs = 0, fini = false;
      const champ = champReponse(q);
      p.innerHTML = `<div class="exo">
        <div class="exo-top"><button class="lien" id="quitter">← Séries</button><span class="progression">Question ${i + 1}/${ex.nb}</span><span class="pts">${score} pts</span></div>
        <div class="pastilles">${Array.from({ length: ex.nb }, (_, k) => `<span class="${k < i ? "ok" : k === i ? "cur" : ""}"></span>`).join("")}</div>
        <h2>${inline(ex.titre)}</h2>
        <div class="enonce">${md(q.enonce)}</div>
        ${q.tableau ? tableau(q.tableau) : ""}
        ${q.figure ? `<figure class="fig" id="fig">${q.figure}</figure>` : ""}
        ${champ}
        <div class="aides" id="aides"></div>
        <div class="retour-rep" id="fb" role="status" aria-live="polite"></div>
        <div class="exo-actions"><button class="btn-sec" id="aide">Un indice (${q.aides.length} dispo)</button><button class="btn-sec" id="voir" hidden>Voir la solution</button><button class="btn" id="suivant" hidden>${i + 1 < ex.nb ? "Question suivante →" : "Voir mon bilan →"}</button></div>
      </div>`;
      const fb = p.querySelector("#fb"), $aides = p.querySelector("#aides");
      const bAide = p.querySelector("#aide"), bVoir = p.querySelector("#voir"), bSuiv = p.querySelector("#suivant");
      p.querySelector("#quitter").addEventListener("click", () => { activiteEnCours = false; vueExercices(p, c, id); });

      function terminer(gagne, montrer) {
        fini = true;
        const pts = gagne ? Math.max(2, 10 - 3 * aides - 2 * erreurs) : 0;
        score += pts;
        p.querySelector(".pts").textContent = `${score} pts`;
        fb.className = "retour-rep " + (gagne ? "bon" : "info");
        fb.innerHTML = gagne
          ? `<strong>Bravo !</strong> +${pts} points.${aides === 0 && erreurs === 0 ? " Du premier coup !" : ""}`
          : `<strong>Voici la solution.</strong> Lis-la bien, la prochaine sera pour toi.`;
        if (montrer || !gagne) {
          fb.innerHTML += `<div class="solution">${md(q.solution)}</div>`;
          // Figure de la solution : à la place de celle de l'énoncé, ou sous la solution quand l'énoncé n'en a pas
          if (q.figureSolution) { const f = p.querySelector("#fig"); if (f) f.innerHTML = q.figureSolution; else fb.insertAdjacentHTML("beforeend", `<figure class="fig">${q.figureSolution}</figure>`); }
        } else {
          fb.innerHTML += `<details><summary>Voir la rédaction</summary><div class="solution">${md(q.solution)}</div></details>`;
        }
        p.querySelectorAll("input, .opt, .touche, .saisie .btn").forEach((el) => (el.disabled = true));
        bAide.hidden = true; bVoir.hidden = true; bSuiv.hidden = false; bSuiv.focus();
      }
      function rate(msg) {
        erreurs++;
        fb.className = "retour-rep faux";
        fb.innerHTML = msg || `<strong>Pas encore.</strong> ${aides < q.aides.length ? "Essaie avec un indice." : "Relis les indices ou regarde la solution."}`;
        if (erreurs >= 2) bVoir.hidden = false;
      }
      function verifier(val) {
        if (fini) return;
        if (q.mode === "choix") {
          if (val === q.attendu) terminer(true);
          else if (q.choix.length === 2) {
            // deux choix (vrai/faux, oui/non) : pas de seconde chance, sinon le hasard rapporterait des points
            erreurs++; p.querySelector(`.opt[data-k="${val}"]`).classList.add("barre-opt");
            terminer(false, true);
            fb.innerHTML = `<strong>Ce n'est pas ça.</strong> Avec deux réponses possibles, il n'y a pas de deuxième essai : lis bien la solution.` + fb.innerHTML.replace(/^<strong>Voici la solution\.<\/strong>[^<]*/, "");
          }
          else { rate(); p.querySelector(`.opt[data-k="${val}"]`).classList.add("barre-opt"); p.querySelector(`.opt[data-k="${val}"]`).disabled = true; }
        } else if (q.mode === "nombre") {
          const v = lireNombre(val);
          if (isNaN(v)) { fb.className = "retour-rep info"; fb.textContent = "Écris un nombre, par exemple −3 ou 2,5."; return; }
          const tol = q.tolerance || 1e-9;
          const connue = (q.erreurs || []).find((e) => Math.abs(v - e.valeur) < Math.max(tol, 1e-9) && Math.abs(v - q.attendu) >= tol);
          if (Math.abs(v - q.attendu) < tol) terminer(true);
          else rate(connue ? `<strong>Pas encore.</strong> ${inline(connue.message)}` : undefined);
        } else {
          const v = lireEnsemble(val);
          if (v === null) { fb.className = "retour-rep info"; fb.textContent = "Écris les nombres séparés par « ; », ou « aucun »."; return; }
          const a = q.attendu.slice().sort((x, y) => x - y);
          if (v.length === a.length && v.every((x, k) => Math.abs(x - a[k]) < 1e-9)) terminer(true);
          else if (v.length < a.length && v.every((x) => a.includes(x))) rate(`<strong>C'est juste, mais il en manque.</strong> Il en manque au moins une.`);
          else rate();
        }
      }
      if (q.mode === "choix") p.querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => verifier(+b.dataset.k)));
      else {
        const inp = p.querySelector("#rep");
        p.querySelector(".saisie").addEventListener("submit", (e) => { e.preventDefault(); verifier(inp.value); });
        brancherTouches(p, inp);
      }
      bAide.addEventListener("click", () => {
        if (aides >= q.aides.length) return;
        $aides.insertAdjacentHTML("beforeend", `<div class="aide"><span class="tag">Indice ${aides + 1}</span>${md(q.aides[aides])}</div>`);
        aides++;
        bAide.textContent = aides < q.aides.length ? `Un autre indice (${q.aides.length - aides})` : "Plus d'indice";
        bAide.disabled = aides >= q.aides.length;
        if (aides >= q.aides.length) bVoir.hidden = false;
      });
      bVoir.addEventListener("click", () => terminer(false, true));
      bSuiv.addEventListener("click", () => { i++; if (i < ex.nb) question(); else bilan(); });
    }

    function bilan() {
      activiteEnCours = false;
      const r = score / max;
      const st = r >= 0.9 ? 3 : r >= 0.7 ? 2 : r >= 0.4 ? 1 : 0;
      const k = id + ":" + ex.type;
      const premiere = !(k in prog.exo), avant = prog.exo[k] || 0;
      const record = st > avant;
      // Les XP de la série sont comptés ici, à la fin : rejouer sans progresser rapporte beaucoup moins
      const coef = coefRejeu(premiere, record, avant >= 3);
      prog.exo[k] = Math.max(avant, st);
      prog.quand = Object.assign({}, prog.quand, { [k]: Date.now() }); // suivi des devoirs par le professeur
      const xpSerie = gagnerXP(score * (XP.question / 10) * coef);
      save();
      const noteCoef = coef < 1 ? `Série ${texteCoef(coef, true)}.` : "";
      const msg = st === 3 ? "Série maîtrisée. Tu peux passer à la suivante." : st === 2 ? "Très bien ! Encore un essai pour la troisième étoile ?" : st === 1 ? "C'est un bon début. Relis la fiche méthode puis recommence." : "Pas de panique : regarde la vidéo et le cours, puis réessaie.";
      p.innerHTML = `<div class="bilan"><p class="eyebrow">Bilan · ${inline(ex.titre)}</p><p class="gros">${score}<span>/${max} pts</span></p>${etoiles(st, 3)}${record ? `<p class="record">Nouveau record !</p>` : ""}<p>${msg}</p><p class="gain-xp">+${xpSerie} XP${noteCoef ? ` · <span>${noteCoef}</span>` : ""}</p>
        <div class="exo-actions"><button class="btn" id="encore">Recommencer</button><button class="btn-sec" id="retour">Autres séries</button></div></div>`;
      p.querySelector("#encore").addEventListener("click", () => lancerSerie(p, c, id, ex));
      p.querySelector("#retour").addEventListener("click", () => vueExercices(p, c, id));
    }
    question();
  }

  /* ---------- QCM ---------- */
  /* Un QCM = 12 questions : la plupart tirées de la banque du chapitre (en évitant celles de l'essai précédent),
     plus 3 questions à choix fabriquées par les générateurs d'exercices du chapitre. */
  const QCM_N = 12, QCM_GEN = 3, QCM_RECENTS = {};
  const tailleQcm = (c) => Math.min(QCM_N, c.qcm.length + (c.exercices.length ? QCM_GEN : 0));
  const tailleQcmId = (id) => Math.min(QCM_N, nbQcmBanque(id) + (nbSeries(id) ? QCM_GEN : 0));
  // Écriture KaTeX d'un nombre à la française (espaces fines, virgule), ou fraction si ce n'est pas un décimal court
  function nombreTex(x, enFraction) {
    if (!isFinite(x)) return null;
    const a = Math.abs(x);
    let s;
    if (Number.isInteger(+a.toFixed(9)) || (!enFraction && Math.abs(a * 1e6 - Math.round(a * 1e6)) < 1e-6 * Math.max(1, a))) {
      const p = String(+a.toFixed(6)).split(".");
      s = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") + (p[1] ? "{,}" + p[1] : "");
    } else {
      let f = null;
      for (let d = 2; d <= 1000 && !f; d++) { const m = Math.round(a * d); if (Math.abs(m / d - a) < 1e-9) f = [m, d]; }
      if (!f) return null;
      s = `\\dfrac{${f[0]}}{${f[1]}}`;
    }
    return (x < 0 ? "-" : "") + s;
  }
  // Une question à saisie devient une question à choix si le générateur prévoit au moins deux erreurs typiques
  // (réponses exactes seulement : pas de conversion quand la réponse est un arrondi accepté avec une tolérance)
  function versChoix(q) {
    if (q.mode !== "nombre" || !isFinite(q.attendu) || (q.tolerance || 0) >= 1e-6) return null;
    const vals = [];
    // les « valeurs approchées » d'une fraction (message valeur exacte) ne sont pas des leurres honnêtes
    (q.erreurs || []).forEach((e) => { const v = +e.valeur; if (isFinite(v) && Math.abs(v - q.attendu) > 1e-9 && !/valeur approchée|valeur exacte/i.test(e.message || "") && !vals.some((w) => Math.abs(w - v) < 1e-9)) vals.push(v); });
    if (vals.length < 2) return null;
    const suf = q.suffixe ? " " + q.suffixe : "";
    const enFraction = Math.abs(q.attendu * 1e6 - Math.round(q.attendu * 1e6)) >= 1e-6 * Math.max(1, Math.abs(q.attendu)); // réponse non décimale : tous les choix en fractions
    const choix = [q.attendu, ...vals.slice(0, 3)].map((v) => { const t = nombreTex(v, enFraction); return t === null ? null : `$${t}$${suf}`; });
    if (choix.includes(null) || new Set(choix).size !== choix.length) return null;
    return { choix, attendu: 0 };
  }
  function questionsGenerees(c, n) {
    const types = shuffle(c.exercices.map((e) => e.type).filter((t) => GEN[t])), out = [], vus = new Set();
    const ajouter = (t, q, choix, bonne) => { vus.add(cleQuestion(q)); out.push({ type: t, gen: true, question: q.enonce, choix, bonne, explication: q.solution, svg: q.figure, tableau: q.tableau }); };
    // 1) une question à choix par série ; 2) puis, pour les séries pas encore utilisées, une question à saisie
    //    transformée en choix ; 3) seulement s'il en manque encore, une deuxième question d'une même série
    for (const passe of [1, 2, 3]) {
      for (let essai = 0; out.length < n && essai < 40 && types.length; essai++) {
        const t = types[essai % types.length];
        if (out.filter((x) => x.type === t).length >= (passe === 3 ? 2 : 1)) continue;
        let q;
        try { q = GEN[t](Math.floor(Math.random() * 5)); } catch (e) { continue; }
        if (vus.has(cleQuestion(q))) continue;
        if (q.mode === "choix") { if (passe !== 2) ajouter(t, q, q.choix, q.attendu); }
        else if (passe > 1) { const v = versChoix(q); if (v) ajouter(t, q, v.choix, v.attendu); }
      }
    }
    return out;
  }
  function vueQCM(p, c, id) {
    activiteEnCours = true; // un QCM en cours n'est pas effacé quand le compte se connecte
    const gen = questionsGenerees(c, QCM_GEN);
    const deja = new Set(QCM_RECENTS[id] || []);
    const banque = shuffle(c.qcm).sort((a, b) => deja.has(a.question) - deja.has(b.question)).slice(0, Math.max(0, QCM_N - gen.length));
    QCM_RECENTS[id] = banque.map((q) => q.question);
    const qs = shuffle(banque.concat(gen)).map((q) => {
      const ordre = shuffle(q.choix.map((_, k) => k));
      return Object.assign({}, q, { ordre });
    });
    let h = `<p class="intro">${qs.length} questions, une seule bonne réponse à chaque fois. Les questions changent à chaque essai.${prog.qcm[id] !== undefined ? ` Ton meilleur score : <strong>${Math.min(prog.qcm[id], qs.length)}/${qs.length}</strong>.` : ""}</p><form id="qcm">`;
    qs.forEach((q, n) => {
      h += `<fieldset class="q" data-n="${n}"><legend><span class="n">${n + 1}</span>${q.gen ? "" : inline(q.question)}</legend>${q.gen ? `<div class="q-enonce">${md(q.question)}</div>` : ""}${q.figure ? figure(q.figure) : ""}${q.svg ? `<figure class="fig">${q.svg}</figure>` : ""}${q.tableau ? tableau(q.tableau) : ""}
        <div class="choix">${q.ordre.map((k) => `<label class="opt"><input type="radio" name="q${n}" value="${k}" id="q${n}c${k}"><span>${inline(q.choix[k])}</span></label>`).join("")}</div>
        <div class="expl" hidden></div></fieldset>`;
    });
    h += `<div class="qcm-fin"><button class="btn" type="submit">Corriger mon QCM</button><p class="muted" id="reste"></p></div></form>`;
    p.innerHTML = h;
    const form = p.querySelector("#qcm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (form.dataset.corrige) { vueQCM(p, c, id); window.scrollTo(0, p.offsetTop - 60); return; }
      const vides = qs.filter((_, n) => !form.querySelector(`input[name="q${n}"]:checked`)).length;
      if (vides && !form.dataset.averti) {
        form.dataset.averti = "1";
        p.querySelector("#reste").textContent = `Il reste ${vides} question${vides > 1 ? "s" : ""} sans réponse. Appuie encore pour corriger quand même.`;
        return;
      }
      let bon = 0;
      qs.forEach((q, n) => {
        const fs = form.querySelector(`[data-n="${n}"]`);
        const choisi = form.querySelector(`input[name="q${n}"]:checked`);
        const ok = choisi && +choisi.value === q.bonne;
        if (ok) bon++;
        fs.classList.add(ok ? "q-bon" : "q-faux");
        fs.querySelectorAll("input").forEach((inp) => { inp.disabled = true; if (+inp.value === q.bonne) inp.closest(".opt").classList.add("opt-bonne"); });
        const ex = fs.querySelector(".expl");
        ex.hidden = false;
        ex.innerHTML = `<strong>${ok ? "Juste." : choisi ? "Faux." : "Sans réponse."}</strong> ${md(q.explication)}`;
      });
      // QCM déjà bien réussi : il rapporte beaucoup moins d'XP
      const avant = prog.qcm[id] === undefined ? undefined : Math.min(prog.qcm[id], qs.length), tot = qs.length;
      const record = avant === undefined || bon > avant;
      const coef = coefRejeu(avant === undefined, bon > avant, avant >= tot);
      prog.qcm[id] = Math.max(avant || 0, bon);
      prog.quand = Object.assign({}, prog.quand, { ["qcm:" + id]: Date.now() });
      const gain = gagnerXP(bon * XP.bonneReponseQcm * coef);
      save();
      form.dataset.corrige = "1";
      const fin = p.querySelector(".qcm-fin");
      fin.innerHTML = `<div class="bilan"><p class="eyebrow">Ton score</p><p class="gros">${bon}<span>/${qs.length}</span></p>${record && bon ? `<p class="record">Nouveau record !</p>` : ""}<p>+${gain} XP${coef < 1 ? ` (QCM ${texteCoef(coef)})` : ""}. ${bon >= 8 ? "Excellent, le chapitre est bien compris." : bon >= 5 ? "Bien. Relis les explications des questions ratées." : "Revois le cours et la fiche méthode, puis retente ta chance."}</p><button class="btn" type="submit">Nouveau QCM</button></div>`;
      fin.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* ---------- Fiche méthode ---------- */
  function vueMethode(p, c) {
    let h = `<div class="methodes">`;
    c.methode.forEach((m) => {
      h += `<article class="methode"><h2>${inline(m.titre)}</h2><ol>${m.etapes.map((e) => `<li>${inline(e)}</li>`).join("")}</ol>${m.figure ? figure(m.figure) : ""}${m.exemple ? `<p class="ex">${inline(m.exemple)}</p>` : ""}</article>`;
    });
    h += `</div><section class="erreurs"><h2>Les erreurs fréquentes</h2><ul>${c.erreurs.map((e) => `<li>${inline(e)}</li>`).join("")}</ul></section>`;
    p.innerHTML = h;
  }

  /* ---------- Défi chrono ---------- */
  const nombreFr = (x) => String(+(+x).toFixed(6)).replace("-", "−").replace(".", ",");
  function bonneReponse(q) {
    if (q.mode === "choix") return inline(q.choix[q.attendu]);
    const v = q.mode === "ensemble" ? (q.attendu.length ? q.attendu.map(nombreFr).join(" ; ") : "aucun") : nombreFr(q.attendu);
    return `<strong>${v}</strong>${q.suffixe ? " " + inline(q.suffixe) : ""}`;
  }
  // Renvoie true (juste), false (faux) ou null (réponse illisible : pas de pénalité)
  function juger(q, val) {
    if (q.mode === "choix") return val === q.attendu;
    if (q.mode === "nombre") {
      const v = lireNombre(val);
      return isNaN(v) ? null : Math.abs(v - q.attendu) < (q.tolerance || 1e-9);
    }
    const v = lireEnsemble(val);
    if (v === null) return null;
    const a = q.attendu.slice().sort((x, y) => x - y);
    return v.length === a.length && v.every((x, k) => Math.abs(x - a[k]) < 1e-9);
  }

  const themeChapitre = (J, id, titre) => ({ id, titre, series: CHAPITRES[id].exercices.map((e) => e.type).filter((t) => GEN[t] && !(J.exclure || []).includes(t)) });

  /* Onglet « Défi chrono » d'un chapitre */
  function vueDefi(p, c, id) {
    const J = JEUX.chrono, t = themeChapitre(J, id, c.titre), rec = prog.jeux["chrono:" + id];
    p.innerHTML = `<div class="defi-chap"><p class="intro">${inline(J.accroche)}</p>
      <ul class="regles"><li><b>⏱</b> ${J.duree} secondes</li><li><b class="coeur">♥</b> ${J.vies} vies</li><li><b>×3</b> bonus de série</li></ul>
      <p class="defi-rec">${rec ? `Ton record sur ce chapitre : <strong>${rec} pts</strong>` : "Tu n'as pas encore joué sur ce chapitre."}</p>
      <button class="btn" id="go">Lancer le défi</button></div>
      <section class="classement"><h2 class="jeu-choix-t">Classement général</h2>
        <div class="filtres" role="group" aria-label="Classement">${[""].concat(Compte.classes).map((cl) => `<button class="filtre" data-c="${esc(cl)}" aria-pressed="${cl === filtreClassement}">${cl ? esc(classeCourte(cl)) : "Tous"}</button>`).join("")}</div>
        <ol class="top" id="top"></ol>
        <p class="muted">Les points de classement sont la somme des records sur les défis de tous les chapitres${Compte.eleve() ? ` (toi : <strong>${Compte.pointsJeux(prog.jeux)} pts</strong>)` : ""}. Seul le top 10 s'affiche.</p></section>`;
    p.querySelectorAll(".filtre").forEach((b) => b.addEventListener("click", () => {
      filtreClassement = b.dataset.c;
      p.querySelectorAll(".filtre").forEach((x) => x.setAttribute("aria-pressed", x === b));
      afficherClassement();
    }));
    afficherClassement();
    p.querySelector("#go").addEventListener("click", () => lancerChrono(J, t, { cible: p, retour: () => vueDefi(p, c, id), retourTexte: "Défi", libelle: c.titre }));
  }

  let filtreClassement = "";
  // Nom court d'une classe dans le classement : les deux Terminales doivent rester distinctes
  const COURTES = { "Terminale spécialité": "Tle spé", "Terminale maths complémentaires": "Tle compl." };
  const classeCourte = (cl) => COURTES[cl] || cl.split(" ")[0];
  function afficherClassement() {
    const $top = document.getElementById("top");
    if (!$top) return;
    const demande = filtreClassement;
    $top.innerHTML = `<li class="top-vide">Chargement…</li>`;
    Compte.classement(demande).then((l) => {
      if (demande !== filtreClassement || !$top.isConnected) return;
      if (l === null) { $top.innerHTML = `<li class="top-vide"><a href="#compte">Connecte-toi</a> pour voir le classement et y apparaître.</li>`; return; }
      if (l.reserve) { $top.innerHTML = `<li class="top-vide">Le classement est réservé aux classes de M. Cadena. Tes records restent dans ton compte.</li>`; return; }
      if (!l.length) { $top.innerHTML = `<li class="top-vide">Personne pour l'instant. Lance un défi pour être le premier !</li>`; return; }
      $top.innerHTML = l.map((x, k) => `<li class="${x.moi ? "moi" : ""}"><span class="rang">${["🥇", "🥈", "🥉"][k] || k + 1}</span><span class="top-nom"><strong>${esc(x.prenom)}</strong>${!demande && x.classe ? `<span class="meta">${esc(classeCourte(x.classe))}</span>` : ""}</span><span class="top-pts">${x.points} pts</span></li>`).join("");
    }).catch(() => {
      if ($top.isConnected) $top.innerHTML = `<li class="top-vide">Classement indisponible pour le moment.</li>`;
    });
  }

  // o = { cible: élément où jouer, retour: fonction du bouton retour, libelle: texte du bilan }
  function lancerChrono(J, theme, o) {
    const $c = o.cible;
    // Défi : pas de question déjà posée parmi les 20 dernières
    const derniers = [], vusDefi = new Set();
    const gen = () => {
      const q = tirerSansDoublon(() => GEN[theme.series[Math.floor(Math.random() * theme.series.length)]](Math.floor(Math.random() * 5)), vusDefi);
      derniers.push(cleQuestion(q));
      if (derniers.length > 20) vusDefi.delete(derniers.shift());
      return q;
    };
    let vies = J.vies, score = 0, serie = 0, bonnes = 0, n = 0;
    activiteEnCours = true;
    let reste = J.duree * 1000, depart = 0, enPause = true, fini = false;
    $c.innerHTML = `<div class="jeu">
      <div class="jeu-haut"><button class="lien" id="quitter">← ${esc(o.retourTexte || "Thèmes")}</button><span class="vies" aria-label="Vies"></span><span class="jeu-score"><b id="score">0</b> pts</span></div>
      <div class="chrono" aria-hidden="true"><span id="barre"></span></div>
      <div class="jeu-info"><span id="temps"></span><span id="multi"></span></div>
      <div id="zone"></div></div>`;
    if ($c !== $app) window.scrollTo(0, Math.max(0, $c.getBoundingClientRect().top + window.scrollY - 110));
    const $zone = $c.querySelector("#zone"), $barre = $c.querySelector("#barre"), $temps = $c.querySelector("#temps");
    $c.querySelector("#quitter").addEventListener("click", () => { clearInterval(minuterieJeu); minuterieJeu = null; activiteEnCours = false; o.retour(); });
    const multi = () => (serie >= 6 ? 3 : serie >= 3 ? 2 : 1);
    function majHaut() {
      $c.querySelector(".vies").innerHTML = "♥".repeat(vies) + `<span class="off">${"♥".repeat(J.vies - vies)}</span>`;
      $c.querySelector("#score").textContent = score;
      $c.querySelector("#multi").innerHTML = multi() > 1 ? `<b class="combo">Série ×${multi()}</b>` : serie ? `Série : ${serie}` : "";
    }
    function temps() { return Math.max(0, enPause ? reste : reste - (performance.now() - depart)); }
    function tic() {
      const t = temps();
      $barre.style.width = (t / (J.duree * 1000)) * 100 + "%";
      $barre.classList.toggle("urgent", t < 10000);
      $temps.textContent = `${Math.ceil(t / 1000)} s`;
      if (t <= 0 && !fini) fin("Temps écoulé !");
    }
    const pause = () => { if (!enPause) { reste = temps(); enPause = true; } };
    const reprendre = () => { if (enPause) { depart = performance.now(); enPause = false; } };

    function question() {
      const q = gen(); n++;
      let repondu = false;
      $zone.innerHTML = `<div class="enonce">${md(q.enonce)}</div>${q.tableau ? tableau(q.tableau) : ""}${q.figure ? `<figure class="fig">${q.figure}</figure>` : ""}${champReponse(q)}<div class="retour-rep" id="fb" role="status" aria-live="polite"></div>`;
      const fb = $zone.querySelector("#fb");
      function repondre(val) {
        if (repondu || fini) return;
        const ok = juger(q, val);
        if (ok === null) { fb.className = "retour-rep info"; fb.textContent = q.mode === "ensemble" ? "Écris les nombres séparés par « ; », ou « aucun »." : "Écris un nombre, par exemple −3 ou 2,5."; return; }
        repondu = true;
        $zone.querySelectorAll("input, .opt, .touche, .saisie .btn").forEach((el) => (el.disabled = true));
        if (ok) {
          serie++; bonnes++;
          const gain = 10 * multi();
          score += gain; majHaut();
          fb.className = "retour-rep bon"; fb.innerHTML = `<strong>Juste !</strong> +${gain}`;
          if (q.mode === "choix") $zone.querySelector(`.opt[data-k="${val}"]`).classList.add("opt-bonne");
          setTimeout(() => { if (!fini) question(); }, 450);
        } else {
          serie = 0; vies--; majHaut();
          pause();
          if (q.mode === "choix") { $zone.querySelector(`.opt[data-k="${val}"]`).classList.add("barre-opt"); $zone.querySelector(`.opt[data-k="${q.attendu}"]`).classList.add("opt-bonne"); }
          fb.className = "retour-rep faux";
          fb.innerHTML = `<strong>Raté${vies ? `, il te reste ${vies} vie${vies > 1 ? "s" : ""}` : ""}.</strong> Bonne réponse : ${bonneReponse(q)}<details><summary>Voir la solution</summary><div class="solution">${md(q.solution)}</div></details><p class="muted">Le chrono est en pause.</p><button class="btn" id="continuer">${vies ? "Continuer →" : "Voir mon score →"}</button>`;
          const b = fb.querySelector("#continuer");
          b.focus();
          b.addEventListener("click", () => { if (!vies) fin("Plus de vies !"); else { reprendre(); question(); } });
        }
      }
      if (q.mode === "choix") $zone.querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => repondre(+b.dataset.k)));
      else {
        const inp = $zone.querySelector("#rep");
        $zone.querySelector(".saisie").addEventListener("submit", (e) => { e.preventDefault(); repondre(inp.value); });
        brancherTouches($zone, inp);
        inp.focus({ preventScroll: true });
      }
    }

    function fin(raison) {
      fini = true; pause();
      clearInterval(minuterieJeu); minuterieJeu = null; activiteEnCours = false;
      const k = "chrono:" + theme.id;
      const ancien = prog.jeux[k] || 0;
      const record = score > ancien;
      const deja = partieDuJour();
      const coef = record || deja < XP.defisPleinTarif ? 1 : XP.defiApres;
      prog.jeux[k] = Math.max(ancien, score);
      const gain = gagnerXP(bonnes * XP.bonneReponseDefi * coef);
      save();
      $c.innerHTML = `<div class="bilan"><p class="eyebrow">${esc(J.titre)} · ${esc(o.libelle)}</p><p>${esc(raison)}</p><p class="gros">${score}<span> pts</span></p>${record && score ? `<p class="record">Nouveau record !</p>` : ancien ? `<p class="muted">Ton record : ${ancien} pts</p>` : ""}
        <p>${bonnes} bonne${bonnes > 1 ? "s" : ""} réponse${bonnes > 1 ? "s" : ""} sur ${n}. +${gain} XP${coef < 1 ? ` (déjà ${XP.defisPleinTarif} défis aujourd'hui sans nouveau record : ${divise(coef)} jusqu'à demain)` : ""}.</p>
        <div class="exo-actions"><button class="btn" id="rejouer">Rejouer</button><button class="btn-sec" id="themes">${esc(o.retourTexte || "Changer de thème")}</button></div></div>`;
      $c.querySelector("#rejouer").addEventListener("click", () => lancerChrono(J, theme, o));
      $c.querySelector("#themes").addEventListener("click", o.retour);
    }

    majHaut();
    // Compte à rebours avant le départ
    let compte = 3;
    $zone.innerHTML = `<p class="decompte">${compte}</p>`;
    const $dec = $zone.firstChild;
    const dec = setInterval(() => {
      if (!$dec.isConnected) return clearInterval(dec);
      compte--;
      if (compte > 0) { $dec.textContent = compte; return; }
      clearInterval(dec);
      reprendre(); question(); tic();
      minuterieJeu = setInterval(tic, 250);
    }, 700);
    tic();
  }

  route();

  /* ---------- Hors ligne et cache (sw.js) : les fichiers déjà téléchargés sont servis sans réseau ---------- */
  if ("serviceWorker" in navigator && (location.protocol === "https:" || /^(localhost|127.0.0.1)$/.test(location.hostname))) {
    window.addEventListener("load", () => { navigator.serviceWorker.register("sw.js" + (VERSION ? "?v=" + VERSION : "")).catch(() => {}); });
  }
})();
