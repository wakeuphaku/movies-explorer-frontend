import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

export default function Register() {
  return (
    <form className="form">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <h2 className="form__title">Добро пожаловать!</h2>
      <div className="form__block">
        <label className="form__input-block">
          <h3 className="form__input-text">Имя</h3>
          <input className="form__input" />
          <span className="form__input-error"></span>
        </label>
        <label className="form__input-block">
          <h3 className="form__input-text">E-mail</h3>
          <input className="form__input" />
          <span className="form__input-error"></span>
        </label>
        <label className="form__input-block">
          <h3 className="form__input-text">Пароль</h3>
          <input className="form__input" />
          <span className="form__input-error">asd</span>
        </label>
      </div>
      <button className="form__button">Зарегистрироваться</button>
      <div className="form__links">
        <p className="form__text">Уже зарегистрированы?</p>
        <Link to="/signin" className="form__link">
          Войти
        </Link>
      </div>
    </form>
  );
}
