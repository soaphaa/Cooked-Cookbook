//main js file!
const timerToggleBtn = document.getElementById("timer-toggle-btn");
let timerPopup = null; //to track the popup window state

timerToggleBtn.addEventListener("click", function() {
    if(timerPopup && !timerPopup.closed){
        timerPopup.focus(); //bring existing popup to front
    } else {
        timerPopup = window.open(
            "timer.html",
            "Timer",
            "width=300,height=200, top=100,right=100,",
            "resizable=no"); //open new popup
        }
    });
    