const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
let addToy = false

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", function(){
  console.log("To infinity, and beyond!")
  const toysURL = "http://localhost:3000/toys"
  fetchToys(toysURL)
  console.log("There's a snake in my boot")
})


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// GET request to fetch all toy objects
function fetchToys(url){
  fetch(url)
  .then(res => res.json())
  .then(data => toysData(data))
}

// iterate through array of all toys
const toysData = (toysArray) => {
  toysArray.map(toy => createCard(toy))
}

// create div for each toy card
const createCard = (toy) => {
  let div = document.createElement("div")
  div.class = "card"
  toyCollection.appendChild(div)
  debugger
  let h2 = document.createElement("h2")
  let img = document.createElement("img")
  addToyInfo(toy, div)
}

// render toy card
const addToyInfo = (div, toy) => {
  div.id = toy.id
  let
  div.h2 = toy.name
  div.
}
