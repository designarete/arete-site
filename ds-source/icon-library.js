/* Banco de ícones DS v1.0.0. Lucide / Feather: licenças completas em DATA.license e LICENCAS.txt. */
function mountIconBank(DATA) {
  'use strict';
  const CSS = String.raw`:host{display:block;--ink:#1c3758;--muted:#66736d;--line:#dce7ed;--soft:#f5f9fa;--accent:#1c3758;--tint:#eaf5f8;--radius:12px;--icon-size:24px;--icon-stroke:1.8;color:var(--ink);font-family:var(--ds-library-font,Inter,Arial,Helvetica,sans-serif);font-size:14px;line-height:1.5;color-scheme:light}
*,*::before,*::after{box-sizing:border-box}button,input,select,textarea{font:inherit}button{cursor:pointer;color:inherit}button:disabled{opacity:.45;cursor:not-allowed}button,input,select,textarea{outline-offset:4px}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible,a:focus-visible{outline:2px solid var(--accent)}a{color:var(--accent)}svg{display:block;width:20px;height:20px;flex-shrink:0}button{touch-action:manipulation}h1,h2,h3,p{margin:0}button,select{min-height:40px}button{border:0;background:none}input,select,textarea{color:var(--ink)}[hidden]{display:none!important}.mono,code,kbd{font-family:ui-monospace,SFMono-Regular,Consolas,monospace}.muted{color:var(--muted)}.eyebrow{font-size:10px;text-transform:uppercase;letter-spacing:.13em;font-weight:700;color:var(--muted)}
.shell{display:grid;grid-template-columns:238px minmax(0,1fr);min-height:100vh;background:#fff}.sidebar{border-right:1px solid var(--line);background:#fafbf9;position:sticky;top:0;height:100vh;display:flex;flex-direction:column;padding:30px 18px 16px}.brand{display:flex;gap:11px;align-items:center;padding:0 10px 32px}.brand-mark{width:34px;height:34px;border:1px solid #cad5c9;border-radius:10px;background:white;display:grid;place-items:center;color:var(--accent)}.brand-mark svg{width:21px;height:21px}.brand strong{font-size:16px;letter-spacing:-.035em;font-weight:700}.brand small{display:block;color:var(--muted);font-size:10px;letter-spacing:.03em}.nav-global{display:grid;gap:4px}.navbutton{display:flex;align-items:center;width:100%;text-align:left;padding:9px 11px;border-radius:8px;gap:10px;font-size:12px;font-weight:500;line-height:1.35;min-height:39px}.navbutton svg{width:17px;height:17px;color:#6c7a70}.navbutton .label{flex:1}.navbutton .count{font-size:10px;color:#748275;font-variant-numeric:tabular-nums}.navbutton:hover{background:#eff3ed}.navbutton[aria-pressed=true]{background:#e9f0e5;color:#315233;font-weight:700}.navbutton[aria-pressed=true] svg{color:#416637}.navbutton[aria-pressed=true] .count{color:#416637}.navtitle{padding:24px 11px 10px}.category-list{overflow:auto;min-height:0;scrollbar-width:thin;padding-right:1px;overscroll-behavior:contain}.category-list .navbutton{margin-bottom:1px;font-size:11.5px;min-height:37px}.sidebar-foot{border-top:1px solid var(--line);padding:13px 10px 0;margin-top:12px;display:flex;justify-content:space-between;align-items:center;font-size:10px;color:var(--muted)}.text-link{font-size:11px;text-decoration:underline;text-underline-offset:3px;min-height:30px;padding:3px 0}
.content{padding:0 42px 40px;min-width:0;max-width:1680px;width:100%;margin:auto}.topline{height:72px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--line);font-size:11px;color:var(--muted);gap:12px}.breadcrumbs{display:flex;gap:10px;align-items:center}.breadcrumbs svg{width:12px;height:12px}.version{display:flex;align-items:center;gap:7px;font-size:10px}.dot{width:5px;height:5px;border-radius:50%;background:#629273}.hero{display:flex;align-items:center;justify-content:space-between;gap:30px;padding:34px 0 27px}.hero h1{font-size:36px;line-height:1.15;font-weight:600;letter-spacing:-.055em;margin:7px 0 12px}.hero p{color:var(--muted);font-size:13px;max-width:500px;line-height:1.75}.hero .eyebrow{color:#557054}.hero-demo{width:244px;flex-shrink:0;border:1px solid var(--line);border-radius:13px;background:linear-gradient(135deg,#fbfcfa,#f2f6ee);padding:20px 24px}.demo-icons{display:flex;align-items:center;justify-content:space-between;color:var(--accent);padding:6px 1px 18px}.demo-icons svg{width:27px;height:27px;stroke-width:1.8}.demo-caption{display:flex;align-items:center;justify-content:space-between;font-size:9px;color:#70806c;border-top:1px solid #dfe7d9;padding-top:10px;letter-spacing:.02em}.stats{display:flex;align-items:center;gap:27px;padding-bottom:28px;font-size:11px;color:var(--muted)}.stats strong{font-size:13px;color:var(--ink);font-weight:700;margin-right:5px}.stats span+span{padding-left:26px;border-left:1px solid var(--line)}
.tools{position:sticky;top:0;background:#fff;z-index:5;padding:15px 0 14px;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.toolrow{display:flex;gap:10px;align-items:center}.searchbox{height:44px;border:1px solid #dfe5dd;background:#fafbf8;border-radius:9px;display:flex;align-items:center;gap:11px;padding:0 14px;flex:1;min-width:0}.searchbox svg{width:18px;height:18px;color:#6c7c6c}.searchbox input{width:100%;min-width:0;border:0;background:transparent;height:100%;font-size:12px}.searchbox input:focus{outline:none}.searchbox:focus-within{outline:2px solid var(--accent);outline-offset:2px}.searchbox kbd{border:1px solid #dbe2d7;background:#fff;border-radius:4px;font-size:10px;line-height:18px;width:19px;text-align:center;color:#82917c}.searchbox .clear{min-height:26px;width:26px;padding:4px}.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:1px solid #dde4da;border-radius:8px;padding:9px 13px;font-size:11px;line-height:1.5;font-weight:600;background:white;min-height:42px;white-space:nowrap}.btn svg{width:15px;height:15px}.btn:hover{background:#f4f7f1;border-color:#c8d4c2}.btn.primary{background:var(--ink);border-color:var(--ink);color:white}.btn.primary:hover{background:#3c4f42}.btn.small{min-height:34px;padding:6px 10px;font-size:10px}.btn[aria-expanded=true]{background:var(--tint);border-color:#b5c8b2}.appearance{display:flex;flex-wrap:wrap;align-items:center;gap:24px;margin-top:16px;border-top:1px solid var(--line);padding:16px 4px 1px}.control{display:grid;gap:7px}.control label{font-size:10px;color:var(--muted);font-weight:600;display:flex;justify-content:space-between;gap:20px}.control-row{display:flex;align-items:center;gap:7px}.control input[type=color]{width:28px;height:28px;border:1px solid var(--line);padding:2px;border-radius:6px;background:white}.hex{width:78px;padding:4px 7px;border:1px solid var(--line);border-radius:5px;font-size:11px;height:29px}.control input[type=range]{width:140px;accent-color:var(--accent)}.control output{font-variant-numeric:tabular-nums;color:var(--ink)}.export-color{height:30px;min-height:30px;border:1px solid var(--line);border-radius:6px;font-size:10px;padding:3px 5px;background:white}.appearance .reset{margin-left:auto;font-size:10px;min-height:30px;text-decoration:underline;text-underline-offset:4px}
.result-head{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:22px 0 17px}.result-head h2{font-size:14px;letter-spacing:-.02em;font-weight:600}.result-head p{font-size:10px;color:var(--muted);margin-top:3px}.result-head .hint{font-size:10px;display:flex;align-items:center;gap:5px;color:var(--muted)}.result-head .hint svg{width:12px;height:12px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(135px,1fr));gap:10px}.icon-card{min-width:0;position:relative;border:1px solid var(--line);border-radius:10px;background:#fff;transition:border-color .15s,background .15s}.icon-card:hover{border-color:#35c3c7;background:#f4fafc}.icon-card:focus-within{border-color:var(--accent)}.inspect{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;min-height:148px;padding:28px 10px 15px;text-align:center;border-radius:10px}.icon-card .glyph{height:55px;display:flex;align-items:center;justify-content:center;color:var(--preview-color,var(--ds-icon-color,#1c3758));margin:0 0 9px}.glyph svg{width:var(--icon-size);height:var(--icon-size);stroke-width:var(--icon-stroke)}.icon-card .name{font-size:11px;font-weight:600;line-height:1.35;max-width:100%;min-height:29px;display:flex;align-items:center;justify-content:center}.icon-card .identifier{font-size:9px;color:#738075;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%;margin-top:4px}.mark{position:absolute;top:4px;right:5px;width:29px;min-height:29px;display:grid;place-items:center;padding:5px;color:#a2afa0;border-radius:5px}.mark svg{width:13px;height:13px}.mark[aria-pressed=true]{color:#668647}.mark[aria-pressed=true] svg{fill:#e0edc8}.mark:hover{background:#eef3e8;color:var(--accent)}.legacy-dot{position:absolute;top:13px;left:13px;width:5px;height:5px;border-radius:50%;background:#8fa981;pointer-events:none}.more{display:flex;justify-content:center;margin-top:24px}.empty{text-align:center;background:var(--soft);padding:52px 20px;border-radius:10px}.empty svg{width:32px;height:32px;margin:0 auto 13px;color:#819176}.empty h3{font-size:16px;margin:6px 0}.empty p{font-size:12px;color:var(--muted);margin-bottom:20px}.footer{margin-top:32px;border-top:1px solid var(--line);padding-top:17px;display:flex;gap:16px;justify-content:space-between;font-size:10px;color:var(--muted)}.footer a{text-underline-offset:3px}.mobile-categories{display:none}.menu-toggle{display:none}
dialog{border:1px solid #dce5d8;padding:0;width:min(470px,calc(100vw - 24px));max-height:calc(100vh - 32px);border-radius:17px;background:white;color:var(--ink);box-shadow:0 20px 80px #15271726;overscroll-behavior:contain}dialog::backdrop{background:#26372870;backdrop-filter:blur(3px)}.dialog-head{display:flex;align-items:center;justify-content:space-between;padding:17px 24px;border-bottom:1px solid var(--line);font-size:11px;font-weight:600;position:sticky;top:0;background:white;z-index:2}.close-dialog{width:30px;min-height:30px;padding:6px;border-radius:5px}.close-dialog:hover{background:var(--soft)}.close-dialog svg{width:17px;height:17px}.dialog-body{padding:22px 24px 24px}.big-preview{height:142px;background-color:#f7f9f3;background-image:radial-gradient(#dce5d5 .7px,transparent .7px);background-size:12px 12px;border-radius:10px;display:grid;place-items:center;margin-bottom:20px;color:var(--preview-color,var(--ds-icon-color,#1c3758));position:relative}.big-preview svg{width:64px;height:64px;stroke-width:var(--icon-stroke)}.preview-size{position:absolute;bottom:10px;right:12px;font-size:9px;color:#7f8e79}.detail-title{display:flex;gap:8px;align-items:flex-start;justify-content:space-between}.detail-title h2{font-size:24px;font-weight:600;line-height:1.25;letter-spacing:-.04em}.detail-id{font-size:11px;color:var(--muted);margin:5px 0 10px;word-break:break-word}.pill{display:inline-flex;font-size:9px;line-height:1.6;padding:3px 7px;border-radius:5px;background:#eef3e7;color:#5d7751;margin:0 4px 5px 0}.detail-section{margin:19px 0}.detail-section h3{font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);margin-bottom:7px}.detail-section p{font-size:12px;line-height:1.7}.legacy-note{border-left:2px solid #a9bd94;padding-left:11px;font-size:11px;color:#4c6b7c;line-height:1.7}.detail-code{width:100%;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:10px;line-height:1.5;background:#f5f9fa;border:1px solid var(--line);border-radius:8px;resize:vertical;min-height:102px;padding:12px;white-space:pre;overflow:auto}.detail-label{font-size:10px;color:var(--muted);display:block;margin-bottom:6px}.wide-select{width:100%;font-size:11px;border:1px solid var(--line);border-radius:7px;min-height:36px;padding:5px 9px;background:white;margin-bottom:12px}.actions{display:flex;gap:8px;margin-top:16px}.actions .btn{flex:1}.detail-foot{font-size:9px;color:var(--muted);margin-top:10px;line-height:1.6}.export-options{display:grid;gap:10px;margin:16px 0 24px}.radio-row{display:flex;align-items:flex-start;gap:10px;background:var(--soft);padding:12px;border:1px solid var(--line);border-radius:8px;font-size:12px}.radio-row input{accent-color:var(--accent);margin-top:5px}.radio-row small{display:block;font-size:10px;color:var(--muted);margin-top:4px}.help-copy{font-size:12px;line-height:1.8}.help-copy p{margin:0 0 14px}.help-copy strong{font-weight:600}.help-copy code{font-size:10px;background:var(--soft);padding:2px 4px;overflow-wrap:anywhere}.help-copy pre{font-size:9px;line-height:1.6;white-space:pre-wrap;background:var(--soft);border-radius:8px;padding:12px;overflow-wrap:anywhere}.notice{background:#f5f8ef;border:1px solid #e2ead7;padding:13px;border-radius:8px;font-size:11px;line-height:1.7;color:#637856}.toast{position:fixed;bottom:25px;left:50%;transform:translateX(-50%);background:#233b2d;color:white;border-radius:9px;padding:12px 20px;box-shadow:0 6px 30px #172c2622;z-index:99999;font-size:12px;max-width:calc(100vw - 32px);pointer-events:none}.fallback{margin-top:14px}.fallback textarea{width:100%;min-height:130px;font-size:10px}.saved-warning{font-size:10px;color:var(--muted);margin-top:5px}.mobile-categories select{width:100%;background:white;border:1px solid var(--line);border-radius:7px;font-size:11px;padding:7px}
@media(min-width:1640px){.grid{grid-template-columns:repeat(auto-fill,minmax(148px,1fr))}.content{padding-left:54px;padding-right:54px}.hero h1{font-size:40px}}
@media(max-width:1150px){.shell{grid-template-columns:216px minmax(0,1fr)}.sidebar{padding-left:12px;padding-right:12px}.content{padding-left:26px;padding-right:26px}.hero-demo{width:190px;padding:18px}.hero h1{font-size:32px}.toolrow{gap:7px}.toolrow .btn{padding:9px 10px}.grid{grid-template-columns:repeat(auto-fill,minmax(124px,1fr))}.stats{gap:17px}.stats span+span{padding-left:17px}}
@media(max-width:880px){.hero-demo{display:none}.toolrow .btn span{display:none}.toolrow .btn{width:42px}.hero{padding-top:26px}.stats{gap:14px;font-size:10px}.stats span+span{padding-left:14px}.result-head .hint{display:none}.appearance{gap:18px}.grid{grid-template-columns:repeat(auto-fill,minmax(122px,1fr))}.footer{flex-wrap:wrap}}
@media(max-width:680px){.shell{display:block}.sidebar{display:none}.content{padding:0 18px 28px}.topline{height:54px;font-size:10px}.hero{padding:27px 0 20px}.hero h1{font-size:32px}.hero p{font-size:12px}.stats{padding-bottom:20px;justify-content:space-between;gap:7px}.stats span+span{padding-left:12px}.stats strong{font-size:12px}.tools{padding-top:12px}.mobile-categories{display:block;margin-top:11px}.searchbox{padding:0 10px;gap:7px}.searchbox input{font-size:11px}.searchbox kbd{display:none}.searchbox svg{width:16px;height:16px}.result-head{padding:18px 0 14px}.grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.inspect{min-height:153px}.icon-card .name{font-size:11px}.icon-card .identifier{font-size:9px}.appearance{gap:18px 14px}.control input[type=range]{width:118px}.appearance .reset{margin-left:0}.dialog-body{padding:20px}.dialog-head{padding:13px 20px}.actions .btn{font-size:10px;padding:9px}.footer{font-size:9px}.version{font-size:9px}.btn{font-size:10px}.control{max-width:100%}}
@media(prefers-reduced-motion:reduce){*{transition:none!important;scroll-behavior:auto!important}}
@media print{.sidebar,.tools,.topline,.hero-demo,.mark,.more,.footer,.toast,.hint,dialog{display:none!important}.shell{display:block}.content{padding:0;max-width:none}.grid{grid-template-columns:repeat(5,1fr)}.icon-card{break-inside:avoid}.inspect{min-height:130px}.hero{padding:0 0 15px}.stats{padding-bottom:10px}}
`;
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const normalize = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const stopWords = new Set(['a','o','as','os','de','da','do','das','dos','e','em','no','na','nos','nas','para','por','um','uma','com']);
  const licenseComment = '<!--\n' + DATA.license.replace(/--/g,'—') + '\n-->\n';
  const byId = new Map(DATA.icons.map(icon => [icon.id,icon]));
  const byCategory = new Map(DATA.categories.map(category => [category.id,category]));
  const ui = id => {
    const code = byId.get(id)?.code || DATA.interfaceIcons?.[id];
    return code ? code.replace('<svg ','<svg aria-hidden="true" focusable="false" ') : '';
  };
  const searchable = new Map(DATA.icons.map(icon => [icon.id,normalize([
    icon.id,icon.name,icon.component,icon.label,icon.keywords,icon.contextLabels.join(' '),icon.legacyUsage,
    ...icon.contexts.map(id => byCategory.get(id)?.label || '')
  ].join(' '))]));

  class DSIconLibrary extends HTMLElement {
    constructor() {
      super();
      this.root = this.attachShadow({mode:'open'});
      this.state = {scope:'all',category:'all',query:'',limit:60,size:DATA.tokens.size || 24,stroke:DATA.tokens.strokeWidth || 1.8,color:'#1c3758',exportColor:'inherit'};
      this.favorites = new Set();
      this.lastFocusedIcon = '';
      this.toastTimer = null;
    }
    connectedCallback() {
      if (this.ready) return;
      this.ready = true;
      const brand = getComputedStyle(this).getPropertyValue('--ds-icon-color').trim();
      if (/^#[0-9a-f]{6}$/i.test(brand)) this.state.color = brand;
      this.defaultColor = this.state.color;
      this.storageKey = 'ds-icon-library-v1:' + location.pathname + ':' + (this.getAttribute('storage-key') || 'default');
      this.restore();
      this.render();
      this.bind();
      this.applyAppearance();
      this.renderResults();
      this.shortcut = event => {
        if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey || this.root.querySelector('dialog[open]')) return;
        if (event.composedPath().some(el => /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName || '') || el.isContentEditable)) return;
        const instances = this.ownerDocument.querySelectorAll('ds-icon-library');
        if (instances.length > 1 && !event.composedPath().includes(this)) return;
        event.preventDefault(); this.$('#search').focus();
      };
      this.ownerDocument.addEventListener('keydown',this.shortcut);
    }
    disconnectedCallback() {
      if (this.shortcut) this.ownerDocument.removeEventListener('keydown',this.shortcut);
      clearTimeout(this.toastTimer);
    }
    $(selector) { return this.root.querySelector(selector); }
    restore() {
      try {
        const saved = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        this.favorites = new Set((Array.isArray(saved.favorites) ? saved.favorites : []).filter(id => byId.has(id)));
        const appearance = saved.appearance || {};
        if (/^#[0-9a-f]{6}$/i.test(appearance.color || '')) this.state.color = appearance.color;
        if (Number.isFinite(appearance.size) && appearance.size>=16 && appearance.size<=64) this.state.size = appearance.size;
        if (Number.isFinite(appearance.stroke) && appearance.stroke>=1 && appearance.stroke<=3) this.state.stroke = appearance.stroke;
        if (['inherit','preview'].includes(appearance.exportColor)) this.state.exportColor = appearance.exportColor;
      } catch (_) { /* O catálogo também funciona quando o navegador bloqueia armazenamento. */ }
    }
    persist() {
      try {
        const {color,size,stroke,exportColor} = this.state;
        localStorage.setItem(this.storageKey,JSON.stringify({favorites:[...this.favorites],appearance:{color,size,stroke,exportColor}}));
      } catch (_) {
        this.toast('Alterações mantidas nesta sessão; o navegador bloqueou o salvamento local.');
      }
    }
    render() {
      const total = DATA.icons.length;
      const originals = DATA.icons.filter(icon=>icon.legacy).length;
      this.root.innerHTML = `<style>${CSS}</style>
      <div class="shell">
        <aside class="sidebar" aria-label="Navegação do banco de ícones">
          <div class="brand"><span class="brand-mark">${ui('layout-grid')}</span><div><strong>Base</strong><small>DESIGN SYSTEMS</small></div></div>
          <nav class="nav-global" aria-label="Coleções">
            <button class="navbutton" data-scope="all" aria-pressed="true">${ui('layout-grid')}<span class="label">Todos os ícones</span><span class="count">${total}</span></button>
            <button class="navbutton" data-scope="legacy" aria-pressed="false">${ui('layers')}<span class="label">Já utilizados</span><span class="count">${originals}</span></button>
            <button class="navbutton" data-scope="favorites" aria-pressed="false">${ui('star')}<span class="label">Favoritos</span><span class="count favorite-count">0</span></button>
          </nav>
          <div class="navtitle eyebrow">Explorar por contexto</div>
          <nav class="category-list" aria-label="Categorias de ícones">${DATA.categories.map(category=>`<button class="navbutton" data-category="${category.id}" aria-pressed="false">${ui(category.icon)}<span class="label">${escapeHTML(category.label)}</span><span class="count">${DATA.icons.filter(icon=>icon.contexts.includes(category.id)).length}</span></button>`).join('')}</nav>
          <div class="sidebar-foot"><span>Outline · 24 × 24</span><button class="text-link" data-action="help">Como usar</button></div>
        </aside>
        <main class="content">
          <div class="topline"><div class="breadcrumbs"><span>Design Systems</span>${ui('chevron-right')}<span>Recursos compartilhados</span></div><span class="version"><span class="dot"></span>Versão 1.0</span></div>
          <header class="hero"><div><div class="eyebrow">Biblioteca visual</div><h1>Banco de ícones</h1><p>Encontre o símbolo certo para cada assunto.<br>Uma base consistente para jornadas, processos e interfaces.</p></div><div class="hero-demo" aria-hidden="true"><div class="demo-icons">${['route','users','layers','sparkles'].map(ui).join('')}</div><div class="demo-caption"><span>UM MESMO TRAÇO</span><span>1,8 px</span></div></div></header>
          <div class="stats"><span><strong>${total}</strong> ícones</span><span><strong>${DATA.categories.length}</strong> contextos</span><span><strong>${originals}</strong> já utilizados</span></div>
          <section class="tools" aria-label="Busca e personalização">
            <div class="toolrow"><div class="searchbox">${ui('search')}<input id="search" type="search" placeholder="Buscar ícone, assunto ou palavra-chave…" aria-label="Buscar ícone, assunto ou palavra-chave" autocomplete="off"><button type="button" class="clear" id="clear-search" aria-label="Limpar busca" hidden>${ui('x')}</button><kbd aria-hidden="true">/</kbd></div><button class="btn" data-action="appearance" aria-expanded="false" aria-controls="appearance" title="Aparência dos ícones" aria-label="Aparência dos ícones">${ui('sliders-horizontal')}<span>Aparência</span></button><button class="btn primary" data-action="export" title="Exportar banco de ícones" aria-label="Exportar banco de ícones">${ui('download')}<span>Exportar</span></button></div>
            <div class="mobile-categories"><select id="mobile-filter" aria-label="Filtrar coleção ou contexto"><option value="all">Todos os ícones · ${total}</option><option value="favorites">Favoritos</option><optgroup label="Contextos">${DATA.categories.map(category=>`<option value="${category.id}">${escapeHTML(category.label)}</option>`).join('')}</optgroup></select></div>
            <div id="appearance" class="appearance" hidden>
              <div class="control"><label for="color-picker">Cor da prévia</label><div class="control-row"><input type="color" id="color-picker" aria-label="Escolher cor dos ícones"><input id="color-hex" class="hex mono" aria-label="Cor hexadecimal" maxlength="7" spellcheck="false"></div></div>
              <div class="control"><label for="size">Tamanho <output id="size-output">24 px</output></label><input id="size" type="range" min="16" max="64" step="4" value="24"></div>
              <div class="control"><label for="stroke">Traço <output id="stroke-output">1,8 px</output></label><input id="stroke" type="range" min="1" max="3" step="0.1" value="1.8"></div>
              <div class="control"><label for="export-color">Cor ao exportar</label><select id="export-color" class="export-color"><option value="inherit">Herdar cor do DS</option><option value="preview">Usar cor da prévia</option></select></div>
              <button class="reset" data-action="reset-appearance">Restaurar padrão</button>
            </div>
          </section>
          <div class="result-head"><div><h2 id="result-title">Todos os ícones</h2><p id="result-summary" role="status" aria-live="polite"></p></div><span class="hint"><span class="dot" style="background:#8fa981"></span>Usado na jornada e no PAV</span></div>
          <div id="icon-grid" class="grid" aria-label="Ícones disponíveis"></div>
          <div id="empty" class="empty" hidden>${ui('search')}<h3 id="empty-title">Nenhum ícone encontrado</h3><p id="empty-message"></p><button class="btn" data-action="clear-filters">Ver todos os ícones</button></div>
          <div class="more"><button id="show-more" class="btn" data-action="more">Mostrar mais ícones ${ui('chevron-down')}</button></div>
          <footer class="footer"><span>SVGs incorporados · disponíveis sem internet</span><span>Base <a href="https://lucide.dev/" target="_blank" rel="noopener noreferrer">Lucide</a> · <button class="text-link" data-action="help">Guia e créditos</button></span></footer>
        </main>
      </div>
      <dialog id="detail-dialog" aria-labelledby="detail-heading"><div class="dialog-head"><span>Detalhes do ícone</span><button class="close-dialog" data-close="detail-dialog" aria-label="Fechar detalhes">${ui('x')}</button></div><div class="dialog-body" id="detail-body"></div></dialog>
      <dialog id="export-dialog" aria-labelledby="export-heading"><div class="dialog-head"><span>Exportar recursos</span><button class="close-dialog" data-close="export-dialog" aria-label="Fechar exportação">${ui('x')}</button></div><div class="dialog-body"><h2 id="export-heading" style="font-size:23px;letter-spacing:-.04em">Leve para o seu DS</h2><p class="muted" style="font-size:12px;margin-top:6px">Escolha quais ícones e o formato de entrega.</p><div class="export-options"><label class="radio-row"><input type="radio" name="export-scope" value="all" checked><span>Banco completo<small>${total} ícones em 24 categorias.</small></span></label><label class="radio-row"><input type="radio" name="export-scope" value="filtered"><span>Resultados atuais<small id="export-filter-count"></small></span></label></div><label for="export-format" class="detail-label">Formato do arquivo</label><select id="export-format" class="wide-select"><option value="module">Seção HTML para incluir no DS</option><option value="json">JSON com nomes, contextos e SVGs</option><option value="js">JavaScript · ICON_BANK</option><option value="sprite">SVG sprite</option></select><div class="notice" id="export-explanation"></div><div class="actions"><button class="btn primary" data-action="download-bank">${ui('download')}Baixar arquivo</button></div><p class="detail-foot">As atribuições dos desenhos acompanham os arquivos.</p></div></dialog>
      <dialog id="help-dialog" aria-labelledby="help-heading"><div class="dialog-head"><span id="help-heading">Como usar este banco</span><button class="close-dialog" data-close="help-dialog" aria-label="Fechar guia">${ui('x')}</button></div><div class="dialog-body help-copy"><p><strong>Encontre pelo assunto.</strong> Busque em português, pelo nome oficial em inglês ou pelo nome do componente. Um desenho pode atender a vários contextos.</p><p><strong>Preserve a consistência.</strong> O padrão é 24 × 24, traço de 1,8 e pontas arredondadas. Em Aparência, ajuste a prévia e escolha entre herdar a cor do DS ou exportar uma cor fixa.</p><p><strong>Inclua no próximo documento.</strong> Em Exportar, escolha “Seção HTML para incluir no DS”. Copie o conteúdo do arquivo para dentro do <code>&lt;body&gt;</code> do Design System. A seção já leva busca, filtros e SVGs incorporados.</p><p><strong>Adapte à empresa.</strong> A seção aceita as propriedades de cor e fonte abaixo:</p><pre>ds-icon-library {\n  --ds-icon-color: #1c3758;\n  --ds-library-font: var(--font-body, Arial, sans-serif);\n}</pre><p><strong>Use no DS anterior.</strong> A exportação JavaScript mantém o formato <code>ICON_BANK = [{name, code}]</code>. Substitua o array antigo pelo novo.</p><p><strong>Favoritos.</strong> Ficam neste navegador quando o armazenamento local está disponível. Exporte a seleção para levar os mesmos ícones a outro computador.</p><p><strong>Acessibilidade.</strong> Ao copiar um ícone, escolha se ele acompanha um texto ou se precisa de um nome próprio. Mantenha texto nas ações cujo significado não seja evidente.</p><details><summary style="cursor:pointer;font-size:12px">Origem e licenças</summary><p style="margin-top:12px">29 desenhos preservados do banco Journey Map PAV v2. Expansão: Lucide ${escapeHTML(DATA.lucideVersion)}. <a href="https://lucide.dev/license" target="_blank" rel="noopener noreferrer">Licença oficial</a>.</p><pre>${escapeHTML(DATA.license)}</pre></details></div></dialog>
      <dialog id="copy-dialog" aria-labelledby="copy-heading"><div class="dialog-head"><span id="copy-heading">Copiar conteúdo</span><button class="close-dialog" data-close="copy-dialog" aria-label="Fechar cópia">${ui('x')}</button></div><div class="dialog-body"><p style="font-size:12px">O navegador bloqueou a cópia automática. Selecione o texto abaixo e use Ctrl+C ou ⌘C.</p><div class="fallback"><textarea id="copy-fallback" aria-label="Conteúdo para copiar" readonly></textarea></div></div></dialog>
      <div id="toast" class="toast" role="status" hidden></div>`;
    }
    bind() {
      this.$('#search').addEventListener('input',event=>{
        this.state.query=event.target.value;this.state.limit=60;this.renderResults();
      });
      this.$('#clear-search').addEventListener('click',()=>{
        this.state.query='';this.state.limit=60;this.$('#search').value='';this.renderResults();this.$('#search').focus();
      });
      this.$('#mobile-filter').addEventListener('change',event=>{
        const value=event.target.value;
        this.state.scope=['all','legacy','favorites'].includes(value)?value:'all';
        this.state.category=byCategory.has(value)?value:'all';
        this.state.limit=60;this.renderResults();
      });
      this.root.addEventListener('click',event=>{
        const button=event.target.closest('button');if(!button)return;
        if(button.dataset.scope){this.state.scope=button.dataset.scope;this.state.category='all';this.state.limit=60;this.renderResults();}
        if(button.dataset.category){this.state.category=button.dataset.category;this.state.scope='all';this.state.limit=60;this.renderResults();}
        if(button.dataset.inspect)this.openDetail(button.dataset.inspect);
        if(button.dataset.favorite)this.toggleFavorite(button.dataset.favorite);
        if(button.dataset.close)this.$('#'+button.dataset.close).close();
        switch(button.dataset.action){
          case 'appearance': {const expanded=this.$('#appearance').hidden;this.$('#appearance').hidden=!expanded;button.setAttribute('aria-expanded',String(expanded));break;}
          case 'reset-appearance': Object.assign(this.state,{size:24,stroke:1.8,color:this.defaultColor,exportColor:'inherit'});this.applyAppearance();this.persist();break;
          case 'more': {const oldLimit=this.state.limit;this.state.limit+=60;this.renderResults();const card=this.$('#icon-grid').children[oldLimit];card?.querySelector('.inspect').focus();break;}
          case 'clear-filters': Object.assign(this.state,{scope:'all',category:'all',query:'',limit:60});this.$('#search').value='';this.renderResults();break;
          case 'help': this.$('#help-dialog').showModal();break;
          case 'export': this.openExport();break;
          case 'download-bank': this.exportBank();break;
          case 'copy-svg': this.copyText(licenseComment+this.selectedSvg(),'SVG copiado.');break;
          case 'download-svg': this.download(licenseComment+this.selectedSvg(),this.selectedId+'.svg','image/svg+xml');break;
          case 'copy-name': this.copyText(byId.get(this.selectedId).name,'Nome copiado.');break;
        }
      });
      this.$('#color-picker').addEventListener('input',event=>{this.state.color=event.target.value;this.applyAppearance();this.persist();});
      this.$('#color-hex').addEventListener('change',event=>{
        let value=event.target.value.trim();if(!value.startsWith('#'))value='#'+value;
        if(/^#[0-9a-f]{6}$/i.test(value)){this.state.color=value;this.applyAppearance();this.persist();}else{event.target.value=this.state.color;this.toast('Use seis dígitos na cor, por exemplo #1c3758.');}
      });
      for(const key of ['size','stroke'])this.$('#'+key).addEventListener('input',event=>{this.state[key]=Number(event.target.value);this.applyAppearance();this.persist();});
      this.$('#export-color').addEventListener('change',event=>{this.state.exportColor=event.target.value;this.persist();this.updateCode();});
      this.$('#export-format').addEventListener('change',()=>this.exportExplanation());
      this.root.querySelectorAll('dialog').forEach(dialog=>{
        dialog.addEventListener('click',event=>{
          if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();
          if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();
        });
        if(dialog.id==='detail-dialog')dialog.addEventListener('close',()=>{
          (this.$(`[data-inspect="${this.lastFocusedIcon}"]`)||this.$('#search')).focus({preventScroll:true});
        });
      });
    }
    applyAppearance() {
      this.style.setProperty('--preview-color',this.state.color);
      this.style.setProperty('--icon-size',this.state.size+'px');
      this.style.setProperty('--icon-stroke',this.state.stroke);
      this.$('#color-picker').value=this.state.color;this.$('#color-hex').value=this.state.color.toUpperCase();
      this.$('#size').value=this.state.size;this.$('#stroke').value=this.state.stroke;
      this.$('#size-output').textContent=this.state.size+' px';
      this.$('#stroke-output').textContent=String(this.state.stroke).replace('.',',')+' px';
      this.$('#export-color').value=this.state.exportColor;
      this.updateCode();
    }
    filtered() {
      const terms=normalize(this.state.query).split(/\s+/).filter(term=>term&&!stopWords.has(term));
      return DATA.icons.filter(icon=>{
        if(this.state.scope==='legacy'&&!icon.legacy)return false;
        if(this.state.scope==='favorites'&&!this.favorites.has(icon.id))return false;
        if(this.state.category!=='all'&&!icon.contexts.includes(this.state.category))return false;
        return terms.every(term=>searchable.get(icon.id).includes(term));
      });
    }
    renderResults() {
      const results=this.filtered();
      const visible=results.slice(0,this.state.limit);
      const title=this.state.category!=='all'?byCategory.get(this.state.category).label:({all:'Todos os ícones',legacy:'Ícones já utilizados',favorites:'Seus favoritos'}[this.state.scope]);
      this.$('#result-title').textContent=title;
      this.$('#result-summary').textContent=this.state.query?`${results.length} ${results.length===1?'resultado':'resultados'} para “${this.state.query}”`:`${visible.length} de ${results.length} ícones${this.state.scope==='legacy'?' · desenhos e nomes preservados':''}`;
      this.$('#clear-search').hidden=!this.state.query;
      this.$('#icon-grid').innerHTML=visible.map(icon=>`<div class="icon-card">${icon.legacy?'<span class="legacy-dot" title="Ícone do banco anterior"></span>':''}<button class="inspect" data-inspect="${icon.id}" aria-label="Ver ${escapeHTML(icon.label)}"><span class="glyph">${ui(icon.id)}</span><span class="name">${escapeHTML(icon.label)}</span><span class="identifier mono">${icon.id}</span></button><button class="mark" data-favorite="${icon.id}" aria-pressed="${this.favorites.has(icon.id)}" aria-label="${this.favorites.has(icon.id)?'Remover dos':'Adicionar aos'} favoritos: ${escapeHTML(icon.label)}" title="${this.favorites.has(icon.id)?'Remover dos favoritos':'Adicionar aos favoritos'}">${ui('star')}</button></div>`).join('');
      this.$('#empty').hidden=results.length>0;
      this.$('#empty-title').textContent=this.state.scope==='favorites'&&!this.favorites.size?'Sua seleção começa aqui':'Nenhum ícone encontrado';
      this.$('#empty-message').textContent=this.state.scope==='favorites'&&!this.favorites.size?'Marque a estrela nos ícones que deseja reunir para um documento.':'Tente outro termo ou explore uma categoria mais ampla.';
      this.$('#show-more').hidden=results.length<=this.state.limit;
      this.root.querySelectorAll('[data-scope]').forEach(button=>button.setAttribute('aria-pressed',String(this.state.category==='all'&&button.dataset.scope===this.state.scope)));
      this.root.querySelectorAll('[data-category]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.category===this.state.category)));
      this.root.querySelectorAll('.favorite-count').forEach(el=>el.textContent=this.favorites.size);
      this.$('#mobile-filter').value=this.state.category!=='all'?this.state.category:this.state.scope;
    }
    toggleFavorite(id) {
      this.favorites.has(id)?this.favorites.delete(id):this.favorites.add(id);
      this.persist();this.renderResults();
      const detailButton=this.$('#detail-body [data-favorite]');
      if(detailButton&&this.selectedId===id){detailButton.setAttribute('aria-pressed',String(this.favorites.has(id)));detailButton.setAttribute('aria-label',this.favorites.has(id)?'Remover dos favoritos':'Adicionar aos favoritos');detailButton.textContent=this.favorites.has(id)?'Salvo':'Favoritar';}
      if(!this.$('#detail-dialog').open)this.$(`[data-favorite="${id}"]`)?.focus({preventScroll:true});
    }
    formatSvg(icon,informative=false) {
      const element=new DOMParser().parseFromString(icon.code,'image/svg+xml').documentElement;
      for(const attribute of ['role','aria-label','aria-hidden','color'])element.removeAttribute(attribute);
      element.setAttribute('width',this.state.size);element.setAttribute('height',this.state.size);element.setAttribute('stroke-width',this.state.stroke);
      element.setAttribute('stroke',this.state.exportColor==='inherit'?'currentColor':this.state.color);
      if(this.state.exportColor==='preview')element.setAttribute('color',this.state.color);
      element.setAttribute('focusable','false');
      if(informative){element.setAttribute('role','img');element.setAttribute('aria-label',icon.label);}
      else element.setAttribute('aria-hidden','true');
      return new XMLSerializer().serializeToString(element);
    }
    selectedSvg() { return this.formatSvg(byId.get(this.selectedId),this.$('#accessible-mode')?.value==='informative'); }
    updateCode() {
      if(this.selectedId&&this.$('#detail-code'))this.$('#detail-code').value=this.selectedSvg();
    }
    openDetail(id) {
      const icon=byId.get(id);if(!icon)return;
      this.selectedId=id;this.lastFocusedIcon=id;
      this.$('#detail-body').innerHTML=`<div class="big-preview">${ui(id)}<span class="preview-size">Prévia ampliada · 64 px</span></div><div class="detail-title"><h2 id="detail-heading">${escapeHTML(icon.label)}</h2><button class="btn small" data-favorite="${id}" aria-pressed="${this.favorites.has(id)}" aria-label="${this.favorites.has(id)?'Remover dos favoritos':'Adicionar aos favoritos'}">${this.favorites.has(id)?'Salvo':'Favoritar'}</button></div><p class="detail-id mono">${icon.id}</p><div>${icon.contexts.map(cid=>`<span class="pill">${escapeHTML(byCategory.get(cid).label)}</span>`).join('')}</div><div class="detail-section"><h3>Aplicações sugeridas</h3><p>${escapeHTML(icon.contextLabels.join(' · '))}</p></div>${icon.legacy?`<div class="legacy-note"><strong>Uso anterior preservado</strong><br>${escapeHTML(icon.legacyUsage)}</div>`:''}<div class="detail-section"><h3>Nome no banco</h3><div style="display:flex;align-items:center;justify-content:space-between;gap:12px"><code style="font-size:11px;overflow-wrap:anywhere">${escapeHTML(icon.name)}</code><button class="btn small" data-action="copy-name">Copiar nome</button></div></div><label class="detail-label" for="accessible-mode">Como o ícone será usado?</label><select id="accessible-mode" class="wide-select"><option value="decorative">Acompanha um texto visível</option><option value="informative">É informativo e precisa de um nome</option></select><label class="detail-label" for="detail-code">SVG pronto para usar</label><textarea id="detail-code" class="detail-code" spellcheck="false" readonly></textarea><div class="actions"><button class="btn primary" data-action="copy-svg">${ui('copy')}Copiar SVG</button><button class="btn" data-action="download-svg">${ui('download')}Baixar SVG</button></div><p class="detail-foot">${this.state.exportColor==='inherit'?'A cor acompanha o texto do DS.':'A cor da prévia será aplicada ao arquivo.'} Licenças incluídas na cópia e no download.</p>`;
      this.$('#accessible-mode').addEventListener('change',()=>this.updateCode());
      this.updateCode();this.$('#detail-dialog').showModal();
    }
    openExport() {
      const count=this.filtered().length;
      this.$('#export-filter-count').textContent=`${count} ${count===1?'ícone':'ícones'}, respeitando busca, categoria e favoritos.`;
      this.$('input[name="export-scope"][value="filtered"]').disabled=!count;
      const isFiltered=this.state.query||this.state.scope!=='all'||this.state.category!=='all';
      this.$(`input[name="export-scope"][value="${isFiltered&&count?'filtered':'all'}"]`).checked=true;
      this.exportExplanation();this.$('#export-dialog').showModal();
    }
    exportExplanation() {
      this.$('#export-explanation').textContent={
        module:'Uma seção completa com busca, categorias, favoritos e ícones. Cole o conteúdo do arquivo dentro do HTML do Design System. Funciona sem internet.',
        json:'Dados organizados: nomes, SVGs, categorias, palavras de busca, origem e usos anteriores. Para reutilizar o banco em outros documentos.',
        js:'Array ICON_BANK no formato name + code, compatível com o DS anterior. Substitua a declaração antiga por esta.',
        sprite:'Símbolos SVG para reutilização com <use href="#ds-nome-do-icone">. Cada símbolo mantém a grade 24 × 24.'
      }[this.$('#export-format').value];
    }
    exportBank() {
      const scope=this.$('input[name="export-scope"]:checked').value;
      const list=scope==='all'?DATA.icons:this.filtered();if(!list.length)return;
      const format=this.$('#export-format').value;
      const ids=new Set(list.flatMap(icon=>icon.contexts));
      const exported={...DATA,iconCount:list.length,legacyCount:list.filter(icon=>icon.legacy).length,categories:DATA.categories.filter(category=>ids.has(category.id)),tokens:{...DATA.tokens,size:this.state.size,strokeWidth:this.state.stroke,stroke:this.state.exportColor==='inherit'?'currentColor':this.state.color},icons:list.map(icon=>({...icon,code:this.formatSvg(icon)}))};
      const base='icones-ds-'+(scope==='all'?'completo':'selecao');
      if(format==='json')this.download(JSON.stringify(exported,null,2),base+'.json','application/json');
      if(format==='js')this.download('/*\n'+DATA.license.replace(/\*\//g,'* /')+'\n*/\nconst ICON_BANK = '+JSON.stringify(exported.icons.map(icon=>({name:icon.name,code:icon.code})),null,2)+';\n',base+'.js','text/javascript');
      if(format==='sprite'){
        const symbols=exported.icons.map(icon=>{
          const doc=new DOMParser().parseFromString(icon.code,'image/svg+xml');const root=doc.documentElement;
          return '<symbol id="ds-'+icon.id+'" viewBox="0 0 24 24" fill="none" stroke="'+escapeHTML(exported.tokens.stroke)+'"'+(this.state.exportColor==='preview'?' color="'+this.state.color+'"':'')+' stroke-width="'+this.state.stroke+'" stroke-linecap="round" stroke-linejoin="round">'+root.innerHTML+'</symbol>';
        }).join('\n');
        this.download(licenseComment+'<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\n'+symbols+'\n</svg>',base+'-sprite.svg','image/svg+xml');
      }
      if(format==='module'){
        // Definição autossuficiente: função, dados e estilos seguem juntos no HTML exportado.
        const code='('+mountIconBank.toString()+')('+JSON.stringify(exported).replace(/</g,'\\u003c')+');';
        const host='<ds-icon-library style="--ds-icon-color:'+this.state.color+'"></ds-icon-library>';
        this.download('<!-- Cole esta seção no body do seu Design System. -->\n'+host+'\n<script>\n'+code.replace(/<\/script/gi,'<\\/script')+'\n<'+ '/script>\n',base+'-modulo.html','text/html');
      }
      this.$('#export-dialog').close();
    }
    async copyText(value,successMessage) {
      try {
        if(!navigator.clipboard?.writeText)throw Error('Clipboard API indisponível');
        await navigator.clipboard.writeText(value);this.toast(successMessage);return;
      } catch (_) { /* Tenta também o caminho suportado em arquivos locais. */ }
      const area=document.createElement('textarea');area.value=value;area.style.cssText='position:fixed;top:0;left:-9999px';
      const parent=this.root.querySelector('dialog[open]')||this.root;parent.append(area);area.select();
      let copied=false;try{copied=document.execCommand('copy');}catch(_){}area.remove();
      if(copied){this.toast(successMessage);return;}
      this.$('#copy-fallback').value=value;this.$('#copy-dialog').showModal();this.$('#copy-fallback').focus();this.$('#copy-fallback').select();
    }
    download(value,filename,type) {
      const blob=new Blob([value],{type:type+';charset=utf-8'});const url=URL.createObjectURL(blob);
      const a=document.createElement('a');a.href=url;a.download=filename;this.root.append(a);a.click();a.remove();
      setTimeout(()=>URL.revokeObjectURL(url),1000);this.toast('Arquivo preparado para download.');
    }
    toast(message) {
      clearTimeout(this.toastTimer);this.$('#toast').textContent=message;this.$('#toast').hidden=false;
      this.toastTimer=setTimeout(()=>{this.$('#toast').hidden=true;},3400);
    }
  }
  if(!customElements.get('ds-icon-library'))customElements.define('ds-icon-library',DSIconLibrary);
}
mountIconBank(ICON_DATA);
