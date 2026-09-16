// The full catalogue is requested only by the icon-bank section.
let iconBankPromise;
function ensureIconBank(){
 if(customElements.get('ds-icon-library'))return Promise.resolve();
 if(iconBankPromise)return iconBankPromise;
 iconBankPromise=new Promise((resolve,reject)=>{
  const script=document.createElement('script');script.src=SHARED_ICON_BANK_URL;script.async=true;
  let finished=false;
  const finish=error=>{if(finished)return;finished=true;clearTimeout(timer);script.onload=null;script.onerror=null;if(error){script.remove();reject(error);}else resolve();};
  const timer=setTimeout(()=>finish(new Error('O banco de ícones demorou para responder.')),20000);
  script.onload=()=>finish(customElements.get('ds-icon-library')?null:new Error('Não foi possível iniciar o banco de ícones.'));
  script.onerror=()=>finish(new Error('Não foi possível carregar o banco de ícones.'));
  document.head.append(script);
 }).catch(error=>{iconBankPromise=undefined;throw error;});
 return iconBankPromise;
}
function renderSharedIconBank(){
 const library=document.querySelector('ds-icon-library');if(!library)return;
 const rootStyle=getComputedStyle(document.documentElement);
 library.style.setProperty('--ds-icon-color',rootStyle.getPropertyValue('--ds-icon-color').trim());
 const status=document.querySelector('[data-icon-load-status]');
 if(status){status.hidden=false;status.querySelector('span').textContent='Carregando ícones…';status.querySelector('button').hidden=true;}
 return ensureIconBank().then(()=>{if(status&&library.isConnected)status.hidden=true;}).catch(()=>{
  if(status&&library.isConnected){status.querySelector('span').textContent='Não foi possível carregar os ícones. Verifique sua conexão e tente novamente.';status.querySelector('button').hidden=false;}
 });
}
document.addEventListener('click',event=>{if(event.target.closest?.('[data-retry-icon-bank]'))renderSharedIconBank();});
