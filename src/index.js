const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", function(){
  console.log("Content Loaded");


  getToys();
  initializeForm();

})

function initializeForm(){
  let form = document.querySelector(".add-toy-form");
  form.addEventListener("submit", handleFormSubmission)
}

function handleFormSubmission(e) {
  e.preventDefault();
  let toyCollect = document.getElementById("toy-collection");

  let formInfo = {
    name: document.querySelector(".name-input").value,
    image: document.querySelector(".img-input").value,
    likes: 0
  }

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formInfo)
  })
  .then(res => {
    renderToy(formInfo);
  })
}

function renderToy(toy) {
  let toyCollect = document.getElementById("toy-collection");

      let div = document.createElement("div");
      div.className = "card";
      div.id = toy.id;

      let h2 = document.createElement("h2");
      h2.innerText = toy.name;
      div.appendChild(h2);

      let img = document.createElement("IMG");
      img.src = toy.image
      img.className = "toy-avatar";

      div.appendChild(img);
// debugger
      let amountOfLikes = document.createElement("p");
      // p.className = "";
      amountOfLikes.innerText = toy.likes;
      div.appendChild(amountOfLikes);

      let likeButton = document.createElement("button");
      likeButton.className = "like-btn";
      likeButton.innerText = "Like <3";
      likeButton.addEventListener("click", handleLike);
      div.appendChild(likeButton);


      // div.addEventListener("click", deleteToy);

      toyCollect.appendChild(div);
    }

function getToys() {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toyObjArr => {
    toyObjArr.forEach(function(toy){
      renderToy(toy);
    })
  })
}

function handleLike(e){
let updatedLikes = parseInt(e.target.parentElement.querySelector("p").innerText) + 1;
let likesId = parseInt(e.target.parentElement.id);
let ptag = e.target.parentElement.querySelector("p");
  fetchLikes(updatedLikes, likesId, ptag);
}

function fetchLikes(updatedLikes, likesId, ptag){

  fetch("http://localhost:3000/toys" + "/" + likesId, {
    method: "PATCH",
    headers:{
      "Content-Type": "application/json",
      "Accept": "application/json"    },
    body: JSON.stringify({likes: updatedLikes})
  })
  .then(res => res.json())
  .then( updateToy => {
    // debugger
    ptag.innerText = updatedLikes;
  })
}

// function deleteToy(e){
//   wholeCard = e.currentTarget;
//   toyid = wholeCard.id;
//
//   fetch(`http://localhost:3000/toys/${toyid}`, {
//     method: "DELETE"
//   })
//   .then(resp => {
//     wholeCard.remove();
//   })
// }


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})
