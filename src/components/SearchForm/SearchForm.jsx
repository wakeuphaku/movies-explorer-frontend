import React, { useState, useEffect } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormValidation from '../../hooks/useFormValidation';

export default function SearchForm({
  searchText,
  handleSearch,
  handleShort,
  checkedShort,
  listFound
}) {
  const { values, errors, isValid, handleChange, resetForm } = useFormValidation();

  useEffect(() => {
    values.search = searchText;
  }, [searchText]);

  function handleSubmit(e) {
    e.preventDefault();
    handleSearch(values.search, checkedShort);
  }

  return (
    <section className="search-form">
      <form className="search-form__block" onSubmit={handleSubmit}>
        <input
          className="search-form__input"
          name="search"
          type="text"
          placeholder="Фильм"
          defaultValue={values.search}
          onChange={handleChange}
        ></input>
        <button className="search-form__button" type="submit">
          Найти
        </button>
        <div className="search-form__line-input"></div>
        <FilterCheckbox onChange={handleShort} checked={checkedShort} />
      </form>
      <div className="search-form__line"></div>
    </section>
  );
}
