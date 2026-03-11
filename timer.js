console.log("timer loaded");
const toggleButton = document.getElementById("toggle-start-btn");
const resetButton = document.getElementById("reset-btn");
const timerSelect = document.getElementById("timer-select");
const display = document.getElementById("timer-display");
const ring = document.getElementById("ring");
const card = document.getElementById("timer-card");
const timerWindow = document.getElementById("timer");
const timerToggleBtn = document.getElementById("timer-toggle-btn");

const CIRCUMFERENCE = 2 * Math.PI * 25;

let isRunning = false;
let countdownInterval;
let totalSeconds = 60;
let remainingSeconds = totalSeconds;

function formatTime(seconds){
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

function updateRing(){
    ring.style.strokeDashoffset = CIRCUMFERENCE * (1 - remainingSeconds / totalSeconds);
}

function setLow(low){
    display.classList.toggle('low', low);
    ring.classList.toggle('low', low);
}

function startTimer(){
    console.log("Timer started");
    toggleButton.textContent = 'Stop';
    isRunning = true;
    toggleButton.classList.remove('start');
    toggleButton.classList.add('stop');
    countdownInterval = setInterval(function() {
        remainingSeconds--;
        display.textContent = formatTime(remainingSeconds);
        updateRing();
        setLow(remainingSeconds <= 10);
        if (remainingSeconds <= 0){
            clearInterval(countdownInterval);
            isRunning = false;
            toggleButton.textContent = 'Start';
            toggleButton.classList.remove('stop');
            toggleButton.classList.add('start');
            console.log("Timer finished");
        }
    }, 1000);
}

function stopTimer(){
    console.log("Timer stopped");
    isRunning = false;
    clearInterval(countdownInterval);
    toggleButton.textContent = 'Start';
    toggleButton.classList.remove('stop');
    toggleButton.classList.add('start');
}

function resetTimer(){
    console.log("Timer reset");
    stopTimer();
    remainingSeconds = totalSeconds;
    ring.style.strokeDashoffset = 0;
    setLow(false);
    display.textContent = formatTime(remainingSeconds);
}

toggleButton.addEventListener("click", function() {
    if (isRunning === false) { startTimer(); } else { stopTimer(); }
});

resetButton.addEventListener("click", resetTimer);

timerSelect.addEventListener("change", function() {
    totalSeconds = parseInt(timerSelect.value);
    resetTimer();
    display.textContent = formatTime(totalSeconds);
});

// toggle show/hide the timer overlay
timerToggleBtn.addEventListener("click", function() {
    timerWindow.classList.toggle("hidden");
});