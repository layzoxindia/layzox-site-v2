/* Layzox assistant: answers common questions from the site's own content,
   guides visitors to the right page and captures enquiries.
   No third-party scripts: answers come from the knowledge base below. */
(function(){
'use strict';
if(window.__lzc)return;window.__lzc=1;
var WA='919263139771', PHONE='+91 92631 39770', EMAIL='contact@layzox.com';
var d=document, RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function wa(t){return 'https://wa.me/'+WA+'?text='+encodeURIComponent(t)}
function el(tag,cls,txt){var e=d.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e}
var store={get:function(k){try{return JSON.parse(sessionStorage.getItem(k))}catch(e){return null}},set:function(k,v){try{sessionStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

/* ---------- knowledge base ---------- */
var KB=[
 {id:'services',k:['what do you','services','service','build','offer','kya banate','kya karte','work do','capabilit','solutions'],
  a:'Layzox builds:\n• Custom business software (dashboards, portals, workflow systems)\n• AI and workflow automation, including voice and chat agents\n• Websites and web applications\n• Mobile apps for iOS and Android\n• Cloud, data and dashboards\n• Technology consulting\n\nWhat would you like to improve?',
  q:['Get an estimate','AI agents','Mobile apps','How it works'],links:[['All services','/services']]},
 {id:'price',k:['price','cost','pricing','budget','how much','charges','charge','fee','rate','kitna','paisa','paise','kharcha','quotation','quote','estimate cost','expensive','cheap','afford'],
  a:'Cost depends on what the system must do, how many people use it and what it connects to. We do not quote a number before understanding the problem.\n\nHow it works: a short conversation, then a written estimate with scope, timeline and cost before you commit to anything.',
  q:['Get an estimate','Talk to a person','How it works']},
 {id:'time',k:['how long','timeline','time','duration','weeks','months','kitna time','kab tak','deadline','fast','quick','jaldi','delivery time'],
  a:'Timelines depend on scope. After understanding your process we send a written scope that separates the first usable version from later additions. You try working software at every step, so you see progress early.',
  q:['Get an estimate','How it works']},
 {id:'process',k:['how it works','process','steps','approach','how do you work','start','begin','kaise','procedure','method'],
  a:'Four steps:\n1. Map how your work runs today\n2. Agree a written scope (what is built first, what waits)\n3. Build in reviewed steps, so you try working software each time\n4. Hand over the code, deployment details and documentation',
  q:['Get an estimate','Do I own the code?'],links:[['See the approach','/approach']]},
 {id:'own',k:['own','ownership','source code','code','handover','hand over','ip','intellectual','rights'],
  a:'Yes, you own it. At handover you receive the source code, deployment details and documentation, so you can run it yourself or hire anyone to continue.',
  q:['Get an estimate','Support after launch']},
 {id:'ai',k:['ai','agent','voice','bot','chatbot','calling','call leads','automation','automate','gpt','llm','artificial'],
  a:'We build AI where it clearly helps:\n• Voice and chat agents that call or message new leads, ask your qualifying questions, book meetings and update your CRM\n• Automations for follow-ups, reminders, data entry and document reading\n\nA person checks anything that must be accurate, and you decide what the agent may say.',
  q:['Get an estimate','How it works'],links:[['How AI agents work','/ai-agents'],['Automation','/services/automation']]},
 {id:'web',k:['website','web app','webapp','portal','landing','site','ecommerce','e-commerce','online store','booking system','saas','web application'],
  a:'We build fast websites, customer portals, booking and ordering systems, admin panels and SaaS products. You review real pages on a live link throughout, and we check speed, accessibility and security before launch.',
  q:['Get an estimate','Mobile apps'],links:[['Web applications','/services/web']]},
 {id:'mobile',k:['mobile','app','android','ios','iphone','play store','app store','apk','application'],
  a:'We build iOS and Android apps for customers and field teams, usually from one cross-platform codebase. Key actions can work offline and sync later, and apps are published under your own store accounts.',
  q:['Get an estimate','Websites'],links:[['Mobile apps','/services/mobile']]},
 {id:'custom',k:['crm','erp','dashboard','inventory','billing','invoice','approval','workflow','internal tool','management system','software','system','spreadsheet','excel','sheet'],
  a:'We replace scattered chats, spreadsheets and manual follow-up with one system shaped around your process: requests, approvals, orders, records and dashboards, with roles and an audit trail.',
  q:['Get an estimate','Can you connect our tools?'],links:[['Custom software','/services/custom']]},
 {id:'tools',k:['integrat','connect','existing tools','whatsapp','gmail','tally','zoho','hubspot','shopify','api','sync','import'],
  a:'Usually, yes. We connect spreadsheets, forms, WhatsApp, email, CRMs and other systems wherever they offer a way to integrate, so your team does not start from zero. We confirm what is possible for your tools during the first conversation.',
  q:['Get an estimate']},
 {id:'cloud',k:['cloud','hosting','server','aws','azure','backup','deploy','data','report','analytics','bi'],
  a:'We set up reliable hosting, automated deployments, monitoring and tested backups, and build dashboards that pull data from your tools automatically.',
  q:['Get an estimate'],links:[['Cloud and data','/services/cloud']]},
 {id:'consult',k:['consult','advice','second opinion','review my','audit','not sure','confused','which technology','vendor','modernis','moderniz','old software','legacy'],
  a:'Not sure what to build, buy or fix? We review your goals and current systems, then give you the options with costs, risks and trade-offs in plain language. If an existing product or a simple spreadsheet is the right answer, we will say so.',
  q:['Get an estimate','Talk to a person'],links:[['Technology consulting','/services/consulting']]},
 {id:'support',k:['support','maintenance','after launch','bug','fix','update later','maintain','warranty','help with existing'],
  a:'After launch you get the full handover. Ongoing maintenance or support can be agreed separately, depending on what your team needs. If you already work with us, reply on your existing thread or contact us directly.',
  q:['Talk to a person'],links:[['Support','/support']]},
 {id:'where',k:['where','location','country','india','abroad','international','usa','uk','dubai','remote','office','based','timezone','time zone'],
  a:'We work remotely with teams around the world and meet over video at a time that suits you. Our corporate office address is in the website footer.',
  q:['Get an estimate','Talk to a person']},
 {id:'about',k:['who are you','about','company','experience','team','new company','trust','reliable','portfolio','clients','case stud','reviews'],
  a:'Layzox is a new company run by professionals with more than 10 years of hands-on experience. We do not show invented clients or results. Instead, you check the work as it happens: working software at every step, and the code is yours.',
  q:['How it works','Get an estimate'],links:[['About Layzox','/about'],['Why Layzox','/why-layzox']]},
 {id:'careers',k:['job','career','hiring','vacancy','internship','work with you','join'],
  a:'We are not advertising specific openings right now, but we are glad to hear from people who build software, design interfaces or run delivery well. Email '+EMAIL+' with the subject “Careers”.',
  links:[['Careers','/careers']]},
 {id:'privacy',k:['privacy','data safe','gdpr','dpdp','secure my data','confidential','nda'],
  a:'We only use the details you share to reply to your enquiry. Confidentiality or an NDA can be agreed before you share sensitive details.',
  links:[['Privacy Policy','/privacy']]},
 {id:'contact',k:['contact','phone','number','call','email','mail','reach','baat','talk','human','person','someone','representative','agent please','sales team'],
  a:'You can reach the team directly:\n• Call '+PHONE+'\n• Email '+EMAIL+'\n• Or message us on WhatsApp\n\nOr leave your details here and we will get back to you.',
  q:['Get an estimate'],acts:'contact'},
 {id:'industry',k:['industry','industries','clinic','hospital','doctor','real estate','property','builder','broker','school','coaching','institute','education','hotel','restaurant','cafe','distribut','wholesale','logistics','transport','solar','energy'],
  a:'We build for many industries, including clinics and healthcare, real estate, education and coaching, hotels and restaurants, distribution and logistics, and solar businesses. Each industry page shows the common problems and what we would build first.',
  q:['Get an estimate','Book a call'],links:[['Industries','/industries']]},
 {id:'models',k:['engagement','model','retainer','dedicated team','hire developer','hourly','fixed price','mvp','monthly','technology','tech stack','stack','react','node','python','flutter'],
  a:'There are four ways to work with us: a fixed-scope project, a phased MVP, a monthly retainer or a dedicated team. We use proven technology such as React, Next.js, Node.js, Python and cross-platform mobile frameworks, and fit in with what your team already runs.',
  q:['Get an estimate','How much does it cost?'],links:[['How to work with us','/engagement']]},
 {id:'book',k:['book','meeting','call me','schedule','appointment','demo','video call','zoom','meet','book a call','book call','request a call','free call','schedule a call'],
  a:'You can book a free 30-minute call. Pick a day and time and we confirm the slot by email or phone.',
  q:['Get an estimate'],links:[['Book a free call','/book']]},
 {id:'learn',k:['blog','guide','article','checklist','resource','learn','read','pdf','ebook'],
  a:'We publish practical guides on automation, AI agents and choosing software, plus a free automation readiness checklist.',
  links:[['Insights','/insights'],['Free checklist','/resources/automation-checklist']]},
 {id:'hello',k:['hi','hello','hey','namaste','good morning','good evening','hii','helo'],
  a:'Hello! I can answer questions about Layzox, or take your requirement and get you a written estimate. What would you like to do?',
  q:['What do you build?','How much does it cost?','Get an estimate']},
 {id:'thanks',k:['thank','thanks','great','ok','okay','cool','nice','dhanyavad','shukriya'],
  a:'Happy to help. Anything else you would like to know?',q:['Get an estimate','Talk to a person']}
];
var QMAP={'Book a call':'book','What do you build?':'services','How much does it cost?':'price','How long does it take?':'time','How it works':'process','Do I own the code?':'own','AI agents':'ai','Mobile apps':'mobile','Websites':'web','Can you connect our tools?':'tools','Support after launch':'support','Talk to a person':'contact'};
function norm(s){return (' '+s.toLowerCase().replace(/[^a-z0-9ऀ-ॿ ]+/g,' ').replace(/\s+/g,' ')+' ')}
function match(text){var t=norm(text),best=null,score=0;
  KB.forEach(function(it){var s=0;it.k.forEach(function(k){var kk=k.length<=3?' '+k+' ':k;if(t.indexOf(kk)>-1)s+=k.length>5?2:1});if(s>score){score=s;best=it}});
  return score?best:null}

/* ---------- UI ---------- */
if(!d.querySelector('link[href^="/chat.css"]')){var css=d.createElement('link');css.rel='stylesheet';css.href='/chat.css?v=1';d.head.appendChild(css)}
var ICON={chat:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M8.5 11h7M8.5 14h4"/></svg>',
  x:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  send:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'};
var launch=el('button','lzc-launch');launch.type='button';launch.setAttribute('aria-haspopup','dialog');launch.setAttribute('aria-controls','lzc-panel');launch.setAttribute('aria-label','Chat with Layzox');
launch.innerHTML='<span class="lzc-face">'+ICON.chat+'</span><span class="lzc-dot" aria-hidden="true"></span><span class="lzc-label">Ask Layzox</span>';
var panel=el('div','lzc-panel');panel.id='lzc-panel';panel.hidden=true;panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','false');panel.setAttribute('aria-label','Layzox assistant');
panel.innerHTML='<div class="lzc-head"><span class="lzc-face"><img src="/brand/mark-64.webp" alt="" width="26" height="26"></span><div><b>Layzox assistant</b><span>Answers questions · takes your requirement</span></div><button class="lzc-x" type="button" aria-label="Close chat">'+ICON.x+'</button></div>'+
 '<div class="lzc-log" role="log" aria-live="polite" aria-relevant="additions"></div><div class="lzc-quick"></div>'+
 '<form class="lzc-form" autocomplete="off"><label class="sr" for="lzc-in" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Type your message</label><input id="lzc-in" maxlength="600" placeholder="Type your question…"><button type="submit" aria-label="Send">'+ICON.send+'</button></form>'+
 '<p class="lzc-fine">Automated assistant. Details you share are used only to reply. <a href="/privacy">Privacy</a></p>';
d.body.appendChild(launch);d.body.appendChild(panel);
var log=panel.querySelector('.lzc-log'),quick=panel.querySelector('.lzc-quick'),form=panel.querySelector('.lzc-form'),input=panel.querySelector('#lzc-in');
var history=store.get('lzc-h')||[], lead=store.get('lzc-lead')||null, started=false;

function scroll(){log.scrollTop=log.scrollHeight}
function addMsg(who,text,save){var m=el('div','lzc-m '+who,text);log.appendChild(m);scroll();if(save!==false){history.push([who,text]);if(history.length>60)history=history.slice(-60);store.set('lzc-h',history)}return m}
function addActs(list){var w=el('div','lzc-acts');list.forEach(function(a){var x;
  if(a.href){x=el('a',a.cls||'',a.label);x.href=a.href;if(/^https?:/.test(a.href)){x.target='_blank';x.rel='noopener noreferrer'}}
  else{x=el('button',a.cls||'',a.label);x.type='button';x.addEventListener('click',a.fn)}
  w.appendChild(x)});log.appendChild(w);scroll()}
function setQuick(list){quick.textContent='';(list||[]).forEach(function(q){var b=el('button','',q);b.type='button';b.addEventListener('click',function(){userSays(q)});quick.appendChild(b)});scroll();requestAnimationFrame(scroll)}
function botSay(text,after){var t=el('div','lzc-m bot typing');t.innerHTML='<i></i><i></i><i></i>';t.setAttribute('aria-label','Typing');log.appendChild(t);scroll();
  setTimeout(function(){t.remove();addMsg('bot',text);if(after)after()},RM?0:Math.min(900,350+text.length*4))}
function contactActs(summary){addActs([{label:'WhatsApp us',href:wa(summary||'Hello Layzox, I have a question about a software project.'),cls:'wa'},{label:'Call',href:'tel:'+PHONE.replace(/\s/g,'')},{label:'Email',href:'mailto:'+EMAIL}])}

/* ---------- lead capture flow ---------- */
var NEEDS=['Business software','AI automation / agent','Website / web app','Mobile app','Cloud / data','Not sure yet'];
var STEPS=[
 {key:'need',ask:'Great. What do you need?',opts:NEEDS},
 {key:'problem',ask:'In a line or two, what should it fix? For example: “orders on WhatsApp get missed”.',free:true},
 {key:'when',ask:'When would you like to start?',opts:['As soon as possible','This month','In 1–3 months','Just exploring']},
 {key:'name',ask:'What is your name?',free:true},
 {key:'contact',ask:'Where should we reply? Share an email or a phone number with country code.',free:true}
];
var flow=null;
function startLead(){flow={i:0,data:{}};askStep()}
function askStep(){var s=STEPS[flow.i];botSay(s.ask,function(){setQuick(s.opts||['Cancel']);input.placeholder=s.free?'Type here…':'Choose an option or type';input.focus()})}
function leadAnswer(text){var s=STEPS[flow.i];
  if(/^cancel$/i.test(text.trim())){flow=null;botSay('No problem. Ask me anything else.',function(){setQuick(['What do you build?','How much does it cost?','Get an estimate'])});return}
  if(s.key==='contact'){var em=text.match(/[^\s@,;<>"']+@[^\s@,;<>"']+\.[^\s@,;<>"']{2,}/),ph=text.replace(/[^\d+]/g,'');
    if(!em&&ph.replace(/\D/g,'').length<8){botSay('That does not look like an email or phone number. Please share one so we can reply.');return}
    flow.data.email=em?em[0]:'';flow.data.phone=em?'':ph}
  else if(s.key==='name'){if(text.trim().length<2){botSay('Please share your name.');return}flow.data.name=text.trim().slice(0,120)}
  else flow.data[s.key]=text.trim().slice(0,800);
  flow.i++;
  if(flow.i<STEPS.length)askStep();else finishLead()}
function summary(x){return 'Hello Layzox, here is my requirement.\nName: '+x.name+'\nNeed: '+x.need+'\nProblem: '+x.problem+'\nStart: '+x.when+(x.email?'\nEmail: '+x.email:'')+(x.phone?'\nPhone: '+x.phone:'')}
function finishLead(){var x=flow.data;flow=null;setQuick([]);input.placeholder='Type your question…';
  botSay('Thanks, '+x.name.split(' ')[0]+'. Sending your requirement to the team…',function(){
    var body={kind:'project',name:x.name,email:x.email,phone:x.phone,type:x.need,message:x.problem+'\nStart: '+x.when+'\n(Sent from the website assistant)',page:location.href,website:''};
    var done=function(ok){
      if(ok){lead={name:x.name,at:Date.now()};store.set('lzc-lead',lead);
        botSay('Done. The team has your requirement and will reply with questions or a practical next step, then a written estimate. If it is urgent, you can also message us now.',function(){contactActs(summary(x));setQuick(['How it works','Do I own the code?'])});
        try{window.dataLayer&&window.dataLayer.push({event:'generate_lead',form:'assistant'})}catch(e){}}
      else botSay('I could not deliver it automatically. Tap below to send the same message on WhatsApp or email. Nothing is sent until you tap send.',function(){addActs([{label:'Send on WhatsApp',href:wa(summary(x)),cls:'wa'},{label:'Send by email',href:'mailto:'+EMAIL+'?subject='+encodeURIComponent('Project requirement from '+x.name)+'&body='+encodeURIComponent(summary(x))}])})};
    try{var ctl=window.AbortController?new AbortController():null,tm=setTimeout(function(){ctl&&ctl.abort()},9000);
      fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:ctl?ctl.signal:undefined})
      .then(function(r){clearTimeout(tm);done(r.ok)}).catch(function(){done(false)})}catch(e){done(false)}
  })}

/* ---------- routing ---------- */
function answer(text){
  if(flow){leadAnswer(text);return}
  if(/estimate|get a quote|quotation|requirement|start (a )?project|hire you|banwana|banana hai|chahiye/i.test(text)&&!/how much|kitna|cost|price|charge/i.test(text)){startLead();return}
  var it=QMAP[text]?KB.filter(function(x){return x.id===QMAP[text]})[0]:match(text);
  if(!it){botSay('I may not have the answer to that, but the team can help. You can ask me about services, cost, timelines, AI agents, apps or how we work, or get a written estimate.',function(){contactActs();setQuick(['What do you build?','How much does it cost?','Get an estimate'])});return}
  botSay(it.a,function(){
    if(it.acts==='contact')contactActs();
    if(it.links)addActs(it.links.map(function(l){return {label:l[0],href:l[1]}}));
    setQuick(it.q||['Get an estimate','Talk to a person'])})}
function userSays(text){if(!text.trim())return;addMsg('me',text.trim());setQuick([]);answer(text.trim())}
form.addEventListener('submit',function(e){e.preventDefault();var v=input.value;input.value='';userSays(v)});

/* ---------- open / close ---------- */
function greet(){if(started)return;started=true;
  if(history.length){history.forEach(function(h){addMsg(h[0],h[1],false)});setQuick(['Get an estimate','Talk to a person','What do you build?']);return}
  var page=location.pathname;var hint=page.indexOf('/services/mobile')===0?'mobile apps':page.indexOf('/ai-agents')===0||page.indexOf('/services/automation')===0?'AI agents and automation':page.indexOf('/services/web')===0?'websites and web apps':'';
  botSay('Hi! I am the Layzox assistant. I can answer questions'+(hint?' about '+hint:'')+' or take your requirement and get you a written estimate.',function(){setQuick(['What do you build?','How much does it cost?','How long does it take?','Get an estimate','Talk to a person'])})}
function open(){panel.hidden=false;launch.hidden=true;d.body.classList.add('lzc-open');hideNudge(true);greet();setTimeout(function(){input.focus()},60)}
function close(){panel.hidden=true;launch.hidden=false;d.body.classList.remove('lzc-open');launch.focus()}
launch.addEventListener('click',open);
panel.querySelector('.lzc-x').addEventListener('click',close);
d.addEventListener('keydown',function(e){if(e.key==='Escape'&&!panel.hidden)close()});
d.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-chat-open]');if(a){e.preventDefault();open();var q=a.getAttribute('data-chat-open');if(q)setTimeout(function(){userSays(q)},RM?0:500)}});

/* ---------- homepage estimate form ---------- */
var f=d.getElementById('lzq');
if(f){
  var $q=function(id){return d.getElementById(id)};
  Array.prototype.forEach.call(f.querySelectorAll('.lzq-opts'),function(g){var multi=g.getAttribute('data-multi')==='1';
    Array.prototype.forEach.call(g.querySelectorAll('button'),function(b){b.addEventListener('click',function(){var on=b.getAttribute('aria-pressed')==='true';
      if(!multi)Array.prototype.forEach.call(g.querySelectorAll('button'),function(x){x.setAttribute('aria-pressed','false')});
      b.setAttribute('aria-pressed',on?'false':'true');upd()})})});
  var picked=function(g){return Array.prototype.map.call(f.querySelectorAll('[data-group="'+g+'"] button[aria-pressed="true"]'),function(b){return b.textContent})};
  var vals=function(){var c=$q('lzq-contact').value.trim(),em=/^[^\s@,;<>"']+@[^\s@,;<>"']+\.[^\s@,;<>"']{2,}$/.test(c);
    return {name:$q('lzq-name').value.trim(),contact:c,email:em?c:'',phone:em?'':c,need:picked('need').join(', ')||'Not sure yet',when:picked('when')[0]||'',msg:$q('lzq-msg').value.trim()}};
  var text=function(v){return 'Hello Layzox, I would like a free estimate.'+(v.name?'\nName: '+v.name:'')+'\nNeed: '+v.need+(v.when?'\nStart: '+v.when:'')+(v.msg?'\nProblem: '+v.msg:'')+(v.contact?'\nContact: '+v.contact:'')};
  var upd=function(){$q('lzq-wa').href=wa(text(vals()))};
  ['lzq-name','lzq-contact','lzq-msg'].forEach(function(id){$q(id).addEventListener('input',upd)});upd();
  f.addEventListener('submit',function(e){e.preventDefault();if($q('lzq-web').value)return;
    var v=vals(),err=$q('lzq-err'),btn=$q('lzq-send');err.className='lzq-err';
    if(!v.name){err.textContent='Add your name so we know who to reply to.';$q('lzq-name').focus();return}
    if(!v.email&&v.phone.replace(/\D/g,'').length<8){err.textContent='Add a valid email, or a phone number with country code.';$q('lzq-contact').focus();return}
    err.textContent='Sending…';btn.disabled=true;
    var body={kind:'project',name:v.name,email:v.email,phone:v.phone,type:v.need,message:(v.msg||'Requested a free estimate.')+(v.when?'\nStart: '+v.when:'')+'\n(Sent from the homepage estimate form)',page:location.href,website:''};
    var fail=function(){btn.disabled=false;err.className='lzq-err';err.textContent='';var a=$q('lzq-wa');err.textContent='We could not send it automatically. Please use “Send on WhatsApp instead” or email '+EMAIL+'.';a.focus()};
    try{var ctl=window.AbortController?new AbortController():null,tm=setTimeout(function(){ctl&&ctl.abort()},9000);
      fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:ctl?ctl.signal:undefined})
      .then(function(r){clearTimeout(tm);if(r.ok){btn.disabled=false;f.reset();Array.prototype.forEach.call(f.querySelectorAll('[aria-pressed="true"]'),function(b){b.setAttribute('aria-pressed','false')});err.className='lzq-ok';err.textContent='Thank you. We have your request and will reply soon.';
        try{window.dataLayer&&window.dataLayer.push({event:'generate_lead',form:'estimate'})}catch(x){}}else fail()}).catch(fail)}catch(x){fail()}
  });
}

/* ---------- shared form helpers ---------- */
function chips(form){Array.prototype.forEach.call(form.querySelectorAll('.lzq-opts'),function(g){var multi=g.getAttribute('data-multi')==='1';
  g.addEventListener('click',function(e){var b=e.target.closest('button');if(!b||!g.contains(b))return;var on=b.getAttribute('aria-pressed')==='true';
    if(!multi)Array.prototype.forEach.call(g.querySelectorAll('button'),function(x){x.setAttribute('aria-pressed','false')});
    b.setAttribute('aria-pressed',on?'false':'true');form.dispatchEvent(new Event('input'))})})}
function pick(form,g){return Array.prototype.map.call(form.querySelectorAll('[data-group="'+g+'"] button[aria-pressed="true"]'),function(b){return b.textContent})}
function send(body,ok,fail){try{var ctl=window.AbortController?new AbortController():null,tm=setTimeout(function(){ctl&&ctl.abort()},9000);
  fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:ctl?ctl.signal:undefined})
  .then(function(r){clearTimeout(tm);r.ok?ok():fail()}).catch(fail)}catch(e){fail()}}
var EMRE=/^[^\s@,;<>"']+@[^\s@,;<>"']+\.[^\s@,;<>"']{2,}$/;

/* ---------- book a call ---------- */
var bk=d.getElementById('book');
if(bk){
  var tz='';try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||''}catch(e){}
  d.getElementById('bk-tz').textContent=tz||'not detected';
  var days=d.getElementById('book-days'),dt=new Date(),n=0;
  while(n<6){dt.setDate(dt.getDate()+1);if(dt.getDay()===0)continue;var b=el('button','',dt.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short',year:'numeric'}));b.type='button';b.setAttribute('aria-pressed','false');days.appendChild(b);n++}
  chips(bk);
  var bv=function(){var c=d.getElementById('bk-contact').value.trim(),em=EMRE.test(c);return {name:d.getElementById('bk-name').value.trim(),c:c,email:em?c:'',phone:em?'':c,day:pick(bk,'day')[0]||'',slot:pick(bk,'slot')[0]||'',topic:d.getElementById('bk-topic').value.trim()}};
  var bt=function(v){return 'Hello Layzox, I would like to book a call.'+(v.name?'\nName: '+v.name:'')+(v.day?'\nDay: '+v.day:'')+(v.slot?'\nTime: '+v.slot:'')+(tz?' ('+tz+')':'')+(v.topic?'\nTopic: '+v.topic:'')+(v.c?'\nContact: '+v.c:'')};
  var bu=function(){d.getElementById('bk-wa').href=wa(bt(bv()))};bk.addEventListener('input',bu);bu();
  bk.addEventListener('submit',function(e){e.preventDefault();if(d.getElementById('bk-web').value)return;var v=bv(),err=d.getElementById('bk-err'),btn=d.getElementById('bk-send');err.className='lzq-err';
    if(!v.day||!v.slot){err.textContent='Pick a day and a time.';return}
    if(!v.name){err.textContent='Add your name.';d.getElementById('bk-name').focus();return}
    if(!v.email&&v.phone.replace(/\D/g,'').length<8){err.textContent='Add a valid email, or a phone number with country code.';d.getElementById('bk-contact').focus();return}
    btn.disabled=true;err.textContent='Sending…';
    send({kind:'project',name:v.name,email:v.email,phone:v.phone,type:'Call request',message:'Call request: '+v.day+', '+v.slot+(tz?' ('+tz+')':'')+(v.topic?'\nTopic: '+v.topic:'')+'\n(Sent from the Book a call page)',page:location.href,website:''},
      function(){btn.disabled=false;err.className='lzq-ok';err.textContent='Request received. We will confirm your slot by email or phone.';try{window.dataLayer&&window.dataLayer.push({event:'generate_lead',form:'book'})}catch(x){}},
      function(){btn.disabled=false;err.textContent='We could not send it automatically. Please use “Request on WhatsApp” or email '+EMAIL+'.'})});
}

/* ---------- checklist resource ---------- */
var rs=d.getElementById('res');
if(rs){
  var reveal=function(){var c=d.getElementById('checklist');c.hidden=false;c.scrollIntoView({behavior:RM?'auto':'smooth'});store.set('lzc-res',1)};
  if(store.get('lzc-res'))d.getElementById('checklist').hidden=false;
  d.getElementById('rs-print').addEventListener('click',function(){window.print()});
  rs.addEventListener('submit',function(e){e.preventDefault();if(d.getElementById('rs-web').value)return;var err=d.getElementById('rs-err'),nm=d.getElementById('rs-name').value.trim(),em=d.getElementById('rs-email').value.trim();
    if(!EMRE.test(em)){err.textContent='Enter a valid email address.';d.getElementById('rs-email').focus();return}
    err.textContent='Sending your request…';send({kind:'resource',name:nm,email:em,type:'Automation readiness checklist',page:location.href,website:''},function(){err.textContent='Request received. Your checklist is available below.';reveal()},function(){err.textContent='Email delivery was not confirmed. You can still use the free checklist below.';reveal()})});
}

/* Don't repeat the hero's CTA in a fixed mobile dock while the hero is visible. */
var heroSection=d.getElementById('hero');
if(heroSection&&'IntersectionObserver' in window){
  var heroWatch=new IntersectionObserver(function(entries){
    d.body.classList.toggle('hero-visible',entries[0].isIntersecting);
  },{threshold:.1});
  heroWatch.observe(heroSection);
}
/* The assistant is available from its launcher; no unsolicited chat popup. */
})();
