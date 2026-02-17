const editPopup = document.getElementById("edit-popup");
const editCloseButton = editPopup.querySelector(".popup__close");
const editForm = document.getElementById("edit-profile-form");
const nameInput = editPopup.querySelector(".popup__input_type_name");
const descriptionInput = editPopup.querySelector(
  ".popup__input_type_description",
);
const editButton = document.querySelector(".profile__edit-button");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

editButton.addEventListener("click", handleOpenEditModal);

editCloseButton.addEventListener("click", function () {
  closeModal(editPopup);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;

  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileName.textContent = nameValue;
  profileDescription.textContent = descriptionValue;

  closeModal(editPopup);
}

editForm.addEventListener("submit", handleProfileFormSubmit);

function fillProfileForm() {
  const currentName = document.querySelector(".profile__title").textContent;
  const currentDescription = document.querySelector(
    ".profile__description",
  ).textContent;

  nameInput.value = currentName;
  descriptionInput.value = currentDescription;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

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

const likeButtons = document.querySelectorAll(".card__like-button");
console.log("Botões encontrados:", likeButtons.length);

likeButtons.forEach(function (button) {
  button.addEventListener("click", handleLikeClick);
});

function handleLikeClick(event) {
  const button = event.target;
  button.classList.toggle("card__like-button_active");
}
