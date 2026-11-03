/* NISMCAA Tutor: cross-device live sync for the Teaching Board, chat, polls and reactions.
   Replaces same-device BroadcastChannel with a relay on the NISMCAA server (private room name; kept in memory only, never recorded). */
(function(){var API=(window.NT_API||(/^(localhost|127\.0\.0\.1)$/.test(location.hostname)&&(new URLSearchParams(location.search).get('api')||localStorage.getItem('nt_api')))||'https://nismcaa-payments.onrender.com')+'/tutor/sync/';
function Ch(name){var me=this;me.name=name;me.id=Math.random().toString(36).slice(2,12);me.onmessage=null;me.l=[];me.since=0;me.closed=false;setTimeout(function(){me.poll()},50)}
Ch.prototype.postMessage=function(m){fetch(API+encodeURIComponent(this.name),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({m:m,f:this.id}),keepalive:false}).catch(function(){})};
Ch.prototype.addEventListener=function(t,f){if(t==='message')this.l.push(f)};Ch.prototype.removeEventListener=function(t,f){this.l=this.l.filter(function(x){return x!==f})};
Ch.prototype.close=function(){this.closed=true};
Ch.prototype.poll=function(){var me=this;if(me.closed)return;fetch(API+encodeURIComponent(me.name)+'?since='+me.since).then(function(r){return r.json()}).then(function(j){
 if(j.n<me.since)me.since=0;(j.q||[]).forEach(function(x){me.since=Math.max(me.since,x.n);if(x.f===me.id)return;var ev={data:x.m};try{me.onmessage&&me.onmessage(ev)}catch(e){console.error(e)}me.l.forEach(function(f){try{f(ev)}catch(e){}})});if(!(j.q||[]).length)me.since=j.n;
 me.poll()}).catch(function(){setTimeout(function(){me.poll()},3000)})};
window.BroadcastChannel=Ch;window.NT_SYNC=true})();
