(function(){
  const links=document.querySelectorAll('a[href^="#"]');
  links.forEach(a=>a.addEventListener('click',e=>{
    const id=a.getAttribute('href').slice(1);const el=document.getElementById(id);
    if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'});}
  }));
  async function wireForm(id, msgId){
    const f=document.getElementById(id); if(!f) return;
    const msg=document.getElementById(msgId);
    f.addEventListener('submit',async(e)=>{
      e.preventDefault(); msg.textContent='Envoi en cours…';
      const fd=new FormData(f), body=Object.fromEntries(fd.entries());
      try{
        const r=await fetch(f.action,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
        if(r.ok){ msg.textContent='Merci ! Vérifiez votre email pour confirmer.'; f.reset(); }
        else{ msg.textContent='Impossible de traiter votre demande.'; }
      }catch{ msg.textContent='Erreur réseau. Réessayez.'; }
    });
  }
  wireForm('ig-sub','ig-sub-msg');
  wireForm('ig-sub-mobile','ig-sub-mobile-msg');
})();
