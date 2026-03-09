document.addEventListener("DOMContentLoaded", () => {
    const timerToggleBtn = document.getElementById("timer-toggle-btn");
    if (!timerToggleBtn) {
        console.log("timer-toggle-btn not found on this page");
        return;
    }

    let timerPopup = null;
    timerToggleBtn.addEventListener("click", () => {
        console.log("Timer toggle button clicked");
        timerPopup = window.open("timer.html", "Timer", "width=300,height=200,resizable=no");
    });
});
    

console.log("script loaded");
const toggleButton = document.getElementById("toggle-start-btn");
const resetButton = document.getElementById("reset-btn");
const timerSelect = document.getElementById("timer-select");
const display = document.getElementById("timer-display");
const ring = document.getElementById("ring");
const card = document.getElementById("timer-card");

const CIRCUMFERENCE = 2 * Math.PI * 25; //circumference of the ring (2πr, where r is the radius of the circle)

let isRunning = false;
let countdownInterval;
let totalSeconds = 60;
let remainingSeconds = totalSeconds;

function formatTime(seconds){
    const m = Math.floor(seconds / 60).toString().padStart(2, '0'); //seconds to minutes
    const s = (seconds % 60).toString().padStart(2, '0'); //remaining seconds
    return `${m}:${s}`; //final format MM:SS
}

function updateRing(){
    ring.style.strokeDashoffset = CIRCUMFERENCE * (1 - remainingSeconds / totalSeconds); //updates the ring's stroke dash offset based on the remaining time
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
        setLow(remainingSeconds <= 10); //change color to red when 10 seconds or less remain
        
        if (remainingSeconds <= 0){
            clearInterval(countdownInterval);
            isRunning = false; //timer stopped
            toggleButton.textContent = 'Start'; //reset display on button
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
    ring.style.strokeDashoffset = 0; //reset ring to nothing
    setLow(false); //reset color
    display.textContent = formatTime(remainingSeconds);
}

toggleButton.addEventListener("click", function() {
    if (isRunning === false) {
        startTimer();
    } else {
        stopTimer();
    }
});

resetButton.addEventListener("click", resetTimer);

timerSelect.addEventListener("change", function() {
    totalSeconds = parseInt(timerSelect.value); //will give selection to the user of 1,2,3,.etc mins
    resetTimer(); //reset timer to new selection
    display.textContent = formatTime(totalSeconds); //update display
});