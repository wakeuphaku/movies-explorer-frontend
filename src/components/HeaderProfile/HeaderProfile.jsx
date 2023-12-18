import { Link, } from 'react-router-dom';
import './HeaderProfile.css';

export default function HeaderProfile () {
    return (
        <Link to='/profile' className='header-profile'>
            <p className='header-profile__text'>Аккаунт</p>
            <div className='header-profile__icon'></div>
        </Link>
    )
}

