const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// loading these functions as the page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  initializeForm();

})

// makes the button work
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

function initializeForm(){
  let form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmission)
}

function handleFormSubmission(e){
  e.preventDefault()
  let formData = {
    name: document.querySelector("#name-input").value,
    image: document.querySelector("#image-input").value,
    likes: 0
  }
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then(res => {
    renderToys(formData)
  })
  .catch(error => {
    alert("Server down, please try again later.")
  })
}

// rendering all the new goodies
function renderToys(toyObj){
  // initialize toy div with "card" class
  let toyCard = document.createElement("div");
  toyCard.classList.add("card")

  // work on name of toy
  let toyName = document.createElement("h2");
  toyName.innerText = toyObj.name

  // work on toy image
  let toyImage = document.createElement("img")
  toyImage.src = toyObj.image
  toyImage.setAttribute("class", "toy-avatar")

  // work on toy likes
  let toyLikes = document.createElement("p")
  toyLikes.innerText = `${toyObj.likes} Likes`

  // work on toy button
  let toyButton = document.createElement("button")
  toyButton.innerText = `♡♡♡♡`
  toyButton.setAttribute("class", "like-btn")

  // add pieces to toy card
  toyCard.append(toyName, toyImage, toyLikes, toyButton)

  // add card to container (container is already on the page)
  let toyContainer = document.querySelector("#toy-collection")
  toyContainer.appendChild(toyCard)
}

// fetches info from API and makes each value in the array its own toyObject, which passes through the renderToys function above for each item (in the forEach loop)
function fetchToys(){
  fetch("http://localhost:3000/toys")
  .then( response => response.json())
  .then( toyArray => {
    toyArray.forEach(toyObj => {
      renderToys(toyObj)
    })
  })
}
