import { Component } from 'react';
import stl from './searchBar.module.css';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  state = {
    q: '',
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      q: value,
    });
  };

  getSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(this.state);
    this.setState({
      q: '',
    });
  };

  render() {
    const { q } = this.state;
    return (
      <header className={stl.searchBar}>
        <form className={stl.form} onSubmit={this.getSubmit}>
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
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
