import React from 'react';
import Popup from './Popup';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormValidation } from '../utils/useFormValidation';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const { values, errors, isValid, handleChange, setValue, reset, formRef } =
    useFormValidation();
  const currentUser = React.useContext(CurrentUserContext);

  // const [name, setName] = React.useState('');
  // const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    if (currentUser) {
      setValue('userName', currentUser.name);
      setValue('userDescription', currentUser.about);
    }

    // setName(currentUser.name);
    // setDescription(currentUser.about);
  }, [currentUser, setValue]);

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: values['userName'],
      about: values['userDescription'],
      // name,
      // about: description,
    });
  }

  const errorClassName = (name) =>
    `popup__input-error ${errors[name] ? 'popup__input-error_active' : ''}`;

  const onClosePopup = () => {
    onClose();
    reset({ userName: currentUser.name, userDescription: currentUser.about });
  };

  return (
    <Popup isOpen={isOpen} onClose={onClosePopup} name="edit">
      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={onClosePopup}
        onSubmit={handleSubmit}
        btnText="Сохранить"
        isValid={isValid}
        ref={formRef}
      >
        <label className="popup__label">
          <input
            className="popup__input"
            type="text"
            name="userName"
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
            onChange={handleChange}
            value={values['userName'] ?? ''}
            // (e) => setName(e.target.value)
          />
          <span className={`name-error ${errorClassName('userName')}`}>
            {errors['userName']}
          </span>
        </label>
        <label className="popup__label">
          <input
            className="popup__input"
            type="text"
            name="userDescription"
            placeholder="О себе"
            required
            minLength="2"
            maxLength="200"
            onChange={handleChange}
            value={values['userDescription'] ?? ''}
          />
          <span className={`about-error ${errorClassName('userDescription')}`}>
            {errors['userDescription']}
          </span>
        </label>
      </PopupWithForm>
    </Popup>
  );
}

export default EditProfilePopup;
