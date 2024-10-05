//loading pets
const loadPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => displayPets(data.pets))
        .catch((error) => console.log(error));
};

//load category wise
const loadCategories = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then((res) => res.json())
        .then((data) => displayPets(data.data))
        .catch((error) => console.log(error));
};
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
//display modal info
const showModalInfo = (petData) => {
    document.getElementById('modal-container').innerHTML = "";
    const card = document.createElement('div');
    card.classList = 'card card-compact';
    card.innerHTML = `
        <div class="">
                    <figure class ="h-[200px] w-[300px] relative">
                      <img
                        src= ${petData.image}
                        alt="Pets" />
                    </figure>
                    <div class="">
                      <h2 class="card-title">${petData.pet_name}</h2>
                      <p>Breed: ${petData.breed}</p>
                      <p>Birth: ${petData.date_of_birth}</p>
                      <p>Gender: ${petData.gender}</p>
                      <p>Price: ${petData.price}</p>
                    </div>
                    <div class="">
                      <h2 class="text-xl font-bold">Details Information</h2>
                      <p>${petData.pet_details}</p>
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
    document.getElementById('liked-images').innerHTML = `
    <img class="h-[200px] w-[300px] p-3" src= ${petData.image} alt="Pets" />`;
}
//changing pets
document.getElementById('cat').addEventListener('click', function () {
    loadCategories('cat');
});
document.getElementById('dog').addEventListener('click', function () {
    loadCategories('dog');
});
document.getElementById('rabbit').addEventListener('click', function () {
    loadCategories('rabbit');
});
document.getElementById('bird').addEventListener('click', function () {
    loadCategories('bird');
});

// const buttonsClicked = (id) => {
//     document.getElementById(id).addEventListener('click',function(){

//     });
// }
//display Pets
const displayPets = (pets) => {
    const petsContainer = document.getElementById('pets');
    petsContainer.innerHTML = ''
    if (pets.length === 0) {
        petsContainer.classList.remove("grid");
        petsContainer.innerHTML = `<div class="hero">
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
        <div class="card card-compact bg-base-100 w-96 mx-auto shadow-xl p-5 space-y-3">
                    <div>
                        <img class="rounded-xl min-w-full" src=${pet.image} alt="" />
                    </div>
                    <div class="space-y-3">
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
                        <div class="card-actions justify-between gap-3">
                        <button onclick="loadImages(${pet.petId})" class="btn">Like</button>
                        <button class="btn">Adopt</button>
                        <button onclick="loadModalInfo(${pet.petId})" class="btn">Details</button>
                        </div>
                    </div>
                    </div>
        `
        petsContainer.append(card);

    })
}
loadPets();
// function openSection() {
//      document.getElementById("adopt-section").style.display = 'block';
// }
// document.getElementById('view-more').addEventListener('click',function(){
//     document.getElementById('view-more').style.display = 'block';
// })
// {
//     "petId": 1,
//     "breed": "Golden Retriever",
//     "category": "Dog",
//     "date_of_birth": "2023-01-15",
//     "price": 1200,
//     "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
//     "gender": "Male",
//     "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
//     "vaccinated_status": "Fully",
//     "pet_name": "Sunny"
// }


[
    {
        "petId": 2,
        "breed": "Siamese",
        "category": "Cat",
        "date_of_birth": "2022-09-05",
        "price": 800,
        "image": "https://i.ibb.co.com/3Wzz41D/pet-2.jpg",
        "gender": "Female",
        "pet_details": "This affectionate female Siamese cat is known for her vocal nature and love for attention. Born on September 5, 2022, she enjoys interactive play and snuggles. Fully vaccinated and priced at $800, she's the perfect fit for cat lovers who appreciate an intelligent, engaging, and sociable feline companion.",
        "vaccinated_status": "Fully",
        "pet_name": "Mia"
    },
    {
        "petId": 6,
        "breed": "Bengal",
        "category": "Cat",
        "price": 950,
        "image": "https://i.ibb.co.com/PFbWMGk/pet-6.jpg",
        "gender": "Male",
        "pet_details": "This playful male Bengal cat, born on November 10, 2022, is full of energy and loves to climb and engage with toys. Fully vaccinated and priced at $950, he's ideal for active households looking for a curious and adventurous feline friend.",
        "vaccinated_status": "Fully",
        "pet_name": "Leo"
    },
    {
        "petId": 7,
        "breed": "Bengal",
        "category": "Cat",
        "date_of_birth": "2022-11-10",
        "price": 950,
        "image": "https://i.ibb.co.com/QXbXctF/pet-7.jpg",
        "gender": "Male",
        "pet_details": "This male Bengal cat, born on November 10, 2022, is energetic and playful. He loves exploring, climbing, and playing with interactive toys. Fully vaccinated and priced at $950, he's perfect for anyone looking for an active, intelligent, and lively cat.",
        "vaccinated_status": null,
        "pet_name": "Max"
    },
    {
        "petId": 17,
        "breed": "Maine Coon",
        "category": "Cat",
        "date_of_birth": "2022-12-01",
        "price": 1200,
        "image": "https://i.ibb.co.com/85w4kSt/pet-17.jpg",
        "gender": "Male",
        "pet_details": "This majestic male Maine Coon, born on December 1, 2022, is known for his gentle demeanor and friendly personality. Fully vaccinated and priced at $1200, he's great with families and other pets.",
        "vaccinated_status": "Fully",
        "pet_name": "Thor"
    }
]