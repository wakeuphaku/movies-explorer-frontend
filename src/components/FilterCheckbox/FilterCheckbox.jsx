import './FilterCheckbox.css';

export default function FilterCheckbox ({onChange, checked}) {

    return (
        <section className='filter-checkbox'>
            <input className='filter-checkbox__button' onChange={onChange} checked={checked} type='checkbox'/>
            <span className="filter-checkbox__fake-button"></span>
            <p className='filter-checkbox__text'>Короткометражки</p>
        </section>
    )
}
