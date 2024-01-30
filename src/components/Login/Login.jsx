import './Login.css';
import {Link} from 'react-router-dom';
import logo from '../../images/logo.svg';
import React from "react";
import useFormValidation from "../../hooks/useFormValidation";

export default function Login({handleLoginSubmit, isLogin}) {

    const { values, errors, isValid, handleChange, resetForm } =
        useFormValidation();

    function handleSubmit(e) {
        e.preventDefault();
        handleLoginSubmit(values.email, values.password);
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <Link to="/">
                <img className="logo" src={logo} alt="logo"/>
            </Link>
            <h3 className="form__title">Рады видеть!</h3>
            <div className="form__block">
                <label className="form__input-block">
                    <h3 className="form__input-text">E-mail</h3>
                    <input className="form__input"
                           name="email"
                           id="email"
                           type="email"
                           onChange={handleChange}
                           value={values.email || ''}
                           required/>
                    <span className="form__input-error">{errors.email}</span>
                </label>
                <label className="form__input-block">
                    <h3 className="form__input-text">Пароль</h3>
                    <input className="form__input"
                           name="password"
                           id="password"
                           type="password"
                           onChange={handleChange}
                           value={values.password || ''}
                           minLength="8"
                           required/>
                    <span className="form__input-error">{errors.password}</span>
                </label>
            </div>
            <button className={`form__button ${!isValid && 'form__button_off'}`} type="submit"
                    disabled={!isValid}>Войти
            </button>
            <div className="form__links">
                <p className="form__text">Еще не зарегистрированы?</p>
                <Link to="/signup" className="form__link">
                    Регистрация
                </Link>
            </div>
        </form>
    );
}
