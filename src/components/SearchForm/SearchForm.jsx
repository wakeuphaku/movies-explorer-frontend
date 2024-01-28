
import React, {useState} from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';


export default function SearchForm({ searchText, handleSearch, handleShort, checkedShort, listFound }) {

    const [searchQuery, setSearchQuery]  = useState('')

    function handleSubmit(e) {
        e.preventDefault();
        handleSearch(searchQuery, checkedShort);
    }

    return (
        <section className='search-form'>
            <form className="search-form__block" onSubmit={handleSubmit}>
                <input className='search-form__input' type='text' placeholder='Фильм' value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}></input>
                <button className='search-form__button' type='submit'>Найти</button>
                <div className='search-form__line-input'></div>
                <FilterCheckbox
                    onChange={handleShort}
                    checked={checkedShort}/>
            </form>
            <div className="search-form__line"></div>
        </section>
    )
}

