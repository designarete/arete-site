'use strict';
const PAGE_DEFINITIONS = [
 {id:'visao-geral',label:'Visão geral',icon:'layout-grid',group:'Início',description:'Identidade visual, componentes e recursos da Projearth.'},
 {id:'identidade',label:'Marca e grafismos',icon:'shapes',group:'Fundamentos',description:'Logotipo e elementos gráficos da Projearth.'},
 {id:'cores',label:'Cores',icon:'palette',group:'Fundamentos',description:'A paleta de cores da Projearth.'},
 {id:'tipografia',label:'Tipografia',icon:'type',group:'Fundamentos',description:'Hierarquia de texto e regras de legibilidade.'},
 {id:'botoes',label:'Botões',icon:'mouse-pointer-click',group:'Componentes',description:'Ações com texto, ícone ou os dois.'},
 {id:'breadcrumbs',label:'Breadcrumbs',icon:'chevron-right',group:'Componentes',description:'Localização na estrutura e retorno aos níveis anteriores.'},
 {id:'pagination',label:'Pagination',icon:'list-ordered',group:'Componentes',description:'Navegação por páginas, com indicação clara da posição atual.'},
 {id:'dropdown',label:'Dropdown',icon:'chevron-down',group:'Componentes',description:'Seleção de uma opção em listas com texto ou texto e ícone.'},
 {id:'selecao',label:'Checkbox, radio e switch',icon:'list-checks',group:'Componentes',description:'Controles para escolhas independentes, exclusivas e liga/desliga.'},
 {id:'chips',label:'Chips',icon:'tags',group:'Componentes',description:'Identificação, seleção e remoção de itens compactos.'},
 {id:'avatares',label:'Avatares',icon:'circle-user-round',group:'Componentes',description:'Identificação de pessoas, com ou sem aviso de notificação.'},
 {id:'inputs',label:'Inputs',icon:'text-cursor',group:'Componentes',description:'Estrutura comum dos campos e tipos de entrada.'},
 {id:'text-field',label:'Text Field',icon:'file-pen-line',group:'Componentes',description:'Entrada de texto em uma linha, com orientação e validação.'},
 {id:'textarea',label:'Textarea',icon:'notepad-text',group:'Componentes',description:'Entrada de texto em várias linhas, com os mesmos estados do Text Field.'},
 {id:'elementos',label:'Elementos',icon:'shapes',group:'Componentes',description:'Badges de notificação, ícones de estado e tratamento de imagens.'},
 {id:'alertas',label:'Inline Alert',icon:'triangle-alert',group:'Componentes',description:'Mensagens de contexto, informação, sucesso, atenção e erro.'},
 {id:'icones',label:'Banco de ícones',icon:'component',group:'Recursos',description:'447 ícones para diferentes contextos de uso.'}
];
const PAGE_MAP=new Map(PAGE_DEFINITIONS.map(page=>[page.id,page]));
const ICON_MAP=new Map(ICON_DATA.icons.map(icon=>[icon.id,icon]));
const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const icon=(id,size=20)=>{
 const code=ICON_MAP.get(id)?.code||ICON_DATA.interfaceIcons?.[id];
 if(!code)return '';
 return code.replace(/\sclass="[^"]*"/,'').replace('<svg ',`<svg aria-hidden="true" focusable="false" style="width:${size}px;height:${size}px" `);
};
const appState={page:'visao-geral',clicks:0,paginationPage:1,paginationSize:6,chips:new Set(['Processos','Jornadas','Interfaces']),filters:new Set(['Processos']),avatarNotification:true,openDropdown:null};
let toastTimer;
const FIELD_STATES=[
 {key:'inactive',label:'Inactive',value:'',helper:'Use um nome fácil de identificar.'},
 {key:'hover',label:'Hover',value:'',helper:'Use um nome fácil de identificar.'},
 {key:'active',label:'Active',value:'',helper:'O campo está em foco.'},
 {key:'disabled',label:'Disabled',value:'Projeto Horizonte',helper:'Campo indisponível para edição.'},
 {key:'filled',label:'Filled',value:'Projeto Horizonte',helper:'Informação preenchida.'},
 {key:'error',label:'Error',value:'A',helper:'Informe pelo menos 3 caracteres.'},
 {key:'error-empty',label:'Error empty',value:'',helper:'Preencha este campo obrigatório.'}
];
function button(text='Salvar',{glyph='',only=false,state='',disabled=false,attrs=''}={}){
 return `<button type="button" class="ds-button${state?' is-'+state:''}" ${disabled?'disabled ':''}${state==='active'?'aria-pressed="true" ':''}${only?`aria-label="${escapeHtml(text)}" `:''}${attrs}>${glyph?icon(glyph):''}${only?'':escapeHtml(text)}</button>`;
}
function panel(title,body,{meta='',className='',footer=''}={}){
 footer=footer.includes('id="')?footer:'';
 return `<section class="panel ${className}"><div class="panel-head"><strong>${title}</strong>${meta?`<span>${meta}</span>`:''}</div>${body}${footer?`<div class="demo-caption">${footer}</div>`:''}</section>`;
}
function sectionHeading(title,description='',meta=''){
 return `<div class="section-heading"><div><h2>${title}</h2>${description?`<p>${description}</p>`:''}</div>${meta?`<span class="meta">${meta}</span>`:''}</div>`;
}
function note(){return '';}
function specs(){return '';}
function codeDetails(){return '';}
function footer(){return '<footer class="footer"><span>Projearth · Design System</span><span>Aretê Negócios e Patrimônio</span></footer>';}
function fieldMarkup({id,label='Nome do projeto',value='',placeholder='Ex.: Projeto Horizonte',type='text',state='',helper='',readonly=false,required=false,textarea=false,prefix='',action='',attrs='',maxLength=0}){
 const error=state==='error'||state==='error-empty';const disabled=state==='disabled';const described=helper?` aria-describedby="${id}-help"`:'';
 const inputAttrs=`id="${id}" class="text-control" ${type==='password'?'autocomplete="new-password" ':''}${disabled?'disabled ':''}${readonly?'readonly ':''}${required?'required ':''}${error?'aria-invalid="true" ':''}${described}${maxLength?` maxlength="${maxLength}"`:''} placeholder="${escapeHtml(placeholder)}" ${attrs}`;
 const control=textarea?`<textarea ${inputAttrs} rows="5">${escapeHtml(value)}</textarea>`:`<input type="${type}" ${inputAttrs} value="${escapeHtml(value)}">`;
 return `<div class="field ${state?'is-'+state:''}${error?' is-error':''}${prefix?' with-prefix':''}${action?' with-action':''}" id="${id}-field"><label for="${id}">${escapeHtml(label)}${required?'<span class="required" aria-hidden="true">*</span>':''}</label><div class="input-wrap${textarea?' textarea-wrap':''}">${prefix?`<span class="input-prefix">${icon(prefix,18)}</span>`:''}${control}${error?icon('circle-x',18).replace('<svg ','<svg class="field-state-icon" '):''}${action?`<button type="button" class="input-action" data-action="${action}" data-target="${id}" aria-label="Mostrar senha" aria-pressed="false">${icon('eye',18)}</button>`:''}</div>${helper?`<p class="field-helper" id="${id}-help">${escapeHtml(helper)}</p>`:''}</div>`;
}
function stateFields(kind='text'){
 const isArea=kind==='area';
 return `<div class="field-grid">${FIELD_STATES.map((state,index)=>{
   let value=state.value,helper=state.helper;
   if(isArea){if(value==='Projeto Horizonte')value='Descrever as etapas e os responsáveis pelo projeto.';if(state.key==='error'){value='Curto';helper='Escreva pelo menos 10 caracteres.';}if(state.key==='inactive'||state.key==='hover')helper='Descreva o contexto com clareza.';}
   return `<div class="state-card"><div class="state-title"><span class="state-num">0${index+1}</span>${state.label}</div>${fieldMarkup({id:`${kind}-${state.key}`,label:isArea?'Descrição do projeto':'Nome do projeto',value,helper,placeholder:isArea?'Descreva o projeto…':'Ex.: Projeto Horizonte',state:state.key,textarea:isArea,readonly:true,required:state.key==='error-empty'})}</div>`;
 }).join('')}</div>`;
}
function liveTextForm(area=false){
 const name=area?'live-area':'live-text';
 return `<form class="demo-form" data-validate-form="${area?'area':'text'}" novalidate>${fieldMarkup({id:name,label:area?'Descrição do projeto':'Nome do projeto',placeholder:area?'Descreva as principais etapas…':'Ex.: Projeto Horizonte',helper:area?'Escreva entre 10 e 240 caracteres.':'Informe pelo menos 3 caracteres.',required:true,textarea:area,maxLength:area?240:80})}${area?'<div class="char-counter"><span>Texto em várias linhas</span><output id="area-counter">0 / 240</output></div>':''}<div class="form-actions">${button('Validar',{attrs:'data-action="validate-field"'})}<button type="button" class="utility subtle small" data-action="reset-field">Limpar</button></div><p id="${name}-feedback" class="form-feedback" role="status" aria-live="polite"></p></form>`;
}
function dropdown(id,{withIcon=false,disabled=false,label='Tipo de documento'}={}){
 const options=[{value:'processos',label:'Processos',icon:'workflow'},{value:'jornadas',label:'Jornadas',icon:'route'},{value:'interfaces',label:'Interfaces',icon:'monitor-smartphone'}];
 return `<div class="ds-dropdown" data-dropdown="${id}" data-with-icon="${withIcon}" data-value="processos"><span id="${id}-label" class="dropdown-label">${label}</span><button type="button" class="dropdown-button" id="${id}-button" role="combobox" aria-labelledby="${id}-label ${id}-value" aria-controls="${id}-list" aria-expanded="false" aria-haspopup="listbox" ${disabled?'disabled':''}>${withIcon?`<span class="dropdown-leading">${icon('workflow',18)}</span>`:''}<span id="${id}-value" class="dropdown-value">Processos</span>${icon('chevron-down',16)}</button><ul class="dropdown-list" id="${id}-list" role="listbox" aria-labelledby="${id}-label" hidden>${options.map((option,index)=>`<li class="dropdown-option" role="option" tabindex="-1" id="${id}-option-${index}" data-value="${option.value}" data-label="${option.label}" data-icon="${option.icon}" aria-selected="${index===0}">${withIcon?icon(option.icon,18):''}<span>${option.label}</span>${index===0?icon('check',16).replace('<svg ','<svg class="selection-check" '):''}</li>`).join('')}</ul></div>`;
}
function avatar({square=false,notification=false,count=false,label='Perfil do usuário'}={}){
 return `<span class="avatar${square?' square':''}" role="img" aria-label="${escapeHtml(label)}${notification?', com nova notificação':''}">${icon('user-round',25)}${notification?count?'<span class="notification-count" aria-hidden="true">3</span>':'<span class="notification-dot" aria-hidden="true"></span>':''}</span>`;
}
function inlineAlert(type,title,text,{dismiss=false,id=''}={}){
 const glyph={default:'info',info:'info',success:'circle-check',warning:'triangle-alert',error:'circle-x'}[type];
 return `<div class="inline-alert ${type}" ${id?`id="${id}"`:''} role="note">${icon(glyph)}<div><div class="alert-title">${title}</div>${text?`<p>${text}</p>`:''}</div>${dismiss?`<button class="alert-dismiss" data-action="dismiss-alert" aria-label="Fechar aviso">${icon('x',16)}</button>`:''}</div>`;
}
const PAGES={
 botoes:()=>{
   const states=[['Default',''],['Hover','hover'],['Active','active'],['Disabled','disabled'],['Click','click']];
   const variants=[['Texto','Salvar','',false],['Ícone','Adicionar','plus',true],['Texto + ícone','Salvar','check',false]];
   const table=`<div class="matrix-scroll" tabindex="0" aria-label="Tabela comparativa dos estados dos botões"><table class="state-table"><thead><tr><th scope="col">Conteúdo</th>${states.map(([label])=>`<th scope="col">${label}</th>`).join('')}</tr></thead><tbody>${variants.map(([label,text,glyph,only])=>`<tr><td>${label}</td>${states.map(([name,state])=>`<td>${button(text,{glyph,only,state:state==='disabled'?'':state,disabled:state==='disabled',attrs:`data-action="matrix-button" aria-description="Exemplo visual do estado ${name}"`})}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
   return `${specs([['Largura','124 px'],['Altura','40 px'],['Padding lateral','24 px'],['Padding vertical','10 px'],['Corner radius','8 px']])}${panel('Exemplo interativo',`<div class="playground">${variants.map(([label,text,glyph,only])=>`<div class="demo-item">${button(text,{glyph,only,attrs:'data-action="demo-click"'})}<span class="demo-label">${label}</span></div>`).join('')}</div>`,{meta:'Experimente o clique e o foco',footer:'<output id="button-feedback" role="status" aria-live="polite">Passe o mouse, navegue com Tab ou clique em um botão.</output>'})}${sectionHeading('Estados','Amostras fixas para comparar a aparência do componente.','3 conteúdos × 5 estados')}${panel('Matriz de estados',table)}<div class="notes-grid">${note('Active e Click','<strong>Active:</strong> opção selecionada, mantida até uma nova escolha. <strong>Click:</strong> pressão momentânea, enquanto o botão é acionado. O foco do teclado recebe um contorno próprio.','mouse-pointer-click')}${note('Conteúdo e dimensões','As três opções mantêm <strong>124 × 40 px</strong>, inclusive a opção só com ícone. Rótulos curtos, como “Salvar”, respeitam os 24 px de padding. Ícone de 20 px e gap de 8 px.','ruler')}</div>${sectionHeading('Seleção persistente','Exemplo de botão com estado Active.')}${panel('Botão selecionável',`<div class="playground">${button('Ativar',{attrs:'id="toggle-action" aria-pressed="false" data-action="toggle-button"'})}<span id="toggle-action-status" class="muted small" role="status">Não selecionado</span></div>`)}${codeDetails('botoes')}`;
 },
 breadcrumbs:()=>`${specs([['Texto','14 px'],['Separador','14 px'],['Gap','10 px'],['Último nível','Página atual'],['Teclado','Tab + Enter']])}${panel('Navegação com texto',`<div class="playground plain"><nav class="ds-breadcrumb" aria-label="Exemplo de breadcrumbs com texto"><ol><li><a href="#visao-geral">Design System</a>${icon('chevron-right',14).replace('<svg ','<svg class="separator" ')}</li><li><a href="#botoes">Componentes</a>${icon('chevron-right',14).replace('<svg ','<svg class="separator" ')}</li><li><span aria-current="page">Breadcrumbs</span></li></ol></nav></div>`,{footer:'Os níveis anteriores são links; a página atual é texto.'})}<div style="margin-top:20px">${panel('Navegação com ícone',`<div class="playground plain"><nav class="ds-breadcrumb" aria-label="Exemplo de breadcrumbs com ícone"><ol><li><a href="#visao-geral">${icon('layout-grid',17)}Visão geral</a>${icon('chevron-right',14).replace('<svg ','<svg class="separator" ')}</li><li><a href="#icones">Banco de ícones</a>${icon('chevron-right',14).replace('<svg ','<svg class="separator" ')}</li><li><span aria-current="page">Categorias</span></li></ol></nav></div>`)}</div><div class="notes-grid">${note('Ordem e hierarquia','Organize do nível mais geral para o mais específico. O separador é decorativo e não faz parte do nome do link.','git-branch')}${note('Espaços menores','Permita quebra de linha. Preserve o nome da página atual e mantenha cada link identificável.','monitor-smartphone')}</div>${codeDetails('breadcrumbs')}`,
 pagination:()=>`${specs([['Controle','40 × 40 px'],['Corner radius','8 px'],['Página atual','Destacada'],['Limites','Desabilitados'],['Exemplo','447 ícones']])}${panel('Exemplo interativo',`<div class="panel-body"><div id="pagination-items" class="pagination-list"></div><nav id="pagination-nav" class="pagination" aria-label="Paginação do exemplo de ícones"></nav></div>`,{meta:'6 itens por página',footer:'<output id="pagination-status" role="status" aria-live="polite"></output>'})}<div class="notes-grid">${note('Página atual','A seleção permanece visível e utiliza <code>aria-current="page"</code>. Os números representam páginas, sem mudar a ordem dos resultados.','list-ordered')}${note('Início e fim','“Anterior” fica desabilitado na primeira página; “Próxima”, na última. As reticências indicam páginas intermediárias.','arrow-left-right')}</div>${codeDetails('pagination')}`,
 dropdown:()=>`${specs([['Altura','40 px'],['Corner radius','8 px'],['Padding','9 × 12 px'],['Variações','Texto / com ícone'],['Seleção','Uma opção']])}${panel('Exemplo interativo',`<div class="playground">${dropdown('dropdown-text',{label:'Somente texto'})}${dropdown('dropdown-icon',{withIcon:true,label:'Texto e ícone'})}</div>`,{className:'dropdown-panel',meta:'Clique ou use o teclado',footer:'<output id="dropdown-feedback" role="status" aria-live="polite">Processos selecionado. Abra uma lista para escolher outra opção.</output>'})}${sectionHeading('Indisponível')}${panel('Disabled',`<div class="playground">${dropdown('dropdown-disabled',{withIcon:true,disabled:true,label:'Texto e ícone'})}</div>`,{className:'dropdown-panel'})}<div class="notes-grid">${note('Teclado','Enter, Espaço ou seta para baixo abrem a lista. As setas percorrem as opções; Enter confirma; Escape fecha e devolve o foco ao controle.','text-cursor')}${note('Rótulo e valor','O rótulo do campo permanece visível. Na variante com ícone, cada opção continua com seu nome em texto.','text-cursor')}</div>${codeDetails('dropdown')}`,
 selecao:()=>`${specs([['Checkbox','20 × 20 px'],['Radio','20 × 20 px'],['Switch','36 × 20 px'],['Área do rótulo','Mín. 40 px'],['Teclado','Tab + Espaço']])}<div class="three-columns">${panel('Checkbox',`<div class="panel-body"><div class="choice-group"><label class="choice"><input type="checkbox" name="demo-check" value="Processos" checked><span>Processos</span></label><label class="choice"><input type="checkbox" name="demo-check" value="Jornadas"><span>Jornadas</span></label><label class="choice"><input type="checkbox" id="mixed-checkbox" aria-label="Seleção parcial"><span>Seleção parcial</span></label><label class="choice disabled"><input type="checkbox" disabled><span>Indisponível</span></label><label class="choice disabled"><input type="checkbox" disabled checked><span>Selecionado e inativo</span></label></div><p class="selection-status" id="checkbox-status" role="status">1 opção selecionada.</p></div>`)}${panel('Radio Button',`<div class="panel-body"><fieldset class="choice-group" style="border:0;margin:0;padding:0"><legend>Formato de entrega</legend><label class="choice"><input type="radio" name="demo-radio" value="HTML" checked><span>HTML</span></label><label class="choice"><input type="radio" name="demo-radio" value="PDF"><span>PDF</span></label><label class="choice"><input type="radio" name="demo-radio" value="Apresentação"><span>Apresentação</span></label><label class="choice disabled"><input type="radio" name="demo-radio-disabled" disabled><span>Indisponível</span></label></fieldset><p class="selection-status" id="radio-status" role="status">HTML selecionado.</p></div>`)}${panel('Switch',`<div class="panel-body"><div class="choice-group"><label class="choice"><input type="checkbox" role="switch" id="demo-switch" checked><span>Notificações</span></label><label class="choice"><input type="checkbox" role="switch"><span>Atualizações</span></label><label class="choice disabled"><input type="checkbox" role="switch" disabled><span>Indisponível</span></label><label class="choice disabled"><input type="checkbox" role="switch" disabled checked><span>Ativo e indisponível</span></label></div><p class="selection-status" id="switch-status" role="status">Notificações ativadas.</p></div>`)}</div><div class="notes-grid">${note('Escolha o controle pelo comportamento','Checkbox aceita múltiplas escolhas. Radio Button permite uma escolha dentro do grupo. Switch ativa ou desativa uma configuração imediatamente.','list-checks')}${note('Rótulos clicáveis','Clicar no texto também aciona o controle. O estado Disabled bloqueia a interação; o estado parcial do checkbox indica uma seleção incompleta.','mouse-pointer-click')}</div>${codeDetails('selecao')}`,
 chips:()=>`${specs([['Altura mínima','32 px'],['Corner radius','8 px'],['Padding','5 × 11 px'],['Ícone','15 px'],['Gap','7 px']])}${panel('Identificação',`<div class="playground"><span class="chip">Processos</span><span class="chip">${icon('route',15)}Jornadas</span><button type="button" class="chip" disabled>Indisponível</button></div>`,{footer:'Rótulos estáticos podem usar texto ou texto e ícone.'})}${sectionHeading('Seleção','Clique para selecionar ou desmarcar.')}${panel('Chips selecionáveis',`<div class="playground"><div class="chip-list" id="filter-chips"></div></div>`,{footer:'<output id="chip-filter-status" role="status" aria-live="polite"></output>'})}${sectionHeading('Remoção','O botão de fechar remove somente o item correspondente.')}${panel('Chips removíveis',`<div class="playground"><div class="chip-list" id="removable-chips"></div></div><div class="panel-footer"><span id="chip-remove-status" role="status"></span><button class="utility small" data-action="restore-chips">Restaurar exemplos</button></div>`)}${codeDetails('chips')}`,
 avatares:()=>`${specs([['Tamanho da base','48 × 48 px'],['Circular','Raio 50%'],['Quadrado','Raio 8 px'],['Ícone','25 px'],['Aviso','Com / sem']])}<div class="avatar-grid">${[false,true].flatMap(square=>[false,true].map(notification=>`<div class="avatar-cell">${avatar({square,notification})}<p><strong>${square?'Quadrado · raio 8':'Circular'}</strong>${notification?'Com aviso':'Sem aviso'}</p></div>`)).join('')}</div>${sectionHeading('Exemplo interativo')}${panel('Aviso no perfil',`<div class="playground"><span id="live-avatar">${avatar({notification:true})}</span><label class="choice"><input type="checkbox" role="switch" id="avatar-switch" checked><span>Mostrar notificação</span></label></div>`,{footer:'<output id="avatar-status" role="status">Perfil com nova notificação.</output>'})}<div class="notes-grid">${note('Formato consistente','Use o formato circular ou o quadrado com raio de 8 px. Mantenha o mesmo formato para avatares equivalentes no mesmo contexto.','circle-user-round')}${note('Avisos identificáveis','O ponto indica uma novidade. Quando a quantidade importa, use o badge numérico documentado em Elementos. O nome acessível inclui a existência do aviso.','bell')}</div>${codeDetails('avatares')}`,
 inputs:()=>`${specs([['Altura','40 px'],['Corner radius','8 px'],['Padding','9 × 12 px'],['Rótulo','Sempre visível'],['Estados','7']])}${panel('Tipos de entrada',`<div class="panel-body input-examples">${fieldMarkup({id:'sample-email',type:'email',label:'E-mail',placeholder:'nome@empresa.com',prefix:'mail',helper:'Informe seu e-mail.'})}${fieldMarkup({id:'sample-password',type:'password',label:'Senha',placeholder:'Digite uma senha',action:'toggle-password',helper:''})}${fieldMarkup({id:'sample-search',type:'search',label:'Busca',placeholder:'Pesquisar componente',prefix:'search'})}${fieldMarkup({id:'sample-number',type:'number',label:'Quantidade',value:'1',placeholder:'0',attrs:'min="0" step="1"'})}${fieldMarkup({id:'sample-date',type:'date',label:'Data',placeholder:''})}${fieldMarkup({id:'sample-disabled',label:'Campo indisponível',value:'Não editável',state:'disabled'})}</div>`)}${sectionHeading('Estados compartilhados','Referência visual comum aos campos de uma linha.','7 estados')}${stateFields('input')}<div class="notes-grid">${note('Uma estrutura para os campos','Rótulo, área de entrada, ícones opcionais e mensagem auxiliar. Text Field e Textarea detalham a entrada de texto e a validação.','text-cursor')}${note('Erros específicos','Error indica um valor preenchido que precisa de correção. Error empty indica que um campo obrigatório ficou vazio. Ambos exibem uma mensagem em texto.','circle-x')}</div>${codeDetails('inputs')}`,
 'text-field':()=>`${specs([['Altura','40 px'],['Corner radius','8 px'],['Texto','14 px / 20 px'],['Rótulo','14 px'],['Estados','7']])}${panel('Exemplo interativo',`<div class="playground plain">${liveTextForm(false)}</div>`,{meta:'Teste vazio, curto e preenchido',footer:'A validação acontece ao sair do campo após editar ou ao clicar em Validar.'})}${sectionHeading('Estados','Amostras visuais fixas; use o exemplo acima para editar.','Inactive → Error empty')}${stateFields('text')}<div class="notes-grid">${note('Active significa foco','O campo recebe um contorno para indicar onde a edição está acontecendo. O estado Filled preserva o valor e continua editável.','text-cursor')}${note('Mensagem junto ao campo','Oriente a correção sem depender apenas de cor. O campo inválido recebe <code>aria-invalid</code> e referencia a mensagem auxiliar.','info')}</div>${codeDetails('text-field')}`,
 textarea:()=>`${specs([['Altura mínima','120 px'],['Corner radius','8 px'],['Padding','10 × 12 px'],['Texto','14 px / 20 px'],['Estados','7']])}${panel('Exemplo interativo',`<div class="playground plain">${liveTextForm(true)}</div>`,{meta:'Texto em várias linhas',footer:'O limite de 240 caracteres pertence a este exemplo; cada formulário define seu limite.'})}${sectionHeading('Estados','Mesma lógica de validação e foco do Text Field.','7 estados')}${stateFields('area')}<div class="notes-grid">${note('Mais espaço para o conteúdo','Permita redimensionamento vertical. A largura acompanha o formulário e a altura inicial acomoda várias linhas de texto.','file-text')}${note('Obrigatoriedade e tamanho','Uma entrada vazia e um texto curto geram mensagens diferentes. O contador ajuda quando o formulário tem um limite de caracteres.','list-checks')}</div>${codeDetails('textarea')}`,
 elementos:()=>`${sectionHeading('Badge de notificação','Ponto para novidade; número para quantidade.')}${panel('Variações de badge',`<div class="playground"><div class="demo-item"><span class="badge dot" role="img" aria-label="Há uma nova notificação"></span><span class="demo-label">Ponto</span></div><div class="demo-item"><span class="badge" role="img" aria-label="3 notificações">3</span><span class="demo-label">Contagem</span></div><div class="demo-item"><span class="badge" role="img" aria-label="Mais de 99 notificações">99+</span><span class="demo-label">Limite visual</span></div><div class="demo-item"><span class="notification-button" role="img" aria-label="Notificações, 3 novas">${icon('bell')}<span class="badge" aria-hidden="true">3</span></span><span class="demo-label">Em um ícone</span></div><div class="demo-item">${avatar({square:true,notification:true,count:true})}<span class="demo-label">Em um avatar</span></div></div>`)}${sectionHeading('State icons','O significado acompanha o ícone em texto.')}${panel('Ícones de aviso',`<div class="panel-body status-icon-list">${[['default','info','Neutro'],['info','info','Informação'],['success','circle-check','Sucesso'],['warning','triangle-alert','Atenção'],['error','circle-x','Erro']].map(([type,glyph,label])=>`<div class="status-icon-item"><span class="state-icon ${type}">${icon(glyph,19)}</span><span>${label}</span></div>`).join('')}</div>`)}${sectionHeading('Images','Proporções, imagem carregada e substituição em caso de falha.')}${panel('Imagem de exemplo',`<div class="panel-body"><div class="three-columns image-samples"><figure class="image-card"><div class="image-frame ratio-wide" id="image-live-frame"><img id="image-live" src="${IMAGE_SAMPLE}" alt="Grafismo azul da Projearth" width="640" height="360"><div class="image-fallback" id="image-live-fallback" hidden role="img" aria-label="Imagem indisponível">${icon('image',24)}<span>Imagem indisponível</span></div></div><figcaption>16:9 · imagem carregada</figcaption></figure><figure class="image-card"><div class="image-frame ratio-standard"><div class="image-fallback" role="img" aria-label="Espaço reservado para uma imagem em proporção quatro por três">${icon('image',24)}<span>4:3</span></div></div><figcaption>4:3 · conteúdo editorial</figcaption></figure><figure class="image-card"><div class="image-frame ratio-square"><div class="image-fallback" role="img" aria-label="Espaço reservado para uma imagem quadrada">${icon('image',24)}<span>1:1</span></div></div><figcaption>1:1 · imagem quadrada</figcaption></figure></div><div class="form-actions" style="margin-top:16px"><button class="utility small" data-action="image-error">Simular imagem indisponível</button><button class="utility small" data-action="image-restore">Restaurar imagem</button></div></div>`)}<div class="notes-grid">${note('Imagens com espaço reservado','Defina dimensões e proporção antes de carregar. Use <code>object-fit: cover</code> para preencher o espaço sem distorcer a imagem.','image')}${note('Texto alternativo','Descreva imagens informativas. Imagens decorativas usam <code>alt=""</code>. Em falhas, apresente uma substituição identificável.','accessibility')}</div>${codeDetails('elementos')}`,
 alertas:()=>`${specs([['Padding','14 × 16 px'],['Corner radius','8 px'],['Ícone','20 px'],['Gap','11 px'],['Variações','5']])}<div class="stack">${[
 ['default','Default','Informação complementar','Consulte as informações do projeto.'],
 ['info','Info','Atualização disponível','Revise as informações antes de continuar.'],
 ['success','Success','Alterações concluídas','Os dados deste exemplo foram validados.'],
 ['warning','Warning','Confira antes de seguir','Algumas informações ainda precisam de revisão.'],
 ['error','Error','Não foi possível continuar','Corrija os campos indicados e tente novamente.']
 ].map(([type,label,title,text])=>`<div class="alert-row"><span class="alert-state-name">${label}</span>${inlineAlert(type,title,text)}</div>`).join('')}</div>${sectionHeading('Aviso dispensável','A ação de fechar pertence somente a este aviso.')}${panel('Exemplo interativo',`<div class="panel-body"><div id="dismissible-alert-slot">${inlineAlert('info','Mensagem de exemplo','Você pode fechar este aviso e exibi-lo novamente.',{dismiss:true})}</div><button class="utility small" data-action="restore-alert" style="margin-top:14px">Mostrar novamente</button><p id="alert-demo-status" class="field-info" role="status" aria-live="polite"></p></div>`)}<div class="notes-grid">${note('Tom da mensagem','Default contextualiza; Info informa; Success confirma; Warning pede atenção; Error explica o impedimento e a correção.','messages-square')}${note('Sem depender da cor','Cada variação combina ícone, título e texto. Em formulários, mantenha erros específicos junto aos campos e use o alerta para a mensagem geral.','triangle-alert')}</div>${codeDetails('alertas')}`,
 icones:()=>`<div class="ds-icons-page"><ds-icon-library embedded storage-key="projearth-icones-v2"></ds-icon-library></div>`
};

/* BRAND_PAGES */

const normalizeNav=value=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
function renderNavigation(){
 const groups=['Início','Fundamentos','Componentes','Recursos'];
 document.getElementById('site-navigation').innerHTML=groups.map(group=>`<div class="nav-group">${group!=='Início'?`<div class="nav-label">${group}</div>`:''}${PAGE_DEFINITIONS.filter(page=>page.group===group).map(page=>`<a class="nav-link" href="#${page.id}" data-page-link="${page.id}" data-nav-search="${escapeHtml(normalizeNav(page.label+' '+page.description+' '+page.id))}">${icon(page.icon,18)}<span>${page.label}</span>${page.id==='icones'?'<span class="nav-count">447</span>':''}</a>`).join('')}</div>`).join('')+'<p class="nav-empty" id="nav-empty" hidden>Nenhuma seção encontrada.</p><span class="sr-only" id="nav-result-status" role="status" aria-live="polite"></span>';
}
function filterNavigation(){
 const query=normalizeNav(document.getElementById('nav-search').value);let count=0;
 document.querySelectorAll('[data-page-link]').forEach(link=>{link.hidden=!link.dataset.navSearch.includes(query);if(!link.hidden)count++;});
 document.querySelectorAll('.nav-group').forEach(group=>{group.hidden=![...group.querySelectorAll('[data-page-link]')].some(link=>!link.hidden);});
 document.getElementById('nav-empty').hidden=count>0;
 document.getElementById('nav-search-clear').hidden=!query;
 document.getElementById('nav-result-status').textContent=query?`${count} ${count===1?'seção encontrada':'seções encontradas'}.`:'';
}
function clearNavigationSearch(){document.getElementById('nav-search').value='';filterNavigation();}
function pageNavigation(){
 const index=PAGE_DEFINITIONS.findIndex(page=>page.id===appState.page),previous=PAGE_DEFINITIONS[index-1],next=PAGE_DEFINITIONS[index+1];
 return `<nav class="page-navigation" aria-label="Continuar pelo Design System">${previous?`<a href="#${previous.id}" aria-label="Página anterior: ${previous.label}">${icon('arrow-left',18)}<span><small>Anterior</small><strong>${previous.label}</strong></span></a>`:''}${next?`<a href="#${next.id}" class="next" aria-label="Próxima página: ${next.label}"><span><small>Próxima</small><strong>${next.label}</strong></span>${icon('arrow-right',18)}</a>`:''}</nav>`;
}
let pageAnimationFrame;
function pageFromHash(){const id=location.hash.replace(/^#/,'');return PAGE_MAP.has(id)?id:(typeof DEFAULT_PAGE!=='undefined'?DEFAULT_PAGE:'visao-geral');}
function renderPage({focus=false}={}){
 const page=PAGE_MAP.get(pageFromHash());appState.page=page.id;closeDropdown(false);clearNavigationSearch();
 const sectionNumber=String(PAGE_DEFINITIONS.filter(p=>p.group===page.group).findIndex(p=>p.id===page.id)+1).padStart(2,'0');
 document.title=`${page.label} · Design System Projearth`;
 document.getElementById('top-current').textContent=page.label;
 const heading=`<header class="page-head"><div><div class="eyebrow"><span>${page.group==='Início'?'Projearth':page.group}</span><span class="section-no">/ ${sectionNumber}</span></div><h1 id="page-title" tabindex="-1">${page.id==='visao-geral'?'Design System Projearth':page.label}</h1><p>${page.description}</p></div></header>`;
 let markup=heading+PAGES[page.id]().replaceAll('<div class="notes-grid"></div>','')+pageNavigation()+footer();
 if(typeof PAGE_ASSETS!=='undefined')markup=markup.replace(/(?:src|href)="(\.\.\/assets\/[^"]+)"/g,(match,url)=>match.replace(url,PAGE_ASSETS[url]||url));
 const content=document.getElementById('page-content');content.classList.remove('is-entering');content.innerHTML=markup;
 cancelAnimationFrame(pageAnimationFrame);pageAnimationFrame=requestAnimationFrame(()=>content.classList.add('is-entering'));
 document.querySelectorAll('[data-page-link]').forEach(link=>{if(link.dataset.pageLink===page.id)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
 if(page.id==='pagination')renderPagination();
 if(page.id==='selecao')document.getElementById('mixed-checkbox').indeterminate=true;
 if(page.id==='chips')renderChips();
 if(page.id==='avatares'){document.getElementById('avatar-switch').checked=appState.avatarNotification;renderAvatar();}
 if(page.id==='icones'){
   const library=document.querySelector('ds-icon-library');
   library.style.setProperty('--ds-icon-color',getComputedStyle(document.documentElement).getPropertyValue('--brand-blue').trim());
 }
 setNavigationOpen(false);window.scrollTo({top:0,behavior:'instant'});
 if(focus)document.getElementById('page-title').focus({preventScroll:true});
}
function navigate(id){if(!PAGE_MAP.has(id))throw new Error('Seção não encontrada.');if(location.hash==='#'+id)renderPage({focus:true});else location.hash=id;}
function notify(message){clearTimeout(toastTimer);const output=document.getElementById('site-toast');output.textContent=message;output.hidden=false;toastTimer=setTimeout(()=>output.hidden=true,3300);}
async function copyText(text){
 try{if(!navigator.clipboard?.writeText)throw Error('indisponível');await navigator.clipboard.writeText(text);notify('CSS copiado.');return;}catch(_){}
 const temporary=document.createElement('textarea');temporary.value=text;temporary.style.cssText='position:fixed;top:0;left:-10000px';document.body.append(temporary);temporary.select();let success=false;try{success=document.execCommand('copy');}catch(_){}temporary.remove();
 if(success){notify('CSS copiado.');return;}
 const dialog=document.getElementById('copy-dialog');const area=document.getElementById('copy-content');area.value=text;dialog.showModal();area.focus();area.select();
}
function downloadText(text,filename,type='application/json'){
 const url=URL.createObjectURL(new Blob([text],{type:type+';charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download=filename;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function setNavigationOpen(open){
 const mobile=window.matchMedia('(max-width: 760px)').matches;
 const sidebar=document.getElementById('sidebar');
 sidebar.classList.toggle('is-open',!!open&&mobile);sidebar.inert=mobile&&!open;
 document.getElementById('menu-toggle').setAttribute('aria-expanded',String(!!open&&mobile));
 document.getElementById('nav-backdrop').classList.toggle('is-visible',!!open&&mobile);
 document.body.style.overflow=open&&mobile?'hidden':'';
 document.querySelector('.app-main').inert=!!open&&mobile;
 if(open&&mobile)(sidebar.querySelector('[aria-current="page"]')||sidebar.querySelector('a')).focus();
}
function closeDropdown(returnFocus=false){
 if(!appState.openDropdown)return;
 const root=document.querySelector(`[data-dropdown="${appState.openDropdown}"]`);
 if(root){root.querySelector('.dropdown-list').hidden=true;const trigger=root.querySelector('.dropdown-button');trigger.setAttribute('aria-expanded','false');trigger.removeAttribute('aria-activedescendant');if(returnFocus)trigger.focus();}
 appState.openDropdown=null;
}
function openDropdown(root,{last=false}={}){
 if(root.querySelector('.dropdown-button').disabled)return;
 closeDropdown(false);appState.openDropdown=root.dataset.dropdown;
 root.querySelector('.dropdown-list').hidden=false;root.querySelector('.dropdown-button').setAttribute('aria-expanded','true');
 const options=[...root.querySelectorAll('.dropdown-option')];const target=last?options.at(-1):root.querySelector('[aria-selected="true"]')||options[0];target.focus();
}
function chooseDropdown(option){
 const root=option.closest('.ds-dropdown');root.dataset.value=option.dataset.value;
 root.querySelector('.dropdown-value').textContent=option.dataset.label;
 if(root.dataset.withIcon==='true')root.querySelector('.dropdown-leading').innerHTML=icon(option.dataset.icon,18);
 root.querySelectorAll('.dropdown-option').forEach(item=>{item.setAttribute('aria-selected',String(item===option));item.querySelector('.selection-check')?.remove();});
 option.insertAdjacentHTML('beforeend',icon('check',16).replace('<svg ','<svg class="selection-check" '));
 const status=document.getElementById('dropdown-feedback');if(status)status.textContent=`${option.dataset.label} selecionado em “${root.querySelector('.dropdown-label').textContent}”.`;
 closeDropdown(true);
}
function paginationNumbers(current,total){
 const pages=new Set([1,total,current]);if(current>1)pages.add(current-1);if(current<total)pages.add(current+1);if(current<=3){pages.add(2);pages.add(3);}if(current>=total-2){pages.add(total-1);pages.add(total-2);}
 const numbers=[...pages].filter(page=>page>=1&&page<=total).sort((a,b)=>a-b);const result=[];
 numbers.forEach((page,index)=>{if(index&&page-numbers[index-1]>1)result.push('ellipsis');result.push(page);});return result;
}
function renderPagination(){
 const total=Math.ceil(ICON_DATA.icons.length/appState.paginationSize);appState.paginationPage=Math.min(total,Math.max(1,appState.paginationPage));const page=appState.paginationPage;const offset=(page-1)*appState.paginationSize;
 document.getElementById('pagination-items').innerHTML=ICON_DATA.icons.slice(offset,offset+appState.paginationSize).map(item=>`<div class="pagination-item">${icon(item.id,20)}<span title="${escapeHtml(item.label)}">${escapeHtml(item.label)}</span></div>`).join('');
 document.getElementById('pagination-nav').innerHTML=`<button type="button" class="page-button" data-action="page-change" data-target-page="${page-1}" ${page===1?'disabled':''} aria-label="Página anterior">${icon('chevron-left',18)}</button>${paginationNumbers(page,total).map(number=>number==='ellipsis'?'<span class="page-ellipsis" aria-hidden="true">…</span>':`<button type="button" class="page-button" data-action="page-change" data-target-page="${number}" ${page===number?'aria-current="page"':''} aria-label="${page===number?'Página atual,':'Ir para a página'} ${number}">${number}</button>`).join('')}<button type="button" class="page-button" data-action="page-change" data-target-page="${page+1}" ${page===total?'disabled':''} aria-label="Próxima página">${icon('chevron-right',18)}</button>`;
 document.getElementById('pagination-status').textContent=`Página ${page} de ${total} · itens ${offset+1}–${Math.min(offset+appState.paginationSize,ICON_DATA.icons.length)} de ${ICON_DATA.icons.length}`;
}
function renderChips(){
 document.getElementById('filter-chips').innerHTML=['Processos','Jornadas','Interfaces'].map(label=>`<button type="button" class="chip" data-action="filter-chip" data-label="${label}" aria-pressed="${appState.filters.has(label)}">${appState.filters.has(label)?icon('check',15):''}${label}</button>`).join('');
 document.getElementById('chip-filter-status').textContent=appState.filters.size?`Selecionados: ${[...appState.filters].join(', ')}.`:'Nenhum filtro selecionado.';
 document.getElementById('removable-chips').innerHTML=appState.chips.size?[...appState.chips].map(label=>`<span class="chip removable">${label}<button type="button" class="chip-remove" data-action="remove-chip" data-label="${label}" aria-label="Remover ${label}">${icon('x',13)}</button></span>`).join(''):'<span class="muted small">Todos os itens foram removidos.</span>';
 document.getElementById('chip-remove-status').textContent=`${appState.chips.size} ${appState.chips.size===1?'item':'itens'} na seleção.`;
}
function renderAvatar(){
 document.getElementById('live-avatar').innerHTML=avatar({notification:appState.avatarNotification});document.getElementById('avatar-status').textContent=appState.avatarNotification?'Perfil com nova notificação.':'Perfil sem novas notificações.';
}
function validateForm(form,{announce=true}={}){
 const isArea=form.dataset.validateForm==='area',input=form.querySelector('.text-control'),field=input.closest('.field'),helper=field.querySelector('.field-helper'),value=input.value.trim(),min=isArea?10:3;
 const message=!value?'Preencha este campo obrigatório.':value.length<min?`Informe pelo menos ${min} caracteres.`:'';
 field.classList.toggle('is-error',!!message);input.setAttribute('aria-invalid',String(!!message));input.dataset.validated='true';
 const existing=field.querySelector('.field-state-icon');
 if(message){helper.textContent=message;if(!existing)field.querySelector('.input-wrap').insertAdjacentHTML('beforeend',icon('circle-x',18).replace('<svg ','<svg class="field-state-icon" '));}
 else{helper.textContent=isArea?'Escreva entre 10 e 240 caracteres.':'Informe pelo menos 3 caracteres.';existing?.remove();}
 const feedback=form.querySelector('.form-feedback');feedback.textContent=announce?(message?'Revise o campo indicado.':'Campo validado com sucesso.') : '';
 feedback.style.color=message?'var(--error)':'var(--success)';
 if(announce&&message)input.focus();return !message;
}
function resetForm(form){
 const input=form.querySelector('.text-control');input.value='';input.removeAttribute('aria-invalid');delete input.dataset.validated;delete input.dataset.touched;
 const field=input.closest('.field');field.classList.remove('is-error');field.querySelector('.field-state-icon')?.remove();field.querySelector('.field-helper').textContent=form.dataset.validateForm==='area'?'Escreva entre 10 e 240 caracteres.':'Informe pelo menos 3 caracteres.';
 form.querySelector('.form-feedback').textContent='';const counter=document.getElementById('area-counter');if(counter)counter.textContent='0 / 240';input.focus();
}
function setImageState(failed){
 const image=document.getElementById('image-live');if(!image)return;image.hidden=failed;document.getElementById('image-live-fallback').hidden=!failed;image.closest('figure').querySelector('figcaption').textContent=failed?'16:9 · imagem indisponível':'16:9 · imagem carregada';
 if(!failed)image.src=IMAGE_SAMPLE;
}
document.addEventListener('click',event=>{
 if(!(event.target instanceof Element))return;
 if(event.target.closest('.skip-link')){event.preventDefault();document.getElementById('page-content').focus();return;}
 const root=event.target.closest('.ds-dropdown');if(!root)closeDropdown(false);
 const option=event.target.closest('.dropdown-option');if(option){chooseDropdown(option);return;}
 const trigger=event.target.closest('.dropdown-button');if(trigger){if(appState.openDropdown===root.dataset.dropdown)closeDropdown(true);else openDropdown(root);return;}
 const buttonElement=event.target.closest('button');if(!buttonElement||buttonElement.disabled)return;
 switch(buttonElement.dataset.action){
  case 'menu-open':setNavigationOpen(true);break;
  case 'menu-close':setNavigationOpen(false);document.getElementById('menu-toggle').focus();break;
  case 'copy-css':copyText(COMPONENT_CSS[buttonElement.dataset.page]||'');break;
  case 'close-copy':document.getElementById('copy-dialog').close();break;
  case 'download-tokens':downloadText(JSON.stringify(DS_SPEC,null,2),'design-system-base-especificacao.json');break;
  case 'demo-click':{
   appState.clicks++;const output=document.getElementById('button-feedback');const message=`Clique confirmado · ${appState.clicks} ${appState.clicks===1?'interação':'interações'}.`;if(output)output.textContent=message;else notify(message);break;
  }
  case 'toggle-button':{
   const active=buttonElement.getAttribute('aria-pressed')!=='true';buttonElement.setAttribute('aria-pressed',String(active));buttonElement.textContent=active?'Ativo':'Ativar';document.getElementById('toggle-action-status').textContent=active?'Selecionado · estado Active':'Não selecionado';break;
  }
  case 'page-change':appState.paginationPage=Number(buttonElement.dataset.targetPage);renderPagination();document.querySelector('#pagination-nav [aria-current="page"]').focus({preventScroll:true});break;
  case 'filter-chip':{
   const label=buttonElement.dataset.label;appState.filters.has(label)?appState.filters.delete(label):appState.filters.add(label);renderChips();document.querySelector(`[data-action="filter-chip"][data-label="${label}"]`).focus({preventScroll:true});break;
  }
  case 'remove-chip':appState.chips.delete(buttonElement.dataset.label);renderChips();(document.querySelector('#removable-chips button')||document.querySelector('[data-action="restore-chips"]')).focus({preventScroll:true});break;
  case 'restore-chips':appState.chips=new Set(['Processos','Jornadas','Interfaces']);renderChips();break;
  case 'toggle-password':{
   const input=document.getElementById(buttonElement.dataset.target);const visible=input.type==='password';input.type=visible?'text':'password';buttonElement.setAttribute('aria-label',visible?'Ocultar senha':'Mostrar senha');buttonElement.setAttribute('aria-pressed',String(visible));buttonElement.innerHTML=icon(visible?'eye-off':'eye',18);break;
  }
  case 'validate-field':validateForm(buttonElement.closest('form'));break;
  case 'reset-field':resetForm(buttonElement.closest('form'));break;
  case 'image-error':setImageState(true);break;
  case 'image-restore':setImageState(false);break;
  case 'dismiss-alert':buttonElement.closest('.inline-alert').remove();document.getElementById('alert-demo-status').textContent='Aviso fechado.';document.querySelector('[data-action="restore-alert"]').focus({preventScroll:true});break;
  case 'restore-alert':document.getElementById('dismissible-alert-slot').innerHTML=inlineAlert('info','Mensagem de exemplo','Você pode fechar este aviso e exibi-lo novamente.',{dismiss:true});document.getElementById('alert-demo-status').textContent='Aviso exibido.';break;
 }
});
document.addEventListener('change',event=>{
 const target=event.target;
 if(target.name==='demo-check')document.getElementById('checkbox-status').textContent=`${document.querySelectorAll('[name="demo-check"]:checked').length} opção(ões) selecionada(s).`;
 if(target.name==='demo-radio')document.getElementById('radio-status').textContent=`${target.value} selecionado.`;
 if(target.id==='demo-switch')document.getElementById('switch-status').textContent=target.checked?'Notificações ativadas.':'Notificações desativadas.';
 if(target.id==='avatar-switch'){appState.avatarNotification=target.checked;renderAvatar();}
});
document.addEventListener('input',event=>{
 const input=event.target;if(!(input instanceof Element))return;const form=input.closest('[data-validate-form]');if(!form)return;
 input.dataset.touched='true';if(input.id==='live-area')document.getElementById('area-counter').textContent=`${input.value.length} / 240`;
 if(input.dataset.validated)validateForm(form,{announce:false});
});
document.addEventListener('blur',event=>{
 const input=event.target;if(!(input instanceof Element)||!input.matches('.text-control'))return;const form=input.closest('[data-validate-form]');if(form&&input.dataset.touched)validateForm(form,{announce:false});
},true);
document.addEventListener('submit',event=>{if(event.target.matches('[data-validate-form]')){event.preventDefault();validateForm(event.target);}});
document.addEventListener('error',event=>{if(event.target.id==='image-live')setImageState(true);},true);
document.addEventListener('keydown',event=>{
 if(!(event.target instanceof Element)||event.defaultPrevented)return;
 if(event.target.id==='nav-search'){if(event.key==='Escape'&&event.target.value){event.preventDefault();clearNavigationSearch();return;}if(event.key==='Enter'){const first=[...document.querySelectorAll('[data-page-link]')].find(link=>!link.hidden);if(first){event.preventDefault();navigate(first.dataset.pageLink);}return;}}
 const root=event.target.closest('.ds-dropdown');
 if(root&&!root.querySelector('.dropdown-button').disabled){
  const options=[...root.querySelectorAll('.dropdown-option')],open=appState.openDropdown===root.dataset.dropdown,current=options.indexOf(document.activeElement);
  if(!open&&['ArrowDown','ArrowUp','Enter',' '].includes(event.key)){event.preventDefault();openDropdown(root,{last:event.key==='ArrowUp'});return;}
  if(open){
   if(event.key==='Escape'){event.preventDefault();closeDropdown(true);return;}
   if(event.key==='Tab'){closeDropdown(false);return;}
   if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){event.preventDefault();let index=current;if(event.key==='Home')index=0;else if(event.key==='End')index=options.length-1;else index=(Math.max(0,current)+(event.key==='ArrowDown'?1:-1)+options.length)%options.length;options[index].focus();return;}
   if(['Enter',' '].includes(event.key)&&current>=0){event.preventDefault();chooseDropdown(options[current]);return;}
   if(event.key.length===1&&!event.ctrlKey&&!event.metaKey){const found=options.find(option=>option.dataset.label.toLowerCase().startsWith(event.key.toLowerCase()));if(found){event.preventDefault();found.focus();}}
  }
 }
 const sidebar=document.getElementById('sidebar');
 if(sidebar.classList.contains('is-open')){
  if(event.key==='Escape'){event.preventDefault();setNavigationOpen(false);document.getElementById('menu-toggle').focus();}
  if(event.key==='Tab'){const focusables=[...sidebar.querySelectorAll('a,button,input')].filter(element=>!element.disabled&&element.offsetParent!==null);const first=focusables[0],last=focusables.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}
 }
});
window.addEventListener('hashchange',()=>renderPage({focus:true}));
window.matchMedia('(max-width: 760px)').addEventListener('change',()=>setNavigationOpen(false));
renderNavigation();
document.getElementById('nav-search').addEventListener('input',filterNavigation);
document.getElementById('nav-search-clear').addEventListener('click',()=>{clearNavigationSearch();document.getElementById('nav-search').focus();});
renderPage();

// Ferramentas estruturadas usam a mesma navegação e o mesmo catálogo visível.
const webMcpLifecycle=new AbortController();
const WEBMCP_TOOLS=[
 {
  name:'get_design_system_specification',title:'Consultar padrões do Design System',description:'Retorna as dimensões fixas, estados e o status de cores e tipografia da base.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute(input){if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).length)throw new Error('Forneça um objeto vazio.');return DS_SPEC;}
 },
 {
  name:'navigate_design_system_section',title:'Abrir seção do Design System',description:'Abre uma seção do site e retorna seu título e os grupos de conteúdo.',inputSchema:{type:'object',properties:{section:{type:'string',enum:PAGE_DEFINITIONS.map(page=>page.id)}},required:['section'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},async execute(input){if(!input||typeof input.section!=='string'||!PAGE_MAP.has(input.section)||Object.keys(input).some(key=>key!=='section'))throw new Error('Seção inválida.');history.replaceState(null,'','#'+input.section);renderPage({focus:true});return {section:appState.page,title:PAGE_MAP.get(appState.page).label};}
 },
 {
  name:'search_design_system_icons',title:'Buscar ícones no Design System',description:'Abre o banco de ícones, aplica a busca em português ou pelo identificador e retorna os resultados visíveis.',inputSchema:{type:'object',properties:{query:{type:'string',maxLength:120}},required:['query'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},async execute(input){if(!input||typeof input.query!=='string'||input.query.length>120||Object.keys(input).some(key=>key!=='query'))throw new Error('Busca inválida.');history.replaceState(null,'','#icones');renderPage();const library=document.querySelector('ds-icon-library');const search=library.shadowRoot.querySelector('#search');search.value=input.query;search.dispatchEvent(new Event('input',{bubbles:true}));const results=library.filtered();return {query:input.query,total:results.length,icons:results.slice(0,30).map(item=>({id:item.id,name:item.label}))};}
 }
];
if(document.modelContext?.registerTool){for(const tool of WEBMCP_TOOLS){try{Promise.resolve(document.modelContext.registerTool(tool,{signal:webMcpLifecycle.signal})).catch(()=>{});}catch(_){}}}
window.addEventListener('pagehide',()=>webMcpLifecycle.abort(),{once:true});
