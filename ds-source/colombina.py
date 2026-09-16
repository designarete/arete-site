"""Colombina identity, shared component catalogue and portable document."""
import colorsys,copy,json,re,urllib.parse
from downloads import create_downloads

PALETTE=['#531B44','#471839','#F5A23B','#EA9436','#E67F42','#00AE77','#006161','#EB234E','#AC024F','#FC4D32','#DA2821','#FF361A','#E5CCB2']
FONT_CSS='''@font-face{font-family:Inter;font-style:normal;font-weight:100 900;font-display:swap;src:url(../assets/colombina-InterVariable.woff2) format("woff2")}@font-face{font-family:Inter;font-style:italic;font-weight:100 900;font-display:swap;src:url(../assets/colombina-InterVariable-Italic.woff2) format("woff2")}'''

def adapt(text):
    exact={'1c3758':'531b44','35c3c7':'f5a23b','0081c8':'531b44','c5e6f1':'f4e7d9','cae1d0':'e5ccb2','f9f9ed':'fff9f2','00649a':'006161','64d2d5':'f7b55f','25aeb6':'ea9436'}
    def color(m):
        v=m[0][1:];base=v[:6].lower()
        if base in exact:return '#'+exact[base]+v[6:]
        r,g,b=[int(base[i:i+2],16)/255 for i in (0,2,4)];h,l,s=colorsys.rgb_to_hls(r,g,b)
        if 165<h*360<265:
            r,g,b=colorsys.hls_to_rgb(326/360,l,min(s,.22));return '#'+''.join(f'{round(c*255):02x}' for c in (r,g,b))+v[6:]
        return m[0]
    text=re.sub(r'#[0-9a-fA-F]{8}\b|#[0-9a-fA-F]{6}\b',color,text)
    for a,b in [('projearth','colombina'),('Projearth','Colombina'),('Barlow','Inter'),('--brand-navy','--brand-primary'),('--brand-blue','--brand-focus'),('--brand-turquoise','--brand-amber'),('--brand-sky','--brand-pale'),('--brand-mint','--brand-sand'),('--brand-cream','--brand-cream')]:text=text.replace(a,b)
    return text

def build_colombina(src,dist,base_css,base_library,base_snippets,base_spec,base_body,icons):
    custom=(src/'colombina.css').read_text();css=adapt(base_css)+'\n'+custom
    library=adapt(base_library)
    extra='''\n:host([embedded]){--ink:#531b44;--muted:#725969;--line:#e6d8d0;--soft:#fcf8f3;--tint:#f4e7d9;--accent:#531b44}:host([embedded]) .btn.primary{background:#531b44;color:#fff;border-color:#531b44}:host([embedded]) .btn.primary:hover{background:#471839}:host([embedded]) .searchbox{background:#fcf8f3;border-color:#e6d8d0}:host([embedded]) .searchbox svg,:host([embedded]) .navbutton svg,:host([embedded]) .navbutton .count{color:#725969}:host([embedded]) .navbutton[aria-pressed=true]{background:#f4e7d9;color:#531b44}:host([embedded]) .navbutton[aria-pressed=true] svg,:host([embedded]) .navbutton[aria-pressed=true] .count{color:#531b44}:host([embedded]) .glyph{color:var(--ds-icon-color,#531b44)}\n'''
    m=re.search(r'const CSS = String.raw`(.*?)`;\n',library,re.S);library=library[:m.end(1)]+extra+library[m.end(1):]
    spec=copy.deepcopy(base_spec);spec['version']='1.0.0';spec['scope']='Design System Colombina'
    spec['brand']={'name':'Colombina','colors':PALETTE,'typography':['Blimone','Inter'],'typographySource':'Famílias e paleta informadas pela cliente','fontRoles':{'headings':'Blimone','interface':'Inter'},'fontStatus':{'Blimone':'Todos os pesos solicitados; arquivos ainda não fornecidos. Família local quando disponível, Inter como apoio, sem síntese de peso.','Inter':'Variável 100–900, normal e itálico, incorporada no pacote e no HTML offline.'},'assets':{'logos':2,'seal':1,'illustrations':6}}
    spec['interfaceTheme']={'fontFamily':'Inter, Arial, sans-serif','headingFamily':'Blimone, Inter, sans-serif','colors':{'text':'#471839','muted':'#725969','border':'#E6D8D0','canvas':'#FCF8F3','surface':'#FFFFFF','accent':'#531B44','buttonBackground':'#531B44','buttonText':'#FFFFFF','navigationBackground':'#531B44','navigationActive':'#F5A23B','info':'#006161','success':'#006B49','warning':'#7D4500','error':'#AC024F','focus':'#531B44'}}
    snippets={key:adapt(value)+'\n'+custom.split('/* Presentation */')[0] for key,value in base_snippets.items()}
    body=base_body.replace('projearth-logo.svg','colombina-logo-1.svg').replace('Projearth','Colombina').replace('width="727" height="326"','width="899" height="384"')
    app=adapt((src/'app.js').read_text()).replace('/* BRAND_PAGES */',(src/'colombina-pages.js').read_text()).replace('Marca e grafismos','Marca e ilustrações').replace('Logotipo e elementos gráficos da Colombina.','Logotipos, selo e ilustrações da Colombina.').replace('Grafismo azul da Colombina','Ilustração de brinde da Colombina').replace('Projeto Horizonte','Festival do Cerrado').replace('Nome do projeto','Nome da campanha').replace('Descrição do projeto','Descrição da campanha')
    sample=(src/'assets/colombina-ilustracao-1.svg').read_text();sample_url='data:image/svg+xml,'+urllib.parse.quote(sample,safe='')
    def j(value):return json.dumps(value,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')
    js='const ICON_DATA='+j(icons)+';\nconst DS_SPEC='+j(spec)+';\nconst COMPONENT_CSS='+j(snippets)+';\nconst IMAGE_SAMPLE='+j(sample_url)+';\n'+library+'\n'+app
    assert '</script' not in js.lower()
    html=f'''<!doctype html><html lang="pt-BR" data-company="colombina"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, nofollow, noarchive"><meta name="referrer" content="no-referrer"><meta name="color-scheme" content="light"><meta name="theme-color" content="#531b44"><title>Colombina · Design System</title><meta name="description" content="Identidade visual da Colombina, cores, tipografia, componentes e banco de 447 ícones."><link rel="icon" type="image/svg+xml" href="../assets/colombina-ilustracao-1.svg"><style>{FONT_CSS}\n{css}</style></head><body>{body}<script>{js}</script></body></html>'''
    folder=dist/'colombina';folder.mkdir(exist_ok=True);(folder/'index.html').write_text(html);(folder/'especificacao.json').write_text(json.dumps(spec,ensure_ascii=False,indent=2));(src/'colombina-compiled.js').write_text(js)
    create_downloads(html,app,src,dist,company='colombina',font_family='Inter',font_css=FONT_CSS,license_file='colombina-inter-OFL.txt')
    print(json.dumps({'company':'Colombina','sections':17,'icons':len(icons['icons']),'colors':len(PALETTE),'route':'/design-systems/colombina/'},ensure_ascii=False))
