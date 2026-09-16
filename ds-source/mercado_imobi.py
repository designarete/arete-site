"""Mercado Imobi: company identity over the shared DS components."""
import colorsys,copy,json,re,urllib.parse
from downloads import create_downloads

PALETTE=['#501D7B','#FF0087','#00B2DC','#000000','#FFFFFF']
FONT_CSS='''@font-face{font-family:"DIN 2014";src:local("DIN2014-Regular"),local("DIN 2014 Regular");font-weight:400;font-display:swap}@font-face{font-family:"DIN 2014";src:local("DIN2014-ExtraBold"),local("DIN 2014 ExtraBold");font-weight:800;font-display:swap}'''

def adapt(text):
    """Translate legacy company tokens once at build time; never alter SVG originals."""
    exact={'1c3758':'501d7b','35c3c7':'00b2dc','0081c8':'501d7b','c5e6f1':'eee4f6','cae1d0':'e0f7fc','f9f9ed':'fff5fa','00649a':'501d7b','64d2d5':'36c6e8','25aeb6':'0098bf'}
    def color(m):
        value=m[0][1:];base=value[:6].lower()
        if base in exact:return '#'+exact[base]+value[6:]
        if len(value) not in (6,8):return m[0]
        r,g,b=[int(base[i:i+2],16)/255 for i in (0,2,4)];h,l,s=colorsys.rgb_to_hls(r,g,b)
        if 165<h*360<265:
            r,g,b=colorsys.hls_to_rgb(273/360,l,min(s,.38));return '#'+''.join(f'{round(c*255):02x}' for c in (r,g,b))+value[6:]
        return m[0]
    text=re.sub(r'#[0-9a-fA-F]{8}\b|#[0-9a-fA-F]{6}\b',color,text)
    for a,b in [('projearth','mercado-imobi'),('Projearth','Mercado Imobi'),('Barlow','"DIN 2014"'),('--brand-navy','--brand-primary'),('--brand-blue','--brand-focus'),('--brand-turquoise','--brand-cyan'),('--brand-sky','--brand-lilac'),('--brand-mint','--brand-ice'),('--brand-cream','--brand-blush')]:text=text.replace(a,b)
    return text

def build_mercado_imobi(src,dist,base_css,base_library,base_snippets,base_spec,base_body,icons):
    css=adapt(base_css)+'\n'+(src/'mercado-imobi.css').read_text()
    library=adapt(base_library)
    # The standalone icon bank also receives the company-specific contrast rules.
    extra='''\n:host([embedded]) .btn.primary{background:#501d7b;color:#fff;border-color:#501d7b}:host([embedded]) .btn.primary:hover{background:#3e165f}:host([embedded]) .navbutton[aria-pressed=true]{background:#eee4f6;color:#501d7b}:host([embedded]) .glyph{color:var(--ds-icon-color,#501d7b)}:host([embedded]){--muted:#6d5c78;--line:#e4d9ec;--soft:#f8f6fa;--tint:#eee4f6}:host([embedded]) .searchbox{background:#f8f6fa;border-color:#e4d9ec}:host([embedded]) .searchbox svg,:host([embedded]) .navbutton svg,:host([embedded]) .navbutton .count{color:#6d5c78}:host([embedded]) .navbutton[aria-pressed=true] svg,:host([embedded]) .navbutton[aria-pressed=true] .count{color:#501d7b}\n'''
    match=re.search(r'const CSS = String.raw`(.*?)`;\n',library,re.S)
    library=library[:match.end(1)]+extra+library[match.end(1):]
    spec=copy.deepcopy(base_spec);spec['version']='1.0.0';spec['scope']='Design System Mercado Imobi'
    spec['brand']={'name':'Mercado Imobi','colors':PALETTE,'typography':'DIN 2014','typographySource':'DIN2014-Regular e DIN2014-ExtraBold identificadas nos SVGs enviados','typographyStatus':'Arquivo de fonte não fornecido. DIN 2014 local quando instalada; Arial como apoio.','assets':{'logos':3,'symbols':3,'products':6,'originalColorSwatches':5}}
    spec['interfaceTheme']={'fontFamily':'"DIN 2014", Arial, sans-serif','colors':{'text':'#24132F','muted':'#6D5C78','border':'#E4D9EC','canvas':'#F8F6FA','surface':'#FFFFFF','accent':'#501D7B','buttonBackground':'#501D7B','buttonText':'#FFFFFF','navigationBackground':'#501D7B','navigationActive':'#00B2DC','info':'#00647B','success':'#147448','warning':'#925509','error':'#B02A41','focus':'#501D7B'}}
    spec['typographyScale']['pageTitle']['weight']=800
    spec['typographyScale']['sectionTitle']['weight']=800
    snippet_rules=(src/'mercado-imobi.css').read_text().split('/* Presentation */')[0]
    snippets={key:adapt(value)+'\n'+snippet_rules for key,value in base_snippets.items()}
    body=base_body.replace('projearth-logo.svg','mercado-imobi-logo-2.svg').replace('Projearth','Mercado Imobi').replace('width="727" height="326"','width="915" height="381"')
    app=adapt((src/'app.js').read_text()).replace('/* BRAND_PAGES */',(src/'mercado-imobi-pages.js').read_text())
    app=app.replace('Marca e grafismos','Marca e produtos').replace('Logotipo e elementos gráficos da Mercado Imobi.','Logotipos, símbolos e marcas dos produtos.').replace('Grafismo azul da Mercado Imobi','Símbolo da Mercado Imobi').replace('Projeto Horizonte','Residencial Horizonte').replace('Nome do projeto','Nome do empreendimento').replace('Descrição do projeto','Descrição do empreendimento')
    sample=(src/'assets/mercado-imobi-icone-1.svg').read_text()
    sample_url='data:image/svg+xml,'+urllib.parse.quote(sample,safe='')
    def j(value):return json.dumps(value,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')
    js='const ICON_DATA='+j(icons)+';\nconst DS_SPEC='+j(spec)+';\nconst COMPONENT_CSS='+j(snippets)+';\nconst IMAGE_SAMPLE='+j(sample_url)+';\n'+library+'\n'+app
    assert '</script' not in js.lower()
    html=f'''<!doctype html><html lang="pt-BR" data-company="mercado-imobi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, nofollow, noarchive"><meta name="referrer" content="no-referrer"><meta name="color-scheme" content="light"><meta name="theme-color" content="#501d7b"><title>Mercado Imobi · Design System</title><meta name="description" content="Identidade visual da Mercado Imobi, marcas dos produtos, componentes interativos e banco de 447 ícones."><link rel="icon" type="image/svg+xml" href="../assets/mercado-imobi-icone-1.svg"><style>{FONT_CSS}\n{css}</style></head><body>{body}<script>{js}</script></body></html>'''
    folder=dist/'mercado-imobi';folder.mkdir(exist_ok=True)
    (folder/'index.html').write_text(html)
    (folder/'especificacao.json').write_text(json.dumps(spec,ensure_ascii=False,indent=2))
    (src/'mercado-imobi-compiled.js').write_text(js)
    create_downloads(html,app,src,dist,company='mercado-imobi',font_family='DIN 2014',font_css=FONT_CSS,license_file=None)
    print(json.dumps({'company':'Mercado Imobi','icons':len(icons['icons']),'sections':17,'route':'/design-systems/mercado-imobi/','html_bytes':len(html.encode())},ensure_ascii=False))
