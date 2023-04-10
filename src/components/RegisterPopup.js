import Popup from './Popup';

function RegisterPopup({ onClose, isOpenOk, isOpenError }) {
  return (
    <Popup
      isOpen={isOpenOk || isOpenError}
      onClose={onClose}
      name="registerPopup"
    >
      <div className="popup__container">
        <button
          className={'popup__close'}
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        />
        <div
          className={`popup__reg-img ${
            isOpenError ? 'popup__reg-img_error' : ''
          }`}
        ></div>
        <p className="popup__reg-text">
          {isOpenOk
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>
      </div>
    </Popup>
  );
}

export default RegisterPopup;
