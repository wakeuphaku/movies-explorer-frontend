import './SavedMovies.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

export default function SavedMovies ({openLinks}) {
    return (
        <>
            <Header openLinks={openLinks} />
            <SearchForm />
            <MoviesCardList isSavedMoviesPage />
            <Footer />
        </>
    )
}
