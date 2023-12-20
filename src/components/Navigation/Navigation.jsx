import {NavLink} from 'react-router-dom';
import './Navigation.css';
import LinkProfile from '../HeaderProfile/HeaderProfile';

export default function Navigation({isOpen, closeLinks}) {
    return (
        <div className={`navigation ${isOpen ? 'navigation_open' : ''}`}>
            <div className='navigation__block'>
                <button className='navigation__close-button' onClick={closeLinks} type='button'></button>
                <nav className='navigation__links'>
                    <NavLink to='/'
                             className={({isActive}) => `navigation__link ${isActive ? 'navigation__link_active' : ''}`}>Главная</NavLink>
                    <NavLink to='/movies'
                             className={({isActive}) => `navigation__link ${isActive ? 'navigation__link_active' : ''}`}>Фильмы</NavLink>
                    <NavLink to='/saved-movies'
                             className={({isActive}) => `navigation__link ${isActive ? 'navigation__link_active' : ''}`}>Сохраненные
                        фильмы</NavLink>
                </nav>
                <LinkProfile/>
            </div>
        </div>
    )
}
