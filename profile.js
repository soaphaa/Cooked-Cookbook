// only runs on profile.html to avoid clutter in script.js
document.addEventListener("DOMContentLoaded", function() {
    const loggedInUser = localStorage.getItem("loggedInUser");

    //if not logged in, redirect to login page
    if (!loggedInUser) {
        window.location.href = "login.html";
        return;
    }   

    //display username
    const usernameEl = document.getElementById("profile-username");
    if(usernameEl) usernameEl.textContent = loggedInUser;

    //loading favourites 
    //stored as an array of the recipe titles "favourites_<username>"
    const favKey = `favourites_${loggedInUser}`;
    const favData = localStorage.getItem(favKey);
    const favourites = favData ? JSON.parse(favData) : [];

    //update favourites page
    const statFav = document.getElementById("stat-favourites");
    if(statFav) statFav.textContent = favourites.length; //woah searching

    const completedKey = "completed_" + loggedInUser;
    const completedData = localStorage.getItem(completedKey);
    const completed = completedData ? JSON.parse(completedData) : [];
    const statCompleted = document.getElementById("stat-completed");
    if(statCompleted) statCompleted.textContent = completed.length;

    const grid = document.getElementById("favourites-grid");
    if(favourites.length === 0) {
        grid.innerHTML = 
        <div class="profile-empty">
            <p>You have no favourite recipes yet. Start adding some!</p>
            <a href="index.html" class="recipe-btn">browse recipes</a>
        </div>
        
    }

});    