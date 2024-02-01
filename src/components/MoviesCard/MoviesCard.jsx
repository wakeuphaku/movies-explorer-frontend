import React, { useState, useContext } from 'react';
import './MoviesCard.css';
import saveImg from '../../images/save.svg';
import deleteImg from '../../images/deletebtn.svg';
import { useLocation } from 'react-router-dom';

export default function MoviesCard({ movie, isSaved, onSave, onDelete }) {
  const location = useLocation();

  function handleSaveClick() {
    onSave(movie);
  }

  // удаление фильма
  function handleDeleteClick() {
    onDelete(movie);
  }

  const time = duration => {
    if (duration >= 60) {
      return `${Math.floor(duration / 60)}ч ${duration % 60}мин`;
    }
    return `${duration}м`;
  };
  return (
    <section className="movies-card">
      <div className="movies-card__block">
        <a href={movie.trailerLink} target="_blank" rel="noreferrer">
          <img
            className="movies-card__image"
            src={
              location.pathname === '/saved-movies'
                ? movie.image
                : 'https://api.nomoreparties.co/' + movie.image.url
            }
            alt="Постер"
          />
        </a>
        {location.pathname === '/movies' ? (
          isSaved ? (
            <img
              src={saveImg}
              onClick={handleDeleteClick}
              alt="Сохранено"
              className="movies-card__saved"
            />
          ) : (
            <button className="movies-card__button" onClick={handleSaveClick}>
              Сохранить
            </button>
          )
        ) : (
          <img
            onClick={handleDeleteClick}
            src={deleteImg}
            alt="Удалено"
            className="movies-card__saved"
          />
        )}
      </div>
      <div className="movies-card__about">
        <h3 className="movies-card__title">{movie.nameRU}</h3>
        <article className="movies-card__time">{time(movie.duration)}</article>
      </div>
    </section>
  );
}
