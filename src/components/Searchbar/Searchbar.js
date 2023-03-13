import { Component } from 'react';

import css from './searchbar.module.css';

class Searchbar extends Component {
  state = {
    input: '',
  };

  onChangeInput = e => {
    this.setState({
      input: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { input } = this.state;
    const { onUpdateSearch } = this.props;

    if (!input) {
      alert('Напишіть запит у поле вводу');
      return;
    }

    onUpdateSearch(input);
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={css['SearchForm-button']}>
            <span className={css['SearchForm-button-label']}>Search</span>
          </button>

          <input
            className={css['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChangeInput}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
