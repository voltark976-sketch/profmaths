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
  let prog = { xp: 0, exo: {}, qcm: {} };
  try { prog = Object.assign(prog, JSON.parse(localStorage.getItem(CLE) || "{}")); } catch (e) {}
  const Compte = window.PM_COMPTE;
  const save = () => { try { localStorage.setItem(CLE, JSON.stringify(prog)); } catch (e) {} majXP(); Compte.sauver(prog); };
  const majXP = () => { $xp.textContent = prog.xp; };
  majXP();

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
      prog = { xp: 0, exo: {}, qcm: {} };
      try { localStorage.removeItem(CLE); } catch (e) {}
      etaitConnecte = false;
      majXP();
    }
    majBoutonCompte();
    route();
  });
  majBoutonCompte();

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
  const tableau = (t) => `<div class="scroll-x"><table class="valeurs"><tr><th>${tex(t.var || "x")}</th>${t.x.map((v) => `<td>${tex(String(v))}</td>`).join("")}</tr><tr><th>${tex(t.nom)}</th>${t.y.map((v) => `<td>${tex(String(v))}</td>`).join("")}</tr></table></div>`;
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
    { id: "methode", nom: "Méthode" }
  ];
  function route() {
    const h = location.hash.replace(/^#/, "");
    const [chap, onglet] = h.split(".");
    if (chap === "compte") pageCompte();
    else if (chap && window.CHAPITRES && CHAPITRES[chap]) pageChapitre(chap, onglet || "cours");
    else pageAccueil();
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
  function pageAccueil() {
    document.title = "ProfMaths";
    let h = `<section class="hero"><p class="eyebrow">Maths au lycée · Mayotte</p><h1>Une vidéo, un cours, des exercices. À ton rythme.</h1><p class="lead">Choisis ton niveau puis ton chapitre. Les chapitres suivent l'ordre des playlists de la chaîne.</p></section>`;
    if (!Compte.eleve()) h += `<a class="invite" href="#compte"><strong>Crée ton compte</strong><span>pour retrouver tes points et tes étoiles sur n'importe quel téléphone ou ordinateur.</span></a>`;
    h += `<div class="niveaux">`;
    CATALOGUE.niveaux.forEach((n) => {
      h += `<section class="niveau"><h2>${esc(n.nom)}</h2><ol class="chapitres">`;
      n.chapitres.forEach((ch) => {
        const dispo = ch.statut === "disponible" && window.CHAPITRES && CHAPITRES[ch.id];
        const num = ch.numero ? `<span class="num">${ch.numero}</span>` : `<span class="num num-a">A</span>`;
        if (dispo) {
          const b = bilanChapitre(ch.id);
          const pct = Math.round((b.got / b.total) * 100);
          h += `<li><a class="chap" href="#${ch.id}">${num}<span class="chap-t"><strong>${esc(ch.titre)}</strong><span class="meta">Cours · ${CHAPITRES[ch.id].exercices.length} séries d'exercices · QCM${b.qcm !== undefined ? ` · meilleur score ${b.qcm}/${CHAPITRES[ch.id].qcm.length}` : ""}</span><span class="barre"><span style="width:${pct}%"></span></span></span><span class="go" aria-hidden="true">→</span></a></li>`;
        } else {
          h += `<li><div class="chap chap-off">${num}<span class="chap-t"><strong>${esc(ch.titre)}</strong><span class="meta">En préparation${ch.drive ? ` · <a href="${ch.drive}" target="_blank" rel="noopener">documents sur le Drive</a>` : ""}</span></span></div></li>`;
        }
      });
      h += `</ol></section>`;
    });
    h += `</div><footer class="pied"><a href="https://www.youtube.com/@Profmaths-q1p" target="_blank" rel="noopener">Chaîne YouTube</a><a href="https://drive.google.com/drive/folders/1mTeWgDGTv4hNYrD_ozxN9-cSDDGH_Oqn" target="_blank" rel="noopener">Cours et corrigés (Drive)</a></footer>`;
    $app.innerHTML = h;
  }

  /* ---------- Page compte ---------- */
  function pageCompte() {
    document.title = "Mon compte · ProfMaths";
    const e = Compte.eleve();
    const demo = Compte.demo ? `<p class="demo">Mode démonstration : le compte n'est gardé que sur cet appareil. Les vrais comptes, accessibles partout, seront activés à la mise en ligne.</p>` : "";
    if (e) {
      let lignes = "";
      CATALOGUE.niveaux.forEach((n) => n.chapitres.forEach((ch) => {
        if (!(window.CHAPITRES && CHAPITRES[ch.id])) return;
        const b = bilanChapitre(ch.id);
        lignes += `<li><a class="chap" href="#${ch.id}"><span class="chap-t"><strong>${esc(ch.titre)}</strong><span class="meta">${esc(n.nom)} · ${b.got}/${b.total} étoiles${b.qcm !== undefined ? ` · QCM ${b.qcm}/${CHAPITRES[ch.id].qcm.length}` : ""}</span><span class="barre"><span style="width:${Math.round((b.got / b.total) * 100)}%"></span></span></span></a></li>`;
      }));
      $app.innerHTML = `<section class="page-compte"><p class="eyebrow">Mon compte</p><h1>Bonjour ${esc(e.prenom || e.identifiant)} !</h1>
        <p class="lead">Identifiant : <strong>${esc(e.identifiant)}</strong>${e.classe ? ` · ${esc(e.classe)}` : ""}</p>${demo}
        <div class="stat"><span class="gros">${prog.xp}</span><span>points gagnés</span></div>
        <h2>Ma progression</h2><ol class="chapitres">${lignes}</ol>
        <p class="muted">Ta progression est enregistrée automatiquement après chaque exercice et chaque QCM.</p>
        <button class="btn-sec" id="deco">Se déconnecter</button>
        <p class="muted">Sur un téléphone partagé, pense à te déconnecter : tes points restent sauvegardés dans ton compte.</p></section>`;
      document.getElementById("deco").addEventListener("click", () => Compte.deconnecter().then(() => { location.hash = ""; }));
      return;
    }
    const classes = Compte.classes.map((c) => `<option>${esc(c)}</option>`).join("");
    $app.innerHTML = `<section class="page-compte"><p class="eyebrow">Mon compte</p><h1>Garde ta progression partout</h1>
      <p class="lead">Avec un compte, tes points et tes étoiles te suivent sur tous tes appareils. Pas besoin d'adresse e-mail.</p>${demo}
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
    let h = `<a class="retour" href="#">← Tous les chapitres</a>
      <header class="chap-head"><p class="eyebrow">${esc(c.niveau)} · ${c.numero ? `Chapitre ${c.numero}` : esc(c.periode || "Toute l'année")}</p><h1>${esc(c.titre)}</h1><p class="lead">${inline(c.accroche)}</p>
      <p class="score-chap">${etoiles(Math.round((b.got / b.total) * 5), 5)} <span>${b.got}/${b.total} étoiles d'exercices</span></p></header>
      <nav class="onglets" aria-label="Parties du chapitre">${ONGLETS.map((o) => `<a href="#${id}.${o.id}" ${o.id === onglet ? 'aria-current="page"' : ""}>${o.nom}</a>`).join("")}</nav>
      <div class="panneau" id="panneau"></div>`;
    $app.innerHTML = h;
    const p = document.getElementById("panneau");
    ({ cours: vueCours, exercices: vueExercices, qcm: vueQCM, methode: vueMethode })[onglet](p, c, id);
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
      h += `<section class="videos"><h2>Les ${c.videos.length} exercices corrigés en vidéo</h2><p class="muted">Énoncés et corrigés dans les PDF ci-dessus.</p><div class="video-grille">`;
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
    return String(s).trim().toLowerCase().replace(/[−–—]/g, "-").replace(/,/g, ".").replace(/\s+/g, "").replace(/[%€]$/, "").replace(/^\+/, "").replace(/^[{(\[]|[})\]]$/g, "");
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

  function lancerSerie(p, c, id, ex) {
    const gen = GEN[ex.type];
    let i = 0, score = 0;
    const max = ex.nb * 10;

    function question() {
      const q = gen(i);
      let aides = 0, erreurs = 0, fini = false;
      const champ = q.mode === "choix"
        ? `<div class="choix">${q.choix.map((ch, k) => `<button class="opt" data-k="${k}"><span>${inline(ch)}</span></button>`).join("")}</div>`
        : `<form class="saisie" autocomplete="off"><label for="rep">${esc(q.prefixe)}</label><span class="champ"><input id="rep" inputmode="text" enterkeyhint="done" placeholder="${q.mode === "ensemble" ? "ex. −1 ; 3  ou  aucun" : "ta réponse"}">${q.suffixe ? `<span class="suffixe">${esc(q.suffixe)}</span>` : ""}</span>
           <div class="touches" aria-label="Symboles">${["−", ";", "/", ","].map((t) => `<button type="button" class="touche" data-t="${t}">${t}</button>`).join("")}</div>
           <button class="btn" type="submit">Vérifier</button></form>`;
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
        const pts = gagne ? Math.max(2, 10 - 3 * aides - 2 * erreurs) : 0;
        score += pts;
        prog.xp += pts; save();
        p.querySelector(".pts").textContent = `${score} pts`;
        fb.className = "retour-rep " + (gagne ? "bon" : "info");
        fb.innerHTML = gagne
          ? `<strong>Bravo !</strong> +${pts} points.${aides === 0 && erreurs === 0 ? " Du premier coup !" : ""}`
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
        p.querySelectorAll(".touche").forEach((t) => t.addEventListener("click", () => {
          const s = inp.selectionStart ?? inp.value.length;
          const ins = t.dataset.t === ";" ? " ; " : t.dataset.t;
          inp.value = inp.value.slice(0, s) + ins + inp.value.slice(inp.selectionEnd ?? s);
          inp.focus(); inp.setSelectionRange(s + ins.length, s + ins.length);
        }));
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
      p.innerHTML = `<div class="bilan"><p class="eyebrow">Bilan · ${esc(ex.titre)}</p><p class="gros">${score}<span>/${max} pts</span></p>${etoiles(st, 3)}${record ? `<p class="record">Nouveau record !</p>` : ""}<p>${msg}</p>
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
      const gain = bon * 5;
      const record = prog.qcm[id] === undefined || bon > prog.qcm[id];
      prog.qcm[id] = Math.max(prog.qcm[id] || 0, bon);
      prog.xp += gain; save();
      form.dataset.corrige = "1";
      const fin = p.querySelector(".qcm-fin");
      fin.innerHTML = `<div class="bilan"><p class="eyebrow">Ton score</p><p class="gros">${bon}<span>/${qs.length}</span></p>${record && bon ? `<p class="record">Nouveau record !</p>` : ""}<p>+${gain} points. ${bon >= 8 ? "Excellent, le chapitre est bien compris." : bon >= 5 ? "Bien. Relis les explications des questions ratées." : "Revois le cours et la fiche méthode, puis retente ta chance."}</p><button class="btn" type="submit">Nouveau QCM</button></div>`;
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

  route();
})();
