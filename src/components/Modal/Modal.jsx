import css from './Modal.module.css';
import React, { useEffect } from 'react';


const Modal = ({ onClose, image }) => {
  
  useEffect(() => {
    // console.log('Modal was mounted');
      const keyDown = e => {
    if (e.code === 'Escape') {
      onClose();
        }
    };
          window.addEventListener('keydown', keyDown);
    document.body.style.overflow = 'hidden';

    return (() => {
      window.removeEventListener('keydown', keyDown);
    document.body.style.overflow = "auto";})
   }, [onClose]);


  const onOverlayClose = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

     const { largeImageURL } = image;
    return (
      <div onClick={onOverlayClose} className={css.Overlay}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt="img" />
         </div>
      </div>
    )
}

export default Modal;