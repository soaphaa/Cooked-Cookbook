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
    description: "spicy ahh salmon: gochujang, mirin, soy sauce, salmon, sesame oil, sugar, suggested to have with avocado, rice, and maybe cucumbers trust",
    tags: ["savory", "spicy"], source: "salmon.html",
    image: "images/salmon.jpg"
},
{
    title: "choc chip ban bread",
    description: "val day bread: chocolate chips, banana, flour, egg, milk",
    tags: ["sweet", "dessert"],
    source: "banana bread.html"
}]

const reccontainer = document.getElementById("recipe-container");
const tagbtns = document.getElementById("tagbtns");
const input = document.getElementById("text");

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

//add key listener for enter, when txt isn't empty
//run same code as btn.addEventlistener/search(textvalue)
//if ! home of course, !home implies lack of homebutton, which implies presence on index/mainpage screen

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

                const image = document.createElement("img");
                image.src = recipe.image;
                image.alt = recipe.title + " Image";
                image.classList.add("recipe-image");

                const f_btn = document.createElement("a");

                f_btn.textContent = "View Recipe";
                f_btn.href = recipe.source;
                f_btn.classList.add("recipe-btn")

                const tagcont = document.createElement("recipe-tag");

                recipe.tags.forEach(tag => {
                    const rtag = document.createElement("span");
                    rtag.classList.add("recipe-tag");
                    rtag.textContent = tag;
                    tagcont.appendChild(rtag);
                });

                card.appendChild(title);
                card.appendChild(f_btn);
                card.appendChild(description);
                card.appendChild(image);
                card.appendChild(tagcont);
                
                reccontainer.appendChild(card);
            }
        })
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
    tbtn.classList.add("recipe-tag");
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

        f_btn.textContent = "View Recipe";
        f_btn.href = recipe.source;
        f_btn.classList.add("recipe-btn")

        const tagcont = document.createElement("recipe-tag");

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


//main js file

