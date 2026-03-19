// indexedDB.deleteDatabase("ReviewsDataBase");

const reviewSection = document.querySelector(".review-section");

const reviewTemplate = document.querySelector("#review-template");
const ratingsTemplate = reviewTemplate.content.querySelector("#ratings-template");
const ratingsWithFillTemplate = document.querySelector('#ratings-with-fill-template');
const ratingButtonTemplate = document.querySelector("#rating-button-template");
const ratingBarTemplate = document.querySelector("#rating-bar-template");
const uploadedImgTemplate = document.querySelector("#uploaded-img-template");
const reviewImgTemplate = reviewTemplate.content.querySelector("#img-template");

let dataBase;

let recipeName = window.location.pathname;
recipeName = recipeName.substring(recipeName.lastIndexOf("/") + 1);
recipeName = recipeName.split(".")[0];

let totalRatings = 0;
const ratingsDistribution = [0, 0, 0, 0, 0];
const uploadedFiles = [];

initializeReviewPage();

async function initializeReviewPage() {
    await openDataBase();
    initializeReviewSummary();
    await displayExistingReviews();
    updateReviewSummary();
    initializeReviewWriting();
}

function initializeReviewWriting() {
    const writeReviewButton = document.querySelector(".write-review-btn");
    writeReviewButton.addEventListener("click", () => {
        showReviewPopup(true);
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
            toggleSubmitBTN();
        })
        userRatings.appendChild(ratingBTNClone);
    }

    const reviewTextbox = document.querySelector(".review-textbox");
    reviewTextbox.addEventListener("input", () => {
        toggleSubmitBTN();
    })

    const uploadedImages = document.querySelector(".uploaded-imgs-container");

    const fileInput = document.querySelector("#img-upload");

    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        // if (!file) {
        //     return;
        // }
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
                toggleUploadImagesBTN();
                toggleSubmitBTN();
            })
            uploadedImages.appendChild(uploadedImgDiv);
        }
        fileInput.value = "";
        toggleUploadImagesBTN();
        toggleSubmitBTN();
    })

    const cancelButton = document.querySelector("#cancel-btn");
    cancelButton.addEventListener("click", () => {
        showReviewPopup(false);
        clearReviewPopup();
        toggleSubmitBTN();
    })

    const submitButton = document.querySelector("#submit-btn");
    toggleSubmitBTN();
    submitButton.addEventListener("click", async () => {
        showReviewPopup(false);

        let review = await constructReview();
        displayReview(review);
        updateReviewSummary();

        clearReviewPopup();
        toggleSubmitBTN();
    })
}

function showReviewPopup(isVisible) {
    const reviewPopup = document.querySelector(".review-popup");
    const reviewPopupOverlay = document.querySelector(".popup-overlay");
    if (isVisible) {
        reviewPopup.classList.add("show");
        reviewPopupOverlay.classList.add("show");
    } else {
        reviewPopup.classList.remove("show");
        reviewPopupOverlay.classList.remove("show");
    }
}

function clearReviewPopup() {
    const ratingButtons = document.querySelectorAll(".user-ratings .rating-button");
    ratingButtons.forEach(button => {
        const buttonIcon = button.querySelector("i");
        buttonIcon.classList.remove("fas");
        buttonIcon.classList.add("far");
    })

    const textbox = document.querySelector(".review-textbox");
    textbox.value = "";

    const uploadedImages = document.querySelector(".uploaded-imgs-container");
    uploadedImages.innerHTML = "";
    uploadedFiles.length = 0;
}

function toggleUploadImagesBTN() {
    const imageUpload = document.querySelector("#img-upload");
    if (uploadedFiles.length >= 7) {
        imageUpload.disabled = true;
    } else {
        imageUpload.disabled = false;
    }
}

function toggleSubmitBTN() {
    const submitButton = document.querySelector("#submit-btn");

    const userRatingBTN = document.querySelector(".user-ratings .rating-button");

    if (userRatingBTN.querySelector("i").classList.contains("fas")) {
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
        const ratingsClone = ratingsWithFillTemplate.content.cloneNode(true);
        overallRatings.append(ratingsClone);

        const ratingBarClone = ratingBarTemplate.content.cloneNode(true);
        const ratingLevel = ratingBarClone.querySelector(".rating-level");
        ratingLevel.textContent = (5 - i).toFixed(1);
        ratingBars.append(ratingBarClone);
    }
}

function updateReviewSummary() {
    let numReviews = document.querySelectorAll(".review-box").length;
    console.log(numReviews);
    let averageRatings = totalRatings / numReviews;

    const overallScore = document.querySelector("#overall-score");
    if (numReviews === 0) {
        overallScore.textContent = "N/A";
    } else {
        overallScore.textContent = averageRatings.toFixed(1);
    }

    const overallRatings = document.querySelectorAll(".overall-ratings .rating-star");
    for (let i = 0; i < 5; i++) {
        const starFrame = overallRatings[i].querySelector("i");
        const starFill = overallRatings[i].querySelector(".rating-star-fill");
        starFrame.classList.remove("far", "fas");
        starFill.style.clipPath = "inset(0 100% 0 0)";

        if (i + 1 <= averageRatings) {
            starFrame.classList.add("fas");
        } else if (i + 1 > averageRatings && i < averageRatings) {
            starFrame.classList.add("far");
            let fractionalRating = 1 - (averageRatings - i);
            starFill.style.clipPath = "inset(0 " + fractionalRating * 100 + "% 0 0)";
        } else {
            starFrame.classList.add("far");
        }
    }

    const numRatings = document.querySelector("#num-ratings");
    numRatings.textContent = getNumInTwoDigits(numReviews) + " ratings";

    const ratingBarsContainer = document.querySelector(".rating-bars-container");
    const ratingBars = ratingBarsContainer.querySelectorAll(".rating-bar");
    for (let i = 0; i < 5; i++) {
        const ratingPercentage = ratingBars[i].querySelector(".rating-percentage");
        const ratingBarFilled = ratingBars[i].querySelector(".rating-bar-filled");
        if (numReviews === 0) {
            ratingPercentage.textContent = "(0)";
        } else {
            const percentage = (ratingsDistribution[5 - i - 1] / numReviews * 100).toFixed(0);
            ratingPercentage.textContent = percentage + "% (" + getNumInTwoDigits(ratingsDistribution[5 - i - 1]) + ")";
            ratingBarFilled.style.width = percentage + "%";
        }
    }
}

async function constructReview() {
    const username = localStorage.getItem("loggedInUser");

    const dateFormat = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date().toLocaleDateString("en-US", dateFormat);

    const ratings = document.querySelectorAll(".user-ratings .rating-button");
    let userRatings = 0;
    for (let i = 0; i < 5; i++) {
        if (ratings[i].querySelector("i").classList.contains("fas")) {
            userRatings++;
        } else {
            break;
        }
    }

    const textbox = document.querySelector(".review-textbox");
    const reviewParagraph = textbox.value;

    const reviewImages = [];
    for (const imageFile of uploadedFiles) {
        const base64 = await fileToBase64(imageFile);
        reviewImages.push(base64);
    }

    const newReview = {
        username: username,
        date: date,
        ratings: userRatings,
        review: reviewParagraph,
        pictures: reviewImages
    }

    saveReview(newReview);
    return newReview;
}

function displayReview(review) {
    const reviewClone = reviewTemplate.content.cloneNode(true);

    const username = reviewClone.querySelector("#username");
    username.textContent = review.username;

    const date = reviewClone.querySelector("#date");
    date.textContent = review.date;

    const ratings = reviewClone.querySelector(".ratings");

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

    review.pictures.forEach(imageFile => {
        const reviewImgClone = reviewImgTemplate.content.cloneNode(true);
        const image = reviewImgClone.querySelector("img");
        const popUpImage = reviewImgClone.querySelector(".popup-image img");
        image.src = imageFile;
        popUpImage.src = imageFile;

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

function saveReview(review) {
    const storage = dataBase.transaction("recipes", "readwrite").objectStore("recipes");
    const recipeStorage = storage.get(recipeName);

    recipeStorage.onsuccess = () => {
        let recipe = recipeStorage.result;
        recipe.reviews.push(review);
        storage.put(recipe);
    }
}

function openDataBase() {
    return new Promise(resolve => {
        const request = indexedDB.open("ReviewsDataBase", 1);

        request.onupgradeneeded = function (event) {
            dataBase = event.target.result;

            dataBase.createObjectStore("recipes", {
                keyPath: "recipe",
            });
        };

        request.onsuccess = function (event) {
            dataBase = event.target.result;
            addRecipeToStorage();
            resolve();
        };
    });
}

function addRecipeToStorage() {
    const storage = dataBase.transaction("recipes", "readwrite").objectStore("recipes");
    const recipeStorage = storage.get(recipeName);

    recipeStorage.onsuccess = () => {
        if (!recipeStorage.result) {
            const newRecipe = { recipe: recipeName, reviews: [] };
            storage.add(newRecipe);
        }
    };
}

function displayExistingReviews() {
    return new Promise(resolve => {
        const storage = dataBase.transaction("recipes", "readonly").objectStore("recipes");
        const recipeStorage = storage.get(recipeName);

        recipeStorage.onsuccess = () => {
            const reviews = recipeStorage.result?.reviews || [];
            reviews.forEach(review => {
                displayReview(review);
            });
            resolve();
        };
    });
}

function fileToBase64(imageFile) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(imageFile);
    });
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