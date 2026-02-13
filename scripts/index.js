const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

console.log("Array initialCards:", initialCards);

initialCards.forEach(function (cardData) {
  console.log(cardData.name);
  console.log(cardData.link);
});

function createCard(cardData) {
  const cardElement = document.createElement("li");
  cardElement.classList.add("card");

  cardElement.innerHTML = `
    <img class="card__image" src="${cardData.link}" alt="${cardData.name}" />
    <button aria-label="Excluir cartão" class="card__delete-button" type="button"></button>
    <div class="card__description">
      <h2 class="card__title">${cardData.name}</h2>
      <button aria-label="Botão de curtir" class="card__like-button" type="button"></button>
    </div>
  `;
  return cardElement;
}

const cardsContainer = document.querySelector(".cards__list");
initialCards.forEach(function (cardData) {
  const newCard = createCard(cardData);
  cardsContainer.appendChild(newCard);
});

function handleLikeClick(event) {
  const button = event.target;
  button.classList.toggle("card__like-button_active");
}

const likeButtons = document.querySelectorAll(".card__like-button");
console.log("Botões encontrados:", likeButtons.length);

likeButtons.forEach(function (button) {
  button.addEventListener("click", handleLikeClick);
});
