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


    const checkboxes = document.querySelectorAll(".ingredients-list input[type='checkbox']");

    checkboxes.forEach(cb => {
        cb.addEventListener("change", (event) => {

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

////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////



    const timerToggleBtn = document.getElementById("timer-toggle-btn");
    let timerPopup = null;

    if (timerToggleBtn) {

        timerToggleBtn.addEventListener("click", () => {

            if (timerPopup && !timerPopup.closed) {
                timerPopup.focus();
            } else {

                timerPopup = window.open(
                    "timer.html",
                    "Timer",
                    "width=300,height=200,resizable=no"
                );

            }

        });

    }



    const home = document.getElementById("home-button");

    if (home) {

        home.innerHTML = "";

        const hbtn = document.createElement("a");
        hbtn.textContent = "HOMEPAGE";
        hbtn.href = "index.html";
        hbtn.classList.add("hbtn");

        home.appendChild(hbtn);

    }



    const recipes = [
        {
            title: "Chocolate Chip Cookies",
            description: "brown sugar, white sugar, chocolate chips, flour, eggs",
            tags: ["sweet","dessert"],
            source: "cookies.html",
            image: "images/chocolate-chip-cookie.jpeg"
        },
        {
            title: "Alyn Salmon",
            description: "gochujang, mirin, soy sauce, salmon",
            tags: ["savory","spicy"],
            source: "salmon.html",
            image: "images/salmon.jpg"
        },
        {
            title: "Chocolate Chip Banana Bread",
            description: "chocolate chips, banana, flour, egg, milk",
            tags: ["sweet","dessert"],
            source: "banana bread.html"
        },
        {
            title: "Cheesecake",
            description: "cream cheese, graham crackers, sugar, eggs",
            tags: ["sweet","dessert"],
            source: "cheesecake.html",
            image: "images/cheesecake.jpg"
        }
    ];


    const reccontainer = document.getElementById("recipe-container");
    const tagbtns = document.getElementById("tagbtns");
    const btn = document.getElementById("submit");
    const u_search = document.getElementById("user_search");



    function displayRec(list){

        if (!reccontainer) return;

        reccontainer.innerHTML = "";

        list.forEach(recipe => {

            const card = document.createElement("div");
            card.classList.add("recipe-card");

            const title = document.createElement("rh1");
            title.textContent = recipe.title;

            const image = document.createElement("img");
            image.src = recipe.image;
            image.classList.add("recipe-image");

            const button = document.createElement("a");
            button.textContent = "VIEW RECIPE";
            button.href = recipe.source;
            button.classList.add("recipe-btn");

            card.appendChild(title);
            card.appendChild(image);
            card.appendChild(button);

            reccontainer.appendChild(card);

        });

    }



    function search(txt){

        const filtered = recipes.filter(recipe =>
            recipe.description.toLowerCase().includes(txt.toLowerCase())
        );

        displayRec(filtered);

    }

    if (btn) {

        btn.addEventListener("click", () => {

            const text = u_search.value.trim();
            search(text);

        });

    }

    document.addEventListener("keydown", (event) => {

        if (event.key === "Enter" && u_search) {
            search(u_search.value.trim());
        }

    });



    function createTagBtn(tag){

        const tbtn = document.createElement("button");
        tbtn.textContent = tag;
        tbtn.classList.add("recipe-filter");

        tbtn.addEventListener("click", () => {

            if (tag === "All") {
                displayRec(recipes);
            } else {

                const filtered = recipes.filter(r =>
                    r.tags.includes(tag)
                );

                displayRec(filtered);

            }

        });

        tagbtns.appendChild(tbtn);

    }

    function genTagBtns(){

        if (!tagbtns) return;

        const tags = new Set();

        recipes.forEach(r => r.tags.forEach(tag => tags.add(tag)));

        createTagBtn("All");

        tags.forEach(tag => createTagBtn(tag));

    }

    genTagBtns();
    displayRec(recipes);

});