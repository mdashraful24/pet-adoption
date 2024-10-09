//Fetch all pets and sorting
const loadAllPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => {
            document.getElementById('pets-cards').classList.remove('grid');
            document.getElementById('pets-cards').innerHTML = "";
            document.getElementById('pets-cards').innerHTML = `
            <div id="loading" class="flex flex-col justify-center items-center min-h-screen">
                <span class="loading loading-bars loading-lg"></span>
            </div>`;
            setTimeout(() => {
                displayNoPetsInfo(data.pets);
            }, 2000);
        })
        .catch((error) => console.log(error));
};
const loadPetsSorting = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => sortByAllPetsPrice(data.pets))
        .catch((error) => console.log(error));
};
//Fetch All Pet Categories
const fetchAllPetsCategory = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then((res) => res.json())
        .then((data) => displayButtonsCategories(data.categories))
        .catch((error) => console.log(error));
};
const loadAllCategories = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            document.getElementById('pets-cards').classList.remove('grid');
            removeActiveEl();
            document.getElementById(id).classList.add('bg-category');
            document.getElementById('pets-cards').innerHTML = "";
            document.getElementById('pets-cards').innerHTML = `
            <div id="loading" class="flex flex-col justify-center items-center min-h-screen">
                <span class="loading loading-bars loading-lg"></span>
            </div>`;
            setTimeout(() => {
                displayNoPetsInfo(data.data);
            }, 2000);
        })
        .catch((error) => console.log(error));
};
//Loading modal all info
const detailsModalInfo = (petId) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
        .then((res) => res.json())
        .then((data) => showDetailsModalInfo(data.petData))
        .catch((error) => console.log(error));
};
//Liked images load
const loadLikeImages = (petId) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
        .then((res) => res.json())
        .then((data) => showLikesImage(data.petData))
        .catch((error) => console.log(error));
};
//Displaying category button
const displayButtonsCategories = (categories) => {
    for (item of categories) {
        const categoryContainer = document.getElementById('btn-container');
        const btn = document.createElement('button');
        btn.innerHTML = `
            <button onclick="loadAllCategories('${item.category}')" id="${item.category}" 
            class="container-btn text-xl flex gap-2 rounded-2xl w-full px-5 py-3 items-center justify-center font-bold border border-stone-200">
                <img class="w-[30px]" src="${item.category_icon}" /> 
                ${item.category}s
            </button>`;
        categoryContainer.append(btn);
    }
};
//Remove active buttons color
function removeActiveEl() {
    const buttons = document.getElementsByClassName('container-btn');
    for (let btn of buttons) {
        btn.classList.remove('bg-category');
    }
}
//Sorting info
const sortByAllPetsPrice = (petId) => {
    petId.sort((a, b) => b.price - a.price);
    displayNoPetsInfo(petId);
}
//Display like images
const showLikesImage = (petData) => {
    const imageContainer = document.getElementById('liked-pets-images');
    const card = document.createElement('div');
    card.classList = 'card card-compact';
    card.innerHTML = `
    <div class="p-3"> <img class="rounded-xl w-full h-[200px] mx-auto" src= ${petData.image} alt="pets" /> </div>`;
    imageContainer.appendChild(card)
}
//Displaying Pets
const displayNoPetsInfo = (pets) => {
    const petsContainer = document.getElementById('pets-cards');
    document.getElementById('pets-cards').classList.add('grid');
    petsContainer.innerHTML = ''
    if (pets.length === 0) {
        petsContainer.classList.remove("grid");
        petsContainer.innerHTML = `
    <div class="mt-[0.5rem]">
        <div class="hero bg-base-200 p-5 rounded-xl">
            <div class="hero-content text-center">
                <div class="flex flex-col justify-center items-center space-y-5">
                    <img src="./assets/error.webp" alt="">
                    <h1 class="text-4xl font-bold">No Information Available</h1>
                    <p class="">This subject-related information is not available.</p>
                </div>
            </div>
        </div>
    </div>
    `;
    }
    else {
        petsContainer.classList.add('grid');
    }
    pets.forEach((pet) => {
        const card = document.createElement('div');
        card.classList = 'card card-compact';
        card.innerHTML = `
        <div class="p-2">
            <div class="card border border-stone-200">
                <div class="px-3">
                    <img src=${pet.image} class="w-full md:h-[200px] lg:h-[200px] rounded-xl mt-3" alt="">
                </div>
                <div class="card-body">
                    <div class="space-y-2 mb-2">
                        <h2 class="card-title">${pet.pet_name}</h2>
                        <div class="flex items-center gap-1">
                            <img src="./assets/frame1.png" alt="">
                            <p>Breed: ${pet.breed === undefined || pet.breed === null ? 'Not Available' : pet.breed}</p>
                        </div>
                        <div class="flex items-center gap-1">
                            <img src="./assets/frame2.png" alt="">
                            <p>Birth: ${pet.date_of_birth === undefined || pet.date_of_birth === null ? 'Not Available' : pet.date_of_birth}</p>
                        </div>
                        <div class="flex items-center gap-1">
                            <img src="./assets/frame3.png" alt="">
                            <p>Gender: ${pet.gender === undefined || pet.gender === null ? 'Not Available' : pet.gender}</p>
                        </div>
                        <div class="flex items-center gap-1">
                            <img src="./assets/frame4.png" alt="">
                            <p>Price: ${pet.price === undefined || pet.price === null ? 'Not Available' : `${pet.price}$`}</p>
                        </div>
                    </div>
                <div class="card-actions justify-around md:justify-between lg:justify-between">
                    <button onclick="loadLikeImages(${pet.petId})" class="btn bg-white hover:bg-bgPrimary hover:text-white transition-colors ease-in duration-100 border-teal-500 font-extrabold"><i
                            class="fa-regular fa-thumbs-up w-10"></i></button>
                    <button onclick="modal(); this.disabled = true;" class="btn bg-white hover:bg-bgPrimary hover:text-white transition-colors ease-in duration-100 border-teal-500 font-extrabold">Adopt</button>
                    <button onclick="detailsModalInfo(${pet.petId})"
                        class="btn bg-white hover:bg-bgPrimary hover:text-white transition-colors ease-in duration-100 border-teal-500 font-extrabold">Details</button>
                </div>
            </div>
        </div>
    </div>
    `
        petsContainer.append(card);
    })
}
loadAllPets();
fetchAllPetsCategory();
// Push first modal info
const showDetailsModalInfo = (petData) => {
    document.getElementById('modal-containers').innerHTML = "";
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
                        <p>Breed: ${petData.breed === undefined || petData.breed === null ? 'Not Available' : petData.breed}
                        </p>
                </div>
                <div class="flex items-center gap-1">
                    <img src="./assets/frame2.png" alt="">
                    <p>Birth: ${petData.date_of_birth === undefined || petData.date_of_birth === null ? "Not Available" :
            petData.date_of_birth}</p>
                </div>
                <div class="flex items-center gap-1">
                    <img src="./assets/frame3.png" alt="">
                    <p>Gender: ${petData.gender === undefined || petData.gender === null ? 'Not Available' : petData.gender}</p>
                </div>
                <div class="flex items-center gap-1">
                    <img src="./assets/frame4.png" alt="">
                    <p>Price: ${petData.price === undefined || petData.price === null ? 'Not Available' : `${petData.price}$`}</p>
                </div>
            </div>
        </div>
        <div>
            <div class="text-justify space-y-2">
                <h2 class="text-xl font-bold">Details Information</h2>
                <p>${petData.pet_details === undefined || petData.pet_details === null ? 'Not Available' : petData.pet_details}
                </p>
            </div>
        </div>
        <div>
            <button
                class="btn w-full text-lg text-teal-500 bg-teal-50 hover:bg-bgPrimary hover:text-white transition-colors ease-in duration-100">Close</button>
        </div>
    </div>
    `;
    document.getElementById('modal-containers').append(card);
    document.getElementById('showModalInfo').click();
}
// Second modal
const modal = () => {
    const modalCongrats = document.getElementById('congratsModal');
    const countdownByElement = document.getElementById('countdown');
    let counter = 3;
    modalCongrats.style.visibility = 'visible';
    modalCongrats.showModal();
    countdownByElement.textContent = counter;
    const countdownByInterval = setInterval(() => {
        counter--;
        countdownByElement.textContent = counter;
        if (counter === 0) {
            clearInterval(countdownByInterval);
            modalCongrats.style.visibility = 'hidden';
            modalCongrats.close();
        }
    }, 1000);
};
// Loading Spinner
document.getElementById('sorting').addEventListener('click', function () {
    document.getElementById('pets-cards').classList.remove('grid');
    document.getElementById('pets-cards').innerHTML = "";
    document.getElementById('pets-cards').innerHTML = `
        <div id="loading" class="flex flex-col justify-center items-center min-h-screen">
            <span class="loading loading-bars loading-lg"></span>
        </div>`;
    setTimeout(() => {
        loadPetsSorting();
    }, 2000);
});