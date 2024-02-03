import './NavTab.css';

export default function NavTab () {
    return (
        <nav className='navtab'>
            <a className='navtab__link' href='#about'>О проекте</a>
            <a className='navtab__link' href='#techs'>Технологии</a>
            <a className='navtab__link' href='#about-me'>Студент</a>
        </nav>
    )
}
