//loading pets
const fetchAllPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => displayPets(data.pets))
        .catch((error) => console.log(error));
};

document.getElementById('cat').addEventListener('click', function () {
    loadCategories('cat');
});
//load category wise
const fetchAllPetsCategories = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then((res) => res.json())
        .then((data) => displayPets(data))
        .catch((error) => console.log(error));
};


const displayPets = (pets) => {
    const petsContainer = document.getElementById('pets');
    pets.forEach((pet) => {
        //console.log(pet);
        const card = document.createElement('div');
        card.classList = 'card card-compact py-5';
        card.innerHTML = `
        <div class="card card-compact bg-base-100 w-96 shadow-xl px-10 py-5">
                    <figure class ="h-[200px] w-[300px] relative">
                      <img
                        src= ${pet.image}
                        alt="Pets" />
                    </figure>
                    <div class="">
                      <h2 class="card-title">${pet.pet_name}</h2>
                      <p>Breed: ${pet.breed}</p>
                      <p>Birth: ${pet.date_of_birth}</p>
                      <p>Gender: ${pet.gender}</p>
                      <p>Price: ${pet.price}</p>
                      <div class="card-actions justify-center py-3">
                        <button class="btn btn-primary">Like</button>
                        <button class="btn btn-primary">Adopt</button>
                        <button class="btn btn-primary">Details</button>
                      </div>
                    </div>
                  </div>
        `
        petsContainer.append(card);

    })
}
fetchAllPets();