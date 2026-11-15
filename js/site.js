(function(){
  var d=document, root=d.documentElement;
  // 表示の動き
  var els=d.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('is-in')})}
  else{
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('is-in');io.unobserve(x.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(e){io.observe(e)});
  }
  // メニュー
  var hd=d.querySelector('.hd'), btn=d.querySelector('.menu-btn');
  function setOpen(o){hd.classList.toggle('nav-open',o);btn.setAttribute('aria-expanded',o?'true':'false');btn.setAttribute('aria-label',o?'メニューを閉じる':'メニューを開く')}
  if(hd&&btn){
    btn.addEventListener('click',function(){setOpen(!hd.classList.contains('nav-open'))});
    hd.querySelectorAll('.gnav a').forEach(function(a){a.addEventListener('click',function(){setOpen(false)})});
    d.addEventListener('keydown',function(e){if(e.key==='Escape'){setOpen(false)}});
    d.addEventListener('click',function(e){if(hd.classList.contains('nav-open')&&!hd.contains(e.target)){setOpen(false)}});
  }
  // 図の切り替え
  var dg=d.getElementById('diagram');
  if(dg){
    var bs=[].slice.call(dg.querySelectorAll('.dg-seg button')), lab=dg.querySelector('.dg-pri-t'), touched=false;
    var setView=function(v){
      var after=v==='after';
      dg.classList.toggle('is-after',after);
      bs.forEach(function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-v')===v))});
      lab.textContent=after?'足りない分':'内容を知らずに入った保険';
    };
    bs.forEach(function(b){b.addEventListener('click',function(){touched=true;setView(b.getAttribute('data-v'))})});
    var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
    if('IntersectionObserver' in window&&!reduce){
      var once=new IntersectionObserver(function(es){es.forEach(function(e){
        if(e.isIntersecting){once.disconnect();setTimeout(function(){if(!touched){setView('after')}},2200)}
      })},{threshold:.6});
      once.observe(dg);
    }
  }
  // ページを開いたときは先頭から
  try{history.scrollRestoration='manual'}catch(e){}
  addEventListener('pageshow',function(){if(!location.hash){scrollTo(0,0)}});
})();
