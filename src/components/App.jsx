import React, { useState, useEffect } from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImages } from './FetchImages/FetchImages';
import Searchbar from './Searchbar/Searchbar';
import Notiflix from 'notiflix';
import Loader from './Loader/Loader';
import css from './App.module.css';

const App = () => {

  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);

  const handleSubmit = inputData => {
    setInputData(inputData);
    setItems([]);
    setPage(1);
  }

  useEffect(() => {
    if (!inputData)
     { return;} 
    
    const getImgs = async () => {
    try {
      setStatus('pending');
      const result = await fetchImages(inputData, page)
     
      if (result.hits.length < 1) {
        setStatus('idle');
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        setItems(prevState => [...prevState, ...result.hits]);
        setTotalHits(result.totalHits);
        setStatus('resolved');
      }
    } catch (error) {
       setStatus('rejected');
    }
    };
    
    getImgs();
  }, [inputData, page]);

  
  const onNextPage = () => {
    setPage(prevState => prevState + 1)
  };

    if (status === 'idle') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={handleSubmit} />
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={handleSubmit} />
          <ImageGallery  items={items} />
          <Loader />
          {totalHits > 12 && <Button onClick={onNextPage} />}
        </div>
      );
    }
    if (status === 'rejected') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={handleSubmit} />
          <p>Something wrong, try later</p>
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={handleSubmit} />
          <ImageGallery  items={items} />
          {totalHits > 12 && totalHits > items.length &&
            <Button onClick={onNextPage} />}
        </div>
      );
    }
  
};

export default App;