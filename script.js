const btn = document.getElementById("submit");
const u_search = document.getElementById("user_search")
const recipes = [{
    title: "Chocolate Chip Cookies",
    description: "bocolate bip bookies: brown sugar, white sugar, bocolate bips, flour, eggs, malk, baking boda, baking bowder",
    tags: ["sweet", "dessert"], source: "cookies.html",
    image: "images/chocolate-chip-cookie.jpeg"
},
{
    title: "alyn salmon",
    description: "spicy ahh salmon: gochujang, mirin, soy sauce, salmon, sesame oil, sugar",
    tags: ["savory", "spicy"], source: "salmon.html",
    image: "images/alyn's salmon.jpeg"
},
{
    title: "choc chip ban bread",
    description: "val day bread: chocolate chips, banana, flour, egg, milk",
    tags: ["sweet", "dessert"],
    source: "banana bread.html",
    image: "images/chocolate-chip-banana-bread.jpg"
}]

const reccontainer = document.getElementById("recipe-container");
const tagbtns = document.getElementById("tagbtns");
const input = document.getElementById("text");

function displayRec(filteredRecipes) {
    if (!reccontainer) return; // exits if not on the right page
    reccontainer.innerHTML = ""; //It clears out everything inside the reccontainer element.
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

document.addEventListener("DOMContentLoaded", () => {
    const timerToggleBtn = document.getElementById("timer-toggle-btn");
    if (!timerToggleBtn) {
        console.log("timer-toggle-btn not found on this page");
        return;
    }
    
    let timerPopup = null;
    timerToggleBtn.addEventListener("click", () => {
        console.log("Timer toggle button clicked");
        timerPopup = window.open("timer.html", "Timer", "width=260,height=260,resizable=no");
    });
});

const home = document.getElementById("home-button");


if (home){
    home.innerHTML ="";
    const hbtn = document.createElement("a");
    hbtn.textContent = "HOMEPAGE"
    hbtn.href = "index.html";
    hbtn.classList.add("hbtn");
    home.appendChild(hbtn);
}

genTagBtns();

btn.addEventListener("click", function () {
    const textValue = u_search.value.trim();
    search(textValue);
//take value from the search bar
});

document.addEventListener('keydown', function(event) {
    const textValue = u_search.value.trim();
    if (event.key === 'Enter' && textValue != null) {
        search(textValue);
    }
});

function search(txt){
    if (!reccontainer) return;  
    reccontainer.innerHTML = "";
    recipes.forEach(recipe =>{
        if ((recipe.description.toLowerCase().includes(txt.toLowerCase()))){
            const card = document.createElement("div");
            const title = document.createElement("rh1");
            const description = document.createElement("rbody");
            card.classList.add("recipe-card");

            title.textContent = recipe.title;

            description.textContent = recipe.description;

            const image = document.createElement("img");
            image.src = recipe.image;
            image.alt = recipe.title + " Image";
            image.classList.add("recipe-image");

            const f_btn = document.createElement("a");

            f_btn.textContent = "VIEW RECIPE";
            f_btn.href = recipe.source;
            f_btn.classList.add("recipe-btn")

            const tagcont = document.createElement("taglist");

            recipe.tags.forEach(tag => {
                const rtag = document.createElement("rbody");
                rtag.classList.add("recipe-tag");
                rtag.textContent = tag;
                tagcont.appendChild(rtag);
            });

            card.appendChild(image);
            card.appendChild(title);
            card.appendChild(f_btn);
            card.appendChild(description);
            card.appendChild(tagcont);
            
            reccontainer.appendChild(card);
        }
    })
    if (reccontainer.innerHTML == ""){
            const no_card = document.createElement("warning");
            no_card.textContent = "sorry !! there's no recipes available with that ingredient !!";
            reccontainer.appendChild(no_card);
    }
}

function genTagBtns(){
    //new list?? ish of tags
    const allTags = new Set();

    //for each recipes, for each tag of recipe, add to the all tags set
    recipes.forEach(recipe =>{
        recipe.tags.forEach(tag=>{
            allTags.add(tag);
        })
    })


    //create a tag for all recipes
    createTagBtn("All");


    //create tags for the different ones
    allTags.forEach(tag =>{
        createTagBtn(tag);
    })
}


function createTagBtn(tagname){
    const tbtn = document.createElement("button");
    //tagbutton = tbtn
    tbtn.textContent = tagname;
    tbtn.classList.add("recipe-filter");
    tbtn.addEventListener("click", () => {
        if (tagname == "All"){
            //if the filter is js all of them
            displayRec(recipes);
        }else{
            //filtered recipes = recipes that have "tagname" (the name of the filtered tag)
            const filtrecipes = recipes.filter(recipe =>
                recipe.tags.includes(tagname));
            displayRec(filtrecipes);
            //display the filtered set
        }
    });
    tagbtns.appendChild(tbtn);
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

        const image = document.createElement("img");
        image.src = recipe.image;
        image.alt = recipe.title + " Image";
         image.classList.add("recipe-image");

         const f_btn = document.createElement("a");

        f_btn.textContent = "VIEW RECIPE";
        f_btn.href = recipe.source;
        f_btn.classList.add("recipe-btn")

        const tagcont = document.createElement("taglist");

        recipe.tags.forEach(tag => {
             const rtag = document.createElement("rbody");
             rtag.classList.add("recipe-tag");
             rtag.textContent = tag;
             tagcont.appendChild(rtag);
         });

         card.appendChild(image);
         card.appendChild(title);
         card.appendChild(f_btn);
         card.appendChild(description);
         card.appendChild(tagcont);
        
         reccontainer.appendChild(card);
     })
}
displayRec(recipes);

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

