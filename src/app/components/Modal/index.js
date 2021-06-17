import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useOnClickOutside } from '../../hooks';
import styles from './index.module.scss';

const Modal = ({ isOpen, infos, closeModal }) => {
  const { title, overview } = infos;
  const containerRef = useRef();
  const contentRef = useRef();
  const display = isOpen ? '' : 'none';

  useEffect(() => {
    if (!isOpen) return;

    contentRef.current.scrollTop = 0;
  }, [isOpen]);

  useOnClickOutside(containerRef, closeModal);

  return (
    <div className={styles.modal} style={{ display }}>
      <div ref={containerRef} className={styles.modalContainer}>
        <div className={styles.modalTitle}>
          <h1>{title}</h1>
          <div onClick={closeModal} className={styles.modalTitleClose} />
        </div>
        <div ref={contentRef} className={styles.modalContent} dangerouslySetInnerHTML={{ __html: overview }} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  infos: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
