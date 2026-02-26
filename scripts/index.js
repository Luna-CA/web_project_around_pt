const imageModal = document.getElementById("image-popup");
const imageModalClose = imageModal.querySelector(".popup__close");
const modalImage = imageModal.querySelector(".popup__image");
const modalCaption = imageModal.querySelector(".popup__caption");

const editPopup = document.getElementById("edit-popup");
const editCloseButton = editPopup.querySelector(".popup__close");
const editForm = document.getElementById("edit-profile-form");
const nameInput = editPopup.querySelector(".popup__input_type_name");
const descriptionInput = editPopup.querySelector(
  ".popup__input_type_description",
);
const editButton = document.querySelector(".profile__edit-button");

const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector("#new-card-popup");
const addForm = document.getElementById("new-card-form");
const addPopupClose = addPopup.querySelector(".popup__close");

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
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

function getCardElement(cardData = {}) {
  const name = cardData.name || "Lugar sem nome";
  const link = cardData.link || "./images/placeholder.jpg";

  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  cardImage.addEventListener("click", function () {
    modalImage.src = link;
    modalImage.alt = name;
    modalCaption.textContent = name;
    openModal(imageModal);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", handleLikeClick);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  return cardElement;
}

imageModalClose.addEventListener("click", function () {
  closeModal(imageModal);
});

function renderCard(cardData, container) {
  const cardElement = getCardElement(cardData);
  container.prepend(cardElement);
}

const cardsContainer = document.querySelector(".cards__list");

initialCards.forEach((cardData) => {
  renderCard(cardData, cardsContainer);
});

function handleLikeClick(event) {
  const button = event.target;
  button.classList.toggle("card__like-button_active");
}

addButton.addEventListener("click", function () {
  openModal(addPopup);
});

addPopupClose.addEventListener("click", function () {
  closeModal(addPopup);
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const titleInput = addForm.querySelector(".popup__input_type_card-name");
  const linkInput = addForm.querySelector(".popup__input_type_url");

  const newCard = {
    name: titleInput.value,
    link: linkInput.value,
  };

  renderCard(newCard, cardsContainer);

  addForm.reset();
  closeModal(addPopup);
}

addForm.addEventListener("submit", handleAddCardSubmit);
