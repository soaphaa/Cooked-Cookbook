
const home = document.getElementById("home button");
home.innerHTML = "";
const hbt = document.createElement("a");
hbt.textContent = "HOMEPAGE"
hbt.href = "index.html";
hbt.classList.add("hbtn");
home.appendChild(hbt);