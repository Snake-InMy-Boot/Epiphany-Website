//intro animation
const unlock = document.querySelector("section");
const blink = document.querySelector("div");
const tl = gsap.timeline( { 
  defaults: { ease: "power1.out" }, 
  onComplete: () => {
    unlock.classList.remove("locked"),
    blink.classList.add("blink");
    blink.classList.remove("arrow-down");
  }
} );

if (!sessionStorage.getItem('hasVisited')) {
  tl.to(".text", { y: "0%", duration: 1, stagger: 0.25 });
  tl.to(".slider", { y: "-150%", duration: 1.5, delay: 0.75 });
  tl.to(".intro-anim", { y: "-150%", duration: 1.5 }, "-=1.15");
  tl.fromTo("header", {opacity: 0}, {opacity: 1, duration: 1 });
  tl.fromTo("#big-text", {opacity: 0, }, {opacity: 1, duration: 1});
  tl.fromTo(".arrow-down", {opacity: 0, }, {opacity: 0.1});

  sessionStorage.setItem('hasVisited', true);
} else {
  unlock.classList.remove("locked"),
  unlock.classList.remove("anim-intro");
  tl.to(".intro-anim", { y: "-150%", duration: 0.75 }, "-=1");
  tl.fromTo("header", {opacity: 0}, {opacity: 1, duration: 0.75 });
  }

//navbar scrolled and fade in
const header = document.querySelector("header");
const sectionOne = document.querySelector(".home-intro");
const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".slide-in");

const sectionOneOptions = {
  rootMargin: "-100px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function(
  entries,
  sectionOneObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      header.classList.add("nav-scrolled"),
      blink.classList.remove("blink");
    } else {
      header.classList.remove("nav-scrolled");
    }
  });
},
sectionOneOptions);

sectionOneObserver.observe(sectionOne);

const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -250px 0px"
};

const appearOnScroll = new IntersectionObserver(function(
  entries,
  appearOnScroll
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

sliders.forEach(slider => {
  appearOnScroll.observe(slider);
});


window.addEventListener('beforeunload',(event) =>{
  header.classList.remove("nav-scrolled"),
  window.scrollTo(0, 0);
});

