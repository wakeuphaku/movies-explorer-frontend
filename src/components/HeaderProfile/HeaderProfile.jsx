import { Link, } from 'react-router-dom';
import './HeaderProfile.css';

export default function HeaderProfile ({isMain}) {
    return (
        <Link to='/profile' className='header-profile'>
            <p className='header-profile__text'>Аккаунт</p>
            <div className={`${isMain ?' header-profile__icon' : 'header-profile__icon_black'}`}></div>
        </Link>
    )
}

