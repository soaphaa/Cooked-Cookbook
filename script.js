//main js file!
console.log("script loaded");
const toggleButton = document.getElementById("toggle-start-btn");
let isRunning = false;

function startTimer(){
 console.log("Timer started");
 toggleButton.textContent = 'Stop';
 isRunning = true; 
 toggleButton.classList.remove('start');
 toggleButton.classList.add('stop');
}

function stopTimer(){
    console.log("Timer stopped");
    isRunning = false;
    toggleButton.textContent = 'Start';
    toggleButton.classList.remove('stop');
    toggleButton.classList.add('start');
}


toggleButton.addEventListener("click", function() {
    if (isRunning === false) {
        startTimer();
    } else {
        stopTimer();
    }
});