const button=document.querySelector('.menu-button');
const nav=document.querySelector('.nav');

button?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  button.setAttribute('aria-expanded',String(open));
});

document.querySelectorAll('.nav a').forEach(link=>link.addEventListener('click',()=>{
  nav?.classList.remove('open');
  button?.setAttribute('aria-expanded','false');
}));

document.querySelectorAll('a[href="#top"]').forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();
  window.scrollTo({top:0,behavior:'smooth'});
  history.replaceState(null,'',window.location.pathname+window.location.search);
}));

const revealItems=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
  }),{threshold:.12});
  revealItems.forEach(item=>observer.observe(item));
}else{
  revealItems.forEach(item=>item.classList.add('visible'));
}
