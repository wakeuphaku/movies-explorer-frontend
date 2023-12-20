import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MovieCardList ({isSavedMoviesPage}) {
    return (
        <section className='movie-card-list'>
            <div className='movie-card-list__block'>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
            </div>
            <button className='movie-card-list__button'>Еще</button>
        </section>
    )
}


