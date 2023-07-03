import ReactModal from "react-modal";

export default function ModalImg ({ isOpen, onRequestClose, contentLabel, children }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
    >
      {children}
    </ReactModal>
  );
}