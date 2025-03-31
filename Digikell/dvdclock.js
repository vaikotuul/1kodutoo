// Lisasin juurde ka DVD screensaver stiilis kella - see oli mu enda esialgne idee, kuid sellele oleks olnud raske juurde lisada nõuded ning 6 erinevat funktsiooni.
// Selle kellaga oli mul kõige rohkem probleeme.
// DeepSeekile esitasin prompti "Loo lisaks funktsioon või eraldi leht, kus oleks kell vana DVD screensaveri moodi. Kell ja kuupäev põrkavad mööda ekraani, iga põrkega muutub selle värv".
// Esimesed koodid mis AI genereeris, toimisid, aga olid vigased. CSS faili jätsin esialgselt samaks.
// Proovisin erinevaid prompte, et leida oma viga üles. Laadisin isegi faili deepseeki üles, kuid ei midagi.
// Proovisin ka GitHub Copilotiga, kuid sellega tulid veel hullemad tulemused.
// Uurisin YouTube videoid ja teiste reposid. Lõpuks leidsin, et probleem oli CSS failis.
// Tegin sellele kellale uue CSS faili, ning kell hakkas normaalselt tööle.

// Esialgne probleem oli see, et kell alustas teekonda ekraanist väljas ning põrkas ka ekraanist välja.
// Pärast uut CSS faili tegin üksikud muudatused updateSizes funktsioonis. 

const container = document.querySelector('.clock-container');
const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');

// Algväärtused
let posX = 0;
let posY = 0;
let velX = 3;
let velY = 3;
let containerWidth = 0;
let containerHeight = 0;

function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    timeElement.textContent = now.toLocaleTimeString('et-EE');
    dateElement.textContent = now.toLocaleDateString('et-EE', options);
}

function updateSizes() {
    containerWidth = container.offsetWidth;
    containerHeight = container.offsetHeight;
}

function changeColor() {
    const hue = Math.random() * 360;
    timeElement.style.color = `hsl(${hue}, 100%, 50%)`;
    dateElement.style.color = `hsl(${hue}, 80%, 60%)`;
}

function checkEdges() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Korrigeeri positsiooni enne põrget
    posX = Math.max(0, Math.min(posX, screenWidth - containerWidth));
    posY = Math.max(0, Math.min(posY, screenHeight - containerHeight));

    // Põrke tuvastus
    if (posX <= 0 || posX >= screenWidth - containerWidth) {
        velX = -velX;
        changeColor();
    }
    
    if (posY <= 0 || posY >= screenHeight - containerHeight) {
        velY = -velY;
        changeColor();
    }
}

function animate() {
    updateSizes();
    checkEdges();
    
    posX += velX;
    posY += velY;
    
    container.style.transform = `translate(${posX}px, ${posY}px)`;
    requestAnimationFrame(animate);
}

function init() {
    updateSizes();
    
    // Kontrolli kas mõõtmed on loetud
    if (containerWidth === 0 || containerHeight === 0) {
        setTimeout(init, 100);
        return;
    }

    // Määra algpositsioon
    posX = Math.random() * (window.innerWidth - containerWidth);
    posY = Math.random() * (window.innerHeight - containerHeight);
    
    // Algsätted
    changeColor();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    animate();
}

// brauseri suuruse muutmise jälgimine
window.addEventListener('resize', () => {
    updateSizes();
    posX = Math.min(posX, window.innerWidth - containerWidth);
    posY = Math.min(posY, window.innerHeight - containerHeight);
});

// Käivita rakendus
init();