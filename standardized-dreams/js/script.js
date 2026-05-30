const seriesData = {
    en: {
        title: "Standardized Dreams",
        description: "An exploration of the intersection between monumental brutalist heritage and the silent graft of global modernity.",
        audioFiles: ["audio/ENG_Emily.mp3", "audio/ENG_Liam.mp3"],
        back: "← Back to Index",
        footer: "End of Transmission — Return to Archive",
        captions: [
            { h3: "01. The Red Conquest", p: "The collision of two eras: the rigid concrete of a fallen empire crowned by the vibrant promise of global consumerism." },
            { h3: "02. Orbiting the Earthbound", p: "A retro-futurist monument reaching for a space-age destiny that stayed frozen in the blueprints of the past." },
            { h3: "03. Vertical Collective", p: "The brutalist rhythm of the masses; an imposing geometry designed for a society where the individual vanishes into the collective." },
            { h3: "04. Units of Life", p: "A tapestry of survival. Behind the standardized facade, thousands of private worlds breathe in unison." },
            { h3: "05. Signal in the Static", p: "A solitary pulse of warmth against the industrial twilight. The transition from the monumental to the existential." },
            { h3: "06. Floral Decay", p: "An unexpected encounter between organic grace and urban neglect. A fragile witness resting in the iron grid of a standardized world." },
            { h3: "07. The Floating Dream", p: "A final act of resilience. Pure, unyielding beauty surviving in the shadows of the concrete giants." }
        ]
    },
    it: {
        title: "Standardized Dreams",
        description: "Un'esplorazione del paradosso tra la rigidità delle strutture e la fluidità dei desideri umani.",
        audioFiles: ["audio/ITA_Isabella.mp3"],
        back: "← Torna all'Indice",
        footer: "Fine della Trasmissione — Ritorna all'Archivio",
        captions: [
            { h3: "01. The Red Conquest", p: "Un esempio di capitalismo trionfante sulle ceneri del blocco orientale. Il logo Coca-Cola appare come una corona aliena." },
            { h3: "02. Orbiting the Earthbound", p: "Eroismo architettonico. Un futuro che una volta è stato immaginato come grandioso." },
            { h3: "03. Vertical Collective", p: "Il monologo del cemento. Un alveare umano dove l'individuo scompare nel collettivo." },
            { h3: "04. Units of Life", p: "L'intimità urbana. Il tentativo del singolo di ritagliarsi uno spazio in una struttura omologata." },
            { h3: "05. Signal in the Static", p: "La realtà cruda del quotidiano. Il lampione solitario è la piccola resistenza del calore domestico." },
            { h3: "06. Floral Decay", p: "Scontro tra la geometria standardizzata e l'irregolarità della vita. Bellezza pura nel fango." },
            { h3: "07. The Floating Dream", p: "L'anima superstite della società. Un sogno che galleggia fuori dalle regole del cemento." }
        ]
    }
};

window.setLanguage = function(lang) {
    localStorage.setItem('preferredLang', lang);

    const data = seriesData[lang];

    document.getElementById('label-title').innerText = data.title;
    document.getElementById('label-description').innerText = data.description;
    document.getElementById('label-footer').innerText = data.footer;

    const sections = document.querySelectorAll('.photo-section');
    sections.forEach(function(section, index) {
        if (data.captions[index]) {
            section.querySelector('.cap-h').innerText = data.captions[index].h3;
            section.querySelector('.cap-p').innerText = data.captions[index].p;
        }
    });

    const audioPlayer = document.getElementById('main-audio');
    var randomAudio = data.audioFiles[Math.floor(Math.random() * data.audioFiles.length)];
    if (audioPlayer) {
        audioPlayer.src = randomAudio;
        audioPlayer.load();
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

    // Photo sections: scale + fade reveal with scrub
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

    // Advanced: scale + opacity scrub on each photo image
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

    // Caption scrub: opacity follows scroll
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
