// localStorage.setItem("loggedInUser", "Guest");

document.addEventListener("DOMContentLoaded", () => {
    
    
    const confettiBtn = document.getElementById("finish");
    
    if (confettiBtn) {
        confettiBtn.addEventListener("click", () => {
            confetti({
                particleCount: 2000,
                spread: 6000,
                origin: { y: 0.6 }
            });
        });
    }
    
    const checkboxes = document.querySelectorAll(
        ".ingredients-list input[type=\"checkbox\"]"
    );
    
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

    if (panel) {

        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

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

    }
});

////////////////////////////////////////////////////////////////////////////
const fullBtn = document.getElementById("full-btn");
const halfBtn = document.getElementById("half-btn");
const doubleBtn = document.getElementById("double-btn");

const fullList = document.getElementById("ingredients-full");
const halfList = document.getElementById("ingredients-half");
const doubleList = document.getElementById("ingredients-double");

if (fullBtn && halfBtn && doubleBtn && fullList && halfList && doubleList) {

    fullBtn.addEventListener("click", () => {

        fullList.classList.remove("hidden");
        halfList.classList.add("hidden");
        doubleList.classList.add("hidden");

    });

    halfBtn.addEventListener("click", () => {

        fullList.classList.add("hidden");
        halfList.classList.remove("hidden");
        doubleList.classList.add("hidden");

    });

    doubleBtn.addEventListener("click", () => {

        fullList.classList.add("hidden");
        halfList.classList.add("hidden");
        doubleList.classList.remove("hidden");

    });

}
////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////
    const nutritionBtn = document.getElementById("nutrition-btn");
const nutritionPanel = document.getElementById("panel2");

if (nutritionBtn && nutritionPanel) {

    nutritionBtn.addEventListener("click", () => {

    
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
    
});

const home = document.getElementById("home-button");

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

    title: "Chocolate Chip Cookies",
    description: "chocolate chip cookies: brown sugar, white sugar, chocolate chips, flour, eggs, milk, baking soda, baking powder",
    tags: ["sweet", "dessert"], 
    source: "cookies.html",
    image: "images/chocolate-chip-cookie.jpeg"
},
{
    title: "Alyn Salmon",
    description: "alyn salmon: gochujang, mirin, soy sauce, salmon, sesame oil, sugar",
    tags: ["savory", "spicy", "sweet"], 
    source: "salmon.html",
    image: "images/alyn's salmon.jpeg"
},
{
    title: "Chocolate Chip Banana Bread",
    description: "chocolate chip banana bread: chocolate chips, banana, flour, egg, milk",
    tags: ["sweet", "dessert"],
    source: "banana bread.html",
    image: "images/chocolate-chip-banana-bread.jpg"
},
{
    title: "Kimchi Fried Rice",
    description: "Kimchi Fried Rice: kimchi, rice, sesame oil, gochujang, soy sauce, garlic, green onions, egg",
    tags: ["savory", "spicy"],
    source: "fried rice.html",
    image: "images/fried-rice.png"
},
{
    title: "Salad",
    description: "Arugula Salad: arugula, cherry tomatoes, cucumber, feta cheese, olive oil, balsamic vinegar",
    tags: ["savory", "healthy"],
    source: "salad.html",
    image: "images/salad.png"
},
{
    title: "Cheesecake",
    description: "delicious cheesecake: cream cheese, graham crackers, sugar, eggs",
    tags: ["sweet", "dessert"], 
    source: "cheesecake.html",
    image: "images/cheesecake.jpg"
    
}]


const reccontainer = document.getElementById("recipe-container");
const input = document.getElementById("text");
const filterset = document.getElementById("tagbtns")

if (btn) {
    btn.addEventListener("click", function () {
        const textValue = u_search.value.trim();
        search(textValue);
        //takes value from search bar
    });
}


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
            
            const tagcont = document.createElement("div");
            tagcont.classList.add("taglist");
            
            recipe.tags.forEach(tag => {
                const rtag = document.createElement("rbody");
                rtag.classList.add("recipe-tag");
                rtag.textContent = tag;
                tagcont.appendChild(rtag);
            });
            card.appendChild(title);
            card.appendChild(image);
            card.appendChild(f_btn);
            card.appendChild(tagcont);
            
            reccontainer.appendChild(card);
        }
    })
    if (reccontainer.innerHTML == ""){
        const no_card = document.createElement("p");
        no_card.classList.add("warning");
        no_card.textContent = "sorry !! there's no recipes available with that ingredient/title !!";
        reccontainer.appendChild(no_card);
    }
}

const nutritionBtn = document.getElementById("nutrition-btn");
const nutritionPanel = document.getElementById("panel2");

if (nutritionBtn && nutritionPanel) {
    
    nutritionBtn.addEventListener("click", () => {
        
        if (nutritionPanel.style.display === "block") {
            nutritionPanel.style.display = "none";
        } else {
            nutritionPanel.style.display = "block";
        }
        
    });
    
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
    const tagbtns = document.createElement("div");
    tagbtns.classList.add("filterlist");
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
        
        filterset.appendChild(tbtn);
        
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
            
            const tagcont = document.createElement("div");
            tagcont.classList.add("taglist");
            
            recipe.tags.forEach(tag => {
                const rtag = document.createElement("rbody");
                rtag.classList.add("recipe-tag");
                rtag.textContent = tag;
                tagcont.appendChild(rtag);
            });
            
            card.appendChild(title);
            card.appendChild(image);
            card.appendChild(f_btn);
            card.appendChild(tagcont)
            
            reccontainer.appendChild(card);
        })
    }
    
    const checkboxes = document.querySelectorAll(
        ".ingredients-list input[type=\"checkbox\"]"
    );

    
    
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
    
    //profile stuff
    
    const profileBtn = document.getElementById("profile-btn");
    if (profileBtn) {
        profileBtn.addEventListener("click", () => {
            window.location.href = "profile.html";
        });
    }
    const usernameDisplay = document.getElementById("profile-username");
    const loggedInUser = localStorage.getItem("loggedInUser");
    
    // show username if logged in
    if (loggedInUser && usernameDisplay) {
        usernameDisplay.textContent = loggedInUser;
    } else if (usernameDisplay) {
        usernameDisplay.textContent = "guest chef";
    }


    const fullBtn = document.getElementById("full-btn");
    const halfBtn = document.getElementById("half-btn");
    
    const fullList = document.getElementById("ingredients-full");
    const halfList = document.getElementById("ingredients-half");
    
    if (fullBtn && halfBtn && fullList && halfList) {
        
        fullBtn.addEventListener("click", () => {
            
            fullList.classList.remove("hidden");
            halfList.classList.add("hidden");
            
        });
        
        halfBtn.addEventListener("click", () => {
            
            fullList.classList.add("hidden");
            halfList.classList.remove("hidden");
            
        });
    }
}
        
genTagBtns();
displayRec(recipes);
    