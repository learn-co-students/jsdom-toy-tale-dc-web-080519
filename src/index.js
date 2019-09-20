// Store page elements as constants
const toyURL = "http://localhost:3000/toys"
const addBtn = document.querySelector('#new-toy-btn')
const toyFormDiv = document.querySelector('.container')
const toyForm = document.querySelector('.add-toy-form')
const toyCollection = document.querySelector('#toy-collection')
let addToy = false

// Switch add toy form on and off
addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyFormDiv.style.display = 'block'
    addBtn.innerText = "Hide this form"
  } else {
    toyFormDiv.style.display = 'none'
    addBtn.innerText = "Add a new toy!"
  }
})

// Create and append new toy when submitted
toyForm.addEventListener("submit", (e) => { 
  e.preventDefault();
  // store data
  const name = e.target.name.value;
  const image = e.target.image.value;
  // store fetch configs
  const newToyConfigs = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": image,
      "likes": 0
    })
  }
  // post data to server
  fetch(toyURL, newToyConfigs)
  .then(response => response.json())
  .then(toy => {
    const card = createCard(toy);
    toyCollection.appendChild(card)
  })
  // if post is successful, make a new card
  // if error, throw an alert
})

// Populate page with toy cards
fetch(toyURL)
.then(response => response.json())
.then(toys => {
  for (const toy of toys) {
    const card = createCard(toy); // helper method to make card for each toy
    toyCollection.appendChild(card) // add each card to the div
  }
})
.catch(error => {
  toyCollection.innerText = 'Aw beans the server is down';
  console.log(error.message);
})

// Populate and return card for a given toy
function createCard(toy) {
  // set up basic element
  const card = document.createElement("div");
  card.className = "card";
  card.id = toy.id
  // helper methods to populate card w/ desired elements
  card.appendChild(setName(toy));
  card.appendChild(setImage(toy));
  card.appendChild(setLikeCount(toy));
  card.appendChild(setLikeButton(toy));
  return card;
}

// Return a populated h2 element with name
function setName(toy) {
  const name = document.createElement("h2");
  name.innerText = toy.name;
  return name;
}

// Return a populated img element
function setImage(toy) {
  const toyImage = document.createElement("img");
  toyImage.src = toy.image;
  toyImage.className = "toy-avatar";
  return toyImage;
}

// Return a populated like count
function setLikeCount(toy) {
  const likeCount = document.createElement("p");
  likeCount.className = "like-count"
  likeCount.innerText = `${toy.likes} likes`;
  return likeCount;
}

// Return populated & responsive button
function setLikeButton(toy) {
  const likeButton = document.createElement("button");
  likeButton.className = "like-btn";
  likeButton.innerText = "Like ♥"
  likeButton.addEventListener('click', incrementLikes); // helper method
  return likeButton;
}

// Increase a toy's like count by 1
function incrementLikes(e) {
  // get target toy for capturing ID & current like count
  const toy = e.target.parentElement
  const toyId = toy.id
  const currentLikes = toy.querySelector('.like-count').innerText.slice(0, -6)
  // configure params for patch request
  const newLikes = Number(currentLikes) + 1
  const likeConfigs = {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({"likes": newLikes})
  }
  // send patch request to server
  fetch(`http://localhost:3000/toys/${toyId}`, likeConfigs)
  .then(response => response.json())
  .then(result => {
    toy.querySelector('.like-count').innerText = `${newLikes} likes`
  })
  .catch(error => {
    alert('Aw beans the server is down');
    console.log(error.message);
  })
}

