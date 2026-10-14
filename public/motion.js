/* Layzox motion layer: split-word headline reveals, marker sweep, staggered
   section reveals, magnetic buttons, scroll progress, page curtain.
   Vanilla JS + CSS (no library). Respects prefers-reduced-motion. */
(function(){
'use strict';
var d=document,root=d.documentElement;
var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
if(RM||!('IntersectionObserver' in window))return;
root.classList.add('mo');
var entering=false;
try{if(sessionStorage.getItem('lzx-mo')==='1'){entering=true;sessionStorage.removeItem('lzx-mo');root.classList.add('mo-in')}}catch(e){}
var $$=function(s,r){return Array.prototype.slice.call((r||d).querySelectorAll(s))};

function split(el){
  var idx=0,label=el.textContent.replace(/\s+/g,' ').trim();
  (function walk(n){
    Array.prototype.slice.call(n.childNodes).forEach(function(c){
      if(c.nodeType===3){
        var f=d.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(function(p){
          if(!p)return;
          if(/^\s+$/.test(p)){f.appendChild(d.createTextNode(p));return}
          var w=d.createElement('span'),i=d.createElement('span');
          w.className='mw';w.setAttribute('aria-hidden','true');
          i.className='mi';i.style.setProperty('--d',idx++);i.textContent=p;
          w.appendChild(i);f.appendChild(w);
        });
        c.parentNode.replaceChild(f,c);
      }else if(c.nodeType===1&&c.tagName!=='BR'){walk(c)}
    });
  })(el);
  el.setAttribute('aria-label',label);
  el.classList.add('sw');
}

function ready(){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('go');io.unobserve(e.target)}
  })},{threshold:.2,rootMargin:'0px 0px -6% 0px'});

  /* 1. headlines: split into words, rise from a mask, marker sweeps in */
  $$('h1,h2').forEach(function(h){
    if(h.closest('.cap,.pr-row,.stack,[data-nosplit]'))return;
    split(h);
    if(h.closest('.hero,.sr,.pg-hero,header')||h.tagName==='H1')h.style.setProperty('--base','180ms');
    io.observe(h);
  });

  /* 2. supporting copy: soft rise + unblur, staggered after the headline */
  var sel='.mono,.lead,.hero-cta,.sec-h>p,.sr>p,h1~p,h2~p,.strip>.wrap>div,.card,.flow>*,.fld,.ftr .wrap>*';
  $$(sel).forEach(function(el,i){
    if(el.closest('.cap,.stack,.pr-row,.tabs,nav,.nav,#mnav'))return;
    if(el.classList.contains('rv'))return;
    el.classList.add('fx');
    var sib=Array.prototype.indexOf.call(el.parentNode.children,el);
    el.style.setProperty('--fd',(Math.min(sib,6)*70+(el.closest('.hero,.sr')?320:0))+'ms');
    io.observe(el);
  });

  /* 3. existing .rv blocks: stagger siblings */
  $$('.rv').forEach(function(el){
    var sib=Array.prototype.indexOf.call(el.parentNode.children,el);
    el.style.transitionDelay=Math.min(sib,5)*90+'ms';
  });

  /* 4. scroll progress */
  var bar=d.createElement('div');bar.id='mo-prog';d.body.appendChild(bar);
  var tick=false;
  function prog(){tick=false;var h=root.scrollHeight-innerHeight;bar.style.transform='scaleX('+(h>0?Math.min(1,scrollY/h):0)+')'}
  addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(prog)}},{passive:true});
  prog();

  /* 5. magnetic buttons (fine pointers only) */
  if(matchMedia('(hover:hover) and (pointer:fine)').matches){
    $$('.btn').forEach(function(b){
      b.addEventListener('mousemove',function(e){
        var r=b.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)/r.width,y=(e.clientY-r.top-r.height/2)/r.height;
        b.style.translate=(x*10).toFixed(1)+'px '+(y*8).toFixed(1)+'px';
      });
      b.addEventListener('mouseleave',function(){b.style.translate=''});
    });
  }

  /* 6. page curtain */
  if(entering){
    requestAnimationFrame(function(){requestAnimationFrame(function(){
      root.classList.remove('mo-in');root.classList.add('mo-rev');
      setTimeout(function(){root.classList.remove('mo-rev')},900);
    })});
  }
  d.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href]');
    if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    if(a.target&&a.target!=='_self')return;
    var u;try{u=new URL(a.href,location.href)}catch(x){return}
    if(u.origin!==location.origin||/^(mailto|tel):/.test(a.getAttribute('href')))return;
    if(u.pathname===location.pathname&&u.search===location.search)return;
    if(/\.(pdf|zip|png|jpe?g|webp|svg|xml|txt)$/i.test(u.pathname))return;
    e.preventDefault();
    try{sessionStorage.setItem('lzx-mo','1')}catch(x){}
    root.classList.add('mo-out');
    setTimeout(function(){location.href=u.href},560);
  });
  addEventListener('pageshow',function(e){if(e.persisted){root.classList.remove('mo-out','mo-in','mo-rev')}});
}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',ready);else ready();
})();
