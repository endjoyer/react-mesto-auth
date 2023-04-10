import { Link, useLocation } from 'react-router-dom';

function Header({ userData }) {
  const location = useLocation();
  const isSignUpPage = location.pathname === '/sign-up';
  const isMainPage = location.pathname === '/';

  function signOut() {
    localStorage.removeItem('jwt');
  }

  return (
    <>
      {isMainPage ? (
        <div className="hamburger">
          <input id="hamburger__toggle" type="checkbox" />
          <label className="hamburger__btn" htmlFor="hamburger__toggle">
            <span></span>
          </label>

          <div className="hamburger__box">
            <p className="header__user-data">{userData.email}</p>
            <Link to={'/sign-in'} onClick={signOut} className="header__exit">
              Выйти
            </Link>
          </div>
        </div>
      ) : (
        ''
      )}
      <header className="header">
        <div className="header__container">
          <div
            className={`header__logo ${
              !isMainPage ? 'header__logo_no-main' : ''
            }`}
          ></div>
          {!isMainPage ? (
            <Link
              to={isSignUpPage ? '/sign-in' : '/sign-up'}
              className="header__link"
            >
              {isSignUpPage ? 'Войти' : 'Регистрация'}
            </Link>
          ) : (
            <nav className="header__nav">
              <p className="header__user-data">{userData.email}</p>
              <Link to={'/sign-in'} onClick={signOut} className="header__exit">
                Выйти
              </Link>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
