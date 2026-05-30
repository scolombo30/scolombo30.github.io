const homeData = {
    en: {
        bio: "A visual archive dedicated to photographic narratives, capturing the stillness of urban landscapes and the intersections of memory.",
        sdTitle: "Standardized Dreams",
        sdDesc: "An inquiry into the soul of post-soviet concrete.",
        osTitle: "Observing Silhouettes",
        osDesc: "A diptych on time and observation. Coming soon."
    },
    it: {
        bio: "Un archivio visivo dedicato a narrazioni fotografiche, catturando l'immobilità dei paesaggi urbani e le intersezioni della memoria.",
        sdTitle: "Standardized Dreams",
        sdDesc: "Un'indagine sull'anima del cemento post-sovietico.",
        osTitle: "Observing Silhouettes",
        osDesc: "Un dittico sul tempo e l'osservazione. In arrivo."
    }
};

window.setHomeLanguage = function(lang) {
    localStorage.setItem('preferredLang', lang);
    const data = homeData[lang];

    const bio = document.getElementById('archive-bio');
    if (bio) bio.innerText = data.bio;

    const sdTitle = document.getElementById('sd-title');
    if (sdTitle) sdTitle.innerText = data.sdTitle;

    const sdDesc = document.getElementById('sd-desc');
    if (sdDesc) sdDesc.innerText = data.sdDesc;

    const osTitle = document.getElementById('os-title');
    if (osTitle) osTitle.innerText = data.osTitle;

    const osDesc = document.getElementById('os-desc');
    if (osDesc) osDesc.innerText = data.osDesc;

    document.querySelectorAll('.language-switch button').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById('btn-' + lang);
    if (activeBtn) activeBtn.classList.add('active');
};

window.onload = function() {
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    window.setHomeLanguage(savedLang);

    const yearEl = document.querySelector('.footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    gsap.registerPlugin(ScrollTrigger);

    // Hero blur reveal with stagger
    const heroReveals = document.querySelectorAll('.hero-content [data-reveal-blur]');
    if (heroReveals.length) {
        gsap.to(heroReveals, {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 1.2,
            stagger: 0.25,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    // Card index staggered reveal
    const cards = document.querySelectorAll('[data-reveal]');
    if (cards.length) {
        gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.gallery-index',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    }
};
