import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardsContainer = document.querySelector(".cards__list");

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template", (name, link) =>
    openImagePopup(name, link),
  );
  const cardElement = card.getView();
  cardsContainer.append(cardElement);
});

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template", (name, link) =>
    openImagePopup(name, link),
  );

  const cardElement = card.getView();
  document.querySelector(".cards").append(cardElement);
});

const imageModal = document.getElementById("image-popup");
const imageModalClose = imageModal.querySelector(".popup__close");
const modalImage = imageModal.querySelector(".popup__image");
const modalCaption = imageModal.querySelector(".popup__caption");

const editPopup = document.getElementById("edit-popup");
const editCloseButton = editPopup.querySelector(".popup__close");
const editForm = document.getElementById("edit-profile-form");
const nameInput = editPopup.querySelector("#profile-name");
const descriptionInput = editPopup.querySelector("#profile-description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");

const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector("#new-card-popup");
const addForm = document.getElementById("new-card-form");
const addPopupClose = addPopup.querySelector(".popup__close");

editButton.addEventListener("click", handleOpenEditModal);

function createCard(cardData) {
  return new Card(cardData, "#card-template", (name, link) =>
    openImagePopup(name, link),
  );
}

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const editFormValidator = new FormValidator(validationConfig, editForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, addForm);
addFormValidator.enableValidation();

function openModal(popup) {
  popup.classList.add("popup_is-opened");

  document.addEventListener("keydown", closePopupOnEsc);
}

function openImagePopup(name, link) {
  openModal(imageModal);
  modalImage.src = link;
  modalImage.alt = name;
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", closePopupOnEsc);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;

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

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  document.querySelector(".cards__list").appendChild(cardElement);
});

const closeButtons = document.querySelectorAll(".popup__close");

closeButtons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    // Encontra o popup pai do botão clicado
    const popup = evt.target.closest(".popup");
    closeModal(popup);
  });
});

addButton.addEventListener("click", function () {
  openModal(addPopup);
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const titleInput = addForm.querySelector("#add-title");
  const linkInput = addForm.querySelector("#add-url");

  const cardData = {
    name: titleInput.value,
    link: linkInput.value,
  };

  const card = new Card(cardData, "#card-template");
  const cardElement = card.generateCard();
  document.querySelector(".cards").prepend(cardElement);

  addForm.reset();
  closeModal(addPopup);
}

addForm.addEventListener("submit", handleAddCardSubmit);

function closePopupOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}

// Adicionar event listeners para todos os pop-ups
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("click", closePopupOnOverlay);
});

function closePopupOnEsc(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}
