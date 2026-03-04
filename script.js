//main js file!
const timerToggleBtn = document.getElementById("timer-toggle-btn");
const timerWindow = document.getElementById("timer");
const timerMinimizeBtn = document.getElementById("timer-minimize-btn");
let timerPopup = null; //to track the popup window state

timerToggleBtn.addEventListener("click", function() {
    if(timerPopup && !timerPopup.closed){
        timerPopup.focus(); //bring existing popup to front
    } else {
        timerPopup = window.open("timer.html", "Timer", "width=300,height=200"); //open new popup
    }
    // timerWindow.classList.toggle("hidden");
});

timerMinimizeBtn.addEventListener("click", function() {
    timerWindow.classList.add("hidden");
});