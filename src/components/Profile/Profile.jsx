import './Profile.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

export default function Profile ({openLinks}) {
    const navigate = useNavigate();

    function goMainPage() {
        navigate('/', { replace: true });
    }
    return (
        <>
            <Header openLinks={openLinks} />
            <div className='profile'>
                <h2 className='profile__title'>Привет, Виталий!</h2>
                <div className='profile__block'>
                    <div className='profile__input-block'>
                        <p className='profile__input-text'>Имя</p>
                        <input placeholder='Виталий' className='profile__input'/>
                    </div>
                    <div className='profile__input-block'>
                        <p className='profile__input-text'>E-mail</p>
                        <input placeholder='pochta@yandex.ru' className='profile__input'/>
                    </div>
                </div>
                <button className='profile__link'>Редактировать</button>
                <button className='profile__link profile__link_red' onClick={goMainPage}>Выйти из аккаунта</button>
            </div>
        </>
    )
}

