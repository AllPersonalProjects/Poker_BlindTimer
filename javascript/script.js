const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let currentLevel = 1;
let smallBlinds = [100, 100, 200, 200, 300, 400, 500, 600, 800, 1000, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000, 10000, 10000, 10000, 15000, 20000, 25000, 30000, 40000, 50000, 60000, 80000, 100000];
let bigBlinds = [200, 300, 400, 500, 600, 800, 1000, 1200, 1600, 2000, 2500, 3000, 4000, 5000, 6000, 8000, 10000, 12000, 15000, 20000, 25000, 30000, 40000, 50000, 60000, 80000, 100000, 120000, 160000, 200000];
let antes = [200, 300, 400, 500, 600, 800, 1000, 1200, 1600, 2000, 2500, 3000, 4000, 5000, 6000, 8000, 10000, 12000, 15000, 20000, 25000, 30000, 40000, 50000, 60000, 80000, 100000, 120000, 160000, 200000];
// levels:            L1    L2   L3   L4   L5   L6   L7    L8    L9    L10   L11   L12   L13   L14   L15   L16   L17    L18    L19    L20    L21    L22    L23    L24    L25    L26    L27     L28     L29     L30
// Want to estimate levels for a tournament?
// Use the formula (time * Lx)
//      --> 30min * L5 = 150min -->
//      --> 150/60 = 2.5h -->
//      --> It takes 2.5 to complete 5 levels at 30 min.
let levelTimeImported = urlParams.has('levelTime') ? parseInt(urlParams.get('levelTime')) : 20; // Default level time is 20 minutes
let breakTimeImported = urlParams.has('breakTime') ? parseInt(urlParams.get('breakTime')) : 0; // Default break time is 0 minutes
let originalTime = levelTimeImported * 60; // 20 minutes in seconds
let breakTime = breakTimeImported * 60; // 5 minutes in seconds
let remainingTime = originalTime;
let timerDisplay = document.getElementById('timerDisplay');
let currentLevelDisplay = document.getElementById('currentLevel');
let currentSmallBlindDisplay = document.getElementById('currentSmallBlind');
let currentBigBlindDisplay = document.getElementById('currentBigBlind');
let currentAnteDisplay = document.getElementById('currentAnte');
let upcomingLevelDisplay = document.getElementById('upcomingLevel');
let upcomingSmallBlindDisplay = document.getElementById('upcomingSmallBlind');
let upcomingBigBlindDisplay = document.getElementById('upcomingBigBlind');
let upcomingAnteDisplay = document.getElementById('upcomingAnte');
let breakMessageDisplay = document.getElementById('breakMessage');
let levelSwitchSound = new Audio('../sounds/zapsplat_sport_air_horn_soccer_blast_tune_21154.mp3'); // Replace with the actual path to your sound file
let breakOverSound = new Audio('sounds/Of cource i lied.m4a');

let timer;

function startTimer() {
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

let breakStarted = false;

function updateTimer() {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;

    if (minutes === 0 && seconds === 0) {
        if (currentLevel % 4 === 0 && !breakStarted) {
            startBreakTimer();
            breakStarted = true;
        } else {
            currentLevel++;
            updateLevels();
            remainingTime = originalTime;
            startTimer();
            breakStarted = false;
        }
    } else {
        if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }

        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        remainingTime--;
    }
}

function updateLevels() {
    currentLevelDisplay.textContent = `Level ${currentLevel}`;
    upcomingLevelDisplay.textContent = `Neste level`;

    levelSwitchSound.play();

    currentSmallBlindDisplay.innerHTML = smallBlinds[currentLevel - 1] + "&nbsp;";
    currentBigBlindDisplay.innerHTML = bigBlinds[currentLevel - 1] + "&nbsp;";
    currentAnteDisplay.textContent = antes[currentLevel - 1];

    upcomingSmallBlindDisplay.innerHTML = smallBlinds[currentLevel] + "&nbsp;";
    upcomingBigBlindDisplay.innerHTML = bigBlinds[currentLevel] + "&nbsp;";
    upcomingAnteDisplay.textContent = antes[currentLevel];
}

function startBreakTimer() {
    clearInterval(timer);
    remainingTime = breakTime;
    timer = setInterval(updateBreakTimer, 1000);
    //breakOverSound.play(); // Add this line to play the breakOverSound
}

function updateBreakTimer() {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;

    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        breakMessageDisplay.textContent = '';

        // If the break is over, start the timer for the current level
        startTimer();
    } else {
        if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }

        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        remainingTime--;

        // Display break message
        breakMessageDisplay.textContent = `break time`;
    }
}
function stopTimer() {
    clearInterval(timer);
}

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('stopButton').addEventListener('click', stopTimer);
document.getElementById('backButton').addEventListener('click', function() {
    // Redirect to the front page
    window.location.href = 'front_page.html';
});
