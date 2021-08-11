import { useState, useEffect } from 'react';
import Searchbar from './Components/Searchbar/searchbar';
import * as imagesApi from './services/image-api';
import ImageGallery from './Components/ImageGallery/imageGallery';
import ImageGalleryItem from './Components/ImageGalleryItem/imageGalleryItem';
import Button from './Components/Button/button';
import GalleryLoader from './Components/Loader/loader';
import Modal from './Components/Modal/Modal';
import styles from './App.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    fetchImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, [images]);

  const onChangeQuery = query => {
    setSearchQuery(query);
    setImages([]);
    setCurrentPage(1);
    setError(null)
  };

  const fetchImages = () => {
    const option = { searchQuery, currentPage };
    setIsLoading(true);
    imagesApi
      .fetchImages(option)
      .then(
        (prevImages) => setImages([...images, ...prevImages]),
        setCurrentPage(currentPage + 1)
      )
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  };

  const handleImageClick = (url) => {
    setLargeImageURL(url);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

  return (
    <div className={styles.Container}>
      <Searchbar onSubmit={onChangeQuery} />
      {error && <p>Sorry! Somethimg went wrong. Try again, please!</p>}
      <ImageGallery>
        {images.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            srcWebformat={webformatURL}
            onClick={() => handleImageClick(largeImageURL)}
          />
        ))}
      </ImageGallery>
      {isLoading && <GalleryLoader />}
      {shouldRenderLoadMoreButton && <Button onClick={fetchImages} length={images.length} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </div>
  );
}

export default App;