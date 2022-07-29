import PropTypes from 'prop-types';
import stl from './imageGalleryItem.module.css';

function ImageGalleryItem({ tags, webformatURL, largeImageURL, onOpen }) {
  return (
    <li className={stl.item} onClick={() => onOpen({ largeImageURL, tags })}>
      <img src={webformatURL} alt={tags} className={stl.img} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
