/* Nismtutor payment mode. Asks the NISMCAA server whether a live Stripe key is connected.
   Live: removes the yellow TEST MODE banners and the "(test)" labels. Test or simulated: changes nothing. */
(function(){
 var API=(/^(localhost|127\.0\.0\.1)$/.test(location.hostname)&&(new URLSearchParams(location.search).get('api')||localStorage.getItem('nt_api')))||'https://nismcaa-payments.onrender.com';
 var RX=[[/\s*\(test mode\)/gi,''],[/\s*\(test\)/gi,''],[/Test mode: no real money moves\. Test card 4242 4242 4242 4242\.?/g,'Secure checkout by Stripe.'],[/\s*Canceling 24\+ hours ahead gives a full refund \(test mode\)\./g,' Canceling 24+ hours ahead gives a full refund.']];
 function scrub(root){if(!root)return;var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),n,list=[];while((n=w.nextNode()))list.push(n);
  list.forEach(function(t){var v=t.nodeValue,o=v;if(!/test/i.test(v))return;RX.forEach(function(r){v=v.replace(r[0],r[1])});if(v!==o)t.nodeValue=v});}
 function live(){document.documentElement.classList.add('pay-live');
  document.querySelectorAll('.prev,.p').forEach(function(b){if(/TEST MODE/i.test(b.textContent))b.remove()});
  scrub(document.body);
  new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(x){if(x.nodeType===1){if((x.classList.contains('prev')||x.classList.contains('p'))&&/TEST MODE/i.test(x.textContent))x.remove();else scrub(x)}else if(x.nodeType===3&&/test/i.test(x.nodeValue))scrub(x.parentNode)})})}).observe(document.body,{childList:true,subtree:true});
  var c=window.confirm;window.confirm=function(m){return c.call(window,String(m).replace(/\s*\(test mode\)/gi,''))};}
 try{if(localStorage.getItem('nt_paylive')==='1'){if(document.body)live();else document.addEventListener('DOMContentLoaded',live)}}catch(e){}
 fetch(API+'/tutor/api/config').then(function(r){return r.json()}).then(function(c){var on=c&&c.payMode==='stripe-live';try{localStorage.setItem('nt_paylive',on?'1':'0')}catch(e){}
  if(on&&!document.documentElement.classList.contains('pay-live'))live();else if(!on&&document.documentElement.classList.contains('pay-live'))location.reload()}).catch(function(){});
})();
