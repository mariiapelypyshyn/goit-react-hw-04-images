import React, { useState, useEffect } from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImages } from './FetchImages/FetchImages';
import Searchbar from './Searchbar/Searchbar';
import Notiflix from 'notiflix';
import Loader from './Loader/Loader';
import css from './App.module.css';

const App = () => {
  // state = {
  //   inputData: '',
  //   items: [],
  //   page: 1,
  //   status: 'idle',
  //   totalHits: 0,
  // };
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);

  const handleSubmit = inputData => {
    // this.setState({ inputData, page: 1 });
    setInputData(inputData);
  }

  const getImgs = async () => {
    try {
      // this.setState({ status: 'pending' });
      setStatus('pending');
      const result = await fetchImages(inputData, page)
     
      if (result.hits.length < 1) {
        // this.setState({ status: 'idle' });
        setStatus('idle');
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
      //   this.setState(prevState => ({
      //     items: [...prevState.items, ...result.hits],
      //     totalHits: result.totalHits,
      //   status: 'resolved',
        // }));
        // setItems(prevState => [...prevState.items, ...result.hits]);
        setItems(prevState => [...prevState, ...result.hits]);
        setTotalHits(result.totalHits);
        setStatus('resolved');
      }
    } catch (error) {
      // this.setState({ status: 'rejected' });
       setStatus('rejected');
    }
  };

  useEffect(() => {
    if (!inputData)
    { return; }
    getImgs();
  }, [inputData, page]);
  // componentDidUpdate(_, prevState) {
  //   if (prevState.inputData !== this.state.inputData || prevState.page !== this.state.page) {
  //     this.getImgs();
  //   }
  // };
  
  const onNextPage = () => {
    // this.setState(prevState => ({
    //   page: prevState.page + 1,
    // }));
    setPage(prevState => prevState + 1)
  };

 
    // const { totalHits, status, items } = this.state;
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