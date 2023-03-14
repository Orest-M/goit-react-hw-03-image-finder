import { Component } from 'react';
import axios from 'axios';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

import css from './app.module.css';

axios.defaults.baseURL =
  'https://pixabay.com/api/?key=32821640-07af0db556e394f2b39c0c0e4&image_type=photo&orientation=horizontal&per_page=12';

export class App extends Component {
  state = {
    images: null,
    q: '',
    page: 1,
    showButton: false,
    loading: false,
    imageId: null,
  };

  changeImages = (q, page) => {
    this.setState({ q, page });
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.q !== this.state.q) {
      this.request('q');
    } else if (prevState.page !== this.state.page) {
      this.request('page');
    }
  }

  request = async parameter => {
    if (parameter !== 'q' && parameter !== 'page') return;

    this.setState({ loading: true });

    try {
      const response = await axios.get(
        `&q=${this.state.q}&page=${parameter === 'q' ? 1 : this.state.page}`
      );

      if (response.data.hits.length < 1) {
        parameter === 'q'
          ? alert('По цьому запиту не знайдено зображень')
          : this.setState({ showButton: false });
      } else {
        if (response.data.hits.length < 20) {
          this.setState({ showButton: false });
        }

        parameter === 'q'
          ? this.setState({ images: response.data.hits, showButton: true })
          : this.setState(item => {
              return { images: [...item.images, ...response.data.hits] };
            });
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  onUpdateSearch = q => {
    this.changeImages(q, 1);
  };

  onLoadMore = () => {
    this.setState(item => {
      return { page: item.page + 1 };
    });
  };

  openModal = id => {
    this.setState({ imageId: id });

    document.querySelector('body').addEventListener('keydown', this.closeModal);
  };

  closeModal = e => {
    if (e.target.dataset.overlay || e.key === 'Escape') {
      this.setState({ imageId: null });

      document
        .querySelector('body')
        .removeEventListener('keydown', this.closeModal);
    }
  };

  getCurrentImage = () => {
    return this.state.images.filter(item => item.id === this.state.imageId);
  };

  render() {
    const { images, showButton, loading, imageId } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onUpdateSearch={this.onUpdateSearch} />
        <ImageGallery images={images} openModal={this.openModal} />
        {showButton && <Button onLoadMore={this.onLoadMore} />}
        {loading && (
          <div style={{ margin: '0 auto', width: '80px' }}>
            <Loader />
          </div>
        )}
        {imageId && (
          <Modal
            currentImg={this.getCurrentImage()}
            closeModal={this.closeModal}
          />
        )}
      </div>
    );
  }
}
