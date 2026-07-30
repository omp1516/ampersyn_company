// ======================================
// AMPERSYN MAIN JS
// ======================================

// Sticky Header Shadow
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (!header) return;

    if (window.scrollY > 50) {
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.12)";
    } else {
        header.style.boxShadow = "0 2px 18px rgba(0,0,0,.05)";
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// Counter Animation
const counters = document.querySelectorAll(".counter");

const runCounter = () => {

    counters.forEach(counter => {

        const target = +counter.dataset.target;

        let current = 0;

        const increment = Math.max(1, target / 100);

        const update = () => {

            current += increment;

            if (current < target) {

                counter.innerText = Math.floor(current);

                requestAnimationFrame(update);

            } else {

                counter.innerText = target;

            }

        };

        update();

    });

};

const statSection = document.querySelector(".statistics");

if (statSection) {

    const observer = new IntersectionObserver(entries => {

        if (entries[0].isIntersecting) {

            runCounter();

            observer.disconnect();

        }

    });

    observer.observe(statSection);

}

// Reveal Animation
const revealItems = document.querySelectorAll(
".service-card,.industry-card,.why-card,.case-card,.about-card,.testimonial-card,.timeline-item,.technology-grid div,.ai-card");

const revealObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0)";
revealObserver.unobserve(entry.target);

}

});

},{
threshold:0.15
});

revealItems.forEach(item=>{

item.style.opacity="0";
item.style.transform="translateY(40px)";
item.style.transition="all .8s ease";

revealObserver.observe(item);

});

// Button Ripple
document.querySelectorAll(".btn,.primary-btn").forEach(btn=>{

btn.addEventListener("click",function(e){

const circle=document.createElement("span");

const diameter=Math.max(this.clientWidth,this.clientHeight);

circle.style.width=circle.style.height=`${diameter}px`;

circle.style.left=`${e.offsetX-diameter/2}px`;

circle.style.top=`${e.offsetY-diameter/2}px`;

circle.style.position="absolute";
circle.style.borderRadius="50%";
circle.style.background="rgba(255,255,255,.35)";
circle.style.transform="scale(0)";
circle.style.animation="ripple .6s linear";
circle.style.pointerEvents="none";

this.style.position="relative";
this.style.overflow="hidden";

this.appendChild(circle);

setTimeout(()=>circle.remove(),600);

});

});

// Contact Form
const form = document.querySelector("form");

if(form){

form.addEventListener("submit",(e)=>{

e.preventDefault();

alert("Thank you for contacting Ampersyn! We will get back to you shortly.");

form.reset();

});

}
