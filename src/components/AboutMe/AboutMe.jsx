import './AboutMe.css';
import about__photo from '../../images/about__photo.png'

export default function AboutMe() {
    return (
        <section className='about-me' id='about-me'>
            <h2 className='about-me__title'>Студент</h2>
            <div className='about-me__block'>
                <div className='about-me__info'>
                    <h3 className='about-me__name'>Виталий</h3>
                    <p className='about-me__work'>Фронтенд-разработчик, 30 лет</p>
                    <p className='about-me__text'>Я родился и живу в Саратове, закончил факультет экономики СГУ.
                        У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал
                        в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
                        фриланс-заказами и ушёл с постоянной работы.</p>
                    <a className='about-me__link' href='https://github.com/wakeuphaku'>Github</a>
                </div>
                <img className='about-me__photo' src={about__photo} alt='фотография создателя'/>
            </div>
        </section>
    )
}
