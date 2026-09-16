"""One portable overview download per company, with its complete Design System."""
import base64
import json
import re


def create_downloads(html, app, src, dist):
    assets = {}
    for path in (src/'assets').glob('projearth-*.svg'):
        assets['../assets/'+path.name] = 'data:image/svg+xml;base64,'+base64.b64encode(path.read_bytes()).decode()
    faces = re.findall(r'@font-face\s*\{[^}]+\}', (src/'assets/fonts.css').read_text())
    fonts = '\n'.join(face for face in faces if "'Barlow'" in face)
    def embed_font(match):
        path = src/match[1].lstrip('/')
        return 'url(data:font/ttf;base64,'+base64.b64encode(path.read_bytes()).decode()+')'
    fonts = re.sub(r'url\((/assets/[^)]+)\)', embed_font, fonts)
    standalone = html.replace('<link rel="stylesheet" href="../assets/fonts.css">','<style>'+fonts+'</style>')
    standalone = standalone.replace('<body>','<body data-offline="true">')
    # A copied standalone document has no hosting directory to return to.
    standalone = re.sub(r'<a class="utility ds-home-back"[^>]+>.*?</a>','',standalone,count=1)
    for url, data in assets.items():
        standalone = standalone.replace(url,data)
    standalone = standalone.replace('<script>','<script>const DEFAULT_PAGE="visao-geral";const PAGE_ASSETS='+json.dumps(assets,separators=(',',':'))+';\n',1)
    license_text = (src/'assets/barlow-OFL.txt').read_text().replace('--','—')
    standalone = standalone.replace('</head>','<!-- Barlow font license\n'+license_text+'\n--></head>')
    folder = dist/'downloads/projearth'
    folder.mkdir(parents=True,exist_ok=True)
    for old in folder.glob('*.html'):
        old.unlink()
    (folder/'projearth-visao-geral.html').write_text(standalone)
