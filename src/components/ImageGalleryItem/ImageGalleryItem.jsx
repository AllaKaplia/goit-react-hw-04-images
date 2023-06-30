import { Component } from "react";
import { GalleryItem, ImageGallery } from "./ImageGalleryItem.styled";
import Modal from "../Modal";

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  componentDidMount() {
    document.body.classList.remove("modal-open");
  }

  render() {
    const { id, webformatURL, largeImageURL, tags } = this.props;
    const { showModal } = this.state;

    return (
      <>
        <GalleryItem key={id}>
          <ImageGallery src={webformatURL} alt={tags} onClick={this.toggleModal} />
        </GalleryItem>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}
