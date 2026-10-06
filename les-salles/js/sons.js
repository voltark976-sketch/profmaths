// =====================================================================
//  SONS : les bruitages des combats
// =====================================================================
//  Il n'y a aucun fichier son : chaque bruit est fabriqué à la volée
//  par le navigateur, avec des ondes et du souffle filtrés (on appelle
//  cela la « synthèse »). Un peu d'écho donne l'ambiance du temple.
//
//  Le bouton « Son » de l'en-tête coupe ou remet les bruitages ; le
//  choix est retenu sur l'appareil. Le navigateur n'autorise le son
//  qu'après un premier geste du joueur (une touche, un clic) : c'est
//  toujours le cas ici, puisqu'on joue au clavier.
// =====================================================================

var Sons = (function () {

  var CLE = "salles-maths-son";
  var actif = true;
  try { actif = window.localStorage.getItem(CLE) !== "non"; } catch (e) { }

  var ac = null, maitre = null, souffle = null;

  // Prépare l'audio du navigateur la première fois qu'on en a besoin.
  function contexte() {
    if (!actif) return null;
    var Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return null;
    if (!ac) {
      try {
        ac = new Audio();
        maitre = ac.createGain();
        maitre.gain.value = 0.3;
        maitre.connect(ac.destination);
        // L'écho : le son revient, un peu plus doux, 0,13 seconde plus tard.
        var echo = ac.createDelay();
        echo.delayTime.value = 0.13;
        var feutre = ac.createBiquadFilter();
        feutre.type = "lowpass";
        feutre.frequency.value = 2200;
        var retour = ac.createGain();
        retour.gain.value = 0.22;
        maitre.connect(echo);
        echo.connect(feutre);
        feutre.connect(retour);
        retour.connect(echo);
        retour.connect(ac.destination);
        // Deux secondes de souffle (des valeurs au hasard), réutilisées par tous les bruits.
        var n = Math.floor(ac.sampleRate * 2);
        souffle = ac.createBuffer(1, n, ac.sampleRate);
        var d = souffle.getChannelData(0);
        for (var i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
      } catch (e) {
        ac = null;
        return null;
      }
    }
    if (ac.state === "suspended" && ac.resume) ac.resume();
    return ac;
  }

  // Une note : forme de l'onde, fréquence de départ puis d'arrivée (en hertz),
  // instant de départ, durée et volume (en secondes et entre 0 et 1).
  function onde(type, f0, f1, debut, duree, volume, attaque) {
    var o = ac.createOscillator(), g = ac.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, debut);
    if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(1, f1), debut + duree);
    var a = attaque || 0.005;
    g.gain.setValueAtTime(0.0001, debut);
    g.gain.exponentialRampToValueAtTime(volume, debut + a);
    g.gain.exponentialRampToValueAtTime(0.0001, debut + Math.max(duree, a + 0.01));
    o.connect(g);
    g.connect(maitre);
    o.start(debut);
    o.stop(debut + duree + 0.05);
  }

  // Du souffle passé dans un filtre (qui garde les graves, les aigus ou
  // une bande de fréquences), dont la fréquence glisse de f0 à f1.
  function bruit(filtre, f0, f1, debut, duree, volume, q, attaque) {
    var s = ac.createBufferSource();
    s.buffer = souffle;
    s.loop = true;
    var f = ac.createBiquadFilter();
    f.type = filtre;
    f.Q.value = q || 1;
    f.frequency.setValueAtTime(f0, debut);
    if (f1 !== f0) f.frequency.exponentialRampToValueAtTime(Math.max(20, f1), debut + duree);
    var g = ac.createGain();
    var a = attaque || 0.005;
    g.gain.setValueAtTime(0.0001, debut);
    g.gain.exponentialRampToValueAtTime(volume, debut + a);
    g.gain.exponentialRampToValueAtTime(0.0001, debut + Math.max(duree, a + 0.01));
    s.connect(f);
    f.connect(g);
    g.connect(maitre);
    s.start(debut, Math.random() * 1.8);
    s.stop(debut + duree + 0.05);
  }

  // Les recettes des bruitages (t : l'instant où le bruit commence).
  var RECETTES = {
    // Le monstre surgit : un grondement qui monte, puis un cri rauque
    apparition: function (t) {
      bruit("lowpass", 120, 520, t, 0.9, 0.5, 1, 0.3);
      onde("sawtooth", 55, 90, t + 0.35, 0.7, 0.16, 0.08);
      bruit("bandpass", 320, 170, t + 0.4, 0.7, 0.35, 2, 0.05);
    },
    // Talos retombe sur ses pieds
    pas: function (t) {
      onde("sine", 140, 45, t, 0.25, 0.5);
      bruit("lowpass", 900, 200, t, 0.2, 0.25);
    },
    // Une arme qui fend l'air
    vent: function (t) { bruit("bandpass", 400, 2400, t, 0.28, 0.35, 1.2, 0.08); },
    tourbillon: function (t) {
      for (var k = 0; k < 3; k++) bruit("bandpass", 500, 2600, t + k * 0.13, 0.16, 0.3, 1.5, 0.05);
    },
    // L'arc qui se tend, puis la corde qui claque
    corde: function (t) {
      bruit("bandpass", 1500, 3200, t, 0.45, 0.07, 4, 0.35);
      onde("triangle", 180, 270, t, 0.45, 0.05, 0.35);
    },
    fleche: function (t) {
      onde("triangle", 330, 110, t, 0.18, 0.35);
      bruit("highpass", 3000, 1200, t, 0.25, 0.25, 1, 0.01);
    },
    // Un coup qui porte
    impact: function (t) {
      onde("sine", 160, 38, t, 0.45, 0.8);
      bruit("lowpass", 3000, 300, t, 0.35, 0.6);
      onde("square", 90, 40, t, 0.12, 0.15);
    },
    // La foudre d'Athéna : un claquement, puis le tonnerre qui roule
    foudre: function (t) {
      bruit("highpass", 4000, 1500, t, 0.15, 0.7);
      bruit("lowpass", 1800, 120, t + 0.05, 1.6, 0.9, 0.7, 0.02);
      onde("sine", 70, 30, t, 1.2, 0.6, 0.02);
    },
    // Le monstre se change en pierre : des craquements
    pierre: function (t) {
      for (var k = 0; k < 9; k++) {
        bruit("bandpass", 2500 - k * 150, 1500, t + k * 0.09 + Math.random() * 0.04, 0.05, 0.35, 6);
      }
      bruit("lowpass", 600, 200, t, 0.9, 0.15, 1, 0.4);
    },
    // ... puis la statue s'effondre
    eboulement: function (t) {
      bruit("lowpass", 900, 90, t, 1.1, 0.7, 0.8, 0.02);
      for (var k = 0; k < 6; k++) onde("sine", 120 - k * 10, 40, t + k * 0.08, 0.2, 0.25);
    },
    // La fanfare de la victoire : sol, do, mi, sol... et un do aigu
    victoire: function (t) {
      [392, 523.25, 659.25, 783.99].forEach(function (f, k) {
        onde("triangle", f, f, t + k * 0.11, 0.5, 0.22);
        onde("square", f / 2, f / 2, t + k * 0.11, 0.3, 0.04);
      });
      onde("triangle", 1046.5, 1046.5, t + 0.46, 0.9, 0.2, 0.01);
      onde("sawtooth", 523.25, 523.25, t + 0.46, 0.9, 0.05, 0.02);
    },
    // Un nouveau rang : un arpège qui monte et qui scintille
    niveau: function (t) {
      [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach(function (f, k) {
        onde("sine", f, f, t + k * 0.07, 0.6, 0.18);
        onde("triangle", f * 2, f * 2, t + k * 0.07, 0.3, 0.04);
      });
      bruit("highpass", 6000, 9000, t, 1.2, 0.05, 1, 0.3);
    },
    soin: function (t) {
      onde("sine", 880, 1320, t, 0.35, 0.15, 0.02);
      onde("sine", 1320, 1760, t + 0.1, 0.35, 0.1, 0.02);
    },
    sceau: function (t) {
      onde("triangle", 1567.98, 1567.98, t, 0.4, 0.12);
      onde("triangle", 2093, 2093, t + 0.08, 0.5, 0.1);
    },
    // Les attaques des monstres
    rugissement: function (t) {
      bruit("bandpass", 350, 160, t, 0.9, 0.6, 1.5, 0.08);
      onde("sawtooth", 95, 60, t, 0.9, 0.2, 0.06);
      onde("sawtooth", 97, 62, t, 0.9, 0.16, 0.06);
    },
    galop: function (t) {
      for (var k = 0; k < 4; k++) onde("sine", 110, 50, t + k * 0.09, 0.12, 0.45);
    },
    sifflement: function (t) { bruit("highpass", 5000, 3500, t, 0.6, 0.22, 1, 0.1); },
    feu: function (t) {
      bruit("lowpass", 700, 1600, t, 0.9, 0.55, 0.8, 0.1);
      bruit("bandpass", 300, 500, t, 0.9, 0.3, 1, 0.1);
    },
    rayon: function (t) {
      onde("sawtooth", 600, 1500, t, 0.5, 0.07, 0.05);
      onde("sine", 1200, 2400, t, 0.5, 0.1, 0.05);
    },
    cri: function (t) {
      onde("sawtooth", 900, 1500, t, 0.25, 0.1, 0.02);
      onde("sawtooth", 1500, 700, t + 0.2, 0.3, 0.1, 0.02);
    },
    lancer: function (t) { bruit("bandpass", 300, 900, t, 0.35, 0.3, 1, 0.1); },
    // Talos est touché
    degat: function (t) {
      onde("square", 220, 70, t, 0.22, 0.22);
      bruit("lowpass", 2500, 400, t, 0.25, 0.5);
      onde("sine", 120, 50, t, 0.3, 0.5);
    },
    // Un cœur qui se brise
    coeur: function (t) {
      onde("triangle", 1200, 600, t, 0.15, 0.12);
      bruit("highpass", 7000, 4000, t, 0.25, 0.15);
      onde("triangle", 800, 400, t + 0.06, 0.2, 0.08);
    },
    // Une nouvelle manche du combat : un coup de tambour et une note de cor
    manche: function (t) {
      onde("sine", 92, 55, t, 0.6, 0.6);
      bruit("lowpass", 420, 90, t, 0.45, 0.35);
      onde("triangle", 196, 196, t + 0.03, 0.75, 0.07, 0.04);
      onde("triangle", 293.66, 293.66, t + 0.03, 0.75, 0.05, 0.04);
    },
    // Talos esquive : un souffle qui file
    esquive: function (t) {
      bruit("bandpass", 600, 3200, t, 0.32, 0.4, 1.4, 0.03);
      onde("sine", 520, 980, t, 0.22, 0.06, 0.02);
    },
    // Le sablier : un petit tic (les dernières secondes), puis le gong du temps écoulé
    tic: function (t) {
      onde("square", 1900, 1900, t, 0.025, 0.05);
      bruit("highpass", 6500, 6500, t, 0.03, 0.08);
    },
    gong: function (t) {
      onde("sine", 110, 104, t, 2.0, 0.45, 0.005);
      onde("sine", 221, 214, t, 1.5, 0.22, 0.005);
      onde("sine", 333, 322, t, 1.1, 0.1, 0.005);
      bruit("bandpass", 900, 500, t, 0.5, 0.14, 3, 0.005);
    },
    // Le boss surgit : un grondement immense, puis trois coups de tambour
    boss: function (t) {
      bruit("lowpass", 90, 420, t, 1.6, 0.7, 1, 0.4);
      onde("sawtooth", 41, 55, t + 0.2, 1.4, 0.22, 0.2);
      onde("sawtooth", 41.5, 55.5, t + 0.2, 1.4, 0.18, 0.2);
      for (var k = 0; k < 3; k++) onde("sine", 75, 40, t + 1.0 + k * 0.2, 0.28, 0.6);
    },
    // Les sandales d'Hermès : des battements d'ailes et un sifflement qui monte
    envol: function (t) {
      for (var k = 0; k < 2; k++) bruit("bandpass", 700, 2100, t + k * 0.12, 0.18, 0.3, 1.2, 0.03);
      onde("sine", 660, 1320, t, 0.45, 0.07, 0.05);
    },
    // Un monstre de la salle a vu Talos
    alerte: function (t) {
      onde("triangle", 880, 1320, t, 0.12, 0.12);
      onde("triangle", 1320, 1320, t + 0.1, 0.16, 0.1);
    },
    // Talos à terre : quatre notes qui descendent
    ko: function (t) {
      [392, 349.23, 311.13, 261.63].forEach(function (f, k) {
        onde("triangle", f, f * 0.98, t + k * 0.22, 0.4, 0.18, 0.02);
      });
      onde("sine", 130.81, 65, t + 0.9, 1.2, 0.25, 0.05);
    }
  };

  // Joue un bruitage (éventuellement un peu plus tard : retard en secondes).
  function jouer(nom, retard) {
    if (!actif || !RECETTES[nom]) return;
    var c = contexte();
    if (!c) return;
    try { RECETTES[nom](c.currentTime + 0.01 + (retard || 0)); } catch (e) { }
  }

  function activer(oui) {
    actif = !!oui;
    try { window.localStorage.setItem(CLE, actif ? "oui" : "non"); } catch (e) { }
    if (ac) {
      if (!actif && ac.suspend) ac.suspend();
      if (actif && ac.resume) ac.resume();
    }
  }

  return { jouer: jouer, activer: activer, estActif: function () { return actif; } };
})();
