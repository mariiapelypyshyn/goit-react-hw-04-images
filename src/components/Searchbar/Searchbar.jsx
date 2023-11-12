import React, { useState } from 'react'
import css from './Searchbar.module.css';
import Notiflix from 'notiflix';

const Searchbar = ({onSubmit}) => {

    const [inputData, setInputData] = useState('');

    const onInputChange = e => {
        setInputData(e.currentTarget.value.toLowerCase());
    }
  
    const handleSubmit = e => {
        e.preventDefault();

        if (inputData.trim() === '') {
            Notiflix.Notify.info('You cannot search by empty field, try again.');
            return;
        }
        onSubmit(inputData);
        setInputData('');
    }
    
        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={handleSubmit}>
                    <button type="submit" className={css.SearchFormButton}>
                        <span className={css.SearchFormButtonLabel}>Search</span>
                    </button>

                    <input
                        className={css.SearchFormInput}
                        name="inputData"
                        value={inputData}
                        onChange={onInputChange}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos" />
                </form>
            </header>
        );
    
}

export default Searchbar;



