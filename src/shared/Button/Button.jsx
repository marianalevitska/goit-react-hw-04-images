import { memo } from 'react';
import PropTypes from 'prop-types';
import stl from './button.module.css';

function Button({ onLoad, title }) {
  return (
    <button className={stl.button} onClick={onLoad} type="button">
      {title}
    </button>
  );
}

Button.propTypes = {
  onLoad: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default memo(Button);
