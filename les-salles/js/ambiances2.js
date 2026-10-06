// =====================================================================
//  AMBIANCES (2/3) : nuit étoilée, bibliothèque, orient
// =====================================================================

(function () {
  var O = Decor.outils;

  // -------------------------------------------------------------------
  //  NUIT : ciel étoilé, lune, constellations, étoiles filantes
  // -------------------------------------------------------------------
  Decor.ajouterAmbiance("nuit", {
    materiau: "pierreLune", frise: "etoiles", couleurFrise: "#c9b06a",
    lierre: 0.15, densite: 0.3,
    objets: [["herbe", 4], ["lys", 2], ["rocher", 2], ["champignon", 1]],
    verdure: { herbe: "#3f6a62", feuille: "#2a4a48", clair: "#3f6a62", fleur: "#e9eeff",
               roche: "#5d6683", champignon: "#9fd8ff", lueurChampignon: "150,210,255" },
    vignette: "rgba(0,0,20,0.45)",
    sombre: true,

    fabriquer: function (p) {
      var ctx = p.loin, t = p.t, W = p.W, H = p.H, M = p.M, rnd = p.rnd, i, q;
      ctx.fillStyle = O.degradeV(ctx, 0, H, [[0, "#050a1c"], [0.5, "#0f1a40"], [0.8, "#1f2b5c"], [1, "#2a3566"]]);
      ctx.fillRect(-M, 0, W + 2 * M, H);

      // La Voie lactée : une bande de poussière d'étoiles
      var ax = -M, ay = H * O.entre(rnd, 0.05, 0.25), bx = W + M, by = H * O.entre(rnd, 0.35, 0.55);
      if (rnd() < 0.5) { var echange = ay; ay = by; by = echange; }
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (i = 0; i < 14; i++) {
        var u = i / 13;
        O.lueur(ctx, ax + (bx - ax) * u, ay + (by - ay) * u + O.entre(rnd, -0.5, 0.5) * t, t * O.entre(rnd, 1.5, 2.6), "150,160,255", 0.06);
      }
      for (i = 0; i < 450; i++) {
        var v = rnd(), ecart = (rnd() + rnd() + rnd() - 1.5) * t * 1.6;
        ctx.fillStyle = "rgba(220,225,255," + O.entre(rnd, 0.1, 0.5).toFixed(2) + ")";
        ctx.fillRect(ax + (bx - ax) * v, ay + (by - ay) * v + ecart, 1, 1);
      }
      ctx.restore();
      for (i = 0; i < 160; i++) {
        var r = O.entre(rnd, 0.5, 1.3);
        ctx.fillStyle = "rgba(255,250,235," + O.entre(rnd, 0.2, 0.8).toFixed(2) + ")";
        ctx.fillRect(O.entre(rnd, -M, W + M), O.entre(rnd, 0, H * 0.72), r, r);
      }

      // La lune et ses cratères
      var mx = O.entre(rnd, 0.15, 0.85) * W, my = H * O.entre(rnd, 0.15, 0.3);
      O.lueur(ctx, mx, my, t * 4, "200,210,255", 0.25);
      ctx.fillStyle = "#f3efd8";
      O.disque(ctx, mx, my, t * 0.8);
      ctx.fillStyle = "rgba(150,150,175,0.28)";
      O.disque(ctx, mx - t * 0.25, my - t * 0.15, t * 0.18);
      O.disque(ctx, mx + t * 0.2, my + t * 0.22, t * 0.13);
      O.disque(ctx, mx + t * 0.28, my - t * 0.25, t * 0.08);
      O.disque(ctx, mx - t * 0.1, my + t * 0.35, t * 0.07);

      // Deux constellations géométriques (triangle, quadrilatère, ligne brisée, pentagone)
      var figures = O.melanger([
        { pts: [[0, 0], [1.6, -0.4], [0.9, 1.2]], ferme: true },
        { pts: [[0, 0], [1.4, 0.1], [1.5, 1.3], [0.1, 1.2]], ferme: true },
        { pts: [[0, 0], [0.8, 0.7], [1.6, 0.1], [2.4, 0.8], [3.2, 0.2]], ferme: false },
        { pts: [[0, 0], [1.0, -0.6], [2.0, 0], [1.6, 1.1], [0.4, 1.1]], ferme: true }
      ], rnd);
      p.etoiles = [];
      for (var f = 0; f < 2; f++) {
        var ox = O.entre(rnd, 0.08, 0.75) * W, oy = H * O.entre(rnd, 0.06, 0.38), e = t * O.entre(rnd, 1.1, 1.5);
        if (Math.abs(ox - mx) < t * 4 && Math.abs(oy - my) < t * 3) ox = (ox + W * 0.45) % (W * 0.8);
        var fig = figures[f];
        ctx.strokeStyle = "rgba(150,175,255,0.35)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (q = 0; q < fig.pts.length; q++) {
          var sx = ox + fig.pts[q][0] * e, sy = oy + fig.pts[q][1] * e;
          if (q === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
          p.etoiles.push({ x: sx, y: sy, ph: rnd() * 6.28, v: rnd(), s: 0.8 + rnd() * 0.2 });
        }
        if (fig.ferme) ctx.closePath();
        ctx.stroke();
      }
      for (i = 0; i < 30; i++) p.etoiles.push({ x: O.entre(rnd, 0, W), y: O.entre(rnd, 0, H * 0.6), ph: rnd() * 6.28, v: rnd(), s: rnd() * 0.85 });

      // Collines et observatoire
      O.crete(ctx, -M, W + M, H, H * 0.76, t * 1.1, rnd, "rond", 6);
      ctx.fillStyle = "#0d1430";
      ctx.fill();
      var bx2 = O.entre(rnd, 0.1, 0.9) * W, by2 = H * 0.7;
      ctx.fillRect(bx2 - t * 0.9, by2 - t * 0.8, t * 1.8, t * 1.6);
      ctx.beginPath();
      ctx.arc(bx2, by2 - t * 0.8, t * 0.9, Math.PI, 0);
      ctx.fill();
      ctx.strokeStyle = "#3a4a8a";
      ctx.lineWidth = Math.max(1, t * 0.06);
      ctx.beginPath(); ctx.moveTo(bx2, by2 - t * 1.7); ctx.lineTo(bx2, by2 - t * 0.8); ctx.stroke();
      ctx.fillStyle = "#ffcf7a";
      ctx.fillRect(bx2 - t * 0.5, by2 - t * 0.4, t * 0.18, t * 0.25);
      ctx.fillRect(bx2 + t * 0.3, by2 - t * 0.4, t * 0.18, t * 0.25);
      O.lueur(ctx, bx2, by2 - t * 0.3, t * 1.2, "255,200,120", 0.12);

      // Milieu : colonnes sombres, astronome à la sphère, sphère armillaire
      var m = p.mil, sol = p.sol;
      var sombre = { clair: "#2b3566", base: "#1a2142", ombre: "#10152c" };
      for (i = 0; i < 3; i++) {
        O.colonne(m, O.entre(rnd, 0, W), sol - t * O.entre(rnd, 4, 7), sol, t * 0.8, sombre, rnd() < 0.5 ? O.entre(rnd, 0.6, 0.95) : 0);
      }
      O.statue(m, O.entre(rnd, 0.1, 0.9) * W, sol, t * 4.6, "sphere", { clair: "#3a4680", base: "#222a52", ombre: "#141a36" }, rnd() < 0.5 ? 1 : -1);
      var ax2 = O.entre(rnd, 0.1, 0.9) * W, ay2 = sol - t * 2.4;
      m.fillStyle = "#1a2142";
      m.fillRect(ax2 - t * 0.1, ay2, t * 0.2, t * 2.4);
      m.fillRect(ax2 - t * 0.5, sol - t * 0.2, t * 1.0, t * 0.2);
      m.strokeStyle = "#3a4a8a";
      m.lineWidth = Math.max(1.5, t * 0.07);
      m.beginPath(); m.arc(ax2, ay2 - t * 0.7, t * 0.75, 0, O.PI2); m.stroke();
      m.beginPath(); m.ellipse(ax2, ay2 - t * 0.7, t * 0.75, t * 0.25, 0.4, 0, O.PI2); m.stroke();
      m.beginPath(); m.ellipse(ax2, ay2 - t * 0.7, t * 0.25, t * 0.75, 0, 0, O.PI2); m.stroke();
      m.fillStyle = "#e2b24c";
      O.disque(m, ax2, ay2 - t * 0.7, t * 0.1);

      p.motes = O.creerPoints(p, 10, 0, W, t * 2, H - t * 2);
    },

    ciel: function (ctx, p, tps) {
      O.effetScintillement(ctx, p, tps, p.etoiles);
      O.effetEtoileFilante(ctx, p, tps, 7);
    },

    avant: function (ctx, p, tps) {
      O.effetLucioles(ctx, p, tps, p.motes, "170,200,255");
    }
  });

  // -------------------------------------------------------------------
  //  BIBLIOTHÈQUE : rayonnages de rouleaux, fenêtres, lampes à huile
  // -------------------------------------------------------------------
  Decor.ajouterAmbiance("bibliotheque", {
    materiau: "gres", frise: "oves", couleurFrise: "#7d5426",
    lierre: 0, densite: 0.3,
    objets: [["rouleaux", 3], ["livres", 3], ["bougie", 2], ["amphore", 1]],
    verdure: { herbe: "#6f7f4a", feuille: "#4f6a3a", clair: "#6d8450", fleur: "#c8553d" },
    vignette: "rgba(20,10,0,0.4)",

    fabriquer: function (p) {
      var ctx = p.loin, t = p.t, W = p.W, H = p.H, M = p.M, rnd = p.rnd, i;
      ctx.fillStyle = O.degradeV(ctx, 0, H, [[0, "#2e2015"], [0.45, "#4f3822"], [1, "#2e2015"]]);
      ctx.fillRect(-M, 0, W + 2 * M, H);

      // Voûtes
      ctx.strokeStyle = "rgba(255,225,180,0.08)";
      ctx.lineWidth = Math.max(2, t * 0.12);
      for (var vx = -M; vx < W + M; vx += t * 4) {
        ctx.beginPath(); ctx.arc(vx + t * 2, t * 3.2, t * 2, Math.PI, 0); ctx.stroke();
      }

      // Hautes fenêtres
      p.fenetres = [];
      var nb = 2 + Math.floor(rnd() * 2), pasF = W / nb;
      for (i = 0; i < nb; i++) {
        var fx = pasF * (i + 0.5) + O.entre(rnd, -0.6, 0.6) * t, fy = t * 1.4, fl = t * 1.5, fh = t * 3.6;
        O.lueur(ctx, fx, fy + fh * 0.5, t * 3, "255,220,150", 0.25);
        ctx.fillStyle = O.degradeV(ctx, fy, fy + fh, [[0, "#cfe3f0"], [1, "#f6dfae"]]);
        ctx.beginPath();
        O.cheminArche(ctx, fx - fl / 2, fy + fh, fl, fh, false);
        ctx.fill();
        ctx.strokeStyle = "#3a2817";
        ctx.lineWidth = Math.max(2, t * 0.08);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(fx, fy); ctx.lineTo(fx, fy + fh);
        ctx.moveTo(fx - fl / 2, fy + fh * 0.55); ctx.lineTo(fx + fl / 2, fy + fh * 0.55);
        ctx.stroke();
        p.fenetres.push({ x: fx, y: fy + fh, l: fl, ph: rnd() * 6 });
      }

      // Rayonnages de rouleaux (et parfois un parchemin de géométrie au mur)
      var hautEtag = t * 5.6, basEtag = H - t * 0.95;
      var couleursRouleaux = ["#d9c597", "#c9a970", "#b98a55", "#e6d6b0"];
      for (var ex = -M; ex < W + M; ex += t * 3.2) {
        var x0 = ex + t * 0.15, l = t * 2.9;
        if (rnd() < 0.25) {
          ctx.fillStyle = "#e9d9b0";
          ctx.fillRect(x0 + t * 0.4, hautEtag + t * 0.6, l - t * 0.8, t * 2.4);
          ctx.strokeStyle = "rgba(90,55,25,0.75)";
          ctx.lineWidth = Math.max(1, t * 0.04);
          var gx = x0 + l / 2, gy = hautEtag + t * 1.8, gr = t * 0.9;
          ctx.beginPath(); ctx.arc(gx, gy, gr, 0, O.PI2); ctx.stroke();
          ctx.beginPath();
          for (var s = 0; s < 3; s++) {
            var a = -Math.PI / 2 + s * O.PI2 / 3;
            if (s === 0) ctx.moveTo(gx + Math.cos(a) * gr, gy + Math.sin(a) * gr);
            else ctx.lineTo(gx + Math.cos(a) * gr, gy + Math.sin(a) * gr);
          }
          ctx.closePath();
          ctx.stroke();
          continue;
        }
        ctx.fillStyle = "#24170d";
        ctx.fillRect(x0, hautEtag, l, basEtag - hautEtag);
        ctx.fillStyle = "#3a2717";
        ctx.fillRect(x0 - t * 0.08, hautEtag - t * 0.15, l + t * 0.16, t * 0.18);
        var cl = t * 0.58, ch = t * 0.5;
        for (var cy = hautEtag + t * 0.15; cy + ch < basEtag; cy += ch + t * 0.06) {
          for (var cx = x0 + t * 0.08; cx + cl < x0 + l; cx += cl + t * 0.04) {
            ctx.fillStyle = "#1a1009";
            ctx.fillRect(cx, cy, cl, ch);
            var n = 2 + Math.floor(rnd() * 3), rr = Math.min(cl, ch) * 0.17;
            for (var k = 0; k < n; k++) {
              var rx = cx + cl * (0.22 + 0.56 * (k + 0.5) / n), ry = cy + ch * O.entre(rnd, 0.55, 0.75);
              ctx.fillStyle = couleursRouleaux[Math.floor(rnd() * 4)];
              O.disque(ctx, rx, ry, rr);
              ctx.fillStyle = rnd() < 0.15 ? "#a8482f" : "rgba(0,0,0,0.35)";
              O.disque(ctx, rx, ry, rr * 0.3);
            }
          }
        }
      }
      ctx.fillStyle = "rgba(20,10,0,0.25)";
      ctx.fillRect(-M, hautEtag, W + 2 * M, basEtag - hautEtag);

      // Milieu : pupitre et livre ouvert, statue, échelle
      var m = p.mil, sol = p.sol;
      var lx = O.entre(rnd, 0.1, 0.9) * W;
      m.fillStyle = "#5a3a1e";
      m.fillRect(lx - t * 0.08, sol - t * 1.3, t * 0.16, t * 1.3);
      m.fillRect(lx - t * 0.4, sol - t * 0.1, t * 0.8, t * 0.1);
      m.save();
      m.translate(lx, sol - t * 1.35);
      m.rotate(-0.25);
      m.fillStyle = "#6b4626";
      m.fillRect(-t * 0.55, -t * 0.08, t * 1.1, t * 0.12);
      m.fillStyle = "#f0e2bf";
      m.beginPath();
      m.moveTo(-t * 0.5, -t * 0.08);
      m.quadraticCurveTo(-t * 0.25, -t * 0.24, 0, -t * 0.1);
      m.quadraticCurveTo(t * 0.25, -t * 0.24, t * 0.5, -t * 0.08);
      m.lineTo(t * 0.5, -t * 0.02); m.lineTo(-t * 0.5, -t * 0.02);
      m.closePath();
      m.fill();
      m.restore();
      O.statue(m, O.entre(rnd, 0.1, 0.9) * W, sol, t * 3.6, O.melanger(["rouleau", "tablette", "compas"], rnd)[0],
               { clair: "#d8c6a2", base: "#b39c78", ombre: "#7a6448" }, rnd() < 0.5 ? 1 : -1);
      var ex2 = O.entre(rnd, 0.05, 0.85) * W;
      m.strokeStyle = "#6b4626";
      m.lineWidth = Math.max(2, t * 0.07);
      m.beginPath();
      m.moveTo(ex2, sol); m.lineTo(ex2 + t * 1.0, sol - t * 6);
      m.moveTo(ex2 + t * 0.6, sol); m.lineTo(ex2 + t * 1.6, sol - t * 6);
      for (var b = 1; b < 12; b++) {
        var w = b / 12;
        m.moveTo(ex2 + t * w, sol - t * 6 * w); m.lineTo(ex2 + t * 0.6 + t * w, sol - t * 6 * w);
      }
      m.stroke();

      p.lampes = [];
      for (i = 0; i < 3; i++) p.lampes.push({ x: O.entre(rnd, 0.1, 0.9) * W, y: t * 1.0, lg: t * O.entre(rnd, 2.2, 3.4), ph: rnd() * 6 });
      p.poussieres = O.creerPoints(p, 40, 0, W, t, H - t);
    },

    milieu: function (ctx, p, tps) {
      var t = p.t, i;
      // Rayons de lumière tombant des fenêtres
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (i = 0; i < p.fenetres.length; i++) {
        var f = p.fenetres[i], a = (0.07 + 0.03 * Math.sin(tps * 0.35 + f.ph)).toFixed(3);
        var g = ctx.createLinearGradient(f.x, f.y, f.x + t * 2.5, p.H);
        g.addColorStop(0, "rgba(255,220,150," + a + ")");
        g.addColorStop(1, "rgba(255,220,150,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(f.x - f.l / 2, f.y - t * 0.5);
        ctx.lineTo(f.x + f.l / 2, f.y - t * 0.5);
        ctx.lineTo(f.x + f.l / 2 + t * 3.2, p.H);
        ctx.lineTo(f.x - f.l / 2 + t * 1.6, p.H);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
      // Lampes à huile qui se balancent au bout de leur chaîne
      for (i = 0; i < p.lampes.length; i++) {
        var L = p.lampes[i], ang = Math.sin(tps * 1.1 + L.ph) * 0.06;
        var lx = L.x + Math.sin(ang) * L.lg, ly = L.y + Math.cos(ang) * L.lg;
        ctx.strokeStyle = "#3a2817";
        ctx.lineWidth = Math.max(1, t * 0.03);
        ctx.beginPath(); ctx.moveTo(L.x, L.y); ctx.lineTo(lx, ly); ctx.stroke();
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        O.lueur(ctx, lx, ly - t * 0.1, t * (1.8 + 0.1 * Math.sin(tps * 8 + L.ph)), "255,180,90", 0.2);
        ctx.restore();
        ctx.fillStyle = "#8a5a2a";
        ctx.beginPath();
        ctx.moveTo(lx - t * 0.28, ly);
        ctx.quadraticCurveTo(lx, ly + t * 0.32, lx + t * 0.28, ly);
        ctx.closePath();
        ctx.fill();
        O.flamme(ctx, lx + t * 0.18, ly - t * 0.02, t * 0.1, tps, L.ph);
      }
    },

    avant: function (ctx, p, tps) {
      O.effetPoussieres(ctx, p, tps, p.poussieres, "255,226,170");
    }
  });

  // -------------------------------------------------------------------
  //  ORIENT : arcades brisées, coupoles et minarets, lanternes
  // -------------------------------------------------------------------
  Decor.ajouterAmbiance("orient", {
    materiau: "briqueOrient", frise: "entrelacs", couleurFrise: "#2f6f8f",
    lierre: 0.12, densite: 0.3,
    objets: [["jarre", 3], ["herbe", 2], ["fleurs", 1], ["coupe", 1]],
    verdure: { herbe: "#5f7f45", feuille: "#3f6b3a", clair: "#5f8a50", fleur: "#f3eee0", fleur2: "#e8a33d", fleurLierre: "#f6f1e4" },
    vignette: "rgba(10,10,30,0.32)",

    fabriquer: function (p) {
      var ctx = p.loin, t = p.t, W = p.W, H = p.H, M = p.M, rnd = p.rnd, i;
      ctx.fillStyle = O.degradeV(ctx, 0, H * 0.8, [[0, "#14304d"], [0.45, "#2e5d7d"], [0.8, "#d9a066"], [1, "#f0c98a"]]);
      ctx.fillRect(-M, 0, W + 2 * M, H);
      p.etoiles = [];
      for (i = 0; i < 40; i++) {
        var e = { x: O.entre(rnd, -M, W + M), y: O.entre(rnd, 0, H * 0.35), ph: rnd() * 6.28, v: rnd(), s: rnd() * 0.6 };
        ctx.fillStyle = "rgba(255,250,230," + O.entre(rnd, 0.2, 0.7).toFixed(2) + ")";
        ctx.fillRect(e.x, e.y, 1.2, 1.2);
        if (i < 14) p.etoiles.push(e);
      }

      // Croissant de lune (dessiné à part, puis recopié)
      var mx = O.entre(rnd, 0.15, 0.85) * W, my = H * O.entre(rnd, 0.12, 0.22), r = t * 0.6;
      O.lueur(ctx, mx, my, t * 2.5, "255,240,200", 0.2);
      var c2 = document.createElement("canvas"), d = Math.ceil(r * 2.4 * p.ratio);
      c2.width = d; c2.height = d;
      var x2 = c2.getContext("2d");
      x2.scale(p.ratio, p.ratio);
      x2.fillStyle = "#fbf1cf";
      O.disque(x2, r * 1.2, r * 1.2, r);
      x2.globalCompositeOperation = "destination-out";
      O.disque(x2, r * 1.65, r * 1.0, r * 0.85);
      ctx.drawImage(c2, mx - r * 1.2, my - r * 1.2, r * 2.4, r * 2.4);

      // Ville lointaine : coupoles, minarets, fenêtres allumées
      var base = H * 0.72, x = -M;
      while (x < W + M) {
        var bl = t * O.entre(rnd, 0.8, 2.2), bh = t * O.entre(rnd, 0.6, 1.8), type = rnd();
        ctx.fillStyle = "#2a3550";
        ctx.fillRect(x, base - bh, bl, H - base + bh);
        if (type < 0.35) {
          ctx.beginPath(); ctx.ellipse(x + bl / 2, base - bh, bl * 0.42, bl * 0.5, 0, Math.PI, 0); ctx.fill();
          ctx.fillRect(x + bl / 2 - t * 0.03, base - bh - bl * 0.5 - t * 0.35, t * 0.06, t * 0.35);
        } else if (type < 0.55) {
          var cx = x + bl * 0.5, mh = t * O.entre(rnd, 2.2, 3.4);
          ctx.fillRect(cx - t * 0.13, base - bh - mh, t * 0.26, mh);
          ctx.fillRect(cx - t * 0.22, base - bh - mh * 0.7, t * 0.44, t * 0.1);
          ctx.beginPath();
          ctx.moveTo(cx - t * 0.15, base - bh - mh); ctx.lineTo(cx, base - bh - mh - t * 0.45); ctx.lineTo(cx + t * 0.15, base - bh - mh);
          ctx.closePath();
          ctx.fill();
        }
        ctx.fillStyle = "rgba(255,200,110,0.75)";
        for (var w = 0; w < 3; w++) {
          if (rnd() < 0.5) ctx.fillRect(x + O.entre(rnd, 0.15, 0.8) * bl, base - bh + O.entre(rnd, 0.2, 0.75) * bh, t * 0.07, t * 0.1);
        }
        x += bl + t * O.entre(rnd, -0.2, 0.3);
      }
      for (i = 0; i < 4; i++) O.palmier(ctx, O.entre(rnd, -M, W + M), base + t * 0.3, t * O.entre(rnd, 1.6, 2.4), "#1f2a40", rnd);
      ctx.fillStyle = "#1f2a40";
      ctx.fillRect(-M, base + t * 0.2, W + 2 * M, H);

      // Milieu : un mur d'arcades brisées, percé d'ouvertures sur le ciel
      var m = p.mil, sol = p.sol, haut = t * 1.0;
      m.fillStyle = O.degradeV(m, haut, sol, [[0, "#8a6a4a"], [1, "#664c35"]]);
      m.fillRect(-M, haut, W + 2 * M, sol - haut + t);
      m.fillStyle = "#2f6f8f";
      m.fillRect(-M, haut + t * 0.45, W + 2 * M, t * 0.35);
      m.fillStyle = "rgba(245,235,210,0.85)";
      for (var fx = -M; fx < W + M; fx += t * 0.5) {
        m.beginPath();
        m.moveTo(fx, haut + t * 0.53); m.lineTo(fx + t * 0.09, haut + t * 0.625);
        m.lineTo(fx, haut + t * 0.72); m.lineTo(fx - t * 0.09, haut + t * 0.625);
        m.closePath();
        m.fill();
      }
      var baie = t * 3.4, ouv = t * 2.5, hOuv = sol + t - H * 0.3;
      var depart = -M + O.entre(rnd, 0, baie) - baie;
      var teintes = ["255,170,80", "255,120,90", "120,200,255"];
      p.lanternes = [];
      m.save();
      m.globalCompositeOperation = "destination-out";
      for (var bx = depart; bx < W + M; bx += baie) {
        m.beginPath();
        O.cheminArche(m, bx + (baie - ouv) / 2, sol + t, ouv, hOuv, true);
        m.fill();
      }
      m.restore();
      for (var bx2 = depart; bx2 < W + M; bx2 += baie) {
        var ox = bx2 + (baie - ouv) / 2;
        m.strokeStyle = "#4e3a28";
        m.lineWidth = Math.max(2, t * 0.12);
        m.beginPath();
        O.cheminArche(m, ox, sol + t, ouv, hOuv, true);
        m.stroke();
        // Panneau d'étoile à huit branches sur le pilier
        var px = bx2 + baie, py = H * 0.55, s = t * 0.3;
        m.fillStyle = "#2f6f8f";
        m.fillRect(px - s, py - s, 2 * s, 2 * s);
        m.save();
        m.translate(px, py);
        m.rotate(Math.PI / 4);
        m.fillRect(-s * 0.72, -s * 0.72, s * 1.44, s * 1.44);
        m.restore();
        m.fillStyle = "#f3ead2";
        O.disque(m, px, py, s * 0.35);
        p.lanternes.push({ x: ox + ouv / 2, y: sol + t - hOuv + t * 0.2, lg: t * O.entre(rnd, 0.9, 1.6), ph: rnd() * 6, c: teintes[Math.floor(rnd() * 3)] });
      }
      // Palmiers en pot
      for (i = 0; i < 2; i++) {
        var pxp = O.entre(rnd, 0.1, 0.9) * W;
        O.palmier(m, pxp, sol - t * 0.45, t * 2.3, "#2c4a2a", rnd);
        m.fillStyle = "#a8582f";
        m.beginPath();
        m.moveTo(pxp - t * 0.35, sol - t * 0.5); m.lineTo(pxp + t * 0.35, sol - t * 0.5);
        m.lineTo(pxp + t * 0.25, sol); m.lineTo(pxp - t * 0.25, sol);
        m.closePath();
        m.fill();
      }
      p.braises = O.creerPoints(p, 12, 0, W, H * 0.3, H - t * 1.5);
    },

    ciel: function (ctx, p, tps) {
      O.effetScintillement(ctx, p, tps, p.etoiles);
    },

    milieu: function (ctx, p, tps) {
      var t = p.t;
      for (var i = 0; i < p.lanternes.length; i++) {
        var L = p.lanternes[i], ang = Math.sin(tps * 1.2 + L.ph) * 0.08;
        var lx = L.x + Math.sin(ang) * L.lg, ly = L.y + Math.cos(ang) * L.lg;
        ctx.strokeStyle = "#5a4020";
        ctx.lineWidth = Math.max(1, t * 0.03);
        ctx.beginPath(); ctx.moveTo(L.x, L.y); ctx.lineTo(lx, ly); ctx.stroke();
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        O.lueur(ctx, lx, ly + t * 0.25, t * (1.4 + 0.12 * Math.sin(tps * 5 + L.ph)), L.c, 0.28);
        ctx.restore();
        ctx.fillStyle = "#b8862e";
        ctx.beginPath();
        ctx.moveTo(lx, ly); ctx.lineTo(lx + t * 0.16, ly + t * 0.12); ctx.lineTo(lx - t * 0.16, ly + t * 0.12);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "rgba(" + L.c + ",0.9)";
        O.rectArrondi(ctx, lx - t * 0.13, ly + t * 0.12, t * 0.26, t * 0.3, t * 0.06);
        ctx.fill();
        ctx.fillStyle = "#b8862e";
        ctx.fillRect(lx - t * 0.16, ly + t * 0.42, t * 0.32, t * 0.05);
      }
    },

    avant: function (ctx, p, tps) {
      O.effetLucioles(ctx, p, tps, p.braises, "255,190,110");
    }
  });
})();
