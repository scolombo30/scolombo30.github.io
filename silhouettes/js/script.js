const seriesData = {
    en: {
        seriesTitle: "Observing Silhouettes",
        seriesDesc: "A diptych on time, observation, and the traces of human presence.",
        t1: "The Infinite Detour",
        p1: "The observer becomes the observed in a loop of urban mirrors.",
        t2: "Twin Stars, Silent Hearts",
        p2: "Vanishing points in a static world, where distance defines the soul.",
        audioLabel: "Voice Transmission",
        footer: "End of Transmission — Return to Archive",
    },
    it: {
        seriesTitle: "Observing Silhouettes",
        seriesDesc: "Un dittico sul tempo, l'osservazione e le tracce della presenza umana.",
        t1: "La Deviazione Infinita",
        p1: "L'osservatore diventa l'osservato in un loop di specchi urbani.",
        t2: "Stelle Gemelle, Cuori Silenziosi",
        p2: "Punti di fuga in un mondo statico, dove la distanza definisce l'anima.",
        audioLabel: "Trasmissione Vocale",
        footer: "Fine della Trasmissione — Ritorna all'Archivio",
    }
};

window.setLanguage = function(lang) {
    localStorage.setItem('preferredLang', lang);
    const data = seriesData[lang];

    document.getElementById('series-title').innerText = data.seriesTitle;
    document.getElementById('series-desc').innerText = data.seriesDesc;

    document.getElementById('title-1').innerText = data.t1;
    document.getElementById('desc-1').innerText = data.p1;

    document.getElementById('title-2').innerText = data.t2;
    document.getElementById('desc-2').innerText = data.p2;

    document.getElementById('label-footer').innerText = data.footer;

    var labelAudio = document.getElementById('label-transmission');
    if (labelAudio) labelAudio.innerText = data.audioLabel;

    var audio = document.getElementById('main-audio');
    if (audio) {
        audio.src = 'audio/' + lang + '_observing_silhouettes.mp3';
        audio.load();
    }

    document.querySelectorAll('.language-switch button').forEach(function(b) { b.classList.remove('active'); });
    var activeBtn = document.getElementById('btn-' + lang);
    if (activeBtn) activeBtn.classList.add('active');
};

window.onload = function() {
    var savedLang = localStorage.getItem('preferredLang') || 'en';
    window.setLanguage(savedLang);

    var yearEl = document.querySelector('.footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    gsap.registerPlugin(ScrollTrigger);

    // Series header blur reveal
    var headerReveals = document.querySelectorAll('[data-reveal-blur]');
    if (headerReveals.length) {
        gsap.to(headerReveals, {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.series-header',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    // Photo sections: scale + fade reveal
    var photoSections = document.querySelectorAll('[data-reveal-scale]');
    if (photoSections.length) {
        photoSections.forEach(function(section) {
            gsap.to(section, {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }

    // Advanced: image filter + scale scrub
    photoSections.forEach(function(section) {
        var img = section.querySelector('img');
        if (!img) return;
        gsap.fromTo(img,
            { filter: 'grayscale(100%) brightness(0.4) contrast(1.1)', scale: 0.9 },
            {
                filter: 'grayscale(0%) brightness(1) contrast(1)',
                scale: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'center center',
                    scrub: 1.5
                }
            }
        );
    });

    // Caption scrub
    photoSections.forEach(function(section) {
        var caption = section.querySelector('.caption');
        if (!caption) return;
        gsap.fromTo(caption,
            { opacity: 0, y: 15 },
            {
                opacity: 1,
                y: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    end: 'center 60%',
                    scrub: 1.2
                }
            }
        );
    });
};

window.addEventListener('load', function() {
    var audio = document.getElementById('main-audio');
    if (!audio) return;
    setTimeout(function() {
        audio.play().catch(function() {
            console.log("Autoplay blocked by browser. User interaction required.");
        });
    }, 500);
});
