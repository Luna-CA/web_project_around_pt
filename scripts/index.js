import Card from "./Card.js";

const imageModal = document.getElementById("image-popup");
const imageModalClose = imageModal.querySelector(".popup__close");
const modalImage = imageModal.querySelector(".popup__image");
const modalCaption = imageModal.querySelector(".popup__caption");

const editPopup = document.getElementById("edit-popup");
const editCloseButton = editPopup.querySelector(".popup__close");
const editForm = document.getElementById("edit-profile-form");
const nameInput = editPopup.querySelector("#profile-name");
const descriptionInput = editPopup.querySelector("#profile-description");
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

function createCard(cardData) {
  const card = new Card(cardData, "#card-template");
  return card.generateCard();
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  document.querySelector(".cards").appendChild(cardElement);
});

imageModalClose.addEventListener("click", function () {
  closeModal(imageModal);
});

addButton.addEventListener("click", function () {
  openModal(addPopup);
});

addPopupClose.addEventListener("click", function () {
  closeModal(addPopup);
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

document.addEventListener("keydown", closePopupOnEsc);
