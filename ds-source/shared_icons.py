"""Optimize hosted pages after building the independent offline downloads."""
from pathlib import Path
import hashlib,json,re

def pack(value):
    return json.dumps(value,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')

def share_icon_bank(src,dist):
    pages=sorted(dist.glob('*/index.html'))
    reference=(dist/'projearth/index.html').read_text()
    reference_js=re.search(r'<script>(.*)</script>',reference,re.S)[1]
    catalogue=json.loads(re.search(r'const ICON_DATA=(.*?);\nconst DS_SPEC',reference_js,re.S)[1])
    module=reference_js[reference_js.index('function mountIconBank'):reference_js.index("'use strict';\nif(/^",reference_js.index('function mountIconBank'))]
    module=re.sub(r'const CSS = String.raw`.*?`;\n','const CSS = window.DS_ICON_CSS;\n',module,count=1,flags=re.S)
    module=module.replace('#1c3758','#000000')
    shared='(()=>{\nconst ICON_DATA='+pack(catalogue)+';\n'+module+'\n})();\n'
    name='icon-bank-'+hashlib.sha256(shared.encode()).hexdigest()[:12]+'.js'
    folder=dist/'assets/shared';folder.mkdir(parents=True,exist_ok=True)
    for old in folder.glob('icon-bank-*.js'):old.unlink()
    (folder/name).write_text(shared)
    loader=(src/'shared-icon-loader.js').read_text()
    report=[]
    for path in pages:
        html=path.read_text()
        if 'function mountIconBank' not in html:continue
        script_match=re.search(r'<script>(.*)</script>',html,re.S);js=script_match[1]
        module_start=js.index('function mountIconBank');app_start=js.index("'use strict';\nif(/^",module_start)
        app=js[app_start:];prefix=js[:module_start]
        theme=re.search(r'const CSS = String.raw`(.*?)`;\n',js[module_start:app_start],re.S)[1]
        # These glyphs serve the menus, component examples and pagination demo.
        used={item['id'] for item in catalogue['icons'] if re.search(r'[\'\"]'+re.escape(item['id'])+r'[\'\"]',app)}
        compact={'icons':[item for item in catalogue['icons'] if item['id'] in used], 'interfaceIcons':{k:v for k,v in catalogue.get('interfaceIcons',{}).items() if re.search(r'[\'\"]'+re.escape(k)+r'[\'\"]',app)}}
        prefix=re.sub(r'const ICON_DATA=.*?;\nconst DS_SPEC',lambda m:'const ICON_DATA='+pack(compact)+';\nconst DS_SPEC',prefix,count=1,flags=re.S)
        # Keep the exact existing theme; only the logic and catalogue are shared.
        prefix+='window.DS_ICON_CSS='+pack(theme)+';\nconst SHARED_ICON_BANK_URL='+pack('../assets/shared/'+name)+';\n'
        app=app.replace('<div class="ds-icons-page"><ds-icon-library','<div class="ds-icons-page"><div data-icon-load-status role="status"><span>Carregando ícones…</span> <button type="button" class="utility small" data-retry-icon-bank hidden>Tentar novamente</button></div><ds-icon-library',1)
        app,n=re.subn(r" if\(page.id==='icones'\)\{.*?\n \}"," if(page.id==='icones')renderSharedIconBank();",app,count=1,flags=re.S)
        assert n==1,path
        # The structured search tool must wait for the same asynchronous load.
        app=app.replace("history.replaceState(null,'','#icones');renderPage();const library=", "history.replaceState(null,'','#icones');renderPage();await ensureIconBank();const library=")
        updated=prefix+loader+'\n'+app
        html=html[:script_match.start(1)]+updated+html[script_match.end(1):]
        path.write_text(html)
        report.append({'company':path.parent.name,'before':len(script_match.string.encode()),'after':len(html.encode()),'interfaceIcons':len(compact['icons'])})
    print(json.dumps({'sharedBank':name,'bytes':len(shared.encode()),'pages':report},ensure_ascii=False))
