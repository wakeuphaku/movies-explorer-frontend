import './Header.css';
import logo from '../../images/logo.svg';

import { Link, NavLink, useLocation } from 'react-router-dom';
import HeaderProfile from '../HeaderProfile/HeaderProfile';


function Header({ isMain, isLoggin, openLinks }) {
    const location = useLocation().pathname;
  return (
    <header className={`header ${location === '/' ? 'header__pink' : 'header__white'}`}>
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      {isLoggin ? (
        <>
          <div className="header__links">
            <NavLink
              className={({ isActive }) => `header__link ${isActive ? 'header__link_active' : ''}`}
              to="/movies"
            >
              Фильмы
            </NavLink>
            <NavLink
              className={({ isActive }) => `header__link ${isActive ? 'header__link_active' : ''}`}
              to="/saved-movies"
            >
              Сохранённые фильмы
            </NavLink>
            <HeaderProfile isMain={isMain} />
          </div>
          <div className="header__burger" onClick={openLinks}></div>
        </>
      ) : (
        <nav className="header__links-auth">
          <Link to="/signup" className="header__link-auth">
            Регистрация
          </Link>
          <Link to="/signin" className="header__link-auth header__link-auth_border">
            Войти
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
