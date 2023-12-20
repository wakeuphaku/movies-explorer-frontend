import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm () {
    return (
        <section className='search-form'>
            <form className="search-form__block">
                <input className='search-form__input' placeholder='Фильм' required></input>
                <button className='search-form__button'>Найти</button>
                <div className='search-form__line-input'></div>
                <FilterCheckbox/>
            </form>
            <div className="search-form__line"></div>
        </section>
    )
}
