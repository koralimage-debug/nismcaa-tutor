/* NISMCAA Tutor Payouts: tutor wallet (balance, cash out, payout account, weekly auto payout, earnings and payout history). US dollars only. */
(function(){
const usd=n=>'$'+(Math.abs(+n||0)).toFixed(2);
const day=t=>t?new Date(t).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}):'';
NT.ptab=location.hash=='#payouts'||location.hash=='#payouts-done'?'payouts':(NT.ptab||'profile');
const tabs=()=>`<div class="ptabs" role="tablist"><button role="tab" aria-selected="${NT.ptab!='payouts'}" class="${NT.ptab!='payouts'?'sel':''}" onclick="ptab('profile')">Profile</button><button role="tab" aria-selected="${NT.ptab=='payouts'}" class="${NT.ptab=='payouts'?'sel':''}" onclick="ptab('payouts')">Payouts</button></div>`;
window.ptab=function(t){NT.ptab=t;history.replaceState(null,'','#'+(t=='payouts'?'payouts':'profile'));drawProfile()};
const baseProfile=window.drawProfile;
window.drawProfile=async function(){if(NT.ptab=='payouts'&&NT.me&&NT.me.role=='tutor')return drawWallet();await baseProfile();const s=$('s-profile');if(NT.me&&NT.me.role=='tutor'&&!s.querySelector('.ptabs'))s.insertAdjacentHTML('afterbegin',tabs())};
window.drawPayout=async function(){const el=$('payout-box');if(!el)return;try{const w=await api('payouts');el.innerHTML=w.ready?`<p class="payout-ok"><b>✅ Payout account added.</b> Available to cash out: <b>${usd(w.balance.available)}</b>. <button onclick="ptab('payouts')">Open Payouts</button></p>`:`<p class="payout-warn"><b>Add your payout account.</b> Learners can book you once it is added. <button class="go" onclick="ptab('payouts')">Open Payouts</button></p>`}catch(e){el.innerHTML='<p class="payout-warn">Could not load your payouts. <button onclick="drawPayout()">Try again</button></p>'}};
function acctCard(w){const d=w.destination;
 if(d.type=='stripe'){return `<div class="panel"><h3>Payout account</h3>${d.ready?'<p class="payout-ok">✅ Your bank account is set up with Stripe. Cash outs go there in US dollars.</p><button onclick="connectPay()">Update bank details</button>':`<p class="payout-warn"><b>Add your bank account.</b> Stripe asks for your name, date of birth and a US dollar bank account (about 5 minutes). Learners can book you once it is done.</p><button class="go" onclick="connectPay()">${d.started?'Continue setup':'Add bank account'}</button>`}<p class="muted small">Stripe keeps your bank details. NISMCAA never sees your full account number.</p></div>`}
 if(d.set)return `<div class="panel"><h3>Payout account</h3><p class="payout-ok">✅ USD domiciliary account: <b>${E(d.bankName)} ••${E(d.last4)}</b><br>${E(d.accountName)}</p><button onclick="usdForm()">Change account</button><div id="usdf"></div></div>`;
 if(!d.providerReady)return `<div class="panel"><h3>USD (domiciliary) bank account</h3><p>All NISMCAA tutors are paid in <b>US dollars</b>. US dollar payouts for your country are opening soon. You will be able to add your USD (domiciliary) account here, and we will email you when it opens. Learners can book you once it is added.</p></div>`;
 return `<div class="panel"><h3>Add your USD (domiciliary) bank account</h3><p>All NISMCAA tutors are paid in <b>US dollars</b>. Please add a US dollar (domiciliary) account in your name. Learners can book you once it is added.</p><div id="usdf"></div></div>`}
window.usdForm=function(){const f=$('usdf');if(!f)return;f.innerHTML=`<form id="usdform" class="usdform" autocomplete="off">
 <label>Bank name <span class="req">*</span><input name="bankName" required placeholder="e.g. Zenith Bank"></label>
 <label>Bank SWIFT code <span class="req">*</span><input name="swift" required maxlength="11" placeholder="e.g. ZEIBNGLA" style="text-transform:uppercase"></label>
 <label>Name on the account <span class="req">*</span><input name="accountName" required></label>
 <label>USD account number <span class="req">*</span><input name="accountNumber" required inputmode="numeric" autocomplete="off"></label>
 <label>Type the account number again <span class="req">*</span><input name="accountNumber2" required inputmode="numeric" autocomplete="off"></label>
 <label class="chk"><input type="checkbox" name="usd" required> This is a <b>US dollar (domiciliary)</b> account in my name.</label>
 <p class="muted small">Your account number goes straight to our payout partner. NISMCAA keeps only the last 4 digits.</p>
 <p id="usderr" class="err" role="alert"></p><button class="go">Save payout account</button></form>`;
 $('usdform').onsubmit=async ev=>{ev.preventDefault();const F=ev.target,b={bankName:F.bankName.value,swift:F.swift.value,accountName:F.accountName.value,accountNumber:F.accountNumber.value,accountNumber2:F.accountNumber2.value,usd:F.usd.checked};
  try{await api('payouts/usd-account',{body:b});drawWallet()}catch(e){$('usderr').textContent=e.message}}};
window.cashOut=async function(){const w=NT.wallet;const inst=$('inst')&&$('inst').checked;
 if(!confirm('Cash out '+usd(w.balance.available)+' (US dollars) to your payout account'+(inst?' with instant cash out':'')+'?'))return;
 const btn=$('cobtn');btn.disabled=true;btn.textContent='Sending…';
 try{const r=await api('payouts/cashout',{body:{instant:!!inst}});info('<h2>✅ Cash out sent</h2><p><b>'+usd(r.payout.amount)+'</b> is on its way.</p><p>'+E(r.payout.note)+'</p>')}catch(e){info('<h2>Cash out not sent</h2><p>'+E(e.message)+'</p>')}drawWallet()};
window.setAuto=async function(on){try{await api('payouts/auto',{body:{weekly:on}})}catch(e){}drawWallet()};
function earning(x){const b=x.breakdown||{};const chip={available:'ok',pending:'wait','paid out':'done','in a payout':'wait',refunded:'bad'}[x.status]||'';
 return `<li class="earn"><div class="earn-h"><b>${E(x.subject||'Lesson')}</b> <span class="muted">${day(x.lessonDate||x.date)}</span><span class="chip ${chip}">${E(x.status)}${x.status=='pending'?' · '+day(x.availableOn):''}</span></div>
 <table class="brk"><tr><td>Learner paid</td><td>${usd(b.learnerPaid)}</td></tr>${b.salesTax?`<tr><td>− ${E(b.taxState)} sales tax (sent to the state)</td><td>−${usd(b.salesTax)}</td></tr>`:''}<tr><td>− NISMCAA fee (${b.feePct||20}%)</td><td>−${usd(b.fee)}</td></tr><tr class="tot"><td>You earned</td><td>${usd(b.youEarned)}</td></tr></table></li>`}
async function drawWallet(){const s=$('s-profile');s.innerHTML=tabs()+'<div class="panel"><p class="muted">Loading your payouts…</p></div>';let w;
 try{w=NT.wallet=await api('payouts')}catch(e){s.innerHTML=tabs()+'<div class="panel"><p>'+E(e.message)+'</p></div>';return}
 const can=w.ready&&w.balance.available>=w.min;
 let h=tabs()+(w.preview?'<div class="prevnote">Preview: no real money moves.</div>':'');
 h+=`<section class="wallet"><div class="wl-label">Available to cash out</div><div class="wl-amt">${usd(w.balance.available)} <span>USD</span></div>
  <div class="wl-row"><div><span>Pending</span><b>${usd(w.balance.pending)}</b></div><div><span>Being sent</span><b>${usd(w.balance.processing)}</b></div><div><span>Paid out</span><b>${usd(w.balance.paid)}</b></div></div>
  ${w.instant&&w.ready?'<label class="inst"><input type="checkbox" id="inst" checked> Instant cash out (arrives in minutes to an eligible debit card; Stripe fee applies)</label>':''}
  <button id="cobtn" class="cashout" ${can?'':'disabled'} onclick="cashOut()">Cash out</button>
  <p class="wl-note">${!w.ready?'Add your payout account below to cash out.':w.balance.available<w.min?'You can cash out from '+usd(w.min)+'.':'Goes to your payout account in US dollars.'} Lesson earnings become available ${w.holdDays||2} days after each lesson.</p></section>`;
 h+=acctCard(w);
 h+=`<div class="panel"><h3>Automatic weekly payout</h3><label class="switch"><input type="checkbox" ${w.auto?'checked':''} ${w.ready?'':'disabled'} onchange="setAuto(this.checked)"> Pay my available balance every Friday (from ${usd(w.min)})</label></div>`;
 h+=`<div class="panel"><h3>Earnings</h3>${w.earnings.length?'<ul class="earns">'+w.earnings.map(earning).join('')+'</ul>':'<p class="muted">No lessons yet. Your earnings appear here after each paid lesson.</p>'}</div>`;
 h+=`<div class="panel"><h3>Payout history</h3>${w.payouts.length?'<ul class="pos">'+w.payouts.map(p=>`<li><div><b>${usd(p.amount)} USD</b> <span class="chip ${p.status=='paid'?'done':p.status=='failed'?'bad':'wait'}">${E(p.status=='paid'?'sent':p.status)}</span>${p.auto?' <span class="muted">weekly</span>':''}</div><div class="muted">${day(p.date)} · ${E(p.to)}</div>${p.note?'<div class="muted small">'+E(p.note)+'</div>':''}</li>`).join('')+'</ul>':'<p class="muted">No cash outs yet.</p>'}</div>`;
 s.innerHTML=h;if(w.destination.type=='usd'&&!w.destination.set&&w.destination.providerReady)usdForm()}
window.drawWallet=drawWallet;
if(NT.ptab=='payouts')setTimeout(()=>{if(window.tab)tab('profile')},0);
})();
