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
const ratingButtonTemplate = document.querySelector("#rating-button-template");
const ratingBarTemplate = document.querySelector("#rating-bar-template");
const uploadedImgTemplate = document.querySelector("#uploaded-img-template");
const reviewImgTemplate = reviewTemplate.content.querySelector("#img-template");


let totalRatings = 0;
const ratingsDistribution = [0, 0, 0, 0, 0];

initializeReviewSummary();

reviews.forEach(review => {
    displayReview(review);
})

updateReviewSummary();

initializeReviewWriting();

function initializeReviewWriting() {
    const writeReviewButton = document.querySelector(".write-review-btn");
    const reviewPopupOverlay = document.querySelector(".overall-review-container").querySelector(".popup-overlay");
    const reviewPopup = document.querySelector(".review-popup");
    writeReviewButton.addEventListener("click", () => {
        reviewPopupOverlay.classList.add("show");
        reviewPopup.classList.add("show");
    })

    const userRatings = document.querySelector(".user-ratings");
    for (let i = 0; i < 5; i++) {
        const ratingBTNClone = ratingButtonTemplate.content.cloneNode(true);
        const ratingBTN = ratingBTNClone.querySelector("button");
        ratingBTN.querySelector("i").classList.add("far");

        ratingBTN.addEventListener("click", () => {
            const ratingButtons = userRatings.querySelectorAll(".rating-button");
            let isTargetBTNReached = false;
            for (let i = 0; i < 5; i++) {
                const buttonIcon = ratingButtons[i].querySelector("i");
                if (isTargetBTNReached) {
                    buttonIcon.classList.add("far");
                    buttonIcon.classList.remove("fas");
                } else {
                    buttonIcon.classList.remove("far");
                    buttonIcon.classList.add("fas");
                }
                if (ratingBTN === ratingButtons[i]) {
                    isTargetBTNReached = true;
                }
            }
            changeSubmitBTN();
        })
        userRatings.appendChild(ratingBTNClone);
    }

    const reviewTextbox = document.querySelector(".review-textbox");
    reviewTextbox.addEventListener("input", () => {
        changeSubmitBTN();
    })

    const uploadedImages = document.querySelector(".uploaded-imgs-container");

    const uploadedFiles = [];
    const fileInput = document.querySelector("#img-upload");

    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        let doesFileExist = false;

        if (uploadedFiles.length > 0) {
            for (let i = 0; i < uploadedFiles.length; i++) {
                if (uploadedFiles[i].name === file.name && uploadedFiles[i].size === file.size && uploadedFiles[i].lastModified === file.lastModified) {
                    doesFileExist = true;
                    break;
                }
            }
        }
        if (!doesFileExist) {
            uploadedFiles.push(file);
            const uploadedImgClone = uploadedImgTemplate.content.cloneNode(true);
            const uploadedImgDiv = uploadedImgClone.firstElementChild;
            uploadedImgDiv.querySelector("img").src = URL.createObjectURL(file);

            uploadedImgDiv.querySelector("button").addEventListener("click", () => {
                const uploadedImgContainers = uploadedImages.querySelectorAll(".uploaded-img");
                for (let i = 0; i < uploadedImgContainers.length; i++) {
                    if (uploadedImgDiv === uploadedImgContainers[i]) {
                        uploadedFiles.splice(i, 1);
                        uploadedImages.removeChild(uploadedImgContainers[i]);
                        break;
                    }
                }
                changeUploadImagesBTN(uploadedFiles);
                changeSubmitBTN();
            })
            uploadedImages.appendChild(uploadedImgDiv);
        }
        changeUploadImagesBTN(uploadedFiles);
        changeSubmitBTN();
    })

    const cancelButton = document.querySelector("#cancel-btn");
    cancelButton.addEventListener("click", () => {
        const ratingButtons = userRatings.querySelectorAll(".rating-button");
        ratingButtons.forEach(button => {
            const buttonIcon = button.querySelector("i");
            buttonIcon.classList.remove("fas");
            buttonIcon.classList.add("far");
        })

        const textbox = reviewPopup.querySelector(".review-textbox");
        textbox.value = "";

        uploadedImages.innerHTML = "";

        reviewPopup.classList.remove("show");
        reviewPopupOverlay.classList.remove("show");
    })

    const submitButton = document.querySelector("#submit-btn");
    changeSubmitBTN();
    // submitButton.addEventListener
}

function changeUploadImagesBTN(imagesArray) {
    const imageUpload = document.querySelector("#img-upload");
    if (imagesArray.length >= 7) {
        imageUpload.disabled = true;
    } else {
        imageUpload.disabled = false;
    }
}

function changeSubmitBTN() {
    const submitButton = document.querySelector("#submit-btn");

    let isRatingsEdited = false;
    const userRatings = document.querySelector(".user-ratings .rating-button");
    userRatings.some(button => {
        if (button.querySelector("i").classList.contains("fas")) {
            isRatingsEdited = true;
            return true;
        }
    })
    if (isRatingsEdited) {
        const textbox = document.querySelector(".review-textbox");
        const uploadedImgsContainer = document.querySelector(".uploaded-imgs-container");
        if (textbox.value.trim() !== "" || uploadedImgsContainer.children.length !== 0) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    } else {
        submitButton.disabled = true;
    }
}

function initializeReviewSummary() {
    const overallRatings = document.querySelector(".overall-ratings");
    const ratingBars = document.querySelector(".rating-bars-container");

    for (let i = 0; i < 5; i++) {
        const ratingsClone = ratingsTemplate.content.cloneNode(true);
        ratingsClone.querySelector("i").classList.add("fas");
        overallRatings.append(ratingsClone);

        const ratingBarClone = ratingBarTemplate.content.cloneNode(true);
        const ratingLevel = ratingBarClone.querySelector(".rating-level");
        ratingLevel.textContent = (5 - i).toFixed(1);
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
    for (let i = 0; i < 5; i++) {
        const percentage = (ratingsDistribution[5 - i - 1] / reviews.length * 100).toFixed(0);

        const ratingPercentage = ratingBars[i].querySelector(".rating-percentage");
        ratingPercentage.textContent = percentage + "% (" + getNumInTwoDigits(ratingsDistribution[5 - i - 1]) + ")";
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
    ratingsDistribution[review.ratings - 1]++;

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
        return Math.round(number / 1000) + "K";
    } else if (number < 10000000) {
        return (number / 1000000).toFixed(1) + "M";
    } else if (number < 1000000000) {
        return Math.round(number / 1000000) + "M";
    }
}