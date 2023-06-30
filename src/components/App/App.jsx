import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from "components/SearchBar";
import { fetchImagesAPI } from "components/Services/Services";
import ImageGallery from "components/ImageGallery";
import Loader from "components/Loader";
import Button from "components/Button";
import { Container } from './App.styled';
import { ErrorMessage } from "components/ErrorMessage/ErrorMessage";

class App extends Component {
  abortController;

  state = {
    images: [],
    imagesName: '',
    page: 1,
    loading: false,
    error: null,
    totalImages: 0,
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.imagesName !== this.state.imagesName ||
      prevState.page !== this.state.page
    ) {
      this.foundImages()
    }
  }

  foundImages = async () => {
    const { imagesName, page } = this.state;

    if (this.abortController) {
      this.abortController.abort();
    }

    this.abortController = new AbortController();
  
    try {
      this.setState({ loading: true, error: null });

      const data = await fetchImagesAPI(
        imagesName,
        page,
        this.abortController.signal
      );

      if(data.hits.length === 0){
        toast.error('No images found for this request! Try again');
      } else if(page === 1){
        toast.success('Congratulations, your search has results!')
      } else{
        toast.success('Congratulations, there are many images for your request!')
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        totalImages: data.totalHits,
        loading: false,
        error: null
      }));
    } catch (error){
      if (error.code !== 'ERR_CANCELED') {
        this.setState({
          error: 'Oops! Something went wrong! Try reloading the pages!'
        })
      }
    } finally {
      this.setState({ loading: false });
    };
  };

  handleSearchNameSubmit = (imagesName) => {
    if(this.state.imagesName === imagesName ){
      return;
    }

    this.setState({ 
      imagesName,
      page: 1,
      images: [],
      error: null,
      totalImages: false
    });
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  }

  render () {
    const { images ,totalImages, loading, error } = this.state;
    return (
      <Container>
        <SearchBar onSubmit={this.handleSearchNameSubmit} />
        <ImageGallery images={images}/>
        {loading && <Loader />}
        {images.length < totalImages && images.length > 0 && 
        <Button onClick={this.handleLoadMore} />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ToastContainer autoClose={3000} theme="dark" />
      </Container>
    );
  }
};

export default App;