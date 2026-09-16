const MI_PRODUCTS=['Planejamento de lançamento de produto','Programa de relacionamento','House de vendas','House de marketing','Inteligência de marketing imobiliário','Gestão de negócios imobiliários'];
const MI_COLORS=[['Roxo','#501D7B'],['Rosa','#FF0087'],['Ciano','#00B2DC'],['Preto','#000000'],['Branco','#FFFFFF']];
const miAsset=(kind,n)=>`../assets/mercado-imobi-${kind}-${n}.svg`;
function miDownload(kind,n,label){return `<a class="utility small" href="${miAsset(kind,n)}" download="mercado-imobi-${kind}-${n}.svg" aria-label="Baixar ${escapeHtml(label)} em SVG">${icon('download',16)}SVG</a>`;}
function miProducts(){return `<div class="product-grid">${MI_PRODUCTS.map((name,i)=>`<article class="graphic-card"><div class="product-stage"><img src="${miAsset('produto-simbolo',i+1)}" alt="" width="140" height="160" loading="lazy"><div><span class="product-number">PRODUTO ${String(i+1).padStart(2,'0')}</span><h3>${name}</h3></div></div><div class="panel-footer"><span>Marca do produto</span>${miDownload('produto',i+1,name)}</div></article>`).join('')}</div>`;}
PAGES['visao-geral']=()=>`
 <section class="mercado-imobi-hero"><div><span class="brand-kicker">Consultoria e educação imobiliária</span><h2>Uma marca.<br>Muitas conexões.</h2><p>Identidade, componentes e recursos para cada ponto de contato.</p><a href="#identidade" class="hero-link">Conhecer a identidade ${icon('arrow-up-right',18)}</a></div><img src="../assets/mercado-imobi-logo-2.svg" alt="Mercado Imobi" width="915" height="381"></section>
 ${sectionHeading('Explore o Design System')}
 <div class="foundation-row"><a class="foundation-card" href="#cores"><div><h3>Cores</h3><p>A paleta da Mercado Imobi.</p><div class="mini-palette">${MI_COLORS.map(([,color])=>`<i style="background:${color}"></i>`).join('')}</div></div>${icon('arrow-up-right',20)}</a><a class="foundation-card" href="#tipografia"><div><h3>Tipografia</h3><p>DIN 2014</p><span class="type-preview">Aa Bb Cc</span></div>${icon('arrow-up-right',20)}</a></div>
 ${sectionHeading('Componentes')}
 <div class="component-index">${PAGE_DEFINITIONS.filter(page=>page.group==='Componentes').map(page=>`<a href="#${page.id}" class="index-card"><span class="index-icon">${icon(page.icon,22)}</span><strong>${page.label}</strong><p>${['inputs','text-field','textarea'].includes(page.id)?'7 estados':page.id==='botoes'?'3 variações · 5 estados':page.id==='alertas'?'5 variações':'Variações e exemplos'}</p><span class="arrow">${icon('arrow-up-right',16)}</span></a>`).join('')}</div>
 <a class="icon-feature" href="#icones"><span class="feature-glyphs">${['building-2','chart-no-axes-combined','users','graduation-cap','workflow','route'].map(id=>icon(id,27)).join('')}</span><div><h2>Banco de ícones</h2><p>447 ícones · 24 categorias</p></div><span class="feature-arrow">${icon('arrow-up-right',24)}</span></a>
 ${sectionHeading('Produtos')}${miProducts()}`;
PAGES.identidade=()=>`
 ${sectionHeading('Logotipos')}
 <div class="graphics-grid asset-three">${[['Colorido',1],['Branco',2],['Preto',3]].map(([label,n])=>`<article class="graphic-card"><div class="graphic-stage logo ${n===2?'dark':''}"><img src="${miAsset('logo',n)}" alt="Mercado Imobi — logotipo ${label.toLowerCase()}" width="915" height="381"></div><div class="panel-footer"><span>${label}</span>${miDownload('logo',n,'logotipo '+label.toLowerCase())}</div></article>`).join('')}</div>
 ${sectionHeading('Símbolos')}
 <div class="graphics-grid asset-three">${[['Colorido',1],['Branco',2],['Preto',3]].map(([label,n])=>`<article class="graphic-card"><div class="graphic-stage symbol ${n===2?'dark':''}"><img src="${miAsset('icone',n)}" alt="Símbolo ${label.toLowerCase()} da Mercado Imobi" width="305" height="324"></div><div class="panel-footer"><span>${label}</span>${miDownload('icone',n,'símbolo '+label.toLowerCase())}</div></article>`).join('')}</div>
 ${sectionHeading('Marcas dos produtos')}${miProducts()}`;
PAGES.cores=()=>`
 ${sectionHeading('Paleta da marca')}
 <div class="brand-swatches">${MI_COLORS.map(([label,color])=>`<article class="brand-swatch"><div class="color-block" style="background:${color};color:${['#501D7B','#000000'].includes(color)?'#fff':'#000'}"><span>Aa</span></div><div class="swatch-text"><strong>${label}</strong><button type="button" data-action="copy-color" data-color="${color}" aria-label="Copiar ${color}">${color}${icon('copy',14)}</button></div></article>`).join('')}</div>
 ${sectionHeading('Combinações')}
 <div class="usage-pairs"><div style="background:#501d7b;color:white"><strong>Roxo + branco</strong>Ações principais e navegação.</div><div style="background:#00b2dc;color:black"><strong>Ciano + preto</strong>Seleção e destaques.</div><div style="background:#ff0087;color:black"><strong>Rosa + preto</strong>Notificações e detalhes.</div></div>
 ${sectionHeading('Aplicações da marca')}
 <div class="color-combinations"><div style="background:#501d7b;color:#fff"><span>Mercado Imobi.</span><p>Consultoria e educação</p><img src="../assets/mercado-imobi-icone-2.svg" alt=""></div><div style="background:#00b2dc;color:#000"><span>Mercado Imobi.</span><p>Conexões que transformam</p><img src="../assets/mercado-imobi-icone-3.svg" alt=""></div><div style="background:#ff0087;color:#000"><span>Mercado Imobi.</span><p>Conhecimento em movimento</p><img src="../assets/mercado-imobi-icone-3.svg" alt=""></div></div>`;
PAGES.tipografia=()=>`
 <section class="type-hero"><div><span class="eyebrow">Família tipográfica</span><h2>DIN 2014</h2><p>Regular · ExtraBold</p></div><span class="type-hero-aa" aria-hidden="true">Aa</span></section>
 <p class="type-status">Família identificada nos materiais da marca. A prévia usa DIN 2014 quando instalada e Arial como fonte de apoio.</p>
 ${panel('Caracteres',`<div class="font-specimen"><p class="alphabet">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz</p><p class="digits">0123456789 &amp; @ # À Á Â Ã Ç É Ê Í Ó Ô Õ Ú</p></div>`)}
 ${sectionHeading('Pesos')}<div class="weight-grid">${[['Regular',400],['ExtraBold',800]].map(([label,weight])=>`<div><span style="font-weight:${weight}">Ag</span><p>${label}</p></div>`).join('')}</div>
 ${sectionHeading('Hierarquia')}<div class="type-scale">${[['Título de página','Conhecimento que conecta.',36,800],['Título de seção','Mercado em movimento.',21,800],['Corpo de texto','Uma comunicação clara em cada etapa do negócio imobiliário.',16,400],['Rótulo','Nome do empreendimento',14,400],['Texto auxiliar','Informe um nome válido.',12,400]].map(([label,text,size,weight])=>`<div><span class="scale-label">${label}</span><p style="font-size:${size}px;font-weight:${weight}">${text}</p></div>`).join('')}</div>`;
document.addEventListener('click',async event=>{
 const target=event.target.closest?.('[data-action="copy-color"]');if(!target)return;
 const value=target.dataset.color;
 try{await navigator.clipboard.writeText(value);notify('Cor copiada: '+value);}catch(_){const area=document.getElementById('copy-content');area.value=value;document.getElementById('copy-title').textContent='Copiar cor';document.getElementById('copy-dialog').showModal();area.focus();area.select();}
});
