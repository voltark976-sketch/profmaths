// =====================================================================
//  AMBIANCES (1/3) : temple, jardin, crépuscule
// =====================================================================
//  Chaque ambiance décrit :
//    - l'aspect des murs : materiau, frise, lierre, objets posés ;
//    - fabriquer(p) : le dessin des calques fixes (le lointain « p.loin »
//      et le milieu « p.mil »), et la liste de ce qui bougera ;
//    - ciel, milieu, avant : ce qui bouge, redessiné à chaque image.
//  Les outils de dessin viennent de decor.js (Decor.outils).
// =====================================================================

(function () {
  var O = Decor.outils;

  // -------------------------------------------------------------------
  //  TEMPLE : intérieur éclairé à la torche, statues dans des niches
  // -------------------------------------------------------------------
  Decor.ajouterAmbiance("temple", {
    materiau: "marbre", frise: "meandre", couleurFrise: "#9b7226",
    lierre: 0.18, densite: 0.22,
    objets: [["amphore", 3], ["coupe", 2], ["herbe", 3], ["rouleaux", 1]],
    verdure: { herbe: "#6f8f4a", feuille: "#4f7a3a", clair: "#6d9450", fleur: "#c8553d" },
    vignette: "rgba(12,6,0,0.42)",

    fabriquer: function (p) {
      var ctx = p.loin, t = p.t, W = p.W, H = p.H, M = p.M, rnd = p.rnd;
      var teintes = [["#2c2018", "#4b3522"], ["#3a1f19", "#5e2f24"], ["#1f252e", "#3a424c"]];
      var tt = teintes[p.variante % 3];
      ctx.fillStyle = O.degradeV(ctx, 0, H, [[0, tt[0]], [0.5, tt[1]], [1, tt[0]]]);
      ctx.fillRect(-M, 0, W + 2 * M, H);

      // Grand appareil de pierre sur le mur du fond
      ctx.strokeStyle = "rgba(255,235,200,0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (var y = t * 1.7, r = 0; y < H; y += t * 0.9, r++) {
        ctx.moveTo(-M, y); ctx.lineTo(W + M, y);
        for (var x = -M + (r % 2) * t * 0.9; x < W + M; x += t * 1.8) { ctx.moveTo(x, y - t * 0.9); ctx.lineTo(x, y); }
      }
      ctx.stroke();

      // Bandeau peint en haut du mur
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(-M, t * 1.05, W + 2 * M, t * 0.55);
      ctx.strokeStyle = "rgba(226,178,76,0.22)";
      ctx.lineWidth = Math.max(1, t * 0.04);
      ctx.beginPath();
      ctx.moveTo(-M, t * 1.1); ctx.lineTo(W + M, t * 1.1);
      ctx.moveTo(-M, t * 1.55); ctx.lineTo(W + M, t * 1.55);
      ctx.stroke();

      // Niches et grandes statues
      var pas = t * O.entre(rnd, 5.4, 6.4);
      var poses = O.melanger(["rouleau", "compas", "sphere", "athena", "penseur", "tablette", "lyre", "bras"], rnd);
      var marbre = { clair: "#d9ccb2", base: "#b3a387", ombre: "#74675a" };
      var depart = pas * 0.5 + O.entre(rnd, -0.4, 0.4) * t;
      var k = 0;
      for (var nx = depart; nx < W + pas * 0.5; nx += pas) {
        O.niche(ctx, nx, H - t * 0.95, t * 2.4, t * 6.6);
        O.statue(ctx, nx, H - t * 0.98, t * 5.0, poses[k % poses.length], marbre, rnd() < 0.5 ? 1 : -1);
        k++;
      }

      // Milieu : colonnes, supports de torches, bannières
      var m = p.mil;
      p.torches = [];
      p.bannieres = [];
      var couleursCol = { clair: "#a8977c", base: "#8a7a62", ombre: "#5a4d3d" };
      var tissus = [["#7a2a22", "#e2b24c"], ["#24406a", "#e2b24c"], ["#3f5a2f", "#e8d9a8"]];
      p.tissu = tissus[(p.variante + 1) % 3];
      for (var cx = depart - pas / 2; cx < W + pas; cx += pas) {
        O.colonne(m, cx, t * 1.0, H - t * 0.9, t * 0.85, couleursCol, 0);
        if (rnd() < 0.7) {
          var ty = H * O.entre(rnd, 0.4, 0.5);
          m.fillStyle = "#4a3418";
          m.fillRect(cx + t * 0.42, ty + t * 0.05, t * 0.3, t * 0.06);
          m.fillStyle = "#6b4a22";
          m.beginPath();
          m.moveTo(cx + t * 0.55, ty); m.lineTo(cx + t * 0.85, ty);
          m.lineTo(cx + t * 0.76, ty + t * 0.18); m.lineTo(cx + t * 0.64, ty + t * 0.18);
          m.closePath();
          m.fill();
          p.torches.push({ x: cx + t * 0.7, y: ty, ph: rnd() * 10 });
        } else {
          p.bannieres.push({ x: cx, y: t * 1.25, l: t * 0.72, h: t * O.entre(rnd, 2.4, 3.2), ph: rnd() * 10 });
        }
      }
      p.poussieres = O.creerPoints(p, 34, 0, W, t, H - t);
    },

    milieu: function (ctx, p, tps) {
      for (var i = 0; i < p.bannieres.length; i++) {
        var b = p.bannieres[i];
        O.banniere(ctx, b.x, b.y, b.l, b.h, tps, b.ph, p.tissu[0], p.tissu[1]);
      }
      O.effetTorches(ctx, p, tps, p.torches);
    },

    avant: function (ctx, p, tps) {
      O.effetPoussieres(ctx, p, tps, p.poussieres, "255,236,200");
    }
  });

  // -------------------------------------------------------------------
  //  JARDIN : ruines à ciel ouvert, collines, oliviers et cyprès
  // -------------------------------------------------------------------
  Decor.ajouterAmbiance("jardin", {
    materiau: "marbreMousse", frise: "meandre", couleurFrise: "#8a6a2a",
    lierre: 0.5, densite: 0.45,
    objets: [["herbe", 5], ["fleurs", 3], ["buisson", 2], ["rocher", 1], ["amphore", 1]],
    verdure: { herbe: "#6f8f4a", feuille: "#4f7a3a", clair: "#77a35a", fleur: "#d24b3a", fleur2: "#f3eee0", roche: "#a59d8a" },
    vignette: "rgba(40,30,10,0.16)",

    fabriquer: function (p) {
      var ctx = p.loin, t = p.t, W = p.W, H = p.H, M = p.M, rnd = p.rnd;
      var ciels = [
        { haut: "#9cc3e6", milieu: "#d6e4ec", bas: "#f6dcc2", soleil: [0.22, 0.26], loin: "#a9b8c8", c1: "#a9b98a", c2: "#8fa36b" },
        { haut: "#6fa8dc", milieu: "#a9cde8", bas: "#efe6c8", soleil: [0.72, 0.16], loin: "#9fb3c9", c1: "#a7b884", c2: "#879c66" },
        { haut: "#86a9cf", milieu: "#c9d3d8", bas: "#f3cf8e", soleil: [0.8, 0.34], loin: "#b4aeb4", c1: "#b5b47e", c2: "#949a60" }
      ];
      var c = ciels[p.variante % 3];
      ctx.fillStyle = O.degradeV(ctx, 0, H * 0.75, [[0, c.haut], [0.6, c.milieu], [1, c.bas]]);
      ctx.fillRect(-M, 0, W + 2 * M, H);
      var sx = W * c.soleil[0], sy = H * c.soleil[1];
      O.lueur(ctx, sx, sy, t * 5, "255,246,220", 0.6);
      ctx.fillStyle = "rgba(255,252,238,0.95)";
      O.disque(ctx, sx, sy, t * 0.55);

      O.crete(ctx, -M, W + M, H, H * 0.6, t * 2.2, rnd, "pointu", 6);
      ctx.fillStyle = c.loin;
      ctx.fill();
      // Un temple au loin, sur sa colline
      var tx = O.entre(rnd, 0.15, 0.85) * W;
      ctx.fillStyle = c.c1;
      ctx.beginPath();
      ctx.ellipse(tx, H * 0.67, t * 3.6, t * 1.25, 0, Math.PI, 0);
      ctx.fill();
      O.petitTemple(ctx, tx, H * 0.67 - t * 1.1, t * 2.4, t * 1.6, "rgba(240,232,214,0.8)", 6, [rnd() < 0.5 ? 1 : 4]);
      O.crete(ctx, -M, W + M, H, H * 0.7, t * 1.2, rnd, "rond", 6);
      ctx.fillStyle = c.c1;
      ctx.fill();
      for (var i = 0; i < 7; i++) {
        O.cypres(ctx, O.entre(rnd, -M, W + M), H * O.entre(rnd, 0.69, 0.73), t * O.entre(rnd, 0.8, 1.4), t * 0.35, "rgba(70,95,60,0.75)", null);
      }
      O.crete(ctx, -M, W + M, H, H * 0.78, t * 0.9, rnd, "rond", 6);
      ctx.fillStyle = c.c2;
      ctx.fill();

      // Milieu : arcade en ruine, statue, oliviers, cyprès, colonnes brisées
      var m = p.mil, sol = p.sol;
      var marbre = { clair: "#f4ecdc", base: "#d9cfba", ombre: "#a99d86" };
      var ruine = { clair: "#efe6d2", base: "#d3c8b0", ombre: "#9c917c" };
      if (rnd() < 0.65) {
        var ax = O.entre(rnd, 0.05, 0.6) * W, nb = 2 + Math.floor(rnd() * 2);
        var remplissage = O.degradeH(m, ax, ax + nb * 2.6 * t, [[0, ruine.clair], [1, ruine.ombre]]);
        for (var a = 0; a < nb; a++) O.arche(m, ax + a * t * 2.6, sol, t * 2.8, t * O.entre(rnd, 4.2, 4.8), t * 0.45, remplissage, false);
      }
      O.statue(m, O.entre(rnd, 0.1, 0.9) * W, sol, t * O.entre(rnd, 4, 5),
               O.melanger(["rouleau", "compas", "sphere", "bras", "tablette"], rnd)[0], marbre, rnd() < 0.5 ? 1 : -1);
      for (var o = 0; o < 2; o++) O.olivier(m, O.entre(rnd, 0, W), sol, t * O.entre(rnd, 1.3, 1.7), rnd, "#6b5a45", "#7d9a6a", "#a7bc94");
      for (var k = 0; k < 4; k++) O.cypres(m, O.entre(rnd, 0, W), sol, t * O.entre(rnd, 3, 5), t * O.entre(rnd, 0.8, 1.1), "#3d5636", "#4f6d44");
      for (var b = 0; b < 3; b++) {
        O.colonne(m, O.entre(rnd, 0, W), sol - t * O.entre(rnd, 2.5, 4.5), sol, t * 0.7, ruine, rnd() < 0.7 ? O.entre(rnd, 0.45, 0.95) : 0);
      }
      if (rnd() < 0.55) O.teteGeante(m, O.entre(rnd, 0.15, 0.85) * W, sol + t * 0.1, t * 1.05, ruine, rnd);

      p.nuages = O.creerNuages(p, 4, "rgba(255,255,255,0.95)", "rgba(215,225,235,0.9)", t * 1.2, H * 0.33, false);
      p.vols = O.creerVols(p, 2, H * 0.12, H * 0.4);
      p.feuilles = O.creerPoints(p, 9, 0, W, 0, H);
      p.pollen = O.creerPoints(p, 12, 0, W, t * 2, H - t);
    },

    ciel: function (ctx, p, tps) {
      O.effetNuages(ctx, p, tps, p.nuages);
      O.effetVols(ctx, p, tps, p.vols, "rgba(60,60,70,0.7)");
    },

    avant: function (ctx, p, tps) {
      O.effetFeuilles(ctx, p, tps, p.feuilles, ["#7d9a6a", "#a7bc94", "#c9a65a"]);
      O.effetPoussieres(ctx, p, tps, p.pollen, "255,250,220");
    }
  });

  // -------------------------------------------------------------------
  //  CRÉPUSCULE : soleil couchant, ruines en silhouette, lucioles
  // -------------------------------------------------------------------
  Decor.ajouterAmbiance("crepuscule", {
    materiau: "marbreRose", frise: "meandre", couleurFrise: "#a8643a",
    lierre: 0.22, densite: 0.35,
    objets: [["herbe", 4], ["lavande", 3], ["rocher", 1], ["amphore", 1]],
    verdure: { herbe: "#5f6b45", feuille: "#3f4f3a", clair: "#5f6b45", fleur: "#9a7ad6", roche: "#9a7f86" },
    vignette: "rgba(40,10,40,0.3)",

    fabriquer: function (p) {
      var ctx = p.loin, t = p.t, W = p.W, H = p.H, M = p.M, rnd = p.rnd;
      var pal = p.variante % 2 === 0
        ? { ciel: [[0, "#24163f"], [0.35, "#5b2d5e"], [0.62, "#c4566a"], [0.8, "#f39a5a"], [1, "#fcd28c"]],
            soleil: "#ffd88a", loin: "#7a3d62", proche: "#4a2547", sil: "#2b1733" }
        : { ciel: [[0, "#1d1840"], [0.4, "#4a2f6b"], [0.65, "#b3577f"], [0.82, "#f08d7a"], [1, "#fbc59a"]],
            soleil: "#ffe0b0", loin: "#6b3f6e", proche: "#40284c", sil: "#251632" };
      ctx.fillStyle = O.degradeV(ctx, 0, H * 0.74, pal.ciel);
      ctx.fillRect(-M, 0, W + 2 * M, H);
      var sx = W * (p.variante % 3 === 0 ? 0.25 : 0.7), sy = H * 0.66;
      O.lueur(ctx, sx, sy, t * 8, "255,170,95", 0.5);
      ctx.fillStyle = pal.soleil;
      O.disque(ctx, sx, sy, t * 1.5);
      ctx.fillStyle = "rgba(255,245,220,0.7)";
      O.disque(ctx, sx, sy, t * 1.1);
      O.crete(ctx, -M, W + M, H, H * 0.71, t * 1.5, rnd, "pointu", 6);
      ctx.fillStyle = pal.loin;
      ctx.fill();
      O.crete(ctx, -M, W + M, H, H * 0.8, t * 0.8, rnd, "rond", 6);
      ctx.fillStyle = pal.proche;
      ctx.fill();

      // Milieu : un temple, des cyprès, une statue et des colonnes en silhouette
      var m = p.mil, sol = p.sol, sil = pal.sil;
      var silC = { clair: sil, base: sil, ombre: sil };
      O.petitTemple(m, O.entre(rnd, 0.12, 0.88) * W, sol, t * 6.5, t * 5.2, sil, 6, [Math.floor(rnd() * 6)]);
      for (var k = 0; k < 4; k++) O.cypres(m, O.entre(rnd, 0, W), sol, t * O.entre(rnd, 2.5, 4.5), t * 0.9, sil, null);
      O.statue(m, O.entre(rnd, 0, W), sol, t * 4.2, O.melanger(["bras", "lyre", "rouleau", "athena"], rnd)[0], silC, rnd() < 0.5 ? 1 : -1);
      for (var b = 0; b < 2; b++) O.colonne(m, O.entre(rnd, 0, W), sol - t * 3.5, sol, t * 0.7, silC, O.entre(rnd, 0.5, 0.9));

      p.nuages = O.creerNuages(p, 5, "rgba(255,180,140,0.75)", "rgba(150,70,110,0.6)", t * 1.2, H * 0.45, true);
      p.vols = O.creerVols(p, 2, H * 0.15, H * 0.45);
      p.lucioles = O.creerPoints(p, 14, 0, W, H * 0.35, H - t * 1.5);
    },

    ciel: function (ctx, p, tps) {
      O.effetNuages(ctx, p, tps, p.nuages);
      O.effetVols(ctx, p, tps, p.vols, "rgba(40,20,45,0.8)");
    },

    avant: function (ctx, p, tps) {
      O.effetLucioles(ctx, p, tps, p.lucioles, "255,230,120");
    }
  });
})();
