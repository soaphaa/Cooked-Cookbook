const reviews = [{
    username: "Username",
    date: "March 10, 2026",
    ratings: 5,
    review: "Abcdefg",
    pictures: ["images/alyn's salmon.jpeg", "images/salmon.jpg", "images/chocolate-chip-banana-bread.jpg"]
}, {
    username: "Claireee",
    date: "February 26, 2026",
    ratings: 4,
    review: "This is a great recipe. This is a great recipe. This is a great recipe.",
    pictures: ["images/alyn's salmon.jpeg", "images/salmon.jpg", "images/chocolate-chip-banana-bread.jpg"]
}, {
    username: "Hellooo",
    date: "April 5, 2026",
    ratings: 1,
    review: "BAD",
    pictures: ["images/alyn's salmon.jpeg", "images/salmon.jpg", "images/chocolate-chip-banana-bread.jpg"]
}]

const reviewSection = document.querySelector(".review-section");

const reviewTemplate = document.querySelector("#review-template");
const ratingsTemplate = document.querySelector("#ratings-template");
const ratingBarTemplate = document.querySelector("#rating-bar-template");
const reviewImgTemplate = reviewTemplate.content.querySelector("#img-template");


let totalRatings = 0;
const ratingsDistribution = [0, 0, 0, 0, 0];

initializeReviewSummary();

reviews.forEach(review => {
    displayReview(review);
})

updateReviewSummary();

function initializeReviewSummary() {
    const overallRatings = document.querySelector(".overall-ratings");
    const ratingBars = document.querySelector(".rating-bars-container");

    for (let i = 0; i < 5; i++) {
        const ratingsClone = ratingsTemplate.content.cloneNode(true);
        ratingsClone.querySelector("i").classList.add("fas");
        overallRatings.append(ratingsClone);

        const ratingBarClone = ratingBarTemplate.content.cloneNode(true);
        const ratingLevel = ratingBarClone.querySelector(".rating-level");
        ratingLevel.textContent = (i+1).toFixed(1);
        ratingBars.append(ratingBarClone);
    }
}

function updateReviewSummary() {
    let averageRatings = totalRatings / reviews.length; //?

    const overallScore = document.querySelector("#overall-score");
    overallScore.textContent = averageRatings.toFixed(1);
    // star
    const numRatings = document.querySelector("#num-ratings"); //?
    numRatings.textContent = reviews.length + " ratings";

    const ratingBarsContainer = document.querySelector(".rating-bars-container");
    const ratingBars = ratingBarsContainer.querySelectorAll(".rating-bar");
    for (let i = 0; i < ratingBars.length; i++) {
        const percentage = (ratingsDistribution[i]/reviews.length * 100).toFixed(0);
        
        const ratingPercentage = ratingBars[i].querySelector(".rating-percentage");
        ratingPercentage.textContent = percentage + "% (" + getNumInTwoDigits(ratingsDistribution[i]) + ")";
        // ratingPercentage.textContent = "100% (999K)";

        const ratingBarFilled = ratingBars[i].querySelector(".rating-bar-filled");
        ratingBarFilled.style.width = percentage + "%";
    }
    
}

function displayReview(review) {
    const reviewClone = reviewTemplate.content.cloneNode(true);

        const username = reviewClone.querySelector("#username");
        username.textContent = review.username;

        const date = reviewClone.querySelector("#date");
        date.textContent = review.date;

        const ratings = reviewClone.querySelector(".ratings");        
        // ratings.innerHTML = "";

        for (let i = 0; i < 5; i++) {
            const ratingsClone = ratingsTemplate.content.cloneNode(true);
            const star = ratingsClone.querySelector("i");

            if (i < review.ratings) {
                star.classList.add("fas");
            } else {
                star.classList.add("far");
            }
            ratings.appendChild(ratingsClone);
        }

        totalRatings += review.ratings;
        ratingsDistribution[review.ratings-1]++;

        const reviewParagraph = reviewClone.querySelector("#review-paragraph");
        reviewParagraph.textContent = review.review;

        const reviewImages = reviewClone.querySelector(".review-images");
        
        review.pictures.forEach(reviewPicture => {
            const reviewImgClone = reviewImgTemplate.content.cloneNode(true);
            const image = reviewImgClone.querySelector("img");
            const popUpImage = reviewImgClone.querySelector(".popup-image img");
            image.src = reviewPicture;
            popUpImage.src = reviewPicture;

            const imageButton = reviewImgClone.querySelector(".review-image-btn");
            const popupOverlay = reviewImgClone.querySelector(".popup-overlay");
            const popup = reviewImgClone.querySelector(".img-popup");
            const closePopupButton = reviewImgClone.querySelector(".close-img-btn");

            imageButton.addEventListener("click", () => {
                popupOverlay.classList.add("show");
                popup.classList.add("show");
            });

            closePopupButton.addEventListener("click", () => {
                popupOverlay.classList.remove("show");
                popup.classList.remove("show");
            })

            reviewImages.appendChild(reviewImgClone);
        })
        
        reviewSection.appendChild(reviewClone);
}


function getNumInTwoDigits(number) {
    if (number < 1000) {
        return number
    } else if (number < 10000) {
        return (number / 1000).toFixed(1) + "K"; //9000
    } else if (number < 1000000) {
        return Math.round(number/1000) + "K";
    } else if (number < 10000000) {
        return (number / 1000000).toFixed(1) + "M";
    } else if (number < 1000000000) {
        return Math.round(number/1000000) + "M";
    }
}