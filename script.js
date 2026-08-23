const button=document.querySelector('.menu-button');const nav=document.querySelector('.nav');button?.addEventListener('click',()=>{const open=nav.classList.toggle('open');button.setAttribute('aria-expanded',open);});document.querySelectorAll('.nav a').forEach(link=>link.addEventListener('click',()=>nav.classList.remove('open')));const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(item=>observer.observe(item));


(function(){
  const rail=document.querySelector('.testimonial-rail');
  const cards=rail?Array.from(rail.querySelectorAll('.testimonial-premium')):[];
  const prev=document.querySelector('.testimonial-prev');
  const next=document.querySelector('.testimonial-next');
  const progress=document.querySelector('.testimonial-progress span');
  if(!rail||!cards.length)return;
  let active=0;
  function goTo(i){
    active=Math.max(0,Math.min(cards.length-1,i));
    cards[active].scrollIntoView({behavior:'smooth',block:'start'});
    if(progress)progress.style.width=(((active+1)/cards.length)*100)+'%';
  }
  prev&&prev.addEventListener('click',()=>goTo(active-1));
  next&&next.addEventListener('click',()=>goTo(active+1));
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const i=cards.indexOf(entry.target);
        if(i>=0){active=i;if(progress)progress.style.width=(((i+1)/cards.length)*100)+'%';}
      }
    });
  },{root:rail,threshold:.65});
  cards.forEach(card=>observer.observe(card));
})();


/* Ampersyn testimonial editorial carousel */
(function(){
  const items=[...document.querySelectorAll('.corp-quote')];
  const dots=[...document.querySelectorAll('.corp-dots button')];
  const prev=document.getElementById('testimonialPrev');
  const next=document.getElementById('testimonialNext');
  const number=document.getElementById('testimonialNumber');
  if(!items.length)return;
  let current=0;
  function show(i){
    current=(i+items.length)%items.length;
    items.forEach((item,n)=>item.classList.toggle('active',n===current));
    dots.forEach((dot,n)=>dot.classList.toggle('active',n===current));
    if(number)number.textContent=String(current+1).padStart(2,'0');
  }
  dots.forEach((dot,n)=>dot.addEventListener('click',()=>show(n)));
  prev&&prev.addEventListener('click',()=>show(current-1));
  next&&next.addEventListener('click',()=>show(current+1));
  let timer=setInterval(()=>show(current+1),7000);
  const feature=document.querySelector('.testimonial-feature');
  feature&&feature.addEventListener('mouseenter',()=>clearInterval(timer));
  feature&&feature.addEventListener('mouseleave',()=>timer=setInterval(()=>show(current+1),7000));
})();


