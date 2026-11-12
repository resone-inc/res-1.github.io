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
  // ページを開いたときは先頭から
  try{history.scrollRestoration='manual'}catch(e){}
  addEventListener('pageshow',function(){if(!location.hash){scrollTo(0,0)}});
})();
