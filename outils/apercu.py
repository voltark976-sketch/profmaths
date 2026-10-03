"""Assemble le site en un seul fichier HTML (aperçu Artifact). Usage : python3 outils/apercu.py SORTIE.html"""
import base64, re, sys, pathlib
S = pathlib.Path(__file__).resolve().parent.parent
def lire(p): return (S / p).read_text(encoding="utf-8")
katex_css = lire("assets/katex/katex.min.css")
def font(m):
    nom = m.group(1)
    data = base64.b64encode((S / "assets/katex/fonts" / f"{nom}.woff2").read_bytes()).decode()
    return f"src:url(data:font/woff2;base64,{data}) format(\"woff2\")"
katex_css = re.sub(r"src:url\(fonts/(KaTeX_[\w-]+)\.woff2\)[^;}]*", font, katex_css)
index = lire("index.html")
corps = index.split("<!--CORPS-->")[1].split("<!--/CORPS-->")[0]
scripts = re.findall(r'<script src="((?:data|assets/(?!katex))[^"]+)"></script>', index)
js = "\n".join(f"<script>\n{lire(s)}\n</script>" for s in scripts)
out = f"""<title>ProfMaths</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Bricolage+Grotesque:opsz,wght@12..96,800&display=swap">
<style>{katex_css}</style>
<style>{lire("assets/style.css")}</style>
{corps}
<script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.11/katex.min.js"></script>
{js}
"""
pathlib.Path(sys.argv[1]).write_text(out, encoding="utf-8")
print(len(out) // 1024, "Ko")
