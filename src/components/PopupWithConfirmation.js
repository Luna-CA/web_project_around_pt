import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setAction(callback) {
    this._handleSubmit = callback;
  }
  setEventListeners() {
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}
