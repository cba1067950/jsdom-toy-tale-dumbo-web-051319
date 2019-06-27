const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false


// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", function(){
  fetch("http://localhost:3000/toys")
      .then(promise => promise.json())
      .then(slapToyToDOM)
})

function createDiv(toy){
  const div = document.createElement('div');
  div.className = "card";
  div.textContent = toy.name;
  const zero = 0;
  const like = document.querySelector('query')
  div.innerHTML = `
    <img src="${toy.image}" class="toy-avatar"></img>
    <h2>${toy.name}</h2>
    <!-- //  toDoItem.done ? "checked" : ""   -->

    <button data-id="${toy.id}" data-likes="${toy.likes}" id="like-btn-${toy.id}"  class="like-btn">Like ${toy.likes}</button>
    `;
  div.querySelector(".like-btn").addEventListener("click", updateLike)
  document.querySelector("#toy-collection").append(div);
}

function updateDom(data){
  // const pTag = document.createElement('p')
  const like = document.querySelector("#like-btn-" + data.id)
  like.innerText = `Like ${data.likes}`
  like.dataset.likes = data.likes
}

function updateLike(event){

  const id = event.target.dataset.id
  let like = (event.target.dataset.likes)
  like = parseInt(like);
  like += 1;

  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      likes: like
    })
  }).then(response => response.json())
    .then(updateDom)
}

function slapToyToDOM(data){
  const ol = document.createElement('ol');
  data.forEach(createDiv);
}

function slapOneToyToDOM(data){
  const ol = document.createElement('ol');
  createDiv(data)
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    const createButton = document.querySelector(".submit");
    const form = document.querySelector(".add-toy-form")
    createButton.addEventListener("click", function(event){
      event.preventDefault();
      fetch("http://localhost:3000/toys", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "name": form.name.value,
            "image": form.image.value,
            "likes": 0
          })
      })
        .then(promise => promise.json())
        .then(data => slapOneToyToDOM(data))

    })

  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
