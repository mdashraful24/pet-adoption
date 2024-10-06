//loading all pets
const loadPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayPets(data.pets))
    .catch((error) => console.log(error));
};
//loading pets for sorting
const loadPetsSorting = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => sortByPrice(data.pets))
    .catch((error) => console.log(error));
};
//loading main categories
const loadMainCategory = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    // .then((data) => console.log(data.categories))
    .then((data) => displayButtonsOnCategory(data.categories))
    .catch((error) => console.log(error));
};
//load category wise
const loadCategories = (id) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      document.getElementById(id).classList.add('active');
      displayPets(data.data)
    })
    .catch((error) => console.log(error));
};
function removeActive() {
  const buttons = document.getElementsByClassName('container-btn');
  for (let btn of buttons) {
    btn.classList.remove('active');
  }
}

//loading modal info
const loadModalInfo = (petId) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => showModalInfo(data.petData))
    .catch((error) => console.log(error));
};
//liked images
const loadImages = (petId) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => likeImage(data.petData))
    .catch((error) => console.log(error));
};


//sorting porting
const sortByPrice = (petId) => {
  petId.sort((a, b) => a.price - b.price);
  displayPets(petId);
}



//display modal info
const showModalInfo = (petData) => {
  document.getElementById('modal-container').innerHTML = "";
  const card = document.createElement('div');
  card.classList = 'card card-compact';
  card.innerHTML = `
        <div class="">
  <div class="card space-y-4">
    <div class="">
      <img src=${petData.image} class="rounded-xl w-full" alt="">
    </div>
    <div>
      <div class="space-y-2">
        <h2 class="card-title">${petData.pet_name}</h2>
        <div class="flex items-center gap-1">
          <img src="./assets/frame1.png" alt="">
          <p>Breed: ${petData.breed}</p>
        </div>
        <div class="flex items-center gap-1">
          <img src="./assets/frame2.png" alt="">
          <p>Birth: ${petData.date_of_birth}</p>
        </div>
        <div class="flex items-center gap-1">
          <img src="./assets/frame3.png" alt="">
          <p>Gender: ${petData.gender}</p>
        </div>
        <div class="flex items-center gap-1">
          <img src="./assets/frame4.png" alt="">
          <p>Price: ${petData.price}$</p>
        </div>
      </div>
    </div>
    <div>
      <div class="text-justify space-y-2">
        <h2 class="text-xl font-bold">Details Information</h2>
        <p>${petData.pet_details}</p>
      </div>
    </div>
    <div>
      <button
        class="btn w-full bg-teal-50 hover:bg-primary hover:text-white transition-colors ease-in duration-100 text-lg">Close</button>
    </div>
  </div>
        `;
  document.getElementById('modal-container').append(card);
  // console.log(petData);
  // document.getElementById('modal-container').innerHTML = `
  // <img src= ${petData.image} alt="Pets" />`;
  document.getElementById('showModalData').click();
}

//like images
const likeImage = (petData) => {
  // document.getElementById('liked-images').innerHTML = `<div>
  // <img class="h-[200px] w-[300px] p-3" src= ${petData.image} alt="Pets" />
  // </div>`;
  const imageContainer = document.getElementById('liked-images');
  const card = document.createElement('div');
  card.classList = 'card card-compact';
  card.innerHTML = `<div class="p-5 mx-auto">
  <img class="h-[190px] rounded-lg" src=${petData.image} alt="" />
</div>`;
  imageContainer.appendChild(card)

}


//displaying main categories
const displayButtonsOnCategory = (categories) => {

  for (item of categories) {
    const categoryContainer = document.getElementById('button-container');
    const btn = document.createElement('button');
    btn.classList = 'btn'
    btn.innerHTML = `<button onclick="loadCategories('${item.category}')" id="${item.category}"
    class="flex justify-between items-center font-bold gap-2 container-btn"><img class="w-[20px]"
      src="${item.category_icon}" /> ${item.category}</button>`;
    categoryContainer.append(btn);
  }
}

// {
//     "id": 1,
//     "category": "Cat",
//     "category_icon": "https://i.ibb.co.com/N7dM2K1/cat.png"
// }
//display Pets
const displayPets = (pets) => {
  const petsContainer = document.getElementById('pets');
  petsContainer.innerHTML = ''
  if (pets.length === 0) {
    petsContainer.classList.remove("grid");
    petsContainer.innerHTML = `
    <div class="hero bg-base-200 h-full py-5 rounded-xl">
  <div class="hero-content text-center">
    <div class="flex flex-col justify-center items-center space-y-5">
      <img src="./assets/error.webp" alt="">
      <h1 class="text-4xl font-bold">No Information Available</h1>
      <p class="">This subject-related information is not available.</p>
    </div>
  </div>
</div>
        `;
  }
  else {
    petsContainer.classList.add('grid');
  }
  pets.forEach((pet) => {
    //console.log(pet);
    const card = document.createElement('div');
    card.classList = 'card card-compact';
    card.innerHTML = `
        <div class="p-2">
  <div class="card shadow p-3">
    <div class="px-3"><img src=${pet.image} class="rounded-xl" alt=""></div>
    <div class="card-body">
      <div class="space-y-2">
      <h2 class="card-title">${pet.pet_name}</h2>
      <div class="flex items-center gap-1">
        <img src="./assets/frame1.png" alt="">
        <p>Breed: ${pet.breed}</p>
      </div>
      <div class="flex items-center gap-1">
        <img src="./assets/frame2.png" alt="">
        <p>Birth: ${pet.date_of_birth}</p>
      </div>
      <div class="flex items-center gap-1">
        <img src="./assets/frame3.png" alt="">
        <p>Gender: ${pet.gender}</p>
      </div>
      <div class="flex items-center gap-1">
        <img src="./assets/frame4.png" alt="">
        <p>Price: ${pet.price}$</p>
      </div>
    </div>
      <div class="card-actions justify-around md:justify-between lg:justify-between">
      <button onclick="loadImages(${pet.petId})" class="btn bg-white border-teal-100"><i class="fa-regular fa-thumbs-up"></i></button>
      <button onclick="modal()" class="btn bg-white border-teal-100 text-teal-500 font-bold">Adopt</button>
      <button onclick="loadModalInfo(${pet.petId})" class="btn bg-white border-teal-100 text-teal-500 font-bold">Details</button>
    </div>
    </div>
  </div>
</div>
        `
    petsContainer.append(card);

  })
}
loadPets();
loadMainCategory();


const modal = () => {
  const congrats = document.getElementById('congrats');
  congrats.style.visibility = 'visible';
  congrats.showModal();
  setTimeout(function () {
    congrats.style.visibility = 'hidden';
    congrats.close();
  }, 3000);
};