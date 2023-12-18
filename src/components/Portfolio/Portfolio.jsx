import './Portfolio.css';
import arrow from '../../images/arrow.svg'

export default function Portfolio() {
    return (
        <section className='portfolio'>
            <h2 className='portfolio__title'>Порфолио</h2>
                <div className="portfolio__links">
                    <a className='portfolio__link' href='#'>Статичный сайт</a>
                    <img src={arrow} className='portfolio__img' alt='arrow'/>
                </div>
                <div className="portfolio__links">
                    <a className='portfolio__link' href='#'>Адаптивный сайт</a>
                    <img src={arrow} className='portfolio__img' alt='arrow'/>
                </div>
                <div className="portfolio__links">
                    <a className='portfolio__link' href='#'>Одностраничное
                        приложение</a>
                    <img src={arrow} className='portfolio__img' alt='arrow'/>
                </div>
        </section>
    )
}
