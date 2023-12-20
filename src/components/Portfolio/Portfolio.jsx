import './Portfolio.css';
import arrow from '../../images/arrow.svg'

export default function Portfolio() {
    return (
        <section className='portfolio'>
            <h2 className='portfolio__title'>Порфолио</h2>
                <a href='https://github.com/wakeuphaku/how-to-learn' target="_blank" className="portfolio__links">
                    <p className='portfolio__link' >Статичный сайт</p>
                    <img src={arrow} className='portfolio__img' alt='arrow'/>
                </a>
                <a href='https://github.com/wakeuphaku/russian-travel' target="_blank" className="portfolio__links">
                    <p className='portfolio__link' >Адаптивный сайт</p>
                    <img src={arrow} className='portfolio__img' alt='arrow'/>
                </a>
                <a href='https://github.com/wakeuphaku/mesto-react' target="_blank" className="portfolio__links">
                    <p className='portfolio__link' >Одностраничное
                        приложение</p>
                    <img src={arrow} className='portfolio__img' alt='arrow'/>
                </a>
        </section>
    )
}
