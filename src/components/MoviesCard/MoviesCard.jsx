import React, { useState } from "react";
import './MoviesCard.css';
import movieImg from '../../images/movie__img.png'
import saveImg from '../../images/save.svg'


export default function MoviesCard() {

    const [isSaved, setIsSaved] = useState(false);

    const handleSaveClick = () => {
        setIsSaved(true)
    }

    return (
        <section className='movies-card'>
            <div className='movies-card__block'>
                <img className='movies-card__image' src={movieImg} alt='Постер'/>
                {!isSaved ? (
                    <button className='movies-card__button' onClick={handleSaveClick}>Сохранить</button>
                ) : (
                    <img src={saveImg} alt="Сохранено" className="movies-card__saved" />
                )}
            </div>
            <div className='movies-card__about'>
                <h3 className='movies-card__title'>33 слова о дизайне</h3>
                <article className='movies-card__time'>1ч 17м</article>
            </div>

        </section>
    )
}
