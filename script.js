const btn = document.getElementById("submit");
const u_search = document.getElementById("user_search")
const recipes = [{
    title: "Chocolate Chip Cookies",
    description: "bocolate bip bookies: brown sugar, white sugar, bocolate bips, flour, eggs, malk, baking boda, baking bowder",
    tags: ["sweet", "dessert"], source: "cookies.html"
},
{
    title: "alyn salmon",
    description: "spicy ahh salmon: gochujang, mirin, soy sauce, salmon, sesame oil, sugar",
    tags: ["savory", "spicy"], source: "salmon.html"
},
{
    title: "choc chip ban bread",
    description: "val day bread: chocolate chips, banana, flour, egg, milk",
    source: "banana bread.html"
}]
const reccontainer = document.getElementById("recipe-container");
const tagbtns = document.getElementById("tagbtns");
const input = document.getElementById("text");

const home = document.getElementById("home button");


btn.addEventListener("click", function () {

    const textValue = u_search.value.trim();
    if (!home){
        search(textValue);
    }
    else{
        window.location.href = "index.html?search=" + encodeURIComponent(textValue);
    }
//take value from the search bar
});

function search(txt){
    if (!reccontainer) return;  
    reccontainer.innerHTML = "";
    recipes.forEach(recipe =>{
            if ((recipe.description.toLowerCase().includes(txt.toLowerCase()))){
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
        })
}

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
        const card = document.createElement("div");
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
    

