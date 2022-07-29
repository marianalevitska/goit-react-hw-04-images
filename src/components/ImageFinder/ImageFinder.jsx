import { Component } from 'react';
import stl from './imageFinder.module.css';

import ImageGallery from './ImageGallery';
import SearchBar from './SearchBar';
import Button from '../../shared/Button';
import Loader from '../../shared/Loader';
import Modal from '../../shared/Modal';

import { getImg } from '../../shared/api/pixabay';

class ImageFinder extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    q: '',
    page: 1,
    totalPages: 0,
    isModalOpen: false,
    modalImg: {},
  };

  async componentDidUpdate(prevProp, prevState) {
    const { q, page } = this.state;
    if (!q.trim().length) {
      alert(
        'Життя окремої людини має сенс лише тоді, коли вона знає, що хоче знайти'
      );
      return;
    }
    if (q !== prevState.q) {
      this.setState({ isLoading: true });
      try {
        const { hits, total } = await getImg(q, page);
        this.setState({
          images: hits,
          totalPages: Math.ceil(total / 12),
          isLoading: false,
        });
        return;
      } catch (error) {
        this.setState({ error, isLoading: false });
      }
    }
    if (page !== prevState.page) {
      this.setState({ isLoading: true });
      try {
        const { hits, total } = await getImg(q, page);
        this.setState(({ images }) => ({
          images: [...images, ...hits],
          totalPages: Math.ceil(total / 12),
          isLoading: false,
        }));
      } catch (error) {
        this.setState({ error, isLoading: false });
      }
    }
  }

  setImg = ({ q }) => {
    this.setState({
      q,
    });
  };

  openModal = modalImg => {
    console.log('1');
    this.setState({
      isModalOpen: true,
      modalImg,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { images, isModalOpen, isLoading, error, page, totalPages, q } =
      this.state;
    const { largeImageURL, tags } = this.state.modalImg;
    return (
      <div className={stl.block}>
        <SearchBar onSubmit={this.setImg} />
        {error && (
          <p
            className={stl.message}
          >{`Something went wrong ${error.message} /n try to type again`}</p>
        )}
        {images.length > 0 && (
          <ImageGallery img={images} onOpen={this.openModal} />
        )}
        {!images.length && q.length > 0 && (
          <p className={stl.message}>Козаче, подумай краще</p>
        )}
        {page < totalPages && (
          <Button onLoad={this.loadMore} title={'Load more'} />
        )}
        {isLoading && <Loader />}
        {isModalOpen && (
          <Modal onClose={this.closeModal}>
            <img src={largeImageURL} alt={tags} className={stl.img} />
          </Modal>
        )}
      </div>
    );
  }
}

export default ImageFinder;
