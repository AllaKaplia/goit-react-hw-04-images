import Modal from "components/Modal";
import { useState } from "react";
import { GalleryItem, ImageGallery } from "./ImageGalleryItem.styled";


export default function ImageGalleryItem({ id, webformatURL, largeImageURL, tags }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
    document.body.style.overflow = showModal ? "auto" : "hidden"; 
  };

  return (
    <>
      <GalleryItem key={id}>
        <ImageGallery src={webformatURL} alt={tags} onClick={toggleModal} />
      </GalleryItem>
      <Modal isOpen={showModal} onRequestClose={toggleModal} contentLabel="Image Modal">
        <img src={largeImageURL} alt={tags} />
      </Modal>
    </>
  );
}