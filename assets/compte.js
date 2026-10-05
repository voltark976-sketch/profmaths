/*
  Comptes élèves : connexion et sauvegarde de la progression.
  - Mode Firebase si data/config-comptes.js contient une configuration.
  - Sinon mode démonstration : comptes gardés sur l'appareil seulement.
  Les élèves n'ont pas besoin d'adresse e-mail : ils choisissent un identifiant et un mot de passe.
  Ils peuvent aussi se connecter avec Google ou Apple si c'est activé dans data/config-comptes.js
  (l'adresse e-mail du compte Google ou Apple n'est jamais enregistrée par le site).
*/
(function () {
  "use strict";
  const CFG = window.CONFIG_COMPTES || { firebase: null };
  const DOMAINE = "profmaths.example.com"; // identifiant -> adresse technique, aucun e-mail n'est envoyé
  const FB_VERSION = "10.14.1";
  let ecouteur = () => {};
  let eleve = null; // { uid, identifiant, prenom, classe, fournisseur, aCompleter }
  let fb = null; // { auth, db }
  let minuterie = null;
  let dernierClassement = ""; // évite de renvoyer la même ligne du classement
  // Points du classement : somme des records de l'élève sur tous les Défis chrono
  const pointsJeux = (jeux) => Object.values(jeux || {}).reduce((s, v) => s + (+v || 0), 0);

  const normId = (s) => String(s || "").trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, ".");
  function verifId(id) {
    if (!/^[a-z0-9._-]{3,30}$/.test(id)) return "L'identifiant doit faire 3 à 30 caractères : lettres sans accent, chiffres, point ou tiret.";
    return "";
  }

  function fusion(a, b) {
    a = a || {}; b = b || {};
    const out = { xp: Math.max(a.xp || 0, b.xp || 0), exo: Object.assign({}, a.exo), qcm: Object.assign({}, a.qcm), jeux: Object.assign({}, a.jeux) };
    for (const k in b.exo || {}) out.exo[k] = Math.max(out.exo[k] || 0, b.exo[k]);
    for (const k in b.qcm || {}) out.qcm[k] = Math.max(out.qcm[k] ?? 0, b.qcm[k]);
    for (const k in b.jeux || {}) out.jeux[k] = Math.max(out.jeux[k] || 0, b.jeux[k]);
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
    // Retour d'une connexion Google/Apple faite par redirection (si la fenêtre surgissante était bloquée)
    fb.auth.getRedirectResult().catch((e) => { erreurRedirection = messageFirebase(e); });
    fb.auth.onAuthStateChanged(async (u) => {
      if (!u) { eleve = null; ecouteur(null, null); return; }
      const p = fournisseurDe(u);
      const idTech = p ? "" : (u.email || "").split("@")[0];
      try {
        const snap = await fb.db.collection("eleves").doc(u.uid).get();
        const d = snap.exists ? snap.data() : {};
        // Premier passage avec Google/Apple : on propose le prénom du compte, l'élève le confirme
        const prenom = d.prenom || (p ? String(u.displayName || "").trim().split(/\s+/)[0] : "");
        eleve = { uid: u.uid, identifiant: d.identifiant || idTech, prenom, classe: d.classe || "", fournisseur: p, aCompleter: !!p && !d.prenom };
        ecouteur(eleve, { xp: d.xp || 0, exo: d.exo || {}, qcm: d.qcm || {}, jeux: d.jeux || {} });
      } catch (e) {
        eleve = { uid: u.uid, identifiant: idTech, prenom: "", classe: "", fournisseur: p, aCompleter: false };
        ecouteur(eleve, null);
      }
    });
  }
  let erreurRedirection = "";
  const NOMS = { google: "Google", apple: "Apple" };
  function fournisseurDe(u) {
    const ids = (u.providerData || []).map((x) => x && x.providerId);
    if (ids.includes("google.com")) return "google";
    if (ids.includes("apple.com")) return "apple";
    return "";
  }
  function messageFirebase(e) {
    const c = (e && e.code) || "";
    if (c.includes("email-already-in-use")) return "Cet identifiant est déjà pris. Choisis-en un autre.";
    if (c.includes("weak-password")) return "Le mot de passe doit faire au moins 6 caractères.";
    if (c.includes("invalid-credential") || c.includes("wrong-password") || c.includes("user-not-found") || c.includes("invalid-email")) return "Identifiant ou mot de passe incorrect.";
    if (c.includes("too-many-requests")) return "Trop d'essais. Attends quelques minutes puis réessaie.";
    if (c.includes("account-exists-with-different-credential")) return "Un compte existe déjà avec cette adresse, créé avec un autre moyen de connexion. Utilise celui-là.";
    if (c.includes("operation-not-allowed")) return "Ce moyen de connexion n'est pas encore activé. Utilise ton identifiant et ton mot de passe.";
    if (c.includes("unauthorized-domain")) return "Connexion impossible depuis cette adresse du site. Préviens ton professeur.";
    if (c.includes("web-storage-unsupported") || c.includes("disallowed")) return "Ouvre le site dans Chrome ou Safari (pas dans une application de messagerie) pour te connecter.";
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
    // Boutons « Continuer avec Google / Apple » affichés seulement si activés dans la configuration
    fournisseurs: CFG.firebase ? ["google", "apple"].filter((p) => (CFG.connexions || {})[p]) : [],
    nomFournisseur: (p) => NOMS[p] || p,
    erreurRedirection: () => { const m = erreurRedirection; erreurRedirection = ""; return m; },
    eleve: () => eleve,
    fusion,

    // onChange(eleve, progressionDistante) est appelé à chaque connexion ou déconnexion
    init(onChange) {
      ecouteur = onChange;
      if (CFG.firebase) {
        initFirebase().catch(() => { console.warn("Firebase indisponible"); ecouteur(null, null); });
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

    async creer({ identifiant, prenom, classe, mdp }) {
      const id = normId(identifiant);
      const err = verifId(id);
      if (err) throw new Error(err);
      if (!prenom.trim()) throw new Error("Indique ton prénom.");
      if (String(mdp).length < 6) throw new Error("Le mot de passe doit faire au moins 6 caractères.");
      if (fb) {
        try {
          const r = await fb.auth.createUserWithEmailAndPassword(`${id}@${DOMAINE}`, mdp);
          await fb.db.collection("eleves").doc(r.user.uid).set({
            identifiant: id, prenom: prenom.trim(), classe, xp: 0, exo: {}, qcm: {},
            creeLe: firebase.firestore.FieldValue.serverTimestamp()
          });
          eleve = { uid: r.user.uid, identifiant: id, prenom: prenom.trim(), classe };
          ecouteur(eleve, { xp: 0, exo: {}, qcm: {} });
        } catch (e) { throw new Error(e.code ? messageFirebase(e) : e.message); }
        return;
      }
      if (CFG.firebase) throw new Error("Le service de comptes ne répond pas. Vérifie ta connexion internet.");
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
        try { await fb.auth.signInWithEmailAndPassword(`${id}@${DOMAINE}`, mdp); }
        catch (e) { throw new Error(messageFirebase(e)); }
        return; // onAuthStateChanged prend le relais
      }
      if (CFG.firebase) throw new Error("Le service de comptes ne répond pas. Vérifie ta connexion internet.");
      const c = lireJSON(DEMO, {})[id];
      if (!c || c.mdp !== empreinte(mdp)) throw new Error("Identifiant ou mot de passe incorrect.");
      ecrireJSON(SESSION, id);
      eleve = { uid: id, identifiant: id, prenom: c.prenom, classe: c.classe };
      ecouteur(eleve, c.prog || null);
    },

    // Connexion avec Google ou Apple (crée le compte au premier passage)
    async connecterAvec(p) {
      if (!fb) throw new Error("Le service de comptes ne répond pas. Vérifie ta connexion internet.");
      let prov;
      if (p === "google") { prov = new firebase.auth.GoogleAuthProvider(); prov.setCustomParameters({ prompt: "select_account" }); }
      else if (p === "apple") { prov = new firebase.auth.OAuthProvider("apple.com"); prov.addScope("name"); }
      else throw new Error("Moyen de connexion inconnu.");
      fb.auth.languageCode = "fr";
      try {
        await fb.auth.signInWithPopup(prov); // onAuthStateChanged prend le relais
      } catch (e) {
        const c = e.code || "";
        if (c.includes("popup-closed-by-user") || c.includes("cancelled-popup-request")) return; // l'élève a fermé la fenêtre
        if (c.includes("popup-blocked") || c.includes("operation-not-supported-in-this-environment")) {
          try { await fb.auth.signInWithRedirect(prov); return; } catch (e2) { throw new Error(messageFirebase(e2)); }
        }
        throw new Error(messageFirebase(e));
      }
    },

    // Après une première connexion Google/Apple : prénom et classe
    async completer({ prenom, classe }) {
      if (!eleve || !fb) return;
      if (!String(prenom).trim()) throw new Error("Indique ton prénom.");
      try {
        await fb.db.collection("eleves").doc(eleve.uid).set({
          prenom: prenom.trim(), classe, fournisseur: eleve.fournisseur,
          creeLe: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      } catch (e) { throw new Error("L'enregistrement a échoué. Vérifie ta connexion internet."); }
      Object.assign(eleve, { prenom: prenom.trim(), classe, aCompleter: false });
    },

    async deconnecter() {
      clearTimeout(minuterie);
      if (fb) { await fb.auth.signOut(); return; }
      try { localStorage.removeItem(SESSION); } catch (e) {}
      eleve = null; ecouteur(null, null);
    },

    // Top 10 du Défi chrono (classe = "" pour le classement général). Renvoie null si l'élève n'est pas connecté.
    async classement(classe) {
      let liste;
      if (fb) {
        if (!eleve) return null;
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

    // Enregistre la progression (regroupe les envois rapprochés pour économiser le réseau)
    sauver(prog) {
      if (!eleve) return;
      clearTimeout(minuterie);
      const copie = { xp: prog.xp, exo: Object.assign({}, prog.exo), qcm: Object.assign({}, prog.qcm), jeux: Object.assign({}, prog.jeux) };
      minuterie = setTimeout(() => {
        if (fb) {
          fb.db.collection("eleves").doc(eleve.uid)
            .set(Object.assign(copie, { majLe: firebase.firestore.FieldValue.serverTimestamp() }), { merge: true })
            .catch(() => {}); // hors ligne : la copie locale reste, elle repartira au prochain enregistrement
          // Classement : seulement le prénom, la classe et les points (lisible par les élèves connectés)
          const pts = pointsJeux(copie.jeux), sig = [eleve.uid, eleve.prenom, eleve.classe, pts].join("|");
          if (pts > 0 && eleve.prenom && sig !== dernierClassement) {
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
