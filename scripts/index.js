import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import PopupWithForms from "./PopupWithForms.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";

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
const editForm = document.querySelector("#edit-profile-form");
const addForm = document.querySelector("#new-card-form");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const imagePopup = new PopupWithImage("#image-popup");
const editProfilePopup = new PopupWithForms("#edit-popup", (formData) => {
  userInfo.setUserInfo(formData);
  editProfilePopup.close();
});

const addCardPopup = new PopupWithForms("#new-card-popup", (formData) => {
  const newCard = createCard({
    name: formData.title,
    link: formData.link,
  });
  cardSection.addItem(newCard);
  addCardPopup.close();
});

function createCard(item) {
  const card = new Card(item, "#card-template", () => {
    imagePopup.open(item.name, item.link);
  });
  return card.getView();
}

const cardSection = new Section(
  {
    items: initialCards, // ← usar initialCards
    renderer: createCard,
  },
  ".cards__list",
);

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const editFormValidator = new FormValidator(validationConfig, editForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, addForm);
addFormValidator.enableValidation();

cardSection.renderItems();

editButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  editProfilePopup.open();

  editForm.querySelector("#profile-name").value = userData.name;
  editForm.querySelector("#profile-description").value = userData.job;
});

addButton.addEventListener("click", () => {
  addCardPopup.open();
});

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();
