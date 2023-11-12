import Modal from '../Modal/Modal';
import React, { useState } from 'react';
import css from './ImageGalleryItem.module.css';


const ImageGalleryItem = ({item}) => {
  const [shownModal, setShownModal] = useState(false);
  const onModal = () => {
    setShownModal(!shownModal);

  };
  
    const { webformatURL } = item;
    return (
      <li className={css.ImageGalleryItem}>
        <img
          onClick={onModal}
          className={css.ImageGalleryItemImage}
          src={webformatURL}
          alt="img"
        />
        {shownModal && <Modal onClose={onModal} image={item} />}
      </li>
    );
  
}

export default ImageGalleryItem;