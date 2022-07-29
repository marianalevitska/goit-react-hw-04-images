import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import stl from './modal.module.css';

const modalRoot = document.getElementById('modal');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal = e => {
    const { onClose } = this.props;
    if (e.code === 'Escape') {
      onClose();
      return;
    }
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  render() {
    const { children } = this.props;

    return createPortal(
      <div className={stl.overlay} onClick={this.closeModal}>
        <div className={stl.modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
