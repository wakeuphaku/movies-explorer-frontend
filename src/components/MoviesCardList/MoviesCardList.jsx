import {useState, useEffect} from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import {useLocation} from "react-router-dom";

export default function MovieCardList({movie, onSave, onDelete, savedMovies, notFound}) {

    const location = useLocation();
    const [width, setWidth] = useState(window.innerWidth);
    const [showedMovies, setShowedMovies] = useState(0);

    // window.addEventListener('resize', function () {
    //     setTimeout(() => {
    //         setWidth(window.innerWidth);
    //         showMovies();
    //     }, 1000);
    // });

    window.onresize = function () {
        setTimeout(() => {
            setWidth(window.innerWidth);
            showMovies();
        }, 1000);
    }

    const showMovies = () => {
        if (width >= 1151) {
            setShowedMovies(12);
        } else if (width < 1151 && width >= 706) {
            setShowedMovies(8);
        } else if (width < 706) {
            setShowedMovies(5);
        }
    }
    const handleShowMore = () => {
        if (width >= 1151) {
            setShowedMovies(showedMovies + 3);
        } else if (width < 1151 && width >= 706) {
            setShowedMovies(showedMovies + 2);
        } else if (width < 706) {
            setShowedMovies(showedMovies + 2);
        }
    }

    useEffect(() => {
        showMovies();
    }, []);

    const handleSavedStatus = (id) => {
        return savedMovies?.find((movie) => movie.movieId === id);
    }

    return (

        <section className="movie-card-list">
            <span className="movie-card-lis__notfound">{notFound}</span>
            <div className="movie-card-list__block">
                {movie?.slice(0, location.pathname === '/saved-movies' ? savedMovies?.length : showedMovies).map((movie) => (
                    <MoviesCard
                        key={movie.id || movie.movieId}
                        movie={movie}
                        savedMovie={savedMovies}
                        onSave={onSave}
                        onDelete={onDelete}
                        isSaved={handleSavedStatus(movie.id)}
                    />
                ))}
            </div>

            <button className="movie-card-list__button" onClick={handleShowMore}>
                Еще
            </button>
        </section>

    )
}


