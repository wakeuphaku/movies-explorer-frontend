import React, { useState, useEffect, useContext } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import moviesApi from '../../utils/MoviesApi';

export default function Movies({
  movie,
  onDelete,
  onSave,
  notFound,

  searchMovies,
  searchShortMovies,
  savedMovies,
  isLoading
}) {
  const currentUser = useContext(CurrentUserContext);

  const [moviesList, setMoviesList] = useState(
    JSON.parse(localStorage.getItem('moviesList')) || []
  );

  const [filterMovies, setFilterMovies] = useState(
    JSON.parse(localStorage.getItem('filterMovies')) || []
  );
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');

  const [shortMovies, setShortMovies] = useState(localStorage.getItem('shortMovies') === 'true');

  function filterSearchQuery(movies, searchQuery) {
    if (searchQuery === '') return [];
    return movies.filter(
      movie =>
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  function handleSearch(searchQuery) {
    localStorage.setItem('searchQuery', searchQuery);
    setSearchQuery(searchQuery);

    if (moviesList.length === 0) {
      moviesApi
        .getMovies()
        .then(item => {
          localStorage.setItem('moviesList', JSON.stringify(item));
          setMoviesList(item);
          const isFoundMovies = searchQuery ? filterSearchQuery(item, searchQuery) : item;

          setFilterMovies(isFoundMovies);
          localStorage.setItem('filterMovies', JSON.stringify(isFoundMovies));
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      const isFoundMovies = searchQuery ? filterSearchQuery(moviesList, searchQuery) : moviesList;
      setFilterMovies(isFoundMovies);
      localStorage.setItem('filterMovies', JSON.stringify(isFoundMovies));
    }
  }

  function filterDuration(movies) {
    return movies.filter(movie => movie.duration <= 40);
  }

  function handleShortMovies() {
    localStorage.setItem('shortMovies', !shortMovies);
    setShortMovies(!shortMovies);
  }

  useEffect(() => {
    if (localStorage.getItem('moviesList')) {
      setMoviesList(JSON.parse(localStorage.getItem('moviesList')));
    }
    if (localStorage.getItem('searchQuery')) {
      setSearchQuery(localStorage.getItem('searchQuery'));
    }
    if (localStorage.getItem('filterMovies')) {
      setFilterMovies(JSON.parse(localStorage.getItem('filterMovies')));
    }

    setShortMovies(localStorage.getItem('shortMovies') === 'true');
  }, [currentUser]);

  return (
    <>
      <SearchForm
        searchText={searchQuery}
        handleSearch={handleSearch}
        handleShort={handleShortMovies}
        checkedShort={shortMovies}
      />
      {isLoading && <Preloader />}
      <MoviesCardList
        isLoading={isLoading}
        movie={shortMovies ? filterDuration(filterMovies) : filterMovies}
        onSave={onSave}
        onDelete={onDelete}
        savedMovies={savedMovies}
      />
      <Footer />
    </>
  );
}
