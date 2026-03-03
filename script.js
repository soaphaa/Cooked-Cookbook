document.addEventListener("DOMContentLoaded", () => {
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
});//main js file!