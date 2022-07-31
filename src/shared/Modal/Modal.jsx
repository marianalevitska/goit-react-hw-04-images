// import { Component } from 'react';
import { memo, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import stl from './modal.module.css';

const modalRoot = document.getElementById('modal');

function Modal({ onClose, children }) {
  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  }, []);

  const closeModal = useCallback(
    e => {
      if (e.code === 'Escape') {
        onClose();
        return;
      }
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return createPortal(
    <div className={stl.overlay} onClick={closeModal}>
      <div className={stl.modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default memo(Modal);
