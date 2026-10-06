// =====================================================================
//  AMBIANCES (3/3) : bord de mer, montagnes dans la brume, sanctuaire
// =====================================================================

(function () {
  var O = Decor.outils;

  // Un navire grec à voile carrée et à rames ; sens = 1 vers la droite.
  function navire(ctx, x, y, s, sens, tps) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(sens, 1);
    ctx.fillStyle = "#4a3020";
    ctx.beginPath();
    ctx.moveTo(-s * 1.1, -s * 0.05);
    ctx.lineTo(s * 1.0, -s * 0.05);
    ctx.quadraticCurveTo(s * 1.25, -s * 0.15, s * 1.3, -s * 0.38);
    ctx.lineTo(s * 0.9, s * 0.18);
    ctx.lineTo(-s * 0.9, s * 0.18);
    ctx.quadraticCurveTo(-s * 1.2, s * 0.05, -s * 1.1, -s * 0.05);
    ctx.fill();
    ctx.fillStyle = "#c9a35a";
    ctx.fillRect(-s * 0.9, 0, s * 1.8, Math.max(1, s * 0.04));
    ctx.fillStyle = "#3a2618";
    ctx.fillRect(-s * 0.03, -s * 1.2, s * 0.06, s * 1.15);
    var gonfle = s * 0.15 * (1 + 0.2 * Math.sin(tps * 1.5));
    ctx.fillStyle = "#f4ead2";
    ctx.beginPath();
    ctx.moveTo(-s * 0.6, -s * 1.1);
    ctx.lineTo(s * 0.6, -s * 1.1);
    ctx.quadraticCurveTo(s * 0.6 + gonfle, -s * 0.7, s * 0.55, -s * 0.3);
    ctx.lineTo(-s * 0.55, -s * 0.3);
    ctx.quadraticCurveTo(-s * 0.6 + gonfle, -s * 0.7, -s * 0.6, -s * 1.1);
    ctx.fill();
    ctx.fillStyle = "#a8482f";
    ctx.fillRect(-s * 0.58, -s * 0.78, s * 1.16, s * 0.1);
    ctx.strokeStyle = "#3a2618";
    ctx.lineWidth = Math.max(1, s * 0.03);
    ctx.beginPath();
    for (var k = 0; k < 6; k++) {
      var ox = -s * 0.7 + k * s * 0.28;
      ctx.moveTo(ox, s * 0.12);
      ctx.lineTo(ox - s * 0.12 - Math.sin(tps * 3 + k) * s * 0.06, s * 0.4);
    }
    ctx.stroke();
    ctx.restore();
  }

  // -------------------------------------------------------------------
  //  MER : la côte de Syracuse, vagues, navire, mouettes, colosse
  // -------------------------------------------------------------------
  Decor.ajouterAmbiance("mer", {
    materiau: "calcaire", frise: "flots", couleurFrise: "#2f6f8f",
    lierre: 0, densite: 0.35,
    objets: [["coquillage", 3], ["algue", 3], ["rocher", 2], ["amphore", 1]],
    verdure: { herbe: "#6b8a4a", feuille: "#4f7a3a", clair: "#77a35a", fleur: "#f3eee0", roche: "#a99f86" },
    vignette: "rgba(10,30,50,0.15)",

    fabriquer: function (p) {
      var ctx = p.loin, t = p.t, W = p.W, H = p.H, M = p.M, rnd = p.rnd, i;
      var hz = H * 0.56;
      ctx.fillStyle = O.degradeV(ctx, 0, hz, [[0, "#5aa6d9"], [0.7, "#a8d3ec"], [1, "#e6f2f2"]]);
      ctx.fillRect(-M, 0, W + 2 * M, hz);
      var sx = O.entre(rnd, 0.2, 0.8) * W, sy = H * O.entre(rnd, 0.14, 0.24);
      O.lueur(ctx, sx, sy, t * 4.5, "255,250,225", 0.7);
      ctx.fillStyle = "#fffbe8";
      O.disque(ctx, sx, sy, t * 0.6);

      // La mer, et le reflet du soleil
      ctx.fillStyle = O.degradeV(ctx, hz, H, [[0, "#5ea9cc"], [0.35, "#2e80ab"], [1, "#1b5a82"]]);
      ctx.fillRect(-M, hz, W + 2 * M, H - hz);
      ctx.fillStyle = O.degradeV(ctx, hz, H, [[0, "rgba(255,250,220,0.45)"], [1, "rgba(255,250,220,0)"]]);
      ctx.beginPath();
      ctx.moveTo(sx - t * 0.4, hz); ctx.lineTo(sx + t * 0.4, hz); ctx.lineTo(sx + t * 1.6, H); ctx.lineTo(sx - t * 1.6, H);
      ctx.closePath();
      ctx.fill();

      // Une île lointaine et son temple, d'autres îles
      var ix = O.entre(rnd, 0.1, 0.9) * W;
      ctx.fillStyle = "#86a3ae";
      ctx.beginPath(); ctx.ellipse(ix, hz, t * 3.2, t * 0.9, 0, Math.PI, 0); ctx.fill();
      O.petitTemple(ctx, ix, hz - t * 0.75, t * 1.6, t * 1.0, "#c9d8de", 5, []);
      ctx.fillStyle = "#9ab4be";
      for (i = 0; i < 2; i++) {
        ctx.beginPath();
        ctx.ellipse(O.entre(rnd, -M, W + M), hz, t * O.entre(rnd, 1.2, 2.2), t * O.entre(rnd, 0.3, 0.5), 0, Math.PI, 0);
        ctx.fill();
      }
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.fillRect(-M, hz - 0.5, W + 2 * M, 1);

      // Un colosse de bronze sur son rocher, flambeau levé
      var cx = (ix + W * 0.5) % W;
      ctx.fillStyle = "#5d6660";
      ctx.beginPath();
      ctx.moveTo(cx - t * 1.6, hz + t * 1.4);
      ctx.quadraticCurveTo(cx - t * 1.2, hz + t * 0.2, cx, hz + t * 0.15);
      ctx.quadraticCurveTo(cx + t * 1.3, hz + t * 0.2, cx + t * 1.7, hz + t * 1.4);
      ctx.closePath();
      ctx.fill();
      var hc = t * 4.2, u = hc / 10;
      O.statue(ctx, cx, hz + t * 0.25, hc, "flambeau", { clair: "#d0a46a", base: "#a87a45", ombre: "#6e4c2a" }, 1);
      p.flambeau = { x: cx + 1.3 * u, y: hz + t * 0.25 - 10.4 * u, ph: rnd() * 6 };

      // Milieu : rivage rocheux, colonnes d'un temple, pin parasol
      var m = p.mil, sol = p.sol;
      O.crete(m, -M, W + M, H, sol - t * 0.4, t * 0.9, rnd, "rond", 8);
      m.fillStyle = "#b8ab88";
      m.fill();
      O.crete(m, -M, W + M, H, sol + t * 0.1, t * 0.5, rnd, "pointu", 8);
      m.fillStyle = "#a39573";
      m.fill();
      var tx = O.entre(rnd, 0.1, 0.7) * W, calc = { clair: "#fffaf0", base: "#e5dcc4", ombre: "#b5aa8c" };
      for (i = 0; i < 3; i++) O.colonne(m, tx + i * t * 1.6, sol - t * 5, sol - t * 0.2, t * 0.75, calc, i === 2 ? 0.6 : 0);
      m.fillStyle = "#e5dcc4";
      m.fillRect(tx - t * 0.6, sol - t * 5.35, t * 2.4, t * 0.45);
      O.pinParasol(m, O.entre(rnd, 0.05, 0.95) * W, sol, t * 5, "#6b5340", "#3f6a3a", "#5a8a4a", rnd);

      p.nuages = O.creerNuages(p, 3, "rgba(255,255,255,0.95)", "rgba(210,225,235,0.9)", t * 1.2, H * 0.25, false);
      p.mouettes = O.creerVols(p, 3, H * 0.12, H * 0.42);
      p.reflets = [];
      for (i = 0; i < 28; i++) {
        var w = rnd();
        p.reflets.push({ x: sx + (rnd() - 0.5) * (t * 0.8 + w * t * 3.2), y: hz + w * (H - hz), ph: rnd() * 6.28, v: O.entre(rnd, 2, 4) });
      }
      p.navire = { x: rnd() * W, v: t * O.entre(rnd, 0.25, 0.4) * (rnd() < 0.5 ? 1 : -1), y: hz + t * 0.55 };
      p.vagues = [];
      for (i = 0; i < 9; i++) {
        var f = (i + 1) / 9;
        p.vagues.push({ y: hz + (H - hz) * f * f * 0.95 + t * 0.1, a: t * (0.03 + 0.06 * f), L: t * (0.3 + 0.9 * f), v: O.entre(rnd, 0.6, 1.2), ph: rnd() });
      }
    },

    ciel: function (ctx, p, tps) {
      var t = p.t, i;
      O.effetNuages(ctx, p, tps, p.nuages);
      // Vagues : de petites crêtes qui avancent et scintillent
      ctx.lineWidth = Math.max(1, t * 0.03);
      ctx.lineCap = "round";
      for (i = 0; i < p.vagues.length; i++) {
        var v = p.vagues[i], pas = v.L * 2.4, dec = (tps * v.v * t * 0.25 + v.ph * pas) % pas;
        for (var x = -p.M - pas + dec; x < p.W + p.M; x += pas) {
          var a = 0.12 + 0.2 * (0.5 + 0.5 * Math.sin(tps * 1.3 + x * 0.05 + i));
          ctx.strokeStyle = "rgba(255,255,255," + a.toFixed(3) + ")";
          ctx.beginPath();
          ctx.moveTo(x - v.L / 2, v.y);
          ctx.quadraticCurveTo(x, v.y - v.a * 2, x + v.L / 2, v.y);
          ctx.stroke();
        }
      }
      // Reflets du soleil sur l'eau
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (i = 0; i < p.reflets.length; i++) {
        var r = p.reflets[i], b = Math.pow(Math.max(0, Math.sin(tps * r.v + r.ph)), 6);
        if (b < 0.05) continue;
        ctx.fillStyle = "rgba(255,250,220," + b.toFixed(3) + ")";
        ctx.fillRect(r.x - t * 0.12, r.y, t * 0.24, Math.max(1, t * 0.03));
      }
      ctx.restore();
      // Le navire, les mouettes, la flamme du colosse
      var n = p.navire;
      var nx = O.boucler(n.x + tps * n.v, -3 * t, p.W + 6 * t);
      navire(ctx, nx, n.y + Math.sin(tps * 1.2) * t * 0.04, t * 0.9, n.v > 0 ? 1 : -1, tps);
      O.effetVols(ctx, p, tps, p.mouettes, "rgba(255,255,255,0.92)");
      O.flamme(ctx, p.flambeau.x, p.flambeau.y, t * 0.12, tps, p.flambeau.ph);
    }
  });

  // Un pavillon chinois à deux toits recourbés.
  function pavillon(ctx, cx, bas, l, bois, toit) {
    function unToit(x, y, w, h) {
      ctx.fillStyle = toit;
      ctx.beginPath();
      ctx.moveTo(x - w / 2 - w * 0.1, y - h * 0.25);
      ctx.quadraticCurveTo(x - w * 0.32, y - h * 0.1, x - w * 0.18, y - h);
      ctx.lineTo(x + w * 0.18, y - h);
      ctx.quadraticCurveTo(x + w * 0.32, y - h * 0.1, x + w / 2 + w * 0.1, y - h * 0.25);
      ctx.lineTo(x + w / 2 - w * 0.02, y);
      ctx.lineTo(x - w / 2 + w * 0.02, y);
      ctx.closePath();
      ctx.fill();
    }
    ctx.fillStyle = bois;
    ctx.fillRect(cx - l * 0.36, bas - l * 0.5, l * 0.07, l * 0.5);
    ctx.fillRect(cx + l * 0.29, bas - l * 0.5, l * 0.07, l * 0.5);
    ctx.fillRect(cx - l * 0.44, bas - l * 0.05, l * 0.88, l * 0.05);
    unToit(cx, bas - l * 0.5, l, l * 0.26);
    ctx.fillStyle = bois;
    ctx.fillRect(cx - l * 0.2, bas - l * 0.86, l * 0.4, l * 0.12);
    unToit(cx, bas - l * 0.84, l * 0.68, l * 0.22);
    ctx.fillStyle = toit;
    ctx.fillRect(cx - l * 0.02, bas - l * 1.18, l * 0.04, l * 0.14);
  }

  // Une bande de brume : un ovale flou qui dérive lentement.
  function brume(ctx, x, y, l, h, a) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(l / 2, h / 2);
    var g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    g.addColorStop(0, "rgba(240,236,224," + a + ")");
    g.addColorStop(1, "rgba(240,236,224,0)");
    ctx.fillStyle = g;
    ctx.fillRect(-1, -1, 2, 2);
    ctx.restore();
  }

  function creerBrumes(p, n, y0, y1) {
    var liste = [], t = p.t, rnd = p.rnd;
    for (var i = 0; i < n; i++) {
      liste.push({ y: O.entre(rnd, y0, y1), l: t * O.entre(rnd, 6, 10), h: t * O.entre(rnd, 0.8, 1.5), x: rnd() * p.W,
                   v: t * O.entre(rnd, 0.1, 0.25) * (rnd() < 0.5 ? 1 : -1), a: O.entre(rnd, 0.3, 0.55).toFixed(2) });
    }
    return liste;
  }

  function effetBrumes(ctx, p, tps, liste) {
    for (var i = 0; i < liste.length; i++) {
      var b = liste[i];
      var x = O.boucler(b.x + tps * b.v, -p.M - b.l / 2, p.W + 2 * p.M + b.l);
      brume(ctx, x, b.y, b.l, b.h, b.a);
    }
  }

  // -------------------------------------------------------------------
  //  BRUMES : pitons dans la brume (peinture à l'encre), pins, pavillon
  // -------------------------------------------------------------------
  Decor.ajouterAmbiance("brumes", {
    materiau: "pierreBrume", frise: "nuages", couleurFrise: "#5d6b52",
    lierre: 0.45, densite: 0.4,
    objets: [["fougere", 3], ["herbe", 3], ["rocher", 2], ["fleurs", 1]],
    verdure: { herbe: "#5f7d55", feuille: "#3f5a3c", clair: "#5f7d55", fleur: "#e7a3b5", fleur2: "#f3eee0", roche: "#7d877a" },
    vignette: "rgba(60,70,60,0.15)",

    fabriquer: function (p) {
      var ctx = p.loin, t = p.t, W = p.W, H = p.H, M = p.M, rnd = p.rnd, i;
      ctx.fillStyle = O.degradeV(ctx, 0, H, [[0, "#e9e3d2"], [0.6, "#e0e0d4"], [1, "#d3dad0"]]);
      ctx.fillRect(-M, 0, W + 2 * M, H);
      ctx.fillStyle = "rgba(200,70,50,0.8)";
      O.disque(ctx, O.entre(rnd, 0.15, 0.85) * W, H * O.entre(rnd, 0.14, 0.26), t * 0.55);

      var couches = [
        { base: 0.6, amp: 3.8, c: "rgba(120,135,128,0.38)" },
        { base: 0.68, amp: 3.2, c: "rgba(98,113,106,0.5)" },
        { base: 0.77, amp: 2.6, c: "rgba(74,89,82,0.68)" },
        { base: 0.88, amp: 1.8, c: "rgba(52,64,58,0.85)" }
      ];
      for (i = 0; i < couches.length; i++) {
        var c = couches[i], yb = H * c.base;
        var pts = O.crete(ctx, -M, W + M, H, yb, t * c.amp, rnd, "karst", 5);
        ctx.fillStyle = c.c;
        ctx.fill();
        if (i === 1) {
          // Une cascade qui tombe d'un des plus hauts pitons
          var haut = null;
          pts.forEach(function (q) { if (q[0] > W * 0.15 && q[0] < W * 0.85 && (!haut || q[1] < haut[1])) haut = q; });
          if (haut) p.cascade = { x: haut[0], y0: haut[1] + t * 0.4, y1: yb };
        }
        ctx.fillStyle = O.degradeV(ctx, yb - t * 1.6, yb + t * 0.4, [[0, "rgba(236,230,214,0)"], [1, "rgba(236,230,214,0.85)"]]);
        ctx.fillRect(-M, yb - t * 1.6, W + 2 * M, t * 2.0);
      }
      if (p.cascade) {
        ctx.fillStyle = "rgba(248,248,242,0.75)";
        ctx.fillRect(p.cascade.x - t * 0.06, p.cascade.y0, t * 0.12, p.cascade.y1 - p.cascade.y0);
      }

      // Milieu : rocher et pavillon, pins, bambous
      var m = p.mil, sol = p.sol;
      var px = O.entre(rnd, 0.1, 0.9) * W;
      m.fillStyle = "#4a5a50";
      m.beginPath();
      m.moveTo(px - t * 2, sol + t);
      m.quadraticCurveTo(px - t * 1.8, sol - t * 2.6, px - t * 0.4, sol - t * 2.9);
      m.quadraticCurveTo(px + t * 1.5, sol - t * 3.0, px + t * 2.1, sol + t);
      m.closePath();
      m.fill();
      pavillon(m, px, sol - t * 2.85, t * 1.9, "#7a2f22", "#2f3a33");
      for (i = 0; i < 2; i++) O.pinChinois(m, O.entre(rnd, 0, W), sol, t * O.entre(rnd, 3.2, 4.4), "#3b3226", "#2f3d33", rnd);
      O.bambous(m, O.entre(rnd, 0, W), sol, t * O.entre(rnd, 3, 4), "#4f6a45", rnd);

      p.brumes = creerBrumes(p, 4, H * 0.35, H * 0.8);
      p.brumesBas = creerBrumes(p, 2, H * 0.82, H * 0.95);
      p.grues = O.creerVols(p, 2, H * 0.1, H * 0.35);
      p.petales = O.creerPoints(p, 8, 0, W, 0, H);
    },

    ciel: function (ctx, p, tps) {
      var t = p.t;
      if (p.cascade) {
        var c = p.cascade;
        for (var k = 0; k < 6; k++) {
          var u = O.boucler(tps * 0.8 + k / 6, 0, 1);
          ctx.fillStyle = "rgba(255,255,255," + (0.7 * Math.sin(Math.PI * u)).toFixed(3) + ")";
          ctx.fillRect(c.x - t * 0.05, c.y0 + u * (c.y1 - c.y0), t * 0.1, t * 0.28);
        }
      }
      effetBrumes(ctx, p, tps, p.brumes);
      O.effetVols(ctx, p, tps, p.grues, "rgba(40,45,40,0.75)");
    },

    milieu: function (ctx, p, tps) {
      effetBrumes(ctx, p, tps, p.brumesBas);
    },

    avant: function (ctx, p, tps) {
      O.effetFeuilles(ctx, p, tps, p.petales, ["#f2b8c6", "#f7d4dc", "#ffffff"]);
    }
  });

  // Le grand diagramme lumineux du sanctuaire : cercles, étoile à six
  // branches, hexagone et spirale d'or. rot : sa rotation.
  function diagramme(ctx, cx, cy, R, rot) {
    function trace(largeur, couleur) {
      var k, a, x, y;
      ctx.strokeStyle = couleur;
      ctx.lineWidth = largeur;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, O.PI2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, R * 0.62, 0, O.PI2); ctx.stroke();
      for (var tri = 0; tri < 2; tri++) {
        ctx.beginPath();
        for (k = 0; k < 3; k++) {
          a = rot + tri * Math.PI / 3 + k * O.PI2 / 3;
          x = cx + Math.cos(a) * R; y = cy + Math.sin(a) * R;
          if (k === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }
      ctx.beginPath();
      for (k = 0; k < 6; k++) {
        a = rot + k * Math.PI / 3 + Math.PI / 6;
        x = cx + Math.cos(a) * R * 0.62; y = cy + Math.sin(a) * R * 0.62;
        if (k === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      for (var s = 0; s <= 100; s++) {
        var th = s / 100 * Math.PI * 4.5, r = R * 0.6 * Math.exp(-0.306 * (Math.PI * 4.5 - th));
        x = cx + Math.cos(th - rot) * r; y = cy + Math.sin(th - rot) * r;
        if (s === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    trace(Math.max(4, R * 0.06), "rgba(95,209,255,0.12)");
    trace(Math.max(1, R * 0.012), "rgba(150,230,255,0.6)");
    ctx.fillStyle = "rgba(226,178,76,0.9)";
    for (var v = 0; v < 6; v++) {
      var b = rot + v * Math.PI / 3;
      O.disque(ctx, cx + Math.cos(b) * R, cy + Math.sin(b) * R, Math.max(1.5, R * 0.03));
    }
  }

  // Un amas de cristaux qui sort du sol.
  function amas(ctx, x, bas, s, rnd) {
    var c = rnd() < 0.5 ? ["#3fb7e6", "#9be6ff", "#1f6f92"] : ["#8a5ee0", "#d3c0ff", "#4f2f8f"];
    for (var i = 0; i < 5; i++) {
      var a = (i - 2) * 0.28 + O.entre(rnd, -0.1, 0.1), h = s * O.entre(rnd, 0.6, 1.3), l = s * 0.16;
      ctx.save();
      ctx.translate(x + (i - 2) * s * 0.18, bas);
      ctx.rotate(a);
      ctx.fillStyle = c[2];
      ctx.beginPath(); ctx.moveTo(-l, 0); ctx.lineTo(-l, -h * 0.78); ctx.lineTo(0, -h); ctx.lineTo(l, -h * 0.78); ctx.lineTo(l, 0); ctx.closePath(); ctx.fill();
      ctx.fillStyle = c[0];
      ctx.beginPath(); ctx.moveTo(-l * 0.4, 0); ctx.lineTo(-l * 0.4, -h * 0.8); ctx.lineTo(0, -h); ctx.lineTo(l, -h * 0.78); ctx.lineTo(l, 0); ctx.closePath(); ctx.fill();
      ctx.fillStyle = c[1];
      ctx.beginPath(); ctx.moveTo(-l * 0.4, -h * 0.8); ctx.lineTo(0, -h); ctx.lineTo(l * 0.15, -h * 0.4); ctx.closePath(); ctx.fill();
      ctx.restore();
    }
  }

  // -------------------------------------------------------------------
  //  SANCTUAIRE : grotte secrète, diagramme lumineux, cristaux, symboles
  // -------------------------------------------------------------------
  Decor.ajouterAmbiance("sanctuaire", {
    materiau: "basalte", frise: "runes", couleurFrise: "#8fe3ff",
    lierre: 0, stalactites: 0.35, densite: 0.3,
    objets: [["cristal", 3], ["champignon", 2], ["rocher", 1]],
    verdure: { herbe: "#3f6a62", feuille: "#2a4a48", clair: "#3f6a62", fleur: "#9fd8ff", roche: "#2c3140",
               champignon: "#7fffd0", lueurChampignon: "120,255,200" },
    vignette: "rgba(0,0,10,0.5)",
    sombre: true,

    fabriquer: function (p) {
      var ctx = p.loin, t = p.t, W = p.W, H = p.H, M = p.M, rnd = p.rnd, i;
      ctx.fillStyle = O.degradeV(ctx, 0, H, [[0, "#07060f"], [0.5, "#151027"], [1, "#1f1835"]]);
      ctx.fillRect(-M, 0, W + 2 * M, H);
      for (i = 0; i < 18; i++) {
        var rr = t * O.entre(rnd, 1.5, 3.5);
        ctx.fillStyle = rnd() < 0.5 ? "rgba(0,0,0,0.25)" : "rgba(80,70,120,0.08)";
        O.ovale(ctx, O.entre(rnd, -M, W + M), O.entre(rnd, 0, H), rr, rr * 0.7, rnd());
      }
      p.diagramme = { x: W * O.entre(rnd, 0.35, 0.65), y: H * 0.44, r: t * 3.3, rot: rnd() * Math.PI };

      // Milieu : stalactites, stalagmites et cristaux
      var m = p.mil, sol = p.sol;
      for (i = 0; i < 16; i++) {
        var sx = O.entre(rnd, -M, W + M), sl = t * O.entre(rnd, 0.6, 2.2), sw = t * O.entre(rnd, 0.25, 0.6);
        m.fillStyle = "#1a1528";
        m.beginPath(); m.moveTo(sx - sw, 0); m.lineTo(sx, sl + t); m.lineTo(sx + sw, 0); m.closePath(); m.fill();
      }
      for (i = 0; i < 10; i++) {
        var gx = O.entre(rnd, -M, W + M), gl = t * O.entre(rnd, 0.6, 1.8), gw = t * O.entre(rnd, 0.3, 0.6);
        m.fillStyle = "#171225";
        m.beginPath(); m.moveTo(gx - gw, sol + t); m.lineTo(gx, sol - gl); m.lineTo(gx + gw, sol + t); m.closePath(); m.fill();
      }
      p.cristaux = [];
      for (i = 0; i < 5; i++) {
        var kx = O.entre(rnd, 0.05, 0.95) * W;
        amas(m, kx, sol, t * O.entre(rnd, 0.7, 1.2), rnd);
        p.cristaux.push({ x: kx, y: sol - t * 0.5, ph: rnd() * 6, c: rnd() < 0.5 ? "95,209,255" : "167,123,255" });
      }
      p.symboles = O.creerPoints(p, 12, 0, W, 0, H);
      p.etincelles = O.creerPoints(p, 10, 0, W, t, H - t);
    },

    ciel: function (ctx, p, tps) {
      var d = p.diagramme;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      O.lueur(ctx, d.x, d.y, d.r * 1.4, "95,209,255", (0.08 + 0.05 * Math.sin(tps * 0.8)).toFixed(3));
      diagramme(ctx, d.x, d.y, d.r, d.rot + tps * 0.04);
      ctx.restore();
    },

    milieu: function (ctx, p, tps) {
      var t = p.t;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (var i = 0; i < p.cristaux.length; i++) {
        var c = p.cristaux[i];
        O.lueur(ctx, c.x, c.y, t * (1.6 + 0.3 * Math.sin(tps * 1.5 + c.ph)), c.c, (0.22 + 0.1 * Math.sin(tps * 2 + c.ph)).toFixed(3));
      }
      ctx.restore();
    },

    avant: function (ctx, p, tps) {
      O.effetSymboles(ctx, p, tps, p.symboles, "150,230,255");
      O.effetLucioles(ctx, p, tps, p.etincelles, "226,190,110");
    }
  });
})();
