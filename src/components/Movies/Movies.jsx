import './Movies.css';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";


export default function Movies ({openLinks}) {
    return (
        <>
            <Header openLinks={openLinks} />
            <SearchForm />
            <MoviesCardList />
            <Footer />
        </>
    )
}
