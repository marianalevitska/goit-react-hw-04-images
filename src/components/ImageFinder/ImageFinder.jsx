import { useState, useEffect, useCallback } from 'react';
import stl from './imageFinder.module.css';

import ImageGallery from './ImageGallery';
import SearchBar from './SearchBar';
import Button from '../../shared/Button';
import Loader from '../../shared/Loader';
import Modal from '../../shared/Modal';

import { getImg } from '../../shared/api/pixabay';

function ImageFinder() {
  // state = {
  //   images: [],
  //   isLoading: false,
  //   error: null,
  //   q: '',
  //   page: 1,
  //   totalPages: 0,
  //   isModalOpen: false,
  //   modalImg: {},
  // };

  const [state, setState] = useState({
    images: [],
    isLoading: false,
    error: null,
  });

  const [q, setQ] = useState('');
  const [pg, setPg] = useState({
    page: 1,
    totalPages: 1,
  });
  const [modal, setModal] = useState({
    isModalOpen: false,
    modalImg: {},
  });

  useEffect(() => {
    const fetchImg = async () => {
      if (!q.trim()) {
        return;
      }
      setState(prevState => ({ ...prevState, isLoading: true, error: null }));
      try {
        const res = await getImg(q, pg.page);

        const tp = Math.ceil(res.totalHits / 12);
        setState(prevState => {
          if (pg.page !== 1) {
            return {
              ...prevState,
              isLoading: false,
              images: [...prevState.images, ...res.hits],
            };
          }
          return {
            ...prevState,
            isLoading: false,
            images: res.hits,
          };
        });
        setPg(prevPg => ({
          ...prevPg,
          totalPages: tp,
        }));
      } catch (error) {
        setState(prevState => ({
          ...prevState,
          isLoading: false,
          error,
        }));
      }
    };
    fetchImg();
  }, [q, pg.page]);

  const setImg = useCallback(
    q => {
      setQ(q);
      setPg({
        ...pg,
        page: 1,
      });
    },
    [setQ, setPg, pg]
  );

  const openModal = useCallback(
    modalImg => {
      setModal({
        isModalOpen: true,
        modalImg,
      });
    },
    [setModal]
  );

  const closeModal = useCallback(() => {
    setModal({
      ...modal,
      isModalOpen: false,
    });
  }, [setModal, modal]);

  const loadMore = useCallback(() => {
    setPg(prevPg => ({
      ...prevPg,
      page: prevPg.page + 1,
    }));
  }, [setPg]);

  const { images, isLoading, error } = state;
  const { page, totalPages } = pg;
  const { isModalOpen } = modal;

  const { largeImageURL, tags } = modal.modalImg;
  return (
    <div className={stl.block}>
      <SearchBar onSubmit={setImg} />
      {error && (
        <p
          className={stl.message}
        >{`Something went wrong ${error.message} /n try to type again`}</p>
      )}
      {images.length > 0 && <ImageGallery img={images} onOpen={openModal} />}
      {!images.length && q.length > 0 && (
        <p className={stl.message}>Козаче, подумай краще</p>
      )}
      {page < totalPages && <Button onLoad={loadMore} title={'Load more'} />}
      {isLoading && <Loader />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <img src={largeImageURL} alt={tags} className={stl.img} />
        </Modal>
      )}
    </div>
  );
}

export default ImageFinder;
