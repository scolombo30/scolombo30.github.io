const homeData = {
    en: {
        bio: "Visual explorations of brutalist landscapes, urban nostalgia, and silent peripheries.",
        sdTitle: "Standardized Dreams",
        sdDesc: "An inquiry into the soul of post-soviet concrete.",
        osTitle: "Observing Silhouettes",
        osDesc: "A diptych on time and observation. Coming soon."
    },
    it: {
        bio: "Esplorazioni visive di paesaggi brutalisti, nostalgia urbana e periferie silenziose.",
        sdTitle: "Standardized Dreams",
        sdDesc: "Un'indagine sull'anima del cemento post-sovietico.",
        osTitle: "Observing Silhouettes",
        osDesc: "Un dittico sul tempo e l'osservazione. In arrivo."
    }
};

window.setHomeLanguage = function(lang) {
    localStorage.setItem('preferredLang', lang);
    const data = homeData[lang];

    if(document.getElementById('archive-bio')) {
        document.getElementById('archive-bio').innerText = data.bio;
    }

    if(document.getElementById('sd-title')) {
        document.getElementById('sd-title').innerText = data.sdTitle;
    }
    if(document.getElementById('sd-desc')) {
        document.getElementById('sd-desc').innerText = data.sdDesc;
    }

    if(document.getElementById('os-title')) {
        document.getElementById('os-title').innerText = data.osTitle;
    }
    if(document.getElementById('os-desc')) {
        document.getElementById('os-desc').innerText = data.osDesc;
    }

    document.body.classList.add('loaded');
    
    document.querySelectorAll('.language-switch button').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-${lang}`);
    if (activeBtn) activeBtn.classList.add('active');
};

window.onload = () => {
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    window.setHomeLanguage(savedLang);
};