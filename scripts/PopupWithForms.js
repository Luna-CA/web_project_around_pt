class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector); // Chama o construtor da classe pai
    this._handleFormSubmit = handleFormSubmit; // Função que será executada ao enviar
    this._form = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    const inputList = this._form.querySelectorAll(".popup__input");
    const formValues = {};

    inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }
  setEventListeners() {
    super.setEventListeners(); // Chama o método da classe pai

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
  close() {
    this._form.reset();
    super.close(); // Chama o método da classe pai
  }
}
