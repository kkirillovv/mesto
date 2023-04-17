function showInputError(formElement, inputElement, validator, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validator.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validator.errorClass);
}

function hideInputError(formElement, inputElement, validator) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validator.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(validator.errorClass);
}

function resetError(formElement, validator) {
  const inputList = Array.from(formElement.querySelectorAll(validator.inputSelector));
  const buttonElement = formElement.querySelector(validator.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validator);
  });
  toggleButtonState(inputList, buttonElement, validator);
}

function checkInputValidity(formElement, inputElement, validator) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, validator, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, validator);
  }
}

function setEventListeners(formElement, validator) {
  const inputList = Array.from(formElement.querySelectorAll(validator.inputSelector));
  const buttonElement = formElement.querySelector(validator.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validator);
      toggleButtonState(inputList, buttonElement, validator);
    });
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, validator) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validator.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validator.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function enableValidation(validator) {
  const formList = Array.from(document.querySelectorAll(validator.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(validator.setSelector));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet, validator);
    }); 
  });
}