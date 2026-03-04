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
function displayRec(filteredRecipes){
    reccontainer.innerHTML = "";
    filteredRecipes.forEach(recipe =>{
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
    })
}



displayRec(recipes);