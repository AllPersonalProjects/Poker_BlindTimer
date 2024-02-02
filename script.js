let currentLevel = 1;
let smallBlinds = [100, 100, 200, 200, 300, 400, 500, 600, 800, 1000, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000, 10000, 10000, 10000, 15000, 20000, 25000, 30000, 40000, 50000, 60000, 80000, 100000];
let bigBlinds = [200, 300, 400, 500, 600, 800, 1000, 1200, 1600, 2000, 2500, 3000, 4000, 5000, 6000, 8000, 10000, 12000, 15000, 20000, 25000, 30000, 40000, 50000, 60000, 80000, 100000, 120000, 160000, 200000];
let antes = [200, 300, 400, 500, 600, 800, 1000, 1200, 1600, 2000, 2500, 3000, 4000, 5000, 6000, 8000, 10000, 12000, 15000, 20000, 25000, 30000, 40000, 50000, 60000, 80000, 100000, 120000, 160000, 200000];
let originalTime = 2; // 20 minutes in seconds
let breakTime = 2; // 5 minutes in seconds
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
let levelSwitchSound = new Audio('sounds/zapsplat_bells_buddhist_chime_ring_004_48484.mp3'); // Replace with the actual path to your sound file
let breakOverSound = new Audio('sounds/zapsplat_bells_buddhist_chime_ring_004_48484.mp3');

let timer;

function startTimer() {
    clearInterval(timer); // Clear any existing interval to ensure a fresh start
    remainingTime = originalTime; // Reset remaining time to the original time
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;

    if (minutes === 0 && seconds === 0) {
        currentLevel++;
        updateLevels();
        remainingTime = originalTime; // Reset remaining time to the original time

        // Check if the current level is a multiple of 4
        if (currentLevel % 4 === 0) {
            startBreakTimer();
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
    currentLevelDisplay.textContent = `Nåværnde nivå: ${currentLevel}`;
    upcomingLevelDisplay.textContent = `Neste nivå: ${currentLevel + 1}`;

    // Play sound when level switches
    levelSwitchSound.play();

    // Update current blinds
    currentSmallBlindDisplay.textContent = smallBlinds[currentLevel - 1];
    currentBigBlindDisplay.textContent = bigBlinds[currentLevel - 1];
    currentAnteDisplay.textContent = antes[currentLevel - 1];

    // Update upcoming blinds
    upcomingSmallBlindDisplay.textContent = smallBlinds[currentLevel];
    upcomingBigBlindDisplay.textContent = bigBlinds[currentLevel];
    upcomingAnteDisplay.textContent = antes[currentLevel];
}

function startBreakTimer() {
    clearInterval(timer); // Clear the level timer
    remainingTime = breakTime; // Set remaining time to the break time
    timer = setInterval(updateBreakTimer, 1000);
}

function updateBreakTimer() {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;

    if (minutes === 0 && seconds === 0) {
        // Break time is over, start the next level
        clearInterval(timer);
        breakMessageDisplay.textContent = ''; // Clear break message
        breakOverSound.play();
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
        breakMessageDisplay.textContent = `5 min break time`;
    }
}


function stopTimer() {
    clearInterval(timer);
}

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('stopButton').addEventListener('click', stopTimer);
