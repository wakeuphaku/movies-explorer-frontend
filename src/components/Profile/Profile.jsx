import React, { useState, useEffect, useContext } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext.jsx';
import useFormValidation from '../../hooks/useFormValidation';

export default function Profile({ openLinks, onSubmit, logout, isSuccess }) {
  const navigate = useNavigate();
  const { values, errors, isValid, setIsValid, handleChange, resetForm } = useFormValidation();

  const [success, setSuccess] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(values.name, values.email);
    currentUser.name = values.name;
    currentUser.email = values.email;
    setSuccess(true);
  }
  function handleLogout() {
    logout();
    navigate('/');
  }
  return (
    <>
      <div className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__block" onSubmit={handleSubmit}>
          <div className="profile__input-block">
            <p className="profile__input-text">Имя</p>
            <input
              className="profile__input"
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
          <div className="profile__input-block">
            <p className="profile__input-text">E-mail</p>
            <input
              className="profile__input"
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

          {success && (
            <span className={`profile__success ${!isSuccess && 'profile__success_err'}`}>
              {isSuccess === false && 'Произошла ошибка, попробуйте еще раз'}
              {isSuccess === true && 'Данные успешно обновлены'}
            </span>
          )}
          <button
            className={`profile__link ${
              (!isValid ||
                (values.name === currentUser.name && values.email === currentUser.email)) &&
              'profile__link_off'
            }`}
            type="submit"
            disabled={
              !isValid || (values.name === currentUser.name && values.email === currentUser.email)
            }
          >
            Редактировать
          </button>
        </form>

        <button className="profile__link profile__link_red" onClick={handleLogout}>
          Выйти из аккаунта
        </button>
      </div>
    </>
  );
}
