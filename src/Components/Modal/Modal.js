import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';

const modalRoot = document.querySelector('#modal');
const Modal = ({children, onClose}) => {
  useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      }
  });
    const  handleKeyDown = e => {
      if (e.code === 'Escape') {
      onClose();
      }
    };
    const  handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
          onClose();
        }
    };

    return createPortal(
        <div className={styles.Overlay} onClick={handleBackdropClick}>
          <div className={styles.Modal}>{children}</div>
        </div>,
        modalRoot,
      );
  }

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Modal;