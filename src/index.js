const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollect = document.getElementById('toy-collection')
let addToy = false

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", () => {
  hideForm()
  initializeForm()
  getAllToys()
})


function hideForm(){
  addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})
}


function initializeForm(){
  let form = document.querySelector(".add-toy-form");
  form.addEventListener("submit", handleFormSubmission)
}

function handleFormSubmission(e) {
  e.preventDefault()
  let formData = {
    name: document.getElementById("name-input").value,
    image: document.getElementById("image-input").value,
    likes: 0
  }

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then (response => {
    createToyCard(formData)
  })
  .catch(error => {
    alert("Server down! Porkchop Sandwiches!")
  })

}

function getAllToys(){
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => {
    toys.forEach(toy => {
      createToyCard(toy)
    })
  })
}

function createToyCard(toy) {
  let div = createToyDiv()
  let h2 = createToyH2(toy)
  div.appendChild(h2)
  let img = createToyImg(toy)
  div.appendChild(img)
  let pTag = createToyP(toy)
  div.appendChild(pTag)
  let btn = createToyBtn(toy)
  div.appendChild(btn)

  toyCollect.appendChild(div)
}

function createToyDiv(){
  let div = document.createElement("div");
  div.classList.add('card');
  return div;
}

function createToyH2(toy){
  let h2 = document.createElement("h2");
  h2.innerText = toy.name
  return h2;
}

function createToyImg(toy) {
  let img = document.createElement("IMG");
  img.classList.add("toy-avatar");
  img.src = toy.image
  return img;
}

function createToyP(toy) {
  let pTag = document.createElement("p");
  let like;
  if (toy.likes === 1 || toy.likes === -1){
    like = "Like"
  }
  else {
    like = "Likes"
  }
  pTag.innerText = `${toy.likes} ${like}`
  return pTag;
}

function createToyBtn(toy) {
  let btn = document.createElement("button")
  btn.classList.add("like-btn");
  btn.id = `toy-${toy.id}`;
  btn.innerText = "Like ❤️"
  btn.addEventListener("click", updateLikes)
  return btn;
}

function updateLikes(e) {
  let id = e.currentTarget.id.split("-")[1];
  const likesPTag =  e.currentTarget.parentElement.querySelector("p");
  // the below long query pulls in the current like and we are adding +1
  let updatedLikes = ++likesPTag.innerText.split(" ")[0];


  let formData = {likes: updatedLikes};

  fetch(`http://localhost:3000/toys/${id}`, {
  method: "PATCH",
  headers:
  {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify(formData)
  })
  .then(response => {
    let likeText;
    if (updatedLikes === 1 || updatedLikes === -1){
      likeText = "Like"
    }
    else {
      likeText = "Likes"
    }
    likesPTag.innerText = `${updatedLikes} ${likeText}`

  })
}
