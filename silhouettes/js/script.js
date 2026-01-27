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
    
    const labelAudio = document.getElementById('label-transmission');
    if (labelAudio) labelAudio.innerText = data.audioLabel;

    const audio = document.getElementById('main-audio');
    if (audio) {
        audio.src = `audio/${lang}_observing_silhouettes.mp3`;
        audio.load();
    }

    document.querySelectorAll('.language-switch button').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-${lang}`).classList.add('active');
};

window.onload = () => {
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    window.setLanguage(savedLang);
    
    if (document.querySelector('.footer-year')) {
        document.querySelector('.footer-year').textContent = new Date().getFullYear();
    }
};

window.addEventListener('load', () => {
    const audio = document.getElementById('main-audio');
    const delay = 500;

    setTimeout(() => {
        audio.play().catch(error => {
            console.log("Autoplay bloccato dal browser. L'utente deve interagire prima.");
        });
    }, delay);
});