import './MoviesCard.css';
import movieImg from '../../images/movie__img.png'

export default function MoviesCard() {
    return (
        <section className='movies-card'>
            <div className='movies-card__block'>
                <img className='movies-card__image' src={movieImg} alt='Постер'/>
                <button className='movies-card__button'>Сохранить</button>
            </div>
            <div className='movies-card__about'>
                <h3 className='movies-card__title'>33 слова о дизайне</h3>
                <article className='movies-card__time'>1ч 17м</article>
            </div>

        </section>
    )
}
