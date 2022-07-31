// import { Component } from 'react';
import { memo, useState, useCallback } from 'react';
import stl from './searchBar.module.css';
import PropTypes from 'prop-types';

function SearchBar({ onSubmit }) {
  // state = {
  //   q: '',
  // };

  const [q, setQ] = useState('');

  const handleChange = useCallback(
    ({ target }) => {
      const { value } = target;
      setQ(value);
    },
    [setQ]
  );

  const getSubmit = useCallback(
    e => {
      e.preventDefault();
      onSubmit(q);
      setQ('');
    },
    [setQ, onSubmit, q]
  );

  return (
    <header className={stl.searchBar}>
      <form className={stl.form} onSubmit={getSubmit}>
        <button type="submit" className={stl.button}>
          <span className={stl.span}>Search</span>
        </button>
        <input
          value={q}
          required
          className={stl.input}
          name="q"
          type="text"
          placeholder="Search images by keyword"
          onChange={handleChange}
          autoComplete="off"
          autoFocus
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default memo(SearchBar);
