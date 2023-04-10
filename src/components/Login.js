import { useNavigate } from 'react-router-dom';
import PopupWithForm from './PopupWithForm';
import * as auth from '../utils/auth.js';
import { useForm } from 'react-hook-form';

const Login = ({ handleLogin }) => {
  const {
    register,
    formState: { errors, isValid },
    getValues,
    reset,
  } = useForm({ mode: 'onChange', criteriaMode: 'all' });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    auth
      .authorize(getValues('password'), getValues('email'))
      .then((data) => {
        if (data.token) {
          handleLogin();
          navigate('/', { replace: true });
          reset();
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };

  return (
    <div className="auth">
      <PopupWithForm
        name="auth"
        title="Вход"
        onSubmit={handleSubmit}
        btnText="Войти"
        isValid={isValid}
      >
        <label className="popup__label">
          <input
            className="popup__input popup__input_auth"
            placeholder="Email"
            name="email"
            type="email"
            {...register('email', {
              required: 'Заполните это поле.',
              minLength: {
                value: 5,
                message: 'Минимум 5 символов.',
              },
              maxLength: {
                value: 40,
                message: 'Максимум 40 символов.',
              },
            })}
          />
          <span className="popup__input-error popup__input-error_active">
            {errors?.email && errors?.email?.message}
          </span>
        </label>
        <label className="popup__label">
          <input
            className="popup__input popup__input_auth"
            name="password"
            placeholder="Пароль"
            type="password"
            {...register('password', {
              required: 'Заполните это поле.',
              minLength: {
                value: 8,
                message: 'Минимум 8 символов.',
              },
              maxLength: {
                value: 40,
                message: 'Максимум 40 символов.',
              },
            })}
          />
          <span className="popup__input-error popup__input-error_active">
            {errors?.password && errors?.password?.message}
          </span>
        </label>
      </PopupWithForm>
    </div>
  );
};

export default Login;
