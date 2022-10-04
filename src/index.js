// NOTE: This is complete, but we clearly can't utilize the 'src' tag accordingly since we don't download the images from the corresponding sites in this example.
// This would have to be revisited accordingly later on to accomplish that portion of the functionality for this project

// Also, the delete button doesn't full reproduce the center image section, but it 'works'

let latestIdValue;

document.addEventListener("DOMContentLoaded", () => {
  getRamenObjects();
  let createButton = document.querySelector('input[value="Create"]');
  createButton.addEventListener("click", createButtonClick);
});

function createImages(obj) {
  let ramenMenuImagesDiv = document.querySelector("#ramen-menu");
  let ramenImageTag = document.createElement("img");
  let ramenId = obj.id;
  let ramenImage = obj.image;
  ramenImageTag.src = ramenImage;
  ramenImageTag.id = ramenId;
  ramenImageTag.addEventListener("click", ramenImageClick);

  ramenMenuImagesDiv.append(ramenImageTag);
}

function getRamenObjects() {
  fetch("https://phase-1-mock-cc-ramen-rater-jsonserver.onrender.com/ramens", {
    header: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((arrayObj) => {
      latestIdValue = arrayObj.length;
      arrayObj.forEach((obj) => {
        createImages(obj);
      });
    })
    .catch((error) => {
      console.log("error: ", error.message);
    });
}

function ramenImageClick(e) {
  let ramenDetailDiv = document.querySelector("#ramen-detail");
  console.log("ramenImageClick() function called");

  let ramenId = e.target.id;
  console.log("ramenId: ", ramenId);
  // Make a fetch() using e.target.id:

  fetch(`https://phase-1-mock-cc-ramen-rater-jsonserver.onrender.com/ramens/${ramenId}`, {
    header: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((obj) => {
      console.log("obj: ", obj);
      // HTML elements already present on the page:
      // Clear 'ramenDetailDiv' so we can populate it ourselves:
      console.log("ramenDetailDiv BEFORE clear: ", ramenDetailDiv);
      ramenDetailDiv.innerHTML = "";
      let ratingHeader = ramenDetailDiv.nextElementSibling;
      let commentParagraph =
        ratingHeader.nextElementSibling.nextElementSibling.nextElementSibling;

      console.log("ratingHeader: ", ratingHeader);
      console.log("commentParagraph: ", commentParagraph);

      // HTML elements to create:
      let ramenImageTag = document.createElement("img");
      let ramenNameHeader = document.createElement("h2");
      let ramenRestaurantHeader = document.createElement("h3");
      let breakTag = document.createElement("br");
      let deleteButton = document.createElement("button");

      let ramenId = obj.id;
      let ramenName = obj.name;
      let ramenRestaurant = obj.restaurant;
      let ramenImage = obj.image;
      let ramenRating = obj.rating;
      let ramenComment = obj.comment;

      ramenImageTag.src = ramenImage;
      ramenImageTag.classList.add("detail-image");
      ramenImageTag.id = ramenId;
      ramenNameHeader.textContent = ramenName;
      ramenNameHeader.classList.add("name");
      ramenRestaurantHeader.textContent = ramenRestaurant;
      ramenRestaurantHeader.classList.add("class");
      ramenImageTag.addEventListener("click", ramenImageClick);
      ratingHeader.textContent = ramenRating;
      commentParagraph.textContent = ramenComment;
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", deleteButtonClick);
      commentParagraph.append(breakTag);
      commentParagraph.append(deleteButton);

      ramenDetailDiv.append(
        ramenImageTag,
        ramenNameHeader,
        ramenRestaurantHeader
      );
    })
    .catch((error) => {
      console.log("error: ", error.message);
    });
}

function deleteButtonClick(e) {
  let ramenMenuDiv = document.querySelector("#ramen-menu");
  console.log("deleteButtonClick() function called");
  e.preventDefault();
  // console.log("e: ", e);
  // console.log("e.target: ", e.target);
  // console.log("e.target.parentElement: ", e.target.parentElement);
  // console.log("e.target.parentElement.parentNode: ", e.target.parentElement.parentNode);
  let imageId = document.querySelector(".detail-image").id;
  console.log("imageId: ", imageId);

  // NOTE: This is a non-persistent delete, so I am not deleting using a fetch() in this case, but am just deleting the image node from the '#ramen-menu' div:
  let imageTags = ramenMenuDiv.querySelectorAll("img");
  console.log("imageTags: ", imageTags);

  // NOTE: Used this StackOverflow post to get the idea to use the spread operator to convert the node list into an array:
  // https://stackoverflow.com/questions/32765157/filter-or-map-nodelists-in-es6
  let filteredImageArray = [...imageTags].filter((image) => {
    console.log("image from querySelectorAll(): ", image);
    console.log("imageId from 'detail-image' based image: ", imageId);
    console.log("image.id !== imageId: ", image.id !== imageId);
    return image.id !== imageId;
  });

  console.log("imageTags after .filter(): ", imageTags);
  console.log("filteredImageArray: ", filteredImageArray);
  // Clear 'ramenMenu' div:
  ramenMenuDiv.innerHTML = "";

  filteredImageArray.forEach((filteredImage) => {
    ramenMenuDiv.append(filteredImage);
  });

  clearCentralImageInfo();
}

function clearCentralImageInfo() {
  let ramenDetailDiv = document.querySelector("#ramen-menu");
  let ratingHeader = ramenDetailDiv.nextElementSibling;
  let commentParagraph =
    ratingHeader.nextElementSibling.nextElementSibling.nextElementSibling;
  // HTML elements to create:
  let ramenImageTag = document.createElement("img");
  let ramenNameHeader = document.createElement("h2");
  let ramenRestaurantHeader = document.createElement("h3");
  let breakTag = document.createElement("br");
  let deleteButton = document.createElement("button");

  let ramenName = "Insert Name Here";
  let ramenRestaurant = "Insert Restaurant Here";
  let ramenImage = "./assets/image-placeholder.jpg";
  let ramenRating = "Insert rating here / 10";
  let ramenComment = "Insert comment here";

  ramenImageTag.src = ramenImage;
  ramenImageTag.classList.add("detail-image");
  ramenImageTag.alt = "Insert Name Here";
  ramenNameHeader.textContent = ramenName;
  ramenNameHeader.classList.add("name");
  ramenRestaurantHeader.textContent = ramenRestaurant;
  ramenRestaurantHeader.classList.add("class");
  ramenImageTag.addEventListener("click", ramenImageClick);
  ratingHeader.textContent = ramenRating;
  commentParagraph.textContent = ramenComment;
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", deleteButtonClick);
  commentParagraph.append(breakTag);
  commentParagraph.append(deleteButton);

  ramenDetailDiv.append(ramenImageTag, ramenNameHeader, ramenRestaurantHeader);
}

function createButtonClick(e) {
  e.preventDefault();
  console.log("createButtonClick() function called");
  console.log("e: ", e);
  console.log("e.target: ", e.target);
  let createForm = e.target.parentNode;
  let newRamenName = createForm[0].value;
  let newRestaurantName = createForm[1].value;
  let newImage = createForm[2].value;
  let newRating = createForm[3].value;
  let newComment = createForm[4].value;

  console.log("newRamenName: ", newRamenName);
  console.log("newRestaurantName: ", newRestaurantName);
  console.log("newImage: ", newImage);
  console.log("newRating: ", newRating);
  console.log("newComment: ", newComment);

  let newRamenObj = {};

  // Add 1 to 'latestIdValue' to get the last id value present:
  latestIdValue++;

  newRamenObj.id = latestIdValue;
  newRamenObj.name = newRamenName;
  newRamenObj.restaurant = newRestaurantName;
  newRamenObj.image = newImage;
  newRamenObj.rating = newRating;
  newRamenObj.comment = newComment;

  console.log("newRamenObj before fetch(): ", newRamenObj);
  console.log("newRamenObj.id: ");
  console.log("newRamenObj.name: ", newRamenObj.name);
  console.log("newRamenObj.restaurant", newRamenObj.restaurant);
  console.log("newRamenObj.image: ", newRamenObj.image);
  console.log("newRamenObj.rating: ", newRamenObj.rating);
  console.log("newRamenObj.comment: ", newRamenObj.comment);

  createImages(newRamenObj);

  fetch("https://phase-1-mock-cc-ramen-rater-jsonserver.onrender.com/ramens", {
    header: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      id: newRamenObj.id,
      name: newRamenObj.name,
      restaurant: newRamenObj.restaurant,
      image: newRamenObj.image,
      rating: newRamenObj.rating,
      comment: newRamenObj.comment,
    }),
  }).catch((error) => {
    console.log("error: ", error.message);
  });
}
