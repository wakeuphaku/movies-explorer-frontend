import './AboutProject.css';

export default function AboutProject () {
    return (
        <section className='about-project' id='about'>
            <h2 className='about-project__title'>О проекте</h2>
            <div className='about-project__blocks'>
                <div className='about-project__block'>
                    <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
                    <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className='about-project__block'>
                    <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
                    <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className='about-project__plan'>
                <div className='about-project__item about-project__item_black-box'>
                    <article>1 неделя</article>
                </div>
                <div className='about-project__item about-project__item_grey-box'>
                    <article>4 недели</article>
                </div>
                <div className='about-project__item about-project__item_text'>
                    <article>Back-end</article>
                </div>
                <div className='about-project__item about-project__item_text'>
                    <article>Front-end</article>
                </div>
            </div>
        </section>
    )
}
