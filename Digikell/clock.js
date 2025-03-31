// Kõigepealt andsin DeepSeek-ile aine taustainfo koos ülesande kirjelduse ja nõuetega.
// "Mul on vaja aines Eesrakenduste arendamine (Õppeaine eesmärgid - Luua eeldused veebirakenduste kaasaegsete kasutajaliideste koostamise oskuse saavutamiseks.) teha ülesanne. 
// Kujunda elektroonilise kella näide vastavalt maitsele või kindlale teemale, mahutades kella täisekraanile, et saaks kasutada lauakella või ekraanisäästja asemel." *edasi järgnesid ülesande nõuded*
// Selle peale genereeris AI kohe koodi, mis oli ühes HTML failis.
// Kood oli esialgselt juba päris hea. Mõned asjad vajasid muutmist (nt fontide muutmine, fontide valik, interaktsioonid. CSS-is hover meetodid nuppudele) 
// Kommentaarid lisasin ise.


// Algsätted
let currentFontSize = 1;
const fonts = ['Orbitron', 'Open Sans', 'Roboto Mono', 'Courier New', 'Arial'];
let currentFontIndex = 0;
let is24HourFormat = true;
let position = { x: 0, y: 0 };

// Elementide valik
const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');

// Kuupäeva ja kella uuendamine
function updateDateTime() {
    const now = new Date();
    const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    dateElement.textContent = now.toLocaleDateString('et-EE', dateOptions);
    
    let hours = now.getHours();
    if (!is24HourFormat && hours > 12) hours -= 12;
    timeElement.textContent = `${hours.toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
}

// Suuruse muutmine
document.getElementById('sizeUp').addEventListener('click', () => {
    currentFontSize *= 1.1;
    timeElement.style.fontSize = `${currentFontSize}em`;
});

document.getElementById('sizeDown').addEventListener('click', () => {
    currentFontSize *= 0.9;
    timeElement.style.fontSize = `${currentFontSize}em`;
});

// Fondi muutmine
document.getElementById('changeFont').addEventListener('click', () => {
    currentFontIndex = (currentFontIndex + 1) % fonts.length;
    timeElement.style.fontFamily = fonts[currentFontIndex];
    dateElement.style.fontFamily = fonts[currentFontIndex];
});

// Formaadi muutmine
document.getElementById('toggleFormat').addEventListener('click', () => {
    is24HourFormat = !is24HourFormat;
    updateDateTime();
});

// Interaktsioonid
document.body.addEventListener('click', (e) => {
    if (e.target === document.body) {
        document.body.style.background = `hsl(${Math.random() * 360}, 50%, 15%)`;
    }
});

timeElement.addEventListener('click', () => {
    timeElement.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
});

document.addEventListener('keydown', (e) => {
    const speed = 20;
    switch(e.key) {
        case 'ArrowUp': position.y -= speed; break;
        case 'ArrowDown': position.y += speed; break;
        case 'ArrowLeft': position.x -= speed; break;
        case 'ArrowRight': position.x += speed; break;
    }
    document.querySelector('.clock-container').style.transform = 
        `translate(${position.x}px, ${position.y}px)`;
});

// Käivitamine
setInterval(updateDateTime, 1000);
updateDateTime();