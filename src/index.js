const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

function toggleForm() {
    addToy = !addToyif (addToy) {
        toyForm.style.disply = 'block'
    } else {
      toyForm.stlye.disply = 'none'
    }
}

const url = "www.reddit.com"

function displayToys(toyArray) {
  toyArray.forEach(toy => {
    addToyCard(toy)
  })
}

  function addToyCard(toy) {
    
  }

function getToys( {
  fetch(url)
  .then(res => res.json())
  .then(console.log)
})


// OR HERE!
