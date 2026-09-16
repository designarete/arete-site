PAGES['visao-geral']=()=>`
 <section class="projearth-hero">
  <div><span class="brand-kicker">Engenharia de projetos</span><h2>Precisão em cada detalhe.</h2><p>Uma identidade consistente em cada ponto de contato.</p><a href="#identidade" class="hero-link">Conhecer a identidade ${icon('arrow-up-right',18)}</a></div>
  <img src="../assets/projearth-logo.svg" alt="Projearth — Engenharia de Projetos" width="727" height="326">
 </section>
 ${sectionHeading('Explore o Design System')}
 <div class="foundation-row"><a class="foundation-card" href="#cores"><div><h3>Cores</h3><p>A paleta da Projearth.</p><div class="mini-palette">${['#1c3758','#0081c8','#35c3c7','#c5e6f1','#cae1d0','#f9f9ed'].map(color=>`<i style="background:${color}"></i>`).join('')}</div></div>${icon('arrow-up-right',20)}</a><a class="foundation-card" href="#tipografia"><div><h3>Tipografia</h3><p>Barlow</p><span class="type-preview">Aa Bb Cc</span></div>${icon('arrow-up-right',20)}</a></div>
 ${sectionHeading('Componentes')}
 <div class="component-index">${PAGE_DEFINITIONS.filter(page=>page.group==='Componentes').map(page=>`<a href="#${page.id}" class="index-card"><span class="index-icon">${icon(page.icon,22)}</span><strong>${page.label}</strong><p>${['inputs','text-field','textarea'].includes(page.id)?'7 estados':page.id==='botoes'?'3 variações · 5 estados':page.id==='alertas'?'5 variações':'Variações e exemplos'}</p><span class="arrow">${icon('arrow-up-right',16)}</span></a>`).join('')}</div>
 <a class="icon-feature" href="#icones"><span class="feature-glyphs">${['workflow','building-2','ruler','layers','route','chart-no-axes-combined'].map(id=>icon(id,27)).join('')}</span><div><h2>Banco de ícones</h2><p>447 ícones · 24 categorias</p></div><span class="feature-arrow">${icon('arrow-up-right',24)}</span></a>`;

PAGES.identidade=()=>`
 ${panel('Logotipo',`<div class="brand-logo-stage"><img src="../assets/projearth-logo.svg" alt="Projearth — Engenharia de Projetos" width="727" height="326"></div><div class="panel-footer"><span>Projearth</span><a class="utility small" href="../assets/projearth-logo.svg" download="projearth-logo.svg">${icon('download',16)}Baixar SVG</a></div>`)}
 ${sectionHeading('Grafismos')}
 <div class="graphics-grid">${[1,2,3,4,5,6,7].map((n)=>`<section class="graphic-card"><div class="graphic-stage ${[2,3,5,7].includes(n)?'dark':''}"><img src="../assets/projearth-grafismo-${n}.svg" alt="Grafismo Projearth ${n}" width="648" height="206" loading="lazy"></div><div class="panel-footer"><span>Grafismo ${String(n).padStart(2,'0')}</span><a class="utility small" href="../assets/projearth-grafismo-${n}.svg" download="projearth-grafismo-${n}.svg" aria-label="Baixar grafismo ${n} em SVG">${icon('download',15)}SVG</a></div></section>`).join('')}</div>`;

PAGES.cores=()=>{
 const rows=[['Azul-marinho','#1C3758'],['Turquesa','#35C3C7'],['Azul','#0081C8'],['Azul-claro','#C5E6F1'],['Verde-claro','#CAE1D0'],['Creme','#F9F9ED'],['Branco','#FFFFFF']];
 return `${sectionHeading('Paleta da marca')}<div class="brand-swatches">${rows.map(([label,color])=>`<article class="brand-swatch"><div style="background:${color}" class="color-block"><span style="color:${['#1C3758','#0081C8'].includes(color)?'#fff':'#1c3758'}">Aa</span></div><div class="swatch-text"><strong>${label}</strong><button type="button" data-action="copy-color" data-color="${color}" aria-label="Copiar ${color}">${color}${icon('copy',14)}</button></div></article>`).join('')}</div>${sectionHeading('Combinações')}<div class="color-combinations"><div style="background:#1c3758;color:#f9f9ed"><span>Projearth</span><p>Engenharia de projetos</p><img src="../assets/projearth-grafismo-6.svg" alt=""></div><div style="background:#cae1d0;color:#1c3758"><span>Projearth</span><p>Engenharia de projetos</p><img src="../assets/projearth-grafismo-1.svg" alt=""></div><div style="background:#c5e6f1;color:#1c3758"><span>Projearth</span><p>Engenharia de projetos</p><img src="../assets/projearth-grafismo-4.svg" alt=""></div></div>`;
};

PAGES.tipografia=()=>`
 <section class="type-hero"><div><span class="eyebrow">Família tipográfica</span><h2>Barlow</h2><p>Clareza, presença e precisão.</p></div><span class="type-hero-aa" aria-hidden="true">Aa</span></section>
 ${panel('Caracteres',`<div class="font-specimen"><p class="alphabet">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz</p><p class="digits">0123456789 &amp; @ # À Á Â Ã Ç É Ê Í Ó Ô Õ Ú</p></div>`)}
 ${sectionHeading('Pesos')}<div class="weight-grid">${[['Regular',400],['Medium',500],['Semibold',600],['Bold',700]].map(([label,weight])=>`<div><span style="font-weight:${weight}">Ag</span><p>${label}</p></div>`).join('')}</div>
 ${sectionHeading('Hierarquia')}<div class="type-scale">${[['Título de página','Projetos que conectam.',34,600],['Título de seção','Engenharia em cada detalhe.',19,600],['Corpo de texto','Uma comunicação clara e consistente em todos os projetos.',16,400],['Rótulo','Nome do projeto',14,500],['Texto auxiliar','Informe um nome válido.',12,400]].map(([label,text,size,weight])=>`<div><span class="scale-label">${label}</span><p style="font-size:${size}px;font-weight:${weight}">${text}</p></div>`).join('')}</div>`;

document.addEventListener('click',async event=>{
 const target=event.target.closest?.('[data-action="copy-color"]');if(!target)return;
 const value=target.dataset.color;
 try{await navigator.clipboard.writeText(value);notify('Cor copiada: '+value);}catch(_){const area=document.getElementById('copy-content');area.value=value;document.getElementById('copy-title').textContent='Copiar cor';document.getElementById('copy-dialog').showModal();area.focus();area.select();}
});
