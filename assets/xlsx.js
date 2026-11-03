/*
  Petit fichier Excel (.xlsx) fabriqué dans le navigateur, sans bibliothèque : utilisé par la page
  de suivi du professeur (export de la notation). Chargé seulement au clic sur « Télécharger en Excel ».
  window.PM_XLSX(feuilles) -> Blob ; feuilles = [{ nom, largeurs: [nombre de caractères], lignes: [[cellule]] }]
  cellule : texte, nombre, null (vide) ou { v, f (formule sans « = »), s (style) } ;
  styles : 0 normal, 1 gras, 2 gras sur fond (en-tête), 3 nombre à une décimale, 4 nombre à une décimale en gras.
*/
(function () {
  const enc = new TextEncoder();
  const xml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "");
  const colonne = (i) => { let s = ""; i++; while (i) { const r = (i - 1) % 26; s = String.fromCharCode(65 + r) + s; i = (i - 1 - r) / 26; } return s; };

  function feuille(f) {
    const cols = (f.largeurs || []).map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join("");
    const lignes = f.lignes.map((l, r) => `<row r="${r + 1}">${l.map((c, i) => {
      if (c === null || c === undefined || c === "") return "";
      const o = typeof c === "object" ? c : { v: c }, ref = colonne(i) + (r + 1), s = o.s ? ` s="${o.s}"` : "";
      const f2 = o.f ? `<f>${xml(o.f)}</f>` : "";
      if (typeof o.v === "number" && Number.isFinite(o.v)) return `<c r="${ref}"${s}>${f2}<v>${o.v}</v></c>`;
      if (o.f) return `<c r="${ref}"${s} t="str">${f2}<v>${xml(o.v == null ? "" : o.v)}</v></c>`;
      return `<c r="${ref}"${s} t="inlineStr"><is><t xml:space="preserve">${xml(o.v)}</t></is></c>`;
    }).join("")}</row>`).join("");
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"/></sheetViews>${cols ? `<cols>${cols}</cols>` : ""}<sheetData>${lignes}</sheetData></worksheet>`;
  }
  // Nom d'onglet Excel : 31 caractères au plus, sans : \ / ? * [ ], et tous différents
  function noms(liste) {
    const vus = new Set();
    return liste.map((n) => {
      let b = String(n || "Feuille").replace(/[:\\/?*[\]]/g, " ").slice(0, 31).trim() || "Feuille", x = b, k = 2;
      while (vus.has(x.toLowerCase())) { const suf = ` (${k++})`; x = b.slice(0, 31 - suf.length) + suf; }
      vus.add(x.toLowerCase()); return x;
    });
  }
  const STYLES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><numFmts count="1"><numFmt numFmtId="164" formatCode="0.0"/></numFmts>
<fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts>
<fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FFDDEBF7"/><bgColor indexed="64"/></patternFill></fill></fills>
<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="5"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/><xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/><xf numFmtId="164" fontId="1" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyFont="1"/></cellXfs>
<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`;

  // Archive zip sans compression (suffisant pour quelques kilo-octets de XML)
  const TABLE = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  const crc32 = (b) => { let c = 0xffffffff; for (let i = 0; i < b.length; i++) c = TABLE[(c ^ b[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  function zip(fichiers) {
    const parts = [], centre = [];
    let pos = 0;
    const d = new Date(), heure = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1), jour = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
    for (const [nom, texte] of fichiers) {
      const n = enc.encode(nom), data = enc.encode(texte), crc = crc32(data);
      const h = new DataView(new ArrayBuffer(30));
      h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true); h.setUint16(8, 0, true);
      h.setUint16(10, heure, true); h.setUint16(12, jour, true); h.setUint32(14, crc, true);
      h.setUint32(18, data.length, true); h.setUint32(22, data.length, true); h.setUint16(26, n.length, true); h.setUint16(28, 0, true);
      parts.push(new Uint8Array(h.buffer), n, data);
      const c = new DataView(new ArrayBuffer(46));
      c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true); c.setUint16(10, 0, true);
      c.setUint16(12, heure, true); c.setUint16(14, jour, true); c.setUint32(16, crc, true);
      c.setUint32(20, data.length, true); c.setUint32(24, data.length, true); c.setUint16(28, n.length, true); c.setUint32(42, pos, true);
      centre.push(new Uint8Array(c.buffer), n);
      pos += 30 + n.length + data.length;
    }
    const tailleCentre = centre.reduce((s, x) => s + x.length, 0);
    const fin = new DataView(new ArrayBuffer(22));
    fin.setUint32(0, 0x06054b50, true); fin.setUint16(8, fichiers.length, true); fin.setUint16(10, fichiers.length, true);
    fin.setUint32(12, tailleCentre, true); fin.setUint32(16, pos, true);
    return new Blob(parts.concat(centre, [new Uint8Array(fin.buffer)]), { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  }

  window.PM_XLSX = function (feuilles) {
    const n = noms(feuilles.map((f) => f.nom));
    const fichiers = [
      ["[Content_Types].xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${feuilles.map((f, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("")}</Types>`],
      ["_rels/.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`],
      ["xl/workbook.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><bookViews><workbookView/></bookViews><sheets>${n.map((x, i) => `<sheet name="${xml(x)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join("")}</sheets><calcPr calcId="191029" fullCalcOnLoad="1"/></workbook>`],
      ["xl/_rels/workbook.xml.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${feuilles.map((f, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join("")}<Relationship Id="rId${feuilles.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`],
      ["xl/styles.xml", STYLES]
    ].concat(feuilles.map((f, i) => [`xl/worksheets/sheet${i + 1}.xml`, feuille(f)]));
    return zip(fichiers);
  };
})();
