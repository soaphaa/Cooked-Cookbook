
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
    flavortags: ["sweet"], mealtags: ["dessert"], source: "cookies.html",
    image: "images/chocolate-chip-cookie.jpeg"
},
{
    title: "Alyn Salmon",
    description: "alyn salmon: gochujang, mirin, soy sauce, salmon, sesame oil, sugar",
    flavortags: ["savory", "spicy", "sweet"], mealtags: ["lunch", "dinner"], source: "salmon.html",
    image: "images/salmon.jpg"
},
{
    title: "Chocolate Chip Banana Bread",
    description: "chocolate chip banana bread: chocolate chips, banana, flour, egg, milk",
    flavortags: ["sweet"], mealtags: ["dessert"],
    source: "banana bread.html", image: "images/chocolate-chip-banana-bread.jpg"
},
{
    title: "Kimchi Fried Rice",
    description: "Kimchi Fried Rice: kimchi, rice, sesame oil, gochujang, soy sauce, garlic, green onions, egg",
    tags: ["savory", "spicy"],
    source: "fried rice.html",
    image: "images/fried-rice.png"
},
{
    title: "Cheesecake",
    description: "delicious cheesecake: cream cheese, graham crackers, sugar, eggs",
    flavortags: ["sweet"], mealtags:["dessert"], source: "cheesecake.html",
    image: "images/cheesecake.jpg"

}]
const n_card = document.getElementById("no-card");
const reccontainer = document.getElementById("recipe-container");
const input = document.getElementById("text");
const filterset = document.getElementById("tagbtns")

n_card.innerHTML = "";

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

            const ftagcont = document.createElement("div");
            ftagcont.classList.add("taglist");

            const mtagcont = document.createElement("div");
            mtagcont.classList.add("taglist");

            recipe.flavortags.forEach(tag => {
                const ftag = document.createElement("rbody");
                ftag.classList.add("recipe-tag");
                ftag.textContent = tag;
                ftagcont.appendChild(ftag);
            });

            recipe.mealtags.forEach(tag => {
                const mtag = document.createElement("rbody");
                mtag.classList.add("recipe-tag");
                mtag.textContent = tag;
                mtagcont.appendChild(mtag);
            });

            card.appendChild(title);
            card.appendChild(image);
            card.appendChild(f_btn);
            card.appendChild(ftagcont);
            card.appendChild(mtagcont);
            
            reccontainer.appendChild(card);
        }
    })
    if (reccontainer.innerHTML == ""){
            const no_card = document.createElement("rh1");
            no_card.textContent = "sorry !! there's no recipes available with that ingredient/title !!";
            n_card.appendChild(no_card);
    }
    else {
        n_card.innerHTML = "";
    }
}

function genTagBtns(){
    //new list?? ish of tags
    const allTags = new Set();

    //for each recipes, for each tag of recipe, add to the all tags set
    recipes.forEach(recipe =>{
        recipe.flavortags.forEach(tag=>{
            allTags.add(tag);
        })
        recipe.mealtags.forEach(tag=>{
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
            n_card.innerHTML = "";
            //if the filter is js all of them
            displayRec(recipes);
        }else{
            n_card.innerHTML = "";
            //filtered recipes = recipes that have "tagname" (the name of the filtered tag)
            const filtrecipes = recipes.filter(recipe =>
                recipe.flavortags.includes(tagname) || recipe.mealtags.includes(tagname));
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

        const ftagcont = document.createElement("div");
        ftagcont.classList.add("taglist");

        const mtagcont = document.createElement("div");
        mtagcont.classList.add("taglist");

        recipe.flavortags.forEach(tag => {
            const ftag = document.createElement("rbody");
            ftag.classList.add("recipe-tag");
            ftag.textContent = tag;
            ftagcont.appendChild(ftag);
        });

        recipe.mealtags.forEach(tag => {
            const mtag = document.createElement("rbody");
            mtag.classList.add("recipe-tag");
            mtag.textContent = tag;
            mtagcont.appendChild(mtag);
        });

        card.appendChild(title);
        card.appendChild(image);
        card.appendChild(f_btn);
        card.appendChild(ftagcont);
        card.appendChild(mtagcont);
        
        reccontainer.appendChild(card);
     })
}

genTagBtns();
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
    
});
