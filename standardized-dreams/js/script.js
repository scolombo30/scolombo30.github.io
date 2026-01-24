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
    // Save selected language to localStorage
    localStorage.setItem('preferredLang', lang);

    const data = seriesData[lang];

    document.getElementById('label-title').innerText = data.title;
    document.getElementById('label-description').innerText = data.description;
    document.getElementById('label-back').innerText = data.back;
    document.getElementById('label-footer').innerText = data.footer;

    const sections = document.querySelectorAll('.photo-section');
    sections.forEach((section, index) => {
        if (data.captions[index]) {
            section.querySelector('.cap-h').innerText = data.captions[index].h3;
            section.querySelector('.cap-p').innerText = data.captions[index].p;
        }
    });

    // Random audio selection
    const audioPlayer = document.getElementById('main-audio');
    const randomAudio = data.audioFiles[Math.floor(Math.random() * data.audioFiles.length)];
    if (audioPlayer) {
        audioPlayer.src = randomAudio;
        audioPlayer.load();
    }
    
    // Button style update
    document.querySelectorAll('.language-switch button').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-${lang}`);
    if (activeBtn) activeBtn.classList.add('active');
};

window.onload = () => {
    // Check if a language is saved, otherwise use 'en' by default
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    window.setLanguage(savedLang);
};

// Registriamo il plugin per lo scroll
gsap.registerPlugin(ScrollTrigger);

// Animazione per ogni sezione fotografica
document.querySelectorAll('.photo-section').forEach((section) => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: section,
            start: "top 85%", // Inizia quando la sezione è quasi visibile
            toggleActions: "play none none reverse"
        }
    });
});

window.addEventListener('load', () => {
    const audio = document.getElementById('main-audio');
    const delay = 500; // 2 secondi di ritardo

    setTimeout(() => {
        // Proviamo a far partire l'audio
        audio.play().catch(error => {
            console.log("Autoplay bloccato dal browser. L'utente deve interagire prima.");
            // Opzionale: mostra un messaggio o cambia l'icona del player
        });
    }, delay);
});