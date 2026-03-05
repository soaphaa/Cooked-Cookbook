const btn = document.getElementById("submit");
const u_search = document.getElementById("user_search")
const recipes = [{
    title: "Cookeroonies",
    description: "yum cooks",
    tags: ["sweet", "dessert"], source: "cookies.html"
},
{
    title: "alyn salmon", description: "spicy ahh salmon",
    tags: ["savory", "spicy"], source: "salmon.html"
}]
const reccontainer = document.getElementById("recipe-container");
const tagbtns = document.getElementById("tagbtns");
const input = document.getElementById("text");
//btn.addEventListener("click", function () {
//  const textValue = inputField.value.trim();
//});

function displayRec(filteredRecipes) {
    if (!reccontainer) return; // exits if not on the right page
    reccontainer.innerHTML = "";
    filteredRecipes.forEach(recipe => {
        const card = document.createElement("body");
        card.classList.add("recipe-card");
        
        const title = document.createElement("rh1");
        title.textContent = recipe.title;
        
        const description = document.createElement("rbody");
        description.textContent = recipe.description;
        
        const f_btn = document.createElement("a");
        f_btn.textContent = "View Recipe trust";
        f_btn.href = recipe.source;
        f_btn.classList.add("recipe-btn")
        
        card.appendChild(title);
        card.appendChild(f_btn);
        card.appendChild(description);
        
        reccontainer.appendChild(card);
    });
}


displayRec(recipes);
//main js file!
// const timerToggleBtn = document.getElementById("timer-toggle-btn");
// let timerPopup = null; //to track the popup window state

// timerToggleBtn.addEventListener("click", function() {
//     if(timerPopup && !timerPopup.closed){
//         timerPopup.focus(); //bring existing popup to front
//     } else {
    //         timerPopup = window.open(
//             "timer.html",
//             "Timer",
//             "width=300,height=200, top=100,right=100,",
//             "resizable=no"); //open new popup
//         }
//     });

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



const home = document.getElementById("home button");
if(home){
    home.innerHTML = "";
    const hbt = document.createElement("a");
    hbt.textContent = "HOMEPAGE"
    hbt.href = "index.html";
    hbt.classList.add("hbtn");
    home.appendChild(hbt); 
}
