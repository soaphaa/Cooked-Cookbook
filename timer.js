console.log("script loaded");
const toggleButton = document.getElementById("toggle-start-btn");
const resetButton = document.getElementById("reset-btn");
const timerSelect = document.getElementById("timer-select");
const display = document.getElementById("timer-display");

let isRunning = false;
let countdownInterval;
let totalSeconds = 60;
let remainingSeconds = totalSeconds;

function formatTime(seconds){
    const m = Math.floor(seconds / 60).toString().padStart(2, '0'); //seconds to minutes
    const s = (seconds % 60).toString().padStart(2, '0'); //remaining seconds
    return `${m}:${s}`; //final format MM:SS
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