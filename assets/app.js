/* ==========================================================================
   株式会社禄 コーポレートサイト 共通スクリプト
   - GSAP標準構成は hp-mock-factory/_template/gsap-animations.md §5 の canonical コードをそのまま使用
   - fail-closed to visible: GSAP/CDN が落ちてもコンテンツは既定で見える（CSSで事前に隠さない）
   ========================================================================== */

/* ---------- opening intro（GSAPに依存しない・CDNが死んでも必ず開く） ---------- */
(function(){
  var intro = document.querySelector('.intro');
  if (!intro) return;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(function(){ intro.classList.add('done'); }, reduce ? 10 : 1300);
})();

/* ---------- header scrolled / nav toggle ---------- */
(function(){
  var header = document.querySelector('header');
  if (header){
    var onScroll = function(){ header.classList.toggle('scrolled', scrollY > 40); };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
  }

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav){
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }
})();

/* ---------- GSAP 標準構成（_template/gsap-animations.md §5 canonical） ---------- */
(function(){
  /* MODULE: fail-closed guard — GSAP/ScrollTriggerが読めなければ何もしない（コンテンツは既定で見える） */
  if (!(window.gsap && window.ScrollTrigger)) return;
  var hasSplit = !!window.SplitText;
  gsap.registerPlugin.apply(gsap, hasSplit ? [ScrollTrigger, SplitText] : [ScrollTrigger]);

  var mm = gsap.matchMedia();

  /* MODULE: reduced-motion — 全要素即時表示、ScrollTriggerは作らない */
  mm.add('(prefers-reduced-motion: reduce)', function(){
    gsap.set('[data-anim],[data-stagger] > *', { clearProps:'transform', autoAlpha:1, y:0, scale:1, clipPath:'none' });
  });

  /* MODULE: motion-safe — reveal / stagger / split */
  mm.add('(prefers-reduced-motion: no-preference)', function(){

    /* MODULE: reveal (data-anim, data-stagger を持たない単体要素) */
    document.querySelectorAll('[data-anim]:not([data-stagger])').forEach(function(el){
      var type = el.dataset.anim || 'fade-up';
      var dur = parseFloat(el.dataset.dur) || 0.9;
      var delay = parseFloat(el.dataset.delay) || 0;
      var from = { autoAlpha: 0 };
      var to = { autoAlpha: 1, duration: dur, delay: delay, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onComplete: function(){ gsap.set(el, { clearProps: 'transform' }); } };
      if (type === 'fade-up'){ from.y = 28; to.y = 0; }
      if (type === 'scale-in'){ from.scale = 0.92; to.scale = 1; }
      if (type === 'clip-y'){ from.clipPath = 'inset(100% 0 0 0)'; to.clipPath = 'inset(0% 0 0 0)'; }
      gsap.set(el, from);
      gsap.to(el, to);
    });

    /* MODULE: stagger (data-stagger を持つ親の直下の子を時差reveal) */
    document.querySelectorAll('[data-stagger]').forEach(function(parent){
      var children = [].slice.call(parent.children);
      var st = parseFloat(parent.dataset.stagger) || 0.08;
      var type = parent.dataset.anim || 'fade-up';
      var from = { autoAlpha: 0 };
      if (type === 'fade-up') from.y = 24;
      if (type === 'scale-in') from.scale = 0.94;
      gsap.set(children, from);
      gsap.to(children, {
        autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', stagger: st,
        scrollTrigger: { trigger: parent, start: 'top 88%', once: true },
        onComplete: function(){ gsap.set(children, { clearProps: 'transform' }); }
      });
    });

    /* MODULE: split text (data-split, SplitTextが読めた場合のみ) */
    if (hasSplit){
      document.querySelectorAll('[data-split]').forEach(function(el){
        var type = el.dataset.split === 'chars' ? 'chars' : 'words';
        var split = new SplitText(el, { type: type });
        var targets = type === 'chars' ? split.chars : split.words;
        var st = type === 'chars' ? 0.02 : 0.04;
        gsap.set(targets, { autoAlpha: 0, y: 16 });
        gsap.to(targets, {
          autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: st,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      });
    }
  });

  /* MODULE: desktop-only — parallax / pin（reduced-motionでもcoarse/狭幅でも無効） */
  mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine) and (min-width: 768px)', function(){

    /* MODULE: parallax (data-speed) */
    document.querySelectorAll('[data-speed]').forEach(function(el){
      var speed = parseFloat(el.dataset.speed) || 1;
      gsap.to(el, {
        y: function(){ return (1 - speed) * innerHeight * 0.5; },
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true }
      });
    });

    /* MODULE: pin (data-pin, 1ページ1箇所目安) */
    document.querySelectorAll('[data-pin]').forEach(function(el){
      ScrollTrigger.create({ trigger: el, start: 'top top', end: 'bottom top', pin: true, pinSpacing: true });
    });
  });

  /* MODULE: progress bar (#progress) */
  var progress = document.getElementById('progress');
  if (progress){
    gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' });
    gsap.to(progress, {
      scaleX: 1, ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: true }
    });
  }

  /* MODULE: 堅牢性 — load時とimage load debounceでrefresh */
  addEventListener('load', function(){ ScrollTrigger.refresh(); });
  var imgTimer;
  document.querySelectorAll('img').forEach(function(img){
    if (img.complete) return;
    img.addEventListener('load', function(){
      clearTimeout(imgTimer);
      imgTimer = setTimeout(function(){ ScrollTrigger.refresh(); }, 150);
    }, { once: true });
  });
})();
