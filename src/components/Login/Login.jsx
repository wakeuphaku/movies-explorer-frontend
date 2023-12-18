import './Login.css';
import {Link} from 'react-router-dom';
import logo from '../../images/logo.svg';


export default function Login() {
    return (

        <form className='form'>
            <Link to='/'>
                <img className='header__logo' src={logo} alt='logo'/>
            </Link>
            <h3 className='form__title'>Рады видеть!</h3>
            <div className='form__block'>
            <label className='form__input-block'>
                <h3 className='form__input-text'>E-mail</h3>
                <input className='form__input'/>
                <span className='form__input-error'></span>
            </label>
            <label className='form__input-block'>
                <h3 className='form__input-text'>Пароль</h3>
                <input className='form__input'/>
                <span className='form__input-error'></span>
            </label>
        </div>
    <button className='form__button'>Войти</button>
    <div className='form__links'>
        <p className='form__text'>Еще не зарегистрированы?</p>
        <Link to='/signup' className='form__link'>Регистрация</Link>
    </div>
</form>

)
}
