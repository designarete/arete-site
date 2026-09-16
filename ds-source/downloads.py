"""One portable overview download per company, with its complete Design System."""
import base64
import json
import re


def create_downloads(html, app, src, dist, company="projearth", font_family="Barlow", font_css=None, license_file="barlow-OFL.txt"):
    assets = {}
    for path in (src/'assets').glob(company+'-*.svg'):
        assets['../assets/'+path.name] = 'data:image/svg+xml;base64,'+base64.b64encode(path.read_bytes()).decode()
    faces = re.findall(r'@font-face\s*\{[^}]+\}', (src/'assets/fonts.css').read_text())
    fonts = font_css if font_css is not None else '\n'.join(face for face in faces if "'"+font_family+"'" in face)
    def embed_font(match):
        path = src/match[1].lstrip('/')
        return 'url(data:font/ttf;base64,'+base64.b64encode(path.read_bytes()).decode()+')'
    fonts = re.sub(r'url\((/assets/[^)]+)\)', embed_font, fonts)
    standalone = html.replace('<link rel="stylesheet" href="../assets/fonts.css">','<style>'+fonts+'</style>')
    # Self-hosted company fonts must also travel in the offline HTML.
    def embed_company_font(match):
        path = src/'assets'/match[1]
        mime = 'font/woff2' if path.suffix == '.woff2' else 'font/ttf'
        return 'url(data:'+mime+';base64,'+base64.b64encode(path.read_bytes()).decode()+')'
    standalone = re.sub(r'url\(\.\./assets/([^)]*\.(?:woff2|ttf))\)', embed_company_font, standalone)
    standalone = standalone.replace('<body>','<body data-offline="true">')
    # A copied standalone document has no hosting directory to return to.
    standalone = re.sub(r'<a class="utility ds-home-back"[^>]+>.*?</a>','',standalone,count=1)
    for url, data in assets.items():
        standalone = standalone.replace(url,data)
    standalone = standalone.replace('<script>','<script>const DEFAULT_PAGE="visao-geral";const PAGE_ASSETS='+json.dumps(assets,separators=(',',':'))+';\n',1)
    if license_file:
        license_text = (src/'assets'/license_file).read_text().replace('--','—')
        standalone = standalone.replace('</head>','<!-- '+font_family+' font license\n'+license_text+'\n--></head>')
    folder = dist/'downloads'/company
    folder.mkdir(parents=True,exist_ok=True)
    for old in folder.glob('*.html'):
        old.unlink()
    (folder/(company+'-visao-geral.html')).write_text(standalone)
