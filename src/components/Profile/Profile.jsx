import React, {useState, useEffect, useContext} from "react";
import './Profile.css';
import {useNavigate} from 'react-router-dom';
import {CurrentUserContext} from "../../context/CurrentUserContext.jsx";
import useFormValidation from "../../hooks/useFormValidation";


export default function Profile({openLinks, onSubmit, logout}) {
    const navigate = useNavigate();
    const { values, errors, isValid, handleChange, resetForm } =
        useFormValidation();

    const [success, setSuccess] = React.useState(false);

    const currentUser = useContext(CurrentUserContext);

    function handleSubmit(e) {
        e.preventDefault();
        resetForm(true)
        onSubmit(values.name, values.email);
        currentUser.name = values.name;
        currentUser.email = values.email;
        setSuccess(true)
    }
    function handleLogout() {
        logout()
        navigate("/")
    }
    return (
        <>
            <div className='profile'>
                <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
                <form className='profile__block' onSubmit={handleSubmit}>
                    <div className='profile__input-block'>
                        <p className='profile__input-text'>Имя</p>
                        <input className='profile__input'
                               name="name"
                               id="name"
                               type="name"
                               value={values.name || currentUser.name || ''}
                               onChange={handleChange}
                               minLength="2"
                               required
                        />

                    </div>
                    <span className="form__input-error">{errors.name}</span>
                    <div className='profile__input-block'>
                        <p className='profile__input-text'>E-mail</p>
                        <input className='profile__input'
                               name="email"
                               id="email"
                               type="email"
                               minLength="2"
                               value={values.email || currentUser.email || ''}
                               onChange={handleChange}
                               required
                        />
                    </div>
                    <span className="form__input-error">{errors.email}</span>
                    {success && <span className='profile__success'>Информация о пользователе обновлена!</span>}
                    <button className={`profile__link ${!isValid && 'profile__link_off'}`} type="submit"
                            disabled={!isValid}>Редактировать
                    </button>
                </form>

                <button className='profile__link profile__link_red' onClick={handleLogout}>Выйти из аккаунта</button>
            </div>
        </>
    )
}

