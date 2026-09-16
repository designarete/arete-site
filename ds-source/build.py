from pathlib import Path
import json,re,urllib.parse,shutil
from downloads import create_downloads

ROOT=Path(__file__).resolve().parent.parent
SRC=ROOT/'ds-source'
DIST=ROOT/'design-systems'
DIST.mkdir(exist_ok=True)
icons=json.loads((SRC/'icons.json').read_text())
css=(SRC/'theme.css').read_text()+'\n'+(SRC/'brand.css').read_text()+'\n'+(SRC/'ux.css').read_text()
app=(SRC/'app.js').read_text().replace('/* BRAND_PAGES */',(SRC/'brand-pages.js').read_text())
library=(SRC/'icon-library.js').read_text()
start=library.rfind('\nmountIconBank(')
assert start>=0
library=library[:start]+'\nmountIconBank(ICON_DATA);\n'
embedded_css='''
:host([embedded]){--ink:#1c3758;--muted:#526b7d;--line:#d6e8ee;--soft:#f3f9fb;--accent:#00649a;--tint:#eaf5f8;font-size:14px;font-family:Barlow,Arial,sans-serif}
:host([embedded]) .shell{grid-template-columns:202px minmax(0,1fr);min-height:0}
:host([embedded]) .brand,:host([embedded]) .topline,:host([embedded]) .hero,:host([embedded]) .stats,:host([embedded]) .sidebar-foot,:host([embedded]) .footer{display:none}
:host([embedded]) .sidebar{height:calc(100vh - 170px);top:100px;padding:0 14px 0 0;background:white}
:host([embedded]) .content{padding:0 0 20px 22px;max-width:none}
:host([embedded]) .navbutton,:host([embedded]) .category-list .navbutton{font-size:13px;min-height:40px;padding:9px}
:host([embedded]) .navbutton .count{font-size:11px}
:host([embedded]) .navbutton[aria-pressed=true]{background:#c5e6f1;color:#1c3758}
:host([embedded]) .navbutton[aria-pressed=true] svg,:host([embedded]) .navbutton[aria-pressed=true] .count{color:#526d91}
:host([embedded]) .navbutton:hover{background:#f0f3f8}
:host([embedded]) .navtitle{padding:22px 9px 10px;font-size:11px}
:host([embedded]) .tools{border-top:0;padding-top:0;top:91px}
:host([embedded]) .grid{grid-template-columns:repeat(auto-fill,minmax(136px,1fr))}
:host([embedded]) .searchbox input{font-size:13px}
:host([embedded]) .btn{font-size:12px}
:host([embedded]) .icon-card .name{font-size:13px;min-height:35px}
:host([embedded]) .icon-card .identifier{font-size:11px}
:host([embedded]) .inspect{min-height:160px;padding:28px 10px 17px}
:host([embedded]) .result-head h2{font-size:15px}
:host([embedded]) .result-head p,:host([embedded]) .result-head .hint{font-size:12px}
:host([embedded]) .control label,:host([embedded]) .control select{font-size:12px}
:host([embedded]) .detail-section p{font-size:14px}
:host([embedded]) .detail-id,:host([embedded]) .detail-label,:host([embedded]) .legacy-note{font-size:12px}
:host([embedded]) .help-copy{font-size:14px}
:host([embedded]) .wide-select{font-size:13px}
:host([embedded]) .result-head .hint,:host([embedded]) .legacy-note,:host([embedded]) .legacy-dot,:host([embedded]) [data-scope="legacy"],:host([embedded]) [data-action="help"]{display:none}
:host([embedded]) .btn.primary{background:#35c3c7;border-color:#35c3c7;color:#1c3758}:host([embedded]) .btn.primary:hover{background:#64d2d5}:host([embedded]) .icon-card{background:#fff;border-color:#d6e8ee;transition:transform 180ms,border-color 180ms,box-shadow 180ms}:host([embedded]) .icon-card:hover{border-color:#35c3c7;transform:translateY(-2px);box-shadow:0 8px 18px -14px #1c375866}:host([embedded]) .glyph{color:var(--ds-icon-color,#0081c8)}:host([embedded]) .tools{background:#f3f9fb}:host([embedded]) .sidebar{background:transparent}:host([embedded]) .detail-section p{line-height:1.6}:host([embedded]) button:focus-visible{outline:2px solid #0081c8;outline-offset:3px}@media(prefers-reduced-motion:reduce){:host([embedded]) *{animation:none!important;transition:none!important}:host([embedded]) .icon-card:hover{transform:none}}
:host([embedded]) .mark svg{width:15px;height:15px}
@media(max-width:1100px){:host([embedded]) .shell{grid-template-columns:180px minmax(0,1fr)}:host([embedded]) .content{padding-left:16px}:host([embedded]) .category-list .navbutton{font-size:12px}:host([embedded]) .toolrow .btn span{display:none}:host([embedded]) .toolrow .btn{width:42px}}
@media(max-width:900px){:host([embedded]) .shell{display:block}:host([embedded]) .sidebar{display:none}:host([embedded]) .content{padding:0}:host([embedded]) .mobile-categories{display:block;margin-top:12px}:host([embedded]) .mobile-categories select{font-size:13px}:host([embedded]) .tools{top:90px}}
@media(max-width:760px){:host([embedded]) .tools{top:75px}:host([embedded]) .grid{grid-template-columns:repeat(2,minmax(0,1fr))}:host([embedded]) .searchbox input{font-size:13px}:host([embedded]) .result-head p{font-size:12px}:host([embedded]) .icon-card .name{font-size:12px}:host([embedded]) .icon-card .identifier{font-size:10px}}
'''
# A folha extra ajusta somente a apresentação do módulo dentro do site.
library=library.replace('const CSS = String.raw`','const CSS = String.raw`'+embedded_css+'\n',1)
# As regras de incorporação vêm depois da folha original, para a cascata prevalecer.
match=re.search(r'const CSS = String.raw`(.*?)`;\n',library,re.S)
assert match
inside=match[1]
assert inside.startswith(embedded_css+'\n')
inside=inside[len(embedded_css)+1:]+embedded_css
library=library[:match.start(1)]+inside+library[match.end(1):]

root_css=css[:css.index('\n*{')]+'\n'+re.search(r':root\{[^}]+\}',(SRC/'ux.css').read_text())[0]
starts={
'botoes':('.ds-button{','.ds-breadcrumb{'),
'breadcrumbs':('.ds-breadcrumb{','.pagination{'),
'pagination':('.pagination{','.ds-dropdown{'),
'dropdown':('.ds-dropdown{','.choice{'),
'selecao':('.choice{','.chip{'),
'chips':('.chip{','.avatar{'),
'avatares':('.avatar{','.field{'),
'inputs':('.field{','.badge{'),
'text-field':('.field{','.badge{'),
'textarea':('.field{','.badge{'),
'elementos':('.badge{','.inline-alert{'),
'alertas':('.inline-alert{','.alert-row{')}
snippets={key:'/* Projearth — tokens e componentes. */\n'+root_css+'\n\n'+css[css.index(begin):css.index(end)] for key,(begin,end) in starts.items()}
override_prefixes={'botoes':['.ds-button'],'breadcrumbs':['.ds-breadcrumb'],'pagination':['.pagination'],'dropdown':['.dropdown-button','.dropdown-option','.dropdown-list'],'selecao':['.choice'],'chips':['.chip'],'avatares':['.avatar'],'inputs':['.text-control','.field'],'text-field':['.text-control','.field'],'textarea':['.text-control','.field'],'elementos':['.badge','.avatar'],'alertas':['.inline-alert']}
ux_rules=re.findall(r'([^{}]+)\{([^{}]*)\}',(SRC/'ux.css').read_text().split('@keyframes')[0])
for key,prefixes in override_prefixes.items():
    snippets[key]+='\n\n/* Tema Projearth */\n'+'\n'.join(selector+'{'+body+'}' for selector,body in ux_rules if any(prefix in selector for prefix in prefixes))
snippets['cores']=root_css
snippets['tipografia']=root_css+'\n\nbody { font-family: var(--font-interface); font-size: 16px; line-height: 1.6; }\n.ds-button { font-size: 14px; line-height: 20px; }'
spec={
'version':'3.0.0',
'scope':'Design System Projearth',
'brand':{'name':'Projearth','colors':['#1c3758','#35c3c7','#0081c8','#c5e6f1','#cae1d0','#f9f9ed','#ffffff'],'typography':'Barlow','typographySource':'Família identificada nos SVGs de cores enviados'},
'button':{'width':124,'height':40,'paddingHorizontal':24,'paddingVertical':10,'cornerRadius':8,'border':0,'boxSizing':'border-box','fontSize':14,'lineHeight':20,'iconSize':20,'gap':8,'variants':['text','icon-only','text-and-icon'],'states':['default','hover','active','disabled','click'],'activeMeaning':'selecionado, persistente','clickMeaning':'pressionado, momentâneo','iconOnlyWidth':124},
'fields':{'states':['inactive','hover','active','disabled','filled','error','error-empty'],'activeMeaning':'foco de edição','errorMeaning':'preenchido com valor inválido','errorEmptyMeaning':'campo obrigatório vazio','proposedHeight':40,'proposedRadius':8,'textareaMinHeight':120,'textareaResize':'vertical'},
'avatar':{'shapes':['circle','square'],'squareCornerRadius':8,'notification':[False,True],'proposedSize':48},
'inlineAlerts':['default','info','success','warning','error'],
'components':['buttons','breadcrumbs','pagination','dropdown-text','dropdown-icon-text','checkbox','radio-button','switch','chips','avatar','inputs','text-field','textarea','notification-badge','state-icons','images','inline-alert'],
'icons':{'count':len(icons['icons']),'categories':len(icons['categories']),'preserved':29,'viewBox':'0 0 24 24','strokeWidth':1.8,'color':'currentColor'},
'typographyScale':{'pageTitle':{'size':36,'lineHeight':42,'weight':600},'sectionTitle':{'size':19,'lineHeight':26,'weight':600},'body':{'size':16,'lineHeight':26,'weight':400},'label':{'size':14,'lineHeight':20,'weight':500},'button':{'size':14,'lineHeight':20,'weight':500},'helper':{'size':12,'lineHeight':18,'weight':400}},
'interfaceTheme':{'fontFamily':'Barlow, Arial, sans-serif','colors':{'text':'#1C3758','muted':'#657083','border':'#DCE7ED','canvas':'#F5F9FA','surface':'#FFFFFF','accent':'#00649A','buttonBackground':'#35C3C7','buttonText':'#1C3758','navigationBackground':'#1C3758','navigationActive':'#35C3C7','info':'#00649A','success':'#147448','warning':'#925509','error':'#B02A41','focus':'#0081C8'}}}
sample=(SRC/'assets/projearth-grafismo-4.svg').read_text()
sample_url='data:image/svg+xml,'+urllib.parse.quote(sample,safe='')
favicon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#1c3758"/><g fill="none" stroke="#35c3c7" stroke-width="1.7"><rect x="7" y="7" width="7" height="7" rx="1"/><rect x="18" y="7" width="7" height="7" rx="1"/><rect x="7" y="18" width="7" height="7" rx="1"/><rect x="18" y="18" width="7" height="7" rx="1"/></g></svg>'
favicon_url='data:image/svg+xml,'+urllib.parse.quote(favicon,safe='')
def j(value):return json.dumps(value,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')
body='''<a class="skip-link" href="#page-content">Pular para o conteúdo</a>
<aside class="sidebar" id="sidebar" aria-label="Seções do Design System">
  <button type="button" class="mobile-close" data-action="menu-close" aria-label="Fechar navegação"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6"/></svg></button>
  <a class="brand" href="#visao-geral"><img src="../assets/projearth-logo.svg" alt="Projearth" width="727" height="326"><span class="brand-sub">DESIGN SYSTEM</span></a>
  <div class="nav-search-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></svg><input id="nav-search" class="nav-search" type="search" placeholder="Buscar seção" aria-label="Buscar seção do Design System" autocomplete="off"><button type="button" id="nav-search-clear" class="nav-search-clear" aria-label="Limpar busca de seções" hidden>×</button></div><nav class="nav-scroll" id="site-navigation" aria-label="Menu principal"></nav>
  
</aside>
<button type="button" id="nav-backdrop" data-action="menu-close" aria-label="Fechar navegação" tabindex="-1"></button>
<div class="app-main"><header class="topbar"><button type="button" id="menu-toggle" class="mobile-menu" data-action="menu-open" aria-label="Abrir navegação" aria-expanded="false" aria-controls="sidebar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button><div class="top-crumb"><span>Projearth</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg><span id="top-current">Visão geral</span></div><div class="top-actions"><a class="utility ds-home-back" href="../"><span aria-hidden="true">←</span> Voltar à home</a></div></header><main class="content" id="page-content" tabindex="-1"></main></div>
<div class="toast" id="site-toast" role="status" hidden></div>
<dialog class="copy-dialog" id="copy-dialog" aria-labelledby="copy-title"><h2 id="copy-title">Copiar especificação</h2><p>Use Ctrl+C ou ⌘C para copiar o conteúdo selecionado.</p><textarea id="copy-content" readonly aria-label="Especificação CSS para copiar"></textarea><div class="close-row"><button type="button" class="utility" data-action="close-copy">Fechar</button></div></dialog>
<noscript><p style="padding:40px">Ative o JavaScript para consultar os componentes e usar o banco de ícones.</p></noscript>
'''
js='const ICON_DATA='+j(icons)+';\nconst DS_SPEC='+j(spec)+';\nconst COMPONENT_CSS='+j(snippets)+';\nconst IMAGE_SAMPLE='+j(sample_url)+';\n'+library+'\n'+app
assert '</script' not in js.lower()
html=f'''<!doctype html>
<html lang="pt-BR" data-company="projearth"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, nofollow, noarchive"><meta name="referrer" content="no-referrer"><meta name="color-scheme" content="light"><title>Projearth · Design System</title><meta name="description" content="Identidade visual da Projearth, componentes interativos e banco de 447 ícones."><link rel="icon" type="image/svg+xml" href="{favicon_url}"><link rel="stylesheet" href="../assets/fonts.css"><style>{css}</style></head><body>{body}<script>{js}</script></body></html>'''
(DIST/'projearth').mkdir(exist_ok=True)
(DIST/'projearth/index.html').write_text(html)
create_downloads(html,app,SRC,DIST)
(DIST/'index.html').write_text((SRC/'home.html').read_text())
shutil.copytree(SRC/'assets',DIST/'assets',dirs_exist_ok=True)
fonts=(DIST/'assets/fonts.css').read_text().replace('/assets/','./')
(DIST/'assets/fonts.css').write_text(fonts)
(DIST/'assets/fonts-source.css').unlink(missing_ok=True)
for old in ['design-system-base.html','design-system-base-especificacao.json']:(DIST/old).unlink(missing_ok=True)
(DIST/'projearth/especificacao.json').write_text(json.dumps(spec,ensure_ascii=False,indent=2))
(SRC/'compiled.js').write_text(js)
(DIST/'assets/LICENCAS-ICONES.txt').write_text((SRC/'LICENCAS-ICONES.txt').read_text())
print(json.dumps({'company':'Projearth','icons':len(icons['icons']),'html_bytes':len(html.encode()),'routes':['/','/projearth/']},ensure_ascii=False))
