import React from 'react';
import './Register.css';
import {Link} from 'react-router-dom';
import logo from '../../images/logo.svg';
import useFormValidation from "../../hooks/useFormValidation";

export default function Register({handleRegisterSubmit}) {

    const { values, errors, isValid, handleChange, resetForm } =
        useFormValidation();

    function handleSubmit(e) {
        e.preventDefault();
        handleRegisterSubmit(values.name, values.email, values.password);
    }


    return (
        <form className="form" onSubmit={handleSubmit}>
            <Link to="/">
                <img className="logo" src={logo} alt="logo"/>
            </Link>
            <h2 className="form__title">Добро пожаловать!</h2>
            <div className="form__block">
                <label className="form__input-block">
                    <h3 className="form__input-text">Имя</h3>
                    <input className="form__input"
                           name="name"
                           id="name"
                           type="name"
                           onChange={handleChange}
                           value={values.name || ''}
                           minLength="2"
                           maxLength="30"
                           required/>
                    <span className="form__input-error">{errors.name}</span>
                </label>
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
                           required
                           />
                    <span className="form__input-error">{errors.password}</span>
                </label>
            </div>
            <button className={`form__button ${!isValid && 'form__button_off'}`} type="submit" disabled={!isValid}>Зарегистрироваться</button>
            <div className="form__links">
                <p className="form__text">Уже зарегистрированы?</p>
                <Link to="/signin" className="form__link">
                    Войти
                </Link>
            </div>
        </form>
    );
}
