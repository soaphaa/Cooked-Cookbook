const btn = document.getElementById("submit");
const recipes = [{
    title: "Cookeroonies",
    description: "yum cooks",
    tags: ["sweet", "dessert"]
},
{
    title: "alyn salmon", description: "spicy ahh salmon", tags: ["savory", "spicy"]
}]
const reccontainer = document.getElementById("recipe-container")
const tagbtns = document.getElementById("tagbtns")
btn.addEventListener("click", function () {
  document.getElementById("spoof").innerHTML = "free me";
});
function displayRec(filteredRecipes){
    reccontainer.innerHTML = "";
    filteredRecipes.forEach(recipe =>{
        const card = document.createElement("body");
        card.classList.add("recipe-card");

        const title = document.createElement("h2");
        title.textContent = recipe.title;

        const description = document.createElement("p");
        description.textContent = recipe.description;

        card.appendChild(title);
        card.appendChild(description);
        
        reccontainer.appendChild(card);
    })
}

displayRec(recipes);