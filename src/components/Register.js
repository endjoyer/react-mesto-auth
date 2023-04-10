import { Link, useNavigate } from 'react-router-dom';
import PopupWithForm from './PopupWithForm';
import * as auth from '../utils/auth.js';
import { useForm } from 'react-hook-form';

const Register = ({ submitOk, submitError }) => {
  const {
    register,
    formState: { errors, isValid },
    getValues,
    reset,
  } = useForm({ mode: 'onChange', criteriaMode: 'all' });

  // const [formValue, setFormValue] = useState({
  //   password: '',
  //   email: '',
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setFormValue({
  //     ...formValue,
  //     [name]: value,
  //   });
  // };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    auth
      .register(getValues('password'), getValues('email'))
      .then((res) => {
        if (res.data) {
          navigate('/sign-in', { replace: true });
          submitOk(true);
        }
      })
      .catch((err) => {
        submitError(true);
        console.log(`Ошибка: ${err}`);
      });
  };

  return (
    <div className="auth">
      <PopupWithForm
        name="auth"
        title="Регистрация"
        onSubmit={handleSubmit}
        btnText="Зарегистрироваться"
        isValid={isValid}
      >
        <label className="popup__label">
          <input
            className="popup__input popup__input_auth"
            name="email"
            placeholder="Email"
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
          <span className="email-error popup__input-error popup__input-error_active">
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
          <span className="password-error popup__input-error popup__input-error_active">
            {errors?.password && errors?.password?.message}
          </span>
        </label>
        <div className="auth__signup">
          <p className="signup__text">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="signup__link">
            Войти
          </Link>
        </div>
      </PopupWithForm>
    </div>
  );
};

export default Register;
