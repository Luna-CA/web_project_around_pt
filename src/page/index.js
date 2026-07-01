import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForms from "../components/PopupWithForms.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const api = new Api(
  "https://around-api.pt-br.tripleten-services.com/v1",
  "166c673d-fa71-49aa-97f3-b5490e5739af",
);

const initialCards = await api.getCards();
console.log(initialCards);

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

const addCardPopup = new PopupWithForms("#new-card-popup", async (formData) => {
  const createAddCard = await api.addCard(formData.title, formData.link);
  console.log(createAddCard);
  const newCard = createCard({
    name: formData.title,
    link: formData.link,
    id: createAddCard._id,
  });
  cardSection.addItem(newCard);
  addCardPopup.close();
});

function popupConfirm()

function createCard(item) {
  const card = new Card(item, "#card-template", () => {
    imagePopup.open(item.name, item.link);
  }
);

  return card.getView();
}



const cardSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".cards__list",
);

const popupDelete = new PopupWithConfirmation("#popup__delete");

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
