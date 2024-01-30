import React, {useState, useEffect, useContext} from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from "../Preloader/Preloader";
import {CurrentUserContext} from '../../context/CurrentUserContext';
import moviesApi from "../../utils/MoviesApi";

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
        JSON.parse(localStorage.getItem(`${currentUser.email}:moviesList`)) || []
    );

    const [filterMovies, setFilterMovies] = useState(
        JSON.parse(localStorage.getItem(`${currentUser.email}:filterMovies`)) || []
    );
    const [searchQuery, setSearchQuery] = useState(
        localStorage.getItem(`${currentUser.email}:searchQuery`) || ''
    );

    const [shortMovies, setShortMovies] = useState(
        localStorage.getItem(`${currentUser.email}:shortMovies`) === 'true'
    );

    function filterSearchQuery(movies, searchQuery) {
        if (searchQuery === '') return [];
        return movies.filter((movie) =>
            movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    function handleSearch(searchQuery) {
        localStorage.setItem(`${currentUser.email}:searchQuery`, searchQuery);
        setSearchQuery(searchQuery);

        if (moviesList.length === 0) {
            moviesApi.getMovies()
                .then((item) => {
                    localStorage.setItem(`${currentUser.email}:moviesList`, JSON.stringify(item));
                    setMoviesList(item);
                    const isFoundMovies = searchQuery ? filterSearchQuery(item, searchQuery) : item;

                    setFilterMovies(isFoundMovies);
                    localStorage.setItem(`${currentUser.email}:filterMovies`, JSON.stringify(isFoundMovies));
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            const isFoundMovies = searchQuery ? filterSearchQuery(moviesList, searchQuery) : moviesList;
            setFilterMovies(isFoundMovies);
            localStorage.setItem(`${currentUser.email}:filterMovies`, JSON.stringify(isFoundMovies));
        }

    }

    function filterDuration(movies) {
        return movies.filter((movie) => movie.duration <= 40);
    }

    function handleShortMovies() {
        localStorage.setItem(`${currentUser.email}:shortMovies`, !shortMovies);
        setShortMovies(!shortMovies);
    }


    useEffect(() => {
        if (localStorage.getItem(`${currentUser.email}:moviesList`)) {
            setMoviesList(JSON.parse(
                localStorage.getItem(`${currentUser.email}:moviesList`))
            );
        }
        if (localStorage.getItem(`${currentUser.email}:searchQuery`)) {
            setSearchQuery(
                localStorage.getItem(`${currentUser.email}:searchQuery`)
            );
        }
        if (localStorage.getItem(`${currentUser.email}:filterMovies`)) {
            setFilterMovies(JSON.parse(
                localStorage.getItem(`${currentUser.email}:filterMovies`))
            );
        }

        setShortMovies(localStorage.getItem(`${currentUser.email}:shortMovies`) === 'true');

    }, [currentUser]);

    return (
        <>
            <SearchForm
                searchQuery={searchQuery}
                handleSearch={handleSearch}
                handleShort={handleShortMovies}
                checkedShort={shortMovies}
                listFound={filterMovies}
            />
            {isLoading && <Preloader/>}
            <MoviesCardList isLoading={isLoading}
                            movie={shortMovies ? filterDuration(filterMovies) : filterMovies}
                            notFound={notFound} onSave={onSave} onDelete={onDelete}
                            searchMovies={searchMovies} searchShortMovies={searchShortMovies}
                            savedMovies={savedMovies}/>
            <Footer/>
        </>
    );
}
