/*
  Comptes élèves : connexion et sauvegarde de la progression.
  - Mode Firebase si data/config-comptes.js contient une configuration.
  - Sinon mode démonstration : comptes gardés sur l'appareil seulement.
  Les comptes sont créés par le professeur (outils/comptes/LISEZMOI.md) : identifiant et mot de passe,
  sans adresse e-mail. Le prénom, la classe et le groupe sont inscrits dans le compte lui-même
  (« custom claims ») : les règles Firestore refusent tout compte qui n'a pas été créé ainsi.
  Le compte du professeur (claim prof) lit la progression de tous les élèves (page #suivi) ;
  sa propre progression est rangée à part (collection « profs »), hors du suivi et du classement.
  Comptes créés sur le site (adresse technique @inscrits…, sans marque) :
  - un élève hors des classes du professeur : fiche dans « inscrits » (classe « Autres élèves »),
    hors du suivi et du classement ;
  - un professeur : demande dans « demandesProf », en attente tant que prof.maths ne l'a pas approuvée ;
    approuvé, il a sa propre progression (« profs ») mais ne voit aucun élève.
*/
(function () {
  "use strict";
  const CFG = window.CONFIG_COMPTES || { firebase: null };
  const DOMAINE = "profmaths.example.com"; // identifiant -> adresse technique, aucun e-mail n'est envoyé
  const DOMAINE_LIBRE = "inscrits.profmaths.example.com"; // comptes créés sur le site
  const CHEF = "prof.maths"; // seul compte qui voit et approuve les demandes
  const FB_VERSION = "10.14.1";
  let ecouteur = () => {};
  let eleve = null; // { uid, identifiant, prenom, nom, classe, groupe, prof, inscrit, attente, externe }
  let fb = null; // { auth, db }
  let minuterie = null;
  let inscription = null; // compte en cours de création : { id, type, doc }
  let dernierClassement = ""; // évite de renvoyer la même ligne du classement
  // Fiche de progression : élève d'une classe (eleves/uid), élève inscrit sur le site (inscrits/uid) ou professeur (profs/uid)
  const fiche = (e) => fb.db.collection(e.prof ? "profs" : e.inscrit ? "inscrits" : "eleves").doc(e.uid);
  const lireProg = (d) => ({ xp: d.xp || 0, exo: d.exo || {}, qcm: d.qcm || {}, jeux: d.jeux || {}, avatar: d.avatar || null, quand: d.quand || {} });
  // Points du classement : somme des records de l'élève sur tous les Défis chrono
  const pointsJeux = (jeux) => Object.values(jeux || {}).reduce((s, v) => s + (+v || 0), 0);

  const normId = (s) => String(s || "").trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, ".");
  function verifId(id) {
    if (!/^[a-z0-9._-]{3,30}$/.test(id)) return "L'identifiant doit faire 3 à 30 caractères : lettres sans accent, chiffres, point ou tiret.";
    return "";
  }

  function fusion(a, b) {
    a = a || {}; b = b || {};
    const out = { xp: Math.max(a.xp || 0, b.xp || 0), exo: Object.assign({}, a.exo), qcm: Object.assign({}, a.qcm), jeux: Object.assign({}, a.jeux), quand: Object.assign({}, a.quand) };
    for (const k in b.exo || {}) out.exo[k] = Math.max(out.exo[k] || 0, b.exo[k]);
    for (const k in b.qcm || {}) out.qcm[k] = Math.max(out.qcm[k] ?? 0, b.qcm[k]);
    for (const k in b.jeux || {}) out.jeux[k] = Math.max(out.jeux[k] || 0, b.jeux[k]);
    // Date du dernier essai de chaque série et de chaque QCM (pour le suivi des devoirs)
    for (const k in b.quand || {}) out.quand[k] = Math.max(out.quand[k] || 0, b.quand[k]);
    // Avatar : on garde le plus récemment modifié
    const av = [a.avatar, b.avatar].filter((x) => x && typeof x === "object").sort((x, y) => (y.t || 0) - (x.t || 0))[0];
    if (av) out.avatar = Object.assign({}, av);
    return out;
  }

  /* ---------- Mode Firebase ---------- */
  function chargerScript(src) {
    return new Promise((ok, ko) => {
      const s = document.createElement("script");
      s.src = src; s.onload = ok; s.onerror = () => ko(new Error("script"));
      document.head.appendChild(s);
    });
  }
  async function initFirebase() {
    const base = `https://cdn.jsdelivr.net/npm/firebase@${FB_VERSION}/`;
    await chargerScript(base + "firebase-app-compat.js");
    await Promise.all([chargerScript(base + "firebase-auth-compat.js"), chargerScript(base + "firebase-firestore-compat.js")]);
    firebase.initializeApp(CFG.firebase);
    fb = { auth: firebase.auth(), db: firebase.firestore() };
    // Les visites ne sont comptées qu'une fois le compte connu (le professeur n'est pas compté)
    fb.auth.onAuthStateChanged((u) => etatCompte(u).then(visitesPretes));
  }
  async function etatCompte(u) {
    if (!u) { eleve = null; ecouteur(null, null); return; }
    const idTech = (u.email || "").split("@")[0];
    if ((u.email || "").endsWith("@" + DOMAINE_LIBRE)) return etatInscrit(u, idTech);
    let c;
    try { c = (await u.getIdTokenResult()).claims; }
    catch (e) { c = null; }
    if (c && c.prof) {
      const p = { uid: u.uid, identifiant: idTech, prenom: c.prenom || "Professeur", classe: "", prof: true, groupes: Array.isArray(c.groupes) ? c.groupes : null };
      try {
        const snap = await fiche(p).get();
        eleve = p;
        ecouteur(eleve, lireProg(snap.exists ? snap.data() : {}));
      } catch (e) {
        // Lecture impossible : on n'écrase pas la fiche avec la copie de l'appareil, on relira plus tard
        eleve = Object.assign(p, { lectureEchouee: true });
        ecouteur(eleve, null);
      }
      return;
    }
    if (c && !c.eleve) {
      // Compte qui n'a pas été créé par le professeur : refusé
      erreurCompte = "Ce compte n'existe plus. Demande tes identifiants à ton professeur.";
      fb.auth.signOut(); return;
    }
    const profil = c ? { identifiant: idTech, prenom: c.prenom || "", nom: c.nom || "", classe: c.classe || "", groupe: c.groupe || "" } : { identifiant: idTech, prenom: "", classe: "" };
    try {
      const ref = fb.db.collection("eleves").doc(u.uid);
      const snap = await ref.get();
      const d = snap.exists ? snap.data() : {};
      // Première connexion : la fiche de l'élève est créée à partir de son compte
      if (!snap.exists) await ref.set(Object.assign({}, profil, { xp: 0, exo: {}, qcm: {}, creeLe: firebase.firestore.FieldValue.serverTimestamp() }));
      eleve = Object.assign({ uid: u.uid }, profil);
      ecouteur(eleve, lireProg(d));
      setTimeout(envoyerTemps, 5000); // temps resté sur l'appareil (page fermée hors ligne)
    } catch (e) {
      // Lecture impossible (réseau) : on n'écrase pas le compte avec la copie de l'appareil, on relira plus tard
      eleve = Object.assign({ uid: u.uid, lectureEchouee: true }, profil);
      ecouteur(eleve, null);
    }
  }
  const AUTRES = "Autres élèves";
  // Compte créé sur le site : demande de professeur (en attente, refusée ou approuvée) ou élève hors des classes
  async function etatInscrit(u, idTech) {
    const neuf = inscription && inscription.id === idTech ? inscription : null;
    const dRef = fb.db.collection("demandesProf").doc(u.uid), iRef = fb.db.collection("inscrits").doc(u.uid);
    try {
      // Première connexion juste après la création : on enregistre la fiche ou la demande (gardée pour un nouvel essai si le réseau coupe)
      if (neuf) { await (neuf.type === "prof" ? dRef : iRef).set(Object.assign({ creeLe: firebase.firestore.FieldValue.serverTimestamp() }, neuf.doc)); inscription = null; }
      const [dS, iS] = await Promise.all([dRef.get(), iRef.get()]);
      if (dS.exists) {
        const d = dS.data();
        if (d.statut === "approuve") {
          const p = { uid: u.uid, identifiant: idTech, prenom: d.prenom, nom: d.nom, classe: "", prof: true, externe: true, groupes: [] };
          const snap = await fiche(p).get();
          eleve = p;
          ecouteur(eleve, lireProg(snap.exists ? snap.data() : {}));
        } else {
          // En attente (ou refusée) : rien n'est enregistré
          eleve = { uid: u.uid, identifiant: idTech, prenom: d.prenom, nom: d.nom, classe: "", inscrit: true, attente: d.statut || "attente", demande: d };
          ecouteur(eleve, null);
        }
        return;
      }
      let d = iS.exists ? iS.data() : null;
      if (!d) { d = { identifiant: idTech, prenom: idTech, nom: "", niveau: "", xp: 0, exo: {}, qcm: {} }; await iRef.set(Object.assign({ creeLe: firebase.firestore.FieldValue.serverTimestamp() }, d)); }
      eleve = { uid: u.uid, identifiant: idTech, prenom: d.prenom || idTech, nom: d.nom || "", classe: AUTRES, niveau: d.niveau || "", inscrit: true };
      ecouteur(eleve, lireProg(d));
    } catch (e) {
      eleve = { uid: u.uid, identifiant: idTech, prenom: idTech, classe: AUTRES, inscrit: true, lectureEchouee: true };
      ecouteur(eleve, null);
    }
  }

  /* ---------- Fréquentation : compteurs anonymes (aucun nom, aucun cookie) ----------
    Chaque appareil est compté une fois par jour : pour le site (téléphone ou ordinateur),
    pour chaque onglet de chapitre ouvert, pour le jeu, et pour la classe d'un élève connecté.
    Le professeur n'est pas compté, ni les essais sur l'ordinateur (localhost). */
  const CLE_VUS = "profmaths:vus";
  const ONGLETS_COMPTES = ["cours", "exercices", "qcm", "defi", "methode"];
  const ESSAI_LOCAL = location.protocol === "file:" || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  let pretVisites = false, attenteVisites = [];
  function visitesPretes() {
    pretVisites = true;
    const a = attenteVisites; attenteVisites = [];
    a.forEach((args) => compterVisite(...args));
  }
  function compterVisite(page, onglet) {
    if (!fb || ESSAI_LOCAL || (eleve && eleve.prof)) return;
    const j = new Date().toLocaleDateString("fr-CA"); // date du jour sur l'appareil, AAAA-MM-JJ
    let vus = lireJSON(CLE_VUS, null);
    if (!vus || vus.d !== j || !Array.isArray(vus.k)) vus = { d: j, k: [] };
    const nouveau = (k) => !vus.k.includes(k) && vus.k.push(k);
    const plus1 = () => firebase.firestore.FieldValue.increment(1);
    const jour = {};
    if (nouveau("site")) { jour.visites = plus1(); jour[matchMedia("(pointer: coarse)").matches ? "tel" : "pc"] = plus1(); }
    if (page === "jeu" && nouveau("jeu")) jour.jeu = plus1();
    if (eleve && eleve.groupe && !eleve.lectureEchouee && nouveau("eleve:" + eleve.uid)) jour.classes = { [eleve.groupe]: plus1() };
    const envois = [];
    if (Object.keys(jour).length) envois.push(fb.db.collection("visites").doc(j).set(Object.assign({ j }, jour), { merge: true }));
    if (page && page !== "jeu" && ONGLETS_COMPTES.includes(onglet) && nouveau(page + "." + onglet)) {
      envois.push(fb.db.collection("visitesChap").doc(j + "_" + page).set({ j, ch: page, [onglet]: plus1() }, { merge: true }));
    }
    if (!envois.length) return;
    ecrireJSON(CLE_VUS, vus);
    envois.forEach((p) => p.catch(() => {})); // hors ligne ou refusé : tant pis, ce n'est qu'un compteur
  }

  /* ---------- Temps passé sur le site (élève connecté seulement, visible par son professeur) ----------
    On compte le temps actif : onglet visible et élève qui touche, tape ou fait défiler la page
    depuis moins de 3 minutes (ou qui regarde une vidéo). Le temps s'ajoute dans la fiche de l'élève :
    temps.j[jour] (total du jour) et temps.ch[chapitre] (total par chapitre, « jeu » pour Les Salles),
    temps.der[chapitre] (dernier jour où l'élève y a passé du temps).
    Envoi groupé toutes les 5 minutes et quand on quitte la page ; en attendant, il est gardé sur l'appareil. */
  const CLE_TEMPS = "profmaths:temps";
  const PAS_TEMPS = 15, INACTIF = 3 * 60e3, ENVOI_TEMPS = 300; // secondes, millisecondes, secondes
  let pageTemps = "", derniereAction = Date.now();
  const actif = () => { derniereAction = Date.now(); };
  ["pointerdown", "pointermove", "keydown", "scroll", "touchstart", "input"].forEach((t) => window.addEventListener(t, actif, { passive: true, capture: true }));
  const compteTemps = () => fb && eleve && !eleve.prof && !eleve.inscrit && !eleve.lectureEchouee && !ESSAI_LOCAL;
  function attenteTemps() {
    const a = lireJSON(CLE_TEMPS, null);
    return a && eleve && a.uid === eleve.uid && a.j && a.ch && a.der ? a : { uid: eleve.uid, n: 0, j: {}, ch: {}, der: {} };
  }
  setInterval(() => {
    if (!compteTemps() || document.visibilityState !== "visible") return;
    const video = document.activeElement && document.activeElement.tagName === "IFRAME";
    if (!video && Date.now() - derniereAction > INACTIF) return;
    const a = attenteTemps(), j = new Date().toLocaleDateString("fr-CA");
    a.n += PAS_TEMPS;
    a.j[j] = (a.j[j] || 0) + PAS_TEMPS;
    if (pageTemps) { a.ch[pageTemps] = (a.ch[pageTemps] || 0) + PAS_TEMPS; a.der[pageTemps] = j; }
    ecrireJSON(CLE_TEMPS, a);
    if (a.n >= ENVOI_TEMPS) envoyerTemps();
  }, PAS_TEMPS * 1000);
  function envoyerTemps() {
    if (!compteTemps()) return;
    const a = attenteTemps();
    if (!a.n) return;
    try { localStorage.removeItem(CLE_TEMPS); } catch (e) {}
    const plus = (v) => firebase.firestore.FieldValue.increment(v), j = {}, ch = {};
    for (const k in a.j) j[k] = plus(a.j[k]);
    for (const k in a.ch) ch[k] = plus(a.ch[k]);
    fb.db.collection("eleves").doc(eleve.uid)
      .set({ temps: { j, ch, der: a.der }, vuLe: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true })
      .catch(() => {}); // refusé : ces quelques minutes sont perdues, sans gêner l'élève
  }
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") envoyerTemps(); });
  window.addEventListener("pagehide", envoyerTemps);
  let erreurCompte = "";
  // Nouvel essai de lecture du compte après un échec ; la fusion se fait dans l'écouteur, qui enregistre ensuite
  let relectureEnCours = false;
  function relire() {
    if (relectureEnCours || !eleve) return;
    relectureEnCours = true;
    const e = eleve;
    if (e.inscrit && fb.auth.currentUser) {
      etatInscrit(fb.auth.currentUser, e.identifiant).then(() => { relectureEnCours = false; });
      return;
    }
    fiche(e).get().then((snap) => {
      if (eleve !== e) return;
      e.lectureEchouee = false;
      ecouteur(e, lireProg(snap.exists ? snap.data() : {}));
    }).catch(() => {}).then(() => { relectureEnCours = false; });
  }
  function messageFirebase(e) {
    const c = (e && e.code) || "";
    if (c.includes("email-already-in-use")) return "Cet identifiant est déjà pris. Choisis-en un autre.";
    if (c.includes("weak-password")) return "Le mot de passe doit faire au moins 6 caractères.";
    if (c.includes("invalid-credential") || c.includes("wrong-password") || c.includes("user-not-found") || c.includes("invalid-email")) return "Identifiant ou mot de passe incorrect.";
    if (c.includes("too-many-requests")) return "Trop d'essais. Attends quelques minutes puis réessaie.";
    if (c.includes("user-disabled")) return "Ce compte est désactivé. Parles-en à ton professeur.";
    if (c.includes("network")) return "Pas de connexion internet. Réessaie quand le réseau revient.";
    return "La connexion a échoué. Réessaie dans un instant.";
  }

  /* ---------- Mode démonstration (sur l'appareil) ---------- */
  const DEMO = "profmaths:demo-comptes", SESSION = "profmaths:demo-session";
  const lireJSON = (k, def) => { try { return JSON.parse(localStorage.getItem(k)) || def; } catch (e) { return def; } };
  const ecrireJSON = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const empreinte = (s) => { let h = 5381; for (const c of s) h = ((h << 5) + h + c.charCodeAt(0)) | 0; return String(h); };

  /* ---------- Interface publique ---------- */
  window.PM_COMPTE = {
    demo: !CFG.firebase,
    classes: CFG.classes || [],
    erreurCompte: () => { const m = erreurCompte; erreurCompte = ""; return m; },
    eleve: () => eleve,
    fusion,

    // onChange(eleve, progressionDistante) est appelé à chaque connexion ou déconnexion
    init(onChange) {
      ecouteur = onChange;
      if (CFG.firebase) {
        initFirebase().catch(() => { console.warn("Firebase indisponible"); ecouteur(null, null, true); });
      } else {
        const id = lireJSON(SESSION, null);
        const comptes = lireJSON(DEMO, {});
        if (id && comptes[id]) {
          const c = comptes[id];
          eleve = { uid: id, identifiant: id, prenom: c.prenom, classe: c.classe };
          setTimeout(() => ecouteur(eleve, c.prog || null));
        }
      }
    },

    chef: () => !!(eleve && eleve.prof && !eleve.externe && eleve.identifiant === CHEF),

    // Création d'un compte sur le site.
    // type "eleve" : { prenom, nom, niveau } ; type "prof" : { prenom, nom, etablissement, niveaux[], contact, message }
    async creer({ type, identifiant, prenom, nom, classe, niveau, etablissement, niveaux, contact, message, mdp }) {
      const id = normId(identifiant);
      const err = verifId(id);
      if (err) throw new Error(err);
      const t = (s, max) => String(s || "").trim().replace(/\s+/g, " ").slice(0, max);
      prenom = t(prenom, 40); nom = t(nom, 40);
      if (!prenom) throw new Error("Indique ton prénom.");
      if (String(mdp).length < 6) throw new Error("Le mot de passe doit faire au moins 6 caractères.");
      if (CFG.firebase) {
        if (!fb) throw new Error("Le service de comptes ne répond pas. Vérifie ta connexion internet.");
        let doc;
        if (type === "prof") {
          niveaux = (niveaux || []).map((n) => t(n, 40)).filter(Boolean).slice(0, 12);
          if (!nom) throw new Error("Indique votre nom.");
          if (!niveaux.length) throw new Error("Cochez au moins un niveau.");
          if (!t(contact, 80)) throw new Error("Indiquez une adresse e-mail ou un téléphone pour vous répondre.");
          doc = { identifiant: id, prenom, nom, etablissement: t(etablissement, 80), niveaux, contact: t(contact, 80), message: t(message, 500), statut: "attente" };
        } else {
          doc = { identifiant: id, prenom, nom, niveau: t(niveau, 40), xp: 0, exo: {}, qcm: {} };
        }
        inscription = { id, type: type === "prof" ? "prof" : "eleve", doc };
        try { await fb.auth.createUserWithEmailAndPassword(`${id}@${DOMAINE_LIBRE}`, mdp); }
        catch (e) { inscription = null; throw new Error(messageFirebase(e)); }
        return; // onAuthStateChanged enregistre la fiche ou la demande
      }
      const comptes = lireJSON(DEMO, {});
      if (comptes[id]) throw new Error("Cet identifiant est déjà pris. Choisis-en un autre.");
      comptes[id] = { mdp: empreinte(mdp), prenom: prenom.trim(), classe, prog: null };
      ecrireJSON(DEMO, comptes); ecrireJSON(SESSION, id);
      eleve = { uid: id, identifiant: id, prenom: prenom.trim(), classe };
      ecouteur(eleve, null);
    },

    async connecter(identifiant, mdp) {
      const id = normId(identifiant);
      if (fb) {
        // D'abord les comptes donnés par le professeur, puis ceux créés sur le site
        try { await fb.auth.signInWithEmailAndPassword(`${id}@${DOMAINE}`, mdp); }
        catch (e) {
          if (!/invalid-credential|wrong-password|user-not-found/.test(e && e.code || "")) throw new Error(messageFirebase(e));
          try { await fb.auth.signInWithEmailAndPassword(`${id}@${DOMAINE_LIBRE}`, mdp); }
          catch (e2) { throw new Error(messageFirebase(e2)); }
        }
        return; // onAuthStateChanged prend le relais
      }
      if (CFG.firebase) throw new Error("Le service de comptes ne répond pas. Vérifie ta connexion internet.");
      const c = lireJSON(DEMO, {})[id];
      if (!c || c.mdp !== empreinte(mdp)) throw new Error("Identifiant ou mot de passe incorrect.");
      ecrireJSON(SESSION, id);
      eleve = { uid: id, identifiant: id, prenom: c.prenom, classe: c.classe };
      ecouteur(eleve, c.prog || null);
    },

    async deconnecter() {
      clearTimeout(minuterie);
      envoyerTemps();
      if (fb) { await fb.auth.signOut(); return; }
      try { localStorage.removeItem(SESSION); } catch (e) {}
      eleve = null; ecouteur(null, null);
    },

    // Top 10 du Défi chrono (classe = "" pour le classement général). Renvoie null si l'élève n'est pas connecté.
    async classement(classe) {
      let liste;
      if (fb) {
        if (!eleve) return null;
        // Élèves inscrits sur le site et professeurs extérieurs : le classement reste celui des classes du professeur
        if (eleve.inscrit || eleve.externe) return { reserve: true };
        const col = fb.db.collection("classement");
        // Par classe : pas de tri côté serveur (il faudrait créer un index), on trie ici
        const snap = await (classe ? col.where("classe", "==", classe) : col.orderBy("points", "desc").limit(10)).get();
        liste = snap.docs.map((d) => Object.assign({}, d.data(), { moi: d.id === eleve.uid }));
      } else {
        if (CFG.firebase) throw new Error("Firebase indisponible");
        liste = Object.entries(lireJSON(DEMO, {})).map(([id, c]) => ({ prenom: c.prenom, classe: c.classe, points: pointsJeux(c.prog && c.prog.jeux), moi: !!eleve && id === eleve.uid }))
          .filter((l) => l.points > 0 && (!classe || l.classe === classe));
      }
      return liste.sort((a, b) => b.points - a.points).slice(0, 10);
    },
    pointsJeux,

    // Professeur : fiches de tous les élèves (progression et dates des derniers essais)
    async suivi() {
      if (!fb || !eleve || !eleve.prof || eleve.externe) return null;
      const col = fb.db.collection("eleves"), g = eleve.groupes;
      // Professeur rattaché à certaines classes : on ne demande que celles-là (les règles refusent le reste)
      const snaps = !g ? [await col.get()] : await Promise.all(Array.from({ length: Math.ceil(g.length / 30) }, (_, i) => col.where("groupe", "in", g.slice(i * 30, i * 30 + 30)).get()));
      return snaps.flatMap((snap) => snap.docs.map((d) => Object.assign({ uid: d.id }, d.data())));
    },

    // Compte une visite (page = identifiant du chapitre, « jeu » ou rien ; onglet du chapitre)
    visite(page, onglet) {
      pageTemps = page && /^[a-z0-9-]{1,60}$/.test(page) ? page : "";
      if (pretVisites) compterVisite(page, onglet);
      else if (attenteVisites.length < 20) attenteVisites.push([page, onglet]);
    },

    // Professeur : compteurs de fréquentation depuis la date « depuis » (AAAA-MM-JJ)
    async frequentation(depuis) {
      if (!fb || !eleve || !eleve.prof || eleve.externe) return null;
      const [jours, chap] = await Promise.all(["visites", "visitesChap"].map((c) => fb.db.collection(c).where("j", ">=", depuis).get()));
      return { jours: jours.docs.map((d) => d.data()), chapitres: chap.docs.map((d) => d.data()) };
    },

    // prof.maths : demandes de comptes professeurs et élèves inscrits sur le site
    async demandes() {
      if (!fb || !this.chef()) return null;
      const [d, i] = await Promise.all(["demandesProf", "inscrits"].map((c) => fb.db.collection(c).get()));
      const liste = (s) => s.docs.map((x) => Object.assign({ uid: x.id }, x.data()));
      return { profs: liste(d), eleves: liste(i) };
    },
    // statut : "approuve", "refuse" ou "attente"
    async decider(uid, statut) {
      if (!fb || !this.chef()) throw new Error("Réservé au compte prof.maths");
      await fb.db.collection("demandesProf").doc(uid).update({ statut, decideLe: firebase.firestore.FieldValue.serverTimestamp() });
    },

    // Enregistre la progression (regroupe les envois rapprochés pour économiser le réseau)
    sauver(prog) {
      if (!eleve || eleve.attente) return;
      clearTimeout(minuterie);
      const copie = { xp: prog.xp, exo: Object.assign({}, prog.exo), qcm: Object.assign({}, prog.qcm), jeux: Object.assign({}, prog.jeux), quand: Object.assign({}, prog.quand) };
      if (prog.avatar) copie.avatar = Object.assign({}, prog.avatar);
      minuterie = setTimeout(() => {
        if (fb && eleve.lectureEchouee) { relire(); return; }
        if (fb) {
          fiche(eleve)
            .set(Object.assign(copie, { majLe: firebase.firestore.FieldValue.serverTimestamp() }), { merge: true })
            .catch(() => {}); // hors ligne : la copie locale reste, elle repartira au prochain enregistrement
          // Classement : seulement le prénom, la classe et les points (lisible par les élèves connectés)
          const pts = pointsJeux(copie.jeux), sig = [eleve.uid, eleve.prenom, eleve.classe, pts].join("|");
          // Le professeur n'apparaît pas dans le classement des élèves
          if (pts > 0 && !eleve.prof && !eleve.inscrit && eleve.prenom && sig !== dernierClassement) {
            fb.db.collection("classement").doc(eleve.uid)
              .set({ prenom: eleve.prenom, classe: eleve.classe || "", points: pts, majLe: firebase.firestore.FieldValue.serverTimestamp() })
              .then(() => { dernierClassement = sig; }).catch(() => {});
          }
        } else {
          const comptes = lireJSON(DEMO, {});
          if (comptes[eleve.uid]) { comptes[eleve.uid].prog = copie; ecrireJSON(DEMO, comptes); }
        }
      }, fb ? 1500 : 0);
    }
  };
})();
