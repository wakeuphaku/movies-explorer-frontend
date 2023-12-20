import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound () {
    return (
        <div className='not-found'>
            <h3 className='not-found__title'>404</h3>
            <p className='not-found__text'>Страница не найдена</p>
            <Link to='/' className='not-found__link'>Назад</Link>
        </div>
    )
}
