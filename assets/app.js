/*
  Moteur du site : navigation, affichage des chapitres, exercices, QCM et progression.
  Le contenu se trouve dans data/ ; ce fichier n'a normalement pas besoin d'être modifié.
*/
(function () {
  "use strict";
  const { GEN, FIGURES, shuffle } = window.PM_EXO;
  const $app = document.getElementById("app");
  const $xp = document.getElementById("xp");

  /* ---------- Progression (gardée dans le navigateur de l'élève) ---------- */
  const CLE = "profmaths:v1";
  let prog = { xp: 0, exo: {}, qcm: {}, jeux: {} };
  try { prog = Object.assign(prog, JSON.parse(localStorage.getItem(CLE) || "{}")); } catch (e) {}
  const Compte = window.PM_COMPTE;
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
  function annoncerNiveau(avant, apres) {
    const nouveautes = [];
    for (let n = avant + 1; n <= apres; n++) nouveautes.push(...AV.recompenses(n));
    const rangChange = AV.rang(apres) !== AV.rang(avant);
    document.querySelectorAll(".toast-niv").forEach((t) => t.remove());
    const t = document.createElement("div");
    t.className = "toast-niv";
    t.setAttribute("role", "status");
    t.innerHTML = `<span class="toast-av">${AV.dessin(monAvatar(apres), 48)}</span><span class="toast-t"><strong>Niveau ${apres} !</strong>${rangChange ? `<span>Nouveau rang : <b>${esc(AV.rang(apres))}</b></span>` : ""}${nouveautes.length ? `<span>Débloqué : ${nouveautes.map((r) => esc(r.nom)).join(", ")}</span>` : ""}<a href="#avatar">Voir mon avatar →</a></span><button type="button" class="toast-x" aria-label="Fermer">×</button>`;
    document.body.appendChild(t);
    const fermer = () => { t.classList.add("sort"); setTimeout(() => t.remove(), 300); };
    t.querySelector(".toast-x").addEventListener("click", fermer);
    t.querySelector("a").addEventListener("click", fermer);
    setTimeout(fermer, 8000);
  }
  // Défis : au-delà de quelques parties du même défi dans la journée, les XP diminuent
  const CLE_JOUR = "profmaths:defis-jour";
  function partieDuJour(k) {
    const auj = new Date().toLocaleDateString("fr-CA");
    let j = { d: auj, n: {} };
    try { const l = JSON.parse(localStorage.getItem(CLE_JOUR) || "null"); if (l && l.d === auj && l.n) j = l; } catch (e) {}
    const deja = j.n[k] || 0;
    j.n[k] = deja + 1;
    try { localStorage.setItem(CLE_JOUR, JSON.stringify(j)); } catch (e) {}
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
  Compte.init((eleve, distant) => {
    if (eleve) {
      // La progression faite sans compte sur cet appareil rejoint le compte
      prog = Compte.fusion(prog, distant);
      etaitConnecte = true;
      save();
    } else if (etaitConnecte) {
      // Déconnexion : on efface la progression de l'appareil (téléphone partagé)
      prog = { xp: 0, exo: {}, qcm: {}, jeux: {} };
      try { localStorage.removeItem(CLE); } catch (e) {}
      etaitConnecte = false;
      majXP();
    }
    majBoutonCompte();
    route();
  });
  majBoutonCompte();

  /* ---------- Apparence : clair, sombre ou imagé (sur ordinateur) ---------- */
  // Sans choix enregistré, le site suit le réglage clair/sombre de l'appareil.
  const CLE_THEME = "profmaths:theme";
  const boutonsTheme = document.querySelectorAll("[data-theme-choix]");
  function majTheme() {
    const t = document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    boutonsTheme.forEach((b) => b.setAttribute("aria-pressed", b.dataset.themeChoix === t));
  }
  boutonsTheme.forEach((b) => b.addEventListener("click", () => {
    document.documentElement.dataset.theme = b.dataset.themeChoix;
    try { localStorage.setItem(CLE_THEME, b.dataset.themeChoix); } catch (e) {}
    majTheme();
  }));
  majTheme();

  /* ---------- Mise en forme du texte : $maths$, **gras**, puces ---------- */
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function tex(src, display) {
    if (window.katex) {
      // Intervalles : ]a ; b[ s'écrit comme d'habitude, l'espacement des crochets est corrigé ici
      src = src.replace(/([\[\]])([^\[\];$]*?)\\,;([^\[\];$]*?)([\[\]])/g, "\\mathopen{$1}$2\\,;$3\\mathclose{$4}");
      try { return katex.renderToString(src, { throwOnError: false, displayMode: !!display }); } catch (e) {}
    }
    return `<code>${esc(src)}</code>`;
  }
  function inline(s) {
    const maths = [];
    const t = String(s).replace(/\$([^$]+)\$/g, (_, m) => "\u0000" + (maths.push(m) - 1) + "\u0000");
    return esc(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\u0000(\d+)\u0000/g, (_, i) => tex(maths[+i]));
  }
  function md(s) {
    return String(s).split(/\n\n+/).map((bloc) => {
      // Bloc de code (programme Python) : entre deux lignes ```, sans ligne vide à l'intérieur
      if (bloc.startsWith("```")) return `<pre class="code"><code>${esc(bloc.replace(/^```[a-z]*\n?/, "").replace(/\n?```\s*$/, ""))}</code></pre>`;
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
  const figure = (nom) => (FIGURES[nom] ? `<figure class="fig">${FIGURES[nom]()}</figure>` : "");

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
  function route() {
    const h = location.hash.replace(/^#/, "");
    const [chap, onglet] = h.split(".");
    if (minuterieJeu) { clearInterval(minuterieJeu); minuterieJeu = null; }
    document.getElementById("jeu-btn").toggleAttribute("aria-current", chap === "jeu");
    $xpLien.toggleAttribute("aria-current", chap === "avatar");
    if (chap === "compte") pageCompte();
    else if (chap === "avatar") pageAvatar();
    else if (chap === "jeu") pageJeu();
    else if (chap && window.CHAPITRES && CHAPITRES[chap]) pageChapitre(chap, onglet || "cours");
    else if (chap && CATALOGUE.niveaux.some((n) => "niveau-" + n.id === chap)) pageNiveau(CATALOGUE.niveaux.find((n) => "niveau-" + n.id === chap));
    else pageAccueil();
    // Couleur du niveau (Seconde, Première...) pour habiller la page niveau et la page chapitre
    const niv = CATALOGUE.niveaux.find((n) => "niveau-" + n.id === chap || n.chapitres.some((ch) => ch.id === chap));
    if (niv) $app.dataset.niv = niv.id; else delete $app.dataset.niv;
  }
  window.addEventListener("hashchange", () => { route(); window.scrollTo(0, 0); });

  const etoiles = (n, max) => `<span class="etoiles" aria-label="${n} étoile${n > 1 ? "s" : ""} sur ${max}">${"★".repeat(n)}<span class="off">${"★".repeat(max - n)}</span></span>`;

  function bilanChapitre(id) {
    const c = CHAPITRES[id];
    const total = c.exercices.length * 3;
    const got = c.exercices.reduce((s, e) => s + (prog.exo[id + ":" + e.type] || 0), 0);
    return { got, total, qcm: prog.qcm[id] };
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
    seconde: "Les bases solides du lycée",
    automatismes: "Calcul et réflexes, pour l'épreuve anticipée",
    premiere: "Suites, second degré et plus",
    "terminale-spe": "Vers le bac et le supérieur",
    terminale: "Option maths complémentaires"
  };
  const chapitresEnLigne = (n) => n.chapitres.filter((ch) => ch.statut === "disponible" && window.CHAPITRES && CHAPITRES[ch.id]).length;

  function pageAccueil() {
    document.title = "ProfMaths";
    const dispos = Object.keys(window.CHAPITRES || {});
    const nbSeries = dispos.reduce((s, k) => s + CHAPITRES[k].exercices.length, 0);
    const nbQcm = dispos.reduce((s, k) => s + CHAPITRES[k].qcm.length, 0);
    let h = `<section class="hero"><div class="hero-in"><p class="eyebrow">Maths au lycée · Mayotte</p><h1>Une vidéo, un cours, des exercices. À ton rythme.</h1><p class="lead">Choisis ton niveau : tous ses chapitres s'affichent, dans l'ordre des playlists de la chaîne.</p>
      <ul class="chiffres"><li><b>${dispos.length}</b> chapitres</li><li><b>${nbSeries}</b> séries d'exercices</li><li><b>${nbQcm}</b> questions de QCM</li></ul></div>${DECOR_HERO}</section>`;
    // Choix du niveau : chaque carte ouvre la page du niveau avec tous ses chapitres
    h += `<h2 class="titre-bloc">Choisis ton niveau</h2><nav class="cartes-niv" aria-label="Niveaux">`;
    CATALOGUE.niveaux.forEach((n) => {
      const nb = chapitresEnLigne(n);
      h += `<a class="carte-niv" href="#niveau-${esc(n.id)}" data-niv="${esc(n.id)}"><span class="pastille-niv" aria-hidden="true"></span><span class="carte-niv-t"><strong>${esc(n.nom)}</strong>${ACCROCHES[n.id] ? `<span class="accroche">${esc(ACCROCHES[n.id])}</span>` : ""}<span class="meta">${nb} chapitre${nb > 1 ? "s" : ""} en ligne</span></span><span class="go" aria-hidden="true">→</span></a>`;
    });
    h += `</nav>`;
    // À découvrir : le jeu et les chaînes YouTube
    h += `<h2 class="titre-bloc">À découvrir</h2><div class="decouvrir">
      <a class="promo promo-jeu" href="#jeu"><span class="promo-ico" aria-hidden="true">🏛️</span><span class="promo-t"><span class="eyebrow">Le jeu · Seconde</span><strong>Les Salles</strong><span>Explore un temple grec et résous les exercices gravés sur les stèles pour ouvrir les portes. Se joue au clavier, sur ordinateur.</span><span class="promo-btn">Découvrir le jeu →</span></span></a>
      <a class="promo promo-yt" href="${YT_PROF}?sub_confirmation=1" target="_blank" rel="noopener"><span class="promo-ico" aria-hidden="true">▶</span><span class="promo-t"><span class="eyebrow">Ma chaîne YouTube</span><strong>Profmaths</strong><span>Toutes les vidéos de cours et les corrections d'exercices de ce site. Abonne-toi pour ne rater aucune nouvelle vidéo !</span><span class="promo-btn">S'abonner à la chaîne</span></span></a>
      <a class="promo promo-monka" href="${YT_MONKA}" target="_blank" rel="noopener"><span class="promo-ico" aria-hidden="true">▶</span><span class="promo-t"><span class="eyebrow">En complément</span><strong>Yvan Monka</strong><span>Une autre explication, pas à pas, de chaque notion du lycée. Pratique pour revoir une méthode autrement.</span><span class="promo-btn">Voir sa chaîne →</span></span></a>
    </div>`;
    if (!Compte.eleve()) h += `<a class="invite" href="#compte"><strong>Crée ton compte</strong><span>pour retrouver ton niveau, ton avatar et tes étoiles sur n'importe quel téléphone ou ordinateur.</span></a>`;
    h += piedDePage();
    $app.innerHTML = h;
  }
  const piedDePage = () => `<footer class="pied"><a href="${YT_PROF}" target="_blank" rel="noopener">Chaîne YouTube</a><a href="https://drive.google.com/drive/folders/1mTeWgDGTv4hNYrD_ozxN9-cSDDGH_Oqn" target="_blank" rel="noopener">Cours et corrigés (Drive)</a></footer>`;

  /* ---------- Page d'un niveau : tous ses chapitres ---------- */
  function pageNiveau(n) {
    document.title = `${n.nom} · ProfMaths`;
    let h = `<a class="retour" href="#">← Accueil</a>
      <header class="niv-head"><p class="eyebrow">Niveau</p><h1><span class="pastille-niv" aria-hidden="true"></span>${esc(n.nom)}</h1>${n.intro ? `<p class="lead">${esc(n.intro)}</p>` : `<p class="lead">Choisis ton chapitre. Ils sont rangés dans l'ordre de la playlist.</p>`}</header>
      <ol class="chapitres chapitres-niv">`;
    n.chapitres.forEach((ch) => {
      const dispo = ch.statut === "disponible" && window.CHAPITRES && CHAPITRES[ch.id];
      const num = ch.code ? `<span class="num num-a">${esc(ch.code)}</span>` : ch.numero ? `<span class="num">${ch.numero}</span>` : `<span class="num num-a">A</span>`;
      if (dispo) {
        const b = bilanChapitre(ch.id);
        const pct = Math.round((b.got / b.total) * 100);
        h += `<li><a class="chap" href="#${ch.id}">${num}<span class="chap-t"><strong>${esc(ch.titre)}</strong><span class="meta">Cours · ${CHAPITRES[ch.id].exercices.length} séries d'exercices · QCM${b.qcm !== undefined ? ` · meilleur score ${b.qcm}/${CHAPITRES[ch.id].qcm.length}` : ""}</span><span class="barre"><span style="width:${pct}%"></span></span></span><span class="go" aria-hidden="true">→</span></a></li>`;
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
      <details class="regles"><summary>Comment gagner des XP ?</summary>
        <ul><li><strong>Exercices :</strong> jusqu'à ${XP.question} XP par question réussie (moins avec des indices ou des erreurs).</li>
        <li><strong>QCM :</strong> ${XP.bonneReponseQcm} XP par bonne réponse.</li>
        <li><strong>Défis chrono :</strong> ${XP.bonneReponseDefi} XP par bonne réponse.</li>
        <li><strong>Ce que tu maîtrises déjà rapporte moins :</strong> une série à 3 étoiles ou un QCM déjà réussi à 100 % donne 10 fois moins d'XP, une série à 2 étoiles ou un QCM réussi à 70 % ou plus, 2 fois moins. Un même défi rejoué plus de ${XP.defisPleinTarif} fois dans la journée rapporte 4 fois moins jusqu'au lendemain.</li>
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
      afficherOptions();
    }));
  }

  /* ---------- Page jeu : « Les Salles », dans le dossier les-salles/ ---------- */
  function pageJeu() {
    document.title = "Les Salles · ProfMaths";
    $app.innerHTML = `<section class="page-jeu"><p class="eyebrow">Jeu · Seconde</p><h1>Les Salles</h1>
      <p class="lead">Un jeu de plateforme dans un temple grec : résous les exercices gravés sur les stèles pour ouvrir les portes.</p>
      <p class="muted">Se joue au clavier, sur ordinateur. Clique une fois dans le jeu (le bouton « Commencer » suffit) pour que les touches répondent. Ta progression reste dans ce navigateur.</p>
      <iframe class="cadre-jeu" src="les-salles/index.html" title="Jeu Les Salles" width="100%" height="720" style="border:0"></iframe>
      <p class="muted"><a href="les-salles/index.html" target="_blank" rel="noopener">Ouvrir le jeu en plein écran</a></p></section>`;
  }

  /* ---------- Page compte ---------- */
  function pageCompte() {
    document.title = "Mon compte · ProfMaths";
    const e = Compte.eleve();
    const demo = Compte.demo ? `<p class="demo">Mode démonstration : le compte n'est gardé que sur cet appareil. Les vrais comptes, accessibles partout, seront activés à la mise en ligne.</p>` : "";
    const classes = Compte.classes.map((c) => `<option${e && c === e.classe ? " selected" : ""}>${esc(c)}</option>`).join("");
    if (e && e.aCompleter) {
      // Première connexion avec Google/Apple : on demande le prénom et la classe
      $app.innerHTML = `<section class="page-compte"><p class="eyebrow">Mon compte</p><h1>Encore une étape</h1>
        <p class="lead">Tu es connecté avec ${esc(Compte.nomFournisseur(e.fournisseur))}. Vérifie ton prénom et choisis ta classe.</p>
        <form id="f-fin" class="formulaire">
          <label for="fin-prenom">Prénom</label><input id="fin-prenom" autocomplete="given-name" value="${esc(e.prenom)}" required>
          <label for="fin-classe">Classe</label><select id="fin-classe">${classes}</select>
          <p class="note">N'écris pas ton nom de famille en entier. Seul ton professeur peut voir ta progression.</p>
          <p class="erreur" role="alert"></p><button class="btn" type="submit">C'est parti</button>
        </form>
        <button class="btn-sec" id="deco">Annuler et me déconnecter</button></section>`;
      const f = document.getElementById("f-fin");
      f.addEventListener("submit", async (ev) => {
        ev.preventDefault();
        const err = f.querySelector(".erreur"), b = f.querySelector("button[type=submit]");
        err.textContent = ""; b.disabled = true;
        try {
          await Compte.completer({ prenom: document.getElementById("fin-prenom").value, classe: document.getElementById("fin-classe").value });
          majBoutonCompte(); pageCompte();
        } catch (x) { err.textContent = x.message; b.disabled = false; }
      });
      document.getElementById("deco").addEventListener("click", () => Compte.deconnecter().then(() => { location.hash = ""; }));
      return;
    }
    if (e) {
      let lignes = "";
      CATALOGUE.niveaux.forEach((n) => n.chapitres.forEach((ch) => {
        if (!(window.CHAPITRES && CHAPITRES[ch.id])) return;
        const b = bilanChapitre(ch.id);
        lignes += `<li><a class="chap" href="#${ch.id}"><span class="chap-t"><strong>${esc(ch.titre)}</strong><span class="meta">${esc(n.nom)} · ${b.got}/${b.total} étoiles${b.qcm !== undefined ? ` · QCM ${b.qcm}/${CHAPITRES[ch.id].qcm.length}` : ""}</span><span class="barre"><span style="width:${Math.round((b.got / b.total) * 100)}%"></span></span></span></a></li>`;
      }));
      $app.innerHTML = `<section class="page-compte"><p class="eyebrow">Mon compte</p><h1>Bonjour ${esc(e.prenom || e.identifiant)} !</h1>
        <p class="lead">${e.fournisseur ? `Connecté avec <strong>${esc(Compte.nomFournisseur(e.fournisseur))}</strong>` : `Identifiant : <strong>${esc(e.identifiant)}</strong>`}${e.classe ? ` · ${esc(e.classe)}` : ""}</p>${demo}
        ${carteProfil()}
        <h2>Ma progression</h2><ol class="chapitres">${lignes}</ol>
        <p class="muted">Ta progression est enregistrée automatiquement après chaque exercice et chaque QCM.</p>
        <button class="btn-sec" id="deco">Se déconnecter</button>
        <p class="muted">Sur un téléphone partagé, pense à te déconnecter : tes points restent sauvegardés dans ton compte.</p></section>`;
      document.getElementById("deco").addEventListener("click", () => Compte.deconnecter().then(() => { location.hash = ""; }));
      return;
    }
    const LOGOS = {
      google: `<svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13.6 17.8 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.7 6c4.5-4.2 6.9-10.3 6.9-17.7z"/><path fill="#FBBC05" d="M10.5 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C1 16.5 0 20.1 0 24s1 7.5 2.7 10.7l7.8-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.7-6c-2.2 1.5-5 2.3-8.2 2.3-6.2 0-11.5-4.2-13.4-9.9l-7.9 6.1C6.6 42.6 14.6 48 24 48z"/></svg>`,
      apple: `<svg viewBox="0 0 384 512" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>`
    };
    const sociaux = Compte.fournisseurs.length ? `<div class="sociaux">${Compte.fournisseurs.map((p) =>
      `<button type="button" class="btn-social ${p}" data-p="${p}">${LOGOS[p]}<span>Continuer avec ${esc(Compte.nomFournisseur(p))}</span></button>`).join("")}
      <p class="erreur" role="alert" id="err-social">${esc(Compte.erreurRedirection())}</p></div>
      <p class="separateur"><span>ou avec un identifiant</span></p>` : "";
    $app.innerHTML = `<section class="page-compte"><p class="eyebrow">Mon compte</p><h1>Garde ta progression partout</h1>
      <p class="lead">Avec un compte, ton niveau, ton avatar et tes étoiles te suivent sur tous tes appareils. Pas besoin d'adresse e-mail.</p>${demo}${sociaux}
      <div class="bascule" role="tablist"><button role="tab" id="t-co" aria-selected="true">J'ai déjà un compte</button><button role="tab" id="t-cr" aria-selected="false">Créer mon compte</button></div>
      <form id="f-co" class="formulaire" autocomplete="on">
        <label for="co-id">Identifiant</label><input id="co-id" name="username" autocomplete="username" autocapitalize="none" spellcheck="false" required>
        <label for="co-mdp">Mot de passe</label><input id="co-mdp" name="password" type="password" autocomplete="current-password" required>
        <p class="erreur" role="alert"></p><button class="btn" type="submit">Me connecter</button>
        <p class="muted">Mot de passe oublié ? Demande à ton professeur de le réinitialiser.</p>
      </form>
      <form id="f-cr" class="formulaire" autocomplete="on" hidden>
        <label for="cr-prenom">Prénom</label><input id="cr-prenom" autocomplete="given-name" required>
        <label for="cr-classe">Classe</label><select id="cr-classe">${classes}</select>
        <label for="cr-id">Identifiant <span class="aide-champ">ex. : prenom.n2</span></label><input id="cr-id" name="username" autocomplete="username" autocapitalize="none" spellcheck="false" required>
        <label for="cr-mdp">Mot de passe <span class="aide-champ">6 caractères minimum</span></label><input id="cr-mdp" name="password" type="password" autocomplete="new-password" minlength="6" required>
        <p class="note">N'écris pas ton nom de famille en entier. Seul ton professeur peut voir ta progression.</p>
        <p class="erreur" role="alert"></p><button class="btn" type="submit">Créer mon compte</button>
      </form></section>`;
    const fco = document.getElementById("f-co"), fcr = document.getElementById("f-cr");
    const tco = document.getElementById("t-co"), tcr = document.getElementById("t-cr");
    const montrer = (cr) => { fco.hidden = cr; fcr.hidden = !cr; tco.setAttribute("aria-selected", !cr); tcr.setAttribute("aria-selected", cr); };
    document.querySelectorAll(".btn-social").forEach((b) => b.addEventListener("click", async () => {
      const err = document.getElementById("err-social");
      err.textContent = ""; b.disabled = true;
      try { await Compte.connecterAvec(b.dataset.p); } catch (x) { err.textContent = x.message; }
      b.disabled = false;
    }));
    tco.addEventListener("click", () => montrer(false));
    tcr.addEventListener("click", () => montrer(true));
    const envoyer = (form, action) => form.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const err = form.querySelector(".erreur"), b = form.querySelector("button[type=submit]");
      err.textContent = ""; b.disabled = true;
      try { await action(); } catch (x) { err.textContent = x.message; b.disabled = false; }
    });
    envoyer(fco, () => Compte.connecter(document.getElementById("co-id").value, document.getElementById("co-mdp").value));
    envoyer(fcr, () => Compte.creer({
      prenom: document.getElementById("cr-prenom").value, classe: document.getElementById("cr-classe").value,
      identifiant: document.getElementById("cr-id").value, mdp: document.getElementById("cr-mdp").value
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
      <header class="chap-head">${c.numero ? `<span class="chap-filigrane" aria-hidden="true">${c.numero}</span>` : ""}<p class="eyebrow">${esc(c.niveau)} · ${c.numero ? `Chapitre ${c.numero}` : esc(c.periode || "Toute l'année")}</p><h1>${esc(c.titre)}</h1><p class="lead">${inline(c.accroche)}</p>
      <p class="score-chap">${etoiles(Math.round((b.got / b.total) * 5), 5)} <span>${b.got}/${b.total} étoiles d'exercices</span></p></header>
      <nav class="onglets" aria-label="Parties du chapitre">${ONGLETS.map((o) => `<a href="#${id}.${o.id}" ${o.id === onglet ? 'aria-current="page"' : ""}>${o.nom}</a>`).join("")}</nav>
      <div class="panneau" id="panneau"></div>`;
    $app.innerHTML = h;
    const p = document.getElementById("panneau");
    ({ cours: vueCours, exercices: vueExercices, qcm: vueQCM, defi: vueDefi, methode: vueMethode })[onglet](p, c, id);
  }

  function vueCours(p, c, id) {
    let h = `<div class="ressources">`;
    c.pdfs.forEach((f) => { h += `<a class="pdf" href="${f.url}" target="_blank" rel="noopener"><span class="pdf-ico" aria-hidden="true">PDF</span><span>${esc(f.titre)}</span></a>`; });
    (c.liens || []).forEach((l) => { h += `<a class="pdf" href="${l.url}" target="_blank" rel="noopener"><span class="pdf-ico jeu" aria-hidden="true">${l.type === "video" ? "▶" : "JEU"}</span><span>${esc(l.titre)}</span></a>`; });
    if (c.playlist) h += `<a class="pdf" href="${c.playlist}" target="_blank" rel="noopener"><span class="pdf-ico yt" aria-hidden="true">▶</span><span>Playlist du chapitre sur YouTube</span></a>`;
    h += `</div>`;
    c.cours.forEach((s, i) => {
      h += `<article class="notion"><h2><span class="n">${i + 1}</span>${inline(s.titre)}</h2><div class="notion-texte">${md(s.texte)}${s.video ? `<div class="video-aide">${video(s.video)}<p class="muted">${esc(s.video.titre)}</p></div>` : ""}</div><aside class="notion-cote">${s.figure ? figure(s.figure) : ""}`;
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
      if (e.etape !== etape) { etape = e.etape; h += `<li class="etape">${esc(etape)}</li>`; }
      h += `<li><button class="serie" data-i="${i}"><span class="chap-t"><strong>${esc(e.titre)}</strong><span class="meta">${e.nb} questions</span></span>${etoiles(st, 3)}</button></li>`;
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
      : `<form class="saisie" autocomplete="off"><label for="rep">${esc(q.prefixe)}</label><span class="champ"><input id="rep" inputmode="text" enterkeyhint="done" placeholder="${q.mode === "ensemble" ? "ex. −1 ; 3  ou  aucun" : "ta réponse"}">${q.suffixe ? `<span class="suffixe">${esc(q.suffixe)}</span>` : ""}</span>
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

  function lancerSerie(p, c, id, ex) {
    const gen = GEN[ex.type];
    let i = 0, score = 0, xpSerie = 0, resteXP = 0;
    const max = ex.nb * 10;
    // Série déjà maîtrisée : elle rapporte beaucoup moins d'XP
    const etoilesAvant = prog.exo[id + ":" + ex.type] || 0;
    const coef = etoilesAvant >= 3 ? XP.serie3Etoiles : etoilesAvant === 2 ? XP.serie2Etoiles : 1;
    const noteCoef = coef < 1 ? `Série déjà à ${etoilesAvant} étoiles : XP ${coef <= 0.1 ? "divisés par 10" : "divisés par 2"}.` : "";
    function crediter(x) {
      resteXP += x;
      const e = Math.floor(resteXP + 1e-9);
      resteXP -= e;
      const g = gagnerXP(e);
      xpSerie += g;
      return g;
    }

    function question() {
      const q = gen(i);
      let aides = 0, erreurs = 0, fini = false;
      const champ = champReponse(q);
      p.innerHTML = `<div class="exo">
        <div class="exo-top"><button class="lien" id="quitter">← Séries</button><span class="progression">Question ${i + 1}/${ex.nb}</span><span class="pts">${score} pts</span></div>
        <div class="pastilles">${Array.from({ length: ex.nb }, (_, k) => `<span class="${k < i ? "ok" : k === i ? "cur" : ""}"></span>`).join("")}</div>
        <h2>${esc(ex.titre)}</h2>
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
      p.querySelector("#quitter").addEventListener("click", () => vueExercices(p, c, id));

      function terminer(gagne, montrer) {
        fini = true;
        const pts = gagne ? Math.max(2, XP.question - 3 * aides - 2 * erreurs) : 0;
        score += pts;
        const xpQ = gagne ? crediter(pts * coef) : 0;
        p.querySelector(".pts").textContent = `${score} pts`;
        fb.className = "retour-rep " + (gagne ? "bon" : "info");
        fb.innerHTML = gagne
          ? `<strong>Bravo !</strong> +${pts} points${coef < 1 ? ` (+${xpQ} XP)` : ""}.${aides === 0 && erreurs === 0 ? " Du premier coup !" : ""}`
          : `<strong>Voici la solution.</strong> Lis-la bien, la prochaine sera pour toi.`;
        if (montrer || !gagne) {
          fb.innerHTML += `<div class="solution">${md(q.solution)}</div>`;
          if (q.figureSolution && p.querySelector("#fig")) p.querySelector("#fig").innerHTML = q.figureSolution;
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
      const r = score / max;
      const st = r >= 0.9 ? 3 : r >= 0.7 ? 2 : r >= 0.4 ? 1 : 0;
      const k = id + ":" + ex.type;
      const record = st > (prog.exo[k] || 0);
      prog.exo[k] = Math.max(prog.exo[k] || 0, st); save();
      const msg = st === 3 ? "Série maîtrisée. Tu peux passer à la suivante." : st === 2 ? "Très bien ! Encore un essai pour la troisième étoile ?" : st === 1 ? "C'est un bon début. Relis la fiche méthode puis recommence." : "Pas de panique : regarde la vidéo et le cours, puis réessaie.";
      p.innerHTML = `<div class="bilan"><p class="eyebrow">Bilan · ${esc(ex.titre)}</p><p class="gros">${score}<span>/${max} pts</span></p>${etoiles(st, 3)}${record ? `<p class="record">Nouveau record !</p>` : ""}<p>${msg}</p><p class="gain-xp">+${xpSerie} XP${noteCoef ? ` · <span>${noteCoef}</span>` : ""}</p>
        <div class="exo-actions"><button class="btn" id="encore">Recommencer</button><button class="btn-sec" id="retour">Autres séries</button></div></div>`;
      p.querySelector("#encore").addEventListener("click", () => lancerSerie(p, c, id, ex));
      p.querySelector("#retour").addEventListener("click", () => vueExercices(p, c, id));
    }
    question();
  }

  /* ---------- QCM ---------- */
  function vueQCM(p, c, id) {
    const qs = shuffle(c.qcm).map((q) => {
      const ordre = shuffle(q.choix.map((_, k) => k));
      return Object.assign({}, q, { ordre });
    });
    let h = `<p class="intro">${qs.length} questions, une seule bonne réponse à chaque fois. Les questions et les réponses changent d'ordre à chaque essai.${prog.qcm[id] !== undefined ? ` Ton meilleur score : <strong>${prog.qcm[id]}/${qs.length}</strong>.` : ""}</p><form id="qcm">`;
    qs.forEach((q, n) => {
      h += `<fieldset class="q" data-n="${n}"><legend><span class="n">${n + 1}</span>${inline(q.question)}</legend>${q.figure ? figure(q.figure) : ""}${q.tableau ? tableau(q.tableau) : ""}
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
      const avant = prog.qcm[id], tot = qs.length;
      const coef = avant === undefined ? 1 : avant >= tot ? XP.qcmParfait : avant >= 0.7 * tot ? XP.qcmBon : 1;
      const record = avant === undefined || bon > avant;
      prog.qcm[id] = Math.max(avant || 0, bon);
      const gain = gagnerXP(bon * XP.bonneReponseQcm * coef);
      save();
      form.dataset.corrige = "1";
      const fin = p.querySelector(".qcm-fin");
      fin.innerHTML = `<div class="bilan"><p class="eyebrow">Ton score</p><p class="gros">${bon}<span>/${qs.length}</span></p>${record && bon ? `<p class="record">Nouveau record !</p>` : ""}<p>+${gain} XP${coef < 1 ? ` (QCM déjà réussi à ${Math.round((avant / tot) * 100)} % : XP ${coef <= 0.1 ? "divisés par 10" : "divisés par 2"})` : ""}. ${bon >= 8 ? "Excellent, le chapitre est bien compris." : bon >= 5 ? "Bien. Relis les explications des questions ratées." : "Revois le cours et la fiche méthode, puis retente ta chance."}</p><button class="btn" type="submit">Nouveau QCM</button></div>`;
      fin.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* ---------- Fiche méthode ---------- */
  function vueMethode(p, c) {
    let h = `<div class="methodes">`;
    c.methode.forEach((m) => {
      h += `<article class="methode"><h2>${inline(m.titre)}</h2><ol>${m.etapes.map((e) => `<li>${inline(e)}</li>`).join("")}</ol>${m.exemple ? `<p class="ex">${inline(m.exemple)}</p>` : ""}</article>`;
    });
    h += `</div><section class="erreurs"><h2>Les erreurs fréquentes</h2><ul>${c.erreurs.map((e) => `<li>${inline(e)}</li>`).join("")}</ul></section>`;
    p.innerHTML = h;
  }

  /* ---------- Défi chrono ---------- */
  const nombreFr = (x) => String(+(+x).toFixed(6)).replace("-", "−").replace(".", ",");
  function bonneReponse(q) {
    if (q.mode === "choix") return inline(q.choix[q.attendu]);
    const v = q.mode === "ensemble" ? (q.attendu.length ? q.attendu.map(nombreFr).join(" ; ") : "aucun") : nombreFr(q.attendu);
    return `<strong>${v}</strong>${q.suffixe ? " " + esc(q.suffixe) : ""}`;
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
      if (!l.length) { $top.innerHTML = `<li class="top-vide">Personne pour l'instant. Lance un défi pour être le premier !</li>`; return; }
      $top.innerHTML = l.map((x, k) => `<li class="${x.moi ? "moi" : ""}"><span class="rang">${["🥇", "🥈", "🥉"][k] || k + 1}</span><span class="top-nom"><strong>${esc(x.prenom)}</strong>${!demande && x.classe ? `<span class="meta">${esc(classeCourte(x.classe))}</span>` : ""}</span><span class="top-pts">${x.points} pts</span></li>`).join("");
    }).catch(() => {
      if ($top.isConnected) $top.innerHTML = `<li class="top-vide">Classement indisponible pour le moment.</li>`;
    });
  }

  // o = { cible: élément où jouer, retour: fonction du bouton retour, libelle: texte du bilan }
  function lancerChrono(J, theme, o) {
    const $c = o.cible;
    const gen = () => GEN[theme.series[Math.floor(Math.random() * theme.series.length)]](Math.floor(Math.random() * 5));
    let vies = J.vies, score = 0, serie = 0, bonnes = 0, n = 0;
    let reste = J.duree * 1000, depart = 0, enPause = true, fini = false;
    $c.innerHTML = `<div class="jeu">
      <div class="jeu-haut"><button class="lien" id="quitter">← ${esc(o.retourTexte || "Thèmes")}</button><span class="vies" aria-label="Vies"></span><span class="jeu-score"><b id="score">0</b> pts</span></div>
      <div class="chrono" aria-hidden="true"><span id="barre"></span></div>
      <div class="jeu-info"><span id="temps"></span><span id="multi"></span></div>
      <div id="zone"></div></div>`;
    if ($c !== $app) window.scrollTo(0, Math.max(0, $c.getBoundingClientRect().top + window.scrollY - 110));
    const $zone = $c.querySelector("#zone"), $barre = $c.querySelector("#barre"), $temps = $c.querySelector("#temps");
    $c.querySelector("#quitter").addEventListener("click", () => { clearInterval(minuterieJeu); minuterieJeu = null; o.retour(); });
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
      clearInterval(minuterieJeu); minuterieJeu = null;
      const k = "chrono:" + theme.id;
      const ancien = prog.jeux[k] || 0;
      const record = score > ancien;
      const deja = partieDuJour(k);
      const coef = deja < XP.defisPleinTarif ? 1 : XP.defiApres;
      prog.jeux[k] = Math.max(ancien, score);
      const gain = gagnerXP(bonnes * XP.bonneReponseDefi * coef);
      save();
      $c.innerHTML = `<div class="bilan"><p class="eyebrow">${esc(J.titre)} · ${esc(o.libelle)}</p><p>${esc(raison)}</p><p class="gros">${score}<span> pts</span></p>${record && score ? `<p class="record">Nouveau record !</p>` : ancien ? `<p class="muted">Ton record : ${ancien} pts</p>` : ""}
        <p>${bonnes} bonne${bonnes > 1 ? "s" : ""} réponse${bonnes > 1 ? "s" : ""} sur ${n}. +${gain} XP${coef < 1 ? " (défi déjà joué plusieurs fois aujourd'hui : XP réduits jusqu'à demain)" : ""}.</p>
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
})();
