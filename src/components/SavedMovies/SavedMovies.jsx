import './SavedMovies.css';
import React, {useState, useEffect} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

export default function SavedMovies({savedMovies, onDelete}) {

    const [shortMovies, setShortMovies] = useState(false);
    const [filterMovies, setFilterMovies] = useState(savedMovies);
    const [searchQuery, setSearchQuery] = useState('');
    const [shortMoviesList, setShortMoviesList] = useState([]);

    function filterSearchQuery(movies, searchQuery) {
        if (searchQuery === '') return [];
        return movies.filter((movie) =>
            movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    function filterDuration(movies) {
        return movies.filter((movie) => movie.duration <= 40);
    }

    function handleShortMovies() {
        setShortMovies(!shortMovies);
    }

    function handleSearch(searchQuery) {
        const filteredMovies = searchQuery ? filterSearchQuery(savedMovies, searchQuery) : savedMovies;

        const searchResult = shortMovies ? filterDuration(filteredMovies) : filteredMovies;

        setSearchQuery(searchQuery);
        setFilterMovies(searchResult);
        setShortMovies(shortMovies);
    }

    useEffect(() => {
        handleSearch(searchQuery, shortMovies);
    }, [savedMovies, searchQuery, shortMovies]);

    function filteredMovies(item) {
        return item.map(movies => ({
            ...movies,
        }));
    }

    useEffect(() => {
        setFilterMovies(savedMovies);
    }, [savedMovies]);

    useEffect(() => {
        if (shortMovies) {
            const short = filterDuration(filterMovies);
            setShortMoviesList(short);
        }
    }, [savedMovies, filterMovies, shortMovies]);


    return (
        <>
            <SearchForm
                searchQuery={searchQuery}
                handleSearch={handleSearch}
                handleShort={handleShortMovies}
                checked={shortMovies}
            />
            <MoviesCardList movie={filteredMovies(shortMovies ? shortMoviesList : filterMovies)} onDelete={onDelete}/>
            <Footer/>
        </>
    )
}
