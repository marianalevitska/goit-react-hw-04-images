import PropTypes from 'prop-types';
import stl from './imageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';

function ImageGallery({ img, onOpen }) {
  const elements = img.map(({ id, webformatURL, largeImageURL, tags }) => (
    <ImageGalleryItem
      key={id}
      tags={tags}
      webformatURL={webformatURL}
      largeImageURL={largeImageURL}
      onOpen={onOpen}
    />
  ));

  return <ul className={stl.gallery}>{elements}</ul>;
}

ImageGallery.propTypes = {
  img: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default ImageGallery;
