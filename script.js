document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll(
        ".ingredients-list input[type=\"checkbox\"]"
    );


    const confettiBtn = document.getElementById("finish");
        confettiBtn.addEventListener("click", () => {
            confetti({
                particleCount: 2000,
                spread: 6000,
                origin: { y: 0.6 }
            })
        });


    checkboxes.forEach(cb => {
        cb.addEventListener("change", event => {
            const li = event.target.closest("li");
            if (!li) return;

            if (event.target.checked) {
                li.classList.add("crossed");
            } else {
                li.classList.remove("crossed");
            }
        });
    });

    const panel = document.getElementById("panel");

    let isDragging = false;
    let offsetX, offsetY;

    panel.addEventListener("mousedown", (e) => {
        isDragging = true;

        offsetX = e.clientX - panel.offsetLeft;
        offsetY = e.clientY - panel.offsetTop;
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        panel.style.left = (e.clientX - offsetX) + "px";
        panel.style.top = (e.clientY - offsetY) + "px";
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });

    // Open nutrition panel in a new window
    const nutritionBtn = document.getElementById("nutrition-btn");

    nutritionBtn.addEventListener("click", () => {
        window.open("nutrition.html", "nutrition_window", "width=300, height=400, resizable=no");
    });
    
});

const home = document.getElementById("home button");

if (home){
    home.innerHTML = "";
    const hbt = document.createElement("a");
    hbt.textContent = "HOMEPAGE"
    hbt.href = "index.html";
    hbt.classList.add("hbtn");
    home.appendChild(hbt);
}
const btn = document.getElementById("submit");
const u_search = document.getElementById("user_search")
const recipes = [{
    title: "Cookeroonies",
    description: "yum cooks",
    tags: ["sweet", "dessert"], 
    ingredients: ["flour", "sugar", "eggs", "chocolate chips"],
    source: "cookies.html",
    image: "images/chocolate-chip-cookie.jpeg"
},
{
    title: "alyn salmon", description: "spicy ahh salmon",
    tags: ["savory", "spicy"], source: "salmon.html",
    image: "images/salmon.jpg"
}]

const reccontainer = document.getElementById("recipe-container");
const tagbtns = document.getElementById("tagbtns");
const input = document.getElementById("text");

//btn.addEventListener("click", function () {
//  const textValue = inputField.value.trim();
//});
function displayRec(filteredRecipes){
    reccontainer.innerHTML = "";
    filteredRecipes.forEach(recipe =>{
        const card = document.createElement("body");
        card.classList.add("recipe-card");

        const title = document.createElement("rh1");
        title.textContent = recipe.title;

        const description = document.createElement("rbody");
        description.textContent = recipe.description;

        const image = document.createElement("img");
        image.src = recipe.image;
        image.alt = recipe.title + " Image";
        image.classList.add("recipe-image");

        const f_btn = document.createElement("a");
        f_btn.textContent = "View Recipe trust";
        f_btn.href = recipe.source;
        f_btn.classList.add("recipe-btn")

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(f_btn);
        card.appendChild(description);
        
        reccontainer.appendChild(card);
    })
}


displayRec(recipes);


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
  