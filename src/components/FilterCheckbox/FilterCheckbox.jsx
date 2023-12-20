import './FilterCheckbox.css';
import {useState} from "react";

export default function FilterCheckbox () {

    const [isShort, setIsShort] = useState(false);

    const handleShortOff = () => {
        setIsShort(true)
    }

    const handleShortOn = () => {
        setIsShort(false)
    }

    return (
        <section className='filter-checkbox'>
            {!isShort ? (
            <button className='filter-checkbox__button' onClick={handleShortOff}></button>
                ) : (
                <button className='filter-checkbox__button_off' onClick={handleShortOn}></button>
            )}
            <p className='filter-checkbox__text'>Короткометражки</p>
        </section>
    )
}
