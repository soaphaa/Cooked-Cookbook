const btn = document.getElementById("submit");
const u_search = document.getElementById("user_search")
const recipes = [{
    title: "Cookeroonies",
    description: "bocolate bip bookies: brown sugar, white sugar, bocolate bips, flour, egg, malk, baking boda, baking bowder",
    tags: ["sweet", "dessert"], source: "cookies.html"
},
{
    title: "alyn salmon",
    description: "spicy ahh salmon: gochugang, mirin, soy sauce, salmon, sesame oil, sugar",
    tags: ["savory", "spicy"], source: "salmon.html"
}]
const reccontainer = document.getElementById("recipe-container");
const tagbtns = document.getElementById("tagbtns");
const input = document.getElementById("text");

const home = document.getElementById("home button");



btn.addEventListener("click", function () {
//take value from the search bar
    if (!reccontainer) return;
    reccontainer.innerHTML = "";
    const textValue = u_search.value.trim();
    recipes.forEach(recipe =>{
        if ((recipe.description.toLowerCase().includes(textValue.toLowerCase()))){
            const card = document.createElement("body");
            const title = document.createElement("rh1");
            const description = document.createElement("rbody");

            card.classList.add("recipe-card");
            title.textContent = recipe.title;
            description.textContent = recipe.description;
            const f_btn = document.createElement("a");

            f_btn.textContent = "View Recipe trust";
            f_btn.href = recipe.source;
            f_btn.classList.add("recipe-btn")

            card.appendChild(title);
            card.appendChild(f_btn);
            card.appendChild(description);
            
            reccontainer.appendChild(card);
        }
        else{
            const notfound = document.createElement("rh1");
            reccontainer.appendChild(notfound);
        }
        
     })
});


if (home){
    home.innerHTML ="";
    const hbt = document.createElement("a");
    home.innerHTML = "";
    hbt.textContent = "HOMEPAGE"
    hbt.href = "index.html";
    hbt.classList.add("hbtn");
    home.appendChild(hbt);
}
 

function displayRec(filteredRecipes){
    if (!reccontainer) return;
    reccontainer.innerHTML = "";
    filteredRecipes.forEach(recipe =>{
        const card = document.createElement("body");
        const title = document.createElement("rh1");
        const description = document.createElement("rbody");
        card.classList.add("recipe-card");

        title.textContent = recipe.title;

        description.textContent = recipe.description;
        const f_btn = document.createElement("a");

        f_btn.textContent = "View Recipe trust";
        f_btn.href = recipe.source;
        f_btn.classList.add("recipe-btn")

        card.appendChild(title);
        card.appendChild(f_btn);
        card.appendChild(description);
        
        reccontainer.appendChild(card);
    })
}
displayRec(recipes);


//main js file!
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
    




