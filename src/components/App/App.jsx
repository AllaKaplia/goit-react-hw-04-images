import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from "components/SearchBar";
import { fetchImagesAPI } from "components/Services/Services";
import ImageGallery from "components/ImageGallery";
import Loader from "components/Loader";
import Button from "components/Button";
import { Container } from './App.styled';
import { theme } from "components/ErrorMessage/ErrorMessage";
import { ErrorMessage } from "components/ErrorMessage/ErrorMessage";
import { ThemeProvider } from '@emotion/react';
import Modal from "react-modal";

export default function App() {
  const [imagesName, setImagesName] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    let abortController = new AbortController();

    const foundImages = async () => {
      if (abortController) {
        abortController.abort();
      }

      abortController = new AbortController();

      try {
        setLoading(true);
        setError(null);

        const data = await fetchImagesAPI(imagesName, page, abortController.signal);

        if (data.hits.length === 0) {
          toast.error('No images found for this request! Try again');
        } else if (page === 1) {
          toast.success('Congratulations, your search has results!');
        } else {
          toast.success('Congratulations, there are many images for your request!');
        }

        setImages(prevImages => [...prevImages, ...data.hits]);
        setTotalImages(data.totalHits);
        setLoading(false);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError('Oops! Something went wrong! Try reloading the pages!');
        }
      }
       finally {
        setLoading(false);
      }
    };

    if (imagesName !== '') {
      foundImages();
    }

    return () => {
      abortController.abort();
    };
  }, [imagesName, page]);

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const handleSearchNameSubmit = (name) => {
    if(imagesName === name){
      return;
    }

    setImagesName(name);
    setPage(1);
    setImages([]);
    setError(null);
    setTotalImages(0);
  }

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  }
  
  return (
    <Container>
      <SearchBar onSubmit={handleSearchNameSubmit} />
      <ImageGallery images={images}/>
      {loading && <Loader />}
      {images.length < totalImages && images.length > 0 && 
      <Button onClick={handleLoadMore} />}
      {error && <ThemeProvider theme={theme}>
      <ErrorMessage>{error}</ErrorMessage>
    </ThemeProvider>}
      <ToastContainer autoClose={3000} theme="dark" />
    </Container>
  );
}