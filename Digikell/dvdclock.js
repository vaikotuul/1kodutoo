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
    
    // Algseaded
    changeColor();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    animate();
}

// Kuula akna suuruse muutusi
window.addEventListener('resize', () => {
    updateSizes();
    posX = Math.min(posX, window.innerWidth - containerWidth);
    posY = Math.min(posY, window.innerHeight - containerHeight);
});

// Käivita rakendus
init();