import React from 'react';
import FormValidator from './FormValidator.js';

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

const validationMap = new Map();

export const withValidation = (name) => (Component) => (props) => {
  const form = document.querySelector(`form[name="${name}"]`);
  console.log(form);
  if (form && !validationMap.has(name)) {
    new FormValidator(validationConfig, form).enableValidation();
    validationMap.set(name, true);
  }
  return <Component {...props} />;
};
